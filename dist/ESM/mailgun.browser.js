// mailgun.js v12.2.0 Copyright (c) 2025 Mailgun and contributors
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

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

class APIError extends Error {
    status;
    stack;
    details;
    type;
    static isApiError(err) {
        return typeof err === 'object' && err?.type === 'MailgunAPIError';
    }
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
    useFetch;
    constructor(FormDataConstructor, config) {
        this.FormDataConstructor = FormDataConstructor;
        this.fileKeys = ['attachment', 'inline', 'multipleValidationFile'];
        this.attachmentsHandler = new AttachmentsHandler();
        this.useFetch = config?.useFetch;
    }
    async createFormData(data) {
        if (!data) {
            throw new Error('Please provide data object');
        }
        const formDataInstance = new this.FormDataConstructor();
        const isFormDataP = this.isFormDataPackage(formDataInstance);
        if (isFormDataP && this.useFetch) {
            // in case form-data package is used fetch client thinks form-data is of the string type
            // also Content-Type is recognized incorrectly
            throw APIError.getUserDataError('"form-data" npm package detected, and it can not be used together with "fetch" client', 'fetch client does not recognize object created by form-data package as valid FormData instance');
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
        }, formDataInstance);
        const result = {
            formData,
            dataSize: 0
        };
        if (this.useFetch && !isFormDataP) {
            // axios trick to get correct Content-Type with boundary
            // otherwise boundary is missing and request fails
            Object.defineProperty(formData, 'getHeaders', {
                value: () => ({ 'Content-Type': undefined }),
            });
            // calculating FD size for fetch client.
            // Axios maxBodyLength does not work with fetch provider
            if (Response !== undefined) {
                const resObj = new Response(formData);
                const blob = await resObj.blob();
                result.dataSize = blob.size;
            }
        }
        return result;
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

function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;
const {iterator, toStringTag} = Symbol;

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
    && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
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
const isFunction$1 = typeOfTest('function');

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
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(toStringTag in val) && !(iterator in val);
};

/**
 * Determine if a value is an empty object (safely handles Buffers)
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an empty object, otherwise false
 */
const isEmptyObject = (val) => {
  // Early return for non-objects or Buffers to prevent RangeError
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }

  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    // Fallback for any other objects that might cause RangeError with Object.keys()
    return false;
  }
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
const isStream = (val) => isObject(val) && isFunction$1(val.pipe);

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
      isFunction$1(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction$1(thing.toString) && thing.toString() === '[object FormData]')
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
    // Buffer check
    if (isBuffer(obj)) {
      return;
    }

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
  if (isBuffer(obj)){
    return null;
  }

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
  const {caseless, skipUndefined} = isContextDefined(this) && this || {};
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
      if (!skipUndefined || !isUndefined(val)) {
        result[targetKey] = val;
      }
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
    if (thisArg && isFunction$1(val)) {
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
  const generator = obj && obj[iterator];

  const _iterator = generator.call(obj);

  let result;

  while ((result = _iterator.next()) && !result.done) {
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
    if (isFunction$1(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction$1(value)) return;

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



/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === 'FormData' && thing[iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      //Buffer check
      if (isBuffer(source)) {
        return source;
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
  thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);

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
  isFunction$1(_global.postMessage)
);

const asap = typeof queueMicrotask !== 'undefined' ?
  queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

// *********************


const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);


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
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
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
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
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

  const msg = error && error.message ? error.message : 'Error';

  // Prefer explicit code; otherwise copy the low-level error's code (e.g. ECONNREFUSED)
  const errCode = code == null && error ? error.code : code;
  AxiosError$1.call(axiosError, msg, errCode, config, request, response);

  // Chain the original error on the standard field; non-enumerable to avoid JSON noise
  if (error && axiosError.cause == null) {
    Object.defineProperty(axiosError, 'cause', { value: error, configurable: true });
  }

  axiosError.name = (error && error.name) || 'Error';

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

    if (utils$1.isBoolean(value)) {
      return value.toString();
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
    replace(/%20/g, '+');
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
  return toFormData$1(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
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
        return JSON.parse(data, this.parseReviver);
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
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError('Object iterator must return a key-value pair');
        }

        obj[key = entry[0]] = (dest = obj[key]) ?
          (utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]]) : entry[1];
      }

      setHeaders(obj, valueOrRewrite);
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

  getSetCookie() {
    return this.get("set-cookie") || [];
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
    fn(...args);
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
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
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

  utils$1.forEach(Object.keys({...config1, ...config2}), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

var resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);

  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;

  newConfig.headers = headers = AxiosHeaders$1.from(headers);

  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);

  // HTTP basic authentication
  if (auth) {
    headers.set('Authorization', 'Basic ' +
      btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
    );
  }

  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(undefined); // browser handles it
    } else if (utils$1.isFunction(data.getHeaders)) {
      // Node.js FormData (like form-data package)
      const formHeaders = data.getHeaders();
      // Only set safe headers to avoid overwriting security headers
      const allowedHeaders = ['content-type', 'content-length'];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
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
  request.onerror = function handleError(event) {
       // Browsers deliver a ProgressEvent in XHR onerror
       // (message may be empty; when present, surface it)
       // See https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/error_event
       const msg = event && event.message ? event.message : 'Network Error';
       const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
       // attach the underlying event for consumers who want details
       err.event = event || null;
       reject(err);
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

const DEFAULT_CHUNK_SIZE = 64 * 1024;

const {isFunction} = utils$1;

const globalFetchAPI = (({fetch, Request, Response}) => ({
    fetch, Request, Response
  }))(utils$1.global);

const {
  ReadableStream: ReadableStream$1, TextEncoder
} = utils$1.global;


const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false
  }
};

