/*! mailgun.js v8.0.6 */
/*! mailgun.js v8.0.6 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mailgun"] = factory();
	else
		root["mailgun"] = factory();
})(this, () => {
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

/***/ "./lib/Classes/Domains/domains.ts":
/*!****************************************!*\
  !*** ./lib/Classes/Domains/domains.ts ***!
  \****************************************/
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
var Error_1 = __importDefault(__webpack_require__(/*! ../common/Error */ "./lib/Classes/common/Error.ts"));
var Domain = /** @class */function () {
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
var DomainClient = /** @class */function () {
  function DomainClient(request, domainCredentialsClient, domainTemplatesClient, domainTagsClient) {
    this.request = request;
    this.domainCredentials = domainCredentialsClient;
    this.domainTemplates = domainTemplatesClient;
    this.domainTags = domainTagsClient;
  }
  DomainClient.prototype._parseMessage = function (response) {
    return response.body;
  };
  DomainClient.prototype.parseDomainList = function (response) {
    if (response.body && response.body.items) {
      return response.body.items.map(function (item) {
        return new Domain(item);
      });
    }
    return [];
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
      return _this.parseDomainList(res);
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
      postObj.force_dkim_authority = postObj.force_dkim_authority.toString() === 'true' ? 'true' : 'false';
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
  };
  // Tracking
  DomainClient.prototype.getTracking = function (domain) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'tracking')).then(this._parseTrackingSettings);
  };
  DomainClient.prototype.updateTracking = function (domain, type, data) {
    var _this = this;
    if (typeof (data === null || data === void 0 ? void 0 : data.active) === 'boolean') {
      throw new Error_1.default({
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
  };
  // IPs
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
      throw new Error_1.default({
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

/***/ "./lib/Classes/Domains/domainsCredentials.ts":
/*!***************************************************!*\
  !*** ./lib/Classes/Domains/domainsCredentials.ts ***!
  \***************************************************/
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
var DomainCredentialsClient = /** @class */function () {
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

/***/ "./lib/Classes/Domains/domainsTags.ts":
/*!********************************************!*\
  !*** ./lib/Classes/Domains/domainsTags.ts ***!
  \********************************************/
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.DomainTagStatistic = exports.DomainTag = void 0;
var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));
var NavigationThruPages_1 = __importDefault(__webpack_require__(/*! ../common/NavigationThruPages */ "./lib/Classes/common/NavigationThruPages.ts"));
var DomainTag = /** @class */function () {
  function DomainTag(tagInfo) {
    this.tag = tagInfo.tag;
    this.description = tagInfo.description;
    this['first-seen'] = new Date(tagInfo['first-seen']);
    this['last-seen'] = new Date(tagInfo['last-seen']);
  }
  return DomainTag;
}();
exports.DomainTag = DomainTag;
var DomainTagStatistic = /** @class */function () {
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
var DomainTagsClient = /** @class */function (_super) {
  __extends(DomainTagsClient, _super);
  function DomainTagsClient(request) {
    var _this = _super.call(this, request) || this;
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
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.requestListWithPages((0, url_join_1.default)(this.baseRoute, domain, '/tags'), query)];
      });
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

/***/ "./lib/Classes/Domains/domainsTemplates.ts":
/*!*************************************************!*\
  !*** ./lib/Classes/Domains/domainsTemplates.ts ***!
  \*************************************************/
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.DomainTemplateItem = void 0;
var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));
var NavigationThruPages_1 = __importDefault(__webpack_require__(/*! ../common/NavigationThruPages */ "./lib/Classes/common/NavigationThruPages.ts"));
var DomainTemplateItem = /** @class */function () {
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
var DomainTemplatesClient = /** @class */function (_super) {
  __extends(DomainTemplatesClient, _super);
  function DomainTemplatesClient(request) {
    var _this = _super.call(this, request) || this;
    _this.request = request;
    _this.baseRoute = '/v3/';
    return _this;
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
    data.pages = this.parsePageLinks(response, '?', 'p');
    data.status = response.status;
    return data;
  };
  DomainTemplatesClient.prototype.parseListTemplateVersions = function (response) {
    var data = {};
    data.template = new DomainTemplateItem(response.body.template);
    data.pages = this.parsePageLinks(response, '?', 'p');
    return data;
  };
  DomainTemplatesClient.prototype.list = function (domain, query) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.requestListWithPages((0, url_join_1.default)(this.baseRoute, domain, '/templates'), query)];
      });
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
    return this.request.putWithFD((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag), data).then(
    // eslint-disable-next-line max-len
    function (res) {
      return _this.parseMutateTemplateVersionResponse(res);
    });
  };
  DomainTemplatesClient.prototype.destroyVersion = function (domain, templateName, tag) {
    var _this = this;
    return this.request.delete((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag))
    // eslint-disable-next-line max-len
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
}(NavigationThruPages_1.default);
exports["default"] = DomainTemplatesClient;

/***/ }),

/***/ "./lib/Classes/Events.ts":
/*!*******************************!*\
  !*** ./lib/Classes/Events.ts ***!
  \*******************************/
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var NavigationThruPages_1 = __importDefault(__webpack_require__(/*! ./common/NavigationThruPages */ "./lib/Classes/common/NavigationThruPages.ts"));
var EventClient = /** @class */function (_super) {
  __extends(EventClient, _super);
  function EventClient(request) {
    var _this = _super.call(this, request) || this;
    _this.request = request;
    return _this;
  }
  EventClient.prototype.parseList = function (response) {
    var data = {};
    data.items = response.body.items;
    data.pages = this.parsePageLinks(response, '/');
    data.status = response.status;
    return data;
  };
  EventClient.prototype.get = function (domain, query) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.requestListWithPages((0, url_join_1.default)('/v3', domain, 'events'), query)];
      });
    });
  };
  return EventClient;
}(NavigationThruPages_1.default);
exports["default"] = EventClient;

/***/ }),

/***/ "./lib/Classes/IPPools.ts":
/*!********************************!*\
  !*** ./lib/Classes/IPPools.ts ***!
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var IpPoolsClient = /** @class */function () {
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
            return [4 /*yield*/, this.request.postWithFD('/v1/ip_pools', data)];
          case 1:
            response = _a.sent();
            return [2 /*return*/, __assign({
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
            return [4 /*yield*/, this.request.patchWithFD("/v1/ip_pools/".concat(poolId), data)];
          case 1:
            response = _a.sent();
            return [2 /*return*/, __assign({
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
            return [4 /*yield*/, this.request.delete("/v1/ip_pools/".concat(poolId), data)];
          case 1:
            response = _a.sent();
            return [2 /*return*/, __assign({
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

/***/ "./lib/Classes/IPs.ts":
/*!****************************!*\
  !*** ./lib/Classes/IPs.ts ***!
  \****************************/
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var IpsClient = /** @class */function () {
  function IpsClient(request) {
    this.request = request;
  }
  IpsClient.prototype.list = function (query) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.request.get('/v3/ips', query)];
          case 1:
            response = _a.sent();
            return [2 /*return*/, this.parseIpsResponse(response)];
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
            return [4 /*yield*/, this.request.get("/v3/ips/".concat(ip))];
          case 1:
            response = _a.sent();
            return [2 /*return*/, this.parseIpsResponse(response)];
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

/***/ "./lib/Classes/MailgunClient.ts":
/*!**************************************!*\
  !*** ./lib/Classes/MailgunClient.ts ***!
  \**************************************/
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
var Request_1 = __importDefault(__webpack_require__(/*! ./common/Request */ "./lib/Classes/common/Request.ts"));
var domains_1 = __importDefault(__webpack_require__(/*! ./Domains/domains */ "./lib/Classes/Domains/domains.ts"));
var Events_1 = __importDefault(__webpack_require__(/*! ./Events */ "./lib/Classes/Events.ts"));
var StatsClient_1 = __importDefault(__webpack_require__(/*! ./Stats/StatsClient */ "./lib/Classes/Stats/StatsClient.ts"));
var SuppressionsClient_1 = __importDefault(__webpack_require__(/*! ./Suppressions/SuppressionsClient */ "./lib/Classes/Suppressions/SuppressionsClient.ts"));
var Webhooks_1 = __importDefault(__webpack_require__(/*! ./Webhooks */ "./lib/Classes/Webhooks.ts"));
var Messages_1 = __importDefault(__webpack_require__(/*! ./Messages */ "./lib/Classes/Messages.ts"));
var Routes_1 = __importDefault(__webpack_require__(/*! ./Routes */ "./lib/Classes/Routes.ts"));
var validate_1 = __importDefault(__webpack_require__(/*! ./Validations/validate */ "./lib/Classes/Validations/validate.ts"));
var IPs_1 = __importDefault(__webpack_require__(/*! ./IPs */ "./lib/Classes/IPs.ts"));
var IPPools_1 = __importDefault(__webpack_require__(/*! ./IPPools */ "./lib/Classes/IPPools.ts"));
var mailingLists_1 = __importDefault(__webpack_require__(/*! ./MailingLists/mailingLists */ "./lib/Classes/MailingLists/mailingLists.ts"));
var mailListMembers_1 = __importDefault(__webpack_require__(/*! ./MailingLists/mailListMembers */ "./lib/Classes/MailingLists/mailListMembers.ts"));
var domainsCredentials_1 = __importDefault(__webpack_require__(/*! ./Domains/domainsCredentials */ "./lib/Classes/Domains/domainsCredentials.ts"));
var multipleValidation_1 = __importDefault(__webpack_require__(/*! ./Validations/multipleValidation */ "./lib/Classes/Validations/multipleValidation.ts"));
var domainsTemplates_1 = __importDefault(__webpack_require__(/*! ./Domains/domainsTemplates */ "./lib/Classes/Domains/domainsTemplates.ts"));
var domainsTags_1 = __importDefault(__webpack_require__(/*! ./Domains/domainsTags */ "./lib/Classes/Domains/domainsTags.ts"));
var MailgunClient = /** @class */function () {
  function MailgunClient(options, formData) {
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
    this.request = new Request_1.default(config, formData);
    var mailListsMembers = new mailListMembers_1.default(this.request);
    var domainCredentialsClient = new domainsCredentials_1.default(this.request);
    var domainTemplatesClient = new domainsTemplates_1.default(this.request);
    var domainTagsClient = new domainsTags_1.default(this.request);
    var multipleValidationClient = new multipleValidation_1.default(this.request);
    this.domains = new domains_1.default(this.request, domainCredentialsClient, domainTemplatesClient, domainTagsClient);
    this.webhooks = new Webhooks_1.default(this.request);
    this.events = new Events_1.default(this.request);
    this.stats = new StatsClient_1.default(this.request);
    this.suppressions = new SuppressionsClient_1.default(this.request);
    this.messages = new Messages_1.default(this.request);
    this.routes = new Routes_1.default(this.request);
    this.ips = new IPs_1.default(this.request);
    this.ip_pools = new IPPools_1.default(this.request);
    this.lists = new mailingLists_1.default(this.request, mailListsMembers);
    this.validate = new validate_1.default(this.request, multipleValidationClient);
  }
  return MailgunClient;
}();
exports["default"] = MailgunClient;

/***/ }),

/***/ "./lib/Classes/MailingLists/mailListMembers.ts":
/*!*****************************************************!*\
  !*** ./lib/Classes/MailingLists/mailListMembers.ts ***!
  \*****************************************************/
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var NavigationThruPages_1 = __importDefault(__webpack_require__(/*! ../common/NavigationThruPages */ "./lib/Classes/common/NavigationThruPages.ts"));
var MailListsMembers = /** @class */function (_super) {
  __extends(MailListsMembers, _super);
  function MailListsMembers(request) {
    var _this = _super.call(this, request) || this;
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
    data.pages = this.parsePageLinks(response, '?', 'address');
    return data;
  };
  MailListsMembers.prototype.listMembers = function (mailListAddress, query) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.requestListWithPages("".concat(this.baseRoute, "/").concat(mailListAddress, "/members/pages"), query)];
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

/***/ "./lib/Classes/MailingLists/mailingLists.ts":
/*!**************************************************!*\
  !*** ./lib/Classes/MailingLists/mailingLists.ts ***!
  \**************************************************/
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var NavigationThruPages_1 = __importDefault(__webpack_require__(/*! ../common/NavigationThruPages */ "./lib/Classes/common/NavigationThruPages.ts"));
var ListsClient = /** @class */function (_super) {
  __extends(ListsClient, _super);
  function ListsClient(request, members) {
    var _this = _super.call(this, request) || this;
    _this.request = request;
    _this.baseRoute = '/v3/lists';
    _this.members = members;
    return _this;
  }
  ListsClient.prototype.parseValidationResult = function (status, data) {
    return {
      status: status,
      validationResult: __assign(__assign({}, data), {
        created_at: new Date(data.created_at * 1000) // add millisecond to Unix timestamp
      })
    };
  };

  ListsClient.prototype.parseList = function (response) {
    var data = {};
    data.items = response.body.items;
    data.pages = this.parsePageLinks(response, '?', 'address');
    data.status = response.status;
    return data;
  };
  ListsClient.prototype.list = function (query) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.requestListWithPages("".concat(this.baseRoute, "/pages"), query)];
      });
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
}(NavigationThruPages_1.default);
exports["default"] = ListsClient;

/***/ }),

/***/ "./lib/Classes/Messages.ts":
/*!*********************************!*\
  !*** ./lib/Classes/Messages.ts ***!
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
var Error_1 = __importDefault(__webpack_require__(/*! ./common/Error */ "./lib/Classes/common/Error.ts"));
var MessagesClient = /** @class */function () {
  function MessagesClient(request) {
    this.request = request;
  }
  MessagesClient.prototype.prepareBooleanValues = function (data) {
    var yesNoProperties = new Set(['o:testmode', 't:text', 'o:dkim', 'o:tracking', 'o:tracking-clicks', 'o:tracking-opens', 'o:require-tls', 'o:skip-verification']);
    if (!data || Object.keys(data).length === 0) {
      throw new Error_1.default({
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

/***/ "./lib/Classes/Routes.ts":
/*!*******************************!*\
  !*** ./lib/Classes/Routes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var RoutesClient = /** @class */function () {
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

/***/ "./lib/Classes/Stats/StatsClient.ts":
/*!******************************************!*\
  !*** ./lib/Classes/Stats/StatsClient.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var StatsContainer_1 = __importDefault(__webpack_require__(/*! ./StatsContainer */ "./lib/Classes/Stats/StatsContainer.ts"));
var StatsClient = /** @class */function () {
  function StatsClient(request, logger) {
    if (logger === void 0) {
      logger = console;
    }
    this.request = request;
    this.logger = logger;
  }
  StatsClient.prototype.convertDateToUTC = function (key, inputDate) {
    /*
      Because "new Date('2022-12-25T00:00:00.000Z')" becomes "Sun Dec 25 2022 02:00:00 GMT+0200"
      (plus 2 hours from the timezone)
      and because for API, we need to provide the date in the expected format
      ex: 'Thu, 13 Oct 2011 18:02:00 +0000'.
      Here we try auto-convert them to UTC
    */
    this.logger.warn("Date:\"".concat(inputDate, "\" was auto-converted to UTC time zone.\nValue \"").concat(inputDate.toUTCString(), "\" will be used for request.\nConsider using sting type for property \"").concat(key, "\" to avoid auto-converting"));
    return [key, inputDate.toUTCString()];
  };
  StatsClient.prototype.prepareSearchParams = function (query) {
    var _this = this;
    var searchParams = [];
    if (typeof query === 'object' && Object.keys(query).length) {
      searchParams = Object.entries(query).reduce(function (arrayWithPairs, currentPair) {
        var key = currentPair[0],
          value = currentPair[1];
        if (Array.isArray(value) && value.length) {
          // event: ['delivered', 'accepted']
          var repeatedProperty = value.map(function (item) {
            return [key, item];
          });
          return __spreadArray(__spreadArray([], arrayWithPairs, true), repeatedProperty, true); // [[event,delivered], [event,accepted]]
        }

        if (value instanceof Date) {
          arrayWithPairs.push(_this.convertDateToUTC(key, value));
          return arrayWithPairs;
        }
        if (typeof value === 'string') {
          arrayWithPairs.push([key, value]);
        }
        return arrayWithPairs;
      }, []);
    }
    return searchParams;
  };
  StatsClient.prototype.parseStats = function (response) {
    return new StatsContainer_1.default(response.body);
  };
  StatsClient.prototype.getDomain = function (domain, query) {
    var searchParams = this.prepareSearchParams(query);
    return this.request.get((0, url_join_1.default)('/v3', domain, 'stats/total'), searchParams).then(this.parseStats);
  };
  StatsClient.prototype.getAccount = function (query) {
    var searchParams = this.prepareSearchParams(query);
    return this.request.get('/v3/stats/total', searchParams).then(this.parseStats);
  };
  return StatsClient;
}();
exports["default"] = StatsClient;

/***/ }),

/***/ "./lib/Classes/Stats/StatsContainer.ts":
/*!*********************************************!*\
  !*** ./lib/Classes/Stats/StatsContainer.ts ***!
  \*********************************************/
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
var StatsContainer = /** @class */function () {
  function StatsContainer(data) {
    this.start = new Date(data.start);
    this.end = new Date(data.end);
    this.resolution = data.resolution;
    this.stats = data.stats.map(function (stat) {
      var res = __assign({}, stat);
      res.time = new Date(stat.time);
      return res;
    });
  }
  return StatsContainer;
}();
exports["default"] = StatsContainer;

/***/ }),

/***/ "./lib/Classes/Suppressions/Bounce.ts":
/*!********************************************!*\
  !*** ./lib/Classes/Suppressions/Bounce.ts ***!
  \********************************************/
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
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var Enums_1 = __webpack_require__(/*! ../../Enums */ "./lib/Enums/index.ts");
var Suppression_1 = __importDefault(__webpack_require__(/*! ./Suppression */ "./lib/Classes/Suppressions/Suppression.ts"));
var Bounce = /** @class */function (_super) {
  __extends(Bounce, _super);
  function Bounce(data) {
    var _this = _super.call(this, Enums_1.SuppressionModels.BOUNCES) || this;
    _this.address = data.address;
    _this.code = +data.code;
    _this.error = data.error;
    _this.created_at = new Date(data.created_at);
    return _this;
  }
  return Bounce;
}(Suppression_1.default);
exports["default"] = Bounce;

/***/ }),

/***/ "./lib/Classes/Suppressions/Complaint.ts":
/*!***********************************************!*\
  !*** ./lib/Classes/Suppressions/Complaint.ts ***!
  \***********************************************/
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
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var Enums_1 = __webpack_require__(/*! ../../Enums */ "./lib/Enums/index.ts");
var Suppression_1 = __importDefault(__webpack_require__(/*! ./Suppression */ "./lib/Classes/Suppressions/Suppression.ts"));
var Complaint = /** @class */function (_super) {
  __extends(Complaint, _super);
  function Complaint(data) {
    var _this = _super.call(this, Enums_1.SuppressionModels.COMPLAINTS) || this;
    _this.address = data.address;
    _this.created_at = new Date(data.created_at);
    return _this;
  }
  return Complaint;
}(Suppression_1.default);
exports["default"] = Complaint;

/***/ }),

/***/ "./lib/Classes/Suppressions/Suppression.ts":
/*!*************************************************!*\
  !*** ./lib/Classes/Suppressions/Suppression.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var Suppression = /** @class */function () {
  function Suppression(type) {
    this.type = type;
  }
  return Suppression;
}();
exports["default"] = Suppression;

/***/ }),

/***/ "./lib/Classes/Suppressions/SuppressionsClient.ts":
/*!********************************************************!*\
  !*** ./lib/Classes/Suppressions/SuppressionsClient.ts ***!
  \********************************************************/
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var Error_1 = __importDefault(__webpack_require__(/*! ../common/Error */ "./lib/Classes/common/Error.ts"));
var NavigationThruPages_1 = __importDefault(__webpack_require__(/*! ../common/NavigationThruPages */ "./lib/Classes/common/NavigationThruPages.ts"));
var Bounce_1 = __importDefault(__webpack_require__(/*! ./Bounce */ "./lib/Classes/Suppressions/Bounce.ts"));
var Complaint_1 = __importDefault(__webpack_require__(/*! ./Complaint */ "./lib/Classes/Suppressions/Complaint.ts"));
var Unsubscribe_1 = __importDefault(__webpack_require__(/*! ./Unsubscribe */ "./lib/Classes/Suppressions/Unsubscribe.ts"));
var WhiteList_1 = __importDefault(__webpack_require__(/*! ./WhiteList */ "./lib/Classes/Suppressions/WhiteList.ts"));
var createOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};
var SuppressionClient = /** @class */function (_super) {
  __extends(SuppressionClient, _super);
  function SuppressionClient(request) {
    var _this = _super.call(this, request) || this;
    _this.request = request;
    _this.models = new Map();
    _this.models.set('bounces', Bounce_1.default);
    _this.models.set('complaints', Complaint_1.default);
    _this.models.set('unsubscribes', Unsubscribe_1.default);
    _this.models.set('whitelists', WhiteList_1.default);
    return _this;
  }
  SuppressionClient.prototype.parseList = function (response, Model) {
    var data = {};
    data.items = response.body.items.map(function (item) {
      return new Model(item);
    });
    data.pages = this.parsePageLinks(response, '?', 'address');
    data.status = response.status;
    return data;
  };
  SuppressionClient.prototype._parseItem = function (data, Model) {
    return new Model(data);
  };
  SuppressionClient.prototype.createWhiteList = function (domain, data) {
    if (Array.isArray(data)) {
      throw new Error_1.default({
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
      throw new Error_1.default({
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
    return __awaiter(this, void 0, void 0, function () {
      var model;
      return __generator(this, function (_a) {
        this.checkType(type);
        model = this.models.get(type);
        return [2 /*return*/, this.requestListWithPages((0, url_join_1.default)('v3', domain, type), query, model)];
      });
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
    this.checkType(type);
    // supports adding multiple suppressions by default
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
}(NavigationThruPages_1.default);
exports["default"] = SuppressionClient;
module.exports = SuppressionClient;

/***/ }),

/***/ "./lib/Classes/Suppressions/Unsubscribe.ts":
/*!*************************************************!*\
  !*** ./lib/Classes/Suppressions/Unsubscribe.ts ***!
  \*************************************************/
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
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var Enums_1 = __webpack_require__(/*! ../../Enums */ "./lib/Enums/index.ts");
var Suppression_1 = __importDefault(__webpack_require__(/*! ./Suppression */ "./lib/Classes/Suppressions/Suppression.ts"));
var Unsubscribe = /** @class */function (_super) {
  __extends(Unsubscribe, _super);
  function Unsubscribe(data) {
    var _this = _super.call(this, Enums_1.SuppressionModels.UNSUBSCRIBES) || this;
    _this.address = data.address;
    _this.tags = data.tags;
    _this.created_at = new Date(data.created_at);
    return _this;
  }
  return Unsubscribe;
}(Suppression_1.default);
exports["default"] = Unsubscribe;

/***/ }),

/***/ "./lib/Classes/Suppressions/WhiteList.ts":
/*!***********************************************!*\
  !*** ./lib/Classes/Suppressions/WhiteList.ts ***!
  \***********************************************/
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
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var Enums_1 = __webpack_require__(/*! ../../Enums */ "./lib/Enums/index.ts");
var Suppression_1 = __importDefault(__webpack_require__(/*! ./Suppression */ "./lib/Classes/Suppressions/Suppression.ts"));
var WhiteList = /** @class */function (_super) {
  __extends(WhiteList, _super);
  function WhiteList(data) {
    var _this = _super.call(this, Enums_1.SuppressionModels.WHITELISTS) || this;
    _this.value = data.value;
    _this.reason = data.reason;
    _this.createdAt = new Date(data.createdAt);
    return _this;
  }
  return WhiteList;
}(Suppression_1.default);
exports["default"] = WhiteList;

/***/ }),

/***/ "./lib/Classes/Validations/multipleValidation.ts":
/*!*******************************************************!*\
  !*** ./lib/Classes/Validations/multipleValidation.ts ***!
  \*******************************************************/
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.MultipleValidationJob = void 0;
var NavigationThruPages_1 = __importDefault(__webpack_require__(/*! ../common/NavigationThruPages */ "./lib/Classes/common/NavigationThruPages.ts"));
var MultipleValidationJob = /** @class */function () {
  function MultipleValidationJob(data, responseStatusCode) {
    var _a, _b;
    this.createdAt = new Date(data.created_at);
    this.id = data.id;
    this.quantity = data.quantity;
    this.recordsProcessed = data.records_processed;
    this.status = data.status;
    this.responseStatusCode = responseStatusCode;
    if (data.download_url) {
      this.downloadUrl = {
        csv: (_a = data.download_url) === null || _a === void 0 ? void 0 : _a.csv,
        json: (_b = data.download_url) === null || _b === void 0 ? void 0 : _b.json
      };
    }
    if (data.summary) {
      this.summary = {
        result: {
          catchAll: data.summary.result.catch_all,
          deliverable: data.summary.result.deliverable,
          doNotSend: data.summary.result.do_not_send,
          undeliverable: data.summary.result.undeliverable,
          unknown: data.summary.result.unknown
        },
        risk: {
          high: data.summary.risk.high,
          low: data.summary.risk.low,
          medium: data.summary.risk.medium,
          unknown: data.summary.risk.unknown
        }
      };
    }
  }
  return MultipleValidationJob;
}();
exports.MultipleValidationJob = MultipleValidationJob;
var MultipleValidationClient = /** @class */function (_super) {
  __extends(MultipleValidationClient, _super);
  function MultipleValidationClient(request) {
    var _this = _super.call(this) || this;
    _this.request = request;
    return _this;
  }
  MultipleValidationClient.prototype.handleResponse = function (response) {
    return __assign({
      status: response.status
    }, response === null || response === void 0 ? void 0 : response.body);
  };
  MultipleValidationClient.prototype.parseList = function (response) {
    var data = {};
    data.jobs = response.body.jobs.map(function (job) {
      return new MultipleValidationJob(job, response.status);
    });
    data.pages = this.parsePageLinks(response, '?', 'pivot');
    data.total = response.body.total;
    data.status = response.status;
    return data;
  };
  MultipleValidationClient.prototype.list = function (query) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, this.requestListWithPages('/v4/address/validate/bulk', query)];
      });
    });
  };
  MultipleValidationClient.prototype.get = function (listId) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.request.get("/v4/address/validate/bulk/".concat(listId))];
          case 1:
            response = _a.sent();
            return [2 /*return*/, new MultipleValidationJob(response.body, response.status)];
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
            return [4 /*yield*/, this.request.postWithFD("/v4/address/validate/bulk/".concat(listId), multipleValidationData)];
          case 1:
            response = _a.sent();
            return [2 /*return*/, this.handleResponse(response)];
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
            return [4 /*yield*/, this.request.delete("/v4/address/validate/bulk/".concat(listId))];
          case 1:
            response = _a.sent();
            return [2 /*return*/, this.handleResponse(response)];
        }
      });
    });
  };
  return MultipleValidationClient;
}(NavigationThruPages_1.default);
exports["default"] = MultipleValidationClient;

/***/ }),

/***/ "./lib/Classes/Validations/validate.ts":
/*!*********************************************!*\
  !*** ./lib/Classes/Validations/validate.ts ***!
  \*********************************************/
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var ValidateClient = /** @class */function () {
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
            return [4 /*yield*/, this.request.get('/v4/address/validate', query)];
          case 1:
            result = _a.sent();
            return [2 /*return*/, result.body];
        }
      });
    });
  };
  return ValidateClient;
}();
exports["default"] = ValidateClient;

/***/ }),

/***/ "./lib/Classes/Webhooks.ts":
/*!*********************************!*\
  !*** ./lib/Classes/Webhooks.ts ***!
  \*********************************/
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
var Webhook = /** @class */function () {
  function Webhook(id, url) {
    this.id = id;
    this.url = url;
  }
  return Webhook;
}();
var WebhooksClient = /** @class */function () {
  function WebhooksClient(request) {
    this.request = request;
  }
  WebhooksClient.prototype._parseWebhookList = function (response) {
    return response.body.webhooks;
  };
  WebhooksClient.prototype._parseWebhookWithID = function (id) {
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
  WebhooksClient.prototype._parseWebhookTest = function (response) {
    return {
      code: response.body.code,
      message: response.body.message
    };
  };
  WebhooksClient.prototype.list = function (domain, query) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'webhooks'), query).then(this._parseWebhookList);
  };
  WebhooksClient.prototype.get = function (domain, id) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id)).then(this._parseWebhookWithID(id));
  };
  WebhooksClient.prototype.create = function (domain, id, url, test) {
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
  WebhooksClient.prototype.update = function (domain, id, url) {
    return this.request.putWithFD((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id), {
      url: url
    }).then(this._parseWebhookWithID(id));
  };
  WebhooksClient.prototype.destroy = function (domain, id) {
    return this.request.delete((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id)).then(this._parseWebhookWithID(id));
  };
  return WebhooksClient;
}();
exports["default"] = WebhooksClient;

/***/ }),

/***/ "./lib/Classes/common/Error.ts":
/*!*************************************!*\
  !*** ./lib/Classes/common/Error.ts ***!
  \*************************************/
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
var APIError = /** @class */function (_super) {
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

/***/ "./lib/Classes/common/FormDataBuilder.ts":
/*!***********************************************!*\
  !*** ./lib/Classes/common/FormDataBuilder.ts ***!
  \***********************************************/
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
var FormDataBuilder = /** @class */function () {
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
      var objData = isStreamData ? obj : obj.data;
      // getAttachmentOptions should be called with obj parameter to prevent loosing filename
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

/***/ "./lib/Classes/common/NavigationThruPages.ts":
/*!***************************************************!*\
  !*** ./lib/Classes/common/NavigationThruPages.ts ***!
  \***************************************************/
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var Error_1 = __importDefault(__webpack_require__(/*! ./Error */ "./lib/Classes/common/Error.ts"));
var NavigationThruPages = /** @class */function () {
  function NavigationThruPages(request) {
    if (request) {
      this.request = request;
    }
  }
  NavigationThruPages.prototype.parsePage = function (id, pageUrl, urlSeparator, iteratorName) {
    var parsedUrl = new URL(pageUrl);
    var searchParams = parsedUrl.searchParams;
    var pageValue = pageUrl && typeof pageUrl === 'string' ? pageUrl.split(urlSeparator).pop() || '' : '';
    var iteratorPosition = null;
    if (iteratorName) {
      iteratorPosition = searchParams.has(iteratorName) ? searchParams.get(iteratorName) : undefined;
    }
    return {
      id: id,
      page: urlSeparator === '?' ? "?".concat(pageValue) : pageValue,
      iteratorPosition: iteratorPosition,
      url: pageUrl
    };
  };
  NavigationThruPages.prototype.parsePageLinks = function (response, urlSeparator, iteratorName) {
    var _this = this;
    var pages = Object.entries(response.body.paging);
    return pages.reduce(function (acc, _a) {
      var id = _a[0],
        pageUrl = _a[1];
      acc[id] = _this.parsePage(id, pageUrl, urlSeparator, iteratorName);
      return acc;
    }, {});
  };
  NavigationThruPages.prototype.updateUrlAndQuery = function (clientUrl, query) {
    var url = clientUrl;
    var queryCopy = __assign({}, query);
    if (queryCopy.page) {
      url = (0, url_join_1.default)(clientUrl, queryCopy.page);
      delete queryCopy.page;
    }
    return {
      url: url,
      updatedQuery: queryCopy
    };
  };
  NavigationThruPages.prototype.requestListWithPages = function (clientUrl, query, Model) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, url, updatedQuery, response;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this.updateUrlAndQuery(clientUrl, query), url = _a.url, updatedQuery = _a.updatedQuery;
            if (!this.request) return [3 /*break*/, 2];
            return [4 /*yield*/, this.request.get(url, updatedQuery)];
          case 1:
            response = _b.sent();
            // Model here is usually undefined except for Suppression Client
            return [2 /*return*/, this.parseList(response, Model)];
          case 2:
            throw new Error_1.default({
              status: 500,
              statusText: 'Request property is empty',
              body: {
                message: ''
              }
            });
        }
      });
    });
  };
  return NavigationThruPages;
}();
exports["default"] = NavigationThruPages;

/***/ }),

/***/ "./lib/Classes/common/Request.ts":
/*!***************************************!*\
  !*** ./lib/Classes/common/Request.ts ***!
  \***************************************/
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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var Error_1 = __importDefault(__webpack_require__(/*! ./Error */ "./lib/Classes/common/Error.ts"));
var FormDataBuilder_1 = __importDefault(__webpack_require__(/*! ./FormDataBuilder */ "./lib/Classes/common/FormDataBuilder.ts"));
var Request = /** @class */function () {
  function Request(options, formData) {
    this.username = options.username;
    this.key = options.key;
    this.url = options.url;
    this.timeout = options.timeout;
    this.headers = options.headers || {};
    this.formDataBuilder = new FormDataBuilder_1.default(formData);
    this.maxBodyLength = 52428800; // 50 MB
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
            return [4 /*yield*/, axios_1.default.request(__assign(__assign({
              method: method.toLocaleUpperCase(),
              timeout: this.timeout,
              url: urlValue,
              headers: headers
            }, params), {
              maxBodyLength: this.maxBodyLength
            }))];
          case 2:
            response = _d.sent();
            return [3 /*break*/, 4];
          case 3:
            err_1 = _d.sent();
            errorResponse = err_1;
            throw new Error_1.default({
              status: ((_a = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.response) === null || _a === void 0 ? void 0 : _a.status) || 400,
              statusText: ((_b = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.response) === null || _b === void 0 ? void 0 : _b.statusText) || errorResponse.code,
              body: ((_c = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.response) === null || _c === void 0 ? void 0 : _c.data) || errorResponse.message
            });
          case 4:
            return [4 /*yield*/, this.getResponseBody(response)];
          case 5:
            res = _d.sent();
            return [2 /*return*/, res];
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
            throw new Error_1.default({
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
        return [2 /*return*/, res];
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

/***/ "./lib/Enums/index.ts":
/*!****************************!*\
  !*** ./lib/Enums/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.YesNo = exports.WebhooksIds = exports.SuppressionModels = exports.Resolution = void 0;
var Resolution;
(function (Resolution) {
  Resolution["HOUR"] = "hour";
  Resolution["DAY"] = "day";
  Resolution["MONTH"] = "month";
})(Resolution = exports.Resolution || (exports.Resolution = {}));
var SuppressionModels;
(function (SuppressionModels) {
  SuppressionModels["BOUNCES"] = "bounces";
  SuppressionModels["COMPLAINTS"] = "complaints";
  SuppressionModels["UNSUBSCRIBES"] = "unsubscribes";
  SuppressionModels["WHITELISTS"] = "whitelists";
})(SuppressionModels = exports.SuppressionModels || (exports.SuppressionModels = {}));
var WebhooksIds;
(function (WebhooksIds) {
  WebhooksIds["CLICKED"] = "clicked";
  WebhooksIds["COMPLAINED"] = "complained";
  WebhooksIds["DELIVERED"] = "delivered";
  WebhooksIds["OPENED"] = "opened";
  WebhooksIds["PERMANENT_FAIL"] = "permanent_fail";
  WebhooksIds["TEMPORARY_FAIL"] = "temporary_fail";
  WebhooksIds["UNSUBSCRIBED"] = "unsubscribe";
})(WebhooksIds = exports.WebhooksIds || (exports.WebhooksIds = {}));
var YesNo;
(function (YesNo) {
  YesNo["YES"] = "yes";
  YesNo["NO"] = "no";
})(YesNo = exports.YesNo || (exports.YesNo = {}));

/***/ }),

/***/ "./lib/Interfaces/Common/Logger.ts":
/*!*****************************************!*\
  !*** ./lib/Interfaces/Common/Logger.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Common/index.ts":
/*!****************************************!*\
  !*** ./lib/Interfaces/Common/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./Logger */ "./lib/Interfaces/Common/Logger.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/Domains/DomainCredentials.ts":
/*!*****************************************************!*\
  !*** ./lib/Interfaces/Domains/DomainCredentials.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Domains/DomainTags.ts":
/*!**********************************************!*\
  !*** ./lib/Interfaces/Domains/DomainTags.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Domains/DomainTemplates.ts":
/*!***************************************************!*\
  !*** ./lib/Interfaces/Domains/DomainTemplates.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Domains/index.ts":
/*!*****************************************!*\
  !*** ./lib/Interfaces/Domains/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./DomainCredentials */ "./lib/Interfaces/Domains/DomainCredentials.ts"), exports);
__exportStar(__webpack_require__(/*! ./DomainTags */ "./lib/Interfaces/Domains/DomainTags.ts"), exports);
__exportStar(__webpack_require__(/*! ./DomainTemplates */ "./lib/Interfaces/Domains/DomainTemplates.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/MailgunClient/IMailgunClient.ts":
/*!********************************************************!*\
  !*** ./lib/Interfaces/MailgunClient/IMailgunClient.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/MailgunClient/index.ts":
/*!***********************************************!*\
  !*** ./lib/Interfaces/MailgunClient/index.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./IMailgunClient */ "./lib/Interfaces/MailgunClient/IMailgunClient.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/MailingLists/MailingListMembers.ts":
/*!***********************************************************!*\
  !*** ./lib/Interfaces/MailingLists/MailingListMembers.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/MailingLists/index.ts":
/*!**********************************************!*\
  !*** ./lib/Interfaces/MailingLists/index.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./MailingListMembers */ "./lib/Interfaces/MailingLists/MailingListMembers.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/Stats/StatsClient.ts":
/*!*********************************************!*\
  !*** ./lib/Interfaces/Stats/StatsClient.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Stats/StatsContainer.ts":
/*!************************************************!*\
  !*** ./lib/Interfaces/Stats/StatsContainer.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Stats/index.ts":
/*!***************************************!*\
  !*** ./lib/Interfaces/Stats/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./StatsClient */ "./lib/Interfaces/Stats/StatsClient.ts"), exports);
__exportStar(__webpack_require__(/*! ./StatsContainer */ "./lib/Interfaces/Stats/StatsContainer.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/Suppressions/Bounce.ts":
/*!***********************************************!*\
  !*** ./lib/Interfaces/Suppressions/Bounce.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Suppressions/Complaint.ts":
/*!**************************************************!*\
  !*** ./lib/Interfaces/Suppressions/Complaint.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Suppressions/Unsubscribe.ts":
/*!****************************************************!*\
  !*** ./lib/Interfaces/Suppressions/Unsubscribe.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Suppressions/WhiteList.ts":
/*!**************************************************!*\
  !*** ./lib/Interfaces/Suppressions/WhiteList.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Suppressions/index.ts":
/*!**********************************************!*\
  !*** ./lib/Interfaces/Suppressions/index.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./Bounce */ "./lib/Interfaces/Suppressions/Bounce.ts"), exports);
__exportStar(__webpack_require__(/*! ./Complaint */ "./lib/Interfaces/Suppressions/Complaint.ts"), exports);
__exportStar(__webpack_require__(/*! ./Unsubscribe */ "./lib/Interfaces/Suppressions/Unsubscribe.ts"), exports);
__exportStar(__webpack_require__(/*! ./WhiteList */ "./lib/Interfaces/Suppressions/WhiteList.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/Validations/MultipleValidation.ts":
/*!**********************************************************!*\
  !*** ./lib/Interfaces/Validations/MultipleValidation.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Validations/Validation.ts":
/*!**************************************************!*\
  !*** ./lib/Interfaces/Validations/Validation.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Validations/index.ts":
/*!*********************************************!*\
  !*** ./lib/Interfaces/Validations/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./MultipleValidation */ "./lib/Interfaces/Validations/MultipleValidation.ts"), exports);
__exportStar(__webpack_require__(/*! ./Validation */ "./lib/Interfaces/Validations/Validation.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/index.ts":
/*!*********************************!*\
  !*** ./lib/Interfaces/index.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./Common */ "./lib/Interfaces/Common/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Domains */ "./lib/Interfaces/Domains/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./MailgunClient */ "./lib/Interfaces/MailgunClient/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./MailingLists */ "./lib/Interfaces/MailingLists/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Stats */ "./lib/Interfaces/Stats/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Suppressions */ "./lib/Interfaces/Suppressions/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Validations */ "./lib/Interfaces/Validations/index.ts"), exports);

/***/ }),

/***/ "./lib/Types/Common/ApiResponse.ts":
/*!*****************************************!*\
  !*** ./lib/Types/Common/ApiResponse.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Common/Error.ts":
/*!***********************************!*\
  !*** ./lib/Types/Common/Error.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Common/FormData.ts":
/*!**************************************!*\
  !*** ./lib/Types/Common/FormData.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Common/NavigationThruPages.ts":
/*!*************************************************!*\
  !*** ./lib/Types/Common/NavigationThruPages.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Common/RequestOptions.ts":
/*!********************************************!*\
  !*** ./lib/Types/Common/RequestOptions.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Common/index.ts":
/*!***********************************!*\
  !*** ./lib/Types/Common/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./Error */ "./lib/Types/Common/Error.ts"), exports);
__exportStar(__webpack_require__(/*! ./ApiResponse */ "./lib/Types/Common/ApiResponse.ts"), exports);
__exportStar(__webpack_require__(/*! ./FormData */ "./lib/Types/Common/FormData.ts"), exports);
__exportStar(__webpack_require__(/*! ./NavigationThruPages */ "./lib/Types/Common/NavigationThruPages.ts"), exports);
__exportStar(__webpack_require__(/*! ./RequestOptions */ "./lib/Types/Common/RequestOptions.ts"), exports);

/***/ }),

/***/ "./lib/Types/Domains/DomainCredentials.ts":
/*!************************************************!*\
  !*** ./lib/Types/Domains/DomainCredentials.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Domains/DomainTags.ts":
/*!*****************************************!*\
  !*** ./lib/Types/Domains/DomainTags.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Domains/DomainTemplates.ts":
/*!**********************************************!*\
  !*** ./lib/Types/Domains/DomainTemplates.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Domains/DomainTracking.ts":
/*!*********************************************!*\
  !*** ./lib/Types/Domains/DomainTracking.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/* eslint-disable camelcase */
Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Domains/Domains.ts":
/*!**************************************!*\
  !*** ./lib/Types/Domains/Domains.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Domains/index.ts":
/*!************************************!*\
  !*** ./lib/Types/Domains/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./DomainCredentials */ "./lib/Types/Domains/DomainCredentials.ts"), exports);
__exportStar(__webpack_require__(/*! ./Domains */ "./lib/Types/Domains/Domains.ts"), exports);
__exportStar(__webpack_require__(/*! ./DomainTags */ "./lib/Types/Domains/DomainTags.ts"), exports);
__exportStar(__webpack_require__(/*! ./DomainTemplates */ "./lib/Types/Domains/DomainTemplates.ts"), exports);
__exportStar(__webpack_require__(/*! ./DomainTracking */ "./lib/Types/Domains/DomainTracking.ts"), exports);

/***/ }),

/***/ "./lib/Types/Events/Events.ts":
/*!************************************!*\
  !*** ./lib/Types/Events/Events.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Events/index.ts":
/*!***********************************!*\
  !*** ./lib/Types/Events/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./Events */ "./lib/Types/Events/Events.ts"), exports);

/***/ }),

/***/ "./lib/Types/IPPools/IpPools.ts":
/*!**************************************!*\
  !*** ./lib/Types/IPPools/IpPools.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/IPPools/index.ts":
/*!************************************!*\
  !*** ./lib/Types/IPPools/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./IpPools */ "./lib/Types/IPPools/IpPools.ts"), exports);

/***/ }),

/***/ "./lib/Types/IPs/IPs.ts":
/*!******************************!*\
  !*** ./lib/Types/IPs/IPs.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/IPs/index.ts":
/*!********************************!*\
  !*** ./lib/Types/IPs/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./IPs */ "./lib/Types/IPs/IPs.ts"), exports);

/***/ }),

/***/ "./lib/Types/MailgunClient/MailgunClientOptions.ts":
/*!*********************************************************!*\
  !*** ./lib/Types/MailgunClient/MailgunClientOptions.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/MailgunClient/index.ts":
/*!******************************************!*\
  !*** ./lib/Types/MailgunClient/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./MailgunClientOptions */ "./lib/Types/MailgunClient/MailgunClientOptions.ts"), exports);

/***/ }),

/***/ "./lib/Types/MailingLists/MailingListMembers.ts":
/*!******************************************************!*\
  !*** ./lib/Types/MailingLists/MailingListMembers.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/MailingLists/MailingLists.ts":
/*!************************************************!*\
  !*** ./lib/Types/MailingLists/MailingLists.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/MailingLists/index.ts":
/*!*****************************************!*\
  !*** ./lib/Types/MailingLists/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./MailingListMembers */ "./lib/Types/MailingLists/MailingListMembers.ts"), exports);
__exportStar(__webpack_require__(/*! ./MailingLists */ "./lib/Types/MailingLists/MailingLists.ts"), exports);

/***/ }),

/***/ "./lib/Types/Messages/Messages.ts":
/*!****************************************!*\
  !*** ./lib/Types/Messages/Messages.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Messages/index.ts":
/*!*************************************!*\
  !*** ./lib/Types/Messages/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./Messages */ "./lib/Types/Messages/Messages.ts"), exports);

/***/ }),

/***/ "./lib/Types/Routes/Routes.ts":
/*!************************************!*\
  !*** ./lib/Types/Routes/Routes.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Routes/index.ts":
/*!***********************************!*\
  !*** ./lib/Types/Routes/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./Routes */ "./lib/Types/Routes/Routes.ts"), exports);

/***/ }),

/***/ "./lib/Types/Stats/Stats.ts":
/*!**********************************!*\
  !*** ./lib/Types/Stats/Stats.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Stats/index.ts":
/*!**********************************!*\
  !*** ./lib/Types/Stats/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./Stats */ "./lib/Types/Stats/Stats.ts"), exports);

/***/ }),

/***/ "./lib/Types/Suppressions/Bounce.ts":
/*!******************************************!*\
  !*** ./lib/Types/Suppressions/Bounce.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Suppressions/Complaint.ts":
/*!*********************************************!*\
  !*** ./lib/Types/Suppressions/Complaint.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Suppressions/Suppressions.ts":
/*!************************************************!*\
  !*** ./lib/Types/Suppressions/Suppressions.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Suppressions/Unsubscribe.ts":
/*!***********************************************!*\
  !*** ./lib/Types/Suppressions/Unsubscribe.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Suppressions/WhiteList.ts":
/*!*********************************************!*\
  !*** ./lib/Types/Suppressions/WhiteList.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Suppressions/index.ts":
/*!*****************************************!*\
  !*** ./lib/Types/Suppressions/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./Bounce */ "./lib/Types/Suppressions/Bounce.ts"), exports);
__exportStar(__webpack_require__(/*! ./Complaint */ "./lib/Types/Suppressions/Complaint.ts"), exports);
__exportStar(__webpack_require__(/*! ./Suppressions */ "./lib/Types/Suppressions/Suppressions.ts"), exports);
__exportStar(__webpack_require__(/*! ./Unsubscribe */ "./lib/Types/Suppressions/Unsubscribe.ts"), exports);
__exportStar(__webpack_require__(/*! ./WhiteList */ "./lib/Types/Suppressions/WhiteList.ts"), exports);

/***/ }),

/***/ "./lib/Types/Validations/MultipleValidation.ts":
/*!*****************************************************!*\
  !*** ./lib/Types/Validations/MultipleValidation.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Validations/Validation.ts":
/*!*********************************************!*\
  !*** ./lib/Types/Validations/Validation.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/* eslint-disable camelcase */
Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Validations/index.ts":
/*!****************************************!*\
  !*** ./lib/Types/Validations/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./MultipleValidation */ "./lib/Types/Validations/MultipleValidation.ts"), exports);
__exportStar(__webpack_require__(/*! ./Validation */ "./lib/Types/Validations/Validation.ts"), exports);

/***/ }),

/***/ "./lib/Types/Webhooks/Webhooks.ts":
/*!****************************************!*\
  !*** ./lib/Types/Webhooks/Webhooks.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Webhooks/index.ts":
/*!*************************************!*\
  !*** ./lib/Types/Webhooks/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./Webhooks */ "./lib/Types/Webhooks/Webhooks.ts"), exports);

/***/ }),

/***/ "./lib/Types/index.ts":
/*!****************************!*\
  !*** ./lib/Types/index.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Webhooks = exports.Validations = exports.Suppressions = exports.Stats = exports.Routes = exports.Messages = exports.MailingLists = exports.MailgunClient = exports.IPs = exports.IPPools = exports.Events = exports.Domains = exports.Common = void 0;
exports.Common = __importStar(__webpack_require__(/*! ./Common */ "./lib/Types/Common/index.ts"));
exports.Domains = __importStar(__webpack_require__(/*! ./Domains */ "./lib/Types/Domains/index.ts"));
exports.Events = __importStar(__webpack_require__(/*! ./Events */ "./lib/Types/Events/index.ts"));
exports.IPPools = __importStar(__webpack_require__(/*! ./IPPools */ "./lib/Types/IPPools/index.ts"));
exports.IPs = __importStar(__webpack_require__(/*! ./IPs */ "./lib/Types/IPs/index.ts"));
exports.MailgunClient = __importStar(__webpack_require__(/*! ./MailgunClient */ "./lib/Types/MailgunClient/index.ts"));
exports.MailingLists = __importStar(__webpack_require__(/*! ./MailingLists */ "./lib/Types/MailingLists/index.ts"));
exports.Messages = __importStar(__webpack_require__(/*! ./Messages */ "./lib/Types/Messages/index.ts"));
exports.Routes = __importStar(__webpack_require__(/*! ./Routes */ "./lib/Types/Routes/index.ts"));
exports.Stats = __importStar(__webpack_require__(/*! ./Stats */ "./lib/Types/Stats/index.ts"));
exports.Suppressions = __importStar(__webpack_require__(/*! ./Suppressions */ "./lib/Types/Suppressions/index.ts"));
exports.Validations = __importStar(__webpack_require__(/*! ./Validations */ "./lib/Types/Validations/index.ts"));
exports.Webhooks = __importStar(__webpack_require__(/*! ./Webhooks */ "./lib/Types/Webhooks/index.ts"));

/***/ }),

/***/ "./lib/index.ts":
/*!**********************!*\
  !*** ./lib/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


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
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Interfaces = exports.Types = exports.Enums = void 0;
var MailgunClient_1 = __importDefault(__webpack_require__(/*! ./Classes/MailgunClient */ "./lib/Classes/MailgunClient.ts"));
exports.Enums = __importStar(__webpack_require__(/*! ./Enums */ "./lib/Enums/index.ts"));
exports.Types = __importStar(__webpack_require__(/*! ./Types */ "./lib/Types/index.ts"));
exports.Interfaces = __importStar(__webpack_require__(/*! ./Interfaces */ "./lib/Interfaces/index.ts"));
var Mailgun = /** @class */function () {
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
    return new MailgunClient_1.default(options, this.formData);
  };
  return Mailgun;
}();
exports["default"] = Mailgun;

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

var InvalidUrlError = createErrorType(
  "ERR_INVALID_URL",
  "Invalid URL",
  TypeError
);
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
  if (!isString(data) && !isBuffer(data)) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (isFunction(encoding)) {
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
  if (isFunction(data)) {
    callback = data;
    data = encoding = null;
  }
  else if (isFunction(encoding)) {
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

  // Create the native request and set up its event handlers
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  request._redirectable = this;
  for (var event of events) {
    request.on(event, eventHandlers[event]);
  }

  // RFC7230§5.3.1: When making a request directly to an origin server, […]
  // a client MUST send only the absolute path […] as the request-target.
  this._currentUrl = /^\//.test(this._options.path) ?
    url.format(this._options) :
    // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path;

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end
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
    this.emit("error", new RedirectionError({ cause: cause }));
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
  if (isFunction(beforeRedirect)) {
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
    this.emit("error", new RedirectionError({ cause: cause }));
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
      if (isString(input)) {
        var parsed;
        try {
          parsed = urlToOptions(new URL(input));
        }
        catch (err) {
          /* istanbul ignore next */
          parsed = url.parse(input);
        }
        if (!isString(parsed.protocol)) {
          throw new InvalidUrlError({ input });
        }
        input = parsed;
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (isFunction(options)) {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;
      if (!isString(options.host) && !isString(options.hostname)) {
        options.hostname = "::1";
      }

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

function createErrorType(code, message, baseClass) {
  // Create constructor
  function CustomError(properties) {
    Error.captureStackTrace(this, this.constructor);
    Object.assign(this, properties || {});
    this.code = code;
    this.message = this.cause ? message + ": " + this.cause.message : message;
  }

  // Attach constructor and set default properties
  CustomError.prototype = new (baseClass || Error)();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  return CustomError;
}

function abortRequest(request) {
  for (var event of events) {
    request.removeListener(event, eventHandlers[event]);
  }
  request.on("error", noop);
  request.abort();
}

function isSubdomain(subdomain, domain) {
  assert(isString(subdomain) && isString(domain));
  var dot = subdomain.length - domain.length - 1;
  return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
}

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

function isFunction(value) {
  return typeof value === "function";
}

function isBuffer(value) {
  return typeof value === "object" && ("length" in value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0RBQWtEO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0MsT0FBTztBQUMzQztBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiw0QkFBNEI7QUFDNUIsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0MsT0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxVQUFVO0FBQ3JCLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNyZEEscUJBQXFCLG1CQUFPLENBQUMsOEVBQWlCO0FBQzlDLFdBQVcsbUJBQU8sQ0FBQyxrQkFBTTtBQUN6QixXQUFXLG1CQUFPLENBQUMsa0JBQU07QUFDekIsV0FBVyxtQkFBTyxDQUFDLGtCQUFNO0FBQ3pCLFlBQVksbUJBQU8sQ0FBQyxvQkFBTztBQUMzQixlQUFlLDZDQUFvQjtBQUNuQyxTQUFTLG1CQUFPLENBQUMsY0FBSTtBQUNyQixhQUFhLG9EQUF3QjtBQUNyQyxXQUFXLG1CQUFPLENBQUMsc0RBQVk7QUFDL0IsZUFBZSxtQkFBTyxDQUFDLGtEQUFVO0FBQ2pDLGVBQWUsbUJBQU8sQ0FBQyxrRkFBZTs7QUFFdEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsU0FBUztBQUN2RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFD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Ozs7Ozs7Ozs7Ozs7O0FDdkJqQjBWLGFBQUFBLG1CQUFBQSxDQUFBQSxtREFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUFBLGFBQUFBLG1CQUFBQSxDQUFBQSwwRUFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLDREQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsc0VBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsMEVBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsaUZBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsNERBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSxrRUFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREFBLGFBQUFBLG1CQUFBQSxDQUFBQSx5REFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLCtEQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsbUVBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSwrREFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEFBLGFBQUFBLG1CQUFBQSxDQUFBQSxnRkFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLGdFQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQUEsYUFBQUEsbUJBQUFBLENBQUFBLGtEQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsb0RBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSxnRUFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLDhEQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsZ0RBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSw4REFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLDREQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQUEsYUFBQUEsbUJBQUFBLENBQUFBLDRDQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsd0RBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSxrREFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLHdFQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsOERBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUFBLGFBQUFBLG1CQUFBQSxDQUFBQSxxRUFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLGlEQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsdURBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSxpRUFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLCtEQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQUEsYUFBQUEsbUJBQUFBLENBQUFBLDhDQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQUEsYUFBQUEsbUJBQUFBLENBQUFBLGlEQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQUEsYUFBQUEsbUJBQUFBLENBQUFBLHFDQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQUEsYUFBQUEsbUJBQUFBLENBQUFBLGlGQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQUEsYUFBQUEsbUJBQUFBLENBQUFBLDRFQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsZ0VBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsb0RBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsOENBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsMkNBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsb0RBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSwwREFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLGdFQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsOERBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSwwREFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNB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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQy9NQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCLFlBQVk7QUFDWixZQUFZO0FBQ1osaUJBQWlCO0FBQ2pCLGVBQWU7QUFDZixlQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUFPLENBQUMsb0JBQU87QUFDM0IsZUFBZSxzREFBMEI7QUFDekMsYUFBYSxtQkFBTyxDQUFDLHNCQUFRO0FBQzdCLFlBQVksbUJBQU8sQ0FBQyx5REFBUzs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsZ0NBQWdDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHdDQUF3QztBQUMvRCxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELG1CQUFtQjs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixzRUFBc0U7QUFDdkYsYUFBYSxrRUFBa0U7QUFDL0UsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QiwwQkFBMEI7QUFDbEQsbUJBQW1COzs7Ozs7Ozs7Ozs7QUM1bUJOO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1RkFBcUM7Ozs7Ozs7Ozs7OztBQ1hyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUyxtQkFBTyxDQUFDLGdEQUFTO0FBQzFCLGNBQWMsaURBQXVCOztBQUVyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUMsU0FBUztBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlO0FBQ2YsZ0JBQWdCLEtBQUs7QUFDckIsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUNqQixrQkFBa0I7QUFDbEIsY0FBYztBQUNkLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7OztBQzNMQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxlQUFlO0FBQzFCLFdBQVcsUUFBUTtBQUNuQixZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDakthO0FBQ2IsV0FBVyxtQkFBTyxDQUFDLGNBQUk7QUFDdkIsZ0JBQWdCLG1CQUFPLENBQUMsa0RBQVU7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxHQUFHO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNsSUE7QUFDQSxNQUFNLEtBQTZCO0FBQ25DLFdBQVcsSUFBMEMsRUFBRSxvQ0FBTyxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0dBQUM7QUFDekUsT0FBTyxFQUE2QjtBQUNwQyxDQUFDOztBQUVEO0FBQ0E7QUFDQSxpQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBLG9CQUFvQixxQkFBcUI7QUFDekM7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7OztBQzdFRDs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1VFSkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2FzeW5ja2l0L2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXN5bmNraXQvbGliL2Fib3J0LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXN5bmNraXQvbGliL2FzeW5jLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXN5bmNraXQvbGliL2RlZmVyLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXN5bmNraXQvbGliL2l0ZXJhdGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9hc3luY2tpdC9saWIvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9hc3luY2tpdC9saWIvdGVybWluYXRvci5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2FzeW5ja2l0L3BhcmFsbGVsLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXN5bmNraXQvc2VyaWFsLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXN5bmNraXQvc2VyaWFsT3JkZXJlZC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2h0dHAuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zRXJyb3IuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2Vudi9Gb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZW52L2RhdGEuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b0Zvcm1EYXRhLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3Mvbm9kZV9tb2R1bGVzL2Zvcm0tZGF0YS9saWIvZm9ybV9kYXRhLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYXhpb3Mvbm9kZV9tb2R1bGVzL2Zvcm0tZGF0YS9saWIvcG9wdWxhdGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWlucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zQ3JlZGVudGlhbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RhZ3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RlbXBsYXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL0NsYXNzZXMvRXZlbnRzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvQ2xhc3Nlcy9JUFBvb2xzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvQ2xhc3Nlcy9JUHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL01haWxndW5DbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL01haWxpbmdMaXN0cy9tYWlsTGlzdE1lbWJlcnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL01haWxpbmdMaXN0cy9tYWlsaW5nTGlzdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL01lc3NhZ2VzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvQ2xhc3Nlcy9Sb3V0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL1N0YXRzL1N0YXRzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvQ2xhc3Nlcy9TdGF0cy9TdGF0c0NvbnRhaW5lci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL0JvdW5jZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL0NvbXBsYWludC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvU3VwcHJlc3Npb25zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvVW5zdWJzY3JpYmUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9XaGl0ZUxpc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL1ZhbGlkYXRpb25zL211bHRpcGxlVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL0NsYXNzZXMvVmFsaWRhdGlvbnMvdmFsaWRhdGUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL1dlYmhvb2tzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvQ2xhc3Nlcy9jb21tb24vRXJyb3IudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL2NvbW1vbi9Gb3JtRGF0YUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9DbGFzc2VzL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvQ2xhc3Nlcy9jb21tb24vUmVxdWVzdC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL0VudW1zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvSW50ZXJmYWNlcy9Db21tb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9JbnRlcmZhY2VzL01haWxndW5DbGllbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL0ludGVyZmFjZXMvU3RhdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9JbnRlcmZhY2VzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvVHlwZXMvQ29tbW9uL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvVHlwZXMvRG9tYWlucy9Eb21haW5UcmFja2luZy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL1R5cGVzL0RvbWFpbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9UeXBlcy9FdmVudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9UeXBlcy9JUFBvb2xzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvVHlwZXMvSVBzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvVHlwZXMvTWFpbGd1bkNsaWVudC9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL1R5cGVzL01haWxpbmdMaXN0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL1R5cGVzL01lc3NhZ2VzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvVHlwZXMvUm91dGVzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvVHlwZXMvU3RhdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9UeXBlcy9WYWxpZGF0aW9ucy9WYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvVHlwZXMvVmFsaWRhdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9UeXBlcy9XZWJob29rcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL1R5cGVzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9iYXNlLTY0L2Jhc2U2NC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2NvbWJpbmVkLXN0cmVhbS9saWIvY29tYmluZWRfc3RyZWFtLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvY29tbW9uLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL25vZGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9kZWxheWVkLXN0cmVhbS9saWIvZGVsYXllZF9zdHJlYW0uanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9mb2xsb3ctcmVkaXJlY3RzL2RlYnVnLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvZm9sbG93LXJlZGlyZWN0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2hhcy1mbGFnL2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvbWltZS1kYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL21pbWUtdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9tcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL3N1cHBvcnRzLWNvbG9yL2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwid2VicGFjazovL21haWxndW4vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImFzc2VydFwiIiwid2VicGFjazovL21haWxndW4vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cFwiIiwid2VicGFjazovL21haWxndW4vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwib3NcIiIsIndlYnBhY2s6Ly9tYWlsZ3VuL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwic3RyZWFtXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidHR5XCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidXJsXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidXRpbFwiIiwid2VicGFjazovL21haWxndW4vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInpsaWJcIiIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibWFpbGd1blwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJtYWlsZ3VuXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuICIsIm1vZHVsZS5leHBvcnRzID1cbntcbiAgcGFyYWxsZWwgICAgICA6IHJlcXVpcmUoJy4vcGFyYWxsZWwuanMnKSxcbiAgc2VyaWFsICAgICAgICA6IHJlcXVpcmUoJy4vc2VyaWFsLmpzJyksXG4gIHNlcmlhbE9yZGVyZWQgOiByZXF1aXJlKCcuL3NlcmlhbE9yZGVyZWQuanMnKVxufTtcbiIsIi8vIEFQSVxubW9kdWxlLmV4cG9ydHMgPSBhYm9ydDtcblxuLyoqXG4gKiBBYm9ydHMgbGVmdG92ZXIgYWN0aXZlIGpvYnNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhdGUgLSBjdXJyZW50IHN0YXRlIG9iamVjdFxuICovXG5mdW5jdGlvbiBhYm9ydChzdGF0ZSlcbntcbiAgT2JqZWN0LmtleXMoc3RhdGUuam9icykuZm9yRWFjaChjbGVhbi5iaW5kKHN0YXRlKSk7XG5cbiAgLy8gcmVzZXQgbGVmdG92ZXIgam9ic1xuICBzdGF0ZS5qb2JzID0ge307XG59XG5cbi8qKlxuICogQ2xlYW5zIHVwIGxlZnRvdmVyIGpvYiBieSBpbnZva2luZyBhYm9ydCBmdW5jdGlvbiBmb3IgdGhlIHByb3ZpZGVkIGpvYiBpZFxuICpcbiAqIEB0aGlzICBzdGF0ZVxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBrZXkgLSBqb2IgaWQgdG8gYWJvcnRcbiAqL1xuZnVuY3Rpb24gY2xlYW4oa2V5KVxue1xuICBpZiAodHlwZW9mIHRoaXMuam9ic1trZXldID09ICdmdW5jdGlvbicpXG4gIHtcbiAgICB0aGlzLmpvYnNba2V5XSgpO1xuICB9XG59XG4iLCJ2YXIgZGVmZXIgPSByZXF1aXJlKCcuL2RlZmVyLmpzJyk7XG5cbi8vIEFQSVxubW9kdWxlLmV4cG9ydHMgPSBhc3luYztcblxuLyoqXG4gKiBSdW5zIHByb3ZpZGVkIGNhbGxiYWNrIGFzeW5jaHJvbm91c2x5XG4gKiBldmVuIGlmIGNhbGxiYWNrIGl0c2VsZiBpcyBub3RcbiAqXG4gKiBAcGFyYW0gICB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gY2FsbGJhY2sgdG8gaW52b2tlXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259IC0gYXVnbWVudGVkIGNhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIGFzeW5jKGNhbGxiYWNrKVxue1xuICB2YXIgaXNBc3luYyA9IGZhbHNlO1xuXG4gIC8vIGNoZWNrIGlmIGFzeW5jIGhhcHBlbmVkXG4gIGRlZmVyKGZ1bmN0aW9uKCkgeyBpc0FzeW5jID0gdHJ1ZTsgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGFzeW5jX2NhbGxiYWNrKGVyciwgcmVzdWx0KVxuICB7XG4gICAgaWYgKGlzQXN5bmMpXG4gICAge1xuICAgICAgY2FsbGJhY2soZXJyLCByZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgZGVmZXIoZnVuY3Rpb24gbmV4dFRpY2tfY2FsbGJhY2soKVxuICAgICAge1xuICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGRlZmVyO1xuXG4vKipcbiAqIFJ1bnMgcHJvdmlkZWQgZnVuY3Rpb24gb24gbmV4dCBpdGVyYXRpb24gb2YgdGhlIGV2ZW50IGxvb3BcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiAtIGZ1bmN0aW9uIHRvIHJ1blxuICovXG5mdW5jdGlvbiBkZWZlcihmbilcbntcbiAgdmFyIG5leHRUaWNrID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PSAnZnVuY3Rpb24nXG4gICAgPyBzZXRJbW1lZGlhdGVcbiAgICA6IChcbiAgICAgIHR5cGVvZiBwcm9jZXNzID09ICdvYmplY3QnICYmIHR5cGVvZiBwcm9jZXNzLm5leHRUaWNrID09ICdmdW5jdGlvbidcbiAgICAgID8gcHJvY2Vzcy5uZXh0VGlja1xuICAgICAgOiBudWxsXG4gICAgKTtcblxuICBpZiAobmV4dFRpY2spXG4gIHtcbiAgICBuZXh0VGljayhmbik7XG4gIH1cbiAgZWxzZVxuICB7XG4gICAgc2V0VGltZW91dChmbiwgMCk7XG4gIH1cbn1cbiIsInZhciBhc3luYyA9IHJlcXVpcmUoJy4vYXN5bmMuanMnKVxuICAsIGFib3J0ID0gcmVxdWlyZSgnLi9hYm9ydC5qcycpXG4gIDtcblxuLy8gQVBJXG5tb2R1bGUuZXhwb3J0cyA9IGl0ZXJhdGU7XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBlYWNoIGpvYiBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge2FycmF5fG9iamVjdH0gbGlzdCAtIGFycmF5IG9yIG9iamVjdCAobmFtZWQgbGlzdCkgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBpdGVyYXRvciAtIGl0ZXJhdG9yIHRvIHJ1blxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRlIC0gY3VycmVudCBqb2Igc3RhdHVzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGludm9rZWQgd2hlbiBhbGwgZWxlbWVudHMgcHJvY2Vzc2VkXG4gKi9cbmZ1bmN0aW9uIGl0ZXJhdGUobGlzdCwgaXRlcmF0b3IsIHN0YXRlLCBjYWxsYmFjaylcbntcbiAgLy8gc3RvcmUgY3VycmVudCBpbmRleFxuICB2YXIga2V5ID0gc3RhdGVbJ2tleWVkTGlzdCddID8gc3RhdGVbJ2tleWVkTGlzdCddW3N0YXRlLmluZGV4XSA6IHN0YXRlLmluZGV4O1xuXG4gIHN0YXRlLmpvYnNba2V5XSA9IHJ1bkpvYihpdGVyYXRvciwga2V5LCBsaXN0W2tleV0sIGZ1bmN0aW9uKGVycm9yLCBvdXRwdXQpXG4gIHtcbiAgICAvLyBkb24ndCByZXBlYXQgeW91cnNlbGZcbiAgICAvLyBza2lwIHNlY29uZGFyeSBjYWxsYmFja3NcbiAgICBpZiAoIShrZXkgaW4gc3RhdGUuam9icykpXG4gICAge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNsZWFuIHVwIGpvYnNcbiAgICBkZWxldGUgc3RhdGUuam9ic1trZXldO1xuXG4gICAgaWYgKGVycm9yKVxuICAgIHtcbiAgICAgIC8vIGRvbid0IHByb2Nlc3MgcmVzdCBvZiB0aGUgcmVzdWx0c1xuICAgICAgLy8gc3RvcCBzdGlsbCBhY3RpdmUgam9ic1xuICAgICAgLy8gYW5kIHJlc2V0IHRoZSBsaXN0XG4gICAgICBhYm9ydChzdGF0ZSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBzdGF0ZS5yZXN1bHRzW2tleV0gPSBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIHNhbHZhZ2VkIHJlc3VsdHNcbiAgICBjYWxsYmFjayhlcnJvciwgc3RhdGUucmVzdWx0cyk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFJ1bnMgaXRlcmF0b3Igb3ZlciBwcm92aWRlZCBqb2IgZWxlbWVudFxuICpcbiAqIEBwYXJhbSAgIHtmdW5jdGlvbn0gaXRlcmF0b3IgLSBpdGVyYXRvciB0byBpbnZva2VcbiAqIEBwYXJhbSAgIHtzdHJpbmd8bnVtYmVyfSBrZXkgLSBrZXkvaW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGxpc3Qgb2Ygam9ic1xuICogQHBhcmFtICAge21peGVkfSBpdGVtIC0gam9iIGRlc2NyaXB0aW9uXG4gKiBAcGFyYW0gICB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gaW52b2tlZCBhZnRlciBpdGVyYXRvciBpcyBkb25lIHdpdGggdGhlIGpvYlxuICogQHJldHVybnMge2Z1bmN0aW9ufG1peGVkfSAtIGpvYiBhYm9ydCBmdW5jdGlvbiBvciBzb21ldGhpbmcgZWxzZVxuICovXG5mdW5jdGlvbiBydW5Kb2IoaXRlcmF0b3IsIGtleSwgaXRlbSwgY2FsbGJhY2spXG57XG4gIHZhciBhYm9ydGVyO1xuXG4gIC8vIGFsbG93IHNob3J0Y3V0IGlmIGl0ZXJhdG9yIGV4cGVjdHMgb25seSB0d28gYXJndW1lbnRzXG4gIGlmIChpdGVyYXRvci5sZW5ndGggPT0gMilcbiAge1xuICAgIGFib3J0ZXIgPSBpdGVyYXRvcihpdGVtLCBhc3luYyhjYWxsYmFjaykpO1xuICB9XG4gIC8vIG90aGVyd2lzZSBnbyB3aXRoIGZ1bGwgdGhyZWUgYXJndW1lbnRzXG4gIGVsc2VcbiAge1xuICAgIGFib3J0ZXIgPSBpdGVyYXRvcihpdGVtLCBrZXksIGFzeW5jKGNhbGxiYWNrKSk7XG4gIH1cblxuICByZXR1cm4gYWJvcnRlcjtcbn1cbiIsIi8vIEFQSVxubW9kdWxlLmV4cG9ydHMgPSBzdGF0ZTtcblxuLyoqXG4gKiBDcmVhdGVzIGluaXRpYWwgc3RhdGUgb2JqZWN0XG4gKiBmb3IgaXRlcmF0aW9uIG92ZXIgbGlzdFxuICpcbiAqIEBwYXJhbSAgIHthcnJheXxvYmplY3R9IGxpc3QgLSBsaXN0IHRvIGl0ZXJhdGUgb3ZlclxuICogQHBhcmFtICAge2Z1bmN0aW9ufG51bGx9IHNvcnRNZXRob2QgLSBmdW5jdGlvbiB0byB1c2UgZm9yIGtleXMgc29ydCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIGBudWxsYCB0byBrZWVwIHRoZW0gYXMgaXNcbiAqIEByZXR1cm5zIHtvYmplY3R9IC0gaW5pdGlhbCBzdGF0ZSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gc3RhdGUobGlzdCwgc29ydE1ldGhvZClcbntcbiAgdmFyIGlzTmFtZWRMaXN0ID0gIUFycmF5LmlzQXJyYXkobGlzdClcbiAgICAsIGluaXRTdGF0ZSA9XG4gICAge1xuICAgICAgaW5kZXggICAgOiAwLFxuICAgICAga2V5ZWRMaXN0OiBpc05hbWVkTGlzdCB8fCBzb3J0TWV0aG9kID8gT2JqZWN0LmtleXMobGlzdCkgOiBudWxsLFxuICAgICAgam9icyAgICAgOiB7fSxcbiAgICAgIHJlc3VsdHMgIDogaXNOYW1lZExpc3QgPyB7fSA6IFtdLFxuICAgICAgc2l6ZSAgICAgOiBpc05hbWVkTGlzdCA/IE9iamVjdC5rZXlzKGxpc3QpLmxlbmd0aCA6IGxpc3QubGVuZ3RoXG4gICAgfVxuICAgIDtcblxuICBpZiAoc29ydE1ldGhvZClcbiAge1xuICAgIC8vIHNvcnQgYXJyYXkga2V5cyBiYXNlZCBvbiBpdCdzIHZhbHVlc1xuICAgIC8vIHNvcnQgb2JqZWN0J3Mga2V5cyBqdXN0IG9uIG93biBtZXJpdFxuICAgIGluaXRTdGF0ZS5rZXllZExpc3Quc29ydChpc05hbWVkTGlzdCA/IHNvcnRNZXRob2QgOiBmdW5jdGlvbihhLCBiKVxuICAgIHtcbiAgICAgIHJldHVybiBzb3J0TWV0aG9kKGxpc3RbYV0sIGxpc3RbYl0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGluaXRTdGF0ZTtcbn1cbiIsInZhciBhYm9ydCA9IHJlcXVpcmUoJy4vYWJvcnQuanMnKVxuICAsIGFzeW5jID0gcmVxdWlyZSgnLi9hc3luYy5qcycpXG4gIDtcblxuLy8gQVBJXG5tb2R1bGUuZXhwb3J0cyA9IHRlcm1pbmF0b3I7XG5cbi8qKlxuICogVGVybWluYXRlcyBqb2JzIGluIHRoZSBhdHRhY2hlZCBzdGF0ZSBjb250ZXh0XG4gKlxuICogQHRoaXMgIEFzeW5jS2l0U3RhdGUjXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGZpbmFsIGNhbGxiYWNrIHRvIGludm9rZSBhZnRlciB0ZXJtaW5hdGlvblxuICovXG5mdW5jdGlvbiB0ZXJtaW5hdG9yKGNhbGxiYWNrKVxue1xuICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuam9icykubGVuZ3RoKVxuICB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gZmFzdCBmb3J3YXJkIGl0ZXJhdGlvbiBpbmRleFxuICB0aGlzLmluZGV4ID0gdGhpcy5zaXplO1xuXG4gIC8vIGFib3J0IGpvYnNcbiAgYWJvcnQodGhpcyk7XG5cbiAgLy8gc2VuZCBiYWNrIHJlc3VsdHMgd2UgaGF2ZSBzbyBmYXJcbiAgYXN5bmMoY2FsbGJhY2spKG51bGwsIHRoaXMucmVzdWx0cyk7XG59XG4iLCJ2YXIgaXRlcmF0ZSAgICA9IHJlcXVpcmUoJy4vbGliL2l0ZXJhdGUuanMnKVxuICAsIGluaXRTdGF0ZSAgPSByZXF1aXJlKCcuL2xpYi9zdGF0ZS5qcycpXG4gICwgdGVybWluYXRvciA9IHJlcXVpcmUoJy4vbGliL3Rlcm1pbmF0b3IuanMnKVxuICA7XG5cbi8vIFB1YmxpYyBBUElcbm1vZHVsZS5leHBvcnRzID0gcGFyYWxsZWw7XG5cbi8qKlxuICogUnVucyBpdGVyYXRvciBvdmVyIHByb3ZpZGVkIGFycmF5IGVsZW1lbnRzIGluIHBhcmFsbGVsXG4gKlxuICogQHBhcmFtICAge2FycmF5fG9iamVjdH0gbGlzdCAtIGFycmF5IG9yIG9iamVjdCAobmFtZWQgbGlzdCkgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0gICB7ZnVuY3Rpb259IGl0ZXJhdG9yIC0gaXRlcmF0b3IgdG8gcnVuXG4gKiBAcGFyYW0gICB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gaW52b2tlZCB3aGVuIGFsbCBlbGVtZW50cyBwcm9jZXNzZWRcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gLSBqb2JzIHRlcm1pbmF0b3JcbiAqL1xuZnVuY3Rpb24gcGFyYWxsZWwobGlzdCwgaXRlcmF0b3IsIGNhbGxiYWNrKVxue1xuICB2YXIgc3RhdGUgPSBpbml0U3RhdGUobGlzdCk7XG5cbiAgd2hpbGUgKHN0YXRlLmluZGV4IDwgKHN0YXRlWydrZXllZExpc3QnXSB8fCBsaXN0KS5sZW5ndGgpXG4gIHtcbiAgICBpdGVyYXRlKGxpc3QsIGl0ZXJhdG9yLCBzdGF0ZSwgZnVuY3Rpb24oZXJyb3IsIHJlc3VsdClcbiAgICB7XG4gICAgICBpZiAoZXJyb3IpXG4gICAgICB7XG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCByZXN1bHQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGxvb2tzIGxpa2UgaXQncyB0aGUgbGFzdCBvbmVcbiAgICAgIGlmIChPYmplY3Qua2V5cyhzdGF0ZS5qb2JzKS5sZW5ndGggPT09IDApXG4gICAgICB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHN0YXRlLnJlc3VsdHMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdGF0ZS5pbmRleCsrO1xuICB9XG5cbiAgcmV0dXJuIHRlcm1pbmF0b3IuYmluZChzdGF0ZSwgY2FsbGJhY2spO1xufVxuIiwidmFyIHNlcmlhbE9yZGVyZWQgPSByZXF1aXJlKCcuL3NlcmlhbE9yZGVyZWQuanMnKTtcblxuLy8gUHVibGljIEFQSVxubW9kdWxlLmV4cG9ydHMgPSBzZXJpYWw7XG5cbi8qKlxuICogUnVucyBpdGVyYXRvciBvdmVyIHByb3ZpZGVkIGFycmF5IGVsZW1lbnRzIGluIHNlcmllc1xuICpcbiAqIEBwYXJhbSAgIHthcnJheXxvYmplY3R9IGxpc3QgLSBhcnJheSBvciBvYmplY3QgKG5hbWVkIGxpc3QpIHRvIGl0ZXJhdGUgb3ZlclxuICogQHBhcmFtICAge2Z1bmN0aW9ufSBpdGVyYXRvciAtIGl0ZXJhdG9yIHRvIHJ1blxuICogQHBhcmFtICAge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGludm9rZWQgd2hlbiBhbGwgZWxlbWVudHMgcHJvY2Vzc2VkXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259IC0gam9icyB0ZXJtaW5hdG9yXG4gKi9cbmZ1bmN0aW9uIHNlcmlhbChsaXN0LCBpdGVyYXRvciwgY2FsbGJhY2spXG57XG4gIHJldHVybiBzZXJpYWxPcmRlcmVkKGxpc3QsIGl0ZXJhdG9yLCBudWxsLCBjYWxsYmFjayk7XG59XG4iLCJ2YXIgaXRlcmF0ZSAgICA9IHJlcXVpcmUoJy4vbGliL2l0ZXJhdGUuanMnKVxuICAsIGluaXRTdGF0ZSAgPSByZXF1aXJlKCcuL2xpYi9zdGF0ZS5qcycpXG4gICwgdGVybWluYXRvciA9IHJlcXVpcmUoJy4vbGliL3Rlcm1pbmF0b3IuanMnKVxuICA7XG5cbi8vIFB1YmxpYyBBUElcbm1vZHVsZS5leHBvcnRzID0gc2VyaWFsT3JkZXJlZDtcbi8vIHNvcnRpbmcgaGVscGVyc1xubW9kdWxlLmV4cG9ydHMuYXNjZW5kaW5nICA9IGFzY2VuZGluZztcbm1vZHVsZS5leHBvcnRzLmRlc2NlbmRpbmcgPSBkZXNjZW5kaW5nO1xuXG4vKipcbiAqIFJ1bnMgaXRlcmF0b3Igb3ZlciBwcm92aWRlZCBzb3J0ZWQgYXJyYXkgZWxlbWVudHMgaW4gc2VyaWVzXG4gKlxuICogQHBhcmFtICAge2FycmF5fG9iamVjdH0gbGlzdCAtIGFycmF5IG9yIG9iamVjdCAobmFtZWQgbGlzdCkgdG8gaXRlcmF0ZSBvdmVyXG4gKiBAcGFyYW0gICB7ZnVuY3Rpb259IGl0ZXJhdG9yIC0gaXRlcmF0b3IgdG8gcnVuXG4gKiBAcGFyYW0gICB7ZnVuY3Rpb259IHNvcnRNZXRob2QgLSBjdXN0b20gc29ydCBmdW5jdGlvblxuICogQHBhcmFtICAge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGludm9rZWQgd2hlbiBhbGwgZWxlbWVudHMgcHJvY2Vzc2VkXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259IC0gam9icyB0ZXJtaW5hdG9yXG4gKi9cbmZ1bmN0aW9uIHNlcmlhbE9yZGVyZWQobGlzdCwgaXRlcmF0b3IsIHNvcnRNZXRob2QsIGNhbGxiYWNrKVxue1xuICB2YXIgc3RhdGUgPSBpbml0U3RhdGUobGlzdCwgc29ydE1ldGhvZCk7XG5cbiAgaXRlcmF0ZShsaXN0LCBpdGVyYXRvciwgc3RhdGUsIGZ1bmN0aW9uIGl0ZXJhdG9ySGFuZGxlcihlcnJvciwgcmVzdWx0KVxuICB7XG4gICAgaWYgKGVycm9yKVxuICAgIHtcbiAgICAgIGNhbGxiYWNrKGVycm9yLCByZXN1bHQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN0YXRlLmluZGV4Kys7XG5cbiAgICAvLyBhcmUgd2UgdGhlcmUgeWV0P1xuICAgIGlmIChzdGF0ZS5pbmRleCA8IChzdGF0ZVsna2V5ZWRMaXN0J10gfHwgbGlzdCkubGVuZ3RoKVxuICAgIHtcbiAgICAgIGl0ZXJhdGUobGlzdCwgaXRlcmF0b3IsIHN0YXRlLCBpdGVyYXRvckhhbmRsZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGRvbmUgaGVyZVxuICAgIGNhbGxiYWNrKG51bGwsIHN0YXRlLnJlc3VsdHMpO1xuICB9KTtcblxuICByZXR1cm4gdGVybWluYXRvci5iaW5kKHN0YXRlLCBjYWxsYmFjayk7XG59XG5cbi8qXG4gKiAtLSBTb3J0IG1ldGhvZHNcbiAqL1xuXG4vKipcbiAqIHNvcnQgaGVscGVyIHRvIHNvcnQgYXJyYXkgZWxlbWVudHMgaW4gYXNjZW5kaW5nIG9yZGVyXG4gKlxuICogQHBhcmFtICAge21peGVkfSBhIC0gYW4gaXRlbSB0byBjb21wYXJlXG4gKiBAcGFyYW0gICB7bWl4ZWR9IGIgLSBhbiBpdGVtIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gY29tcGFyaXNvbiByZXN1bHRcbiAqL1xuZnVuY3Rpb24gYXNjZW5kaW5nKGEsIGIpXG57XG4gIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogMDtcbn1cblxuLyoqXG4gKiBzb3J0IGhlbHBlciB0byBzb3J0IGFycmF5IGVsZW1lbnRzIGluIGRlc2NlbmRpbmcgb3JkZXJcbiAqXG4gKiBAcGFyYW0gICB7bWl4ZWR9IGEgLSBhbiBpdGVtIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSAgIHttaXhlZH0gYiAtIGFuIGl0ZW0gdG8gY29tcGFyZVxuICogQHJldHVybnMge251bWJlcn0gLSBjb21wYXJpc29uIHJlc3VsdFxuICovXG5mdW5jdGlvbiBkZXNjZW5kaW5nKGEsIGIpXG57XG4gIHJldHVybiAtMSAqIGFzY2VuZGluZyhhLCBiKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbnZhciBodHRwcyA9IHJlcXVpcmUoJ2h0dHBzJyk7XG52YXIgaHR0cEZvbGxvdyA9IHJlcXVpcmUoJ2ZvbGxvdy1yZWRpcmVjdHMnKS5odHRwO1xudmFyIGh0dHBzRm9sbG93ID0gcmVxdWlyZSgnZm9sbG93LXJlZGlyZWN0cycpLmh0dHBzO1xudmFyIHVybCA9IHJlcXVpcmUoJ3VybCcpO1xudmFyIHpsaWIgPSByZXF1aXJlKCd6bGliJyk7XG52YXIgVkVSU0lPTiA9IHJlcXVpcmUoJy4vLi4vZW52L2RhdGEnKS52ZXJzaW9uO1xudmFyIHRyYW5zaXRpb25hbERlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsJyk7XG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xudmFyIENhbmNlbGVkRXJyb3IgPSByZXF1aXJlKCcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvcicpO1xuXG52YXIgaXNIdHRwcyA9IC9odHRwczo/LztcblxudmFyIHN1cHBvcnRlZFByb3RvY29scyA9IFsgJ2h0dHA6JywgJ2h0dHBzOicsICdmaWxlOicgXTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtodHRwLkNsaWVudFJlcXVlc3RBcmdzfSBvcHRpb25zXG4gKiBAcGFyYW0ge0F4aW9zUHJveHlDb25maWd9IHByb3h5XG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb25cbiAqL1xuZnVuY3Rpb24gc2V0UHJveHkob3B0aW9ucywgcHJveHksIGxvY2F0aW9uKSB7XG4gIG9wdGlvbnMuaG9zdG5hbWUgPSBwcm94eS5ob3N0O1xuICBvcHRpb25zLmhvc3QgPSBwcm94eS5ob3N0O1xuICBvcHRpb25zLnBvcnQgPSBwcm94eS5wb3J0O1xuICBvcHRpb25zLnBhdGggPSBsb2NhdGlvbjtcblxuICAvLyBCYXNpYyBwcm94eSBhdXRob3JpemF0aW9uXG4gIGlmIChwcm94eS5hdXRoKSB7XG4gICAgdmFyIGJhc2U2NCA9IEJ1ZmZlci5mcm9tKHByb3h5LmF1dGgudXNlcm5hbWUgKyAnOicgKyBwcm94eS5hdXRoLnBhc3N3b3JkLCAndXRmOCcpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICBvcHRpb25zLmhlYWRlcnNbJ1Byb3h5LUF1dGhvcml6YXRpb24nXSA9ICdCYXNpYyAnICsgYmFzZTY0O1xuICB9XG5cbiAgLy8gSWYgYSBwcm94eSBpcyB1c2VkLCBhbnkgcmVkaXJlY3RzIG11c3QgYWxzbyBwYXNzIHRocm91Z2ggdGhlIHByb3h5XG4gIG9wdGlvbnMuYmVmb3JlUmVkaXJlY3QgPSBmdW5jdGlvbiBiZWZvcmVSZWRpcmVjdChyZWRpcmVjdGlvbikge1xuICAgIHJlZGlyZWN0aW9uLmhlYWRlcnMuaG9zdCA9IHJlZGlyZWN0aW9uLmhvc3Q7XG4gICAgc2V0UHJveHkocmVkaXJlY3Rpb24sIHByb3h5LCByZWRpcmVjdGlvbi5ocmVmKTtcbiAgfTtcbn1cblxuLyplc2xpbnQgY29uc2lzdGVudC1yZXR1cm46MCovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGh0dHBBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hIdHRwUmVxdWVzdChyZXNvbHZlUHJvbWlzZSwgcmVqZWN0UHJvbWlzZSkge1xuICAgIHZhciBvbkNhbmNlbGVkO1xuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgcmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUodmFsdWUpIHtcbiAgICAgIGRvbmUoKTtcbiAgICAgIHJlc29sdmVQcm9taXNlKHZhbHVlKTtcbiAgICB9O1xuICAgIHZhciByZWplY3RlZCA9IGZhbHNlO1xuICAgIHZhciByZWplY3QgPSBmdW5jdGlvbiByZWplY3QodmFsdWUpIHtcbiAgICAgIGRvbmUoKTtcbiAgICAgIHJlamVjdGVkID0gdHJ1ZTtcbiAgICAgIHJlamVjdFByb21pc2UodmFsdWUpO1xuICAgIH07XG4gICAgdmFyIGRhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuICAgIHZhciBoZWFkZXJOYW1lcyA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbiBzdG9yZUxvd2VyTmFtZShuYW1lKSB7XG4gICAgICBoZWFkZXJOYW1lc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gbmFtZTtcbiAgICB9KTtcblxuICAgIC8vIFNldCBVc2VyLUFnZW50IChyZXF1aXJlZCBieSBzb21lIHNlcnZlcnMpXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9heGlvcy9heGlvcy9pc3N1ZXMvNjlcbiAgICBpZiAoJ3VzZXItYWdlbnQnIGluIGhlYWRlck5hbWVzKSB7XG4gICAgICAvLyBVc2VyLUFnZW50IGlzIHNwZWNpZmllZDsgaGFuZGxlIGNhc2Ugd2hlcmUgbm8gVUEgaGVhZGVyIGlzIGRlc2lyZWRcbiAgICAgIGlmICghaGVhZGVyc1toZWFkZXJOYW1lc1sndXNlci1hZ2VudCddXSkge1xuICAgICAgICBkZWxldGUgaGVhZGVyc1toZWFkZXJOYW1lc1sndXNlci1hZ2VudCddXTtcbiAgICAgIH1cbiAgICAgIC8vIE90aGVyd2lzZSwgdXNlIHNwZWNpZmllZCB2YWx1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPbmx5IHNldCBoZWFkZXIgaWYgaXQgaGFzbid0IGJlZW4gc2V0IGluIGNvbmZpZ1xuICAgICAgaGVhZGVyc1snVXNlci1BZ2VudCddID0gJ2F4aW9zLycgKyBWRVJTSU9OO1xuICAgIH1cblxuICAgIC8vIHN1cHBvcnQgZm9yIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2Zvcm0tZGF0YSBhcGlcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSAmJiB1dGlscy5pc0Z1bmN0aW9uKGRhdGEuZ2V0SGVhZGVycykpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oaGVhZGVycywgZGF0YS5nZXRIZWFkZXJzKCkpO1xuICAgIH0gZWxzZSBpZiAoZGF0YSAmJiAhdXRpbHMuaXNTdHJlYW0oZGF0YSkpIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgLy8gTm90aGluZyB0byBkby4uLlxuICAgICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpKSB7XG4gICAgICAgIGRhdGEgPSBCdWZmZXIuZnJvbShuZXcgVWludDhBcnJheShkYXRhKSk7XG4gICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzU3RyaW5nKGRhdGEpKSB7XG4gICAgICAgIGRhdGEgPSBCdWZmZXIuZnJvbShkYXRhLCAndXRmLTgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgJ0RhdGEgYWZ0ZXIgdHJhbnNmb3JtYXRpb24gbXVzdCBiZSBhIHN0cmluZywgYW4gQXJyYXlCdWZmZXIsIGEgQnVmZmVyLCBvciBhIFN0cmVhbScsXG4gICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsXG4gICAgICAgICAgY29uZmlnXG4gICAgICAgICkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLm1heEJvZHlMZW5ndGggPiAtMSAmJiBkYXRhLmxlbmd0aCA+IGNvbmZpZy5tYXhCb2R5TGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgJ1JlcXVlc3QgYm9keSBsYXJnZXIgdGhhbiBtYXhCb2R5TGVuZ3RoIGxpbWl0JyxcbiAgICAgICAgICBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCxcbiAgICAgICAgICBjb25maWdcbiAgICAgICAgKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBDb250ZW50LUxlbmd0aCBoZWFkZXIgaWYgZGF0YSBleGlzdHNcbiAgICAgIGlmICghaGVhZGVyTmFtZXNbJ2NvbnRlbnQtbGVuZ3RoJ10pIHtcbiAgICAgICAgaGVhZGVyc1snQ29udGVudC1MZW5ndGgnXSA9IGRhdGEubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICB2YXIgYXV0aCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICBhdXRoID0gdXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZDtcbiAgICB9XG5cbiAgICAvLyBQYXJzZSB1cmxcbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICB2YXIgcGFyc2VkID0gdXJsLnBhcnNlKGZ1bGxQYXRoKTtcbiAgICB2YXIgcHJvdG9jb2wgPSBwYXJzZWQucHJvdG9jb2wgfHwgc3VwcG9ydGVkUHJvdG9jb2xzWzBdO1xuXG4gICAgaWYgKHN1cHBvcnRlZFByb3RvY29scy5pbmRleE9mKHByb3RvY29sKSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wsXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULFxuICAgICAgICBjb25maWdcbiAgICAgICkpO1xuICAgIH1cblxuICAgIGlmICghYXV0aCAmJiBwYXJzZWQuYXV0aCkge1xuICAgICAgdmFyIHVybEF1dGggPSBwYXJzZWQuYXV0aC5zcGxpdCgnOicpO1xuICAgICAgdmFyIHVybFVzZXJuYW1lID0gdXJsQXV0aFswXSB8fCAnJztcbiAgICAgIHZhciB1cmxQYXNzd29yZCA9IHVybEF1dGhbMV0gfHwgJyc7XG4gICAgICBhdXRoID0gdXJsVXNlcm5hbWUgKyAnOicgKyB1cmxQYXNzd29yZDtcbiAgICB9XG5cbiAgICBpZiAoYXV0aCAmJiBoZWFkZXJOYW1lcy5hdXRob3JpemF0aW9uKSB7XG4gICAgICBkZWxldGUgaGVhZGVyc1toZWFkZXJOYW1lcy5hdXRob3JpemF0aW9uXTtcbiAgICB9XG5cbiAgICB2YXIgaXNIdHRwc1JlcXVlc3QgPSBpc0h0dHBzLnRlc3QocHJvdG9jb2wpO1xuICAgIHZhciBhZ2VudCA9IGlzSHR0cHNSZXF1ZXN0ID8gY29uZmlnLmh0dHBzQWdlbnQgOiBjb25maWcuaHR0cEFnZW50O1xuXG4gICAgdHJ5IHtcbiAgICAgIGJ1aWxkVVJMKHBhcnNlZC5wYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHZhciBjdXN0b21FcnIgPSBuZXcgRXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgY3VzdG9tRXJyLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgIGN1c3RvbUVyci51cmwgPSBjb25maWcudXJsO1xuICAgICAgY3VzdG9tRXJyLmV4aXN0cyA9IHRydWU7XG4gICAgICByZWplY3QoY3VzdG9tRXJyKTtcbiAgICB9XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgIHBhdGg6IGJ1aWxkVVJMKHBhcnNlZC5wYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKSxcbiAgICAgIG1ldGhvZDogY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIGFnZW50OiBhZ2VudCxcbiAgICAgIGFnZW50czogeyBodHRwOiBjb25maWcuaHR0cEFnZW50LCBodHRwczogY29uZmlnLmh0dHBzQWdlbnQgfSxcbiAgICAgIGF1dGg6IGF1dGhcbiAgICB9O1xuXG4gICAgaWYgKGNvbmZpZy5zb2NrZXRQYXRoKSB7XG4gICAgICBvcHRpb25zLnNvY2tldFBhdGggPSBjb25maWcuc29ja2V0UGF0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy5ob3N0bmFtZSA9IHBhcnNlZC5ob3N0bmFtZTtcbiAgICAgIG9wdGlvbnMucG9ydCA9IHBhcnNlZC5wb3J0O1xuICAgIH1cblxuICAgIHZhciBwcm94eSA9IGNvbmZpZy5wcm94eTtcbiAgICBpZiAoIXByb3h5ICYmIHByb3h5ICE9PSBmYWxzZSkge1xuICAgICAgdmFyIHByb3h5RW52ID0gcHJvdG9jb2wuc2xpY2UoMCwgLTEpICsgJ19wcm94eSc7XG4gICAgICB2YXIgcHJveHlVcmwgPSBwcm9jZXNzLmVudltwcm94eUVudl0gfHwgcHJvY2Vzcy5lbnZbcHJveHlFbnYudG9VcHBlckNhc2UoKV07XG4gICAgICBpZiAocHJveHlVcmwpIHtcbiAgICAgICAgdmFyIHBhcnNlZFByb3h5VXJsID0gdXJsLnBhcnNlKHByb3h5VXJsKTtcbiAgICAgICAgdmFyIG5vUHJveHlFbnYgPSBwcm9jZXNzLmVudi5ub19wcm94eSB8fCBwcm9jZXNzLmVudi5OT19QUk9YWTtcbiAgICAgICAgdmFyIHNob3VsZFByb3h5ID0gdHJ1ZTtcblxuICAgICAgICBpZiAobm9Qcm94eUVudikge1xuICAgICAgICAgIHZhciBub1Byb3h5ID0gbm9Qcm94eUVudi5zcGxpdCgnLCcpLm1hcChmdW5jdGlvbiB0cmltKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRyaW0oKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNob3VsZFByb3h5ID0gIW5vUHJveHkuc29tZShmdW5jdGlvbiBwcm94eU1hdGNoKHByb3h5RWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKCFwcm94eUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb3h5RWxlbWVudCA9PT0gJyonKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb3h5RWxlbWVudFswXSA9PT0gJy4nICYmXG4gICAgICAgICAgICAgICAgcGFyc2VkLmhvc3RuYW1lLnN1YnN0cihwYXJzZWQuaG9zdG5hbWUubGVuZ3RoIC0gcHJveHlFbGVtZW50Lmxlbmd0aCkgPT09IHByb3h5RWxlbWVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlZC5ob3N0bmFtZSA9PT0gcHJveHlFbGVtZW50O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3VsZFByb3h5KSB7XG4gICAgICAgICAgcHJveHkgPSB7XG4gICAgICAgICAgICBob3N0OiBwYXJzZWRQcm94eVVybC5ob3N0bmFtZSxcbiAgICAgICAgICAgIHBvcnQ6IHBhcnNlZFByb3h5VXJsLnBvcnQsXG4gICAgICAgICAgICBwcm90b2NvbDogcGFyc2VkUHJveHlVcmwucHJvdG9jb2xcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHBhcnNlZFByb3h5VXJsLmF1dGgpIHtcbiAgICAgICAgICAgIHZhciBwcm94eVVybEF1dGggPSBwYXJzZWRQcm94eVVybC5hdXRoLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICBwcm94eS5hdXRoID0ge1xuICAgICAgICAgICAgICB1c2VybmFtZTogcHJveHlVcmxBdXRoWzBdLFxuICAgICAgICAgICAgICBwYXNzd29yZDogcHJveHlVcmxBdXRoWzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm94eSkge1xuICAgICAgb3B0aW9ucy5oZWFkZXJzLmhvc3QgPSBwYXJzZWQuaG9zdG5hbWUgKyAocGFyc2VkLnBvcnQgPyAnOicgKyBwYXJzZWQucG9ydCA6ICcnKTtcbiAgICAgIHNldFByb3h5KG9wdGlvbnMsIHByb3h5LCBwcm90b2NvbCArICcvLycgKyBwYXJzZWQuaG9zdG5hbWUgKyAocGFyc2VkLnBvcnQgPyAnOicgKyBwYXJzZWQucG9ydCA6ICcnKSArIG9wdGlvbnMucGF0aCk7XG4gICAgfVxuXG4gICAgdmFyIHRyYW5zcG9ydDtcbiAgICB2YXIgaXNIdHRwc1Byb3h5ID0gaXNIdHRwc1JlcXVlc3QgJiYgKHByb3h5ID8gaXNIdHRwcy50ZXN0KHByb3h5LnByb3RvY29sKSA6IHRydWUpO1xuICAgIGlmIChjb25maWcudHJhbnNwb3J0KSB7XG4gICAgICB0cmFuc3BvcnQgPSBjb25maWcudHJhbnNwb3J0O1xuICAgIH0gZWxzZSBpZiAoY29uZmlnLm1heFJlZGlyZWN0cyA9PT0gMCkge1xuICAgICAgdHJhbnNwb3J0ID0gaXNIdHRwc1Byb3h5ID8gaHR0cHMgOiBodHRwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29uZmlnLm1heFJlZGlyZWN0cykge1xuICAgICAgICBvcHRpb25zLm1heFJlZGlyZWN0cyA9IGNvbmZpZy5tYXhSZWRpcmVjdHM7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmJlZm9yZVJlZGlyZWN0KSB7XG4gICAgICAgIG9wdGlvbnMuYmVmb3JlUmVkaXJlY3QgPSBjb25maWcuYmVmb3JlUmVkaXJlY3Q7XG4gICAgICB9XG4gICAgICB0cmFuc3BvcnQgPSBpc0h0dHBzUHJveHkgPyBodHRwc0ZvbGxvdyA6IGh0dHBGb2xsb3c7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5tYXhCb2R5TGVuZ3RoID4gLTEpIHtcbiAgICAgIG9wdGlvbnMubWF4Qm9keUxlbmd0aCA9IGNvbmZpZy5tYXhCb2R5TGVuZ3RoO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuaW5zZWN1cmVIVFRQUGFyc2VyKSB7XG4gICAgICBvcHRpb25zLmluc2VjdXJlSFRUUFBhcnNlciA9IGNvbmZpZy5pbnNlY3VyZUhUVFBQYXJzZXI7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSByZXF1ZXN0XG4gICAgdmFyIHJlcSA9IHRyYW5zcG9ydC5yZXF1ZXN0KG9wdGlvbnMsIGZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlKHJlcykge1xuICAgICAgaWYgKHJlcS5hYm9ydGVkKSByZXR1cm47XG5cbiAgICAgIC8vIHVuY29tcHJlc3MgdGhlIHJlc3BvbnNlIGJvZHkgdHJhbnNwYXJlbnRseSBpZiByZXF1aXJlZFxuICAgICAgdmFyIHN0cmVhbSA9IHJlcztcblxuICAgICAgLy8gcmV0dXJuIHRoZSBsYXN0IHJlcXVlc3QgaW4gY2FzZSBvZiByZWRpcmVjdHNcbiAgICAgIHZhciBsYXN0UmVxdWVzdCA9IHJlcy5yZXEgfHwgcmVxO1xuXG5cbiAgICAgIC8vIGlmIG5vIGNvbnRlbnQsIGlzIEhFQUQgcmVxdWVzdCBvciBkZWNvbXByZXNzIGRpc2FibGVkIHdlIHNob3VsZCBub3QgZGVjb21wcmVzc1xuICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlICE9PSAyMDQgJiYgbGFzdFJlcXVlc3QubWV0aG9kICE9PSAnSEVBRCcgJiYgY29uZmlnLmRlY29tcHJlc3MgIT09IGZhbHNlKSB7XG4gICAgICAgIHN3aXRjaCAocmVzLmhlYWRlcnNbJ2NvbnRlbnQtZW5jb2RpbmcnXSkge1xuICAgICAgICAvKmVzbGludCBkZWZhdWx0LWNhc2U6MCovXG4gICAgICAgIGNhc2UgJ2d6aXAnOlxuICAgICAgICBjYXNlICdjb21wcmVzcyc6XG4gICAgICAgIGNhc2UgJ2RlZmxhdGUnOlxuICAgICAgICAvLyBhZGQgdGhlIHVuemlwcGVyIHRvIHRoZSBib2R5IHN0cmVhbSBwcm9jZXNzaW5nIHBpcGVsaW5lXG4gICAgICAgICAgc3RyZWFtID0gc3RyZWFtLnBpcGUoemxpYi5jcmVhdGVVbnppcCgpKTtcblxuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgY29udGVudC1lbmNvZGluZyBpbiBvcmRlciB0byBub3QgY29uZnVzZSBkb3duc3RyZWFtIG9wZXJhdGlvbnNcbiAgICAgICAgICBkZWxldGUgcmVzLmhlYWRlcnNbJ2NvbnRlbnQtZW5jb2RpbmcnXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIHN0YXR1czogcmVzLnN0YXR1c0NvZGUsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcy5zdGF0dXNNZXNzYWdlLFxuICAgICAgICBoZWFkZXJzOiByZXMuaGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IGxhc3RSZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScpIHtcbiAgICAgICAgcmVzcG9uc2UuZGF0YSA9IHN0cmVhbTtcbiAgICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3BvbnNlQnVmZmVyID0gW107XG4gICAgICAgIHZhciB0b3RhbFJlc3BvbnNlQnl0ZXMgPSAwO1xuICAgICAgICBzdHJlYW0ub24oJ2RhdGEnLCBmdW5jdGlvbiBoYW5kbGVTdHJlYW1EYXRhKGNodW5rKSB7XG4gICAgICAgICAgcmVzcG9uc2VCdWZmZXIucHVzaChjaHVuayk7XG4gICAgICAgICAgdG90YWxSZXNwb25zZUJ5dGVzICs9IGNodW5rLmxlbmd0aDtcblxuICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgY29udGVudCBsZW5ndGggaXMgbm90IG92ZXIgdGhlIG1heENvbnRlbnRMZW5ndGggaWYgc3BlY2lmaWVkXG4gICAgICAgICAgaWYgKGNvbmZpZy5tYXhDb250ZW50TGVuZ3RoID4gLTEgJiYgdG90YWxSZXNwb25zZUJ5dGVzID4gY29uZmlnLm1heENvbnRlbnRMZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIHN0cmVhbS5kZXN0b3koKSBlbWl0IGFib3J0ZWQgZXZlbnQgYmVmb3JlIGNhbGxpbmcgcmVqZWN0KCkgb24gTm9kZS5qcyB2MTZcbiAgICAgICAgICAgIHJlamVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHN0cmVhbS5kZXN0cm95KCk7XG4gICAgICAgICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ21heENvbnRlbnRMZW5ndGggc2l6ZSBvZiAnICsgY29uZmlnLm1heENvbnRlbnRMZW5ndGggKyAnIGV4Y2VlZGVkJyxcbiAgICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCBjb25maWcsIGxhc3RSZXF1ZXN0KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzdHJlYW0ub24oJ2Fib3J0ZWQnLCBmdW5jdGlvbiBoYW5kbGVyU3RyZWFtQWJvcnRlZCgpIHtcbiAgICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RyZWFtLmRlc3Ryb3koKTtcbiAgICAgICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgICAnbWF4Q29udGVudExlbmd0aCBzaXplIG9mICcgKyBjb25maWcubWF4Q29udGVudExlbmd0aCArICcgZXhjZWVkZWQnLFxuICAgICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLFxuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgbGFzdFJlcXVlc3RcbiAgICAgICAgICApKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RyZWFtLm9uKCdlcnJvcicsIGZ1bmN0aW9uIGhhbmRsZVN0cmVhbUVycm9yKGVycikge1xuICAgICAgICAgIGlmIChyZXEuYWJvcnRlZCkgcmV0dXJuO1xuICAgICAgICAgIHJlamVjdChBeGlvc0Vycm9yLmZyb20oZXJyLCBudWxsLCBjb25maWcsIGxhc3RSZXF1ZXN0KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0cmVhbS5vbignZW5kJywgZnVuY3Rpb24gaGFuZGxlU3RyZWFtRW5kKCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2VEYXRhID0gcmVzcG9uc2VCdWZmZXIubGVuZ3RoID09PSAxID8gcmVzcG9uc2VCdWZmZXJbMF0gOiBCdWZmZXIuY29uY2F0KHJlc3BvbnNlQnVmZmVyKTtcbiAgICAgICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnYXJyYXlidWZmZXInKSB7XG4gICAgICAgICAgICAgIHJlc3BvbnNlRGF0YSA9IHJlc3BvbnNlRGF0YS50b1N0cmluZyhjb25maWcucmVzcG9uc2VFbmNvZGluZyk7XG4gICAgICAgICAgICAgIGlmICghY29uZmlnLnJlc3BvbnNlRW5jb2RpbmcgfHwgY29uZmlnLnJlc3BvbnNlRW5jb2RpbmcgPT09ICd1dGY4Jykge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlRGF0YSA9IHV0aWxzLnN0cmlwQk9NKHJlc3BvbnNlRGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSByZXNwb25zZURhdGE7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoQXhpb3NFcnJvci5mcm9tKGVyciwgbnVsbCwgY29uZmlnLCByZXNwb25zZS5yZXF1ZXN0LCByZXNwb25zZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gSGFuZGxlIGVycm9yc1xuICAgIHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0RXJyb3IoZXJyKSB7XG4gICAgICAvLyBAdG9kbyByZW1vdmVcbiAgICAgIC8vIGlmIChyZXEuYWJvcnRlZCAmJiBlcnIuY29kZSAhPT0gQXhpb3NFcnJvci5FUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTKSByZXR1cm47XG4gICAgICByZWplY3QoQXhpb3NFcnJvci5mcm9tKGVyciwgbnVsbCwgY29uZmlnLCByZXEpKTtcbiAgICB9KTtcblxuICAgIC8vIHNldCB0Y3Aga2VlcCBhbGl2ZSB0byBwcmV2ZW50IGRyb3AgY29ubmVjdGlvbiBieSBwZWVyXG4gICAgcmVxLm9uKCdzb2NrZXQnLCBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0U29ja2V0KHNvY2tldCkge1xuICAgICAgLy8gZGVmYXVsdCBpbnRlcnZhbCBvZiBzZW5kaW5nIGFjayBwYWNrZXQgaXMgMSBtaW51dGVcbiAgICAgIHNvY2tldC5zZXRLZWVwQWxpdmUodHJ1ZSwgMTAwMCAqIDYwKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSByZXF1ZXN0IHRpbWVvdXRcbiAgICBpZiAoY29uZmlnLnRpbWVvdXQpIHtcbiAgICAgIC8vIFRoaXMgaXMgZm9yY2luZyBhIGludCB0aW1lb3V0IHRvIGF2b2lkIHByb2JsZW1zIGlmIHRoZSBgcmVxYCBpbnRlcmZhY2UgZG9lc24ndCBoYW5kbGUgb3RoZXIgdHlwZXMuXG4gICAgICB2YXIgdGltZW91dCA9IHBhcnNlSW50KGNvbmZpZy50aW1lb3V0LCAxMCk7XG5cbiAgICAgIGlmIChpc05hTih0aW1lb3V0KSkge1xuICAgICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgICAgJ2Vycm9yIHRyeWluZyB0byBwYXJzZSBgY29uZmlnLnRpbWVvdXRgIHRvIGludCcsXG4gICAgICAgICAgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSxcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgcmVxXG4gICAgICAgICkpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gU29tZXRpbWUsIHRoZSByZXNwb25zZSB3aWxsIGJlIHZlcnkgc2xvdywgYW5kIGRvZXMgbm90IHJlc3BvbmQsIHRoZSBjb25uZWN0IGV2ZW50IHdpbGwgYmUgYmxvY2sgYnkgZXZlbnQgbG9vcCBzeXN0ZW0uXG4gICAgICAvLyBBbmQgdGltZXIgY2FsbGJhY2sgd2lsbCBiZSBmaXJlZCwgYW5kIGFib3J0KCkgd2lsbCBiZSBpbnZva2VkIGJlZm9yZSBjb25uZWN0aW9uLCB0aGVuIGdldCBcInNvY2tldCBoYW5nIHVwXCIgYW5kIGNvZGUgRUNPTk5SRVNFVC5cbiAgICAgIC8vIEF0IHRoaXMgdGltZSwgaWYgd2UgaGF2ZSBhIGxhcmdlIG51bWJlciBvZiByZXF1ZXN0LCBub2RlanMgd2lsbCBoYW5nIHVwIHNvbWUgc29ja2V0IG9uIGJhY2tncm91bmQuIGFuZCB0aGUgbnVtYmVyIHdpbGwgdXAgYW5kIHVwLlxuICAgICAgLy8gQW5kIHRoZW4gdGhlc2Ugc29ja2V0IHdoaWNoIGJlIGhhbmcgdXAgd2lsbCBkZXZvcmluZyBDUFUgbGl0dGxlIGJ5IGxpdHRsZS5cbiAgICAgIC8vIENsaWVudFJlcXVlc3Quc2V0VGltZW91dCB3aWxsIGJlIGZpcmVkIG9uIHRoZSBzcGVjaWZ5IG1pbGxpc2Vjb25kcywgYW5kIGNhbiBtYWtlIHN1cmUgdGhhdCBhYm9ydCgpIHdpbGwgYmUgZmlyZWQgYWZ0ZXIgY29ubmVjdC5cbiAgICAgIHJlcS5zZXRUaW1lb3V0KHRpbWVvdXQsIGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3RUaW1lb3V0KCkge1xuICAgICAgICByZXEuYWJvcnQoKTtcbiAgICAgICAgdmFyIHRyYW5zaXRpb25hbCA9IGNvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgICAndGltZW91dCBvZiAnICsgdGltZW91dCArICdtcyBleGNlZWRlZCcsXG4gICAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZXFcbiAgICAgICAgKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuIHx8IGNvbmZpZy5zaWduYWwpIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBvbkNhbmNlbGVkID0gZnVuY3Rpb24oY2FuY2VsKSB7XG4gICAgICAgIGlmIChyZXEuYWJvcnRlZCkgcmV0dXJuO1xuXG4gICAgICAgIHJlcS5hYm9ydCgpO1xuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCAoY2FuY2VsICYmIGNhbmNlbC50eXBlKSA/IG5ldyBDYW5jZWxlZEVycm9yKCkgOiBjYW5jZWwpO1xuICAgICAgfTtcblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuICYmIGNvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBjb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgaWYgKHV0aWxzLmlzU3RyZWFtKGRhdGEpKSB7XG4gICAgICBkYXRhLm9uKCdlcnJvcicsIGZ1bmN0aW9uIGhhbmRsZVN0cmVhbUVycm9yKGVycikge1xuICAgICAgICByZWplY3QoQXhpb3NFcnJvci5mcm9tKGVyciwgY29uZmlnLCBudWxsLCByZXEpKTtcbiAgICAgIH0pLnBpcGUocmVxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxLmVuZChkYXRhKTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuLi9jb3JlL2J1aWxkRnVsbFBhdGgnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIHRyYW5zaXRpb25hbERlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsJyk7XG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xudmFyIENhbmNlbGVkRXJyb3IgPSByZXF1aXJlKCcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvcicpO1xudmFyIHBhcnNlUHJvdG9jb2wgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuICAgIHZhciByZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIHZhciBvbkNhbmNlbGVkO1xuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSAmJiB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgPyB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoY29uZmlnLmF1dGgucGFzc3dvcmQpKSA6ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIGZ1bmN0aW9uIG9ubG9hZGVuZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSAndGV4dCcgfHwgIHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nID9cbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCBmdW5jdGlvbiBfcmVqZWN0KGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoJ29ubG9hZGVuZCcgaW4gcmVxdWVzdCkge1xuICAgICAgLy8gVXNlIG9ubG9hZGVuZCBpZiBhdmFpbGFibGVcbiAgICAgIHJlcXVlc3Qub25sb2FkZW5kID0gb25sb2FkZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlIHRvIGVtdWxhdGUgb25sb2FkZW5kXG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVhZHlzdGF0ZSBoYW5kbGVyIGlzIGNhbGxpbmcgYmVmb3JlIG9uZXJyb3Igb3Igb250aW1lb3V0IGhhbmRsZXJzLFxuICAgICAgICAvLyBzbyB3ZSBzaG91bGQgY2FsbCBvbmxvYWRlbmQgb24gdGhlIG5leHQgJ3RpY2snXG4gICAgICAgIHNldFRpbWVvdXQob25sb2FkZW5kKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCwgY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0LCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXQgPyAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnIDogJ3RpbWVvdXQgZXhjZWVkZWQnO1xuICAgICAgdmFyIHRyYW5zaXRpb25hbCA9IGNvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChyZXNwb25zZVR5cGUgJiYgcmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuIHx8IGNvbmZpZy5zaWduYWwpIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBvbkNhbmNlbGVkID0gZnVuY3Rpb24oY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCAoY2FuY2VsICYmIGNhbmNlbC50eXBlKSA/IG5ldyBDYW5jZWxlZEVycm9yKCkgOiBjYW5jZWwpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuICYmIGNvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBjb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFyZXF1ZXN0RGF0YSkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woZnVsbFBhdGgpO1xuXG4gICAgaWYgKHByb3RvY29sICYmIFsgJ2h0dHAnLCAnaHR0cHMnLCAnZmlsZScgXS5pbmRleE9mKHByb3RvY29sKSA9PT0gLTEpIHtcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignVW5zdXBwb3J0ZWQgcHJvdG9jb2wgJyArIHByb3RvY29sICsgJzonLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgY29uZmlnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbGVkRXJyb3IgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxlZEVycm9yJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5heGlvcy5WRVJTSU9OID0gcmVxdWlyZSgnLi9lbnYvZGF0YScpLnZlcnNpb247XG5heGlvcy50b0Zvcm1EYXRhID0gcmVxdWlyZSgnLi9oZWxwZXJzL3RvRm9ybURhdGEnKTtcblxuLy8gRXhwb3NlIEF4aW9zRXJyb3IgY2xhc3NcbmF4aW9zLkF4aW9zRXJyb3IgPSByZXF1aXJlKCcuLi9saWIvY29yZS9BeGlvc0Vycm9yJyk7XG5cbi8vIGFsaWFzIGZvciBDYW5jZWxlZEVycm9yIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5heGlvcy5DYW5jZWwgPSBheGlvcy5DYW5jZWxlZEVycm9yO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSByZXF1aXJlKCcuL2hlbHBlcnMvaXNBeGlvc0Vycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4vQ2FuY2VsZWRFcnJvcicpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG5cbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgdGhpcy5wcm9taXNlLnRoZW4oZnVuY3Rpb24oY2FuY2VsKSB7XG4gICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICB2YXIgaTtcbiAgICB2YXIgbCA9IHRva2VuLl9saXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgIH1cbiAgICB0b2tlbi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgfSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgdGhpcy5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbihvbmZ1bGZpbGxlZCkge1xuICAgIHZhciBfcmVzb2x2ZTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgIH0pLnRoZW4ob25mdWxmaWxsZWQpO1xuXG4gICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xuXG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gKi9cblxuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICB9XG59O1xuXG4vKipcbiAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGNhbmNlbCBzaWduYWxcbiAqL1xuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgQXhpb3NFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UgPT0gbnVsbCA/ICdjYW5jZWxlZCcgOiBtZXNzYWdlLCBBeGlvc0Vycm9yLkVSUl9DQU5DRUxFRCk7XG4gIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbn1cblxudXRpbHMuaW5oZXJpdHMoQ2FuY2VsZWRFcnJvciwgQXhpb3NFcnJvciwge1xuICBfX0NBTkNFTF9fOiB0cnVlXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxlZEVycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4vYnVpbGRGdWxsUGF0aCcpO1xudmFyIHZhbGlkYXRvciA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvdmFsaWRhdG9yJyk7XG5cbnZhciB2YWxpZGF0b3JzID0gdmFsaWRhdG9yLnZhbGlkYXRvcnM7XG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWdPclVybCB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgaWYgKGNvbmZpZy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IHRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xuICB9XG5cbiAgdmFyIHRyYW5zaXRpb25hbCA9IGNvbmZpZy50cmFuc2l0aW9uYWw7XG5cbiAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnModHJhbnNpdGlvbmFsLCB7XG4gICAgICBzaWxlbnRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgY2xhcmlmeVRpbWVvdXRFcnJvcjogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgdmFyIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluID0gW107XG4gIHZhciBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBpZiAodHlwZW9mIGludGVyY2VwdG9yLnJ1bldoZW4gPT09ICdmdW5jdGlvbicgJiYgaW50ZXJjZXB0b3IucnVuV2hlbihjb25maWcpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyAmJiBpbnRlcmNlcHRvci5zeW5jaHJvbm91cztcblxuICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHZhciByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdmFyIHByb21pc2U7XG5cbiAgaWYgKCFzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMpIHtcbiAgICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuXG4gICAgQXJyYXkucHJvdG90eXBlLnVuc2hpZnQuYXBwbHkoY2hhaW4sIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICBjaGFpbiA9IGNoYWluLmNvbmNhdChyZXNwb25zZUludGVyY2VwdG9yQ2hhaW4pO1xuXG4gICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuXG4gIHZhciBuZXdDb25maWcgPSBjb25maWc7XG4gIHdoaWxlIChyZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5sZW5ndGgpIHtcbiAgICB2YXIgb25GdWxmaWxsZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5zaGlmdCgpO1xuICAgIHZhciBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4uc2hpZnQoKTtcbiAgICB0cnkge1xuICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQobmV3Q29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgb25SZWplY3RlZChlcnJvcik7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB0cnkge1xuICAgIHByb21pc2UgPSBkaXNwYXRjaFJlcXVlc3QobmV3Q29uZmlnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICB9XG5cbiAgd2hpbGUgKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5zaGlmdCgpLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICByZXR1cm4gYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cblxuICBmdW5jdGlvbiBnZW5lcmF0ZUhUVFBNZXRob2QoaXNGb3JtKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGh0dHBNZXRob2QodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBpc0Zvcm0gPyB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgICB9IDoge30sXG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KSk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQXhpb3NFcnJvcihtZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIEVycm9yLmNhbGwodGhpcyk7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgcmVzcG9uc2UgJiYgKHRoaXMucmVzcG9uc2UgPSByZXNwb25zZSk7XG59XG5cbnV0aWxzLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgc3RhdHVzOiB0aGlzLnJlc3BvbnNlICYmIHRoaXMucmVzcG9uc2Uuc3RhdHVzID8gdGhpcy5yZXNwb25zZS5zdGF0dXMgOiBudWxsXG4gICAgfTtcbiAgfVxufSk7XG5cbnZhciBwcm90b3R5cGUgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbnZhciBkZXNjcmlwdG9ycyA9IHt9O1xuXG5bXG4gICdFUlJfQkFEX09QVElPTl9WQUxVRScsXG4gICdFUlJfQkFEX09QVElPTicsXG4gICdFQ09OTkFCT1JURUQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VSUl9ORVRXT1JLJyxcbiAgJ0VSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMnLFxuICAnRVJSX0RFUFJFQ0FURUQnLFxuICAnRVJSX0JBRF9SRVNQT05TRScsXG4gICdFUlJfQkFEX1JFUVVFU1QnLFxuICAnRVJSX0NBTkNFTEVEJ1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbl0uZm9yRWFjaChmdW5jdGlvbihjb2RlKSB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCAnaXNBeGlvc0Vycm9yJywge3ZhbHVlOiB0cnVlfSk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5BeGlvc0Vycm9yLmZyb20gPSBmdW5jdGlvbihlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpIHtcbiAgdmFyIGF4aW9zRXJyb3IgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG5cbiAgdXRpbHMudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xuICB9KTtcblxuICBBeGlvc0Vycm9yLmNhbGwoYXhpb3NFcnJvciwgZXJyb3IubWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG5cbiAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcblxuICByZXR1cm4gYXhpb3NFcnJvcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3NFcnJvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWQsXG4gICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgcnVuV2hlbjogb3B0aW9ucyA/IG9wdGlvbnMucnVuV2hlbiA6IG51bGxcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIENhbmNlbGVkRXJyb3IgPSByZXF1aXJlKCcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvcicpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc2lnbmFsICYmIGNvbmZpZy5zaWduYWwuYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBDYW5jZWxlZEVycm9yKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgIGNvbmZpZyxcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1xuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgY29uZmlnLFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIHZhciBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMocHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIG1lcmdlTWFwID0ge1xuICAgICd1cmwnOiB2YWx1ZUZyb21Db25maWcyLFxuICAgICdtZXRob2QnOiB2YWx1ZUZyb21Db25maWcyLFxuICAgICdkYXRhJzogdmFsdWVGcm9tQ29uZmlnMixcbiAgICAnYmFzZVVSTCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RyYW5zZm9ybVJlcXVlc3QnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd0cmFuc2Zvcm1SZXNwb25zZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3BhcmFtc1NlcmlhbGl6ZXInOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd0aW1lb3V0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndGltZW91dE1lc3NhZ2UnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd3aXRoQ3JlZGVudGlhbHMnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdhZGFwdGVyJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAncmVzcG9uc2VUeXBlJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAneHNyZkNvb2tpZU5hbWUnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd4c3JmSGVhZGVyTmFtZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ29uVXBsb2FkUHJvZ3Jlc3MnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdvbkRvd25sb2FkUHJvZ3Jlc3MnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdkZWNvbXByZXNzJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnbWF4Q29udGVudExlbmd0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ21heEJvZHlMZW5ndGgnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdiZWZvcmVSZWRpcmVjdCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RyYW5zcG9ydCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2h0dHBBZ2VudCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2h0dHBzQWdlbnQnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdjYW5jZWxUb2tlbic6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3NvY2tldFBhdGgnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdyZXNwb25zZUVuY29kaW5nJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndmFsaWRhdGVTdGF0dXMnOiBtZXJnZURpcmVjdEtleXNcbiAgfTtcblxuICB1dGlscy5mb3JFYWNoKE9iamVjdC5rZXlzKGNvbmZpZzEpLmNvbmNhdChPYmplY3Qua2V5cyhjb25maWcyKSksIGZ1bmN0aW9uIGNvbXB1dGVDb25maWdWYWx1ZShwcm9wKSB7XG4gICAgdmFyIG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICB2YXIgY29uZmlnVmFsdWUgPSBtZXJnZShwcm9wKTtcbiAgICAodXRpbHMuaXNVbmRlZmluZWQoY29uZmlnVmFsdWUpICYmIG1lcmdlICE9PSBtZXJnZURpcmVjdEtleXMpIHx8IChjb25maWdbcHJvcF0gPSBjb25maWdWYWx1ZSk7XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vQXhpb3NFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICB2YXIgY29udGV4dCA9IHRoaXMgfHwgZGVmYXVsdHM7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuLmNhbGwoY29udGV4dCwgZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzdHJpY3Rcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnZm9ybS1kYXRhJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xudmFyIEF4aW9zRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL0F4aW9zRXJyb3InKTtcbnZhciB0cmFuc2l0aW9uYWxEZWZhdWx0cyA9IHJlcXVpcmUoJy4vdHJhbnNpdGlvbmFsJyk7XG52YXIgdG9Gb3JtRGF0YSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvdG9Gb3JtRGF0YScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4uL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcbiAgaWYgKHV0aWxzLmlzU3RyaW5nKHJhd1ZhbHVlKSkge1xuICAgIHRyeSB7XG4gICAgICAocGFyc2VyIHx8IEpTT04ucGFyc2UpKHJhd1ZhbHVlKTtcbiAgICAgIHJldHVybiB1dGlscy50cmltKHJhd1ZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5uYW1lICE9PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChlbmNvZGVyIHx8IEpTT04uc3RyaW5naWZ5KShyYXdWYWx1ZSk7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHZhciBpc09iamVjdFBheWxvYWQgPSB1dGlscy5pc09iamVjdChkYXRhKTtcbiAgICB2YXIgY29udGVudFR5cGUgPSBoZWFkZXJzICYmIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddO1xuXG4gICAgdmFyIGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCAoaXNPYmplY3RQYXlsb2FkICYmIGNvbnRlbnRUeXBlID09PSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpKSB7XG4gICAgICB2YXIgX0Zvcm1EYXRhID0gdGhpcy5lbnYgJiYgdGhpcy5lbnYuRm9ybURhdGE7XG4gICAgICByZXR1cm4gdG9Gb3JtRGF0YShpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLCBfRm9ybURhdGEgJiYgbmV3IF9Gb3JtRGF0YSgpKTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0UGF5bG9hZCB8fCBjb250ZW50VHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24nKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIHZhciB0cmFuc2l0aW9uYWwgPSB0aGlzLnRyYW5zaXRpb25hbCB8fCBkZWZhdWx0cy50cmFuc2l0aW9uYWw7XG4gICAgdmFyIHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICB2YXIgZm9yY2VkSlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLmZvcmNlZEpTT05QYXJzaW5nO1xuICAgIHZhciBzdHJpY3RKU09OUGFyc2luZyA9ICFzaWxlbnRKU09OUGFyc2luZyAmJiB0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nO1xuXG4gICAgaWYgKHN0cmljdEpTT05QYXJzaW5nIHx8IChmb3JjZWRKU09OUGFyc2luZyAmJiB1dGlscy5pc1N0cmluZyhkYXRhKSAmJiBkYXRhLmxlbmd0aCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHJlcXVpcmUoJy4vZW52L0Zvcm1EYXRhJylcbiAgfSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9LFxuXG4gIGhlYWRlcnM6IHtcbiAgICBjb21tb246IHtcbiAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICAgIH1cbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2Vcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4yNy4yXCJcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gICAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgICAgfTtcbiAgICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuIHV0aWxzLmlzT2JqZWN0KHBheWxvYWQpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgdmFyIG1hdGNoID0gL14oWy0rXFx3XXsxLDI1fSkoOj9cXC9cXC98OikvLmV4ZWModXJsKTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdIHx8ICcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgZGF0YSBvYmplY3QgdG8gRm9ybURhdGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBmb3JtRGF0YSA9IGZvcm1EYXRhIHx8IG5ldyBGb3JtRGF0YSgpO1xuXG4gIHZhciBzdGFjayA9IFtdO1xuXG4gIGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHV0aWxzLmlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscy5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIEJsb2IgPT09ICdmdW5jdGlvbicgPyBuZXcgQmxvYihbdmFsdWVdKSA6IEJ1ZmZlci5mcm9tKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZChkYXRhLCBwYXJlbnRLZXkpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChkYXRhKSB8fCB1dGlscy5pc0FycmF5KGRhdGEpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihkYXRhKSAhPT0gLTEpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGFyZW50S2V5KTtcbiAgICAgIH1cblxuICAgICAgc3RhY2sucHVzaChkYXRhKTtcblxuICAgICAgdXRpbHMuZm9yRWFjaChkYXRhLCBmdW5jdGlvbiBlYWNoKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuICAgICAgICB2YXIgZnVsbEtleSA9IHBhcmVudEtleSA/IHBhcmVudEtleSArICcuJyArIGtleSA6IGtleTtcbiAgICAgICAgdmFyIGFycjtcblxuICAgICAgICBpZiAodmFsdWUgJiYgIXBhcmVudEtleSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgaWYgKHV0aWxzLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh1dGlscy5lbmRzV2l0aChrZXksICdbXScpICYmIChhcnIgPSB1dGlscy50b0FycmF5KHZhbHVlKSkpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAhdXRpbHMuaXNVbmRlZmluZWQoZWwpICYmIGZvcm1EYXRhLmFwcGVuZChmdWxsS2V5LCBjb252ZXJ0VmFsdWUoZWwpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJ1aWxkKHZhbHVlLCBmdWxsS2V5KTtcbiAgICAgIH0pO1xuXG4gICAgICBzdGFjay5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybURhdGEuYXBwZW5kKHBhcmVudEtleSwgY29udmVydFZhbHVlKGRhdGEpKTtcbiAgICB9XG4gIH1cblxuICBidWlsZChvYmopO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b0Zvcm1EYXRhO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2Vudi9kYXRhJykudmVyc2lvbjtcbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG5cbnZhciB2YWxpZGF0b3JzID0ge307XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5bJ29iamVjdCcsICdib29sZWFuJywgJ251bWJlcicsICdmdW5jdGlvbicsICdzdHJpbmcnLCAnc3ltYm9sJ10uZm9yRWFjaChmdW5jdGlvbih0eXBlLCBpKSB7XG4gIHZhbGlkYXRvcnNbdHlwZV0gPSBmdW5jdGlvbiB2YWxpZGF0b3IodGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSB0eXBlIHx8ICdhJyArIChpIDwgMSA/ICduICcgOiAnICcpICsgdHlwZTtcbiAgfTtcbn0pO1xuXG52YXIgZGVwcmVjYXRlZFdhcm5pbmdzID0ge307XG5cbi8qKlxuICogVHJhbnNpdGlvbmFsIG9wdGlvbiB2YWxpZGF0b3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb258Ym9vbGVhbj99IHZhbGlkYXRvciAtIHNldCB0byBmYWxzZSBpZiB0aGUgdHJhbnNpdGlvbmFsIG9wdGlvbiBoYXMgYmVlbiByZW1vdmVkXG4gKiBAcGFyYW0ge3N0cmluZz99IHZlcnNpb24gLSBkZXByZWNhdGVkIHZlcnNpb24gLyByZW1vdmVkIHNpbmNlIHZlcnNpb25cbiAqIEBwYXJhbSB7c3RyaW5nP30gbWVzc2FnZSAtIHNvbWUgbWVzc2FnZSB3aXRoIGFkZGl0aW9uYWwgaW5mb1xuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gJ1tBeGlvcyB2JyArIFZFUlNJT04gKyAnXSBUcmFuc2l0aW9uYWwgb3B0aW9uIFxcJycgKyBvcHQgKyAnXFwnJyArIGRlc2MgKyAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvcHQsIG9wdHMpIHtcbiAgICBpZiAodmFsaWRhdG9yID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGZvcm1hdE1lc3NhZ2Uob3B0LCAnIGhhcyBiZWVuIHJlbW92ZWQnICsgKHZlcnNpb24gPyAnIGluICcgKyB2ZXJzaW9uIDogJycpKSxcbiAgICAgICAgQXhpb3NFcnJvci5FUlJfREVQUkVDQVRFRFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodmVyc2lvbiAmJiAhZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0pIHtcbiAgICAgIGRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdID0gdHJ1ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGZvcm1hdE1lc3NhZ2UoXG4gICAgICAgICAgb3B0LFxuICAgICAgICAgICcgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2JyArIHZlcnNpb24gKyAnIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5lYXIgZnV0dXJlJ1xuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0b3IgPyB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0cykgOiB0cnVlO1xuICB9O1xufTtcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0J3MgcHJvcGVydGllcyB0eXBlXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtib29sZWFuP30gYWxsb3dVbmtub3duXG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0T3B0aW9ucyhvcHRpb25zLCBzY2hlbWEsIGFsbG93VW5rbm93bikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgfVxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIHZhciBvcHQgPSBrZXlzW2ldO1xuICAgIHZhciB2YWxpZGF0b3IgPSBzY2hlbWFbb3B0XTtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICB2YXIgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICB2YXIgcmVzdWx0ID0gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0aW9ucyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb24gJyArIG9wdCArICcgbXVzdCBiZSAnICsgcmVzdWx0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYWxsb3dVbmtub3duICE9PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignVW5rbm93biBvcHRpb24gJyArIG9wdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTik7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhc3NlcnRPcHRpb25zOiBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzOiB2YWxpZGF0b3JzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG52YXIga2luZE9mID0gKGZ1bmN0aW9uKGNhY2hlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiBmdW5jdGlvbih0aGluZykge1xuICAgIHZhciBzdHIgPSB0b1N0cmluZy5jYWxsKHRoaW5nKTtcbiAgICByZXR1cm4gY2FjaGVbc3RyXSB8fCAoY2FjaGVbc3RyXSA9IHN0ci5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKSk7XG4gIH07XG59KShPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuZnVuY3Rpb24ga2luZE9mVGVzdCh0eXBlKSB7XG4gIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBmdW5jdGlvbiBpc0tpbmRPZih0aGluZykge1xuICAgIHJldHVybiBraW5kT2YodGhpbmcpID09PSB0eXBlO1xuICB9O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0FycmF5QnVmZmVyID0ga2luZE9mVGVzdCgnQXJyYXlCdWZmZXInKTtcblxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmIChpc0FycmF5QnVmZmVyKHZhbC5idWZmZXIpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsKSB7XG4gIGlmIChraW5kT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiBwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzRGF0ZSA9IGtpbmRPZlRlc3QoJ0RhdGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNCbG9iID0ga2luZE9mVGVzdCgnQmxvYicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZUxpc3RcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0ZpbGVMaXN0ID0ga2luZE9mVGVzdCgnRmlsZUxpc3QnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodGhpbmcpIHtcbiAgdmFyIHBhdHRlcm4gPSAnW29iamVjdCBGb3JtRGF0YV0nO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHxcbiAgICB0b1N0cmluZy5jYWxsKHRoaW5nKSA9PT0gcGF0dGVybiB8fFxuICAgIChpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSBwYXR0ZXJuKVxuICApO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnRyaW0gPyBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W2tleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuZnVuY3Rpb24gc3RyaXBCT00oY29udGVudCkge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn1cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXVxuICogQHBhcmFtIHtvYmplY3R9IFtkZXNjcmlwdG9yc11cbiAqL1xuXG5mdW5jdGlvbiBpbmhlcml0cyhjb25zdHJ1Y3Rvciwgc3VwZXJDb25zdHJ1Y3RvciwgcHJvcHMsIGRlc2NyaXB0b3JzKSB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKTtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gIHByb3BzICYmIE9iamVjdC5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm9wcyk7XG59XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmaWx0ZXJdXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIHRvRmxhdE9iamVjdChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlcikge1xuICB2YXIgcHJvcHM7XG4gIHZhciBpO1xuICB2YXIgcHJvcDtcbiAgdmFyIG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHNvdXJjZU9iaik7XG4gIH0gd2hpbGUgKHNvdXJjZU9iaiAmJiAoIWZpbHRlciB8fCBmaWx0ZXIoc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgc291cmNlT2JqICE9PSBPYmplY3QucHJvdG90eXBlKTtcblxuICByZXR1cm4gZGVzdE9iajtcbn1cblxuLypcbiAqIGRldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gW3Bvc2l0aW9uPSAwXVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcG9zaXRpb24gPiBzdHIubGVuZ3RoKSB7XG4gICAgcG9zaXRpb24gPSBzdHIubGVuZ3RoO1xuICB9XG4gIHBvc2l0aW9uIC09IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gIHZhciBsYXN0SW5kZXggPSBzdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3NpdGlvbjtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3RcbiAqIEBwYXJhbSB7Kn0gW3RoaW5nXVxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiB0b0FycmF5KHRoaW5nKSB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICB2YXIgaSA9IHRoaW5nLmxlbmd0aDtcbiAgaWYgKGlzVW5kZWZpbmVkKGkpKSByZXR1cm4gbnVsbDtcbiAgdmFyIGFyciA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBhcnJbaV0gPSB0aGluZ1tpXTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xudmFyIGlzVHlwZWRBcnJheSA9IChmdW5jdGlvbihUeXBlZEFycmF5KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiBmdW5jdGlvbih0aGluZykge1xuICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgfTtcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoVWludDhBcnJheSkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbSxcbiAgc3RyaXBCT006IHN0cmlwQk9NLFxuICBpbmhlcml0czogaW5oZXJpdHMsXG4gIHRvRmxhdE9iamVjdDogdG9GbGF0T2JqZWN0LFxuICBraW5kT2Y6IGtpbmRPZixcbiAga2luZE9mVGVzdDoga2luZE9mVGVzdCxcbiAgZW5kc1dpdGg6IGVuZHNXaXRoLFxuICB0b0FycmF5OiB0b0FycmF5LFxuICBpc1R5cGVkQXJyYXk6IGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdDogaXNGaWxlTGlzdFxufTtcbiIsInZhciBDb21iaW5lZFN0cmVhbSA9IHJlcXVpcmUoJ2NvbWJpbmVkLXN0cmVhbScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbnZhciBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xudmFyIGh0dHBzID0gcmVxdWlyZSgnaHR0cHMnKTtcbnZhciBwYXJzZVVybCA9IHJlcXVpcmUoJ3VybCcpLnBhcnNlO1xudmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbnZhciBTdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKS5TdHJlYW07XG52YXIgbWltZSA9IHJlcXVpcmUoJ21pbWUtdHlwZXMnKTtcbnZhciBhc3luY2tpdCA9IHJlcXVpcmUoJ2FzeW5ja2l0Jyk7XG52YXIgcG9wdWxhdGUgPSByZXF1aXJlKCcuL3BvcHVsYXRlLmpzJyk7XG5cbi8vIFB1YmxpYyBBUElcbm1vZHVsZS5leHBvcnRzID0gRm9ybURhdGE7XG5cbi8vIG1ha2UgaXQgYSBTdHJlYW1cbnV0aWwuaW5oZXJpdHMoRm9ybURhdGEsIENvbWJpbmVkU3RyZWFtKTtcblxuLyoqXG4gKiBDcmVhdGUgcmVhZGFibGUgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgc3RyZWFtcy5cbiAqIENhbiBiZSB1c2VkIHRvIHN1Ym1pdCBmb3Jtc1xuICogYW5kIGZpbGUgdXBsb2FkcyB0byBvdGhlciB3ZWIgYXBwbGljYXRpb25zLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBQcm9wZXJ0aWVzIHRvIGJlIGFkZGVkL292ZXJyaWRlbiBmb3IgRm9ybURhdGEgYW5kIENvbWJpbmVkU3RyZWFtXG4gKi9cbmZ1bmN0aW9uIEZvcm1EYXRhKG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEZvcm1EYXRhKSkge1xuICAgIHJldHVybiBuZXcgRm9ybURhdGEob3B0aW9ucyk7XG4gIH1cblxuICB0aGlzLl9vdmVyaGVhZExlbmd0aCA9IDA7XG4gIHRoaXMuX3ZhbHVlTGVuZ3RoID0gMDtcbiAgdGhpcy5fdmFsdWVzVG9NZWFzdXJlID0gW107XG5cbiAgQ29tYmluZWRTdHJlYW0uY2FsbCh0aGlzKTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgZm9yICh2YXIgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICB0aGlzW29wdGlvbl0gPSBvcHRpb25zW29wdGlvbl07XG4gIH1cbn1cblxuRm9ybURhdGEuTElORV9CUkVBSyA9ICdcXHJcXG4nO1xuRm9ybURhdGEuREVGQVVMVF9DT05URU5UX1RZUEUgPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcblxuRm9ybURhdGEucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKGZpZWxkLCB2YWx1ZSwgb3B0aW9ucykge1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8vIGFsbG93IGZpbGVuYW1lIGFzIHNpbmdsZSBvcHRpb25cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09ICdzdHJpbmcnKSB7XG4gICAgb3B0aW9ucyA9IHtmaWxlbmFtZTogb3B0aW9uc307XG4gIH1cblxuICB2YXIgYXBwZW5kID0gQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLmFwcGVuZC5iaW5kKHRoaXMpO1xuXG4gIC8vIGFsbCB0aGF0IHN0cmVhbXkgYnVzaW5lc3MgY2FuJ3QgaGFuZGxlIG51bWJlcnNcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHZhbHVlID0gJycgKyB2YWx1ZTtcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mZWxpeGdlL25vZGUtZm9ybS1kYXRhL2lzc3Vlcy8zOFxuICBpZiAodXRpbC5pc0FycmF5KHZhbHVlKSkge1xuICAgIC8vIFBsZWFzZSBjb252ZXJ0IHlvdXIgYXJyYXkgaW50byBzdHJpbmdcbiAgICAvLyB0aGUgd2F5IHdlYiBzZXJ2ZXIgZXhwZWN0cyBpdFxuICAgIHRoaXMuX2Vycm9yKG5ldyBFcnJvcignQXJyYXlzIGFyZSBub3Qgc3VwcG9ydGVkLicpKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaGVhZGVyID0gdGhpcy5fbXVsdGlQYXJ0SGVhZGVyKGZpZWxkLCB2YWx1ZSwgb3B0aW9ucyk7XG4gIHZhciBmb290ZXIgPSB0aGlzLl9tdWx0aVBhcnRGb290ZXIoKTtcblxuICBhcHBlbmQoaGVhZGVyKTtcbiAgYXBwZW5kKHZhbHVlKTtcbiAgYXBwZW5kKGZvb3Rlcik7XG5cbiAgLy8gcGFzcyBhbG9uZyBvcHRpb25zLmtub3duTGVuZ3RoXG4gIHRoaXMuX3RyYWNrTGVuZ3RoKGhlYWRlciwgdmFsdWUsIG9wdGlvbnMpO1xufTtcblxuRm9ybURhdGEucHJvdG90eXBlLl90cmFja0xlbmd0aCA9IGZ1bmN0aW9uKGhlYWRlciwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgdmFyIHZhbHVlTGVuZ3RoID0gMDtcblxuICAvLyB1c2VkIHcvIGdldExlbmd0aFN5bmMoKSwgd2hlbiBsZW5ndGggaXMga25vd24uXG4gIC8vIGUuZy4gZm9yIHN0cmVhbWluZyBkaXJlY3RseSBmcm9tIGEgcmVtb3RlIHNlcnZlcixcbiAgLy8gdy8gYSBrbm93biBmaWxlIGEgc2l6ZSwgYW5kIG5vdCB3YW50aW5nIHRvIHdhaXQgZm9yXG4gIC8vIGluY29taW5nIGZpbGUgdG8gZmluaXNoIHRvIGdldCBpdHMgc2l6ZS5cbiAgaWYgKG9wdGlvbnMua25vd25MZW5ndGggIT0gbnVsbCkge1xuICAgIHZhbHVlTGVuZ3RoICs9ICtvcHRpb25zLmtub3duTGVuZ3RoO1xuICB9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWVMZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aCh2YWx1ZSk7XG4gIH1cblxuICB0aGlzLl92YWx1ZUxlbmd0aCArPSB2YWx1ZUxlbmd0aDtcblxuICAvLyBAY2hlY2sgd2h5IGFkZCBDUkxGPyBkb2VzIHRoaXMgYWNjb3VudCBmb3IgY3VzdG9tL211bHRpcGxlIENSTEZzP1xuICB0aGlzLl9vdmVyaGVhZExlbmd0aCArPVxuICAgIEJ1ZmZlci5ieXRlTGVuZ3RoKGhlYWRlcikgK1xuICAgIEZvcm1EYXRhLkxJTkVfQlJFQUsubGVuZ3RoO1xuXG4gIC8vIGVtcHR5IG9yIGVpdGhlciBkb2Vzbid0IGhhdmUgcGF0aCBvciBub3QgYW4gaHR0cCByZXNwb25zZSBvciBub3QgYSBzdHJlYW1cbiAgaWYgKCF2YWx1ZSB8fCAoICF2YWx1ZS5wYXRoICYmICEodmFsdWUucmVhZGFibGUgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoJ2h0dHBWZXJzaW9uJykpICYmICEodmFsdWUgaW5zdGFuY2VvZiBTdHJlYW0pKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIG5vIG5lZWQgdG8gYm90aGVyIHdpdGggdGhlIGxlbmd0aFxuICBpZiAoIW9wdGlvbnMua25vd25MZW5ndGgpIHtcbiAgICB0aGlzLl92YWx1ZXNUb01lYXN1cmUucHVzaCh2YWx1ZSk7XG4gIH1cbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5fbGVuZ3RoUmV0cmlldmVyID0gZnVuY3Rpb24odmFsdWUsIGNhbGxiYWNrKSB7XG5cbiAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KCdmZCcpKSB7XG5cbiAgICAvLyB0YWtlIHJlYWQgcmFuZ2UgaW50byBhIGFjY291bnRcbiAgICAvLyBgZW5kYCA9IEluZmluaXR5IOKAkz4gcmVhZCBmaWxlIHRpbGwgdGhlIGVuZFxuICAgIC8vXG4gICAgLy8gVE9ETzogTG9va3MgbGlrZSB0aGVyZSBpcyBidWcgaW4gTm9kZSBmcy5jcmVhdGVSZWFkU3RyZWFtXG4gICAgLy8gaXQgZG9lc24ndCByZXNwZWN0IGBlbmRgIG9wdGlvbnMgd2l0aG91dCBgc3RhcnRgIG9wdGlvbnNcbiAgICAvLyBGaXggaXQgd2hlbiBub2RlIGZpeGVzIGl0LlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvNzgxOVxuICAgIGlmICh2YWx1ZS5lbmQgIT0gdW5kZWZpbmVkICYmIHZhbHVlLmVuZCAhPSBJbmZpbml0eSAmJiB2YWx1ZS5zdGFydCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgLy8gd2hlbiBlbmQgc3BlY2lmaWVkXG4gICAgICAvLyBubyBuZWVkIHRvIGNhbGN1bGF0ZSByYW5nZVxuICAgICAgLy8gaW5jbHVzaXZlLCBzdGFydHMgd2l0aCAwXG4gICAgICBjYWxsYmFjayhudWxsLCB2YWx1ZS5lbmQgKyAxIC0gKHZhbHVlLnN0YXJ0ID8gdmFsdWUuc3RhcnQgOiAwKSk7XG5cbiAgICAvLyBub3QgdGhhdCBmYXN0IHNub29weVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzdGlsbCBuZWVkIHRvIGZldGNoIGZpbGUgc2l6ZSBmcm9tIGZzXG4gICAgICBmcy5zdGF0KHZhbHVlLnBhdGgsIGZ1bmN0aW9uKGVyciwgc3RhdCkge1xuXG4gICAgICAgIHZhciBmaWxlU2l6ZTtcblxuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgZmluYWwgc2l6ZSBiYXNlZCBvbiB0aGUgcmFuZ2Ugb3B0aW9uc1xuICAgICAgICBmaWxlU2l6ZSA9IHN0YXQuc2l6ZSAtICh2YWx1ZS5zdGFydCA/IHZhbHVlLnN0YXJ0IDogMCk7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIGZpbGVTaXplKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAvLyBvciBodHRwIHJlc3BvbnNlXG4gIH0gZWxzZSBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoJ2h0dHBWZXJzaW9uJykpIHtcbiAgICBjYWxsYmFjayhudWxsLCArdmFsdWUuaGVhZGVyc1snY29udGVudC1sZW5ndGgnXSk7XG5cbiAgLy8gb3IgcmVxdWVzdCBzdHJlYW0gaHR0cDovL2dpdGh1Yi5jb20vbWlrZWFsL3JlcXVlc3RcbiAgfSBlbHNlIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnaHR0cE1vZHVsZScpKSB7XG4gICAgLy8gd2FpdCB0aWxsIHJlc3BvbnNlIGNvbWUgYmFja1xuICAgIHZhbHVlLm9uKCdyZXNwb25zZScsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB2YWx1ZS5wYXVzZSgpO1xuICAgICAgY2FsbGJhY2sobnVsbCwgK3Jlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtbGVuZ3RoJ10pO1xuICAgIH0pO1xuICAgIHZhbHVlLnJlc3VtZSgpO1xuXG4gIC8vIHNvbWV0aGluZyBlbHNlXG4gIH0gZWxzZSB7XG4gICAgY2FsbGJhY2soJ1Vua25vd24gc3RyZWFtJyk7XG4gIH1cbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5fbXVsdGlQYXJ0SGVhZGVyID0gZnVuY3Rpb24oZmllbGQsIHZhbHVlLCBvcHRpb25zKSB7XG4gIC8vIGN1c3RvbSBoZWFkZXIgc3BlY2lmaWVkIChhcyBzdHJpbmcpP1xuICAvLyBpdCBiZWNvbWVzIHJlc3BvbnNpYmxlIGZvciBib3VuZGFyeVxuICAvLyAoZS5nLiB0byBoYW5kbGUgZXh0cmEgQ1JMRnMgb24gLk5FVCBzZXJ2ZXJzKVxuICBpZiAodHlwZW9mIG9wdGlvbnMuaGVhZGVyID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuaGVhZGVyO1xuICB9XG5cbiAgdmFyIGNvbnRlbnREaXNwb3NpdGlvbiA9IHRoaXMuX2dldENvbnRlbnREaXNwb3NpdGlvbih2YWx1ZSwgb3B0aW9ucyk7XG4gIHZhciBjb250ZW50VHlwZSA9IHRoaXMuX2dldENvbnRlbnRUeXBlKHZhbHVlLCBvcHRpb25zKTtcblxuICB2YXIgY29udGVudHMgPSAnJztcbiAgdmFyIGhlYWRlcnMgID0ge1xuICAgIC8vIGFkZCBjdXN0b20gZGlzcG9zaXRpb24gYXMgdGhpcmQgZWxlbWVudCBvciBrZWVwIGl0IHR3byBlbGVtZW50cyBpZiBub3RcbiAgICAnQ29udGVudC1EaXNwb3NpdGlvbic6IFsnZm9ybS1kYXRhJywgJ25hbWU9XCInICsgZmllbGQgKyAnXCInXS5jb25jYXQoY29udGVudERpc3Bvc2l0aW9uIHx8IFtdKSxcbiAgICAvLyBpZiBubyBjb250ZW50IHR5cGUuIGFsbG93IGl0IHRvIGJlIGVtcHR5IGFycmF5XG4gICAgJ0NvbnRlbnQtVHlwZSc6IFtdLmNvbmNhdChjb250ZW50VHlwZSB8fCBbXSlcbiAgfTtcblxuICAvLyBhbGxvdyBjdXN0b20gaGVhZGVycy5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmhlYWRlciA9PSAnb2JqZWN0Jykge1xuICAgIHBvcHVsYXRlKGhlYWRlcnMsIG9wdGlvbnMuaGVhZGVyKTtcbiAgfVxuXG4gIHZhciBoZWFkZXI7XG4gIGZvciAodmFyIHByb3AgaW4gaGVhZGVycykge1xuICAgIGlmICghaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkgY29udGludWU7XG4gICAgaGVhZGVyID0gaGVhZGVyc1twcm9wXTtcblxuICAgIC8vIHNraXAgbnVsbGlzaCBoZWFkZXJzLlxuICAgIGlmIChoZWFkZXIgPT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gY29udmVydCBhbGwgaGVhZGVycyB0byBhcnJheXMuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGhlYWRlcikpIHtcbiAgICAgIGhlYWRlciA9IFtoZWFkZXJdO1xuICAgIH1cblxuICAgIC8vIGFkZCBub24tZW1wdHkgaGVhZGVycy5cbiAgICBpZiAoaGVhZGVyLmxlbmd0aCkge1xuICAgICAgY29udGVudHMgKz0gcHJvcCArICc6ICcgKyBoZWFkZXIuam9pbignOyAnKSArIEZvcm1EYXRhLkxJTkVfQlJFQUs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICctLScgKyB0aGlzLmdldEJvdW5kYXJ5KCkgKyBGb3JtRGF0YS5MSU5FX0JSRUFLICsgY29udGVudHMgKyBGb3JtRGF0YS5MSU5FX0JSRUFLO1xufTtcblxuRm9ybURhdGEucHJvdG90eXBlLl9nZXRDb250ZW50RGlzcG9zaXRpb24gPSBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucykge1xuXG4gIHZhciBmaWxlbmFtZVxuICAgICwgY29udGVudERpc3Bvc2l0aW9uXG4gICAgO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5maWxlcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBjdXN0b20gZmlsZXBhdGggZm9yIHJlbGF0aXZlIHBhdGhzXG4gICAgZmlsZW5hbWUgPSBwYXRoLm5vcm1hbGl6ZShvcHRpb25zLmZpbGVwYXRoKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG4gIH0gZWxzZSBpZiAob3B0aW9ucy5maWxlbmFtZSB8fCB2YWx1ZS5uYW1lIHx8IHZhbHVlLnBhdGgpIHtcbiAgICAvLyBjdXN0b20gZmlsZW5hbWUgdGFrZSBwcmVjZWRlbmNlXG4gICAgLy8gZm9ybWlkYWJsZSBhbmQgdGhlIGJyb3dzZXIgYWRkIGEgbmFtZSBwcm9wZXJ0eVxuICAgIC8vIGZzLSBhbmQgcmVxdWVzdC0gc3RyZWFtcyBoYXZlIHBhdGggcHJvcGVydHlcbiAgICBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUob3B0aW9ucy5maWxlbmFtZSB8fCB2YWx1ZS5uYW1lIHx8IHZhbHVlLnBhdGgpO1xuICB9IGVsc2UgaWYgKHZhbHVlLnJlYWRhYmxlICYmIHZhbHVlLmhhc093blByb3BlcnR5KCdodHRwVmVyc2lvbicpKSB7XG4gICAgLy8gb3IgdHJ5IGh0dHAgcmVzcG9uc2VcbiAgICBmaWxlbmFtZSA9IHBhdGguYmFzZW5hbWUodmFsdWUuY2xpZW50Ll9odHRwTWVzc2FnZS5wYXRoIHx8ICcnKTtcbiAgfVxuXG4gIGlmIChmaWxlbmFtZSkge1xuICAgIGNvbnRlbnREaXNwb3NpdGlvbiA9ICdmaWxlbmFtZT1cIicgKyBmaWxlbmFtZSArICdcIic7XG4gIH1cblxuICByZXR1cm4gY29udGVudERpc3Bvc2l0aW9uO1xufTtcblxuRm9ybURhdGEucHJvdG90eXBlLl9nZXRDb250ZW50VHlwZSA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG5cbiAgLy8gdXNlIGN1c3RvbSBjb250ZW50LXR5cGUgYWJvdmUgYWxsXG4gIHZhciBjb250ZW50VHlwZSA9IG9wdGlvbnMuY29udGVudFR5cGU7XG5cbiAgLy8gb3IgdHJ5IGBuYW1lYCBmcm9tIGZvcm1pZGFibGUsIGJyb3dzZXJcbiAgaWYgKCFjb250ZW50VHlwZSAmJiB2YWx1ZS5uYW1lKSB7XG4gICAgY29udGVudFR5cGUgPSBtaW1lLmxvb2t1cCh2YWx1ZS5uYW1lKTtcbiAgfVxuXG4gIC8vIG9yIHRyeSBgcGF0aGAgZnJvbSBmcy0sIHJlcXVlc3QtIHN0cmVhbXNcbiAgaWYgKCFjb250ZW50VHlwZSAmJiB2YWx1ZS5wYXRoKSB7XG4gICAgY29udGVudFR5cGUgPSBtaW1lLmxvb2t1cCh2YWx1ZS5wYXRoKTtcbiAgfVxuXG4gIC8vIG9yIGlmIGl0J3MgaHR0cC1yZXBvbnNlXG4gIGlmICghY29udGVudFR5cGUgJiYgdmFsdWUucmVhZGFibGUgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoJ2h0dHBWZXJzaW9uJykpIHtcbiAgICBjb250ZW50VHlwZSA9IHZhbHVlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddO1xuICB9XG5cbiAgLy8gb3IgZ3Vlc3MgaXQgZnJvbSB0aGUgZmlsZXBhdGggb3IgZmlsZW5hbWVcbiAgaWYgKCFjb250ZW50VHlwZSAmJiAob3B0aW9ucy5maWxlcGF0aCB8fCBvcHRpb25zLmZpbGVuYW1lKSkge1xuICAgIGNvbnRlbnRUeXBlID0gbWltZS5sb29rdXAob3B0aW9ucy5maWxlcGF0aCB8fCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgfVxuXG4gIC8vIGZhbGxiYWNrIHRvIHRoZSBkZWZhdWx0IGNvbnRlbnQgdHlwZSBpZiBgdmFsdWVgIGlzIG5vdCBzaW1wbGUgdmFsdWVcbiAgaWYgKCFjb250ZW50VHlwZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHtcbiAgICBjb250ZW50VHlwZSA9IEZvcm1EYXRhLkRFRkFVTFRfQ09OVEVOVF9UWVBFO1xuICB9XG5cbiAgcmV0dXJuIGNvbnRlbnRUeXBlO1xufTtcblxuRm9ybURhdGEucHJvdG90eXBlLl9tdWx0aVBhcnRGb290ZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG5leHQpIHtcbiAgICB2YXIgZm9vdGVyID0gRm9ybURhdGEuTElORV9CUkVBSztcblxuICAgIHZhciBsYXN0UGFydCA9ICh0aGlzLl9zdHJlYW1zLmxlbmd0aCA9PT0gMCk7XG4gICAgaWYgKGxhc3RQYXJ0KSB7XG4gICAgICBmb290ZXIgKz0gdGhpcy5fbGFzdEJvdW5kYXJ5KCk7XG4gICAgfVxuXG4gICAgbmV4dChmb290ZXIpO1xuICB9LmJpbmQodGhpcyk7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuX2xhc3RCb3VuZGFyeSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJy0tJyArIHRoaXMuZ2V0Qm91bmRhcnkoKSArICctLScgKyBGb3JtRGF0YS5MSU5FX0JSRUFLO1xufTtcblxuRm9ybURhdGEucHJvdG90eXBlLmdldEhlYWRlcnMgPSBmdW5jdGlvbih1c2VySGVhZGVycykge1xuICB2YXIgaGVhZGVyO1xuICB2YXIgZm9ybUhlYWRlcnMgPSB7XG4gICAgJ2NvbnRlbnQtdHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhOyBib3VuZGFyeT0nICsgdGhpcy5nZXRCb3VuZGFyeSgpXG4gIH07XG5cbiAgZm9yIChoZWFkZXIgaW4gdXNlckhlYWRlcnMpIHtcbiAgICBpZiAodXNlckhlYWRlcnMuaGFzT3duUHJvcGVydHkoaGVhZGVyKSkge1xuICAgICAgZm9ybUhlYWRlcnNbaGVhZGVyLnRvTG93ZXJDYXNlKCldID0gdXNlckhlYWRlcnNbaGVhZGVyXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZm9ybUhlYWRlcnM7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuc2V0Qm91bmRhcnkgPSBmdW5jdGlvbihib3VuZGFyeSkge1xuICB0aGlzLl9ib3VuZGFyeSA9IGJvdW5kYXJ5O1xufTtcblxuRm9ybURhdGEucHJvdG90eXBlLmdldEJvdW5kYXJ5ID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5fYm91bmRhcnkpIHtcbiAgICB0aGlzLl9nZW5lcmF0ZUJvdW5kYXJ5KCk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5fYm91bmRhcnk7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuZ2V0QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkYXRhQnVmZmVyID0gbmV3IEJ1ZmZlci5hbGxvYyggMCApO1xuICB2YXIgYm91bmRhcnkgPSB0aGlzLmdldEJvdW5kYXJ5KCk7XG5cbiAgLy8gQ3JlYXRlIHRoZSBmb3JtIGNvbnRlbnQuIEFkZCBMaW5lIGJyZWFrcyB0byB0aGUgZW5kIG9mIGRhdGEuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9zdHJlYW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9zdHJlYW1zW2ldICE9PSAnZnVuY3Rpb24nKSB7XG5cbiAgICAgIC8vIEFkZCBjb250ZW50IHRvIHRoZSBidWZmZXIuXG4gICAgICBpZihCdWZmZXIuaXNCdWZmZXIodGhpcy5fc3RyZWFtc1tpXSkpIHtcbiAgICAgICAgZGF0YUJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoIFtkYXRhQnVmZmVyLCB0aGlzLl9zdHJlYW1zW2ldXSk7XG4gICAgICB9ZWxzZSB7XG4gICAgICAgIGRhdGFCdWZmZXIgPSBCdWZmZXIuY29uY2F0KCBbZGF0YUJ1ZmZlciwgQnVmZmVyLmZyb20odGhpcy5fc3RyZWFtc1tpXSldKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGJyZWFrIGFmdGVyIGNvbnRlbnQuXG4gICAgICBpZiAodHlwZW9mIHRoaXMuX3N0cmVhbXNbaV0gIT09ICdzdHJpbmcnIHx8IHRoaXMuX3N0cmVhbXNbaV0uc3Vic3RyaW5nKCAyLCBib3VuZGFyeS5sZW5ndGggKyAyICkgIT09IGJvdW5kYXJ5KSB7XG4gICAgICAgIGRhdGFCdWZmZXIgPSBCdWZmZXIuY29uY2F0KCBbZGF0YUJ1ZmZlciwgQnVmZmVyLmZyb20oRm9ybURhdGEuTElORV9CUkVBSyldICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHRoZSBmb290ZXIgYW5kIHJldHVybiB0aGUgQnVmZmVyIG9iamVjdC5cbiAgcmV0dXJuIEJ1ZmZlci5jb25jYXQoIFtkYXRhQnVmZmVyLCBCdWZmZXIuZnJvbSh0aGlzLl9sYXN0Qm91bmRhcnkoKSldICk7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuX2dlbmVyYXRlQm91bmRhcnkgPSBmdW5jdGlvbigpIHtcbiAgLy8gVGhpcyBnZW5lcmF0ZXMgYSA1MCBjaGFyYWN0ZXIgYm91bmRhcnkgc2ltaWxhciB0byB0aG9zZSB1c2VkIGJ5IEZpcmVmb3guXG4gIC8vIFRoZXkgYXJlIG9wdGltaXplZCBmb3IgYm95ZXItbW9vcmUgcGFyc2luZy5cbiAgdmFyIGJvdW5kYXJ5ID0gJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNDsgaSsrKSB7XG4gICAgYm91bmRhcnkgKz0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLnRvU3RyaW5nKDE2KTtcbiAgfVxuXG4gIHRoaXMuX2JvdW5kYXJ5ID0gYm91bmRhcnk7XG59O1xuXG4vLyBOb3RlOiBnZXRMZW5ndGhTeW5jIERPRVNOJ1QgY2FsY3VsYXRlIHN0cmVhbXMgbGVuZ3RoXG4vLyBBcyB3b3JrYXJvdW5kIG9uZSBjYW4gY2FsY3VsYXRlIGZpbGUgc2l6ZSBtYW51YWxseVxuLy8gYW5kIGFkZCBpdCBhcyBrbm93bkxlbmd0aCBvcHRpb25cbkZvcm1EYXRhLnByb3RvdHlwZS5nZXRMZW5ndGhTeW5jID0gZnVuY3Rpb24oKSB7XG4gIHZhciBrbm93bkxlbmd0aCA9IHRoaXMuX292ZXJoZWFkTGVuZ3RoICsgdGhpcy5fdmFsdWVMZW5ndGg7XG5cbiAgLy8gRG9uJ3QgZ2V0IGNvbmZ1c2VkLCB0aGVyZSBhcmUgMyBcImludGVybmFsXCIgc3RyZWFtcyBmb3IgZWFjaCBrZXl2YWwgcGFpclxuICAvLyBzbyBpdCBiYXNpY2FsbHkgY2hlY2tzIGlmIHRoZXJlIGlzIGFueSB2YWx1ZSBhZGRlZCB0byB0aGUgZm9ybVxuICBpZiAodGhpcy5fc3RyZWFtcy5sZW5ndGgpIHtcbiAgICBrbm93bkxlbmd0aCArPSB0aGlzLl9sYXN0Qm91bmRhcnkoKS5sZW5ndGg7XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZm9ybS1kYXRhL2Zvcm0tZGF0YS9pc3N1ZXMvNDBcbiAgaWYgKCF0aGlzLmhhc0tub3duTGVuZ3RoKCkpIHtcbiAgICAvLyBTb21lIGFzeW5jIGxlbmd0aCByZXRyaWV2ZXJzIGFyZSBwcmVzZW50XG4gICAgLy8gdGhlcmVmb3JlIHN5bmNocm9ub3VzIGxlbmd0aCBjYWxjdWxhdGlvbiBpcyBmYWxzZS5cbiAgICAvLyBQbGVhc2UgdXNlIGdldExlbmd0aChjYWxsYmFjaykgdG8gZ2V0IHByb3BlciBsZW5ndGhcbiAgICB0aGlzLl9lcnJvcihuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxjdWxhdGUgcHJvcGVyIGxlbmd0aCBpbiBzeW5jaHJvbm91cyB3YXkuJykpO1xuICB9XG5cbiAgcmV0dXJuIGtub3duTGVuZ3RoO1xufTtcblxuLy8gUHVibGljIEFQSSB0byBjaGVjayBpZiBsZW5ndGggb2YgYWRkZWQgdmFsdWVzIGlzIGtub3duXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZm9ybS1kYXRhL2Zvcm0tZGF0YS9pc3N1ZXMvMTk2XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZm9ybS1kYXRhL2Zvcm0tZGF0YS9pc3N1ZXMvMjYyXG5Gb3JtRGF0YS5wcm90b3R5cGUuaGFzS25vd25MZW5ndGggPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhhc0tub3duTGVuZ3RoID0gdHJ1ZTtcblxuICBpZiAodGhpcy5fdmFsdWVzVG9NZWFzdXJlLmxlbmd0aCkge1xuICAgIGhhc0tub3duTGVuZ3RoID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaGFzS25vd25MZW5ndGg7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuZ2V0TGVuZ3RoID0gZnVuY3Rpb24oY2IpIHtcbiAgdmFyIGtub3duTGVuZ3RoID0gdGhpcy5fb3ZlcmhlYWRMZW5ndGggKyB0aGlzLl92YWx1ZUxlbmd0aDtcblxuICBpZiAodGhpcy5fc3RyZWFtcy5sZW5ndGgpIHtcbiAgICBrbm93bkxlbmd0aCArPSB0aGlzLl9sYXN0Qm91bmRhcnkoKS5sZW5ndGg7XG4gIH1cblxuICBpZiAoIXRoaXMuX3ZhbHVlc1RvTWVhc3VyZS5sZW5ndGgpIHtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGNiLmJpbmQodGhpcywgbnVsbCwga25vd25MZW5ndGgpKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3luY2tpdC5wYXJhbGxlbCh0aGlzLl92YWx1ZXNUb01lYXN1cmUsIHRoaXMuX2xlbmd0aFJldHJpZXZlciwgZnVuY3Rpb24oZXJyLCB2YWx1ZXMpIHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBjYihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKGxlbmd0aCkge1xuICAgICAga25vd25MZW5ndGggKz0gbGVuZ3RoO1xuICAgIH0pO1xuXG4gICAgY2IobnVsbCwga25vd25MZW5ndGgpO1xuICB9KTtcbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5zdWJtaXQgPSBmdW5jdGlvbihwYXJhbXMsIGNiKSB7XG4gIHZhciByZXF1ZXN0XG4gICAgLCBvcHRpb25zXG4gICAgLCBkZWZhdWx0cyA9IHttZXRob2Q6ICdwb3N0J31cbiAgICA7XG5cbiAgLy8gcGFyc2UgcHJvdmlkZWQgdXJsIGlmIGl0J3Mgc3RyaW5nXG4gIC8vIG9yIHRyZWF0IGl0IGFzIG9wdGlvbnMgb2JqZWN0XG4gIGlmICh0eXBlb2YgcGFyYW1zID09ICdzdHJpbmcnKSB7XG5cbiAgICBwYXJhbXMgPSBwYXJzZVVybChwYXJhbXMpO1xuICAgIG9wdGlvbnMgPSBwb3B1bGF0ZSh7XG4gICAgICBwb3J0OiBwYXJhbXMucG9ydCxcbiAgICAgIHBhdGg6IHBhcmFtcy5wYXRobmFtZSxcbiAgICAgIGhvc3Q6IHBhcmFtcy5ob3N0bmFtZSxcbiAgICAgIHByb3RvY29sOiBwYXJhbXMucHJvdG9jb2xcbiAgICB9LCBkZWZhdWx0cyk7XG5cbiAgLy8gdXNlIGN1c3RvbSBwYXJhbXNcbiAgfSBlbHNlIHtcblxuICAgIG9wdGlvbnMgPSBwb3B1bGF0ZShwYXJhbXMsIGRlZmF1bHRzKTtcbiAgICAvLyBpZiBubyBwb3J0IHByb3ZpZGVkIHVzZSBkZWZhdWx0IG9uZVxuICAgIGlmICghb3B0aW9ucy5wb3J0KSB7XG4gICAgICBvcHRpb25zLnBvcnQgPSBvcHRpb25zLnByb3RvY29sID09ICdodHRwczonID8gNDQzIDogODA7XG4gICAgfVxuICB9XG5cbiAgLy8gcHV0IHRoYXQgZ29vZCBjb2RlIGluIGdldEhlYWRlcnMgdG8gc29tZSB1c2VcbiAgb3B0aW9ucy5oZWFkZXJzID0gdGhpcy5nZXRIZWFkZXJzKHBhcmFtcy5oZWFkZXJzKTtcblxuICAvLyBodHRwcyBpZiBzcGVjaWZpZWQsIGZhbGxiYWNrIHRvIGh0dHAgaW4gYW55IG90aGVyIGNhc2VcbiAgaWYgKG9wdGlvbnMucHJvdG9jb2wgPT0gJ2h0dHBzOicpIHtcbiAgICByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdChvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICByZXF1ZXN0ID0gaHR0cC5yZXF1ZXN0KG9wdGlvbnMpO1xuICB9XG5cbiAgLy8gZ2V0IGNvbnRlbnQgbGVuZ3RoIGFuZCBmaXJlIGF3YXlcbiAgdGhpcy5nZXRMZW5ndGgoZnVuY3Rpb24oZXJyLCBsZW5ndGgpIHtcbiAgICBpZiAoZXJyICYmIGVyciAhPT0gJ1Vua25vd24gc3RyZWFtJykge1xuICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBhZGQgY29udGVudCBsZW5ndGhcbiAgICBpZiAobGVuZ3RoKSB7XG4gICAgICByZXF1ZXN0LnNldEhlYWRlcignQ29udGVudC1MZW5ndGgnLCBsZW5ndGgpO1xuICAgIH1cblxuICAgIHRoaXMucGlwZShyZXF1ZXN0KTtcbiAgICBpZiAoY2IpIHtcbiAgICAgIHZhciBvblJlc3BvbnNlO1xuXG4gICAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoZXJyb3IsIHJlc3BvbmNlKSB7XG4gICAgICAgIHJlcXVlc3QucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgY2FsbGJhY2spO1xuICAgICAgICByZXF1ZXN0LnJlbW92ZUxpc3RlbmVyKCdyZXNwb25zZScsIG9uUmVzcG9uc2UpO1xuXG4gICAgICAgIHJldHVybiBjYi5jYWxsKHRoaXMsIGVycm9yLCByZXNwb25jZSk7XG4gICAgICB9O1xuXG4gICAgICBvblJlc3BvbnNlID0gY2FsbGJhY2suYmluZCh0aGlzLCBudWxsKTtcblxuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCBjYWxsYmFjayk7XG4gICAgICByZXF1ZXN0Lm9uKCdyZXNwb25zZScsIG9uUmVzcG9uc2UpO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpKTtcblxuICByZXR1cm4gcmVxdWVzdDtcbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbihlcnIpIHtcbiAgaWYgKCF0aGlzLmVycm9yKSB7XG4gICAgdGhpcy5lcnJvciA9IGVycjtcbiAgICB0aGlzLnBhdXNlKCk7XG4gICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIH1cbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICdbb2JqZWN0IEZvcm1EYXRhXSc7XG59O1xuIiwiLy8gcG9wdWxhdGVzIG1pc3NpbmcgdmFsdWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRzdCwgc3JjKSB7XG5cbiAgT2JqZWN0LmtleXMoc3JjKS5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApXG4gIHtcbiAgICBkc3RbcHJvcF0gPSBkc3RbcHJvcF0gfHwgc3JjW3Byb3BdO1xuICB9KTtcblxuICByZXR1cm4gZHN0O1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHtcbiAgSURvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgSURvbWFpblRhZ3NDbGllbnQsXG4gIElEb21haW5DcmVkZW50aWFsc1xufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuXG5pbXBvcnQgeyBBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BcGlSZXNwb25zZSc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi4vY29tbW9uL0Vycm9yJztcbmltcG9ydCB7IEFQSUVycm9yT3B0aW9ucyB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGZyb20gJy4vZG9tYWluc0NyZWRlbnRpYWxzJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9kb21haW5zVGVtcGxhdGVzJztcbmltcG9ydCBEb21haW5UYWdzQ2xpZW50IGZyb20gJy4vZG9tYWluc1RhZ3MnO1xuaW1wb3J0IHtcbiAgRE5TUmVjb3JkLFxuICBEb21haW5TaG9ydERhdGEsXG4gIERlc3Ryb3llZERvbWFpblJlc3BvbnNlLFxuICBNZXNzYWdlUmVzcG9uc2UsXG4gIERvbWFpbkxpc3RSZXNwb25zZURhdGEsXG4gIERvbWFpblJlc3BvbnNlRGF0YSxcbiAgRG9tYWluVHJhY2tpbmdSZXNwb25zZSxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlLFxuICBVcGRhdGVkT3BlblRyYWNraW5nLFxuICBEb21haW5zUXVlcnksXG4gIERvbWFpbkluZm8sXG4gIENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UsXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MsXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMsXG4gIE9wZW5UcmFja2luZ0luZm8sXG4gIENsaWNrVHJhY2tpbmdJbmZvLFxuICBVbnN1YnNjcmliZVRyYWNraW5nSW5mbyxcbiAgUmVwbGFjZW1lbnRGb3JQb29sLFxuICBES0lNQXV0aG9yaXR5SW5mbyxcbiAgVXBkYXRlZERLSU1BdXRob3JpdHksXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UsXG4gIERLSU1TZWxlY3RvckluZm8sXG4gIFVwZGF0ZWRES0lNU2VsZWN0b3JSZXNwb25zZSxcbiAgV2ViUHJlZml4SW5mbyxcbiAgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluIHtcbiAgbmFtZTogc3RyaW5nO1xuICByZXF1aXJlX3RsczogYm9vbGVhbjtcbiAgc2tpcF92ZXJpZmljYXRpb246IGJvb2xlYW47XG4gIHN0YXRlOiBzdHJpbmc7XG4gIHdpbGRjYXJkOiBib29sZWFuO1xuICBzcGFtX2FjdGlvbjogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIHNtdHBfcGFzc3dvcmQ6IHN0cmluZztcbiAgc210cF9sb2dpbjogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHJlY2VpdmluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuICBzZW5kaW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogRG9tYWluU2hvcnREYXRhLCByZWNlaXZpbmc/OiBETlNSZWNvcmRbXSB8IG51bGwsIHNlbmRpbmc/OiBETlNSZWNvcmRbXSB8IG51bGwpIHtcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5yZXF1aXJlX3RscyA9IGRhdGEucmVxdWlyZV90bHM7XG4gICAgdGhpcy5za2lwX3ZlcmlmaWNhdGlvbiA9IGRhdGEuc2tpcF92ZXJpZmljYXRpb247XG4gICAgdGhpcy5zdGF0ZSA9IGRhdGEuc3RhdGU7XG4gICAgdGhpcy53aWxkY2FyZCA9IGRhdGEud2lsZGNhcmQ7XG4gICAgdGhpcy5zcGFtX2FjdGlvbiA9IGRhdGEuc3BhbV9hY3Rpb247XG4gICAgdGhpcy5jcmVhdGVkX2F0ID0gZGF0YS5jcmVhdGVkX2F0O1xuICAgIHRoaXMuc210cF9wYXNzd29yZCA9IGRhdGEuc210cF9wYXNzd29yZDtcbiAgICB0aGlzLnNtdHBfbG9naW4gPSBkYXRhLnNtdHBfbG9naW47XG4gICAgdGhpcy50eXBlID0gZGF0YS50eXBlO1xuXG4gICAgdGhpcy5yZWNlaXZpbmdfZG5zX3JlY29yZHMgPSByZWNlaXZpbmcgfHwgbnVsbDtcbiAgICB0aGlzLnNlbmRpbmdfZG5zX3JlY29yZHMgPSBzZW5kaW5nIHx8IG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHVibGljIGRvbWFpbkNyZWRlbnRpYWxzOiBJRG9tYWluQ3JlZGVudGlhbHM7XG4gIHB1YmxpYyBkb21haW5UZW1wbGF0ZXM6IElEb21haW5UZW1wbGF0ZXNDbGllbnQ7XG4gIHB1YmxpYyBkb21haW5UYWdzOiBJRG9tYWluVGFnc0NsaWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50OiBEb21haW5DcmVkZW50aWFsc0NsaWVudCxcbiAgICBkb21haW5UZW1wbGF0ZXNDbGllbnQ6IERvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgICBkb21haW5UYWdzQ2xpZW50OiBEb21haW5UYWdzQ2xpZW50XG4gICkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5kb21haW5DcmVkZW50aWFscyA9IGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50O1xuICAgIHRoaXMuZG9tYWluVGVtcGxhdGVzID0gZG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuICAgIHRoaXMuZG9tYWluVGFncyA9IGRvbWFpblRhZ3NDbGllbnQ7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZU1lc3NhZ2UocmVzcG9uc2U6IERlc3Ryb3llZERvbWFpblJlc3BvbnNlKSA6IE1lc3NhZ2VSZXNwb25zZSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlRG9tYWluTGlzdChyZXNwb25zZTogRG9tYWluTGlzdFJlc3BvbnNlRGF0YSk6IERvbWFpbltdIHtcbiAgICBpZiAocmVzcG9uc2UuYm9keSAmJiByZXNwb25zZS5ib2R5Lml0ZW1zKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb21haW4oaXRlbSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW4ocmVzcG9uc2U6IERvbWFpblJlc3BvbnNlRGF0YSk6IERvbWFpbiB7XG4gICAgcmV0dXJuIG5ldyBEb21haW4oXG4gICAgICByZXNwb25zZS5ib2R5LmRvbWFpbixcbiAgICAgIHJlc3BvbnNlLmJvZHkucmVjZWl2aW5nX2Ruc19yZWNvcmRzLFxuICAgICAgcmVzcG9uc2UuYm9keS5zZW5kaW5nX2Ruc19yZWNvcmRzXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyhyZXNwb25zZTogRG9tYWluVHJhY2tpbmdSZXNwb25zZSkgOiBEb21haW5UcmFja2luZ0RhdGEge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5LnRyYWNraW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1VwZGF0ZShyZXNwb25zZTogVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSkgOlVwZGF0ZWRPcGVuVHJhY2tpbmcge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgbGlzdChxdWVyeT86IERvbWFpbnNRdWVyeSk6IFByb21pc2U8RG9tYWluW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2RvbWFpbnMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZURvbWFpbkxpc3QocmVzIGFzIERvbWFpbkxpc3RSZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogRG9tYWluSW5mbykgOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIGNvbnN0IHBvc3RPYmogPSB7IC4uLmRhdGEgfTtcbiAgICBpZiAoJ2ZvcmNlX2RraW1fYXV0aG9yaXR5JyBpbiBwb3N0T2JqICYmIHR5cGVvZiBwb3N0T2JqLmZvcmNlX2RraW1fYXV0aG9yaXR5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHBvc3RPYmouZm9yY2VfZGtpbV9hdXRob3JpdHkgPSBwb3N0T2JqLmZvcmNlX2RraW1fYXV0aG9yaXR5LnRvU3RyaW5nKCkgPT09ICd0cnVlJyA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvZG9tYWlucycsIHBvc3RPYmopXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIHZlcmlmeShkb21haW46IHN0cmluZyk6IFByb21pc2U8RG9tYWluPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS92ZXJpZnlgKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxNZXNzYWdlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YzL2RvbWFpbnMvJHtkb21haW59YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlKHJlcyBhcyBEZXN0cm95ZWREb21haW5SZXNwb25zZSkpO1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbihkb21haW46IHN0cmluZyk6IFByb21pc2U8Q29ubmVjdGlvblNldHRpbmdzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9jb25uZWN0aW9uYClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlczpDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSkgPT4gcmVzLmJvZHkuY29ubmVjdGlvbiBhcyBDb25uZWN0aW9uU2V0dGluZ3MpO1xuICB9XG5cbiAgdXBkYXRlQ29ubmVjdGlvbihkb21haW46IHN0cmluZywgZGF0YTogQ29ubmVjdGlvblNldHRpbmdzKTogUHJvbWlzZTxVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9jb25uZWN0aW9uYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMpXG4gICAgICAudGhlbigocmVzOlVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MpO1xuICB9XG5cbiAgLy8gVHJhY2tpbmdcblxuICBnZXRUcmFja2luZyhkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpblRyYWNraW5nRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyk7XG4gIH1cblxuICB1cGRhdGVUcmFja2luZyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogT3BlblRyYWNraW5nSW5mbyB8IENsaWNrVHJhY2tpbmdJbmZvIHwgVW5zdWJzY3JpYmVUcmFja2luZ0luZm9cbiAgKTogUHJvbWlzZTxVcGRhdGVkT3BlblRyYWNraW5nPiB7XG4gICAgaWYgKHR5cGVvZiBkYXRhPy5hY3RpdmUgPT09ICdib29sZWFuJykge1xuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHsgc3RhdHVzOiA0MDAsIHN0YXR1c1RleHQ6ICdSZWNlaXZlZCBib29sZWFuIHZhbHVlIGZvciBhY3RpdmUgcHJvcGVydHknLCBib2R5OiB7IG1lc3NhZ2U6ICdQcm9wZXJ0eSBcImFjdGl2ZVwiIG11c3QgY29udGFpbiBzdHJpbmcgdmFsdWUuJyB9IH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycsIHR5cGUpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZVRyYWNraW5nVXBkYXRlKHJlcyBhcyBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSk7XG4gIH1cblxuICAvLyBJUHNcblxuICBnZXRJcHMoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogQVBJUmVzcG9uc2UpID0+IHJlc3BvbnNlPy5ib2R5Py5pdGVtcyk7XG4gIH1cblxuICBhc3NpZ25JcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBpcCB9KTtcbiAgfVxuXG4gIGRlbGV0ZUlwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJywgaXApKTtcbiAgfVxuXG4gIGxpbmtJcFBvb2woZG9tYWluOiBzdHJpbmcsIHBvb2xfaWQ6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBwb29sX2lkIH0pO1xuICB9XG5cbiAgdW5saW5rSXBQb2xsKGRvbWFpbjogc3RyaW5nLCByZXBsYWNlbWVudDogUmVwbGFjZW1lbnRGb3JQb29sKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGxldCBzZWFyY2hQYXJhbXMgPSAnJztcbiAgICBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCAmJiByZXBsYWNlbWVudC5pcCkge1xuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgc3RhdHVzVGV4dDogJ1RvbyBtdWNoIGRhdGEgZm9yIHJlcGxhY2VtZW50JyxcbiAgICAgICAgICBib2R5OiB7IG1lc3NhZ2U6ICdQbGVhc2Ugc3BlY2lmeSBlaXRoZXIgcG9vbF9pZCBvciBpcCAobm90IGJvdGgpJyB9XG4gICAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gYD9wb29sX2lkPSR7cmVwbGFjZW1lbnQucG9vbF9pZH1gO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/aXA9JHtyZXBsYWNlbWVudC5pcH1gO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsICdpcF9wb29sJywgc2VhcmNoUGFyYW1zKSk7XG4gIH1cblxuICB1cGRhdGVES0lNQXV0aG9yaXR5KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNQXV0aG9yaXR5SW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1BdXRob3JpdHk+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2RraW1fYXV0aG9yaXR5YCwge30sIHsgcXVlcnk6IGBzZWxmPSR7ZGF0YS5zZWxmfWAgfSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpXG4gICAgICAudGhlbigocmVzIDogVXBkYXRlZERLSU1BdXRob3JpdHlSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgVXBkYXRlZERLSU1BdXRob3JpdHkpO1xuICB9XG5cbiAgdXBkYXRlREtJTVNlbGVjdG9yKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNU2VsZWN0b3JJbmZvKTogUHJvbWlzZTxVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2RraW1fc2VsZWN0b3JgLCB7fSwgeyBxdWVyeTogYGRraW1fc2VsZWN0b3I9JHtkYXRhLmRraW1TZWxlY3Rvcn1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UpO1xuICB9XG5cbiAgdXBkYXRlV2ViUHJlZml4KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBXZWJQcmVmaXhJbmZvKTogUHJvbWlzZTxVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L3dlYl9wcmVmaXhgLCB7fSwgeyBxdWVyeTogYHdlYl9wcmVmaXg9JHtkYXRhLndlYlByZWZpeH1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgeyBBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BcGlSZXNwb25zZSc7XG5pbXBvcnQgeyBJRG9tYWluQ3JlZGVudGlhbHMgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuaW1wb3J0IHtcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEsXG4gIERvbWFpbkNyZWRlbnRpYWxzTGlzdCxcbiAgQ3JlYXRlZFVwZGF0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlLFxuICBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCxcbiAgRGVsZXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UsXG4gIERvbWFpbkNyZWRlbnRpYWxzUXVlcnksXG4gIERvbWFpbkNyZWRlbnRpYWxzLFxuICBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGltcGxlbWVudHMgSURvbWFpbkNyZWRlbnRpYWxzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2RvbWFpbnMvJztcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KFxuICAgIHJlc3BvbnNlOiBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YVxuICApOiBEb21haW5DcmVkZW50aWFsc0xpc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHRvdGFsQ291bnQ6IHJlc3BvbnNlLmJvZHkudG90YWxfY291bnRcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6IENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURlbGV0ZWRSZXNwb25zZShcbiAgICByZXNwb25zZTpEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICBzcGVjOiByZXNwb25zZS5ib2R5LnNwZWNcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluQ3JlZGVudGlhbHNRdWVyeSk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL2NyZWRlbnRpYWxzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChyZXMgYXMgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpbkNyZWRlbnRpYWxzXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmcsXG4gICAgZGF0YTogVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzLyR7Y3JlZGVudGlhbHNMb2dpbn1gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRGVsZXRlZFJlc3BvbnNlKHJlcykpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgeyBBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BcGlSZXNwb25zZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIElEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQsXG4gIElEb21haW5UYWdzQ2xpZW50XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBSZXNvbHV0aW9uIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHtcbiAgRG9tYWluVGFnc0l0ZW0sXG4gIERvbWFpblRhZ3NJdGVtSW5mbyxcbiAgRG9tYWluVGFnU3RhdGlzdGljSXRlbSxcbiAgRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlLFxuICBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSxcbiAgRG9tYWluVGFnc0xpc3QsXG4gIERvbWFpblRhZ3NSZXNwb25zZURhdGEsXG4gIERvbWFpblRhZ3NRdWVyeSxcbiAgRG9tYWluVGFnc01lc3NhZ2VSZXMsXG4gIERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSxcbiAgRG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ0NvdW50cmllc0FQSVJlc3BvbnNlLFxuICBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluVGFnIGltcGxlbWVudHMgRG9tYWluVGFnc0l0ZW0ge1xuICB0YWc6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgJ2ZpcnN0LXNlZW4nOiBEYXRlO1xuICAnbGFzdC1zZWVuJzogRGF0ZTtcblxuICBjb25zdHJ1Y3Rvcih0YWdJbmZvOiBEb21haW5UYWdzSXRlbUluZm8pIHtcbiAgICB0aGlzLnRhZyA9IHRhZ0luZm8udGFnO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YWdJbmZvLmRlc2NyaXB0aW9uO1xuICAgIHRoaXNbJ2ZpcnN0LXNlZW4nXSA9IG5ldyBEYXRlKHRhZ0luZm9bJ2ZpcnN0LXNlZW4nXSk7XG4gICAgdGhpc1snbGFzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydsYXN0LXNlZW4nXSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZ1N0YXRpc3RpYyBpbXBsZW1lbnRzIElEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQge1xuICB0YWc6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgc3RhcnQ6IERhdGU7XG4gIGVuZDogRGF0ZTtcbiAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgc3RhdHM6IERvbWFpblRhZ1N0YXRpc3RpY0l0ZW1bXTtcblxuICBjb25zdHJ1Y3Rvcih0YWdTdGF0aXN0aWNJbmZvOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2UpIHtcbiAgICB0aGlzLnRhZyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS50YWc7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXJ0KTtcbiAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5lbmQpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5yZXNvbHV0aW9uO1xuICAgIHRoaXMuc3RhdHMgPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0OiBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSkge1xuICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0LCB0aW1lOiBuZXcgRGF0ZShzdGF0LnRpbWUpIH07XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpblRhZ3NDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPERvbWFpblRhZ3NMaXN0PlxuICBpbXBsZW1lbnRzIElEb21haW5UYWdzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzLyc7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBEb21haW5UYWdzUmVzcG9uc2VEYXRhLFxuICApOiBEb21haW5UYWdzTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIERvbWFpblRhZ3NMaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgodGFnSW5mbzogRG9tYWluVGFnc0l0ZW1JbmZvKSA9PiBuZXcgRG9tYWluVGFnKHRhZ0luZm8pKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICd0YWcnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVGFnU3RhdGlzdGljKFxuICAgIHJlc3BvbnNlOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2VcbiAgKTogRG9tYWluVGFnU3RhdGlzdGljIHtcbiAgICByZXR1cm4gbmV3IERvbWFpblRhZ1N0YXRpc3RpYyhyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRhZ3NRdWVyeSk6IFByb21pc2U8RG9tYWluVGFnc0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycpLCBxdWVyeSk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRhZyhyZXMuYm9keSlcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSwgZGVzY3JpcHRpb24pXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzXG4gICAgICApO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L3RhZ3MvJHt0YWd9YClcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiAoXG4gICAgICAgIHtcbiAgICAgICAgICBtZXNzYWdlOiByZXMuYm9keS5tZXNzYWdlLFxuICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1c1xuICAgICAgICB9IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzKSk7XG4gIH1cblxuICBzdGF0aXN0aWMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBxdWVyeTogRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5KVxuICAgIDogUHJvbWlzZTxEb21haW5UYWdTdGF0aXN0aWM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZVRhZ1N0YXRpc3RpYyhyZXMpXG4gICAgICApO1xuICB9XG5cbiAgY291bnRyaWVzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvY291bnRyaWVzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgcHJvdmlkZXJzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvcHJvdmlkZXJzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgZGV2aWNlcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9kZXZpY2VzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgRG9tYWluVGVtcGxhdGVEYXRhLFxuICBEb21haW5UZW1wbGF0ZXNRdWVyeSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhLFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhLFxuICBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhLFxuICBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0LFxuICBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBOb3RpZmljYXRpb25BUElSZXNwb25zZSxcbiAgTm90aWZpY2F0aW9uUmVzdWx0LFxuICBTaG9ydFRlbXBsYXRlVmVyc2lvbixcbiAgVGVtcGxhdGVRdWVyeSxcbiAgVGVtcGxhdGVWZXJzaW9uLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UsXG4gIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHRcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBJRG9tYWluVGVtcGxhdGUsIElEb21haW5UZW1wbGF0ZXNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluVGVtcGxhdGVJdGVtIGltcGxlbWVudHMgSURvbWFpblRlbXBsYXRlIHtcbiAgbmFtZSA6IHN0cmluZztcbiAgZGVzY3JpcHRpb24gOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdCA6IERhdGUgfCAnJztcbiAgY3JlYXRlZEJ5IDogc3RyaW5nO1xuICBpZCA6IHN0cmluZztcbiAgdmVyc2lvbj86IFRlbXBsYXRlVmVyc2lvbjtcbiAgdmVyc2lvbnM/OiBTaG9ydFRlbXBsYXRlVmVyc2lvbltdO1xuXG4gIGNvbnN0cnVjdG9yKGRvbWFpblRlbXBsYXRlRnJvbUFQSTogSURvbWFpblRlbXBsYXRlKSB7XG4gICAgdGhpcy5uYW1lID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLm5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQgPyBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0KSA6ICcnO1xuICAgIHRoaXMuY3JlYXRlZEJ5ID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRCeTtcbiAgICB0aGlzLmlkID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmlkO1xuXG4gICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uKSB7XG4gICAgICB0aGlzLnZlcnNpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbjtcbiAgICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpIHtcbiAgICAgICAgdGhpcy52ZXJzaW9uLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucyAmJiBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnZlcnNpb25zID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLm1hcCgodmVyc2lvbikgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7IC4uLnZlcnNpb24gfTtcbiAgICAgICAgcmVzdWx0LmNyZWF0ZWRBdCA9IG5ldyBEYXRlKHZlcnNpb24uY3JlYXRlZEF0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5UZW1wbGF0ZXNDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ+XG4gIGltcGxlbWVudHMgSURvbWFpblRlbXBsYXRlc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNyZWF0aW9uUmVzcG9uc2UoZGF0YTogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSk6IERvbWFpblRlbXBsYXRlSXRlbSB7XG4gICAgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShcbiAgICBkYXRhOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZVxuICApOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge30gYXMgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkgJiYgZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGRhdGEuYm9keS50ZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTXV0YXRpb25SZXNwb25zZShcbiAgICBkYXRhOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2VcbiAgKTogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0ID0ge30gYXMgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKGRhdGE6IE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlKTogTm90aWZpY2F0aW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IE5vdGlmaWNhdGlvblJlc3VsdCA9IHt9IGFzIE5vdGlmaWNhdGlvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKFxuICAgIGRhdGE6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlXG4gICk6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7fSBhcyBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgcmVzdWx0LnRlbXBsYXRlVmVyc2lvbiA9IHsgdGFnOiBkYXRhLmJvZHkudGVtcGxhdGUudmVyc2lvbi50YWcgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QocmVzcG9uc2U6IExpc3REb21haW5UZW1wbGF0ZXNBUElSZXNwb25zZSk6IExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0O1xuXG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKChkOiBJRG9tYWluVGVtcGxhdGUpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZCkpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3AnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zKFxuICAgIHJlc3BvbnNlOiBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlXG4gICk6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQ7XG5cbiAgICBkYXRhLnRlbXBsYXRlID0gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXNwb25zZS5ib2R5LnRlbXBsYXRlKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwJyk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHF1ZXJ5PzogVGVtcGxhdGVRdWVyeSk6IFByb21pc2U8RG9tYWluVGVtcGxhdGVJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlcy5ib2R5LnRlbXBsYXRlKVxuICAgICAgKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZURhdGFcbiAgKTogUHJvbWlzZTxEb21haW5UZW1wbGF0ZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhXG4gICk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZyk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95QWxsKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxOb3RpZmljYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJykpXG4gICAgICAudGhlbigocmVzOiBOb3RpZmljYXRpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgY3JlYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIGRhdGEpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShyZXMpXG4gICAgICApO1xuICB9XG5cbiAgZ2V0VmVyc2lvbihkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UZW1wbGF0ZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpXG4gICAgICApO1xuICB9XG5cbiAgdXBkYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBkZXN0cm95VmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgLnRoZW4oKHJlczogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGxpc3RWZXJzaW9ucyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5XG4gICk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhyZXMpXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7XG4gIEV2ZW50c0xpc3QsXG4gIEV2ZW50c1F1ZXJ5LFxuICBFdmVudHNSZXNwb25zZSxcbn0gZnJvbSAnLi4vVHlwZXMvRXZlbnRzJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50Q2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxFdmVudHNMaXN0PiB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBFdmVudHNSZXNwb25zZSxcbiAgKTogRXZlbnRzTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIEV2ZW50c0xpc3Q7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJy8nKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGdldChkb21haW46IHN0cmluZywgcXVlcnk/OiBFdmVudHNRdWVyeSkgOiBQcm9taXNlPEV2ZW50c0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKCcvdjMnLCBkb21haW4sICdldmVudHMnKSwgcXVlcnkpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBJcFBvb2xDcmVhdGVEYXRhLFxuICBJcFBvb2xDcmVhdGVSZXNwb25zZSxcbiAgSXBQb29sQ3JlYXRlUmVzdWx0LFxuICBJcFBvb2xEZWxldGVEYXRhLFxuICBJcFBvb2xMaXN0UmVzcG9uc2UsXG4gIElwUG9vbExpc3RSZXN1bHQsXG4gIElwUG9vbE1lc3NhZ2VSZXNwb25zZSxcbiAgSXBQb29sTWVzc2FnZVJlc3VsdCxcbiAgSXBQb29sVXBkYXRlRGF0YSxcbn0gZnJvbSAnLi4vVHlwZXMvSVBQb29scyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElwUG9vbHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdCgpOiBQcm9taXNlPElwUG9vbExpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YxL2lwX3Bvb2xzJylcbiAgICAgIC50aGVuKChyZXNwb25zZTogSXBQb29sTGlzdFJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlSXBQb29sc1Jlc3BvbnNlKHJlc3BvbnNlKSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoZGF0YTogSXBQb29sQ3JlYXRlRGF0YSk6IFByb21pc2U8SXBQb29sQ3JlYXRlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IElwUG9vbENyZWF0ZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92MS9pcF9wb29scycsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xVcGRhdGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IElwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wYXRjaFdpdGhGRChgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xEZWxldGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6SXBQb29sTWVzc2FnZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZTogSXBQb29sTGlzdFJlc3BvbnNlKTogSXBQb29sTGlzdFJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCBNZ1JlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJcERhdGEsIElwc0xpc3RSZXNwb25zZUJvZHkgfSBmcm9tICcuLi9UeXBlcy9JUHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcHNDbGllbnQge1xuICByZXF1ZXN0OiBNZ1JlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogTWdSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk6IGFueSk6IFByb21pc2U8SXBzTGlzdFJlc3BvbnNlQm9keT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2lwcycsIHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlPElwc0xpc3RSZXNwb25zZUJvZHk+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGdldChpcDogc3RyaW5nKTogUHJvbWlzZTxJcERhdGE+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92My9pcHMvJHtpcH1gKTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlPElwRGF0YT4ocmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUlwc1Jlc3BvbnNlPFQ+KHJlc3BvbnNlOiB7IGJvZHk6IFQgfSk6IFQge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgTWFpbGd1bkNsaWVudE9wdGlvbnMgfSBmcm9tICcuLi9UeXBlcy9NYWlsZ3VuQ2xpZW50JztcblxuaW1wb3J0IERvbWFpbkNsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWlucyc7XG5pbXBvcnQgRXZlbnRDbGllbnQgZnJvbSAnLi9FdmVudHMnO1xuaW1wb3J0IFN0YXRzQ2xpZW50IGZyb20gJy4vU3RhdHMvU3RhdHNDbGllbnQnO1xuaW1wb3J0IFN1cHByZXNzaW9uQ2xpZW50IGZyb20gJy4vU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uc0NsaWVudCc7XG5pbXBvcnQgV2ViaG9va3NDbGllbnQgZnJvbSAnLi9XZWJob29rcyc7XG5pbXBvcnQgTWVzc2FnZXNDbGllbnQgZnJvbSAnLi9NZXNzYWdlcyc7XG5pbXBvcnQgUm91dGVzQ2xpZW50IGZyb20gJy4vUm91dGVzJztcbmltcG9ydCBWYWxpZGF0ZUNsaWVudCBmcm9tICcuL1ZhbGlkYXRpb25zL3ZhbGlkYXRlJztcbmltcG9ydCBJcHNDbGllbnQgZnJvbSAnLi9JUHMnO1xuaW1wb3J0IElwUG9vbHNDbGllbnQgZnJvbSAnLi9JUFBvb2xzJztcbmltcG9ydCBMaXN0c0NsaWVudCBmcm9tICcuL01haWxpbmdMaXN0cy9tYWlsaW5nTGlzdHMnO1xuaW1wb3J0IE1haWxMaXN0c01lbWJlcnMgZnJvbSAnLi9NYWlsaW5nTGlzdHMvbWFpbExpc3RNZW1iZXJzJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi4vVHlwZXMvQ29tbW9uJztcbmltcG9ydCBEb21haW5DcmVkZW50aWFsc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc0NyZWRlbnRpYWxzJztcbmltcG9ydCBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgZnJvbSAnLi9WYWxpZGF0aW9ucy9tdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc1RlbXBsYXRlcyc7XG5pbXBvcnQgRG9tYWluVGFnc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc1RhZ3MnO1xuaW1wb3J0IHsgSU1haWxndW5DbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzL01haWxndW5DbGllbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsZ3VuQ2xpZW50IGltcGxlbWVudHMgSU1haWxndW5DbGllbnQge1xuICBwcml2YXRlIHJlcXVlc3Q7XG5cbiAgcHVibGljIGRvbWFpbnM7XG4gIHB1YmxpYyB3ZWJob29rcztcbiAgcHVibGljIGV2ZW50cztcbiAgcHVibGljIHN0YXRzO1xuICBwdWJsaWMgc3VwcHJlc3Npb25zO1xuICBwdWJsaWMgbWVzc2FnZXM7XG4gIHB1YmxpYyByb3V0ZXM7XG4gIHB1YmxpYyB2YWxpZGF0ZTtcbiAgcHVibGljIGlwcztcbiAgcHVibGljIGlwX3Bvb2xzO1xuICBwdWJsaWMgbGlzdHM7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTWFpbGd1bkNsaWVudE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgY29uc3QgY29uZmlnOiBSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub3B0aW9ucyB9IGFzIFJlcXVlc3RPcHRpb25zO1xuXG4gICAgaWYgKCFjb25maWcudXJsKSB7XG4gICAgICBjb25maWcudXJsID0gJ2h0dHBzOi8vYXBpLm1haWxndW4ubmV0JztcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy51c2VybmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJ1c2VybmFtZVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcua2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcImtleVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHRoaXMucmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGNvbmZpZywgZm9ybURhdGEpO1xuICAgIGNvbnN0IG1haWxMaXN0c01lbWJlcnMgPSBuZXcgTWFpbExpc3RzTWVtYmVycyh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50ID0gbmV3IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluVGVtcGxhdGVzQ2xpZW50ID0gbmV3IERvbWFpblRlbXBsYXRlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpblRhZ3NDbGllbnQgPSBuZXcgRG9tYWluVGFnc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCA9IG5ldyBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcblxuICAgIHRoaXMuZG9tYWlucyA9IG5ldyBEb21haW5DbGllbnQoXG4gICAgICB0aGlzLnJlcXVlc3QsXG4gICAgICBkb21haW5DcmVkZW50aWFsc0NsaWVudCxcbiAgICAgIGRvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgICAgIGRvbWFpblRhZ3NDbGllbnRcbiAgICApO1xuICAgIHRoaXMud2ViaG9va3MgPSBuZXcgV2ViaG9va3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudENsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnN1cHByZXNzaW9ucyA9IG5ldyBTdXBwcmVzc2lvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMubWVzc2FnZXMgPSBuZXcgTWVzc2FnZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnJvdXRlcyA9IG5ldyBSb3V0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmlwcyA9IG5ldyBJcHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmlwX3Bvb2xzID0gbmV3IElwUG9vbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmxpc3RzID0gbmV3IExpc3RzQ2xpZW50KHRoaXMucmVxdWVzdCwgbWFpbExpc3RzTWVtYmVycyk7XG4gICAgdGhpcy52YWxpZGF0ZSA9IG5ldyBWYWxpZGF0ZUNsaWVudCh0aGlzLnJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7XG4gIE1haWxMaXN0TWVtYmVyc1F1ZXJ5LFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMsXG4gIE1haWxMaXN0TWVtYmVyLFxuICBNdWx0aXBsZU1lbWJlcnNEYXRhLFxuICBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhLFxuICBEZWxldGVkTWVtYmVyLFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXEsXG4gIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlLFxuICBNYWlsTGlzdE1lbWJlcnNSZXN1bHQsXG4gIE1haWxMaXN0TWVtYmVyc1Jlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL01haWxpbmdMaXN0cyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvTWFpbGluZ0xpc3RzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbExpc3RzTWVtYmVyc1xuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8TWFpbExpc3RNZW1iZXJzUmVzdWx0PlxuICBpbXBsZW1lbnRzIElNYWlsTGlzdHNNZW1iZXJzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycykge1xuICAgIGNvbnN0IG5ld0RhdGEgPSB7IC4uLmRhdGEgfTtcblxuICAgIGlmICh0eXBlb2YgZGF0YS52YXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbmV3RGF0YS52YXJzID0gSlNPTi5zdHJpbmdpZnkobmV3RGF0YS52YXJzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEuc3Vic2NyaWJlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBuZXdEYXRhLnN1YnNjcmliZWQgPSBkYXRhLnN1YnNjcmliZWQgPyAneWVzJyA6ICdubyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld0RhdGEgYXMgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzUmVxO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogTWFpbExpc3RNZW1iZXJzUmVzcG9uc2UsXG4gICk6IE1haWxMaXN0TWVtYmVyc1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIE1haWxMaXN0TWVtYmVyc1Jlc3VsdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0TWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBxdWVyeT86IE1haWxMaXN0TWVtYmVyc1F1ZXJ5XG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXJzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzL3BhZ2VzYCwgcXVlcnkpO1xuICB9XG5cbiAgZ2V0TWVtYmVyKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgY3JlYXRlTWVtYmVyKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1xuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgY29uc3QgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnNgLCByZXFEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBjcmVhdGVNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlTWVtYmVyc0RhdGFcbiAgKTogUHJvbWlzZTxOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZT4ge1xuICAgIGNvbnN0IG5ld0RhdGE6IE11bHRpcGxlTWVtYmVyc1JlcURhdGEgPSB7XG4gICAgICBtZW1iZXJzOiBBcnJheS5pc0FycmF5KGRhdGEubWVtYmVycykgPyBKU09OLnN0cmluZ2lmeShkYXRhLm1lbWJlcnMpIDogZGF0YS5tZW1iZXJzLFxuICAgICAgdXBzZXJ0OiBkYXRhLnVwc2VydFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLmpzb25gLCBuZXdEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YCwgcmVxRGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgZGVzdHJveU1lbWJlcihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcpIDogUHJvbWlzZTxEZWxldGVkTWVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgRGVsZXRlZE1lbWJlcik7XG4gIH1cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7XG4gIExpc3RzUXVlcnksXG4gIENyZWF0ZVVwZGF0ZUxpc3QsXG4gIERlc3Ryb3llZExpc3QsXG4gIE1haWxpbmdMaXN0LFxuICBNYWlsaW5nTGlzdFZhbGlkYXRpb25BcGlSZXNwb25zZSxcbiAgU3RhcnRWYWxpZGF0aW9uUmVzdWx0LFxuICBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQsXG4gIE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdCxcbiAgTWFpbGluZ0xpc3RSZXN1bHQsXG4gIE1haWxpbmdMaXN0QXBpUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvTWFpbGluZ0xpc3RzJztcbmltcG9ydCB7IElNYWlsTGlzdHNNZW1iZXJzIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RNZW1iZXJzJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdHNDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPE1haWxpbmdMaXN0UmVzdWx0PiB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBtZW1iZXJzOiBJTWFpbExpc3RzTWVtYmVycztcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBtZW1iZXJzOklNYWlsTGlzdHNNZW1iZXJzKSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgIHRoaXMubWVtYmVycyA9IG1lbWJlcnM7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlVmFsaWRhdGlvblJlc3VsdChcbiAgICBzdGF0dXM6IG51bWJlcixcbiAgICBkYXRhOiBNYWlsaW5nTGlzdFZhbGlkYXRpb25BcGlSZXNwb25zZVxuICApOiBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICB2YWxpZGF0aW9uUmVzdWx0OiB7XG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCAqIDEwMDApIC8vIGFkZCBtaWxsaXNlY29uZCB0byBVbml4IHRpbWVzdGFtcFxuICAgICAgfVxuICAgIH0gYXMgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogTWFpbGluZ0xpc3RBcGlSZXNwb25zZSk6IE1haWxpbmdMaXN0UmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTWFpbGluZ0xpc3RSZXN1bHQ7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk/OiBMaXN0c1F1ZXJ5KTogUHJvbWlzZTxNYWlsaW5nTGlzdFJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKGAke3RoaXMuYmFzZVJvdXRlfS9wYWdlc2AsIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh0aGlzLmJhc2VSb3V0ZSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIHVwZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGRlc3Ryb3kobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3llZExpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBEZXN0cm95ZWRMaXN0KTtcbiAgfVxuXG4gIHZhbGlkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxTdGFydFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWAsIHt9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgICAgfSkgYXMgU3RhcnRWYWxpZGF0aW9uUmVzdWx0KTtcbiAgfVxuXG4gIHZhbGlkYXRpb25SZXN1bHQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXNwb25zZSkgPT4gdGhpcy5wYXJzZVZhbGlkYXRpb25SZXN1bHQoXG4gICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICByZXNwb25zZS5ib2R5IGFzIE1haWxpbmdMaXN0VmFsaWRhdGlvbkFwaVJlc3BvbnNlXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBjYW5jZWxWYWxpZGF0aW9uKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gKHtcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgICAgfSBhcyBNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQpKTtcbiAgfVxufVxuIiwiaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vY29tbW9uL0Vycm9yJztcbmltcG9ydCB7IEFQSUVycm9yT3B0aW9ucyB9IGZyb20gJy4uL1R5cGVzL0NvbW1vbic7XG5pbXBvcnQge1xuICBNYWlsZ3VuTWVzc2FnZURhdGEsXG4gIE1lc3NhZ2VzU2VuZEFQSVJlc3BvbnNlLFxuICBNZXNzYWdlc1NlbmRSZXN1bHRcbn0gZnJvbSAnLi4vVHlwZXMvTWVzc2FnZXMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZUJvb2xlYW5WYWx1ZXMoZGF0YTogTWFpbGd1bk1lc3NhZ2VEYXRhKTogTWFpbGd1bk1lc3NhZ2VEYXRhIHtcbiAgICBjb25zdCB5ZXNOb1Byb3BlcnRpZXMgPSBuZXcgU2V0KFtcbiAgICAgICdvOnRlc3Rtb2RlJyxcbiAgICAgICd0OnRleHQnLFxuICAgICAgJ286ZGtpbScsXG4gICAgICAnbzp0cmFja2luZycsXG4gICAgICAnbzp0cmFja2luZy1jbGlja3MnLFxuICAgICAgJ286dHJhY2tpbmctb3BlbnMnLFxuICAgICAgJ286cmVxdWlyZS10bHMnLFxuICAgICAgJ286c2tpcC12ZXJpZmljYXRpb24nXG4gICAgXSk7XG5cbiAgICBpZiAoIWRhdGEgfHwgT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgbWVzc2FnZTogJ01lc3NhZ2UgZGF0YSBvYmplY3QgY2FuIG5vdCBiZSBlbXB0eSdcbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGlmICh5ZXNOb1Byb3BlcnRpZXMuaGFzKGtleSkgJiYgdHlwZW9mIGRhdGFba2V5XSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldID8gJ3llcycgOiAnbm8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjW2tleV0gPSBkYXRhW2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9IGFzIE1haWxndW5NZXNzYWdlRGF0YSk7XG4gIH1cblxuICBfcGFyc2VSZXNwb25zZShyZXNwb25zZTogTWVzc2FnZXNTZW5kQVBJUmVzcG9uc2UpOiBNZXNzYWdlc1NlbmRSZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBNYWlsZ3VuTWVzc2FnZURhdGEpOiBQcm9taXNlPE1lc3NhZ2VzU2VuZFJlc3VsdD4ge1xuICAgIGlmIChkYXRhLm1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3YzLyR7ZG9tYWlufS9tZXNzYWdlcy5taW1lYCwgZGF0YSlcbiAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kaWZpZWREYXRhID0gdGhpcy5wcmVwYXJlQm9vbGVhblZhbHVlcyhkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92My8ke2RvbWFpbn0vbWVzc2FnZXNgLCBtb2RpZmllZERhdGEpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ3JlYXRlVXBkYXRlUm91dGVEYXRhLCBEZXN0cm95Um91dGVSZXNwb25zZSwgUm91dGUsIFJvdXRlc0xpc3RRdWVyeSwgVXBkYXRlUm91dGVSZXNwb25zZVxufSBmcm9tICcuLi9UeXBlcy9Sb3V0ZXMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KHF1ZXJ5OiBSb3V0ZXNMaXN0UXVlcnkpOiBQcm9taXNlPFJvdXRlW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3JvdXRlcycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lml0ZW1zKTtcbiAgfVxuXG4gIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxSb3V0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5yb3V0ZSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxSb3V0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YzL3JvdXRlcycsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8VXBkYXRlUm91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAvdjMvcm91dGVzLyR7aWR9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cblxuICBkZXN0cm95KGlkOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3lSb3V0ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92My9yb3V0ZXMvJHtpZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgU3RhdHNRdWVyeSwgU3RhdHNPcHRpb25zIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3RhdHMnO1xuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvQ29tbW9uJztcbmltcG9ydCBTdGF0c0NvbnRhaW5lciBmcm9tICcuL1N0YXRzQ29udGFpbmVyJztcbmltcG9ydCB7IElTdGF0c0NsaWVudCwgSVN0YXRzQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdGF0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQ2xpZW50IGltcGxlbWVudHMgSVN0YXRzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHJpdmF0ZSBsb2dnZXI6IElMb2dnZXI7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbG9nZ2VyOiBJTG9nZ2VyID0gY29uc29sZSkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnREYXRlVG9VVEMoa2V5OnN0cmluZywgaW5wdXREYXRlOiBEYXRlKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgLypcbiAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICBhbmQgYmVjYXVzZSBmb3IgQVBJLCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGRhdGUgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdFxuICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICovXG4gICAgdGhpcy5sb2dnZXIud2FybihgRGF0ZTpcIiR7aW5wdXREYXRlfVwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxuVmFsdWUgXCIke2lucHV0RGF0ZS50b1VUQ1N0cmluZygpfVwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cbkNvbnNpZGVyIHVzaW5nIHN0aW5nIHR5cGUgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nYCk7XG4gICAgcmV0dXJuIFtrZXksIGlucHV0RGF0ZS50b1VUQ1N0cmluZygpXTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeTogU3RhdHNRdWVyeSB8IHVuZGVmaW5lZCk6IEFycmF5PEFycmF5PHN0cmluZz4+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gW10gYXMgQXJyYXk8QXJyYXk8c3RyaW5nPj47XG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gT2JqZWN0LmVudHJpZXMocXVlcnkpLnJlZHVjZSgoYXJyYXlXaXRoUGFpcnMsIGN1cnJlbnRQYWlyKSA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGN1cnJlbnRQYWlyO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGgpIHsgLy8gZXZlbnQ6IFsnZGVsaXZlcmVkJywgJ2FjY2VwdGVkJ11cbiAgICAgICAgICBjb25zdCByZXBlYXRlZFByb3BlcnR5ID0gdmFsdWUubWFwKChpdGVtKSA9PiBba2V5LCBpdGVtXSk7XG4gICAgICAgICAgcmV0dXJuIFsuLi5hcnJheVdpdGhQYWlycywgLi4ucmVwZWF0ZWRQcm9wZXJ0eV07IC8vIFtbZXZlbnQsZGVsaXZlcmVkXSwgW2V2ZW50LGFjY2VwdGVkXV1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKHRoaXMuY29udmVydERhdGVUb1VUQyhrZXksIHZhbHVlKSk7XG4gICAgICAgICAgcmV0dXJuIGFycmF5V2l0aFBhaXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJyYXlXaXRoUGFpcnM7XG4gICAgICB9LCBbXSBhcyBBcnJheTxBcnJheTxzdHJpbmc+Pik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlYXJjaFBhcmFtcztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VTdGF0cyhyZXNwb25zZTogeyBib2R5OiBTdGF0c09wdGlvbnMgfSk6IElTdGF0c0NvbnRhaW5lciB7XG4gICAgcmV0dXJuIG5ldyBTdGF0c0NvbnRhaW5lcihyZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGdldERvbWFpbihkb21haW46IHN0cmluZywgcXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxJU3RhdHNDb250YWluZXI+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ3N0YXRzL3RvdGFsJyksIHNlYXJjaFBhcmFtcylcbiAgICAgIC50aGVuKHRoaXMucGFyc2VTdGF0cyk7XG4gIH1cblxuICBnZXRBY2NvdW50KHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8SVN0YXRzQ29udGFpbmVyPiB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3N0YXRzL3RvdGFsJywgc2VhcmNoUGFyYW1zKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZVN0YXRzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVN0YXRzQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdGF0cyc7XG5pbXBvcnQgeyBTdGF0LCBTdGF0c09wdGlvbnMgfSBmcm9tICcuLi8uLi9UeXBlcy9TdGF0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQ29udGFpbmVyIGltcGxlbWVudHMgSVN0YXRzQ29udGFpbmVyIHtcbiAgICBzdGFydDogRGF0ZTtcbiAgICBlbmQ6IERhdGU7XG4gICAgcmVzb2x1dGlvbjogc3RyaW5nO1xuICAgIHN0YXRzOiBTdGF0W107XG4gICAgY29uc3RydWN0b3IoZGF0YTogU3RhdHNPcHRpb25zKSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoZGF0YS5zdGFydCk7XG4gICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKGRhdGEuZW5kKTtcbiAgICAgIHRoaXMucmVzb2x1dGlvbiA9IGRhdGEucmVzb2x1dGlvbjtcbiAgICAgIHRoaXMuc3RhdHMgPSBkYXRhLnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdDogU3RhdCkge1xuICAgICAgICBjb25zdCByZXMgPSB7IC4uLnN0YXQgfTtcbiAgICAgICAgcmVzLnRpbWUgPSBuZXcgRGF0ZShzdGF0LnRpbWUpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJQm91bmNlIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgQm91bmNlRGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvdW5jZSBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSUJvdW5jZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBCb3VuY2VEYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5CT1VOQ0VTKTtcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgIHRoaXMuY29kZSA9ICtkYXRhLmNvZGU7XG4gICAgICB0aGlzLmVycm9yID0gZGF0YS5lcnJvcjtcbiAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJQ29tcGxhaW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgQ29tcGxhaW50RGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBsYWludCBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSUNvbXBsYWludCB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG4gICAgY29uc3RydWN0b3IoZGF0YTogQ29tcGxhaW50RGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuQ09NUExBSU5UUyk7XG4gICAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBwcmVzc2lvbiB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKHR5cGU6IFN1cHByZXNzaW9uTW9kZWxzKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvcic7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgQm91bmNlIGZyb20gJy4vQm91bmNlJztcbmltcG9ydCBDb21wbGFpbnQgZnJvbSAnLi9Db21wbGFpbnQnO1xuaW1wb3J0IFVuc3Vic2NyaWJlIGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuaW1wb3J0IFdoaXRlTGlzdCBmcm9tICcuL1doaXRlTGlzdCc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5pbXBvcnQge1xuICBJQm91bmNlLFxuICBJQ29tcGxhaW50LFxuICBJVW5zdWJzY3JpYmUsXG4gIElXaGl0ZUxpc3Rcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHtcbiAgU3VwcHJlc3Npb25MaXN0LFxuICBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSxcbiAgU3VwcHJlc3Npb25EYXRhVHlwZSxcbiAgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSxcbiAgU3VwcHJlc3Npb25MaXN0UXVlcnksXG4gIFN1cHByZXNzaW9uUmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdCxcbiAgU3VwcHJlc3Npb25EZXN0cm95UmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IEFQSUVycm9yT3B0aW9ucyB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5cbmNvbnN0IGNyZWF0ZU9wdGlvbnMgPSB7XG4gIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBwcmVzc2lvbkNsaWVudCBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8U3VwcHJlc3Npb25MaXN0PiB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIG1vZGVsczogTWFwPHN0cmluZywgYW55PjtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLm1vZGVscyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLm1vZGVscy5zZXQoJ2JvdW5jZXMnLCBCb3VuY2UpO1xuICAgIHRoaXMubW9kZWxzLnNldCgnY29tcGxhaW50cycsIENvbXBsYWludCk7XG4gICAgdGhpcy5tb2RlbHMuc2V0KCd1bnN1YnNjcmliZXMnLCBVbnN1YnNjcmliZSk7XG4gICAgdGhpcy5tb2RlbHMuc2V0KCd3aGl0ZWxpc3RzJywgV2hpdGVMaXN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YTogU3VwcHJlc3Npb25EYXRhVHlwZSk6XG4gICAgICBJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3RcbiAgICB9XG4gICk6IFN1cHByZXNzaW9uTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIFN1cHByZXNzaW9uTGlzdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoKGl0ZW0pID0+IG5ldyBNb2RlbChpdGVtKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgX3BhcnNlSXRlbTxUIGV4dGVuZHMgU3VwcHJlc3Npb24+KFxuICAgIGRhdGEgOiBTdXBwcmVzc2lvbkRhdGFUeXBlLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YVR5cGU6IFN1cHByZXNzaW9uRGF0YVR5cGUpOlRcbiAgICB9XG4gICk6IFQge1xuICAgIHJldHVybiBuZXcgTW9kZWwoZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVdoaXRlTGlzdChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW11cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBzdGF0dXNUZXh0OiAnRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0JyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG1lc3NhZ2U6ICdXaGl0ZWxpc3RcXCdzIGNyZWF0aW9uIHByb2Nlc3MgZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBjcmVhdGlvbnMuIERhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCdcbiAgICAgICAgfVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdFdpdGhGRCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3doaXRlbGlzdHMnKSwgZGF0YSlcbiAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tUeXBlKHR5cGU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5tb2RlbHMuaGFzKHR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgc3RhdHVzVGV4dDogJ1Vua25vd24gdHlwZSB2YWx1ZScsXG4gICAgICAgIGJvZHk6IHsgbWVzc2FnZTogJ1R5cGUgbWF5IGJlIG9ubHkgb25lIG9mIFtib3VuY2VzLCBjb21wbGFpbnRzLCB1bnN1YnNjcmliZXMsIHdoaXRlbGlzdHNdJyB9XG4gICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUmVzcG9uc2UocmVzcG9uc2U6IFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSk6IFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICB0eXBlOiByZXNwb25zZS5ib2R5LnR5cGUgfHwgJycsXG4gICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIHF1ZXJ5PzogU3VwcHJlc3Npb25MaXN0UXVlcnlcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkxpc3Q+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxzLmdldCh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIHF1ZXJ5LCBtb2RlbCk7XG4gIH1cblxuICBnZXQoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPEJvdW5jZSB8IENvbXBsYWludCB8IFVuc3Vic2NyaWJlIHwgV2hpdGVMaXN0PiB7XG4gICAgdGhpcy5jaGVja1R5cGUodHlwZSk7XG5cbiAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxzLmdldCh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAuZ2V0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBTdXBwcmVzc2lvblJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZUl0ZW08dHlwZW9mIG1vZGVsPihyZXNwb25zZS5ib2R5LCBtb2RlbCkpO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW11cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgdGhpcy5jaGVja1R5cGUodHlwZSk7XG4gICAgLy8gc3VwcG9ydHMgYWRkaW5nIG11bHRpcGxlIHN1cHByZXNzaW9ucyBieSBkZWZhdWx0XG4gICAgbGV0IHBvc3REYXRhO1xuICAgIGlmICh0eXBlID09PSAnd2hpdGVsaXN0cycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVdoaXRlTGlzdChkb21haW4sIGRhdGEpO1xuICAgIH1cblxuICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgcG9zdERhdGEgPSBbZGF0YV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc3REYXRhID0gWy4uLmRhdGFdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlKSwgSlNPTi5zdHJpbmdpZnkocG9zdERhdGEpLCBjcmVhdGVPcHRpb25zKVxuICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25EZXN0cm95UmVzdWx0PiB7XG4gICAgdGhpcy5jaGVja1R5cGUodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLmRlbGV0ZSh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSwgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogU3VwcHJlc3Npb25EZXN0cm95UmVzcG9uc2UpID0+ICh7XG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgICAgdmFsdWU6IHJlc3BvbnNlLmJvZHkudmFsdWUgfHwgJycsXG4gICAgICAgIGFkZHJlc3M6IHJlc3BvbnNlLmJvZHkuYWRkcmVzcyB8fCAnJyxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICAgIH0pKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN1cHByZXNzaW9uQ2xpZW50O1xuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJVW5zdWJzY3JpYmUgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBVbnN1YnNjcmliZURhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuXG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuc3Vic2NyaWJlIGV4dGVuZHMgU3VwcHJlc3Npb24gaW1wbGVtZW50cyBJVW5zdWJzY3JpYmUge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICB0YWdzOiBzdHJpbmdbXTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogVW5zdWJzY3JpYmVEYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5VTlNVQlNDUklCRVMpO1xuICAgICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgdGhpcy50YWdzID0gZGF0YS50YWdzO1xuICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IElXaGl0ZUxpc3QgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBXaGl0ZUxpc3REYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2hpdGVMaXN0IGV4dGVuZHMgU3VwcHJlc3Npb24gaW1wbGVtZW50cyBJV2hpdGVMaXN0IHtcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIHJlYXNvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFdoaXRlTGlzdERhdGEpIHtcbiAgICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLldISVRFTElTVFMpO1xuICAgICAgdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgICB0aGlzLnJlYXNvbiA9IGRhdGEucmVhc29uO1xuICAgICAgdGhpcy5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRBdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQge1xuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHQsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYkRhdGEsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0LFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3BvbnNlLFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFF1ZXJ5LFxuICBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGEsXG4gIENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVVwZGF0ZWQsXG4gIENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iXG59IGZyb20gJy4uLy4uL1R5cGVzL1ZhbGlkYXRpb25zL011bHRpcGxlVmFsaWRhdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZVZhbGlkYXRpb25Kb2IgaW1wbGVtZW50cyBNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHQge1xuICBjcmVhdGVkQXQ6IERhdGU7XG4gIGlkOiBzdHJpbmc7XG4gIHF1YW50aXR5OiBudW1iZXJcbiAgcmVjb3Jkc1Byb2Nlc3NlZDogbnVtYmVyIHwgbnVsbDtcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIGRvd25sb2FkVXJsPzoge1xuICAgIGNzdjogc3RyaW5nO1xuICAgIGpzb246IHN0cmluZztcbiAgfTtcblxuICByZXNwb25zZVN0YXR1c0NvZGU6IG51bWJlcjtcbiAgc3VtbWFyeT86IHtcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICAgIGNhdGNoQWxsOiBudW1iZXI7XG4gICAgICAgICAgZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICBkb05vdFNlbmQ6IG51bWJlcjtcbiAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgfTtcbiAgICAgIHJpc2s6IHtcbiAgICAgICAgICBoaWdoOiBudW1iZXI7XG4gICAgICAgICAgbG93OiBudW1iZXI7XG4gICAgICAgICAgbWVkaXVtOiBudW1iZXI7XG4gICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uSm9iRGF0YSwgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXIpIHtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgdGhpcy5xdWFudGl0eSA9IGRhdGEucXVhbnRpdHk7XG4gICAgdGhpcy5yZWNvcmRzUHJvY2Vzc2VkID0gZGF0YS5yZWNvcmRzX3Byb2Nlc3NlZDtcbiAgICB0aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHRoaXMucmVzcG9uc2VTdGF0dXNDb2RlID0gcmVzcG9uc2VTdGF0dXNDb2RlO1xuICAgIGlmIChkYXRhLmRvd25sb2FkX3VybCkge1xuICAgICAgdGhpcy5kb3dubG9hZFVybCA9IHtcbiAgICAgICAgY3N2OiBkYXRhLmRvd25sb2FkX3VybD8uY3N2LFxuICAgICAgICBqc29uOiBkYXRhLmRvd25sb2FkX3VybD8uanNvblxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKGRhdGEuc3VtbWFyeSkge1xuICAgICAgdGhpcy5zdW1tYXJ5ID0ge1xuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICBjYXRjaEFsbDogZGF0YS5zdW1tYXJ5LnJlc3VsdC5jYXRjaF9hbGwsXG4gICAgICAgICAgZGVsaXZlcmFibGU6IGRhdGEuc3VtbWFyeS5yZXN1bHQuZGVsaXZlcmFibGUsXG4gICAgICAgICAgZG9Ob3RTZW5kOiBkYXRhLnN1bW1hcnkucmVzdWx0LmRvX25vdF9zZW5kLFxuICAgICAgICAgIHVuZGVsaXZlcmFibGU6IGRhdGEuc3VtbWFyeS5yZXN1bHQudW5kZWxpdmVyYWJsZSxcbiAgICAgICAgICB1bmtub3duOiBkYXRhLnN1bW1hcnkucmVzdWx0LnVua25vd25cbiAgICAgICAgfSxcbiAgICAgICAgcmlzazoge1xuICAgICAgICAgIGhpZ2g6IGRhdGEuc3VtbWFyeS5yaXNrLmhpZ2gsXG4gICAgICAgICAgbG93OiBkYXRhLnN1bW1hcnkucmlzay5sb3csXG4gICAgICAgICAgbWVkaXVtOiBkYXRhLnN1bW1hcnkucmlzay5tZWRpdW0sXG4gICAgICAgICAgdW5rbm93bjogZGF0YS5zdW1tYXJ5LnJpc2sudW5rbm93blxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PlxuICBpbXBsZW1lbnRzIElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVJlc3BvbnNlPFQ+KHJlc3BvbnNlOiBBUElSZXNwb25zZSk6IFQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlPy5ib2R5XG4gICAgfSBhcyBUO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXNwb25zZSlcbiAgICA6IE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ7XG5cbiAgICBkYXRhLmpvYnMgPSByZXNwb25zZS5ib2R5LmpvYnMubWFwKChqb2IpID0+IG5ldyBNdWx0aXBsZVZhbGlkYXRpb25Kb2Ioam9iLCByZXNwb25zZS5zdGF0dXMpKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwaXZvdCcpO1xuICAgIGRhdGEudG90YWwgPSByZXNwb25zZS5ib2R5LnRvdGFsO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5PzogTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeSk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcygnL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsaycsIHF1ZXJ5KTtcbiAgfVxuXG4gIGFzeW5jIGdldChsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWApO1xuICAgIHJldHVybiBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uSm9iKHJlc3BvbnNlLmJvZHksIHJlc3BvbnNlLnN0YXR1cyk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoXG4gICAgbGlzdElkOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IG11bHRpcGxlVmFsaWRhdGlvbkRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVVwZGF0ZWQgPSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiB7XG4gICAgICAgIC4uLmRhdGE/LmZpbGVcbiAgICAgIH0sXG4gICAgICAuLi5kYXRhXG4gICAgfTtcbiAgICBkZWxldGUgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YS5maWxlO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvJHtsaXN0SWR9YCwgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2U8Q3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgZGVzdHJveShsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8Q2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5kZWxldGUoYC92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvJHtsaXN0SWR9YCk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2U8Q2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+KHJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVZhbGlkYXRlQ2xpZW50LCBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uUXVlcnksIFZhbGlkYXRpb25SZXN1bHQsIFZhbGlkYXRpb25SZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL1ZhbGlkYXRpb25zJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdGVDbGllbnQgaW1wbGVtZW50cyBJVmFsaWRhdGVDbGllbnQge1xuICBwdWJsaWMgbXVsdGlwbGVWYWxpZGF0aW9uO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDogSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5tdWx0aXBsZVZhbGlkYXRpb24gPSBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ7XG4gIH1cblxuICBhc3luYyBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgY29uc3QgcXVlcnk6IFZhbGlkYXRpb25RdWVyeSA9IHsgYWRkcmVzcyB9O1xuICAgIGNvbnN0IHJlc3VsdDogVmFsaWRhdGlvblJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUnLCBxdWVyeSk7XG4gICAgcmV0dXJuIHJlc3VsdC5ib2R5IGFzIFZhbGlkYXRpb25SZXN1bHQ7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7IFdlYmhvb2tzSWRzIH0gZnJvbSAnLi4vRW51bXMnO1xuXG5pbXBvcnQge1xuICBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlLFxuICBXZWJob29rTGlzdCxcbiAgV2ViaG9va1Jlc3BvbnNlLFxuICBXZWJob29rc1F1ZXJ5XG59IGZyb20gJy4uL1R5cGVzL1dlYmhvb2tzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuXG5jbGFzcyBXZWJob29rIHtcbiAgaWQ6IHN0cmluZztcbiAgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViaG9va3NDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgX3BhcnNlV2ViaG9va0xpc3QocmVzcG9uc2U6IHsgYm9keTogeyB3ZWJob29rczogV2ViaG9va0xpc3QgfSB9KTogV2ViaG9va0xpc3Qge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5LndlYmhvb2tzO1xuICB9XG5cbiAgX3BhcnNlV2ViaG9va1dpdGhJRChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNwb25zZTogV2ViaG9va1Jlc3BvbnNlKTogV2ViaG9vayB7XG4gICAgICBjb25zdCB3ZWJob29rUmVzcG9uc2UgPSByZXNwb25zZT8uYm9keT8ud2ViaG9vaztcbiAgICAgIGxldCB1cmwgPSB3ZWJob29rUmVzcG9uc2U/LnVybDtcbiAgICAgIGlmICghdXJsKSB7XG4gICAgICAgIHVybCA9IHdlYmhvb2tSZXNwb25zZT8udXJscyAmJiB3ZWJob29rUmVzcG9uc2UudXJscy5sZW5ndGhcbiAgICAgICAgICA/IHdlYmhvb2tSZXNwb25zZS51cmxzWzBdXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFdlYmhvb2soaWQsIHVybCk7XG4gICAgfTtcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tUZXN0KHJlc3BvbnNlOiB7IGJvZHk6IHsgY29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcgfSB9KVxuICA6IHtjb2RlOiBudW1iZXIsIG1lc3NhZ2U6c3RyaW5nfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvZGU6IHJlc3BvbnNlLmJvZHkuY29kZSxcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgIH0gYXMgV2ViaG9va1ZhbGlkYXRpb25SZXNwb25zZTtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5OiBXZWJob29rc1F1ZXJ5KTogUHJvbWlzZTxXZWJob29rTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgcXVlcnkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tMaXN0KTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgaWQ6IFdlYmhvb2tzSWRzKTogUHJvbWlzZTxXZWJob29rPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLFxuICAgIGlkOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgdGVzdCA9IGZhbHNlKTogUHJvbWlzZTxXZWJob29rIHwgV2ViaG9va1ZhbGlkYXRpb25SZXNwb25zZT4ge1xuICAgIGlmICh0ZXN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQsICd0ZXN0JyksIHsgdXJsIH0pXG4gICAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1Rlc3QpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJyksIHsgaWQsIHVybCB9KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogUHJvbWlzZTxXZWJob29rPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSwgeyB1cmwgfSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZykgOiBQcm9taXNlPFdlYmhvb2s+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFQSUVycm9yT3B0aW9ucywgQVBJRXJyb3JUeXBlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBJRXJyb3IgZXh0ZW5kcyBFcnJvciBpbXBsZW1lbnRzIEFQSUVycm9yVHlwZSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBzdGFjazogc3RyaW5nO1xuICBkZXRhaWxzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHN0YXR1cyxcbiAgICBzdGF0dXNUZXh0LFxuICAgIG1lc3NhZ2UsXG4gICAgYm9keSA9IHt9XG4gIH06IEFQSUVycm9yT3B0aW9ucykge1xuICAgIGxldCBib2R5TWVzc2FnZSA9ICcnO1xuICAgIGxldCBlcnJvciA9ICcnO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGJvZHlNZXNzYWdlID0gYm9keTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keU1lc3NhZ2UgPSBib2R5Py5tZXNzYWdlO1xuICAgICAgZXJyb3IgPSBib2R5Py5lcnJvcjtcbiAgICB9XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IGVycm9yIHx8IHN0YXR1c1RleHQ7XG4gICAgdGhpcy5kZXRhaWxzID0gYm9keU1lc3NhZ2U7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IHsgSW5wdXRGb3JtRGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5cbmNsYXNzIEZvcm1EYXRhQnVpbGRlciB7XG4gIHByaXZhdGUgRm9ybURhdGFDb25zdHJ1Y3RvcjogSW5wdXRGb3JtRGF0YTtcbiAgY29uc3RydWN0b3IoRm9ybURhdGFDb25zdHJ1Y3RvcjogSW5wdXRGb3JtRGF0YSkge1xuICAgIHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvciA9IEZvcm1EYXRhQ29uc3RydWN0b3I7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlRm9ybURhdGEoZGF0YTogYW55KTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBkYXRhIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCBmb3JtRGF0YTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEgPSBPYmplY3Qua2V5cyhkYXRhKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBkYXRhW2tleV07IH0pXG4gICAgICAucmVkdWNlKChmb3JtRGF0YUFjYzogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCBmaWxlS2V5cyA9IFsnYXR0YWNobWVudCcsICdpbmxpbmUnLCAnbXVsdGlwbGVWYWxpZGF0aW9uRmlsZSddO1xuICAgICAgICBpZiAoZmlsZUtleXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgIHRoaXMuYWRkRmlsZXNUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ21lc3NhZ2UnKSB7IC8vIG1pbWUgbWVzc2FnZVxuICAgICAgICAgIHRoaXMuYWRkTWltZURhdGFUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRDb21tb25Qcm9wZXJ0eVRvRkQoa2V5LCBkYXRhW2tleV0sIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgfSwgbmV3IHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvcigpKTtcbiAgICByZXR1cm4gZm9ybURhdGE7XG4gIH1cblxuICBwcml2YXRlIGlzTm9kZUZvcm1EYXRhKGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhKVxuICA6IGZvcm1EYXRhSW5zdGFuY2UgaXMgTm9kZUZvcm1EYXRhIHtcbiAgICByZXR1cm4gKDxOb2RlRm9ybURhdGE+Zm9ybURhdGFJbnN0YW5jZSkuZ2V0SGVhZGVycyAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBdHRhY2htZW50T3B0aW9ucyhpdGVtOiB7XG4gICAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gICAgY29udGVudFR5cGU/IDogc3RyaW5nO1xuICAgIGtub3duTGVuZ3RoPzogbnVtYmVyO1xuICB9KToge1xuICAgIGZpbGVuYW1lPzogc3RyaW5nLFxuICAgIGNvbnRlbnRUeXBlPzogc3RyaW5nLFxuICAgIGtub3duTGVuZ3RoPzogbnVtYmVyXG4gIH0ge1xuICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcgfHwgdGhpcy5pc1N0cmVhbShpdGVtKSkgcmV0dXJuIHt9O1xuICAgIGNvbnN0IHtcbiAgICAgIGZpbGVuYW1lLFxuICAgICAgY29udGVudFR5cGUsXG4gICAgICBrbm93bkxlbmd0aFxuICAgIH0gPSBpdGVtO1xuICAgIHJldHVybiB7XG4gICAgICAuLi4oZmlsZW5hbWUgPyB7IGZpbGVuYW1lIH0gOiB7IGZpbGVuYW1lOiAnZmlsZScgfSksXG4gICAgICAuLi4oY29udGVudFR5cGUgJiYgeyBjb250ZW50VHlwZSB9KSxcbiAgICAgIC4uLihrbm93bkxlbmd0aCAmJiB7IGtub3duTGVuZ3RoIH0pXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkTWltZURhdGFUb0ZEKFxuICAgIGtleTogc3RyaW5nLFxuICAgIGRhdGE6IEJ1ZmZlciB8IEJsb2IgfCBzdHJpbmcsXG4gICAgZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSB8fCB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IG5vZGVGb3JtRGF0YSA9IGZvcm1EYXRhSW5zdGFuY2UgYXMgTm9kZUZvcm1EYXRhO1xuICAgICAgY29uc3QgcHJlcGFyZWREYXRhID0gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gQnVmZmVyLmZyb20oZGF0YSkgOiBkYXRhO1xuICAgICAgbm9kZUZvcm1EYXRhLmFwcGVuZChrZXksIHByZXBhcmVkRGF0YSwgeyBmaWxlbmFtZTogJ01pbWVNZXNzYWdlJyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYnJvd3NlckZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZSBhcyBGb3JtRGF0YTtcbiAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhLCAnTWltZU1lc3NhZ2UnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZEZpbGVzVG9GRChcbiAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZyxcbiAgICB2YWx1ZTogYW55LFxuICAgIGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGFwcGVuZEZpbGVUb0ZEID0gKFxuICAgICAgb3JpZ2luYWxLZXk6IHN0cmluZyxcbiAgICAgIG9iajogYW55LFxuICAgICAgZm9ybURhdGE6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICAgKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBvcmlnaW5hbEtleSA9PT0gJ211bHRpcGxlVmFsaWRhdGlvbkZpbGUnID8gJ2ZpbGUnIDogb3JpZ2luYWxLZXk7XG4gICAgICBjb25zdCBpc1N0cmVhbURhdGEgPSB0aGlzLmlzU3RyZWFtKG9iaik7XG4gICAgICBjb25zdCBvYmpEYXRhID0gaXNTdHJlYW1EYXRhID8gb2JqIDogb2JqLmRhdGE7XG4gICAgICAvLyBnZXRBdHRhY2htZW50T3B0aW9ucyBzaG91bGQgYmUgY2FsbGVkIHdpdGggb2JqIHBhcmFtZXRlciB0byBwcmV2ZW50IGxvb3NpbmcgZmlsZW5hbWVcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldEF0dGFjaG1lbnRPcHRpb25zKG9iaik7XG4gICAgICBpZiAodGhpcy5pc05vZGVGb3JtRGF0YShmb3JtRGF0YSkpIHtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgb2JqRGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIG9iakRhdGEsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgIH07XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCBpdGVtLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBlbmRGaWxlVG9GRChwcm9wZXJ0eU5hbWUsIHZhbHVlLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzU3RyZWFtKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGRhdGEucGlwZSA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29tbW9uUHJvcGVydHlUb0ZEKFxuICAgIGtleTogc3RyaW5nLFxuICAgIHZhbHVlOiBhbnksXG4gICAgZm9ybURhdGFBY2M6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogYW55KSB7XG4gICAgICAgIGZvcm1EYXRhQWNjLmFwcGVuZChrZXksIGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBmb3JtRGF0YUFjYy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBGb3JtRGF0YUJ1aWxkZXI7XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvcic7XG5cbmltcG9ydCB7XG4gIFBhZ2VzTGlzdEFjY3VtdWxhdG9yLFxuICBQYXJzZWRQYWdlLFxuICBQYXJzZWRQYWdlc0xpc3QsXG4gIFF1ZXJ5V2l0aFBhZ2UsXG4gIFJlc3BvbnNlV2l0aFBhZ2luZyxcbiAgVXBkYXRlZFVybEFuZFF1ZXJ5LFxuICBBUElFcnJvck9wdGlvbnNcbn0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcbmltcG9ydCB7XG4gIElCb3VuY2UsXG4gIElDb21wbGFpbnQsXG4gIElVbnN1YnNjcmliZSxcbiAgSVdoaXRlTGlzdFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL1JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgU3VwcHJlc3Npb25EYXRhVHlwZVxufSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBOYXZpZ2F0aW9uVGhydVBhZ2VzIDxUPiB7XG4gIHJlcXVlc3Q/OiBSZXF1ZXN0O1xuICBjb25zdHJ1Y3RvcihyZXF1ZXN0PzogUmVxdWVzdCkge1xuICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZVBhZ2UoXG4gICAgaWQ6IHN0cmluZyxcbiAgICBwYWdlVXJsOiBzdHJpbmcsXG4gICAgdXJsU2VwYXJhdG9yOiBzdHJpbmcsXG4gICAgaXRlcmF0b3JOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgKSA6IFBhcnNlZFBhZ2Uge1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwocGFnZVVybCk7XG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IHBhcnNlZFVybDtcblxuICAgIGNvbnN0IHBhZ2VWYWx1ZSA9IHBhZ2VVcmwgJiYgdHlwZW9mIHBhZ2VVcmwgPT09ICdzdHJpbmcnID8gcGFnZVVybC5zcGxpdCh1cmxTZXBhcmF0b3IpLnBvcCgpIHx8ICcnIDogJyc7XG4gICAgbGV0IGl0ZXJhdG9yUG9zaXRpb24gPSBudWxsO1xuICAgIGlmIChpdGVyYXRvck5hbWUpIHtcbiAgICAgIGl0ZXJhdG9yUG9zaXRpb24gPSBzZWFyY2hQYXJhbXMuaGFzKGl0ZXJhdG9yTmFtZSlcbiAgICAgICAgPyBzZWFyY2hQYXJhbXMuZ2V0KGl0ZXJhdG9yTmFtZSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpZCxcbiAgICAgIHBhZ2U6IHVybFNlcGFyYXRvciA9PT0gJz8nID8gYD8ke3BhZ2VWYWx1ZX1gIDogcGFnZVZhbHVlLFxuICAgICAgaXRlcmF0b3JQb3NpdGlvbixcbiAgICAgIHVybDogcGFnZVVybFxuICAgIH0gYXMgUGFyc2VkUGFnZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZVBhZ2VMaW5rcyhcbiAgICByZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nLFxuICAgIHVybFNlcGFyYXRvcjogc3RyaW5nLFxuICAgIGl0ZXJhdG9yTmFtZT86IHN0cmluZ1xuICApOiBQYXJzZWRQYWdlc0xpc3Qge1xuICAgIGNvbnN0IHBhZ2VzID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuYm9keS5wYWdpbmcpO1xuICAgIHJldHVybiBwYWdlcy5yZWR1Y2UoXG4gICAgICAoYWNjOiBQYWdlc0xpc3RBY2N1bXVsYXRvciwgW2lkLCBwYWdlVXJsXTogWyBpZDogc3RyaW5nLCBwYWdlVXJsOiBzdHJpbmddKSA9PiB7XG4gICAgICAgIGFjY1tpZF0gPSB0aGlzLnBhcnNlUGFnZShpZCwgcGFnZVVybCwgdXJsU2VwYXJhdG9yLCBpdGVyYXRvck5hbWUpO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge31cbiAgICApIGFzIHVua25vd24gYXMgUGFyc2VkUGFnZXNMaXN0O1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVVcmxBbmRRdWVyeShjbGllbnRVcmw6IHN0cmluZywgcXVlcnk/OiBRdWVyeVdpdGhQYWdlKTogVXBkYXRlZFVybEFuZFF1ZXJ5IHtcbiAgICBsZXQgdXJsID0gY2xpZW50VXJsO1xuICAgIGNvbnN0IHF1ZXJ5Q29weSA9IHsgLi4ucXVlcnkgfTtcbiAgICBpZiAocXVlcnlDb3B5LnBhZ2UpIHtcbiAgICAgIHVybCA9IHVybGpvaW4oY2xpZW50VXJsLCBxdWVyeUNvcHkucGFnZSk7XG4gICAgICBkZWxldGUgcXVlcnlDb3B5LnBhZ2U7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB1cmwsXG4gICAgICB1cGRhdGVkUXVlcnk6IHF1ZXJ5Q29weVxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgcmVxdWVzdExpc3RXaXRoUGFnZXMoY2xpZW50VXJsOnN0cmluZywgcXVlcnk/OiBRdWVyeVdpdGhQYWdlLCBNb2RlbD86IHtcbiAgICBuZXcoZGF0YTogU3VwcHJlc3Npb25EYXRhVHlwZSk6XG4gICAgSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0XG4gIH0pOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCB7IHVybCwgdXBkYXRlZFF1ZXJ5IH0gPSB0aGlzLnVwZGF0ZVVybEFuZFF1ZXJ5KGNsaWVudFVybCwgcXVlcnkpO1xuICAgIGlmICh0aGlzLnJlcXVlc3QpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZVdpdGhQYWdpbmcgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHVybCwgdXBkYXRlZFF1ZXJ5KTtcbiAgICAgIC8vIE1vZGVsIGhlcmUgaXMgdXN1YWxseSB1bmRlZmluZWQgZXhjZXB0IGZvciBTdXBwcmVzc2lvbiBDbGllbnRcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSwgTW9kZWwpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgc3RhdHVzOiA1MDAsXG4gICAgICBzdGF0dXNUZXh0OiAnUmVxdWVzdCBwcm9wZXJ0eSBpcyBlbXB0eScsXG4gICAgICBib2R5OiB7IG1lc3NhZ2U6ICcnIH1cbiAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcGFyc2VMaXN0KHJlc3BvbnNlOiBSZXNwb25zZVdpdGhQYWdpbmcsIE1vZGVsPzoge1xuICAgIG5ldyhkYXRhOiBTdXBwcmVzc2lvbkRhdGFUeXBlKTpcbiAgICBJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3RcbiAgfSk6IFQ7XG59XG4iLCJpbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSAnYmFzZS02NCc7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NFcnJvciwgQXhpb3NSZXNwb25zZSB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuaW1wb3J0IHtcbiAgT25DYWxsRW1wdHlIZWFkZXJzLFxuICBPbkNhbGxSZXF1ZXN0T3B0aW9ucyxcbiAgUmVxdWVzdE9wdGlvbnMsXG4gIEFQSUVycm9yT3B0aW9ucyxcbiAgSW5wdXRGb3JtRGF0YSxcbiAgQVBJUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcblxuaW1wb3J0IEZvcm1EYXRhQnVpbGRlciBmcm9tICcuL0Zvcm1EYXRhQnVpbGRlcic7XG5pbXBvcnQgeyBJcFBvb2xEZWxldGVEYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvSVBQb29scyc7XG5cbmNsYXNzIFJlcXVlc3Qge1xuICBwcml2YXRlIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUga2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgdXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgdGltZW91dDogbnVtYmVyO1xuICBwcml2YXRlIGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICBwcml2YXRlIGZvcm1EYXRhQnVpbGRlcjogRm9ybURhdGFCdWlsZGVyO1xuICBwcml2YXRlIG1heEJvZHlMZW5ndGg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucywgZm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLnVzZXJuYW1lID0gb3B0aW9ucy51c2VybmFtZTtcbiAgICB0aGlzLmtleSA9IG9wdGlvbnMua2V5O1xuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgYXMgc3RyaW5nO1xuICAgIHRoaXMudGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcbiAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgdGhpcy5mb3JtRGF0YUJ1aWxkZXIgPSBuZXcgRm9ybURhdGFCdWlsZGVyKGZvcm1EYXRhKTtcbiAgICB0aGlzLm1heEJvZHlMZW5ndGggPSA1MjQyODgwMDsgLy8gNTAgTUJcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb25DYWxsT3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBvcHRpb25zOiBPbkNhbGxSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub25DYWxsT3B0aW9ucyB9O1xuICAgIGNvbnN0IGJhc2ljID0gYmFzZTY0LmVuY29kZShgJHt0aGlzLnVzZXJuYW1lfToke3RoaXMua2V5fWApO1xuICAgIGNvbnN0IG9uQ2FsbEhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgPyBvcHRpb25zLmhlYWRlcnMgOiB7fTtcblxuICAgIGNvbnN0IGhlYWRlcnM6IEhlYWRlcnNJbml0fCBPbkNhbGxFbXB0eUhlYWRlcnMgPSB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtiYXNpY31gLFxuICAgICAgLi4udGhpcy5oZWFkZXJzLFxuICAgICAgLi4ub25DYWxsSGVhZGVyc1xuICAgIH07XG5cbiAgICBkZWxldGUgb3B0aW9ucz8uaGVhZGVycztcblxuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4ub3B0aW9ucyB9O1xuXG4gICAgaWYgKG9wdGlvbnM/LnF1ZXJ5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9wdGlvbnM/LnF1ZXJ5KS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJhbXMucGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhvcHRpb25zLnF1ZXJ5KTtcbiAgICAgIGRlbGV0ZSBwYXJhbXMucXVlcnk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmJvZHkpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSBvcHRpb25zPy5ib2R5O1xuICAgICAgcGFyYW1zLmRhdGEgPSBib2R5O1xuICAgICAgZGVsZXRlIHBhcmFtcy5ib2R5O1xuICAgIH1cbiAgICBsZXQgcmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U7XG4gICAgY29uc3QgdXJsVmFsdWUgPSB1cmxqb2luKHRoaXMudXJsLCB1cmwpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucmVxdWVzdCh7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLnRvTG9jYWxlVXBwZXJDYXNlKCksXG4gICAgICAgIHRpbWVvdXQ6IHRoaXMudGltZW91dCxcbiAgICAgICAgdXJsOiB1cmxWYWx1ZSxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICBtYXhCb2R5TGVuZ3RoOiB0aGlzLm1heEJvZHlMZW5ndGhcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IGVyciBhcyBBeGlvc0Vycm9yO1xuXG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IGVycm9yUmVzcG9uc2U/LnJlc3BvbnNlPy5zdGF0dXMgfHwgNDAwLFxuICAgICAgICBzdGF0dXNUZXh0OiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uc3RhdHVzVGV4dCB8fCBlcnJvclJlc3BvbnNlLmNvZGUsXG4gICAgICAgIGJvZHk6IGVycm9yUmVzcG9uc2U/LnJlc3BvbnNlPy5kYXRhIHx8IGVycm9yUmVzcG9uc2UubWVzc2FnZVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlKTtcbiAgICByZXR1cm4gcmVzIGFzIEFQSVJlc3BvbnNlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRSZXNwb25zZUJvZHkocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2UpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzID0ge1xuICAgICAgYm9keToge30sXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlPy5zdGF0dXNcbiAgICB9IGFzIEFQSVJlc3BvbnNlO1xuXG4gICAgaWYgKHR5cGVvZiByZXNwb25zZS5kYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgPT09ICdNYWlsZ3VuIE1hZ25pZmljZW50IEFQSScpIHtcbiAgICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgICBzdGF0dXNUZXh0OiAnSW5jb3JyZWN0IHVybCcsXG4gICAgICAgICAgYm9keTogcmVzcG9uc2UuZGF0YVxuICAgICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgICB9XG4gICAgICByZXMuYm9keSA9IHtcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuZGF0YVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLmJvZHkgPSByZXNwb25zZS5kYXRhO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcXVlcnkoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IEFycmF5PEFycmF5PHN0cmluZz4+LFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgeyBxdWVyeSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIGNvbW1hbmQoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXSB8IHN0cmluZyB8IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhLFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgICBhZGREZWZhdWx0SGVhZGVycyA9IHRydWVcbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGxldCBoZWFkZXJzID0ge307XG4gICAgaWYgKGFkZERlZmF1bHRIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzID0geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfTtcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAuLi5oZWFkZXJzLFxuICAgICAgYm9keTogZGF0YSxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICByZXF1ZXN0T3B0aW9uc1xuICAgICk7XG4gIH1cblxuICBnZXQoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IEFycmF5PEFycmF5PHN0cmluZz4+LFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkoJ2dldCcsIHVybCwgcXVlcnksIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBzdHJpbmcsXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3RXaXRoRkQoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdXG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHB1dFdpdGhGRCh1cmw6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHBhdGNoV2l0aEZEKHVybDogc3RyaW5nLCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3BhdGNoJywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBwdXQodXJsOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHN0cmluZywgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxuICA6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgZGVsZXRlKHVybDogc3RyaW5nLCBkYXRhPzogSXBQb29sRGVsZXRlRGF0YSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdkZWxldGUnLCB1cmwsIGRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVlc3Q7XG4iLCJleHBvcnQgZW51bSBSZXNvbHV0aW9uIHtcbiAgICBIT1VSID0gJ2hvdXInLFxuICAgIERBWSA9ICdkYXknLFxuICAgIE1PTlRIID0gJ21vbnRoJ1xufVxuXG5leHBvcnQgZW51bSBTdXBwcmVzc2lvbk1vZGVscyB7XG4gICAgQk9VTkNFUyA9ICdib3VuY2VzJyxcbiAgICBDT01QTEFJTlRTID0gJ2NvbXBsYWludHMnLFxuICAgIFVOU1VCU0NSSUJFUyA9ICd1bnN1YnNjcmliZXMnLFxuICAgIFdISVRFTElTVFMgPSAnd2hpdGVsaXN0cydcbn1cblxuZXhwb3J0IGVudW0gV2ViaG9va3NJZHMge1xuICAgIENMSUNLRUQgPSAnY2xpY2tlZCcsXG4gICAgQ09NUExBSU5FRCA9ICdjb21wbGFpbmVkJyxcbiAgICBERUxJVkVSRUQgPSAnZGVsaXZlcmVkJyxcbiAgICBPUEVORUQgPSAnb3BlbmVkJyxcbiAgICBQRVJNQU5FTlRfRkFJTCA9ICdwZXJtYW5lbnRfZmFpbCcsXG4gICAgVEVNUE9SQVJZX0ZBSUwgPSAndGVtcG9yYXJ5X2ZhaWwnLFxuICAgIFVOU1VCU0NSSUJFRCA9ICd1bnN1YnNjcmliZScsXG59XG5cbmV4cG9ydCBlbnVtIFllc05vIHtcbiAgICBZRVMgPSAneWVzJyxcbiAgICBOTyA9ICdubydcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTG9nZ2VyJztcbiIsImV4cG9ydCAqIGZyb20gJy4vRG9tYWluQ3JlZGVudGlhbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UYWdzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGVtcGxhdGVzJztcbiIsImV4cG9ydCAqIGZyb20gJy4vSU1haWxndW5DbGllbnQnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdE1lbWJlcnMnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9TdGF0c0NsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRzQ29udGFpbmVyJztcbiIsImV4cG9ydCAqIGZyb20gJy4vQm91bmNlJztcbmV4cG9ydCAqIGZyb20gJy4vQ29tcGxhaW50JztcbmV4cG9ydCAqIGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuZXhwb3J0ICogZnJvbSAnLi9XaGl0ZUxpc3QnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9NdWx0aXBsZVZhbGlkYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9uJztcbiIsImV4cG9ydCAqIGZyb20gJy4vQ29tbW9uJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWlucyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxndW5DbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdGF0cyc7XG5leHBvcnQgKiBmcm9tICcuL1N1cHByZXNzaW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL1ZhbGlkYXRpb25zJztcbiIsImV4cG9ydCAqIGZyb20gJy4vRXJyb3InO1xuZXhwb3J0ICogZnJvbSAnLi9BcGlSZXNwb25zZSc7XG5leHBvcnQgKiBmcm9tICcuL0Zvcm1EYXRhJztcbmV4cG9ydCAqIGZyb20gJy4vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5leHBvcnQgKiBmcm9tICcuL1JlcXVlc3RPcHRpb25zJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5leHBvcnQgdHlwZSBEb21haW5UcmFja2luZ0RhdGEgPSB7XG4gIGNsaWNrOiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuICBvcGVuOiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuICB1bnN1YnNjcmliZToge1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBodG1sX2Zvb3Rlcjogc3RyaW5nO1xuICAgIHRleHRfZm9vdGVyOiBzdHJpbmc7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVHJhY2tpbmdSZXNwb25zZSA9IHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIGJvZHk6IHtcbiAgICB0cmFja2luZzogRG9tYWluVHJhY2tpbmdEYXRhXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRPcGVuVHJhY2tpbmcgPSB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgb3Blbj86IHsgYWN0aXZlOiBib29sZWFuIH07XG4gIGNsaWNrPzogeyBhY3RpdmU6IGJvb2xlYW4gfCAnaHRtbG9ubHknIH07XG4gIHVuc3Vic2NyaWJlPzoge1xuICAgIGFjdGl2ZTogYm9vbGVhbixcbiAgICBodG1sX2Zvb3Rlcjogc3RyaW5nO1xuICAgIHRleHRfZm9vdGVyOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBib2R5OiBVcGRhdGVkT3BlblRyYWNraW5nO1xufVxuXG5leHBvcnQgdHlwZSBPcGVuVHJhY2tpbmdJbmZvID0ge1xuICBhY3RpdmU6ICd5ZXMnIHwgJ25vJyB8ICd0cnVlJyB8ICdmYWxzZSc7XG59XG5leHBvcnQgdHlwZSBDbGlja1RyYWNraW5nSW5mbyA9IHtcbiAgYWN0aXZlOiAneWVzJyB8ICdubycgfCAndHJ1ZScgfCAnZmFsc2UnIHwgJ2h0bWxvbmx5Jztcbn1cblxuZXhwb3J0IHR5cGUgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8gPSB7XG4gIGFjdGl2ZTogJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwgJ2ZhbHNlJztcbiAgaHRtbF9mb290ZXI6IHN0cmluZztcbiAgdGV4dF9mb290ZXI6IHN0cmluZztcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vRG9tYWluQ3JlZGVudGlhbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5zJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGFncyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRlbXBsYXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRyYWNraW5nJztcbiIsImV4cG9ydCAqIGZyb20gJy4vRXZlbnRzJztcbiIsImV4cG9ydCAqIGZyb20gJy4vSXBQb29scyc7XG4iLCJleHBvcnQgKiBmcm9tICcuL0lQcyc7XG4iLCJleHBvcnQgKiBmcm9tICcuL01haWxndW5DbGllbnRPcHRpb25zJztcbiIsImV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RNZW1iZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzJztcbiIsImV4cG9ydCAqIGZyb20gJy4vTWVzc2FnZXMnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9Sb3V0ZXMnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9TdGF0cyc7XG4iLCJleHBvcnQgKiBmcm9tICcuL0JvdW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL0NvbXBsYWludCc7XG5leHBvcnQgKiBmcm9tICcuL1N1cHByZXNzaW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL1Vuc3Vic2NyaWJlJztcbmV4cG9ydCAqIGZyb20gJy4vV2hpdGVMaXN0JztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5leHBvcnQgdHlwZSBWYWxpZGF0aW9uUXVlcnkgPSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbn1cbmV4cG9ydCB0eXBlIFZhbGlkYXRpb25SZXN1bHQgPSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgaXNfZGlzcG9zYWJsZV9hZGRyZXNzOiBib29sZWFuO1xuICBpc19yb2xlX2FkZHJlc3M6IGJvb2xlYW47XG4gIHJlYXNvbjogc3RyaW5nW107XG4gIHJlc3VsdDogc3RyaW5nO1xuICByaXNrOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFZhbGlkYXRpb25SZXNwb25zZSA9IHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIGJvZHk6IFZhbGlkYXRpb25SZXN1bHQ7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL011bHRpcGxlVmFsaWRhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL1ZhbGlkYXRpb24nO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9XZWJob29rcyc7XG4iLCJleHBvcnQgKiBhcyBDb21tb24gZnJvbSAnLi9Db21tb24nO1xuZXhwb3J0ICogYXMgRG9tYWlucyBmcm9tICcuL0RvbWFpbnMnO1xuZXhwb3J0ICogYXMgRXZlbnRzIGZyb20gJy4vRXZlbnRzJztcbmV4cG9ydCAqIGFzIElQUG9vbHMgZnJvbSAnLi9JUFBvb2xzJztcbmV4cG9ydCAqIGFzIElQcyBmcm9tICcuL0lQcyc7XG5leHBvcnQgKiBhcyBNYWlsZ3VuQ2xpZW50IGZyb20gJy4vTWFpbGd1bkNsaWVudCc7XG5leHBvcnQgKiBhcyBNYWlsaW5nTGlzdHMgZnJvbSAnLi9NYWlsaW5nTGlzdHMnO1xuZXhwb3J0ICogYXMgTWVzc2FnZXMgZnJvbSAnLi9NZXNzYWdlcyc7XG5leHBvcnQgKiBhcyBSb3V0ZXMgZnJvbSAnLi9Sb3V0ZXMnO1xuZXhwb3J0ICogYXMgU3RhdHMgZnJvbSAnLi9TdGF0cyc7XG5leHBvcnQgKiBhcyBTdXBwcmVzc2lvbnMgZnJvbSAnLi9TdXBwcmVzc2lvbnMnO1xuZXhwb3J0ICogYXMgVmFsaWRhdGlvbnMgZnJvbSAnLi9WYWxpZGF0aW9ucyc7XG5leHBvcnQgKiBhcyBXZWJob29rcyBmcm9tICcuL1dlYmhvb2tzJztcbiIsImltcG9ydCBNYWlsZ3VuQ2xpZW50IGZyb20gJy4vQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50JztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEgfSBmcm9tICcuL1R5cGVzL0NvbW1vbic7XG5pbXBvcnQgeyBNYWlsZ3VuQ2xpZW50T3B0aW9ucyB9IGZyb20gJy4vVHlwZXMvTWFpbGd1bkNsaWVudCc7XG5cbmV4cG9ydCAqIGFzIEVudW1zIGZyb20gJy4vRW51bXMnO1xuZXhwb3J0ICogYXMgVHlwZXMgZnJvbSAnLi9UeXBlcyc7XG5leHBvcnQgKiBhcyBJbnRlcmZhY2VzIGZyb20gJy4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW4ge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHQoKTogdHlwZW9mIE1haWxndW4geyByZXR1cm4gdGhpczsgfVxuICBwcml2YXRlIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhXG5cbiAgY29uc3RydWN0b3IoRm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLmZvcm1EYXRhID0gRm9ybURhdGE7XG4gIH1cblxuICBjbGllbnQob3B0aW9uczogTWFpbGd1bkNsaWVudE9wdGlvbnMpIDogTWFpbGd1bkNsaWVudCB7XG4gICAgcmV0dXJuIG5ldyBNYWlsZ3VuQ2xpZW50KG9wdGlvbnMsIHRoaXMuZm9ybURhdGEpO1xuICB9XG59XG4iLCIvKiEgaHR0cHM6Ly9tdGhzLmJlL2Jhc2U2NCB2MS4wLjAgYnkgQG1hdGhpYXMgfCBNSVQgbGljZW5zZSAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGVzIGBleHBvcnRzYC5cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC5cblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLCBhbmQgdXNlXG5cdC8vIGl0IGFzIGByb290YC5cblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgSW52YWxpZENoYXJhY3RlckVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH07XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5cdHZhciBlcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHQvLyBOb3RlOiB0aGUgZXJyb3IgbWVzc2FnZXMgdXNlZCB0aHJvdWdob3V0IHRoaXMgZmlsZSBtYXRjaCB0aG9zZSB1c2VkIGJ5XG5cdFx0Ly8gdGhlIG5hdGl2ZSBgYXRvYmAvYGJ0b2FgIGltcGxlbWVudGF0aW9uIGluIENocm9taXVtLlxuXHRcdHRocm93IG5ldyBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IobWVzc2FnZSk7XG5cdH07XG5cblx0dmFyIFRBQkxFID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXHQvLyBodHRwOi8vd2hhdHdnLm9yZy9odG1sL2NvbW1vbi1taWNyb3N5bnRheGVzLmh0bWwjc3BhY2UtY2hhcmFjdGVyXG5cdHZhciBSRUdFWF9TUEFDRV9DSEFSQUNURVJTID0gL1tcXHRcXG5cXGZcXHIgXS9nO1xuXG5cdC8vIGBkZWNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYXRvYmAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkLiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWF0b2Jcblx0Ly8gVGhlIG9wdGltaXplZCBiYXNlNjQtZGVjb2RpbmcgYWxnb3JpdGhtIHVzZWQgaXMgYmFzZWQgb24gQGF0a+KAmXMgZXhjZWxsZW50XG5cdC8vIGltcGxlbWVudGF0aW9uLiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9hdGsvMTAyMDM5NlxuXHR2YXIgZGVjb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dClcblx0XHRcdC5yZXBsYWNlKFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMsICcnKTtcblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdGlmIChsZW5ndGggJSA0ID09IDApIHtcblx0XHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZSgvPT0/JC8sICcnKTtcblx0XHRcdGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0bGVuZ3RoICUgNCA9PSAxIHx8XG5cdFx0XHQvLyBodHRwOi8vd2hhdHdnLm9yZy9DI2FscGhhbnVtZXJpYy1hc2NpaS1jaGFyYWN0ZXJzXG5cdFx0XHQvW14rYS16QS1aMC05L10vLnRlc3QoaW5wdXQpXG5cdFx0KSB7XG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J0ludmFsaWQgY2hhcmFjdGVyOiB0aGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBiaXRDb3VudGVyID0gMDtcblx0XHR2YXIgYml0U3RvcmFnZTtcblx0XHR2YXIgYnVmZmVyO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0YnVmZmVyID0gVEFCTEUuaW5kZXhPZihpbnB1dC5jaGFyQXQocG9zaXRpb24pKTtcblx0XHRcdGJpdFN0b3JhZ2UgPSBiaXRDb3VudGVyICUgNCA/IGJpdFN0b3JhZ2UgKiA2NCArIGJ1ZmZlciA6IGJ1ZmZlcjtcblx0XHRcdC8vIFVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCBvZiBhIGdyb3VwIG9mIDQgY2hhcmFjdGVyc+KAplxuXHRcdFx0aWYgKGJpdENvdW50ZXIrKyAlIDQpIHtcblx0XHRcdFx0Ly8g4oCmY29udmVydCB0aGUgZmlyc3QgOCBiaXRzIHRvIGEgc2luZ2xlIEFTQ0lJIGNoYXJhY3Rlci5cblx0XHRcdFx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdFx0XHRcdFx0MHhGRiAmIGJpdFN0b3JhZ2UgPj4gKC0yICogYml0Q291bnRlciAmIDYpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0Ly8gYGVuY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBidG9hYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQ6IGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYnRvYVxuXHR2YXIgZW5jb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dCk7XG5cdFx0aWYgKC9bXlxcMC1cXHhGRl0vLnRlc3QoaW5wdXQpKSB7XG5cdFx0XHQvLyBOb3RlOiBubyBuZWVkIHRvIHNwZWNpYWwtY2FzZSBhc3RyYWwgc3ltYm9scyBoZXJlLCBhcyBzdXJyb2dhdGVzIGFyZVxuXHRcdFx0Ly8gbWF0Y2hlZCwgYW5kIHRoZSBpbnB1dCBpcyBzdXBwb3NlZCB0byBvbmx5IGNvbnRhaW4gQVNDSUkgYW55d2F5LlxuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdUaGUgc3RyaW5nIHRvIGJlIGVuY29kZWQgY29udGFpbnMgY2hhcmFjdGVycyBvdXRzaWRlIG9mIHRoZSAnICtcblx0XHRcdFx0J0xhdGluMSByYW5nZS4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgcGFkZGluZyA9IGlucHV0Lmxlbmd0aCAlIDM7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHZhciBhO1xuXHRcdHZhciBiO1xuXHRcdHZhciBjO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0Ly8gTWFrZSBzdXJlIGFueSBwYWRkaW5nIGlzIGhhbmRsZWQgb3V0c2lkZSBvZiB0aGUgbG9vcC5cblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoIC0gcGFkZGluZztcblxuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHQvLyBSZWFkIHRocmVlIGJ5dGVzLCBpLmUuIDI0IGJpdHMuXG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgMTY7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YyA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYiArIGM7XG5cdFx0XHQvLyBUdXJuIHRoZSAyNCBiaXRzIGludG8gZm91ciBjaHVua3Mgb2YgNiBiaXRzIGVhY2gsIGFuZCBhcHBlbmQgdGhlXG5cdFx0XHQvLyBtYXRjaGluZyBjaGFyYWN0ZXIgZm9yIGVhY2ggb2YgdGhlbSB0byB0aGUgb3V0cHV0LlxuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxOCAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiA2ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyICYgMHgzRilcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHBhZGRpbmcgPT0gMikge1xuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDg7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMCkgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA+PiA0KSAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgMikgJiAweDNGKSArXG5cdFx0XHRcdCc9J1xuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKHBhZGRpbmcgPT0gMSkge1xuXHRcdFx0YnVmZmVyID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbik7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDIpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgNCkgJiAweDNGKSArXG5cdFx0XHRcdCc9PSdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHR2YXIgYmFzZTY0ID0ge1xuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQndmVyc2lvbic6ICcxLjAuMCdcblx0fTtcblxuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBiYXNlNjQ7XG5cdFx0fSk7XG5cdH1cdGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBiYXNlNjQ7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAodmFyIGtleSBpbiBiYXNlNjQpIHtcblx0XHRcdFx0YmFzZTY0Lmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBiYXNlNjRba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC5iYXNlNjQgPSBiYXNlNjQ7XG5cdH1cblxufSh0aGlzKSk7XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciBTdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKS5TdHJlYW07XG52YXIgRGVsYXllZFN0cmVhbSA9IHJlcXVpcmUoJ2RlbGF5ZWQtc3RyZWFtJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tYmluZWRTdHJlYW07XG5mdW5jdGlvbiBDb21iaW5lZFN0cmVhbSgpIHtcbiAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICB0aGlzLnJlYWRhYmxlID0gdHJ1ZTtcbiAgdGhpcy5kYXRhU2l6ZSA9IDA7XG4gIHRoaXMubWF4RGF0YVNpemUgPSAyICogMTAyNCAqIDEwMjQ7XG4gIHRoaXMucGF1c2VTdHJlYW1zID0gdHJ1ZTtcblxuICB0aGlzLl9yZWxlYXNlZCA9IGZhbHNlO1xuICB0aGlzLl9zdHJlYW1zID0gW107XG4gIHRoaXMuX2N1cnJlbnRTdHJlYW0gPSBudWxsO1xuICB0aGlzLl9pbnNpZGVMb29wID0gZmFsc2U7XG4gIHRoaXMuX3BlbmRpbmdOZXh0ID0gZmFsc2U7XG59XG51dGlsLmluaGVyaXRzKENvbWJpbmVkU3RyZWFtLCBTdHJlYW0pO1xuXG5Db21iaW5lZFN0cmVhbS5jcmVhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHZhciBjb21iaW5lZFN0cmVhbSA9IG5ldyB0aGlzKCk7XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGZvciAodmFyIG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgY29tYmluZWRTdHJlYW1bb3B0aW9uXSA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgfVxuXG4gIHJldHVybiBjb21iaW5lZFN0cmVhbTtcbn07XG5cbkNvbWJpbmVkU3RyZWFtLmlzU3RyZWFtTGlrZSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICByZXR1cm4gKHR5cGVvZiBzdHJlYW0gIT09ICdmdW5jdGlvbicpXG4gICAgJiYgKHR5cGVvZiBzdHJlYW0gIT09ICdzdHJpbmcnKVxuICAgICYmICh0eXBlb2Ygc3RyZWFtICE9PSAnYm9vbGVhbicpXG4gICAgJiYgKHR5cGVvZiBzdHJlYW0gIT09ICdudW1iZXInKVxuICAgICYmICghQnVmZmVyLmlzQnVmZmVyKHN0cmVhbSkpO1xufTtcblxuQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICB2YXIgaXNTdHJlYW1MaWtlID0gQ29tYmluZWRTdHJlYW0uaXNTdHJlYW1MaWtlKHN0cmVhbSk7XG5cbiAgaWYgKGlzU3RyZWFtTGlrZSkge1xuICAgIGlmICghKHN0cmVhbSBpbnN0YW5jZW9mIERlbGF5ZWRTdHJlYW0pKSB7XG4gICAgICB2YXIgbmV3U3RyZWFtID0gRGVsYXllZFN0cmVhbS5jcmVhdGUoc3RyZWFtLCB7XG4gICAgICAgIG1heERhdGFTaXplOiBJbmZpbml0eSxcbiAgICAgICAgcGF1c2VTdHJlYW06IHRoaXMucGF1c2VTdHJlYW1zLFxuICAgICAgfSk7XG4gICAgICBzdHJlYW0ub24oJ2RhdGEnLCB0aGlzLl9jaGVja0RhdGFTaXplLmJpbmQodGhpcykpO1xuICAgICAgc3RyZWFtID0gbmV3U3RyZWFtO1xuICAgIH1cblxuICAgIHRoaXMuX2hhbmRsZUVycm9ycyhzdHJlYW0pO1xuXG4gICAgaWYgKHRoaXMucGF1c2VTdHJlYW1zKSB7XG4gICAgICBzdHJlYW0ucGF1c2UoKTtcbiAgICB9XG4gIH1cblxuICB0aGlzLl9zdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5Db21iaW5lZFN0cmVhbS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uKGRlc3QsIG9wdGlvbnMpIHtcbiAgU3RyZWFtLnByb3RvdHlwZS5waXBlLmNhbGwodGhpcywgZGVzdCwgb3B0aW9ucyk7XG4gIHRoaXMucmVzdW1lKCk7XG4gIHJldHVybiBkZXN0O1xufTtcblxuQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLl9nZXROZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2N1cnJlbnRTdHJlYW0gPSBudWxsO1xuXG4gIGlmICh0aGlzLl9pbnNpZGVMb29wKSB7XG4gICAgdGhpcy5fcGVuZGluZ05leHQgPSB0cnVlO1xuICAgIHJldHVybjsgLy8gZGVmZXIgY2FsbFxuICB9XG5cbiAgdGhpcy5faW5zaWRlTG9vcCA9IHRydWU7XG4gIHRyeSB7XG4gICAgZG8ge1xuICAgICAgdGhpcy5fcGVuZGluZ05leHQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3JlYWxHZXROZXh0KCk7XG4gICAgfSB3aGlsZSAodGhpcy5fcGVuZGluZ05leHQpO1xuICB9IGZpbmFsbHkge1xuICAgIHRoaXMuX2luc2lkZUxvb3AgPSBmYWxzZTtcbiAgfVxufTtcblxuQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLl9yZWFsR2V0TmV4dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3RyZWFtID0gdGhpcy5fc3RyZWFtcy5zaGlmdCgpO1xuXG5cbiAgaWYgKHR5cGVvZiBzdHJlYW0gPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLmVuZCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc3RyZWFtICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhpcy5fcGlwZU5leHQoc3RyZWFtKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZ2V0U3RyZWFtID0gc3RyZWFtO1xuICBnZXRTdHJlYW0oZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgdmFyIGlzU3RyZWFtTGlrZSA9IENvbWJpbmVkU3RyZWFtLmlzU3RyZWFtTGlrZShzdHJlYW0pO1xuICAgIGlmIChpc1N0cmVhbUxpa2UpIHtcbiAgICAgIHN0cmVhbS5vbignZGF0YScsIHRoaXMuX2NoZWNrRGF0YVNpemUuYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLl9oYW5kbGVFcnJvcnMoc3RyZWFtKTtcbiAgICB9XG5cbiAgICB0aGlzLl9waXBlTmV4dChzdHJlYW0pO1xuICB9LmJpbmQodGhpcykpO1xufTtcblxuQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLl9waXBlTmV4dCA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICB0aGlzLl9jdXJyZW50U3RyZWFtID0gc3RyZWFtO1xuXG4gIHZhciBpc1N0cmVhbUxpa2UgPSBDb21iaW5lZFN0cmVhbS5pc1N0cmVhbUxpa2Uoc3RyZWFtKTtcbiAgaWYgKGlzU3RyZWFtTGlrZSkge1xuICAgIHN0cmVhbS5vbignZW5kJywgdGhpcy5fZ2V0TmV4dC5iaW5kKHRoaXMpKTtcbiAgICBzdHJlYW0ucGlwZSh0aGlzLCB7ZW5kOiBmYWxzZX0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB2YWx1ZSA9IHN0cmVhbTtcbiAgdGhpcy53cml0ZSh2YWx1ZSk7XG4gIHRoaXMuX2dldE5leHQoKTtcbn07XG5cbkNvbWJpbmVkU3RyZWFtLnByb3RvdHlwZS5faGFuZGxlRXJyb3JzID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgc3RyZWFtLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycikge1xuICAgIHNlbGYuX2VtaXRFcnJvcihlcnIpO1xuICB9KTtcbn07XG5cbkNvbWJpbmVkU3RyZWFtLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdGhpcy5lbWl0KCdkYXRhJywgZGF0YSk7XG59O1xuXG5Db21iaW5lZFN0cmVhbS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLnBhdXNlU3RyZWFtcykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmKHRoaXMucGF1c2VTdHJlYW1zICYmIHRoaXMuX2N1cnJlbnRTdHJlYW0gJiYgdHlwZW9mKHRoaXMuX2N1cnJlbnRTdHJlYW0ucGF1c2UpID09ICdmdW5jdGlvbicpIHRoaXMuX2N1cnJlbnRTdHJlYW0ucGF1c2UoKTtcbiAgdGhpcy5lbWl0KCdwYXVzZScpO1xufTtcblxuQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMuX3JlbGVhc2VkKSB7XG4gICAgdGhpcy5fcmVsZWFzZWQgPSB0cnVlO1xuICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgIHRoaXMuX2dldE5leHQoKTtcbiAgfVxuXG4gIGlmKHRoaXMucGF1c2VTdHJlYW1zICYmIHRoaXMuX2N1cnJlbnRTdHJlYW0gJiYgdHlwZW9mKHRoaXMuX2N1cnJlbnRTdHJlYW0ucmVzdW1lKSA9PSAnZnVuY3Rpb24nKSB0aGlzLl9jdXJyZW50U3RyZWFtLnJlc3VtZSgpO1xuICB0aGlzLmVtaXQoJ3Jlc3VtZScpO1xufTtcblxuQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9yZXNldCgpO1xuICB0aGlzLmVtaXQoJ2VuZCcpO1xufTtcblxuQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fcmVzZXQoKTtcbiAgdGhpcy5lbWl0KCdjbG9zZScpO1xufTtcblxuQ29tYmluZWRTdHJlYW0ucHJvdG90eXBlLl9yZXNldCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gIHRoaXMuX3N0cmVhbXMgPSBbXTtcbiAgdGhpcy5fY3VycmVudFN0cmVhbSA9IG51bGw7XG59O1xuXG5Db21iaW5lZFN0cmVhbS5wcm90b3R5cGUuX2NoZWNrRGF0YVNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fdXBkYXRlRGF0YVNpemUoKTtcbiAgaWYgKHRoaXMuZGF0YVNpemUgPD0gdGhpcy5tYXhEYXRhU2l6ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBtZXNzYWdlID1cbiAgICAnRGVsYXllZFN0cmVhbSNtYXhEYXRhU2l6ZSBvZiAnICsgdGhpcy5tYXhEYXRhU2l6ZSArICcgYnl0ZXMgZXhjZWVkZWQuJztcbiAgdGhpcy5fZW1pdEVycm9yKG5ldyBFcnJvcihtZXNzYWdlKSk7XG59O1xuXG5Db21iaW5lZFN0cmVhbS5wcm90b3R5cGUuX3VwZGF0ZURhdGFTaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGF0YVNpemUgPSAwO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5fc3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgIGlmICghc3RyZWFtLmRhdGFTaXplKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2VsZi5kYXRhU2l6ZSArPSBzdHJlYW0uZGF0YVNpemU7XG4gIH0pO1xuXG4gIGlmICh0aGlzLl9jdXJyZW50U3RyZWFtICYmIHRoaXMuX2N1cnJlbnRTdHJlYW0uZGF0YVNpemUpIHtcbiAgICB0aGlzLmRhdGFTaXplICs9IHRoaXMuX2N1cnJlbnRTdHJlYW0uZGF0YVNpemU7XG4gIH1cbn07XG5cbkNvbWJpbmVkU3RyZWFtLnByb3RvdHlwZS5fZW1pdEVycm9yID0gZnVuY3Rpb24oZXJyKSB7XG4gIHRoaXMuX3Jlc2V0KCk7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xufTtcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9IGxvY2Fsc3RvcmFnZSgpO1xuZXhwb3J0cy5kZXN0cm95ID0gKCgpID0+IHtcblx0bGV0IHdhcm5lZCA9IGZhbHNlO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0aWYgKCF3YXJuZWQpIHtcblx0XHRcdHdhcm5lZCA9IHRydWU7XG5cdFx0XHRjb25zb2xlLndhcm4oJ0luc3RhbmNlIG1ldGhvZCBgZGVidWcuZGVzdHJveSgpYCBpcyBkZXByZWNhdGVkIGFuZCBubyBsb25nZXIgZG9lcyBhbnl0aGluZy4gSXQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24gb2YgYGRlYnVnYC4nKTtcblx0XHR9XG5cdH07XG59KSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcblx0JyMwMDAwQ0MnLFxuXHQnIzAwMDBGRicsXG5cdCcjMDAzM0NDJyxcblx0JyMwMDMzRkYnLFxuXHQnIzAwNjZDQycsXG5cdCcjMDA2NkZGJyxcblx0JyMwMDk5Q0MnLFxuXHQnIzAwOTlGRicsXG5cdCcjMDBDQzAwJyxcblx0JyMwMENDMzMnLFxuXHQnIzAwQ0M2NicsXG5cdCcjMDBDQzk5Jyxcblx0JyMwMENDQ0MnLFxuXHQnIzAwQ0NGRicsXG5cdCcjMzMwMENDJyxcblx0JyMzMzAwRkYnLFxuXHQnIzMzMzNDQycsXG5cdCcjMzMzM0ZGJyxcblx0JyMzMzY2Q0MnLFxuXHQnIzMzNjZGRicsXG5cdCcjMzM5OUNDJyxcblx0JyMzMzk5RkYnLFxuXHQnIzMzQ0MwMCcsXG5cdCcjMzNDQzMzJyxcblx0JyMzM0NDNjYnLFxuXHQnIzMzQ0M5OScsXG5cdCcjMzNDQ0NDJyxcblx0JyMzM0NDRkYnLFxuXHQnIzY2MDBDQycsXG5cdCcjNjYwMEZGJyxcblx0JyM2NjMzQ0MnLFxuXHQnIzY2MzNGRicsXG5cdCcjNjZDQzAwJyxcblx0JyM2NkNDMzMnLFxuXHQnIzk5MDBDQycsXG5cdCcjOTkwMEZGJyxcblx0JyM5OTMzQ0MnLFxuXHQnIzk5MzNGRicsXG5cdCcjOTlDQzAwJyxcblx0JyM5OUNDMzMnLFxuXHQnI0NDMDAwMCcsXG5cdCcjQ0MwMDMzJyxcblx0JyNDQzAwNjYnLFxuXHQnI0NDMDA5OScsXG5cdCcjQ0MwMENDJyxcblx0JyNDQzAwRkYnLFxuXHQnI0NDMzMwMCcsXG5cdCcjQ0MzMzMzJyxcblx0JyNDQzMzNjYnLFxuXHQnI0NDMzM5OScsXG5cdCcjQ0MzM0NDJyxcblx0JyNDQzMzRkYnLFxuXHQnI0NDNjYwMCcsXG5cdCcjQ0M2NjMzJyxcblx0JyNDQzk5MDAnLFxuXHQnI0NDOTkzMycsXG5cdCcjQ0NDQzAwJyxcblx0JyNDQ0NDMzMnLFxuXHQnI0ZGMDAwMCcsXG5cdCcjRkYwMDMzJyxcblx0JyNGRjAwNjYnLFxuXHQnI0ZGMDA5OScsXG5cdCcjRkYwMENDJyxcblx0JyNGRjAwRkYnLFxuXHQnI0ZGMzMwMCcsXG5cdCcjRkYzMzMzJyxcblx0JyNGRjMzNjYnLFxuXHQnI0ZGMzM5OScsXG5cdCcjRkYzM0NDJyxcblx0JyNGRjMzRkYnLFxuXHQnI0ZGNjYwMCcsXG5cdCcjRkY2NjMzJyxcblx0JyNGRjk5MDAnLFxuXHQnI0ZGOTkzMycsXG5cdCcjRkZDQzAwJyxcblx0JyNGRkNDMzMnXG5dO1xuXG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG5cdC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcblx0Ly8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2Vcblx0Ly8gZXhwbGljaXRseVxuXHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgKHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicgfHwgd2luZG93LnByb2Nlc3MuX19ud2pzKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Ly8gSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgY29sb3JzLlxuXHRpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goLyhlZGdlfHRyaWRlbnQpXFwvKFxcZCspLykpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBJcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuXHQvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuXHRyZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcblx0XHQvLyBJcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG5cdFx0KHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcblx0XHQvLyBJcyBmaXJlZm94ID49IHYzMT9cblx0XHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcblx0XHQodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcblx0XHQvLyBEb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG5cdFx0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcblx0YXJnc1swXSA9ICh0aGlzLnVzZUNvbG9ycyA/ICclYycgOiAnJykgK1xuXHRcdHRoaXMubmFtZXNwYWNlICtcblx0XHQodGhpcy51c2VDb2xvcnMgPyAnICVjJyA6ICcgJykgK1xuXHRcdGFyZ3NbMF0gK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICclYyAnIDogJyAnKSArXG5cdFx0JysnICsgbW9kdWxlLmV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuXHRpZiAoIXRoaXMudXNlQ29sb3JzKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG5cdGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpO1xuXG5cdC8vIFRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG5cdC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cblx0Ly8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG5cdGxldCBpbmRleCA9IDA7XG5cdGxldCBsYXN0QyA9IDA7XG5cdGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBtYXRjaCA9PiB7XG5cdFx0aWYgKG1hdGNoID09PSAnJSUnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGluZGV4Kys7XG5cdFx0aWYgKG1hdGNoID09PSAnJWMnKSB7XG5cdFx0XHQvLyBXZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcblx0XHRcdC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG5cdFx0XHRsYXN0QyA9IGluZGV4O1xuXHRcdH1cblx0fSk7XG5cblx0YXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUuZGVidWcoKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmRlYnVnYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKiBJZiBgY29uc29sZS5kZWJ1Z2AgaXMgbm90IGF2YWlsYWJsZSwgZmFsbHMgYmFja1xuICogdG8gYGNvbnNvbGUubG9nYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLmxvZyA9IGNvbnNvbGUuZGVidWcgfHwgY29uc29sZS5sb2cgfHwgKCgpID0+IHt9KTtcblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuXHR0cnkge1xuXHRcdGlmIChuYW1lc3BhY2VzKSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2Uuc2V0SXRlbSgnZGVidWcnLCBuYW1lc3BhY2VzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRsZXQgcjtcblx0dHJ5IHtcblx0XHRyID0gZXhwb3J0cy5zdG9yYWdlLmdldEl0ZW0oJ2RlYnVnJyk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG5cblx0Ly8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuXHRpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcblx0XHRyID0gcHJvY2Vzcy5lbnYuREVCVUc7XG5cdH1cblxuXHRyZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG5cdHRyeSB7XG5cdFx0Ly8gVFZNTEtpdCAoQXBwbGUgVFYgSlMgUnVudGltZSkgZG9lcyBub3QgaGF2ZSBhIHdpbmRvdyBvYmplY3QsIGp1c3QgbG9jYWxTdG9yYWdlIGluIHRoZSBnbG9iYWwgY29udGV4dFxuXHRcdC8vIFRoZSBCcm93c2VyIGFsc28gaGFzIGxvY2FsU3RvcmFnZSBpbiB0aGUgZ2xvYmFsIGNvbnRleHQuXG5cdFx0cmV0dXJuIGxvY2FsU3RvcmFnZTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2NvbW1vbicpKGV4cG9ydHMpO1xuXG5jb25zdCB7Zm9ybWF0dGVyc30gPSBtb2R1bGUuZXhwb3J0cztcblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24gKHYpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVycm9yLm1lc3NhZ2U7XG5cdH1cbn07XG4iLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqL1xuXG5mdW5jdGlvbiBzZXR1cChlbnYpIHtcblx0Y3JlYXRlRGVidWcuZGVidWcgPSBjcmVhdGVEZWJ1Zztcblx0Y3JlYXRlRGVidWcuZGVmYXVsdCA9IGNyZWF0ZURlYnVnO1xuXHRjcmVhdGVEZWJ1Zy5jb2VyY2UgPSBjb2VyY2U7XG5cdGNyZWF0ZURlYnVnLmRpc2FibGUgPSBkaXNhYmxlO1xuXHRjcmVhdGVEZWJ1Zy5lbmFibGUgPSBlbmFibGU7XG5cdGNyZWF0ZURlYnVnLmVuYWJsZWQgPSBlbmFibGVkO1xuXHRjcmVhdGVEZWJ1Zy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cdGNyZWF0ZURlYnVnLmRlc3Ryb3kgPSBkZXN0cm95O1xuXG5cdE9iamVjdC5rZXlzKGVudikuZm9yRWFjaChrZXkgPT4ge1xuXHRcdGNyZWF0ZURlYnVnW2tleV0gPSBlbnZba2V5XTtcblx0fSk7XG5cblx0LyoqXG5cdCogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcywgYW5kIG5hbWVzIHRvIHNraXAuXG5cdCovXG5cblx0Y3JlYXRlRGVidWcubmFtZXMgPSBbXTtcblx0Y3JlYXRlRGVidWcuc2tpcHMgPSBbXTtcblxuXHQvKipcblx0KiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG5cdCpcblx0KiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlciBvciB1cHBlci1jYXNlIGxldHRlciwgaS5lLiBcIm5cIiBhbmQgXCJOXCIuXG5cdCovXG5cdGNyZWF0ZURlYnVnLmZvcm1hdHRlcnMgPSB7fTtcblxuXHQvKipcblx0KiBTZWxlY3RzIGEgY29sb3IgZm9yIGEgZGVidWcgbmFtZXNwYWNlXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSBUaGUgbmFtZXNwYWNlIHN0cmluZyBmb3IgdGhlIGRlYnVnIGluc3RhbmNlIHRvIGJlIGNvbG9yZWRcblx0KiBAcmV0dXJuIHtOdW1iZXJ8U3RyaW5nfSBBbiBBTlNJIGNvbG9yIGNvZGUgZm9yIHRoZSBnaXZlbiBuYW1lc3BhY2Vcblx0KiBAYXBpIHByaXZhdGVcblx0Ki9cblx0ZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG5cdFx0bGV0IGhhc2ggPSAwO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lc3BhY2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuXHRcdFx0aGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcblx0XHR9XG5cblx0XHRyZXR1cm4gY3JlYXRlRGVidWcuY29sb3JzW01hdGguYWJzKGhhc2gpICUgY3JlYXRlRGVidWcuY29sb3JzLmxlbmd0aF07XG5cdH1cblx0Y3JlYXRlRGVidWcuc2VsZWN0Q29sb3IgPSBzZWxlY3RDb2xvcjtcblxuXHQvKipcblx0KiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2Vcblx0KiBAcmV0dXJuIHtGdW5jdGlvbn1cblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblx0XHRsZXQgcHJldlRpbWU7XG5cdFx0bGV0IGVuYWJsZU92ZXJyaWRlID0gbnVsbDtcblx0XHRsZXQgbmFtZXNwYWNlc0NhY2hlO1xuXHRcdGxldCBlbmFibGVkQ2FjaGU7XG5cblx0XHRmdW5jdGlvbiBkZWJ1ZyguLi5hcmdzKSB7XG5cdFx0XHQvLyBEaXNhYmxlZD9cblx0XHRcdGlmICghZGVidWcuZW5hYmxlZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHNlbGYgPSBkZWJ1ZztcblxuXHRcdFx0Ly8gU2V0IGBkaWZmYCB0aW1lc3RhbXBcblx0XHRcdGNvbnN0IGN1cnIgPSBOdW1iZXIobmV3IERhdGUoKSk7XG5cdFx0XHRjb25zdCBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG5cdFx0XHRzZWxmLmRpZmYgPSBtcztcblx0XHRcdHNlbGYucHJldiA9IHByZXZUaW1lO1xuXHRcdFx0c2VsZi5jdXJyID0gY3Vycjtcblx0XHRcdHByZXZUaW1lID0gY3VycjtcblxuXHRcdFx0YXJnc1swXSA9IGNyZWF0ZURlYnVnLmNvZXJjZShhcmdzWzBdKTtcblxuXHRcdFx0aWYgKHR5cGVvZiBhcmdzWzBdICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHQvLyBBbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuXHRcdFx0XHRhcmdzLnVuc2hpZnQoJyVPJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG5cdFx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdFx0YXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIChtYXRjaCwgZm9ybWF0KSA9PiB7XG5cdFx0XHRcdC8vIElmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcblx0XHRcdFx0aWYgKG1hdGNoID09PSAnJSUnKSB7XG5cdFx0XHRcdFx0cmV0dXJuICclJztcblx0XHRcdFx0fVxuXHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0XHRjb25zdCBmb3JtYXR0ZXIgPSBjcmVhdGVEZWJ1Zy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cdFx0XHRcdGlmICh0eXBlb2YgZm9ybWF0dGVyID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsID0gYXJnc1tpbmRleF07XG5cdFx0XHRcdFx0bWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG5cdFx0XHRcdFx0Ly8gTm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuXHRcdFx0XHRcdGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRpbmRleC0tO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBtYXRjaDtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBBcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuXHRcdFx0Y3JlYXRlRGVidWcuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG5cdFx0XHRjb25zdCBsb2dGbiA9IHNlbGYubG9nIHx8IGNyZWF0ZURlYnVnLmxvZztcblx0XHRcdGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXHRcdH1cblxuXHRcdGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblx0XHRkZWJ1Zy51c2VDb2xvcnMgPSBjcmVhdGVEZWJ1Zy51c2VDb2xvcnMoKTtcblx0XHRkZWJ1Zy5jb2xvciA9IGNyZWF0ZURlYnVnLnNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG5cdFx0ZGVidWcuZXh0ZW5kID0gZXh0ZW5kO1xuXHRcdGRlYnVnLmRlc3Ryb3kgPSBjcmVhdGVEZWJ1Zy5kZXN0cm95OyAvLyBYWFggVGVtcG9yYXJ5LiBXaWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgcmVsZWFzZS5cblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZWJ1ZywgJ2VuYWJsZWQnLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdGdldDogKCkgPT4ge1xuXHRcdFx0XHRpZiAoZW5hYmxlT3ZlcnJpZGUgIT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gZW5hYmxlT3ZlcnJpZGU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG5hbWVzcGFjZXNDYWNoZSAhPT0gY3JlYXRlRGVidWcubmFtZXNwYWNlcykge1xuXHRcdFx0XHRcdG5hbWVzcGFjZXNDYWNoZSA9IGNyZWF0ZURlYnVnLm5hbWVzcGFjZXM7XG5cdFx0XHRcdFx0ZW5hYmxlZENhY2hlID0gY3JlYXRlRGVidWcuZW5hYmxlZChuYW1lc3BhY2UpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGVuYWJsZWRDYWNoZTtcblx0XHRcdH0sXG5cdFx0XHRzZXQ6IHYgPT4ge1xuXHRcdFx0XHRlbmFibGVPdmVycmlkZSA9IHY7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBFbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuXHRcdGlmICh0eXBlb2YgY3JlYXRlRGVidWcuaW5pdCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y3JlYXRlRGVidWcuaW5pdChkZWJ1Zyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRlYnVnO1xuXHR9XG5cblx0ZnVuY3Rpb24gZXh0ZW5kKG5hbWVzcGFjZSwgZGVsaW1pdGVyKSB7XG5cdFx0Y29uc3QgbmV3RGVidWcgPSBjcmVhdGVEZWJ1Zyh0aGlzLm5hbWVzcGFjZSArICh0eXBlb2YgZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/ICc6JyA6IGRlbGltaXRlcikgKyBuYW1lc3BhY2UpO1xuXHRcdG5ld0RlYnVnLmxvZyA9IHRoaXMubG9nO1xuXHRcdHJldHVybiBuZXdEZWJ1Zztcblx0fVxuXG5cdC8qKlxuXHQqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcblx0KiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuXHQqXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuXHRcdGNyZWF0ZURlYnVnLnNhdmUobmFtZXNwYWNlcyk7XG5cdFx0Y3JlYXRlRGVidWcubmFtZXNwYWNlcyA9IG5hbWVzcGFjZXM7XG5cblx0XHRjcmVhdGVEZWJ1Zy5uYW1lcyA9IFtdO1xuXHRcdGNyZWF0ZURlYnVnLnNraXBzID0gW107XG5cblx0XHRsZXQgaTtcblx0XHRjb25zdCBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG5cdFx0Y29uc3QgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoIXNwbGl0W2ldKSB7XG5cdFx0XHRcdC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcblxuXHRcdFx0aWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuXHRcdFx0XHRjcmVhdGVEZWJ1Zy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zbGljZSgxKSArICckJykpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3JlYXRlRGVidWcubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0KiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cblx0KlxuXHQqIEByZXR1cm4ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGRpc2FibGUoKSB7XG5cdFx0Y29uc3QgbmFtZXNwYWNlcyA9IFtcblx0XHRcdC4uLmNyZWF0ZURlYnVnLm5hbWVzLm1hcCh0b05hbWVzcGFjZSksXG5cdFx0XHQuLi5jcmVhdGVEZWJ1Zy5za2lwcy5tYXAodG9OYW1lc3BhY2UpLm1hcChuYW1lc3BhY2UgPT4gJy0nICsgbmFtZXNwYWNlKVxuXHRcdF0uam9pbignLCcpO1xuXHRcdGNyZWF0ZURlYnVnLmVuYWJsZSgnJyk7XG5cdFx0cmV0dXJuIG5hbWVzcGFjZXM7XG5cdH1cblxuXHQvKipcblx0KiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuXHQqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG5cdFx0aWYgKG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRsZXQgaTtcblx0XHRsZXQgbGVuO1xuXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY3JlYXRlRGVidWcuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChjcmVhdGVEZWJ1Zy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjcmVhdGVEZWJ1Zy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKGNyZWF0ZURlYnVnLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCogQ29udmVydCByZWdleHAgdG8gbmFtZXNwYWNlXG5cdCpcblx0KiBAcGFyYW0ge1JlZ0V4cH0gcmVneGVwXG5cdCogQHJldHVybiB7U3RyaW5nfSBuYW1lc3BhY2Vcblx0KiBAYXBpIHByaXZhdGVcblx0Ki9cblx0ZnVuY3Rpb24gdG9OYW1lc3BhY2UocmVnZXhwKSB7XG5cdFx0cmV0dXJuIHJlZ2V4cC50b1N0cmluZygpXG5cdFx0XHQuc3Vic3RyaW5nKDIsIHJlZ2V4cC50b1N0cmluZygpLmxlbmd0aCAtIDIpXG5cdFx0XHQucmVwbGFjZSgvXFwuXFwqXFw/JC8sICcqJyk7XG5cdH1cblxuXHQvKipcblx0KiBDb2VyY2UgYHZhbGAuXG5cdCpcblx0KiBAcGFyYW0ge01peGVkfSB2YWxcblx0KiBAcmV0dXJuIHtNaXhlZH1cblx0KiBAYXBpIHByaXZhdGVcblx0Ki9cblx0ZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuXHRcdGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdFx0cmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbDtcblx0fVxuXG5cdC8qKlxuXHQqIFhYWCBETyBOT1QgVVNFLiBUaGlzIGlzIGEgdGVtcG9yYXJ5IHN0dWIgZnVuY3Rpb24uXG5cdCogWFhYIEl0IFdJTEwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlLlxuXHQqL1xuXHRmdW5jdGlvbiBkZXN0cm95KCkge1xuXHRcdGNvbnNvbGUud2FybignSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLicpO1xuXHR9XG5cblx0Y3JlYXRlRGVidWcuZW5hYmxlKGNyZWF0ZURlYnVnLmxvYWQoKSk7XG5cblx0cmV0dXJuIGNyZWF0ZURlYnVnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldHVwO1xuIiwiLyoqXG4gKiBEZXRlY3QgRWxlY3Ryb24gcmVuZGVyZXIgLyBud2pzIHByb2Nlc3MsIHdoaWNoIGlzIG5vZGUsIGJ1dCB3ZSBzaG91bGRcbiAqIHRyZWF0IGFzIGEgYnJvd3Nlci5cbiAqL1xuXG5pZiAodHlwZW9mIHByb2Nlc3MgPT09ICd1bmRlZmluZWQnIHx8IHByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJyB8fCBwcm9jZXNzLmJyb3dzZXIgPT09IHRydWUgfHwgcHJvY2Vzcy5fX253anMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Jyb3dzZXIuanMnKTtcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9ub2RlLmpzJyk7XG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuY29uc3QgdHR5ID0gcmVxdWlyZSgndHR5Jyk7XG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIE5vZGUuanMgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICovXG5cbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5kZXN0cm95ID0gdXRpbC5kZXByZWNhdGUoXG5cdCgpID0+IHt9LFxuXHQnSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLidcbik7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gWzYsIDIsIDMsIDQsIDUsIDFdO1xuXG50cnkge1xuXHQvLyBPcHRpb25hbCBkZXBlbmRlbmN5IChhcyBpbiwgZG9lc24ndCBuZWVkIHRvIGJlIGluc3RhbGxlZCwgTk9UIGxpa2Ugb3B0aW9uYWxEZXBlbmRlbmNpZXMgaW4gcGFja2FnZS5qc29uKVxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzXG5cdGNvbnN0IHN1cHBvcnRzQ29sb3IgPSByZXF1aXJlKCdzdXBwb3J0cy1jb2xvcicpO1xuXG5cdGlmIChzdXBwb3J0c0NvbG9yICYmIChzdXBwb3J0c0NvbG9yLnN0ZGVyciB8fCBzdXBwb3J0c0NvbG9yKS5sZXZlbCA+PSAyKSB7XG5cdFx0ZXhwb3J0cy5jb2xvcnMgPSBbXG5cdFx0XHQyMCxcblx0XHRcdDIxLFxuXHRcdFx0MjYsXG5cdFx0XHQyNyxcblx0XHRcdDMyLFxuXHRcdFx0MzMsXG5cdFx0XHQzOCxcblx0XHRcdDM5LFxuXHRcdFx0NDAsXG5cdFx0XHQ0MSxcblx0XHRcdDQyLFxuXHRcdFx0NDMsXG5cdFx0XHQ0NCxcblx0XHRcdDQ1LFxuXHRcdFx0NTYsXG5cdFx0XHQ1Nyxcblx0XHRcdDYyLFxuXHRcdFx0NjMsXG5cdFx0XHQ2OCxcblx0XHRcdDY5LFxuXHRcdFx0NzQsXG5cdFx0XHQ3NSxcblx0XHRcdDc2LFxuXHRcdFx0NzcsXG5cdFx0XHQ3OCxcblx0XHRcdDc5LFxuXHRcdFx0ODAsXG5cdFx0XHQ4MSxcblx0XHRcdDkyLFxuXHRcdFx0OTMsXG5cdFx0XHQ5OCxcblx0XHRcdDk5LFxuXHRcdFx0MTEyLFxuXHRcdFx0MTEzLFxuXHRcdFx0MTI4LFxuXHRcdFx0MTI5LFxuXHRcdFx0MTM0LFxuXHRcdFx0MTM1LFxuXHRcdFx0MTQ4LFxuXHRcdFx0MTQ5LFxuXHRcdFx0MTYwLFxuXHRcdFx0MTYxLFxuXHRcdFx0MTYyLFxuXHRcdFx0MTYzLFxuXHRcdFx0MTY0LFxuXHRcdFx0MTY1LFxuXHRcdFx0MTY2LFxuXHRcdFx0MTY3LFxuXHRcdFx0MTY4LFxuXHRcdFx0MTY5LFxuXHRcdFx0MTcwLFxuXHRcdFx0MTcxLFxuXHRcdFx0MTcyLFxuXHRcdFx0MTczLFxuXHRcdFx0MTc4LFxuXHRcdFx0MTc5LFxuXHRcdFx0MTg0LFxuXHRcdFx0MTg1LFxuXHRcdFx0MTk2LFxuXHRcdFx0MTk3LFxuXHRcdFx0MTk4LFxuXHRcdFx0MTk5LFxuXHRcdFx0MjAwLFxuXHRcdFx0MjAxLFxuXHRcdFx0MjAyLFxuXHRcdFx0MjAzLFxuXHRcdFx0MjA0LFxuXHRcdFx0MjA1LFxuXHRcdFx0MjA2LFxuXHRcdFx0MjA3LFxuXHRcdFx0MjA4LFxuXHRcdFx0MjA5LFxuXHRcdFx0MjE0LFxuXHRcdFx0MjE1LFxuXHRcdFx0MjIwLFxuXHRcdFx0MjIxXG5cdFx0XTtcblx0fVxufSBjYXRjaCAoZXJyb3IpIHtcblx0Ly8gU3dhbGxvdyAtIHdlIG9ubHkgY2FyZSBpZiBgc3VwcG9ydHMtY29sb3JgIGlzIGF2YWlsYWJsZTsgaXQgZG9lc24ndCBoYXZlIHRvIGJlLlxufVxuXG4vKipcbiAqIEJ1aWxkIHVwIHRoZSBkZWZhdWx0IGBpbnNwZWN0T3B0c2Agb2JqZWN0IGZyb20gdGhlIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqXG4gKiAgICQgREVCVUdfQ09MT1JTPW5vIERFQlVHX0RFUFRIPTEwIERFQlVHX1NIT1dfSElEREVOPWVuYWJsZWQgbm9kZSBzY3JpcHQuanNcbiAqL1xuXG5leHBvcnRzLmluc3BlY3RPcHRzID0gT2JqZWN0LmtleXMocHJvY2Vzcy5lbnYpLmZpbHRlcihrZXkgPT4ge1xuXHRyZXR1cm4gL15kZWJ1Z18vaS50ZXN0KGtleSk7XG59KS5yZWR1Y2UoKG9iaiwga2V5KSA9PiB7XG5cdC8vIENhbWVsLWNhc2Vcblx0Y29uc3QgcHJvcCA9IGtleVxuXHRcdC5zdWJzdHJpbmcoNilcblx0XHQudG9Mb3dlckNhc2UoKVxuXHRcdC5yZXBsYWNlKC9fKFthLXpdKS9nLCAoXywgaykgPT4ge1xuXHRcdFx0cmV0dXJuIGsudG9VcHBlckNhc2UoKTtcblx0XHR9KTtcblxuXHQvLyBDb2VyY2Ugc3RyaW5nIHZhbHVlIGludG8gSlMgdmFsdWVcblx0bGV0IHZhbCA9IHByb2Nlc3MuZW52W2tleV07XG5cdGlmICgvXih5ZXN8b258dHJ1ZXxlbmFibGVkKSQvaS50ZXN0KHZhbCkpIHtcblx0XHR2YWwgPSB0cnVlO1xuXHR9IGVsc2UgaWYgKC9eKG5vfG9mZnxmYWxzZXxkaXNhYmxlZCkkL2kudGVzdCh2YWwpKSB7XG5cdFx0dmFsID0gZmFsc2U7XG5cdH0gZWxzZSBpZiAodmFsID09PSAnbnVsbCcpIHtcblx0XHR2YWwgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdHZhbCA9IE51bWJlcih2YWwpO1xuXHR9XG5cblx0b2JqW3Byb3BdID0gdmFsO1xuXHRyZXR1cm4gb2JqO1xufSwge30pO1xuXG4vKipcbiAqIElzIHN0ZG91dCBhIFRUWT8gQ29sb3JlZCBvdXRwdXQgaXMgZW5hYmxlZCB3aGVuIGB0cnVlYC5cbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG5cdHJldHVybiAnY29sb3JzJyBpbiBleHBvcnRzLmluc3BlY3RPcHRzID9cblx0XHRCb29sZWFuKGV4cG9ydHMuaW5zcGVjdE9wdHMuY29sb3JzKSA6XG5cdFx0dHR5LmlzYXR0eShwcm9jZXNzLnN0ZGVyci5mZCk7XG59XG5cbi8qKlxuICogQWRkcyBBTlNJIGNvbG9yIGVzY2FwZSBjb2RlcyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG5cdGNvbnN0IHtuYW1lc3BhY2U6IG5hbWUsIHVzZUNvbG9yc30gPSB0aGlzO1xuXG5cdGlmICh1c2VDb2xvcnMpIHtcblx0XHRjb25zdCBjID0gdGhpcy5jb2xvcjtcblx0XHRjb25zdCBjb2xvckNvZGUgPSAnXFx1MDAxQlszJyArIChjIDwgOCA/IGMgOiAnODs1OycgKyBjKTtcblx0XHRjb25zdCBwcmVmaXggPSBgICAke2NvbG9yQ29kZX07MW0ke25hbWV9IFxcdTAwMUJbMG1gO1xuXG5cdFx0YXJnc1swXSA9IHByZWZpeCArIGFyZ3NbMF0uc3BsaXQoJ1xcbicpLmpvaW4oJ1xcbicgKyBwcmVmaXgpO1xuXHRcdGFyZ3MucHVzaChjb2xvckNvZGUgKyAnbSsnICsgbW9kdWxlLmV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKSArICdcXHUwMDFCWzBtJyk7XG5cdH0gZWxzZSB7XG5cdFx0YXJnc1swXSA9IGdldERhdGUoKSArIG5hbWUgKyAnICcgKyBhcmdzWzBdO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdldERhdGUoKSB7XG5cdGlmIChleHBvcnRzLmluc3BlY3RPcHRzLmhpZGVEYXRlKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cdHJldHVybiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgKyAnICc7XG59XG5cbi8qKlxuICogSW52b2tlcyBgdXRpbC5mb3JtYXQoKWAgd2l0aCB0aGUgc3BlY2lmaWVkIGFyZ3VtZW50cyBhbmQgd3JpdGVzIHRvIHN0ZGVyci5cbiAqL1xuXG5mdW5jdGlvbiBsb2coLi4uYXJncykge1xuXHRyZXR1cm4gcHJvY2Vzcy5zdGRlcnIud3JpdGUodXRpbC5mb3JtYXQoLi4uYXJncykgKyAnXFxuJyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcblx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRwcm9jZXNzLmVudi5ERUJVRyA9IG5hbWVzcGFjZXM7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gSWYgeW91IHNldCBhIHByb2Nlc3MuZW52IGZpZWxkIHRvIG51bGwgb3IgdW5kZWZpbmVkLCBpdCBnZXRzIGNhc3QgdG8gdGhlXG5cdFx0Ly8gc3RyaW5nICdudWxsJyBvciAndW5kZWZpbmVkJy4gSnVzdCBkZWxldGUgaW5zdGVhZC5cblx0XHRkZWxldGUgcHJvY2Vzcy5lbnYuREVCVUc7XG5cdH1cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRyZXR1cm4gcHJvY2Vzcy5lbnYuREVCVUc7XG59XG5cbi8qKlxuICogSW5pdCBsb2dpYyBmb3IgYGRlYnVnYCBpbnN0YW5jZXMuXG4gKlxuICogQ3JlYXRlIGEgbmV3IGBpbnNwZWN0T3B0c2Agb2JqZWN0IGluIGNhc2UgYHVzZUNvbG9yc2AgaXMgc2V0XG4gKiBkaWZmZXJlbnRseSBmb3IgYSBwYXJ0aWN1bGFyIGBkZWJ1Z2AgaW5zdGFuY2UuXG4gKi9cblxuZnVuY3Rpb24gaW5pdChkZWJ1Zykge1xuXHRkZWJ1Zy5pbnNwZWN0T3B0cyA9IHt9O1xuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmluc3BlY3RPcHRzKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0ZGVidWcuaW5zcGVjdE9wdHNba2V5c1tpXV0gPSBleHBvcnRzLmluc3BlY3RPcHRzW2tleXNbaV1dO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVvIHRvIGB1dGlsLmluc3BlY3QoKWAsIGFsbCBvbiBhIHNpbmdsZSBsaW5lLlxuICovXG5cbmZvcm1hdHRlcnMubyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cylcblx0XHQuc3BsaXQoJ1xcbicpXG5cdFx0Lm1hcChzdHIgPT4gc3RyLnRyaW0oKSlcblx0XHQuam9pbignICcpO1xufTtcblxuLyoqXG4gKiBNYXAgJU8gdG8gYHV0aWwuaW5zcGVjdCgpYCwgYWxsb3dpbmcgbXVsdGlwbGUgbGluZXMgaWYgbmVlZGVkLlxuICovXG5cbmZvcm1hdHRlcnMuTyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cyk7XG59O1xuIiwidmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpLlN0cmVhbTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERlbGF5ZWRTdHJlYW07XG5mdW5jdGlvbiBEZWxheWVkU3RyZWFtKCkge1xuICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gIHRoaXMuZGF0YVNpemUgPSAwO1xuICB0aGlzLm1heERhdGFTaXplID0gMTAyNCAqIDEwMjQ7XG4gIHRoaXMucGF1c2VTdHJlYW0gPSB0cnVlO1xuXG4gIHRoaXMuX21heERhdGFTaXplRXhjZWVkZWQgPSBmYWxzZTtcbiAgdGhpcy5fcmVsZWFzZWQgPSBmYWxzZTtcbiAgdGhpcy5fYnVmZmVyZWRFdmVudHMgPSBbXTtcbn1cbnV0aWwuaW5oZXJpdHMoRGVsYXllZFN0cmVhbSwgU3RyZWFtKTtcblxuRGVsYXllZFN0cmVhbS5jcmVhdGUgPSBmdW5jdGlvbihzb3VyY2UsIG9wdGlvbnMpIHtcbiAgdmFyIGRlbGF5ZWRTdHJlYW0gPSBuZXcgdGhpcygpO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBmb3IgKHZhciBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgIGRlbGF5ZWRTdHJlYW1bb3B0aW9uXSA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgfVxuXG4gIGRlbGF5ZWRTdHJlYW0uc291cmNlID0gc291cmNlO1xuXG4gIHZhciByZWFsRW1pdCA9IHNvdXJjZS5lbWl0O1xuICBzb3VyY2UuZW1pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGRlbGF5ZWRTdHJlYW0uX2hhbmRsZUVtaXQoYXJndW1lbnRzKTtcbiAgICByZXR1cm4gcmVhbEVtaXQuYXBwbHkoc291cmNlLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHNvdXJjZS5vbignZXJyb3InLCBmdW5jdGlvbigpIHt9KTtcbiAgaWYgKGRlbGF5ZWRTdHJlYW0ucGF1c2VTdHJlYW0pIHtcbiAgICBzb3VyY2UucGF1c2UoKTtcbiAgfVxuXG4gIHJldHVybiBkZWxheWVkU3RyZWFtO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERlbGF5ZWRTdHJlYW0ucHJvdG90eXBlLCAncmVhZGFibGUnLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2UucmVhZGFibGU7XG4gIH1cbn0pO1xuXG5EZWxheWVkU3RyZWFtLnByb3RvdHlwZS5zZXRFbmNvZGluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zb3VyY2Uuc2V0RW5jb2RpbmcuYXBwbHkodGhpcy5zb3VyY2UsIGFyZ3VtZW50cyk7XG59O1xuXG5EZWxheWVkU3RyZWFtLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLl9yZWxlYXNlZCkge1xuICAgIHRoaXMucmVsZWFzZSgpO1xuICB9XG5cbiAgdGhpcy5zb3VyY2UucmVzdW1lKCk7XG59O1xuXG5EZWxheWVkU3RyZWFtLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNvdXJjZS5wYXVzZSgpO1xufTtcblxuRGVsYXllZFN0cmVhbS5wcm90b3R5cGUucmVsZWFzZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9yZWxlYXNlZCA9IHRydWU7XG5cbiAgdGhpcy5fYnVmZmVyZWRFdmVudHMuZm9yRWFjaChmdW5jdGlvbihhcmdzKSB7XG4gICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9LmJpbmQodGhpcykpO1xuICB0aGlzLl9idWZmZXJlZEV2ZW50cyA9IFtdO1xufTtcblxuRGVsYXllZFN0cmVhbS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgciA9IFN0cmVhbS5wcm90b3R5cGUucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB0aGlzLnJlc3VtZSgpO1xuICByZXR1cm4gcjtcbn07XG5cbkRlbGF5ZWRTdHJlYW0ucHJvdG90eXBlLl9oYW5kbGVFbWl0ID0gZnVuY3Rpb24oYXJncykge1xuICBpZiAodGhpcy5fcmVsZWFzZWQpIHtcbiAgICB0aGlzLmVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGFyZ3NbMF0gPT09ICdkYXRhJykge1xuICAgIHRoaXMuZGF0YVNpemUgKz0gYXJnc1sxXS5sZW5ndGg7XG4gICAgdGhpcy5fY2hlY2tJZk1heERhdGFTaXplRXhjZWVkZWQoKTtcbiAgfVxuXG4gIHRoaXMuX2J1ZmZlcmVkRXZlbnRzLnB1c2goYXJncyk7XG59O1xuXG5EZWxheWVkU3RyZWFtLnByb3RvdHlwZS5fY2hlY2tJZk1heERhdGFTaXplRXhjZWVkZWQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuX21heERhdGFTaXplRXhjZWVkZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5kYXRhU2l6ZSA8PSB0aGlzLm1heERhdGFTaXplKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5fbWF4RGF0YVNpemVFeGNlZWRlZCA9IHRydWU7XG4gIHZhciBtZXNzYWdlID1cbiAgICAnRGVsYXllZFN0cmVhbSNtYXhEYXRhU2l6ZSBvZiAnICsgdGhpcy5tYXhEYXRhU2l6ZSArICcgYnl0ZXMgZXhjZWVkZWQuJ1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKG1lc3NhZ2UpKTtcbn07XG4iLCJ2YXIgZGVidWc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIWRlYnVnKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qIGVzbGludCBnbG9iYWwtcmVxdWlyZTogb2ZmICovXG4gICAgICBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcImZvbGxvdy1yZWRpcmVjdHNcIik7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyAvKiAqLyB9XG4gICAgaWYgKHR5cGVvZiBkZWJ1ZyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHsgLyogKi8gfTtcbiAgICB9XG4gIH1cbiAgZGVidWcuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn07XG4iLCJ2YXIgdXJsID0gcmVxdWlyZShcInVybFwiKTtcbnZhciBVUkwgPSB1cmwuVVJMO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbnZhciBodHRwcyA9IHJlcXVpcmUoXCJodHRwc1wiKTtcbnZhciBXcml0YWJsZSA9IHJlcXVpcmUoXCJzdHJlYW1cIikuV3JpdGFibGU7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZShcImFzc2VydFwiKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoXCIuL2RlYnVnXCIpO1xuXG4vLyBDcmVhdGUgaGFuZGxlcnMgdGhhdCBwYXNzIGV2ZW50cyBmcm9tIG5hdGl2ZSByZXF1ZXN0c1xudmFyIGV2ZW50cyA9IFtcImFib3J0XCIsIFwiYWJvcnRlZFwiLCBcImNvbm5lY3RcIiwgXCJlcnJvclwiLCBcInNvY2tldFwiLCBcInRpbWVvdXRcIl07XG52YXIgZXZlbnRIYW5kbGVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5ldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgZXZlbnRIYW5kbGVyc1tldmVudF0gPSBmdW5jdGlvbiAoYXJnMSwgYXJnMiwgYXJnMykge1xuICAgIHRoaXMuX3JlZGlyZWN0YWJsZS5lbWl0KGV2ZW50LCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgfTtcbn0pO1xuXG52YXIgSW52YWxpZFVybEVycm9yID0gY3JlYXRlRXJyb3JUeXBlKFxuICBcIkVSUl9JTlZBTElEX1VSTFwiLFxuICBcIkludmFsaWQgVVJMXCIsXG4gIFR5cGVFcnJvclxuKTtcbi8vIEVycm9yIHR5cGVzIHdpdGggY29kZXNcbnZhciBSZWRpcmVjdGlvbkVycm9yID0gY3JlYXRlRXJyb3JUeXBlKFxuICBcIkVSUl9GUl9SRURJUkVDVElPTl9GQUlMVVJFXCIsXG4gIFwiUmVkaXJlY3RlZCByZXF1ZXN0IGZhaWxlZFwiXG4pO1xudmFyIFRvb01hbnlSZWRpcmVjdHNFcnJvciA9IGNyZWF0ZUVycm9yVHlwZShcbiAgXCJFUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTXCIsXG4gIFwiTWF4aW11bSBudW1iZXIgb2YgcmVkaXJlY3RzIGV4Y2VlZGVkXCJcbik7XG52YXIgTWF4Qm9keUxlbmd0aEV4Y2VlZGVkRXJyb3IgPSBjcmVhdGVFcnJvclR5cGUoXG4gIFwiRVJSX0ZSX01BWF9CT0RZX0xFTkdUSF9FWENFRURFRFwiLFxuICBcIlJlcXVlc3QgYm9keSBsYXJnZXIgdGhhbiBtYXhCb2R5TGVuZ3RoIGxpbWl0XCJcbik7XG52YXIgV3JpdGVBZnRlckVuZEVycm9yID0gY3JlYXRlRXJyb3JUeXBlKFxuICBcIkVSUl9TVFJFQU1fV1JJVEVfQUZURVJfRU5EXCIsXG4gIFwid3JpdGUgYWZ0ZXIgZW5kXCJcbik7XG5cbi8vIEFuIEhUVFAoUykgcmVxdWVzdCB0aGF0IGNhbiBiZSByZWRpcmVjdGVkXG5mdW5jdGlvbiBSZWRpcmVjdGFibGVSZXF1ZXN0KG9wdGlvbnMsIHJlc3BvbnNlQ2FsbGJhY2spIHtcbiAgLy8gSW5pdGlhbGl6ZSB0aGUgcmVxdWVzdFxuICBXcml0YWJsZS5jYWxsKHRoaXMpO1xuICB0aGlzLl9zYW5pdGl6ZU9wdGlvbnMob3B0aW9ucyk7XG4gIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICB0aGlzLl9lbmRlZCA9IGZhbHNlO1xuICB0aGlzLl9lbmRpbmcgPSBmYWxzZTtcbiAgdGhpcy5fcmVkaXJlY3RDb3VudCA9IDA7XG4gIHRoaXMuX3JlZGlyZWN0cyA9IFtdO1xuICB0aGlzLl9yZXF1ZXN0Qm9keUxlbmd0aCA9IDA7XG4gIHRoaXMuX3JlcXVlc3RCb2R5QnVmZmVycyA9IFtdO1xuXG4gIC8vIEF0dGFjaCBhIGNhbGxiYWNrIGlmIHBhc3NlZFxuICBpZiAocmVzcG9uc2VDYWxsYmFjaykge1xuICAgIHRoaXMub24oXCJyZXNwb25zZVwiLCByZXNwb25zZUNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFJlYWN0IHRvIHJlc3BvbnNlcyBvZiBuYXRpdmUgcmVxdWVzdHNcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9vbk5hdGl2ZVJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgc2VsZi5fcHJvY2Vzc1Jlc3BvbnNlKHJlc3BvbnNlKTtcbiAgfTtcblxuICAvLyBQZXJmb3JtIHRoZSBmaXJzdCByZXF1ZXN0XG4gIHRoaXMuX3BlcmZvcm1SZXF1ZXN0KCk7XG59XG5SZWRpcmVjdGFibGVSZXF1ZXN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoV3JpdGFibGUucHJvdG90eXBlKTtcblxuUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gIGFib3J0UmVxdWVzdCh0aGlzLl9jdXJyZW50UmVxdWVzdCk7XG4gIHRoaXMuZW1pdChcImFib3J0XCIpO1xufTtcblxuLy8gV3JpdGVzIGJ1ZmZlcmVkIGRhdGEgdG8gdGhlIGN1cnJlbnQgbmF0aXZlIHJlcXVlc3RcblJlZGlyZWN0YWJsZVJlcXVlc3QucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKGRhdGEsIGVuY29kaW5nLCBjYWxsYmFjaykge1xuICAvLyBXcml0aW5nIGlzIG5vdCBhbGxvd2VkIGlmIGVuZCBoYXMgYmVlbiBjYWxsZWRcbiAgaWYgKHRoaXMuX2VuZGluZykge1xuICAgIHRocm93IG5ldyBXcml0ZUFmdGVyRW5kRXJyb3IoKTtcbiAgfVxuXG4gIC8vIFZhbGlkYXRlIGlucHV0IGFuZCBzaGlmdCBwYXJhbWV0ZXJzIGlmIG5lY2Vzc2FyeVxuICBpZiAoIWlzU3RyaW5nKGRhdGEpICYmICFpc0J1ZmZlcihkYXRhKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJkYXRhIHNob3VsZCBiZSBhIHN0cmluZywgQnVmZmVyIG9yIFVpbnQ4QXJyYXlcIik7XG4gIH1cbiAgaWYgKGlzRnVuY3Rpb24oZW5jb2RpbmcpKSB7XG4gICAgY2FsbGJhY2sgPSBlbmNvZGluZztcbiAgICBlbmNvZGluZyA9IG51bGw7XG4gIH1cblxuICAvLyBJZ25vcmUgZW1wdHkgYnVmZmVycywgc2luY2Ugd3JpdGluZyB0aGVtIGRvZXNuJ3QgaW52b2tlIHRoZSBjYWxsYmFja1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvaXNzdWVzLzIyMDY2XG4gIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIE9ubHkgd3JpdGUgd2hlbiB3ZSBkb24ndCBleGNlZWQgdGhlIG1heGltdW0gYm9keSBsZW5ndGhcbiAgaWYgKHRoaXMuX3JlcXVlc3RCb2R5TGVuZ3RoICsgZGF0YS5sZW5ndGggPD0gdGhpcy5fb3B0aW9ucy5tYXhCb2R5TGVuZ3RoKSB7XG4gICAgdGhpcy5fcmVxdWVzdEJvZHlMZW5ndGggKz0gZGF0YS5sZW5ndGg7XG4gICAgdGhpcy5fcmVxdWVzdEJvZHlCdWZmZXJzLnB1c2goeyBkYXRhOiBkYXRhLCBlbmNvZGluZzogZW5jb2RpbmcgfSk7XG4gICAgdGhpcy5fY3VycmVudFJlcXVlc3Qud3JpdGUoZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKTtcbiAgfVxuICAvLyBFcnJvciB3aGVuIHdlIGV4Y2VlZCB0aGUgbWF4aW11bSBib2R5IGxlbmd0aFxuICBlbHNlIHtcbiAgICB0aGlzLmVtaXQoXCJlcnJvclwiLCBuZXcgTWF4Qm9keUxlbmd0aEV4Y2VlZGVkRXJyb3IoKSk7XG4gICAgdGhpcy5hYm9ydCgpO1xuICB9XG59O1xuXG4vLyBFbmRzIHRoZSBjdXJyZW50IG5hdGl2ZSByZXF1ZXN0XG5SZWRpcmVjdGFibGVSZXF1ZXN0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKSB7XG4gIC8vIFNoaWZ0IHBhcmFtZXRlcnMgaWYgbmVjZXNzYXJ5XG4gIGlmIChpc0Z1bmN0aW9uKGRhdGEpKSB7XG4gICAgY2FsbGJhY2sgPSBkYXRhO1xuICAgIGRhdGEgPSBlbmNvZGluZyA9IG51bGw7XG4gIH1cbiAgZWxzZSBpZiAoaXNGdW5jdGlvbihlbmNvZGluZykpIHtcbiAgICBjYWxsYmFjayA9IGVuY29kaW5nO1xuICAgIGVuY29kaW5nID0gbnVsbDtcbiAgfVxuXG4gIC8vIFdyaXRlIGRhdGEgaWYgbmVlZGVkIGFuZCBlbmRcbiAgaWYgKCFkYXRhKSB7XG4gICAgdGhpcy5fZW5kZWQgPSB0aGlzLl9lbmRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2N1cnJlbnRSZXF1ZXN0LmVuZChudWxsLCBudWxsLCBjYWxsYmFjayk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjdXJyZW50UmVxdWVzdCA9IHRoaXMuX2N1cnJlbnRSZXF1ZXN0O1xuICAgIHRoaXMud3JpdGUoZGF0YSwgZW5jb2RpbmcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuX2VuZGVkID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRSZXF1ZXN0LmVuZChudWxsLCBudWxsLCBjYWxsYmFjayk7XG4gICAgfSk7XG4gICAgdGhpcy5fZW5kaW5nID0gdHJ1ZTtcbiAgfVxufTtcblxuLy8gU2V0cyBhIGhlYWRlciB2YWx1ZSBvbiB0aGUgY3VycmVudCBuYXRpdmUgcmVxdWVzdFxuUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUuc2V0SGVhZGVyID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX29wdGlvbnMuaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xuICB0aGlzLl9jdXJyZW50UmVxdWVzdC5zZXRIZWFkZXIobmFtZSwgdmFsdWUpO1xufTtcblxuLy8gQ2xlYXJzIGEgaGVhZGVyIHZhbHVlIG9uIHRoZSBjdXJyZW50IG5hdGl2ZSByZXF1ZXN0XG5SZWRpcmVjdGFibGVSZXF1ZXN0LnByb3RvdHlwZS5yZW1vdmVIZWFkZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICBkZWxldGUgdGhpcy5fb3B0aW9ucy5oZWFkZXJzW25hbWVdO1xuICB0aGlzLl9jdXJyZW50UmVxdWVzdC5yZW1vdmVIZWFkZXIobmFtZSk7XG59O1xuXG4vLyBHbG9iYWwgdGltZW91dCBmb3IgYWxsIHVuZGVybHlpbmcgcmVxdWVzdHNcblJlZGlyZWN0YWJsZVJlcXVlc3QucHJvdG90eXBlLnNldFRpbWVvdXQgPSBmdW5jdGlvbiAobXNlY3MsIGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvLyBEZXN0cm95cyB0aGUgc29ja2V0IG9uIHRpbWVvdXRcbiAgZnVuY3Rpb24gZGVzdHJveU9uVGltZW91dChzb2NrZXQpIHtcbiAgICBzb2NrZXQuc2V0VGltZW91dChtc2Vjcyk7XG4gICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKFwidGltZW91dFwiLCBzb2NrZXQuZGVzdHJveSk7XG4gICAgc29ja2V0LmFkZExpc3RlbmVyKFwidGltZW91dFwiLCBzb2NrZXQuZGVzdHJveSk7XG4gIH1cblxuICAvLyBTZXRzIHVwIGEgdGltZXIgdG8gdHJpZ2dlciBhIHRpbWVvdXQgZXZlbnRcbiAgZnVuY3Rpb24gc3RhcnRUaW1lcihzb2NrZXQpIHtcbiAgICBpZiAoc2VsZi5fdGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3RpbWVvdXQpO1xuICAgIH1cbiAgICBzZWxmLl90aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLmVtaXQoXCJ0aW1lb3V0XCIpO1xuICAgICAgY2xlYXJUaW1lcigpO1xuICAgIH0sIG1zZWNzKTtcbiAgICBkZXN0cm95T25UaW1lb3V0KHNvY2tldCk7XG4gIH1cblxuICAvLyBTdG9wcyBhIHRpbWVvdXQgZnJvbSB0cmlnZ2VyaW5nXG4gIGZ1bmN0aW9uIGNsZWFyVGltZXIoKSB7XG4gICAgLy8gQ2xlYXIgdGhlIHRpbWVvdXRcbiAgICBpZiAoc2VsZi5fdGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3RpbWVvdXQpO1xuICAgICAgc2VsZi5fdGltZW91dCA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gQ2xlYW4gdXAgYWxsIGF0dGFjaGVkIGxpc3RlbmVyc1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoXCJhYm9ydFwiLCBjbGVhclRpbWVyKTtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKFwiZXJyb3JcIiwgY2xlYXJUaW1lcik7XG4gICAgc2VsZi5yZW1vdmVMaXN0ZW5lcihcInJlc3BvbnNlXCIsIGNsZWFyVGltZXIpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgc2VsZi5yZW1vdmVMaXN0ZW5lcihcInRpbWVvdXRcIiwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAoIXNlbGYuc29ja2V0KSB7XG4gICAgICBzZWxmLl9jdXJyZW50UmVxdWVzdC5yZW1vdmVMaXN0ZW5lcihcInNvY2tldFwiLCBzdGFydFRpbWVyKTtcbiAgICB9XG4gIH1cblxuICAvLyBBdHRhY2ggY2FsbGJhY2sgaWYgcGFzc2VkXG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMub24oXCJ0aW1lb3V0XCIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFN0YXJ0IHRoZSB0aW1lciBpZiBvciB3aGVuIHRoZSBzb2NrZXQgaXMgb3BlbmVkXG4gIGlmICh0aGlzLnNvY2tldCkge1xuICAgIHN0YXJ0VGltZXIodGhpcy5zb2NrZXQpO1xuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMuX2N1cnJlbnRSZXF1ZXN0Lm9uY2UoXCJzb2NrZXRcIiwgc3RhcnRUaW1lcik7XG4gIH1cblxuICAvLyBDbGVhbiB1cCBvbiBldmVudHNcbiAgdGhpcy5vbihcInNvY2tldFwiLCBkZXN0cm95T25UaW1lb3V0KTtcbiAgdGhpcy5vbihcImFib3J0XCIsIGNsZWFyVGltZXIpO1xuICB0aGlzLm9uKFwiZXJyb3JcIiwgY2xlYXJUaW1lcik7XG4gIHRoaXMub24oXCJyZXNwb25zZVwiLCBjbGVhclRpbWVyKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIFByb3h5IGFsbCBvdGhlciBwdWJsaWMgQ2xpZW50UmVxdWVzdCBtZXRob2RzXG5bXG4gIFwiZmx1c2hIZWFkZXJzXCIsIFwiZ2V0SGVhZGVyXCIsXG4gIFwic2V0Tm9EZWxheVwiLCBcInNldFNvY2tldEtlZXBBbGl2ZVwiLFxuXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRSZXF1ZXN0W21ldGhvZF0oYSwgYik7XG4gIH07XG59KTtcblxuLy8gUHJveHkgYWxsIHB1YmxpYyBDbGllbnRSZXF1ZXN0IHByb3BlcnRpZXNcbltcImFib3J0ZWRcIiwgXCJjb25uZWN0aW9uXCIsIFwic29ja2V0XCJdLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWRpcmVjdGFibGVSZXF1ZXN0LnByb3RvdHlwZSwgcHJvcGVydHksIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRSZXF1ZXN0W3Byb3BlcnR5XTsgfSxcbiAgfSk7XG59KTtcblxuUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUuX3Nhbml0aXplT3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIC8vIEVuc3VyZSBoZWFkZXJzIGFyZSBhbHdheXMgcHJlc2VudFxuICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHt9O1xuICB9XG5cbiAgLy8gU2luY2UgaHR0cC5yZXF1ZXN0IHRyZWF0cyBob3N0IGFzIGFuIGFsaWFzIG9mIGhvc3RuYW1lLFxuICAvLyBidXQgdGhlIHVybCBtb2R1bGUgaW50ZXJwcmV0cyBob3N0IGFzIGhvc3RuYW1lIHBsdXMgcG9ydCxcbiAgLy8gZWxpbWluYXRlIHRoZSBob3N0IHByb3BlcnR5IHRvIGF2b2lkIGNvbmZ1c2lvbi5cbiAgaWYgKG9wdGlvbnMuaG9zdCkge1xuICAgIC8vIFVzZSBob3N0bmFtZSBpZiBzZXQsIGJlY2F1c2UgaXQgaGFzIHByZWNlZGVuY2VcbiAgICBpZiAoIW9wdGlvbnMuaG9zdG5hbWUpIHtcbiAgICAgIG9wdGlvbnMuaG9zdG5hbWUgPSBvcHRpb25zLmhvc3Q7XG4gICAgfVxuICAgIGRlbGV0ZSBvcHRpb25zLmhvc3Q7XG4gIH1cblxuICAvLyBDb21wbGV0ZSB0aGUgVVJMIG9iamVjdCB3aGVuIG5lY2Vzc2FyeVxuICBpZiAoIW9wdGlvbnMucGF0aG5hbWUgJiYgb3B0aW9ucy5wYXRoKSB7XG4gICAgdmFyIHNlYXJjaFBvcyA9IG9wdGlvbnMucGF0aC5pbmRleE9mKFwiP1wiKTtcbiAgICBpZiAoc2VhcmNoUG9zIDwgMCkge1xuICAgICAgb3B0aW9ucy5wYXRobmFtZSA9IG9wdGlvbnMucGF0aDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBvcHRpb25zLnBhdGhuYW1lID0gb3B0aW9ucy5wYXRoLnN1YnN0cmluZygwLCBzZWFyY2hQb3MpO1xuICAgICAgb3B0aW9ucy5zZWFyY2ggPSBvcHRpb25zLnBhdGguc3Vic3RyaW5nKHNlYXJjaFBvcyk7XG4gICAgfVxuICB9XG59O1xuXG5cbi8vIEV4ZWN1dGVzIHRoZSBuZXh0IG5hdGl2ZSByZXF1ZXN0IChpbml0aWFsIG9yIHJlZGlyZWN0KVxuUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUuX3BlcmZvcm1SZXF1ZXN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBMb2FkIHRoZSBuYXRpdmUgcHJvdG9jb2xcbiAgdmFyIHByb3RvY29sID0gdGhpcy5fb3B0aW9ucy5wcm90b2NvbDtcbiAgdmFyIG5hdGl2ZVByb3RvY29sID0gdGhpcy5fb3B0aW9ucy5uYXRpdmVQcm90b2NvbHNbcHJvdG9jb2xdO1xuICBpZiAoIW5hdGl2ZVByb3RvY29sKSB7XG4gICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgbmV3IFR5cGVFcnJvcihcIlVuc3VwcG9ydGVkIHByb3RvY29sIFwiICsgcHJvdG9jb2wpKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBJZiBzcGVjaWZpZWQsIHVzZSB0aGUgYWdlbnQgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvdG9jb2xcbiAgLy8gKEhUVFAgYW5kIEhUVFBTIHVzZSBkaWZmZXJlbnQgdHlwZXMgb2YgYWdlbnRzKVxuICBpZiAodGhpcy5fb3B0aW9ucy5hZ2VudHMpIHtcbiAgICB2YXIgc2NoZW1lID0gcHJvdG9jb2wuc2xpY2UoMCwgLTEpO1xuICAgIHRoaXMuX29wdGlvbnMuYWdlbnQgPSB0aGlzLl9vcHRpb25zLmFnZW50c1tzY2hlbWVdO1xuICB9XG5cbiAgLy8gQ3JlYXRlIHRoZSBuYXRpdmUgcmVxdWVzdCBhbmQgc2V0IHVwIGl0cyBldmVudCBoYW5kbGVyc1xuICB2YXIgcmVxdWVzdCA9IHRoaXMuX2N1cnJlbnRSZXF1ZXN0ID1cbiAgICAgICAgbmF0aXZlUHJvdG9jb2wucmVxdWVzdCh0aGlzLl9vcHRpb25zLCB0aGlzLl9vbk5hdGl2ZVJlc3BvbnNlKTtcbiAgcmVxdWVzdC5fcmVkaXJlY3RhYmxlID0gdGhpcztcbiAgZm9yICh2YXIgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgcmVxdWVzdC5vbihldmVudCwgZXZlbnRIYW5kbGVyc1tldmVudF0pO1xuICB9XG5cbiAgLy8gUkZDNzIzMMKnNS4zLjE6IFdoZW4gbWFraW5nIGEgcmVxdWVzdCBkaXJlY3RseSB0byBhbiBvcmlnaW4gc2VydmVyLCBb4oCmXVxuICAvLyBhIGNsaWVudCBNVVNUIHNlbmQgb25seSB0aGUgYWJzb2x1dGUgcGF0aCBb4oCmXSBhcyB0aGUgcmVxdWVzdC10YXJnZXQuXG4gIHRoaXMuX2N1cnJlbnRVcmwgPSAvXlxcLy8udGVzdCh0aGlzLl9vcHRpb25zLnBhdGgpID9cbiAgICB1cmwuZm9ybWF0KHRoaXMuX29wdGlvbnMpIDpcbiAgICAvLyBXaGVuIG1ha2luZyBhIHJlcXVlc3QgdG8gYSBwcm94eSwgW+KApl1cbiAgICAvLyBhIGNsaWVudCBNVVNUIHNlbmQgdGhlIHRhcmdldCBVUkkgaW4gYWJzb2x1dGUtZm9ybSBb4oCmXS5cbiAgICB0aGlzLl9vcHRpb25zLnBhdGg7XG5cbiAgLy8gRW5kIGEgcmVkaXJlY3RlZCByZXF1ZXN0XG4gIC8vIChUaGUgZmlyc3QgcmVxdWVzdCBtdXN0IGJlIGVuZGVkIGV4cGxpY2l0bHkgd2l0aCBSZWRpcmVjdGFibGVSZXF1ZXN0I2VuZClcbiAgaWYgKHRoaXMuX2lzUmVkaXJlY3QpIHtcbiAgICAvLyBXcml0ZSB0aGUgcmVxdWVzdCBlbnRpdHkgYW5kIGVuZFxuICAgIHZhciBpID0gMDtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1ZmZlcnMgPSB0aGlzLl9yZXF1ZXN0Qm9keUJ1ZmZlcnM7XG4gICAgKGZ1bmN0aW9uIHdyaXRlTmV4dChlcnJvcikge1xuICAgICAgLy8gT25seSB3cml0ZSBpZiB0aGlzIHJlcXVlc3QgaGFzIG5vdCBiZWVuIHJlZGlyZWN0ZWQgeWV0XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHJlcXVlc3QgPT09IHNlbGYuX2N1cnJlbnRSZXF1ZXN0KSB7XG4gICAgICAgIC8vIFJlcG9ydCBhbnkgd3JpdGUgZXJyb3JzXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBzZWxmLmVtaXQoXCJlcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV3JpdGUgdGhlIG5leHQgYnVmZmVyIGlmIHRoZXJlIGFyZSBzdGlsbCBsZWZ0XG4gICAgICAgIGVsc2UgaWYgKGkgPCBidWZmZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBidWZmZXIgPSBidWZmZXJzW2krK107XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgICBpZiAoIXJlcXVlc3QuZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJlcXVlc3Qud3JpdGUoYnVmZmVyLmRhdGEsIGJ1ZmZlci5lbmNvZGluZywgd3JpdGVOZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW5kIHRoZSByZXF1ZXN0IGlmIGBlbmRgIGhhcyBiZWVuIGNhbGxlZCBvbiB1c1xuICAgICAgICBlbHNlIGlmIChzZWxmLl9lbmRlZCkge1xuICAgICAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KCkpO1xuICB9XG59O1xuXG4vLyBQcm9jZXNzZXMgYSByZXNwb25zZSBmcm9tIHRoZSBjdXJyZW50IG5hdGl2ZSByZXF1ZXN0XG5SZWRpcmVjdGFibGVSZXF1ZXN0LnByb3RvdHlwZS5fcHJvY2Vzc1Jlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gIC8vIFN0b3JlIHRoZSByZWRpcmVjdGVkIHJlc3BvbnNlXG4gIHZhciBzdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzQ29kZTtcbiAgaWYgKHRoaXMuX29wdGlvbnMudHJhY2tSZWRpcmVjdHMpIHtcbiAgICB0aGlzLl9yZWRpcmVjdHMucHVzaCh7XG4gICAgICB1cmw6IHRoaXMuX2N1cnJlbnRVcmwsXG4gICAgICBoZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgc3RhdHVzQ29kZTogc3RhdHVzQ29kZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFJGQzcyMzHCpzYuNDogVGhlIDN4eCAoUmVkaXJlY3Rpb24pIGNsYXNzIG9mIHN0YXR1cyBjb2RlIGluZGljYXRlc1xuICAvLyB0aGF0IGZ1cnRoZXIgYWN0aW9uIG5lZWRzIHRvIGJlIHRha2VuIGJ5IHRoZSB1c2VyIGFnZW50IGluIG9yZGVyIHRvXG4gIC8vIGZ1bGZpbGwgdGhlIHJlcXVlc3QuIElmIGEgTG9jYXRpb24gaGVhZGVyIGZpZWxkIGlzIHByb3ZpZGVkLFxuICAvLyB0aGUgdXNlciBhZ2VudCBNQVkgYXV0b21hdGljYWxseSByZWRpcmVjdCBpdHMgcmVxdWVzdCB0byB0aGUgVVJJXG4gIC8vIHJlZmVyZW5jZWQgYnkgdGhlIExvY2F0aW9uIGZpZWxkIHZhbHVlLFxuICAvLyBldmVuIGlmIHRoZSBzcGVjaWZpYyBzdGF0dXMgY29kZSBpcyBub3QgdW5kZXJzdG9vZC5cblxuICAvLyBJZiB0aGUgcmVzcG9uc2UgaXMgbm90IGEgcmVkaXJlY3Q7IHJldHVybiBpdCBhcy1pc1xuICB2YXIgbG9jYXRpb24gPSByZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uO1xuICBpZiAoIWxvY2F0aW9uIHx8IHRoaXMuX29wdGlvbnMuZm9sbG93UmVkaXJlY3RzID09PSBmYWxzZSB8fFxuICAgICAgc3RhdHVzQ29kZSA8IDMwMCB8fCBzdGF0dXNDb2RlID49IDQwMCkge1xuICAgIHJlc3BvbnNlLnJlc3BvbnNlVXJsID0gdGhpcy5fY3VycmVudFVybDtcbiAgICByZXNwb25zZS5yZWRpcmVjdHMgPSB0aGlzLl9yZWRpcmVjdHM7XG4gICAgdGhpcy5lbWl0KFwicmVzcG9uc2VcIiwgcmVzcG9uc2UpO1xuXG4gICAgLy8gQ2xlYW4gdXBcbiAgICB0aGlzLl9yZXF1ZXN0Qm9keUJ1ZmZlcnMgPSBbXTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBUaGUgcmVzcG9uc2UgaXMgYSByZWRpcmVjdCwgc28gYWJvcnQgdGhlIGN1cnJlbnQgcmVxdWVzdFxuICBhYm9ydFJlcXVlc3QodGhpcy5fY3VycmVudFJlcXVlc3QpO1xuICAvLyBEaXNjYXJkIHRoZSByZW1haW5kZXIgb2YgdGhlIHJlc3BvbnNlIHRvIGF2b2lkIHdhaXRpbmcgZm9yIGRhdGFcbiAgcmVzcG9uc2UuZGVzdHJveSgpO1xuXG4gIC8vIFJGQzcyMzHCpzYuNDogQSBjbGllbnQgU0hPVUxEIGRldGVjdCBhbmQgaW50ZXJ2ZW5lXG4gIC8vIGluIGN5Y2xpY2FsIHJlZGlyZWN0aW9ucyAoaS5lLiwgXCJpbmZpbml0ZVwiIHJlZGlyZWN0aW9uIGxvb3BzKS5cbiAgaWYgKCsrdGhpcy5fcmVkaXJlY3RDb3VudCA+IHRoaXMuX29wdGlvbnMubWF4UmVkaXJlY3RzKSB7XG4gICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgbmV3IFRvb01hbnlSZWRpcmVjdHNFcnJvcigpKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBTdG9yZSB0aGUgcmVxdWVzdCBoZWFkZXJzIGlmIGFwcGxpY2FibGVcbiAgdmFyIHJlcXVlc3RIZWFkZXJzO1xuICB2YXIgYmVmb3JlUmVkaXJlY3QgPSB0aGlzLl9vcHRpb25zLmJlZm9yZVJlZGlyZWN0O1xuICBpZiAoYmVmb3JlUmVkaXJlY3QpIHtcbiAgICByZXF1ZXN0SGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgLy8gVGhlIEhvc3QgaGVhZGVyIHdhcyBzZXQgYnkgbmF0aXZlUHJvdG9jb2wucmVxdWVzdFxuICAgICAgSG9zdDogcmVzcG9uc2UucmVxLmdldEhlYWRlcihcImhvc3RcIiksXG4gICAgfSwgdGhpcy5fb3B0aW9ucy5oZWFkZXJzKTtcbiAgfVxuXG4gIC8vIFJGQzcyMzHCpzYuNDogQXV0b21hdGljIHJlZGlyZWN0aW9uIG5lZWRzIHRvIGRvbmUgd2l0aFxuICAvLyBjYXJlIGZvciBtZXRob2RzIG5vdCBrbm93biB0byBiZSBzYWZlLCBb4oCmXVxuICAvLyBSRkM3MjMxwqc2LjQuMuKAkzM6IEZvciBoaXN0b3JpY2FsIHJlYXNvbnMsIGEgdXNlciBhZ2VudCBNQVkgY2hhbmdlXG4gIC8vIHRoZSByZXF1ZXN0IG1ldGhvZCBmcm9tIFBPU1QgdG8gR0VUIGZvciB0aGUgc3Vic2VxdWVudCByZXF1ZXN0LlxuICB2YXIgbWV0aG9kID0gdGhpcy5fb3B0aW9ucy5tZXRob2Q7XG4gIGlmICgoc3RhdHVzQ29kZSA9PT0gMzAxIHx8IHN0YXR1c0NvZGUgPT09IDMwMikgJiYgdGhpcy5fb3B0aW9ucy5tZXRob2QgPT09IFwiUE9TVFwiIHx8XG4gICAgICAvLyBSRkM3MjMxwqc2LjQuNDogVGhlIDMwMyAoU2VlIE90aGVyKSBzdGF0dXMgY29kZSBpbmRpY2F0ZXMgdGhhdFxuICAgICAgLy8gdGhlIHNlcnZlciBpcyByZWRpcmVjdGluZyB0aGUgdXNlciBhZ2VudCB0byBhIGRpZmZlcmVudCByZXNvdXJjZSBb4oCmXVxuICAgICAgLy8gQSB1c2VyIGFnZW50IGNhbiBwZXJmb3JtIGEgcmV0cmlldmFsIHJlcXVlc3QgdGFyZ2V0aW5nIHRoYXQgVVJJXG4gICAgICAvLyAoYSBHRVQgb3IgSEVBRCByZXF1ZXN0IGlmIHVzaW5nIEhUVFApIFvigKZdXG4gICAgICAoc3RhdHVzQ29kZSA9PT0gMzAzKSAmJiAhL14oPzpHRVR8SEVBRCkkLy50ZXN0KHRoaXMuX29wdGlvbnMubWV0aG9kKSkge1xuICAgIHRoaXMuX29wdGlvbnMubWV0aG9kID0gXCJHRVRcIjtcbiAgICAvLyBEcm9wIGEgcG9zc2libGUgZW50aXR5IGFuZCBoZWFkZXJzIHJlbGF0ZWQgdG8gaXRcbiAgICB0aGlzLl9yZXF1ZXN0Qm9keUJ1ZmZlcnMgPSBbXTtcbiAgICByZW1vdmVNYXRjaGluZ0hlYWRlcnMoL15jb250ZW50LS9pLCB0aGlzLl9vcHRpb25zLmhlYWRlcnMpO1xuICB9XG5cbiAgLy8gRHJvcCB0aGUgSG9zdCBoZWFkZXIsIGFzIHRoZSByZWRpcmVjdCBtaWdodCBsZWFkIHRvIGEgZGlmZmVyZW50IGhvc3RcbiAgdmFyIGN1cnJlbnRIb3N0SGVhZGVyID0gcmVtb3ZlTWF0Y2hpbmdIZWFkZXJzKC9eaG9zdCQvaSwgdGhpcy5fb3B0aW9ucy5oZWFkZXJzKTtcblxuICAvLyBJZiB0aGUgcmVkaXJlY3QgaXMgcmVsYXRpdmUsIGNhcnJ5IG92ZXIgdGhlIGhvc3Qgb2YgdGhlIGxhc3QgcmVxdWVzdFxuICB2YXIgY3VycmVudFVybFBhcnRzID0gdXJsLnBhcnNlKHRoaXMuX2N1cnJlbnRVcmwpO1xuICB2YXIgY3VycmVudEhvc3QgPSBjdXJyZW50SG9zdEhlYWRlciB8fCBjdXJyZW50VXJsUGFydHMuaG9zdDtcbiAgdmFyIGN1cnJlbnRVcmwgPSAvXlxcdys6Ly50ZXN0KGxvY2F0aW9uKSA/IHRoaXMuX2N1cnJlbnRVcmwgOlxuICAgIHVybC5mb3JtYXQoT2JqZWN0LmFzc2lnbihjdXJyZW50VXJsUGFydHMsIHsgaG9zdDogY3VycmVudEhvc3QgfSkpO1xuXG4gIC8vIERldGVybWluZSB0aGUgVVJMIG9mIHRoZSByZWRpcmVjdGlvblxuICB2YXIgcmVkaXJlY3RVcmw7XG4gIHRyeSB7XG4gICAgcmVkaXJlY3RVcmwgPSB1cmwucmVzb2x2ZShjdXJyZW50VXJsLCBsb2NhdGlvbik7XG4gIH1cbiAgY2F0Y2ggKGNhdXNlKSB7XG4gICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgbmV3IFJlZGlyZWN0aW9uRXJyb3IoeyBjYXVzZTogY2F1c2UgfSkpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIENyZWF0ZSB0aGUgcmVkaXJlY3RlZCByZXF1ZXN0XG4gIGRlYnVnKFwicmVkaXJlY3RpbmcgdG9cIiwgcmVkaXJlY3RVcmwpO1xuICB0aGlzLl9pc1JlZGlyZWN0ID0gdHJ1ZTtcbiAgdmFyIHJlZGlyZWN0VXJsUGFydHMgPSB1cmwucGFyc2UocmVkaXJlY3RVcmwpO1xuICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIHJlZGlyZWN0VXJsUGFydHMpO1xuXG4gIC8vIERyb3AgY29uZmlkZW50aWFsIGhlYWRlcnMgd2hlbiByZWRpcmVjdGluZyB0byBhIGxlc3Mgc2VjdXJlIHByb3RvY29sXG4gIC8vIG9yIHRvIGEgZGlmZmVyZW50IGRvbWFpbiB0aGF0IGlzIG5vdCBhIHN1cGVyZG9tYWluXG4gIGlmIChyZWRpcmVjdFVybFBhcnRzLnByb3RvY29sICE9PSBjdXJyZW50VXJsUGFydHMucHJvdG9jb2wgJiZcbiAgICAgcmVkaXJlY3RVcmxQYXJ0cy5wcm90b2NvbCAhPT0gXCJodHRwczpcIiB8fFxuICAgICByZWRpcmVjdFVybFBhcnRzLmhvc3QgIT09IGN1cnJlbnRIb3N0ICYmXG4gICAgICFpc1N1YmRvbWFpbihyZWRpcmVjdFVybFBhcnRzLmhvc3QsIGN1cnJlbnRIb3N0KSkge1xuICAgIHJlbW92ZU1hdGNoaW5nSGVhZGVycygvXig/OmF1dGhvcml6YXRpb258Y29va2llKSQvaSwgdGhpcy5fb3B0aW9ucy5oZWFkZXJzKTtcbiAgfVxuXG4gIC8vIEV2YWx1YXRlIHRoZSBiZWZvcmVSZWRpcmVjdCBjYWxsYmFja1xuICBpZiAoaXNGdW5jdGlvbihiZWZvcmVSZWRpcmVjdCkpIHtcbiAgICB2YXIgcmVzcG9uc2VEZXRhaWxzID0ge1xuICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIHN0YXR1c0NvZGU6IHN0YXR1c0NvZGUsXG4gICAgfTtcbiAgICB2YXIgcmVxdWVzdERldGFpbHMgPSB7XG4gICAgICB1cmw6IGN1cnJlbnRVcmwsXG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIGhlYWRlcnM6IHJlcXVlc3RIZWFkZXJzLFxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIGJlZm9yZVJlZGlyZWN0KHRoaXMuX29wdGlvbnMsIHJlc3BvbnNlRGV0YWlscywgcmVxdWVzdERldGFpbHMpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmVtaXQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zYW5pdGl6ZU9wdGlvbnModGhpcy5fb3B0aW9ucyk7XG4gIH1cblxuICAvLyBQZXJmb3JtIHRoZSByZWRpcmVjdGVkIHJlcXVlc3RcbiAgdHJ5IHtcbiAgICB0aGlzLl9wZXJmb3JtUmVxdWVzdCgpO1xuICB9XG4gIGNhdGNoIChjYXVzZSkge1xuICAgIHRoaXMuZW1pdChcImVycm9yXCIsIG5ldyBSZWRpcmVjdGlvbkVycm9yKHsgY2F1c2U6IGNhdXNlIH0pKTtcbiAgfVxufTtcblxuLy8gV3JhcHMgdGhlIGtleS92YWx1ZSBvYmplY3Qgb2YgcHJvdG9jb2xzIHdpdGggcmVkaXJlY3QgZnVuY3Rpb25hbGl0eVxuZnVuY3Rpb24gd3JhcChwcm90b2NvbHMpIHtcbiAgLy8gRGVmYXVsdCBzZXR0aW5nc1xuICB2YXIgZXhwb3J0cyA9IHtcbiAgICBtYXhSZWRpcmVjdHM6IDIxLFxuICAgIG1heEJvZHlMZW5ndGg6IDEwICogMTAyNCAqIDEwMjQsXG4gIH07XG5cbiAgLy8gV3JhcCBlYWNoIHByb3RvY29sXG4gIHZhciBuYXRpdmVQcm90b2NvbHMgPSB7fTtcbiAgT2JqZWN0LmtleXMocHJvdG9jb2xzKS5mb3JFYWNoKGZ1bmN0aW9uIChzY2hlbWUpIHtcbiAgICB2YXIgcHJvdG9jb2wgPSBzY2hlbWUgKyBcIjpcIjtcbiAgICB2YXIgbmF0aXZlUHJvdG9jb2wgPSBuYXRpdmVQcm90b2NvbHNbcHJvdG9jb2xdID0gcHJvdG9jb2xzW3NjaGVtZV07XG4gICAgdmFyIHdyYXBwZWRQcm90b2NvbCA9IGV4cG9ydHNbc2NoZW1lXSA9IE9iamVjdC5jcmVhdGUobmF0aXZlUHJvdG9jb2wpO1xuXG4gICAgLy8gRXhlY3V0ZXMgYSByZXF1ZXN0LCBmb2xsb3dpbmcgcmVkaXJlY3RzXG4gICAgZnVuY3Rpb24gcmVxdWVzdChpbnB1dCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgIC8vIFBhcnNlIHBhcmFtZXRlcnNcbiAgICAgIGlmIChpc1N0cmluZyhpbnB1dCkpIHtcbiAgICAgICAgdmFyIHBhcnNlZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwYXJzZWQgPSB1cmxUb09wdGlvbnMobmV3IFVSTChpbnB1dCkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgIHBhcnNlZCA9IHVybC5wYXJzZShpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1N0cmluZyhwYXJzZWQucHJvdG9jb2wpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRVcmxFcnJvcih7IGlucHV0IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0ID0gcGFyc2VkO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoVVJMICYmIChpbnB1dCBpbnN0YW5jZW9mIFVSTCkpIHtcbiAgICAgICAgaW5wdXQgPSB1cmxUb09wdGlvbnMoaW5wdXQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IGlucHV0O1xuICAgICAgICBpbnB1dCA9IHsgcHJvdG9jb2w6IHByb3RvY29sIH07XG4gICAgICB9XG4gICAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgZGVmYXVsdHNcbiAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgbWF4UmVkaXJlY3RzOiBleHBvcnRzLm1heFJlZGlyZWN0cyxcbiAgICAgICAgbWF4Qm9keUxlbmd0aDogZXhwb3J0cy5tYXhCb2R5TGVuZ3RoLFxuICAgICAgfSwgaW5wdXQsIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5uYXRpdmVQcm90b2NvbHMgPSBuYXRpdmVQcm90b2NvbHM7XG4gICAgICBpZiAoIWlzU3RyaW5nKG9wdGlvbnMuaG9zdCkgJiYgIWlzU3RyaW5nKG9wdGlvbnMuaG9zdG5hbWUpKSB7XG4gICAgICAgIG9wdGlvbnMuaG9zdG5hbWUgPSBcIjo6MVwiO1xuICAgICAgfVxuXG4gICAgICBhc3NlcnQuZXF1YWwob3B0aW9ucy5wcm90b2NvbCwgcHJvdG9jb2wsIFwicHJvdG9jb2wgbWlzbWF0Y2hcIik7XG4gICAgICBkZWJ1ZyhcIm9wdGlvbnNcIiwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gbmV3IFJlZGlyZWN0YWJsZVJlcXVlc3Qob3B0aW9ucywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8vIEV4ZWN1dGVzIGEgR0VUIHJlcXVlc3QsIGZvbGxvd2luZyByZWRpcmVjdHNcbiAgICBmdW5jdGlvbiBnZXQoaW5wdXQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgd3JhcHBlZFJlcXVlc3QgPSB3cmFwcGVkUHJvdG9jb2wucmVxdWVzdChpbnB1dCwgb3B0aW9ucywgY2FsbGJhY2spO1xuICAgICAgd3JhcHBlZFJlcXVlc3QuZW5kKCk7XG4gICAgICByZXR1cm4gd3JhcHBlZFJlcXVlc3Q7XG4gICAgfVxuXG4gICAgLy8gRXhwb3NlIHRoZSBwcm9wZXJ0aWVzIG9uIHRoZSB3cmFwcGVkIHByb3RvY29sXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMod3JhcHBlZFByb3RvY29sLCB7XG4gICAgICByZXF1ZXN0OiB7IHZhbHVlOiByZXF1ZXN0LCBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0sXG4gICAgICBnZXQ6IHsgdmFsdWU6IGdldCwgY29uZmlndXJhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9LFxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGV4cG9ydHM7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5mdW5jdGlvbiBub29wKCkgeyAvKiBlbXB0eSAqLyB9XG5cbi8vIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvbWFzdGVyL2xpYi9pbnRlcm5hbC91cmwuanNcbmZ1bmN0aW9uIHVybFRvT3B0aW9ucyh1cmxPYmplY3QpIHtcbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgcHJvdG9jb2w6IHVybE9iamVjdC5wcm90b2NvbCxcbiAgICBob3N0bmFtZTogdXJsT2JqZWN0Lmhvc3RuYW1lLnN0YXJ0c1dpdGgoXCJbXCIpID9cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICB1cmxPYmplY3QuaG9zdG5hbWUuc2xpY2UoMSwgLTEpIDpcbiAgICAgIHVybE9iamVjdC5ob3N0bmFtZSxcbiAgICBoYXNoOiB1cmxPYmplY3QuaGFzaCxcbiAgICBzZWFyY2g6IHVybE9iamVjdC5zZWFyY2gsXG4gICAgcGF0aG5hbWU6IHVybE9iamVjdC5wYXRobmFtZSxcbiAgICBwYXRoOiB1cmxPYmplY3QucGF0aG5hbWUgKyB1cmxPYmplY3Quc2VhcmNoLFxuICAgIGhyZWY6IHVybE9iamVjdC5ocmVmLFxuICB9O1xuICBpZiAodXJsT2JqZWN0LnBvcnQgIT09IFwiXCIpIHtcbiAgICBvcHRpb25zLnBvcnQgPSBOdW1iZXIodXJsT2JqZWN0LnBvcnQpO1xuICB9XG4gIHJldHVybiBvcHRpb25zO1xufVxuXG5mdW5jdGlvbiByZW1vdmVNYXRjaGluZ0hlYWRlcnMocmVnZXgsIGhlYWRlcnMpIHtcbiAgdmFyIGxhc3RWYWx1ZTtcbiAgZm9yICh2YXIgaGVhZGVyIGluIGhlYWRlcnMpIHtcbiAgICBpZiAocmVnZXgudGVzdChoZWFkZXIpKSB7XG4gICAgICBsYXN0VmFsdWUgPSBoZWFkZXJzW2hlYWRlcl07XG4gICAgICBkZWxldGUgaGVhZGVyc1toZWFkZXJdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gKGxhc3RWYWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgbGFzdFZhbHVlID09PSBcInVuZGVmaW5lZFwiKSA/XG4gICAgdW5kZWZpbmVkIDogU3RyaW5nKGxhc3RWYWx1ZSkudHJpbSgpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFcnJvclR5cGUoY29kZSwgbWVzc2FnZSwgYmFzZUNsYXNzKSB7XG4gIC8vIENyZWF0ZSBjb25zdHJ1Y3RvclxuICBmdW5jdGlvbiBDdXN0b21FcnJvcihwcm9wZXJ0aWVzKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wZXJ0aWVzIHx8IHt9KTtcbiAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMuY2F1c2UgPyBtZXNzYWdlICsgXCI6IFwiICsgdGhpcy5jYXVzZS5tZXNzYWdlIDogbWVzc2FnZTtcbiAgfVxuXG4gIC8vIEF0dGFjaCBjb25zdHJ1Y3RvciBhbmQgc2V0IGRlZmF1bHQgcHJvcGVydGllc1xuICBDdXN0b21FcnJvci5wcm90b3R5cGUgPSBuZXcgKGJhc2VDbGFzcyB8fCBFcnJvcikoKTtcbiAgQ3VzdG9tRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ3VzdG9tRXJyb3I7XG4gIEN1c3RvbUVycm9yLnByb3RvdHlwZS5uYW1lID0gXCJFcnJvciBbXCIgKyBjb2RlICsgXCJdXCI7XG4gIHJldHVybiBDdXN0b21FcnJvcjtcbn1cblxuZnVuY3Rpb24gYWJvcnRSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgZm9yICh2YXIgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgcmVxdWVzdC5yZW1vdmVMaXN0ZW5lcihldmVudCwgZXZlbnRIYW5kbGVyc1tldmVudF0pO1xuICB9XG4gIHJlcXVlc3Qub24oXCJlcnJvclwiLCBub29wKTtcbiAgcmVxdWVzdC5hYm9ydCgpO1xufVxuXG5mdW5jdGlvbiBpc1N1YmRvbWFpbihzdWJkb21haW4sIGRvbWFpbikge1xuICBhc3NlcnQoaXNTdHJpbmcoc3ViZG9tYWluKSAmJiBpc1N0cmluZyhkb21haW4pKTtcbiAgdmFyIGRvdCA9IHN1YmRvbWFpbi5sZW5ndGggLSBkb21haW4ubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGRvdCA+IDAgJiYgc3ViZG9tYWluW2RvdF0gPT09IFwiLlwiICYmIHN1YmRvbWFpbi5lbmRzV2l0aChkb21haW4pO1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiIHx8IHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiAoXCJsZW5ndGhcIiBpbiB2YWx1ZSk7XG59XG5cbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gd3JhcCh7IGh0dHA6IGh0dHAsIGh0dHBzOiBodHRwcyB9KTtcbm1vZHVsZS5leHBvcnRzLndyYXAgPSB3cmFwO1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoZmxhZywgYXJndikgPT4ge1xuXHRhcmd2ID0gYXJndiB8fCBwcm9jZXNzLmFyZ3Y7XG5cdGNvbnN0IHByZWZpeCA9IGZsYWcuc3RhcnRzV2l0aCgnLScpID8gJycgOiAoZmxhZy5sZW5ndGggPT09IDEgPyAnLScgOiAnLS0nKTtcblx0Y29uc3QgcG9zID0gYXJndi5pbmRleE9mKHByZWZpeCArIGZsYWcpO1xuXHRjb25zdCB0ZXJtaW5hdG9yUG9zID0gYXJndi5pbmRleE9mKCctLScpO1xuXHRyZXR1cm4gcG9zICE9PSAtMSAmJiAodGVybWluYXRvclBvcyA9PT0gLTEgPyB0cnVlIDogcG9zIDwgdGVybWluYXRvclBvcyk7XG59O1xuIiwiLyohXG4gKiBtaW1lLWRiXG4gKiBDb3B5cmlnaHQoYykgMjAxNCBKb25hdGhhbiBPbmdcbiAqIENvcHlyaWdodChjKSAyMDE1LTIwMjIgRG91Z2xhcyBDaHJpc3RvcGhlciBXaWxzb25cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RiLmpzb24nKVxuIiwiLyohXG4gKiBtaW1lLXR5cGVzXG4gKiBDb3B5cmlnaHQoYykgMjAxNCBKb25hdGhhbiBPbmdcbiAqIENvcHlyaWdodChjKSAyMDE1IERvdWdsYXMgQ2hyaXN0b3BoZXIgV2lsc29uXG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4ndXNlIHN0cmljdCdcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICogQHByaXZhdGVcbiAqL1xuXG52YXIgZGIgPSByZXF1aXJlKCdtaW1lLWRiJylcbnZhciBleHRuYW1lID0gcmVxdWlyZSgncGF0aCcpLmV4dG5hbWVcblxuLyoqXG4gKiBNb2R1bGUgdmFyaWFibGVzLlxuICogQHByaXZhdGVcbiAqL1xuXG52YXIgRVhUUkFDVF9UWVBFX1JFR0VYUCA9IC9eXFxzKihbXjtcXHNdKikoPzo7fFxcc3wkKS9cbnZhciBURVhUX1RZUEVfUkVHRVhQID0gL150ZXh0XFwvL2lcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqIEBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmNoYXJzZXQgPSBjaGFyc2V0XG5leHBvcnRzLmNoYXJzZXRzID0geyBsb29rdXA6IGNoYXJzZXQgfVxuZXhwb3J0cy5jb250ZW50VHlwZSA9IGNvbnRlbnRUeXBlXG5leHBvcnRzLmV4dGVuc2lvbiA9IGV4dGVuc2lvblxuZXhwb3J0cy5leHRlbnNpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuZXhwb3J0cy5sb29rdXAgPSBsb29rdXBcbmV4cG9ydHMudHlwZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbi8vIFBvcHVsYXRlIHRoZSBleHRlbnNpb25zL3R5cGVzIG1hcHNcbnBvcHVsYXRlTWFwcyhleHBvcnRzLmV4dGVuc2lvbnMsIGV4cG9ydHMudHlwZXMpXG5cbi8qKlxuICogR2V0IHRoZSBkZWZhdWx0IGNoYXJzZXQgZm9yIGEgTUlNRSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtib29sZWFufHN0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBjaGFyc2V0ICh0eXBlKSB7XG4gIGlmICghdHlwZSB8fCB0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIFRPRE86IHVzZSBtZWRpYS10eXBlclxuICB2YXIgbWF0Y2ggPSBFWFRSQUNUX1RZUEVfUkVHRVhQLmV4ZWModHlwZSlcbiAgdmFyIG1pbWUgPSBtYXRjaCAmJiBkYlttYXRjaFsxXS50b0xvd2VyQ2FzZSgpXVxuXG4gIGlmIChtaW1lICYmIG1pbWUuY2hhcnNldCkge1xuICAgIHJldHVybiBtaW1lLmNoYXJzZXRcbiAgfVxuXG4gIC8vIGRlZmF1bHQgdGV4dC8qIHRvIHV0Zi04XG4gIGlmIChtYXRjaCAmJiBURVhUX1RZUEVfUkVHRVhQLnRlc3QobWF0Y2hbMV0pKSB7XG4gICAgcmV0dXJuICdVVEYtOCdcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGZ1bGwgQ29udGVudC1UeXBlIGhlYWRlciBnaXZlbiBhIE1JTUUgdHlwZSBvciBleHRlbnNpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7Ym9vbGVhbnxzdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gY29udGVudFR5cGUgKHN0cikge1xuICAvLyBUT0RPOiBzaG91bGQgdGhpcyBldmVuIGJlIGluIHRoaXMgbW9kdWxlP1xuICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdmFyIG1pbWUgPSBzdHIuaW5kZXhPZignLycpID09PSAtMVxuICAgID8gZXhwb3J0cy5sb29rdXAoc3RyKVxuICAgIDogc3RyXG5cbiAgaWYgKCFtaW1lKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBUT0RPOiB1c2UgY29udGVudC10eXBlIG9yIG90aGVyIG1vZHVsZVxuICBpZiAobWltZS5pbmRleE9mKCdjaGFyc2V0JykgPT09IC0xKSB7XG4gICAgdmFyIGNoYXJzZXQgPSBleHBvcnRzLmNoYXJzZXQobWltZSlcbiAgICBpZiAoY2hhcnNldCkgbWltZSArPSAnOyBjaGFyc2V0PScgKyBjaGFyc2V0LnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIHJldHVybiBtaW1lXG59XG5cbi8qKlxuICogR2V0IHRoZSBkZWZhdWx0IGV4dGVuc2lvbiBmb3IgYSBNSU1FIHR5cGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEByZXR1cm4ge2Jvb2xlYW58c3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIGV4dGVuc2lvbiAodHlwZSkge1xuICBpZiAoIXR5cGUgfHwgdHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBUT0RPOiB1c2UgbWVkaWEtdHlwZXJcbiAgdmFyIG1hdGNoID0gRVhUUkFDVF9UWVBFX1JFR0VYUC5leGVjKHR5cGUpXG5cbiAgLy8gZ2V0IGV4dGVuc2lvbnNcbiAgdmFyIGV4dHMgPSBtYXRjaCAmJiBleHBvcnRzLmV4dGVuc2lvbnNbbWF0Y2hbMV0udG9Mb3dlckNhc2UoKV1cblxuICBpZiAoIWV4dHMgfHwgIWV4dHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gZXh0c1swXVxufVxuXG4vKipcbiAqIExvb2t1cCB0aGUgTUlNRSB0eXBlIGZvciBhIGZpbGUgcGF0aC9leHRlbnNpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAqIEByZXR1cm4ge2Jvb2xlYW58c3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIGxvb2t1cCAocGF0aCkge1xuICBpZiAoIXBhdGggfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBnZXQgdGhlIGV4dGVuc2lvbiAoXCJleHRcIiBvciBcIi5leHRcIiBvciBmdWxsIHBhdGgpXG4gIHZhciBleHRlbnNpb24gPSBleHRuYW1lKCd4LicgKyBwYXRoKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnN1YnN0cigxKVxuXG4gIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy50eXBlc1tleHRlbnNpb25dIHx8IGZhbHNlXG59XG5cbi8qKlxuICogUG9wdWxhdGUgdGhlIGV4dGVuc2lvbnMgYW5kIHR5cGVzIG1hcHMuXG4gKiBAcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBvcHVsYXRlTWFwcyAoZXh0ZW5zaW9ucywgdHlwZXMpIHtcbiAgLy8gc291cmNlIHByZWZlcmVuY2UgKGxlYXN0IC0+IG1vc3QpXG4gIHZhciBwcmVmZXJlbmNlID0gWyduZ2lueCcsICdhcGFjaGUnLCB1bmRlZmluZWQsICdpYW5hJ11cblxuICBPYmplY3Qua2V5cyhkYikuZm9yRWFjaChmdW5jdGlvbiBmb3JFYWNoTWltZVR5cGUgKHR5cGUpIHtcbiAgICB2YXIgbWltZSA9IGRiW3R5cGVdXG4gICAgdmFyIGV4dHMgPSBtaW1lLmV4dGVuc2lvbnNcblxuICAgIGlmICghZXh0cyB8fCAhZXh0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIG1pbWUgLT4gZXh0ZW5zaW9uc1xuICAgIGV4dGVuc2lvbnNbdHlwZV0gPSBleHRzXG5cbiAgICAvLyBleHRlbnNpb24gLT4gbWltZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXh0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGV4dGVuc2lvbiA9IGV4dHNbaV1cblxuICAgICAgaWYgKHR5cGVzW2V4dGVuc2lvbl0pIHtcbiAgICAgICAgdmFyIGZyb20gPSBwcmVmZXJlbmNlLmluZGV4T2YoZGJbdHlwZXNbZXh0ZW5zaW9uXV0uc291cmNlKVxuICAgICAgICB2YXIgdG8gPSBwcmVmZXJlbmNlLmluZGV4T2YobWltZS5zb3VyY2UpXG5cbiAgICAgICAgaWYgKHR5cGVzW2V4dGVuc2lvbl0gIT09ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nICYmXG4gICAgICAgICAgKGZyb20gPiB0byB8fCAoZnJvbSA9PT0gdG8gJiYgdHlwZXNbZXh0ZW5zaW9uXS5zdWJzdHIoMCwgMTIpID09PSAnYXBwbGljYXRpb24vJykpKSB7XG4gICAgICAgICAgLy8gc2tpcCB0aGUgcmVtYXBwaW5nXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBzZXQgdGhlIGV4dGVuc2lvbiAtPiBtaW1lXG4gICAgICB0eXBlc1tleHRlbnNpb25dID0gdHlwZVxuICAgIH1cbiAgfSlcbn1cbiIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgdyA9IGQgKiA3O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWwpKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigtPyg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8d2Vla3M/fHd8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ3dlZWtzJzpcbiAgICBjYXNlICd3ZWVrJzpcbiAgICBjYXNlICd3JzpcbiAgICAgIHJldHVybiBuICogdztcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgZCwgJ2RheScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGgsICdob3VyJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgbSwgJ21pbnV0ZScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIHMsICdzZWNvbmQnKTtcbiAgfVxuICByZXR1cm4gbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG1zQWJzLCBuLCBuYW1lKSB7XG4gIHZhciBpc1BsdXJhbCA9IG1zQWJzID49IG4gKiAxLjU7XG4gIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbikgKyAnICcgKyBuYW1lICsgKGlzUGx1cmFsID8gJ3MnIDogJycpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xuY29uc3QgaGFzRmxhZyA9IHJlcXVpcmUoJ2hhcy1mbGFnJyk7XG5cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52O1xuXG5sZXQgZm9yY2VDb2xvcjtcbmlmIChoYXNGbGFnKCduby1jb2xvcicpIHx8XG5cdGhhc0ZsYWcoJ25vLWNvbG9ycycpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9yPWZhbHNlJykpIHtcblx0Zm9yY2VDb2xvciA9IGZhbHNlO1xufSBlbHNlIGlmIChoYXNGbGFnKCdjb2xvcicpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9ycycpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9yPXRydWUnKSB8fFxuXHRoYXNGbGFnKCdjb2xvcj1hbHdheXMnKSkge1xuXHRmb3JjZUNvbG9yID0gdHJ1ZTtcbn1cbmlmICgnRk9SQ0VfQ09MT1InIGluIGVudikge1xuXHRmb3JjZUNvbG9yID0gZW52LkZPUkNFX0NPTE9SLmxlbmd0aCA9PT0gMCB8fCBwYXJzZUludChlbnYuRk9SQ0VfQ09MT1IsIDEwKSAhPT0gMDtcbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlTGV2ZWwobGV2ZWwpIHtcblx0aWYgKGxldmVsID09PSAwKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRsZXZlbCxcblx0XHRoYXNCYXNpYzogdHJ1ZSxcblx0XHRoYXMyNTY6IGxldmVsID49IDIsXG5cdFx0aGFzMTZtOiBsZXZlbCA+PSAzXG5cdH07XG59XG5cbmZ1bmN0aW9uIHN1cHBvcnRzQ29sb3Ioc3RyZWFtKSB7XG5cdGlmIChmb3JjZUNvbG9yID09PSBmYWxzZSkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0aWYgKGhhc0ZsYWcoJ2NvbG9yPTE2bScpIHx8XG5cdFx0aGFzRmxhZygnY29sb3I9ZnVsbCcpIHx8XG5cdFx0aGFzRmxhZygnY29sb3I9dHJ1ZWNvbG9yJykpIHtcblx0XHRyZXR1cm4gMztcblx0fVxuXG5cdGlmIChoYXNGbGFnKCdjb2xvcj0yNTYnKSkge1xuXHRcdHJldHVybiAyO1xuXHR9XG5cblx0aWYgKHN0cmVhbSAmJiAhc3RyZWFtLmlzVFRZICYmIGZvcmNlQ29sb3IgIT09IHRydWUpIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdGNvbnN0IG1pbiA9IGZvcmNlQ29sb3IgPyAxIDogMDtcblxuXHRpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuXHRcdC8vIE5vZGUuanMgNy41LjAgaXMgdGhlIGZpcnN0IHZlcnNpb24gb2YgTm9kZS5qcyB0byBpbmNsdWRlIGEgcGF0Y2ggdG9cblx0XHQvLyBsaWJ1diB0aGF0IGVuYWJsZXMgMjU2IGNvbG9yIG91dHB1dCBvbiBXaW5kb3dzLiBBbnl0aGluZyBlYXJsaWVyIGFuZCBpdFxuXHRcdC8vIHdvbid0IHdvcmsuIEhvd2V2ZXIsIGhlcmUgd2UgdGFyZ2V0IE5vZGUuanMgOCBhdCBtaW5pbXVtIGFzIGl0IGlzIGFuIExUU1xuXHRcdC8vIHJlbGVhc2UsIGFuZCBOb2RlLmpzIDcgaXMgbm90LiBXaW5kb3dzIDEwIGJ1aWxkIDEwNTg2IGlzIHRoZSBmaXJzdCBXaW5kb3dzXG5cdFx0Ly8gcmVsZWFzZSB0aGF0IHN1cHBvcnRzIDI1NiBjb2xvcnMuIFdpbmRvd3MgMTAgYnVpbGQgMTQ5MzEgaXMgdGhlIGZpcnN0IHJlbGVhc2Vcblx0XHQvLyB0aGF0IHN1cHBvcnRzIDE2bS9UcnVlQ29sb3IuXG5cdFx0Y29uc3Qgb3NSZWxlYXNlID0gb3MucmVsZWFzZSgpLnNwbGl0KCcuJyk7XG5cdFx0aWYgKFxuXHRcdFx0TnVtYmVyKHByb2Nlc3MudmVyc2lvbnMubm9kZS5zcGxpdCgnLicpWzBdKSA+PSA4ICYmXG5cdFx0XHROdW1iZXIob3NSZWxlYXNlWzBdKSA+PSAxMCAmJlxuXHRcdFx0TnVtYmVyKG9zUmVsZWFzZVsyXSkgPj0gMTA1ODZcblx0XHQpIHtcblx0XHRcdHJldHVybiBOdW1iZXIob3NSZWxlYXNlWzJdKSA+PSAxNDkzMSA/IDMgOiAyO1xuXHRcdH1cblxuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0aWYgKCdDSScgaW4gZW52KSB7XG5cdFx0aWYgKFsnVFJBVklTJywgJ0NJUkNMRUNJJywgJ0FQUFZFWU9SJywgJ0dJVExBQl9DSSddLnNvbWUoc2lnbiA9PiBzaWduIGluIGVudikgfHwgZW52LkNJX05BTUUgPT09ICdjb2Rlc2hpcCcpIHtcblx0XHRcdHJldHVybiAxO1xuXHRcdH1cblxuXHRcdHJldHVybiBtaW47XG5cdH1cblxuXHRpZiAoJ1RFQU1DSVRZX1ZFUlNJT04nIGluIGVudikge1xuXHRcdHJldHVybiAvXig5XFwuKDAqWzEtOV1cXGQqKVxcLnxcXGR7Mix9XFwuKS8udGVzdChlbnYuVEVBTUNJVFlfVkVSU0lPTikgPyAxIDogMDtcblx0fVxuXG5cdGlmIChlbnYuQ09MT1JURVJNID09PSAndHJ1ZWNvbG9yJykge1xuXHRcdHJldHVybiAzO1xuXHR9XG5cblx0aWYgKCdURVJNX1BST0dSQU0nIGluIGVudikge1xuXHRcdGNvbnN0IHZlcnNpb24gPSBwYXJzZUludCgoZW52LlRFUk1fUFJPR1JBTV9WRVJTSU9OIHx8ICcnKS5zcGxpdCgnLicpWzBdLCAxMCk7XG5cblx0XHRzd2l0Y2ggKGVudi5URVJNX1BST0dSQU0pIHtcblx0XHRcdGNhc2UgJ2lUZXJtLmFwcCc6XG5cdFx0XHRcdHJldHVybiB2ZXJzaW9uID49IDMgPyAzIDogMjtcblx0XHRcdGNhc2UgJ0FwcGxlX1Rlcm1pbmFsJzpcblx0XHRcdFx0cmV0dXJuIDI7XG5cdFx0XHQvLyBObyBkZWZhdWx0XG5cdFx0fVxuXHR9XG5cblx0aWYgKC8tMjU2KGNvbG9yKT8kL2kudGVzdChlbnYuVEVSTSkpIHtcblx0XHRyZXR1cm4gMjtcblx0fVxuXG5cdGlmICgvXnNjcmVlbnxeeHRlcm18XnZ0MTAwfF52dDIyMHxecnh2dHxjb2xvcnxhbnNpfGN5Z3dpbnxsaW51eC9pLnRlc3QoZW52LlRFUk0pKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRpZiAoJ0NPTE9SVEVSTScgaW4gZW52KSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRpZiAoZW52LlRFUk0gPT09ICdkdW1iJykge1xuXHRcdHJldHVybiBtaW47XG5cdH1cblxuXHRyZXR1cm4gbWluO1xufVxuXG5mdW5jdGlvbiBnZXRTdXBwb3J0TGV2ZWwoc3RyZWFtKSB7XG5cdGNvbnN0IGxldmVsID0gc3VwcG9ydHNDb2xvcihzdHJlYW0pO1xuXHRyZXR1cm4gdHJhbnNsYXRlTGV2ZWwobGV2ZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0c3VwcG9ydHNDb2xvcjogZ2V0U3VwcG9ydExldmVsLFxuXHRzdGRvdXQ6IGdldFN1cHBvcnRMZXZlbChwcm9jZXNzLnN0ZG91dCksXG5cdHN0ZGVycjogZ2V0U3VwcG9ydExldmVsKHByb2Nlc3Muc3RkZXJyKVxufTtcbiIsIihmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShkZWZpbml0aW9uKTtcbiAgZWxzZSBjb250ZXh0W25hbWVdID0gZGVmaW5pdGlvbigpO1xufSkoJ3VybGpvaW4nLCB0aGlzLCBmdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplIChzdHJBcnJheSkge1xuICAgIHZhciByZXN1bHRBcnJheSA9IFtdO1xuICAgIGlmIChzdHJBcnJheS5sZW5ndGggPT09IDApIHsgcmV0dXJuICcnOyB9XG5cbiAgICBpZiAodHlwZW9mIHN0ckFycmF5WzBdICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVXJsIG11c3QgYmUgYSBzdHJpbmcuIFJlY2VpdmVkICcgKyBzdHJBcnJheVswXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGZpcnN0IHBhcnQgaXMgYSBwbGFpbiBwcm90b2NvbCwgd2UgY29tYmluZSBpdCB3aXRoIHRoZSBuZXh0IHBhcnQuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eW14vOl0rOlxcLyokLykgJiYgc3RyQXJyYXkubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGZpcnN0ID0gc3RyQXJyYXkuc2hpZnQoKTtcbiAgICAgIHN0ckFycmF5WzBdID0gZmlyc3QgKyBzdHJBcnJheVswXTtcbiAgICB9XG5cbiAgICAvLyBUaGVyZSBtdXN0IGJlIHR3byBvciB0aHJlZSBzbGFzaGVzIGluIHRoZSBmaWxlIHByb3RvY29sLCB0d28gc2xhc2hlcyBpbiBhbnl0aGluZyBlbHNlLlxuICAgIGlmIChzdHJBcnJheVswXS5tYXRjaCgvXmZpbGU6XFwvXFwvXFwvLykpIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8vJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8nKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gc3RyQXJyYXlbaV07XG5cbiAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIGNvbXBvbmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wb25lbnQgPT09ICcnKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgc3RhcnRpbmcgc2xhc2hlcyBmb3IgZWFjaCBjb21wb25lbnQgYnV0IHRoZSBmaXJzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL15bXFwvXSsvLCAnJyk7XG4gICAgICB9XG4gICAgICBpZiAoaSA8IHN0ckFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGVuZGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGxhc3QuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIHRoZSBsYXN0IGNvbXBvbmVudCB3ZSB3aWxsIGNvbWJpbmUgbXVsdGlwbGUgc2xhc2hlcyB0byBhIHNpbmdsZSBvbmUuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJy8nKTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0QXJyYXkucHVzaChjb21wb25lbnQpO1xuXG4gICAgfVxuXG4gICAgdmFyIHN0ciA9IHJlc3VsdEFycmF5LmpvaW4oJy8nKTtcbiAgICAvLyBFYWNoIGlucHV0IGNvbXBvbmVudCBpcyBub3cgc2VwYXJhdGVkIGJ5IGEgc2luZ2xlIHNsYXNoIGV4Y2VwdCB0aGUgcG9zc2libGUgZmlyc3QgcGxhaW4gcHJvdG9jb2wgcGFydC5cblxuICAgIC8vIHJlbW92ZSB0cmFpbGluZyBzbGFzaCBiZWZvcmUgcGFyYW1ldGVycyBvciBoYXNoXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcLyhcXD98JnwjW14hXSkvZywgJyQxJyk7XG5cbiAgICAvLyByZXBsYWNlID8gaW4gcGFyYW1ldGVycyB3aXRoICZcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJz8nKTtcbiAgICBzdHIgPSBwYXJ0cy5zaGlmdCgpICsgKHBhcnRzLmxlbmd0aCA+IDAgPyAnPyc6ICcnKSArIHBhcnRzLmpvaW4oJyYnKTtcblxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnB1dDtcblxuICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgaW5wdXQgPSBhcmd1bWVudHNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0ID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBub3JtYWxpemUoaW5wdXQpO1xuICB9O1xuXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzc2VydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3RyZWFtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR0eVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ6bGliXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2xpYi9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJkYXRhIiwicmVjZWl2aW5nIiwic2VuZGluZyIsIm5hbWUiLCJyZXF1aXJlX3RscyIsInNraXBfdmVyaWZpY2F0aW9uIiwic3RhdGUiLCJ3aWxkY2FyZCIsInNwYW1fYWN0aW9uIiwiY3JlYXRlZF9hdCIsInNtdHBfcGFzc3dvcmQiLCJzbXRwX2xvZ2luIiwidHlwZSIsInJlY2VpdmluZ19kbnNfcmVjb3JkcyIsInNlbmRpbmdfZG5zX3JlY29yZHMiLCJleHBvcnRzIiwicmVxdWVzdCIsImRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IiwiZG9tYWluVGVtcGxhdGVzQ2xpZW50IiwiZG9tYWluVGFnc0NsaWVudCIsImRvbWFpbkNyZWRlbnRpYWxzIiwiZG9tYWluVGVtcGxhdGVzIiwiZG9tYWluVGFncyIsIkRvbWFpbkNsaWVudCIsInJlc3BvbnNlIiwiYm9keSIsIml0ZW1zIiwibWFwIiwiaXRlbSIsIkRvbWFpbiIsImRvbWFpbiIsInRyYWNraW5nIiwicXVlcnkiLCJnZXQiLCJ0aGVuIiwicmVzIiwicGFyc2VEb21haW5MaXN0IiwiX3BhcnNlRG9tYWluIiwicG9zdE9iaiIsImZvcmNlX2RraW1fYXV0aG9yaXR5IiwidG9TdHJpbmciLCJwb3N0V2l0aEZEIiwicHV0IiwiZGVsZXRlIiwiX3BhcnNlTWVzc2FnZSIsImNvbm5lY3Rpb24iLCJfcGFyc2VUcmFja2luZ1NldHRpbmdzIiwiYWN0aXZlIiwiRXJyb3JfMSIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJtZXNzYWdlIiwicHV0V2l0aEZEIiwiX3BhcnNlVHJhY2tpbmdVcGRhdGUiLCJpcCIsInBvb2xfaWQiLCJyZXBsYWNlbWVudCIsInNlYXJjaFBhcmFtcyIsInNlbGYiLCJka2ltU2VsZWN0b3IiLCJ3ZWJQcmVmaXgiLCJiYXNlUm91dGUiLCJEb21haW5DcmVkZW50aWFsc0NsaWVudCIsInRvdGFsQ291bnQiLCJ0b3RhbF9jb3VudCIsInJlc3VsdCIsInNwZWMiLCJfcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QiLCJfcGFyc2VNZXNzYWdlUmVzcG9uc2UiLCJjcmVkZW50aWFsc0xvZ2luIiwiX3BhcnNlRGVsZXRlZFJlc3BvbnNlIiwidGFnSW5mbyIsInRhZyIsImRlc2NyaXB0aW9uIiwiRGF0ZSIsInRhZ1N0YXRpc3RpY0luZm8iLCJzdGFydCIsImVuZCIsInJlc29sdXRpb24iLCJzdGF0cyIsInN0YXQiLCJ0aW1lIiwiX19leHRlbmRzIiwiX3N1cGVyIiwiX3RoaXMiLCJEb21haW5UYWdzQ2xpZW50IiwiRG9tYWluVGFnIiwicGFnZXMiLCJwYXJzZVBhZ2VMaW5rcyIsIkRvbWFpblRhZ1N0YXRpc3RpYyIsInJlcXVlc3RMaXN0V2l0aFBhZ2VzIiwiX3BhcnNlVGFnU3RhdGlzdGljIiwiTmF2aWdhdGlvblRocnVQYWdlc18xIiwiZG9tYWluVGVtcGxhdGVGcm9tQVBJIiwiY3JlYXRlZEF0IiwiY3JlYXRlZEJ5IiwiaWQiLCJ2ZXJzaW9uIiwidmVyc2lvbnMiLCJsZW5ndGgiLCJEb21haW5UZW1wbGF0ZXNDbGllbnQiLCJEb21haW5UZW1wbGF0ZUl0ZW0iLCJ0ZW1wbGF0ZSIsInRlbXBsYXRlTmFtZSIsInRlbXBsYXRlVmVyc2lvbiIsImQiLCJwYXJzZUNyZWF0aW9uUmVzcG9uc2UiLCJwYXJzZU11dGF0aW9uUmVzcG9uc2UiLCJwYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlIiwicGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZSIsInBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UiLCJwYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zIiwiRXZlbnRDbGllbnQiLCJJcFBvb2xzQ2xpZW50IiwicGFyc2VJcFBvb2xzUmVzcG9uc2UiLCJfYSIsInBvb2xJZCIsInBhdGNoV2l0aEZEIiwiSXBzQ2xpZW50IiwicGFyc2VJcHNSZXNwb25zZSIsIm9wdGlvbnMiLCJmb3JtRGF0YSIsImNvbmZpZyIsIl9fYXNzaWduIiwidXJsIiwidXNlcm5hbWUiLCJFcnJvciIsImtleSIsIlJlcXVlc3RfMSIsIm1haWxMaXN0c01lbWJlcnMiLCJtYWlsTGlzdE1lbWJlcnNfMSIsImRvbWFpbnNDcmVkZW50aWFsc18xIiwiZG9tYWluc1RlbXBsYXRlc18xIiwiZG9tYWluc1RhZ3NfMSIsIm11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCIsIm11bHRpcGxlVmFsaWRhdGlvbl8xIiwiZG9tYWlucyIsImRvbWFpbnNfMSIsIndlYmhvb2tzIiwiV2ViaG9va3NfMSIsImV2ZW50cyIsIkV2ZW50c18xIiwiU3RhdHNDbGllbnRfMSIsInN1cHByZXNzaW9ucyIsIlN1cHByZXNzaW9uc0NsaWVudF8xIiwibWVzc2FnZXMiLCJNZXNzYWdlc18xIiwicm91dGVzIiwiUm91dGVzXzEiLCJpcHMiLCJJUHNfMSIsImlwX3Bvb2xzIiwiSVBQb29sc18xIiwibGlzdHMiLCJtYWlsaW5nTGlzdHNfMSIsInZhbGlkYXRlIiwidmFsaWRhdGVfMSIsIk1haWxMaXN0c01lbWJlcnMiLCJuZXdEYXRhIiwidmFycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWJzY3JpYmVkIiwibWFpbExpc3RBZGRyZXNzIiwibWFpbExpc3RNZW1iZXJBZGRyZXNzIiwibWVtYmVyIiwicmVxRGF0YSIsImNoZWNrQW5kVXBkYXRlRGF0YSIsIm1lbWJlcnMiLCJBcnJheSIsImlzQXJyYXkiLCJ1cHNlcnQiLCJMaXN0c0NsaWVudCIsInZhbGlkYXRpb25SZXN1bHQiLCJsaXN0IiwicG9zdCIsInBhcnNlVmFsaWRhdGlvblJlc3VsdCIsIk1lc3NhZ2VzQ2xpZW50IiwieWVzTm9Qcm9wZXJ0aWVzIiwiU2V0IiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsImFjYyIsImhhcyIsIl9wYXJzZVJlc3BvbnNlIiwibW9kaWZpZWREYXRhIiwicHJlcGFyZUJvb2xlYW5WYWx1ZXMiLCJSb3V0ZXNDbGllbnQiLCJyb3V0ZSIsImxvZ2dlciIsIlN0YXRzQ2xpZW50IiwiaW5wdXREYXRlIiwid2FybiIsInRvVVRDU3RyaW5nIiwiZW50cmllcyIsImFycmF5V2l0aFBhaXJzIiwiY3VycmVudFBhaXIiLCJ2YWx1ZSIsInJlcGVhdGVkUHJvcGVydHkiLCJwdXNoIiwiY29udmVydERhdGVUb1VUQyIsIlN0YXRzQ29udGFpbmVyXzEiLCJwcmVwYXJlU2VhcmNoUGFyYW1zIiwicGFyc2VTdGF0cyIsIkVudW1zXzEiLCJCT1VOQ0VTIiwiYWRkcmVzcyIsImNvZGUiLCJlcnJvciIsIlN1cHByZXNzaW9uXzEiLCJDT01QTEFJTlRTIiwiY3JlYXRlT3B0aW9ucyIsImhlYWRlcnMiLCJtb2RlbHMiLCJNYXAiLCJzZXQiLCJCb3VuY2VfMSIsIkNvbXBsYWludF8xIiwiVW5zdWJzY3JpYmVfMSIsIldoaXRlTGlzdF8xIiwiU3VwcHJlc3Npb25DbGllbnQiLCJNb2RlbCIsInByZXBhcmVSZXNwb25zZSIsImNoZWNrVHlwZSIsIm1vZGVsIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiX3BhcnNlSXRlbSIsInBvc3REYXRhIiwiY3JlYXRlV2hpdGVMaXN0IiwibW9kdWxlIiwiVU5TVUJTQ1JJQkVTIiwidGFncyIsIldISVRFTElTVFMiLCJyZWFzb24iLCJyZXNwb25zZVN0YXR1c0NvZGUiLCJxdWFudGl0eSIsInJlY29yZHNQcm9jZXNzZWQiLCJyZWNvcmRzX3Byb2Nlc3NlZCIsImRvd25sb2FkX3VybCIsImRvd25sb2FkVXJsIiwiY3N2IiwianNvbiIsInN1bW1hcnkiLCJjYXRjaEFsbCIsImNhdGNoX2FsbCIsImRlbGl2ZXJhYmxlIiwiZG9Ob3RTZW5kIiwiZG9fbm90X3NlbmQiLCJ1bmRlbGl2ZXJhYmxlIiwidW5rbm93biIsInJpc2siLCJoaWdoIiwibG93IiwibWVkaXVtIiwiTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50Iiwiam9icyIsImpvYiIsIk11bHRpcGxlVmFsaWRhdGlvbkpvYiIsInRvdGFsIiwibGlzdElkIiwibXVsdGlwbGVWYWxpZGF0aW9uRGF0YSIsIm11bHRpcGxlVmFsaWRhdGlvbkZpbGUiLCJmaWxlIiwiaGFuZGxlUmVzcG9uc2UiLCJtdWx0aXBsZVZhbGlkYXRpb24iLCJWYWxpZGF0ZUNsaWVudCIsIldlYmhvb2tzQ2xpZW50Iiwid2ViaG9va1Jlc3BvbnNlIiwid2ViaG9vayIsInVybHMiLCJ1bmRlZmluZWQiLCJXZWJob29rIiwiX3BhcnNlV2ViaG9va0xpc3QiLCJfcGFyc2VXZWJob29rV2l0aElEIiwidGVzdCIsIl9wYXJzZVdlYmhvb2tUZXN0IiwiX2IiLCJib2R5TWVzc2FnZSIsInN0YWNrIiwiZGV0YWlscyIsIkZvcm1EYXRhQ29uc3RydWN0b3IiLCJGb3JtRGF0YUJ1aWxkZXIiLCJmaWx0ZXIiLCJmb3JtRGF0YUFjYyIsImZpbGVLZXlzIiwiaW5jbHVkZXMiLCJhZGRGaWxlc1RvRkQiLCJhZGRNaW1lRGF0YVRvRkQiLCJhZGRDb21tb25Qcm9wZXJ0eVRvRkQiLCJmb3JtRGF0YUluc3RhbmNlIiwiZ2V0SGVhZGVycyIsImlzU3RyZWFtIiwiY29udGVudFR5cGUiLCJrbm93bkxlbmd0aCIsImZpbGVuYW1lIiwiQnVmZmVyIiwiaXNCdWZmZXIiLCJub2RlRm9ybURhdGEiLCJwcmVwYXJlZERhdGEiLCJmcm9tIiwiYXBwZW5kIiwiYnJvd3NlckZvcm1EYXRhIiwicHJvcGVydHlOYW1lIiwiYXBwZW5kRmlsZVRvRkQiLCJvcmlnaW5hbEtleSIsIm9iaiIsImlzU3RyZWFtRGF0YSIsIm9iakRhdGEiLCJnZXRBdHRhY2htZW50T3B0aW9ucyIsImlzTm9kZUZvcm1EYXRhIiwiZm9yRWFjaCIsInBpcGUiLCJOYXZpZ2F0aW9uVGhydVBhZ2VzIiwicGFnZVVybCIsInVybFNlcGFyYXRvciIsIml0ZXJhdG9yTmFtZSIsInBhcnNlZFVybCIsIlVSTCIsInBhZ2VWYWx1ZSIsInNwbGl0IiwicG9wIiwiaXRlcmF0b3JQb3NpdGlvbiIsInBhZ2UiLCJwYWdpbmciLCJwYXJzZVBhZ2UiLCJjbGllbnRVcmwiLCJxdWVyeUNvcHkiLCJ1cGRhdGVkUXVlcnkiLCJ1cGRhdGVVcmxBbmRRdWVyeSIsInBhcnNlTGlzdCIsInRpbWVvdXQiLCJmb3JtRGF0YUJ1aWxkZXIiLCJGb3JtRGF0YUJ1aWxkZXJfMSIsIm1heEJvZHlMZW5ndGgiLCJSZXF1ZXN0IiwibWV0aG9kIiwib25DYWxsT3B0aW9ucyIsImJhc2ljIiwiYmFzZTY0IiwiZW5jb2RlIiwib25DYWxsSGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJwYXJhbXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiVVJMU2VhcmNoUGFyYW1zIiwidXJsVmFsdWUiLCJheGlvc18xIiwidG9Mb2NhbGVVcHBlckNhc2UiLCJfZCIsImVycm9yUmVzcG9uc2UiLCJlcnJfMSIsImdldFJlc3BvbnNlQm9keSIsImFkZERlZmF1bHRIZWFkZXJzIiwicmVxdWVzdE9wdGlvbnMiLCJjb21tYW5kIiwiY3JlYXRlRm9ybURhdGEiLCJSZXNvbHV0aW9uIiwiU3VwcHJlc3Npb25Nb2RlbHMiLCJXZWJob29rc0lkcyIsIlllc05vIiwiX19leHBvcnRTdGFyIiwiRm9ybURhdGEiLCJNYWlsZ3VuIiwiTWFpbGd1bkNsaWVudF8xIl0sInNvdXJjZVJvb3QiOiIifQ==