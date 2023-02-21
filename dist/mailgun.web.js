/*! mailgun.js v8.0.6 */
/*! mailgun.js v8.0.6 */
define(() => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

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
    adapter = __webpack_require__(/*! ../adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
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
    FormData: __webpack_require__(/*! ./env/FormData */ "./node_modules/axios/lib/helpers/null.js")
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

/***/ "./node_modules/axios/lib/helpers/null.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/null.js ***!
  \************************************************/
/***/ ((module) => {

// eslint-disable-next-line strict
module.exports = null;


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
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/
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
/******/
/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDREQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsa0VBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBQSxhQUFBQSxtQkFBQUEsQ0FBQUEseURBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSwrREFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLG1FQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsK0RBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsZ0ZBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSxnRUFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREFBLGFBQUFBLG1CQUFBQSxDQUFBQSxrREFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLG9EQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsZ0VBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSw4REFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLGdEQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsOERBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSw0REFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkFBLGFBQUFBLG1CQUFBQSxDQUFBQSw0Q0FBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLHdEQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsa0RBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSx3RUFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLDhEQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBQSxhQUFBQSxtQkFBQUEsQ0FBQUEscUVBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSxpREFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLHVEQUFBQTtBQUNBQSxhQUFBQSxtQkFBQUEsQ0FBQUEsaUVBQUFBO0FBQ0FBLGFBQUFBLG1CQUFBQSxDQUFBQSwrREFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkFBLGFBQUFBLG1CQUFBQSxDQUFBQSw4Q0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUFBLGFBQUFBLG1CQUFBQSxDQUFBQSxpREFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUFBLGFBQUFBLG1CQUFBQSxDQUFBQSxxQ0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUFBLGFBQUFBLG1CQUFBQSxDQUFBQSxpRkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUFBLGFBQUFBLG1CQUFBQSxDQUFBQSw0RUFBQUE7QUFDQUEsYUFBQUEsbUJBQUFBLENBQUFBLGdFQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQUEsYUFBQUEsbUJBQUFBLENBQUFBLG9EQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQUEsYUFBQUEsbUJBQUFBLENBQUFBLDhD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O0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7O1VDN0VEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVKQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zRXJyb3IuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9lbnYvZGF0YS5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b0Zvcm1EYXRhLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc0NyZWRlbnRpYWxzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNUYWdzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNUZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0V2ZW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSVBQb29scy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSVBzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NYWlsaW5nTGlzdHMvbWFpbExpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NZXNzYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvUm91dGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdGF0cy9TdGF0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3RhdHMvU3RhdHNDb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9Cb3VuY2UudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9Db21wbGFpbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1Vuc3Vic2NyaWJlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvV2hpdGVMaXN0LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9WYWxpZGF0aW9ucy9tdWx0aXBsZVZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1ZhbGlkYXRpb25zL3ZhbGlkYXRlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9XZWJob29rcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvY29tbW9uL0Vycm9yLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vRm9ybURhdGFCdWlsZGVyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvY29tbW9uL1JlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9FbnVtcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvQ29tbW9uL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Eb21haW5zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsZ3VuQ2xpZW50L2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N0YXRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1ZhbGlkYXRpb25zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWluVHJhY2tpbmcudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRXZlbnRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvSVBQb29scy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0lQcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxndW5DbGllbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NYWlsaW5nTGlzdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NZXNzYWdlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1JvdXRlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N0YXRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvVmFsaWRhdGlvbnMvVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1ZhbGlkYXRpb25zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvV2ViaG9va3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy91cmwtam9pbi9saWIvdXJsLWpvaW4uanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwnKTtcbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yJyk7XG52YXIgcGFyc2VQcm90b2NvbCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcGFyc2VQcm90b2NvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG4gICAgdmFyIHJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgdmFyIG9uQ2FuY2VsZWQ7XG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpICYmIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCAgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICB2YXIgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4gfHwgY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBmdW5jdGlvbihjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IChjYW5jZWwgJiYgY2FuY2VsLnR5cGUpID8gbmV3IENhbmNlbGVkRXJyb3IoKSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4gJiYgY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChjb25maWcuc2lnbmFsKSB7XG4gICAgICAgIGNvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IGNvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvY29sID0gcGFyc2VQcm90b2NvbChmdWxsUGF0aCk7XG5cbiAgICBpZiAocHJvdG9jb2wgJiYgWyAnaHR0cCcsICdodHRwcycsICdmaWxlJyBdLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBjb25maWcpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3InKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcbmF4aW9zLlZFUlNJT04gPSByZXF1aXJlKCcuL2Vudi9kYXRhJykudmVyc2lvbjtcbmF4aW9zLnRvRm9ybURhdGEgPSByZXF1aXJlKCcuL2hlbHBlcnMvdG9Gb3JtRGF0YScpO1xuXG4vLyBFeHBvc2UgQXhpb3NFcnJvciBjbGFzc1xuYXhpb3MuQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2xpYi9jb3JlL0F4aW9zRXJyb3InKTtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vaGVscGVycy9pc0F4aW9zRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWxlZEVycm9yID0gcmVxdWlyZSgnLi9DYW5jZWxlZEVycm9yJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcblxuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICB0aGlzLnByb21pc2UudGhlbihmdW5jdGlvbihjYW5jZWwpIHtcbiAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgIHZhciBpO1xuICAgIHZhciBsID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0b2tlbi5fbGlzdGVuZXJzW2ldKGNhbmNlbCk7XG4gICAgfVxuICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICB9KTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICB0aGlzLnByb21pc2UudGhlbiA9IGZ1bmN0aW9uKG9uZnVsZmlsbGVkKSB7XG4gICAgdmFyIF9yZXNvbHZlO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICB0b2tlbi5zdWJzY3JpYmUocmVzb2x2ZSk7XG4gICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICBwcm9taXNlLmNhbmNlbCA9IGZ1bmN0aW9uIHJlamVjdCgpIHtcbiAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH07XG5cbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAqL1xuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIGxpc3RlbmVyKHRoaXMucmVhc29uKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IFtsaXN0ZW5lcl07XG4gIH1cbn07XG5cbi8qKlxuICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICovXG5cbkNhbmNlbFRva2VuLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVEKTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscy5pbmhlcml0cyhDYW5jZWxlZEVycm9yLCBBeGlvc0Vycm9yLCB7XG4gIF9fQ0FOQ0VMX186IHRydWVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi9idWlsZEZ1bGxQYXRoJyk7XG52YXIgdmFsaWRhdG9yID0gcmVxdWlyZSgnLi4vaGVscGVycy92YWxpZGF0b3InKTtcblxudmFyIHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XG4gIH1cblxuICB2YXIgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbDtcblxuICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgIHNpbGVudEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgLy8gZmlsdGVyIG91dCBza2lwcGVkIGludGVyY2VwdG9yc1xuICB2YXIgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgdmFyIHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHRydWU7XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdmFyIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB2YXIgcHJvbWlzZTtcblxuICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG5cbiAgICBBcnJheS5wcm90b3R5cGUudW5zaGlmdC5hcHBseShjaGFpbiwgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4pO1xuICAgIGNoYWluID0gY2hhaW4uY29uY2F0KHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG5cbiAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG5cbiAgdmFyIG5ld0NvbmZpZyA9IGNvbmZpZztcbiAgd2hpbGUgKHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aCkge1xuICAgIHZhciBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCk7XG4gICAgdmFyIG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5zaGlmdCgpO1xuICAgIHRyeSB7XG4gICAgICBuZXdDb25maWcgPSBvbkZ1bGZpbGxlZChuZXdDb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBvblJlamVjdGVkKGVycm9yKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdChuZXdDb25maWcpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cblxuICB3aGlsZSAocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCksIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBnZW5lcmF0ZUhUVFBNZXRob2QoKTtcblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICByZXNwb25zZSAmJiAodGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlKTtcbn1cblxudXRpbHMuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMucmVzcG9uc2UgJiYgdGhpcy5yZXNwb25zZS5zdGF0dXMgPyB0aGlzLnJlc3BvbnNlLnN0YXR1cyA6IG51bGxcbiAgICB9O1xuICB9XG59KTtcblxudmFyIHByb3RvdHlwZSA9IEF4aW9zRXJyb3IucHJvdG90eXBlO1xudmFyIGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXS5mb3JFYWNoKGZ1bmN0aW9uKGNvZGUpIHtcbiAgZGVzY3JpcHRvcnNbY29kZV0gPSB7dmFsdWU6IGNvZGV9O1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEF4aW9zRXJyb3IsIGRlc2NyaXB0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IGZ1bmN0aW9uKGVycm9yLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlLCBjdXN0b21Qcm9wcykge1xuICB2YXIgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcblxuICB1dGlscy50b0ZsYXRPYmplY3QoZXJyb3IsIGF4aW9zRXJyb3IsIGZ1bmN0aW9uIGZpbHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBFcnJvci5wcm90b3R5cGU7XG4gIH0pO1xuXG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBlcnJvci5tZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICBheGlvc0Vycm9yLm5hbWUgPSBlcnJvci5uYW1lO1xuXG4gIGN1c3RvbVByb3BzICYmIE9iamVjdC5hc3NpZ24oYXhpb3NFcnJvciwgY3VzdG9tUHJvcHMpO1xuXG4gIHJldHVybiBheGlvc0Vycm9yO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvc0Vycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCwgb3B0aW9ucykge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZCxcbiAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgY29uZmlnLFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICBjb25maWcsXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGlyZWN0S2V5cyhwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbWVyZ2VNYXAgPSB7XG4gICAgJ3VybCc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ21ldGhvZCc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ2RhdGEnOiB2YWx1ZUZyb21Db25maWcyLFxuICAgICdiYXNlVVJMJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNmb3JtUmVxdWVzdCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RyYW5zZm9ybVJlc3BvbnNlJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAncGFyYW1zU2VyaWFsaXplcic6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RpbWVvdXQnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd0aW1lb3V0TWVzc2FnZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3dpdGhDcmVkZW50aWFscyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2FkYXB0ZXInOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdyZXNwb25zZVR5cGUnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd4c3JmQ29va2llTmFtZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnb25VcGxvYWRQcm9ncmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ29uRG93bmxvYWRQcm9ncmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2RlY29tcHJlc3MnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnbWF4Qm9keUxlbmd0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2JlZm9yZVJlZGlyZWN0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNwb3J0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnaHR0cEFnZW50JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnaHR0cHNBZ2VudCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2NhbmNlbFRva2VuJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnc29ja2V0UGF0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3Jlc3BvbnNlRW5jb2RpbmcnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd2YWxpZGF0ZVN0YXR1cyc6IG1lcmdlRGlyZWN0S2V5c1xuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoY29uZmlnMSkuY29uY2F0KE9iamVjdC5rZXlzKGNvbmZpZzIpKSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICB2YXIgbWVyZ2UgPSBtZXJnZU1hcFtwcm9wXSB8fCBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIHZhciBjb25maWdWYWx1ZSA9IG1lcmdlKHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi9BeGlvc0Vycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIHZhciBjb250ZXh0ID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb250ZXh0LCBkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSByZXF1aXJlKCcuL3RyYW5zaXRpb25hbCcpO1xudmFyIHRvRm9ybURhdGEgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3RvRm9ybURhdGEnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG5cbiAgdHJhbnNpdGlvbmFsOiB0cmFuc2l0aW9uYWxEZWZhdWx0cyxcblxuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICB2YXIgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG4gICAgdmFyIGNvbnRlbnRUeXBlID0gaGVhZGVycyAmJiBoZWFkZXJzWydDb250ZW50LVR5cGUnXTtcblxuICAgIHZhciBpc0ZpbGVMaXN0O1xuXG4gICAgaWYgKChpc0ZpbGVMaXN0ID0gdXRpbHMuaXNGaWxlTGlzdChkYXRhKSkgfHwgKGlzT2JqZWN0UGF5bG9hZCAmJiBjb250ZW50VHlwZSA9PT0gJ211bHRpcGFydC9mb3JtLWRhdGEnKSkge1xuICAgICAgdmFyIF9Gb3JtRGF0YSA9IHRoaXMuZW52ICYmIHRoaXMuZW52LkZvcm1EYXRhO1xuICAgICAgcmV0dXJuIHRvRm9ybURhdGEoaXNGaWxlTGlzdCA/IHsnZmlsZXNbXSc6IGRhdGF9IDogZGF0YSwgX0Zvcm1EYXRhICYmIG5ldyBfRm9ybURhdGEoKSk7XG4gICAgfSBlbHNlIGlmIChpc09iamVjdFBheWxvYWQgfHwgY29udGVudFR5cGUgPT09ICdhcHBsaWNhdGlvbi9qc29uJykge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICByZXR1cm4gc3RyaW5naWZ5U2FmZWx5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICB2YXIgdHJhbnNpdGlvbmFsID0gdGhpcy50cmFuc2l0aW9uYWwgfHwgZGVmYXVsdHMudHJhbnNpdGlvbmFsO1xuICAgIHZhciBzaWxlbnRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuc2lsZW50SlNPTlBhcnNpbmc7XG4gICAgdmFyIGZvcmNlZEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5mb3JjZWRKU09OUGFyc2luZztcbiAgICB2YXIgc3RyaWN0SlNPTlBhcnNpbmcgPSAhc2lsZW50SlNPTlBhcnNpbmcgJiYgdGhpcy5yZXNwb25zZVR5cGUgPT09ICdqc29uJztcblxuICAgIGlmIChzdHJpY3RKU09OUGFyc2luZyB8fCAoZm9yY2VkSlNPTlBhcnNpbmcgJiYgdXRpbHMuaXNTdHJpbmcoZGF0YSkgJiYgZGF0YS5sZW5ndGgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XG4gICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiByZXF1aXJlKCcuL2Vudi9Gb3JtRGF0YScpXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgICB9XG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaWxlbnRKU09OUGFyc2luZzogdHJ1ZSxcbiAgZm9yY2VkSlNPTlBhcnNpbmc6IHRydWUsXG4gIGNsYXJpZnlUaW1lb3V0RXJyb3I6IGZhbHNlXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwidmVyc2lvblwiOiBcIjAuMjcuMlwiXG59OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG5tb2R1bGUuZXhwb3J0cyA9IG51bGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIHZhciBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgRm9ybURhdGEoKTtcblxuICB2YXIgc3RhY2sgPSBbXTtcblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGQoZGF0YSwgcGFyZW50S2V5KSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoZGF0YSkgfHwgdXRpbHMuaXNBcnJheShkYXRhKSkge1xuICAgICAgaWYgKHN0YWNrLmluZGV4T2YoZGF0YSkgIT09IC0xKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhcmVudEtleSk7XG4gICAgICB9XG5cbiAgICAgIHN0YWNrLnB1c2goZGF0YSk7XG5cbiAgICAgIHV0aWxzLmZvckVhY2goZGF0YSwgZnVuY3Rpb24gZWFjaCh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcbiAgICAgICAgdmFyIGZ1bGxLZXkgPSBwYXJlbnRLZXkgPyBwYXJlbnRLZXkgKyAnLicgKyBrZXkgOiBrZXk7XG4gICAgICAgIHZhciBhcnI7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmICFwYXJlbnRLZXkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgIXV0aWxzLmlzVW5kZWZpbmVkKGVsKSAmJiBmb3JtRGF0YS5hcHBlbmQoZnVsbEtleSwgY29udmVydFZhbHVlKGVsKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBidWlsZCh2YWx1ZSwgZnVsbEtleSk7XG4gICAgICB9KTtcblxuICAgICAgc3RhY2sucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChwYXJlbnRLZXksIGNvbnZlcnRWYWx1ZShkYXRhKSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Gb3JtRGF0YTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFZFUlNJT04gPSByZXF1aXJlKCcuLi9lbnYvZGF0YScpLnZlcnNpb247XG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xuXG52YXIgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goZnVuY3Rpb24odHlwZSwgaSkge1xuICB2YWxpZGF0b3JzW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxudmFyIGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xudmFsaWRhdG9ycy50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3B0LCBvcHRzKSB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICB2YXIgb3B0ID0ga2V5c1tpXTtcbiAgICB2YXIgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgdmFyIHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgdmFyIHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXNzZXJ0T3B0aW9uczogYXNzZXJ0T3B0aW9ucyxcbiAgdmFsaWRhdG9yczogdmFsaWRhdG9yc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xudmFyIGtpbmRPZiA9IChmdW5jdGlvbihjYWNoZSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odGhpbmcpIHtcbiAgICB2YXIgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xuICB9O1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmZ1bmN0aW9uIGtpbmRPZlRlc3QodHlwZSkge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gZnVuY3Rpb24gaXNLaW5kT2YodGhpbmcpIHtcbiAgICByZXR1cm4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZTtcbiAgfTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbCkge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHRoaW5nKSB7XG4gIHZhciBwYXR0ZXJuID0gJ1tvYmplY3QgRm9ybURhdGFdJztcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8XG4gICAgdG9TdHJpbmcuY2FsbCh0aGluZykgPT09IHBhdHRlcm4gfHxcbiAgICAoaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gcGF0dGVybilcbiAgKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci50cmltID8gc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICogQHJldHVybiB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKi9cblxuZnVuY3Rpb24gaW5oZXJpdHMoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZmlsdGVyXVxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiB0b0ZsYXRPYmplY3Qoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIpIHtcbiAgdmFyIHByb3BzO1xuICB2YXIgaTtcbiAgdmFyIHByb3A7XG4gIHZhciBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICghbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59XG5cbi8qXG4gKiBkZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICB2YXIgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0XG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gdG9BcnJheSh0aGluZykge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgdmFyIGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmIChpc1VuZGVmaW5lZChpKSkgcmV0dXJuIG51bGw7XG4gIHZhciBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbnZhciBpc1R5cGVkQXJyYXkgPSAoZnVuY3Rpb24oVHlwZWRBcnJheSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odGhpbmcpIHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW0sXG4gIHN0cmlwQk9NOiBzdHJpcEJPTSxcbiAgaW5oZXJpdHM6IGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3Q6IHRvRmxhdE9iamVjdCxcbiAga2luZE9mOiBraW5kT2YsXG4gIGtpbmRPZlRlc3Q6IGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoOiBlbmRzV2l0aCxcbiAgdG9BcnJheTogdG9BcnJheSxcbiAgaXNUeXBlZEFycmF5OiBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3Q6IGlzRmlsZUxpc3Rcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7XG4gIElEb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gIElEb21haW5UYWdzQ2xpZW50LFxuICBJRG9tYWluQ3JlZGVudGlhbHNcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcblxuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvcic7XG5pbXBvcnQgeyBBUElFcnJvck9wdGlvbnMgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCBEb21haW5DcmVkZW50aWFsc0NsaWVudCBmcm9tICcuL2RvbWFpbnNDcmVkZW50aWFscyc7XG5pbXBvcnQgRG9tYWluVGVtcGxhdGVzQ2xpZW50IGZyb20gJy4vZG9tYWluc1RlbXBsYXRlcyc7XG5pbXBvcnQgRG9tYWluVGFnc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUYWdzJztcbmltcG9ydCB7XG4gIEROU1JlY29yZCxcbiAgRG9tYWluU2hvcnREYXRhLFxuICBEZXN0cm95ZWREb21haW5SZXNwb25zZSxcbiAgTWVzc2FnZVJlc3BvbnNlLFxuICBEb21haW5MaXN0UmVzcG9uc2VEYXRhLFxuICBEb21haW5SZXNwb25zZURhdGEsXG4gIERvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIERvbWFpblRyYWNraW5nRGF0YSxcbiAgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSxcbiAgVXBkYXRlZE9wZW5UcmFja2luZyxcbiAgRG9tYWluc1F1ZXJ5LFxuICBEb21haW5JbmZvLFxuICBDb25uZWN0aW9uU2V0dGluZ3MsXG4gIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlLFxuICBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzLFxuICBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFJlcGxhY2VtZW50Rm9yUG9vbCxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlLFxuICBES0lNU2VsZWN0b3JJbmZvLFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFdlYlByZWZpeEluZm8sXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGNsYXNzIERvbWFpbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xuICBzdGF0ZTogc3RyaW5nO1xuICB3aWxkY2FyZDogYm9vbGVhbjtcbiAgc3BhbV9hY3Rpb246IHN0cmluZztcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICBzbXRwX3Bhc3N3b3JkOiBzdHJpbmc7XG4gIHNtdHBfbG9naW46IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICByZWNlaXZpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgc2VuZGluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IERvbWFpblNob3J0RGF0YSwgcmVjZWl2aW5nPzogRE5TUmVjb3JkW10gfCBudWxsLCBzZW5kaW5nPzogRE5TUmVjb3JkW10gfCBudWxsKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMucmVxdWlyZV90bHMgPSBkYXRhLnJlcXVpcmVfdGxzO1xuICAgIHRoaXMuc2tpcF92ZXJpZmljYXRpb24gPSBkYXRhLnNraXBfdmVyaWZpY2F0aW9uO1xuICAgIHRoaXMuc3RhdGUgPSBkYXRhLnN0YXRlO1xuICAgIHRoaXMud2lsZGNhcmQgPSBkYXRhLndpbGRjYXJkO1xuICAgIHRoaXMuc3BhbV9hY3Rpb24gPSBkYXRhLnNwYW1fYWN0aW9uO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IGRhdGEuY3JlYXRlZF9hdDtcbiAgICB0aGlzLnNtdHBfcGFzc3dvcmQgPSBkYXRhLnNtdHBfcGFzc3dvcmQ7XG4gICAgdGhpcy5zbXRwX2xvZ2luID0gZGF0YS5zbXRwX2xvZ2luO1xuICAgIHRoaXMudHlwZSA9IGRhdGEudHlwZTtcblxuICAgIHRoaXMucmVjZWl2aW5nX2Ruc19yZWNvcmRzID0gcmVjZWl2aW5nIHx8IG51bGw7XG4gICAgdGhpcy5zZW5kaW5nX2Ruc19yZWNvcmRzID0gc2VuZGluZyB8fCBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHB1YmxpYyBkb21haW5DcmVkZW50aWFsczogSURvbWFpbkNyZWRlbnRpYWxzO1xuICBwdWJsaWMgZG9tYWluVGVtcGxhdGVzOiBJRG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuICBwdWJsaWMgZG9tYWluVGFnczogSURvbWFpblRhZ3NDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBkb21haW5DcmVkZW50aWFsc0NsaWVudDogRG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgZG9tYWluVGVtcGxhdGVzQ2xpZW50OiBEb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgZG9tYWluVGFnc0NsaWVudDogRG9tYWluVGFnc0NsaWVudFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuZG9tYWluQ3JlZGVudGlhbHMgPSBkb21haW5DcmVkZW50aWFsc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRlbXBsYXRlcyA9IGRvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRhZ3MgPSBkb21haW5UYWdzQ2xpZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlKHJlc3BvbnNlOiBEZXN0cm95ZWREb21haW5SZXNwb25zZSkgOiBNZXNzYWdlUmVzcG9uc2Uge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZURvbWFpbkxpc3QocmVzcG9uc2U6IERvbWFpbkxpc3RSZXNwb25zZURhdGEpOiBEb21haW5bXSB7XG4gICAgaWYgKHJlc3BvbnNlLmJvZHkgJiYgcmVzcG9uc2UuYm9keS5pdGVtcykge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9tYWluKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluKHJlc3BvbnNlOiBEb21haW5SZXNwb25zZURhdGEpOiBEb21haW4ge1xuICAgIHJldHVybiBuZXcgRG9tYWluKFxuICAgICAgcmVzcG9uc2UuYm9keS5kb21haW4sXG4gICAgICByZXNwb25zZS5ib2R5LnJlY2VpdmluZ19kbnNfcmVjb3JkcyxcbiAgICAgIHJlc3BvbnNlLmJvZHkuc2VuZGluZ19kbnNfcmVjb3Jkc1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRyYWNraW5nU2V0dGluZ3MocmVzcG9uc2U6IERvbWFpblRyYWNraW5nUmVzcG9uc2UpIDogRG9tYWluVHJhY2tpbmdEYXRhIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keS50cmFja2luZztcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVHJhY2tpbmdVcGRhdGUocmVzcG9uc2U6IFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UpIDpVcGRhdGVkT3BlblRyYWNraW5nIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgfVxuXG4gIGxpc3QocXVlcnk/OiBEb21haW5zUXVlcnkpOiBQcm9taXNlPERvbWFpbltdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9kb21haW5zJywgcXVlcnkpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VEb21haW5MaXN0KHJlcyBhcyBEb21haW5MaXN0UmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcpIDogUHJvbWlzZTxEb21haW4+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL2RvbWFpbnMvJHtkb21haW59YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IERvbWFpbkluZm8pIDogUHJvbWlzZTxEb21haW4+IHtcbiAgICBjb25zdCBwb3N0T2JqID0geyAuLi5kYXRhIH07XG4gICAgaWYgKCdmb3JjZV9ka2ltX2F1dGhvcml0eScgaW4gcG9zdE9iaiAmJiB0eXBlb2YgcG9zdE9iai5mb3JjZV9ka2ltX2F1dGhvcml0eSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBwb3N0T2JqLmZvcmNlX2RraW1fYXV0aG9yaXR5ID0gcG9zdE9iai5mb3JjZV9ka2ltX2F1dGhvcml0eS50b1N0cmluZygpID09PSAndHJ1ZScgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YzL2RvbWFpbnMnLCBwb3N0T2JqKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICB2ZXJpZnkoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vdmVyaWZ5YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZyk6IFByb21pc2U8TWVzc2FnZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92My9kb21haW5zLyR7ZG9tYWlufWApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZShyZXMgYXMgRGVzdHJveWVkRG9tYWluUmVzcG9uc2UpKTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPENvbm5lY3Rpb25TZXR0aW5ncz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vY29ubmVjdGlvbmApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSlcbiAgICAgIC50aGVuKChyZXM6Q29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UpID0+IHJlcy5ib2R5LmNvbm5lY3Rpb24gYXMgQ29ubmVjdGlvblNldHRpbmdzKTtcbiAgfVxuXG4gIHVwZGF0ZUNvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcsIGRhdGE6IENvbm5lY3Rpb25TZXR0aW5ncyk6IFByb21pc2U8VXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vY29ubmVjdGlvbmAsIGRhdGEpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzKVxuICAgICAgLnRoZW4oKHJlczpVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzKSA9PiByZXMuYm9keSBhcyBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzKTtcbiAgfVxuXG4gIC8vIFRyYWNraW5nXG5cbiAgZ2V0VHJhY2tpbmcoZG9tYWluOiBzdHJpbmcpIDogUHJvbWlzZTxEb21haW5UcmFja2luZ0RhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJykpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVRyYWNraW5nU2V0dGluZ3MpO1xuICB9XG5cbiAgdXBkYXRlVHJhY2tpbmcoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IE9wZW5UcmFja2luZ0luZm8gfCBDbGlja1RyYWNraW5nSW5mbyB8IFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvXG4gICk6IFByb21pc2U8VXBkYXRlZE9wZW5UcmFja2luZz4ge1xuICAgIGlmICh0eXBlb2YgZGF0YT8uYWN0aXZlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7IHN0YXR1czogNDAwLCBzdGF0dXNUZXh0OiAnUmVjZWl2ZWQgYm9vbGVhbiB2YWx1ZSBmb3IgYWN0aXZlIHByb3BlcnR5JywgYm9keTogeyBtZXNzYWdlOiAnUHJvcGVydHkgXCJhY3RpdmVcIiBtdXN0IGNvbnRhaW4gc3RyaW5nIHZhbHVlLicgfSB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnLCB0eXBlKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VUcmFja2luZ1VwZGF0ZShyZXMgYXMgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSkpO1xuICB9XG5cbiAgLy8gSVBzXG5cbiAgZ2V0SXBzKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJykpXG4gICAgICAudGhlbigocmVzcG9uc2U6IEFQSVJlc3BvbnNlKSA9PiByZXNwb25zZT8uYm9keT8uaXRlbXMpO1xuICB9XG5cbiAgYXNzaWduSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgaXAgfSk7XG4gIH1cblxuICBkZWxldGVJcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsIGlwKSk7XG4gIH1cblxuICBsaW5rSXBQb29sKGRvbWFpbjogc3RyaW5nLCBwb29sX2lkOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgcG9vbF9pZCB9KTtcbiAgfVxuXG4gIHVubGlua0lwUG9sbChkb21haW46IHN0cmluZywgcmVwbGFjZW1lbnQ6IFJlcGxhY2VtZW50Rm9yUG9vbCk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gJyc7XG4gICAgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQgJiYgcmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcihcbiAgICAgICAge1xuICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgIHN0YXR1c1RleHQ6ICdUb28gbXVjaCBkYXRhIGZvciByZXBsYWNlbWVudCcsXG4gICAgICAgICAgYm9keTogeyBtZXNzYWdlOiAnUGxlYXNlIHNwZWNpZnkgZWl0aGVyIHBvb2xfaWQgb3IgaXAgKG5vdCBib3RoKScgfVxuICAgICAgICB9IGFzIEFQSUVycm9yT3B0aW9uc1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/cG9vbF9pZD0ke3JlcGxhY2VtZW50LnBvb2xfaWR9YDtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICBzZWFyY2hQYXJhbXMgPSBgP2lwPSR7cmVwbGFjZW1lbnQuaXB9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCAnaXBfcG9vbCcsIHNlYXJjaFBhcmFtcykpO1xuICB9XG5cbiAgdXBkYXRlREtJTUF1dGhvcml0eShkb21haW46IHN0cmluZywgZGF0YTogREtJTUF1dGhvcml0eUluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNQXV0aG9yaXR5PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX2F1dGhvcml0eWAsIHt9LCB7IHF1ZXJ5OiBgc2VsZj0ke2RhdGEuc2VsZn1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlcyA6IFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5KTtcbiAgfVxuXG4gIHVwZGF0ZURLSU1TZWxlY3Rvcihkb21haW46IHN0cmluZywgZGF0YTogREtJTVNlbGVjdG9ySW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX3NlbGVjdG9yYCwge30sIHsgcXVlcnk6IGBka2ltX3NlbGVjdG9yPSR7ZGF0YS5ka2ltU2VsZWN0b3J9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZVdlYlByZWZpeChkb21haW46IHN0cmluZywgZGF0YTogV2ViUHJlZml4SW5mbyk6IFByb21pc2U8VXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS93ZWJfcHJlZml4YCwge30sIHsgcXVlcnk6IGB3ZWJfcHJlZml4PSR7ZGF0YS53ZWJQcmVmaXh9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuaW1wb3J0IHsgSURvbWFpbkNyZWRlbnRpYWxzIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcbmltcG9ydCB7XG4gIERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhLFxuICBEb21haW5DcmVkZW50aWFsc0xpc3QsXG4gIENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSxcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQsXG4gIERlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlLFxuICBEb21haW5DcmVkZW50aWFsc1F1ZXJ5LFxuICBEb21haW5DcmVkZW50aWFscyxcbiAgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5DcmVkZW50aWFsc0NsaWVudCBpbXBsZW1lbnRzIElEb21haW5DcmVkZW50aWFscyB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My9kb21haW5zLyc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChcbiAgICByZXNwb25zZTogRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGFcbiAgKTogRG9tYWluQ3JlZGVudGlhbHNMaXN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IHJlc3BvbnNlLmJvZHkuaXRlbXMsXG4gICAgICB0b3RhbENvdW50OiByZXNwb25zZS5ib2R5LnRvdGFsX2NvdW50XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlTWVzc2FnZVJlc3BvbnNlKFxuICAgIHJlc3BvbnNlOiBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VcbiAgKTogRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgfSBhcyBEb21haW5DcmVkZW50aWFsc1Jlc3VsdDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEZWxldGVkUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6RGVsZXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VcbiAgKTogRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgc3BlYzogcmVzcG9uc2UuYm9keS5zcGVjXG4gICAgfSBhcyBEb21haW5DcmVkZW50aWFsc1Jlc3VsdDtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpbkNyZWRlbnRpYWxzUXVlcnkpOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy9jcmVkZW50aWFscycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QocmVzIGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhKVxuICAgICAgKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5DcmVkZW50aWFsc1xuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFsc2AsIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nLFxuICAgIGRhdGE6IFVwZGF0ZURvbWFpbkNyZWRlbnRpYWxzRGF0YVxuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzLyR7Y3JlZGVudGlhbHNMb2dpbn1gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFscy8ke2NyZWRlbnRpYWxzTG9naW59YClcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURlbGV0ZWRSZXNwb25zZShyZXMpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0LFxuICBJRG9tYWluVGFnc0NsaWVudFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgUmVzb2x1dGlvbiB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7XG4gIERvbWFpblRhZ3NJdGVtLFxuICBEb21haW5UYWdzSXRlbUluZm8sXG4gIERvbWFpblRhZ1N0YXRpc3RpY0l0ZW0sXG4gIERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0sXG4gIERvbWFpblRhZ3NMaXN0LFxuICBEb21haW5UYWdzUmVzcG9uc2VEYXRhLFxuICBEb21haW5UYWdzUXVlcnksXG4gIERvbWFpblRhZ3NNZXNzYWdlUmVzLFxuICBEb21haW5UYWdzU3RhdGlzdGljUXVlcnksXG4gIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ1Byb3ZpZGVyc0FQSVJlc3BvbnNlLFxuICBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ0RldmljZXNBUElSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZyBpbXBsZW1lbnRzIERvbWFpblRhZ3NJdGVtIHtcbiAgdGFnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICdmaXJzdC1zZWVuJzogRGF0ZTtcbiAgJ2xhc3Qtc2Vlbic6IERhdGU7XG5cbiAgY29uc3RydWN0b3IodGFnSW5mbzogRG9tYWluVGFnc0l0ZW1JbmZvKSB7XG4gICAgdGhpcy50YWcgPSB0YWdJbmZvLnRhZztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnSW5mby5kZXNjcmlwdGlvbjtcbiAgICB0aGlzWydmaXJzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydmaXJzdC1zZWVuJ10pO1xuICAgIHRoaXNbJ2xhc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snbGFzdC1zZWVuJ10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UYWdTdGF0aXN0aWMgaW1wbGVtZW50cyBJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0IHtcbiAgdGFnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHN0YXJ0OiBEYXRlO1xuICBlbmQ6IERhdGU7XG4gIHJlc29sdXRpb246IFJlc29sdXRpb247XG4gIHN0YXRzOiBEb21haW5UYWdTdGF0aXN0aWNJdGVtW107XG5cbiAgY29uc3RydWN0b3IodGFnU3RhdGlzdGljSW5mbzogRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlKSB7XG4gICAgdGhpcy50YWcgPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkudGFnO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuZGVzY3JpcHRpb247XG4gICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGFydCk7XG4gICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSh0YWdTdGF0aXN0aWNJbmZvLmJvZHkuZW5kKTtcbiAgICB0aGlzLnJlc29sdXRpb24gPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkucmVzb2x1dGlvbjtcbiAgICB0aGlzLnN0YXRzID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdDogRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0pIHtcbiAgICAgIGNvbnN0IHJlcyA9IHsgLi4uc3RhdCwgdGltZTogbmV3IERhdGUoc3RhdC50aW1lKSB9O1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5UYWdzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxEb21haW5UYWdzTGlzdD5cbiAgaW1wbGVtZW50cyBJRG9tYWluVGFnc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSxcbiAgKTogRG9tYWluVGFnc0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBEb21haW5UYWdzTGlzdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoKHRhZ0luZm86IERvbWFpblRhZ3NJdGVtSW5mbykgPT4gbmV3IERvbWFpblRhZyh0YWdJbmZvKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAndGFnJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRhZ1N0YXRpc3RpYyhcbiAgICByZXNwb25zZTogRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlXG4gICk6IERvbWFpblRhZ1N0YXRpc3RpYyB7XG4gICAgcmV0dXJuIG5ldyBEb21haW5UYWdTdGF0aXN0aWMocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5UYWdzUXVlcnkpOiBQcm9taXNlPERvbWFpblRhZ3NMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnKSwgcXVlcnkpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnc0l0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UYWcocmVzLmJvZHkpXG4gICAgICApO1xuICB9XG5cbiAgdXBkYXRlKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZyksIGRlc2NyaXB0aW9uKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdzTWVzc2FnZVJlc1xuICAgICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGFnOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS90YWdzLyR7dGFnfWApXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gKFxuICAgICAgICB7XG4gICAgICAgICAgbWVzc2FnZTogcmVzLmJvZHkubWVzc2FnZSxcbiAgICAgICAgICBzdGF0dXM6IHJlcy5zdGF0dXNcbiAgICAgICAgfSBhcyBEb21haW5UYWdzTWVzc2FnZVJlcykpO1xuICB9XG5cbiAgc3RhdGlzdGljKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZywgcXVlcnk6IERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSlcbiAgICA6IFByb21pc2U8RG9tYWluVGFnU3RhdGlzdGljPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VUYWdTdGF0aXN0aWMocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGNvdW50cmllcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL2NvdW50cmllcycpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IERvbWFpblRhZ0NvdW50cmllc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvblxuICAgICAgKTtcbiAgfVxuXG4gIHByb3ZpZGVycyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL3Byb3ZpZGVycycpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IERvbWFpblRhZ1Byb3ZpZGVyc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvblxuICAgICAgKTtcbiAgfVxuXG4gIGRldmljZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvZGV2aWNlcycpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IERvbWFpblRhZ0RldmljZXNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIENyZWF0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UsXG4gIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlLFxuICBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQsXG4gIERvbWFpblRlbXBsYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVzUXVlcnksXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YSxcbiAgR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0LFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UsXG4gIE5vdGlmaWNhdGlvblJlc3VsdCxcbiAgU2hvcnRUZW1wbGF0ZVZlcnNpb24sXG4gIFRlbXBsYXRlUXVlcnksXG4gIFRlbXBsYXRlVmVyc2lvbixcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgSURvbWFpblRlbXBsYXRlLCBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcblxuZXhwb3J0IGNsYXNzIERvbWFpblRlbXBsYXRlSXRlbSBpbXBsZW1lbnRzIElEb21haW5UZW1wbGF0ZSB7XG4gIG5hbWUgOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uIDogc3RyaW5nO1xuICBjcmVhdGVkQXQgOiBEYXRlIHwgJyc7XG4gIGNyZWF0ZWRCeSA6IHN0cmluZztcbiAgaWQgOiBzdHJpbmc7XG4gIHZlcnNpb24/OiBUZW1wbGF0ZVZlcnNpb247XG4gIHZlcnNpb25zPzogU2hvcnRUZW1wbGF0ZVZlcnNpb25bXTtcblxuICBjb25zdHJ1Y3Rvcihkb21haW5UZW1wbGF0ZUZyb21BUEk6IElEb21haW5UZW1wbGF0ZSkge1xuICAgIHRoaXMubmFtZSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5uYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuZGVzY3JpcHRpb247XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0ID8gbmV3IERhdGUoZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRBdCkgOiAnJztcbiAgICB0aGlzLmNyZWF0ZWRCeSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQnk7XG4gICAgdGhpcy5pZCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5pZDtcblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbikge1xuICAgICAgdGhpcy52ZXJzaW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb247XG4gICAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24uY3JlYXRlZEF0KSB7XG4gICAgICAgIHRoaXMudmVyc2lvbi5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMgJiYgZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy52ZXJzaW9ucyA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5tYXAoKHZlcnNpb24pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyAuLi52ZXJzaW9uIH07XG4gICAgICAgIHJlc3VsdC5jcmVhdGVkQXQgPSBuZXcgRGF0ZSh2ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluVGVtcGxhdGVzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0PlxuICBpbXBsZW1lbnRzIElEb21haW5UZW1wbGF0ZXNDbGllbnQge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvJztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VDcmVhdGlvblJlc3BvbnNlKGRhdGE6IENyZWF0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpOiBEb21haW5UZW1wbGF0ZUl0ZW0ge1xuICAgIHJldHVybiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGRhdGEuYm9keS50ZW1wbGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UoXG4gICAgZGF0YTogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2VcbiAgKTogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHt9IGFzIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlID0gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkYXRhLmJvZHkudGVtcGxhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU11dGF0aW9uUmVzcG9uc2UoXG4gICAgZGF0YTogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlXG4gICk6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCA9IHt9IGFzIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZU5hbWUgPSBkYXRhLmJvZHkudGVtcGxhdGUubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VOb3RpZmljYXRpb25SZXNwb25zZShkYXRhOiBOb3RpZmljYXRpb25BUElSZXNwb25zZSk6IE5vdGlmaWNhdGlvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBOb3RpZmljYXRpb25SZXN1bHQgPSB7fSBhcyBOb3RpZmljYXRpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShcbiAgICBkYXRhOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZVxuICApOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge30gYXMgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZU5hbWUgPSBkYXRhLmJvZHkudGVtcGxhdGUubmFtZTtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZVZlcnNpb24gPSB7IHRhZzogZGF0YS5ib2R5LnRlbXBsYXRlLnZlcnNpb24udGFnIH07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KHJlc3BvbnNlOiBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UpOiBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgoZDogSURvbWFpblRlbXBsYXRlKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGQpKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhcbiAgICByZXNwb25zZTogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZVxuICApOiBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0O1xuXG4gICAgZGF0YS50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzcG9uc2UuYm9keS50ZW1wbGF0ZSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncCcpO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5KTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBxdWVyeSk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nLCBxdWVyeT86IFRlbXBsYXRlUXVlcnkpOiBQcm9taXNlPERvbWFpblRlbXBsYXRlSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXMuYm9keS50ZW1wbGF0ZSlcbiAgICAgICk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVEYXRhXG4gICk6IFByb21pc2U8RG9tYWluVGVtcGxhdGVJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IENyZWF0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VDcmVhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgdXBkYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YVxuICApOiBQcm9taXNlPFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSkpXG4gICAgICAudGhlbigocmVzOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgZGVzdHJveUFsbChkb21haW46IHN0cmluZyk6IFByb21pc2U8Tm90aWZpY2F0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpKVxuICAgICAgLnRoZW4oKHJlczogTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VOb3RpZmljYXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGNyZWF0ZVZlcnNpb24oXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YVxuICApOiBQcm9taXNlPENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucycpLCBkYXRhKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGdldFZlcnNpb24oZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGVtcGxhdGVJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlcy5ib2R5LnRlbXBsYXRlKVxuICAgICAgKTtcbiAgfVxuXG4gIHVwZGF0ZVZlcnNpb24oXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgdGFnOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YVxuICApOiBQcm9taXNlPE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZyksIGRhdGEpXG4gICAgICAudGhlbihcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAgICAgKHJlczogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpXG4gICAgICApO1xuICB9XG5cbiAgZGVzdHJveVZlcnNpb24oXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgdGFnOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpKVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAgIC50aGVuKChyZXM6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBsaXN0VmVyc2lvbnMoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBEb21haW5UZW1wbGF0ZXNRdWVyeVxuICApOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMocmVzKVxuICAgICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQge1xuICBFdmVudHNMaXN0LFxuICBFdmVudHNRdWVyeSxcbiAgRXZlbnRzUmVzcG9uc2UsXG59IGZyb20gJy4uL1R5cGVzL0V2ZW50cyc7XG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudENsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8RXZlbnRzTGlzdD4ge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogRXZlbnRzUmVzcG9uc2UsXG4gICk6IEV2ZW50c0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBFdmVudHNMaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICcvJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBnZXQoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRXZlbnRzUXVlcnkpIDogUHJvbWlzZTxFdmVudHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbignL3YzJywgZG9tYWluLCAnZXZlbnRzJyksIHF1ZXJ5KTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgSXBQb29sQ3JlYXRlRGF0YSxcbiAgSXBQb29sQ3JlYXRlUmVzcG9uc2UsXG4gIElwUG9vbENyZWF0ZVJlc3VsdCxcbiAgSXBQb29sRGVsZXRlRGF0YSxcbiAgSXBQb29sTGlzdFJlc3BvbnNlLFxuICBJcFBvb2xMaXN0UmVzdWx0LFxuICBJcFBvb2xNZXNzYWdlUmVzcG9uc2UsXG4gIElwUG9vbE1lc3NhZ2VSZXN1bHQsXG4gIElwUG9vbFVwZGF0ZURhdGEsXG59IGZyb20gJy4uL1R5cGVzL0lQUG9vbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcFBvb2xzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QoKTogUHJvbWlzZTxJcFBvb2xMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92MS9pcF9wb29scycpXG4gICAgICAudGhlbigocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZSkpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKGRhdGE6IElwUG9vbENyZWF0ZURhdGEpOiBQcm9taXNlPElwUG9vbENyZWF0ZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJcFBvb2xDcmVhdGVSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjEvaXBfcG9vbHMnLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sVXBkYXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJcFBvb2xNZXNzYWdlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucGF0Y2hXaXRoRkQoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sRGVsZXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOklwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5kZWxldGUoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJcFBvb2xzUmVzcG9uc2UocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSk6IElwUG9vbExpc3RSZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgTWdSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSXBEYXRhLCBJcHNMaXN0UmVzcG9uc2VCb2R5IH0gZnJvbSAnLi4vVHlwZXMvSVBzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXBzQ2xpZW50IHtcbiAgcmVxdWVzdDogTWdSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IE1nUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5OiBhbnkpOiBQcm9taXNlPElwc0xpc3RSZXNwb25zZUJvZHk+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92My9pcHMnLCBxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VJcHNSZXNwb25zZTxJcHNMaXN0UmVzcG9uc2VCb2R5PihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBnZXQoaXA6IHN0cmluZyk6IFByb21pc2U8SXBEYXRhPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvaXBzLyR7aXB9YCk7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VJcHNSZXNwb25zZTxJcERhdGE+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJcHNSZXNwb25zZTxUPihyZXNwb25zZTogeyBib2R5OiBUIH0pOiBUIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IE1haWxndW5DbGllbnRPcHRpb25zIH0gZnJvbSAnLi4vVHlwZXMvTWFpbGd1bkNsaWVudCc7XG5cbmltcG9ydCBEb21haW5DbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnMnO1xuaW1wb3J0IEV2ZW50Q2xpZW50IGZyb20gJy4vRXZlbnRzJztcbmltcG9ydCBTdGF0c0NsaWVudCBmcm9tICcuL1N0YXRzL1N0YXRzQ2xpZW50JztcbmltcG9ydCBTdXBwcmVzc2lvbkNsaWVudCBmcm9tICcuL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbnNDbGllbnQnO1xuaW1wb3J0IFdlYmhvb2tzQ2xpZW50IGZyb20gJy4vV2ViaG9va3MnO1xuaW1wb3J0IE1lc3NhZ2VzQ2xpZW50IGZyb20gJy4vTWVzc2FnZXMnO1xuaW1wb3J0IFJvdXRlc0NsaWVudCBmcm9tICcuL1JvdXRlcyc7XG5pbXBvcnQgVmFsaWRhdGVDbGllbnQgZnJvbSAnLi9WYWxpZGF0aW9ucy92YWxpZGF0ZSc7XG5pbXBvcnQgSXBzQ2xpZW50IGZyb20gJy4vSVBzJztcbmltcG9ydCBJcFBvb2xzQ2xpZW50IGZyb20gJy4vSVBQb29scyc7XG5pbXBvcnQgTGlzdHNDbGllbnQgZnJvbSAnLi9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzJztcbmltcG9ydCBNYWlsTGlzdHNNZW1iZXJzIGZyb20gJy4vTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycyc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4uL1R5cGVzL0NvbW1vbic7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNDcmVkZW50aWFscyc7XG5pbXBvcnQgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGZyb20gJy4vVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUYWdzJztcbmltcG9ydCB7IElNYWlsZ3VuQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcy9NYWlsZ3VuQ2xpZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbGd1bkNsaWVudCBpbXBsZW1lbnRzIElNYWlsZ3VuQ2xpZW50IHtcbiAgcHJpdmF0ZSByZXF1ZXN0O1xuXG4gIHB1YmxpYyBkb21haW5zO1xuICBwdWJsaWMgd2ViaG9va3M7XG4gIHB1YmxpYyBldmVudHM7XG4gIHB1YmxpYyBzdGF0cztcbiAgcHVibGljIHN1cHByZXNzaW9ucztcbiAgcHVibGljIG1lc3NhZ2VzO1xuICBwdWJsaWMgcm91dGVzO1xuICBwdWJsaWMgdmFsaWRhdGU7XG4gIHB1YmxpYyBpcHM7XG4gIHB1YmxpYyBpcF9wb29scztcbiAgcHVibGljIGxpc3RzO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE1haWxndW5DbGllbnRPcHRpb25zLCBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIGNvbnN0IGNvbmZpZzogUmVxdWVzdE9wdGlvbnMgPSB7IC4uLm9wdGlvbnMgfSBhcyBSZXF1ZXN0T3B0aW9ucztcblxuICAgIGlmICghY29uZmlnLnVybCkge1xuICAgICAgY29uZmlnLnVybCA9ICdodHRwczovL2FwaS5tYWlsZ3VuLm5ldCc7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcudXNlcm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwidXNlcm5hbWVcIiBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJrZXlcIiBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICB0aGlzLnJlcXVlc3QgPSBuZXcgUmVxdWVzdChjb25maWcsIGZvcm1EYXRhKTtcbiAgICBjb25zdCBtYWlsTGlzdHNNZW1iZXJzID0gbmV3IE1haWxMaXN0c01lbWJlcnModGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5DcmVkZW50aWFsc0NsaWVudCA9IG5ldyBEb21haW5DcmVkZW50aWFsc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpblRlbXBsYXRlc0NsaWVudCA9IG5ldyBEb21haW5UZW1wbGF0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5UYWdzQ2xpZW50ID0gbmV3IERvbWFpblRhZ3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgPSBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG5cbiAgICB0aGlzLmRvbWFpbnMgPSBuZXcgRG9tYWluQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0LFxuICAgICAgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgICBkb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgICBkb21haW5UYWdzQ2xpZW50XG4gICAgKTtcbiAgICB0aGlzLndlYmhvb2tzID0gbmV3IFdlYmhvb2tzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5zdXBwcmVzc2lvbnMgPSBuZXcgU3VwcHJlc3Npb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLm1lc3NhZ2VzID0gbmV3IE1lc3NhZ2VzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5yb3V0ZXMgPSBuZXcgUm91dGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pcHMgPSBuZXcgSXBzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pcF9wb29scyA9IG5ldyBJcFBvb2xzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5saXN0cyA9IG5ldyBMaXN0c0NsaWVudCh0aGlzLnJlcXVlc3QsIG1haWxMaXN0c01lbWJlcnMpO1xuICAgIHRoaXMudmFsaWRhdGUgPSBuZXcgVmFsaWRhdGVDbGllbnQodGhpcy5yZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQge1xuICBNYWlsTGlzdE1lbWJlcnNRdWVyeSxcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzLFxuICBNYWlsTGlzdE1lbWJlcixcbiAgTXVsdGlwbGVNZW1iZXJzRGF0YSxcbiAgTXVsdGlwbGVNZW1iZXJzUmVxRGF0YSxcbiAgRGVsZXRlZE1lbWJlcixcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzUmVxLFxuICBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSxcbiAgTWFpbExpc3RNZW1iZXJzUmVzdWx0LFxuICBNYWlsTGlzdE1lbWJlcnNSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9NYWlsaW5nTGlzdHMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgSU1haWxMaXN0c01lbWJlcnMgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxMaXN0c01lbWJlcnNcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPE1haWxMaXN0TWVtYmVyc1Jlc3VsdD5cbiAgaW1wbGVtZW50cyBJTWFpbExpc3RzTWVtYmVycyB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My9saXN0cyc7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrQW5kVXBkYXRlRGF0YShkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMpIHtcbiAgICBjb25zdCBuZXdEYXRhID0geyAuLi5kYXRhIH07XG5cbiAgICBpZiAodHlwZW9mIGRhdGEudmFycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG5ld0RhdGEudmFycyA9IEpTT04uc3RyaW5naWZ5KG5ld0RhdGEudmFycyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhLnN1YnNjcmliZWQgPT09ICdib29sZWFuJykge1xuICAgICAgbmV3RGF0YS5zdWJzY3JpYmVkID0gZGF0YS5zdWJzY3JpYmVkID8gJ3llcycgOiAnbm8nO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdEYXRhIGFzIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1JlcTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IE1haWxMaXN0TWVtYmVyc1Jlc3BvbnNlLFxuICApOiBNYWlsTGlzdE1lbWJlcnNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBNYWlsTGlzdE1lbWJlcnNSZXN1bHQ7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdE1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBNYWlsTGlzdE1lbWJlcnNRdWVyeVxuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy9wYWdlc2AsIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldE1lbWJlcihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGNyZWF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzYCwgcmVxRGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgY3JlYXRlTWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZU1lbWJlcnNEYXRhXG4gICk6IFByb21pc2U8TmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2U+IHtcbiAgICBjb25zdCBuZXdEYXRhOiBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhID0ge1xuICAgICAgbWVtYmVyczogQXJyYXkuaXNBcnJheShkYXRhLm1lbWJlcnMpID8gSlNPTi5zdHJpbmdpZnkoZGF0YS5tZW1iZXJzKSA6IGRhdGEubWVtYmVycyxcbiAgICAgIHVwc2VydDogZGF0YS51cHNlcnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy5qc29uYCwgbmV3RGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSk7XG4gIH1cblxuICB1cGRhdGVNZW1iZXIoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzXG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICBjb25zdCByZXFEYXRhID0gdGhpcy5jaGVja0FuZFVwZGF0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWAsIHJlcURhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGRlc3Ryb3lNZW1iZXIobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nKSA6IFByb21pc2U8RGVsZXRlZE1lbWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIERlbGV0ZWRNZW1iZXIpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQge1xuICBMaXN0c1F1ZXJ5LFxuICBDcmVhdGVVcGRhdGVMaXN0LFxuICBEZXN0cm95ZWRMaXN0LFxuICBNYWlsaW5nTGlzdCxcbiAgTWFpbGluZ0xpc3RWYWxpZGF0aW9uQXBpUmVzcG9uc2UsXG4gIFN0YXJ0VmFsaWRhdGlvblJlc3VsdCxcbiAgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0LFxuICBNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQsXG4gIE1haWxpbmdMaXN0UmVzdWx0LFxuICBNYWlsaW5nTGlzdEFwaVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL01haWxpbmdMaXN0cyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvTWFpbGluZ0xpc3RzL01haWxpbmdMaXN0TWVtYmVycyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxNYWlsaW5nTGlzdFJlc3VsdD4ge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgbWVtYmVyczogSU1haWxMaXN0c01lbWJlcnM7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbWVtYmVyczpJTWFpbExpc3RzTWVtYmVycykge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgICB0aGlzLm1lbWJlcnMgPSBtZW1iZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZVZhbGlkYXRpb25SZXN1bHQoXG4gICAgc3RhdHVzOiBudW1iZXIsXG4gICAgZGF0YTogTWFpbGluZ0xpc3RWYWxpZGF0aW9uQXBpUmVzcG9uc2VcbiAgKTogTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgdmFsaWRhdGlvblJlc3VsdDoge1xuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQgKiAxMDAwKSAvLyBhZGQgbWlsbGlzZWNvbmQgdG8gVW5peCB0aW1lc3RhbXBcbiAgICAgIH1cbiAgICB9IGFzIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QocmVzcG9uc2U6IE1haWxpbmdMaXN0QXBpUmVzcG9uc2UpOiBNYWlsaW5nTGlzdFJlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIE1haWxpbmdMaXN0UmVzdWx0O1xuXG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5PzogTGlzdHNRdWVyeSk6IFByb21pc2U8TWFpbGluZ0xpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyhgJHt0aGlzLmJhc2VSb3V0ZX0vcGFnZXNgLCBxdWVyeSk7XG4gIH1cblxuICBnZXQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCBhcyBNYWlsaW5nTGlzdCk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodGhpcy5iYXNlUm91dGUsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCBhcyBNYWlsaW5nTGlzdCk7XG4gIH1cblxuICB1cGRhdGUobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCBhcyBNYWlsaW5nTGlzdCk7XG4gIH1cblxuICBkZXN0cm95KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95ZWRMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgRGVzdHJveWVkTGlzdCk7XG4gIH1cblxuICB2YWxpZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8U3RhcnRWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgLCB7fSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gKHtcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICAgIH0pIGFzIFN0YXJ0VmFsaWRhdGlvblJlc3VsdCk7XG4gIH1cblxuICB2YWxpZGF0aW9uUmVzdWx0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYClcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzcG9uc2UpID0+IHRoaXMucGFyc2VWYWxpZGF0aW9uUmVzdWx0KFxuICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgcmVzcG9uc2UuYm9keSBhcyBNYWlsaW5nTGlzdFZhbGlkYXRpb25BcGlSZXNwb25zZVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgY2FuY2VsVmFsaWRhdGlvbihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+ICh7XG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICAgIH0gYXMgTWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0KSk7XG4gIH1cbn1cbiIsImltcG9ydCBBUElFcnJvciBmcm9tICcuL2NvbW1vbi9FcnJvcic7XG5pbXBvcnQgeyBBUElFcnJvck9wdGlvbnMgfSBmcm9tICcuLi9UeXBlcy9Db21tb24nO1xuaW1wb3J0IHtcbiAgTWFpbGd1bk1lc3NhZ2VEYXRhLFxuICBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSxcbiAgTWVzc2FnZXNTZW5kUmVzdWx0XG59IGZyb20gJy4uL1R5cGVzL01lc3NhZ2VzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVCb29sZWFuVmFsdWVzKGRhdGE6IE1haWxndW5NZXNzYWdlRGF0YSk6IE1haWxndW5NZXNzYWdlRGF0YSB7XG4gICAgY29uc3QgeWVzTm9Qcm9wZXJ0aWVzID0gbmV3IFNldChbXG4gICAgICAnbzp0ZXN0bW9kZScsXG4gICAgICAndDp0ZXh0JyxcbiAgICAgICdvOmRraW0nLFxuICAgICAgJ286dHJhY2tpbmcnLFxuICAgICAgJ286dHJhY2tpbmctY2xpY2tzJyxcbiAgICAgICdvOnRyYWNraW5nLW9wZW5zJyxcbiAgICAgICdvOnJlcXVpcmUtdGxzJyxcbiAgICAgICdvOnNraXAtdmVyaWZpY2F0aW9uJ1xuICAgIF0pO1xuXG4gICAgaWYgKCFkYXRhIHx8IE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIG1lc3NhZ2U6ICdNZXNzYWdlIGRhdGEgb2JqZWN0IGNhbiBub3QgYmUgZW1wdHknXG4gICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3Qua2V5cyhkYXRhKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICBpZiAoeWVzTm9Qcm9wZXJ0aWVzLmhhcyhrZXkpICYmIHR5cGVvZiBkYXRhW2tleV0gPT09ICdib29sZWFuJykge1xuICAgICAgICBhY2Nba2V5XSA9IGRhdGFba2V5XSA/ICd5ZXMnIDogJ25vJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBNYWlsZ3VuTWVzc2FnZURhdGEpO1xuICB9XG5cbiAgX3BhcnNlUmVzcG9uc2UocmVzcG9uc2U6IE1lc3NhZ2VzU2VuZEFQSVJlc3BvbnNlKTogTWVzc2FnZXNTZW5kUmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogTWFpbGd1bk1lc3NhZ2VEYXRhKTogUHJvbWlzZTxNZXNzYWdlc1NlbmRSZXN1bHQ+IHtcbiAgICBpZiAoZGF0YS5tZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92My8ke2RvbWFpbn0vbWVzc2FnZXMubWltZWAsIGRhdGEpXG4gICAgICAgIC50aGVuKHRoaXMuX3BhcnNlUmVzcG9uc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGlmaWVkRGF0YSA9IHRoaXMucHJlcGFyZUJvb2xlYW5WYWx1ZXMoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzYCwgbW9kaWZpZWREYXRhKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSwgRGVzdHJveVJvdXRlUmVzcG9uc2UsIFJvdXRlLCBSb3V0ZXNMaXN0UXVlcnksIFVwZGF0ZVJvdXRlUmVzcG9uc2Vcbn0gZnJvbSAnLi4vVHlwZXMvUm91dGVzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeTogUm91dGVzTGlzdFF1ZXJ5KTogUHJvbWlzZTxSb3V0ZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9yb3V0ZXMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyk7XG4gIH1cblxuICBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL3JvdXRlcy8ke2lkfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92My9yb3V0ZXMnLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5LnJvdXRlKTtcbiAgfVxuXG4gIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFVwZGF0ZVJvdXRlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgL3YzL3JvdXRlcy8ke2lkfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95Um91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IFN0YXRzUXVlcnksIFN0YXRzT3B0aW9ucyB9IGZyb20gJy4uLy4uL1R5cGVzL1N0YXRzJztcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0NvbW1vbic7XG5pbXBvcnQgU3RhdHNDb250YWluZXIgZnJvbSAnLi9TdGF0c0NvbnRhaW5lcic7XG5pbXBvcnQgeyBJU3RhdHNDbGllbnQsIElTdGF0c0NvbnRhaW5lciB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3RhdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c0NsaWVudCBpbXBsZW1lbnRzIElTdGF0c0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHByaXZhdGUgbG9nZ2VyOiBJTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIGxvZ2dlcjogSUxvZ2dlciA9IGNvbnNvbGUpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RGF0ZVRvVVRDKGtleTpzdHJpbmcsIGlucHV0RGF0ZTogRGF0ZSk6IEFycmF5PHN0cmluZz4ge1xuICAgIC8qXG4gICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAqL1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYERhdGU6XCIke2lucHV0RGF0ZX1cIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cblZhbHVlIFwiJHtpbnB1dERhdGUudG9VVENTdHJpbmcoKX1cIiB3aWxsIGJlIHVzZWQgZm9yIHJlcXVlc3QuXG5Db25zaWRlciB1c2luZyBzdGluZyB0eXBlIGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiIHRvIGF2b2lkIGF1dG8tY29udmVydGluZ2ApO1xuICAgIHJldHVybiBba2V5LCBpbnB1dERhdGUudG9VVENTdHJpbmcoKV07XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnk6IFN0YXRzUXVlcnkgfCB1bmRlZmluZWQpOiBBcnJheTxBcnJheTxzdHJpbmc+PiB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9IFtdIGFzIEFycmF5PEFycmF5PHN0cmluZz4+O1xuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHF1ZXJ5KS5sZW5ndGgpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IE9iamVjdC5lbnRyaWVzKHF1ZXJ5KS5yZWR1Y2UoKGFycmF5V2l0aFBhaXJzLCBjdXJyZW50UGFpcikgPT4ge1xuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBjdXJyZW50UGFpcjtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoKSB7IC8vIGV2ZW50OiBbJ2RlbGl2ZXJlZCcsICdhY2NlcHRlZCddXG4gICAgICAgICAgY29uc3QgcmVwZWF0ZWRQcm9wZXJ0eSA9IHZhbHVlLm1hcCgoaXRlbSkgPT4gW2tleSwgaXRlbV0pO1xuICAgICAgICAgIHJldHVybiBbLi4uYXJyYXlXaXRoUGFpcnMsIC4uLnJlcGVhdGVkUHJvcGVydHldOyAvLyBbW2V2ZW50LGRlbGl2ZXJlZF0sIFtldmVudCxhY2NlcHRlZF1dXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgYXJyYXlXaXRoUGFpcnMucHVzaCh0aGlzLmNvbnZlcnREYXRlVG9VVEMoa2V5LCB2YWx1ZSkpO1xuICAgICAgICAgIHJldHVybiBhcnJheVdpdGhQYWlycztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgYXJyYXlXaXRoUGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFycmF5V2l0aFBhaXJzO1xuICAgICAgfSwgW10gYXMgQXJyYXk8QXJyYXk8c3RyaW5nPj4pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWFyY2hQYXJhbXM7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlU3RhdHMocmVzcG9uc2U6IHsgYm9keTogU3RhdHNPcHRpb25zIH0pOiBJU3RhdHNDb250YWluZXIge1xuICAgIHJldHVybiBuZXcgU3RhdHNDb250YWluZXIocmVzcG9uc2UuYm9keSk7XG4gIH1cblxuICBnZXREb21haW4oZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8SVN0YXRzQ29udGFpbmVyPiB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMnLCBkb21haW4sICdzdGF0cy90b3RhbCcpLCBzZWFyY2hQYXJhbXMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlU3RhdHMpO1xuICB9XG5cbiAgZ2V0QWNjb3VudChxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPElTdGF0c0NvbnRhaW5lcj4ge1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9zdGF0cy90b3RhbCcsIHNlYXJjaFBhcmFtcylcbiAgICAgIC50aGVuKHRoaXMucGFyc2VTdGF0cyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElTdGF0c0NvbnRhaW5lciB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3RhdHMnO1xuaW1wb3J0IHsgU3RhdCwgU3RhdHNPcHRpb25zIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3RhdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c0NvbnRhaW5lciBpbXBsZW1lbnRzIElTdGF0c0NvbnRhaW5lciB7XG4gICAgc3RhcnQ6IERhdGU7XG4gICAgZW5kOiBEYXRlO1xuICAgIHJlc29sdXRpb246IHN0cmluZztcbiAgICBzdGF0czogU3RhdFtdO1xuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFN0YXRzT3B0aW9ucykge1xuICAgICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKGRhdGEuc3RhcnQpO1xuICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZShkYXRhLmVuZCk7XG4gICAgICB0aGlzLnJlc29sdXRpb24gPSBkYXRhLnJlc29sdXRpb247XG4gICAgICB0aGlzLnN0YXRzID0gZGF0YS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQ6IFN0YXQpIHtcbiAgICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0IH07XG4gICAgICAgIHJlcy50aW1lID0gbmV3IERhdGUoc3RhdC50aW1lKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSUJvdW5jZSB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IEJvdW5jZURhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3VuY2UgZXh0ZW5kcyBTdXBwcmVzc2lvbiBpbXBsZW1lbnRzIElCb3VuY2Uge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogQm91bmNlRGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuQk9VTkNFUyk7XG4gICAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICB0aGlzLmNvZGUgPSArZGF0YS5jb2RlO1xuICAgICAgdGhpcy5lcnJvciA9IGRhdGEuZXJyb3I7XG4gICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSUNvbXBsYWludCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IENvbXBsYWludERhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wbGFpbnQgZXh0ZW5kcyBTdXBwcmVzc2lvbiBpbXBsZW1lbnRzIElDb21wbGFpbnQge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIGNvbnN0cnVjdG9yKGRhdGE6IENvbXBsYWludERhdGEpIHtcbiAgICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLkNPTVBMQUlOVFMpO1xuICAgICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwcHJlc3Npb24ge1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBTdXBwcmVzc2lvbk1vZGVscykge1xuICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3InO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IEJvdW5jZSBmcm9tICcuL0JvdW5jZSc7XG5pbXBvcnQgQ29tcGxhaW50IGZyb20gJy4vQ29tcGxhaW50JztcbmltcG9ydCBVbnN1YnNjcmliZSBmcm9tICcuL1Vuc3Vic2NyaWJlJztcbmltcG9ydCBXaGl0ZUxpc3QgZnJvbSAnLi9XaGl0ZUxpc3QnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuaW1wb3J0IHtcbiAgSUJvdW5jZSxcbiAgSUNvbXBsYWludCxcbiAgSVVuc3Vic2NyaWJlLFxuICBJV2hpdGVMaXN0XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7XG4gIFN1cHByZXNzaW9uTGlzdCxcbiAgU3VwcHJlc3Npb25MaXN0UmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uRGF0YVR5cGUsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0LFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uTGlzdFF1ZXJ5LFxuICBTdXBwcmVzc2lvblJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQsXG4gIFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBBUElFcnJvck9wdGlvbnMgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuXG5jb25zdCBjcmVhdGVPcHRpb25zID0ge1xuICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwcHJlc3Npb25DbGllbnQgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPFN1cHByZXNzaW9uTGlzdD4ge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBtb2RlbHM6IE1hcDxzdHJpbmcsIGFueT47XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5tb2RlbHMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5tb2RlbHMuc2V0KCdib3VuY2VzJywgQm91bmNlKTtcbiAgICB0aGlzLm1vZGVscy5zZXQoJ2NvbXBsYWludHMnLCBDb21wbGFpbnQpO1xuICAgIHRoaXMubW9kZWxzLnNldCgndW5zdWJzY3JpYmVzJywgVW5zdWJzY3JpYmUpO1xuICAgIHRoaXMubW9kZWxzLnNldCgnd2hpdGVsaXN0cycsIFdoaXRlTGlzdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSxcbiAgICBNb2RlbDoge1xuICAgICAgbmV3KGRhdGE6IFN1cHByZXNzaW9uRGF0YVR5cGUpOlxuICAgICAgSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0XG4gICAgfVxuICApOiBTdXBwcmVzc2lvbkxpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBTdXBwcmVzc2lvbkxpc3Q7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKChpdGVtKSA9PiBuZXcgTW9kZWwoaXRlbSkpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIF9wYXJzZUl0ZW08VCBleHRlbmRzIFN1cHByZXNzaW9uPihcbiAgICBkYXRhIDogU3VwcHJlc3Npb25EYXRhVHlwZSxcbiAgICBNb2RlbDoge1xuICAgICAgbmV3KGRhdGFUeXBlOiBTdXBwcmVzc2lvbkRhdGFUeXBlKTpUXG4gICAgfVxuICApOiBUIHtcbiAgICByZXR1cm4gbmV3IE1vZGVsKGRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVXaGl0ZUxpc3QoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgZGF0YTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgfCBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YVtdXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdD4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgc3RhdHVzVGV4dDogJ0RhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCcsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBtZXNzYWdlOiAnV2hpdGVsaXN0XFwncyBjcmVhdGlvbiBwcm9jZXNzIGRvZXMgbm90IHN1cHBvcnQgbXVsdGlwbGUgY3JlYXRpb25zLiBEYXRhIHByb3BlcnR5IHNob3VsZCBiZSBhbiBvYmplY3QnXG4gICAgICAgIH1cbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3RXaXRoRkQodXJsam9pbigndjMnLCBkb21haW4sICd3aGl0ZWxpc3RzJyksIGRhdGEpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrVHlwZSh0eXBlOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMubW9kZWxzLmhhcyh0eXBlKSkge1xuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIHN0YXR1c1RleHQ6ICdVbmtub3duIHR5cGUgdmFsdWUnLFxuICAgICAgICBib2R5OiB7IG1lc3NhZ2U6ICdUeXBlIG1heSBiZSBvbmx5IG9uZSBvZiBbYm91bmNlcywgY29tcGxhaW50cywgdW5zdWJzY3JpYmVzLCB3aGl0ZWxpc3RzXScgfVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVJlc3BvbnNlKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzcG9uc2UpOiBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgdHlwZTogcmVzcG9uc2UuYm9keS50eXBlIHx8ICcnLFxuICAgICAgdmFsdWU6IHJlc3BvbnNlLmJvZHkudmFsdWUgfHwgJycsXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH07XG4gIH1cblxuICBhc3luYyBsaXN0KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBxdWVyeT86IFN1cHByZXNzaW9uTGlzdFF1ZXJ5XG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25MaXN0PiB7XG4gICAgdGhpcy5jaGVja1R5cGUodHlwZSk7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVscy5nZXQodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBxdWVyeSwgbW9kZWwpO1xuICB9XG5cbiAgZ2V0KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxCb3VuY2UgfCBDb21wbGFpbnQgfCBVbnN1YnNjcmliZSB8IFdoaXRlTGlzdD4ge1xuICAgIHRoaXMuY2hlY2tUeXBlKHR5cGUpO1xuXG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVscy5nZXQodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLmdldCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSwgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogU3VwcHJlc3Npb25SZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VJdGVtPHR5cGVvZiBtb2RlbD4ocmVzcG9uc2UuYm9keSwgbW9kZWwpKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgfCBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YVtdXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdD4ge1xuICAgIHRoaXMuY2hlY2tUeXBlKHR5cGUpO1xuICAgIC8vIHN1cHBvcnRzIGFkZGluZyBtdWx0aXBsZSBzdXBwcmVzc2lvbnMgYnkgZGVmYXVsdFxuICAgIGxldCBwb3N0RGF0YTtcbiAgICBpZiAodHlwZSA9PT0gJ3doaXRlbGlzdHMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVXaGl0ZUxpc3QoZG9tYWluLCBkYXRhKTtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHBvc3REYXRhID0gW2RhdGFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3N0RGF0YSA9IFsuLi5kYXRhXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIEpTT04uc3RyaW5naWZ5KHBvc3REYXRhKSwgY3JlYXRlT3B0aW9ucylcbiAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgfVxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdD4ge1xuICAgIHRoaXMuY2hlY2tUeXBlKHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5kZWxldGUodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5ib2R5LmFkZHJlc3MgfHwgJycsXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICB9KSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdXBwcmVzc2lvbkNsaWVudDtcbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSVVuc3Vic2NyaWJlIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgVW5zdWJzY3JpYmVEYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcblxuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbnN1YnNjcmliZSBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSVVuc3Vic2NyaWJlIHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgdGFnczogc3RyaW5nW107XG4gICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFVuc3Vic2NyaWJlRGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuVU5TVUJTQ1JJQkVTKTtcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgIHRoaXMudGFncyA9IGRhdGEudGFncztcbiAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJV2hpdGVMaXN0IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgV2hpdGVMaXN0RGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdoaXRlTGlzdCBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSVdoaXRlTGlzdCB7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICByZWFzb246IHN0cmluZztcbiAgICBjcmVhdGVkQXQ6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBXaGl0ZUxpc3REYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5XSElURUxJU1RTKTtcbiAgICAgIHRoaXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgdGhpcy5yZWFzb24gPSBkYXRhLnJlYXNvbjtcbiAgICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHtcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0LFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JEYXRhLFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdCxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXNwb25zZSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhLFxuICBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkLFxuICBDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYlxufSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucy9NdWx0aXBsZVZhbGlkYXRpb24nO1xuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uSm9iIGltcGxlbWVudHMgTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0IHtcbiAgY3JlYXRlZEF0OiBEYXRlO1xuICBpZDogc3RyaW5nO1xuICBxdWFudGl0eTogbnVtYmVyXG4gIHJlY29yZHNQcm9jZXNzZWQ6IG51bWJlciB8IG51bGw7XG4gIHN0YXR1czogc3RyaW5nO1xuICBkb3dubG9hZFVybD86IHtcbiAgICBjc3Y6IHN0cmluZztcbiAgICBqc29uOiBzdHJpbmc7XG4gIH07XG5cbiAgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXI7XG4gIHN1bW1hcnk/OiB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgICBjYXRjaEFsbDogbnVtYmVyO1xuICAgICAgICAgIGRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgZG9Ob3RTZW5kOiBudW1iZXI7XG4gICAgICAgICAgdW5kZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgIH07XG4gICAgICByaXNrOiB7XG4gICAgICAgICAgaGlnaDogbnVtYmVyO1xuICAgICAgICAgIGxvdzogbnVtYmVyO1xuICAgICAgICAgIG1lZGl1bTogbnVtYmVyO1xuICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkpvYkRhdGEsIHJlc3BvbnNlU3RhdHVzQ29kZTogbnVtYmVyKSB7XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgIHRoaXMucXVhbnRpdHkgPSBkYXRhLnF1YW50aXR5O1xuICAgIHRoaXMucmVjb3Jkc1Byb2Nlc3NlZCA9IGRhdGEucmVjb3Jkc19wcm9jZXNzZWQ7XG4gICAgdGhpcy5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICB0aGlzLnJlc3BvbnNlU3RhdHVzQ29kZSA9IHJlc3BvbnNlU3RhdHVzQ29kZTtcbiAgICBpZiAoZGF0YS5kb3dubG9hZF91cmwpIHtcbiAgICAgIHRoaXMuZG93bmxvYWRVcmwgPSB7XG4gICAgICAgIGNzdjogZGF0YS5kb3dubG9hZF91cmw/LmNzdixcbiAgICAgICAganNvbjogZGF0YS5kb3dubG9hZF91cmw/Lmpzb25cbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChkYXRhLnN1bW1hcnkpIHtcbiAgICAgIHRoaXMuc3VtbWFyeSA9IHtcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgY2F0Y2hBbGw6IGRhdGEuc3VtbWFyeS5yZXN1bHQuY2F0Y2hfYWxsLFxuICAgICAgICAgIGRlbGl2ZXJhYmxlOiBkYXRhLnN1bW1hcnkucmVzdWx0LmRlbGl2ZXJhYmxlLFxuICAgICAgICAgIGRvTm90U2VuZDogZGF0YS5zdW1tYXJ5LnJlc3VsdC5kb19ub3Rfc2VuZCxcbiAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBkYXRhLnN1bW1hcnkucmVzdWx0LnVuZGVsaXZlcmFibGUsXG4gICAgICAgICAgdW5rbm93bjogZGF0YS5zdW1tYXJ5LnJlc3VsdC51bmtub3duXG4gICAgICAgIH0sXG4gICAgICAgIHJpc2s6IHtcbiAgICAgICAgICBoaWdoOiBkYXRhLnN1bW1hcnkucmlzay5oaWdoLFxuICAgICAgICAgIGxvdzogZGF0YS5zdW1tYXJ5LnJpc2subG93LFxuICAgICAgICAgIG1lZGl1bTogZGF0YS5zdW1tYXJ5LnJpc2subWVkaXVtLFxuICAgICAgICAgIHVua25vd246IGRhdGEuc3VtbWFyeS5yaXNrLnVua25vd25cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdD5cbiAgaW1wbGVtZW50cyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVSZXNwb25zZTxUPihyZXNwb25zZTogQVBJUmVzcG9uc2UpOiBUIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZT8uYm9keVxuICAgIH0gYXMgVDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QocmVzcG9uc2U6IE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzcG9uc2UpXG4gICAgOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0O1xuXG4gICAgZGF0YS5qb2JzID0gcmVzcG9uc2UuYm9keS5qb2JzLm1hcCgoam9iKSA9PiBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uSm9iKGpvYiwgcmVzcG9uc2Uuc3RhdHVzKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncGl2b3QnKTtcbiAgICBkYXRhLnRvdGFsID0gcmVzcG9uc2UuYm9keS50b3RhbDtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdChxdWVyeT86IE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnkpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoJy92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsnLCBxdWVyeSk7XG4gIH1cblxuICBhc3luYyBnZXQobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKTtcbiAgICByZXR1cm4gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkpvYihyZXNwb25zZS5ib2R5LCByZXNwb25zZS5zdGF0dXMpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKFxuICAgIGxpc3RJZDogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVxuICApOiBQcm9taXNlPENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICBjb25zdCBtdWx0aXBsZVZhbGlkYXRpb25EYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkID0ge1xuICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZToge1xuICAgICAgICAuLi5kYXRhPy5maWxlXG4gICAgICB9LFxuICAgICAgLi4uZGF0YVxuICAgIH07XG4gICAgZGVsZXRlIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEuZmlsZTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWAsIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEpO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlPENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3kobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWApO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlPENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPihyZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElWYWxpZGF0ZUNsaWVudCwgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgVmFsaWRhdGlvblF1ZXJ5LCBWYWxpZGF0aW9uUmVzdWx0LCBWYWxpZGF0aW9uUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRlQ2xpZW50IGltcGxlbWVudHMgSVZhbGlkYXRlQ2xpZW50IHtcbiAgcHVibGljIG11bHRpcGxlVmFsaWRhdGlvbjtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ6IElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubXVsdGlwbGVWYWxpZGF0aW9uID0gbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50O1xuICB9XG5cbiAgYXN5bmMgZ2V0KGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIGNvbnN0IHF1ZXJ5OiBWYWxpZGF0aW9uUXVlcnkgPSB7IGFkZHJlc3MgfTtcbiAgICBjb25zdCByZXN1bHQ6IFZhbGlkYXRpb25SZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92NC9hZGRyZXNzL3ZhbGlkYXRlJywgcXVlcnkpO1xuICAgIHJldHVybiByZXN1bHQuYm9keSBhcyBWYWxpZGF0aW9uUmVzdWx0O1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgeyBXZWJob29rc0lkcyB9IGZyb20gJy4uL0VudW1zJztcblxuaW1wb3J0IHtcbiAgV2ViaG9va1ZhbGlkYXRpb25SZXNwb25zZSxcbiAgV2ViaG9va0xpc3QsXG4gIFdlYmhvb2tSZXNwb25zZSxcbiAgV2ViaG9va3NRdWVyeVxufSBmcm9tICcuLi9UeXBlcy9XZWJob29rcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcblxuY2xhc3MgV2ViaG9vayB7XG4gIGlkOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudXJsID0gdXJsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYmhvb2tzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tMaXN0KHJlc3BvbnNlOiB7IGJvZHk6IHsgd2ViaG9va3M6IFdlYmhvb2tMaXN0IH0gfSk6IFdlYmhvb2tMaXN0IHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keS53ZWJob29rcztcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tXaXRoSUQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2U6IFdlYmhvb2tSZXNwb25zZSk6IFdlYmhvb2sge1xuICAgICAgY29uc3Qgd2ViaG9va1Jlc3BvbnNlID0gcmVzcG9uc2U/LmJvZHk/LndlYmhvb2s7XG4gICAgICBsZXQgdXJsID0gd2ViaG9va1Jlc3BvbnNlPy51cmw7XG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICB1cmwgPSB3ZWJob29rUmVzcG9uc2U/LnVybHMgJiYgd2ViaG9va1Jlc3BvbnNlLnVybHMubGVuZ3RoXG4gICAgICAgICAgPyB3ZWJob29rUmVzcG9uc2UudXJsc1swXVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBXZWJob29rKGlkLCB1cmwpO1xuICAgIH07XG4gIH1cblxuICBfcGFyc2VXZWJob29rVGVzdChyZXNwb25zZTogeyBib2R5OiB7IGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nIH0gfSlcbiAgOiB7Y29kZTogbnVtYmVyLCBtZXNzYWdlOnN0cmluZ30ge1xuICAgIHJldHVybiB7XG4gICAgICBjb2RlOiByZXNwb25zZS5ib2R5LmNvZGUsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICB9IGFzIFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2U7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeTogV2ViaG9va3NRdWVyeSk6IFByb21pc2U8V2ViaG9va0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rTGlzdCk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIGlkOiBXZWJob29rc0lkcyk6IFByb21pc2U8V2ViaG9vaz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIGNyZWF0ZShkb21haW46IHN0cmluZyxcbiAgICBpZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIHRlc3QgPSBmYWxzZSk6IFByb21pc2U8V2ViaG9vayB8IFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2U+IHtcbiAgICBpZiAodGVzdCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkLCAndGVzdCcpLCB7IHVybCB9KVxuICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tUZXN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCB7IGlkLCB1cmwgfSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgdXBkYXRlKGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IFByb21pc2U8V2ViaG9vaz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCksIHsgdXJsIH0pXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIGlkOiBzdHJpbmcpIDogUHJvbWlzZTxXZWJob29rPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBUElFcnJvck9wdGlvbnMsIEFQSUVycm9yVHlwZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSUVycm9yIGV4dGVuZHMgRXJyb3IgaW1wbGVtZW50cyBBUElFcnJvclR5cGUge1xuICBzdGF0dXM6IG51bWJlcjtcbiAgc3RhY2s6IHN0cmluZztcbiAgZGV0YWlsczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBzdGF0dXMsXG4gICAgc3RhdHVzVGV4dCxcbiAgICBtZXNzYWdlLFxuICAgIGJvZHkgPSB7fVxuICB9OiBBUElFcnJvck9wdGlvbnMpIHtcbiAgICBsZXQgYm9keU1lc3NhZ2UgPSAnJztcbiAgICBsZXQgZXJyb3IgPSAnJztcbiAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBib2R5TWVzc2FnZSA9IGJvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHlNZXNzYWdlID0gYm9keT8ubWVzc2FnZTtcbiAgICAgIGVycm9yID0gYm9keT8uZXJyb3I7XG4gICAgfVxuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBlcnJvciB8fCBzdGF0dXNUZXh0O1xuICAgIHRoaXMuZGV0YWlscyA9IGJvZHlNZXNzYWdlO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuXG5jbGFzcyBGb3JtRGF0YUJ1aWxkZXIge1xuICBwcml2YXRlIEZvcm1EYXRhQ29uc3RydWN0b3I6IElucHV0Rm9ybURhdGE7XG4gIGNvbnN0cnVjdG9yKEZvcm1EYXRhQ29uc3RydWN0b3I6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IgPSBGb3JtRGF0YUNvbnN0cnVjdG9yO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUZvcm1EYXRhKGRhdGE6IGFueSk6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgZGF0YSBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgZm9ybURhdGE6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZGF0YVtrZXldOyB9KVxuICAgICAgLnJlZHVjZSgoZm9ybURhdGFBY2M6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZUtleXMgPSBbJ2F0dGFjaG1lbnQnLCAnaW5saW5lJywgJ211bHRpcGxlVmFsaWRhdGlvbkZpbGUnXTtcbiAgICAgICAgaWYgKGZpbGVLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICB0aGlzLmFkZEZpbGVzVG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkgPT09ICdtZXNzYWdlJykgeyAvLyBtaW1lIG1lc3NhZ2VcbiAgICAgICAgICB0aGlzLmFkZE1pbWVEYXRhVG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uUHJvcGVydHlUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgIH0sIG5ldyB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IoKSk7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBpc05vZGVGb3JtRGF0YShmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSlcbiAgOiBmb3JtRGF0YUluc3RhbmNlIGlzIE5vZGVGb3JtRGF0YSB7XG4gICAgcmV0dXJuICg8Tm9kZUZvcm1EYXRhPmZvcm1EYXRhSW5zdGFuY2UpLmdldEhlYWRlcnMgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXR0YWNobWVudE9wdGlvbnMoaXRlbToge1xuICAgIGZpbGVuYW1lPzogc3RyaW5nO1xuICAgIGNvbnRlbnRUeXBlPyA6IHN0cmluZztcbiAgICBrbm93bkxlbmd0aD86IG51bWJlcjtcbiAgfSk6IHtcbiAgICBmaWxlbmFtZT86IHN0cmluZyxcbiAgICBjb250ZW50VHlwZT86IHN0cmluZyxcbiAgICBrbm93bkxlbmd0aD86IG51bWJlclxuICB9IHtcbiAgICBpZiAodHlwZW9mIGl0ZW0gIT09ICdvYmplY3QnIHx8IHRoaXMuaXNTdHJlYW0oaXRlbSkpIHJldHVybiB7fTtcbiAgICBjb25zdCB7XG4gICAgICBmaWxlbmFtZSxcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAga25vd25MZW5ndGhcbiAgICB9ID0gaXRlbTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uKGZpbGVuYW1lID8geyBmaWxlbmFtZSB9IDogeyBmaWxlbmFtZTogJ2ZpbGUnIH0pLFxuICAgICAgLi4uKGNvbnRlbnRUeXBlICYmIHsgY29udGVudFR5cGUgfSksXG4gICAgICAuLi4oa25vd25MZW5ndGggJiYgeyBrbm93bkxlbmd0aCB9KVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFkZE1pbWVEYXRhVG9GRChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBkYXRhOiBCdWZmZXIgfCBCbG9iIHwgc3RyaW5nLFxuICAgIGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoZGF0YSkgfHwgdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBub2RlRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlIGFzIE5vZGVGb3JtRGF0YTtcbiAgICAgIGNvbnN0IHByZXBhcmVkRGF0YSA9IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/IEJ1ZmZlci5mcm9tKGRhdGEpIDogZGF0YTtcbiAgICAgIG5vZGVGb3JtRGF0YS5hcHBlbmQoa2V5LCBwcmVwYXJlZERhdGEsIHsgZmlsZW5hbWU6ICdNaW1lTWVzc2FnZScgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGJyb3dzZXJGb3JtRGF0YSA9IGZvcm1EYXRhSW5zdGFuY2UgYXMgRm9ybURhdGE7XG4gICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YSwgJ01pbWVNZXNzYWdlJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRGaWxlc1RvRkQoXG4gICAgcHJvcGVydHlOYW1lOiBzdHJpbmcsXG4gICAgdmFsdWU6IGFueSxcbiAgICBmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhcHBlbmRGaWxlVG9GRCA9IChcbiAgICAgIG9yaWdpbmFsS2V5OiBzdHJpbmcsXG4gICAgICBvYmo6IGFueSxcbiAgICAgIGZvcm1EYXRhOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICAgICk6IHZvaWQgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gb3JpZ2luYWxLZXkgPT09ICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJyA/ICdmaWxlJyA6IG9yaWdpbmFsS2V5O1xuICAgICAgY29uc3QgaXNTdHJlYW1EYXRhID0gdGhpcy5pc1N0cmVhbShvYmopO1xuICAgICAgY29uc3Qgb2JqRGF0YSA9IGlzU3RyZWFtRGF0YSA/IG9iaiA6IG9iai5kYXRhO1xuICAgICAgLy8gZ2V0QXR0YWNobWVudE9wdGlvbnMgc2hvdWxkIGJlIGNhbGxlZCB3aXRoIG9iaiBwYXJhbWV0ZXIgdG8gcHJldmVudCBsb29zaW5nIGZpbGVuYW1lXG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyhvYmopO1xuICAgICAgaWYgKHRoaXMuaXNOb2RlRm9ybURhdGEoZm9ybURhdGEpKSB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIG9iakRhdGEsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBvYmpEYXRhLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICB9O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgaXRlbSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCB2YWx1ZSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1N0cmVhbShkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmIHR5cGVvZiBkYXRhLnBpcGUgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICBwcml2YXRlIGFkZENvbW1vblByb3BlcnR5VG9GRChcbiAgICBrZXk6IHN0cmluZyxcbiAgICB2YWx1ZTogYW55LFxuICAgIGZvcm1EYXRhQWNjOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW06IGFueSkge1xuICAgICAgICBmb3JtRGF0YUFjYy5hcHBlbmQoa2V5LCBpdGVtKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgZm9ybURhdGFBY2MuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybURhdGFCdWlsZGVyO1xuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuXG5pbXBvcnQge1xuICBQYWdlc0xpc3RBY2N1bXVsYXRvcixcbiAgUGFyc2VkUGFnZSxcbiAgUGFyc2VkUGFnZXNMaXN0LFxuICBRdWVyeVdpdGhQYWdlLFxuICBSZXNwb25zZVdpdGhQYWdpbmcsXG4gIFVwZGF0ZWRVcmxBbmRRdWVyeSxcbiAgQVBJRXJyb3JPcHRpb25zXG59IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5pbXBvcnQge1xuICBJQm91bmNlLFxuICBJQ29tcGxhaW50LFxuICBJVW5zdWJzY3JpYmUsXG4gIElXaGl0ZUxpc3Rcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9SZXF1ZXN0JztcbmltcG9ydCB7XG4gIFN1cHByZXNzaW9uRGF0YVR5cGVcbn0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgTmF2aWdhdGlvblRocnVQYWdlcyA8VD4ge1xuICByZXF1ZXN0PzogUmVxdWVzdDtcbiAgY29uc3RydWN0b3IocmVxdWVzdD86IFJlcXVlc3QpIHtcbiAgICBpZiAocmVxdWVzdCkge1xuICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VQYWdlKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcGFnZVVybDogc3RyaW5nLFxuICAgIHVybFNlcGFyYXRvcjogc3RyaW5nLFxuICAgIGl0ZXJhdG9yTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4gICkgOiBQYXJzZWRQYWdlIHtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKHBhZ2VVcmwpO1xuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBwYXJzZWRVcmw7XG5cbiAgICBjb25zdCBwYWdlVmFsdWUgPSBwYWdlVXJsICYmIHR5cGVvZiBwYWdlVXJsID09PSAnc3RyaW5nJyA/IHBhZ2VVcmwuc3BsaXQodXJsU2VwYXJhdG9yKS5wb3AoKSB8fCAnJyA6ICcnO1xuICAgIGxldCBpdGVyYXRvclBvc2l0aW9uID0gbnVsbDtcbiAgICBpZiAoaXRlcmF0b3JOYW1lKSB7XG4gICAgICBpdGVyYXRvclBvc2l0aW9uID0gc2VhcmNoUGFyYW1zLmhhcyhpdGVyYXRvck5hbWUpXG4gICAgICAgID8gc2VhcmNoUGFyYW1zLmdldChpdGVyYXRvck5hbWUpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaWQsXG4gICAgICBwYWdlOiB1cmxTZXBhcmF0b3IgPT09ICc/JyA/IGA/JHtwYWdlVmFsdWV9YCA6IHBhZ2VWYWx1ZSxcbiAgICAgIGl0ZXJhdG9yUG9zaXRpb24sXG4gICAgICB1cmw6IHBhZ2VVcmxcbiAgICB9IGFzIFBhcnNlZFBhZ2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VQYWdlTGlua3MoXG4gICAgcmVzcG9uc2U6IFJlc3BvbnNlV2l0aFBhZ2luZyxcbiAgICB1cmxTZXBhcmF0b3I6IHN0cmluZyxcbiAgICBpdGVyYXRvck5hbWU/OiBzdHJpbmdcbiAgKTogUGFyc2VkUGFnZXNMaXN0IHtcbiAgICBjb25zdCBwYWdlcyA9IE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlLmJvZHkucGFnaW5nKTtcbiAgICByZXR1cm4gcGFnZXMucmVkdWNlKFxuICAgICAgKGFjYzogUGFnZXNMaXN0QWNjdW11bGF0b3IsIFtpZCwgcGFnZVVybF06IFsgaWQ6IHN0cmluZywgcGFnZVVybDogc3RyaW5nXSkgPT4ge1xuICAgICAgICBhY2NbaWRdID0gdGhpcy5wYXJzZVBhZ2UoaWQsIHBhZ2VVcmwsIHVybFNlcGFyYXRvciwgaXRlcmF0b3JOYW1lKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9XG4gICAgKSBhcyB1bmtub3duIGFzIFBhcnNlZFBhZ2VzTGlzdDtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVXJsQW5kUXVlcnkoY2xpZW50VXJsOiBzdHJpbmcsIHF1ZXJ5PzogUXVlcnlXaXRoUGFnZSk6IFVwZGF0ZWRVcmxBbmRRdWVyeSB7XG4gICAgbGV0IHVybCA9IGNsaWVudFVybDtcbiAgICBjb25zdCBxdWVyeUNvcHkgPSB7IC4uLnF1ZXJ5IH07XG4gICAgaWYgKHF1ZXJ5Q29weS5wYWdlKSB7XG4gICAgICB1cmwgPSB1cmxqb2luKGNsaWVudFVybCwgcXVlcnlDb3B5LnBhZ2UpO1xuICAgICAgZGVsZXRlIHF1ZXJ5Q29weS5wYWdlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdXJsLFxuICAgICAgdXBkYXRlZFF1ZXJ5OiBxdWVyeUNvcHlcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIHJlcXVlc3RMaXN0V2l0aFBhZ2VzKGNsaWVudFVybDpzdHJpbmcsIHF1ZXJ5PzogUXVlcnlXaXRoUGFnZSwgTW9kZWw/OiB7XG4gICAgbmV3KGRhdGE6IFN1cHByZXNzaW9uRGF0YVR5cGUpOlxuICAgIElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdFxuICB9KTogUHJvbWlzZTxUPiB7XG4gICAgY29uc3QgeyB1cmwsIHVwZGF0ZWRRdWVyeSB9ID0gdGhpcy51cGRhdGVVcmxBbmRRdWVyeShjbGllbnRVcmwsIHF1ZXJ5KTtcbiAgICBpZiAodGhpcy5yZXF1ZXN0KSB7XG4gICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCh1cmwsIHVwZGF0ZWRRdWVyeSk7XG4gICAgICAvLyBNb2RlbCBoZXJlIGlzIHVzdWFsbHkgdW5kZWZpbmVkIGV4Y2VwdCBmb3IgU3VwcHJlc3Npb24gQ2xpZW50XG4gICAgICByZXR1cm4gdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UsIE1vZGVsKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgIHN0YXR1czogNTAwLFxuICAgICAgc3RhdHVzVGV4dDogJ1JlcXVlc3QgcHJvcGVydHkgaXMgZW1wdHknLFxuICAgICAgYm9keTogeyBtZXNzYWdlOiAnJyB9XG4gICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHBhcnNlTGlzdChyZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nLCBNb2RlbD86IHtcbiAgICBuZXcoZGF0YTogU3VwcHJlc3Npb25EYXRhVHlwZSk6XG4gICAgSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0XG4gIH0pOiBUO1xufVxuIiwiaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gJ2Jhc2UtNjQnO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IGF4aW9zLCB7IEF4aW9zRXJyb3IsIEF4aW9zUmVzcG9uc2UgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgKiBhcyBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yJztcbmltcG9ydCB7XG4gIE9uQ2FsbEVtcHR5SGVhZGVycyxcbiAgT25DYWxsUmVxdWVzdE9wdGlvbnMsXG4gIFJlcXVlc3RPcHRpb25zLFxuICBBUElFcnJvck9wdGlvbnMsXG4gIElucHV0Rm9ybURhdGEsXG4gIEFQSVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5cbmltcG9ydCBGb3JtRGF0YUJ1aWxkZXIgZnJvbSAnLi9Gb3JtRGF0YUJ1aWxkZXInO1xuaW1wb3J0IHsgSXBQb29sRGVsZXRlRGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL0lQUG9vbHMnO1xuXG5jbGFzcyBSZXF1ZXN0IHtcbiAgcHJpdmF0ZSB1c2VybmFtZTogc3RyaW5nO1xuICBwcml2YXRlIGtleTogc3RyaW5nO1xuICBwcml2YXRlIHVybDogc3RyaW5nO1xuICBwcml2YXRlIHRpbWVvdXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgcHJpdmF0ZSBmb3JtRGF0YUJ1aWxkZXI6IEZvcm1EYXRhQnVpbGRlcjtcbiAgcHJpdmF0ZSBtYXhCb2R5TGVuZ3RoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogUmVxdWVzdE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy51c2VybmFtZSA9IG9wdGlvbnMudXNlcm5hbWU7XG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIGFzIHN0cmluZztcbiAgICB0aGlzLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XG4gICAgdGhpcy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICAgIHRoaXMuZm9ybURhdGFCdWlsZGVyID0gbmV3IEZvcm1EYXRhQnVpbGRlcihmb3JtRGF0YSk7XG4gICAgdGhpcy5tYXhCb2R5TGVuZ3RoID0gNTI0Mjg4MDA7IC8vIDUwIE1CXG4gIH1cblxuICBhc3luYyByZXF1ZXN0KFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIG9uQ2FsbE9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duIHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3Qgb3B0aW9uczogT25DYWxsUmVxdWVzdE9wdGlvbnMgPSB7IC4uLm9uQ2FsbE9wdGlvbnMgfTtcbiAgICBjb25zdCBiYXNpYyA9IGJhc2U2NC5lbmNvZGUoYCR7dGhpcy51c2VybmFtZX06JHt0aGlzLmtleX1gKTtcbiAgICBjb25zdCBvbkNhbGxIZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzID8gb3B0aW9ucy5oZWFkZXJzIDoge307XG5cbiAgICBjb25zdCBoZWFkZXJzOiBIZWFkZXJzSW5pdHwgT25DYWxsRW1wdHlIZWFkZXJzID0ge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7YmFzaWN9YCxcbiAgICAgIC4uLnRoaXMuaGVhZGVycyxcbiAgICAgIC4uLm9uQ2FsbEhlYWRlcnNcbiAgICB9O1xuXG4gICAgZGVsZXRlIG9wdGlvbnM/LmhlYWRlcnM7XG5cbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLm9wdGlvbnMgfTtcblxuICAgIGlmIChvcHRpb25zPy5xdWVyeSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvcHRpb25zPy5xdWVyeSkubGVuZ3RoID4gMCkge1xuICAgICAgcGFyYW1zLnBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeSk7XG4gICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5ib2R5KSB7XG4gICAgICBjb25zdCBib2R5ID0gb3B0aW9ucz8uYm9keTtcbiAgICAgIHBhcmFtcy5kYXRhID0gYm9keTtcbiAgICAgIGRlbGV0ZSBwYXJhbXMuYm9keTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlO1xuICAgIGNvbnN0IHVybFZhbHVlID0gdXJsam9pbih0aGlzLnVybCwgdXJsKTtcblxuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6IG1ldGhvZC50b0xvY2FsZVVwcGVyQ2FzZSgpLFxuICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgIHVybDogdXJsVmFsdWUsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgICAgbWF4Qm9keUxlbmd0aDogdGhpcy5tYXhCb2R5TGVuZ3RoXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSBlcnIgYXMgQXhpb3NFcnJvcjtcblxuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgc3RhdHVzOiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uc3RhdHVzIHx8IDQwMCxcbiAgICAgICAgc3RhdHVzVGV4dDogZXJyb3JSZXNwb25zZT8ucmVzcG9uc2U/LnN0YXR1c1RleHQgfHwgZXJyb3JSZXNwb25zZS5jb2RlLFxuICAgICAgICBib2R5OiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uZGF0YSB8fCBlcnJvclJlc3BvbnNlLm1lc3NhZ2VcbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmdldFJlc3BvbnNlQm9keShyZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlcyBhcyBBUElSZXNwb25zZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlcyA9IHtcbiAgICAgIGJvZHk6IHt9LFxuICAgICAgc3RhdHVzOiByZXNwb25zZT8uc3RhdHVzXG4gICAgfSBhcyBBUElSZXNwb25zZTtcblxuICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhID09PSAnTWFpbGd1biBNYWduaWZpY2VudCBBUEknKSB7XG4gICAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgc3RhdHVzVGV4dDogJ0luY29ycmVjdCB1cmwnLFxuICAgICAgICAgIGJvZHk6IHJlc3BvbnNlLmRhdGFcbiAgICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcmVzLmJvZHkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmRhdGFcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5ib2R5ID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHF1ZXJ5KFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIHF1ZXJ5PzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBBcnJheTxBcnJheTxzdHJpbmc+PixcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHsgcXVlcnksIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICBjb21tYW5kKFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+W10gfCBzdHJpbmcgfCBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSxcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gICAgYWRkRGVmYXVsdEhlYWRlcnMgPSB0cnVlXG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBsZXQgaGVhZGVycyA9IHt9O1xuICAgIGlmIChhZGREZWZhdWx0SGVhZGVycykge1xuICAgICAgaGVhZGVycyA9IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH07XG4gICAgfVxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgLi4uaGVhZGVycyxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgcmVxdWVzdE9wdGlvbnNcbiAgICApO1xuICB9XG5cbiAgZ2V0KFxuICAgIHVybDogc3RyaW5nLFxuICAgIHF1ZXJ5PzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBBcnJheTxBcnJheTxzdHJpbmc+PixcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5KCdnZXQnLCB1cmwsIHF1ZXJ5LCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3QoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncG9zdCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0V2l0aEZEKFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXVxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBwdXRXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBwYXRjaFdpdGhGRCh1cmw6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwYXRjaCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcHV0KHVybDogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBzdHJpbmcsIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcbiAgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZSh1cmw6IHN0cmluZywgZGF0YT86IElwUG9vbERlbGV0ZURhdGEpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgnZGVsZXRlJywgdXJsLCBkYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIiwiZXhwb3J0IGVudW0gUmVzb2x1dGlvbiB7XG4gICAgSE9VUiA9ICdob3VyJyxcbiAgICBEQVkgPSAnZGF5JyxcbiAgICBNT05USCA9ICdtb250aCdcbn1cblxuZXhwb3J0IGVudW0gU3VwcHJlc3Npb25Nb2RlbHMge1xuICAgIEJPVU5DRVMgPSAnYm91bmNlcycsXG4gICAgQ09NUExBSU5UUyA9ICdjb21wbGFpbnRzJyxcbiAgICBVTlNVQlNDUklCRVMgPSAndW5zdWJzY3JpYmVzJyxcbiAgICBXSElURUxJU1RTID0gJ3doaXRlbGlzdHMnXG59XG5cbmV4cG9ydCBlbnVtIFdlYmhvb2tzSWRzIHtcbiAgICBDTElDS0VEID0gJ2NsaWNrZWQnLFxuICAgIENPTVBMQUlORUQgPSAnY29tcGxhaW5lZCcsXG4gICAgREVMSVZFUkVEID0gJ2RlbGl2ZXJlZCcsXG4gICAgT1BFTkVEID0gJ29wZW5lZCcsXG4gICAgUEVSTUFORU5UX0ZBSUwgPSAncGVybWFuZW50X2ZhaWwnLFxuICAgIFRFTVBPUkFSWV9GQUlMID0gJ3RlbXBvcmFyeV9mYWlsJyxcbiAgICBVTlNVQlNDUklCRUQgPSAndW5zdWJzY3JpYmUnLFxufVxuXG5leHBvcnQgZW51bSBZZXNObyB7XG4gICAgWUVTID0gJ3llcycsXG4gICAgTk8gPSAnbm8nXG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0xvZ2dlcic7XG4iLCJleHBvcnQgKiBmcm9tICcuL0RvbWFpbkNyZWRlbnRpYWxzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGFncyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRlbXBsYXRlcyc7XG4iLCJleHBvcnQgKiBmcm9tICcuL0lNYWlsZ3VuQ2xpZW50JztcbiIsImV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RNZW1iZXJzJztcbiIsImV4cG9ydCAqIGZyb20gJy4vU3RhdHNDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9TdGF0c0NvbnRhaW5lcic7XG4iLCJleHBvcnQgKiBmcm9tICcuL0JvdW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL0NvbXBsYWludCc7XG5leHBvcnQgKiBmcm9tICcuL1Vuc3Vic2NyaWJlJztcbmV4cG9ydCAqIGZyb20gJy4vV2hpdGVMaXN0JztcbiIsImV4cG9ydCAqIGZyb20gJy4vTXVsdGlwbGVWYWxpZGF0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vVmFsaWRhdGlvbic7XG4iLCJleHBvcnQgKiBmcm9tICcuL0NvbW1vbic7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsZ3VuQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzJztcbmV4cG9ydCAqIGZyb20gJy4vU3RhdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdXBwcmVzc2lvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9ucyc7XG4iLCJleHBvcnQgKiBmcm9tICcuL0Vycm9yJztcbmV4cG9ydCAqIGZyb20gJy4vQXBpUmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9Gb3JtRGF0YSc7XG5leHBvcnQgKiBmcm9tICcuL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9SZXF1ZXN0T3B0aW9ucyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuZXhwb3J0IHR5cGUgRG9tYWluVHJhY2tpbmdEYXRhID0ge1xuICBjbGljazogeyBhY3RpdmU6IGJvb2xlYW4gfTtcbiAgb3BlbjogeyBhY3RpdmU6IGJvb2xlYW4gfTtcbiAgdW5zdWJzY3JpYmU6IHtcbiAgICBhY3RpdmU6IGJvb2xlYW47XG4gICAgaHRtbF9mb290ZXI6IHN0cmluZztcbiAgICB0ZXh0X2Zvb3Rlcjogc3RyaW5nO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRyYWNraW5nUmVzcG9uc2UgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBib2R5OiB7XG4gICAgdHJhY2tpbmc6IERvbWFpblRyYWNraW5nRGF0YVxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkT3BlblRyYWNraW5nID0ge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIG9wZW4/OiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuICBjbGljaz86IHsgYWN0aXZlOiBib29sZWFuIHwgJ2h0bWxvbmx5JyB9O1xuICB1bnN1YnNjcmliZT86IHtcbiAgICBhY3RpdmU6IGJvb2xlYW4sXG4gICAgaHRtbF9mb290ZXI6IHN0cmluZztcbiAgICB0ZXh0X2Zvb3Rlcjogc3RyaW5nO1xuICB9O1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlID0ge1xuICBzdGF0dXM6IG51bWJlcjtcbiAgYm9keTogVXBkYXRlZE9wZW5UcmFja2luZztcbn1cblxuZXhwb3J0IHR5cGUgT3BlblRyYWNraW5nSW5mbyA9IHtcbiAgYWN0aXZlOiAneWVzJyB8ICdubycgfCAndHJ1ZScgfCAnZmFsc2UnO1xufVxuZXhwb3J0IHR5cGUgQ2xpY2tUcmFja2luZ0luZm8gPSB7XG4gIGFjdGl2ZTogJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwgJ2ZhbHNlJyB8ICdodG1sb25seSc7XG59XG5cbmV4cG9ydCB0eXBlIFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvID0ge1xuICBhY3RpdmU6ICd5ZXMnIHwgJ25vJyB8ICd0cnVlJyB8ICdmYWxzZSc7XG4gIGh0bWxfZm9vdGVyOiBzdHJpbmc7XG4gIHRleHRfZm9vdGVyOiBzdHJpbmc7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0RvbWFpbkNyZWRlbnRpYWxzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWlucyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRhZ3MnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UZW1wbGF0ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UcmFja2luZyc7XG4iLCJleHBvcnQgKiBmcm9tICcuL0V2ZW50cyc7XG4iLCJleHBvcnQgKiBmcm9tICcuL0lwUG9vbHMnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9JUHMnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9NYWlsZ3VuQ2xpZW50T3B0aW9ucyc7XG4iLCJleHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0TWVtYmVycyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0cyc7XG4iLCJleHBvcnQgKiBmcm9tICcuL01lc3NhZ2VzJztcbiIsImV4cG9ydCAqIGZyb20gJy4vUm91dGVzJztcbiIsImV4cG9ydCAqIGZyb20gJy4vU3RhdHMnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9Cb3VuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9Db21wbGFpbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9TdXBwcmVzc2lvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9VbnN1YnNjcmliZSc7XG5leHBvcnQgKiBmcm9tICcuL1doaXRlTGlzdCc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuZXhwb3J0IHR5cGUgVmFsaWRhdGlvblF1ZXJ5ID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG59XG5leHBvcnQgdHlwZSBWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGlzX2Rpc3Bvc2FibGVfYWRkcmVzczogYm9vbGVhbjtcbiAgaXNfcm9sZV9hZGRyZXNzOiBib29sZWFuO1xuICByZWFzb246IHN0cmluZ1tdO1xuICByZXN1bHQ6IHN0cmluZztcbiAgcmlzazogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBWYWxpZGF0aW9uUmVzcG9uc2UgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBib2R5OiBWYWxpZGF0aW9uUmVzdWx0O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NdWx0aXBsZVZhbGlkYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9uJztcbiIsImV4cG9ydCAqIGZyb20gJy4vV2ViaG9va3MnO1xuIiwiZXhwb3J0ICogYXMgQ29tbW9uIGZyb20gJy4vQ29tbW9uJztcbmV4cG9ydCAqIGFzIERvbWFpbnMgZnJvbSAnLi9Eb21haW5zJztcbmV4cG9ydCAqIGFzIEV2ZW50cyBmcm9tICcuL0V2ZW50cyc7XG5leHBvcnQgKiBhcyBJUFBvb2xzIGZyb20gJy4vSVBQb29scyc7XG5leHBvcnQgKiBhcyBJUHMgZnJvbSAnLi9JUHMnO1xuZXhwb3J0ICogYXMgTWFpbGd1bkNsaWVudCBmcm9tICcuL01haWxndW5DbGllbnQnO1xuZXhwb3J0ICogYXMgTWFpbGluZ0xpc3RzIGZyb20gJy4vTWFpbGluZ0xpc3RzJztcbmV4cG9ydCAqIGFzIE1lc3NhZ2VzIGZyb20gJy4vTWVzc2FnZXMnO1xuZXhwb3J0ICogYXMgUm91dGVzIGZyb20gJy4vUm91dGVzJztcbmV4cG9ydCAqIGFzIFN0YXRzIGZyb20gJy4vU3RhdHMnO1xuZXhwb3J0ICogYXMgU3VwcHJlc3Npb25zIGZyb20gJy4vU3VwcHJlc3Npb25zJztcbmV4cG9ydCAqIGFzIFZhbGlkYXRpb25zIGZyb20gJy4vVmFsaWRhdGlvbnMnO1xuZXhwb3J0ICogYXMgV2ViaG9va3MgZnJvbSAnLi9XZWJob29rcyc7XG4iLCJpbXBvcnQgTWFpbGd1bkNsaWVudCBmcm9tICcuL0NsYXNzZXMvTWFpbGd1bkNsaWVudCc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9UeXBlcy9Db21tb24nO1xuaW1wb3J0IHsgTWFpbGd1bkNsaWVudE9wdGlvbnMgfSBmcm9tICcuL1R5cGVzL01haWxndW5DbGllbnQnO1xuXG5leHBvcnQgKiBhcyBFbnVtcyBmcm9tICcuL0VudW1zJztcbmV4cG9ydCAqIGFzIFR5cGVzIGZyb20gJy4vVHlwZXMnO1xuZXhwb3J0ICogYXMgSW50ZXJmYWNlcyBmcm9tICcuL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsZ3VuIHtcbiAgc3RhdGljIGdldCBkZWZhdWx0KCk6IHR5cGVvZiBNYWlsZ3VuIHsgcmV0dXJuIHRoaXM7IH1cbiAgcHJpdmF0ZSBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YVxuXG4gIGNvbnN0cnVjdG9yKEZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy5mb3JtRGF0YSA9IEZvcm1EYXRhO1xuICB9XG5cbiAgY2xpZW50KG9wdGlvbnM6IE1haWxndW5DbGllbnRPcHRpb25zKSA6IE1haWxndW5DbGllbnQge1xuICAgIHJldHVybiBuZXcgTWFpbGd1bkNsaWVudChvcHRpb25zLCB0aGlzLmZvcm1EYXRhKTtcbiAgfVxufVxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9iYXNlNjQgdjEuMC4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMS4wLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiKGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pO1xuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG59KSgndXJsam9pbicsIHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBub3JtYWxpemUgKHN0ckFycmF5KSB7XG4gICAgdmFyIHJlc3VsdEFycmF5ID0gW107XG4gICAgaWYgKHN0ckFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cblxuICAgIGlmICh0eXBlb2Ygc3RyQXJyYXlbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIHN0ckFycmF5WzBdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZmlyc3QgcGFydCBpcyBhIHBsYWluIHByb3RvY29sLCB3ZSBjb21iaW5lIGl0IHdpdGggdGhlIG5leHQgcGFydC5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15bXi86XSs6XFwvKiQvKSAmJiBzdHJBcnJheS5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgZmlyc3QgPSBzdHJBcnJheS5zaGlmdCgpO1xuICAgICAgc3RyQXJyYXlbMF0gPSBmaXJzdCArIHN0ckFycmF5WzBdO1xuICAgIH1cblxuICAgIC8vIFRoZXJlIG11c3QgYmUgdHdvIG9yIHRocmVlIHNsYXNoZXMgaW4gdGhlIGZpbGUgcHJvdG9jb2wsIHR3byBzbGFzaGVzIGluIGFueXRoaW5nIGVsc2UuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eZmlsZTpcXC9cXC9cXC8vKSkge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLycpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBzdHJBcnJheVtpXTtcblxuICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgY29tcG9uZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvbmVudCA9PT0gJycpIHsgY29udGludWU7IH1cblxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBzdGFydGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGZpcnN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvXltcXC9dKy8sICcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgc3RyQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgZW5kaW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgbGFzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3IgdGhlIGxhc3QgY29tcG9uZW50IHdlIHdpbGwgY29tYmluZSBtdWx0aXBsZSBzbGFzaGVzIHRvIGEgc2luZ2xlIG9uZS5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnLycpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRBcnJheS5wdXNoKGNvbXBvbmVudCk7XG5cbiAgICB9XG5cbiAgICB2YXIgc3RyID0gcmVzdWx0QXJyYXkuam9pbignLycpO1xuICAgIC8vIEVhY2ggaW5wdXQgY29tcG9uZW50IGlzIG5vdyBzZXBhcmF0ZWQgYnkgYSBzaW5nbGUgc2xhc2ggZXhjZXB0IHRoZSBwb3NzaWJsZSBmaXJzdCBwbGFpbiBwcm90b2NvbCBwYXJ0LlxuXG4gICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGJlZm9yZSBwYXJhbWV0ZXJzIG9yIGhhc2hcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFwvKFxcP3wmfCNbXiFdKS9nLCAnJDEnKTtcblxuICAgIC8vIHJlcGxhY2UgPyBpbiBwYXJhbWV0ZXJzIHdpdGggJlxuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnPycpO1xuICAgIHN0ciA9IHBhcnRzLnNoaWZ0KCkgKyAocGFydHMubGVuZ3RoID4gMCA/ICc/JzogJycpICsgcGFydHMuam9pbignJicpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlucHV0O1xuXG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpbnB1dCA9IGFyZ3VtZW50c1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShpbnB1dCk7XG4gIH07XG5cbn0pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9saWIvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOlsiZGF0YSIsInJlY2VpdmluZyIsInNlbmRpbmciLCJuYW1lIiwicmVxdWlyZV90bHMiLCJza2lwX3ZlcmlmaWNhdGlvbiIsInN0YXRlIiwid2lsZGNhcmQiLCJzcGFtX2FjdGlvbiIsImNyZWF0ZWRfYXQiLCJzbXRwX3Bhc3N3b3JkIiwic210cF9sb2dpbiIsInR5cGUiLCJyZWNlaXZpbmdfZG5zX3JlY29yZHMiLCJzZW5kaW5nX2Ruc19yZWNvcmRzIiwiZXhwb3J0cyIsInJlcXVlc3QiLCJkb21haW5DcmVkZW50aWFsc0NsaWVudCIsImRvbWFpblRlbXBsYXRlc0NsaWVudCIsImRvbWFpblRhZ3NDbGllbnQiLCJkb21haW5DcmVkZW50aWFscyIsImRvbWFpblRlbXBsYXRlcyIsImRvbWFpblRhZ3MiLCJEb21haW5DbGllbnQiLCJyZXNwb25zZSIsImJvZHkiLCJpdGVtcyIsIm1hcCIsIml0ZW0iLCJEb21haW4iLCJkb21haW4iLCJ0cmFja2luZyIsInF1ZXJ5IiwiZ2V0IiwidGhlbiIsInJlcyIsInBhcnNlRG9tYWluTGlzdCIsIl9wYXJzZURvbWFpbiIsInBvc3RPYmoiLCJmb3JjZV9ka2ltX2F1dGhvcml0eSIsInRvU3RyaW5nIiwicG9zdFdpdGhGRCIsInB1dCIsImRlbGV0ZSIsIl9wYXJzZU1lc3NhZ2UiLCJjb25uZWN0aW9uIiwiX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyIsImFjdGl2ZSIsIkVycm9yXzEiLCJzdGF0dXMiLCJzdGF0dXNUZXh0IiwibWVzc2FnZSIsInB1dFdpdGhGRCIsIl9wYXJzZVRyYWNraW5nVXBkYXRlIiwiaXAiLCJwb29sX2lkIiwicmVwbGFjZW1lbnQiLCJzZWFyY2hQYXJhbXMiLCJzZWxmIiwiZGtpbVNlbGVjdG9yIiwid2ViUHJlZml4IiwiYmFzZVJvdXRlIiwiRG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJ0b3RhbENvdW50IiwidG90YWxfY291bnQiLCJyZXN1bHQiLCJzcGVjIiwiX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0IiwiX3BhcnNlTWVzc2FnZVJlc3BvbnNlIiwiY3JlZGVudGlhbHNMb2dpbiIsIl9wYXJzZURlbGV0ZWRSZXNwb25zZSIsInRhZ0luZm8iLCJ0YWciLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJ0YWdTdGF0aXN0aWNJbmZvIiwic3RhcnQiLCJlbmQiLCJyZXNvbHV0aW9uIiwic3RhdHMiLCJzdGF0IiwidGltZSIsIl9fZXh0ZW5kcyIsIl9zdXBlciIsIl90aGlzIiwiRG9tYWluVGFnc0NsaWVudCIsIkRvbWFpblRhZyIsInBhZ2VzIiwicGFyc2VQYWdlTGlua3MiLCJEb21haW5UYWdTdGF0aXN0aWMiLCJyZXF1ZXN0TGlzdFdpdGhQYWdlcyIsIl9wYXJzZVRhZ1N0YXRpc3RpYyIsIk5hdmlnYXRpb25UaHJ1UGFnZXNfMSIsImRvbWFpblRlbXBsYXRlRnJvbUFQSSIsImNyZWF0ZWRBdCIsImNyZWF0ZWRCeSIsImlkIiwidmVyc2lvbiIsInZlcnNpb25zIiwibGVuZ3RoIiwiRG9tYWluVGVtcGxhdGVzQ2xpZW50IiwiRG9tYWluVGVtcGxhdGVJdGVtIiwidGVtcGxhdGUiLCJ0ZW1wbGF0ZU5hbWUiLCJ0ZW1wbGF0ZVZlcnNpb24iLCJkIiwicGFyc2VDcmVhdGlvblJlc3BvbnNlIiwicGFyc2VNdXRhdGlvblJlc3BvbnNlIiwicGFyc2VOb3RpZmljYXRpb25SZXNwb25zZSIsInBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UiLCJwYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlIiwicGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyIsIkV2ZW50Q2xpZW50IiwiSXBQb29sc0NsaWVudCIsInBhcnNlSXBQb29sc1Jlc3BvbnNlIiwiX2EiLCJwb29sSWQiLCJwYXRjaFdpdGhGRCIsIklwc0NsaWVudCIsInBhcnNlSXBzUmVzcG9uc2UiLCJvcHRpb25zIiwiZm9ybURhdGEiLCJjb25maWciLCJfX2Fzc2lnbiIsInVybCIsInVzZXJuYW1lIiwiRXJyb3IiLCJrZXkiLCJSZXF1ZXN0XzEiLCJtYWlsTGlzdHNNZW1iZXJzIiwibWFpbExpc3RNZW1iZXJzXzEiLCJkb21haW5zQ3JlZGVudGlhbHNfMSIsImRvbWFpbnNUZW1wbGF0ZXNfMSIsImRvbWFpbnNUYWdzXzEiLCJtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJtdWx0aXBsZVZhbGlkYXRpb25fMSIsImRvbWFpbnMiLCJkb21haW5zXzEiLCJ3ZWJob29rcyIsIldlYmhvb2tzXzEiLCJldmVudHMiLCJFdmVudHNfMSIsIlN0YXRzQ2xpZW50XzEiLCJzdXBwcmVzc2lvbnMiLCJTdXBwcmVzc2lvbnNDbGllbnRfMSIsIm1lc3NhZ2VzIiwiTWVzc2FnZXNfMSIsInJvdXRlcyIsIlJvdXRlc18xIiwiaXBzIiwiSVBzXzEiLCJpcF9wb29scyIsIklQUG9vbHNfMSIsImxpc3RzIiwibWFpbGluZ0xpc3RzXzEiLCJ2YWxpZGF0ZSIsInZhbGlkYXRlXzEiLCJNYWlsTGlzdHNNZW1iZXJzIiwibmV3RGF0YSIsInZhcnMiLCJKU09OIiwic3RyaW5naWZ5Iiwic3Vic2NyaWJlZCIsIm1haWxMaXN0QWRkcmVzcyIsIm1haWxMaXN0TWVtYmVyQWRkcmVzcyIsIm1lbWJlciIsInJlcURhdGEiLCJjaGVja0FuZFVwZGF0ZURhdGEiLCJtZW1iZXJzIiwiQXJyYXkiLCJpc0FycmF5IiwidXBzZXJ0IiwiTGlzdHNDbGllbnQiLCJ2YWxpZGF0aW9uUmVzdWx0IiwibGlzdCIsInBvc3QiLCJwYXJzZVZhbGlkYXRpb25SZXN1bHQiLCJNZXNzYWdlc0NsaWVudCIsInllc05vUHJvcGVydGllcyIsIlNldCIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhY2MiLCJoYXMiLCJfcGFyc2VSZXNwb25zZSIsIm1vZGlmaWVkRGF0YSIsInByZXBhcmVCb29sZWFuVmFsdWVzIiwiUm91dGVzQ2xpZW50Iiwicm91dGUiLCJsb2dnZXIiLCJTdGF0c0NsaWVudCIsImlucHV0RGF0ZSIsIndhcm4iLCJ0b1VUQ1N0cmluZyIsImVudHJpZXMiLCJhcnJheVdpdGhQYWlycyIsImN1cnJlbnRQYWlyIiwidmFsdWUiLCJyZXBlYXRlZFByb3BlcnR5IiwicHVzaCIsImNvbnZlcnREYXRlVG9VVEMiLCJTdGF0c0NvbnRhaW5lcl8xIiwicHJlcGFyZVNlYXJjaFBhcmFtcyIsInBhcnNlU3RhdHMiLCJFbnVtc18xIiwiQk9VTkNFUyIsImFkZHJlc3MiLCJjb2RlIiwiZXJyb3IiLCJTdXBwcmVzc2lvbl8xIiwiQ09NUExBSU5UUyIsImNyZWF0ZU9wdGlvbnMiLCJoZWFkZXJzIiwibW9kZWxzIiwiTWFwIiwic2V0IiwiQm91bmNlXzEiLCJDb21wbGFpbnRfMSIsIlVuc3Vic2NyaWJlXzEiLCJXaGl0ZUxpc3RfMSIsIlN1cHByZXNzaW9uQ2xpZW50IiwiTW9kZWwiLCJwcmVwYXJlUmVzcG9uc2UiLCJjaGVja1R5cGUiLCJtb2RlbCIsImVuY29kZVVSSUNvbXBvbmVudCIsIl9wYXJzZUl0ZW0iLCJwb3N0RGF0YSIsImNyZWF0ZVdoaXRlTGlzdCIsIm1vZHVsZSIsIlVOU1VCU0NSSUJFUyIsInRhZ3MiLCJXSElURUxJU1RTIiwicmVhc29uIiwicmVzcG9uc2VTdGF0dXNDb2RlIiwicXVhbnRpdHkiLCJyZWNvcmRzUHJvY2Vzc2VkIiwicmVjb3Jkc19wcm9jZXNzZWQiLCJkb3dubG9hZF91cmwiLCJkb3dubG9hZFVybCIsImNzdiIsImpzb24iLCJzdW1tYXJ5IiwiY2F0Y2hBbGwiLCJjYXRjaF9hbGwiLCJkZWxpdmVyYWJsZSIsImRvTm90U2VuZCIsImRvX25vdF9zZW5kIiwidW5kZWxpdmVyYWJsZSIsInVua25vd24iLCJyaXNrIiwiaGlnaCIsImxvdyIsIm1lZGl1bSIsIk11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCIsImpvYnMiLCJqb2IiLCJNdWx0aXBsZVZhbGlkYXRpb25Kb2IiLCJ0b3RhbCIsImxpc3RJZCIsIm11bHRpcGxlVmFsaWRhdGlvbkRhdGEiLCJtdWx0aXBsZVZhbGlkYXRpb25GaWxlIiwiZmlsZSIsImhhbmRsZVJlc3BvbnNlIiwibXVsdGlwbGVWYWxpZGF0aW9uIiwiVmFsaWRhdGVDbGllbnQiLCJXZWJob29rc0NsaWVudCIsIndlYmhvb2tSZXNwb25zZSIsIndlYmhvb2siLCJ1cmxzIiwidW5kZWZpbmVkIiwiV2ViaG9vayIsIl9wYXJzZVdlYmhvb2tMaXN0IiwiX3BhcnNlV2ViaG9va1dpdGhJRCIsInRlc3QiLCJfcGFyc2VXZWJob29rVGVzdCIsIl9iIiwiYm9keU1lc3NhZ2UiLCJzdGFjayIsImRldGFpbHMiLCJGb3JtRGF0YUNvbnN0cnVjdG9yIiwiRm9ybURhdGFCdWlsZGVyIiwiZmlsdGVyIiwiZm9ybURhdGFBY2MiLCJmaWxlS2V5cyIsImluY2x1ZGVzIiwiYWRkRmlsZXNUb0ZEIiwiYWRkTWltZURhdGFUb0ZEIiwiYWRkQ29tbW9uUHJvcGVydHlUb0ZEIiwiZm9ybURhdGFJbnN0YW5jZSIsImdldEhlYWRlcnMiLCJpc1N0cmVhbSIsImNvbnRlbnRUeXBlIiwia25vd25MZW5ndGgiLCJmaWxlbmFtZSIsIkJ1ZmZlciIsImlzQnVmZmVyIiwibm9kZUZvcm1EYXRhIiwicHJlcGFyZWREYXRhIiwiZnJvbSIsImFwcGVuZCIsImJyb3dzZXJGb3JtRGF0YSIsInByb3BlcnR5TmFtZSIsImFwcGVuZEZpbGVUb0ZEIiwib3JpZ2luYWxLZXkiLCJvYmoiLCJpc1N0cmVhbURhdGEiLCJvYmpEYXRhIiwiZ2V0QXR0YWNobWVudE9wdGlvbnMiLCJpc05vZGVGb3JtRGF0YSIsImZvckVhY2giLCJwaXBlIiwiTmF2aWdhdGlvblRocnVQYWdlcyIsInBhZ2VVcmwiLCJ1cmxTZXBhcmF0b3IiLCJpdGVyYXRvck5hbWUiLCJwYXJzZWRVcmwiLCJVUkwiLCJwYWdlVmFsdWUiLCJzcGxpdCIsInBvcCIsIml0ZXJhdG9yUG9zaXRpb24iLCJwYWdlIiwicGFnaW5nIiwicGFyc2VQYWdlIiwiY2xpZW50VXJsIiwicXVlcnlDb3B5IiwidXBkYXRlZFF1ZXJ5IiwidXBkYXRlVXJsQW5kUXVlcnkiLCJwYXJzZUxpc3QiLCJ0aW1lb3V0IiwiZm9ybURhdGFCdWlsZGVyIiwiRm9ybURhdGFCdWlsZGVyXzEiLCJtYXhCb2R5TGVuZ3RoIiwiUmVxdWVzdCIsIm1ldGhvZCIsIm9uQ2FsbE9wdGlvbnMiLCJiYXNpYyIsImJhc2U2NCIsImVuY29kZSIsIm9uQ2FsbEhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwicGFyYW1zIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIlVSTFNlYXJjaFBhcmFtcyIsInVybFZhbHVlIiwiYXhpb3NfMSIsInRvTG9jYWxlVXBwZXJDYXNlIiwiX2QiLCJlcnJvclJlc3BvbnNlIiwiZXJyXzEiLCJnZXRSZXNwb25zZUJvZHkiLCJhZGREZWZhdWx0SGVhZGVycyIsInJlcXVlc3RPcHRpb25zIiwiY29tbWFuZCIsImNyZWF0ZUZvcm1EYXRhIiwiUmVzb2x1dGlvbiIsIlN1cHByZXNzaW9uTW9kZWxzIiwiV2ViaG9va3NJZHMiLCJZZXNObyIsIl9fZXhwb3J0U3RhciIsIkZvcm1EYXRhIiwiTWFpbGd1biIsIk1haWxndW5DbGllbnRfMSJdLCJzb3VyY2VSb290IjoiIn0=