const factory = (env) => {
  const {fetch, Request, Response} = Object.assign({}, globalFetchAPI, env);
  const isFetchSupported = isFunction(fetch);
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);

  if (!isFetchSupported) {
    return false;
  }

  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream$1);

  const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
      ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
      async (str) => new Uint8Array(await new Request(str).arrayBuffer())
  );

  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;

    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream$1(),
      method: 'POST',
      get duplex() {
        duplexAccessed = true;
        return 'half';
      },
    }).headers.has('Content-Type');

    return duplexAccessed && !hasContentType;
  });

  const supportsResponseStream = isResponseSupported && isReadableStreamSupported &&
    test(() => utils$1.isReadableStream(new Response('').body));

  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };

  isFetchSupported && ((() => {
    ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
      !resolvers[type] && (resolvers[type] = (res, config) => {
        let method = res && res[type];

        if (method) {
          return method.call(res);
        }

        throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
      });
    });
  })());

  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }

    if (utils$1.isBlob(body)) {
      return body.size;
    }

    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: 'POST',
        body,
      });
      return (await _request.arrayBuffer()).byteLength;
    }

    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }

    if (utils$1.isURLSearchParams(body)) {
      body = body + '';
    }

    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };

  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());

    return length == null ? getBodyLength(body) : length;
  };

  return async (config) => {
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

    let request = null;

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
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;

      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : undefined
      };

      request = isRequestSupported && new Request(url, resolvedOptions);

      let response = await (isRequestSupported ? fetch(request, fetchOptions) : fetch(url, resolvedOptions));

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

      if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        )
      }

      throw AxiosError$1.from(err, err && err.code, config, request);
    }
  }
};

const seedCache = new Map();

const getFetch = (config) => {
  let env = utils$1.merge.call({
    skipUndefined: true
  }, globalFetchAPI, config ? config.env : null);

  const {fetch, Request, Response} = env;

  const seeds = [
    Request, Response, fetch
  ];

  let len = seeds.length, i = len,
    seed, target, map = seedCache;

  while (i--) {
    seed = seeds[i];
    target = map.get(seed);

    target === undefined && map.set(seed, target = (i ? new Map() : factory(env)));

    map = target;
  }

  return target;
};

getFetch();

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: {
    get: getFetch,
  }
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
  getAdapter: (adapters, config) => {
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

      if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
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

  const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);

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

