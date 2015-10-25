'use strict';

var merge = require('lodash.merge');
var popsicle = require('popsicle');
var status = require('popsicle-status');
var btoa = require('btoa');
var urljoin = require('url-join');
var APIError = require('./error');

function parseResponse() {
  return function(req) {
    req.after(function(res) {
      if (res.type() !== 'text/html') {
        return Promise.resolve(res);
      }

      try {
        if (res.body !== null) {
          res.body = JSON.parse(res.body);
        }

        return Promise.resolve(res);
      } catch (err) {
        return Promise.reject(res);
      }
    });
  };
}

function removeUserAgent() {
  return function(req) {
    req.before(function(request) {
      return new Promise(function(resolve) {
        if (request.headers['user-agent']) {
          delete request.headers['user-agent'];
        }

        resolve();
      });
    });
  };
}

class Request {
  constructor(options) {
    this.username = options.username;
    this.key = options.key;
    this.url = options.url;
    this.headers = options.headers || {};
  }

  request(method, url, options) {
    let headers = merge({
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.key)
    }, this.headers);

    let request = merge({
      method: method,
      url: urljoin(this.url, url),
      headers: headers
    }, options);

    return popsicle(request)
      .use(removeUserAgent())
      .use(parseResponse())
      .use(status())
      .catch(function(error) {
        if (error.type === 'EINVALIDSTATUS' && error.popsicle) {
          throw new APIError(error.popsicle.response);
        } else if (error instanceof Error) {
          throw error;
        } else {
          throw new APIError(error);
        }
      });
  }

  query(method, url, params, options) {
    return this.request(method, url, merge({ query: params }, options));
  }

  command(method, url, data, options) {
    return this.request(method, url, merge({
      body: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }, options));
  }

  get(url, params, options) {
    return this.query('get', url, params, options);
  }

  head(url, params, options) {
    return this.query('head', url, params, options);
  }

  options(url, params, options) {
    return this.query('options', url, params, options);
  }

  post(url, data, options) {
    return this.command('post', url, data, options);
  }

  postMulti(url, data) {
    let formData = popsicle.form();
    let options = {
      headers: {'Content-Type': null}
    };

    Object.keys(data).forEach(function(key) {
      if (Array.isArray(data[key])) {
        data[key].forEach(function(item) {
          formData.append(key, item);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    return this.command('post', url, formData, options);
  }

  put(url, data, options) {
    return this.command('put', url, data, options);
  }

  patch(url, data, options) {
    return this.command('patch', url, data, options);
  }

  delete(url, data, options) {
    return this.command('delete', url, data, options);
  }
}

module.exports = Request;
