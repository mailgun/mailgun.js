// mailgun.js v11.1.0 Copyright (c) 2025 Mailgun and contributors
define((function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : undefined, done: true };
        }
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var base64$1 = {exports: {}};

    /*! https://mths.be/base64 v1.0.0 by @mathias | MIT license */
    var base64 = base64$1.exports;

    var hasRequiredBase64;

    function requireBase64 () {
    	if (hasRequiredBase64) return base64$1.exports;
    	hasRequiredBase64 = 1;
    	(function (module, exports) {
    (function(root) {

    			// Detect free variables `exports`.
    			var freeExports = exports;

    			// Detect free variable `module`.
    			var freeModule = module &&
    				module.exports == freeExports && module;

    			// Detect free variable `global`, from Node.js or Browserified code, and use
    			// it as `root`.
    			var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
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
    			if (freeExports && !freeExports.nodeType) {
    				if (freeModule) { // in Node.js or RingoJS v0.8.0+
    					freeModule.exports = base64;
    				} else { // in Narwhal or RingoJS v0.7.0-
    					for (var key in base64) {
    						base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
    					}
    				}
    			} else { // in Rhino or a web browser
    				root.base64 = base64;
    			}

    		}(base64)); 
    	} (base64$1, base64$1.exports));
    	return base64$1.exports;
    }

    var base64Exports = requireBase64();

    var urlJoin$1 = {exports: {}};

    var urlJoin = urlJoin$1.exports;

    var hasRequiredUrlJoin;

    function requireUrlJoin () {
    	if (hasRequiredUrlJoin) return urlJoin$1.exports;
    	hasRequiredUrlJoin = 1;
    	(function (module) {
    		(function (name, context, definition) {
    		  if (module.exports) module.exports = definition();
    		  else context[name] = definition();
    		})('urljoin', urlJoin, function () {

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
    	} (urlJoin$1));
    	return urlJoin$1.exports;
    }

    var urlJoinExports = requireUrlJoin();
    var urljoin = /*@__PURE__*/getDefaultExportFromCjs(urlJoinExports);

    function bind(fn, thisArg) {
      return function wrap() {
        return fn.apply(thisArg, arguments);
      };
    }

    // utils is a library of generic helper functions non-specific to axios

    const {toString} = Object.prototype;
    const {getPrototypeOf} = Object;

    const kindOf = (cache => thing => {
        const str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    })(Object.create(null));

    const kindOfTest = (type) => {
      type = type.toLowerCase();
      return (thing) => kindOf(thing) === type
    };

    const typeOfTest = type => thing => typeof thing === type;

    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     *
     * @returns {boolean} True if value is an Array, otherwise false
     */
    const {isArray} = Array;

    /**
     * Determine if a value is undefined
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if the value is undefined, otherwise false
     */
    const isUndefined = typeOfTest('undefined');

    /**
     * Determine if a value is a Buffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Buffer, otherwise false
     */
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
        && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
    }

    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    const isArrayBuffer = kindOfTest('ArrayBuffer');


    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */
    function isArrayBufferView(val) {
      let result;
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
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a String, otherwise false
     */
    const isString = typeOfTest('string');

    /**
     * Determine if a value is a Function
     *
     * @param {*} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */
    const isFunction = typeOfTest('function');

    /**
     * Determine if a value is a Number
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Number, otherwise false
     */
    const isNumber = typeOfTest('number');

    /**
     * Determine if a value is an Object
     *
     * @param {*} thing The value to test
     *
     * @returns {boolean} True if value is an Object, otherwise false
     */
    const isObject = (thing) => thing !== null && typeof thing === 'object';

    /**
     * Determine if a value is a Boolean
     *
     * @param {*} thing The value to test
     * @returns {boolean} True if value is a Boolean, otherwise false
     */
    const isBoolean = thing => thing === true || thing === false;

    /**
     * Determine if a value is a plain Object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a plain Object, otherwise false
     */
    const isPlainObject = (val) => {
      if (kindOf(val) !== 'object') {
        return false;
      }

      const prototype = getPrototypeOf(val);
      return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
    };

    /**
     * Determine if a value is a Date
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Date, otherwise false
     */
    const isDate = kindOfTest('Date');

    /**
     * Determine if a value is a File
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a File, otherwise false
     */
    const isFile = kindOfTest('File');

    /**
     * Determine if a value is a Blob
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Blob, otherwise false
     */
    const isBlob = kindOfTest('Blob');

    /**
     * Determine if a value is a FileList
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a File, otherwise false
     */
    const isFileList = kindOfTest('FileList');

    /**
     * Determine if a value is a Stream
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a Stream, otherwise false
     */
    const isStream = (val) => isObject(val) && isFunction(val.pipe);

    /**
     * Determine if a value is a FormData
     *
     * @param {*} thing The value to test
     *
     * @returns {boolean} True if value is an FormData, otherwise false
     */
    const isFormData = (thing) => {
      let kind;
      return thing && (
        (typeof FormData === 'function' && thing instanceof FormData) || (
          isFunction(thing.append) && (
            (kind = kindOf(thing)) === 'formdata' ||
            // detect form-data instance
            (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
          )
        )
      )
    };

    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */
    const isURLSearchParams = kindOfTest('URLSearchParams');

    const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     *
     * @returns {String} The String freed of excess whitespace
     */
    const trim = (str) => str.trim ?
      str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

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
     *
     * @param {Boolean} [allOwnKeys = false]
     * @returns {any}
     */
    function forEach(obj, fn, {allOwnKeys = false} = {}) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      }

      let i;
      let l;

      // Force an array if not already something iterable
      if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (isArray(obj)) {
        // Iterate over array values
        for (i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        const len = keys.length;
        let key;

        for (i = 0; i < len; i++) {
          key = keys[i];
          fn.call(null, obj[key], key, obj);
        }
      }
    }

    function findKey(obj, key) {
      key = key.toLowerCase();
      const keys = Object.keys(obj);
      let i = keys.length;
      let _key;
      while (i-- > 0) {
        _key = keys[i];
        if (key === _key.toLowerCase()) {
          return _key;
        }
      }
      return null;
    }

    const _global = (() => {
      /*eslint no-undef:0*/
      if (typeof globalThis !== "undefined") return globalThis;
      return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
    })();

    const isContextDefined = (context) => !isUndefined(context) && context !== _global;

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
     *
     * @returns {Object} Result of all merge properties
     */
    function merge(/* obj1, obj2, obj3, ... */) {
      const {caseless} = isContextDefined(this) && this || {};
      const result = {};
      const assignValue = (val, key) => {
        const targetKey = caseless && findKey(result, key) || key;
        if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
          result[targetKey] = merge(result[targetKey], val);
        } else if (isPlainObject(val)) {
          result[targetKey] = merge({}, val);
        } else if (isArray(val)) {
          result[targetKey] = val.slice();
        } else {
          result[targetKey] = val;
        }
      };

      for (let i = 0, l = arguments.length; i < l; i++) {
        arguments[i] && forEach(arguments[i], assignValue);
      }
      return result;
    }

    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     *
     * @param {Boolean} [allOwnKeys]
     * @returns {Object} The resulting value of object a
     */
    const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
      forEach(b, (val, key) => {
        if (thisArg && isFunction(val)) {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      }, {allOwnKeys});
      return a;
    };

    /**
     * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
     *
     * @param {string} content with BOM
     *
     * @returns {string} content value without BOM
     */
    const stripBOM = (content) => {
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }
      return content;
    };

    /**
     * Inherit the prototype methods from one constructor into another
     * @param {function} constructor
     * @param {function} superConstructor
     * @param {object} [props]
     * @param {object} [descriptors]
     *
     * @returns {void}
     */
    const inherits = (constructor, superConstructor, props, descriptors) => {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      Object.defineProperty(constructor, 'super', {
        value: superConstructor.prototype
      });
      props && Object.assign(constructor.prototype, props);
    };

    /**
     * Resolve object with deep prototype chain to a flat object
     * @param {Object} sourceObj source object
     * @param {Object} [destObj]
     * @param {Function|Boolean} [filter]
     * @param {Function} [propFilter]
     *
     * @returns {Object}
     */
    const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
      let props;
      let i;
      let prop;
      const merged = {};

      destObj = destObj || {};
      // eslint-disable-next-line no-eq-null,eqeqeq
      if (sourceObj == null) return destObj;

      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while (i-- > 0) {
          prop = props[i];
          if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = filter !== false && getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

      return destObj;
    };

    /**
     * Determines whether a string ends with the characters of a specified string
     *
     * @param {String} str
     * @param {String} searchString
     * @param {Number} [position= 0]
     *
     * @returns {boolean}
     */
    const endsWith = (str, searchString, position) => {
      str = String(str);
      if (position === undefined || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      const lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };


    /**
     * Returns new array from array like object or null if failed
     *
     * @param {*} [thing]
     *
     * @returns {?Array}
     */
    const toArray = (thing) => {
      if (!thing) return null;
      if (isArray(thing)) return thing;
      let i = thing.length;
      if (!isNumber(i)) return null;
      const arr = new Array(i);
      while (i-- > 0) {
        arr[i] = thing[i];
      }
      return arr;
    };

    /**
     * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
     * thing passed in is an instance of Uint8Array
     *
     * @param {TypedArray}
     *
     * @returns {Array}
     */
    // eslint-disable-next-line func-names
    const isTypedArray = (TypedArray => {
      // eslint-disable-next-line func-names
      return thing => {
        return TypedArray && thing instanceof TypedArray;
      };
    })(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

    /**
     * For each entry in the object, call the function with the key and value.
     *
     * @param {Object<any, any>} obj - The object to iterate over.
     * @param {Function} fn - The function to call for each entry.
     *
     * @returns {void}
     */
    const forEachEntry = (obj, fn) => {
      const generator = obj && obj[Symbol.iterator];

      const iterator = generator.call(obj);

      let result;

      while ((result = iterator.next()) && !result.done) {
        const pair = result.value;
        fn.call(obj, pair[0], pair[1]);
      }
    };

    /**
     * It takes a regular expression and a string, and returns an array of all the matches
     *
     * @param {string} regExp - The regular expression to match against.
     * @param {string} str - The string to search.
     *
     * @returns {Array<boolean>}
     */
    const matchAll = (regExp, str) => {
      let matches;
      const arr = [];

      while ((matches = regExp.exec(str)) !== null) {
        arr.push(matches);
      }

      return arr;
    };

    /* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
    const isHTMLForm = kindOfTest('HTMLFormElement');

    const toCamelCase = str => {
      return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
        function replacer(m, p1, p2) {
          return p1.toUpperCase() + p2;
        }
      );
    };

    /* Creating a function that will check if an object has a property. */
    const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

    /**
     * Determine if a value is a RegExp object
     *
     * @param {*} val The value to test
     *
     * @returns {boolean} True if value is a RegExp object, otherwise false
     */
    const isRegExp = kindOfTest('RegExp');

    const reduceDescriptors = (obj, reducer) => {
      const descriptors = Object.getOwnPropertyDescriptors(obj);
      const reducedDescriptors = {};

      forEach(descriptors, (descriptor, name) => {
        let ret;
        if ((ret = reducer(descriptor, name, obj)) !== false) {
          reducedDescriptors[name] = ret || descriptor;
        }
      });

      Object.defineProperties(obj, reducedDescriptors);
    };

    /**
     * Makes all methods read-only
     * @param {Object} obj
     */

    const freezeMethods = (obj) => {
      reduceDescriptors(obj, (descriptor, name) => {
        // skip restricted props in strict mode
        if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
          return false;
        }

        const value = obj[name];

        if (!isFunction(value)) return;

        descriptor.enumerable = false;

        if ('writable' in descriptor) {
          descriptor.writable = false;
          return;
        }

        if (!descriptor.set) {
          descriptor.set = () => {
            throw Error('Can not rewrite read-only method \'' + name + '\'');
          };
        }
      });
    };

    const toObjectSet = (arrayOrString, delimiter) => {
      const obj = {};

      const define = (arr) => {
        arr.forEach(value => {
          obj[value] = true;
        });
      };

      isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

      return obj;
    };

    const noop = () => {};

    const toFiniteNumber = (value, defaultValue) => {
      return value != null && Number.isFinite(value = +value) ? value : defaultValue;
    };

    const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

    const DIGIT = '0123456789';

    const ALPHABET = {
      DIGIT,
      ALPHA,
      ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
    };

    const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
      let str = '';
      const {length} = alphabet;
      while (size--) {
        str += alphabet[Math.random() * length|0];
      }

      return str;
    };

    /**
     * If the thing is a FormData object, return true, otherwise return false.
     *
     * @param {unknown} thing - The thing to check.
     *
     * @returns {boolean}
     */
    function isSpecCompliantForm(thing) {
      return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
    }

    const toJSONObject = (obj) => {
      const stack = new Array(10);

      const visit = (source, i) => {

        if (isObject(source)) {
          if (stack.indexOf(source) >= 0) {
            return;
          }

          if(!('toJSON' in source)) {
            stack[i] = source;
            const target = isArray(source) ? [] : {};

            forEach(source, (value, key) => {
              const reducedValue = visit(value, i + 1);
              !isUndefined(reducedValue) && (target[key] = reducedValue);
            });

            stack[i] = undefined;

            return target;
          }
        }

        return source;
      };

      return visit(obj, 0);
    };

    const isAsyncFn = kindOfTest('AsyncFunction');

    const isThenable = (thing) =>
      thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

    // original code
    // https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

    const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
      if (setImmediateSupported) {
        return setImmediate;
      }

      return postMessageSupported ? ((token, callbacks) => {
        _global.addEventListener("message", ({source, data}) => {
          if (source === _global && data === token) {
            callbacks.length && callbacks.shift()();
          }
        }, false);

        return (cb) => {
          callbacks.push(cb);
          _global.postMessage(token, "*");
        }
      })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
    })(
      typeof setImmediate === 'function',
      isFunction(_global.postMessage)
    );

    const asap = typeof queueMicrotask !== 'undefined' ?
      queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

    // *********************

    var utils$1 = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isBoolean,
      isObject,
      isPlainObject,
      isReadableStream,
      isRequest,
      isResponse,
      isHeaders,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isRegExp,
      isFunction,
      isStream,
      isURLSearchParams,
      isTypedArray,
      isFileList,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      forEachEntry,
      matchAll,
      isHTMLForm,
      hasOwnProperty,
      hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
      reduceDescriptors,
      freezeMethods,
      toObjectSet,
      toCamelCase,
      noop,
      toFiniteNumber,
      findKey,
      global: _global,
      isContextDefined,
      ALPHABET,
      generateString,
      isSpecCompliantForm,
      toJSONObject,
      isAsyncFn,
      isThenable,
      setImmediate: _setImmediate,
      asap
    };

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [config] The config.
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     *
     * @returns {Error} The created error.
     */
    function AxiosError$1(message, code, config, request, response) {
      Error.call(this);

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = (new Error()).stack;
      }

      this.message = message;
      this.name = 'AxiosError';
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      if (response) {
        this.response = response;
        this.status = response.status ? response.status : null;
      }
    }

    utils$1.inherits(AxiosError$1, Error, {
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
          config: utils$1.toJSONObject(this.config),
          code: this.code,
          status: this.status
        };
      }
    });

    const prototype$1 = AxiosError$1.prototype;
    const descriptors = {};

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
      'ERR_CANCELED',
      'ERR_NOT_SUPPORT',
      'ERR_INVALID_URL'
    // eslint-disable-next-line func-names
    ].forEach(code => {
      descriptors[code] = {value: code};
    });

    Object.defineProperties(AxiosError$1, descriptors);
    Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

    // eslint-disable-next-line func-names
    AxiosError$1.from = (error, code, config, request, response, customProps) => {
      const axiosError = Object.create(prototype$1);

      utils$1.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      }, prop => {
        return prop !== 'isAxiosError';
      });

      AxiosError$1.call(axiosError, error.message, code, config, request, response);

      axiosError.cause = error;

      axiosError.name = error.name;

      customProps && Object.assign(axiosError, customProps);

      return axiosError;
    };

    // eslint-disable-next-line strict
    var httpAdapter = null;

    /**
     * Determines if the given thing is a array or js object.
     *
     * @param {string} thing - The object or array to be visited.
     *
     * @returns {boolean}
     */
    function isVisitable(thing) {
      return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
    }

    /**
     * It removes the brackets from the end of a string
     *
     * @param {string} key - The key of the parameter.
     *
     * @returns {string} the key without the brackets.
     */
    function removeBrackets(key) {
      return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
    }

    /**
     * It takes a path, a key, and a boolean, and returns a string
     *
     * @param {string} path - The path to the current key.
     * @param {string} key - The key of the current object being iterated over.
     * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
     *
     * @returns {string} The path to the current key.
     */
    function renderKey(path, key, dots) {
      if (!path) return key;
      return path.concat(key).map(function each(token, i) {
        // eslint-disable-next-line no-param-reassign
        token = removeBrackets(token);
        return !dots && i ? '[' + token + ']' : token;
      }).join(dots ? '.' : '');
    }

    /**
     * If the array is an array and none of its elements are visitable, then it's a flat array.
     *
     * @param {Array<any>} arr - The array to check
     *
     * @returns {boolean}
     */
    function isFlatArray(arr) {
      return utils$1.isArray(arr) && !arr.some(isVisitable);
    }

    const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
      return /^is[A-Z]/.test(prop);
    });

    /**
     * Convert a data object to FormData
     *
     * @param {Object} obj
     * @param {?Object} [formData]
     * @param {?Object} [options]
     * @param {Function} [options.visitor]
     * @param {Boolean} [options.metaTokens = true]
     * @param {Boolean} [options.dots = false]
     * @param {?Boolean} [options.indexes = false]
     *
     * @returns {Object}
     **/

    /**
     * It converts an object into a FormData object
     *
     * @param {Object<any, any>} obj - The object to convert to form data.
     * @param {string} formData - The FormData object to append to.
     * @param {Object<string, any>} options
     *
     * @returns
     */
    function toFormData$1(obj, formData, options) {
      if (!utils$1.isObject(obj)) {
        throw new TypeError('target must be an object');
      }

      // eslint-disable-next-line no-param-reassign
      formData = formData || new (FormData)();

      // eslint-disable-next-line no-param-reassign
      options = utils$1.toFlatObject(options, {
        metaTokens: true,
        dots: false,
        indexes: false
      }, false, function defined(option, source) {
        // eslint-disable-next-line no-eq-null,eqeqeq
        return !utils$1.isUndefined(source[option]);
      });

      const metaTokens = options.metaTokens;
      // eslint-disable-next-line no-use-before-define
      const visitor = options.visitor || defaultVisitor;
      const dots = options.dots;
      const indexes = options.indexes;
      const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
      const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

      if (!utils$1.isFunction(visitor)) {
        throw new TypeError('visitor must be a function');
      }

      function convertValue(value) {
        if (value === null) return '';

        if (utils$1.isDate(value)) {
          return value.toISOString();
        }

        if (!useBlob && utils$1.isBlob(value)) {
          throw new AxiosError$1('Blob is not supported. Use a Buffer instead.');
        }

        if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
          return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
        }

        return value;
      }

      /**
       * Default visitor.
       *
       * @param {*} value
       * @param {String|Number} key
       * @param {Array<String|Number>} path
       * @this {FormData}
       *
       * @returns {boolean} return true to visit the each prop of the value recursively
       */
      function defaultVisitor(value, key, path) {
        let arr = value;

        if (value && !path && typeof value === 'object') {
          if (utils$1.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            key = metaTokens ? key : key.slice(0, -2);
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (
            (utils$1.isArray(value) && isFlatArray(value)) ||
            ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
            )) {
            // eslint-disable-next-line no-param-reassign
            key = removeBrackets(key);

            arr.forEach(function each(el, index) {
              !(utils$1.isUndefined(el) || el === null) && formData.append(
                // eslint-disable-next-line no-nested-ternary
                indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
                convertValue(el)
              );
            });
            return false;
          }
        }

        if (isVisitable(value)) {
          return true;
        }

        formData.append(renderKey(path, key, dots), convertValue(value));

        return false;
      }

      const stack = [];

      const exposedHelpers = Object.assign(predicates, {
        defaultVisitor,
        convertValue,
        isVisitable
      });

      function build(value, path) {
        if (utils$1.isUndefined(value)) return;

        if (stack.indexOf(value) !== -1) {
          throw Error('Circular reference detected in ' + path.join('.'));
        }

        stack.push(value);

        utils$1.forEach(value, function each(el, key) {
          const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
            formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
          );

          if (result === true) {
            build(el, path ? path.concat(key) : [key]);
          }
        });

        stack.pop();
      }

      if (!utils$1.isObject(obj)) {
        throw new TypeError('data must be an object');
      }

      build(obj);

      return formData;
    }

    /**
     * It encodes a string by replacing all characters that are not in the unreserved set with
     * their percent-encoded equivalents
     *
     * @param {string} str - The string to encode.
     *
     * @returns {string} The encoded string.
     */
    function encode$1(str) {
      const charMap = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\x00'
      };
      return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
        return charMap[match];
      });
    }

    /**
     * It takes a params object and converts it to a FormData object
     *
     * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
     * @param {Object<string, any>} options - The options object passed to the Axios constructor.
     *
     * @returns {void}
     */
    function AxiosURLSearchParams(params, options) {
      this._pairs = [];

      params && toFormData$1(params, this, options);
    }

    const prototype = AxiosURLSearchParams.prototype;

    prototype.append = function append(name, value) {
      this._pairs.push([name, value]);
    };

    prototype.toString = function toString(encoder) {
      const _encode = encoder ? function(value) {
        return encoder.call(this, value, encode$1);
      } : encode$1;

      return this._pairs.map(function each(pair) {
        return _encode(pair[0]) + '=' + _encode(pair[1]);
      }, '').join('&');
    };

    /**
     * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
     * URI encoded counterparts
     *
     * @param {string} val The value to be encoded.
     *
     * @returns {string} The encoded value.
     */
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
     * @param {?(object|Function)} options
     *
     * @returns {string} The formatted url
     */
    function buildURL(url, params, options) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }
      
      const _encode = options && options.encode || encode;

      if (utils$1.isFunction(options)) {
        options = {
          serialize: options
        };
      } 

      const serializeFn = options && options.serialize;

      let serializedParams;

      if (serializeFn) {
        serializedParams = serializeFn(params, options);
      } else {
        serializedParams = utils$1.isURLSearchParams(params) ?
          params.toString() :
          new AxiosURLSearchParams(params, options).toString(_encode);
      }

      if (serializedParams) {
        const hashmarkIndex = url.indexOf("#");

        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }

      return url;
    }

    class InterceptorManager {
      constructor() {
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
      use(fulfilled, rejected, options) {
        this.handlers.push({
          fulfilled,
          rejected,
          synchronous: options ? options.synchronous : false,
          runWhen: options ? options.runWhen : null
        });
        return this.handlers.length - 1;
      }

      /**
       * Remove an interceptor from the stack
       *
       * @param {Number} id The ID that was returned by `use`
       *
       * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
       */
      eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      }

      /**
       * Clear all interceptors from the stack
       *
       * @returns {void}
       */
      clear() {
        if (this.handlers) {
          this.handlers = [];
        }
      }

      /**
       * Iterate over all the registered interceptors
       *
       * This method is particularly useful for skipping over any
       * interceptors that may have become `null` calling `eject`.
       *
       * @param {Function} fn The function to call for each interceptor
       *
       * @returns {void}
       */
      forEach(fn) {
        utils$1.forEach(this.handlers, function forEachHandler(h) {
          if (h !== null) {
            fn(h);
          }
        });
      }
    }

    var transitionalDefaults = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };

    var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

    var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

    var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

    var platform$1 = {
      isBrowser: true,
      classes: {
        URLSearchParams: URLSearchParams$1,
        FormData: FormData$1,
        Blob: Blob$1
      },
      protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
    };

    const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

    const _navigator = typeof navigator === 'object' && navigator || undefined;

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
     *
     * @returns {boolean}
     */
    const hasStandardBrowserEnv = hasBrowserEnv &&
      (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

    /**
     * Determine if we're running in a standard browser webWorker environment
     *
     * Although the `isStandardBrowserEnv` method indicates that
     * `allows axios to run in a web worker`, the WebWorker will still be
     * filtered out due to its judgment standard
     * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
     * This leads to a problem when axios post `FormData` in webWorker
     */
    const hasStandardBrowserWebWorkerEnv = (() => {
      return (
        typeof WorkerGlobalScope !== 'undefined' &&
        // eslint-disable-next-line no-undef
        self instanceof WorkerGlobalScope &&
        typeof self.importScripts === 'function'
      );
    })();

    const origin = hasBrowserEnv && window.location.href || 'http://localhost';

    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        hasBrowserEnv: hasBrowserEnv,
        hasStandardBrowserEnv: hasStandardBrowserEnv,
        hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
        navigator: _navigator,
        origin: origin
    });

    var platform = {
      ...utils,
      ...platform$1
    };

    function toURLEncodedForm(data, options) {
      return toFormData$1(data, new platform.classes.URLSearchParams(), Object.assign({
        visitor: function(value, key, path, helpers) {
          if (platform.isNode && utils$1.isBuffer(value)) {
            this.append(key, value.toString('base64'));
            return false;
          }

          return helpers.defaultVisitor.apply(this, arguments);
        }
      }, options));
    }

    /**
     * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
     *
     * @param {string} name - The name of the property to get.
     *
     * @returns An array of strings.
     */
    function parsePropPath(name) {
      // foo[x][y][z]
      // foo.x.y.z
      // foo-x-y-z
      // foo x y z
      return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
        return match[0] === '[]' ? '' : match[1] || match[0];
      });
    }

    /**
     * Convert an array to an object.
     *
     * @param {Array<any>} arr - The array to convert to an object.
     *
     * @returns An object with the same keys and values as the array.
     */
    function arrayToObject(arr) {
      const obj = {};
      const keys = Object.keys(arr);
      let i;
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        obj[key] = arr[key];
      }
      return obj;
    }

    /**
     * It takes a FormData object and returns a JavaScript object
     *
     * @param {string} formData The FormData object to convert to JSON.
     *
     * @returns {Object<string, any> | null} The converted object.
     */
    function formDataToJSON(formData) {
      function buildPath(path, value, target, index) {
        let name = path[index++];

        if (name === '__proto__') return true;

        const isNumericKey = Number.isFinite(+name);
        const isLast = index >= path.length;
        name = !name && utils$1.isArray(target) ? target.length : name;

        if (isLast) {
          if (utils$1.hasOwnProp(target, name)) {
            target[name] = [target[name], value];
          } else {
            target[name] = value;
          }

          return !isNumericKey;
        }

        if (!target[name] || !utils$1.isObject(target[name])) {
          target[name] = [];
        }

        const result = buildPath(path, value, target[name], index);

        if (result && utils$1.isArray(target[name])) {
          target[name] = arrayToObject(target[name]);
        }

        return !isNumericKey;
      }

      if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
        const obj = {};

        utils$1.forEachEntry(formData, (name, value) => {
          buildPath(parsePropPath(name), value, obj, 0);
        });

        return obj;
      }

      return null;
    }

    /**
     * It takes a string, tries to parse it, and if it fails, it returns the stringified version
     * of the input
     *
     * @param {any} rawValue - The value to be stringified.
     * @param {Function} parser - A function that parses a string into a JavaScript object.
     * @param {Function} encoder - A function that takes a value and returns a string.
     *
     * @returns {string} A stringified version of the rawValue.
     */
    function stringifySafely(rawValue, parser, encoder) {
      if (utils$1.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils$1.trim(rawValue);
        } catch (e) {
          if (e.name !== 'SyntaxError') {
            throw e;
          }
        }
      }

      return (encoder || JSON.stringify)(rawValue);
    }

    const defaults = {

      transitional: transitionalDefaults,

      adapter: ['xhr', 'http', 'fetch'],

      transformRequest: [function transformRequest(data, headers) {
        const contentType = headers.getContentType() || '';
        const hasJSONContentType = contentType.indexOf('application/json') > -1;
        const isObjectPayload = utils$1.isObject(data);

        if (isObjectPayload && utils$1.isHTMLForm(data)) {
          data = new FormData(data);
        }

        const isFormData = utils$1.isFormData(data);

        if (isFormData) {
          return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
        }

        if (utils$1.isArrayBuffer(data) ||
          utils$1.isBuffer(data) ||
          utils$1.isStream(data) ||
          utils$1.isFile(data) ||
          utils$1.isBlob(data) ||
          utils$1.isReadableStream(data)
        ) {
          return data;
        }
        if (utils$1.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils$1.isURLSearchParams(data)) {
          headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
          return data.toString();
        }

        let isFileList;

        if (isObjectPayload) {
          if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
            return toURLEncodedForm(data, this.formSerializer).toString();
          }

          if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
            const _FormData = this.env && this.env.FormData;

            return toFormData$1(
              isFileList ? {'files[]': data} : data,
              _FormData && new _FormData(),
              this.formSerializer
            );
          }
        }

        if (isObjectPayload || hasJSONContentType ) {
          headers.setContentType('application/json', false);
          return stringifySafely(data);
        }

        return data;
      }],

      transformResponse: [function transformResponse(data) {
        const transitional = this.transitional || defaults.transitional;
        const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        const JSONRequested = this.responseType === 'json';

        if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
          return data;
        }

        if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
          const silentJSONParsing = transitional && transitional.silentJSONParsing;
          const strictJSONParsing = !silentJSONParsing && JSONRequested;

          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === 'SyntaxError') {
                throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
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
        FormData: platform.classes.FormData,
        Blob: platform.classes.Blob
      },

      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },

      headers: {
        common: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': undefined
        }
      }
    };

    utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
      defaults.headers[method] = {};
    });

    // RawAxiosHeaders whose duplicates are ignored by node
    // c.f. https://nodejs.org/api/http.html#http_message_headers
    const ignoreDuplicateOf = utils$1.toObjectSet([
      'age', 'authorization', 'content-length', 'content-type', 'etag',
      'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
      'last-modified', 'location', 'max-forwards', 'proxy-authorization',
      'referer', 'retry-after', 'user-agent'
    ]);

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
     * @param {String} rawHeaders Headers needing to be parsed
     *
     * @returns {Object} Headers parsed into an object
     */
    var parseHeaders = rawHeaders => {
      const parsed = {};
      let key;
      let val;
      let i;

      rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
        i = line.indexOf(':');
        key = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();

        if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
          return;
        }

        if (key === 'set-cookie') {
          if (parsed[key]) {
            parsed[key].push(val);
          } else {
            parsed[key] = [val];
          }
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      });

      return parsed;
    };

    const $internals = Symbol('internals');

    function normalizeHeader(header) {
      return header && String(header).trim().toLowerCase();
    }

    function normalizeValue(value) {
      if (value === false || value == null) {
        return value;
      }

      return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
    }

    function parseTokens(str) {
      const tokens = Object.create(null);
      const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
      let match;

      while ((match = tokensRE.exec(str))) {
        tokens[match[1]] = match[2];
      }

      return tokens;
    }

    const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

    function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
      if (utils$1.isFunction(filter)) {
        return filter.call(this, value, header);
      }

      if (isHeaderNameFilter) {
        value = header;
      }

      if (!utils$1.isString(value)) return;

      if (utils$1.isString(filter)) {
        return value.indexOf(filter) !== -1;
      }

      if (utils$1.isRegExp(filter)) {
        return filter.test(value);
      }
    }

    function formatHeader(header) {
      return header.trim()
        .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
          return char.toUpperCase() + str;
        });
    }

    function buildAccessors(obj, header) {
      const accessorName = utils$1.toCamelCase(' ' + header);

      ['get', 'set', 'has'].forEach(methodName => {
        Object.defineProperty(obj, methodName + accessorName, {
          value: function(arg1, arg2, arg3) {
            return this[methodName].call(this, header, arg1, arg2, arg3);
          },
          configurable: true
        });
      });
    }

    let AxiosHeaders$1 = class AxiosHeaders {
      constructor(headers) {
        headers && this.set(headers);
      }

      set(header, valueOrRewrite, rewrite) {
        const self = this;

        function setHeader(_value, _header, _rewrite) {
          const lHeader = normalizeHeader(_header);

          if (!lHeader) {
            throw new Error('header name must be a non-empty string');
          }

          const key = utils$1.findKey(self, lHeader);

          if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
            self[key || _header] = normalizeValue(_value);
          }
        }

        const setHeaders = (headers, _rewrite) =>
          utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

        if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
          setHeaders(header, valueOrRewrite);
        } else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
          setHeaders(parseHeaders(header), valueOrRewrite);
        } else if (utils$1.isHeaders(header)) {
          for (const [key, value] of header.entries()) {
            setHeader(value, key, rewrite);
          }
        } else {
          header != null && setHeader(valueOrRewrite, header, rewrite);
        }

        return this;
      }

      get(header, parser) {
        header = normalizeHeader(header);

        if (header) {
          const key = utils$1.findKey(this, header);

          if (key) {
            const value = this[key];

            if (!parser) {
              return value;
            }

            if (parser === true) {
              return parseTokens(value);
            }

            if (utils$1.isFunction(parser)) {
              return parser.call(this, value, key);
            }

            if (utils$1.isRegExp(parser)) {
              return parser.exec(value);
            }

            throw new TypeError('parser must be boolean|regexp|function');
          }
        }
      }

      has(header, matcher) {
        header = normalizeHeader(header);

        if (header) {
          const key = utils$1.findKey(this, header);

          return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
        }

        return false;
      }

      delete(header, matcher) {
        const self = this;
        let deleted = false;

        function deleteHeader(_header) {
          _header = normalizeHeader(_header);

          if (_header) {
            const key = utils$1.findKey(self, _header);

            if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
              delete self[key];

              deleted = true;
            }
          }
        }

        if (utils$1.isArray(header)) {
          header.forEach(deleteHeader);
        } else {
          deleteHeader(header);
        }

        return deleted;
      }

      clear(matcher) {
        const keys = Object.keys(this);
        let i = keys.length;
        let deleted = false;

        while (i--) {
          const key = keys[i];
          if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
            delete this[key];
            deleted = true;
          }
        }

        return deleted;
      }

      normalize(format) {
        const self = this;
        const headers = {};

        utils$1.forEach(this, (value, header) => {
          const key = utils$1.findKey(headers, header);

          if (key) {
            self[key] = normalizeValue(value);
            delete self[header];
            return;
          }

          const normalized = format ? formatHeader(header) : String(header).trim();

          if (normalized !== header) {
            delete self[header];
          }

          self[normalized] = normalizeValue(value);

          headers[normalized] = true;
        });

        return this;
      }

      concat(...targets) {
        return this.constructor.concat(this, ...targets);
      }

      toJSON(asStrings) {
        const obj = Object.create(null);

        utils$1.forEach(this, (value, header) => {
          value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
        });

        return obj;
      }

      [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
      }

      toString() {
        return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
      }

      get [Symbol.toStringTag]() {
        return 'AxiosHeaders';
      }

      static from(thing) {
        return thing instanceof this ? thing : new this(thing);
      }

      static concat(first, ...targets) {
        const computed = new this(first);

        targets.forEach((target) => computed.set(target));

        return computed;
      }

      static accessor(header) {
        const internals = this[$internals] = (this[$internals] = {
          accessors: {}
        });

        const accessors = internals.accessors;
        const prototype = this.prototype;

        function defineAccessor(_header) {
          const lHeader = normalizeHeader(_header);

          if (!accessors[lHeader]) {
            buildAccessors(prototype, _header);
            accessors[lHeader] = true;
          }
        }

        utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

        return this;
      }
    };

    AxiosHeaders$1.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

    // reserved names hotfix
    utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({value}, key) => {
      let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
      return {
        get: () => value,
        set(headerValue) {
          this[mapped] = headerValue;
        }
      }
    });

    utils$1.freezeMethods(AxiosHeaders$1);

    /**
     * Transform the data for a request or a response
     *
     * @param {Array|Function} fns A single function or Array of functions
     * @param {?Object} response The response object
     *
     * @returns {*} The resulting transformed data
     */
    function transformData(fns, response) {
      const config = this || defaults;
      const context = response || config;
      const headers = AxiosHeaders$1.from(context.headers);
      let data = context.data;

      utils$1.forEach(fns, function transform(fn) {
        data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
      });

      headers.normalize();

      return data;
    }

    function isCancel$1(value) {
      return !!(value && value.__CANCEL__);
    }

    /**
     * A `CanceledError` is an object that is thrown when an operation is canceled.
     *
     * @param {string=} message The message.
     * @param {Object=} config The config.
     * @param {Object=} request The request.
     *
     * @returns {CanceledError} The created error.
     */
    function CanceledError$1(message, config, request) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      AxiosError$1.call(this, message == null ? 'canceled' : message, AxiosError$1.ERR_CANCELED, config, request);
      this.name = 'CanceledError';
    }

    utils$1.inherits(CanceledError$1, AxiosError$1, {
      __CANCEL__: true
    });

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     *
     * @returns {object} The response.
     */
    function settle(resolve, reject, response) {
      const validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError$1(
          'Request failed with status code ' + response.status,
          [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    }

    function parseProtocol(url) {
      const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
      return match && match[1] || '';
    }

    /**
     * Calculate data maxRate
     * @param {Number} [samplesCount= 10]
     * @param {Number} [min= 1000]
     * @returns {Function}
     */
    function speedometer(samplesCount, min) {
      samplesCount = samplesCount || 10;
      const bytes = new Array(samplesCount);
      const timestamps = new Array(samplesCount);
      let head = 0;
      let tail = 0;
      let firstSampleTS;

      min = min !== undefined ? min : 1000;

      return function push(chunkLength) {
        const now = Date.now();

        const startedAt = timestamps[tail];

        if (!firstSampleTS) {
          firstSampleTS = now;
        }

        bytes[head] = chunkLength;
        timestamps[head] = now;

        let i = tail;
        let bytesCount = 0;

        while (i !== head) {
          bytesCount += bytes[i++];
          i = i % samplesCount;
        }

        head = (head + 1) % samplesCount;

        if (head === tail) {
          tail = (tail + 1) % samplesCount;
        }

        if (now - firstSampleTS < min) {
          return;
        }

        const passed = startedAt && now - startedAt;

        return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
      };
    }

    /**
     * Throttle decorator
     * @param {Function} fn
     * @param {Number} freq
     * @return {Function}
     */
    function throttle(fn, freq) {
      let timestamp = 0;
      let threshold = 1000 / freq;
      let lastArgs;
      let timer;

      const invoke = (args, now = Date.now()) => {
        timestamp = now;
        lastArgs = null;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        fn.apply(null, args);
      };

      const throttled = (...args) => {
        const now = Date.now();
        const passed = now - timestamp;
        if ( passed >= threshold) {
          invoke(args, now);
        } else {
          lastArgs = args;
          if (!timer) {
            timer = setTimeout(() => {
              timer = null;
              invoke(lastArgs);
            }, threshold - passed);
          }
        }
      };

      const flush = () => lastArgs && invoke(lastArgs);

      return [throttled, flush];
    }

    const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
      let bytesNotified = 0;
      const _speedometer = speedometer(50, 250);

      return throttle(e => {
        const loaded = e.loaded;
        const total = e.lengthComputable ? e.total : undefined;
        const progressBytes = loaded - bytesNotified;
        const rate = _speedometer(progressBytes);
        const inRange = loaded <= total;

        bytesNotified = loaded;

        const data = {
          loaded,
          total,
          progress: total ? (loaded / total) : undefined,
          bytes: progressBytes,
          rate: rate ? rate : undefined,
          estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
          event: e,
          lengthComputable: total != null,
          [isDownloadStream ? 'download' : 'upload']: true
        };

        listener(data);
      }, freq);
    };

    const progressEventDecorator = (total, throttled) => {
      const lengthComputable = total != null;

      return [(loaded) => throttled[0]({
        lengthComputable,
        total,
        loaded
      }), throttled[1]];
    };

    const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));

    var isURLSameOrigin = platform.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
      url = new URL(url, platform.origin);

      return (
        origin.protocol === url.protocol &&
        origin.host === url.host &&
        (isMSIE || origin.port === url.port)
      );
    })(
      new URL(platform.origin),
      platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
    ) : () => true;

    var cookies = platform.hasStandardBrowserEnv ?

      // Standard browser envs support document.cookie
      {
        write(name, value, expires, path, domain, secure) {
          const cookie = [name + '=' + encodeURIComponent(value)];

          utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

          utils$1.isString(path) && cookie.push('path=' + path);

          utils$1.isString(domain) && cookie.push('domain=' + domain);

          secure === true && cookie.push('secure');

          document.cookie = cookie.join('; ');
        },

        read(name) {
          const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      }

      :

      // Non-standard browser env (web workers, react-native) lack needed support.
      {
        write() {},
        read() {
          return null;
        },
        remove() {}
      };

    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     *
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */
    function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
    }

    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     *
     * @returns {string} The combined URL
     */
    function combineURLs(baseURL, relativeURL) {
      return relativeURL
        ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
    }

    /**
     * Creates a new URL by combining the baseURL with the requestedURL,
     * only when the requestedURL is not already an absolute URL.
     * If the requestURL is absolute, this function returns the requestedURL untouched.
     *
     * @param {string} baseURL The base URL
     * @param {string} requestedURL Absolute or relative URL to combine
     *
     * @returns {string} The combined full path
     */
    function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    }

    const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;

    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     *
     * @returns {Object} New object resulting from merging config2 to config1
     */
    function mergeConfig$1(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      const config = {};

      function getMergedValue(target, source, prop, caseless) {
        if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
          return utils$1.merge.call({caseless}, target, source);
        } else if (utils$1.isPlainObject(source)) {
          return utils$1.merge({}, source);
        } else if (utils$1.isArray(source)) {
          return source.slice();
        }
        return source;
      }

      // eslint-disable-next-line consistent-return
      function mergeDeepProperties(a, b, prop , caseless) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(a, b, prop , caseless);
        } else if (!utils$1.isUndefined(a)) {
          return getMergedValue(undefined, a, prop , caseless);
        }
      }

      // eslint-disable-next-line consistent-return
      function valueFromConfig2(a, b) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(undefined, b);
        }
      }

      // eslint-disable-next-line consistent-return
      function defaultToConfig2(a, b) {
        if (!utils$1.isUndefined(b)) {
          return getMergedValue(undefined, b);
        } else if (!utils$1.isUndefined(a)) {
          return getMergedValue(undefined, a);
        }
      }

      // eslint-disable-next-line consistent-return
      function mergeDirectKeys(a, b, prop) {
        if (prop in config2) {
          return getMergedValue(a, b);
        } else if (prop in config1) {
          return getMergedValue(undefined, a);
        }
      }

      const mergeMap = {
        url: valueFromConfig2,
        method: valueFromConfig2,
        data: valueFromConfig2,
        baseURL: defaultToConfig2,
        transformRequest: defaultToConfig2,
        transformResponse: defaultToConfig2,
        paramsSerializer: defaultToConfig2,
        timeout: defaultToConfig2,
        timeoutMessage: defaultToConfig2,
        withCredentials: defaultToConfig2,
        withXSRFToken: defaultToConfig2,
        adapter: defaultToConfig2,
        responseType: defaultToConfig2,
        xsrfCookieName: defaultToConfig2,
        xsrfHeaderName: defaultToConfig2,
        onUploadProgress: defaultToConfig2,
        onDownloadProgress: defaultToConfig2,
        decompress: defaultToConfig2,
        maxContentLength: defaultToConfig2,
        maxBodyLength: defaultToConfig2,
        beforeRedirect: defaultToConfig2,
        transport: defaultToConfig2,
        httpAgent: defaultToConfig2,
        httpsAgent: defaultToConfig2,
        cancelToken: defaultToConfig2,
        socketPath: defaultToConfig2,
        responseEncoding: defaultToConfig2,
        validateStatus: mergeDirectKeys,
        headers: (a, b , prop) => mergeDeepProperties(headersToObject(a), headersToObject(b),prop, true)
      };

      utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
        const merge = mergeMap[prop] || mergeDeepProperties;
        const configValue = merge(config1[prop], config2[prop], prop);
        (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
      });

      return config;
    }

    var resolveConfig = (config) => {
      const newConfig = mergeConfig$1({}, config);

      let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;

      newConfig.headers = headers = AxiosHeaders$1.from(headers);

      newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);

      // HTTP basic authentication
      if (auth) {
        headers.set('Authorization', 'Basic ' +
          btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
        );
      }

      let contentType;

      if (utils$1.isFormData(data)) {
        if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
          headers.setContentType(undefined); // Let the browser set it
        } else if ((contentType = headers.getContentType()) !== false) {
          // fix semicolon duplication issue for ReactNative FormData implementation
          const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
          headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
        }
      }

      // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.

      if (platform.hasStandardBrowserEnv) {
        withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

        if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(newConfig.url))) {
          // Add xsrf header
          const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

          if (xsrfValue) {
            headers.set(xsrfHeaderName, xsrfValue);
          }
        }
      }

      return newConfig;
    };

    const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

    var xhrAdapter = isXHRAdapterSupported && function (config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        const _config = resolveConfig(config);
        let requestData = _config.data;
        const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
        let {responseType, onUploadProgress, onDownloadProgress} = _config;
        let onCanceled;
        let uploadThrottled, downloadThrottled;
        let flushUpload, flushDownload;

        function done() {
          flushUpload && flushUpload(); // flush events
          flushDownload && flushDownload(); // flush events

          _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

          _config.signal && _config.signal.removeEventListener('abort', onCanceled);
        }

        let request = new XMLHttpRequest();

        request.open(_config.method.toUpperCase(), _config.url, true);

        // Set the request timeout in MS
        request.timeout = _config.timeout;

        function onloadend() {
          if (!request) {
            return;
          }
          // Prepare the response
          const responseHeaders = AxiosHeaders$1.from(
            'getAllResponseHeaders' in request && request.getAllResponseHeaders()
          );
          const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
            request.responseText : request.response;
          const response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
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

          reject(new AxiosError$1('Request aborted', AxiosError$1.ECONNABORTED, config, request));

          // Clean up request
          request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request));

          // Clean up request
          request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {
          let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
          const transitional = _config.transitional || transitionalDefaults;
          if (_config.timeoutErrorMessage) {
            timeoutErrorMessage = _config.timeoutErrorMessage;
          }
          reject(new AxiosError$1(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
            config,
            request));

          // Clean up request
          request = null;
        };

        // Remove Content-Type if data is undefined
        requestData === undefined && requestHeaders.setContentType(null);

        // Add headers to the request
        if ('setRequestHeader' in request) {
          utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
            request.setRequestHeader(key, val);
          });
        }

        // Add withCredentials to request if needed
        if (!utils$1.isUndefined(_config.withCredentials)) {
          request.withCredentials = !!_config.withCredentials;
        }

        // Add responseType to request if needed
        if (responseType && responseType !== 'json') {
          request.responseType = _config.responseType;
        }

        // Handle progress if needed
        if (onDownloadProgress) {
          ([downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true));
          request.addEventListener('progress', downloadThrottled);
        }

        // Not all browsers support upload events
        if (onUploadProgress && request.upload) {
          ([uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress));

          request.upload.addEventListener('progress', uploadThrottled);

          request.upload.addEventListener('loadend', flushUpload);
        }

        if (_config.cancelToken || _config.signal) {
          // Handle cancellation
          // eslint-disable-next-line func-names
          onCanceled = cancel => {
            if (!request) {
              return;
            }
            reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
            request.abort();
            request = null;
          };

          _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
          if (_config.signal) {
            _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
          }
        }

        const protocol = parseProtocol(_config.url);

        if (protocol && platform.protocols.indexOf(protocol) === -1) {
          reject(new AxiosError$1('Unsupported protocol ' + protocol + ':', AxiosError$1.ERR_BAD_REQUEST, config));
          return;
        }


        // Send the request
        request.send(requestData || null);
      });
    };

    const composeSignals = (signals, timeout) => {
      const {length} = (signals = signals ? signals.filter(Boolean) : []);

      if (timeout || length) {
        let controller = new AbortController();

        let aborted;

        const onabort = function (reason) {
          if (!aborted) {
            aborted = true;
            unsubscribe();
            const err = reason instanceof Error ? reason : this.reason;
            controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
          }
        };

        let timer = timeout && setTimeout(() => {
          timer = null;
          onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
        }, timeout);

        const unsubscribe = () => {
          if (signals) {
            timer && clearTimeout(timer);
            timer = null;
            signals.forEach(signal => {
              signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
            });
            signals = null;
          }
        };

        signals.forEach((signal) => signal.addEventListener('abort', onabort));

        const {signal} = controller;

        signal.unsubscribe = () => utils$1.asap(unsubscribe);

        return signal;
      }
    };

    const streamChunk = function* (chunk, chunkSize) {
      let len = chunk.byteLength;

      if (len < chunkSize) {
        yield chunk;
        return;
      }

      let pos = 0;
      let end;

      while (pos < len) {
        end = pos + chunkSize;
        yield chunk.slice(pos, end);
        pos = end;
      }
    };

    const readBytes = async function* (iterable, chunkSize) {
      for await (const chunk of readStream(iterable)) {
        yield* streamChunk(chunk, chunkSize);
      }
    };

    const readStream = async function* (stream) {
      if (stream[Symbol.asyncIterator]) {
        yield* stream;
        return;
      }

      const reader = stream.getReader();
      try {
        for (;;) {
          const {done, value} = await reader.read();
          if (done) {
            break;
          }
          yield value;
        }
      } finally {
        await reader.cancel();
      }
    };

    const trackStream = (stream, chunkSize, onProgress, onFinish) => {
      const iterator = readBytes(stream, chunkSize);

      let bytes = 0;
      let done;
      let _onFinish = (e) => {
        if (!done) {
          done = true;
          onFinish && onFinish(e);
        }
      };

      return new ReadableStream({
        async pull(controller) {
          try {
            const {done, value} = await iterator.next();

            if (done) {
             _onFinish();
              controller.close();
              return;
            }

            let len = value.byteLength;
            if (onProgress) {
              let loadedBytes = bytes += len;
              onProgress(loadedBytes);
            }
            controller.enqueue(new Uint8Array(value));
          } catch (err) {
            _onFinish(err);
            throw err;
          }
        },
        cancel(reason) {
          _onFinish(reason);
          return iterator.return();
        }
      }, {
        highWaterMark: 2
      })
    };

    const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
    const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

    // used only inside the fetch adapter
    const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
        ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
        async (str) => new Uint8Array(await new Response(str).arrayBuffer())
    );

    const test = (fn, ...args) => {
      try {
        return !!fn(...args);
      } catch (e) {
        return false
      }
    };

    const supportsRequestStream = isReadableStreamSupported && test(() => {
      let duplexAccessed = false;

      const hasContentType = new Request(platform.origin, {
        body: new ReadableStream(),
        method: 'POST',
        get duplex() {
          duplexAccessed = true;
          return 'half';
        },
      }).headers.has('Content-Type');

      return duplexAccessed && !hasContentType;
    });

    const DEFAULT_CHUNK_SIZE = 64 * 1024;

    const supportsResponseStream = isReadableStreamSupported &&
      test(() => utils$1.isReadableStream(new Response('').body));


    const resolvers = {
      stream: supportsResponseStream && ((res) => res.body)
    };

    isFetchSupported && (((res) => {
      ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
        !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res) => res[type]() :
          (_, config) => {
            throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
          });
      });
    })(new Response));

    const getBodyLength = async (body) => {
      if (body == null) {
        return 0;
      }

      if(utils$1.isBlob(body)) {
        return body.size;
      }

      if(utils$1.isSpecCompliantForm(body)) {
        const _request = new Request(platform.origin, {
          method: 'POST',
          body,
        });
        return (await _request.arrayBuffer()).byteLength;
      }

      if(utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
        return body.byteLength;
      }

      if(utils$1.isURLSearchParams(body)) {
        body = body + '';
      }

      if(utils$1.isString(body)) {
        return (await encodeText(body)).byteLength;
      }
    };

    const resolveBodyLength = async (headers, body) => {
      const length = utils$1.toFiniteNumber(headers.getContentLength());

      return length == null ? getBodyLength(body) : length;
    };

    var fetchAdapter = isFetchSupported && (async (config) => {
      let {
        url,
        method,
        data,
        signal,
        cancelToken,
        timeout,
        onDownloadProgress,
        onUploadProgress,
        responseType,
        headers,
        withCredentials = 'same-origin',
        fetchOptions
      } = resolveConfig(config);

      responseType = responseType ? (responseType + '').toLowerCase() : 'text';

      let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);

      let request;

      const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
          composedSignal.unsubscribe();
      });

      let requestContentLength;

      try {
        if (
          onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
          (requestContentLength = await resolveBodyLength(headers, data)) !== 0
        ) {
          let _request = new Request(url, {
            method: 'POST',
            body: data,
            duplex: "half"
          });

          let contentTypeHeader;

          if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
            headers.setContentType(contentTypeHeader);
          }

          if (_request.body) {
            const [onProgress, flush] = progressEventDecorator(
              requestContentLength,
              progressEventReducer(asyncDecorator(onUploadProgress))
            );

            data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
          }
        }

        if (!utils$1.isString(withCredentials)) {
          withCredentials = withCredentials ? 'include' : 'omit';
        }

        // Cloudflare Workers throws when credentials are defined
        // see https://github.com/cloudflare/workerd/issues/902
        const isCredentialsSupported = "credentials" in Request.prototype;
        request = new Request(url, {
          ...fetchOptions,
          signal: composedSignal,
          method: method.toUpperCase(),
          headers: headers.normalize().toJSON(),
          body: data,
          duplex: "half",
          credentials: isCredentialsSupported ? withCredentials : undefined
        });

        let response = await fetch(request);

        const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

        if (supportsResponseStream && (onDownloadProgress || (isStreamResponse && unsubscribe))) {
          const options = {};

          ['status', 'statusText', 'headers'].forEach(prop => {
            options[prop] = response[prop];
          });

          const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));

          const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
            responseContentLength,
            progressEventReducer(asyncDecorator(onDownloadProgress), true)
          ) || [];

          response = new Response(
            trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
              flush && flush();
              unsubscribe && unsubscribe();
            }),
            options
          );
        }

        responseType = responseType || 'text';

        let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);

        !isStreamResponse && unsubscribe && unsubscribe();

        return await new Promise((resolve, reject) => {
          settle(resolve, reject, {
            data: responseData,
            headers: AxiosHeaders$1.from(response.headers),
            status: response.status,
            statusText: response.statusText,
            config,
            request
          });
        })
      } catch (err) {
        unsubscribe && unsubscribe();

        if (err && err.name === 'TypeError' && /fetch/i.test(err.message)) {
          throw Object.assign(
            new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request),
            {
              cause: err.cause || err
            }
          )
        }

        throw AxiosError$1.from(err, err && err.code, config, request);
      }
    });

    const knownAdapters = {
      http: httpAdapter,
      xhr: xhrAdapter,
      fetch: fetchAdapter
    };

    utils$1.forEach(knownAdapters, (fn, value) => {
      if (fn) {
        try {
          Object.defineProperty(fn, 'name', {value});
        } catch (e) {
          // eslint-disable-next-line no-empty
        }
        Object.defineProperty(fn, 'adapterName', {value});
      }
    });

    const renderReason = (reason) => `- ${reason}`;

    const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

    var adapters = {
      getAdapter: (adapters) => {
        adapters = utils$1.isArray(adapters) ? adapters : [adapters];

        const {length} = adapters;
        let nameOrAdapter;
        let adapter;

        const rejectedReasons = {};

        for (let i = 0; i < length; i++) {
          nameOrAdapter = adapters[i];
          let id;

          adapter = nameOrAdapter;

          if (!isResolvedHandle(nameOrAdapter)) {
            adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

            if (adapter === undefined) {
              throw new AxiosError$1(`Unknown adapter '${id}'`);
            }
          }

          if (adapter) {
            break;
          }

          rejectedReasons[id || '#' + i] = adapter;
        }

        if (!adapter) {

          const reasons = Object.entries(rejectedReasons)
            .map(([id, state]) => `adapter ${id} ` +
              (state === false ? 'is not supported by the environment' : 'is not available in the build')
            );

          let s = length ?
            (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
            'as no adapter specified';

          throw new AxiosError$1(
            `There is no suitable adapter to dispatch the request ` + s,
            'ERR_NOT_SUPPORT'
          );
        }

        return adapter;
      },
      adapters: knownAdapters
    };

    /**
     * Throws a `CanceledError` if cancellation has been requested.
     *
     * @param {Object} config The config that is to be used for the request
     *
     * @returns {void}
     */
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }

      if (config.signal && config.signal.aborted) {
        throw new CanceledError$1(null, config);
      }
    }

    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    function dispatchRequest(config) {
      throwIfCancellationRequested(config);

      config.headers = AxiosHeaders$1.from(config.headers);

      // Transform request data
      config.data = transformData.call(
        config,
        config.transformRequest
      );

      if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
        config.headers.setContentType('application/x-www-form-urlencoded', false);
      }

      const adapter = adapters.getAdapter(config.adapter || defaults.adapter);

      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);

        // Transform response data
        response.data = transformData.call(
          config,
          config.transformResponse,
          response
        );

        response.headers = AxiosHeaders$1.from(response.headers);

        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel$1(reason)) {
          throwIfCancellationRequested(config);

          // Transform response data
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              config.transformResponse,
              reason.response
            );
            reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
          }
        }

        return Promise.reject(reason);
      });
    }

    const VERSION$1 = "1.7.9";

    const validators$1 = {};

    // eslint-disable-next-line func-names
    ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
      validators$1[type] = function validator(thing) {
        return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
      };
    });

    const deprecatedWarnings = {};

    /**
     * Transitional option validator
     *
     * @param {function|boolean?} validator - set to false if the transitional option has been removed
     * @param {string?} version - deprecated version / removed since version
     * @param {string?} message - some message with additional info
     *
     * @returns {function}
     */
    validators$1.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return '[Axios v' + VERSION$1 + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
      }

      // eslint-disable-next-line func-names
      return (value, opt, opts) => {
        if (validator === false) {
          throw new AxiosError$1(
            formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
            AxiosError$1.ERR_DEPRECATED
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

    validators$1.spelling = function spelling(correctSpelling) {
      return (value, opt) => {
        // eslint-disable-next-line no-console
        console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
        return true;
      }
    };

    /**
     * Assert object's properties type
     *
     * @param {object} options
     * @param {object} schema
     * @param {boolean?} allowUnknown
     *
     * @returns {object}
     */

    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== 'object') {
        throw new AxiosError$1('options must be an object', AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      const keys = Object.keys(options);
      let i = keys.length;
      while (i-- > 0) {
        const opt = keys[i];
        const validator = schema[opt];
        if (validator) {
          const value = options[opt];
          const result = value === undefined || validator(value, opt, options);
          if (result !== true) {
            throw new AxiosError$1('option ' + opt + ' must be ' + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError$1('Unknown option ' + opt, AxiosError$1.ERR_BAD_OPTION);
        }
      }
    }

    var validator = {
      assertOptions,
      validators: validators$1
    };

    const validators = validator.validators;

    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     *
     * @return {Axios} A new instance of Axios
     */
    let Axios$1 = class Axios {
      constructor(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
          request: new InterceptorManager(),
          response: new InterceptorManager()
        };
      }

      /**
       * Dispatch a request
       *
       * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
       * @param {?Object} config
       *
       * @returns {Promise} The Promise to be fulfilled
       */
      async request(configOrUrl, config) {
        try {
          return await this._request(configOrUrl, config);
        } catch (err) {
          if (err instanceof Error) {
            let dummy = {};

            Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

            // slice off the Error: ... line
            const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
            try {
              if (!err.stack) {
                err.stack = stack;
                // match without the 2 top stack lines
              } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
                err.stack += '\n' + stack;
              }
            } catch (e) {
              // ignore the case where "stack" is an un-writable property
            }
          }

          throw err;
        }
      }

      _request(configOrUrl, config) {
        /*eslint no-param-reassign:0*/
        // Allow for axios('example/url'[, config]) a la fetch API
        if (typeof configOrUrl === 'string') {
          config = config || {};
          config.url = configOrUrl;
        } else {
          config = configOrUrl || {};
        }

        config = mergeConfig$1(this.defaults, config);

        const {transitional, paramsSerializer, headers} = config;

        if (transitional !== undefined) {
          validator.assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
          }, false);
        }

        if (paramsSerializer != null) {
          if (utils$1.isFunction(paramsSerializer)) {
            config.paramsSerializer = {
              serialize: paramsSerializer
            };
          } else {
            validator.assertOptions(paramsSerializer, {
              encode: validators.function,
              serialize: validators.function
            }, true);
          }
        }

        validator.assertOptions(config, {
          baseUrl: validators.spelling('baseURL'),
          withXsrfToken: validators.spelling('withXSRFToken')
        }, true);

        // Set config.method
        config.method = (config.method || this.defaults.method || 'get').toLowerCase();

        // Flatten headers
        let contextHeaders = headers && utils$1.merge(
          headers.common,
          headers[config.method]
        );

        headers && utils$1.forEach(
          ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
          (method) => {
            delete headers[method];
          }
        );

        config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

        // filter out skipped interceptors
        const requestInterceptorChain = [];
        let synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
            return;
          }

          synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

          requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
        });

        const responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });

        let promise;
        let i = 0;
        let len;

        if (!synchronousRequestInterceptors) {
          const chain = [dispatchRequest.bind(this), undefined];
          chain.unshift.apply(chain, requestInterceptorChain);
          chain.push.apply(chain, responseInterceptorChain);
          len = chain.length;

          promise = Promise.resolve(config);

          while (i < len) {
            promise = promise.then(chain[i++], chain[i++]);
          }

          return promise;
        }

        len = requestInterceptorChain.length;

        let newConfig = config;

        i = 0;

        while (i < len) {
          const onFulfilled = requestInterceptorChain[i++];
          const onRejected = requestInterceptorChain[i++];
          try {
            newConfig = onFulfilled(newConfig);
          } catch (error) {
            onRejected.call(this, error);
            break;
          }
        }

        try {
          promise = dispatchRequest.call(this, newConfig);
        } catch (error) {
          return Promise.reject(error);
        }

        i = 0;
        len = responseInterceptorChain.length;

        while (i < len) {
          promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        }

        return promise;
      }

      getUri(config) {
        config = mergeConfig$1(this.defaults, config);
        const fullPath = buildFullPath(config.baseURL, config.url);
        return buildURL(fullPath, config.params, config.paramsSerializer);
      }
    };

    // Provide aliases for supported request methods
    utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios$1.prototype[method] = function(url, config) {
        return this.request(mergeConfig$1(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });

    utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/

      function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
          return this.request(mergeConfig$1(config || {}, {
            method,
            headers: isForm ? {
              'Content-Type': 'multipart/form-data'
            } : {},
            url,
            data
          }));
        };
      }

      Axios$1.prototype[method] = generateHTTPMethod();

      Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true);
    });

    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @param {Function} executor The executor function.
     *
     * @returns {CancelToken}
     */
    let CancelToken$1 = class CancelToken {
      constructor(executor) {
        if (typeof executor !== 'function') {
          throw new TypeError('executor must be a function.');
        }

        let resolvePromise;

        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });

        const token = this;

        // eslint-disable-next-line func-names
        this.promise.then(cancel => {
          if (!token._listeners) return;

          let i = token._listeners.length;

          while (i-- > 0) {
            token._listeners[i](cancel);
          }
          token._listeners = null;
        });

        // eslint-disable-next-line func-names
        this.promise.then = onfulfilled => {
          let _resolve;
          // eslint-disable-next-line func-names
          const promise = new Promise(resolve => {
            token.subscribe(resolve);
            _resolve = resolve;
          }).then(onfulfilled);

          promise.cancel = function reject() {
            token.unsubscribe(_resolve);
          };

          return promise;
        };

        executor(function cancel(message, config, request) {
          if (token.reason) {
            // Cancellation has already been requested
            return;
          }

          token.reason = new CanceledError$1(message, config, request);
          resolvePromise(token.reason);
        });
      }

      /**
       * Throws a `CanceledError` if cancellation has been requested.
       */
      throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      }

      /**
       * Subscribe to the cancel signal
       */

      subscribe(listener) {
        if (this.reason) {
          listener(this.reason);
          return;
        }

        if (this._listeners) {
          this._listeners.push(listener);
        } else {
          this._listeners = [listener];
        }
      }

      /**
       * Unsubscribe from the cancel signal
       */

      unsubscribe(listener) {
        if (!this._listeners) {
          return;
        }
        const index = this._listeners.indexOf(listener);
        if (index !== -1) {
          this._listeners.splice(index, 1);
        }
      }

      toAbortSignal() {
        const controller = new AbortController();

        const abort = (err) => {
          controller.abort(err);
        };

        this.subscribe(abort);

        controller.signal.unsubscribe = () => this.unsubscribe(abort);

        return controller.signal;
      }

      /**
       * Returns an object that contains a new `CancelToken` and a function that, when called,
       * cancels the `CancelToken`.
       */
      static source() {
        let cancel;
        const token = new CancelToken(function executor(c) {
          cancel = c;
        });
        return {
          token,
          cancel
        };
      }
    };

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
     *
     * @returns {Function}
     */
    function spread$1(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    }

    /**
     * Determines whether the payload is an error thrown by Axios
     *
     * @param {*} payload The value to test
     *
     * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
     */
    function isAxiosError$1(payload) {
      return utils$1.isObject(payload) && (payload.isAxiosError === true);
    }

    const HttpStatusCode$1 = {
      Continue: 100,
      SwitchingProtocols: 101,
      Processing: 102,
      EarlyHints: 103,
      Ok: 200,
      Created: 201,
      Accepted: 202,
      NonAuthoritativeInformation: 203,
      NoContent: 204,
      ResetContent: 205,
      PartialContent: 206,
      MultiStatus: 207,
      AlreadyReported: 208,
      ImUsed: 226,
      MultipleChoices: 300,
      MovedPermanently: 301,
      Found: 302,
      SeeOther: 303,
      NotModified: 304,
      UseProxy: 305,
      Unused: 306,
      TemporaryRedirect: 307,
      PermanentRedirect: 308,
      BadRequest: 400,
      Unauthorized: 401,
      PaymentRequired: 402,
      Forbidden: 403,
      NotFound: 404,
      MethodNotAllowed: 405,
      NotAcceptable: 406,
      ProxyAuthenticationRequired: 407,
      RequestTimeout: 408,
      Conflict: 409,
      Gone: 410,
      LengthRequired: 411,
      PreconditionFailed: 412,
      PayloadTooLarge: 413,
      UriTooLong: 414,
      UnsupportedMediaType: 415,
      RangeNotSatisfiable: 416,
      ExpectationFailed: 417,
      ImATeapot: 418,
      MisdirectedRequest: 421,
      UnprocessableEntity: 422,
      Locked: 423,
      FailedDependency: 424,
      TooEarly: 425,
      UpgradeRequired: 426,
      PreconditionRequired: 428,
      TooManyRequests: 429,
      RequestHeaderFieldsTooLarge: 431,
      UnavailableForLegalReasons: 451,
      InternalServerError: 500,
      NotImplemented: 501,
      BadGateway: 502,
      ServiceUnavailable: 503,
      GatewayTimeout: 504,
      HttpVersionNotSupported: 505,
      VariantAlsoNegotiates: 506,
      InsufficientStorage: 507,
      LoopDetected: 508,
      NotExtended: 510,
      NetworkAuthenticationRequired: 511,
    };

    Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
      HttpStatusCode$1[value] = key;
    });

    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     *
     * @returns {Axios} A new instance of Axios
     */
    function createInstance(defaultConfig) {
      const context = new Axios$1(defaultConfig);
      const instance = bind(Axios$1.prototype.request, context);

      // Copy axios.prototype to instance
      utils$1.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

      // Copy context to instance
      utils$1.extend(instance, context, null, {allOwnKeys: true});

      // Factory for creating new instances
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
      };

      return instance;
    }

    // Create the default instance to be exported
    const axios = createInstance(defaults);

    // Expose Axios class to allow class inheritance
    axios.Axios = Axios$1;

    // Expose Cancel & CancelToken
    axios.CanceledError = CanceledError$1;
    axios.CancelToken = CancelToken$1;
    axios.isCancel = isCancel$1;
    axios.VERSION = VERSION$1;
    axios.toFormData = toFormData$1;

    // Expose AxiosError class
    axios.AxiosError = AxiosError$1;

    // alias for CanceledError for backward compatibility
    axios.Cancel = axios.CanceledError;

    // Expose all/spread
    axios.all = function all(promises) {
      return Promise.all(promises);
    };

    axios.spread = spread$1;

    // Expose isAxiosError
    axios.isAxiosError = isAxiosError$1;

    // Expose mergeConfig
    axios.mergeConfig = mergeConfig$1;

    axios.AxiosHeaders = AxiosHeaders$1;

    axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

    axios.getAdapter = adapters.getAdapter;

    axios.HttpStatusCode = HttpStatusCode$1;

    axios.default = axios;

    // This module is intended to unwrap Axios default export as named.
    // Keep top-level export same with static properties
    // so that it can keep same with es module or cjs
    const {
      Axios,
      AxiosError,
      CanceledError,
      isCancel,
      CancelToken,
      VERSION,
      all,
      Cancel,
      isAxiosError,
      spread,
      toFormData,
      AxiosHeaders,
      HttpStatusCode,
      formToJSON,
      getAdapter,
      mergeConfig
    } = axios;

    var APIError = /** @class */ (function (_super) {
        __extends(APIError, _super);
        function APIError(_a) {
            var status = _a.status, statusText = _a.statusText, message = _a.message, _b = _a.body, body = _b === undefined ? {} : _b;
            var _this = this;
            var bodyMessage = '';
            var error = '';
            if (typeof body === 'string') {
                bodyMessage = body;
            }
            else {
                bodyMessage = (body === null || body === undefined ? undefined : body.message) || '';
                error = (body === null || body === undefined ? undefined : body.error) || '';
            }
            _this = _super.call(this) || this;
            _this.stack = '';
            _this.status = status;
            _this.message = message || error || statusText || '';
            _this.details = bodyMessage;
            _this.type = 'MailgunAPIError';
            return _this;
        }
        APIError.getUserDataError = function (statusText, message) {
            return new this({
                status: 400,
                statusText: statusText,
                body: {
                    message: message
                }
            });
        };
        return APIError;
    }(Error));

    var BlobFromStream = /** @class */ (function () {
        function BlobFromStream(stream, size) {
            this._stream = stream;
            this.size = size;
        }
        BlobFromStream.prototype.stream = function () {
            return this._stream;
        };
        Object.defineProperty(BlobFromStream.prototype, Symbol.toStringTag, {
            get: function () {
                return 'Blob';
            },
            enumerable: false,
            configurable: true
        });
        return BlobFromStream;
    }());
    var AttachmentsHandler = /** @class */ (function () {
        function AttachmentsHandler() {
        }
        AttachmentsHandler.prototype.getAttachmentOptions = function (item) {
            var filename = item.filename, contentType = item.contentType, knownLength = item.knownLength;
            return __assign(__assign(__assign({}, (filename ? { filename: filename } : { filename: 'file' })), (contentType && { contentType: contentType })), (knownLength && { knownLength: knownLength }));
        };
        AttachmentsHandler.prototype.getFileInfo = function (file) {
            var filename = file.name, contentType = file.type, knownLength = file.size;
            return this.getAttachmentOptions({ filename: filename, contentType: contentType, knownLength: knownLength });
        };
        AttachmentsHandler.prototype.getCustomFileInfo = function (file) {
            var filename = file.filename, contentType = file.contentType, knownLength = file.knownLength;
            return this.getAttachmentOptions({ filename: filename, contentType: contentType, knownLength: knownLength });
        };
        AttachmentsHandler.prototype.getBufferInfo = function (buffer) {
            var knownLength = buffer.byteLength;
            return this.getAttachmentOptions({ filename: 'file', contentType: '', knownLength: knownLength });
        };
        AttachmentsHandler.prototype.isStream = function (data) {
            return typeof data === 'object' && typeof data.pipe === 'function';
        };
        AttachmentsHandler.prototype.isCustomFile = function (obj) {
            return typeof obj === 'object'
                && !!obj.data;
        };
        AttachmentsHandler.prototype.isBrowserFile = function (obj) {
            return typeof obj === 'object' && (!!obj.name || (typeof Blob !== 'undefined' && obj instanceof Blob));
        };
        AttachmentsHandler.prototype.isBuffer = function (data) {
            return typeof Buffer !== 'undefined' && Buffer.isBuffer(data);
        };
        AttachmentsHandler.prototype.getAttachmentInfo = function (attachment) {
            var isBrowserFile = this.isBrowserFile(attachment);
            var isCustomFile = this.isCustomFile(attachment);
            var isString = typeof attachment === 'string';
            if (!isString) {
                if (isBrowserFile) {
                    return this.getFileInfo(attachment);
                }
                if (typeof Buffer !== 'undefined' && Buffer.isBuffer(attachment)) {
                    return this.getBufferInfo(attachment);
                }
                if (isCustomFile) {
                    return this.getCustomFileInfo(attachment);
                }
            }
            var options = {
                filename: 'file',
                contentType: undefined,
                knownLength: undefined
            };
            return options;
        };
        AttachmentsHandler.prototype.convertToFDexpectedShape = function (userProvidedValue) {
            var isStream = this.isStream(userProvidedValue);
            var isBrowserFile = this.isBrowserFile(userProvidedValue);
            var isCustomFile = this.isCustomFile(userProvidedValue);
            var isString = typeof userProvidedValue === 'string';
            var result;
            if (isStream || isString || isBrowserFile || this.isBuffer(userProvidedValue)) {
                result = userProvidedValue;
            }
            else if (isCustomFile) {
                result = userProvidedValue.data;
            }
            else {
                throw APIError.getUserDataError("Unknown attachment type ".concat(typeof userProvidedValue), "The \"attachment\" property expects either Buffer, Blob, or String.\n          Also, It is possible to provide an object that has the property \"data\" with a value that is equal to one of the types counted before.\n          Additionally, you may use an array to send more than one attachment.");
            }
            return result;
        };
        AttachmentsHandler.prototype.getBlobFromStream = function (stream, size) {
            return new BlobFromStream(stream, size);
        };
        return AttachmentsHandler;
    }());

    var FormDataBuilder = /** @class */ (function () {
        function FormDataBuilder(FormDataConstructor) {
            this.FormDataConstructor = FormDataConstructor;
            this.fileKeys = ['attachment', 'inline', 'multipleValidationFile'];
            this.attachmentsHandler = new AttachmentsHandler();
        }
        FormDataBuilder.prototype.createFormData = function (data) {
            var _this = this;
            if (!data) {
                throw new Error('Please provide data object');
            }
            var formData = Object.keys(data)
                .filter(function (key) { return data[key]; })
                .reduce(function (formDataAcc, key) {
                if (_this.fileKeys.includes(key)) {
                    var attachmentValue = data[key];
                    if (_this.isMessageAttachment(attachmentValue)) {
                        _this.addFilesToFD(key, attachmentValue, formDataAcc);
                        return formDataAcc;
                    }
                    throw APIError.getUserDataError("Unknown value ".concat(data[key], " with type ").concat(typeof data[key], " for property \"").concat(key, "\""), "The key \"".concat(key, "\" should have type of Buffer, Stream, File, or String "));
                }
                if (key === 'message') { // mime message
                    var messageValue = data[key];
                    if (!messageValue || !_this.isMIME(messageValue)) {
                        throw APIError.getUserDataError("Unknown data type for \"".concat(key, "\" property"), 'The mime data should have type of Buffer, String or Blob');
                    }
                    _this.addMimeDataToFD(key, messageValue, formDataAcc);
                    return formDataAcc;
                }
                _this.addCommonPropertyToFD(key, data[key], formDataAcc);
                return formDataAcc;
            }, new this.FormDataConstructor());
            return formData;
        };
        FormDataBuilder.prototype.addMimeDataToFD = function (key, data, formDataInstance) {
            if (typeof data === 'string') { // if string only two parameters should be used.
                formDataInstance.append(key, data);
                return;
            }
            if (this.isFormDataPackage(formDataInstance)) { // form-data package is used
                var nodeFormData = formDataInstance;
                nodeFormData.append(key, data, { filename: 'MimeMessage' });
                return;
            }
            if (typeof Blob !== undefined) { // either node > 18 or browser
                var browserFormData = formDataInstance; // Browser compliant FormData
                if (data instanceof Blob) {
                    browserFormData.append(key, data, 'MimeMessage');
                    return;
                }
                if (this.attachmentsHandler.isBuffer(data)) { // node environment
                    var blobInstance = new Blob([data]);
                    browserFormData.append(key, blobInstance, 'MimeMessage');
                }
            }
        };
        FormDataBuilder.prototype.isMIME = function (data) {
            return typeof data === 'string'
                || (typeof Blob !== 'undefined' && data instanceof Blob)
                || this.attachmentsHandler.isBuffer(data)
                || (typeof ReadableStream !== 'undefined' && data instanceof ReadableStream);
        };
        FormDataBuilder.prototype.isFormDataPackage = function (obj) {
            return typeof obj === 'object'
                && obj !== null
                && typeof obj.getHeaders === 'function';
        };
        FormDataBuilder.prototype.isMessageAttachment = function (value) {
            var _this = this;
            return (this.attachmentsHandler.isCustomFile(value)
                || typeof value === 'string'
                || (typeof File !== 'undefined' && value instanceof File)
                || (typeof Blob !== 'undefined' && value instanceof Blob)
                || this.attachmentsHandler.isBuffer(value)
                || this.attachmentsHandler.isStream(value)
                || (Array.isArray(value) && value.every(function (item) { return _this.attachmentsHandler.isCustomFile(item)
                    || (typeof File !== 'undefined' && item instanceof File)
                    || (typeof Blob !== 'undefined' && value instanceof Blob)
                    || _this.attachmentsHandler.isBuffer(item)
                    || _this.attachmentsHandler.isStream(item); })));
        };
        FormDataBuilder.prototype.addFilesToFD = function (propertyName, value, formDataInstance) {
            var _this = this;
            var appendFileToFD = function (originalKey, attachment, formData) {
                var key = originalKey === 'multipleValidationFile' ? 'file' : originalKey;
                var objData = _this.attachmentsHandler.convertToFDexpectedShape(attachment);
                var options = _this.attachmentsHandler.getAttachmentInfo(attachment);
                if (_this.isFormDataPackage(formData)) {
                    var fd = formData;
                    var data = typeof objData === 'string' ? Buffer.from(objData) : objData;
                    fd.append(key, data, options);
                    return;
                }
                if (typeof Blob !== undefined) { // either node > 18 or browser
                    var browserFormData = formDataInstance; // Browser compliant FormData
                    if (typeof objData === 'string' || _this.attachmentsHandler.isBuffer(objData)) {
                        var blobInstance = new Blob([objData]);
                        browserFormData.append(key, blobInstance, options.filename);
                        return;
                    }
                    if (objData instanceof Blob) {
                        browserFormData.append(key, objData, options.filename);
                        return;
                    }
                    if (_this.attachmentsHandler.isStream(objData)) {
                        var blob = _this.attachmentsHandler.getBlobFromStream(objData, options.knownLength);
                        browserFormData.set(key, blob, options.filename);
                    }
                }
            };
            if (Array.isArray(value)) {
                value.forEach(function (item) {
                    appendFileToFD(propertyName, item, formDataInstance);
                });
            }
            else {
                appendFileToFD(propertyName, value, formDataInstance);
            }
        };
        FormDataBuilder.prototype.addCommonPropertyToFD = function (key, value, formDataAcc) {
            var _this = this;
            var addValueBasedOnFD = function (fdKey, fdValue) {
                if (_this.isFormDataPackage(formDataAcc)) {
                    if (typeof fdValue === 'object') {
                        // eslint-disable-next-line no-console
                        console.warn('The received value is an object. \n'
                            + '"JSON.Stringify" will be used to avoid TypeError \n'
                            + 'To remove this warning: \n'
                            + 'Consider switching to built-in FormData or converting the value on your own.\n');
                        return formDataAcc.append(fdKey, JSON.stringify(fdValue));
                    }
                    return formDataAcc.append(fdKey, fdValue);
                }
                if (typeof fdValue === 'string') {
                    return formDataAcc.append(fdKey, fdValue);
                }
                if (typeof Blob !== undefined && fdValue instanceof Blob) {
                    return formDataAcc.append(fdKey, fdValue);
                }
                throw APIError.getUserDataError('Unknown value type for Form Data. String or Blob expected', 'Browser compliant FormData allows only string or Blob values for properties that are not attachments.');
            };
            if (Array.isArray(value)) {
                value.forEach(function (item) {
                    addValueBasedOnFD(key, item);
                });
            }
            else if (value != null) {
                addValueBasedOnFD(key, value);
            }
        };
        return FormDataBuilder;
    }());

    var SubaccountsClient = /** @class */ (function () {
        function SubaccountsClient(request) {
            this.request = request;
        }
        SubaccountsClient.prototype.list = function (query) {
            return this.request.get('/v5/accounts/subaccounts', query)
                .then(function (res) { return res.body; });
        };
        SubaccountsClient.prototype.get = function (id) {
            return this.request.get("/v5/accounts/subaccounts/".concat(id))
                .then(function (res) { return res.body; });
        };
        SubaccountsClient.prototype.create = function (name) {
            return this.request.postWithFD('/v5/accounts/subaccounts', { name: name })
                .then(function (res) { return res.body; });
        };
        SubaccountsClient.prototype.enable = function (id) {
            return this.request.post("/v5/accounts/subaccounts/".concat(id, "/enable"))
                .then(function (res) { return res.body; });
        };
        SubaccountsClient.prototype.disable = function (id) {
            return this.request.post("/v5/accounts/subaccounts/".concat(id, "/disable"))
                .then(function (res) { return res.body; });
        };
        SubaccountsClient.SUBACCOUNT_HEADER = 'X-Mailgun-On-Behalf-Of';
        return SubaccountsClient;
    }());

    var Request$1 = /** @class */ (function () {
        function Request(options, formData) {
            this.username = options.username;
            this.key = options.key;
            this.url = options.url;
            this.timeout = options.timeout;
            this.headers = this.makeHeadersFromObject(options.headers);
            this.formDataBuilder = new FormDataBuilder(formData);
            this.maxBodyLength = 52428800; // 50 MB
            this.proxy = options === null || options === undefined ? undefined : options.proxy;
        }
        Request.prototype.request = function (method, url, onCallOptions) {
            var _a, _b, _c;
            return __awaiter(this, undefined, undefined, function () {
                var options, requestHeaders, params, body, response, urlValue, err_1, errorResponse, res;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            options = __assign({}, onCallOptions);
                            options === null || options === undefined ? true : delete options.headers;
                            requestHeaders = this.joinAndTransformHeaders(onCallOptions);
                            params = __assign({}, options);
                            if ((options === null || options === undefined ? undefined : options.query) && Object.getOwnPropertyNames(options === null || options === undefined ? undefined : options.query).length > 0) {
                                params.params = new URLSearchParams(options.query);
                                delete params.query;
                            }
                            if (options === null || options === undefined ? undefined : options.body) {
                                body = options === null || options === undefined ? undefined : options.body;
                                params.data = body;
                                delete params.body;
                            }
                            urlValue = urljoin(this.url, url);
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, axios.request(__assign(__assign({ method: method.toLocaleUpperCase(), timeout: this.timeout, url: urlValue, headers: requestHeaders }, params), { maxBodyLength: this.maxBodyLength, proxy: this.proxy }))];
                        case 2:
                            response = _d.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _d.sent();
                            errorResponse = err_1;
                            throw new APIError({
                                status: ((_a = errorResponse === null || errorResponse === undefined ? undefined : errorResponse.response) === null || _a === undefined ? undefined : _a.status) || 400,
                                statusText: ((_b = errorResponse === null || errorResponse === undefined ? undefined : errorResponse.response) === null || _b === undefined ? undefined : _b.statusText) || errorResponse.code,
                                body: ((_c = errorResponse === null || errorResponse === undefined ? undefined : errorResponse.response) === null || _c === undefined ? undefined : _c.data) || errorResponse.message
                            });
                        case 4: return [4 /*yield*/, this.getResponseBody(response)];
                        case 5:
                            res = _d.sent();
                            return [2 /*return*/, res];
                    }
                });
            });
        };
        Request.prototype.getResponseBody = function (response) {
            return __awaiter(this, undefined, undefined, function () {
                var res;
                return __generator(this, function (_a) {
                    res = {
                        body: {},
                        status: response === null || response === undefined ? undefined : response.status
                    };
                    if (typeof response.data === 'string') {
                        if (response.data === 'Mailgun Magnificent API') {
                            throw new APIError({
                                status: 400,
                                statusText: 'Incorrect url',
                                body: response.data
                            });
                        }
                        res.body = {
                            message: response.data
                        };
                    }
                    else {
                        res.body = response.data;
                    }
                    return [2 /*return*/, res];
                });
            });
        };
        Request.prototype.joinAndTransformHeaders = function (onCallOptions) {
            var requestHeaders = new AxiosHeaders();
            var basic = base64Exports.encode("".concat(this.username, ":").concat(this.key));
            requestHeaders.setAuthorization("Basic ".concat(basic));
            requestHeaders.set(this.headers);
            var receivedOnCallHeaders = onCallOptions && onCallOptions.headers;
            var onCallHeaders = this.makeHeadersFromObject(receivedOnCallHeaders);
            requestHeaders.set(onCallHeaders);
            return requestHeaders;
        };
        Request.prototype.makeHeadersFromObject = function (headersObject) {
            if (headersObject === undefined) { headersObject = {}; }
            var requestHeaders = new AxiosHeaders();
            requestHeaders = Object.entries(headersObject).reduce(function (headersAccumulator, currentPair) {
                var key = currentPair[0], value = currentPair[1];
                headersAccumulator.set(key, value);
                return headersAccumulator;
            }, requestHeaders);
            return requestHeaders;
        };
        Request.prototype.setSubaccountHeader = function (subaccountId) {
            var _a;
            var headers = this.makeHeadersFromObject(__assign(__assign({}, this.headers), (_a = {}, _a[SubaccountsClient.SUBACCOUNT_HEADER] = subaccountId, _a)));
            this.headers.set(headers);
        };
        Request.prototype.resetSubaccountHeader = function () {
            this.headers.delete(SubaccountsClient.SUBACCOUNT_HEADER);
        };
        Request.prototype.query = function (method, url, query, options) {
            return this.request(method, url, __assign({ query: query }, options));
        };
        Request.prototype.command = function (method, url, data, options, addDefaultHeaders) {
            if (addDefaultHeaders === undefined) { addDefaultHeaders = true; }
            var headers = {};
            if (addDefaultHeaders) {
                headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            }
            var requestOptions = __assign(__assign(__assign({}, headers), { body: data }), options);
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
                headers: { 'Content-Type': 'multipart/form-data' }
            }, false);
        };
        Request.prototype.putWithFD = function (url, data) {
            var formData = this.formDataBuilder.createFormData(data);
            return this.command('put', url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }, false);
        };
        Request.prototype.patchWithFD = function (url, data) {
            var formData = this.formDataBuilder.createFormData(data);
            return this.command('patch', url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }, false);
        };
        Request.prototype.put = function (url, data, options) {
            return this.command('put', url, data, options);
        };
        Request.prototype.delete = function (url, data) {
            return this.command('delete', url, data);
        };
        return Request;
    }());

    /* eslint-disable camelcase */
    var Domain = /** @class */ (function () {
        function Domain(data, receiving, sending) {
            this.name = data.name;
            this.require_tls = data.require_tls;
            this.skip_verification = data.skip_verification;
            this.state = data.state;
            this.wildcard = data.wildcard;
            this.spam_action = data.spam_action;
            this.created_at = new Date(data.created_at);
            this.smtp_password = data.smtp_password;
            this.smtp_login = data.smtp_login;
            this.type = data.type;
            this.receiving_dns_records = receiving || null;
            this.sending_dns_records = sending || null;
            this.id = data.id;
            this.is_disabled = data.is_disabled;
            this.web_prefix = data.web_prefix;
            this.web_scheme = data.web_scheme;
            this.use_automatic_sender_security = data.use_automatic_sender_security;
            /*
              domain get and update methods may have richer response than create method.
            */
            var dynamicKeys = ['dkim_host', 'mailfrom_host'];
            var dynamicProperties = dynamicKeys.reduce(function (acc, propertyName) {
                if (data[propertyName]) {
                    var prop = propertyName;
                    acc[prop] = data[propertyName];
                }
                return acc;
            }, {});
            Object.assign(this, dynamicProperties);
        }
        return Domain;
    }());

    var DomainsClient = /** @class */ (function () {
        function DomainsClient(request, domainCredentialsClient, domainTemplatesClient, domainTagsClient, domainTracking, logger) {
            if (logger === undefined) { logger = console; }
            this.request = request;
            this.domainCredentials = domainCredentialsClient;
            this.domainTemplates = domainTemplatesClient;
            this.domainTags = domainTagsClient;
            this.logger = logger;
            this.domainTracking = domainTracking;
        }
        DomainsClient.prototype._handleBoolValues = function (data) {
            var propsForReplacement = data;
            var replacedProps = Object.keys(propsForReplacement).reduce(function (acc, key) {
                var prop = key;
                if (typeof propsForReplacement[prop] === 'boolean') {
                    var value = propsForReplacement[prop];
                    acc[prop] = (value.toString() === 'true') ? 'true' : 'false';
                }
                return acc;
            }, {});
            return __assign(__assign({}, data), replacedProps);
        };
        DomainsClient.prototype._parseMessage = function (response) {
            return response.body;
        };
        DomainsClient.prototype.parseDomainList = function (response) {
            if (response.body && response.body.items) {
                return response.body.items.map(function (item) {
                    return new Domain(item);
                });
            }
            return [];
        };
        DomainsClient.prototype._parseDomain = function (response) {
            return new Domain(response.body.domain, response.body.receiving_dns_records, response.body.sending_dns_records);
        };
        DomainsClient.prototype.list = function (query) {
            var _this = this;
            return this.request.get('/v4/domains', query)
                .then(function (res) { return _this.parseDomainList(res); });
        };
        DomainsClient.prototype.get = function (domain, query) {
            var _this = this;
            var _a, _b;
            var preparedQuery = query ? {
                'h:extended': (_a = query === null || query === undefined ? undefined : query.extended) !== null && _a !== undefined ? _a : false,
                'h:with_dns': (_b = query === null || query === undefined ? undefined : query.with_dns) !== null && _b !== undefined ? _b : true,
            } : {};
            return this.request.get("/v4/domains/".concat(domain), preparedQuery)
                .then(function (res) { return _this._parseDomain(res); });
        };
        DomainsClient.prototype.create = function (data) {
            var _this = this;
            var postObj = this._handleBoolValues(data);
            return this.request.postWithFD('/v4/domains', postObj)
                .then(function (res) { return _this._parseDomain(res); });
        };
        DomainsClient.prototype.update = function (domain, data) {
            var _this = this;
            var putData = this._handleBoolValues(data);
            return this.request.putWithFD("/v4/domains/".concat(domain), putData)
                .then(function (res) { return _this._parseDomain(res); });
        };
        DomainsClient.prototype.verify = function (domain) {
            var _this = this;
            return this.request.put("/v4/domains/".concat(domain, "/verify"))
                .then(function (res) { return _this._parseDomain(res); });
        };
        DomainsClient.prototype.destroy = function (domain) {
            var _this = this;
            return this.request.delete("/v3/domains/".concat(domain))
                .then(function (res) { return _this._parseMessage(res); });
        };
        DomainsClient.prototype.getConnection = function (domain) {
            return this.request.get("/v3/domains/".concat(domain, "/connection"))
                .then(function (res) { return res; })
                .then(function (res) { return res.body; });
        };
        DomainsClient.prototype.updateConnection = function (domain, data) {
            return this.request.put("/v3/domains/".concat(domain, "/connection"), data)
                .then(function (res) { return res; })
                .then(function (res) { return res.body; });
        };
        // Tracking
        /**
        * @deprecated 'domains.getTracking' method is deprecated, and will be removed.
        * Please use 'domains.domainTracking.getTracking' instead.
        */
        DomainsClient.prototype.getTracking = function (domain) {
            this.logger.warn("\n      'domains.getTracking' method is deprecated, and will be removed. Please use 'domains.domainTracking.getTracking' instead.\n    ");
            return this.domainTracking.getTracking(domain);
        };
        /**
        * @deprecated 'domains.updateTracking' method is deprecated, and will be removed.
        * Please use 'domains.domainTracking.updateTracking' instead.
        */
        DomainsClient.prototype.updateTracking = function (domain, type, data) {
            this.logger.warn("\n      'domains.updateTracking' method is deprecated, and will be removed. Please use 'domains.domainTracking.updateTracking' instead.\n    ");
            return this.domainTracking.updateTracking(domain, type, data);
        };
        // IPs
        /**
        * @deprecated "domains.getIps" method is deprecated, and will be removed in the future releases.
        */
        DomainsClient.prototype.getIps = function (domain) {
            this.logger.warn('"domains.getIps" method is deprecated and will be removed in the future releases.');
            return this.request.get(urljoin('/v3/domains', domain, 'ips'))
                .then(function (response) { var _a; return (_a = response === null || response === undefined ? undefined : response.body) === null || _a === undefined ? undefined : _a.items; });
        };
        /**
        * @deprecated "domains.assignIp" method is deprecated, and will be removed in the future releases.
        */
        DomainsClient.prototype.assignIp = function (domain, ip) {
            this.logger.warn('"domains.assignIp" method is deprecated and will be removed in the future releases.');
            return this.request.postWithFD(urljoin('/v3/domains', domain, 'ips'), { ip: ip });
        };
        /**
        * @deprecated "domains.deleteIp" method is deprecated, and will be moved to the IpsClient.
        */
        DomainsClient.prototype.deleteIp = function (domain, ip) {
            this.logger.warn('"domains.deleteIp" method is deprecated and will be moved into the IpsClient in the future releases.');
            return this.request.delete(urljoin('/v3/domains', domain, 'ips', ip));
        };
        /**
        * @deprecated "domains.linkIpPool" method is deprecated, and will be removed
        * in the future releases.
        */
        DomainsClient.prototype.linkIpPool = function (domain, poolId) {
            this.logger.warn('"domains.linkIpPool" method is deprecated, and will be removed in the future releases.');
            return this.request.postWithFD(urljoin('/v3/domains', domain, 'ips'), { pool_id: poolId });
        };
        /**
        * @deprecated "domains.unlinkIpPoll" method is deprecated, and will be moved into the IpsClient
        * in the future releases.
        */
        DomainsClient.prototype.unlinkIpPoll = function (domain, replacement) {
            this.logger.warn('"domains.unlinkIpPoll" method is deprecated, and will be moved into the IpsClient in the future releases.');
            var searchParams = '';
            if (replacement.pool_id && replacement.ip) {
                throw APIError.getUserDataError('Too much data for replacement', 'Please specify either pool_id or ip (not both)');
            }
            else if (replacement.pool_id) {
                searchParams = "?pool_id=".concat(replacement.pool_id);
            }
            else if (replacement.ip) {
                searchParams = "?ip=".concat(replacement.ip);
            }
            return this.request.delete(urljoin('/v3/domains', domain, 'ips', 'ip_pool', searchParams));
        };
        DomainsClient.prototype.updateDKIMAuthority = function (domain, data) {
            return this.request.put("/v3/domains/".concat(domain, "/dkim_authority"), {}, { query: "self=".concat(data.self) })
                .then(function (res) { return res; })
                .then(function (res) { return res.body; });
        };
        DomainsClient.prototype.updateDKIMSelector = function (domain, data) {
            var _a;
            return __awaiter(this, undefined, undefined, function () {
                var res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.request.put("/v3/domains/".concat(domain, "/dkim_selector"), {}, { query: "dkim_selector=".concat(data.dkimSelector) })];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, {
                                    status: res.status,
                                    message: (_a = res === null || res === undefined ? undefined : res.body) === null || _a === undefined ? undefined : _a.message
                                }];
                    }
                });
            });
        };
        /**
        * @deprecated "domains.updateWebPrefix" method is deprecated.
        * Please use domains.update to set new "web_prefix".
        * Current method will be removed in the future releases.
        */
        DomainsClient.prototype.updateWebPrefix = function (domain, data) {
            this.logger.warn('"domains.updateWebPrefix" method is deprecated, please use domains.update to set new "web_prefix". Current method will be removed in the future releases.');
            return this.request.put("/v3/domains/".concat(domain, "/web_prefix"), {}, { query: "web_prefix=".concat(data.webPrefix) })
                .then(function (res) { return res; });
        };
        return DomainsClient;
    }());

    var NavigationThruPages = /** @class */ (function () {
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
                iteratorPosition = searchParams.has(iteratorName)
                    ? searchParams.get(iteratorName)
                    : undefined;
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
                var id = _a[0], pageUrl = _a[1];
                acc[id] = _this.parsePage(id, pageUrl, urlSeparator, iteratorName);
                return acc;
            }, {});
        };
        NavigationThruPages.prototype.updateUrlAndQuery = function (clientUrl, query) {
            var url = clientUrl;
            var queryCopy = __assign({}, query);
            if (queryCopy.page) {
                url = urljoin(clientUrl, queryCopy.page);
                delete queryCopy.page;
            }
            return {
                url: url,
                updatedQuery: queryCopy
            };
        };
        NavigationThruPages.prototype.requestListWithPages = function (clientUrl, query, Model) {
            return __awaiter(this, undefined, undefined, function () {
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
                        case 2: throw new APIError({
                            status: 500,
                            statusText: 'Request property is empty',
                            body: { message: '' }
                        });
                    }
                });
            });
        };
        return NavigationThruPages;
    }());

    var EventClient = /** @class */ (function (_super) {
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
            return __awaiter(this, undefined, undefined, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.requestListWithPages(urljoin('/v3', domain, 'events'), query)];
                });
            });
        };
        return EventClient;
    }(NavigationThruPages));

    var StatsContainer = /** @class */ (function () {
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
    }());

    var StatsClient = /** @class */ (function () {
        function StatsClient(request, logger) {
            if (logger === undefined) { logger = console; }
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
            this.logger.warn("Date:\"".concat(inputDate, "\" was auto-converted to UTC time zone.\nValue \"").concat(inputDate.toUTCString(), "\" will be used for request.\nConsider using string type for property \"").concat(key, "\" to avoid auto-converting"));
            return [key, inputDate.toUTCString()];
        };
        StatsClient.prototype.prepareSearchParams = function (query) {
            var _this = this;
            var searchParams = [];
            if (typeof query === 'object' && Object.keys(query).length) {
                searchParams = Object.entries(query).reduce(function (arrayWithPairs, currentPair) {
                    var key = currentPair[0], value = currentPair[1];
                    if (Array.isArray(value) && value.length) { // event: ['delivered', 'accepted']
                        var repeatedProperty = value.map(function (item) { return [key, item]; });
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
            return new StatsContainer(response.body);
        };
        StatsClient.prototype.getDomain = function (domain, query) {
            var searchParams = this.prepareSearchParams(query);
            return this.request.get(urljoin('/v3', domain, 'stats/total'), searchParams)
                .then(this.parseStats);
        };
        StatsClient.prototype.getAccount = function (query) {
            var searchParams = this.prepareSearchParams(query);
            return this.request.get('/v3/stats/total', searchParams)
                .then(this.parseStats);
        };
        return StatsClient;
    }());

    var Resolution;
    (function (Resolution) {
        Resolution["HOUR"] = "hour";
        Resolution["DAY"] = "day";
        Resolution["MONTH"] = "month";
    })(Resolution || (Resolution = {}));
    var SuppressionModels;
    (function (SuppressionModels) {
        SuppressionModels["BOUNCES"] = "bounces";
        SuppressionModels["COMPLAINTS"] = "complaints";
        SuppressionModels["UNSUBSCRIBES"] = "unsubscribes";
        SuppressionModels["WHITELISTS"] = "whitelists";
    })(SuppressionModels || (SuppressionModels = {}));
    var WebhooksIds;
    (function (WebhooksIds) {
        WebhooksIds["CLICKED"] = "clicked";
        WebhooksIds["COMPLAINED"] = "complained";
        WebhooksIds["DELIVERED"] = "delivered";
        WebhooksIds["OPENED"] = "opened";
        WebhooksIds["PERMANENT_FAIL"] = "permanent_fail";
        WebhooksIds["TEMPORARY_FAIL"] = "temporary_fail";
        WebhooksIds["UNSUBSCRIBED"] = "unsubscribe";
    })(WebhooksIds || (WebhooksIds = {}));
    var YesNo;
    (function (YesNo) {
        YesNo["YES"] = "yes";
        YesNo["NO"] = "no";
    })(YesNo || (YesNo = {}));

    var Suppression = /** @class */ (function () {
        function Suppression(type) {
            this.type = type;
        }
        return Suppression;
    }());

    var Bounce = /** @class */ (function (_super) {
        __extends(Bounce, _super);
        function Bounce(data) {
            var _this = _super.call(this, SuppressionModels.BOUNCES) || this;
            _this.address = data.address;
            _this.code = +data.code;
            _this.error = data.error;
            _this.created_at = new Date(data.created_at);
            return _this;
        }
        return Bounce;
    }(Suppression));

    var Complaint = /** @class */ (function (_super) {
        __extends(Complaint, _super);
        function Complaint(data) {
            var _this = _super.call(this, SuppressionModels.COMPLAINTS) || this;
            _this.address = data.address;
            _this.created_at = new Date(data.created_at);
            return _this;
        }
        return Complaint;
    }(Suppression));

    var Unsubscribe = /** @class */ (function (_super) {
        __extends(Unsubscribe, _super);
        function Unsubscribe(data) {
            var _this = _super.call(this, SuppressionModels.UNSUBSCRIBES) || this;
            _this.address = data.address;
            _this.tags = data.tags;
            _this.created_at = new Date(data.created_at);
            return _this;
        }
        return Unsubscribe;
    }(Suppression));

    var WhiteList = /** @class */ (function (_super) {
        __extends(WhiteList, _super);
        function WhiteList(data) {
            var _this = _super.call(this, SuppressionModels.WHITELISTS) || this;
            _this.value = data.value;
            _this.reason = data.reason;
            _this.createdAt = new Date(data.createdAt);
            return _this;
        }
        return WhiteList;
    }(Suppression));

    var createOptions = {
        headers: { 'Content-Type': 'application/json' }
    };
    var SuppressionClient = /** @class */ (function (_super) {
        __extends(SuppressionClient, _super);
        function SuppressionClient(request) {
            var _this = _super.call(this, request) || this;
            _this.request = request;
            _this.models = {
                bounces: Bounce,
                complaints: Complaint,
                unsubscribes: Unsubscribe,
                whitelists: WhiteList,
            };
            return _this;
        }
        SuppressionClient.prototype.parseList = function (response, Model) {
            var _a;
            var data = {};
            data.items = ((_a = response.body.items) === null || _a === undefined ? undefined : _a.map(function (item) { return new Model(item); })) || [];
            data.pages = this.parsePageLinks(response, '?', 'address');
            data.status = response.status;
            return data;
        };
        SuppressionClient.prototype._parseItem = function (data, Model) {
            return new Model(data);
        };
        SuppressionClient.prototype.createWhiteList = function (domain, data, isDataArray) {
            if (isDataArray) {
                throw APIError.getUserDataError('Data property should be an object', 'Whitelist\'s creation process does not support multiple creations. Data property should be an object');
            }
            return this.request
                .postWithFD(urljoin('v3', domain, 'whitelists'), data)
                .then(this.prepareResponse);
        };
        SuppressionClient.prototype.createUnsubscribe = function (domain, data) {
            if (Array.isArray(data)) { // User provided an array
                var isContainsTag = data.some(function (unsubscribe) { return unsubscribe.tag; });
                if (isContainsTag) {
                    throw APIError.getUserDataError('Tag property should not be used for creating multiple unsubscribes.', 'Tag property can be used only if one unsubscribe provided as second argument of create method. Please use tags instead.');
                }
                return this.request
                    .post(urljoin('v3', domain, 'unsubscribes'), JSON.stringify(data), createOptions)
                    .then(this.prepareResponse);
            }
            if (data === null || data === undefined ? undefined : data.tags) {
                throw APIError.getUserDataError('Tags property should not be used for creating one unsubscribe.', 'Tags property can be used if you provides an array of unsubscribes as second argument of create method. Please use tag instead');
            }
            if (Array.isArray(data.tag)) {
                throw APIError.getUserDataError('Tag property can not be an array', 'Please use array of unsubscribes as second argument of create method to be able to provide few tags');
            }
            /* We need Form Data for unsubscribes if we want to support the "tag" property */
            return this.request
                .postWithFD(urljoin('v3', domain, 'unsubscribes'), data)
                .then(this.prepareResponse);
        };
        SuppressionClient.prototype.getModel = function (type) {
            if (type in this.models) {
                return this.models[type];
            }
            throw APIError.getUserDataError('Unknown type value', 'Type may be only one of [bounces, complaints, unsubscribes, whitelists]');
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
            return __awaiter(this, undefined, undefined, function () {
                var model;
                return __generator(this, function (_a) {
                    model = this.getModel(type);
                    return [2 /*return*/, this.requestListWithPages(urljoin('v3', domain, type), query, model)];
                });
            });
        };
        SuppressionClient.prototype.get = function (domain, type, address) {
            var _this = this;
            var model = this.getModel(type);
            return this.request
                .get(urljoin('v3', domain, type, encodeURIComponent(address)))
                .then(function (response) { return _this._parseItem(response.body, model); });
        };
        SuppressionClient.prototype.create = function (domain, type, data) {
            this.getModel(type);
            // supports adding multiple suppressions by default
            var postData;
            var isDataArray = Array.isArray(data);
            if (type === 'whitelists') {
                return this.createWhiteList(domain, data, isDataArray);
            }
            if (type === 'unsubscribes') {
                return this.createUnsubscribe(domain, data);
            }
            if (!isDataArray) {
                postData = [data];
            }
            else {
                postData = __spreadArray([], data, true);
            }
            return this.request
                .post(urljoin('v3', domain, type), JSON.stringify(postData), createOptions)
                .then(this.prepareResponse);
        };
        SuppressionClient.prototype.destroy = function (domain, type, address) {
            this.getModel(type);
            return this.request
                .delete(urljoin('v3', domain, type, encodeURIComponent(address)))
                .then(function (response) { return ({
                message: response.body.message,
                value: response.body.value || '',
                address: response.body.address || '',
                status: response.status
            }); });
        };
        return SuppressionClient;
    }(NavigationThruPages));

    var Webhook = /** @class */ (function () {
        function Webhook(id, url, urls) {
            this.id = id;
            this.url = url;
            this.urls = urls;
        }
        return Webhook;
    }());
    var WebhooksClient = /** @class */ (function () {
        function WebhooksClient(request) {
            this.request = request;
        }
        WebhooksClient.prototype._parseWebhookList = function (response) {
            return response.body.webhooks;
        };
        WebhooksClient.prototype._parseWebhookWithID = function (id) {
            return function (response) {
                var _a;
                var webhookResponse = (_a = response === null || response === undefined ? undefined : response.body) === null || _a === undefined ? undefined : _a.webhook;
                var url = webhookResponse === null || webhookResponse === undefined ? undefined : webhookResponse.url;
                var urls = webhookResponse === null || webhookResponse === undefined ? undefined : webhookResponse.urls;
                if (!url) {
                    url = urls && urls.length
                        ? urls[0]
                        : undefined;
                }
                if ((!urls || urls.length === 0) && url) {
                    urls = [url];
                }
                return new Webhook(id, url, urls);
            };
        };
        WebhooksClient.prototype._parseWebhookTest = function (response) {
            return {
                code: response.body.code,
                message: response.body.message
            };
        };
        WebhooksClient.prototype.list = function (domain, query) {
            return this.request.get(urljoin('/v3/domains', domain, 'webhooks'), query)
                .then(this._parseWebhookList);
        };
        WebhooksClient.prototype.get = function (domain, id) {
            return this.request.get(urljoin('/v3/domains', domain, 'webhooks', id))
                .then(this._parseWebhookWithID(id));
        };
        WebhooksClient.prototype.create = function (domain, id, url, test) {
            if (test === undefined) { test = false; }
            if (test) {
                return this.request.putWithFD(urljoin('/v3/domains', domain, 'webhooks', id, 'test'), { url: url })
                    .then(this._parseWebhookTest);
            }
            return this.request.postWithFD(urljoin('/v3/domains', domain, 'webhooks'), { id: id, url: url })
                .then(this._parseWebhookWithID(id));
        };
        WebhooksClient.prototype.update = function (domain, id, urlValues) {
            return this.request.putWithFD(urljoin('/v3/domains', domain, 'webhooks', id), { url: urlValues })
                .then(this._parseWebhookWithID(id));
        };
        WebhooksClient.prototype.destroy = function (domain, id) {
            return this.request.delete(urljoin('/v3/domains', domain, 'webhooks', id))
                .then(this._parseWebhookWithID(id));
        };
        return WebhooksClient;
    }());

    var MessagesClient = /** @class */ (function () {
        function MessagesClient(request) {
            this.request = request;
        }
        MessagesClient.prototype.prepareBooleanValues = function (data) {
            var yesNoProperties = new Set([
                'o:testmode',
                't:text',
                'o:dkim',
                'o:tracking',
                'o:tracking-clicks',
                'o:tracking-opens',
                'o:require-tls',
                'o:skip-verification'
            ]);
            if (!data || Object.keys(data).length === 0) {
                throw APIError.getUserDataError('Message data object can not be empty', 'Message data object can not be empty');
            }
            return Object.keys(data).reduce(function (acc, key) {
                if (yesNoProperties.has(key) && typeof data[key] === 'boolean') {
                    acc[key] = data[key] ? 'yes' : 'no';
                }
                else {
                    acc[key] = data[key];
                }
                return acc;
            }, {});
        };
        MessagesClient.prototype._parseResponse = function (response) {
            return __assign({ status: response.status }, response.body);
        };
        MessagesClient.prototype.create = function (domain, data) {
            if (data.message) {
                return this.request.postWithFD("/v3/".concat(domain, "/messages.mime"), data)
                    .then(this._parseResponse);
            }
            var modifiedData = this.prepareBooleanValues(data);
            return this.request.postWithFD("/v3/".concat(domain, "/messages"), modifiedData)
                .then(this._parseResponse);
        };
        return MessagesClient;
    }());

    var RoutesClient = /** @class */ (function () {
        function RoutesClient(request) {
            this.request = request;
        }
        RoutesClient.prototype.list = function (query) {
            return this.request.get('/v3/routes', query)
                .then(function (response) { return response.body.items; });
        };
        RoutesClient.prototype.get = function (id) {
            return this.request.get("/v3/routes/".concat(id))
                .then(function (response) { return response.body.route; });
        };
        RoutesClient.prototype.create = function (data) {
            return this.request.postWithFD('/v3/routes', data)
                .then(function (response) { return response.body.route; });
        };
        RoutesClient.prototype.update = function (id, data) {
            return this.request.putWithFD("/v3/routes/".concat(id), data)
                .then(function (response) { return response.body; });
        };
        RoutesClient.prototype.destroy = function (id) {
            return this.request.delete("/v3/routes/".concat(id))
                .then(function (response) { return response.body; });
        };
        return RoutesClient;
    }());

    var ValidateClient = /** @class */ (function () {
        function ValidateClient(request, multipleValidationClient) {
            this.request = request;
            this.multipleValidation = multipleValidationClient;
        }
        ValidateClient.prototype.get = function (address) {
            return __awaiter(this, undefined, undefined, function () {
                var query, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = { address: address };
                            return [4 /*yield*/, this.request.get('/v4/address/validate', query)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.body];
                    }
                });
            });
        };
        return ValidateClient;
    }());

    var IpsClient = /** @class */ (function () {
        function IpsClient(request) {
            this.request = request;
        }
        IpsClient.prototype.list = function (query) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get('/v3/ips', query)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this.parseIpsResponse(response)];
                    }
                });
            });
        };
        IpsClient.prototype.get = function (ip) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get("/v3/ips/".concat(ip))];
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
    }());

    var IpPoolsClient = /** @class */ (function () {
        function IpPoolsClient(request) {
            this.request = request;
        }
        IpPoolsClient.prototype.list = function () {
            var _this = this;
            return this.request.get('/v1/ip_pools')
                .then(function (response) { return _this.parseIpPoolsResponse(response); });
        };
        IpPoolsClient.prototype.create = function (data) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.postWithFD('/v1/ip_pools', data)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, __assign({ status: response.status }, response.body)];
                    }
                });
            });
        };
        IpPoolsClient.prototype.update = function (poolId, data) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.patchWithFD("/v1/ip_pools/".concat(poolId), data)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, __assign({ status: response.status }, response.body)];
                    }
                });
            });
        };
        IpPoolsClient.prototype.delete = function (poolId, data) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.delete("/v1/ip_pools/".concat(poolId), data)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, __assign({ status: response.status }, response.body)];
                    }
                });
            });
        };
        IpPoolsClient.prototype.parseIpPoolsResponse = function (response) {
            return __assign({ status: response.status }, response.body);
        };
        return IpPoolsClient;
    }());

    var MailingListsClient = /** @class */ (function (_super) {
        __extends(MailingListsClient, _super);
        function MailingListsClient(request, members) {
            var _this = _super.call(this, request) || this;
            _this.request = request;
            _this.baseRoute = '/v3/lists';
            _this.members = members;
            return _this;
        }
        MailingListsClient.prototype.parseValidationResult = function (status, data) {
            return {
                status: status,
                validationResult: __assign(__assign({}, data), { created_at: new Date(data.created_at * 1000) // add millisecond to Unix timestamp
                 })
            };
        };
        MailingListsClient.prototype.parseList = function (response) {
            var data = {};
            data.items = response.body.items;
            data.pages = this.parsePageLinks(response, '?', 'address');
            data.status = response.status;
            return data;
        };
        MailingListsClient.prototype.list = function (query) {
            return __awaiter(this, undefined, undefined, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.requestListWithPages("".concat(this.baseRoute, "/pages"), query)];
                });
            });
        };
        MailingListsClient.prototype.get = function (mailListAddress) {
            return this.request.get("".concat(this.baseRoute, "/").concat(mailListAddress))
                .then(function (response) { return response.body.list; });
        };
        MailingListsClient.prototype.create = function (data) {
            return this.request.postWithFD(this.baseRoute, data)
                .then(function (response) { return response.body.list; });
        };
        MailingListsClient.prototype.update = function (mailListAddress, data) {
            return this.request.putWithFD("".concat(this.baseRoute, "/").concat(mailListAddress), data)
                .then(function (response) { return response.body.list; });
        };
        MailingListsClient.prototype.destroy = function (mailListAddress) {
            return this.request.delete("".concat(this.baseRoute, "/").concat(mailListAddress))
                .then(function (response) { return response.body; });
        };
        MailingListsClient.prototype.validate = function (mailListAddress) {
            return this.request.post("".concat(this.baseRoute, "/").concat(mailListAddress, "/validate"), {})
                .then(function (response) { return (__assign({ status: response.status }, response.body)); });
        };
        MailingListsClient.prototype.validationResult = function (mailListAddress) {
            var _this = this;
            return this.request.get("".concat(this.baseRoute, "/").concat(mailListAddress, "/validate"))
                .then(function (response) { return _this.parseValidationResult(response.status, response.body); });
        };
        MailingListsClient.prototype.cancelValidation = function (mailListAddress) {
            return this.request.delete("".concat(this.baseRoute, "/").concat(mailListAddress, "/validate"))
                .then(function (response) { return ({
                status: response.status,
                message: response.body.message
            }); });
        };
        return MailingListsClient;
    }(NavigationThruPages));

    var MailListsMembers = /** @class */ (function (_super) {
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
            return __awaiter(this, undefined, undefined, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.requestListWithPages("".concat(this.baseRoute, "/").concat(mailListAddress, "/members/pages"), query)];
                });
            });
        };
        MailListsMembers.prototype.getMember = function (mailListAddress, mailListMemberAddress) {
            return this.request.get("".concat(this.baseRoute, "/").concat(mailListAddress, "/members/").concat(mailListMemberAddress))
                .then(function (response) { return response.body.member; });
        };
        MailListsMembers.prototype.createMember = function (mailListAddress, data) {
            var reqData = this.checkAndUpdateData(data);
            return this.request.postWithFD("".concat(this.baseRoute, "/").concat(mailListAddress, "/members"), reqData)
                .then(function (response) { return response.body.member; });
        };
        MailListsMembers.prototype.createMembers = function (mailListAddress, data) {
            var newData = {
                members: Array.isArray(data.members) ? JSON.stringify(data.members) : data.members,
                upsert: data.upsert
            };
            return this.request.postWithFD("".concat(this.baseRoute, "/").concat(mailListAddress, "/members.json"), newData)
                .then(function (response) { return response.body; });
        };
        MailListsMembers.prototype.updateMember = function (mailListAddress, mailListMemberAddress, data) {
            var reqData = this.checkAndUpdateData(data);
            return this.request.putWithFD("".concat(this.baseRoute, "/").concat(mailListAddress, "/members/").concat(mailListMemberAddress), reqData)
                .then(function (response) { return response.body.member; });
        };
        MailListsMembers.prototype.destroyMember = function (mailListAddress, mailListMemberAddress) {
            return this.request.delete("".concat(this.baseRoute, "/").concat(mailListAddress, "/members/").concat(mailListMemberAddress))
                .then(function (response) { return response.body; });
        };
        return MailListsMembers;
    }(NavigationThruPages));

    var DomainCredentialsClient = /** @class */ (function () {
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
            return this.request.get(urljoin(this.baseRoute, domain, '/credentials'), query)
                .then(function (res) { return _this._parseDomainCredentialsList(res); });
        };
        DomainCredentialsClient.prototype.create = function (domain, data) {
            var _this = this;
            return this.request.postWithFD("".concat(this.baseRoute).concat(domain, "/credentials"), data)
                .then(function (res) { return _this._parseMessageResponse(res); });
        };
        DomainCredentialsClient.prototype.update = function (domain, credentialsLogin, data) {
            var _this = this;
            return this.request.putWithFD("".concat(this.baseRoute).concat(domain, "/credentials/").concat(credentialsLogin), data)
                .then(function (res) { return _this._parseMessageResponse(res); });
        };
        DomainCredentialsClient.prototype.destroy = function (domain, credentialsLogin) {
            var _this = this;
            return this.request.delete("".concat(this.baseRoute).concat(domain, "/credentials/").concat(credentialsLogin))
                .then(function (res) { return _this._parseDeletedResponse(res); });
        };
        return DomainCredentialsClient;
    }());

    var MultipleValidationJob = /** @class */ (function () {
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
                    csv: (_a = data.download_url) === null || _a === undefined ? undefined : _a.csv,
                    json: (_b = data.download_url) === null || _b === undefined ? undefined : _b.json
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
    }());
    var MultipleValidationClient = /** @class */ (function (_super) {
        __extends(MultipleValidationClient, _super);
        function MultipleValidationClient(request) {
            var _this = _super.call(this) || this;
            _this.request = request;
            _this.attachmentsHandler = new AttachmentsHandler();
            return _this;
        }
        MultipleValidationClient.prototype.handleResponse = function (response) {
            return __assign({ status: response.status }, response === null || response === undefined ? undefined : response.body);
        };
        MultipleValidationClient.prototype.parseList = function (response) {
            var data = {};
            data.jobs = response.body.jobs.map(function (job) { return new MultipleValidationJob(job, response.status); });
            data.pages = this.parsePageLinks(response, '?', 'pivot');
            data.total = response.body.total;
            data.status = response.status;
            return data;
        };
        MultipleValidationClient.prototype.list = function (query) {
            return __awaiter(this, undefined, undefined, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.requestListWithPages('/v4/address/validate/bulk', query)];
                });
            });
        };
        MultipleValidationClient.prototype.get = function (listId) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get("/v4/address/validate/bulk/".concat(listId))];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, new MultipleValidationJob(response.body, response.status)];
                    }
                });
            });
        };
        MultipleValidationClient.prototype.convertToExpectedShape = function (data) {
            var multipleValidationData;
            if (this.attachmentsHandler.isBuffer(data.file)) {
                multipleValidationData = { multipleValidationFile: data.file };
            }
            else if (typeof data.file === 'string') {
                multipleValidationData = { multipleValidationFile: { data: data.file } };
            }
            else if (this.attachmentsHandler.isStream(data.file)) {
                multipleValidationData = { multipleValidationFile: data.file };
            }
            else {
                multipleValidationData = { multipleValidationFile: data.file };
            }
            return multipleValidationData;
        };
        MultipleValidationClient.prototype.create = function (listId, data) {
            return __awaiter(this, undefined, undefined, function () {
                var multipleValidationData, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!data || !data.file) {
                                throw APIError.getUserDataError('"file" property expected.', 'Make sure second argument has "file" property.');
                            }
                            multipleValidationData = this.convertToExpectedShape(data);
                            return [4 /*yield*/, this.request.postWithFD("/v4/address/validate/bulk/".concat(listId), multipleValidationData)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this.handleResponse(response)];
                    }
                });
            });
        };
        MultipleValidationClient.prototype.destroy = function (listId) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.delete("/v4/address/validate/bulk/".concat(listId))];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this.handleResponse(response)];
                    }
                });
            });
        };
        return MultipleValidationClient;
    }(NavigationThruPages));

    var DomainTemplateItem = /** @class */ (function () {
        function DomainTemplateItem(domainTemplateFromAPI) {
            this.name = domainTemplateFromAPI.name;
            this.description = domainTemplateFromAPI.description;
            this.createdAt = domainTemplateFromAPI.createdAt ? new Date(domainTemplateFromAPI.createdAt) : '';
            this.createdBy = domainTemplateFromAPI.createdBy;
            this.id = domainTemplateFromAPI.id;
            if (domainTemplateFromAPI.version) {
                this.version = domainTemplateFromAPI.version;
                if (this.version && domainTemplateFromAPI.version.createdAt) {
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
    }());
    var DomainTemplatesClient = /** @class */ (function (_super) {
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
                result.templateVersion = { tag: data.body.template.version.tag };
            }
            return result;
        };
        DomainTemplatesClient.prototype.parseList = function (response) {
            var data = {};
            data.items = response.body.items.map(function (d) { return new DomainTemplateItem(d); });
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
            return __awaiter(this, undefined, undefined, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.requestListWithPages(urljoin(this.baseRoute, domain, '/templates'), query)];
                });
            });
        };
        DomainTemplatesClient.prototype.get = function (domain, templateName, query) {
            return this.request.get(urljoin(this.baseRoute, domain, '/templates/', templateName), query)
                .then(function (res) { return new DomainTemplateItem(res.body.template); });
        };
        DomainTemplatesClient.prototype.create = function (domain, data) {
            var _this = this;
            return this.request.postWithFD(urljoin(this.baseRoute, domain, '/templates'), data)
                .then(function (res) { return _this.parseCreationResponse(res); });
        };
        DomainTemplatesClient.prototype.update = function (domain, templateName, data) {
            var _this = this;
            return this.request.putWithFD(urljoin(this.baseRoute, domain, '/templates/', templateName), data)
                .then(function (res) { return _this.parseMutationResponse(res); });
        };
        DomainTemplatesClient.prototype.destroy = function (domain, templateName) {
            var _this = this;
            return this.request.delete(urljoin(this.baseRoute, domain, '/templates/', templateName))
                .then(function (res) { return _this.parseMutationResponse(res); });
        };
        DomainTemplatesClient.prototype.destroyAll = function (domain) {
            var _this = this;
            return this.request.delete(urljoin(this.baseRoute, domain, '/templates'))
                .then(function (res) { return _this.parseNotificationResponse(res); });
        };
        DomainTemplatesClient.prototype.listVersions = function (domain, templateName, query) {
            var _this = this;
            return this.request.get(urljoin(this.baseRoute, domain, '/templates', templateName, '/versions'), query)
                .then(function (res) { return _this.parseListTemplateVersions(res); });
        };
        DomainTemplatesClient.prototype.getVersion = function (domain, templateName, tag) {
            return this.request.get(urljoin(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag))
                .then(function (res) { return new DomainTemplateItem(res.body.template); });
        };
        DomainTemplatesClient.prototype.createVersion = function (domain, templateName, data) {
            var _this = this;
            return this.request.postWithFD(urljoin(this.baseRoute, domain, '/templates/', templateName, '/versions'), data)
                .then(function (res) { return _this.parseCreationVersionResponse(res); });
        };
        DomainTemplatesClient.prototype.updateVersion = function (domain, templateName, tag, data) {
            var _this = this;
            return this.request.putWithFD(urljoin(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag), data)
                .then(
            // eslint-disable-next-line max-len
            function (res) { return _this.parseMutateTemplateVersionResponse(res); });
        };
        DomainTemplatesClient.prototype.destroyVersion = function (domain, templateName, tag) {
            var _this = this;
            return this.request.delete(urljoin(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag))
                // eslint-disable-next-line max-len
                .then(function (res) { return _this.parseMutateTemplateVersionResponse(res); });
        };
        return DomainTemplatesClient;
    }(NavigationThruPages));

    var DomainTag = /** @class */ (function () {
        function DomainTag(tagInfo) {
            this.tag = tagInfo.tag;
            this.description = tagInfo.description;
            this['first-seen'] = new Date(tagInfo['first-seen']);
            this['last-seen'] = new Date(tagInfo['last-seen']);
        }
        return DomainTag;
    }());
    var DomainTagStatistic = /** @class */ (function () {
        function DomainTagStatistic(tagStatisticInfo) {
            this.tag = tagStatisticInfo.body.tag;
            this.description = tagStatisticInfo.body.description;
            this.start = new Date(tagStatisticInfo.body.start);
            this.end = new Date(tagStatisticInfo.body.end);
            this.resolution = tagStatisticInfo.body.resolution;
            this.stats = tagStatisticInfo.body.stats.map(function (stat) {
                var res = __assign(__assign({}, stat), { time: new Date(stat.time) });
                return res;
            });
        }
        return DomainTagStatistic;
    }());
    var DomainTagsClient = /** @class */ (function (_super) {
        __extends(DomainTagsClient, _super);
        function DomainTagsClient(request) {
            var _this = _super.call(this, request) || this;
            _this.request = request;
            _this.baseRoute = '/v3/';
            return _this;
        }
        DomainTagsClient.prototype.parseList = function (response) {
            var data = {};
            data.items = response.body.items.map(function (tagInfo) { return new DomainTag(tagInfo); });
            data.pages = this.parsePageLinks(response, '?', 'tag');
            data.status = response.status;
            return data;
        };
        DomainTagsClient.prototype._parseTagStatistic = function (response) {
            return new DomainTagStatistic(response);
        };
        DomainTagsClient.prototype.list = function (domain, query) {
            return __awaiter(this, undefined, undefined, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.requestListWithPages(urljoin(this.baseRoute, domain, '/tags'), query)];
                });
            });
        };
        DomainTagsClient.prototype.get = function (domain, tag) {
            return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag))
                .then(function (res) { return new DomainTag(res.body); });
        };
        DomainTagsClient.prototype.update = function (domain, tag, description) {
            return this.request.put(urljoin(this.baseRoute, domain, '/tags', tag), description)
                .then(function (res) { return res.body; });
        };
        DomainTagsClient.prototype.destroy = function (domain, tag) {
            return this.request.delete("".concat(this.baseRoute).concat(domain, "/tags/").concat(tag))
                .then(function (res) { return ({
                message: res.body.message,
                status: res.status
            }); });
        };
        DomainTagsClient.prototype.statistic = function (domain, tag, query) {
            var _this = this;
            return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats'), query)
                .then(function (res) { return _this._parseTagStatistic(res); });
        };
        DomainTagsClient.prototype.countries = function (domain, tag) {
            return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/countries'))
                .then(function (res) { return res.body; });
        };
        DomainTagsClient.prototype.providers = function (domain, tag) {
            return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/providers'))
                .then(function (res) { return res.body; });
        };
        DomainTagsClient.prototype.devices = function (domain, tag) {
            return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/devices'))
                .then(function (res) { return res.body; });
        };
        return DomainTagsClient;
    }(NavigationThruPages));

    var SeedsListsClient = /** @class */ (function (_super) {
        __extends(SeedsListsClient, _super);
        function SeedsListsClient(request, attributes, filters, logger) {
            if (logger === undefined) { logger = console; }
            var _this = _super.call(this, request) || this;
            _this.request = request;
            _this.attributes = attributes;
            _this.filters = filters;
            _this.logger = logger;
            return _this;
        }
        SeedsListsClient.prototype.convertDateToUTC = function (key, inputDate) {
            /*
              Because "new Date('2022-12-25T00:00:00.000Z')" becomes "Sun Dec 25 2022 02:00:00 GMT+0200"
              (plus 2 hours from the timezone)
              and because for API, we need to provide the date in the expected format
              ex: 'Thu, 13 Oct 2011 18:02:00 +0000'.
              Here we try auto-convert them to UTC
            */
            this.logger.warn("Date: \"".concat(inputDate, "\" was auto-converted to UTC time zone.\nValue \"").concat(inputDate.toISOString(), "\" will be used for request.\nConsider using string type for property \"").concat(key, "\" to avoid auto-converting"));
            return inputDate.toISOString();
        };
        SeedsListsClient.prototype.prepareQueryData = function (queryData) {
            var _this = this;
            var propsForReplacement = queryData;
            var replacedProps = Object.keys(propsForReplacement).reduce(function (acc, key) {
                var prop = key;
                if (!!propsForReplacement[prop] && typeof propsForReplacement[prop] === 'object') {
                    var value = queryData[prop];
                    acc[prop] = _this.convertDateToUTC(prop, value);
                }
                return acc;
            }, {});
            var result = __assign(__assign({}, queryData), replacedProps);
            return result;
        };
        SeedsListsClient.prototype.prepareResult = function (data) {
            var result = {};
            var seedList = this.prepareSeedList(data.body);
            result = __assign(__assign({}, seedList), { status: data.status });
            return result;
        };
        SeedsListsClient.prototype.prepareSeedList = function (data) {
            var seeds;
            var handledSeedListDates = {
                created_at: new Date(data.created_at),
                updated_at: new Date(data.updated_at),
                last_result_at: new Date(data.last_result_at),
            };
            if (data.Seeds) {
                seeds = data.Seeds.map(function (seedItem) {
                    var seed = {};
                    var handledSeedDates = {
                        created_at: new Date(seedItem.created_at),
                        updated_at: new Date(seedItem.updated_at),
                        max_email_count_hit_at: new Date(seedItem.max_email_count_hit_at),
                        last_sent_to_at: new Date(seedItem.last_sent_to_at),
                        last_delivered_at: new Date(seedItem.last_delivered_at),
                    };
                    seed = __assign(__assign({}, seedItem), handledSeedDates);
                    return seed;
                });
            }
            else {
                seeds = null;
            }
            var seedList = __assign(__assign(__assign({}, data), { Seeds: seeds }), handledSeedListDates);
            delete seedList.Id;
            return seedList;
        };
        SeedsListsClient.prototype.parseList = function (response) {
            var _this = this;
            var _a;
            var data = {
                items: []
            };
            data.items = (_a = response.body.items) === null || _a === undefined ? undefined : _a.map(function (item) { return _this.prepareSeedList(item); });
            data.pages = this.parsePageLinks(response, '?', 'address');
            data.status = response.status;
            return data;
        };
        SeedsListsClient.prototype.list = function (query) {
            return __awaiter(this, undefined, undefined, function () {
                var queryData, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryData = this.prepareQueryData(query);
                            return [4 /*yield*/, this.request.get('/v4/inbox/seedlists', queryData)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, this.parseList(response)), { status: 200 })];
                    }
                });
            });
        };
        SeedsListsClient.prototype.get = function (id) {
            return __awaiter(this, undefined, undefined, function () {
                var response, updatedSeedsList;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get("/v4/inbox/seedlists/".concat(id))];
                        case 1:
                            response = _a.sent();
                            updatedSeedsList = this.prepareSeedList(response.body.seedlist);
                            return [2 /*return*/, __assign(__assign({}, updatedSeedsList), { status: response.status })];
                    }
                });
            });
        };
        SeedsListsClient.prototype.create = function (data) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.postWithFD('/v4/inbox/seedlists', data)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this.prepareResult(response)];
                    }
                });
            });
        };
        SeedsListsClient.prototype.update = function (id, data) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.put("/v4/inbox/seedlists/".concat(id), data)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this.prepareResult(response)];
                    }
                });
            });
        };
        SeedsListsClient.prototype.destroy = function (id) {
            return __awaiter(this, undefined, undefined, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request.delete("/v4/inbox/seedlists/".concat(id))];
                });
            });
        };
        return SeedsListsClient;
    }(NavigationThruPages));

    var InboxPlacementsClient = /** @class */ (function () {
        function InboxPlacementsClient(request, seedsListsClient, results, providers) {
            this.request = request;
            this.seedsLists = seedsListsClient;
            this.seedsLists = seedsListsClient;
            this.results = results;
            this.providers = providers;
        }
        InboxPlacementsClient.prototype.runTest = function (data) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.post('/v4/inbox/tests', data)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, response.body), { status: response.status })];
                    }
                });
            });
        };
        return InboxPlacementsClient;
    }());

    var InboxPlacementsResultsClient = /** @class */ (function (_super) {
        __extends(InboxPlacementsResultsClient, _super);
        function InboxPlacementsResultsClient(request, attributes, filters, sharing, logger) {
            if (logger === undefined) { logger = console; }
            var _this = _super.call(this, request) || this;
            _this.request = request;
            _this.attributes = attributes;
            _this.filters = filters;
            _this.sharing = sharing;
            _this.logger = logger;
            return _this;
        }
        InboxPlacementsResultsClient.prototype.convertDateToUTC = function (key, inputDate) {
            /*
              Because "new Date('2022-12-25T00:00:00.000Z')" becomes "Sun Dec 25 2022 02:00:00 GMT+0200"
              (plus 2 hours from the timezone)
              and because for API, we need to provide the date in the expected format
              ex: 'Thu, 13 Oct 2011 18:02:00 +0000'.
              Here we try auto-convert them to UTC
            */
            this.logger.warn("Date: \"".concat(inputDate, "\" was auto-converted to UTC time zone.\nValue \"").concat(inputDate.toISOString(), "\" will be used for request.\nConsider using string type for property \"").concat(key, "\" to avoid auto-converting"));
            return inputDate.toISOString();
        };
        InboxPlacementsResultsClient.prototype.prepareQueryData = function (queryData) {
            var _this = this;
            var propsForReplacement = queryData;
            var replacedProps = Object.keys(propsForReplacement).reduce(function (acc, key) {
                var prop = key;
                if (!!propsForReplacement[prop] && typeof propsForReplacement[prop] === 'object') {
                    var value = queryData[prop];
                    acc[prop] = _this.convertDateToUTC(prop, value);
                }
                return acc;
            }, {});
            var result = __assign(__assign({}, queryData), replacedProps);
            return result;
        };
        InboxPlacementsResultsClient.prototype.prepareInboxPlacementsResult = function (data) {
            var box = {};
            var handledSeedListDates = {
                created_at: new Date(data.created_at),
                updated_at: new Date(data.updated_at),
                sharing_expires_at: new Date(data.sharing_expires_at),
            };
            if (data.Box) {
                box = __assign(__assign({}, data.Box), { created_at: new Date(data.Box.created_at), updated_at: new Date(data.Box.updated_at), last_result_at: new Date(data.Box.last_result_at) });
                delete box.ID;
            }
            var inboxPlacementsResult = __assign(__assign(__assign(__assign({}, data), { Box: box }), handledSeedListDates), { id: data.Id });
            delete inboxPlacementsResult.ID;
            return inboxPlacementsResult;
        };
        InboxPlacementsResultsClient.prototype.parseList = function (response) {
            var _this = this;
            var data = {};
            data.items = response.body.items.map(function (item) { return _this.prepareInboxPlacementsResult(item); });
            data.pages = this.parsePageLinks(response, '?', 'address');
            data.status = response.status;
            return data;
        };
        InboxPlacementsResultsClient.prototype.list = function (query) {
            return __awaiter(this, undefined, undefined, function () {
                var queryData, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryData = this.prepareQueryData(query);
                            return [4 /*yield*/, this.request.get('/v4/inbox/results', queryData)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this.parseList(response)];
                    }
                });
            });
        };
        InboxPlacementsResultsClient.prototype.get = function (id) {
            return __awaiter(this, undefined, undefined, function () {
                var response, inboxPlacementResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get("/v4/inbox/results/".concat(id))];
                        case 1:
                            response = _a.sent();
                            inboxPlacementResult = this.prepareInboxPlacementsResult(response.body.result);
                            return [2 /*return*/, {
                                    status: response.status,
                                    inboxPlacementResult: inboxPlacementResult
                                }];
                    }
                });
            });
        };
        InboxPlacementsResultsClient.prototype.destroy = function (id) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.delete("/v4/inbox/results/".concat(id))];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, __assign({ status: response.status }, response.body)];
                    }
                });
            });
        };
        InboxPlacementsResultsClient.prototype.getResultByShareId = function (shareId) {
            return __awaiter(this, undefined, undefined, function () {
                var response, inboxPlacementResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get("/v4/inbox/sharing/public/".concat(shareId))];
                        case 1:
                            response = _a.sent();
                            inboxPlacementResult = this.prepareInboxPlacementsResult(response.body.result);
                            return [2 /*return*/, {
                                    status: response.status,
                                    inboxPlacementResult: inboxPlacementResult
                                }];
                    }
                });
            });
        };
        return InboxPlacementsResultsClient;
    }(NavigationThruPages));

    var InboxPlacementsAttributesClient = /** @class */ (function () {
        function InboxPlacementsAttributesClient(request, path) {
            this.path = path;
            this.request = request;
        }
        InboxPlacementsAttributesClient.prototype.list = function () {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get(this.path)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, {
                                    items: response.body.items,
                                    status: response.status,
                                }];
                    }
                });
            });
        };
        InboxPlacementsAttributesClient.prototype.get = function (attributeName) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get("".concat(this.path, "/").concat(attributeName))];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, response.body), { status: response.status })];
                    }
                });
            });
        };
        return InboxPlacementsAttributesClient;
    }());

    var InboxPlacementsFiltersClient = /** @class */ (function () {
        function InboxPlacementsFiltersClient(request, path) {
            this.request = request;
            this.path = path;
        }
        InboxPlacementsFiltersClient.prototype.list = function () {
            return __awaiter(this, undefined, undefined, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get(this.path)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    status: result.status,
                                    supported_filters: result.body.supported_filters
                                }];
                    }
                });
            });
        };
        return InboxPlacementsFiltersClient;
    }());

    var IPRSharingClient = /** @class */ (function () {
        function IPRSharingClient(request) {
            this.request = request;
        }
        IPRSharingClient.prototype.prepareInboxPlacementsResultSharing = function (data) {
            var handledSeedListDates = {
                expires_at: new Date(data.expires_at),
            };
            var result = __assign(__assign({}, data), handledSeedListDates);
            return result;
        };
        IPRSharingClient.prototype.get = function (id) {
            return __awaiter(this, undefined, undefined, function () {
                var response, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get("/v4/inbox/sharing/".concat(id))];
                        case 1:
                            response = _a.sent();
                            result = this.prepareInboxPlacementsResultSharing(response.body.sharing);
                            return [2 /*return*/, __assign({ status: response.status }, result)];
                    }
                });
            });
        };
        IPRSharingClient.prototype.update = function (id, data) {
            return __awaiter(this, undefined, undefined, function () {
                var response, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.put("/v4/inbox/sharing/".concat(id), {}, { query: "enabled=".concat(data.enabled) })];
                        case 1:
                            response = _a.sent();
                            result = this.prepareInboxPlacementsResultSharing(response.body.sharing);
                            return [2 /*return*/, __assign(__assign({}, result), { status: response.status })];
                    }
                });
            });
        };
        return IPRSharingClient;
    }());

    var InboxPlacementsProvidersClient = /** @class */ (function () {
        function InboxPlacementsProvidersClient(request) {
            this.path = '/v4/inbox/providers';
            this.request = request;
        }
        InboxPlacementsProvidersClient.prototype.parseList = function (response) {
            var data = {};
            data.items = response.body.items.map(function (item) {
                var handledProviderDates = {
                    created_at: new Date(item.created_at),
                    updated_at: new Date(item.updated_at),
                };
                var result = __assign(__assign({}, item), handledProviderDates);
                return result;
            });
            data.status = response.status;
            return data;
        };
        InboxPlacementsProvidersClient.prototype.list = function () {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get(this.path)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this.parseList(response)];
                    }
                });
            });
        };
        return InboxPlacementsProvidersClient;
    }());

    var MetricsClient = /** @class */ (function () {
        function MetricsClient(request, logger) {
            if (logger === undefined) { logger = console; }
            this.request = request;
            this.logger = logger;
        }
        MetricsClient.prototype.convertDateToUTC = function (key, inputDate) {
            /*
              Because "new Date('2022-12-25T00:00:00.000Z')" becomes "Sun Dec 25 2022 02:00:00 GMT+0200"
              (plus 2 hours from the timezone)
              and because for API, we need to provide the date in the expected format
              ex: 'Thu, 13 Oct 2011 18:02:00 +0000'.
              Here we try auto-convert them to UTC
            */
            this.logger.warn("Date:\"".concat(inputDate, "\" was auto-converted to UTC time zone.\nValue \"").concat(inputDate.toUTCString(), "\" will be used for request.\nConsider using string type for property \"").concat(key, "\" to avoid auto-converting"));
            return inputDate.toUTCString();
        };
        MetricsClient.prototype.prepareQuery = function (query) {
            var startDate;
            var endDate;
            if (query) {
                var qStart = query === null || query === undefined ? undefined : query.start;
                var qEnd = query === null || query === undefined ? undefined : query.end;
                startDate = qStart instanceof Date ? this.convertDateToUTC('start', qStart) : qStart !== null && qStart !== undefined ? qStart : '';
                endDate = qEnd && qEnd instanceof Date ? this.convertDateToUTC('end', qEnd) : qEnd !== null && qEnd !== undefined ? qEnd : '';
            }
            var result = __assign(__assign({}, query), { start: startDate, end: endDate });
            return result;
        };
        MetricsClient.prototype.handleResponse = function (response) {
            var resBody = response.body;
            var startDate = Date.parse(resBody.start) ? new Date(resBody.start) : null;
            var endDate = Date.parse(resBody.end) ? new Date(resBody.end) : null;
            var result = __assign(__assign({}, resBody), { status: response.status, start: startDate, end: endDate });
            return result;
        };
        MetricsClient.prototype.getAccount = function (query) {
            return __awaiter(this, undefined, undefined, function () {
                var queryData, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryData = this.prepareQuery(query);
                            return [4 /*yield*/, this.request.post('/v1/analytics/metrics', queryData)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this.handleResponse(response)];
                    }
                });
            });
        };
        MetricsClient.prototype.getAccountUsage = function (query) {
            return __awaiter(this, undefined, undefined, function () {
                var queryData, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryData = this.prepareQuery(query);
                            return [4 /*yield*/, this.request.post('/v1/analytics/usage/metrics', queryData)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this.handleResponse(response)];
                    }
                });
            });
        };
        return MetricsClient;
    }());

    var DomainTrackingClient = /** @class */ (function () {
        function DomainTrackingClient(request) {
            this.request = request;
        }
        DomainTrackingClient.prototype._parseTrackingSettings = function (response) {
            return response.body.tracking;
        };
        DomainTrackingClient.prototype._parseTrackingUpdate = function (response) {
            return response.body;
        };
        DomainTrackingClient.prototype._isOpenTrackingInfoWitPlace = function (obj) {
            return typeof obj === 'object' && 'place_at_the_top' in obj;
        };
        DomainTrackingClient.prototype.get = function (domain) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get("/v2/x509/".concat(domain, "/status"))];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, response.body), { responseStatusCode: response.status })];
                    }
                });
            });
        };
        DomainTrackingClient.prototype.generate = function (domain) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.post("/v2/x509/".concat(domain))];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, response.body), { status: response.status })];
                    }
                });
            });
        };
        DomainTrackingClient.prototype.regenerate = function (domain) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.put("/v2/x509/".concat(domain))];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, response.body), { status: response.status })];
                    }
                });
            });
        };
        DomainTrackingClient.prototype.getTracking = function (domain) {
            return __awaiter(this, undefined, undefined, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get(urljoin('/v3/domains', domain, 'tracking'))];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this._parseTrackingSettings(response)];
                    }
                });
            });
        };
        DomainTrackingClient.prototype.updateTracking = function (domain, type, data) {
            return __awaiter(this, undefined, undefined, function () {
                var preparedData, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            preparedData = __assign({}, data);
                            if (typeof (data === null || data === undefined ? undefined : data.active) === 'boolean') {
                                preparedData.active = (data === null || data === undefined ? undefined : data.active) ? 'yes' : 'no';
                            }
                            if (this._isOpenTrackingInfoWitPlace(data)) {
                                if (typeof (data === null || data === undefined ? undefined : data.place_at_the_top) === 'boolean') {
                                    preparedData.place_at_the_top = (data === null || data === undefined ? undefined : data.place_at_the_top) ? 'yes' : 'no';
                                }
                            }
                            return [4 /*yield*/, this.request.putWithFD(urljoin('/v3/domains', domain, 'tracking', type), preparedData)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, this._parseTrackingUpdate(response)];
                    }
                });
            });
        };
        return DomainTrackingClient;
    }());

    var MailgunClient = /** @class */ (function () {
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
            this.request = new Request$1(config, formData);
            var mailListsMembers = new MailListsMembers(this.request);
            var domainCredentialsClient = new DomainCredentialsClient(this.request);
            var domainTemplatesClient = new DomainTemplatesClient(this.request);
            var domainTagsClient = new DomainTagsClient(this.request);
            var domainTrackingClient = new DomainTrackingClient(this.request);
            var multipleValidationClient = new MultipleValidationClient(this.request);
            var InboxPlacementsResultsSharingClient = new IPRSharingClient(this.request);
            var seedsListsAttributes = new InboxPlacementsAttributesClient(this.request, '/v4/inbox/seedlists/a');
            var resultsAttributesClient = new InboxPlacementsAttributesClient(this.request, '/v4/inbox/results/a');
            var seedsListsFiltersClient = new InboxPlacementsFiltersClient(this.request, '/v4/inbox/seedlists/_filters');
            var resultsFiltersClient = new InboxPlacementsFiltersClient(this.request, '/v4/inbox/results/_filters');
            var seedsListsClient = new SeedsListsClient(this.request, seedsListsAttributes, seedsListsFiltersClient);
            var inboxPlacementsResultsClient = new InboxPlacementsResultsClient(this.request, resultsAttributesClient, resultsFiltersClient, InboxPlacementsResultsSharingClient);
            var inboxPlacementsProvidersClient = new InboxPlacementsProvidersClient(this.request);
            this.domains = new DomainsClient(this.request, domainCredentialsClient, domainTemplatesClient, domainTagsClient, domainTrackingClient);
            this.webhooks = new WebhooksClient(this.request);
            this.events = new EventClient(this.request);
            this.stats = new StatsClient(this.request);
            this.metrics = new MetricsClient(this.request);
            this.suppressions = new SuppressionClient(this.request);
            this.messages = new MessagesClient(this.request);
            this.routes = new RoutesClient(this.request);
            this.ips = new IpsClient(this.request);
            this.ip_pools = new IpPoolsClient(this.request);
            this.lists = new MailingListsClient(this.request, mailListsMembers);
            this.validate = new ValidateClient(this.request, multipleValidationClient);
            this.subaccounts = new SubaccountsClient(this.request);
            this.inboxPlacements = new InboxPlacementsClient(this.request, seedsListsClient, inboxPlacementsResultsClient, inboxPlacementsProvidersClient);
        }
        MailgunClient.prototype.setSubaccount = function (subaccountId) {
            var _a;
            (_a = this.request) === null || _a === undefined ? undefined : _a.setSubaccountHeader(subaccountId);
        };
        MailgunClient.prototype.resetSubaccount = function () {
            var _a;
            (_a = this.request) === null || _a === undefined ? undefined : _a.resetSubaccountHeader();
        };
        return MailgunClient;
    }());

    var Mailgun = /** @class */ (function () {
        function Mailgun(FormData) {
            this.formData = FormData;
        }
        Object.defineProperty(Mailgun, "default", {
            get: function () { return this; },
            enumerable: false,
            configurable: true
        });
        Mailgun.prototype.client = function (options) {
            return new MailgunClient(options, this.formData);
        };
        return Mailgun;
    }());

    return Mailgun;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbGd1bi5hbWQuanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zRXJyb3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b0Zvcm1EYXRhLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvRm9ybURhdGEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9CbG9iLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9jb21tb24vdXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvc0hlYWRlcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcGVlZG9tZXRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90aHJvdHRsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9mZXRjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMvYWRhcHRlcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9lbnYvZGF0YS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy92YWxpZGF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIi4uLy4uL2xpYi9DbGFzc2VzL2NvbW1vbi9FcnJvci50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL2NvbW1vbi9BdHRhY2htZW50c0hhbmRsZXIudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9jb21tb24vRm9ybURhdGFCdWlsZGVyLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3ViYWNjb3VudHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9jb21tb24vUmVxdWVzdC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9FdmVudHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdGF0cy9TdGF0c0NvbnRhaW5lci50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1N0YXRzL1N0YXRzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0VudW1zL2luZGV4LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL0JvdW5jZS50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9Db21wbGFpbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvVW5zdWJzY3JpYmUudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvV2hpdGVMaXN0LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uc0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1dlYmhvb2tzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvTWVzc2FnZXMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9Sb3V0ZXMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9WYWxpZGF0aW9ucy92YWxpZGF0ZS50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0lQcy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0lQUG9vbHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc0NyZWRlbnRpYWxzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVGVtcGxhdGVzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVGFncy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvaW5ib3hQbGFjZW1lbnRzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9BdHRyaWJ1dGVzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL0ZpbHRlcnNDbGllbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvTWV0cmljcy9NZXRyaWNzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVHJhY2tpbmcudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50LnRzIiwiLi4vLi4vbGliL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcclxuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG52YXIgb3duS2V5cyA9IGZ1bmN0aW9uKG8pIHtcclxuICAgIG93bktleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiAobykge1xyXG4gICAgICAgIHZhciBhciA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGsgaW4gbykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSkgYXJbYXIubGVuZ3RoXSA9IGs7XHJcbiAgICAgICAgcmV0dXJuIGFyO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBvd25LZXlzKG8pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgPSBvd25LZXlzKG1vZCksIGkgPSAwOyBpIDwgay5sZW5ndGg7IGkrKykgaWYgKGtbaV0gIT09IFwiZGVmYXVsdFwiKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGtbaV0pO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XHJcbiAgICAgICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xyXG4gICAgICAgIGlmIChhc3luYykge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XHJcbiAgICAgICAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XHJcbiAgICAgICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XHJcbiAgICAgICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuXHJcbn1cclxuXHJcbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XHJcbiAgICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xyXG4gICAgZnVuY3Rpb24gZmFpbChlKSB7XHJcbiAgICAgICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xyXG4gICAgICAgIGVudi5oYXNFcnJvciA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB2YXIgciwgcyA9IDA7XHJcbiAgICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgICAgIHdoaWxlIChyID0gZW52LnN0YWNrLnBvcCgpKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXIuYXN5bmMgJiYgcyA9PT0gMSkgcmV0dXJuIHMgPSAwLCBlbnYuc3RhY2sucHVzaChyKSwgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihuZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgcyB8PSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBmYWlsKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbihwYXRoLCBwcmVzZXJ2ZUpzeCkge1xyXG4gICAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIC9eXFwuXFwuP1xcLy8udGVzdChwYXRoKSkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0c3ggPyBwcmVzZXJ2ZUpzeCA/IFwiLmpzeFwiIDogXCIuanNcIiA6IGQgJiYgKCFleHQgfHwgIWNtKSA/IG0gOiAoZCArIGV4dCArIFwiLlwiICsgY20udG9Mb3dlckNhc2UoKSArIFwianNcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19leHRlbmRzOiBfX2V4dGVuZHMsXHJcbiAgICBfX2Fzc2lnbjogX19hc3NpZ24sXHJcbiAgICBfX3Jlc3Q6IF9fcmVzdCxcclxuICAgIF9fZGVjb3JhdGU6IF9fZGVjb3JhdGUsXHJcbiAgICBfX3BhcmFtOiBfX3BhcmFtLFxyXG4gICAgX19lc0RlY29yYXRlOiBfX2VzRGVjb3JhdGUsXHJcbiAgICBfX3J1bkluaXRpYWxpemVyczogX19ydW5Jbml0aWFsaXplcnMsXHJcbiAgICBfX3Byb3BLZXk6IF9fcHJvcEtleSxcclxuICAgIF9fc2V0RnVuY3Rpb25OYW1lOiBfX3NldEZ1bmN0aW9uTmFtZSxcclxuICAgIF9fbWV0YWRhdGE6IF9fbWV0YWRhdGEsXHJcbiAgICBfX2F3YWl0ZXI6IF9fYXdhaXRlcixcclxuICAgIF9fZ2VuZXJhdG9yOiBfX2dlbmVyYXRvcixcclxuICAgIF9fY3JlYXRlQmluZGluZzogX19jcmVhdGVCaW5kaW5nLFxyXG4gICAgX19leHBvcnRTdGFyOiBfX2V4cG9ydFN0YXIsXHJcbiAgICBfX3ZhbHVlczogX192YWx1ZXMsXHJcbiAgICBfX3JlYWQ6IF9fcmVhZCxcclxuICAgIF9fc3ByZWFkOiBfX3NwcmVhZCxcclxuICAgIF9fc3ByZWFkQXJyYXlzOiBfX3NwcmVhZEFycmF5cyxcclxuICAgIF9fc3ByZWFkQXJyYXk6IF9fc3ByZWFkQXJyYXksXHJcbiAgICBfX2F3YWl0OiBfX2F3YWl0LFxyXG4gICAgX19hc3luY0dlbmVyYXRvcjogX19hc3luY0dlbmVyYXRvcixcclxuICAgIF9fYXN5bmNEZWxlZ2F0b3I6IF9fYXN5bmNEZWxlZ2F0b3IsXHJcbiAgICBfX2FzeW5jVmFsdWVzOiBfX2FzeW5jVmFsdWVzLFxyXG4gICAgX19tYWtlVGVtcGxhdGVPYmplY3Q6IF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxyXG4gICAgX19pbXBvcnRTdGFyOiBfX2ltcG9ydFN0YXIsXHJcbiAgICBfX2ltcG9ydERlZmF1bHQ6IF9faW1wb3J0RGVmYXVsdCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEluOiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXHJcbiAgICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZTogX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXHJcbiAgICBfX2Rpc3Bvc2VSZXNvdXJjZXM6IF9fZGlzcG9zZVJlc291cmNlcyxcclxuICAgIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uOiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbixcclxufTtcclxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9iYXNlNjQgdjEuMC4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMS4wLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiKGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pO1xuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG59KSgndXJsam9pbicsIHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBub3JtYWxpemUgKHN0ckFycmF5KSB7XG4gICAgdmFyIHJlc3VsdEFycmF5ID0gW107XG4gICAgaWYgKHN0ckFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cblxuICAgIGlmICh0eXBlb2Ygc3RyQXJyYXlbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIHN0ckFycmF5WzBdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZmlyc3QgcGFydCBpcyBhIHBsYWluIHByb3RvY29sLCB3ZSBjb21iaW5lIGl0IHdpdGggdGhlIG5leHQgcGFydC5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15bXi86XSs6XFwvKiQvKSAmJiBzdHJBcnJheS5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgZmlyc3QgPSBzdHJBcnJheS5zaGlmdCgpO1xuICAgICAgc3RyQXJyYXlbMF0gPSBmaXJzdCArIHN0ckFycmF5WzBdO1xuICAgIH1cblxuICAgIC8vIFRoZXJlIG11c3QgYmUgdHdvIG9yIHRocmVlIHNsYXNoZXMgaW4gdGhlIGZpbGUgcHJvdG9jb2wsIHR3byBzbGFzaGVzIGluIGFueXRoaW5nIGVsc2UuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eZmlsZTpcXC9cXC9cXC8vKSkge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLycpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBzdHJBcnJheVtpXTtcblxuICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgY29tcG9uZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvbmVudCA9PT0gJycpIHsgY29udGludWU7IH1cblxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBzdGFydGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGZpcnN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvXltcXC9dKy8sICcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgc3RyQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgZW5kaW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgbGFzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3IgdGhlIGxhc3QgY29tcG9uZW50IHdlIHdpbGwgY29tYmluZSBtdWx0aXBsZSBzbGFzaGVzIHRvIGEgc2luZ2xlIG9uZS5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnLycpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRBcnJheS5wdXNoKGNvbXBvbmVudCk7XG5cbiAgICB9XG5cbiAgICB2YXIgc3RyID0gcmVzdWx0QXJyYXkuam9pbignLycpO1xuICAgIC8vIEVhY2ggaW5wdXQgY29tcG9uZW50IGlzIG5vdyBzZXBhcmF0ZWQgYnkgYSBzaW5nbGUgc2xhc2ggZXhjZXB0IHRoZSBwb3NzaWJsZSBmaXJzdCBwbGFpbiBwcm90b2NvbCBwYXJ0LlxuXG4gICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGJlZm9yZSBwYXJhbWV0ZXJzIG9yIGhhc2hcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFwvKFxcP3wmfCNbXiFdKS9nLCAnJDEnKTtcblxuICAgIC8vIHJlcGxhY2UgPyBpbiBwYXJhbWV0ZXJzIHdpdGggJlxuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnPycpO1xuICAgIHN0ciA9IHBhcnRzLnNoaWZ0KCkgKyAocGFydHMubGVuZ3RoID4gMCA/ICc/JzogJycpICsgcGFydHMuam9pbignJicpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlucHV0O1xuXG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpbnB1dCA9IGFyZ3VtZW50c1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShpbnB1dCk7XG4gIH07XG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbmNvbnN0IHt0b1N0cmluZ30gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3Qge2dldFByb3RvdHlwZU9mfSA9IE9iamVjdDtcblxuY29uc3Qga2luZE9mID0gKGNhY2hlID0+IHRoaW5nID0+IHtcbiAgICBjb25zdCBzdHIgPSB0b1N0cmluZy5jYWxsKHRoaW5nKTtcbiAgICByZXR1cm4gY2FjaGVbc3RyXSB8fCAoY2FjaGVbc3RyXSA9IHN0ci5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKSk7XG59KShPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuY29uc3Qga2luZE9mVGVzdCA9ICh0eXBlKSA9PiB7XG4gIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAodGhpbmcpID0+IGtpbmRPZih0aGluZykgPT09IHR5cGVcbn1cblxuY29uc3QgdHlwZU9mVGVzdCA9IHR5cGUgPT4gdGhpbmcgPT4gdHlwZW9mIHRoaW5nID09PSB0eXBlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3Qge2lzQXJyYXl9ID0gQXJyYXk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVbmRlZmluZWQgPSB0eXBlT2ZUZXN0KCd1bmRlZmluZWQnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiBpc0Z1bmN0aW9uKHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcikgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICBsZXQgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmIChpc0FycmF5QnVmZmVyKHZhbC5idWZmZXIpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyaW5nID0gdHlwZU9mVGVzdCgnc3RyaW5nJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVPZlRlc3QoJ2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNOdW1iZXIgPSB0eXBlT2ZUZXN0KCdudW1iZXInKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAodGhpbmcpID0+IHRoaW5nICE9PSBudWxsICYmIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCb29sZWFuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCb29sZWFuLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCb29sZWFuID0gdGhpbmcgPT4gdGhpbmcgPT09IHRydWUgfHwgdGhpbmcgPT09IGZhbHNlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB7XG4gIGlmIChraW5kT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gKHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSkgPT09IG51bGwpICYmICEoU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbCkgJiYgIShTeW1ib2wuaXRlcmF0b3IgaW4gdmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRGF0ZSA9IGtpbmRPZlRlc3QoJ0RhdGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZSA9IGtpbmRPZlRlc3QoJ0ZpbGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGVMaXN0ID0ga2luZE9mVGVzdCgnRmlsZUxpc3QnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmVhbSA9ICh2YWwpID0+IGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRm9ybURhdGEgPSAodGhpbmcpID0+IHtcbiAgbGV0IGtpbmQ7XG4gIHJldHVybiB0aGluZyAmJiAoXG4gICAgKHR5cGVvZiBGb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGluZyBpbnN0YW5jZW9mIEZvcm1EYXRhKSB8fCAoXG4gICAgICBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiYgKFxuICAgICAgICAoa2luZCA9IGtpbmRPZih0aGluZykpID09PSAnZm9ybWRhdGEnIHx8XG4gICAgICAgIC8vIGRldGVjdCBmb3JtLWRhdGEgaW5zdGFuY2VcbiAgICAgICAgKGtpbmQgPT09ICdvYmplY3QnICYmIGlzRnVuY3Rpb24odGhpbmcudG9TdHJpbmcpICYmIHRoaW5nLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IEZvcm1EYXRhXScpXG4gICAgICApXG4gICAgKVxuICApXG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VSTFNlYXJjaFBhcmFtcyA9IGtpbmRPZlRlc3QoJ1VSTFNlYXJjaFBhcmFtcycpO1xuXG5jb25zdCBbaXNSZWFkYWJsZVN0cmVhbSwgaXNSZXF1ZXN0LCBpc1Jlc3BvbnNlLCBpc0hlYWRlcnNdID0gWydSZWFkYWJsZVN0cmVhbScsICdSZXF1ZXN0JywgJ1Jlc3BvbnNlJywgJ0hlYWRlcnMnXS5tYXAoa2luZE9mVGVzdCk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmNvbnN0IHRyaW0gPSAoc3RyKSA9PiBzdHIudHJpbSA/XG4gIHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FsbE93bktleXMgPSBmYWxzZV1cbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbiwge2FsbE93bktleXMgPSBmYWxzZX0gPSB7fSkge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBpO1xuICBsZXQgbDtcblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAoaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgY29uc3Qga2V5cyA9IGFsbE93bktleXMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopIDogT2JqZWN0LmtleXMob2JqKTtcbiAgICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQga2V5O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kS2V5KG9iaiwga2V5KSB7XG4gIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgbGV0IF9rZXk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgX2tleSA9IGtleXNbaV07XG4gICAgaWYgKGtleSA9PT0gX2tleS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gX2tleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IF9nbG9iYWwgPSAoKCkgPT4ge1xuICAvKmVzbGludCBuby11bmRlZjowKi9cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZ2xvYmFsVGhpcztcbiAgcmV0dXJuIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbClcbn0pKCk7XG5cbmNvbnN0IGlzQ29udGV4dERlZmluZWQgPSAoY29udGV4dCkgPT4gIWlzVW5kZWZpbmVkKGNvbnRleHQpICYmIGNvbnRleHQgIT09IF9nbG9iYWw7XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgY29uc3Qge2Nhc2VsZXNzfSA9IGlzQ29udGV4dERlZmluZWQodGhpcykgJiYgdGhpcyB8fCB7fTtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGNvbnN0IGFzc2lnblZhbHVlID0gKHZhbCwga2V5KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0S2V5ID0gY2FzZWxlc3MgJiYgZmluZEtleShyZXN1bHQsIGtleSkgfHwga2V5O1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFt0YXJnZXRLZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2UocmVzdWx0W3RhcmdldEtleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGFyZ3VtZW50c1tpXSAmJiBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzXVxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5jb25zdCBleHRlbmQgPSAoYSwgYiwgdGhpc0FyZywge2FsbE93bktleXN9PSB7fSkgPT4ge1xuICBmb3JFYWNoKGIsICh2YWwsIGtleSkgPT4ge1xuICAgIGlmICh0aGlzQXJnICYmIGlzRnVuY3Rpb24odmFsKSkge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9LCB7YWxsT3duS2V5c30pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuY29uc3Qgc3RyaXBCT00gPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn1cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXVxuICogQHBhcmFtIHtvYmplY3R9IFtkZXNjcmlwdG9yc11cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgaW5oZXJpdHMgPSAoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykgPT4ge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IsICdzdXBlcicsIHtcbiAgICB2YWx1ZTogc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGVcbiAgfSk7XG4gIHByb3BzICYmIE9iamVjdC5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm9wcyk7XG59XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3RyaW5nIGVuZHMgd2l0aCB0aGUgY2hhcmFjdGVycyBvZiBhIHNwZWNpZmllZCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gW3Bvc2l0aW9uPSAwXVxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBlbmRzV2l0aCA9IChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pID0+IHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICBjb25zdCBsYXN0SW5kZXggPSBzdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3NpdGlvbjtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqXG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqXG4gKiBAcmV0dXJucyB7P0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICBpZiAoaXNBcnJheSh0aGluZykpIHJldHVybiB0aGluZztcbiAgbGV0IGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmICghaXNOdW1iZXIoaSkpIHJldHVybiBudWxsO1xuICBjb25zdCBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLyoqXG4gKiBDaGVja2luZyBpZiB0aGUgVWludDhBcnJheSBleGlzdHMgYW5kIGlmIGl0IGRvZXMsIGl0IHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGVcbiAqIHRoaW5nIHBhc3NlZCBpbiBpcyBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5XG4gKlxuICogQHBhcmFtIHtUeXBlZEFycmF5fVxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmNvbnN0IGlzVHlwZWRBcnJheSA9IChUeXBlZEFycmF5ID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuIHRoaW5nID0+IHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2V0UHJvdG90eXBlT2YoVWludDhBcnJheSkpO1xuXG4vKipcbiAqIEZvciBlYWNoIGVudHJ5IGluIHRoZSBvYmplY3QsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGtleSBhbmQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggZW50cnkuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGZvckVhY2hFbnRyeSA9IChvYmosIGZuKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRvciA9IG9iaiAmJiBvYmpbU3ltYm9sLml0ZXJhdG9yXTtcblxuICBjb25zdCBpdGVyYXRvciA9IGdlbmVyYXRvci5jYWxsKG9iaik7XG5cbiAgbGV0IHJlc3VsdDtcblxuICB3aGlsZSAoKHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG4gICAgY29uc3QgcGFpciA9IHJlc3VsdC52YWx1ZTtcbiAgICBmbi5jYWxsKG9iaiwgcGFpclswXSwgcGFpclsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhbmQgYSBzdHJpbmcsIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIGFsbCB0aGUgbWF0Y2hlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWdFeHAgLSBUaGUgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIGFnYWluc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBzZWFyY2guXG4gKlxuICogQHJldHVybnMge0FycmF5PGJvb2xlYW4+fVxuICovXG5jb25zdCBtYXRjaEFsbCA9IChyZWdFeHAsIHN0cikgPT4ge1xuICBsZXQgbWF0Y2hlcztcbiAgY29uc3QgYXJyID0gW107XG5cbiAgd2hpbGUgKChtYXRjaGVzID0gcmVnRXhwLmV4ZWMoc3RyKSkgIT09IG51bGwpIHtcbiAgICBhcnIucHVzaChtYXRjaGVzKTtcbiAgfVxuXG4gIHJldHVybiBhcnI7XG59XG5cbi8qIENoZWNraW5nIGlmIHRoZSBraW5kT2ZUZXN0IGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB3aGVuIHBhc3NlZCBhbiBIVE1MRm9ybUVsZW1lbnQuICovXG5jb25zdCBpc0hUTUxGb3JtID0ga2luZE9mVGVzdCgnSFRNTEZvcm1FbGVtZW50Jyk7XG5cbmNvbnN0IHRvQ2FtZWxDYXNlID0gc3RyID0+IHtcbiAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1stX1xcc10oW2EtelxcZF0pKFxcdyopL2csXG4gICAgZnVuY3Rpb24gcmVwbGFjZXIobSwgcDEsIHAyKSB7XG4gICAgICByZXR1cm4gcDEudG9VcHBlckNhc2UoKSArIHAyO1xuICAgIH1cbiAgKTtcbn07XG5cbi8qIENyZWF0aW5nIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBwcm9wZXJ0eS4gKi9cbmNvbnN0IGhhc093blByb3BlcnR5ID0gKCh7aGFzT3duUHJvcGVydHl9KSA9PiAob2JqLCBwcm9wKSA9PiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpKE9iamVjdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNSZWdFeHAgPSBraW5kT2ZUZXN0KCdSZWdFeHAnKTtcblxuY29uc3QgcmVkdWNlRGVzY3JpcHRvcnMgPSAob2JqLCByZWR1Y2VyKSA9PiB7XG4gIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKTtcbiAgY29uc3QgcmVkdWNlZERlc2NyaXB0b3JzID0ge307XG5cbiAgZm9yRWFjaChkZXNjcmlwdG9ycywgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICBsZXQgcmV0O1xuICAgIGlmICgocmV0ID0gcmVkdWNlcihkZXNjcmlwdG9yLCBuYW1lLCBvYmopKSAhPT0gZmFsc2UpIHtcbiAgICAgIHJlZHVjZWREZXNjcmlwdG9yc1tuYW1lXSA9IHJldCB8fCBkZXNjcmlwdG9yO1xuICAgIH1cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMob2JqLCByZWR1Y2VkRGVzY3JpcHRvcnMpO1xufVxuXG4vKipcbiAqIE1ha2VzIGFsbCBtZXRob2RzIHJlYWQtb25seVxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICovXG5cbmNvbnN0IGZyZWV6ZU1ldGhvZHMgPSAob2JqKSA9PiB7XG4gIHJlZHVjZURlc2NyaXB0b3JzKG9iaiwgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICAvLyBza2lwIHJlc3RyaWN0ZWQgcHJvcHMgaW4gc3RyaWN0IG1vZGVcbiAgICBpZiAoaXNGdW5jdGlvbihvYmopICYmIFsnYXJndW1lbnRzJywgJ2NhbGxlcicsICdjYWxsZWUnXS5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gb2JqW25hbWVdO1xuXG4gICAgaWYgKCFpc0Z1bmN0aW9uKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZmFsc2U7XG5cbiAgICBpZiAoJ3dyaXRhYmxlJyBpbiBkZXNjcmlwdG9yKSB7XG4gICAgICBkZXNjcmlwdG9yLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFkZXNjcmlwdG9yLnNldCkge1xuICAgICAgZGVzY3JpcHRvci5zZXQgPSAoKSA9PiB7XG4gICAgICAgIHRocm93IEVycm9yKCdDYW4gbm90IHJld3JpdGUgcmVhZC1vbmx5IG1ldGhvZCBcXCcnICsgbmFtZSArICdcXCcnKTtcbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3QgdG9PYmplY3RTZXQgPSAoYXJyYXlPclN0cmluZywgZGVsaW1pdGVyKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuXG4gIGNvbnN0IGRlZmluZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBvYmpbdmFsdWVdID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzQXJyYXkoYXJyYXlPclN0cmluZykgPyBkZWZpbmUoYXJyYXlPclN0cmluZykgOiBkZWZpbmUoU3RyaW5nKGFycmF5T3JTdHJpbmcpLnNwbGl0KGRlbGltaXRlcikpO1xuXG4gIHJldHVybiBvYmo7XG59XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fVxuXG5jb25zdCB0b0Zpbml0ZU51bWJlciA9ICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSA9PiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSA9ICt2YWx1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbn1cblxuY29uc3QgQUxQSEEgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonXG5cbmNvbnN0IERJR0lUID0gJzAxMjM0NTY3ODknO1xuXG5jb25zdCBBTFBIQUJFVCA9IHtcbiAgRElHSVQsXG4gIEFMUEhBLFxuICBBTFBIQV9ESUdJVDogQUxQSEEgKyBBTFBIQS50b1VwcGVyQ2FzZSgpICsgRElHSVRcbn1cblxuY29uc3QgZ2VuZXJhdGVTdHJpbmcgPSAoc2l6ZSA9IDE2LCBhbHBoYWJldCA9IEFMUEhBQkVULkFMUEhBX0RJR0lUKSA9PiB7XG4gIGxldCBzdHIgPSAnJztcbiAgY29uc3Qge2xlbmd0aH0gPSBhbHBoYWJldDtcbiAgd2hpbGUgKHNpemUtLSkge1xuICAgIHN0ciArPSBhbHBoYWJldFtNYXRoLnJhbmRvbSgpICogbGVuZ3RofDBdXG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEodGhpbmcgJiYgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIHRoaW5nW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdGb3JtRGF0YScgJiYgdGhpbmdbU3ltYm9sLml0ZXJhdG9yXSk7XG59XG5cbmNvbnN0IHRvSlNPTk9iamVjdCA9IChvYmopID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgQXJyYXkoMTApO1xuXG4gIGNvbnN0IHZpc2l0ID0gKHNvdXJjZSwgaSkgPT4ge1xuXG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKHNvdXJjZSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmKCEoJ3RvSlNPTicgaW4gc291cmNlKSkge1xuICAgICAgICBzdGFja1tpXSA9IHNvdXJjZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gaXNBcnJheShzb3VyY2UpID8gW10gOiB7fTtcblxuICAgICAgICBmb3JFYWNoKHNvdXJjZSwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCByZWR1Y2VkVmFsdWUgPSB2aXNpdCh2YWx1ZSwgaSArIDEpO1xuICAgICAgICAgICFpc1VuZGVmaW5lZChyZWR1Y2VkVmFsdWUpICYmICh0YXJnZXRba2V5XSA9IHJlZHVjZWRWYWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0YWNrW2ldID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIHJldHVybiB2aXNpdChvYmosIDApO1xufVxuXG5jb25zdCBpc0FzeW5jRm4gPSBraW5kT2ZUZXN0KCdBc3luY0Z1bmN0aW9uJyk7XG5cbmNvbnN0IGlzVGhlbmFibGUgPSAodGhpbmcpID0+XG4gIHRoaW5nICYmIChpc09iamVjdCh0aGluZykgfHwgaXNGdW5jdGlvbih0aGluZykpICYmIGlzRnVuY3Rpb24odGhpbmcudGhlbikgJiYgaXNGdW5jdGlvbih0aGluZy5jYXRjaCk7XG5cbi8vIG9yaWdpbmFsIGNvZGVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EaWdpdGFsQnJhaW5KUy9BeGlvc1Byb21pc2UvYmxvYi8xNmRlYWIxMzcxMGVjMDk3Nzk5MjIxMzFmM2ZhNTk1NDMyMGY4M2FiL2xpYi91dGlscy5qcyNMMTEtTDM0XG5cbmNvbnN0IF9zZXRJbW1lZGlhdGUgPSAoKHNldEltbWVkaWF0ZVN1cHBvcnRlZCwgcG9zdE1lc3NhZ2VTdXBwb3J0ZWQpID0+IHtcbiAgaWYgKHNldEltbWVkaWF0ZVN1cHBvcnRlZCkge1xuICAgIHJldHVybiBzZXRJbW1lZGlhdGU7XG4gIH1cblxuICByZXR1cm4gcG9zdE1lc3NhZ2VTdXBwb3J0ZWQgPyAoKHRva2VuLCBjYWxsYmFja3MpID0+IHtcbiAgICBfZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsICh7c291cmNlLCBkYXRhfSkgPT4ge1xuICAgICAgaWYgKHNvdXJjZSA9PT0gX2dsb2JhbCAmJiBkYXRhID09PSB0b2tlbikge1xuICAgICAgICBjYWxsYmFja3MubGVuZ3RoICYmIGNhbGxiYWNrcy5zaGlmdCgpKCk7XG4gICAgICB9XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgcmV0dXJuIChjYikgPT4ge1xuICAgICAgY2FsbGJhY2tzLnB1c2goY2IpO1xuICAgICAgX2dsb2JhbC5wb3N0TWVzc2FnZSh0b2tlbiwgXCIqXCIpO1xuICAgIH1cbiAgfSkoYGF4aW9zQCR7TWF0aC5yYW5kb20oKX1gLCBbXSkgOiAoY2IpID0+IHNldFRpbWVvdXQoY2IpO1xufSkoXG4gIHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicsXG4gIGlzRnVuY3Rpb24oX2dsb2JhbC5wb3N0TWVzc2FnZSlcbik7XG5cbmNvbnN0IGFzYXAgPSB0eXBlb2YgcXVldWVNaWNyb3Rhc2sgIT09ICd1bmRlZmluZWQnID9cbiAgcXVldWVNaWNyb3Rhc2suYmluZChfZ2xvYmFsKSA6ICggdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MubmV4dFRpY2sgfHwgX3NldEltbWVkaWF0ZSk7XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKlxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgQUxQSEFCRVQsXG4gIGdlbmVyYXRlU3RyaW5nLFxuICBpc1NwZWNDb21wbGlhbnRGb3JtLFxuICB0b0pTT05PYmplY3QsXG4gIGlzQXN5bmNGbixcbiAgaXNUaGVuYWJsZSxcbiAgc2V0SW1tZWRpYXRlOiBfc2V0SW1tZWRpYXRlLFxuICBhc2FwXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQXhpb3NFcnJvcihtZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIEVycm9yLmNhbGwodGhpcyk7XG5cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2s7XG4gIH1cblxuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLm5hbWUgPSAnQXhpb3NFcnJvcic7XG4gIGNvZGUgJiYgKHRoaXMuY29kZSA9IGNvZGUpO1xuICBjb25maWcgJiYgKHRoaXMuY29uZmlnID0gY29uZmlnKTtcbiAgcmVxdWVzdCAmJiAodGhpcy5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gIGlmIChyZXNwb25zZSkge1xuICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB0aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cyA/IHJlc3BvbnNlLnN0YXR1cyA6IG51bGw7XG4gIH1cbn1cblxudXRpbHMuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdXRpbHMudG9KU09OT2JqZWN0KHRoaXMuY29uZmlnKSxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXNcbiAgICB9O1xuICB9XG59KTtcblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NFcnJvci5wcm90b3R5cGU7XG5jb25zdCBkZXNjcmlwdG9ycyA9IHt9O1xuXG5bXG4gICdFUlJfQkFEX09QVElPTl9WQUxVRScsXG4gICdFUlJfQkFEX09QVElPTicsXG4gICdFQ09OTkFCT1JURUQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VSUl9ORVRXT1JLJyxcbiAgJ0VSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMnLFxuICAnRVJSX0RFUFJFQ0FURUQnLFxuICAnRVJSX0JBRF9SRVNQT05TRScsXG4gICdFUlJfQkFEX1JFUVVFU1QnLFxuICAnRVJSX0NBTkNFTEVEJyxcbiAgJ0VSUl9OT1RfU1VQUE9SVCcsXG4gICdFUlJfSU5WQUxJRF9VUkwnXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXS5mb3JFYWNoKGNvZGUgPT4ge1xuICBkZXNjcmlwdG9yc1tjb2RlXSA9IHt2YWx1ZTogY29kZX07XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQXhpb3NFcnJvciwgZGVzY3JpcHRvcnMpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSwgJ2lzQXhpb3NFcnJvcicsIHt2YWx1ZTogdHJ1ZX0pO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuQXhpb3NFcnJvci5mcm9tID0gKGVycm9yLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlLCBjdXN0b21Qcm9wcykgPT4ge1xuICBjb25zdCBheGlvc0Vycm9yID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xuXG4gIHV0aWxzLnRvRmxhdE9iamVjdChlcnJvciwgYXhpb3NFcnJvciwgZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IEVycm9yLnByb3RvdHlwZTtcbiAgfSwgcHJvcCA9PiB7XG4gICAgcmV0dXJuIHByb3AgIT09ICdpc0F4aW9zRXJyb3InO1xuICB9KTtcblxuICBBeGlvc0Vycm9yLmNhbGwoYXhpb3NFcnJvciwgZXJyb3IubWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG5cbiAgYXhpb3NFcnJvci5jYXVzZSA9IGVycm9yO1xuXG4gIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0Vycm9yO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxuZXhwb3J0IGRlZmF1bHQgbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG4vLyB0ZW1wb3JhcnkgaG90Zml4IHRvIGF2b2lkIGNpcmN1bGFyIHJlZmVyZW5jZXMgdW50aWwgQXhpb3NVUkxTZWFyY2hQYXJhbXMgaXMgcmVmYWN0b3JlZFxuaW1wb3J0IFBsYXRmb3JtRm9ybURhdGEgZnJvbSAnLi4vcGxhdGZvcm0vbm9kZS9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0aGluZyBpcyBhIGFycmF5IG9yIGpzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhpbmcgLSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGJlIHZpc2l0ZWQuXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVmlzaXRhYmxlKHRoaW5nKSB7XG4gIHJldHVybiB1dGlscy5pc1BsYWluT2JqZWN0KHRoaW5nKSB8fCB1dGlscy5pc0FycmF5KHRoaW5nKTtcbn1cblxuLyoqXG4gKiBJdCByZW1vdmVzIHRoZSBicmFja2V0cyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgcGFyYW1ldGVyLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgd2l0aG91dCB0aGUgYnJhY2tldHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xuICByZXR1cm4gdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSA/IGtleS5zbGljZSgwLCAtMikgOiBrZXk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXRoLCBhIGtleSwgYW5kIGEgYm9vbGVhbiwgYW5kIHJldHVybnMgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBjdXJyZW50IG9iamVjdCBiZWluZyBpdGVyYXRlZCBvdmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGRvdHMgLSBJZiB0cnVlLCB0aGUga2V5IHdpbGwgYmUgcmVuZGVyZWQgd2l0aCBkb3RzIGluc3RlYWQgb2YgYnJhY2tldHMuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICovXG5mdW5jdGlvbiByZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSB7XG4gIGlmICghcGF0aCkgcmV0dXJuIGtleTtcbiAgcmV0dXJuIHBhdGguY29uY2F0KGtleSkubWFwKGZ1bmN0aW9uIGVhY2godG9rZW4sIGkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB0b2tlbiA9IHJlbW92ZUJyYWNrZXRzKHRva2VuKTtcbiAgICByZXR1cm4gIWRvdHMgJiYgaSA/ICdbJyArIHRva2VuICsgJ10nIDogdG9rZW47XG4gIH0pLmpvaW4oZG90cyA/ICcuJyA6ICcnKTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgYXJyYXkgaXMgYW4gYXJyYXkgYW5kIG5vbmUgb2YgaXRzIGVsZW1lbnRzIGFyZSB2aXNpdGFibGUsIHRoZW4gaXQncyBhIGZsYXQgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNGbGF0QXJyYXkoYXJyKSB7XG4gIHJldHVybiB1dGlscy5pc0FycmF5KGFycikgJiYgIWFyci5zb21lKGlzVmlzaXRhYmxlKTtcbn1cblxuY29uc3QgcHJlZGljYXRlcyA9IHV0aWxzLnRvRmxhdE9iamVjdCh1dGlscywge30sIG51bGwsIGZ1bmN0aW9uIGZpbHRlcihwcm9wKSB7XG4gIHJldHVybiAvXmlzW0EtWl0vLnRlc3QocHJvcCk7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgZGF0YSBvYmplY3QgdG8gRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEBwYXJhbSB7P09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy52aXNpdG9yXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tZXRhVG9rZW5zID0gdHJ1ZV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZG90cyA9IGZhbHNlXVxuICogQHBhcmFtIHs/Qm9vbGVhbn0gW29wdGlvbnMuaW5kZXhlcyA9IGZhbHNlXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbi8qKlxuICogSXQgY29udmVydHMgYW4gb2JqZWN0IGludG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBmb3JtIGRhdGEuXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgLSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGFwcGVuZCB0by5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSwgb3B0aW9ucykge1xuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXQgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBmb3JtRGF0YSA9IGZvcm1EYXRhIHx8IG5ldyAoUGxhdGZvcm1Gb3JtRGF0YSB8fCBGb3JtRGF0YSkoKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgb3B0aW9ucyA9IHV0aWxzLnRvRmxhdE9iamVjdChvcHRpb25zLCB7XG4gICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBpbmRleGVzOiBmYWxzZVxuICB9LCBmYWxzZSwgZnVuY3Rpb24gZGVmaW5lZChvcHRpb24sIHNvdXJjZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICAgIHJldHVybiAhdXRpbHMuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICB9KTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2I7XG4gIGNvbnN0IHVzZUJsb2IgPSBfQmxvYiAmJiB1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGZvcm1EYXRhKTtcblxuICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VCbG9iICYmIHV0aWxzLmlzQmxvYih2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdCbG9iIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBhIEJ1ZmZlciBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscy5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdXNlQmxvYiAmJiB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBCbG9iKFt2YWx1ZV0pIDogQnVmZmVyLmZyb20odmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZpc2l0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBrZXlcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmd8TnVtYmVyPn0gcGF0aFxuICAgKiBAdGhpcyB7Rm9ybURhdGF9XG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm4gdHJ1ZSB0byB2aXNpdCB0aGUgZWFjaCBwcm9wIG9mIHRoZSB2YWx1ZSByZWN1cnNpdmVseVxuICAgKi9cbiAgZnVuY3Rpb24gZGVmYXVsdFZpc2l0b3IodmFsdWUsIGtleSwgcGF0aCkge1xuICAgIGxldCBhcnIgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSAmJiAhcGF0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAne30nKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gbWV0YVRva2VucyA/IGtleSA6IGtleS5zbGljZSgwLCAtMik7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh1dGlscy5pc0FycmF5KHZhbHVlKSAmJiBpc0ZsYXRBcnJheSh2YWx1ZSkpIHx8XG4gICAgICAgICgodXRpbHMuaXNGaWxlTGlzdCh2YWx1ZSkgfHwgdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSkgJiYgKGFyciA9IHV0aWxzLnRvQXJyYXkodmFsdWUpKVxuICAgICAgICApKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSByZW1vdmVCcmFja2V0cyhrZXkpO1xuXG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIGVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgICAgISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgICAgICAgICAgaW5kZXhlcyA9PT0gdHJ1ZSA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpIDogKGluZGV4ZXMgPT09IG51bGwgPyBrZXkgOiBrZXkgKyAnW10nKSxcbiAgICAgICAgICAgIGNvbnZlcnRWYWx1ZShlbClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkKHZhbHVlLCBwYXRoKSB7XG4gICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGF0aC5qb2luKCcuJykpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgdmlzaXRvci5jYWxsKFxuICAgICAgICBmb3JtRGF0YSwgZWwsIHV0aWxzLmlzU3RyaW5nKGtleSkgPyBrZXkudHJpbSgpIDoga2V5LCBwYXRoLCBleHBvc2VkSGVscGVyc1xuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBidWlsZChlbCwgcGF0aCA/IHBhdGguY29uY2F0KGtleSkgOiBba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdGFjay5wb3AoKTtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIGJ1aWxkKG9iaik7XG5cbiAgcmV0dXJuIGZvcm1EYXRhO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b0Zvcm1EYXRhO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL3RvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIEl0IGVuY29kZXMgYSBzdHJpbmcgYnkgcmVwbGFjaW5nIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBpbiB0aGUgdW5yZXNlcnZlZCBzZXQgd2l0aFxuICogdGhlaXIgcGVyY2VudC1lbmNvZGVkIGVxdWl2YWxlbnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gZW5jb2RlLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHN0cikge1xuICBjb25zdCBjaGFyTWFwID0ge1xuICAgICchJzogJyUyMScsXG4gICAgXCInXCI6ICclMjcnLFxuICAgICcoJzogJyUyOCcsXG4gICAgJyknOiAnJTI5JyxcbiAgICAnfic6ICclN0UnLFxuICAgICclMjAnOiAnKycsXG4gICAgJyUwMCc6ICdcXHgwMCdcbiAgfTtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpfl18JTIwfCUwMC9nLCBmdW5jdGlvbiByZXBsYWNlcihtYXRjaCkge1xuICAgIHJldHVybiBjaGFyTWFwW21hdGNoXTtcbiAgfSk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXJhbXMgb2JqZWN0IGFuZCBjb252ZXJ0cyBpdCB0byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgdG8gYmUgY29udmVydGVkIHRvIGEgRm9ybURhdGEgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZCB0byB0aGUgQXhpb3MgY29uc3RydWN0b3IuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykge1xuICB0aGlzLl9wYWlycyA9IFtdO1xuXG4gIHBhcmFtcyAmJiB0b0Zvcm1EYXRhKHBhcmFtcywgdGhpcywgb3B0aW9ucyk7XG59XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZTtcblxucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICB0aGlzLl9wYWlycy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xufTtcblxucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoZW5jb2Rlcikge1xuICBjb25zdCBfZW5jb2RlID0gZW5jb2RlciA/IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGVuY29kZXIuY2FsbCh0aGlzLCB2YWx1ZSwgZW5jb2RlKTtcbiAgfSA6IGVuY29kZTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnMubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgIHJldHVybiBfZW5jb2RlKHBhaXJbMF0pICsgJz0nICsgX2VuY29kZShwYWlyWzFdKTtcbiAgfSwgJycpLmpvaW4oJyYnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuXG4vKipcbiAqIEl0IHJlcGxhY2VzIGFsbCBpbnN0YW5jZXMgb2YgdGhlIGNoYXJhY3RlcnMgYDpgLCBgJGAsIGAsYCwgYCtgLCBgW2AsIGFuZCBgXWAgd2l0aCB0aGVpclxuICogVVJJIGVuY29kZWQgY291bnRlcnBhcnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCBUaGUgdmFsdWUgdG8gYmUgZW5jb2RlZC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEBwYXJhbSB7PyhvYmplY3R8RnVuY3Rpb24pfSBvcHRpb25zXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICBcbiAgY29uc3QgX2VuY29kZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGlmICh1dGlscy5pc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIHNlcmlhbGl6ZTogb3B0aW9uc1xuICAgIH07XG4gIH0gXG5cbiAgY29uc3Qgc2VyaWFsaXplRm4gPSBvcHRpb25zICYmIG9wdGlvbnMuc2VyaWFsaXplO1xuXG4gIGxldCBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChzZXJpYWxpemVGbikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBzZXJpYWxpemVGbihwYXJhbXMsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSB1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpID9cbiAgICAgIHBhcmFtcy50b1N0cmluZygpIDpcbiAgICAgIG5ldyBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpLnRvU3RyaW5nKF9lbmNvZGUpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICBjb25zdCBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoXCIjXCIpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuY2xhc3MgSW50ZXJjZXB0b3JNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gICAqL1xuICB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCwgb3B0aW9ucykge1xuICAgIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgICBmdWxmaWxsZWQsXG4gICAgICByZWplY3RlZCxcbiAgICAgIHN5bmNocm9ub3VzOiBvcHRpb25zID8gb3B0aW9ucy5zeW5jaHJvbm91cyA6IGZhbHNlLFxuICAgICAgcnVuV2hlbjogb3B0aW9ucyA/IG9wdGlvbnMucnVuV2hlbiA6IG51bGxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGludGVyY2VwdG9yIHdhcyByZW1vdmVkLCBgZmFsc2VgIG90aGVyd2lzZVxuICAgKi9cbiAgZWplY3QoaWQpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYWxsIGludGVyY2VwdG9ycyBmcm9tIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gICAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICAgKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZvckVhY2goZm4pIHtcbiAgICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICAgIGZuKGgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzaWxlbnRKU09OUGFyc2luZzogdHJ1ZSxcbiAgZm9yY2VkSlNPTlBhcnNpbmc6IHRydWUsXG4gIGNsYXJpZnlUaW1lb3V0RXJyb3I6IGZhbHNlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyA/IFVSTFNlYXJjaFBhcmFtcyA6IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnID8gRm9ybURhdGEgOiBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyA/IEJsb2IgOiBudWxsXG4iLCJpbXBvcnQgVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4vY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMnXG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnLi9jbGFzc2VzL0Zvcm1EYXRhLmpzJ1xuaW1wb3J0IEJsb2IgZnJvbSAnLi9jbGFzc2VzL0Jsb2IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNCcm93c2VyOiB0cnVlLFxuICBjbGFzc2VzOiB7XG4gICAgVVJMU2VhcmNoUGFyYW1zLFxuICAgIEZvcm1EYXRhLFxuICAgIEJsb2JcbiAgfSxcbiAgcHJvdG9jb2xzOiBbJ2h0dHAnLCAnaHR0cHMnLCAnZmlsZScsICdibG9iJywgJ3VybCcsICdkYXRhJ11cbn07XG4iLCJjb25zdCBoYXNCcm93c2VyRW52ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcblxuY29uc3QgX25hdmlnYXRvciA9IHR5cGVvZiBuYXZpZ2F0b3IgPT09ICdvYmplY3QnICYmIG5hdmlnYXRvciB8fCB1bmRlZmluZWQ7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPSBoYXNCcm93c2VyRW52ICYmXG4gICghX25hdmlnYXRvciB8fCBbJ1JlYWN0TmF0aXZlJywgJ05hdGl2ZVNjcmlwdCcsICdOUyddLmluZGV4T2YoX25hdmlnYXRvci5wcm9kdWN0KSA8IDApO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciB3ZWJXb3JrZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBBbHRob3VnaCB0aGUgYGlzU3RhbmRhcmRCcm93c2VyRW52YCBtZXRob2QgaW5kaWNhdGVzIHRoYXRcbiAqIGBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlcmAsIHRoZSBXZWJXb3JrZXIgd2lsbCBzdGlsbCBiZVxuICogZmlsdGVyZWQgb3V0IGR1ZSB0byBpdHMganVkZ21lbnQgc3RhbmRhcmRcbiAqIGB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnYC5cbiAqIFRoaXMgbGVhZHMgdG8gYSBwcm9ibGVtIHdoZW4gYXhpb3MgcG9zdCBgRm9ybURhdGFgIGluIHdlYldvcmtlclxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYgPSAoKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiZcbiAgICB0eXBlb2Ygc2VsZi5pbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nXG4gICk7XG59KSgpO1xuXG5jb25zdCBvcmlnaW4gPSBoYXNCcm93c2VyRW52ICYmIHdpbmRvdy5sb2NhdGlvbi5ocmVmIHx8ICdodHRwOi8vbG9jYWxob3N0JztcblxuZXhwb3J0IHtcbiAgaGFzQnJvd3NlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIF9uYXZpZ2F0b3IgYXMgbmF2aWdhdG9yLFxuICBvcmlnaW5cbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tICcuL25vZGUvaW5kZXguanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi9jb21tb24vdXRpbHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC4uLnV0aWxzLFxuICAuLi5wbGF0Zm9ybVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgb3B0aW9ucykge1xuICByZXR1cm4gdG9Gb3JtRGF0YShkYXRhLCBuZXcgcGxhdGZvcm0uY2xhc3Nlcy5VUkxTZWFyY2hQYXJhbXMoKSwgT2JqZWN0LmFzc2lnbih7XG4gICAgdmlzaXRvcjogZnVuY3Rpb24odmFsdWUsIGtleSwgcGF0aCwgaGVscGVycykge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzTm9kZSAmJiB1dGlscy5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWxwZXJzLmRlZmF1bHRWaXNpdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9LCBvcHRpb25zKSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcgbGlrZSBgZm9vW3hdW3ldW3pdYCBhbmQgcmV0dXJucyBhbiBhcnJheSBsaWtlIGBbJ2ZvbycsICd4JywgJ3knLCAneiddXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICpcbiAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHN0cmluZ3MuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlUHJvcFBhdGgobmFtZSkge1xuICAvLyBmb29beF1beV1bel1cbiAgLy8gZm9vLngueS56XG4gIC8vIGZvby14LXktelxuICAvLyBmb28geCB5IHpcbiAgcmV0dXJuIHV0aWxzLm1hdGNoQWxsKC9cXHcrfFxcWyhcXHcqKV0vZywgbmFtZSkubWFwKG1hdGNoID0+IHtcbiAgICByZXR1cm4gbWF0Y2hbMF0gPT09ICdbXScgPyAnJyA6IG1hdGNoWzFdIHx8IG1hdGNoWzBdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuIGFycmF5IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjb252ZXJ0IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBrZXlzIGFuZCB2YWx1ZXMgYXMgdGhlIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheVRvT2JqZWN0KGFycikge1xuICBjb25zdCBvYmogPSB7fTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XG4gIGxldCBpO1xuICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgbGV0IGtleTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAga2V5ID0ga2V5c1tpXTtcbiAgICBvYmpba2V5XSA9IGFycltrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBGb3JtRGF0YSBvYmplY3QgYW5kIHJldHVybnMgYSBKYXZhU2NyaXB0IG9iamVjdFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGNvbnZlcnQgdG8gSlNPTi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0PHN0cmluZywgYW55PiB8IG51bGx9IFRoZSBjb252ZXJ0ZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBmb3JtRGF0YVRvSlNPTihmb3JtRGF0YSkge1xuICBmdW5jdGlvbiBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldCwgaW5kZXgpIHtcbiAgICBsZXQgbmFtZSA9IHBhdGhbaW5kZXgrK107XG5cbiAgICBpZiAobmFtZSA9PT0gJ19fcHJvdG9fXycpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgaXNOdW1lcmljS2V5ID0gTnVtYmVyLmlzRmluaXRlKCtuYW1lKTtcbiAgICBjb25zdCBpc0xhc3QgPSBpbmRleCA+PSBwYXRoLmxlbmd0aDtcbiAgICBuYW1lID0gIW5hbWUgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0Lmxlbmd0aCA6IG5hbWU7XG5cbiAgICBpZiAoaXNMYXN0KSB7XG4gICAgICBpZiAodXRpbHMuaGFzT3duUHJvcCh0YXJnZXQsIG5hbWUpKSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IFt0YXJnZXRbbmFtZV0sIHZhbHVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldFtuYW1lXSB8fCAhdXRpbHMuaXNPYmplY3QodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gW107XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXRbbmFtZV0sIGluZGV4KTtcblxuICAgIGlmIChyZXN1bHQgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBhcnJheVRvT2JqZWN0KHRhcmdldFtuYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gIH1cblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShmb3JtRGF0YSkgJiYgdXRpbHMuaXNGdW5jdGlvbihmb3JtRGF0YS5lbnRyaWVzKSkge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaEVudHJ5KGZvcm1EYXRhLCAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGJ1aWxkUGF0aChwYXJzZVByb3BQYXRoKG5hbWUpLCB2YWx1ZSwgb2JqLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZm9ybURhdGFUb0pTT047XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4vdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4uL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgdG9VUkxFbmNvZGVkRm9ybSBmcm9tICcuLi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBmb3JtRGF0YVRvSlNPTiBmcm9tICcuLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZywgdHJpZXMgdG8gcGFyc2UgaXQsIGFuZCBpZiBpdCBmYWlscywgaXQgcmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvblxuICogb2YgdGhlIGlucHV0XG4gKlxuICogQHBhcmFtIHthbnl9IHJhd1ZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHN0cmluZ2lmaWVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyc2VyIC0gQSBmdW5jdGlvbiB0aGF0IHBhcnNlcyBhIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmNvZGVyIC0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIHJldHVybnMgYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSByYXdWYWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcbiAgaWYgKHV0aWxzLmlzU3RyaW5nKHJhd1ZhbHVlKSkge1xuICAgIHRyeSB7XG4gICAgICAocGFyc2VyIHx8IEpTT04ucGFyc2UpKHJhd1ZhbHVlKTtcbiAgICAgIHJldHVybiB1dGlscy50cmltKHJhd1ZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5uYW1lICE9PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChlbmNvZGVyIHx8IEpTT04uc3RyaW5naWZ5KShyYXdWYWx1ZSk7XG59XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuXG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogWyd4aHInLCAnaHR0cCcsICdmZXRjaCddLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSB8fCAnJztcbiAgICBjb25zdCBoYXNKU09OQ29udGVudFR5cGUgPSBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPiAtMTtcbiAgICBjb25zdCBpc09iamVjdFBheWxvYWQgPSB1dGlscy5pc09iamVjdChkYXRhKTtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgJiYgdXRpbHMuaXNIVE1MRm9ybShkYXRhKSkge1xuICAgICAgZGF0YSA9IG5ldyBGb3JtRGF0YShkYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0Zvcm1EYXRhID0gdXRpbHMuaXNGb3JtRGF0YShkYXRhKTtcblxuICAgIGlmIChpc0Zvcm1EYXRhKSB7XG4gICAgICByZXR1cm4gaGFzSlNPTkNvbnRlbnRUeXBlID8gSlNPTi5zdHJpbmdpZnkoZm9ybURhdGFUb0pTT04oZGF0YSkpIDogZGF0YTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JywgZmFsc2UpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBsZXQgaXNGaWxlTGlzdDtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQpIHtcbiAgICAgIGlmIChjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIHRoaXMuZm9ybVNlcmlhbGl6ZXIpLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICgoaXNGaWxlTGlzdCA9IHV0aWxzLmlzRmlsZUxpc3QoZGF0YSkpIHx8IGNvbnRlbnRUeXBlLmluZGV4T2YoJ211bHRpcGFydC9mb3JtLWRhdGEnKSA+IC0xKSB7XG4gICAgICAgIGNvbnN0IF9Gb3JtRGF0YSA9IHRoaXMuZW52ICYmIHRoaXMuZW52LkZvcm1EYXRhO1xuXG4gICAgICAgIHJldHVybiB0b0Zvcm1EYXRhKFxuICAgICAgICAgIGlzRmlsZUxpc3QgPyB7J2ZpbGVzW10nOiBkYXRhfSA6IGRhdGEsXG4gICAgICAgICAgX0Zvcm1EYXRhICYmIG5ldyBfRm9ybURhdGEoKSxcbiAgICAgICAgICB0aGlzLmZvcm1TZXJpYWxpemVyXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCB8fCBoYXNKU09OQ29udGVudFR5cGUgKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi9qc29uJywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHN0cmluZ2lmeVNhZmVseShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgY29uc3QgdHJhbnNpdGlvbmFsID0gdGhpcy50cmFuc2l0aW9uYWwgfHwgZGVmYXVsdHMudHJhbnNpdGlvbmFsO1xuICAgIGNvbnN0IGZvcmNlZEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5mb3JjZWRKU09OUGFyc2luZztcbiAgICBjb25zdCBKU09OUmVxdWVzdGVkID0gdGhpcy5yZXNwb25zZVR5cGUgPT09ICdqc29uJztcblxuICAgIGlmICh1dGlscy5pc1Jlc3BvbnNlKGRhdGEpIHx8IHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGlmIChkYXRhICYmIHV0aWxzLmlzU3RyaW5nKGRhdGEpICYmICgoZm9yY2VkSlNPTlBhcnNpbmcgJiYgIXRoaXMucmVzcG9uc2VUeXBlKSB8fCBKU09OUmVxdWVzdGVkKSkge1xuICAgICAgY29uc3Qgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgICAgY29uc3Qgc3RyaWN0SlNPTlBhcnNpbmcgPSAhc2lsZW50SlNPTlBhcnNpbmcgJiYgSlNPTlJlcXVlc3RlZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChzdHJpY3RKU09OUGFyc2luZykge1xuICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIHRoaXMsIG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICBlbnY6IHtcbiAgICBGb3JtRGF0YTogcGxhdGZvcm0uY2xhc3Nlcy5Gb3JtRGF0YSxcbiAgICBCbG9iOiBwbGF0Zm9ybS5jbGFzc2VzLkJsb2JcbiAgfSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9LFxuXG4gIGhlYWRlcnM6IHtcbiAgICBjb21tb246IHtcbiAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICdDb250ZW50LVR5cGUnOiB1bmRlZmluZWRcbiAgICB9XG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgKG1ldGhvZCkgPT4ge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuXG4vLyBSYXdBeGlvc0hlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzLnRvT2JqZWN0U2V0KFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dKTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJhd0hlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IHJhd0hlYWRlcnMgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB7fTtcbiAgbGV0IGtleTtcbiAgbGV0IHZhbDtcbiAgbGV0IGk7XG5cbiAgcmF3SGVhZGVycyAmJiByYXdIZWFkZXJzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IGxpbmUuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IGxpbmUuc3Vic3RyaW5nKGkgKyAxKS50cmltKCk7XG5cbiAgICBpZiAoIWtleSB8fCAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2Zba2V5XSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSkge1xuICAgICAgICBwYXJzZWRba2V5XS5wdXNoKHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgcGFyc2VIZWFkZXJzIGZyb20gJy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzJztcblxuY29uc3QgJGludGVybmFscyA9IFN5bWJvbCgnaW50ZXJuYWxzJyk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlciAmJiBTdHJpbmcoaGVhZGVyKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKG5vcm1hbGl6ZVZhbHVlKSA6IFN0cmluZyh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW5zKHN0cikge1xuICBjb25zdCB0b2tlbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCB0b2tlbnNSRSA9IC8oW15cXHMsOz1dKylcXHMqKD86PVxccyooW14sO10rKSk/L2c7XG4gIGxldCBtYXRjaDtcblxuICB3aGlsZSAoKG1hdGNoID0gdG9rZW5zUkUuZXhlYyhzdHIpKSkge1xuICAgIHRva2Vuc1ttYXRjaFsxXV0gPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmNvbnN0IGlzVmFsaWRIZWFkZXJOYW1lID0gKHN0cikgPT4gL15bLV9hLXpBLVowLTleYHx+LCEjJCUmJyorLl0rJC8udGVzdChzdHIudHJpbSgpKTtcblxuZnVuY3Rpb24gbWF0Y2hIZWFkZXJWYWx1ZShjb250ZXh0LCB2YWx1ZSwgaGVhZGVyLCBmaWx0ZXIsIGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICBpZiAodXRpbHMuaXNGdW5jdGlvbihmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKHRoaXMsIHZhbHVlLCBoZWFkZXIpO1xuICB9XG5cbiAgaWYgKGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICAgIHZhbHVlID0gaGVhZGVyO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc1N0cmluZyh2YWx1ZSkpIHJldHVybjtcblxuICBpZiAodXRpbHMuaXNTdHJpbmcoZmlsdGVyKSkge1xuICAgIHJldHVybiB2YWx1ZS5pbmRleE9mKGZpbHRlcikgIT09IC0xO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzUmVnRXhwKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLnRlc3QodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlci50cmltKClcbiAgICAudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oW2EtelxcZF0pKFxcdyopL2csICh3LCBjaGFyLCBzdHIpID0+IHtcbiAgICAgIHJldHVybiBjaGFyLnRvVXBwZXJDYXNlKCkgKyBzdHI7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQWNjZXNzb3JzKG9iaiwgaGVhZGVyKSB7XG4gIGNvbnN0IGFjY2Vzc29yTmFtZSA9IHV0aWxzLnRvQ2FtZWxDYXNlKCcgJyArIGhlYWRlcik7XG5cbiAgWydnZXQnLCAnc2V0JywgJ2hhcyddLmZvckVhY2gobWV0aG9kTmFtZSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbWV0aG9kTmFtZSArIGFjY2Vzc29yTmFtZSwge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbbWV0aG9kTmFtZV0uY2FsbCh0aGlzLCBoZWFkZXIsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9KTtcbn1cblxuY2xhc3MgQXhpb3NIZWFkZXJzIHtcbiAgY29uc3RydWN0b3IoaGVhZGVycykge1xuICAgIGhlYWRlcnMgJiYgdGhpcy5zZXQoaGVhZGVycyk7XG4gIH1cblxuICBzZXQoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSwgcmV3cml0ZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghbEhlYWRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hlYWRlciBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgbEhlYWRlcik7XG5cbiAgICAgIGlmKCFrZXkgfHwgc2VsZltrZXldID09PSB1bmRlZmluZWQgfHwgX3Jld3JpdGUgPT09IHRydWUgfHwgKF9yZXdyaXRlID09PSB1bmRlZmluZWQgJiYgc2VsZltrZXldICE9PSBmYWxzZSkpIHtcbiAgICAgICAgc2VsZltrZXkgfHwgX2hlYWRlcl0gPSBub3JtYWxpemVWYWx1ZShfdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNldEhlYWRlcnMgPSAoaGVhZGVycywgX3Jld3JpdGUpID0+XG4gICAgICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIChfdmFsdWUsIF9oZWFkZXIpID0+IHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSk7XG5cbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChoZWFkZXIpIHx8IGhlYWRlciBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IpIHtcbiAgICAgIHNldEhlYWRlcnMoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSlcbiAgICB9IGVsc2UgaWYodXRpbHMuaXNTdHJpbmcoaGVhZGVyKSAmJiAoaGVhZGVyID0gaGVhZGVyLnRyaW0oKSkgJiYgIWlzVmFsaWRIZWFkZXJOYW1lKGhlYWRlcikpIHtcbiAgICAgIHNldEhlYWRlcnMocGFyc2VIZWFkZXJzKGhlYWRlciksIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzSGVhZGVycyhoZWFkZXIpKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBoZWFkZXIuZW50cmllcygpKSB7XG4gICAgICAgIHNldEhlYWRlcih2YWx1ZSwga2V5LCByZXdyaXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyICE9IG51bGwgJiYgc2V0SGVhZGVyKHZhbHVlT3JSZXdyaXRlLCBoZWFkZXIsIHJld3JpdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KGhlYWRlciwgcGFyc2VyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzW2tleV07XG5cbiAgICAgICAgaWYgKCFwYXJzZXIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyc2VyID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlVG9rZW5zKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmNhbGwodGhpcywgdmFsdWUsIGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNSZWdFeHAocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuZXhlYyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJzZXIgbXVzdCBiZSBib29sZWFufHJlZ2V4cHxmdW5jdGlvbicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhcyhoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgcmV0dXJuICEhKGtleSAmJiB0aGlzW2tleV0gIT09IHVuZGVmaW5lZCAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlcikpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkZWxldGUoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUhlYWRlcihfaGVhZGVyKSB7XG4gICAgICBfaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoX2hlYWRlcikge1xuICAgICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIF9oZWFkZXIpO1xuXG4gICAgICAgIGlmIChrZXkgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUoc2VsZiwgc2VsZltrZXldLCBrZXksIG1hdGNoZXIpKSkge1xuICAgICAgICAgIGRlbGV0ZSBzZWxmW2tleV07XG5cbiAgICAgICAgICBkZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5KGhlYWRlcikpIHtcbiAgICAgIGhlYWRlci5mb3JFYWNoKGRlbGV0ZUhlYWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZUhlYWRlcihoZWFkZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgY2xlYXIobWF0Y2hlcikge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBub3JtYWxpemUoZm9ybWF0KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShoZWFkZXJzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHNlbGZba2V5XSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gZm9ybWF0ID8gZm9ybWF0SGVhZGVyKGhlYWRlcikgOiBTdHJpbmcoaGVhZGVyKS50cmltKCk7XG5cbiAgICAgIGlmIChub3JtYWxpemVkICE9PSBoZWFkZXIpIHtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgIH1cblxuICAgICAgc2VsZltub3JtYWxpemVkXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblxuICAgICAgaGVhZGVyc1tub3JtYWxpemVkXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbmNhdCguLi50YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuY29uY2F0KHRoaXMsIC4uLnRhcmdldHMpO1xuICB9XG5cbiAgdG9KU09OKGFzU3RyaW5ncykge1xuICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZSAmJiAob2JqW2hlYWRlcl0gPSBhc1N0cmluZ3MgJiYgdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKCcsICcpIDogdmFsdWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSkubWFwKChbaGVhZGVyLCB2YWx1ZV0pID0+IGhlYWRlciArICc6ICcgKyB2YWx1ZSkuam9pbignXFxuJyk7XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdBeGlvc0hlYWRlcnMnO1xuICB9XG5cbiAgc3RhdGljIGZyb20odGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiB0aGlzID8gdGhpbmcgOiBuZXcgdGhpcyh0aGluZyk7XG4gIH1cblxuICBzdGF0aWMgY29uY2F0KGZpcnN0LCAuLi50YXJnZXRzKSB7XG4gICAgY29uc3QgY29tcHV0ZWQgPSBuZXcgdGhpcyhmaXJzdCk7XG5cbiAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4gY29tcHV0ZWQuc2V0KHRhcmdldCkpO1xuXG4gICAgcmV0dXJuIGNvbXB1dGVkO1xuICB9XG5cbiAgc3RhdGljIGFjY2Vzc29yKGhlYWRlcikge1xuICAgIGNvbnN0IGludGVybmFscyA9IHRoaXNbJGludGVybmFsc10gPSAodGhpc1skaW50ZXJuYWxzXSA9IHtcbiAgICAgIGFjY2Vzc29yczoge31cbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IGludGVybmFscy5hY2Nlc3NvcnM7XG4gICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWFjY2Vzc29yc1tsSGVhZGVyXSkge1xuICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xuICAgICAgICBhY2Nlc3NvcnNbbEhlYWRlcl0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzLmlzQXJyYXkoaGVhZGVyKSA/IGhlYWRlci5mb3JFYWNoKGRlZmluZUFjY2Vzc29yKSA6IGRlZmluZUFjY2Vzc29yKGhlYWRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5BeGlvc0hlYWRlcnMuYWNjZXNzb3IoWydDb250ZW50LVR5cGUnLCAnQ29udGVudC1MZW5ndGgnLCAnQWNjZXB0JywgJ0FjY2VwdC1FbmNvZGluZycsICdVc2VyLUFnZW50JywgJ0F1dGhvcml6YXRpb24nXSk7XG5cbi8vIHJlc2VydmVkIG5hbWVzIGhvdGZpeFxudXRpbHMucmVkdWNlRGVzY3JpcHRvcnMoQXhpb3NIZWFkZXJzLnByb3RvdHlwZSwgKHt2YWx1ZX0sIGtleSkgPT4ge1xuICBsZXQgbWFwcGVkID0ga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7IC8vIG1hcCBgc2V0YCA9PiBgU2V0YFxuICByZXR1cm4ge1xuICAgIGdldDogKCkgPT4gdmFsdWUsXG4gICAgc2V0KGhlYWRlclZhbHVlKSB7XG4gICAgICB0aGlzW21hcHBlZF0gPSBoZWFkZXJWYWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG51dGlscy5mcmVlemVNZXRob2RzKEF4aW9zSGVhZGVycyk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zSGVhZGVycztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzO1xuICBjb25zdCBjb250ZXh0ID0gcmVzcG9uc2UgfHwgY29uZmlnO1xuICBjb25zdCBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29udGV4dC5oZWFkZXJzKTtcbiAgbGV0IGRhdGEgPSBjb250ZXh0LmRhdGE7XG5cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdD19IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3Q9fSByZXF1ZXN0IFRoZSByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxlZEVycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIEF4aW9zRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlID09IG51bGwgPyAnY2FuY2VsZWQnIDogbWVzc2FnZSwgQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQsIGNvbmZpZywgcmVxdWVzdCk7XG4gIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbn1cblxudXRpbHMuaW5oZXJpdHMoQ2FuY2VsZWRFcnJvciwgQXhpb3NFcnJvciwge1xuICBfX0NBTkNFTF9fOiB0cnVlXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsZWRFcnJvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9BeGlvc0Vycm9yLmpzJztcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZVByb3RvY29sKHVybCkge1xuICBjb25zdCBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDYWxjdWxhdGUgZGF0YSBtYXhSYXRlXG4gKiBAcGFyYW0ge051bWJlcn0gW3NhbXBsZXNDb3VudD0gMTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW21pbj0gMTAwMF1cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3BlZWRvbWV0ZXIoc2FtcGxlc0NvdW50LCBtaW4pIHtcbiAgc2FtcGxlc0NvdW50ID0gc2FtcGxlc0NvdW50IHx8IDEwO1xuICBjb25zdCBieXRlcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBjb25zdCB0aW1lc3RhbXBzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGxldCBoZWFkID0gMDtcbiAgbGV0IHRhaWwgPSAwO1xuICBsZXQgZmlyc3RTYW1wbGVUUztcblxuICBtaW4gPSBtaW4gIT09IHVuZGVmaW5lZCA/IG1pbiA6IDEwMDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHB1c2goY2h1bmtMZW5ndGgpIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3Qgc3RhcnRlZEF0ID0gdGltZXN0YW1wc1t0YWlsXTtcblxuICAgIGlmICghZmlyc3RTYW1wbGVUUykge1xuICAgICAgZmlyc3RTYW1wbGVUUyA9IG5vdztcbiAgICB9XG5cbiAgICBieXRlc1toZWFkXSA9IGNodW5rTGVuZ3RoO1xuICAgIHRpbWVzdGFtcHNbaGVhZF0gPSBub3c7XG5cbiAgICBsZXQgaSA9IHRhaWw7XG4gICAgbGV0IGJ5dGVzQ291bnQgPSAwO1xuXG4gICAgd2hpbGUgKGkgIT09IGhlYWQpIHtcbiAgICAgIGJ5dGVzQ291bnQgKz0gYnl0ZXNbaSsrXTtcbiAgICAgIGkgPSBpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGhlYWQgPSAoaGVhZCArIDEpICUgc2FtcGxlc0NvdW50O1xuXG4gICAgaWYgKGhlYWQgPT09IHRhaWwpIHtcbiAgICAgIHRhaWwgPSAodGFpbCArIDEpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGlmIChub3cgLSBmaXJzdFNhbXBsZVRTIDwgbWluKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFzc2VkID0gc3RhcnRlZEF0ICYmIG5vdyAtIHN0YXJ0ZWRBdDtcblxuICAgIHJldHVybiBwYXNzZWQgPyBNYXRoLnJvdW5kKGJ5dGVzQ291bnQgKiAxMDAwIC8gcGFzc2VkKSA6IHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3BlZWRvbWV0ZXI7XG4iLCIvKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGxldCB0aHJlc2hvbGQgPSAxMDAwIC8gZnJlcTtcbiAgbGV0IGxhc3RBcmdzO1xuICBsZXQgdGltZXI7XG5cbiAgY29uc3QgaW52b2tlID0gKGFyZ3MsIG5vdyA9IERhdGUubm93KCkpID0+IHtcbiAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgbGFzdEFyZ3MgPSBudWxsO1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICB9XG4gICAgZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gIH1cblxuICBjb25zdCB0aHJvdHRsZWQgPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcGFzc2VkID0gbm93IC0gdGltZXN0YW1wO1xuICAgIGlmICggcGFzc2VkID49IHRocmVzaG9sZCkge1xuICAgICAgaW52b2tlKGFyZ3MsIG5vdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RBcmdzID0gYXJncztcbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgaW52b2tlKGxhc3RBcmdzKVxuICAgICAgICB9LCB0aHJlc2hvbGQgLSBwYXNzZWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZsdXNoID0gKCkgPT4gbGFzdEFyZ3MgJiYgaW52b2tlKGxhc3RBcmdzKTtcblxuICByZXR1cm4gW3Rocm90dGxlZCwgZmx1c2hdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0aHJvdHRsZTtcbiIsImltcG9ydCBzcGVlZG9tZXRlciBmcm9tIFwiLi9zcGVlZG9tZXRlci5qc1wiO1xuaW1wb3J0IHRocm90dGxlIGZyb20gXCIuL3Rocm90dGxlLmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBwcm9ncmVzc0V2ZW50UmVkdWNlciA9IChsaXN0ZW5lciwgaXNEb3dubG9hZFN0cmVhbSwgZnJlcSA9IDMpID0+IHtcbiAgbGV0IGJ5dGVzTm90aWZpZWQgPSAwO1xuICBjb25zdCBfc3BlZWRvbWV0ZXIgPSBzcGVlZG9tZXRlcig1MCwgMjUwKTtcblxuICByZXR1cm4gdGhyb3R0bGUoZSA9PiB7XG4gICAgY29uc3QgbG9hZGVkID0gZS5sb2FkZWQ7XG4gICAgY29uc3QgdG90YWwgPSBlLmxlbmd0aENvbXB1dGFibGUgPyBlLnRvdGFsIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHByb2dyZXNzQnl0ZXMgPSBsb2FkZWQgLSBieXRlc05vdGlmaWVkO1xuICAgIGNvbnN0IHJhdGUgPSBfc3BlZWRvbWV0ZXIocHJvZ3Jlc3NCeXRlcyk7XG4gICAgY29uc3QgaW5SYW5nZSA9IGxvYWRlZCA8PSB0b3RhbDtcblxuICAgIGJ5dGVzTm90aWZpZWQgPSBsb2FkZWQ7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbG9hZGVkLFxuICAgICAgdG90YWwsXG4gICAgICBwcm9ncmVzczogdG90YWwgPyAobG9hZGVkIC8gdG90YWwpIDogdW5kZWZpbmVkLFxuICAgICAgYnl0ZXM6IHByb2dyZXNzQnl0ZXMsXG4gICAgICByYXRlOiByYXRlID8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCAmJiBpblJhbmdlID8gKHRvdGFsIC0gbG9hZGVkKSAvIHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBldmVudDogZSxcbiAgICAgIGxlbmd0aENvbXB1dGFibGU6IHRvdGFsICE9IG51bGwsXG4gICAgICBbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ106IHRydWVcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufVxuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudERlY29yYXRvciA9ICh0b3RhbCwgdGhyb3R0bGVkKSA9PiB7XG4gIGNvbnN0IGxlbmd0aENvbXB1dGFibGUgPSB0b3RhbCAhPSBudWxsO1xuXG4gIHJldHVybiBbKGxvYWRlZCkgPT4gdGhyb3R0bGVkWzBdKHtcbiAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgIHRvdGFsLFxuICAgIGxvYWRlZFxuICB9KSwgdGhyb3R0bGVkWzFdXTtcbn1cblxuZXhwb3J0IGNvbnN0IGFzeW5jRGVjb3JhdG9yID0gKGZuKSA9PiAoLi4uYXJncykgPT4gdXRpbHMuYXNhcCgoKSA9PiBmbiguLi5hcmdzKSk7XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgPyAoKG9yaWdpbiwgaXNNU0lFKSA9PiAodXJsKSA9PiB7XG4gIHVybCA9IG5ldyBVUkwodXJsLCBwbGF0Zm9ybS5vcmlnaW4pO1xuXG4gIHJldHVybiAoXG4gICAgb3JpZ2luLnByb3RvY29sID09PSB1cmwucHJvdG9jb2wgJiZcbiAgICBvcmlnaW4uaG9zdCA9PT0gdXJsLmhvc3QgJiZcbiAgICAoaXNNU0lFIHx8IG9yaWdpbi5wb3J0ID09PSB1cmwucG9ydClcbiAgKTtcbn0pKFxuICBuZXcgVVJMKHBsYXRmb3JtLm9yaWdpbiksXG4gIHBsYXRmb3JtLm5hdmlnYXRvciAmJiAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KHBsYXRmb3JtLm5hdmlnYXRvci51c2VyQWdlbnQpXG4pIDogKCkgPT4gdHJ1ZTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIHtcbiAgICB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIGNvbnN0IGNvb2tpZSA9IFtuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKV07XG5cbiAgICAgIHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpICYmIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcocGF0aCkgJiYgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuXG4gICAgICB1dGlscy5pc1N0cmluZyhkb21haW4pICYmIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG5cbiAgICAgIHNlY3VyZSA9PT0gdHJ1ZSAmJiBjb29raWUucHVzaCgnc2VjdXJlJyk7XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG5cbiAgICByZWFkKG5hbWUpIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgfSxcblxuICAgIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfVxuXG4gIDpcblxuICAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIHtcbiAgICB3cml0ZSgpIHt9LFxuICAgIHJlYWQoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZSgpIHt9XG4gIH07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlzQWJzb2x1dGVVUkwgZnJvbSAnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMLmpzJztcbmltcG9ydCBjb21iaW5lVVJMcyBmcm9tICcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9BeGlvc0hlYWRlcnMuanNcIjtcblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgcHJvcCwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIHByb3AgLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiLCBwcm9wICwgY2FzZWxlc3MpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhLCBwcm9wICwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhYU1JGVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWRhcHRlcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZVR5cGU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkNvb2tpZU5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkhlYWRlck5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25VcGxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgZGVjb21wcmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhDb250ZW50TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heEJvZHlMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYmVmb3JlUmVkaXJlY3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNwb3J0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwc0FnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGNhbmNlbFRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHNvY2tldFBhdGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiICwgcHJvcCkgPT4gbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSxwcm9wLCB0cnVlKVxuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnMSwgY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSBcIi4vaXNVUkxTYW1lT3JpZ2luLmpzXCI7XG5pbXBvcnQgY29va2llcyBmcm9tIFwiLi9jb29raWVzLmpzXCI7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tIFwiLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzXCI7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSBcIi4uL2NvcmUvbWVyZ2VDb25maWcuanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSBcIi4vYnVpbGRVUkwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICBsZXQge2RhdGEsIHdpdGhYU1JGVG9rZW4sIHhzcmZIZWFkZXJOYW1lLCB4c3JmQ29va2llTmFtZSwgaGVhZGVycywgYXV0aH0gPSBuZXdDb25maWc7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwpLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG5cbiAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICBpZiAoYXV0aCkge1xuICAgIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgK1xuICAgICAgYnRvYSgoYXV0aC51c2VybmFtZSB8fCAnJykgKyAnOicgKyAoYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhdXRoLnBhc3N3b3JkKSkgOiAnJykpXG4gICAgKTtcbiAgfVxuXG4gIGxldCBjb250ZW50VHlwZTtcblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgfHwgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKHVuZGVmaW5lZCk7IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9IGVsc2UgaWYgKChjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSkgIT09IGZhbHNlKSB7XG4gICAgICAvLyBmaXggc2VtaWNvbG9uIGR1cGxpY2F0aW9uIGlzc3VlIGZvciBSZWFjdE5hdGl2ZSBGb3JtRGF0YSBpbXBsZW1lbnRhdGlvblxuICAgICAgY29uc3QgW3R5cGUsIC4uLnRva2Vuc10gPSBjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JykubWFwKHRva2VuID0+IHRva2VuLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogW107XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKFt0eXBlIHx8ICdtdWx0aXBhcnQvZm9ybS1kYXRhJywgLi4udG9rZW5zXS5qb2luKCc7ICcpKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIHdpdGhYU1JGVG9rZW4gJiYgdXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59XG5cbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi8uLi9jb3JlL3NldHRsZS5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgcGFyc2VQcm90b2NvbCBmcm9tICcuLi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHtwcm9ncmVzc0V2ZW50UmVkdWNlcn0gZnJvbSAnLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyc7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tIFwiLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzXCI7XG5cbmNvbnN0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCAmJiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcbiAgICBsZXQgcmVxdWVzdERhdGEgPSBfY29uZmlnLmRhdGE7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShfY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgIGxldCB7cmVzcG9uc2VUeXBlLCBvblVwbG9hZFByb2dyZXNzLCBvbkRvd25sb2FkUHJvZ3Jlc3N9ID0gX2NvbmZpZztcbiAgICBsZXQgb25DYW5jZWxlZDtcbiAgICBsZXQgdXBsb2FkVGhyb3R0bGVkLCBkb3dubG9hZFRocm90dGxlZDtcbiAgICBsZXQgZmx1c2hVcGxvYWQsIGZsdXNoRG93bmxvYWQ7XG5cbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgZmx1c2hVcGxvYWQgJiYgZmx1c2hVcGxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG4gICAgICBmbHVzaERvd25sb2FkICYmIGZsdXNoRG93bmxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcblxuICAgICAgX2NvbmZpZy5zaWduYWwgJiYgX2NvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICB9XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgcmVxdWVzdC5vcGVuKF9jb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIF9jb25maWcudXJsLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShcbiAgICAgICAgJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICBsZXQgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBfY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnIDogJ3RpbWVvdXQgZXhjZWVkZWQnO1xuICAgICAgY29uc3QgdHJhbnNpdGlvbmFsID0gX2NvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBpZiAoX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgcmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCAmJiByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShudWxsKTtcblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLnRvSlNPTigpLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFfY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBfY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKG9uRG93bmxvYWRQcm9ncmVzcykge1xuICAgICAgKFtkb3dubG9hZFRocm90dGxlZCwgZmx1c2hEb3dubG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpKTtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBkb3dubG9hZFRocm90dGxlZCk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAob25VcGxvYWRQcm9ncmVzcyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgKFt1cGxvYWRUaHJvdHRsZWQsIGZsdXNoVXBsb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uVXBsb2FkUHJvZ3Jlc3MpKTtcblxuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCB1cGxvYWRUaHJvdHRsZWQpO1xuXG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZmx1c2hVcGxvYWQpO1xuICAgIH1cblxuICAgIGlmIChfY29uZmlnLmNhbmNlbFRva2VuIHx8IF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgb25DYW5jZWxlZCA9IGNhbmNlbCA9PiB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChfY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBfY29uZmlnLnNpZ25hbC5hYm9ydGVkID8gb25DYW5jZWxlZCgpIDogX2NvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woX2NvbmZpZy51cmwpO1xuXG4gICAgaWYgKHByb3RvY29sICYmIHBsYXRmb3JtLnByb3RvY29scy5pbmRleE9mKHByb3RvY29sKSA9PT0gLTEpIHtcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignVW5zdXBwb3J0ZWQgcHJvdG9jb2wgJyArIHByb3RvY29sICsgJzonLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgY29uZmlnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhIHx8IG51bGwpO1xuICB9KTtcbn1cbiIsImltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gXCIuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qc1wiO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuY29uc3QgY29tcG9zZVNpZ25hbHMgPSAoc2lnbmFscywgdGltZW91dCkgPT4ge1xuICBjb25zdCB7bGVuZ3RofSA9IChzaWduYWxzID0gc2lnbmFscyA/IHNpZ25hbHMuZmlsdGVyKEJvb2xlYW4pIDogW10pO1xuXG4gIGlmICh0aW1lb3V0IHx8IGxlbmd0aCkge1xuICAgIGxldCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgbGV0IGFib3J0ZWQ7XG5cbiAgICBjb25zdCBvbmFib3J0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICBjb25zdCBlcnIgPSByZWFzb24gaW5zdGFuY2VvZiBFcnJvciA/IHJlYXNvbiA6IHRoaXMucmVhc29uO1xuICAgICAgICBjb250cm9sbGVyLmFib3J0KGVyciBpbnN0YW5jZW9mIEF4aW9zRXJyb3IgPyBlcnIgOiBuZXcgQ2FuY2VsZWRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogZXJyKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHRpbWVyID0gdGltZW91dCAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIG9uYWJvcnQobmV3IEF4aW9zRXJyb3IoYHRpbWVvdXQgJHt0aW1lb3V0fSBvZiBtcyBleGNlZWRlZGAsIEF4aW9zRXJyb3IuRVRJTUVET1VUKSlcbiAgICB9LCB0aW1lb3V0KVxuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSAoKSA9PiB7XG4gICAgICBpZiAoc2lnbmFscykge1xuICAgICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIHNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xuICAgICAgICAgIHNpZ25hbC51bnN1YnNjcmliZSA/IHNpZ25hbC51bnN1YnNjcmliZShvbmFib3J0KSA6IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2lnbmFscyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpKTtcblxuICAgIGNvbnN0IHtzaWduYWx9ID0gY29udHJvbGxlcjtcblxuICAgIHNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHV0aWxzLmFzYXAodW5zdWJzY3JpYmUpO1xuXG4gICAgcmV0dXJuIHNpZ25hbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb3NlU2lnbmFscztcbiIsIlxuZXhwb3J0IGNvbnN0IHN0cmVhbUNodW5rID0gZnVuY3Rpb24qIChjaHVuaywgY2h1bmtTaXplKSB7XG4gIGxldCBsZW4gPSBjaHVuay5ieXRlTGVuZ3RoO1xuXG4gIGlmICghY2h1bmtTaXplIHx8IGxlbiA8IGNodW5rU2l6ZSkge1xuICAgIHlpZWxkIGNodW5rO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBwb3MgPSAwO1xuICBsZXQgZW5kO1xuXG4gIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICBlbmQgPSBwb3MgKyBjaHVua1NpemU7XG4gICAgeWllbGQgY2h1bmsuc2xpY2UocG9zLCBlbmQpO1xuICAgIHBvcyA9IGVuZDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVhZEJ5dGVzID0gYXN5bmMgZnVuY3Rpb24qIChpdGVyYWJsZSwgY2h1bmtTaXplKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgcmVhZFN0cmVhbShpdGVyYWJsZSkpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoY2h1bmssIGNodW5rU2l6ZSk7XG4gIH1cbn1cblxuY29uc3QgcmVhZFN0cmVhbSA9IGFzeW5jIGZ1bmN0aW9uKiAoc3RyZWFtKSB7XG4gIGlmIChzdHJlYW1bU3ltYm9sLmFzeW5jSXRlcmF0b3JdKSB7XG4gICAgeWllbGQqIHN0cmVhbTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWFkZXIgPSBzdHJlYW0uZ2V0UmVhZGVyKCk7XG4gIHRyeSB7XG4gICAgZm9yICg7Oykge1xuICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCByZWFkZXIuY2FuY2VsKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCkgPT4ge1xuICBjb25zdCBpdGVyYXRvciA9IHJlYWRCeXRlcyhzdHJlYW0sIGNodW5rU2l6ZSk7XG5cbiAgbGV0IGJ5dGVzID0gMDtcbiAgbGV0IGRvbmU7XG4gIGxldCBfb25GaW5pc2ggPSAoZSkgPT4ge1xuICAgIGlmICghZG9uZSkge1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICBvbkZpbmlzaCAmJiBvbkZpbmlzaChlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtKHtcbiAgICBhc3luYyBwdWxsKGNvbnRyb2xsZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHtkb25lLCB2YWx1ZX0gPSBhd2FpdCBpdGVyYXRvci5uZXh0KCk7XG5cbiAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgIF9vbkZpbmlzaCgpO1xuICAgICAgICAgIGNvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGVuID0gdmFsdWUuYnl0ZUxlbmd0aDtcbiAgICAgICAgaWYgKG9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgICBsZXQgbG9hZGVkQnl0ZXMgPSBieXRlcyArPSBsZW47XG4gICAgICAgICAgb25Qcm9ncmVzcyhsb2FkZWRCeXRlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKG5ldyBVaW50OEFycmF5KHZhbHVlKSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX29uRmluaXNoKGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhbmNlbChyZWFzb24pIHtcbiAgICAgIF9vbkZpbmlzaChyZWFzb24pO1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yLnJldHVybigpO1xuICAgIH1cbiAgfSwge1xuICAgIGhpZ2hXYXRlck1hcms6IDJcbiAgfSlcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcbmltcG9ydCBjb21wb3NlU2lnbmFscyBmcm9tIFwiLi4vaGVscGVycy9jb21wb3NlU2lnbmFscy5qc1wiO1xuaW1wb3J0IHt0cmFja1N0cmVhbX0gZnJvbSBcIi4uL2hlbHBlcnMvdHJhY2tTdHJlYW0uanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQge3Byb2dyZXNzRXZlbnRSZWR1Y2VyLCBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yLCBhc3luY0RlY29yYXRvcn0gZnJvbSBcIi4uL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanNcIjtcbmltcG9ydCByZXNvbHZlQ29uZmlnIGZyb20gXCIuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanNcIjtcbmltcG9ydCBzZXR0bGUgZnJvbSBcIi4uL2NvcmUvc2V0dGxlLmpzXCI7XG5cbmNvbnN0IGlzRmV0Y2hTdXBwb3J0ZWQgPSB0eXBlb2YgZmV0Y2ggPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFJlcXVlc3QgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFJlc3BvbnNlID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgdHlwZW9mIFJlYWRhYmxlU3RyZWFtID09PSAnZnVuY3Rpb24nO1xuXG4vLyB1c2VkIG9ubHkgaW5zaWRlIHRoZSBmZXRjaCBhZGFwdGVyXG5jb25zdCBlbmNvZGVUZXh0ID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAodHlwZW9mIFRleHRFbmNvZGVyID09PSAnZnVuY3Rpb24nID9cbiAgICAoKGVuY29kZXIpID0+IChzdHIpID0+IGVuY29kZXIuZW5jb2RlKHN0cikpKG5ldyBUZXh0RW5jb2RlcigpKSA6XG4gICAgYXN5bmMgKHN0cikgPT4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgbmV3IFJlc3BvbnNlKHN0cikuYXJyYXlCdWZmZXIoKSlcbik7XG5cbmNvbnN0IHRlc3QgPSAoZm4sIC4uLmFyZ3MpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmbiguLi5hcmdzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IHN1cHBvcnRzUmVxdWVzdFN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiYgdGVzdCgoKSA9PiB7XG4gIGxldCBkdXBsZXhBY2Nlc3NlZCA9IGZhbHNlO1xuXG4gIGNvbnN0IGhhc0NvbnRlbnRUeXBlID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgYm9keTogbmV3IFJlYWRhYmxlU3RyZWFtKCksXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgZ2V0IGR1cGxleCgpIHtcbiAgICAgIGR1cGxleEFjY2Vzc2VkID0gdHJ1ZTtcbiAgICAgIHJldHVybiAnaGFsZic7XG4gICAgfSxcbiAgfSkuaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpO1xuXG4gIHJldHVybiBkdXBsZXhBY2Nlc3NlZCAmJiAhaGFzQ29udGVudFR5cGU7XG59KTtcblxuY29uc3QgREVGQVVMVF9DSFVOS19TSVpFID0gNjQgKiAxMDI0O1xuXG5jb25zdCBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtID0gaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJlxuICB0ZXN0KCgpID0+IHV0aWxzLmlzUmVhZGFibGVTdHJlYW0obmV3IFJlc3BvbnNlKCcnKS5ib2R5KSk7XG5cblxuY29uc3QgcmVzb2x2ZXJzID0ge1xuICBzdHJlYW06IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKChyZXMpID0+IHJlcy5ib2R5KVxufTtcblxuaXNGZXRjaFN1cHBvcnRlZCAmJiAoKChyZXMpID0+IHtcbiAgWyd0ZXh0JywgJ2FycmF5QnVmZmVyJywgJ2Jsb2InLCAnZm9ybURhdGEnLCAnc3RyZWFtJ10uZm9yRWFjaCh0eXBlID0+IHtcbiAgICAhcmVzb2x2ZXJzW3R5cGVdICYmIChyZXNvbHZlcnNbdHlwZV0gPSB1dGlscy5pc0Z1bmN0aW9uKHJlc1t0eXBlXSkgPyAocmVzKSA9PiByZXNbdHlwZV0oKSA6XG4gICAgICAoXywgY29uZmlnKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBSZXNwb25zZSB0eXBlICcke3R5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCwgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsIGNvbmZpZyk7XG4gICAgICB9KVxuICB9KTtcbn0pKG5ldyBSZXNwb25zZSkpO1xuXG5jb25zdCBnZXRCb2R5TGVuZ3RoID0gYXN5bmMgKGJvZHkpID0+IHtcbiAgaWYgKGJvZHkgPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgaWYodXRpbHMuaXNCbG9iKGJvZHkpKSB7XG4gICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oYm9keSkpIHtcbiAgICBjb25zdCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHBsYXRmb3JtLm9yaWdpbiwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5LFxuICAgIH0pO1xuICAgIHJldHVybiAoYXdhaXQgX3JlcXVlc3QuYXJyYXlCdWZmZXIoKSkuYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpIHx8IHV0aWxzLmlzQXJyYXlCdWZmZXIoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcbiAgICBib2R5ID0gYm9keSArICcnO1xuICB9XG5cbiAgaWYodXRpbHMuaXNTdHJpbmcoYm9keSkpIHtcbiAgICByZXR1cm4gKGF3YWl0IGVuY29kZVRleHQoYm9keSkpLmJ5dGVMZW5ndGg7XG4gIH1cbn1cblxuY29uc3QgcmVzb2x2ZUJvZHlMZW5ndGggPSBhc3luYyAoaGVhZGVycywgYm9keSkgPT4ge1xuICBjb25zdCBsZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihoZWFkZXJzLmdldENvbnRlbnRMZW5ndGgoKSk7XG5cbiAgcmV0dXJuIGxlbmd0aCA9PSBudWxsID8gZ2V0Qm9keUxlbmd0aChib2R5KSA6IGxlbmd0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNGZXRjaFN1cHBvcnRlZCAmJiAoYXN5bmMgKGNvbmZpZykgPT4ge1xuICBsZXQge1xuICAgIHVybCxcbiAgICBtZXRob2QsXG4gICAgZGF0YSxcbiAgICBzaWduYWwsXG4gICAgY2FuY2VsVG9rZW4sXG4gICAgdGltZW91dCxcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICByZXNwb25zZVR5cGUsXG4gICAgaGVhZGVycyxcbiAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgIGZldGNoT3B0aW9uc1xuICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSA/IChyZXNwb25zZVR5cGUgKyAnJykudG9Mb3dlckNhc2UoKSA6ICd0ZXh0JztcblxuICBsZXQgY29tcG9zZWRTaWduYWwgPSBjb21wb3NlU2lnbmFscyhbc2lnbmFsLCBjYW5jZWxUb2tlbiAmJiBjYW5jZWxUb2tlbi50b0Fib3J0U2lnbmFsKCldLCB0aW1lb3V0KTtcblxuICBsZXQgcmVxdWVzdDtcblxuICBjb25zdCB1bnN1YnNjcmliZSA9IGNvbXBvc2VkU2lnbmFsICYmIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlICYmICgoKSA9PiB7XG4gICAgICBjb21wb3NlZFNpZ25hbC51bnN1YnNjcmliZSgpO1xuICB9KTtcblxuICBsZXQgcmVxdWVzdENvbnRlbnRMZW5ndGg7XG5cbiAgdHJ5IHtcbiAgICBpZiAoXG4gICAgICBvblVwbG9hZFByb2dyZXNzICYmIHN1cHBvcnRzUmVxdWVzdFN0cmVhbSAmJiBtZXRob2QgIT09ICdnZXQnICYmIG1ldGhvZCAhPT0gJ2hlYWQnICYmXG4gICAgICAocmVxdWVzdENvbnRlbnRMZW5ndGggPSBhd2FpdCByZXNvbHZlQm9keUxlbmd0aChoZWFkZXJzLCBkYXRhKSkgIT09IDBcbiAgICApIHtcbiAgICAgIGxldCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgZHVwbGV4OiBcImhhbGZcIlxuICAgICAgfSk7XG5cbiAgICAgIGxldCBjb250ZW50VHlwZUhlYWRlcjtcblxuICAgICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgJiYgKGNvbnRlbnRUeXBlSGVhZGVyID0gX3JlcXVlc3QuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSkge1xuICAgICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKGNvbnRlbnRUeXBlSGVhZGVyKVxuICAgICAgfVxuXG4gICAgICBpZiAoX3JlcXVlc3QuYm9keSkge1xuICAgICAgICBjb25zdCBbb25Qcm9ncmVzcywgZmx1c2hdID0gcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgICByZXF1ZXN0Q29udGVudExlbmd0aCxcbiAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvblVwbG9hZFByb2dyZXNzKSlcbiAgICAgICAgKTtcblxuICAgICAgICBkYXRhID0gdHJhY2tTdHJlYW0oX3JlcXVlc3QuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBvblByb2dyZXNzLCBmbHVzaCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF1dGlscy5pc1N0cmluZyh3aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICB3aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHMgPyAnaW5jbHVkZScgOiAnb21pdCc7XG4gICAgfVxuXG4gICAgLy8gQ2xvdWRmbGFyZSBXb3JrZXJzIHRocm93cyB3aGVuIGNyZWRlbnRpYWxzIGFyZSBkZWZpbmVkXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jbG91ZGZsYXJlL3dvcmtlcmQvaXNzdWVzLzkwMlxuICAgIGNvbnN0IGlzQ3JlZGVudGlhbHNTdXBwb3J0ZWQgPSBcImNyZWRlbnRpYWxzXCIgaW4gUmVxdWVzdC5wcm90b3R5cGU7XG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgLi4uZmV0Y2hPcHRpb25zLFxuICAgICAgc2lnbmFsOiBjb21wb3NlZFNpZ25hbCxcbiAgICAgIG1ldGhvZDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLm5vcm1hbGl6ZSgpLnRvSlNPTigpLFxuICAgICAgYm9keTogZGF0YSxcbiAgICAgIGR1cGxleDogXCJoYWxmXCIsXG4gICAgICBjcmVkZW50aWFsczogaXNDcmVkZW50aWFsc1N1cHBvcnRlZCA/IHdpdGhDcmVkZW50aWFscyA6IHVuZGVmaW5lZFxuICAgIH0pO1xuXG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCk7XG5cbiAgICBjb25zdCBpc1N0cmVhbVJlc3BvbnNlID0gc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAocmVzcG9uc2VUeXBlID09PSAnc3RyZWFtJyB8fCByZXNwb25zZVR5cGUgPT09ICdyZXNwb25zZScpO1xuXG4gICAgaWYgKHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKG9uRG93bmxvYWRQcm9ncmVzcyB8fCAoaXNTdHJlYW1SZXNwb25zZSAmJiB1bnN1YnNjcmliZSkpKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge307XG5cbiAgICAgIFsnc3RhdHVzJywgJ3N0YXR1c1RleHQnLCAnaGVhZGVycyddLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgIG9wdGlvbnNbcHJvcF0gPSByZXNwb25zZVtwcm9wXTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCByZXNwb25zZUNvbnRlbnRMZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG5cbiAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBvbkRvd25sb2FkUHJvZ3Jlc3MgJiYgcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgcmVzcG9uc2VDb250ZW50TGVuZ3RoLFxuICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvbkRvd25sb2FkUHJvZ3Jlc3MpLCB0cnVlKVxuICAgICAgKSB8fCBbXTtcblxuICAgICAgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoXG4gICAgICAgIHRyYWNrU3RyZWFtKHJlc3BvbnNlLmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25Qcm9ncmVzcywgKCkgPT4ge1xuICAgICAgICAgIGZsdXNoICYmIGZsdXNoKCk7XG4gICAgICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSksXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlIHx8ICd0ZXh0JztcblxuICAgIGxldCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNvbHZlcnNbdXRpbHMuZmluZEtleShyZXNvbHZlcnMsIHJlc3BvbnNlVHlwZSkgfHwgJ3RleHQnXShyZXNwb25zZSwgY29uZmlnKTtcblxuICAgICFpc1N0cmVhbVJlc3BvbnNlICYmIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG5cbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIGhlYWRlcnM6IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9KVxuICAgIH0pXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG5cbiAgICBpZiAoZXJyICYmIGVyci5uYW1lID09PSAnVHlwZUVycm9yJyAmJiAvZmV0Y2gvaS50ZXN0KGVyci5tZXNzYWdlKSkge1xuICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgbmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpLFxuICAgICAgICB7XG4gICAgICAgICAgY2F1c2U6IGVyci5jYXVzZSB8fCBlcnJcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlcnIsIGVyciAmJiBlcnIuY29kZSwgY29uZmlnLCByZXF1ZXN0KTtcbiAgfVxufSk7XG5cblxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBodHRwQWRhcHRlciBmcm9tICcuL2h0dHAuanMnO1xuaW1wb3J0IHhockFkYXB0ZXIgZnJvbSAnLi94aHIuanMnO1xuaW1wb3J0IGZldGNoQWRhcHRlciBmcm9tICcuL2ZldGNoLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcblxuY29uc3Qga25vd25BZGFwdGVycyA9IHtcbiAgaHR0cDogaHR0cEFkYXB0ZXIsXG4gIHhocjogeGhyQWRhcHRlcixcbiAgZmV0Y2g6IGZldGNoQWRhcHRlclxufVxuXG51dGlscy5mb3JFYWNoKGtub3duQWRhcHRlcnMsIChmbiwgdmFsdWUpID0+IHtcbiAgaWYgKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ25hbWUnLCB7dmFsdWV9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7dmFsdWV9KTtcbiAgfVxufSk7XG5cbmNvbnN0IHJlbmRlclJlYXNvbiA9IChyZWFzb24pID0+IGAtICR7cmVhc29ufWA7XG5cbmNvbnN0IGlzUmVzb2x2ZWRIYW5kbGUgPSAoYWRhcHRlcikgPT4gdXRpbHMuaXNGdW5jdGlvbihhZGFwdGVyKSB8fCBhZGFwdGVyID09PSBudWxsIHx8IGFkYXB0ZXIgPT09IGZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldEFkYXB0ZXI6IChhZGFwdGVycykgPT4ge1xuICAgIGFkYXB0ZXJzID0gdXRpbHMuaXNBcnJheShhZGFwdGVycykgPyBhZGFwdGVycyA6IFthZGFwdGVyc107XG5cbiAgICBjb25zdCB7bGVuZ3RofSA9IGFkYXB0ZXJzO1xuICAgIGxldCBuYW1lT3JBZGFwdGVyO1xuICAgIGxldCBhZGFwdGVyO1xuXG4gICAgY29uc3QgcmVqZWN0ZWRSZWFzb25zID0ge307XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBuYW1lT3JBZGFwdGVyID0gYWRhcHRlcnNbaV07XG4gICAgICBsZXQgaWQ7XG5cbiAgICAgIGFkYXB0ZXIgPSBuYW1lT3JBZGFwdGVyO1xuXG4gICAgICBpZiAoIWlzUmVzb2x2ZWRIYW5kbGUobmFtZU9yQWRhcHRlcikpIHtcbiAgICAgICAgYWRhcHRlciA9IGtub3duQWRhcHRlcnNbKGlkID0gU3RyaW5nKG5hbWVPckFkYXB0ZXIpKS50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICBpZiAoYWRhcHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoYFVua25vd24gYWRhcHRlciAnJHtpZH0nYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGFkYXB0ZXIpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJlamVjdGVkUmVhc29uc1tpZCB8fCAnIycgKyBpXSA9IGFkYXB0ZXI7XG4gICAgfVxuXG4gICAgaWYgKCFhZGFwdGVyKSB7XG5cbiAgICAgIGNvbnN0IHJlYXNvbnMgPSBPYmplY3QuZW50cmllcyhyZWplY3RlZFJlYXNvbnMpXG4gICAgICAgIC5tYXAoKFtpZCwgc3RhdGVdKSA9PiBgYWRhcHRlciAke2lkfSBgICtcbiAgICAgICAgICAoc3RhdGUgPT09IGZhbHNlID8gJ2lzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGVudmlyb25tZW50JyA6ICdpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBidWlsZCcpXG4gICAgICAgICk7XG5cbiAgICAgIGxldCBzID0gbGVuZ3RoID9cbiAgICAgICAgKHJlYXNvbnMubGVuZ3RoID4gMSA/ICdzaW5jZSA6XFxuJyArIHJlYXNvbnMubWFwKHJlbmRlclJlYXNvbikuam9pbignXFxuJykgOiAnICcgKyByZW5kZXJSZWFzb24ocmVhc29uc1swXSkpIDpcbiAgICAgICAgJ2FzIG5vIGFkYXB0ZXIgc3BlY2lmaWVkJztcblxuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGBUaGVyZSBpcyBubyBzdWl0YWJsZSBhZGFwdGVyIHRvIGRpc3BhdGNoIHRoZSByZXF1ZXN0IGAgKyBzLFxuICAgICAgICAnRVJSX05PVF9TVVBQT1JUJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRhcHRlcjtcbiAgfSxcbiAgYWRhcHRlcnM6IGtub3duQWRhcHRlcnNcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRyYW5zZm9ybURhdGEgZnJvbSAnLi90cmFuc2Zvcm1EYXRhLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gXCIuLi9hZGFwdGVycy9hZGFwdGVycy5qc1wiO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29uZmlnLmhlYWRlcnMpO1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgY29uZmlnLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgaWYgKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXS5pbmRleE9mKGNvbmZpZy5tZXRob2QpICE9PSAtMSkge1xuICAgIGNvbmZpZy5oZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLCBmYWxzZSk7XG4gIH1cblxuICBjb25zdCBhZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcihjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyKTtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgIGNvbmZpZyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZWFzb24ucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufVxuIiwiZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBcIjEuNy45XCI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge1ZFUlNJT059IGZyb20gJy4uL2Vudi9kYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKCh0eXBlLCBpKSA9PiB7XG4gIHZhbGlkYXRvcnNbdHlwZV0gPSBmdW5jdGlvbiB2YWxpZGF0b3IodGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSB0eXBlIHx8ICdhJyArIChpIDwgMSA/ICduICcgOiAnICcpICsgdHlwZTtcbiAgfTtcbn0pO1xuXG5jb25zdCBkZXByZWNhdGVkV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uYWwgb3B0aW9uIHZhbGlkYXRvclxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb258Ym9vbGVhbj99IHZhbGlkYXRvciAtIHNldCB0byBmYWxzZSBpZiB0aGUgdHJhbnNpdGlvbmFsIG9wdGlvbiBoYXMgYmVlbiByZW1vdmVkXG4gKiBAcGFyYW0ge3N0cmluZz99IHZlcnNpb24gLSBkZXByZWNhdGVkIHZlcnNpb24gLyByZW1vdmVkIHNpbmNlIHZlcnNpb25cbiAqIEBwYXJhbSB7c3RyaW5nP30gbWVzc2FnZSAtIHNvbWUgbWVzc2FnZSB3aXRoIGFkZGl0aW9uYWwgaW5mb1xuICpcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xudmFsaWRhdG9ycy50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG52YWxpZGF0b3JzLnNwZWxsaW5nID0gZnVuY3Rpb24gc3BlbGxpbmcoY29ycmVjdFNwZWxsaW5nKSB7XG4gIHJldHVybiAodmFsdWUsIG9wdCkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKGAke29wdH0gaXMgbGlrZWx5IGEgbWlzc3BlbGxpbmcgb2YgJHtjb3JyZWN0U3BlbGxpbmd9YCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGNvbnN0IG9wdCA9IGtleXNbaV07XG4gICAgY29uc3QgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XG5pbXBvcnQgSW50ZXJjZXB0b3JNYW5hZ2VyIGZyb20gJy4vSW50ZXJjZXB0b3JNYW5hZ2VyLmpzJztcbmltcG9ydCBkaXNwYXRjaFJlcXVlc3QgZnJvbSAnLi9kaXNwYXRjaFJlcXVlc3QuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vaGVscGVycy92YWxpZGF0b3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teSA9IHt9O1xuXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID8gRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZHVtbXkpIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZHVtbXkuc3RhY2sgPyBkdW1teS5zdGFjay5yZXBsYWNlKC9eLitcXG4vLCAnJykgOiAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWVyci5zdGFjaykge1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gc3RhY2s7XG4gICAgICAgICAgICAvLyBtYXRjaCB3aXRob3V0IHRoZSAyIHRvcCBzdGFjayBsaW5lc1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhY2sgJiYgIVN0cmluZyhlcnIuc3RhY2spLmVuZHNXaXRoKHN0YWNrLnJlcGxhY2UoL14uK1xcbi4rXFxuLywgJycpKSkge1xuICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2tcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZ25vcmUgdGhlIGNhc2Ugd2hlcmUgXCJzdGFja1wiIGlzIGFuIHVuLXdyaXRhYmxlIHByb3BlcnR5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIF9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gICAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gICAgfVxuXG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGNvbnN0IHt0cmFuc2l0aW9uYWwsIHBhcmFtc1NlcmlhbGl6ZXIsIGhlYWRlcnN9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyYW1zU2VyaWFsaXplcikpIHtcbiAgICAgICAgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIgPSB7XG4gICAgICAgICAgc2VyaWFsaXplOiBwYXJhbXNTZXJpYWxpemVyXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcbiAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKGNvbmZpZywge1xuICAgICAgYmFzZVVybDogdmFsaWRhdG9ycy5zcGVsbGluZygnYmFzZVVSTCcpLFxuICAgICAgd2l0aFhzcmZUb2tlbjogdmFsaWRhdG9ycy5zcGVsbGluZygnd2l0aFhTUkZUb2tlbicpXG4gICAgfSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICAgIGNvbmZpZy5tZXRob2QgPSAoY29uZmlnLm1ldGhvZCB8fCB0aGlzLmRlZmF1bHRzLm1ldGhvZCB8fCAnZ2V0JykudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICAgIGxldCBjb250ZXh0SGVhZGVycyA9IGhlYWRlcnMgJiYgdXRpbHMubWVyZ2UoXG4gICAgICBoZWFkZXJzLmNvbW1vbixcbiAgICAgIGhlYWRlcnNbY29uZmlnLm1ldGhvZF1cbiAgICApO1xuXG4gICAgaGVhZGVycyAmJiB1dGlscy5mb3JFYWNoKFxuICAgICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgICAobWV0aG9kKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW21ldGhvZF07XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmNvbmNhdChjb250ZXh0SGVhZGVycywgaGVhZGVycyk7XG5cbiAgICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gICAgY29uc3QgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICBsZXQgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgbGV0IHByb21pc2U7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsZW47XG5cbiAgICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgICAgY29uc3QgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LmJpbmQodGhpcyksIHVuZGVmaW5lZF07XG4gICAgICBjaGFpbi51bnNoaWZ0LmFwcGx5KGNoYWluLCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBjaGFpbi5wdXNoLmFwcGx5KGNoYWluLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgbGVuID0gY2hhaW4ubGVuZ3RoO1xuXG4gICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW5baSsrXSwgY2hhaW5baSsrXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIGxlbiA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIGxldCBuZXdDb25maWcgPSBjb25maWc7XG5cbiAgICBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuICB9XG59XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBpc0Zvcm0gPyB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgICB9IDoge30sXG4gICAgICAgIHVybCxcbiAgICAgICAgZGF0YVxuICAgICAgfSkpO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL0NhbmNlbGVkRXJyb3IuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxUb2tlbn1cbiAqL1xuY2xhc3MgQ2FuY2VsVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbihjYW5jZWwgPT4ge1xuICAgICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgIGxldCBpID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIHRva2VuLl9saXN0ZW5lcnNbaV0oY2FuY2VsKTtcbiAgICAgIH1cbiAgICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbiA9IG9uZnVsZmlsbGVkID0+IHtcbiAgICAgIGxldCBfcmVzb2x2ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAgICovXG4gIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHRvQWJvcnRTaWduYWwoKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGNvbnN0IGFib3J0ID0gKGVycikgPT4ge1xuICAgICAgY29udHJvbGxlci5hYm9ydChlcnIpO1xuICAgIH07XG5cbiAgICB0aGlzLnN1YnNjcmliZShhYm9ydCk7XG5cbiAgICBjb250cm9sbGVyLnNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHRoaXMudW5zdWJzY3JpYmUoYWJvcnQpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuIiwiY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBTdGF0dXNDb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBDYW5jZWxUb2tlbiBmcm9tICcuL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuL2Vudi9kYXRhLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBzcHJlYWQgZnJvbSAnLi9oZWxwZXJzL3NwcmVhZC5qcyc7XG5pbXBvcnQgaXNBeGlvc0Vycm9yIGZyb20gJy4vaGVscGVycy9pc0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IEh0dHBTdGF0dXNDb2RlIGZyb20gJy4vaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycztcblxuYXhpb3MuZm9ybVRvSlNPTiA9IHRoaW5nID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGU7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxuLy8gdGhpcyBtb2R1bGUgc2hvdWxkIG9ubHkgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBheGlvc1xuIiwiaW1wb3J0IGF4aW9zIGZyb20gJy4vbGliL2F4aW9zLmpzJztcblxuLy8gVGhpcyBtb2R1bGUgaXMgaW50ZW5kZWQgdG8gdW53cmFwIEF4aW9zIGRlZmF1bHQgZXhwb3J0IGFzIG5hbWVkLlxuLy8gS2VlcCB0b3AtbGV2ZWwgZXhwb3J0IHNhbWUgd2l0aCBzdGF0aWMgcHJvcGVydGllc1xuLy8gc28gdGhhdCBpdCBjYW4ga2VlcCBzYW1lIHdpdGggZXMgbW9kdWxlIG9yIGNqc1xuY29uc3Qge1xuICBBeGlvcyxcbiAgQXhpb3NFcnJvcixcbiAgQ2FuY2VsZWRFcnJvcixcbiAgaXNDYW5jZWwsXG4gIENhbmNlbFRva2VuLFxuICBWRVJTSU9OLFxuICBhbGwsXG4gIENhbmNlbCxcbiAgaXNBeGlvc0Vycm9yLFxuICBzcHJlYWQsXG4gIHRvRm9ybURhdGEsXG4gIEF4aW9zSGVhZGVycyxcbiAgSHR0cFN0YXR1c0NvZGUsXG4gIGZvcm1Ub0pTT04sXG4gIGdldEFkYXB0ZXIsXG4gIG1lcmdlQ29uZmlnXG59ID0gYXhpb3M7XG5cbmV4cG9ydCB7XG4gIGF4aW9zIGFzIGRlZmF1bHQsXG4gIEF4aW9zLFxuICBBeGlvc0Vycm9yLFxuICBDYW5jZWxlZEVycm9yLFxuICBpc0NhbmNlbCxcbiAgQ2FuY2VsVG9rZW4sXG4gIFZFUlNJT04sXG4gIGFsbCxcbiAgQ2FuY2VsLFxuICBpc0F4aW9zRXJyb3IsXG4gIHNwcmVhZCxcbiAgdG9Gb3JtRGF0YSxcbiAgQXhpb3NIZWFkZXJzLFxuICBIdHRwU3RhdHVzQ29kZSxcbiAgZm9ybVRvSlNPTixcbiAgZ2V0QWRhcHRlcixcbiAgbWVyZ2VDb25maWdcbn1cbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIEFQSUVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBUElFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBUElFcnJvcihfYSkge1xuICAgICAgICB2YXIgc3RhdHVzID0gX2Euc3RhdHVzLCBzdGF0dXNUZXh0ID0gX2Euc3RhdHVzVGV4dCwgbWVzc2FnZSA9IF9hLm1lc3NhZ2UsIF9iID0gX2EuYm9keSwgYm9keSA9IF9iID09PSB2b2lkIDAgPyB7fSA6IF9iO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYm9keU1lc3NhZ2UgPSAnJztcbiAgICAgICAgdmFyIGVycm9yID0gJyc7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGJvZHlNZXNzYWdlID0gYm9keTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJvZHlNZXNzYWdlID0gKGJvZHkgPT09IG51bGwgfHwgYm9keSA9PT0gdm9pZCAwID8gdm9pZCAwIDogYm9keS5tZXNzYWdlKSB8fCAnJztcbiAgICAgICAgICAgIGVycm9yID0gKGJvZHkgPT09IG51bGwgfHwgYm9keSA9PT0gdm9pZCAwID8gdm9pZCAwIDogYm9keS5lcnJvcikgfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zdGFjayA9ICcnO1xuICAgICAgICBfdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIF90aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IGVycm9yIHx8IHN0YXR1c1RleHQgfHwgJyc7XG4gICAgICAgIF90aGlzLmRldGFpbHMgPSBib2R5TWVzc2FnZTtcbiAgICAgICAgX3RoaXMudHlwZSA9ICdNYWlsZ3VuQVBJRXJyb3InO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IgPSBmdW5jdGlvbiAoc3RhdHVzVGV4dCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoe1xuICAgICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgICBzdGF0dXNUZXh0OiBzdGF0dXNUZXh0LFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQVBJRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnQgZGVmYXVsdCBBUElFcnJvcjtcbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvci5qcyc7XG52YXIgQmxvYkZyb21TdHJlYW0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmxvYkZyb21TdHJlYW0oc3RyZWFtLCBzaXplKSB7XG4gICAgICAgIHRoaXMuX3N0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB9XG4gICAgQmxvYkZyb21TdHJlYW0ucHJvdG90eXBlLnN0cmVhbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmVhbTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCbG9iRnJvbVN0cmVhbS5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnQmxvYic7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gQmxvYkZyb21TdHJlYW07XG59KCkpO1xudmFyIEF0dGFjaG1lbnRzSGFuZGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdHRhY2htZW50c0hhbmRsZXIoKSB7XG4gICAgfVxuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuZ2V0QXR0YWNobWVudE9wdGlvbnMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXIgZmlsZW5hbWUgPSBpdGVtLmZpbGVuYW1lLCBjb250ZW50VHlwZSA9IGl0ZW0uY29udGVudFR5cGUsIGtub3duTGVuZ3RoID0gaXRlbS5rbm93bkxlbmd0aDtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCAoZmlsZW5hbWUgPyB7IGZpbGVuYW1lOiBmaWxlbmFtZSB9IDogeyBmaWxlbmFtZTogJ2ZpbGUnIH0pKSwgKGNvbnRlbnRUeXBlICYmIHsgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlIH0pKSwgKGtub3duTGVuZ3RoICYmIHsga25vd25MZW5ndGg6IGtub3duTGVuZ3RoIH0pKTtcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuZ2V0RmlsZUluZm8gPSBmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLm5hbWUsIGNvbnRlbnRUeXBlID0gZmlsZS50eXBlLCBrbm93bkxlbmd0aCA9IGZpbGUuc2l6ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZTogZmlsZW5hbWUsIGNvbnRlbnRUeXBlOiBjb250ZW50VHlwZSwga25vd25MZW5ndGg6IGtub3duTGVuZ3RoIH0pO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5nZXRDdXN0b21GaWxlSW5mbyA9IGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHZhciBmaWxlbmFtZSA9IGZpbGUuZmlsZW5hbWUsIGNvbnRlbnRUeXBlID0gZmlsZS5jb250ZW50VHlwZSwga25vd25MZW5ndGggPSBmaWxlLmtub3duTGVuZ3RoO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyh7IGZpbGVuYW1lOiBmaWxlbmFtZSwgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aDoga25vd25MZW5ndGggfSk7XG4gICAgfTtcbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmdldEJ1ZmZlckluZm8gPSBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgIHZhciBrbm93bkxlbmd0aCA9IGJ1ZmZlci5ieXRlTGVuZ3RoO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyh7IGZpbGVuYW1lOiAnZmlsZScsIGNvbnRlbnRUeXBlOiAnJywga25vd25MZW5ndGg6IGtub3duTGVuZ3RoIH0pO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5pc1N0cmVhbSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGRhdGEucGlwZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuaXNDdXN0b21GaWxlID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbiAgICAgICAgICAgICYmICEhb2JqLmRhdGE7XG4gICAgfTtcbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmlzQnJvd3NlckZpbGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAoISFvYmoubmFtZSB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpKTtcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuaXNCdWZmZXIgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQnVmZmVyLmlzQnVmZmVyKGRhdGEpO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5nZXRBdHRhY2htZW50SW5mbyA9IGZ1bmN0aW9uIChhdHRhY2htZW50KSB7XG4gICAgICAgIHZhciBpc0Jyb3dzZXJGaWxlID0gdGhpcy5pc0Jyb3dzZXJGaWxlKGF0dGFjaG1lbnQpO1xuICAgICAgICB2YXIgaXNDdXN0b21GaWxlID0gdGhpcy5pc0N1c3RvbUZpbGUoYXR0YWNobWVudCk7XG4gICAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiBhdHRhY2htZW50ID09PSAnc3RyaW5nJztcbiAgICAgICAgaWYgKCFpc1N0cmluZykge1xuICAgICAgICAgICAgaWYgKGlzQnJvd3NlckZpbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWxlSW5mbyhhdHRhY2htZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBCdWZmZXIuaXNCdWZmZXIoYXR0YWNobWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWZmZXJJbmZvKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQ3VzdG9tRmlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEN1c3RvbUZpbGVJbmZvKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgZmlsZW5hbWU6ICdmaWxlJyxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBrbm93bkxlbmd0aDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5jb252ZXJ0VG9GRGV4cGVjdGVkU2hhcGUgPSBmdW5jdGlvbiAodXNlclByb3ZpZGVkVmFsdWUpIHtcbiAgICAgICAgdmFyIGlzU3RyZWFtID0gdGhpcy5pc1N0cmVhbSh1c2VyUHJvdmlkZWRWYWx1ZSk7XG4gICAgICAgIHZhciBpc0Jyb3dzZXJGaWxlID0gdGhpcy5pc0Jyb3dzZXJGaWxlKHVzZXJQcm92aWRlZFZhbHVlKTtcbiAgICAgICAgdmFyIGlzQ3VzdG9tRmlsZSA9IHRoaXMuaXNDdXN0b21GaWxlKHVzZXJQcm92aWRlZFZhbHVlKTtcbiAgICAgICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHVzZXJQcm92aWRlZFZhbHVlID09PSAnc3RyaW5nJztcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgaWYgKGlzU3RyZWFtIHx8IGlzU3RyaW5nIHx8IGlzQnJvd3NlckZpbGUgfHwgdGhpcy5pc0J1ZmZlcih1c2VyUHJvdmlkZWRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHVzZXJQcm92aWRlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzQ3VzdG9tRmlsZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdXNlclByb3ZpZGVkVmFsdWUuZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXCJVbmtub3duIGF0dGFjaG1lbnQgdHlwZSBcIi5jb25jYXQodHlwZW9mIHVzZXJQcm92aWRlZFZhbHVlKSwgXCJUaGUgXFxcImF0dGFjaG1lbnRcXFwiIHByb3BlcnR5IGV4cGVjdHMgZWl0aGVyIEJ1ZmZlciwgQmxvYiwgb3IgU3RyaW5nLlxcbiAgICAgICAgICBBbHNvLCBJdCBpcyBwb3NzaWJsZSB0byBwcm92aWRlIGFuIG9iamVjdCB0aGF0IGhhcyB0aGUgcHJvcGVydHkgXFxcImRhdGFcXFwiIHdpdGggYSB2YWx1ZSB0aGF0IGlzIGVxdWFsIHRvIG9uZSBvZiB0aGUgdHlwZXMgY291bnRlZCBiZWZvcmUuXFxuICAgICAgICAgIEFkZGl0aW9uYWxseSwgeW91IG1heSB1c2UgYW4gYXJyYXkgdG8gc2VuZCBtb3JlIHRoYW4gb25lIGF0dGFjaG1lbnQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmdldEJsb2JGcm9tU3RyZWFtID0gZnVuY3Rpb24gKHN0cmVhbSwgc2l6ZSkge1xuICAgICAgICByZXR1cm4gbmV3IEJsb2JGcm9tU3RyZWFtKHN0cmVhbSwgc2l6ZSk7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0YWNobWVudHNIYW5kbGVyO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEF0dGFjaG1lbnRzSGFuZGxlcjtcbiIsImltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBBdHRhY2htZW50c0hhbmRsZXIgZnJvbSAnLi9BdHRhY2htZW50c0hhbmRsZXIuanMnO1xudmFyIEZvcm1EYXRhQnVpbGRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGb3JtRGF0YUJ1aWxkZXIoRm9ybURhdGFDb25zdHJ1Y3Rvcikge1xuICAgICAgICB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IgPSBGb3JtRGF0YUNvbnN0cnVjdG9yO1xuICAgICAgICB0aGlzLmZpbGVLZXlzID0gWydhdHRhY2htZW50JywgJ2lubGluZScsICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJ107XG4gICAgICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyID0gbmV3IEF0dGFjaG1lbnRzSGFuZGxlcigpO1xuICAgIH1cbiAgICBGb3JtRGF0YUJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZUZvcm1EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRhdGEgb2JqZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZvcm1EYXRhID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZGF0YVtrZXldOyB9KVxuICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAoZm9ybURhdGFBY2MsIGtleSkge1xuICAgICAgICAgICAgaWYgKF90aGlzLmZpbGVLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXR0YWNobWVudFZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc01lc3NhZ2VBdHRhY2htZW50KGF0dGFjaG1lbnRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkRmlsZXNUb0ZEKGtleSwgYXR0YWNobWVudFZhbHVlLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcIlVua25vd24gdmFsdWUgXCIuY29uY2F0KGRhdGFba2V5XSwgXCIgd2l0aCB0eXBlIFwiKS5jb25jYXQodHlwZW9mIGRhdGFba2V5XSwgXCIgZm9yIHByb3BlcnR5IFxcXCJcIikuY29uY2F0KGtleSwgXCJcXFwiXCIpLCBcIlRoZSBrZXkgXFxcIlwiLmNvbmNhdChrZXksIFwiXFxcIiBzaG91bGQgaGF2ZSB0eXBlIG9mIEJ1ZmZlciwgU3RyZWFtLCBGaWxlLCBvciBTdHJpbmcgXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdtZXNzYWdlJykgeyAvLyBtaW1lIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZVZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIGlmICghbWVzc2FnZVZhbHVlIHx8ICFfdGhpcy5pc01JTUUobWVzc2FnZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFwiVW5rbm93biBkYXRhIHR5cGUgZm9yIFxcXCJcIi5jb25jYXQoa2V5LCBcIlxcXCIgcHJvcGVydHlcIiksICdUaGUgbWltZSBkYXRhIHNob3VsZCBoYXZlIHR5cGUgb2YgQnVmZmVyLCBTdHJpbmcgb3IgQmxvYicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5hZGRNaW1lRGF0YVRvRkQoa2V5LCBtZXNzYWdlVmFsdWUsIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5hZGRDb21tb25Qcm9wZXJ0eVRvRkQoa2V5LCBkYXRhW2tleV0sIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgfSwgbmV3IHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvcigpKTtcbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhO1xuICAgIH07XG4gICAgRm9ybURhdGFCdWlsZGVyLnByb3RvdHlwZS5hZGRNaW1lRGF0YVRvRkQgPSBmdW5jdGlvbiAoa2V5LCBkYXRhLCBmb3JtRGF0YUluc3RhbmNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHsgLy8gaWYgc3RyaW5nIG9ubHkgdHdvIHBhcmFtZXRlcnMgc2hvdWxkIGJlIHVzZWQuXG4gICAgICAgICAgICBmb3JtRGF0YUluc3RhbmNlLmFwcGVuZChrZXksIGRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzRm9ybURhdGFQYWNrYWdlKGZvcm1EYXRhSW5zdGFuY2UpKSB7IC8vIGZvcm0tZGF0YSBwYWNrYWdlIGlzIHVzZWRcbiAgICAgICAgICAgIHZhciBub2RlRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlO1xuICAgICAgICAgICAgbm9kZUZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGEsIHsgZmlsZW5hbWU6ICdNaW1lTWVzc2FnZScgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBCbG9iICE9PSB1bmRlZmluZWQpIHsgLy8gZWl0aGVyIG5vZGUgPiAxOCBvciBicm93c2VyXG4gICAgICAgICAgICB2YXIgYnJvd3NlckZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZTsgLy8gQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGFcbiAgICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhLCAnTWltZU1lc3NhZ2UnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoZGF0YSkpIHsgLy8gbm9kZSBlbnZpcm9ubWVudFxuICAgICAgICAgICAgICAgIHZhciBibG9iSW5zdGFuY2UgPSBuZXcgQmxvYihbZGF0YV0pO1xuICAgICAgICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBibG9iSW5zdGFuY2UsICdNaW1lTWVzc2FnZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBGb3JtRGF0YUJ1aWxkZXIucHJvdG90eXBlLmlzTUlNRSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgIHx8ICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihkYXRhKVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBSZWFkYWJsZVN0cmVhbSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YSBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtKTtcbiAgICB9O1xuICAgIEZvcm1EYXRhQnVpbGRlci5wcm90b3R5cGUuaXNGb3JtRGF0YVBhY2thZ2UgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgJiYgb2JqICE9PSBudWxsXG4gICAgICAgICAgICAmJiB0eXBlb2Ygb2JqLmdldEhlYWRlcnMgPT09ICdmdW5jdGlvbic7XG4gICAgfTtcbiAgICBGb3JtRGF0YUJ1aWxkZXIucHJvdG90eXBlLmlzTWVzc2FnZUF0dGFjaG1lbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0N1c3RvbUZpbGUodmFsdWUpXG4gICAgICAgICAgICB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICB8fCAodHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgRmlsZSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIodmFsdWUpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbSh2YWx1ZSlcbiAgICAgICAgICAgIHx8IChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeShmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQ3VzdG9tRmlsZShpdGVtKVxuICAgICAgICAgICAgICAgIHx8ICh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSBpbnN0YW5jZW9mIEZpbGUpXG4gICAgICAgICAgICAgICAgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICAgICAgICAgICAgfHwgX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGl0ZW0pXG4gICAgICAgICAgICAgICAgfHwgX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKGl0ZW0pOyB9KSkpO1xuICAgIH07XG4gICAgRm9ybURhdGFCdWlsZGVyLnByb3RvdHlwZS5hZGRGaWxlc1RvRkQgPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lLCB2YWx1ZSwgZm9ybURhdGFJbnN0YW5jZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYXBwZW5kRmlsZVRvRkQgPSBmdW5jdGlvbiAob3JpZ2luYWxLZXksIGF0dGFjaG1lbnQsIGZvcm1EYXRhKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gb3JpZ2luYWxLZXkgPT09ICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJyA/ICdmaWxlJyA6IG9yaWdpbmFsS2V5O1xuICAgICAgICAgICAgdmFyIG9iakRhdGEgPSBfdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuY29udmVydFRvRkRleHBlY3RlZFNoYXBlKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBfdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuZ2V0QXR0YWNobWVudEluZm8oYXR0YWNobWVudCk7XG4gICAgICAgICAgICBpZiAoX3RoaXMuaXNGb3JtRGF0YVBhY2thZ2UoZm9ybURhdGEpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZkID0gZm9ybURhdGE7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0eXBlb2Ygb2JqRGF0YSA9PT0gJ3N0cmluZycgPyBCdWZmZXIuZnJvbShvYmpEYXRhKSA6IG9iakRhdGE7XG4gICAgICAgICAgICAgICAgZmQuYXBwZW5kKGtleSwgZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBCbG9iICE9PSB1bmRlZmluZWQpIHsgLy8gZWl0aGVyIG5vZGUgPiAxOCBvciBicm93c2VyXG4gICAgICAgICAgICAgICAgdmFyIGJyb3dzZXJGb3JtRGF0YSA9IGZvcm1EYXRhSW5zdGFuY2U7IC8vIEJyb3dzZXIgY29tcGxpYW50IEZvcm1EYXRhXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpEYXRhID09PSAnc3RyaW5nJyB8fCBfdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIob2JqRGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJsb2JJbnN0YW5jZSA9IG5ldyBCbG9iKFtvYmpEYXRhXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBibG9iSW5zdGFuY2UsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvYmpEYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgb2JqRGF0YSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShvYmpEYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmxvYiA9IF90aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5nZXRCbG9iRnJvbVN0cmVhbShvYmpEYXRhLCBvcHRpb25zLmtub3duTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJvd3NlckZvcm1EYXRhLnNldChrZXksIGJsb2IsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCBpdGVtLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCB2YWx1ZSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEZvcm1EYXRhQnVpbGRlci5wcm90b3R5cGUuYWRkQ29tbW9uUHJvcGVydHlUb0ZEID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIGZvcm1EYXRhQWNjKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBhZGRWYWx1ZUJhc2VkT25GRCA9IGZ1bmN0aW9uIChmZEtleSwgZmRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKF90aGlzLmlzRm9ybURhdGFQYWNrYWdlKGZvcm1EYXRhQWNjKSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZmRWYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgcmVjZWl2ZWQgdmFsdWUgaXMgYW4gb2JqZWN0LiBcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICArICdcIkpTT04uU3RyaW5naWZ5XCIgd2lsbCBiZSB1c2VkIHRvIGF2b2lkIFR5cGVFcnJvciBcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICArICdUbyByZW1vdmUgdGhpcyB3YXJuaW5nOiBcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICArICdDb25zaWRlciBzd2l0Y2hpbmcgdG8gYnVpbHQtaW4gRm9ybURhdGEgb3IgY29udmVydGluZyB0aGUgdmFsdWUgb24geW91ciBvd24uXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIEpTT04uc3RyaW5naWZ5KGZkVmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgZmRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZkVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgZmRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIEJsb2IgIT09IHVuZGVmaW5lZCAmJiBmZFZhbHVlIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIGZkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignVW5rbm93biB2YWx1ZSB0eXBlIGZvciBGb3JtIERhdGEuIFN0cmluZyBvciBCbG9iIGV4cGVjdGVkJywgJ0Jyb3dzZXIgY29tcGxpYW50IEZvcm1EYXRhIGFsbG93cyBvbmx5IHN0cmluZyBvciBCbG9iIHZhbHVlcyBmb3IgcHJvcGVydGllcyB0aGF0IGFyZSBub3QgYXR0YWNobWVudHMuJyk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGFkZFZhbHVlQmFzZWRPbkZEKGtleSwgaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBhZGRWYWx1ZUJhc2VkT25GRChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEZvcm1EYXRhQnVpbGRlcjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBGb3JtRGF0YUJ1aWxkZXI7XG4iLCJ2YXIgU3ViYWNjb3VudHNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3ViYWNjb3VudHNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBTdWJhY2NvdW50c0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3Y1L2FjY291bnRzL3N1YmFjY291bnRzJywgcXVlcnkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBTdWJhY2NvdW50c0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y1L2FjY291bnRzL3N1YmFjY291bnRzL1wiLmNvbmNhdChpZCkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBTdWJhY2NvdW50c0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMnLCB7IG5hbWU6IG5hbWUgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIFN1YmFjY291bnRzQ2xpZW50LnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KFwiL3Y1L2FjY291bnRzL3N1YmFjY291bnRzL1wiLmNvbmNhdChpZCwgXCIvZW5hYmxlXCIpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pO1xuICAgIH07XG4gICAgU3ViYWNjb3VudHNDbGllbnQucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KFwiL3Y1L2FjY291bnRzL3N1YmFjY291bnRzL1wiLmNvbmNhdChpZCwgXCIvZGlzYWJsZVwiKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIFN1YmFjY291bnRzQ2xpZW50LlNVQkFDQ09VTlRfSEVBREVSID0gJ1gtTWFpbGd1bi1Pbi1CZWhhbGYtT2YnO1xuICAgIHJldHVybiBTdWJhY2NvdW50c0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBTdWJhY2NvdW50c0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSAnYmFzZS02NCc7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NIZWFkZXJzLCB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBGb3JtRGF0YUJ1aWxkZXIgZnJvbSAnLi9Gb3JtRGF0YUJ1aWxkZXIuanMnO1xuaW1wb3J0IFN1YmFjY291bnRzQ2xpZW50IGZyb20gJy4uL1N1YmFjY291bnRzLmpzJztcbnZhciBSZXF1ZXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlcXVlc3Qob3B0aW9ucywgZm9ybURhdGEpIHtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IG9wdGlvbnMudXNlcm5hbWU7XG4gICAgICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXk7XG4gICAgICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmw7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3Qob3B0aW9ucy5oZWFkZXJzKTtcbiAgICAgICAgdGhpcy5mb3JtRGF0YUJ1aWxkZXIgPSBuZXcgRm9ybURhdGFCdWlsZGVyKGZvcm1EYXRhKTtcbiAgICAgICAgdGhpcy5tYXhCb2R5TGVuZ3RoID0gNTI0Mjg4MDA7IC8vIDUwIE1CXG4gICAgICAgIHRoaXMucHJveHkgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucHJveHk7XG4gICAgfVxuICAgIFJlcXVlc3QucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiAobWV0aG9kLCB1cmwsIG9uQ2FsbE9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvcHRpb25zLCByZXF1ZXN0SGVhZGVycywgcGFyYW1zLCBib2R5LCByZXNwb25zZSwgdXJsVmFsdWUsIGVycl8xLCBlcnJvclJlc3BvbnNlLCByZXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9kKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfZC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0gX19hc3NpZ24oe30sIG9uQ2FsbE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB0cnVlIDogZGVsZXRlIG9wdGlvbnMuaGVhZGVycztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzID0gdGhpcy5qb2luQW5kVHJhbnNmb3JtSGVhZGVycyhvbkNhbGxPcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IF9fYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnF1ZXJ5KSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucXVlcnkpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMucGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhvcHRpb25zLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5ib2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5kYXRhID0gYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgcGFyYW1zLmJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmxWYWx1ZSA9IHVybGpvaW4odGhpcy51cmwsIHVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZC5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kLnRyeXMucHVzaChbMSwgMywgLCA0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBheGlvcy5yZXF1ZXN0KF9fYXNzaWduKF9fYXNzaWduKHsgbWV0aG9kOiBtZXRob2QudG9Mb2NhbGVVcHBlckNhc2UoKSwgdGltZW91dDogdGhpcy50aW1lb3V0LCB1cmw6IHVybFZhbHVlLCBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyB9LCBwYXJhbXMpLCB7IG1heEJvZHlMZW5ndGg6IHRoaXMubWF4Qm9keUxlbmd0aCwgcHJveHk6IHRoaXMucHJveHkgfSkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfZC5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyXzEgPSBfZC5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclJlc3BvbnNlID0gZXJyXzE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogKChfYSA9IGVycm9yUmVzcG9uc2UgPT09IG51bGwgfHwgZXJyb3JSZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3JSZXNwb25zZS5yZXNwb25zZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN0YXR1cykgfHwgNDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6ICgoX2IgPSBlcnJvclJlc3BvbnNlID09PSBudWxsIHx8IGVycm9yUmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9yUmVzcG9uc2UucmVzcG9uc2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zdGF0dXNUZXh0KSB8fCBlcnJvclJlc3BvbnNlLmNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogKChfYyA9IGVycm9yUmVzcG9uc2UgPT09IG51bGwgfHwgZXJyb3JSZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3JSZXNwb25zZS5yZXNwb25zZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmRhdGEpIHx8IGVycm9yUmVzcG9uc2UubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRSZXNwb25zZUJvZHkocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Quc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUuZ2V0UmVzcG9uc2VCb2R5ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmVzID0ge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiB7fSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZSA9PT0gbnVsbCB8fCByZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhID09PSAnTWFpbGd1biBNYWduaWZpY2VudCBBUEknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6ICdJbmNvcnJlY3QgdXJsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXMuYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5ib2R5ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5qb2luQW5kVHJhbnNmb3JtSGVhZGVycyA9IGZ1bmN0aW9uIChvbkNhbGxPcHRpb25zKSB7XG4gICAgICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IG5ldyBBeGlvc0hlYWRlcnMoKTtcbiAgICAgICAgdmFyIGJhc2ljID0gYmFzZTY0LmVuY29kZShcIlwiLmNvbmNhdCh0aGlzLnVzZXJuYW1lLCBcIjpcIikuY29uY2F0KHRoaXMua2V5KSk7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzLnNldEF1dGhvcml6YXRpb24oXCJCYXNpYyBcIi5jb25jYXQoYmFzaWMpKTtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnMuc2V0KHRoaXMuaGVhZGVycyk7XG4gICAgICAgIHZhciByZWNlaXZlZE9uQ2FsbEhlYWRlcnMgPSBvbkNhbGxPcHRpb25zICYmIG9uQ2FsbE9wdGlvbnMuaGVhZGVycztcbiAgICAgICAgdmFyIG9uQ2FsbEhlYWRlcnMgPSB0aGlzLm1ha2VIZWFkZXJzRnJvbU9iamVjdChyZWNlaXZlZE9uQ2FsbEhlYWRlcnMpO1xuICAgICAgICByZXF1ZXN0SGVhZGVycy5zZXQob25DYWxsSGVhZGVycyk7XG4gICAgICAgIHJldHVybiByZXF1ZXN0SGVhZGVycztcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLm1ha2VIZWFkZXJzRnJvbU9iamVjdCA9IGZ1bmN0aW9uIChoZWFkZXJzT2JqZWN0KSB7XG4gICAgICAgIGlmIChoZWFkZXJzT2JqZWN0ID09PSB2b2lkIDApIHsgaGVhZGVyc09iamVjdCA9IHt9OyB9XG4gICAgICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IG5ldyBBeGlvc0hlYWRlcnMoKTtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnMgPSBPYmplY3QuZW50cmllcyhoZWFkZXJzT2JqZWN0KS5yZWR1Y2UoZnVuY3Rpb24gKGhlYWRlcnNBY2N1bXVsYXRvciwgY3VycmVudFBhaXIpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBjdXJyZW50UGFpclswXSwgdmFsdWUgPSBjdXJyZW50UGFpclsxXTtcbiAgICAgICAgICAgIGhlYWRlcnNBY2N1bXVsYXRvci5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gaGVhZGVyc0FjY3VtdWxhdG9yO1xuICAgICAgICB9LCByZXF1ZXN0SGVhZGVycyk7XG4gICAgICAgIHJldHVybiByZXF1ZXN0SGVhZGVycztcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLnNldFN1YmFjY291bnRIZWFkZXIgPSBmdW5jdGlvbiAoc3ViYWNjb3VudElkKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGhlYWRlcnMgPSB0aGlzLm1ha2VIZWFkZXJzRnJvbU9iamVjdChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5oZWFkZXJzKSwgKF9hID0ge30sIF9hW1N1YmFjY291bnRzQ2xpZW50LlNVQkFDQ09VTlRfSEVBREVSXSA9IHN1YmFjY291bnRJZCwgX2EpKSk7XG4gICAgICAgIHRoaXMuaGVhZGVycy5zZXQoaGVhZGVycyk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5yZXNldFN1YmFjY291bnRIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5kZWxldGUoU3ViYWNjb3VudHNDbGllbnQuU1VCQUNDT1VOVF9IRUFERVIpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAobWV0aG9kLCB1cmwsIHF1ZXJ5LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIF9fYXNzaWduKHsgcXVlcnk6IHF1ZXJ5IH0sIG9wdGlvbnMpKTtcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLmNvbW1hbmQgPSBmdW5jdGlvbiAobWV0aG9kLCB1cmwsIGRhdGEsIG9wdGlvbnMsIGFkZERlZmF1bHRIZWFkZXJzKSB7XG4gICAgICAgIGlmIChhZGREZWZhdWx0SGVhZGVycyA9PT0gdm9pZCAwKSB7IGFkZERlZmF1bHRIZWFkZXJzID0gdHJ1ZTsgfVxuICAgICAgICB2YXIgaGVhZGVycyA9IHt9O1xuICAgICAgICBpZiAoYWRkRGVmYXVsdEhlYWRlcnMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXF1ZXN0T3B0aW9ucyA9IF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCBoZWFkZXJzKSwgeyBib2R5OiBkYXRhIH0pLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgcmVxdWVzdE9wdGlvbnMpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHVybCwgcXVlcnksIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkoJ2dldCcsIHVybCwgcXVlcnksIG9wdGlvbnMpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncG9zdCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5wb3N0V2l0aEZEID0gZnVuY3Rpb24gKHVybCwgZGF0YSkge1xuICAgICAgICB2YXIgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncG9zdCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLnB1dFdpdGhGRCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEpIHtcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLnBhdGNoV2l0aEZEID0gZnVuY3Rpb24gKHVybCwgZGF0YSkge1xuICAgICAgICB2YXIgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncGF0Y2gnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAodXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ2RlbGV0ZScsIHVybCwgZGF0YSk7XG4gICAgfTtcbiAgICByZXR1cm4gUmVxdWVzdDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG52YXIgRG9tYWluID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvbWFpbihkYXRhLCByZWNlaXZpbmcsIHNlbmRpbmcpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICB0aGlzLnJlcXVpcmVfdGxzID0gZGF0YS5yZXF1aXJlX3RscztcbiAgICAgICAgdGhpcy5za2lwX3ZlcmlmaWNhdGlvbiA9IGRhdGEuc2tpcF92ZXJpZmljYXRpb247XG4gICAgICAgIHRoaXMuc3RhdGUgPSBkYXRhLnN0YXRlO1xuICAgICAgICB0aGlzLndpbGRjYXJkID0gZGF0YS53aWxkY2FyZDtcbiAgICAgICAgdGhpcy5zcGFtX2FjdGlvbiA9IGRhdGEuc3BhbV9hY3Rpb247XG4gICAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgICAgIHRoaXMuc210cF9wYXNzd29yZCA9IGRhdGEuc210cF9wYXNzd29yZDtcbiAgICAgICAgdGhpcy5zbXRwX2xvZ2luID0gZGF0YS5zbXRwX2xvZ2luO1xuICAgICAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGU7XG4gICAgICAgIHRoaXMucmVjZWl2aW5nX2Ruc19yZWNvcmRzID0gcmVjZWl2aW5nIHx8IG51bGw7XG4gICAgICAgIHRoaXMuc2VuZGluZ19kbnNfcmVjb3JkcyA9IHNlbmRpbmcgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMuaXNfZGlzYWJsZWQgPSBkYXRhLmlzX2Rpc2FibGVkO1xuICAgICAgICB0aGlzLndlYl9wcmVmaXggPSBkYXRhLndlYl9wcmVmaXg7XG4gICAgICAgIHRoaXMud2ViX3NjaGVtZSA9IGRhdGEud2ViX3NjaGVtZTtcbiAgICAgICAgdGhpcy51c2VfYXV0b21hdGljX3NlbmRlcl9zZWN1cml0eSA9IGRhdGEudXNlX2F1dG9tYXRpY19zZW5kZXJfc2VjdXJpdHk7XG4gICAgICAgIC8qXG4gICAgICAgICAgZG9tYWluIGdldCBhbmQgdXBkYXRlIG1ldGhvZHMgbWF5IGhhdmUgcmljaGVyIHJlc3BvbnNlIHRoYW4gY3JlYXRlIG1ldGhvZC5cbiAgICAgICAgKi9cbiAgICAgICAgdmFyIGR5bmFtaWNLZXlzID0gWydka2ltX2hvc3QnLCAnbWFpbGZyb21faG9zdCddO1xuICAgICAgICB2YXIgZHluYW1pY1Byb3BlcnRpZXMgPSBkeW5hbWljS2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtwcm9wZXJ0eU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICAgICAgYWNjW3Byb3BdID0gZGF0YVtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGR5bmFtaWNQcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIERvbWFpbjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBEb21haW47XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvci5qcyc7XG5pbXBvcnQgRG9tYWluIGZyb20gJy4vZG9tYWluLmpzJztcbnZhciBEb21haW5zQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvbWFpbnNDbGllbnQocmVxdWVzdCwgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQsIGRvbWFpblRlbXBsYXRlc0NsaWVudCwgZG9tYWluVGFnc0NsaWVudCwgZG9tYWluVHJhY2tpbmcsIGxvZ2dlcikge1xuICAgICAgICBpZiAobG9nZ2VyID09PSB2b2lkIDApIHsgbG9nZ2VyID0gY29uc29sZTsgfVxuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLmRvbWFpbkNyZWRlbnRpYWxzID0gZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ7XG4gICAgICAgIHRoaXMuZG9tYWluVGVtcGxhdGVzID0gZG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuICAgICAgICB0aGlzLmRvbWFpblRhZ3MgPSBkb21haW5UYWdzQ2xpZW50O1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgdGhpcy5kb21haW5UcmFja2luZyA9IGRvbWFpblRyYWNraW5nO1xuICAgIH1cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5faGFuZGxlQm9vbFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBwcm9wc0ZvclJlcGxhY2VtZW50ID0gZGF0YTtcbiAgICAgICAgdmFyIHJlcGxhY2VkUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wc0ZvclJlcGxhY2VtZW50KS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IGtleTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXTtcbiAgICAgICAgICAgICAgICBhY2NbcHJvcF0gPSAodmFsdWUudG9TdHJpbmcoKSA9PT0gJ3RydWUnKSA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YSksIHJlcGxhY2VkUHJvcHMpO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlTWVzc2FnZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLnBhcnNlRG9tYWluTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UuYm9keSAmJiByZXNwb25zZS5ib2R5Lml0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbWFpbihpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLl9wYXJzZURvbWFpbiA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gbmV3IERvbWFpbihyZXNwb25zZS5ib2R5LmRvbWFpbiwgcmVzcG9uc2UuYm9keS5yZWNlaXZpbmdfZG5zX3JlY29yZHMsIHJlc3BvbnNlLmJvZHkuc2VuZGluZ19kbnNfcmVjb3Jkcyk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvZG9tYWlucycsIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VEb21haW5MaXN0KHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdmFyIHByZXBhcmVkUXVlcnkgPSBxdWVyeSA/IHtcbiAgICAgICAgICAgICdoOmV4dGVuZGVkJzogKF9hID0gcXVlcnkgPT09IG51bGwgfHwgcXVlcnkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHF1ZXJ5LmV4dGVuZGVkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBmYWxzZSxcbiAgICAgICAgICAgICdoOndpdGhfZG5zJzogKF9iID0gcXVlcnkgPT09IG51bGwgfHwgcXVlcnkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHF1ZXJ5LndpdGhfZG5zKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB0cnVlLFxuICAgICAgICB9IDoge307XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y0L2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbiksIHByZXBhcmVkUXVlcnkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VEb21haW4ocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcG9zdE9iaiA9IHRoaXMuX2hhbmRsZUJvb2xWYWx1ZXMoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3Y0L2RvbWFpbnMnLCBwb3N0T2JqKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlRG9tYWluKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcHV0RGF0YSA9IHRoaXMuX2hhbmRsZUJvb2xWYWx1ZXMoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKFwiL3Y0L2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbiksIHB1dERhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VEb21haW4ocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS52ZXJpZnkgPSBmdW5jdGlvbiAoZG9tYWluKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KFwiL3Y0L2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbiwgXCIvdmVyaWZ5XCIpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlRG9tYWluKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoXCIvdjMvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLl9wYXJzZU1lc3NhZ2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5nZXRDb25uZWN0aW9uID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChcIi92My9kb21haW5zL1wiLmNvbmNhdChkb21haW4sIFwiL2Nvbm5lY3Rpb25cIikpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXM7IH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS51cGRhdGVDb25uZWN0aW9uID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChcIi92My9kb21haW5zL1wiLmNvbmNhdChkb21haW4sIFwiL2Nvbm5lY3Rpb25cIiksIGRhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXM7IH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICAvLyBUcmFja2luZ1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgJ2RvbWFpbnMuZ2V0VHJhY2tpbmcnIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkLlxuICAgICogUGxlYXNlIHVzZSAnZG9tYWlucy5kb21haW5UcmFja2luZy5nZXRUcmFja2luZycgaW5zdGVhZC5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmdldFRyYWNraW5nID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFwiXFxuICAgICAgJ2RvbWFpbnMuZ2V0VHJhY2tpbmcnIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlICdkb21haW5zLmRvbWFpblRyYWNraW5nLmdldFRyYWNraW5nJyBpbnN0ZWFkLlxcbiAgICBcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbWFpblRyYWNraW5nLmdldFRyYWNraW5nKGRvbWFpbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkICdkb21haW5zLnVwZGF0ZVRyYWNraW5nJyBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAqIFBsZWFzZSB1c2UgJ2RvbWFpbnMuZG9tYWluVHJhY2tpbmcudXBkYXRlVHJhY2tpbmcnIGluc3RlYWQuXG4gICAgKi9cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS51cGRhdGVUcmFja2luZyA9IGZ1bmN0aW9uIChkb21haW4sIHR5cGUsIGRhdGEpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIlxcbiAgICAgICdkb21haW5zLnVwZGF0ZVRyYWNraW5nJyBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSAnZG9tYWlucy5kb21haW5UcmFja2luZy51cGRhdGVUcmFja2luZycgaW5zdGVhZC5cXG4gICAgXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb21haW5UcmFja2luZy51cGRhdGVUcmFja2luZyhkb21haW4sIHR5cGUsIGRhdGEpO1xuICAgIH07XG4gICAgLy8gSVBzXG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMuZ2V0SXBzXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmdldElwcyA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLmdldElwc1wiIG1ldGhvZCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyB2YXIgX2E7IHJldHVybiAoX2EgPSByZXNwb25zZSA9PT0gbnVsbCB8fCByZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzcG9uc2UuYm9keSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLml0ZW1zOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLmFzc2lnbklwXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmFzc2lnbklwID0gZnVuY3Rpb24gKGRvbWFpbiwgaXApIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLmFzc2lnbklwXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBpcDogaXAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkIFwiZG9tYWlucy5kZWxldGVJcFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSBtb3ZlZCB0byB0aGUgSXBzQ2xpZW50LlxuICAgICovXG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuZGVsZXRlSXAgPSBmdW5jdGlvbiAoZG9tYWluLCBpcCkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMuZGVsZXRlSXBcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSBtb3ZlZCBpbnRvIHRoZSBJcHNDbGllbnQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCBpcCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMubGlua0lwUG9vbFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkXG4gICAgKiBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLlxuICAgICovXG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUubGlua0lwUG9vbCA9IGZ1bmN0aW9uIChkb21haW4sIHBvb2xJZCkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMubGlua0lwUG9vbFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IHBvb2xfaWQ6IHBvb2xJZCB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLnVubGlua0lwUG9sbFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSBtb3ZlZCBpbnRvIHRoZSBJcHNDbGllbnRcbiAgICAqIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICAgKi9cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS51bmxpbmtJcFBvbGwgPSBmdW5jdGlvbiAoZG9tYWluLCByZXBsYWNlbWVudCkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMudW5saW5rSXBQb2xsXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIG1vdmVkIGludG8gdGhlIElwc0NsaWVudCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICB2YXIgc2VhcmNoUGFyYW1zID0gJyc7XG4gICAgICAgIGlmIChyZXBsYWNlbWVudC5wb29sX2lkICYmIHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdUb28gbXVjaCBkYXRhIGZvciByZXBsYWNlbWVudCcsICdQbGVhc2Ugc3BlY2lmeSBlaXRoZXIgcG9vbF9pZCBvciBpcCAobm90IGJvdGgpJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zID0gXCI/cG9vbF9pZD1cIi5jb25jYXQocmVwbGFjZW1lbnQucG9vbF9pZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVwbGFjZW1lbnQuaXApIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcyA9IFwiP2lwPVwiLmNvbmNhdChyZXBsYWNlbWVudC5pcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCAnaXBfcG9vbCcsIHNlYXJjaFBhcmFtcykpO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUudXBkYXRlREtJTUF1dGhvcml0eSA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoXCIvdjMvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluLCBcIi9ka2ltX2F1dGhvcml0eVwiKSwge30sIHsgcXVlcnk6IFwic2VsZj1cIi5jb25jYXQoZGF0YS5zZWxmKSB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzOyB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUudXBkYXRlREtJTVNlbGVjdG9yID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wdXQoXCIvdjMvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluLCBcIi9ka2ltX3NlbGVjdG9yXCIpLCB7fSwgeyBxdWVyeTogXCJka2ltX3NlbGVjdG9yPVwiLmNvbmNhdChkYXRhLmRraW1TZWxlY3RvcikgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlcy5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IChfYSA9IHJlcyA9PT0gbnVsbCB8fCByZXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlcy5ib2R5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLnVwZGF0ZVdlYlByZWZpeFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLlxuICAgICogUGxlYXNlIHVzZSBkb21haW5zLnVwZGF0ZSB0byBzZXQgbmV3IFwid2ViX3ByZWZpeFwiLlxuICAgICogQ3VycmVudCBtZXRob2Qgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICAgKi9cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS51cGRhdGVXZWJQcmVmaXggPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy51cGRhdGVXZWJQcmVmaXhcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBkb21haW5zLnVwZGF0ZSB0byBzZXQgbmV3IFwid2ViX3ByZWZpeFwiLiBDdXJyZW50IG1ldGhvZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoXCIvdjMvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluLCBcIi93ZWJfcHJlZml4XCIpLCB7fSwgeyBxdWVyeTogXCJ3ZWJfcHJlZml4PVwiLmNvbmNhdChkYXRhLndlYlByZWZpeCkgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlczsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRG9tYWluc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBEb21haW5zQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yLmpzJztcbnZhciBOYXZpZ2F0aW9uVGhydVBhZ2VzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5hdmlnYXRpb25UaHJ1UGFnZXMocmVxdWVzdCkge1xuICAgICAgICBpZiAocmVxdWVzdCkge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBOYXZpZ2F0aW9uVGhydVBhZ2VzLnByb3RvdHlwZS5wYXJzZVBhZ2UgPSBmdW5jdGlvbiAoaWQsIHBhZ2VVcmwsIHVybFNlcGFyYXRvciwgaXRlcmF0b3JOYW1lKSB7XG4gICAgICAgIHZhciBwYXJzZWRVcmwgPSBuZXcgVVJMKHBhZ2VVcmwpO1xuICAgICAgICB2YXIgc2VhcmNoUGFyYW1zID0gcGFyc2VkVXJsLnNlYXJjaFBhcmFtcztcbiAgICAgICAgdmFyIHBhZ2VWYWx1ZSA9IHBhZ2VVcmwgJiYgdHlwZW9mIHBhZ2VVcmwgPT09ICdzdHJpbmcnID8gcGFnZVVybC5zcGxpdCh1cmxTZXBhcmF0b3IpLnBvcCgpIHx8ICcnIDogJyc7XG4gICAgICAgIHZhciBpdGVyYXRvclBvc2l0aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKGl0ZXJhdG9yTmFtZSkge1xuICAgICAgICAgICAgaXRlcmF0b3JQb3NpdGlvbiA9IHNlYXJjaFBhcmFtcy5oYXMoaXRlcmF0b3JOYW1lKVxuICAgICAgICAgICAgICAgID8gc2VhcmNoUGFyYW1zLmdldChpdGVyYXRvck5hbWUpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIHBhZ2U6IHVybFNlcGFyYXRvciA9PT0gJz8nID8gXCI/XCIuY29uY2F0KHBhZ2VWYWx1ZSkgOiBwYWdlVmFsdWUsXG4gICAgICAgICAgICBpdGVyYXRvclBvc2l0aW9uOiBpdGVyYXRvclBvc2l0aW9uLFxuICAgICAgICAgICAgdXJsOiBwYWdlVXJsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBOYXZpZ2F0aW9uVGhydVBhZ2VzLnByb3RvdHlwZS5wYXJzZVBhZ2VMaW5rcyA9IGZ1bmN0aW9uIChyZXNwb25zZSwgdXJsU2VwYXJhdG9yLCBpdGVyYXRvck5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHBhZ2VzID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuYm9keS5wYWdpbmcpO1xuICAgICAgICByZXR1cm4gcGFnZXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIF9hKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSBfYVswXSwgcGFnZVVybCA9IF9hWzFdO1xuICAgICAgICAgICAgYWNjW2lkXSA9IF90aGlzLnBhcnNlUGFnZShpZCwgcGFnZVVybCwgdXJsU2VwYXJhdG9yLCBpdGVyYXRvck5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgIH07XG4gICAgTmF2aWdhdGlvblRocnVQYWdlcy5wcm90b3R5cGUudXBkYXRlVXJsQW5kUXVlcnkgPSBmdW5jdGlvbiAoY2xpZW50VXJsLCBxdWVyeSkge1xuICAgICAgICB2YXIgdXJsID0gY2xpZW50VXJsO1xuICAgICAgICB2YXIgcXVlcnlDb3B5ID0gX19hc3NpZ24oe30sIHF1ZXJ5KTtcbiAgICAgICAgaWYgKHF1ZXJ5Q29weS5wYWdlKSB7XG4gICAgICAgICAgICB1cmwgPSB1cmxqb2luKGNsaWVudFVybCwgcXVlcnlDb3B5LnBhZ2UpO1xuICAgICAgICAgICAgZGVsZXRlIHF1ZXJ5Q29weS5wYWdlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHVwZGF0ZWRRdWVyeTogcXVlcnlDb3B5XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBOYXZpZ2F0aW9uVGhydVBhZ2VzLnByb3RvdHlwZS5yZXF1ZXN0TGlzdFdpdGhQYWdlcyA9IGZ1bmN0aW9uIChjbGllbnRVcmwsIHF1ZXJ5LCBNb2RlbCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EsIHVybCwgdXBkYXRlZFF1ZXJ5LCByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gdGhpcy51cGRhdGVVcmxBbmRRdWVyeShjbGllbnRVcmwsIHF1ZXJ5KSwgdXJsID0gX2EudXJsLCB1cGRhdGVkUXVlcnkgPSBfYS51cGRhdGVkUXVlcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVxdWVzdCkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KHVybCwgdXBkYXRlZFF1ZXJ5KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTW9kZWwgaGVyZSBpcyB1c3VhbGx5IHVuZGVmaW5lZCBleGNlcHQgZm9yIFN1cHByZXNzaW9uIENsaWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucGFyc2VMaXN0KHJlc3BvbnNlLCBNb2RlbCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6ICdSZXF1ZXN0IHByb3BlcnR5IGlzIGVtcHR5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHsgbWVzc2FnZTogJycgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTmF2aWdhdGlvblRocnVQYWdlcztcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBOYXZpZ2F0aW9uVGhydVBhZ2VzO1xuIiwiaW1wb3J0IHsgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLmpzJztcbnZhciBFdmVudENsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRXZlbnRDbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRXZlbnRDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCByZXF1ZXN0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBFdmVudENsaWVudC5wcm90b3R5cGUucGFyc2VMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJy8nKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgRXZlbnRDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkb21haW4sIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKCcvdjMnLCBkb21haW4sICdldmVudHMnKSwgcXVlcnkpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBFdmVudENsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgRXZlbnRDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIFN0YXRzQ29udGFpbmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0YXRzQ29udGFpbmVyKGRhdGEpIHtcbiAgICAgICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKGRhdGEuc3RhcnQpO1xuICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKGRhdGEuZW5kKTtcbiAgICAgICAgdGhpcy5yZXNvbHV0aW9uID0gZGF0YS5yZXNvbHV0aW9uO1xuICAgICAgICB0aGlzLnN0YXRzID0gZGF0YS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQpIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBfX2Fzc2lnbih7fSwgc3RhdCk7XG4gICAgICAgICAgICByZXMudGltZSA9IG5ldyBEYXRlKHN0YXQudGltZSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFN0YXRzQ29udGFpbmVyO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFN0YXRzQ29udGFpbmVyO1xuIiwiaW1wb3J0IHsgX19zcHJlYWRBcnJheSB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IFN0YXRzQ29udGFpbmVyIGZyb20gJy4vU3RhdHNDb250YWluZXIuanMnO1xudmFyIFN0YXRzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0YXRzQ2xpZW50KHJlcXVlc3QsIGxvZ2dlcikge1xuICAgICAgICBpZiAobG9nZ2VyID09PSB2b2lkIDApIHsgbG9nZ2VyID0gY29uc29sZTsgfVxuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG4gICAgU3RhdHNDbGllbnQucHJvdG90eXBlLmNvbnZlcnREYXRlVG9VVEMgPSBmdW5jdGlvbiAoa2V5LCBpbnB1dERhdGUpIHtcbiAgICAgICAgLypcbiAgICAgICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAgICAgKHBsdXMgMiBob3VycyBmcm9tIHRoZSB0aW1lem9uZSlcbiAgICAgICAgICBhbmQgYmVjYXVzZSBmb3IgQVBJLCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGRhdGUgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdFxuICAgICAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICAgICAgSGVyZSB3ZSB0cnkgYXV0by1jb252ZXJ0IHRoZW0gdG8gVVRDXG4gICAgICAgICovXG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJEYXRlOlxcXCJcIi5jb25jYXQoaW5wdXREYXRlLCBcIlxcXCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXFxuVmFsdWUgXFxcIlwiKS5jb25jYXQoaW5wdXREYXRlLnRvVVRDU3RyaW5nKCksIFwiXFxcIiB3aWxsIGJlIHVzZWQgZm9yIHJlcXVlc3QuXFxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFxcXCJcIikuY29uY2F0KGtleSwgXCJcXFwiIHRvIGF2b2lkIGF1dG8tY29udmVydGluZ1wiKSk7XG4gICAgICAgIHJldHVybiBba2V5LCBpbnB1dERhdGUudG9VVENTdHJpbmcoKV07XG4gICAgfTtcbiAgICBTdGF0c0NsaWVudC5wcm90b3R5cGUucHJlcGFyZVNlYXJjaFBhcmFtcyA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgc2VhcmNoUGFyYW1zID0gW107XG4gICAgICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHF1ZXJ5KS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcyA9IE9iamVjdC5lbnRyaWVzKHF1ZXJ5KS5yZWR1Y2UoZnVuY3Rpb24gKGFycmF5V2l0aFBhaXJzLCBjdXJyZW50UGFpcikge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBjdXJyZW50UGFpclswXSwgdmFsdWUgPSBjdXJyZW50UGFpclsxXTtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoKSB7IC8vIGV2ZW50OiBbJ2RlbGl2ZXJlZCcsICdhY2NlcHRlZCddXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXBlYXRlZFByb3BlcnR5ID0gdmFsdWUubWFwKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBba2V5LCBpdGVtXTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX3NwcmVhZEFycmF5KF9fc3ByZWFkQXJyYXkoW10sIGFycmF5V2l0aFBhaXJzLCB0cnVlKSwgcmVwZWF0ZWRQcm9wZXJ0eSwgdHJ1ZSk7IC8vIFtbZXZlbnQsZGVsaXZlcmVkXSwgW2V2ZW50LGFjY2VwdGVkXV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKF90aGlzLmNvbnZlcnREYXRlVG9VVEMoa2V5LCB2YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlXaXRoUGFpcnM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5V2l0aFBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5V2l0aFBhaXJzO1xuICAgICAgICAgICAgfSwgW10pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWFyY2hQYXJhbXM7XG4gICAgfTtcbiAgICBTdGF0c0NsaWVudC5wcm90b3R5cGUucGFyc2VTdGF0cyA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gbmV3IFN0YXRzQ29udGFpbmVyKHJlc3BvbnNlLmJvZHkpO1xuICAgIH07XG4gICAgU3RhdHNDbGllbnQucHJvdG90eXBlLmdldERvbWFpbiA9IGZ1bmN0aW9uIChkb21haW4sIHF1ZXJ5KSB7XG4gICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMnLCBkb21haW4sICdzdGF0cy90b3RhbCcpLCBzZWFyY2hQYXJhbXMpXG4gICAgICAgICAgICAudGhlbih0aGlzLnBhcnNlU3RhdHMpO1xuICAgIH07XG4gICAgU3RhdHNDbGllbnQucHJvdG90eXBlLmdldEFjY291bnQgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvc3RhdHMvdG90YWwnLCBzZWFyY2hQYXJhbXMpXG4gICAgICAgICAgICAudGhlbih0aGlzLnBhcnNlU3RhdHMpO1xuICAgIH07XG4gICAgcmV0dXJuIFN0YXRzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFN0YXRzQ2xpZW50O1xuIiwiZXhwb3J0IHZhciBSZXNvbHV0aW9uO1xuKGZ1bmN0aW9uIChSZXNvbHV0aW9uKSB7XG4gICAgUmVzb2x1dGlvbltcIkhPVVJcIl0gPSBcImhvdXJcIjtcbiAgICBSZXNvbHV0aW9uW1wiREFZXCJdID0gXCJkYXlcIjtcbiAgICBSZXNvbHV0aW9uW1wiTU9OVEhcIl0gPSBcIm1vbnRoXCI7XG59KShSZXNvbHV0aW9uIHx8IChSZXNvbHV0aW9uID0ge30pKTtcbmV4cG9ydCB2YXIgU3VwcHJlc3Npb25Nb2RlbHM7XG4oZnVuY3Rpb24gKFN1cHByZXNzaW9uTW9kZWxzKSB7XG4gICAgU3VwcHJlc3Npb25Nb2RlbHNbXCJCT1VOQ0VTXCJdID0gXCJib3VuY2VzXCI7XG4gICAgU3VwcHJlc3Npb25Nb2RlbHNbXCJDT01QTEFJTlRTXCJdID0gXCJjb21wbGFpbnRzXCI7XG4gICAgU3VwcHJlc3Npb25Nb2RlbHNbXCJVTlNVQlNDUklCRVNcIl0gPSBcInVuc3Vic2NyaWJlc1wiO1xuICAgIFN1cHByZXNzaW9uTW9kZWxzW1wiV0hJVEVMSVNUU1wiXSA9IFwid2hpdGVsaXN0c1wiO1xufSkoU3VwcHJlc3Npb25Nb2RlbHMgfHwgKFN1cHByZXNzaW9uTW9kZWxzID0ge30pKTtcbmV4cG9ydCB2YXIgV2ViaG9va3NJZHM7XG4oZnVuY3Rpb24gKFdlYmhvb2tzSWRzKSB7XG4gICAgV2ViaG9va3NJZHNbXCJDTElDS0VEXCJdID0gXCJjbGlja2VkXCI7XG4gICAgV2ViaG9va3NJZHNbXCJDT01QTEFJTkVEXCJdID0gXCJjb21wbGFpbmVkXCI7XG4gICAgV2ViaG9va3NJZHNbXCJERUxJVkVSRURcIl0gPSBcImRlbGl2ZXJlZFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiT1BFTkVEXCJdID0gXCJvcGVuZWRcIjtcbiAgICBXZWJob29rc0lkc1tcIlBFUk1BTkVOVF9GQUlMXCJdID0gXCJwZXJtYW5lbnRfZmFpbFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiVEVNUE9SQVJZX0ZBSUxcIl0gPSBcInRlbXBvcmFyeV9mYWlsXCI7XG4gICAgV2ViaG9va3NJZHNbXCJVTlNVQlNDUklCRURcIl0gPSBcInVuc3Vic2NyaWJlXCI7XG59KShXZWJob29rc0lkcyB8fCAoV2ViaG9va3NJZHMgPSB7fSkpO1xuZXhwb3J0IHZhciBZZXNObztcbihmdW5jdGlvbiAoWWVzTm8pIHtcbiAgICBZZXNOb1tcIllFU1wiXSA9IFwieWVzXCI7XG4gICAgWWVzTm9bXCJOT1wiXSA9IFwibm9cIjtcbn0pKFllc05vIHx8IChZZXNObyA9IHt9KSk7XG4iLCJ2YXIgU3VwcHJlc3Npb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3VwcHJlc3Npb24odHlwZSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cbiAgICByZXR1cm4gU3VwcHJlc3Npb247XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgU3VwcHJlc3Npb247XG4iLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMvaW5kZXguanMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24uanMnO1xudmFyIEJvdW5jZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm91bmNlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJvdW5jZShkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFN1cHByZXNzaW9uTW9kZWxzLkJPVU5DRVMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICAgIF90aGlzLmNvZGUgPSArZGF0YS5jb2RlO1xuICAgICAgICBfdGhpcy5lcnJvciA9IGRhdGEuZXJyb3I7XG4gICAgICAgIF90aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBCb3VuY2U7XG59KFN1cHByZXNzaW9uKSk7XG5leHBvcnQgZGVmYXVsdCBCb3VuY2U7XG4iLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMvaW5kZXguanMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24uanMnO1xudmFyIENvbXBsYWludCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29tcGxhaW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbXBsYWludChkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFN1cHByZXNzaW9uTW9kZWxzLkNPTVBMQUlOVFMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICAgIF90aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBDb21wbGFpbnQ7XG59KFN1cHByZXNzaW9uKSk7XG5leHBvcnQgZGVmYXVsdCBDb21wbGFpbnQ7XG4iLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMvaW5kZXguanMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24uanMnO1xudmFyIFVuc3Vic2NyaWJlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVbnN1YnNjcmliZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVbnN1YnNjcmliZShkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFN1cHByZXNzaW9uTW9kZWxzLlVOU1VCU0NSSUJFUykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgICAgX3RoaXMudGFncyA9IGRhdGEudGFncztcbiAgICAgICAgX3RoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFVuc3Vic2NyaWJlO1xufShTdXBwcmVzc2lvbikpO1xuZXhwb3J0IGRlZmF1bHQgVW5zdWJzY3JpYmU7XG4iLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMvaW5kZXguanMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24uanMnO1xudmFyIFdoaXRlTGlzdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoV2hpdGVMaXN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFdoaXRlTGlzdChkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFN1cHByZXNzaW9uTW9kZWxzLldISVRFTElTVFMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICAgICAgX3RoaXMucmVhc29uID0gZGF0YS5yZWFzb247XG4gICAgICAgIF90aGlzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZEF0KTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gV2hpdGVMaXN0O1xufShTdXBwcmVzc2lvbikpO1xuZXhwb3J0IGRlZmF1bHQgV2hpdGVMaXN0O1xuIiwiaW1wb3J0IHsgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yLCBfX3NwcmVhZEFycmF5IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi4vY29tbW9uL0Vycm9yLmpzJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLmpzJztcbmltcG9ydCBCb3VuY2UgZnJvbSAnLi9Cb3VuY2UuanMnO1xuaW1wb3J0IENvbXBsYWludCBmcm9tICcuL0NvbXBsYWludC5qcyc7XG5pbXBvcnQgVW5zdWJzY3JpYmUgZnJvbSAnLi9VbnN1YnNjcmliZS5qcyc7XG5pbXBvcnQgV2hpdGVMaXN0IGZyb20gJy4vV2hpdGVMaXN0LmpzJztcbnZhciBjcmVhdGVPcHRpb25zID0ge1xuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XG59O1xudmFyIFN1cHByZXNzaW9uQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdXBwcmVzc2lvbkNsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdXBwcmVzc2lvbkNsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBfdGhpcy5tb2RlbHMgPSB7XG4gICAgICAgICAgICBib3VuY2VzOiBCb3VuY2UsXG4gICAgICAgICAgICBjb21wbGFpbnRzOiBDb21wbGFpbnQsXG4gICAgICAgICAgICB1bnN1YnNjcmliZXM6IFVuc3Vic2NyaWJlLFxuICAgICAgICAgICAgd2hpdGVsaXN0czogV2hpdGVMaXN0LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UsIE1vZGVsKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9ICgoX2EgPSByZXNwb25zZS5ib2R5Lml0ZW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWFwKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBuZXcgTW9kZWwoaXRlbSk7IH0pKSB8fCBbXTtcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLl9wYXJzZUl0ZW0gPSBmdW5jdGlvbiAoZGF0YSwgTW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb2RlbChkYXRhKTtcbiAgICB9O1xuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5jcmVhdGVXaGl0ZUxpc3QgPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhLCBpc0RhdGFBcnJheSkge1xuICAgICAgICBpZiAoaXNEYXRhQXJyYXkpIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ0RhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCcsICdXaGl0ZWxpc3RcXCdzIGNyZWF0aW9uIHByb2Nlc3MgZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBjcmVhdGlvbnMuIERhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAnd2hpdGVsaXN0cycpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICAgIH07XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLmNyZWF0ZVVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkgeyAvLyBVc2VyIHByb3ZpZGVkIGFuIGFycmF5XG4gICAgICAgICAgICB2YXIgaXNDb250YWluc1RhZyA9IGRhdGEuc29tZShmdW5jdGlvbiAodW5zdWJzY3JpYmUpIHsgcmV0dXJuIHVuc3Vic2NyaWJlLnRhZzsgfSk7XG4gICAgICAgICAgICBpZiAoaXNDb250YWluc1RhZykge1xuICAgICAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1RhZyBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHVzZWQgZm9yIGNyZWF0aW5nIG11bHRpcGxlIHVuc3Vic2NyaWJlcy4nLCAnVGFnIHByb3BlcnR5IGNhbiBiZSB1c2VkIG9ubHkgaWYgb25lIHVuc3Vic2NyaWJlIHByb3ZpZGVkIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kLiBQbGVhc2UgdXNlIHRhZ3MgaW5zdGVhZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3Vuc3Vic2NyaWJlcycpLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgY3JlYXRlT3B0aW9ucylcbiAgICAgICAgICAgICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS50YWdzKSB7XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdUYWdzIHByb3BlcnR5IHNob3VsZCBub3QgYmUgdXNlZCBmb3IgY3JlYXRpbmcgb25lIHVuc3Vic2NyaWJlLicsICdUYWdzIHByb3BlcnR5IGNhbiBiZSB1c2VkIGlmIHlvdSBwcm92aWRlcyBhbiBhcnJheSBvZiB1bnN1YnNjcmliZXMgYXMgc2Vjb25kIGFyZ3VtZW50IG9mIGNyZWF0ZSBtZXRob2QuIFBsZWFzZSB1c2UgdGFnIGluc3RlYWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLnRhZykpIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1RhZyBwcm9wZXJ0eSBjYW4gbm90IGJlIGFuIGFycmF5JywgJ1BsZWFzZSB1c2UgYXJyYXkgb2YgdW5zdWJzY3JpYmVzIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kIHRvIGJlIGFibGUgdG8gcHJvdmlkZSBmZXcgdGFncycpO1xuICAgICAgICB9XG4gICAgICAgIC8qIFdlIG5lZWQgRm9ybSBEYXRhIGZvciB1bnN1YnNjcmliZXMgaWYgd2Ugd2FudCB0byBzdXBwb3J0IHRoZSBcInRhZ1wiIHByb3BlcnR5ICovXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAndW5zdWJzY3JpYmVzJyksIGRhdGEpXG4gICAgICAgICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gICAgfTtcbiAgICBTdXBwcmVzc2lvbkNsaWVudC5wcm90b3R5cGUuZ2V0TW9kZWwgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICBpZiAodHlwZSBpbiB0aGlzLm1vZGVscykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1Vua25vd24gdHlwZSB2YWx1ZScsICdUeXBlIG1heSBiZSBvbmx5IG9uZSBvZiBbYm91bmNlcywgY29tcGxhaW50cywgdW5zdWJzY3JpYmVzLCB3aGl0ZWxpc3RzXScpO1xuICAgIH07XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLnByZXBhcmVSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgICAgICAgdHlwZTogcmVzcG9uc2UuYm9keS50eXBlIHx8ICcnLFxuICAgICAgICAgICAgdmFsdWU6IHJlc3BvbnNlLmJvZHkudmFsdWUgfHwgJycsXG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9O1xuICAgIH07XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAoZG9tYWluLCB0eXBlLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbW9kZWw7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgbW9kZWwgPSB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlKSwgcXVlcnksIG1vZGVsKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdXBwcmVzc2lvbkNsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRvbWFpbiwgdHlwZSwgYWRkcmVzcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbW9kZWwgPSB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAgICAgICAuZ2V0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiBfdGhpcy5fcGFyc2VJdGVtKHJlc3BvbnNlLmJvZHksIG1vZGVsKTsgfSk7XG4gICAgfTtcbiAgICBTdXBwcmVzc2lvbkNsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRvbWFpbiwgdHlwZSwgZGF0YSkge1xuICAgICAgICB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgICAgICAvLyBzdXBwb3J0cyBhZGRpbmcgbXVsdGlwbGUgc3VwcHJlc3Npb25zIGJ5IGRlZmF1bHRcbiAgICAgICAgdmFyIHBvc3REYXRhO1xuICAgICAgICB2YXIgaXNEYXRhQXJyYXkgPSBBcnJheS5pc0FycmF5KGRhdGEpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3doaXRlbGlzdHMnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVXaGl0ZUxpc3QoZG9tYWluLCBkYXRhLCBpc0RhdGFBcnJheSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICd1bnN1YnNjcmliZXMnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVVbnN1YnNjcmliZShkb21haW4sIGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNEYXRhQXJyYXkpIHtcbiAgICAgICAgICAgIHBvc3REYXRhID0gW2RhdGFdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcG9zdERhdGEgPSBfX3NwcmVhZEFycmF5KFtdLCBkYXRhLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAgICAgICAucG9zdCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIEpTT04uc3RyaW5naWZ5KHBvc3REYXRhKSwgY3JlYXRlT3B0aW9ucylcbiAgICAgICAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgICB9O1xuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGRvbWFpbiwgdHlwZSwgYWRkcmVzcykge1xuICAgICAgICB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAgICAgICAuZGVsZXRlKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiAoe1xuICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgICAgICAgdmFsdWU6IHJlc3BvbnNlLmJvZHkudmFsdWUgfHwgJycsXG4gICAgICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5ib2R5LmFkZHJlc3MgfHwgJycsXG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9KTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3VwcHJlc3Npb25DbGllbnQ7XG59KE5hdmlnYXRpb25UaHJ1UGFnZXMpKTtcbmV4cG9ydCBkZWZhdWx0IFN1cHByZXNzaW9uQ2xpZW50O1xuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xudmFyIFdlYmhvb2sgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gV2ViaG9vayhpZCwgdXJsLCB1cmxzKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMudXJscyA9IHVybHM7XG4gICAgfVxuICAgIHJldHVybiBXZWJob29rO1xufSgpKTtcbmV4cG9ydCB7IFdlYmhvb2sgfTtcbnZhciBXZWJob29rc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXZWJob29rc0NsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIFdlYmhvb2tzQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VXZWJob29rTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS53ZWJob29rcztcbiAgICB9O1xuICAgIFdlYmhvb2tzQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VXZWJob29rV2l0aElEID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHZhciB3ZWJob29rUmVzcG9uc2UgPSAoX2EgPSByZXNwb25zZSA9PT0gbnVsbCB8fCByZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzcG9uc2UuYm9keSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLndlYmhvb2s7XG4gICAgICAgICAgICB2YXIgdXJsID0gd2ViaG9va1Jlc3BvbnNlID09PSBudWxsIHx8IHdlYmhvb2tSZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2ViaG9va1Jlc3BvbnNlLnVybDtcbiAgICAgICAgICAgIHZhciB1cmxzID0gd2ViaG9va1Jlc3BvbnNlID09PSBudWxsIHx8IHdlYmhvb2tSZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2ViaG9va1Jlc3BvbnNlLnVybHM7XG4gICAgICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgICAgIHVybCA9IHVybHMgJiYgdXJscy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgPyB1cmxzWzBdXG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCghdXJscyB8fCB1cmxzLmxlbmd0aCA9PT0gMCkgJiYgdXJsKSB7XG4gICAgICAgICAgICAgICAgdXJscyA9IFt1cmxdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBXZWJob29rKGlkLCB1cmwsIHVybHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgV2ViaG9va3NDbGllbnQucHJvdG90eXBlLl9wYXJzZVdlYmhvb2tUZXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RlOiByZXNwb25zZS5ib2R5LmNvZGUsXG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFdlYmhvb2tzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCBxdWVyeSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va0xpc3QpO1xuICAgIH07XG4gICAgV2ViaG9va3NDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkb21haW4sIGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgICB9O1xuICAgIFdlYmhvb2tzQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCBpZCwgdXJsLCB0ZXN0KSB7XG4gICAgICAgIGlmICh0ZXN0ID09PSB2b2lkIDApIHsgdGVzdCA9IGZhbHNlOyB9XG4gICAgICAgIGlmICh0ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQsICd0ZXN0JyksIHsgdXJsOiB1cmwgfSlcbiAgICAgICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tUZXN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCB7IGlkOiBpZCwgdXJsOiB1cmwgfSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICAgIH07XG4gICAgV2ViaG9va3NDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIGlkLCB1cmxWYWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSwgeyB1cmw6IHVybFZhbHVlcyB9KVxuICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gICAgfTtcbiAgICBXZWJob29rc0NsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkb21haW4sIGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgICB9O1xuICAgIHJldHVybiBXZWJob29rc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBXZWJob29rc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9jb21tb24vRXJyb3IuanMnO1xudmFyIE1lc3NhZ2VzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1lc3NhZ2VzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgTWVzc2FnZXNDbGllbnQucHJvdG90eXBlLnByZXBhcmVCb29sZWFuVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHllc05vUHJvcGVydGllcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgJ286dGVzdG1vZGUnLFxuICAgICAgICAgICAgJ3Q6dGV4dCcsXG4gICAgICAgICAgICAnbzpka2ltJyxcbiAgICAgICAgICAgICdvOnRyYWNraW5nJyxcbiAgICAgICAgICAgICdvOnRyYWNraW5nLWNsaWNrcycsXG4gICAgICAgICAgICAnbzp0cmFja2luZy1vcGVucycsXG4gICAgICAgICAgICAnbzpyZXF1aXJlLXRscycsXG4gICAgICAgICAgICAnbzpza2lwLXZlcmlmaWNhdGlvbidcbiAgICAgICAgXSk7XG4gICAgICAgIGlmICghZGF0YSB8fCBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ01lc3NhZ2UgZGF0YSBvYmplY3QgY2FuIG5vdCBiZSBlbXB0eScsICdNZXNzYWdlIGRhdGEgb2JqZWN0IGNhbiBub3QgYmUgZW1wdHknKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICAgICAgaWYgKHllc05vUHJvcGVydGllcy5oYXMoa2V5KSAmJiB0eXBlb2YgZGF0YVtrZXldID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGRhdGFba2V5XSA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgIH07XG4gICAgTWVzc2FnZXNDbGllbnQucHJvdG90eXBlLl9wYXJzZVJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3BvbnNlLmJvZHkpO1xuICAgIH07XG4gICAgTWVzc2FnZXNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKFwiL3YzL1wiLmNvbmNhdChkb21haW4sIFwiL21lc3NhZ2VzLm1pbWVcIiksIGRhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1vZGlmaWVkRGF0YSA9IHRoaXMucHJlcGFyZUJvb2xlYW5WYWx1ZXMoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChcIi92My9cIi5jb25jYXQoZG9tYWluLCBcIi9tZXNzYWdlc1wiKSwgbW9kaWZpZWREYXRhKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gICAgfTtcbiAgICByZXR1cm4gTWVzc2FnZXNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZXNDbGllbnQ7XG4iLCJ2YXIgUm91dGVzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJvdXRlc0NsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIFJvdXRlc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3JvdXRlcycsIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5Lml0ZW1zOyB9KTtcbiAgICB9O1xuICAgIFJvdXRlc0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KFwiL3YzL3JvdXRlcy9cIi5jb25jYXQoaWQpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5LnJvdXRlOyB9KTtcbiAgICB9O1xuICAgIFJvdXRlc0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvcm91dGVzJywgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keS5yb3V0ZTsgfSk7XG4gICAgfTtcbiAgICBSb3V0ZXNDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChpZCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChcIi92My9yb3V0ZXMvXCIuY29uY2F0KGlkKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keTsgfSk7XG4gICAgfTtcbiAgICBSb3V0ZXNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoXCIvdjMvcm91dGVzL1wiLmNvbmNhdChpZCkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFJvdXRlc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBSb3V0ZXNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgVmFsaWRhdGVDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVmFsaWRhdGVDbGllbnQocmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMubXVsdGlwbGVWYWxpZGF0aW9uID0gbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50O1xuICAgIH1cbiAgICBWYWxpZGF0ZUNsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5LCByZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeSA9IHsgYWRkcmVzczogYWRkcmVzcyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUnLCBxdWVyeSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzdWx0LmJvZHldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBWYWxpZGF0ZUNsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0ZUNsaWVudDtcbiIsImltcG9ydCB7IF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBJcHNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSXBzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgSXBzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2lwcycsIHF1ZXJ5KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucGFyc2VJcHNSZXNwb25zZShyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIElwc0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlwKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldChcIi92My9pcHMvXCIuY29uY2F0KGlwKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnBhcnNlSXBzUmVzcG9uc2UocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJcHNDbGllbnQucHJvdG90eXBlLnBhcnNlSXBzUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gICAgfTtcbiAgICByZXR1cm4gSXBzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IElwc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgSXBQb29sc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJcFBvb2xzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgSXBQb29sc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92MS9pcF9wb29scycpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIF90aGlzLnBhcnNlSXBQb29sc1Jlc3BvbnNlKHJlc3BvbnNlKTsgfSk7XG4gICAgfTtcbiAgICBJcFBvb2xzQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjEvaXBfcG9vbHMnLCBkYXRhKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSwgcmVzcG9uc2UuYm9keSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIElwUG9vbHNDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChwb29sSWQsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucGF0Y2hXaXRoRkQoXCIvdjEvaXBfcG9vbHMvXCIuY29uY2F0KHBvb2xJZCksIGRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9LCByZXNwb25zZS5ib2R5KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSXBQb29sc0NsaWVudC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHBvb2xJZCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5kZWxldGUoXCIvdjEvaXBfcG9vbHMvXCIuY29uY2F0KHBvb2xJZCksIGRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9LCByZXNwb25zZS5ib2R5KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSXBQb29sc0NsaWVudC5wcm90b3R5cGUucGFyc2VJcFBvb2xzUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSwgcmVzcG9uc2UuYm9keSk7XG4gICAgfTtcbiAgICByZXR1cm4gSXBQb29sc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBJcFBvb2xzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xudmFyIE1haWxpbmdMaXN0c0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbGluZ0xpc3RzQ2xpZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haWxpbmdMaXN0c0NsaWVudChyZXF1ZXN0LCBtZW1iZXJzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBfdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgICAgICAgX3RoaXMubWVtYmVycyA9IG1lbWJlcnM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS5wYXJzZVZhbGlkYXRpb25SZXN1bHQgPSBmdW5jdGlvbiAoc3RhdHVzLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyxcbiAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQ6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkYXRhKSwgeyBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQgKiAxMDAwKSAvLyBhZGQgbWlsbGlzZWNvbmQgdG8gVW5peCB0aW1lc3RhbXBcbiAgICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIE1haWxpbmdMaXN0c0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUsIFwiL3BhZ2VzXCIpLCBxdWVyeSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHkubGlzdDsgfSk7XG4gICAgfTtcbiAgICBNYWlsaW5nTGlzdHNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh0aGlzLmJhc2VSb3V0ZSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keS5saXN0OyB9KTtcbiAgICB9O1xuICAgIE1haWxpbmdMaXN0c0NsaWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcywgZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5Lmxpc3Q7IH0pO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5OyB9KTtcbiAgICB9O1xuICAgIE1haWxpbmdMaXN0c0NsaWVudC5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL3ZhbGlkYXRlXCIpLCB7fSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gKF9fYXNzaWduKHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSwgcmVzcG9uc2UuYm9keSkpOyB9KTtcbiAgICB9O1xuICAgIE1haWxpbmdMaXN0c0NsaWVudC5wcm90b3R5cGUudmFsaWRhdGlvblJlc3VsdCA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUsIFwiL1wiKS5jb25jYXQobWFpbExpc3RBZGRyZXNzLCBcIi92YWxpZGF0ZVwiKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gX3RoaXMucGFyc2VWYWxpZGF0aW9uUmVzdWx0KHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7IH0pO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS5jYW5jZWxWYWxpZGF0aW9uID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL3ZhbGlkYXRlXCIpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiAoe1xuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICAgICAgfSk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE1haWxpbmdMaXN0c0NsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgTWFpbGluZ0xpc3RzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xudmFyIE1haWxMaXN0c01lbWJlcnMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haWxMaXN0c01lbWJlcnMsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbExpc3RzTWVtYmVycyhyZXF1ZXN0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBfdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS5jaGVja0FuZFVwZGF0ZURhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgbmV3RGF0YSA9IF9fYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnZhcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBuZXdEYXRhLnZhcnMgPSBKU09OLnN0cmluZ2lmeShuZXdEYXRhLnZhcnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5zdWJzY3JpYmVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIG5ld0RhdGEuc3Vic2NyaWJlZCA9IGRhdGEuc3Vic2NyaWJlZCA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9O1xuICAgIE1haWxMaXN0c01lbWJlcnMucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS5saXN0TWVtYmVycyA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MsIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyhcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL21lbWJlcnMvcGFnZXNcIiksIHF1ZXJ5KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS5nZXRNZW1iZXIgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzLCBtYWlsTGlzdE1lbWJlckFkZHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUsIFwiL1wiKS5jb25jYXQobWFpbExpc3RBZGRyZXNzLCBcIi9tZW1iZXJzL1wiKS5jb25jYXQobWFpbExpc3RNZW1iZXJBZGRyZXNzKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keS5tZW1iZXI7IH0pO1xuICAgIH07XG4gICAgTWFpbExpc3RzTWVtYmVycy5wcm90b3R5cGUuY3JlYXRlTWVtYmVyID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcywgZGF0YSkge1xuICAgICAgICB2YXIgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUsIFwiL1wiKS5jb25jYXQobWFpbExpc3RBZGRyZXNzLCBcIi9tZW1iZXJzXCIpLCByZXFEYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5Lm1lbWJlcjsgfSk7XG4gICAgfTtcbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS5jcmVhdGVNZW1iZXJzID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcywgZGF0YSkge1xuICAgICAgICB2YXIgbmV3RGF0YSA9IHtcbiAgICAgICAgICAgIG1lbWJlcnM6IEFycmF5LmlzQXJyYXkoZGF0YS5tZW1iZXJzKSA/IEpTT04uc3RyaW5naWZ5KGRhdGEubWVtYmVycykgOiBkYXRhLm1lbWJlcnMsXG4gICAgICAgICAgICB1cHNlcnQ6IGRhdGEudXBzZXJ0XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL21lbWJlcnMuanNvblwiKSwgbmV3RGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keTsgfSk7XG4gICAgfTtcbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS51cGRhdGVNZW1iZXIgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzLCBtYWlsTGlzdE1lbWJlckFkZHJlc3MsIGRhdGEpIHtcbiAgICAgICAgdmFyIHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUsIFwiL1wiKS5jb25jYXQobWFpbExpc3RBZGRyZXNzLCBcIi9tZW1iZXJzL1wiKS5jb25jYXQobWFpbExpc3RNZW1iZXJBZGRyZXNzKSwgcmVxRGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keS5tZW1iZXI7IH0pO1xuICAgIH07XG4gICAgTWFpbExpc3RzTWVtYmVycy5wcm90b3R5cGUuZGVzdHJveU1lbWJlciA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MsIG1haWxMaXN0TWVtYmVyQWRkcmVzcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL21lbWJlcnMvXCIpLmNvbmNhdChtYWlsTGlzdE1lbWJlckFkZHJlc3MpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5OyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBNYWlsTGlzdHNNZW1iZXJzO1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBNYWlsTGlzdHNNZW1iZXJzO1xuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xudmFyIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2RvbWFpbnMvJztcbiAgICB9XG4gICAgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQucHJvdG90eXBlLl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXRlbXM6IHJlc3BvbnNlLmJvZHkuaXRlbXMsXG4gICAgICAgICAgICB0b3RhbENvdW50OiByZXNwb25zZS5ib2R5LnRvdGFsX2NvdW50XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBEb21haW5DcmVkZW50aWFsc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlTWVzc2FnZVJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQucHJvdG90eXBlLl9wYXJzZURlbGV0ZWRSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgICBzcGVjOiByZXNwb25zZS5ib2R5LnNwZWNcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL2NyZWRlbnRpYWxzJyksIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlKS5jb25jYXQoZG9tYWluLCBcIi9jcmVkZW50aWFsc1wiKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCBjcmVkZW50aWFsc0xvZ2luLCBkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlKS5jb25jYXQoZG9tYWluLCBcIi9jcmVkZW50aWFscy9cIikuY29uY2F0KGNyZWRlbnRpYWxzTG9naW4pLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZG9tYWluLCBjcmVkZW50aWFsc0xvZ2luKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlKS5jb25jYXQoZG9tYWluLCBcIi9jcmVkZW50aWFscy9cIikuY29uY2F0KGNyZWRlbnRpYWxzTG9naW4pKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlRGVsZXRlZFJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xuaW1wb3J0IEF0dGFjaG1lbnRzSGFuZGxlciBmcm9tICcuLi9jb21tb24vQXR0YWNobWVudHNIYW5kbGVyLmpzJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3IuanMnO1xudmFyIE11bHRpcGxlVmFsaWRhdGlvbkpvYiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNdWx0aXBsZVZhbGlkYXRpb25Kb2IoZGF0YSwgcmVzcG9uc2VTdGF0dXNDb2RlKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSBkYXRhLnF1YW50aXR5O1xuICAgICAgICB0aGlzLnJlY29yZHNQcm9jZXNzZWQgPSBkYXRhLnJlY29yZHNfcHJvY2Vzc2VkO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RhdHVzQ29kZSA9IHJlc3BvbnNlU3RhdHVzQ29kZTtcbiAgICAgICAgaWYgKGRhdGEuZG93bmxvYWRfdXJsKSB7XG4gICAgICAgICAgICB0aGlzLmRvd25sb2FkVXJsID0ge1xuICAgICAgICAgICAgICAgIGNzdjogKF9hID0gZGF0YS5kb3dubG9hZF91cmwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jc3YsXG4gICAgICAgICAgICAgICAganNvbjogKF9iID0gZGF0YS5kb3dubG9hZF91cmwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5qc29uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnN1bW1hcnkpIHtcbiAgICAgICAgICAgIHRoaXMuc3VtbWFyeSA9IHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2hBbGw6IGRhdGEuc3VtbWFyeS5yZXN1bHQuY2F0Y2hfYWxsLFxuICAgICAgICAgICAgICAgICAgICBkZWxpdmVyYWJsZTogZGF0YS5zdW1tYXJ5LnJlc3VsdC5kZWxpdmVyYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgZG9Ob3RTZW5kOiBkYXRhLnN1bW1hcnkucmVzdWx0LmRvX25vdF9zZW5kLFxuICAgICAgICAgICAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBkYXRhLnN1bW1hcnkucmVzdWx0LnVuZGVsaXZlcmFibGUsXG4gICAgICAgICAgICAgICAgICAgIHVua25vd246IGRhdGEuc3VtbWFyeS5yZXN1bHQudW5rbm93blxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmlzazoge1xuICAgICAgICAgICAgICAgICAgICBoaWdoOiBkYXRhLnN1bW1hcnkucmlzay5oaWdoLFxuICAgICAgICAgICAgICAgICAgICBsb3c6IGRhdGEuc3VtbWFyeS5yaXNrLmxvdyxcbiAgICAgICAgICAgICAgICAgICAgbWVkaXVtOiBkYXRhLnN1bW1hcnkucmlzay5tZWRpdW0sXG4gICAgICAgICAgICAgICAgICAgIHVua25vd246IGRhdGEuc3VtbWFyeS5yaXNrLnVua25vd25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBNdWx0aXBsZVZhbGlkYXRpb25Kb2I7XG59KCkpO1xuZXhwb3J0IHsgTXVsdGlwbGVWYWxpZGF0aW9uSm9iIH07XG52YXIgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLmF0dGFjaG1lbnRzSGFuZGxlciA9IG5ldyBBdHRhY2htZW50c0hhbmRsZXIoKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQucHJvdG90eXBlLmhhbmRsZVJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3BvbnNlID09PSBudWxsIHx8IHJlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXNwb25zZS5ib2R5KTtcbiAgICB9O1xuICAgIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudC5wcm90b3R5cGUucGFyc2VMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEuam9icyA9IHJlc3BvbnNlLmJvZHkuam9icy5tYXAoZnVuY3Rpb24gKGpvYikgeyByZXR1cm4gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkpvYihqb2IsIHJlc3BvbnNlLnN0YXR1cyk7IH0pO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncGl2b3QnKTtcbiAgICAgICAgZGF0YS50b3RhbCA9IHJlc3BvbnNlLmJvZHkudG90YWw7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoJy92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsnLCBxdWVyeSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobGlzdElkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldChcIi92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvXCIuY29uY2F0KGxpc3RJZCkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3IE11bHRpcGxlVmFsaWRhdGlvbkpvYihyZXNwb25zZS5ib2R5LCByZXNwb25zZS5zdGF0dXMpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQucHJvdG90eXBlLmNvbnZlcnRUb0V4cGVjdGVkU2hhcGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YTtcbiAgICAgICAgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGRhdGEuZmlsZSkpIHtcbiAgICAgICAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IGRhdGEuZmlsZSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhLmZpbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiB7IGRhdGE6IGRhdGEuZmlsZSB9IH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0oZGF0YS5maWxlKSkge1xuICAgICAgICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHsgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZTogZGF0YS5maWxlIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXVsdGlwbGVWYWxpZGF0aW9uRGF0YTtcbiAgICB9O1xuICAgIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGxpc3RJZCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSwgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEgfHwgIWRhdGEuZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1wiZmlsZVwiIHByb3BlcnR5IGV4cGVjdGVkLicsICdNYWtlIHN1cmUgc2Vjb25kIGFyZ3VtZW50IGhhcyBcImZpbGVcIiBwcm9wZXJ0eS4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB0aGlzLmNvbnZlcnRUb0V4cGVjdGVkU2hhcGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChcIi92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvXCIuY29uY2F0KGxpc3RJZCksIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5oYW5kbGVSZXNwb25zZShyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChsaXN0SWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay9cIi5jb25jYXQobGlzdElkKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xudmFyIERvbWFpblRlbXBsYXRlSXRlbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb21haW5UZW1wbGF0ZUl0ZW0oZG9tYWluVGVtcGxhdGVGcm9tQVBJKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5uYW1lO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmNyZWF0ZWRBdCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQgPyBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0KSA6ICcnO1xuICAgICAgICB0aGlzLmNyZWF0ZWRCeSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQnk7XG4gICAgICAgIHRoaXMuaWQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuaWQ7XG4gICAgICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbikge1xuICAgICAgICAgICAgdGhpcy52ZXJzaW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb247XG4gICAgICAgICAgICBpZiAodGhpcy52ZXJzaW9uICYmIGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVyc2lvbi5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMgJiYgZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy52ZXJzaW9ucyA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5tYXAoZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gX19hc3NpZ24oe30sIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5jcmVhdGVkQXQgPSBuZXcgRGF0ZSh2ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBEb21haW5UZW1wbGF0ZUl0ZW07XG59KCkpO1xuZXhwb3J0IHsgRG9tYWluVGVtcGxhdGVJdGVtIH07XG52YXIgRG9tYWluVGVtcGxhdGVzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhEb21haW5UZW1wbGF0ZXNDbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRG9tYWluVGVtcGxhdGVzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLmJhc2VSb3V0ZSA9ICcvdjMvJztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlQ3JlYXRpb25SZXNwb25zZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGRhdGEuYm9keS50ZW1wbGF0ZSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICAgICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5wYXJzZU11dGF0aW9uUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICAgICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC50ZW1wbGF0ZU5hbWUgPSBkYXRhLmJvZHkudGVtcGxhdGUubmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5wYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICAgICAgaWYgKGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgICAgICAgcmVzdWx0LnRlbXBsYXRlVmVyc2lvbiA9IHsgdGFnOiBkYXRhLmJvZHkudGVtcGxhdGUudmVyc2lvbi50YWcgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGQpOyB9KTtcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3AnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlc3BvbnNlLmJvZHkudGVtcGxhdGUpO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncCcpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChkb21haW4sIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIHF1ZXJ5KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkb21haW4sIHRlbXBsYXRlTmFtZSwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBxdWVyeSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VDcmVhdGlvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCB0ZW1wbGF0ZU5hbWUsIGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VNdXRhdGlvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGRvbWFpbiwgdGVtcGxhdGVOYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLnBhcnNlTXV0YXRpb25SZXNwb25zZShyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUuZGVzdHJveUFsbCA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VOb3RpZmljYXRpb25SZXNwb25zZShyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUubGlzdFZlcnNpb25zID0gZnVuY3Rpb24gKGRvbWFpbiwgdGVtcGxhdGVOYW1lLCBxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUuZ2V0VmVyc2lvbiA9IGZ1bmN0aW9uIChkb21haW4sIHRlbXBsYXRlTmFtZSwgdGFnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlcy5ib2R5LnRlbXBsYXRlKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLmNyZWF0ZVZlcnNpb24gPSBmdW5jdGlvbiAoZG9tYWluLCB0ZW1wbGF0ZU5hbWUsIGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIGRhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS51cGRhdGVWZXJzaW9uID0gZnVuY3Rpb24gKGRvbWFpbiwgdGVtcGxhdGVOYW1lLCB0YWcsIGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICBmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95VmVyc2lvbiA9IGZ1bmN0aW9uIChkb21haW4sIHRlbXBsYXRlTmFtZSwgdGFnKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEb21haW5UZW1wbGF0ZXNDbGllbnQ7XG59KE5hdmlnYXRpb25UaHJ1UGFnZXMpKTtcbmV4cG9ydCBkZWZhdWx0IERvbWFpblRlbXBsYXRlc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZXh0ZW5kcywgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLmpzJztcbnZhciBEb21haW5UYWcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9tYWluVGFnKHRhZ0luZm8pIHtcbiAgICAgICAgdGhpcy50YWcgPSB0YWdJbmZvLnRhZztcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ0luZm8uZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXNbJ2ZpcnN0LXNlZW4nXSA9IG5ldyBEYXRlKHRhZ0luZm9bJ2ZpcnN0LXNlZW4nXSk7XG4gICAgICAgIHRoaXNbJ2xhc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snbGFzdC1zZWVuJ10pO1xuICAgIH1cbiAgICByZXR1cm4gRG9tYWluVGFnO1xufSgpKTtcbmV4cG9ydCB7IERvbWFpblRhZyB9O1xudmFyIERvbWFpblRhZ1N0YXRpc3RpYyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb21haW5UYWdTdGF0aXN0aWModGFnU3RhdGlzdGljSW5mbykge1xuICAgICAgICB0aGlzLnRhZyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS50YWc7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSh0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhcnQpO1xuICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5lbmQpO1xuICAgICAgICB0aGlzLnJlc29sdXRpb24gPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkucmVzb2x1dGlvbjtcbiAgICAgICAgdGhpcy5zdGF0cyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQpIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc3RhdCksIHsgdGltZTogbmV3IERhdGUoc3RhdC50aW1lKSB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gRG9tYWluVGFnU3RhdGlzdGljO1xufSgpKTtcbmV4cG9ydCB7IERvbWFpblRhZ1N0YXRpc3RpYyB9O1xudmFyIERvbWFpblRhZ3NDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERvbWFpblRhZ3NDbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRG9tYWluVGFnc0NsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBfdGhpcy5iYXNlUm91dGUgPSAnL3YzLyc7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUucGFyc2VMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAodGFnSW5mbykgeyByZXR1cm4gbmV3IERvbWFpblRhZyh0YWdJbmZvKTsgfSk7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICd0YWcnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlVGFnU3RhdGlzdGljID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9tYWluVGFnU3RhdGlzdGljKHJlc3BvbnNlKTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnKSwgcXVlcnkpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkb21haW4sIHRhZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBuZXcgRG9tYWluVGFnKHJlcy5ib2R5KTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UYWdzQ2xpZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCB0YWcsIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSwgZGVzY3JpcHRpb24pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UYWdzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGRvbWFpbiwgdGFnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlKS5jb25jYXQoZG9tYWluLCBcIi90YWdzL1wiKS5jb25jYXQodGFnKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuICh7XG4gICAgICAgICAgICBtZXNzYWdlOiByZXMuYm9keS5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhdHVzOiByZXMuc3RhdHVzXG4gICAgICAgIH0pOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLnN0YXRpc3RpYyA9IGZ1bmN0aW9uIChkb21haW4sIHRhZywgcXVlcnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cycpLCBxdWVyeSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLl9wYXJzZVRhZ1N0YXRpc3RpYyhyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLmNvdW50cmllcyA9IGZ1bmN0aW9uIChkb21haW4sIHRhZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvY291bnRyaWVzJykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UYWdzQ2xpZW50LnByb3RvdHlwZS5wcm92aWRlcnMgPSBmdW5jdGlvbiAoZG9tYWluLCB0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL3Byb3ZpZGVycycpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUuZGV2aWNlcyA9IGZ1bmN0aW9uIChkb21haW4sIHRhZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvZGV2aWNlcycpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERvbWFpblRhZ3NDbGllbnQ7XG59KE5hdmlnYXRpb25UaHJ1UGFnZXMpKTtcbmV4cG9ydCBkZWZhdWx0IERvbWFpblRhZ3NDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi8uLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG52YXIgU2VlZHNMaXN0c0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2VlZHNMaXN0c0NsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTZWVkc0xpc3RzQ2xpZW50KHJlcXVlc3QsIGF0dHJpYnV0ZXMsIGZpbHRlcnMsIGxvZ2dlcikge1xuICAgICAgICBpZiAobG9nZ2VyID09PSB2b2lkIDApIHsgbG9nZ2VyID0gY29uc29sZTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCByZXF1ZXN0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgX3RoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgICAgIF90aGlzLmZpbHRlcnMgPSBmaWx0ZXJzO1xuICAgICAgICBfdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUuY29udmVydERhdGVUb1VUQyA9IGZ1bmN0aW9uIChrZXksIGlucHV0RGF0ZSkge1xuICAgICAgICAvKlxuICAgICAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgICAgIGFuZCBiZWNhdXNlIGZvciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XG4gICAgICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIkRhdGU6IFxcXCJcIi5jb25jYXQoaW5wdXREYXRlLCBcIlxcXCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXFxuVmFsdWUgXFxcIlwiKS5jb25jYXQoaW5wdXREYXRlLnRvSVNPU3RyaW5nKCksIFwiXFxcIiB3aWxsIGJlIHVzZWQgZm9yIHJlcXVlc3QuXFxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFxcXCJcIikuY29uY2F0KGtleSwgXCJcXFwiIHRvIGF2b2lkIGF1dG8tY29udmVydGluZ1wiKSk7XG4gICAgICAgIHJldHVybiBpbnB1dERhdGUudG9JU09TdHJpbmcoKTtcbiAgICB9O1xuICAgIFNlZWRzTGlzdHNDbGllbnQucHJvdG90eXBlLnByZXBhcmVRdWVyeURhdGEgPSBmdW5jdGlvbiAocXVlcnlEYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBwcm9wc0ZvclJlcGxhY2VtZW50ID0gcXVlcnlEYXRhO1xuICAgICAgICB2YXIgcmVwbGFjZWRQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzRm9yUmVwbGFjZW1lbnQpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcm9wID0ga2V5O1xuICAgICAgICAgICAgaWYgKCEhcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSAmJiB0eXBlb2YgcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBxdWVyeURhdGFbcHJvcF07XG4gICAgICAgICAgICAgICAgYWNjW3Byb3BdID0gX3RoaXMuY29udmVydERhdGVUb1VUQyhwcm9wLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIHZhciByZXN1bHQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcXVlcnlEYXRhKSwgcmVwbGFjZWRQcm9wcyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5wcmVwYXJlUmVzdWx0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICB2YXIgc2VlZExpc3QgPSB0aGlzLnByZXBhcmVTZWVkTGlzdChkYXRhLmJvZHkpO1xuICAgICAgICByZXN1bHQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc2VlZExpc3QpLCB7IHN0YXR1czogZGF0YS5zdGF0dXMgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5wcmVwYXJlU2VlZExpc3QgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgc2VlZHM7XG4gICAgICAgIHZhciBoYW5kbGVkU2VlZExpc3REYXRlcyA9IHtcbiAgICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCksXG4gICAgICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLnVwZGF0ZWRfYXQpLFxuICAgICAgICAgICAgbGFzdF9yZXN1bHRfYXQ6IG5ldyBEYXRlKGRhdGEubGFzdF9yZXN1bHRfYXQpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZGF0YS5TZWVkcykge1xuICAgICAgICAgICAgc2VlZHMgPSBkYXRhLlNlZWRzLm1hcChmdW5jdGlvbiAoc2VlZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VlZCA9IHt9O1xuICAgICAgICAgICAgICAgIHZhciBoYW5kbGVkU2VlZERhdGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShzZWVkSXRlbS5jcmVhdGVkX2F0KSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoc2VlZEl0ZW0udXBkYXRlZF9hdCksXG4gICAgICAgICAgICAgICAgICAgIG1heF9lbWFpbF9jb3VudF9oaXRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLm1heF9lbWFpbF9jb3VudF9oaXRfYXQpLFxuICAgICAgICAgICAgICAgICAgICBsYXN0X3NlbnRfdG9fYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLmxhc3Rfc2VudF90b19hdCksXG4gICAgICAgICAgICAgICAgICAgIGxhc3RfZGVsaXZlcmVkX2F0OiBuZXcgRGF0ZShzZWVkSXRlbS5sYXN0X2RlbGl2ZXJlZF9hdCksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBzZWVkID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHNlZWRJdGVtKSwgaGFuZGxlZFNlZWREYXRlcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlZWRzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2VlZExpc3QgPSBfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YSksIHsgU2VlZHM6IHNlZWRzIH0pLCBoYW5kbGVkU2VlZExpc3REYXRlcyk7XG4gICAgICAgIGRlbGV0ZSBzZWVkTGlzdC5JZDtcbiAgICAgICAgcmV0dXJuIHNlZWRMaXN0O1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUucGFyc2VMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgfTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IChfYSA9IHJlc3BvbnNlLmJvZHkuaXRlbXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIF90aGlzLnByZXBhcmVTZWVkTGlzdChpdGVtKTsgfSk7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIFNlZWRzTGlzdHNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5RGF0YSwgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeURhdGEgPSB0aGlzLnByZXBhcmVRdWVyeURhdGEocXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2luYm94L3NlZWRsaXN0cycsIHF1ZXJ5RGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UpKSwgeyBzdGF0dXM6IDIwMCB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSwgdXBkYXRlZFNlZWRzTGlzdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldChcIi92NC9pbmJveC9zZWVkbGlzdHMvXCIuY29uY2F0KGlkKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRTZWVkc0xpc3QgPSB0aGlzLnByZXBhcmVTZWVkTGlzdChyZXNwb25zZS5ib2R5LnNlZWRsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdXBkYXRlZFNlZWRzTGlzdCksIHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNlZWRzTGlzdHNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92NC9pbmJveC9zZWVkbGlzdHMnLCBkYXRhKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucHJlcGFyZVJlc3VsdChyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNlZWRzTGlzdHNDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChpZCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wdXQoXCIvdjQvaW5ib3gvc2VlZGxpc3RzL1wiLmNvbmNhdChpZCksIGRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wcmVwYXJlUmVzdWx0KHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucmVxdWVzdC5kZWxldGUoXCIvdjQvaW5ib3gvc2VlZGxpc3RzL1wiLmNvbmNhdChpZCkpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTZWVkc0xpc3RzQ2xpZW50O1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBTZWVkc0xpc3RzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBJbmJveFBsYWNlbWVudHNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW5ib3hQbGFjZW1lbnRzQ2xpZW50KHJlcXVlc3QsIHNlZWRzTGlzdHNDbGllbnQsIHJlc3VsdHMsIHByb3ZpZGVycykge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLnNlZWRzTGlzdHMgPSBzZWVkc0xpc3RzQ2xpZW50O1xuICAgICAgICB0aGlzLnNlZWRzTGlzdHMgPSBzZWVkc0xpc3RzQ2xpZW50O1xuICAgICAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgICAgICB0aGlzLnByb3ZpZGVycyA9IHByb3ZpZGVycztcbiAgICB9XG4gICAgSW5ib3hQbGFjZW1lbnRzQ2xpZW50LnByb3RvdHlwZS5ydW5UZXN0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucG9zdCgnL3Y0L2luYm94L3Rlc3RzJywgZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzcG9uc2UuYm9keSksIHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBJbmJveFBsYWNlbWVudHNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgSW5ib3hQbGFjZW1lbnRzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xudmFyIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudChyZXF1ZXN0LCBhdHRyaWJ1dGVzLCBmaWx0ZXJzLCBzaGFyaW5nLCBsb2dnZXIpIHtcbiAgICAgICAgaWYgKGxvZ2dlciA9PT0gdm9pZCAwKSB7IGxvZ2dlciA9IGNvbnNvbGU7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgICAgICBfdGhpcy5maWx0ZXJzID0gZmlsdGVycztcbiAgICAgICAgX3RoaXMuc2hhcmluZyA9IHNoYXJpbmc7XG4gICAgICAgIF90aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LnByb3RvdHlwZS5jb252ZXJ0RGF0ZVRvVVRDID0gZnVuY3Rpb24gKGtleSwgaW5wdXREYXRlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgQmVjYXVzZSBcIm5ldyBEYXRlKCcyMDIyLTEyLTI1VDAwOjAwOjAwLjAwMFonKVwiIGJlY29tZXMgXCJTdW4gRGVjIDI1IDIwMjIgMDI6MDA6MDAgR01UKzAyMDBcIlxuICAgICAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgICAgICBleDogJ1RodSwgMTMgT2N0IDIwMTEgMTg6MDI6MDAgKzAwMDAnLlxuICAgICAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFwiRGF0ZTogXFxcIlwiLmNvbmNhdChpbnB1dERhdGUsIFwiXFxcIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cXG5WYWx1ZSBcXFwiXCIpLmNvbmNhdChpbnB1dERhdGUudG9JU09TdHJpbmcoKSwgXCJcXFwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXFxcIlwiKS5jb25jYXQoa2V5LCBcIlxcXCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nXCIpKTtcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0ZS50b0lTT1N0cmluZygpO1xuICAgIH07XG4gICAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC5wcm90b3R5cGUucHJlcGFyZVF1ZXJ5RGF0YSA9IGZ1bmN0aW9uIChxdWVyeURhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHByb3BzRm9yUmVwbGFjZW1lbnQgPSBxdWVyeURhdGE7XG4gICAgICAgIHZhciByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICAgICAgdmFyIHByb3AgPSBrZXk7XG4gICAgICAgICAgICBpZiAoISFwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdICYmIHR5cGVvZiBwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHF1ZXJ5RGF0YVtwcm9wXTtcbiAgICAgICAgICAgICAgICBhY2NbcHJvcF0gPSBfdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKHByb3AsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBxdWVyeURhdGEpLCByZXBsYWNlZFByb3BzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQucHJvdG90eXBlLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgYm94ID0ge307XG4gICAgICAgIHZhciBoYW5kbGVkU2VlZExpc3REYXRlcyA9IHtcbiAgICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCksXG4gICAgICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLnVwZGF0ZWRfYXQpLFxuICAgICAgICAgICAgc2hhcmluZ19leHBpcmVzX2F0OiBuZXcgRGF0ZShkYXRhLnNoYXJpbmdfZXhwaXJlc19hdCksXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkYXRhLkJveCkge1xuICAgICAgICAgICAgYm94ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGRhdGEuQm94KSwgeyBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLkJveC5jcmVhdGVkX2F0KSwgdXBkYXRlZF9hdDogbmV3IERhdGUoZGF0YS5Cb3gudXBkYXRlZF9hdCksIGxhc3RfcmVzdWx0X2F0OiBuZXcgRGF0ZShkYXRhLkJveC5sYXN0X3Jlc3VsdF9hdCkgfSk7XG4gICAgICAgICAgICBkZWxldGUgYm94LklEO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmJveFBsYWNlbWVudHNSZXN1bHQgPSBfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YSksIHsgQm94OiBib3ggfSksIGhhbmRsZWRTZWVkTGlzdERhdGVzKSwgeyBpZDogZGF0YS5JZCB9KTtcbiAgICAgICAgZGVsZXRlIGluYm94UGxhY2VtZW50c1Jlc3VsdC5JRDtcbiAgICAgICAgcmV0dXJuIGluYm94UGxhY2VtZW50c1Jlc3VsdDtcbiAgICB9O1xuICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIF90aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQoaXRlbSk7IH0pO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeURhdGEsIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnlEYXRhKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoJy92NC9pbmJveC9yZXN1bHRzJywgcXVlcnlEYXRhKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucGFyc2VMaXN0KHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSwgaW5ib3hQbGFjZW1lbnRSZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoXCIvdjQvaW5ib3gvcmVzdWx0cy9cIi5jb25jYXQoaWQpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5ib3hQbGFjZW1lbnRSZXN1bHQgPSB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQocmVzcG9uc2UuYm9keS5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluYm94UGxhY2VtZW50UmVzdWx0OiBpbmJveFBsYWNlbWVudFJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiL3Y0L2luYm94L3Jlc3VsdHMvXCIuY29uY2F0KGlkKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3BvbnNlLmJvZHkpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LnByb3RvdHlwZS5nZXRSZXN1bHRCeVNoYXJlSWQgPSBmdW5jdGlvbiAoc2hhcmVJZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UsIGluYm94UGxhY2VtZW50UmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y0L2luYm94L3NoYXJpbmcvcHVibGljL1wiLmNvbmNhdChzaGFyZUlkKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluYm94UGxhY2VtZW50UmVzdWx0ID0gdGhpcy5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0KHJlc3BvbnNlLmJvZHkucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmJveFBsYWNlbWVudFJlc3VsdDogaW5ib3hQbGFjZW1lbnRSZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50KHJlcXVlc3QsIHBhdGgpIHtcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KHRoaXMucGF0aCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoXCJcIi5jb25jYXQodGhpcy5wYXRoLCBcIi9cIikuY29uY2F0KGF0dHJpYnV0ZU5hbWUpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXNwb25zZS5ib2R5KSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQocmVxdWVzdCwgcGF0aCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIH1cbiAgICBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KHRoaXMucGF0aCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3VsdC5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZF9maWx0ZXJzOiByZXN1bHQuYm9keS5zdXBwb3J0ZWRfZmlsdGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIElQUlNoYXJpbmdDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSVBSU2hhcmluZ0NsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIElQUlNoYXJpbmdDbGllbnQucHJvdG90eXBlLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHRTaGFyaW5nID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIGhhbmRsZWRTZWVkTGlzdERhdGVzID0ge1xuICAgICAgICAgICAgZXhwaXJlc19hdDogbmV3IERhdGUoZGF0YS5leHBpcmVzX2F0KSxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkYXRhKSwgaGFuZGxlZFNlZWRMaXN0RGF0ZXMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgSVBSU2hhcmluZ0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSwgcmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y0L2luYm94L3NoYXJpbmcvXCIuY29uY2F0KGlkKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmcocmVzcG9uc2UuYm9keS5zaGFyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3VsdCldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIElQUlNoYXJpbmdDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChpZCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UsIHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnB1dChcIi92NC9pbmJveC9zaGFyaW5nL1wiLmNvbmNhdChpZCksIHt9LCB7IHF1ZXJ5OiBcImVuYWJsZWQ9XCIuY29uY2F0KGRhdGEuZW5hYmxlZCkgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmcocmVzcG9uc2UuYm9keS5zaGFyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzdWx0KSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIElQUlNoYXJpbmdDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgSVBSU2hhcmluZ0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucGF0aCA9ICcvdjQvaW5ib3gvcHJvdmlkZXJzJztcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlZFByb3ZpZGVyRGF0ZXMgPSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoaXRlbS5jcmVhdGVkX2F0KSxcbiAgICAgICAgICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShpdGVtLnVwZGF0ZWRfYXQpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgaXRlbSksIGhhbmRsZWRQcm92aWRlckRhdGVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCh0aGlzLnBhdGgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgTWV0cmljc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXRyaWNzQ2xpZW50KHJlcXVlc3QsIGxvZ2dlcikge1xuICAgICAgICBpZiAobG9nZ2VyID09PSB2b2lkIDApIHsgbG9nZ2VyID0gY29uc29sZTsgfVxuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG4gICAgTWV0cmljc0NsaWVudC5wcm90b3R5cGUuY29udmVydERhdGVUb1VUQyA9IGZ1bmN0aW9uIChrZXksIGlucHV0RGF0ZSkge1xuICAgICAgICAvKlxuICAgICAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgICAgIGFuZCBiZWNhdXNlIGZvciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XG4gICAgICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIkRhdGU6XFxcIlwiLmNvbmNhdChpbnB1dERhdGUsIFwiXFxcIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cXG5WYWx1ZSBcXFwiXCIpLmNvbmNhdChpbnB1dERhdGUudG9VVENTdHJpbmcoKSwgXCJcXFwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXFxcIlwiKS5jb25jYXQoa2V5LCBcIlxcXCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nXCIpKTtcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0ZS50b1VUQ1N0cmluZygpO1xuICAgIH07XG4gICAgTWV0cmljc0NsaWVudC5wcm90b3R5cGUucHJlcGFyZVF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHZhciBzdGFydERhdGU7XG4gICAgICAgIHZhciBlbmREYXRlO1xuICAgICAgICBpZiAocXVlcnkpIHtcbiAgICAgICAgICAgIHZhciBxU3RhcnQgPSBxdWVyeSA9PT0gbnVsbCB8fCBxdWVyeSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcXVlcnkuc3RhcnQ7XG4gICAgICAgICAgICB2YXIgcUVuZCA9IHF1ZXJ5ID09PSBudWxsIHx8IHF1ZXJ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBxdWVyeS5lbmQ7XG4gICAgICAgICAgICBzdGFydERhdGUgPSBxU3RhcnQgaW5zdGFuY2VvZiBEYXRlID8gdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKCdzdGFydCcsIHFTdGFydCkgOiBxU3RhcnQgIT09IG51bGwgJiYgcVN0YXJ0ICE9PSB2b2lkIDAgPyBxU3RhcnQgOiAnJztcbiAgICAgICAgICAgIGVuZERhdGUgPSBxRW5kICYmIHFFbmQgaW5zdGFuY2VvZiBEYXRlID8gdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKCdlbmQnLCBxRW5kKSA6IHFFbmQgIT09IG51bGwgJiYgcUVuZCAhPT0gdm9pZCAwID8gcUVuZCA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcXVlcnkpLCB7IHN0YXJ0OiBzdGFydERhdGUsIGVuZDogZW5kRGF0ZSB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIE1ldHJpY3NDbGllbnQucHJvdG90eXBlLmhhbmRsZVJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciByZXNCb2R5ID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IERhdGUucGFyc2UocmVzQm9keS5zdGFydCkgPyBuZXcgRGF0ZShyZXNCb2R5LnN0YXJ0KSA6IG51bGw7XG4gICAgICAgIHZhciBlbmREYXRlID0gRGF0ZS5wYXJzZShyZXNCb2R5LmVuZCkgPyBuZXcgRGF0ZShyZXNCb2R5LmVuZCkgOiBudWxsO1xuICAgICAgICB2YXIgcmVzdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc0JvZHkpLCB7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLCBzdGFydDogc3RhcnREYXRlLCBlbmQ6IGVuZERhdGUgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBNZXRyaWNzQ2xpZW50LnByb3RvdHlwZS5nZXRBY2NvdW50ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeURhdGEsIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnkocXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnBvc3QoJy92MS9hbmFseXRpY3MvbWV0cmljcycsIHF1ZXJ5RGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTWV0cmljc0NsaWVudC5wcm90b3R5cGUuZ2V0QWNjb3VudFVzYWdlID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeURhdGEsIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnkocXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnBvc3QoJy92MS9hbmFseXRpY3MvdXNhZ2UvbWV0cmljcycsIHF1ZXJ5RGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE1ldHJpY3NDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgTWV0cmljc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG52YXIgRG9tYWluVHJhY2tpbmdDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9tYWluVHJhY2tpbmdDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBEb21haW5UcmFja2luZ0NsaWVudC5wcm90b3R5cGUuX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS50cmFja2luZztcbiAgICB9O1xuICAgIERvbWFpblRyYWNraW5nQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VUcmFja2luZ1VwZGF0ZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICB9O1xuICAgIERvbWFpblRyYWNraW5nQ2xpZW50LnByb3RvdHlwZS5faXNPcGVuVHJhY2tpbmdJbmZvV2l0UGxhY2UgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAncGxhY2VfYXRfdGhlX3RvcCcgaW4gb2JqO1xuICAgIH07XG4gICAgRG9tYWluVHJhY2tpbmdDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3YyL3g1MDkvXCIuY29uY2F0KGRvbWFpbiwgXCIvc3RhdHVzXCIpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXNwb25zZS5ib2R5KSwgeyByZXNwb25zZVN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRG9tYWluVHJhY2tpbmdDbGllbnQucHJvdG90eXBlLmdlbmVyYXRlID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0KFwiL3YyL3g1MDkvXCIuY29uY2F0KGRvbWFpbikpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc3BvbnNlLmJvZHkpLCB7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEb21haW5UcmFja2luZ0NsaWVudC5wcm90b3R5cGUucmVnZW5lcmF0ZSA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucHV0KFwiL3YyL3g1MDkvXCIuY29uY2F0KGRvbWFpbikpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc3BvbnNlLmJvZHkpLCB7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEb21haW5UcmFja2luZ0NsaWVudC5wcm90b3R5cGUuZ2V0VHJhY2tpbmcgPSBmdW5jdGlvbiAoZG9tYWluKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJykpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5fcGFyc2VUcmFja2luZ1NldHRpbmdzKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRG9tYWluVHJhY2tpbmdDbGllbnQucHJvdG90eXBlLnVwZGF0ZVRyYWNraW5nID0gZnVuY3Rpb24gKGRvbWFpbiwgdHlwZSwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcHJlcGFyZWREYXRhLCByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXBhcmVkRGF0YSA9IF9fYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS5hY3RpdmUpID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVwYXJlZERhdGEuYWN0aXZlID0gKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS5hY3RpdmUpID8gJ3llcycgOiAnbm8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzT3BlblRyYWNraW5nSW5mb1dpdFBsYWNlKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLnBsYWNlX2F0X3RoZV90b3ApID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlcGFyZWREYXRhLnBsYWNlX2F0X3RoZV90b3AgPSAoZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLnBsYWNlX2F0X3RoZV90b3ApID8gJ3llcycgOiAnbm8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycsIHR5cGUpLCBwcmVwYXJlZERhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5fcGFyc2VUcmFja2luZ1VwZGF0ZShyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEb21haW5UcmFja2luZ0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBEb21haW5UcmFja2luZ0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSBcInRzbGliXCI7XG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QuanMnO1xuaW1wb3J0IERvbWFpbnNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNDbGllbnQuanMnO1xuaW1wb3J0IEV2ZW50Q2xpZW50IGZyb20gJy4vRXZlbnRzLmpzJztcbmltcG9ydCBTdGF0c0NsaWVudCBmcm9tICcuL1N0YXRzL1N0YXRzQ2xpZW50LmpzJztcbmltcG9ydCBTdXBwcmVzc2lvbkNsaWVudCBmcm9tICcuL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbnNDbGllbnQuanMnO1xuaW1wb3J0IFdlYmhvb2tzQ2xpZW50IGZyb20gJy4vV2ViaG9va3MuanMnO1xuaW1wb3J0IE1lc3NhZ2VzQ2xpZW50IGZyb20gJy4vTWVzc2FnZXMuanMnO1xuaW1wb3J0IFJvdXRlc0NsaWVudCBmcm9tICcuL1JvdXRlcy5qcyc7XG5pbXBvcnQgVmFsaWRhdGVDbGllbnQgZnJvbSAnLi9WYWxpZGF0aW9ucy92YWxpZGF0ZS5qcyc7XG5pbXBvcnQgSXBzQ2xpZW50IGZyb20gJy4vSVBzLmpzJztcbmltcG9ydCBJcFBvb2xzQ2xpZW50IGZyb20gJy4vSVBQb29scy5qcyc7XG5pbXBvcnQgTWFpbGluZ0xpc3RzQ2xpZW50IGZyb20gJy4vTWFpbGluZ0xpc3RzL21haWxpbmdMaXN0cy5qcyc7XG5pbXBvcnQgTWFpbExpc3RzTWVtYmVycyBmcm9tICcuL01haWxpbmdMaXN0cy9tYWlsTGlzdE1lbWJlcnMuanMnO1xuaW1wb3J0IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zQ3JlZGVudGlhbHMuanMnO1xuaW1wb3J0IE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCBmcm9tICcuL1ZhbGlkYXRpb25zL211bHRpcGxlVmFsaWRhdGlvbi5qcyc7XG5pbXBvcnQgRG9tYWluVGVtcGxhdGVzQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zVGVtcGxhdGVzLmpzJztcbmltcG9ydCBEb21haW5UYWdzQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zVGFncy5qcyc7XG5pbXBvcnQgU3ViYWNjb3VudHNDbGllbnQgZnJvbSAnLi9TdWJhY2NvdW50cy5qcyc7XG5pbXBvcnQgU2VlZHNMaXN0c0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQuanMnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9pbmJveFBsYWNlbWVudHMuanMnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LmpzJztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL0F0dHJpYnV0ZXNDbGllbnQuanMnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvRmlsdGVyc0NsaWVudC5qcyc7XG5pbXBvcnQgSVBSU2hhcmluZ0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50LmpzJztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvcHJvdmlkZXJzL0luYm94UGxhY2VtZW50c1Byb3ZpZGVycy5qcyc7XG5pbXBvcnQgTWV0cmljc0NsaWVudCBmcm9tICcuL01ldHJpY3MvTWV0cmljc0NsaWVudC5qcyc7XG5pbXBvcnQgRG9tYWluVHJhY2tpbmdDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUcmFja2luZy5qcyc7XG52YXIgTWFpbGd1bkNsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWlsZ3VuQ2xpZW50KG9wdGlvbnMsIGZvcm1EYXRhKSB7XG4gICAgICAgIHZhciBjb25maWcgPSBfX2Fzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgICAgIGlmICghY29uZmlnLnVybCkge1xuICAgICAgICAgICAgY29uZmlnLnVybCA9ICdodHRwczovL2FwaS5tYWlsZ3VuLm5ldCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25maWcudXNlcm5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwidXNlcm5hbWVcIiBpcyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uZmlnLmtleSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJrZXlcIiBpcyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gbmV3IFJlcXVlc3QoY29uZmlnLCBmb3JtRGF0YSk7XG4gICAgICAgIHZhciBtYWlsTGlzdHNNZW1iZXJzID0gbmV3IE1haWxMaXN0c01lbWJlcnModGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdmFyIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50ID0gbmV3IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHZhciBkb21haW5UZW1wbGF0ZXNDbGllbnQgPSBuZXcgRG9tYWluVGVtcGxhdGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHZhciBkb21haW5UYWdzQ2xpZW50ID0gbmV3IERvbWFpblRhZ3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdmFyIGRvbWFpblRyYWNraW5nQ2xpZW50ID0gbmV3IERvbWFpblRyYWNraW5nQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHZhciBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgPSBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHZhciBJbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudCA9IG5ldyBJUFJTaGFyaW5nQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHZhciBzZWVkc0xpc3RzQXR0cmlidXRlcyA9IG5ldyBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9zZWVkbGlzdHMvYScpO1xuICAgICAgICB2YXIgcmVzdWx0c0F0dHJpYnV0ZXNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvcmVzdWx0cy9hJyk7XG4gICAgICAgIHZhciBzZWVkc0xpc3RzRmlsdGVyc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9zZWVkbGlzdHMvX2ZpbHRlcnMnKTtcbiAgICAgICAgdmFyIHJlc3VsdHNGaWx0ZXJzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3Jlc3VsdHMvX2ZpbHRlcnMnKTtcbiAgICAgICAgdmFyIHNlZWRzTGlzdHNDbGllbnQgPSBuZXcgU2VlZHNMaXN0c0NsaWVudCh0aGlzLnJlcXVlc3QsIHNlZWRzTGlzdHNBdHRyaWJ1dGVzLCBzZWVkc0xpc3RzRmlsdGVyc0NsaWVudCk7XG4gICAgICAgIHZhciBpbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQodGhpcy5yZXF1ZXN0LCByZXN1bHRzQXR0cmlidXRlc0NsaWVudCwgcmVzdWx0c0ZpbHRlcnNDbGllbnQsIEluYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50KTtcbiAgICAgICAgdmFyIGluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5kb21haW5zID0gbmV3IERvbWFpbnNDbGllbnQodGhpcy5yZXF1ZXN0LCBkb21haW5DcmVkZW50aWFsc0NsaWVudCwgZG9tYWluVGVtcGxhdGVzQ2xpZW50LCBkb21haW5UYWdzQ2xpZW50LCBkb21haW5UcmFja2luZ0NsaWVudCk7XG4gICAgICAgIHRoaXMud2ViaG9va3MgPSBuZXcgV2ViaG9va3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0c0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLm1ldHJpY3MgPSBuZXcgTWV0cmljc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLnN1cHByZXNzaW9ucyA9IG5ldyBTdXBwcmVzc2lvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gbmV3IE1lc3NhZ2VzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMucm91dGVzID0gbmV3IFJvdXRlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLmlwcyA9IG5ldyBJcHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5pcF9wb29scyA9IG5ldyBJcFBvb2xzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMubGlzdHMgPSBuZXcgTWFpbGluZ0xpc3RzQ2xpZW50KHRoaXMucmVxdWVzdCwgbWFpbExpc3RzTWVtYmVycyk7XG4gICAgICAgIHRoaXMudmFsaWRhdGUgPSBuZXcgVmFsaWRhdGVDbGllbnQodGhpcy5yZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpO1xuICAgICAgICB0aGlzLnN1YmFjY291bnRzID0gbmV3IFN1YmFjY291bnRzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMuaW5ib3hQbGFjZW1lbnRzID0gbmV3IEluYm94UGxhY2VtZW50c0NsaWVudCh0aGlzLnJlcXVlc3QsIHNlZWRzTGlzdHNDbGllbnQsIGluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQsIGluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCk7XG4gICAgfVxuICAgIE1haWxndW5DbGllbnQucHJvdG90eXBlLnNldFN1YmFjY291bnQgPSBmdW5jdGlvbiAoc3ViYWNjb3VudElkKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5yZXF1ZXN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0U3ViYWNjb3VudEhlYWRlcihzdWJhY2NvdW50SWQpO1xuICAgIH07XG4gICAgTWFpbGd1bkNsaWVudC5wcm90b3R5cGUucmVzZXRTdWJhY2NvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIChfYSA9IHRoaXMucmVxdWVzdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlc2V0U3ViYWNjb3VudEhlYWRlcigpO1xuICAgIH07XG4gICAgcmV0dXJuIE1haWxndW5DbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgTWFpbGd1bkNsaWVudDtcbiIsImltcG9ydCBNYWlsZ3VuQ2xpZW50IGZyb20gJy4vQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50LmpzJztcbnZhciBNYWlsZ3VuID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haWxndW4oRm9ybURhdGEpIHtcbiAgICAgICAgdGhpcy5mb3JtRGF0YSA9IEZvcm1EYXRhO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWFpbGd1biwgXCJkZWZhdWx0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgTWFpbGd1bi5wcm90b3R5cGUuY2xpZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYWlsZ3VuQ2xpZW50KG9wdGlvbnMsIHRoaXMuZm9ybURhdGEpO1xuICAgIH07XG4gICAgcmV0dXJuIE1haWxndW47XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgTWFpbGd1bjtcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJ0aGlzIiwiQXhpb3NFcnJvciIsInV0aWxzIiwicHJvdG90eXBlIiwidG9Gb3JtRGF0YSIsImVuY29kZSIsIlVSTFNlYXJjaFBhcmFtcyIsIkZvcm1EYXRhIiwiQmxvYiIsInBsYXRmb3JtIiwiQXhpb3NIZWFkZXJzIiwiaXNDYW5jZWwiLCJDYW5jZWxlZEVycm9yIiwibWVyZ2VDb25maWciLCJWRVJTSU9OIiwidmFsaWRhdG9ycyIsIkF4aW9zIiwic3ByZWFkIiwiaXNBeGlvc0Vycm9yIiwiSHR0cFN0YXR1c0NvZGUiLCJDYW5jZWxUb2tlbiIsIlJlcXVlc3QiLCJiYXNlNjQuZW5jb2RlIl0sIm1hcHBpbmdzIjoiOzs7SUFBQTtJQUNBO0FBQ0E7SUFDQTtJQUNBO0FBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7QUFDQTtJQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztJQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7SUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2hDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUk7SUFDN0MsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDO0lBQ2xHLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekYsQ0FBQztBQUNEO0lBQ08sSUFBSSxRQUFRLEdBQUcsV0FBVztJQUNqQyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFNBQVMsUUFBUSxDQUFDLENBQUMsRUFBRTtJQUNyRCxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzdELFlBQVksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixZQUFZLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLFNBQVM7SUFDVCxRQUFRLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLE1BQUs7SUFDTCxJQUFJLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0MsRUFBQztBQXlFRDtJQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtJQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtJQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7SUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDOUUsS0FBSyxDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0Q7SUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssVUFBVSxHQUFHLFFBQVEsR0FBRyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDck0sSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hLLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7SUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDdEUsUUFBUSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSTtJQUN0RCxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtJQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0lBQ2pFLGdCQUFnQjtJQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtJQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtJQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFD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LENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxZQUFZO0lBQzFELFFBQVEsSUFBSSxFQUFFO0lBQ2QsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxNQUFNLElBQUksSUFBSSxFQUFFLEtBQUssU0FBTSxHQUFHLFNBQU0sR0FBRyxFQUFFLENBQUMscUJBQXFCLEVBQUU7SUFDM0YsS0FBSztJQUNMLElBQUksT0FBTyxhQUFhO0lBQ3hCLENBQUMsRUFBRSxDQUFDOztBQ2hGRCxRQUFDLE9BQU8sa0JBQWtCLFlBQVk7SUFDekMsSUFBSSxTQUFTLE9BQU8sQ0FBQyxRQUFRLEVBQUU7SUFDL0IsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVE7SUFDaEM7SUFDQSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtJQUM5QyxRQUFRLEdBQUcsRUFBRSxZQUFZLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRTtJQUN6QyxRQUFRLFVBQVUsRUFBRSxLQUFLO0lBQ3pCLFFBQVEsWUFBWSxFQUFFO0lBQ3RCLEtBQUssQ0FBQztJQUNOLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsVUFBVSxPQUFPLEVBQUU7SUFDbEQsUUFBUSxPQUFPLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3hELEtBQUs7SUFDTCxJQUFJLE9BQU8sT0FBTztJQUNsQixDQUFDLEVBQUU7Ozs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4LDQ5LDUwLDUxLDUyXX0=
