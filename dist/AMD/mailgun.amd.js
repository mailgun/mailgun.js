// mailgun.js v12.0.0 Copyright (c) 2025 Mailgun and contributors
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
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
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
            var status = _a.status, statusText = _a.statusText, message = _a.message, _b = _a.body, body = _b === void 0 ? {} : _b;
            var _this = this;
            var bodyMessage = '';
            var error = '';
            if (typeof body === 'string') {
                bodyMessage = body;
            }
            else {
                bodyMessage = (body === null || body === void 0 ? void 0 : body.message) || '';
                error = (body === null || body === void 0 ? void 0 : body.error) || '';
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
            this.proxy = options === null || options === void 0 ? void 0 : options.proxy;
        }
        Request.prototype.request = function (method, url, onCallOptions) {
            return __awaiter(this, void 0, void 0, function () {
                var options, requestHeaders, params, body, response, urlValue, err_1, errorResponse, res;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            options = __assign({}, onCallOptions);
                            options === null || options === void 0 ? true : delete options.headers;
                            requestHeaders = this.joinAndTransformHeaders(onCallOptions);
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
                                status: ((_a = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.response) === null || _a === void 0 ? void 0 : _a.status) || 400,
                                statusText: ((_b = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.response) === null || _b === void 0 ? void 0 : _b.statusText) || errorResponse.code,
                                body: ((_c = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.response) === null || _c === void 0 ? void 0 : _c.data) || errorResponse.message
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
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    res = {
                        body: {},
                        status: response === null || response === void 0 ? void 0 : response.status
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
            if (headersObject === void 0) { headersObject = {}; }
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
            if (addDefaultHeaders === void 0) { addDefaultHeaders = true; }
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
            if (logger === void 0) { logger = console; }
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
                'h:extended': (_a = query === null || query === void 0 ? void 0 : query.extended) !== null && _a !== void 0 ? _a : false,
                'h:with_dns': (_b = query === null || query === void 0 ? void 0 : query.with_dns) !== null && _b !== void 0 ? _b : true,
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
                .then(function (response) { var _a; return (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.items; });
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
            return __awaiter(this, void 0, void 0, function () {
                var res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.request.put("/v3/domains/".concat(domain, "/dkim_selector"), {}, { query: "dkim_selector=".concat(data.dkimSelector) })];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, {
                                    status: res.status,
                                    message: (_a = res === null || res === void 0 ? void 0 : res.body) === null || _a === void 0 ? void 0 : _a.message
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
            return __awaiter(this, void 0, void 0, function () {
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
            if (logger === void 0) { logger = console; }
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
            data.items = ((_a = response.body.items) === null || _a === void 0 ? void 0 : _a.map(function (item) { return new Model(item); })) || [];
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
            if (data === null || data === void 0 ? void 0 : data.tags) {
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
            return __awaiter(this, void 0, void 0, function () {
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
                var webhookResponse = (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.webhook;
                var url = webhookResponse === null || webhookResponse === void 0 ? void 0 : webhookResponse.url;
                var urls = webhookResponse === null || webhookResponse === void 0 ? void 0 : webhookResponse.urls;
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
            if (test === void 0) { test = false; }
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __assign({ status: response.status }, response === null || response === void 0 ? void 0 : response.body);
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            if (logger === void 0) { logger = console; }
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
            data.items = (_a = response.body.items) === null || _a === void 0 ? void 0 : _a.map(function (item) { return _this.prepareSeedList(item); });
            data.pages = this.parsePageLinks(response, '?', 'address');
            data.status = response.status;
            return data;
        };
        SeedsListsClient.prototype.list = function (query) {
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            if (logger === void 0) { logger = console; }
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            if (logger === void 0) { logger = console; }
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
                var qStart = query === null || query === void 0 ? void 0 : query.start;
                var qEnd = query === null || query === void 0 ? void 0 : query.end;
                startDate = qStart instanceof Date ? this.convertDateToUTC('start', qStart) : qStart !== null && qStart !== void 0 ? qStart : '';
                endDate = qEnd && qEnd instanceof Date ? this.convertDateToUTC('end', qEnd) : qEnd !== null && qEnd !== void 0 ? qEnd : '';
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
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
            return __awaiter(this, void 0, void 0, function () {
                var preparedData, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            preparedData = __assign({}, data);
                            if (typeof (data === null || data === void 0 ? void 0 : data.active) === 'boolean') {
                                preparedData.active = (data === null || data === void 0 ? void 0 : data.active) ? 'yes' : 'no';
                            }
                            if (this._isOpenTrackingInfoWitPlace(data)) {
                                if (typeof (data === null || data === void 0 ? void 0 : data.place_at_the_top) === 'boolean') {
                                    preparedData.place_at_the_top = (data === null || data === void 0 ? void 0 : data.place_at_the_top) ? 'yes' : 'no';
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
            (_a = this.request) === null || _a === void 0 ? void 0 : _a.setSubaccountHeader(subaccountId);
        };
        MailgunClient.prototype.resetSubaccount = function () {
            var _a;
            (_a = this.request) === null || _a === void 0 ? void 0 : _a.resetSubaccountHeader();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbGd1bi5hbWQuanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zRXJyb3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b0Zvcm1EYXRhLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvRm9ybURhdGEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9CbG9iLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9jb21tb24vdXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvc0hlYWRlcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcGVlZG9tZXRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90aHJvdHRsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9mZXRjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMvYWRhcHRlcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9lbnYvZGF0YS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy92YWxpZGF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIi4uLy4uL2xpYi9DbGFzc2VzL2NvbW1vbi9FcnJvci50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL2NvbW1vbi9BdHRhY2htZW50c0hhbmRsZXIudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9jb21tb24vRm9ybURhdGFCdWlsZGVyLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3ViYWNjb3VudHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9jb21tb24vUmVxdWVzdC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9FdmVudHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdGF0cy9TdGF0c0NvbnRhaW5lci50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1N0YXRzL1N0YXRzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0VudW1zL2luZGV4LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL0JvdW5jZS50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9Db21wbGFpbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvVW5zdWJzY3JpYmUudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvV2hpdGVMaXN0LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uc0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1dlYmhvb2tzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvTWVzc2FnZXMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9Sb3V0ZXMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9WYWxpZGF0aW9ucy92YWxpZGF0ZS50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0lQcy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0lQUG9vbHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc0NyZWRlbnRpYWxzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVGVtcGxhdGVzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVGFncy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvaW5ib3hQbGFjZW1lbnRzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9BdHRyaWJ1dGVzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL0ZpbHRlcnNDbGllbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvTWV0cmljcy9NZXRyaWNzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVHJhY2tpbmcudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50LnRzIiwiLi4vLi4vbGliL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcclxuICAgIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG52YXIgb3duS2V5cyA9IGZ1bmN0aW9uKG8pIHtcclxuICAgIG93bktleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiAobykge1xyXG4gICAgICAgIHZhciBhciA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGsgaW4gbykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSkgYXJbYXIubGVuZ3RoXSA9IGs7XHJcbiAgICAgICAgcmV0dXJuIGFyO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBvd25LZXlzKG8pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgPSBvd25LZXlzKG1vZCksIGkgPSAwOyBpIDwgay5sZW5ndGg7IGkrKykgaWYgKGtbaV0gIT09IFwiZGVmYXVsdFwiKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGtbaV0pO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XHJcbiAgICAgICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xyXG4gICAgICAgIGlmIChhc3luYykge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XHJcbiAgICAgICAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XHJcbiAgICAgICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XHJcbiAgICAgICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuXHJcbn1cclxuXHJcbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XHJcbiAgICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xyXG4gICAgZnVuY3Rpb24gZmFpbChlKSB7XHJcbiAgICAgICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xyXG4gICAgICAgIGVudi5oYXNFcnJvciA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB2YXIgciwgcyA9IDA7XHJcbiAgICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgICAgIHdoaWxlIChyID0gZW52LnN0YWNrLnBvcCgpKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXIuYXN5bmMgJiYgcyA9PT0gMSkgcmV0dXJuIHMgPSAwLCBlbnYuc3RhY2sucHVzaChyKSwgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihuZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgcyB8PSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBmYWlsKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbihwYXRoLCBwcmVzZXJ2ZUpzeCkge1xyXG4gICAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIC9eXFwuXFwuP1xcLy8udGVzdChwYXRoKSkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0c3ggPyBwcmVzZXJ2ZUpzeCA/IFwiLmpzeFwiIDogXCIuanNcIiA6IGQgJiYgKCFleHQgfHwgIWNtKSA/IG0gOiAoZCArIGV4dCArIFwiLlwiICsgY20udG9Mb3dlckNhc2UoKSArIFwianNcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGF0aDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgX19leHRlbmRzOiBfX2V4dGVuZHMsXHJcbiAgICBfX2Fzc2lnbjogX19hc3NpZ24sXHJcbiAgICBfX3Jlc3Q6IF9fcmVzdCxcclxuICAgIF9fZGVjb3JhdGU6IF9fZGVjb3JhdGUsXHJcbiAgICBfX3BhcmFtOiBfX3BhcmFtLFxyXG4gICAgX19lc0RlY29yYXRlOiBfX2VzRGVjb3JhdGUsXHJcbiAgICBfX3J1bkluaXRpYWxpemVyczogX19ydW5Jbml0aWFsaXplcnMsXHJcbiAgICBfX3Byb3BLZXk6IF9fcHJvcEtleSxcclxuICAgIF9fc2V0RnVuY3Rpb25OYW1lOiBfX3NldEZ1bmN0aW9uTmFtZSxcclxuICAgIF9fbWV0YWRhdGE6IF9fbWV0YWRhdGEsXHJcbiAgICBfX2F3YWl0ZXI6IF9fYXdhaXRlcixcclxuICAgIF9fZ2VuZXJhdG9yOiBfX2dlbmVyYXRvcixcclxuICAgIF9fY3JlYXRlQmluZGluZzogX19jcmVhdGVCaW5kaW5nLFxyXG4gICAgX19leHBvcnRTdGFyOiBfX2V4cG9ydFN0YXIsXHJcbiAgICBfX3ZhbHVlczogX192YWx1ZXMsXHJcbiAgICBfX3JlYWQ6IF9fcmVhZCxcclxuICAgIF9fc3ByZWFkOiBfX3NwcmVhZCxcclxuICAgIF9fc3ByZWFkQXJyYXlzOiBfX3NwcmVhZEFycmF5cyxcclxuICAgIF9fc3ByZWFkQXJyYXk6IF9fc3ByZWFkQXJyYXksXHJcbiAgICBfX2F3YWl0OiBfX2F3YWl0LFxyXG4gICAgX19hc3luY0dlbmVyYXRvcjogX19hc3luY0dlbmVyYXRvcixcclxuICAgIF9fYXN5bmNEZWxlZ2F0b3I6IF9fYXN5bmNEZWxlZ2F0b3IsXHJcbiAgICBfX2FzeW5jVmFsdWVzOiBfX2FzeW5jVmFsdWVzLFxyXG4gICAgX19tYWtlVGVtcGxhdGVPYmplY3Q6IF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxyXG4gICAgX19pbXBvcnRTdGFyOiBfX2ltcG9ydFN0YXIsXHJcbiAgICBfX2ltcG9ydERlZmF1bHQ6IF9faW1wb3J0RGVmYXVsdCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRHZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEluOiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXHJcbiAgICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZTogX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXHJcbiAgICBfX2Rpc3Bvc2VSZXNvdXJjZXM6IF9fZGlzcG9zZVJlc291cmNlcyxcclxuICAgIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uOiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbixcclxufTtcclxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9iYXNlNjQgdjEuMC4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMS4wLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiKGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pO1xuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG59KSgndXJsam9pbicsIHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBub3JtYWxpemUgKHN0ckFycmF5KSB7XG4gICAgdmFyIHJlc3VsdEFycmF5ID0gW107XG4gICAgaWYgKHN0ckFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cblxuICAgIGlmICh0eXBlb2Ygc3RyQXJyYXlbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIHN0ckFycmF5WzBdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZmlyc3QgcGFydCBpcyBhIHBsYWluIHByb3RvY29sLCB3ZSBjb21iaW5lIGl0IHdpdGggdGhlIG5leHQgcGFydC5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15bXi86XSs6XFwvKiQvKSAmJiBzdHJBcnJheS5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgZmlyc3QgPSBzdHJBcnJheS5zaGlmdCgpO1xuICAgICAgc3RyQXJyYXlbMF0gPSBmaXJzdCArIHN0ckFycmF5WzBdO1xuICAgIH1cblxuICAgIC8vIFRoZXJlIG11c3QgYmUgdHdvIG9yIHRocmVlIHNsYXNoZXMgaW4gdGhlIGZpbGUgcHJvdG9jb2wsIHR3byBzbGFzaGVzIGluIGFueXRoaW5nIGVsc2UuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eZmlsZTpcXC9cXC9cXC8vKSkge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLycpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBzdHJBcnJheVtpXTtcblxuICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgY29tcG9uZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvbmVudCA9PT0gJycpIHsgY29udGludWU7IH1cblxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBzdGFydGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGZpcnN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvXltcXC9dKy8sICcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgc3RyQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgZW5kaW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgbGFzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3IgdGhlIGxhc3QgY29tcG9uZW50IHdlIHdpbGwgY29tYmluZSBtdWx0aXBsZSBzbGFzaGVzIHRvIGEgc2luZ2xlIG9uZS5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnLycpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRBcnJheS5wdXNoKGNvbXBvbmVudCk7XG5cbiAgICB9XG5cbiAgICB2YXIgc3RyID0gcmVzdWx0QXJyYXkuam9pbignLycpO1xuICAgIC8vIEVhY2ggaW5wdXQgY29tcG9uZW50IGlzIG5vdyBzZXBhcmF0ZWQgYnkgYSBzaW5nbGUgc2xhc2ggZXhjZXB0IHRoZSBwb3NzaWJsZSBmaXJzdCBwbGFpbiBwcm90b2NvbCBwYXJ0LlxuXG4gICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGJlZm9yZSBwYXJhbWV0ZXJzIG9yIGhhc2hcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFwvKFxcP3wmfCNbXiFdKS9nLCAnJDEnKTtcblxuICAgIC8vIHJlcGxhY2UgPyBpbiBwYXJhbWV0ZXJzIHdpdGggJlxuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnPycpO1xuICAgIHN0ciA9IHBhcnRzLnNoaWZ0KCkgKyAocGFydHMubGVuZ3RoID4gMCA/ICc/JzogJycpICsgcGFydHMuam9pbignJicpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlucHV0O1xuXG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpbnB1dCA9IGFyZ3VtZW50c1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShpbnB1dCk7XG4gIH07XG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbmNvbnN0IHt0b1N0cmluZ30gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3Qge2dldFByb3RvdHlwZU9mfSA9IE9iamVjdDtcblxuY29uc3Qga2luZE9mID0gKGNhY2hlID0+IHRoaW5nID0+IHtcbiAgICBjb25zdCBzdHIgPSB0b1N0cmluZy5jYWxsKHRoaW5nKTtcbiAgICByZXR1cm4gY2FjaGVbc3RyXSB8fCAoY2FjaGVbc3RyXSA9IHN0ci5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKSk7XG59KShPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuY29uc3Qga2luZE9mVGVzdCA9ICh0eXBlKSA9PiB7XG4gIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAodGhpbmcpID0+IGtpbmRPZih0aGluZykgPT09IHR5cGVcbn1cblxuY29uc3QgdHlwZU9mVGVzdCA9IHR5cGUgPT4gdGhpbmcgPT4gdHlwZW9mIHRoaW5nID09PSB0eXBlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3Qge2lzQXJyYXl9ID0gQXJyYXk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVbmRlZmluZWQgPSB0eXBlT2ZUZXN0KCd1bmRlZmluZWQnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiBpc0Z1bmN0aW9uKHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcikgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICBsZXQgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmIChpc0FycmF5QnVmZmVyKHZhbC5idWZmZXIpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyaW5nID0gdHlwZU9mVGVzdCgnc3RyaW5nJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVPZlRlc3QoJ2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNOdW1iZXIgPSB0eXBlT2ZUZXN0KCdudW1iZXInKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAodGhpbmcpID0+IHRoaW5nICE9PSBudWxsICYmIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCb29sZWFuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCb29sZWFuLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCb29sZWFuID0gdGhpbmcgPT4gdGhpbmcgPT09IHRydWUgfHwgdGhpbmcgPT09IGZhbHNlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB7XG4gIGlmIChraW5kT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gKHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSkgPT09IG51bGwpICYmICEoU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbCkgJiYgIShTeW1ib2wuaXRlcmF0b3IgaW4gdmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRGF0ZSA9IGtpbmRPZlRlc3QoJ0RhdGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZSA9IGtpbmRPZlRlc3QoJ0ZpbGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGVMaXN0ID0ga2luZE9mVGVzdCgnRmlsZUxpc3QnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmVhbSA9ICh2YWwpID0+IGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRm9ybURhdGEgPSAodGhpbmcpID0+IHtcbiAgbGV0IGtpbmQ7XG4gIHJldHVybiB0aGluZyAmJiAoXG4gICAgKHR5cGVvZiBGb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGluZyBpbnN0YW5jZW9mIEZvcm1EYXRhKSB8fCAoXG4gICAgICBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiYgKFxuICAgICAgICAoa2luZCA9IGtpbmRPZih0aGluZykpID09PSAnZm9ybWRhdGEnIHx8XG4gICAgICAgIC8vIGRldGVjdCBmb3JtLWRhdGEgaW5zdGFuY2VcbiAgICAgICAgKGtpbmQgPT09ICdvYmplY3QnICYmIGlzRnVuY3Rpb24odGhpbmcudG9TdHJpbmcpICYmIHRoaW5nLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IEZvcm1EYXRhXScpXG4gICAgICApXG4gICAgKVxuICApXG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VSTFNlYXJjaFBhcmFtcyA9IGtpbmRPZlRlc3QoJ1VSTFNlYXJjaFBhcmFtcycpO1xuXG5jb25zdCBbaXNSZWFkYWJsZVN0cmVhbSwgaXNSZXF1ZXN0LCBpc1Jlc3BvbnNlLCBpc0hlYWRlcnNdID0gWydSZWFkYWJsZVN0cmVhbScsICdSZXF1ZXN0JywgJ1Jlc3BvbnNlJywgJ0hlYWRlcnMnXS5tYXAoa2luZE9mVGVzdCk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmNvbnN0IHRyaW0gPSAoc3RyKSA9PiBzdHIudHJpbSA/XG4gIHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FsbE93bktleXMgPSBmYWxzZV1cbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbiwge2FsbE93bktleXMgPSBmYWxzZX0gPSB7fSkge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBpO1xuICBsZXQgbDtcblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAoaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgY29uc3Qga2V5cyA9IGFsbE93bktleXMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopIDogT2JqZWN0LmtleXMob2JqKTtcbiAgICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQga2V5O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kS2V5KG9iaiwga2V5KSB7XG4gIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgbGV0IF9rZXk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgX2tleSA9IGtleXNbaV07XG4gICAgaWYgKGtleSA9PT0gX2tleS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gX2tleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IF9nbG9iYWwgPSAoKCkgPT4ge1xuICAvKmVzbGludCBuby11bmRlZjowKi9cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZ2xvYmFsVGhpcztcbiAgcmV0dXJuIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbClcbn0pKCk7XG5cbmNvbnN0IGlzQ29udGV4dERlZmluZWQgPSAoY29udGV4dCkgPT4gIWlzVW5kZWZpbmVkKGNvbnRleHQpICYmIGNvbnRleHQgIT09IF9nbG9iYWw7XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgY29uc3Qge2Nhc2VsZXNzfSA9IGlzQ29udGV4dERlZmluZWQodGhpcykgJiYgdGhpcyB8fCB7fTtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGNvbnN0IGFzc2lnblZhbHVlID0gKHZhbCwga2V5KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0S2V5ID0gY2FzZWxlc3MgJiYgZmluZEtleShyZXN1bHQsIGtleSkgfHwga2V5O1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFt0YXJnZXRLZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2UocmVzdWx0W3RhcmdldEtleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGFyZ3VtZW50c1tpXSAmJiBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzXVxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5jb25zdCBleHRlbmQgPSAoYSwgYiwgdGhpc0FyZywge2FsbE93bktleXN9PSB7fSkgPT4ge1xuICBmb3JFYWNoKGIsICh2YWwsIGtleSkgPT4ge1xuICAgIGlmICh0aGlzQXJnICYmIGlzRnVuY3Rpb24odmFsKSkge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9LCB7YWxsT3duS2V5c30pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuY29uc3Qgc3RyaXBCT00gPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn1cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXVxuICogQHBhcmFtIHtvYmplY3R9IFtkZXNjcmlwdG9yc11cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgaW5oZXJpdHMgPSAoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykgPT4ge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IsICdzdXBlcicsIHtcbiAgICB2YWx1ZTogc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGVcbiAgfSk7XG4gIHByb3BzICYmIE9iamVjdC5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm9wcyk7XG59XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3RyaW5nIGVuZHMgd2l0aCB0aGUgY2hhcmFjdGVycyBvZiBhIHNwZWNpZmllZCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gW3Bvc2l0aW9uPSAwXVxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBlbmRzV2l0aCA9IChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pID0+IHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICBjb25zdCBsYXN0SW5kZXggPSBzdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3NpdGlvbjtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqXG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqXG4gKiBAcmV0dXJucyB7P0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICBpZiAoaXNBcnJheSh0aGluZykpIHJldHVybiB0aGluZztcbiAgbGV0IGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmICghaXNOdW1iZXIoaSkpIHJldHVybiBudWxsO1xuICBjb25zdCBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLyoqXG4gKiBDaGVja2luZyBpZiB0aGUgVWludDhBcnJheSBleGlzdHMgYW5kIGlmIGl0IGRvZXMsIGl0IHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGVcbiAqIHRoaW5nIHBhc3NlZCBpbiBpcyBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5XG4gKlxuICogQHBhcmFtIHtUeXBlZEFycmF5fVxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmNvbnN0IGlzVHlwZWRBcnJheSA9IChUeXBlZEFycmF5ID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuIHRoaW5nID0+IHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2V0UHJvdG90eXBlT2YoVWludDhBcnJheSkpO1xuXG4vKipcbiAqIEZvciBlYWNoIGVudHJ5IGluIHRoZSBvYmplY3QsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGtleSBhbmQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggZW50cnkuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGZvckVhY2hFbnRyeSA9IChvYmosIGZuKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRvciA9IG9iaiAmJiBvYmpbU3ltYm9sLml0ZXJhdG9yXTtcblxuICBjb25zdCBpdGVyYXRvciA9IGdlbmVyYXRvci5jYWxsKG9iaik7XG5cbiAgbGV0IHJlc3VsdDtcblxuICB3aGlsZSAoKHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG4gICAgY29uc3QgcGFpciA9IHJlc3VsdC52YWx1ZTtcbiAgICBmbi5jYWxsKG9iaiwgcGFpclswXSwgcGFpclsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhbmQgYSBzdHJpbmcsIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIGFsbCB0aGUgbWF0Y2hlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWdFeHAgLSBUaGUgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIGFnYWluc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBzZWFyY2guXG4gKlxuICogQHJldHVybnMge0FycmF5PGJvb2xlYW4+fVxuICovXG5jb25zdCBtYXRjaEFsbCA9IChyZWdFeHAsIHN0cikgPT4ge1xuICBsZXQgbWF0Y2hlcztcbiAgY29uc3QgYXJyID0gW107XG5cbiAgd2hpbGUgKChtYXRjaGVzID0gcmVnRXhwLmV4ZWMoc3RyKSkgIT09IG51bGwpIHtcbiAgICBhcnIucHVzaChtYXRjaGVzKTtcbiAgfVxuXG4gIHJldHVybiBhcnI7XG59XG5cbi8qIENoZWNraW5nIGlmIHRoZSBraW5kT2ZUZXN0IGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB3aGVuIHBhc3NlZCBhbiBIVE1MRm9ybUVsZW1lbnQuICovXG5jb25zdCBpc0hUTUxGb3JtID0ga2luZE9mVGVzdCgnSFRNTEZvcm1FbGVtZW50Jyk7XG5cbmNvbnN0IHRvQ2FtZWxDYXNlID0gc3RyID0+IHtcbiAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1stX1xcc10oW2EtelxcZF0pKFxcdyopL2csXG4gICAgZnVuY3Rpb24gcmVwbGFjZXIobSwgcDEsIHAyKSB7XG4gICAgICByZXR1cm4gcDEudG9VcHBlckNhc2UoKSArIHAyO1xuICAgIH1cbiAgKTtcbn07XG5cbi8qIENyZWF0aW5nIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBwcm9wZXJ0eS4gKi9cbmNvbnN0IGhhc093blByb3BlcnR5ID0gKCh7aGFzT3duUHJvcGVydHl9KSA9PiAob2JqLCBwcm9wKSA9PiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpKE9iamVjdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNSZWdFeHAgPSBraW5kT2ZUZXN0KCdSZWdFeHAnKTtcblxuY29uc3QgcmVkdWNlRGVzY3JpcHRvcnMgPSAob2JqLCByZWR1Y2VyKSA9PiB7XG4gIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKTtcbiAgY29uc3QgcmVkdWNlZERlc2NyaXB0b3JzID0ge307XG5cbiAgZm9yRWFjaChkZXNjcmlwdG9ycywgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICBsZXQgcmV0O1xuICAgIGlmICgocmV0ID0gcmVkdWNlcihkZXNjcmlwdG9yLCBuYW1lLCBvYmopKSAhPT0gZmFsc2UpIHtcbiAgICAgIHJlZHVjZWREZXNjcmlwdG9yc1tuYW1lXSA9IHJldCB8fCBkZXNjcmlwdG9yO1xuICAgIH1cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMob2JqLCByZWR1Y2VkRGVzY3JpcHRvcnMpO1xufVxuXG4vKipcbiAqIE1ha2VzIGFsbCBtZXRob2RzIHJlYWQtb25seVxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICovXG5cbmNvbnN0IGZyZWV6ZU1ldGhvZHMgPSAob2JqKSA9PiB7XG4gIHJlZHVjZURlc2NyaXB0b3JzKG9iaiwgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICAvLyBza2lwIHJlc3RyaWN0ZWQgcHJvcHMgaW4gc3RyaWN0IG1vZGVcbiAgICBpZiAoaXNGdW5jdGlvbihvYmopICYmIFsnYXJndW1lbnRzJywgJ2NhbGxlcicsICdjYWxsZWUnXS5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gb2JqW25hbWVdO1xuXG4gICAgaWYgKCFpc0Z1bmN0aW9uKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZmFsc2U7XG5cbiAgICBpZiAoJ3dyaXRhYmxlJyBpbiBkZXNjcmlwdG9yKSB7XG4gICAgICBkZXNjcmlwdG9yLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFkZXNjcmlwdG9yLnNldCkge1xuICAgICAgZGVzY3JpcHRvci5zZXQgPSAoKSA9PiB7XG4gICAgICAgIHRocm93IEVycm9yKCdDYW4gbm90IHJld3JpdGUgcmVhZC1vbmx5IG1ldGhvZCBcXCcnICsgbmFtZSArICdcXCcnKTtcbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3QgdG9PYmplY3RTZXQgPSAoYXJyYXlPclN0cmluZywgZGVsaW1pdGVyKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuXG4gIGNvbnN0IGRlZmluZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBvYmpbdmFsdWVdID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzQXJyYXkoYXJyYXlPclN0cmluZykgPyBkZWZpbmUoYXJyYXlPclN0cmluZykgOiBkZWZpbmUoU3RyaW5nKGFycmF5T3JTdHJpbmcpLnNwbGl0KGRlbGltaXRlcikpO1xuXG4gIHJldHVybiBvYmo7XG59XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fVxuXG5jb25zdCB0b0Zpbml0ZU51bWJlciA9ICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSA9PiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSA9ICt2YWx1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbn1cblxuY29uc3QgQUxQSEEgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonXG5cbmNvbnN0IERJR0lUID0gJzAxMjM0NTY3ODknO1xuXG5jb25zdCBBTFBIQUJFVCA9IHtcbiAgRElHSVQsXG4gIEFMUEhBLFxuICBBTFBIQV9ESUdJVDogQUxQSEEgKyBBTFBIQS50b1VwcGVyQ2FzZSgpICsgRElHSVRcbn1cblxuY29uc3QgZ2VuZXJhdGVTdHJpbmcgPSAoc2l6ZSA9IDE2LCBhbHBoYWJldCA9IEFMUEhBQkVULkFMUEhBX0RJR0lUKSA9PiB7XG4gIGxldCBzdHIgPSAnJztcbiAgY29uc3Qge2xlbmd0aH0gPSBhbHBoYWJldDtcbiAgd2hpbGUgKHNpemUtLSkge1xuICAgIHN0ciArPSBhbHBoYWJldFtNYXRoLnJhbmRvbSgpICogbGVuZ3RofDBdXG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEodGhpbmcgJiYgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIHRoaW5nW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdGb3JtRGF0YScgJiYgdGhpbmdbU3ltYm9sLml0ZXJhdG9yXSk7XG59XG5cbmNvbnN0IHRvSlNPTk9iamVjdCA9IChvYmopID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgQXJyYXkoMTApO1xuXG4gIGNvbnN0IHZpc2l0ID0gKHNvdXJjZSwgaSkgPT4ge1xuXG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKHNvdXJjZSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmKCEoJ3RvSlNPTicgaW4gc291cmNlKSkge1xuICAgICAgICBzdGFja1tpXSA9IHNvdXJjZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gaXNBcnJheShzb3VyY2UpID8gW10gOiB7fTtcblxuICAgICAgICBmb3JFYWNoKHNvdXJjZSwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCByZWR1Y2VkVmFsdWUgPSB2aXNpdCh2YWx1ZSwgaSArIDEpO1xuICAgICAgICAgICFpc1VuZGVmaW5lZChyZWR1Y2VkVmFsdWUpICYmICh0YXJnZXRba2V5XSA9IHJlZHVjZWRWYWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0YWNrW2ldID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIHJldHVybiB2aXNpdChvYmosIDApO1xufVxuXG5jb25zdCBpc0FzeW5jRm4gPSBraW5kT2ZUZXN0KCdBc3luY0Z1bmN0aW9uJyk7XG5cbmNvbnN0IGlzVGhlbmFibGUgPSAodGhpbmcpID0+XG4gIHRoaW5nICYmIChpc09iamVjdCh0aGluZykgfHwgaXNGdW5jdGlvbih0aGluZykpICYmIGlzRnVuY3Rpb24odGhpbmcudGhlbikgJiYgaXNGdW5jdGlvbih0aGluZy5jYXRjaCk7XG5cbi8vIG9yaWdpbmFsIGNvZGVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EaWdpdGFsQnJhaW5KUy9BeGlvc1Byb21pc2UvYmxvYi8xNmRlYWIxMzcxMGVjMDk3Nzk5MjIxMzFmM2ZhNTk1NDMyMGY4M2FiL2xpYi91dGlscy5qcyNMMTEtTDM0XG5cbmNvbnN0IF9zZXRJbW1lZGlhdGUgPSAoKHNldEltbWVkaWF0ZVN1cHBvcnRlZCwgcG9zdE1lc3NhZ2VTdXBwb3J0ZWQpID0+IHtcbiAgaWYgKHNldEltbWVkaWF0ZVN1cHBvcnRlZCkge1xuICAgIHJldHVybiBzZXRJbW1lZGlhdGU7XG4gIH1cblxuICByZXR1cm4gcG9zdE1lc3NhZ2VTdXBwb3J0ZWQgPyAoKHRva2VuLCBjYWxsYmFja3MpID0+IHtcbiAgICBfZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsICh7c291cmNlLCBkYXRhfSkgPT4ge1xuICAgICAgaWYgKHNvdXJjZSA9PT0gX2dsb2JhbCAmJiBkYXRhID09PSB0b2tlbikge1xuICAgICAgICBjYWxsYmFja3MubGVuZ3RoICYmIGNhbGxiYWNrcy5zaGlmdCgpKCk7XG4gICAgICB9XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgcmV0dXJuIChjYikgPT4ge1xuICAgICAgY2FsbGJhY2tzLnB1c2goY2IpO1xuICAgICAgX2dsb2JhbC5wb3N0TWVzc2FnZSh0b2tlbiwgXCIqXCIpO1xuICAgIH1cbiAgfSkoYGF4aW9zQCR7TWF0aC5yYW5kb20oKX1gLCBbXSkgOiAoY2IpID0+IHNldFRpbWVvdXQoY2IpO1xufSkoXG4gIHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicsXG4gIGlzRnVuY3Rpb24oX2dsb2JhbC5wb3N0TWVzc2FnZSlcbik7XG5cbmNvbnN0IGFzYXAgPSB0eXBlb2YgcXVldWVNaWNyb3Rhc2sgIT09ICd1bmRlZmluZWQnID9cbiAgcXVldWVNaWNyb3Rhc2suYmluZChfZ2xvYmFsKSA6ICggdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MubmV4dFRpY2sgfHwgX3NldEltbWVkaWF0ZSk7XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKlxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgQUxQSEFCRVQsXG4gIGdlbmVyYXRlU3RyaW5nLFxuICBpc1NwZWNDb21wbGlhbnRGb3JtLFxuICB0b0pTT05PYmplY3QsXG4gIGlzQXN5bmNGbixcbiAgaXNUaGVuYWJsZSxcbiAgc2V0SW1tZWRpYXRlOiBfc2V0SW1tZWRpYXRlLFxuICBhc2FwXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQXhpb3NFcnJvcihtZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIEVycm9yLmNhbGwodGhpcyk7XG5cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2s7XG4gIH1cblxuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLm5hbWUgPSAnQXhpb3NFcnJvcic7XG4gIGNvZGUgJiYgKHRoaXMuY29kZSA9IGNvZGUpO1xuICBjb25maWcgJiYgKHRoaXMuY29uZmlnID0gY29uZmlnKTtcbiAgcmVxdWVzdCAmJiAodGhpcy5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gIGlmIChyZXNwb25zZSkge1xuICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB0aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cyA/IHJlc3BvbnNlLnN0YXR1cyA6IG51bGw7XG4gIH1cbn1cblxudXRpbHMuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdXRpbHMudG9KU09OT2JqZWN0KHRoaXMuY29uZmlnKSxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXNcbiAgICB9O1xuICB9XG59KTtcblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NFcnJvci5wcm90b3R5cGU7XG5jb25zdCBkZXNjcmlwdG9ycyA9IHt9O1xuXG5bXG4gICdFUlJfQkFEX09QVElPTl9WQUxVRScsXG4gICdFUlJfQkFEX09QVElPTicsXG4gICdFQ09OTkFCT1JURUQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VSUl9ORVRXT1JLJyxcbiAgJ0VSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMnLFxuICAnRVJSX0RFUFJFQ0FURUQnLFxuICAnRVJSX0JBRF9SRVNQT05TRScsXG4gICdFUlJfQkFEX1JFUVVFU1QnLFxuICAnRVJSX0NBTkNFTEVEJyxcbiAgJ0VSUl9OT1RfU1VQUE9SVCcsXG4gICdFUlJfSU5WQUxJRF9VUkwnXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXS5mb3JFYWNoKGNvZGUgPT4ge1xuICBkZXNjcmlwdG9yc1tjb2RlXSA9IHt2YWx1ZTogY29kZX07XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQXhpb3NFcnJvciwgZGVzY3JpcHRvcnMpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSwgJ2lzQXhpb3NFcnJvcicsIHt2YWx1ZTogdHJ1ZX0pO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuQXhpb3NFcnJvci5mcm9tID0gKGVycm9yLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlLCBjdXN0b21Qcm9wcykgPT4ge1xuICBjb25zdCBheGlvc0Vycm9yID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xuXG4gIHV0aWxzLnRvRmxhdE9iamVjdChlcnJvciwgYXhpb3NFcnJvciwgZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IEVycm9yLnByb3RvdHlwZTtcbiAgfSwgcHJvcCA9PiB7XG4gICAgcmV0dXJuIHByb3AgIT09ICdpc0F4aW9zRXJyb3InO1xuICB9KTtcblxuICBBeGlvc0Vycm9yLmNhbGwoYXhpb3NFcnJvciwgZXJyb3IubWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG5cbiAgYXhpb3NFcnJvci5jYXVzZSA9IGVycm9yO1xuXG4gIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0Vycm9yO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxuZXhwb3J0IGRlZmF1bHQgbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG4vLyB0ZW1wb3JhcnkgaG90Zml4IHRvIGF2b2lkIGNpcmN1bGFyIHJlZmVyZW5jZXMgdW50aWwgQXhpb3NVUkxTZWFyY2hQYXJhbXMgaXMgcmVmYWN0b3JlZFxuaW1wb3J0IFBsYXRmb3JtRm9ybURhdGEgZnJvbSAnLi4vcGxhdGZvcm0vbm9kZS9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0aGluZyBpcyBhIGFycmF5IG9yIGpzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhpbmcgLSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGJlIHZpc2l0ZWQuXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVmlzaXRhYmxlKHRoaW5nKSB7XG4gIHJldHVybiB1dGlscy5pc1BsYWluT2JqZWN0KHRoaW5nKSB8fCB1dGlscy5pc0FycmF5KHRoaW5nKTtcbn1cblxuLyoqXG4gKiBJdCByZW1vdmVzIHRoZSBicmFja2V0cyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgcGFyYW1ldGVyLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgd2l0aG91dCB0aGUgYnJhY2tldHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xuICByZXR1cm4gdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSA/IGtleS5zbGljZSgwLCAtMikgOiBrZXk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXRoLCBhIGtleSwgYW5kIGEgYm9vbGVhbiwgYW5kIHJldHVybnMgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBjdXJyZW50IG9iamVjdCBiZWluZyBpdGVyYXRlZCBvdmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGRvdHMgLSBJZiB0cnVlLCB0aGUga2V5IHdpbGwgYmUgcmVuZGVyZWQgd2l0aCBkb3RzIGluc3RlYWQgb2YgYnJhY2tldHMuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICovXG5mdW5jdGlvbiByZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSB7XG4gIGlmICghcGF0aCkgcmV0dXJuIGtleTtcbiAgcmV0dXJuIHBhdGguY29uY2F0KGtleSkubWFwKGZ1bmN0aW9uIGVhY2godG9rZW4sIGkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB0b2tlbiA9IHJlbW92ZUJyYWNrZXRzKHRva2VuKTtcbiAgICByZXR1cm4gIWRvdHMgJiYgaSA/ICdbJyArIHRva2VuICsgJ10nIDogdG9rZW47XG4gIH0pLmpvaW4oZG90cyA/ICcuJyA6ICcnKTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgYXJyYXkgaXMgYW4gYXJyYXkgYW5kIG5vbmUgb2YgaXRzIGVsZW1lbnRzIGFyZSB2aXNpdGFibGUsIHRoZW4gaXQncyBhIGZsYXQgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNGbGF0QXJyYXkoYXJyKSB7XG4gIHJldHVybiB1dGlscy5pc0FycmF5KGFycikgJiYgIWFyci5zb21lKGlzVmlzaXRhYmxlKTtcbn1cblxuY29uc3QgcHJlZGljYXRlcyA9IHV0aWxzLnRvRmxhdE9iamVjdCh1dGlscywge30sIG51bGwsIGZ1bmN0aW9uIGZpbHRlcihwcm9wKSB7XG4gIHJldHVybiAvXmlzW0EtWl0vLnRlc3QocHJvcCk7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgZGF0YSBvYmplY3QgdG8gRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEBwYXJhbSB7P09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy52aXNpdG9yXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tZXRhVG9rZW5zID0gdHJ1ZV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZG90cyA9IGZhbHNlXVxuICogQHBhcmFtIHs/Qm9vbGVhbn0gW29wdGlvbnMuaW5kZXhlcyA9IGZhbHNlXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbi8qKlxuICogSXQgY29udmVydHMgYW4gb2JqZWN0IGludG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBmb3JtIGRhdGEuXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgLSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGFwcGVuZCB0by5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSwgb3B0aW9ucykge1xuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXQgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBmb3JtRGF0YSA9IGZvcm1EYXRhIHx8IG5ldyAoUGxhdGZvcm1Gb3JtRGF0YSB8fCBGb3JtRGF0YSkoKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgb3B0aW9ucyA9IHV0aWxzLnRvRmxhdE9iamVjdChvcHRpb25zLCB7XG4gICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBpbmRleGVzOiBmYWxzZVxuICB9LCBmYWxzZSwgZnVuY3Rpb24gZGVmaW5lZChvcHRpb24sIHNvdXJjZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICAgIHJldHVybiAhdXRpbHMuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICB9KTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2I7XG4gIGNvbnN0IHVzZUJsb2IgPSBfQmxvYiAmJiB1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGZvcm1EYXRhKTtcblxuICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VCbG9iICYmIHV0aWxzLmlzQmxvYih2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdCbG9iIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBhIEJ1ZmZlciBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscy5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdXNlQmxvYiAmJiB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBCbG9iKFt2YWx1ZV0pIDogQnVmZmVyLmZyb20odmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZpc2l0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBrZXlcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmd8TnVtYmVyPn0gcGF0aFxuICAgKiBAdGhpcyB7Rm9ybURhdGF9XG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm4gdHJ1ZSB0byB2aXNpdCB0aGUgZWFjaCBwcm9wIG9mIHRoZSB2YWx1ZSByZWN1cnNpdmVseVxuICAgKi9cbiAgZnVuY3Rpb24gZGVmYXVsdFZpc2l0b3IodmFsdWUsIGtleSwgcGF0aCkge1xuICAgIGxldCBhcnIgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSAmJiAhcGF0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAne30nKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gbWV0YVRva2VucyA/IGtleSA6IGtleS5zbGljZSgwLCAtMik7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh1dGlscy5pc0FycmF5KHZhbHVlKSAmJiBpc0ZsYXRBcnJheSh2YWx1ZSkpIHx8XG4gICAgICAgICgodXRpbHMuaXNGaWxlTGlzdCh2YWx1ZSkgfHwgdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSkgJiYgKGFyciA9IHV0aWxzLnRvQXJyYXkodmFsdWUpKVxuICAgICAgICApKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSByZW1vdmVCcmFja2V0cyhrZXkpO1xuXG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIGVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgICAgISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgICAgICAgICAgaW5kZXhlcyA9PT0gdHJ1ZSA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpIDogKGluZGV4ZXMgPT09IG51bGwgPyBrZXkgOiBrZXkgKyAnW10nKSxcbiAgICAgICAgICAgIGNvbnZlcnRWYWx1ZShlbClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkKHZhbHVlLCBwYXRoKSB7XG4gICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGF0aC5qb2luKCcuJykpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgdmlzaXRvci5jYWxsKFxuICAgICAgICBmb3JtRGF0YSwgZWwsIHV0aWxzLmlzU3RyaW5nKGtleSkgPyBrZXkudHJpbSgpIDoga2V5LCBwYXRoLCBleHBvc2VkSGVscGVyc1xuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBidWlsZChlbCwgcGF0aCA/IHBhdGguY29uY2F0KGtleSkgOiBba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdGFjay5wb3AoKTtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIGJ1aWxkKG9iaik7XG5cbiAgcmV0dXJuIGZvcm1EYXRhO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b0Zvcm1EYXRhO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL3RvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIEl0IGVuY29kZXMgYSBzdHJpbmcgYnkgcmVwbGFjaW5nIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBpbiB0aGUgdW5yZXNlcnZlZCBzZXQgd2l0aFxuICogdGhlaXIgcGVyY2VudC1lbmNvZGVkIGVxdWl2YWxlbnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gZW5jb2RlLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHN0cikge1xuICBjb25zdCBjaGFyTWFwID0ge1xuICAgICchJzogJyUyMScsXG4gICAgXCInXCI6ICclMjcnLFxuICAgICcoJzogJyUyOCcsXG4gICAgJyknOiAnJTI5JyxcbiAgICAnfic6ICclN0UnLFxuICAgICclMjAnOiAnKycsXG4gICAgJyUwMCc6ICdcXHgwMCdcbiAgfTtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpfl18JTIwfCUwMC9nLCBmdW5jdGlvbiByZXBsYWNlcihtYXRjaCkge1xuICAgIHJldHVybiBjaGFyTWFwW21hdGNoXTtcbiAgfSk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXJhbXMgb2JqZWN0IGFuZCBjb252ZXJ0cyBpdCB0byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgdG8gYmUgY29udmVydGVkIHRvIGEgRm9ybURhdGEgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZCB0byB0aGUgQXhpb3MgY29uc3RydWN0b3IuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykge1xuICB0aGlzLl9wYWlycyA9IFtdO1xuXG4gIHBhcmFtcyAmJiB0b0Zvcm1EYXRhKHBhcmFtcywgdGhpcywgb3B0aW9ucyk7XG59XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZTtcblxucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICB0aGlzLl9wYWlycy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xufTtcblxucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoZW5jb2Rlcikge1xuICBjb25zdCBfZW5jb2RlID0gZW5jb2RlciA/IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGVuY29kZXIuY2FsbCh0aGlzLCB2YWx1ZSwgZW5jb2RlKTtcbiAgfSA6IGVuY29kZTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnMubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgIHJldHVybiBfZW5jb2RlKHBhaXJbMF0pICsgJz0nICsgX2VuY29kZShwYWlyWzFdKTtcbiAgfSwgJycpLmpvaW4oJyYnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuXG4vKipcbiAqIEl0IHJlcGxhY2VzIGFsbCBpbnN0YW5jZXMgb2YgdGhlIGNoYXJhY3RlcnMgYDpgLCBgJGAsIGAsYCwgYCtgLCBgW2AsIGFuZCBgXWAgd2l0aCB0aGVpclxuICogVVJJIGVuY29kZWQgY291bnRlcnBhcnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCBUaGUgdmFsdWUgdG8gYmUgZW5jb2RlZC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEBwYXJhbSB7PyhvYmplY3R8RnVuY3Rpb24pfSBvcHRpb25zXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICBcbiAgY29uc3QgX2VuY29kZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGlmICh1dGlscy5pc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIHNlcmlhbGl6ZTogb3B0aW9uc1xuICAgIH07XG4gIH0gXG5cbiAgY29uc3Qgc2VyaWFsaXplRm4gPSBvcHRpb25zICYmIG9wdGlvbnMuc2VyaWFsaXplO1xuXG4gIGxldCBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChzZXJpYWxpemVGbikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBzZXJpYWxpemVGbihwYXJhbXMsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSB1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpID9cbiAgICAgIHBhcmFtcy50b1N0cmluZygpIDpcbiAgICAgIG5ldyBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpLnRvU3RyaW5nKF9lbmNvZGUpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICBjb25zdCBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoXCIjXCIpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuY2xhc3MgSW50ZXJjZXB0b3JNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gICAqL1xuICB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCwgb3B0aW9ucykge1xuICAgIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgICBmdWxmaWxsZWQsXG4gICAgICByZWplY3RlZCxcbiAgICAgIHN5bmNocm9ub3VzOiBvcHRpb25zID8gb3B0aW9ucy5zeW5jaHJvbm91cyA6IGZhbHNlLFxuICAgICAgcnVuV2hlbjogb3B0aW9ucyA/IG9wdGlvbnMucnVuV2hlbiA6IG51bGxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGludGVyY2VwdG9yIHdhcyByZW1vdmVkLCBgZmFsc2VgIG90aGVyd2lzZVxuICAgKi9cbiAgZWplY3QoaWQpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYWxsIGludGVyY2VwdG9ycyBmcm9tIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gICAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICAgKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZvckVhY2goZm4pIHtcbiAgICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICAgIGZuKGgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzaWxlbnRKU09OUGFyc2luZzogdHJ1ZSxcbiAgZm9yY2VkSlNPTlBhcnNpbmc6IHRydWUsXG4gIGNsYXJpZnlUaW1lb3V0RXJyb3I6IGZhbHNlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi4vLi4vLi4vaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyA/IFVSTFNlYXJjaFBhcmFtcyA6IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnID8gRm9ybURhdGEgOiBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyA/IEJsb2IgOiBudWxsXG4iLCJpbXBvcnQgVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4vY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMnXG5pbXBvcnQgRm9ybURhdGEgZnJvbSAnLi9jbGFzc2VzL0Zvcm1EYXRhLmpzJ1xuaW1wb3J0IEJsb2IgZnJvbSAnLi9jbGFzc2VzL0Jsb2IuanMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNCcm93c2VyOiB0cnVlLFxuICBjbGFzc2VzOiB7XG4gICAgVVJMU2VhcmNoUGFyYW1zLFxuICAgIEZvcm1EYXRhLFxuICAgIEJsb2JcbiAgfSxcbiAgcHJvdG9jb2xzOiBbJ2h0dHAnLCAnaHR0cHMnLCAnZmlsZScsICdibG9iJywgJ3VybCcsICdkYXRhJ11cbn07XG4iLCJjb25zdCBoYXNCcm93c2VyRW52ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcblxuY29uc3QgX25hdmlnYXRvciA9IHR5cGVvZiBuYXZpZ2F0b3IgPT09ICdvYmplY3QnICYmIG5hdmlnYXRvciB8fCB1bmRlZmluZWQ7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPSBoYXNCcm93c2VyRW52ICYmXG4gICghX25hdmlnYXRvciB8fCBbJ1JlYWN0TmF0aXZlJywgJ05hdGl2ZVNjcmlwdCcsICdOUyddLmluZGV4T2YoX25hdmlnYXRvci5wcm9kdWN0KSA8IDApO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciB3ZWJXb3JrZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBBbHRob3VnaCB0aGUgYGlzU3RhbmRhcmRCcm93c2VyRW52YCBtZXRob2QgaW5kaWNhdGVzIHRoYXRcbiAqIGBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlcmAsIHRoZSBXZWJXb3JrZXIgd2lsbCBzdGlsbCBiZVxuICogZmlsdGVyZWQgb3V0IGR1ZSB0byBpdHMganVkZ21lbnQgc3RhbmRhcmRcbiAqIGB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnYC5cbiAqIFRoaXMgbGVhZHMgdG8gYSBwcm9ibGVtIHdoZW4gYXhpb3MgcG9zdCBgRm9ybURhdGFgIGluIHdlYldvcmtlclxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYgPSAoKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiZcbiAgICB0eXBlb2Ygc2VsZi5pbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nXG4gICk7XG59KSgpO1xuXG5jb25zdCBvcmlnaW4gPSBoYXNCcm93c2VyRW52ICYmIHdpbmRvdy5sb2NhdGlvbi5ocmVmIHx8ICdodHRwOi8vbG9jYWxob3N0JztcblxuZXhwb3J0IHtcbiAgaGFzQnJvd3NlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIF9uYXZpZ2F0b3IgYXMgbmF2aWdhdG9yLFxuICBvcmlnaW5cbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tICcuL25vZGUvaW5kZXguanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi9jb21tb24vdXRpbHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC4uLnV0aWxzLFxuICAuLi5wbGF0Zm9ybVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgb3B0aW9ucykge1xuICByZXR1cm4gdG9Gb3JtRGF0YShkYXRhLCBuZXcgcGxhdGZvcm0uY2xhc3Nlcy5VUkxTZWFyY2hQYXJhbXMoKSwgT2JqZWN0LmFzc2lnbih7XG4gICAgdmlzaXRvcjogZnVuY3Rpb24odmFsdWUsIGtleSwgcGF0aCwgaGVscGVycykge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzTm9kZSAmJiB1dGlscy5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWxwZXJzLmRlZmF1bHRWaXNpdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9LCBvcHRpb25zKSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcgbGlrZSBgZm9vW3hdW3ldW3pdYCBhbmQgcmV0dXJucyBhbiBhcnJheSBsaWtlIGBbJ2ZvbycsICd4JywgJ3knLCAneiddXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICpcbiAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHN0cmluZ3MuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlUHJvcFBhdGgobmFtZSkge1xuICAvLyBmb29beF1beV1bel1cbiAgLy8gZm9vLngueS56XG4gIC8vIGZvby14LXktelxuICAvLyBmb28geCB5IHpcbiAgcmV0dXJuIHV0aWxzLm1hdGNoQWxsKC9cXHcrfFxcWyhcXHcqKV0vZywgbmFtZSkubWFwKG1hdGNoID0+IHtcbiAgICByZXR1cm4gbWF0Y2hbMF0gPT09ICdbXScgPyAnJyA6IG1hdGNoWzFdIHx8IG1hdGNoWzBdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuIGFycmF5IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjb252ZXJ0IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBrZXlzIGFuZCB2YWx1ZXMgYXMgdGhlIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheVRvT2JqZWN0KGFycikge1xuICBjb25zdCBvYmogPSB7fTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XG4gIGxldCBpO1xuICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgbGV0IGtleTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAga2V5ID0ga2V5c1tpXTtcbiAgICBvYmpba2V5XSA9IGFycltrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBGb3JtRGF0YSBvYmplY3QgYW5kIHJldHVybnMgYSBKYXZhU2NyaXB0IG9iamVjdFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGNvbnZlcnQgdG8gSlNPTi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0PHN0cmluZywgYW55PiB8IG51bGx9IFRoZSBjb252ZXJ0ZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBmb3JtRGF0YVRvSlNPTihmb3JtRGF0YSkge1xuICBmdW5jdGlvbiBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldCwgaW5kZXgpIHtcbiAgICBsZXQgbmFtZSA9IHBhdGhbaW5kZXgrK107XG5cbiAgICBpZiAobmFtZSA9PT0gJ19fcHJvdG9fXycpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgaXNOdW1lcmljS2V5ID0gTnVtYmVyLmlzRmluaXRlKCtuYW1lKTtcbiAgICBjb25zdCBpc0xhc3QgPSBpbmRleCA+PSBwYXRoLmxlbmd0aDtcbiAgICBuYW1lID0gIW5hbWUgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0Lmxlbmd0aCA6IG5hbWU7XG5cbiAgICBpZiAoaXNMYXN0KSB7XG4gICAgICBpZiAodXRpbHMuaGFzT3duUHJvcCh0YXJnZXQsIG5hbWUpKSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IFt0YXJnZXRbbmFtZV0sIHZhbHVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldFtuYW1lXSB8fCAhdXRpbHMuaXNPYmplY3QodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gW107XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXRbbmFtZV0sIGluZGV4KTtcblxuICAgIGlmIChyZXN1bHQgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBhcnJheVRvT2JqZWN0KHRhcmdldFtuYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gIH1cblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShmb3JtRGF0YSkgJiYgdXRpbHMuaXNGdW5jdGlvbihmb3JtRGF0YS5lbnRyaWVzKSkge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaEVudHJ5KGZvcm1EYXRhLCAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGJ1aWxkUGF0aChwYXJzZVByb3BQYXRoKG5hbWUpLCB2YWx1ZSwgb2JqLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZm9ybURhdGFUb0pTT047XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4vdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4uL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgdG9VUkxFbmNvZGVkRm9ybSBmcm9tICcuLi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBmb3JtRGF0YVRvSlNPTiBmcm9tICcuLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZywgdHJpZXMgdG8gcGFyc2UgaXQsIGFuZCBpZiBpdCBmYWlscywgaXQgcmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvblxuICogb2YgdGhlIGlucHV0XG4gKlxuICogQHBhcmFtIHthbnl9IHJhd1ZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHN0cmluZ2lmaWVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyc2VyIC0gQSBmdW5jdGlvbiB0aGF0IHBhcnNlcyBhIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmNvZGVyIC0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIHJldHVybnMgYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSByYXdWYWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcbiAgaWYgKHV0aWxzLmlzU3RyaW5nKHJhd1ZhbHVlKSkge1xuICAgIHRyeSB7XG4gICAgICAocGFyc2VyIHx8IEpTT04ucGFyc2UpKHJhd1ZhbHVlKTtcbiAgICAgIHJldHVybiB1dGlscy50cmltKHJhd1ZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5uYW1lICE9PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChlbmNvZGVyIHx8IEpTT04uc3RyaW5naWZ5KShyYXdWYWx1ZSk7XG59XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuXG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogWyd4aHInLCAnaHR0cCcsICdmZXRjaCddLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSB8fCAnJztcbiAgICBjb25zdCBoYXNKU09OQ29udGVudFR5cGUgPSBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPiAtMTtcbiAgICBjb25zdCBpc09iamVjdFBheWxvYWQgPSB1dGlscy5pc09iamVjdChkYXRhKTtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgJiYgdXRpbHMuaXNIVE1MRm9ybShkYXRhKSkge1xuICAgICAgZGF0YSA9IG5ldyBGb3JtRGF0YShkYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0Zvcm1EYXRhID0gdXRpbHMuaXNGb3JtRGF0YShkYXRhKTtcblxuICAgIGlmIChpc0Zvcm1EYXRhKSB7XG4gICAgICByZXR1cm4gaGFzSlNPTkNvbnRlbnRUeXBlID8gSlNPTi5zdHJpbmdpZnkoZm9ybURhdGFUb0pTT04oZGF0YSkpIDogZGF0YTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JywgZmFsc2UpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBsZXQgaXNGaWxlTGlzdDtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQpIHtcbiAgICAgIGlmIChjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIHRoaXMuZm9ybVNlcmlhbGl6ZXIpLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICgoaXNGaWxlTGlzdCA9IHV0aWxzLmlzRmlsZUxpc3QoZGF0YSkpIHx8IGNvbnRlbnRUeXBlLmluZGV4T2YoJ211bHRpcGFydC9mb3JtLWRhdGEnKSA+IC0xKSB7XG4gICAgICAgIGNvbnN0IF9Gb3JtRGF0YSA9IHRoaXMuZW52ICYmIHRoaXMuZW52LkZvcm1EYXRhO1xuXG4gICAgICAgIHJldHVybiB0b0Zvcm1EYXRhKFxuICAgICAgICAgIGlzRmlsZUxpc3QgPyB7J2ZpbGVzW10nOiBkYXRhfSA6IGRhdGEsXG4gICAgICAgICAgX0Zvcm1EYXRhICYmIG5ldyBfRm9ybURhdGEoKSxcbiAgICAgICAgICB0aGlzLmZvcm1TZXJpYWxpemVyXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCB8fCBoYXNKU09OQ29udGVudFR5cGUgKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi9qc29uJywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHN0cmluZ2lmeVNhZmVseShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgY29uc3QgdHJhbnNpdGlvbmFsID0gdGhpcy50cmFuc2l0aW9uYWwgfHwgZGVmYXVsdHMudHJhbnNpdGlvbmFsO1xuICAgIGNvbnN0IGZvcmNlZEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5mb3JjZWRKU09OUGFyc2luZztcbiAgICBjb25zdCBKU09OUmVxdWVzdGVkID0gdGhpcy5yZXNwb25zZVR5cGUgPT09ICdqc29uJztcblxuICAgIGlmICh1dGlscy5pc1Jlc3BvbnNlKGRhdGEpIHx8IHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGlmIChkYXRhICYmIHV0aWxzLmlzU3RyaW5nKGRhdGEpICYmICgoZm9yY2VkSlNPTlBhcnNpbmcgJiYgIXRoaXMucmVzcG9uc2VUeXBlKSB8fCBKU09OUmVxdWVzdGVkKSkge1xuICAgICAgY29uc3Qgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgICAgY29uc3Qgc3RyaWN0SlNPTlBhcnNpbmcgPSAhc2lsZW50SlNPTlBhcnNpbmcgJiYgSlNPTlJlcXVlc3RlZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChzdHJpY3RKU09OUGFyc2luZykge1xuICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIHRoaXMsIG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICBlbnY6IHtcbiAgICBGb3JtRGF0YTogcGxhdGZvcm0uY2xhc3Nlcy5Gb3JtRGF0YSxcbiAgICBCbG9iOiBwbGF0Zm9ybS5jbGFzc2VzLkJsb2JcbiAgfSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9LFxuXG4gIGhlYWRlcnM6IHtcbiAgICBjb21tb246IHtcbiAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICdDb250ZW50LVR5cGUnOiB1bmRlZmluZWRcbiAgICB9XG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgKG1ldGhvZCkgPT4ge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuXG4vLyBSYXdBeGlvc0hlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzLnRvT2JqZWN0U2V0KFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dKTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJhd0hlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IHJhd0hlYWRlcnMgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB7fTtcbiAgbGV0IGtleTtcbiAgbGV0IHZhbDtcbiAgbGV0IGk7XG5cbiAgcmF3SGVhZGVycyAmJiByYXdIZWFkZXJzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IGxpbmUuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IGxpbmUuc3Vic3RyaW5nKGkgKyAxKS50cmltKCk7XG5cbiAgICBpZiAoIWtleSB8fCAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2Zba2V5XSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSkge1xuICAgICAgICBwYXJzZWRba2V5XS5wdXNoKHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgcGFyc2VIZWFkZXJzIGZyb20gJy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzJztcblxuY29uc3QgJGludGVybmFscyA9IFN5bWJvbCgnaW50ZXJuYWxzJyk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlciAmJiBTdHJpbmcoaGVhZGVyKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKG5vcm1hbGl6ZVZhbHVlKSA6IFN0cmluZyh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW5zKHN0cikge1xuICBjb25zdCB0b2tlbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCB0b2tlbnNSRSA9IC8oW15cXHMsOz1dKylcXHMqKD86PVxccyooW14sO10rKSk/L2c7XG4gIGxldCBtYXRjaDtcblxuICB3aGlsZSAoKG1hdGNoID0gdG9rZW5zUkUuZXhlYyhzdHIpKSkge1xuICAgIHRva2Vuc1ttYXRjaFsxXV0gPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmNvbnN0IGlzVmFsaWRIZWFkZXJOYW1lID0gKHN0cikgPT4gL15bLV9hLXpBLVowLTleYHx+LCEjJCUmJyorLl0rJC8udGVzdChzdHIudHJpbSgpKTtcblxuZnVuY3Rpb24gbWF0Y2hIZWFkZXJWYWx1ZShjb250ZXh0LCB2YWx1ZSwgaGVhZGVyLCBmaWx0ZXIsIGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICBpZiAodXRpbHMuaXNGdW5jdGlvbihmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKHRoaXMsIHZhbHVlLCBoZWFkZXIpO1xuICB9XG5cbiAgaWYgKGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICAgIHZhbHVlID0gaGVhZGVyO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc1N0cmluZyh2YWx1ZSkpIHJldHVybjtcblxuICBpZiAodXRpbHMuaXNTdHJpbmcoZmlsdGVyKSkge1xuICAgIHJldHVybiB2YWx1ZS5pbmRleE9mKGZpbHRlcikgIT09IC0xO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzUmVnRXhwKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLnRlc3QodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlci50cmltKClcbiAgICAudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oW2EtelxcZF0pKFxcdyopL2csICh3LCBjaGFyLCBzdHIpID0+IHtcbiAgICAgIHJldHVybiBjaGFyLnRvVXBwZXJDYXNlKCkgKyBzdHI7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQWNjZXNzb3JzKG9iaiwgaGVhZGVyKSB7XG4gIGNvbnN0IGFjY2Vzc29yTmFtZSA9IHV0aWxzLnRvQ2FtZWxDYXNlKCcgJyArIGhlYWRlcik7XG5cbiAgWydnZXQnLCAnc2V0JywgJ2hhcyddLmZvckVhY2gobWV0aG9kTmFtZSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbWV0aG9kTmFtZSArIGFjY2Vzc29yTmFtZSwge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbbWV0aG9kTmFtZV0uY2FsbCh0aGlzLCBoZWFkZXIsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9KTtcbn1cblxuY2xhc3MgQXhpb3NIZWFkZXJzIHtcbiAgY29uc3RydWN0b3IoaGVhZGVycykge1xuICAgIGhlYWRlcnMgJiYgdGhpcy5zZXQoaGVhZGVycyk7XG4gIH1cblxuICBzZXQoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSwgcmV3cml0ZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghbEhlYWRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hlYWRlciBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgbEhlYWRlcik7XG5cbiAgICAgIGlmKCFrZXkgfHwgc2VsZltrZXldID09PSB1bmRlZmluZWQgfHwgX3Jld3JpdGUgPT09IHRydWUgfHwgKF9yZXdyaXRlID09PSB1bmRlZmluZWQgJiYgc2VsZltrZXldICE9PSBmYWxzZSkpIHtcbiAgICAgICAgc2VsZltrZXkgfHwgX2hlYWRlcl0gPSBub3JtYWxpemVWYWx1ZShfdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNldEhlYWRlcnMgPSAoaGVhZGVycywgX3Jld3JpdGUpID0+XG4gICAgICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIChfdmFsdWUsIF9oZWFkZXIpID0+IHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSk7XG5cbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChoZWFkZXIpIHx8IGhlYWRlciBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IpIHtcbiAgICAgIHNldEhlYWRlcnMoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSlcbiAgICB9IGVsc2UgaWYodXRpbHMuaXNTdHJpbmcoaGVhZGVyKSAmJiAoaGVhZGVyID0gaGVhZGVyLnRyaW0oKSkgJiYgIWlzVmFsaWRIZWFkZXJOYW1lKGhlYWRlcikpIHtcbiAgICAgIHNldEhlYWRlcnMocGFyc2VIZWFkZXJzKGhlYWRlciksIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzSGVhZGVycyhoZWFkZXIpKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBoZWFkZXIuZW50cmllcygpKSB7XG4gICAgICAgIHNldEhlYWRlcih2YWx1ZSwga2V5LCByZXdyaXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyICE9IG51bGwgJiYgc2V0SGVhZGVyKHZhbHVlT3JSZXdyaXRlLCBoZWFkZXIsIHJld3JpdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KGhlYWRlciwgcGFyc2VyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzW2tleV07XG5cbiAgICAgICAgaWYgKCFwYXJzZXIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyc2VyID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlVG9rZW5zKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmNhbGwodGhpcywgdmFsdWUsIGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNSZWdFeHAocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuZXhlYyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJzZXIgbXVzdCBiZSBib29sZWFufHJlZ2V4cHxmdW5jdGlvbicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhcyhoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgcmV0dXJuICEhKGtleSAmJiB0aGlzW2tleV0gIT09IHVuZGVmaW5lZCAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlcikpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkZWxldGUoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUhlYWRlcihfaGVhZGVyKSB7XG4gICAgICBfaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoX2hlYWRlcikge1xuICAgICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIF9oZWFkZXIpO1xuXG4gICAgICAgIGlmIChrZXkgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUoc2VsZiwgc2VsZltrZXldLCBrZXksIG1hdGNoZXIpKSkge1xuICAgICAgICAgIGRlbGV0ZSBzZWxmW2tleV07XG5cbiAgICAgICAgICBkZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5KGhlYWRlcikpIHtcbiAgICAgIGhlYWRlci5mb3JFYWNoKGRlbGV0ZUhlYWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZUhlYWRlcihoZWFkZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgY2xlYXIobWF0Y2hlcikge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBub3JtYWxpemUoZm9ybWF0KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShoZWFkZXJzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHNlbGZba2V5XSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gZm9ybWF0ID8gZm9ybWF0SGVhZGVyKGhlYWRlcikgOiBTdHJpbmcoaGVhZGVyKS50cmltKCk7XG5cbiAgICAgIGlmIChub3JtYWxpemVkICE9PSBoZWFkZXIpIHtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgIH1cblxuICAgICAgc2VsZltub3JtYWxpemVkXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblxuICAgICAgaGVhZGVyc1tub3JtYWxpemVkXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbmNhdCguLi50YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuY29uY2F0KHRoaXMsIC4uLnRhcmdldHMpO1xuICB9XG5cbiAgdG9KU09OKGFzU3RyaW5ncykge1xuICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZSAmJiAob2JqW2hlYWRlcl0gPSBhc1N0cmluZ3MgJiYgdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKCcsICcpIDogdmFsdWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSkubWFwKChbaGVhZGVyLCB2YWx1ZV0pID0+IGhlYWRlciArICc6ICcgKyB2YWx1ZSkuam9pbignXFxuJyk7XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdBeGlvc0hlYWRlcnMnO1xuICB9XG5cbiAgc3RhdGljIGZyb20odGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiB0aGlzID8gdGhpbmcgOiBuZXcgdGhpcyh0aGluZyk7XG4gIH1cblxuICBzdGF0aWMgY29uY2F0KGZpcnN0LCAuLi50YXJnZXRzKSB7XG4gICAgY29uc3QgY29tcHV0ZWQgPSBuZXcgdGhpcyhmaXJzdCk7XG5cbiAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4gY29tcHV0ZWQuc2V0KHRhcmdldCkpO1xuXG4gICAgcmV0dXJuIGNvbXB1dGVkO1xuICB9XG5cbiAgc3RhdGljIGFjY2Vzc29yKGhlYWRlcikge1xuICAgIGNvbnN0IGludGVybmFscyA9IHRoaXNbJGludGVybmFsc10gPSAodGhpc1skaW50ZXJuYWxzXSA9IHtcbiAgICAgIGFjY2Vzc29yczoge31cbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IGludGVybmFscy5hY2Nlc3NvcnM7XG4gICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWFjY2Vzc29yc1tsSGVhZGVyXSkge1xuICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xuICAgICAgICBhY2Nlc3NvcnNbbEhlYWRlcl0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzLmlzQXJyYXkoaGVhZGVyKSA/IGhlYWRlci5mb3JFYWNoKGRlZmluZUFjY2Vzc29yKSA6IGRlZmluZUFjY2Vzc29yKGhlYWRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5BeGlvc0hlYWRlcnMuYWNjZXNzb3IoWydDb250ZW50LVR5cGUnLCAnQ29udGVudC1MZW5ndGgnLCAnQWNjZXB0JywgJ0FjY2VwdC1FbmNvZGluZycsICdVc2VyLUFnZW50JywgJ0F1dGhvcml6YXRpb24nXSk7XG5cbi8vIHJlc2VydmVkIG5hbWVzIGhvdGZpeFxudXRpbHMucmVkdWNlRGVzY3JpcHRvcnMoQXhpb3NIZWFkZXJzLnByb3RvdHlwZSwgKHt2YWx1ZX0sIGtleSkgPT4ge1xuICBsZXQgbWFwcGVkID0ga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7IC8vIG1hcCBgc2V0YCA9PiBgU2V0YFxuICByZXR1cm4ge1xuICAgIGdldDogKCkgPT4gdmFsdWUsXG4gICAgc2V0KGhlYWRlclZhbHVlKSB7XG4gICAgICB0aGlzW21hcHBlZF0gPSBoZWFkZXJWYWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG51dGlscy5mcmVlemVNZXRob2RzKEF4aW9zSGVhZGVycyk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zSGVhZGVycztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzO1xuICBjb25zdCBjb250ZXh0ID0gcmVzcG9uc2UgfHwgY29uZmlnO1xuICBjb25zdCBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29udGV4dC5oZWFkZXJzKTtcbiAgbGV0IGRhdGEgPSBjb250ZXh0LmRhdGE7XG5cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdD19IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3Q9fSByZXF1ZXN0IFRoZSByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxlZEVycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIEF4aW9zRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlID09IG51bGwgPyAnY2FuY2VsZWQnIDogbWVzc2FnZSwgQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQsIGNvbmZpZywgcmVxdWVzdCk7XG4gIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbn1cblxudXRpbHMuaW5oZXJpdHMoQ2FuY2VsZWRFcnJvciwgQXhpb3NFcnJvciwge1xuICBfX0NBTkNFTF9fOiB0cnVlXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsZWRFcnJvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9BeGlvc0Vycm9yLmpzJztcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZVByb3RvY29sKHVybCkge1xuICBjb25zdCBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDYWxjdWxhdGUgZGF0YSBtYXhSYXRlXG4gKiBAcGFyYW0ge051bWJlcn0gW3NhbXBsZXNDb3VudD0gMTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW21pbj0gMTAwMF1cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3BlZWRvbWV0ZXIoc2FtcGxlc0NvdW50LCBtaW4pIHtcbiAgc2FtcGxlc0NvdW50ID0gc2FtcGxlc0NvdW50IHx8IDEwO1xuICBjb25zdCBieXRlcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBjb25zdCB0aW1lc3RhbXBzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGxldCBoZWFkID0gMDtcbiAgbGV0IHRhaWwgPSAwO1xuICBsZXQgZmlyc3RTYW1wbGVUUztcblxuICBtaW4gPSBtaW4gIT09IHVuZGVmaW5lZCA/IG1pbiA6IDEwMDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHB1c2goY2h1bmtMZW5ndGgpIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3Qgc3RhcnRlZEF0ID0gdGltZXN0YW1wc1t0YWlsXTtcblxuICAgIGlmICghZmlyc3RTYW1wbGVUUykge1xuICAgICAgZmlyc3RTYW1wbGVUUyA9IG5vdztcbiAgICB9XG5cbiAgICBieXRlc1toZWFkXSA9IGNodW5rTGVuZ3RoO1xuICAgIHRpbWVzdGFtcHNbaGVhZF0gPSBub3c7XG5cbiAgICBsZXQgaSA9IHRhaWw7XG4gICAgbGV0IGJ5dGVzQ291bnQgPSAwO1xuXG4gICAgd2hpbGUgKGkgIT09IGhlYWQpIHtcbiAgICAgIGJ5dGVzQ291bnQgKz0gYnl0ZXNbaSsrXTtcbiAgICAgIGkgPSBpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGhlYWQgPSAoaGVhZCArIDEpICUgc2FtcGxlc0NvdW50O1xuXG4gICAgaWYgKGhlYWQgPT09IHRhaWwpIHtcbiAgICAgIHRhaWwgPSAodGFpbCArIDEpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGlmIChub3cgLSBmaXJzdFNhbXBsZVRTIDwgbWluKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFzc2VkID0gc3RhcnRlZEF0ICYmIG5vdyAtIHN0YXJ0ZWRBdDtcblxuICAgIHJldHVybiBwYXNzZWQgPyBNYXRoLnJvdW5kKGJ5dGVzQ291bnQgKiAxMDAwIC8gcGFzc2VkKSA6IHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3BlZWRvbWV0ZXI7XG4iLCIvKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGxldCB0aHJlc2hvbGQgPSAxMDAwIC8gZnJlcTtcbiAgbGV0IGxhc3RBcmdzO1xuICBsZXQgdGltZXI7XG5cbiAgY29uc3QgaW52b2tlID0gKGFyZ3MsIG5vdyA9IERhdGUubm93KCkpID0+IHtcbiAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgbGFzdEFyZ3MgPSBudWxsO1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICB9XG4gICAgZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gIH1cblxuICBjb25zdCB0aHJvdHRsZWQgPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcGFzc2VkID0gbm93IC0gdGltZXN0YW1wO1xuICAgIGlmICggcGFzc2VkID49IHRocmVzaG9sZCkge1xuICAgICAgaW52b2tlKGFyZ3MsIG5vdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RBcmdzID0gYXJncztcbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgaW52b2tlKGxhc3RBcmdzKVxuICAgICAgICB9LCB0aHJlc2hvbGQgLSBwYXNzZWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZsdXNoID0gKCkgPT4gbGFzdEFyZ3MgJiYgaW52b2tlKGxhc3RBcmdzKTtcblxuICByZXR1cm4gW3Rocm90dGxlZCwgZmx1c2hdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0aHJvdHRsZTtcbiIsImltcG9ydCBzcGVlZG9tZXRlciBmcm9tIFwiLi9zcGVlZG9tZXRlci5qc1wiO1xuaW1wb3J0IHRocm90dGxlIGZyb20gXCIuL3Rocm90dGxlLmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBwcm9ncmVzc0V2ZW50UmVkdWNlciA9IChsaXN0ZW5lciwgaXNEb3dubG9hZFN0cmVhbSwgZnJlcSA9IDMpID0+IHtcbiAgbGV0IGJ5dGVzTm90aWZpZWQgPSAwO1xuICBjb25zdCBfc3BlZWRvbWV0ZXIgPSBzcGVlZG9tZXRlcig1MCwgMjUwKTtcblxuICByZXR1cm4gdGhyb3R0bGUoZSA9PiB7XG4gICAgY29uc3QgbG9hZGVkID0gZS5sb2FkZWQ7XG4gICAgY29uc3QgdG90YWwgPSBlLmxlbmd0aENvbXB1dGFibGUgPyBlLnRvdGFsIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHByb2dyZXNzQnl0ZXMgPSBsb2FkZWQgLSBieXRlc05vdGlmaWVkO1xuICAgIGNvbnN0IHJhdGUgPSBfc3BlZWRvbWV0ZXIocHJvZ3Jlc3NCeXRlcyk7XG4gICAgY29uc3QgaW5SYW5nZSA9IGxvYWRlZCA8PSB0b3RhbDtcblxuICAgIGJ5dGVzTm90aWZpZWQgPSBsb2FkZWQ7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbG9hZGVkLFxuICAgICAgdG90YWwsXG4gICAgICBwcm9ncmVzczogdG90YWwgPyAobG9hZGVkIC8gdG90YWwpIDogdW5kZWZpbmVkLFxuICAgICAgYnl0ZXM6IHByb2dyZXNzQnl0ZXMsXG4gICAgICByYXRlOiByYXRlID8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCAmJiBpblJhbmdlID8gKHRvdGFsIC0gbG9hZGVkKSAvIHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBldmVudDogZSxcbiAgICAgIGxlbmd0aENvbXB1dGFibGU6IHRvdGFsICE9IG51bGwsXG4gICAgICBbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ106IHRydWVcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufVxuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudERlY29yYXRvciA9ICh0b3RhbCwgdGhyb3R0bGVkKSA9PiB7XG4gIGNvbnN0IGxlbmd0aENvbXB1dGFibGUgPSB0b3RhbCAhPSBudWxsO1xuXG4gIHJldHVybiBbKGxvYWRlZCkgPT4gdGhyb3R0bGVkWzBdKHtcbiAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgIHRvdGFsLFxuICAgIGxvYWRlZFxuICB9KSwgdGhyb3R0bGVkWzFdXTtcbn1cblxuZXhwb3J0IGNvbnN0IGFzeW5jRGVjb3JhdG9yID0gKGZuKSA9PiAoLi4uYXJncykgPT4gdXRpbHMuYXNhcCgoKSA9PiBmbiguLi5hcmdzKSk7XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgPyAoKG9yaWdpbiwgaXNNU0lFKSA9PiAodXJsKSA9PiB7XG4gIHVybCA9IG5ldyBVUkwodXJsLCBwbGF0Zm9ybS5vcmlnaW4pO1xuXG4gIHJldHVybiAoXG4gICAgb3JpZ2luLnByb3RvY29sID09PSB1cmwucHJvdG9jb2wgJiZcbiAgICBvcmlnaW4uaG9zdCA9PT0gdXJsLmhvc3QgJiZcbiAgICAoaXNNU0lFIHx8IG9yaWdpbi5wb3J0ID09PSB1cmwucG9ydClcbiAgKTtcbn0pKFxuICBuZXcgVVJMKHBsYXRmb3JtLm9yaWdpbiksXG4gIHBsYXRmb3JtLm5hdmlnYXRvciAmJiAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KHBsYXRmb3JtLm5hdmlnYXRvci51c2VyQWdlbnQpXG4pIDogKCkgPT4gdHJ1ZTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIHtcbiAgICB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIGNvbnN0IGNvb2tpZSA9IFtuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKV07XG5cbiAgICAgIHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpICYmIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcocGF0aCkgJiYgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuXG4gICAgICB1dGlscy5pc1N0cmluZyhkb21haW4pICYmIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG5cbiAgICAgIHNlY3VyZSA9PT0gdHJ1ZSAmJiBjb29raWUucHVzaCgnc2VjdXJlJyk7XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG5cbiAgICByZWFkKG5hbWUpIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgfSxcblxuICAgIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfVxuXG4gIDpcblxuICAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIHtcbiAgICB3cml0ZSgpIHt9LFxuICAgIHJlYWQoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZSgpIHt9XG4gIH07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlzQWJzb2x1dGVVUkwgZnJvbSAnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMLmpzJztcbmltcG9ydCBjb21iaW5lVVJMcyBmcm9tICcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9BeGlvc0hlYWRlcnMuanNcIjtcblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgcHJvcCwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIHByb3AgLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiLCBwcm9wICwgY2FzZWxlc3MpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhLCBwcm9wICwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhYU1JGVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWRhcHRlcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZVR5cGU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkNvb2tpZU5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkhlYWRlck5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25VcGxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgZGVjb21wcmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhDb250ZW50TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heEJvZHlMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYmVmb3JlUmVkaXJlY3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNwb3J0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwc0FnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGNhbmNlbFRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHNvY2tldFBhdGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiICwgcHJvcCkgPT4gbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSxwcm9wLCB0cnVlKVxuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnMSwgY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSBcIi4vaXNVUkxTYW1lT3JpZ2luLmpzXCI7XG5pbXBvcnQgY29va2llcyBmcm9tIFwiLi9jb29raWVzLmpzXCI7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tIFwiLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzXCI7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSBcIi4uL2NvcmUvbWVyZ2VDb25maWcuanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSBcIi4vYnVpbGRVUkwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICBsZXQge2RhdGEsIHdpdGhYU1JGVG9rZW4sIHhzcmZIZWFkZXJOYW1lLCB4c3JmQ29va2llTmFtZSwgaGVhZGVycywgYXV0aH0gPSBuZXdDb25maWc7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwpLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG5cbiAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICBpZiAoYXV0aCkge1xuICAgIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgK1xuICAgICAgYnRvYSgoYXV0aC51c2VybmFtZSB8fCAnJykgKyAnOicgKyAoYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhdXRoLnBhc3N3b3JkKSkgOiAnJykpXG4gICAgKTtcbiAgfVxuXG4gIGxldCBjb250ZW50VHlwZTtcblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgfHwgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKHVuZGVmaW5lZCk7IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9IGVsc2UgaWYgKChjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSkgIT09IGZhbHNlKSB7XG4gICAgICAvLyBmaXggc2VtaWNvbG9uIGR1cGxpY2F0aW9uIGlzc3VlIGZvciBSZWFjdE5hdGl2ZSBGb3JtRGF0YSBpbXBsZW1lbnRhdGlvblxuICAgICAgY29uc3QgW3R5cGUsIC4uLnRva2Vuc10gPSBjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JykubWFwKHRva2VuID0+IHRva2VuLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogW107XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKFt0eXBlIHx8ICdtdWx0aXBhcnQvZm9ybS1kYXRhJywgLi4udG9rZW5zXS5qb2luKCc7ICcpKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIHdpdGhYU1JGVG9rZW4gJiYgdXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59XG5cbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi8uLi9jb3JlL3NldHRsZS5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgcGFyc2VQcm90b2NvbCBmcm9tICcuLi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHtwcm9ncmVzc0V2ZW50UmVkdWNlcn0gZnJvbSAnLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyc7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tIFwiLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzXCI7XG5cbmNvbnN0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCAmJiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcbiAgICBsZXQgcmVxdWVzdERhdGEgPSBfY29uZmlnLmRhdGE7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShfY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgIGxldCB7cmVzcG9uc2VUeXBlLCBvblVwbG9hZFByb2dyZXNzLCBvbkRvd25sb2FkUHJvZ3Jlc3N9ID0gX2NvbmZpZztcbiAgICBsZXQgb25DYW5jZWxlZDtcbiAgICBsZXQgdXBsb2FkVGhyb3R0bGVkLCBkb3dubG9hZFRocm90dGxlZDtcbiAgICBsZXQgZmx1c2hVcGxvYWQsIGZsdXNoRG93bmxvYWQ7XG5cbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgZmx1c2hVcGxvYWQgJiYgZmx1c2hVcGxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG4gICAgICBmbHVzaERvd25sb2FkICYmIGZsdXNoRG93bmxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcblxuICAgICAgX2NvbmZpZy5zaWduYWwgJiYgX2NvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICB9XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgcmVxdWVzdC5vcGVuKF9jb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIF9jb25maWcudXJsLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShcbiAgICAgICAgJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICBsZXQgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBfY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnIDogJ3RpbWVvdXQgZXhjZWVkZWQnO1xuICAgICAgY29uc3QgdHJhbnNpdGlvbmFsID0gX2NvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBpZiAoX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgcmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCAmJiByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShudWxsKTtcblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLnRvSlNPTigpLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFfY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBfY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKG9uRG93bmxvYWRQcm9ncmVzcykge1xuICAgICAgKFtkb3dubG9hZFRocm90dGxlZCwgZmx1c2hEb3dubG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpKTtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBkb3dubG9hZFRocm90dGxlZCk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAob25VcGxvYWRQcm9ncmVzcyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgKFt1cGxvYWRUaHJvdHRsZWQsIGZsdXNoVXBsb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uVXBsb2FkUHJvZ3Jlc3MpKTtcblxuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCB1cGxvYWRUaHJvdHRsZWQpO1xuXG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZmx1c2hVcGxvYWQpO1xuICAgIH1cblxuICAgIGlmIChfY29uZmlnLmNhbmNlbFRva2VuIHx8IF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgb25DYW5jZWxlZCA9IGNhbmNlbCA9PiB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChfY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBfY29uZmlnLnNpZ25hbC5hYm9ydGVkID8gb25DYW5jZWxlZCgpIDogX2NvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woX2NvbmZpZy51cmwpO1xuXG4gICAgaWYgKHByb3RvY29sICYmIHBsYXRmb3JtLnByb3RvY29scy5pbmRleE9mKHByb3RvY29sKSA9PT0gLTEpIHtcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignVW5zdXBwb3J0ZWQgcHJvdG9jb2wgJyArIHByb3RvY29sICsgJzonLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgY29uZmlnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhIHx8IG51bGwpO1xuICB9KTtcbn1cbiIsImltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gXCIuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qc1wiO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuY29uc3QgY29tcG9zZVNpZ25hbHMgPSAoc2lnbmFscywgdGltZW91dCkgPT4ge1xuICBjb25zdCB7bGVuZ3RofSA9IChzaWduYWxzID0gc2lnbmFscyA/IHNpZ25hbHMuZmlsdGVyKEJvb2xlYW4pIDogW10pO1xuXG4gIGlmICh0aW1lb3V0IHx8IGxlbmd0aCkge1xuICAgIGxldCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgbGV0IGFib3J0ZWQ7XG5cbiAgICBjb25zdCBvbmFib3J0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICBjb25zdCBlcnIgPSByZWFzb24gaW5zdGFuY2VvZiBFcnJvciA/IHJlYXNvbiA6IHRoaXMucmVhc29uO1xuICAgICAgICBjb250cm9sbGVyLmFib3J0KGVyciBpbnN0YW5jZW9mIEF4aW9zRXJyb3IgPyBlcnIgOiBuZXcgQ2FuY2VsZWRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogZXJyKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHRpbWVyID0gdGltZW91dCAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIG9uYWJvcnQobmV3IEF4aW9zRXJyb3IoYHRpbWVvdXQgJHt0aW1lb3V0fSBvZiBtcyBleGNlZWRlZGAsIEF4aW9zRXJyb3IuRVRJTUVET1VUKSlcbiAgICB9LCB0aW1lb3V0KVxuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSAoKSA9PiB7XG4gICAgICBpZiAoc2lnbmFscykge1xuICAgICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIHNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xuICAgICAgICAgIHNpZ25hbC51bnN1YnNjcmliZSA/IHNpZ25hbC51bnN1YnNjcmliZShvbmFib3J0KSA6IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2lnbmFscyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpKTtcblxuICAgIGNvbnN0IHtzaWduYWx9ID0gY29udHJvbGxlcjtcblxuICAgIHNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHV0aWxzLmFzYXAodW5zdWJzY3JpYmUpO1xuXG4gICAgcmV0dXJuIHNpZ25hbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb3NlU2lnbmFscztcbiIsIlxuZXhwb3J0IGNvbnN0IHN0cmVhbUNodW5rID0gZnVuY3Rpb24qIChjaHVuaywgY2h1bmtTaXplKSB7XG4gIGxldCBsZW4gPSBjaHVuay5ieXRlTGVuZ3RoO1xuXG4gIGlmICghY2h1bmtTaXplIHx8IGxlbiA8IGNodW5rU2l6ZSkge1xuICAgIHlpZWxkIGNodW5rO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBwb3MgPSAwO1xuICBsZXQgZW5kO1xuXG4gIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICBlbmQgPSBwb3MgKyBjaHVua1NpemU7XG4gICAgeWllbGQgY2h1bmsuc2xpY2UocG9zLCBlbmQpO1xuICAgIHBvcyA9IGVuZDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVhZEJ5dGVzID0gYXN5bmMgZnVuY3Rpb24qIChpdGVyYWJsZSwgY2h1bmtTaXplKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgcmVhZFN0cmVhbShpdGVyYWJsZSkpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoY2h1bmssIGNodW5rU2l6ZSk7XG4gIH1cbn1cblxuY29uc3QgcmVhZFN0cmVhbSA9IGFzeW5jIGZ1bmN0aW9uKiAoc3RyZWFtKSB7XG4gIGlmIChzdHJlYW1bU3ltYm9sLmFzeW5jSXRlcmF0b3JdKSB7XG4gICAgeWllbGQqIHN0cmVhbTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWFkZXIgPSBzdHJlYW0uZ2V0UmVhZGVyKCk7XG4gIHRyeSB7XG4gICAgZm9yICg7Oykge1xuICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCByZWFkZXIuY2FuY2VsKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCkgPT4ge1xuICBjb25zdCBpdGVyYXRvciA9IHJlYWRCeXRlcyhzdHJlYW0sIGNodW5rU2l6ZSk7XG5cbiAgbGV0IGJ5dGVzID0gMDtcbiAgbGV0IGRvbmU7XG4gIGxldCBfb25GaW5pc2ggPSAoZSkgPT4ge1xuICAgIGlmICghZG9uZSkge1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICBvbkZpbmlzaCAmJiBvbkZpbmlzaChlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtKHtcbiAgICBhc3luYyBwdWxsKGNvbnRyb2xsZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHtkb25lLCB2YWx1ZX0gPSBhd2FpdCBpdGVyYXRvci5uZXh0KCk7XG5cbiAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgIF9vbkZpbmlzaCgpO1xuICAgICAgICAgIGNvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGVuID0gdmFsdWUuYnl0ZUxlbmd0aDtcbiAgICAgICAgaWYgKG9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgICBsZXQgbG9hZGVkQnl0ZXMgPSBieXRlcyArPSBsZW47XG4gICAgICAgICAgb25Qcm9ncmVzcyhsb2FkZWRCeXRlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKG5ldyBVaW50OEFycmF5KHZhbHVlKSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX29uRmluaXNoKGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhbmNlbChyZWFzb24pIHtcbiAgICAgIF9vbkZpbmlzaChyZWFzb24pO1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yLnJldHVybigpO1xuICAgIH1cbiAgfSwge1xuICAgIGhpZ2hXYXRlck1hcms6IDJcbiAgfSlcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcbmltcG9ydCBjb21wb3NlU2lnbmFscyBmcm9tIFwiLi4vaGVscGVycy9jb21wb3NlU2lnbmFscy5qc1wiO1xuaW1wb3J0IHt0cmFja1N0cmVhbX0gZnJvbSBcIi4uL2hlbHBlcnMvdHJhY2tTdHJlYW0uanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQge3Byb2dyZXNzRXZlbnRSZWR1Y2VyLCBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yLCBhc3luY0RlY29yYXRvcn0gZnJvbSBcIi4uL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanNcIjtcbmltcG9ydCByZXNvbHZlQ29uZmlnIGZyb20gXCIuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanNcIjtcbmltcG9ydCBzZXR0bGUgZnJvbSBcIi4uL2NvcmUvc2V0dGxlLmpzXCI7XG5cbmNvbnN0IGlzRmV0Y2hTdXBwb3J0ZWQgPSB0eXBlb2YgZmV0Y2ggPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFJlcXVlc3QgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFJlc3BvbnNlID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgdHlwZW9mIFJlYWRhYmxlU3RyZWFtID09PSAnZnVuY3Rpb24nO1xuXG4vLyB1c2VkIG9ubHkgaW5zaWRlIHRoZSBmZXRjaCBhZGFwdGVyXG5jb25zdCBlbmNvZGVUZXh0ID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAodHlwZW9mIFRleHRFbmNvZGVyID09PSAnZnVuY3Rpb24nID9cbiAgICAoKGVuY29kZXIpID0+IChzdHIpID0+IGVuY29kZXIuZW5jb2RlKHN0cikpKG5ldyBUZXh0RW5jb2RlcigpKSA6XG4gICAgYXN5bmMgKHN0cikgPT4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgbmV3IFJlc3BvbnNlKHN0cikuYXJyYXlCdWZmZXIoKSlcbik7XG5cbmNvbnN0IHRlc3QgPSAoZm4sIC4uLmFyZ3MpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmbiguLi5hcmdzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IHN1cHBvcnRzUmVxdWVzdFN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiYgdGVzdCgoKSA9PiB7XG4gIGxldCBkdXBsZXhBY2Nlc3NlZCA9IGZhbHNlO1xuXG4gIGNvbnN0IGhhc0NvbnRlbnRUeXBlID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgYm9keTogbmV3IFJlYWRhYmxlU3RyZWFtKCksXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgZ2V0IGR1cGxleCgpIHtcbiAgICAgIGR1cGxleEFjY2Vzc2VkID0gdHJ1ZTtcbiAgICAgIHJldHVybiAnaGFsZic7XG4gICAgfSxcbiAgfSkuaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpO1xuXG4gIHJldHVybiBkdXBsZXhBY2Nlc3NlZCAmJiAhaGFzQ29udGVudFR5cGU7XG59KTtcblxuY29uc3QgREVGQVVMVF9DSFVOS19TSVpFID0gNjQgKiAxMDI0O1xuXG5jb25zdCBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtID0gaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJlxuICB0ZXN0KCgpID0+IHV0aWxzLmlzUmVhZGFibGVTdHJlYW0obmV3IFJlc3BvbnNlKCcnKS5ib2R5KSk7XG5cblxuY29uc3QgcmVzb2x2ZXJzID0ge1xuICBzdHJlYW06IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKChyZXMpID0+IHJlcy5ib2R5KVxufTtcblxuaXNGZXRjaFN1cHBvcnRlZCAmJiAoKChyZXMpID0+IHtcbiAgWyd0ZXh0JywgJ2FycmF5QnVmZmVyJywgJ2Jsb2InLCAnZm9ybURhdGEnLCAnc3RyZWFtJ10uZm9yRWFjaCh0eXBlID0+IHtcbiAgICAhcmVzb2x2ZXJzW3R5cGVdICYmIChyZXNvbHZlcnNbdHlwZV0gPSB1dGlscy5pc0Z1bmN0aW9uKHJlc1t0eXBlXSkgPyAocmVzKSA9PiByZXNbdHlwZV0oKSA6XG4gICAgICAoXywgY29uZmlnKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBSZXNwb25zZSB0eXBlICcke3R5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCwgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsIGNvbmZpZyk7XG4gICAgICB9KVxuICB9KTtcbn0pKG5ldyBSZXNwb25zZSkpO1xuXG5jb25zdCBnZXRCb2R5TGVuZ3RoID0gYXN5bmMgKGJvZHkpID0+IHtcbiAgaWYgKGJvZHkgPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgaWYodXRpbHMuaXNCbG9iKGJvZHkpKSB7XG4gICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oYm9keSkpIHtcbiAgICBjb25zdCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHBsYXRmb3JtLm9yaWdpbiwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5LFxuICAgIH0pO1xuICAgIHJldHVybiAoYXdhaXQgX3JlcXVlc3QuYXJyYXlCdWZmZXIoKSkuYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpIHx8IHV0aWxzLmlzQXJyYXlCdWZmZXIoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcbiAgICBib2R5ID0gYm9keSArICcnO1xuICB9XG5cbiAgaWYodXRpbHMuaXNTdHJpbmcoYm9keSkpIHtcbiAgICByZXR1cm4gKGF3YWl0IGVuY29kZVRleHQoYm9keSkpLmJ5dGVMZW5ndGg7XG4gIH1cbn1cblxuY29uc3QgcmVzb2x2ZUJvZHlMZW5ndGggPSBhc3luYyAoaGVhZGVycywgYm9keSkgPT4ge1xuICBjb25zdCBsZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihoZWFkZXJzLmdldENvbnRlbnRMZW5ndGgoKSk7XG5cbiAgcmV0dXJuIGxlbmd0aCA9PSBudWxsID8gZ2V0Qm9keUxlbmd0aChib2R5KSA6IGxlbmd0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNGZXRjaFN1cHBvcnRlZCAmJiAoYXN5bmMgKGNvbmZpZykgPT4ge1xuICBsZXQge1xuICAgIHVybCxcbiAgICBtZXRob2QsXG4gICAgZGF0YSxcbiAgICBzaWduYWwsXG4gICAgY2FuY2VsVG9rZW4sXG4gICAgdGltZW91dCxcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICByZXNwb25zZVR5cGUsXG4gICAgaGVhZGVycyxcbiAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgIGZldGNoT3B0aW9uc1xuICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSA/IChyZXNwb25zZVR5cGUgKyAnJykudG9Mb3dlckNhc2UoKSA6ICd0ZXh0JztcblxuICBsZXQgY29tcG9zZWRTaWduYWwgPSBjb21wb3NlU2lnbmFscyhbc2lnbmFsLCBjYW5jZWxUb2tlbiAmJiBjYW5jZWxUb2tlbi50b0Fib3J0U2lnbmFsKCldLCB0aW1lb3V0KTtcblxuICBsZXQgcmVxdWVzdDtcblxuICBjb25zdCB1bnN1YnNjcmliZSA9IGNvbXBvc2VkU2lnbmFsICYmIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlICYmICgoKSA9PiB7XG4gICAgICBjb21wb3NlZFNpZ25hbC51bnN1YnNjcmliZSgpO1xuICB9KTtcblxuICBsZXQgcmVxdWVzdENvbnRlbnRMZW5ndGg7XG5cbiAgdHJ5IHtcbiAgICBpZiAoXG4gICAgICBvblVwbG9hZFByb2dyZXNzICYmIHN1cHBvcnRzUmVxdWVzdFN0cmVhbSAmJiBtZXRob2QgIT09ICdnZXQnICYmIG1ldGhvZCAhPT0gJ2hlYWQnICYmXG4gICAgICAocmVxdWVzdENvbnRlbnRMZW5ndGggPSBhd2FpdCByZXNvbHZlQm9keUxlbmd0aChoZWFkZXJzLCBkYXRhKSkgIT09IDBcbiAgICApIHtcbiAgICAgIGxldCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgZHVwbGV4OiBcImhhbGZcIlxuICAgICAgfSk7XG5cbiAgICAgIGxldCBjb250ZW50VHlwZUhlYWRlcjtcblxuICAgICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgJiYgKGNvbnRlbnRUeXBlSGVhZGVyID0gX3JlcXVlc3QuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSkge1xuICAgICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKGNvbnRlbnRUeXBlSGVhZGVyKVxuICAgICAgfVxuXG4gICAgICBpZiAoX3JlcXVlc3QuYm9keSkge1xuICAgICAgICBjb25zdCBbb25Qcm9ncmVzcywgZmx1c2hdID0gcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgICByZXF1ZXN0Q29udGVudExlbmd0aCxcbiAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvblVwbG9hZFByb2dyZXNzKSlcbiAgICAgICAgKTtcblxuICAgICAgICBkYXRhID0gdHJhY2tTdHJlYW0oX3JlcXVlc3QuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBvblByb2dyZXNzLCBmbHVzaCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF1dGlscy5pc1N0cmluZyh3aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICB3aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHMgPyAnaW5jbHVkZScgOiAnb21pdCc7XG4gICAgfVxuXG4gICAgLy8gQ2xvdWRmbGFyZSBXb3JrZXJzIHRocm93cyB3aGVuIGNyZWRlbnRpYWxzIGFyZSBkZWZpbmVkXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jbG91ZGZsYXJlL3dvcmtlcmQvaXNzdWVzLzkwMlxuICAgIGNvbnN0IGlzQ3JlZGVudGlhbHNTdXBwb3J0ZWQgPSBcImNyZWRlbnRpYWxzXCIgaW4gUmVxdWVzdC5wcm90b3R5cGU7XG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgLi4uZmV0Y2hPcHRpb25zLFxuICAgICAgc2lnbmFsOiBjb21wb3NlZFNpZ25hbCxcbiAgICAgIG1ldGhvZDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLm5vcm1hbGl6ZSgpLnRvSlNPTigpLFxuICAgICAgYm9keTogZGF0YSxcbiAgICAgIGR1cGxleDogXCJoYWxmXCIsXG4gICAgICBjcmVkZW50aWFsczogaXNDcmVkZW50aWFsc1N1cHBvcnRlZCA/IHdpdGhDcmVkZW50aWFscyA6IHVuZGVmaW5lZFxuICAgIH0pO1xuXG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCk7XG5cbiAgICBjb25zdCBpc1N0cmVhbVJlc3BvbnNlID0gc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAocmVzcG9uc2VUeXBlID09PSAnc3RyZWFtJyB8fCByZXNwb25zZVR5cGUgPT09ICdyZXNwb25zZScpO1xuXG4gICAgaWYgKHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKG9uRG93bmxvYWRQcm9ncmVzcyB8fCAoaXNTdHJlYW1SZXNwb25zZSAmJiB1bnN1YnNjcmliZSkpKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge307XG5cbiAgICAgIFsnc3RhdHVzJywgJ3N0YXR1c1RleHQnLCAnaGVhZGVycyddLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgIG9wdGlvbnNbcHJvcF0gPSByZXNwb25zZVtwcm9wXTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCByZXNwb25zZUNvbnRlbnRMZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG5cbiAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBvbkRvd25sb2FkUHJvZ3Jlc3MgJiYgcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgcmVzcG9uc2VDb250ZW50TGVuZ3RoLFxuICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvbkRvd25sb2FkUHJvZ3Jlc3MpLCB0cnVlKVxuICAgICAgKSB8fCBbXTtcblxuICAgICAgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoXG4gICAgICAgIHRyYWNrU3RyZWFtKHJlc3BvbnNlLmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25Qcm9ncmVzcywgKCkgPT4ge1xuICAgICAgICAgIGZsdXNoICYmIGZsdXNoKCk7XG4gICAgICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSksXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlIHx8ICd0ZXh0JztcblxuICAgIGxldCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNvbHZlcnNbdXRpbHMuZmluZEtleShyZXNvbHZlcnMsIHJlc3BvbnNlVHlwZSkgfHwgJ3RleHQnXShyZXNwb25zZSwgY29uZmlnKTtcblxuICAgICFpc1N0cmVhbVJlc3BvbnNlICYmIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG5cbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIGhlYWRlcnM6IEF4aW9zSGVhZGVycy5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9KVxuICAgIH0pXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG5cbiAgICBpZiAoZXJyICYmIGVyci5uYW1lID09PSAnVHlwZUVycm9yJyAmJiAvZmV0Y2gvaS50ZXN0KGVyci5tZXNzYWdlKSkge1xuICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgbmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpLFxuICAgICAgICB7XG4gICAgICAgICAgY2F1c2U6IGVyci5jYXVzZSB8fCBlcnJcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlcnIsIGVyciAmJiBlcnIuY29kZSwgY29uZmlnLCByZXF1ZXN0KTtcbiAgfVxufSk7XG5cblxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBodHRwQWRhcHRlciBmcm9tICcuL2h0dHAuanMnO1xuaW1wb3J0IHhockFkYXB0ZXIgZnJvbSAnLi94aHIuanMnO1xuaW1wb3J0IGZldGNoQWRhcHRlciBmcm9tICcuL2ZldGNoLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcblxuY29uc3Qga25vd25BZGFwdGVycyA9IHtcbiAgaHR0cDogaHR0cEFkYXB0ZXIsXG4gIHhocjogeGhyQWRhcHRlcixcbiAgZmV0Y2g6IGZldGNoQWRhcHRlclxufVxuXG51dGlscy5mb3JFYWNoKGtub3duQWRhcHRlcnMsIChmbiwgdmFsdWUpID0+IHtcbiAgaWYgKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ25hbWUnLCB7dmFsdWV9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7dmFsdWV9KTtcbiAgfVxufSk7XG5cbmNvbnN0IHJlbmRlclJlYXNvbiA9IChyZWFzb24pID0+IGAtICR7cmVhc29ufWA7XG5cbmNvbnN0IGlzUmVzb2x2ZWRIYW5kbGUgPSAoYWRhcHRlcikgPT4gdXRpbHMuaXNGdW5jdGlvbihhZGFwdGVyKSB8fCBhZGFwdGVyID09PSBudWxsIHx8IGFkYXB0ZXIgPT09IGZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldEFkYXB0ZXI6IChhZGFwdGVycykgPT4ge1xuICAgIGFkYXB0ZXJzID0gdXRpbHMuaXNBcnJheShhZGFwdGVycykgPyBhZGFwdGVycyA6IFthZGFwdGVyc107XG5cbiAgICBjb25zdCB7bGVuZ3RofSA9IGFkYXB0ZXJzO1xuICAgIGxldCBuYW1lT3JBZGFwdGVyO1xuICAgIGxldCBhZGFwdGVyO1xuXG4gICAgY29uc3QgcmVqZWN0ZWRSZWFzb25zID0ge307XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBuYW1lT3JBZGFwdGVyID0gYWRhcHRlcnNbaV07XG4gICAgICBsZXQgaWQ7XG5cbiAgICAgIGFkYXB0ZXIgPSBuYW1lT3JBZGFwdGVyO1xuXG4gICAgICBpZiAoIWlzUmVzb2x2ZWRIYW5kbGUobmFtZU9yQWRhcHRlcikpIHtcbiAgICAgICAgYWRhcHRlciA9IGtub3duQWRhcHRlcnNbKGlkID0gU3RyaW5nKG5hbWVPckFkYXB0ZXIpKS50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICBpZiAoYWRhcHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoYFVua25vd24gYWRhcHRlciAnJHtpZH0nYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGFkYXB0ZXIpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJlamVjdGVkUmVhc29uc1tpZCB8fCAnIycgKyBpXSA9IGFkYXB0ZXI7XG4gICAgfVxuXG4gICAgaWYgKCFhZGFwdGVyKSB7XG5cbiAgICAgIGNvbnN0IHJlYXNvbnMgPSBPYmplY3QuZW50cmllcyhyZWplY3RlZFJlYXNvbnMpXG4gICAgICAgIC5tYXAoKFtpZCwgc3RhdGVdKSA9PiBgYWRhcHRlciAke2lkfSBgICtcbiAgICAgICAgICAoc3RhdGUgPT09IGZhbHNlID8gJ2lzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGVudmlyb25tZW50JyA6ICdpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBidWlsZCcpXG4gICAgICAgICk7XG5cbiAgICAgIGxldCBzID0gbGVuZ3RoID9cbiAgICAgICAgKHJlYXNvbnMubGVuZ3RoID4gMSA/ICdzaW5jZSA6XFxuJyArIHJlYXNvbnMubWFwKHJlbmRlclJlYXNvbikuam9pbignXFxuJykgOiAnICcgKyByZW5kZXJSZWFzb24ocmVhc29uc1swXSkpIDpcbiAgICAgICAgJ2FzIG5vIGFkYXB0ZXIgc3BlY2lmaWVkJztcblxuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGBUaGVyZSBpcyBubyBzdWl0YWJsZSBhZGFwdGVyIHRvIGRpc3BhdGNoIHRoZSByZXF1ZXN0IGAgKyBzLFxuICAgICAgICAnRVJSX05PVF9TVVBQT1JUJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRhcHRlcjtcbiAgfSxcbiAgYWRhcHRlcnM6IGtub3duQWRhcHRlcnNcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRyYW5zZm9ybURhdGEgZnJvbSAnLi90cmFuc2Zvcm1EYXRhLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gXCIuLi9hZGFwdGVycy9hZGFwdGVycy5qc1wiO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29uZmlnLmhlYWRlcnMpO1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgY29uZmlnLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgaWYgKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXS5pbmRleE9mKGNvbmZpZy5tZXRob2QpICE9PSAtMSkge1xuICAgIGNvbmZpZy5oZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLCBmYWxzZSk7XG4gIH1cblxuICBjb25zdCBhZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcihjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyKTtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgIGNvbmZpZyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZWFzb24ucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufVxuIiwiZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBcIjEuNy45XCI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQge1ZFUlNJT059IGZyb20gJy4uL2Vudi9kYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKCh0eXBlLCBpKSA9PiB7XG4gIHZhbGlkYXRvcnNbdHlwZV0gPSBmdW5jdGlvbiB2YWxpZGF0b3IodGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSB0eXBlIHx8ICdhJyArIChpIDwgMSA/ICduICcgOiAnICcpICsgdHlwZTtcbiAgfTtcbn0pO1xuXG5jb25zdCBkZXByZWNhdGVkV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uYWwgb3B0aW9uIHZhbGlkYXRvclxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb258Ym9vbGVhbj99IHZhbGlkYXRvciAtIHNldCB0byBmYWxzZSBpZiB0aGUgdHJhbnNpdGlvbmFsIG9wdGlvbiBoYXMgYmVlbiByZW1vdmVkXG4gKiBAcGFyYW0ge3N0cmluZz99IHZlcnNpb24gLSBkZXByZWNhdGVkIHZlcnNpb24gLyByZW1vdmVkIHNpbmNlIHZlcnNpb25cbiAqIEBwYXJhbSB7c3RyaW5nP30gbWVzc2FnZSAtIHNvbWUgbWVzc2FnZSB3aXRoIGFkZGl0aW9uYWwgaW5mb1xuICpcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xudmFsaWRhdG9ycy50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG52YWxpZGF0b3JzLnNwZWxsaW5nID0gZnVuY3Rpb24gc3BlbGxpbmcoY29ycmVjdFNwZWxsaW5nKSB7XG4gIHJldHVybiAodmFsdWUsIG9wdCkgPT4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKGAke29wdH0gaXMgbGlrZWx5IGEgbWlzc3BlbGxpbmcgb2YgJHtjb3JyZWN0U3BlbGxpbmd9YCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGNvbnN0IG9wdCA9IGtleXNbaV07XG4gICAgY29uc3QgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSAnLi4vaGVscGVycy9idWlsZFVSTC5qcyc7XG5pbXBvcnQgSW50ZXJjZXB0b3JNYW5hZ2VyIGZyb20gJy4vSW50ZXJjZXB0b3JNYW5hZ2VyLmpzJztcbmltcG9ydCBkaXNwYXRjaFJlcXVlc3QgZnJvbSAnLi9kaXNwYXRjaFJlcXVlc3QuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSAnLi9idWlsZEZ1bGxQYXRoLmpzJztcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vaGVscGVycy92YWxpZGF0b3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuL0F4aW9zSGVhZGVycy5qcyc7XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teSA9IHt9O1xuXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID8gRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZHVtbXkpIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZHVtbXkuc3RhY2sgPyBkdW1teS5zdGFjay5yZXBsYWNlKC9eLitcXG4vLCAnJykgOiAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWVyci5zdGFjaykge1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gc3RhY2s7XG4gICAgICAgICAgICAvLyBtYXRjaCB3aXRob3V0IHRoZSAyIHRvcCBzdGFjayBsaW5lc1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhY2sgJiYgIVN0cmluZyhlcnIuc3RhY2spLmVuZHNXaXRoKHN0YWNrLnJlcGxhY2UoL14uK1xcbi4rXFxuLywgJycpKSkge1xuICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2tcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZ25vcmUgdGhlIGNhc2Ugd2hlcmUgXCJzdGFja1wiIGlzIGFuIHVuLXdyaXRhYmxlIHByb3BlcnR5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIF9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gICAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gICAgfVxuXG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGNvbnN0IHt0cmFuc2l0aW9uYWwsIHBhcmFtc1NlcmlhbGl6ZXIsIGhlYWRlcnN9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyYW1zU2VyaWFsaXplcikpIHtcbiAgICAgICAgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIgPSB7XG4gICAgICAgICAgc2VyaWFsaXplOiBwYXJhbXNTZXJpYWxpemVyXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcbiAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKGNvbmZpZywge1xuICAgICAgYmFzZVVybDogdmFsaWRhdG9ycy5zcGVsbGluZygnYmFzZVVSTCcpLFxuICAgICAgd2l0aFhzcmZUb2tlbjogdmFsaWRhdG9ycy5zcGVsbGluZygnd2l0aFhTUkZUb2tlbicpXG4gICAgfSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICAgIGNvbmZpZy5tZXRob2QgPSAoY29uZmlnLm1ldGhvZCB8fCB0aGlzLmRlZmF1bHRzLm1ldGhvZCB8fCAnZ2V0JykudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICAgIGxldCBjb250ZXh0SGVhZGVycyA9IGhlYWRlcnMgJiYgdXRpbHMubWVyZ2UoXG4gICAgICBoZWFkZXJzLmNvbW1vbixcbiAgICAgIGhlYWRlcnNbY29uZmlnLm1ldGhvZF1cbiAgICApO1xuXG4gICAgaGVhZGVycyAmJiB1dGlscy5mb3JFYWNoKFxuICAgICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgICAobWV0aG9kKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW21ldGhvZF07XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmNvbmNhdChjb250ZXh0SGVhZGVycywgaGVhZGVycyk7XG5cbiAgICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gICAgY29uc3QgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICBsZXQgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgbGV0IHByb21pc2U7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsZW47XG5cbiAgICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgICAgY29uc3QgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LmJpbmQodGhpcyksIHVuZGVmaW5lZF07XG4gICAgICBjaGFpbi51bnNoaWZ0LmFwcGx5KGNoYWluLCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBjaGFpbi5wdXNoLmFwcGx5KGNoYWluLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgbGVuID0gY2hhaW4ubGVuZ3RoO1xuXG4gICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW5baSsrXSwgY2hhaW5baSsrXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIGxlbiA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIGxldCBuZXdDb25maWcgPSBjb25maWc7XG5cbiAgICBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuICB9XG59XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBpc0Zvcm0gPyB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgICB9IDoge30sXG4gICAgICAgIHVybCxcbiAgICAgICAgZGF0YVxuICAgICAgfSkpO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL0NhbmNlbGVkRXJyb3IuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxUb2tlbn1cbiAqL1xuY2xhc3MgQ2FuY2VsVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbihjYW5jZWwgPT4ge1xuICAgICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgIGxldCBpID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIHRva2VuLl9saXN0ZW5lcnNbaV0oY2FuY2VsKTtcbiAgICAgIH1cbiAgICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbiA9IG9uZnVsZmlsbGVkID0+IHtcbiAgICAgIGxldCBfcmVzb2x2ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAgICovXG4gIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHRvQWJvcnRTaWduYWwoKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGNvbnN0IGFib3J0ID0gKGVycikgPT4ge1xuICAgICAgY29udHJvbGxlci5hYm9ydChlcnIpO1xuICAgIH07XG5cbiAgICB0aGlzLnN1YnNjcmliZShhYm9ydCk7XG5cbiAgICBjb250cm9sbGVyLnNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHRoaXMudW5zdWJzY3JpYmUoYWJvcnQpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuIiwiY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBTdGF0dXNDb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBDYW5jZWxUb2tlbiBmcm9tICcuL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuL2Vudi9kYXRhLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBzcHJlYWQgZnJvbSAnLi9oZWxwZXJzL3NwcmVhZC5qcyc7XG5pbXBvcnQgaXNBeGlvc0Vycm9yIGZyb20gJy4vaGVscGVycy9pc0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IEh0dHBTdGF0dXNDb2RlIGZyb20gJy4vaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycztcblxuYXhpb3MuZm9ybVRvSlNPTiA9IHRoaW5nID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGU7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxuLy8gdGhpcyBtb2R1bGUgc2hvdWxkIG9ubHkgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBheGlvc1xuIiwiaW1wb3J0IGF4aW9zIGZyb20gJy4vbGliL2F4aW9zLmpzJztcblxuLy8gVGhpcyBtb2R1bGUgaXMgaW50ZW5kZWQgdG8gdW53cmFwIEF4aW9zIGRlZmF1bHQgZXhwb3J0IGFzIG5hbWVkLlxuLy8gS2VlcCB0b3AtbGV2ZWwgZXhwb3J0IHNhbWUgd2l0aCBzdGF0aWMgcHJvcGVydGllc1xuLy8gc28gdGhhdCBpdCBjYW4ga2VlcCBzYW1lIHdpdGggZXMgbW9kdWxlIG9yIGNqc1xuY29uc3Qge1xuICBBeGlvcyxcbiAgQXhpb3NFcnJvcixcbiAgQ2FuY2VsZWRFcnJvcixcbiAgaXNDYW5jZWwsXG4gIENhbmNlbFRva2VuLFxuICBWRVJTSU9OLFxuICBhbGwsXG4gIENhbmNlbCxcbiAgaXNBeGlvc0Vycm9yLFxuICBzcHJlYWQsXG4gIHRvRm9ybURhdGEsXG4gIEF4aW9zSGVhZGVycyxcbiAgSHR0cFN0YXR1c0NvZGUsXG4gIGZvcm1Ub0pTT04sXG4gIGdldEFkYXB0ZXIsXG4gIG1lcmdlQ29uZmlnXG59ID0gYXhpb3M7XG5cbmV4cG9ydCB7XG4gIGF4aW9zIGFzIGRlZmF1bHQsXG4gIEF4aW9zLFxuICBBeGlvc0Vycm9yLFxuICBDYW5jZWxlZEVycm9yLFxuICBpc0NhbmNlbCxcbiAgQ2FuY2VsVG9rZW4sXG4gIFZFUlNJT04sXG4gIGFsbCxcbiAgQ2FuY2VsLFxuICBpc0F4aW9zRXJyb3IsXG4gIHNwcmVhZCxcbiAgdG9Gb3JtRGF0YSxcbiAgQXhpb3NIZWFkZXJzLFxuICBIdHRwU3RhdHVzQ29kZSxcbiAgZm9ybVRvSlNPTixcbiAgZ2V0QWRhcHRlcixcbiAgbWVyZ2VDb25maWdcbn1cbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIEFQSUVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBUElFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBUElFcnJvcihfYSkge1xuICAgICAgICB2YXIgc3RhdHVzID0gX2Euc3RhdHVzLCBzdGF0dXNUZXh0ID0gX2Euc3RhdHVzVGV4dCwgbWVzc2FnZSA9IF9hLm1lc3NhZ2UsIF9iID0gX2EuYm9keSwgYm9keSA9IF9iID09PSB2b2lkIDAgPyB7fSA6IF9iO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYm9keU1lc3NhZ2UgPSAnJztcbiAgICAgICAgdmFyIGVycm9yID0gJyc7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGJvZHlNZXNzYWdlID0gYm9keTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJvZHlNZXNzYWdlID0gKGJvZHkgPT09IG51bGwgfHwgYm9keSA9PT0gdm9pZCAwID8gdm9pZCAwIDogYm9keS5tZXNzYWdlKSB8fCAnJztcbiAgICAgICAgICAgIGVycm9yID0gKGJvZHkgPT09IG51bGwgfHwgYm9keSA9PT0gdm9pZCAwID8gdm9pZCAwIDogYm9keS5lcnJvcikgfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zdGFjayA9ICcnO1xuICAgICAgICBfdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIF90aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IGVycm9yIHx8IHN0YXR1c1RleHQgfHwgJyc7XG4gICAgICAgIF90aGlzLmRldGFpbHMgPSBib2R5TWVzc2FnZTtcbiAgICAgICAgX3RoaXMudHlwZSA9ICdNYWlsZ3VuQVBJRXJyb3InO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IgPSBmdW5jdGlvbiAoc3RhdHVzVGV4dCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoe1xuICAgICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgICBzdGF0dXNUZXh0OiBzdGF0dXNUZXh0LFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQVBJRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnQgZGVmYXVsdCBBUElFcnJvcjtcbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvci5qcyc7XG52YXIgQmxvYkZyb21TdHJlYW0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmxvYkZyb21TdHJlYW0oc3RyZWFtLCBzaXplKSB7XG4gICAgICAgIHRoaXMuX3N0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB9XG4gICAgQmxvYkZyb21TdHJlYW0ucHJvdG90eXBlLnN0cmVhbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmVhbTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCbG9iRnJvbVN0cmVhbS5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnQmxvYic7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gQmxvYkZyb21TdHJlYW07XG59KCkpO1xudmFyIEF0dGFjaG1lbnRzSGFuZGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdHRhY2htZW50c0hhbmRsZXIoKSB7XG4gICAgfVxuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuZ2V0QXR0YWNobWVudE9wdGlvbnMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXIgZmlsZW5hbWUgPSBpdGVtLmZpbGVuYW1lLCBjb250ZW50VHlwZSA9IGl0ZW0uY29udGVudFR5cGUsIGtub3duTGVuZ3RoID0gaXRlbS5rbm93bkxlbmd0aDtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCAoZmlsZW5hbWUgPyB7IGZpbGVuYW1lOiBmaWxlbmFtZSB9IDogeyBmaWxlbmFtZTogJ2ZpbGUnIH0pKSwgKGNvbnRlbnRUeXBlICYmIHsgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlIH0pKSwgKGtub3duTGVuZ3RoICYmIHsga25vd25MZW5ndGg6IGtub3duTGVuZ3RoIH0pKTtcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuZ2V0RmlsZUluZm8gPSBmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLm5hbWUsIGNvbnRlbnRUeXBlID0gZmlsZS50eXBlLCBrbm93bkxlbmd0aCA9IGZpbGUuc2l6ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZTogZmlsZW5hbWUsIGNvbnRlbnRUeXBlOiBjb250ZW50VHlwZSwga25vd25MZW5ndGg6IGtub3duTGVuZ3RoIH0pO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5nZXRDdXN0b21GaWxlSW5mbyA9IGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHZhciBmaWxlbmFtZSA9IGZpbGUuZmlsZW5hbWUsIGNvbnRlbnRUeXBlID0gZmlsZS5jb250ZW50VHlwZSwga25vd25MZW5ndGggPSBmaWxlLmtub3duTGVuZ3RoO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyh7IGZpbGVuYW1lOiBmaWxlbmFtZSwgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aDoga25vd25MZW5ndGggfSk7XG4gICAgfTtcbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmdldEJ1ZmZlckluZm8gPSBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgIHZhciBrbm93bkxlbmd0aCA9IGJ1ZmZlci5ieXRlTGVuZ3RoO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyh7IGZpbGVuYW1lOiAnZmlsZScsIGNvbnRlbnRUeXBlOiAnJywga25vd25MZW5ndGg6IGtub3duTGVuZ3RoIH0pO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5pc1N0cmVhbSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGRhdGEucGlwZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuaXNDdXN0b21GaWxlID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbiAgICAgICAgICAgICYmICEhb2JqLmRhdGE7XG4gICAgfTtcbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmlzQnJvd3NlckZpbGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAoISFvYmoubmFtZSB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpKTtcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuaXNCdWZmZXIgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQnVmZmVyLmlzQnVmZmVyKGRhdGEpO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5nZXRBdHRhY2htZW50SW5mbyA9IGZ1bmN0aW9uIChhdHRhY2htZW50KSB7XG4gICAgICAgIHZhciBpc0Jyb3dzZXJGaWxlID0gdGhpcy5pc0Jyb3dzZXJGaWxlKGF0dGFjaG1lbnQpO1xuICAgICAgICB2YXIgaXNDdXN0b21GaWxlID0gdGhpcy5pc0N1c3RvbUZpbGUoYXR0YWNobWVudCk7XG4gICAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiBhdHRhY2htZW50ID09PSAnc3RyaW5nJztcbiAgICAgICAgaWYgKCFpc1N0cmluZykge1xuICAgICAgICAgICAgaWYgKGlzQnJvd3NlckZpbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWxlSW5mbyhhdHRhY2htZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBCdWZmZXIuaXNCdWZmZXIoYXR0YWNobWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWZmZXJJbmZvKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQ3VzdG9tRmlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEN1c3RvbUZpbGVJbmZvKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgZmlsZW5hbWU6ICdmaWxlJyxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBrbm93bkxlbmd0aDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5jb252ZXJ0VG9GRGV4cGVjdGVkU2hhcGUgPSBmdW5jdGlvbiAodXNlclByb3ZpZGVkVmFsdWUpIHtcbiAgICAgICAgdmFyIGlzU3RyZWFtID0gdGhpcy5pc1N0cmVhbSh1c2VyUHJvdmlkZWRWYWx1ZSk7XG4gICAgICAgIHZhciBpc0Jyb3dzZXJGaWxlID0gdGhpcy5pc0Jyb3dzZXJGaWxlKHVzZXJQcm92aWRlZFZhbHVlKTtcbiAgICAgICAgdmFyIGlzQ3VzdG9tRmlsZSA9IHRoaXMuaXNDdXN0b21GaWxlKHVzZXJQcm92aWRlZFZhbHVlKTtcbiAgICAgICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHVzZXJQcm92aWRlZFZhbHVlID09PSAnc3RyaW5nJztcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgaWYgKGlzU3RyZWFtIHx8IGlzU3RyaW5nIHx8IGlzQnJvd3NlckZpbGUgfHwgdGhpcy5pc0J1ZmZlcih1c2VyUHJvdmlkZWRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHVzZXJQcm92aWRlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzQ3VzdG9tRmlsZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdXNlclByb3ZpZGVkVmFsdWUuZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXCJVbmtub3duIGF0dGFjaG1lbnQgdHlwZSBcIi5jb25jYXQodHlwZW9mIHVzZXJQcm92aWRlZFZhbHVlKSwgXCJUaGUgXFxcImF0dGFjaG1lbnRcXFwiIHByb3BlcnR5IGV4cGVjdHMgZWl0aGVyIEJ1ZmZlciwgQmxvYiwgb3IgU3RyaW5nLlxcbiAgICAgICAgICBBbHNvLCBJdCBpcyBwb3NzaWJsZSB0byBwcm92aWRlIGFuIG9iamVjdCB0aGF0IGhhcyB0aGUgcHJvcGVydHkgXFxcImRhdGFcXFwiIHdpdGggYSB2YWx1ZSB0aGF0IGlzIGVxdWFsIHRvIG9uZSBvZiB0aGUgdHlwZXMgY291bnRlZCBiZWZvcmUuXFxuICAgICAgICAgIEFkZGl0aW9uYWxseSwgeW91IG1heSB1c2UgYW4gYXJyYXkgdG8gc2VuZCBtb3JlIHRoYW4gb25lIGF0dGFjaG1lbnQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmdldEJsb2JGcm9tU3RyZWFtID0gZnVuY3Rpb24gKHN0cmVhbSwgc2l6ZSkge1xuICAgICAgICByZXR1cm4gbmV3IEJsb2JGcm9tU3RyZWFtKHN0cmVhbSwgc2l6ZSk7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0YWNobWVudHNIYW5kbGVyO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEF0dGFjaG1lbnRzSGFuZGxlcjtcbiIsImltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBBdHRhY2htZW50c0hhbmRsZXIgZnJvbSAnLi9BdHRhY2htZW50c0hhbmRsZXIuanMnO1xudmFyIEZvcm1EYXRhQnVpbGRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGb3JtRGF0YUJ1aWxkZXIoRm9ybURhdGFDb25zdHJ1Y3Rvcikge1xuICAgICAgICB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IgPSBGb3JtRGF0YUNvbnN0cnVjdG9yO1xuICAgICAgICB0aGlzLmZpbGVLZXlzID0gWydhdHRhY2htZW50JywgJ2lubGluZScsICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJ107XG4gICAgICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyID0gbmV3IEF0dGFjaG1lbnRzSGFuZGxlcigpO1xuICAgIH1cbiAgICBGb3JtRGF0YUJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZUZvcm1EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRhdGEgb2JqZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZvcm1EYXRhID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZGF0YVtrZXldOyB9KVxuICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAoZm9ybURhdGFBY2MsIGtleSkge1xuICAgICAgICAgICAgaWYgKF90aGlzLmZpbGVLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXR0YWNobWVudFZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc01lc3NhZ2VBdHRhY2htZW50KGF0dGFjaG1lbnRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkRmlsZXNUb0ZEKGtleSwgYXR0YWNobWVudFZhbHVlLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcIlVua25vd24gdmFsdWUgXCIuY29uY2F0KGRhdGFba2V5XSwgXCIgd2l0aCB0eXBlIFwiKS5jb25jYXQodHlwZW9mIGRhdGFba2V5XSwgXCIgZm9yIHByb3BlcnR5IFxcXCJcIikuY29uY2F0KGtleSwgXCJcXFwiXCIpLCBcIlRoZSBrZXkgXFxcIlwiLmNvbmNhdChrZXksIFwiXFxcIiBzaG91bGQgaGF2ZSB0eXBlIG9mIEJ1ZmZlciwgU3RyZWFtLCBGaWxlLCBvciBTdHJpbmcgXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdtZXNzYWdlJykgeyAvLyBtaW1lIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZVZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIGlmICghbWVzc2FnZVZhbHVlIHx8ICFfdGhpcy5pc01JTUUobWVzc2FnZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFwiVW5rbm93biBkYXRhIHR5cGUgZm9yIFxcXCJcIi5jb25jYXQoa2V5LCBcIlxcXCIgcHJvcGVydHlcIiksICdUaGUgbWltZSBkYXRhIHNob3VsZCBoYXZlIHR5cGUgb2YgQnVmZmVyLCBTdHJpbmcgb3IgQmxvYicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5hZGRNaW1lRGF0YVRvRkQoa2V5LCBtZXNzYWdlVmFsdWUsIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5hZGRDb21tb25Qcm9wZXJ0eVRvRkQoa2V5LCBkYXRhW2tleV0sIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgfSwgbmV3IHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvcigpKTtcbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhO1xuICAgIH07XG4gICAgRm9ybURhdGFCdWlsZGVyLnByb3RvdHlwZS5hZGRNaW1lRGF0YVRvRkQgPSBmdW5jdGlvbiAoa2V5LCBkYXRhLCBmb3JtRGF0YUluc3RhbmNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHsgLy8gaWYgc3RyaW5nIG9ubHkgdHdvIHBhcmFtZXRlcnMgc2hvdWxkIGJlIHVzZWQuXG4gICAgICAgICAgICBmb3JtRGF0YUluc3RhbmNlLmFwcGVuZChrZXksIGRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzRm9ybURhdGFQYWNrYWdlKGZvcm1EYXRhSW5zdGFuY2UpKSB7IC8vIGZvcm0tZGF0YSBwYWNrYWdlIGlzIHVzZWRcbiAgICAgICAgICAgIHZhciBub2RlRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlO1xuICAgICAgICAgICAgbm9kZUZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGEsIHsgZmlsZW5hbWU6ICdNaW1lTWVzc2FnZScgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBCbG9iICE9PSB1bmRlZmluZWQpIHsgLy8gZWl0aGVyIG5vZGUgPiAxOCBvciBicm93c2VyXG4gICAgICAgICAgICB2YXIgYnJvd3NlckZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZTsgLy8gQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGFcbiAgICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhLCAnTWltZU1lc3NhZ2UnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoZGF0YSkpIHsgLy8gbm9kZSBlbnZpcm9ubWVudFxuICAgICAgICAgICAgICAgIHZhciBibG9iSW5zdGFuY2UgPSBuZXcgQmxvYihbZGF0YV0pO1xuICAgICAgICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBibG9iSW5zdGFuY2UsICdNaW1lTWVzc2FnZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBGb3JtRGF0YUJ1aWxkZXIucHJvdG90eXBlLmlzTUlNRSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgIHx8ICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihkYXRhKVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBSZWFkYWJsZVN0cmVhbSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YSBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtKTtcbiAgICB9O1xuICAgIEZvcm1EYXRhQnVpbGRlci5wcm90b3R5cGUuaXNGb3JtRGF0YVBhY2thZ2UgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgJiYgb2JqICE9PSBudWxsXG4gICAgICAgICAgICAmJiB0eXBlb2Ygb2JqLmdldEhlYWRlcnMgPT09ICdmdW5jdGlvbic7XG4gICAgfTtcbiAgICBGb3JtRGF0YUJ1aWxkZXIucHJvdG90eXBlLmlzTWVzc2FnZUF0dGFjaG1lbnQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0N1c3RvbUZpbGUodmFsdWUpXG4gICAgICAgICAgICB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICB8fCAodHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgRmlsZSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIodmFsdWUpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbSh2YWx1ZSlcbiAgICAgICAgICAgIHx8IChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeShmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQ3VzdG9tRmlsZShpdGVtKVxuICAgICAgICAgICAgICAgIHx8ICh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSBpbnN0YW5jZW9mIEZpbGUpXG4gICAgICAgICAgICAgICAgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICAgICAgICAgICAgfHwgX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGl0ZW0pXG4gICAgICAgICAgICAgICAgfHwgX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKGl0ZW0pOyB9KSkpO1xuICAgIH07XG4gICAgRm9ybURhdGFCdWlsZGVyLnByb3RvdHlwZS5hZGRGaWxlc1RvRkQgPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lLCB2YWx1ZSwgZm9ybURhdGFJbnN0YW5jZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYXBwZW5kRmlsZVRvRkQgPSBmdW5jdGlvbiAob3JpZ2luYWxLZXksIGF0dGFjaG1lbnQsIGZvcm1EYXRhKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gb3JpZ2luYWxLZXkgPT09ICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJyA/ICdmaWxlJyA6IG9yaWdpbmFsS2V5O1xuICAgICAgICAgICAgdmFyIG9iakRhdGEgPSBfdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuY29udmVydFRvRkRleHBlY3RlZFNoYXBlKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBfdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuZ2V0QXR0YWNobWVudEluZm8oYXR0YWNobWVudCk7XG4gICAgICAgICAgICBpZiAoX3RoaXMuaXNGb3JtRGF0YVBhY2thZ2UoZm9ybURhdGEpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZkID0gZm9ybURhdGE7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0eXBlb2Ygb2JqRGF0YSA9PT0gJ3N0cmluZycgPyBCdWZmZXIuZnJvbShvYmpEYXRhKSA6IG9iakRhdGE7XG4gICAgICAgICAgICAgICAgZmQuYXBwZW5kKGtleSwgZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBCbG9iICE9PSB1bmRlZmluZWQpIHsgLy8gZWl0aGVyIG5vZGUgPiAxOCBvciBicm93c2VyXG4gICAgICAgICAgICAgICAgdmFyIGJyb3dzZXJGb3JtRGF0YSA9IGZvcm1EYXRhSW5zdGFuY2U7IC8vIEJyb3dzZXIgY29tcGxpYW50IEZvcm1EYXRhXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpEYXRhID09PSAnc3RyaW5nJyB8fCBfdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIob2JqRGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJsb2JJbnN0YW5jZSA9IG5ldyBCbG9iKFtvYmpEYXRhXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBibG9iSW5zdGFuY2UsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvYmpEYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgb2JqRGF0YSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShvYmpEYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmxvYiA9IF90aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5nZXRCbG9iRnJvbVN0cmVhbShvYmpEYXRhLCBvcHRpb25zLmtub3duTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJvd3NlckZvcm1EYXRhLnNldChrZXksIGJsb2IsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCBpdGVtLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCB2YWx1ZSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEZvcm1EYXRhQnVpbGRlci5wcm90b3R5cGUuYWRkQ29tbW9uUHJvcGVydHlUb0ZEID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIGZvcm1EYXRhQWNjKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBhZGRWYWx1ZUJhc2VkT25GRCA9IGZ1bmN0aW9uIChmZEtleSwgZmRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKF90aGlzLmlzRm9ybURhdGFQYWNrYWdlKGZvcm1EYXRhQWNjKSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZmRWYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgcmVjZWl2ZWQgdmFsdWUgaXMgYW4gb2JqZWN0LiBcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICArICdcIkpTT04uU3RyaW5naWZ5XCIgd2lsbCBiZSB1c2VkIHRvIGF2b2lkIFR5cGVFcnJvciBcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICArICdUbyByZW1vdmUgdGhpcyB3YXJuaW5nOiBcXG4nXG4gICAgICAgICAgICAgICAgICAgICAgICArICdDb25zaWRlciBzd2l0Y2hpbmcgdG8gYnVpbHQtaW4gRm9ybURhdGEgb3IgY29udmVydGluZyB0aGUgdmFsdWUgb24geW91ciBvd24uXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIEpTT04uc3RyaW5naWZ5KGZkVmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgZmRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGZkVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgZmRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIEJsb2IgIT09IHVuZGVmaW5lZCAmJiBmZFZhbHVlIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIGZkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignVW5rbm93biB2YWx1ZSB0eXBlIGZvciBGb3JtIERhdGEuIFN0cmluZyBvciBCbG9iIGV4cGVjdGVkJywgJ0Jyb3dzZXIgY29tcGxpYW50IEZvcm1EYXRhIGFsbG93cyBvbmx5IHN0cmluZyBvciBCbG9iIHZhbHVlcyBmb3IgcHJvcGVydGllcyB0aGF0IGFyZSBub3QgYXR0YWNobWVudHMuJyk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGFkZFZhbHVlQmFzZWRPbkZEKGtleSwgaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBhZGRWYWx1ZUJhc2VkT25GRChrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEZvcm1EYXRhQnVpbGRlcjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBGb3JtRGF0YUJ1aWxkZXI7XG4iLCJ2YXIgU3ViYWNjb3VudHNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3ViYWNjb3VudHNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBTdWJhY2NvdW50c0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3Y1L2FjY291bnRzL3N1YmFjY291bnRzJywgcXVlcnkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBTdWJhY2NvdW50c0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y1L2FjY291bnRzL3N1YmFjY291bnRzL1wiLmNvbmNhdChpZCkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBTdWJhY2NvdW50c0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMnLCB7IG5hbWU6IG5hbWUgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIFN1YmFjY291bnRzQ2xpZW50LnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KFwiL3Y1L2FjY291bnRzL3N1YmFjY291bnRzL1wiLmNvbmNhdChpZCwgXCIvZW5hYmxlXCIpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pO1xuICAgIH07XG4gICAgU3ViYWNjb3VudHNDbGllbnQucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KFwiL3Y1L2FjY291bnRzL3N1YmFjY291bnRzL1wiLmNvbmNhdChpZCwgXCIvZGlzYWJsZVwiKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIFN1YmFjY291bnRzQ2xpZW50LlNVQkFDQ09VTlRfSEVBREVSID0gJ1gtTWFpbGd1bi1Pbi1CZWhhbGYtT2YnO1xuICAgIHJldHVybiBTdWJhY2NvdW50c0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBTdWJhY2NvdW50c0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSAnYmFzZS02NCc7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgYXhpb3MsIHsgQXhpb3NIZWFkZXJzLCB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBGb3JtRGF0YUJ1aWxkZXIgZnJvbSAnLi9Gb3JtRGF0YUJ1aWxkZXIuanMnO1xuaW1wb3J0IFN1YmFjY291bnRzQ2xpZW50IGZyb20gJy4uL1N1YmFjY291bnRzLmpzJztcbnZhciBSZXF1ZXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlcXVlc3Qob3B0aW9ucywgZm9ybURhdGEpIHtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IG9wdGlvbnMudXNlcm5hbWU7XG4gICAgICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXk7XG4gICAgICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmw7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3Qob3B0aW9ucy5oZWFkZXJzKTtcbiAgICAgICAgdGhpcy5mb3JtRGF0YUJ1aWxkZXIgPSBuZXcgRm9ybURhdGFCdWlsZGVyKGZvcm1EYXRhKTtcbiAgICAgICAgdGhpcy5tYXhCb2R5TGVuZ3RoID0gNTI0Mjg4MDA7IC8vIDUwIE1CXG4gICAgICAgIHRoaXMucHJveHkgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucHJveHk7XG4gICAgfVxuICAgIFJlcXVlc3QucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiAobWV0aG9kLCB1cmwsIG9uQ2FsbE9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMsIHJlcXVlc3RIZWFkZXJzLCBwYXJhbXMsIGJvZHksIHJlc3BvbnNlLCB1cmxWYWx1ZSwgZXJyXzEsIGVycm9yUmVzcG9uc2UsIHJlcztcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2QubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IF9fYXNzaWduKHt9LCBvbkNhbGxPcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdHJ1ZSA6IGRlbGV0ZSBvcHRpb25zLmhlYWRlcnM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SGVhZGVycyA9IHRoaXMuam9pbkFuZFRyYW5zZm9ybUhlYWRlcnMob25DYWxsT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMgPSBfX2Fzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5xdWVyeSkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnF1ZXJ5KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5xdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuZGF0YSA9IGJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5ib2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsVmFsdWUgPSB1cmxqb2luKHRoaXMudXJsLCB1cmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2QubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfZC50cnlzLnB1c2goWzEsIDMsICwgNF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgYXhpb3MucmVxdWVzdChfX2Fzc2lnbihfX2Fzc2lnbih7IG1ldGhvZDogbWV0aG9kLnRvTG9jYWxlVXBwZXJDYXNlKCksIHRpbWVvdXQ6IHRoaXMudGltZW91dCwgdXJsOiB1cmxWYWx1ZSwgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMgfSwgcGFyYW1zKSwgeyBtYXhCb2R5TGVuZ3RoOiB0aGlzLm1heEJvZHlMZW5ndGgsIHByb3h5OiB0aGlzLnByb3h5IH0pKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Quc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycl8xID0gX2Quc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JSZXNwb25zZSA9IGVycl8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICgoX2EgPSBlcnJvclJlc3BvbnNlID09PSBudWxsIHx8IGVycm9yUmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9yUmVzcG9uc2UucmVzcG9uc2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zdGF0dXMpIHx8IDQwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiAoKF9iID0gZXJyb3JSZXNwb25zZSA9PT0gbnVsbCB8fCBlcnJvclJlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlcnJvclJlc3BvbnNlLnJlc3BvbnNlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iuc3RhdHVzVGV4dCkgfHwgZXJyb3JSZXNwb25zZS5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6ICgoX2MgPSBlcnJvclJlc3BvbnNlID09PSBudWxsIHx8IGVycm9yUmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9yUmVzcG9uc2UucmVzcG9uc2UpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5kYXRhKSB8fCBlcnJvclJlc3BvbnNlLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9kLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLmdldFJlc3BvbnNlQm9keSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYm9keToge30sXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2UgPT09IG51bGwgfHwgcmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5kYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YSA9PT0gJ01haWxndW4gTWFnbmlmaWNlbnQgQVBJJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiAnSW5jb3JyZWN0IHVybCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzLmJvZHkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXMuYm9keSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUuam9pbkFuZFRyYW5zZm9ybUhlYWRlcnMgPSBmdW5jdGlvbiAob25DYWxsT3B0aW9ucykge1xuICAgICAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBuZXcgQXhpb3NIZWFkZXJzKCk7XG4gICAgICAgIHZhciBiYXNpYyA9IGJhc2U2NC5lbmNvZGUoXCJcIi5jb25jYXQodGhpcy51c2VybmFtZSwgXCI6XCIpLmNvbmNhdCh0aGlzLmtleSkpO1xuICAgICAgICByZXF1ZXN0SGVhZGVycy5zZXRBdXRob3JpemF0aW9uKFwiQmFzaWMgXCIuY29uY2F0KGJhc2ljKSk7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzLnNldCh0aGlzLmhlYWRlcnMpO1xuICAgICAgICB2YXIgcmVjZWl2ZWRPbkNhbGxIZWFkZXJzID0gb25DYWxsT3B0aW9ucyAmJiBvbkNhbGxPcHRpb25zLmhlYWRlcnM7XG4gICAgICAgIHZhciBvbkNhbGxIZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3QocmVjZWl2ZWRPbkNhbGxIZWFkZXJzKTtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnMuc2V0KG9uQ2FsbEhlYWRlcnMpO1xuICAgICAgICByZXR1cm4gcmVxdWVzdEhlYWRlcnM7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5tYWtlSGVhZGVyc0Zyb21PYmplY3QgPSBmdW5jdGlvbiAoaGVhZGVyc09iamVjdCkge1xuICAgICAgICBpZiAoaGVhZGVyc09iamVjdCA9PT0gdm9pZCAwKSB7IGhlYWRlcnNPYmplY3QgPSB7fTsgfVxuICAgICAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBuZXcgQXhpb3NIZWFkZXJzKCk7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzID0gT2JqZWN0LmVudHJpZXMoaGVhZGVyc09iamVjdCkucmVkdWNlKGZ1bmN0aW9uIChoZWFkZXJzQWNjdW11bGF0b3IsIGN1cnJlbnRQYWlyKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gY3VycmVudFBhaXJbMF0sIHZhbHVlID0gY3VycmVudFBhaXJbMV07XG4gICAgICAgICAgICBoZWFkZXJzQWNjdW11bGF0b3Iuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIGhlYWRlcnNBY2N1bXVsYXRvcjtcbiAgICAgICAgfSwgcmVxdWVzdEhlYWRlcnMpO1xuICAgICAgICByZXR1cm4gcmVxdWVzdEhlYWRlcnM7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5zZXRTdWJhY2NvdW50SGVhZGVyID0gZnVuY3Rpb24gKHN1YmFjY291bnRJZCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHZhciBoZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3QoX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMuaGVhZGVycyksIChfYSA9IHt9LCBfYVtTdWJhY2NvdW50c0NsaWVudC5TVUJBQ0NPVU5UX0hFQURFUl0gPSBzdWJhY2NvdW50SWQsIF9hKSkpO1xuICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KGhlYWRlcnMpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUucmVzZXRTdWJhY2NvdW50SGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmhlYWRlcnMuZGVsZXRlKFN1YmFjY291bnRzQ2xpZW50LlNVQkFDQ09VTlRfSEVBREVSKTtcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBxdWVyeSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCBfX2Fzc2lnbih7IHF1ZXJ5OiBxdWVyeSB9LCBvcHRpb25zKSk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5jb21tYW5kID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBkYXRhLCBvcHRpb25zLCBhZGREZWZhdWx0SGVhZGVycykge1xuICAgICAgICBpZiAoYWRkRGVmYXVsdEhlYWRlcnMgPT09IHZvaWQgMCkgeyBhZGREZWZhdWx0SGVhZGVycyA9IHRydWU7IH1cbiAgICAgICAgdmFyIGhlYWRlcnMgPSB7fTtcbiAgICAgICAgaWYgKGFkZERlZmF1bHRIZWFkZXJzKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVxdWVzdE9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgaGVhZGVycyksIHsgYm9keTogZGF0YSB9KSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHJlcXVlc3RPcHRpb25zKTtcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh1cmwsIHF1ZXJ5LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5KCdnZXQnLCB1cmwsIHF1ZXJ5LCBvcHRpb25zKTtcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUucG9zdFdpdGhGRCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEpIHtcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5wdXRXaXRoRkQgPSBmdW5jdGlvbiAodXJsLCBkYXRhKSB7XG4gICAgICAgIHZhciBmb3JtRGF0YSA9IHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5wYXRjaFdpdGhGRCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEpIHtcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3BhdGNoJywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUucHV0ID0gZnVuY3Rpb24gKHVybCwgZGF0YSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdkZWxldGUnLCB1cmwsIGRhdGEpO1xuICAgIH07XG4gICAgcmV0dXJuIFJlcXVlc3Q7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xudmFyIERvbWFpbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb21haW4oZGF0YSwgcmVjZWl2aW5nLCBzZW5kaW5nKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlX3RscyA9IGRhdGEucmVxdWlyZV90bHM7XG4gICAgICAgIHRoaXMuc2tpcF92ZXJpZmljYXRpb24gPSBkYXRhLnNraXBfdmVyaWZpY2F0aW9uO1xuICAgICAgICB0aGlzLnN0YXRlID0gZGF0YS5zdGF0ZTtcbiAgICAgICAgdGhpcy53aWxkY2FyZCA9IGRhdGEud2lsZGNhcmQ7XG4gICAgICAgIHRoaXMuc3BhbV9hY3Rpb24gPSBkYXRhLnNwYW1fYWN0aW9uO1xuICAgICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgICAgICB0aGlzLnNtdHBfcGFzc3dvcmQgPSBkYXRhLnNtdHBfcGFzc3dvcmQ7XG4gICAgICAgIHRoaXMuc210cF9sb2dpbiA9IGRhdGEuc210cF9sb2dpbjtcbiAgICAgICAgdGhpcy50eXBlID0gZGF0YS50eXBlO1xuICAgICAgICB0aGlzLnJlY2VpdmluZ19kbnNfcmVjb3JkcyA9IHJlY2VpdmluZyB8fCBudWxsO1xuICAgICAgICB0aGlzLnNlbmRpbmdfZG5zX3JlY29yZHMgPSBzZW5kaW5nIHx8IG51bGw7XG4gICAgICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgICAgICB0aGlzLmlzX2Rpc2FibGVkID0gZGF0YS5pc19kaXNhYmxlZDtcbiAgICAgICAgdGhpcy53ZWJfcHJlZml4ID0gZGF0YS53ZWJfcHJlZml4O1xuICAgICAgICB0aGlzLndlYl9zY2hlbWUgPSBkYXRhLndlYl9zY2hlbWU7XG4gICAgICAgIHRoaXMudXNlX2F1dG9tYXRpY19zZW5kZXJfc2VjdXJpdHkgPSBkYXRhLnVzZV9hdXRvbWF0aWNfc2VuZGVyX3NlY3VyaXR5O1xuICAgICAgICAvKlxuICAgICAgICAgIGRvbWFpbiBnZXQgYW5kIHVwZGF0ZSBtZXRob2RzIG1heSBoYXZlIHJpY2hlciByZXNwb25zZSB0aGFuIGNyZWF0ZSBtZXRob2QuXG4gICAgICAgICovXG4gICAgICAgIHZhciBkeW5hbWljS2V5cyA9IFsnZGtpbV9ob3N0JywgJ21haWxmcm9tX2hvc3QnXTtcbiAgICAgICAgdmFyIGR5bmFtaWNQcm9wZXJ0aWVzID0gZHluYW1pY0tleXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgaWYgKGRhdGFbcHJvcGVydHlOYW1lXSkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wID0gcHJvcGVydHlOYW1lO1xuICAgICAgICAgICAgICAgIGFjY1twcm9wXSA9IGRhdGFbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkeW5hbWljUHJvcGVydGllcyk7XG4gICAgfVxuICAgIHJldHVybiBEb21haW47XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgRG9tYWluO1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3IuanMnO1xuaW1wb3J0IERvbWFpbiBmcm9tICcuL2RvbWFpbi5qcyc7XG52YXIgRG9tYWluc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb21haW5zQ2xpZW50KHJlcXVlc3QsIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LCBkb21haW5UZW1wbGF0ZXNDbGllbnQsIGRvbWFpblRhZ3NDbGllbnQsIGRvbWFpblRyYWNraW5nLCBsb2dnZXIpIHtcbiAgICAgICAgaWYgKGxvZ2dlciA9PT0gdm9pZCAwKSB7IGxvZ2dlciA9IGNvbnNvbGU7IH1cbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5kb21haW5DcmVkZW50aWFscyA9IGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50O1xuICAgICAgICB0aGlzLmRvbWFpblRlbXBsYXRlcyA9IGRvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgICAgICAgdGhpcy5kb21haW5UYWdzID0gZG9tYWluVGFnc0NsaWVudDtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHRoaXMuZG9tYWluVHJhY2tpbmcgPSBkb21haW5UcmFja2luZztcbiAgICB9XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuX2hhbmRsZUJvb2xWYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcHJvcHNGb3JSZXBsYWNlbWVudCA9IGRhdGE7XG4gICAgICAgIHZhciByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICAgICAgdmFyIHByb3AgPSBrZXk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF07XG4gICAgICAgICAgICAgICAgYWNjW3Byb3BdID0gKHZhbHVlLnRvU3RyaW5nKCkgPT09ICd0cnVlJykgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgICAgICByZXR1cm4gX19hc3NpZ24oX19hc3NpZ24oe30sIGRhdGEpLCByZXBsYWNlZFByb3BzKTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLl9wYXJzZU1lc3NhZ2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5wYXJzZURvbWFpbkxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmJvZHkgJiYgcmVzcG9uc2UuYm9keS5pdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEb21haW4oaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VEb21haW4gPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb21haW4ocmVzcG9uc2UuYm9keS5kb21haW4sIHJlc3BvbnNlLmJvZHkucmVjZWl2aW5nX2Ruc19yZWNvcmRzLCByZXNwb25zZS5ib2R5LnNlbmRpbmdfZG5zX3JlY29yZHMpO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2RvbWFpbnMnLCBxdWVyeSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLnBhcnNlRG9tYWluTGlzdChyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkb21haW4sIHF1ZXJ5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHZhciBwcmVwYXJlZFF1ZXJ5ID0gcXVlcnkgPyB7XG4gICAgICAgICAgICAnaDpleHRlbmRlZCc6IChfYSA9IHF1ZXJ5ID09PSBudWxsIHx8IHF1ZXJ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBxdWVyeS5leHRlbmRlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmFsc2UsXG4gICAgICAgICAgICAnaDp3aXRoX2Rucyc6IChfYiA9IHF1ZXJ5ID09PSBudWxsIHx8IHF1ZXJ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBxdWVyeS53aXRoX2RucykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogdHJ1ZSxcbiAgICAgICAgfSA6IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChcIi92NC9kb21haW5zL1wiLmNvbmNhdChkb21haW4pLCBwcmVwYXJlZFF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlRG9tYWluKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHBvc3RPYmogPSB0aGlzLl9oYW5kbGVCb29sVmFsdWVzKGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92NC9kb21haW5zJywgcG9zdE9iailcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLl9wYXJzZURvbWFpbihyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHB1dERhdGEgPSB0aGlzLl9oYW5kbGVCb29sVmFsdWVzKGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChcIi92NC9kb21haW5zL1wiLmNvbmNhdChkb21haW4pLCBwdXREYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlRG9tYWluKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUudmVyaWZ5ID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChcIi92NC9kb21haW5zL1wiLmNvbmNhdChkb21haW4sIFwiL3ZlcmlmeVwiKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLl9wYXJzZURvbWFpbihyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZG9tYWluKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiL3YzL2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbikpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VNZXNzYWdlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuZ2V0Q29ubmVjdGlvbiA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoXCIvdjMvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluLCBcIi9jb25uZWN0aW9uXCIpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzOyB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUudXBkYXRlQ29ubmVjdGlvbiA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoXCIvdjMvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluLCBcIi9jb25uZWN0aW9uXCIpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzOyB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pO1xuICAgIH07XG4gICAgLy8gVHJhY2tpbmdcbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkICdkb21haW5zLmdldFRyYWNraW5nJyBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAqIFBsZWFzZSB1c2UgJ2RvbWFpbnMuZG9tYWluVHJhY2tpbmcuZ2V0VHJhY2tpbmcnIGluc3RlYWQuXG4gICAgKi9cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5nZXRUcmFja2luZyA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIlxcbiAgICAgICdkb21haW5zLmdldFRyYWNraW5nJyBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSAnZG9tYWlucy5kb21haW5UcmFja2luZy5nZXRUcmFja2luZycgaW5zdGVhZC5cXG4gICAgXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb21haW5UcmFja2luZy5nZXRUcmFja2luZyhkb21haW4pO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCAnZG9tYWlucy51cGRhdGVUcmFja2luZycgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQuXG4gICAgKiBQbGVhc2UgdXNlICdkb21haW5zLmRvbWFpblRyYWNraW5nLnVwZGF0ZVRyYWNraW5nJyBpbnN0ZWFkLlxuICAgICovXG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUudXBkYXRlVHJhY2tpbmcgPSBmdW5jdGlvbiAoZG9tYWluLCB0eXBlLCBkYXRhKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJcXG4gICAgICAnZG9tYWlucy51cGRhdGVUcmFja2luZycgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgJ2RvbWFpbnMuZG9tYWluVHJhY2tpbmcudXBkYXRlVHJhY2tpbmcnIGluc3RlYWQuXFxuICAgIFwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tYWluVHJhY2tpbmcudXBkYXRlVHJhY2tpbmcoZG9tYWluLCB0eXBlLCBkYXRhKTtcbiAgICB9O1xuICAgIC8vIElQc1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLmdldElwc1wiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICAgKi9cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5nZXRJcHMgPSBmdW5jdGlvbiAoZG9tYWluKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy5nZXRJcHNcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgdmFyIF9hOyByZXR1cm4gKF9hID0gcmVzcG9uc2UgPT09IG51bGwgfHwgcmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc3BvbnNlLmJvZHkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pdGVtczsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkIFwiZG9tYWlucy5hc3NpZ25JcFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICAgKi9cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5hc3NpZ25JcCA9IGZ1bmN0aW9uIChkb21haW4sIGlwKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy5hc3NpZ25JcFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgaXA6IGlwIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMuZGVsZXRlSXBcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgbW92ZWQgdG8gdGhlIElwc0NsaWVudC5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmRlbGV0ZUlwID0gZnVuY3Rpb24gKGRvbWFpbiwgaXApIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLmRlbGV0ZUlwXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgbW92ZWQgaW50byB0aGUgSXBzQ2xpZW50IGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJywgaXApKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLmxpbmtJcFBvb2xcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZFxuICAgICogaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmxpbmtJcFBvb2wgPSBmdW5jdGlvbiAoZG9tYWluLCBwb29sSWQpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLmxpbmtJcFBvb2xcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBwb29sX2lkOiBwb29sSWQgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkIFwiZG9tYWlucy51bmxpbmtJcFBvbGxcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgbW92ZWQgaW50byB0aGUgSXBzQ2xpZW50XG4gICAgKiBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLlxuICAgICovXG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUudW5saW5rSXBQb2xsID0gZnVuY3Rpb24gKGRvbWFpbiwgcmVwbGFjZW1lbnQpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLnVubGlua0lwUG9sbFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSBtb3ZlZCBpbnRvIHRoZSBJcHNDbGllbnQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9ICcnO1xuICAgICAgICBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCAmJiByZXBsYWNlbWVudC5pcCkge1xuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignVG9vIG11Y2ggZGF0YSBmb3IgcmVwbGFjZW1lbnQnLCAnUGxlYXNlIHNwZWNpZnkgZWl0aGVyIHBvb2xfaWQgb3IgaXAgKG5vdCBib3RoKScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQpIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcyA9IFwiP3Bvb2xfaWQ9XCIuY29uY2F0KHJlcGxhY2VtZW50LnBvb2xfaWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMgPSBcIj9pcD1cIi5jb25jYXQocmVwbGFjZW1lbnQuaXApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJywgJ2lwX3Bvb2wnLCBzZWFyY2hQYXJhbXMpKTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLnVwZGF0ZURLSU1BdXRob3JpdHkgPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KFwiL3YzL2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbiwgXCIvZGtpbV9hdXRob3JpdHlcIiksIHt9LCB7IHF1ZXJ5OiBcInNlbGY9XCIuY29uY2F0KGRhdGEuc2VsZikgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlczsgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLnVwZGF0ZURLSU1TZWxlY3RvciA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlcztcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnB1dChcIi92My9kb21haW5zL1wiLmNvbmNhdChkb21haW4sIFwiL2RraW1fc2VsZWN0b3JcIiksIHt9LCB7IHF1ZXJ5OiBcImRraW1fc2VsZWN0b3I9XCIuY29uY2F0KGRhdGEuZGtpbVNlbGVjdG9yKSB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogKF9hID0gcmVzID09PSBudWxsIHx8IHJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzLmJvZHkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMudXBkYXRlV2ViUHJlZml4XCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQuXG4gICAgKiBQbGVhc2UgdXNlIGRvbWFpbnMudXBkYXRlIHRvIHNldCBuZXcgXCJ3ZWJfcHJlZml4XCIuXG4gICAgKiBDdXJyZW50IG1ldGhvZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLnVwZGF0ZVdlYlByZWZpeCA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLnVwZGF0ZVdlYlByZWZpeFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGRvbWFpbnMudXBkYXRlIHRvIHNldCBuZXcgXCJ3ZWJfcHJlZml4XCIuIEN1cnJlbnQgbWV0aG9kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChcIi92My9kb21haW5zL1wiLmNvbmNhdChkb21haW4sIFwiL3dlYl9wcmVmaXhcIiksIHt9LCB7IHF1ZXJ5OiBcIndlYl9wcmVmaXg9XCIuY29uY2F0KGRhdGEud2ViUHJlZml4KSB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEb21haW5zQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IERvbWFpbnNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3IuanMnO1xudmFyIE5hdmlnYXRpb25UaHJ1UGFnZXMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2aWdhdGlvblRocnVQYWdlcyhyZXF1ZXN0KSB7XG4gICAgICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB9XG4gICAgfVxuICAgIE5hdmlnYXRpb25UaHJ1UGFnZXMucHJvdG90eXBlLnBhcnNlUGFnZSA9IGZ1bmN0aW9uIChpZCwgcGFnZVVybCwgdXJsU2VwYXJhdG9yLCBpdGVyYXRvck5hbWUpIHtcbiAgICAgICAgdmFyIHBhcnNlZFVybCA9IG5ldyBVUkwocGFnZVVybCk7XG4gICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSBwYXJzZWRVcmwuc2VhcmNoUGFyYW1zO1xuICAgICAgICB2YXIgcGFnZVZhbHVlID0gcGFnZVVybCAmJiB0eXBlb2YgcGFnZVVybCA9PT0gJ3N0cmluZycgPyBwYWdlVXJsLnNwbGl0KHVybFNlcGFyYXRvcikucG9wKCkgfHwgJycgOiAnJztcbiAgICAgICAgdmFyIGl0ZXJhdG9yUG9zaXRpb24gPSBudWxsO1xuICAgICAgICBpZiAoaXRlcmF0b3JOYW1lKSB7XG4gICAgICAgICAgICBpdGVyYXRvclBvc2l0aW9uID0gc2VhcmNoUGFyYW1zLmhhcyhpdGVyYXRvck5hbWUpXG4gICAgICAgICAgICAgICAgPyBzZWFyY2hQYXJhbXMuZ2V0KGl0ZXJhdG9yTmFtZSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgcGFnZTogdXJsU2VwYXJhdG9yID09PSAnPycgPyBcIj9cIi5jb25jYXQocGFnZVZhbHVlKSA6IHBhZ2VWYWx1ZSxcbiAgICAgICAgICAgIGl0ZXJhdG9yUG9zaXRpb246IGl0ZXJhdG9yUG9zaXRpb24sXG4gICAgICAgICAgICB1cmw6IHBhZ2VVcmxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE5hdmlnYXRpb25UaHJ1UGFnZXMucHJvdG90eXBlLnBhcnNlUGFnZUxpbmtzID0gZnVuY3Rpb24gKHJlc3BvbnNlLCB1cmxTZXBhcmF0b3IsIGl0ZXJhdG9yTmFtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGFnZXMgPSBPYmplY3QuZW50cmllcyhyZXNwb25zZS5ib2R5LnBhZ2luZyk7XG4gICAgICAgIHJldHVybiBwYWdlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgX2EpIHtcbiAgICAgICAgICAgIHZhciBpZCA9IF9hWzBdLCBwYWdlVXJsID0gX2FbMV07XG4gICAgICAgICAgICBhY2NbaWRdID0gX3RoaXMucGFyc2VQYWdlKGlkLCBwYWdlVXJsLCB1cmxTZXBhcmF0b3IsIGl0ZXJhdG9yTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgfTtcbiAgICBOYXZpZ2F0aW9uVGhydVBhZ2VzLnByb3RvdHlwZS51cGRhdGVVcmxBbmRRdWVyeSA9IGZ1bmN0aW9uIChjbGllbnRVcmwsIHF1ZXJ5KSB7XG4gICAgICAgIHZhciB1cmwgPSBjbGllbnRVcmw7XG4gICAgICAgIHZhciBxdWVyeUNvcHkgPSBfX2Fzc2lnbih7fSwgcXVlcnkpO1xuICAgICAgICBpZiAocXVlcnlDb3B5LnBhZ2UpIHtcbiAgICAgICAgICAgIHVybCA9IHVybGpvaW4oY2xpZW50VXJsLCBxdWVyeUNvcHkucGFnZSk7XG4gICAgICAgICAgICBkZWxldGUgcXVlcnlDb3B5LnBhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgdXBkYXRlZFF1ZXJ5OiBxdWVyeUNvcHlcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE5hdmlnYXRpb25UaHJ1UGFnZXMucHJvdG90eXBlLnJlcXVlc3RMaXN0V2l0aFBhZ2VzID0gZnVuY3Rpb24gKGNsaWVudFVybCwgcXVlcnksIE1vZGVsKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSwgdXJsLCB1cGRhdGVkUXVlcnksIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSB0aGlzLnVwZGF0ZVVybEFuZFF1ZXJ5KGNsaWVudFVybCwgcXVlcnkpLCB1cmwgPSBfYS51cmwsIHVwZGF0ZWRRdWVyeSA9IF9hLnVwZGF0ZWRRdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZXF1ZXN0KSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQodXJsLCB1cGRhdGVkUXVlcnkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNb2RlbCBoZXJlIGlzIHVzdWFsbHkgdW5kZWZpbmVkIGV4Y2VwdCBmb3IgU3VwcHJlc3Npb24gQ2xpZW50XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UsIE1vZGVsKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogJ1JlcXVlc3QgcHJvcGVydHkgaXMgZW1wdHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogeyBtZXNzYWdlOiAnJyB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBOYXZpZ2F0aW9uVGhydVBhZ2VzO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE5hdmlnYXRpb25UaHJ1UGFnZXM7XG4iLCJpbXBvcnQgeyBfX2F3YWl0ZXIsIF9fZXh0ZW5kcywgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xudmFyIEV2ZW50Q2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhFdmVudENsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBFdmVudENsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEV2ZW50Q2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnLycpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBFdmVudENsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ2V2ZW50cycpLCBxdWVyeSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEV2ZW50Q2xpZW50O1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBFdmVudENsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSBcInRzbGliXCI7XG52YXIgU3RhdHNDb250YWluZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RhdHNDb250YWluZXIoZGF0YSkge1xuICAgICAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoZGF0YS5zdGFydCk7XG4gICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoZGF0YS5lbmQpO1xuICAgICAgICB0aGlzLnJlc29sdXRpb24gPSBkYXRhLnJlc29sdXRpb247XG4gICAgICAgIHRoaXMuc3RhdHMgPSBkYXRhLnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdCkge1xuICAgICAgICAgICAgdmFyIHJlcyA9IF9fYXNzaWduKHt9LCBzdGF0KTtcbiAgICAgICAgICAgIHJlcy50aW1lID0gbmV3IERhdGUoc3RhdC50aW1lKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gU3RhdHNDb250YWluZXI7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgU3RhdHNDb250YWluZXI7XG4iLCJpbXBvcnQgeyBfX3NwcmVhZEFycmF5IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgU3RhdHNDb250YWluZXIgZnJvbSAnLi9TdGF0c0NvbnRhaW5lci5qcyc7XG52YXIgU3RhdHNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RhdHNDbGllbnQocmVxdWVzdCwgbG9nZ2VyKSB7XG4gICAgICAgIGlmIChsb2dnZXIgPT09IHZvaWQgMCkgeyBsb2dnZXIgPSBjb25zb2xlOyB9XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cbiAgICBTdGF0c0NsaWVudC5wcm90b3R5cGUuY29udmVydERhdGVUb1VUQyA9IGZ1bmN0aW9uIChrZXksIGlucHV0RGF0ZSkge1xuICAgICAgICAvKlxuICAgICAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgICAgIGFuZCBiZWNhdXNlIGZvciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XG4gICAgICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIkRhdGU6XFxcIlwiLmNvbmNhdChpbnB1dERhdGUsIFwiXFxcIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cXG5WYWx1ZSBcXFwiXCIpLmNvbmNhdChpbnB1dERhdGUudG9VVENTdHJpbmcoKSwgXCJcXFwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXFxcIlwiKS5jb25jYXQoa2V5LCBcIlxcXCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nXCIpKTtcbiAgICAgICAgcmV0dXJuIFtrZXksIGlucHV0RGF0ZS50b1VUQ1N0cmluZygpXTtcbiAgICB9O1xuICAgIFN0YXRzQ2xpZW50LnByb3RvdHlwZS5wcmVwYXJlU2VhcmNoUGFyYW1zID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSBbXTtcbiAgICAgICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zID0gT2JqZWN0LmVudHJpZXMocXVlcnkpLnJlZHVjZShmdW5jdGlvbiAoYXJyYXlXaXRoUGFpcnMsIGN1cnJlbnRQYWlyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGN1cnJlbnRQYWlyWzBdLCB2YWx1ZSA9IGN1cnJlbnRQYWlyWzFdO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGgpIHsgLy8gZXZlbnQ6IFsnZGVsaXZlcmVkJywgJ2FjY2VwdGVkJ11cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcGVhdGVkUHJvcGVydHkgPSB2YWx1ZS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIFtrZXksIGl0ZW1dOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgYXJyYXlXaXRoUGFpcnMsIHRydWUpLCByZXBlYXRlZFByb3BlcnR5LCB0cnVlKTsgLy8gW1tldmVudCxkZWxpdmVyZWRdLCBbZXZlbnQsYWNjZXB0ZWRdXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5V2l0aFBhaXJzLnB1c2goX3RoaXMuY29udmVydERhdGVUb1VUQyhrZXksIHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheVdpdGhQYWlycztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlXaXRoUGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlXaXRoUGFpcnM7XG4gICAgICAgICAgICB9LCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlYXJjaFBhcmFtcztcbiAgICB9O1xuICAgIFN0YXRzQ2xpZW50LnByb3RvdHlwZS5wYXJzZVN0YXRzID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RhdHNDb250YWluZXIocmVzcG9uc2UuYm9keSk7XG4gICAgfTtcbiAgICBTdGF0c0NsaWVudC5wcm90b3R5cGUuZ2V0RG9tYWluID0gZnVuY3Rpb24gKGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ3N0YXRzL3RvdGFsJyksIHNlYXJjaFBhcmFtcylcbiAgICAgICAgICAgIC50aGVuKHRoaXMucGFyc2VTdGF0cyk7XG4gICAgfTtcbiAgICBTdGF0c0NsaWVudC5wcm90b3R5cGUuZ2V0QWNjb3VudCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICB2YXIgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9zdGF0cy90b3RhbCcsIHNlYXJjaFBhcmFtcylcbiAgICAgICAgICAgIC50aGVuKHRoaXMucGFyc2VTdGF0cyk7XG4gICAgfTtcbiAgICByZXR1cm4gU3RhdHNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgU3RhdHNDbGllbnQ7XG4iLCJleHBvcnQgdmFyIFJlc29sdXRpb247XG4oZnVuY3Rpb24gKFJlc29sdXRpb24pIHtcbiAgICBSZXNvbHV0aW9uW1wiSE9VUlwiXSA9IFwiaG91clwiO1xuICAgIFJlc29sdXRpb25bXCJEQVlcIl0gPSBcImRheVwiO1xuICAgIFJlc29sdXRpb25bXCJNT05USFwiXSA9IFwibW9udGhcIjtcbn0pKFJlc29sdXRpb24gfHwgKFJlc29sdXRpb24gPSB7fSkpO1xuZXhwb3J0IHZhciBTdXBwcmVzc2lvbk1vZGVscztcbihmdW5jdGlvbiAoU3VwcHJlc3Npb25Nb2RlbHMpIHtcbiAgICBTdXBwcmVzc2lvbk1vZGVsc1tcIkJPVU5DRVNcIl0gPSBcImJvdW5jZXNcIjtcbiAgICBTdXBwcmVzc2lvbk1vZGVsc1tcIkNPTVBMQUlOVFNcIl0gPSBcImNvbXBsYWludHNcIjtcbiAgICBTdXBwcmVzc2lvbk1vZGVsc1tcIlVOU1VCU0NSSUJFU1wiXSA9IFwidW5zdWJzY3JpYmVzXCI7XG4gICAgU3VwcHJlc3Npb25Nb2RlbHNbXCJXSElURUxJU1RTXCJdID0gXCJ3aGl0ZWxpc3RzXCI7XG59KShTdXBwcmVzc2lvbk1vZGVscyB8fCAoU3VwcHJlc3Npb25Nb2RlbHMgPSB7fSkpO1xuZXhwb3J0IHZhciBXZWJob29rc0lkcztcbihmdW5jdGlvbiAoV2ViaG9va3NJZHMpIHtcbiAgICBXZWJob29rc0lkc1tcIkNMSUNLRURcIl0gPSBcImNsaWNrZWRcIjtcbiAgICBXZWJob29rc0lkc1tcIkNPTVBMQUlORURcIl0gPSBcImNvbXBsYWluZWRcIjtcbiAgICBXZWJob29rc0lkc1tcIkRFTElWRVJFRFwiXSA9IFwiZGVsaXZlcmVkXCI7XG4gICAgV2ViaG9va3NJZHNbXCJPUEVORURcIl0gPSBcIm9wZW5lZFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiUEVSTUFORU5UX0ZBSUxcIl0gPSBcInBlcm1hbmVudF9mYWlsXCI7XG4gICAgV2ViaG9va3NJZHNbXCJURU1QT1JBUllfRkFJTFwiXSA9IFwidGVtcG9yYXJ5X2ZhaWxcIjtcbiAgICBXZWJob29rc0lkc1tcIlVOU1VCU0NSSUJFRFwiXSA9IFwidW5zdWJzY3JpYmVcIjtcbn0pKFdlYmhvb2tzSWRzIHx8IChXZWJob29rc0lkcyA9IHt9KSk7XG5leHBvcnQgdmFyIFllc05vO1xuKGZ1bmN0aW9uIChZZXNObykge1xuICAgIFllc05vW1wiWUVTXCJdID0gXCJ5ZXNcIjtcbiAgICBZZXNOb1tcIk5PXCJdID0gXCJub1wiO1xufSkoWWVzTm8gfHwgKFllc05vID0ge30pKTtcbiIsInZhciBTdXBwcmVzc2lvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdXBwcmVzc2lvbih0eXBlKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIHJldHVybiBTdXBwcmVzc2lvbjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBTdXBwcmVzc2lvbjtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcy9pbmRleC5qcyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbi5qcyc7XG52YXIgQm91bmNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCb3VuY2UsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQm91bmNlKGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgU3VwcHJlc3Npb25Nb2RlbHMuQk9VTkNFUykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgICAgX3RoaXMuY29kZSA9ICtkYXRhLmNvZGU7XG4gICAgICAgIF90aGlzLmVycm9yID0gZGF0YS5lcnJvcjtcbiAgICAgICAgX3RoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvdW5jZTtcbn0oU3VwcHJlc3Npb24pKTtcbmV4cG9ydCBkZWZhdWx0IEJvdW5jZTtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcy9pbmRleC5qcyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbi5qcyc7XG52YXIgQ29tcGxhaW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb21wbGFpbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29tcGxhaW50KGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgU3VwcHJlc3Npb25Nb2RlbHMuQ09NUExBSU5UUykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgICAgX3RoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENvbXBsYWludDtcbn0oU3VwcHJlc3Npb24pKTtcbmV4cG9ydCBkZWZhdWx0IENvbXBsYWludDtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcy9pbmRleC5qcyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbi5qcyc7XG52YXIgVW5zdWJzY3JpYmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVuc3Vic2NyaWJlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVuc3Vic2NyaWJlKGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgU3VwcHJlc3Npb25Nb2RlbHMuVU5TVUJTQ1JJQkVTKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgICBfdGhpcy50YWdzID0gZGF0YS50YWdzO1xuICAgICAgICBfdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVW5zdWJzY3JpYmU7XG59KFN1cHByZXNzaW9uKSk7XG5leHBvcnQgZGVmYXVsdCBVbnN1YnNjcmliZTtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcy9pbmRleC5qcyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbi5qcyc7XG52YXIgV2hpdGVMaXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhXaGl0ZUxpc3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gV2hpdGVMaXN0KGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgU3VwcHJlc3Npb25Nb2RlbHMuV0hJVEVMSVNUUykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgICBfdGhpcy5yZWFzb24gPSBkYXRhLnJlYXNvbjtcbiAgICAgICAgX3RoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBXaGl0ZUxpc3Q7XG59KFN1cHByZXNzaW9uKSk7XG5leHBvcnQgZGVmYXVsdCBXaGl0ZUxpc3Q7XG4iLCJpbXBvcnQgeyBfX2F3YWl0ZXIsIF9fZXh0ZW5kcywgX19nZW5lcmF0b3IsIF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3IuanMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xuaW1wb3J0IEJvdW5jZSBmcm9tICcuL0JvdW5jZS5qcyc7XG5pbXBvcnQgQ29tcGxhaW50IGZyb20gJy4vQ29tcGxhaW50LmpzJztcbmltcG9ydCBVbnN1YnNjcmliZSBmcm9tICcuL1Vuc3Vic2NyaWJlLmpzJztcbmltcG9ydCBXaGl0ZUxpc3QgZnJvbSAnLi9XaGl0ZUxpc3QuanMnO1xudmFyIGNyZWF0ZU9wdGlvbnMgPSB7XG4gICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH1cbn07XG52YXIgU3VwcHJlc3Npb25DbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1cHByZXNzaW9uQ2xpZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1cHByZXNzaW9uQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLm1vZGVscyA9IHtcbiAgICAgICAgICAgIGJvdW5jZXM6IEJvdW5jZSxcbiAgICAgICAgICAgIGNvbXBsYWludHM6IENvbXBsYWludCxcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlczogVW5zdWJzY3JpYmUsXG4gICAgICAgICAgICB3aGl0ZWxpc3RzOiBXaGl0ZUxpc3QsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSwgTW9kZWwpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gKChfYSA9IHJlc3BvbnNlLmJvZHkuaXRlbXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIG5ldyBNb2RlbChpdGVtKTsgfSkpIHx8IFtdO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBTdXBwcmVzc2lvbkNsaWVudC5wcm90b3R5cGUuX3BhcnNlSXRlbSA9IGZ1bmN0aW9uIChkYXRhLCBNb2RlbCkge1xuICAgICAgICByZXR1cm4gbmV3IE1vZGVsKGRhdGEpO1xuICAgIH07XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLmNyZWF0ZVdoaXRlTGlzdCA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEsIGlzRGF0YUFycmF5KSB7XG4gICAgICAgIGlmIChpc0RhdGFBcnJheSkge1xuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0JywgJ1doaXRlbGlzdFxcJ3MgY3JlYXRpb24gcHJvY2VzcyBkb2VzIG5vdCBzdXBwb3J0IG11bHRpcGxlIGNyZWF0aW9ucy4gRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgICAgICAgLnBvc3RXaXRoRkQodXJsam9pbigndjMnLCBkb21haW4sICd3aGl0ZWxpc3RzJyksIGRhdGEpXG4gICAgICAgICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gICAgfTtcbiAgICBTdXBwcmVzc2lvbkNsaWVudC5wcm90b3R5cGUuY3JlYXRlVW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7IC8vIFVzZXIgcHJvdmlkZWQgYW4gYXJyYXlcbiAgICAgICAgICAgIHZhciBpc0NvbnRhaW5zVGFnID0gZGF0YS5zb21lKGZ1bmN0aW9uICh1bnN1YnNjcmliZSkgeyByZXR1cm4gdW5zdWJzY3JpYmUudGFnOyB9KTtcbiAgICAgICAgICAgIGlmIChpc0NvbnRhaW5zVGFnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignVGFnIHByb3BlcnR5IHNob3VsZCBub3QgYmUgdXNlZCBmb3IgY3JlYXRpbmcgbXVsdGlwbGUgdW5zdWJzY3JpYmVzLicsICdUYWcgcHJvcGVydHkgY2FuIGJlIHVzZWQgb25seSBpZiBvbmUgdW5zdWJzY3JpYmUgcHJvdmlkZWQgYXMgc2Vjb25kIGFyZ3VtZW50IG9mIGNyZWF0ZSBtZXRob2QuIFBsZWFzZSB1c2UgdGFncyBpbnN0ZWFkLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybGpvaW4oJ3YzJywgZG9tYWluLCAndW5zdWJzY3JpYmVzJyksIEpTT04uc3RyaW5naWZ5KGRhdGEpLCBjcmVhdGVPcHRpb25zKVxuICAgICAgICAgICAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLnRhZ3MpIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1RhZ3MgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSB1c2VkIGZvciBjcmVhdGluZyBvbmUgdW5zdWJzY3JpYmUuJywgJ1RhZ3MgcHJvcGVydHkgY2FuIGJlIHVzZWQgaWYgeW91IHByb3ZpZGVzIGFuIGFycmF5IG9mIHVuc3Vic2NyaWJlcyBhcyBzZWNvbmQgYXJndW1lbnQgb2YgY3JlYXRlIG1ldGhvZC4gUGxlYXNlIHVzZSB0YWcgaW5zdGVhZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEudGFnKSkge1xuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignVGFnIHByb3BlcnR5IGNhbiBub3QgYmUgYW4gYXJyYXknLCAnUGxlYXNlIHVzZSBhcnJheSBvZiB1bnN1YnNjcmliZXMgYXMgc2Vjb25kIGFyZ3VtZW50IG9mIGNyZWF0ZSBtZXRob2QgdG8gYmUgYWJsZSB0byBwcm92aWRlIGZldyB0YWdzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyogV2UgbmVlZCBGb3JtIERhdGEgZm9yIHVuc3Vic2NyaWJlcyBpZiB3ZSB3YW50IHRvIHN1cHBvcnQgdGhlIFwidGFnXCIgcHJvcGVydHkgKi9cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgICAgICAgLnBvc3RXaXRoRkQodXJsam9pbigndjMnLCBkb21haW4sICd1bnN1YnNjcmliZXMnKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgICB9O1xuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5nZXRNb2RlbCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlIGluIHRoaXMubW9kZWxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignVW5rbm93biB0eXBlIHZhbHVlJywgJ1R5cGUgbWF5IGJlIG9ubHkgb25lIG9mIFtib3VuY2VzLCBjb21wbGFpbnRzLCB1bnN1YnNjcmliZXMsIHdoaXRlbGlzdHNdJyk7XG4gICAgfTtcbiAgICBTdXBwcmVzc2lvbkNsaWVudC5wcm90b3R5cGUucHJlcGFyZVJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgICB0eXBlOiByZXNwb25zZS5ib2R5LnR5cGUgfHwgJycsXG4gICAgICAgICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBTdXBwcmVzc2lvbkNsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChkb21haW4sIHR5cGUsIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtb2RlbDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBxdWVyeSwgbW9kZWwpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoZG9tYWluLCB0eXBlLCBhZGRyZXNzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgIC5nZXQodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIF90aGlzLl9wYXJzZUl0ZW0ocmVzcG9uc2UuYm9keSwgbW9kZWwpOyB9KTtcbiAgICB9O1xuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCB0eXBlLCBkYXRhKSB7XG4gICAgICAgIHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgICAgIC8vIHN1cHBvcnRzIGFkZGluZyBtdWx0aXBsZSBzdXBwcmVzc2lvbnMgYnkgZGVmYXVsdFxuICAgICAgICB2YXIgcG9zdERhdGE7XG4gICAgICAgIHZhciBpc0RhdGFBcnJheSA9IEFycmF5LmlzQXJyYXkoZGF0YSk7XG4gICAgICAgIGlmICh0eXBlID09PSAnd2hpdGVsaXN0cycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVdoaXRlTGlzdChkb21haW4sIGRhdGEsIGlzRGF0YUFycmF5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gJ3Vuc3Vic2NyaWJlcycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVVuc3Vic2NyaWJlKGRvbWFpbiwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0RhdGFBcnJheSkge1xuICAgICAgICAgICAgcG9zdERhdGEgPSBbZGF0YV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwb3N0RGF0YSA9IF9fc3ByZWFkQXJyYXkoW10sIGRhdGEsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgIC5wb3N0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlKSwgSlNPTi5zdHJpbmdpZnkocG9zdERhdGEpLCBjcmVhdGVPcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICAgIH07XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZG9tYWluLCB0eXBlLCBhZGRyZXNzKSB7XG4gICAgICAgIHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgIC5kZWxldGUodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuICh7XG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgICAgICAgIGFkZHJlc3M6IHJlc3BvbnNlLmJvZHkuYWRkcmVzcyB8fCAnJyxcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH0pOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBTdXBwcmVzc2lvbkNsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgU3VwcHJlc3Npb25DbGllbnQ7XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG52YXIgV2ViaG9vayA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXZWJob29rKGlkLCB1cmwsIHVybHMpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy51cmxzID0gdXJscztcbiAgICB9XG4gICAgcmV0dXJuIFdlYmhvb2s7XG59KCkpO1xuZXhwb3J0IHsgV2ViaG9vayB9O1xudmFyIFdlYmhvb2tzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdlYmhvb2tzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgV2ViaG9va3NDbGllbnQucHJvdG90eXBlLl9wYXJzZVdlYmhvb2tMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5LndlYmhvb2tzO1xuICAgIH07XG4gICAgV2ViaG9va3NDbGllbnQucHJvdG90eXBlLl9wYXJzZVdlYmhvb2tXaXRoSUQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgdmFyIHdlYmhvb2tSZXNwb25zZSA9IChfYSA9IHJlc3BvbnNlID09PSBudWxsIHx8IHJlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXNwb25zZS5ib2R5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eud2ViaG9vaztcbiAgICAgICAgICAgIHZhciB1cmwgPSB3ZWJob29rUmVzcG9uc2UgPT09IG51bGwgfHwgd2ViaG9va1Jlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3ZWJob29rUmVzcG9uc2UudXJsO1xuICAgICAgICAgICAgdmFyIHVybHMgPSB3ZWJob29rUmVzcG9uc2UgPT09IG51bGwgfHwgd2ViaG9va1Jlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3ZWJob29rUmVzcG9uc2UudXJscztcbiAgICAgICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdXJscyAmJiB1cmxzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA/IHVybHNbMF1cbiAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKCF1cmxzIHx8IHVybHMubGVuZ3RoID09PSAwKSAmJiB1cmwpIHtcbiAgICAgICAgICAgICAgICB1cmxzID0gW3VybF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFdlYmhvb2soaWQsIHVybCwgdXJscyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBXZWJob29rc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlV2ViaG9va1Rlc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvZGU6IHJlc3BvbnNlLmJvZHkuY29kZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgICAgICB9O1xuICAgIH07XG4gICAgV2ViaG9va3NDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJyksIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rTGlzdCk7XG4gICAgfTtcbiAgICBXZWJob29rc0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRvbWFpbiwgaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICAgIH07XG4gICAgV2ViaG9va3NDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIGlkLCB1cmwsIHRlc3QpIHtcbiAgICAgICAgaWYgKHRlc3QgPT09IHZvaWQgMCkgeyB0ZXN0ID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHRlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCwgJ3Rlc3QnKSwgeyB1cmw6IHVybCB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1Rlc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJyksIHsgaWQ6IGlkLCB1cmw6IHVybCB9KVxuICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gICAgfTtcbiAgICBXZWJob29rc0NsaWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRvbWFpbiwgaWQsIHVybFZhbHVlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpLCB7IHVybDogdXJsVmFsdWVzIH0pXG4gICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgICB9O1xuICAgIFdlYmhvb2tzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGRvbWFpbiwgaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICAgIH07XG4gICAgcmV0dXJuIFdlYmhvb2tzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFdlYmhvb2tzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24gfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL2NvbW1vbi9FcnJvci5qcyc7XG52YXIgTWVzc2FnZXNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWVzc2FnZXNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBNZXNzYWdlc0NsaWVudC5wcm90b3R5cGUucHJlcGFyZUJvb2xlYW5WYWx1ZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgeWVzTm9Qcm9wZXJ0aWVzID0gbmV3IFNldChbXG4gICAgICAgICAgICAnbzp0ZXN0bW9kZScsXG4gICAgICAgICAgICAndDp0ZXh0JyxcbiAgICAgICAgICAgICdvOmRraW0nLFxuICAgICAgICAgICAgJ286dHJhY2tpbmcnLFxuICAgICAgICAgICAgJ286dHJhY2tpbmctY2xpY2tzJyxcbiAgICAgICAgICAgICdvOnRyYWNraW5nLW9wZW5zJyxcbiAgICAgICAgICAgICdvOnJlcXVpcmUtdGxzJyxcbiAgICAgICAgICAgICdvOnNraXAtdmVyaWZpY2F0aW9uJ1xuICAgICAgICBdKTtcbiAgICAgICAgaWYgKCFkYXRhIHx8IE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignTWVzc2FnZSBkYXRhIG9iamVjdCBjYW4gbm90IGJlIGVtcHR5JywgJ01lc3NhZ2UgZGF0YSBvYmplY3QgY2FuIG5vdCBiZSBlbXB0eScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhkYXRhKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgICAgICBpZiAoeWVzTm9Qcm9wZXJ0aWVzLmhhcyhrZXkpICYmIHR5cGVvZiBkYXRhW2tleV0gPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldID8gJ3llcycgOiAnbm8nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWNjW2tleV0gPSBkYXRhW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgfTtcbiAgICBNZXNzYWdlc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSwgcmVzcG9uc2UuYm9keSk7XG4gICAgfTtcbiAgICBNZXNzYWdlc0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5tZXNzYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoXCIvdjMvXCIuY29uY2F0KGRvbWFpbiwgXCIvbWVzc2FnZXMubWltZVwiKSwgZGF0YSlcbiAgICAgICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbW9kaWZpZWREYXRhID0gdGhpcy5wcmVwYXJlQm9vbGVhblZhbHVlcyhkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKFwiL3YzL1wiLmNvbmNhdChkb21haW4sIFwiL21lc3NhZ2VzXCIpLCBtb2RpZmllZERhdGEpXG4gICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgICB9O1xuICAgIHJldHVybiBNZXNzYWdlc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlc0NsaWVudDtcbiIsInZhciBSb3V0ZXNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUm91dGVzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgUm91dGVzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvcm91dGVzJywgcXVlcnkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHkuaXRlbXM7IH0pO1xuICAgIH07XG4gICAgUm91dGVzQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoXCIvdjMvcm91dGVzL1wiLmNvbmNhdChpZCkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHkucm91dGU7IH0pO1xuICAgIH07XG4gICAgUm91dGVzQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92My9yb3V0ZXMnLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5LnJvdXRlOyB9KTtcbiAgICB9O1xuICAgIFJvdXRlc0NsaWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGlkLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKFwiL3YzL3JvdXRlcy9cIi5jb25jYXQoaWQpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5OyB9KTtcbiAgICB9O1xuICAgIFJvdXRlc0NsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIi92My9yb3V0ZXMvXCIuY29uY2F0KGlkKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gUm91dGVzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFJvdXRlc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBWYWxpZGF0ZUNsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBWYWxpZGF0ZUNsaWVudChyZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5tdWx0aXBsZVZhbGlkYXRpb24gPSBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ7XG4gICAgfVxuICAgIFZhbGlkYXRlQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoYWRkcmVzcykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnksIHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5ID0geyBhZGRyZXNzOiBhZGRyZXNzIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvYWRkcmVzcy92YWxpZGF0ZScsIHF1ZXJ5KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXN1bHQuYm9keV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFZhbGlkYXRlQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRlQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIElwc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJcHNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBJcHNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvaXBzJywgcXVlcnkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wYXJzZUlwc1Jlc3BvbnNlKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSXBzQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaXApIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3YzL2lwcy9cIi5jb25jYXQoaXApKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucGFyc2VJcHNSZXNwb25zZShyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIElwc0NsaWVudC5wcm90b3R5cGUucGFyc2VJcHNSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICB9O1xuICAgIHJldHVybiBJcHNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgSXBzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBJcFBvb2xzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIElwUG9vbHNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBJcFBvb2xzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YxL2lwX3Bvb2xzJylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gX3RoaXMucGFyc2VJcFBvb2xzUmVzcG9uc2UocmVzcG9uc2UpOyB9KTtcbiAgICB9O1xuICAgIElwUG9vbHNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92MS9pcF9wb29scycsIGRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9LCByZXNwb25zZS5ib2R5KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSXBQb29sc0NsaWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKHBvb2xJZCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wYXRjaFdpdGhGRChcIi92MS9pcF9wb29scy9cIi5jb25jYXQocG9vbElkKSwgZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3BvbnNlLmJvZHkpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJcFBvb2xzQ2xpZW50LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAocG9vbElkLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIi92MS9pcF9wb29scy9cIi5jb25jYXQocG9vbElkKSwgZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3BvbnNlLmJvZHkpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJcFBvb2xzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUlwUG9vbHNSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gX19hc3NpZ24oeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9LCByZXNwb25zZS5ib2R5KTtcbiAgICB9O1xuICAgIHJldHVybiBJcFBvb2xzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IElwUG9vbHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG52YXIgTWFpbGluZ0xpc3RzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWlsaW5nTGlzdHNDbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbGluZ0xpc3RzQ2xpZW50KHJlcXVlc3QsIG1lbWJlcnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgICAgICBfdGhpcy5tZW1iZXJzID0gbWVtYmVycztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBNYWlsaW5nTGlzdHNDbGllbnQucHJvdG90eXBlLnBhcnNlVmFsaWRhdGlvblJlc3VsdCA9IGZ1bmN0aW9uIChzdGF0dXMsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogc3RhdHVzLFxuICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdDogX19hc3NpZ24oX19hc3NpZ24oe30sIGRhdGEpLCB7IGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCAqIDEwMDApIC8vIGFkZCBtaWxsaXNlY29uZCB0byBVbml4IHRpbWVzdGFtcFxuICAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBNYWlsaW5nTGlzdHNDbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyhcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvcGFnZXNcIiksIHF1ZXJ5KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNYWlsaW5nTGlzdHNDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUsIFwiL1wiKS5jb25jYXQobWFpbExpc3RBZGRyZXNzKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keS5saXN0OyB9KTtcbiAgICB9O1xuICAgIE1haWxpbmdMaXN0c0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHRoaXMuYmFzZVJvdXRlLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5Lmxpc3Q7IH0pO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcyksIGRhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHkubGlzdDsgfSk7XG4gICAgfTtcbiAgICBNYWlsaW5nTGlzdHNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHk7IH0pO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcywgXCIvdmFsaWRhdGVcIiksIHt9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiAoX19hc3NpZ24oeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9LCByZXNwb25zZS5ib2R5KSk7IH0pO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS52YWxpZGF0aW9uUmVzdWx0ID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL3ZhbGlkYXRlXCIpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiBfdGhpcy5wYXJzZVZhbGlkYXRpb25SZXN1bHQocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTsgfSk7XG4gICAgfTtcbiAgICBNYWlsaW5nTGlzdHNDbGllbnQucHJvdG90eXBlLmNhbmNlbFZhbGlkYXRpb24gPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcywgXCIvdmFsaWRhdGVcIikpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuICh7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgICAgICB9KTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbGluZ0xpc3RzQ2xpZW50O1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBNYWlsaW5nTGlzdHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG52YXIgTWFpbExpc3RzTWVtYmVycyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbExpc3RzTWVtYmVycywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWlsTGlzdHNNZW1iZXJzKHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE1haWxMaXN0c01lbWJlcnMucHJvdG90eXBlLmNoZWNrQW5kVXBkYXRlRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBuZXdEYXRhID0gX19hc3NpZ24oe30sIGRhdGEpO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEudmFycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIG5ld0RhdGEudmFycyA9IEpTT04uc3RyaW5naWZ5KG5ld0RhdGEudmFycyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnN1YnNjcmliZWQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgbmV3RGF0YS5zdWJzY3JpYmVkID0gZGF0YS5zdWJzY3JpYmVkID8gJ3llcycgOiAnbm8nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgIH07XG4gICAgTWFpbExpc3RzTWVtYmVycy5wcm90b3R5cGUucGFyc2VMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIE1haWxMaXN0c01lbWJlcnMucHJvdG90eXBlLmxpc3RNZW1iZXJzID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcywgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcywgXCIvbWVtYmVycy9wYWdlc1wiKSwgcXVlcnkpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE1haWxMaXN0c01lbWJlcnMucHJvdG90eXBlLmdldE1lbWJlciA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MsIG1haWxMaXN0TWVtYmVyQWRkcmVzcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL21lbWJlcnMvXCIpLmNvbmNhdChtYWlsTGlzdE1lbWJlckFkZHJlc3MpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5Lm1lbWJlcjsgfSk7XG4gICAgfTtcbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS5jcmVhdGVNZW1iZXIgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzLCBkYXRhKSB7XG4gICAgICAgIHZhciByZXFEYXRhID0gdGhpcy5jaGVja0FuZFVwZGF0ZURhdGEoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL21lbWJlcnNcIiksIHJlcURhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHkubWVtYmVyOyB9KTtcbiAgICB9O1xuICAgIE1haWxMaXN0c01lbWJlcnMucHJvdG90eXBlLmNyZWF0ZU1lbWJlcnMgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzLCBkYXRhKSB7XG4gICAgICAgIHZhciBuZXdEYXRhID0ge1xuICAgICAgICAgICAgbWVtYmVyczogQXJyYXkuaXNBcnJheShkYXRhLm1lbWJlcnMpID8gSlNPTi5zdHJpbmdpZnkoZGF0YS5tZW1iZXJzKSA6IGRhdGEubWVtYmVycyxcbiAgICAgICAgICAgIHVwc2VydDogZGF0YS51cHNlcnRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcywgXCIvbWVtYmVycy5qc29uXCIpLCBuZXdEYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5OyB9KTtcbiAgICB9O1xuICAgIE1haWxMaXN0c01lbWJlcnMucHJvdG90eXBlLnVwZGF0ZU1lbWJlciA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MsIG1haWxMaXN0TWVtYmVyQWRkcmVzcywgZGF0YSkge1xuICAgICAgICB2YXIgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL21lbWJlcnMvXCIpLmNvbmNhdChtYWlsTGlzdE1lbWJlckFkZHJlc3MpLCByZXFEYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5Lm1lbWJlcjsgfSk7XG4gICAgfTtcbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS5kZXN0cm95TWVtYmVyID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcywgbWFpbExpc3RNZW1iZXJBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcywgXCIvbWVtYmVycy9cIikuY29uY2F0KG1haWxMaXN0TWVtYmVyQWRkcmVzcykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE1haWxMaXN0c01lbWJlcnM7XG59KE5hdmlnYXRpb25UaHJ1UGFnZXMpKTtcbmV4cG9ydCBkZWZhdWx0IE1haWxMaXN0c01lbWJlcnM7XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG52YXIgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9tYWluQ3JlZGVudGlhbHNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvZG9tYWlucy8nO1xuICAgIH1cbiAgICBEb21haW5DcmVkZW50aWFsc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgICAgICAgIHRvdGFsQ291bnQ6IHJlc3BvbnNlLmJvZHkudG90YWxfY291bnRcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VNZXNzYWdlUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBEb21haW5DcmVkZW50aWFsc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlRGVsZXRlZFJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgICAgICAgIHNwZWM6IHJlc3BvbnNlLmJvZHkuc3BlY1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvY3JlZGVudGlhbHMnKSwgcXVlcnkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5DcmVkZW50aWFsc0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUpLmNvbmNhdChkb21haW4sIFwiL2NyZWRlbnRpYWxzXCIpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIGNyZWRlbnRpYWxzTG9naW4sIGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUpLmNvbmNhdChkb21haW4sIFwiL2NyZWRlbnRpYWxzL1wiKS5jb25jYXQoY3JlZGVudGlhbHNMb2dpbiksIGRhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5DcmVkZW50aWFsc0NsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkb21haW4sIGNyZWRlbnRpYWxzTG9naW4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUpLmNvbmNhdChkb21haW4sIFwiL2NyZWRlbnRpYWxzL1wiKS5jb25jYXQoY3JlZGVudGlhbHNMb2dpbikpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VEZWxldGVkUmVzcG9uc2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRG9tYWluQ3JlZGVudGlhbHNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG5pbXBvcnQgQXR0YWNobWVudHNIYW5kbGVyIGZyb20gJy4uL2NvbW1vbi9BdHRhY2htZW50c0hhbmRsZXIuanMnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvci5qcyc7XG52YXIgTXVsdGlwbGVWYWxpZGF0aW9uSm9iID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE11bHRpcGxlVmFsaWRhdGlvbkpvYihkYXRhLCByZXNwb25zZVN0YXR1c0NvZGUpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdGhpcy5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5pZDtcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IGRhdGEucXVhbnRpdHk7XG4gICAgICAgIHRoaXMucmVjb3Jkc1Byb2Nlc3NlZCA9IGRhdGEucmVjb3Jkc19wcm9jZXNzZWQ7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdGF0dXNDb2RlID0gcmVzcG9uc2VTdGF0dXNDb2RlO1xuICAgICAgICBpZiAoZGF0YS5kb3dubG9hZF91cmwpIHtcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRVcmwgPSB7XG4gICAgICAgICAgICAgICAgY3N2OiAoX2EgPSBkYXRhLmRvd25sb2FkX3VybCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNzdixcbiAgICAgICAgICAgICAgICBqc29uOiAoX2IgPSBkYXRhLmRvd25sb2FkX3VybCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmpzb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuc3VtbWFyeSkge1xuICAgICAgICAgICAgdGhpcy5zdW1tYXJ5ID0ge1xuICAgICAgICAgICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgICAgICAgICBjYXRjaEFsbDogZGF0YS5zdW1tYXJ5LnJlc3VsdC5jYXRjaF9hbGwsXG4gICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJhYmxlOiBkYXRhLnN1bW1hcnkucmVzdWx0LmRlbGl2ZXJhYmxlLFxuICAgICAgICAgICAgICAgICAgICBkb05vdFNlbmQ6IGRhdGEuc3VtbWFyeS5yZXN1bHQuZG9fbm90X3NlbmQsXG4gICAgICAgICAgICAgICAgICAgIHVuZGVsaXZlcmFibGU6IGRhdGEuc3VtbWFyeS5yZXN1bHQudW5kZWxpdmVyYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgdW5rbm93bjogZGF0YS5zdW1tYXJ5LnJlc3VsdC51bmtub3duXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByaXNrOiB7XG4gICAgICAgICAgICAgICAgICAgIGhpZ2g6IGRhdGEuc3VtbWFyeS5yaXNrLmhpZ2gsXG4gICAgICAgICAgICAgICAgICAgIGxvdzogZGF0YS5zdW1tYXJ5LnJpc2subG93LFxuICAgICAgICAgICAgICAgICAgICBtZWRpdW06IGRhdGEuc3VtbWFyeS5yaXNrLm1lZGl1bSxcbiAgICAgICAgICAgICAgICAgICAgdW5rbm93bjogZGF0YS5zdW1tYXJ5LnJpc2sudW5rbm93blxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE11bHRpcGxlVmFsaWRhdGlvbkpvYjtcbn0oKSk7XG5leHBvcnQgeyBNdWx0aXBsZVZhbGlkYXRpb25Kb2IgfTtcbnZhciBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQocmVxdWVzdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyID0gbmV3IEF0dGFjaG1lbnRzSGFuZGxlcigpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudC5wcm90b3R5cGUuaGFuZGxlUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSwgcmVzcG9uc2UgPT09IG51bGwgfHwgcmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc3BvbnNlLmJvZHkpO1xuICAgIH07XG4gICAgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5qb2JzID0gcmVzcG9uc2UuYm9keS5qb2JzLm1hcChmdW5jdGlvbiAoam9iKSB7IHJldHVybiBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uSm9iKGpvYiwgcmVzcG9uc2Uuc3RhdHVzKTsgfSk7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwaXZvdCcpO1xuICAgICAgICBkYXRhLnRvdGFsID0gcmVzcG9uc2UuYm9keS50b3RhbDtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcygnL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsaycsIHF1ZXJ5KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChsaXN0SWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay9cIi5jb25jYXQobGlzdElkKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uSm9iKHJlc3BvbnNlLmJvZHksIHJlc3BvbnNlLnN0YXR1cyldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudC5wcm90b3R5cGUuY29udmVydFRvRXhwZWN0ZWRTaGFwZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBtdWx0aXBsZVZhbGlkYXRpb25EYXRhO1xuICAgICAgICBpZiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoZGF0YS5maWxlKSkge1xuICAgICAgICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHsgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZTogZGF0YS5maWxlIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGRhdGEuZmlsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IHsgZGF0YTogZGF0YS5maWxlIH0gfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShkYXRhLmZpbGUpKSB7XG4gICAgICAgICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IGRhdGEuZmlsZSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtdWx0aXBsZVZhbGlkYXRpb25EYXRhO1xuICAgIH07XG4gICAgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAobGlzdElkLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtdWx0aXBsZVZhbGlkYXRpb25EYXRhLCByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSB8fCAhZGF0YS5maWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignXCJmaWxlXCIgcHJvcGVydHkgZXhwZWN0ZWQuJywgJ01ha2Ugc3VyZSBzZWNvbmQgYXJndW1lbnQgaGFzIFwiZmlsZVwiIHByb3BlcnR5LicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHRoaXMuY29udmVydFRvRXhwZWN0ZWRTaGFwZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKFwiL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay9cIi5jb25jYXQobGlzdElkKSwgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGxpc3RJZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5kZWxldGUoXCIvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrL1wiLmNvbmNhdChsaXN0SWQpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuaGFuZGxlUmVzcG9uc2UocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50O1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG52YXIgRG9tYWluVGVtcGxhdGVJdGVtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvbWFpblRlbXBsYXRlSXRlbShkb21haW5UZW1wbGF0ZUZyb21BUEkpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLm5hbWU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuY3JlYXRlZEF0ID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRBdCA/IG5ldyBEYXRlKGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQpIDogJyc7XG4gICAgICAgIHRoaXMuY3JlYXRlZEJ5ID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRCeTtcbiAgICAgICAgdGhpcy5pZCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5pZDtcbiAgICAgICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnNpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlcnNpb24gJiYgZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24uY3JlYXRlZEF0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZXJzaW9uLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucyAmJiBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnNpb25zID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLm1hcChmdW5jdGlvbiAodmVyc2lvbikge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBfX2Fzc2lnbih7fSwgdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmNyZWF0ZWRBdCA9IG5ldyBEYXRlKHZlcnNpb24uY3JlYXRlZEF0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIERvbWFpblRlbXBsYXRlSXRlbTtcbn0oKSk7XG5leHBvcnQgeyBEb21haW5UZW1wbGF0ZUl0ZW0gfTtcbnZhciBEb21haW5UZW1wbGF0ZXNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERvbWFpblRlbXBsYXRlc0NsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEb21haW5UZW1wbGF0ZXNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCByZXF1ZXN0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgX3RoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUucGFyc2VDcmVhdGlvblJlc3BvbnNlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUucGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgICAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmVzdWx0LnRlbXBsYXRlID0gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkYXRhLmJvZHkudGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlTXV0YXRpb25SZXNwb25zZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgICAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgICAgICBpZiAoZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICAgICAgICByZXN1bHQudGVtcGxhdGVOYW1lID0gZGF0YS5ib2R5LnRlbXBsYXRlLm5hbWU7XG4gICAgICAgICAgICByZXN1bHQudGVtcGxhdGVWZXJzaW9uID0geyB0YWc6IGRhdGEuYm9keS50ZW1wbGF0ZS52ZXJzaW9uLnRhZyB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZCk7IH0pO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncCcpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzcG9uc2UuYm9keS50ZW1wbGF0ZSk7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwJyk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSwgcXVlcnkpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRvbWFpbiwgdGVtcGxhdGVOYW1lLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXMuYm9keS50ZW1wbGF0ZSk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIGRhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZUNyZWF0aW9uUmVzcG9uc2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIHRlbXBsYXRlTmFtZSwgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIGRhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZG9tYWluLCB0ZW1wbGF0ZU5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VNdXRhdGlvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95QWxsID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5saXN0VmVyc2lvbnMgPSBmdW5jdGlvbiAoZG9tYWluLCB0ZW1wbGF0ZU5hbWUsIHF1ZXJ5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgcXVlcnkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5nZXRWZXJzaW9uID0gZnVuY3Rpb24gKGRvbWFpbiwgdGVtcGxhdGVOYW1lLCB0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUuY3JlYXRlVmVyc2lvbiA9IGZ1bmN0aW9uIChkb21haW4sIHRlbXBsYXRlTmFtZSwgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLnBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnVwZGF0ZVZlcnNpb24gPSBmdW5jdGlvbiAoZG9tYWluLCB0ZW1wbGF0ZU5hbWUsIHRhZywgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgIGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLnBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3lWZXJzaW9uID0gZnVuY3Rpb24gKGRvbWFpbiwgdGVtcGxhdGVOYW1lLCB0YWcpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSlcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERvbWFpblRlbXBsYXRlc0NsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgRG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xudmFyIERvbWFpblRhZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb21haW5UYWcodGFnSW5mbykge1xuICAgICAgICB0aGlzLnRhZyA9IHRhZ0luZm8udGFnO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnSW5mby5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpc1snZmlyc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snZmlyc3Qtc2VlbiddKTtcbiAgICAgICAgdGhpc1snbGFzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydsYXN0LXNlZW4nXSk7XG4gICAgfVxuICAgIHJldHVybiBEb21haW5UYWc7XG59KCkpO1xuZXhwb3J0IHsgRG9tYWluVGFnIH07XG52YXIgRG9tYWluVGFnU3RhdGlzdGljID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvbWFpblRhZ1N0YXRpc3RpYyh0YWdTdGF0aXN0aWNJbmZvKSB7XG4gICAgICAgIHRoaXMudGFnID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnRhZztcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGFydCk7XG4gICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LmVuZCk7XG4gICAgICAgIHRoaXMucmVzb2x1dGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5yZXNvbHV0aW9uO1xuICAgICAgICB0aGlzLnN0YXRzID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdCkge1xuICAgICAgICAgICAgdmFyIHJlcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBzdGF0KSwgeyB0aW1lOiBuZXcgRGF0ZShzdGF0LnRpbWUpIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBEb21haW5UYWdTdGF0aXN0aWM7XG59KCkpO1xuZXhwb3J0IHsgRG9tYWluVGFnU3RhdGlzdGljIH07XG52YXIgRG9tYWluVGFnc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRG9tYWluVGFnc0NsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEb21haW5UYWdzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLmJhc2VSb3V0ZSA9ICcvdjMvJztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBEb21haW5UYWdzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uICh0YWdJbmZvKSB7IHJldHVybiBuZXcgRG9tYWluVGFnKHRhZ0luZm8pOyB9KTtcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3RhZycpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBEb21haW5UYWdzQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VUYWdTdGF0aXN0aWMgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb21haW5UYWdTdGF0aXN0aWMocmVzcG9uc2UpO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChkb21haW4sIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycpLCBxdWVyeSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRvbWFpbiwgdGFnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIG5ldyBEb21haW5UYWcocmVzLmJvZHkpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIHRhZywgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpLCBkZXNjcmlwdGlvbilcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZG9tYWluLCB0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUpLmNvbmNhdChkb21haW4sIFwiL3RhZ3MvXCIpLmNvbmNhdCh0YWcpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlcy5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgICBzdGF0dXM6IHJlcy5zdGF0dXNcbiAgICAgICAgfSk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUuc3RhdGlzdGljID0gZnVuY3Rpb24gKGRvbWFpbiwgdGFnLCBxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzJyksIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlVGFnU3RhdGlzdGljKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUuY291bnRyaWVzID0gZnVuY3Rpb24gKGRvbWFpbiwgdGFnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9jb3VudHJpZXMnKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLnByb3ZpZGVycyA9IGZ1bmN0aW9uIChkb21haW4sIHRhZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvcHJvdmlkZXJzJykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UYWdzQ2xpZW50LnByb3RvdHlwZS5kZXZpY2VzID0gZnVuY3Rpb24gKGRvbWFpbiwgdGFnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9kZXZpY2VzJykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRG9tYWluVGFnc0NsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgRG9tYWluVGFnc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZXh0ZW5kcywgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uLy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLmpzJztcbnZhciBTZWVkc0xpc3RzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTZWVkc0xpc3RzQ2xpZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNlZWRzTGlzdHNDbGllbnQocmVxdWVzdCwgYXR0cmlidXRlcywgZmlsdGVycywgbG9nZ2VyKSB7XG4gICAgICAgIGlmIChsb2dnZXIgPT09IHZvaWQgMCkgeyBsb2dnZXIgPSBjb25zb2xlOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBfdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgICAgICAgX3RoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgICAgIF90aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5jb252ZXJ0RGF0ZVRvVVRDID0gZnVuY3Rpb24gKGtleSwgaW5wdXREYXRlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgQmVjYXVzZSBcIm5ldyBEYXRlKCcyMDIyLTEyLTI1VDAwOjAwOjAwLjAwMFonKVwiIGJlY29tZXMgXCJTdW4gRGVjIDI1IDIwMjIgMDI6MDA6MDAgR01UKzAyMDBcIlxuICAgICAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgICAgICBleDogJ1RodSwgMTMgT2N0IDIwMTEgMTg6MDI6MDAgKzAwMDAnLlxuICAgICAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFwiRGF0ZTogXFxcIlwiLmNvbmNhdChpbnB1dERhdGUsIFwiXFxcIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cXG5WYWx1ZSBcXFwiXCIpLmNvbmNhdChpbnB1dERhdGUudG9JU09TdHJpbmcoKSwgXCJcXFwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXFxcIlwiKS5jb25jYXQoa2V5LCBcIlxcXCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nXCIpKTtcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0ZS50b0lTT1N0cmluZygpO1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUucHJlcGFyZVF1ZXJ5RGF0YSA9IGZ1bmN0aW9uIChxdWVyeURhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHByb3BzRm9yUmVwbGFjZW1lbnQgPSBxdWVyeURhdGE7XG4gICAgICAgIHZhciByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICAgICAgdmFyIHByb3AgPSBrZXk7XG4gICAgICAgICAgICBpZiAoISFwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdICYmIHR5cGVvZiBwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHF1ZXJ5RGF0YVtwcm9wXTtcbiAgICAgICAgICAgICAgICBhY2NbcHJvcF0gPSBfdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKHByb3AsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBxdWVyeURhdGEpLCByZXBsYWNlZFByb3BzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIFNlZWRzTGlzdHNDbGllbnQucHJvdG90eXBlLnByZXBhcmVSZXN1bHQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHZhciBzZWVkTGlzdCA9IHRoaXMucHJlcGFyZVNlZWRMaXN0KGRhdGEuYm9keSk7XG4gICAgICAgIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBzZWVkTGlzdCksIHsgc3RhdHVzOiBkYXRhLnN0YXR1cyB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIFNlZWRzTGlzdHNDbGllbnQucHJvdG90eXBlLnByZXBhcmVTZWVkTGlzdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBzZWVkcztcbiAgICAgICAgdmFyIGhhbmRsZWRTZWVkTGlzdERhdGVzID0ge1xuICAgICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KSxcbiAgICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEudXBkYXRlZF9hdCksXG4gICAgICAgICAgICBsYXN0X3Jlc3VsdF9hdDogbmV3IERhdGUoZGF0YS5sYXN0X3Jlc3VsdF9hdCksXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkYXRhLlNlZWRzKSB7XG4gICAgICAgICAgICBzZWVkcyA9IGRhdGEuU2VlZHMubWFwKGZ1bmN0aW9uIChzZWVkSXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWVkID0ge307XG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZWRTZWVkRGF0ZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLmNyZWF0ZWRfYXQpLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShzZWVkSXRlbS51cGRhdGVkX2F0KSxcbiAgICAgICAgICAgICAgICAgICAgbWF4X2VtYWlsX2NvdW50X2hpdF9hdDogbmV3IERhdGUoc2VlZEl0ZW0ubWF4X2VtYWlsX2NvdW50X2hpdF9hdCksXG4gICAgICAgICAgICAgICAgICAgIGxhc3Rfc2VudF90b19hdDogbmV3IERhdGUoc2VlZEl0ZW0ubGFzdF9zZW50X3RvX2F0KSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdF9kZWxpdmVyZWRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLmxhc3RfZGVsaXZlcmVkX2F0KSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHNlZWQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc2VlZEl0ZW0pLCBoYW5kbGVkU2VlZERhdGVzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VlZHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWVkTGlzdCA9IF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCBkYXRhKSwgeyBTZWVkczogc2VlZHMgfSksIGhhbmRsZWRTZWVkTGlzdERhdGVzKTtcbiAgICAgICAgZGVsZXRlIHNlZWRMaXN0LklkO1xuICAgICAgICByZXR1cm4gc2VlZExpc3Q7XG4gICAgfTtcbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9O1xuICAgICAgICBkYXRhLml0ZW1zID0gKF9hID0gcmVzcG9uc2UuYm9keS5pdGVtcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gX3RoaXMucHJlcGFyZVNlZWRMaXN0KGl0ZW0pOyB9KTtcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnlEYXRhLCByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5RGF0YSA9IHRoaXMucHJlcGFyZVF1ZXJ5RGF0YShxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvaW5ib3gvc2VlZGxpc3RzJywgcXVlcnlEYXRhKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSkpLCB7IHN0YXR1czogMjAwIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCB1cGRhdGVkU2VlZHNMaXN0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y0L2luYm94L3NlZWRsaXN0cy9cIi5jb25jYXQoaWQpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFNlZWRzTGlzdCA9IHRoaXMucHJlcGFyZVNlZWRMaXN0KHJlc3BvbnNlLmJvZHkuc2VlZGxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCB1cGRhdGVkU2VlZHNMaXN0KSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3Y0L2luYm94L3NlZWRsaXN0cycsIGRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wcmVwYXJlUmVzdWx0KHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGlkLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnB1dChcIi92NC9pbmJveC9zZWVkbGlzdHMvXCIuY29uY2F0KGlkKSwgZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnByZXBhcmVSZXN1bHQocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIi92NC9pbmJveC9zZWVkbGlzdHMvXCIuY29uY2F0KGlkKSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFNlZWRzTGlzdHNDbGllbnQ7XG59KE5hdmlnYXRpb25UaHJ1UGFnZXMpKTtcbmV4cG9ydCBkZWZhdWx0IFNlZWRzTGlzdHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIEluYm94UGxhY2VtZW50c0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbmJveFBsYWNlbWVudHNDbGllbnQocmVxdWVzdCwgc2VlZHNMaXN0c0NsaWVudCwgcmVzdWx0cywgcHJvdmlkZXJzKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMuc2VlZHNMaXN0cyA9IHNlZWRzTGlzdHNDbGllbnQ7XG4gICAgICAgIHRoaXMuc2VlZHNMaXN0cyA9IHNlZWRzTGlzdHNDbGllbnQ7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgICAgIHRoaXMucHJvdmlkZXJzID0gcHJvdmlkZXJzO1xuICAgIH1cbiAgICBJbmJveFBsYWNlbWVudHNDbGllbnQucHJvdG90eXBlLnJ1blRlc3QgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0KCcvdjQvaW5ib3gvdGVzdHMnLCBkYXRhKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXNwb25zZS5ib2R5KSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEluYm94UGxhY2VtZW50c0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBJbmJveFBsYWNlbWVudHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi8uLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG52YXIgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50KHJlcXVlc3QsIGF0dHJpYnV0ZXMsIGZpbHRlcnMsIHNoYXJpbmcsIGxvZ2dlcikge1xuICAgICAgICBpZiAobG9nZ2VyID09PSB2b2lkIDApIHsgbG9nZ2VyID0gY29uc29sZTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCByZXF1ZXN0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgX3RoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgICAgIF90aGlzLmZpbHRlcnMgPSBmaWx0ZXJzO1xuICAgICAgICBfdGhpcy5zaGFyaW5nID0gc2hhcmluZztcbiAgICAgICAgX3RoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQucHJvdG90eXBlLmNvbnZlcnREYXRlVG9VVEMgPSBmdW5jdGlvbiAoa2V5LCBpbnB1dERhdGUpIHtcbiAgICAgICAgLypcbiAgICAgICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAgICAgKHBsdXMgMiBob3VycyBmcm9tIHRoZSB0aW1lem9uZSlcbiAgICAgICAgICBhbmQgYmVjYXVzZSBmb3IgQVBJLCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGRhdGUgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdFxuICAgICAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICAgICAgSGVyZSB3ZSB0cnkgYXV0by1jb252ZXJ0IHRoZW0gdG8gVVRDXG4gICAgICAgICovXG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJEYXRlOiBcXFwiXCIuY29uY2F0KGlucHV0RGF0ZSwgXCJcXFwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxcblZhbHVlIFxcXCJcIikuY29uY2F0KGlucHV0RGF0ZS50b0lTT1N0cmluZygpLCBcIlxcXCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxcbkNvbnNpZGVyIHVzaW5nIHN0cmluZyB0eXBlIGZvciBwcm9wZXJ0eSBcXFwiXCIpLmNvbmNhdChrZXksIFwiXFxcIiB0byBhdm9pZCBhdXRvLWNvbnZlcnRpbmdcIikpO1xuICAgICAgICByZXR1cm4gaW5wdXREYXRlLnRvSVNPU3RyaW5nKCk7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LnByb3RvdHlwZS5wcmVwYXJlUXVlcnlEYXRhID0gZnVuY3Rpb24gKHF1ZXJ5RGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcHJvcHNGb3JSZXBsYWNlbWVudCA9IHF1ZXJ5RGF0YTtcbiAgICAgICAgdmFyIHJlcGxhY2VkUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wc0ZvclJlcGxhY2VtZW50KS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IGtleTtcbiAgICAgICAgICAgIGlmICghIXByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gJiYgdHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcXVlcnlEYXRhW3Byb3BdO1xuICAgICAgICAgICAgICAgIGFjY1twcm9wXSA9IF90aGlzLmNvbnZlcnREYXRlVG9VVEMocHJvcCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgICAgICB2YXIgcmVzdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHF1ZXJ5RGF0YSksIHJlcGxhY2VkUHJvcHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC5wcm90b3R5cGUucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBib3ggPSB7fTtcbiAgICAgICAgdmFyIGhhbmRsZWRTZWVkTGlzdERhdGVzID0ge1xuICAgICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KSxcbiAgICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEudXBkYXRlZF9hdCksXG4gICAgICAgICAgICBzaGFyaW5nX2V4cGlyZXNfYXQ6IG5ldyBEYXRlKGRhdGEuc2hhcmluZ19leHBpcmVzX2F0KSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGRhdGEuQm94KSB7XG4gICAgICAgICAgICBib3ggPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YS5Cb3gpLCB7IGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuQm94LmNyZWF0ZWRfYXQpLCB1cGRhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLkJveC51cGRhdGVkX2F0KSwgbGFzdF9yZXN1bHRfYXQ6IG5ldyBEYXRlKGRhdGEuQm94Lmxhc3RfcmVzdWx0X2F0KSB9KTtcbiAgICAgICAgICAgIGRlbGV0ZSBib3guSUQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluYm94UGxhY2VtZW50c1Jlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCBkYXRhKSwgeyBCb3g6IGJveCB9KSwgaGFuZGxlZFNlZWRMaXN0RGF0ZXMpLCB7IGlkOiBkYXRhLklkIH0pO1xuICAgICAgICBkZWxldGUgaW5ib3hQbGFjZW1lbnRzUmVzdWx0LklEO1xuICAgICAgICByZXR1cm4gaW5ib3hQbGFjZW1lbnRzUmVzdWx0O1xuICAgIH07XG4gICAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC5wcm90b3R5cGUucGFyc2VMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gX3RoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChpdGVtKTsgfSk7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5RGF0YSwgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeURhdGEgPSB0aGlzLnByZXBhcmVRdWVyeURhdGEocXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2luYm94L3Jlc3VsdHMnLCBxdWVyeURhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBpbmJveFBsYWNlbWVudFJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldChcIi92NC9pbmJveC9yZXN1bHRzL1wiLmNvbmNhdChpZCkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmJveFBsYWNlbWVudFJlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChyZXNwb25zZS5ib2R5LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5ib3hQbGFjZW1lbnRSZXN1bHQ6IGluYm94UGxhY2VtZW50UmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5kZWxldGUoXCIvdjQvaW5ib3gvcmVzdWx0cy9cIi5jb25jYXQoaWQpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSwgcmVzcG9uc2UuYm9keSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQucHJvdG90eXBlLmdldFJlc3VsdEJ5U2hhcmVJZCA9IGZ1bmN0aW9uIChzaGFyZUlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSwgaW5ib3hQbGFjZW1lbnRSZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoXCIvdjQvaW5ib3gvc2hhcmluZy9wdWJsaWMvXCIuY29uY2F0KHNoYXJlSWQpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5ib3hQbGFjZW1lbnRSZXN1bHQgPSB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQocmVzcG9uc2UuYm9keS5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluYm94UGxhY2VtZW50UmVzdWx0OiBpbmJveFBsYWNlbWVudFJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50O1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQocmVxdWVzdCwgcGF0aCkge1xuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQodGhpcy5wYXRoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHJlc3BvbnNlLmJvZHkuaXRlbXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldChcIlwiLmNvbmNhdCh0aGlzLnBhdGgsIFwiL1wiKS5jb25jYXQoYXR0cmlidXRlTmFtZSkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc3BvbnNlLmJvZHkpLCB7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudChyZXF1ZXN0LCBwYXRoKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgfVxuICAgIEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQodGhpcy5wYXRoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzdWx0LnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydGVkX2ZpbHRlcnM6IHJlc3VsdC5ib2R5LnN1cHBvcnRlZF9maWx0ZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgSVBSU2hhcmluZ0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJUFJTaGFyaW5nQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgSVBSU2hhcmluZ0NsaWVudC5wcm90b3R5cGUucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmcgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgaGFuZGxlZFNlZWRMaXN0RGF0ZXMgPSB7XG4gICAgICAgICAgICBleHBpcmVzX2F0OiBuZXcgRGF0ZShkYXRhLmV4cGlyZXNfYXQpLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgcmVzdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGRhdGEpLCBoYW5kbGVkU2VlZExpc3REYXRlcyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBJUFJTaGFyaW5nQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCByZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoXCIvdjQvaW5ib3gvc2hhcmluZy9cIi5jb25jYXQoaWQpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0U2hhcmluZyhyZXNwb25zZS5ib2R5LnNoYXJpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSwgcmVzdWx0KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSVBSU2hhcmluZ0NsaWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGlkLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSwgcmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucHV0KFwiL3Y0L2luYm94L3NoYXJpbmcvXCIuY29uY2F0KGlkKSwge30sIHsgcXVlcnk6IFwiZW5hYmxlZD1cIi5jb25jYXQoZGF0YS5lbmFibGVkKSB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0U2hhcmluZyhyZXNwb25zZS5ib2R5LnNoYXJpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXN1bHQpLCB7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSVBSU2hhcmluZ0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBJUFJTaGFyaW5nQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5wYXRoID0gJy92NC9pbmJveC9wcm92aWRlcnMnO1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGVkUHJvdmlkZXJEYXRlcyA9IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShpdGVtLmNyZWF0ZWRfYXQpLFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGl0ZW0udXBkYXRlZF9hdCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBpdGVtKSwgaGFuZGxlZFByb3ZpZGVyRGF0ZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KHRoaXMucGF0aCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBNZXRyaWNzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1ldHJpY3NDbGllbnQocmVxdWVzdCwgbG9nZ2VyKSB7XG4gICAgICAgIGlmIChsb2dnZXIgPT09IHZvaWQgMCkgeyBsb2dnZXIgPSBjb25zb2xlOyB9XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cbiAgICBNZXRyaWNzQ2xpZW50LnByb3RvdHlwZS5jb252ZXJ0RGF0ZVRvVVRDID0gZnVuY3Rpb24gKGtleSwgaW5wdXREYXRlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgQmVjYXVzZSBcIm5ldyBEYXRlKCcyMDIyLTEyLTI1VDAwOjAwOjAwLjAwMFonKVwiIGJlY29tZXMgXCJTdW4gRGVjIDI1IDIwMjIgMDI6MDA6MDAgR01UKzAyMDBcIlxuICAgICAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgICAgICBleDogJ1RodSwgMTMgT2N0IDIwMTEgMTg6MDI6MDAgKzAwMDAnLlxuICAgICAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFwiRGF0ZTpcXFwiXCIuY29uY2F0KGlucHV0RGF0ZSwgXCJcXFwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxcblZhbHVlIFxcXCJcIikuY29uY2F0KGlucHV0RGF0ZS50b1VUQ1N0cmluZygpLCBcIlxcXCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxcbkNvbnNpZGVyIHVzaW5nIHN0cmluZyB0eXBlIGZvciBwcm9wZXJ0eSBcXFwiXCIpLmNvbmNhdChrZXksIFwiXFxcIiB0byBhdm9pZCBhdXRvLWNvbnZlcnRpbmdcIikpO1xuICAgICAgICByZXR1cm4gaW5wdXREYXRlLnRvVVRDU3RyaW5nKCk7XG4gICAgfTtcbiAgICBNZXRyaWNzQ2xpZW50LnByb3RvdHlwZS5wcmVwYXJlUXVlcnkgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZTtcbiAgICAgICAgdmFyIGVuZERhdGU7XG4gICAgICAgIGlmIChxdWVyeSkge1xuICAgICAgICAgICAgdmFyIHFTdGFydCA9IHF1ZXJ5ID09PSBudWxsIHx8IHF1ZXJ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBxdWVyeS5zdGFydDtcbiAgICAgICAgICAgIHZhciBxRW5kID0gcXVlcnkgPT09IG51bGwgfHwgcXVlcnkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHF1ZXJ5LmVuZDtcbiAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IHFTdGFydCBpbnN0YW5jZW9mIERhdGUgPyB0aGlzLmNvbnZlcnREYXRlVG9VVEMoJ3N0YXJ0JywgcVN0YXJ0KSA6IHFTdGFydCAhPT0gbnVsbCAmJiBxU3RhcnQgIT09IHZvaWQgMCA/IHFTdGFydCA6ICcnO1xuICAgICAgICAgICAgZW5kRGF0ZSA9IHFFbmQgJiYgcUVuZCBpbnN0YW5jZW9mIERhdGUgPyB0aGlzLmNvbnZlcnREYXRlVG9VVEMoJ2VuZCcsIHFFbmQpIDogcUVuZCAhPT0gbnVsbCAmJiBxRW5kICE9PSB2b2lkIDAgPyBxRW5kIDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBxdWVyeSksIHsgc3RhcnQ6IHN0YXJ0RGF0ZSwgZW5kOiBlbmREYXRlIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgTWV0cmljc0NsaWVudC5wcm90b3R5cGUuaGFuZGxlUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHJlc0JvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICB2YXIgc3RhcnREYXRlID0gRGF0ZS5wYXJzZShyZXNCb2R5LnN0YXJ0KSA/IG5ldyBEYXRlKHJlc0JvZHkuc3RhcnQpIDogbnVsbDtcbiAgICAgICAgdmFyIGVuZERhdGUgPSBEYXRlLnBhcnNlKHJlc0JvZHkuZW5kKSA/IG5ldyBEYXRlKHJlc0JvZHkuZW5kKSA6IG51bGw7XG4gICAgICAgIHZhciByZXN1bHQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzQm9keSksIHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsIHN0YXJ0OiBzdGFydERhdGUsIGVuZDogZW5kRGF0ZSB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIE1ldHJpY3NDbGllbnQucHJvdG90eXBlLmdldEFjY291bnQgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5RGF0YSwgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeURhdGEgPSB0aGlzLnByZXBhcmVRdWVyeShxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucG9zdCgnL3YxL2FuYWx5dGljcy9tZXRyaWNzJywgcXVlcnlEYXRhKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuaGFuZGxlUmVzcG9uc2UocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNZXRyaWNzQ2xpZW50LnByb3RvdHlwZS5nZXRBY2NvdW50VXNhZ2UgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5RGF0YSwgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeURhdGEgPSB0aGlzLnByZXBhcmVRdWVyeShxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucG9zdCgnL3YxL2FuYWx5dGljcy91c2FnZS9tZXRyaWNzJywgcXVlcnlEYXRhKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuaGFuZGxlUmVzcG9uc2UocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTWV0cmljc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBNZXRyaWNzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbnZhciBEb21haW5UcmFja2luZ0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb21haW5UcmFja2luZ0NsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIERvbWFpblRyYWNraW5nQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VUcmFja2luZ1NldHRpbmdzID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5LnRyYWNraW5nO1xuICAgIH07XG4gICAgRG9tYWluVHJhY2tpbmdDbGllbnQucHJvdG90eXBlLl9wYXJzZVRyYWNraW5nVXBkYXRlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICAgIH07XG4gICAgRG9tYWluVHJhY2tpbmdDbGllbnQucHJvdG90eXBlLl9pc09wZW5UcmFja2luZ0luZm9XaXRQbGFjZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICdwbGFjZV9hdF90aGVfdG9wJyBpbiBvYmo7XG4gICAgfTtcbiAgICBEb21haW5UcmFja2luZ0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoXCIvdjIveDUwOS9cIi5jb25jYXQoZG9tYWluLCBcIi9zdGF0dXNcIikpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc3BvbnNlLmJvZHkpLCB7IHJlc3BvbnNlU3RhdHVzQ29kZTogcmVzcG9uc2Uuc3RhdHVzIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEb21haW5UcmFja2luZ0NsaWVudC5wcm90b3R5cGUuZ2VuZXJhdGUgPSBmdW5jdGlvbiAoZG9tYWluKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnBvc3QoXCIvdjIveDUwOS9cIi5jb25jYXQoZG9tYWluKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzcG9uc2UuYm9keSksIHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERvbWFpblRyYWNraW5nQ2xpZW50LnByb3RvdHlwZS5yZWdlbmVyYXRlID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wdXQoXCIvdjIveDUwOS9cIi5jb25jYXQoZG9tYWluKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzcG9uc2UuYm9keSksIHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERvbWFpblRyYWNraW5nQ2xpZW50LnByb3RvdHlwZS5nZXRUcmFja2luZyA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLl9wYXJzZVRyYWNraW5nU2V0dGluZ3MocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEb21haW5UcmFja2luZ0NsaWVudC5wcm90b3R5cGUudXBkYXRlVHJhY2tpbmcgPSBmdW5jdGlvbiAoZG9tYWluLCB0eXBlLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwcmVwYXJlZERhdGEsIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlcGFyZWREYXRhID0gX19hc3NpZ24oe30sIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLmFjdGl2ZSkgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXBhcmVkRGF0YS5hY3RpdmUgPSAoZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLmFjdGl2ZSkgPyAneWVzJyA6ICdubyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNPcGVuVHJhY2tpbmdJbmZvV2l0UGxhY2UoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEucGxhY2VfYXRfdGhlX3RvcCkgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVwYXJlZERhdGEucGxhY2VfYXRfdGhlX3RvcCA9IChkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEucGxhY2VfYXRfdGhlX3RvcCkgPyAneWVzJyA6ICdubyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJywgdHlwZSksIHByZXBhcmVkRGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLl9wYXJzZVRyYWNraW5nVXBkYXRlKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERvbWFpblRyYWNraW5nQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IERvbWFpblRyYWNraW5nQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24gfSBmcm9tIFwidHNsaWJcIjtcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdC5qcyc7XG5pbXBvcnQgRG9tYWluc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc0NsaWVudC5qcyc7XG5pbXBvcnQgRXZlbnRDbGllbnQgZnJvbSAnLi9FdmVudHMuanMnO1xuaW1wb3J0IFN0YXRzQ2xpZW50IGZyb20gJy4vU3RhdHMvU3RhdHNDbGllbnQuanMnO1xuaW1wb3J0IFN1cHByZXNzaW9uQ2xpZW50IGZyb20gJy4vU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uc0NsaWVudC5qcyc7XG5pbXBvcnQgV2ViaG9va3NDbGllbnQgZnJvbSAnLi9XZWJob29rcy5qcyc7XG5pbXBvcnQgTWVzc2FnZXNDbGllbnQgZnJvbSAnLi9NZXNzYWdlcy5qcyc7XG5pbXBvcnQgUm91dGVzQ2xpZW50IGZyb20gJy4vUm91dGVzLmpzJztcbmltcG9ydCBWYWxpZGF0ZUNsaWVudCBmcm9tICcuL1ZhbGlkYXRpb25zL3ZhbGlkYXRlLmpzJztcbmltcG9ydCBJcHNDbGllbnQgZnJvbSAnLi9JUHMuanMnO1xuaW1wb3J0IElwUG9vbHNDbGllbnQgZnJvbSAnLi9JUFBvb2xzLmpzJztcbmltcG9ydCBNYWlsaW5nTGlzdHNDbGllbnQgZnJvbSAnLi9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzLmpzJztcbmltcG9ydCBNYWlsTGlzdHNNZW1iZXJzIGZyb20gJy4vTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycy5qcyc7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNDcmVkZW50aWFscy5qcyc7XG5pbXBvcnQgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGZyb20gJy4vVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uLmpzJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUZW1wbGF0ZXMuanMnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUYWdzLmpzJztcbmltcG9ydCBTdWJhY2NvdW50c0NsaWVudCBmcm9tICcuL1N1YmFjY291bnRzLmpzJztcbmltcG9ydCBTZWVkc0xpc3RzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL1NlZWRzTGlzdHMvU2VlZHNMaXN0c0NsaWVudC5qcyc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL2luYm94UGxhY2VtZW50cy5qcyc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQuanMnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvQXR0cmlidXRlc0NsaWVudC5qcyc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9GaWx0ZXJzQ2xpZW50LmpzJztcbmltcG9ydCBJUFJTaGFyaW5nQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQuanMnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzLmpzJztcbmltcG9ydCBNZXRyaWNzQ2xpZW50IGZyb20gJy4vTWV0cmljcy9NZXRyaWNzQ2xpZW50LmpzJztcbmltcG9ydCBEb21haW5UcmFja2luZ0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc1RyYWNraW5nLmpzJztcbnZhciBNYWlsZ3VuQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haWxndW5DbGllbnQob3B0aW9ucywgZm9ybURhdGEpIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IF9fYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgICAgICAgaWYgKCFjb25maWcudXJsKSB7XG4gICAgICAgICAgICBjb25maWcudXJsID0gJ2h0dHBzOi8vYXBpLm1haWxndW4ubmV0JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbmZpZy51c2VybmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJ1c2VybmFtZVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25maWcua2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcImtleVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSBuZXcgUmVxdWVzdChjb25maWcsIGZvcm1EYXRhKTtcbiAgICAgICAgdmFyIG1haWxMaXN0c01lbWJlcnMgPSBuZXcgTWFpbExpc3RzTWVtYmVycyh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB2YXIgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQgPSBuZXcgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdmFyIGRvbWFpblRlbXBsYXRlc0NsaWVudCA9IG5ldyBEb21haW5UZW1wbGF0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdmFyIGRvbWFpblRhZ3NDbGllbnQgPSBuZXcgRG9tYWluVGFnc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB2YXIgZG9tYWluVHJhY2tpbmdDbGllbnQgPSBuZXcgRG9tYWluVHJhY2tpbmdDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdmFyIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCA9IG5ldyBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdmFyIEluYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50ID0gbmV3IElQUlNoYXJpbmdDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdmFyIHNlZWRzTGlzdHNBdHRyaWJ1dGVzID0gbmV3IEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3NlZWRsaXN0cy9hJyk7XG4gICAgICAgIHZhciByZXN1bHRzQXR0cmlidXRlc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9yZXN1bHRzL2EnKTtcbiAgICAgICAgdmFyIHNlZWRzTGlzdHNGaWx0ZXJzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3NlZWRsaXN0cy9fZmlsdGVycycpO1xuICAgICAgICB2YXIgcmVzdWx0c0ZpbHRlcnNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvcmVzdWx0cy9fZmlsdGVycycpO1xuICAgICAgICB2YXIgc2VlZHNMaXN0c0NsaWVudCA9IG5ldyBTZWVkc0xpc3RzQ2xpZW50KHRoaXMucmVxdWVzdCwgc2VlZHNMaXN0c0F0dHJpYnV0ZXMsIHNlZWRzTGlzdHNGaWx0ZXJzQ2xpZW50KTtcbiAgICAgICAgdmFyIGluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCh0aGlzLnJlcXVlc3QsIHJlc3VsdHNBdHRyaWJ1dGVzQ2xpZW50LCByZXN1bHRzRmlsdGVyc0NsaWVudCwgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQpO1xuICAgICAgICB2YXIgaW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLmRvbWFpbnMgPSBuZXcgRG9tYWluc0NsaWVudCh0aGlzLnJlcXVlc3QsIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LCBkb21haW5UZW1wbGF0ZXNDbGllbnQsIGRvbWFpblRhZ3NDbGllbnQsIGRvbWFpblRyYWNraW5nQ2xpZW50KTtcbiAgICAgICAgdGhpcy53ZWJob29rcyA9IG5ldyBXZWJob29rc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudENsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMubWV0cmljcyA9IG5ldyBNZXRyaWNzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMuc3VwcHJlc3Npb25zID0gbmV3IFN1cHByZXNzaW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSBuZXcgTWVzc2FnZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSBuZXcgUm91dGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMuaXBzID0gbmV3IElwc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLmlwX3Bvb2xzID0gbmV3IElwUG9vbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5saXN0cyA9IG5ldyBNYWlsaW5nTGlzdHNDbGllbnQodGhpcy5yZXF1ZXN0LCBtYWlsTGlzdHNNZW1iZXJzKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZSA9IG5ldyBWYWxpZGF0ZUNsaWVudCh0aGlzLnJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCk7XG4gICAgICAgIHRoaXMuc3ViYWNjb3VudHMgPSBuZXcgU3ViYWNjb3VudHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5pbmJveFBsYWNlbWVudHMgPSBuZXcgSW5ib3hQbGFjZW1lbnRzQ2xpZW50KHRoaXMucmVxdWVzdCwgc2VlZHNMaXN0c0NsaWVudCwgaW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCwgaW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50KTtcbiAgICB9XG4gICAgTWFpbGd1bkNsaWVudC5wcm90b3R5cGUuc2V0U3ViYWNjb3VudCA9IGZ1bmN0aW9uIChzdWJhY2NvdW50SWQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoX2EgPSB0aGlzLnJlcXVlc3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRTdWJhY2NvdW50SGVhZGVyKHN1YmFjY291bnRJZCk7XG4gICAgfTtcbiAgICBNYWlsZ3VuQ2xpZW50LnByb3RvdHlwZS5yZXNldFN1YmFjY291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5yZXF1ZXN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVzZXRTdWJhY2NvdW50SGVhZGVyKCk7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbGd1bkNsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBNYWlsZ3VuQ2xpZW50O1xuIiwiaW1wb3J0IE1haWxndW5DbGllbnQgZnJvbSAnLi9DbGFzc2VzL01haWxndW5DbGllbnQuanMnO1xudmFyIE1haWxndW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFpbGd1bihGb3JtRGF0YSkge1xuICAgICAgICB0aGlzLmZvcm1EYXRhID0gRm9ybURhdGE7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNYWlsZ3VuLCBcImRlZmF1bHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBNYWlsZ3VuLnByb3RvdHlwZS5jbGllbnQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IE1haWxndW5DbGllbnQob3B0aW9ucywgdGhpcy5mb3JtRGF0YSk7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbGd1bjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBNYWlsZ3VuO1xuIl0sIm5hbWVzIjpbImdsb2JhbCIsInRoaXMiLCJBeGlvc0Vycm9yIiwidXRpbHMiLCJwcm90b3R5cGUiLCJ0b0Zvcm1EYXRhIiwiZW5jb2RlIiwiVVJMU2VhcmNoUGFyYW1zIiwiRm9ybURhdGEiLCJCbG9iIiwicGxhdGZvcm0iLCJBeGlvc0hlYWRlcnMiLCJpc0NhbmNlbCIsIkNhbmNlbGVkRXJyb3IiLCJtZXJnZUNvbmZpZyIsIlZFUlNJT04iLCJ2YWxpZGF0b3JzIiwiQXhpb3MiLCJzcHJlYWQiLCJpc0F4aW9zRXJyb3IiLCJIdHRwU3RhdHVzQ29kZSIsIkNhbmNlbFRva2VuIiwiUmVxdWVzdCIsImJhc2U2NC5lbmNvZGUiXSwibWFwcGluZ3MiOiI7OztJQUFBO0lBQ0E7QUFDQTtJQUNBO0lBQ0E7QUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtBQUNBO0lBQ0EsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ25DLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0lBQ3pDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMxRyxJQUFJLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDRjtJQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDaEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssSUFBSTtJQUM3QyxRQUFRLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7SUFDbEcsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RixDQUFDO0FBQ0Q7SUFDTyxJQUFJLFFBQVEsR0FBRyxXQUFXO0lBQ2pDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFO0lBQ3JELFFBQVEsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDN0QsWUFBWSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLFlBQVksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsU0FBUztJQUNULFFBQVEsT0FBTyxDQUFDLENBQUM7SUFDakIsTUFBSztJQUNMLElBQUksT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzQyxFQUFDO0FBeUVEO0lBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0lBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0lBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtJQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5RSxLQUFLLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDRDtJQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxVQUFVLEdBQUcsUUFBUSxHQUFHLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEssSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtJQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUN0RSxRQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJO0lBQ3RELFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BELFlBQVksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQzlDLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDeEUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7SUFDakUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7SUFDakUsZ0JBQWdCO0lBQ2hCLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO0lBQ2hJLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO0lBQzFHLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxD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SUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxZQUFZO0lBQzFELFFBQVEsSUFBSSxFQUFFO0lBQ2QsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxNQUFNLElBQUksSUFBSSxFQUFFLEtBQUssTUFBTSxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUMscUJBQXFCLEVBQUU7SUFDM0YsS0FBSztJQUNMLElBQUksT0FBTyxhQUFhO0lBQ3hCLENBQUMsRUFBRSxDQUFDOztBQ2hGRCxRQUFDLE9BQU8sa0JBQWtCLFlBQVk7SUFDekMsSUFBSSxTQUFTLE9BQU8sQ0FBQyxRQUFRLEVBQUU7SUFDL0IsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVE7SUFDaEM7SUFDQSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRTtJQUM5QyxRQUFRLEdBQUcsRUFBRSxZQUFZLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRTtJQUN6QyxRQUFRLFVBQVUsRUFBRSxLQUFLO0lBQ3pCLFFBQVEsWUFBWSxFQUFFO0lBQ3RCLEtBQUssQ0FBQztJQUNOLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsVUFBVSxPQUFPLEVBQUU7SUFDbEQsUUFBUSxPQUFPLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3hELEtBQUs7SUFDTCxJQUFJLE9BQU8sT0FBTztJQUNsQixDQUFDLEVBQUU7Ozs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyLDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQxLDQyLDQzLDQ0LDQ1LDQ2LDQ3LDQ4LDQ5LDUwLDUxLDUyXX0=
