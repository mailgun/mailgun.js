/*! mailgun.js v7.0.4 */
/*! mailgun.js v7.0.4 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyZEE7O0FBQ0E7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7QUFBQTtBQUFBO0FB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VUVKQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zRXJyb3IuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9lbnYvZGF0YS5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b0Zvcm1EYXRhLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvY2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9kb21haW5zLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvZG9tYWluc0NyZWRlbnRpYWxzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvZG9tYWluc1RhZ3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9kb21haW5zVGVtcGxhdGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvZXJyb3IudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9mb3JtRGF0YUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL2ludGVyZmFjZXMvU3VwcmVzc2lvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9pcC1wb29scy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL2lwcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL2xpc3RzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvbWFpbExpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvbWVzc2FnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9tdWx0aXBsZVZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9yZXF1ZXN0LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvcm91dGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvc3RhdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9zdXBwcmVzc2lvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi92YWxpZGF0ZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL3dlYmhvb2tzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy91cmwtam9pbi9saWIvdXJsLWpvaW4uanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwnKTtcbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yJyk7XG52YXIgcGFyc2VQcm90b2NvbCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcGFyc2VQcm90b2NvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG4gICAgdmFyIHJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgdmFyIG9uQ2FuY2VsZWQ7XG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpICYmIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCAgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICB2YXIgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4gfHwgY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBmdW5jdGlvbihjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IChjYW5jZWwgJiYgY2FuY2VsLnR5cGUpID8gbmV3IENhbmNlbGVkRXJyb3IoKSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4gJiYgY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChjb25maWcuc2lnbmFsKSB7XG4gICAgICAgIGNvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IGNvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvY29sID0gcGFyc2VQcm90b2NvbChmdWxsUGF0aCk7XG5cbiAgICBpZiAocHJvdG9jb2wgJiYgWyAnaHR0cCcsICdodHRwcycsICdmaWxlJyBdLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBjb25maWcpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3InKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcbmF4aW9zLlZFUlNJT04gPSByZXF1aXJlKCcuL2Vudi9kYXRhJykudmVyc2lvbjtcbmF4aW9zLnRvRm9ybURhdGEgPSByZXF1aXJlKCcuL2hlbHBlcnMvdG9Gb3JtRGF0YScpO1xuXG4vLyBFeHBvc2UgQXhpb3NFcnJvciBjbGFzc1xuYXhpb3MuQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2xpYi9jb3JlL0F4aW9zRXJyb3InKTtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vaGVscGVycy9pc0F4aW9zRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWxlZEVycm9yID0gcmVxdWlyZSgnLi9DYW5jZWxlZEVycm9yJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcblxuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICB0aGlzLnByb21pc2UudGhlbihmdW5jdGlvbihjYW5jZWwpIHtcbiAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgIHZhciBpO1xuICAgIHZhciBsID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0b2tlbi5fbGlzdGVuZXJzW2ldKGNhbmNlbCk7XG4gICAgfVxuICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICB9KTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICB0aGlzLnByb21pc2UudGhlbiA9IGZ1bmN0aW9uKG9uZnVsZmlsbGVkKSB7XG4gICAgdmFyIF9yZXNvbHZlO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICB0b2tlbi5zdWJzY3JpYmUocmVzb2x2ZSk7XG4gICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICBwcm9taXNlLmNhbmNlbCA9IGZ1bmN0aW9uIHJlamVjdCgpIHtcbiAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH07XG5cbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAqL1xuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIGxpc3RlbmVyKHRoaXMucmVhc29uKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IFtsaXN0ZW5lcl07XG4gIH1cbn07XG5cbi8qKlxuICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICovXG5cbkNhbmNlbFRva2VuLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVEKTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscy5pbmhlcml0cyhDYW5jZWxlZEVycm9yLCBBeGlvc0Vycm9yLCB7XG4gIF9fQ0FOQ0VMX186IHRydWVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi9idWlsZEZ1bGxQYXRoJyk7XG52YXIgdmFsaWRhdG9yID0gcmVxdWlyZSgnLi4vaGVscGVycy92YWxpZGF0b3InKTtcblxudmFyIHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XG4gIH1cblxuICB2YXIgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbDtcblxuICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgIHNpbGVudEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgLy8gZmlsdGVyIG91dCBza2lwcGVkIGludGVyY2VwdG9yc1xuICB2YXIgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgdmFyIHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHRydWU7XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdmFyIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB2YXIgcHJvbWlzZTtcblxuICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG5cbiAgICBBcnJheS5wcm90b3R5cGUudW5zaGlmdC5hcHBseShjaGFpbiwgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4pO1xuICAgIGNoYWluID0gY2hhaW4uY29uY2F0KHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG5cbiAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG5cbiAgdmFyIG5ld0NvbmZpZyA9IGNvbmZpZztcbiAgd2hpbGUgKHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aCkge1xuICAgIHZhciBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCk7XG4gICAgdmFyIG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5zaGlmdCgpO1xuICAgIHRyeSB7XG4gICAgICBuZXdDb25maWcgPSBvbkZ1bGZpbGxlZChuZXdDb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBvblJlamVjdGVkKGVycm9yKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdChuZXdDb25maWcpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cblxuICB3aGlsZSAocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCksIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBnZW5lcmF0ZUhUVFBNZXRob2QoKTtcblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICByZXNwb25zZSAmJiAodGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlKTtcbn1cblxudXRpbHMuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMucmVzcG9uc2UgJiYgdGhpcy5yZXNwb25zZS5zdGF0dXMgPyB0aGlzLnJlc3BvbnNlLnN0YXR1cyA6IG51bGxcbiAgICB9O1xuICB9XG59KTtcblxudmFyIHByb3RvdHlwZSA9IEF4aW9zRXJyb3IucHJvdG90eXBlO1xudmFyIGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXS5mb3JFYWNoKGZ1bmN0aW9uKGNvZGUpIHtcbiAgZGVzY3JpcHRvcnNbY29kZV0gPSB7dmFsdWU6IGNvZGV9O1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEF4aW9zRXJyb3IsIGRlc2NyaXB0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IGZ1bmN0aW9uKGVycm9yLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlLCBjdXN0b21Qcm9wcykge1xuICB2YXIgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcblxuICB1dGlscy50b0ZsYXRPYmplY3QoZXJyb3IsIGF4aW9zRXJyb3IsIGZ1bmN0aW9uIGZpbHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBFcnJvci5wcm90b3R5cGU7XG4gIH0pO1xuXG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBlcnJvci5tZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICBheGlvc0Vycm9yLm5hbWUgPSBlcnJvci5uYW1lO1xuXG4gIGN1c3RvbVByb3BzICYmIE9iamVjdC5hc3NpZ24oYXhpb3NFcnJvciwgY3VzdG9tUHJvcHMpO1xuXG4gIHJldHVybiBheGlvc0Vycm9yO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvc0Vycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCwgb3B0aW9ucykge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZCxcbiAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgY29uZmlnLFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICBjb25maWcsXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGlyZWN0S2V5cyhwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbWVyZ2VNYXAgPSB7XG4gICAgJ3VybCc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ21ldGhvZCc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ2RhdGEnOiB2YWx1ZUZyb21Db25maWcyLFxuICAgICdiYXNlVVJMJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNmb3JtUmVxdWVzdCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RyYW5zZm9ybVJlc3BvbnNlJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAncGFyYW1zU2VyaWFsaXplcic6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RpbWVvdXQnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd0aW1lb3V0TWVzc2FnZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3dpdGhDcmVkZW50aWFscyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2FkYXB0ZXInOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdyZXNwb25zZVR5cGUnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd4c3JmQ29va2llTmFtZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnb25VcGxvYWRQcm9ncmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ29uRG93bmxvYWRQcm9ncmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2RlY29tcHJlc3MnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnbWF4Qm9keUxlbmd0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2JlZm9yZVJlZGlyZWN0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNwb3J0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnaHR0cEFnZW50JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnaHR0cHNBZ2VudCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2NhbmNlbFRva2VuJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnc29ja2V0UGF0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3Jlc3BvbnNlRW5jb2RpbmcnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd2YWxpZGF0ZVN0YXR1cyc6IG1lcmdlRGlyZWN0S2V5c1xuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoY29uZmlnMSkuY29uY2F0KE9iamVjdC5rZXlzKGNvbmZpZzIpKSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICB2YXIgbWVyZ2UgPSBtZXJnZU1hcFtwcm9wXSB8fCBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIHZhciBjb25maWdWYWx1ZSA9IG1lcmdlKHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi9BeGlvc0Vycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIHZhciBjb250ZXh0ID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb250ZXh0LCBkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSByZXF1aXJlKCcuL3RyYW5zaXRpb25hbCcpO1xudmFyIHRvRm9ybURhdGEgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3RvRm9ybURhdGEnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG5cbiAgdHJhbnNpdGlvbmFsOiB0cmFuc2l0aW9uYWxEZWZhdWx0cyxcblxuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICB2YXIgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG4gICAgdmFyIGNvbnRlbnRUeXBlID0gaGVhZGVycyAmJiBoZWFkZXJzWydDb250ZW50LVR5cGUnXTtcblxuICAgIHZhciBpc0ZpbGVMaXN0O1xuXG4gICAgaWYgKChpc0ZpbGVMaXN0ID0gdXRpbHMuaXNGaWxlTGlzdChkYXRhKSkgfHwgKGlzT2JqZWN0UGF5bG9hZCAmJiBjb250ZW50VHlwZSA9PT0gJ211bHRpcGFydC9mb3JtLWRhdGEnKSkge1xuICAgICAgdmFyIF9Gb3JtRGF0YSA9IHRoaXMuZW52ICYmIHRoaXMuZW52LkZvcm1EYXRhO1xuICAgICAgcmV0dXJuIHRvRm9ybURhdGEoaXNGaWxlTGlzdCA/IHsnZmlsZXNbXSc6IGRhdGF9IDogZGF0YSwgX0Zvcm1EYXRhICYmIG5ldyBfRm9ybURhdGEoKSk7XG4gICAgfSBlbHNlIGlmIChpc09iamVjdFBheWxvYWQgfHwgY29udGVudFR5cGUgPT09ICdhcHBsaWNhdGlvbi9qc29uJykge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICByZXR1cm4gc3RyaW5naWZ5U2FmZWx5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICB2YXIgdHJhbnNpdGlvbmFsID0gdGhpcy50cmFuc2l0aW9uYWwgfHwgZGVmYXVsdHMudHJhbnNpdGlvbmFsO1xuICAgIHZhciBzaWxlbnRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuc2lsZW50SlNPTlBhcnNpbmc7XG4gICAgdmFyIGZvcmNlZEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5mb3JjZWRKU09OUGFyc2luZztcbiAgICB2YXIgc3RyaWN0SlNPTlBhcnNpbmcgPSAhc2lsZW50SlNPTlBhcnNpbmcgJiYgdGhpcy5yZXNwb25zZVR5cGUgPT09ICdqc29uJztcblxuICAgIGlmIChzdHJpY3RKU09OUGFyc2luZyB8fCAoZm9yY2VkSlNPTlBhcnNpbmcgJiYgdXRpbHMuaXNTdHJpbmcoZGF0YSkgJiYgZGF0YS5sZW5ndGgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XG4gICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiByZXF1aXJlKCcuL2Vudi9Gb3JtRGF0YScpXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgICB9XG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaWxlbnRKU09OUGFyc2luZzogdHJ1ZSxcbiAgZm9yY2VkSlNPTlBhcnNpbmc6IHRydWUsXG4gIGNsYXJpZnlUaW1lb3V0RXJyb3I6IGZhbHNlXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwidmVyc2lvblwiOiBcIjAuMjcuMlwiXG59OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG5tb2R1bGUuZXhwb3J0cyA9IG51bGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIHZhciBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgRm9ybURhdGEoKTtcblxuICB2YXIgc3RhY2sgPSBbXTtcblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGQoZGF0YSwgcGFyZW50S2V5KSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoZGF0YSkgfHwgdXRpbHMuaXNBcnJheShkYXRhKSkge1xuICAgICAgaWYgKHN0YWNrLmluZGV4T2YoZGF0YSkgIT09IC0xKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhcmVudEtleSk7XG4gICAgICB9XG5cbiAgICAgIHN0YWNrLnB1c2goZGF0YSk7XG5cbiAgICAgIHV0aWxzLmZvckVhY2goZGF0YSwgZnVuY3Rpb24gZWFjaCh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcbiAgICAgICAgdmFyIGZ1bGxLZXkgPSBwYXJlbnRLZXkgPyBwYXJlbnRLZXkgKyAnLicgKyBrZXkgOiBrZXk7XG4gICAgICAgIHZhciBhcnI7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmICFwYXJlbnRLZXkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgIXV0aWxzLmlzVW5kZWZpbmVkKGVsKSAmJiBmb3JtRGF0YS5hcHBlbmQoZnVsbEtleSwgY29udmVydFZhbHVlKGVsKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBidWlsZCh2YWx1ZSwgZnVsbEtleSk7XG4gICAgICB9KTtcblxuICAgICAgc3RhY2sucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChwYXJlbnRLZXksIGNvbnZlcnRWYWx1ZShkYXRhKSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Gb3JtRGF0YTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIFZFUlNJT04gPSByZXF1aXJlKCcuLi9lbnYvZGF0YScpLnZlcnNpb247XG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xuXG52YXIgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goZnVuY3Rpb24odHlwZSwgaSkge1xuICB2YWxpZGF0b3JzW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxudmFyIGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xudmFsaWRhdG9ycy50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3B0LCBvcHRzKSB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICB2YXIgb3B0ID0ga2V5c1tpXTtcbiAgICB2YXIgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgdmFyIHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgdmFyIHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXNzZXJ0T3B0aW9uczogYXNzZXJ0T3B0aW9ucyxcbiAgdmFsaWRhdG9yczogdmFsaWRhdG9yc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xudmFyIGtpbmRPZiA9IChmdW5jdGlvbihjYWNoZSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odGhpbmcpIHtcbiAgICB2YXIgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xuICB9O1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmZ1bmN0aW9uIGtpbmRPZlRlc3QodHlwZSkge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gZnVuY3Rpb24gaXNLaW5kT2YodGhpbmcpIHtcbiAgICByZXR1cm4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZTtcbiAgfTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbCkge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHRoaW5nKSB7XG4gIHZhciBwYXR0ZXJuID0gJ1tvYmplY3QgRm9ybURhdGFdJztcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8XG4gICAgdG9TdHJpbmcuY2FsbCh0aGluZykgPT09IHBhdHRlcm4gfHxcbiAgICAoaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gcGF0dGVybilcbiAgKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci50cmltID8gc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICogQHJldHVybiB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKi9cblxuZnVuY3Rpb24gaW5oZXJpdHMoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZmlsdGVyXVxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiB0b0ZsYXRPYmplY3Qoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIpIHtcbiAgdmFyIHByb3BzO1xuICB2YXIgaTtcbiAgdmFyIHByb3A7XG4gIHZhciBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICghbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59XG5cbi8qXG4gKiBkZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICB2YXIgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0XG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gdG9BcnJheSh0aGluZykge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgdmFyIGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmIChpc1VuZGVmaW5lZChpKSkgcmV0dXJuIG51bGw7XG4gIHZhciBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbnZhciBpc1R5cGVkQXJyYXkgPSAoZnVuY3Rpb24oVHlwZWRBcnJheSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odGhpbmcpIHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW0sXG4gIHN0cmlwQk9NOiBzdHJpcEJPTSxcbiAgaW5oZXJpdHM6IGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3Q6IHRvRmxhdE9iamVjdCxcbiAga2luZE9mOiBraW5kT2YsXG4gIGtpbmRPZlRlc3Q6IGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoOiBlbmRzV2l0aCxcbiAgdG9BcnJheTogdG9BcnJheSxcbiAgaXNUeXBlZEFycmF5OiBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3Q6IGlzRmlsZUxpc3Rcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvT3B0aW9ucyc7XG5pbXBvcnQgeyBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy9SZXF1ZXN0T3B0aW9ucyc7XG5cbmltcG9ydCBEb21haW5DbGllbnQgZnJvbSAnLi9kb21haW5zJztcbmltcG9ydCBFdmVudENsaWVudCBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgU3RhdHNDbGllbnQgZnJvbSAnLi9zdGF0cyc7XG5pbXBvcnQgU3VwcHJlc3Npb25DbGllbnQgZnJvbSAnLi9zdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFdlYmhvb2tDbGllbnQgZnJvbSAnLi93ZWJob29rcyc7XG5pbXBvcnQgTWVzc2FnZXNDbGllbnQgZnJvbSAnLi9tZXNzYWdlcyc7XG5pbXBvcnQgUm91dGVzQ2xpZW50IGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBWYWxpZGF0ZUNsaWVudCBmcm9tICcuL3ZhbGlkYXRlJztcbmltcG9ydCBJcHNDbGllbnQgZnJvbSAnLi9pcHMnO1xuaW1wb3J0IElwUG9vbHNDbGllbnQgZnJvbSAnLi9pcC1wb29scyc7XG5pbXBvcnQgTGlzdHNDbGllbnQgZnJvbSAnLi9saXN0cyc7XG5pbXBvcnQgTWFpbExpc3RzTWVtYmVycyBmcm9tICcuL21haWxMaXN0TWVtYmVycyc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lGb3JtRGF0YSc7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9kb21haW5zQ3JlZGVudGlhbHMnO1xuaW1wb3J0IE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCBmcm9tICcuL211bHRpcGxlVmFsaWRhdGlvbic7XG5pbXBvcnQgRG9tYWluVGVtcGxhdGVzQ2xpZW50IGZyb20gJy4vZG9tYWluc1RlbXBsYXRlcyc7XG5pbXBvcnQgRG9tYWluVGFnc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUYWdzJztcbmltcG9ydCB7IElNYWlsZ3VuQ2xpZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lNYWlsZ3VuQ2xpZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpZW50IGltcGxlbWVudHMgSU1haWxndW5DbGllbnQge1xuICBwcml2YXRlIHJlcXVlc3Q7XG5cbiAgcHVibGljIGRvbWFpbnM7XG4gIHB1YmxpYyB3ZWJob29rcztcbiAgcHVibGljIGV2ZW50cztcbiAgcHVibGljIHN0YXRzO1xuICBwdWJsaWMgc3VwcHJlc3Npb25zO1xuICBwdWJsaWMgbWVzc2FnZXM7XG4gIHB1YmxpYyByb3V0ZXM7XG4gIHB1YmxpYyB2YWxpZGF0ZTtcbiAgcHVibGljIGlwcztcbiAgcHVibGljIGlwX3Bvb2xzO1xuICBwdWJsaWMgbGlzdHM7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogT3B0aW9ucywgZm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICBjb25zdCBjb25maWc6IFJlcXVlc3RPcHRpb25zID0geyAuLi5vcHRpb25zIH0gYXMgUmVxdWVzdE9wdGlvbnM7XG5cbiAgICBpZiAoIWNvbmZpZy51cmwpIHtcbiAgICAgIGNvbmZpZy51cmwgPSAnaHR0cHM6Ly9hcGkubWFpbGd1bi5uZXQnO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLnVzZXJuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcInVzZXJuYW1lXCIgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5rZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwia2V5XCIgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgdGhpcy5yZXF1ZXN0ID0gbmV3IFJlcXVlc3QoY29uZmlnLCBmb3JtRGF0YSk7XG4gICAgY29uc3QgbWFpbExpc3RzTWVtYmVycyA9IG5ldyBNYWlsTGlzdHNNZW1iZXJzKHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQgPSBuZXcgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5UZW1wbGF0ZXNDbGllbnQgPSBuZXcgRG9tYWluVGVtcGxhdGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluVGFnc0NsaWVudCA9IG5ldyBEb21haW5UYWdzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50ID0gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuXG4gICAgdGhpcy5kb21haW5zID0gbmV3IERvbWFpbkNsaWVudChcbiAgICAgIHRoaXMucmVxdWVzdCxcbiAgICAgIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LFxuICAgICAgZG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICAgICAgZG9tYWluVGFnc0NsaWVudFxuICAgICk7XG4gICAgdGhpcy53ZWJob29rcyA9IG5ldyBXZWJob29rQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5zdXBwcmVzc2lvbnMgPSBuZXcgU3VwcHJlc3Npb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLm1lc3NhZ2VzID0gbmV3IE1lc3NhZ2VzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5yb3V0ZXMgPSBuZXcgUm91dGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pcHMgPSBuZXcgSXBzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pcF9wb29scyA9IG5ldyBJcFBvb2xzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5saXN0cyA9IG5ldyBMaXN0c0NsaWVudCh0aGlzLnJlcXVlc3QsIG1haWxMaXN0c01lbWJlcnMpO1xuICAgIHRoaXMudmFsaWRhdGUgPSBuZXcgVmFsaWRhdGVDbGllbnQodGhpcy5yZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBQYWdlc0xpc3QsXG4gIFBhZ2VzTGlzdEFjY3VtdWxhdG9yLFxuICBQYXJzZWRQYWdlLFxuICBQYXJzZWRQYWdlc0xpc3QsXG4gIFJlc3BvbnNlV2l0aFBhZ2luZ1xufSBmcm9tICcuLi9pbnRlcmZhY2VzL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBOYXZpZ2F0aW9uVGhydVBhZ2VzIDxUPiB7XG4gIHByb3RlY3RlZCBwYXJzZVBhZ2UoaWQ6IHN0cmluZywgcGFnZVVybDogc3RyaW5nLCB1cmxTZXBhcmF0b3IgPSAnPycsIGl0ZXJhdG9yTmFtZSA9ICdhZGRyZXNzJyk6IFBhcnNlZFBhZ2Uge1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwocGFnZVVybCk7XG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IHBhcnNlZFVybDtcbiAgICBjb25zdCBwYWdlVmFsdWUgPSBwYWdlVXJsICYmIHR5cGVvZiBwYWdlVXJsID09PSAnc3RyaW5nJyA/IHBhZ2VVcmwuc3BsaXQodXJsU2VwYXJhdG9yKS5wb3AoKSB8fCAnJyA6ICcnO1xuICAgIHJldHVybiB7XG4gICAgICBpZCxcbiAgICAgIHBhZ2U6IHVybFNlcGFyYXRvciA9PT0gJz8nID8gYD8ke3BhZ2VWYWx1ZX1gIDogcGFnZVZhbHVlLFxuICAgICAgaXRlcmF0b3JQb3NpdGlvbjogc2VhcmNoUGFyYW1zLmhhcyhpdGVyYXRvck5hbWUpID8gc2VhcmNoUGFyYW1zLmdldChpdGVyYXRvck5hbWUpIDogdW5kZWZpbmVkLFxuICAgICAgdXJsOiBwYWdlVXJsXG4gICAgfSBhcyBQYXJzZWRQYWdlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlUGFnZUxpbmtzKFxuICAgIHJlc3BvbnNlOiBSZXNwb25zZVdpdGhQYWdpbmcsXG4gICAgdXJsU2VwYXJhdG9yPzogc3RyaW5nLFxuICAgIGl0ZXJhdG9yTmFtZT86IHN0cmluZ1xuICApOiBQYXJzZWRQYWdlc0xpc3Qge1xuICAgIGNvbnN0IHBhZ2VzID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuYm9keS5wYWdpbmcgYXMgUGFnZXNMaXN0KTtcbiAgICByZXR1cm4gcGFnZXMucmVkdWNlKFxuICAgICAgKGFjYzogUGFnZXNMaXN0QWNjdW11bGF0b3IsIHBhaXI6IFtwYWdlVXJsOiBzdHJpbmcsIGlkOiBzdHJpbmddKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkID0gcGFpclswXTtcbiAgICAgICAgY29uc3QgcGFnZVVybCA9IHBhaXJbMV07XG4gICAgICAgIGFjY1tpZF0gPSB0aGlzLnBhcnNlUGFnZShpZCwgcGFnZVVybCwgdXJsU2VwYXJhdG9yLCBpdGVyYXRvck5hbWUpO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge31cbiAgICApIGFzIHVua25vd24gYXMgUGFyc2VkUGFnZXNMaXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHBhcnNlTGlzdChyZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nKTogVDtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHtcbiAgRG9tYWluUmVzcG9uc2VEYXRhLFxuICBEZXN0cm95ZWREb21haW5SZXNwb25zZSxcbiAgRG9tYWluc1F1ZXJ5LFxuICBEb21haW5JbmZvLFxuICBEb21haW5MaXN0UmVzcG9uc2VEYXRhLFxuICBEb21haW5TaG9ydERhdGEsXG4gIEROU1JlY29yZCxcbiAgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UsXG4gIENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcyxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlLFxuICBES0lNU2VsZWN0b3JJbmZvLFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFdlYlByZWZpeEluZm8sXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgUmVwbGFjZW1lbnRGb3JQb29sLFxuICBNZXNzYWdlUmVzcG9uc2UsXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5zJztcblxuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgRG9tYWluVHJhY2tpbmdSZXNwb25zZSxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIFVwZGF0ZWRPcGVuVHJhY2tpbmdcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRyYWNraW5nJztcbmltcG9ydCB7IElEb21haW5DcmVkZW50aWFscyB9IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5DcmVkZW50aWFscyc7XG5pbXBvcnQgeyBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRlbXBsYXRlcyc7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9kb21haW5zQ3JlZGVudGlhbHMnO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IHsgSURvbWFpblRhZ3NDbGllbnQgfSBmcm9tICcuL2ludGVyZmFjZXMvRG9tYWluVGFncyc7XG5pbXBvcnQgRG9tYWluVGFnc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUYWdzJztcblxuZXhwb3J0IGNsYXNzIERvbWFpbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xuICBzdGF0ZTogc3RyaW5nO1xuICB3aWxkY2FyZDogYm9vbGVhbjtcbiAgc3BhbV9hY3Rpb246IHN0cmluZztcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICBzbXRwX3Bhc3N3b3JkOiBzdHJpbmc7XG4gIHNtdHBfbG9naW46IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICByZWNlaXZpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgc2VuZGluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IERvbWFpblNob3J0RGF0YSwgcmVjZWl2aW5nPzogRE5TUmVjb3JkW10gfCBudWxsLCBzZW5kaW5nPzogRE5TUmVjb3JkW10gfCBudWxsKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMucmVxdWlyZV90bHMgPSBkYXRhLnJlcXVpcmVfdGxzO1xuICAgIHRoaXMuc2tpcF92ZXJpZmljYXRpb24gPSBkYXRhLnNraXBfdmVyaWZpY2F0aW9uO1xuICAgIHRoaXMuc3RhdGUgPSBkYXRhLnN0YXRlO1xuICAgIHRoaXMud2lsZGNhcmQgPSBkYXRhLndpbGRjYXJkO1xuICAgIHRoaXMuc3BhbV9hY3Rpb24gPSBkYXRhLnNwYW1fYWN0aW9uO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IGRhdGEuY3JlYXRlZF9hdDtcbiAgICB0aGlzLnNtdHBfcGFzc3dvcmQgPSBkYXRhLnNtdHBfcGFzc3dvcmQ7XG4gICAgdGhpcy5zbXRwX2xvZ2luID0gZGF0YS5zbXRwX2xvZ2luO1xuICAgIHRoaXMudHlwZSA9IGRhdGEudHlwZTtcblxuICAgIHRoaXMucmVjZWl2aW5nX2Ruc19yZWNvcmRzID0gcmVjZWl2aW5nIHx8IG51bGw7XG4gICAgdGhpcy5zZW5kaW5nX2Ruc19yZWNvcmRzID0gc2VuZGluZyB8fCBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHB1YmxpYyBkb21haW5DcmVkZW50aWFsczogSURvbWFpbkNyZWRlbnRpYWxzO1xuICBwdWJsaWMgZG9tYWluVGVtcGxhdGVzOiBJRG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuICBwdWJsaWMgZG9tYWluVGFnczogSURvbWFpblRhZ3NDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBkb21haW5DcmVkZW50aWFsc0NsaWVudDogRG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgZG9tYWluVGVtcGxhdGVzQ2xpZW50OiBEb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgZG9tYWluVGFnc0NsaWVudDogRG9tYWluVGFnc0NsaWVudFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuZG9tYWluQ3JlZGVudGlhbHMgPSBkb21haW5DcmVkZW50aWFsc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRlbXBsYXRlcyA9IGRvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRhZ3MgPSBkb21haW5UYWdzQ2xpZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlKHJlc3BvbnNlOiBEZXN0cm95ZWREb21haW5SZXNwb25zZSkgOiBNZXNzYWdlUmVzcG9uc2Uge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW5MaXN0KHJlc3BvbnNlOiBEb21haW5MaXN0UmVzcG9uc2VEYXRhKTogRG9tYWluW10ge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIG5ldyBEb21haW4oaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURvbWFpbihyZXNwb25zZTogRG9tYWluUmVzcG9uc2VEYXRhKTogRG9tYWluIHtcbiAgICByZXR1cm4gbmV3IERvbWFpbihcbiAgICAgIHJlc3BvbnNlLmJvZHkuZG9tYWluLFxuICAgICAgcmVzcG9uc2UuYm9keS5yZWNlaXZpbmdfZG5zX3JlY29yZHMsXG4gICAgICByZXNwb25zZS5ib2R5LnNlbmRpbmdfZG5zX3JlY29yZHNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1NldHRpbmdzKHJlc3BvbnNlOiBEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6IERvbWFpblRyYWNraW5nRGF0YSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkudHJhY2tpbmc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRyYWNraW5nVXBkYXRlKHJlc3BvbnNlOiBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6VXBkYXRlZE9wZW5UcmFja2luZyB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogRG9tYWluc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5bXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvZG9tYWlucycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkxpc3QocmVzIGFzIERvbWFpbkxpc3RSZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogRG9tYWluSW5mbykgOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIGNvbnN0IHBvc3RPYmogPSB7IC4uLmRhdGEgfTtcbiAgICBpZiAoJ2ZvcmNlX2RraW1fYXV0aG9yaXR5JyBpbiBwb3N0T2JqICYmIHR5cGVvZiBwb3N0T2JqLmZvcmNlX2RraW1fYXV0aG9yaXR5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHBvc3RPYmouZm9yY2VfZGtpbV9hdXRob3JpdHkgPSBwb3N0T2JqLnRvU3RyaW5nKCkgPT09ICd0cnVlJyA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvZG9tYWlucycsIHBvc3RPYmopXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIHZlcmlmeShkb21haW46IHN0cmluZyk6IFByb21pc2U8RG9tYWluPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS92ZXJpZnlgKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxNZXNzYWdlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YzL2RvbWFpbnMvJHtkb21haW59YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlKHJlcyBhcyBEZXN0cm95ZWREb21haW5SZXNwb25zZSkpO1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbihkb21haW46IHN0cmluZyk6IFByb21pc2U8Q29ubmVjdGlvblNldHRpbmdzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9jb25uZWN0aW9uYClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlczpDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSkgPT4gcmVzLmJvZHkuY29ubmVjdGlvbiBhcyBDb25uZWN0aW9uU2V0dGluZ3MpO1xuICB9XG5cbiAgdXBkYXRlQ29ubmVjdGlvbihkb21haW46IHN0cmluZywgZGF0YTogQ29ubmVjdGlvblNldHRpbmdzKTogUHJvbWlzZTxVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9jb25uZWN0aW9uYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMpXG4gICAgICAudGhlbigocmVzOlVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MpO1xuICB9XG5cbiAgLy8gVHJhY2tpbmdcblxuICBnZXRUcmFja2luZyhkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpblRyYWNraW5nRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyk7XG4gIH1cblxuICB1cGRhdGVUcmFja2luZyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogT3BlblRyYWNraW5nSW5mbyB8IENsaWNrVHJhY2tpbmdJbmZvIHwgVW5zdWJzY3JpYmVUcmFja2luZ0luZm9cbiAgKTogUHJvbWlzZTxVcGRhdGVkT3BlblRyYWNraW5nPiB7XG4gICAgaWYgKHR5cGVvZiBkYXRhPy5hY3RpdmUgPT09ICdib29sZWFuJykge1xuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHsgc3RhdHVzOiA0MDAsIHN0YXR1c1RleHQ6ICdSZWNlaXZlZCBib29sZWFuIHZhbHVlIGZvciBhY3RpdmUgcHJvcGVydHknLCBib2R5OiB7IG1lc3NhZ2U6ICdQcm9wZXJ0eSBcImFjdGl2ZVwiIG11c3QgY29udGFpbiBzdHJpbmcgdmFsdWUuJyB9IH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycsIHR5cGUpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZVRyYWNraW5nVXBkYXRlKHJlcyBhcyBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSk7XG4gIH1cblxuICAvLyBJUHNcblxuICBnZXRJcHMoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogQVBJUmVzcG9uc2UpID0+IHJlc3BvbnNlPy5ib2R5Py5pdGVtcyk7XG4gIH1cblxuICBhc3NpZ25JcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBpcCB9KTtcbiAgfVxuXG4gIGRlbGV0ZUlwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJywgaXApKTtcbiAgfVxuXG4gIGxpbmtJcFBvb2woZG9tYWluOiBzdHJpbmcsIHBvb2xfaWQ6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBwb29sX2lkIH0pO1xuICB9XG5cbiAgdW5saW5rSXBQb2xsKGRvbWFpbjogc3RyaW5nLCByZXBsYWNlbWVudDogUmVwbGFjZW1lbnRGb3JQb29sKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGxldCBzZWFyY2hQYXJhbXMgPSAnJztcbiAgICBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCAmJiByZXBsYWNlbWVudC5pcCkge1xuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgc3RhdHVzVGV4dDogJ1RvbyBtdWNoIGRhdGEgZm9yIHJlcGxhY2VtZW50JyxcbiAgICAgICAgICBib2R5OiB7IG1lc3NhZ2U6ICdQbGVhc2Ugc3BlY2lmeSBlaXRoZXIgcG9vbF9pZCBvciBpcCAobm90IGJvdGgpJyB9XG4gICAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gYD9wb29sX2lkPSR7cmVwbGFjZW1lbnQucG9vbF9pZH1gO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/aXA9JHtyZXBsYWNlbWVudC5pcH1gO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsICdpcF9wb29sJywgc2VhcmNoUGFyYW1zKSk7XG4gIH1cblxuICB1cGRhdGVES0lNQXV0aG9yaXR5KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNQXV0aG9yaXR5SW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1BdXRob3JpdHk+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2RraW1fYXV0aG9yaXR5YCwge30sIHsgcXVlcnk6IGBzZWxmPSR7ZGF0YS5zZWxmfWAgfSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpXG4gICAgICAudGhlbigocmVzIDogVXBkYXRlZERLSU1BdXRob3JpdHlSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgVXBkYXRlZERLSU1BdXRob3JpdHkpO1xuICB9XG5cbiAgdXBkYXRlREtJTVNlbGVjdG9yKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNU2VsZWN0b3JJbmZvKTogUHJvbWlzZTxVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2RraW1fc2VsZWN0b3JgLCB7fSwgeyBxdWVyeTogYGRraW1fc2VsZWN0b3I9JHtkYXRhLmRraW1TZWxlY3Rvcn1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UpO1xuICB9XG5cbiAgdXBkYXRlV2ViUHJlZml4KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBXZWJQcmVmaXhJbmZvKTogUHJvbWlzZTxVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L3dlYl9wcmVmaXhgLCB7fSwgeyBxdWVyeTogYHdlYl9wcmVmaXg9JHtkYXRhLndlYlByZWZpeH1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJUmVzcG9uc2UgZnJvbSAnLi9pbnRlcmZhY2VzL0FwaVJlc3BvbnNlJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSxcbiAgRGVsZXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UsXG4gIERvbWFpbkNyZWRlbnRpYWxzLFxuICBEb21haW5DcmVkZW50aWFsc0xpc3QsXG4gIERvbWFpbkNyZWRlbnRpYWxzUXVlcnksXG4gIERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhLFxuICBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCxcbiAgSURvbWFpbkNyZWRlbnRpYWxzLFxuICBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpbkNyZWRlbnRpYWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgaW1wbGVtZW50cyBJRG9tYWluQ3JlZGVudGlhbHMge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvZG9tYWlucy8nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QoXG4gICAgcmVzcG9uc2U6IERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhXG4gICk6IERvbWFpbkNyZWRlbnRpYWxzTGlzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLFxuICAgICAgdG90YWxDb3VudDogcmVzcG9uc2UuYm9keS50b3RhbF9jb3VudFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZU1lc3NhZ2VSZXNwb25zZShcbiAgICByZXNwb25zZTogQ3JlYXRlZFVwZGF0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlXG4gICk6IERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgIH0gYXMgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRGVsZXRlZFJlc3BvbnNlKFxuICAgIHJlc3BvbnNlOkRlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlXG4gICk6IERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgIHNwZWM6IHJlc3BvbnNlLmJvZHkuc3BlY1xuICAgIH0gYXMgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5DcmVkZW50aWFsc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvY3JlZGVudGlhbHMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KHJlcyBhcyBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSlcbiAgICAgICk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluQ3JlZGVudGlhbHNcbiAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHNgLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgdXBkYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZyxcbiAgICBkYXRhOiBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbiAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFscy8ke2NyZWRlbnRpYWxzTG9naW59YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWApXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEZWxldGVkUmVzcG9uc2UocmVzKSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0sXG4gIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdEZXZpY2VzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdQcm92aWRlcnNBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnc0l0ZW0sXG4gIERvbWFpblRhZ3NJdGVtSW5mbyxcbiAgRG9tYWluVGFnc0xpc3QsXG4gIERvbWFpblRhZ3NNZXNzYWdlUmVzLFxuICBEb21haW5UYWdzUXVlcnksXG4gIERvbWFpblRhZ3NSZXNwb25zZURhdGEsXG4gIERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSxcbiAgRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlLFxuICBEb21haW5UYWdTdGF0aXN0aWNJdGVtLFxuICBEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQsXG4gIElEb21haW5UYWdzQ2xpZW50LFxuICBSZXNvbHV0aW9uXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5UYWdzJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluVGFnIGltcGxlbWVudHMgRG9tYWluVGFnc0l0ZW0ge1xuICB0YWc6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgJ2ZpcnN0LXNlZW4nOiBEYXRlO1xuICAnbGFzdC1zZWVuJzogRGF0ZTtcblxuICBjb25zdHJ1Y3Rvcih0YWdJbmZvOiBEb21haW5UYWdzSXRlbUluZm8pIHtcbiAgICB0aGlzLnRhZyA9IHRhZ0luZm8udGFnO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YWdJbmZvLmRlc2NyaXB0aW9uO1xuICAgIHRoaXNbJ2ZpcnN0LXNlZW4nXSA9IG5ldyBEYXRlKHRhZ0luZm9bJ2ZpcnN0LXNlZW4nXSk7XG4gICAgdGhpc1snbGFzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydsYXN0LXNlZW4nXSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZ1N0YXRpc3RpYyBpbXBsZW1lbnRzIERvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdCB7XG4gIHRhZzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBzdGFydDogRGF0ZTtcbiAgZW5kOiBEYXRlO1xuICByZXNvbHV0aW9uOiBSZXNvbHV0aW9uO1xuICBzdGF0czogRG9tYWluVGFnU3RhdGlzdGljSXRlbVtdO1xuXG4gIGNvbnN0cnVjdG9yKHRhZ1N0YXRpc3RpY0luZm86IERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSkge1xuICAgIHRoaXMudGFnID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnRhZztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSh0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhcnQpO1xuICAgIHRoaXMuZW5kID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LmVuZCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnJlc29sdXRpb247XG4gICAgdGhpcy5zdGF0cyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQ6IERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtKSB7XG4gICAgICBjb25zdCByZXMgPSB7IC4uLnN0YXQsIHRpbWU6IG5ldyBEYXRlKHN0YXQudGltZSkgfTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluVGFnc0NsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8RG9tYWluVGFnc0xpc3Q+XG4gIGltcGxlbWVudHMgSURvbWFpblRhZ3NDbGllbnQge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSxcbiAgKTogRG9tYWluVGFnc0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBEb21haW5UYWdzTGlzdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoKHRhZ0luZm86IERvbWFpblRhZ3NJdGVtSW5mbykgPT4gbmV3IERvbWFpblRhZyh0YWdJbmZvKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAndGFnJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRhZ1N0YXRpc3RpYyhcbiAgICByZXNwb25zZTogRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlXG4gICk6IERvbWFpblRhZ1N0YXRpc3RpYyB7XG4gICAgcmV0dXJuIG5ldyBEb21haW5UYWdTdGF0aXN0aWMocmVzcG9uc2UpO1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5UYWdzUXVlcnkpOiBQcm9taXNlPERvbWFpblRhZ3NMaXN0PiB7XG4gICAgbGV0IHVybDtcbiAgICBjb25zdCBxdWVyeUNvcHkgPSB7IC4uLnF1ZXJ5IH07XG4gICAgaWYgKHF1ZXJ5Q29weSAmJiBxdWVyeUNvcHkucGFnZSkge1xuICAgICAgdXJsID0gdXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCBxdWVyeUNvcHkucGFnZSk7XG4gICAgICBkZWxldGUgcXVlcnlDb3B5LnBhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybCwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VMaXN0KHJlcyBhcyBEb21haW5UYWdzUmVzcG9uc2VEYXRhKVxuICAgICAgKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGFnKHJlcy5ib2R5KVxuICAgICAgKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpLCBkZXNjcmlwdGlvbilcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnc01lc3NhZ2VSZXNcbiAgICAgICk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nXG4gICk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vdGFncy8ke3RhZ31gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IChcbiAgICAgICAge1xuICAgICAgICAgIG1lc3NhZ2U6IHJlcy5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgc3RhdHVzOiByZXMuc3RhdHVzXG4gICAgICAgIH0gYXMgRG9tYWluVGFnc01lc3NhZ2VSZXMpKTtcbiAgfVxuXG4gIHN0YXRpc3RpYyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcsIHF1ZXJ5OiBEb21haW5UYWdzU3RhdGlzdGljUXVlcnkpXG4gICAgOiBQcm9taXNlPERvbWFpblRhZ1N0YXRpc3RpYz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlVGFnU3RhdGlzdGljKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBjb3VudHJpZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9jb3VudHJpZXMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cblxuICBwcm92aWRlcnMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9wcm92aWRlcnMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdQcm92aWRlcnNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cblxuICBkZXZpY2VzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL2RldmljZXMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdEZXZpY2VzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvblxuICAgICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSxcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBEb21haW5UZW1wbGF0ZSwgRG9tYWluVGVtcGxhdGVEYXRhLFxuICBEb21haW5UZW1wbGF0ZXNRdWVyeSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhLFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhLFxuICBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhLFxuICBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBJRG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0LFxuICBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBOb3RpZmljYXRpb25BUElSZXNwb25zZSxcbiAgTm90aWZpY2F0aW9uUmVzdWx0LFxuICBTaG9ydFRlbXBsYXRlVmVyc2lvbixcbiAgVGVtcGxhdGVRdWVyeSxcbiAgVGVtcGxhdGVWZXJzaW9uLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UsXG4gIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHRcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRlbXBsYXRlcyc7XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UZW1wbGF0ZUl0ZW0gaW1wbGVtZW50cyBEb21haW5UZW1wbGF0ZSB7XG4gIG5hbWUgOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uIDogc3RyaW5nO1xuICBjcmVhdGVkQXQgOiBEYXRlIHwgJyc7XG4gIGNyZWF0ZWRCeSA6IHN0cmluZztcbiAgaWQgOiBzdHJpbmc7XG4gIHZlcnNpb24/OiBUZW1wbGF0ZVZlcnNpb247XG4gIHZlcnNpb25zPzogU2hvcnRUZW1wbGF0ZVZlcnNpb25bXTtcblxuICBjb25zdHJ1Y3Rvcihkb21haW5UZW1wbGF0ZUZyb21BUEk6IERvbWFpblRlbXBsYXRlKSB7XG4gICAgdGhpcy5uYW1lID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLm5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQgPyBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0KSA6ICcnO1xuICAgIHRoaXMuY3JlYXRlZEJ5ID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRCeTtcbiAgICB0aGlzLmlkID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmlkO1xuXG4gICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uKSB7XG4gICAgICB0aGlzLnZlcnNpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbjtcbiAgICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpIHtcbiAgICAgICAgdGhpcy52ZXJzaW9uLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucyAmJiBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnZlcnNpb25zID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLm1hcCgodmVyc2lvbikgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7IC4uLnZlcnNpb24gfTtcbiAgICAgICAgcmVzdWx0LmNyZWF0ZWRBdCA9IG5ldyBEYXRlKHZlcnNpb24uY3JlYXRlZEF0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5UZW1wbGF0ZXNDbGllbnQgaW1wbGVtZW50cyBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzLyc7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQ3JlYXRpb25SZXNwb25zZShkYXRhOiBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKTogRG9tYWluVGVtcGxhdGVJdGVtIHtcbiAgICByZXR1cm4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkYXRhLmJvZHkudGVtcGxhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKFxuICAgIGRhdGE6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlXG4gICk6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7fSBhcyBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VNdXRhdGlvblJlc3BvbnNlKFxuICAgIGRhdGE6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZVxuICApOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQgPSB7fSBhcyBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkgJiYgZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGVOYW1lID0gZGF0YS5ib2R5LnRlbXBsYXRlLm5hbWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UoZGF0YTogTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UpOiBOb3RpZmljYXRpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogTm90aWZpY2F0aW9uUmVzdWx0ID0ge30gYXMgTm90aWZpY2F0aW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UoXG4gICAgZGF0YTogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2VcbiAgKTogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHt9IGFzIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGVOYW1lID0gZGF0YS5ib2R5LnRlbXBsYXRlLm5hbWU7XG4gICAgICByZXN1bHQudGVtcGxhdGVWZXJzaW9uID0geyB0YWc6IGRhdGEuYm9keS50ZW1wbGF0ZS52ZXJzaW9uLnRhZyB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUxpc3QocmVzcG9uc2U6IExpc3REb21haW5UZW1wbGF0ZXNBUElSZXNwb25zZSk6IExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0O1xuXG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKChkOiBEb21haW5UZW1wbGF0ZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gcmVzcG9uc2UuYm9keS5wYWdpbmc7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhcbiAgICByZXNwb25zZTogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZVxuICApOiBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0O1xuXG4gICAgZGF0YS50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzcG9uc2UuYm9keS50ZW1wbGF0ZSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gcmVzcG9uc2UuYm9keS5wYWdpbmc7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTGlzdChyZXMpXG4gICAgICApO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgcXVlcnk/OiBUZW1wbGF0ZVF1ZXJ5KTogUHJvbWlzZTxEb21haW5UZW1wbGF0ZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlRGF0YVxuICApOiBQcm9taXNlPERvbWFpblRlbXBsYXRlSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlQ3JlYXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGFcbiAgKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpKVxuICAgICAgLnRoZW4oKHJlczogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3lBbGwoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE5vdGlmaWNhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSlcbiAgICAgIC50aGVuKChyZXM6IE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBjcmVhdGVWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGFcbiAgKTogUHJvbWlzZTxDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBnZXRWZXJzaW9uKGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRlbXBsYXRlSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXMuYm9keS50ZW1wbGF0ZSlcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGVWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGFcbiAgKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpLCBkYXRhKVxuICAgICAgLnRoZW4oXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgIChyZXM6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3lWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSlcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAudGhlbigocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgbGlzdFZlcnNpb25zKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnlcbiAgKTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zKHJlcylcbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBBUElFcnJvck9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL0FQSUVycm9yT3B0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBzdGF0dXM6IG51bWJlciB8IHN0cmluZztcbiAgc3RhY2s6IHN0cmluZztcbiAgZGV0YWlsczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBzdGF0dXMsXG4gICAgc3RhdHVzVGV4dCxcbiAgICBtZXNzYWdlLFxuICAgIGJvZHkgPSB7fVxuICB9OiBBUElFcnJvck9wdGlvbnMpIHtcbiAgICBsZXQgYm9keU1lc3NhZ2UgPSAnJztcbiAgICBsZXQgZXJyb3IgPSAnJztcbiAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBib2R5TWVzc2FnZSA9IGJvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHlNZXNzYWdlID0gYm9keT8ubWVzc2FnZTtcbiAgICAgIGVycm9yID0gYm9keT8uZXJyb3I7XG4gICAgfVxuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBlcnJvciB8fCBzdGF0dXNUZXh0O1xuICAgIHRoaXMuZGV0YWlscyA9IGJvZHlNZXNzYWdlO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQge1xuICBFdmVudHNMaXN0LFxuICBFdmVudHNQYWdlLFxuICBFdmVudHNRdWVyeSxcbiAgRXZlbnRzUmVzcG9uc2UsXG4gIFBhZ2VzTGlzdCxcbiAgUGFnZXNMaXN0QWNjdW11bGF0b3IsXG4gIFBhcnNlZFBhZ2VzTGlzdFxufSBmcm9tICcuL2ludGVyZmFjZXMvRXZlbnRzJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgX3BhcnNlUGFnZU51bWJlcih1cmw6IHN0cmluZykgOiBzdHJpbmcge1xuICAgIHJldHVybiB1cmwuc3BsaXQoJy8nKS5wb3AoKSB8fCAnJztcbiAgfVxuXG4gIF9wYXJzZVBhZ2UoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpIDogRXZlbnRzUGFnZSB7XG4gICAgcmV0dXJuIHsgaWQsIG51bWJlcjogdGhpcy5fcGFyc2VQYWdlTnVtYmVyKHVybCksIHVybCB9O1xuICB9XG5cbiAgX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlOiBFdmVudHNSZXNwb25zZSkgOiBQYXJzZWRQYWdlc0xpc3Qge1xuICAgIGNvbnN0IHBhZ2VzID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuYm9keS5wYWdpbmcgYXMgUGFnZXNMaXN0KTtcbiAgICByZXR1cm4gcGFnZXMucmVkdWNlKFxuICAgICAgKGFjYzogUGFnZXNMaXN0QWNjdW11bGF0b3IsIHBhaXI6IFt1cmw6IHN0cmluZywgaWQ6IHN0cmluZ10pID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBwYWlyWzBdO1xuICAgICAgICBjb25zdCB1cmwgPSBwYWlyWzFdO1xuICAgICAgICBhY2NbaWRdID0gdGhpcy5fcGFyc2VQYWdlKGlkLCB1cmwpO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge31cbiAgICApIGFzIHVua25vd24gYXMgUGFyc2VkUGFnZXNMaXN0O1xuICB9XG5cbiAgX3BhcnNlRXZlbnRMaXN0KHJlc3BvbnNlOiBFdmVudHNSZXNwb25zZSkgOiBFdmVudHNMaXN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IHJlc3BvbnNlLmJvZHkuaXRlbXMsXG4gICAgICBwYWdlczogdGhpcy5fcGFyc2VQYWdlTGlua3MocmVzcG9uc2UpXG4gICAgfTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgcXVlcnk/OiBFdmVudHNRdWVyeSkgOiBQcm9taXNlPEV2ZW50c0xpc3Q+IHtcbiAgICBsZXQgdXJsO1xuICAgIGNvbnN0IHF1ZXJ5Q29weSA9IHsgLi4ucXVlcnkgfTtcbiAgICBpZiAocXVlcnlDb3B5ICYmIHF1ZXJ5Q29weS5wYWdlKSB7XG4gICAgICB1cmwgPSB1cmxqb2luKCcvdjMnLCBkb21haW4sICdldmVudHMnLCBxdWVyeUNvcHkucGFnZSk7XG4gICAgICBkZWxldGUgcXVlcnlDb3B5LnBhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ2V2ZW50cycpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmwsIHF1ZXJ5Q29weSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogRXZlbnRzUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRXZlbnRMaXN0KHJlc3BvbnNlKSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IHsgSW5wdXRGb3JtRGF0YSB9IGZyb20gJy4vaW50ZXJmYWNlcy9JRm9ybURhdGEnO1xuXG5jbGFzcyBGb3JtRGF0YUJ1aWxkZXIge1xuICBwcml2YXRlIEZvcm1EYXRhQ29uc3RydWN0b3I6IElucHV0Rm9ybURhdGE7XG4gIGNvbnN0cnVjdG9yKEZvcm1EYXRhQ29uc3RydWN0b3I6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IgPSBGb3JtRGF0YUNvbnN0cnVjdG9yO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUZvcm1EYXRhKGRhdGE6IGFueSk6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgZGF0YSBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgZm9ybURhdGE6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZGF0YVtrZXldOyB9KVxuICAgICAgLnJlZHVjZSgoZm9ybURhdGFBY2M6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZUtleXMgPSBbJ2F0dGFjaG1lbnQnLCAnaW5saW5lJywgJ211bHRpcGxlVmFsaWRhdGlvbkZpbGUnXTtcbiAgICAgICAgaWYgKGZpbGVLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICB0aGlzLmFkZEZpbGVzVG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkgPT09ICdtZXNzYWdlJykgeyAvLyBtaW1lIG1lc3NhZ2VcbiAgICAgICAgICB0aGlzLmFkZE1pbWVEYXRhVG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uUHJvcGVydHlUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgIH0sIG5ldyB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IoKSk7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBpc05vZGVGb3JtRGF0YShmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSlcbiAgOiBmb3JtRGF0YUluc3RhbmNlIGlzIE5vZGVGb3JtRGF0YSB7XG4gICAgcmV0dXJuICg8Tm9kZUZvcm1EYXRhPmZvcm1EYXRhSW5zdGFuY2UpLmdldEhlYWRlcnMgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXR0YWNobWVudE9wdGlvbnMoaXRlbToge1xuICAgIGZpbGVuYW1lPzogc3RyaW5nO1xuICAgIGNvbnRlbnRUeXBlPyA6IHN0cmluZztcbiAgICBrbm93bkxlbmd0aD86IG51bWJlcjtcbiAgfSk6IHtcbiAgICBmaWxlbmFtZT86IHN0cmluZyxcbiAgICBjb250ZW50VHlwZT86IHN0cmluZyxcbiAgICBrbm93bkxlbmd0aD86IG51bWJlclxuICB9IHtcbiAgICBpZiAodHlwZW9mIGl0ZW0gIT09ICdvYmplY3QnIHx8IHRoaXMuaXNTdHJlYW0oaXRlbSkpIHJldHVybiB7fTtcbiAgICBjb25zdCB7XG4gICAgICBmaWxlbmFtZSxcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAga25vd25MZW5ndGhcbiAgICB9ID0gaXRlbTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uKGZpbGVuYW1lID8geyBmaWxlbmFtZSB9IDogeyBmaWxlbmFtZTogJ2ZpbGUnIH0pLFxuICAgICAgLi4uKGNvbnRlbnRUeXBlICYmIHsgY29udGVudFR5cGUgfSksXG4gICAgICAuLi4oa25vd25MZW5ndGggJiYgeyBrbm93bkxlbmd0aCB9KVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFkZE1pbWVEYXRhVG9GRChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBkYXRhOiBCdWZmZXIgfCBCbG9iIHwgc3RyaW5nLFxuICAgIGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoZGF0YSkgfHwgdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBub2RlRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlIGFzIE5vZGVGb3JtRGF0YTtcbiAgICAgIGNvbnN0IHByZXBhcmVkRGF0YSA9IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/IEJ1ZmZlci5mcm9tKGRhdGEpIDogZGF0YTtcbiAgICAgIG5vZGVGb3JtRGF0YS5hcHBlbmQoa2V5LCBwcmVwYXJlZERhdGEsIHsgZmlsZW5hbWU6ICdNaW1lTWVzc2FnZScgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGJyb3dzZXJGb3JtRGF0YSA9IGZvcm1EYXRhSW5zdGFuY2UgYXMgRm9ybURhdGE7XG4gICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YSwgJ01pbWVNZXNzYWdlJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRGaWxlc1RvRkQoXG4gICAgcHJvcGVydHlOYW1lOiBzdHJpbmcsXG4gICAgdmFsdWU6IGFueSxcbiAgICBmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhcHBlbmRGaWxlVG9GRCA9IChcbiAgICAgIG9yaWdpbmFsS2V5OiBzdHJpbmcsXG4gICAgICBvYmo6IGFueSxcbiAgICAgIGZvcm1EYXRhOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICAgICk6IHZvaWQgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gb3JpZ2luYWxLZXkgPT09ICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJyA/ICdmaWxlJyA6IG9yaWdpbmFsS2V5O1xuICAgICAgY29uc3QgaXNTdHJlYW1EYXRhID0gdGhpcy5pc1N0cmVhbShvYmopO1xuICAgICAgY29uc3Qgb2JqRGF0YSA9IGlzU3RyZWFtRGF0YSA/IG9iaiA6IG9iai5kYXRhO1xuICAgICAgLy8gZ2V0QXR0YWNobWVudE9wdGlvbnMgc2hvdWxkIGJlIGNhbGxlZCB3aXRoIG9iaiBwYXJhbWV0ZXIgdG8gcHJldmVudCBsb29zaW5nIGZpbGVuYW1lXG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyhvYmopO1xuICAgICAgaWYgKHRoaXMuaXNOb2RlRm9ybURhdGEoZm9ybURhdGEpKSB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIG9iakRhdGEsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBvYmpEYXRhLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICB9O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgaXRlbSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCB2YWx1ZSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1N0cmVhbShkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmIHR5cGVvZiBkYXRhLnBpcGUgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICBwcml2YXRlIGFkZENvbW1vblByb3BlcnR5VG9GRChcbiAgICBrZXk6IHN0cmluZyxcbiAgICB2YWx1ZTogYW55LFxuICAgIGZvcm1EYXRhQWNjOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW06IGFueSkge1xuICAgICAgICBmb3JtRGF0YUFjYy5hcHBlbmQoa2V5LCBpdGVtKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgZm9ybURhdGFBY2MuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybURhdGFCdWlsZGVyO1xuIiwiaW1wb3J0IENsaWVudCBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lGb3JtRGF0YSc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvT3B0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW4ge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHQoKTogdHlwZW9mIE1haWxndW4geyByZXR1cm4gdGhpczsgfVxuICBwcml2YXRlIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhXG5cbiAgY29uc3RydWN0b3IoRm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLmZvcm1EYXRhID0gRm9ybURhdGE7XG4gIH1cblxuICBjbGllbnQob3B0aW9uczogT3B0aW9ucykgOiBDbGllbnQge1xuICAgIHJldHVybiBuZXcgQ2xpZW50KG9wdGlvbnMsIHRoaXMuZm9ybURhdGEpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBCb3VuY2UsIENvbXBsYWludCwgVW5zdWJzY3JpYmUsIFdoaXRlTGlzdFxufSBmcm9tICcuLi9zdXBwcmVzc2lvbnMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQm91bmNlRGF0YSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY29kZTogbnVtYmVyO1xuICBlcnJvcjogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsYWludERhdGEge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVW5zdWJzY3JpYmVEYXRhIHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICB0YWdzOiBhbnk7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2hpdGVMaXN0RGF0YSB7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXJzZWRQYWdlIHtcbiAgaWQ6IHN0cmluZztcbiAgcGFnZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgYWRkcmVzczogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgdXJsOiBzdHJpbmdcbn1cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2VkUGFnZXNMaXN0IHtcbiAgcHJldmlvdXM6IFBhcnNlZFBhZ2U7XG4gIGZpcnN0OiBQYXJzZWRQYWdlO1xuICBsYXN0OiBQYXJzZWRQYWdlO1xuICBuZXh0OiBQYXJzZWRQYWdlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1cHByZXNzaW9uTGlzdCB7XG4gIGl0ZW1zOiAoQm91bmNlIHwgQ29tcGxhaW50IHwgVW5zdWJzY3JpYmUgfCBXaGl0ZUxpc3QpW107XG4gIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZXNMaXN0IHtcbiAgcHJldmlvdXM6IHN0cmluZztcbiAgZmlyc3Q6IHN0cmluZztcbiAgbGFzdDogc3RyaW5nO1xuICBuZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIFN1cHByZXNzaW9uTW9kZWxzIHtcbiAgQk9VTkNFUyA9ICdib3VuY2VzJyxcbiAgQ09NUExBSU5UUyA9ICdjb21wbGFpbnRzJyxcbiAgVU5TVUJTQ1JJQkVTID0gJ3Vuc3Vic2NyaWJlcycsXG4gIFdISVRFTElTVFMgPSAnd2hpdGVsaXN0cydcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlc0xpc3RBY2N1bXVsYXRvciB7XG4gIFtpbmRleDogc3RyaW5nXTogUGFyc2VkUGFnZTtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25MaXN0UXVlcnkgPSB7XG4gIGxpbWl0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlIHtcbiAgYm9keToge1xuICAgIGl0ZW1zOiBCb3VuY2VEYXRhW10gfCBDb21wbGFpbnREYXRhW10gfCBVbnN1YnNjcmliZURhdGFbXSB8IFdoaXRlTGlzdERhdGFbXTtcbiAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvblJlc3BvbnNlIHtcbiAgYm9keTogQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZSB7XG4gIGJvZHk6IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdmFsdWU/OiBzdHJpbmc7XG4gICAgYWRkcmVzcz86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvZGU/OiBudW1iZXI7XG4gIGVycm9yPzogc3RyaW5nO1xuICBkb21haW4/OiBzdHJpbmc7XG4gIHRhZz86IHN0cmluZztcbiAgY3JlYXRlZF9hdD86IHN0cmluZyA7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlIHtcbiAgYm9keTp7XG4gICAgbWVzc2FnZTpzdHJpbmc7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0IHtcbiAgbWVzc2FnZTpzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIElwUG9vbENyZWF0ZURhdGEsXG4gIElwUG9vbENyZWF0ZVJlc3BvbnNlLFxuICBJcFBvb2xDcmVhdGVSZXN1bHQsXG4gIElwUG9vbERlbGV0ZURhdGEsXG4gIElwUG9vbExpc3RSZXNwb25zZSxcbiAgSXBQb29sTGlzdFJlc3VsdCxcbiAgSXBQb29sTWVzc2FnZVJlc3BvbnNlLFxuICBJcFBvb2xNZXNzYWdlUmVzdWx0LFxuICBJcFBvb2xVcGRhdGVEYXRhLFxufSBmcm9tICcuL2ludGVyZmFjZXMvSXBQb29scyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElwUG9vbHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdCgpOiBQcm9taXNlPElwUG9vbExpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YxL2lwX3Bvb2xzJylcbiAgICAgIC50aGVuKChyZXNwb25zZTogSXBQb29sTGlzdFJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlSXBQb29sc1Jlc3BvbnNlKHJlc3BvbnNlKSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoZGF0YTogSXBQb29sQ3JlYXRlRGF0YSk6IFByb21pc2U8SXBQb29sQ3JlYXRlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IElwUG9vbENyZWF0ZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92MS9pcF9wb29scycsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xVcGRhdGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IElwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wYXRjaFdpdGhGRChgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xEZWxldGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6SXBQb29sTWVzc2FnZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZTogSXBQb29sTGlzdFJlc3BvbnNlKTogSXBQb29sTGlzdFJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCBNZ1JlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7IElwRGF0YSwgSXBzTGlzdFJlc3BvbnNlQm9keSB9IGZyb20gJy4vaW50ZXJmYWNlcy9JcHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcHNDbGllbnQge1xuICByZXF1ZXN0OiBNZ1JlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogTWdSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk6IGFueSk6IFByb21pc2U8SXBzTGlzdFJlc3BvbnNlQm9keT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2lwcycsIHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlPElwc0xpc3RSZXNwb25zZUJvZHk+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGdldChpcDogc3RyaW5nKTogUHJvbWlzZTxJcERhdGE+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92My9pcHMvJHtpcH1gKTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlPElwRGF0YT4ocmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUlwc1Jlc3BvbnNlPFQ+KHJlc3BvbnNlOiB7IGJvZHk6IFQgfSk6IFQge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG59XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgTGlzdHNRdWVyeSxcbiAgQ3JlYXRlVXBkYXRlTGlzdCxcbiAgRGVzdHJveWVkTGlzdCxcbiAgTWFpbGluZ0xpc3QsXG4gIFZhbGlkYXRpb25BcGlSZXNwb25zZSxcbiAgU3RhcnRWYWxpZGF0aW9uUmVzdWx0LFxuICBWYWxpZGF0aW9uUmVzdWx0LFxuICBDYW5jZWxWYWxpZGF0aW9uUmVzdWx0XG59IGZyb20gJy4vaW50ZXJmYWNlcy9saXN0cyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4vaW50ZXJmYWNlcy9tYWlsTGlzdE1lbWJlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0c0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBtZW1iZXJzOiBJTWFpbExpc3RzTWVtYmVycztcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBtZW1iZXJzOklNYWlsTGlzdHNNZW1iZXJzKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgIHRoaXMubWVtYmVycyA9IG1lbWJlcnM7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlVmFsaWRhdGlvblJlc3VsdChzdGF0dXM6IG51bWJlciwgZGF0YTogVmFsaWRhdGlvbkFwaVJlc3BvbnNlKTogVmFsaWRhdGlvblJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIHZhbGlkYXRpb25SZXN1bHQ6IHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0ICogMTAwMCkgLy8gYWRkIG1pbGxpc2Vjb25kIHRvIFVuaXggdGltZXN0YW1wXG4gICAgICB9XG4gICAgfSBhcyBWYWxpZGF0aW9uUmVzdWx0O1xuICB9XG5cbiAgbGlzdChxdWVyeT86IExpc3RzUXVlcnkpOiBQcm9taXNlPE1haWxpbmdMaXN0W10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vcGFnZXNgLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyBhcyBNYWlsaW5nTGlzdFtdKTtcbiAgfVxuXG4gIGdldChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh0aGlzLmJhc2VSb3V0ZSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIHVwZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGRlc3Ryb3kobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3llZExpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBEZXN0cm95ZWRMaXN0KTtcbiAgfVxuXG4gIHZhbGlkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxTdGFydFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWAsIHt9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgICAgfSkgYXMgU3RhcnRWYWxpZGF0aW9uUmVzdWx0KTtcbiAgfVxuXG4gIHZhbGlkYXRpb25SZXN1bHQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYClcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzcG9uc2UpID0+IHRoaXMucGFyc2VWYWxpZGF0aW9uUmVzdWx0KFxuICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgcmVzcG9uc2UuYm9keSBhcyBWYWxpZGF0aW9uQXBpUmVzcG9uc2VcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGNhbmNlbFZhbGlkYXRpb24obWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPENhbmNlbFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gKHtcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgICAgfSBhcyBDYW5jZWxWYWxpZGF0aW9uUmVzdWx0KSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQge1xuICBNYWlsTGlzdE1lbWJlcnNRdWVyeSxcbiAgSU1haWxMaXN0c01lbWJlcnMsXG4gIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyxcbiAgTWFpbExpc3RNZW1iZXIsXG4gIE11bHRpcGxlTWVtYmVyc0RhdGEsXG4gIE11bHRpcGxlTWVtYmVyc1JlcURhdGEsXG4gIERlbGV0ZWRNZW1iZXIsXG4gIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1JlcSxcbiAgTmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2UsXG4gIE1haWxMaXN0TWVtYmVyc1Jlc3VsdCxcbiAgTWFpbExpc3RNZW1iZXJzUmVzcG9uc2Vcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL21haWxMaXN0TWVtYmVycyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbExpc3RzTWVtYmVyc1xuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8TWFpbExpc3RNZW1iZXJzUmVzdWx0PlxuICBpbXBsZW1lbnRzIElNYWlsTGlzdHNNZW1iZXJzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0FuZFVwZGF0ZURhdGEoZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzKSB7XG4gICAgY29uc3QgbmV3RGF0YSA9IHsgLi4uZGF0YSB9O1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhLnZhcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBuZXdEYXRhLnZhcnMgPSBKU09OLnN0cmluZ2lmeShuZXdEYXRhLnZhcnMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YS5zdWJzY3JpYmVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIG5ld0RhdGEuc3Vic2NyaWJlZCA9IGRhdGEuc3Vic2NyaWJlZCA/ICd5ZXMnIDogJ25vJztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RGF0YSBhcyBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXE7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBNYWlsTGlzdE1lbWJlcnNSZXNwb25zZSxcbiAgKTogTWFpbExpc3RNZW1iZXJzUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTWFpbExpc3RNZW1iZXJzUmVzdWx0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdE1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBNYWlsTGlzdE1lbWJlcnNRdWVyeVxuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyc1Jlc3VsdD4ge1xuICAgIGxldCB1cmw7XG4gICAgY29uc3QgcXVlcnlDb3B5ID0geyAuLi5xdWVyeSB9O1xuICAgIGlmIChxdWVyeUNvcHkgJiYgcXVlcnlDb3B5LnBhZ2UpIHtcbiAgICAgIHVybCA9IHVybGpvaW4oYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzL3BhZ2VzYCwgcXVlcnlDb3B5LnBhZ2UpO1xuICAgICAgZGVsZXRlIHF1ZXJ5Q29weS5wYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSB1cmxqb2luKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy9wYWdlc2ApO1xuICAgIH1cbiAgICBjb25zdCBhcGlSZXNwb25zZTogTWFpbExpc3RNZW1iZXJzUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHVybCwgcXVlcnlDb3B5KTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUxpc3QoYXBpUmVzcG9uc2UpO1xuICB9XG5cbiAgZ2V0TWVtYmVyKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgY3JlYXRlTWVtYmVyKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1xuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgY29uc3QgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnNgLCByZXFEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBjcmVhdGVNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlTWVtYmVyc0RhdGFcbiAgKTogUHJvbWlzZTxOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZT4ge1xuICAgIGNvbnN0IG5ld0RhdGE6IE11bHRpcGxlTWVtYmVyc1JlcURhdGEgPSB7XG4gICAgICBtZW1iZXJzOiBBcnJheS5pc0FycmF5KGRhdGEubWVtYmVycykgPyBKU09OLnN0cmluZ2lmeShkYXRhLm1lbWJlcnMpIDogZGF0YS5tZW1iZXJzLFxuICAgICAgdXBzZXJ0OiBkYXRhLnVwc2VydFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLmpzb25gLCBuZXdEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YCwgcmVxRGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgZGVzdHJveU1lbWJlcihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcpIDogUHJvbWlzZTxEZWxldGVkTWVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgRGVsZXRlZE1lbWJlcik7XG4gIH1cbn1cbiIsImltcG9ydCBBUElFcnJvciBmcm9tICcuL2Vycm9yJztcbmltcG9ydCBBUElFcnJvck9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL0FQSUVycm9yT3B0aW9ucyc7XG5pbXBvcnQge1xuICBNYWlsZ3VuTWVzc2FnZURhdGEsXG4gIE1lc3NhZ2VzU2VuZEFQSVJlc3BvbnNlLFxuICBNZXNzYWdlc1NlbmRSZXN1bHRcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL01lc3NhZ2VzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZUJvb2xlYW5WYWx1ZXMoZGF0YTogTWFpbGd1bk1lc3NhZ2VEYXRhKTogTWFpbGd1bk1lc3NhZ2VEYXRhIHtcbiAgICBjb25zdCB5ZXNOb1Byb3BlcnRpZXMgPSBuZXcgU2V0KFtcbiAgICAgICdvOnRlc3Rtb2RlJyxcbiAgICAgICd0OnRleHQnLFxuICAgICAgJ286ZGtpbScsXG4gICAgICAnbzp0cmFja2luZycsXG4gICAgICAnbzp0cmFja2luZy1jbGlja3MnLFxuICAgICAgJ286dHJhY2tpbmctb3BlbnMnLFxuICAgICAgJ286cmVxdWlyZS10bHMnLFxuICAgICAgJ286c2tpcC12ZXJpZmljYXRpb24nXG4gICAgXSk7XG5cbiAgICBpZiAoIWRhdGEgfHwgT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgbWVzc2FnZTogJ01lc3NhZ2UgZGF0YSBvYmplY3QgY2FuIG5vdCBiZSBlbXB0eSdcbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGlmICh5ZXNOb1Byb3BlcnRpZXMuaGFzKGtleSkgJiYgdHlwZW9mIGRhdGFba2V5XSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldID8gJ3llcycgOiAnbm8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjW2tleV0gPSBkYXRhW2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9IGFzIE1haWxndW5NZXNzYWdlRGF0YSk7XG4gIH1cblxuICBfcGFyc2VSZXNwb25zZShyZXNwb25zZTogTWVzc2FnZXNTZW5kQVBJUmVzcG9uc2UpOiBNZXNzYWdlc1NlbmRSZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBNYWlsZ3VuTWVzc2FnZURhdGEpOiBQcm9taXNlPE1lc3NhZ2VzU2VuZFJlc3VsdD4ge1xuICAgIGlmIChkYXRhLm1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3YzLyR7ZG9tYWlufS9tZXNzYWdlcy5taW1lYCwgZGF0YSlcbiAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kaWZpZWREYXRhID0gdGhpcy5wcmVwYXJlQm9vbGVhblZhbHVlcyhkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92My8ke2RvbWFpbn0vbWVzc2FnZXNgLCBtb2RpZmllZERhdGEpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQge1xuICBDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYixcbiAgQ3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYixcbiAgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhVXBkYXRlZCxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhLFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0XG59XG4gIGZyb20gJy4vaW50ZXJmYWNlcy9NdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGltcGxlbWVudHMgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVJlc3BvbnNlPFQ+KHJlc3BvbnNlOiBBUElSZXNwb25zZSk6IFQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlPy5ib2R5XG4gICAgfSBhcyBUO1xuICB9XG5cbiAgYXN5bmMgbGlzdCgpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrJyk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGdldChsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWApO1xuICAgIHJldHVybiB7XG4gICAgICByZXNwb25zZVN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlPy5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZShcbiAgICBsaXN0SWQ6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFcbiAgKTogUHJvbWlzZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgY29uc3QgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhVXBkYXRlZCA9IHtcbiAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IHtcbiAgICAgICAgLi4uZGF0YT8uZmlsZVxuICAgICAgfSxcbiAgICAgIC4uLmRhdGFcbiAgICB9O1xuICAgIGRlbGV0ZSBtdWx0aXBsZVZhbGlkYXRpb25EYXRhLmZpbGU7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gLCBtdWx0aXBsZVZhbGlkYXRpb25EYXRhKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBkZXN0cm95KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ocmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSAnYmFzZS02NCc7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NFcnJvciwgQXhpb3NSZXNwb25zZSB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vZXJyb3InO1xuaW1wb3J0IHsgT25DYWxsRW1wdHlIZWFkZXJzLCBPbkNhbGxSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuL2ludGVyZmFjZXMvUmVxdWVzdE9wdGlvbnMnO1xuaW1wb3J0IEFQSUVycm9yT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvQVBJRXJyb3JPcHRpb25zJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvSUZvcm1EYXRhJztcbmltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IEZvcm1EYXRhQnVpbGRlciBmcm9tICcuL2Zvcm1EYXRhQnVpbGRlcic7XG5pbXBvcnQgeyBJcFBvb2xEZWxldGVEYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lwUG9vbHMnO1xuXG5jbGFzcyBSZXF1ZXN0IHtcbiAgcHJpdmF0ZSB1c2VybmFtZTogc3RyaW5nO1xuICBwcml2YXRlIGtleTogc3RyaW5nO1xuICBwcml2YXRlIHVybDogc3RyaW5nO1xuICBwcml2YXRlIHRpbWVvdXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgcHJpdmF0ZSBmb3JtRGF0YUJ1aWxkZXI6IEZvcm1EYXRhQnVpbGRlcjtcbiAgcHJpdmF0ZSBtYXhCb2R5TGVuZ3RoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogUmVxdWVzdE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy51c2VybmFtZSA9IG9wdGlvbnMudXNlcm5hbWU7XG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIGFzIHN0cmluZztcbiAgICB0aGlzLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XG4gICAgdGhpcy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICAgIHRoaXMuZm9ybURhdGFCdWlsZGVyID0gbmV3IEZvcm1EYXRhQnVpbGRlcihmb3JtRGF0YSk7XG4gICAgdGhpcy5tYXhCb2R5TGVuZ3RoID0gMjUwMDAwMDA7IC8vIDI1TUJcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb25DYWxsT3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBvcHRpb25zOiBPbkNhbGxSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub25DYWxsT3B0aW9ucyB9O1xuICAgIGNvbnN0IGJhc2ljID0gYmFzZTY0LmVuY29kZShgJHt0aGlzLnVzZXJuYW1lfToke3RoaXMua2V5fWApO1xuICAgIGNvbnN0IG9uQ2FsbEhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgPyBvcHRpb25zLmhlYWRlcnMgOiB7fTtcblxuICAgIGNvbnN0IGhlYWRlcnM6IEhlYWRlcnNJbml0fCBPbkNhbGxFbXB0eUhlYWRlcnMgPSB7XG4gICAgICBBdXRob3JpemF0aW9uOiBgQmFzaWMgJHtiYXNpY31gLFxuICAgICAgLi4udGhpcy5oZWFkZXJzLFxuICAgICAgLi4ub25DYWxsSGVhZGVyc1xuICAgIH07XG5cbiAgICBkZWxldGUgb3B0aW9ucz8uaGVhZGVycztcblxuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4ub3B0aW9ucyB9O1xuXG4gICAgaWYgKG9wdGlvbnM/LnF1ZXJ5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9wdGlvbnM/LnF1ZXJ5KS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJhbXMucGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhvcHRpb25zLnF1ZXJ5KTtcbiAgICAgIGRlbGV0ZSBwYXJhbXMucXVlcnk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmJvZHkpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSBvcHRpb25zPy5ib2R5O1xuICAgICAgcGFyYW1zLmRhdGEgPSBib2R5O1xuICAgICAgZGVsZXRlIHBhcmFtcy5ib2R5O1xuICAgIH1cbiAgICBsZXQgcmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U7XG4gICAgY29uc3QgdXJsVmFsdWUgPSB1cmxqb2luKHRoaXMudXJsLCB1cmwpO1xuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6IG1ldGhvZC50b0xvY2FsZVVwcGVyQ2FzZSgpLFxuICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgIHVybDogdXJsVmFsdWUsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgICAgbWF4Qm9keUxlbmd0aDogdGhpcy5tYXhCb2R5TGVuZ3RoXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSBlcnIgYXMgQXhpb3NFcnJvcjtcblxuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgc3RhdHVzOiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uc3RhdHVzIHx8IDQwMCxcbiAgICAgICAgc3RhdHVzVGV4dDogZXJyb3JSZXNwb25zZT8ucmVzcG9uc2U/LnN0YXR1c1RleHQgfHwgZXJyb3JSZXNwb25zZS5jb2RlLFxuICAgICAgICBib2R5OiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uZGF0YSB8fCBlcnJvclJlc3BvbnNlLm1lc3NhZ2VcbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmdldFJlc3BvbnNlQm9keShyZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlcyBhcyBBUElSZXNwb25zZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlcyA9IHtcbiAgICAgIGJvZHk6IHt9LFxuICAgICAgc3RhdHVzOiByZXNwb25zZT8uc3RhdHVzXG4gICAgfSBhcyBBUElSZXNwb25zZTtcblxuICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhID09PSAnTWFpbGd1biBNYWduaWZpY2VudCBBUEknKSB7XG4gICAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgc3RhdHVzVGV4dDogJ0luY29ycmVjdCB1cmwnLFxuICAgICAgICAgIGJvZHk6IHJlc3BvbnNlLmRhdGFcbiAgICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcmVzLmJvZHkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmRhdGFcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5ib2R5ID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHF1ZXJ5KFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIHF1ZXJ5PzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBBcnJheTxBcnJheTxzdHJpbmc+PixcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHsgcXVlcnksIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICBjb21tYW5kKFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+W10gfCBzdHJpbmcgfCBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSxcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gICAgYWRkRGVmYXVsdEhlYWRlcnMgPSB0cnVlXG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBsZXQgaGVhZGVycyA9IHt9O1xuICAgIGlmIChhZGREZWZhdWx0SGVhZGVycykge1xuICAgICAgaGVhZGVycyA9IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH07XG4gICAgfVxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgLi4uaGVhZGVycyxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgcmVxdWVzdE9wdGlvbnNcbiAgICApO1xuICB9XG5cbiAgZ2V0KFxuICAgIHVybDogc3RyaW5nLFxuICAgIHF1ZXJ5PzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBBcnJheTxBcnJheTxzdHJpbmc+PixcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5KCdnZXQnLCB1cmwsIHF1ZXJ5LCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3QoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncG9zdCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0V2l0aEZEKFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXVxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBwdXRXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBwYXRjaFdpdGhGRCh1cmw6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwYXRjaCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcHV0KHVybDogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBzdHJpbmcsIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcbiAgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZSh1cmw6IHN0cmluZywgZGF0YT86IElwUG9vbERlbGV0ZURhdGEpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgnZGVsZXRlJywgdXJsLCBkYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIiwiaW1wb3J0IHtcbiAgQ3JlYXRlVXBkYXRlUm91dGVEYXRhLCBEZXN0cm95Um91dGVSZXNwb25zZSwgUm91dGUsIFJvdXRlc0xpc3RRdWVyeSwgVXBkYXRlUm91dGVSZXNwb25zZVxufSBmcm9tICcuL2ludGVyZmFjZXMvcm91dGVzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KHF1ZXJ5OiBSb3V0ZXNMaXN0UXVlcnkpOiBQcm9taXNlPFJvdXRlW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3JvdXRlcycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lml0ZW1zKTtcbiAgfVxuXG4gIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxSb3V0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5yb3V0ZSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxSb3V0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YzL3JvdXRlcycsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8VXBkYXRlUm91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAvdjMvcm91dGVzLyR7aWR9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cblxuICBkZXN0cm95KGlkOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3lSb3V0ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92My9yb3V0ZXMvJHtpZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7IFN0YXRzUXVlcnksIFN0YXRzT3B0aW9ucywgU3RhdCB9IGZyb20gJy4vaW50ZXJmYWNlcy9TdGF0c09wdGlvbnMnO1xuXG5jbGFzcyBTdGF0cyB7XG4gIHN0YXJ0OiBEYXRlO1xuICBlbmQ6IERhdGU7XG4gIHJlc29sdXRpb246IHN0cmluZztcbiAgc3RhdHM6IFN0YXRbXTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBTdGF0c09wdGlvbnMpIHtcbiAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoZGF0YS5zdGFydCk7XG4gICAgdGhpcy5lbmQgPSBuZXcgRGF0ZShkYXRhLmVuZCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uID0gZGF0YS5yZXNvbHV0aW9uO1xuICAgIHRoaXMuc3RhdHMgPSBkYXRhLnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdDogU3RhdCkge1xuICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0IH07XG4gICAgICByZXMudGltZSA9IG5ldyBEYXRlKHN0YXQudGltZSk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeTogU3RhdHNRdWVyeSB8IHVuZGVmaW5lZCk6IEFycmF5PEFycmF5PHN0cmluZz4+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gW10gYXMgQXJyYXk8QXJyYXk8c3RyaW5nPj47XG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gT2JqZWN0LmVudHJpZXMocXVlcnkpLnJlZHVjZSgoYXJyYXlXaXRoUGFpcnMsIGN1cnJlbnRQYWlyKSA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGN1cnJlbnRQYWlyO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgcmVwZWF0ZWRQcm9wZXJ0eSA9IHZhbHVlLm1hcCgoaXRlbSkgPT4gW2tleSwgaXRlbV0pO1xuICAgICAgICAgIHJldHVybiBbLi4uYXJyYXlXaXRoUGFpcnMsIC4uLnJlcGVhdGVkUHJvcGVydHldO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5V2l0aFBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgICAgcmV0dXJuIGFycmF5V2l0aFBhaXJzO1xuICAgICAgfSwgW10gYXMgQXJyYXk8QXJyYXk8c3RyaW5nPj4pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWFyY2hQYXJhbXM7XG4gIH1cblxuICBfcGFyc2VTdGF0cyhyZXNwb25zZTogeyBib2R5OiBTdGF0c09wdGlvbnMgfSk6IFN0YXRzIHtcbiAgICByZXR1cm4gbmV3IFN0YXRzKHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZ2V0RG9tYWluKGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPFN0YXRzPiB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMnLCBkb21haW4sICdzdGF0cy90b3RhbCcpLCBzZWFyY2hQYXJhbXMpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVN0YXRzKTtcbiAgfVxuXG4gIGdldEFjY291bnQocXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxTdGF0cz4ge1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9zdGF0cy90b3RhbCcsIHNlYXJjaFBhcmFtcylcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlU3RhdHMpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7XG4gIEJvdW5jZURhdGEsXG4gIENvbXBsYWludERhdGEsXG4gIFBhZ2VzTGlzdCxcbiAgUGFnZXNMaXN0QWNjdW11bGF0b3IsXG4gIFBhcnNlZFBhZ2UsXG4gIFBhcnNlZFBhZ2VzTGlzdCxcbiAgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSxcbiAgU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCxcbiAgU3VwcHJlc3Npb25EZXN0cm95UmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdCxcbiAgU3VwcHJlc3Npb25MaXN0LFxuICBTdXBwcmVzc2lvbkxpc3RRdWVyeSxcbiAgU3VwcHJlc3Npb25MaXN0UmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uTW9kZWxzLFxuICBTdXBwcmVzc2lvblJlc3BvbnNlLFxuICBVbnN1YnNjcmliZURhdGEsXG4gIFdoaXRlTGlzdERhdGEsXG59IGZyb20gJy4vaW50ZXJmYWNlcy9TdXByZXNzaW9ucyc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuXG5jb25zdCBjcmVhdGVPcHRpb25zID0ge1xuICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfVxufTtcbmV4cG9ydCBjbGFzcyBTdXBwcmVzc2lvbiB7XG4gIHR5cGU6IHN0cmluZztcbiAgY29uc3RydWN0b3IodHlwZTogU3VwcHJlc3Npb25Nb2RlbHMpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG59XG5leHBvcnQgY2xhc3MgQm91bmNlIGV4dGVuZHMgU3VwcHJlc3Npb24ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvZGU6IG51bWJlcjtcbiAgZXJyb3I6IHN0cmluZztcbiAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBCb3VuY2VEYXRhKSB7XG4gICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuQk9VTkNFUyk7XG4gICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgIHRoaXMuY29kZSA9ICtkYXRhLmNvZGU7XG4gICAgdGhpcy5lcnJvciA9IGRhdGEuZXJyb3I7XG4gICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcGxhaW50IGV4dGVuZHMgU3VwcHJlc3Npb24ge1xuICBhZGRyZXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogQ29tcGxhaW50RGF0YSkge1xuICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLkNPTVBMQUlOVFMpO1xuICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbnN1YnNjcmliZSBleHRlbmRzIFN1cHByZXNzaW9uIHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICB0YWdzOiBzdHJpbmdbXTtcbiAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBVbnN1YnNjcmliZURhdGEpIHtcbiAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5VTlNVQlNDUklCRVMpO1xuICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICB0aGlzLnRhZ3MgPSBkYXRhLnRhZ3M7XG4gICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgV2hpdGVMaXN0IGV4dGVuZHMgU3VwcHJlc3Npb24ge1xuICB2YWx1ZTogc3RyaW5nO1xuICByZWFzb246IHN0cmluZztcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFdoaXRlTGlzdERhdGEpIHtcbiAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5XSElURUxJU1RTKTtcbiAgICB0aGlzLnZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICB0aGlzLnJlYXNvbiA9IGRhdGEucmVhc29uO1xuICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1cHByZXNzaW9uQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgbW9kZWxzOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubW9kZWxzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMubW9kZWxzLnNldCgnYm91bmNlcycsIEJvdW5jZSk7XG4gICAgdGhpcy5tb2RlbHMuc2V0KCdjb21wbGFpbnRzJywgQ29tcGxhaW50KTtcbiAgICB0aGlzLm1vZGVscy5zZXQoJ3Vuc3Vic2NyaWJlcycsIFVuc3Vic2NyaWJlKTtcbiAgICB0aGlzLm1vZGVscy5zZXQoJ3doaXRlbGlzdHMnLCBXaGl0ZUxpc3QpO1xuICB9XG5cbiAgX3BhcnNlUGFnZShpZDogc3RyaW5nLCBwYWdlVXJsOiBzdHJpbmcpIDogUGFyc2VkUGFnZSB7XG4gICAgY29uc3QgcGFyc2VkVXJsID0gbmV3IFVSTChwYWdlVXJsKTtcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gcGFyc2VkVXJsO1xuICAgIHJldHVybiB7XG4gICAgICBpZCxcbiAgICAgIHBhZ2U6IHNlYXJjaFBhcmFtcy5oYXMoJ3BhZ2UnKSA/IHNlYXJjaFBhcmFtcy5nZXQoJ3BhZ2UnKSA6IHVuZGVmaW5lZCxcbiAgICAgIGFkZHJlc3M6IHNlYXJjaFBhcmFtcy5oYXMoJ2FkZHJlc3MnKSA/IHNlYXJjaFBhcmFtcy5nZXQoJ2FkZHJlc3MnKSA6IHVuZGVmaW5lZCxcbiAgICAgIHVybDogcGFnZVVybFxuICAgIH07XG4gIH1cblxuICBfcGFyc2VQYWdlTGlua3MocmVzcG9uc2U6IFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlKTogUGFyc2VkUGFnZXNMaXN0IHtcbiAgICBjb25zdCBwYWdlcyA9IE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlLmJvZHkucGFnaW5nIGFzIFBhZ2VzTGlzdCk7XG4gICAgcmV0dXJuIHBhZ2VzLnJlZHVjZShcbiAgICAgIChhY2M6IFBhZ2VzTGlzdEFjY3VtdWxhdG9yLCBwYWlyOiBbcGFnZVVybDogc3RyaW5nLCBpZDogc3RyaW5nXSkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IHBhaXJbMF07XG4gICAgICAgIGNvbnN0IHBhZ2VVcmwgPSBwYWlyWzFdO1xuICAgICAgICBhY2NbaWRdID0gdGhpcy5fcGFyc2VQYWdlKGlkLCBwYWdlVXJsKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9XG4gICAgKSBhcyB1bmtub3duIGFzIFBhcnNlZFBhZ2VzTGlzdDtcbiAgfVxuXG4gIF9wYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YTogQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhKTpcbiAgICAgIEJvdW5jZSB8IENvbXBsYWludCB8IFVuc3Vic2NyaWJlIHwgV2hpdGVMaXN0XG4gICAgfVxuICApOiBTdXBwcmVzc2lvbkxpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBTdXBwcmVzc2lvbkxpc3Q7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKChpdGVtKSA9PiBuZXcgTW9kZWwoaXRlbSkpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMuX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlKTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgX3BhcnNlSXRlbTxUIGV4dGVuZHMgU3VwcHJlc3Npb24+KFxuICAgIGRhdGEgOiBCb3VuY2VEYXRhIHwgQ29tcGxhaW50RGF0YSB8IFVuc3Vic2NyaWJlRGF0YSB8IFdoaXRlTGlzdERhdGEsXG4gICAgTW9kZWw6IHtcbiAgICAgIG5ldyhkYXRhOiBCb3VuY2VEYXRhIHwgQ29tcGxhaW50RGF0YSB8IFVuc3Vic2NyaWJlRGF0YSB8IFdoaXRlTGlzdERhdGEpOlxuICAgICAgVFxuICAgIH1cbiAgKTogVCB7XG4gICAgcmV0dXJuIG5ldyBNb2RlbChkYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlV2hpdGVMaXN0KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIHN0YXR1c1RleHQ6ICdEYXRhIHByb3BlcnR5IHNob3VsZCBiZSBhbiBvYmplY3QnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgbWVzc2FnZTogJ1doaXRlbGlzdFxcJ3MgY3JlYXRpb24gcHJvY2VzcyBkb2VzIG5vdCBzdXBwb3J0IG11bHRpcGxlIGNyZWF0aW9ucy4gRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0J1xuICAgICAgICB9XG4gICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAnd2hpdGVsaXN0cycpLCBkYXRhKVxuICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1R5cGUodHlwZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLm1vZGVscy5oYXModHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBzdGF0dXNUZXh0OiAnVW5rbm93biB0eXBlIHZhbHVlJyxcbiAgICAgICAgYm9keTogeyBtZXNzYWdlOiAnVHlwZSBtYXkgYmUgb25seSBvbmUgb2YgW2JvdW5jZXMsIGNvbXBsYWludHMsIHVuc3Vic2NyaWJlcywgd2hpdGVsaXN0c10nIH1cbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVSZXNwb25zZShyZXNwb25zZTogU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlKTogU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgIHR5cGU6IHJlc3BvbnNlLmJvZHkudHlwZSB8fCAnJyxcbiAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICB9O1xuICB9XG5cbiAgbGlzdChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBTdXBwcmVzc2lvbkxpc3RRdWVyeVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uTGlzdD4ge1xuICAgIHRoaXMuY2hlY2tUeXBlKHR5cGUpO1xuXG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVscy5nZXQodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLmdldCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VMaXN0KHJlc3BvbnNlLCBtb2RlbCkpO1xuICB9XG5cbiAgZ2V0KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxCb3VuY2UgfCBDb21wbGFpbnQgfCBVbnN1YnNjcmliZSB8IFdoaXRlTGlzdD4ge1xuICAgIHRoaXMuY2hlY2tUeXBlKHR5cGUpO1xuXG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVscy5nZXQodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLmdldCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSwgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogU3VwcHJlc3Npb25SZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VJdGVtPHR5cGVvZiBtb2RlbD4ocmVzcG9uc2UuYm9keSwgbW9kZWwpKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgfCBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YVtdXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdD4ge1xuICAgIHRoaXMuY2hlY2tUeXBlKHR5cGUpO1xuICAgIC8vIHN1cHBvcnRzIGFkZGluZyBtdWx0aXBsZSBzdXBwcmVzc2lvbnMgYnkgZGVmYXVsdFxuICAgIGxldCBwb3N0RGF0YTtcbiAgICBpZiAodHlwZSA9PT0gJ3doaXRlbGlzdHMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVXaGl0ZUxpc3QoZG9tYWluLCBkYXRhKTtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHBvc3REYXRhID0gW2RhdGFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3N0RGF0YSA9IFsuLi5kYXRhXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIEpTT04uc3RyaW5naWZ5KHBvc3REYXRhKSwgY3JlYXRlT3B0aW9ucylcbiAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgfVxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdD4ge1xuICAgIHRoaXMuY2hlY2tUeXBlKHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5kZWxldGUodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5ib2R5LmFkZHJlc3MgfHwgJycsXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICB9KSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdXBwcmVzc2lvbkNsaWVudDtcbiIsImltcG9ydCB7IElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgfSBmcm9tICcuL2ludGVyZmFjZXMvTXVsdGlwbGVWYWxpZGF0aW9uJztcbmltcG9ydCB7IFZhbGlkYXRpb25SZXN1bHQsIFZhbGlkYXRpb25SZXNwb25zZSwgVmFsaWRhdGlvblF1ZXJ5IH0gZnJvbSAnLi9pbnRlcmZhY2VzL1ZhbGlkYXRlJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRlQ2xpZW50IHtcbiAgcHVibGljIG11bHRpcGxlVmFsaWRhdGlvbjtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ6IElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubXVsdGlwbGVWYWxpZGF0aW9uID0gbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50O1xuICB9XG5cbiAgYXN5bmMgZ2V0KGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIGNvbnN0IHF1ZXJ5OiBWYWxpZGF0aW9uUXVlcnkgPSB7IGFkZHJlc3MgfTtcbiAgICBjb25zdCByZXN1bHQ6IFZhbGlkYXRpb25SZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92NC9hZGRyZXNzL3ZhbGlkYXRlJywgcXVlcnkpO1xuICAgIHJldHVybiByZXN1bHQuYm9keSBhcyBWYWxpZGF0aW9uUmVzdWx0O1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5cbmltcG9ydCB7XG4gIFZhbGlkYXRpb25SZXNwb25zZSxcbiAgV2ViaG9va0xpc3QsXG4gIFdlYmhvb2tSZXNwb25zZSxcbiAgV2ViaG9va3NJZHMsXG4gIFdlYmhvb2tzUXVlcnlcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL1dlYmhvb2tzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmNsYXNzIFdlYmhvb2sge1xuICBpZDogc3RyaW5nO1xuICB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJob29rQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tMaXN0KHJlc3BvbnNlOiB7IGJvZHk6IHsgd2ViaG9va3M6IFdlYmhvb2tMaXN0IH0gfSk6IFdlYmhvb2tMaXN0IHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keS53ZWJob29rcztcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tXaXRoSUQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2U6IFdlYmhvb2tSZXNwb25zZSk6IFdlYmhvb2sge1xuICAgICAgY29uc3Qgd2ViaG9va1Jlc3BvbnNlID0gcmVzcG9uc2U/LmJvZHk/LndlYmhvb2s7XG4gICAgICBsZXQgdXJsID0gd2ViaG9va1Jlc3BvbnNlPy51cmw7XG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICB1cmwgPSB3ZWJob29rUmVzcG9uc2U/LnVybHMgJiYgd2ViaG9va1Jlc3BvbnNlLnVybHMubGVuZ3RoXG4gICAgICAgICAgPyB3ZWJob29rUmVzcG9uc2UudXJsc1swXVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBXZWJob29rKGlkLCB1cmwpO1xuICAgIH07XG4gIH1cblxuICBfcGFyc2VXZWJob29rVGVzdChyZXNwb25zZTogeyBib2R5OiB7IGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nIH0gfSlcbiAgOiB7Y29kZTogbnVtYmVyLCBtZXNzYWdlOnN0cmluZ30ge1xuICAgIHJldHVybiB7IGNvZGU6IHJlc3BvbnNlLmJvZHkuY29kZSwgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlIH0gYXMgVmFsaWRhdGlvblJlc3BvbnNlO1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk6IFdlYmhvb2tzUXVlcnkpOiBQcm9taXNlPFdlYmhvb2tMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCBxdWVyeSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va0xpc3QpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBpZDogV2ViaG9va3NJZHMpOiBQcm9taXNlPFdlYmhvb2s+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsXG4gICAgaWQ6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICB0ZXN0ID0gZmFsc2UpOiBQcm9taXNlPFdlYmhvb2sgfCBWYWxpZGF0aW9uUmVzcG9uc2U+IHtcbiAgICBpZiAodGVzdCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkLCAndGVzdCcpLCB7IHVybCB9KVxuICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tUZXN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCB7IGlkLCB1cmwgfSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgdXBkYXRlKGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IFByb21pc2U8V2ViaG9vaz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCksIHsgdXJsIH0pXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIGlkOiBzdHJpbmcpIDogUHJvbWlzZTxXZWJob29rPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG59XG4iLCIvKiEgaHR0cHM6Ly9tdGhzLmJlL2Jhc2U2NCB2MS4wLjAgYnkgQG1hdGhpYXMgfCBNSVQgbGljZW5zZSAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGVzIGBleHBvcnRzYC5cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC5cblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLCBhbmQgdXNlXG5cdC8vIGl0IGFzIGByb290YC5cblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgSW52YWxpZENoYXJhY3RlckVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH07XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5cdHZhciBlcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHQvLyBOb3RlOiB0aGUgZXJyb3IgbWVzc2FnZXMgdXNlZCB0aHJvdWdob3V0IHRoaXMgZmlsZSBtYXRjaCB0aG9zZSB1c2VkIGJ5XG5cdFx0Ly8gdGhlIG5hdGl2ZSBgYXRvYmAvYGJ0b2FgIGltcGxlbWVudGF0aW9uIGluIENocm9taXVtLlxuXHRcdHRocm93IG5ldyBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IobWVzc2FnZSk7XG5cdH07XG5cblx0dmFyIFRBQkxFID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXHQvLyBodHRwOi8vd2hhdHdnLm9yZy9odG1sL2NvbW1vbi1taWNyb3N5bnRheGVzLmh0bWwjc3BhY2UtY2hhcmFjdGVyXG5cdHZhciBSRUdFWF9TUEFDRV9DSEFSQUNURVJTID0gL1tcXHRcXG5cXGZcXHIgXS9nO1xuXG5cdC8vIGBkZWNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYXRvYmAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkLiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWF0b2Jcblx0Ly8gVGhlIG9wdGltaXplZCBiYXNlNjQtZGVjb2RpbmcgYWxnb3JpdGhtIHVzZWQgaXMgYmFzZWQgb24gQGF0a+KAmXMgZXhjZWxsZW50XG5cdC8vIGltcGxlbWVudGF0aW9uLiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9hdGsvMTAyMDM5NlxuXHR2YXIgZGVjb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dClcblx0XHRcdC5yZXBsYWNlKFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMsICcnKTtcblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdGlmIChsZW5ndGggJSA0ID09IDApIHtcblx0XHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZSgvPT0/JC8sICcnKTtcblx0XHRcdGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0bGVuZ3RoICUgNCA9PSAxIHx8XG5cdFx0XHQvLyBodHRwOi8vd2hhdHdnLm9yZy9DI2FscGhhbnVtZXJpYy1hc2NpaS1jaGFyYWN0ZXJzXG5cdFx0XHQvW14rYS16QS1aMC05L10vLnRlc3QoaW5wdXQpXG5cdFx0KSB7XG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J0ludmFsaWQgY2hhcmFjdGVyOiB0aGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBiaXRDb3VudGVyID0gMDtcblx0XHR2YXIgYml0U3RvcmFnZTtcblx0XHR2YXIgYnVmZmVyO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0YnVmZmVyID0gVEFCTEUuaW5kZXhPZihpbnB1dC5jaGFyQXQocG9zaXRpb24pKTtcblx0XHRcdGJpdFN0b3JhZ2UgPSBiaXRDb3VudGVyICUgNCA/IGJpdFN0b3JhZ2UgKiA2NCArIGJ1ZmZlciA6IGJ1ZmZlcjtcblx0XHRcdC8vIFVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCBvZiBhIGdyb3VwIG9mIDQgY2hhcmFjdGVyc+KAplxuXHRcdFx0aWYgKGJpdENvdW50ZXIrKyAlIDQpIHtcblx0XHRcdFx0Ly8g4oCmY29udmVydCB0aGUgZmlyc3QgOCBiaXRzIHRvIGEgc2luZ2xlIEFTQ0lJIGNoYXJhY3Rlci5cblx0XHRcdFx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdFx0XHRcdFx0MHhGRiAmIGJpdFN0b3JhZ2UgPj4gKC0yICogYml0Q291bnRlciAmIDYpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0Ly8gYGVuY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBidG9hYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQ6IGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYnRvYVxuXHR2YXIgZW5jb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dCk7XG5cdFx0aWYgKC9bXlxcMC1cXHhGRl0vLnRlc3QoaW5wdXQpKSB7XG5cdFx0XHQvLyBOb3RlOiBubyBuZWVkIHRvIHNwZWNpYWwtY2FzZSBhc3RyYWwgc3ltYm9scyBoZXJlLCBhcyBzdXJyb2dhdGVzIGFyZVxuXHRcdFx0Ly8gbWF0Y2hlZCwgYW5kIHRoZSBpbnB1dCBpcyBzdXBwb3NlZCB0byBvbmx5IGNvbnRhaW4gQVNDSUkgYW55d2F5LlxuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdUaGUgc3RyaW5nIHRvIGJlIGVuY29kZWQgY29udGFpbnMgY2hhcmFjdGVycyBvdXRzaWRlIG9mIHRoZSAnICtcblx0XHRcdFx0J0xhdGluMSByYW5nZS4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgcGFkZGluZyA9IGlucHV0Lmxlbmd0aCAlIDM7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHZhciBhO1xuXHRcdHZhciBiO1xuXHRcdHZhciBjO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0Ly8gTWFrZSBzdXJlIGFueSBwYWRkaW5nIGlzIGhhbmRsZWQgb3V0c2lkZSBvZiB0aGUgbG9vcC5cblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoIC0gcGFkZGluZztcblxuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHQvLyBSZWFkIHRocmVlIGJ5dGVzLCBpLmUuIDI0IGJpdHMuXG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgMTY7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YyA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYiArIGM7XG5cdFx0XHQvLyBUdXJuIHRoZSAyNCBiaXRzIGludG8gZm91ciBjaHVua3Mgb2YgNiBiaXRzIGVhY2gsIGFuZCBhcHBlbmQgdGhlXG5cdFx0XHQvLyBtYXRjaGluZyBjaGFyYWN0ZXIgZm9yIGVhY2ggb2YgdGhlbSB0byB0aGUgb3V0cHV0LlxuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxOCAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiA2ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyICYgMHgzRilcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHBhZGRpbmcgPT0gMikge1xuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDg7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMCkgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA+PiA0KSAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgMikgJiAweDNGKSArXG5cdFx0XHRcdCc9J1xuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKHBhZGRpbmcgPT0gMSkge1xuXHRcdFx0YnVmZmVyID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbik7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDIpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgNCkgJiAweDNGKSArXG5cdFx0XHRcdCc9PSdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHR2YXIgYmFzZTY0ID0ge1xuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQndmVyc2lvbic6ICcxLjAuMCdcblx0fTtcblxuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBiYXNlNjQ7XG5cdFx0fSk7XG5cdH1cdGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBiYXNlNjQ7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAodmFyIGtleSBpbiBiYXNlNjQpIHtcblx0XHRcdFx0YmFzZTY0Lmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBiYXNlNjRba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC5iYXNlNjQgPSBiYXNlNjQ7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIoZnVuY3Rpb24gKG5hbWUsIGNvbnRleHQsIGRlZmluaXRpb24pIHtcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKTtcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoZGVmaW5pdGlvbik7XG4gIGVsc2UgY29udGV4dFtuYW1lXSA9IGRlZmluaXRpb24oKTtcbn0pKCd1cmxqb2luJywgdGhpcywgZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZSAoc3RyQXJyYXkpIHtcbiAgICB2YXIgcmVzdWx0QXJyYXkgPSBbXTtcbiAgICBpZiAoc3RyQXJyYXkubGVuZ3RoID09PSAwKSB7IHJldHVybiAnJzsgfVxuXG4gICAgaWYgKHR5cGVvZiBzdHJBcnJheVswXSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgc3RyQXJyYXlbMF0pO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBmaXJzdCBwYXJ0IGlzIGEgcGxhaW4gcHJvdG9jb2wsIHdlIGNvbWJpbmUgaXQgd2l0aCB0aGUgbmV4dCBwYXJ0LlxuICAgIGlmIChzdHJBcnJheVswXS5tYXRjaCgvXlteLzpdKzpcXC8qJC8pICYmIHN0ckFycmF5Lmxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBmaXJzdCA9IHN0ckFycmF5LnNoaWZ0KCk7XG4gICAgICBzdHJBcnJheVswXSA9IGZpcnN0ICsgc3RyQXJyYXlbMF07XG4gICAgfVxuXG4gICAgLy8gVGhlcmUgbXVzdCBiZSB0d28gb3IgdGhyZWUgc2xhc2hlcyBpbiB0aGUgZmlsZSBwcm90b2NvbCwgdHdvIHNsYXNoZXMgaW4gYW55dGhpbmcgZWxzZS5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15maWxlOlxcL1xcL1xcLy8pKSB7XG4gICAgICBzdHJBcnJheVswXSA9IHN0ckFycmF5WzBdLnJlcGxhY2UoL14oW14vOl0rKTpcXC8qLywgJyQxOi8vLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHJBcnJheVswXSA9IHN0ckFycmF5WzBdLnJlcGxhY2UoL14oW14vOl0rKTpcXC8qLywgJyQxOi8vJyk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNvbXBvbmVudCA9IHN0ckFycmF5W2ldO1xuXG4gICAgICBpZiAodHlwZW9mIGNvbXBvbmVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVXJsIG11c3QgYmUgYSBzdHJpbmcuIFJlY2VpdmVkICcgKyBjb21wb25lbnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcG9uZW50ID09PSAnJykgeyBjb250aW51ZTsgfVxuXG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIHN0YXJ0aW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgZmlyc3QuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9eW1xcL10rLywgJycpO1xuICAgICAgfVxuICAgICAgaWYgKGkgPCBzdHJBcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBlbmRpbmcgc2xhc2hlcyBmb3IgZWFjaCBjb21wb25lbnQgYnV0IHRoZSBsYXN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvW1xcL10rJC8sICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciB0aGUgbGFzdCBjb21wb25lbnQgd2Ugd2lsbCBjb21iaW5lIG11bHRpcGxlIHNsYXNoZXMgdG8gYSBzaW5nbGUgb25lLlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvW1xcL10rJC8sICcvJyk7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdEFycmF5LnB1c2goY29tcG9uZW50KTtcblxuICAgIH1cblxuICAgIHZhciBzdHIgPSByZXN1bHRBcnJheS5qb2luKCcvJyk7XG4gICAgLy8gRWFjaCBpbnB1dCBjb21wb25lbnQgaXMgbm93IHNlcGFyYXRlZCBieSBhIHNpbmdsZSBzbGFzaCBleGNlcHQgdGhlIHBvc3NpYmxlIGZpcnN0IHBsYWluIHByb3RvY29sIHBhcnQuXG5cbiAgICAvLyByZW1vdmUgdHJhaWxpbmcgc2xhc2ggYmVmb3JlIHBhcmFtZXRlcnMgb3IgaGFzaFxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXC8oXFw/fCZ8I1teIV0pL2csICckMScpO1xuXG4gICAgLy8gcmVwbGFjZSA/IGluIHBhcmFtZXRlcnMgd2l0aCAmXG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KCc/Jyk7XG4gICAgc3RyID0gcGFydHMuc2hpZnQoKSArIChwYXJ0cy5sZW5ndGggPiAwID8gJz8nOiAnJykgKyBwYXJ0cy5qb2luKCcmJyk7XG5cbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW5wdXQ7XG5cbiAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlucHV0ID0gYXJndW1lbnRzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnB1dCA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9ybWFsaXplKGlucHV0KTtcbiAgfTtcblxufSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2xpYi9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJvcHRpb25zIiwiZm9ybURhdGEiLCJjb25maWciLCJfX2Fzc2lnbiIsInVybCIsInVzZXJuYW1lIiwiRXJyb3IiLCJrZXkiLCJyZXF1ZXN0IiwicmVxdWVzdF8xIiwibWFpbExpc3RzTWVtYmVycyIsIm1haWxMaXN0TWVtYmVyc18xIiwiZG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJkb21haW5zQ3JlZGVudGlhbHNfMSIsImRvbWFpblRlbXBsYXRlc0NsaWVudCIsImRvbWFpbnNUZW1wbGF0ZXNfMSIsImRvbWFpblRhZ3NDbGllbnQiLCJkb21haW5zVGFnc18xIiwibXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IiwibXVsdGlwbGVWYWxpZGF0aW9uXzEiLCJkb21haW5zIiwiZG9tYWluc18xIiwid2ViaG9va3MiLCJ3ZWJob29rc18xIiwiZXZlbnRzIiwiZXZlbnRzXzEiLCJzdGF0cyIsInN0YXRzXzEiLCJzdXBwcmVzc2lvbnMiLCJzdXBwcmVzc2lvbnNfMSIsIm1lc3NhZ2VzIiwibWVzc2FnZXNfMSIsInJvdXRlcyIsInJvdXRlc18xIiwiaXBzIiwiaXBzXzEiLCJpcF9wb29scyIsImlwX3Bvb2xzXzEiLCJsaXN0cyIsImxpc3RzXzEiLCJ2YWxpZGF0ZSIsInZhbGlkYXRlXzEiLCJOYXZpZ2F0aW9uVGhydVBhZ2VzIiwiaWQiLCJwYWdlVXJsIiwidXJsU2VwYXJhdG9yIiwiaXRlcmF0b3JOYW1lIiwicGFyc2VkVXJsIiwiVVJMIiwicGFnZVZhbHVlIiwic3BsaXQiLCJwb3AiLCJwYWdlIiwiaXRlcmF0b3JQb3NpdGlvbiIsInNlYXJjaFBhcmFtcyIsImhhcyIsImdldCIsInVuZGVmaW5lZCIsInJlc3BvbnNlIiwicGFnZXMiLCJPYmplY3QiLCJlbnRyaWVzIiwiYm9keSIsInBhZ2luZyIsInJlZHVjZSIsImFjYyIsInBhaXIiLCJfdGhpcyIsInBhcnNlUGFnZSIsImRhdGEiLCJyZWNlaXZpbmciLCJzZW5kaW5nIiwibmFtZSIsInJlcXVpcmVfdGxzIiwic2tpcF92ZXJpZmljYXRpb24iLCJzdGF0ZSIsIndpbGRjYXJkIiwic3BhbV9hY3Rpb24iLCJjcmVhdGVkX2F0Iiwic210cF9wYXNzd29yZCIsInNtdHBfbG9naW4iLCJ0eXBlIiwicmVjZWl2aW5nX2Ruc19yZWNvcmRzIiwic2VuZGluZ19kbnNfcmVjb3JkcyIsImV4cG9ydHMiLCJkb21haW5DcmVkZW50aWFscyIsImRvbWFpblRlbXBsYXRlcyIsImRvbWFpblRhZ3MiLCJEb21haW5DbGllbnQiLCJpdGVtcyIsIm1hcCIsIml0ZW0iLCJEb21haW4iLCJkb21haW4iLCJ0cmFja2luZyIsInF1ZXJ5IiwidGhlbiIsInJlcyIsIl9wYXJzZURvbWFpbkxpc3QiLCJfcGFyc2VEb21haW4iLCJwb3N0T2JqIiwiZm9yY2VfZGtpbV9hdXRob3JpdHkiLCJ0b1N0cmluZyIsInBvc3RXaXRoRkQiLCJwdXQiLCJkZWxldGUiLCJfcGFyc2VNZXNzYWdlIiwiY29ubmVjdGlvbiIsIl9wYXJzZVRyYWNraW5nU2V0dGluZ3MiLCJhY3RpdmUiLCJlcnJvcl8xIiwic3RhdHVzIiwic3RhdHVzVGV4dCIsIm1lc3NhZ2UiLCJwdXRXaXRoRkQiLCJfcGFyc2VUcmFja2luZ1VwZGF0ZSIsIl9hIiwiaXAiLCJwb29sX2lkIiwicmVwbGFjZW1lbnQiLCJzZWxmIiwiZGtpbVNlbGVjdG9yIiwid2ViUHJlZml4IiwiYmFzZVJvdXRlIiwiRG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJ0b3RhbENvdW50IiwidG90YWxfY291bnQiLCJyZXN1bHQiLCJzcGVjIiwiX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0IiwiY29uY2F0IiwiX3BhcnNlTWVzc2FnZVJlc3BvbnNlIiwiY3JlZGVudGlhbHNMb2dpbiIsIl9wYXJzZURlbGV0ZWRSZXNwb25zZSIsInRhZ0luZm8iLCJ0YWciLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJ0YWdTdGF0aXN0aWNJbmZvIiwic3RhcnQiLCJlbmQiLCJyZXNvbHV0aW9uIiwic3RhdCIsInRpbWUiLCJfX2V4dGVuZHMiLCJfc3VwZXIiLCJEb21haW5UYWdzQ2xpZW50IiwiRG9tYWluVGFnIiwicGFyc2VQYWdlTGlua3MiLCJEb21haW5UYWdTdGF0aXN0aWMiLCJxdWVyeUNvcHkiLCJwYXJzZUxpc3QiLCJfcGFyc2VUYWdTdGF0aXN0aWMiLCJOYXZpZ2F0aW9uVGhydVBhZ2VzXzEiLCJkb21haW5UZW1wbGF0ZUZyb21BUEkiLCJjcmVhdGVkQXQiLCJjcmVhdGVkQnkiLCJ2ZXJzaW9uIiwidmVyc2lvbnMiLCJsZW5ndGgiLCJEb21haW5UZW1wbGF0ZXNDbGllbnQiLCJEb21haW5UZW1wbGF0ZUl0ZW0iLCJ0ZW1wbGF0ZSIsInRlbXBsYXRlTmFtZSIsInRlbXBsYXRlVmVyc2lvbiIsImQiLCJwYXJzZUNyZWF0aW9uUmVzcG9uc2UiLCJwYXJzZU11dGF0aW9uUmVzcG9uc2UiLCJwYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlIiwicGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZSIsInBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UiLCJwYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zIiwiX2IiLCJib2R5TWVzc2FnZSIsImVycm9yIiwic3RhY2siLCJkZXRhaWxzIiwiRXZlbnRDbGllbnQiLCJudW1iZXIiLCJfcGFyc2VQYWdlTnVtYmVyIiwiX3BhcnNlUGFnZSIsIl9wYXJzZVBhZ2VMaW5rcyIsIl9wYXJzZUV2ZW50TGlzdCIsIkZvcm1EYXRhQ29uc3RydWN0b3IiLCJGb3JtRGF0YUJ1aWxkZXIiLCJrZXlzIiwiZmlsdGVyIiwiZm9ybURhdGFBY2MiLCJmaWxlS2V5cyIsImluY2x1ZGVzIiwiYWRkRmlsZXNUb0ZEIiwiYWRkTWltZURhdGFUb0ZEIiwiYWRkQ29tbW9uUHJvcGVydHlUb0ZEIiwiZm9ybURhdGFJbnN0YW5jZSIsImdldEhlYWRlcnMiLCJpc1N0cmVhbSIsImNvbnRlbnRUeXBlIiwia25vd25MZW5ndGgiLCJmaWxlbmFtZSIsIkJ1ZmZlciIsImlzQnVmZmVyIiwibm9kZUZvcm1EYXRhIiwicHJlcGFyZWREYXRhIiwiZnJvbSIsImFwcGVuZCIsImJyb3dzZXJGb3JtRGF0YSIsInByb3BlcnR5TmFtZSIsInZhbHVlIiwiYXBwZW5kRmlsZVRvRkQiLCJvcmlnaW5hbEtleSIsIm9iaiIsImlzU3RyZWFtRGF0YSIsIm9iakRhdGEiLCJnZXRBdHRhY2htZW50T3B0aW9ucyIsImlzTm9kZUZvcm1EYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsInBpcGUiLCJGb3JtRGF0YSIsIk1haWxndW4iLCJjbGllbnRfMSIsIlN1cHByZXNzaW9uTW9kZWxzIiwiSXBQb29sc0NsaWVudCIsInBhcnNlSXBQb29sc1Jlc3BvbnNlIiwicG9vbElkIiwicGF0Y2hXaXRoRkQiLCJJcHNDbGllbnQiLCJwYXJzZUlwc1Jlc3BvbnNlIiwibWVtYmVycyIsIkxpc3RzQ2xpZW50IiwidmFsaWRhdGlvblJlc3VsdCIsIm1haWxMaXN0QWRkcmVzcyIsImxpc3QiLCJwb3N0IiwicGFyc2VWYWxpZGF0aW9uUmVzdWx0IiwiTWFpbExpc3RzTWVtYmVycyIsIm5ld0RhdGEiLCJ2YXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsInN1YnNjcmliZWQiLCJhcGlSZXNwb25zZSIsIm1haWxMaXN0TWVtYmVyQWRkcmVzcyIsIm1lbWJlciIsInJlcURhdGEiLCJjaGVja0FuZFVwZGF0ZURhdGEiLCJ1cHNlcnQiLCJNZXNzYWdlc0NsaWVudCIsInllc05vUHJvcGVydGllcyIsIlNldCIsIl9wYXJzZVJlc3BvbnNlIiwibW9kaWZpZWREYXRhIiwicHJlcGFyZUJvb2xlYW5WYWx1ZXMiLCJNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJoYW5kbGVSZXNwb25zZSIsImxpc3RJZCIsInJlc3BvbnNlU3RhdHVzQ29kZSIsIm11bHRpcGxlVmFsaWRhdGlvbkRhdGEiLCJtdWx0aXBsZVZhbGlkYXRpb25GaWxlIiwiZmlsZSIsInRpbWVvdXQiLCJoZWFkZXJzIiwiZm9ybURhdGFCdWlsZGVyIiwiZm9ybURhdGFCdWlsZGVyXzEiLCJtYXhCb2R5TGVuZ3RoIiwiUmVxdWVzdCIsIm1ldGhvZCIsIm9uQ2FsbE9wdGlvbnMiLCJiYXNpYyIsImJhc2U2NCIsImVuY29kZSIsIm9uQ2FsbEhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwicGFyYW1zIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIlVSTFNlYXJjaFBhcmFtcyIsInVybFZhbHVlIiwiYXhpb3NfMSIsInRvTG9jYWxlVXBwZXJDYXNlIiwiX2QiLCJlcnJvclJlc3BvbnNlIiwiZXJyXzEiLCJjb2RlIiwiX2MiLCJnZXRSZXNwb25zZUJvZHkiLCJhZGREZWZhdWx0SGVhZGVycyIsInJlcXVlc3RPcHRpb25zIiwiY29tbWFuZCIsImNyZWF0ZUZvcm1EYXRhIiwiUm91dGVzQ2xpZW50Iiwicm91dGUiLCJTdGF0c0NsaWVudCIsImFycmF5V2l0aFBhaXJzIiwiY3VycmVudFBhaXIiLCJyZXBlYXRlZFByb3BlcnR5IiwicHVzaCIsIlN0YXRzIiwicHJlcGFyZVNlYXJjaFBhcmFtcyIsIl9wYXJzZVN0YXRzIiwiY3JlYXRlT3B0aW9ucyIsIlN1cHJlc3Npb25zXzEiLCJCT1VOQ0VTIiwiYWRkcmVzcyIsIlN1cHByZXNzaW9uIiwiQ09NUExBSU5UUyIsIlVOU1VCU0NSSUJFUyIsInRhZ3MiLCJXSElURUxJU1RTIiwicmVhc29uIiwibW9kZWxzIiwiTWFwIiwic2V0IiwiQm91bmNlIiwiQ29tcGxhaW50IiwiVW5zdWJzY3JpYmUiLCJXaGl0ZUxpc3QiLCJTdXBwcmVzc2lvbkNsaWVudCIsIk1vZGVsIiwicHJlcGFyZVJlc3BvbnNlIiwiY2hlY2tUeXBlIiwibW9kZWwiLCJfcGFyc2VMaXN0IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiX3BhcnNlSXRlbSIsInBvc3REYXRhIiwiY3JlYXRlV2hpdGVMaXN0IiwibW9kdWxlIiwibXVsdGlwbGVWYWxpZGF0aW9uIiwiVmFsaWRhdGVDbGllbnQiLCJXZWJob29rQ2xpZW50Iiwid2ViaG9va1Jlc3BvbnNlIiwid2ViaG9vayIsInVybHMiLCJXZWJob29rIiwiX3BhcnNlV2ViaG9va0xpc3QiLCJfcGFyc2VXZWJob29rV2l0aElEIiwidGVzdCIsIl9wYXJzZVdlYmhvb2tUZXN0Il0sInNvdXJjZVJvb3QiOiIifQ==