const VERSION$1 = "1.12.1";

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
    this.defaults = instanceConfig || {};
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

    // Set config.allowAbsoluteUrls
    if (config.allowAbsoluteUrls !== undefined) ; else if (this.defaults.allowAbsoluteUrls !== undefined) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
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
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
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
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
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

class SubaccountsClient {
    request;
    static SUBACCOUNT_HEADER = 'X-Mailgun-On-Behalf-Of';
    constructor(request) {
        this.request = request;
    }
    convertToDate(data) {
        const res = {
            ...data,
            created_at: new Date(data.created_at),
            updated_at: new Date(data.updated_at)
        };
        return res;
    }
    async list(query) {
        const res = await this.request.get('/v5/accounts/subaccounts', query);
        return {
            total: res.body.total,
            subaccounts: res.body.subaccounts.map(this.convertToDate)
        };
    }
    async get(id) {
        const res = await this.request.get(`/v5/accounts/subaccounts/${id}`);
        return {
            subaccount: this.convertToDate(res.body.subaccount)
        };
    }
    async create(name) {
        const res = await this.request.postWithFD('/v5/accounts/subaccounts', { name });
        return {
            subaccount: this.convertToDate(res.body.subaccount)
        };
    }
    async destroy(id) {
        try {
            this.request.setSubaccountHeader(id);
            const response = await this.request.delete('/v5/accounts/subaccounts');
            this.request.resetSubaccountHeader();
            return response.body;
        }
        catch (error) {
            this.request.resetSubaccountHeader();
            throw error;
        }
    }
    async getMonthlySendingLimit(id) {
        const response = await this.request.get(`/v5/accounts/subaccounts/${id}/limit/custom/monthly`);
        return response.body;
    }
    async setMonthlySendingLimit(id, limit) {
        const customLimit = { query: `limit=${limit}` };
        const response = await this.request.put(`/v5/accounts/subaccounts/${id}/limit/custom/monthly`, undefined, customLimit);
        return response.body;
    }
    async updateSubaccountFeature(id, features) {
        const keys = ['email_preview', 'inbox_placement', 'sending', 'validations', 'validations_bulk'];
        const readyFeatures = keys.reduce((acc, currentFeatureName) => {
            if (currentFeatureName in features && typeof features[currentFeatureName] === 'boolean') {
                acc[currentFeatureName] = JSON.stringify({
                    enabled: features[currentFeatureName]
                });
            }
            return acc;
        }, {});
        const response = await this.request.put(`/v5/accounts/subaccounts/${id}/features`, readyFeatures);
        return response.body;
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

class AxiosProvider {
    timeout;
    maxBodyLength;
    proxy;
    username;
    key;
    headers;
    useFetch;
    constructor({ username, key, timeout, maxBodyLength, proxy, configHeaders, useFetch }) {
        this.timeout = timeout;
        this.maxBodyLength = maxBodyLength;
        this.proxy = proxy;
        this.username = username;
        this.key = key;
        this.headers = this.makeHeadersFromObject(configHeaders);
        this.useFetch = useFetch;
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
    getDataRelatedHeaders(config) {
        const isFormURLEncoded = config?.isFormURLEncoded ?? true;
        const isMultipartFormData = config?.isMultipartFormData;
        const isApplicationJSON = config?.isApplicationJSON;
        const headers = {};
        if (isFormURLEncoded) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        if (isMultipartFormData) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        if (isApplicationJSON) {
            headers['Content-Type'] = 'application/json';
        }
        return headers;
    }
    addRequestLevelHeaders(config) {
        const requestHeaders = new AxiosHeaders();
        const basic = base64Exports.encode(`${this.username}:${this.key}`);
        requestHeaders.setAuthorization(`Basic ${basic}`);
        requestHeaders.set(this.headers);
        const dataRelatedHeaders = this.getDataRelatedHeaders(config);
        const onCallHeaders = this.makeHeadersFromObject(dataRelatedHeaders);
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
    setSubAccountHeader(subAccountId) {
        this.headers.set(SubaccountsClient.SUBACCOUNT_HEADER, subAccountId);
    }
    resetSubAccountHeader() {
        this.headers.delete(SubaccountsClient.SUBACCOUNT_HEADER);
    }
    async makeRequest(url, method, data, config) {
        let response;
        const requestHeaders = this.addRequestLevelHeaders(config);
        try {
            const reqObject = {
                method: method.toLocaleUpperCase(),
                timeout: this.timeout,
                url,
                headers: requestHeaders,
                ...data,
                maxBodyLength: this.maxBodyLength,
                proxy: this.proxy,
            };
            if (this.useFetch) {
                reqObject.adapter = 'fetch';
                if (config?.dataSize) {
                    if (config.dataSize > 0 && config.dataSize > this.maxBodyLength) {
                        throw new APIError({
                            status: 400,
                            statusText: '(Fetch) Request body larger than maxBodyLength limit',
                            body: `(Fetch) Request body size of ${config.dataSize} bytes exceeds the maximum allowed size of ${this.maxBodyLength} bytes`
                        });
                    }
                }
            }
            response = await axios.request(reqObject);
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
}

class Request {
    url;
    formDataBuilder;
    requestProvider;
    constructor(options, formData) {
        this.url = options.url;
        this.formDataBuilder = new FormDataBuilder(formData, { useFetch: options.useFetch });
        const providersConfig = {
            timeout: options.timeout,
            maxBodyLength: 52428800,
            proxy: options.proxy,
            username: options.username,
            key: options.key,
            configHeaders: options.headers,
            useFetch: options.useFetch
        };
        this.requestProvider = new AxiosProvider(providersConfig);
    }
    async request(method, url, onCallOptions, config) {
        const options = { ...onCallOptions };
        const params = {};
        let fullUrl;
        if (config?.isStorageAPI) {
            fullUrl = url;
        }
        else {
            fullUrl = urljoin(this.url, url);
        }
        if (options?.query && Object.getOwnPropertyNames(options?.query).length > 0) {
            if (options?.query?.searchParams) {
                params.params = new URLSearchParams(options.query.searchParams);
            }
            else {
                params.params = new URLSearchParams(options.query);
            }
        }
        if (options?.body) {
            params.data = options?.body;
        }
        return this.requestProvider.makeRequest(fullUrl, method.toUpperCase(), params, config);
    }
    setSubaccountHeader(subAccountId) {
        this.requestProvider.setSubAccountHeader(subAccountId);
    }
    resetSubaccountHeader() {
        this.requestProvider.resetSubAccountHeader();
    }
    query(method, url, query) {
        return this.request(method, url, { query });
    }
    command(method, url, data, config, queryObject) {
        const requestOptions = {
            body: data,
            query: queryObject?.query,
        };
        return this.request(method, url, requestOptions, config);
    }
    get(url, query) {
        return this.query('get', url, query);
    }
    post(url, data, config) {
        return this.command('post', url, data, {
            isFormURLEncoded: false,
            isApplicationJSON: config?.isApplicationJSON
        });
    }
    async postWithFD(url, data) {
        const { formData, dataSize } = await this.formDataBuilder.createFormData(data);
        return this.command('post', url, formData, {
            isFormURLEncoded: false,
            isMultipartFormData: true,
            dataSize
        });
    }
    async putWithFD(url, data) {
        const { formData, dataSize } = await this.formDataBuilder.createFormData(data);
        return this.command('put', url, formData, {
            isFormURLEncoded: false,
            isMultipartFormData: true,
            dataSize
        });
    }
    async patchWithFD(url, data) {
        const { formData, dataSize } = await this.formDataBuilder.createFormData(data);
        return this.command('patch', url, formData, {
            isFormURLEncoded: false,
            isMultipartFormData: true,
            dataSize
        });
    }
    put(url, data, queryObject) {
        return this.command('put', url, data, {}, queryObject);
    }
    delete(url, data) {
        return this.command('delete', url, data);
    }
}

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
        const options = { query: `self=${data.self}` };
        return this.request.put(`/v3/domains/${domain}/dkim_authority`, {}, options)
            .then((res) => res)
            .then((res) => res.body);
    }
    async updateDKIMSelector(domain, data) {
        const options = { query: `dkim_selector=${data.dkimSelector}` };
        const res = await this.request.put(`/v3/domains/${domain}/dkim_selector`, {}, options);
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
        const options = { query: `web_prefix=${data.webPrefix}` };
        return this.request.put(`/v3/domains/${domain}/web_prefix`, {}, options)
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
        return this.request.get(urljoin('/v3', domain, 'stats/total'), { searchParams })
            .then(this.parseStats);
    }
    getAccount(query) {
        const searchParams = this.prepareSearchParams(query);
        return this.request.get('/v3/stats/total', { searchParams })
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
                .post(urljoin('v3', domain, 'unsubscribes'), JSON.stringify(data), { isApplicationJSON: true })
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
            .post(urljoin('v3', domain, type), JSON.stringify(postData), { isApplicationJSON: true })
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
        if (!data || Object.keys(data).length === 0) {
            throw APIError.getUserDataError('Message data object can not be empty', 'Message data object can not be empty');
        }
        if (data.message) {
            return this.request.postWithFD(`/v3/${domain}/messages.mime`, data)
                .then(this._parseResponse);
        }
        const modifiedData = this.prepareBooleanValues(data);
        return this.request.postWithFD(`/v3/${domain}/messages`, modifiedData)
            .then(this._parseResponse);
    }
    async retrieveStoredEmail(domain, storageKey) {
        const res = await this.request.get(`/v3/domains/${domain}/messages/${storageKey}`);
        return res.body;
    }
    /**
     * domain: string
     * Domain name used to send the message
     *
     * storageKey: string
     * Storage key from the email's associated events
     * (Example: Accepted/Delivered events storage.key field)
     *
     * recipients: string
     * Email address of the recipient(s). You can use commas to separate multiple recipients
     */
    async resendEmail(domain, storageKey, recipients) {
        const res = await this.request.postWithFD(`/v3/domains/${domain}/messages/${storageKey}`, { to: recipients });
        return this._parseResponse(res);
    }
    async getMessagesQueueStatus(domain) {
        const res = await this.request.get(`/v3/domains/${domain}/sending_queues`);
        const apiResponse = res.body;
        const result = {
            regular: {
                is_disabled: apiResponse.regular?.is_disabled,
                disabled: {
                    until: apiResponse.regular?.disabled?.until ? new Date(apiResponse.regular.disabled.until) : '',
                    reason: apiResponse.regular?.disabled?.reason || '',
                }
            },
            scheduled: {
                is_disabled: apiResponse.scheduled?.is_disabled,
                disabled: {
                    until: apiResponse.scheduled?.disabled?.until ? new Date(apiResponse.scheduled.disabled.until) : '',
                    reason: apiResponse.scheduled?.disabled?.reason || '',
                }
            }
        };
        return result;
    }
    /** Deletes all scheduled and undelivered mail from the domain queue.
     * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/messages/delete-v3--domain-name--envelopes
    */
    async clearMessagesQueue(domain, storageUrl) {
        const allowedStorageUrls = ['storage-us-east4.api.mailgun.net', 'storage-us-west1.api.mailgun.net', 'storage-europe-west1.api.mailgun.net'];
        if (!allowedStorageUrls.includes(storageUrl)) {
            throw APIError.getUserDataError('Invalid storage URL', 'The provided storage URL is not allowed.');
        }
        const res = await this.request.command('delete', `https://${storageUrl}/v3/${domain}/envelopes`, undefined, { isStorageAPI: true });
        return res.body;
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
        return this.request.put(urljoin(this.baseRoute, domain, '/tags', tag), { description })
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
        const response = await this.request.get('/v4/inbox/results', { ...queryData });
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
        const options = { query: `enabled=${data.enabled}` };
        const response = await this.request.put(`/v4/inbox/sharing/${id}`, {}, options);
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
        if (config.useFetch && config.proxy) {
            throw new Error('Proxy can not be used with fetch provider');
        }
        /** @internal */
        this.request = new Request(config, formData);
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
//# sourceMappingURL=mailgun.browser.js.map
