// mailgun.js v12.0.0 Copyright (c) 2025 Mailgun and contributors
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

class APIError extends Error {
    status;
    stack;
    details;
    type;
    static getUserDataError(statusText, message) {
        return new this({
            status: 400,
            statusText,
            body: {
                message
            }
        });
    }
    constructor({ status, statusText, message, body = {} }) {
        let bodyMessage = '';
        let error = '';
        if (typeof body === 'string') {
            bodyMessage = body;
        }
        else {
            bodyMessage = body?.message || '';
            error = body?.error || '';
        }
        super();
        this.stack = '';
        this.status = status;
        this.message = message || error || statusText || '';
        this.details = bodyMessage;
        this.type = 'MailgunAPIError';
    }
}

class BlobFromStream {
    _stream;
    size;
    constructor(stream, size) {
        this._stream = stream;
        this.size = size;
    }
    stream() {
        return this._stream;
    }
    get [Symbol.toStringTag]() {
        return 'Blob';
    }
}
class AttachmentsHandler {
    getAttachmentOptions(item) {
        const { filename, contentType, knownLength, } = item;
        return {
            ...(filename ? { filename } : { filename: 'file' }),
            ...(contentType && { contentType }),
            ...(knownLength && { knownLength })
        };
    }
    getFileInfo(file) {
        const { name: filename, type: contentType, size: knownLength, } = file;
        return this.getAttachmentOptions({ filename, contentType, knownLength });
    }
    getCustomFileInfo(file) {
        const { filename, contentType, knownLength, } = file;
        return this.getAttachmentOptions({ filename, contentType, knownLength });
    }
    getBufferInfo(buffer) {
        const { byteLength: knownLength, } = buffer;
        return this.getAttachmentOptions({ filename: 'file', contentType: '', knownLength });
    }
    isStream(data) {
        return typeof data === 'object' && typeof data.pipe === 'function';
    }
    isCustomFile(obj) {
        return typeof obj === 'object'
            && !!obj.data;
    }
    isBrowserFile(obj) {
        return typeof obj === 'object' && (!!obj.name || (typeof Blob !== 'undefined' && obj instanceof Blob));
    }
    isBuffer(data) {
        return typeof Buffer !== 'undefined' && Buffer.isBuffer(data);
    }
    getAttachmentInfo(attachment) {
        const isBrowserFile = this.isBrowserFile(attachment);
        const isCustomFile = this.isCustomFile(attachment);
        const isString = typeof attachment === 'string';
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
        const options = {
            filename: 'file',
            contentType: undefined,
            knownLength: undefined
        };
        return options;
    }
    convertToFDexpectedShape(userProvidedValue) {
        const isStream = this.isStream(userProvidedValue);
        const isBrowserFile = this.isBrowserFile(userProvidedValue);
        const isCustomFile = this.isCustomFile(userProvidedValue);
        const isString = typeof userProvidedValue === 'string';
        let result;
        if (isStream || isString || isBrowserFile || this.isBuffer(userProvidedValue)) {
            result = userProvidedValue;
        }
        else if (isCustomFile) {
            result = userProvidedValue.data;
        }
        else {
            throw APIError.getUserDataError(`Unknown attachment type ${typeof userProvidedValue}`, `The "attachment" property expects either Buffer, Blob, or String.
          Also, It is possible to provide an object that has the property "data" with a value that is equal to one of the types counted before.
          Additionally, you may use an array to send more than one attachment.`);
        }
        return result;
    }
    getBlobFromStream(stream, size) {
        return new BlobFromStream(stream, size);
    }
}

class FormDataBuilder {
    FormDataConstructor;
    fileKeys;
    attachmentsHandler;
    constructor(FormDataConstructor) {
        this.FormDataConstructor = FormDataConstructor;
        this.fileKeys = ['attachment', 'inline', 'multipleValidationFile'];
        this.attachmentsHandler = new AttachmentsHandler();
    }
    createFormData(data) {
        if (!data) {
            throw new Error('Please provide data object');
        }
        const formData = Object.keys(data)
            .filter(function (key) { return data[key]; })
            .reduce((formDataAcc, key) => {
            if (this.fileKeys.includes(key)) {
                const attachmentValue = data[key];
                if (this.isMessageAttachment(attachmentValue)) {
                    this.addFilesToFD(key, attachmentValue, formDataAcc);
                    return formDataAcc;
                }
                throw APIError.getUserDataError(`Unknown value ${data[key]} with type ${typeof data[key]} for property "${key}"`, `The key "${key}" should have type of Buffer, Stream, File, or String `);
            }
            if (key === 'message') { // mime message
                const messageValue = data[key];
                if (!messageValue || !this.isMIME(messageValue)) {
                    throw APIError.getUserDataError(`Unknown data type for "${key}" property`, 'The mime data should have type of Buffer, String or Blob');
                }
                this.addMimeDataToFD(key, messageValue, formDataAcc);
                return formDataAcc;
            }
            this.addCommonPropertyToFD(key, data[key], formDataAcc);
            return formDataAcc;
        }, new this.FormDataConstructor());
        return formData;
    }
    addMimeDataToFD(key, data, formDataInstance) {
        if (typeof data === 'string') { // if string only two parameters should be used.
            formDataInstance.append(key, data);
            return;
        }
        if (this.isFormDataPackage(formDataInstance)) { // form-data package is used
            const nodeFormData = formDataInstance;
            nodeFormData.append(key, data, { filename: 'MimeMessage' });
            return;
        }
        if (typeof Blob !== undefined) { // either node > 18 or browser
            const browserFormData = formDataInstance; // Browser compliant FormData
            if (data instanceof Blob) {
                browserFormData.append(key, data, 'MimeMessage');
                return;
            }
            if (this.attachmentsHandler.isBuffer(data)) { // node environment
                const blobInstance = new Blob([data]);
                browserFormData.append(key, blobInstance, 'MimeMessage');
            }
        }
    }
    isMIME(data) {
        return typeof data === 'string'
            || (typeof Blob !== 'undefined' && data instanceof Blob)
            || this.attachmentsHandler.isBuffer(data)
            || (typeof ReadableStream !== 'undefined' && data instanceof ReadableStream);
    }
    isFormDataPackage(obj) {
        return typeof obj === 'object'
            && obj !== null
            && typeof obj.getHeaders === 'function';
    }
    isMessageAttachment(value) {
        return (this.attachmentsHandler.isCustomFile(value)
            || typeof value === 'string'
            || (typeof File !== 'undefined' && value instanceof File)
            || (typeof Blob !== 'undefined' && value instanceof Blob)
            || this.attachmentsHandler.isBuffer(value)
            || this.attachmentsHandler.isStream(value)
            || (Array.isArray(value) && value.every((item) => this.attachmentsHandler.isCustomFile(item)
                || (typeof File !== 'undefined' && item instanceof File)
                || (typeof Blob !== 'undefined' && value instanceof Blob)
                || this.attachmentsHandler.isBuffer(item)
                || this.attachmentsHandler.isStream(item))));
    }
    addFilesToFD(propertyName, value, formDataInstance) {
        const appendFileToFD = (originalKey, attachment, formData) => {
            const key = originalKey === 'multipleValidationFile' ? 'file' : originalKey;
            const objData = this.attachmentsHandler.convertToFDexpectedShape(attachment);
            const options = this.attachmentsHandler.getAttachmentInfo(attachment);
            if (this.isFormDataPackage(formData)) {
                const fd = formData;
                const data = typeof objData === 'string' ? Buffer.from(objData) : objData;
                fd.append(key, data, options);
                return;
            }
            if (typeof Blob !== undefined) { // either node > 18 or browser
                const browserFormData = formDataInstance; // Browser compliant FormData
                if (typeof objData === 'string' || this.attachmentsHandler.isBuffer(objData)) {
                    const blobInstance = new Blob([objData]);
                    browserFormData.append(key, blobInstance, options.filename);
                    return;
                }
                if (objData instanceof Blob) {
                    browserFormData.append(key, objData, options.filename);
                    return;
                }
                if (this.attachmentsHandler.isStream(objData)) {
                    const blob = this.attachmentsHandler.getBlobFromStream(objData, options.knownLength);
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
    }
    addCommonPropertyToFD(key, value, formDataAcc) {
        const addValueBasedOnFD = (fdKey, fdValue) => {
            if (this.isFormDataPackage(formDataAcc)) {
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
    }
}

class SubaccountsClient {
    request;
    static SUBACCOUNT_HEADER = 'X-Mailgun-On-Behalf-Of';
    constructor(request) {
        this.request = request;
    }
    list(query) {
        return this.request.get('/v5/accounts/subaccounts', query)
            .then((res) => res.body);
    }
    get(id) {
        return this.request.get(`/v5/accounts/subaccounts/${id}`)
            .then((res) => res.body);
    }
    create(name) {
        return this.request.postWithFD('/v5/accounts/subaccounts', { name })
            .then((res) => res.body);
    }
    enable(id) {
        return this.request.post(`/v5/accounts/subaccounts/${id}/enable`)
            .then((res) => res.body);
    }
    disable(id) {
        return this.request.post(`/v5/accounts/subaccounts/${id}/disable`)
            .then((res) => res.body);
    }
}

let Request$1 = class Request {
    username;
    key;
    url;
    timeout;
    headers;
    formDataBuilder;
    maxBodyLength;
    proxy;
    constructor(options, formData) {
        this.username = options.username;
        this.key = options.key;
        this.url = options.url;
        this.timeout = options.timeout;
        this.headers = this.makeHeadersFromObject(options.headers);
        this.formDataBuilder = new FormDataBuilder(formData);
        this.maxBodyLength = 52428800; // 50 MB
        this.proxy = options?.proxy;
    }
    async request(method, url, onCallOptions) {
        const options = { ...onCallOptions };
        delete options?.headers;
        const requestHeaders = this.joinAndTransformHeaders(onCallOptions);
        const params = { ...options };
        if (options?.query && Object.getOwnPropertyNames(options?.query).length > 0) {
            params.params = new URLSearchParams(options.query);
            delete params.query;
        }
        if (options?.body) {
            const body = options?.body;
            params.data = body;
            delete params.body;
        }
        let response;
        const urlValue = urljoin(this.url, url);
        try {
            response = await axios.request({
                method: method.toLocaleUpperCase(),
                timeout: this.timeout,
                url: urlValue,
                headers: requestHeaders,
                ...params,
                maxBodyLength: this.maxBodyLength,
                proxy: this.proxy,
            });
        }
        catch (err) {
            const errorResponse = err;
            throw new APIError({
                status: errorResponse?.response?.status || 400,
                statusText: errorResponse?.response?.statusText || errorResponse.code,
                body: errorResponse?.response?.data || errorResponse.message
            });
        }
        const res = await this.getResponseBody(response);
        return res;
    }
    async getResponseBody(response) {
        const res = {
            body: {},
            status: response?.status
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
        return res;
    }
    joinAndTransformHeaders(onCallOptions) {
        const requestHeaders = new AxiosHeaders();
        const basic = base64Exports.encode(`${this.username}:${this.key}`);
        requestHeaders.setAuthorization(`Basic ${basic}`);
        requestHeaders.set(this.headers);
        const receivedOnCallHeaders = onCallOptions && onCallOptions.headers;
        const onCallHeaders = this.makeHeadersFromObject(receivedOnCallHeaders);
        requestHeaders.set(onCallHeaders);
        return requestHeaders;
    }
    makeHeadersFromObject(headersObject = {}) {
        let requestHeaders = new AxiosHeaders();
        requestHeaders = Object.entries(headersObject).reduce((headersAccumulator, currentPair) => {
            const [key, value] = currentPair;
            headersAccumulator.set(key, value);
            return headersAccumulator;
        }, requestHeaders);
        return requestHeaders;
    }
    setSubaccountHeader(subaccountId) {
        const headers = this.makeHeadersFromObject({
            ...this.headers,
            [SubaccountsClient.SUBACCOUNT_HEADER]: subaccountId
        });
        this.headers.set(headers);
    }
    resetSubaccountHeader() {
        this.headers.delete(SubaccountsClient.SUBACCOUNT_HEADER);
    }
    query(method, url, query, options) {
        return this.request(method, url, { query, ...options });
    }
    command(method, url, data, options, addDefaultHeaders = true) {
        let headers = {};
        if (addDefaultHeaders) {
            headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        }
        const requestOptions = {
            ...headers,
            body: data,
            ...options
        };
        return this.request(method, url, requestOptions);
    }
    get(url, query, options) {
        return this.query('get', url, query, options);
    }
    post(url, data, options) {
        return this.command('post', url, data, options);
    }
    postWithFD(url, data) {
        const formData = this.formDataBuilder.createFormData(data);
        return this.command('post', url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }, false);
    }
    putWithFD(url, data) {
        const formData = this.formDataBuilder.createFormData(data);
        return this.command('put', url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }, false);
    }
    patchWithFD(url, data) {
        const formData = this.formDataBuilder.createFormData(data);
        return this.command('patch', url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }, false);
    }
    put(url, data, options) {
        return this.command('put', url, data, options);
    }
    delete(url, data) {
        return this.command('delete', url, data);
    }
};

/* eslint-disable camelcase */
class Domain {
    name;
    require_tls;
    skip_verification;
    state;
    wildcard;
    spam_action;
    created_at;
    smtp_password;
    smtp_login;
    type;
    receiving_dns_records;
    sending_dns_records;
    id;
    is_disabled;
    web_prefix;
    web_scheme;
    use_automatic_sender_security;
    dkim_host;
    mailfrom_host;
    constructor(data, receiving, sending) {
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
        const dynamicKeys = ['dkim_host', 'mailfrom_host'];
        const dynamicProperties = dynamicKeys.reduce((acc, propertyName) => {
            if (data[propertyName]) {
                const prop = propertyName;
                acc[prop] = data[propertyName];
            }
            return acc;
        }, {});
        Object.assign(this, dynamicProperties);
    }
}

class DomainsClient {
    request;
    domainCredentials;
    domainTemplates;
    domainTags;
    domainTracking;
    logger;
    constructor(request, domainCredentialsClient, domainTemplatesClient, domainTagsClient, domainTracking, logger = console) {
        this.request = request;
        this.domainCredentials = domainCredentialsClient;
        this.domainTemplates = domainTemplatesClient;
        this.domainTags = domainTagsClient;
        this.logger = logger;
        this.domainTracking = domainTracking;
    }
    _handleBoolValues(data) {
        const propsForReplacement = data;
        const replacedProps = Object.keys(propsForReplacement).reduce((acc, key) => {
            const prop = key;
            if (typeof propsForReplacement[prop] === 'boolean') {
                const value = propsForReplacement[prop];
                acc[prop] = (value.toString() === 'true') ? 'true' : 'false';
            }
            return acc;
        }, {});
        return { ...data, ...replacedProps };
    }
    _parseMessage(response) {
        return response.body;
    }
    parseDomainList(response) {
        if (response.body && response.body.items) {
            return response.body.items.map(function (item) {
                return new Domain(item);
            });
        }
        return [];
    }
    _parseDomain(response) {
        return new Domain(response.body.domain, response.body.receiving_dns_records, response.body.sending_dns_records);
    }
    list(query) {
        return this.request.get('/v4/domains', query)
            .then((res) => this.parseDomainList(res));
    }
    get(domain, query) {
        const preparedQuery = query ? {
            'h:extended': query?.extended ?? false,
            'h:with_dns': query?.with_dns ?? true,
        } : {};
        return this.request.get(`/v4/domains/${domain}`, preparedQuery)
            .then((res) => this._parseDomain(res));
    }
    create(data) {
        const postObj = this._handleBoolValues(data);
        return this.request.postWithFD('/v4/domains', postObj)
            .then((res) => this._parseDomain(res));
    }
    update(domain, data) {
        const putData = this._handleBoolValues(data);
        return this.request.putWithFD(`/v4/domains/${domain}`, putData)
            .then((res) => this._parseDomain(res));
    }
    verify(domain) {
        return this.request.put(`/v4/domains/${domain}/verify`)
            .then((res) => this._parseDomain(res));
    }
    destroy(domain) {
        return this.request.delete(`/v3/domains/${domain}`)
            .then((res) => this._parseMessage(res));
    }
    getConnection(domain) {
        return this.request.get(`/v3/domains/${domain}/connection`)
            .then((res) => res)
            .then((res) => res.body);
    }
    updateConnection(domain, data) {
        return this.request.put(`/v3/domains/${domain}/connection`, data)
            .then((res) => res)
            .then((res) => res.body);
    }
    // Tracking
    /**
    * @deprecated 'domains.getTracking' method is deprecated, and will be removed.
    * Please use 'domains.domainTracking.getTracking' instead.
    */
    getTracking(domain) {
        this.logger.warn(`
      'domains.getTracking' method is deprecated, and will be removed. Please use 'domains.domainTracking.getTracking' instead.
    `);
        return this.domainTracking.getTracking(domain);
    }
    /**
    * @deprecated 'domains.updateTracking' method is deprecated, and will be removed.
    * Please use 'domains.domainTracking.updateTracking' instead.
    */
    updateTracking(domain, type, data) {
        this.logger.warn(`
      'domains.updateTracking' method is deprecated, and will be removed. Please use 'domains.domainTracking.updateTracking' instead.
    `);
        return this.domainTracking.updateTracking(domain, type, data);
    }
    // IPs
    /**
    * @deprecated "domains.getIps" method is deprecated, and will be removed in the future releases.
    */
    getIps(domain) {
        this.logger.warn('"domains.getIps" method is deprecated and will be removed in the future releases.');
        return this.request.get(urljoin('/v3/domains', domain, 'ips'))
            .then((response) => response?.body?.items);
    }
    /**
    * @deprecated "domains.assignIp" method is deprecated, and will be removed in the future releases.
    */
    assignIp(domain, ip) {
        this.logger.warn('"domains.assignIp" method is deprecated and will be removed in the future releases.');
        return this.request.postWithFD(urljoin('/v3/domains', domain, 'ips'), { ip });
    }
    /**
    * @deprecated "domains.deleteIp" method is deprecated, and will be moved to the IpsClient.
    */
    deleteIp(domain, ip) {
        this.logger.warn('"domains.deleteIp" method is deprecated and will be moved into the IpsClient in the future releases.');
        return this.request.delete(urljoin('/v3/domains', domain, 'ips', ip));
    }
    /**
    * @deprecated "domains.linkIpPool" method is deprecated, and will be removed
    * in the future releases.
    */
    linkIpPool(domain, poolId) {
        this.logger.warn('"domains.linkIpPool" method is deprecated, and will be removed in the future releases.');
        return this.request.postWithFD(urljoin('/v3/domains', domain, 'ips'), { pool_id: poolId });
    }
    /**
    * @deprecated "domains.unlinkIpPoll" method is deprecated, and will be moved into the IpsClient
    * in the future releases.
    */
    unlinkIpPoll(domain, replacement) {
        this.logger.warn('"domains.unlinkIpPoll" method is deprecated, and will be moved into the IpsClient in the future releases.');
        let searchParams = '';
        if (replacement.pool_id && replacement.ip) {
            throw APIError.getUserDataError('Too much data for replacement', 'Please specify either pool_id or ip (not both)');
        }
        else if (replacement.pool_id) {
            searchParams = `?pool_id=${replacement.pool_id}`;
        }
        else if (replacement.ip) {
            searchParams = `?ip=${replacement.ip}`;
        }
        return this.request.delete(urljoin('/v3/domains', domain, 'ips', 'ip_pool', searchParams));
    }
    updateDKIMAuthority(domain, data) {
        return this.request.put(`/v3/domains/${domain}/dkim_authority`, {}, { query: `self=${data.self}` })
            .then((res) => res)
            .then((res) => res.body);
    }
    async updateDKIMSelector(domain, data) {
        const res = await this.request.put(`/v3/domains/${domain}/dkim_selector`, {}, { query: `dkim_selector=${data.dkimSelector}` });
        return {
            status: res.status,
            message: res?.body?.message
        };
    }
    /**
    * @deprecated "domains.updateWebPrefix" method is deprecated.
    * Please use domains.update to set new "web_prefix".
    * Current method will be removed in the future releases.
    */
    updateWebPrefix(domain, data) {
        this.logger.warn('"domains.updateWebPrefix" method is deprecated, please use domains.update to set new "web_prefix". Current method will be removed in the future releases.');
        return this.request.put(`/v3/domains/${domain}/web_prefix`, {}, { query: `web_prefix=${data.webPrefix}` })
            .then((res) => res);
    }
}

class NavigationThruPages {
    request;
    constructor(request) {
        if (request) {
            this.request = request;
        }
    }
    parsePage(id, pageUrl, urlSeparator, iteratorName) {
        const parsedUrl = new URL(pageUrl);
        const { searchParams } = parsedUrl;
        const pageValue = pageUrl && typeof pageUrl === 'string' ? pageUrl.split(urlSeparator).pop() || '' : '';
        let iteratorPosition = null;
        if (iteratorName) {
            iteratorPosition = searchParams.has(iteratorName)
                ? searchParams.get(iteratorName)
                : undefined;
        }
        return {
            id,
            page: urlSeparator === '?' ? `?${pageValue}` : pageValue,
            iteratorPosition,
            url: pageUrl
        };
    }
    parsePageLinks(response, urlSeparator, iteratorName) {
        const pages = Object.entries(response.body.paging);
        return pages.reduce((acc, [id, pageUrl]) => {
            acc[id] = this.parsePage(id, pageUrl, urlSeparator, iteratorName);
            return acc;
        }, {});
    }
    updateUrlAndQuery(clientUrl, query) {
        let url = clientUrl;
        const queryCopy = { ...query };
        if (queryCopy.page) {
            url = urljoin(clientUrl, queryCopy.page);
            delete queryCopy.page;
        }
        return {
            url,
            updatedQuery: queryCopy
        };
    }
    async requestListWithPages(clientUrl, query, Model) {
        const { url, updatedQuery } = this.updateUrlAndQuery(clientUrl, query);
        if (this.request) {
            const response = await this.request.get(url, updatedQuery);
            // Model here is usually undefined except for Suppression Client
            return this.parseList(response, Model);
        }
        throw new APIError({
            status: 500,
            statusText: 'Request property is empty',
            body: { message: '' }
        });
    }
}

class EventClient extends NavigationThruPages {
    request;
    constructor(request) {
        super(request);
        this.request = request;
    }
    parseList(response) {
        const data = {};
        data.items = response.body.items;
        data.pages = this.parsePageLinks(response, '/');
        data.status = response.status;
        return data;
    }
    async get(domain, query) {
        return this.requestListWithPages(urljoin('/v3', domain, 'events'), query);
    }
}

class StatsContainer {
    start;
    end;
    resolution;
    stats;
    constructor(data) {
        this.start = new Date(data.start);
        this.end = new Date(data.end);
        this.resolution = data.resolution;
        this.stats = data.stats.map(function (stat) {
            const res = { ...stat };
            res.time = new Date(stat.time);
            return res;
        });
    }
}

class StatsClient {
    request;
    logger;
    constructor(request, logger = console) {
        this.request = request;
        this.logger = logger;
    }
    convertDateToUTC(key, inputDate) {
        /*
          Because "new Date('2022-12-25T00:00:00.000Z')" becomes "Sun Dec 25 2022 02:00:00 GMT+0200"
          (plus 2 hours from the timezone)
          and because for API, we need to provide the date in the expected format
          ex: 'Thu, 13 Oct 2011 18:02:00 +0000'.
          Here we try auto-convert them to UTC
        */
        this.logger.warn(`Date:"${inputDate}" was auto-converted to UTC time zone.
Value "${inputDate.toUTCString()}" will be used for request.
Consider using string type for property "${key}" to avoid auto-converting`);
        return [key, inputDate.toUTCString()];
    }
    prepareSearchParams(query) {
        let searchParams = [];
        if (typeof query === 'object' && Object.keys(query).length) {
            searchParams = Object.entries(query).reduce((arrayWithPairs, currentPair) => {
                const [key, value] = currentPair;
                if (Array.isArray(value) && value.length) { // event: ['delivered', 'accepted']
                    const repeatedProperty = value.map((item) => [key, item]);
                    return [...arrayWithPairs, ...repeatedProperty]; // [[event,delivered], [event,accepted]]
                }
                if (value instanceof Date) {
                    arrayWithPairs.push(this.convertDateToUTC(key, value));
                    return arrayWithPairs;
                }
                if (typeof value === 'string') {
                    arrayWithPairs.push([key, value]);
                }
                return arrayWithPairs;
            }, []);
        }
        return searchParams;
    }
    parseStats(response) {
        return new StatsContainer(response.body);
    }
    getDomain(domain, query) {
        const searchParams = this.prepareSearchParams(query);
        return this.request.get(urljoin('/v3', domain, 'stats/total'), searchParams)
            .then(this.parseStats);
    }
    getAccount(query) {
        const searchParams = this.prepareSearchParams(query);
        return this.request.get('/v3/stats/total', searchParams)
            .then(this.parseStats);
    }
}

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

class Suppression {
    type;
    constructor(type) {
        this.type = type;
    }
}

class Bounce extends Suppression {
    address;
    code;
    error;
    /* eslint-disable camelcase */
    created_at;
    constructor(data) {
        super(SuppressionModels.BOUNCES);
        this.address = data.address;
        this.code = +data.code;
        this.error = data.error;
        this.created_at = new Date(data.created_at);
    }
}

class Complaint extends Suppression {
    address;
    /* eslint-disable camelcase */
    created_at;
    constructor(data) {
        super(SuppressionModels.COMPLAINTS);
        this.address = data.address;
        this.created_at = new Date(data.created_at);
    }
}

class Unsubscribe extends Suppression {
    address;
    tags;
    /* eslint-disable camelcase */
    created_at;
    constructor(data) {
        super(SuppressionModels.UNSUBSCRIBES);
        this.address = data.address;
        this.tags = data.tags;
        this.created_at = new Date(data.created_at);
    }
}

class WhiteList extends Suppression {
    value;
    reason;
    createdAt;
    constructor(data) {
        super(SuppressionModels.WHITELISTS);
        this.value = data.value;
        this.reason = data.reason;
        this.createdAt = new Date(data.createdAt);
    }
}

const createOptions = {
    headers: { 'Content-Type': 'application/json' }
};
class SuppressionClient extends NavigationThruPages {
    request;
    models;
    constructor(request) {
        super(request);
        this.request = request;
        this.models = {
            bounces: Bounce,
            complaints: Complaint,
            unsubscribes: Unsubscribe,
            whitelists: WhiteList,
        };
    }
    parseList(response, Model) {
        const data = {};
        data.items = response.body.items?.map((item) => new Model(item)) || [];
        data.pages = this.parsePageLinks(response, '?', 'address');
        data.status = response.status;
        return data;
    }
    _parseItem(data, Model) {
        return new Model(data);
    }
    createWhiteList(domain, data, isDataArray) {
        if (isDataArray) {
            throw APIError.getUserDataError('Data property should be an object', 'Whitelist\'s creation process does not support multiple creations. Data property should be an object');
        }
        return this.request
            .postWithFD(urljoin('v3', domain, 'whitelists'), data)
            .then(this.prepareResponse);
    }
    createUnsubscribe(domain, data) {
        if (Array.isArray(data)) { // User provided an array
            const isContainsTag = data.some((unsubscribe) => unsubscribe.tag);
            if (isContainsTag) {
                throw APIError.getUserDataError('Tag property should not be used for creating multiple unsubscribes.', 'Tag property can be used only if one unsubscribe provided as second argument of create method. Please use tags instead.');
            }
            return this.request
                .post(urljoin('v3', domain, 'unsubscribes'), JSON.stringify(data), createOptions)
                .then(this.prepareResponse);
        }
        if (data?.tags) {
            throw APIError.getUserDataError('Tags property should not be used for creating one unsubscribe.', 'Tags property can be used if you provides an array of unsubscribes as second argument of create method. Please use tag instead');
        }
        if (Array.isArray(data.tag)) {
            throw APIError.getUserDataError('Tag property can not be an array', 'Please use array of unsubscribes as second argument of create method to be able to provide few tags');
        }
        /* We need Form Data for unsubscribes if we want to support the "tag" property */
        return this.request
            .postWithFD(urljoin('v3', domain, 'unsubscribes'), data)
            .then(this.prepareResponse);
    }
    getModel(type) {
        if (type in this.models) {
            return this.models[type];
        }
        throw APIError.getUserDataError('Unknown type value', 'Type may be only one of [bounces, complaints, unsubscribes, whitelists]');
    }
    prepareResponse(response) {
        return {
            message: response.body.message,
            type: response.body.type || '',
            value: response.body.value || '',
            status: response.status
        };
    }
    async list(domain, type, query) {
        const model = this.getModel(type);
        return this.requestListWithPages(urljoin('v3', domain, type), query, model);
    }
    get(domain, type, address) {
        const model = this.getModel(type);
        return this.request
            .get(urljoin('v3', domain, type, encodeURIComponent(address)))
            .then((response) => this._parseItem(response.body, model));
    }
    create(domain, type, data) {
        this.getModel(type);
        // supports adding multiple suppressions by default
        let postData;
        const isDataArray = Array.isArray(data);
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
            postData = [...data];
        }
        return this.request
            .post(urljoin('v3', domain, type), JSON.stringify(postData), createOptions)
            .then(this.prepareResponse);
    }
    destroy(domain, type, address) {
        this.getModel(type);
        return this.request
            .delete(urljoin('v3', domain, type, encodeURIComponent(address)))
            .then((response) => ({
            message: response.body.message,
            value: response.body.value || '',
            address: response.body.address || '',
            status: response.status
        }));
    }
}

class Webhook {
    id;
    url;
    urls;
    constructor(id, url, urls) {
        this.id = id;
        this.url = url;
        this.urls = urls;
    }
}
class WebhooksClient {
    request;
    constructor(request) {
        this.request = request;
    }
    _parseWebhookList(response) {
        return response.body.webhooks;
    }
    _parseWebhookWithID(id) {
        return function (response) {
            const webhookResponse = response?.body?.webhook;
            let url = webhookResponse?.url;
            let urls = webhookResponse?.urls;
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
    }
    _parseWebhookTest(response) {
        return {
            code: response.body.code,
            message: response.body.message
        };
    }
    list(domain, query) {
        return this.request.get(urljoin('/v3/domains', domain, 'webhooks'), query)
            .then(this._parseWebhookList);
    }
    get(domain, id) {
        return this.request.get(urljoin('/v3/domains', domain, 'webhooks', id))
            .then(this._parseWebhookWithID(id));
    }
    create(domain, id, url, test = false) {
        if (test) {
            return this.request.putWithFD(urljoin('/v3/domains', domain, 'webhooks', id, 'test'), { url })
                .then(this._parseWebhookTest);
        }
        return this.request.postWithFD(urljoin('/v3/domains', domain, 'webhooks'), { id, url })
            .then(this._parseWebhookWithID(id));
    }
    update(domain, id, urlValues) {
        return this.request.putWithFD(urljoin('/v3/domains', domain, 'webhooks', id), { url: urlValues })
            .then(this._parseWebhookWithID(id));
    }
    destroy(domain, id) {
        return this.request.delete(urljoin('/v3/domains', domain, 'webhooks', id))
            .then(this._parseWebhookWithID(id));
    }
}

class MessagesClient {
    request;
    constructor(request) {
        this.request = request;
    }
    prepareBooleanValues(data) {
        const yesNoProperties = new Set([
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
        return Object.keys(data).reduce((acc, key) => {
            if (yesNoProperties.has(key) && typeof data[key] === 'boolean') {
                acc[key] = data[key] ? 'yes' : 'no';
            }
            else {
                acc[key] = data[key];
            }
            return acc;
        }, {});
    }
    _parseResponse(response) {
        return {
            status: response.status,
            ...response.body
        };
    }
    create(domain, data) {
        if (data.message) {
            return this.request.postWithFD(`/v3/${domain}/messages.mime`, data)
                .then(this._parseResponse);
        }
        const modifiedData = this.prepareBooleanValues(data);
        return this.request.postWithFD(`/v3/${domain}/messages`, modifiedData)
            .then(this._parseResponse);
    }
}

class RoutesClient {
    request;
    constructor(request) {
        this.request = request;
    }
    list(query) {
        return this.request.get('/v3/routes', query)
            .then((response) => response.body.items);
    }
    get(id) {
        return this.request.get(`/v3/routes/${id}`)
            .then((response) => response.body.route);
    }
    create(data) {
        return this.request.postWithFD('/v3/routes', data)
            .then((response) => response.body.route);
    }
    update(id, data) {
        return this.request.putWithFD(`/v3/routes/${id}`, data)
            .then((response) => response.body);
    }
    destroy(id) {
        return this.request.delete(`/v3/routes/${id}`)
            .then((response) => response.body);
    }
}

class ValidateClient {
    multipleValidation;
    request;
    constructor(request, multipleValidationClient) {
        this.request = request;
        this.multipleValidation = multipleValidationClient;
    }
    async get(address) {
        const query = { address };
        const result = await this.request.get('/v4/address/validate', query);
        return result.body;
    }
}

class IpsClient {
    request;
    constructor(request) {
        this.request = request;
    }
    async list(query) {
        const response = await this.request.get('/v3/ips', query);
        return this.parseIpsResponse(response);
    }
    async get(ip) {
        const response = await this.request.get(`/v3/ips/${ip}`);
        return this.parseIpsResponse(response);
    }
    parseIpsResponse(response) {
        return response.body;
    }
}

class IpPoolsClient {
    request;
    constructor(request) {
        this.request = request;
    }
    list() {
        return this.request.get('/v1/ip_pools')
            .then((response) => this.parseIpPoolsResponse(response));
    }
    async create(data) {
        const response = await this.request.postWithFD('/v1/ip_pools', data);
        return {
            status: response.status,
            ...response.body
        };
    }
    async update(poolId, data) {
        const response = await this.request.patchWithFD(`/v1/ip_pools/${poolId}`, data);
        return {
            status: response.status,
            ...response.body
        };
    }
    async delete(poolId, data) {
        const response = await this.request.delete(`/v1/ip_pools/${poolId}`, data);
        return {
            status: response.status,
            ...response.body
        };
    }
    parseIpPoolsResponse(response) {
        return {
            status: response.status,
            ...response.body
        };
    }
}

class MailingListsClient extends NavigationThruPages {
    baseRoute;
    request;
    members;
    constructor(request, members) {
        super(request);
        this.request = request;
        this.baseRoute = '/v3/lists';
        this.members = members;
    }
    parseValidationResult(status, data) {
        return {
            status,
            validationResult: {
                ...data,
                created_at: new Date(data.created_at * 1000) // add millisecond to Unix timestamp
            }
        };
    }
    parseList(response) {
        const data = {};
        data.items = response.body.items;
        data.pages = this.parsePageLinks(response, '?', 'address');
        data.status = response.status;
        return data;
    }
    async list(query) {
        return this.requestListWithPages(`${this.baseRoute}/pages`, query);
    }
    get(mailListAddress) {
        return this.request.get(`${this.baseRoute}/${mailListAddress}`)
            .then((response) => response.body.list);
    }
    create(data) {
        return this.request.postWithFD(this.baseRoute, data)
            .then((response) => response.body.list);
    }
    update(mailListAddress, data) {
        return this.request.putWithFD(`${this.baseRoute}/${mailListAddress}`, data)
            .then((response) => response.body.list);
    }
    destroy(mailListAddress) {
        return this.request.delete(`${this.baseRoute}/${mailListAddress}`)
            .then((response) => response.body);
    }
    validate(mailListAddress) {
        return this.request.post(`${this.baseRoute}/${mailListAddress}/validate`, {})
            .then((response) => ({
            status: response.status,
            ...response.body
        }));
    }
    validationResult(mailListAddress) {
        return this.request.get(`${this.baseRoute}/${mailListAddress}/validate`)
            .then((response) => this.parseValidationResult(response.status, response.body));
    }
    cancelValidation(mailListAddress) {
        return this.request.delete(`${this.baseRoute}/${mailListAddress}/validate`)
            .then((response) => ({
            status: response.status,
            message: response.body.message
        }));
    }
}

class MailListsMembers extends NavigationThruPages {
    baseRoute;
    request;
    constructor(request) {
        super(request);
        this.request = request;
        this.baseRoute = '/v3/lists';
    }
    checkAndUpdateData(data) {
        const newData = { ...data };
        if (typeof data.vars === 'object') {
            newData.vars = JSON.stringify(newData.vars);
        }
        if (typeof data.subscribed === 'boolean') {
            newData.subscribed = data.subscribed ? 'yes' : 'no';
        }
        return newData;
    }
    parseList(response) {
        const data = {};
        data.items = response.body.items;
        data.pages = this.parsePageLinks(response, '?', 'address');
        return data;
    }
    async listMembers(mailListAddress, query) {
        return this.requestListWithPages(`${this.baseRoute}/${mailListAddress}/members/pages`, query);
    }
    getMember(mailListAddress, mailListMemberAddress) {
        return this.request.get(`${this.baseRoute}/${mailListAddress}/members/${mailListMemberAddress}`)
            .then((response) => response.body.member);
    }
    createMember(mailListAddress, data) {
        const reqData = this.checkAndUpdateData(data);
        return this.request.postWithFD(`${this.baseRoute}/${mailListAddress}/members`, reqData)
            .then((response) => response.body.member);
    }
    createMembers(mailListAddress, data) {
        const newData = {
            members: Array.isArray(data.members) ? JSON.stringify(data.members) : data.members,
            upsert: data.upsert
        };
        return this.request.postWithFD(`${this.baseRoute}/${mailListAddress}/members.json`, newData)
            .then((response) => response.body);
    }
    updateMember(mailListAddress, mailListMemberAddress, data) {
        const reqData = this.checkAndUpdateData(data);
        return this.request.putWithFD(`${this.baseRoute}/${mailListAddress}/members/${mailListMemberAddress}`, reqData)
            .then((response) => response.body.member);
    }
    destroyMember(mailListAddress, mailListMemberAddress) {
        return this.request.delete(`${this.baseRoute}/${mailListAddress}/members/${mailListMemberAddress}`)
            .then((response) => response.body);
    }
}

class DomainCredentialsClient {
    baseRoute;
    request;
    constructor(request) {
        this.request = request;
        this.baseRoute = '/v3/domains/';
    }
    _parseDomainCredentialsList(response) {
        return {
            items: response.body.items,
            totalCount: response.body.total_count
        };
    }
    _parseMessageResponse(response) {
        const result = {
            status: response.status,
            message: response.body.message
        };
        return result;
    }
    _parseDeletedResponse(response) {
        const result = {
            status: response.status,
            message: response.body.message,
            spec: response.body.spec
        };
        return result;
    }
    list(domain, query) {
        return this.request.get(urljoin(this.baseRoute, domain, '/credentials'), query)
            .then((res) => this._parseDomainCredentialsList(res));
    }
    create(domain, data) {
        return this.request.postWithFD(`${this.baseRoute}${domain}/credentials`, data)
            .then((res) => this._parseMessageResponse(res));
    }
    update(domain, credentialsLogin, data) {
        return this.request.putWithFD(`${this.baseRoute}${domain}/credentials/${credentialsLogin}`, data)
            .then((res) => this._parseMessageResponse(res));
    }
    destroy(domain, credentialsLogin) {
        return this.request.delete(`${this.baseRoute}${domain}/credentials/${credentialsLogin}`)
            .then((res) => this._parseDeletedResponse(res));
    }
}

class MultipleValidationJob {
    createdAt;
    id;
    quantity;
    recordsProcessed;
    status;
    downloadUrl;
    responseStatusCode;
    summary;
    constructor(data, responseStatusCode) {
        this.createdAt = new Date(data.created_at);
        this.id = data.id;
        this.quantity = data.quantity;
        this.recordsProcessed = data.records_processed;
        this.status = data.status;
        this.responseStatusCode = responseStatusCode;
        if (data.download_url) {
            this.downloadUrl = {
                csv: data.download_url?.csv,
                json: data.download_url?.json
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
}
class MultipleValidationClient extends NavigationThruPages {
    request;
    attachmentsHandler;
    constructor(request) {
        super();
        this.request = request;
        this.attachmentsHandler = new AttachmentsHandler();
    }
    handleResponse(response) {
        return {
            status: response.status,
            ...response?.body
        };
    }
    parseList(response) {
        const data = {};
        data.jobs = response.body.jobs.map((job) => new MultipleValidationJob(job, response.status));
        data.pages = this.parsePageLinks(response, '?', 'pivot');
        data.total = response.body.total;
        data.status = response.status;
        return data;
    }
    async list(query) {
        return this.requestListWithPages('/v4/address/validate/bulk', query);
    }
    async get(listId) {
        const response = await this.request.get(`/v4/address/validate/bulk/${listId}`);
        return new MultipleValidationJob(response.body, response.status);
    }
    convertToExpectedShape(data) {
        let multipleValidationData;
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
    }
    async create(listId, data) {
        if (!data || !data.file) {
            throw APIError.getUserDataError('"file" property expected.', 'Make sure second argument has "file" property.');
        }
        const multipleValidationData = this.convertToExpectedShape(data);
        const response = await this.request.postWithFD(`/v4/address/validate/bulk/${listId}`, multipleValidationData);
        return this.handleResponse(response);
    }
    async destroy(listId) {
        const response = await this.request.delete(`/v4/address/validate/bulk/${listId}`);
        return this.handleResponse(response);
    }
}

class DomainTemplateItem {
    name;
    description;
    createdAt;
    createdBy;
    id;
    version;
    versions;
    constructor(domainTemplateFromAPI) {
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
            this.versions = domainTemplateFromAPI.versions.map((version) => {
                const result = { ...version };
                result.createdAt = new Date(version.createdAt);
                return result;
            });
        }
    }
}
class DomainTemplatesClient extends NavigationThruPages {
    baseRoute;
    request;
    constructor(request) {
        super(request);
        this.request = request;
        this.baseRoute = '/v3/';
    }
    parseCreationResponse(data) {
        return new DomainTemplateItem(data.body.template);
    }
    parseCreationVersionResponse(data) {
        const result = {};
        result.status = data.status;
        result.message = data.body.message;
        if (data.body && data.body.template) {
            result.template = new DomainTemplateItem(data.body.template);
        }
        return result;
    }
    parseMutationResponse(data) {
        const result = {};
        result.status = data.status;
        result.message = data.body.message;
        if (data.body && data.body.template) {
            result.templateName = data.body.template.name;
        }
        return result;
    }
    parseNotificationResponse(data) {
        const result = {};
        result.status = data.status;
        result.message = data.body.message;
        return result;
    }
    parseMutateTemplateVersionResponse(data) {
        const result = {};
        result.status = data.status;
        result.message = data.body.message;
        if (data.body.template) {
            result.templateName = data.body.template.name;
            result.templateVersion = { tag: data.body.template.version.tag };
        }
        return result;
    }
    parseList(response) {
        const data = {};
        data.items = response.body.items.map((d) => new DomainTemplateItem(d));
        data.pages = this.parsePageLinks(response, '?', 'p');
        data.status = response.status;
        return data;
    }
    parseListTemplateVersions(response) {
        const data = {};
        data.template = new DomainTemplateItem(response.body.template);
        data.pages = this.parsePageLinks(response, '?', 'p');
        return data;
    }
    async list(domain, query) {
        return this.requestListWithPages(urljoin(this.baseRoute, domain, '/templates'), query);
    }
    get(domain, templateName, query) {
        return this.request.get(urljoin(this.baseRoute, domain, '/templates/', templateName), query)
            .then((res) => new DomainTemplateItem(res.body.template));
    }
    create(domain, data) {
        return this.request.postWithFD(urljoin(this.baseRoute, domain, '/templates'), data)
            .then((res) => this.parseCreationResponse(res));
    }
    update(domain, templateName, data) {
        return this.request.putWithFD(urljoin(this.baseRoute, domain, '/templates/', templateName), data)
            .then((res) => this.parseMutationResponse(res));
    }
    destroy(domain, templateName) {
        return this.request.delete(urljoin(this.baseRoute, domain, '/templates/', templateName))
            .then((res) => this.parseMutationResponse(res));
    }
    destroyAll(domain) {
        return this.request.delete(urljoin(this.baseRoute, domain, '/templates'))
            .then((res) => this.parseNotificationResponse(res));
    }
    listVersions(domain, templateName, query) {
        return this.request.get(urljoin(this.baseRoute, domain, '/templates', templateName, '/versions'), query)
            .then((res) => this.parseListTemplateVersions(res));
    }
    getVersion(domain, templateName, tag) {
        return this.request.get(urljoin(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag))
            .then((res) => new DomainTemplateItem(res.body.template));
    }
    createVersion(domain, templateName, data) {
        return this.request.postWithFD(urljoin(this.baseRoute, domain, '/templates/', templateName, '/versions'), data)
            .then((res) => this.parseCreationVersionResponse(res));
    }
    updateVersion(domain, templateName, tag, data) {
        return this.request.putWithFD(urljoin(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag), data)
            .then(
        // eslint-disable-next-line max-len
        (res) => this.parseMutateTemplateVersionResponse(res));
    }
    destroyVersion(domain, templateName, tag) {
        return this.request.delete(urljoin(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag))
            // eslint-disable-next-line max-len
            .then((res) => this.parseMutateTemplateVersionResponse(res));
    }
}

class DomainTag {
    tag;
    description;
    'first-seen';
    'last-seen';
    constructor(tagInfo) {
        this.tag = tagInfo.tag;
        this.description = tagInfo.description;
        this['first-seen'] = new Date(tagInfo['first-seen']);
        this['last-seen'] = new Date(tagInfo['last-seen']);
    }
}
class DomainTagStatistic {
    tag;
    description;
    start;
    end;
    resolution;
    stats;
    constructor(tagStatisticInfo) {
        this.tag = tagStatisticInfo.body.tag;
        this.description = tagStatisticInfo.body.description;
        this.start = new Date(tagStatisticInfo.body.start);
        this.end = new Date(tagStatisticInfo.body.end);
        this.resolution = tagStatisticInfo.body.resolution;
        this.stats = tagStatisticInfo.body.stats.map(function (stat) {
            const res = { ...stat, time: new Date(stat.time) };
            return res;
        });
    }
}
class DomainTagsClient extends NavigationThruPages {
    baseRoute;
    request;
    constructor(request) {
        super(request);
        this.request = request;
        this.baseRoute = '/v3/';
    }
    parseList(response) {
        const data = {};
        data.items = response.body.items.map((tagInfo) => new DomainTag(tagInfo));
        data.pages = this.parsePageLinks(response, '?', 'tag');
        data.status = response.status;
        return data;
    }
    _parseTagStatistic(response) {
        return new DomainTagStatistic(response);
    }
    async list(domain, query) {
        return this.requestListWithPages(urljoin(this.baseRoute, domain, '/tags'), query);
    }
    get(domain, tag) {
        return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag))
            .then((res) => new DomainTag(res.body));
    }
    update(domain, tag, description) {
        return this.request.put(urljoin(this.baseRoute, domain, '/tags', tag), description)
            .then((res) => res.body);
    }
    destroy(domain, tag) {
        return this.request.delete(`${this.baseRoute}${domain}/tags/${tag}`)
            .then((res) => ({
            message: res.body.message,
            status: res.status
        }));
    }
    statistic(domain, tag, query) {
        return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats'), query)
            .then((res) => this._parseTagStatistic(res));
    }
    countries(domain, tag) {
        return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/countries'))
            .then((res) => res.body);
    }
    providers(domain, tag) {
        return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/providers'))
            .then((res) => res.body);
    }
    devices(domain, tag) {
        return this.request.get(urljoin(this.baseRoute, domain, '/tags', tag, 'stats/aggregates/devices'))
            .then((res) => res.body);
    }
}

class SeedsListsClient extends NavigationThruPages {
    request;
    attributes;
    filters;
    logger;
    constructor(request, attributes, filters, logger = console) {
        super(request);
        this.request = request;
        this.attributes = attributes;
        this.filters = filters;
        this.logger = logger;
    }
    convertDateToUTC(key, inputDate) {
        /*
          Because "new Date('2022-12-25T00:00:00.000Z')" becomes "Sun Dec 25 2022 02:00:00 GMT+0200"
          (plus 2 hours from the timezone)
          and because for API, we need to provide the date in the expected format
          ex: 'Thu, 13 Oct 2011 18:02:00 +0000'.
          Here we try auto-convert them to UTC
        */
        this.logger.warn(`Date: "${inputDate}" was auto-converted to UTC time zone.
Value "${inputDate.toISOString()}" will be used for request.
Consider using string type for property "${key}" to avoid auto-converting`);
        return inputDate.toISOString();
    }
    prepareQueryData(queryData) {
        const propsForReplacement = queryData;
        const replacedProps = Object.keys(propsForReplacement).reduce((acc, key) => {
            const prop = key;
            if (!!propsForReplacement[prop] && typeof propsForReplacement[prop] === 'object') {
                const value = queryData[prop];
                acc[prop] = this.convertDateToUTC(prop, value);
            }
            return acc;
        }, {});
        const result = {
            ...queryData,
            ...replacedProps
        };
        return result;
    }
    prepareResult(data) {
        let result = {};
        const seedList = this.prepareSeedList(data.body);
        result = {
            ...seedList,
            status: data.status
        };
        return result;
    }
    prepareSeedList(data) {
        let seeds;
        const handledSeedListDates = {
            created_at: new Date(data.created_at),
            updated_at: new Date(data.updated_at),
            last_result_at: new Date(data.last_result_at),
        };
        if (data.Seeds) {
            seeds = data.Seeds.map((seedItem) => {
                let seed = {};
                const handledSeedDates = {
                    created_at: new Date(seedItem.created_at),
                    updated_at: new Date(seedItem.updated_at),
                    max_email_count_hit_at: new Date(seedItem.max_email_count_hit_at),
                    last_sent_to_at: new Date(seedItem.last_sent_to_at),
                    last_delivered_at: new Date(seedItem.last_delivered_at),
                };
                seed = {
                    ...seedItem,
                    ...handledSeedDates
                };
                return seed;
            });
        }
        else {
            seeds = null;
        }
        const seedList = {
            ...data,
            Seeds: seeds,
            ...handledSeedListDates
        };
        delete seedList.Id;
        return seedList;
    }
    parseList(response) {
        const data = {
            items: []
        };
        data.items = response.body.items?.map((item) => this.prepareSeedList(item));
        data.pages = this.parsePageLinks(response, '?', 'address');
        data.status = response.status;
        return data;
    }
    async list(query) {
        const queryData = this.prepareQueryData(query);
        const response = await this.request.get('/v4/inbox/seedlists', queryData);
        return {
            ...this.parseList(response),
            status: 200
        };
    }
    async get(id) {
        const response = await this.request.get(`/v4/inbox/seedlists/${id}`);
        const updatedSeedsList = this.prepareSeedList(response.body.seedlist);
        return {
            ...updatedSeedsList,
            status: response.status
        };
    }
    async create(data) {
        const response = await this.request.postWithFD('/v4/inbox/seedlists', data);
        return this.prepareResult(response);
    }
    async update(id, data) {
        const response = await this.request.put(`/v4/inbox/seedlists/${id}`, data);
        return this.prepareResult(response);
    }
    async destroy(id) {
        return this.request.delete(`/v4/inbox/seedlists/${id}`);
    }
}

class InboxPlacementsClient {
    request;
    seedsLists;
    results;
    providers;
    constructor(request, seedsListsClient, results, providers) {
        this.request = request;
        this.seedsLists = seedsListsClient;
        this.seedsLists = seedsListsClient;
        this.results = results;
        this.providers = providers;
    }
    async runTest(data) {
        const response = await this.request.post('/v4/inbox/tests', data);
        return {
            ...response.body,
            status: response.status
        };
    }
}

class InboxPlacementsResultsClient extends NavigationThruPages {
    request;
    attributes;
    filters;
    sharing;
    logger;
    constructor(request, attributes, filters, sharing, logger = console) {
        super(request);
        this.request = request;
        this.attributes = attributes;
        this.filters = filters;
        this.sharing = sharing;
        this.logger = logger;
    }
    convertDateToUTC(key, inputDate) {
        /*
          Because "new Date('2022-12-25T00:00:00.000Z')" becomes "Sun Dec 25 2022 02:00:00 GMT+0200"
          (plus 2 hours from the timezone)
          and because for API, we need to provide the date in the expected format
          ex: 'Thu, 13 Oct 2011 18:02:00 +0000'.
          Here we try auto-convert them to UTC
        */
        this.logger.warn(`Date: "${inputDate}" was auto-converted to UTC time zone.
Value "${inputDate.toISOString()}" will be used for request.
Consider using string type for property "${key}" to avoid auto-converting`);
        return inputDate.toISOString();
    }
    prepareQueryData(queryData) {
        const propsForReplacement = queryData;
        const replacedProps = Object.keys(propsForReplacement).reduce((acc, key) => {
            const prop = key;
            if (!!propsForReplacement[prop] && typeof propsForReplacement[prop] === 'object') {
                const value = queryData[prop];
                acc[prop] = this.convertDateToUTC(prop, value);
            }
            return acc;
        }, {});
        const result = {
            ...queryData,
            ...replacedProps
        };
        return result;
    }
    prepareInboxPlacementsResult(data) {
        let box = {};
        const handledSeedListDates = {
            created_at: new Date(data.created_at),
            updated_at: new Date(data.updated_at),
            sharing_expires_at: new Date(data.sharing_expires_at),
        };
        if (data.Box) {
            box = {
                ...data.Box,
                created_at: new Date(data.Box.created_at),
                updated_at: new Date(data.Box.updated_at),
                last_result_at: new Date(data.Box.last_result_at),
            };
            delete box.ID;
        }
        const inboxPlacementsResult = {
            ...data,
            Box: box,
            ...handledSeedListDates,
            id: data.Id,
        };
        delete inboxPlacementsResult.ID;
        return inboxPlacementsResult;
    }
    parseList(response) {
        const data = {};
        data.items = response.body.items.map((item) => this.prepareInboxPlacementsResult(item));
        data.pages = this.parsePageLinks(response, '?', 'address');
        data.status = response.status;
        return data;
    }
    async list(query) {
        const queryData = this.prepareQueryData(query);
        const response = await this.request.get('/v4/inbox/results', queryData);
        return this.parseList(response);
    }
    async get(id) {
        const response = await this.request.get(`/v4/inbox/results/${id}`);
        const inboxPlacementResult = this.prepareInboxPlacementsResult(response.body.result);
        return {
            status: response.status,
            inboxPlacementResult
        };
    }
    async destroy(id) {
        const response = await this.request.delete(`/v4/inbox/results/${id}`);
        return {
            status: response.status,
            ...response.body
        };
    }
    async getResultByShareId(shareId) {
        const response = await this.request.get(`/v4/inbox/sharing/public/${shareId}`);
        const inboxPlacementResult = this.prepareInboxPlacementsResult(response.body.result);
        return {
            status: response.status,
            inboxPlacementResult
        };
    }
}

class InboxPlacementsAttributesClient {
    request;
    path;
    constructor(request, path) {
        this.path = path;
        this.request = request;
    }
    async list() {
        const response = await this.request.get(this.path);
        return {
            items: response.body.items,
            status: response.status,
        };
    }
    async get(attributeName) {
        const response = await this.request.get(`${this.path}/${attributeName}`);
        return {
            ...response.body,
            status: response.status
        };
    }
}

class InboxPlacementsFiltersClient {
    request;
    path;
    constructor(request, path) {
        this.request = request;
        this.path = path;
    }
    async list() {
        const result = await this.request.get(this.path);
        return {
            status: result.status,
            supported_filters: result.body.supported_filters
        };
    }
}

class IPRSharingClient {
    request;
    constructor(request) {
        this.request = request;
    }
    prepareInboxPlacementsResultSharing(data) {
        const handledSeedListDates = {
            expires_at: new Date(data.expires_at),
        };
        const result = {
            ...data,
            ...handledSeedListDates
        };
        return result;
    }
    async get(id) {
        const response = await this.request.get(`/v4/inbox/sharing/${id}`);
        const result = this.prepareInboxPlacementsResultSharing(response.body.sharing);
        return {
            status: response.status,
            ...result
        };
    }
    async update(id, data) {
        const response = await this.request.put(`/v4/inbox/sharing/${id}`, {}, { query: `enabled=${data.enabled}` });
        const result = this.prepareInboxPlacementsResultSharing(response.body.sharing);
        return {
            ...result,
            status: response.status
        };
    }
}

class InboxPlacementsProvidersClient {
    request;
    path;
    constructor(request) {
        this.path = '/v4/inbox/providers';
        this.request = request;
    }
    parseList(response) {
        const data = {};
        data.items = response.body.items.map((item) => {
            const handledProviderDates = {
                created_at: new Date(item.created_at),
                updated_at: new Date(item.updated_at),
            };
            const result = {
                ...item,
                ...handledProviderDates
            };
            return result;
        });
        data.status = response.status;
        return data;
    }
    async list() {
        const response = await this.request.get(this.path);
        return this.parseList(response);
    }
}

class MetricsClient {
    request;
    logger;
    constructor(request, logger = console) {
        this.request = request;
        this.logger = logger;
    }
    convertDateToUTC(key, inputDate) {
        /*
          Because "new Date('2022-12-25T00:00:00.000Z')" becomes "Sun Dec 25 2022 02:00:00 GMT+0200"
          (plus 2 hours from the timezone)
          and because for API, we need to provide the date in the expected format
          ex: 'Thu, 13 Oct 2011 18:02:00 +0000'.
          Here we try auto-convert them to UTC
        */
        this.logger.warn(`Date:"${inputDate}" was auto-converted to UTC time zone.
Value "${inputDate.toUTCString()}" will be used for request.
Consider using string type for property "${key}" to avoid auto-converting`);
        return inputDate.toUTCString();
    }
    prepareQuery(query) {
        let startDate;
        let endDate;
        if (query) {
            const qStart = query?.start;
            const qEnd = query?.end;
            startDate = qStart instanceof Date ? this.convertDateToUTC('start', qStart) : qStart ?? '';
            endDate = qEnd && qEnd instanceof Date ? this.convertDateToUTC('end', qEnd) : qEnd ?? '';
        }
        const result = {
            ...query,
            start: startDate,
            end: endDate
        };
        return result;
    }
    handleResponse(response) {
        const resBody = response.body;
        const startDate = Date.parse(resBody.start) ? new Date(resBody.start) : null;
        const endDate = Date.parse(resBody.end) ? new Date(resBody.end) : null;
        const result = {
            ...resBody,
            status: response.status,
            start: startDate,
            end: endDate
        };
        return result;
    }
    async getAccount(query) {
        const queryData = this.prepareQuery(query);
        const response = await this.request.post('/v1/analytics/metrics', queryData);
        return this.handleResponse(response);
    }
    async getAccountUsage(query) {
        const queryData = this.prepareQuery(query);
        const response = await this.request.post('/v1/analytics/usage/metrics', queryData);
        return this.handleResponse(response);
    }
}

class DomainTrackingClient {
    request;
    constructor(request) {
        this.request = request;
    }
    _parseTrackingSettings(response) {
        return response.body.tracking;
    }
    _parseTrackingUpdate(response) {
        return response.body;
    }
    _isOpenTrackingInfoWitPlace(obj) {
        return typeof obj === 'object' && 'place_at_the_top' in obj;
    }
    async get(domain) {
        const response = await this.request.get(`/v2/x509/${domain}/status`);
        return {
            ...response.body,
            responseStatusCode: response.status
        };
    }
    async generate(domain) {
        const response = await this.request.post(`/v2/x509/${domain}`);
        return {
            ...response.body,
            status: response.status
        };
    }
    async regenerate(domain) {
        const response = await this.request.put(`/v2/x509/${domain}`);
        return {
            ...response.body,
            status: response.status
        };
    }
    async getTracking(domain) {
        const response = await this.request.get(urljoin('/v3/domains', domain, 'tracking'));
        return this._parseTrackingSettings(response);
    }
    async updateTracking(domain, type, data) {
        const preparedData = {
            ...data
        };
        if (typeof data?.active === 'boolean') {
            preparedData.active = (data?.active) ? 'yes' : 'no';
        }
        if (this._isOpenTrackingInfoWitPlace(data)) {
            if (typeof data?.place_at_the_top === 'boolean') {
                preparedData.place_at_the_top = (data?.place_at_the_top) ? 'yes' : 'no';
            }
        }
        const response = await this.request.putWithFD(urljoin('/v3/domains', domain, 'tracking', type), preparedData);
        return this._parseTrackingUpdate(response);
    }
}

/* eslint-disable camelcase */
class MailgunClient {
    request;
    domains;
    webhooks;
    events;
    stats;
    metrics;
    suppressions;
    messages;
    routes;
    validate;
    ips;
    ip_pools;
    lists;
    subaccounts;
    inboxPlacements;
    constructor(options, formData) {
        const config = { ...options };
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
        const mailListsMembers = new MailListsMembers(this.request);
        const domainCredentialsClient = new DomainCredentialsClient(this.request);
        const domainTemplatesClient = new DomainTemplatesClient(this.request);
        const domainTagsClient = new DomainTagsClient(this.request);
        const domainTrackingClient = new DomainTrackingClient(this.request);
        const multipleValidationClient = new MultipleValidationClient(this.request);
        const InboxPlacementsResultsSharingClient = new IPRSharingClient(this.request);
        const seedsListsAttributes = new InboxPlacementsAttributesClient(this.request, '/v4/inbox/seedlists/a');
        const resultsAttributesClient = new InboxPlacementsAttributesClient(this.request, '/v4/inbox/results/a');
        const seedsListsFiltersClient = new InboxPlacementsFiltersClient(this.request, '/v4/inbox/seedlists/_filters');
        const resultsFiltersClient = new InboxPlacementsFiltersClient(this.request, '/v4/inbox/results/_filters');
        const seedsListsClient = new SeedsListsClient(this.request, seedsListsAttributes, seedsListsFiltersClient);
        const inboxPlacementsResultsClient = new InboxPlacementsResultsClient(this.request, resultsAttributesClient, resultsFiltersClient, InboxPlacementsResultsSharingClient);
        const inboxPlacementsProvidersClient = new InboxPlacementsProvidersClient(this.request);
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
    setSubaccount(subaccountId) {
        this.request?.setSubaccountHeader(subaccountId);
    }
    resetSubaccount() {
        this.request?.resetSubaccountHeader();
    }
}

class Mailgun {
    static get default() { return this; }
    formData;
    constructor(FormData) {
        this.formData = FormData;
    }
    client(options) {
        return new MailgunClient(options, this.formData);
    }
}

export { Mailgun as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbGd1bi5icm93c2VyLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zRXJyb3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90b0Zvcm1EYXRhLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvRm9ybURhdGEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9CbG9iLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9jb21tb24vdXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvc0hlYWRlcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcGVlZG9tZXRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90aHJvdHRsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2J1aWxkRnVsbFBhdGguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9mZXRjaC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMvYWRhcHRlcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9lbnYvZGF0YS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy92YWxpZGF0b3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIi4uLy4uL2xpYi9DbGFzc2VzL2NvbW1vbi9FcnJvci50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL2NvbW1vbi9BdHRhY2htZW50c0hhbmRsZXIudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9jb21tb24vRm9ybURhdGFCdWlsZGVyLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3ViYWNjb3VudHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9jb21tb24vUmVxdWVzdC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9FdmVudHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdGF0cy9TdGF0c0NvbnRhaW5lci50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1N0YXRzL1N0YXRzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0VudW1zL2luZGV4LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL0JvdW5jZS50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9Db21wbGFpbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvVW5zdWJzY3JpYmUudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvV2hpdGVMaXN0LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uc0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1dlYmhvb2tzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvTWVzc2FnZXMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9Sb3V0ZXMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9WYWxpZGF0aW9ucy92YWxpZGF0ZS50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0lQcy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0lQUG9vbHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc0NyZWRlbnRpYWxzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVGVtcGxhdGVzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVGFncy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvaW5ib3hQbGFjZW1lbnRzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9BdHRyaWJ1dGVzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL0ZpbHRlcnNDbGllbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvTWV0cmljcy9NZXRyaWNzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVHJhY2tpbmcudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50LnRzIiwiLi4vLi4vbGliL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISBodHRwczovL210aHMuYmUvYmFzZTY0IHYxLjAuMCBieSBAbWF0aGlhcyB8IE1JVCBsaWNlbnNlICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgLlxuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLlxuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0bW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsIGFuZCB1c2Vcblx0Ly8gaXQgYXMgYHJvb3RgLlxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fTtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cblx0dmFyIGVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdC8vIE5vdGU6IHRoZSBlcnJvciBtZXNzYWdlcyB1c2VkIHRocm91Z2hvdXQgdGhpcyBmaWxlIG1hdGNoIHRob3NlIHVzZWQgYnlcblx0XHQvLyB0aGUgbmF0aXZlIGBhdG9iYC9gYnRvYWAgaW1wbGVtZW50YXRpb24gaW4gQ2hyb21pdW0uXG5cdFx0dGhyb3cgbmV3IEludmFsaWRDaGFyYWN0ZXJFcnJvcihtZXNzYWdlKTtcblx0fTtcblxuXHR2YXIgVEFCTEUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cdC8vIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvY29tbW9uLW1pY3Jvc3ludGF4ZXMuaHRtbCNzcGFjZS1jaGFyYWN0ZXJcblx0dmFyIFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMgPSAvW1xcdFxcblxcZlxcciBdL2c7XG5cblx0Ly8gYGRlY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBhdG9iYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQuIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYXRvYlxuXHQvLyBUaGUgb3B0aW1pemVkIGJhc2U2NC1kZWNvZGluZyBhbGdvcml0aG0gdXNlZCBpcyBiYXNlZCBvbiBAYXRr4oCZcyBleGNlbGxlbnRcblx0Ly8gaW1wbGVtZW50YXRpb24uIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2F0ay8xMDIwMzk2XG5cdHZhciBkZWNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KVxuXHRcdFx0LnJlcGxhY2UoUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUywgJycpO1xuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0aWYgKGxlbmd0aCAlIDQgPT0gMCkge1xuXHRcdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKC89PT8kLywgJycpO1xuXHRcdFx0bGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRsZW5ndGggJSA0ID09IDEgfHxcblx0XHRcdC8vIGh0dHA6Ly93aGF0d2cub3JnL0MjYWxwaGFudW1lcmljLWFzY2lpLWNoYXJhY3RlcnNcblx0XHRcdC9bXithLXpBLVowLTkvXS8udGVzdChpbnB1dClcblx0XHQpIHtcblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnSW52YWxpZCBjaGFyYWN0ZXI6IHRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIGJpdENvdW50ZXIgPSAwO1xuXHRcdHZhciBiaXRTdG9yYWdlO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHRidWZmZXIgPSBUQUJMRS5pbmRleE9mKGlucHV0LmNoYXJBdChwb3NpdGlvbikpO1xuXHRcdFx0Yml0U3RvcmFnZSA9IGJpdENvdW50ZXIgJSA0ID8gYml0U3RvcmFnZSAqIDY0ICsgYnVmZmVyIDogYnVmZmVyO1xuXHRcdFx0Ly8gVW5sZXNzIHRoaXMgaXMgdGhlIGZpcnN0IG9mIGEgZ3JvdXAgb2YgNCBjaGFyYWN0ZXJz4oCmXG5cdFx0XHRpZiAoYml0Q291bnRlcisrICUgNCkge1xuXHRcdFx0XHQvLyDigKZjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gYSBzaW5nbGUgQVNDSUkgY2hhcmFjdGVyLlxuXHRcdFx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0XHRcdFx0XHQweEZGICYgYml0U3RvcmFnZSA+PiAoLTIgKiBiaXRDb3VudGVyICYgNilcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHQvLyBgZW5jb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGJ0b2FgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZDogaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1idG9hXG5cdHZhciBlbmNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KTtcblx0XHRpZiAoL1teXFwwLVxceEZGXS8udGVzdChpbnB1dCkpIHtcblx0XHRcdC8vIE5vdGU6IG5vIG5lZWQgdG8gc3BlY2lhbC1jYXNlIGFzdHJhbCBzeW1ib2xzIGhlcmUsIGFzIHN1cnJvZ2F0ZXMgYXJlXG5cdFx0XHQvLyBtYXRjaGVkLCBhbmQgdGhlIGlucHV0IGlzIHN1cHBvc2VkIHRvIG9ubHkgY29udGFpbiBBU0NJSSBhbnl3YXkuXG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J1RoZSBzdHJpbmcgdG8gYmUgZW5jb2RlZCBjb250YWlucyBjaGFyYWN0ZXJzIG91dHNpZGUgb2YgdGhlICcgK1xuXHRcdFx0XHQnTGF0aW4xIHJhbmdlLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBwYWRkaW5nID0gaW5wdXQubGVuZ3RoICUgMztcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0dmFyIGE7XG5cdFx0dmFyIGI7XG5cdFx0dmFyIGM7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHQvLyBNYWtlIHN1cmUgYW55IHBhZGRpbmcgaXMgaGFuZGxlZCBvdXRzaWRlIG9mIHRoZSBsb29wLlxuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGggLSBwYWRkaW5nO1xuXG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdC8vIFJlYWQgdGhyZWUgYnl0ZXMsIGkuZS4gMjQgYml0cy5cblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCAxNjtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pIDw8IDg7XG5cdFx0XHRjID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiICsgYztcblx0XHRcdC8vIFR1cm4gdGhlIDI0IGJpdHMgaW50byBmb3VyIGNodW5rcyBvZiA2IGJpdHMgZWFjaCwgYW5kIGFwcGVuZCB0aGVcblx0XHRcdC8vIG1hdGNoaW5nIGNoYXJhY3RlciBmb3IgZWFjaCBvZiB0aGVtIHRvIHRoZSBvdXRwdXQuXG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDE4ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEyICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDYgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgJiAweDNGKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAocGFkZGluZyA9PSAyKSB7XG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgODtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGI7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEwKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyID4+IDQpICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCAyKSAmIDB4M0YpICtcblx0XHRcdFx0Jz0nXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAocGFkZGluZyA9PSAxKSB7XG5cdFx0XHRidWZmZXIgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCA0KSAmIDB4M0YpICtcblx0XHRcdFx0Jz09J1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdHZhciBiYXNlNjQgPSB7XG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCd2ZXJzaW9uJzogJzEuMC4wJ1xuXHR9O1xuXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGJhc2U2NDtcblx0XHR9KTtcblx0fVx0ZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG5cdFx0aWYgKGZyZWVNb2R1bGUpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IGJhc2U2NDtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGJhc2U2NCkge1xuXHRcdFx0XHRiYXNlNjQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IGJhc2U2NFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LmJhc2U2NCA9IGJhc2U2NDtcblx0fVxuXG59KHRoaXMpKTtcbiIsIihmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShkZWZpbml0aW9uKTtcbiAgZWxzZSBjb250ZXh0W25hbWVdID0gZGVmaW5pdGlvbigpO1xufSkoJ3VybGpvaW4nLCB0aGlzLCBmdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplIChzdHJBcnJheSkge1xuICAgIHZhciByZXN1bHRBcnJheSA9IFtdO1xuICAgIGlmIChzdHJBcnJheS5sZW5ndGggPT09IDApIHsgcmV0dXJuICcnOyB9XG5cbiAgICBpZiAodHlwZW9mIHN0ckFycmF5WzBdICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVXJsIG11c3QgYmUgYSBzdHJpbmcuIFJlY2VpdmVkICcgKyBzdHJBcnJheVswXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGZpcnN0IHBhcnQgaXMgYSBwbGFpbiBwcm90b2NvbCwgd2UgY29tYmluZSBpdCB3aXRoIHRoZSBuZXh0IHBhcnQuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eW14vOl0rOlxcLyokLykgJiYgc3RyQXJyYXkubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGZpcnN0ID0gc3RyQXJyYXkuc2hpZnQoKTtcbiAgICAgIHN0ckFycmF5WzBdID0gZmlyc3QgKyBzdHJBcnJheVswXTtcbiAgICB9XG5cbiAgICAvLyBUaGVyZSBtdXN0IGJlIHR3byBvciB0aHJlZSBzbGFzaGVzIGluIHRoZSBmaWxlIHByb3RvY29sLCB0d28gc2xhc2hlcyBpbiBhbnl0aGluZyBlbHNlLlxuICAgIGlmIChzdHJBcnJheVswXS5tYXRjaCgvXmZpbGU6XFwvXFwvXFwvLykpIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8vJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8nKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gc3RyQXJyYXlbaV07XG5cbiAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIGNvbXBvbmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wb25lbnQgPT09ICcnKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgc3RhcnRpbmcgc2xhc2hlcyBmb3IgZWFjaCBjb21wb25lbnQgYnV0IHRoZSBmaXJzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL15bXFwvXSsvLCAnJyk7XG4gICAgICB9XG4gICAgICBpZiAoaSA8IHN0ckFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGVuZGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGxhc3QuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIHRoZSBsYXN0IGNvbXBvbmVudCB3ZSB3aWxsIGNvbWJpbmUgbXVsdGlwbGUgc2xhc2hlcyB0byBhIHNpbmdsZSBvbmUuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJy8nKTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0QXJyYXkucHVzaChjb21wb25lbnQpO1xuXG4gICAgfVxuXG4gICAgdmFyIHN0ciA9IHJlc3VsdEFycmF5LmpvaW4oJy8nKTtcbiAgICAvLyBFYWNoIGlucHV0IGNvbXBvbmVudCBpcyBub3cgc2VwYXJhdGVkIGJ5IGEgc2luZ2xlIHNsYXNoIGV4Y2VwdCB0aGUgcG9zc2libGUgZmlyc3QgcGxhaW4gcHJvdG9jb2wgcGFydC5cblxuICAgIC8vIHJlbW92ZSB0cmFpbGluZyBzbGFzaCBiZWZvcmUgcGFyYW1ldGVycyBvciBoYXNoXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcLyhcXD98JnwjW14hXSkvZywgJyQxJyk7XG5cbiAgICAvLyByZXBsYWNlID8gaW4gcGFyYW1ldGVycyB3aXRoICZcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJz8nKTtcbiAgICBzdHIgPSBwYXJ0cy5zaGlmdCgpICsgKHBhcnRzLmxlbmd0aCA+IDAgPyAnPyc6ICcnKSArIHBhcnRzLmpvaW4oJyYnKTtcblxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnB1dDtcblxuICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgaW5wdXQgPSBhcmd1bWVudHNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0ID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBub3JtYWxpemUoaW5wdXQpO1xuICB9O1xuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5jb25zdCB7dG9TdHJpbmd9ID0gT2JqZWN0LnByb3RvdHlwZTtcbmNvbnN0IHtnZXRQcm90b3R5cGVPZn0gPSBPYmplY3Q7XG5cbmNvbnN0IGtpbmRPZiA9IChjYWNoZSA9PiB0aGluZyA9PiB7XG4gICAgY29uc3Qgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmNvbnN0IGtpbmRPZlRlc3QgPSAodHlwZSkgPT4ge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKHRoaW5nKSA9PiBraW5kT2YodGhpbmcpID09PSB0eXBlXG59XG5cbmNvbnN0IHR5cGVPZlRlc3QgPSB0eXBlID0+IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gdHlwZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IHtpc0FycmF5fSA9IEFycmF5O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVW5kZWZpbmVkID0gdHlwZU9mVGVzdCgndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgaXNGdW5jdGlvbih2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIpICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQXJyYXlCdWZmZXIgPSBraW5kT2ZUZXN0KCdBcnJheUJ1ZmZlcicpO1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmluZyA9IHR5cGVPZlRlc3QoJ3N0cmluZycpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlT2ZUZXN0KCdmdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzTnVtYmVyID0gdHlwZU9mVGVzdCgnbnVtYmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQm9vbGVhblxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQm9vbGVhbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQm9vbGVhbiA9IHRoaW5nID0+IHRoaW5nID09PSB0cnVlIHx8IHRoaW5nID09PSBmYWxzZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1BsYWluT2JqZWN0ID0gKHZhbCkgPT4ge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIChwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpID09PSBudWxsKSAmJiAhKFN5bWJvbC50b1N0cmluZ1RhZyBpbiB2YWwpICYmICEoU3ltYm9sLml0ZXJhdG9yIGluIHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XG4gIGxldCBraW5kO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHwgKFxuICAgICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIChcbiAgICAgICAgKGtpbmQgPSBraW5kT2YodGhpbmcpKSA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgICAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICAgICAgKVxuICAgIClcbiAgKVxufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuY29uc3QgW2lzUmVhZGFibGVTdHJlYW0sIGlzUmVxdWVzdCwgaXNSZXNwb25zZSwgaXNIZWFkZXJzXSA9IFsnUmVhZGFibGVTdHJlYW0nLCAnUmVxdWVzdCcsICdSZXNwb25zZScsICdIZWFkZXJzJ10ubWFwKGtpbmRPZlRlc3QpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4gc3RyLnRyaW0gP1xuICBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHthbGxPd25LZXlzID0gZmFsc2V9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpXG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIGNvbnN0IHtjYXNlbGVzc30gPSBpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEtleSA9IGNhc2VsZXNzICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhcmd1bWVudHNbaV0gJiYgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHthbGxPd25LZXlzfT0ge30pID0+IHtcbiAgZm9yRWFjaChiLCAodmFsLCBrZXkpID0+IHtcbiAgICBpZiAodGhpc0FyZyAmJiBpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSwge2FsbE93bktleXN9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlXG4gIH0pO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufEJvb2xlYW59IFtmaWx0ZXJdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvcEZpbHRlcl1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCB0b0ZsYXRPYmplY3QgPSAoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIsIHByb3BGaWx0ZXIpID0+IHtcbiAgbGV0IHByb3BzO1xuICBsZXQgaTtcbiAgbGV0IHByb3A7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgaWYgKHNvdXJjZU9iaiA9PSBudWxsKSByZXR1cm4gZGVzdE9iajtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICgoIXByb3BGaWx0ZXIgfHwgcHJvcEZpbHRlcihwcm9wLCBzb3VyY2VPYmosIGRlc3RPYmopKSAmJiAhbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IGZpbHRlciAhPT0gZmFsc2UgJiYgZ2V0UHJvdG90eXBlT2Yoc291cmNlT2JqKTtcbiAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xuXG4gIHJldHVybiBkZXN0T2JqO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKlxuICogQHBhcmFtIHsqfSBbdGhpbmddXG4gKlxuICogQHJldHVybnMgez9BcnJheX1cbiAqL1xuY29uc3QgdG9BcnJheSA9ICh0aGluZykgPT4ge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgaWYgKGlzQXJyYXkodGhpbmcpKSByZXR1cm4gdGhpbmc7XG4gIGxldCBpID0gdGhpbmcubGVuZ3RoO1xuICBpZiAoIWlzTnVtYmVyKGkpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGFycltpXSA9IHRoaW5nW2ldO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoVHlwZWRBcnJheSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiB0aGluZyA9PiB7XG4gICAgcmV0dXJuIFR5cGVkQXJyYXkgJiYgdGhpbmcgaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xuICB9O1xufSkodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxuLyoqXG4gKiBGb3IgZWFjaCBlbnRyeSBpbiB0aGUgb2JqZWN0LCBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBrZXkgYW5kIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGVudHJ5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBmb3JFYWNoRW50cnkgPSAob2JqLCBmbikgPT4ge1xuICBjb25zdCBnZW5lcmF0b3IgPSBvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl07XG5cbiAgY29uc3QgaXRlcmF0b3IgPSBnZW5lcmF0b3IuY2FsbChvYmopO1xuXG4gIGxldCByZXN1bHQ7XG5cbiAgd2hpbGUgKChyZXN1bHQgPSBpdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBub29wID0gKCkgPT4ge31cblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUgPSArdmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59XG5cbmNvbnN0IEFMUEhBID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6J1xuXG5jb25zdCBESUdJVCA9ICcwMTIzNDU2Nzg5JztcblxuY29uc3QgQUxQSEFCRVQgPSB7XG4gIERJR0lULFxuICBBTFBIQSxcbiAgQUxQSEFfRElHSVQ6IEFMUEhBICsgQUxQSEEudG9VcHBlckNhc2UoKSArIERJR0lUXG59XG5cbmNvbnN0IGdlbmVyYXRlU3RyaW5nID0gKHNpemUgPSAxNiwgYWxwaGFiZXQgPSBBTFBIQUJFVC5BTFBIQV9ESUdJVCkgPT4ge1xuICBsZXQgc3RyID0gJyc7XG4gIGNvbnN0IHtsZW5ndGh9ID0gYWxwaGFiZXQ7XG4gIHdoaWxlIChzaXplLS0pIHtcbiAgICBzdHIgKz0gYWxwaGFiZXRbTWF0aC5yYW5kb20oKSAqIGxlbmd0aHwwXVxuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBJZiB0aGUgdGhpbmcgaXMgYSBGb3JtRGF0YSBvYmplY3QsIHJldHVybiB0cnVlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2suXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BlY0NvbXBsaWFudEZvcm0odGhpbmcpIHtcbiAgcmV0dXJuICEhKHRoaW5nICYmIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiB0aGluZ1tTeW1ib2wudG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW1N5bWJvbC5pdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn1cblxuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG5jb25zdCBpc1RoZW5hYmxlID0gKHRoaW5nKSA9PlxuICB0aGluZyAmJiAoaXNPYmplY3QodGhpbmcpIHx8IGlzRnVuY3Rpb24odGhpbmcpKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRoZW4pICYmIGlzRnVuY3Rpb24odGhpbmcuY2F0Y2gpO1xuXG4vLyBvcmlnaW5hbCBjb2RlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vRGlnaXRhbEJyYWluSlMvQXhpb3NQcm9taXNlL2Jsb2IvMTZkZWFiMTM3MTBlYzA5Nzc5OTIyMTMxZjNmYTU5NTQzMjBmODNhYi9saWIvdXRpbHMuanMjTDExLUwzNFxuXG5jb25zdCBfc2V0SW1tZWRpYXRlID0gKChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQsIHBvc3RNZXNzYWdlU3VwcG9ydGVkKSA9PiB7XG4gIGlmIChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gc2V0SW1tZWRpYXRlO1xuICB9XG5cbiAgcmV0dXJuIHBvc3RNZXNzYWdlU3VwcG9ydGVkID8gKCh0b2tlbiwgY2FsbGJhY2tzKSA9PiB7XG4gICAgX2dsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoe3NvdXJjZSwgZGF0YX0pID0+IHtcbiAgICAgIGlmIChzb3VyY2UgPT09IF9nbG9iYWwgJiYgZGF0YSA9PT0gdG9rZW4pIHtcbiAgICAgICAgY2FsbGJhY2tzLmxlbmd0aCAmJiBjYWxsYmFja3Muc2hpZnQoKSgpO1xuICAgICAgfVxuICAgIH0sIGZhbHNlKTtcblxuICAgIHJldHVybiAoY2IpID0+IHtcbiAgICAgIGNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgIF9nbG9iYWwucG9zdE1lc3NhZ2UodG9rZW4sIFwiKlwiKTtcbiAgICB9XG4gIH0pKGBheGlvc0Ake01hdGgucmFuZG9tKCl9YCwgW10pIDogKGNiKSA9PiBzZXRUaW1lb3V0KGNiKTtcbn0pKFxuICB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nLFxuICBpc0Z1bmN0aW9uKF9nbG9iYWwucG9zdE1lc3NhZ2UpXG4pO1xuXG5jb25zdCBhc2FwID0gdHlwZW9mIHF1ZXVlTWljcm90YXNrICE9PSAndW5kZWZpbmVkJyA/XG4gIHF1ZXVlTWljcm90YXNrLmJpbmQoX2dsb2JhbCkgOiAoIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLm5leHRUaWNrIHx8IF9zZXRJbW1lZGlhdGUpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKipcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNSZWFkYWJsZVN0cmVhbSxcbiAgaXNSZXF1ZXN0LFxuICBpc1Jlc3BvbnNlLFxuICBpc0hlYWRlcnMsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0RhdGUsXG4gIGlzRmlsZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIEFMUEhBQkVULFxuICBnZW5lcmF0ZVN0cmluZyxcbiAgaXNTcGVjQ29tcGxpYW50Rm9ybSxcbiAgdG9KU09OT2JqZWN0LFxuICBpc0FzeW5jRm4sXG4gIGlzVGhlbmFibGUsXG4gIHNldEltbWVkaWF0ZTogX3NldEltbWVkaWF0ZSxcbiAgYXNhcFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrO1xuICB9XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICBpZiAocmVzcG9uc2UpIHtcbiAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgdGhpcy5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXMgPyByZXNwb25zZS5zdGF0dXMgOiBudWxsO1xuICB9XG59XG5cbnV0aWxzLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHV0aWxzLnRvSlNPTk9iamVjdCh0aGlzLmNvbmZpZyksXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzXG4gICAgfTtcbiAgfVxufSk7XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zRXJyb3IucHJvdG90eXBlO1xuY29uc3QgZGVzY3JpcHRvcnMgPSB7fTtcblxuW1xuICAnRVJSX0JBRF9PUFRJT05fVkFMVUUnLFxuICAnRVJSX0JBRF9PUFRJT04nLFxuICAnRUNPTk5BQk9SVEVEJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFUlJfTkVUV09SSycsXG4gICdFUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTJyxcbiAgJ0VSUl9ERVBSRUNBVEVEJyxcbiAgJ0VSUl9CQURfUkVTUE9OU0UnLFxuICAnRVJSX0JBRF9SRVFVRVNUJyxcbiAgJ0VSUl9DQU5DRUxFRCcsXG4gICdFUlJfTk9UX1NVUFBPUlQnLFxuICAnRVJSX0lOVkFMSURfVVJMJ1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbl0uZm9yRWFjaChjb2RlID0+IHtcbiAgZGVzY3JpcHRvcnNbY29kZV0gPSB7dmFsdWU6IGNvZGV9O1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEF4aW9zRXJyb3IsIGRlc2NyaXB0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IChlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpID0+IHtcbiAgY29uc3QgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcblxuICB1dGlscy50b0ZsYXRPYmplY3QoZXJyb3IsIGF4aW9zRXJyb3IsIGZ1bmN0aW9uIGZpbHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBFcnJvci5wcm90b3R5cGU7XG4gIH0sIHByb3AgPT4ge1xuICAgIHJldHVybiBwcm9wICE9PSAnaXNBeGlvc0Vycm9yJztcbiAgfSk7XG5cbiAgQXhpb3NFcnJvci5jYWxsKGF4aW9zRXJyb3IsIGVycm9yLm1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpO1xuXG4gIGF4aW9zRXJyb3IuY2F1c2UgPSBlcnJvcjtcblxuICBheGlvc0Vycm9yLm5hbWUgPSBlcnJvci5uYW1lO1xuXG4gIGN1c3RvbVByb3BzICYmIE9iamVjdC5hc3NpZ24oYXhpb3NFcnJvciwgY3VzdG9tUHJvcHMpO1xuXG4gIHJldHVybiBheGlvc0Vycm9yO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NFcnJvcjtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzdHJpY3RcbmV4cG9ydCBkZWZhdWx0IG51bGw7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuLy8gdGVtcG9yYXJ5IGhvdGZpeCB0byBhdm9pZCBjaXJjdWxhciByZWZlcmVuY2VzIHVudGlsIEF4aW9zVVJMU2VhcmNoUGFyYW1zIGlzIHJlZmFjdG9yZWRcbmltcG9ydCBQbGF0Zm9ybUZvcm1EYXRhIGZyb20gJy4uL3BsYXRmb3JtL25vZGUvY2xhc3Nlcy9Gb3JtRGF0YS5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgZ2l2ZW4gdGhpbmcgaXMgYSBhcnJheSBvciBqcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoaW5nIC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBiZSB2aXNpdGVkLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1Zpc2l0YWJsZSh0aGluZykge1xuICByZXR1cm4gdXRpbHMuaXNQbGFpbk9iamVjdCh0aGluZykgfHwgdXRpbHMuaXNBcnJheSh0aGluZyk7XG59XG5cbi8qKlxuICogSXQgcmVtb3ZlcyB0aGUgYnJhY2tldHMgZnJvbSB0aGUgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIHBhcmFtZXRlci5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUga2V5IHdpdGhvdXQgdGhlIGJyYWNrZXRzLlxuICovXG5mdW5jdGlvbiByZW1vdmVCcmFja2V0cyhrZXkpIHtcbiAgcmV0dXJuIHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykgPyBrZXkuc2xpY2UoMCwgLTIpIDoga2V5O1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGF0aCwgYSBrZXksIGFuZCBhIGJvb2xlYW4sIGFuZCByZXR1cm5zIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgY3VycmVudCBvYmplY3QgYmVpbmcgaXRlcmF0ZWQgb3Zlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkb3RzIC0gSWYgdHJ1ZSwgdGhlIGtleSB3aWxsIGJlIHJlbmRlcmVkIHdpdGggZG90cyBpbnN0ZWFkIG9mIGJyYWNrZXRzLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cykge1xuICBpZiAoIXBhdGgpIHJldHVybiBrZXk7XG4gIHJldHVybiBwYXRoLmNvbmNhdChrZXkpLm1hcChmdW5jdGlvbiBlYWNoKHRva2VuLCBpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdG9rZW4gPSByZW1vdmVCcmFja2V0cyh0b2tlbik7XG4gICAgcmV0dXJuICFkb3RzICYmIGkgPyAnWycgKyB0b2tlbiArICddJyA6IHRva2VuO1xuICB9KS5qb2luKGRvdHMgPyAnLicgOiAnJyk7XG59XG5cbi8qKlxuICogSWYgdGhlIGFycmF5IGlzIGFuIGFycmF5IGFuZCBub25lIG9mIGl0cyBlbGVtZW50cyBhcmUgdmlzaXRhYmxlLCB0aGVuIGl0J3MgYSBmbGF0IGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzRmxhdEFycmF5KGFycikge1xuICByZXR1cm4gdXRpbHMuaXNBcnJheShhcnIpICYmICFhcnIuc29tZShpc1Zpc2l0YWJsZSk7XG59XG5cbmNvbnN0IHByZWRpY2F0ZXMgPSB1dGlscy50b0ZsYXRPYmplY3QodXRpbHMsIHt9LCBudWxsLCBmdW5jdGlvbiBmaWx0ZXIocHJvcCkge1xuICByZXR1cm4gL15pc1tBLVpdLy50ZXN0KHByb3ApO1xufSk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHs/T2JqZWN0fSBbZm9ybURhdGFdXG4gKiBAcGFyYW0gez9PYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMudmlzaXRvcl1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWV0YVRva2VucyA9IHRydWVdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRvdHMgPSBmYWxzZV1cbiAqIEBwYXJhbSB7P0Jvb2xlYW59IFtvcHRpb25zLmluZGV4ZXMgPSBmYWxzZV1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICoqL1xuXG4vKipcbiAqIEl0IGNvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gZm9ybSBkYXRhLlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIC0gVGhlIEZvcm1EYXRhIG9iamVjdCB0byBhcHBlbmQgdG8uXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB0b0Zvcm1EYXRhKG9iaiwgZm9ybURhdGEsIG9wdGlvbnMpIHtcbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGFyZ2V0IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgKFBsYXRmb3JtRm9ybURhdGEgfHwgRm9ybURhdGEpKCk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIG9wdGlvbnMgPSB1dGlscy50b0ZsYXRPYmplY3Qob3B0aW9ucywge1xuICAgIG1ldGFUb2tlbnM6IHRydWUsXG4gICAgZG90czogZmFsc2UsXG4gICAgaW5kZXhlczogZmFsc2VcbiAgfSwgZmFsc2UsIGZ1bmN0aW9uIGRlZmluZWQob3B0aW9uLCBzb3VyY2UpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgICByZXR1cm4gIXV0aWxzLmlzVW5kZWZpbmVkKHNvdXJjZVtvcHRpb25dKTtcbiAgfSk7XG5cbiAgY29uc3QgbWV0YVRva2VucyA9IG9wdGlvbnMubWV0YVRva2VucztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gIGNvbnN0IHZpc2l0b3IgPSBvcHRpb25zLnZpc2l0b3IgfHwgZGVmYXVsdFZpc2l0b3I7XG4gIGNvbnN0IGRvdHMgPSBvcHRpb25zLmRvdHM7XG4gIGNvbnN0IGluZGV4ZXMgPSBvcHRpb25zLmluZGV4ZXM7XG4gIGNvbnN0IF9CbG9iID0gb3B0aW9ucy5CbG9iIHx8IHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBCbG9iO1xuICBjb25zdCB1c2VCbG9iID0gX0Jsb2IgJiYgdXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShmb3JtRGF0YSk7XG5cbiAgaWYgKCF1dGlscy5pc0Z1bmN0aW9uKHZpc2l0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmlzaXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHV0aWxzLmlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICghdXNlQmxvYiAmJiB1dGlscy5pc0Jsb2IodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignQmxvYiBpcyBub3Qgc3VwcG9ydGVkLiBVc2UgYSBCdWZmZXIgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHVzZUJsb2IgJiYgdHlwZW9mIEJsb2IgPT09ICdmdW5jdGlvbicgPyBuZXcgQmxvYihbdmFsdWVdKSA6IEJ1ZmZlci5mcm9tKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCB2aXNpdG9yLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0ga2V5XG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nfE51bWJlcj59IHBhdGhcbiAgICogQHRoaXMge0Zvcm1EYXRhfVxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gcmV0dXJuIHRydWUgdG8gdmlzaXQgdGhlIGVhY2ggcHJvcCBvZiB0aGUgdmFsdWUgcmVjdXJzaXZlbHlcbiAgICovXG4gIGZ1bmN0aW9uIGRlZmF1bHRWaXNpdG9yKHZhbHVlLCBrZXksIHBhdGgpIHtcbiAgICBsZXQgYXJyID0gdmFsdWU7XG5cbiAgICBpZiAodmFsdWUgJiYgIXBhdGggJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHV0aWxzLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IG1ldGFUb2tlbnMgPyBrZXkgOiBrZXkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAodXRpbHMuaXNBcnJheSh2YWx1ZSkgJiYgaXNGbGF0QXJyYXkodmFsdWUpKSB8fFxuICAgICAgICAoKHV0aWxzLmlzRmlsZUxpc3QodmFsdWUpIHx8IHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykpICYmIChhcnIgPSB1dGlscy50b0FycmF5KHZhbHVlKSlcbiAgICAgICAgKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gcmVtb3ZlQnJhY2tldHMoa2V5KTtcblxuICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiBlYWNoKGVsLCBpbmRleCkge1xuICAgICAgICAgICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICAgICAgICAgIGluZGV4ZXMgPT09IHRydWUgPyByZW5kZXJLZXkoW2tleV0sIGluZGV4LCBkb3RzKSA6IChpbmRleGVzID09PSBudWxsID8ga2V5IDoga2V5ICsgJ1tdJyksXG4gICAgICAgICAgICBjb252ZXJ0VmFsdWUoZWwpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNWaXNpdGFibGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3JtRGF0YS5hcHBlbmQocmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cyksIGNvbnZlcnRWYWx1ZSh2YWx1ZSkpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3Qgc3RhY2sgPSBbXTtcblxuICBjb25zdCBleHBvc2VkSGVscGVycyA9IE9iamVjdC5hc3NpZ24ocHJlZGljYXRlcywge1xuICAgIGRlZmF1bHRWaXNpdG9yLFxuICAgIGNvbnZlcnRWYWx1ZSxcbiAgICBpc1Zpc2l0YWJsZVxuICB9KTtcblxuICBmdW5jdGlvbiBidWlsZCh2YWx1ZSwgcGF0aCkge1xuICAgIGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcblxuICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhdGguam9pbignLicpKTtcbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbHVlKTtcblxuICAgIHV0aWxzLmZvckVhY2godmFsdWUsIGZ1bmN0aW9uIGVhY2goZWwsIGtleSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIHZpc2l0b3IuY2FsbChcbiAgICAgICAgZm9ybURhdGEsIGVsLCB1dGlscy5pc1N0cmluZyhrZXkpID8ga2V5LnRyaW0oKSA6IGtleSwgcGF0aCwgZXhwb3NlZEhlbHBlcnNcbiAgICAgICk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgYnVpbGQoZWwsIHBhdGggPyBwYXRoLmNvbmNhdChrZXkpIDogW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3RhY2sucG9wKCk7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkYXRhIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICBidWlsZChvYmopO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9Gb3JtRGF0YTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBJdCBlbmNvZGVzIGEgc3RyaW5nIGJ5IHJlcGxhY2luZyBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgaW4gdGhlIHVucmVzZXJ2ZWQgc2V0IHdpdGhcbiAqIHRoZWlyIHBlcmNlbnQtZW5jb2RlZCBlcXVpdmFsZW50c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGVuY29kZS5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZShzdHIpIHtcbiAgY29uc3QgY2hhck1hcCA9IHtcbiAgICAnISc6ICclMjEnLFxuICAgIFwiJ1wiOiAnJTI3JyxcbiAgICAnKCc6ICclMjgnLFxuICAgICcpJzogJyUyOScsXG4gICAgJ34nOiAnJTdFJyxcbiAgICAnJTIwJzogJysnLFxuICAgICclMDAnOiAnXFx4MDAnXG4gIH07XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKX5dfCUyMHwlMDAvZywgZnVuY3Rpb24gcmVwbGFjZXIobWF0Y2gpIHtcbiAgICByZXR1cm4gY2hhck1hcFttYXRjaF07XG4gIH0pO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGFyYW1zIG9iamVjdCBhbmQgY29udmVydHMgaXQgdG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IHBhcmFtcyAtIFRoZSBwYXJhbWV0ZXJzIHRvIGJlIGNvbnZlcnRlZCB0byBhIEZvcm1EYXRhIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBwYXNzZWQgdG8gdGhlIEF4aW9zIGNvbnN0cnVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpIHtcbiAgdGhpcy5fcGFpcnMgPSBbXTtcblxuICBwYXJhbXMgJiYgdG9Gb3JtRGF0YShwYXJhbXMsIHRoaXMsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc1VSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGU7XG5cbnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiBhcHBlbmQobmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5fcGFpcnMucHVzaChbbmFtZSwgdmFsdWVdKTtcbn07XG5cbnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kZXIpIHtcbiAgY29uc3QgX2VuY29kZSA9IGVuY29kZXIgPyBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBlbmNvZGVyLmNhbGwodGhpcywgdmFsdWUsIGVuY29kZSk7XG4gIH0gOiBlbmNvZGU7XG5cbiAgcmV0dXJuIHRoaXMuX3BhaXJzLm1hcChmdW5jdGlvbiBlYWNoKHBhaXIpIHtcbiAgICByZXR1cm4gX2VuY29kZShwYWlyWzBdKSArICc9JyArIF9lbmNvZGUocGFpclsxXSk7XG4gIH0sICcnKS5qb2luKCcmJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcblxuLyoqXG4gKiBJdCByZXBsYWNlcyBhbGwgaW5zdGFuY2VzIG9mIHRoZSBjaGFyYWN0ZXJzIGA6YCwgYCRgLCBgLGAsIGArYCwgYFtgLCBhbmQgYF1gIHdpdGggdGhlaXJcbiAqIFVSSSBlbmNvZGVkIGNvdW50ZXJwYXJ0c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgVGhlIHZhbHVlIHRvIGJlIGVuY29kZWQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcGFyYW0gez8ob2JqZWN0fEZ1bmN0aW9uKX0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBvcHRpb25zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgXG4gIGNvbnN0IF9lbmNvZGUgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5jb2RlIHx8IGVuY29kZTtcblxuICBpZiAodXRpbHMuaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBzZXJpYWxpemU6IG9wdGlvbnNcbiAgICB9O1xuICB9IFxuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmNlcHRvciB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICBmbihoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbFxuIiwiaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICcuL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzJ1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJy4vY2xhc3Nlcy9Gb3JtRGF0YS5qcydcbmltcG9ydCBCbG9iIGZyb20gJy4vY2xhc3Nlcy9CbG9iLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtcyxcbiAgICBGb3JtRGF0YSxcbiAgICBCbG9iXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXG59O1xuIiwiY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmNvbnN0IF9uYXZpZ2F0b3IgPSB0eXBlb2YgbmF2aWdhdG9yID09PSAnb2JqZWN0JyAmJiBuYXZpZ2F0b3IgfHwgdW5kZWZpbmVkO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyRW52ID0gaGFzQnJvd3NlckVudiAmJlxuICAoIV9uYXZpZ2F0b3IgfHwgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKF9uYXZpZ2F0b3IucHJvZHVjdCkgPCAwKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgd2ViV29ya2VyIGVudmlyb25tZW50XG4gKlxuICogQWx0aG91Z2ggdGhlIGBpc1N0YW5kYXJkQnJvd3NlckVudmAgbWV0aG9kIGluZGljYXRlcyB0aGF0XG4gKiBgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXJgLCB0aGUgV2ViV29ya2VyIHdpbGwgc3RpbGwgYmVcbiAqIGZpbHRlcmVkIG91dCBkdWUgdG8gaXRzIGp1ZGdtZW50IHN0YW5kYXJkXG4gKiBgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ2AuXG4gKiBUaGlzIGxlYWRzIHRvIGEgcHJvYmxlbSB3aGVuIGF4aW9zIHBvc3QgYEZvcm1EYXRhYCBpbiB3ZWJXb3JrZXJcbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52ID0gKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlICYmXG4gICAgdHlwZW9mIHNlbGYuaW1wb3J0U2NyaXB0cyA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufSkoKTtcblxuY29uc3Qgb3JpZ2luID0gaGFzQnJvd3NlckVudiAmJiB3aW5kb3cubG9jYXRpb24uaHJlZiB8fCAnaHR0cDovL2xvY2FsaG9zdCc7XG5cbmV4cG9ydCB7XG4gIGhhc0Jyb3dzZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyRW52LFxuICBfbmF2aWdhdG9yIGFzIG5hdmlnYXRvcixcbiAgb3JpZ2luXG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9ub2RlL2luZGV4LmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi51dGlscyxcbiAgLi4ucGxhdGZvcm1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIE9iamVjdC5hc3NpZ24oe1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uKHZhbHVlLCBrZXksIHBhdGgsIGhlbHBlcnMpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pc05vZGUgJiYgdXRpbHMuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGtleSwgdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVscGVycy5kZWZhdWx0VmlzaXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfSwgb3B0aW9ucykpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1EYXRhVG9KU09OO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHRvVVJMRW5jb2RlZEZvcm0gZnJvbSAnLi4vaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBuZXcgRm9ybURhdGEoZGF0YSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCB0aGlzLmZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiB1dGlscy5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscy50b09iamVjdFNldChbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCByYXdIZWFkZXJzID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiYgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICcuLi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcbiAgfVxuXG4gIGlmIChpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgICB2YWx1ZSA9IGhlYWRlcjtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc1JlZ0V4cChmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci50ZXN0KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKFthLXpcXGRdKShcXHcqKS9nLCAodywgY2hhciwgc3RyKSA9PiB7XG4gICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEFjY2Vzc29ycyhvYmosIGhlYWRlcikge1xuICBjb25zdCBhY2Nlc3Nvck5hbWUgPSB1dGlscy50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZigha2V5IHx8IHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8IF9yZXdyaXRlID09PSB0cnVlIHx8IChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpXG4gICAgfSBlbHNlIGlmKHV0aWxzLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0hlYWRlcnMoaGVhZGVyKSkge1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgaGVhZGVyLmVudHJpZXMoKSkge1xuICAgICAgICBzZXRIZWFkZXIodmFsdWUsIGtleSwgcmV3cml0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgIGlmICghcGFyc2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZVRva2Vucyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIHJldHVybiAhIShrZXkgJiYgdGhpc1trZXldICE9PSB1bmRlZmluZWQgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVIZWFkZXIoX2hlYWRlcikge1xuICAgICAgX2hlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCAnKSA6IHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpLm1hcCgoW2hlYWRlciwgdmFsdWVdKSA9PiBoZWFkZXIgKyAnOiAnICsgdmFsdWUpLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdID0gKHRoaXNbJGludGVybmFsc10gPSB7XG4gICAgICBhY2Nlc3NvcnM6IHt9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSBpbnRlcm5hbHMuYWNjZXNzb3JzO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lQWNjZXNzb3IoX2hlYWRlcikge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFhY2Nlc3NvcnNbbEhlYWRlcl0pIHtcbiAgICAgICAgYnVpbGRBY2Nlc3NvcnMocHJvdG90eXBlLCBfaGVhZGVyKTtcbiAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlscy5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7dmFsdWV9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudXRpbHMuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0hlYWRlcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHBhcmFtIHs/T2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcbiAgY29uc3QgY29uZmlnID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgY29uc3QgY29udGV4dCA9IHJlc3BvbnNlIHx8IGNvbmZpZztcbiAgY29uc3QgaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaGVhZGVycy5ub3JtYWxpemUoKTtcblxuICByZXR1cm4gZGF0YTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3Q9fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsZWRFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG59XG5cbnV0aWxzLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNwZWVkb21ldGVyO1xuIiwiLyoqXG4gKiBUaHJvdHRsZSBkZWNvcmF0b3JcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge051bWJlcn0gZnJlcVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZuLCBmcmVxKSB7XG4gIGxldCB0aW1lc3RhbXAgPSAwO1xuICBsZXQgdGhyZXNob2xkID0gMTAwMCAvIGZyZXE7XG4gIGxldCBsYXN0QXJncztcbiAgbGV0IHRpbWVyO1xuXG4gIGNvbnN0IGludm9rZSA9IChhcmdzLCBub3cgPSBEYXRlLm5vdygpKSA9PiB7XG4gICAgdGltZXN0YW1wID0gbm93O1xuICAgIGxhc3RBcmdzID0gbnVsbDtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgfVxuICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9XG5cbiAgY29uc3QgdGhyb3R0bGVkID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhc3NlZCA9IG5vdyAtIHRpbWVzdGFtcDtcbiAgICBpZiAoIHBhc3NlZCA+PSB0aHJlc2hvbGQpIHtcbiAgICAgIGludm9rZShhcmdzLCBub3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0QXJncyA9IGFyZ3M7XG4gICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgIGludm9rZShsYXN0QXJncylcbiAgICAgICAgfSwgdGhyZXNob2xkIC0gcGFzc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBmbHVzaCA9ICgpID0+IGxhc3RBcmdzICYmIGludm9rZShsYXN0QXJncyk7XG5cbiAgcmV0dXJuIFt0aHJvdHRsZWQsIGZsdXNoXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGhyb3R0bGU7XG4iLCJpbXBvcnQgc3BlZWRvbWV0ZXIgZnJvbSBcIi4vc3BlZWRvbWV0ZXIuanNcIjtcbmltcG9ydCB0aHJvdHRsZSBmcm9tIFwiLi90aHJvdHRsZS5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy5qc1wiO1xuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudFJlZHVjZXIgPSAobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0sIGZyZXEgPSAzKSA9PiB7XG4gIGxldCBieXRlc05vdGlmaWVkID0gMDtcbiAgY29uc3QgX3NwZWVkb21ldGVyID0gc3BlZWRvbWV0ZXIoNTAsIDI1MCk7XG5cbiAgcmV0dXJuIHRocm90dGxlKGUgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XG5cbiAgICBieXRlc05vdGlmaWVkID0gbG9hZGVkO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gKGxvYWRlZCAvIHRvdGFsKSA6IHVuZGVmaW5lZCxcbiAgICAgIGJ5dGVzOiBwcm9ncmVzc0J5dGVzLFxuICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBlc3RpbWF0ZWQ6IHJhdGUgJiYgdG90YWwgJiYgaW5SYW5nZSA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsLFxuICAgICAgW2lzRG93bmxvYWRTdHJlYW0gPyAnZG93bmxvYWQnIDogJ3VwbG9hZCddOiB0cnVlXG4gICAgfTtcblxuICAgIGxpc3RlbmVyKGRhdGEpO1xuICB9LCBmcmVxKTtcbn1cblxuZXhwb3J0IGNvbnN0IHByb2dyZXNzRXZlbnREZWNvcmF0b3IgPSAodG90YWwsIHRocm90dGxlZCkgPT4ge1xuICBjb25zdCBsZW5ndGhDb21wdXRhYmxlID0gdG90YWwgIT0gbnVsbDtcblxuICByZXR1cm4gWyhsb2FkZWQpID0+IHRocm90dGxlZFswXSh7XG4gICAgbGVuZ3RoQ29tcHV0YWJsZSxcbiAgICB0b3RhbCxcbiAgICBsb2FkZWRcbiAgfSksIHRocm90dGxlZFsxXV07XG59XG5cbmV4cG9ydCBjb25zdCBhc3luY0RlY29yYXRvciA9IChmbikgPT4gKC4uLmFyZ3MpID0+IHV0aWxzLmFzYXAoKCkgPT4gZm4oLi4uYXJncykpO1xuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID8gKChvcmlnaW4sIGlzTVNJRSkgPT4gKHVybCkgPT4ge1xuICB1cmwgPSBuZXcgVVJMKHVybCwgcGxhdGZvcm0ub3JpZ2luKTtcblxuICByZXR1cm4gKFxuICAgIG9yaWdpbi5wcm90b2NvbCA9PT0gdXJsLnByb3RvY29sICYmXG4gICAgb3JpZ2luLmhvc3QgPT09IHVybC5ob3N0ICYmXG4gICAgKGlzTVNJRSB8fCBvcmlnaW4ucG9ydCA9PT0gdXJsLnBvcnQpXG4gICk7XG59KShcbiAgbmV3IFVSTChwbGF0Zm9ybS5vcmlnaW4pLFxuICBwbGF0Zm9ybS5uYXZpZ2F0b3IgJiYgLyhtc2llfHRyaWRlbnQpL2kudGVzdChwbGF0Zm9ybS5uYXZpZ2F0b3IudXNlckFnZW50KVxuKSA6ICgpID0+IHRydWU7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICB7XG4gICAgd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICBjb25zdCBjb29raWUgPSBbbmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSldO1xuXG4gICAgICB1dGlscy5pc051bWJlcihleHBpcmVzKSAmJiBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG5cbiAgICAgIHV0aWxzLmlzU3RyaW5nKHBhdGgpICYmIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcoZG9tYWluKSAmJiBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuXG4gICAgICBzZWN1cmUgPT09IHRydWUgJiYgY29va2llLnB1c2goJ3NlY3VyZScpO1xuXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICB9LFxuXG4gICAgcmVhZChuYW1lKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgIH0sXG5cbiAgICByZW1vdmUobmFtZSkge1xuICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICB9XG4gIH1cblxuICA6XG5cbiAgLy8gTm9uLXN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICB7XG4gICAgd3JpdGUoKSB7fSxcbiAgICByZWFkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICByZW1vdmUoKSB7fVxuICB9O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLz9cXC8kLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpc0Fic29sdXRlVVJMIGZyb20gJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyc7XG5pbXBvcnQgY29tYmluZVVSTHMgZnJvbSAnLi4vaGVscGVycy9jb21iaW5lVVJMcy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4vQXhpb3NIZWFkZXJzLmpzXCI7XG5cbmNvbnN0IGhlYWRlcnNUb09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgaW5zdGFuY2VvZiBBeGlvc0hlYWRlcnMgPyB7IC4uLnRoaW5nIH0gOiB0aGluZztcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgY29uc3QgY29uZmlnID0ge307XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UsIHByb3AsIGNhc2VsZXNzKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZS5jYWxsKHtjYXNlbGVzc30sIHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhhLCBiLCBwcm9wICwgY2FzZWxlc3MpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYiwgcHJvcCAsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgcHJvcCAsIGNhc2VsZXNzKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGIpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEaXJlY3RLZXlzKGEsIGIsIHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYik7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lcmdlTWFwID0ge1xuICAgIHVybDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBtZXRob2Q6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgZGF0YTogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBiYXNlVVJMOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVzcG9uc2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcGFyYW1zU2VyaWFsaXplcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXRNZXNzYWdlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhDcmVkZW50aWFsczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoWFNSRlRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGFkYXB0ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VUeXBlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZDb29raWVOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZIZWFkZXJOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25Eb3dubG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGRlY29tcHJlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Q29udGVudExlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhCb2R5TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGJlZm9yZVJlZGlyZWN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zcG9ydDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cHNBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBjYW5jZWxUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBzb2NrZXRQYXRoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlRW5jb2Rpbmc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdmFsaWRhdGVTdGF0dXM6IG1lcmdlRGlyZWN0S2V5cyxcbiAgICBoZWFkZXJzOiAoYSwgYiAsIHByb3ApID0+IG1lcmdlRGVlcFByb3BlcnRpZXMoaGVhZGVyc1RvT2JqZWN0KGEpLCBoZWFkZXJzVG9PYmplY3QoYikscHJvcCwgdHJ1ZSlcbiAgfTtcblxuICB1dGlscy5mb3JFYWNoKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZzEsIGNvbmZpZzIpKSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICBjb25zdCBtZXJnZSA9IG1lcmdlTWFwW3Byb3BdIHx8IG1lcmdlRGVlcFByb3BlcnRpZXM7XG4gICAgY29uc3QgY29uZmlnVmFsdWUgPSBtZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdLCBwcm9wKTtcbiAgICAodXRpbHMuaXNVbmRlZmluZWQoY29uZmlnVmFsdWUpICYmIG1lcmdlICE9PSBtZXJnZURpcmVjdEtleXMpIHx8IChjb25maWdbcHJvcF0gPSBjb25maWdWYWx1ZSk7XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSBcIi4uL3BsYXRmb3JtL2luZGV4LmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5pbXBvcnQgaXNVUkxTYW1lT3JpZ2luIGZyb20gXCIuL2lzVVJMU2FtZU9yaWdpbi5qc1wiO1xuaW1wb3J0IGNvb2tpZXMgZnJvbSBcIi4vY29va2llcy5qc1wiO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSBcIi4uL2NvcmUvYnVpbGRGdWxsUGF0aC5qc1wiO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gXCIuLi9jb3JlL21lcmdlQ29uZmlnLmpzXCI7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGJ1aWxkVVJMIGZyb20gXCIuL2J1aWxkVVJMLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChjb25maWcpID0+IHtcbiAgY29uc3QgbmV3Q29uZmlnID0gbWVyZ2VDb25maWcoe30sIGNvbmZpZyk7XG5cbiAgbGV0IHtkYXRhLCB3aXRoWFNSRlRva2VuLCB4c3JmSGVhZGVyTmFtZSwgeHNyZkNvb2tpZU5hbWUsIGhlYWRlcnMsIGF1dGh9ID0gbmV3Q29uZmlnO1xuXG4gIG5ld0NvbmZpZy5oZWFkZXJzID0gaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGhlYWRlcnMpO1xuXG4gIG5ld0NvbmZpZy51cmwgPSBidWlsZFVSTChidWlsZEZ1bGxQYXRoKG5ld0NvbmZpZy5iYXNlVVJMLCBuZXdDb25maWcudXJsKSwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuXG4gIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgaWYgKGF1dGgpIHtcbiAgICBoZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICtcbiAgICAgIGJ0b2EoKGF1dGgudXNlcm5hbWUgfHwgJycpICsgJzonICsgKGF1dGgucGFzc3dvcmQgPyB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYXV0aC5wYXNzd29yZCkpIDogJycpKVxuICAgICk7XG4gIH1cblxuICBsZXQgY29udGVudFR5cGU7XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52IHx8IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudikge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSh1bmRlZmluZWQpOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfSBlbHNlIGlmICgoY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkpICE9PSBmYWxzZSkge1xuICAgICAgLy8gZml4IHNlbWljb2xvbiBkdXBsaWNhdGlvbiBpc3N1ZSBmb3IgUmVhY3ROYXRpdmUgRm9ybURhdGEgaW1wbGVtZW50YXRpb25cbiAgICAgIGNvbnN0IFt0eXBlLCAuLi50b2tlbnNdID0gY29udGVudFR5cGUgPyBjb250ZW50VHlwZS5zcGxpdCgnOycpLm1hcCh0b2tlbiA9PiB0b2tlbi50cmltKCkpLmZpbHRlcihCb29sZWFuKSA6IFtdO1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShbdHlwZSB8fCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsIC4uLnRva2Vuc10uam9pbignOyAnKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG4gIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYpIHtcbiAgICB3aXRoWFNSRlRva2VuICYmIHV0aWxzLmlzRnVuY3Rpb24od2l0aFhTUkZUb2tlbikgJiYgKHdpdGhYU1JGVG9rZW4gPSB3aXRoWFNSRlRva2VuKG5ld0NvbmZpZykpO1xuXG4gICAgaWYgKHdpdGhYU1JGVG9rZW4gfHwgKHdpdGhYU1JGVG9rZW4gIT09IGZhbHNlICYmIGlzVVJMU2FtZU9yaWdpbihuZXdDb25maWcudXJsKSkpIHtcbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgY29uc3QgeHNyZlZhbHVlID0geHNyZkhlYWRlck5hbWUgJiYgeHNyZkNvb2tpZU5hbWUgJiYgY29va2llcy5yZWFkKHhzcmZDb29raWVOYW1lKTtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICBoZWFkZXJzLnNldCh4c3JmSGVhZGVyTmFtZSwgeHNyZlZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3Q29uZmlnO1xufVxuXG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgc2V0dGxlIGZyb20gJy4vLi4vY29yZS9zZXR0bGUuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IHBhcnNlUHJvdG9jb2wgZnJvbSAnLi4vaGVscGVycy9wYXJzZVByb3RvY29sLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCB7cHJvZ3Jlc3NFdmVudFJlZHVjZXJ9IGZyb20gJy4uL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanMnO1xuaW1wb3J0IHJlc29sdmVDb25maWcgZnJvbSBcIi4uL2hlbHBlcnMvcmVzb2x2ZUNvbmZpZy5qc1wiO1xuXG5jb25zdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG5leHBvcnQgZGVmYXVsdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgJiYgZnVuY3Rpb24gKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIGNvbnN0IF9jb25maWcgPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG4gICAgbGV0IHJlcXVlc3REYXRhID0gX2NvbmZpZy5kYXRhO1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oX2NvbmZpZy5oZWFkZXJzKS5ub3JtYWxpemUoKTtcbiAgICBsZXQge3Jlc3BvbnNlVHlwZSwgb25VcGxvYWRQcm9ncmVzcywgb25Eb3dubG9hZFByb2dyZXNzfSA9IF9jb25maWc7XG4gICAgbGV0IG9uQ2FuY2VsZWQ7XG4gICAgbGV0IHVwbG9hZFRocm90dGxlZCwgZG93bmxvYWRUaHJvdHRsZWQ7XG4gICAgbGV0IGZsdXNoVXBsb2FkLCBmbHVzaERvd25sb2FkO1xuXG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGZsdXNoVXBsb2FkICYmIGZsdXNoVXBsb2FkKCk7IC8vIGZsdXNoIGV2ZW50c1xuICAgICAgZmx1c2hEb3dubG9hZCAmJiBmbHVzaERvd25sb2FkKCk7IC8vIGZsdXNoIGV2ZW50c1xuXG4gICAgICBfY29uZmlnLmNhbmNlbFRva2VuICYmIF9jb25maWcuY2FuY2VsVG9rZW4udW5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG5cbiAgICAgIF9jb25maWcuc2lnbmFsICYmIF9jb25maWcuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgfVxuXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHJlcXVlc3Qub3BlbihfY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBfY29uZmlnLnVybCwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IF9jb25maWcudGltZW91dDtcblxuICAgIGZ1bmN0aW9uIG9ubG9hZGVuZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oXG4gICAgICAgICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgJiYgcmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9ICFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSAndGV4dCcgfHwgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXQgPyAndGltZW91dCBvZiAnICsgX2NvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IF9jb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgaWYgKF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgIHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQgJiYgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUobnVsbCk7XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycy50b0pTT04oKSwgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoX2NvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhX2NvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChyZXNwb25zZVR5cGUgJiYgcmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gX2NvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmIChvbkRvd25sb2FkUHJvZ3Jlc3MpIHtcbiAgICAgIChbZG93bmxvYWRUaHJvdHRsZWQsIGZsdXNoRG93bmxvYWRdID0gcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKSk7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZG93bmxvYWRUaHJvdHRsZWQpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKG9uVXBsb2FkUHJvZ3Jlc3MgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIChbdXBsb2FkVGhyb3R0bGVkLCBmbHVzaFVwbG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvblVwbG9hZFByb2dyZXNzKSk7XG5cbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgdXBsb2FkVGhyb3R0bGVkKTtcblxuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGZsdXNoVXBsb2FkKTtcbiAgICB9XG5cbiAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbiB8fCBfY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBjYW5jZWwgPT4ge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KCFjYW5jZWwgfHwgY2FuY2VsLnR5cGUgPyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcsIHJlcXVlc3QpIDogY2FuY2VsKTtcbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgX2NvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IF9jb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKF9jb25maWcudXJsKTtcblxuICAgIGlmIChwcm90b2NvbCAmJiBwbGF0Zm9ybS5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tIFwiLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanNcIjtcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbmNvbnN0IGNvbXBvc2VTaWduYWxzID0gKHNpZ25hbHMsIHRpbWVvdXQpID0+IHtcbiAgY29uc3Qge2xlbmd0aH0gPSAoc2lnbmFscyA9IHNpZ25hbHMgPyBzaWduYWxzLmZpbHRlcihCb29sZWFuKSA6IFtdKTtcblxuICBpZiAodGltZW91dCB8fCBsZW5ndGgpIHtcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGxldCBhYm9ydGVkO1xuXG4gICAgY29uc3Qgb25hYm9ydCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmICghYWJvcnRlZCkge1xuICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgY29uc3QgZXJyID0gcmVhc29uIGluc3RhbmNlb2YgRXJyb3IgPyByZWFzb24gOiB0aGlzLnJlYXNvbjtcbiAgICAgICAgY29udHJvbGxlci5hYm9ydChlcnIgaW5zdGFuY2VvZiBBeGlvc0Vycm9yID8gZXJyIDogbmV3IENhbmNlbGVkRXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IGVycikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB0aW1lciA9IHRpbWVvdXQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICBvbmFib3J0KG5ldyBBeGlvc0Vycm9yKGB0aW1lb3V0ICR7dGltZW91dH0gb2YgbXMgZXhjZWVkZWRgLCBBeGlvc0Vycm9yLkVUSU1FRE9VVCkpXG4gICAgfSwgdGltZW91dClcblxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4ge1xuICAgICAgaWYgKHNpZ25hbHMpIHtcbiAgICAgICAgdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICBzaWduYWxzLmZvckVhY2goc2lnbmFsID0+IHtcbiAgICAgICAgICBzaWduYWwudW5zdWJzY3JpYmUgPyBzaWduYWwudW5zdWJzY3JpYmUob25hYm9ydCkgOiBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNpZ25hbHMgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KSk7XG5cbiAgICBjb25zdCB7c2lnbmFsfSA9IGNvbnRyb2xsZXI7XG5cbiAgICBzaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB1dGlscy5hc2FwKHVuc3Vic2NyaWJlKTtcblxuICAgIHJldHVybiBzaWduYWw7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZVNpZ25hbHM7XG4iLCJcbmV4cG9ydCBjb25zdCBzdHJlYW1DaHVuayA9IGZ1bmN0aW9uKiAoY2h1bmssIGNodW5rU2l6ZSkge1xuICBsZXQgbGVuID0gY2h1bmsuYnl0ZUxlbmd0aDtcblxuICBpZiAoIWNodW5rU2l6ZSB8fCBsZW4gPCBjaHVua1NpemUpIHtcbiAgICB5aWVsZCBjaHVuaztcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcG9zID0gMDtcbiAgbGV0IGVuZDtcblxuICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgZW5kID0gcG9zICsgY2h1bmtTaXplO1xuICAgIHlpZWxkIGNodW5rLnNsaWNlKHBvcywgZW5kKTtcbiAgICBwb3MgPSBlbmQ7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlYWRCeXRlcyA9IGFzeW5jIGZ1bmN0aW9uKiAoaXRlcmFibGUsIGNodW5rU2l6ZSkge1xuICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIHJlYWRTdHJlYW0oaXRlcmFibGUpKSB7XG4gICAgeWllbGQqIHN0cmVhbUNodW5rKGNodW5rLCBjaHVua1NpemUpO1xuICB9XG59XG5cbmNvbnN0IHJlYWRTdHJlYW0gPSBhc3luYyBmdW5jdGlvbiogKHN0cmVhbSkge1xuICBpZiAoc3RyZWFtW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSkge1xuICAgIHlpZWxkKiBzdHJlYW07XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICB0cnkge1xuICAgIGZvciAoOzspIHtcbiAgICAgIGNvbnN0IHtkb25lLCB2YWx1ZX0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB5aWVsZCB2YWx1ZTtcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgcmVhZGVyLmNhbmNlbCgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0cmFja1N0cmVhbSA9IChzdHJlYW0sIGNodW5rU2l6ZSwgb25Qcm9ncmVzcywgb25GaW5pc2gpID0+IHtcbiAgY29uc3QgaXRlcmF0b3IgPSByZWFkQnl0ZXMoc3RyZWFtLCBjaHVua1NpemUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG4gIGxldCBkb25lO1xuICBsZXQgX29uRmluaXNoID0gKGUpID0+IHtcbiAgICBpZiAoIWRvbmUpIHtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgb25GaW5pc2ggJiYgb25GaW5pc2goZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgYXN5bmMgcHVsbChjb250cm9sbGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICBfb25GaW5pc2goKTtcbiAgICAgICAgICBjb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAgICAgbGV0IGxvYWRlZEJ5dGVzID0gYnl0ZXMgKz0gbGVuO1xuICAgICAgICAgIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9vbkZpbmlzaChlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwocmVhc29uKSB7XG4gICAgICBfb25GaW5pc2gocmVhc29uKTtcbiAgICAgIHJldHVybiBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBoaWdoV2F0ZXJNYXJrOiAyXG4gIH0pXG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSBcIi4uL3BsYXRmb3JtL2luZGV4LmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tIFwiLi4vY29yZS9BeGlvc0Vycm9yLmpzXCI7XG5pbXBvcnQgY29tcG9zZVNpZ25hbHMgZnJvbSBcIi4uL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanNcIjtcbmltcG9ydCB7dHJhY2tTdHJlYW19IGZyb20gXCIuLi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzXCI7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IHtwcm9ncmVzc0V2ZW50UmVkdWNlciwgcHJvZ3Jlc3NFdmVudERlY29yYXRvciwgYXN5bmNEZWNvcmF0b3J9IGZyb20gXCIuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzXCI7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tIFwiLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzXCI7XG5pbXBvcnQgc2V0dGxlIGZyb20gXCIuLi9jb3JlL3NldHRsZS5qc1wiO1xuXG5jb25zdCBpc0ZldGNoU3VwcG9ydGVkID0gdHlwZW9mIGZldGNoID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgPSBpc0ZldGNoU3VwcG9ydGVkICYmIHR5cGVvZiBSZWFkYWJsZVN0cmVhbSA9PT0gJ2Z1bmN0aW9uJztcblxuLy8gdXNlZCBvbmx5IGluc2lkZSB0aGUgZmV0Y2ggYWRhcHRlclxuY29uc3QgZW5jb2RlVGV4dCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgKChlbmNvZGVyKSA9PiAoc3RyKSA9PiBlbmNvZGVyLmVuY29kZShzdHIpKShuZXcgVGV4dEVuY29kZXIoKSkgOlxuICAgIGFzeW5jIChzdHIpID0+IG5ldyBVaW50OEFycmF5KGF3YWl0IG5ldyBSZXNwb25zZShzdHIpLmFycmF5QnVmZmVyKCkpXG4pO1xuXG5jb25zdCB0ZXN0ID0gKGZuLCAuLi5hcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gPSBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmIHRlc3QoKCkgPT4ge1xuICBsZXQgZHVwbGV4QWNjZXNzZWQgPSBmYWxzZTtcblxuICBjb25zdCBoYXNDb250ZW50VHlwZSA9IG5ldyBSZXF1ZXN0KHBsYXRmb3JtLm9yaWdpbiwge1xuICAgIGJvZHk6IG5ldyBSZWFkYWJsZVN0cmVhbSgpLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGdldCBkdXBsZXgoKSB7XG4gICAgICBkdXBsZXhBY2Nlc3NlZCA9IHRydWU7XG4gICAgICByZXR1cm4gJ2hhbGYnO1xuICAgIH0sXG4gIH0pLmhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKTtcblxuICByZXR1cm4gZHVwbGV4QWNjZXNzZWQgJiYgIWhhc0NvbnRlbnRUeXBlO1xufSk7XG5cbmNvbnN0IERFRkFVTFRfQ0hVTktfU0laRSA9IDY0ICogMTAyNDtcblxuY29uc3Qgc3VwcG9ydHNSZXNwb25zZVN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiZcbiAgdGVzdCgoKSA9PiB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKG5ldyBSZXNwb25zZSgnJykuYm9keSkpO1xuXG5cbmNvbnN0IHJlc29sdmVycyA9IHtcbiAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSlcbn07XG5cbmlzRmV0Y2hTdXBwb3J0ZWQgJiYgKCgocmVzKSA9PiB7XG4gIFsndGV4dCcsICdhcnJheUJ1ZmZlcicsICdibG9iJywgJ2Zvcm1EYXRhJywgJ3N0cmVhbSddLmZvckVhY2godHlwZSA9PiB7XG4gICAgIXJlc29sdmVyc1t0eXBlXSAmJiAocmVzb2x2ZXJzW3R5cGVdID0gdXRpbHMuaXNGdW5jdGlvbihyZXNbdHlwZV0pID8gKHJlcykgPT4gcmVzW3R5cGVdKCkgOlxuICAgICAgKF8sIGNvbmZpZykgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgUmVzcG9uc2UgdHlwZSAnJHt0eXBlfScgaXMgbm90IHN1cHBvcnRlZGAsIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JULCBjb25maWcpO1xuICAgICAgfSlcbiAgfSk7XG59KShuZXcgUmVzcG9uc2UpKTtcblxuY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gIGlmIChib2R5ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzQmxvYihib2R5KSkge1xuICAgIHJldHVybiBib2R5LnNpemU7XG4gIH1cblxuICBpZih1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGJvZHkpKSB7XG4gICAgY29uc3QgX3JlcXVlc3QgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgYm9keSxcbiAgICB9KTtcbiAgICByZXR1cm4gKGF3YWl0IF9yZXF1ZXN0LmFycmF5QnVmZmVyKCkpLmJ5dGVMZW5ndGg7XG4gIH1cblxuICBpZih1dGlscy5pc0FycmF5QnVmZmVyVmlldyhib2R5KSB8fCB1dGlscy5pc0FycmF5QnVmZmVyKGJvZHkpKSB7XG4gICAgcmV0dXJuIGJvZHkuYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGJvZHkpKSB7XG4gICAgYm9keSA9IGJvZHkgKyAnJztcbiAgfVxuXG4gIGlmKHV0aWxzLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgcmV0dXJuIChhd2FpdCBlbmNvZGVUZXh0KGJvZHkpKS5ieXRlTGVuZ3RoO1xuICB9XG59XG5cbmNvbnN0IHJlc29sdmVCb2R5TGVuZ3RoID0gYXN5bmMgKGhlYWRlcnMsIGJvZHkpID0+IHtcbiAgY29uc3QgbGVuZ3RoID0gdXRpbHMudG9GaW5pdGVOdW1iZXIoaGVhZGVycy5nZXRDb250ZW50TGVuZ3RoKCkpO1xuXG4gIHJldHVybiBsZW5ndGggPT0gbnVsbCA/IGdldEJvZHlMZW5ndGgoYm9keSkgOiBsZW5ndGg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKGFzeW5jIChjb25maWcpID0+IHtcbiAgbGV0IHtcbiAgICB1cmwsXG4gICAgbWV0aG9kLFxuICAgIGRhdGEsXG4gICAgc2lnbmFsLFxuICAgIGNhbmNlbFRva2VuLFxuICAgIHRpbWVvdXQsXG4gICAgb25Eb3dubG9hZFByb2dyZXNzLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3MsXG4gICAgcmVzcG9uc2VUeXBlLFxuICAgIGhlYWRlcnMsXG4gICAgd2l0aENyZWRlbnRpYWxzID0gJ3NhbWUtb3JpZ2luJyxcbiAgICBmZXRjaE9wdGlvbnNcbiAgfSA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcblxuICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgPyAocmVzcG9uc2VUeXBlICsgJycpLnRvTG93ZXJDYXNlKCkgOiAndGV4dCc7XG5cbiAgbGV0IGNvbXBvc2VkU2lnbmFsID0gY29tcG9zZVNpZ25hbHMoW3NpZ25hbCwgY2FuY2VsVG9rZW4gJiYgY2FuY2VsVG9rZW4udG9BYm9ydFNpZ25hbCgpXSwgdGltZW91dCk7XG5cbiAgbGV0IHJlcXVlc3Q7XG5cbiAgY29uc3QgdW5zdWJzY3JpYmUgPSBjb21wb3NlZFNpZ25hbCAmJiBjb21wb3NlZFNpZ25hbC51bnN1YnNjcmliZSAmJiAoKCkgPT4ge1xuICAgICAgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUoKTtcbiAgfSk7XG5cbiAgbGV0IHJlcXVlc3RDb250ZW50TGVuZ3RoO1xuXG4gIHRyeSB7XG4gICAgaWYgKFxuICAgICAgb25VcGxvYWRQcm9ncmVzcyAmJiBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gJiYgbWV0aG9kICE9PSAnZ2V0JyAmJiBtZXRob2QgIT09ICdoZWFkJyAmJlxuICAgICAgKHJlcXVlc3RDb250ZW50TGVuZ3RoID0gYXdhaXQgcmVzb2x2ZUJvZHlMZW5ndGgoaGVhZGVycywgZGF0YSkpICE9PSAwXG4gICAgKSB7XG4gICAgICBsZXQgX3JlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgIGR1cGxleDogXCJoYWxmXCJcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgY29udGVudFR5cGVIZWFkZXI7XG5cbiAgICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpICYmIChjb250ZW50VHlwZUhlYWRlciA9IF9yZXF1ZXN0LmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkpIHtcbiAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcilcbiAgICAgIH1cblxuICAgICAgaWYgKF9yZXF1ZXN0LmJvZHkpIHtcbiAgICAgICAgY29uc3QgW29uUHJvZ3Jlc3MsIGZsdXNoXSA9IHByb2dyZXNzRXZlbnREZWNvcmF0b3IoXG4gICAgICAgICAgcmVxdWVzdENvbnRlbnRMZW5ndGgsXG4gICAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoYXN5bmNEZWNvcmF0b3Iob25VcGxvYWRQcm9ncmVzcykpXG4gICAgICAgICk7XG5cbiAgICAgICAgZGF0YSA9IHRyYWNrU3RyZWFtKF9yZXF1ZXN0LmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25Qcm9ncmVzcywgZmx1c2gpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdXRpbHMuaXNTdHJpbmcod2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgd2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzID8gJ2luY2x1ZGUnIDogJ29taXQnO1xuICAgIH1cblxuICAgIC8vIENsb3VkZmxhcmUgV29ya2VycyB0aHJvd3Mgd2hlbiBjcmVkZW50aWFscyBhcmUgZGVmaW5lZFxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY2xvdWRmbGFyZS93b3JrZXJkL2lzc3Vlcy85MDJcbiAgICBjb25zdCBpc0NyZWRlbnRpYWxzU3VwcG9ydGVkID0gXCJjcmVkZW50aWFsc1wiIGluIFJlcXVlc3QucHJvdG90eXBlO1xuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICBtZXRob2Q6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgaGVhZGVyczogaGVhZGVycy5ub3JtYWxpemUoKS50b0pTT04oKSxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICBkdXBsZXg6IFwiaGFsZlwiLFxuICAgICAgY3JlZGVudGlhbHM6IGlzQ3JlZGVudGlhbHNTdXBwb3J0ZWQgPyB3aXRoQ3JlZGVudGlhbHMgOiB1bmRlZmluZWRcbiAgICB9KTtcblxuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3QpO1xuXG4gICAgY29uc3QgaXNTdHJlYW1SZXNwb25zZSA9IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKHJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScgfHwgcmVzcG9uc2VUeXBlID09PSAncmVzcG9uc2UnKTtcblxuICAgIGlmIChzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChvbkRvd25sb2FkUHJvZ3Jlc3MgfHwgKGlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUpKSkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG4gICAgICBbJ3N0YXR1cycsICdzdGF0dXNUZXh0JywgJ2hlYWRlcnMnXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBvcHRpb25zW3Byb3BdID0gcmVzcG9uc2VbcHJvcF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcmVzcG9uc2VDb250ZW50TGVuZ3RoID0gdXRpbHMudG9GaW5pdGVOdW1iZXIocmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtbGVuZ3RoJykpO1xuXG4gICAgICBjb25zdCBbb25Qcm9ncmVzcywgZmx1c2hdID0gb25Eb3dubG9hZFByb2dyZXNzICYmIHByb2dyZXNzRXZlbnREZWNvcmF0b3IoXG4gICAgICAgIHJlc3BvbnNlQ29udGVudExlbmd0aCxcbiAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoYXN5bmNEZWNvcmF0b3Iob25Eb3dubG9hZFByb2dyZXNzKSwgdHJ1ZSlcbiAgICAgICkgfHwgW107XG5cbiAgICAgIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKFxuICAgICAgICB0cmFja1N0cmVhbShyZXNwb25zZS5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uUHJvZ3Jlc3MsICgpID0+IHtcbiAgICAgICAgICBmbHVzaCAmJiBmbHVzaCgpO1xuICAgICAgICAgIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSB8fCAndGV4dCc7XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzb2x2ZXJzW3V0aWxzLmZpbmRLZXkocmVzb2x2ZXJzLCByZXNwb25zZVR5cGUpIHx8ICd0ZXh0J10ocmVzcG9uc2UsIGNvbmZpZyk7XG5cbiAgICAhaXNTdHJlYW1SZXNwb25zZSAmJiB1bnN1YnNjcmliZSAmJiB1bnN1YnNjcmliZSgpO1xuXG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBoZWFkZXJzOiBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfSlcbiAgICB9KVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICB1bnN1YnNjcmliZSAmJiB1bnN1YnNjcmliZSgpO1xuXG4gICAgaWYgKGVyciAmJiBlcnIubmFtZSA9PT0gJ1R5cGVFcnJvcicgJiYgL2ZldGNoL2kudGVzdChlcnIubWVzc2FnZSkpIHtcbiAgICAgIHRocm93IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KSxcbiAgICAgICAge1xuICAgICAgICAgIGNhdXNlOiBlcnIuY2F1c2UgfHwgZXJyXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZXJyLCBlcnIgJiYgZXJyLmNvZGUsIGNvbmZpZywgcmVxdWVzdCk7XG4gIH1cbn0pO1xuXG5cbiIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgaHR0cEFkYXB0ZXIgZnJvbSAnLi9odHRwLmpzJztcbmltcG9ydCB4aHJBZGFwdGVyIGZyb20gJy4veGhyLmpzJztcbmltcG9ydCBmZXRjaEFkYXB0ZXIgZnJvbSAnLi9mZXRjaC5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tIFwiLi4vY29yZS9BeGlvc0Vycm9yLmpzXCI7XG5cbmNvbnN0IGtub3duQWRhcHRlcnMgPSB7XG4gIGh0dHA6IGh0dHBBZGFwdGVyLFxuICB4aHI6IHhockFkYXB0ZXIsXG4gIGZldGNoOiBmZXRjaEFkYXB0ZXJcbn1cblxudXRpbHMuZm9yRWFjaChrbm93bkFkYXB0ZXJzLCAoZm4sIHZhbHVlKSA9PiB7XG4gIGlmIChmbikge1xuICAgIHRyeSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICduYW1lJywge3ZhbHVlfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ2FkYXB0ZXJOYW1lJywge3ZhbHVlfSk7XG4gIH1cbn0pO1xuXG5jb25zdCByZW5kZXJSZWFzb24gPSAocmVhc29uKSA9PiBgLSAke3JlYXNvbn1gO1xuXG5jb25zdCBpc1Jlc29sdmVkSGFuZGxlID0gKGFkYXB0ZXIpID0+IHV0aWxzLmlzRnVuY3Rpb24oYWRhcHRlcikgfHwgYWRhcHRlciA9PT0gbnVsbCB8fCBhZGFwdGVyID09PSBmYWxzZTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRBZGFwdGVyOiAoYWRhcHRlcnMpID0+IHtcbiAgICBhZGFwdGVycyA9IHV0aWxzLmlzQXJyYXkoYWRhcHRlcnMpID8gYWRhcHRlcnMgOiBbYWRhcHRlcnNdO1xuXG4gICAgY29uc3Qge2xlbmd0aH0gPSBhZGFwdGVycztcbiAgICBsZXQgbmFtZU9yQWRhcHRlcjtcbiAgICBsZXQgYWRhcHRlcjtcblxuICAgIGNvbnN0IHJlamVjdGVkUmVhc29ucyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgICAgbGV0IGlkO1xuXG4gICAgICBhZGFwdGVyID0gbmFtZU9yQWRhcHRlcjtcblxuICAgICAgaWYgKCFpc1Jlc29sdmVkSGFuZGxlKG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICAgIGFkYXB0ZXIgPSBrbm93bkFkYXB0ZXJzWyhpZCA9IFN0cmluZyhuYW1lT3JBZGFwdGVyKSkudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKGFkYXB0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBVbmtub3duIGFkYXB0ZXIgJyR7aWR9J2ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGFwdGVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZWplY3RlZFJlYXNvbnNbaWQgfHwgJyMnICsgaV0gPSBhZGFwdGVyO1xuICAgIH1cblxuICAgIGlmICghYWRhcHRlcikge1xuXG4gICAgICBjb25zdCByZWFzb25zID0gT2JqZWN0LmVudHJpZXMocmVqZWN0ZWRSZWFzb25zKVxuICAgICAgICAubWFwKChbaWQsIHN0YXRlXSkgPT4gYGFkYXB0ZXIgJHtpZH0gYCArXG4gICAgICAgICAgKHN0YXRlID09PSBmYWxzZSA/ICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudCcgOiAnaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGQnKVxuICAgICAgICApO1xuXG4gICAgICBsZXQgcyA9IGxlbmd0aCA/XG4gICAgICAgIChyZWFzb25zLmxlbmd0aCA+IDEgPyAnc2luY2UgOlxcbicgKyByZWFzb25zLm1hcChyZW5kZXJSZWFzb24pLmpvaW4oJ1xcbicpIDogJyAnICsgcmVuZGVyUmVhc29uKHJlYXNvbnNbMF0pKSA6XG4gICAgICAgICdhcyBubyBhZGFwdGVyIHNwZWNpZmllZCc7XG5cbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gc3VpdGFibGUgYWRhcHRlciB0byBkaXNwYXRjaCB0aGUgcmVxdWVzdCBgICsgcyxcbiAgICAgICAgJ0VSUl9OT1RfU1VQUE9SVCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkYXB0ZXI7XG4gIH0sXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0cmFuc2Zvcm1EYXRhIGZyb20gJy4vdHJhbnNmb3JtRGF0YS5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi4vY2FuY2VsL2lzQ2FuY2VsLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCBhZGFwdGVycyBmcm9tIFwiLi4vYWRhcHRlcnMvYWRhcHRlcnMuanNcIjtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc2lnbmFsICYmIGNvbmZpZy5zaWduYWwuYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbmZpZy5oZWFkZXJzKTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgIGNvbmZpZyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIGlmIChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10uaW5kZXhPZihjb25maWcubWV0aG9kKSAhPT0gLTEpIHtcbiAgICBjb25maWcuaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgYWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXIoY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcik7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICBjb25maWcsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICByZXNwb25zZVxuICAgICk7XG5cbiAgICByZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20ocmVhc29uLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIxLjcuOVwiOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuLi9lbnYvZGF0YS5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuXG5jb25zdCB2YWxpZGF0b3JzID0ge307XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5bJ29iamVjdCcsICdib29sZWFuJywgJ251bWJlcicsICdmdW5jdGlvbicsICdzdHJpbmcnLCAnc3ltYm9sJ10uZm9yRWFjaCgodHlwZSwgaSkgPT4ge1xuICB2YWxpZGF0b3JzW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxuY29uc3QgZGVwcmVjYXRlZFdhcm5pbmdzID0ge307XG5cbi8qKlxuICogVHJhbnNpdGlvbmFsIG9wdGlvbiB2YWxpZGF0b3JcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMudHJhbnNpdGlvbmFsID0gZnVuY3Rpb24gdHJhbnNpdGlvbmFsKHZhbGlkYXRvciwgdmVyc2lvbiwgbWVzc2FnZSkge1xuICBmdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG9wdCwgZGVzYykge1xuICAgIHJldHVybiAnW0F4aW9zIHYnICsgVkVSU0lPTiArICddIFRyYW5zaXRpb25hbCBvcHRpb24gXFwnJyArIG9wdCArICdcXCcnICsgZGVzYyArIChtZXNzYWdlID8gJy4gJyArIG1lc3NhZ2UgOiAnJyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gKHZhbHVlLCBvcHQsIG9wdHMpID0+IHtcbiAgICBpZiAodmFsaWRhdG9yID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGZvcm1hdE1lc3NhZ2Uob3B0LCAnIGhhcyBiZWVuIHJlbW92ZWQnICsgKHZlcnNpb24gPyAnIGluICcgKyB2ZXJzaW9uIDogJycpKSxcbiAgICAgICAgQXhpb3NFcnJvci5FUlJfREVQUkVDQVRFRFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodmVyc2lvbiAmJiAhZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0pIHtcbiAgICAgIGRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdID0gdHJ1ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGZvcm1hdE1lc3NhZ2UoXG4gICAgICAgICAgb3B0LFxuICAgICAgICAgICcgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2JyArIHZlcnNpb24gKyAnIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5lYXIgZnV0dXJlJ1xuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0b3IgPyB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0cykgOiB0cnVlO1xuICB9O1xufTtcblxudmFsaWRhdG9ycy5zcGVsbGluZyA9IGZ1bmN0aW9uIHNwZWxsaW5nKGNvcnJlY3RTcGVsbGluZykge1xuICByZXR1cm4gKHZhbHVlLCBvcHQpID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUud2FybihgJHtvcHR9IGlzIGxpa2VseSBhIG1pc3NwZWxsaW5nIG9mICR7Y29ycmVjdFNwZWxsaW5nfWApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtib29sZWFuP30gYWxsb3dVbmtub3duXG4gKlxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBjb25zdCBvcHQgPSBrZXlzW2ldO1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IHNjaGVtYVtvcHRdO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0aW9ucyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb24gJyArIG9wdCArICcgbXVzdCBiZSAnICsgcmVzdWx0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYWxsb3dVbmtub3duICE9PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignVW5rbm93biBvcHRpb24gJyArIG9wdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXNzZXJ0T3B0aW9ucyxcbiAgdmFsaWRhdG9yc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IGJ1aWxkVVJMIGZyb20gJy4uL2hlbHBlcnMvYnVpbGRVUkwuanMnO1xuaW1wb3J0IEludGVyY2VwdG9yTWFuYWdlciBmcm9tICcuL0ludGVyY2VwdG9yTWFuYWdlci5qcyc7XG5pbXBvcnQgZGlzcGF0Y2hSZXF1ZXN0IGZyb20gJy4vZGlzcGF0Y2hSZXF1ZXN0LmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL21lcmdlQ29uZmlnLmpzJztcbmltcG9ydCBidWlsZEZ1bGxQYXRoIGZyb20gJy4vYnVpbGRGdWxsUGF0aC5qcyc7XG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uL2hlbHBlcnMvdmFsaWRhdG9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi9BeGlvc0hlYWRlcnMuanMnO1xuXG5jb25zdCB2YWxpZGF0b3JzID0gdmFsaWRhdG9yLnZhbGlkYXRvcnM7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmNsYXNzIEF4aW9zIHtcbiAgY29uc3RydWN0b3IoaW5zdGFuY2VDb25maWcpIHtcbiAgICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBjb25maWdPclVybCBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gICAqIEBwYXJhbSB7P09iamVjdH0gY29uZmlnXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAgICovXG4gIGFzeW5jIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBsZXQgZHVtbXkgPSB7fTtcblxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15KSA6IChkdW1teSA9IG5ldyBFcnJvcigpKTtcblxuICAgICAgICAvLyBzbGljZSBvZmYgdGhlIEVycm9yOiAuLi4gbGluZVxuICAgICAgICBjb25zdCBzdGFjayA9IGR1bW15LnN0YWNrID8gZHVtbXkuc3RhY2sucmVwbGFjZSgvXi4rXFxuLywgJycpIDogJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFlcnIuc3RhY2spIHtcbiAgICAgICAgICAgIGVyci5zdGFjayA9IHN0YWNrO1xuICAgICAgICAgICAgLy8gbWF0Y2ggd2l0aG91dCB0aGUgMiB0b3Agc3RhY2sgbGluZXNcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YWNrICYmICFTdHJpbmcoZXJyLnN0YWNrKS5lbmRzV2l0aChzdGFjay5yZXBsYWNlKC9eLitcXG4uK1xcbi8sICcnKSkpIHtcbiAgICAgICAgICAgIGVyci5zdGFjayArPSAnXFxuJyArIHN0YWNrXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaWdub3JlIHRoZSBjYXNlIHdoZXJlIFwic3RhY2tcIiBpcyBhbiB1bi13cml0YWJsZSBwcm9wZXJ0eVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBfcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICAgIGlmICh0eXBlb2YgY29uZmlnT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICAgIH1cblxuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBjb25zdCB7dHJhbnNpdGlvbmFsLCBwYXJhbXNTZXJpYWxpemVyLCBoZWFkZXJzfSA9IGNvbmZpZztcblxuICAgIGlmICh0cmFuc2l0aW9uYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnModHJhbnNpdGlvbmFsLCB7XG4gICAgICAgIHNpbGVudEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBmb3JjZWRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgY2xhcmlmeVRpbWVvdXRFcnJvcjogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKVxuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXNTZXJpYWxpemVyICE9IG51bGwpIHtcbiAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHBhcmFtc1NlcmlhbGl6ZXIpKSB7XG4gICAgICAgIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyID0ge1xuICAgICAgICAgIHNlcmlhbGl6ZTogcGFyYW1zU2VyaWFsaXplclxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhwYXJhbXNTZXJpYWxpemVyLCB7XG4gICAgICAgICAgZW5jb2RlOiB2YWxpZGF0b3JzLmZ1bmN0aW9uLFxuICAgICAgICAgIHNlcmlhbGl6ZTogdmFsaWRhdG9ycy5mdW5jdGlvblxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhjb25maWcsIHtcbiAgICAgIGJhc2VVcmw6IHZhbGlkYXRvcnMuc3BlbGxpbmcoJ2Jhc2VVUkwnKSxcbiAgICAgIHdpdGhYc3JmVG9rZW46IHZhbGlkYXRvcnMuc3BlbGxpbmcoJ3dpdGhYU1JGVG9rZW4nKVxuICAgIH0sIHRydWUpO1xuXG4gICAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgICBjb25maWcubWV0aG9kID0gKGNvbmZpZy5tZXRob2QgfHwgdGhpcy5kZWZhdWx0cy5tZXRob2QgfHwgJ2dldCcpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgICBsZXQgY29udGV4dEhlYWRlcnMgPSBoZWFkZXJzICYmIHV0aWxzLm1lcmdlKFxuICAgICAgaGVhZGVycy5jb21tb24sXG4gICAgICBoZWFkZXJzW2NvbmZpZy5tZXRob2RdXG4gICAgKTtcblxuICAgIGhlYWRlcnMgJiYgdXRpbHMuZm9yRWFjaChcbiAgICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgICAgKG1ldGhvZCkgPT4ge1xuICAgICAgICBkZWxldGUgaGVhZGVyc1ttZXRob2RdO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5jb25jYXQoY29udGV4dEhlYWRlcnMsIGhlYWRlcnMpO1xuXG4gICAgLy8gZmlsdGVyIG91dCBza2lwcGVkIGludGVyY2VwdG9yc1xuICAgIGNvbnN0IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgbGV0IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHRydWU7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICBpZiAodHlwZW9mIGludGVyY2VwdG9yLnJ1bldoZW4gPT09ICdmdW5jdGlvbicgJiYgaW50ZXJjZXB0b3IucnVuV2hlbihjb25maWcpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyAmJiBpbnRlcmNlcHRvci5zeW5jaHJvbm91cztcblxuICAgICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGxldCBwcm9taXNlO1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGVuO1xuXG4gICAgaWYgKCFzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMpIHtcbiAgICAgIGNvbnN0IGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdC5iaW5kKHRoaXMpLCB1bmRlZmluZWRdO1xuICAgICAgY2hhaW4udW5zaGlmdC5hcHBseShjaGFpbiwgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgY2hhaW4ucHVzaC5hcHBseShjaGFpbiwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGxlbiA9IGNoYWluLmxlbmd0aDtcblxuICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gICAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluW2krK10sIGNoYWluW2krK10pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBsZW4gPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICBsZXQgbmV3Q29uZmlnID0gY29uZmlnO1xuXG4gICAgaSA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgY29uc3Qgb25GdWxmaWxsZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgY29uc3Qgb25SZWplY3RlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICB0cnkge1xuICAgICAgICBuZXdDb25maWcgPSBvbkZ1bGZpbGxlZChuZXdDb25maWcpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgb25SZWplY3RlZC5jYWxsKHRoaXMsIGVycm9yKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHByb21pc2UgPSBkaXNwYXRjaFJlcXVlc3QuY2FsbCh0aGlzLCBuZXdDb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxuICAgIGkgPSAwO1xuICAgIGxlbiA9IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihyZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZ2V0VXJpKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gICAgY29uc3QgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXR1cm4gYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcbiAgfVxufVxuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cblxuICBmdW5jdGlvbiBnZW5lcmF0ZUhUVFBNZXRob2QoaXNGb3JtKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGh0dHBNZXRob2QodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogaXNGb3JtID8ge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcbiAgICAgICAgfSA6IHt9LFxuICAgICAgICB1cmwsXG4gICAgICAgIGRhdGFcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBnZW5lcmF0ZUhUVFBNZXRob2QoKTtcblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi9DYW5jZWxlZEVycm9yLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsVG9rZW59XG4gKi9cbmNsYXNzIENhbmNlbFRva2VuIHtcbiAgY29uc3RydWN0b3IoZXhlY3V0b3IpIHtcbiAgICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVQcm9taXNlO1xuXG4gICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRva2VuID0gdGhpcztcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4oY2FuY2VsID0+IHtcbiAgICAgIGlmICghdG9rZW4uX2xpc3RlbmVycykgcmV0dXJuO1xuXG4gICAgICBsZXQgaSA9IHRva2VuLl9saXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgICB0b2tlbi5fbGlzdGVuZXJzW2ldKGNhbmNlbCk7XG4gICAgICB9XG4gICAgICB0b2tlbi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICB9KTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4gPSBvbmZ1bGZpbGxlZCA9PiB7XG4gICAgICBsZXQgX3Jlc29sdmU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICB0b2tlbi5zdWJzY3JpYmUocmVzb2x2ZSk7XG4gICAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIH0pLnRoZW4ob25mdWxmaWxsZWQpO1xuXG4gICAgICBwcm9taXNlLmNhbmNlbCA9IGZ1bmN0aW9uIHJlamVjdCgpIHtcbiAgICAgICAgdG9rZW4udW5zdWJzY3JpYmUoX3Jlc29sdmUpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KTtcbiAgICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gICAqL1xuICB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgdGhyb3cgdGhpcy5yZWFzb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSB0byB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIGxpc3RlbmVyKHRoaXMucmVhc29uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IFtsaXN0ZW5lcl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgdW5zdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICB0b0Fib3J0U2lnbmFsKCkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBhYm9ydCA9IChlcnIpID0+IHtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZXJyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdWJzY3JpYmUoYWJvcnQpO1xuXG4gICAgY29udHJvbGxlci5zaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB0aGlzLnVuc3Vic2NyaWJlKGFib3J0KTtcblxuICAgIHJldHVybiBjb250cm9sbGVyLnNpZ25hbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gICAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gICAqL1xuICBzdGF0aWMgc291cmNlKCkge1xuICAgIGxldCBjYW5jZWw7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgICAgY2FuY2VsID0gYztcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW4sXG4gICAgICBjYW5jZWxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMuaXNPYmplY3QocGF5bG9hZCkgJiYgKHBheWxvYWQuaXNBeGlvc0Vycm9yID09PSB0cnVlKTtcbn1cbiIsImNvbnN0IEh0dHBTdGF0dXNDb2RlID0ge1xuICBDb250aW51ZTogMTAwLFxuICBTd2l0Y2hpbmdQcm90b2NvbHM6IDEwMSxcbiAgUHJvY2Vzc2luZzogMTAyLFxuICBFYXJseUhpbnRzOiAxMDMsXG4gIE9rOiAyMDAsXG4gIENyZWF0ZWQ6IDIwMSxcbiAgQWNjZXB0ZWQ6IDIwMixcbiAgTm9uQXV0aG9yaXRhdGl2ZUluZm9ybWF0aW9uOiAyMDMsXG4gIE5vQ29udGVudDogMjA0LFxuICBSZXNldENvbnRlbnQ6IDIwNSxcbiAgUGFydGlhbENvbnRlbnQ6IDIwNixcbiAgTXVsdGlTdGF0dXM6IDIwNyxcbiAgQWxyZWFkeVJlcG9ydGVkOiAyMDgsXG4gIEltVXNlZDogMjI2LFxuICBNdWx0aXBsZUNob2ljZXM6IDMwMCxcbiAgTW92ZWRQZXJtYW5lbnRseTogMzAxLFxuICBGb3VuZDogMzAyLFxuICBTZWVPdGhlcjogMzAzLFxuICBOb3RNb2RpZmllZDogMzA0LFxuICBVc2VQcm94eTogMzA1LFxuICBVbnVzZWQ6IDMwNixcbiAgVGVtcG9yYXJ5UmVkaXJlY3Q6IDMwNyxcbiAgUGVybWFuZW50UmVkaXJlY3Q6IDMwOCxcbiAgQmFkUmVxdWVzdDogNDAwLFxuICBVbmF1dGhvcml6ZWQ6IDQwMSxcbiAgUGF5bWVudFJlcXVpcmVkOiA0MDIsXG4gIEZvcmJpZGRlbjogNDAzLFxuICBOb3RGb3VuZDogNDA0LFxuICBNZXRob2ROb3RBbGxvd2VkOiA0MDUsXG4gIE5vdEFjY2VwdGFibGU6IDQwNixcbiAgUHJveHlBdXRoZW50aWNhdGlvblJlcXVpcmVkOiA0MDcsXG4gIFJlcXVlc3RUaW1lb3V0OiA0MDgsXG4gIENvbmZsaWN0OiA0MDksXG4gIEdvbmU6IDQxMCxcbiAgTGVuZ3RoUmVxdWlyZWQ6IDQxMSxcbiAgUHJlY29uZGl0aW9uRmFpbGVkOiA0MTIsXG4gIFBheWxvYWRUb29MYXJnZTogNDEzLFxuICBVcmlUb29Mb25nOiA0MTQsXG4gIFVuc3VwcG9ydGVkTWVkaWFUeXBlOiA0MTUsXG4gIFJhbmdlTm90U2F0aXNmaWFibGU6IDQxNixcbiAgRXhwZWN0YXRpb25GYWlsZWQ6IDQxNyxcbiAgSW1BVGVhcG90OiA0MTgsXG4gIE1pc2RpcmVjdGVkUmVxdWVzdDogNDIxLFxuICBVbnByb2Nlc3NhYmxlRW50aXR5OiA0MjIsXG4gIExvY2tlZDogNDIzLFxuICBGYWlsZWREZXBlbmRlbmN5OiA0MjQsXG4gIFRvb0Vhcmx5OiA0MjUsXG4gIFVwZ3JhZGVSZXF1aXJlZDogNDI2LFxuICBQcmVjb25kaXRpb25SZXF1aXJlZDogNDI4LFxuICBUb29NYW55UmVxdWVzdHM6IDQyOSxcbiAgUmVxdWVzdEhlYWRlckZpZWxkc1Rvb0xhcmdlOiA0MzEsXG4gIFVuYXZhaWxhYmxlRm9yTGVnYWxSZWFzb25zOiA0NTEsXG4gIEludGVybmFsU2VydmVyRXJyb3I6IDUwMCxcbiAgTm90SW1wbGVtZW50ZWQ6IDUwMSxcbiAgQmFkR2F0ZXdheTogNTAyLFxuICBTZXJ2aWNlVW5hdmFpbGFibGU6IDUwMyxcbiAgR2F0ZXdheVRpbWVvdXQ6IDUwNCxcbiAgSHR0cFZlcnNpb25Ob3RTdXBwb3J0ZWQ6IDUwNSxcbiAgVmFyaWFudEFsc29OZWdvdGlhdGVzOiA1MDYsXG4gIEluc3VmZmljaWVudFN0b3JhZ2U6IDUwNyxcbiAgTG9vcERldGVjdGVkOiA1MDgsXG4gIE5vdEV4dGVuZGVkOiA1MTAsXG4gIE5ldHdvcmtBdXRoZW50aWNhdGlvblJlcXVpcmVkOiA1MTEsXG59O1xuXG5PYmplY3QuZW50cmllcyhIdHRwU3RhdHVzQ29kZSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gIEh0dHBTdGF0dXNDb2RlW3ZhbHVlXSA9IGtleTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBIdHRwU3RhdHVzQ29kZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xuaW1wb3J0IEF4aW9zIGZyb20gJy4vY29yZS9BeGlvcy5qcyc7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSAnLi9jb3JlL21lcmdlQ29uZmlnLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBmb3JtRGF0YVRvSlNPTiBmcm9tICcuL2hlbHBlcnMvZm9ybURhdGFUb0pTT04uanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsVG9rZW4gZnJvbSAnLi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMnO1xuaW1wb3J0IGlzQ2FuY2VsIGZyb20gJy4vY2FuY2VsL2lzQ2FuY2VsLmpzJztcbmltcG9ydCB7VkVSU0lPTn0gZnJvbSAnLi9lbnYvZGF0YS5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgc3ByZWFkIGZyb20gJy4vaGVscGVycy9zcHJlYWQuanMnO1xuaW1wb3J0IGlzQXhpb3NFcnJvciBmcm9tICcuL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4vY29yZS9BeGlvc0hlYWRlcnMuanNcIjtcbmltcG9ydCBhZGFwdGVycyBmcm9tICcuL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzJztcbmltcG9ydCBIdHRwU3RhdHVzQ29kZSBmcm9tICcuL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMnO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKlxuICogQHJldHVybnMge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIGNvbnN0IGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIGNvbnN0IGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCwgbnVsbCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG4gIGluc3RhbmNlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICAgIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhkZWZhdWx0Q29uZmlnLCBpbnN0YW5jZUNvbmZpZykpO1xuICB9O1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG5jb25zdCBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbGVkRXJyb3IgPSBDYW5jZWxlZEVycm9yO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSBDYW5jZWxUb2tlbjtcbmF4aW9zLmlzQ2FuY2VsID0gaXNDYW5jZWw7XG5heGlvcy5WRVJTSU9OID0gVkVSU0lPTjtcbmF4aW9zLnRvRm9ybURhdGEgPSB0b0Zvcm1EYXRhO1xuXG4vLyBFeHBvc2UgQXhpb3NFcnJvciBjbGFzc1xuYXhpb3MuQXhpb3NFcnJvciA9IEF4aW9zRXJyb3I7XG5cbi8vIGFsaWFzIGZvciBDYW5jZWxlZEVycm9yIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5heGlvcy5DYW5jZWwgPSBheGlvcy5DYW5jZWxlZEVycm9yO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG5heGlvcy5zcHJlYWQgPSBzcHJlYWQ7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IGlzQXhpb3NFcnJvcjtcblxuLy8gRXhwb3NlIG1lcmdlQ29uZmlnXG5heGlvcy5tZXJnZUNvbmZpZyA9IG1lcmdlQ29uZmlnO1xuXG5heGlvcy5BeGlvc0hlYWRlcnMgPSBBeGlvc0hlYWRlcnM7XG5cbmF4aW9zLmZvcm1Ub0pTT04gPSB0aGluZyA9PiBmb3JtRGF0YVRvSlNPTih1dGlscy5pc0hUTUxGb3JtKHRoaW5nKSA/IG5ldyBGb3JtRGF0YSh0aGluZykgOiB0aGluZyk7XG5cbmF4aW9zLmdldEFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyO1xuXG5heGlvcy5IdHRwU3RhdHVzQ29kZSA9IEh0dHBTdGF0dXNDb2RlO1xuXG5heGlvcy5kZWZhdWx0ID0gYXhpb3M7XG5cbi8vIHRoaXMgbW9kdWxlIHNob3VsZCBvbmx5IGhhdmUgYSBkZWZhdWx0IGV4cG9ydFxuZXhwb3J0IGRlZmF1bHQgYXhpb3NcbiIsImltcG9ydCBheGlvcyBmcm9tICcuL2xpYi9heGlvcy5qcyc7XG5cbi8vIFRoaXMgbW9kdWxlIGlzIGludGVuZGVkIHRvIHVud3JhcCBBeGlvcyBkZWZhdWx0IGV4cG9ydCBhcyBuYW1lZC5cbi8vIEtlZXAgdG9wLWxldmVsIGV4cG9ydCBzYW1lIHdpdGggc3RhdGljIHByb3BlcnRpZXNcbi8vIHNvIHRoYXQgaXQgY2FuIGtlZXAgc2FtZSB3aXRoIGVzIG1vZHVsZSBvciBjanNcbmNvbnN0IHtcbiAgQXhpb3MsXG4gIEF4aW9zRXJyb3IsXG4gIENhbmNlbGVkRXJyb3IsXG4gIGlzQ2FuY2VsLFxuICBDYW5jZWxUb2tlbixcbiAgVkVSU0lPTixcbiAgYWxsLFxuICBDYW5jZWwsXG4gIGlzQXhpb3NFcnJvcixcbiAgc3ByZWFkLFxuICB0b0Zvcm1EYXRhLFxuICBBeGlvc0hlYWRlcnMsXG4gIEh0dHBTdGF0dXNDb2RlLFxuICBmb3JtVG9KU09OLFxuICBnZXRBZGFwdGVyLFxuICBtZXJnZUNvbmZpZ1xufSA9IGF4aW9zO1xuXG5leHBvcnQge1xuICBheGlvcyBhcyBkZWZhdWx0LFxuICBBeGlvcyxcbiAgQXhpb3NFcnJvcixcbiAgQ2FuY2VsZWRFcnJvcixcbiAgaXNDYW5jZWwsXG4gIENhbmNlbFRva2VuLFxuICBWRVJTSU9OLFxuICBhbGwsXG4gIENhbmNlbCxcbiAgaXNBeGlvc0Vycm9yLFxuICBzcHJlYWQsXG4gIHRvRm9ybURhdGEsXG4gIEF4aW9zSGVhZGVycyxcbiAgSHR0cFN0YXR1c0NvZGUsXG4gIGZvcm1Ub0pTT04sXG4gIGdldEFkYXB0ZXIsXG4gIG1lcmdlQ29uZmlnXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBUElFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBzdGF0dXM7XG4gICAgc3RhY2s7XG4gICAgZGV0YWlscztcbiAgICB0eXBlO1xuICAgIHN0YXRpYyBnZXRVc2VyRGF0YUVycm9yKHN0YXR1c1RleHQsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHtcbiAgICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgICAgc3RhdHVzVGV4dCxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcih7IHN0YXR1cywgc3RhdHVzVGV4dCwgbWVzc2FnZSwgYm9keSA9IHt9IH0pIHtcbiAgICAgICAgbGV0IGJvZHlNZXNzYWdlID0gJyc7XG4gICAgICAgIGxldCBlcnJvciA9ICcnO1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBib2R5TWVzc2FnZSA9IGJvZHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBib2R5TWVzc2FnZSA9IGJvZHk/Lm1lc3NhZ2UgfHwgJyc7XG4gICAgICAgICAgICBlcnJvciA9IGJvZHk/LmVycm9yIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgZXJyb3IgfHwgc3RhdHVzVGV4dCB8fCAnJztcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gYm9keU1lc3NhZ2U7XG4gICAgICAgIHRoaXMudHlwZSA9ICdNYWlsZ3VuQVBJRXJyb3InO1xuICAgIH1cbn1cbiIsImltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yLmpzJztcbmNsYXNzIEJsb2JGcm9tU3RyZWFtIHtcbiAgICBfc3RyZWFtO1xuICAgIHNpemU7XG4gICAgY29uc3RydWN0b3Ioc3RyZWFtLCBzaXplKSB7XG4gICAgICAgIHRoaXMuX3N0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB9XG4gICAgc3RyZWFtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RyZWFtO1xuICAgIH1cbiAgICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgICAgIHJldHVybiAnQmxvYic7XG4gICAgfVxufVxuY2xhc3MgQXR0YWNobWVudHNIYW5kbGVyIHtcbiAgICBnZXRBdHRhY2htZW50T3B0aW9ucyhpdGVtKSB7XG4gICAgICAgIGNvbnN0IHsgZmlsZW5hbWUsIGNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aCwgfSA9IGl0ZW07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi4oZmlsZW5hbWUgPyB7IGZpbGVuYW1lIH0gOiB7IGZpbGVuYW1lOiAnZmlsZScgfSksXG4gICAgICAgICAgICAuLi4oY29udGVudFR5cGUgJiYgeyBjb250ZW50VHlwZSB9KSxcbiAgICAgICAgICAgIC4uLihrbm93bkxlbmd0aCAmJiB7IGtub3duTGVuZ3RoIH0pXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldEZpbGVJbmZvKGZpbGUpIHtcbiAgICAgICAgY29uc3QgeyBuYW1lOiBmaWxlbmFtZSwgdHlwZTogY29udGVudFR5cGUsIHNpemU6IGtub3duTGVuZ3RoLCB9ID0gZmlsZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZSwgY29udGVudFR5cGUsIGtub3duTGVuZ3RoIH0pO1xuICAgIH1cbiAgICBnZXRDdXN0b21GaWxlSW5mbyhmaWxlKSB7XG4gICAgICAgIGNvbnN0IHsgZmlsZW5hbWUsIGNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aCwgfSA9IGZpbGU7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dGFjaG1lbnRPcHRpb25zKHsgZmlsZW5hbWUsIGNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aCB9KTtcbiAgICB9XG4gICAgZ2V0QnVmZmVySW5mbyhidWZmZXIpIHtcbiAgICAgICAgY29uc3QgeyBieXRlTGVuZ3RoOiBrbm93bkxlbmd0aCwgfSA9IGJ1ZmZlcjtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZTogJ2ZpbGUnLCBjb250ZW50VHlwZTogJycsIGtub3duTGVuZ3RoIH0pO1xuICAgIH1cbiAgICBpc1N0cmVhbShkYXRhKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGRhdGEucGlwZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG4gICAgaXNDdXN0b21GaWxlKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbiAgICAgICAgICAgICYmICEhb2JqLmRhdGE7XG4gICAgfVxuICAgIGlzQnJvd3NlckZpbGUob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAoISFvYmoubmFtZSB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpKTtcbiAgICB9XG4gICAgaXNCdWZmZXIoZGF0YSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQnVmZmVyLmlzQnVmZmVyKGRhdGEpO1xuICAgIH1cbiAgICBnZXRBdHRhY2htZW50SW5mbyhhdHRhY2htZW50KSB7XG4gICAgICAgIGNvbnN0IGlzQnJvd3NlckZpbGUgPSB0aGlzLmlzQnJvd3NlckZpbGUoYXR0YWNobWVudCk7XG4gICAgICAgIGNvbnN0IGlzQ3VzdG9tRmlsZSA9IHRoaXMuaXNDdXN0b21GaWxlKGF0dGFjaG1lbnQpO1xuICAgICAgICBjb25zdCBpc1N0cmluZyA9IHR5cGVvZiBhdHRhY2htZW50ID09PSAnc3RyaW5nJztcbiAgICAgICAgaWYgKCFpc1N0cmluZykge1xuICAgICAgICAgICAgaWYgKGlzQnJvd3NlckZpbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWxlSW5mbyhhdHRhY2htZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBCdWZmZXIuaXNCdWZmZXIoYXR0YWNobWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWZmZXJJbmZvKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQ3VzdG9tRmlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEN1c3RvbUZpbGVJbmZvKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBmaWxlbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGtub3duTGVuZ3RoOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuICAgIGNvbnZlcnRUb0ZEZXhwZWN0ZWRTaGFwZSh1c2VyUHJvdmlkZWRWYWx1ZSkge1xuICAgICAgICBjb25zdCBpc1N0cmVhbSA9IHRoaXMuaXNTdHJlYW0odXNlclByb3ZpZGVkVmFsdWUpO1xuICAgICAgICBjb25zdCBpc0Jyb3dzZXJGaWxlID0gdGhpcy5pc0Jyb3dzZXJGaWxlKHVzZXJQcm92aWRlZFZhbHVlKTtcbiAgICAgICAgY29uc3QgaXNDdXN0b21GaWxlID0gdGhpcy5pc0N1c3RvbUZpbGUodXNlclByb3ZpZGVkVmFsdWUpO1xuICAgICAgICBjb25zdCBpc1N0cmluZyA9IHR5cGVvZiB1c2VyUHJvdmlkZWRWYWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIGlmIChpc1N0cmVhbSB8fCBpc1N0cmluZyB8fCBpc0Jyb3dzZXJGaWxlIHx8IHRoaXMuaXNCdWZmZXIodXNlclByb3ZpZGVkVmFsdWUpKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB1c2VyUHJvdmlkZWRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0N1c3RvbUZpbGUpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHVzZXJQcm92aWRlZFZhbHVlLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKGBVbmtub3duIGF0dGFjaG1lbnQgdHlwZSAke3R5cGVvZiB1c2VyUHJvdmlkZWRWYWx1ZX1gLCBgVGhlIFwiYXR0YWNobWVudFwiIHByb3BlcnR5IGV4cGVjdHMgZWl0aGVyIEJ1ZmZlciwgQmxvYiwgb3IgU3RyaW5nLlxuICAgICAgICAgIEFsc28sIEl0IGlzIHBvc3NpYmxlIHRvIHByb3ZpZGUgYW4gb2JqZWN0IHRoYXQgaGFzIHRoZSBwcm9wZXJ0eSBcImRhdGFcIiB3aXRoIGEgdmFsdWUgdGhhdCBpcyBlcXVhbCB0byBvbmUgb2YgdGhlIHR5cGVzIGNvdW50ZWQgYmVmb3JlLlxuICAgICAgICAgIEFkZGl0aW9uYWxseSwgeW91IG1heSB1c2UgYW4gYXJyYXkgdG8gc2VuZCBtb3JlIHRoYW4gb25lIGF0dGFjaG1lbnQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZ2V0QmxvYkZyb21TdHJlYW0oc3RyZWFtLCBzaXplKSB7XG4gICAgICAgIHJldHVybiBuZXcgQmxvYkZyb21TdHJlYW0oc3RyZWFtLCBzaXplKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBBdHRhY2htZW50c0hhbmRsZXI7XG4iLCJpbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvci5qcyc7XG5pbXBvcnQgQXR0YWNobWVudHNIYW5kbGVyIGZyb20gJy4vQXR0YWNobWVudHNIYW5kbGVyLmpzJztcbmNsYXNzIEZvcm1EYXRhQnVpbGRlciB7XG4gICAgRm9ybURhdGFDb25zdHJ1Y3RvcjtcbiAgICBmaWxlS2V5cztcbiAgICBhdHRhY2htZW50c0hhbmRsZXI7XG4gICAgY29uc3RydWN0b3IoRm9ybURhdGFDb25zdHJ1Y3Rvcikge1xuICAgICAgICB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IgPSBGb3JtRGF0YUNvbnN0cnVjdG9yO1xuICAgICAgICB0aGlzLmZpbGVLZXlzID0gWydhdHRhY2htZW50JywgJ2lubGluZScsICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJ107XG4gICAgICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyID0gbmV3IEF0dGFjaG1lbnRzSGFuZGxlcigpO1xuICAgIH1cbiAgICBjcmVhdGVGb3JtRGF0YShkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBkYXRhIG9iamVjdCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZGF0YVtrZXldOyB9KVxuICAgICAgICAgICAgLnJlZHVjZSgoZm9ybURhdGFBY2MsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlsZUtleXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGF0dGFjaG1lbnRWYWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc01lc3NhZ2VBdHRhY2htZW50KGF0dGFjaG1lbnRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGaWxlc1RvRkQoa2V5LCBhdHRhY2htZW50VmFsdWUsIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKGBVbmtub3duIHZhbHVlICR7ZGF0YVtrZXldfSB3aXRoIHR5cGUgJHt0eXBlb2YgZGF0YVtrZXldfSBmb3IgcHJvcGVydHkgXCIke2tleX1cImAsIGBUaGUga2V5IFwiJHtrZXl9XCIgc2hvdWxkIGhhdmUgdHlwZSBvZiBCdWZmZXIsIFN0cmVhbSwgRmlsZSwgb3IgU3RyaW5nIGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ21lc3NhZ2UnKSB7IC8vIG1pbWUgbWVzc2FnZVxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VWYWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoIW1lc3NhZ2VWYWx1ZSB8fCAhdGhpcy5pc01JTUUobWVzc2FnZVZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKGBVbmtub3duIGRhdGEgdHlwZSBmb3IgXCIke2tleX1cIiBwcm9wZXJ0eWAsICdUaGUgbWltZSBkYXRhIHNob3VsZCBoYXZlIHR5cGUgb2YgQnVmZmVyLCBTdHJpbmcgb3IgQmxvYicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFkZE1pbWVEYXRhVG9GRChrZXksIG1lc3NhZ2VWYWx1ZSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWRkQ29tbW9uUHJvcGVydHlUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgIH0sIG5ldyB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IoKSk7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YTtcbiAgICB9XG4gICAgYWRkTWltZURhdGFUb0ZEKGtleSwgZGF0YSwgZm9ybURhdGFJbnN0YW5jZSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7IC8vIGlmIHN0cmluZyBvbmx5IHR3byBwYXJhbWV0ZXJzIHNob3VsZCBiZSB1c2VkLlxuICAgICAgICAgICAgZm9ybURhdGFJbnN0YW5jZS5hcHBlbmQoa2V5LCBkYXRhKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YUluc3RhbmNlKSkgeyAvLyBmb3JtLWRhdGEgcGFja2FnZSBpcyB1c2VkXG4gICAgICAgICAgICBjb25zdCBub2RlRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlO1xuICAgICAgICAgICAgbm9kZUZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGEsIHsgZmlsZW5hbWU6ICdNaW1lTWVzc2FnZScgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBCbG9iICE9PSB1bmRlZmluZWQpIHsgLy8gZWl0aGVyIG5vZGUgPiAxOCBvciBicm93c2VyXG4gICAgICAgICAgICBjb25zdCBicm93c2VyRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlOyAvLyBCcm93c2VyIGNvbXBsaWFudCBGb3JtRGF0YVxuICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICAgICAgYnJvd3NlckZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGEsICdNaW1lTWVzc2FnZScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihkYXRhKSkgeyAvLyBub2RlIGVudmlyb25tZW50XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvYkluc3RhbmNlID0gbmV3IEJsb2IoW2RhdGFdKTtcbiAgICAgICAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgYmxvYkluc3RhbmNlLCAnTWltZU1lc3NhZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpc01JTUUoZGF0YSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGRhdGEgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoZGF0YSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2YgUmVhZGFibGVTdHJlYW0gIT09ICd1bmRlZmluZWQnICYmIGRhdGEgaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbSk7XG4gICAgfVxuICAgIGlzRm9ybURhdGFQYWNrYWdlKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbiAgICAgICAgICAgICYmIG9iaiAhPT0gbnVsbFxuICAgICAgICAgICAgJiYgdHlwZW9mIG9iai5nZXRIZWFkZXJzID09PSAnZnVuY3Rpb24nO1xuICAgIH1cbiAgICBpc01lc3NhZ2VBdHRhY2htZW50KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNDdXN0b21GaWxlKHZhbHVlKVxuICAgICAgICAgICAgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgfHwgKHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpXG4gICAgICAgICAgICB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQmxvYilcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKHZhbHVlKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0odmFsdWUpXG4gICAgICAgICAgICB8fCAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUuZXZlcnkoKGl0ZW0pID0+IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQ3VzdG9tRmlsZShpdGVtKVxuICAgICAgICAgICAgICAgIHx8ICh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSBpbnN0YW5jZW9mIEZpbGUpXG4gICAgICAgICAgICAgICAgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoaXRlbSlcbiAgICAgICAgICAgICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShpdGVtKSkpKTtcbiAgICB9XG4gICAgYWRkRmlsZXNUb0ZEKHByb3BlcnR5TmFtZSwgdmFsdWUsIGZvcm1EYXRhSW5zdGFuY2UpIHtcbiAgICAgICAgY29uc3QgYXBwZW5kRmlsZVRvRkQgPSAob3JpZ2luYWxLZXksIGF0dGFjaG1lbnQsIGZvcm1EYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBvcmlnaW5hbEtleSA9PT0gJ211bHRpcGxlVmFsaWRhdGlvbkZpbGUnID8gJ2ZpbGUnIDogb3JpZ2luYWxLZXk7XG4gICAgICAgICAgICBjb25zdCBvYmpEYXRhID0gdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuY29udmVydFRvRkRleHBlY3RlZFNoYXBlKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmdldEF0dGFjaG1lbnRJbmZvKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNGb3JtRGF0YVBhY2thZ2UoZm9ybURhdGEpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmQgPSBmb3JtRGF0YTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gdHlwZW9mIG9iakRhdGEgPT09ICdzdHJpbmcnID8gQnVmZmVyLmZyb20ob2JqRGF0YSkgOiBvYmpEYXRhO1xuICAgICAgICAgICAgICAgIGZkLmFwcGVuZChrZXksIGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkKSB7IC8vIGVpdGhlciBub2RlID4gMTggb3IgYnJvd3NlclxuICAgICAgICAgICAgICAgIGNvbnN0IGJyb3dzZXJGb3JtRGF0YSA9IGZvcm1EYXRhSW5zdGFuY2U7IC8vIEJyb3dzZXIgY29tcGxpYW50IEZvcm1EYXRhXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpEYXRhID09PSAnc3RyaW5nJyB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihvYmpEYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9iSW5zdGFuY2UgPSBuZXcgQmxvYihbb2JqRGF0YV0pO1xuICAgICAgICAgICAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgYmxvYkluc3RhbmNlLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob2JqRGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJvd3NlckZvcm1EYXRhLmFwcGVuZChrZXksIG9iakRhdGEsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShvYmpEYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9iID0gdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuZ2V0QmxvYkZyb21TdHJlYW0ob2JqRGF0YSwgb3B0aW9ucy5rbm93bkxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5zZXQoa2V5LCBibG9iLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgaXRlbSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgdmFsdWUsIGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZENvbW1vblByb3BlcnR5VG9GRChrZXksIHZhbHVlLCBmb3JtRGF0YUFjYykge1xuICAgICAgICBjb25zdCBhZGRWYWx1ZUJhc2VkT25GRCA9IChmZEtleSwgZmRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNGb3JtRGF0YVBhY2thZ2UoZm9ybURhdGFBY2MpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmZFZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSByZWNlaXZlZCB2YWx1ZSBpcyBhbiBvYmplY3QuIFxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ1wiSlNPTi5TdHJpbmdpZnlcIiB3aWxsIGJlIHVzZWQgdG8gYXZvaWQgVHlwZUVycm9yIFxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ1RvIHJlbW92ZSB0aGlzIHdhcm5pbmc6IFxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ0NvbnNpZGVyIHN3aXRjaGluZyB0byBidWlsdC1pbiBGb3JtRGF0YSBvciBjb252ZXJ0aW5nIHRoZSB2YWx1ZSBvbiB5b3VyIG93bi5cXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgSlNPTi5zdHJpbmdpZnkoZmRWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBmZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmRWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBmZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkICYmIGZkVmFsdWUgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgZmRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdVbmtub3duIHZhbHVlIHR5cGUgZm9yIEZvcm0gRGF0YS4gU3RyaW5nIG9yIEJsb2IgZXhwZWN0ZWQnLCAnQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGEgYWxsb3dzIG9ubHkgc3RyaW5nIG9yIEJsb2IgdmFsdWVzIGZvciBwcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBhdHRhY2htZW50cy4nKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgYWRkVmFsdWVCYXNlZE9uRkQoa2V5LCBpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFkZFZhbHVlQmFzZWRPbkZEKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybURhdGFCdWlsZGVyO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ViYWNjb3VudHNDbGllbnQge1xuICAgIHJlcXVlc3Q7XG4gICAgc3RhdGljIFNVQkFDQ09VTlRfSEVBREVSID0gJ1gtTWFpbGd1bi1Pbi1CZWhhbGYtT2YnO1xuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgbGlzdChxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3Y1L2FjY291bnRzL3N1YmFjY291bnRzJywgcXVlcnkpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gICAgfVxuICAgIGdldChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3Y1L2FjY291bnRzL3N1YmFjY291bnRzLyR7aWR9YClcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5ib2R5KTtcbiAgICB9XG4gICAgY3JlYXRlKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMnLCB7IG5hbWUgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5ib2R5KTtcbiAgICB9XG4gICAgZW5hYmxlKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChgL3Y1L2FjY291bnRzL3N1YmFjY291bnRzLyR7aWR9L2VuYWJsZWApXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gICAgfVxuICAgIGRpc2FibGUoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KGAvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMvJHtpZH0vZGlzYWJsZWApXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gJ2Jhc2UtNjQnO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IGF4aW9zLCB7IEF4aW9zSGVhZGVycywgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvci5qcyc7XG5pbXBvcnQgRm9ybURhdGFCdWlsZGVyIGZyb20gJy4vRm9ybURhdGFCdWlsZGVyLmpzJztcbmltcG9ydCBTdWJhY2NvdW50c0NsaWVudCBmcm9tICcuLi9TdWJhY2NvdW50cy5qcyc7XG5jbGFzcyBSZXF1ZXN0IHtcbiAgICB1c2VybmFtZTtcbiAgICBrZXk7XG4gICAgdXJsO1xuICAgIHRpbWVvdXQ7XG4gICAgaGVhZGVycztcbiAgICBmb3JtRGF0YUJ1aWxkZXI7XG4gICAgbWF4Qm9keUxlbmd0aDtcbiAgICBwcm94eTtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zLCBmb3JtRGF0YSkge1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gb3B0aW9ucy51c2VybmFtZTtcbiAgICAgICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICAgICAgdGhpcy51cmwgPSBvcHRpb25zLnVybDtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0O1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLm1ha2VIZWFkZXJzRnJvbU9iamVjdChvcHRpb25zLmhlYWRlcnMpO1xuICAgICAgICB0aGlzLmZvcm1EYXRhQnVpbGRlciA9IG5ldyBGb3JtRGF0YUJ1aWxkZXIoZm9ybURhdGEpO1xuICAgICAgICB0aGlzLm1heEJvZHlMZW5ndGggPSA1MjQyODgwMDsgLy8gNTAgTUJcbiAgICAgICAgdGhpcy5wcm94eSA9IG9wdGlvbnM/LnByb3h5O1xuICAgIH1cbiAgICBhc3luYyByZXF1ZXN0KG1ldGhvZCwgdXJsLCBvbkNhbGxPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IC4uLm9uQ2FsbE9wdGlvbnMgfTtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnM/LmhlYWRlcnM7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gdGhpcy5qb2luQW5kVHJhbnNmb3JtSGVhZGVycyhvbkNhbGxPcHRpb25zKTtcbiAgICAgICAgY29uc3QgcGFyYW1zID0geyAuLi5vcHRpb25zIH07XG4gICAgICAgIGlmIChvcHRpb25zPy5xdWVyeSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvcHRpb25zPy5xdWVyeSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcGFyYW1zLnBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeSk7XG4gICAgICAgICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zPy5ib2R5KSB7XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gb3B0aW9ucz8uYm9keTtcbiAgICAgICAgICAgIHBhcmFtcy5kYXRhID0gYm9keTtcbiAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMuYm9keTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzcG9uc2U7XG4gICAgICAgIGNvbnN0IHVybFZhbHVlID0gdXJsam9pbih0aGlzLnVybCwgdXJsKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QudG9Mb2NhbGVVcHBlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmxWYWx1ZSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICAgICAgICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgICAgICAgICAgbWF4Qm9keUxlbmd0aDogdGhpcy5tYXhCb2R5TGVuZ3RoLFxuICAgICAgICAgICAgICAgIHByb3h5OiB0aGlzLnByb3h5LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IGVycjtcbiAgICAgICAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uc3RhdHVzIHx8IDQwMCxcbiAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uc3RhdHVzVGV4dCB8fCBlcnJvclJlc3BvbnNlLmNvZGUsXG4gICAgICAgICAgICAgICAgYm9keTogZXJyb3JSZXNwb25zZT8ucmVzcG9uc2U/LmRhdGEgfHwgZXJyb3JSZXNwb25zZS5tZXNzYWdlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmdldFJlc3BvbnNlQm9keShyZXNwb25zZSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGFzeW5jIGdldFJlc3BvbnNlQm9keShyZXNwb25zZSkge1xuICAgICAgICBjb25zdCByZXMgPSB7XG4gICAgICAgICAgICBib2R5OiB7fSxcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2U/LnN0YXR1c1xuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YSA9PT0gJ01haWxndW4gTWFnbmlmaWNlbnQgQVBJJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiAnSW5jb3JyZWN0IHVybCcsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcy5ib2R5ID0ge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXMuYm9keSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgam9pbkFuZFRyYW5zZm9ybUhlYWRlcnMob25DYWxsT3B0aW9ucykge1xuICAgICAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IG5ldyBBeGlvc0hlYWRlcnMoKTtcbiAgICAgICAgY29uc3QgYmFzaWMgPSBiYXNlNjQuZW5jb2RlKGAke3RoaXMudXNlcm5hbWV9OiR7dGhpcy5rZXl9YCk7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzLnNldEF1dGhvcml6YXRpb24oYEJhc2ljICR7YmFzaWN9YCk7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzLnNldCh0aGlzLmhlYWRlcnMpO1xuICAgICAgICBjb25zdCByZWNlaXZlZE9uQ2FsbEhlYWRlcnMgPSBvbkNhbGxPcHRpb25zICYmIG9uQ2FsbE9wdGlvbnMuaGVhZGVycztcbiAgICAgICAgY29uc3Qgb25DYWxsSGVhZGVycyA9IHRoaXMubWFrZUhlYWRlcnNGcm9tT2JqZWN0KHJlY2VpdmVkT25DYWxsSGVhZGVycyk7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzLnNldChvbkNhbGxIZWFkZXJzKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RIZWFkZXJzO1xuICAgIH1cbiAgICBtYWtlSGVhZGVyc0Zyb21PYmplY3QoaGVhZGVyc09iamVjdCA9IHt9KSB7XG4gICAgICAgIGxldCByZXF1ZXN0SGVhZGVycyA9IG5ldyBBeGlvc0hlYWRlcnMoKTtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnMgPSBPYmplY3QuZW50cmllcyhoZWFkZXJzT2JqZWN0KS5yZWR1Y2UoKGhlYWRlcnNBY2N1bXVsYXRvciwgY3VycmVudFBhaXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGN1cnJlbnRQYWlyO1xuICAgICAgICAgICAgaGVhZGVyc0FjY3VtdWxhdG9yLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJzQWNjdW11bGF0b3I7XG4gICAgICAgIH0sIHJlcXVlc3RIZWFkZXJzKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RIZWFkZXJzO1xuICAgIH1cbiAgICBzZXRTdWJhY2NvdW50SGVhZGVyKHN1YmFjY291bnRJZCkge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3Qoe1xuICAgICAgICAgICAgLi4udGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgW1N1YmFjY291bnRzQ2xpZW50LlNVQkFDQ09VTlRfSEVBREVSXTogc3ViYWNjb3VudElkXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KGhlYWRlcnMpO1xuICAgIH1cbiAgICByZXNldFN1YmFjY291bnRIZWFkZXIoKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5kZWxldGUoU3ViYWNjb3VudHNDbGllbnQuU1VCQUNDT1VOVF9IRUFERVIpO1xuICAgIH1cbiAgICBxdWVyeShtZXRob2QsIHVybCwgcXVlcnksIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgeyBxdWVyeSwgLi4ub3B0aW9ucyB9KTtcbiAgICB9XG4gICAgY29tbWFuZChtZXRob2QsIHVybCwgZGF0YSwgb3B0aW9ucywgYWRkRGVmYXVsdEhlYWRlcnMgPSB0cnVlKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0ge307XG4gICAgICAgIGlmIChhZGREZWZhdWx0SGVhZGVycykge1xuICAgICAgICAgICAgaGVhZGVycyA9IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi5oZWFkZXJzLFxuICAgICAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgICAgIC4uLm9wdGlvbnNcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgcmVxdWVzdE9wdGlvbnMpO1xuICAgIH1cbiAgICBnZXQodXJsLCBxdWVyeSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeSgnZ2V0JywgdXJsLCBxdWVyeSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHBvc3QodXJsLCBkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBwb3N0V2l0aEZEKHVybCwgZGF0YSkge1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgICBwdXRXaXRoRkQodXJsLCBkYXRhKSB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG4gICAgcGF0Y2hXaXRoRkQodXJsLCBkYXRhKSB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3BhdGNoJywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cbiAgICBwdXQodXJsLCBkYXRhLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGRlbGV0ZSh1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZCgnZGVsZXRlJywgdXJsLCBkYXRhKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW4ge1xuICAgIG5hbWU7XG4gICAgcmVxdWlyZV90bHM7XG4gICAgc2tpcF92ZXJpZmljYXRpb247XG4gICAgc3RhdGU7XG4gICAgd2lsZGNhcmQ7XG4gICAgc3BhbV9hY3Rpb247XG4gICAgY3JlYXRlZF9hdDtcbiAgICBzbXRwX3Bhc3N3b3JkO1xuICAgIHNtdHBfbG9naW47XG4gICAgdHlwZTtcbiAgICByZWNlaXZpbmdfZG5zX3JlY29yZHM7XG4gICAgc2VuZGluZ19kbnNfcmVjb3JkcztcbiAgICBpZDtcbiAgICBpc19kaXNhYmxlZDtcbiAgICB3ZWJfcHJlZml4O1xuICAgIHdlYl9zY2hlbWU7XG4gICAgdXNlX2F1dG9tYXRpY19zZW5kZXJfc2VjdXJpdHk7XG4gICAgZGtpbV9ob3N0O1xuICAgIG1haWxmcm9tX2hvc3Q7XG4gICAgY29uc3RydWN0b3IoZGF0YSwgcmVjZWl2aW5nLCBzZW5kaW5nKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgdGhpcy5yZXF1aXJlX3RscyA9IGRhdGEucmVxdWlyZV90bHM7XG4gICAgICAgIHRoaXMuc2tpcF92ZXJpZmljYXRpb24gPSBkYXRhLnNraXBfdmVyaWZpY2F0aW9uO1xuICAgICAgICB0aGlzLnN0YXRlID0gZGF0YS5zdGF0ZTtcbiAgICAgICAgdGhpcy53aWxkY2FyZCA9IGRhdGEud2lsZGNhcmQ7XG4gICAgICAgIHRoaXMuc3BhbV9hY3Rpb24gPSBkYXRhLnNwYW1fYWN0aW9uO1xuICAgICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgICAgICB0aGlzLnNtdHBfcGFzc3dvcmQgPSBkYXRhLnNtdHBfcGFzc3dvcmQ7XG4gICAgICAgIHRoaXMuc210cF9sb2dpbiA9IGRhdGEuc210cF9sb2dpbjtcbiAgICAgICAgdGhpcy50eXBlID0gZGF0YS50eXBlO1xuICAgICAgICB0aGlzLnJlY2VpdmluZ19kbnNfcmVjb3JkcyA9IHJlY2VpdmluZyB8fCBudWxsO1xuICAgICAgICB0aGlzLnNlbmRpbmdfZG5zX3JlY29yZHMgPSBzZW5kaW5nIHx8IG51bGw7XG4gICAgICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgICAgICB0aGlzLmlzX2Rpc2FibGVkID0gZGF0YS5pc19kaXNhYmxlZDtcbiAgICAgICAgdGhpcy53ZWJfcHJlZml4ID0gZGF0YS53ZWJfcHJlZml4O1xuICAgICAgICB0aGlzLndlYl9zY2hlbWUgPSBkYXRhLndlYl9zY2hlbWU7XG4gICAgICAgIHRoaXMudXNlX2F1dG9tYXRpY19zZW5kZXJfc2VjdXJpdHkgPSBkYXRhLnVzZV9hdXRvbWF0aWNfc2VuZGVyX3NlY3VyaXR5O1xuICAgICAgICAvKlxuICAgICAgICAgIGRvbWFpbiBnZXQgYW5kIHVwZGF0ZSBtZXRob2RzIG1heSBoYXZlIHJpY2hlciByZXNwb25zZSB0aGFuIGNyZWF0ZSBtZXRob2QuXG4gICAgICAgICovXG4gICAgICAgIGNvbnN0IGR5bmFtaWNLZXlzID0gWydka2ltX2hvc3QnLCAnbWFpbGZyb21faG9zdCddO1xuICAgICAgICBjb25zdCBkeW5hbWljUHJvcGVydGllcyA9IGR5bmFtaWNLZXlzLnJlZHVjZSgoYWNjLCBwcm9wZXJ0eU5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhW3Byb3BlcnR5TmFtZV0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wID0gcHJvcGVydHlOYW1lO1xuICAgICAgICAgICAgICAgIGFjY1twcm9wXSA9IGRhdGFbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkeW5hbWljUHJvcGVydGllcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvci5qcyc7XG5pbXBvcnQgRG9tYWluIGZyb20gJy4vZG9tYWluLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbnNDbGllbnQge1xuICAgIHJlcXVlc3Q7XG4gICAgZG9tYWluQ3JlZGVudGlhbHM7XG4gICAgZG9tYWluVGVtcGxhdGVzO1xuICAgIGRvbWFpblRhZ3M7XG4gICAgZG9tYWluVHJhY2tpbmc7XG4gICAgbG9nZ2VyO1xuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3QsIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LCBkb21haW5UZW1wbGF0ZXNDbGllbnQsIGRvbWFpblRhZ3NDbGllbnQsIGRvbWFpblRyYWNraW5nLCBsb2dnZXIgPSBjb25zb2xlKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMuZG9tYWluQ3JlZGVudGlhbHMgPSBkb21haW5DcmVkZW50aWFsc0NsaWVudDtcbiAgICAgICAgdGhpcy5kb21haW5UZW1wbGF0ZXMgPSBkb21haW5UZW1wbGF0ZXNDbGllbnQ7XG4gICAgICAgIHRoaXMuZG9tYWluVGFncyA9IGRvbWFpblRhZ3NDbGllbnQ7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICB0aGlzLmRvbWFpblRyYWNraW5nID0gZG9tYWluVHJhY2tpbmc7XG4gICAgfVxuICAgIF9oYW5kbGVCb29sVmFsdWVzKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcHJvcHNGb3JSZXBsYWNlbWVudCA9IGRhdGE7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VkUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wc0ZvclJlcGxhY2VtZW50KS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9wID0ga2V5O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF07XG4gICAgICAgICAgICAgICAgYWNjW3Byb3BdID0gKHZhbHVlLnRvU3RyaW5nKCkgPT09ICd0cnVlJykgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgICAgICByZXR1cm4geyAuLi5kYXRhLCAuLi5yZXBsYWNlZFByb3BzIH07XG4gICAgfVxuICAgIF9wYXJzZU1lc3NhZ2UocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gICAgfVxuICAgIHBhcnNlRG9tYWluTGlzdChyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UuYm9keSAmJiByZXNwb25zZS5ib2R5Lml0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbWFpbihpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgX3BhcnNlRG9tYWluKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9tYWluKHJlc3BvbnNlLmJvZHkuZG9tYWluLCByZXNwb25zZS5ib2R5LnJlY2VpdmluZ19kbnNfcmVjb3JkcywgcmVzcG9uc2UuYm9keS5zZW5kaW5nX2Ruc19yZWNvcmRzKTtcbiAgICB9XG4gICAgbGlzdChxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2RvbWFpbnMnLCBxdWVyeSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHRoaXMucGFyc2VEb21haW5MaXN0KHJlcykpO1xuICAgIH1cbiAgICBnZXQoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICBjb25zdCBwcmVwYXJlZFF1ZXJ5ID0gcXVlcnkgPyB7XG4gICAgICAgICAgICAnaDpleHRlbmRlZCc6IHF1ZXJ5Py5leHRlbmRlZCA/PyBmYWxzZSxcbiAgICAgICAgICAgICdoOndpdGhfZG5zJzogcXVlcnk/LndpdGhfZG5zID8/IHRydWUsXG4gICAgICAgIH0gOiB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92NC9kb21haW5zLyR7ZG9tYWlufWAsIHByZXBhcmVkUXVlcnkpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMpKTtcbiAgICB9XG4gICAgY3JlYXRlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcG9zdE9iaiA9IHRoaXMuX2hhbmRsZUJvb2xWYWx1ZXMoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3Y0L2RvbWFpbnMnLCBwb3N0T2JqKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzKSk7XG4gICAgfVxuICAgIHVwZGF0ZShkb21haW4sIGRhdGEpIHtcbiAgICAgICAgY29uc3QgcHV0RGF0YSA9IHRoaXMuX2hhbmRsZUJvb2xWYWx1ZXMoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAvdjQvZG9tYWlucy8ke2RvbWFpbn1gLCBwdXREYXRhKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzKSk7XG4gICAgfVxuICAgIHZlcmlmeShkb21haW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92NC9kb21haW5zLyR7ZG9tYWlufS92ZXJpZnlgKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzKSk7XG4gICAgfVxuICAgIGRlc3Ryb3koZG9tYWluKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gdGhpcy5fcGFyc2VNZXNzYWdlKHJlcykpO1xuICAgIH1cbiAgICBnZXRDb25uZWN0aW9uKGRvbWFpbikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL2RvbWFpbnMvJHtkb21haW59L2Nvbm5lY3Rpb25gKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICAgIH1cbiAgICB1cGRhdGVDb25uZWN0aW9uKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2Nvbm5lY3Rpb25gLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICAgIH1cbiAgICAvLyBUcmFja2luZ1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgJ2RvbWFpbnMuZ2V0VHJhY2tpbmcnIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkLlxuICAgICogUGxlYXNlIHVzZSAnZG9tYWlucy5kb21haW5UcmFja2luZy5nZXRUcmFja2luZycgaW5zdGVhZC5cbiAgICAqL1xuICAgIGdldFRyYWNraW5nKGRvbWFpbikge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBcbiAgICAgICdkb21haW5zLmdldFRyYWNraW5nJyBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSAnZG9tYWlucy5kb21haW5UcmFja2luZy5nZXRUcmFja2luZycgaW5zdGVhZC5cbiAgICBgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tYWluVHJhY2tpbmcuZ2V0VHJhY2tpbmcoZG9tYWluKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCAnZG9tYWlucy51cGRhdGVUcmFja2luZycgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQuXG4gICAgKiBQbGVhc2UgdXNlICdkb21haW5zLmRvbWFpblRyYWNraW5nLnVwZGF0ZVRyYWNraW5nJyBpbnN0ZWFkLlxuICAgICovXG4gICAgdXBkYXRlVHJhY2tpbmcoZG9tYWluLCB0eXBlLCBkYXRhKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYFxuICAgICAgJ2RvbWFpbnMudXBkYXRlVHJhY2tpbmcnIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlICdkb21haW5zLmRvbWFpblRyYWNraW5nLnVwZGF0ZVRyYWNraW5nJyBpbnN0ZWFkLlxuICAgIGApO1xuICAgICAgICByZXR1cm4gdGhpcy5kb21haW5UcmFja2luZy51cGRhdGVUcmFja2luZyhkb21haW4sIHR5cGUsIGRhdGEpO1xuICAgIH1cbiAgICAvLyBJUHNcbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkIFwiZG9tYWlucy5nZXRJcHNcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLlxuICAgICovXG4gICAgZ2V0SXBzKGRvbWFpbikge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMuZ2V0SXBzXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZT8uYm9keT8uaXRlbXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkIFwiZG9tYWlucy5hc3NpZ25JcFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICAgKi9cbiAgICBhc3NpZ25JcChkb21haW4sIGlwKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy5hc3NpZ25JcFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgaXAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLmRlbGV0ZUlwXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIG1vdmVkIHRvIHRoZSBJcHNDbGllbnQuXG4gICAgKi9cbiAgICBkZWxldGVJcChkb21haW4sIGlwKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy5kZWxldGVJcFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIG1vdmVkIGludG8gdGhlIElwc0NsaWVudCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsIGlwKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLmxpbmtJcFBvb2xcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZFxuICAgICogaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy5cbiAgICAqL1xuICAgIGxpbmtJcFBvb2woZG9tYWluLCBwb29sSWQpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLmxpbmtJcFBvb2xcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBwb29sX2lkOiBwb29sSWQgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLnVubGlua0lwUG9sbFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSBtb3ZlZCBpbnRvIHRoZSBJcHNDbGllbnRcbiAgICAqIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICAgKi9cbiAgICB1bmxpbmtJcFBvbGwoZG9tYWluLCByZXBsYWNlbWVudCkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMudW5saW5rSXBQb2xsXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIG1vdmVkIGludG8gdGhlIElwc0NsaWVudCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICBsZXQgc2VhcmNoUGFyYW1zID0gJyc7XG4gICAgICAgIGlmIChyZXBsYWNlbWVudC5wb29sX2lkICYmIHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdUb28gbXVjaCBkYXRhIGZvciByZXBsYWNlbWVudCcsICdQbGVhc2Ugc3BlY2lmeSBlaXRoZXIgcG9vbF9pZCBvciBpcCAobm90IGJvdGgpJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zID0gYD9wb29sX2lkPSR7cmVwbGFjZW1lbnQucG9vbF9pZH1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMgPSBgP2lwPSR7cmVwbGFjZW1lbnQuaXB9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsICdpcF9wb29sJywgc2VhcmNoUGFyYW1zKSk7XG4gICAgfVxuICAgIHVwZGF0ZURLSU1BdXRob3JpdHkoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vZGtpbV9hdXRob3JpdHlgLCB7fSwgeyBxdWVyeTogYHNlbGY9JHtkYXRhLnNlbGZ9YCB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICAgIH1cbiAgICBhc3luYyB1cGRhdGVES0lNU2VsZWN0b3IoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX3NlbGVjdG9yYCwge30sIHsgcXVlcnk6IGBka2ltX3NlbGVjdG9yPSR7ZGF0YS5ka2ltU2VsZWN0b3J9YCB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1cyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlcz8uYm9keT8ubWVzc2FnZVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkIFwiZG9tYWlucy51cGRhdGVXZWJQcmVmaXhcIiBtZXRob2QgaXMgZGVwcmVjYXRlZC5cbiAgICAqIFBsZWFzZSB1c2UgZG9tYWlucy51cGRhdGUgdG8gc2V0IG5ldyBcIndlYl9wcmVmaXhcIi5cbiAgICAqIEN1cnJlbnQgbWV0aG9kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLlxuICAgICovXG4gICAgdXBkYXRlV2ViUHJlZml4KGRvbWFpbiwgZGF0YSkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMudXBkYXRlV2ViUHJlZml4XCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgZG9tYWlucy51cGRhdGUgdG8gc2V0IG5ldyBcIndlYl9wcmVmaXhcIi4gQ3VycmVudCBtZXRob2Qgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vd2ViX3ByZWZpeGAsIHt9LCB7IHF1ZXJ5OiBgd2ViX3ByZWZpeD0ke2RhdGEud2ViUHJlZml4fWAgfSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3IuanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdGlvblRocnVQYWdlcyB7XG4gICAgcmVxdWVzdDtcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0KSB7XG4gICAgICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhcnNlUGFnZShpZCwgcGFnZVVybCwgdXJsU2VwYXJhdG9yLCBpdGVyYXRvck5hbWUpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVXJsID0gbmV3IFVSTChwYWdlVXJsKTtcbiAgICAgICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IHBhcnNlZFVybDtcbiAgICAgICAgY29uc3QgcGFnZVZhbHVlID0gcGFnZVVybCAmJiB0eXBlb2YgcGFnZVVybCA9PT0gJ3N0cmluZycgPyBwYWdlVXJsLnNwbGl0KHVybFNlcGFyYXRvcikucG9wKCkgfHwgJycgOiAnJztcbiAgICAgICAgbGV0IGl0ZXJhdG9yUG9zaXRpb24gPSBudWxsO1xuICAgICAgICBpZiAoaXRlcmF0b3JOYW1lKSB7XG4gICAgICAgICAgICBpdGVyYXRvclBvc2l0aW9uID0gc2VhcmNoUGFyYW1zLmhhcyhpdGVyYXRvck5hbWUpXG4gICAgICAgICAgICAgICAgPyBzZWFyY2hQYXJhbXMuZ2V0KGl0ZXJhdG9yTmFtZSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBwYWdlOiB1cmxTZXBhcmF0b3IgPT09ICc/JyA/IGA/JHtwYWdlVmFsdWV9YCA6IHBhZ2VWYWx1ZSxcbiAgICAgICAgICAgIGl0ZXJhdG9yUG9zaXRpb24sXG4gICAgICAgICAgICB1cmw6IHBhZ2VVcmxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcGFyc2VQYWdlTGlua3MocmVzcG9uc2UsIHVybFNlcGFyYXRvciwgaXRlcmF0b3JOYW1lKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VzID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuYm9keS5wYWdpbmcpO1xuICAgICAgICByZXR1cm4gcGFnZXMucmVkdWNlKChhY2MsIFtpZCwgcGFnZVVybF0pID0+IHtcbiAgICAgICAgICAgIGFjY1tpZF0gPSB0aGlzLnBhcnNlUGFnZShpZCwgcGFnZVVybCwgdXJsU2VwYXJhdG9yLCBpdGVyYXRvck5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgIH1cbiAgICB1cGRhdGVVcmxBbmRRdWVyeShjbGllbnRVcmwsIHF1ZXJ5KSB7XG4gICAgICAgIGxldCB1cmwgPSBjbGllbnRVcmw7XG4gICAgICAgIGNvbnN0IHF1ZXJ5Q29weSA9IHsgLi4ucXVlcnkgfTtcbiAgICAgICAgaWYgKHF1ZXJ5Q29weS5wYWdlKSB7XG4gICAgICAgICAgICB1cmwgPSB1cmxqb2luKGNsaWVudFVybCwgcXVlcnlDb3B5LnBhZ2UpO1xuICAgICAgICAgICAgZGVsZXRlIHF1ZXJ5Q29weS5wYWdlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICB1cGRhdGVkUXVlcnk6IHF1ZXJ5Q29weVxuICAgICAgICB9O1xuICAgIH1cbiAgICBhc3luYyByZXF1ZXN0TGlzdFdpdGhQYWdlcyhjbGllbnRVcmwsIHF1ZXJ5LCBNb2RlbCkge1xuICAgICAgICBjb25zdCB7IHVybCwgdXBkYXRlZFF1ZXJ5IH0gPSB0aGlzLnVwZGF0ZVVybEFuZFF1ZXJ5KGNsaWVudFVybCwgcXVlcnkpO1xuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0KSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQodXJsLCB1cGRhdGVkUXVlcnkpO1xuICAgICAgICAgICAgLy8gTW9kZWwgaGVyZSBpcyB1c3VhbGx5IHVuZGVmaW5lZCBleGNlcHQgZm9yIFN1cHByZXNzaW9uIENsaWVudFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaXN0KHJlc3BvbnNlLCBNb2RlbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgICAgIHN0YXR1czogNTAwLFxuICAgICAgICAgICAgc3RhdHVzVGV4dDogJ1JlcXVlc3QgcHJvcGVydHkgaXMgZW1wdHknLFxuICAgICAgICAgICAgYm9keTogeyBtZXNzYWdlOiAnJyB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRDbGllbnQgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzIHtcbiAgICByZXF1ZXN0O1xuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3QpIHtcbiAgICAgICAgc3VwZXIocmVxdWVzdCk7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIHBhcnNlTGlzdChyZXNwb25zZSkge1xuICAgICAgICBjb25zdCBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJy8nKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBhc3luYyBnZXQoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKCcvdjMnLCBkb21haW4sICdldmVudHMnKSwgcXVlcnkpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQ29udGFpbmVyIHtcbiAgICBzdGFydDtcbiAgICBlbmQ7XG4gICAgcmVzb2x1dGlvbjtcbiAgICBzdGF0cztcbiAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZShkYXRhLnN0YXJ0KTtcbiAgICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZShkYXRhLmVuZCk7XG4gICAgICAgIHRoaXMucmVzb2x1dGlvbiA9IGRhdGEucmVzb2x1dGlvbjtcbiAgICAgICAgdGhpcy5zdGF0cyA9IGRhdGEuc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0KSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSB7IC4uLnN0YXQgfTtcbiAgICAgICAgICAgIHJlcy50aW1lID0gbmV3IERhdGUoc3RhdC50aW1lKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBTdGF0c0NvbnRhaW5lciBmcm9tICcuL1N0YXRzQ29udGFpbmVyLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQ2xpZW50IHtcbiAgICByZXF1ZXN0O1xuICAgIGxvZ2dlcjtcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0LCBsb2dnZXIgPSBjb25zb2xlKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cbiAgICBjb252ZXJ0RGF0ZVRvVVRDKGtleSwgaW5wdXREYXRlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgQmVjYXVzZSBcIm5ldyBEYXRlKCcyMDIyLTEyLTI1VDAwOjAwOjAwLjAwMFonKVwiIGJlY29tZXMgXCJTdW4gRGVjIDI1IDIwMjIgMDI6MDA6MDAgR01UKzAyMDBcIlxuICAgICAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgICAgICBleDogJ1RodSwgMTMgT2N0IDIwMTEgMTg6MDI6MDAgKzAwMDAnLlxuICAgICAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBEYXRlOlwiJHtpbnB1dERhdGV9XCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXG5WYWx1ZSBcIiR7aW5wdXREYXRlLnRvVVRDU3RyaW5nKCl9XCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nYCk7XG4gICAgICAgIHJldHVybiBba2V5LCBpbnB1dERhdGUudG9VVENTdHJpbmcoKV07XG4gICAgfVxuICAgIHByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpIHtcbiAgICAgICAgbGV0IHNlYXJjaFBhcmFtcyA9IFtdO1xuICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMgPSBPYmplY3QuZW50cmllcyhxdWVyeSkucmVkdWNlKChhcnJheVdpdGhQYWlycywgY3VycmVudFBhaXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBjdXJyZW50UGFpcjtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoKSB7IC8vIGV2ZW50OiBbJ2RlbGl2ZXJlZCcsICdhY2NlcHRlZCddXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcGVhdGVkUHJvcGVydHkgPSB2YWx1ZS5tYXAoKGl0ZW0pID0+IFtrZXksIGl0ZW1dKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5hcnJheVdpdGhQYWlycywgLi4ucmVwZWF0ZWRQcm9wZXJ0eV07IC8vIFtbZXZlbnQsZGVsaXZlcmVkXSwgW2V2ZW50LGFjY2VwdGVkXV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKHRoaXMuY29udmVydERhdGVUb1VUQyhrZXksIHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheVdpdGhQYWlycztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlXaXRoUGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlXaXRoUGFpcnM7XG4gICAgICAgICAgICB9LCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlYXJjaFBhcmFtcztcbiAgICB9XG4gICAgcGFyc2VTdGF0cyhyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gbmV3IFN0YXRzQ29udGFpbmVyKHJlc3BvbnNlLmJvZHkpO1xuICAgIH1cbiAgICBnZXREb21haW4oZG9tYWluLCBxdWVyeSkge1xuICAgICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMnLCBkb21haW4sICdzdGF0cy90b3RhbCcpLCBzZWFyY2hQYXJhbXMpXG4gICAgICAgICAgICAudGhlbih0aGlzLnBhcnNlU3RhdHMpO1xuICAgIH1cbiAgICBnZXRBY2NvdW50KHF1ZXJ5KSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvc3RhdHMvdG90YWwnLCBzZWFyY2hQYXJhbXMpXG4gICAgICAgICAgICAudGhlbih0aGlzLnBhcnNlU3RhdHMpO1xuICAgIH1cbn1cbiIsImV4cG9ydCB2YXIgUmVzb2x1dGlvbjtcbihmdW5jdGlvbiAoUmVzb2x1dGlvbikge1xuICAgIFJlc29sdXRpb25bXCJIT1VSXCJdID0gXCJob3VyXCI7XG4gICAgUmVzb2x1dGlvbltcIkRBWVwiXSA9IFwiZGF5XCI7XG4gICAgUmVzb2x1dGlvbltcIk1PTlRIXCJdID0gXCJtb250aFwiO1xufSkoUmVzb2x1dGlvbiB8fCAoUmVzb2x1dGlvbiA9IHt9KSk7XG5leHBvcnQgdmFyIFN1cHByZXNzaW9uTW9kZWxzO1xuKGZ1bmN0aW9uIChTdXBwcmVzc2lvbk1vZGVscykge1xuICAgIFN1cHByZXNzaW9uTW9kZWxzW1wiQk9VTkNFU1wiXSA9IFwiYm91bmNlc1wiO1xuICAgIFN1cHByZXNzaW9uTW9kZWxzW1wiQ09NUExBSU5UU1wiXSA9IFwiY29tcGxhaW50c1wiO1xuICAgIFN1cHByZXNzaW9uTW9kZWxzW1wiVU5TVUJTQ1JJQkVTXCJdID0gXCJ1bnN1YnNjcmliZXNcIjtcbiAgICBTdXBwcmVzc2lvbk1vZGVsc1tcIldISVRFTElTVFNcIl0gPSBcIndoaXRlbGlzdHNcIjtcbn0pKFN1cHByZXNzaW9uTW9kZWxzIHx8IChTdXBwcmVzc2lvbk1vZGVscyA9IHt9KSk7XG5leHBvcnQgdmFyIFdlYmhvb2tzSWRzO1xuKGZ1bmN0aW9uIChXZWJob29rc0lkcykge1xuICAgIFdlYmhvb2tzSWRzW1wiQ0xJQ0tFRFwiXSA9IFwiY2xpY2tlZFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiQ09NUExBSU5FRFwiXSA9IFwiY29tcGxhaW5lZFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiREVMSVZFUkVEXCJdID0gXCJkZWxpdmVyZWRcIjtcbiAgICBXZWJob29rc0lkc1tcIk9QRU5FRFwiXSA9IFwib3BlbmVkXCI7XG4gICAgV2ViaG9va3NJZHNbXCJQRVJNQU5FTlRfRkFJTFwiXSA9IFwicGVybWFuZW50X2ZhaWxcIjtcbiAgICBXZWJob29rc0lkc1tcIlRFTVBPUkFSWV9GQUlMXCJdID0gXCJ0ZW1wb3JhcnlfZmFpbFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiVU5TVUJTQ1JJQkVEXCJdID0gXCJ1bnN1YnNjcmliZVwiO1xufSkoV2ViaG9va3NJZHMgfHwgKFdlYmhvb2tzSWRzID0ge30pKTtcbmV4cG9ydCB2YXIgWWVzTm87XG4oZnVuY3Rpb24gKFllc05vKSB7XG4gICAgWWVzTm9bXCJZRVNcIl0gPSBcInllc1wiO1xuICAgIFllc05vW1wiTk9cIl0gPSBcIm5vXCI7XG59KShZZXNObyB8fCAoWWVzTm8gPSB7fSkpO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwcHJlc3Npb24ge1xuICAgIHR5cGU7XG4gICAgY29uc3RydWN0b3IodHlwZSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMvaW5kZXguanMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24uanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm91bmNlIGV4dGVuZHMgU3VwcHJlc3Npb24ge1xuICAgIGFkZHJlc3M7XG4gICAgY29kZTtcbiAgICBlcnJvcjtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICBjcmVhdGVkX2F0O1xuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuQk9VTkNFUyk7XG4gICAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgICAgdGhpcy5jb2RlID0gK2RhdGEuY29kZTtcbiAgICAgICAgdGhpcy5lcnJvciA9IGRhdGEuZXJyb3I7XG4gICAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcy9pbmRleC5qcyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbi5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wbGFpbnQgZXh0ZW5kcyBTdXBwcmVzc2lvbiB7XG4gICAgYWRkcmVzcztcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICBjcmVhdGVkX2F0O1xuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuQ09NUExBSU5UUyk7XG4gICAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zL2luZGV4LmpzJztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuc3Vic2NyaWJlIGV4dGVuZHMgU3VwcHJlc3Npb24ge1xuICAgIGFkZHJlc3M7XG4gICAgdGFncztcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICBjcmVhdGVkX2F0O1xuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuVU5TVUJTQ1JJQkVTKTtcbiAgICAgICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgICB0aGlzLnRhZ3MgPSBkYXRhLnRhZ3M7XG4gICAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcy9pbmRleC5qcyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbi5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaGl0ZUxpc3QgZXh0ZW5kcyBTdXBwcmVzc2lvbiB7XG4gICAgdmFsdWU7XG4gICAgcmVhc29uO1xuICAgIGNyZWF0ZWRBdDtcbiAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLldISVRFTElTVFMpO1xuICAgICAgICB0aGlzLnZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICAgICAgdGhpcy5yZWFzb24gPSBkYXRhLnJlYXNvbjtcbiAgICAgICAgdGhpcy5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRBdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvci5qcyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG5pbXBvcnQgQm91bmNlIGZyb20gJy4vQm91bmNlLmpzJztcbmltcG9ydCBDb21wbGFpbnQgZnJvbSAnLi9Db21wbGFpbnQuanMnO1xuaW1wb3J0IFVuc3Vic2NyaWJlIGZyb20gJy4vVW5zdWJzY3JpYmUuanMnO1xuaW1wb3J0IFdoaXRlTGlzdCBmcm9tICcuL1doaXRlTGlzdC5qcyc7XG5jb25zdCBjcmVhdGVPcHRpb25zID0ge1xuICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XG59O1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwcHJlc3Npb25DbGllbnQgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzIHtcbiAgICByZXF1ZXN0O1xuICAgIG1vZGVscztcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0KSB7XG4gICAgICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLm1vZGVscyA9IHtcbiAgICAgICAgICAgIGJvdW5jZXM6IEJvdW5jZSxcbiAgICAgICAgICAgIGNvbXBsYWludHM6IENvbXBsYWludCxcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlczogVW5zdWJzY3JpYmUsXG4gICAgICAgICAgICB3aGl0ZWxpc3RzOiBXaGl0ZUxpc3QsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHBhcnNlTGlzdChyZXNwb25zZSwgTW9kZWwpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcz8ubWFwKChpdGVtKSA9PiBuZXcgTW9kZWwoaXRlbSkpIHx8IFtdO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIF9wYXJzZUl0ZW0oZGF0YSwgTW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb2RlbChkYXRhKTtcbiAgICB9XG4gICAgY3JlYXRlV2hpdGVMaXN0KGRvbWFpbiwgZGF0YSwgaXNEYXRhQXJyYXkpIHtcbiAgICAgICAgaWYgKGlzRGF0YUFycmF5KSB7XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdEYXRhIHByb3BlcnR5IHNob3VsZCBiZSBhbiBvYmplY3QnLCAnV2hpdGVsaXN0XFwncyBjcmVhdGlvbiBwcm9jZXNzIGRvZXMgbm90IHN1cHBvcnQgbXVsdGlwbGUgY3JlYXRpb25zLiBEYXRhIHByb3BlcnR5IHNob3VsZCBiZSBhbiBvYmplY3QnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAgICAgICAucG9zdFdpdGhGRCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3doaXRlbGlzdHMnKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgICB9XG4gICAgY3JlYXRlVW5zdWJzY3JpYmUoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7IC8vIFVzZXIgcHJvdmlkZWQgYW4gYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IGlzQ29udGFpbnNUYWcgPSBkYXRhLnNvbWUoKHVuc3Vic2NyaWJlKSA9PiB1bnN1YnNjcmliZS50YWcpO1xuICAgICAgICAgICAgaWYgKGlzQ29udGFpbnNUYWcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdUYWcgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSB1c2VkIGZvciBjcmVhdGluZyBtdWx0aXBsZSB1bnN1YnNjcmliZXMuJywgJ1RhZyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCBvbmx5IGlmIG9uZSB1bnN1YnNjcmliZSBwcm92aWRlZCBhcyBzZWNvbmQgYXJndW1lbnQgb2YgY3JlYXRlIG1ldGhvZC4gUGxlYXNlIHVzZSB0YWdzIGluc3RlYWQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QodXJsam9pbigndjMnLCBkb21haW4sICd1bnN1YnNjcmliZXMnKSwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIGNyZWF0ZU9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhPy50YWdzKSB7XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdUYWdzIHByb3BlcnR5IHNob3VsZCBub3QgYmUgdXNlZCBmb3IgY3JlYXRpbmcgb25lIHVuc3Vic2NyaWJlLicsICdUYWdzIHByb3BlcnR5IGNhbiBiZSB1c2VkIGlmIHlvdSBwcm92aWRlcyBhbiBhcnJheSBvZiB1bnN1YnNjcmliZXMgYXMgc2Vjb25kIGFyZ3VtZW50IG9mIGNyZWF0ZSBtZXRob2QuIFBsZWFzZSB1c2UgdGFnIGluc3RlYWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLnRhZykpIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1RhZyBwcm9wZXJ0eSBjYW4gbm90IGJlIGFuIGFycmF5JywgJ1BsZWFzZSB1c2UgYXJyYXkgb2YgdW5zdWJzY3JpYmVzIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kIHRvIGJlIGFibGUgdG8gcHJvdmlkZSBmZXcgdGFncycpO1xuICAgICAgICB9XG4gICAgICAgIC8qIFdlIG5lZWQgRm9ybSBEYXRhIGZvciB1bnN1YnNjcmliZXMgaWYgd2Ugd2FudCB0byBzdXBwb3J0IHRoZSBcInRhZ1wiIHByb3BlcnR5ICovXG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAndW5zdWJzY3JpYmVzJyksIGRhdGEpXG4gICAgICAgICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gICAgfVxuICAgIGdldE1vZGVsKHR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUgaW4gdGhpcy5tb2RlbHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdVbmtub3duIHR5cGUgdmFsdWUnLCAnVHlwZSBtYXkgYmUgb25seSBvbmUgb2YgW2JvdW5jZXMsIGNvbXBsYWludHMsIHVuc3Vic2NyaWJlcywgd2hpdGVsaXN0c10nKTtcbiAgICB9XG4gICAgcHJlcGFyZVJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgICB0eXBlOiByZXNwb25zZS5ib2R5LnR5cGUgfHwgJycsXG4gICAgICAgICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIGxpc3QoZG9tYWluLCB0eXBlLCBxdWVyeSkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlKSwgcXVlcnksIG1vZGVsKTtcbiAgICB9XG4gICAgZ2V0KGRvbWFpbiwgdHlwZSwgYWRkcmVzcykge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgIC5nZXQodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlSXRlbShyZXNwb25zZS5ib2R5LCBtb2RlbCkpO1xuICAgIH1cbiAgICBjcmVhdGUoZG9tYWluLCB0eXBlLCBkYXRhKSB7XG4gICAgICAgIHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgICAgIC8vIHN1cHBvcnRzIGFkZGluZyBtdWx0aXBsZSBzdXBwcmVzc2lvbnMgYnkgZGVmYXVsdFxuICAgICAgICBsZXQgcG9zdERhdGE7XG4gICAgICAgIGNvbnN0IGlzRGF0YUFycmF5ID0gQXJyYXkuaXNBcnJheShkYXRhKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICd3aGl0ZWxpc3RzJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlV2hpdGVMaXN0KGRvbWFpbiwgZGF0YSwgaXNEYXRhQXJyYXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSAndW5zdWJzY3JpYmVzJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVW5zdWJzY3JpYmUoZG9tYWluLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRGF0YUFycmF5KSB7XG4gICAgICAgICAgICBwb3N0RGF0YSA9IFtkYXRhXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBvc3REYXRhID0gWy4uLmRhdGFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgIC5wb3N0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlKSwgSlNPTi5zdHJpbmdpZnkocG9zdERhdGEpLCBjcmVhdGVPcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICAgIH1cbiAgICBkZXN0cm95KGRvbWFpbiwgdHlwZSwgYWRkcmVzcykge1xuICAgICAgICB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAgICAgICAuZGVsZXRlKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiAoe1xuICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgICAgICAgdmFsdWU6IHJlc3BvbnNlLmJvZHkudmFsdWUgfHwgJycsXG4gICAgICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5ib2R5LmFkZHJlc3MgfHwgJycsXG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuZXhwb3J0IGNsYXNzIFdlYmhvb2sge1xuICAgIGlkO1xuICAgIHVybDtcbiAgICB1cmxzO1xuICAgIGNvbnN0cnVjdG9yKGlkLCB1cmwsIHVybHMpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy51cmxzID0gdXJscztcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJob29rc0NsaWVudCB7XG4gICAgcmVxdWVzdDtcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIF9wYXJzZVdlYmhvb2tMaXN0KHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5LndlYmhvb2tzO1xuICAgIH1cbiAgICBfcGFyc2VXZWJob29rV2l0aElEKGlkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHdlYmhvb2tSZXNwb25zZSA9IHJlc3BvbnNlPy5ib2R5Py53ZWJob29rO1xuICAgICAgICAgICAgbGV0IHVybCA9IHdlYmhvb2tSZXNwb25zZT8udXJsO1xuICAgICAgICAgICAgbGV0IHVybHMgPSB3ZWJob29rUmVzcG9uc2U/LnVybHM7XG4gICAgICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgICAgIHVybCA9IHVybHMgJiYgdXJscy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgPyB1cmxzWzBdXG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCghdXJscyB8fCB1cmxzLmxlbmd0aCA9PT0gMCkgJiYgdXJsKSB7XG4gICAgICAgICAgICAgICAgdXJscyA9IFt1cmxdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBXZWJob29rKGlkLCB1cmwsIHVybHMpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBfcGFyc2VXZWJob29rVGVzdChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29kZTogcmVzcG9uc2UuYm9keS5jb2RlLFxuICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgICAgIH07XG4gICAgfVxuICAgIGxpc3QoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJyksIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rTGlzdCk7XG4gICAgfVxuICAgIGdldChkb21haW4sIGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgICB9XG4gICAgY3JlYXRlKGRvbWFpbiwgaWQsIHVybCwgdGVzdCA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQsICd0ZXN0JyksIHsgdXJsIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rVGVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgeyBpZCwgdXJsIH0pXG4gICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgICB9XG4gICAgdXBkYXRlKGRvbWFpbiwgaWQsIHVybFZhbHVlcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpLCB7IHVybDogdXJsVmFsdWVzIH0pXG4gICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgICB9XG4gICAgZGVzdHJveShkb21haW4sIGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9jb21tb24vRXJyb3IuanMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZXNDbGllbnQge1xuICAgIHJlcXVlc3Q7XG4gICAgY29uc3RydWN0b3IocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBwcmVwYXJlQm9vbGVhblZhbHVlcyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IHllc05vUHJvcGVydGllcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgJ286dGVzdG1vZGUnLFxuICAgICAgICAgICAgJ3Q6dGV4dCcsXG4gICAgICAgICAgICAnbzpka2ltJyxcbiAgICAgICAgICAgICdvOnRyYWNraW5nJyxcbiAgICAgICAgICAgICdvOnRyYWNraW5nLWNsaWNrcycsXG4gICAgICAgICAgICAnbzp0cmFja2luZy1vcGVucycsXG4gICAgICAgICAgICAnbzpyZXF1aXJlLXRscycsXG4gICAgICAgICAgICAnbzpza2lwLXZlcmlmaWNhdGlvbidcbiAgICAgICAgXSk7XG4gICAgICAgIGlmICghZGF0YSB8fCBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ01lc3NhZ2UgZGF0YSBvYmplY3QgY2FuIG5vdCBiZSBlbXB0eScsICdNZXNzYWdlIGRhdGEgb2JqZWN0IGNhbiBub3QgYmUgZW1wdHknKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKHllc05vUHJvcGVydGllcy5oYXMoa2V5KSAmJiB0eXBlb2YgZGF0YVtrZXldID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGRhdGFba2V5XSA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgIH1cbiAgICBfcGFyc2VSZXNwb25zZShyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgICAgIH07XG4gICAgfVxuICAgIGNyZWF0ZShkb21haW4sIGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzLm1pbWVgLCBkYXRhKVxuICAgICAgICAgICAgICAgIC50aGVuKHRoaXMuX3BhcnNlUmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vZGlmaWVkRGF0YSA9IHRoaXMucHJlcGFyZUJvb2xlYW5WYWx1ZXMoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3YzLyR7ZG9tYWlufS9tZXNzYWdlc2AsIG1vZGlmaWVkRGF0YSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMuX3BhcnNlUmVzcG9uc2UpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlc0NsaWVudCB7XG4gICAgcmVxdWVzdDtcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIGxpc3QocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9yb3V0ZXMnLCBxdWVyeSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyk7XG4gICAgfVxuICAgIGdldChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL3JvdXRlcy8ke2lkfWApXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICAgIH1cbiAgICBjcmVhdGUoZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92My9yb3V0ZXMnLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5LnJvdXRlKTtcbiAgICB9XG4gICAgdXBkYXRlKGlkLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAvdjMvcm91dGVzLyR7aWR9YCwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gICAgfVxuICAgIGRlc3Ryb3koaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92My9yb3V0ZXMvJHtpZH1gKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWYWxpZGF0ZUNsaWVudCB7XG4gICAgbXVsdGlwbGVWYWxpZGF0aW9uO1xuICAgIHJlcXVlc3Q7XG4gICAgY29uc3RydWN0b3IocmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMubXVsdGlwbGVWYWxpZGF0aW9uID0gbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50O1xuICAgIH1cbiAgICBhc3luYyBnZXQoYWRkcmVzcykge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHsgYWRkcmVzcyB9O1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvYWRkcmVzcy92YWxpZGF0ZScsIHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5ib2R5O1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElwc0NsaWVudCB7XG4gICAgcmVxdWVzdDtcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIGFzeW5jIGxpc3QocXVlcnkpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvaXBzJywgcXVlcnkpO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0KGlwKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3YzL2lwcy8ke2lwfWApO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICB9XG4gICAgcGFyc2VJcHNSZXNwb25zZShyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJcFBvb2xzQ2xpZW50IHtcbiAgICByZXF1ZXN0O1xuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgbGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92MS9pcF9wb29scycpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHRoaXMucGFyc2VJcFBvb2xzUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YxL2lwX3Bvb2xzJywgZGF0YSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXN5bmMgdXBkYXRlKHBvb2xJZCwgZGF0YSkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wYXRjaFdpdGhGRChgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIGRlbGV0ZShwb29sSWQsIGRhdGEpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjEvaXBfcG9vbHMvJHtwb29sSWR9YCwgZGF0YSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcGFyc2VJcFBvb2xzUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxpbmdMaXN0c0NsaWVudCBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXMge1xuICAgIGJhc2VSb3V0ZTtcbiAgICByZXF1ZXN0O1xuICAgIG1lbWJlcnM7XG4gICAgY29uc3RydWN0b3IocmVxdWVzdCwgbWVtYmVycykge1xuICAgICAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgICAgICAgdGhpcy5tZW1iZXJzID0gbWVtYmVycztcbiAgICB9XG4gICAgcGFyc2VWYWxpZGF0aW9uUmVzdWx0KHN0YXR1cywgZGF0YSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdDoge1xuICAgICAgICAgICAgICAgIC4uLmRhdGEsXG4gICAgICAgICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0ICogMTAwMCkgLy8gYWRkIG1pbGxpc2Vjb25kIHRvIFVuaXggdGltZXN0YW1wXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHBhcnNlTGlzdChyZXNwb25zZSkge1xuICAgICAgICBjb25zdCBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGFzeW5jIGxpc3QocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoYCR7dGhpcy5iYXNlUm91dGV9L3BhZ2VzYCwgcXVlcnkpO1xuICAgIH1cbiAgICBnZXQobWFpbExpc3RBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QpO1xuICAgIH1cbiAgICBjcmVhdGUoZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodGhpcy5iYXNlUm91dGUsIGRhdGEpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCk7XG4gICAgfVxuICAgIHVwZGF0ZShtYWlsTGlzdEFkZHJlc3MsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWAsIGRhdGEpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCk7XG4gICAgfVxuICAgIGRlc3Ryb3kobWFpbExpc3RBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgICB9XG4gICAgdmFsaWRhdGUobWFpbExpc3RBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYCwge30pXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+ICh7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICB2YWxpZGF0aW9uUmVzdWx0KG1haWxMaXN0QWRkcmVzcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYClcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gdGhpcy5wYXJzZVZhbGlkYXRpb25SZXN1bHQocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KSk7XG4gICAgfVxuICAgIGNhbmNlbFZhbGlkYXRpb24obWFpbExpc3RBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiAoe1xuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICAgICAgfSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxMaXN0c01lbWJlcnMgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzIHtcbiAgICBiYXNlUm91dGU7XG4gICAgcmVxdWVzdDtcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0KSB7XG4gICAgICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgIH1cbiAgICBjaGVja0FuZFVwZGF0ZURhdGEoZGF0YSkge1xuICAgICAgICBjb25zdCBuZXdEYXRhID0geyAuLi5kYXRhIH07XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS52YXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgbmV3RGF0YS52YXJzID0gSlNPTi5zdHJpbmdpZnkobmV3RGF0YS52YXJzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRhdGEuc3Vic2NyaWJlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICBuZXdEYXRhLnN1YnNjcmliZWQgPSBkYXRhLnN1YnNjcmliZWQgPyAneWVzJyA6ICdubyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0RhdGE7XG4gICAgfVxuICAgIHBhcnNlTGlzdChyZXNwb25zZSkge1xuICAgICAgICBjb25zdCBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgYXN5bmMgbGlzdE1lbWJlcnMobWFpbExpc3RBZGRyZXNzLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyhgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvcGFnZXNgLCBxdWVyeSk7XG4gICAgfVxuICAgIGdldE1lbWJlcihtYWlsTGlzdEFkZHJlc3MsIG1haWxMaXN0TWVtYmVyQWRkcmVzcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YClcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIpO1xuICAgIH1cbiAgICBjcmVhdGVNZW1iZXIobWFpbExpc3RBZGRyZXNzLCBkYXRhKSB7XG4gICAgICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVyc2AsIHJlcURhdGEpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyKTtcbiAgICB9XG4gICAgY3JlYXRlTWVtYmVycyhtYWlsTGlzdEFkZHJlc3MsIGRhdGEpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IHtcbiAgICAgICAgICAgIG1lbWJlcnM6IEFycmF5LmlzQXJyYXkoZGF0YS5tZW1iZXJzKSA/IEpTT04uc3RyaW5naWZ5KGRhdGEubWVtYmVycykgOiBkYXRhLm1lbWJlcnMsXG4gICAgICAgICAgICB1cHNlcnQ6IGRhdGEudXBzZXJ0XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMuanNvbmAsIG5ld0RhdGEpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICAgIH1cbiAgICB1cGRhdGVNZW1iZXIobWFpbExpc3RBZGRyZXNzLCBtYWlsTGlzdE1lbWJlckFkZHJlc3MsIGRhdGEpIHtcbiAgICAgICAgY29uc3QgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YCwgcmVxRGF0YSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIpO1xuICAgIH1cbiAgICBkZXN0cm95TWVtYmVyKG1haWxMaXN0QWRkcmVzcywgbWFpbExpc3RNZW1iZXJBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5DcmVkZW50aWFsc0NsaWVudCB7XG4gICAgYmFzZVJvdXRlO1xuICAgIHJlcXVlc3Q7XG4gICAgY29uc3RydWN0b3IocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvZG9tYWlucy8nO1xuICAgIH1cbiAgICBfcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLFxuICAgICAgICAgICAgdG90YWxDb3VudDogcmVzcG9uc2UuYm9keS50b3RhbF9jb3VudFxuICAgICAgICB9O1xuICAgIH1cbiAgICBfcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgX3BhcnNlRGVsZXRlZFJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgICAgICAgc3BlYzogcmVzcG9uc2UuYm9keS5zcGVjXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGxpc3QoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvY3JlZGVudGlhbHMnKSwgcXVlcnkpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiB0aGlzLl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChyZXMpKTtcbiAgICB9XG4gICAgY3JlYXRlKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzYCwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHRoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcykpO1xuICAgIH1cbiAgICB1cGRhdGUoZG9tYWluLCBjcmVkZW50aWFsc0xvZ2luLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFscy8ke2NyZWRlbnRpYWxzTG9naW59YCwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHRoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcykpO1xuICAgIH1cbiAgICBkZXN0cm95KGRvbWFpbiwgY3JlZGVudGlhbHNMb2dpbikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWApXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiB0aGlzLl9wYXJzZURlbGV0ZWRSZXNwb25zZShyZXMpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG5pbXBvcnQgQXR0YWNobWVudHNIYW5kbGVyIGZyb20gJy4uL2NvbW1vbi9BdHRhY2htZW50c0hhbmRsZXIuanMnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvci5qcyc7XG5leHBvcnQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uSm9iIHtcbiAgICBjcmVhdGVkQXQ7XG4gICAgaWQ7XG4gICAgcXVhbnRpdHk7XG4gICAgcmVjb3Jkc1Byb2Nlc3NlZDtcbiAgICBzdGF0dXM7XG4gICAgZG93bmxvYWRVcmw7XG4gICAgcmVzcG9uc2VTdGF0dXNDb2RlO1xuICAgIHN1bW1hcnk7XG4gICAgY29uc3RydWN0b3IoZGF0YSwgcmVzcG9uc2VTdGF0dXNDb2RlKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSBkYXRhLnF1YW50aXR5O1xuICAgICAgICB0aGlzLnJlY29yZHNQcm9jZXNzZWQgPSBkYXRhLnJlY29yZHNfcHJvY2Vzc2VkO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RhdHVzQ29kZSA9IHJlc3BvbnNlU3RhdHVzQ29kZTtcbiAgICAgICAgaWYgKGRhdGEuZG93bmxvYWRfdXJsKSB7XG4gICAgICAgICAgICB0aGlzLmRvd25sb2FkVXJsID0ge1xuICAgICAgICAgICAgICAgIGNzdjogZGF0YS5kb3dubG9hZF91cmw/LmNzdixcbiAgICAgICAgICAgICAgICBqc29uOiBkYXRhLmRvd25sb2FkX3VybD8uanNvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5zdW1tYXJ5KSB7XG4gICAgICAgICAgICB0aGlzLnN1bW1hcnkgPSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoQWxsOiBkYXRhLnN1bW1hcnkucmVzdWx0LmNhdGNoX2FsbCxcbiAgICAgICAgICAgICAgICAgICAgZGVsaXZlcmFibGU6IGRhdGEuc3VtbWFyeS5yZXN1bHQuZGVsaXZlcmFibGUsXG4gICAgICAgICAgICAgICAgICAgIGRvTm90U2VuZDogZGF0YS5zdW1tYXJ5LnJlc3VsdC5kb19ub3Rfc2VuZCxcbiAgICAgICAgICAgICAgICAgICAgdW5kZWxpdmVyYWJsZTogZGF0YS5zdW1tYXJ5LnJlc3VsdC51bmRlbGl2ZXJhYmxlLFxuICAgICAgICAgICAgICAgICAgICB1bmtub3duOiBkYXRhLnN1bW1hcnkucmVzdWx0LnVua25vd25cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJpc2s6IHtcbiAgICAgICAgICAgICAgICAgICAgaGlnaDogZGF0YS5zdW1tYXJ5LnJpc2suaGlnaCxcbiAgICAgICAgICAgICAgICAgICAgbG93OiBkYXRhLnN1bW1hcnkucmlzay5sb3csXG4gICAgICAgICAgICAgICAgICAgIG1lZGl1bTogZGF0YS5zdW1tYXJ5LnJpc2subWVkaXVtLFxuICAgICAgICAgICAgICAgICAgICB1bmtub3duOiBkYXRhLnN1bW1hcnkucmlzay51bmtub3duXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXMge1xuICAgIHJlcXVlc3Q7XG4gICAgYXR0YWNobWVudHNIYW5kbGVyO1xuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIgPSBuZXcgQXR0YWNobWVudHNIYW5kbGVyKCk7XG4gICAgfVxuICAgIGhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIC4uLnJlc3BvbnNlPy5ib2R5XG4gICAgICAgIH07XG4gICAgfVxuICAgIHBhcnNlTGlzdChyZXNwb25zZSkge1xuICAgICAgICBjb25zdCBkYXRhID0ge307XG4gICAgICAgIGRhdGEuam9icyA9IHJlc3BvbnNlLmJvZHkuam9icy5tYXAoKGpvYikgPT4gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkpvYihqb2IsIHJlc3BvbnNlLnN0YXR1cykpO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncGl2b3QnKTtcbiAgICAgICAgZGF0YS50b3RhbCA9IHJlc3BvbnNlLmJvZHkudG90YWw7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgYXN5bmMgbGlzdChxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcygnL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsaycsIHF1ZXJ5KTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0KGxpc3RJZCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvJHtsaXN0SWR9YCk7XG4gICAgICAgIHJldHVybiBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uSm9iKHJlc3BvbnNlLmJvZHksIHJlc3BvbnNlLnN0YXR1cyk7XG4gICAgfVxuICAgIGNvbnZlcnRUb0V4cGVjdGVkU2hhcGUoZGF0YSkge1xuICAgICAgICBsZXQgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YTtcbiAgICAgICAgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGRhdGEuZmlsZSkpIHtcbiAgICAgICAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IGRhdGEuZmlsZSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhLmZpbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiB7IGRhdGE6IGRhdGEuZmlsZSB9IH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0oZGF0YS5maWxlKSkge1xuICAgICAgICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHsgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZTogZGF0YS5maWxlIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXVsdGlwbGVWYWxpZGF0aW9uRGF0YTtcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlKGxpc3RJZCwgZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEgfHwgIWRhdGEuZmlsZSkge1xuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignXCJmaWxlXCIgcHJvcGVydHkgZXhwZWN0ZWQuJywgJ01ha2Ugc3VyZSBzZWNvbmQgYXJndW1lbnQgaGFzIFwiZmlsZVwiIHByb3BlcnR5LicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB0aGlzLmNvbnZlcnRUb0V4cGVjdGVkU2hhcGUoZGF0YSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvJHtsaXN0SWR9YCwgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICB9XG4gICAgYXN5bmMgZGVzdHJveShsaXN0SWQpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWApO1xuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShyZXNwb25zZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xuZXhwb3J0IGNsYXNzIERvbWFpblRlbXBsYXRlSXRlbSB7XG4gICAgbmFtZTtcbiAgICBkZXNjcmlwdGlvbjtcbiAgICBjcmVhdGVkQXQ7XG4gICAgY3JlYXRlZEJ5O1xuICAgIGlkO1xuICAgIHZlcnNpb247XG4gICAgdmVyc2lvbnM7XG4gICAgY29uc3RydWN0b3IoZG9tYWluVGVtcGxhdGVGcm9tQVBJKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5uYW1lO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmNyZWF0ZWRBdCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQgPyBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0KSA6ICcnO1xuICAgICAgICB0aGlzLmNyZWF0ZWRCeSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQnk7XG4gICAgICAgIHRoaXMuaWQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuaWQ7XG4gICAgICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbikge1xuICAgICAgICAgICAgdGhpcy52ZXJzaW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb247XG4gICAgICAgICAgICBpZiAodGhpcy52ZXJzaW9uICYmIGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVyc2lvbi5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMgJiYgZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy52ZXJzaW9ucyA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5tYXAoKHZlcnNpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7IC4uLnZlcnNpb24gfTtcbiAgICAgICAgICAgICAgICByZXN1bHQuY3JlYXRlZEF0ID0gbmV3IERhdGUodmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpblRlbXBsYXRlc0NsaWVudCBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXMge1xuICAgIGJhc2VSb3V0ZTtcbiAgICByZXF1ZXN0O1xuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3QpIHtcbiAgICAgICAgc3VwZXIocmVxdWVzdCk7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICAgIH1cbiAgICBwYXJzZUNyZWF0aW9uUmVzcG9uc2UoZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkYXRhLmJvZHkudGVtcGxhdGUpO1xuICAgIH1cbiAgICBwYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICAgICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBwYXJzZU11dGF0aW9uUmVzcG9uc2UoZGF0YSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgICAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UoZGF0YSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBwYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICAgICAgaWYgKGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgICAgICAgcmVzdWx0LnRlbXBsYXRlVmVyc2lvbiA9IHsgdGFnOiBkYXRhLmJvZHkudGVtcGxhdGUudmVyc2lvbi50YWcgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBwYXJzZUxpc3QocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoKGQpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZCkpO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncCcpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIHBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLnRlbXBsYXRlID0gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXNwb25zZS5ib2R5LnRlbXBsYXRlKTtcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3AnKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGFzeW5jIGxpc3QoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIHF1ZXJ5KTtcbiAgICB9XG4gICAgZ2V0KGRvbWFpbiwgdGVtcGxhdGVOYW1lLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXMuYm9keS50ZW1wbGF0ZSkpO1xuICAgIH1cbiAgICBjcmVhdGUoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIGRhdGEpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiB0aGlzLnBhcnNlQ3JlYXRpb25SZXNwb25zZShyZXMpKTtcbiAgICB9XG4gICAgdXBkYXRlKGRvbWFpbiwgdGVtcGxhdGVOYW1lLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHRoaXMucGFyc2VNdXRhdGlvblJlc3BvbnNlKHJlcykpO1xuICAgIH1cbiAgICBkZXN0cm95KGRvbWFpbiwgdGVtcGxhdGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHRoaXMucGFyc2VNdXRhdGlvblJlc3BvbnNlKHJlcykpO1xuICAgIH1cbiAgICBkZXN0cm95QWxsKGRvbWFpbikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJykpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiB0aGlzLnBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UocmVzKSk7XG4gICAgfVxuICAgIGxpc3RWZXJzaW9ucyhkb21haW4sIHRlbXBsYXRlTmFtZSwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucycpLCBxdWVyeSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHRoaXMucGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhyZXMpKTtcbiAgICB9XG4gICAgZ2V0VmVyc2lvbihkb21haW4sIHRlbXBsYXRlTmFtZSwgdGFnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlcy5ib2R5LnRlbXBsYXRlKSk7XG4gICAgfVxuICAgIGNyZWF0ZVZlcnNpb24oZG9tYWluLCB0ZW1wbGF0ZU5hbWUsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIGRhdGEpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiB0aGlzLnBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UocmVzKSk7XG4gICAgfVxuICAgIHVwZGF0ZVZlcnNpb24oZG9tYWluLCB0ZW1wbGF0ZU5hbWUsIHRhZywgZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgIChyZXMpID0+IHRoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpKTtcbiAgICB9XG4gICAgZGVzdHJveVZlcnNpb24oZG9tYWluLCB0ZW1wbGF0ZU5hbWUsIHRhZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpKVxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHRoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG5leHBvcnQgY2xhc3MgRG9tYWluVGFnIHtcbiAgICB0YWc7XG4gICAgZGVzY3JpcHRpb247XG4gICAgJ2ZpcnN0LXNlZW4nO1xuICAgICdsYXN0LXNlZW4nO1xuICAgIGNvbnN0cnVjdG9yKHRhZ0luZm8pIHtcbiAgICAgICAgdGhpcy50YWcgPSB0YWdJbmZvLnRhZztcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ0luZm8uZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXNbJ2ZpcnN0LXNlZW4nXSA9IG5ldyBEYXRlKHRhZ0luZm9bJ2ZpcnN0LXNlZW4nXSk7XG4gICAgICAgIHRoaXNbJ2xhc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snbGFzdC1zZWVuJ10pO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBEb21haW5UYWdTdGF0aXN0aWMge1xuICAgIHRhZztcbiAgICBkZXNjcmlwdGlvbjtcbiAgICBzdGFydDtcbiAgICBlbmQ7XG4gICAgcmVzb2x1dGlvbjtcbiAgICBzdGF0cztcbiAgICBjb25zdHJ1Y3Rvcih0YWdTdGF0aXN0aWNJbmZvKSB7XG4gICAgICAgIHRoaXMudGFnID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnRhZztcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGFydCk7XG4gICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LmVuZCk7XG4gICAgICAgIHRoaXMucmVzb2x1dGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5yZXNvbHV0aW9uO1xuICAgICAgICB0aGlzLnN0YXRzID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdCkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0LCB0aW1lOiBuZXcgRGF0ZShzdGF0LnRpbWUpIH07XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5UYWdzQ2xpZW50IGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlcyB7XG4gICAgYmFzZVJvdXRlO1xuICAgIHJlcXVlc3Q7XG4gICAgY29uc3RydWN0b3IocmVxdWVzdCkge1xuICAgICAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzLyc7XG4gICAgfVxuICAgIHBhcnNlTGlzdChyZXNwb25zZSkge1xuICAgICAgICBjb25zdCBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgodGFnSW5mbykgPT4gbmV3IERvbWFpblRhZyh0YWdJbmZvKSk7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICd0YWcnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBfcGFyc2VUYWdTdGF0aXN0aWMocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb21haW5UYWdTdGF0aXN0aWMocmVzcG9uc2UpO1xuICAgIH1cbiAgICBhc3luYyBsaXN0KGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnKSwgcXVlcnkpO1xuICAgIH1cbiAgICBnZXQoZG9tYWluLCB0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gbmV3IERvbWFpblRhZyhyZXMuYm9keSkpO1xuICAgIH1cbiAgICB1cGRhdGUoZG9tYWluLCB0YWcsIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSwgZGVzY3JpcHRpb24pXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gICAgfVxuICAgIGRlc3Ryb3koZG9tYWluLCB0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L3RhZ3MvJHt0YWd9YClcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+ICh7XG4gICAgICAgICAgICBtZXNzYWdlOiByZXMuYm9keS5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhdHVzOiByZXMuc3RhdHVzXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgc3RhdGlzdGljKGRvbWFpbiwgdGFnLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzJyksIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4gdGhpcy5fcGFyc2VUYWdTdGF0aXN0aWMocmVzKSk7XG4gICAgfVxuICAgIGNvdW50cmllcyhkb21haW4sIHRhZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvY291bnRyaWVzJykpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gICAgfVxuICAgIHByb3ZpZGVycyhkb21haW4sIHRhZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvcHJvdmlkZXJzJykpXG4gICAgICAgICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gICAgfVxuICAgIGRldmljZXMoZG9tYWluLCB0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL2RldmljZXMnKSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5ib2R5KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi8uLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWVkc0xpc3RzQ2xpZW50IGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlcyB7XG4gICAgcmVxdWVzdDtcbiAgICBhdHRyaWJ1dGVzO1xuICAgIGZpbHRlcnM7XG4gICAgbG9nZ2VyO1xuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3QsIGF0dHJpYnV0ZXMsIGZpbHRlcnMsIGxvZ2dlciA9IGNvbnNvbGUpIHtcbiAgICAgICAgc3VwZXIocmVxdWVzdCk7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgICAgIHRoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cbiAgICBjb252ZXJ0RGF0ZVRvVVRDKGtleSwgaW5wdXREYXRlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgQmVjYXVzZSBcIm5ldyBEYXRlKCcyMDIyLTEyLTI1VDAwOjAwOjAwLjAwMFonKVwiIGJlY29tZXMgXCJTdW4gRGVjIDI1IDIwMjIgMDI6MDA6MDAgR01UKzAyMDBcIlxuICAgICAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgICAgICBleDogJ1RodSwgMTMgT2N0IDIwMTEgMTg6MDI6MDAgKzAwMDAnLlxuICAgICAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGBEYXRlOiBcIiR7aW5wdXREYXRlfVwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxuVmFsdWUgXCIke2lucHV0RGF0ZS50b0lTT1N0cmluZygpfVwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cbkNvbnNpZGVyIHVzaW5nIHN0cmluZyB0eXBlIGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiIHRvIGF2b2lkIGF1dG8tY29udmVydGluZ2ApO1xuICAgICAgICByZXR1cm4gaW5wdXREYXRlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuICAgIHByZXBhcmVRdWVyeURhdGEocXVlcnlEYXRhKSB7XG4gICAgICAgIGNvbnN0IHByb3BzRm9yUmVwbGFjZW1lbnQgPSBxdWVyeURhdGE7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VkUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wc0ZvclJlcGxhY2VtZW50KS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9wID0ga2V5O1xuICAgICAgICAgICAgaWYgKCEhcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSAmJiB0eXBlb2YgcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHF1ZXJ5RGF0YVtwcm9wXTtcbiAgICAgICAgICAgICAgICBhY2NbcHJvcF0gPSB0aGlzLmNvbnZlcnREYXRlVG9VVEMocHJvcCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICAuLi5xdWVyeURhdGEsXG4gICAgICAgICAgICAuLi5yZXBsYWNlZFByb3BzXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHByZXBhcmVSZXN1bHQoZGF0YSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgICAgIGNvbnN0IHNlZWRMaXN0ID0gdGhpcy5wcmVwYXJlU2VlZExpc3QoZGF0YS5ib2R5KTtcbiAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgLi4uc2VlZExpc3QsXG4gICAgICAgICAgICBzdGF0dXM6IGRhdGEuc3RhdHVzXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHByZXBhcmVTZWVkTGlzdChkYXRhKSB7XG4gICAgICAgIGxldCBzZWVkcztcbiAgICAgICAgY29uc3QgaGFuZGxlZFNlZWRMaXN0RGF0ZXMgPSB7XG4gICAgICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpLFxuICAgICAgICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoZGF0YS51cGRhdGVkX2F0KSxcbiAgICAgICAgICAgIGxhc3RfcmVzdWx0X2F0OiBuZXcgRGF0ZShkYXRhLmxhc3RfcmVzdWx0X2F0KSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGRhdGEuU2VlZHMpIHtcbiAgICAgICAgICAgIHNlZWRzID0gZGF0YS5TZWVkcy5tYXAoKHNlZWRJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNlZWQgPSB7fTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVkU2VlZERhdGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShzZWVkSXRlbS5jcmVhdGVkX2F0KSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoc2VlZEl0ZW0udXBkYXRlZF9hdCksXG4gICAgICAgICAgICAgICAgICAgIG1heF9lbWFpbF9jb3VudF9oaXRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLm1heF9lbWFpbF9jb3VudF9oaXRfYXQpLFxuICAgICAgICAgICAgICAgICAgICBsYXN0X3NlbnRfdG9fYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLmxhc3Rfc2VudF90b19hdCksXG4gICAgICAgICAgICAgICAgICAgIGxhc3RfZGVsaXZlcmVkX2F0OiBuZXcgRGF0ZShzZWVkSXRlbS5sYXN0X2RlbGl2ZXJlZF9hdCksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBzZWVkID0ge1xuICAgICAgICAgICAgICAgICAgICAuLi5zZWVkSXRlbSxcbiAgICAgICAgICAgICAgICAgICAgLi4uaGFuZGxlZFNlZWREYXRlc1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlZWRzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWVkTGlzdCA9IHtcbiAgICAgICAgICAgIC4uLmRhdGEsXG4gICAgICAgICAgICBTZWVkczogc2VlZHMsXG4gICAgICAgICAgICAuLi5oYW5kbGVkU2VlZExpc3REYXRlc1xuICAgICAgICB9O1xuICAgICAgICBkZWxldGUgc2VlZExpc3QuSWQ7XG4gICAgICAgIHJldHVybiBzZWVkTGlzdDtcbiAgICB9XG4gICAgcGFyc2VMaXN0KHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgfTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM/Lm1hcCgoaXRlbSkgPT4gdGhpcy5wcmVwYXJlU2VlZExpc3QoaXRlbSkpO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGFzeW5jIGxpc3QocXVlcnkpIHtcbiAgICAgICAgY29uc3QgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnlEYXRhKHF1ZXJ5KTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvaW5ib3gvc2VlZGxpc3RzJywgcXVlcnlEYXRhKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRoaXMucGFyc2VMaXN0KHJlc3BvbnNlKSxcbiAgICAgICAgICAgIHN0YXR1czogMjAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIGdldChpZCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9zZWVkbGlzdHMvJHtpZH1gKTtcbiAgICAgICAgY29uc3QgdXBkYXRlZFNlZWRzTGlzdCA9IHRoaXMucHJlcGFyZVNlZWRMaXN0KHJlc3BvbnNlLmJvZHkuc2VlZGxpc3QpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udXBkYXRlZFNlZWRzTGlzdCxcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIGNyZWF0ZShkYXRhKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92NC9pbmJveC9zZWVkbGlzdHMnLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVJlc3VsdChyZXNwb25zZSk7XG4gICAgfVxuICAgIGFzeW5jIHVwZGF0ZShpZCwgZGF0YSkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wdXQoYC92NC9pbmJveC9zZWVkbGlzdHMvJHtpZH1gLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlcGFyZVJlc3VsdChyZXNwb25zZSk7XG4gICAgfVxuICAgIGFzeW5jIGRlc3Ryb3koaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92NC9pbmJveC9zZWVkbGlzdHMvJHtpZH1gKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmJveFBsYWNlbWVudHNDbGllbnQge1xuICAgIHJlcXVlc3Q7XG4gICAgc2VlZHNMaXN0cztcbiAgICByZXN1bHRzO1xuICAgIHByb3ZpZGVycztcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0LCBzZWVkc0xpc3RzQ2xpZW50LCByZXN1bHRzLCBwcm92aWRlcnMpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5zZWVkc0xpc3RzID0gc2VlZHNMaXN0c0NsaWVudDtcbiAgICAgICAgdGhpcy5zZWVkc0xpc3RzID0gc2VlZHNMaXN0c0NsaWVudDtcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0cztcbiAgICAgICAgdGhpcy5wcm92aWRlcnMgPSBwcm92aWRlcnM7XG4gICAgfVxuICAgIGFzeW5jIHJ1blRlc3QoZGF0YSkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0KCcvdjQvaW5ib3gvdGVzdHMnLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnJlc3BvbnNlLmJvZHksXG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uLy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzIHtcbiAgICByZXF1ZXN0O1xuICAgIGF0dHJpYnV0ZXM7XG4gICAgZmlsdGVycztcbiAgICBzaGFyaW5nO1xuICAgIGxvZ2dlcjtcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0LCBhdHRyaWJ1dGVzLCBmaWx0ZXJzLCBzaGFyaW5nLCBsb2dnZXIgPSBjb25zb2xlKSB7XG4gICAgICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgICAgICB0aGlzLmZpbHRlcnMgPSBmaWx0ZXJzO1xuICAgICAgICB0aGlzLnNoYXJpbmcgPSBzaGFyaW5nO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG4gICAgY29udmVydERhdGVUb1VUQyhrZXksIGlucHV0RGF0ZSkge1xuICAgICAgICAvKlxuICAgICAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgICAgIGFuZCBiZWNhdXNlIGZvciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XG4gICAgICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihgRGF0ZTogXCIke2lucHV0RGF0ZX1cIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cblZhbHVlIFwiJHtpbnB1dERhdGUudG9JU09TdHJpbmcoKX1cIiB3aWxsIGJlIHVzZWQgZm9yIHJlcXVlc3QuXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXCIke2tleX1cIiB0byBhdm9pZCBhdXRvLWNvbnZlcnRpbmdgKTtcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0ZS50b0lTT1N0cmluZygpO1xuICAgIH1cbiAgICBwcmVwYXJlUXVlcnlEYXRhKHF1ZXJ5RGF0YSkge1xuICAgICAgICBjb25zdCBwcm9wc0ZvclJlcGxhY2VtZW50ID0gcXVlcnlEYXRhO1xuICAgICAgICBjb25zdCByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvcCA9IGtleTtcbiAgICAgICAgICAgIGlmICghIXByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gJiYgdHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBxdWVyeURhdGFbcHJvcF07XG4gICAgICAgICAgICAgICAgYWNjW3Byb3BdID0gdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKHByb3AsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgLi4ucXVlcnlEYXRhLFxuICAgICAgICAgICAgLi4ucmVwbGFjZWRQcm9wc1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBwcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0KGRhdGEpIHtcbiAgICAgICAgbGV0IGJveCA9IHt9O1xuICAgICAgICBjb25zdCBoYW5kbGVkU2VlZExpc3REYXRlcyA9IHtcbiAgICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCksXG4gICAgICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLnVwZGF0ZWRfYXQpLFxuICAgICAgICAgICAgc2hhcmluZ19leHBpcmVzX2F0OiBuZXcgRGF0ZShkYXRhLnNoYXJpbmdfZXhwaXJlc19hdCksXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkYXRhLkJveCkge1xuICAgICAgICAgICAgYm94ID0ge1xuICAgICAgICAgICAgICAgIC4uLmRhdGEuQm94LFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuQm94LmNyZWF0ZWRfYXQpLFxuICAgICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuQm94LnVwZGF0ZWRfYXQpLFxuICAgICAgICAgICAgICAgIGxhc3RfcmVzdWx0X2F0OiBuZXcgRGF0ZShkYXRhLkJveC5sYXN0X3Jlc3VsdF9hdCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGVsZXRlIGJveC5JRDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbmJveFBsYWNlbWVudHNSZXN1bHQgPSB7XG4gICAgICAgICAgICAuLi5kYXRhLFxuICAgICAgICAgICAgQm94OiBib3gsXG4gICAgICAgICAgICAuLi5oYW5kbGVkU2VlZExpc3REYXRlcyxcbiAgICAgICAgICAgIGlkOiBkYXRhLklkLFxuICAgICAgICB9O1xuICAgICAgICBkZWxldGUgaW5ib3hQbGFjZW1lbnRzUmVzdWx0LklEO1xuICAgICAgICByZXR1cm4gaW5ib3hQbGFjZW1lbnRzUmVzdWx0O1xuICAgIH1cbiAgICBwYXJzZUxpc3QocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoKGl0ZW0pID0+IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChpdGVtKSk7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgYXN5bmMgbGlzdChxdWVyeSkge1xuICAgICAgICBjb25zdCBxdWVyeURhdGEgPSB0aGlzLnByZXBhcmVRdWVyeURhdGEocXVlcnkpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92NC9pbmJveC9yZXN1bHRzJywgcXVlcnlEYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaXN0KHJlc3BvbnNlKTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0KGlkKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2luYm94L3Jlc3VsdHMvJHtpZH1gKTtcbiAgICAgICAgY29uc3QgaW5ib3hQbGFjZW1lbnRSZXN1bHQgPSB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQocmVzcG9uc2UuYm9keS5yZXN1bHQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICBpbmJveFBsYWNlbWVudFJlc3VsdFxuICAgICAgICB9O1xuICAgIH1cbiAgICBhc3luYyBkZXN0cm95KGlkKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2luYm94L3Jlc3VsdHMvJHtpZH1gKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgICAgICB9O1xuICAgIH1cbiAgICBhc3luYyBnZXRSZXN1bHRCeVNoYXJlSWQoc2hhcmVJZCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9zaGFyaW5nL3B1YmxpYy8ke3NoYXJlSWR9YCk7XG4gICAgICAgIGNvbnN0IGluYm94UGxhY2VtZW50UmVzdWx0ID0gdGhpcy5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0KHJlc3BvbnNlLmJvZHkucmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgaW5ib3hQbGFjZW1lbnRSZXN1bHRcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IHtcbiAgICByZXF1ZXN0O1xuICAgIHBhdGg7XG4gICAgY29uc3RydWN0b3IocmVxdWVzdCwgcGF0aCkge1xuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBhc3luYyBsaXN0KCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQodGhpcy5wYXRoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLFxuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIGdldChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLnBhdGh9LyR7YXR0cmlidXRlTmFtZX1gKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnJlc3BvbnNlLmJvZHksXG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQge1xuICAgIHJlcXVlc3Q7XG4gICAgcGF0aDtcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0LCBwYXRoKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgfVxuICAgIGFzeW5jIGxpc3QoKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQodGhpcy5wYXRoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzdWx0LnN0YXR1cyxcbiAgICAgICAgICAgIHN1cHBvcnRlZF9maWx0ZXJzOiByZXN1bHQuYm9keS5zdXBwb3J0ZWRfZmlsdGVyc1xuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIElQUlNoYXJpbmdDbGllbnQge1xuICAgIHJlcXVlc3Q7XG4gICAgY29uc3RydWN0b3IocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBwcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0U2hhcmluZyhkYXRhKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZWRTZWVkTGlzdERhdGVzID0ge1xuICAgICAgICAgICAgZXhwaXJlc19hdDogbmV3IERhdGUoZGF0YS5leHBpcmVzX2F0KSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICAgIC4uLmhhbmRsZWRTZWVkTGlzdERhdGVzXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGFzeW5jIGdldChpZCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9zaGFyaW5nLyR7aWR9YCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmcocmVzcG9uc2UuYm9keS5zaGFyaW5nKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgLi4ucmVzdWx0XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIHVwZGF0ZShpZCwgZGF0YSkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wdXQoYC92NC9pbmJveC9zaGFyaW5nLyR7aWR9YCwge30sIHsgcXVlcnk6IGBlbmFibGVkPSR7ZGF0YS5lbmFibGVkfWAgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmcocmVzcG9uc2UuYm9keS5zaGFyaW5nKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnJlc3VsdCxcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IHtcbiAgICByZXF1ZXN0O1xuICAgIHBhdGg7XG4gICAgY29uc3RydWN0b3IocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnBhdGggPSAnL3Y0L2luYm94L3Byb3ZpZGVycyc7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIHBhcnNlTGlzdChyZXNwb25zZSkge1xuICAgICAgICBjb25zdCBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlZFByb3ZpZGVyRGF0ZXMgPSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoaXRlbS5jcmVhdGVkX2F0KSxcbiAgICAgICAgICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShpdGVtLnVwZGF0ZWRfYXQpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAuLi5pdGVtLFxuICAgICAgICAgICAgICAgIC4uLmhhbmRsZWRQcm92aWRlckRhdGVzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgYXN5bmMgbGlzdCgpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHRoaXMucGF0aCk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWV0cmljc0NsaWVudCB7XG4gICAgcmVxdWVzdDtcbiAgICBsb2dnZXI7XG4gICAgY29uc3RydWN0b3IocmVxdWVzdCwgbG9nZ2VyID0gY29uc29sZSkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG4gICAgY29udmVydERhdGVUb1VUQyhrZXksIGlucHV0RGF0ZSkge1xuICAgICAgICAvKlxuICAgICAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgICAgIGFuZCBiZWNhdXNlIGZvciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XG4gICAgICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihgRGF0ZTpcIiR7aW5wdXREYXRlfVwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxuVmFsdWUgXCIke2lucHV0RGF0ZS50b1VUQ1N0cmluZygpfVwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cbkNvbnNpZGVyIHVzaW5nIHN0cmluZyB0eXBlIGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiIHRvIGF2b2lkIGF1dG8tY29udmVydGluZ2ApO1xuICAgICAgICByZXR1cm4gaW5wdXREYXRlLnRvVVRDU3RyaW5nKCk7XG4gICAgfVxuICAgIHByZXBhcmVRdWVyeShxdWVyeSkge1xuICAgICAgICBsZXQgc3RhcnREYXRlO1xuICAgICAgICBsZXQgZW5kRGF0ZTtcbiAgICAgICAgaWYgKHF1ZXJ5KSB7XG4gICAgICAgICAgICBjb25zdCBxU3RhcnQgPSBxdWVyeT8uc3RhcnQ7XG4gICAgICAgICAgICBjb25zdCBxRW5kID0gcXVlcnk/LmVuZDtcbiAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IHFTdGFydCBpbnN0YW5jZW9mIERhdGUgPyB0aGlzLmNvbnZlcnREYXRlVG9VVEMoJ3N0YXJ0JywgcVN0YXJ0KSA6IHFTdGFydCA/PyAnJztcbiAgICAgICAgICAgIGVuZERhdGUgPSBxRW5kICYmIHFFbmQgaW5zdGFuY2VvZiBEYXRlID8gdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKCdlbmQnLCBxRW5kKSA6IHFFbmQgPz8gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgLi4ucXVlcnksXG4gICAgICAgICAgICBzdGFydDogc3RhcnREYXRlLFxuICAgICAgICAgICAgZW5kOiBlbmREYXRlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnN0IHJlc0JvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICBjb25zdCBzdGFydERhdGUgPSBEYXRlLnBhcnNlKHJlc0JvZHkuc3RhcnQpID8gbmV3IERhdGUocmVzQm9keS5zdGFydCkgOiBudWxsO1xuICAgICAgICBjb25zdCBlbmREYXRlID0gRGF0ZS5wYXJzZShyZXNCb2R5LmVuZCkgPyBuZXcgRGF0ZShyZXNCb2R5LmVuZCkgOiBudWxsO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICAuLi5yZXNCb2R5LFxuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICBzdGFydDogc3RhcnREYXRlLFxuICAgICAgICAgICAgZW5kOiBlbmREYXRlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGFzeW5jIGdldEFjY291bnQocXVlcnkpIHtcbiAgICAgICAgY29uc3QgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnkocXVlcnkpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0KCcvdjEvYW5hbHl0aWNzL21ldHJpY3MnLCBxdWVyeURhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShyZXNwb25zZSk7XG4gICAgfVxuICAgIGFzeW5jIGdldEFjY291bnRVc2FnZShxdWVyeSkge1xuICAgICAgICBjb25zdCBxdWVyeURhdGEgPSB0aGlzLnByZXBhcmVRdWVyeShxdWVyeSk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3QoJy92MS9hbmFseXRpY3MvdXNhZ2UvbWV0cmljcycsIHF1ZXJ5RGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5UcmFja2luZ0NsaWVudCB7XG4gICAgcmVxdWVzdDtcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIF9wYXJzZVRyYWNraW5nU2V0dGluZ3MocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkudHJhY2tpbmc7XG4gICAgfVxuICAgIF9wYXJzZVRyYWNraW5nVXBkYXRlKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICAgIH1cbiAgICBfaXNPcGVuVHJhY2tpbmdJbmZvV2l0UGxhY2Uob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAncGxhY2VfYXRfdGhlX3RvcCcgaW4gb2JqO1xuICAgIH1cbiAgICBhc3luYyBnZXQoZG9tYWluKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3YyL3g1MDkvJHtkb21haW59L3N0YXR1c2ApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ucmVzcG9uc2UuYm9keSxcbiAgICAgICAgICAgIHJlc3BvbnNlU3RhdHVzQ29kZTogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIGdlbmVyYXRlKGRvbWFpbikge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0KGAvdjIveDUwOS8ke2RvbWFpbn1gKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnJlc3BvbnNlLmJvZHksXG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9O1xuICAgIH1cbiAgICBhc3luYyByZWdlbmVyYXRlKGRvbWFpbikge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wdXQoYC92Mi94NTA5LyR7ZG9tYWlufWApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ucmVzcG9uc2UuYm9keSxcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIGdldFRyYWNraW5nKGRvbWFpbikge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyhyZXNwb25zZSk7XG4gICAgfVxuICAgIGFzeW5jIHVwZGF0ZVRyYWNraW5nKGRvbWFpbiwgdHlwZSwgZGF0YSkge1xuICAgICAgICBjb25zdCBwcmVwYXJlZERhdGEgPSB7XG4gICAgICAgICAgICAuLi5kYXRhXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YT8uYWN0aXZlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHByZXBhcmVkRGF0YS5hY3RpdmUgPSAoZGF0YT8uYWN0aXZlKSA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faXNPcGVuVHJhY2tpbmdJbmZvV2l0UGxhY2UoZGF0YSkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YT8ucGxhY2VfYXRfdGhlX3RvcCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZWREYXRhLnBsYWNlX2F0X3RoZV90b3AgPSAoZGF0YT8ucGxhY2VfYXRfdGhlX3RvcCkgPyAneWVzJyA6ICdubyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnLCB0eXBlKSwgcHJlcGFyZWREYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlVHJhY2tpbmdVcGRhdGUocmVzcG9uc2UpO1xuICAgIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdC5qcyc7XG5pbXBvcnQgRG9tYWluc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc0NsaWVudC5qcyc7XG5pbXBvcnQgRXZlbnRDbGllbnQgZnJvbSAnLi9FdmVudHMuanMnO1xuaW1wb3J0IFN0YXRzQ2xpZW50IGZyb20gJy4vU3RhdHMvU3RhdHNDbGllbnQuanMnO1xuaW1wb3J0IFN1cHByZXNzaW9uQ2xpZW50IGZyb20gJy4vU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uc0NsaWVudC5qcyc7XG5pbXBvcnQgV2ViaG9va3NDbGllbnQgZnJvbSAnLi9XZWJob29rcy5qcyc7XG5pbXBvcnQgTWVzc2FnZXNDbGllbnQgZnJvbSAnLi9NZXNzYWdlcy5qcyc7XG5pbXBvcnQgUm91dGVzQ2xpZW50IGZyb20gJy4vUm91dGVzLmpzJztcbmltcG9ydCBWYWxpZGF0ZUNsaWVudCBmcm9tICcuL1ZhbGlkYXRpb25zL3ZhbGlkYXRlLmpzJztcbmltcG9ydCBJcHNDbGllbnQgZnJvbSAnLi9JUHMuanMnO1xuaW1wb3J0IElwUG9vbHNDbGllbnQgZnJvbSAnLi9JUFBvb2xzLmpzJztcbmltcG9ydCBNYWlsaW5nTGlzdHNDbGllbnQgZnJvbSAnLi9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzLmpzJztcbmltcG9ydCBNYWlsTGlzdHNNZW1iZXJzIGZyb20gJy4vTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycy5qcyc7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNDcmVkZW50aWFscy5qcyc7XG5pbXBvcnQgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGZyb20gJy4vVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uLmpzJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUZW1wbGF0ZXMuanMnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUYWdzLmpzJztcbmltcG9ydCBTdWJhY2NvdW50c0NsaWVudCBmcm9tICcuL1N1YmFjY291bnRzLmpzJztcbmltcG9ydCBTZWVkc0xpc3RzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL1NlZWRzTGlzdHMvU2VlZHNMaXN0c0NsaWVudC5qcyc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL2luYm94UGxhY2VtZW50cy5qcyc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQuanMnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvQXR0cmlidXRlc0NsaWVudC5qcyc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9GaWx0ZXJzQ2xpZW50LmpzJztcbmltcG9ydCBJUFJTaGFyaW5nQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQuanMnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzLmpzJztcbmltcG9ydCBNZXRyaWNzQ2xpZW50IGZyb20gJy4vTWV0cmljcy9NZXRyaWNzQ2xpZW50LmpzJztcbmltcG9ydCBEb21haW5UcmFja2luZ0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc1RyYWNraW5nLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW5DbGllbnQge1xuICAgIHJlcXVlc3Q7XG4gICAgZG9tYWlucztcbiAgICB3ZWJob29rcztcbiAgICBldmVudHM7XG4gICAgc3RhdHM7XG4gICAgbWV0cmljcztcbiAgICBzdXBwcmVzc2lvbnM7XG4gICAgbWVzc2FnZXM7XG4gICAgcm91dGVzO1xuICAgIHZhbGlkYXRlO1xuICAgIGlwcztcbiAgICBpcF9wb29scztcbiAgICBsaXN0cztcbiAgICBzdWJhY2NvdW50cztcbiAgICBpbmJveFBsYWNlbWVudHM7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucywgZm9ybURhdGEpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0geyAuLi5vcHRpb25zIH07XG4gICAgICAgIGlmICghY29uZmlnLnVybCkge1xuICAgICAgICAgICAgY29uZmlnLnVybCA9ICdodHRwczovL2FwaS5tYWlsZ3VuLm5ldCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25maWcudXNlcm5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwidXNlcm5hbWVcIiBpcyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uZmlnLmtleSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJrZXlcIiBpcyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gbmV3IFJlcXVlc3QoY29uZmlnLCBmb3JtRGF0YSk7XG4gICAgICAgIGNvbnN0IG1haWxMaXN0c01lbWJlcnMgPSBuZXcgTWFpbExpc3RzTWVtYmVycyh0aGlzLnJlcXVlc3QpO1xuICAgICAgICBjb25zdCBkb21haW5DcmVkZW50aWFsc0NsaWVudCA9IG5ldyBEb21haW5DcmVkZW50aWFsc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICBjb25zdCBkb21haW5UZW1wbGF0ZXNDbGllbnQgPSBuZXcgRG9tYWluVGVtcGxhdGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIGNvbnN0IGRvbWFpblRhZ3NDbGllbnQgPSBuZXcgRG9tYWluVGFnc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICBjb25zdCBkb21haW5UcmFja2luZ0NsaWVudCA9IG5ldyBEb21haW5UcmFja2luZ0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICBjb25zdCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgPSBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIGNvbnN0IEluYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50ID0gbmV3IElQUlNoYXJpbmdDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgY29uc3Qgc2VlZHNMaXN0c0F0dHJpYnV0ZXMgPSBuZXcgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvc2VlZGxpc3RzL2EnKTtcbiAgICAgICAgY29uc3QgcmVzdWx0c0F0dHJpYnV0ZXNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvcmVzdWx0cy9hJyk7XG4gICAgICAgIGNvbnN0IHNlZWRzTGlzdHNGaWx0ZXJzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3NlZWRsaXN0cy9fZmlsdGVycycpO1xuICAgICAgICBjb25zdCByZXN1bHRzRmlsdGVyc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9yZXN1bHRzL19maWx0ZXJzJyk7XG4gICAgICAgIGNvbnN0IHNlZWRzTGlzdHNDbGllbnQgPSBuZXcgU2VlZHNMaXN0c0NsaWVudCh0aGlzLnJlcXVlc3QsIHNlZWRzTGlzdHNBdHRyaWJ1dGVzLCBzZWVkc0xpc3RzRmlsdGVyc0NsaWVudCk7XG4gICAgICAgIGNvbnN0IGluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCh0aGlzLnJlcXVlc3QsIHJlc3VsdHNBdHRyaWJ1dGVzQ2xpZW50LCByZXN1bHRzRmlsdGVyc0NsaWVudCwgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQpO1xuICAgICAgICBjb25zdCBpbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMuZG9tYWlucyA9IG5ldyBEb21haW5zQ2xpZW50KHRoaXMucmVxdWVzdCwgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQsIGRvbWFpblRlbXBsYXRlc0NsaWVudCwgZG9tYWluVGFnc0NsaWVudCwgZG9tYWluVHJhY2tpbmdDbGllbnQpO1xuICAgICAgICB0aGlzLndlYmhvb2tzID0gbmV3IFdlYmhvb2tzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50Q2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5tZXRyaWNzID0gbmV3IE1ldHJpY3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5zdXBwcmVzc2lvbnMgPSBuZXcgU3VwcHJlc3Npb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IG5ldyBNZXNzYWdlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLnJvdXRlcyA9IG5ldyBSb3V0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5pcHMgPSBuZXcgSXBzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMuaXBfcG9vbHMgPSBuZXcgSXBQb29sc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLmxpc3RzID0gbmV3IE1haWxpbmdMaXN0c0NsaWVudCh0aGlzLnJlcXVlc3QsIG1haWxMaXN0c01lbWJlcnMpO1xuICAgICAgICB0aGlzLnZhbGlkYXRlID0gbmV3IFZhbGlkYXRlQ2xpZW50KHRoaXMucmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KTtcbiAgICAgICAgdGhpcy5zdWJhY2NvdW50cyA9IG5ldyBTdWJhY2NvdW50c0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLmluYm94UGxhY2VtZW50cyA9IG5ldyBJbmJveFBsYWNlbWVudHNDbGllbnQodGhpcy5yZXF1ZXN0LCBzZWVkc0xpc3RzQ2xpZW50LCBpbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LCBpbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQpO1xuICAgIH1cbiAgICBzZXRTdWJhY2NvdW50KHN1YmFjY291bnRJZCkge1xuICAgICAgICB0aGlzLnJlcXVlc3Q/LnNldFN1YmFjY291bnRIZWFkZXIoc3ViYWNjb3VudElkKTtcbiAgICB9XG4gICAgcmVzZXRTdWJhY2NvdW50KCkge1xuICAgICAgICB0aGlzLnJlcXVlc3Q/LnJlc2V0U3ViYWNjb3VudEhlYWRlcigpO1xuICAgIH1cbn1cbiIsImltcG9ydCBNYWlsZ3VuQ2xpZW50IGZyb20gJy4vQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50LmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW4ge1xuICAgIHN0YXRpYyBnZXQgZGVmYXVsdCgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICBmb3JtRGF0YTtcbiAgICBjb25zdHJ1Y3RvcihGb3JtRGF0YSkge1xuICAgICAgICB0aGlzLmZvcm1EYXRhID0gRm9ybURhdGE7XG4gICAgfVxuICAgIGNsaWVudChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWFpbGd1bkNsaWVudChvcHRpb25zLCB0aGlzLmZvcm1EYXRhKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiZ2xvYmFsIiwidGhpcyIsIkF4aW9zRXJyb3IiLCJ1dGlscyIsInByb3RvdHlwZSIsInRvRm9ybURhdGEiLCJlbmNvZGUiLCJVUkxTZWFyY2hQYXJhbXMiLCJGb3JtRGF0YSIsIkJsb2IiLCJwbGF0Zm9ybSIsIkF4aW9zSGVhZGVycyIsImlzQ2FuY2VsIiwiQ2FuY2VsZWRFcnJvciIsIm1lcmdlQ29uZmlnIiwiVkVSU0lPTiIsInZhbGlkYXRvcnMiLCJBeGlvcyIsInNwcmVhZCIsImlzQXhpb3NFcnJvciIsIkh0dHBTdGF0dXNDb2RlIiwiQ2FuY2VsVG9rZW4iLCJiYXNlNjQuZW5jb2RlIiwiUmVxdWVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0MsQ0FBQyxTQUFTLElBQUksRUFBRTs7QUFFakI7QUFDQSxHQUFDLElBQUksV0FBVyxHQUFpQyxPQUFPOztBQUV4RDtBQUNBLEdBQUMsSUFBSSxVQUFVLEdBQWdDLE1BQU07QUFDckQsSUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLFdBQVcsSUFBSSxNQUFNOztBQUV6QztBQUNBO0dBQ0MsSUFBSSxVQUFVLEdBQUcsT0FBT0EsY0FBTSxJQUFJLFFBQVEsSUFBSUEsY0FBTTtBQUNyRCxHQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUU7SUFDekUsSUFBSSxHQUFHLFVBQVU7QUFDbkI7O0FBRUE7O0FBRUEsR0FBQyxJQUFJLHFCQUFxQixHQUFHLFNBQVMsT0FBTyxFQUFFO0FBQy9DLElBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO0lBQ3RCO0FBQ0YsR0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLO0FBQzVDLEdBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyx1QkFBdUI7O0FBRS9ELEdBQUMsSUFBSSxLQUFLLEdBQUcsU0FBUyxPQUFPLEVBQUU7QUFDL0I7QUFDQTtBQUNBLElBQUUsTUFBTSxJQUFJLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztJQUN4Qzs7R0FFRCxJQUFJLEtBQUssR0FBRyxrRUFBa0U7QUFDL0U7R0FDQyxJQUFJLHNCQUFzQixHQUFHLGNBQWM7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBQyxJQUFJLE1BQU0sR0FBRyxTQUFTLEtBQUssRUFBRTtBQUM5QixJQUFFLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSztBQUN0QixNQUFJLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLENBQUM7QUFDdkMsSUFBRSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTTtBQUMzQixJQUFFLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7S0FDcEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztBQUNwQyxLQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTTtBQUN4QjtJQUNFO0FBQ0YsS0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDbEI7QUFDQSxLQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLO01BQzFCO0FBQ0osS0FBRyxLQUFLO01BQ0o7TUFDQTtBQUNKO0lBQ0UsSUFBSSxVQUFVLEdBQUcsQ0FBQztBQUNwQixJQUFFLElBQUksVUFBVTtBQUNoQixJQUFFLElBQUksTUFBTTtJQUNWLElBQUksTUFBTSxHQUFHLEVBQUU7QUFDakIsSUFBRSxJQUFJLFFBQVEsR0FBRyxFQUFFO0FBQ25CLElBQUUsT0FBTyxFQUFFLFFBQVEsR0FBRyxNQUFNLEVBQUU7QUFDOUIsS0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pELEtBQUcsVUFBVSxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxNQUFNLEdBQUcsTUFBTTtBQUNsRTtBQUNBLEtBQUcsSUFBSSxVQUFVLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDekI7QUFDQSxNQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsWUFBWTtPQUM1QixJQUFJLEdBQUcsVUFBVSxLQUFLLEVBQUUsR0FBRyxVQUFVLEdBQUcsQ0FBQztPQUN6QztBQUNMO0FBQ0E7QUFDQSxJQUFFLE9BQU8sTUFBTTtJQUNiOztBQUVGO0FBQ0E7QUFDQSxHQUFDLElBQUksTUFBTSxHQUFHLFNBQVMsS0FBSyxFQUFFO0FBQzlCLElBQUUsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDdkIsSUFBRSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDaEM7QUFDQTtBQUNBLEtBQUcsS0FBSztBQUNSLE1BQUksOERBQThEO01BQzlEO01BQ0E7QUFDSjtBQUNBLElBQUUsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0lBQzlCLElBQUksTUFBTSxHQUFHLEVBQUU7QUFDakIsSUFBRSxJQUFJLFFBQVEsR0FBRyxFQUFFO0FBQ25CLElBQUUsSUFBSSxDQUFDO0FBQ1AsSUFBRSxJQUFJLENBQUM7QUFDUCxJQUFFLElBQUksQ0FBQztBQUNQLElBQUUsSUFBSSxNQUFNO0FBQ1o7QUFDQSxJQUFFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTzs7QUFFckMsSUFBRSxPQUFPLEVBQUUsUUFBUSxHQUFHLE1BQU0sRUFBRTtBQUM5QjtLQUNHLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7S0FDcEMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDO0tBQ3JDLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxDQUFDO0FBQ25DLEtBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUNyQjtBQUNBO0FBQ0EsS0FBRyxNQUFNO01BQ0wsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztNQUNqQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO01BQ2pDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDcEMsTUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJO01BQzFCO0FBQ0o7O0FBRUEsSUFBRSxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUU7S0FDakIsQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztLQUNuQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsQ0FBQztBQUNuQyxLQUFHLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUNqQixLQUFHLE1BQU07QUFDVCxNQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztNQUMxQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUM7TUFDbEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO01BQ2xDO01BQ0E7QUFDSixLQUFHLE1BQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO0FBQzNCLEtBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO0FBQ3RDLEtBQUcsTUFBTTtBQUNULE1BQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO01BQ3pCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztNQUNsQztNQUNBO0FBQ0o7O0FBRUEsSUFBRSxPQUFPLE1BQU07SUFDYjs7R0FFRCxJQUFJLE1BQU0sR0FBRztJQUNaLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLFFBQVEsRUFBRSxNQUFNO0FBQ2xCLElBQUUsU0FBUyxFQUFFO0lBQ1g7O0FBRUY7QUFDQTtHQVNRLElBQUksV0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtJQUNoRCxJQUFJLFVBQVUsRUFBRTtBQUNsQixLQUFHLFVBQVUsQ0FBQyxPQUFPLEdBQUcsTUFBTTtBQUM5QixLQUFHLE1BQU07QUFDVCxLQUFHLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO0FBQzNCLE1BQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xFO0FBQ0E7QUFDQSxJQUFFLE1BQU07QUFDUixJQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTTtBQUN0Qjs7R0FFQyxDQUFDQyxNQUFJLENBQUMsRUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuS1AsRUFBQSxDQUFDLFVBQVUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUU7SUFDcEMsSUFBcUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFpQixDQUFBLE9BQUEsR0FBQSxVQUFVLEVBQUU7QUFDcEYsU0FDTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxFQUFFO0FBQ25DLEdBQUMsRUFBRSxTQUFTLEVBQUVBLE9BQUksRUFBRSxZQUFZOztBQUVoQyxJQUFFLFNBQVMsU0FBUyxFQUFFLFFBQVEsRUFBRTtNQUM1QixJQUFJLFdBQVcsR0FBRyxFQUFFO01BQ3BCLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQzs7TUFFdkMsSUFBSSxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDbkMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUU7O0FBRUE7QUFDQSxNQUFJLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNsRSxRQUFNLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDNUIsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDOztBQUVBO01BQ0ksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQzNDLFFBQU0sUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQztBQUNsRSxPQUFLLE1BQU07QUFDWCxRQUFNLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUM7QUFDakU7O0FBRUEsTUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM5QyxRQUFNLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7O0FBRWpDLFFBQU0sSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUU7QUFDekMsVUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxHQUFHLFNBQVMsQ0FBQztBQUMxRTs7QUFFQSxRQUFNLElBQUksU0FBUyxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVM7O0FBRXZDLFFBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ2pCO1VBQ1EsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztBQUNuRDtRQUNNLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ25DO1VBQ1EsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztBQUNuRCxTQUFPLE1BQU07QUFDYjtVQUNRLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7QUFDcEQ7O0FBRUEsUUFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7QUFFakM7O01BRUksSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbkM7O0FBRUE7TUFDSSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUM7O0FBRTlDO01BQ0ksSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7TUFDMUIsR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7O0FBRXhFLE1BQUksT0FBTyxHQUFHO0FBQ2Q7O0FBRUEsSUFBRSxPQUFPLFlBQVk7QUFDckIsTUFBSSxJQUFJLEtBQUs7O01BRVQsSUFBSSxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7QUFDMUMsUUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUMxQixPQUFLLE1BQU07UUFDTCxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQ3RDOztBQUVBLE1BQUksT0FBTyxTQUFTLENBQUMsS0FBSyxDQUFDO0tBQ3hCOztBQUVILEdBQUMsQ0FBQyxDQUFBOzs7Ozs7OztBQzNFYSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFO0FBQzFDLEVBQUUsT0FBTyxTQUFTLElBQUksR0FBRztBQUN6QixJQUFJLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO0FBQ3ZDLEdBQUc7QUFDSDs7QUNGQTs7QUFFQSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVM7QUFDbkMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLE1BQU07O0FBRS9CLE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBSyxJQUFJLEtBQUssSUFBSTtBQUNsQyxJQUFJLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3BDLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3RFLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV2QixNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUksS0FBSztBQUM3QixFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQzNCLEVBQUUsT0FBTyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7QUFDdEM7O0FBRUEsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxJQUFJOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLOztBQUV2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0FBQ3ZCLEVBQUUsT0FBTyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxXQUFXLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxXQUFXO0FBQ3RHLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQzVFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQzs7O0FBRy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7QUFDaEMsRUFBRSxJQUFJLE1BQU07QUFDWixFQUFFLElBQUksQ0FBQyxPQUFPLFdBQVcsS0FBSyxXQUFXLE1BQU0sV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ3BFLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ3BDLEdBQUcsTUFBTTtBQUNULElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pFO0FBQ0EsRUFBRSxPQUFPLE1BQU07QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUM7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQzs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQUssS0FBSyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7O0FBRXZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sU0FBUyxHQUFHLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxLQUFLO0FBQy9CLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFO0FBQ2hDLElBQUksT0FBTyxLQUFLO0FBQ2hCOztBQUVBLEVBQUUsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztBQUN2QyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLFNBQVMsS0FBSyxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxLQUFLLEVBQUUsTUFBTSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDO0FBQ3pLOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQzs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsS0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7O0FBRS9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFLLEtBQUs7QUFDOUIsRUFBRSxJQUFJLElBQUk7QUFDVixFQUFFLE9BQU8sS0FBSztBQUNkLElBQUksQ0FBQyxPQUFPLFFBQVEsS0FBSyxVQUFVLElBQUksS0FBSyxZQUFZLFFBQVE7QUFDaEUsTUFBTSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUM5QixRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxVQUFVO0FBQzdDO0FBQ0EsU0FBUyxJQUFJLEtBQUssUUFBUSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLG1CQUFtQjtBQUNwRztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0saUJBQWlCLEdBQUcsVUFBVSxDQUFDLGlCQUFpQixDQUFDOztBQUV2RCxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQzs7QUFFakk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSTtBQUM5QixFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLG9DQUFvQyxFQUFFLEVBQUUsQ0FBQzs7QUFFcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUU7QUFDckQ7QUFDQSxFQUFFLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLEVBQUU7QUFDbEQsSUFBSTtBQUNKOztBQUVBLEVBQUUsSUFBSSxDQUFDO0FBQ1AsRUFBRSxJQUFJLENBQUM7O0FBRVA7QUFDQSxFQUFFLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO0FBQy9CO0FBQ0EsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDZjs7QUFFQSxFQUFFLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3BCO0FBQ0EsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM1QyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO0FBQ25DO0FBQ0EsR0FBRyxNQUFNO0FBQ1Q7QUFDQSxJQUFJLE1BQU0sSUFBSSxHQUFHLFVBQVUsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDaEYsSUFBSSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTTtBQUMzQixJQUFJLElBQUksR0FBRzs7QUFFWCxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbkIsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztBQUN2QztBQUNBO0FBQ0E7O0FBRUEsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUMzQixFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFO0FBQ3pCLEVBQUUsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDL0IsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTTtBQUNyQixFQUFFLElBQUksSUFBSTtBQUNWLEVBQUUsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNsQixJQUFJLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtBQUNwQyxNQUFNLE9BQU8sSUFBSTtBQUNqQjtBQUNBO0FBQ0EsRUFBRSxPQUFPLElBQUk7QUFDYjs7QUFFQSxNQUFNLE9BQU8sR0FBRyxDQUFDLE1BQU07QUFDdkI7QUFDQSxFQUFFLElBQUksT0FBTyxVQUFVLEtBQUssV0FBVyxFQUFFLE9BQU8sVUFBVTtBQUMxRCxFQUFFLE9BQU8sT0FBTyxJQUFJLEtBQUssV0FBVyxHQUFHLElBQUksSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLE1BQU07QUFDOUYsQ0FBQyxHQUFHOztBQUVKLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxLQUFLLE9BQU87O0FBRWxGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsS0FBSyw4QkFBOEI7QUFDNUMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7QUFDekQsRUFBRSxNQUFNLE1BQU0sR0FBRyxFQUFFO0FBQ25CLEVBQUUsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLO0FBQ3BDLElBQUksTUFBTSxTQUFTLEdBQUcsUUFBUSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRztBQUM3RCxJQUFJLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNoRSxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztBQUN2RCxLQUFLLE1BQU0sSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDbkMsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUM7QUFDeEMsS0FBSyxNQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzdCLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUU7QUFDckMsS0FBSyxNQUFNO0FBQ1gsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRztBQUM3QjtBQUNBOztBQUVBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNwRCxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQztBQUN0RDtBQUNBLEVBQUUsT0FBTyxNQUFNO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxLQUFLO0FBQ3BELEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUs7QUFDM0IsSUFBSSxJQUFJLE9BQU8sSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDcEMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7QUFDakMsS0FBSyxNQUFNO0FBQ1gsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRztBQUNsQjtBQUNBLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2xCLEVBQUUsT0FBTyxDQUFDO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVEsR0FBRyxDQUFDLE9BQU8sS0FBSztBQUM5QixFQUFFLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7QUFDeEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDOUI7QUFDQSxFQUFFLE9BQU8sT0FBTztBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVEsR0FBRyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsV0FBVyxLQUFLO0FBQ3hFLEVBQUUsV0FBVyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7QUFDaEYsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxXQUFXO0FBQ2pELEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQzlDLElBQUksS0FBSyxFQUFFLGdCQUFnQixDQUFDO0FBQzVCLEdBQUcsQ0FBQztBQUNKLEVBQUUsS0FBSyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7QUFDdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxZQUFZLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEtBQUs7QUFDakUsRUFBRSxJQUFJLEtBQUs7QUFDWCxFQUFFLElBQUksQ0FBQztBQUNQLEVBQUUsSUFBSSxJQUFJO0FBQ1YsRUFBRSxNQUFNLE1BQU0sR0FBRyxFQUFFOztBQUVuQixFQUFFLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRTtBQUN6QjtBQUNBLEVBQUUsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFLE9BQU8sT0FBTzs7QUFFdkMsRUFBRSxHQUFHO0FBQ0wsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQztBQUNqRCxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTTtBQUNwQixJQUFJLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQ3BCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDckIsTUFBTSxJQUFJLENBQUMsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDbEYsUUFBUSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztBQUN2QyxRQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJO0FBQzNCO0FBQ0E7QUFDQSxJQUFJLFNBQVMsR0FBRyxNQUFNLEtBQUssS0FBSyxJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUM7QUFDN0QsR0FBRyxRQUFRLFNBQVMsS0FBSyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksU0FBUyxLQUFLLE1BQU0sQ0FBQyxTQUFTOztBQUVqRyxFQUFFLE9BQU8sT0FBTztBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsUUFBUSxLQUFLO0FBQ2xELEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDbkIsRUFBRSxJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUU7QUFDdkQsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU07QUFDekI7QUFDQSxFQUFFLFFBQVEsSUFBSSxZQUFZLENBQUMsTUFBTTtBQUNqQyxFQUFFLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQztBQUN2RCxFQUFFLE9BQU8sU0FBUyxLQUFLLEVBQUUsSUFBSSxTQUFTLEtBQUssUUFBUTtBQUNuRDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLE9BQU8sR0FBRyxDQUFDLEtBQUssS0FBSztBQUMzQixFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxJQUFJO0FBQ3pCLEVBQUUsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxLQUFLO0FBQ2xDLEVBQUUsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU07QUFDdEIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sSUFBSTtBQUMvQixFQUFFLE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMxQixFQUFFLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQ2xCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDckI7QUFDQSxFQUFFLE9BQU8sR0FBRztBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sWUFBWSxHQUFHLENBQUMsVUFBVSxJQUFJO0FBQ3BDO0FBQ0EsRUFBRSxPQUFPLEtBQUssSUFBSTtBQUNsQixJQUFJLE9BQU8sVUFBVSxJQUFJLEtBQUssWUFBWSxVQUFVO0FBQ3BELEdBQUc7QUFDSCxDQUFDLEVBQUUsT0FBTyxVQUFVLEtBQUssV0FBVyxJQUFJLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sWUFBWSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSztBQUNsQyxFQUFFLE1BQU0sU0FBUyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7QUFFL0MsRUFBRSxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7QUFFdEMsRUFBRSxJQUFJLE1BQU07O0FBRVosRUFBRSxPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDckQsSUFBSSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSztBQUM3QixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLO0FBQ2xDLEVBQUUsSUFBSSxPQUFPO0FBQ2IsRUFBRSxNQUFNLEdBQUcsR0FBRyxFQUFFOztBQUVoQixFQUFFLE9BQU8sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUU7QUFDaEQsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUNyQjs7QUFFQSxFQUFFLE9BQU8sR0FBRztBQUNaOztBQUVBO0FBQ0EsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLGlCQUFpQixDQUFDOztBQUVoRCxNQUFNLFdBQVcsR0FBRyxHQUFHLElBQUk7QUFDM0IsRUFBRSxPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsdUJBQXVCO0FBQzFELElBQUksU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDakMsTUFBTSxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO0FBQ2xDO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQSxNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEtBQUssY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQzs7QUFFOUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDOztBQUVyQyxNQUFNLGlCQUFpQixHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sS0FBSztBQUM1QyxFQUFFLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUM7QUFDM0QsRUFBRSxNQUFNLGtCQUFrQixHQUFHLEVBQUU7O0FBRS9CLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLEtBQUs7QUFDN0MsSUFBSSxJQUFJLEdBQUc7QUFDWCxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sS0FBSyxFQUFFO0FBQzFELE1BQU0sa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLFVBQVU7QUFDbEQ7QUFDQSxHQUFHLENBQUM7O0FBRUosRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDO0FBQ2xEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxLQUFLO0FBQy9CLEVBQUUsaUJBQWlCLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksS0FBSztBQUMvQztBQUNBLElBQUksSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7QUFDbkYsTUFBTSxPQUFPLEtBQUs7QUFDbEI7O0FBRUEsSUFBSSxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDOztBQUUzQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7O0FBRTVCLElBQUksVUFBVSxDQUFDLFVBQVUsR0FBRyxLQUFLOztBQUVqQyxJQUFJLElBQUksVUFBVSxJQUFJLFVBQVUsRUFBRTtBQUNsQyxNQUFNLFVBQVUsQ0FBQyxRQUFRLEdBQUcsS0FBSztBQUNqQyxNQUFNO0FBQ047O0FBRUEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN6QixNQUFNLFVBQVUsQ0FBQyxHQUFHLEdBQUcsTUFBTTtBQUM3QixRQUFRLE1BQU0sS0FBSyxDQUFDLHFDQUFxQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7QUFDeEUsT0FBTztBQUNQO0FBQ0EsR0FBRyxDQUFDO0FBQ0o7O0FBRUEsTUFBTSxXQUFXLEdBQUcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxLQUFLO0FBQ2xELEVBQUUsTUFBTSxHQUFHLEdBQUcsRUFBRTs7QUFFaEIsRUFBRSxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSztBQUMxQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJO0FBQ3pCLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUk7QUFDdkIsS0FBSyxDQUFDO0FBQ047O0FBRUEsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVqRyxFQUFFLE9BQU8sR0FBRztBQUNaOztBQUVBLE1BQU0sSUFBSSxHQUFHLE1BQU07O0FBRW5CLE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxFQUFFLFlBQVksS0FBSztBQUNoRCxFQUFFLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxZQUFZO0FBQ2hGOztBQUVBLE1BQU0sS0FBSyxHQUFHOztBQUVkLE1BQU0sS0FBSyxHQUFHLFlBQVk7O0FBRTFCLE1BQU0sUUFBUSxHQUFHO0FBQ2pCLEVBQUUsS0FBSztBQUNQLEVBQUUsS0FBSztBQUNQLEVBQUUsV0FBVyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUc7QUFDN0M7O0FBRUEsTUFBTSxjQUFjLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsV0FBVyxLQUFLO0FBQ3ZFLEVBQUUsSUFBSSxHQUFHLEdBQUcsRUFBRTtBQUNkLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVE7QUFDM0IsRUFBRSxPQUFPLElBQUksRUFBRSxFQUFFO0FBQ2pCLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDNUM7O0FBRUEsRUFBRSxPQUFPLEdBQUc7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsbUJBQW1CLENBQUMsS0FBSyxFQUFFO0FBQ3BDLEVBQUUsT0FBTyxDQUFDLEVBQUUsS0FBSyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxVQUFVLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNwSDs7QUFFQSxNQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsS0FBSztBQUM5QixFQUFFLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQzs7QUFFN0IsRUFBRSxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUs7O0FBRS9CLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3RDLFFBQVE7QUFDUjs7QUFFQSxNQUFNLEdBQUcsRUFBRSxRQUFRLElBQUksTUFBTSxDQUFDLEVBQUU7QUFDaEMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTTtBQUN6QixRQUFRLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTs7QUFFaEQsUUFBUSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsS0FBSztBQUN4QyxVQUFVLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRCxVQUFVLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUM7QUFDcEUsU0FBUyxDQUFDOztBQUVWLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVM7O0FBRTVCLFFBQVEsT0FBTyxNQUFNO0FBQ3JCO0FBQ0E7O0FBRUEsSUFBSSxPQUFPLE1BQU07QUFDakI7O0FBRUEsRUFBRSxPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3RCOztBQUVBLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUM7O0FBRTdDLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBSztBQUN6QixFQUFFLEtBQUssS0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs7QUFFdEc7QUFDQTs7QUFFQSxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMscUJBQXFCLEVBQUUsb0JBQW9CLEtBQUs7QUFDeEUsRUFBRSxJQUFJLHFCQUFxQixFQUFFO0FBQzdCLElBQUksT0FBTyxZQUFZO0FBQ3ZCOztBQUVBLEVBQUUsT0FBTyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLFNBQVMsS0FBSztBQUN2RCxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSztBQUM1RCxNQUFNLElBQUksTUFBTSxLQUFLLE9BQU8sSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO0FBQ2hELFFBQVEsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUU7QUFDL0M7QUFDQSxLQUFLLEVBQUUsS0FBSyxDQUFDOztBQUViLElBQUksT0FBTyxDQUFDLEVBQUUsS0FBSztBQUNuQixNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO0FBQ3JDO0FBQ0EsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssVUFBVSxDQUFDLEVBQUUsQ0FBQztBQUMzRCxDQUFDO0FBQ0QsRUFBRSxPQUFPLFlBQVksS0FBSyxVQUFVO0FBQ3BDLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXO0FBQ2hDLENBQUM7O0FBRUQsTUFBTSxJQUFJLEdBQUcsT0FBTyxjQUFjLEtBQUssV0FBVztBQUNsRCxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDOztBQUV2Rzs7QUFFQSxjQUFlO0FBQ2YsRUFBRSxPQUFPO0FBQ1QsRUFBRSxhQUFhO0FBQ2YsRUFBRSxRQUFRO0FBQ1YsRUFBRSxVQUFVO0FBQ1osRUFBRSxpQkFBaUI7QUFDbkIsRUFBRSxRQUFRO0FBQ1YsRUFBRSxRQUFRO0FBQ1YsRUFBRSxTQUFTO0FBQ1gsRUFBRSxRQUFRO0FBQ1YsRUFBRSxhQUFhO0FBQ2YsRUFBRSxnQkFBZ0I7QUFDbEIsRUFBRSxTQUFTO0FBQ1gsRUFBRSxVQUFVO0FBQ1osRUFBRSxTQUFTO0FBQ1gsRUFBRSxXQUFXO0FBQ2IsRUFBRSxNQUFNO0FBQ1IsRUFBRSxNQUFNO0FBQ1IsRUFBRSxNQUFNO0FBQ1IsRUFBRSxRQUFRO0FBQ1YsRUFBRSxVQUFVO0FBQ1osRUFBRSxRQUFRO0FBQ1YsRUFBRSxpQkFBaUI7QUFDbkIsRUFBRSxZQUFZO0FBQ2QsRUFBRSxVQUFVO0FBQ1osRUFBRSxPQUFPO0FBQ1QsRUFBRSxLQUFLO0FBQ1AsRUFBRSxNQUFNO0FBQ1IsRUFBRSxJQUFJO0FBQ04sRUFBRSxRQUFRO0FBQ1YsRUFBRSxRQUFRO0FBQ1YsRUFBRSxZQUFZO0FBQ2QsRUFBRSxNQUFNO0FBQ1IsRUFBRSxVQUFVO0FBQ1osRUFBRSxRQUFRO0FBQ1YsRUFBRSxPQUFPO0FBQ1QsRUFBRSxZQUFZO0FBQ2QsRUFBRSxRQUFRO0FBQ1YsRUFBRSxVQUFVO0FBQ1osRUFBRSxjQUFjO0FBQ2hCLEVBQUUsVUFBVSxFQUFFLGNBQWM7QUFDNUIsRUFBRSxpQkFBaUI7QUFDbkIsRUFBRSxhQUFhO0FBQ2YsRUFBRSxXQUFXO0FBQ2IsRUFBRSxXQUFXO0FBQ2IsRUFBRSxJQUFJO0FBQ04sRUFBRSxjQUFjO0FBQ2hCLEVBQUUsT0FBTztBQUNULEVBQUUsTUFBTSxFQUFFLE9BQU87QUFDakIsRUFBRSxnQkFBZ0I7QUFDbEIsRUFBRSxRQUFRO0FBQ1YsRUFBRSxjQUFjO0FBQ2hCLEVBQUUsbUJBQW1CO0FBQ3JCLEVBQUUsWUFBWTtBQUNkLEVBQUUsU0FBUztBQUNYLEVBQUUsVUFBVTtBQUNaLEVBQUUsWUFBWSxFQUFFLGFBQWE7QUFDN0IsRUFBRTtBQUNGLENBQUM7O0FDbnZCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0MsWUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUU7QUFDOUQsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFFbEIsRUFBRSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtBQUMvQixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUNuRCxHQUFHLE1BQU07QUFDVCxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFLEtBQUs7QUFDcEM7O0FBRUEsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDeEIsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVk7QUFDMUIsRUFBRSxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDNUIsRUFBRSxNQUFNLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDbEMsRUFBRSxPQUFPLEtBQUssSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDckMsRUFBRSxJQUFJLFFBQVEsRUFBRTtBQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUTtBQUM1QixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUk7QUFDMUQ7QUFDQTs7QUFFQUMsT0FBSyxDQUFDLFFBQVEsQ0FBQ0QsWUFBVSxFQUFFLEtBQUssRUFBRTtBQUNsQyxFQUFFLE1BQU0sRUFBRSxTQUFTLE1BQU0sR0FBRztBQUM1QixJQUFJLE9BQU87QUFDWDtBQUNBLE1BQU0sT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO0FBQzNCLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0FBQ3JCO0FBQ0EsTUFBTSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7QUFDbkMsTUFBTSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07QUFDekI7QUFDQSxNQUFNLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtBQUM3QixNQUFNLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtBQUNqQyxNQUFNLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtBQUNyQyxNQUFNLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztBQUN2QjtBQUNBLE1BQU0sTUFBTSxFQUFFQyxPQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDN0MsTUFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7QUFDckIsTUFBTSxNQUFNLEVBQUUsSUFBSSxDQUFDO0FBQ25CLEtBQUs7QUFDTDtBQUNBLENBQUMsQ0FBQzs7QUFFRixNQUFNQyxXQUFTLEdBQUdGLFlBQVUsQ0FBQyxTQUFTO0FBQ3RDLE1BQU0sV0FBVyxHQUFHLEVBQUU7O0FBRXRCO0FBQ0EsRUFBRSxzQkFBc0I7QUFDeEIsRUFBRSxnQkFBZ0I7QUFDbEIsRUFBRSxjQUFjO0FBQ2hCLEVBQUUsV0FBVztBQUNiLEVBQUUsYUFBYTtBQUNmLEVBQUUsMkJBQTJCO0FBQzdCLEVBQUUsZ0JBQWdCO0FBQ2xCLEVBQUUsa0JBQWtCO0FBQ3BCLEVBQUUsaUJBQWlCO0FBQ25CLEVBQUUsY0FBYztBQUNoQixFQUFFLGlCQUFpQjtBQUNuQixFQUFFO0FBQ0Y7QUFDQSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSTtBQUNsQixFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7QUFDbkMsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQ0EsWUFBVSxFQUFFLFdBQVcsQ0FBQztBQUNoRCxNQUFNLENBQUMsY0FBYyxDQUFDRSxXQUFTLEVBQUUsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUUvRDtBQUNBRixZQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEtBQUs7QUFDM0UsRUFBRSxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDRSxXQUFTLENBQUM7O0FBRTdDLEVBQUVELE9BQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDN0QsSUFBSSxPQUFPLEdBQUcsS0FBSyxLQUFLLENBQUMsU0FBUztBQUNsQyxHQUFHLEVBQUUsSUFBSSxJQUFJO0FBQ2IsSUFBSSxPQUFPLElBQUksS0FBSyxjQUFjO0FBQ2xDLEdBQUcsQ0FBQzs7QUFFSixFQUFFRCxZQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQzs7QUFFN0UsRUFBRSxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUs7O0FBRTFCLEVBQUUsVUFBVSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSTs7QUFFOUIsRUFBRSxXQUFXLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDOztBQUV2RCxFQUFFLE9BQU8sVUFBVTtBQUNuQixDQUFDOztBQ3BHRDtBQUNBLGtCQUFlLElBQUk7O0FDTW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFO0FBQzVCLEVBQUUsT0FBT0MsT0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSUEsT0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDM0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGNBQWMsQ0FBQyxHQUFHLEVBQUU7QUFDN0IsRUFBRSxPQUFPQSxPQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHO0FBQzNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ3BDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEdBQUc7QUFDdkIsRUFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7QUFDdEQ7QUFDQSxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO0FBQ2pDLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSztBQUNqRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUU7QUFDMUIsRUFBRSxPQUFPQSxPQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDckQ7O0FBRUEsTUFBTSxVQUFVLEdBQUdBLE9BQUssQ0FBQyxZQUFZLENBQUNBLE9BQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRTtBQUM3RSxFQUFFLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDOUIsQ0FBQyxDQUFDOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNFLFlBQVUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUM1QyxFQUFFLElBQUksQ0FBQ0YsT0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUM1QixJQUFJLE1BQU0sSUFBSSxTQUFTLENBQUMsMEJBQTBCLENBQUM7QUFDbkQ7O0FBRUE7QUFDQSxFQUFFLFFBQVEsR0FBRyxRQUFRLElBQUksS0FBeUIsUUFBUSxHQUFHOztBQUU3RDtBQUNBLEVBQUUsT0FBTyxHQUFHQSxPQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRTtBQUN4QyxJQUFJLFVBQVUsRUFBRSxJQUFJO0FBQ3BCLElBQUksSUFBSSxFQUFFLEtBQUs7QUFDZixJQUFJLE9BQU8sRUFBRTtBQUNiLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUM3QztBQUNBLElBQUksT0FBTyxDQUFDQSxPQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QyxHQUFHLENBQUM7O0FBRUosRUFBRSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVTtBQUN2QztBQUNBLEVBQUUsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxjQUFjO0FBQ25ELEVBQUUsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUk7QUFDM0IsRUFBRSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTztBQUNqQyxFQUFFLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUk7QUFDbkUsRUFBRSxNQUFNLE9BQU8sR0FBRyxLQUFLLElBQUlBLE9BQUssQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7O0FBRTlELEVBQUUsSUFBSSxDQUFDQSxPQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ2xDLElBQUksTUFBTSxJQUFJLFNBQVMsQ0FBQyw0QkFBNEIsQ0FBQztBQUNyRDs7QUFFQSxFQUFFLFNBQVMsWUFBWSxDQUFDLEtBQUssRUFBRTtBQUMvQixJQUFJLElBQUksS0FBSyxLQUFLLElBQUksRUFBRSxPQUFPLEVBQUU7O0FBRWpDLElBQUksSUFBSUEsT0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM3QixNQUFNLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRTtBQUNoQzs7QUFFQSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUlBLE9BQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDekMsTUFBTSxNQUFNLElBQUlELFlBQVUsQ0FBQyw4Q0FBOEMsQ0FBQztBQUMxRTs7QUFFQSxJQUFJLElBQUlDLE9BQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUlBLE9BQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDakUsTUFBTSxPQUFPLE9BQU8sSUFBSSxPQUFPLElBQUksS0FBSyxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQzNGOztBQUVBLElBQUksT0FBTyxLQUFLO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxTQUFTLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUM1QyxJQUFJLElBQUksR0FBRyxHQUFHLEtBQUs7O0FBRW5CLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQ3JELE1BQU0sSUFBSUEsT0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDckM7QUFDQSxRQUFRLEdBQUcsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNqRDtBQUNBLFFBQVEsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0FBQ3JDLE9BQU8sTUFBTTtBQUNiLFFBQVEsQ0FBQ0EsT0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDO0FBQ25ELFNBQVMsQ0FBQ0EsT0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSUEsT0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHQSxPQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUM5RixTQUFTLEVBQUU7QUFDWDtBQUNBLFFBQVEsR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7O0FBRWpDLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFO0FBQzdDLFVBQVUsRUFBRUEsT0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU07QUFDcEU7QUFDQSxZQUFZLE9BQU8sS0FBSyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLE9BQU8sS0FBSyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7QUFDcEcsWUFBWSxZQUFZLENBQUMsRUFBRTtBQUMzQixXQUFXO0FBQ1gsU0FBUyxDQUFDO0FBQ1YsUUFBUSxPQUFPLEtBQUs7QUFDcEI7QUFDQTs7QUFFQSxJQUFJLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzVCLE1BQU0sT0FBTyxJQUFJO0FBQ2pCOztBQUVBLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXBFLElBQUksT0FBTyxLQUFLO0FBQ2hCOztBQUVBLEVBQUUsTUFBTSxLQUFLLEdBQUcsRUFBRTs7QUFFbEIsRUFBRSxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtBQUNuRCxJQUFJLGNBQWM7QUFDbEIsSUFBSSxZQUFZO0FBQ2hCLElBQUk7QUFDSixHQUFHLENBQUM7O0FBRUosRUFBRSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO0FBQzlCLElBQUksSUFBSUEsT0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTs7QUFFbEMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFO0FBQ3JDLE1BQU0sTUFBTSxLQUFLLENBQUMsaUNBQWlDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyRTs7QUFFQSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOztBQUVyQixJQUFJQSxPQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFO0FBQ2hELE1BQU0sTUFBTSxNQUFNLEdBQUcsRUFBRUEsT0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUk7QUFDNUUsUUFBUSxRQUFRLEVBQUUsRUFBRSxFQUFFQSxPQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ3BFLE9BQU87O0FBRVAsTUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFDM0IsUUFBUSxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEQ7QUFDQSxLQUFLLENBQUM7O0FBRU4sSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFO0FBQ2Y7O0FBRUEsRUFBRSxJQUFJLENBQUNBLE9BQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDNUIsSUFBSSxNQUFNLElBQUksU0FBUyxDQUFDLHdCQUF3QixDQUFDO0FBQ2pEOztBQUVBLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7QUFFWixFQUFFLE9BQU8sUUFBUTtBQUNqQjs7QUNwTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNHLFFBQU0sQ0FBQyxHQUFHLEVBQUU7QUFDckIsRUFBRSxNQUFNLE9BQU8sR0FBRztBQUNsQixJQUFJLEdBQUcsRUFBRSxLQUFLO0FBQ2QsSUFBSSxHQUFHLEVBQUUsS0FBSztBQUNkLElBQUksR0FBRyxFQUFFLEtBQUs7QUFDZCxJQUFJLEdBQUcsRUFBRSxLQUFLO0FBQ2QsSUFBSSxHQUFHLEVBQUUsS0FBSztBQUNkLElBQUksS0FBSyxFQUFFLEdBQUc7QUFDZCxJQUFJLEtBQUssRUFBRTtBQUNYLEdBQUc7QUFDSCxFQUFFLE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRTtBQUN0RixJQUFJLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQztBQUN6QixHQUFHLENBQUM7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFO0FBQy9DLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFOztBQUVsQixFQUFFLE1BQU0sSUFBSUQsWUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDO0FBQzdDOztBQUVBLE1BQU0sU0FBUyxHQUFHLG9CQUFvQixDQUFDLFNBQVM7O0FBRWhELFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUNoRCxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLENBQUM7O0FBRUQsU0FBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUU7QUFDaEQsRUFBRSxNQUFNLE9BQU8sR0FBRyxPQUFPLEdBQUcsU0FBUyxLQUFLLEVBQUU7QUFDNUMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRUMsUUFBTSxDQUFDO0FBQzVDLEdBQUcsR0FBR0EsUUFBTTs7QUFFWixFQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQzdDLElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEQsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbEIsQ0FBQzs7QUNsREQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNyQixFQUFFLE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUFDO0FBQ2hDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7QUFDekIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztBQUN4QixJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO0FBQ3pCLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7QUFDeEIsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztBQUN6QixJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFO0FBQ3ZEO0FBQ0EsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2YsSUFBSSxPQUFPLEdBQUc7QUFDZDtBQUNBO0FBQ0EsRUFBRSxNQUFNLE9BQU8sR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxNQUFNOztBQUVyRCxFQUFFLElBQUlILE9BQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDakMsSUFBSSxPQUFPLEdBQUc7QUFDZCxNQUFNLFNBQVMsRUFBRTtBQUNqQixLQUFLO0FBQ0wsR0FBRzs7QUFFSCxFQUFFLE1BQU0sV0FBVyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUzs7QUFFbEQsRUFBRSxJQUFJLGdCQUFnQjs7QUFFdEIsRUFBRSxJQUFJLFdBQVcsRUFBRTtBQUNuQixJQUFJLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO0FBQ25ELEdBQUcsTUFBTTtBQUNULElBQUksZ0JBQWdCLEdBQUdBLE9BQUssQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7QUFDdEQsTUFBTSxNQUFNLENBQUMsUUFBUSxFQUFFO0FBQ3ZCLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUNqRTs7QUFFQSxFQUFFLElBQUksZ0JBQWdCLEVBQUU7QUFDeEIsSUFBSSxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7QUFFMUMsSUFBSSxJQUFJLGFBQWEsS0FBSyxFQUFFLEVBQUU7QUFDOUIsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDO0FBQ3ZDO0FBQ0EsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLGdCQUFnQjtBQUNuRTs7QUFFQSxFQUFFLE9BQU8sR0FBRztBQUNaOztBQ2hFQSxNQUFNLGtCQUFrQixDQUFDO0FBQ3pCLEVBQUUsV0FBVyxHQUFHO0FBQ2hCLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUNwQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ3ZCLE1BQU0sU0FBUztBQUNmLE1BQU0sUUFBUTtBQUNkLE1BQU0sV0FBVyxFQUFFLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUs7QUFDeEQsTUFBTSxPQUFPLEVBQUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUc7QUFDM0MsS0FBSyxDQUFDO0FBQ04sSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7QUFDWixJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMzQixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSTtBQUM5QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLEtBQUssR0FBRztBQUNWLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ3ZCLE1BQU0sSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUU7QUFDZCxJQUFJQSxPQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxjQUFjLENBQUMsQ0FBQyxFQUFFO0FBQzVELE1BQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO0FBQ3RCLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNiO0FBQ0EsS0FBSyxDQUFDO0FBQ047QUFDQTs7QUNsRUEsMkJBQWU7QUFDZixFQUFFLGlCQUFpQixFQUFFLElBQUk7QUFDekIsRUFBRSxpQkFBaUIsRUFBRSxJQUFJO0FBQ3pCLEVBQUUsbUJBQW1CLEVBQUU7QUFDdkIsQ0FBQzs7QUNIRCx3QkFBZSxPQUFPLGVBQWUsS0FBSyxXQUFXLEdBQUcsZUFBZSxHQUFHLG9CQUFvQjs7QUNEOUYsaUJBQWUsT0FBTyxRQUFRLEtBQUssV0FBVyxHQUFHLFFBQVEsR0FBRyxJQUFJOztBQ0FoRSxhQUFlLE9BQU8sSUFBSSxLQUFLLFdBQVcsR0FBRyxJQUFJLEdBQUc7O0FDRXBELGlCQUFlO0FBQ2YsRUFBRSxTQUFTLEVBQUUsSUFBSTtBQUNqQixFQUFFLE9BQU8sRUFBRTtBQUNYLHFCQUFJSSxpQkFBZTtBQUNuQixjQUFJQyxVQUFRO0FBQ1osVUFBSUM7QUFDSixHQUFHO0FBQ0gsRUFBRSxTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU07QUFDNUQsQ0FBQzs7QUNaRCxNQUFNLGFBQWEsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVzs7QUFFdEYsTUFBTSxVQUFVLEdBQUcsT0FBTyxTQUFTLEtBQUssUUFBUSxJQUFJLFNBQVMsSUFBSSxTQUFTOztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxxQkFBcUIsR0FBRyxhQUFhO0FBQzNDLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUV4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDhCQUE4QixHQUFHLENBQUMsTUFBTTtBQUM5QyxFQUFFO0FBQ0YsSUFBSSxPQUFPLGlCQUFpQixLQUFLLFdBQVc7QUFDNUM7QUFDQSxJQUFJLElBQUksWUFBWSxpQkFBaUI7QUFDckMsSUFBSSxPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUs7QUFDbEM7QUFDQSxDQUFDLEdBQUc7O0FBRUosTUFBTSxNQUFNLEdBQUcsYUFBYSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLGtCQUFrQjs7Ozs7Ozs7Ozs7QUN2QzFFLGVBQWU7QUFDZixFQUFFLEdBQUcsS0FBSztBQUNWLEVBQUUsR0FBR0M7QUFDTDs7QUNBZSxTQUFTLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDeEQsRUFBRSxPQUFPTCxZQUFVLENBQUMsSUFBSSxFQUFFLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2hGLElBQUksT0FBTyxFQUFFLFNBQVMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ2pELE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxJQUFJRixPQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3BELFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNsRCxRQUFRLE9BQU8sS0FBSztBQUNwQjs7QUFFQSxNQUFNLE9BQU8sT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQztBQUMxRDtBQUNBLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNkOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxPQUFPQSxPQUFLLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJO0FBQzVELElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN4RCxHQUFHLENBQUM7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRTtBQUM1QixFQUFFLE1BQU0sR0FBRyxHQUFHLEVBQUU7QUFDaEIsRUFBRSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUMvQixFQUFFLElBQUksQ0FBQztBQUNQLEVBQUUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU07QUFDekIsRUFBRSxJQUFJLEdBQUc7QUFDVCxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDakIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUN2QjtBQUNBLEVBQUUsT0FBTyxHQUFHO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGNBQWMsQ0FBQyxRQUFRLEVBQUU7QUFDbEMsRUFBRSxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDakQsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRTVCLElBQUksSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFLE9BQU8sSUFBSTs7QUFFekMsSUFBSSxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQy9DLElBQUksTUFBTSxNQUFNLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNO0FBQ3ZDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJQSxPQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSTs7QUFFaEUsSUFBSSxJQUFJLE1BQU0sRUFBRTtBQUNoQixNQUFNLElBQUlBLE9BQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQzFDLFFBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQztBQUM1QyxPQUFPLE1BQU07QUFDYixRQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLO0FBQzVCOztBQUVBLE1BQU0sT0FBTyxDQUFDLFlBQVk7QUFDMUI7O0FBRUEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUNBLE9BQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDeEQsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUN2Qjs7QUFFQSxJQUFJLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUM7O0FBRTlELElBQUksSUFBSSxNQUFNLElBQUlBLE9BQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDL0MsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoRDs7QUFFQSxJQUFJLE9BQU8sQ0FBQyxZQUFZO0FBQ3hCOztBQUVBLEVBQUUsSUFBSUEsT0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSUEsT0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDeEUsSUFBSSxNQUFNLEdBQUcsR0FBRyxFQUFFOztBQUVsQixJQUFJQSxPQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEtBQUs7QUFDbEQsTUFBTSxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELEtBQUssQ0FBQzs7QUFFTixJQUFJLE9BQU8sR0FBRztBQUNkOztBQUVBLEVBQUUsT0FBTyxJQUFJO0FBQ2I7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxlQUFlLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUU7QUFDcEQsRUFBRSxJQUFJQSxPQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ2hDLElBQUksSUFBSTtBQUNSLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUM7QUFDdEMsTUFBTSxPQUFPQSxPQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNqQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDaEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO0FBQ3BDLFFBQVEsTUFBTSxDQUFDO0FBQ2Y7QUFDQTtBQUNBOztBQUVBLEVBQUUsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQztBQUM5Qzs7QUFFQSxNQUFNLFFBQVEsR0FBRzs7QUFFakIsRUFBRSxZQUFZLEVBQUUsb0JBQW9COztBQUVwQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDOztBQUVuQyxFQUFFLGdCQUFnQixFQUFFLENBQUMsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQzlELElBQUksTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUU7QUFDdEQsSUFBSSxNQUFNLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFO0FBQzNFLElBQUksTUFBTSxlQUFlLEdBQUdBLE9BQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDOztBQUVoRCxJQUFJLElBQUksZUFBZSxJQUFJQSxPQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ25ELE1BQU0sSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQztBQUMvQjs7QUFFQSxJQUFJLE1BQU0sVUFBVSxHQUFHQSxPQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzs7QUFFN0MsSUFBSSxJQUFJLFVBQVUsRUFBRTtBQUNwQixNQUFNLE9BQU8sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJO0FBQzdFOztBQUVBLElBQUksSUFBSUEsT0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7QUFDakMsTUFBTUEsT0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDMUIsTUFBTUEsT0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDMUIsTUFBTUEsT0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDeEIsTUFBTUEsT0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDeEIsTUFBTUEsT0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUk7QUFDakMsTUFBTTtBQUNOLE1BQU0sT0FBTyxJQUFJO0FBQ2pCO0FBQ0EsSUFBSSxJQUFJQSxPQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdkMsTUFBTSxPQUFPLElBQUksQ0FBQyxNQUFNO0FBQ3hCO0FBQ0EsSUFBSSxJQUFJQSxPQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdkMsTUFBTSxPQUFPLENBQUMsY0FBYyxDQUFDLGlEQUFpRCxFQUFFLEtBQUssQ0FBQztBQUN0RixNQUFNLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUM1Qjs7QUFFQSxJQUFJLElBQUksVUFBVTs7QUFFbEIsSUFBSSxJQUFJLGVBQWUsRUFBRTtBQUN6QixNQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtBQUN6RSxRQUFRLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLEVBQUU7QUFDckU7O0FBRUEsTUFBTSxJQUFJLENBQUMsVUFBVSxHQUFHQSxPQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFLEVBQUU7QUFDcEcsUUFBUSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUTs7QUFFdkQsUUFBUSxPQUFPRSxZQUFVO0FBQ3pCLFVBQVUsVUFBVSxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUk7QUFDL0MsVUFBVSxTQUFTLElBQUksSUFBSSxTQUFTLEVBQUU7QUFDdEMsVUFBVSxJQUFJLENBQUM7QUFDZixTQUFTO0FBQ1Q7QUFDQTs7QUFFQSxJQUFJLElBQUksZUFBZSxJQUFJLGtCQUFrQixHQUFHO0FBQ2hELE1BQU0sT0FBTyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUM7QUFDdkQsTUFBTSxPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUM7QUFDbEM7O0FBRUEsSUFBSSxPQUFPLElBQUk7QUFDZixHQUFHLENBQUM7O0FBRUosRUFBRSxpQkFBaUIsRUFBRSxDQUFDLFNBQVMsaUJBQWlCLENBQUMsSUFBSSxFQUFFO0FBQ3ZELElBQUksTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsWUFBWTtBQUNuRSxJQUFJLE1BQU0saUJBQWlCLEdBQUcsWUFBWSxJQUFJLFlBQVksQ0FBQyxpQkFBaUI7QUFDNUUsSUFBSSxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLE1BQU07O0FBRXRELElBQUksSUFBSUYsT0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSUEsT0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2hFLE1BQU0sT0FBTyxJQUFJO0FBQ2pCOztBQUVBLElBQUksSUFBSSxJQUFJLElBQUlBLE9BQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssYUFBYSxDQUFDLEVBQUU7QUFDdEcsTUFBTSxNQUFNLGlCQUFpQixHQUFHLFlBQVksSUFBSSxZQUFZLENBQUMsaUJBQWlCO0FBQzlFLE1BQU0sTUFBTSxpQkFBaUIsR0FBRyxDQUFDLGlCQUFpQixJQUFJLGFBQWE7O0FBRW5FLE1BQU0sSUFBSTtBQUNWLFFBQVEsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUMvQixPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDbEIsUUFBUSxJQUFJLGlCQUFpQixFQUFFO0FBQy9CLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtBQUN4QyxZQUFZLE1BQU1ELFlBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFQSxZQUFVLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQzVGO0FBQ0EsVUFBVSxNQUFNLENBQUM7QUFDakI7QUFDQTtBQUNBOztBQUVBLElBQUksT0FBTyxJQUFJO0FBQ2YsR0FBRyxDQUFDOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxPQUFPLEVBQUUsQ0FBQzs7QUFFWixFQUFFLGNBQWMsRUFBRSxZQUFZO0FBQzlCLEVBQUUsY0FBYyxFQUFFLGNBQWM7O0FBRWhDLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRTtBQUN0QixFQUFFLGFBQWEsRUFBRSxFQUFFOztBQUVuQixFQUFFLEdBQUcsRUFBRTtBQUNQLElBQUksUUFBUSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUTtBQUN2QyxJQUFJLElBQUksRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDO0FBQzNCLEdBQUc7O0FBRUgsRUFBRSxjQUFjLEVBQUUsU0FBUyxjQUFjLENBQUMsTUFBTSxFQUFFO0FBQ2xELElBQUksT0FBTyxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sR0FBRyxHQUFHO0FBQ3hDLEdBQUc7O0FBRUgsRUFBRSxPQUFPLEVBQUU7QUFDWCxJQUFJLE1BQU0sRUFBRTtBQUNaLE1BQU0sUUFBUSxFQUFFLG1DQUFtQztBQUNuRCxNQUFNLGNBQWMsRUFBRTtBQUN0QjtBQUNBO0FBQ0EsQ0FBQzs7QUFFREMsT0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUs7QUFDN0UsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDL0IsQ0FBQyxDQUFDOztBQzFKRjtBQUNBO0FBQ0EsTUFBTSxpQkFBaUIsR0FBR0EsT0FBSyxDQUFDLFdBQVcsQ0FBQztBQUM1QyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU07QUFDbEUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUI7QUFDdkUsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxxQkFBcUI7QUFDcEUsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFO0FBQzVCLENBQUMsQ0FBQzs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQWUsVUFBVSxJQUFJO0FBQzdCLEVBQUUsTUFBTSxNQUFNLEdBQUcsRUFBRTtBQUNuQixFQUFFLElBQUksR0FBRztBQUNULEVBQUUsSUFBSSxHQUFHO0FBQ1QsRUFBRSxJQUFJLENBQUM7O0FBRVAsRUFBRSxVQUFVLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQ3JFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtBQUNuRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7O0FBRXRDLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUN6RCxNQUFNO0FBQ047O0FBRUEsSUFBSSxJQUFJLEdBQUcsS0FBSyxZQUFZLEVBQUU7QUFDOUIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN2QixRQUFRLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQzdCLE9BQU8sTUFBTTtBQUNiLFFBQVEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0FBQzNCO0FBQ0EsS0FBSyxNQUFNO0FBQ1gsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFDaEU7QUFDQSxHQUFHLENBQUM7O0FBRUosRUFBRSxPQUFPLE1BQU07QUFDZixDQUFDOztBQ2pERCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDOztBQUV0QyxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUU7QUFDakMsRUFBRSxPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO0FBQ3REOztBQUVBLFNBQVMsY0FBYyxDQUFDLEtBQUssRUFBRTtBQUMvQixFQUFFLElBQUksS0FBSyxLQUFLLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO0FBQ3hDLElBQUksT0FBTyxLQUFLO0FBQ2hCOztBQUVBLEVBQUUsT0FBT0EsT0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDekU7O0FBRUEsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFO0FBQzFCLEVBQUUsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDcEMsRUFBRSxNQUFNLFFBQVEsR0FBRyxrQ0FBa0M7QUFDckQsRUFBRSxJQUFJLEtBQUs7O0FBRVgsRUFBRSxRQUFRLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHO0FBQ3ZDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDL0I7O0FBRUEsRUFBRSxPQUFPLE1BQU07QUFDZjs7QUFFQSxNQUFNLGlCQUFpQixHQUFHLENBQUMsR0FBRyxLQUFLLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRXBGLFNBQVMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFO0FBQzlFLEVBQUUsSUFBSUEsT0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNoQyxJQUFJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQztBQUMzQzs7QUFFQSxFQUFFLElBQUksa0JBQWtCLEVBQUU7QUFDMUIsSUFBSSxLQUFLLEdBQUcsTUFBTTtBQUNsQjs7QUFFQSxFQUFFLElBQUksQ0FBQ0EsT0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTs7QUFFOUIsRUFBRSxJQUFJQSxPQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQzlCLElBQUksT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7QUFDdkM7O0FBRUEsRUFBRSxJQUFJQSxPQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQzlCLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUM3QjtBQUNBOztBQUVBLFNBQVMsWUFBWSxDQUFDLE1BQU0sRUFBRTtBQUM5QixFQUFFLE9BQU8sTUFBTSxDQUFDLElBQUk7QUFDcEIsS0FBSyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSztBQUNoRSxNQUFNLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUc7QUFDckMsS0FBSyxDQUFDO0FBQ047O0FBRUEsU0FBUyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNyQyxFQUFFLE1BQU0sWUFBWSxHQUFHQSxPQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7O0FBRXRELEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUk7QUFDOUMsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxVQUFVLEdBQUcsWUFBWSxFQUFFO0FBQzFELE1BQU0sS0FBSyxFQUFFLFNBQVMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDeEMsUUFBUSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztBQUNwRSxPQUFPO0FBQ1AsTUFBTSxZQUFZLEVBQUU7QUFDcEIsS0FBSyxDQUFDO0FBQ04sR0FBRyxDQUFDO0FBQ0o7O3FCQUVBLE1BQU0sWUFBWSxDQUFDO0FBQ25CLEVBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUN2QixJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUNoQzs7QUFFQSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRTtBQUN2QyxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUk7O0FBRXJCLElBQUksU0FBUyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUU7QUFDbEQsTUFBTSxNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDOztBQUU5QyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDcEIsUUFBUSxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDO0FBQ2pFOztBQUVBLE1BQU0sTUFBTSxHQUFHLEdBQUdBLE9BQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQzs7QUFFOUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUksS0FBSyxRQUFRLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtBQUNsSCxRQUFRLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztBQUNyRDtBQUNBOztBQUVBLElBQUksTUFBTSxVQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUTtBQUN6QyxNQUFNQSxPQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEtBQUssU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7O0FBRXZGLElBQUksSUFBSUEsT0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLFlBQVksSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUMzRSxNQUFNLFVBQVUsQ0FBQyxNQUFNLEVBQUUsY0FBYztBQUN2QyxLQUFLLE1BQU0sR0FBR0EsT0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNoRyxNQUFNLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsY0FBYyxDQUFDO0FBQ3RELEtBQUssTUFBTSxJQUFJQSxPQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ3hDLE1BQU0sS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRTtBQUNuRCxRQUFRLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQztBQUN0QztBQUNBLEtBQUssTUFBTTtBQUNYLE1BQU0sTUFBTSxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFDbEU7O0FBRUEsSUFBSSxPQUFPLElBQUk7QUFDZjs7QUFFQSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3RCLElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7O0FBRXBDLElBQUksSUFBSSxNQUFNLEVBQUU7QUFDaEIsTUFBTSxNQUFNLEdBQUcsR0FBR0EsT0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDOztBQUU3QyxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ2YsUUFBUSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDOztBQUUvQixRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDckIsVUFBVSxPQUFPLEtBQUs7QUFDdEI7O0FBRUEsUUFBUSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFDN0IsVUFBVSxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDbkM7O0FBRUEsUUFBUSxJQUFJQSxPQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ3RDLFVBQVUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDO0FBQzlDOztBQUVBLFFBQVEsSUFBSUEsT0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNwQyxVQUFVLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDbkM7O0FBRUEsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHdDQUF3QyxDQUFDO0FBQ3JFO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFO0FBQ3ZCLElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7O0FBRXBDLElBQUksSUFBSSxNQUFNLEVBQUU7QUFDaEIsTUFBTSxNQUFNLEdBQUcsR0FBR0EsT0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDOztBQUU3QyxNQUFNLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxLQUFLLENBQUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDaEg7O0FBRUEsSUFBSSxPQUFPLEtBQUs7QUFDaEI7O0FBRUEsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRTtBQUMxQixJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUk7QUFDckIsSUFBSSxJQUFJLE9BQU8sR0FBRyxLQUFLOztBQUV2QixJQUFJLFNBQVMsWUFBWSxDQUFDLE9BQU8sRUFBRTtBQUNuQyxNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDOztBQUV4QyxNQUFNLElBQUksT0FBTyxFQUFFO0FBQ25CLFFBQVEsTUFBTSxHQUFHLEdBQUdBLE9BQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQzs7QUFFaEQsUUFBUSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFO0FBQ2xGLFVBQVUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDOztBQUUxQixVQUFVLE9BQU8sR0FBRyxJQUFJO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLElBQUlBLE9BQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDL0IsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztBQUNsQyxLQUFLLE1BQU07QUFDWCxNQUFNLFlBQVksQ0FBQyxNQUFNLENBQUM7QUFDMUI7O0FBRUEsSUFBSSxPQUFPLE9BQU87QUFDbEI7O0FBRUEsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFO0FBQ2pCLElBQUksTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDbEMsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTTtBQUN2QixJQUFJLElBQUksT0FBTyxHQUFHLEtBQUs7O0FBRXZCLElBQUksT0FBTyxDQUFDLEVBQUUsRUFBRTtBQUNoQixNQUFNLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDekIsTUFBTSxHQUFHLENBQUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTtBQUM1RSxRQUFRLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUN4QixRQUFRLE9BQU8sR0FBRyxJQUFJO0FBQ3RCO0FBQ0E7O0FBRUEsSUFBSSxPQUFPLE9BQU87QUFDbEI7O0FBRUEsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ3BCLElBQUksTUFBTSxJQUFJLEdBQUcsSUFBSTtBQUNyQixJQUFJLE1BQU0sT0FBTyxHQUFHLEVBQUU7O0FBRXRCLElBQUlBLE9BQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sS0FBSztBQUMzQyxNQUFNLE1BQU0sR0FBRyxHQUFHQSxPQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7O0FBRWhELE1BQU0sSUFBSSxHQUFHLEVBQUU7QUFDZixRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO0FBQ3pDLFFBQVEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLFFBQVE7QUFDUjs7QUFFQSxNQUFNLE1BQU0sVUFBVSxHQUFHLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRTs7QUFFOUUsTUFBTSxJQUFJLFVBQVUsS0FBSyxNQUFNLEVBQUU7QUFDakMsUUFBUSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDM0I7O0FBRUEsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQzs7QUFFOUMsTUFBTSxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSTtBQUNoQyxLQUFLLENBQUM7O0FBRU4sSUFBSSxPQUFPLElBQUk7QUFDZjs7QUFFQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLE9BQU8sRUFBRTtBQUNyQixJQUFJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDO0FBQ3BEOztBQUVBLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRTtBQUNwQixJQUFJLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDOztBQUVuQyxJQUFJQSxPQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEtBQUs7QUFDM0MsTUFBTSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsSUFBSUEsT0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUN0SCxLQUFLLENBQUM7O0FBRU4sSUFBSSxPQUFPLEdBQUc7QUFDZDs7QUFFQSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHO0FBQ3RCLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUMzRDs7QUFFQSxFQUFFLFFBQVEsR0FBRztBQUNiLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNuRzs7QUFFQSxFQUFFLEtBQUssTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHO0FBQzdCLElBQUksT0FBTyxjQUFjO0FBQ3pCOztBQUVBLEVBQUUsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ3JCLElBQUksT0FBTyxLQUFLLFlBQVksSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDMUQ7O0FBRUEsRUFBRSxPQUFPLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxPQUFPLEVBQUU7QUFDbkMsSUFBSSxNQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7O0FBRXBDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUVyRCxJQUFJLE9BQU8sUUFBUTtBQUNuQjs7QUFFQSxFQUFFLE9BQU8sUUFBUSxDQUFDLE1BQU0sRUFBRTtBQUMxQixJQUFJLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUc7QUFDN0QsTUFBTSxTQUFTLEVBQUU7QUFDakIsS0FBSyxDQUFDOztBQUVOLElBQUksTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVM7QUFDekMsSUFBSSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUzs7QUFFcEMsSUFBSSxTQUFTLGNBQWMsQ0FBQyxPQUFPLEVBQUU7QUFDckMsTUFBTSxNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDOztBQUU5QyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDL0IsUUFBUSxjQUFjLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztBQUMxQyxRQUFRLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJO0FBQ2pDO0FBQ0E7O0FBRUEsSUFBSUEsT0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7O0FBRW5GLElBQUksT0FBTyxJQUFJO0FBQ2Y7QUFDQTs7QUFFQVEsY0FBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDOztBQUVySDtBQUNBUixPQUFLLENBQUMsaUJBQWlCLENBQUNRLGNBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsS0FBSztBQUNsRSxFQUFFLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25ELEVBQUUsT0FBTztBQUNULElBQUksR0FBRyxFQUFFLE1BQU0sS0FBSztBQUNwQixJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUU7QUFDckIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsV0FBVztBQUNoQztBQUNBO0FBQ0EsQ0FBQyxDQUFDOztBQUVGUixPQUFLLENBQUMsYUFBYSxDQUFDUSxjQUFZLENBQUM7O0FDclNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2UsU0FBUyxhQUFhLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRTtBQUNyRCxFQUFFLE1BQU0sTUFBTSxHQUFHLElBQUksSUFBSSxRQUFRO0FBQ2pDLEVBQUUsTUFBTSxPQUFPLEdBQUcsUUFBUSxJQUFJLE1BQU07QUFDcEMsRUFBRSxNQUFNLE9BQU8sR0FBR0EsY0FBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ3BELEVBQUUsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUk7O0FBRXpCLEVBQUVSLE9BQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsU0FBUyxDQUFDLEVBQUUsRUFBRTtBQUM1QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUM3RixHQUFHLENBQUM7O0FBRUosRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFOztBQUVyQixFQUFFLE9BQU8sSUFBSTtBQUNiOztBQ3pCZSxTQUFTUyxVQUFRLENBQUMsS0FBSyxFQUFFO0FBQ3hDLEVBQUUsT0FBTyxDQUFDLEVBQUUsS0FBSyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUM7QUFDdEM7O0FDQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0MsZUFBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFO0FBQ2pEO0FBQ0EsRUFBRVgsWUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxJQUFJLElBQUksR0FBRyxVQUFVLEdBQUcsT0FBTyxFQUFFQSxZQUFVLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFDekcsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWU7QUFDN0I7O0FBRUFDLE9BQUssQ0FBQyxRQUFRLENBQUNVLGVBQWEsRUFBRVgsWUFBVSxFQUFFO0FBQzFDLEVBQUUsVUFBVSxFQUFFO0FBQ2QsQ0FBQyxDQUFDOztBQ2xCRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSxTQUFTLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUMxRCxFQUFFLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYztBQUN2RCxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsY0FBYyxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDOUUsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ3JCLEdBQUcsTUFBTTtBQUNULElBQUksTUFBTSxDQUFDLElBQUlBLFlBQVU7QUFDekIsTUFBTSxrQ0FBa0MsR0FBRyxRQUFRLENBQUMsTUFBTTtBQUMxRCxNQUFNLENBQUNBLFlBQVUsQ0FBQyxlQUFlLEVBQUVBLFlBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEcsTUFBTSxRQUFRLENBQUMsTUFBTTtBQUNyQixNQUFNLFFBQVEsQ0FBQyxPQUFPO0FBQ3RCLE1BQU07QUFDTixLQUFLLENBQUM7QUFDTjtBQUNBOztBQ3hCZSxTQUFTLGFBQWEsQ0FBQyxHQUFHLEVBQUU7QUFDM0MsRUFBRSxNQUFNLEtBQUssR0FBRywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3JELEVBQUUsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7QUFDaEM7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxXQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtBQUN4QyxFQUFFLFlBQVksR0FBRyxZQUFZLElBQUksRUFBRTtBQUNuQyxFQUFFLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN2QyxFQUFFLE1BQU0sVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQztBQUM1QyxFQUFFLElBQUksSUFBSSxHQUFHLENBQUM7QUFDZCxFQUFFLElBQUksSUFBSSxHQUFHLENBQUM7QUFDZCxFQUFFLElBQUksYUFBYTs7QUFFbkIsRUFBRSxHQUFHLEdBQUcsR0FBRyxLQUFLLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSTs7QUFFdEMsRUFBRSxPQUFPLFNBQVMsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7O0FBRTFCLElBQUksTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQzs7QUFFdEMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQ3hCLE1BQU0sYUFBYSxHQUFHLEdBQUc7QUFDekI7O0FBRUEsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVztBQUM3QixJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHOztBQUUxQixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUk7QUFDaEIsSUFBSSxJQUFJLFVBQVUsR0FBRyxDQUFDOztBQUV0QixJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRTtBQUN2QixNQUFNLFVBQVUsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVk7QUFDMUI7O0FBRUEsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLFlBQVk7O0FBRXBDLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQ3ZCLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxZQUFZO0FBQ3RDOztBQUVBLElBQUksSUFBSSxHQUFHLEdBQUcsYUFBYSxHQUFHLEdBQUcsRUFBRTtBQUNuQyxNQUFNO0FBQ047O0FBRUEsSUFBSSxNQUFNLE1BQU0sR0FBRyxTQUFTLElBQUksR0FBRyxHQUFHLFNBQVM7O0FBRS9DLElBQUksT0FBTyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLFNBQVM7QUFDdEUsR0FBRztBQUNIOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFO0FBQzVCLEVBQUUsSUFBSSxTQUFTLEdBQUcsQ0FBQztBQUNuQixFQUFFLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxJQUFJO0FBQzdCLEVBQUUsSUFBSSxRQUFRO0FBQ2QsRUFBRSxJQUFJLEtBQUs7O0FBRVgsRUFBRSxNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLO0FBQzdDLElBQUksU0FBUyxHQUFHLEdBQUc7QUFDbkIsSUFBSSxRQUFRLEdBQUcsSUFBSTtBQUNuQixJQUFJLElBQUksS0FBSyxFQUFFO0FBQ2YsTUFBTSxZQUFZLENBQUMsS0FBSyxDQUFDO0FBQ3pCLE1BQU0sS0FBSyxHQUFHLElBQUk7QUFDbEI7QUFDQSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztBQUN4Qjs7QUFFQSxFQUFFLE1BQU0sU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUs7QUFDakMsSUFBSSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQzFCLElBQUksTUFBTSxNQUFNLEdBQUcsR0FBRyxHQUFHLFNBQVM7QUFDbEMsSUFBSSxLQUFLLE1BQU0sSUFBSSxTQUFTLEVBQUU7QUFDOUIsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztBQUN2QixLQUFLLE1BQU07QUFDWCxNQUFNLFFBQVEsR0FBRyxJQUFJO0FBQ3JCLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNsQixRQUFRLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTTtBQUNqQyxVQUFVLEtBQUssR0FBRyxJQUFJO0FBQ3RCLFVBQVUsTUFBTSxDQUFDLFFBQVE7QUFDekIsU0FBUyxFQUFFLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDOUI7QUFDQTtBQUNBOztBQUVBLEVBQUUsTUFBTSxLQUFLLEdBQUcsTUFBTSxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQzs7QUFFbEQsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztBQUMzQjs7QUNyQ08sTUFBTSxvQkFBb0IsR0FBRyxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEdBQUcsQ0FBQyxLQUFLO0FBQzlFLEVBQUUsSUFBSSxhQUFhLEdBQUcsQ0FBQztBQUN2QixFQUFFLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDOztBQUUzQyxFQUFFLE9BQU8sUUFBUSxDQUFDLENBQUMsSUFBSTtBQUN2QixJQUFJLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNO0FBQzNCLElBQUksTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsU0FBUztBQUMxRCxJQUFJLE1BQU0sYUFBYSxHQUFHLE1BQU0sR0FBRyxhQUFhO0FBQ2hELElBQUksTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQztBQUM1QyxJQUFJLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxLQUFLOztBQUVuQyxJQUFJLGFBQWEsR0FBRyxNQUFNOztBQUUxQixJQUFJLE1BQU0sSUFBSSxHQUFHO0FBQ2pCLE1BQU0sTUFBTTtBQUNaLE1BQU0sS0FBSztBQUNYLE1BQU0sUUFBUSxFQUFFLEtBQUssSUFBSSxNQUFNLEdBQUcsS0FBSyxJQUFJLFNBQVM7QUFDcEQsTUFBTSxLQUFLLEVBQUUsYUFBYTtBQUMxQixNQUFNLElBQUksRUFBRSxJQUFJLEdBQUcsSUFBSSxHQUFHLFNBQVM7QUFDbkMsTUFBTSxTQUFTLEVBQUUsSUFBSSxJQUFJLEtBQUssSUFBSSxPQUFPLEdBQUcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxJQUFJLElBQUksR0FBRyxTQUFTO0FBQy9FLE1BQU0sS0FBSyxFQUFFLENBQUM7QUFDZCxNQUFNLGdCQUFnQixFQUFFLEtBQUssSUFBSSxJQUFJO0FBQ3JDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLEdBQUcsUUFBUSxHQUFHO0FBQ2xELEtBQUs7O0FBRUwsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUM7QUFDVjs7QUFFTyxNQUFNLHNCQUFzQixHQUFHLENBQUMsS0FBSyxFQUFFLFNBQVMsS0FBSztBQUM1RCxFQUFFLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxJQUFJLElBQUk7O0FBRXhDLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxJQUFJLGdCQUFnQjtBQUNwQixJQUFJLEtBQUs7QUFDVCxJQUFJO0FBQ0osR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25COztBQUVPLE1BQU0sY0FBYyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUtDLE9BQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzs7QUN6Q2hGLHNCQUFlLFFBQVEsQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sS0FBSyxDQUFDLEdBQUcsS0FBSztBQUM5RSxFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQzs7QUFFckMsRUFBRTtBQUNGLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsUUFBUTtBQUNwQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUk7QUFDNUIsS0FBSyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSTtBQUN2QztBQUNBLENBQUM7QUFDRCxFQUFFLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDMUIsRUFBRSxRQUFRLENBQUMsU0FBUyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVM7QUFDM0UsQ0FBQyxHQUFHLE1BQU0sSUFBSTs7QUNWZCxjQUFlLFFBQVEsQ0FBQyxxQkFBcUI7O0FBRTdDO0FBQ0EsRUFBRTtBQUNGLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3RELE1BQU0sTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUU3RCxNQUFNQSxPQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDOztBQUUxRixNQUFNQSxPQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7QUFFekQsTUFBTUEsT0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7O0FBRS9ELE1BQU0sTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7QUFFOUMsTUFBTSxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3pDLEtBQUs7O0FBRUwsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ2YsTUFBTSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDO0FBQ3hGLE1BQU0sUUFBUSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSTtBQUN6RCxLQUFLOztBQUVMLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtBQUNqQixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFDO0FBQ2pEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxFQUFFO0FBQ0YsSUFBSSxLQUFLLEdBQUcsRUFBRTtBQUNkLElBQUksSUFBSSxHQUFHO0FBQ1gsTUFBTSxPQUFPLElBQUk7QUFDakIsS0FBSztBQUNMLElBQUksTUFBTSxHQUFHO0FBQ2IsR0FBRzs7QUN0Q0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSxTQUFTLGFBQWEsQ0FBQyxHQUFHLEVBQUU7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsRUFBRSxPQUFPLDZCQUE2QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDaEQ7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUU7QUFDMUQsRUFBRSxPQUFPO0FBQ1QsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRTtBQUMxRSxNQUFNLE9BQU87QUFDYjs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLFNBQVMsYUFBYSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDN0QsRUFBRSxJQUFJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBRTtBQUMvQyxJQUFJLE9BQU8sV0FBVyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7QUFDN0M7QUFDQSxFQUFFLE9BQU8sWUFBWTtBQUNyQjs7QUNmQSxNQUFNLGVBQWUsR0FBRyxDQUFDLEtBQUssS0FBSyxLQUFLLFlBQVlRLGNBQVksR0FBRyxFQUFFLEdBQUcsS0FBSyxFQUFFLEdBQUcsS0FBSzs7QUFFdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2UsU0FBU0csYUFBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUU7QUFDdEQ7QUFDQSxFQUFFLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRTtBQUN6QixFQUFFLE1BQU0sTUFBTSxHQUFHLEVBQUU7O0FBRW5CLEVBQUUsU0FBUyxjQUFjLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQzFELElBQUksSUFBSVgsT0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSUEsT0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNwRSxNQUFNLE9BQU9BLE9BQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztBQUN6RCxLQUFLLE1BQU0sSUFBSUEsT0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUM1QyxNQUFNLE9BQU9BLE9BQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQztBQUNwQyxLQUFLLE1BQU0sSUFBSUEsT0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUN0QyxNQUFNLE9BQU8sTUFBTSxDQUFDLEtBQUssRUFBRTtBQUMzQjtBQUNBLElBQUksT0FBTyxNQUFNO0FBQ2pCOztBQUVBO0FBQ0EsRUFBRSxTQUFTLG1CQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLFFBQVEsRUFBRTtBQUN0RCxJQUFJLElBQUksQ0FBQ0EsT0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUMvQixNQUFNLE9BQU8sY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQztBQUNsRCxLQUFLLE1BQU0sSUFBSSxDQUFDQSxPQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3RDLE1BQU0sT0FBTyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDO0FBQzFEO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLFNBQVMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNsQyxJQUFJLElBQUksQ0FBQ0EsT0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUMvQixNQUFNLE9BQU8sY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDekM7QUFDQTs7QUFFQTtBQUNBLEVBQUUsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2xDLElBQUksSUFBSSxDQUFDQSxPQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQy9CLE1BQU0sT0FBTyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUN6QyxLQUFLLE1BQU0sSUFBSSxDQUFDQSxPQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3RDLE1BQU0sT0FBTyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUN6QztBQUNBOztBQUVBO0FBQ0EsRUFBRSxTQUFTLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRTtBQUN2QyxJQUFJLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRTtBQUN6QixNQUFNLE9BQU8sY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDakMsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRTtBQUNoQyxNQUFNLE9BQU8sY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDekM7QUFDQTs7QUFFQSxFQUFFLE1BQU0sUUFBUSxHQUFHO0FBQ25CLElBQUksR0FBRyxFQUFFLGdCQUFnQjtBQUN6QixJQUFJLE1BQU0sRUFBRSxnQkFBZ0I7QUFDNUIsSUFBSSxJQUFJLEVBQUUsZ0JBQWdCO0FBQzFCLElBQUksT0FBTyxFQUFFLGdCQUFnQjtBQUM3QixJQUFJLGdCQUFnQixFQUFFLGdCQUFnQjtBQUN0QyxJQUFJLGlCQUFpQixFQUFFLGdCQUFnQjtBQUN2QyxJQUFJLGdCQUFnQixFQUFFLGdCQUFnQjtBQUN0QyxJQUFJLE9BQU8sRUFBRSxnQkFBZ0I7QUFDN0IsSUFBSSxjQUFjLEVBQUUsZ0JBQWdCO0FBQ3BDLElBQUksZUFBZSxFQUFFLGdCQUFnQjtBQUNyQyxJQUFJLGFBQWEsRUFBRSxnQkFBZ0I7QUFDbkMsSUFBSSxPQUFPLEVBQUUsZ0JBQWdCO0FBQzdCLElBQUksWUFBWSxFQUFFLGdCQUFnQjtBQUNsQyxJQUFJLGNBQWMsRUFBRSxnQkFBZ0I7QUFDcEMsSUFBSSxjQUFjLEVBQUUsZ0JBQWdCO0FBQ3BDLElBQUksZ0JBQWdCLEVBQUUsZ0JBQWdCO0FBQ3RDLElBQUksa0JBQWtCLEVBQUUsZ0JBQWdCO0FBQ3hDLElBQUksVUFBVSxFQUFFLGdCQUFnQjtBQUNoQyxJQUFJLGdCQUFnQixFQUFFLGdCQUFnQjtBQUN0QyxJQUFJLGFBQWEsRUFBRSxnQkFBZ0I7QUFDbkMsSUFBSSxjQUFjLEVBQUUsZ0JBQWdCO0FBQ3BDLElBQUksU0FBUyxFQUFFLGdCQUFnQjtBQUMvQixJQUFJLFNBQVMsRUFBRSxnQkFBZ0I7QUFDL0IsSUFBSSxVQUFVLEVBQUUsZ0JBQWdCO0FBQ2hDLElBQUksV0FBVyxFQUFFLGdCQUFnQjtBQUNqQyxJQUFJLFVBQVUsRUFBRSxnQkFBZ0I7QUFDaEMsSUFBSSxnQkFBZ0IsRUFBRSxnQkFBZ0I7QUFDdEMsSUFBSSxjQUFjLEVBQUUsZUFBZTtBQUNuQyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxLQUFLLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUk7QUFDbkcsR0FBRzs7QUFFSCxFQUFFQSxPQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsU0FBUyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUU7QUFDcEcsSUFBSSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQW1CO0FBQ3ZELElBQUksTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDO0FBQ2pFLElBQUksQ0FBQ0EsT0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLEtBQUssZUFBZSxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUM7QUFDakcsR0FBRyxDQUFDOztBQUVKLEVBQUUsT0FBTyxNQUFNO0FBQ2Y7O0FDaEdBLG9CQUFlLENBQUMsTUFBTSxLQUFLO0FBQzNCLEVBQUUsTUFBTSxTQUFTLEdBQUdXLGFBQVcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDOztBQUUzQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLFNBQVM7O0FBRXRGLEVBQUUsU0FBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUdILGNBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOztBQUUxRCxFQUFFLFNBQVMsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs7QUFFbkg7QUFDQSxFQUFFLElBQUksSUFBSSxFQUFFO0FBQ1osSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxRQUFRO0FBQ3pDLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMzRyxLQUFLO0FBQ0w7O0FBRUEsRUFBRSxJQUFJLFdBQVc7O0FBRWpCLEVBQUUsSUFBSVIsT0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM5QixJQUFJLElBQUksUUFBUSxDQUFDLHFCQUFxQixJQUFJLFFBQVEsQ0FBQyw4QkFBOEIsRUFBRTtBQUNuRixNQUFNLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEMsS0FBSyxNQUFNLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLEtBQUssRUFBRTtBQUNuRTtBQUNBLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLFdBQVcsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDcEgsTUFBTSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxJQUFJLHFCQUFxQixFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25GO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEVBQUUsSUFBSSxRQUFRLENBQUMscUJBQXFCLEVBQUU7QUFDdEMsSUFBSSxhQUFhLElBQUlBLE9BQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssYUFBYSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEcsSUFBSSxJQUFJLGFBQWEsS0FBSyxhQUFhLEtBQUssS0FBSyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUN0RjtBQUNBLE1BQU0sTUFBTSxTQUFTLEdBQUcsY0FBYyxJQUFJLGNBQWMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQzs7QUFFeEYsTUFBTSxJQUFJLFNBQVMsRUFBRTtBQUNyQixRQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQztBQUM5QztBQUNBO0FBQ0E7O0FBRUEsRUFBRSxPQUFPLFNBQVM7QUFDbEI7O0FDNUNBLE1BQU0scUJBQXFCLEdBQUcsT0FBTyxjQUFjLEtBQUssV0FBVzs7QUFFbkUsaUJBQWUscUJBQXFCLElBQUksVUFBVSxNQUFNLEVBQUU7QUFDMUQsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUNsRSxJQUFJLE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7QUFDekMsSUFBSSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSTtBQUNsQyxJQUFJLE1BQU0sY0FBYyxHQUFHUSxjQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUU7QUFDekUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDLEdBQUcsT0FBTztBQUN0RSxJQUFJLElBQUksVUFBVTtBQUNsQixJQUFJLElBQUksZUFBZSxFQUFFLGlCQUFpQjtBQUMxQyxJQUFJLElBQUksV0FBVyxFQUFFLGFBQWE7O0FBRWxDLElBQUksU0FBUyxJQUFJLEdBQUc7QUFDcEIsTUFBTSxXQUFXLElBQUksV0FBVyxFQUFFLENBQUM7QUFDbkMsTUFBTSxhQUFhLElBQUksYUFBYSxFQUFFLENBQUM7O0FBRXZDLE1BQU0sT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7O0FBRXhFLE1BQU0sT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7QUFDL0U7O0FBRUEsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRTs7QUFFdEMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7O0FBRWpFO0FBQ0EsSUFBSSxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPOztBQUVyQyxJQUFJLFNBQVMsU0FBUyxHQUFHO0FBQ3pCLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNwQixRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU0sTUFBTSxlQUFlLEdBQUdBLGNBQVksQ0FBQyxJQUFJO0FBQy9DLFFBQVEsdUJBQXVCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxxQkFBcUI7QUFDM0UsT0FBTztBQUNQLE1BQU0sTUFBTSxZQUFZLEdBQUcsQ0FBQyxZQUFZLElBQUksWUFBWSxLQUFLLE1BQU0sSUFBSSxZQUFZLEtBQUssTUFBTTtBQUM5RixRQUFRLE9BQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFFBQVE7QUFDL0MsTUFBTSxNQUFNLFFBQVEsR0FBRztBQUN2QixRQUFRLElBQUksRUFBRSxZQUFZO0FBQzFCLFFBQVEsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO0FBQzlCLFFBQVEsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO0FBQ3RDLFFBQVEsT0FBTyxFQUFFLGVBQWU7QUFDaEMsUUFBUSxNQUFNO0FBQ2QsUUFBUTtBQUNSLE9BQU87O0FBRVAsTUFBTSxNQUFNLENBQUMsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQ3RDLFFBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUN0QixRQUFRLElBQUksRUFBRTtBQUNkLE9BQU8sRUFBRSxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDL0IsUUFBUSxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ25CLFFBQVEsSUFBSSxFQUFFO0FBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQzs7QUFFbEI7QUFDQSxNQUFNLE9BQU8sR0FBRyxJQUFJO0FBQ3BCOztBQUVBLElBQUksSUFBSSxXQUFXLElBQUksT0FBTyxFQUFFO0FBQ2hDO0FBQ0EsTUFBTSxPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVM7QUFDbkMsS0FBSyxNQUFNO0FBQ1g7QUFDQSxNQUFNLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLFVBQVUsR0FBRztBQUN6RCxRQUFRLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7QUFDbEQsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUMxRyxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsUUFBUSxVQUFVLENBQUMsU0FBUyxDQUFDO0FBQzdCLE9BQU87QUFDUDs7QUFFQTtBQUNBLElBQUksT0FBTyxDQUFDLE9BQU8sR0FBRyxTQUFTLFdBQVcsR0FBRztBQUM3QyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDcEIsUUFBUTtBQUNSOztBQUVBLE1BQU0sTUFBTSxDQUFDLElBQUlULFlBQVUsQ0FBQyxpQkFBaUIsRUFBRUEsWUFBVSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRXpGO0FBQ0EsTUFBTSxPQUFPLEdBQUcsSUFBSTtBQUNwQixLQUFLOztBQUVMO0FBQ0EsSUFBSSxPQUFPLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxHQUFHO0FBQzdDO0FBQ0E7QUFDQSxNQUFNLE1BQU0sQ0FBQyxJQUFJQSxZQUFVLENBQUMsZUFBZSxFQUFFQSxZQUFVLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFdEY7QUFDQSxNQUFNLE9BQU8sR0FBRyxJQUFJO0FBQ3BCLEtBQUs7O0FBRUw7QUFDQSxJQUFJLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxhQUFhLEdBQUc7QUFDakQsTUFBTSxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsYUFBYSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsYUFBYSxHQUFHLGtCQUFrQjtBQUN0SCxNQUFNLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksb0JBQW9CO0FBQ3ZFLE1BQU0sSUFBSSxPQUFPLENBQUMsbUJBQW1CLEVBQUU7QUFDdkMsUUFBUSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsbUJBQW1CO0FBQ3pEO0FBQ0EsTUFBTSxNQUFNLENBQUMsSUFBSUEsWUFBVTtBQUMzQixRQUFRLG1CQUFtQjtBQUMzQixRQUFRLFlBQVksQ0FBQyxtQkFBbUIsR0FBR0EsWUFBVSxDQUFDLFNBQVMsR0FBR0EsWUFBVSxDQUFDLFlBQVk7QUFDekYsUUFBUSxNQUFNO0FBQ2QsUUFBUSxPQUFPLENBQUMsQ0FBQzs7QUFFakI7QUFDQSxNQUFNLE9BQU8sR0FBRyxJQUFJO0FBQ3BCLEtBQUs7O0FBRUw7QUFDQSxJQUFJLFdBQVcsS0FBSyxTQUFTLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7O0FBRXBFO0FBQ0EsSUFBSSxJQUFJLGtCQUFrQixJQUFJLE9BQU8sRUFBRTtBQUN2QyxNQUFNQyxPQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDakYsUUFBUSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztBQUMxQyxPQUFPLENBQUM7QUFDUjs7QUFFQTtBQUNBLElBQUksSUFBSSxDQUFDQSxPQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTtBQUNyRCxNQUFNLE9BQU8sQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlO0FBQ3pEOztBQUVBO0FBQ0EsSUFBSSxJQUFJLFlBQVksSUFBSSxZQUFZLEtBQUssTUFBTSxFQUFFO0FBQ2pELE1BQU0sT0FBTyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWTtBQUNqRDs7QUFFQTtBQUNBLElBQUksSUFBSSxrQkFBa0IsRUFBRTtBQUM1QixNQUFNLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUM7QUFDMUYsTUFBTSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLGlCQUFpQixDQUFDO0FBQzdEOztBQUVBO0FBQ0EsSUFBSSxJQUFJLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDNUMsTUFBTSxDQUFDLENBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDOztBQUU5RSxNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQzs7QUFFbEUsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7QUFDN0Q7O0FBRUEsSUFBSSxJQUFJLE9BQU8sQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUMvQztBQUNBO0FBQ0EsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJO0FBQzdCLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUN0QixVQUFVO0FBQ1Y7QUFDQSxRQUFRLE1BQU0sQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUlVLGVBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUMxRixRQUFRLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDdkIsUUFBUSxPQUFPLEdBQUcsSUFBSTtBQUN0QixPQUFPOztBQUVQLE1BQU0sT0FBTyxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7QUFDdEUsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDMUIsUUFBUSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUM7QUFDcEc7QUFDQTs7QUFFQSxJQUFJLE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDOztBQUUvQyxJQUFJLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRTtBQUNqRSxNQUFNLE1BQU0sQ0FBQyxJQUFJWCxZQUFVLENBQUMsdUJBQXVCLEdBQUcsUUFBUSxHQUFHLEdBQUcsRUFBRUEsWUFBVSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMxRyxNQUFNO0FBQ047OztBQUdBO0FBQ0EsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7QUFDckMsR0FBRyxDQUFDO0FBQ0o7O0FDaE1BLE1BQU0sY0FBYyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sS0FBSztBQUM3QyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUVyRSxFQUFFLElBQUksT0FBTyxJQUFJLE1BQU0sRUFBRTtBQUN6QixJQUFJLElBQUksVUFBVSxHQUFHLElBQUksZUFBZSxFQUFFOztBQUUxQyxJQUFJLElBQUksT0FBTzs7QUFFZixJQUFJLE1BQU0sT0FBTyxHQUFHLFVBQVUsTUFBTSxFQUFFO0FBQ3RDLE1BQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNwQixRQUFRLE9BQU8sR0FBRyxJQUFJO0FBQ3RCLFFBQVEsV0FBVyxFQUFFO0FBQ3JCLFFBQVEsTUFBTSxHQUFHLEdBQUcsTUFBTSxZQUFZLEtBQUssR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU07QUFDbEUsUUFBUSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsWUFBWUEsWUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJVyxlQUFhLENBQUMsR0FBRyxZQUFZLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZIO0FBQ0E7O0FBRUEsSUFBSSxJQUFJLEtBQUssR0FBRyxPQUFPLElBQUksVUFBVSxDQUFDLE1BQU07QUFDNUMsTUFBTSxLQUFLLEdBQUcsSUFBSTtBQUNsQixNQUFNLE9BQU8sQ0FBQyxJQUFJWCxZQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFQSxZQUFVLENBQUMsU0FBUyxDQUFDO0FBQ3ZGLEtBQUssRUFBRSxPQUFPOztBQUVkLElBQUksTUFBTSxXQUFXLEdBQUcsTUFBTTtBQUM5QixNQUFNLElBQUksT0FBTyxFQUFFO0FBQ25CLFFBQVEsS0FBSyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUM7QUFDcEMsUUFBUSxLQUFLLEdBQUcsSUFBSTtBQUNwQixRQUFRLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJO0FBQ2xDLFVBQVUsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO0FBQ3pHLFNBQVMsQ0FBQztBQUNWLFFBQVEsT0FBTyxHQUFHLElBQUk7QUFDdEI7QUFDQTs7QUFFQSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFMUUsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsVUFBVTs7QUFFL0IsSUFBSSxNQUFNLENBQUMsV0FBVyxHQUFHLE1BQU1DLE9BQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDOztBQUV0RCxJQUFJLE9BQU8sTUFBTTtBQUNqQjtBQUNBOztBQzVDTyxNQUFNLFdBQVcsR0FBRyxXQUFXLEtBQUssRUFBRSxTQUFTLEVBQUU7QUFDeEQsRUFBRSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsVUFBVTs7QUFFNUIsRUFBRSxJQUFrQixHQUFHLEdBQUcsU0FBUyxFQUFFO0FBQ3JDLElBQUksTUFBTSxLQUFLO0FBQ2YsSUFBSTtBQUNKOztBQUVBLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNiLEVBQUUsSUFBSSxHQUFHOztBQUVULEVBQUUsT0FBTyxHQUFHLEdBQUcsR0FBRyxFQUFFO0FBQ3BCLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxTQUFTO0FBQ3pCLElBQUksTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7QUFDL0IsSUFBSSxHQUFHLEdBQUcsR0FBRztBQUNiO0FBQ0E7O0FBRU8sTUFBTSxTQUFTLEdBQUcsaUJBQWlCLFFBQVEsRUFBRSxTQUFTLEVBQUU7QUFDL0QsRUFBRSxXQUFXLE1BQU0sS0FBSyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUNsRCxJQUFJLE9BQU8sV0FBVyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUM7QUFDeEM7QUFDQTs7QUFFQSxNQUFNLFVBQVUsR0FBRyxpQkFBaUIsTUFBTSxFQUFFO0FBQzVDLEVBQUUsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFO0FBQ3BDLElBQUksT0FBTyxNQUFNO0FBQ2pCLElBQUk7QUFDSjs7QUFFQSxFQUFFLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUU7QUFDbkMsRUFBRSxJQUFJO0FBQ04sSUFBSSxTQUFTO0FBQ2IsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRTtBQUMvQyxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ2hCLFFBQVE7QUFDUjtBQUNBLE1BQU0sTUFBTSxLQUFLO0FBQ2pCO0FBQ0EsR0FBRyxTQUFTO0FBQ1osSUFBSSxNQUFNLE1BQU0sQ0FBQyxNQUFNLEVBQUU7QUFDekI7QUFDQTs7QUFFTyxNQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsS0FBSztBQUN4RSxFQUFFLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDOztBQUUvQyxFQUFFLElBQUksS0FBSyxHQUFHLENBQUM7QUFDZixFQUFFLElBQUksSUFBSTtBQUNWLEVBQUUsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUs7QUFDekIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ2YsTUFBTSxJQUFJLEdBQUcsSUFBSTtBQUNqQixNQUFNLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQzdCO0FBQ0E7O0FBRUEsRUFBRSxPQUFPLElBQUksY0FBYyxDQUFDO0FBQzVCLElBQUksTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQzNCLE1BQU0sSUFBSTtBQUNWLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUU7O0FBRW5ELFFBQVEsSUFBSSxJQUFJLEVBQUU7QUFDbEIsU0FBUyxTQUFTLEVBQUU7QUFDcEIsVUFBVSxVQUFVLENBQUMsS0FBSyxFQUFFO0FBQzVCLFVBQVU7QUFDVjs7QUFFQSxRQUFRLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxVQUFVO0FBQ2xDLFFBQVEsSUFBSSxVQUFVLEVBQUU7QUFDeEIsVUFBVSxJQUFJLFdBQVcsR0FBRyxLQUFLLElBQUksR0FBRztBQUN4QyxVQUFVLFVBQVUsQ0FBQyxXQUFXLENBQUM7QUFDakM7QUFDQSxRQUFRLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakQsT0FBTyxDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ3BCLFFBQVEsU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUN0QixRQUFRLE1BQU0sR0FBRztBQUNqQjtBQUNBLEtBQUs7QUFDTCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7QUFDbkIsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQ3ZCLE1BQU0sT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFO0FBQzlCO0FBQ0EsR0FBRyxFQUFFO0FBQ0wsSUFBSSxhQUFhLEVBQUU7QUFDbkIsR0FBRztBQUNIOztBQzVFQSxNQUFNLGdCQUFnQixHQUFHLE9BQU8sS0FBSyxLQUFLLFVBQVUsSUFBSSxPQUFPLE9BQU8sS0FBSyxVQUFVLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVTtBQUN2SCxNQUFNLHlCQUF5QixHQUFHLGdCQUFnQixJQUFJLE9BQU8sY0FBYyxLQUFLLFVBQVU7O0FBRTFGO0FBQ0EsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLEtBQUssT0FBTyxXQUFXLEtBQUssVUFBVTtBQUN6RSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQ2xFLElBQUksT0FBTyxHQUFHLEtBQUssSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUU7QUFDdkUsQ0FBQzs7QUFFRCxNQUFNLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksS0FBSztBQUM5QixFQUFFLElBQUk7QUFDTixJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUN4QixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDZCxJQUFJLE9BQU87QUFDWDtBQUNBOztBQUVBLE1BQU0scUJBQXFCLEdBQUcseUJBQXlCLElBQUksSUFBSSxDQUFDLE1BQU07QUFDdEUsRUFBRSxJQUFJLGNBQWMsR0FBRyxLQUFLOztBQUU1QixFQUFFLE1BQU0sY0FBYyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7QUFDdEQsSUFBSSxJQUFJLEVBQUUsSUFBSSxjQUFjLEVBQUU7QUFDOUIsSUFBSSxNQUFNLEVBQUUsTUFBTTtBQUNsQixJQUFJLElBQUksTUFBTSxHQUFHO0FBQ2pCLE1BQU0sY0FBYyxHQUFHLElBQUk7QUFDM0IsTUFBTSxPQUFPLE1BQU07QUFDbkIsS0FBSztBQUNMLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDOztBQUVoQyxFQUFFLE9BQU8sY0FBYyxJQUFJLENBQUMsY0FBYztBQUMxQyxDQUFDLENBQUM7O0FBRUYsTUFBTSxrQkFBa0IsR0FBRyxFQUFFLEdBQUcsSUFBSTs7QUFFcEMsTUFBTSxzQkFBc0IsR0FBRyx5QkFBeUI7QUFDeEQsRUFBRSxJQUFJLENBQUMsTUFBTUEsT0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHM0QsTUFBTSxTQUFTLEdBQUc7QUFDbEIsRUFBRSxNQUFNLEVBQUUsc0JBQXNCLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUk7QUFDdEQsQ0FBQzs7QUFFRCxnQkFBZ0IsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLO0FBQy9CLEVBQUUsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSTtBQUN4RSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBR0EsT0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDN0YsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLEtBQUs7QUFDckIsUUFBUSxNQUFNLElBQUlELFlBQVUsQ0FBQyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRUEsWUFBVSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUM7QUFDNUcsT0FBTztBQUNQLEdBQUcsQ0FBQztBQUNKLENBQUMsRUFBRSxJQUFJLFFBQVEsQ0FBQyxDQUFDOztBQUVqQixNQUFNLGFBQWEsR0FBRyxPQUFPLElBQUksS0FBSztBQUN0QyxFQUFFLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUNwQixJQUFJLE9BQU8sQ0FBQztBQUNaOztBQUVBLEVBQUUsR0FBR0MsT0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN6QixJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUk7QUFDcEI7O0FBRUEsRUFBRSxHQUFHQSxPQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdEMsSUFBSSxNQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO0FBQ2xELE1BQU0sTUFBTSxFQUFFLE1BQU07QUFDcEIsTUFBTSxJQUFJO0FBQ1YsS0FBSyxDQUFDO0FBQ04sSUFBSSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsVUFBVTtBQUNwRDs7QUFFQSxFQUFFLEdBQUdBLE9BQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSUEsT0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNqRSxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVU7QUFDMUI7O0FBRUEsRUFBRSxHQUFHQSxPQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFDcEI7O0FBRUEsRUFBRSxHQUFHQSxPQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzNCLElBQUksT0FBTyxDQUFDLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVU7QUFDOUM7QUFDQTs7QUFFQSxNQUFNLGlCQUFpQixHQUFHLE9BQU8sT0FBTyxFQUFFLElBQUksS0FBSztBQUNuRCxFQUFFLE1BQU0sTUFBTSxHQUFHQSxPQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOztBQUVqRSxFQUFFLE9BQU8sTUFBTSxJQUFJLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTTtBQUN0RDs7QUFFQSxtQkFBZSxnQkFBZ0IsS0FBSyxPQUFPLE1BQU0sS0FBSztBQUN0RCxFQUFFLElBQUk7QUFDTixJQUFJLEdBQUc7QUFDUCxJQUFJLE1BQU07QUFDVixJQUFJLElBQUk7QUFDUixJQUFJLE1BQU07QUFDVixJQUFJLFdBQVc7QUFDZixJQUFJLE9BQU87QUFDWCxJQUFJLGtCQUFrQjtBQUN0QixJQUFJLGdCQUFnQjtBQUNwQixJQUFJLFlBQVk7QUFDaEIsSUFBSSxPQUFPO0FBQ1gsSUFBSSxlQUFlLEdBQUcsYUFBYTtBQUNuQyxJQUFJO0FBQ0osR0FBRyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7O0FBRTNCLEVBQUUsWUFBWSxHQUFHLFlBQVksR0FBRyxDQUFDLFlBQVksR0FBRyxFQUFFLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTTs7QUFFMUUsRUFBRSxJQUFJLGNBQWMsR0FBRyxjQUFjLENBQUMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQzs7QUFFcEcsRUFBRSxJQUFJLE9BQU87O0FBRWIsRUFBRSxNQUFNLFdBQVcsR0FBRyxjQUFjLElBQUksY0FBYyxDQUFDLFdBQVcsS0FBSyxNQUFNO0FBQzdFLE1BQU0sY0FBYyxDQUFDLFdBQVcsRUFBRTtBQUNsQyxHQUFHLENBQUM7O0FBRUosRUFBRSxJQUFJLG9CQUFvQjs7QUFFMUIsRUFBRSxJQUFJO0FBQ04sSUFBSTtBQUNKLE1BQU0sZ0JBQWdCLElBQUkscUJBQXFCLElBQUksTUFBTSxLQUFLLEtBQUssSUFBSSxNQUFNLEtBQUssTUFBTTtBQUN4RixNQUFNLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU07QUFDMUUsTUFBTTtBQUNOLE1BQU0sSUFBSSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ3RDLFFBQVEsTUFBTSxFQUFFLE1BQU07QUFDdEIsUUFBUSxJQUFJLEVBQUUsSUFBSTtBQUNsQixRQUFRLE1BQU0sRUFBRTtBQUNoQixPQUFPLENBQUM7O0FBRVIsTUFBTSxJQUFJLGlCQUFpQjs7QUFFM0IsTUFBTSxJQUFJQSxPQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUU7QUFDaEcsUUFBUSxPQUFPLENBQUMsY0FBYyxDQUFDLGlCQUFpQjtBQUNoRDs7QUFFQSxNQUFNLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtBQUN6QixRQUFRLE1BQU0sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLEdBQUcsc0JBQXNCO0FBQzFELFVBQVUsb0JBQW9CO0FBQzlCLFVBQVUsb0JBQW9CLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDO0FBQy9ELFNBQVM7O0FBRVQsUUFBUSxJQUFJLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQztBQUNoRjtBQUNBOztBQUVBLElBQUksSUFBSSxDQUFDQSxPQUFLLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO0FBQzFDLE1BQU0sZUFBZSxHQUFHLGVBQWUsR0FBRyxTQUFTLEdBQUcsTUFBTTtBQUM1RDs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxNQUFNLHNCQUFzQixHQUFHLGFBQWEsSUFBSSxPQUFPLENBQUMsU0FBUztBQUNyRSxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDL0IsTUFBTSxHQUFHLFlBQVk7QUFDckIsTUFBTSxNQUFNLEVBQUUsY0FBYztBQUM1QixNQUFNLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ2xDLE1BQU0sT0FBTyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUU7QUFDM0MsTUFBTSxJQUFJLEVBQUUsSUFBSTtBQUNoQixNQUFNLE1BQU0sRUFBRSxNQUFNO0FBQ3BCLE1BQU0sV0FBVyxFQUFFLHNCQUFzQixHQUFHLGVBQWUsR0FBRztBQUM5RCxLQUFLLENBQUM7O0FBRU4sSUFBSSxJQUFJLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUM7O0FBRXZDLElBQUksTUFBTSxnQkFBZ0IsR0FBRyxzQkFBc0IsS0FBSyxZQUFZLEtBQUssUUFBUSxJQUFJLFlBQVksS0FBSyxVQUFVLENBQUM7O0FBRWpILElBQUksSUFBSSxzQkFBc0IsS0FBSyxrQkFBa0IsS0FBSyxnQkFBZ0IsSUFBSSxXQUFXLENBQUMsQ0FBQyxFQUFFO0FBQzdGLE1BQU0sTUFBTSxPQUFPLEdBQUcsRUFBRTs7QUFFeEIsTUFBTSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSTtBQUMxRCxRQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ3RDLE9BQU8sQ0FBQzs7QUFFUixNQUFNLE1BQU0scUJBQXFCLEdBQUdBLE9BQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFaEcsTUFBTSxNQUFNLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxHQUFHLGtCQUFrQixJQUFJLHNCQUFzQjtBQUM5RSxRQUFRLHFCQUFxQjtBQUM3QixRQUFRLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLElBQUk7QUFDckUsT0FBTyxJQUFJLEVBQUU7O0FBRWIsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRO0FBQzdCLFFBQVEsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLE1BQU07QUFDekUsVUFBVSxLQUFLLElBQUksS0FBSyxFQUFFO0FBQzFCLFVBQVUsV0FBVyxJQUFJLFdBQVcsRUFBRTtBQUN0QyxTQUFTLENBQUM7QUFDVixRQUFRO0FBQ1IsT0FBTztBQUNQOztBQUVBLElBQUksWUFBWSxHQUFHLFlBQVksSUFBSSxNQUFNOztBQUV6QyxJQUFJLElBQUksWUFBWSxHQUFHLE1BQU0sU0FBUyxDQUFDQSxPQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDOztBQUUxRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksV0FBVyxJQUFJLFdBQVcsRUFBRTs7QUFFckQsSUFBSSxPQUFPLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxLQUFLO0FBQ2xELE1BQU0sTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDOUIsUUFBUSxJQUFJLEVBQUUsWUFBWTtBQUMxQixRQUFRLE9BQU8sRUFBRVEsY0FBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0FBQ3BELFFBQVEsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO0FBQy9CLFFBQVEsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO0FBQ3ZDLFFBQVEsTUFBTTtBQUNkLFFBQVE7QUFDUixPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNoQixJQUFJLFdBQVcsSUFBSSxXQUFXLEVBQUU7O0FBRWhDLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDdkUsTUFBTSxNQUFNLE1BQU0sQ0FBQyxNQUFNO0FBQ3pCLFFBQVEsSUFBSVQsWUFBVSxDQUFDLGVBQWUsRUFBRUEsWUFBVSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO0FBQ2hGLFFBQVE7QUFDUixVQUFVLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxJQUFJO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLE1BQU1BLFlBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFDaEU7QUFDQSxDQUFDLENBQUM7O0FDNU5GLE1BQU0sYUFBYSxHQUFHO0FBQ3RCLEVBQUUsSUFBSSxFQUFFLFdBQVc7QUFDbkIsRUFBRSxHQUFHLEVBQUUsVUFBVTtBQUNqQixFQUFFLEtBQUssRUFBRTtBQUNUOztBQUVBQyxPQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLEtBQUs7QUFDNUMsRUFBRSxJQUFJLEVBQUUsRUFBRTtBQUNWLElBQUksSUFBSTtBQUNSLE1BQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ2hCO0FBQ0E7QUFDQSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLGFBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JEO0FBQ0EsQ0FBQyxDQUFDOztBQUVGLE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUU5QyxNQUFNLGdCQUFnQixHQUFHLENBQUMsT0FBTyxLQUFLQSxPQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUs7O0FBRXhHLGVBQWU7QUFDZixFQUFFLFVBQVUsRUFBRSxDQUFDLFFBQVEsS0FBSztBQUM1QixJQUFJLFFBQVEsR0FBR0EsT0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUM7O0FBRTlELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVE7QUFDN0IsSUFBSSxJQUFJLGFBQWE7QUFDckIsSUFBSSxJQUFJLE9BQU87O0FBRWYsSUFBSSxNQUFNLGVBQWUsR0FBRyxFQUFFOztBQUU5QixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNqQyxNQUFNLElBQUksRUFBRTs7QUFFWixNQUFNLE9BQU8sR0FBRyxhQUFhOztBQUU3QixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsRUFBRTtBQUM1QyxRQUFRLE9BQU8sR0FBRyxhQUFhLENBQUMsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDOztBQUUzRSxRQUFRLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtBQUNuQyxVQUFVLE1BQU0sSUFBSUQsWUFBVSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pEO0FBQ0E7O0FBRUEsTUFBTSxJQUFJLE9BQU8sRUFBRTtBQUNuQixRQUFRO0FBQ1I7O0FBRUEsTUFBTSxlQUFlLENBQUMsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPO0FBQzlDOztBQUVBLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTs7QUFFbEIsTUFBTSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWU7QUFDcEQsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzlDLFdBQVcsS0FBSyxLQUFLLEtBQUssR0FBRyxxQ0FBcUMsR0FBRywrQkFBK0I7QUFDcEcsU0FBUzs7QUFFVCxNQUFNLElBQUksQ0FBQyxHQUFHLE1BQU07QUFDcEIsU0FBUyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakgsUUFBUSx5QkFBeUI7O0FBRWpDLE1BQU0sTUFBTSxJQUFJQSxZQUFVO0FBQzFCLFFBQVEsQ0FBQyxxREFBcUQsQ0FBQyxHQUFHLENBQUM7QUFDbkUsUUFBUTtBQUNSLE9BQU87QUFDUDs7QUFFQSxJQUFJLE9BQU8sT0FBTztBQUNsQixHQUFHO0FBQ0gsRUFBRSxRQUFRLEVBQUU7QUFDWjs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDRCQUE0QixDQUFDLE1BQU0sRUFBRTtBQUM5QyxFQUFFLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUMxQixJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUU7QUFDekM7O0FBRUEsRUFBRSxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7QUFDOUMsSUFBSSxNQUFNLElBQUlXLGVBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUU7QUFDaEQsRUFBRSw0QkFBNEIsQ0FBQyxNQUFNLENBQUM7O0FBRXRDLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBR0YsY0FBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDOztBQUVwRDtBQUNBLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSTtBQUNsQyxJQUFJLE1BQU07QUFDVixJQUFJLE1BQU0sQ0FBQztBQUNYLEdBQUc7O0FBRUgsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRTtBQUM5RCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLG1DQUFtQyxFQUFFLEtBQUssQ0FBQztBQUM3RTs7QUFFQSxFQUFFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDOztBQUV6RSxFQUFFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLG1CQUFtQixDQUFDLFFBQVEsRUFBRTtBQUNyRSxJQUFJLDRCQUE0QixDQUFDLE1BQU0sQ0FBQzs7QUFFeEM7QUFDQSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUk7QUFDdEMsTUFBTSxNQUFNO0FBQ1osTUFBTSxNQUFNLENBQUMsaUJBQWlCO0FBQzlCLE1BQU07QUFDTixLQUFLOztBQUVMLElBQUksUUFBUSxDQUFDLE9BQU8sR0FBR0EsY0FBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDOztBQUUxRCxJQUFJLE9BQU8sUUFBUTtBQUNuQixHQUFHLEVBQUUsU0FBUyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7QUFDekMsSUFBSSxJQUFJLENBQUNDLFVBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUMzQixNQUFNLDRCQUE0QixDQUFDLE1BQU0sQ0FBQzs7QUFFMUM7QUFDQSxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDckMsUUFBUSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSTtBQUNqRCxVQUFVLE1BQU07QUFDaEIsVUFBVSxNQUFNLENBQUMsaUJBQWlCO0FBQ2xDLFVBQVUsTUFBTSxDQUFDO0FBQ2pCLFNBQVM7QUFDVCxRQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHRCxjQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0FBQzVFO0FBQ0E7O0FBRUEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2pDLEdBQUcsQ0FBQztBQUNKOztBQ2hGTyxNQUFNSSxTQUFPLEdBQUcsT0FBTzs7QUNLOUIsTUFBTUMsWUFBVSxHQUFHLEVBQUU7O0FBRXJCO0FBQ0EsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUs7QUFDckYsRUFBRUEsWUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRTtBQUMvQyxJQUFJLE9BQU8sT0FBTyxLQUFLLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJO0FBQ3JFLEdBQUc7QUFDSCxDQUFDLENBQUM7O0FBRUYsTUFBTSxrQkFBa0IsR0FBRyxFQUFFOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsWUFBVSxDQUFDLFlBQVksR0FBRyxTQUFTLFlBQVksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUM3RSxFQUFFLFNBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDcEMsSUFBSSxPQUFPLFVBQVUsR0FBR0QsU0FBTyxHQUFHLDBCQUEwQixHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNsSDs7QUFFQTtBQUNBLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxLQUFLO0FBQy9CLElBQUksSUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO0FBQzdCLE1BQU0sTUFBTSxJQUFJYixZQUFVO0FBQzFCLFFBQVEsYUFBYSxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsSUFBSSxPQUFPLEdBQUcsTUFBTSxHQUFHLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNuRixRQUFRQSxZQUFVLENBQUM7QUFDbkIsT0FBTztBQUNQOztBQUVBLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUM3QyxNQUFNLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUk7QUFDcEM7QUFDQSxNQUFNLE9BQU8sQ0FBQyxJQUFJO0FBQ2xCLFFBQVEsYUFBYTtBQUNyQixVQUFVLEdBQUc7QUFDYixVQUFVLDhCQUE4QixHQUFHLE9BQU8sR0FBRztBQUNyRDtBQUNBLE9BQU87QUFDUDs7QUFFQSxJQUFJLE9BQU8sU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUk7QUFDekQsR0FBRztBQUNILENBQUM7O0FBRURjLFlBQVUsQ0FBQyxRQUFRLEdBQUcsU0FBUyxRQUFRLENBQUMsZUFBZSxFQUFFO0FBQ3pELEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLEtBQUs7QUFDekI7QUFDQSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLElBQUksT0FBTyxJQUFJO0FBQ2Y7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRTtBQUN0RCxFQUFFLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQ25DLElBQUksTUFBTSxJQUFJZCxZQUFVLENBQUMsMkJBQTJCLEVBQUVBLFlBQVUsQ0FBQyxvQkFBb0IsQ0FBQztBQUN0RjtBQUNBLEVBQUUsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDbkMsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTTtBQUNyQixFQUFFLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQ2xCLElBQUksTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN2QixJQUFJLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDakMsSUFBSSxJQUFJLFNBQVMsRUFBRTtBQUNuQixNQUFNLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDaEMsTUFBTSxNQUFNLE1BQU0sR0FBRyxLQUFLLEtBQUssU0FBUyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQztBQUMxRSxNQUFNLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtBQUMzQixRQUFRLE1BQU0sSUFBSUEsWUFBVSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsV0FBVyxHQUFHLE1BQU0sRUFBRUEsWUFBVSxDQUFDLG9CQUFvQixDQUFDO0FBQ3JHO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsSUFBSSxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7QUFDL0IsTUFBTSxNQUFNLElBQUlBLFlBQVUsQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLEVBQUVBLFlBQVUsQ0FBQyxjQUFjLENBQUM7QUFDOUU7QUFDQTtBQUNBOztBQUVBLGdCQUFlO0FBQ2YsRUFBRSxhQUFhO0FBQ2YsY0FBRWM7QUFDRixDQUFDOztBQ3ZGRCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVTs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Y0FDQSxNQUFNLEtBQUssQ0FBQztBQUNaLEVBQUUsV0FBVyxDQUFDLGNBQWMsRUFBRTtBQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYztBQUNsQyxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUc7QUFDeEIsTUFBTSxPQUFPLEVBQUUsSUFBSSxrQkFBa0IsRUFBRTtBQUN2QyxNQUFNLFFBQVEsRUFBRSxJQUFJLGtCQUFrQjtBQUN0QyxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsTUFBTSxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRTtBQUNyQyxJQUFJLElBQUk7QUFDUixNQUFNLE9BQU8sTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7QUFDckQsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFO0FBQ2xCLE1BQU0sSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO0FBQ2hDLFFBQVEsSUFBSSxLQUFLLEdBQUcsRUFBRTs7QUFFdEIsUUFBUSxLQUFLLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDOztBQUV4RjtBQUNBLFFBQVEsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRTtBQUN6RSxRQUFRLElBQUk7QUFDWixVQUFVLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO0FBQzFCLFlBQVksR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLO0FBQzdCO0FBQ0EsV0FBVyxNQUFNLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUMzRixZQUFZLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHO0FBQ2hDO0FBQ0EsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLE1BQU0sR0FBRztBQUNmO0FBQ0E7O0FBRUEsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRTtBQUNoQztBQUNBO0FBQ0EsSUFBSSxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTtBQUN6QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksRUFBRTtBQUMzQixNQUFNLE1BQU0sQ0FBQyxHQUFHLEdBQUcsV0FBVztBQUM5QixLQUFLLE1BQU07QUFDWCxNQUFNLE1BQU0sR0FBRyxXQUFXLElBQUksRUFBRTtBQUNoQzs7QUFFQSxJQUFJLE1BQU0sR0FBR0YsYUFBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDOztBQUUvQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLEdBQUcsTUFBTTs7QUFFNUQsSUFBSSxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7QUFDcEMsTUFBTSxTQUFTLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTtBQUM1QyxRQUFRLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztBQUN0RSxRQUFRLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztBQUN0RSxRQUFRLG1CQUFtQixFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU87QUFDdkUsT0FBTyxFQUFFLEtBQUssQ0FBQztBQUNmOztBQUVBLElBQUksSUFBSSxnQkFBZ0IsSUFBSSxJQUFJLEVBQUU7QUFDbEMsTUFBTSxJQUFJWCxPQUFLLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7QUFDOUMsUUFBUSxNQUFNLENBQUMsZ0JBQWdCLEdBQUc7QUFDbEMsVUFBVSxTQUFTLEVBQUU7QUFDckI7QUFDQSxPQUFPLE1BQU07QUFDYixRQUFRLFNBQVMsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUU7QUFDbEQsVUFBVSxNQUFNLEVBQUUsVUFBVSxDQUFDLFFBQVE7QUFDckMsVUFBVSxTQUFTLEVBQUUsVUFBVSxDQUFDO0FBQ2hDLFNBQVMsRUFBRSxJQUFJLENBQUM7QUFDaEI7QUFDQTs7QUFFQSxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO0FBQ3BDLE1BQU0sT0FBTyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0FBQzdDLE1BQU0sYUFBYSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsZUFBZTtBQUN4RCxLQUFLLEVBQUUsSUFBSSxDQUFDOztBQUVaO0FBQ0EsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxLQUFLLEVBQUUsV0FBVyxFQUFFOztBQUVsRjtBQUNBLElBQUksSUFBSSxjQUFjLEdBQUcsT0FBTyxJQUFJQSxPQUFLLENBQUMsS0FBSztBQUMvQyxNQUFNLE9BQU8sQ0FBQyxNQUFNO0FBQ3BCLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNO0FBQzNCLEtBQUs7O0FBRUwsSUFBSSxPQUFPLElBQUlBLE9BQUssQ0FBQyxPQUFPO0FBQzVCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7QUFDakUsTUFBTSxDQUFDLE1BQU0sS0FBSztBQUNsQixRQUFRLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUM5QjtBQUNBLEtBQUs7O0FBRUwsSUFBSSxNQUFNLENBQUMsT0FBTyxHQUFHUSxjQUFZLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUM7O0FBRWpFO0FBQ0EsSUFBSSxNQUFNLHVCQUF1QixHQUFHLEVBQUU7QUFDdEMsSUFBSSxJQUFJLDhCQUE4QixHQUFHLElBQUk7QUFDN0MsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUywwQkFBMEIsQ0FBQyxXQUFXLEVBQUU7QUFDdkYsTUFBTSxJQUFJLE9BQU8sV0FBVyxDQUFDLE9BQU8sS0FBSyxVQUFVLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDOUYsUUFBUTtBQUNSOztBQUVBLE1BQU0sOEJBQThCLEdBQUcsOEJBQThCLElBQUksV0FBVyxDQUFDLFdBQVc7O0FBRWhHLE1BQU0sdUJBQXVCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQztBQUNsRixLQUFLLENBQUM7O0FBRU4sSUFBSSxNQUFNLHdCQUF3QixHQUFHLEVBQUU7QUFDdkMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUU7QUFDdEYsTUFBTSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDO0FBQ2hGLEtBQUssQ0FBQzs7QUFFTixJQUFJLElBQUksT0FBTztBQUNmLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNiLElBQUksSUFBSSxHQUFHOztBQUVYLElBQUksSUFBSSxDQUFDLDhCQUE4QixFQUFFO0FBQ3pDLE1BQU0sTUFBTSxLQUFLLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQztBQUMzRCxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSx1QkFBdUIsQ0FBQztBQUN6RCxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSx3QkFBd0IsQ0FBQztBQUN2RCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTTs7QUFFeEIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7O0FBRXZDLE1BQU0sT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFO0FBQ3RCLFFBQVEsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEQ7O0FBRUEsTUFBTSxPQUFPLE9BQU87QUFDcEI7O0FBRUEsSUFBSSxHQUFHLEdBQUcsdUJBQXVCLENBQUMsTUFBTTs7QUFFeEMsSUFBSSxJQUFJLFNBQVMsR0FBRyxNQUFNOztBQUUxQixJQUFJLENBQUMsR0FBRyxDQUFDOztBQUVULElBQUksT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFO0FBQ3BCLE1BQU0sTUFBTSxXQUFXLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdEQsTUFBTSxNQUFNLFVBQVUsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNyRCxNQUFNLElBQUk7QUFDVixRQUFRLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO0FBQzFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUN0QixRQUFRLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztBQUNwQyxRQUFRO0FBQ1I7QUFDQTs7QUFFQSxJQUFJLElBQUk7QUFDUixNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUM7QUFDckQsS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFO0FBQ3BCLE1BQU0sT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUNsQzs7QUFFQSxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ1QsSUFBSSxHQUFHLEdBQUcsd0JBQXdCLENBQUMsTUFBTTs7QUFFekMsSUFBSSxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUU7QUFDcEIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLHdCQUF3QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDMUY7O0FBRUEsSUFBSSxPQUFPLE9BQU87QUFDbEI7O0FBRUEsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ2pCLElBQUksTUFBTSxHQUFHRyxhQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7QUFDL0MsSUFBSSxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQzlELElBQUksT0FBTyxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0FBQ3JFO0FBQ0E7O0FBRUE7QUFDQVgsT0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUFFLFNBQVMsbUJBQW1CLENBQUMsTUFBTSxFQUFFO0FBQ3pGO0FBQ0EsRUFBRWMsT0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFDbEQsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUNILGFBQVcsQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFO0FBQ2xELE1BQU0sTUFBTTtBQUNaLE1BQU0sR0FBRztBQUNULE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRTtBQUMzQixLQUFLLENBQUMsQ0FBQztBQUNQLEdBQUc7QUFDSCxDQUFDLENBQUM7O0FBRUZYLE9BQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFFLFNBQVMscUJBQXFCLENBQUMsTUFBTSxFQUFFO0FBQy9FOztBQUVBLEVBQUUsU0FBUyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7QUFDdEMsSUFBSSxPQUFPLFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ2xELE1BQU0sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDVyxhQUFXLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRTtBQUNwRCxRQUFRLE1BQU07QUFDZCxRQUFRLE9BQU8sRUFBRSxNQUFNLEdBQUc7QUFDMUIsVUFBVSxjQUFjLEVBQUU7QUFDMUIsU0FBUyxHQUFHLEVBQUU7QUFDZCxRQUFRLEdBQUc7QUFDWCxRQUFRO0FBQ1IsT0FBTyxDQUFDLENBQUM7QUFDVCxLQUFLO0FBQ0w7O0FBRUEsRUFBRUcsT0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxrQkFBa0IsRUFBRTs7QUFFaEQsRUFBRUEsT0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDO0FBQzdELENBQUMsQ0FBQzs7QUNsT0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7b0JBQ0EsTUFBTSxXQUFXLENBQUM7QUFDbEIsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFO0FBQ3hCLElBQUksSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7QUFDeEMsTUFBTSxNQUFNLElBQUksU0FBUyxDQUFDLDhCQUE4QixDQUFDO0FBQ3pEOztBQUVBLElBQUksSUFBSSxjQUFjOztBQUV0QixJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxlQUFlLENBQUMsT0FBTyxFQUFFO0FBQ2pFLE1BQU0sY0FBYyxHQUFHLE9BQU87QUFDOUIsS0FBSyxDQUFDOztBQUVOLElBQUksTUFBTSxLQUFLLEdBQUcsSUFBSTs7QUFFdEI7QUFDQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSTtBQUNoQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFOztBQUU3QixNQUFNLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTTs7QUFFckMsTUFBTSxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRTtBQUN0QixRQUFRLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ25DO0FBQ0EsTUFBTSxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUk7QUFDN0IsS0FBSyxDQUFDOztBQUVOO0FBQ0EsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxXQUFXLElBQUk7QUFDdkMsTUFBTSxJQUFJLFFBQVE7QUFDbEI7QUFDQSxNQUFNLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSTtBQUM3QyxRQUFRLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO0FBQ2hDLFFBQVEsUUFBUSxHQUFHLE9BQU87QUFDMUIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7QUFFMUIsTUFBTSxPQUFPLENBQUMsTUFBTSxHQUFHLFNBQVMsTUFBTSxHQUFHO0FBQ3pDLFFBQVEsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7QUFDbkMsT0FBTzs7QUFFUCxNQUFNLE9BQU8sT0FBTztBQUNwQixLQUFLOztBQUVMLElBQUksUUFBUSxDQUFDLFNBQVMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFO0FBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ3hCO0FBQ0EsUUFBUTtBQUNSOztBQUVBLE1BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJSixlQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFDaEUsTUFBTSxjQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNsQyxLQUFLLENBQUM7QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLGdCQUFnQixHQUFHO0FBQ3JCLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ3JCLE1BQU0sTUFBTSxJQUFJLENBQUMsTUFBTTtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUU7QUFDdEIsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDckIsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixNQUFNO0FBQ047O0FBRUEsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDekIsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDcEMsS0FBSyxNQUFNO0FBQ1gsTUFBTSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsUUFBUSxDQUFDO0FBQ2xDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRTtBQUN4QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQzFCLE1BQU07QUFDTjtBQUNBLElBQUksTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ25ELElBQUksSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO0FBQ3RCLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUN0QztBQUNBOztBQUVBLEVBQUUsYUFBYSxHQUFHO0FBQ2xCLElBQUksTUFBTSxVQUFVLEdBQUcsSUFBSSxlQUFlLEVBQUU7O0FBRTVDLElBQUksTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUs7QUFDM0IsTUFBTSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUMzQixLQUFLOztBQUVMLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7O0FBRXpCLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQzs7QUFFakUsSUFBSSxPQUFPLFVBQVUsQ0FBQyxNQUFNO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxPQUFPLE1BQU0sR0FBRztBQUNsQixJQUFJLElBQUksTUFBTTtBQUNkLElBQUksTUFBTSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3ZELE1BQU0sTUFBTSxHQUFHLENBQUM7QUFDaEIsS0FBSyxDQUFDO0FBQ04sSUFBSSxPQUFPO0FBQ1gsTUFBTSxLQUFLO0FBQ1gsTUFBTTtBQUNOLEtBQUs7QUFDTDtBQUNBOztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSxTQUFTSyxRQUFNLENBQUMsUUFBUSxFQUFFO0FBQ3pDLEVBQUUsT0FBTyxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDNUIsSUFBSSxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztBQUNwQyxHQUFHO0FBQ0g7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2UsU0FBU0MsY0FBWSxDQUFDLE9BQU8sRUFBRTtBQUM5QyxFQUFFLE9BQU9oQixPQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLE9BQU8sQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDO0FBQ25FOztBQ2JBLE1BQU1pQixnQkFBYyxHQUFHO0FBQ3ZCLEVBQUUsUUFBUSxFQUFFLEdBQUc7QUFDZixFQUFFLGtCQUFrQixFQUFFLEdBQUc7QUFDekIsRUFBRSxVQUFVLEVBQUUsR0FBRztBQUNqQixFQUFFLFVBQVUsRUFBRSxHQUFHO0FBQ2pCLEVBQUUsRUFBRSxFQUFFLEdBQUc7QUFDVCxFQUFFLE9BQU8sRUFBRSxHQUFHO0FBQ2QsRUFBRSxRQUFRLEVBQUUsR0FBRztBQUNmLEVBQUUsMkJBQTJCLEVBQUUsR0FBRztBQUNsQyxFQUFFLFNBQVMsRUFBRSxHQUFHO0FBQ2hCLEVBQUUsWUFBWSxFQUFFLEdBQUc7QUFDbkIsRUFBRSxjQUFjLEVBQUUsR0FBRztBQUNyQixFQUFFLFdBQVcsRUFBRSxHQUFHO0FBQ2xCLEVBQUUsZUFBZSxFQUFFLEdBQUc7QUFDdEIsRUFBRSxNQUFNLEVBQUUsR0FBRztBQUNiLEVBQUUsZUFBZSxFQUFFLEdBQUc7QUFDdEIsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHO0FBQ3ZCLEVBQUUsS0FBSyxFQUFFLEdBQUc7QUFDWixFQUFFLFFBQVEsRUFBRSxHQUFHO0FBQ2YsRUFBRSxXQUFXLEVBQUUsR0FBRztBQUNsQixFQUFFLFFBQVEsRUFBRSxHQUFHO0FBQ2YsRUFBRSxNQUFNLEVBQUUsR0FBRztBQUNiLEVBQUUsaUJBQWlCLEVBQUUsR0FBRztBQUN4QixFQUFFLGlCQUFpQixFQUFFLEdBQUc7QUFDeEIsRUFBRSxVQUFVLEVBQUUsR0FBRztBQUNqQixFQUFFLFlBQVksRUFBRSxHQUFHO0FBQ25CLEVBQUUsZUFBZSxFQUFFLEdBQUc7QUFDdEIsRUFBRSxTQUFTLEVBQUUsR0FBRztBQUNoQixFQUFFLFFBQVEsRUFBRSxHQUFHO0FBQ2YsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHO0FBQ3ZCLEVBQUUsYUFBYSxFQUFFLEdBQUc7QUFDcEIsRUFBRSwyQkFBMkIsRUFBRSxHQUFHO0FBQ2xDLEVBQUUsY0FBYyxFQUFFLEdBQUc7QUFDckIsRUFBRSxRQUFRLEVBQUUsR0FBRztBQUNmLEVBQUUsSUFBSSxFQUFFLEdBQUc7QUFDWCxFQUFFLGNBQWMsRUFBRSxHQUFHO0FBQ3JCLEVBQUUsa0JBQWtCLEVBQUUsR0FBRztBQUN6QixFQUFFLGVBQWUsRUFBRSxHQUFHO0FBQ3RCLEVBQUUsVUFBVSxFQUFFLEdBQUc7QUFDakIsRUFBRSxvQkFBb0IsRUFBRSxHQUFHO0FBQzNCLEVBQUUsbUJBQW1CLEVBQUUsR0FBRztBQUMxQixFQUFFLGlCQUFpQixFQUFFLEdBQUc7QUFDeEIsRUFBRSxTQUFTLEVBQUUsR0FBRztBQUNoQixFQUFFLGtCQUFrQixFQUFFLEdBQUc7QUFDekIsRUFBRSxtQkFBbUIsRUFBRSxHQUFHO0FBQzFCLEVBQUUsTUFBTSxFQUFFLEdBQUc7QUFDYixFQUFFLGdCQUFnQixFQUFFLEdBQUc7QUFDdkIsRUFBRSxRQUFRLEVBQUUsR0FBRztBQUNmLEVBQUUsZUFBZSxFQUFFLEdBQUc7QUFDdEIsRUFBRSxvQkFBb0IsRUFBRSxHQUFHO0FBQzNCLEVBQUUsZUFBZSxFQUFFLEdBQUc7QUFDdEIsRUFBRSwyQkFBMkIsRUFBRSxHQUFHO0FBQ2xDLEVBQUUsMEJBQTBCLEVBQUUsR0FBRztBQUNqQyxFQUFFLG1CQUFtQixFQUFFLEdBQUc7QUFDMUIsRUFBRSxjQUFjLEVBQUUsR0FBRztBQUNyQixFQUFFLFVBQVUsRUFBRSxHQUFHO0FBQ2pCLEVBQUUsa0JBQWtCLEVBQUUsR0FBRztBQUN6QixFQUFFLGNBQWMsRUFBRSxHQUFHO0FBQ3JCLEVBQUUsdUJBQXVCLEVBQUUsR0FBRztBQUM5QixFQUFFLHFCQUFxQixFQUFFLEdBQUc7QUFDNUIsRUFBRSxtQkFBbUIsRUFBRSxHQUFHO0FBQzFCLEVBQUUsWUFBWSxFQUFFLEdBQUc7QUFDbkIsRUFBRSxXQUFXLEVBQUUsR0FBRztBQUNsQixFQUFFLDZCQUE2QixFQUFFLEdBQUc7QUFDcEMsQ0FBQzs7QUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDQSxnQkFBYyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEtBQUs7QUFDekQsRUFBRUEsZ0JBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHO0FBQzdCLENBQUMsQ0FBQzs7QUNoREY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGNBQWMsQ0FBQyxhQUFhLEVBQUU7QUFDdkMsRUFBRSxNQUFNLE9BQU8sR0FBRyxJQUFJSCxPQUFLLENBQUMsYUFBYSxDQUFDO0FBQzFDLEVBQUUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDQSxPQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7O0FBRXpEO0FBQ0EsRUFBRWQsT0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUVjLE9BQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUV0RTtBQUNBLEVBQUVkLE9BQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRTNEO0FBQ0EsRUFBRSxRQUFRLENBQUMsTUFBTSxHQUFHLFNBQVMsTUFBTSxDQUFDLGNBQWMsRUFBRTtBQUNwRCxJQUFJLE9BQU8sY0FBYyxDQUFDVyxhQUFXLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3JFLEdBQUc7O0FBRUgsRUFBRSxPQUFPLFFBQVE7QUFDakI7O0FBRUE7QUFDQSxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDOztBQUV0QztBQUNBLEtBQUssQ0FBQyxLQUFLLEdBQUdHLE9BQUs7O0FBRW5CO0FBQ0EsS0FBSyxDQUFDLGFBQWEsR0FBR0osZUFBYTtBQUNuQyxLQUFLLENBQUMsV0FBVyxHQUFHUSxhQUFXO0FBQy9CLEtBQUssQ0FBQyxRQUFRLEdBQUdULFVBQVE7QUFDekIsS0FBSyxDQUFDLE9BQU8sR0FBR0csU0FBTztBQUN2QixLQUFLLENBQUMsVUFBVSxHQUFHVixZQUFVOztBQUU3QjtBQUNBLEtBQUssQ0FBQyxVQUFVLEdBQUdILFlBQVU7O0FBRTdCO0FBQ0EsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsYUFBYTs7QUFFbEM7QUFDQSxLQUFLLENBQUMsR0FBRyxHQUFHLFNBQVMsR0FBRyxDQUFDLFFBQVEsRUFBRTtBQUNuQyxFQUFFLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFDOUIsQ0FBQzs7QUFFRCxLQUFLLENBQUMsTUFBTSxHQUFHZ0IsUUFBTTs7QUFFckI7QUFDQSxLQUFLLENBQUMsWUFBWSxHQUFHQyxjQUFZOztBQUVqQztBQUNBLEtBQUssQ0FBQyxXQUFXLEdBQUdMLGFBQVc7O0FBRS9CLEtBQUssQ0FBQyxZQUFZLEdBQUdILGNBQVk7O0FBRWpDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxJQUFJLGNBQWMsQ0FBQ1IsT0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7O0FBRWpHLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVU7O0FBRXRDLEtBQUssQ0FBQyxjQUFjLEdBQUdpQixnQkFBYzs7QUFFckMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLOztBQ25GckI7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEVBQUUsS0FBSztBQUNQLEVBQUUsVUFBVTtBQUNaLEVBQUUsYUFBYTtBQUNmLEVBQUUsUUFBUTtBQUNWLEVBQUUsV0FBVztBQUNiLEVBQUUsT0FBTztBQUNULEVBQUUsR0FBRztBQUNMLEVBQUUsTUFBTTtBQUNSLEVBQUUsWUFBWTtBQUNkLEVBQUUsTUFBTTtBQUNSLEVBQUUsVUFBVTtBQUNaLEVBQUUsWUFBWTtBQUNkLEVBQUUsY0FBYztBQUNoQixFQUFFLFVBQVU7QUFDWixFQUFFLFVBQVU7QUFDWixFQUFFO0FBQ0YsQ0FBQyxHQUFHLEtBQUs7O0FDdEJNLE1BQU0sUUFBUSxTQUFTLEtBQUssQ0FBQztBQUM1QyxJQUFJLE1BQU07QUFDVixJQUFJLEtBQUs7QUFDVCxJQUFJLE9BQU87QUFDWCxJQUFJLElBQUk7QUFDUixJQUFJLE9BQU8sZ0JBQWdCLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRTtBQUNqRCxRQUFRLE9BQU8sSUFBSSxJQUFJLENBQUM7QUFDeEIsWUFBWSxNQUFNLEVBQUUsR0FBRztBQUN2QixZQUFZLFVBQVU7QUFDdEIsWUFBWSxJQUFJLEVBQUU7QUFDbEIsZ0JBQWdCO0FBQ2hCO0FBQ0EsU0FBUyxDQUFDO0FBQ1Y7QUFDQSxJQUFJLFdBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBRTtBQUM1RCxRQUFRLElBQUksV0FBVyxHQUFHLEVBQUU7QUFDNUIsUUFBUSxJQUFJLEtBQUssR0FBRyxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDdEMsWUFBWSxXQUFXLEdBQUcsSUFBSTtBQUM5QjtBQUNBLGFBQWE7QUFDYixZQUFZLFdBQVcsR0FBRyxJQUFJLEVBQUUsT0FBTyxJQUFJLEVBQUU7QUFDN0MsWUFBWSxLQUFLLEdBQUcsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO0FBQ3JDO0FBQ0EsUUFBUSxLQUFLLEVBQUU7QUFDZixRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRTtBQUN2QixRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTTtBQUM1QixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxJQUFJLEtBQUssSUFBSSxVQUFVLElBQUksRUFBRTtBQUMzRCxRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVztBQUNsQyxRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCO0FBQ3JDO0FBQ0E7O0FDOUJBLE1BQU0sY0FBYyxDQUFDO0FBQ3JCLElBQUksT0FBTztBQUNYLElBQUksSUFBSTtBQUNSLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDOUIsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU07QUFDN0IsUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUk7QUFDeEI7QUFDQSxJQUFJLE1BQU0sR0FBRztBQUNiLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTztBQUMzQjtBQUNBLElBQUksS0FBSyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUc7QUFDL0IsUUFBUSxPQUFPLE1BQU07QUFDckI7QUFDQTtBQUNBLE1BQU0sa0JBQWtCLENBQUM7QUFDekIsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUU7QUFDL0IsUUFBUSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEdBQUcsR0FBRyxJQUFJO0FBQzVELFFBQVEsT0FBTztBQUNmLFlBQVksSUFBSSxRQUFRLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUMvRCxZQUFZLElBQUksV0FBVyxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7QUFDL0MsWUFBWSxJQUFJLFdBQVcsSUFBSSxFQUFFLFdBQVcsRUFBRTtBQUM5QyxTQUFTO0FBQ1Q7QUFDQSxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7QUFDdEIsUUFBUSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUcsR0FBRyxJQUFJO0FBQzlFLFFBQVEsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxDQUFDO0FBQ2hGO0FBQ0EsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUU7QUFDNUIsUUFBUSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEdBQUcsR0FBRyxJQUFJO0FBQzVELFFBQVEsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxDQUFDO0FBQ2hGO0FBQ0EsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFO0FBQzFCLFFBQVEsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEdBQUcsR0FBRyxNQUFNO0FBQ25ELFFBQVEsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUM7QUFDNUY7QUFDQSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDbkIsUUFBUSxPQUFPLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVTtBQUMxRTtBQUNBLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRTtBQUN0QixRQUFRLE9BQU8sT0FBTyxHQUFHLEtBQUs7QUFDOUIsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUk7QUFDekI7QUFDQSxJQUFJLGFBQWEsQ0FBQyxHQUFHLEVBQUU7QUFDdkIsUUFBUSxPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksR0FBRyxZQUFZLElBQUksQ0FBQyxDQUFDO0FBQzlHO0FBQ0EsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO0FBQ25CLFFBQVEsT0FBTyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDckU7QUFDQSxJQUFJLGlCQUFpQixDQUFDLFVBQVUsRUFBRTtBQUNsQyxRQUFRLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO0FBQzVELFFBQVEsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7QUFDMUQsUUFBUSxNQUFNLFFBQVEsR0FBRyxPQUFPLFVBQVUsS0FBSyxRQUFRO0FBQ3ZELFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUN2QixZQUFZLElBQUksYUFBYSxFQUFFO0FBQy9CLGdCQUFnQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO0FBQ25EO0FBQ0EsWUFBWSxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQzlFLGdCQUFnQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO0FBQ3JEO0FBQ0EsWUFBWSxJQUFJLFlBQVksRUFBRTtBQUM5QixnQkFBZ0IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDO0FBQ3pEO0FBQ0E7QUFDQSxRQUFRLE1BQU0sT0FBTyxHQUFHO0FBQ3hCLFlBQVksUUFBUSxFQUFFLE1BQU07QUFDNUIsWUFBWSxXQUFXLEVBQUUsU0FBUztBQUNsQyxZQUFZLFdBQVcsRUFBRTtBQUN6QixTQUFTO0FBQ1QsUUFBUSxPQUFPLE9BQU87QUFDdEI7QUFDQSxJQUFJLHdCQUF3QixDQUFDLGlCQUFpQixFQUFFO0FBQ2hELFFBQVEsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztBQUN6RCxRQUFRLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7QUFDbkUsUUFBUSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDO0FBQ2pFLFFBQVEsTUFBTSxRQUFRLEdBQUcsT0FBTyxpQkFBaUIsS0FBSyxRQUFRO0FBQzlELFFBQVEsSUFBSSxNQUFNO0FBQ2xCLFFBQVEsSUFBSSxRQUFRLElBQUksUUFBUSxJQUFJLGFBQWEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7QUFDdkYsWUFBWSxNQUFNLEdBQUcsaUJBQWlCO0FBQ3RDO0FBQ0EsYUFBYSxJQUFJLFlBQVksRUFBRTtBQUMvQixZQUFZLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxJQUFJO0FBQzNDO0FBQ0EsYUFBYTtBQUNiLFlBQVksTUFBTSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyx3QkFBd0IsRUFBRSxPQUFPLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BHO0FBQ0EsOEVBQThFLENBQUMsQ0FBQztBQUNoRjtBQUNBLFFBQVEsT0FBTyxNQUFNO0FBQ3JCO0FBQ0EsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQ3BDLFFBQVEsT0FBTyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO0FBQy9DO0FBQ0E7O0FDM0ZBLE1BQU0sZUFBZSxDQUFDO0FBQ3RCLElBQUksbUJBQW1CO0FBQ3ZCLElBQUksUUFBUTtBQUNaLElBQUksa0JBQWtCO0FBQ3RCLElBQUksV0FBVyxDQUFDLG1CQUFtQixFQUFFO0FBQ3JDLFFBQVEsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQjtBQUN0RCxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixDQUFDO0FBQzFFLFFBQVEsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksa0JBQWtCLEVBQUU7QUFDMUQ7QUFDQSxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUU7QUFDekIsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ25CLFlBQVksTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQztBQUN6RDtBQUNBLFFBQVEsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO0FBQ3pDLGFBQWEsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUN4RCxhQUFhLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEtBQUs7QUFDMUMsWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzdDLGdCQUFnQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ2pELGdCQUFnQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsRUFBRTtBQUMvRCxvQkFBb0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsZUFBZSxFQUFFLFdBQVcsQ0FBQztBQUN4RSxvQkFBb0IsT0FBTyxXQUFXO0FBQ3RDO0FBQ0EsZ0JBQWdCLE1BQU0sUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsc0RBQXNELENBQUMsQ0FBQztBQUMxTTtBQUNBLFlBQVksSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO0FBQ25DLGdCQUFnQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQzlDLGdCQUFnQixJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRTtBQUNqRSxvQkFBb0IsTUFBTSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsMERBQTBELENBQUM7QUFDMUo7QUFDQSxnQkFBZ0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQztBQUNwRSxnQkFBZ0IsT0FBTyxXQUFXO0FBQ2xDO0FBQ0EsWUFBWSxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUM7QUFDbkUsWUFBWSxPQUFPLFdBQVc7QUFDOUIsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7QUFDMUMsUUFBUSxPQUFPLFFBQVE7QUFDdkI7QUFDQSxJQUFJLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFO0FBQ2pELFFBQVEsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDdEMsWUFBWSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztBQUM5QyxZQUFZO0FBQ1o7QUFDQSxRQUFRLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLEVBQUU7QUFDdEQsWUFBWSxNQUFNLFlBQVksR0FBRyxnQkFBZ0I7QUFDakQsWUFBWSxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLENBQUM7QUFDdkUsWUFBWTtBQUNaO0FBQ0EsUUFBUSxJQUFJLE9BQU8sSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUN2QyxZQUFZLE1BQU0sZUFBZSxHQUFHLGdCQUFnQixDQUFDO0FBQ3JELFlBQVksSUFBSSxJQUFJLFlBQVksSUFBSSxFQUFFO0FBQ3RDLGdCQUFnQixlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDO0FBQ2hFLGdCQUFnQjtBQUNoQjtBQUNBLFlBQVksSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3hELGdCQUFnQixNQUFNLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JELGdCQUFnQixlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtBQUNqQixRQUFRLE9BQU8sT0FBTyxJQUFJLEtBQUs7QUFDL0IsZ0JBQWdCLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLFlBQVksSUFBSTtBQUNuRSxlQUFlLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSTtBQUNwRCxnQkFBZ0IsT0FBTyxjQUFjLEtBQUssV0FBVyxJQUFJLElBQUksWUFBWSxjQUFjLENBQUM7QUFDeEY7QUFDQSxJQUFJLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtBQUMzQixRQUFRLE9BQU8sT0FBTyxHQUFHLEtBQUs7QUFDOUIsZUFBZSxHQUFHLEtBQUs7QUFDdkIsZUFBZSxPQUFPLEdBQUcsQ0FBQyxVQUFVLEtBQUssVUFBVTtBQUNuRDtBQUNBLElBQUksbUJBQW1CLENBQUMsS0FBSyxFQUFFO0FBQy9CLFFBQVEsUUFBUSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLEtBQUs7QUFDMUQsZUFBZSxPQUFPLEtBQUssS0FBSztBQUNoQyxnQkFBZ0IsT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLEtBQUssWUFBWSxJQUFJO0FBQ3BFLGdCQUFnQixPQUFPLElBQUksS0FBSyxXQUFXLElBQUksS0FBSyxZQUFZLElBQUk7QUFDcEUsZUFBZSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUs7QUFDckQsZUFBZSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUs7QUFDckQsZ0JBQWdCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUk7QUFDdkcsb0JBQW9CLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLFlBQVksSUFBSTtBQUN2RSxvQkFBb0IsT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLEtBQUssWUFBWSxJQUFJO0FBQ3hFLG1CQUFtQixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUk7QUFDeEQsbUJBQW1CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUMzRDtBQUNBLElBQUksWUFBWSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUU7QUFDeEQsUUFBUSxNQUFNLGNBQWMsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxLQUFLO0FBQ3RFLFlBQVksTUFBTSxHQUFHLEdBQUcsV0FBVyxLQUFLLHdCQUF3QixHQUFHLE1BQU0sR0FBRyxXQUFXO0FBQ3ZGLFlBQVksTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQztBQUN4RixZQUFZLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7QUFDakYsWUFBWSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUNsRCxnQkFBZ0IsTUFBTSxFQUFFLEdBQUcsUUFBUTtBQUNuQyxnQkFBZ0IsTUFBTSxJQUFJLEdBQUcsT0FBTyxPQUFPLEtBQUssUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTztBQUN6RixnQkFBZ0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQztBQUM3QyxnQkFBZ0I7QUFDaEI7QUFDQSxZQUFZLElBQUksT0FBTyxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQzNDLGdCQUFnQixNQUFNLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQztBQUN6RCxnQkFBZ0IsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUM5RixvQkFBb0IsTUFBTSxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RCxvQkFBb0IsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDL0Usb0JBQW9CO0FBQ3BCO0FBQ0EsZ0JBQWdCLElBQUksT0FBTyxZQUFZLElBQUksRUFBRTtBQUM3QyxvQkFBb0IsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDMUUsb0JBQW9CO0FBQ3BCO0FBQ0EsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUMvRCxvQkFBb0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDO0FBQ3hHLG9CQUFvQixlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUNwRTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2xDLFlBQVksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRTtBQUMxQyxnQkFBZ0IsY0FBYyxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLENBQUM7QUFDcEUsYUFBYSxDQUFDO0FBQ2Q7QUFDQSxhQUFhO0FBQ2IsWUFBWSxjQUFjLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQztBQUNqRTtBQUNBO0FBQ0EsSUFBSSxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTtBQUNuRCxRQUFRLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxLQUFLO0FBQ3RELFlBQVksSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDckQsZ0JBQWdCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQ2pEO0FBQ0Esb0JBQW9CLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDakMsMEJBQTBCO0FBQzFCLDBCQUEwQjtBQUMxQiwwQkFBMEIsZ0ZBQWdGLENBQUM7QUFDM0csb0JBQW9CLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3RTtBQUNBLGdCQUFnQixPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztBQUN6RDtBQUNBLFlBQVksSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7QUFDN0MsZ0JBQWdCLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDO0FBQ3pEO0FBQ0EsWUFBWSxJQUFJLE9BQU8sSUFBSSxLQUFLLFNBQVMsSUFBSSxPQUFPLFlBQVksSUFBSSxFQUFFO0FBQ3RFLGdCQUFnQixPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztBQUN6RDtBQUNBLFlBQVksTUFBTSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsMkRBQTJELEVBQUUsdUdBQXVHLENBQUM7QUFDak4sU0FBUztBQUNULFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2xDLFlBQVksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRTtBQUMxQyxnQkFBZ0IsaUJBQWlCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztBQUM1QyxhQUFhLENBQUM7QUFDZDtBQUNBLGFBQWEsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO0FBQ2hDLFlBQVksaUJBQWlCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztBQUN6QztBQUNBO0FBQ0E7O0FDeEplLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsSUFBSSxPQUFPO0FBQ1gsSUFBSSxPQUFPLGlCQUFpQixHQUFHLHdCQUF3QjtBQUN2RCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7QUFDekIsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDOUI7QUFDQSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDaEIsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLEtBQUs7QUFDakUsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQztBQUNwQztBQUNBLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRTtBQUNaLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHlCQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2hFLGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDcEM7QUFDQSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDakIsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLDBCQUEwQixFQUFFLEVBQUUsSUFBSSxFQUFFO0FBQzNFLGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDcEM7QUFDQSxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUU7QUFDZixRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDO0FBQ3hFLGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDcEM7QUFDQSxJQUFJLE9BQU8sQ0FBQyxFQUFFLEVBQUU7QUFDaEIsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMseUJBQXlCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUN6RSxhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3BDO0FBQ0E7O2dCQ3BCQSxNQUFNLE9BQU8sQ0FBQztBQUNkLElBQUksUUFBUTtBQUNaLElBQUksR0FBRztBQUNQLElBQUksR0FBRztBQUNQLElBQUksT0FBTztBQUNYLElBQUksT0FBTztBQUNYLElBQUksZUFBZTtBQUNuQixJQUFJLGFBQWE7QUFDakIsSUFBSSxLQUFLO0FBQ1QsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRTtBQUNuQyxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVE7QUFDeEMsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHO0FBQzlCLFFBQVEsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRztBQUM5QixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU87QUFDdEMsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ2xFLFFBQVEsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUM7QUFDNUQsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztBQUN0QyxRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxFQUFFLEtBQUs7QUFDbkM7QUFDQSxJQUFJLE1BQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFO0FBQzlDLFFBQVEsTUFBTSxPQUFPLEdBQUcsRUFBRSxHQUFHLGFBQWEsRUFBRTtBQUM1QyxRQUFRLE9BQU8sT0FBTyxFQUFFLE9BQU87QUFDL0IsUUFBUSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDO0FBQzFFLFFBQVEsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRTtBQUNyQyxRQUFRLElBQUksT0FBTyxFQUFFLEtBQUssSUFBSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDckYsWUFBWSxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDOUQsWUFBWSxPQUFPLE1BQU0sQ0FBQyxLQUFLO0FBQy9CO0FBQ0EsUUFBUSxJQUFJLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDM0IsWUFBWSxNQUFNLElBQUksR0FBRyxPQUFPLEVBQUUsSUFBSTtBQUN0QyxZQUFZLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSTtBQUM5QixZQUFZLE9BQU8sTUFBTSxDQUFDLElBQUk7QUFDOUI7QUFDQSxRQUFRLElBQUksUUFBUTtBQUNwQixRQUFRLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztBQUMvQyxRQUFRLElBQUk7QUFDWixZQUFZLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDM0MsZ0JBQWdCLE1BQU0sRUFBRSxNQUFNLENBQUMsaUJBQWlCLEVBQUU7QUFDbEQsZ0JBQWdCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztBQUNyQyxnQkFBZ0IsR0FBRyxFQUFFLFFBQVE7QUFDN0IsZ0JBQWdCLE9BQU8sRUFBRSxjQUFjO0FBQ3ZDLGdCQUFnQixHQUFHLE1BQU07QUFDekIsZ0JBQWdCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtBQUNqRCxnQkFBZ0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO0FBQ2pDLGFBQWEsQ0FBQztBQUNkO0FBQ0EsUUFBUSxPQUFPLEdBQUcsRUFBRTtBQUNwQixZQUFZLE1BQU0sYUFBYSxHQUFHLEdBQUc7QUFDckMsWUFBWSxNQUFNLElBQUksUUFBUSxDQUFDO0FBQy9CLGdCQUFnQixNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLElBQUksR0FBRztBQUM5RCxnQkFBZ0IsVUFBVSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsVUFBVSxJQUFJLGFBQWEsQ0FBQyxJQUFJO0FBQ3JGLGdCQUFnQixJQUFJLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLElBQUksYUFBYSxDQUFDO0FBQ3JFLGFBQWEsQ0FBQztBQUNkO0FBQ0EsUUFBUSxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO0FBQ3hELFFBQVEsT0FBTyxHQUFHO0FBQ2xCO0FBQ0EsSUFBSSxNQUFNLGVBQWUsQ0FBQyxRQUFRLEVBQUU7QUFDcEMsUUFBUSxNQUFNLEdBQUcsR0FBRztBQUNwQixZQUFZLElBQUksRUFBRSxFQUFFO0FBQ3BCLFlBQVksTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUM5QixTQUFTO0FBQ1QsUUFBUSxJQUFJLE9BQU8sUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDL0MsWUFBWSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUsseUJBQXlCLEVBQUU7QUFDN0QsZ0JBQWdCLE1BQU0sSUFBSSxRQUFRLENBQUM7QUFDbkMsb0JBQW9CLE1BQU0sRUFBRSxHQUFHO0FBQy9CLG9CQUFvQixVQUFVLEVBQUUsZUFBZTtBQUMvQyxvQkFBb0IsSUFBSSxFQUFFLFFBQVEsQ0FBQztBQUNuQyxpQkFBaUIsQ0FBQztBQUNsQjtBQUNBLFlBQVksR0FBRyxDQUFDLElBQUksR0FBRztBQUN2QixnQkFBZ0IsT0FBTyxFQUFFLFFBQVEsQ0FBQztBQUNsQyxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsWUFBWSxHQUFHLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJO0FBQ3BDO0FBQ0EsUUFBUSxPQUFPLEdBQUc7QUFDbEI7QUFDQSxJQUFJLHVCQUF1QixDQUFDLGFBQWEsRUFBRTtBQUMzQyxRQUFRLE1BQU0sY0FBYyxHQUFHLElBQUksWUFBWSxFQUFFO0FBQ2pELFFBQVEsTUFBTSxLQUFLLEdBQUdFLG9CQUFhLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25FLFFBQVEsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDekQsUUFBUSxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEMsUUFBUSxNQUFNLHFCQUFxQixHQUFHLGFBQWEsSUFBSSxhQUFhLENBQUMsT0FBTztBQUM1RSxRQUFRLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQztBQUMvRSxRQUFRLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO0FBQ3pDLFFBQVEsT0FBTyxjQUFjO0FBQzdCO0FBQ0EsSUFBSSxxQkFBcUIsQ0FBQyxhQUFhLEdBQUcsRUFBRSxFQUFFO0FBQzlDLFFBQVEsSUFBSSxjQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUU7QUFDL0MsUUFBUSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxXQUFXLEtBQUs7QUFDbkcsWUFBWSxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLFdBQVc7QUFDNUMsWUFBWSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztBQUM5QyxZQUFZLE9BQU8sa0JBQWtCO0FBQ3JDLFNBQVMsRUFBRSxjQUFjLENBQUM7QUFDMUIsUUFBUSxPQUFPLGNBQWM7QUFDN0I7QUFDQSxJQUFJLG1CQUFtQixDQUFDLFlBQVksRUFBRTtBQUN0QyxRQUFRLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztBQUNuRCxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU87QUFDM0IsWUFBWSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixHQUFHO0FBQ25ELFNBQVMsQ0FBQztBQUNWLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQ2pDO0FBQ0EsSUFBSSxxQkFBcUIsR0FBRztBQUM1QixRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDO0FBQ2hFO0FBQ0EsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO0FBQ3ZDLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUMvRDtBQUNBLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsR0FBRyxJQUFJLEVBQUU7QUFDbEUsUUFBUSxJQUFJLE9BQU8sR0FBRyxFQUFFO0FBQ3hCLFFBQVEsSUFBSSxpQkFBaUIsRUFBRTtBQUMvQixZQUFZLE9BQU8sR0FBRyxFQUFFLGNBQWMsRUFBRSxtQ0FBbUMsRUFBRTtBQUM3RTtBQUNBLFFBQVEsTUFBTSxjQUFjLEdBQUc7QUFDL0IsWUFBWSxHQUFHLE9BQU87QUFDdEIsWUFBWSxJQUFJLEVBQUUsSUFBSTtBQUN0QixZQUFZLEdBQUc7QUFDZixTQUFTO0FBQ1QsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxjQUFjLENBQUM7QUFDeEQ7QUFDQSxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtBQUM3QixRQUFRLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7QUFDckQ7QUFDQSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUM3QixRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7QUFDdkQ7QUFDQSxJQUFJLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQzFCLFFBQVEsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO0FBQ2xFLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFO0FBQ25ELFlBQVksT0FBTyxFQUFFLEVBQUUsY0FBYyxFQUFFLHFCQUFxQjtBQUM1RCxTQUFTLEVBQUUsS0FBSyxDQUFDO0FBQ2pCO0FBQ0EsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtBQUN6QixRQUFRLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztBQUNsRSxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRTtBQUNsRCxZQUFZLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxxQkFBcUI7QUFDNUQsU0FBUyxFQUFFLEtBQUssQ0FBQztBQUNqQjtBQUNBLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDM0IsUUFBUSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7QUFDbEUsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUU7QUFDcEQsWUFBWSxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUscUJBQXFCO0FBQzVELFNBQVMsRUFBRSxLQUFLLENBQUM7QUFDakI7QUFDQSxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUM1QixRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7QUFDdEQ7QUFDQSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ3RCLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO0FBQ2hEO0FBQ0E7O0FDL0pBO0FBQ2UsTUFBTSxNQUFNLENBQUM7QUFDNUIsSUFBSSxJQUFJO0FBQ1IsSUFBSSxXQUFXO0FBQ2YsSUFBSSxpQkFBaUI7QUFDckIsSUFBSSxLQUFLO0FBQ1QsSUFBSSxRQUFRO0FBQ1osSUFBSSxXQUFXO0FBQ2YsSUFBSSxVQUFVO0FBQ2QsSUFBSSxhQUFhO0FBQ2pCLElBQUksVUFBVTtBQUNkLElBQUksSUFBSTtBQUNSLElBQUkscUJBQXFCO0FBQ3pCLElBQUksbUJBQW1CO0FBQ3ZCLElBQUksRUFBRTtBQUNOLElBQUksV0FBVztBQUNmLElBQUksVUFBVTtBQUNkLElBQUksVUFBVTtBQUNkLElBQUksNkJBQTZCO0FBQ2pDLElBQUksU0FBUztBQUNiLElBQUksYUFBYTtBQUNqQixJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRTtBQUMxQyxRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUk7QUFDN0IsUUFBUSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXO0FBQzNDLFFBQVEsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUI7QUFDdkQsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLO0FBQy9CLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUTtBQUNyQyxRQUFRLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVc7QUFDM0MsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDbkQsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhO0FBQy9DLFFBQVEsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVTtBQUN6QyxRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUk7QUFDN0IsUUFBUSxJQUFJLENBQUMscUJBQXFCLEdBQUcsU0FBUyxJQUFJLElBQUk7QUFDdEQsUUFBUSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxJQUFJLElBQUk7QUFDbEQsUUFBUSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFO0FBQ3pCLFFBQVEsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVztBQUMzQyxRQUFRLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVU7QUFDekMsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVO0FBQ3pDLFFBQVEsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyw2QkFBNkI7QUFDL0U7QUFDQTtBQUNBO0FBQ0EsUUFBUSxNQUFNLFdBQVcsR0FBRyxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUM7QUFDMUQsUUFBUSxNQUFNLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsWUFBWSxLQUFLO0FBQzVFLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7QUFDcEMsZ0JBQWdCLE1BQU0sSUFBSSxHQUFHLFlBQVk7QUFDekMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQzlDO0FBQ0EsWUFBWSxPQUFPLEdBQUc7QUFDdEIsU0FBUyxFQUFFLEVBQUUsQ0FBQztBQUNkLFFBQVEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUM7QUFDOUM7QUFDQTs7QUNqRGUsTUFBTSxhQUFhLENBQUM7QUFDbkMsSUFBSSxPQUFPO0FBQ1gsSUFBSSxpQkFBaUI7QUFDckIsSUFBSSxlQUFlO0FBQ25CLElBQUksVUFBVTtBQUNkLElBQUksY0FBYztBQUNsQixJQUFJLE1BQU07QUFDVixJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU0sR0FBRyxPQUFPLEVBQUU7QUFDN0gsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDOUIsUUFBUSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsdUJBQXVCO0FBQ3hELFFBQVEsSUFBSSxDQUFDLGVBQWUsR0FBRyxxQkFBcUI7QUFDcEQsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFnQjtBQUMxQyxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTTtBQUM1QixRQUFRLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYztBQUM1QztBQUNBLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFO0FBQzVCLFFBQVEsTUFBTSxtQkFBbUIsR0FBRyxJQUFJO0FBQ3hDLFFBQVEsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUs7QUFDcEYsWUFBWSxNQUFNLElBQUksR0FBRyxHQUFHO0FBQzVCLFlBQVksSUFBSSxPQUFPLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUNoRSxnQkFBZ0IsTUFBTSxLQUFLLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO0FBQ3ZELGdCQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssTUFBTSxJQUFJLE1BQU0sR0FBRyxPQUFPO0FBQzVFO0FBQ0EsWUFBWSxPQUFPLEdBQUc7QUFDdEIsU0FBUyxFQUFFLEVBQUUsQ0FBQztBQUNkLFFBQVEsT0FBTyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsYUFBYSxFQUFFO0FBQzVDO0FBQ0EsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFO0FBQzVCLFFBQVEsT0FBTyxRQUFRLENBQUMsSUFBSTtBQUM1QjtBQUNBLElBQUksZUFBZSxDQUFDLFFBQVEsRUFBRTtBQUM5QixRQUFRLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNsRCxZQUFZLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFO0FBQzNELGdCQUFnQixPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQztBQUN2QyxhQUFhLENBQUM7QUFDZDtBQUNBLFFBQVEsT0FBTyxFQUFFO0FBQ2pCO0FBQ0EsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFO0FBQzNCLFFBQVEsT0FBTyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7QUFDdkg7QUFDQSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDaEIsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLO0FBQ3BELGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckQ7QUFDQSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQ3ZCLFFBQVEsTUFBTSxhQUFhLEdBQUcsS0FBSyxHQUFHO0FBQ3RDLFlBQVksWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLElBQUksS0FBSztBQUNsRCxZQUFZLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxJQUFJLElBQUk7QUFDakQsU0FBUyxHQUFHLEVBQUU7QUFDZCxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxhQUFhO0FBQ3RFLGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEQ7QUFDQSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDakIsUUFBUSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0FBQ3BELFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsT0FBTztBQUM3RCxhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xEO0FBQ0EsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtBQUN6QixRQUFRLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7QUFDcEQsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTztBQUN0RSxhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xEO0FBQ0EsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ25CLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQzlELGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEQ7QUFDQSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDcEIsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzFELGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQ7QUFDQSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7QUFDMUIsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDbEUsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRztBQUM5QixhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3BDO0FBQ0EsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQ25DLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSTtBQUN4RSxhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHO0FBQzlCLGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO0FBQ3hCLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDekI7QUFDQSxJQUFJLENBQUMsQ0FBQztBQUNOLFFBQVEsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3ZDLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDekI7QUFDQSxJQUFJLENBQUMsQ0FBQztBQUNOLFFBQVEsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ25CLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUZBQW1GLENBQUM7QUFDN0csUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztBQUNyRSxhQUFhLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUU7QUFDekIsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxRkFBcUYsQ0FBQztBQUMvRyxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUU7QUFDekIsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzR0FBc0csQ0FBQztBQUNoSSxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQy9CLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0ZBQXdGLENBQUM7QUFDbEgsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFO0FBQ3RDLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkdBQTJHLENBQUM7QUFDckksUUFBUSxJQUFJLFlBQVksR0FBRyxFQUFFO0FBQzdCLFFBQVEsSUFBSSxXQUFXLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUU7QUFDbkQsWUFBWSxNQUFNLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQywrQkFBK0IsRUFBRSxnREFBZ0QsQ0FBQztBQUM5SDtBQUNBLGFBQWEsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQ3RDLFlBQVksWUFBWSxHQUFHLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RDtBQUNBLGFBQWEsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFO0FBQ2pDLFlBQVksWUFBWSxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsRDtBQUNBLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ2xHO0FBQ0EsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQ3RDLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQzFHLGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUc7QUFDOUIsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQztBQUNwQztBQUNBLElBQUksTUFBTSxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQzNDLFFBQVEsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdEksUUFBUSxPQUFPO0FBQ2YsWUFBWSxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07QUFDOUIsWUFBWSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUNoQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtBQUNsQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJKQUEySixDQUFDO0FBQ3JMLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFO0FBQ2pILGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQztBQUMvQjtBQUNBOztBQzlLZSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLElBQUksT0FBTztBQUNYLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUN6QixRQUFRLElBQUksT0FBTyxFQUFFO0FBQ3JCLFlBQVksSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO0FBQ2xDO0FBQ0E7QUFDQSxJQUFJLFNBQVMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUU7QUFDdkQsUUFBUSxNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDMUMsUUFBUSxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsU0FBUztBQUMxQyxRQUFRLE1BQU0sU0FBUyxHQUFHLE9BQU8sSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtBQUMvRyxRQUFRLElBQUksZ0JBQWdCLEdBQUcsSUFBSTtBQUNuQyxRQUFRLElBQUksWUFBWSxFQUFFO0FBQzFCLFlBQVksZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZO0FBQzVELGtCQUFrQixZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVk7QUFDL0Msa0JBQWtCLFNBQVM7QUFDM0I7QUFDQSxRQUFRLE9BQU87QUFDZixZQUFZLEVBQUU7QUFDZCxZQUFZLElBQUksRUFBRSxZQUFZLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsU0FBUztBQUNwRSxZQUFZLGdCQUFnQjtBQUM1QixZQUFZLEdBQUcsRUFBRTtBQUNqQixTQUFTO0FBQ1Q7QUFDQSxJQUFJLGNBQWMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRTtBQUN6RCxRQUFRLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDMUQsUUFBUSxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUs7QUFDcEQsWUFBWSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUM7QUFDN0UsWUFBWSxPQUFPLEdBQUc7QUFDdEIsU0FBUyxFQUFFLEVBQUUsQ0FBQztBQUNkO0FBQ0EsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFO0FBQ3hDLFFBQVEsSUFBSSxHQUFHLEdBQUcsU0FBUztBQUMzQixRQUFRLE1BQU0sU0FBUyxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUU7QUFDdEMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUU7QUFDNUIsWUFBWSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQ3BELFlBQVksT0FBTyxTQUFTLENBQUMsSUFBSTtBQUNqQztBQUNBLFFBQVEsT0FBTztBQUNmLFlBQVksR0FBRztBQUNmLFlBQVksWUFBWSxFQUFFO0FBQzFCLFNBQVM7QUFDVDtBQUNBLElBQUksTUFBTSxvQkFBb0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtBQUN4RCxRQUFRLE1BQU0sRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7QUFDOUUsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDMUIsWUFBWSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUM7QUFDdEU7QUFDQSxZQUFZLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO0FBQ2xEO0FBQ0EsUUFBUSxNQUFNLElBQUksUUFBUSxDQUFDO0FBQzNCLFlBQVksTUFBTSxFQUFFLEdBQUc7QUFDdkIsWUFBWSxVQUFVLEVBQUUsMkJBQTJCO0FBQ25ELFlBQVksSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUU7QUFDL0IsU0FBUyxDQUFDO0FBQ1Y7QUFDQTs7QUN4RGUsTUFBTSxXQUFXLFNBQVMsbUJBQW1CLENBQUM7QUFDN0QsSUFBSSxPQUFPO0FBQ1gsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQ3pCLFFBQVEsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUN0QixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUM5QjtBQUNBLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRTtBQUN4QixRQUFRLE1BQU0sSUFBSSxHQUFHLEVBQUU7QUFDdkIsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSztBQUN4QyxRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDO0FBQ3ZELFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTTtBQUNyQyxRQUFRLE9BQU8sSUFBSTtBQUNuQjtBQUNBLElBQUksTUFBTSxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUM3QixRQUFRLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQztBQUNqRjtBQUNBOztBQ2xCZSxNQUFNLGNBQWMsQ0FBQztBQUNwQyxJQUFJLEtBQUs7QUFDVCxJQUFJLEdBQUc7QUFDUCxJQUFJLFVBQVU7QUFDZCxJQUFJLEtBQUs7QUFDVCxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDekMsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDckMsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVO0FBQ3pDLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRTtBQUNwRCxZQUFZLE1BQU0sR0FBRyxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUU7QUFDbkMsWUFBWSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDMUMsWUFBWSxPQUFPLEdBQUc7QUFDdEIsU0FBUyxDQUFDO0FBQ1Y7QUFDQTs7QUNiZSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxJQUFJLE9BQU87QUFDWCxJQUFJLE1BQU07QUFDVixJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxHQUFHLE9BQU8sRUFBRTtBQUMzQyxRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUM5QixRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTTtBQUM1QjtBQUNBLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDakMseUNBQXlDLEVBQUUsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDM0UsUUFBUSxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM3QztBQUNBLElBQUksbUJBQW1CLENBQUMsS0FBSyxFQUFFO0FBQy9CLFFBQVEsSUFBSSxZQUFZLEdBQUcsRUFBRTtBQUM3QixRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3BFLFlBQVksWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxFQUFFLFdBQVcsS0FBSztBQUN6RixnQkFBZ0IsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxXQUFXO0FBQ2hELGdCQUFnQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUMxRCxvQkFBb0IsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdFLG9CQUFvQixPQUFPLENBQUMsR0FBRyxjQUFjLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3BFO0FBQ0EsZ0JBQWdCLElBQUksS0FBSyxZQUFZLElBQUksRUFBRTtBQUMzQyxvQkFBb0IsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzFFLG9CQUFvQixPQUFPLGNBQWM7QUFDekM7QUFDQSxnQkFBZ0IsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7QUFDL0Msb0JBQW9CLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDckQ7QUFDQSxnQkFBZ0IsT0FBTyxjQUFjO0FBQ3JDLGFBQWEsRUFBRSxFQUFFLENBQUM7QUFDbEI7QUFDQSxRQUFRLE9BQU8sWUFBWTtBQUMzQjtBQUNBLElBQUksVUFBVSxDQUFDLFFBQVEsRUFBRTtBQUN6QixRQUFRLE9BQU8sSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztBQUNoRDtBQUNBLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDN0IsUUFBUSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDO0FBQzVELFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsRUFBRSxZQUFZO0FBQ25GLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDbEM7QUFDQSxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUU7QUFDdEIsUUFBUSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDO0FBQzVELFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZO0FBQy9ELGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDbEM7QUFDQTs7QUN4RE8sSUFBSSxVQUFVO0FBQ3JCLENBQUMsVUFBVSxVQUFVLEVBQUU7QUFDdkIsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTTtBQUMvQixJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLO0FBQzdCLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU87QUFDakMsQ0FBQyxFQUFFLFVBQVUsS0FBSyxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDNUIsSUFBSSxpQkFBaUI7QUFDNUIsQ0FBQyxVQUFVLGlCQUFpQixFQUFFO0FBQzlCLElBQUksaUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsU0FBUztBQUM1QyxJQUFJLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxHQUFHLFlBQVk7QUFDbEQsSUFBSSxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxjQUFjO0FBQ3RELElBQUksaUJBQWlCLENBQUMsWUFBWSxDQUFDLEdBQUcsWUFBWTtBQUNsRCxDQUFDLEVBQUUsaUJBQWlCLEtBQUssaUJBQWlCLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDMUMsSUFBSSxXQUFXO0FBQ3RCLENBQUMsVUFBVSxXQUFXLEVBQUU7QUFDeEIsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsU0FBUztBQUN0QyxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxZQUFZO0FBQzVDLElBQUksV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLFdBQVc7QUFDMUMsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUTtBQUNwQyxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLGdCQUFnQjtBQUNwRCxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLGdCQUFnQjtBQUNwRCxJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxhQUFhO0FBQy9DLENBQUMsRUFBRSxXQUFXLEtBQUssV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzlCLElBQUksS0FBSztBQUNoQixDQUFDLFVBQVUsS0FBSyxFQUFFO0FBQ2xCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUs7QUFDeEIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTtBQUN0QixDQUFDLEVBQUUsS0FBSyxLQUFLLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQzs7QUMzQlYsTUFBTSxXQUFXLENBQUM7QUFDakMsSUFBSSxJQUFJO0FBQ1IsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJO0FBQ3hCO0FBQ0E7O0FDSGUsTUFBTSxNQUFNLFNBQVMsV0FBVyxDQUFDO0FBQ2hELElBQUksT0FBTztBQUNYLElBQUksSUFBSTtBQUNSLElBQUksS0FBSztBQUNUO0FBQ0EsSUFBSSxVQUFVO0FBQ2QsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQ3RCLFFBQVEsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztBQUN4QyxRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU87QUFDbkMsUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7QUFDOUIsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLO0FBQy9CLFFBQVEsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ25EO0FBQ0E7O0FDYmUsTUFBTSxTQUFTLFNBQVMsV0FBVyxDQUFDO0FBQ25ELElBQUksT0FBTztBQUNYO0FBQ0EsSUFBSSxVQUFVO0FBQ2QsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQ3RCLFFBQVEsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztBQUMzQyxRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU87QUFDbkMsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDbkQ7QUFDQTs7QUNUZSxNQUFNLFdBQVcsU0FBUyxXQUFXLENBQUM7QUFDckQsSUFBSSxPQUFPO0FBQ1gsSUFBSSxJQUFJO0FBQ1I7QUFDQSxJQUFJLFVBQVU7QUFDZCxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7QUFDdEIsUUFBUSxLQUFLLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDO0FBQzdDLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztBQUNuQyxRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUk7QUFDN0IsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDbkQ7QUFDQTs7QUNYZSxNQUFNLFNBQVMsU0FBUyxXQUFXLENBQUM7QUFDbkQsSUFBSSxLQUFLO0FBQ1QsSUFBSSxNQUFNO0FBQ1YsSUFBSSxTQUFTO0FBQ2IsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQ3RCLFFBQVEsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztBQUMzQyxRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUs7QUFDL0IsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNO0FBQ2pDLFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0FBQ2pEO0FBQ0E7O0FDTEEsTUFBTSxhQUFhLEdBQUc7QUFDdEIsSUFBSSxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCO0FBQ2pELENBQUM7QUFDYyxNQUFNLGlCQUFpQixTQUFTLG1CQUFtQixDQUFDO0FBQ25FLElBQUksT0FBTztBQUNYLElBQUksTUFBTTtBQUNWLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUN6QixRQUFRLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDdEIsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDOUIsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHO0FBQ3RCLFlBQVksT0FBTyxFQUFFLE1BQU07QUFDM0IsWUFBWSxVQUFVLEVBQUUsU0FBUztBQUNqQyxZQUFZLFlBQVksRUFBRSxXQUFXO0FBQ3JDLFlBQVksVUFBVSxFQUFFLFNBQVM7QUFDakMsU0FBUztBQUNUO0FBQ0EsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRTtBQUMvQixRQUFRLE1BQU0sSUFBSSxHQUFHLEVBQUU7QUFDdkIsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7QUFDOUUsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUM7QUFDbEUsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNO0FBQ3JDLFFBQVEsT0FBTyxJQUFJO0FBQ25CO0FBQ0EsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUM1QixRQUFRLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQzlCO0FBQ0EsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7QUFDL0MsUUFBUSxJQUFJLFdBQVcsRUFBRTtBQUN6QixZQUFZLE1BQU0sUUFBUSxDQUFDLGdCQUFnQixDQUFDLG1DQUFtQyxFQUFFLHNHQUFzRyxDQUFDO0FBQ3hMO0FBQ0EsUUFBUSxPQUFPLElBQUksQ0FBQztBQUNwQixhQUFhLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsRUFBRSxJQUFJO0FBQ2pFLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7QUFDdkM7QUFDQSxJQUFJLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDcEMsUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDakMsWUFBWSxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQyxHQUFHLENBQUM7QUFDN0UsWUFBWSxJQUFJLGFBQWEsRUFBRTtBQUMvQixnQkFBZ0IsTUFBTSxRQUFRLENBQUMsZ0JBQWdCLENBQUMscUVBQXFFLEVBQUUseUhBQXlILENBQUM7QUFDalA7QUFDQSxZQUFZLE9BQU8sSUFBSSxDQUFDO0FBQ3hCLGlCQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxhQUFhO0FBQ2hHLGlCQUFpQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztBQUMzQztBQUNBLFFBQVEsSUFBSSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3hCLFlBQVksTUFBTSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0VBQWdFLEVBQUUsZ0lBQWdJLENBQUM7QUFDL087QUFDQSxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDckMsWUFBWSxNQUFNLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQ0FBa0MsRUFBRSxxR0FBcUcsQ0FBQztBQUN0TDtBQUNBO0FBQ0EsUUFBUSxPQUFPLElBQUksQ0FBQztBQUNwQixhQUFhLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxjQUFjLENBQUMsRUFBRSxJQUFJO0FBQ25FLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7QUFDdkM7QUFDQSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDbkIsUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2pDLFlBQVksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNwQztBQUNBLFFBQVEsTUFBTSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUseUVBQXlFLENBQUM7QUFDeEk7QUFDQSxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUU7QUFDOUIsUUFBUSxPQUFPO0FBQ2YsWUFBWSxPQUFPLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPO0FBQzFDLFlBQVksSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDMUMsWUFBWSxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtBQUM1QyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUM7QUFDN0IsU0FBUztBQUNUO0FBQ0EsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUNwQyxRQUFRLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ3pDLFFBQVEsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztBQUNuRjtBQUNBLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQy9CLFFBQVEsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDekMsUUFBUSxPQUFPLElBQUksQ0FBQztBQUNwQixhQUFhLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekUsYUFBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3RFO0FBQ0EsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDL0IsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztBQUMzQjtBQUNBLFFBQVEsSUFBSSxRQUFRO0FBQ3BCLFFBQVEsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDL0MsUUFBUSxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUU7QUFDbkMsWUFBWSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUM7QUFDbEU7QUFDQSxRQUFRLElBQUksSUFBSSxLQUFLLGNBQWMsRUFBRTtBQUNyQyxZQUFZLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7QUFDdkQ7QUFDQSxRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDMUIsWUFBWSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDN0I7QUFDQSxhQUFhO0FBQ2IsWUFBWSxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNoQztBQUNBLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsYUFBYSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxhQUFhO0FBQ3RGLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7QUFDdkM7QUFDQSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNuQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQzNCLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsYUFBYSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVFLGFBQWEsSUFBSSxDQUFDLENBQUMsUUFBUSxNQUFNO0FBQ2pDLFlBQVksT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTztBQUMxQyxZQUFZLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO0FBQzVDLFlBQVksT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUU7QUFDaEQsWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDO0FBQzdCLFNBQVMsQ0FBQyxDQUFDO0FBQ1g7QUFDQTs7QUNySE8sTUFBTSxPQUFPLENBQUM7QUFDckIsSUFBSSxFQUFFO0FBQ04sSUFBSSxHQUFHO0FBQ1AsSUFBSSxJQUFJO0FBQ1IsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDL0IsUUFBUSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUU7QUFDcEIsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUc7QUFDdEIsUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUk7QUFDeEI7QUFDQTtBQUNlLE1BQU0sY0FBYyxDQUFDO0FBQ3BDLElBQUksT0FBTztBQUNYLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUN6QixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUM5QjtBQUNBLElBQUksaUJBQWlCLENBQUMsUUFBUSxFQUFFO0FBQ2hDLFFBQVEsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVE7QUFDckM7QUFDQSxJQUFJLG1CQUFtQixDQUFDLEVBQUUsRUFBRTtBQUM1QixRQUFRLE9BQU8sVUFBVSxRQUFRLEVBQUU7QUFDbkMsWUFBWSxNQUFNLGVBQWUsR0FBRyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU87QUFDM0QsWUFBWSxJQUFJLEdBQUcsR0FBRyxlQUFlLEVBQUUsR0FBRztBQUMxQyxZQUFZLElBQUksSUFBSSxHQUFHLGVBQWUsRUFBRSxJQUFJO0FBQzVDLFlBQVksSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUN0QixnQkFBZ0IsR0FBRyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUM7QUFDbkMsc0JBQXNCLElBQUksQ0FBQyxDQUFDO0FBQzVCLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0EsWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFO0FBQ3JELGdCQUFnQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDNUI7QUFDQSxZQUFZLE9BQU8sSUFBSSxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7QUFDN0MsU0FBUztBQUNUO0FBQ0EsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLEVBQUU7QUFDaEMsUUFBUSxPQUFPO0FBQ2YsWUFBWSxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJO0FBQ3BDLFlBQVksT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDbkMsU0FBUztBQUNUO0FBQ0EsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUN4QixRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUUsS0FBSztBQUNqRixhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7QUFDekM7QUFDQSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFO0FBQ3BCLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDO0FBQzlFLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMvQztBQUNBLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksR0FBRyxLQUFLLEVBQUU7QUFDMUMsUUFBUSxJQUFJLElBQUksRUFBRTtBQUNsQixZQUFZLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRTtBQUN6RyxpQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztBQUM3QztBQUNBLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUU7QUFDOUYsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQy9DO0FBQ0EsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUU7QUFDbEMsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDeEcsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQy9DO0FBQ0EsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRTtBQUN4QixRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQztBQUNqRixhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDL0M7QUFDQTs7QUNoRWUsTUFBTSxjQUFjLENBQUM7QUFDcEMsSUFBSSxPQUFPO0FBQ1gsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQ3pCLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO0FBQzlCO0FBQ0EsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUU7QUFDL0IsUUFBUSxNQUFNLGVBQWUsR0FBRyxJQUFJLEdBQUcsQ0FBQztBQUN4QyxZQUFZLFlBQVk7QUFDeEIsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQixZQUFZLFlBQVk7QUFDeEIsWUFBWSxtQkFBbUI7QUFDL0IsWUFBWSxrQkFBa0I7QUFDOUIsWUFBWSxlQUFlO0FBQzNCLFlBQVk7QUFDWixTQUFTLENBQUM7QUFDVixRQUFRLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3JELFlBQVksTUFBTSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsc0NBQXNDLEVBQUUsc0NBQXNDLENBQUM7QUFDM0g7QUFDQSxRQUFRLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLO0FBQ3RELFlBQVksSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUM1RSxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSTtBQUNuRDtBQUNBLGlCQUFpQjtBQUNqQixnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDcEM7QUFDQSxZQUFZLE9BQU8sR0FBRztBQUN0QixTQUFTLEVBQUUsRUFBRSxDQUFDO0FBQ2Q7QUFDQSxJQUFJLGNBQWMsQ0FBQyxRQUFRLEVBQUU7QUFDN0IsUUFBUSxPQUFPO0FBQ2YsWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07QUFDbkMsWUFBWSxHQUFHLFFBQVEsQ0FBQztBQUN4QixTQUFTO0FBQ1Q7QUFDQSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQ3pCLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQzFCLFlBQVksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSTtBQUM5RSxpQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7QUFDMUM7QUFDQSxRQUFRLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7QUFDNUQsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxZQUFZO0FBQzdFLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7QUFDdEM7QUFDQTs7QUM3Q2UsTUFBTSxZQUFZLENBQUM7QUFDbEMsSUFBSSxPQUFPO0FBQ1gsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQ3pCLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO0FBQzlCO0FBQ0EsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2hCLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSztBQUNuRCxhQUFhLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUNwRDtBQUNBLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRTtBQUNaLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNsRCxhQUFhLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUNwRDtBQUNBLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtBQUNqQixRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUk7QUFDekQsYUFBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDcEQ7QUFDQSxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFO0FBQ3JCLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUk7QUFDOUQsYUFBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQztBQUM5QztBQUNBLElBQUksT0FBTyxDQUFDLEVBQUUsRUFBRTtBQUNoQixRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckQsYUFBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQztBQUM5QztBQUNBOztBQ3pCZSxNQUFNLGNBQWMsQ0FBQztBQUNwQyxJQUFJLGtCQUFrQjtBQUN0QixJQUFJLE9BQU87QUFDWCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUU7QUFDbkQsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDOUIsUUFBUSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsd0JBQXdCO0FBQzFEO0FBQ0EsSUFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUU7QUFDdkIsUUFBUSxNQUFNLEtBQUssR0FBRyxFQUFFLE9BQU8sRUFBRTtBQUNqQyxRQUFRLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDO0FBQzVFLFFBQVEsT0FBTyxNQUFNLENBQUMsSUFBSTtBQUMxQjtBQUNBOztBQ1plLE1BQU0sU0FBUyxDQUFDO0FBQy9CLElBQUksT0FBTztBQUNYLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUN6QixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUM5QjtBQUNBLElBQUksTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ3RCLFFBQVEsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO0FBQ2pFLFFBQVEsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO0FBQzlDO0FBQ0EsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUU7QUFDbEIsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEUsUUFBUSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7QUFDOUM7QUFDQSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtBQUMvQixRQUFRLE9BQU8sUUFBUSxDQUFDLElBQUk7QUFDNUI7QUFDQTs7QUNoQmUsTUFBTSxhQUFhLENBQUM7QUFDbkMsSUFBSSxPQUFPO0FBQ1gsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQ3pCLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO0FBQzlCO0FBQ0EsSUFBSSxJQUFJLEdBQUc7QUFDWCxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztBQUM5QyxhQUFhLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEU7QUFDQSxJQUFJLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRTtBQUN2QixRQUFRLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQztBQUM1RSxRQUFRLE9BQU87QUFDZixZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtBQUNuQyxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBQ3hCLFNBQVM7QUFDVDtBQUNBLElBQUksTUFBTSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtBQUMvQixRQUFRLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7QUFDdkYsUUFBUSxPQUFPO0FBQ2YsWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07QUFDbkMsWUFBWSxHQUFHLFFBQVEsQ0FBQztBQUN4QixTQUFTO0FBQ1Q7QUFDQSxJQUFJLE1BQU0sTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDL0IsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDO0FBQ2xGLFFBQVEsT0FBTztBQUNmLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO0FBQ25DLFlBQVksR0FBRyxRQUFRLENBQUM7QUFDeEIsU0FBUztBQUNUO0FBQ0EsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7QUFDbkMsUUFBUSxPQUFPO0FBQ2YsWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07QUFDbkMsWUFBWSxHQUFHLFFBQVEsQ0FBQztBQUN4QixTQUFTO0FBQ1Q7QUFDQTs7QUNuQ2UsTUFBTSxrQkFBa0IsU0FBUyxtQkFBbUIsQ0FBQztBQUNwRSxJQUFJLFNBQVM7QUFDYixJQUFJLE9BQU87QUFDWCxJQUFJLE9BQU87QUFDWCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ2xDLFFBQVEsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUN0QixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUM5QixRQUFRLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVztBQUNwQyxRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUM5QjtBQUNBLElBQUkscUJBQXFCLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtBQUN4QyxRQUFRLE9BQU87QUFDZixZQUFZLE1BQU07QUFDbEIsWUFBWSxnQkFBZ0IsRUFBRTtBQUM5QixnQkFBZ0IsR0FBRyxJQUFJO0FBQ3ZCLGdCQUFnQixVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDNUQ7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7QUFDeEIsUUFBUSxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ3ZCLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUs7QUFDeEMsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUM7QUFDbEUsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNO0FBQ3JDLFFBQVEsT0FBTyxJQUFJO0FBQ25CO0FBQ0EsSUFBSSxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDdEIsUUFBUSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUM7QUFDMUU7QUFDQSxJQUFJLEdBQUcsQ0FBQyxlQUFlLEVBQUU7QUFDekIsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUN0RSxhQUFhLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNuRDtBQUNBLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtBQUNqQixRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJO0FBQzNELGFBQWEsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ25EO0FBQ0EsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRTtBQUNsQyxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQUUsSUFBSTtBQUNsRixhQUFhLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNuRDtBQUNBLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRTtBQUM3QixRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3pFLGFBQWEsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDOUM7QUFDQSxJQUFJLFFBQVEsQ0FBQyxlQUFlLEVBQUU7QUFDOUIsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTtBQUNwRixhQUFhLElBQUksQ0FBQyxDQUFDLFFBQVEsTUFBTTtBQUNqQyxZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtBQUNuQyxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBQ3hCLFNBQVMsQ0FBQyxDQUFDO0FBQ1g7QUFDQSxJQUFJLGdCQUFnQixDQUFDLGVBQWUsRUFBRTtBQUN0QyxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxTQUFTLENBQUM7QUFDL0UsYUFBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNGO0FBQ0EsSUFBSSxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUU7QUFDdEMsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsU0FBUyxDQUFDO0FBQ2xGLGFBQWEsSUFBSSxDQUFDLENBQUMsUUFBUSxNQUFNO0FBQ2pDLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO0FBQ25DLFlBQVksT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDbkMsU0FBUyxDQUFDLENBQUM7QUFDWDtBQUNBOztBQy9EZSxNQUFNLGdCQUFnQixTQUFTLG1CQUFtQixDQUFDO0FBQ2xFLElBQUksU0FBUztBQUNiLElBQUksT0FBTztBQUNYLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUN6QixRQUFRLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDdEIsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDOUIsUUFBUSxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVc7QUFDcEM7QUFDQSxJQUFJLGtCQUFrQixDQUFDLElBQUksRUFBRTtBQUM3QixRQUFRLE1BQU0sT0FBTyxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUU7QUFDbkMsUUFBUSxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDM0MsWUFBWSxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQUN2RDtBQUNBLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO0FBQ2xELFlBQVksT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssR0FBRyxJQUFJO0FBQy9EO0FBQ0EsUUFBUSxPQUFPLE9BQU87QUFDdEI7QUFDQSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7QUFDeEIsUUFBUSxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ3ZCLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUs7QUFDeEMsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUM7QUFDbEUsUUFBUSxPQUFPLElBQUk7QUFDbkI7QUFDQSxJQUFJLE1BQU0sV0FBVyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUU7QUFDOUMsUUFBUSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssQ0FBQztBQUNyRztBQUNBLElBQUksU0FBUyxDQUFDLGVBQWUsRUFBRSxxQkFBcUIsRUFBRTtBQUN0RCxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxTQUFTLEVBQUUscUJBQXFCLENBQUMsQ0FBQztBQUN2RyxhQUFhLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUNyRDtBQUNBLElBQUksWUFBWSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUU7QUFDeEMsUUFBUSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO0FBQ3JELFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE9BQU87QUFDOUYsYUFBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDckQ7QUFDQSxJQUFJLGFBQWEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFO0FBQ3pDLFFBQVEsTUFBTSxPQUFPLEdBQUc7QUFDeEIsWUFBWSxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU87QUFDOUYsWUFBWSxNQUFNLEVBQUUsSUFBSSxDQUFDO0FBQ3pCLFNBQVM7QUFDVCxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPO0FBQ25HLGFBQWEsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDOUM7QUFDQSxJQUFJLFlBQVksQ0FBQyxlQUFlLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFO0FBQy9ELFFBQVEsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztBQUNyRCxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxTQUFTLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxFQUFFLE9BQU87QUFDdEgsYUFBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDckQ7QUFDQSxJQUFJLGFBQWEsQ0FBQyxlQUFlLEVBQUUscUJBQXFCLEVBQUU7QUFDMUQsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFDMUcsYUFBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQztBQUM5QztBQUNBOztBQ3JEZSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLElBQUksU0FBUztBQUNiLElBQUksT0FBTztBQUNYLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUN6QixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUM5QixRQUFRLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYztBQUN2QztBQUNBLElBQUksMkJBQTJCLENBQUMsUUFBUSxFQUFFO0FBQzFDLFFBQVEsT0FBTztBQUNmLFlBQVksS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSztBQUN0QyxZQUFZLFVBQVUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ3RDLFNBQVM7QUFDVDtBQUNBLElBQUkscUJBQXFCLENBQUMsUUFBUSxFQUFFO0FBQ3BDLFFBQVEsTUFBTSxNQUFNLEdBQUc7QUFDdkIsWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07QUFDbkMsWUFBWSxPQUFPLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQztBQUNuQyxTQUFTO0FBQ1QsUUFBUSxPQUFPLE1BQU07QUFDckI7QUFDQSxJQUFJLHFCQUFxQixDQUFDLFFBQVEsRUFBRTtBQUNwQyxRQUFRLE1BQU0sTUFBTSxHQUFHO0FBQ3ZCLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO0FBQ25DLFlBQVksT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTztBQUMxQyxZQUFZLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ2hDLFNBQVM7QUFDVCxRQUFRLE9BQU8sTUFBTTtBQUNyQjtBQUNBLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDeEIsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxjQUFjLENBQUMsRUFBRSxLQUFLO0FBQ3RGLGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqRTtBQUNBLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDekIsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUk7QUFDckYsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNEO0FBQ0EsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRTtBQUMzQyxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUMsRUFBRSxJQUFJO0FBQ3hHLGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzRDtBQUNBLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRTtBQUN0QyxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDL0YsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNEO0FBQ0E7O0FDMUNPLE1BQU0scUJBQXFCLENBQUM7QUFDbkMsSUFBSSxTQUFTO0FBQ2IsSUFBSSxFQUFFO0FBQ04sSUFBSSxRQUFRO0FBQ1osSUFBSSxnQkFBZ0I7QUFDcEIsSUFBSSxNQUFNO0FBQ1YsSUFBSSxXQUFXO0FBQ2YsSUFBSSxrQkFBa0I7QUFDdEIsSUFBSSxPQUFPO0FBQ1gsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO0FBQzFDLFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ2xELFFBQVEsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRTtBQUN6QixRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVE7QUFDckMsUUFBUSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQjtBQUN0RCxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU07QUFDakMsUUFBUSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCO0FBQ3BELFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQy9CLFlBQVksSUFBSSxDQUFDLFdBQVcsR0FBRztBQUMvQixnQkFBZ0IsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRztBQUMzQyxnQkFBZ0IsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7QUFDekMsYUFBYTtBQUNiO0FBQ0EsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDMUIsWUFBWSxJQUFJLENBQUMsT0FBTyxHQUFHO0FBQzNCLGdCQUFnQixNQUFNLEVBQUU7QUFDeEIsb0JBQW9CLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTO0FBQzNELG9CQUFvQixXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVztBQUNoRSxvQkFBb0IsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVc7QUFDOUQsb0JBQW9CLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhO0FBQ3BFLG9CQUFvQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDakQsaUJBQWlCO0FBQ2pCLGdCQUFnQixJQUFJLEVBQUU7QUFDdEIsb0JBQW9CLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJO0FBQ2hELG9CQUFvQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRztBQUM5QyxvQkFBb0IsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU07QUFDcEQsb0JBQW9CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztBQUMvQztBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDZSxNQUFNLHdCQUF3QixTQUFTLG1CQUFtQixDQUFDO0FBQzFFLElBQUksT0FBTztBQUNYLElBQUksa0JBQWtCO0FBQ3RCLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUN6QixRQUFRLEtBQUssRUFBRTtBQUNmLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO0FBQzlCLFFBQVEsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksa0JBQWtCLEVBQUU7QUFDMUQ7QUFDQSxJQUFJLGNBQWMsQ0FBQyxRQUFRLEVBQUU7QUFDN0IsUUFBUSxPQUFPO0FBQ2YsWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07QUFDbkMsWUFBWSxHQUFHLFFBQVEsRUFBRTtBQUN6QixTQUFTO0FBQ1Q7QUFDQSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7QUFDeEIsUUFBUSxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ3ZCLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3BHLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDO0FBQ2hFLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUs7QUFDeEMsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNO0FBQ3JDLFFBQVEsT0FBTyxJQUFJO0FBQ25CO0FBQ0EsSUFBSSxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDdEIsUUFBUSxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQywyQkFBMkIsRUFBRSxLQUFLLENBQUM7QUFDNUU7QUFDQSxJQUFJLE1BQU0sR0FBRyxDQUFDLE1BQU0sRUFBRTtBQUN0QixRQUFRLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQywwQkFBMEIsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3RGLFFBQVEsT0FBTyxJQUFJLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUN4RTtBQUNBLElBQUksc0JBQXNCLENBQUMsSUFBSSxFQUFFO0FBQ2pDLFFBQVEsSUFBSSxzQkFBc0I7QUFDbEMsUUFBUSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pELFlBQVksc0JBQXNCLEdBQUcsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQzFFO0FBQ0EsYUFBYSxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDaEQsWUFBWSxzQkFBc0IsR0FBRyxFQUFFLHNCQUFzQixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTtBQUNwRjtBQUNBLGFBQWEsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM5RCxZQUFZLHNCQUFzQixHQUFHLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtBQUMxRTtBQUNBLGFBQWE7QUFDYixZQUFZLHNCQUFzQixHQUFHLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtBQUMxRTtBQUNBLFFBQVEsT0FBTyxzQkFBc0I7QUFDckM7QUFDQSxJQUFJLE1BQU0sTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDL0IsUUFBUSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtBQUNqQyxZQUFZLE1BQU0sUUFBUSxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixFQUFFLGdEQUFnRCxDQUFDO0FBQzFIO0FBQ0EsUUFBUSxNQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUM7QUFDeEUsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsMEJBQTBCLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxzQkFBc0IsQ0FBQztBQUNySCxRQUFRLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7QUFDNUM7QUFDQSxJQUFJLE1BQU0sT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUMxQixRQUFRLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQywwQkFBMEIsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLFFBQVEsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztBQUM1QztBQUNBOztBQ25HTyxNQUFNLGtCQUFrQixDQUFDO0FBQ2hDLElBQUksSUFBSTtBQUNSLElBQUksV0FBVztBQUNmLElBQUksU0FBUztBQUNiLElBQUksU0FBUztBQUNiLElBQUksRUFBRTtBQUNOLElBQUksT0FBTztBQUNYLElBQUksUUFBUTtBQUNaLElBQUksV0FBVyxDQUFDLHFCQUFxQixFQUFFO0FBQ3ZDLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxxQkFBcUIsQ0FBQyxJQUFJO0FBQzlDLFFBQVEsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxXQUFXO0FBQzVELFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUN6RyxRQUFRLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsU0FBUztBQUN4RCxRQUFRLElBQUksQ0FBQyxFQUFFLEdBQUcscUJBQXFCLENBQUMsRUFBRTtBQUMxQyxRQUFRLElBQUkscUJBQXFCLENBQUMsT0FBTyxFQUFFO0FBQzNDLFlBQVksSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxPQUFPO0FBQ3hELFlBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7QUFDekUsZ0JBQWdCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7QUFDMUY7QUFDQTtBQUNBLFFBQVEsSUFBSSxxQkFBcUIsQ0FBQyxRQUFRLElBQUkscUJBQXFCLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtBQUNyRixZQUFZLElBQUksQ0FBQyxRQUFRLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sS0FBSztBQUM1RSxnQkFBZ0IsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRTtBQUM3QyxnQkFBZ0IsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO0FBQzlELGdCQUFnQixPQUFPLE1BQU07QUFDN0IsYUFBYSxDQUFDO0FBQ2Q7QUFDQTtBQUNBO0FBQ2UsTUFBTSxxQkFBcUIsU0FBUyxtQkFBbUIsQ0FBQztBQUN2RSxJQUFJLFNBQVM7QUFDYixJQUFJLE9BQU87QUFDWCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7QUFDekIsUUFBUSxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO0FBQzlCLFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNO0FBQy9CO0FBQ0EsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLEVBQUU7QUFDaEMsUUFBUSxPQUFPLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDekQ7QUFDQSxJQUFJLDRCQUE0QixDQUFDLElBQUksRUFBRTtBQUN2QyxRQUFRLE1BQU0sTUFBTSxHQUFHLEVBQUU7QUFDekIsUUFBUSxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNO0FBQ25DLFFBQVEsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87QUFDMUMsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDN0MsWUFBWSxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDeEU7QUFDQSxRQUFRLE9BQU8sTUFBTTtBQUNyQjtBQUNBLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFO0FBQ2hDLFFBQVEsTUFBTSxNQUFNLEdBQUcsRUFBRTtBQUN6QixRQUFRLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU07QUFDbkMsUUFBUSxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztBQUMxQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUM3QyxZQUFZLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTtBQUN6RDtBQUNBLFFBQVEsT0FBTyxNQUFNO0FBQ3JCO0FBQ0EsSUFBSSx5QkFBeUIsQ0FBQyxJQUFJLEVBQUU7QUFDcEMsUUFBUSxNQUFNLE1BQU0sR0FBRyxFQUFFO0FBQ3pCLFFBQVEsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTtBQUNuQyxRQUFRLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO0FBQzFDLFFBQVEsT0FBTyxNQUFNO0FBQ3JCO0FBQ0EsSUFBSSxrQ0FBa0MsQ0FBQyxJQUFJLEVBQUU7QUFDN0MsUUFBUSxNQUFNLE1BQU0sR0FBRyxFQUFFO0FBQ3pCLFFBQVEsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTTtBQUNuQyxRQUFRLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO0FBQzFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNoQyxZQUFZLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTtBQUN6RCxZQUFZLE1BQU0sQ0FBQyxlQUFlLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUM1RTtBQUNBLFFBQVEsT0FBTyxNQUFNO0FBQ3JCO0FBQ0EsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO0FBQ3hCLFFBQVEsTUFBTSxJQUFJLEdBQUcsRUFBRTtBQUN2QixRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUUsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7QUFDNUQsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNO0FBQ3JDLFFBQVEsT0FBTyxJQUFJO0FBQ25CO0FBQ0EsSUFBSSx5QkFBeUIsQ0FBQyxRQUFRLEVBQUU7QUFDeEMsUUFBUSxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ3ZCLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ3RFLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0FBQzVELFFBQVEsT0FBTyxJQUFJO0FBQ25CO0FBQ0EsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQzlCLFFBQVEsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFFLEtBQUssQ0FBQztBQUM5RjtBQUNBLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFO0FBQ3JDLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxFQUFFLEtBQUs7QUFDbkcsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JFO0FBQ0EsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtBQUN6QixRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFFLElBQUk7QUFDMUYsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNEO0FBQ0EsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUU7QUFDdkMsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLEVBQUUsSUFBSTtBQUN4RyxhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0Q7QUFDQSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFO0FBQ2xDLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztBQUMvRixhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0Q7QUFDQSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDdkIsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUM7QUFDaEYsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9EO0FBQ0EsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUU7QUFDOUMsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxFQUFFLEtBQUs7QUFDL0csYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9EO0FBQ0EsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUU7QUFDMUMsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxHQUFHLENBQUM7QUFDL0csYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3JFO0FBQ0EsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUU7QUFDOUMsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxFQUFFLElBQUk7QUFDdEgsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xFO0FBQ0EsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ25ELFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSTtBQUMzSCxhQUFhLElBQUk7QUFDakI7QUFDQSxRQUFRLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM5RDtBQUNBLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFO0FBQzlDLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsR0FBRyxDQUFDO0FBQ2xIO0FBQ0EsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLGtDQUFrQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hFO0FBQ0E7O0FDcklPLE1BQU0sU0FBUyxDQUFDO0FBQ3ZCLElBQUksR0FBRztBQUNQLElBQUksV0FBVztBQUNmLElBQUksWUFBWTtBQUNoQixJQUFJLFdBQVc7QUFDZixJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7QUFDekIsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHO0FBQzlCLFFBQVEsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVztBQUM5QyxRQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDNUQsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFEO0FBQ0E7QUFDTyxNQUFNLGtCQUFrQixDQUFDO0FBQ2hDLElBQUksR0FBRztBQUNQLElBQUksV0FBVztBQUNmLElBQUksS0FBSztBQUNULElBQUksR0FBRztBQUNQLElBQUksVUFBVTtBQUNkLElBQUksS0FBSztBQUNULElBQUksV0FBVyxDQUFDLGdCQUFnQixFQUFFO0FBQ2xDLFFBQVEsSUFBSSxDQUFDLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRztBQUM1QyxRQUFRLElBQUksQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVc7QUFDNUQsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDMUQsUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDdEQsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVO0FBQzFELFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRTtBQUNyRSxZQUFZLE1BQU0sR0FBRyxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM5RCxZQUFZLE9BQU8sR0FBRztBQUN0QixTQUFTLENBQUM7QUFDVjtBQUNBO0FBQ2UsTUFBTSxnQkFBZ0IsU0FBUyxtQkFBbUIsQ0FBQztBQUNsRSxJQUFJLFNBQVM7QUFDYixJQUFJLE9BQU87QUFDWCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7QUFDekIsUUFBUSxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO0FBQzlCLFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNO0FBQy9CO0FBQ0EsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO0FBQ3hCLFFBQVEsTUFBTSxJQUFJLEdBQUcsRUFBRTtBQUN2QixRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pGLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDO0FBQzlELFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTTtBQUNyQyxRQUFRLE9BQU8sSUFBSTtBQUNuQjtBQUNBLElBQUksa0JBQWtCLENBQUMsUUFBUSxFQUFFO0FBQ2pDLFFBQVEsT0FBTyxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztBQUMvQztBQUNBLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUM5QixRQUFRLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRSxLQUFLLENBQUM7QUFDekY7QUFDQSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ3JCLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQztBQUM3RSxhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkQ7QUFDQSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRTtBQUNyQyxRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxXQUFXO0FBQzFGLGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDcEM7QUFDQSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ3pCLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDM0UsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU07QUFDNUIsWUFBWSxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPO0FBQ3JDLFlBQVksTUFBTSxFQUFFLEdBQUcsQ0FBQztBQUN4QixTQUFTLENBQUMsQ0FBQztBQUNYO0FBQ0EsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDbEMsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEtBQUs7QUFDN0YsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hEO0FBQ0EsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUMzQixRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsNEJBQTRCLENBQUM7QUFDM0csYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQztBQUNwQztBQUNBLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7QUFDM0IsUUFBUSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLDRCQUE0QixDQUFDO0FBQzNHLGFBQWEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDcEM7QUFDQSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ3pCLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSwwQkFBMEIsQ0FBQztBQUN6RyxhQUFhLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3BDO0FBQ0E7O0FDcEZlLE1BQU0sZ0JBQWdCLFNBQVMsbUJBQW1CLENBQUM7QUFDbEUsSUFBSSxPQUFPO0FBQ1gsSUFBSSxVQUFVO0FBQ2QsSUFBSSxPQUFPO0FBQ1gsSUFBSSxNQUFNO0FBQ1YsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxHQUFHLE9BQU8sRUFBRTtBQUNoRSxRQUFRLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDdEIsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDOUIsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVU7QUFDcEMsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDOUIsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU07QUFDNUI7QUFDQSxJQUFJLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2pDLHlDQUF5QyxFQUFFLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQzNFLFFBQVEsT0FBTyxTQUFTLENBQUMsV0FBVyxFQUFFO0FBQ3RDO0FBQ0EsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUU7QUFDaEMsUUFBUSxNQUFNLG1CQUFtQixHQUFHLFNBQVM7QUFDN0MsUUFBUSxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSztBQUNwRixZQUFZLE1BQU0sSUFBSSxHQUFHLEdBQUc7QUFDNUIsWUFBWSxJQUFJLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsRUFBRTtBQUM5RixnQkFBZ0IsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztBQUM3QyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO0FBQzlEO0FBQ0EsWUFBWSxPQUFPLEdBQUc7QUFDdEIsU0FBUyxFQUFFLEVBQUUsQ0FBQztBQUNkLFFBQVEsTUFBTSxNQUFNLEdBQUc7QUFDdkIsWUFBWSxHQUFHLFNBQVM7QUFDeEIsWUFBWSxHQUFHO0FBQ2YsU0FBUztBQUNULFFBQVEsT0FBTyxNQUFNO0FBQ3JCO0FBQ0EsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO0FBQ3hCLFFBQVEsSUFBSSxNQUFNLEdBQUcsRUFBRTtBQUN2QixRQUFRLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUN4RCxRQUFRLE1BQU0sR0FBRztBQUNqQixZQUFZLEdBQUcsUUFBUTtBQUN2QixZQUFZLE1BQU0sRUFBRSxJQUFJLENBQUM7QUFDekIsU0FBUztBQUNULFFBQVEsT0FBTyxNQUFNO0FBQ3JCO0FBQ0EsSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFO0FBQzFCLFFBQVEsSUFBSSxLQUFLO0FBQ2pCLFFBQVEsTUFBTSxvQkFBb0IsR0FBRztBQUNyQyxZQUFZLFVBQVUsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ2pELFlBQVksVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDakQsWUFBWSxjQUFjLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztBQUN6RCxTQUFTO0FBQ1QsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDeEIsWUFBWSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEtBQUs7QUFDakQsZ0JBQWdCLElBQUksSUFBSSxHQUFHLEVBQUU7QUFDN0IsZ0JBQWdCLE1BQU0sZ0JBQWdCLEdBQUc7QUFDekMsb0JBQW9CLFVBQVUsRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO0FBQzdELG9CQUFvQixVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztBQUM3RCxvQkFBb0Isc0JBQXNCLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDO0FBQ3JGLG9CQUFvQixlQUFlLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztBQUN2RSxvQkFBb0IsaUJBQWlCLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO0FBQzNFLGlCQUFpQjtBQUNqQixnQkFBZ0IsSUFBSSxHQUFHO0FBQ3ZCLG9CQUFvQixHQUFHLFFBQVE7QUFDL0Isb0JBQW9CLEdBQUc7QUFDdkIsaUJBQWlCO0FBQ2pCLGdCQUFnQixPQUFPLElBQUk7QUFDM0IsYUFBYSxDQUFDO0FBQ2Q7QUFDQSxhQUFhO0FBQ2IsWUFBWSxLQUFLLEdBQUcsSUFBSTtBQUN4QjtBQUNBLFFBQVEsTUFBTSxRQUFRLEdBQUc7QUFDekIsWUFBWSxHQUFHLElBQUk7QUFDbkIsWUFBWSxLQUFLLEVBQUUsS0FBSztBQUN4QixZQUFZLEdBQUc7QUFDZixTQUFTO0FBQ1QsUUFBUSxPQUFPLFFBQVEsQ0FBQyxFQUFFO0FBQzFCLFFBQVEsT0FBTyxRQUFRO0FBQ3ZCO0FBQ0EsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO0FBQ3hCLFFBQVEsTUFBTSxJQUFJLEdBQUc7QUFDckIsWUFBWSxLQUFLLEVBQUU7QUFDbkIsU0FBUztBQUNULFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRixRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQztBQUNsRSxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU07QUFDckMsUUFBUSxPQUFPLElBQUk7QUFDbkI7QUFDQSxJQUFJLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtBQUN0QixRQUFRLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7QUFDdEQsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLFNBQVMsQ0FBQztBQUNqRixRQUFRLE9BQU87QUFDZixZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFDdkMsWUFBWSxNQUFNLEVBQUU7QUFDcEIsU0FBUztBQUNUO0FBQ0EsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUU7QUFDbEIsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1RSxRQUFRLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUM3RSxRQUFRLE9BQU87QUFDZixZQUFZLEdBQUcsZ0JBQWdCO0FBQy9CLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQztBQUM3QixTQUFTO0FBQ1Q7QUFDQSxJQUFJLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRTtBQUN2QixRQUFRLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDO0FBQ25GLFFBQVEsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztBQUMzQztBQUNBLElBQUksTUFBTSxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRTtBQUMzQixRQUFRLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztBQUNsRixRQUFRLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7QUFDM0M7QUFDQSxJQUFJLE1BQU0sT0FBTyxDQUFDLEVBQUUsRUFBRTtBQUN0QixRQUFRLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9EO0FBQ0E7O0FDMUhlLE1BQU0scUJBQXFCLENBQUM7QUFDM0MsSUFBSSxPQUFPO0FBQ1gsSUFBSSxVQUFVO0FBQ2QsSUFBSSxPQUFPO0FBQ1gsSUFBSSxTQUFTO0FBQ2IsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUU7QUFDL0QsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDOUIsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFnQjtBQUMxQyxRQUFRLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCO0FBQzFDLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO0FBQzlCLFFBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTO0FBQ2xDO0FBQ0EsSUFBSSxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDeEIsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQztBQUN6RSxRQUFRLE9BQU87QUFDZixZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUk7QUFDNUIsWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDO0FBQzdCLFNBQVM7QUFDVDtBQUNBOztBQ2xCZSxNQUFNLDRCQUE0QixTQUFTLG1CQUFtQixDQUFDO0FBQzlFLElBQUksT0FBTztBQUNYLElBQUksVUFBVTtBQUNkLElBQUksT0FBTztBQUNYLElBQUksT0FBTztBQUNYLElBQUksTUFBTTtBQUNWLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEdBQUcsT0FBTyxFQUFFO0FBQ3pFLFFBQVEsS0FBSyxDQUFDLE9BQU8sQ0FBQztBQUN0QixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUM5QixRQUFRLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVTtBQUNwQyxRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUM5QixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUM5QixRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTTtBQUM1QjtBQUNBLElBQUksZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDakMseUNBQXlDLEVBQUUsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDM0UsUUFBUSxPQUFPLFNBQVMsQ0FBQyxXQUFXLEVBQUU7QUFDdEM7QUFDQSxJQUFJLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtBQUNoQyxRQUFRLE1BQU0sbUJBQW1CLEdBQUcsU0FBUztBQUM3QyxRQUFRLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLO0FBQ3BGLFlBQVksTUFBTSxJQUFJLEdBQUcsR0FBRztBQUM1QixZQUFZLElBQUksQ0FBQyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUSxFQUFFO0FBQzlGLGdCQUFnQixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQzdDLGdCQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7QUFDOUQ7QUFDQSxZQUFZLE9BQU8sR0FBRztBQUN0QixTQUFTLEVBQUUsRUFBRSxDQUFDO0FBQ2QsUUFBUSxNQUFNLE1BQU0sR0FBRztBQUN2QixZQUFZLEdBQUcsU0FBUztBQUN4QixZQUFZLEdBQUc7QUFDZixTQUFTO0FBQ1QsUUFBUSxPQUFPLE1BQU07QUFDckI7QUFDQSxJQUFJLDRCQUE0QixDQUFDLElBQUksRUFBRTtBQUN2QyxRQUFRLElBQUksR0FBRyxHQUFHLEVBQUU7QUFDcEIsUUFBUSxNQUFNLG9CQUFvQixHQUFHO0FBQ3JDLFlBQVksVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDakQsWUFBWSxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUNqRCxZQUFZLGtCQUFrQixFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztBQUNqRSxTQUFTO0FBQ1QsUUFBUSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDdEIsWUFBWSxHQUFHLEdBQUc7QUFDbEIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUc7QUFDM0IsZ0JBQWdCLFVBQVUsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUN6RCxnQkFBZ0IsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQ3pELGdCQUFnQixjQUFjLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7QUFDakUsYUFBYTtBQUNiLFlBQVksT0FBTyxHQUFHLENBQUMsRUFBRTtBQUN6QjtBQUNBLFFBQVEsTUFBTSxxQkFBcUIsR0FBRztBQUN0QyxZQUFZLEdBQUcsSUFBSTtBQUNuQixZQUFZLEdBQUcsRUFBRSxHQUFHO0FBQ3BCLFlBQVksR0FBRyxvQkFBb0I7QUFDbkMsWUFBWSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDdkIsU0FBUztBQUNULFFBQVEsT0FBTyxxQkFBcUIsQ0FBQyxFQUFFO0FBQ3ZDLFFBQVEsT0FBTyxxQkFBcUI7QUFDcEM7QUFDQSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7QUFDeEIsUUFBUSxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ3ZCLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9GLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDO0FBQ2xFLFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTTtBQUNyQyxRQUFRLE9BQU8sSUFBSTtBQUNuQjtBQUNBLElBQUksTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ3RCLFFBQVEsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQztBQUN0RCxRQUFRLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsU0FBUyxDQUFDO0FBQy9FLFFBQVEsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztBQUN2QztBQUNBLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRSxFQUFFO0FBQ2xCLFFBQVEsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUUsUUFBUSxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUM1RixRQUFRLE9BQU87QUFDZixZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtBQUNuQyxZQUFZO0FBQ1osU0FBUztBQUNUO0FBQ0EsSUFBSSxNQUFNLE9BQU8sQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3RSxRQUFRLE9BQU87QUFDZixZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtBQUNuQyxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBQ3hCLFNBQVM7QUFDVDtBQUNBLElBQUksTUFBTSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7QUFDdEMsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMseUJBQXlCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUN0RixRQUFRLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzVGLFFBQVEsT0FBTztBQUNmLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO0FBQ25DLFlBQVk7QUFDWixTQUFTO0FBQ1Q7QUFDQTs7QUN4R2UsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRCxJQUFJLE9BQU87QUFDWCxJQUFJLElBQUk7QUFDUixJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQy9CLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJO0FBQ3hCLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO0FBQzlCO0FBQ0EsSUFBSSxNQUFNLElBQUksR0FBRztBQUNqQixRQUFRLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUMxRCxRQUFRLE9BQU87QUFDZixZQUFZLEtBQUssRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUs7QUFDdEMsWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07QUFDbkMsU0FBUztBQUNUO0FBQ0EsSUFBSSxNQUFNLEdBQUcsQ0FBQyxhQUFhLEVBQUU7QUFDN0IsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBQ2hGLFFBQVEsT0FBTztBQUNmLFlBQVksR0FBRyxRQUFRLENBQUMsSUFBSTtBQUM1QixZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUM7QUFDN0IsU0FBUztBQUNUO0FBQ0E7O0FDckJlLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsSUFBSSxPQUFPO0FBQ1gsSUFBSSxJQUFJO0FBQ1IsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMvQixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUM5QixRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSTtBQUN4QjtBQUNBLElBQUksTUFBTSxJQUFJLEdBQUc7QUFDakIsUUFBUSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDeEQsUUFBUSxPQUFPO0FBQ2YsWUFBWSxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07QUFDakMsWUFBWSxpQkFBaUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQzNDLFNBQVM7QUFDVDtBQUNBOztBQ2RlLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsSUFBSSxPQUFPO0FBQ1gsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQ3pCLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO0FBQzlCO0FBQ0EsSUFBSSxtQ0FBbUMsQ0FBQyxJQUFJLEVBQUU7QUFDOUMsUUFBUSxNQUFNLG9CQUFvQixHQUFHO0FBQ3JDLFlBQVksVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDakQsU0FBUztBQUNULFFBQVEsTUFBTSxNQUFNLEdBQUc7QUFDdkIsWUFBWSxHQUFHLElBQUk7QUFDbkIsWUFBWSxHQUFHO0FBQ2YsU0FBUztBQUNULFFBQVEsT0FBTyxNQUFNO0FBQ3JCO0FBQ0EsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUU7QUFDbEIsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRSxRQUFRLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN0RixRQUFRLE9BQU87QUFDZixZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtBQUNuQyxZQUFZLEdBQUc7QUFDZixTQUFTO0FBQ1Q7QUFDQSxJQUFJLE1BQU0sTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUU7QUFDM0IsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwSCxRQUFRLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN0RixRQUFRLE9BQU87QUFDZixZQUFZLEdBQUcsTUFBTTtBQUNyQixZQUFZLE1BQU0sRUFBRSxRQUFRLENBQUM7QUFDN0IsU0FBUztBQUNUO0FBQ0E7O0FDL0JlLE1BQU0sOEJBQThCLENBQUM7QUFDcEQsSUFBSSxPQUFPO0FBQ1gsSUFBSSxJQUFJO0FBQ1IsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQ3pCLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxxQkFBcUI7QUFDekMsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDOUI7QUFDQSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7QUFDeEIsUUFBUSxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ3ZCLFFBQVEsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUs7QUFDdkQsWUFBWSxNQUFNLG9CQUFvQixHQUFHO0FBQ3pDLGdCQUFnQixVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUNyRCxnQkFBZ0IsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDckQsYUFBYTtBQUNiLFlBQVksTUFBTSxNQUFNLEdBQUc7QUFDM0IsZ0JBQWdCLEdBQUcsSUFBSTtBQUN2QixnQkFBZ0IsR0FBRztBQUNuQixhQUFhO0FBQ2IsWUFBWSxPQUFPLE1BQU07QUFDekIsU0FBUyxDQUFDO0FBQ1YsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNO0FBQ3JDLFFBQVEsT0FBTyxJQUFJO0FBQ25CO0FBQ0EsSUFBSSxNQUFNLElBQUksR0FBRztBQUNqQixRQUFRLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUMxRCxRQUFRLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFDdkM7QUFDQTs7QUMzQmUsTUFBTSxhQUFhLENBQUM7QUFDbkMsSUFBSSxPQUFPO0FBQ1gsSUFBSSxNQUFNO0FBQ1YsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sR0FBRyxPQUFPLEVBQUU7QUFDM0MsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDOUIsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU07QUFDNUI7QUFDQSxJQUFJLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2pDLHlDQUF5QyxFQUFFLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQzNFLFFBQVEsT0FBTyxTQUFTLENBQUMsV0FBVyxFQUFFO0FBQ3RDO0FBQ0EsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO0FBQ3hCLFFBQVEsSUFBSSxTQUFTO0FBQ3JCLFFBQVEsSUFBSSxPQUFPO0FBQ25CLFFBQVEsSUFBSSxLQUFLLEVBQUU7QUFDbkIsWUFBWSxNQUFNLE1BQU0sR0FBRyxLQUFLLEVBQUUsS0FBSztBQUN2QyxZQUFZLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFBRSxHQUFHO0FBQ25DLFlBQVksU0FBUyxHQUFHLE1BQU0sWUFBWSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxNQUFNLElBQUksRUFBRTtBQUN0RyxZQUFZLE9BQU8sR0FBRyxJQUFJLElBQUksSUFBSSxZQUFZLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFO0FBQ3BHO0FBQ0EsUUFBUSxNQUFNLE1BQU0sR0FBRztBQUN2QixZQUFZLEdBQUcsS0FBSztBQUNwQixZQUFZLEtBQUssRUFBRSxTQUFTO0FBQzVCLFlBQVksR0FBRyxFQUFFO0FBQ2pCLFNBQVM7QUFDVCxRQUFRLE9BQU8sTUFBTTtBQUNyQjtBQUNBLElBQUksY0FBYyxDQUFDLFFBQVEsRUFBRTtBQUM3QixRQUFRLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJO0FBQ3JDLFFBQVEsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUk7QUFDcEYsUUFBUSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSTtBQUM5RSxRQUFRLE1BQU0sTUFBTSxHQUFHO0FBQ3ZCLFlBQVksR0FBRyxPQUFPO0FBQ3RCLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO0FBQ25DLFlBQVksS0FBSyxFQUFFLFNBQVM7QUFDNUIsWUFBWSxHQUFHLEVBQUU7QUFDakIsU0FBUztBQUNULFFBQVEsT0FBTyxNQUFNO0FBQ3JCO0FBQ0EsSUFBSSxNQUFNLFVBQVUsQ0FBQyxLQUFLLEVBQUU7QUFDNUIsUUFBUSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztBQUNsRCxRQUFRLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsU0FBUyxDQUFDO0FBQ3BGLFFBQVEsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztBQUM1QztBQUNBLElBQUksTUFBTSxlQUFlLENBQUMsS0FBSyxFQUFFO0FBQ2pDLFFBQVEsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7QUFDbEQsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLFNBQVMsQ0FBQztBQUMxRixRQUFRLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7QUFDNUM7QUFDQTs7QUN6RGUsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxJQUFJLE9BQU87QUFDWCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7QUFDekIsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU87QUFDOUI7QUFDQSxJQUFJLHNCQUFzQixDQUFDLFFBQVEsRUFBRTtBQUNyQyxRQUFRLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRO0FBQ3JDO0FBQ0EsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7QUFDbkMsUUFBUSxPQUFPLFFBQVEsQ0FBQyxJQUFJO0FBQzVCO0FBQ0EsSUFBSSwyQkFBMkIsQ0FBQyxHQUFHLEVBQUU7QUFDckMsUUFBUSxPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxrQkFBa0IsSUFBSSxHQUFHO0FBQ25FO0FBQ0EsSUFBSSxNQUFNLEdBQUcsQ0FBQyxNQUFNLEVBQUU7QUFDdEIsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RSxRQUFRLE9BQU87QUFDZixZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUk7QUFDNUIsWUFBWSxrQkFBa0IsRUFBRSxRQUFRLENBQUM7QUFDekMsU0FBUztBQUNUO0FBQ0EsSUFBSSxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUU7QUFDM0IsUUFBUSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPO0FBQ2YsWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJO0FBQzVCLFlBQVksTUFBTSxFQUFFLFFBQVEsQ0FBQztBQUM3QixTQUFTO0FBQ1Q7QUFDQSxJQUFJLE1BQU0sVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUM3QixRQUFRLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNyRSxRQUFRLE9BQU87QUFDZixZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUk7QUFDNUIsWUFBWSxNQUFNLEVBQUUsUUFBUSxDQUFDO0FBQzdCLFNBQVM7QUFDVDtBQUNBLElBQUksTUFBTSxXQUFXLENBQUMsTUFBTSxFQUFFO0FBQzlCLFFBQVEsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMzRixRQUFRLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQztBQUNwRDtBQUNBLElBQUksTUFBTSxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDN0MsUUFBUSxNQUFNLFlBQVksR0FBRztBQUM3QixZQUFZLEdBQUc7QUFDZixTQUFTO0FBQ1QsUUFBUSxJQUFJLE9BQU8sSUFBSSxFQUFFLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFDL0MsWUFBWSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sSUFBSSxLQUFLLEdBQUcsSUFBSTtBQUMvRDtBQUNBLFFBQVEsSUFBSSxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDcEQsWUFBWSxJQUFJLE9BQU8sSUFBSSxFQUFFLGdCQUFnQixLQUFLLFNBQVMsRUFBRTtBQUM3RCxnQkFBZ0IsWUFBWSxDQUFDLGdCQUFnQixHQUFHLENBQUMsSUFBSSxFQUFFLGdCQUFnQixJQUFJLEtBQUssR0FBRyxJQUFJO0FBQ3ZGO0FBQ0E7QUFDQSxRQUFRLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLFlBQVksQ0FBQztBQUNySCxRQUFRLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztBQUNsRDtBQUNBOztBQ3ZEQTtBQTRCZSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxJQUFJLE9BQU87QUFDWCxJQUFJLE9BQU87QUFDWCxJQUFJLFFBQVE7QUFDWixJQUFJLE1BQU07QUFDVixJQUFJLEtBQUs7QUFDVCxJQUFJLE9BQU87QUFDWCxJQUFJLFlBQVk7QUFDaEIsSUFBSSxRQUFRO0FBQ1osSUFBSSxNQUFNO0FBQ1YsSUFBSSxRQUFRO0FBQ1osSUFBSSxHQUFHO0FBQ1AsSUFBSSxRQUFRO0FBQ1osSUFBSSxLQUFLO0FBQ1QsSUFBSSxXQUFXO0FBQ2YsSUFBSSxlQUFlO0FBQ25CLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUU7QUFDbkMsUUFBUSxNQUFNLE1BQU0sR0FBRyxFQUFFLEdBQUcsT0FBTyxFQUFFO0FBQ3JDLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDekIsWUFBWSxNQUFNLENBQUMsR0FBRyxHQUFHLHlCQUF5QjtBQUNsRDtBQUNBLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDOUIsWUFBWSxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDO0FBQy9EO0FBQ0EsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUN6QixZQUFZLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUM7QUFDMUQ7QUFDQTtBQUNBLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJQyxTQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztBQUNwRCxRQUFRLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ25FLFFBQVEsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDakYsUUFBUSxNQUFNLHFCQUFxQixHQUFHLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUM3RSxRQUFRLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ25FLFFBQVEsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDM0UsUUFBUSxNQUFNLHdCQUF3QixHQUFHLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUNuRixRQUFRLE1BQU0sbUNBQW1DLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3RGLFFBQVEsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLCtCQUErQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsdUJBQXVCLENBQUM7QUFDL0csUUFBUSxNQUFNLHVCQUF1QixHQUFHLElBQUksK0JBQStCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQztBQUNoSCxRQUFRLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLDhCQUE4QixDQUFDO0FBQ3RILFFBQVEsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLDRCQUE0QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsNEJBQTRCLENBQUM7QUFDakgsUUFBUSxNQUFNLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSx1QkFBdUIsQ0FBQztBQUNsSCxRQUFRLE1BQU0sNEJBQTRCLEdBQUcsSUFBSSw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLG9CQUFvQixFQUFFLG1DQUFtQyxDQUFDO0FBQy9LLFFBQVEsTUFBTSw4QkFBOEIsR0FBRyxJQUFJLDhCQUE4QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDL0YsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUM7QUFDOUksUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEQsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDbkQsUUFBUSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDbEQsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDdEQsUUFBUSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUMvRCxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4RCxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUNwRCxRQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUM5QyxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN2RCxRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDO0FBQzNFLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHdCQUF3QixDQUFDO0FBQ2xGLFFBQVEsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDOUQsUUFBUSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSw0QkFBNEIsRUFBRSw4QkFBOEIsQ0FBQztBQUN0SjtBQUNBLElBQUksYUFBYSxDQUFDLFlBQVksRUFBRTtBQUNoQyxRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsWUFBWSxDQUFDO0FBQ3ZEO0FBQ0EsSUFBSSxlQUFlLEdBQUc7QUFDdEIsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFO0FBQzdDO0FBQ0E7O0FDM0ZlLE1BQU0sT0FBTyxDQUFDO0FBQzdCLElBQUksV0FBVyxPQUFPLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQztBQUN2QyxJQUFJLFFBQVE7QUFDWixJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7QUFDMUIsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVE7QUFDaEM7QUFDQSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7QUFDcEIsUUFBUSxPQUFPLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ3hEO0FBQ0E7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMjksMzAsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDAsNDEsNDIsNDMsNDQsNDUsNDYsNDcsNDgsNDksNTAsNTFdfQ==
