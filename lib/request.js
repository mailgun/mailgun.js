const merge = require('lodash.merge');
const popsicle = require('popsicle');
const status = require('popsicle-status');
const btoa = require('btoa');
const urljoin = require('url-join');

const APIError = require('./error');

const isStream = (attachment) => typeof attachment === 'object' && typeof attachment.pipe === 'function';

function parseResponse() {
  return function (req) {
    req.after(function (res) {
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
  return function (req) {
    req.before(function (request) {
      return new Promise(function (resolve) {
        if (request.headers['user-agent']) {
          delete request.headers['user-agent'];
        }

        resolve();
      });
    });
  };
}

function transformAttachment(key, item) {
  if (typeof item !== 'object' || isStream(item)) return [key, item];

  const {
    filename,
    contentType,
    knownLength,
    data
  } = item;

  return [key, data, {
    ...(filename ? { filename } : { filename: 'file' }),
    ...(contentType && { contentType }),
    ...(knownLength && { knownLength })
  }];
}

class Request {
  constructor(options) {
    this.username = options.username;
    this.key = options.key;
    this.url = options.url;
    this.headers = options.headers || {};
  }

  request(method, url, options) {
    const basic = btoa(`${this.username}:${this.key}`);
    const headers = merge({
      Authorization: `Basic ${basic}`
    }, this.headers);

    const request = merge({
      method,
      url: urljoin(this.url, url),
      headers
    }, options);

    return popsicle(request)
      .use(removeUserAgent())
      .use(parseResponse())
      .use(status())
      .catch(function (error) {
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
    const formData = popsicle.form();
    const options = {
      headers: { 'Content-Type': null }
    };

    Object.keys(data)
      .filter(function (key) { return data[key]; })
      .forEach(function (key) {
        if (key === 'attachment') {
          const obj = data.attachment;

          if (Array.isArray(obj)) {
            obj.forEach(function (item) {
              const params = transformAttachment(key, item);
              formData.append(...params);
            });
          } else {
            const params = transformAttachment(key, obj);
            formData.append(...params);
          }

          return;
        }

        if (key === 'recipient-variables') {
          const recipientVariables = JSON.stringify(data[key]);
          formData.append(key, recipientVariables);
          return;
        }

        if (Array.isArray(data[key])) {
          data[key].forEach(function (item) {
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
