/*! mailgun.js v7.0.4 */
/*! mailgun.js v7.0.4 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mailgun"] = factory();
	else
		root["mailgun"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/asynckit/index.js":
/*!****************************************!*\
  !*** ./node_modules/asynckit/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports =
{
  parallel      : __webpack_require__(/*! ./parallel.js */ "./node_modules/asynckit/parallel.js"),
  serial        : __webpack_require__(/*! ./serial.js */ "./node_modules/asynckit/serial.js"),
  serialOrdered : __webpack_require__(/*! ./serialOrdered.js */ "./node_modules/asynckit/serialOrdered.js")
};


/***/ }),

/***/ "./node_modules/asynckit/lib/abort.js":
/*!********************************************!*\
  !*** ./node_modules/asynckit/lib/abort.js ***!
  \********************************************/
/***/ ((module) => {

// API
module.exports = abort;

/**
 * Aborts leftover active jobs
 *
 * @param {object} state - current state object
 */
function abort(state)
{
  Object.keys(state.jobs).forEach(clean.bind(state));

  // reset leftover jobs
  state.jobs = {};
}

/**
 * Cleans up leftover job by invoking abort function for the provided job id
 *
 * @this  state
 * @param {string|number} key - job id to abort
 */
function clean(key)
{
  if (typeof this.jobs[key] == 'function')
  {
    this.jobs[key]();
  }
}


/***/ }),

/***/ "./node_modules/asynckit/lib/async.js":
/*!********************************************!*\
  !*** ./node_modules/asynckit/lib/async.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defer = __webpack_require__(/*! ./defer.js */ "./node_modules/asynckit/lib/defer.js");

// API
module.exports = async;

/**
 * Runs provided callback asynchronously
 * even if callback itself is not
 *
 * @param   {function} callback - callback to invoke
 * @returns {function} - augmented callback
 */
function async(callback)
{
  var isAsync = false;

  // check if async happened
  defer(function() { isAsync = true; });

  return function async_callback(err, result)
  {
    if (isAsync)
    {
      callback(err, result);
    }
    else
    {
      defer(function nextTick_callback()
      {
        callback(err, result);
      });
    }
  };
}


/***/ }),

/***/ "./node_modules/asynckit/lib/defer.js":
/*!********************************************!*\
  !*** ./node_modules/asynckit/lib/defer.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = defer;

/**
 * Runs provided function on next iteration of the event loop
 *
 * @param {function} fn - function to run
 */
function defer(fn)
{
  var nextTick = typeof setImmediate == 'function'
    ? setImmediate
    : (
      typeof process == 'object' && typeof process.nextTick == 'function'
      ? process.nextTick
      : null
    );

  if (nextTick)
  {
    nextTick(fn);
  }
  else
  {
    setTimeout(fn, 0);
  }
}


/***/ }),

/***/ "./node_modules/asynckit/lib/iterate.js":
/*!**********************************************!*\
  !*** ./node_modules/asynckit/lib/iterate.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var async = __webpack_require__(/*! ./async.js */ "./node_modules/asynckit/lib/async.js")
  , abort = __webpack_require__(/*! ./abort.js */ "./node_modules/asynckit/lib/abort.js")
  ;

// API
module.exports = iterate;

/**
 * Iterates over each job object
 *
 * @param {array|object} list - array or object (named list) to iterate over
 * @param {function} iterator - iterator to run
 * @param {object} state - current job status
 * @param {function} callback - invoked when all elements processed
 */
function iterate(list, iterator, state, callback)
{
  // store current index
  var key = state['keyedList'] ? state['keyedList'][state.index] : state.index;

  state.jobs[key] = runJob(iterator, key, list[key], function(error, output)
  {
    // don't repeat yourself
    // skip secondary callbacks
    if (!(key in state.jobs))
    {
      return;
    }

    // clean up jobs
    delete state.jobs[key];

    if (error)
    {
      // don't process rest of the results
      // stop still active jobs
      // and reset the list
      abort(state);
    }
    else
    {
      state.results[key] = output;
    }

    // return salvaged results
    callback(error, state.results);
  });
}

/**
 * Runs iterator over provided job element
 *
 * @param   {function} iterator - iterator to invoke
 * @param   {string|number} key - key/index of the element in the list of jobs
 * @param   {mixed} item - job description
 * @param   {function} callback - invoked after iterator is done with the job
 * @returns {function|mixed} - job abort function or something else
 */
function runJob(iterator, key, item, callback)
{
  var aborter;

  // allow shortcut if iterator expects only two arguments
  if (iterator.length == 2)
  {
    aborter = iterator(item, async(callback));
  }
  // otherwise go with full three arguments
  else
  {
    aborter = iterator(item, key, async(callback));
  }

  return aborter;
}


/***/ }),

/***/ "./node_modules/asynckit/lib/state.js":
/*!********************************************!*\
  !*** ./node_modules/asynckit/lib/state.js ***!
  \********************************************/
/***/ ((module) => {

// API
module.exports = state;

/**
 * Creates initial state object
 * for iteration over list
 *
 * @param   {array|object} list - list to iterate over
 * @param   {function|null} sortMethod - function to use for keys sort,
 *                                     or `null` to keep them as is
 * @returns {object} - initial state object
 */
function state(list, sortMethod)
{
  var isNamedList = !Array.isArray(list)
    , initState =
    {
      index    : 0,
      keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
      jobs     : {},
      results  : isNamedList ? {} : [],
      size     : isNamedList ? Object.keys(list).length : list.length
    }
    ;

  if (sortMethod)
  {
    // sort array keys based on it's values
    // sort object's keys just on own merit
    initState.keyedList.sort(isNamedList ? sortMethod : function(a, b)
    {
      return sortMethod(list[a], list[b]);
    });
  }

  return initState;
}


/***/ }),

/***/ "./node_modules/asynckit/lib/terminator.js":
/*!*************************************************!*\
  !*** ./node_modules/asynckit/lib/terminator.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var abort = __webpack_require__(/*! ./abort.js */ "./node_modules/asynckit/lib/abort.js")
  , async = __webpack_require__(/*! ./async.js */ "./node_modules/asynckit/lib/async.js")
  ;

// API
module.exports = terminator;

/**
 * Terminates jobs in the attached state context
 *
 * @this  AsyncKitState#
 * @param {function} callback - final callback to invoke after termination
 */
function terminator(callback)
{
  if (!Object.keys(this.jobs).length)
  {
    return;
  }

  // fast forward iteration index
  this.index = this.size;

  // abort jobs
  abort(this);

  // send back results we have so far
  async(callback)(null, this.results);
}


/***/ }),

/***/ "./node_modules/asynckit/parallel.js":
/*!*******************************************!*\
  !*** ./node_modules/asynckit/parallel.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var iterate    = __webpack_require__(/*! ./lib/iterate.js */ "./node_modules/asynckit/lib/iterate.js")
  , initState  = __webpack_require__(/*! ./lib/state.js */ "./node_modules/asynckit/lib/state.js")
  , terminator = __webpack_require__(/*! ./lib/terminator.js */ "./node_modules/asynckit/lib/terminator.js")
  ;

// Public API
module.exports = parallel;

/**
 * Runs iterator over provided array elements in parallel
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function parallel(list, iterator, callback)
{
  var state = initState(list);

  while (state.index < (state['keyedList'] || list).length)
  {
    iterate(list, iterator, state, function(error, result)
    {
      if (error)
      {
        callback(error, result);
        return;
      }

      // looks like it's the last one
      if (Object.keys(state.jobs).length === 0)
      {
        callback(null, state.results);
        return;
      }
    });

    state.index++;
  }

  return terminator.bind(state, callback);
}


/***/ }),

/***/ "./node_modules/asynckit/serial.js":
/*!*****************************************!*\
  !*** ./node_modules/asynckit/serial.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var serialOrdered = __webpack_require__(/*! ./serialOrdered.js */ "./node_modules/asynckit/serialOrdered.js");

// Public API
module.exports = serial;

/**
 * Runs iterator over provided array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function serial(list, iterator, callback)
{
  return serialOrdered(list, iterator, null, callback);
}


/***/ }),

/***/ "./node_modules/asynckit/serialOrdered.js":
/*!************************************************!*\
  !*** ./node_modules/asynckit/serialOrdered.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var iterate    = __webpack_require__(/*! ./lib/iterate.js */ "./node_modules/asynckit/lib/iterate.js")
  , initState  = __webpack_require__(/*! ./lib/state.js */ "./node_modules/asynckit/lib/state.js")
  , terminator = __webpack_require__(/*! ./lib/terminator.js */ "./node_modules/asynckit/lib/terminator.js")
  ;

// Public API
module.exports = serialOrdered;
// sorting helpers
module.exports.ascending  = ascending;
module.exports.descending = descending;

/**
 * Runs iterator over provided sorted array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} sortMethod - custom sort function
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function serialOrdered(list, iterator, sortMethod, callback)
{
  var state = initState(list, sortMethod);

  iterate(list, iterator, state, function iteratorHandler(error, result)
  {
    if (error)
    {
      callback(error, result);
      return;
    }

    state.index++;

    // are we there yet?
    if (state.index < (state['keyedList'] || list).length)
    {
      iterate(list, iterator, state, iteratorHandler);
      return;
    }

    // done here
    callback(null, state.results);
  });

  return terminator.bind(state, callback);
}

/*
 * -- Sort methods
 */

/**
 * sort helper to sort array elements in ascending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */
function ascending(a, b)
{
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * sort helper to sort array elements in descending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */
function descending(a, b)
{
  return -1 * ascending(a, b);
}


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/http.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/adapters/http.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var httpFollow = (__webpack_require__(/*! follow-redirects */ "./node_modules/follow-redirects/index.js").http);
var httpsFollow = (__webpack_require__(/*! follow-redirects */ "./node_modules/follow-redirects/index.js").https);
var url = __webpack_require__(/*! url */ "url");
var zlib = __webpack_require__(/*! zlib */ "zlib");
var VERSION = (__webpack_require__(/*! ./../env/data */ "./node_modules/axios/lib/env/data.js").version);
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var CanceledError = __webpack_require__(/*! ../cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");

var isHttps = /https:?/;

var supportedProtocols = [ 'http:', 'https:', 'file:' ];

/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */
function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location;

  // Basic proxy authorization
  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  }

  // If a proxy is used, any redirects must also pass through the proxy
  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }
    var resolve = function resolve(value) {
      done();
      resolvePromise(value);
    };
    var rejected = false;
    var reject = function reject(value) {
      done();
      rejected = true;
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;
    var headerNames = {};

    Object.keys(headers).forEach(function storeLowerName(name) {
      headerNames[name.toLowerCase()] = name;
    });

    // Set User-Agent (required by some servers)
    // See https://github.com/axios/axios/issues/69
    if ('user-agent' in headerNames) {
      // User-Agent is specified; handle case where no UA header is desired
      if (!headers[headerNames['user-agent']]) {
        delete headers[headerNames['user-agent']];
      }
      // Otherwise, use specified value
    } else {
      // Only set header if it hasn't been set in config
      headers['User-Agent'] = 'axios/' + VERSION;
    }

    // support for https://www.npmjs.com/package/form-data api
    if (utils.isFormData(data) && utils.isFunction(data.getHeaders)) {
      Object.assign(headers, data.getHeaders());
    } else if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(new AxiosError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          AxiosError.ERR_BAD_REQUEST,
          config
        ));
      }

      if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
        return reject(new AxiosError(
          'Request body larger than maxBodyLength limit',
          AxiosError.ERR_BAD_REQUEST,
          config
        ));
      }

      // Add Content-Length header if data exists
      if (!headerNames['content-length']) {
        headers['Content-Length'] = data.length;
      }
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || supportedProtocols[0];

    if (supportedProtocols.indexOf(protocol) === -1) {
      return reject(new AxiosError(
        'Unsupported protocol ' + protocol,
        AxiosError.ERR_BAD_REQUEST,
        config
      ));
    }

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth && headerNames.authorization) {
      delete headers[headerNames.authorization];
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    try {
      buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, '');
    } catch (err) {
      var customErr = new Error(err.message);
      customErr.config = config;
      customErr.url = config.url;
      customErr.exists = true;
      reject(customErr);
    }

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      if (config.beforeRedirect) {
        options.beforeRedirect = config.beforeRedirect;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    if (config.insecureHTTPParser) {
      options.insecureHTTPParser = config.insecureHTTPParser;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;

      // return the last request in case of redirects
      var lastRequest = res.req || req;


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
        // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        var totalResponseBytes = 0;
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length;

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            // stream.destoy() emit aborted event before calling reject() on Node.js v16
            rejected = true;
            stream.destroy();
            reject(new AxiosError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              AxiosError.ERR_BAD_RESPONSE, config, lastRequest));
          }
        });

        stream.on('aborted', function handlerStreamAborted() {
          if (rejected) {
            return;
          }
          stream.destroy();
          reject(new AxiosError(
            'maxContentLength size of ' + config.maxContentLength + ' exceeded',
            AxiosError.ERR_BAD_RESPONSE,
            config,
            lastRequest
          ));
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(AxiosError.from(err, null, config, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          try {
            var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
            if (config.responseType !== 'arraybuffer') {
              responseData = responseData.toString(config.responseEncoding);
              if (!config.responseEncoding || config.responseEncoding === 'utf8') {
                responseData = utils.stripBOM(responseData);
              }
            }
            response.data = responseData;
          } catch (err) {
            reject(AxiosError.from(err, null, config, response.request, response));
          }
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      // @todo remove
      // if (req.aborted && err.code !== AxiosError.ERR_FR_TOO_MANY_REDIRECTS) return;
      reject(AxiosError.from(err, null, config, req));
    });

    // set tcp keep alive to prevent drop connection by peer
    req.on('socket', function handleRequestSocket(socket) {
      // default interval of sending ack packet is 1 minute
      socket.setKeepAlive(true, 1000 * 60);
    });

    // Handle request timeout
    if (config.timeout) {
      // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
      var timeout = parseInt(config.timeout, 10);

      if (isNaN(timeout)) {
        reject(new AxiosError(
          'error trying to parse `config.timeout` to int',
          AxiosError.ERR_BAD_OPTION_VALUE,
          config,
          req
        ));

        return;
      }

      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(timeout, function handleRequestTimeout() {
        req.abort();
        var transitional = config.transitional || transitionalDefaults;
        reject(new AxiosError(
          'timeout of ' + timeout + 'ms exceeded',
          transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
          config,
          req
        ));
      });
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(!cancel || (cancel && cancel.type) ? new CanceledError() : cancel);
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }


    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(AxiosError.from(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var CanceledError = __webpack_require__(/*! ../cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");
var parseProtocol = __webpack_require__(/*! ../helpers/parseProtocol */ "./node_modules/axios/lib/helpers/parseProtocol.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new CanceledError() : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    var protocol = parseProtocol(fullPath);

    if (protocol && [ 'http', 'https', 'file' ].indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.CanceledError = __webpack_require__(/*! ./cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = (__webpack_require__(/*! ./env/data */ "./node_modules/axios/lib/env/data.js").version);
axios.toFormData = __webpack_require__(/*! ./helpers/toFormData */ "./node_modules/axios/lib/helpers/toFormData.js");

// Expose AxiosError class
axios.AxiosError = __webpack_require__(/*! ../lib/core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var CanceledError = __webpack_require__(/*! ./CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CanceledError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CanceledError.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function CanceledError(message) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

module.exports = CanceledError;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var buildFullPath = __webpack_require__(/*! ./buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  var fullPath = buildFullPath(config.baseURL, config.url);
  return buildURL(fullPath, config.params, config.paramsSerializer);
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url: url,
        data: data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosError.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosError.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

var prototype = AxiosError.prototype;
var descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED'
// eslint-disable-next-line func-names
].forEach(function(code) {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = function(error, code, config, request, response, customProps) {
  var axiosError = Object.create(prototype);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

module.exports = AxiosError;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");
var CanceledError = __webpack_require__(/*! ../cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'beforeRedirect': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var AxiosError = __webpack_require__(/*! ./AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults/env/FormData.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/env/FormData.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// eslint-disable-next-line strict
module.exports = __webpack_require__(/*! form-data */ "./node_modules/axios/node_modules/form-data/lib/form_data.js");


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ../helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var transitionalDefaults = __webpack_require__(/*! ./transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var toFormData = __webpack_require__(/*! ../helpers/toFormData */ "./node_modules/axios/lib/helpers/toFormData.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ../adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ../adapters/http */ "./node_modules/axios/lib/adapters/http.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    var isObjectPayload = utils.isObject(data);
    var contentType = headers && headers['Content-Type'];

    var isFileList;

    if ((isFileList = utils.isFileList(data)) || (isObjectPayload && contentType === 'multipart/form-data')) {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList ? {'files[]': data} : data, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: __webpack_require__(/*! ./env/FormData */ "./node_modules/axios/lib/defaults/env/FormData.js")
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = {
  "version": "0.27.2"
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseProtocol.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseProtocol.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toFormData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toFormData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Convert a data object to FormData
 * @param {Object} obj
 * @param {?Object} [formData]
 * @returns {Object}
 **/

function toFormData(obj, formData) {
  // eslint-disable-next-line no-param-reassign
  formData = formData || new FormData();

  var stack = [];

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  function build(data, parentKey) {
    if (utils.isPlainObject(data) || utils.isArray(data)) {
      if (stack.indexOf(data) !== -1) {
        throw Error('Circular reference detected in ' + parentKey);
      }

      stack.push(data);

      utils.forEach(data, function each(value, key) {
        if (utils.isUndefined(value)) return;
        var fullKey = parentKey ? parentKey + '.' + key : key;
        var arr;

        if (value && !parentKey && typeof value === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
            // eslint-disable-next-line func-names
            arr.forEach(function(el) {
              !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }

        build(value, fullKey);
      });

      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data));
    }
  }

  build(obj);

  return formData;
}

module.exports = toFormData;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var VERSION = (__webpack_require__(/*! ../env/data */ "./node_modules/axios/lib/env/data.js").version);
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

// eslint-disable-next-line func-names
var kindOf = (function(cache) {
  // eslint-disable-next-line func-names
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
})(Object.create(null));

function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
var isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (kindOf(val) !== 'object') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
var isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
var isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} thing The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(thing) {
  var pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
}

/**
 * Determine if a value is a URLSearchParams object
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
var isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 */

function inherits(constructor, superConstructor, props, descriptors) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function} [filter]
 * @returns {Object}
 */

function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};

  destObj = destObj || {};

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/*
 * determines whether a string ends with the characters of a specified string
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 * @returns {boolean}
 */
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object
 * @param {*} [thing]
 * @returns {Array}
 */
function toArray(thing) {
  if (!thing) return null;
  var i = thing.length;
  if (isUndefined(i)) return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

// eslint-disable-next-line func-names
var isTypedArray = (function(TypedArray) {
  // eslint-disable-next-line func-names
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM,
  inherits: inherits,
  toFlatObject: toFlatObject,
  kindOf: kindOf,
  kindOfTest: kindOfTest,
  endsWith: endsWith,
  toArray: toArray,
  isTypedArray: isTypedArray,
  isFileList: isFileList
};


/***/ }),

/***/ "./node_modules/axios/node_modules/form-data/lib/form_data.js":
/*!********************************************************************!*\
  !*** ./node_modules/axios/node_modules/form-data/lib/form_data.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var CombinedStream = __webpack_require__(/*! combined-stream */ "./node_modules/combined-stream/lib/combined_stream.js");
var util = __webpack_require__(/*! util */ "util");
var path = __webpack_require__(/*! path */ "path");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var parseUrl = (__webpack_require__(/*! url */ "url").parse);
var fs = __webpack_require__(/*! fs */ "fs");
var Stream = (__webpack_require__(/*! stream */ "stream").Stream);
var mime = __webpack_require__(/*! mime-types */ "./node_modules/mime-types/index.js");
var asynckit = __webpack_require__(/*! asynckit */ "./node_modules/asynckit/index.js");
var populate = __webpack_require__(/*! ./populate.js */ "./node_modules/axios/node_modules/form-data/lib/populate.js");

// Public API
module.exports = FormData;

// make it a Stream
util.inherits(FormData, CombinedStream);

/**
 * Create readable "multipart/form-data" streams.
 * Can be used to submit forms
 * and file uploads to other web applications.
 *
 * @constructor
 * @param {Object} options - Properties to be added/overriden for FormData and CombinedStream
 */
function FormData(options) {
  if (!(this instanceof FormData)) {
    return new FormData(options);
  }

  this._overheadLength = 0;
  this._valueLength = 0;
  this._valuesToMeasure = [];

  CombinedStream.call(this);

  options = options || {};
  for (var option in options) {
    this[option] = options[option];
  }
}

FormData.LINE_BREAK = '\r\n';
FormData.DEFAULT_CONTENT_TYPE = 'application/octet-stream';

FormData.prototype.append = function(field, value, options) {

  options = options || {};

  // allow filename as single option
  if (typeof options == 'string') {
    options = {filename: options};
  }

  var append = CombinedStream.prototype.append.bind(this);

  // all that streamy business can't handle numbers
  if (typeof value == 'number') {
    value = '' + value;
  }

  // https://github.com/felixge/node-form-data/issues/38
  if (util.isArray(value)) {
    // Please convert your array into string
    // the way web server expects it
    this._error(new Error('Arrays are not supported.'));
    return;
  }

  var header = this._multiPartHeader(field, value, options);
  var footer = this._multiPartFooter();

  append(header);
  append(value);
  append(footer);

  // pass along options.knownLength
  this._trackLength(header, value, options);
};

FormData.prototype._trackLength = function(header, value, options) {
  var valueLength = 0;

  // used w/ getLengthSync(), when length is known.
  // e.g. for streaming directly from a remote server,
  // w/ a known file a size, and not wanting to wait for
  // incoming file to finish to get its size.
  if (options.knownLength != null) {
    valueLength += +options.knownLength;
  } else if (Buffer.isBuffer(value)) {
    valueLength = value.length;
  } else if (typeof value === 'string') {
    valueLength = Buffer.byteLength(value);
  }

  this._valueLength += valueLength;

  // @check why add CRLF? does this account for custom/multiple CRLFs?
  this._overheadLength +=
    Buffer.byteLength(header) +
    FormData.LINE_BREAK.length;

  // empty or either doesn't have path or not an http response or not a stream
  if (!value || ( !value.path && !(value.readable && value.hasOwnProperty('httpVersion')) && !(value instanceof Stream))) {
    return;
  }

  // no need to bother with the length
  if (!options.knownLength) {
    this._valuesToMeasure.push(value);
  }
};

FormData.prototype._lengthRetriever = function(value, callback) {

  if (value.hasOwnProperty('fd')) {

    // take read range into a account
    // `end` = Infinity –> read file till the end
    //
    // TODO: Looks like there is bug in Node fs.createReadStream
    // it doesn't respect `end` options without `start` options
    // Fix it when node fixes it.
    // https://github.com/joyent/node/issues/7819
    if (value.end != undefined && value.end != Infinity && value.start != undefined) {

      // when end specified
      // no need to calculate range
      // inclusive, starts with 0
      callback(null, value.end + 1 - (value.start ? value.start : 0));

    // not that fast snoopy
    } else {
      // still need to fetch file size from fs
      fs.stat(value.path, function(err, stat) {

        var fileSize;

        if (err) {
          callback(err);
          return;
        }

        // update final size based on the range options
        fileSize = stat.size - (value.start ? value.start : 0);
        callback(null, fileSize);
      });
    }

  // or http response
  } else if (value.hasOwnProperty('httpVersion')) {
    callback(null, +value.headers['content-length']);

  // or request stream http://github.com/mikeal/request
  } else if (value.hasOwnProperty('httpModule')) {
    // wait till response come back
    value.on('response', function(response) {
      value.pause();
      callback(null, +response.headers['content-length']);
    });
    value.resume();

  // something else
  } else {
    callback('Unknown stream');
  }
};

FormData.prototype._multiPartHeader = function(field, value, options) {
  // custom header specified (as string)?
  // it becomes responsible for boundary
  // (e.g. to handle extra CRLFs on .NET servers)
  if (typeof options.header == 'string') {
    return options.header;
  }

  var contentDisposition = this._getContentDisposition(value, options);
  var contentType = this._getContentType(value, options);

  var contents = '';
  var headers  = {
    // add custom disposition as third element or keep it two elements if not
    'Content-Disposition': ['form-data', 'name="' + field + '"'].concat(contentDisposition || []),
    // if no content type. allow it to be empty array
    'Content-Type': [].concat(contentType || [])
  };

  // allow custom headers.
  if (typeof options.header == 'object') {
    populate(headers, options.header);
  }

  var header;
  for (var prop in headers) {
    if (!headers.hasOwnProperty(prop)) continue;
    header = headers[prop];

    // skip nullish headers.
    if (header == null) {
      continue;
    }

    // convert all headers to arrays.
    if (!Array.isArray(header)) {
      header = [header];
    }

    // add non-empty headers.
    if (header.length) {
      contents += prop + ': ' + header.join('; ') + FormData.LINE_BREAK;
    }
  }

  return '--' + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
};

FormData.prototype._getContentDisposition = function(value, options) {

  var filename
    , contentDisposition
    ;

  if (typeof options.filepath === 'string') {
    // custom filepath for relative paths
    filename = path.normalize(options.filepath).replace(/\\/g, '/');
  } else if (options.filename || value.name || value.path) {
    // custom filename take precedence
    // formidable and the browser add a name property
    // fs- and request- streams have path property
    filename = path.basename(options.filename || value.name || value.path);
  } else if (value.readable && value.hasOwnProperty('httpVersion')) {
    // or try http response
    filename = path.basename(value.client._httpMessage.path || '');
  }

  if (filename) {
    contentDisposition = 'filename="' + filename + '"';
  }

  return contentDisposition;
};

FormData.prototype._getContentType = function(value, options) {

  // use custom content-type above all
  var contentType = options.contentType;

  // or try `name` from formidable, browser
  if (!contentType && value.name) {
    contentType = mime.lookup(value.name);
  }

  // or try `path` from fs-, request- streams
  if (!contentType && value.path) {
    contentType = mime.lookup(value.path);
  }

  // or if it's http-reponse
  if (!contentType && value.readable && value.hasOwnProperty('httpVersion')) {
    contentType = value.headers['content-type'];
  }

  // or guess it from the filepath or filename
  if (!contentType && (options.filepath || options.filename)) {
    contentType = mime.lookup(options.filepath || options.filename);
  }

  // fallback to the default content type if `value` is not simple value
  if (!contentType && typeof value == 'object') {
    contentType = FormData.DEFAULT_CONTENT_TYPE;
  }

  return contentType;
};

FormData.prototype._multiPartFooter = function() {
  return function(next) {
    var footer = FormData.LINE_BREAK;

    var lastPart = (this._streams.length === 0);
    if (lastPart) {
      footer += this._lastBoundary();
    }

    next(footer);
  }.bind(this);
};

FormData.prototype._lastBoundary = function() {
  return '--' + this.getBoundary() + '--' + FormData.LINE_BREAK;
};

FormData.prototype.getHeaders = function(userHeaders) {
  var header;
  var formHeaders = {
    'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
  };

  for (header in userHeaders) {
    if (userHeaders.hasOwnProperty(header)) {
      formHeaders[header.toLowerCase()] = userHeaders[header];
    }
  }

  return formHeaders;
};

FormData.prototype.setBoundary = function(boundary) {
  this._boundary = boundary;
};

FormData.prototype.getBoundary = function() {
  if (!this._boundary) {
    this._generateBoundary();
  }

  return this._boundary;
};

FormData.prototype.getBuffer = function() {
  var dataBuffer = new Buffer.alloc( 0 );
  var boundary = this.getBoundary();

  // Create the form content. Add Line breaks to the end of data.
  for (var i = 0, len = this._streams.length; i < len; i++) {
    if (typeof this._streams[i] !== 'function') {

      // Add content to the buffer.
      if(Buffer.isBuffer(this._streams[i])) {
        dataBuffer = Buffer.concat( [dataBuffer, this._streams[i]]);
      }else {
        dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(this._streams[i])]);
      }

      // Add break after content.
      if (typeof this._streams[i] !== 'string' || this._streams[i].substring( 2, boundary.length + 2 ) !== boundary) {
        dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(FormData.LINE_BREAK)] );
      }
    }
  }

  // Add the footer and return the Buffer object.
  return Buffer.concat( [dataBuffer, Buffer.from(this._lastBoundary())] );
};

FormData.prototype._generateBoundary = function() {
  // This generates a 50 character boundary similar to those used by Firefox.
  // They are optimized for boyer-moore parsing.
  var boundary = '--------------------------';
  for (var i = 0; i < 24; i++) {
    boundary += Math.floor(Math.random() * 10).toString(16);
  }

  this._boundary = boundary;
};

// Note: getLengthSync DOESN'T calculate streams length
// As workaround one can calculate file size manually
// and add it as knownLength option
FormData.prototype.getLengthSync = function() {
  var knownLength = this._overheadLength + this._valueLength;

  // Don't get confused, there are 3 "internal" streams for each keyval pair
  // so it basically checks if there is any value added to the form
  if (this._streams.length) {
    knownLength += this._lastBoundary().length;
  }

  // https://github.com/form-data/form-data/issues/40
  if (!this.hasKnownLength()) {
    // Some async length retrievers are present
    // therefore synchronous length calculation is false.
    // Please use getLength(callback) to get proper length
    this._error(new Error('Cannot calculate proper length in synchronous way.'));
  }

  return knownLength;
};

// Public API to check if length of added values is known
// https://github.com/form-data/form-data/issues/196
// https://github.com/form-data/form-data/issues/262
FormData.prototype.hasKnownLength = function() {
  var hasKnownLength = true;

  if (this._valuesToMeasure.length) {
    hasKnownLength = false;
  }

  return hasKnownLength;
};

FormData.prototype.getLength = function(cb) {
  var knownLength = this._overheadLength + this._valueLength;

  if (this._streams.length) {
    knownLength += this._lastBoundary().length;
  }

  if (!this._valuesToMeasure.length) {
    process.nextTick(cb.bind(this, null, knownLength));
    return;
  }

  asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
    if (err) {
      cb(err);
      return;
    }

    values.forEach(function(length) {
      knownLength += length;
    });

    cb(null, knownLength);
  });
};

FormData.prototype.submit = function(params, cb) {
  var request
    , options
    , defaults = {method: 'post'}
    ;

  // parse provided url if it's string
  // or treat it as options object
  if (typeof params == 'string') {

    params = parseUrl(params);
    options = populate({
      port: params.port,
      path: params.pathname,
      host: params.hostname,
      protocol: params.protocol
    }, defaults);

  // use custom params
  } else {

    options = populate(params, defaults);
    // if no port provided use default one
    if (!options.port) {
      options.port = options.protocol == 'https:' ? 443 : 80;
    }
  }

  // put that good code in getHeaders to some use
  options.headers = this.getHeaders(params.headers);

  // https if specified, fallback to http in any other case
  if (options.protocol == 'https:') {
    request = https.request(options);
  } else {
    request = http.request(options);
  }

  // get content length and fire away
  this.getLength(function(err, length) {
    if (err && err !== 'Unknown stream') {
      this._error(err);
      return;
    }

    // add content length
    if (length) {
      request.setHeader('Content-Length', length);
    }

    this.pipe(request);
    if (cb) {
      var onResponse;

      var callback = function (error, responce) {
        request.removeListener('error', callback);
        request.removeListener('response', onResponse);

        return cb.call(this, error, responce);
      };

      onResponse = callback.bind(this, null);

      request.on('error', callback);
      request.on('response', onResponse);
    }
  }.bind(this));

  return request;
};

FormData.prototype._error = function(err) {
  if (!this.error) {
    this.error = err;
    this.pause();
    this.emit('error', err);
  }
};

FormData.prototype.toString = function () {
  return '[object FormData]';
};


/***/ }),

/***/ "./node_modules/axios/node_modules/form-data/lib/populate.js":
/*!*******************************************************************!*\
  !*** ./node_modules/axios/node_modules/form-data/lib/populate.js ***!
  \*******************************************************************/
/***/ ((module) => {

// populates missing values
module.exports = function(dst, src) {

  Object.keys(src).forEach(function(prop)
  {
    dst[prop] = dst[prop] || src[prop];
  });

  return dst;
};


/***/ }),

/***/ "./lib/client.ts":
/*!***********************!*\
  !*** ./lib/client.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/* eslint-disable camelcase */

var request_1 = __importDefault(__webpack_require__(/*! ./request */ "./lib/request.ts"));

var domains_1 = __importDefault(__webpack_require__(/*! ./domains */ "./lib/domains.ts"));

var events_1 = __importDefault(__webpack_require__(/*! ./events */ "./lib/events.ts"));

var stats_1 = __importDefault(__webpack_require__(/*! ./stats */ "./lib/stats.ts"));

var suppressions_1 = __importDefault(__webpack_require__(/*! ./suppressions */ "./lib/suppressions.ts"));

var webhooks_1 = __importDefault(__webpack_require__(/*! ./webhooks */ "./lib/webhooks.ts"));

var messages_1 = __importDefault(__webpack_require__(/*! ./messages */ "./lib/messages.ts"));

var routes_1 = __importDefault(__webpack_require__(/*! ./routes */ "./lib/routes.ts"));

var validate_1 = __importDefault(__webpack_require__(/*! ./validate */ "./lib/validate.ts"));

var ips_1 = __importDefault(__webpack_require__(/*! ./ips */ "./lib/ips.ts"));

var ip_pools_1 = __importDefault(__webpack_require__(/*! ./ip-pools */ "./lib/ip-pools.ts"));

var lists_1 = __importDefault(__webpack_require__(/*! ./lists */ "./lib/lists.ts"));

var mailListMembers_1 = __importDefault(__webpack_require__(/*! ./mailListMembers */ "./lib/mailListMembers.ts"));

var domainsCredentials_1 = __importDefault(__webpack_require__(/*! ./domainsCredentials */ "./lib/domainsCredentials.ts"));

var multipleValidation_1 = __importDefault(__webpack_require__(/*! ./multipleValidation */ "./lib/multipleValidation.ts"));

var domainsTemplates_1 = __importDefault(__webpack_require__(/*! ./domainsTemplates */ "./lib/domainsTemplates.ts"));

var domainsTags_1 = __importDefault(__webpack_require__(/*! ./domainsTags */ "./lib/domainsTags.ts"));

var Client =
/** @class */
function () {
  function Client(options, formData) {
    var config = __assign({}, options);

    if (!config.url) {
      config.url = 'https://api.mailgun.net';
    }

    if (!config.username) {
      throw new Error('Parameter "username" is required');
    }

    if (!config.key) {
      throw new Error('Parameter "key" is required');
    }
    /** @internal */


    this.request = new request_1.default(config, formData);
    var mailListsMembers = new mailListMembers_1.default(this.request);
    var domainCredentialsClient = new domainsCredentials_1.default(this.request);
    var domainTemplatesClient = new domainsTemplates_1.default(this.request);
    var domainTagsClient = new domainsTags_1.default(this.request);
    var multipleValidationClient = new multipleValidation_1.default(this.request);
    this.domains = new domains_1.default(this.request, domainCredentialsClient, domainTemplatesClient, domainTagsClient);
    this.webhooks = new webhooks_1.default(this.request);
    this.events = new events_1.default(this.request);
    this.stats = new stats_1.default(this.request);
    this.suppressions = new suppressions_1.default(this.request);
    this.messages = new messages_1.default(this.request);
    this.routes = new routes_1.default(this.request);
    this.ips = new ips_1.default(this.request);
    this.ip_pools = new ip_pools_1.default(this.request);
    this.lists = new lists_1.default(this.request, mailListsMembers);
    this.validate = new validate_1.default(this.request, multipleValidationClient);
  }

  return Client;
}();

exports["default"] = Client;

/***/ }),

/***/ "./lib/common/NavigationThruPages.ts":
/*!*******************************************!*\
  !*** ./lib/common/NavigationThruPages.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var NavigationThruPages =
/** @class */
function () {
  function NavigationThruPages() {}

  NavigationThruPages.prototype.parsePage = function (id, pageUrl, urlSeparator, iteratorName) {
    if (urlSeparator === void 0) {
      urlSeparator = '?';
    }

    if (iteratorName === void 0) {
      iteratorName = 'address';
    }

    var parsedUrl = new URL(pageUrl);
    var searchParams = parsedUrl.searchParams;
    var pageValue = pageUrl && typeof pageUrl === 'string' ? pageUrl.split(urlSeparator).pop() || '' : '';
    return {
      id: id,
      page: urlSeparator === '?' ? "?".concat(pageValue) : pageValue,
      iteratorPosition: searchParams.has(iteratorName) ? searchParams.get(iteratorName) : undefined,
      url: pageUrl
    };
  };

  NavigationThruPages.prototype.parsePageLinks = function (response, urlSeparator, iteratorName) {
    var _this = this;

    var pages = Object.entries(response.body.paging);
    return pages.reduce(function (acc, pair) {
      var id = pair[0];
      var pageUrl = pair[1];
      acc[id] = _this.parsePage(id, pageUrl, urlSeparator, iteratorName);
      return acc;
    }, {});
  };

  return NavigationThruPages;
}();

exports["default"] = NavigationThruPages;

/***/ }),

/***/ "./lib/domains.ts":
/*!************************!*\
  !*** ./lib/domains.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Domain = void 0;
/* eslint-disable camelcase */

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var error_1 = __importDefault(__webpack_require__(/*! ./error */ "./lib/error.ts"));

var Domain =
/** @class */
function () {
  function Domain(data, receiving, sending) {
    this.name = data.name;
    this.require_tls = data.require_tls;
    this.skip_verification = data.skip_verification;
    this.state = data.state;
    this.wildcard = data.wildcard;
    this.spam_action = data.spam_action;
    this.created_at = data.created_at;
    this.smtp_password = data.smtp_password;
    this.smtp_login = data.smtp_login;
    this.type = data.type;
    this.receiving_dns_records = receiving || null;
    this.sending_dns_records = sending || null;
  }

  return Domain;
}();

exports.Domain = Domain;

var DomainClient =
/** @class */
function () {
  function DomainClient(request, domainCredentialsClient, domainTemplatesClient, domainTagsClient) {
    this.request = request;
    this.domainCredentials = domainCredentialsClient;
    this.domainTemplates = domainTemplatesClient;
    this.domainTags = domainTagsClient;
  }

  DomainClient.prototype._parseMessage = function (response) {
    return response.body;
  };

  DomainClient.prototype._parseDomainList = function (response) {
    return response.body.items.map(function (item) {
      return new Domain(item);
    });
  };

  DomainClient.prototype._parseDomain = function (response) {
    return new Domain(response.body.domain, response.body.receiving_dns_records, response.body.sending_dns_records);
  };

  DomainClient.prototype._parseTrackingSettings = function (response) {
    return response.body.tracking;
  };

  DomainClient.prototype._parseTrackingUpdate = function (response) {
    return response.body;
  };

  DomainClient.prototype.list = function (query) {
    var _this = this;

    return this.request.get('/v3/domains', query).then(function (res) {
      return _this._parseDomainList(res);
    });
  };

  DomainClient.prototype.get = function (domain) {
    var _this = this;

    return this.request.get("/v3/domains/".concat(domain)).then(function (res) {
      return _this._parseDomain(res);
    });
  };

  DomainClient.prototype.create = function (data) {
    var _this = this;

    var postObj = __assign({}, data);

    if ('force_dkim_authority' in postObj && typeof postObj.force_dkim_authority === 'boolean') {
      postObj.force_dkim_authority = postObj.toString() === 'true' ? 'true' : 'false';
    }

    return this.request.postWithFD('/v3/domains', postObj).then(function (res) {
      return _this._parseDomain(res);
    });
  };

  DomainClient.prototype.verify = function (domain) {
    var _this = this;

    return this.request.put("/v3/domains/".concat(domain, "/verify")).then(function (res) {
      return _this._parseDomain(res);
    });
  };

  DomainClient.prototype.destroy = function (domain) {
    var _this = this;

    return this.request.delete("/v3/domains/".concat(domain)).then(function (res) {
      return _this._parseMessage(res);
    });
  };

  DomainClient.prototype.getConnection = function (domain) {
    return this.request.get("/v3/domains/".concat(domain, "/connection")).then(function (res) {
      return res;
    }).then(function (res) {
      return res.body.connection;
    });
  };

  DomainClient.prototype.updateConnection = function (domain, data) {
    return this.request.put("/v3/domains/".concat(domain, "/connection"), data).then(function (res) {
      return res;
    }).then(function (res) {
      return res.body;
    });
  }; // Tracking


  DomainClient.prototype.getTracking = function (domain) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'tracking')).then(this._parseTrackingSettings);
  };

  DomainClient.prototype.updateTracking = function (domain, type, data) {
    var _this = this;

    if (typeof (data === null || data === void 0 ? void 0 : data.active) === 'boolean') {
      throw new error_1.default({
        status: 400,
        statusText: 'Received boolean value for active property',
        body: {
          message: 'Property "active" must contain string value.'
        }
      });
    }

    return this.request.putWithFD((0, url_join_1.default)('/v3/domains', domain, 'tracking', type), data).then(function (res) {
      return _this._parseTrackingUpdate(res);
    });
  }; // IPs


  DomainClient.prototype.getIps = function (domain) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'ips')).then(function (response) {
      var _a;

      return (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.items;
    });
  };

  DomainClient.prototype.assignIp = function (domain, ip) {
    return this.request.postWithFD((0, url_join_1.default)('/v3/domains', domain, 'ips'), {
      ip: ip
    });
  };

  DomainClient.prototype.deleteIp = function (domain, ip) {
    return this.request.delete((0, url_join_1.default)('/v3/domains', domain, 'ips', ip));
  };

  DomainClient.prototype.linkIpPool = function (domain, pool_id) {
    return this.request.postWithFD((0, url_join_1.default)('/v3/domains', domain, 'ips'), {
      pool_id: pool_id
    });
  };

  DomainClient.prototype.unlinkIpPoll = function (domain, replacement) {
    var searchParams = '';

    if (replacement.pool_id && replacement.ip) {
      throw new error_1.default({
        status: 400,
        statusText: 'Too much data for replacement',
        body: {
          message: 'Please specify either pool_id or ip (not both)'
        }
      });
    } else if (replacement.pool_id) {
      searchParams = "?pool_id=".concat(replacement.pool_id);
    } else if (replacement.ip) {
      searchParams = "?ip=".concat(replacement.ip);
    }

    return this.request.delete((0, url_join_1.default)('/v3/domains', domain, 'ips', 'ip_pool', searchParams));
  };

  DomainClient.prototype.updateDKIMAuthority = function (domain, data) {
    return this.request.put("/v3/domains/".concat(domain, "/dkim_authority"), {}, {
      query: "self=".concat(data.self)
    }).then(function (res) {
      return res;
    }).then(function (res) {
      return res.body;
    });
  };

  DomainClient.prototype.updateDKIMSelector = function (domain, data) {
    return this.request.put("/v3/domains/".concat(domain, "/dkim_selector"), {}, {
      query: "dkim_selector=".concat(data.dkimSelector)
    }).then(function (res) {
      return res;
    });
  };

  DomainClient.prototype.updateWebPrefix = function (domain, data) {
    return this.request.put("/v3/domains/".concat(domain, "/web_prefix"), {}, {
      query: "web_prefix=".concat(data.webPrefix)
    }).then(function (res) {
      return res;
    });
  };

  return DomainClient;
}();

exports["default"] = DomainClient;

/***/ }),

/***/ "./lib/domainsCredentials.ts":
/*!***********************************!*\
  !*** ./lib/domainsCredentials.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var DomainCredentialsClient =
/** @class */
function () {
  function DomainCredentialsClient(request) {
    this.request = request;
    this.baseRoute = '/v3/domains/';
  }

  DomainCredentialsClient.prototype._parseDomainCredentialsList = function (response) {
    return {
      items: response.body.items,
      totalCount: response.body.total_count
    };
  };

  DomainCredentialsClient.prototype._parseMessageResponse = function (response) {
    var result = {
      status: response.status,
      message: response.body.message
    };
    return result;
  };

  DomainCredentialsClient.prototype._parseDeletedResponse = function (response) {
    var result = {
      status: response.status,
      message: response.body.message,
      spec: response.body.spec
    };
    return result;
  };

  DomainCredentialsClient.prototype.list = function (domain, query) {
    var _this = this;

    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/credentials'), query).then(function (res) {
      return _this._parseDomainCredentialsList(res);
    });
  };

  DomainCredentialsClient.prototype.create = function (domain, data) {
    var _this = this;

    return this.request.postWithFD("".concat(this.baseRoute).concat(domain, "/credentials"), data).then(function (res) {
      return _this._parseMessageResponse(res);
    });
  };

  DomainCredentialsClient.prototype.update = function (domain, credentialsLogin, data) {
    var _this = this;

    return this.request.putWithFD("".concat(this.baseRoute).concat(domain, "/credentials/").concat(credentialsLogin), data).then(function (res) {
      return _this._parseMessageResponse(res);
    });
  };

  DomainCredentialsClient.prototype.destroy = function (domain, credentialsLogin) {
    var _this = this;

    return this.request.delete("".concat(this.baseRoute).concat(domain, "/credentials/").concat(credentialsLogin)).then(function (res) {
      return _this._parseDeletedResponse(res);
    });
  };

  return DomainCredentialsClient;
}();

exports["default"] = DomainCredentialsClient;

/***/ }),

/***/ "./lib/domainsTags.ts":
/*!****************************!*\
  !*** ./lib/domainsTags.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DomainTagStatistic = exports.DomainTag = void 0;

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var NavigationThruPages_1 = __importDefault(__webpack_require__(/*! ./common/NavigationThruPages */ "./lib/common/NavigationThruPages.ts"));

var DomainTag =
/** @class */
function () {
  function DomainTag(tagInfo) {
    this.tag = tagInfo.tag;
    this.description = tagInfo.description;
    this['first-seen'] = new Date(tagInfo['first-seen']);
    this['last-seen'] = new Date(tagInfo['last-seen']);
  }

  return DomainTag;
}();

exports.DomainTag = DomainTag;

var DomainTagStatistic =
/** @class */
function () {
  function DomainTagStatistic(tagStatisticInfo) {
    this.tag = tagStatisticInfo.body.tag;
    this.description = tagStatisticInfo.body.description;
    this.start = new Date(tagStatisticInfo.body.start);
    this.end = new Date(tagStatisticInfo.body.end);
    this.resolution = tagStatisticInfo.body.resolution;
    this.stats = tagStatisticInfo.body.stats.map(function (stat) {
      var res = __assign(__assign({}, stat), {
        time: new Date(stat.time)
      });

      return res;
    });
  }

  return DomainTagStatistic;
}();

exports.DomainTagStatistic = DomainTagStatistic;

var DomainTagsClient =
/** @class */
function (_super) {
  __extends(DomainTagsClient, _super);

  function DomainTagsClient(request) {
    var _this = _super.call(this) || this;

    _this.request = request;
    _this.baseRoute = '/v3/';
    return _this;
  }

  DomainTagsClient.prototype.parseList = function (response) {
    var data = {};
    data.items = response.body.items.map(function (tagInfo) {
      return new DomainTag(tagInfo);
    });
    data.pages = this.parsePageLinks(response, '?', 'tag');
    data.status = response.status;
    return data;
  };

  DomainTagsClient.prototype._parseTagStatistic = function (response) {
    return new DomainTagStatistic(response);
  };

  DomainTagsClient.prototype.list = function (domain, query) {
    var _this = this;

    var url;

    var queryCopy = __assign({}, query);

    if (queryCopy && queryCopy.page) {
      url = (0, url_join_1.default)(this.baseRoute, domain, '/tags', queryCopy.page);
      delete queryCopy.page;
    } else {
      url = (0, url_join_1.default)(this.baseRoute, domain, '/tags');
    }

    return this.request.get(url, query).then(function (res) {
      return _this.parseList(res);
    });
  };

  DomainTagsClient.prototype.get = function (domain, tag) {
    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/tags', tag)).then(function (res) {
      return new DomainTag(res.body);
    });
  };

  DomainTagsClient.prototype.update = function (domain, tag, description) {
    return this.request.put((0, url_join_1.default)(this.baseRoute, domain, '/tags', tag), description).then(function (res) {
      return res.body;
    });
  };

  DomainTagsClient.prototype.destroy = function (domain, tag) {
    return this.request.delete("".concat(this.baseRoute).concat(domain, "/tags/").concat(tag)).then(function (res) {
      return {
        message: res.body.message,
        status: res.status
      };
    });
  };

  DomainTagsClient.prototype.statistic = function (domain, tag, query) {
    var _this = this;

    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/tags', tag, 'stats'), query).then(function (res) {
      return _this._parseTagStatistic(res);
    });
  };

  DomainTagsClient.prototype.countries = function (domain, tag) {
    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/countries')).then(function (res) {
      return res.body;
    });
  };

  DomainTagsClient.prototype.providers = function (domain, tag) {
    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/providers')).then(function (res) {
      return res.body;
    });
  };

  DomainTagsClient.prototype.devices = function (domain, tag) {
    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/devices')).then(function (res) {
      return res.body;
    });
  };

  return DomainTagsClient;
}(NavigationThruPages_1.default);

exports["default"] = DomainTagsClient;

/***/ }),

/***/ "./lib/domainsTemplates.ts":
/*!*********************************!*\
  !*** ./lib/domainsTemplates.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DomainTemplateItem = void 0;

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var DomainTemplateItem =
/** @class */
function () {
  function DomainTemplateItem(domainTemplateFromAPI) {
    this.name = domainTemplateFromAPI.name;
    this.description = domainTemplateFromAPI.description;
    this.createdAt = domainTemplateFromAPI.createdAt ? new Date(domainTemplateFromAPI.createdAt) : '';
    this.createdBy = domainTemplateFromAPI.createdBy;
    this.id = domainTemplateFromAPI.id;

    if (domainTemplateFromAPI.version) {
      this.version = domainTemplateFromAPI.version;

      if (domainTemplateFromAPI.version.createdAt) {
        this.version.createdAt = new Date(domainTemplateFromAPI.version.createdAt);
      }
    }

    if (domainTemplateFromAPI.versions && domainTemplateFromAPI.versions.length) {
      this.versions = domainTemplateFromAPI.versions.map(function (version) {
        var result = __assign({}, version);

        result.createdAt = new Date(version.createdAt);
        return result;
      });
    }
  }

  return DomainTemplateItem;
}();

exports.DomainTemplateItem = DomainTemplateItem;

var DomainTemplatesClient =
/** @class */
function () {
  function DomainTemplatesClient(request) {
    this.request = request;
    this.baseRoute = '/v3/';
  }

  DomainTemplatesClient.prototype.parseCreationResponse = function (data) {
    return new DomainTemplateItem(data.body.template);
  };

  DomainTemplatesClient.prototype.parseCreationVersionResponse = function (data) {
    var result = {};
    result.status = data.status;
    result.message = data.body.message;

    if (data.body && data.body.template) {
      result.template = new DomainTemplateItem(data.body.template);
    }

    return result;
  };

  DomainTemplatesClient.prototype.parseMutationResponse = function (data) {
    var result = {};
    result.status = data.status;
    result.message = data.body.message;

    if (data.body && data.body.template) {
      result.templateName = data.body.template.name;
    }

    return result;
  };

  DomainTemplatesClient.prototype.parseNotificationResponse = function (data) {
    var result = {};
    result.status = data.status;
    result.message = data.body.message;
    return result;
  };

  DomainTemplatesClient.prototype.parseMutateTemplateVersionResponse = function (data) {
    var result = {};
    result.status = data.status;
    result.message = data.body.message;

    if (data.body.template) {
      result.templateName = data.body.template.name;
      result.templateVersion = {
        tag: data.body.template.version.tag
      };
    }

    return result;
  };

  DomainTemplatesClient.prototype.parseList = function (response) {
    var data = {};
    data.items = response.body.items.map(function (d) {
      return new DomainTemplateItem(d);
    });
    data.pages = response.body.paging;
    return data;
  };

  DomainTemplatesClient.prototype.parseListTemplateVersions = function (response) {
    var data = {};
    data.template = new DomainTemplateItem(response.body.template);
    data.pages = response.body.paging;
    return data;
  };

  DomainTemplatesClient.prototype.list = function (domain, query) {
    var _this = this;

    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/templates'), query).then(function (res) {
      return _this.parseList(res);
    });
  };

  DomainTemplatesClient.prototype.get = function (domain, templateName, query) {
    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName), query).then(function (res) {
      return new DomainTemplateItem(res.body.template);
    });
  };

  DomainTemplatesClient.prototype.create = function (domain, data) {
    var _this = this;

    return this.request.postWithFD((0, url_join_1.default)(this.baseRoute, domain, '/templates'), data).then(function (res) {
      return _this.parseCreationResponse(res);
    });
  };

  DomainTemplatesClient.prototype.update = function (domain, templateName, data) {
    var _this = this;

    return this.request.putWithFD((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName), data).then(function (res) {
      return _this.parseMutationResponse(res);
    });
  };

  DomainTemplatesClient.prototype.destroy = function (domain, templateName) {
    var _this = this;

    return this.request.delete((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName)).then(function (res) {
      return _this.parseMutationResponse(res);
    });
  };

  DomainTemplatesClient.prototype.destroyAll = function (domain) {
    var _this = this;

    return this.request.delete((0, url_join_1.default)(this.baseRoute, domain, '/templates')).then(function (res) {
      return _this.parseNotificationResponse(res);
    });
  };

  DomainTemplatesClient.prototype.createVersion = function (domain, templateName, data) {
    var _this = this;

    return this.request.postWithFD((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName, '/versions'), data).then(function (res) {
      return _this.parseCreationVersionResponse(res);
    });
  };

  DomainTemplatesClient.prototype.getVersion = function (domain, templateName, tag) {
    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag)).then(function (res) {
      return new DomainTemplateItem(res.body.template);
    });
  };

  DomainTemplatesClient.prototype.updateVersion = function (domain, templateName, tag, data) {
    var _this = this;

    return this.request.putWithFD((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag), data).then( // eslint-disable-next-line max-len
    function (res) {
      return _this.parseMutateTemplateVersionResponse(res);
    });
  };

  DomainTemplatesClient.prototype.destroyVersion = function (domain, templateName, tag) {
    var _this = this;

    return this.request.delete((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag)) // eslint-disable-next-line max-len
    .then(function (res) {
      return _this.parseMutateTemplateVersionResponse(res);
    });
  };

  DomainTemplatesClient.prototype.listVersions = function (domain, templateName, query) {
    var _this = this;

    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/templates', templateName, '/versions'), query).then(function (res) {
      return _this.parseListTemplateVersions(res);
    });
  };

  return DomainTemplatesClient;
}();

exports["default"] = DomainTemplatesClient;

/***/ }),

/***/ "./lib/error.ts":
/*!**********************!*\
  !*** ./lib/error.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var APIError =
/** @class */
function (_super) {
  __extends(APIError, _super);

  function APIError(_a) {
    var status = _a.status,
        statusText = _a.statusText,
        message = _a.message,
        _b = _a.body,
        body = _b === void 0 ? {} : _b;

    var _this = this;

    var bodyMessage = '';
    var error = '';

    if (typeof body === 'string') {
      bodyMessage = body;
    } else {
      bodyMessage = body === null || body === void 0 ? void 0 : body.message;
      error = body === null || body === void 0 ? void 0 : body.error;
    }

    _this = _super.call(this) || this;
    _this.stack = '';
    _this.status = status;
    _this.message = message || error || statusText;
    _this.details = bodyMessage;
    return _this;
  }

  return APIError;
}(Error);

exports["default"] = APIError;

/***/ }),

/***/ "./lib/events.ts":
/*!***********************!*\
  !*** ./lib/events.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var EventClient =
/** @class */
function () {
  function EventClient(request) {
    this.request = request;
  }

  EventClient.prototype._parsePageNumber = function (url) {
    return url.split('/').pop() || '';
  };

  EventClient.prototype._parsePage = function (id, url) {
    return {
      id: id,
      number: this._parsePageNumber(url),
      url: url
    };
  };

  EventClient.prototype._parsePageLinks = function (response) {
    var _this = this;

    var pages = Object.entries(response.body.paging);
    return pages.reduce(function (acc, pair) {
      var id = pair[0];
      var url = pair[1];
      acc[id] = _this._parsePage(id, url);
      return acc;
    }, {});
  };

  EventClient.prototype._parseEventList = function (response) {
    return {
      items: response.body.items,
      pages: this._parsePageLinks(response)
    };
  };

  EventClient.prototype.get = function (domain, query) {
    var _this = this;

    var url;

    var queryCopy = __assign({}, query);

    if (queryCopy && queryCopy.page) {
      url = (0, url_join_1.default)('/v3', domain, 'events', queryCopy.page);
      delete queryCopy.page;
    } else {
      url = (0, url_join_1.default)('/v3', domain, 'events');
    }

    return this.request.get(url, queryCopy).then(function (response) {
      return _this._parseEventList(response);
    });
  };

  return EventClient;
}();

exports["default"] = EventClient;

/***/ }),

/***/ "./lib/formDataBuilder.ts":
/*!********************************!*\
  !*** ./lib/formDataBuilder.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var FormDataBuilder =
/** @class */
function () {
  function FormDataBuilder(FormDataConstructor) {
    this.FormDataConstructor = FormDataConstructor;
  }

  FormDataBuilder.prototype.createFormData = function (data) {
    var _this = this;

    if (!data) {
      throw new Error('Please provide data object');
    }

    var formData = Object.keys(data).filter(function (key) {
      return data[key];
    }).reduce(function (formDataAcc, key) {
      var fileKeys = ['attachment', 'inline', 'multipleValidationFile'];

      if (fileKeys.includes(key)) {
        _this.addFilesToFD(key, data[key], formDataAcc);

        return formDataAcc;
      }

      if (key === 'message') {
        // mime message
        _this.addMimeDataToFD(key, data[key], formDataAcc);

        return formDataAcc;
      }

      _this.addCommonPropertyToFD(key, data[key], formDataAcc);

      return formDataAcc;
    }, new this.FormDataConstructor());
    return formData;
  };

  FormDataBuilder.prototype.isNodeFormData = function (formDataInstance) {
    return formDataInstance.getHeaders !== undefined;
  };

  FormDataBuilder.prototype.getAttachmentOptions = function (item) {
    if (typeof item !== 'object' || this.isStream(item)) return {};
    var filename = item.filename,
        contentType = item.contentType,
        knownLength = item.knownLength;
    return __assign(__assign(__assign({}, filename ? {
      filename: filename
    } : {
      filename: 'file'
    }), contentType && {
      contentType: contentType
    }), knownLength && {
      knownLength: knownLength
    });
  };

  FormDataBuilder.prototype.addMimeDataToFD = function (key, data, formDataInstance) {
    if (Buffer.isBuffer(data) || typeof data === 'string') {
      var nodeFormData = formDataInstance;
      var preparedData = typeof data === 'string' ? Buffer.from(data) : data;
      nodeFormData.append(key, preparedData, {
        filename: 'MimeMessage'
      });
    } else {
      var browserFormData = formDataInstance;
      browserFormData.append(key, data, 'MimeMessage');
    }
  };

  FormDataBuilder.prototype.addFilesToFD = function (propertyName, value, formDataInstance) {
    var _this = this;

    var appendFileToFD = function (originalKey, obj, formData) {
      var key = originalKey === 'multipleValidationFile' ? 'file' : originalKey;

      var isStreamData = _this.isStream(obj);

      var objData = isStreamData ? obj : obj.data; // getAttachmentOptions should be called with obj parameter to prevent loosing filename

      var options = _this.getAttachmentOptions(obj);

      if (_this.isNodeFormData(formData)) {
        formData.append(key, objData, options);
        return;
      }

      formData.append(key, objData, options.filename);
    };

    if (Array.isArray(value)) {
      value.forEach(function (item) {
        appendFileToFD(propertyName, item, formDataInstance);
      });
    } else {
      appendFileToFD(propertyName, value, formDataInstance);
    }
  };

  FormDataBuilder.prototype.isStream = function (data) {
    return typeof data === 'object' && typeof data.pipe === 'function';
  };

  FormDataBuilder.prototype.addCommonPropertyToFD = function (key, value, formDataAcc) {
    if (Array.isArray(value)) {
      value.forEach(function (item) {
        formDataAcc.append(key, item);
      });
    } else if (value != null) {
      formDataAcc.append(key, value);
    }
  };

  return FormDataBuilder;
}();

exports["default"] = FormDataBuilder;

/***/ }),

/***/ "./lib/index.ts":
/*!**********************!*\
  !*** ./lib/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var client_1 = __importDefault(__webpack_require__(/*! ./client */ "./lib/client.ts"));

var Mailgun =
/** @class */
function () {
  function Mailgun(FormData) {
    this.formData = FormData;
  }

  Object.defineProperty(Mailgun, "default", {
    get: function () {
      return this;
    },
    enumerable: false,
    configurable: true
  });

  Mailgun.prototype.client = function (options) {
    return new client_1.default(options, this.formData);
  };

  return Mailgun;
}();

exports["default"] = Mailgun;

/***/ }),

/***/ "./lib/interfaces/Supressions.ts":
/*!***************************************!*\
  !*** ./lib/interfaces/Supressions.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SuppressionModels = void 0;
var SuppressionModels;

(function (SuppressionModels) {
  SuppressionModels["BOUNCES"] = "bounces";
  SuppressionModels["COMPLAINTS"] = "complaints";
  SuppressionModels["UNSUBSCRIBES"] = "unsubscribes";
  SuppressionModels["WHITELISTS"] = "whitelists";
})(SuppressionModels = exports.SuppressionModels || (exports.SuppressionModels = {}));

/***/ }),

/***/ "./lib/ip-pools.ts":
/*!*************************!*\
  !*** ./lib/ip-pools.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var IpPoolsClient =
/** @class */
function () {
  function IpPoolsClient(request) {
    this.request = request;
  }

  IpPoolsClient.prototype.list = function () {
    var _this = this;

    return this.request.get('/v1/ip_pools').then(function (response) {
      return _this.parseIpPoolsResponse(response);
    });
  };

  IpPoolsClient.prototype.create = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.request.postWithFD('/v1/ip_pools', data)];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , __assign({
              status: response.status
            }, response.body)];
        }
      });
    });
  };

  IpPoolsClient.prototype.update = function (poolId, data) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.request.patchWithFD("/v1/ip_pools/".concat(poolId), data)];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , __assign({
              status: response.status
            }, response.body)];
        }
      });
    });
  };

  IpPoolsClient.prototype.delete = function (poolId, data) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.request.delete("/v1/ip_pools/".concat(poolId), data)];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , __assign({
              status: response.status
            }, response.body)];
        }
      });
    });
  };

  IpPoolsClient.prototype.parseIpPoolsResponse = function (response) {
    return __assign({
      status: response.status
    }, response.body);
  };

  return IpPoolsClient;
}();

exports["default"] = IpPoolsClient;

/***/ }),

/***/ "./lib/ips.ts":
/*!********************!*\
  !*** ./lib/ips.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var IpsClient =
/** @class */
function () {
  function IpsClient(request) {
    this.request = request;
  }

  IpsClient.prototype.list = function (query) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.request.get('/v3/ips', query)];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , this.parseIpsResponse(response)];
        }
      });
    });
  };

  IpsClient.prototype.get = function (ip) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.request.get("/v3/ips/".concat(ip))];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , this.parseIpsResponse(response)];
        }
      });
    });
  };

  IpsClient.prototype.parseIpsResponse = function (response) {
    return response.body;
  };

  return IpsClient;
}();

exports["default"] = IpsClient;

/***/ }),

/***/ "./lib/lists.ts":
/*!**********************!*\
  !*** ./lib/lists.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var ListsClient =
/** @class */
function () {
  function ListsClient(request, members) {
    this.request = request;
    this.baseRoute = '/v3/lists';
    this.members = members;
  }

  ListsClient.prototype.parseValidationResult = function (status, data) {
    return {
      status: status,
      validationResult: __assign(__assign({}, data), {
        created_at: new Date(data.created_at * 1000) // add millisecond to Unix timestamp

      })
    };
  };

  ListsClient.prototype.list = function (query) {
    return this.request.get("".concat(this.baseRoute, "/pages"), query).then(function (response) {
      return response.body.items;
    });
  };

  ListsClient.prototype.get = function (mailListAddress) {
    return this.request.get("".concat(this.baseRoute, "/").concat(mailListAddress)).then(function (response) {
      return response.body.list;
    });
  };

  ListsClient.prototype.create = function (data) {
    return this.request.postWithFD(this.baseRoute, data).then(function (response) {
      return response.body.list;
    });
  };

  ListsClient.prototype.update = function (mailListAddress, data) {
    return this.request.putWithFD("".concat(this.baseRoute, "/").concat(mailListAddress), data).then(function (response) {
      return response.body.list;
    });
  };

  ListsClient.prototype.destroy = function (mailListAddress) {
    return this.request.delete("".concat(this.baseRoute, "/").concat(mailListAddress)).then(function (response) {
      return response.body;
    });
  };

  ListsClient.prototype.validate = function (mailListAddress) {
    return this.request.post("".concat(this.baseRoute, "/").concat(mailListAddress, "/validate"), {}).then(function (response) {
      return __assign({
        status: response.status
      }, response.body);
    });
  };

  ListsClient.prototype.validationResult = function (mailListAddress) {
    var _this = this;

    return this.request.get("".concat(this.baseRoute, "/").concat(mailListAddress, "/validate")).then(function (response) {
      return _this.parseValidationResult(response.status, response.body);
    });
  };

  ListsClient.prototype.cancelValidation = function (mailListAddress) {
    return this.request.delete("".concat(this.baseRoute, "/").concat(mailListAddress, "/validate")).then(function (response) {
      return {
        status: response.status,
        message: response.body.message
      };
    });
  };

  return ListsClient;
}();

exports["default"] = ListsClient;

/***/ }),

/***/ "./lib/mailListMembers.ts":
/*!********************************!*\
  !*** ./lib/mailListMembers.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var NavigationThruPages_1 = __importDefault(__webpack_require__(/*! ./common/NavigationThruPages */ "./lib/common/NavigationThruPages.ts"));

var MailListsMembers =
/** @class */
function (_super) {
  __extends(MailListsMembers, _super);

  function MailListsMembers(request) {
    var _this = _super.call(this) || this;

    _this.request = request;
    _this.baseRoute = '/v3/lists';
    return _this;
  }

  MailListsMembers.prototype.checkAndUpdateData = function (data) {
    var newData = __assign({}, data);

    if (typeof data.vars === 'object') {
      newData.vars = JSON.stringify(newData.vars);
    }

    if (typeof data.subscribed === 'boolean') {
      newData.subscribed = data.subscribed ? 'yes' : 'no';
    }

    return newData;
  };

  MailListsMembers.prototype.parseList = function (response) {
    var data = {};
    data.items = response.body.items;
    data.pages = this.parsePageLinks(response);
    return data;
  };

  MailListsMembers.prototype.listMembers = function (mailListAddress, query) {
    return __awaiter(this, void 0, void 0, function () {
      var url, queryCopy, apiResponse;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            queryCopy = __assign({}, query);

            if (queryCopy && queryCopy.page) {
              url = (0, url_join_1.default)("".concat(this.baseRoute, "/").concat(mailListAddress, "/members/pages"), queryCopy.page);
              delete queryCopy.page;
            } else {
              url = (0, url_join_1.default)("".concat(this.baseRoute, "/").concat(mailListAddress, "/members/pages"));
            }

            return [4
            /*yield*/
            , this.request.get(url, queryCopy)];

          case 1:
            apiResponse = _a.sent();
            return [2
            /*return*/
            , this.parseList(apiResponse)];
        }
      });
    });
  };

  MailListsMembers.prototype.getMember = function (mailListAddress, mailListMemberAddress) {
    return this.request.get("".concat(this.baseRoute, "/").concat(mailListAddress, "/members/").concat(mailListMemberAddress)).then(function (response) {
      return response.body.member;
    });
  };

  MailListsMembers.prototype.createMember = function (mailListAddress, data) {
    var reqData = this.checkAndUpdateData(data);
    return this.request.postWithFD("".concat(this.baseRoute, "/").concat(mailListAddress, "/members"), reqData).then(function (response) {
      return response.body.member;
    });
  };

  MailListsMembers.prototype.createMembers = function (mailListAddress, data) {
    var newData = {
      members: Array.isArray(data.members) ? JSON.stringify(data.members) : data.members,
      upsert: data.upsert
    };
    return this.request.postWithFD("".concat(this.baseRoute, "/").concat(mailListAddress, "/members.json"), newData).then(function (response) {
      return response.body;
    });
  };

  MailListsMembers.prototype.updateMember = function (mailListAddress, mailListMemberAddress, data) {
    var reqData = this.checkAndUpdateData(data);
    return this.request.putWithFD("".concat(this.baseRoute, "/").concat(mailListAddress, "/members/").concat(mailListMemberAddress), reqData).then(function (response) {
      return response.body.member;
    });
  };

  MailListsMembers.prototype.destroyMember = function (mailListAddress, mailListMemberAddress) {
    return this.request.delete("".concat(this.baseRoute, "/").concat(mailListAddress, "/members/").concat(mailListMemberAddress)).then(function (response) {
      return response.body;
    });
  };

  return MailListsMembers;
}(NavigationThruPages_1.default);

exports["default"] = MailListsMembers;

/***/ }),

/***/ "./lib/messages.ts":
/*!*************************!*\
  !*** ./lib/messages.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var error_1 = __importDefault(__webpack_require__(/*! ./error */ "./lib/error.ts"));

var MessagesClient =
/** @class */
function () {
  function MessagesClient(request) {
    this.request = request;
  }

  MessagesClient.prototype.prepareBooleanValues = function (data) {
    var yesNoProperties = new Set(['o:testmode', 't:text', 'o:dkim', 'o:tracking', 'o:tracking-clicks', 'o:tracking-opens', 'o:require-tls', 'o:skip-verification']);

    if (!data || Object.keys(data).length === 0) {
      throw new error_1.default({
        status: 400,
        message: 'Message data object can not be empty'
      });
    }

    return Object.keys(data).reduce(function (acc, key) {
      if (yesNoProperties.has(key) && typeof data[key] === 'boolean') {
        acc[key] = data[key] ? 'yes' : 'no';
      } else {
        acc[key] = data[key];
      }

      return acc;
    }, {});
  };

  MessagesClient.prototype._parseResponse = function (response) {
    return __assign({
      status: response.status
    }, response.body);
  };

  MessagesClient.prototype.create = function (domain, data) {
    if (data.message) {
      return this.request.postWithFD("/v3/".concat(domain, "/messages.mime"), data).then(this._parseResponse);
    }

    var modifiedData = this.prepareBooleanValues(data);
    return this.request.postWithFD("/v3/".concat(domain, "/messages"), modifiedData).then(this._parseResponse);
  };

  return MessagesClient;
}();

exports["default"] = MessagesClient;

/***/ }),

/***/ "./lib/multipleValidation.ts":
/*!***********************************!*\
  !*** ./lib/multipleValidation.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var MultipleValidationClient =
/** @class */
function () {
  function MultipleValidationClient(request) {
    this.request = request;
  }

  MultipleValidationClient.prototype.handleResponse = function (response) {
    return __assign({
      status: response.status
    }, response === null || response === void 0 ? void 0 : response.body);
  };

  MultipleValidationClient.prototype.list = function () {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.request.get('/v4/address/validate/bulk')];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , this.handleResponse(response)];
        }
      });
    });
  };

  MultipleValidationClient.prototype.get = function (listId) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.request.get("/v4/address/validate/bulk/".concat(listId))];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , __assign({
              responseStatusCode: response.status
            }, response === null || response === void 0 ? void 0 : response.body)];
        }
      });
    });
  };

  MultipleValidationClient.prototype.create = function (listId, data) {
    return __awaiter(this, void 0, void 0, function () {
      var multipleValidationData, response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            multipleValidationData = __assign({
              multipleValidationFile: __assign({}, data === null || data === void 0 ? void 0 : data.file)
            }, data);
            delete multipleValidationData.file;
            return [4
            /*yield*/
            , this.request.postWithFD("/v4/address/validate/bulk/".concat(listId), multipleValidationData)];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , this.handleResponse(response)];
        }
      });
    });
  };

  MultipleValidationClient.prototype.destroy = function (listId) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.request.delete("/v4/address/validate/bulk/".concat(listId))];

          case 1:
            response = _a.sent();
            return [2
            /*return*/
            , this.handleResponse(response)];
        }
      });
    });
  };

  return MultipleValidationClient;
}();

exports["default"] = MultipleValidationClient;

/***/ }),

/***/ "./lib/request.ts":
/*!************************!*\
  !*** ./lib/request.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var base64 = __importStar(__webpack_require__(/*! base-64 */ "./node_modules/base-64/base64.js"));

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var error_1 = __importDefault(__webpack_require__(/*! ./error */ "./lib/error.ts"));

var formDataBuilder_1 = __importDefault(__webpack_require__(/*! ./formDataBuilder */ "./lib/formDataBuilder.ts"));

var Request =
/** @class */
function () {
  function Request(options, formData) {
    this.username = options.username;
    this.key = options.key;
    this.url = options.url;
    this.timeout = options.timeout;
    this.headers = options.headers || {};
    this.formDataBuilder = new formDataBuilder_1.default(formData);
    this.maxBodyLength = 25000000; // 25MB
  }

  Request.prototype.request = function (method, url, onCallOptions) {
    var _a, _b, _c;

    return __awaiter(this, void 0, void 0, function () {
      var options, basic, onCallHeaders, headers, params, body, response, urlValue, err_1, errorResponse, res;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            options = __assign({}, onCallOptions);
            basic = base64.encode("".concat(this.username, ":").concat(this.key));
            onCallHeaders = options.headers ? options.headers : {};
            headers = __assign(__assign({
              Authorization: "Basic ".concat(basic)
            }, this.headers), onCallHeaders);
            options === null || options === void 0 ? true : delete options.headers;
            params = __assign({}, options);

            if ((options === null || options === void 0 ? void 0 : options.query) && Object.getOwnPropertyNames(options === null || options === void 0 ? void 0 : options.query).length > 0) {
              params.params = new URLSearchParams(options.query);
              delete params.query;
            }

            if (options === null || options === void 0 ? void 0 : options.body) {
              body = options === null || options === void 0 ? void 0 : options.body;
              params.data = body;
              delete params.body;
            }

            urlValue = (0, url_join_1.default)(this.url, url);
            _d.label = 1;

          case 1:
            _d.trys.push([1, 3,, 4]);

            return [4
            /*yield*/
            , axios_1.default.request(__assign(__assign({
              method: method.toLocaleUpperCase(),
              timeout: this.timeout,
              url: urlValue,
              headers: headers
            }, params), {
              maxBodyLength: this.maxBodyLength
            }))];

          case 2:
            response = _d.sent();
            return [3
            /*break*/
            , 4];

          case 3:
            err_1 = _d.sent();
            errorResponse = err_1;
            throw new error_1.default({
              status: ((_a = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.response) === null || _a === void 0 ? void 0 : _a.status) || 400,
              statusText: ((_b = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.response) === null || _b === void 0 ? void 0 : _b.statusText) || errorResponse.code,
              body: ((_c = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.response) === null || _c === void 0 ? void 0 : _c.data) || errorResponse.message
            });

          case 4:
            return [4
            /*yield*/
            , this.getResponseBody(response)];

          case 5:
            res = _d.sent();
            return [2
            /*return*/
            , res];
        }
      });
    });
  };

  Request.prototype.getResponseBody = function (response) {
    return __awaiter(this, void 0, void 0, function () {
      var res;
      return __generator(this, function (_a) {
        res = {
          body: {},
          status: response === null || response === void 0 ? void 0 : response.status
        };

        if (typeof response.data === 'string') {
          if (response.data === 'Mailgun Magnificent API') {
            throw new error_1.default({
              status: 400,
              statusText: 'Incorrect url',
              body: response.data
            });
          }

          res.body = {
            message: response.data
          };
        } else {
          res.body = response.data;
        }

        return [2
        /*return*/
        , res];
      });
    });
  };

  Request.prototype.query = function (method, url, query, options) {
    return this.request(method, url, __assign({
      query: query
    }, options));
  };

  Request.prototype.command = function (method, url, data, options, addDefaultHeaders) {
    if (addDefaultHeaders === void 0) {
      addDefaultHeaders = true;
    }

    var headers = {};

    if (addDefaultHeaders) {
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
    }

    var requestOptions = __assign(__assign(__assign({}, headers), {
      body: data
    }), options);

    return this.request(method, url, requestOptions);
  };

  Request.prototype.get = function (url, query, options) {
    return this.query('get', url, query, options);
  };

  Request.prototype.post = function (url, data, options) {
    return this.command('post', url, data, options);
  };

  Request.prototype.postWithFD = function (url, data) {
    var formData = this.formDataBuilder.createFormData(data);
    return this.command('post', url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }, false);
  };

  Request.prototype.putWithFD = function (url, data) {
    var formData = this.formDataBuilder.createFormData(data);
    return this.command('put', url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }, false);
  };

  Request.prototype.patchWithFD = function (url, data) {
    var formData = this.formDataBuilder.createFormData(data);
    return this.command('patch', url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }, false);
  };

  Request.prototype.put = function (url, data, options) {
    return this.command('put', url, data, options);
  };

  Request.prototype.delete = function (url, data) {
    return this.command('delete', url, data);
  };

  return Request;
}();

exports["default"] = Request;

/***/ }),

/***/ "./lib/routes.ts":
/*!***********************!*\
  !*** ./lib/routes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var RoutesClient =
/** @class */
function () {
  function RoutesClient(request) {
    this.request = request;
  }

  RoutesClient.prototype.list = function (query) {
    return this.request.get('/v3/routes', query).then(function (response) {
      return response.body.items;
    });
  };

  RoutesClient.prototype.get = function (id) {
    return this.request.get("/v3/routes/".concat(id)).then(function (response) {
      return response.body.route;
    });
  };

  RoutesClient.prototype.create = function (data) {
    return this.request.postWithFD('/v3/routes', data).then(function (response) {
      return response.body.route;
    });
  };

  RoutesClient.prototype.update = function (id, data) {
    return this.request.putWithFD("/v3/routes/".concat(id), data).then(function (response) {
      return response.body;
    });
  };

  RoutesClient.prototype.destroy = function (id) {
    return this.request.delete("/v3/routes/".concat(id)).then(function (response) {
      return response.body;
    });
  };

  return RoutesClient;
}();

exports["default"] = RoutesClient;

/***/ }),

/***/ "./lib/stats.ts":
/*!**********************!*\
  !*** ./lib/stats.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var Stats =
/** @class */
function () {
  function Stats(data) {
    this.start = new Date(data.start);
    this.end = new Date(data.end);
    this.resolution = data.resolution;
    this.stats = data.stats.map(function (stat) {
      var res = __assign({}, stat);

      res.time = new Date(stat.time);
      return res;
    });
  }

  return Stats;
}();

var StatsClient =
/** @class */
function () {
  function StatsClient(request) {
    this.request = request;
  }

  StatsClient.prototype.prepareSearchParams = function (query) {
    var searchParams = [];

    if (typeof query === 'object' && Object.keys(query).length) {
      searchParams = Object.entries(query).reduce(function (arrayWithPairs, currentPair) {
        var key = currentPair[0],
            value = currentPair[1];

        if (Array.isArray(value) && value.length) {
          var repeatedProperty = value.map(function (item) {
            return [key, item];
          });
          return __spreadArray(__spreadArray([], arrayWithPairs, true), repeatedProperty, true);
        }

        arrayWithPairs.push([key, value]);
        return arrayWithPairs;
      }, []);
    }

    return searchParams;
  };

  StatsClient.prototype._parseStats = function (response) {
    return new Stats(response.body);
  };

  StatsClient.prototype.getDomain = function (domain, query) {
    var searchParams = this.prepareSearchParams(query);
    return this.request.get((0, url_join_1.default)('/v3', domain, 'stats/total'), searchParams).then(this._parseStats);
  };

  StatsClient.prototype.getAccount = function (query) {
    var searchParams = this.prepareSearchParams(query);
    return this.request.get('/v3/stats/total', searchParams).then(this._parseStats);
  };

  return StatsClient;
}();

exports["default"] = StatsClient;

/***/ }),

/***/ "./lib/suppressions.ts":
/*!*****************************!*\
  !*** ./lib/suppressions.ts ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.WhiteList = exports.Unsubscribe = exports.Complaint = exports.Bounce = exports.Suppression = void 0;
/* eslint-disable camelcase */

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var Supressions_1 = __webpack_require__(/*! ./interfaces/Supressions */ "./lib/interfaces/Supressions.ts");

var error_1 = __importDefault(__webpack_require__(/*! ./error */ "./lib/error.ts"));

var createOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

var Suppression =
/** @class */
function () {
  function Suppression(type) {
    this.type = type;
  }

  return Suppression;
}();

exports.Suppression = Suppression;

var Bounce =
/** @class */
function (_super) {
  __extends(Bounce, _super);

  function Bounce(data) {
    var _this = _super.call(this, Supressions_1.SuppressionModels.BOUNCES) || this;

    _this.address = data.address;
    _this.code = +data.code;
    _this.error = data.error;
    _this.created_at = new Date(data.created_at);
    return _this;
  }

  return Bounce;
}(Suppression);

exports.Bounce = Bounce;

var Complaint =
/** @class */
function (_super) {
  __extends(Complaint, _super);

  function Complaint(data) {
    var _this = _super.call(this, Supressions_1.SuppressionModels.COMPLAINTS) || this;

    _this.address = data.address;
    _this.created_at = new Date(data.created_at);
    return _this;
  }

  return Complaint;
}(Suppression);

exports.Complaint = Complaint;

var Unsubscribe =
/** @class */
function (_super) {
  __extends(Unsubscribe, _super);

  function Unsubscribe(data) {
    var _this = _super.call(this, Supressions_1.SuppressionModels.UNSUBSCRIBES) || this;

    _this.address = data.address;
    _this.tags = data.tags;
    _this.created_at = new Date(data.created_at);
    return _this;
  }

  return Unsubscribe;
}(Suppression);

exports.Unsubscribe = Unsubscribe;

var WhiteList =
/** @class */
function (_super) {
  __extends(WhiteList, _super);

  function WhiteList(data) {
    var _this = _super.call(this, Supressions_1.SuppressionModels.WHITELISTS) || this;

    _this.value = data.value;
    _this.reason = data.reason;
    _this.createdAt = new Date(data.createdAt);
    return _this;
  }

  return WhiteList;
}(Suppression);

exports.WhiteList = WhiteList;

var SuppressionClient =
/** @class */
function () {
  function SuppressionClient(request) {
    this.request = request;
    this.models = new Map();
    this.models.set('bounces', Bounce);
    this.models.set('complaints', Complaint);
    this.models.set('unsubscribes', Unsubscribe);
    this.models.set('whitelists', WhiteList);
  }

  SuppressionClient.prototype._parsePage = function (id, pageUrl) {
    var parsedUrl = new URL(pageUrl);
    var searchParams = parsedUrl.searchParams;
    return {
      id: id,
      page: searchParams.has('page') ? searchParams.get('page') : undefined,
      address: searchParams.has('address') ? searchParams.get('address') : undefined,
      url: pageUrl
    };
  };

  SuppressionClient.prototype._parsePageLinks = function (response) {
    var _this = this;

    var pages = Object.entries(response.body.paging);
    return pages.reduce(function (acc, pair) {
      var id = pair[0];
      var pageUrl = pair[1];
      acc[id] = _this._parsePage(id, pageUrl);
      return acc;
    }, {});
  };

  SuppressionClient.prototype._parseList = function (response, Model) {
    var data = {};
    data.items = response.body.items.map(function (item) {
      return new Model(item);
    });
    data.pages = this._parsePageLinks(response);
    return data;
  };

  SuppressionClient.prototype._parseItem = function (data, Model) {
    return new Model(data);
  };

  SuppressionClient.prototype.createWhiteList = function (domain, data) {
    if (Array.isArray(data)) {
      throw new error_1.default({
        status: 400,
        statusText: 'Data property should be an object',
        body: {
          message: 'Whitelist\'s creation process does not support multiple creations. Data property should be an object'
        }
      });
    }

    return this.request.postWithFD((0, url_join_1.default)('v3', domain, 'whitelists'), data).then(this.prepareResponse);
  };

  SuppressionClient.prototype.checkType = function (type) {
    if (!this.models.has(type)) {
      throw new error_1.default({
        status: 400,
        statusText: 'Unknown type value',
        body: {
          message: 'Type may be only one of [bounces, complaints, unsubscribes, whitelists]'
        }
      });
    }
  };

  SuppressionClient.prototype.prepareResponse = function (response) {
    return {
      message: response.body.message,
      type: response.body.type || '',
      value: response.body.value || '',
      status: response.status
    };
  };

  SuppressionClient.prototype.list = function (domain, type, query) {
    var _this = this;

    this.checkType(type);
    var model = this.models.get(type);
    return this.request.get((0, url_join_1.default)('v3', domain, type), query).then(function (response) {
      return _this._parseList(response, model);
    });
  };

  SuppressionClient.prototype.get = function (domain, type, address) {
    var _this = this;

    this.checkType(type);
    var model = this.models.get(type);
    return this.request.get((0, url_join_1.default)('v3', domain, type, encodeURIComponent(address))).then(function (response) {
      return _this._parseItem(response.body, model);
    });
  };

  SuppressionClient.prototype.create = function (domain, type, data) {
    this.checkType(type); // supports adding multiple suppressions by default

    var postData;

    if (type === 'whitelists') {
      return this.createWhiteList(domain, data);
    }

    if (!Array.isArray(data)) {
      postData = [data];
    } else {
      postData = __spreadArray([], data, true);
    }

    return this.request.post((0, url_join_1.default)('v3', domain, type), JSON.stringify(postData), createOptions).then(this.prepareResponse);
  };

  SuppressionClient.prototype.destroy = function (domain, type, address) {
    this.checkType(type);
    return this.request.delete((0, url_join_1.default)('v3', domain, type, encodeURIComponent(address))).then(function (response) {
      return {
        message: response.body.message,
        value: response.body.value || '',
        address: response.body.address || '',
        status: response.status
      };
    });
  };

  return SuppressionClient;
}();

exports["default"] = SuppressionClient;
module.exports = SuppressionClient;

/***/ }),

/***/ "./lib/validate.ts":
/*!*************************!*\
  !*** ./lib/validate.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var ValidateClient =
/** @class */
function () {
  function ValidateClient(request, multipleValidationClient) {
    this.request = request;
    this.multipleValidation = multipleValidationClient;
  }

  ValidateClient.prototype.get = function (address) {
    return __awaiter(this, void 0, void 0, function () {
      var query, result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            query = {
              address: address
            };
            return [4
            /*yield*/
            , this.request.get('/v4/address/validate', query)];

          case 1:
            result = _a.sent();
            return [2
            /*return*/
            , result.body];
        }
      });
    });
  };

  return ValidateClient;
}();

exports["default"] = ValidateClient;

/***/ }),

/***/ "./lib/webhooks.ts":
/*!*************************!*\
  !*** ./lib/webhooks.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var Webhook =
/** @class */
function () {
  function Webhook(id, url) {
    this.id = id;
    this.url = url;
  }

  return Webhook;
}();

var WebhookClient =
/** @class */
function () {
  function WebhookClient(request) {
    this.request = request;
  }

  WebhookClient.prototype._parseWebhookList = function (response) {
    return response.body.webhooks;
  };

  WebhookClient.prototype._parseWebhookWithID = function (id) {
    return function (response) {
      var _a;

      var webhookResponse = (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.webhook;
      var url = webhookResponse === null || webhookResponse === void 0 ? void 0 : webhookResponse.url;

      if (!url) {
        url = (webhookResponse === null || webhookResponse === void 0 ? void 0 : webhookResponse.urls) && webhookResponse.urls.length ? webhookResponse.urls[0] : undefined;
      }

      return new Webhook(id, url);
    };
  };

  WebhookClient.prototype._parseWebhookTest = function (response) {
    return {
      code: response.body.code,
      message: response.body.message
    };
  };

  WebhookClient.prototype.list = function (domain, query) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'webhooks'), query).then(this._parseWebhookList);
  };

  WebhookClient.prototype.get = function (domain, id) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id)).then(this._parseWebhookWithID(id));
  };

  WebhookClient.prototype.create = function (domain, id, url, test) {
    if (test === void 0) {
      test = false;
    }

    if (test) {
      return this.request.putWithFD((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id, 'test'), {
        url: url
      }).then(this._parseWebhookTest);
    }

    return this.request.postWithFD((0, url_join_1.default)('/v3/domains', domain, 'webhooks'), {
      id: id,
      url: url
    }).then(this._parseWebhookWithID(id));
  };

  WebhookClient.prototype.update = function (domain, id, url) {
    return this.request.putWithFD((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id), {
      url: url
    }).then(this._parseWebhookWithID(id));
  };

  WebhookClient.prototype.destroy = function (domain, id) {
    return this.request.delete((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id)).then(this._parseWebhookWithID(id));
  };

  return WebhookClient;
}();

exports["default"] = WebhookClient;

/***/ }),

/***/ "./node_modules/base-64/base64.js":
/*!****************************************!*\
  !*** ./node_modules/base-64/base64.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/base64 v1.0.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports =  true && exports;

	// Detect free variable `module`.
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
			error(
				'The string to be encoded contains characters outside of the ' +
				'Latin1 range.'
			);
		}
		var padding = input.length % 3;
		var output = '';
		var position = -1;
		var a;
		var b;
		var c;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
		}

		if (padding == 2) {
			a = input.charCodeAt(position) << 8;
			b = input.charCodeAt(++position);
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
		} else if (padding == 1) {
			buffer = input.charCodeAt(position);
			output += (
				TABLE.charAt(buffer >> 2) +
				TABLE.charAt((buffer << 4) & 0x3F) +
				'=='
			);
		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'decode': decode,
		'version': '1.0.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return base64;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else { var key; }

}(this));


/***/ }),

/***/ "./node_modules/combined-stream/lib/combined_stream.js":
/*!*************************************************************!*\
  !*** ./node_modules/combined-stream/lib/combined_stream.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var util = __webpack_require__(/*! util */ "util");
var Stream = (__webpack_require__(/*! stream */ "stream").Stream);
var DelayedStream = __webpack_require__(/*! delayed-stream */ "./node_modules/delayed-stream/lib/delayed_stream.js");

module.exports = CombinedStream;
function CombinedStream() {
  this.writable = false;
  this.readable = true;
  this.dataSize = 0;
  this.maxDataSize = 2 * 1024 * 1024;
  this.pauseStreams = true;

  this._released = false;
  this._streams = [];
  this._currentStream = null;
  this._insideLoop = false;
  this._pendingNext = false;
}
util.inherits(CombinedStream, Stream);

CombinedStream.create = function(options) {
  var combinedStream = new this();

  options = options || {};
  for (var option in options) {
    combinedStream[option] = options[option];
  }

  return combinedStream;
};

CombinedStream.isStreamLike = function(stream) {
  return (typeof stream !== 'function')
    && (typeof stream !== 'string')
    && (typeof stream !== 'boolean')
    && (typeof stream !== 'number')
    && (!Buffer.isBuffer(stream));
};

CombinedStream.prototype.append = function(stream) {
  var isStreamLike = CombinedStream.isStreamLike(stream);

  if (isStreamLike) {
    if (!(stream instanceof DelayedStream)) {
      var newStream = DelayedStream.create(stream, {
        maxDataSize: Infinity,
        pauseStream: this.pauseStreams,
      });
      stream.on('data', this._checkDataSize.bind(this));
      stream = newStream;
    }

    this._handleErrors(stream);

    if (this.pauseStreams) {
      stream.pause();
    }
  }

  this._streams.push(stream);
  return this;
};

CombinedStream.prototype.pipe = function(dest, options) {
  Stream.prototype.pipe.call(this, dest, options);
  this.resume();
  return dest;
};

CombinedStream.prototype._getNext = function() {
  this._currentStream = null;

  if (this._insideLoop) {
    this._pendingNext = true;
    return; // defer call
  }

  this._insideLoop = true;
  try {
    do {
      this._pendingNext = false;
      this._realGetNext();
    } while (this._pendingNext);
  } finally {
    this._insideLoop = false;
  }
};

CombinedStream.prototype._realGetNext = function() {
  var stream = this._streams.shift();


  if (typeof stream == 'undefined') {
    this.end();
    return;
  }

  if (typeof stream !== 'function') {
    this._pipeNext(stream);
    return;
  }

  var getStream = stream;
  getStream(function(stream) {
    var isStreamLike = CombinedStream.isStreamLike(stream);
    if (isStreamLike) {
      stream.on('data', this._checkDataSize.bind(this));
      this._handleErrors(stream);
    }

    this._pipeNext(stream);
  }.bind(this));
};

CombinedStream.prototype._pipeNext = function(stream) {
  this._currentStream = stream;

  var isStreamLike = CombinedStream.isStreamLike(stream);
  if (isStreamLike) {
    stream.on('end', this._getNext.bind(this));
    stream.pipe(this, {end: false});
    return;
  }

  var value = stream;
  this.write(value);
  this._getNext();
};

CombinedStream.prototype._handleErrors = function(stream) {
  var self = this;
  stream.on('error', function(err) {
    self._emitError(err);
  });
};

CombinedStream.prototype.write = function(data) {
  this.emit('data', data);
};

CombinedStream.prototype.pause = function() {
  if (!this.pauseStreams) {
    return;
  }

  if(this.pauseStreams && this._currentStream && typeof(this._currentStream.pause) == 'function') this._currentStream.pause();
  this.emit('pause');
};

CombinedStream.prototype.resume = function() {
  if (!this._released) {
    this._released = true;
    this.writable = true;
    this._getNext();
  }

  if(this.pauseStreams && this._currentStream && typeof(this._currentStream.resume) == 'function') this._currentStream.resume();
  this.emit('resume');
};

CombinedStream.prototype.end = function() {
  this._reset();
  this.emit('end');
};

CombinedStream.prototype.destroy = function() {
  this._reset();
  this.emit('close');
};

CombinedStream.prototype._reset = function() {
  this.writable = false;
  this._streams = [];
  this._currentStream = null;
};

CombinedStream.prototype._checkDataSize = function() {
  this._updateDataSize();
  if (this.dataSize <= this.maxDataSize) {
    return;
  }

  var message =
    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
  this._emitError(new Error(message));
};

CombinedStream.prototype._updateDataSize = function() {
  this.dataSize = 0;

  var self = this;
  this._streams.forEach(function(stream) {
    if (!stream.dataSize) {
      return;
    }

    self.dataSize += stream.dataSize;
  });

  if (this._currentStream && this._currentStream.dataSize) {
    this.dataSize += this._currentStream.dataSize;
  }
};

CombinedStream.prototype._emitError = function(err) {
  this._reset();
  this.emit('error', err);
};


/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "./node_modules/debug/src/index.js":
/*!*****************************************!*\
  !*** ./node_modules/debug/src/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __webpack_require__(/*! ./browser.js */ "./node_modules/debug/src/browser.js");
} else {
	module.exports = __webpack_require__(/*! ./node.js */ "./node_modules/debug/src/node.js");
}


/***/ }),

/***/ "./node_modules/debug/src/node.js":
/*!****************************************!*\
  !*** ./node_modules/debug/src/node.js ***!
  \****************************************/
/***/ ((module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

const tty = __webpack_require__(/*! tty */ "tty");
const util = __webpack_require__(/*! util */ "util");

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __webpack_require__(/*! supports-color */ "./node_modules/supports-color/index.js");

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ "./node_modules/delayed-stream/lib/delayed_stream.js":
/*!***********************************************************!*\
  !*** ./node_modules/delayed-stream/lib/delayed_stream.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Stream = (__webpack_require__(/*! stream */ "stream").Stream);
var util = __webpack_require__(/*! util */ "util");

module.exports = DelayedStream;
function DelayedStream() {
  this.source = null;
  this.dataSize = 0;
  this.maxDataSize = 1024 * 1024;
  this.pauseStream = true;

  this._maxDataSizeExceeded = false;
  this._released = false;
  this._bufferedEvents = [];
}
util.inherits(DelayedStream, Stream);

DelayedStream.create = function(source, options) {
  var delayedStream = new this();

  options = options || {};
  for (var option in options) {
    delayedStream[option] = options[option];
  }

  delayedStream.source = source;

  var realEmit = source.emit;
  source.emit = function() {
    delayedStream._handleEmit(arguments);
    return realEmit.apply(source, arguments);
  };

  source.on('error', function() {});
  if (delayedStream.pauseStream) {
    source.pause();
  }

  return delayedStream;
};

Object.defineProperty(DelayedStream.prototype, 'readable', {
  configurable: true,
  enumerable: true,
  get: function() {
    return this.source.readable;
  }
});

DelayedStream.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};

DelayedStream.prototype.resume = function() {
  if (!this._released) {
    this.release();
  }

  this.source.resume();
};

DelayedStream.prototype.pause = function() {
  this.source.pause();
};

DelayedStream.prototype.release = function() {
  this._released = true;

  this._bufferedEvents.forEach(function(args) {
    this.emit.apply(this, args);
  }.bind(this));
  this._bufferedEvents = [];
};

DelayedStream.prototype.pipe = function() {
  var r = Stream.prototype.pipe.apply(this, arguments);
  this.resume();
  return r;
};

DelayedStream.prototype._handleEmit = function(args) {
  if (this._released) {
    this.emit.apply(this, args);
    return;
  }

  if (args[0] === 'data') {
    this.dataSize += args[1].length;
    this._checkIfMaxDataSizeExceeded();
  }

  this._bufferedEvents.push(args);
};

DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
  if (this._maxDataSizeExceeded) {
    return;
  }

  if (this.dataSize <= this.maxDataSize) {
    return;
  }

  this._maxDataSizeExceeded = true;
  var message =
    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.'
  this.emit('error', new Error(message));
};


/***/ }),

/***/ "./node_modules/follow-redirects/debug.js":
/*!************************************************!*\
  !*** ./node_modules/follow-redirects/debug.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var debug;

module.exports = function () {
  if (!debug) {
    try {
      /* eslint global-require: off */
      debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/index.js")("follow-redirects");
    }
    catch (error) { /* */ }
    if (typeof debug !== "function") {
      debug = function () { /* */ };
    }
  }
  debug.apply(null, arguments);
};


/***/ }),

/***/ "./node_modules/follow-redirects/index.js":
/*!************************************************!*\
  !*** ./node_modules/follow-redirects/index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var url = __webpack_require__(/*! url */ "url");
var URL = url.URL;
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var Writable = (__webpack_require__(/*! stream */ "stream").Writable);
var assert = __webpack_require__(/*! assert */ "assert");
var debug = __webpack_require__(/*! ./debug */ "./node_modules/follow-redirects/debug.js");

// Create handlers that pass events from native requests
var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
var eventHandlers = Object.create(null);
events.forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded"
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

RedirectableRequest.prototype.abort = function () {
  abortRequest(this._currentRequest);
  this.emit("abort");
};

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  var self = this;

  // Destroys the socket on timeout
  function destroyOnTimeout(socket) {
    socket.setTimeout(msecs);
    socket.removeListener("timeout", socket.destroy);
    socket.addListener("timeout", socket.destroy);
  }

  // Sets up a timer to trigger a timeout event
  function startTimer(socket) {
    if (self._timeout) {
      clearTimeout(self._timeout);
    }
    self._timeout = setTimeout(function () {
      self.emit("timeout");
      clearTimer();
    }, msecs);
    destroyOnTimeout(socket);
  }

  // Stops a timeout from triggering
  function clearTimer() {
    // Clear the timeout
    if (self._timeout) {
      clearTimeout(self._timeout);
      self._timeout = null;
    }

    // Clean up all attached listeners
    self.removeListener("abort", clearTimer);
    self.removeListener("error", clearTimer);
    self.removeListener("response", clearTimer);
    if (callback) {
      self.removeListener("timeout", callback);
    }
    if (!self.socket) {
      self._currentRequest.removeListener("socket", startTimer);
    }
  }

  // Attach callback if passed
  if (callback) {
    this.on("timeout", callback);
  }

  // Start the timer if or when the socket is opened
  if (this.socket) {
    startTimer(this.socket);
  }
  else {
    this._currentRequest.once("socket", startTimer);
  }

  // Clean up on events
  this.on("socket", destroyOnTimeout);
  this.on("abort", clearTimer);
  this.on("error", clearTimer);
  this.on("response", clearTimer);

  return this;
};

// Proxy all other public ClientRequest methods
[
  "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.slice(0, -1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var e = 0; e < events.length; e++) {
    request.on(events[e], eventHandlers[events[e]]);
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.

  // If the response is not a redirect; return it as-is
  var location = response.headers.location;
  if (!location || this._options.followRedirects === false ||
      statusCode < 300 || statusCode >= 400) {
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
    return;
  }

  // The response is a redirect, so abort the current request
  abortRequest(this._currentRequest);
  // Discard the remainder of the response to avoid waiting for data
  response.destroy();

  // RFC7231§6.4: A client SHOULD detect and intervene
  // in cyclical redirections (i.e., "infinite" redirection loops).
  if (++this._redirectCount > this._options.maxRedirects) {
    this.emit("error", new TooManyRedirectsError());
    return;
  }

  // Store the request headers if applicable
  var requestHeaders;
  var beforeRedirect = this._options.beforeRedirect;
  if (beforeRedirect) {
    requestHeaders = Object.assign({
      // The Host header was set by nativeProtocol.request
      Host: response.req.getHeader("host"),
    }, this._options.headers);
  }

  // RFC7231§6.4: Automatic redirection needs to done with
  // care for methods not known to be safe, […]
  // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
  // the request method from POST to GET for the subsequent request.
  var method = this._options.method;
  if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
      // RFC7231§6.4.4: The 303 (See Other) status code indicates that
      // the server is redirecting the user agent to a different resource […]
      // A user agent can perform a retrieval request targeting that URI
      // (a GET or HEAD request if using HTTP) […]
      (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
    this._options.method = "GET";
    // Drop a possible entity and headers related to it
    this._requestBodyBuffers = [];
    removeMatchingHeaders(/^content-/i, this._options.headers);
  }

  // Drop the Host header, as the redirect might lead to a different host
  var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

  // If the redirect is relative, carry over the host of the last request
  var currentUrlParts = url.parse(this._currentUrl);
  var currentHost = currentHostHeader || currentUrlParts.host;
  var currentUrl = /^\w+:/.test(location) ? this._currentUrl :
    url.format(Object.assign(currentUrlParts, { host: currentHost }));

  // Determine the URL of the redirection
  var redirectUrl;
  try {
    redirectUrl = url.resolve(currentUrl, location);
  }
  catch (cause) {
    this.emit("error", new RedirectionError(cause));
    return;
  }

  // Create the redirected request
  debug("redirecting to", redirectUrl);
  this._isRedirect = true;
  var redirectUrlParts = url.parse(redirectUrl);
  Object.assign(this._options, redirectUrlParts);

  // Drop confidential headers when redirecting to a less secure protocol
  // or to a different domain that is not a superdomain
  if (redirectUrlParts.protocol !== currentUrlParts.protocol &&
     redirectUrlParts.protocol !== "https:" ||
     redirectUrlParts.host !== currentHost &&
     !isSubdomain(redirectUrlParts.host, currentHost)) {
    removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
  }

  // Evaluate the beforeRedirect callback
  if (typeof beforeRedirect === "function") {
    var responseDetails = {
      headers: response.headers,
      statusCode: statusCode,
    };
    var requestDetails = {
      url: currentUrl,
      method: method,
      headers: requestHeaders,
    };
    try {
      beforeRedirect(this._options, responseDetails, requestDetails);
    }
    catch (err) {
      this.emit("error", err);
      return;
    }
    this._sanitizeOptions(this._options);
  }

  // Perform the redirected request
  try {
    this._performRequest();
  }
  catch (cause) {
    this.emit("error", new RedirectionError(cause));
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        }
        catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr);
        }
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    }

    // Executes a GET request, following redirects
    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    }

    // Expose the properties on the wrapped protocol
    Object.defineProperties(wrappedProtocol, {
      request: { value: request, configurable: true, enumerable: true, writable: true },
      get: { value: get, configurable: true, enumerable: true, writable: true },
    });
  });
  return exports;
}

/* istanbul ignore next */
function noop() { /* empty */ }

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
      /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) :
      urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return (lastValue === null || typeof lastValue === "undefined") ?
    undefined : String(lastValue).trim();
}

function createErrorType(code, defaultMessage) {
  function CustomError(cause) {
    Error.captureStackTrace(this, this.constructor);
    if (!cause) {
      this.message = defaultMessage;
    }
    else {
      this.message = defaultMessage + ": " + cause.message;
      this.cause = cause;
    }
  }
  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

function abortRequest(request) {
  for (var e = 0; e < events.length; e++) {
    request.removeListener(events[e], eventHandlers[events[e]]);
  }
  request.on("error", noop);
  request.abort();
}

function isSubdomain(subdomain, domain) {
  const dot = subdomain.length - domain.length - 1;
  return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),

/***/ "./node_modules/has-flag/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-flag/index.js ***!
  \****************************************/
/***/ ((module) => {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),

/***/ "./node_modules/mime-db/index.js":
/*!***************************************!*\
  !*** ./node_modules/mime-db/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 */

module.exports = __webpack_require__(/*! ./db.json */ "./node_modules/mime-db/db.json")


/***/ }),

/***/ "./node_modules/mime-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/mime-types/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var db = __webpack_require__(/*! mime-db */ "./node_modules/mime-db/index.js")
var extname = (__webpack_require__(/*! path */ "path").extname)

/**
 * Module variables.
 * @private
 */

var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/
var TEXT_TYPE_REGEXP = /^text\//i

/**
 * Module exports.
 * @public
 */

exports.charset = charset
exports.charsets = { lookup: charset }
exports.contentType = contentType
exports.extension = extension
exports.extensions = Object.create(null)
exports.lookup = lookup
exports.types = Object.create(null)

// Populate the extensions/types maps
populateMaps(exports.extensions, exports.types)

/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function charset (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)
  var mime = match && db[match[1].toLowerCase()]

  if (mime && mime.charset) {
    return mime.charset
  }

  // default text/* to utf-8
  if (match && TEXT_TYPE_REGEXP.test(match[1])) {
    return 'UTF-8'
  }

  return false
}

/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */

function contentType (str) {
  // TODO: should this even be in this module?
  if (!str || typeof str !== 'string') {
    return false
  }

  var mime = str.indexOf('/') === -1
    ? exports.lookup(str)
    : str

  if (!mime) {
    return false
  }

  // TODO: use content-type or other module
  if (mime.indexOf('charset') === -1) {
    var charset = exports.charset(mime)
    if (charset) mime += '; charset=' + charset.toLowerCase()
  }

  return mime
}

/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function extension (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)

  // get extensions
  var exts = match && exports.extensions[match[1].toLowerCase()]

  if (!exts || !exts.length) {
    return false
  }

  return exts[0]
}

/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {boolean|string}
 */

function lookup (path) {
  if (!path || typeof path !== 'string') {
    return false
  }

  // get the extension ("ext" or ".ext" or full path)
  var extension = extname('x.' + path)
    .toLowerCase()
    .substr(1)

  if (!extension) {
    return false
  }

  return exports.types[extension] || false
}

/**
 * Populate the extensions and types maps.
 * @private
 */

function populateMaps (extensions, types) {
  // source preference (least -> most)
  var preference = ['nginx', 'apache', undefined, 'iana']

  Object.keys(db).forEach(function forEachMimeType (type) {
    var mime = db[type]
    var exts = mime.extensions

    if (!exts || !exts.length) {
      return
    }

    // mime -> extensions
    extensions[type] = exts

    // extension -> mime
    for (var i = 0; i < exts.length; i++) {
      var extension = exts[i]

      if (types[extension]) {
        var from = preference.indexOf(db[types[extension]].source)
        var to = preference.indexOf(mime.source)

        if (types[extension] !== 'application/octet-stream' &&
          (from > to || (from === to && types[extension].substr(0, 12) === 'application/'))) {
          // skip the remapping
          continue
        }
      }

      // set the extension -> mime
      types[extension] = type
    }
  })
}


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/supports-color/index.js":
/*!**********************************************!*\
  !*** ./node_modules/supports-color/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const os = __webpack_require__(/*! os */ "os");
const hasFlag = __webpack_require__(/*! has-flag */ "./node_modules/has-flag/index.js");

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),

/***/ "./node_modules/url-join/lib/url-join.js":
/*!***********************************************!*\
  !*** ./node_modules/url-join/lib/url-join.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (name, context, definition) {
  if ( true && module.exports) module.exports = definition();
  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  else {}
})('urljoin', this, function () {

  function normalize (strArray) {
    var resultArray = [];
    if (strArray.length === 0) { return ''; }

    if (typeof strArray[0] !== 'string') {
      throw new TypeError('Url must be a string. Received ' + strArray[0]);
    }

    // If the first part is a plain protocol, we combine it with the next part.
    if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
      var first = strArray.shift();
      strArray[0] = first + strArray[0];
    }

    // There must be two or three slashes in the file protocol, two slashes in anything else.
    if (strArray[0].match(/^file:\/\/\//)) {
      strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
    } else {
      strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
    }

    for (var i = 0; i < strArray.length; i++) {
      var component = strArray[i];

      if (typeof component !== 'string') {
        throw new TypeError('Url must be a string. Received ' + component);
      }

      if (component === '') { continue; }

      if (i > 0) {
        // Removing the starting slashes for each component but the first.
        component = component.replace(/^[\/]+/, '');
      }
      if (i < strArray.length - 1) {
        // Removing the ending slashes for each component but the last.
        component = component.replace(/[\/]+$/, '');
      } else {
        // For the last component we will combine multiple slashes to a single one.
        component = component.replace(/[\/]+$/, '/');
      }

      resultArray.push(component);

    }

    var str = resultArray.join('/');
    // Each input component is now separated by a single slash except the possible first plain protocol part.

    // remove trailing slash before parameters or hash
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');

    // replace ? in parameters with &
    var parts = str.split('?');
    str = parts.shift() + (parts.length > 0 ? '?': '') + parts.join('&');

    return str;
  }

  return function () {
    var input;

    if (typeof arguments[0] === 'object') {
      input = arguments[0];
    } else {
      input = [].slice.call(arguments);
    }

    return normalize(input);
  };

});


/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ "./node_modules/mime-db/db.json":
/*!**************************************!*\
  !*** ./node_modules/mime-db/db.json ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/3gpp-ims+xml":{"source":"iana","compressible":true},"application/3gpphal+json":{"source":"iana","compressible":true},"application/3gpphalforms+json":{"source":"iana","compressible":true},"application/a2l":{"source":"iana"},"application/ace+cbor":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/activity+json":{"source":"iana","compressible":true},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/alto-updatestreamcontrol+json":{"source":"iana","compressible":true},"application/alto-updatestreamparams+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/at+jwt":{"source":"iana"},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","compressible":true,"extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana","compressible":true,"extensions":["atomdeleted"]},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","compressible":true,"extensions":["atomsvc"]},"application/atsc-dwd+xml":{"source":"iana","compressible":true,"extensions":["dwd"]},"application/atsc-dynamic-event-message":{"source":"iana"},"application/atsc-held+xml":{"source":"iana","compressible":true,"extensions":["held"]},"application/atsc-rdt+json":{"source":"iana","compressible":true},"application/atsc-rsat+xml":{"source":"iana","compressible":true,"extensions":["rsat"]},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana","compressible":true},"application/bacnet-xdd+zip":{"source":"iana","compressible":false},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana","compressible":true,"extensions":["xcs"]},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/captive+json":{"source":"iana","compressible":true},"application/cbor":{"source":"iana"},"application/cbor-seq":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana","compressible":true},"application/ccxml+xml":{"source":"iana","compressible":true,"extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana","compressible":true,"extensions":["cdfx"]},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana","compressible":true},"application/cellml+xml":{"source":"iana","compressible":true},"application/cfw":{"source":"iana"},"application/city+json":{"source":"iana","compressible":true},"application/clr":{"source":"iana"},"application/clue+xml":{"source":"iana","compressible":true},"application/clue_info+xml":{"source":"iana","compressible":true},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana","compressible":true},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana","compressible":true},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana","compressible":true,"extensions":["cpl"]},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana","compressible":true},"application/cstadata+xml":{"source":"iana","compressible":true},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cwt":{"source":"iana"},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","compressible":true,"extensions":["mpd"]},"application/dash-patch+xml":{"source":"iana","compressible":true,"extensions":["mpp"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","compressible":true,"extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana","compressible":true},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana","compressible":true},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/dns+json":{"source":"iana","compressible":true},"application/dns-message":{"source":"iana"},"application/docbook+xml":{"source":"apache","compressible":true,"extensions":["dbk"]},"application/dots+cbor":{"source":"iana"},"application/dskpp+xml":{"source":"iana","compressible":true},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","compressible":true,"extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["es","ecma"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/elm+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/elm+xml":{"source":"iana","compressible":true},"application/emergencycalldata.cap+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/emergencycalldata.comment+xml":{"source":"iana","compressible":true},"application/emergencycalldata.control+xml":{"source":"iana","compressible":true},"application/emergencycalldata.deviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.serviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.veds+xml":{"source":"iana","compressible":true},"application/emma+xml":{"source":"iana","compressible":true,"extensions":["emma"]},"application/emotionml+xml":{"source":"iana","compressible":true,"extensions":["emotionml"]},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana","compressible":true},"application/epub+zip":{"source":"iana","compressible":false,"extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/expect-ct-report+json":{"source":"iana","compressible":true},"application/express":{"source":"iana","extensions":["exp"]},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana","compressible":true,"extensions":["fdt"]},"application/fhir+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/fhir+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/flexfec":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false},"application/framework-attributes+xml":{"source":"iana","compressible":true},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geopackage+sqlite3":{"source":"iana"},"application/geoxacml+xml":{"source":"iana","compressible":true},"application/gltf-buffer":{"source":"iana"},"application/gml+xml":{"source":"iana","compressible":true,"extensions":["gml"]},"application/gpx+xml":{"source":"apache","compressible":true,"extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana","compressible":true},"application/hjson":{"extensions":["hjson"]},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana","compressible":true},"application/ibe-pkg-reply+xml":{"source":"iana","compressible":true},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","compressible":true,"extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana","compressible":true,"extensions":["its"]},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/jscalendar+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana","compressible":true},"application/kpml-response+xml":{"source":"iana","compressible":true},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana","compressible":true,"extensions":["lgr"]},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana","compressible":true},"application/lost+xml":{"source":"iana","compressible":true,"extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana","compressible":true},"application/lpf+zip":{"source":"iana","compressible":false},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","compressible":true,"extensions":["mads"]},"application/manifest+json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","compressible":true,"extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","compressible":true,"extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana","compressible":true},"application/mathml-presentation+xml":{"source":"iana","compressible":true},"application/mbms-associated-procedure-description+xml":{"source":"iana","compressible":true},"application/mbms-deregister+xml":{"source":"iana","compressible":true},"application/mbms-envelope+xml":{"source":"iana","compressible":true},"application/mbms-msk+xml":{"source":"iana","compressible":true},"application/mbms-msk-response+xml":{"source":"iana","compressible":true},"application/mbms-protection-description+xml":{"source":"iana","compressible":true},"application/mbms-reception-report+xml":{"source":"iana","compressible":true},"application/mbms-register+xml":{"source":"iana","compressible":true},"application/mbms-register-response+xml":{"source":"iana","compressible":true},"application/mbms-schedule+xml":{"source":"iana","compressible":true},"application/mbms-user-service-description+xml":{"source":"iana","compressible":true},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana","compressible":true,"extensions":["mpf"]},"application/media_control+xml":{"source":"iana","compressible":true},"application/mediaservercontrol+xml":{"source":"iana","compressible":true,"extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","compressible":true,"extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","compressible":true,"extensions":["meta4"]},"application/mets+xml":{"source":"iana","compressible":true,"extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mipc":{"source":"iana"},"application/missing-blocks+cbor-seq":{"source":"iana"},"application/mmt-aei+xml":{"source":"iana","compressible":true,"extensions":["maei"]},"application/mmt-usd+xml":{"source":"iana","compressible":true,"extensions":["musd"]},"application/mods+xml":{"source":"iana","compressible":true,"extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana","compressible":true},"application/mrb-publish+xml":{"source":"iana","compressible":true},"application/msc-ivr+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msc-mixer+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/multipart-core":{"source":"iana"},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana","extensions":["nq"]},"application/n-triples":{"source":"iana","extensions":["nt"]},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana","charset":"US-ASCII"},"application/news-groupinfo":{"source":"iana","charset":"US-ASCII"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana","compressible":true},"application/node":{"source":"iana","extensions":["cjs"]},"application/nss":{"source":"iana"},"application/oauth-authz-req+jwt":{"source":"iana"},"application/oblivious-dns-message":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odm+xml":{"source":"iana","compressible":true},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","compressible":true,"extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","compressible":true,"extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/opc-nodeset+xml":{"source":"iana","compressible":true},"application/oscore":{"source":"iana"},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p21":{"source":"iana"},"application/p21+zip":{"source":"iana","compressible":false},"application/p2p-overlay+xml":{"source":"iana","compressible":true,"extensions":["relo"]},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","compressible":true,"extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pem-certificate-chain":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana","extensions":["asc"]},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pidf-diff+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkcs8-encrypted":{"source":"iana"},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","compressible":true,"extensions":["pls"]},"application/poc-settings+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana","compressible":true},"application/provenance+xml":{"source":"iana","compressible":true,"extensions":["provx"]},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.cyn":{"source":"iana","charset":"7-BIT"},"application/prs.hpub+zip":{"source":"iana","compressible":false},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana","compressible":true},"application/pskc+xml":{"source":"iana","compressible":true,"extensions":["pskcxml"]},"application/pvd+json":{"source":"iana","compressible":true},"application/qsig":{"source":"iana"},"application/raml+yaml":{"compressible":true,"extensions":["raml"]},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf","owl"]},"application/reginfo+xml":{"source":"iana","compressible":true,"extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","compressible":true,"extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","compressible":true,"extensions":["rld"]},"application/rfc+xml":{"source":"iana","compressible":true},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana","compressible":true},"application/rls-services+xml":{"source":"iana","compressible":true,"extensions":["rs"]},"application/route-apd+xml":{"source":"iana","compressible":true,"extensions":["rapd"]},"application/route-s-tsid+xml":{"source":"iana","compressible":true,"extensions":["sls"]},"application/route-usd+xml":{"source":"iana","compressible":true,"extensions":["rusd"]},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","compressible":true,"extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana","compressible":true},"application/samlmetadata+xml":{"source":"iana","compressible":true},"application/sarif+json":{"source":"iana","compressible":true},"application/sarif-external-properties+json":{"source":"iana","compressible":true},"application/sbe":{"source":"iana"},"application/sbml+xml":{"source":"iana","compressible":true,"extensions":["sbml"]},"application/scaip+xml":{"source":"iana","compressible":true},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/secevent+jwt":{"source":"iana"},"application/senml+cbor":{"source":"iana"},"application/senml+json":{"source":"iana","compressible":true},"application/senml+xml":{"source":"iana","compressible":true,"extensions":["senmlx"]},"application/senml-etch+cbor":{"source":"iana"},"application/senml-etch+json":{"source":"iana","compressible":true},"application/senml-exi":{"source":"iana"},"application/sensml+cbor":{"source":"iana"},"application/sensml+json":{"source":"iana","compressible":true},"application/sensml+xml":{"source":"iana","compressible":true,"extensions":["sensmlx"]},"application/sensml-exi":{"source":"iana"},"application/sep+xml":{"source":"iana","compressible":true},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","compressible":true,"extensions":["shf"]},"application/sieve":{"source":"iana","extensions":["siv","sieve"]},"application/simple-filter+xml":{"source":"iana","compressible":true},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/sipc":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","compressible":true,"extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","compressible":true,"extensions":["srx"]},"application/spdx+json":{"source":"iana","compressible":true},"application/spirits-event+xml":{"source":"iana","compressible":true},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","compressible":true,"extensions":["grxml"]},"application/sru+xml":{"source":"iana","compressible":true,"extensions":["sru"]},"application/ssdl+xml":{"source":"apache","compressible":true,"extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","compressible":true,"extensions":["ssml"]},"application/stix+json":{"source":"iana","compressible":true},"application/swid+xml":{"source":"iana","compressible":true,"extensions":["swidtag"]},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/taxii+json":{"source":"iana","compressible":true},"application/td+json":{"source":"iana","compressible":true},"application/tei+xml":{"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},"application/tetra_isi":{"source":"iana"},"application/thraud+xml":{"source":"iana","compressible":true,"extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/tlsrpt+gzip":{"source":"iana"},"application/tlsrpt+json":{"source":"iana","compressible":true},"application/tnauthlist":{"source":"iana"},"application/token-introspection+jwt":{"source":"iana"},"application/toml":{"compressible":true,"extensions":["toml"]},"application/trickle-ice-sdpfrag":{"source":"iana"},"application/trig":{"source":"iana","extensions":["trig"]},"application/ttml+xml":{"source":"iana","compressible":true,"extensions":["ttml"]},"application/tve-trigger":{"source":"iana"},"application/tzif":{"source":"iana"},"application/tzif-leap":{"source":"iana"},"application/ubjson":{"compressible":false,"extensions":["ubj"]},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana","compressible":true},"application/urc-ressheet+xml":{"source":"iana","compressible":true,"extensions":["rsheet"]},"application/urc-targetdesc+xml":{"source":"iana","compressible":true,"extensions":["td"]},"application/urc-uisocketdesc+xml":{"source":"iana","compressible":true},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana","compressible":true},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana","compressible":true,"extensions":["1km"]},"application/vnd.3gpp-prose+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-v2x-local-service-information":{"source":"iana"},"application/vnd.3gpp.5gnas":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.bsf+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gmop+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gtpc":{"source":"iana"},"application/vnd.3gpp.interworking-data":{"source":"iana"},"application/vnd.3gpp.lpp":{"source":"iana"},"application/vnd.3gpp.mc-signalling-ear":{"source":"iana"},"application/vnd.3gpp.mcdata-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-payload":{"source":"iana"},"application/vnd.3gpp.mcdata-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-signalling":{"source":"iana"},"application/vnd.3gpp.mcdata-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-floor-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-signed+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-init-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-transmission-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mid-call+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ngap":{"source":"iana"},"application/vnd.3gpp.pfcp":{"source":"iana"},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.s1ap":{"source":"iana"},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ussd+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","compressible":false,"extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","compressible":true,"extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.afpc.afplinedata":{"source":"iana"},"application/vnd.afpc.afplinedata-pagedef":{"source":"iana"},"application/vnd.afpc.cmoca-cmresource":{"source":"iana"},"application/vnd.afpc.foca-charset":{"source":"iana"},"application/vnd.afpc.foca-codedfont":{"source":"iana"},"application/vnd.afpc.foca-codepage":{"source":"iana"},"application/vnd.afpc.modca":{"source":"iana"},"application/vnd.afpc.modca-cmtable":{"source":"iana"},"application/vnd.afpc.modca-formdef":{"source":"iana"},"application/vnd.afpc.modca-mediummap":{"source":"iana"},"application/vnd.afpc.modca-objectcontainer":{"source":"iana"},"application/vnd.afpc.modca-overlay":{"source":"iana"},"application/vnd.afpc.modca-pagesegment":{"source":"iana"},"application/vnd.age":{"source":"iana","extensions":["age"]},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amadeus+json":{"source":"iana","compressible":true},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana","compressible":true},"application/vnd.android.ota":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.arrow.file":{"source":"iana"},"application/vnd.apache.arrow.stream":{"source":"iana"},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.aplextor.warrp+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","compressible":true,"extensions":["mpkg"]},"application/vnd.apple.keynote":{"source":"iana","extensions":["key"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.numbers":{"source":"iana","extensions":["numbers"]},"application/vnd.apple.pages":{"source":"iana","extensions":["pages"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artisan+json":{"source":"iana","compressible":true},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avalon+json":{"source":"iana","compressible":true},"application/vnd.avistar+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmml+xml":{"source":"iana","compressible":true,"extensions":["bmml"]},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.banana-accounting":{"source":"iana"},"application/vnd.bbf.usp.error":{"source":"iana"},"application/vnd.bbf.usp.msg":{"source":"iana"},"application/vnd.bbf.usp.msg+json":{"source":"iana","compressible":true},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana","compressible":true},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.bpf":{"source":"iana"},"application/vnd.bpf3":{"source":"iana"},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.byu.uapi+json":{"source":"iana","compressible":true},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","compressible":true,"extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.ciedi":{"source":"iana"},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana","compressible":true,"extensions":["csl"]},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collabio.xodocuments.document":{"source":"iana"},"application/vnd.collabio.xodocuments.document-template":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation-template":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet-template":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana","compressible":false},"application/vnd.comicbook-rar":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","compressible":true,"extensions":["wbs"]},"application/vnd.cryptii.pipe+json":{"source":"iana","compressible":true},"application/vnd.crypto-shade-file":{"source":"iana"},"application/vnd.cryptomator.encrypted":{"source":"iana"},"application/vnd.cryptomator.vault":{"source":"iana"},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana","compressible":true},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana","compressible":true},"application/vnd.cybank":{"source":"iana"},"application/vnd.cyclonedx+json":{"source":"iana","compressible":true},"application/vnd.cyclonedx+xml":{"source":"iana","compressible":true},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana","compressible":false},"application/vnd.d3m-dataset":{"source":"iana"},"application/vnd.d3m-problem":{"source":"iana"},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.dbf":{"source":"iana","extensions":["dbf"]},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume.movie":{"source":"iana"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana","compressible":true},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbisl+xml":{"source":"iana","compressible":true},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-container+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-generic+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-init+xml":{"source":"iana","compressible":true},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecip.rlp":{"source":"iana"},"application/vnd.eclipse.ditto+json":{"source":"iana","compressible":true},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana","compressible":true},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana","compressible":true},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana","compressible":false},"application/vnd.eszigno3+xml":{"source":"iana","compressible":true,"extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.asic-e+zip":{"source":"iana","compressible":false},"application/vnd.etsi.asic-s+zip":{"source":"iana","compressible":false},"application/vnd.etsi.cug+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvcommand+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvservice+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsync+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mcid+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana","compressible":true},"application/vnd.etsi.pstn+xml":{"source":"iana","compressible":true},"application/vnd.etsi.sci+xml":{"source":"iana","compressible":true},"application/vnd.etsi.simservs+xml":{"source":"iana","compressible":true},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana","compressible":true},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eu.kasparian.car+json":{"source":"iana","compressible":true},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.exstream-empower+zip":{"source":"iana","compressible":false},"application/vnd.exstream-package":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.familysearch.gedcom+zip":{"source":"iana","compressible":false},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.ficlab.flb+zip":{"source":"iana","compressible":false},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujifilm.fb.docuworks":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.binder":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.container":{"source":"iana"},"application/vnd.fujifilm.fb.jfi+xml":{"source":"iana","compressible":true},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.futoin+cbor":{"source":"iana"},"application/vnd.futoin+json":{"source":"iana","compressible":true},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.gentics.grd+json":{"source":"iana","compressible":true},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana","compressible":true},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.slides":{"source":"iana"},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana","compressible":true},"application/vnd.gov.sk.e-form+zip":{"source":"iana","compressible":false},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana","compressible":true},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","compressible":true,"extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","compressible":true,"extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hl7cda+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hl7v2+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper+json":{"source":"iana","compressible":true},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana","compressible":false},"application/vnd.imagemeter.image+zip":{"source":"iana","compressible":false},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana","compressible":true},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana","compressible":true},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana","compressible":true},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","compressible":true,"extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.iso11783-10+zip":{"source":"iana","compressible":false},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las":{"source":"iana"},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","compressible":true,"extensions":["lasxml"]},"application/vnd.laszip":{"source":"iana"},"application/vnd.leap+json":{"source":"iana","compressible":true},"application/vnd.liberty-request+xml":{"source":"iana","compressible":true},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","compressible":true,"extensions":["lbe"]},"application/vnd.logipipe.circuit+zip":{"source":"iana","compressible":false},"application/vnd.loom":{"source":"iana"},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana","extensions":["mvt"]},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.license+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxar.archive.3tz+zip":{"source":"iana","compressible":false},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana","compressible":true},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana","compressible":true},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana","compressible":true},"application/vnd.ms-printing.printticket+xml":{"source":"apache","compressible":true},"application/vnd.ms-printschematicket+xml":{"source":"iana","compressible":true},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.nacamar.ybrid+json":{"source":"iana","compressible":true},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nebumind.line":{"source":"iana"},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nimn":{"source":"iana"},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana","compressible":true},"application/vnd.nokia.iptv.config+xml":{"source":"iana","compressible":true},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana","compressible":true},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana","compressible":true,"extensions":["ac"]},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana","compressible":true},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oci.image.manifest.v1+json":{"source":"iana","compressible":true},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana","compressible":true},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana","compressible":true},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana","compressible":true},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana","compressible":true},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.oipf.spdlist+xml":{"source":"iana","compressible":true},"application/vnd.oipf.ueprofile+xml":{"source":"iana","compressible":true},"application/vnd.oipf.userprofile+xml":{"source":"iana","compressible":true},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.imd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sprov+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-pcc+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana","compressible":true},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","compressible":true,"extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana","compressible":true},"application/vnd.oma.group-usage-list+xml":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+cbor":{"source":"iana"},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.final-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.groups+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana","compressible":true},"application/vnd.oma.xcap-directory+xml":{"source":"iana","compressible":true},"application/vnd.omads-email+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-file+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-folder+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana","compressible":true,"extensions":["obgx"]},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana","compressible":true,"extensions":["osm"]},"application/vnd.opentimestamps.ots":{"source":"iana"},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"iana","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"iana","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"iana","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana","compressible":true},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana","compressible":true},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos.xml":{"source":"iana"},"application/vnd.patentdive":{"source":"iana"},"application/vnd.patientecommsdoc":{"source":"iana"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana","compressible":true},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.psfs":{"source":"iana"},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana","compressible":true},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana","compressible":true},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana","extensions":["rar"]},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","compressible":true,"extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.resilient.logic":{"source":"iana"},"application/vnd.restful+json":{"source":"iana","compressible":true},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","compressible":true,"extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sar":{"source":"iana"},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.seis+json":{"source":"iana","compressible":true},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shade-save-file":{"source":"iana"},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.shootproof+json":{"source":"iana","compressible":true},"application/vnd.shopkick+json":{"source":"iana","compressible":true},"application/vnd.shp":{"source":"iana"},"application/vnd.shx":{"source":"iana"},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.snesdev-page-table":{"source":"iana"},"application/vnd.software602.filler.form+xml":{"source":"iana","compressible":true,"extensions":["fo"]},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sqlite3":{"source":"iana"},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.sycle+xml":{"source":"iana","compressible":true},"application/vnd.syft+json":{"source":"iana","compressible":true},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","charset":"UTF-8","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["ddf"]},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.think-cell.ppttc+json":{"source":"iana","compressible":true},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana","compressible":true},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","compressible":true,"extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.veritone.aion+json":{"source":"iana","compressible":true},"application/vnd.veryant.thin":{"source":"iana"},"application/vnd.ves.encrypted":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","charset":"UTF-8","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.dpp":{"source":"iana"},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana","compressible":true},"application/vnd.wv.ssp+xml":{"source":"iana","compressible":true},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana","compressible":true},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","compressible":true,"extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.youtube.yt":{"source":"iana"},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","compressible":true,"extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","compressible":true,"extensions":["vxml"]},"application/voucher-cms+json":{"source":"iana","compressible":true},"application/vq-rtcpxr":{"source":"iana"},"application/wasm":{"source":"iana","compressible":true,"extensions":["wasm"]},"application/watcherinfo+xml":{"source":"iana","compressible":true,"extensions":["wif"]},"application/webpush-options+json":{"source":"iana","compressible":true},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","compressible":true,"extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","compressible":true,"extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","compressible":true,"extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","compressible":true,"extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","compressible":true,"extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-iwork-keynote-sffkey":{"extensions":["key"]},"application/x-iwork-numbers-sffnumbers":{"extensions":["numbers"]},"application/x-iwork-pages-sffpages":{"extensions":["pages"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-keepass2":{"extensions":["kdbx"]},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-pki-message":{"source":"iana"},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"iana","extensions":["der","crt","pem"]},"application/x-x509-ca-ra-cert":{"source":"iana"},"application/x-x509-next-ca-cert":{"source":"iana"},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","compressible":true,"extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana","compressible":true},"application/xaml+xml":{"source":"apache","compressible":true,"extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana","compressible":true,"extensions":["xav"]},"application/xcap-caps+xml":{"source":"iana","compressible":true,"extensions":["xca"]},"application/xcap-diff+xml":{"source":"iana","compressible":true,"extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana","compressible":true,"extensions":["xel"]},"application/xcap-error+xml":{"source":"iana","compressible":true},"application/xcap-ns+xml":{"source":"iana","compressible":true,"extensions":["xns"]},"application/xcon-conference-info+xml":{"source":"iana","compressible":true},"application/xcon-conference-info-diff+xml":{"source":"iana","compressible":true},"application/xenc+xml":{"source":"iana","compressible":true,"extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache","compressible":true},"application/xliff+xml":{"source":"iana","compressible":true,"extensions":["xlf"]},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana","compressible":true},"application/xmpp+xml":{"source":"iana","compressible":true},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","compressible":true,"extensions":["xpl"]},"application/xslt+xml":{"source":"iana","compressible":true,"extensions":["xsl","xslt"]},"application/xspf+xml":{"source":"apache","compressible":true,"extensions":["xspf"]},"application/xv+xml":{"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana","compressible":true},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana","compressible":true},"application/yin+xml":{"source":"iana","compressible":true,"extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"application/zstd":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/aac":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana","extensions":["amr"]},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/flexfec":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/mhas":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana","extensions":["mxmf"]},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx","opus"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/scip":{"source":"iana"},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sofa":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tetra_acelp":{"source":"iana"},"audio/tetra_acelp_bb":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/tsvcis":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/usac":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dts.uhd":{"source":"iana"},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/collection":{"source":"iana","extensions":["ttc"]},"font/otf":{"source":"iana","compressible":true,"extensions":["otf"]},"font/sfnt":{"source":"iana"},"font/ttf":{"source":"iana","compressible":true,"extensions":["ttf"]},"font/woff":{"source":"iana","extensions":["woff"]},"font/woff2":{"source":"iana","extensions":["woff2"]},"image/aces":{"source":"iana","extensions":["exr"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/avci":{"source":"iana","extensions":["avci"]},"image/avcs":{"source":"iana","extensions":["avcs"]},"image/avif":{"source":"iana","compressible":false,"extensions":["avif"]},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana","extensions":["drle"]},"image/emf":{"source":"iana","extensions":["emf"]},"image/fits":{"source":"iana","extensions":["fits"]},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/heic":{"source":"iana","extensions":["heic"]},"image/heic-sequence":{"source":"iana","extensions":["heics"]},"image/heif":{"source":"iana","extensions":["heif"]},"image/heif-sequence":{"source":"iana","extensions":["heifs"]},"image/hej2k":{"source":"iana","extensions":["hej2"]},"image/hsj2":{"source":"iana","extensions":["hsj2"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana","extensions":["jls"]},"image/jp2":{"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jph":{"source":"iana","extensions":["jph"]},"image/jphc":{"source":"iana","extensions":["jhc"]},"image/jpm":{"source":"iana","compressible":false,"extensions":["jpm"]},"image/jpx":{"source":"iana","compressible":false,"extensions":["jpx","jpf"]},"image/jxr":{"source":"iana","extensions":["jxr"]},"image/jxra":{"source":"iana","extensions":["jxra"]},"image/jxrs":{"source":"iana","extensions":["jxrs"]},"image/jxs":{"source":"iana","extensions":["jxs"]},"image/jxsc":{"source":"iana","extensions":["jxsc"]},"image/jxsi":{"source":"iana","extensions":["jxsi"]},"image/jxss":{"source":"iana","extensions":["jxss"]},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/ktx2":{"source":"iana","extensions":["ktx2"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana","extensions":["pti"]},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana","extensions":["t38"]},"image/tiff":{"source":"iana","compressible":false,"extensions":["tif","tiff"]},"image/tiff-fx":{"source":"iana","extensions":["tfx"]},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana","extensions":["azv"]},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana","compressible":true,"extensions":["ico"]},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-dds":{"compressible":true,"extensions":["dds"]},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.pco.b16":{"source":"iana","extensions":["b16"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana","extensions":["tap"]},"image/vnd.valve.source.texture":{"source":"iana","extensions":["vtf"]},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana","extensions":["pcx"]},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana","extensions":["wmf"]},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana","extensions":["disposition-notification"]},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana","extensions":["u8msg"]},"message/global-delivery-status":{"source":"iana","extensions":["u8dsn"]},"message/global-disposition-notification":{"source":"iana","extensions":["u8mdn"]},"message/global-headers":{"source":"iana","extensions":["u8hdr"]},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana","extensions":["wsc"]},"model/3mf":{"source":"iana","extensions":["3mf"]},"model/e57":{"source":"iana"},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"source":"iana","compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/mtl":{"source":"iana","extensions":["mtl"]},"model/obj":{"source":"iana","extensions":["obj"]},"model/step":{"source":"iana"},"model/step+xml":{"source":"iana","compressible":true,"extensions":["stpx"]},"model/step+zip":{"source":"iana","compressible":false,"extensions":["stpz"]},"model/step-xml+zip":{"source":"iana","compressible":false,"extensions":["stpxz"]},"model/stl":{"source":"iana","extensions":["stl"]},"model/vnd.collada+xml":{"source":"iana","compressible":true,"extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana","compressible":true},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana","extensions":["ogex"]},"model/vnd.parasolid.transmit.binary":{"source":"iana","extensions":["x_b"]},"model/vnd.parasolid.transmit.text":{"source":"iana","extensions":["x_t"]},"model/vnd.pytha.pyox":{"source":"iana"},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.sap.vds":{"source":"iana","extensions":["vds"]},"model/vnd.usdz+zip":{"source":"iana","compressible":false,"extensions":["usdz"]},"model/vnd.valve.source.compiled-map":{"source":"iana","extensions":["bsp"]},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana","extensions":["x3db"]},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana","extensions":["x3dv"]},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana"},"multipart/multilingual":{"source":"iana"},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/cql":{"source":"iana"},"text/cql-expression":{"source":"iana"},"text/cql-identifier":{"source":"iana"},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/fhirpath":{"source":"iana"},"text/flexfec":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/gff3":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"compressible":true,"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mdx":{"compressible":true,"extensions":["mdx"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana","charset":"UTF-8"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana","charset":"UTF-8"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/shaclc":{"source":"iana"},"text/shex":{"source":"iana","extensions":["shex"]},"text/slim":{"extensions":["slim","slm"]},"text/spdx":{"source":"iana","extensions":["spdx"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","charset":"UTF-8","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana","charset":"UTF-8"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana","charset":"UTF-8"},"text/vnd.familysearch.gedcom":{"source":"iana","extensions":["ged"]},"text/vnd.ficlab.flt":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.gml":{"source":"iana"},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.hans":{"source":"iana"},"text/vnd.hgl":{"source":"iana"},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.senx.warpscript":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sosi":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","charset":"UTF-8","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana","charset":"UTF-8"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"compressible":true,"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/av1":{"source":"iana"},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/ffv1":{"source":"iana"},"video/flexfec":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana","extensions":["m4s"]},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/jxsv":{"source":"iana"},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/scip":{"source":"iana"},"video/smpte291":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vc2":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.mp4vr":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vnd.youtube.yt":{"source":"iana"},"video/vp8":{"source":"iana"},"video/vp9":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./lib/index.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0RBQWtEO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7O0FDdmFhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTtBQUNoQyxhQUFhLG1CQUFPLENBQUMsaUVBQWtCO0FBQ3ZDLGNBQWMsbUJBQU8sQ0FBQyx5RUFBc0I7QUFDNUMsZUFBZSxtQkFBTyxDQUFDLDJFQUF1QjtBQUM5QyxvQkFBb0IsbUJBQU8sQ0FBQyw2RUFBdUI7QUFDbkQsbUJBQW1CLG1CQUFPLENBQUMsbUZBQTJCO0FBQ3RELHNCQUFzQixtQkFBTyxDQUFDLHlGQUE4QjtBQUM1RCwyQkFBMkIsbUJBQU8sQ0FBQyxtRkFBMEI7QUFDN0QsaUJBQWlCLG1CQUFPLENBQUMsdUVBQW9CO0FBQzdDLG9CQUFvQixtQkFBTyxDQUFDLGlGQUF5QjtBQUNyRCxvQkFBb0IsbUJBQU8sQ0FBQyxtRkFBMEI7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDO0FBQzdDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7OztBQzdOYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsa0RBQVM7QUFDN0IsV0FBVyxtQkFBTyxDQUFDLGdFQUFnQjtBQUNuQyxZQUFZLG1CQUFPLENBQUMsNERBQWM7QUFDbEMsa0JBQWtCLG1CQUFPLENBQUMsd0VBQW9CO0FBQzlDLGVBQWUsbUJBQU8sQ0FBQyw4REFBWTs7QUFFbkM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQyxnRkFBd0I7QUFDdEQsb0JBQW9CLG1CQUFPLENBQUMsNEVBQXNCO0FBQ2xELGlCQUFpQixtQkFBTyxDQUFDLHNFQUFtQjtBQUM1QyxnQkFBZ0IsdUZBQTZCO0FBQzdDLG1CQUFtQixtQkFBTyxDQUFDLDRFQUFzQjs7QUFFakQ7QUFDQSxtQkFBbUIsbUJBQU8sQ0FBQywyRUFBd0I7O0FBRW5EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFPLENBQUMsb0VBQWtCOztBQUV6QztBQUNBLHFCQUFxQixtQkFBTyxDQUFDLGdGQUF3Qjs7QUFFckQ7O0FBRUE7QUFDQSx5QkFBc0I7Ozs7Ozs7Ozs7OztBQy9EVDs7QUFFYixvQkFBb0IsbUJBQU8sQ0FBQyx5RUFBaUI7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3RIYTs7QUFFYixpQkFBaUIsbUJBQU8sQ0FBQyx1RUFBb0I7QUFDN0MsWUFBWSxtQkFBTyxDQUFDLG1EQUFVOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7OztBQ3JCYTs7QUFFYjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0phOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTtBQUNoQyxlQUFlLG1CQUFPLENBQUMseUVBQXFCO0FBQzVDLHlCQUF5QixtQkFBTyxDQUFDLGlGQUFzQjtBQUN2RCxzQkFBc0IsbUJBQU8sQ0FBQywyRUFBbUI7QUFDakQsa0JBQWtCLG1CQUFPLENBQUMsbUVBQWU7QUFDekMsb0JBQW9CLG1CQUFPLENBQUMsdUVBQWlCO0FBQzdDLGdCQUFnQixtQkFBTyxDQUFDLDJFQUFzQjs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxVQUFVLElBQUk7QUFDZDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7QUMvSmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLG1EQUFVOztBQUU5QjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLENBQUM7O0FBRUQ7QUFDQSxrREFBa0QsWUFBWTs7QUFFOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3JGYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxVQUFVO0FBQ3JCO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOzs7Ozs7Ozs7Ozs7QUNyRGE7O0FBRWIsb0JBQW9CLG1CQUFPLENBQUMsbUZBQTBCO0FBQ3RELGtCQUFrQixtQkFBTyxDQUFDLCtFQUF3Qjs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuQmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZO0FBQ2hDLG9CQUFvQixtQkFBTyxDQUFDLHVFQUFpQjtBQUM3QyxlQUFlLG1CQUFPLENBQUMsdUVBQW9CO0FBQzNDLGVBQWUsbUJBQU8sQ0FBQywrREFBYTtBQUNwQyxvQkFBb0IsbUJBQU8sQ0FBQyxpRkFBeUI7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQjtBQUMvQix1Q0FBdUM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7QUN0RmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLG1EQUFVOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLDJCQUEyQjtBQUMzQixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25HYTs7QUFFYixpQkFBaUIsbUJBQU8sQ0FBQyxpRUFBYzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hCYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7QUFDaEMsZUFBZSxtQkFBTyxDQUFDLCtEQUFhOztBQUVwQztBQUNBO0FBQ0E7QUFDQSxXQUFXLGVBQWU7QUFDMUIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsZ0JBQWdCO0FBQzNCLGFBQWEsR0FBRztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0EscUhBQXFDOzs7Ozs7Ozs7Ozs7QUNEeEI7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLG1EQUFVO0FBQzlCLDBCQUEwQixtQkFBTyxDQUFDLCtGQUFnQztBQUNsRSxpQkFBaUIsbUJBQU8sQ0FBQyx1RUFBb0I7QUFDN0MsMkJBQTJCLG1CQUFPLENBQUMseUVBQWdCO0FBQ25ELGlCQUFpQixtQkFBTyxDQUFDLDZFQUF1Qjs7QUFFaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1CQUFPLENBQUMsaUVBQWlCO0FBQ3ZDLElBQUk7QUFDSjtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxtRUFBa0I7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RTtBQUN4RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxpQkFBaUI7QUFDdkQsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLG1CQUFPLENBQUMseUVBQWdCO0FBQ3RDLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7QUNqSmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDYmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMkNBQTJDO0FBQzNDLFNBQVM7O0FBRVQ7QUFDQSw0REFBNEQsd0JBQXdCO0FBQ3BGO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDLGdDQUFnQyxjQUFjO0FBQzlDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7OztBQ3BEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNiYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDWmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQixTQUFTO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7O0FDbkVhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxtREFBVTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7QUNYYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BEYTs7QUFFYjtBQUNBLHdCQUF3QixLQUFLO0FBQzdCO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0xhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxQmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLG1EQUFVOztBQUU5QjtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdkVhOztBQUViLGNBQWMsd0ZBQThCO0FBQzVDLGlCQUFpQixtQkFBTyxDQUFDLHVFQUFvQjs7QUFFN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyRmE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLGdFQUFnQjs7QUFFbkM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFD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QUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsU0FBUztBQUN2RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDRDQUE0Qzs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElB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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxnQ0FBZ0M7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsd0NBQXdDO0FBQy9ELEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxtQkFBbUI7O0FBRW5FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBLG9CQUFvQixxQkFBcUI7QUFDekM7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7OztBQzdFRDs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1VFSkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2FzeW5ja2l0L2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXN5bmNraXQvbGliL2Fib3J0LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXN5bmNraXQvbGliL2FzeW5jLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXN5bmNraXQvbGliL2RlZmVyLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXN5bmNraXQvbGliL2l0ZXJhdGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9hc3luY2tpdC9saWIvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9hc3luY2tpdC9saWIvdGVybWluYXRvci5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2FzeW5ja2l0L3BhcmFsbGVsLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXN5bmNraXQvc2VyaWFsLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXN5bmNraXQvc2VyaWFsT3JkZXJlZC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2h0dHAuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zRXJyb3IuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2Vudi9Gb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZW52L2RhdGEuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b0Zvcm1EYXRhLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3Mvbm9kZV9tb2R1bGVzL2Zvcm0tZGF0YS9saWIvZm9ybV9kYXRhLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3Mvbm9kZV9tb2R1bGVzL2Zvcm0tZGF0YS9saWIvcG9wdWxhdGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2RvbWFpbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9kb21haW5zQ3JlZGVudGlhbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9kb21haW5zVGFncy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2RvbWFpbnNUZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9lcnJvci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2V2ZW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2Zvcm1EYXRhQnVpbGRlci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvaW50ZXJmYWNlcy9TdXByZXNzaW9ucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2lwLXBvb2xzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvaXBzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9tYWlsTGlzdE1lbWJlcnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9tZXNzYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL211bHRpcGxlVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL3JlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9yb3V0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9zdGF0cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL3N1cHByZXNzaW9ucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL3ZhbGlkYXRlLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvd2ViaG9va3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9iYXNlLTY0L2Jhc2U2NC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2NvbWJpbmVkLXN0cmVhbS9saWIvY29tYmluZWRfc3RyZWFtLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvY29tbW9uLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL25vZGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9kZWxheWVkLXN0cmVhbS9saWIvZGVsYXllZF9zdHJlYW0uanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9mb2xsb3ctcmVkaXJlY3RzL2RlYnVnLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvZm9sbG93LXJlZGlyZWN0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2hhcy1mbGFnL2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvbWltZS1kYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL21pbWUtdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9tcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL3N1cHBvcnRzLWNvbG9yL2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwid2VicGFjazovL21haWxndW4vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImFzc2VydFwiIiwid2VicGFjazovL21haWxndW4vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL21haWxndW4vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwib3NcIiIsIndlYnBhY2s6Ly9tYWlsZ3VuL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwic3RyZWFtXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidHR5XCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidXJsXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidXRpbFwiIiwid2VicGFjazovL21haWxndW4vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInpsaWJcIiIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibWFpbGd1blwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJtYWlsZ3VuXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwibW9kdWxlLmV4cG9ydHMgPVxue1xuICBwYXJhbGxlbCAgICAgIDogcmVxdWlyZSgnLi9wYXJhbGxlbC5qcycpLFxuICBzZXJpYWwgICAgICAgIDogcmVxdWlyZSgnLi9zZXJpYWwuanMnKSxcbiAgc2VyaWFsT3JkZXJlZCA6IHJlcXVpcmUoJy4vc2VyaWFsT3JkZXJlZC5qcycpXG59O1xuIiwiLy8gQVBJXG5tb2R1bGUuZXhwb3J0cyA9IGFib3J0O1xuXG4vKipcbiAqIEFib3J0cyBsZWZ0b3ZlciBhY3RpdmUgam9ic1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdGF0ZSAtIGN1cnJlbnQgc3RhdGUgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGFib3J0KHN0YXRlKVxue1xuICBPYmplY3Qua2V5cyhzdGF0ZS5qb2JzKS5mb3JFYWNoKGNsZWFuLmJpbmQoc3RhdGUpKTtcblxuICAvLyByZXNldCBsZWZ0b3ZlciBqb2JzXG4gIHN0YXRlLmpvYnMgPSB7fTtcbn1cblxuLyoqXG4gKiBDbGVhbnMgdXAgbGVmdG92ZXIgam9iIGJ5IGludm9raW5nIGFib3J0IGZ1bmN0aW9uIGZvciB0aGUgcHJvdmlkZWQgam9iIGlkXG4gKlxuICogQHRoaXMgIHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGtleSAtIGpvYiBpZCB0byBhYm9ydFxuICovXG5mdW5jdGlvbiBjbGVhbihrZXkpXG57XG4gIGlmICh0eXBlb2YgdGhpcy5qb2JzW2tleV0gPT0gJ2Z1bmN0aW9uJylcbiAge1xuICAgIHRoaXMuam9ic1trZXldKCk7XG4gIH1cbn1cbiIsInZhciBkZWZlciA9IHJlcXVpcmUoJy4vZGVmZXIuanMnKTtcblxuLy8gQVBJXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jO1xuXG4vKipcbiAqIFJ1bnMgcHJvdmlkZWQgY2FsbGJhY2sgYXN5bmNocm9ub3VzbHlcbiAqIGV2ZW4gaWYgY2FsbGJhY2sgaXRzZWxmIGlzIG5vdFxuICpcbiAqIEBwYXJhbSAgIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBjYWxsYmFjayB0byBpbnZva2VcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gLSBhdWdtZW50ZWQgY2FsbGJhY2tcbiAqL1xuZnVuY3Rpb24gYXN5bmMoY2FsbGJhY2spXG57XG4gIHZhciBpc0FzeW5jID0gZmFsc2U7XG5cbiAgLy8gY2hlY2sgaWYgYXN5bmMgaGFwcGVuZWRcbiAgZGVmZXIoZnVuY3Rpb24oKSB7IGlzQXN5bmMgPSB0cnVlOyB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24gYXN5bmNfY2FsbGJhY2soZXJyLCByZXN1bHQpXG4gIHtcbiAgICBpZiAoaXNBc3luYylcbiAgICB7XG4gICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBkZWZlcihmdW5jdGlvbiBuZXh0VGlja19jYWxsYmFjaygpXG4gICAgICB7XG4gICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZGVmZXI7XG5cbi8qKlxuICogUnVucyBwcm92aWRlZCBmdW5jdGlvbiBvbiBuZXh0IGl0ZXJhdGlvbiBvZiB0aGUgZXZlbnQgbG9vcFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIC0gZnVuY3Rpb24gdG8gcnVuXG4gKi9cbmZ1bmN0aW9uIGRlZmVyKGZuKVxue1xuICB2YXIgbmV4dFRpY2sgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09ICdmdW5jdGlvbidcbiAgICA/IHNldEltbWVkaWF0ZVxuICAgIDogKFxuICAgICAgdHlwZW9mIHByb2Nlc3MgPT0gJ29iamVjdCcgJiYgdHlwZW9mIHByb2Nlc3MubmV4dFRpY2sgPT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBwcm9jZXNzLm5leHRUaWNrXG4gICAgICA6IG51bGxcbiAgICApO1xuXG4gIGlmIChuZXh0VGljaylcbiAge1xuICAgIG5leHRUaWNrKGZuKTtcbiAgfVxuICBlbHNlXG4gIHtcbiAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgfVxufVxuIiwidmFyIGFzeW5jID0gcmVxdWlyZSgnLi9hc3luYy5qcycpXG4gICwgYWJvcnQgPSByZXF1aXJlKCcuL2Fib3J0LmpzJylcbiAgO1xuXG4vLyBBUElcbm1vZHVsZS5leHBvcnRzID0gaXRlcmF0ZTtcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGVhY2ggam9iIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7YXJyYXl8b2JqZWN0fSBsaXN0IC0gYXJyYXkgb3Igb2JqZWN0IChuYW1lZCBsaXN0KSB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGl0ZXJhdG9yIC0gaXRlcmF0b3IgdG8gcnVuXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGUgLSBjdXJyZW50IGpvYiBzdGF0dXNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gaW52b2tlZCB3aGVuIGFsbCBlbGVtZW50cyBwcm9jZXNzZWRcbiAqL1xuZnVuY3Rpb24gaXRlcmF0ZShsaXN0LCBpdGVyYXRvciwgc3RhdGUsIGNhbGxiYWNrKVxue1xuICAvLyBzdG9yZSBjdXJyZW50IGluZGV4XG4gIHZhciBrZXkgPSBzdGF0ZVsna2V5ZWRMaXN0J10gPyBzdGF0ZVsna2V5ZWRMaXN0J11bc3RhdGUuaW5kZXhdIDogc3RhdGUuaW5kZXg7XG5cbiAgc3RhdGUuam9ic1trZXldID0gcnVuSm9iKGl0ZXJhdG9yLCBrZXksIGxpc3Rba2V5XSwgZnVuY3Rpb24oZXJyb3IsIG91dHB1dClcbiAge1xuICAgIC8vIGRvbid0IHJlcGVhdCB5b3Vyc2VsZlxuICAgIC8vIHNraXAgc2Vjb25kYXJ5IGNhbGxiYWNrc1xuICAgIGlmICghKGtleSBpbiBzdGF0ZS5qb2JzKSlcbiAgICB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY2xlYW4gdXAgam9ic1xuICAgIGRlbGV0ZSBzdGF0ZS5qb2JzW2tleV07XG5cbiAgICBpZiAoZXJyb3IpXG4gICAge1xuICAgICAgLy8gZG9uJ3QgcHJvY2VzcyByZXN0IG9mIHRoZSByZXN1bHRzXG4gICAgICAvLyBzdG9wIHN0aWxsIGFjdGl2ZSBqb2JzXG4gICAgICAvLyBhbmQgcmVzZXQgdGhlIGxpc3RcbiAgICAgIGFib3J0KHN0YXRlKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIHN0YXRlLnJlc3VsdHNba2V5XSA9IG91dHB1dDtcbiAgICB9XG5cbiAgICAvLyByZXR1cm4gc2FsdmFnZWQgcmVzdWx0c1xuICAgIGNhbGxiYWNrKGVycm9yLCBzdGF0ZS5yZXN1bHRzKTtcbiAgfSk7XG59XG5cbi8qKlxuICogUnVucyBpdGVyYXRvciBvdmVyIHByb3ZpZGVkIGpvYiBlbGVtZW50XG4gKlxuICogQHBhcmFtICAge2Z1bmN0aW9ufSBpdGVyYXRvciAtIGl0ZXJhdG9yIHRvIGludm9rZVxuICogQHBhcmFtICAge3N0cmluZ3xudW1iZXJ9IGtleSAtIGtleS9pbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0aGUgbGlzdCBvZiBqb2JzXG4gKiBAcGFyYW0gICB7bWl4ZWR9IGl0ZW0gLSBqb2IgZGVzY3JpcHRpb25cbiAqIEBwYXJhbSAgIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBpbnZva2VkIGFmdGVyIGl0ZXJhdG9yIGlzIGRvbmUgd2l0aCB0aGUgam9iXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb258bWl4ZWR9IC0gam9iIGFib3J0IGZ1bmN0aW9uIG9yIHNvbWV0aGluZyBlbHNlXG4gKi9cbmZ1bmN0aW9uIHJ1bkpvYihpdGVyYXRvciwga2V5LCBpdGVtLCBjYWxsYmFjaylcbntcbiAgdmFyIGFib3J0ZXI7XG5cbiAgLy8gYWxsb3cgc2hvcnRjdXQgaWYgaXRlcmF0b3IgZXhwZWN0cyBvbmx5IHR3byBhcmd1bWVudHNcbiAgaWYgKGl0ZXJhdG9yLmxlbmd0aCA9PSAyKVxuICB7XG4gICAgYWJvcnRlciA9IGl0ZXJhdG9yKGl0ZW0sIGFzeW5jKGNhbGxiYWNrKSk7XG4gIH1cbiAgLy8gb3RoZXJ3aXNlIGdvIHdpdGggZnVsbCB0aHJlZSBhcmd1bWVudHNcbiAgZWxzZVxuICB7XG4gICAgYWJvcnRlciA9IGl0ZXJhdG9yKGl0ZW0sIGtleSwgYXN5bmMoY2FsbGJhY2spKTtcbiAgfVxuXG4gIHJldHVybiBhYm9ydGVyO1xufVxuIiwiLy8gQVBJXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXRlO1xuXG4vKipcbiAqIENyZWF0ZXMgaW5pdGlhbCBzdGF0ZSBvYmplY3RcbiAqIGZvciBpdGVyYXRpb24gb3ZlciBsaXN0XG4gKlxuICogQHBhcmFtICAge2FycmF5fG9iamVjdH0gbGlzdCAtIGxpc3QgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0gICB7ZnVuY3Rpb258bnVsbH0gc29ydE1ldGhvZCAtIGZ1bmN0aW9uIHRvIHVzZSBmb3Iga2V5cyBzb3J0LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgYG51bGxgIHRvIGtlZXAgdGhlbSBhcyBpc1xuICogQHJldHVybnMge29iamVjdH0gLSBpbml0aWFsIHN0YXRlIG9iamVjdFxuICovXG5mdW5jdGlvbiBzdGF0ZShsaXN0LCBzb3J0TWV0aG9kKVxue1xuICB2YXIgaXNOYW1lZExpc3QgPSAhQXJyYXkuaXNBcnJheShsaXN0KVxuICAgICwgaW5pdFN0YXRlID1cbiAgICB7XG4gICAgICBpbmRleCAgICA6IDAsXG4gICAgICBrZXllZExpc3Q6IGlzTmFtZWRMaXN0IHx8IHNvcnRNZXRob2QgPyBPYmplY3Qua2V5cyhsaXN0KSA6IG51bGwsXG4gICAgICBqb2JzICAgICA6IHt9LFxuICAgICAgcmVzdWx0cyAgOiBpc05hbWVkTGlzdCA/IHt9IDogW10sXG4gICAgICBzaXplICAgICA6IGlzTmFtZWRMaXN0ID8gT2JqZWN0LmtleXMobGlzdCkubGVuZ3RoIDogbGlzdC5sZW5ndGhcbiAgICB9XG4gICAgO1xuXG4gIGlmIChzb3J0TWV0aG9kKVxuICB7XG4gICAgLy8gc29ydCBhcnJheSBrZXlzIGJhc2VkIG9uIGl0J3MgdmFsdWVzXG4gICAgLy8gc29ydCBvYmplY3QncyBrZXlzIGp1c3Qgb24gb3duIG1lcml0XG4gICAgaW5pdFN0YXRlLmtleWVkTGlzdC5zb3J0KGlzTmFtZWRMaXN0ID8gc29ydE1ldGhvZCA6IGZ1bmN0aW9uKGEsIGIpXG4gICAge1xuICAgICAgcmV0dXJuIHNvcnRNZXRob2QobGlzdFthXSwgbGlzdFtiXSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gaW5pdFN0YXRlO1xufVxuIiwidmFyIGFib3J0ID0gcmVxdWlyZSgnLi9hYm9ydC5qcycpXG4gICwgYXN5bmMgPSByZXF1aXJlKCcuL2FzeW5jLmpzJylcbiAgO1xuXG4vLyBBUElcbm1vZHVsZS5leHBvcnRzID0gdGVybWluYXRvcjtcblxuLyoqXG4gKiBUZXJtaW5hdGVzIGpvYnMgaW4gdGhlIGF0dGFjaGVkIHN0YXRlIGNvbnRleHRcbiAqXG4gKiBAdGhpcyAgQXN5bmNLaXRTdGF0ZSNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gZmluYWwgY2FsbGJhY2sgdG8gaW52b2tlIGFmdGVyIHRlcm1pbmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHRlcm1pbmF0b3IoY2FsbGJhY2spXG57XG4gIGlmICghT2JqZWN0LmtleXModGhpcy5qb2JzKS5sZW5ndGgpXG4gIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBmYXN0IGZvcndhcmQgaXRlcmF0aW9uIGluZGV4XG4gIHRoaXMuaW5kZXggPSB0aGlzLnNpemU7XG5cbiAgLy8gYWJvcnQgam9ic1xuICBhYm9ydCh0aGlzKTtcblxuICAvLyBzZW5kIGJhY2sgcmVzdWx0cyB3ZSBoYXZlIHNvIGZhclxuICBhc3luYyhjYWxsYmFjaykobnVsbCwgdGhpcy5yZXN1bHRzKTtcbn1cbiIsInZhciBpdGVyYXRlICAgID0gcmVxdWlyZSgnLi9saWIvaXRlcmF0ZS5qcycpXG4gICwgaW5pdFN0YXRlICA9IHJlcXVpcmUoJy4vbGliL3N0YXRlLmpzJylcbiAgLCB0ZXJtaW5hdG9yID0gcmVxdWlyZSgnLi9saWIvdGVybWluYXRvci5qcycpXG4gIDtcblxuLy8gUHVibGljIEFQSVxubW9kdWxlLmV4cG9ydHMgPSBwYXJhbGxlbDtcblxuLyoqXG4gKiBSdW5zIGl0ZXJhdG9yIG92ZXIgcHJvdmlkZWQgYXJyYXkgZWxlbWVudHMgaW4gcGFyYWxsZWxcbiAqXG4gKiBAcGFyYW0gICB7YXJyYXl8b2JqZWN0fSBsaXN0IC0gYXJyYXkgb3Igb2JqZWN0IChuYW1lZCBsaXN0KSB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSAgIHtmdW5jdGlvbn0gaXRlcmF0b3IgLSBpdGVyYXRvciB0byBydW5cbiAqIEBwYXJhbSAgIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBpbnZva2VkIHdoZW4gYWxsIGVsZW1lbnRzIHByb2Nlc3NlZFxuICogQHJldHVybnMge2Z1bmN0aW9ufSAtIGpvYnMgdGVybWluYXRvclxuICovXG5mdW5jdGlvbiBwYXJhbGxlbChsaXN0LCBpdGVyYXRvciwgY2FsbGJhY2spXG57XG4gIHZhciBzdGF0ZSA9IGluaXRTdGF0ZShsaXN0KTtcblxuICB3aGlsZSAoc3RhdGUuaW5kZXggPCAoc3RhdGVbJ2tleWVkTGlzdCddIHx8IGxpc3QpLmxlbmd0aClcbiAge1xuICAgIGl0ZXJhdGUobGlzdCwgaXRlcmF0b3IsIHN0YXRlLCBmdW5jdGlvbihlcnJvciwgcmVzdWx0KVxuICAgIHtcbiAgICAgIGlmIChlcnJvcilcbiAgICAgIHtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3VsdCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gbG9va3MgbGlrZSBpdCdzIHRoZSBsYXN0IG9uZVxuICAgICAgaWYgKE9iamVjdC5rZXlzKHN0YXRlLmpvYnMpLmxlbmd0aCA9PT0gMClcbiAgICAgIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgc3RhdGUucmVzdWx0cyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YXRlLmluZGV4Kys7XG4gIH1cblxuICByZXR1cm4gdGVybWluYXRvci5iaW5kKHN0YXRlLCBjYWxsYmFjayk7XG59XG4iLCJ2YXIgc2VyaWFsT3JkZXJlZCA9IHJlcXVpcmUoJy4vc2VyaWFsT3JkZXJlZC5qcycpO1xuXG4vLyBQdWJsaWMgQVBJXG5tb2R1bGUuZXhwb3J0cyA9IHNlcmlhbDtcblxuLyoqXG4gKiBSdW5zIGl0ZXJhdG9yIG92ZXIgcHJvdmlkZWQgYXJyYXkgZWxlbWVudHMgaW4gc2VyaWVzXG4gKlxuICogQHBhcmFtICAge2FycmF5fG9iamVjdH0gbGlzdCAtIGFycmF5IG9yIG9iamVjdCAobmFtZWQgbGlzdCkgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0gICB7ZnVuY3Rpb259IGl0ZXJhdG9yIC0gaXRlcmF0b3IgdG8gcnVuXG4gKiBAcGFyYW0gICB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gaW52b2tlZCB3aGVuIGFsbCBlbGVtZW50cyBwcm9jZXNzZWRcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gLSBqb2JzIHRlcm1pbmF0b3JcbiAqL1xuZnVuY3Rpb24gc2VyaWFsKGxpc3QsIGl0ZXJhdG9yLCBjYWxsYmFjaylcbntcbiAgcmV0dXJuIHNlcmlhbE9yZGVyZWQobGlzdCwgaXRlcmF0b3IsIG51bGwsIGNhbGxiYWNrKTtcbn1cbiIsInZhciBpdGVyYXRlICAgID0gcmVxdWlyZSgnLi9saWIvaXRlcmF0ZS5qcycpXG4gICwgaW5pdFN0YXRlICA9IHJlcXVpcmUoJy4vbGliL3N0YXRlLmpzJylcbiAgLCB0ZXJtaW5hdG9yID0gcmVxdWlyZSgnLi9saWIvdGVybWluYXRvci5qcycpXG4gIDtcblxuLy8gUHVibGljIEFQSVxubW9kdWxlLmV4cG9ydHMgPSBzZXJpYWxPcmRlcmVkO1xuLy8gc29ydGluZyBoZWxwZXJzXG5tb2R1bGUuZXhwb3J0cy5hc2NlbmRpbmcgID0gYXNjZW5kaW5nO1xubW9kdWxlLmV4cG9ydHMuZGVzY2VuZGluZyA9IGRlc2NlbmRpbmc7XG5cbi8qKlxuICogUnVucyBpdGVyYXRvciBvdmVyIHByb3ZpZGVkIHNvcnRlZCBhcnJheSBlbGVtZW50cyBpbiBzZXJpZXNcbiAqXG4gKiBAcGFyYW0gICB7YXJyYXl8b2JqZWN0fSBsaXN0IC0gYXJyYXkgb3Igb2JqZWN0IChuYW1lZCBsaXN0KSB0byBpdGVyYXRlIG92ZXJcbiAqIEBwYXJhbSAgIHtmdW5jdGlvbn0gaXRlcmF0b3IgLSBpdGVyYXRvciB0byBydW5cbiAqIEBwYXJhbSAgIHtmdW5jdGlvbn0gc29ydE1ldGhvZCAtIGN1c3RvbSBzb3J0IGZ1bmN0aW9uXG4gKiBAcGFyYW0gICB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gaW52b2tlZCB3aGVuIGFsbCBlbGVtZW50cyBwcm9jZXNzZWRcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gLSBqb2JzIHRlcm1pbmF0b3JcbiAqL1xuZnVuY3Rpb24gc2VyaWFsT3JkZXJlZChsaXN0LCBpdGVyYXRvciwgc29ydE1ldGhvZCwgY2FsbGJhY2spXG57XG4gIHZhciBzdGF0ZSA9IGluaXRTdGF0ZShsaXN0LCBzb3J0TWV0aG9kKTtcblxuICBpdGVyYXRlKGxpc3QsIGl0ZXJhdG9yLCBzdGF0ZSwgZnVuY3Rpb24gaXRlcmF0b3JIYW5kbGVyKGVycm9yLCByZXN1bHQpXG4gIHtcbiAgICBpZiAoZXJyb3IpXG4gICAge1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHJlc3VsdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RhdGUuaW5kZXgrKztcblxuICAgIC8vIGFyZSB3ZSB0aGVyZSB5ZXQ/XG4gICAgaWYgKHN0YXRlLmluZGV4IDwgKHN0YXRlWydrZXllZExpc3QnXSB8fCBsaXN0KS5sZW5ndGgpXG4gICAge1xuICAgICAgaXRlcmF0ZShsaXN0LCBpdGVyYXRvciwgc3RhdGUsIGl0ZXJhdG9ySGFuZGxlcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZG9uZSBoZXJlXG4gICAgY2FsbGJhY2sobnVsbCwgc3RhdGUucmVzdWx0cyk7XG4gIH0pO1xuXG4gIHJldHVybiB0ZXJtaW5hdG9yLmJpbmQoc3RhdGUsIGNhbGxiYWNrKTtcbn1cblxuLypcbiAqIC0tIFNvcnQgbWV0aG9kc1xuICovXG5cbi8qKlxuICogc29ydCBoZWxwZXIgdG8gc29ydCBhcnJheSBlbGVtZW50cyBpbiBhc2NlbmRpbmcgb3JkZXJcbiAqXG4gKiBAcGFyYW0gICB7bWl4ZWR9IGEgLSBhbiBpdGVtIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSAgIHttaXhlZH0gYiAtIGFuIGl0ZW0gdG8gY29tcGFyZVxuICogQHJldHVybnMge251bWJlcn0gLSBjb21wYXJpc29uIHJlc3VsdFxuICovXG5mdW5jdGlvbiBhc2NlbmRpbmcoYSwgYilcbntcbiAgcmV0dXJuIGEgPCBiID8gLTEgOiBhID4gYiA/IDEgOiAwO1xufVxuXG4vKipcbiAqIHNvcnQgaGVscGVyIHRvIHNvcnQgYXJyYXkgZWxlbWVudHMgaW4gZGVzY2VuZGluZyBvcmRlclxuICpcbiAqIEBwYXJhbSAgIHttaXhlZH0gYSAtIGFuIGl0ZW0gdG8gY29tcGFyZVxuICogQHBhcmFtICAge21peGVkfSBiIC0gYW4gaXRlbSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIGNvbXBhcmlzb24gcmVzdWx0XG4gKi9cbmZ1bmN0aW9uIGRlc2NlbmRpbmcoYSwgYilcbntcbiAgcmV0dXJuIC0xICogYXNjZW5kaW5nKGEsIGIpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi4vY29yZS9idWlsZEZ1bGxQYXRoJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xudmFyIGh0dHBzID0gcmVxdWlyZSgnaHR0cHMnKTtcbnZhciBodHRwRm9sbG93ID0gcmVxdWlyZSgnZm9sbG93LXJlZGlyZWN0cycpLmh0dHA7XG52YXIgaHR0cHNGb2xsb3cgPSByZXF1aXJlKCdmb2xsb3ctcmVkaXJlY3RzJykuaHR0cHM7XG52YXIgdXJsID0gcmVxdWlyZSgndXJsJyk7XG52YXIgemxpYiA9IHJlcXVpcmUoJ3psaWInKTtcbnZhciBWRVJTSU9OID0gcmVxdWlyZSgnLi8uLi9lbnYvZGF0YScpLnZlcnNpb247XG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwnKTtcbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yJyk7XG5cbnZhciBpc0h0dHBzID0gL2h0dHBzOj8vO1xuXG52YXIgc3VwcG9ydGVkUHJvdG9jb2xzID0gWyAnaHR0cDonLCAnaHR0cHM6JywgJ2ZpbGU6JyBdO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge2h0dHAuQ2xpZW50UmVxdWVzdEFyZ3N9IG9wdGlvbnNcbiAqIEBwYXJhbSB7QXhpb3NQcm94eUNvbmZpZ30gcHJveHlcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvblxuICovXG5mdW5jdGlvbiBzZXRQcm94eShvcHRpb25zLCBwcm94eSwgbG9jYXRpb24pIHtcbiAgb3B0aW9ucy5ob3N0bmFtZSA9IHByb3h5Lmhvc3Q7XG4gIG9wdGlvbnMuaG9zdCA9IHByb3h5Lmhvc3Q7XG4gIG9wdGlvbnMucG9ydCA9IHByb3h5LnBvcnQ7XG4gIG9wdGlvbnMucGF0aCA9IGxvY2F0aW9uO1xuXG4gIC8vIEJhc2ljIHByb3h5IGF1dGhvcml6YXRpb25cbiAgaWYgKHByb3h5LmF1dGgpIHtcbiAgICB2YXIgYmFzZTY0ID0gQnVmZmVyLmZyb20ocHJveHkuYXV0aC51c2VybmFtZSArICc6JyArIHByb3h5LmF1dGgucGFzc3dvcmQsICd1dGY4JykudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgIG9wdGlvbnMuaGVhZGVyc1snUHJveHktQXV0aG9yaXphdGlvbiddID0gJ0Jhc2ljICcgKyBiYXNlNjQ7XG4gIH1cblxuICAvLyBJZiBhIHByb3h5IGlzIHVzZWQsIGFueSByZWRpcmVjdHMgbXVzdCBhbHNvIHBhc3MgdGhyb3VnaCB0aGUgcHJveHlcbiAgb3B0aW9ucy5iZWZvcmVSZWRpcmVjdCA9IGZ1bmN0aW9uIGJlZm9yZVJlZGlyZWN0KHJlZGlyZWN0aW9uKSB7XG4gICAgcmVkaXJlY3Rpb24uaGVhZGVycy5ob3N0ID0gcmVkaXJlY3Rpb24uaG9zdDtcbiAgICBzZXRQcm94eShyZWRpcmVjdGlvbiwgcHJveHksIHJlZGlyZWN0aW9uLmhyZWYpO1xuICB9O1xufVxuXG4vKmVzbGludCBjb25zaXN0ZW50LXJldHVybjowKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaHR0cEFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaEh0dHBSZXF1ZXN0KHJlc29sdmVQcm9taXNlLCByZWplY3RQcm9taXNlKSB7XG4gICAgdmFyIG9uQ2FuY2VsZWQ7XG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciByZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgZG9uZSgpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodmFsdWUpO1xuICAgIH07XG4gICAgdmFyIHJlamVjdGVkID0gZmFsc2U7XG4gICAgdmFyIHJlamVjdCA9IGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkge1xuICAgICAgZG9uZSgpO1xuICAgICAgcmVqZWN0ZWQgPSB0cnVlO1xuICAgICAgcmVqZWN0UHJvbWlzZSh2YWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgZGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciBoZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG4gICAgdmFyIGhlYWRlck5hbWVzID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIHN0b3JlTG93ZXJOYW1lKG5hbWUpIHtcbiAgICAgIGhlYWRlck5hbWVzW25hbWUudG9Mb3dlckNhc2UoKV0gPSBuYW1lO1xuICAgIH0pO1xuXG4gICAgLy8gU2V0IFVzZXItQWdlbnQgKHJlcXVpcmVkIGJ5IHNvbWUgc2VydmVycylcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2F4aW9zL2F4aW9zL2lzc3Vlcy82OVxuICAgIGlmICgndXNlci1hZ2VudCcgaW4gaGVhZGVyTmFtZXMpIHtcbiAgICAgIC8vIFVzZXItQWdlbnQgaXMgc3BlY2lmaWVkOyBoYW5kbGUgY2FzZSB3aGVyZSBubyBVQSBoZWFkZXIgaXMgZGVzaXJlZFxuICAgICAgaWYgKCFoZWFkZXJzW2hlYWRlck5hbWVzWyd1c2VyLWFnZW50J11dKSB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW2hlYWRlck5hbWVzWyd1c2VyLWFnZW50J11dO1xuICAgICAgfVxuICAgICAgLy8gT3RoZXJ3aXNlLCB1c2Ugc3BlY2lmaWVkIHZhbHVlXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE9ubHkgc2V0IGhlYWRlciBpZiBpdCBoYXNuJ3QgYmVlbiBzZXQgaW4gY29uZmlnXG4gICAgICBoZWFkZXJzWydVc2VyLUFnZW50J10gPSAnYXhpb3MvJyArIFZFUlNJT047XG4gICAgfVxuXG4gICAgLy8gc3VwcG9ydCBmb3IgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZm9ybS1kYXRhIGFwaVxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZGF0YS5nZXRIZWFkZXJzKSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihoZWFkZXJzLCBkYXRhLmdldEhlYWRlcnMoKSk7XG4gICAgfSBlbHNlIGlmIChkYXRhICYmICF1dGlscy5pc1N0cmVhbShkYXRhKSkge1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgICAgICAvLyBOb3RoaW5nIHRvIGRvLi4uXG4gICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgZGF0YSA9IEJ1ZmZlci5mcm9tKG5ldyBVaW50OEFycmF5KGRhdGEpKTtcbiAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoZGF0YSkpIHtcbiAgICAgICAgZGF0YSA9IEJ1ZmZlci5mcm9tKGRhdGEsICd1dGYtOCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAnRGF0YSBhZnRlciB0cmFuc2Zvcm1hdGlvbiBtdXN0IGJlIGEgc3RyaW5nLCBhbiBBcnJheUJ1ZmZlciwgYSBCdWZmZXIsIG9yIGEgU3RyZWFtJyxcbiAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCxcbiAgICAgICAgICBjb25maWdcbiAgICAgICAgKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25maWcubWF4Qm9keUxlbmd0aCA+IC0xICYmIGRhdGEubGVuZ3RoID4gY29uZmlnLm1heEJvZHlMZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAnUmVxdWVzdCBib2R5IGxhcmdlciB0aGFuIG1heEJvZHlMZW5ndGggbGltaXQnLFxuICAgICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULFxuICAgICAgICAgIGNvbmZpZ1xuICAgICAgICApKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIENvbnRlbnQtTGVuZ3RoIGhlYWRlciBpZiBkYXRhIGV4aXN0c1xuICAgICAgaWYgKCFoZWFkZXJOYW1lc1snY29udGVudC1sZW5ndGgnXSkge1xuICAgICAgICBoZWFkZXJzWydDb250ZW50LUxlbmd0aCddID0gZGF0YS5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIHZhciBhdXRoID0gdW5kZWZpbmVkO1xuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIGF1dGggPSB1c2VybmFtZSArICc6JyArIHBhc3N3b3JkO1xuICAgIH1cblxuICAgIC8vIFBhcnNlIHVybFxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHZhciBwYXJzZWQgPSB1cmwucGFyc2UoZnVsbFBhdGgpO1xuICAgIHZhciBwcm90b2NvbCA9IHBhcnNlZC5wcm90b2NvbCB8fCBzdXBwb3J0ZWRQcm90b2NvbHNbMF07XG5cbiAgICBpZiAoc3VwcG9ydGVkUHJvdG9jb2xzLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmV0dXJuIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCxcbiAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKSk7XG4gICAgfVxuXG4gICAgaWYgKCFhdXRoICYmIHBhcnNlZC5hdXRoKSB7XG4gICAgICB2YXIgdXJsQXV0aCA9IHBhcnNlZC5hdXRoLnNwbGl0KCc6Jyk7XG4gICAgICB2YXIgdXJsVXNlcm5hbWUgPSB1cmxBdXRoWzBdIHx8ICcnO1xuICAgICAgdmFyIHVybFBhc3N3b3JkID0gdXJsQXV0aFsxXSB8fCAnJztcbiAgICAgIGF1dGggPSB1cmxVc2VybmFtZSArICc6JyArIHVybFBhc3N3b3JkO1xuICAgIH1cblxuICAgIGlmIChhdXRoICYmIGhlYWRlck5hbWVzLmF1dGhvcml6YXRpb24pIHtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW2hlYWRlck5hbWVzLmF1dGhvcml6YXRpb25dO1xuICAgIH1cblxuICAgIHZhciBpc0h0dHBzUmVxdWVzdCA9IGlzSHR0cHMudGVzdChwcm90b2NvbCk7XG4gICAgdmFyIGFnZW50ID0gaXNIdHRwc1JlcXVlc3QgPyBjb25maWcuaHR0cHNBZ2VudCA6IGNvbmZpZy5odHRwQWdlbnQ7XG5cbiAgICB0cnkge1xuICAgICAgYnVpbGRVUkwocGFyc2VkLnBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdmFyIGN1c3RvbUVyciA9IG5ldyBFcnJvcihlcnIubWVzc2FnZSk7XG4gICAgICBjdXN0b21FcnIuY29uZmlnID0gY29uZmlnO1xuICAgICAgY3VzdG9tRXJyLnVybCA9IGNvbmZpZy51cmw7XG4gICAgICBjdXN0b21FcnIuZXhpc3RzID0gdHJ1ZTtcbiAgICAgIHJlamVjdChjdXN0b21FcnIpO1xuICAgIH1cblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgcGF0aDogYnVpbGRVUkwocGFyc2VkLnBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpLFxuICAgICAgbWV0aG9kOiBjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgYWdlbnQ6IGFnZW50LFxuICAgICAgYWdlbnRzOiB7IGh0dHA6IGNvbmZpZy5odHRwQWdlbnQsIGh0dHBzOiBjb25maWcuaHR0cHNBZ2VudCB9LFxuICAgICAgYXV0aDogYXV0aFxuICAgIH07XG5cbiAgICBpZiAoY29uZmlnLnNvY2tldFBhdGgpIHtcbiAgICAgIG9wdGlvbnMuc29ja2V0UGF0aCA9IGNvbmZpZy5zb2NrZXRQYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLmhvc3RuYW1lID0gcGFyc2VkLmhvc3RuYW1lO1xuICAgICAgb3B0aW9ucy5wb3J0ID0gcGFyc2VkLnBvcnQ7XG4gICAgfVxuXG4gICAgdmFyIHByb3h5ID0gY29uZmlnLnByb3h5O1xuICAgIGlmICghcHJveHkgJiYgcHJveHkgIT09IGZhbHNlKSB7XG4gICAgICB2YXIgcHJveHlFbnYgPSBwcm90b2NvbC5zbGljZSgwLCAtMSkgKyAnX3Byb3h5JztcbiAgICAgIHZhciBwcm94eVVybCA9IHByb2Nlc3MuZW52W3Byb3h5RW52XSB8fCBwcm9jZXNzLmVudltwcm94eUVudi50b1VwcGVyQ2FzZSgpXTtcbiAgICAgIGlmIChwcm94eVVybCkge1xuICAgICAgICB2YXIgcGFyc2VkUHJveHlVcmwgPSB1cmwucGFyc2UocHJveHlVcmwpO1xuICAgICAgICB2YXIgbm9Qcm94eUVudiA9IHByb2Nlc3MuZW52Lm5vX3Byb3h5IHx8IHByb2Nlc3MuZW52Lk5PX1BST1hZO1xuICAgICAgICB2YXIgc2hvdWxkUHJveHkgPSB0cnVlO1xuXG4gICAgICAgIGlmIChub1Byb3h5RW52KSB7XG4gICAgICAgICAgdmFyIG5vUHJveHkgPSBub1Byb3h5RW52LnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIHRyaW0ocykge1xuICAgICAgICAgICAgcmV0dXJuIHMudHJpbSgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc2hvdWxkUHJveHkgPSAhbm9Qcm94eS5zb21lKGZ1bmN0aW9uIHByb3h5TWF0Y2gocHJveHlFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoIXByb3h5RWxlbWVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJveHlFbGVtZW50ID09PSAnKicpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJveHlFbGVtZW50WzBdID09PSAnLicgJiZcbiAgICAgICAgICAgICAgICBwYXJzZWQuaG9zdG5hbWUuc3Vic3RyKHBhcnNlZC5ob3N0bmFtZS5sZW5ndGggLSBwcm94eUVsZW1lbnQubGVuZ3RoKSA9PT0gcHJveHlFbGVtZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VkLmhvc3RuYW1lID09PSBwcm94eUVsZW1lbnQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvdWxkUHJveHkpIHtcbiAgICAgICAgICBwcm94eSA9IHtcbiAgICAgICAgICAgIGhvc3Q6IHBhcnNlZFByb3h5VXJsLmhvc3RuYW1lLFxuICAgICAgICAgICAgcG9ydDogcGFyc2VkUHJveHlVcmwucG9ydCxcbiAgICAgICAgICAgIHByb3RvY29sOiBwYXJzZWRQcm94eVVybC5wcm90b2NvbFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAocGFyc2VkUHJveHlVcmwuYXV0aCkge1xuICAgICAgICAgICAgdmFyIHByb3h5VXJsQXV0aCA9IHBhcnNlZFByb3h5VXJsLmF1dGguc3BsaXQoJzonKTtcbiAgICAgICAgICAgIHByb3h5LmF1dGggPSB7XG4gICAgICAgICAgICAgIHVzZXJuYW1lOiBwcm94eVVybEF1dGhbMF0sXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiBwcm94eVVybEF1dGhbMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb3h5KSB7XG4gICAgICBvcHRpb25zLmhlYWRlcnMuaG9zdCA9IHBhcnNlZC5ob3N0bmFtZSArIChwYXJzZWQucG9ydCA/ICc6JyArIHBhcnNlZC5wb3J0IDogJycpO1xuICAgICAgc2V0UHJveHkob3B0aW9ucywgcHJveHksIHByb3RvY29sICsgJy8vJyArIHBhcnNlZC5ob3N0bmFtZSArIChwYXJzZWQucG9ydCA/ICc6JyArIHBhcnNlZC5wb3J0IDogJycpICsgb3B0aW9ucy5wYXRoKTtcbiAgICB9XG5cbiAgICB2YXIgdHJhbnNwb3J0O1xuICAgIHZhciBpc0h0dHBzUHJveHkgPSBpc0h0dHBzUmVxdWVzdCAmJiAocHJveHkgPyBpc0h0dHBzLnRlc3QocHJveHkucHJvdG9jb2wpIDogdHJ1ZSk7XG4gICAgaWYgKGNvbmZpZy50cmFuc3BvcnQpIHtcbiAgICAgIHRyYW5zcG9ydCA9IGNvbmZpZy50cmFuc3BvcnQ7XG4gICAgfSBlbHNlIGlmIChjb25maWcubWF4UmVkaXJlY3RzID09PSAwKSB7XG4gICAgICB0cmFuc3BvcnQgPSBpc0h0dHBzUHJveHkgPyBodHRwcyA6IGh0dHA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb25maWcubWF4UmVkaXJlY3RzKSB7XG4gICAgICAgIG9wdGlvbnMubWF4UmVkaXJlY3RzID0gY29uZmlnLm1heFJlZGlyZWN0cztcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuYmVmb3JlUmVkaXJlY3QpIHtcbiAgICAgICAgb3B0aW9ucy5iZWZvcmVSZWRpcmVjdCA9IGNvbmZpZy5iZWZvcmVSZWRpcmVjdDtcbiAgICAgIH1cbiAgICAgIHRyYW5zcG9ydCA9IGlzSHR0cHNQcm94eSA/IGh0dHBzRm9sbG93IDogaHR0cEZvbGxvdztcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLm1heEJvZHlMZW5ndGggPiAtMSkge1xuICAgICAgb3B0aW9ucy5tYXhCb2R5TGVuZ3RoID0gY29uZmlnLm1heEJvZHlMZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5pbnNlY3VyZUhUVFBQYXJzZXIpIHtcbiAgICAgIG9wdGlvbnMuaW5zZWN1cmVIVFRQUGFyc2VyID0gY29uZmlnLmluc2VjdXJlSFRUUFBhcnNlcjtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIHJlcXVlc3RcbiAgICB2YXIgcmVxID0gdHJhbnNwb3J0LnJlcXVlc3Qob3B0aW9ucywgZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2UocmVzKSB7XG4gICAgICBpZiAocmVxLmFib3J0ZWQpIHJldHVybjtcblxuICAgICAgLy8gdW5jb21wcmVzcyB0aGUgcmVzcG9uc2UgYm9keSB0cmFuc3BhcmVudGx5IGlmIHJlcXVpcmVkXG4gICAgICB2YXIgc3RyZWFtID0gcmVzO1xuXG4gICAgICAvLyByZXR1cm4gdGhlIGxhc3QgcmVxdWVzdCBpbiBjYXNlIG9mIHJlZGlyZWN0c1xuICAgICAgdmFyIGxhc3RSZXF1ZXN0ID0gcmVzLnJlcSB8fCByZXE7XG5cblxuICAgICAgLy8gaWYgbm8gY29udGVudCwgaXMgSEVBRCByZXF1ZXN0IG9yIGRlY29tcHJlc3MgZGlzYWJsZWQgd2Ugc2hvdWxkIG5vdCBkZWNvbXByZXNzXG4gICAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT09IDIwNCAmJiBsYXN0UmVxdWVzdC5tZXRob2QgIT09ICdIRUFEJyAmJiBjb25maWcuZGVjb21wcmVzcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgc3dpdGNoIChyZXMuaGVhZGVyc1snY29udGVudC1lbmNvZGluZyddKSB7XG4gICAgICAgIC8qZXNsaW50IGRlZmF1bHQtY2FzZTowKi9cbiAgICAgICAgY2FzZSAnZ3ppcCc6XG4gICAgICAgIGNhc2UgJ2NvbXByZXNzJzpcbiAgICAgICAgY2FzZSAnZGVmbGF0ZSc6XG4gICAgICAgIC8vIGFkZCB0aGUgdW56aXBwZXIgdG8gdGhlIGJvZHkgc3RyZWFtIHByb2Nlc3NpbmcgcGlwZWxpbmVcbiAgICAgICAgICBzdHJlYW0gPSBzdHJlYW0ucGlwZSh6bGliLmNyZWF0ZVVuemlwKCkpO1xuXG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBjb250ZW50LWVuY29kaW5nIGluIG9yZGVyIHRvIG5vdCBjb25mdXNlIGRvd25zdHJlYW0gb3BlcmF0aW9uc1xuICAgICAgICAgIGRlbGV0ZSByZXMuaGVhZGVyc1snY29udGVudC1lbmNvZGluZyddO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgc3RhdHVzOiByZXMuc3RhdHVzQ29kZSxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVzLnN0YXR1c01lc3NhZ2UsXG4gICAgICAgIGhlYWRlcnM6IHJlcy5oZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogbGFzdFJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlID09PSAnc3RyZWFtJykge1xuICAgICAgICByZXNwb25zZS5kYXRhID0gc3RyZWFtO1xuICAgICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzcG9uc2VCdWZmZXIgPSBbXTtcbiAgICAgICAgdmFyIHRvdGFsUmVzcG9uc2VCeXRlcyA9IDA7XG4gICAgICAgIHN0cmVhbS5vbignZGF0YScsIGZ1bmN0aW9uIGhhbmRsZVN0cmVhbURhdGEoY2h1bmspIHtcbiAgICAgICAgICByZXNwb25zZUJ1ZmZlci5wdXNoKGNodW5rKTtcbiAgICAgICAgICB0b3RhbFJlc3BvbnNlQnl0ZXMgKz0gY2h1bmsubGVuZ3RoO1xuXG4gICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBjb250ZW50IGxlbmd0aCBpcyBub3Qgb3ZlciB0aGUgbWF4Q29udGVudExlbmd0aCBpZiBzcGVjaWZpZWRcbiAgICAgICAgICBpZiAoY29uZmlnLm1heENvbnRlbnRMZW5ndGggPiAtMSAmJiB0b3RhbFJlc3BvbnNlQnl0ZXMgPiBjb25maWcubWF4Q29udGVudExlbmd0aCkge1xuICAgICAgICAgICAgLy8gc3RyZWFtLmRlc3RveSgpIGVtaXQgYWJvcnRlZCBldmVudCBiZWZvcmUgY2FsbGluZyByZWplY3QoKSBvbiBOb2RlLmpzIHYxNlxuICAgICAgICAgICAgcmVqZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgc3RyZWFtLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignbWF4Q29udGVudExlbmd0aCBzaXplIG9mICcgKyBjb25maWcubWF4Q29udGVudExlbmd0aCArICcgZXhjZWVkZWQnLFxuICAgICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIGNvbmZpZywgbGFzdFJlcXVlc3QpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0cmVhbS5vbignYWJvcnRlZCcsIGZ1bmN0aW9uIGhhbmRsZXJTdHJlYW1BYm9ydGVkKCkge1xuICAgICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdHJlYW0uZGVzdHJveSgpO1xuICAgICAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAgICdtYXhDb250ZW50TGVuZ3RoIHNpemUgb2YgJyArIGNvbmZpZy5tYXhDb250ZW50TGVuZ3RoICsgJyBleGNlZWRlZCcsXG4gICAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgICBsYXN0UmVxdWVzdFxuICAgICAgICAgICkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdHJlYW0ub24oJ2Vycm9yJywgZnVuY3Rpb24gaGFuZGxlU3RyZWFtRXJyb3IoZXJyKSB7XG4gICAgICAgICAgaWYgKHJlcS5hYm9ydGVkKSByZXR1cm47XG4gICAgICAgICAgcmVqZWN0KEF4aW9zRXJyb3IuZnJvbShlcnIsIG51bGwsIGNvbmZpZywgbGFzdFJlcXVlc3QpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RyZWFtLm9uKCdlbmQnLCBmdW5jdGlvbiBoYW5kbGVTdHJlYW1FbmQoKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZURhdGEgPSByZXNwb25zZUJ1ZmZlci5sZW5ndGggPT09IDEgPyByZXNwb25zZUJ1ZmZlclswXSA6IEJ1ZmZlci5jb25jYXQocmVzcG9uc2VCdWZmZXIpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdhcnJheWJ1ZmZlcicpIHtcbiAgICAgICAgICAgICAgcmVzcG9uc2VEYXRhID0gcmVzcG9uc2VEYXRhLnRvU3RyaW5nKGNvbmZpZy5yZXNwb25zZUVuY29kaW5nKTtcbiAgICAgICAgICAgICAgaWYgKCFjb25maWcucmVzcG9uc2VFbmNvZGluZyB8fCBjb25maWcucmVzcG9uc2VFbmNvZGluZyA9PT0gJ3V0ZjgnKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VEYXRhID0gdXRpbHMuc3RyaXBCT00ocmVzcG9uc2VEYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHJlc3BvbnNlRGF0YTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChBeGlvc0Vycm9yLmZyb20oZXJyLCBudWxsLCBjb25maWcsIHJlc3BvbnNlLnJlcXVlc3QsIHJlc3BvbnNlKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBIYW5kbGUgZXJyb3JzXG4gICAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3RFcnJvcihlcnIpIHtcbiAgICAgIC8vIEB0b2RvIHJlbW92ZVxuICAgICAgLy8gaWYgKHJlcS5hYm9ydGVkICYmIGVyci5jb2RlICE9PSBBeGlvc0Vycm9yLkVSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMpIHJldHVybjtcbiAgICAgIHJlamVjdChBeGlvc0Vycm9yLmZyb20oZXJyLCBudWxsLCBjb25maWcsIHJlcSkpO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0IHRjcCBrZWVwIGFsaXZlIHRvIHByZXZlbnQgZHJvcCBjb25uZWN0aW9uIGJ5IHBlZXJcbiAgICByZXEub24oJ3NvY2tldCcsIGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3RTb2NrZXQoc29ja2V0KSB7XG4gICAgICAvLyBkZWZhdWx0IGludGVydmFsIG9mIHNlbmRpbmcgYWNrIHBhY2tldCBpcyAxIG1pbnV0ZVxuICAgICAgc29ja2V0LnNldEtlZXBBbGl2ZSh0cnVlLCAxMDAwICogNjApO1xuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIHJlcXVlc3QgdGltZW91dFxuICAgIGlmIChjb25maWcudGltZW91dCkge1xuICAgICAgLy8gVGhpcyBpcyBmb3JjaW5nIGEgaW50IHRpbWVvdXQgdG8gYXZvaWQgcHJvYmxlbXMgaWYgdGhlIGByZXFgIGludGVyZmFjZSBkb2Vzbid0IGhhbmRsZSBvdGhlciB0eXBlcy5cbiAgICAgIHZhciB0aW1lb3V0ID0gcGFyc2VJbnQoY29uZmlnLnRpbWVvdXQsIDEwKTtcblxuICAgICAgaWYgKGlzTmFOKHRpbWVvdXQpKSB7XG4gICAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAnZXJyb3IgdHJ5aW5nIHRvIHBhcnNlIGBjb25maWcudGltZW91dGAgdG8gaW50JyxcbiAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFLFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZXFcbiAgICAgICAgKSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBTb21ldGltZSwgdGhlIHJlc3BvbnNlIHdpbGwgYmUgdmVyeSBzbG93LCBhbmQgZG9lcyBub3QgcmVzcG9uZCwgdGhlIGNvbm5lY3QgZXZlbnQgd2lsbCBiZSBibG9jayBieSBldmVudCBsb29wIHN5c3RlbS5cbiAgICAgIC8vIEFuZCB0aW1lciBjYWxsYmFjayB3aWxsIGJlIGZpcmVkLCBhbmQgYWJvcnQoKSB3aWxsIGJlIGludm9rZWQgYmVmb3JlIGNvbm5lY3Rpb24sIHRoZW4gZ2V0IFwic29ja2V0IGhhbmcgdXBcIiBhbmQgY29kZSBFQ09OTlJFU0VULlxuICAgICAgLy8gQXQgdGhpcyB0aW1lLCBpZiB3ZSBoYXZlIGEgbGFyZ2UgbnVtYmVyIG9mIHJlcXVlc3QsIG5vZGVqcyB3aWxsIGhhbmcgdXAgc29tZSBzb2NrZXQgb24gYmFja2dyb3VuZC4gYW5kIHRoZSBudW1iZXIgd2lsbCB1cCBhbmQgdXAuXG4gICAgICAvLyBBbmQgdGhlbiB0aGVzZSBzb2NrZXQgd2hpY2ggYmUgaGFuZyB1cCB3aWxsIGRldm9yaW5nIENQVSBsaXR0bGUgYnkgbGl0dGxlLlxuICAgICAgLy8gQ2xpZW50UmVxdWVzdC5zZXRUaW1lb3V0IHdpbGwgYmUgZmlyZWQgb24gdGhlIHNwZWNpZnkgbWlsbGlzZWNvbmRzLCBhbmQgY2FuIG1ha2Ugc3VyZSB0aGF0IGFib3J0KCkgd2lsbCBiZSBmaXJlZCBhZnRlciBjb25uZWN0LlxuICAgICAgcmVxLnNldFRpbWVvdXQodGltZW91dCwgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdFRpbWVvdXQoKSB7XG4gICAgICAgIHJlcS5hYm9ydCgpO1xuICAgICAgICB2YXIgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgICd0aW1lb3V0IG9mICcgKyB0aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyxcbiAgICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlcVxuICAgICAgICApKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4gfHwgY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBmdW5jdGlvbihjYW5jZWwpIHtcbiAgICAgICAgaWYgKHJlcS5hYm9ydGVkKSByZXR1cm47XG5cbiAgICAgICAgcmVxLmFib3J0KCk7XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IChjYW5jZWwgJiYgY2FuY2VsLnR5cGUpID8gbmV3IENhbmNlbGVkRXJyb3IoKSA6IGNhbmNlbCk7XG4gICAgICB9O1xuXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4gJiYgY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChjb25maWcuc2lnbmFsKSB7XG4gICAgICAgIGNvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IGNvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICBpZiAodXRpbHMuaXNTdHJlYW0oZGF0YSkpIHtcbiAgICAgIGRhdGEub24oJ2Vycm9yJywgZnVuY3Rpb24gaGFuZGxlU3RyZWFtRXJyb3IoZXJyKSB7XG4gICAgICAgIHJlamVjdChBeGlvc0Vycm9yLmZyb20oZXJyLCBjb25maWcsIG51bGwsIHJlcSkpO1xuICAgICAgfSkucGlwZShyZXEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXEuZW5kKGRhdGEpO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwnKTtcbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yJyk7XG52YXIgcGFyc2VQcm90b2NvbCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcGFyc2VQcm90b2NvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG4gICAgdmFyIHJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgdmFyIG9uQ2FuY2VsZWQ7XG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpICYmIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCAgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICB2YXIgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4gfHwgY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBmdW5jdGlvbihjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IChjYW5jZWwgJiYgY2FuY2VsLnR5cGUpID8gbmV3IENhbmNlbGVkRXJyb3IoKSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4gJiYgY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChjb25maWcuc2lnbmFsKSB7XG4gICAgICAgIGNvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IGNvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvY29sID0gcGFyc2VQcm90b2NvbChmdWxsUGF0aCk7XG5cbiAgICBpZiAocHJvdG9jb2wgJiYgWyAnaHR0cCcsICdodHRwcycsICdmaWxlJyBdLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBjb25maWcpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3InKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcbmF4aW9zLlZFUlNJT04gPSByZXF1aXJlKCcuL2Vudi9kYXRhJykudmVyc2lvbjtcbmF4aW9zLnRvRm9ybURhdGEgPSByZXF1aXJlKCcuL2hlbHBlcnMvdG9Gb3JtRGF0YScpO1xuXG4vLyBFeHBvc2UgQXhpb3NFcnJvciBjbGFzc1xuYXhpb3MuQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2xpYi9jb3JlL0F4aW9zRXJyb3InKTtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vaGVscGVycy9pc0F4aW9zRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWxlZEVycm9yID0gcmVxdWlyZSgnLi9DYW5jZWxlZEVycm9yJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcblxuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICB0aGlzLnByb21pc2UudGhlbihmdW5jdGlvbihjYW5jZWwpIHtcbiAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgIHZhciBpO1xuICAgIHZhciBsID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0b2tlbi5fbGlzdGVuZXJzW2ldKGNhbmNlbCk7XG4gICAgfVxuICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICB9KTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICB0aGlzLnByb21pc2UudGhlbiA9IGZ1bmN0aW9uKG9uZnVsZmlsbGVkKSB7XG4gICAgdmFyIF9yZXNvbHZlO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICB0b2tlbi5zdWJzY3JpYmUocmVzb2x2ZSk7XG4gICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICBwcm9taXNlLmNhbmNlbCA9IGZ1bmN0aW9uIHJlamVjdCgpIHtcbiAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH07XG5cbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAqL1xuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIGxpc3RlbmVyKHRoaXMucmVhc29uKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IFtsaXN0ZW5lcl07XG4gIH1cbn07XG5cbi8qKlxuICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICovXG5cbkNhbmNlbFRva2VuLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVEKTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscy5pbmhlcml0cyhDYW5jZWxlZEVycm9yLCBBeGlvc0Vycm9yLCB7XG4gIF9fQ0FOQ0VMX186IHRydWVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi9idWlsZEZ1bGxQYXRoJyk7XG52YXIgdmFsaWRhdG9yID0gcmVxdWlyZSgnLi4vaGVscGVycy92YWxpZGF0b3InKTtcblxudmFyIHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XG4gIH1cblxuICB2YXIgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbDtcblxuICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgIHNpbGVudEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgLy8gZmlsdGVyIG91dCBza2lwcGVkIGludGVyY2VwdG9yc1xuICB2YXIgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgdmFyIHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHRydWU7XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdmFyIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB2YXIgcHJvbWlzZTtcblxuICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG5cbiAgICBBcnJheS5wcm90b3R5cGUudW5zaGlmdC5hcHBseShjaGFpbiwgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4pO1xuICAgIGNoYWluID0gY2hhaW4uY29uY2F0KHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG5cbiAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG5cbiAgdmFyIG5ld0NvbmZpZyA9IGNvbmZpZztcbiAgd2hpbGUgKHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aCkge1xuICAgIHZhciBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCk7XG4gICAgdmFyIG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5zaGlmdCgpO1xuICAgIHRyeSB7XG4gICAgICBuZXdDb25maWcgPSBvbkZ1bGZpbGxlZChuZXdDb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBvblJlamVjdGVkKGVycm9yKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdChuZXdDb25maWcpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cblxuICB3aGlsZSAocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCksIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBnZW5lcmF0ZUhUVFBNZXRob2QoKTtcblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICByZXNwb25zZSAmJiAodGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlKTtcbn1cblxudXRpbHMuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMucmVzcG9uc2UgJiYgdGhpcy5yZXNwb25zZS5zdGF0dXMgPyB0aGlzLnJlc3BvbnNlLnN0YXR1cyA6IG51bGxcbiAgICB9O1xuICB9XG59KTtcblxudmFyIHByb3RvdHlwZSA9IEF4aW9zRXJyb3IucHJvdG90eXBlO1xudmFyIGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXS5mb3JFYWNoKGZ1bmN0aW9uKGNvZGUpIHtcbiAgZGVzY3JpcHRvcnNbY29kZV0gPSB7dmFsdWU6IGNvZGV9O1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEF4aW9zRXJyb3IsIGRlc2NyaXB0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IGZ1bmN0aW9uKGVycm9yLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlLCBjdXN0b21Qcm9wcykge1xuICB2YXIgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcblxuICB1dGlscy50b0ZsYXRPYmplY3QoZXJyb3IsIGF4aW9zRXJyb3IsIGZ1bmN0aW9uIGZpbHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBFcnJvci5wcm90b3R5cGU7XG4gIH0pO1xuXG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBlcnJvci5tZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICBheGlvc0Vycm9yLm5hbWUgPSBlcnJvci5uYW1lO1xuXG4gIGN1c3RvbVByb3BzICYmIE9iamVjdC5hc3NpZ24oYXhpb3NFcnJvciwgY3VzdG9tUHJvcHMpO1xuXG4gIHJldHVybiBheGlvc0Vycm9yO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvc0Vycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCwgb3B0aW9ucykge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZCxcbiAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgY29uZmlnLFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICBjb25maWcsXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGlyZWN0S2V5cyhwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbWVyZ2VNYXAgPSB7XG4gICAgJ3VybCc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ21ldGhvZCc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ2RhdGEnOiB2YWx1ZUZyb21Db25maWcyLFxuICAgICdiYXNlVVJMJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNmb3JtUmVxdWVzdCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RyYW5zZm9ybVJlc3BvbnNlJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAncGFyYW1zU2VyaWFsaXplcic6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RpbWVvdXQnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd0aW1lb3V0TWVzc2FnZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3dpdGhDcmVkZW50aWFscyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2FkYXB0ZXInOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdyZXNwb25zZVR5cGUnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd4c3JmQ29va2llTmFtZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnb25VcGxvYWRQcm9ncmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ29uRG93bmxvYWRQcm9ncmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2RlY29tcHJlc3MnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnbWF4Qm9keUxlbmd0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2JlZm9yZVJlZGlyZWN0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNwb3J0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnaHR0cEFnZW50JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnaHR0cHNBZ2VudCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2NhbmNlbFRva2VuJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnc29ja2V0UGF0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3Jlc3BvbnNlRW5jb2RpbmcnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd2YWxpZGF0ZVN0YXR1cyc6IG1lcmdlRGlyZWN0S2V5c1xuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoY29uZmlnMSkuY29uY2F0KE9iamVjdC5rZXlzKGNvbmZpZzIpKSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICB2YXIgbWVyZ2UgPSBtZXJnZU1hcFtwcm9wXSB8fCBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIHZhciBjb25maWdWYWx1ZSA9IG1lcmdlKHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi9BeGlvc0Vycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIHZhciBjb250ZXh0ID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb250ZXh0LCBkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdmb3JtLWRhdGEnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xudmFyIHRyYW5zaXRpb25hbERlZmF1bHRzID0gcmVxdWlyZSgnLi90cmFuc2l0aW9uYWwnKTtcbnZhciB0b0Zvcm1EYXRhID0gcmVxdWlyZSgnLi4vaGVscGVycy90b0Zvcm1EYXRhJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4uL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlTYWZlbHkocmF3VmFsdWUsIHBhcnNlciwgZW5jb2Rlcikge1xuICBpZiAodXRpbHMuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzLnRyaW0ocmF3VmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLm5hbWUgIT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gKGVuY29kZXIgfHwgSlNPTi5zdHJpbmdpZnkpKHJhd1ZhbHVlKTtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuXG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgdmFyIGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xuICAgIHZhciBjb250ZW50VHlwZSA9IGhlYWRlcnMgJiYgaGVhZGVyc1snQ29udGVudC1UeXBlJ107XG5cbiAgICB2YXIgaXNGaWxlTGlzdDtcblxuICAgIGlmICgoaXNGaWxlTGlzdCA9IHV0aWxzLmlzRmlsZUxpc3QoZGF0YSkpIHx8IChpc09iamVjdFBheWxvYWQgJiYgY29udGVudFR5cGUgPT09ICdtdWx0aXBhcnQvZm9ybS1kYXRhJykpIHtcbiAgICAgIHZhciBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcbiAgICAgIHJldHVybiB0b0Zvcm1EYXRhKGlzRmlsZUxpc3QgPyB7J2ZpbGVzW10nOiBkYXRhfSA6IGRhdGEsIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCkpO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3RQYXlsb2FkIHx8IGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgcmV0dXJuIHN0cmluZ2lmeVNhZmVseShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgdmFyIHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICB2YXIgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgIHZhciBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgdmFyIHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcgfHwgKGZvcmNlZEpTT05QYXJzaW5nICYmIHV0aWxzLmlzU3RyaW5nKGRhdGEpICYmIGRhdGEubGVuZ3RoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChzdHJpY3RKU09OUGFyc2luZykge1xuICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIHRoaXMsIG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICBlbnY6IHtcbiAgICBGb3JtRGF0YTogcmVxdWlyZSgnLi9lbnYvRm9ybURhdGEnKVxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcInZlcnNpb25cIjogXCIwLjI3LjJcIlxufTsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZCtcXC0uXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMuaXNPYmplY3QocGF5bG9hZCkgJiYgKHBheWxvYWQuaXNBeGlvc0Vycm9yID09PSB0cnVlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgdmFyIG9yaWdpblVSTDtcblxuICAgICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICAgIH1cblxuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZVByb3RvY29sKHVybCkge1xuICB2YXIgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHs/T2JqZWN0fSBbZm9ybURhdGFdXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICoqL1xuXG5mdW5jdGlvbiB0b0Zvcm1EYXRhKG9iaiwgZm9ybURhdGEpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IEZvcm1EYXRhKCk7XG5cbiAgdmFyIHN0YWNrID0gW107XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBCbG9iKFt2YWx1ZV0pIDogQnVmZmVyLmZyb20odmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkKGRhdGEsIHBhcmVudEtleSkge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KGRhdGEpIHx8IHV0aWxzLmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKGRhdGEpICE9PSAtMSkge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICcgKyBwYXJlbnRLZXkpO1xuICAgICAgfVxuXG4gICAgICBzdGFjay5wdXNoKGRhdGEpO1xuXG4gICAgICB1dGlscy5mb3JFYWNoKGRhdGEsIGZ1bmN0aW9uIGVhY2godmFsdWUsIGtleSkge1xuICAgICAgICBpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm47XG4gICAgICAgIHZhciBmdWxsS2V5ID0gcGFyZW50S2V5ID8gcGFyZW50S2V5ICsgJy4nICsga2V5IDoga2V5O1xuICAgICAgICB2YXIgYXJyO1xuXG4gICAgICAgIGlmICh2YWx1ZSAmJiAhcGFyZW50S2V5ICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAne30nKSkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykgJiYgKGFyciA9IHV0aWxzLnRvQXJyYXkodmFsdWUpKSkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICAgICF1dGlscy5pc1VuZGVmaW5lZChlbCkgJiYgZm9ybURhdGEuYXBwZW5kKGZ1bGxLZXksIGNvbnZlcnRWYWx1ZShlbCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnVpbGQodmFsdWUsIGZ1bGxLZXkpO1xuICAgICAgfSk7XG5cbiAgICAgIHN0YWNrLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQocGFyZW50S2V5LCBjb252ZXJ0VmFsdWUoZGF0YSkpO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkKG9iaik7XG5cbiAgcmV0dXJuIGZvcm1EYXRhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvRm9ybURhdGE7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBWRVJTSU9OID0gcmVxdWlyZSgnLi4vZW52L2RhdGEnKS52ZXJzaW9uO1xudmFyIEF4aW9zRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL0F4aW9zRXJyb3InKTtcblxudmFyIHZhbGlkYXRvcnMgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUsIGkpIHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbnZhciBkZXByZWNhdGVkV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uYWwgb3B0aW9uIHZhbGlkYXRvclxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMudHJhbnNpdGlvbmFsID0gZnVuY3Rpb24gdHJhbnNpdGlvbmFsKHZhbGlkYXRvciwgdmVyc2lvbiwgbWVzc2FnZSkge1xuICBmdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG9wdCwgZGVzYykge1xuICAgIHJldHVybiAnW0F4aW9zIHYnICsgVkVSU0lPTiArICddIFRyYW5zaXRpb25hbCBvcHRpb24gXFwnJyArIG9wdCArICdcXCcnICsgZGVzYyArIChtZXNzYWdlID8gJy4gJyArIG1lc3NhZ2UgOiAnJyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG9wdCwgb3B0cykge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgdmFyIG9wdCA9IGtleXNbaV07XG4gICAgdmFyIHZhbGlkYXRvciA9IHNjaGVtYVtvcHRdO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIHZhciB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIHZhciByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFzc2VydE9wdGlvbnM6IGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnNcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbnZhciBraW5kT2YgPSAoZnVuY3Rpb24oY2FjaGUpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoaW5nKSB7XG4gICAgdmFyIHN0ciA9IHRvU3RyaW5nLmNhbGwodGhpbmcpO1xuICAgIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbiAgfTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5mdW5jdGlvbiBraW5kT2ZUZXN0KHR5cGUpIHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzS2luZE9mKHRoaW5nKSB7XG4gICAgcmV0dXJuIGtpbmRPZih0aGluZykgPT09IHR5cGU7XG4gIH07XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzQXJyYXlCdWZmZXIgPSBraW5kT2ZUZXN0KCdBcnJheUJ1ZmZlcicpO1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKGlzQXJyYXlCdWZmZXIodmFsLmJ1ZmZlcikpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWwpIHtcbiAgaWYgKGtpbmRPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGU7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNEYXRlID0ga2luZE9mVGVzdCgnRGF0ZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzRmlsZSA9IGtpbmRPZlRlc3QoJ0ZpbGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzRmlsZUxpc3QgPSBraW5kT2ZUZXN0KCdGaWxlTGlzdCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh0aGluZykge1xuICB2YXIgcGF0dGVybiA9ICdbb2JqZWN0IEZvcm1EYXRhXSc7XG4gIHJldHVybiB0aGluZyAmJiAoXG4gICAgKHR5cGVvZiBGb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGluZyBpbnN0YW5jZW9mIEZvcm1EYXRhKSB8fFxuICAgIHRvU3RyaW5nLmNhbGwodGhpbmcpID09PSBwYXR0ZXJuIHx8XG4gICAgKGlzRnVuY3Rpb24odGhpbmcudG9TdHJpbmcpICYmIHRoaW5nLnRvU3RyaW5nKCkgPT09IHBhdHRlcm4pXG4gICk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc1VSTFNlYXJjaFBhcmFtcyA9IGtpbmRPZlRlc3QoJ1VSTFNlYXJjaFBhcmFtcycpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIudHJpbSA/IHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRba2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqIEByZXR1cm4ge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5mdW5jdGlvbiBzdHJpcEJPTShjb250ZW50KSB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ29uc3RydWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcHJvcHNdXG4gKiBAcGFyYW0ge29iamVjdH0gW2Rlc2NyaXB0b3JzXVxuICovXG5cbmZ1bmN0aW9uIGluaGVyaXRzKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpIHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgcHJvcHMgJiYgT2JqZWN0LmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BzKTtcbn1cblxuLyoqXG4gKiBSZXNvbHZlIG9iamVjdCB3aXRoIGRlZXAgcHJvdG90eXBlIGNoYWluIHRvIGEgZmxhdCBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2VPYmogc291cmNlIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IFtkZXN0T2JqXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZpbHRlcl1cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gdG9GbGF0T2JqZWN0KHNvdXJjZU9iaiwgZGVzdE9iaiwgZmlsdGVyKSB7XG4gIHZhciBwcm9wcztcbiAgdmFyIGk7XG4gIHZhciBwcm9wO1xuICB2YXIgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG5cbiAgZG8ge1xuICAgIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlT2JqKTtcbiAgICBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICBwcm9wID0gcHJvcHNbaV07XG4gICAgICBpZiAoIW1lcmdlZFtwcm9wXSkge1xuICAgICAgICBkZXN0T2JqW3Byb3BdID0gc291cmNlT2JqW3Byb3BdO1xuICAgICAgICBtZXJnZWRbcHJvcF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBzb3VyY2VPYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc291cmNlT2JqKTtcbiAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xuXG4gIHJldHVybiBkZXN0T2JqO1xufVxuXG4vKlxuICogZGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3RyaW5nIGVuZHMgd2l0aCB0aGUgY2hhcmFjdGVycyBvZiBhIHNwZWNpZmllZCBzdHJpbmdcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcG9zaXRpb249IDBdXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgdmFyIGxhc3RJbmRleCA9IHN0ci5pbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pO1xuICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvc2l0aW9uO1xufVxuXG5cbi8qKlxuICogUmV0dXJucyBuZXcgYXJyYXkgZnJvbSBhcnJheSBsaWtlIG9iamVjdFxuICogQHBhcmFtIHsqfSBbdGhpbmddXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkodGhpbmcpIHtcbiAgaWYgKCF0aGluZykgcmV0dXJuIG51bGw7XG4gIHZhciBpID0gdGhpbmcubGVuZ3RoO1xuICBpZiAoaXNVbmRlZmluZWQoaSkpIHJldHVybiBudWxsO1xuICB2YXIgYXJyID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGFycltpXSA9IHRoaW5nW2ldO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG52YXIgaXNUeXBlZEFycmF5ID0gKGZ1bmN0aW9uKFR5cGVkQXJyYXkpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoaW5nKSB7XG4gICAgcmV0dXJuIFR5cGVkQXJyYXkgJiYgdGhpbmcgaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xuICB9O1xufSkodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdDogaXNQbGFpbk9iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltLFxuICBzdHJpcEJPTTogc3RyaXBCT00sXG4gIGluaGVyaXRzOiBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0OiB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZjoga2luZE9mLFxuICBraW5kT2ZUZXN0OiBraW5kT2ZUZXN0LFxuICBlbmRzV2l0aDogZW5kc1dpdGgsXG4gIHRvQXJyYXk6IHRvQXJyYXksXG4gIGlzVHlwZWRBcnJheTogaXNUeXBlZEFycmF5LFxuICBpc0ZpbGVMaXN0OiBpc0ZpbGVMaXN0XG59O1xuIiwidmFyIENvbWJpbmVkU3RyZWFtID0gcmVxdWlyZSgnY29tYmluZWQtc3RyZWFtJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xudmFyIGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG52YXIgaHR0cHMgPSByZXF1aXJlKCdodHRwcycpO1xudmFyIHBhcnNlVXJsID0gcmVxdWlyZSgndXJsJykucGFyc2U7XG52YXIgZnMgPSByZXF1aXJlKCdmcycpO1xudmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpLlN0cmVhbTtcbnZhciBtaW1lID0gcmVxdWlyZSgnbWltZS10eXBlcycpO1xudmFyIGFzeW5ja2l0ID0gcmVxdWlyZSgnYXN5bmNraXQnKTtcbnZhciBwb3B1bGF0ZSA9IHJlcXVpcmUoJy4vcG9wdWxhdGUuanMnKTtcblxuLy8gUHVibGljIEFQSVxubW9kdWxlLmV4cG9ydHMgPSBGb3JtRGF0YTtcblxuLy8gbWFrZSBpdCBhIFN0cmVhbVxudXRpbC5pbmhlcml0cyhGb3JtRGF0YSwgQ29tYmluZWRTdHJlYW0pO1xuXG4vKipcbiAqIENyZWF0ZSByZWFkYWJsZSBcIm11bHRpcGFydC9mb3JtLWRhdGFcIiBzdHJlYW1zLlxuICogQ2FuIGJlIHVzZWQgdG8gc3VibWl0IGZvcm1zXG4gKiBhbmQgZmlsZSB1cGxvYWRzIHRvIG90aGVyIHdlYiBhcHBsaWNhdGlvbnMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFByb3BlcnRpZXMgdG8gYmUgYWRkZWQvb3ZlcnJpZGVuIGZvciBGb3JtRGF0YSBhbmQgQ29tYmluZWRTdHJlYW1cbiAqL1xuZnVuY3Rpb24gRm9ybURhdGEob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRm9ybURhdGEpKSB7XG4gICAgcmV0dXJuIG5ldyBGb3JtRGF0YShvcHRpb25zKTtcbiAgfVxuXG4gIHRoaXMuX292ZXJoZWFkTGVuZ3RoID0gMDtcbiAgdGhpcy5fdmFsdWVMZW5ndGggPSAwO1xuICB0aGlzLl92YWx1ZXNUb01lYXN1cmUgPSBbXTtcblxuICBDb21iaW5lZFN0cmVhbS5jYWxsKHRoaXMpO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBmb3IgKHZhciBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgIHRoaXNbb3B0aW9uXSA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgfVxufVxuXG5Gb3JtRGF0YS5MSU5FX0JSRUFLID0gJ1xcclxcbic7XG5Gb3JtRGF0YS5ERUZBVUxUX0NPTlRFTlRfVFlQRSA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24oZmllbGQsIHZhbHVlLCBvcHRpb25zKSB7XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgLy8gYWxsb3cgZmlsZW5hbWUgYXMgc2luZ2xlIG9wdGlvblxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ3N0cmluZycpIHtcbiAgICBvcHRpb25zID0ge2ZpbGVuYW1lOiBvcHRpb25zfTtcbiAgfVxuXG4gIHZhciBhcHBlbmQgPSBDb21iaW5lZFN0cmVhbS5wcm90b3R5cGUuYXBwZW5kLmJpbmQodGhpcyk7XG5cbiAgLy8gYWxsIHRoYXQgc3RyZWFteSBidXNpbmVzcyBjYW4ndCBoYW5kbGUgbnVtYmVyc1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgdmFsdWUgPSAnJyArIHZhbHVlO1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZlbGl4Z2Uvbm9kZS1mb3JtLWRhdGEvaXNzdWVzLzM4XG4gIGlmICh1dGlsLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgLy8gUGxlYXNlIGNvbnZlcnQgeW91ciBhcnJheSBpbnRvIHN0cmluZ1xuICAgIC8vIHRoZSB3YXkgd2ViIHNlcnZlciBleHBlY3RzIGl0XG4gICAgdGhpcy5fZXJyb3IobmV3IEVycm9yKCdBcnJheXMgYXJlIG5vdCBzdXBwb3J0ZWQuJykpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBoZWFkZXIgPSB0aGlzLl9tdWx0aVBhcnRIZWFkZXIoZmllbGQsIHZhbHVlLCBvcHRpb25zKTtcbiAgdmFyIGZvb3RlciA9IHRoaXMuX211bHRpUGFydEZvb3RlcigpO1xuXG4gIGFwcGVuZChoZWFkZXIpO1xuICBhcHBlbmQodmFsdWUpO1xuICBhcHBlbmQoZm9vdGVyKTtcblxuICAvLyBwYXNzIGFsb25nIG9wdGlvbnMua25vd25MZW5ndGhcbiAgdGhpcy5fdHJhY2tMZW5ndGgoaGVhZGVyLCB2YWx1ZSwgb3B0aW9ucyk7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuX3RyYWNrTGVuZ3RoID0gZnVuY3Rpb24oaGVhZGVyLCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgdmFsdWVMZW5ndGggPSAwO1xuXG4gIC8vIHVzZWQgdy8gZ2V0TGVuZ3RoU3luYygpLCB3aGVuIGxlbmd0aCBpcyBrbm93bi5cbiAgLy8gZS5nLiBmb3Igc3RyZWFtaW5nIGRpcmVjdGx5IGZyb20gYSByZW1vdGUgc2VydmVyLFxuICAvLyB3LyBhIGtub3duIGZpbGUgYSBzaXplLCBhbmQgbm90IHdhbnRpbmcgdG8gd2FpdCBmb3JcbiAgLy8gaW5jb21pbmcgZmlsZSB0byBmaW5pc2ggdG8gZ2V0IGl0cyBzaXplLlxuICBpZiAob3B0aW9ucy5rbm93bkxlbmd0aCAhPSBudWxsKSB7XG4gICAgdmFsdWVMZW5ndGggKz0gK29wdGlvbnMua25vd25MZW5ndGg7XG4gIH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZUxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHZhbHVlKTtcbiAgfVxuXG4gIHRoaXMuX3ZhbHVlTGVuZ3RoICs9IHZhbHVlTGVuZ3RoO1xuXG4gIC8vIEBjaGVjayB3aHkgYWRkIENSTEY/IGRvZXMgdGhpcyBhY2NvdW50IGZvciBjdXN0b20vbXVsdGlwbGUgQ1JMRnM/XG4gIHRoaXMuX292ZXJoZWFkTGVuZ3RoICs9XG4gICAgQnVmZmVyLmJ5dGVMZW5ndGgoaGVhZGVyKSArXG4gICAgRm9ybURhdGEuTElORV9CUkVBSy5sZW5ndGg7XG5cbiAgLy8gZW1wdHkgb3IgZWl0aGVyIGRvZXNuJ3QgaGF2ZSBwYXRoIG9yIG5vdCBhbiBodHRwIHJlc3BvbnNlIG9yIG5vdCBhIHN0cmVhbVxuICBpZiAoIXZhbHVlIHx8ICggIXZhbHVlLnBhdGggJiYgISh2YWx1ZS5yZWFkYWJsZSAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnaHR0cFZlcnNpb24nKSkgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIFN0cmVhbSkpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gbm8gbmVlZCB0byBib3RoZXIgd2l0aCB0aGUgbGVuZ3RoXG4gIGlmICghb3B0aW9ucy5rbm93bkxlbmd0aCkge1xuICAgIHRoaXMuX3ZhbHVlc1RvTWVhc3VyZS5wdXNoKHZhbHVlKTtcbiAgfVxufTtcblxuRm9ybURhdGEucHJvdG90eXBlLl9sZW5ndGhSZXRyaWV2ZXIgPSBmdW5jdGlvbih2YWx1ZSwgY2FsbGJhY2spIHtcblxuICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoJ2ZkJykpIHtcblxuICAgIC8vIHRha2UgcmVhZCByYW5nZSBpbnRvIGEgYWNjb3VudFxuICAgIC8vIGBlbmRgID0gSW5maW5pdHkg4oCTPiByZWFkIGZpbGUgdGlsbCB0aGUgZW5kXG4gICAgLy9cbiAgICAvLyBUT0RPOiBMb29rcyBsaWtlIHRoZXJlIGlzIGJ1ZyBpbiBOb2RlIGZzLmNyZWF0ZVJlYWRTdHJlYW1cbiAgICAvLyBpdCBkb2Vzbid0IHJlc3BlY3QgYGVuZGAgb3B0aW9ucyB3aXRob3V0IGBzdGFydGAgb3B0aW9uc1xuICAgIC8vIEZpeCBpdCB3aGVuIG5vZGUgZml4ZXMgaXQuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy83ODE5XG4gICAgaWYgKHZhbHVlLmVuZCAhPSB1bmRlZmluZWQgJiYgdmFsdWUuZW5kICE9IEluZmluaXR5ICYmIHZhbHVlLnN0YXJ0ICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAvLyB3aGVuIGVuZCBzcGVjaWZpZWRcbiAgICAgIC8vIG5vIG5lZWQgdG8gY2FsY3VsYXRlIHJhbmdlXG4gICAgICAvLyBpbmNsdXNpdmUsIHN0YXJ0cyB3aXRoIDBcbiAgICAgIGNhbGxiYWNrKG51bGwsIHZhbHVlLmVuZCArIDEgLSAodmFsdWUuc3RhcnQgPyB2YWx1ZS5zdGFydCA6IDApKTtcblxuICAgIC8vIG5vdCB0aGF0IGZhc3Qgc25vb3B5XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHN0aWxsIG5lZWQgdG8gZmV0Y2ggZmlsZSBzaXplIGZyb20gZnNcbiAgICAgIGZzLnN0YXQodmFsdWUucGF0aCwgZnVuY3Rpb24oZXJyLCBzdGF0KSB7XG5cbiAgICAgICAgdmFyIGZpbGVTaXplO1xuXG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSBmaW5hbCBzaXplIGJhc2VkIG9uIHRoZSByYW5nZSBvcHRpb25zXG4gICAgICAgIGZpbGVTaXplID0gc3RhdC5zaXplIC0gKHZhbHVlLnN0YXJ0ID8gdmFsdWUuc3RhcnQgOiAwKTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgZmlsZVNpemUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIC8vIG9yIGh0dHAgcmVzcG9uc2VcbiAgfSBlbHNlIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnaHR0cFZlcnNpb24nKSkge1xuICAgIGNhbGxiYWNrKG51bGwsICt2YWx1ZS5oZWFkZXJzWydjb250ZW50LWxlbmd0aCddKTtcblxuICAvLyBvciByZXF1ZXN0IHN0cmVhbSBodHRwOi8vZ2l0aHViLmNvbS9taWtlYWwvcmVxdWVzdFxuICB9IGVsc2UgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KCdodHRwTW9kdWxlJykpIHtcbiAgICAvLyB3YWl0IHRpbGwgcmVzcG9uc2UgY29tZSBiYWNrXG4gICAgdmFsdWUub24oJ3Jlc3BvbnNlJywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhbHVlLnBhdXNlKCk7XG4gICAgICBjYWxsYmFjayhudWxsLCArcmVzcG9uc2UuaGVhZGVyc1snY29udGVudC1sZW5ndGgnXSk7XG4gICAgfSk7XG4gICAgdmFsdWUucmVzdW1lKCk7XG5cbiAgLy8gc29tZXRoaW5nIGVsc2VcbiAgfSBlbHNlIHtcbiAgICBjYWxsYmFjaygnVW5rbm93biBzdHJlYW0nKTtcbiAgfVxufTtcblxuRm9ybURhdGEucHJvdG90eXBlLl9tdWx0aVBhcnRIZWFkZXIgPSBmdW5jdGlvbihmaWVsZCwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgLy8gY3VzdG9tIGhlYWRlciBzcGVjaWZpZWQgKGFzIHN0cmluZyk/XG4gIC8vIGl0IGJlY29tZXMgcmVzcG9uc2libGUgZm9yIGJvdW5kYXJ5XG4gIC8vIChlLmcuIHRvIGhhbmRsZSBleHRyYSBDUkxGcyBvbiAuTkVUIHNlcnZlcnMpXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5oZWFkZXIgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5oZWFkZXI7XG4gIH1cblxuICB2YXIgY29udGVudERpc3Bvc2l0aW9uID0gdGhpcy5fZ2V0Q29udGVudERpc3Bvc2l0aW9uKHZhbHVlLCBvcHRpb25zKTtcbiAgdmFyIGNvbnRlbnRUeXBlID0gdGhpcy5fZ2V0Q29udGVudFR5cGUodmFsdWUsIG9wdGlvbnMpO1xuXG4gIHZhciBjb250ZW50cyA9ICcnO1xuICB2YXIgaGVhZGVycyAgPSB7XG4gICAgLy8gYWRkIGN1c3RvbSBkaXNwb3NpdGlvbiBhcyB0aGlyZCBlbGVtZW50IG9yIGtlZXAgaXQgdHdvIGVsZW1lbnRzIGlmIG5vdFxuICAgICdDb250ZW50LURpc3Bvc2l0aW9uJzogWydmb3JtLWRhdGEnLCAnbmFtZT1cIicgKyBmaWVsZCArICdcIiddLmNvbmNhdChjb250ZW50RGlzcG9zaXRpb24gfHwgW10pLFxuICAgIC8vIGlmIG5vIGNvbnRlbnQgdHlwZS4gYWxsb3cgaXQgdG8gYmUgZW1wdHkgYXJyYXlcbiAgICAnQ29udGVudC1UeXBlJzogW10uY29uY2F0KGNvbnRlbnRUeXBlIHx8IFtdKVxuICB9O1xuXG4gIC8vIGFsbG93IGN1c3RvbSBoZWFkZXJzLlxuICBpZiAodHlwZW9mIG9wdGlvbnMuaGVhZGVyID09ICdvYmplY3QnKSB7XG4gICAgcG9wdWxhdGUoaGVhZGVycywgb3B0aW9ucy5oZWFkZXIpO1xuICB9XG5cbiAgdmFyIGhlYWRlcjtcbiAgZm9yICh2YXIgcHJvcCBpbiBoZWFkZXJzKSB7XG4gICAgaWYgKCFoZWFkZXJzLmhhc093blByb3BlcnR5KHByb3ApKSBjb250aW51ZTtcbiAgICBoZWFkZXIgPSBoZWFkZXJzW3Byb3BdO1xuXG4gICAgLy8gc2tpcCBudWxsaXNoIGhlYWRlcnMuXG4gICAgaWYgKGhlYWRlciA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBjb252ZXJ0IGFsbCBoZWFkZXJzIHRvIGFycmF5cy5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaGVhZGVyKSkge1xuICAgICAgaGVhZGVyID0gW2hlYWRlcl07XG4gICAgfVxuXG4gICAgLy8gYWRkIG5vbi1lbXB0eSBoZWFkZXJzLlxuICAgIGlmIChoZWFkZXIubGVuZ3RoKSB7XG4gICAgICBjb250ZW50cyArPSBwcm9wICsgJzogJyArIGhlYWRlci5qb2luKCc7ICcpICsgRm9ybURhdGEuTElORV9CUkVBSztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gJy0tJyArIHRoaXMuZ2V0Qm91bmRhcnkoKSArIEZvcm1EYXRhLkxJTkVfQlJFQUsgKyBjb250ZW50cyArIEZvcm1EYXRhLkxJTkVfQlJFQUs7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuX2dldENvbnRlbnREaXNwb3NpdGlvbiA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG5cbiAgdmFyIGZpbGVuYW1lXG4gICAgLCBjb250ZW50RGlzcG9zaXRpb25cbiAgICA7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbGVwYXRoID09PSAnc3RyaW5nJykge1xuICAgIC8vIGN1c3RvbSBmaWxlcGF0aCBmb3IgcmVsYXRpdmUgcGF0aHNcbiAgICBmaWxlbmFtZSA9IHBhdGgubm9ybWFsaXplKG9wdGlvbnMuZmlsZXBhdGgpLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcbiAgfSBlbHNlIGlmIChvcHRpb25zLmZpbGVuYW1lIHx8IHZhbHVlLm5hbWUgfHwgdmFsdWUucGF0aCkge1xuICAgIC8vIGN1c3RvbSBmaWxlbmFtZSB0YWtlIHByZWNlZGVuY2VcbiAgICAvLyBmb3JtaWRhYmxlIGFuZCB0aGUgYnJvd3NlciBhZGQgYSBuYW1lIHByb3BlcnR5XG4gICAgLy8gZnMtIGFuZCByZXF1ZXN0LSBzdHJlYW1zIGhhdmUgcGF0aCBwcm9wZXJ0eVxuICAgIGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZShvcHRpb25zLmZpbGVuYW1lIHx8IHZhbHVlLm5hbWUgfHwgdmFsdWUucGF0aCk7XG4gIH0gZWxzZSBpZiAodmFsdWUucmVhZGFibGUgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoJ2h0dHBWZXJzaW9uJykpIHtcbiAgICAvLyBvciB0cnkgaHR0cCByZXNwb25zZVxuICAgIGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZSh2YWx1ZS5jbGllbnQuX2h0dHBNZXNzYWdlLnBhdGggfHwgJycpO1xuICB9XG5cbiAgaWYgKGZpbGVuYW1lKSB7XG4gICAgY29udGVudERpc3Bvc2l0aW9uID0gJ2ZpbGVuYW1lPVwiJyArIGZpbGVuYW1lICsgJ1wiJztcbiAgfVxuXG4gIHJldHVybiBjb250ZW50RGlzcG9zaXRpb247XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuX2dldENvbnRlbnRUeXBlID0gZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcblxuICAvLyB1c2UgY3VzdG9tIGNvbnRlbnQtdHlwZSBhYm92ZSBhbGxcbiAgdmFyIGNvbnRlbnRUeXBlID0gb3B0aW9ucy5jb250ZW50VHlwZTtcblxuICAvLyBvciB0cnkgYG5hbWVgIGZyb20gZm9ybWlkYWJsZSwgYnJvd3NlclxuICBpZiAoIWNvbnRlbnRUeXBlICYmIHZhbHVlLm5hbWUpIHtcbiAgICBjb250ZW50VHlwZSA9IG1pbWUubG9va3VwKHZhbHVlLm5hbWUpO1xuICB9XG5cbiAgLy8gb3IgdHJ5IGBwYXRoYCBmcm9tIGZzLSwgcmVxdWVzdC0gc3RyZWFtc1xuICBpZiAoIWNvbnRlbnRUeXBlICYmIHZhbHVlLnBhdGgpIHtcbiAgICBjb250ZW50VHlwZSA9IG1pbWUubG9va3VwKHZhbHVlLnBhdGgpO1xuICB9XG5cbiAgLy8gb3IgaWYgaXQncyBodHRwLXJlcG9uc2VcbiAgaWYgKCFjb250ZW50VHlwZSAmJiB2YWx1ZS5yZWFkYWJsZSAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnaHR0cFZlcnNpb24nKSkge1xuICAgIGNvbnRlbnRUeXBlID0gdmFsdWUuaGVhZGVyc1snY29udGVudC10eXBlJ107XG4gIH1cblxuICAvLyBvciBndWVzcyBpdCBmcm9tIHRoZSBmaWxlcGF0aCBvciBmaWxlbmFtZVxuICBpZiAoIWNvbnRlbnRUeXBlICYmIChvcHRpb25zLmZpbGVwYXRoIHx8IG9wdGlvbnMuZmlsZW5hbWUpKSB7XG4gICAgY29udGVudFR5cGUgPSBtaW1lLmxvb2t1cChvcHRpb25zLmZpbGVwYXRoIHx8IG9wdGlvbnMuZmlsZW5hbWUpO1xuICB9XG5cbiAgLy8gZmFsbGJhY2sgdG8gdGhlIGRlZmF1bHQgY29udGVudCB0eXBlIGlmIGB2YWx1ZWAgaXMgbm90IHNpbXBsZSB2YWx1ZVxuICBpZiAoIWNvbnRlbnRUeXBlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jykge1xuICAgIGNvbnRlbnRUeXBlID0gRm9ybURhdGEuREVGQVVMVF9DT05URU5UX1RZUEU7XG4gIH1cblxuICByZXR1cm4gY29udGVudFR5cGU7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuX211bHRpUGFydEZvb3RlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZnVuY3Rpb24obmV4dCkge1xuICAgIHZhciBmb290ZXIgPSBGb3JtRGF0YS5MSU5FX0JSRUFLO1xuXG4gICAgdmFyIGxhc3RQYXJ0ID0gKHRoaXMuX3N0cmVhbXMubGVuZ3RoID09PSAwKTtcbiAgICBpZiAobGFzdFBhcnQpIHtcbiAgICAgIGZvb3RlciArPSB0aGlzLl9sYXN0Qm91bmRhcnkoKTtcbiAgICB9XG5cbiAgICBuZXh0KGZvb3Rlcik7XG4gIH0uYmluZCh0aGlzKTtcbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5fbGFzdEJvdW5kYXJ5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnLS0nICsgdGhpcy5nZXRCb3VuZGFyeSgpICsgJy0tJyArIEZvcm1EYXRhLkxJTkVfQlJFQUs7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuZ2V0SGVhZGVycyA9IGZ1bmN0aW9uKHVzZXJIZWFkZXJzKSB7XG4gIHZhciBoZWFkZXI7XG4gIHZhciBmb3JtSGVhZGVycyA9IHtcbiAgICAnY29udGVudC10eXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGE7IGJvdW5kYXJ5PScgKyB0aGlzLmdldEJvdW5kYXJ5KClcbiAgfTtcblxuICBmb3IgKGhlYWRlciBpbiB1c2VySGVhZGVycykge1xuICAgIGlmICh1c2VySGVhZGVycy5oYXNPd25Qcm9wZXJ0eShoZWFkZXIpKSB7XG4gICAgICBmb3JtSGVhZGVyc1toZWFkZXIudG9Mb3dlckNhc2UoKV0gPSB1c2VySGVhZGVyc1toZWFkZXJdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmb3JtSGVhZGVycztcbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5zZXRCb3VuZGFyeSA9IGZ1bmN0aW9uKGJvdW5kYXJ5KSB7XG4gIHRoaXMuX2JvdW5kYXJ5ID0gYm91bmRhcnk7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuZ2V0Qm91bmRhcnkgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLl9ib3VuZGFyeSkge1xuICAgIHRoaXMuX2dlbmVyYXRlQm91bmRhcnkoKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9ib3VuZGFyeTtcbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5nZXRCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGRhdGFCdWZmZXIgPSBuZXcgQnVmZmVyLmFsbG9jKCAwICk7XG4gIHZhciBib3VuZGFyeSA9IHRoaXMuZ2V0Qm91bmRhcnkoKTtcblxuICAvLyBDcmVhdGUgdGhlIGZvcm0gY29udGVudC4gQWRkIExpbmUgYnJlYWtzIHRvIHRoZSBlbmQgb2YgZGF0YS5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX3N0cmVhbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX3N0cmVhbXNbaV0gIT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgLy8gQWRkIGNvbnRlbnQgdG8gdGhlIGJ1ZmZlci5cbiAgICAgIGlmKEJ1ZmZlci5pc0J1ZmZlcih0aGlzLl9zdHJlYW1zW2ldKSkge1xuICAgICAgICBkYXRhQnVmZmVyID0gQnVmZmVyLmNvbmNhdCggW2RhdGFCdWZmZXIsIHRoaXMuX3N0cmVhbXNbaV1dKTtcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgZGF0YUJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoIFtkYXRhQnVmZmVyLCBCdWZmZXIuZnJvbSh0aGlzLl9zdHJlYW1zW2ldKV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYnJlYWsgYWZ0ZXIgY29udGVudC5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fc3RyZWFtc1tpXSAhPT0gJ3N0cmluZycgfHwgdGhpcy5fc3RyZWFtc1tpXS5zdWJzdHJpbmcoIDIsIGJvdW5kYXJ5Lmxlbmd0aCArIDIgKSAhPT0gYm91bmRhcnkpIHtcbiAgICAgICAgZGF0YUJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoIFtkYXRhQnVmZmVyLCBCdWZmZXIuZnJvbShGb3JtRGF0YS5MSU5FX0JSRUFLKV0gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBBZGQgdGhlIGZvb3RlciBhbmQgcmV0dXJuIHRoZSBCdWZmZXIgb2JqZWN0LlxuICByZXR1cm4gQnVmZmVyLmNvbmNhdCggW2RhdGFCdWZmZXIsIEJ1ZmZlci5mcm9tKHRoaXMuX2xhc3RCb3VuZGFyeSgpKV0gKTtcbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5fZ2VuZXJhdGVCb3VuZGFyeSA9IGZ1bmN0aW9uKCkge1xuICAvLyBUaGlzIGdlbmVyYXRlcyBhIDUwIGNoYXJhY3RlciBib3VuZGFyeSBzaW1pbGFyIHRvIHRob3NlIHVzZWQgYnkgRmlyZWZveC5cbiAgLy8gVGhleSBhcmUgb3B0aW1pemVkIGZvciBib3llci1tb29yZSBwYXJzaW5nLlxuICB2YXIgYm91bmRhcnkgPSAnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDI0OyBpKyspIHtcbiAgICBib3VuZGFyeSArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkudG9TdHJpbmcoMTYpO1xuICB9XG5cbiAgdGhpcy5fYm91bmRhcnkgPSBib3VuZGFyeTtcbn07XG5cbi8vIE5vdGU6IGdldExlbmd0aFN5bmMgRE9FU04nVCBjYWxjdWxhdGUgc3RyZWFtcyBsZW5ndGhcbi8vIEFzIHdvcmthcm91bmQgb25lIGNhbiBjYWxjdWxhdGUgZmlsZSBzaXplIG1hbnVhbGx5XG4vLyBhbmQgYWRkIGl0IGFzIGtub3duTGVuZ3RoIG9wdGlvblxuRm9ybURhdGEucHJvdG90eXBlLmdldExlbmd0aFN5bmMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGtub3duTGVuZ3RoID0gdGhpcy5fb3ZlcmhlYWRMZW5ndGggKyB0aGlzLl92YWx1ZUxlbmd0aDtcblxuICAvLyBEb24ndCBnZXQgY29uZnVzZWQsIHRoZXJlIGFyZSAzIFwiaW50ZXJuYWxcIiBzdHJlYW1zIGZvciBlYWNoIGtleXZhbCBwYWlyXG4gIC8vIHNvIGl0IGJhc2ljYWxseSBjaGVja3MgaWYgdGhlcmUgaXMgYW55IHZhbHVlIGFkZGVkIHRvIHRoZSBmb3JtXG4gIGlmICh0aGlzLl9zdHJlYW1zLmxlbmd0aCkge1xuICAgIGtub3duTGVuZ3RoICs9IHRoaXMuX2xhc3RCb3VuZGFyeSgpLmxlbmd0aDtcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtLWRhdGEvZm9ybS1kYXRhL2lzc3Vlcy80MFxuICBpZiAoIXRoaXMuaGFzS25vd25MZW5ndGgoKSkge1xuICAgIC8vIFNvbWUgYXN5bmMgbGVuZ3RoIHJldHJpZXZlcnMgYXJlIHByZXNlbnRcbiAgICAvLyB0aGVyZWZvcmUgc3luY2hyb25vdXMgbGVuZ3RoIGNhbGN1bGF0aW9uIGlzIGZhbHNlLlxuICAgIC8vIFBsZWFzZSB1c2UgZ2V0TGVuZ3RoKGNhbGxiYWNrKSB0byBnZXQgcHJvcGVyIGxlbmd0aFxuICAgIHRoaXMuX2Vycm9yKG5ldyBFcnJvcignQ2Fubm90IGNhbGN1bGF0ZSBwcm9wZXIgbGVuZ3RoIGluIHN5bmNocm9ub3VzIHdheS4nKSk7XG4gIH1cblxuICByZXR1cm4ga25vd25MZW5ndGg7XG59O1xuXG4vLyBQdWJsaWMgQVBJIHRvIGNoZWNrIGlmIGxlbmd0aCBvZiBhZGRlZCB2YWx1ZXMgaXMga25vd25cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtLWRhdGEvZm9ybS1kYXRhL2lzc3Vlcy8xOTZcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtLWRhdGEvZm9ybS1kYXRhL2lzc3Vlcy8yNjJcbkZvcm1EYXRhLnByb3RvdHlwZS5oYXNLbm93bkxlbmd0aCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGFzS25vd25MZW5ndGggPSB0cnVlO1xuXG4gIGlmICh0aGlzLl92YWx1ZXNUb01lYXN1cmUubGVuZ3RoKSB7XG4gICAgaGFzS25vd25MZW5ndGggPSBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBoYXNLbm93bkxlbmd0aDtcbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5nZXRMZW5ndGggPSBmdW5jdGlvbihjYikge1xuICB2YXIga25vd25MZW5ndGggPSB0aGlzLl9vdmVyaGVhZExlbmd0aCArIHRoaXMuX3ZhbHVlTGVuZ3RoO1xuXG4gIGlmICh0aGlzLl9zdHJlYW1zLmxlbmd0aCkge1xuICAgIGtub3duTGVuZ3RoICs9IHRoaXMuX2xhc3RCb3VuZGFyeSgpLmxlbmd0aDtcbiAgfVxuXG4gIGlmICghdGhpcy5fdmFsdWVzVG9NZWFzdXJlLmxlbmd0aCkge1xuICAgIHByb2Nlc3MubmV4dFRpY2soY2IuYmluZCh0aGlzLCBudWxsLCBrbm93bkxlbmd0aCkpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFzeW5ja2l0LnBhcmFsbGVsKHRoaXMuX3ZhbHVlc1RvTWVhc3VyZSwgdGhpcy5fbGVuZ3RoUmV0cmlldmVyLCBmdW5jdGlvbihlcnIsIHZhbHVlcykge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGNiKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24obGVuZ3RoKSB7XG4gICAgICBrbm93bkxlbmd0aCArPSBsZW5ndGg7XG4gICAgfSk7XG5cbiAgICBjYihudWxsLCBrbm93bkxlbmd0aCk7XG4gIH0pO1xufTtcblxuRm9ybURhdGEucHJvdG90eXBlLnN1Ym1pdCA9IGZ1bmN0aW9uKHBhcmFtcywgY2IpIHtcbiAgdmFyIHJlcXVlc3RcbiAgICAsIG9wdGlvbnNcbiAgICAsIGRlZmF1bHRzID0ge21ldGhvZDogJ3Bvc3QnfVxuICAgIDtcblxuICAvLyBwYXJzZSBwcm92aWRlZCB1cmwgaWYgaXQncyBzdHJpbmdcbiAgLy8gb3IgdHJlYXQgaXQgYXMgb3B0aW9ucyBvYmplY3RcbiAgaWYgKHR5cGVvZiBwYXJhbXMgPT0gJ3N0cmluZycpIHtcblxuICAgIHBhcmFtcyA9IHBhcnNlVXJsKHBhcmFtcyk7XG4gICAgb3B0aW9ucyA9IHBvcHVsYXRlKHtcbiAgICAgIHBvcnQ6IHBhcmFtcy5wb3J0LFxuICAgICAgcGF0aDogcGFyYW1zLnBhdGhuYW1lLFxuICAgICAgaG9zdDogcGFyYW1zLmhvc3RuYW1lLFxuICAgICAgcHJvdG9jb2w6IHBhcmFtcy5wcm90b2NvbFxuICAgIH0sIGRlZmF1bHRzKTtcblxuICAvLyB1c2UgY3VzdG9tIHBhcmFtc1xuICB9IGVsc2Uge1xuXG4gICAgb3B0aW9ucyA9IHBvcHVsYXRlKHBhcmFtcywgZGVmYXVsdHMpO1xuICAgIC8vIGlmIG5vIHBvcnQgcHJvdmlkZWQgdXNlIGRlZmF1bHQgb25lXG4gICAgaWYgKCFvcHRpb25zLnBvcnQpIHtcbiAgICAgIG9wdGlvbnMucG9ydCA9IG9wdGlvbnMucHJvdG9jb2wgPT0gJ2h0dHBzOicgPyA0NDMgOiA4MDtcbiAgICB9XG4gIH1cblxuICAvLyBwdXQgdGhhdCBnb29kIGNvZGUgaW4gZ2V0SGVhZGVycyB0byBzb21lIHVzZVxuICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLmdldEhlYWRlcnMocGFyYW1zLmhlYWRlcnMpO1xuXG4gIC8vIGh0dHBzIGlmIHNwZWNpZmllZCwgZmFsbGJhY2sgdG8gaHR0cCBpbiBhbnkgb3RoZXIgY2FzZVxuICBpZiAob3B0aW9ucy5wcm90b2NvbCA9PSAnaHR0cHM6Jykge1xuICAgIHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHJlcXVlc3QgPSBodHRwLnJlcXVlc3Qob3B0aW9ucyk7XG4gIH1cblxuICAvLyBnZXQgY29udGVudCBsZW5ndGggYW5kIGZpcmUgYXdheVxuICB0aGlzLmdldExlbmd0aChmdW5jdGlvbihlcnIsIGxlbmd0aCkge1xuICAgIGlmIChlcnIgJiYgZXJyICE9PSAnVW5rbm93biBzdHJlYW0nKSB7XG4gICAgICB0aGlzLl9lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGFkZCBjb250ZW50IGxlbmd0aFxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgIHJlcXVlc3Quc2V0SGVhZGVyKCdDb250ZW50LUxlbmd0aCcsIGxlbmd0aCk7XG4gICAgfVxuXG4gICAgdGhpcy5waXBlKHJlcXVlc3QpO1xuICAgIGlmIChjYikge1xuICAgICAgdmFyIG9uUmVzcG9uc2U7XG5cbiAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uY2UpIHtcbiAgICAgICAgcmVxdWVzdC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBjYWxsYmFjayk7XG4gICAgICAgIHJlcXVlc3QucmVtb3ZlTGlzdGVuZXIoJ3Jlc3BvbnNlJywgb25SZXNwb25zZSk7XG5cbiAgICAgICAgcmV0dXJuIGNiLmNhbGwodGhpcywgZXJyb3IsIHJlc3BvbmNlKTtcbiAgICAgIH07XG5cbiAgICAgIG9uUmVzcG9uc2UgPSBjYWxsYmFjay5iaW5kKHRoaXMsIG51bGwpO1xuXG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIGNhbGxiYWNrKTtcbiAgICAgIHJlcXVlc3Qub24oJ3Jlc3BvbnNlJywgb25SZXNwb25zZSk7XG4gICAgfVxuICB9LmJpbmQodGhpcykpO1xuXG4gIHJldHVybiByZXF1ZXN0O1xufTtcblxuRm9ybURhdGEucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uKGVycikge1xuICBpZiAoIXRoaXMuZXJyb3IpIHtcbiAgICB0aGlzLmVycm9yID0gZXJyO1xuICAgIHRoaXMucGF1c2UoKTtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxufTtcblxuRm9ybURhdGEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJ1tvYmplY3QgRm9ybURhdGFdJztcbn07XG4iLCIvLyBwb3B1bGF0ZXMgbWlzc2luZyB2YWx1ZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZHN0LCBzcmMpIHtcblxuICBPYmplY3Qua2V5cyhzcmMpLmZvckVhY2goZnVuY3Rpb24ocHJvcClcbiAge1xuICAgIGRzdFtwcm9wXSA9IGRzdFtwcm9wXSB8fCBzcmNbcHJvcF07XG4gIH0pO1xuXG4gIHJldHVybiBkc3Q7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL09wdGlvbnMnO1xuaW1wb3J0IHsgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvUmVxdWVzdE9wdGlvbnMnO1xuXG5pbXBvcnQgRG9tYWluQ2xpZW50IGZyb20gJy4vZG9tYWlucyc7XG5pbXBvcnQgRXZlbnRDbGllbnQgZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IFN0YXRzQ2xpZW50IGZyb20gJy4vc3RhdHMnO1xuaW1wb3J0IFN1cHByZXNzaW9uQ2xpZW50IGZyb20gJy4vc3VwcHJlc3Npb25zJztcbmltcG9ydCBXZWJob29rQ2xpZW50IGZyb20gJy4vd2ViaG9va3MnO1xuaW1wb3J0IE1lc3NhZ2VzQ2xpZW50IGZyb20gJy4vbWVzc2FnZXMnO1xuaW1wb3J0IFJvdXRlc0NsaWVudCBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgVmFsaWRhdGVDbGllbnQgZnJvbSAnLi92YWxpZGF0ZSc7XG5pbXBvcnQgSXBzQ2xpZW50IGZyb20gJy4vaXBzJztcbmltcG9ydCBJcFBvb2xzQ2xpZW50IGZyb20gJy4vaXAtcG9vbHMnO1xuaW1wb3J0IExpc3RzQ2xpZW50IGZyb20gJy4vbGlzdHMnO1xuaW1wb3J0IE1haWxMaXN0c01lbWJlcnMgZnJvbSAnLi9tYWlsTGlzdE1lbWJlcnMnO1xuaW1wb3J0IHsgSW5wdXRGb3JtRGF0YSB9IGZyb20gJy4vaW50ZXJmYWNlcy9JRm9ybURhdGEnO1xuaW1wb3J0IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGZyb20gJy4vZG9tYWluc0NyZWRlbnRpYWxzJztcbmltcG9ydCBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgZnJvbSAnLi9tdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9kb21haW5zVGFncyc7XG5pbXBvcnQgeyBJTWFpbGd1bkNsaWVudCB9IGZyb20gJy4vaW50ZXJmYWNlcy9JTWFpbGd1bkNsaWVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWVudCBpbXBsZW1lbnRzIElNYWlsZ3VuQ2xpZW50IHtcbiAgcHJpdmF0ZSByZXF1ZXN0O1xuXG4gIHB1YmxpYyBkb21haW5zO1xuICBwdWJsaWMgd2ViaG9va3M7XG4gIHB1YmxpYyBldmVudHM7XG4gIHB1YmxpYyBzdGF0cztcbiAgcHVibGljIHN1cHByZXNzaW9ucztcbiAgcHVibGljIG1lc3NhZ2VzO1xuICBwdWJsaWMgcm91dGVzO1xuICBwdWJsaWMgdmFsaWRhdGU7XG4gIHB1YmxpYyBpcHM7XG4gIHB1YmxpYyBpcF9wb29scztcbiAgcHVibGljIGxpc3RzO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgY29uc3QgY29uZmlnOiBSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub3B0aW9ucyB9IGFzIFJlcXVlc3RPcHRpb25zO1xuXG4gICAgaWYgKCFjb25maWcudXJsKSB7XG4gICAgICBjb25maWcudXJsID0gJ2h0dHBzOi8vYXBpLm1haWxndW4ubmV0JztcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy51c2VybmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJ1c2VybmFtZVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcua2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcImtleVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHRoaXMucmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGNvbmZpZywgZm9ybURhdGEpO1xuICAgIGNvbnN0IG1haWxMaXN0c01lbWJlcnMgPSBuZXcgTWFpbExpc3RzTWVtYmVycyh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50ID0gbmV3IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluVGVtcGxhdGVzQ2xpZW50ID0gbmV3IERvbWFpblRlbXBsYXRlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpblRhZ3NDbGllbnQgPSBuZXcgRG9tYWluVGFnc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCA9IG5ldyBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcblxuICAgIHRoaXMuZG9tYWlucyA9IG5ldyBEb21haW5DbGllbnQoXG4gICAgICB0aGlzLnJlcXVlc3QsXG4gICAgICBkb21haW5DcmVkZW50aWFsc0NsaWVudCxcbiAgICAgIGRvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgICAgIGRvbWFpblRhZ3NDbGllbnRcbiAgICApO1xuICAgIHRoaXMud2ViaG9va3MgPSBuZXcgV2ViaG9va0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50Q2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0c0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuc3VwcHJlc3Npb25zID0gbmV3IFN1cHByZXNzaW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5tZXNzYWdlcyA9IG5ldyBNZXNzYWdlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMucm91dGVzID0gbmV3IFJvdXRlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuaXBzID0gbmV3IElwc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuaXBfcG9vbHMgPSBuZXcgSXBQb29sc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMubGlzdHMgPSBuZXcgTGlzdHNDbGllbnQodGhpcy5yZXF1ZXN0LCBtYWlsTGlzdHNNZW1iZXJzKTtcbiAgICB0aGlzLnZhbGlkYXRlID0gbmV3IFZhbGlkYXRlQ2xpZW50KHRoaXMucmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgUGFnZXNMaXN0LFxuICBQYWdlc0xpc3RBY2N1bXVsYXRvcixcbiAgUGFyc2VkUGFnZSxcbiAgUGFyc2VkUGFnZXNMaXN0LFxuICBSZXNwb25zZVdpdGhQYWdpbmdcbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgTmF2aWdhdGlvblRocnVQYWdlcyA8VD4ge1xuICBwcm90ZWN0ZWQgcGFyc2VQYWdlKGlkOiBzdHJpbmcsIHBhZ2VVcmw6IHN0cmluZywgdXJsU2VwYXJhdG9yID0gJz8nLCBpdGVyYXRvck5hbWUgPSAnYWRkcmVzcycpOiBQYXJzZWRQYWdlIHtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKHBhZ2VVcmwpO1xuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBwYXJzZWRVcmw7XG4gICAgY29uc3QgcGFnZVZhbHVlID0gcGFnZVVybCAmJiB0eXBlb2YgcGFnZVVybCA9PT0gJ3N0cmluZycgPyBwYWdlVXJsLnNwbGl0KHVybFNlcGFyYXRvcikucG9wKCkgfHwgJycgOiAnJztcbiAgICByZXR1cm4ge1xuICAgICAgaWQsXG4gICAgICBwYWdlOiB1cmxTZXBhcmF0b3IgPT09ICc/JyA/IGA/JHtwYWdlVmFsdWV9YCA6IHBhZ2VWYWx1ZSxcbiAgICAgIGl0ZXJhdG9yUG9zaXRpb246IHNlYXJjaFBhcmFtcy5oYXMoaXRlcmF0b3JOYW1lKSA/IHNlYXJjaFBhcmFtcy5nZXQoaXRlcmF0b3JOYW1lKSA6IHVuZGVmaW5lZCxcbiAgICAgIHVybDogcGFnZVVybFxuICAgIH0gYXMgUGFyc2VkUGFnZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZVBhZ2VMaW5rcyhcbiAgICByZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nLFxuICAgIHVybFNlcGFyYXRvcj86IHN0cmluZyxcbiAgICBpdGVyYXRvck5hbWU/OiBzdHJpbmdcbiAgKTogUGFyc2VkUGFnZXNMaXN0IHtcbiAgICBjb25zdCBwYWdlcyA9IE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlLmJvZHkucGFnaW5nIGFzIFBhZ2VzTGlzdCk7XG4gICAgcmV0dXJuIHBhZ2VzLnJlZHVjZShcbiAgICAgIChhY2M6IFBhZ2VzTGlzdEFjY3VtdWxhdG9yLCBwYWlyOiBbcGFnZVVybDogc3RyaW5nLCBpZDogc3RyaW5nXSkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IHBhaXJbMF07XG4gICAgICAgIGNvbnN0IHBhZ2VVcmwgPSBwYWlyWzFdO1xuICAgICAgICBhY2NbaWRdID0gdGhpcy5wYXJzZVBhZ2UoaWQsIHBhZ2VVcmwsIHVybFNlcGFyYXRvciwgaXRlcmF0b3JOYW1lKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9XG4gICAgKSBhcyB1bmtub3duIGFzIFBhcnNlZFBhZ2VzTGlzdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBwYXJzZUxpc3QocmVzcG9uc2U6IFJlc3BvbnNlV2l0aFBhZ2luZyk6IFQ7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7XG4gIERvbWFpblJlc3BvbnNlRGF0YSxcbiAgRGVzdHJveWVkRG9tYWluUmVzcG9uc2UsXG4gIERvbWFpbnNRdWVyeSxcbiAgRG9tYWluSW5mbyxcbiAgRG9tYWluTGlzdFJlc3BvbnNlRGF0YSxcbiAgRG9tYWluU2hvcnREYXRhLFxuICBETlNSZWNvcmQsXG4gIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlLFxuICBDb25uZWN0aW9uU2V0dGluZ3MsXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MsXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMsXG4gIERLSU1BdXRob3JpdHlJbmZvLFxuICBVcGRhdGVkREtJTUF1dGhvcml0eSxcbiAgVXBkYXRlZERLSU1BdXRob3JpdHlSZXNwb25zZSxcbiAgREtJTVNlbGVjdG9ySW5mbyxcbiAgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlLFxuICBXZWJQcmVmaXhJbmZvLFxuICBVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2UsXG4gIFJlcGxhY2VtZW50Rm9yUG9vbCxcbiAgTWVzc2FnZVJlc3BvbnNlLFxufSBmcm9tICcuL2ludGVyZmFjZXMvRG9tYWlucyc7XG5cbmltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vZXJyb3InO1xuaW1wb3J0IEFQSUVycm9yT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvQVBJRXJyb3JPcHRpb25zJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7XG4gIERvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIERvbWFpblRyYWNraW5nRGF0YSxcbiAgT3BlblRyYWNraW5nSW5mbyxcbiAgQ2xpY2tUcmFja2luZ0luZm8sXG4gIFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvLFxuICBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlLFxuICBVcGRhdGVkT3BlblRyYWNraW5nXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5UcmFja2luZyc7XG5pbXBvcnQgeyBJRG9tYWluQ3JlZGVudGlhbHMgfSBmcm9tICcuL2ludGVyZmFjZXMvRG9tYWluQ3JlZGVudGlhbHMnO1xuaW1wb3J0IHsgSURvbWFpblRlbXBsYXRlc0NsaWVudCB9IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5UZW1wbGF0ZXMnO1xuaW1wb3J0IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGZyb20gJy4vZG9tYWluc0NyZWRlbnRpYWxzJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9kb21haW5zVGVtcGxhdGVzJztcbmltcG9ydCB7IElEb21haW5UYWdzQ2xpZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRhZ3MnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9kb21haW5zVGFncyc7XG5cbmV4cG9ydCBjbGFzcyBEb21haW4ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgc3RhdGU6IHN0cmluZztcbiAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gIHNwYW1fYWN0aW9uOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICBzbXRwX2xvZ2luOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBEb21haW5TaG9ydERhdGEsIHJlY2VpdmluZz86IEROU1JlY29yZFtdIHwgbnVsbCwgc2VuZGluZz86IEROU1JlY29yZFtdIHwgbnVsbCkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLnJlcXVpcmVfdGxzID0gZGF0YS5yZXF1aXJlX3RscztcbiAgICB0aGlzLnNraXBfdmVyaWZpY2F0aW9uID0gZGF0YS5za2lwX3ZlcmlmaWNhdGlvbjtcbiAgICB0aGlzLnN0YXRlID0gZGF0YS5zdGF0ZTtcbiAgICB0aGlzLndpbGRjYXJkID0gZGF0YS53aWxkY2FyZDtcbiAgICB0aGlzLnNwYW1fYWN0aW9uID0gZGF0YS5zcGFtX2FjdGlvbjtcbiAgICB0aGlzLmNyZWF0ZWRfYXQgPSBkYXRhLmNyZWF0ZWRfYXQ7XG4gICAgdGhpcy5zbXRwX3Bhc3N3b3JkID0gZGF0YS5zbXRwX3Bhc3N3b3JkO1xuICAgIHRoaXMuc210cF9sb2dpbiA9IGRhdGEuc210cF9sb2dpbjtcbiAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGU7XG5cbiAgICB0aGlzLnJlY2VpdmluZ19kbnNfcmVjb3JkcyA9IHJlY2VpdmluZyB8fCBudWxsO1xuICAgIHRoaXMuc2VuZGluZ19kbnNfcmVjb3JkcyA9IHNlbmRpbmcgfHwgbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5DbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgZG9tYWluQ3JlZGVudGlhbHM6IElEb21haW5DcmVkZW50aWFscztcbiAgcHVibGljIGRvbWFpblRlbXBsYXRlczogSURvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgcHVibGljIGRvbWFpblRhZ3M6IElEb21haW5UYWdzQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ6IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LFxuICAgIGRvbWFpblRlbXBsYXRlc0NsaWVudDogRG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICAgIGRvbWFpblRhZ3NDbGllbnQ6IERvbWFpblRhZ3NDbGllbnRcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmRvbWFpbkNyZWRlbnRpYWxzID0gZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ7XG4gICAgdGhpcy5kb21haW5UZW1wbGF0ZXMgPSBkb21haW5UZW1wbGF0ZXNDbGllbnQ7XG4gICAgdGhpcy5kb21haW5UYWdzID0gZG9tYWluVGFnc0NsaWVudDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlTWVzc2FnZShyZXNwb25zZTogRGVzdHJveWVkRG9tYWluUmVzcG9uc2UpIDogTWVzc2FnZVJlc3BvbnNlIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluTGlzdChyZXNwb25zZTogRG9tYWluTGlzdFJlc3BvbnNlRGF0YSk6IERvbWFpbltdIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBuZXcgRG9tYWluKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW4ocmVzcG9uc2U6IERvbWFpblJlc3BvbnNlRGF0YSk6IERvbWFpbiB7XG4gICAgcmV0dXJuIG5ldyBEb21haW4oXG4gICAgICByZXNwb25zZS5ib2R5LmRvbWFpbixcbiAgICAgIHJlc3BvbnNlLmJvZHkucmVjZWl2aW5nX2Ruc19yZWNvcmRzLFxuICAgICAgcmVzcG9uc2UuYm9keS5zZW5kaW5nX2Ruc19yZWNvcmRzXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyhyZXNwb25zZTogRG9tYWluVHJhY2tpbmdSZXNwb25zZSkgOiBEb21haW5UcmFja2luZ0RhdGEge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5LnRyYWNraW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1VwZGF0ZShyZXNwb25zZTogVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSkgOlVwZGF0ZWRPcGVuVHJhY2tpbmcge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgbGlzdChxdWVyeT86IERvbWFpbnNRdWVyeSk6IFByb21pc2U8RG9tYWluW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2RvbWFpbnMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW5MaXN0KHJlcyBhcyBEb21haW5MaXN0UmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcpIDogUHJvbWlzZTxEb21haW4+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL2RvbWFpbnMvJHtkb21haW59YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IERvbWFpbkluZm8pIDogUHJvbWlzZTxEb21haW4+IHtcbiAgICBjb25zdCBwb3N0T2JqID0geyAuLi5kYXRhIH07XG4gICAgaWYgKCdmb3JjZV9ka2ltX2F1dGhvcml0eScgaW4gcG9zdE9iaiAmJiB0eXBlb2YgcG9zdE9iai5mb3JjZV9ka2ltX2F1dGhvcml0eSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBwb3N0T2JqLmZvcmNlX2RraW1fYXV0aG9yaXR5ID0gcG9zdE9iai50b1N0cmluZygpID09PSAndHJ1ZScgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YzL2RvbWFpbnMnLCBwb3N0T2JqKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICB2ZXJpZnkoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vdmVyaWZ5YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZyk6IFByb21pc2U8TWVzc2FnZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92My9kb21haW5zLyR7ZG9tYWlufWApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZShyZXMgYXMgRGVzdHJveWVkRG9tYWluUmVzcG9uc2UpKTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPENvbm5lY3Rpb25TZXR0aW5ncz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vY29ubmVjdGlvbmApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSlcbiAgICAgIC50aGVuKChyZXM6Q29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UpID0+IHJlcy5ib2R5LmNvbm5lY3Rpb24gYXMgQ29ubmVjdGlvblNldHRpbmdzKTtcbiAgfVxuXG4gIHVwZGF0ZUNvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcsIGRhdGE6IENvbm5lY3Rpb25TZXR0aW5ncyk6IFByb21pc2U8VXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vY29ubmVjdGlvbmAsIGRhdGEpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzKVxuICAgICAgLnRoZW4oKHJlczpVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzKSA9PiByZXMuYm9keSBhcyBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzKTtcbiAgfVxuXG4gIC8vIFRyYWNraW5nXG5cbiAgZ2V0VHJhY2tpbmcoZG9tYWluOiBzdHJpbmcpIDogUHJvbWlzZTxEb21haW5UcmFja2luZ0RhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJykpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVRyYWNraW5nU2V0dGluZ3MpO1xuICB9XG5cbiAgdXBkYXRlVHJhY2tpbmcoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IE9wZW5UcmFja2luZ0luZm8gfCBDbGlja1RyYWNraW5nSW5mbyB8IFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvXG4gICk6IFByb21pc2U8VXBkYXRlZE9wZW5UcmFja2luZz4ge1xuICAgIGlmICh0eXBlb2YgZGF0YT8uYWN0aXZlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7IHN0YXR1czogNDAwLCBzdGF0dXNUZXh0OiAnUmVjZWl2ZWQgYm9vbGVhbiB2YWx1ZSBmb3IgYWN0aXZlIHByb3BlcnR5JywgYm9keTogeyBtZXNzYWdlOiAnUHJvcGVydHkgXCJhY3RpdmVcIiBtdXN0IGNvbnRhaW4gc3RyaW5nIHZhbHVlLicgfSB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnLCB0eXBlKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VUcmFja2luZ1VwZGF0ZShyZXMgYXMgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSkpO1xuICB9XG5cbiAgLy8gSVBzXG5cbiAgZ2V0SXBzKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJykpXG4gICAgICAudGhlbigocmVzcG9uc2U6IEFQSVJlc3BvbnNlKSA9PiByZXNwb25zZT8uYm9keT8uaXRlbXMpO1xuICB9XG5cbiAgYXNzaWduSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgaXAgfSk7XG4gIH1cblxuICBkZWxldGVJcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsIGlwKSk7XG4gIH1cblxuICBsaW5rSXBQb29sKGRvbWFpbjogc3RyaW5nLCBwb29sX2lkOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgcG9vbF9pZCB9KTtcbiAgfVxuXG4gIHVubGlua0lwUG9sbChkb21haW46IHN0cmluZywgcmVwbGFjZW1lbnQ6IFJlcGxhY2VtZW50Rm9yUG9vbCk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gJyc7XG4gICAgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQgJiYgcmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcihcbiAgICAgICAge1xuICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgIHN0YXR1c1RleHQ6ICdUb28gbXVjaCBkYXRhIGZvciByZXBsYWNlbWVudCcsXG4gICAgICAgICAgYm9keTogeyBtZXNzYWdlOiAnUGxlYXNlIHNwZWNpZnkgZWl0aGVyIHBvb2xfaWQgb3IgaXAgKG5vdCBib3RoKScgfVxuICAgICAgICB9IGFzIEFQSUVycm9yT3B0aW9uc1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/cG9vbF9pZD0ke3JlcGxhY2VtZW50LnBvb2xfaWR9YDtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICBzZWFyY2hQYXJhbXMgPSBgP2lwPSR7cmVwbGFjZW1lbnQuaXB9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCAnaXBfcG9vbCcsIHNlYXJjaFBhcmFtcykpO1xuICB9XG5cbiAgdXBkYXRlREtJTUF1dGhvcml0eShkb21haW46IHN0cmluZywgZGF0YTogREtJTUF1dGhvcml0eUluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNQXV0aG9yaXR5PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX2F1dGhvcml0eWAsIHt9LCB7IHF1ZXJ5OiBgc2VsZj0ke2RhdGEuc2VsZn1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlcyA6IFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5KTtcbiAgfVxuXG4gIHVwZGF0ZURLSU1TZWxlY3Rvcihkb21haW46IHN0cmluZywgZGF0YTogREtJTVNlbGVjdG9ySW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX3NlbGVjdG9yYCwge30sIHsgcXVlcnk6IGBka2ltX3NlbGVjdG9yPSR7ZGF0YS5ka2ltU2VsZWN0b3J9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZVdlYlByZWZpeChkb21haW46IHN0cmluZywgZGF0YTogV2ViUHJlZml4SW5mbyk6IFByb21pc2U8VXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS93ZWJfcHJlZml4YCwge30sIHsgcXVlcnk6IGB3ZWJfcHJlZml4PSR7ZGF0YS53ZWJQcmVmaXh9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UsXG4gIERlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlLFxuICBEb21haW5DcmVkZW50aWFscyxcbiAgRG9tYWluQ3JlZGVudGlhbHNMaXN0LFxuICBEb21haW5DcmVkZW50aWFsc1F1ZXJ5LFxuICBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSxcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQsXG4gIElEb21haW5DcmVkZW50aWFscyxcbiAgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5DcmVkZW50aWFscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGltcGxlbWVudHMgSURvbWFpbkNyZWRlbnRpYWxzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2RvbWFpbnMvJztcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KFxuICAgIHJlc3BvbnNlOiBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YVxuICApOiBEb21haW5DcmVkZW50aWFsc0xpc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHRvdGFsQ291bnQ6IHJlc3BvbnNlLmJvZHkudG90YWxfY291bnRcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6IENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURlbGV0ZWRSZXNwb25zZShcbiAgICByZXNwb25zZTpEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICBzcGVjOiByZXNwb25zZS5ib2R5LnNwZWNcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluQ3JlZGVudGlhbHNRdWVyeSk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL2NyZWRlbnRpYWxzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChyZXMgYXMgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpbkNyZWRlbnRpYWxzXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmcsXG4gICAgZGF0YTogVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzLyR7Y3JlZGVudGlhbHNMb2dpbn1gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRGVsZXRlZFJlc3BvbnNlKHJlcykpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJUmVzcG9uc2UgZnJvbSAnLi9pbnRlcmZhY2VzL0FwaVJlc3BvbnNlJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtLFxuICBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlLFxuICBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ3NJdGVtLFxuICBEb21haW5UYWdzSXRlbUluZm8sXG4gIERvbWFpblRhZ3NMaXN0LFxuICBEb21haW5UYWdzTWVzc2FnZVJlcyxcbiAgRG9tYWluVGFnc1F1ZXJ5LFxuICBEb21haW5UYWdzUmVzcG9uc2VEYXRhLFxuICBEb21haW5UYWdzU3RhdGlzdGljUXVlcnksXG4gIERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnU3RhdGlzdGljSXRlbSxcbiAgRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0LFxuICBJRG9tYWluVGFnc0NsaWVudCxcbiAgUmVzb2x1dGlvblxufSBmcm9tICcuL2ludGVyZmFjZXMvRG9tYWluVGFncyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZyBpbXBsZW1lbnRzIERvbWFpblRhZ3NJdGVtIHtcbiAgdGFnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICdmaXJzdC1zZWVuJzogRGF0ZTtcbiAgJ2xhc3Qtc2Vlbic6IERhdGU7XG5cbiAgY29uc3RydWN0b3IodGFnSW5mbzogRG9tYWluVGFnc0l0ZW1JbmZvKSB7XG4gICAgdGhpcy50YWcgPSB0YWdJbmZvLnRhZztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnSW5mby5kZXNjcmlwdGlvbjtcbiAgICB0aGlzWydmaXJzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydmaXJzdC1zZWVuJ10pO1xuICAgIHRoaXNbJ2xhc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snbGFzdC1zZWVuJ10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UYWdTdGF0aXN0aWMgaW1wbGVtZW50cyBEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQge1xuICB0YWc6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgc3RhcnQ6IERhdGU7XG4gIGVuZDogRGF0ZTtcbiAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgc3RhdHM6IERvbWFpblRhZ1N0YXRpc3RpY0l0ZW1bXTtcblxuICBjb25zdHJ1Y3Rvcih0YWdTdGF0aXN0aWNJbmZvOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2UpIHtcbiAgICB0aGlzLnRhZyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS50YWc7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXJ0KTtcbiAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5lbmQpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5yZXNvbHV0aW9uO1xuICAgIHRoaXMuc3RhdHMgPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0OiBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSkge1xuICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0LCB0aW1lOiBuZXcgRGF0ZShzdGF0LnRpbWUpIH07XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpblRhZ3NDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPERvbWFpblRhZ3NMaXN0PlxuICBpbXBsZW1lbnRzIElEb21haW5UYWdzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvJztcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IERvbWFpblRhZ3NSZXNwb25zZURhdGEsXG4gICk6IERvbWFpblRhZ3NMaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgRG9tYWluVGFnc0xpc3Q7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKCh0YWdJbmZvOiBEb21haW5UYWdzSXRlbUluZm8pID0+IG5ldyBEb21haW5UYWcodGFnSW5mbykpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3RhZycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUYWdTdGF0aXN0aWMoXG4gICAgcmVzcG9uc2U6IERvbWFpblRhZ1N0YXRBUElSZXNwb25zZVxuICApOiBEb21haW5UYWdTdGF0aXN0aWMge1xuICAgIHJldHVybiBuZXcgRG9tYWluVGFnU3RhdGlzdGljKHJlc3BvbnNlKTtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGFnc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5UYWdzTGlzdD4ge1xuICAgIGxldCB1cmw7XG4gICAgY29uc3QgcXVlcnlDb3B5ID0geyAuLi5xdWVyeSB9O1xuICAgIGlmIChxdWVyeUNvcHkgJiYgcXVlcnlDb3B5LnBhZ2UpIHtcbiAgICAgIHVybCA9IHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgcXVlcnlDb3B5LnBhZ2UpO1xuICAgICAgZGVsZXRlIHF1ZXJ5Q29weS5wYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSB1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmwsIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTGlzdChyZXMgYXMgRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSlcbiAgICAgICk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRhZyhyZXMuYm9keSlcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSwgZGVzY3JpcHRpb24pXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzXG4gICAgICApO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L3RhZ3MvJHt0YWd9YClcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiAoXG4gICAgICAgIHtcbiAgICAgICAgICBtZXNzYWdlOiByZXMuYm9keS5tZXNzYWdlLFxuICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1c1xuICAgICAgICB9IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzKSk7XG4gIH1cblxuICBzdGF0aXN0aWMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBxdWVyeTogRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5KVxuICAgIDogUHJvbWlzZTxEb21haW5UYWdTdGF0aXN0aWM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZVRhZ1N0YXRpc3RpYyhyZXMpXG4gICAgICApO1xuICB9XG5cbiAgY291bnRyaWVzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvY291bnRyaWVzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgcHJvdmlkZXJzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvcHJvdmlkZXJzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgZGV2aWNlcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9kZXZpY2VzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgRG9tYWluVGVtcGxhdGUsIERvbWFpblRlbXBsYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVzUXVlcnksXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YSxcbiAgR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgSURvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0LFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UsXG4gIE5vdGlmaWNhdGlvblJlc3VsdCxcbiAgU2hvcnRUZW1wbGF0ZVZlcnNpb24sXG4gIFRlbXBsYXRlUXVlcnksXG4gIFRlbXBsYXRlVmVyc2lvbixcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0XG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5UZW1wbGF0ZXMnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluVGVtcGxhdGVJdGVtIGltcGxlbWVudHMgRG9tYWluVGVtcGxhdGUge1xuICBuYW1lIDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbiA6IHN0cmluZztcbiAgY3JlYXRlZEF0IDogRGF0ZSB8ICcnO1xuICBjcmVhdGVkQnkgOiBzdHJpbmc7XG4gIGlkIDogc3RyaW5nO1xuICB2ZXJzaW9uPzogVGVtcGxhdGVWZXJzaW9uO1xuICB2ZXJzaW9ucz86IFNob3J0VGVtcGxhdGVWZXJzaW9uW107XG5cbiAgY29uc3RydWN0b3IoZG9tYWluVGVtcGxhdGVGcm9tQVBJOiBEb21haW5UZW1wbGF0ZSkge1xuICAgIHRoaXMubmFtZSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5uYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuZGVzY3JpcHRpb247XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0ID8gbmV3IERhdGUoZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRBdCkgOiAnJztcbiAgICB0aGlzLmNyZWF0ZWRCeSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQnk7XG4gICAgdGhpcy5pZCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5pZDtcblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbikge1xuICAgICAgdGhpcy52ZXJzaW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb247XG4gICAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24uY3JlYXRlZEF0KSB7XG4gICAgICAgIHRoaXMudmVyc2lvbi5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMgJiYgZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy52ZXJzaW9ucyA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5tYXAoKHZlcnNpb24pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyAuLi52ZXJzaW9uIH07XG4gICAgICAgIHJlc3VsdC5jcmVhdGVkQXQgPSBuZXcgRGF0ZSh2ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluVGVtcGxhdGVzQ2xpZW50IGltcGxlbWVudHMgSURvbWFpblRlbXBsYXRlc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNyZWF0aW9uUmVzcG9uc2UoZGF0YTogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSk6IERvbWFpblRlbXBsYXRlSXRlbSB7XG4gICAgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShcbiAgICBkYXRhOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZVxuICApOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge30gYXMgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkgJiYgZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGRhdGEuYm9keS50ZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTXV0YXRpb25SZXNwb25zZShcbiAgICBkYXRhOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2VcbiAgKTogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0ID0ge30gYXMgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKGRhdGE6IE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlKTogTm90aWZpY2F0aW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IE5vdGlmaWNhdGlvblJlc3VsdCA9IHt9IGFzIE5vdGlmaWNhdGlvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKFxuICAgIGRhdGE6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlXG4gICk6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7fSBhcyBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgcmVzdWx0LnRlbXBsYXRlVmVyc2lvbiA9IHsgdGFnOiBkYXRhLmJvZHkudGVtcGxhdGUudmVyc2lvbi50YWcgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VMaXN0KHJlc3BvbnNlOiBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UpOiBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgoZDogRG9tYWluVGVtcGxhdGUpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZCkpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHJlc3BvbnNlLmJvZHkucGFnaW5nO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMoXG4gICAgcmVzcG9uc2U6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2VcbiAgKTogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdDtcblxuICAgIGRhdGEudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlc3BvbnNlLmJvZHkudGVtcGxhdGUpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHJlc3BvbnNlLmJvZHkucGFnaW5nO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5KTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUxpc3QocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHF1ZXJ5PzogVGVtcGxhdGVRdWVyeSk6IFByb21pc2U8RG9tYWluVGVtcGxhdGVJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlcy5ib2R5LnRlbXBsYXRlKVxuICAgICAgKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZURhdGFcbiAgKTogUHJvbWlzZTxEb21haW5UZW1wbGF0ZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhXG4gICk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZyk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95QWxsKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxOb3RpZmljYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJykpXG4gICAgICAudGhlbigocmVzOiBOb3RpZmljYXRpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgY3JlYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIGRhdGEpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShyZXMpXG4gICAgICApO1xuICB9XG5cbiAgZ2V0VmVyc2lvbihkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UZW1wbGF0ZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpXG4gICAgICApO1xuICB9XG5cbiAgdXBkYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBkZXN0cm95VmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgLnRoZW4oKHJlczogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGxpc3RWZXJzaW9ucyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5XG4gICk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhyZXMpXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUElFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgc3RhdHVzOiBudW1iZXIgfCBzdHJpbmc7XG4gIHN0YWNrOiBzdHJpbmc7XG4gIGRldGFpbHM6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgc3RhdHVzLFxuICAgIHN0YXR1c1RleHQsXG4gICAgbWVzc2FnZSxcbiAgICBib2R5ID0ge31cbiAgfTogQVBJRXJyb3JPcHRpb25zKSB7XG4gICAgbGV0IGJvZHlNZXNzYWdlID0gJyc7XG4gICAgbGV0IGVycm9yID0gJyc7XG4gICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgYm9keU1lc3NhZ2UgPSBib2R5O1xuICAgIH0gZWxzZSB7XG4gICAgICBib2R5TWVzc2FnZSA9IGJvZHk/Lm1lc3NhZ2U7XG4gICAgICBlcnJvciA9IGJvZHk/LmVycm9yO1xuICAgIH1cbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgZXJyb3IgfHwgc3RhdHVzVGV4dDtcbiAgICB0aGlzLmRldGFpbHMgPSBib2R5TWVzc2FnZTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHtcbiAgRXZlbnRzTGlzdCxcbiAgRXZlbnRzUGFnZSxcbiAgRXZlbnRzUXVlcnksXG4gIEV2ZW50c1Jlc3BvbnNlLFxuICBQYWdlc0xpc3QsXG4gIFBhZ2VzTGlzdEFjY3VtdWxhdG9yLFxuICBQYXJzZWRQYWdlc0xpc3Rcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0V2ZW50cyc7XG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50Q2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIF9wYXJzZVBhZ2VOdW1iZXIodXJsOiBzdHJpbmcpIDogc3RyaW5nIHtcbiAgICByZXR1cm4gdXJsLnNwbGl0KCcvJykucG9wKCkgfHwgJyc7XG4gIH1cblxuICBfcGFyc2VQYWdlKGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKSA6IEV2ZW50c1BhZ2Uge1xuICAgIHJldHVybiB7IGlkLCBudW1iZXI6IHRoaXMuX3BhcnNlUGFnZU51bWJlcih1cmwpLCB1cmwgfTtcbiAgfVxuXG4gIF9wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZTogRXZlbnRzUmVzcG9uc2UpIDogUGFyc2VkUGFnZXNMaXN0IHtcbiAgICBjb25zdCBwYWdlcyA9IE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlLmJvZHkucGFnaW5nIGFzIFBhZ2VzTGlzdCk7XG4gICAgcmV0dXJuIHBhZ2VzLnJlZHVjZShcbiAgICAgIChhY2M6IFBhZ2VzTGlzdEFjY3VtdWxhdG9yLCBwYWlyOiBbdXJsOiBzdHJpbmcsIGlkOiBzdHJpbmddKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkID0gcGFpclswXTtcbiAgICAgICAgY29uc3QgdXJsID0gcGFpclsxXTtcbiAgICAgICAgYWNjW2lkXSA9IHRoaXMuX3BhcnNlUGFnZShpZCwgdXJsKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9XG4gICAgKSBhcyB1bmtub3duIGFzIFBhcnNlZFBhZ2VzTGlzdDtcbiAgfVxuXG4gIF9wYXJzZUV2ZW50TGlzdChyZXNwb25zZTogRXZlbnRzUmVzcG9uc2UpIDogRXZlbnRzTGlzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLFxuICAgICAgcGFnZXM6IHRoaXMuX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlKVxuICAgIH07XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRXZlbnRzUXVlcnkpIDogUHJvbWlzZTxFdmVudHNMaXN0PiB7XG4gICAgbGV0IHVybDtcbiAgICBjb25zdCBxdWVyeUNvcHkgPSB7IC4uLnF1ZXJ5IH07XG4gICAgaWYgKHF1ZXJ5Q29weSAmJiBxdWVyeUNvcHkucGFnZSkge1xuICAgICAgdXJsID0gdXJsam9pbignL3YzJywgZG9tYWluLCAnZXZlbnRzJywgcXVlcnlDb3B5LnBhZ2UpO1xuICAgICAgZGVsZXRlIHF1ZXJ5Q29weS5wYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSB1cmxqb2luKCcvdjMnLCBkb21haW4sICdldmVudHMnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsLCBxdWVyeUNvcHkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IEV2ZW50c1Jlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZUV2ZW50TGlzdChyZXNwb25zZSkpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvSUZvcm1EYXRhJztcblxuY2xhc3MgRm9ybURhdGFCdWlsZGVyIHtcbiAgcHJpdmF0ZSBGb3JtRGF0YUNvbnN0cnVjdG9yOiBJbnB1dEZvcm1EYXRhO1xuICBjb25zdHJ1Y3RvcihGb3JtRGF0YUNvbnN0cnVjdG9yOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy5Gb3JtRGF0YUNvbnN0cnVjdG9yID0gRm9ybURhdGFDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVGb3JtRGF0YShkYXRhOiBhbnkpOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRhdGEgb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGZvcm1EYXRhOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSA9IE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGRhdGFba2V5XTsgfSlcbiAgICAgIC5yZWR1Y2UoKGZvcm1EYXRhQWNjOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSwga2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGVLZXlzID0gWydhdHRhY2htZW50JywgJ2lubGluZScsICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJ107XG4gICAgICAgIGlmIChmaWxlS2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgdGhpcy5hZGRGaWxlc1RvRkQoa2V5LCBkYXRhW2tleV0sIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5ID09PSAnbWVzc2FnZScpIHsgLy8gbWltZSBtZXNzYWdlXG4gICAgICAgICAgdGhpcy5hZGRNaW1lRGF0YVRvRkQoa2V5LCBkYXRhW2tleV0sIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZENvbW1vblByb3BlcnR5VG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICB9LCBuZXcgdGhpcy5Gb3JtRGF0YUNvbnN0cnVjdG9yKCkpO1xuICAgIHJldHVybiBmb3JtRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgaXNOb2RlRm9ybURhdGEoZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEpXG4gIDogZm9ybURhdGFJbnN0YW5jZSBpcyBOb2RlRm9ybURhdGEge1xuICAgIHJldHVybiAoPE5vZGVGb3JtRGF0YT5mb3JtRGF0YUluc3RhbmNlKS5nZXRIZWFkZXJzICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGdldEF0dGFjaG1lbnRPcHRpb25zKGl0ZW06IHtcbiAgICBmaWxlbmFtZT86IHN0cmluZztcbiAgICBjb250ZW50VHlwZT8gOiBzdHJpbmc7XG4gICAga25vd25MZW5ndGg/OiBudW1iZXI7XG4gIH0pOiB7XG4gICAgZmlsZW5hbWU/OiBzdHJpbmcsXG4gICAgY29udGVudFR5cGU/OiBzdHJpbmcsXG4gICAga25vd25MZW5ndGg/OiBudW1iZXJcbiAgfSB7XG4gICAgaWYgKHR5cGVvZiBpdGVtICE9PSAnb2JqZWN0JyB8fCB0aGlzLmlzU3RyZWFtKGl0ZW0pKSByZXR1cm4ge307XG4gICAgY29uc3Qge1xuICAgICAgZmlsZW5hbWUsXG4gICAgICBjb250ZW50VHlwZSxcbiAgICAgIGtub3duTGVuZ3RoXG4gICAgfSA9IGl0ZW07XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLihmaWxlbmFtZSA/IHsgZmlsZW5hbWUgfSA6IHsgZmlsZW5hbWU6ICdmaWxlJyB9KSxcbiAgICAgIC4uLihjb250ZW50VHlwZSAmJiB7IGNvbnRlbnRUeXBlIH0pLFxuICAgICAgLi4uKGtub3duTGVuZ3RoICYmIHsga25vd25MZW5ndGggfSlcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRNaW1lRGF0YVRvRkQoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgZGF0YTogQnVmZmVyIHwgQmxvYiB8IHN0cmluZyxcbiAgICBmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGRhdGEpIHx8IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3Qgbm9kZUZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZSBhcyBOb2RlRm9ybURhdGE7XG4gICAgICBjb25zdCBwcmVwYXJlZERhdGEgPSB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgPyBCdWZmZXIuZnJvbShkYXRhKSA6IGRhdGE7XG4gICAgICBub2RlRm9ybURhdGEuYXBwZW5kKGtleSwgcHJlcGFyZWREYXRhLCB7IGZpbGVuYW1lOiAnTWltZU1lc3NhZ2UnIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBicm93c2VyRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlIGFzIEZvcm1EYXRhO1xuICAgICAgYnJvd3NlckZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGEsICdNaW1lTWVzc2FnZScpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkRmlsZXNUb0ZEKFxuICAgIHByb3BlcnR5TmFtZTogc3RyaW5nLFxuICAgIHZhbHVlOiBhbnksXG4gICAgZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYXBwZW5kRmlsZVRvRkQgPSAoXG4gICAgICBvcmlnaW5hbEtleTogc3RyaW5nLFxuICAgICAgb2JqOiBhbnksXG4gICAgICBmb3JtRGF0YTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgICApOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IG9yaWdpbmFsS2V5ID09PSAnbXVsdGlwbGVWYWxpZGF0aW9uRmlsZScgPyAnZmlsZScgOiBvcmlnaW5hbEtleTtcbiAgICAgIGNvbnN0IGlzU3RyZWFtRGF0YSA9IHRoaXMuaXNTdHJlYW0ob2JqKTtcbiAgICAgIGNvbnN0IG9iakRhdGEgPSBpc1N0cmVhbURhdGEgPyBvYmogOiBvYmouZGF0YTtcbiAgICAgIC8vIGdldEF0dGFjaG1lbnRPcHRpb25zIHNob3VsZCBiZSBjYWxsZWQgd2l0aCBvYmogcGFyYW1ldGVyIHRvIHByZXZlbnQgbG9vc2luZyBmaWxlbmFtZVxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMob2JqKTtcbiAgICAgIGlmICh0aGlzLmlzTm9kZUZvcm1EYXRhKGZvcm1EYXRhKSkge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBvYmpEYXRhLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgb2JqRGF0YSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgfTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBhcHBlbmRGaWxlVG9GRChwcm9wZXJ0eU5hbWUsIGl0ZW0sIGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgdmFsdWUsIGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNTdHJlYW0oZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZGF0YS5waXBlID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDb21tb25Qcm9wZXJ0eVRvRkQoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgdmFsdWU6IGFueSxcbiAgICBmb3JtRGF0YUFjYzogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOiBhbnkpIHtcbiAgICAgICAgZm9ybURhdGFBY2MuYXBwZW5kKGtleSwgaXRlbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIGZvcm1EYXRhQWNjLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEZvcm1EYXRhQnVpbGRlcjtcbiIsImltcG9ydCBDbGllbnQgZnJvbSAnLi9jbGllbnQnO1xuaW1wb3J0IHsgSW5wdXRGb3JtRGF0YSB9IGZyb20gJy4vaW50ZXJmYWNlcy9JRm9ybURhdGEnO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL09wdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsZ3VuIHtcbiAgc3RhdGljIGdldCBkZWZhdWx0KCk6IHR5cGVvZiBNYWlsZ3VuIHsgcmV0dXJuIHRoaXM7IH1cbiAgcHJpdmF0ZSBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YVxuXG4gIGNvbnN0cnVjdG9yKEZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy5mb3JtRGF0YSA9IEZvcm1EYXRhO1xuICB9XG5cbiAgY2xpZW50KG9wdGlvbnM6IE9wdGlvbnMpIDogQ2xpZW50IHtcbiAgICByZXR1cm4gbmV3IENsaWVudChvcHRpb25zLCB0aGlzLmZvcm1EYXRhKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQm91bmNlLCBDb21wbGFpbnQsIFVuc3Vic2NyaWJlLCBXaGl0ZUxpc3Rcbn0gZnJvbSAnLi4vc3VwcHJlc3Npb25zJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgaW50ZXJmYWNlIEJvdW5jZURhdGEge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvZGU6IG51bWJlcjtcbiAgZXJyb3I6IHN0cmluZztcbiAgY3JlYXRlZF9hdDogc3RyaW5nIHwgRGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wbGFpbnREYXRhIHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVuc3Vic2NyaWJlRGF0YSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgdGFnczogYW55O1xuICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdoaXRlTGlzdERhdGEge1xuICB0eXBlOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHJlYXNvbjogc3RyaW5nO1xuICBjcmVhdGVkQXQ6IHN0cmluZyB8IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2VkUGFnZSB7XG4gIGlkOiBzdHJpbmc7XG4gIHBhZ2U6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIGFkZHJlc3M6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIHVybDogc3RyaW5nXG59XG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlZFBhZ2VzTGlzdCB7XG4gIHByZXZpb3VzOiBQYXJzZWRQYWdlO1xuICBmaXJzdDogUGFyc2VkUGFnZTtcbiAgbGFzdDogUGFyc2VkUGFnZTtcbiAgbmV4dDogUGFyc2VkUGFnZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkxpc3Qge1xuICBpdGVtczogKEJvdW5jZSB8IENvbXBsYWludCB8IFVuc3Vic2NyaWJlIHwgV2hpdGVMaXN0KVtdO1xuICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2VzTGlzdCB7XG4gIHByZXZpb3VzOiBzdHJpbmc7XG4gIGZpcnN0OiBzdHJpbmc7XG4gIGxhc3Q6IHN0cmluZztcbiAgbmV4dDogc3RyaW5nO1xufVxuXG5leHBvcnQgZW51bSBTdXBwcmVzc2lvbk1vZGVscyB7XG4gIEJPVU5DRVMgPSAnYm91bmNlcycsXG4gIENPTVBMQUlOVFMgPSAnY29tcGxhaW50cycsXG4gIFVOU1VCU0NSSUJFUyA9ICd1bnN1YnNjcmliZXMnLFxuICBXSElURUxJU1RTID0gJ3doaXRlbGlzdHMnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZXNMaXN0QWNjdW11bGF0b3Ige1xuICBbaW5kZXg6IHN0cmluZ106IFBhcnNlZFBhZ2U7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uTGlzdFF1ZXJ5ID0ge1xuICBsaW1pdD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSB7XG4gIGJvZHk6IHtcbiAgICBpdGVtczogQm91bmNlRGF0YVtdIHwgQ29tcGxhaW50RGF0YVtdIHwgVW5zdWJzY3JpYmVEYXRhW10gfCBXaGl0ZUxpc3REYXRhW107XG4gICAgcGFnaW5nOiBQYWdlc0xpc3Q7XG4gIH1cbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcHJlc3Npb25SZXNwb25zZSB7XG4gIGJvZHk6IEJvdW5jZURhdGEgfCBDb21wbGFpbnREYXRhIHwgVW5zdWJzY3JpYmVEYXRhIHwgV2hpdGVMaXN0RGF0YTtcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcHJlc3Npb25EZXN0cm95UmVzcG9uc2Uge1xuICBib2R5OiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHZhbHVlPzogc3RyaW5nO1xuICAgIGFkZHJlc3M/OiBzdHJpbmc7XG4gIH1cbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcHJlc3Npb25EZXN0cm95UmVzdWx0IHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSA9IHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjb2RlPzogbnVtYmVyO1xuICBlcnJvcj86IHN0cmluZztcbiAgZG9tYWluPzogc3RyaW5nO1xuICB0YWc/OiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ/OiBzdHJpbmcgO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSB7XG4gIGJvZHk6e1xuICAgIG1lc3NhZ2U6c3RyaW5nO1xuICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgdmFsdWU/OiBzdHJpbmc7XG4gIH1cbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCB7XG4gIG1lc3NhZ2U6c3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBJcFBvb2xDcmVhdGVEYXRhLFxuICBJcFBvb2xDcmVhdGVSZXNwb25zZSxcbiAgSXBQb29sQ3JlYXRlUmVzdWx0LFxuICBJcFBvb2xEZWxldGVEYXRhLFxuICBJcFBvb2xMaXN0UmVzcG9uc2UsXG4gIElwUG9vbExpc3RSZXN1bHQsXG4gIElwUG9vbE1lc3NhZ2VSZXNwb25zZSxcbiAgSXBQb29sTWVzc2FnZVJlc3VsdCxcbiAgSXBQb29sVXBkYXRlRGF0YSxcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0lwUG9vbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcFBvb2xzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QoKTogUHJvbWlzZTxJcFBvb2xMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92MS9pcF9wb29scycpXG4gICAgICAudGhlbigocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZSkpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKGRhdGE6IElwUG9vbENyZWF0ZURhdGEpOiBQcm9taXNlPElwUG9vbENyZWF0ZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJcFBvb2xDcmVhdGVSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjEvaXBfcG9vbHMnLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sVXBkYXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJcFBvb2xNZXNzYWdlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucGF0Y2hXaXRoRkQoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sRGVsZXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOklwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5kZWxldGUoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJcFBvb2xzUmVzcG9uc2UocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSk6IElwUG9vbExpc3RSZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgTWdSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgeyBJcERhdGEsIElwc0xpc3RSZXNwb25zZUJvZHkgfSBmcm9tICcuL2ludGVyZmFjZXMvSXBzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXBzQ2xpZW50IHtcbiAgcmVxdWVzdDogTWdSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IE1nUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5OiBhbnkpOiBQcm9taXNlPElwc0xpc3RSZXNwb25zZUJvZHk+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92My9pcHMnLCBxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VJcHNSZXNwb25zZTxJcHNMaXN0UmVzcG9uc2VCb2R5PihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBnZXQoaXA6IHN0cmluZyk6IFByb21pc2U8SXBEYXRhPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvaXBzLyR7aXB9YCk7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VJcHNSZXNwb25zZTxJcERhdGE+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJcHNSZXNwb25zZTxUPihyZXNwb25zZTogeyBib2R5OiBUIH0pOiBUIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7XG4gIExpc3RzUXVlcnksXG4gIENyZWF0ZVVwZGF0ZUxpc3QsXG4gIERlc3Ryb3llZExpc3QsXG4gIE1haWxpbmdMaXN0LFxuICBWYWxpZGF0aW9uQXBpUmVzcG9uc2UsXG4gIFN0YXJ0VmFsaWRhdGlvblJlc3VsdCxcbiAgVmFsaWRhdGlvblJlc3VsdCxcbiAgQ2FuY2VsVmFsaWRhdGlvblJlc3VsdFxufSBmcm9tICcuL2ludGVyZmFjZXMvbGlzdHMnO1xuaW1wb3J0IHsgSU1haWxMaXN0c01lbWJlcnMgfSBmcm9tICcuL2ludGVyZmFjZXMvbWFpbExpc3RNZW1iZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdHNDbGllbnQge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgbWVtYmVyczogSU1haWxMaXN0c01lbWJlcnM7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbWVtYmVyczpJTWFpbExpc3RzTWVtYmVycykge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgICB0aGlzLm1lbWJlcnMgPSBtZW1iZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZVZhbGlkYXRpb25SZXN1bHQoc3RhdHVzOiBudW1iZXIsIGRhdGE6IFZhbGlkYXRpb25BcGlSZXNwb25zZSk6IFZhbGlkYXRpb25SZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICB2YWxpZGF0aW9uUmVzdWx0OiB7XG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCAqIDEwMDApIC8vIGFkZCBtaWxsaXNlY29uZCB0byBVbml4IHRpbWVzdGFtcFxuICAgICAgfVxuICAgIH0gYXMgVmFsaWRhdGlvblJlc3VsdDtcbiAgfVxuXG4gIGxpc3QocXVlcnk/OiBMaXN0c1F1ZXJ5KTogUHJvbWlzZTxNYWlsaW5nTGlzdFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9L3BhZ2VzYCwgcXVlcnkpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkuaXRlbXMgYXMgTWFpbGluZ0xpc3RbXSk7XG4gIH1cblxuICBnZXQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCBhcyBNYWlsaW5nTGlzdCk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodGhpcy5iYXNlUm91dGUsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCBhcyBNYWlsaW5nTGlzdCk7XG4gIH1cblxuICB1cGRhdGUobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCBhcyBNYWlsaW5nTGlzdCk7XG4gIH1cblxuICBkZXN0cm95KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95ZWRMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgRGVzdHJveWVkTGlzdCk7XG4gIH1cblxuICB2YWxpZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8U3RhcnRWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgLCB7fSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gKHtcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICAgIH0pIGFzIFN0YXJ0VmFsaWRhdGlvblJlc3VsdCk7XG4gIH1cblxuICB2YWxpZGF0aW9uUmVzdWx0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWApXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlVmFsaWRhdGlvblJlc3VsdChcbiAgICAgICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgIHJlc3BvbnNlLmJvZHkgYXMgVmFsaWRhdGlvbkFwaVJlc3BvbnNlXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBjYW5jZWxWYWxpZGF0aW9uKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxDYW5jZWxWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+ICh7XG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICAgIH0gYXMgQ2FuY2VsVmFsaWRhdGlvblJlc3VsdCkpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgTWFpbExpc3RNZW1iZXJzUXVlcnksXG4gIElNYWlsTGlzdHNNZW1iZXJzLFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMsXG4gIE1haWxMaXN0TWVtYmVyLFxuICBNdWx0aXBsZU1lbWJlcnNEYXRhLFxuICBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhLFxuICBEZWxldGVkTWVtYmVyLFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXEsXG4gIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlLFxuICBNYWlsTGlzdE1lbWJlcnNSZXN1bHQsXG4gIE1haWxMaXN0TWVtYmVyc1Jlc3BvbnNlXG59IGZyb20gJy4vaW50ZXJmYWNlcy9tYWlsTGlzdE1lbWJlcnMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxMaXN0c01lbWJlcnNcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPE1haWxMaXN0TWVtYmVyc1Jlc3VsdD5cbiAgaW1wbGVtZW50cyBJTWFpbExpc3RzTWVtYmVycyB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycykge1xuICAgIGNvbnN0IG5ld0RhdGEgPSB7IC4uLmRhdGEgfTtcblxuICAgIGlmICh0eXBlb2YgZGF0YS52YXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbmV3RGF0YS52YXJzID0gSlNPTi5zdHJpbmdpZnkobmV3RGF0YS52YXJzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEuc3Vic2NyaWJlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBuZXdEYXRhLnN1YnNjcmliZWQgPSBkYXRhLnN1YnNjcmliZWQgPyAneWVzJyA6ICdubyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld0RhdGEgYXMgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzUmVxO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogTWFpbExpc3RNZW1iZXJzUmVzcG9uc2UsXG4gICk6IE1haWxMaXN0TWVtYmVyc1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIE1haWxMaXN0TWVtYmVyc1Jlc3VsdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3RNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIHF1ZXJ5PzogTWFpbExpc3RNZW1iZXJzUXVlcnlcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcnNSZXN1bHQ+IHtcbiAgICBsZXQgdXJsO1xuICAgIGNvbnN0IHF1ZXJ5Q29weSA9IHsgLi4ucXVlcnkgfTtcbiAgICBpZiAocXVlcnlDb3B5ICYmIHF1ZXJ5Q29weS5wYWdlKSB7XG4gICAgICB1cmwgPSB1cmxqb2luKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy9wYWdlc2AsIHF1ZXJ5Q29weS5wYWdlKTtcbiAgICAgIGRlbGV0ZSBxdWVyeUNvcHkucGFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gdXJsam9pbihgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvcGFnZXNgKTtcbiAgICB9XG4gICAgY29uc3QgYXBpUmVzcG9uc2U6IE1haWxMaXN0TWVtYmVyc1Jlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCh1cmwsIHF1ZXJ5Q29weSk7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VMaXN0KGFwaVJlc3BvbnNlKTtcbiAgfVxuXG4gIGdldE1lbWJlcihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGNyZWF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzYCwgcmVxRGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgY3JlYXRlTWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZU1lbWJlcnNEYXRhXG4gICk6IFByb21pc2U8TmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2U+IHtcbiAgICBjb25zdCBuZXdEYXRhOiBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhID0ge1xuICAgICAgbWVtYmVyczogQXJyYXkuaXNBcnJheShkYXRhLm1lbWJlcnMpID8gSlNPTi5zdHJpbmdpZnkoZGF0YS5tZW1iZXJzKSA6IGRhdGEubWVtYmVycyxcbiAgICAgIHVwc2VydDogZGF0YS51cHNlcnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy5qc29uYCwgbmV3RGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSk7XG4gIH1cblxuICB1cGRhdGVNZW1iZXIoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzXG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICBjb25zdCByZXFEYXRhID0gdGhpcy5jaGVja0FuZFVwZGF0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWAsIHJlcURhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGRlc3Ryb3lNZW1iZXIobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nKSA6IFByb21pc2U8RGVsZXRlZE1lbWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIERlbGV0ZWRNZW1iZXIpO1xuICB9XG59XG4iLCJpbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuaW1wb3J0IHtcbiAgTWFpbGd1bk1lc3NhZ2VEYXRhLFxuICBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSxcbiAgTWVzc2FnZXNTZW5kUmVzdWx0XG59IGZyb20gJy4vaW50ZXJmYWNlcy9NZXNzYWdlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVCb29sZWFuVmFsdWVzKGRhdGE6IE1haWxndW5NZXNzYWdlRGF0YSk6IE1haWxndW5NZXNzYWdlRGF0YSB7XG4gICAgY29uc3QgeWVzTm9Qcm9wZXJ0aWVzID0gbmV3IFNldChbXG4gICAgICAnbzp0ZXN0bW9kZScsXG4gICAgICAndDp0ZXh0JyxcbiAgICAgICdvOmRraW0nLFxuICAgICAgJ286dHJhY2tpbmcnLFxuICAgICAgJ286dHJhY2tpbmctY2xpY2tzJyxcbiAgICAgICdvOnRyYWNraW5nLW9wZW5zJyxcbiAgICAgICdvOnJlcXVpcmUtdGxzJyxcbiAgICAgICdvOnNraXAtdmVyaWZpY2F0aW9uJ1xuICAgIF0pO1xuXG4gICAgaWYgKCFkYXRhIHx8IE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIG1lc3NhZ2U6ICdNZXNzYWdlIGRhdGEgb2JqZWN0IGNhbiBub3QgYmUgZW1wdHknXG4gICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3Qua2V5cyhkYXRhKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICBpZiAoeWVzTm9Qcm9wZXJ0aWVzLmhhcyhrZXkpICYmIHR5cGVvZiBkYXRhW2tleV0gPT09ICdib29sZWFuJykge1xuICAgICAgICBhY2Nba2V5XSA9IGRhdGFba2V5XSA/ICd5ZXMnIDogJ25vJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBNYWlsZ3VuTWVzc2FnZURhdGEpO1xuICB9XG5cbiAgX3BhcnNlUmVzcG9uc2UocmVzcG9uc2U6IE1lc3NhZ2VzU2VuZEFQSVJlc3BvbnNlKTogTWVzc2FnZXNTZW5kUmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogTWFpbGd1bk1lc3NhZ2VEYXRhKTogUHJvbWlzZTxNZXNzYWdlc1NlbmRSZXN1bHQ+IHtcbiAgICBpZiAoZGF0YS5tZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92My8ke2RvbWFpbn0vbWVzc2FnZXMubWltZWAsIGRhdGEpXG4gICAgICAgIC50aGVuKHRoaXMuX3BhcnNlUmVzcG9uc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGlmaWVkRGF0YSA9IHRoaXMucHJlcGFyZUJvb2xlYW5WYWx1ZXMoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzYCwgbW9kaWZpZWREYXRhKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IHtcbiAgQ2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVVwZGF0ZWQsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdFxufVxuICBmcm9tICcuL2ludGVyZmFjZXMvTXVsdGlwbGVWYWxpZGF0aW9uJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCBpbXBsZW1lbnRzIElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVSZXNwb25zZTxUPihyZXNwb25zZTogQVBJUmVzcG9uc2UpOiBUIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZT8uYm9keVxuICAgIH0gYXMgVDtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoKTogUHJvbWlzZTxNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsaycpO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBnZXQobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzcG9uc2VTdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZT8uYm9keVxuICAgIH07XG4gIH1cblxuICBhc3luYyBjcmVhdGUoXG4gICAgbGlzdElkOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IG11bHRpcGxlVmFsaWRhdGlvbkRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVVwZGF0ZWQgPSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiB7XG4gICAgICAgIC4uLmRhdGE/LmZpbGVcbiAgICAgIH0sXG4gICAgICAuLi5kYXRhXG4gICAgfTtcbiAgICBkZWxldGUgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YS5maWxlO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvJHtsaXN0SWR9YCwgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2U8Q3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgZGVzdHJveShsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8Q2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5kZWxldGUoYC92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvJHtsaXN0SWR9YCk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2U8Q2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+KHJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gJ2Jhc2UtNjQnO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IGF4aW9zLCB7IEF4aW9zRXJyb3IsIEF4aW9zUmVzcG9uc2UgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgKiBhcyBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL2Vycm9yJztcbmltcG9ydCB7IE9uQ2FsbEVtcHR5SGVhZGVycywgT25DYWxsUmVxdWVzdE9wdGlvbnMsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL1JlcXVlc3RPcHRpb25zJztcbmltcG9ydCBBUElFcnJvck9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL0FQSUVycm9yT3B0aW9ucyc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lGb3JtRGF0YSc7XG5pbXBvcnQgQVBJUmVzcG9uc2UgZnJvbSAnLi9pbnRlcmZhY2VzL0FwaVJlc3BvbnNlJztcbmltcG9ydCBGb3JtRGF0YUJ1aWxkZXIgZnJvbSAnLi9mb3JtRGF0YUJ1aWxkZXInO1xuaW1wb3J0IHsgSXBQb29sRGVsZXRlRGF0YSB9IGZyb20gJy4vaW50ZXJmYWNlcy9JcFBvb2xzJztcblxuY2xhc3MgUmVxdWVzdCB7XG4gIHByaXZhdGUgdXNlcm5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBrZXk6IHN0cmluZztcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZztcbiAgcHJpdmF0ZSB0aW1lb3V0OiBudW1iZXI7XG4gIHByaXZhdGUgaGVhZGVyczogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIHByaXZhdGUgZm9ybURhdGFCdWlsZGVyOiBGb3JtRGF0YUJ1aWxkZXI7XG4gIHByaXZhdGUgbWF4Qm9keUxlbmd0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zLCBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIHRoaXMudXNlcm5hbWUgPSBvcHRpb25zLnVzZXJuYW1lO1xuICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXk7XG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCBhcyBzdHJpbmc7XG4gICAgdGhpcy50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0O1xuICAgIHRoaXMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICB0aGlzLmZvcm1EYXRhQnVpbGRlciA9IG5ldyBGb3JtRGF0YUJ1aWxkZXIoZm9ybURhdGEpO1xuICAgIHRoaXMubWF4Qm9keUxlbmd0aCA9IDI1MDAwMDAwOyAvLyAyNU1CXG4gIH1cblxuICBhc3luYyByZXF1ZXN0KFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIG9uQ2FsbE9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duIHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3Qgb3B0aW9uczogT25DYWxsUmVxdWVzdE9wdGlvbnMgPSB7IC4uLm9uQ2FsbE9wdGlvbnMgfTtcbiAgICBjb25zdCBiYXNpYyA9IGJhc2U2NC5lbmNvZGUoYCR7dGhpcy51c2VybmFtZX06JHt0aGlzLmtleX1gKTtcbiAgICBjb25zdCBvbkNhbGxIZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzID8gb3B0aW9ucy5oZWFkZXJzIDoge307XG5cbiAgICBjb25zdCBoZWFkZXJzOiBIZWFkZXJzSW5pdHwgT25DYWxsRW1wdHlIZWFkZXJzID0ge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7YmFzaWN9YCxcbiAgICAgIC4uLnRoaXMuaGVhZGVycyxcbiAgICAgIC4uLm9uQ2FsbEhlYWRlcnNcbiAgICB9O1xuXG4gICAgZGVsZXRlIG9wdGlvbnM/LmhlYWRlcnM7XG5cbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLm9wdGlvbnMgfTtcblxuICAgIGlmIChvcHRpb25zPy5xdWVyeSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvcHRpb25zPy5xdWVyeSkubGVuZ3RoID4gMCkge1xuICAgICAgcGFyYW1zLnBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeSk7XG4gICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5ib2R5KSB7XG4gICAgICBjb25zdCBib2R5ID0gb3B0aW9ucz8uYm9keTtcbiAgICAgIHBhcmFtcy5kYXRhID0gYm9keTtcbiAgICAgIGRlbGV0ZSBwYXJhbXMuYm9keTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlO1xuICAgIGNvbnN0IHVybFZhbHVlID0gdXJsam9pbih0aGlzLnVybCwgdXJsKTtcbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5yZXF1ZXN0KHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QudG9Mb2NhbGVVcHBlckNhc2UoKSxcbiAgICAgICAgdGltZW91dDogdGhpcy50aW1lb3V0LFxuICAgICAgICB1cmw6IHVybFZhbHVlLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgIG1heEJvZHlMZW5ndGg6IHRoaXMubWF4Qm9keUxlbmd0aFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICBjb25zdCBlcnJvclJlc3BvbnNlID0gZXJyIGFzIEF4aW9zRXJyb3I7XG5cbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgIHN0YXR1czogZXJyb3JSZXNwb25zZT8ucmVzcG9uc2U/LnN0YXR1cyB8fCA0MDAsXG4gICAgICAgIHN0YXR1c1RleHQ6IGVycm9yUmVzcG9uc2U/LnJlc3BvbnNlPy5zdGF0dXNUZXh0IHx8IGVycm9yUmVzcG9uc2UuY29kZSxcbiAgICAgICAgYm9keTogZXJyb3JSZXNwb25zZT8ucmVzcG9uc2U/LmRhdGEgfHwgZXJyb3JSZXNwb25zZS5tZXNzYWdlXG4gICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5nZXRSZXNwb25zZUJvZHkocmVzcG9uc2UpO1xuICAgIHJldHVybiByZXMgYXMgQVBJUmVzcG9uc2U7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldFJlc3BvbnNlQm9keShyZXNwb25zZTogQXhpb3NSZXNwb25zZSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXMgPSB7XG4gICAgICBib2R5OiB7fSxcbiAgICAgIHN0YXR1czogcmVzcG9uc2U/LnN0YXR1c1xuICAgIH0gYXMgQVBJUmVzcG9uc2U7XG5cbiAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSA9PT0gJ01haWxndW4gTWFnbmlmaWNlbnQgQVBJJykge1xuICAgICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgIHN0YXR1c1RleHQ6ICdJbmNvcnJlY3QgdXJsJyxcbiAgICAgICAgICBib2R5OiByZXNwb25zZS5kYXRhXG4gICAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHJlcy5ib2R5ID0ge1xuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5kYXRhXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMuYm9keSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBxdWVyeShcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBxdWVyeT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgQXJyYXk8QXJyYXk8c3RyaW5nPj4sXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB7IHF1ZXJ5LCAuLi5vcHRpb25zIH0pO1xuICB9XG5cbiAgY29tbWFuZChcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdIHwgc3RyaW5nIHwgTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEsXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICAgIGFkZERlZmF1bHRIZWFkZXJzID0gdHJ1ZVxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgbGV0IGhlYWRlcnMgPSB7fTtcbiAgICBpZiAoYWRkRGVmYXVsdEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMgPSB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9O1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIC4uLmhlYWRlcnMsXG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIHJlcXVlc3RPcHRpb25zXG4gICAgKTtcbiAgfVxuXG4gIGdldChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBxdWVyeT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgQXJyYXk8QXJyYXk8c3RyaW5nPj4sXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeSgnZ2V0JywgdXJsLCBxdWVyeSwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0KFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHN0cmluZyxcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdFdpdGhGRChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+W11cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncG9zdCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcHV0V2l0aEZEKHVybDogc3RyaW5nLCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcGF0Y2hXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncGF0Y2gnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHB1dCh1cmw6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgc3RyaW5nLCBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXG4gIDogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICBkZWxldGUodXJsOiBzdHJpbmcsIGRhdGE/OiBJcFBvb2xEZWxldGVEYXRhKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ2RlbGV0ZScsIHVybCwgZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdDtcbiIsImltcG9ydCB7XG4gIENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSwgRGVzdHJveVJvdXRlUmVzcG9uc2UsIFJvdXRlLCBSb3V0ZXNMaXN0UXVlcnksIFVwZGF0ZVJvdXRlUmVzcG9uc2Vcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL3JvdXRlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeTogUm91dGVzTGlzdFF1ZXJ5KTogUHJvbWlzZTxSb3V0ZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9yb3V0ZXMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyk7XG4gIH1cblxuICBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL3JvdXRlcy8ke2lkfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92My9yb3V0ZXMnLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5LnJvdXRlKTtcbiAgfVxuXG4gIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFVwZGF0ZVJvdXRlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgL3YzL3JvdXRlcy8ke2lkfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95Um91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgeyBTdGF0c1F1ZXJ5LCBTdGF0c09wdGlvbnMsIFN0YXQgfSBmcm9tICcuL2ludGVyZmFjZXMvU3RhdHNPcHRpb25zJztcblxuY2xhc3MgU3RhdHMge1xuICBzdGFydDogRGF0ZTtcbiAgZW5kOiBEYXRlO1xuICByZXNvbHV0aW9uOiBzdHJpbmc7XG4gIHN0YXRzOiBTdGF0W107XG5cbiAgY29uc3RydWN0b3IoZGF0YTogU3RhdHNPcHRpb25zKSB7XG4gICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKGRhdGEuc3RhcnQpO1xuICAgIHRoaXMuZW5kID0gbmV3IERhdGUoZGF0YS5lbmQpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IGRhdGEucmVzb2x1dGlvbjtcbiAgICB0aGlzLnN0YXRzID0gZGF0YS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQ6IFN0YXQpIHtcbiAgICAgIGNvbnN0IHJlcyA9IHsgLi4uc3RhdCB9O1xuICAgICAgcmVzLnRpbWUgPSBuZXcgRGF0ZShzdGF0LnRpbWUpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnk6IFN0YXRzUXVlcnkgfCB1bmRlZmluZWQpOiBBcnJheTxBcnJheTxzdHJpbmc+PiB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9IFtdIGFzIEFycmF5PEFycmF5PHN0cmluZz4+O1xuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHF1ZXJ5KS5sZW5ndGgpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IE9iamVjdC5lbnRyaWVzKHF1ZXJ5KS5yZWR1Y2UoKGFycmF5V2l0aFBhaXJzLCBjdXJyZW50UGFpcikgPT4ge1xuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBjdXJyZW50UGFpcjtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IHJlcGVhdGVkUHJvcGVydHkgPSB2YWx1ZS5tYXAoKGl0ZW0pID0+IFtrZXksIGl0ZW1dKTtcbiAgICAgICAgICByZXR1cm4gWy4uLmFycmF5V2l0aFBhaXJzLCAuLi5yZXBlYXRlZFByb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICAgIHJldHVybiBhcnJheVdpdGhQYWlycztcbiAgICAgIH0sIFtdIGFzIEFycmF5PEFycmF5PHN0cmluZz4+KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VhcmNoUGFyYW1zO1xuICB9XG5cbiAgX3BhcnNlU3RhdHMocmVzcG9uc2U6IHsgYm9keTogU3RhdHNPcHRpb25zIH0pOiBTdGF0cyB7XG4gICAgcmV0dXJuIG5ldyBTdGF0cyhyZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGdldERvbWFpbihkb21haW46IHN0cmluZywgcXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxTdGF0cz4ge1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzJywgZG9tYWluLCAnc3RhdHMvdG90YWwnKSwgc2VhcmNoUGFyYW1zKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VTdGF0cyk7XG4gIH1cblxuICBnZXRBY2NvdW50KHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8U3RhdHM+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvc3RhdHMvdG90YWwnLCBzZWFyY2hQYXJhbXMpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVN0YXRzKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQge1xuICBCb3VuY2VEYXRhLFxuICBDb21wbGFpbnREYXRhLFxuICBQYWdlc0xpc3QsXG4gIFBhZ2VzTGlzdEFjY3VtdWxhdG9yLFxuICBQYXJzZWRQYWdlLFxuICBQYXJzZWRQYWdlc0xpc3QsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQsXG4gIFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQsXG4gIFN1cHByZXNzaW9uTGlzdCxcbiAgU3VwcHJlc3Npb25MaXN0UXVlcnksXG4gIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbk1vZGVscyxcbiAgU3VwcHJlc3Npb25SZXNwb25zZSxcbiAgVW5zdWJzY3JpYmVEYXRhLFxuICBXaGl0ZUxpc3REYXRhLFxufSBmcm9tICcuL2ludGVyZmFjZXMvU3VwcmVzc2lvbnMnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vZXJyb3InO1xuaW1wb3J0IEFQSUVycm9yT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvQVBJRXJyb3JPcHRpb25zJztcblxuY29uc3QgY3JlYXRlT3B0aW9ucyA9IHtcbiAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH1cbn07XG5leHBvcnQgY2xhc3MgU3VwcHJlc3Npb24ge1xuICB0eXBlOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHR5cGU6IFN1cHByZXNzaW9uTW9kZWxzKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIEJvdW5jZSBleHRlbmRzIFN1cHByZXNzaW9uIHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjb2RlOiBudW1iZXI7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogQm91bmNlRGF0YSkge1xuICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLkJPVU5DRVMpO1xuICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICB0aGlzLmNvZGUgPSArZGF0YS5jb2RlO1xuICAgIHRoaXMuZXJyb3IgPSBkYXRhLmVycm9yO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBsYWludCBleHRlbmRzIFN1cHByZXNzaW9uIHtcbiAgYWRkcmVzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBjcmVhdGVkX2F0OiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IENvbXBsYWludERhdGEpIHtcbiAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5DT01QTEFJTlRTKTtcbiAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5zdWJzY3JpYmUgZXh0ZW5kcyBTdXBwcmVzc2lvbiB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgdGFnczogc3RyaW5nW107XG4gIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogVW5zdWJzY3JpYmVEYXRhKSB7XG4gICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuVU5TVUJTQ1JJQkVTKTtcbiAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgdGhpcy50YWdzID0gZGF0YS50YWdzO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdoaXRlTGlzdCBleHRlbmRzIFN1cHByZXNzaW9uIHtcbiAgdmFsdWU6IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBXaGl0ZUxpc3REYXRhKSB7XG4gICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuV0hJVEVMSVNUUyk7XG4gICAgdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgdGhpcy5yZWFzb24gPSBkYXRhLnJlYXNvbjtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZEF0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBwcmVzc2lvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIG1vZGVsczogTWFwPHN0cmluZywgYW55PjtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLm1vZGVscyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLm1vZGVscy5zZXQoJ2JvdW5jZXMnLCBCb3VuY2UpO1xuICAgIHRoaXMubW9kZWxzLnNldCgnY29tcGxhaW50cycsIENvbXBsYWludCk7XG4gICAgdGhpcy5tb2RlbHMuc2V0KCd1bnN1YnNjcmliZXMnLCBVbnN1YnNjcmliZSk7XG4gICAgdGhpcy5tb2RlbHMuc2V0KCd3aGl0ZWxpc3RzJywgV2hpdGVMaXN0KTtcbiAgfVxuXG4gIF9wYXJzZVBhZ2UoaWQ6IHN0cmluZywgcGFnZVVybDogc3RyaW5nKSA6IFBhcnNlZFBhZ2Uge1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwocGFnZVVybCk7XG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IHBhcnNlZFVybDtcbiAgICByZXR1cm4ge1xuICAgICAgaWQsXG4gICAgICBwYWdlOiBzZWFyY2hQYXJhbXMuaGFzKCdwYWdlJykgPyBzZWFyY2hQYXJhbXMuZ2V0KCdwYWdlJykgOiB1bmRlZmluZWQsXG4gICAgICBhZGRyZXNzOiBzZWFyY2hQYXJhbXMuaGFzKCdhZGRyZXNzJykgPyBzZWFyY2hQYXJhbXMuZ2V0KCdhZGRyZXNzJykgOiB1bmRlZmluZWQsXG4gICAgICB1cmw6IHBhZ2VVcmxcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSk6IFBhcnNlZFBhZ2VzTGlzdCB7XG4gICAgY29uc3QgcGFnZXMgPSBPYmplY3QuZW50cmllcyhyZXNwb25zZS5ib2R5LnBhZ2luZyBhcyBQYWdlc0xpc3QpO1xuICAgIHJldHVybiBwYWdlcy5yZWR1Y2UoXG4gICAgICAoYWNjOiBQYWdlc0xpc3RBY2N1bXVsYXRvciwgcGFpcjogW3BhZ2VVcmw6IHN0cmluZywgaWQ6IHN0cmluZ10pID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBwYWlyWzBdO1xuICAgICAgICBjb25zdCBwYWdlVXJsID0gcGFpclsxXTtcbiAgICAgICAgYWNjW2lkXSA9IHRoaXMuX3BhcnNlUGFnZShpZCwgcGFnZVVybCk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fVxuICAgICkgYXMgdW5rbm93biBhcyBQYXJzZWRQYWdlc0xpc3Q7XG4gIH1cblxuICBfcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSxcbiAgICBNb2RlbDoge1xuICAgICAgbmV3KGRhdGE6IEJvdW5jZURhdGEgfCBDb21wbGFpbnREYXRhIHwgVW5zdWJzY3JpYmVEYXRhIHwgV2hpdGVMaXN0RGF0YSk6XG4gICAgICBCb3VuY2UgfCBDb21wbGFpbnQgfCBVbnN1YnNjcmliZSB8IFdoaXRlTGlzdFxuICAgIH1cbiAgKTogU3VwcHJlc3Npb25MaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgU3VwcHJlc3Npb25MaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgoaXRlbSkgPT4gbmV3IE1vZGVsKGl0ZW0pKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLl9wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIF9wYXJzZUl0ZW08VCBleHRlbmRzIFN1cHByZXNzaW9uPihcbiAgICBkYXRhIDogQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YTogQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhKTpcbiAgICAgIFRcbiAgICB9XG4gICk6IFQge1xuICAgIHJldHVybiBuZXcgTW9kZWwoZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVdoaXRlTGlzdChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW11cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBzdGF0dXNUZXh0OiAnRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0JyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG1lc3NhZ2U6ICdXaGl0ZWxpc3RcXCdzIGNyZWF0aW9uIHByb2Nlc3MgZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBjcmVhdGlvbnMuIERhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCdcbiAgICAgICAgfVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdFdpdGhGRCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3doaXRlbGlzdHMnKSwgZGF0YSlcbiAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tUeXBlKHR5cGU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5tb2RlbHMuaGFzKHR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgc3RhdHVzVGV4dDogJ1Vua25vd24gdHlwZSB2YWx1ZScsXG4gICAgICAgIGJvZHk6IHsgbWVzc2FnZTogJ1R5cGUgbWF5IGJlIG9ubHkgb25lIG9mIFtib3VuY2VzLCBjb21wbGFpbnRzLCB1bnN1YnNjcmliZXMsIHdoaXRlbGlzdHNdJyB9XG4gICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUmVzcG9uc2UocmVzcG9uc2U6IFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSk6IFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICB0eXBlOiByZXNwb25zZS5ib2R5LnR5cGUgfHwgJycsXG4gICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxuXG4gIGxpc3QoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIHF1ZXJ5PzogU3VwcHJlc3Npb25MaXN0UXVlcnlcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkxpc3Q+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcblxuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbHMuZ2V0KHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5nZXQodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogU3VwcHJlc3Npb25MaXN0UmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTGlzdChyZXNwb25zZSwgbW9kZWwpKTtcbiAgfVxuXG4gIGdldChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8Qm91bmNlIHwgQ29tcGxhaW50IHwgVW5zdWJzY3JpYmUgfCBXaGl0ZUxpc3Q+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcblxuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbHMuZ2V0KHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5nZXQodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IFN1cHByZXNzaW9uUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlSXRlbTx0eXBlb2YgbW9kZWw+KHJlc3BvbnNlLmJvZHksIG1vZGVsKSk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcbiAgICAvLyBzdXBwb3J0cyBhZGRpbmcgbXVsdGlwbGUgc3VwcHJlc3Npb25zIGJ5IGRlZmF1bHRcbiAgICBsZXQgcG9zdERhdGE7XG4gICAgaWYgKHR5cGUgPT09ICd3aGl0ZWxpc3RzJykge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlV2hpdGVMaXN0KGRvbWFpbiwgZGF0YSk7XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICBwb3N0RGF0YSA9IFtkYXRhXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zdERhdGEgPSBbLi4uZGF0YV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3QodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBKU09OLnN0cmluZ2lmeShwb3N0RGF0YSksIGNyZWF0ZU9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQ+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAuZGVsZXRlKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZSkgPT4gKHtcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgICAgYWRkcmVzczogcmVzcG9uc2UuYm9keS5hZGRyZXNzIHx8ICcnLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgfSkpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3VwcHJlc3Npb25DbGllbnQ7XG4iLCJpbXBvcnQgeyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL011bHRpcGxlVmFsaWRhdGlvbic7XG5pbXBvcnQgeyBWYWxpZGF0aW9uUmVzdWx0LCBWYWxpZGF0aW9uUmVzcG9uc2UsIFZhbGlkYXRpb25RdWVyeSB9IGZyb20gJy4vaW50ZXJmYWNlcy9WYWxpZGF0ZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWxpZGF0ZUNsaWVudCB7XG4gIHB1YmxpYyBtdWx0aXBsZVZhbGlkYXRpb247XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50OiBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLm11bHRpcGxlVmFsaWRhdGlvbiA9IG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDtcbiAgfVxuXG4gIGFzeW5jIGdldChhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICBjb25zdCBxdWVyeTogVmFsaWRhdGlvblF1ZXJ5ID0geyBhZGRyZXNzIH07XG4gICAgY29uc3QgcmVzdWx0OiBWYWxpZGF0aW9uUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvYWRkcmVzcy92YWxpZGF0ZScsIHF1ZXJ5KTtcbiAgICByZXR1cm4gcmVzdWx0LmJvZHkgYXMgVmFsaWRhdGlvblJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuXG5pbXBvcnQge1xuICBWYWxpZGF0aW9uUmVzcG9uc2UsXG4gIFdlYmhvb2tMaXN0LFxuICBXZWJob29rUmVzcG9uc2UsXG4gIFdlYmhvb2tzSWRzLFxuICBXZWJob29rc1F1ZXJ5XG59IGZyb20gJy4vaW50ZXJmYWNlcy9XZWJob29rcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5jbGFzcyBXZWJob29rIHtcbiAgaWQ6IHN0cmluZztcbiAgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViaG9va0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBfcGFyc2VXZWJob29rTGlzdChyZXNwb25zZTogeyBib2R5OiB7IHdlYmhvb2tzOiBXZWJob29rTGlzdCB9IH0pOiBXZWJob29rTGlzdCB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkud2ViaG9va3M7XG4gIH1cblxuICBfcGFyc2VXZWJob29rV2l0aElEKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlc3BvbnNlOiBXZWJob29rUmVzcG9uc2UpOiBXZWJob29rIHtcbiAgICAgIGNvbnN0IHdlYmhvb2tSZXNwb25zZSA9IHJlc3BvbnNlPy5ib2R5Py53ZWJob29rO1xuICAgICAgbGV0IHVybCA9IHdlYmhvb2tSZXNwb25zZT8udXJsO1xuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgdXJsID0gd2ViaG9va1Jlc3BvbnNlPy51cmxzICYmIHdlYmhvb2tSZXNwb25zZS51cmxzLmxlbmd0aFxuICAgICAgICAgID8gd2ViaG9va1Jlc3BvbnNlLnVybHNbMF1cbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgV2ViaG9vayhpZCwgdXJsKTtcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlV2ViaG9va1Rlc3QocmVzcG9uc2U6IHsgYm9keTogeyBjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZyB9IH0pXG4gIDoge2NvZGU6IG51bWJlciwgbWVzc2FnZTpzdHJpbmd9IHtcbiAgICByZXR1cm4geyBjb2RlOiByZXNwb25zZS5ib2R5LmNvZGUsIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSB9IGFzIFZhbGlkYXRpb25SZXNwb25zZTtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5OiBXZWJob29rc1F1ZXJ5KTogUHJvbWlzZTxXZWJob29rTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgcXVlcnkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tMaXN0KTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgaWQ6IFdlYmhvb2tzSWRzKTogUHJvbWlzZTxXZWJob29rPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLFxuICAgIGlkOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgdGVzdCA9IGZhbHNlKTogUHJvbWlzZTxXZWJob29rIHwgVmFsaWRhdGlvblJlc3BvbnNlPiB7XG4gICAgaWYgKHRlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCwgJ3Rlc3QnKSwgeyB1cmwgfSlcbiAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rVGVzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgeyBpZCwgdXJsIH0pXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBQcm9taXNlPFdlYmhvb2s+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpLCB7IHVybCB9KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nKSA6IFByb21pc2U8V2ViaG9vaz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxufVxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9iYXNlNjQgdjEuMC4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMS4wLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG52YXIgU3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJykuU3RyZWFtO1xudmFyIERlbGF5ZWRTdHJlYW0gPSByZXF1aXJlKCdkZWxheWVkLXN0cmVhbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbWJpbmVkU3RyZWFtO1xuZnVuY3Rpb24gQ29tYmluZWRTdHJlYW0oKSB7XG4gIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgdGhpcy5yZWFkYWJsZSA9IHRydWU7XG4gIHRoaXMuZGF0YVNpemUgPSAwO1xuICB0aGlzLm1heERhdGFTaXplID0gMiAqIDEwMjQgKiAxMDI0O1xuICB0aGlzLnBhdXNlU3RyZWFtcyA9IHRydWU7XG5cbiAgdGhpcy5fcmVsZWFzZWQgPSBmYWxzZTtcbiAgdGhpcy5fc3RyZWFtcyA9IFtdO1xuICB0aGlzLl9jdXJyZW50U3RyZWFtID0gbnVsbDtcbiAgdGhpcy5faW5zaWRlTG9vcCA9IGZhbHNlO1xuICB0aGlzLl9wZW5kaW5nTmV4dCA9IGZhbHNlO1xufVxudXRpbC5pbmhlcml0cyhDb21iaW5lZFN0cmVhbSwgU3RyZWFtKTtcblxuQ29tYmluZWRTdHJlYW0uY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgY29tYmluZWRTdHJlYW0gPSBuZXcgdGhpcygpO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBmb3IgKHZhciBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgIGNvbWJpbmVkU3RyZWFtW29wdGlvbl0gPSBvcHRpb25zW29wdGlvbl07XG4gIH1cblxuICByZXR1cm4gY29tYmluZWRTdHJlYW07XG59O1xuXG5Db21iaW5lZFN0cmVhbS5pc1N0cmVhbUxpa2UgPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgcmV0dXJuICh0eXBlb2Ygc3RyZWFtICE9PSAnZnVuY3Rpb24nKVxuICAgICYmICh0eXBlb2Ygc3RyZWFtICE9PSAnc3RyaW5nJylcbiAgICAmJiAodHlwZW9mIHN0cmVhbSAhPT0gJ2Jvb2xlYW4nKVxuICAgICYmICh0eXBlb2Ygc3RyZWFtICE9PSAnbnVtYmVyJylcbiAgICAmJiAoIUJ1ZmZlci5pc0J1ZmZlcihzdHJlYW0pKTtcbn07XG5cbkNvbWJpbmVkU3RyZWFtLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgdmFyIGlzU3RyZWFtTGlrZSA9IENvbWJpbmVkU3RyZWFtLmlzU3RyZWFtTGlrZShzdHJlYW0pO1xuXG4gIGlmIChpc1N0cmVhbUxpa2UpIHtcbiAgICBpZiAoIShzdHJlYW0gaW5zdGFuY2VvZiBEZWxheWVkU3RyZWFtKSkge1xuICAgICAgdmFyIG5ld1N0cmVhbSA9IERlbGF5ZWRTdHJlYW0uY3JlYXRlKHN0cmVhbSwge1xuICAgICAgICBtYXhEYXRhU2l6ZTogSW5maW5pdHksXG4gICAgICAgIHBhdXNlU3RyZWFtOiB0aGlzLnBhdXNlU3RyZWFtcyxcbiAgICAgIH0pO1xuICAgICAgc3RyZWFtLm9uKCdkYXRhJywgdGhpcy5fY2hlY2tEYXRhU2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHN0cmVhbSA9IG5ld1N0cmVhbTtcbiAgICB9XG5cbiAgICB0aGlzLl9oYW5kbGVFcnJvcnMoc3RyZWFtKTtcblxuICAgIGlmICh0aGlzLnBhdXNlU3RyZWFtcykge1xuICAgICAgc3RyZWFtLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5fc3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbihkZXN0LCBvcHRpb25zKSB7XG4gIFN0cmVhbS5wcm90b3R5cGUucGlwZS5jYWxsKHRoaXMsIGRlc3QsIG9wdGlvbnMpO1xuICB0aGlzLnJlc3VtZSgpO1xuICByZXR1cm4gZGVzdDtcbn07XG5cbkNvbWJpbmVkU3RyZWFtLnByb3RvdHlwZS5fZ2V0TmV4dCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jdXJyZW50U3RyZWFtID0gbnVsbDtcblxuICBpZiAodGhpcy5faW5zaWRlTG9vcCkge1xuICAgIHRoaXMuX3BlbmRpbmdOZXh0ID0gdHJ1ZTtcbiAgICByZXR1cm47IC8vIGRlZmVyIGNhbGxcbiAgfVxuXG4gIHRoaXMuX2luc2lkZUxvb3AgPSB0cnVlO1xuICB0cnkge1xuICAgIGRvIHtcbiAgICAgIHRoaXMuX3BlbmRpbmdOZXh0ID0gZmFsc2U7XG4gICAgICB0aGlzLl9yZWFsR2V0TmV4dCgpO1xuICAgIH0gd2hpbGUgKHRoaXMuX3BlbmRpbmdOZXh0KTtcbiAgfSBmaW5hbGx5IHtcbiAgICB0aGlzLl9pbnNpZGVMb29wID0gZmFsc2U7XG4gIH1cbn07XG5cbkNvbWJpbmVkU3RyZWFtLnByb3RvdHlwZS5fcmVhbEdldE5leHQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN0cmVhbSA9IHRoaXMuX3N0cmVhbXMuc2hpZnQoKTtcblxuXG4gIGlmICh0eXBlb2Ygc3RyZWFtID09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy5lbmQoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodHlwZW9mIHN0cmVhbSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMuX3BpcGVOZXh0KHN0cmVhbSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGdldFN0cmVhbSA9IHN0cmVhbTtcbiAgZ2V0U3RyZWFtKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgIHZhciBpc1N0cmVhbUxpa2UgPSBDb21iaW5lZFN0cmVhbS5pc1N0cmVhbUxpa2Uoc3RyZWFtKTtcbiAgICBpZiAoaXNTdHJlYW1MaWtlKSB7XG4gICAgICBzdHJlYW0ub24oJ2RhdGEnLCB0aGlzLl9jaGVja0RhdGFTaXplLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5faGFuZGxlRXJyb3JzKHN0cmVhbSk7XG4gICAgfVxuXG4gICAgdGhpcy5fcGlwZU5leHQoc3RyZWFtKTtcbiAgfS5iaW5kKHRoaXMpKTtcbn07XG5cbkNvbWJpbmVkU3RyZWFtLnByb3RvdHlwZS5fcGlwZU5leHQgPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgdGhpcy5fY3VycmVudFN0cmVhbSA9IHN0cmVhbTtcblxuICB2YXIgaXNTdHJlYW1MaWtlID0gQ29tYmluZWRTdHJlYW0uaXNTdHJlYW1MaWtlKHN0cmVhbSk7XG4gIGlmIChpc1N0cmVhbUxpa2UpIHtcbiAgICBzdHJlYW0ub24oJ2VuZCcsIHRoaXMuX2dldE5leHQuYmluZCh0aGlzKSk7XG4gICAgc3RyZWFtLnBpcGUodGhpcywge2VuZDogZmFsc2V9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdmFsdWUgPSBzdHJlYW07XG4gIHRoaXMud3JpdGUodmFsdWUpO1xuICB0aGlzLl9nZXROZXh0KCk7XG59O1xuXG5Db21iaW5lZFN0cmVhbS5wcm90b3R5cGUuX2hhbmRsZUVycm9ycyA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHN0cmVhbS5vbignZXJyb3InLCBmdW5jdGlvbihlcnIpIHtcbiAgICBzZWxmLl9lbWl0RXJyb3IoZXJyKTtcbiAgfSk7XG59O1xuXG5Db21iaW5lZFN0cmVhbS5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHRoaXMuZW1pdCgnZGF0YScsIGRhdGEpO1xufTtcblxuQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5wYXVzZVN0cmVhbXMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZih0aGlzLnBhdXNlU3RyZWFtcyAmJiB0aGlzLl9jdXJyZW50U3RyZWFtICYmIHR5cGVvZih0aGlzLl9jdXJyZW50U3RyZWFtLnBhdXNlKSA9PSAnZnVuY3Rpb24nKSB0aGlzLl9jdXJyZW50U3RyZWFtLnBhdXNlKCk7XG4gIHRoaXMuZW1pdCgncGF1c2UnKTtcbn07XG5cbkNvbWJpbmVkU3RyZWFtLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLl9yZWxlYXNlZCkge1xuICAgIHRoaXMuX3JlbGVhc2VkID0gdHJ1ZTtcbiAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLl9nZXROZXh0KCk7XG4gIH1cblxuICBpZih0aGlzLnBhdXNlU3RyZWFtcyAmJiB0aGlzLl9jdXJyZW50U3RyZWFtICYmIHR5cGVvZih0aGlzLl9jdXJyZW50U3RyZWFtLnJlc3VtZSkgPT0gJ2Z1bmN0aW9uJykgdGhpcy5fY3VycmVudFN0cmVhbS5yZXN1bWUoKTtcbiAgdGhpcy5lbWl0KCdyZXN1bWUnKTtcbn07XG5cbkNvbWJpbmVkU3RyZWFtLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fcmVzZXQoKTtcbiAgdGhpcy5lbWl0KCdlbmQnKTtcbn07XG5cbkNvbWJpbmVkU3RyZWFtLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3Jlc2V0KCk7XG4gIHRoaXMuZW1pdCgnY2xvc2UnKTtcbn07XG5cbkNvbWJpbmVkU3RyZWFtLnByb3RvdHlwZS5fcmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICB0aGlzLl9zdHJlYW1zID0gW107XG4gIHRoaXMuX2N1cnJlbnRTdHJlYW0gPSBudWxsO1xufTtcblxuQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLl9jaGVja0RhdGFTaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3VwZGF0ZURhdGFTaXplKCk7XG4gIGlmICh0aGlzLmRhdGFTaXplIDw9IHRoaXMubWF4RGF0YVNpemUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbWVzc2FnZSA9XG4gICAgJ0RlbGF5ZWRTdHJlYW0jbWF4RGF0YVNpemUgb2YgJyArIHRoaXMubWF4RGF0YVNpemUgKyAnIGJ5dGVzIGV4Y2VlZGVkLic7XG4gIHRoaXMuX2VtaXRFcnJvcihuZXcgRXJyb3IobWVzc2FnZSkpO1xufTtcblxuQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLl91cGRhdGVEYXRhU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRhdGFTaXplID0gMDtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX3N0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcbiAgICBpZiAoIXN0cmVhbS5kYXRhU2l6ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNlbGYuZGF0YVNpemUgKz0gc3RyZWFtLmRhdGFTaXplO1xuICB9KTtcblxuICBpZiAodGhpcy5fY3VycmVudFN0cmVhbSAmJiB0aGlzLl9jdXJyZW50U3RyZWFtLmRhdGFTaXplKSB7XG4gICAgdGhpcy5kYXRhU2l6ZSArPSB0aGlzLl9jdXJyZW50U3RyZWFtLmRhdGFTaXplO1xuICB9XG59O1xuXG5Db21iaW5lZFN0cmVhbS5wcm90b3R5cGUuX2VtaXRFcnJvciA9IGZ1bmN0aW9uKGVycikge1xuICB0aGlzLl9yZXNldCgpO1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbn07XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSBsb2NhbHN0b3JhZ2UoKTtcbmV4cG9ydHMuZGVzdHJveSA9ICgoKSA9PiB7XG5cdGxldCB3YXJuZWQgPSBmYWxzZTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGlmICghd2FybmVkKSB7XG5cdFx0XHR3YXJuZWQgPSB0cnVlO1xuXHRcdFx0Y29uc29sZS53YXJuKCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJyk7XG5cdFx0fVxuXHR9O1xufSkoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG5cdCcjMDAwMENDJyxcblx0JyMwMDAwRkYnLFxuXHQnIzAwMzNDQycsXG5cdCcjMDAzM0ZGJyxcblx0JyMwMDY2Q0MnLFxuXHQnIzAwNjZGRicsXG5cdCcjMDA5OUNDJyxcblx0JyMwMDk5RkYnLFxuXHQnIzAwQ0MwMCcsXG5cdCcjMDBDQzMzJyxcblx0JyMwMENDNjYnLFxuXHQnIzAwQ0M5OScsXG5cdCcjMDBDQ0NDJyxcblx0JyMwMENDRkYnLFxuXHQnIzMzMDBDQycsXG5cdCcjMzMwMEZGJyxcblx0JyMzMzMzQ0MnLFxuXHQnIzMzMzNGRicsXG5cdCcjMzM2NkNDJyxcblx0JyMzMzY2RkYnLFxuXHQnIzMzOTlDQycsXG5cdCcjMzM5OUZGJyxcblx0JyMzM0NDMDAnLFxuXHQnIzMzQ0MzMycsXG5cdCcjMzNDQzY2Jyxcblx0JyMzM0NDOTknLFxuXHQnIzMzQ0NDQycsXG5cdCcjMzNDQ0ZGJyxcblx0JyM2NjAwQ0MnLFxuXHQnIzY2MDBGRicsXG5cdCcjNjYzM0NDJyxcblx0JyM2NjMzRkYnLFxuXHQnIzY2Q0MwMCcsXG5cdCcjNjZDQzMzJyxcblx0JyM5OTAwQ0MnLFxuXHQnIzk5MDBGRicsXG5cdCcjOTkzM0NDJyxcblx0JyM5OTMzRkYnLFxuXHQnIzk5Q0MwMCcsXG5cdCcjOTlDQzMzJyxcblx0JyNDQzAwMDAnLFxuXHQnI0NDMDAzMycsXG5cdCcjQ0MwMDY2Jyxcblx0JyNDQzAwOTknLFxuXHQnI0NDMDBDQycsXG5cdCcjQ0MwMEZGJyxcblx0JyNDQzMzMDAnLFxuXHQnI0NDMzMzMycsXG5cdCcjQ0MzMzY2Jyxcblx0JyNDQzMzOTknLFxuXHQnI0NDMzNDQycsXG5cdCcjQ0MzM0ZGJyxcblx0JyNDQzY2MDAnLFxuXHQnI0NDNjYzMycsXG5cdCcjQ0M5OTAwJyxcblx0JyNDQzk5MzMnLFxuXHQnI0NDQ0MwMCcsXG5cdCcjQ0NDQzMzJyxcblx0JyNGRjAwMDAnLFxuXHQnI0ZGMDAzMycsXG5cdCcjRkYwMDY2Jyxcblx0JyNGRjAwOTknLFxuXHQnI0ZGMDBDQycsXG5cdCcjRkYwMEZGJyxcblx0JyNGRjMzMDAnLFxuXHQnI0ZGMzMzMycsXG5cdCcjRkYzMzY2Jyxcblx0JyNGRjMzOTknLFxuXHQnI0ZGMzNDQycsXG5cdCcjRkYzM0ZGJyxcblx0JyNGRjY2MDAnLFxuXHQnI0ZGNjYzMycsXG5cdCcjRkY5OTAwJyxcblx0JyNGRjk5MzMnLFxuXHQnI0ZGQ0MwMCcsXG5cdCcjRkZDQzMzJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuXHQvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG5cdC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG5cdC8vIGV4cGxpY2l0bHlcblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmICh3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInIHx8IHdpbmRvdy5wcm9jZXNzLl9fbndqcykpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cblx0aWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gSXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcblx0Ly8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcblx0cmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG5cdFx0Ly8gSXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuXHRcdCh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG5cdFx0Ly8gSXMgZmlyZWZveCA+PSB2MzE/XG5cdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG5cdFx0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG5cdFx0Ly8gRG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuXHRcdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG5cdGFyZ3NbMF0gPSAodGhpcy51c2VDb2xvcnMgPyAnJWMnIDogJycpICtcblx0XHR0aGlzLm5hbWVzcGFjZSArXG5cdFx0KHRoaXMudXNlQ29sb3JzID8gJyAlYycgOiAnICcpICtcblx0XHRhcmdzWzBdICtcblx0XHQodGhpcy51c2VDb2xvcnMgPyAnJWMgJyA6ICcgJykgK1xuXHRcdCcrJyArIG1vZHVsZS5leHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cblx0aWYgKCF0aGlzLnVzZUNvbG9ycykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuXHRhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKTtcblxuXHQvLyBUaGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuXHQvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG5cdC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuXHRsZXQgaW5kZXggPSAwO1xuXHRsZXQgbGFzdEMgPSAwO1xuXHRhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgbWF0Y2ggPT4ge1xuXHRcdGlmIChtYXRjaCA9PT0gJyUlJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpbmRleCsrO1xuXHRcdGlmIChtYXRjaCA9PT0gJyVjJykge1xuXHRcdFx0Ly8gV2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG5cdFx0XHQvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuXHRcdFx0bGFzdEMgPSBpbmRleDtcblx0XHR9XG5cdH0pO1xuXG5cdGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmRlYnVnKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5kZWJ1Z2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICogSWYgYGNvbnNvbGUuZGVidWdgIGlzIG5vdCBhdmFpbGFibGUsIGZhbGxzIGJhY2tcbiAqIHRvIGBjb25zb2xlLmxvZ2AuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0cy5sb2cgPSBjb25zb2xlLmRlYnVnIHx8IGNvbnNvbGUubG9nIHx8ICgoKSA9PiB7fSk7XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcblx0dHJ5IHtcblx0XHRpZiAobmFtZXNwYWNlcykge1xuXHRcdFx0ZXhwb3J0cy5zdG9yYWdlLnNldEl0ZW0oJ2RlYnVnJywgbmFtZXNwYWNlcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbG9hZCgpIHtcblx0bGV0IHI7XG5cdHRyeSB7XG5cdFx0ciA9IGV4cG9ydHMuc3RvcmFnZS5nZXRJdGVtKCdkZWJ1ZycpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxuXG5cdC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcblx0aWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG5cdFx0ciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuXHR9XG5cblx0cmV0dXJuIHI7XG59XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuXHR0cnkge1xuXHRcdC8vIFRWTUxLaXQgKEFwcGxlIFRWIEpTIFJ1bnRpbWUpIGRvZXMgbm90IGhhdmUgYSB3aW5kb3cgb2JqZWN0LCBqdXN0IGxvY2FsU3RvcmFnZSBpbiB0aGUgZ2xvYmFsIGNvbnRleHRcblx0XHQvLyBUaGUgQnJvd3NlciBhbHNvIGhhcyBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0LlxuXHRcdHJldHVybiBsb2NhbFN0b3JhZ2U7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uICh2KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnJvci5tZXNzYWdlO1xuXHR9XG59O1xuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKi9cblxuZnVuY3Rpb24gc2V0dXAoZW52KSB7XG5cdGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmRlZmF1bHQgPSBjcmVhdGVEZWJ1Zztcblx0Y3JlYXRlRGVidWcuY29lcmNlID0gY29lcmNlO1xuXHRjcmVhdGVEZWJ1Zy5kaXNhYmxlID0gZGlzYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlID0gZW5hYmxlO1xuXHRjcmVhdGVEZWJ1Zy5lbmFibGVkID0gZW5hYmxlZDtcblx0Y3JlYXRlRGVidWcuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXHRjcmVhdGVEZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuXHRPYmplY3Qua2V5cyhlbnYpLmZvckVhY2goa2V5ID0+IHtcblx0XHRjcmVhdGVEZWJ1Z1trZXldID0gZW52W2tleV07XG5cdH0pO1xuXG5cdC8qKlxuXHQqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuXHQqL1xuXG5cdGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG5cdGNyZWF0ZURlYnVnLnNraXBzID0gW107XG5cblx0LyoqXG5cdCogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuXHQqXG5cdCogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuXHQqL1xuXHRjcmVhdGVEZWJ1Zy5mb3JtYXR0ZXJzID0ge307XG5cblx0LyoqXG5cdCogU2VsZWN0cyBhIGNvbG9yIGZvciBhIGRlYnVnIG5hbWVzcGFjZVxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZSBzdHJpbmcgZm9yIHRoZSBkZWJ1ZyBpbnN0YW5jZSB0byBiZSBjb2xvcmVkXG5cdCogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gQW4gQU5TSSBjb2xvciBjb2RlIGZvciB0aGUgZ2l2ZW4gbmFtZXNwYWNlXG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuXHRcdGxldCBoYXNoID0gMDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcblx0XHRcdGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNyZWF0ZURlYnVnLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGNyZWF0ZURlYnVnLmNvbG9ycy5sZW5ndGhdO1xuXHR9XG5cdGNyZWF0ZURlYnVnLnNlbGVjdENvbG9yID0gc2VsZWN0Q29sb3I7XG5cblx0LyoqXG5cdCogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCogQHJldHVybiB7RnVuY3Rpb259XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cdFx0bGV0IHByZXZUaW1lO1xuXHRcdGxldCBlbmFibGVPdmVycmlkZSA9IG51bGw7XG5cdFx0bGV0IG5hbWVzcGFjZXNDYWNoZTtcblx0XHRsZXQgZW5hYmxlZENhY2hlO1xuXG5cdFx0ZnVuY3Rpb24gZGVidWcoLi4uYXJncykge1xuXHRcdFx0Ly8gRGlzYWJsZWQ/XG5cdFx0XHRpZiAoIWRlYnVnLmVuYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzZWxmID0gZGVidWc7XG5cblx0XHRcdC8vIFNldCBgZGlmZmAgdGltZXN0YW1wXG5cdFx0XHRjb25zdCBjdXJyID0gTnVtYmVyKG5ldyBEYXRlKCkpO1xuXHRcdFx0Y29uc3QgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuXHRcdFx0c2VsZi5kaWZmID0gbXM7XG5cdFx0XHRzZWxmLnByZXYgPSBwcmV2VGltZTtcblx0XHRcdHNlbGYuY3VyciA9IGN1cnI7XG5cdFx0XHRwcmV2VGltZSA9IGN1cnI7XG5cblx0XHRcdGFyZ3NbMF0gPSBjcmVhdGVEZWJ1Zy5jb2VyY2UoYXJnc1swXSk7XG5cblx0XHRcdGlmICh0eXBlb2YgYXJnc1swXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0Ly8gQW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cblx0XHRcdFx0YXJncy51bnNoaWZ0KCclTycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuXHRcdFx0bGV0IGluZGV4ID0gMDtcblx0XHRcdGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCAobWF0Y2gsIGZvcm1hdCkgPT4ge1xuXHRcdFx0XHQvLyBJZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG5cdFx0XHRcdGlmIChtYXRjaCA9PT0gJyUlJykge1xuXHRcdFx0XHRcdHJldHVybiAnJSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0aW5kZXgrKztcblx0XHRcdFx0Y29uc3QgZm9ybWF0dGVyID0gY3JlYXRlRGVidWcuZm9ybWF0dGVyc1tmb3JtYXRdO1xuXHRcdFx0XHRpZiAodHlwZW9mIGZvcm1hdHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdGNvbnN0IHZhbCA9IGFyZ3NbaW5kZXhdO1xuXHRcdFx0XHRcdG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuXHRcdFx0XHRcdC8vIE5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcblx0XHRcdFx0XHRhcmdzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0aW5kZXgtLTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcblx0XHRcdGNyZWF0ZURlYnVnLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuXHRcdFx0Y29uc3QgbG9nRm4gPSBzZWxmLmxvZyB8fCBjcmVhdGVEZWJ1Zy5sb2c7XG5cdFx0XHRsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcblx0XHR9XG5cblx0XHRkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cdFx0ZGVidWcudXNlQ29sb3JzID0gY3JlYXRlRGVidWcudXNlQ29sb3JzKCk7XG5cdFx0ZGVidWcuY29sb3IgPSBjcmVhdGVEZWJ1Zy5zZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuXHRcdGRlYnVnLmV4dGVuZCA9IGV4dGVuZDtcblx0XHRkZWJ1Zy5kZXN0cm95ID0gY3JlYXRlRGVidWcuZGVzdHJveTsgLy8gWFhYIFRlbXBvcmFyeS4gV2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVidWcsICdlbmFibGVkJywge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6ICgpID0+IHtcblx0XHRcdFx0aWYgKGVuYWJsZU92ZXJyaWRlICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVuYWJsZU92ZXJyaWRlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChuYW1lc3BhY2VzQ2FjaGUgIT09IGNyZWF0ZURlYnVnLm5hbWVzcGFjZXMpIHtcblx0XHRcdFx0XHRuYW1lc3BhY2VzQ2FjaGUgPSBjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzO1xuXHRcdFx0XHRcdGVuYWJsZWRDYWNoZSA9IGNyZWF0ZURlYnVnLmVuYWJsZWQobmFtZXNwYWNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBlbmFibGVkQ2FjaGU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiB2ID0+IHtcblx0XHRcdFx0ZW5hYmxlT3ZlcnJpZGUgPSB2O1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gRW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcblx0XHRpZiAodHlwZW9mIGNyZWF0ZURlYnVnLmluaXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNyZWF0ZURlYnVnLmluaXQoZGVidWcpO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWJ1Zztcblx0fVxuXG5cdGZ1bmN0aW9uIGV4dGVuZChuYW1lc3BhY2UsIGRlbGltaXRlcikge1xuXHRcdGNvbnN0IG5ld0RlYnVnID0gY3JlYXRlRGVidWcodGhpcy5uYW1lc3BhY2UgKyAodHlwZW9mIGRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyAnOicgOiBkZWxpbWl0ZXIpICsgbmFtZXNwYWNlKTtcblx0XHRuZXdEZWJ1Zy5sb2cgPSB0aGlzLmxvZztcblx0XHRyZXR1cm4gbmV3RGVidWc7XG5cdH1cblxuXHQvKipcblx0KiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG5cdCogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcblx0XHRjcmVhdGVEZWJ1Zy5zYXZlKG5hbWVzcGFjZXMpO1xuXHRcdGNyZWF0ZURlYnVnLm5hbWVzcGFjZXMgPSBuYW1lc3BhY2VzO1xuXG5cdFx0Y3JlYXRlRGVidWcubmFtZXMgPSBbXTtcblx0XHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdFx0bGV0IGk7XG5cdFx0Y29uc3Qgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuXHRcdGNvbnN0IGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKCFzcGxpdFtpXSkge1xuXHRcdFx0XHQvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0bmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG5cblx0XHRcdGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcblx0XHRcdFx0Y3JlYXRlRGVidWcuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc2xpY2UoMSkgKyAnJCcpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNyZWF0ZURlYnVnLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG5cdCpcblx0KiBAcmV0dXJuIHtTdHJpbmd9IG5hbWVzcGFjZXNcblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBkaXNhYmxlKCkge1xuXHRcdGNvbnN0IG5hbWVzcGFjZXMgPSBbXG5cdFx0XHQuLi5jcmVhdGVEZWJ1Zy5uYW1lcy5tYXAodG9OYW1lc3BhY2UpLFxuXHRcdFx0Li4uY3JlYXRlRGVidWcuc2tpcHMubWFwKHRvTmFtZXNwYWNlKS5tYXAobmFtZXNwYWNlID0+ICctJyArIG5hbWVzcGFjZSlcblx0XHRdLmpvaW4oJywnKTtcblx0XHRjcmVhdGVEZWJ1Zy5lbmFibGUoJycpO1xuXHRcdHJldHVybiBuYW1lc3BhY2VzO1xuXHR9XG5cblx0LyoqXG5cdCogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuXHQqXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVcblx0KiBAcmV0dXJuIHtCb29sZWFufVxuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuXHRcdGlmIChuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT09ICcqJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0bGV0IGk7XG5cdFx0bGV0IGxlbjtcblxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNyZWF0ZURlYnVnLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoY3JlYXRlRGVidWcuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY3JlYXRlRGVidWcubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChjcmVhdGVEZWJ1Zy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQqIENvbnZlcnQgcmVnZXhwIHRvIG5hbWVzcGFjZVxuXHQqXG5cdCogQHBhcmFtIHtSZWdFeHB9IHJlZ3hlcFxuXHQqIEByZXR1cm4ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIHRvTmFtZXNwYWNlKHJlZ2V4cCkge1xuXHRcdHJldHVybiByZWdleHAudG9TdHJpbmcoKVxuXHRcdFx0LnN1YnN0cmluZygyLCByZWdleHAudG9TdHJpbmcoKS5sZW5ndGggLSAyKVxuXHRcdFx0LnJlcGxhY2UoL1xcLlxcKlxcPyQvLCAnKicpO1xuXHR9XG5cblx0LyoqXG5cdCogQ29lcmNlIGB2YWxgLlxuXHQqXG5cdCogQHBhcmFtIHtNaXhlZH0gdmFsXG5cdCogQHJldHVybiB7TWl4ZWR9XG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcblx0XHRpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRcdHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG5cdFx0fVxuXHRcdHJldHVybiB2YWw7XG5cdH1cblxuXHQvKipcblx0KiBYWFggRE8gTk9UIFVTRS4gVGhpcyBpcyBhIHRlbXBvcmFyeSBzdHViIGZ1bmN0aW9uLlxuXHQqIFhYWCBJdCBXSUxMIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgcmVsZWFzZS5cblx0Ki9cblx0ZnVuY3Rpb24gZGVzdHJveSgpIHtcblx0XHRjb25zb2xlLndhcm4oJ0luc3RhbmNlIG1ldGhvZCBgZGVidWcuZGVzdHJveSgpYCBpcyBkZXByZWNhdGVkIGFuZCBubyBsb25nZXIgZG9lcyBhbnl0aGluZy4gSXQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24gb2YgYGRlYnVnYC4nKTtcblx0fVxuXG5cdGNyZWF0ZURlYnVnLmVuYWJsZShjcmVhdGVEZWJ1Zy5sb2FkKCkpO1xuXG5cdHJldHVybiBjcmVhdGVEZWJ1Zztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXR1cDtcbiIsIi8qKlxuICogRGV0ZWN0IEVsZWN0cm9uIHJlbmRlcmVyIC8gbndqcyBwcm9jZXNzLCB3aGljaCBpcyBub2RlLCBidXQgd2Ugc2hvdWxkXG4gKiB0cmVhdCBhcyBhIGJyb3dzZXIuXG4gKi9cblxuaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJyB8fCBwcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicgfHwgcHJvY2Vzcy5icm93c2VyID09PSB0cnVlIHx8IHByb2Nlc3MuX19ud2pzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9icm93c2VyLmpzJyk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbm9kZS5qcycpO1xufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmNvbnN0IHR0eSA9IHJlcXVpcmUoJ3R0eScpO1xuY29uc3QgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBOb2RlLmpzIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqL1xuXG5leHBvcnRzLmluaXQgPSBpbml0O1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuZGVzdHJveSA9IHV0aWwuZGVwcmVjYXRlKFxuXHQoKSA9PiB7fSxcblx0J0luc3RhbmNlIG1ldGhvZCBgZGVidWcuZGVzdHJveSgpYCBpcyBkZXByZWNhdGVkIGFuZCBubyBsb25nZXIgZG9lcyBhbnl0aGluZy4gSXQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24gb2YgYGRlYnVnYC4nXG4pO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFs2LCAyLCAzLCA0LCA1LCAxXTtcblxudHJ5IHtcblx0Ly8gT3B0aW9uYWwgZGVwZW5kZW5jeSAoYXMgaW4sIGRvZXNuJ3QgbmVlZCB0byBiZSBpbnN0YWxsZWQsIE5PVCBsaWtlIG9wdGlvbmFsRGVwZW5kZW5jaWVzIGluIHBhY2thZ2UuanNvbilcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuXHRjb25zdCBzdXBwb3J0c0NvbG9yID0gcmVxdWlyZSgnc3VwcG9ydHMtY29sb3InKTtcblxuXHRpZiAoc3VwcG9ydHNDb2xvciAmJiAoc3VwcG9ydHNDb2xvci5zdGRlcnIgfHwgc3VwcG9ydHNDb2xvcikubGV2ZWwgPj0gMikge1xuXHRcdGV4cG9ydHMuY29sb3JzID0gW1xuXHRcdFx0MjAsXG5cdFx0XHQyMSxcblx0XHRcdDI2LFxuXHRcdFx0MjcsXG5cdFx0XHQzMixcblx0XHRcdDMzLFxuXHRcdFx0MzgsXG5cdFx0XHQzOSxcblx0XHRcdDQwLFxuXHRcdFx0NDEsXG5cdFx0XHQ0Mixcblx0XHRcdDQzLFxuXHRcdFx0NDQsXG5cdFx0XHQ0NSxcblx0XHRcdDU2LFxuXHRcdFx0NTcsXG5cdFx0XHQ2Mixcblx0XHRcdDYzLFxuXHRcdFx0NjgsXG5cdFx0XHQ2OSxcblx0XHRcdDc0LFxuXHRcdFx0NzUsXG5cdFx0XHQ3Nixcblx0XHRcdDc3LFxuXHRcdFx0NzgsXG5cdFx0XHQ3OSxcblx0XHRcdDgwLFxuXHRcdFx0ODEsXG5cdFx0XHQ5Mixcblx0XHRcdDkzLFxuXHRcdFx0OTgsXG5cdFx0XHQ5OSxcblx0XHRcdDExMixcblx0XHRcdDExMyxcblx0XHRcdDEyOCxcblx0XHRcdDEyOSxcblx0XHRcdDEzNCxcblx0XHRcdDEzNSxcblx0XHRcdDE0OCxcblx0XHRcdDE0OSxcblx0XHRcdDE2MCxcblx0XHRcdDE2MSxcblx0XHRcdDE2Mixcblx0XHRcdDE2Myxcblx0XHRcdDE2NCxcblx0XHRcdDE2NSxcblx0XHRcdDE2Nixcblx0XHRcdDE2Nyxcblx0XHRcdDE2OCxcblx0XHRcdDE2OSxcblx0XHRcdDE3MCxcblx0XHRcdDE3MSxcblx0XHRcdDE3Mixcblx0XHRcdDE3Myxcblx0XHRcdDE3OCxcblx0XHRcdDE3OSxcblx0XHRcdDE4NCxcblx0XHRcdDE4NSxcblx0XHRcdDE5Nixcblx0XHRcdDE5Nyxcblx0XHRcdDE5OCxcblx0XHRcdDE5OSxcblx0XHRcdDIwMCxcblx0XHRcdDIwMSxcblx0XHRcdDIwMixcblx0XHRcdDIwMyxcblx0XHRcdDIwNCxcblx0XHRcdDIwNSxcblx0XHRcdDIwNixcblx0XHRcdDIwNyxcblx0XHRcdDIwOCxcblx0XHRcdDIwOSxcblx0XHRcdDIxNCxcblx0XHRcdDIxNSxcblx0XHRcdDIyMCxcblx0XHRcdDIyMVxuXHRcdF07XG5cdH1cbn0gY2F0Y2ggKGVycm9yKSB7XG5cdC8vIFN3YWxsb3cgLSB3ZSBvbmx5IGNhcmUgaWYgYHN1cHBvcnRzLWNvbG9yYCBpcyBhdmFpbGFibGU7IGl0IGRvZXNuJ3QgaGF2ZSB0byBiZS5cbn1cblxuLyoqXG4gKiBCdWlsZCB1cCB0aGUgZGVmYXVsdCBgaW5zcGVjdE9wdHNgIG9iamVjdCBmcm9tIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gKlxuICogICAkIERFQlVHX0NPTE9SUz1ubyBERUJVR19ERVBUSD0xMCBERUJVR19TSE9XX0hJRERFTj1lbmFibGVkIG5vZGUgc2NyaXB0LmpzXG4gKi9cblxuZXhwb3J0cy5pbnNwZWN0T3B0cyA9IE9iamVjdC5rZXlzKHByb2Nlc3MuZW52KS5maWx0ZXIoa2V5ID0+IHtcblx0cmV0dXJuIC9eZGVidWdfL2kudGVzdChrZXkpO1xufSkucmVkdWNlKChvYmosIGtleSkgPT4ge1xuXHQvLyBDYW1lbC1jYXNlXG5cdGNvbnN0IHByb3AgPSBrZXlcblx0XHQuc3Vic3RyaW5nKDYpXG5cdFx0LnRvTG93ZXJDYXNlKClcblx0XHQucmVwbGFjZSgvXyhbYS16XSkvZywgKF8sIGspID0+IHtcblx0XHRcdHJldHVybiBrLnRvVXBwZXJDYXNlKCk7XG5cdFx0fSk7XG5cblx0Ly8gQ29lcmNlIHN0cmluZyB2YWx1ZSBpbnRvIEpTIHZhbHVlXG5cdGxldCB2YWwgPSBwcm9jZXNzLmVudltrZXldO1xuXHRpZiAoL14oeWVzfG9ufHRydWV8ZW5hYmxlZCkkL2kudGVzdCh2YWwpKSB7XG5cdFx0dmFsID0gdHJ1ZTtcblx0fSBlbHNlIGlmICgvXihub3xvZmZ8ZmFsc2V8ZGlzYWJsZWQpJC9pLnRlc3QodmFsKSkge1xuXHRcdHZhbCA9IGZhbHNlO1xuXHR9IGVsc2UgaWYgKHZhbCA9PT0gJ251bGwnKSB7XG5cdFx0dmFsID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHR2YWwgPSBOdW1iZXIodmFsKTtcblx0fVxuXG5cdG9ialtwcm9wXSA9IHZhbDtcblx0cmV0dXJuIG9iajtcbn0sIHt9KTtcblxuLyoqXG4gKiBJcyBzdGRvdXQgYSBUVFk/IENvbG9yZWQgb3V0cHV0IGlzIGVuYWJsZWQgd2hlbiBgdHJ1ZWAuXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuXHRyZXR1cm4gJ2NvbG9ycycgaW4gZXhwb3J0cy5pbnNwZWN0T3B0cyA/XG5cdFx0Qm9vbGVhbihleHBvcnRzLmluc3BlY3RPcHRzLmNvbG9ycykgOlxuXHRcdHR0eS5pc2F0dHkocHJvY2Vzcy5zdGRlcnIuZmQpO1xufVxuXG4vKipcbiAqIEFkZHMgQU5TSSBjb2xvciBlc2NhcGUgY29kZXMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuXHRjb25zdCB7bmFtZXNwYWNlOiBuYW1lLCB1c2VDb2xvcnN9ID0gdGhpcztcblxuXHRpZiAodXNlQ29sb3JzKSB7XG5cdFx0Y29uc3QgYyA9IHRoaXMuY29sb3I7XG5cdFx0Y29uc3QgY29sb3JDb2RlID0gJ1xcdTAwMUJbMycgKyAoYyA8IDggPyBjIDogJzg7NTsnICsgYyk7XG5cdFx0Y29uc3QgcHJlZml4ID0gYCAgJHtjb2xvckNvZGV9OzFtJHtuYW1lfSBcXHUwMDFCWzBtYDtcblxuXHRcdGFyZ3NbMF0gPSBwcmVmaXggKyBhcmdzWzBdLnNwbGl0KCdcXG4nKS5qb2luKCdcXG4nICsgcHJlZml4KTtcblx0XHRhcmdzLnB1c2goY29sb3JDb2RlICsgJ20rJyArIG1vZHVsZS5leHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZikgKyAnXFx1MDAxQlswbScpO1xuXHR9IGVsc2Uge1xuXHRcdGFyZ3NbMF0gPSBnZXREYXRlKCkgKyBuYW1lICsgJyAnICsgYXJnc1swXTtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXREYXRlKCkge1xuXHRpZiAoZXhwb3J0cy5pbnNwZWN0T3B0cy5oaWRlRGF0ZSkge1xuXHRcdHJldHVybiAnJztcblx0fVxuXHRyZXR1cm4gbmV3IERhdGUoKS50b0lTT1N0cmluZygpICsgJyAnO1xufVxuXG4vKipcbiAqIEludm9rZXMgYHV0aWwuZm9ybWF0KClgIHdpdGggdGhlIHNwZWNpZmllZCBhcmd1bWVudHMgYW5kIHdyaXRlcyB0byBzdGRlcnIuXG4gKi9cblxuZnVuY3Rpb24gbG9nKC4uLmFyZ3MpIHtcblx0cmV0dXJuIHByb2Nlc3Muc3RkZXJyLndyaXRlKHV0aWwuZm9ybWF0KC4uLmFyZ3MpICsgJ1xcbicpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG5cdGlmIChuYW1lc3BhY2VzKSB7XG5cdFx0cHJvY2Vzcy5lbnYuREVCVUcgPSBuYW1lc3BhY2VzO1xuXHR9IGVsc2Uge1xuXHRcdC8vIElmIHlvdSBzZXQgYSBwcm9jZXNzLmVudiBmaWVsZCB0byBudWxsIG9yIHVuZGVmaW5lZCwgaXQgZ2V0cyBjYXN0IHRvIHRoZVxuXHRcdC8vIHN0cmluZyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuIEp1c3QgZGVsZXRlIGluc3RlYWQuXG5cdFx0ZGVsZXRlIHByb2Nlc3MuZW52LkRFQlVHO1xuXHR9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcblx0cmV0dXJuIHByb2Nlc3MuZW52LkRFQlVHO1xufVxuXG4vKipcbiAqIEluaXQgbG9naWMgZm9yIGBkZWJ1Z2AgaW5zdGFuY2VzLlxuICpcbiAqIENyZWF0ZSBhIG5ldyBgaW5zcGVjdE9wdHNgIG9iamVjdCBpbiBjYXNlIGB1c2VDb2xvcnNgIGlzIHNldFxuICogZGlmZmVyZW50bHkgZm9yIGEgcGFydGljdWxhciBgZGVidWdgIGluc3RhbmNlLlxuICovXG5cbmZ1bmN0aW9uIGluaXQoZGVidWcpIHtcblx0ZGVidWcuaW5zcGVjdE9wdHMgPSB7fTtcblxuXHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5pbnNwZWN0T3B0cyk7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdGRlYnVnLmluc3BlY3RPcHRzW2tleXNbaV1dID0gZXhwb3J0cy5pbnNwZWN0T3B0c1trZXlzW2ldXTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29tbW9uJykoZXhwb3J0cyk7XG5cbmNvbnN0IHtmb3JtYXR0ZXJzfSA9IG1vZHVsZS5leHBvcnRzO1xuXG4vKipcbiAqIE1hcCAlbyB0byBgdXRpbC5pbnNwZWN0KClgLCBhbGwgb24gYSBzaW5nbGUgbGluZS5cbiAqL1xuXG5mb3JtYXR0ZXJzLm8gPSBmdW5jdGlvbiAodikge1xuXHR0aGlzLmluc3BlY3RPcHRzLmNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXHRyZXR1cm4gdXRpbC5pbnNwZWN0KHYsIHRoaXMuaW5zcGVjdE9wdHMpXG5cdFx0LnNwbGl0KCdcXG4nKVxuXHRcdC5tYXAoc3RyID0+IHN0ci50cmltKCkpXG5cdFx0LmpvaW4oJyAnKTtcbn07XG5cbi8qKlxuICogTWFwICVPIHRvIGB1dGlsLmluc3BlY3QoKWAsIGFsbG93aW5nIG11bHRpcGxlIGxpbmVzIGlmIG5lZWRlZC5cbiAqL1xuXG5mb3JtYXR0ZXJzLk8gPSBmdW5jdGlvbiAodikge1xuXHR0aGlzLmluc3BlY3RPcHRzLmNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXHRyZXR1cm4gdXRpbC5pbnNwZWN0KHYsIHRoaXMuaW5zcGVjdE9wdHMpO1xufTtcbiIsInZhciBTdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKS5TdHJlYW07XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEZWxheWVkU3RyZWFtO1xuZnVuY3Rpb24gRGVsYXllZFN0cmVhbSgpIHtcbiAgdGhpcy5zb3VyY2UgPSBudWxsO1xuICB0aGlzLmRhdGFTaXplID0gMDtcbiAgdGhpcy5tYXhEYXRhU2l6ZSA9IDEwMjQgKiAxMDI0O1xuICB0aGlzLnBhdXNlU3RyZWFtID0gdHJ1ZTtcblxuICB0aGlzLl9tYXhEYXRhU2l6ZUV4Y2VlZGVkID0gZmFsc2U7XG4gIHRoaXMuX3JlbGVhc2VkID0gZmFsc2U7XG4gIHRoaXMuX2J1ZmZlcmVkRXZlbnRzID0gW107XG59XG51dGlsLmluaGVyaXRzKERlbGF5ZWRTdHJlYW0sIFN0cmVhbSk7XG5cbkRlbGF5ZWRTdHJlYW0uY3JlYXRlID0gZnVuY3Rpb24oc291cmNlLCBvcHRpb25zKSB7XG4gIHZhciBkZWxheWVkU3RyZWFtID0gbmV3IHRoaXMoKTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgZm9yICh2YXIgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICBkZWxheWVkU3RyZWFtW29wdGlvbl0gPSBvcHRpb25zW29wdGlvbl07XG4gIH1cblxuICBkZWxheWVkU3RyZWFtLnNvdXJjZSA9IHNvdXJjZTtcblxuICB2YXIgcmVhbEVtaXQgPSBzb3VyY2UuZW1pdDtcbiAgc291cmNlLmVtaXQgPSBmdW5jdGlvbigpIHtcbiAgICBkZWxheWVkU3RyZWFtLl9oYW5kbGVFbWl0KGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHJlYWxFbWl0LmFwcGx5KHNvdXJjZSwgYXJndW1lbnRzKTtcbiAgfTtcblxuICBzb3VyY2Uub24oJ2Vycm9yJywgZnVuY3Rpb24oKSB7fSk7XG4gIGlmIChkZWxheWVkU3RyZWFtLnBhdXNlU3RyZWFtKSB7XG4gICAgc291cmNlLnBhdXNlKCk7XG4gIH1cblxuICByZXR1cm4gZGVsYXllZFN0cmVhbTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShEZWxheWVkU3RyZWFtLnByb3RvdHlwZSwgJ3JlYWRhYmxlJywge1xuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlLnJlYWRhYmxlO1xuICB9XG59KTtcblxuRGVsYXllZFN0cmVhbS5wcm90b3R5cGUuc2V0RW5jb2RpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc291cmNlLnNldEVuY29kaW5nLmFwcGx5KHRoaXMuc291cmNlLCBhcmd1bWVudHMpO1xufTtcblxuRGVsYXllZFN0cmVhbS5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5fcmVsZWFzZWQpIHtcbiAgICB0aGlzLnJlbGVhc2UoKTtcbiAgfVxuXG4gIHRoaXMuc291cmNlLnJlc3VtZSgpO1xufTtcblxuRGVsYXllZFN0cmVhbS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zb3VyY2UucGF1c2UoKTtcbn07XG5cbkRlbGF5ZWRTdHJlYW0ucHJvdG90eXBlLnJlbGVhc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fcmVsZWFzZWQgPSB0cnVlO1xuXG4gIHRoaXMuX2J1ZmZlcmVkRXZlbnRzLmZvckVhY2goZnVuY3Rpb24oYXJncykge1xuICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfS5iaW5kKHRoaXMpKTtcbiAgdGhpcy5fYnVmZmVyZWRFdmVudHMgPSBbXTtcbn07XG5cbkRlbGF5ZWRTdHJlYW0ucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHIgPSBTdHJlYW0ucHJvdG90eXBlLnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgdGhpcy5yZXN1bWUoKTtcbiAgcmV0dXJuIHI7XG59O1xuXG5EZWxheWVkU3RyZWFtLnByb3RvdHlwZS5faGFuZGxlRW1pdCA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgaWYgKHRoaXMuX3JlbGVhc2VkKSB7XG4gICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChhcmdzWzBdID09PSAnZGF0YScpIHtcbiAgICB0aGlzLmRhdGFTaXplICs9IGFyZ3NbMV0ubGVuZ3RoO1xuICAgIHRoaXMuX2NoZWNrSWZNYXhEYXRhU2l6ZUV4Y2VlZGVkKCk7XG4gIH1cblxuICB0aGlzLl9idWZmZXJlZEV2ZW50cy5wdXNoKGFyZ3MpO1xufTtcblxuRGVsYXllZFN0cmVhbS5wcm90b3R5cGUuX2NoZWNrSWZNYXhEYXRhU2l6ZUV4Y2VlZGVkID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLl9tYXhEYXRhU2l6ZUV4Y2VlZGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMuZGF0YVNpemUgPD0gdGhpcy5tYXhEYXRhU2l6ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuX21heERhdGFTaXplRXhjZWVkZWQgPSB0cnVlO1xuICB2YXIgbWVzc2FnZSA9XG4gICAgJ0RlbGF5ZWRTdHJlYW0jbWF4RGF0YVNpemUgb2YgJyArIHRoaXMubWF4RGF0YVNpemUgKyAnIGJ5dGVzIGV4Y2VlZGVkLidcbiAgdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcihtZXNzYWdlKSk7XG59O1xuIiwidmFyIGRlYnVnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCFkZWJ1Zykge1xuICAgIHRyeSB7XG4gICAgICAvKiBlc2xpbnQgZ2xvYmFsLXJlcXVpcmU6IG9mZiAqL1xuICAgICAgZGVidWcgPSByZXF1aXJlKFwiZGVidWdcIikoXCJmb2xsb3ctcmVkaXJlY3RzXCIpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHsgLyogKi8gfVxuICAgIGlmICh0eXBlb2YgZGVidWcgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZGVidWcgPSBmdW5jdGlvbiAoKSB7IC8qICovIH07XG4gICAgfVxuICB9XG4gIGRlYnVnLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59O1xuIiwidmFyIHVybCA9IHJlcXVpcmUoXCJ1cmxcIik7XG52YXIgVVJMID0gdXJsLlVSTDtcbnZhciBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG52YXIgaHR0cHMgPSByZXF1aXJlKFwiaHR0cHNcIik7XG52YXIgV3JpdGFibGUgPSByZXF1aXJlKFwic3RyZWFtXCIpLldyaXRhYmxlO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoXCJhc3NlcnRcIik7XG52YXIgZGVidWcgPSByZXF1aXJlKFwiLi9kZWJ1Z1wiKTtcblxuLy8gQ3JlYXRlIGhhbmRsZXJzIHRoYXQgcGFzcyBldmVudHMgZnJvbSBuYXRpdmUgcmVxdWVzdHNcbnZhciBldmVudHMgPSBbXCJhYm9ydFwiLCBcImFib3J0ZWRcIiwgXCJjb25uZWN0XCIsIFwiZXJyb3JcIiwgXCJzb2NrZXRcIiwgXCJ0aW1lb3V0XCJdO1xudmFyIGV2ZW50SGFuZGxlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGV2ZW50SGFuZGxlcnNbZXZlbnRdID0gZnVuY3Rpb24gKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICB0aGlzLl9yZWRpcmVjdGFibGUuZW1pdChldmVudCwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gIH07XG59KTtcblxuLy8gRXJyb3IgdHlwZXMgd2l0aCBjb2Rlc1xudmFyIFJlZGlyZWN0aW9uRXJyb3IgPSBjcmVhdGVFcnJvclR5cGUoXG4gIFwiRVJSX0ZSX1JFRElSRUNUSU9OX0ZBSUxVUkVcIixcbiAgXCJSZWRpcmVjdGVkIHJlcXVlc3QgZmFpbGVkXCJcbik7XG52YXIgVG9vTWFueVJlZGlyZWN0c0Vycm9yID0gY3JlYXRlRXJyb3JUeXBlKFxuICBcIkVSUl9GUl9UT09fTUFOWV9SRURJUkVDVFNcIixcbiAgXCJNYXhpbXVtIG51bWJlciBvZiByZWRpcmVjdHMgZXhjZWVkZWRcIlxuKTtcbnZhciBNYXhCb2R5TGVuZ3RoRXhjZWVkZWRFcnJvciA9IGNyZWF0ZUVycm9yVHlwZShcbiAgXCJFUlJfRlJfTUFYX0JPRFlfTEVOR1RIX0VYQ0VFREVEXCIsXG4gIFwiUmVxdWVzdCBib2R5IGxhcmdlciB0aGFuIG1heEJvZHlMZW5ndGggbGltaXRcIlxuKTtcbnZhciBXcml0ZUFmdGVyRW5kRXJyb3IgPSBjcmVhdGVFcnJvclR5cGUoXG4gIFwiRVJSX1NUUkVBTV9XUklURV9BRlRFUl9FTkRcIixcbiAgXCJ3cml0ZSBhZnRlciBlbmRcIlxuKTtcblxuLy8gQW4gSFRUUChTKSByZXF1ZXN0IHRoYXQgY2FuIGJlIHJlZGlyZWN0ZWRcbmZ1bmN0aW9uIFJlZGlyZWN0YWJsZVJlcXVlc3Qob3B0aW9ucywgcmVzcG9uc2VDYWxsYmFjaykge1xuICAvLyBJbml0aWFsaXplIHRoZSByZXF1ZXN0XG4gIFdyaXRhYmxlLmNhbGwodGhpcyk7XG4gIHRoaXMuX3Nhbml0aXplT3B0aW9ucyhvcHRpb25zKTtcbiAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gIHRoaXMuX2VuZGVkID0gZmFsc2U7XG4gIHRoaXMuX2VuZGluZyA9IGZhbHNlO1xuICB0aGlzLl9yZWRpcmVjdENvdW50ID0gMDtcbiAgdGhpcy5fcmVkaXJlY3RzID0gW107XG4gIHRoaXMuX3JlcXVlc3RCb2R5TGVuZ3RoID0gMDtcbiAgdGhpcy5fcmVxdWVzdEJvZHlCdWZmZXJzID0gW107XG5cbiAgLy8gQXR0YWNoIGEgY2FsbGJhY2sgaWYgcGFzc2VkXG4gIGlmIChyZXNwb25zZUNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihcInJlc3BvbnNlXCIsIHJlc3BvbnNlQ2FsbGJhY2spO1xuICB9XG5cbiAgLy8gUmVhY3QgdG8gcmVzcG9uc2VzIG9mIG5hdGl2ZSByZXF1ZXN0c1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX29uTmF0aXZlUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICBzZWxmLl9wcm9jZXNzUmVzcG9uc2UocmVzcG9uc2UpO1xuICB9O1xuXG4gIC8vIFBlcmZvcm0gdGhlIGZpcnN0IHJlcXVlc3RcbiAgdGhpcy5fcGVyZm9ybVJlcXVlc3QoKTtcbn1cblJlZGlyZWN0YWJsZVJlcXVlc3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShXcml0YWJsZS5wcm90b3R5cGUpO1xuXG5SZWRpcmVjdGFibGVSZXF1ZXN0LnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgYWJvcnRSZXF1ZXN0KHRoaXMuX2N1cnJlbnRSZXF1ZXN0KTtcbiAgdGhpcy5lbWl0KFwiYWJvcnRcIik7XG59O1xuXG4vLyBXcml0ZXMgYnVmZmVyZWQgZGF0YSB0byB0aGUgY3VycmVudCBuYXRpdmUgcmVxdWVzdFxuUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKSB7XG4gIC8vIFdyaXRpbmcgaXMgbm90IGFsbG93ZWQgaWYgZW5kIGhhcyBiZWVuIGNhbGxlZFxuICBpZiAodGhpcy5fZW5kaW5nKSB7XG4gICAgdGhyb3cgbmV3IFdyaXRlQWZ0ZXJFbmRFcnJvcigpO1xuICB9XG5cbiAgLy8gVmFsaWRhdGUgaW5wdXQgYW5kIHNoaWZ0IHBhcmFtZXRlcnMgaWYgbmVjZXNzYXJ5XG4gIGlmICghKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmIChcImxlbmd0aFwiIGluIGRhdGEpKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJkYXRhIHNob3VsZCBiZSBhIHN0cmluZywgQnVmZmVyIG9yIFVpbnQ4QXJyYXlcIik7XG4gIH1cbiAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY2FsbGJhY2sgPSBlbmNvZGluZztcbiAgICBlbmNvZGluZyA9IG51bGw7XG4gIH1cblxuICAvLyBJZ25vcmUgZW1wdHkgYnVmZmVycywgc2luY2Ugd3JpdGluZyB0aGVtIGRvZXNuJ3QgaW52b2tlIHRoZSBjYWxsYmFja1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvaXNzdWVzLzIyMDY2XG4gIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIE9ubHkgd3JpdGUgd2hlbiB3ZSBkb24ndCBleGNlZWQgdGhlIG1heGltdW0gYm9keSBsZW5ndGhcbiAgaWYgKHRoaXMuX3JlcXVlc3RCb2R5TGVuZ3RoICsgZGF0YS5sZW5ndGggPD0gdGhpcy5fb3B0aW9ucy5tYXhCb2R5TGVuZ3RoKSB7XG4gICAgdGhpcy5fcmVxdWVzdEJvZHlMZW5ndGggKz0gZGF0YS5sZW5ndGg7XG4gICAgdGhpcy5fcmVxdWVzdEJvZHlCdWZmZXJzLnB1c2goeyBkYXRhOiBkYXRhLCBlbmNvZGluZzogZW5jb2RpbmcgfSk7XG4gICAgdGhpcy5fY3VycmVudFJlcXVlc3Qud3JpdGUoZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKTtcbiAgfVxuICAvLyBFcnJvciB3aGVuIHdlIGV4Y2VlZCB0aGUgbWF4aW11bSBib2R5IGxlbmd0aFxuICBlbHNlIHtcbiAgICB0aGlzLmVtaXQoXCJlcnJvclwiLCBuZXcgTWF4Qm9keUxlbmd0aEV4Y2VlZGVkRXJyb3IoKSk7XG4gICAgdGhpcy5hYm9ydCgpO1xuICB9XG59O1xuXG4vLyBFbmRzIHRoZSBjdXJyZW50IG5hdGl2ZSByZXF1ZXN0XG5SZWRpcmVjdGFibGVSZXF1ZXN0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKSB7XG4gIC8vIFNoaWZ0IHBhcmFtZXRlcnMgaWYgbmVjZXNzYXJ5XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY2FsbGJhY2sgPSBkYXRhO1xuICAgIGRhdGEgPSBlbmNvZGluZyA9IG51bGw7XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIGVuY29kaW5nID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjYWxsYmFjayA9IGVuY29kaW5nO1xuICAgIGVuY29kaW5nID0gbnVsbDtcbiAgfVxuXG4gIC8vIFdyaXRlIGRhdGEgaWYgbmVlZGVkIGFuZCBlbmRcbiAgaWYgKCFkYXRhKSB7XG4gICAgdGhpcy5fZW5kZWQgPSB0aGlzLl9lbmRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2N1cnJlbnRSZXF1ZXN0LmVuZChudWxsLCBudWxsLCBjYWxsYmFjayk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjdXJyZW50UmVxdWVzdCA9IHRoaXMuX2N1cnJlbnRSZXF1ZXN0O1xuICAgIHRoaXMud3JpdGUoZGF0YSwgZW5jb2RpbmcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuX2VuZGVkID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRSZXF1ZXN0LmVuZChudWxsLCBudWxsLCBjYWxsYmFjayk7XG4gICAgfSk7XG4gICAgdGhpcy5fZW5kaW5nID0gdHJ1ZTtcbiAgfVxufTtcblxuLy8gU2V0cyBhIGhlYWRlciB2YWx1ZSBvbiB0aGUgY3VycmVudCBuYXRpdmUgcmVxdWVzdFxuUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUuc2V0SGVhZGVyID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX29wdGlvbnMuaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xuICB0aGlzLl9jdXJyZW50UmVxdWVzdC5zZXRIZWFkZXIobmFtZSwgdmFsdWUpO1xufTtcblxuLy8gQ2xlYXJzIGEgaGVhZGVyIHZhbHVlIG9uIHRoZSBjdXJyZW50IG5hdGl2ZSByZXF1ZXN0XG5SZWRpcmVjdGFibGVSZXF1ZXN0LnByb3RvdHlwZS5yZW1vdmVIZWFkZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICBkZWxldGUgdGhpcy5fb3B0aW9ucy5oZWFkZXJzW25hbWVdO1xuICB0aGlzLl9jdXJyZW50UmVxdWVzdC5yZW1vdmVIZWFkZXIobmFtZSk7XG59O1xuXG4vLyBHbG9iYWwgdGltZW91dCBmb3IgYWxsIHVuZGVybHlpbmcgcmVxdWVzdHNcblJlZGlyZWN0YWJsZVJlcXVlc3QucHJvdG90eXBlLnNldFRpbWVvdXQgPSBmdW5jdGlvbiAobXNlY3MsIGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvLyBEZXN0cm95cyB0aGUgc29ja2V0IG9uIHRpbWVvdXRcbiAgZnVuY3Rpb24gZGVzdHJveU9uVGltZW91dChzb2NrZXQpIHtcbiAgICBzb2NrZXQuc2V0VGltZW91dChtc2Vjcyk7XG4gICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKFwidGltZW91dFwiLCBzb2NrZXQuZGVzdHJveSk7XG4gICAgc29ja2V0LmFkZExpc3RlbmVyKFwidGltZW91dFwiLCBzb2NrZXQuZGVzdHJveSk7XG4gIH1cblxuICAvLyBTZXRzIHVwIGEgdGltZXIgdG8gdHJpZ2dlciBhIHRpbWVvdXQgZXZlbnRcbiAgZnVuY3Rpb24gc3RhcnRUaW1lcihzb2NrZXQpIHtcbiAgICBpZiAoc2VsZi5fdGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3RpbWVvdXQpO1xuICAgIH1cbiAgICBzZWxmLl90aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLmVtaXQoXCJ0aW1lb3V0XCIpO1xuICAgICAgY2xlYXJUaW1lcigpO1xuICAgIH0sIG1zZWNzKTtcbiAgICBkZXN0cm95T25UaW1lb3V0KHNvY2tldCk7XG4gIH1cblxuICAvLyBTdG9wcyBhIHRpbWVvdXQgZnJvbSB0cmlnZ2VyaW5nXG4gIGZ1bmN0aW9uIGNsZWFyVGltZXIoKSB7XG4gICAgLy8gQ2xlYXIgdGhlIHRpbWVvdXRcbiAgICBpZiAoc2VsZi5fdGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3RpbWVvdXQpO1xuICAgICAgc2VsZi5fdGltZW91dCA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gQ2xlYW4gdXAgYWxsIGF0dGFjaGVkIGxpc3RlbmVyc1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoXCJhYm9ydFwiLCBjbGVhclRpbWVyKTtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKFwiZXJyb3JcIiwgY2xlYXJUaW1lcik7XG4gICAgc2VsZi5yZW1vdmVMaXN0ZW5lcihcInJlc3BvbnNlXCIsIGNsZWFyVGltZXIpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgc2VsZi5yZW1vdmVMaXN0ZW5lcihcInRpbWVvdXRcIiwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAoIXNlbGYuc29ja2V0KSB7XG4gICAgICBzZWxmLl9jdXJyZW50UmVxdWVzdC5yZW1vdmVMaXN0ZW5lcihcInNvY2tldFwiLCBzdGFydFRpbWVyKTtcbiAgICB9XG4gIH1cblxuICAvLyBBdHRhY2ggY2FsbGJhY2sgaWYgcGFzc2VkXG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMub24oXCJ0aW1lb3V0XCIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFN0YXJ0IHRoZSB0aW1lciBpZiBvciB3aGVuIHRoZSBzb2NrZXQgaXMgb3BlbmVkXG4gIGlmICh0aGlzLnNvY2tldCkge1xuICAgIHN0YXJ0VGltZXIodGhpcy5zb2NrZXQpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMuX2N1cnJlbnRSZXF1ZXN0Lm9uY2UoXCJzb2NrZXRcIiwgc3RhcnRUaW1lcik7XG4gIH1cblxuICAvLyBDbGVhbiB1cCBvbiBldmVudHNcbiAgdGhpcy5vbihcInNvY2tldFwiLCBkZXN0cm95T25UaW1lb3V0KTtcbiAgdGhpcy5vbihcImFib3J0XCIsIGNsZWFyVGltZXIpO1xuICB0aGlzLm9uKFwiZXJyb3JcIiwgY2xlYXJUaW1lcik7XG4gIHRoaXMub24oXCJyZXNwb25zZVwiLCBjbGVhclRpbWVyKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIFByb3h5IGFsbCBvdGhlciBwdWJsaWMgQ2xpZW50UmVxdWVzdCBtZXRob2RzXG5bXG4gIFwiZmx1c2hIZWFkZXJzXCIsIFwiZ2V0SGVhZGVyXCIsXG4gIFwic2V0Tm9EZWxheVwiLCBcInNldFNvY2tldEtlZXBBbGl2ZVwiLFxuXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRSZXF1ZXN0W21ldGhvZF0oYSwgYik7XG4gIH07XG59KTtcblxuLy8gUHJveHkgYWxsIHB1YmxpYyBDbGllbnRSZXF1ZXN0IHByb3BlcnRpZXNcbltcImFib3J0ZWRcIiwgXCJjb25uZWN0aW9uXCIsIFwic29ja2V0XCJdLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWRpcmVjdGFibGVSZXF1ZXN0LnByb3RvdHlwZSwgcHJvcGVydHksIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRSZXF1ZXN0W3Byb3BlcnR5XTsgfSxcbiAgfSk7XG59KTtcblxuUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUuX3Nhbml0aXplT3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIC8vIEVuc3VyZSBoZWFkZXJzIGFyZSBhbHdheXMgcHJlc2VudFxuICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHt9O1xuICB9XG5cbiAgLy8gU2luY2UgaHR0cC5yZXF1ZXN0IHRyZWF0cyBob3N0IGFzIGFuIGFsaWFzIG9mIGhvc3RuYW1lLFxuICAvLyBidXQgdGhlIHVybCBtb2R1bGUgaW50ZXJwcmV0cyBob3N0IGFzIGhvc3RuYW1lIHBsdXMgcG9ydCxcbiAgLy8gZWxpbWluYXRlIHRoZSBob3N0IHByb3BlcnR5IHRvIGF2b2lkIGNvbmZ1c2lvbi5cbiAgaWYgKG9wdGlvbnMuaG9zdCkge1xuICAgIC8vIFVzZSBob3N0bmFtZSBpZiBzZXQsIGJlY2F1c2UgaXQgaGFzIHByZWNlZGVuY2VcbiAgICBpZiAoIW9wdGlvbnMuaG9zdG5hbWUpIHtcbiAgICAgIG9wdGlvbnMuaG9zdG5hbWUgPSBvcHRpb25zLmhvc3Q7XG4gICAgfVxuICAgIGRlbGV0ZSBvcHRpb25zLmhvc3Q7XG4gIH1cblxuICAvLyBDb21wbGV0ZSB0aGUgVVJMIG9iamVjdCB3aGVuIG5lY2Vzc2FyeVxuICBpZiAoIW9wdGlvbnMucGF0aG5hbWUgJiYgb3B0aW9ucy5wYXRoKSB7XG4gICAgdmFyIHNlYXJjaFBvcyA9IG9wdGlvbnMucGF0aC5pbmRleE9mKFwiP1wiKTtcbiAgICBpZiAoc2VhcmNoUG9zIDwgMCkge1xuICAgICAgb3B0aW9ucy5wYXRobmFtZSA9IG9wdGlvbnMucGF0aDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBvcHRpb25zLnBhdGhuYW1lID0gb3B0aW9ucy5wYXRoLnN1YnN0cmluZygwLCBzZWFyY2hQb3MpO1xuICAgICAgb3B0aW9ucy5zZWFyY2ggPSBvcHRpb25zLnBhdGguc3Vic3RyaW5nKHNlYXJjaFBvcyk7XG4gICAgfVxuICB9XG59O1xuXG5cbi8vIEV4ZWN1dGVzIHRoZSBuZXh0IG5hdGl2ZSByZXF1ZXN0IChpbml0aWFsIG9yIHJlZGlyZWN0KVxuUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUuX3BlcmZvcm1SZXF1ZXN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBMb2FkIHRoZSBuYXRpdmUgcHJvdG9jb2xcbiAgdmFyIHByb3RvY29sID0gdGhpcy5fb3B0aW9ucy5wcm90b2NvbDtcbiAgdmFyIG5hdGl2ZVByb3RvY29sID0gdGhpcy5fb3B0aW9ucy5uYXRpdmVQcm90b2NvbHNbcHJvdG9jb2xdO1xuICBpZiAoIW5hdGl2ZVByb3RvY29sKSB7XG4gICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgbmV3IFR5cGVFcnJvcihcIlVuc3VwcG9ydGVkIHByb3RvY29sIFwiICsgcHJvdG9jb2wpKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBJZiBzcGVjaWZpZWQsIHVzZSB0aGUgYWdlbnQgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvdG9jb2xcbiAgLy8gKEhUVFAgYW5kIEhUVFBTIHVzZSBkaWZmZXJlbnQgdHlwZXMgb2YgYWdlbnRzKVxuICBpZiAodGhpcy5fb3B0aW9ucy5hZ2VudHMpIHtcbiAgICB2YXIgc2NoZW1lID0gcHJvdG9jb2wuc2xpY2UoMCwgLTEpO1xuICAgIHRoaXMuX29wdGlvbnMuYWdlbnQgPSB0aGlzLl9vcHRpb25zLmFnZW50c1tzY2hlbWVdO1xuICB9XG5cbiAgLy8gQ3JlYXRlIHRoZSBuYXRpdmUgcmVxdWVzdFxuICB2YXIgcmVxdWVzdCA9IHRoaXMuX2N1cnJlbnRSZXF1ZXN0ID1cbiAgICAgICAgbmF0aXZlUHJvdG9jb2wucmVxdWVzdCh0aGlzLl9vcHRpb25zLCB0aGlzLl9vbk5hdGl2ZVJlc3BvbnNlKTtcbiAgdGhpcy5fY3VycmVudFVybCA9IHVybC5mb3JtYXQodGhpcy5fb3B0aW9ucyk7XG5cbiAgLy8gU2V0IHVwIGV2ZW50IGhhbmRsZXJzXG4gIHJlcXVlc3QuX3JlZGlyZWN0YWJsZSA9IHRoaXM7XG4gIGZvciAodmFyIGUgPSAwOyBlIDwgZXZlbnRzLmxlbmd0aDsgZSsrKSB7XG4gICAgcmVxdWVzdC5vbihldmVudHNbZV0sIGV2ZW50SGFuZGxlcnNbZXZlbnRzW2VdXSk7XG4gIH1cblxuICAvLyBFbmQgYSByZWRpcmVjdGVkIHJlcXVlc3RcbiAgLy8gKFRoZSBmaXJzdCByZXF1ZXN0IG11c3QgYmUgZW5kZWQgZXhwbGljaXRseSB3aXRoIFJlZGlyZWN0YWJsZVJlcXVlc3QjZW5kKVxuICBpZiAodGhpcy5faXNSZWRpcmVjdCkge1xuICAgIC8vIFdyaXRlIHRoZSByZXF1ZXN0IGVudGl0eSBhbmQgZW5kLlxuICAgIHZhciBpID0gMDtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1ZmZlcnMgPSB0aGlzLl9yZXF1ZXN0Qm9keUJ1ZmZlcnM7XG4gICAgKGZ1bmN0aW9uIHdyaXRlTmV4dChlcnJvcikge1xuICAgICAgLy8gT25seSB3cml0ZSBpZiB0aGlzIHJlcXVlc3QgaGFzIG5vdCBiZWVuIHJlZGlyZWN0ZWQgeWV0XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHJlcXVlc3QgPT09IHNlbGYuX2N1cnJlbnRSZXF1ZXN0KSB7XG4gICAgICAgIC8vIFJlcG9ydCBhbnkgd3JpdGUgZXJyb3JzXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV3JpdGUgdGhlIG5leHQgYnVmZmVyIGlmIHRoZXJlIGFyZSBzdGlsbCBsZWZ0XG4gICAgICAgIGVsc2UgaWYgKGkgPCBidWZmZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBidWZmZXIgPSBidWZmZXJzW2krK107XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgICBpZiAoIXJlcXVlc3QuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJlcXVlc3Qud3JpdGUoYnVmZmVyLmRhdGEsIGJ1ZmZlci5lbmNvZGluZywgd3JpdGVOZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW5kIHRoZSByZXF1ZXN0IGlmIGBlbmRgIGhhcyBiZWVuIGNhbGxlZCBvbiB1c1xuICAgICAgICBlbHNlIGlmIChzZWxmLl9lbmRlZCkge1xuICAgICAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KCkpO1xuICB9XG59O1xuXG4vLyBQcm9jZXNzZXMgYSByZXNwb25zZSBmcm9tIHRoZSBjdXJyZW50IG5hdGl2ZSByZXF1ZXN0XG5SZWRpcmVjdGFibGVSZXF1ZXN0LnByb3RvdHlwZS5fcHJvY2Vzc1Jlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gIC8vIFN0b3JlIHRoZSByZWRpcmVjdGVkIHJlc3BvbnNlXG4gIHZhciBzdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzQ29kZTtcbiAgaWYgKHRoaXMuX29wdGlvbnMudHJhY2tSZWRpcmVjdHMpIHtcbiAgICB0aGlzLl9yZWRpcmVjdHMucHVzaCh7XG4gICAgICB1cmw6IHRoaXMuX2N1cnJlbnRVcmwsXG4gICAgICBoZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgc3RhdHVzQ29kZTogc3RhdHVzQ29kZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFJGQzcyMzHCpzYuNDogVGhlIDN4eCAoUmVkaXJlY3Rpb24pIGNsYXNzIG9mIHN0YXR1cyBjb2RlIGluZGljYXRlc1xuICAvLyB0aGF0IGZ1cnRoZXIgYWN0aW9uIG5lZWRzIHRvIGJlIHRha2VuIGJ5IHRoZSB1c2VyIGFnZW50IGluIG9yZGVyIHRvXG4gIC8vIGZ1bGZpbGwgdGhlIHJlcXVlc3QuIElmIGEgTG9jYXRpb24gaGVhZGVyIGZpZWxkIGlzIHByb3ZpZGVkLFxuICAvLyB0aGUgdXNlciBhZ2VudCBNQVkgYXV0b21hdGljYWxseSByZWRpcmVjdCBpdHMgcmVxdWVzdCB0byB0aGUgVVJJXG4gIC8vIHJlZmVyZW5jZWQgYnkgdGhlIExvY2F0aW9uIGZpZWxkIHZhbHVlLFxuICAvLyBldmVuIGlmIHRoZSBzcGVjaWZpYyBzdGF0dXMgY29kZSBpcyBub3QgdW5kZXJzdG9vZC5cblxuICAvLyBJZiB0aGUgcmVzcG9uc2UgaXMgbm90IGEgcmVkaXJlY3Q7IHJldHVybiBpdCBhcy1pc1xuICB2YXIgbG9jYXRpb24gPSByZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uO1xuICBpZiAoIWxvY2F0aW9uIHx8IHRoaXMuX29wdGlvbnMuZm9sbG93UmVkaXJlY3RzID09PSBmYWxzZSB8fFxuICAgICAgc3RhdHVzQ29kZSA8IDMwMCB8fCBzdGF0dXNDb2RlID49IDQwMCkge1xuICAgIHJlc3BvbnNlLnJlc3BvbnNlVXJsID0gdGhpcy5fY3VycmVudFVybDtcbiAgICByZXNwb25zZS5yZWRpcmVjdHMgPSB0aGlzLl9yZWRpcmVjdHM7XG4gICAgdGhpcy5lbWl0KFwicmVzcG9uc2VcIiwgcmVzcG9uc2UpO1xuXG4gICAgLy8gQ2xlYW4gdXBcbiAgICB0aGlzLl9yZXF1ZXN0Qm9keUJ1ZmZlcnMgPSBbXTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBUaGUgcmVzcG9uc2UgaXMgYSByZWRpcmVjdCwgc28gYWJvcnQgdGhlIGN1cnJlbnQgcmVxdWVzdFxuICBhYm9ydFJlcXVlc3QodGhpcy5fY3VycmVudFJlcXVlc3QpO1xuICAvLyBEaXNjYXJkIHRoZSByZW1haW5kZXIgb2YgdGhlIHJlc3BvbnNlIHRvIGF2b2lkIHdhaXRpbmcgZm9yIGRhdGFcbiAgcmVzcG9uc2UuZGVzdHJveSgpO1xuXG4gIC8vIFJGQzcyMzHCpzYuNDogQSBjbGllbnQgU0hPVUxEIGRldGVjdCBhbmQgaW50ZXJ2ZW5lXG4gIC8vIGluIGN5Y2xpY2FsIHJlZGlyZWN0aW9ucyAoaS5lLiwgXCJpbmZpbml0ZVwiIHJlZGlyZWN0aW9uIGxvb3BzKS5cbiAgaWYgKCsrdGhpcy5fcmVkaXJlY3RDb3VudCA+IHRoaXMuX29wdGlvbnMubWF4UmVkaXJlY3RzKSB7XG4gICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgbmV3IFRvb01hbnlSZWRpcmVjdHNFcnJvcigpKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBTdG9yZSB0aGUgcmVxdWVzdCBoZWFkZXJzIGlmIGFwcGxpY2FibGVcbiAgdmFyIHJlcXVlc3RIZWFkZXJzO1xuICB2YXIgYmVmb3JlUmVkaXJlY3QgPSB0aGlzLl9vcHRpb25zLmJlZm9yZVJlZGlyZWN0O1xuICBpZiAoYmVmb3JlUmVkaXJlY3QpIHtcbiAgICByZXF1ZXN0SGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgLy8gVGhlIEhvc3QgaGVhZGVyIHdhcyBzZXQgYnkgbmF0aXZlUHJvdG9jb2wucmVxdWVzdFxuICAgICAgSG9zdDogcmVzcG9uc2UucmVxLmdldEhlYWRlcihcImhvc3RcIiksXG4gICAgfSwgdGhpcy5fb3B0aW9ucy5oZWFkZXJzKTtcbiAgfVxuXG4gIC8vIFJGQzcyMzHCpzYuNDogQXV0b21hdGljIHJlZGlyZWN0aW9uIG5lZWRzIHRvIGRvbmUgd2l0aFxuICAvLyBjYXJlIGZvciBtZXRob2RzIG5vdCBrbm93biB0byBiZSBzYWZlLCBb4oCmXVxuICAvLyBSRkM3MjMxwqc2LjQuMuKAkzM6IEZvciBoaXN0b3JpY2FsIHJlYXNvbnMsIGEgdXNlciBhZ2VudCBNQVkgY2hhbmdlXG4gIC8vIHRoZSByZXF1ZXN0IG1ldGhvZCBmcm9tIFBPU1QgdG8gR0VUIGZvciB0aGUgc3Vic2VxdWVudCByZXF1ZXN0LlxuICB2YXIgbWV0aG9kID0gdGhpcy5fb3B0aW9ucy5tZXRob2Q7XG4gIGlmICgoc3RhdHVzQ29kZSA9PT0gMzAxIHx8IHN0YXR1c0NvZGUgPT09IDMwMikgJiYgdGhpcy5fb3B0aW9ucy5tZXRob2QgPT09IFwiUE9TVFwiIHx8XG4gICAgICAvLyBSRkM3MjMxwqc2LjQuNDogVGhlIDMwMyAoU2VlIE90aGVyKSBzdGF0dXMgY29kZSBpbmRpY2F0ZXMgdGhhdFxuICAgICAgLy8gdGhlIHNlcnZlciBpcyByZWRpcmVjdGluZyB0aGUgdXNlciBhZ2VudCB0byBhIGRpZmZlcmVudCByZXNvdXJjZSBb4oCmXVxuICAgICAgLy8gQSB1c2VyIGFnZW50IGNhbiBwZXJmb3JtIGEgcmV0cmlldmFsIHJlcXVlc3QgdGFyZ2V0aW5nIHRoYXQgVVJJXG4gICAgICAvLyAoYSBHRVQgb3IgSEVBRCByZXF1ZXN0IGlmIHVzaW5nIEhUVFApIFvigKZdXG4gICAgICAoc3RhdHVzQ29kZSA9PT0gMzAzKSAmJiAhL14oPzpHRVR8SEVBRCkkLy50ZXN0KHRoaXMuX29wdGlvbnMubWV0aG9kKSkge1xuICAgIHRoaXMuX29wdGlvbnMubWV0aG9kID0gXCJHRVRcIjtcbiAgICAvLyBEcm9wIGEgcG9zc2libGUgZW50aXR5IGFuZCBoZWFkZXJzIHJlbGF0ZWQgdG8gaXRcbiAgICB0aGlzLl9yZXF1ZXN0Qm9keUJ1ZmZlcnMgPSBbXTtcbiAgICByZW1vdmVNYXRjaGluZ0hlYWRlcnMoL15jb250ZW50LS9pLCB0aGlzLl9vcHRpb25zLmhlYWRlcnMpO1xuICB9XG5cbiAgLy8gRHJvcCB0aGUgSG9zdCBoZWFkZXIsIGFzIHRoZSByZWRpcmVjdCBtaWdodCBsZWFkIHRvIGEgZGlmZmVyZW50IGhvc3RcbiAgdmFyIGN1cnJlbnRIb3N0SGVhZGVyID0gcmVtb3ZlTWF0Y2hpbmdIZWFkZXJzKC9eaG9zdCQvaSwgdGhpcy5fb3B0aW9ucy5oZWFkZXJzKTtcblxuICAvLyBJZiB0aGUgcmVkaXJlY3QgaXMgcmVsYXRpdmUsIGNhcnJ5IG92ZXIgdGhlIGhvc3Qgb2YgdGhlIGxhc3QgcmVxdWVzdFxuICB2YXIgY3VycmVudFVybFBhcnRzID0gdXJsLnBhcnNlKHRoaXMuX2N1cnJlbnRVcmwpO1xuICB2YXIgY3VycmVudEhvc3QgPSBjdXJyZW50SG9zdEhlYWRlciB8fCBjdXJyZW50VXJsUGFydHMuaG9zdDtcbiAgdmFyIGN1cnJlbnRVcmwgPSAvXlxcdys6Ly50ZXN0KGxvY2F0aW9uKSA/IHRoaXMuX2N1cnJlbnRVcmwgOlxuICAgIHVybC5mb3JtYXQoT2JqZWN0LmFzc2lnbihjdXJyZW50VXJsUGFydHMsIHsgaG9zdDogY3VycmVudEhvc3QgfSkpO1xuXG4gIC8vIERldGVybWluZSB0aGUgVVJMIG9mIHRoZSByZWRpcmVjdGlvblxuICB2YXIgcmVkaXJlY3RVcmw7XG4gIHRyeSB7XG4gICAgcmVkaXJlY3RVcmwgPSB1cmwucmVzb2x2ZShjdXJyZW50VXJsLCBsb2NhdGlvbik7XG4gIH1cbiAgY2F0Y2ggKGNhdXNlKSB7XG4gICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgbmV3IFJlZGlyZWN0aW9uRXJyb3IoY2F1c2UpKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBDcmVhdGUgdGhlIHJlZGlyZWN0ZWQgcmVxdWVzdFxuICBkZWJ1ZyhcInJlZGlyZWN0aW5nIHRvXCIsIHJlZGlyZWN0VXJsKTtcbiAgdGhpcy5faXNSZWRpcmVjdCA9IHRydWU7XG4gIHZhciByZWRpcmVjdFVybFBhcnRzID0gdXJsLnBhcnNlKHJlZGlyZWN0VXJsKTtcbiAgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCByZWRpcmVjdFVybFBhcnRzKTtcblxuICAvLyBEcm9wIGNvbmZpZGVudGlhbCBoZWFkZXJzIHdoZW4gcmVkaXJlY3RpbmcgdG8gYSBsZXNzIHNlY3VyZSBwcm90b2NvbFxuICAvLyBvciB0byBhIGRpZmZlcmVudCBkb21haW4gdGhhdCBpcyBub3QgYSBzdXBlcmRvbWFpblxuICBpZiAocmVkaXJlY3RVcmxQYXJ0cy5wcm90b2NvbCAhPT0gY3VycmVudFVybFBhcnRzLnByb3RvY29sICYmXG4gICAgIHJlZGlyZWN0VXJsUGFydHMucHJvdG9jb2wgIT09IFwiaHR0cHM6XCIgfHxcbiAgICAgcmVkaXJlY3RVcmxQYXJ0cy5ob3N0ICE9PSBjdXJyZW50SG9zdCAmJlxuICAgICAhaXNTdWJkb21haW4ocmVkaXJlY3RVcmxQYXJ0cy5ob3N0LCBjdXJyZW50SG9zdCkpIHtcbiAgICByZW1vdmVNYXRjaGluZ0hlYWRlcnMoL14oPzphdXRob3JpemF0aW9ufGNvb2tpZSkkL2ksIHRoaXMuX29wdGlvbnMuaGVhZGVycyk7XG4gIH1cblxuICAvLyBFdmFsdWF0ZSB0aGUgYmVmb3JlUmVkaXJlY3QgY2FsbGJhY2tcbiAgaWYgKHR5cGVvZiBiZWZvcmVSZWRpcmVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIHJlc3BvbnNlRGV0YWlscyA9IHtcbiAgICAgIGhlYWRlcnM6IHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBzdGF0dXNDb2RlOiBzdGF0dXNDb2RlLFxuICAgIH07XG4gICAgdmFyIHJlcXVlc3REZXRhaWxzID0ge1xuICAgICAgdXJsOiBjdXJyZW50VXJsLFxuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBiZWZvcmVSZWRpcmVjdCh0aGlzLl9vcHRpb25zLCByZXNwb25zZURldGFpbHMsIHJlcXVlc3REZXRhaWxzKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2FuaXRpemVPcHRpb25zKHRoaXMuX29wdGlvbnMpO1xuICB9XG5cbiAgLy8gUGVyZm9ybSB0aGUgcmVkaXJlY3RlZCByZXF1ZXN0XG4gIHRyeSB7XG4gICAgdGhpcy5fcGVyZm9ybVJlcXVlc3QoKTtcbiAgfVxuICBjYXRjaCAoY2F1c2UpIHtcbiAgICB0aGlzLmVtaXQoXCJlcnJvclwiLCBuZXcgUmVkaXJlY3Rpb25FcnJvcihjYXVzZSkpO1xuICB9XG59O1xuXG4vLyBXcmFwcyB0aGUga2V5L3ZhbHVlIG9iamVjdCBvZiBwcm90b2NvbHMgd2l0aCByZWRpcmVjdCBmdW5jdGlvbmFsaXR5XG5mdW5jdGlvbiB3cmFwKHByb3RvY29scykge1xuICAvLyBEZWZhdWx0IHNldHRpbmdzXG4gIHZhciBleHBvcnRzID0ge1xuICAgIG1heFJlZGlyZWN0czogMjEsXG4gICAgbWF4Qm9keUxlbmd0aDogMTAgKiAxMDI0ICogMTAyNCxcbiAgfTtcblxuICAvLyBXcmFwIGVhY2ggcHJvdG9jb2xcbiAgdmFyIG5hdGl2ZVByb3RvY29scyA9IHt9O1xuICBPYmplY3Qua2V5cyhwcm90b2NvbHMpLmZvckVhY2goZnVuY3Rpb24gKHNjaGVtZSkge1xuICAgIHZhciBwcm90b2NvbCA9IHNjaGVtZSArIFwiOlwiO1xuICAgIHZhciBuYXRpdmVQcm90b2NvbCA9IG5hdGl2ZVByb3RvY29sc1twcm90b2NvbF0gPSBwcm90b2NvbHNbc2NoZW1lXTtcbiAgICB2YXIgd3JhcHBlZFByb3RvY29sID0gZXhwb3J0c1tzY2hlbWVdID0gT2JqZWN0LmNyZWF0ZShuYXRpdmVQcm90b2NvbCk7XG5cbiAgICAvLyBFeGVjdXRlcyBhIHJlcXVlc3QsIGZvbGxvd2luZyByZWRpcmVjdHNcbiAgICBmdW5jdGlvbiByZXF1ZXN0KGlucHV0LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgLy8gUGFyc2UgcGFyYW1ldGVyc1xuICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB2YXIgdXJsU3RyID0gaW5wdXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaW5wdXQgPSB1cmxUb09wdGlvbnMobmV3IFVSTCh1cmxTdHIpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICBpbnB1dCA9IHVybC5wYXJzZSh1cmxTdHIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChVUkwgJiYgKGlucHV0IGluc3RhbmNlb2YgVVJMKSkge1xuICAgICAgICBpbnB1dCA9IHVybFRvT3B0aW9ucyhpbnB1dCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgICAgICBvcHRpb25zID0gaW5wdXQ7XG4gICAgICAgIGlucHV0ID0geyBwcm90b2NvbDogcHJvdG9jb2wgfTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBkZWZhdWx0c1xuICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBtYXhSZWRpcmVjdHM6IGV4cG9ydHMubWF4UmVkaXJlY3RzLFxuICAgICAgICBtYXhCb2R5TGVuZ3RoOiBleHBvcnRzLm1heEJvZHlMZW5ndGgsXG4gICAgICB9LCBpbnB1dCwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLm5hdGl2ZVByb3RvY29scyA9IG5hdGl2ZVByb3RvY29scztcblxuICAgICAgYXNzZXJ0LmVxdWFsKG9wdGlvbnMucHJvdG9jb2wsIHByb3RvY29sLCBcInByb3RvY29sIG1pc21hdGNoXCIpO1xuICAgICAgZGVidWcoXCJvcHRpb25zXCIsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIG5ldyBSZWRpcmVjdGFibGVSZXF1ZXN0KG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvLyBFeGVjdXRlcyBhIEdFVCByZXF1ZXN0LCBmb2xsb3dpbmcgcmVkaXJlY3RzXG4gICAgZnVuY3Rpb24gZ2V0KGlucHV0LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHdyYXBwZWRSZXF1ZXN0ID0gd3JhcHBlZFByb3RvY29sLnJlcXVlc3QoaW5wdXQsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICAgIHdyYXBwZWRSZXF1ZXN0LmVuZCgpO1xuICAgICAgcmV0dXJuIHdyYXBwZWRSZXF1ZXN0O1xuICAgIH1cblxuICAgIC8vIEV4cG9zZSB0aGUgcHJvcGVydGllcyBvbiB0aGUgd3JhcHBlZCBwcm90b2NvbFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHdyYXBwZWRQcm90b2NvbCwge1xuICAgICAgcmVxdWVzdDogeyB2YWx1ZTogcmVxdWVzdCwgY29uZmlndXJhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9LFxuICAgICAgZ2V0OiB7IHZhbHVlOiBnZXQsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSxcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBleHBvcnRzO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gbm9vcCgpIHsgLyogZW1wdHkgKi8gfVxuXG4vLyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL21hc3Rlci9saWIvaW50ZXJuYWwvdXJsLmpzXG5mdW5jdGlvbiB1cmxUb09wdGlvbnModXJsT2JqZWN0KSB7XG4gIHZhciBvcHRpb25zID0ge1xuICAgIHByb3RvY29sOiB1cmxPYmplY3QucHJvdG9jb2wsXG4gICAgaG9zdG5hbWU6IHVybE9iamVjdC5ob3N0bmFtZS5zdGFydHNXaXRoKFwiW1wiKSA/XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgdXJsT2JqZWN0Lmhvc3RuYW1lLnNsaWNlKDEsIC0xKSA6XG4gICAgICB1cmxPYmplY3QuaG9zdG5hbWUsXG4gICAgaGFzaDogdXJsT2JqZWN0Lmhhc2gsXG4gICAgc2VhcmNoOiB1cmxPYmplY3Quc2VhcmNoLFxuICAgIHBhdGhuYW1lOiB1cmxPYmplY3QucGF0aG5hbWUsXG4gICAgcGF0aDogdXJsT2JqZWN0LnBhdGhuYW1lICsgdXJsT2JqZWN0LnNlYXJjaCxcbiAgICBocmVmOiB1cmxPYmplY3QuaHJlZixcbiAgfTtcbiAgaWYgKHVybE9iamVjdC5wb3J0ICE9PSBcIlwiKSB7XG4gICAgb3B0aW9ucy5wb3J0ID0gTnVtYmVyKHVybE9iamVjdC5wb3J0KTtcbiAgfVxuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTWF0Y2hpbmdIZWFkZXJzKHJlZ2V4LCBoZWFkZXJzKSB7XG4gIHZhciBsYXN0VmFsdWU7XG4gIGZvciAodmFyIGhlYWRlciBpbiBoZWFkZXJzKSB7XG4gICAgaWYgKHJlZ2V4LnRlc3QoaGVhZGVyKSkge1xuICAgICAgbGFzdFZhbHVlID0gaGVhZGVyc1toZWFkZXJdO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbaGVhZGVyXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIChsYXN0VmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIGxhc3RWYWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikgP1xuICAgIHVuZGVmaW5lZCA6IFN0cmluZyhsYXN0VmFsdWUpLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRXJyb3JUeXBlKGNvZGUsIGRlZmF1bHRNZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIEN1c3RvbUVycm9yKGNhdXNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgaWYgKCFjYXVzZSkge1xuICAgICAgdGhpcy5tZXNzYWdlID0gZGVmYXVsdE1lc3NhZ2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5tZXNzYWdlID0gZGVmYXVsdE1lc3NhZ2UgKyBcIjogXCIgKyBjYXVzZS5tZXNzYWdlO1xuICAgICAgdGhpcy5jYXVzZSA9IGNhdXNlO1xuICAgIH1cbiAgfVxuICBDdXN0b21FcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcbiAgQ3VzdG9tRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ3VzdG9tRXJyb3I7XG4gIEN1c3RvbUVycm9yLnByb3RvdHlwZS5uYW1lID0gXCJFcnJvciBbXCIgKyBjb2RlICsgXCJdXCI7XG4gIEN1c3RvbUVycm9yLnByb3RvdHlwZS5jb2RlID0gY29kZTtcbiAgcmV0dXJuIEN1c3RvbUVycm9yO1xufVxuXG5mdW5jdGlvbiBhYm9ydFJlcXVlc3QocmVxdWVzdCkge1xuICBmb3IgKHZhciBlID0gMDsgZSA8IGV2ZW50cy5sZW5ndGg7IGUrKykge1xuICAgIHJlcXVlc3QucmVtb3ZlTGlzdGVuZXIoZXZlbnRzW2VdLCBldmVudEhhbmRsZXJzW2V2ZW50c1tlXV0pO1xuICB9XG4gIHJlcXVlc3Qub24oXCJlcnJvclwiLCBub29wKTtcbiAgcmVxdWVzdC5hYm9ydCgpO1xufVxuXG5mdW5jdGlvbiBpc1N1YmRvbWFpbihzdWJkb21haW4sIGRvbWFpbikge1xuICBjb25zdCBkb3QgPSBzdWJkb21haW4ubGVuZ3RoIC0gZG9tYWluLmxlbmd0aCAtIDE7XG4gIHJldHVybiBkb3QgPiAwICYmIHN1YmRvbWFpbltkb3RdID09PSBcIi5cIiAmJiBzdWJkb21haW4uZW5kc1dpdGgoZG9tYWluKTtcbn1cblxuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSB3cmFwKHsgaHR0cDogaHR0cCwgaHR0cHM6IGh0dHBzIH0pO1xubW9kdWxlLmV4cG9ydHMud3JhcCA9IHdyYXA7XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IChmbGFnLCBhcmd2KSA9PiB7XG5cdGFyZ3YgPSBhcmd2IHx8IHByb2Nlc3MuYXJndjtcblx0Y29uc3QgcHJlZml4ID0gZmxhZy5zdGFydHNXaXRoKCctJykgPyAnJyA6IChmbGFnLmxlbmd0aCA9PT0gMSA/ICctJyA6ICctLScpO1xuXHRjb25zdCBwb3MgPSBhcmd2LmluZGV4T2YocHJlZml4ICsgZmxhZyk7XG5cdGNvbnN0IHRlcm1pbmF0b3JQb3MgPSBhcmd2LmluZGV4T2YoJy0tJyk7XG5cdHJldHVybiBwb3MgIT09IC0xICYmICh0ZXJtaW5hdG9yUG9zID09PSAtMSA/IHRydWUgOiBwb3MgPCB0ZXJtaW5hdG9yUG9zKTtcbn07XG4iLCIvKiFcbiAqIG1pbWUtZGJcbiAqIENvcHlyaWdodChjKSAyMDE0IEpvbmF0aGFuIE9uZ1xuICogQ29weXJpZ2h0KGMpIDIwMTUtMjAyMiBEb3VnbGFzIENocmlzdG9waGVyIFdpbHNvblxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGIuanNvbicpXG4iLCIvKiFcbiAqIG1pbWUtdHlwZXNcbiAqIENvcHlyaWdodChjKSAyMDE0IEpvbmF0aGFuIE9uZ1xuICogQ29weXJpZ2h0KGMpIDIwMTUgRG91Z2xhcyBDaHJpc3RvcGhlciBXaWxzb25cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKiBAcHJpdmF0ZVxuICovXG5cbnZhciBkYiA9IHJlcXVpcmUoJ21pbWUtZGInKVxudmFyIGV4dG5hbWUgPSByZXF1aXJlKCdwYXRoJykuZXh0bmFtZVxuXG4vKipcbiAqIE1vZHVsZSB2YXJpYWJsZXMuXG4gKiBAcHJpdmF0ZVxuICovXG5cbnZhciBFWFRSQUNUX1RZUEVfUkVHRVhQID0gL15cXHMqKFteO1xcc10qKSg/Ojt8XFxzfCQpL1xudmFyIFRFWFRfVFlQRV9SRUdFWFAgPSAvXnRleHRcXC8vaVxuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICogQHB1YmxpY1xuICovXG5cbmV4cG9ydHMuY2hhcnNldCA9IGNoYXJzZXRcbmV4cG9ydHMuY2hhcnNldHMgPSB7IGxvb2t1cDogY2hhcnNldCB9XG5leHBvcnRzLmNvbnRlbnRUeXBlID0gY29udGVudFR5cGVcbmV4cG9ydHMuZXh0ZW5zaW9uID0gZXh0ZW5zaW9uXG5leHBvcnRzLmV4dGVuc2lvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5leHBvcnRzLmxvb2t1cCA9IGxvb2t1cFxuZXhwb3J0cy50eXBlcyA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuLy8gUG9wdWxhdGUgdGhlIGV4dGVuc2lvbnMvdHlwZXMgbWFwc1xucG9wdWxhdGVNYXBzKGV4cG9ydHMuZXh0ZW5zaW9ucywgZXhwb3J0cy50eXBlcylcblxuLyoqXG4gKiBHZXQgdGhlIGRlZmF1bHQgY2hhcnNldCBmb3IgYSBNSU1FIHR5cGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEByZXR1cm4ge2Jvb2xlYW58c3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIGNoYXJzZXQgKHR5cGUpIHtcbiAgaWYgKCF0eXBlIHx8IHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gVE9ETzogdXNlIG1lZGlhLXR5cGVyXG4gIHZhciBtYXRjaCA9IEVYVFJBQ1RfVFlQRV9SRUdFWFAuZXhlYyh0eXBlKVxuICB2YXIgbWltZSA9IG1hdGNoICYmIGRiW21hdGNoWzFdLnRvTG93ZXJDYXNlKCldXG5cbiAgaWYgKG1pbWUgJiYgbWltZS5jaGFyc2V0KSB7XG4gICAgcmV0dXJuIG1pbWUuY2hhcnNldFxuICB9XG5cbiAgLy8gZGVmYXVsdCB0ZXh0LyogdG8gdXRmLThcbiAgaWYgKG1hdGNoICYmIFRFWFRfVFlQRV9SRUdFWFAudGVzdChtYXRjaFsxXSkpIHtcbiAgICByZXR1cm4gJ1VURi04J1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZnVsbCBDb250ZW50LVR5cGUgaGVhZGVyIGdpdmVuIGEgTUlNRSB0eXBlIG9yIGV4dGVuc2lvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtib29sZWFufHN0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBjb250ZW50VHlwZSAoc3RyKSB7XG4gIC8vIFRPRE86IHNob3VsZCB0aGlzIGV2ZW4gYmUgaW4gdGhpcyBtb2R1bGU/XG4gIGlmICghc3RyIHx8IHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICB2YXIgbWltZSA9IHN0ci5pbmRleE9mKCcvJykgPT09IC0xXG4gICAgPyBleHBvcnRzLmxvb2t1cChzdHIpXG4gICAgOiBzdHJcblxuICBpZiAoIW1pbWUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIFRPRE86IHVzZSBjb250ZW50LXR5cGUgb3Igb3RoZXIgbW9kdWxlXG4gIGlmIChtaW1lLmluZGV4T2YoJ2NoYXJzZXQnKSA9PT0gLTEpIHtcbiAgICB2YXIgY2hhcnNldCA9IGV4cG9ydHMuY2hhcnNldChtaW1lKVxuICAgIGlmIChjaGFyc2V0KSBtaW1lICs9ICc7IGNoYXJzZXQ9JyArIGNoYXJzZXQudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgcmV0dXJuIG1pbWVcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGRlZmF1bHQgZXh0ZW5zaW9uIGZvciBhIE1JTUUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHJldHVybiB7Ym9vbGVhbnxzdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gZXh0ZW5zaW9uICh0eXBlKSB7XG4gIGlmICghdHlwZSB8fCB0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIFRPRE86IHVzZSBtZWRpYS10eXBlclxuICB2YXIgbWF0Y2ggPSBFWFRSQUNUX1RZUEVfUkVHRVhQLmV4ZWModHlwZSlcblxuICAvLyBnZXQgZXh0ZW5zaW9uc1xuICB2YXIgZXh0cyA9IG1hdGNoICYmIGV4cG9ydHMuZXh0ZW5zaW9uc1ttYXRjaFsxXS50b0xvd2VyQ2FzZSgpXVxuXG4gIGlmICghZXh0cyB8fCAhZXh0cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiBleHRzWzBdXG59XG5cbi8qKlxuICogTG9va3VwIHRoZSBNSU1FIHR5cGUgZm9yIGEgZmlsZSBwYXRoL2V4dGVuc2lvbi5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICogQHJldHVybiB7Ym9vbGVhbnxzdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gbG9va3VwIChwYXRoKSB7XG4gIGlmICghcGF0aCB8fCB0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIGdldCB0aGUgZXh0ZW5zaW9uIChcImV4dFwiIG9yIFwiLmV4dFwiIG9yIGZ1bGwgcGF0aClcbiAgdmFyIGV4dGVuc2lvbiA9IGV4dG5hbWUoJ3guJyArIHBhdGgpXG4gICAgLnRvTG93ZXJDYXNlKClcbiAgICAuc3Vic3RyKDEpXG5cbiAgaWYgKCFleHRlbnNpb24pIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiBleHBvcnRzLnR5cGVzW2V4dGVuc2lvbl0gfHwgZmFsc2Vcbn1cblxuLyoqXG4gKiBQb3B1bGF0ZSB0aGUgZXh0ZW5zaW9ucyBhbmQgdHlwZXMgbWFwcy5cbiAqIEBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcG9wdWxhdGVNYXBzIChleHRlbnNpb25zLCB0eXBlcykge1xuICAvLyBzb3VyY2UgcHJlZmVyZW5jZSAobGVhc3QgLT4gbW9zdClcbiAgdmFyIHByZWZlcmVuY2UgPSBbJ25naW54JywgJ2FwYWNoZScsIHVuZGVmaW5lZCwgJ2lhbmEnXVxuXG4gIE9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKGZ1bmN0aW9uIGZvckVhY2hNaW1lVHlwZSAodHlwZSkge1xuICAgIHZhciBtaW1lID0gZGJbdHlwZV1cbiAgICB2YXIgZXh0cyA9IG1pbWUuZXh0ZW5zaW9uc1xuXG4gICAgaWYgKCFleHRzIHx8ICFleHRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gbWltZSAtPiBleHRlbnNpb25zXG4gICAgZXh0ZW5zaW9uc1t0eXBlXSA9IGV4dHNcblxuICAgIC8vIGV4dGVuc2lvbiAtPiBtaW1lXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZXh0ZW5zaW9uID0gZXh0c1tpXVxuXG4gICAgICBpZiAodHlwZXNbZXh0ZW5zaW9uXSkge1xuICAgICAgICB2YXIgZnJvbSA9IHByZWZlcmVuY2UuaW5kZXhPZihkYlt0eXBlc1tleHRlbnNpb25dXS5zb3VyY2UpXG4gICAgICAgIHZhciB0byA9IHByZWZlcmVuY2UuaW5kZXhPZihtaW1lLnNvdXJjZSlcblxuICAgICAgICBpZiAodHlwZXNbZXh0ZW5zaW9uXSAhPT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScgJiZcbiAgICAgICAgICAoZnJvbSA+IHRvIHx8IChmcm9tID09PSB0byAmJiB0eXBlc1tleHRlbnNpb25dLnN1YnN0cigwLCAxMikgPT09ICdhcHBsaWNhdGlvbi8nKSkpIHtcbiAgICAgICAgICAvLyBza2lwIHRoZSByZW1hcHBpbmdcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCB0aGUgZXh0ZW5zaW9uIC0+IG1pbWVcbiAgICAgIHR5cGVzW2V4dGVuc2lvbl0gPSB0eXBlXG4gICAgfVxuICB9KVxufVxuIiwiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB3ID0gZCAqIDc7XG52YXIgeSA9IGQgKiAzNjUuMjU7XG5cbi8qKlxuICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAdGhyb3dzIHtFcnJvcn0gdGhyb3cgYW4gZXJyb3IgaWYgdmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHZhbCkpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKC0/KD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx3ZWVrcz98d3x5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcbiAgICBzdHJcbiAgKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnd2Vla3MnOlxuICAgIGNhc2UgJ3dlZWsnOlxuICAgIGNhc2UgJ3cnOlxuICAgICAgcmV0dXJuIG4gKiB3O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJztcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgdmFyIG1zQWJzID0gTWF0aC5hYnMobXMpO1xuICBpZiAobXNBYnMgPj0gZCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBkLCAnZGF5Jyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IGgpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgaCwgJ2hvdXInKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBtLCAnbWludXRlJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgcywgJ3NlY29uZCcpO1xuICB9XG4gIHJldHVybiBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbXNBYnMsIG4sIG5hbWUpIHtcbiAgdmFyIGlzUGx1cmFsID0gbXNBYnMgPj0gbiAqIDEuNTtcbiAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBuKSArICcgJyArIG5hbWUgKyAoaXNQbHVyYWwgPyAncycgOiAnJyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJyk7XG5jb25zdCBoYXNGbGFnID0gcmVxdWlyZSgnaGFzLWZsYWcnKTtcblxuY29uc3QgZW52ID0gcHJvY2Vzcy5lbnY7XG5cbmxldCBmb3JjZUNvbG9yO1xuaWYgKGhhc0ZsYWcoJ25vLWNvbG9yJykgfHxcblx0aGFzRmxhZygnbm8tY29sb3JzJykgfHxcblx0aGFzRmxhZygnY29sb3I9ZmFsc2UnKSkge1xuXHRmb3JjZUNvbG9yID0gZmFsc2U7XG59IGVsc2UgaWYgKGhhc0ZsYWcoJ2NvbG9yJykgfHxcblx0aGFzRmxhZygnY29sb3JzJykgfHxcblx0aGFzRmxhZygnY29sb3I9dHJ1ZScpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9yPWFsd2F5cycpKSB7XG5cdGZvcmNlQ29sb3IgPSB0cnVlO1xufVxuaWYgKCdGT1JDRV9DT0xPUicgaW4gZW52KSB7XG5cdGZvcmNlQ29sb3IgPSBlbnYuRk9SQ0VfQ09MT1IubGVuZ3RoID09PSAwIHx8IHBhcnNlSW50KGVudi5GT1JDRV9DT0xPUiwgMTApICE9PSAwO1xufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGVMZXZlbChsZXZlbCkge1xuXHRpZiAobGV2ZWwgPT09IDApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGxldmVsLFxuXHRcdGhhc0Jhc2ljOiB0cnVlLFxuXHRcdGhhczI1NjogbGV2ZWwgPj0gMixcblx0XHRoYXMxNm06IGxldmVsID49IDNcblx0fTtcbn1cblxuZnVuY3Rpb24gc3VwcG9ydHNDb2xvcihzdHJlYW0pIHtcblx0aWYgKGZvcmNlQ29sb3IgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRpZiAoaGFzRmxhZygnY29sb3I9MTZtJykgfHxcblx0XHRoYXNGbGFnKCdjb2xvcj1mdWxsJykgfHxcblx0XHRoYXNGbGFnKCdjb2xvcj10cnVlY29sb3InKSkge1xuXHRcdHJldHVybiAzO1xuXHR9XG5cblx0aWYgKGhhc0ZsYWcoJ2NvbG9yPTI1NicpKSB7XG5cdFx0cmV0dXJuIDI7XG5cdH1cblxuXHRpZiAoc3RyZWFtICYmICFzdHJlYW0uaXNUVFkgJiYgZm9yY2VDb2xvciAhPT0gdHJ1ZSkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Y29uc3QgbWluID0gZm9yY2VDb2xvciA/IDEgOiAwO1xuXG5cdGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG5cdFx0Ly8gTm9kZS5qcyA3LjUuMCBpcyB0aGUgZmlyc3QgdmVyc2lvbiBvZiBOb2RlLmpzIHRvIGluY2x1ZGUgYSBwYXRjaCB0b1xuXHRcdC8vIGxpYnV2IHRoYXQgZW5hYmxlcyAyNTYgY29sb3Igb3V0cHV0IG9uIFdpbmRvd3MuIEFueXRoaW5nIGVhcmxpZXIgYW5kIGl0XG5cdFx0Ly8gd29uJ3Qgd29yay4gSG93ZXZlciwgaGVyZSB3ZSB0YXJnZXQgTm9kZS5qcyA4IGF0IG1pbmltdW0gYXMgaXQgaXMgYW4gTFRTXG5cdFx0Ly8gcmVsZWFzZSwgYW5kIE5vZGUuanMgNyBpcyBub3QuIFdpbmRvd3MgMTAgYnVpbGQgMTA1ODYgaXMgdGhlIGZpcnN0IFdpbmRvd3Ncblx0XHQvLyByZWxlYXNlIHRoYXQgc3VwcG9ydHMgMjU2IGNvbG9ycy4gV2luZG93cyAxMCBidWlsZCAxNDkzMSBpcyB0aGUgZmlyc3QgcmVsZWFzZVxuXHRcdC8vIHRoYXQgc3VwcG9ydHMgMTZtL1RydWVDb2xvci5cblx0XHRjb25zdCBvc1JlbGVhc2UgPSBvcy5yZWxlYXNlKCkuc3BsaXQoJy4nKTtcblx0XHRpZiAoXG5cdFx0XHROdW1iZXIocHJvY2Vzcy52ZXJzaW9ucy5ub2RlLnNwbGl0KCcuJylbMF0pID49IDggJiZcblx0XHRcdE51bWJlcihvc1JlbGVhc2VbMF0pID49IDEwICYmXG5cdFx0XHROdW1iZXIob3NSZWxlYXNlWzJdKSA+PSAxMDU4NlxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIE51bWJlcihvc1JlbGVhc2VbMl0pID49IDE0OTMxID8gMyA6IDI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRpZiAoJ0NJJyBpbiBlbnYpIHtcblx0XHRpZiAoWydUUkFWSVMnLCAnQ0lSQ0xFQ0knLCAnQVBQVkVZT1InLCAnR0lUTEFCX0NJJ10uc29tZShzaWduID0+IHNpZ24gaW4gZW52KSB8fCBlbnYuQ0lfTkFNRSA9PT0gJ2NvZGVzaGlwJykge1xuXHRcdFx0cmV0dXJuIDE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1pbjtcblx0fVxuXG5cdGlmICgnVEVBTUNJVFlfVkVSU0lPTicgaW4gZW52KSB7XG5cdFx0cmV0dXJuIC9eKDlcXC4oMCpbMS05XVxcZCopXFwufFxcZHsyLH1cXC4pLy50ZXN0KGVudi5URUFNQ0lUWV9WRVJTSU9OKSA/IDEgOiAwO1xuXHR9XG5cblx0aWYgKGVudi5DT0xPUlRFUk0gPT09ICd0cnVlY29sb3InKSB7XG5cdFx0cmV0dXJuIDM7XG5cdH1cblxuXHRpZiAoJ1RFUk1fUFJPR1JBTScgaW4gZW52KSB7XG5cdFx0Y29uc3QgdmVyc2lvbiA9IHBhcnNlSW50KChlbnYuVEVSTV9QUk9HUkFNX1ZFUlNJT04gfHwgJycpLnNwbGl0KCcuJylbMF0sIDEwKTtcblxuXHRcdHN3aXRjaCAoZW52LlRFUk1fUFJPR1JBTSkge1xuXHRcdFx0Y2FzZSAnaVRlcm0uYXBwJzpcblx0XHRcdFx0cmV0dXJuIHZlcnNpb24gPj0gMyA/IDMgOiAyO1xuXHRcdFx0Y2FzZSAnQXBwbGVfVGVybWluYWwnOlxuXHRcdFx0XHRyZXR1cm4gMjtcblx0XHRcdC8vIE5vIGRlZmF1bHRcblx0XHR9XG5cdH1cblxuXHRpZiAoLy0yNTYoY29sb3IpPyQvaS50ZXN0KGVudi5URVJNKSkge1xuXHRcdHJldHVybiAyO1xuXHR9XG5cblx0aWYgKC9ec2NyZWVufF54dGVybXxednQxMDB8XnZ0MjIwfF5yeHZ0fGNvbG9yfGFuc2l8Y3lnd2lufGxpbnV4L2kudGVzdChlbnYuVEVSTSkpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdGlmICgnQ09MT1JURVJNJyBpbiBlbnYpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdGlmIChlbnYuVEVSTSA9PT0gJ2R1bWInKSB7XG5cdFx0cmV0dXJuIG1pbjtcblx0fVxuXG5cdHJldHVybiBtaW47XG59XG5cbmZ1bmN0aW9uIGdldFN1cHBvcnRMZXZlbChzdHJlYW0pIHtcblx0Y29uc3QgbGV2ZWwgPSBzdXBwb3J0c0NvbG9yKHN0cmVhbSk7XG5cdHJldHVybiB0cmFuc2xhdGVMZXZlbChsZXZlbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRzdXBwb3J0c0NvbG9yOiBnZXRTdXBwb3J0TGV2ZWwsXG5cdHN0ZG91dDogZ2V0U3VwcG9ydExldmVsKHByb2Nlc3Muc3Rkb3V0KSxcblx0c3RkZXJyOiBnZXRTdXBwb3J0TGV2ZWwocHJvY2Vzcy5zdGRlcnIpXG59O1xuIiwiKGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pO1xuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG59KSgndXJsam9pbicsIHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBub3JtYWxpemUgKHN0ckFycmF5KSB7XG4gICAgdmFyIHJlc3VsdEFycmF5ID0gW107XG4gICAgaWYgKHN0ckFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cblxuICAgIGlmICh0eXBlb2Ygc3RyQXJyYXlbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIHN0ckFycmF5WzBdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZmlyc3QgcGFydCBpcyBhIHBsYWluIHByb3RvY29sLCB3ZSBjb21iaW5lIGl0IHdpdGggdGhlIG5leHQgcGFydC5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15bXi86XSs6XFwvKiQvKSAmJiBzdHJBcnJheS5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgZmlyc3QgPSBzdHJBcnJheS5zaGlmdCgpO1xuICAgICAgc3RyQXJyYXlbMF0gPSBmaXJzdCArIHN0ckFycmF5WzBdO1xuICAgIH1cblxuICAgIC8vIFRoZXJlIG11c3QgYmUgdHdvIG9yIHRocmVlIHNsYXNoZXMgaW4gdGhlIGZpbGUgcHJvdG9jb2wsIHR3byBzbGFzaGVzIGluIGFueXRoaW5nIGVsc2UuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eZmlsZTpcXC9cXC9cXC8vKSkge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLycpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBzdHJBcnJheVtpXTtcblxuICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgY29tcG9uZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvbmVudCA9PT0gJycpIHsgY29udGludWU7IH1cblxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBzdGFydGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGZpcnN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvXltcXC9dKy8sICcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgc3RyQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgZW5kaW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgbGFzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3IgdGhlIGxhc3QgY29tcG9uZW50IHdlIHdpbGwgY29tYmluZSBtdWx0aXBsZSBzbGFzaGVzIHRvIGEgc2luZ2xlIG9uZS5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnLycpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRBcnJheS5wdXNoKGNvbXBvbmVudCk7XG5cbiAgICB9XG5cbiAgICB2YXIgc3RyID0gcmVzdWx0QXJyYXkuam9pbignLycpO1xuICAgIC8vIEVhY2ggaW5wdXQgY29tcG9uZW50IGlzIG5vdyBzZXBhcmF0ZWQgYnkgYSBzaW5nbGUgc2xhc2ggZXhjZXB0IHRoZSBwb3NzaWJsZSBmaXJzdCBwbGFpbiBwcm90b2NvbCBwYXJ0LlxuXG4gICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGJlZm9yZSBwYXJhbWV0ZXJzIG9yIGhhc2hcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFwvKFxcP3wmfCNbXiFdKS9nLCAnJDEnKTtcblxuICAgIC8vIHJlcGxhY2UgPyBpbiBwYXJhbWV0ZXJzIHdpdGggJlxuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnPycpO1xuICAgIHN0ciA9IHBhcnRzLnNoaWZ0KCkgKyAocGFydHMubGVuZ3RoID4gMCA/ICc/JzogJycpICsgcGFydHMuam9pbignJicpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlucHV0O1xuXG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpbnB1dCA9IGFyZ3VtZW50c1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShpbnB1dCk7XG4gIH07XG5cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXNzZXJ0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJlYW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHR5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dGlsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInpsaWJcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbGliL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJmb3JtRGF0YSIsImNvbmZpZyIsIl9fYXNzaWduIiwidXJsIiwidXNlcm5hbWUiLCJFcnJvciIsImtleSIsInJlcXVlc3QiLCJyZXF1ZXN0XzEiLCJtYWlsTGlzdHNNZW1iZXJzIiwibWFpbExpc3RNZW1iZXJzXzEiLCJkb21haW5DcmVkZW50aWFsc0NsaWVudCIsImRvbWFpbnNDcmVkZW50aWFsc18xIiwiZG9tYWluVGVtcGxhdGVzQ2xpZW50IiwiZG9tYWluc1RlbXBsYXRlc18xIiwiZG9tYWluVGFnc0NsaWVudCIsImRvbWFpbnNUYWdzXzEiLCJtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJtdWx0aXBsZVZhbGlkYXRpb25fMSIsImRvbWFpbnMiLCJkb21haW5zXzEiLCJ3ZWJob29rcyIsIndlYmhvb2tzXzEiLCJldmVudHMiLCJldmVudHNfMSIsInN0YXRzIiwic3RhdHNfMSIsInN1cHByZXNzaW9ucyIsInN1cHByZXNzaW9uc18xIiwibWVzc2FnZXMiLCJtZXNzYWdlc18xIiwicm91dGVzIiwicm91dGVzXzEiLCJpcHMiLCJpcHNfMSIsImlwX3Bvb2xzIiwiaXBfcG9vbHNfMSIsImxpc3RzIiwibGlzdHNfMSIsInZhbGlkYXRlIiwidmFsaWRhdGVfMSIsIk5hdmlnYXRpb25UaHJ1UGFnZXMiLCJpZCIsInBhZ2VVcmwiLCJ1cmxTZXBhcmF0b3IiLCJpdGVyYXRvck5hbWUiLCJwYXJzZWRVcmwiLCJVUkwiLCJwYWdlVmFsdWUiLCJzcGxpdCIsInBvcCIsInBhZ2UiLCJpdGVyYXRvclBvc2l0aW9uIiwic2VhcmNoUGFyYW1zIiwiaGFzIiwiZ2V0IiwidW5kZWZpbmVkIiwicmVzcG9uc2UiLCJwYWdlcyIsIk9iamVjdCIsImVudHJpZXMiLCJib2R5IiwicGFnaW5nIiwicmVkdWNlIiwiYWNjIiwicGFpciIsIl90aGlzIiwicGFyc2VQYWdlIiwiZGF0YSIsInJlY2VpdmluZyIsInNlbmRpbmciLCJuYW1lIiwicmVxdWlyZV90bHMiLCJza2lwX3ZlcmlmaWNhdGlvbiIsInN0YXRlIiwid2lsZGNhcmQiLCJzcGFtX2FjdGlvbiIsImNyZWF0ZWRfYXQiLCJzbXRwX3Bhc3N3b3JkIiwic210cF9sb2dpbiIsInR5cGUiLCJyZWNlaXZpbmdfZG5zX3JlY29yZHMiLCJzZW5kaW5nX2Ruc19yZWNvcmRzIiwiZXhwb3J0cyIsImRvbWFpbkNyZWRlbnRpYWxzIiwiZG9tYWluVGVtcGxhdGVzIiwiZG9tYWluVGFncyIsIkRvbWFpbkNsaWVudCIsIml0ZW1zIiwibWFwIiwiaXRlbSIsIkRvbWFpbiIsImRvbWFpbiIsInRyYWNraW5nIiwicXVlcnkiLCJ0aGVuIiwicmVzIiwiX3BhcnNlRG9tYWluTGlzdCIsIl9wYXJzZURvbWFpbiIsInBvc3RPYmoiLCJmb3JjZV9ka2ltX2F1dGhvcml0eSIsInRvU3RyaW5nIiwicG9zdFdpdGhGRCIsInB1dCIsImRlbGV0ZSIsIl9wYXJzZU1lc3NhZ2UiLCJjb25uZWN0aW9uIiwiX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyIsImFjdGl2ZSIsImVycm9yXzEiLCJzdGF0dXMiLCJzdGF0dXNUZXh0IiwibWVzc2FnZSIsInB1dFdpdGhGRCIsIl9wYXJzZVRyYWNraW5nVXBkYXRlIiwiX2EiLCJpcCIsInBvb2xfaWQiLCJyZXBsYWNlbWVudCIsInNlbGYiLCJka2ltU2VsZWN0b3IiLCJ3ZWJQcmVmaXgiLCJiYXNlUm91dGUiLCJEb21haW5DcmVkZW50aWFsc0NsaWVudCIsInRvdGFsQ291bnQiLCJ0b3RhbF9jb3VudCIsInJlc3VsdCIsInNwZWMiLCJfcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QiLCJjb25jYXQiLCJfcGFyc2VNZXNzYWdlUmVzcG9uc2UiLCJjcmVkZW50aWFsc0xvZ2luIiwiX3BhcnNlRGVsZXRlZFJlc3BvbnNlIiwidGFnSW5mbyIsInRhZyIsImRlc2NyaXB0aW9uIiwiRGF0ZSIsInRhZ1N0YXRpc3RpY0luZm8iLCJzdGFydCIsImVuZCIsInJlc29sdXRpb24iLCJzdGF0IiwidGltZSIsIl9fZXh0ZW5kcyIsIl9zdXBlciIsIkRvbWFpblRhZ3NDbGllbnQiLCJEb21haW5UYWciLCJwYXJzZVBhZ2VMaW5rcyIsIkRvbWFpblRhZ1N0YXRpc3RpYyIsInF1ZXJ5Q29weSIsInBhcnNlTGlzdCIsIl9wYXJzZVRhZ1N0YXRpc3RpYyIsIk5hdmlnYXRpb25UaHJ1UGFnZXNfMSIsImRvbWFpblRlbXBsYXRlRnJvbUFQSSIsImNyZWF0ZWRBdCIsImNyZWF0ZWRCeSIsInZlcnNpb24iLCJ2ZXJzaW9ucyIsImxlbmd0aCIsIkRvbWFpblRlbXBsYXRlc0NsaWVudCIsIkRvbWFpblRlbXBsYXRlSXRlbSIsInRlbXBsYXRlIiwidGVtcGxhdGVOYW1lIiwidGVtcGxhdGVWZXJzaW9uIiwiZCIsInBhcnNlQ3JlYXRpb25SZXNwb25zZSIsInBhcnNlTXV0YXRpb25SZXNwb25zZSIsInBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UiLCJwYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlIiwicGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZSIsInBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMiLCJfYiIsImJvZHlNZXNzYWdlIiwiZXJyb3IiLCJzdGFjayIsImRldGFpbHMiLCJFdmVudENsaWVudCIsIm51bWJlciIsIl9wYXJzZVBhZ2VOdW1iZXIiLCJfcGFyc2VQYWdlIiwiX3BhcnNlUGFnZUxpbmtzIiwiX3BhcnNlRXZlbnRMaXN0IiwiRm9ybURhdGFDb25zdHJ1Y3RvciIsIkZvcm1EYXRhQnVpbGRlciIsImtleXMiLCJmaWx0ZXIiLCJmb3JtRGF0YUFjYyIsImZpbGVLZXlzIiwiaW5jbHVkZXMiLCJhZGRGaWxlc1RvRkQiLCJhZGRNaW1lRGF0YVRvRkQiLCJhZGRDb21tb25Qcm9wZXJ0eVRvRkQiLCJmb3JtRGF0YUluc3RhbmNlIiwiZ2V0SGVhZGVycyIsImlzU3RyZWFtIiwiY29udGVudFR5cGUiLCJrbm93bkxlbmd0aCIsImZpbGVuYW1lIiwiQnVmZmVyIiwiaXNCdWZmZXIiLCJub2RlRm9ybURhdGEiLCJwcmVwYXJlZERhdGEiLCJmcm9tIiwiYXBwZW5kIiwiYnJvd3NlckZvcm1EYXRhIiwicHJvcGVydHlOYW1lIiwidmFsdWUiLCJhcHBlbmRGaWxlVG9GRCIsIm9yaWdpbmFsS2V5Iiwib2JqIiwiaXNTdHJlYW1EYXRhIiwib2JqRGF0YSIsImdldEF0dGFjaG1lbnRPcHRpb25zIiwiaXNOb2RlRm9ybURhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwicGlwZSIsIkZvcm1EYXRhIiwiTWFpbGd1biIsImNsaWVudF8xIiwiU3VwcHJlc3Npb25Nb2RlbHMiLCJJcFBvb2xzQ2xpZW50IiwicGFyc2VJcFBvb2xzUmVzcG9uc2UiLCJwb29sSWQiLCJwYXRjaFdpdGhGRCIsIklwc0NsaWVudCIsInBhcnNlSXBzUmVzcG9uc2UiLCJtZW1iZXJzIiwiTGlzdHNDbGllbnQiLCJ2YWxpZGF0aW9uUmVzdWx0IiwibWFpbExpc3RBZGRyZXNzIiwibGlzdCIsInBvc3QiLCJwYXJzZVZhbGlkYXRpb25SZXN1bHQiLCJNYWlsTGlzdHNNZW1iZXJzIiwibmV3RGF0YSIsInZhcnMiLCJKU09OIiwic3RyaW5naWZ5Iiwic3Vic2NyaWJlZCIsImFwaVJlc3BvbnNlIiwibWFpbExpc3RNZW1iZXJBZGRyZXNzIiwibWVtYmVyIiwicmVxRGF0YSIsImNoZWNrQW5kVXBkYXRlRGF0YSIsInVwc2VydCIsIk1lc3NhZ2VzQ2xpZW50IiwieWVzTm9Qcm9wZXJ0aWVzIiwiU2V0IiwiX3BhcnNlUmVzcG9uc2UiLCJtb2RpZmllZERhdGEiLCJwcmVwYXJlQm9vbGVhblZhbHVlcyIsIk11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCIsImhhbmRsZVJlc3BvbnNlIiwibGlzdElkIiwicmVzcG9uc2VTdGF0dXNDb2RlIiwibXVsdGlwbGVWYWxpZGF0aW9uRGF0YSIsIm11bHRpcGxlVmFsaWRhdGlvbkZpbGUiLCJmaWxlIiwidGltZW91dCIsImhlYWRlcnMiLCJmb3JtRGF0YUJ1aWxkZXIiLCJmb3JtRGF0YUJ1aWxkZXJfMSIsIm1heEJvZHlMZW5ndGgiLCJSZXF1ZXN0IiwibWV0aG9kIiwib25DYWxsT3B0aW9ucyIsImJhc2ljIiwiYmFzZTY0IiwiZW5jb2RlIiwib25DYWxsSGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJwYXJhbXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiVVJMU2VhcmNoUGFyYW1zIiwidXJsVmFsdWUiLCJheGlvc18xIiwidG9Mb2NhbGVVcHBlckNhc2UiLCJfZCIsImVycm9yUmVzcG9uc2UiLCJlcnJfMSIsImNvZGUiLCJfYyIsImdldFJlc3BvbnNlQm9keSIsImFkZERlZmF1bHRIZWFkZXJzIiwicmVxdWVzdE9wdGlvbnMiLCJjb21tYW5kIiwiY3JlYXRlRm9ybURhdGEiLCJSb3V0ZXNDbGllbnQiLCJyb3V0ZSIsIlN0YXRzQ2xpZW50IiwiYXJyYXlXaXRoUGFpcnMiLCJjdXJyZW50UGFpciIsInJlcGVhdGVkUHJvcGVydHkiLCJwdXNoIiwiU3RhdHMiLCJwcmVwYXJlU2VhcmNoUGFyYW1zIiwiX3BhcnNlU3RhdHMiLCJjcmVhdGVPcHRpb25zIiwiU3VwcmVzc2lvbnNfMSIsIkJPVU5DRVMiLCJhZGRyZXNzIiwiU3VwcHJlc3Npb24iLCJDT01QTEFJTlRTIiwiVU5TVUJTQ1JJQkVTIiwidGFncyIsIldISVRFTElTVFMiLCJyZWFzb24iLCJtb2RlbHMiLCJNYXAiLCJzZXQiLCJCb3VuY2UiLCJDb21wbGFpbnQiLCJVbnN1YnNjcmliZSIsIldoaXRlTGlzdCIsIlN1cHByZXNzaW9uQ2xpZW50IiwiTW9kZWwiLCJwcmVwYXJlUmVzcG9uc2UiLCJjaGVja1R5cGUiLCJtb2RlbCIsIl9wYXJzZUxpc3QiLCJlbmNvZGVVUklDb21wb25lbnQiLCJfcGFyc2VJdGVtIiwicG9zdERhdGEiLCJjcmVhdGVXaGl0ZUxpc3QiLCJtb2R1bGUiLCJtdWx0aXBsZVZhbGlkYXRpb24iLCJWYWxpZGF0ZUNsaWVudCIsIldlYmhvb2tDbGllbnQiLCJ3ZWJob29rUmVzcG9uc2UiLCJ3ZWJob29rIiwidXJscyIsIldlYmhvb2siLCJfcGFyc2VXZWJob29rTGlzdCIsIl9wYXJzZVdlYmhvb2tXaXRoSUQiLCJ0ZXN0IiwiX3BhcnNlV2ViaG9va1Rlc3QiXSwic291cmNlUm9vdCI6IiJ9