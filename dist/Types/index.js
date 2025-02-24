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
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var options, requestHeaders, params, body, response, urlValue, err_1, errorResponse, res;
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
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var res;
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

export { Mailgun as default };
