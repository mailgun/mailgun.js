// mailgun.js v12.0.3 Copyright (c) 2025 Mailgun and contributors
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
        APIError.isApiError = function (err) {
            return typeof err === 'object' && (err === null || err === void 0 ? void 0 : err.type) === 'MailgunAPIError';
        };
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
        function FormDataBuilder(FormDataConstructor, config) {
            this.FormDataConstructor = FormDataConstructor;
            this.fileKeys = ['attachment', 'inline', 'multipleValidationFile'];
            this.attachmentsHandler = new AttachmentsHandler();
            this.useFetch = config === null || config === void 0 ? void 0 : config.useFetch;
        }
        FormDataBuilder.prototype.createFormData = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var formDataInstance, isFormDataP, formData, result, resObj, blob;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!data) {
                                throw new Error('Please provide data object');
                            }
                            formDataInstance = new this.FormDataConstructor();
                            isFormDataP = this.isFormDataPackage(formDataInstance);
                            if (isFormDataP && this.useFetch) {
                                // in case form-data package is used fetch client thinks form-data is of the string type
                                // also Content-Type is recognized incorrectly
                                throw APIError.getUserDataError('"form-data" npm package detected, and it can not be used together with "fetch" client', 'fetch client does not recognize object created by form-data package as valid FormData instance');
                            }
                            formData = Object.keys(data)
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
                            }, formDataInstance);
                            result = {
                                formData: formData,
                                dataSize: 0
                            };
                            if (!(this.useFetch && !isFormDataP)) return [3 /*break*/, 2];
                            // axios trick to get correct Content-Type with boundary
                            // otherwise boundary is missing and request fails
                            Object.defineProperty(formData, 'getHeaders', {
                                value: function () { return ({ 'Content-Type': undefined }); },
                            });
                            if (!(Response !== undefined)) return [3 /*break*/, 2];
                            resObj = new Response(formData);
                            return [4 /*yield*/, resObj.blob()];
                        case 1:
                            blob = _a.sent();
                            result.dataSize = blob.size;
                            _a.label = 2;
                        case 2: return [2 /*return*/, result];
                    }
                });
            });
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

    var AxiosProvider = /** @class */ (function () {
        function AxiosProvider(_a) {
            var username = _a.username, key = _a.key, timeout = _a.timeout, maxBodyLength = _a.maxBodyLength, proxy = _a.proxy, configHeaders = _a.configHeaders, useFetch = _a.useFetch;
            this.timeout = timeout;
            this.maxBodyLength = maxBodyLength;
            this.proxy = proxy;
            this.username = username;
            this.key = key;
            this.headers = this.makeHeadersFromObject(configHeaders);
            this.useFetch = useFetch;
        }
        AxiosProvider.prototype.getResponseBody = function (response) {
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
        AxiosProvider.prototype.getDataRelatedHeaders = function (config) {
            var _a;
            var isFormURLEncoded = (_a = config === null || config === void 0 ? void 0 : config.isFormURLEncoded) !== null && _a !== void 0 ? _a : true;
            var isMultipartFormData = config === null || config === void 0 ? void 0 : config.isMultipartFormData;
            var isApplicationJSON = config === null || config === void 0 ? void 0 : config.isApplicationJSON;
            var headers = {};
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
        };
        AxiosProvider.prototype.addRequestLevelHeaders = function (config) {
            var requestHeaders = new AxiosHeaders();
            var basic = base64Exports.encode("".concat(this.username, ":").concat(this.key));
            requestHeaders.setAuthorization("Basic ".concat(basic));
            requestHeaders.set(this.headers);
            var dataRelatedHeaders = this.getDataRelatedHeaders(config);
            var onCallHeaders = this.makeHeadersFromObject(dataRelatedHeaders);
            requestHeaders.set(onCallHeaders);
            return requestHeaders;
        };
        AxiosProvider.prototype.makeHeadersFromObject = function (headersObject) {
            if (headersObject === void 0) { headersObject = {}; }
            var requestHeaders = new AxiosHeaders();
            requestHeaders = Object.entries(headersObject).reduce(function (headersAccumulator, currentPair) {
                var key = currentPair[0], value = currentPair[1];
                headersAccumulator.set(key, value);
                return headersAccumulator;
            }, requestHeaders);
            return requestHeaders;
        };
        AxiosProvider.prototype.setSubAccountHeader = function (subAccountId) {
            this.headers.set(SubaccountsClient.SUBACCOUNT_HEADER, subAccountId);
        };
        AxiosProvider.prototype.resetSubAccountHeader = function () {
            this.headers.delete(SubaccountsClient.SUBACCOUNT_HEADER);
        };
        AxiosProvider.prototype.makeRequest = function (url, method, data, config) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function () {
                var response, requestHeaders, reqObject, err_1, errorResponse, res;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            requestHeaders = this.addRequestLevelHeaders(config);
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 3, , 4]);
                            reqObject = __assign(__assign({ method: method.toLocaleUpperCase(), timeout: this.timeout, url: url, headers: requestHeaders }, data), { maxBodyLength: this.maxBodyLength, proxy: this.proxy });
                            if (this.useFetch) {
                                reqObject.adapter = 'fetch';
                                if (config === null || config === void 0 ? void 0 : config.dataSize) {
                                    if (config.dataSize > 0 && config.dataSize > this.maxBodyLength) {
                                        throw new APIError({
                                            status: 400,
                                            statusText: '(Fetch) Request body larger than maxBodyLength limit',
                                            body: "(Fetch) Request body size of ".concat(config.dataSize, " bytes exceeds the maximum allowed size of ").concat(this.maxBodyLength, " bytes")
                                        });
                                    }
                                }
                            }
                            return [4 /*yield*/, axios.request(reqObject)];
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
        return AxiosProvider;
    }());

    var Request = /** @class */ (function () {
        function Request(options, formData) {
            this.url = options.url;
            this.formDataBuilder = new FormDataBuilder(formData, { useFetch: options.useFetch });
            var providersConfig = {
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
        Request.prototype.request = function (method, url, onCallOptions, config) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var options, params, urlValue;
                return __generator(this, function (_b) {
                    options = __assign({}, onCallOptions);
                    params = {};
                    urlValue = urljoin(this.url, url);
                    if ((options === null || options === void 0 ? void 0 : options.query) && Object.getOwnPropertyNames(options === null || options === void 0 ? void 0 : options.query).length > 0) {
                        if ((_a = options === null || options === void 0 ? void 0 : options.query) === null || _a === void 0 ? void 0 : _a.searchParams) {
                            params.params = new URLSearchParams(options.query.searchParams);
                        }
                        else {
                            params.params = new URLSearchParams(options.query);
                        }
                    }
                    if (options === null || options === void 0 ? void 0 : options.body) {
                        params.data = options === null || options === void 0 ? void 0 : options.body;
                    }
                    return [2 /*return*/, this.requestProvider.makeRequest(urlValue, method.toUpperCase(), params, config)];
                });
            });
        };
        Request.prototype.setSubaccountHeader = function (subAccountId) {
            this.requestProvider.setSubAccountHeader(subAccountId);
        };
        Request.prototype.resetSubaccountHeader = function () {
            this.requestProvider.resetSubAccountHeader();
        };
        Request.prototype.query = function (method, url, query) {
            return this.request(method, url, { query: query });
        };
        Request.prototype.command = function (method, url, data, config, queryObject) {
            var requestOptions = {
                body: data,
                query: queryObject === null || queryObject === void 0 ? void 0 : queryObject.query,
            };
            return this.request(method, url, requestOptions, config);
        };
        Request.prototype.get = function (url, query) {
            return this.query('get', url, query);
        };
        Request.prototype.post = function (url, data, config) {
            return this.command('post', url, data, {
                isFormURLEncoded: false,
                isApplicationJSON: config === null || config === void 0 ? void 0 : config.isApplicationJSON
            });
        };
        Request.prototype.postWithFD = function (url, data) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, formData, dataSize;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.formDataBuilder.createFormData(data)];
                        case 1:
                            _a = _b.sent(), formData = _a.formData, dataSize = _a.dataSize;
                            return [2 /*return*/, this.command('post', url, formData, {
                                    isFormURLEncoded: false,
                                    isMultipartFormData: true,
                                    dataSize: dataSize
                                })];
                    }
                });
            });
        };
        Request.prototype.putWithFD = function (url, data) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, formData, dataSize;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.formDataBuilder.createFormData(data)];
                        case 1:
                            _a = _b.sent(), formData = _a.formData, dataSize = _a.dataSize;
                            return [2 /*return*/, this.command('put', url, formData, {
                                    isFormURLEncoded: false,
                                    isMultipartFormData: true,
                                    dataSize: dataSize
                                })];
                    }
                });
            });
        };
        Request.prototype.patchWithFD = function (url, data) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, formData, dataSize;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.formDataBuilder.createFormData(data)];
                        case 1:
                            _a = _b.sent(), formData = _a.formData, dataSize = _a.dataSize;
                            return [2 /*return*/, this.command('patch', url, formData, {
                                    isFormURLEncoded: false,
                                    isMultipartFormData: true,
                                    dataSize: dataSize
                                })];
                    }
                });
            });
        };
        Request.prototype.put = function (url, data, queryObject) {
            return this.command('put', url, data, {}, queryObject);
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
            var options = { query: "self=".concat(data.self) };
            return this.request.put("/v3/domains/".concat(domain, "/dkim_authority"), {}, options)
                .then(function (res) { return res; })
                .then(function (res) { return res.body; });
        };
        DomainsClient.prototype.updateDKIMSelector = function (domain, data) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var options, res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            options = { query: "dkim_selector=".concat(data.dkimSelector) };
                            return [4 /*yield*/, this.request.put("/v3/domains/".concat(domain, "/dkim_selector"), {}, options)];
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
            var options = { query: "web_prefix=".concat(data.webPrefix) };
            return this.request.put("/v3/domains/".concat(domain, "/web_prefix"), {}, options)
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
            return this.request.get(urljoin('/v3', domain, 'stats/total'), { searchParams: searchParams })
                .then(this.parseStats);
        };
        StatsClient.prototype.getAccount = function (query) {
            var searchParams = this.prepareSearchParams(query);
            return this.request.get('/v3/stats/total', { searchParams: searchParams })
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
                    .post(urljoin('v3', domain, 'unsubscribes'), JSON.stringify(data), { isApplicationJSON: true })
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
                .post(urljoin('v3', domain, type), JSON.stringify(postData), { isApplicationJSON: true })
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
            return this.request.put(urljoin(this.baseRoute, domain, '/tags', tag), { description: description })
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
                            return [4 /*yield*/, this.request.get('/v4/inbox/results', __assign({}, queryData))];
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
                var options, response, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = { query: "enabled=".concat(data.enabled) };
                            return [4 /*yield*/, this.request.put("/v4/inbox/sharing/".concat(id), {}, options)];
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
            if (config.useFetch && config.proxy) {
                throw new Error('Proxy can not be used with fetch provider');
            }
            /** @internal */
            this.request = new Request(config, formData);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbGd1bi5hbWQuanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwiLi4vLi4vbGliL0NsYXNzZXMvY29tbW9uL0Vycm9yLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvY29tbW9uL0F0dGFjaG1lbnRzSGFuZGxlci50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL2NvbW1vbi9Gb3JtRGF0YUJ1aWxkZXIudHMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9udWxsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvRm9ybURhdGEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9Gb3JtRGF0YS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Jsb2IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2NvbW1vbi91dGlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9VUkxFbmNvZGVkRm9ybS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zSGVhZGVycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZVByb3RvY29sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwZWVkb21ldGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Rocm90dGxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9tZXJnZUNvbmZpZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdHJhY2tTdHJlYW0uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2ZldGNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9hZGFwdGVycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2Vudi9kYXRhLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3ZhbGlkYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2Jhc2UtNjQvYmFzZTY0LmpzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3ViYWNjb3VudHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9jb21tb24vUmVxdWVzdFByb3ZpZGVycy9BeGlvc1Byb3ZpZGVyLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvY29tbW9uL1JlcXVlc3QudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbi50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRXZlbnRzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3RhdHMvU3RhdHNDb250YWluZXIudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdGF0cy9TdGF0c0NsaWVudC50cyIsIi4uLy4uL2xpYi9FbnVtcy9pbmRleC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbi50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9Cb3VuY2UudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvQ29tcGxhaW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1Vuc3Vic2NyaWJlLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1doaXRlTGlzdC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbnNDbGllbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9XZWJob29rcy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL01lc3NhZ2VzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvUm91dGVzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvVmFsaWRhdGlvbnMvdmFsaWRhdGUudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JUHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JUFBvb2xzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvTWFpbGluZ0xpc3RzL21haWxpbmdMaXN0cy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL01haWxpbmdMaXN0cy9tYWlsTGlzdE1lbWJlcnMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNDcmVkZW50aWFscy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1ZhbGlkYXRpb25zL211bHRpcGxlVmFsaWRhdGlvbi50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RlbXBsYXRlcy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RhZ3MudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL2luYm94UGxhY2VtZW50cy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvQXR0cmlidXRlc0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9GaWx0ZXJzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvcHJvdmlkZXJzL0luYm94UGxhY2VtZW50c1Byb3ZpZGVycy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL01ldHJpY3MvTWV0cmljc0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RyYWNraW5nLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvTWFpbGd1bkNsaWVudC50cyIsIi4uLy4uL2xpYi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XHJcbiAgICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XHJcbiAgICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICB2YXIgYXIgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xyXG4gICAgICAgIHJldHVybiBhcjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gb3duS2V5cyhvKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XHJcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xyXG4gICAgICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcclxuICAgICAgICBpZiAoYXN5bmMpIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xyXG4gICAgICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhc3luYykge1xyXG4gICAgICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG59XHJcblxyXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcclxuICAgIGZ1bmN0aW9uIGZhaWwoZSkge1xyXG4gICAgICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcclxuICAgICAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdmFyIHIsIHMgPSAwO1xyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoci5kaXNwb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHMgfD0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZmFpbChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcclxuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGg7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIF9fZXh0ZW5kczogX19leHRlbmRzLFxyXG4gICAgX19hc3NpZ246IF9fYXNzaWduLFxyXG4gICAgX19yZXN0OiBfX3Jlc3QsXHJcbiAgICBfX2RlY29yYXRlOiBfX2RlY29yYXRlLFxyXG4gICAgX19wYXJhbTogX19wYXJhbSxcclxuICAgIF9fZXNEZWNvcmF0ZTogX19lc0RlY29yYXRlLFxyXG4gICAgX19ydW5Jbml0aWFsaXplcnM6IF9fcnVuSW5pdGlhbGl6ZXJzLFxyXG4gICAgX19wcm9wS2V5OiBfX3Byb3BLZXksXHJcbiAgICBfX3NldEZ1bmN0aW9uTmFtZTogX19zZXRGdW5jdGlvbk5hbWUsXHJcbiAgICBfX21ldGFkYXRhOiBfX21ldGFkYXRhLFxyXG4gICAgX19hd2FpdGVyOiBfX2F3YWl0ZXIsXHJcbiAgICBfX2dlbmVyYXRvcjogX19nZW5lcmF0b3IsXHJcbiAgICBfX2NyZWF0ZUJpbmRpbmc6IF9fY3JlYXRlQmluZGluZyxcclxuICAgIF9fZXhwb3J0U3RhcjogX19leHBvcnRTdGFyLFxyXG4gICAgX192YWx1ZXM6IF9fdmFsdWVzLFxyXG4gICAgX19yZWFkOiBfX3JlYWQsXHJcbiAgICBfX3NwcmVhZDogX19zcHJlYWQsXHJcbiAgICBfX3NwcmVhZEFycmF5czogX19zcHJlYWRBcnJheXMsXHJcbiAgICBfX3NwcmVhZEFycmF5OiBfX3NwcmVhZEFycmF5LFxyXG4gICAgX19hd2FpdDogX19hd2FpdCxcclxuICAgIF9fYXN5bmNHZW5lcmF0b3I6IF9fYXN5bmNHZW5lcmF0b3IsXHJcbiAgICBfX2FzeW5jRGVsZWdhdG9yOiBfX2FzeW5jRGVsZWdhdG9yLFxyXG4gICAgX19hc3luY1ZhbHVlczogX19hc3luY1ZhbHVlcyxcclxuICAgIF9fbWFrZVRlbXBsYXRlT2JqZWN0OiBfX21ha2VUZW1wbGF0ZU9iamVjdCxcclxuICAgIF9faW1wb3J0U3RhcjogX19pbXBvcnRTdGFyLFxyXG4gICAgX19pbXBvcnREZWZhdWx0OiBfX2ltcG9ydERlZmF1bHQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0OiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZFNldDogX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRJbjogX19jbGFzc1ByaXZhdGVGaWVsZEluLFxyXG4gICAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2U6IF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxyXG4gICAgX19kaXNwb3NlUmVzb3VyY2VzOiBfX2Rpc3Bvc2VSZXNvdXJjZXMsXHJcbiAgICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbjogX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXHJcbn07XHJcbiIsIihmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShkZWZpbml0aW9uKTtcbiAgZWxzZSBjb250ZXh0W25hbWVdID0gZGVmaW5pdGlvbigpO1xufSkoJ3VybGpvaW4nLCB0aGlzLCBmdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplIChzdHJBcnJheSkge1xuICAgIHZhciByZXN1bHRBcnJheSA9IFtdO1xuICAgIGlmIChzdHJBcnJheS5sZW5ndGggPT09IDApIHsgcmV0dXJuICcnOyB9XG5cbiAgICBpZiAodHlwZW9mIHN0ckFycmF5WzBdICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVXJsIG11c3QgYmUgYSBzdHJpbmcuIFJlY2VpdmVkICcgKyBzdHJBcnJheVswXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGZpcnN0IHBhcnQgaXMgYSBwbGFpbiBwcm90b2NvbCwgd2UgY29tYmluZSBpdCB3aXRoIHRoZSBuZXh0IHBhcnQuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eW14vOl0rOlxcLyokLykgJiYgc3RyQXJyYXkubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGZpcnN0ID0gc3RyQXJyYXkuc2hpZnQoKTtcbiAgICAgIHN0ckFycmF5WzBdID0gZmlyc3QgKyBzdHJBcnJheVswXTtcbiAgICB9XG5cbiAgICAvLyBUaGVyZSBtdXN0IGJlIHR3byBvciB0aHJlZSBzbGFzaGVzIGluIHRoZSBmaWxlIHByb3RvY29sLCB0d28gc2xhc2hlcyBpbiBhbnl0aGluZyBlbHNlLlxuICAgIGlmIChzdHJBcnJheVswXS5tYXRjaCgvXmZpbGU6XFwvXFwvXFwvLykpIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8vJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8nKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gc3RyQXJyYXlbaV07XG5cbiAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIGNvbXBvbmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wb25lbnQgPT09ICcnKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgc3RhcnRpbmcgc2xhc2hlcyBmb3IgZWFjaCBjb21wb25lbnQgYnV0IHRoZSBmaXJzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL15bXFwvXSsvLCAnJyk7XG4gICAgICB9XG4gICAgICBpZiAoaSA8IHN0ckFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGVuZGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGxhc3QuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIHRoZSBsYXN0IGNvbXBvbmVudCB3ZSB3aWxsIGNvbWJpbmUgbXVsdGlwbGUgc2xhc2hlcyB0byBhIHNpbmdsZSBvbmUuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJy8nKTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0QXJyYXkucHVzaChjb21wb25lbnQpO1xuXG4gICAgfVxuXG4gICAgdmFyIHN0ciA9IHJlc3VsdEFycmF5LmpvaW4oJy8nKTtcbiAgICAvLyBFYWNoIGlucHV0IGNvbXBvbmVudCBpcyBub3cgc2VwYXJhdGVkIGJ5IGEgc2luZ2xlIHNsYXNoIGV4Y2VwdCB0aGUgcG9zc2libGUgZmlyc3QgcGxhaW4gcHJvdG9jb2wgcGFydC5cblxuICAgIC8vIHJlbW92ZSB0cmFpbGluZyBzbGFzaCBiZWZvcmUgcGFyYW1ldGVycyBvciBoYXNoXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcLyhcXD98JnwjW14hXSkvZywgJyQxJyk7XG5cbiAgICAvLyByZXBsYWNlID8gaW4gcGFyYW1ldGVycyB3aXRoICZcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJz8nKTtcbiAgICBzdHIgPSBwYXJ0cy5zaGlmdCgpICsgKHBhcnRzLmxlbmd0aCA+IDAgPyAnPyc6ICcnKSArIHBhcnRzLmpvaW4oJyYnKTtcblxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnB1dDtcblxuICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgaW5wdXQgPSBhcmd1bWVudHNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0ID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBub3JtYWxpemUoaW5wdXQpO1xuICB9O1xuXG59KTtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIEFQSUVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBUElFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBUElFcnJvcihfYSkge1xuICAgICAgICB2YXIgc3RhdHVzID0gX2Euc3RhdHVzLCBzdGF0dXNUZXh0ID0gX2Euc3RhdHVzVGV4dCwgbWVzc2FnZSA9IF9hLm1lc3NhZ2UsIF9iID0gX2EuYm9keSwgYm9keSA9IF9iID09PSB2b2lkIDAgPyB7fSA6IF9iO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYm9keU1lc3NhZ2UgPSAnJztcbiAgICAgICAgdmFyIGVycm9yID0gJyc7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGJvZHlNZXNzYWdlID0gYm9keTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJvZHlNZXNzYWdlID0gKGJvZHkgPT09IG51bGwgfHwgYm9keSA9PT0gdm9pZCAwID8gdm9pZCAwIDogYm9keS5tZXNzYWdlKSB8fCAnJztcbiAgICAgICAgICAgIGVycm9yID0gKGJvZHkgPT09IG51bGwgfHwgYm9keSA9PT0gdm9pZCAwID8gdm9pZCAwIDogYm9keS5lcnJvcikgfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zdGFjayA9ICcnO1xuICAgICAgICBfdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIF90aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IGVycm9yIHx8IHN0YXR1c1RleHQgfHwgJyc7XG4gICAgICAgIF90aGlzLmRldGFpbHMgPSBib2R5TWVzc2FnZTtcbiAgICAgICAgX3RoaXMudHlwZSA9ICdNYWlsZ3VuQVBJRXJyb3InO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFQSUVycm9yLmlzQXBpRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZXJyID09PSAnb2JqZWN0JyAmJiAoZXJyID09PSBudWxsIHx8IGVyciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyLnR5cGUpID09PSAnTWFpbGd1bkFQSUVycm9yJztcbiAgICB9O1xuICAgIEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IgPSBmdW5jdGlvbiAoc3RhdHVzVGV4dCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoe1xuICAgICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgICBzdGF0dXNUZXh0OiBzdGF0dXNUZXh0LFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQVBJRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnQgZGVmYXVsdCBBUElFcnJvcjtcbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvci5qcyc7XG52YXIgQmxvYkZyb21TdHJlYW0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmxvYkZyb21TdHJlYW0oc3RyZWFtLCBzaXplKSB7XG4gICAgICAgIHRoaXMuX3N0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB9XG4gICAgQmxvYkZyb21TdHJlYW0ucHJvdG90eXBlLnN0cmVhbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmVhbTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCbG9iRnJvbVN0cmVhbS5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnQmxvYic7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gQmxvYkZyb21TdHJlYW07XG59KCkpO1xudmFyIEF0dGFjaG1lbnRzSGFuZGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBdHRhY2htZW50c0hhbmRsZXIoKSB7XG4gICAgfVxuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuZ2V0QXR0YWNobWVudE9wdGlvbnMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXIgZmlsZW5hbWUgPSBpdGVtLmZpbGVuYW1lLCBjb250ZW50VHlwZSA9IGl0ZW0uY29udGVudFR5cGUsIGtub3duTGVuZ3RoID0gaXRlbS5rbm93bkxlbmd0aDtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCAoZmlsZW5hbWUgPyB7IGZpbGVuYW1lOiBmaWxlbmFtZSB9IDogeyBmaWxlbmFtZTogJ2ZpbGUnIH0pKSwgKGNvbnRlbnRUeXBlICYmIHsgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlIH0pKSwgKGtub3duTGVuZ3RoICYmIHsga25vd25MZW5ndGg6IGtub3duTGVuZ3RoIH0pKTtcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuZ2V0RmlsZUluZm8gPSBmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLm5hbWUsIGNvbnRlbnRUeXBlID0gZmlsZS50eXBlLCBrbm93bkxlbmd0aCA9IGZpbGUuc2l6ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZTogZmlsZW5hbWUsIGNvbnRlbnRUeXBlOiBjb250ZW50VHlwZSwga25vd25MZW5ndGg6IGtub3duTGVuZ3RoIH0pO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5nZXRDdXN0b21GaWxlSW5mbyA9IGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHZhciBmaWxlbmFtZSA9IGZpbGUuZmlsZW5hbWUsIGNvbnRlbnRUeXBlID0gZmlsZS5jb250ZW50VHlwZSwga25vd25MZW5ndGggPSBmaWxlLmtub3duTGVuZ3RoO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyh7IGZpbGVuYW1lOiBmaWxlbmFtZSwgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aDoga25vd25MZW5ndGggfSk7XG4gICAgfTtcbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmdldEJ1ZmZlckluZm8gPSBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgIHZhciBrbm93bkxlbmd0aCA9IGJ1ZmZlci5ieXRlTGVuZ3RoO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyh7IGZpbGVuYW1lOiAnZmlsZScsIGNvbnRlbnRUeXBlOiAnJywga25vd25MZW5ndGg6IGtub3duTGVuZ3RoIH0pO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5pc1N0cmVhbSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGRhdGEucGlwZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuaXNDdXN0b21GaWxlID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbiAgICAgICAgICAgICYmICEhb2JqLmRhdGE7XG4gICAgfTtcbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmlzQnJvd3NlckZpbGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAoISFvYmoubmFtZSB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpKTtcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuaXNCdWZmZXIgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQnVmZmVyLmlzQnVmZmVyKGRhdGEpO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5nZXRBdHRhY2htZW50SW5mbyA9IGZ1bmN0aW9uIChhdHRhY2htZW50KSB7XG4gICAgICAgIHZhciBpc0Jyb3dzZXJGaWxlID0gdGhpcy5pc0Jyb3dzZXJGaWxlKGF0dGFjaG1lbnQpO1xuICAgICAgICB2YXIgaXNDdXN0b21GaWxlID0gdGhpcy5pc0N1c3RvbUZpbGUoYXR0YWNobWVudCk7XG4gICAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiBhdHRhY2htZW50ID09PSAnc3RyaW5nJztcbiAgICAgICAgaWYgKCFpc1N0cmluZykge1xuICAgICAgICAgICAgaWYgKGlzQnJvd3NlckZpbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWxlSW5mbyhhdHRhY2htZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBCdWZmZXIuaXNCdWZmZXIoYXR0YWNobWVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWZmZXJJbmZvKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzQ3VzdG9tRmlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEN1c3RvbUZpbGVJbmZvKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgZmlsZW5hbWU6ICdmaWxlJyxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBrbm93bkxlbmd0aDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5jb252ZXJ0VG9GRGV4cGVjdGVkU2hhcGUgPSBmdW5jdGlvbiAodXNlclByb3ZpZGVkVmFsdWUpIHtcbiAgICAgICAgdmFyIGlzU3RyZWFtID0gdGhpcy5pc1N0cmVhbSh1c2VyUHJvdmlkZWRWYWx1ZSk7XG4gICAgICAgIHZhciBpc0Jyb3dzZXJGaWxlID0gdGhpcy5pc0Jyb3dzZXJGaWxlKHVzZXJQcm92aWRlZFZhbHVlKTtcbiAgICAgICAgdmFyIGlzQ3VzdG9tRmlsZSA9IHRoaXMuaXNDdXN0b21GaWxlKHVzZXJQcm92aWRlZFZhbHVlKTtcbiAgICAgICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHVzZXJQcm92aWRlZFZhbHVlID09PSAnc3RyaW5nJztcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgaWYgKGlzU3RyZWFtIHx8IGlzU3RyaW5nIHx8IGlzQnJvd3NlckZpbGUgfHwgdGhpcy5pc0J1ZmZlcih1c2VyUHJvdmlkZWRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHVzZXJQcm92aWRlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzQ3VzdG9tRmlsZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdXNlclByb3ZpZGVkVmFsdWUuZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXCJVbmtub3duIGF0dGFjaG1lbnQgdHlwZSBcIi5jb25jYXQodHlwZW9mIHVzZXJQcm92aWRlZFZhbHVlKSwgXCJUaGUgXFxcImF0dGFjaG1lbnRcXFwiIHByb3BlcnR5IGV4cGVjdHMgZWl0aGVyIEJ1ZmZlciwgQmxvYiwgb3IgU3RyaW5nLlxcbiAgICAgICAgICBBbHNvLCBJdCBpcyBwb3NzaWJsZSB0byBwcm92aWRlIGFuIG9iamVjdCB0aGF0IGhhcyB0aGUgcHJvcGVydHkgXFxcImRhdGFcXFwiIHdpdGggYSB2YWx1ZSB0aGF0IGlzIGVxdWFsIHRvIG9uZSBvZiB0aGUgdHlwZXMgY291bnRlZCBiZWZvcmUuXFxuICAgICAgICAgIEFkZGl0aW9uYWxseSwgeW91IG1heSB1c2UgYW4gYXJyYXkgdG8gc2VuZCBtb3JlIHRoYW4gb25lIGF0dGFjaG1lbnQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmdldEJsb2JGcm9tU3RyZWFtID0gZnVuY3Rpb24gKHN0cmVhbSwgc2l6ZSkge1xuICAgICAgICByZXR1cm4gbmV3IEJsb2JGcm9tU3RyZWFtKHN0cmVhbSwgc2l6ZSk7XG4gICAgfTtcbiAgICByZXR1cm4gQXR0YWNobWVudHNIYW5kbGVyO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEF0dGFjaG1lbnRzSGFuZGxlcjtcbiIsImltcG9ydCB7IF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yLmpzJztcbmltcG9ydCBBdHRhY2htZW50c0hhbmRsZXIgZnJvbSAnLi9BdHRhY2htZW50c0hhbmRsZXIuanMnO1xudmFyIEZvcm1EYXRhQnVpbGRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGb3JtRGF0YUJ1aWxkZXIoRm9ybURhdGFDb25zdHJ1Y3RvciwgY29uZmlnKSB7XG4gICAgICAgIHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvciA9IEZvcm1EYXRhQ29uc3RydWN0b3I7XG4gICAgICAgIHRoaXMuZmlsZUtleXMgPSBbJ2F0dGFjaG1lbnQnLCAnaW5saW5lJywgJ211bHRpcGxlVmFsaWRhdGlvbkZpbGUnXTtcbiAgICAgICAgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIgPSBuZXcgQXR0YWNobWVudHNIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMudXNlRmV0Y2ggPSBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcudXNlRmV0Y2g7XG4gICAgfVxuICAgIEZvcm1EYXRhQnVpbGRlci5wcm90b3R5cGUuY3JlYXRlRm9ybURhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZm9ybURhdGFJbnN0YW5jZSwgaXNGb3JtRGF0YVAsIGZvcm1EYXRhLCByZXN1bHQsIHJlc09iaiwgYmxvYjtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRhdGEgb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YUluc3RhbmNlID0gbmV3IHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNGb3JtRGF0YVAgPSB0aGlzLmlzRm9ybURhdGFQYWNrYWdlKGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRm9ybURhdGFQICYmIHRoaXMudXNlRmV0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbiBjYXNlIGZvcm0tZGF0YSBwYWNrYWdlIGlzIHVzZWQgZmV0Y2ggY2xpZW50IHRoaW5rcyBmb3JtLWRhdGEgaXMgb2YgdGhlIHN0cmluZyB0eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxzbyBDb250ZW50LVR5cGUgaXMgcmVjb2duaXplZCBpbmNvcnJlY3RseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1wiZm9ybS1kYXRhXCIgbnBtIHBhY2thZ2UgZGV0ZWN0ZWQsIGFuZCBpdCBjYW4gbm90IGJlIHVzZWQgdG9nZXRoZXIgd2l0aCBcImZldGNoXCIgY2xpZW50JywgJ2ZldGNoIGNsaWVudCBkb2VzIG5vdCByZWNvZ25pemUgb2JqZWN0IGNyZWF0ZWQgYnkgZm9ybS1kYXRhIHBhY2thZ2UgYXMgdmFsaWQgRm9ybURhdGEgaW5zdGFuY2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGRhdGFba2V5XTsgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVkdWNlKGZ1bmN0aW9uIChmb3JtRGF0YUFjYywga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmZpbGVLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0dGFjaG1lbnRWYWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmlzTWVzc2FnZUF0dGFjaG1lbnQoYXR0YWNobWVudFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkRmlsZXNUb0ZEKGtleSwgYXR0YWNobWVudFZhbHVlLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcIlVua25vd24gdmFsdWUgXCIuY29uY2F0KGRhdGFba2V5XSwgXCIgd2l0aCB0eXBlIFwiKS5jb25jYXQodHlwZW9mIGRhdGFba2V5XSwgXCIgZm9yIHByb3BlcnR5IFxcXCJcIikuY29uY2F0KGtleSwgXCJcXFwiXCIpLCBcIlRoZSBrZXkgXFxcIlwiLmNvbmNhdChrZXksIFwiXFxcIiBzaG91bGQgaGF2ZSB0eXBlIG9mIEJ1ZmZlciwgU3RyZWFtLCBGaWxlLCBvciBTdHJpbmcgXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ21lc3NhZ2UnKSB7IC8vIG1pbWUgbWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZVZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW1lc3NhZ2VWYWx1ZSB8fCAhX3RoaXMuaXNNSU1FKG1lc3NhZ2VWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXCJVbmtub3duIGRhdGEgdHlwZSBmb3IgXFxcIlwiLmNvbmNhdChrZXksIFwiXFxcIiBwcm9wZXJ0eVwiKSwgJ1RoZSBtaW1lIGRhdGEgc2hvdWxkIGhhdmUgdHlwZSBvZiBCdWZmZXIsIFN0cmluZyBvciBCbG9iJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkTWltZURhdGFUb0ZEKGtleSwgbWVzc2FnZVZhbHVlLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkQ29tbW9uUHJvcGVydHlUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdGE6IGZvcm1EYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTaXplOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodGhpcy51c2VGZXRjaCAmJiAhaXNGb3JtRGF0YVApKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF4aW9zIHRyaWNrIHRvIGdldCBjb3JyZWN0IENvbnRlbnQtVHlwZSB3aXRoIGJvdW5kYXJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UgYm91bmRhcnkgaXMgbWlzc2luZyBhbmQgcmVxdWVzdCBmYWlsc1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZvcm1EYXRhLCAnZ2V0SGVhZGVycycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gKHsgJ0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZCB9KTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoUmVzcG9uc2UgIT09IHVuZGVmaW5lZCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzT2JqID0gbmV3IFJlc3BvbnNlKGZvcm1EYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHJlc09iai5ibG9iKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9iID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGFTaXplID0gYmxvYi5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbMiAvKnJldHVybiovLCByZXN1bHRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEZvcm1EYXRhQnVpbGRlci5wcm90b3R5cGUuYWRkTWltZURhdGFUb0ZEID0gZnVuY3Rpb24gKGtleSwgZGF0YSwgZm9ybURhdGFJbnN0YW5jZSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7IC8vIGlmIHN0cmluZyBvbmx5IHR3byBwYXJhbWV0ZXJzIHNob3VsZCBiZSB1c2VkLlxuICAgICAgICAgICAgZm9ybURhdGFJbnN0YW5jZS5hcHBlbmQoa2V5LCBkYXRhKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YUluc3RhbmNlKSkgeyAvLyBmb3JtLWRhdGEgcGFja2FnZSBpcyB1c2VkXG4gICAgICAgICAgICB2YXIgbm9kZUZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZTtcbiAgICAgICAgICAgIG5vZGVGb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhLCB7IGZpbGVuYW1lOiAnTWltZU1lc3NhZ2UnIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkKSB7IC8vIGVpdGhlciBub2RlID4gMTggb3IgYnJvd3NlclxuICAgICAgICAgICAgdmFyIGJyb3dzZXJGb3JtRGF0YSA9IGZvcm1EYXRhSW5zdGFuY2U7IC8vIEJyb3dzZXIgY29tcGxpYW50IEZvcm1EYXRhXG4gICAgICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YSwgJ01pbWVNZXNzYWdlJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGRhdGEpKSB7IC8vIG5vZGUgZW52aXJvbm1lbnRcbiAgICAgICAgICAgICAgICB2YXIgYmxvYkluc3RhbmNlID0gbmV3IEJsb2IoW2RhdGFdKTtcbiAgICAgICAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgYmxvYkluc3RhbmNlLCAnTWltZU1lc3NhZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgRm9ybURhdGFCdWlsZGVyLnByb3RvdHlwZS5pc01JTUUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGRhdGEgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoZGF0YSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2YgUmVhZGFibGVTdHJlYW0gIT09ICd1bmRlZmluZWQnICYmIGRhdGEgaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbSk7XG4gICAgfTtcbiAgICBGb3JtRGF0YUJ1aWxkZXIucHJvdG90eXBlLmlzRm9ybURhdGFQYWNrYWdlID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbiAgICAgICAgICAgICYmIG9iaiAhPT0gbnVsbFxuICAgICAgICAgICAgJiYgdHlwZW9mIG9iai5nZXRIZWFkZXJzID09PSAnZnVuY3Rpb24nO1xuICAgIH07XG4gICAgRm9ybURhdGFCdWlsZGVyLnByb3RvdHlwZS5pc01lc3NhZ2VBdHRhY2htZW50ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNDdXN0b21GaWxlKHZhbHVlKVxuICAgICAgICAgICAgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgfHwgKHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpXG4gICAgICAgICAgICB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQmxvYilcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKHZhbHVlKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0odmFsdWUpXG4gICAgICAgICAgICB8fCAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUuZXZlcnkoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIF90aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0N1c3RvbUZpbGUoaXRlbSlcbiAgICAgICAgICAgICAgICB8fCAodHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gaW5zdGFuY2VvZiBGaWxlKVxuICAgICAgICAgICAgICAgIHx8ICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgICAgICAgICAgIHx8IF90aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihpdGVtKVxuICAgICAgICAgICAgICAgIHx8IF90aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShpdGVtKTsgfSkpKTtcbiAgICB9O1xuICAgIEZvcm1EYXRhQnVpbGRlci5wcm90b3R5cGUuYWRkRmlsZXNUb0ZEID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSwgdmFsdWUsIGZvcm1EYXRhSW5zdGFuY2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGFwcGVuZEZpbGVUb0ZEID0gZnVuY3Rpb24gKG9yaWdpbmFsS2V5LCBhdHRhY2htZW50LCBmb3JtRGF0YSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IG9yaWdpbmFsS2V5ID09PSAnbXVsdGlwbGVWYWxpZGF0aW9uRmlsZScgPyAnZmlsZScgOiBvcmlnaW5hbEtleTtcbiAgICAgICAgICAgIHZhciBvYmpEYXRhID0gX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyLmNvbnZlcnRUb0ZEZXhwZWN0ZWRTaGFwZShhdHRhY2htZW50KTtcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyLmdldEF0dGFjaG1lbnRJbmZvKGF0dGFjaG1lbnQpO1xuICAgICAgICAgICAgaWYgKF90aGlzLmlzRm9ybURhdGFQYWNrYWdlKGZvcm1EYXRhKSkge1xuICAgICAgICAgICAgICAgIHZhciBmZCA9IGZvcm1EYXRhO1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdHlwZW9mIG9iakRhdGEgPT09ICdzdHJpbmcnID8gQnVmZmVyLmZyb20ob2JqRGF0YSkgOiBvYmpEYXRhO1xuICAgICAgICAgICAgICAgIGZkLmFwcGVuZChrZXksIGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkKSB7IC8vIGVpdGhlciBub2RlID4gMTggb3IgYnJvd3NlclxuICAgICAgICAgICAgICAgIHZhciBicm93c2VyRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlOyAvLyBCcm93c2VyIGNvbXBsaWFudCBGb3JtRGF0YVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqRGF0YSA9PT0gJ3N0cmluZycgfHwgX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKG9iakRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBibG9iSW5zdGFuY2UgPSBuZXcgQmxvYihbb2JqRGF0YV0pO1xuICAgICAgICAgICAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgYmxvYkluc3RhbmNlLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob2JqRGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJvd3NlckZvcm1EYXRhLmFwcGVuZChrZXksIG9iakRhdGEsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0ob2JqRGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJsb2IgPSBfdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuZ2V0QmxvYkZyb21TdHJlYW0ob2JqRGF0YSwgb3B0aW9ucy5rbm93bkxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5zZXQoa2V5LCBibG9iLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgaXRlbSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgdmFsdWUsIGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBGb3JtRGF0YUJ1aWxkZXIucHJvdG90eXBlLmFkZENvbW1vblByb3BlcnR5VG9GRCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBmb3JtRGF0YUFjYykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgYWRkVmFsdWVCYXNlZE9uRkQgPSBmdW5jdGlvbiAoZmRLZXksIGZkVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YUFjYykpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZkVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignVGhlIHJlY2VpdmVkIHZhbHVlIGlzIGFuIG9iamVjdC4gXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKyAnXCJKU09OLlN0cmluZ2lmeVwiIHdpbGwgYmUgdXNlZCB0byBhdm9pZCBUeXBlRXJyb3IgXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKyAnVG8gcmVtb3ZlIHRoaXMgd2FybmluZzogXFxuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKyAnQ29uc2lkZXIgc3dpdGNoaW5nIHRvIGJ1aWx0LWluIEZvcm1EYXRhIG9yIGNvbnZlcnRpbmcgdGhlIHZhbHVlIG9uIHlvdXIgb3duLlxcbicpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBKU09OLnN0cmluZ2lmeShmZFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIGZkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmZFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIGZkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBCbG9iICE9PSB1bmRlZmluZWQgJiYgZmRWYWx1ZSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBmZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1Vua25vd24gdmFsdWUgdHlwZSBmb3IgRm9ybSBEYXRhLiBTdHJpbmcgb3IgQmxvYiBleHBlY3RlZCcsICdCcm93c2VyIGNvbXBsaWFudCBGb3JtRGF0YSBhbGxvd3Mgb25seSBzdHJpbmcgb3IgQmxvYiB2YWx1ZXMgZm9yIHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IGF0dGFjaG1lbnRzLicpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBhZGRWYWx1ZUJhc2VkT25GRChrZXksIGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgYWRkVmFsdWVCYXNlZE9uRkQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBGb3JtRGF0YUJ1aWxkZXI7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgRm9ybURhdGFCdWlsZGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbmNvbnN0IHt0b1N0cmluZ30gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3Qge2dldFByb3RvdHlwZU9mfSA9IE9iamVjdDtcbmNvbnN0IHtpdGVyYXRvciwgdG9TdHJpbmdUYWd9ID0gU3ltYm9sO1xuXG5jb25zdCBraW5kT2YgPSAoY2FjaGUgPT4gdGhpbmcgPT4ge1xuICAgIGNvbnN0IHN0ciA9IHRvU3RyaW5nLmNhbGwodGhpbmcpO1xuICAgIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5jb25zdCBraW5kT2ZUZXN0ID0gKHR5cGUpID0+IHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuICh0aGluZykgPT4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZVxufVxuXG5jb25zdCB0eXBlT2ZUZXN0ID0gdHlwZSA9PiB0aGluZyA9PiB0eXBlb2YgdGhpbmcgPT09IHR5cGU7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCB7aXNBcnJheX0gPSBBcnJheTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VuZGVmaW5lZCA9IHR5cGVPZlRlc3QoJ3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIGlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKSAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0FycmF5QnVmZmVyID0ga2luZE9mVGVzdCgnQXJyYXlCdWZmZXInKTtcblxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIGxldCByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKGlzQXJyYXlCdWZmZXIodmFsLmJ1ZmZlcikpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJpbmcgPSB0eXBlT2ZUZXN0KCdzdHJpbmcnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Z1bmN0aW9uID0gdHlwZU9mVGVzdCgnZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc051bWJlciA9IHR5cGVPZlRlc3QoJ251bWJlcicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgIT09IG51bGwgJiYgdHlwZW9mIHRoaW5nID09PSAnb2JqZWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJvb2xlYW5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJvb2xlYW4sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jvb2xlYW4gPSB0aGluZyA9PiB0aGluZyA9PT0gdHJ1ZSB8fCB0aGluZyA9PT0gZmFsc2U7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgaWYgKGtpbmRPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiAocHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKSA9PT0gbnVsbCkgJiYgISh0b1N0cmluZ1RhZyBpbiB2YWwpICYmICEoaXRlcmF0b3IgaW4gdmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBlbXB0eSBvYmplY3QgKHNhZmVseSBoYW5kbGVzIEJ1ZmZlcnMpXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBlbXB0eSBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0VtcHR5T2JqZWN0ID0gKHZhbCkgPT4ge1xuICAvLyBFYXJseSByZXR1cm4gZm9yIG5vbi1vYmplY3RzIG9yIEJ1ZmZlcnMgdG8gcHJldmVudCBSYW5nZUVycm9yXG4gIGlmICghaXNPYmplY3QodmFsKSB8fCBpc0J1ZmZlcih2YWwpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5sZW5ndGggPT09IDAgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCkgPT09IE9iamVjdC5wcm90b3R5cGU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBGYWxsYmFjayBmb3IgYW55IG90aGVyIG9iamVjdHMgdGhhdCBtaWdodCBjYXVzZSBSYW5nZUVycm9yIHdpdGggT2JqZWN0LmtleXMoKVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNEYXRlID0ga2luZE9mVGVzdCgnRGF0ZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCbG9iID0ga2luZE9mVGVzdCgnQmxvYicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZUxpc3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZUxpc3QgPSBraW5kT2ZUZXN0KCdGaWxlTGlzdCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyZWFtID0gKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGb3JtRGF0YSA9ICh0aGluZykgPT4ge1xuICBsZXQga2luZDtcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8IChcbiAgICAgIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiAoXG4gICAgICAgIChraW5kID0ga2luZE9mKHRoaW5nKSkgPT09ICdmb3JtZGF0YScgfHxcbiAgICAgICAgLy8gZGV0ZWN0IGZvcm0tZGF0YSBpbnN0YW5jZVxuICAgICAgICAoa2luZCA9PT0gJ29iamVjdCcgJiYgaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgRm9ybURhdGFdJylcbiAgICAgIClcbiAgICApXG4gIClcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbmNvbnN0IFtpc1JlYWRhYmxlU3RyZWFtLCBpc1JlcXVlc3QsIGlzUmVzcG9uc2UsIGlzSGVhZGVyc10gPSBbJ1JlYWRhYmxlU3RyZWFtJywgJ1JlcXVlc3QnLCAnUmVzcG9uc2UnLCAnSGVhZGVycyddLm1hcChraW5kT2ZUZXN0KTtcblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuY29uc3QgdHJpbSA9IChzdHIpID0+IHN0ci50cmltID9cbiAgc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5cyA9IGZhbHNlXVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuLCB7YWxsT3duS2V5cyA9IGZhbHNlfSA9IHt9KSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGk7XG4gIGxldCBsO1xuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yIChpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBCdWZmZXIgY2hlY2tcbiAgICBpZiAoaXNCdWZmZXIob2JqKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBpZiAoaXNCdWZmZXIob2JqKSl7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpXG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIGNvbnN0IHtjYXNlbGVzcywgc2tpcFVuZGVmaW5lZH0gPSBpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEtleSA9IGNhc2VsZXNzICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXNraXBVbmRlZmluZWQgfHwgIWlzVW5kZWZpbmVkKHZhbCkpIHtcbiAgICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgYXJndW1lbnRzW2ldICYmIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FsbE93bktleXNdXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmNvbnN0IGV4dGVuZCA9IChhLCBiLCB0aGlzQXJnLCB7YWxsT3duS2V5c309IHt9KSA9PiB7XG4gIGZvckVhY2goYiwgKHZhbCwga2V5KSA9PiB7XG4gICAgaWYgKHRoaXNBcmcgJiYgaXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0sIHthbGxPd25LZXlzfSk7XG4gIHJldHVybiBhO1xufVxuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5jb25zdCBzdHJpcEJPTSA9IChjb250ZW50KSA9PiB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ29uc3RydWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcHJvcHNdXG4gKiBAcGFyYW0ge29iamVjdH0gW2Rlc2NyaXB0b3JzXVxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBpbmhlcml0cyA9IChjb25zdHJ1Y3Rvciwgc3VwZXJDb25zdHJ1Y3RvciwgcHJvcHMsIGRlc2NyaXB0b3JzKSA9PiB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKTtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3RvciwgJ3N1cGVyJywge1xuICAgIHZhbHVlOiBzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZVxuICB9KTtcbiAgcHJvcHMgJiYgT2JqZWN0LmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BzKTtcbn1cblxuLyoqXG4gKiBSZXNvbHZlIG9iamVjdCB3aXRoIGRlZXAgcHJvdG90eXBlIGNoYWluIHRvIGEgZmxhdCBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2VPYmogc291cmNlIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IFtkZXN0T2JqXVxuICogQHBhcmFtIHtGdW5jdGlvbnxCb29sZWFufSBbZmlsdGVyXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Byb3BGaWx0ZXJdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuY29uc3QgdG9GbGF0T2JqZWN0ID0gKHNvdXJjZU9iaiwgZGVzdE9iaiwgZmlsdGVyLCBwcm9wRmlsdGVyKSA9PiB7XG4gIGxldCBwcm9wcztcbiAgbGV0IGk7XG4gIGxldCBwcm9wO1xuICBjb25zdCBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIGlmIChzb3VyY2VPYmogPT0gbnVsbCkgcmV0dXJuIGRlc3RPYmo7XG5cbiAgZG8ge1xuICAgIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlT2JqKTtcbiAgICBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICBwcm9wID0gcHJvcHNbaV07XG4gICAgICBpZiAoKCFwcm9wRmlsdGVyIHx8IHByb3BGaWx0ZXIocHJvcCwgc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgIW1lcmdlZFtwcm9wXSkge1xuICAgICAgICBkZXN0T2JqW3Byb3BdID0gc291cmNlT2JqW3Byb3BdO1xuICAgICAgICBtZXJnZWRbcHJvcF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBzb3VyY2VPYmogPSBmaWx0ZXIgIT09IGZhbHNlICYmIGdldFByb3RvdHlwZU9mKHNvdXJjZU9iaik7XG4gIH0gd2hpbGUgKHNvdXJjZU9iaiAmJiAoIWZpbHRlciB8fCBmaWx0ZXIoc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgc291cmNlT2JqICE9PSBPYmplY3QucHJvdG90eXBlKTtcblxuICByZXR1cm4gZGVzdE9iajtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcG9zaXRpb249IDBdXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGVuZHNXaXRoID0gKHN0ciwgc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT4ge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcG9zaXRpb24gPiBzdHIubGVuZ3RoKSB7XG4gICAgcG9zaXRpb24gPSBzdHIubGVuZ3RoO1xuICB9XG4gIHBvc2l0aW9uIC09IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gIGNvbnN0IGxhc3RJbmRleCA9IHN0ci5pbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pO1xuICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvc2l0aW9uO1xufVxuXG5cbi8qKlxuICogUmV0dXJucyBuZXcgYXJyYXkgZnJvbSBhcnJheSBsaWtlIG9iamVjdCBvciBudWxsIGlmIGZhaWxlZFxuICpcbiAqIEBwYXJhbSB7Kn0gW3RoaW5nXVxuICpcbiAqIEByZXR1cm5zIHs/QXJyYXl9XG4gKi9cbmNvbnN0IHRvQXJyYXkgPSAodGhpbmcpID0+IHtcbiAgaWYgKCF0aGluZykgcmV0dXJuIG51bGw7XG4gIGlmIChpc0FycmF5KHRoaW5nKSkgcmV0dXJuIHRoaW5nO1xuICBsZXQgaSA9IHRoaW5nLmxlbmd0aDtcbiAgaWYgKCFpc051bWJlcihpKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGFyciA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBhcnJbaV0gPSB0aGluZ1tpXTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG4vKipcbiAqIENoZWNraW5nIGlmIHRoZSBVaW50OEFycmF5IGV4aXN0cyBhbmQgaWYgaXQgZG9lcywgaXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZVxuICogdGhpbmcgcGFzc2VkIGluIGlzIGFuIGluc3RhbmNlIG9mIFVpbnQ4QXJyYXlcbiAqXG4gKiBAcGFyYW0ge1R5cGVkQXJyYXl9XG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuY29uc3QgaXNUeXBlZEFycmF5ID0gKFR5cGVkQXJyYXkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gdGhpbmcgPT4ge1xuICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgfTtcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBnZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSk7XG5cbi8qKlxuICogRm9yIGVhY2ggZW50cnkgaW4gdGhlIG9iamVjdCwgY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCB0aGUga2V5IGFuZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBlbnRyeS5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgZm9yRWFjaEVudHJ5ID0gKG9iaiwgZm4pID0+IHtcbiAgY29uc3QgZ2VuZXJhdG9yID0gb2JqICYmIG9ialtpdGVyYXRvcl07XG5cbiAgY29uc3QgX2l0ZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwob2JqKTtcblxuICBsZXQgcmVzdWx0O1xuXG4gIHdoaWxlICgocmVzdWx0ID0gX2l0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG4gICAgY29uc3QgcGFpciA9IHJlc3VsdC52YWx1ZTtcbiAgICBmbi5jYWxsKG9iaiwgcGFpclswXSwgcGFpclsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhbmQgYSBzdHJpbmcsIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIGFsbCB0aGUgbWF0Y2hlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWdFeHAgLSBUaGUgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIGFnYWluc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBzZWFyY2guXG4gKlxuICogQHJldHVybnMge0FycmF5PGJvb2xlYW4+fVxuICovXG5jb25zdCBtYXRjaEFsbCA9IChyZWdFeHAsIHN0cikgPT4ge1xuICBsZXQgbWF0Y2hlcztcbiAgY29uc3QgYXJyID0gW107XG5cbiAgd2hpbGUgKChtYXRjaGVzID0gcmVnRXhwLmV4ZWMoc3RyKSkgIT09IG51bGwpIHtcbiAgICBhcnIucHVzaChtYXRjaGVzKTtcbiAgfVxuXG4gIHJldHVybiBhcnI7XG59XG5cbi8qIENoZWNraW5nIGlmIHRoZSBraW5kT2ZUZXN0IGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB3aGVuIHBhc3NlZCBhbiBIVE1MRm9ybUVsZW1lbnQuICovXG5jb25zdCBpc0hUTUxGb3JtID0ga2luZE9mVGVzdCgnSFRNTEZvcm1FbGVtZW50Jyk7XG5cbmNvbnN0IHRvQ2FtZWxDYXNlID0gc3RyID0+IHtcbiAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1stX1xcc10oW2EtelxcZF0pKFxcdyopL2csXG4gICAgZnVuY3Rpb24gcmVwbGFjZXIobSwgcDEsIHAyKSB7XG4gICAgICByZXR1cm4gcDEudG9VcHBlckNhc2UoKSArIHAyO1xuICAgIH1cbiAgKTtcbn07XG5cbi8qIENyZWF0aW5nIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBwcm9wZXJ0eS4gKi9cbmNvbnN0IGhhc093blByb3BlcnR5ID0gKCh7aGFzT3duUHJvcGVydHl9KSA9PiAob2JqLCBwcm9wKSA9PiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpKE9iamVjdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNSZWdFeHAgPSBraW5kT2ZUZXN0KCdSZWdFeHAnKTtcblxuY29uc3QgcmVkdWNlRGVzY3JpcHRvcnMgPSAob2JqLCByZWR1Y2VyKSA9PiB7XG4gIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKTtcbiAgY29uc3QgcmVkdWNlZERlc2NyaXB0b3JzID0ge307XG5cbiAgZm9yRWFjaChkZXNjcmlwdG9ycywgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICBsZXQgcmV0O1xuICAgIGlmICgocmV0ID0gcmVkdWNlcihkZXNjcmlwdG9yLCBuYW1lLCBvYmopKSAhPT0gZmFsc2UpIHtcbiAgICAgIHJlZHVjZWREZXNjcmlwdG9yc1tuYW1lXSA9IHJldCB8fCBkZXNjcmlwdG9yO1xuICAgIH1cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMob2JqLCByZWR1Y2VkRGVzY3JpcHRvcnMpO1xufVxuXG4vKipcbiAqIE1ha2VzIGFsbCBtZXRob2RzIHJlYWQtb25seVxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICovXG5cbmNvbnN0IGZyZWV6ZU1ldGhvZHMgPSAob2JqKSA9PiB7XG4gIHJlZHVjZURlc2NyaXB0b3JzKG9iaiwgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICAvLyBza2lwIHJlc3RyaWN0ZWQgcHJvcHMgaW4gc3RyaWN0IG1vZGVcbiAgICBpZiAoaXNGdW5jdGlvbihvYmopICYmIFsnYXJndW1lbnRzJywgJ2NhbGxlcicsICdjYWxsZWUnXS5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gb2JqW25hbWVdO1xuXG4gICAgaWYgKCFpc0Z1bmN0aW9uKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZmFsc2U7XG5cbiAgICBpZiAoJ3dyaXRhYmxlJyBpbiBkZXNjcmlwdG9yKSB7XG4gICAgICBkZXNjcmlwdG9yLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFkZXNjcmlwdG9yLnNldCkge1xuICAgICAgZGVzY3JpcHRvci5zZXQgPSAoKSA9PiB7XG4gICAgICAgIHRocm93IEVycm9yKCdDYW4gbm90IHJld3JpdGUgcmVhZC1vbmx5IG1ldGhvZCBcXCcnICsgbmFtZSArICdcXCcnKTtcbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3QgdG9PYmplY3RTZXQgPSAoYXJyYXlPclN0cmluZywgZGVsaW1pdGVyKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuXG4gIGNvbnN0IGRlZmluZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBvYmpbdmFsdWVdID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzQXJyYXkoYXJyYXlPclN0cmluZykgPyBkZWZpbmUoYXJyYXlPclN0cmluZykgOiBkZWZpbmUoU3RyaW5nKGFycmF5T3JTdHJpbmcpLnNwbGl0KGRlbGltaXRlcikpO1xuXG4gIHJldHVybiBvYmo7XG59XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fVxuXG5jb25zdCB0b0Zpbml0ZU51bWJlciA9ICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSA9PiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSA9ICt2YWx1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbn1cblxuXG5cbi8qKlxuICogSWYgdGhlIHRoaW5nIGlzIGEgRm9ybURhdGEgb2JqZWN0LCByZXR1cm4gdHJ1ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IHRoaW5nIC0gVGhlIHRoaW5nIHRvIGNoZWNrLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1NwZWNDb21wbGlhbnRGb3JtKHRoaW5nKSB7XG4gIHJldHVybiAhISh0aGluZyAmJiBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiYgdGhpbmdbdG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW2l0ZXJhdG9yXSk7XG59XG5cbmNvbnN0IHRvSlNPTk9iamVjdCA9IChvYmopID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgQXJyYXkoMTApO1xuXG4gIGNvbnN0IHZpc2l0ID0gKHNvdXJjZSwgaSkgPT4ge1xuXG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKHNvdXJjZSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vQnVmZmVyIGNoZWNrXG4gICAgICBpZiAoaXNCdWZmZXIoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn1cblxuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG5jb25zdCBpc1RoZW5hYmxlID0gKHRoaW5nKSA9PlxuICB0aGluZyAmJiAoaXNPYmplY3QodGhpbmcpIHx8IGlzRnVuY3Rpb24odGhpbmcpKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRoZW4pICYmIGlzRnVuY3Rpb24odGhpbmcuY2F0Y2gpO1xuXG4vLyBvcmlnaW5hbCBjb2RlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vRGlnaXRhbEJyYWluSlMvQXhpb3NQcm9taXNlL2Jsb2IvMTZkZWFiMTM3MTBlYzA5Nzc5OTIyMTMxZjNmYTU5NTQzMjBmODNhYi9saWIvdXRpbHMuanMjTDExLUwzNFxuXG5jb25zdCBfc2V0SW1tZWRpYXRlID0gKChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQsIHBvc3RNZXNzYWdlU3VwcG9ydGVkKSA9PiB7XG4gIGlmIChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gc2V0SW1tZWRpYXRlO1xuICB9XG5cbiAgcmV0dXJuIHBvc3RNZXNzYWdlU3VwcG9ydGVkID8gKCh0b2tlbiwgY2FsbGJhY2tzKSA9PiB7XG4gICAgX2dsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoe3NvdXJjZSwgZGF0YX0pID0+IHtcbiAgICAgIGlmIChzb3VyY2UgPT09IF9nbG9iYWwgJiYgZGF0YSA9PT0gdG9rZW4pIHtcbiAgICAgICAgY2FsbGJhY2tzLmxlbmd0aCAmJiBjYWxsYmFja3Muc2hpZnQoKSgpO1xuICAgICAgfVxuICAgIH0sIGZhbHNlKTtcblxuICAgIHJldHVybiAoY2IpID0+IHtcbiAgICAgIGNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgIF9nbG9iYWwucG9zdE1lc3NhZ2UodG9rZW4sIFwiKlwiKTtcbiAgICB9XG4gIH0pKGBheGlvc0Ake01hdGgucmFuZG9tKCl9YCwgW10pIDogKGNiKSA9PiBzZXRUaW1lb3V0KGNiKTtcbn0pKFxuICB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nLFxuICBpc0Z1bmN0aW9uKF9nbG9iYWwucG9zdE1lc3NhZ2UpXG4pO1xuXG5jb25zdCBhc2FwID0gdHlwZW9mIHF1ZXVlTWljcm90YXNrICE9PSAndW5kZWZpbmVkJyA/XG4gIHF1ZXVlTWljcm90YXNrLmJpbmQoX2dsb2JhbCkgOiAoIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLm5leHRUaWNrIHx8IF9zZXRJbW1lZGlhdGUpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKipcblxuXG5jb25zdCBpc0l0ZXJhYmxlID0gKHRoaW5nKSA9PiB0aGluZyAhPSBudWxsICYmIGlzRnVuY3Rpb24odGhpbmdbaXRlcmF0b3JdKTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc0VtcHR5T2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgaXNTcGVjQ29tcGxpYW50Rm9ybSxcbiAgdG9KU09OT2JqZWN0LFxuICBpc0FzeW5jRm4sXG4gIGlzVGhlbmFibGUsXG4gIHNldEltbWVkaWF0ZTogX3NldEltbWVkaWF0ZSxcbiAgYXNhcCxcbiAgaXNJdGVyYWJsZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrO1xuICB9XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICBpZiAocmVzcG9uc2UpIHtcbiAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgdGhpcy5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXMgPyByZXNwb25zZS5zdGF0dXMgOiBudWxsO1xuICB9XG59XG5cbnV0aWxzLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHV0aWxzLnRvSlNPTk9iamVjdCh0aGlzLmNvbmZpZyksXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzXG4gICAgfTtcbiAgfVxufSk7XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zRXJyb3IucHJvdG90eXBlO1xuY29uc3QgZGVzY3JpcHRvcnMgPSB7fTtcblxuW1xuICAnRVJSX0JBRF9PUFRJT05fVkFMVUUnLFxuICAnRVJSX0JBRF9PUFRJT04nLFxuICAnRUNPTk5BQk9SVEVEJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFUlJfTkVUV09SSycsXG4gICdFUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTJyxcbiAgJ0VSUl9ERVBSRUNBVEVEJyxcbiAgJ0VSUl9CQURfUkVTUE9OU0UnLFxuICAnRVJSX0JBRF9SRVFVRVNUJyxcbiAgJ0VSUl9DQU5DRUxFRCcsXG4gICdFUlJfTk9UX1NVUFBPUlQnLFxuICAnRVJSX0lOVkFMSURfVVJMJ1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbl0uZm9yRWFjaChjb2RlID0+IHtcbiAgZGVzY3JpcHRvcnNbY29kZV0gPSB7dmFsdWU6IGNvZGV9O1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEF4aW9zRXJyb3IsIGRlc2NyaXB0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IChlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpID0+IHtcbiAgY29uc3QgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcblxuICB1dGlscy50b0ZsYXRPYmplY3QoZXJyb3IsIGF4aW9zRXJyb3IsIGZ1bmN0aW9uIGZpbHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBFcnJvci5wcm90b3R5cGU7XG4gIH0sIHByb3AgPT4ge1xuICAgIHJldHVybiBwcm9wICE9PSAnaXNBeGlvc0Vycm9yJztcbiAgfSk7XG5cbiAgY29uc3QgbXNnID0gZXJyb3IgJiYgZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiAnRXJyb3InO1xuXG4gIC8vIFByZWZlciBleHBsaWNpdCBjb2RlOyBvdGhlcndpc2UgY29weSB0aGUgbG93LWxldmVsIGVycm9yJ3MgY29kZSAoZS5nLiBFQ09OTlJFRlVTRUQpXG4gIGNvbnN0IGVyckNvZGUgPSBjb2RlID09IG51bGwgJiYgZXJyb3IgPyBlcnJvci5jb2RlIDogY29kZTtcbiAgQXhpb3NFcnJvci5jYWxsKGF4aW9zRXJyb3IsIG1zZywgZXJyQ29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG5cbiAgLy8gQ2hhaW4gdGhlIG9yaWdpbmFsIGVycm9yIG9uIHRoZSBzdGFuZGFyZCBmaWVsZDsgbm9uLWVudW1lcmFibGUgdG8gYXZvaWQgSlNPTiBub2lzZVxuICBpZiAoZXJyb3IgJiYgYXhpb3NFcnJvci5jYXVzZSA9PSBudWxsKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGF4aW9zRXJyb3IsICdjYXVzZScsIHsgdmFsdWU6IGVycm9yLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gIH1cblxuICBheGlvc0Vycm9yLm5hbWUgPSAoZXJyb3IgJiYgZXJyb3IubmFtZSkgfHwgJ0Vycm9yJztcblxuICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcblxuICByZXR1cm4gYXhpb3NFcnJvcjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zRXJyb3I7XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG5leHBvcnQgZGVmYXVsdCBudWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbi8vIHRlbXBvcmFyeSBob3RmaXggdG8gYXZvaWQgY2lyY3VsYXIgcmVmZXJlbmNlcyB1bnRpbCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBpcyByZWZhY3RvcmVkXG5pbXBvcnQgUGxhdGZvcm1Gb3JtRGF0YSBmcm9tICcuLi9wbGF0Zm9ybS9ub2RlL2NsYXNzZXMvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzLmlzUGxhaW5PYmplY3QodGhpbmcpIHx8IHV0aWxzLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscy5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aC5jb25jYXQoa2V5KS5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRva2VuID0gcmVtb3ZlQnJhY2tldHModG9rZW4pO1xuICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgfSkuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkoYXJyKSAmJiAhYXJyLnNvbWUoaXNWaXNpdGFibGUpO1xufVxuXG5jb25zdCBwcmVkaWNhdGVzID0gdXRpbHMudG9GbGF0T2JqZWN0KHV0aWxzLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IChQbGF0Zm9ybUZvcm1EYXRhIHx8IEZvcm1EYXRhKSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBvcHRpb25zID0gdXRpbHMudG9GbGF0T2JqZWN0KG9wdGlvbnMsIHtcbiAgICBtZXRhVG9rZW5zOiB0cnVlLFxuICAgIGRvdHM6IGZhbHNlLFxuICAgIGluZGV4ZXM6IGZhbHNlXG4gIH0sIGZhbHNlLCBmdW5jdGlvbiBkZWZpbmVkKG9wdGlvbiwgc291cmNlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gICAgcmV0dXJuICF1dGlscy5pc1VuZGVmaW5lZChzb3VyY2Vbb3B0aW9uXSk7XG4gIH0pO1xuXG4gIGNvbnN0IG1ldGFUb2tlbnMgPSBvcHRpb25zLm1ldGFUb2tlbnM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICBjb25zdCB2aXNpdG9yID0gb3B0aW9ucy52aXNpdG9yIHx8IGRlZmF1bHRWaXNpdG9yO1xuICBjb25zdCBkb3RzID0gb3B0aW9ucy5kb3RzO1xuICBjb25zdCBpbmRleGVzID0gb3B0aW9ucy5pbmRleGVzO1xuICBjb25zdCBfQmxvYiA9IG9wdGlvbnMuQmxvYiB8fCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgQmxvYjtcbiAgY29uc3QgdXNlQmxvYiA9IF9CbG9iICYmIHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oZm9ybURhdGEpO1xuXG4gIGlmICghdXRpbHMuaXNGdW5jdGlvbih2aXNpdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3Zpc2l0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNCb29sZWFuKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VCbG9iICYmIHV0aWxzLmlzQmxvYih2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdCbG9iIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBhIEJ1ZmZlciBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscy5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdXNlQmxvYiAmJiB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBCbG9iKFt2YWx1ZV0pIDogQnVmZmVyLmZyb20odmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZpc2l0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBrZXlcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmd8TnVtYmVyPn0gcGF0aFxuICAgKiBAdGhpcyB7Rm9ybURhdGF9XG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm4gdHJ1ZSB0byB2aXNpdCB0aGUgZWFjaCBwcm9wIG9mIHRoZSB2YWx1ZSByZWN1cnNpdmVseVxuICAgKi9cbiAgZnVuY3Rpb24gZGVmYXVsdFZpc2l0b3IodmFsdWUsIGtleSwgcGF0aCkge1xuICAgIGxldCBhcnIgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSAmJiAhcGF0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAne30nKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gbWV0YVRva2VucyA/IGtleSA6IGtleS5zbGljZSgwLCAtMik7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh1dGlscy5pc0FycmF5KHZhbHVlKSAmJiBpc0ZsYXRBcnJheSh2YWx1ZSkpIHx8XG4gICAgICAgICgodXRpbHMuaXNGaWxlTGlzdCh2YWx1ZSkgfHwgdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSkgJiYgKGFyciA9IHV0aWxzLnRvQXJyYXkodmFsdWUpKVxuICAgICAgICApKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSByZW1vdmVCcmFja2V0cyhrZXkpO1xuXG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIGVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgICAgISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgICAgICAgICAgaW5kZXhlcyA9PT0gdHJ1ZSA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpIDogKGluZGV4ZXMgPT09IG51bGwgPyBrZXkgOiBrZXkgKyAnW10nKSxcbiAgICAgICAgICAgIGNvbnZlcnRWYWx1ZShlbClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkKHZhbHVlLCBwYXRoKSB7XG4gICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGF0aC5qb2luKCcuJykpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgdmlzaXRvci5jYWxsKFxuICAgICAgICBmb3JtRGF0YSwgZWwsIHV0aWxzLmlzU3RyaW5nKGtleSkgPyBrZXkudHJpbSgpIDoga2V5LCBwYXRoLCBleHBvc2VkSGVscGVyc1xuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBidWlsZChlbCwgcGF0aCA/IHBhdGguY29uY2F0KGtleSkgOiBba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdGFjay5wb3AoKTtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIGJ1aWxkKG9iaik7XG5cbiAgcmV0dXJuIGZvcm1EYXRhO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b0Zvcm1EYXRhO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL3RvRm9ybURhdGEuanMnO1xuXG4vKipcbiAqIEl0IGVuY29kZXMgYSBzdHJpbmcgYnkgcmVwbGFjaW5nIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBpbiB0aGUgdW5yZXNlcnZlZCBzZXQgd2l0aFxuICogdGhlaXIgcGVyY2VudC1lbmNvZGVkIGVxdWl2YWxlbnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gZW5jb2RlLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHN0cikge1xuICBjb25zdCBjaGFyTWFwID0ge1xuICAgICchJzogJyUyMScsXG4gICAgXCInXCI6ICclMjcnLFxuICAgICcoJzogJyUyOCcsXG4gICAgJyknOiAnJTI5JyxcbiAgICAnfic6ICclN0UnLFxuICAgICclMjAnOiAnKycsXG4gICAgJyUwMCc6ICdcXHgwMCdcbiAgfTtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpfl18JTIwfCUwMC9nLCBmdW5jdGlvbiByZXBsYWNlcihtYXRjaCkge1xuICAgIHJldHVybiBjaGFyTWFwW21hdGNoXTtcbiAgfSk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXJhbXMgb2JqZWN0IGFuZCBjb252ZXJ0cyBpdCB0byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgdG8gYmUgY29udmVydGVkIHRvIGEgRm9ybURhdGEgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZCB0byB0aGUgQXhpb3MgY29uc3RydWN0b3IuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykge1xuICB0aGlzLl9wYWlycyA9IFtdO1xuXG4gIHBhcmFtcyAmJiB0b0Zvcm1EYXRhKHBhcmFtcywgdGhpcywgb3B0aW9ucyk7XG59XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZTtcblxucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICB0aGlzLl9wYWlycy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xufTtcblxucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoZW5jb2Rlcikge1xuICBjb25zdCBfZW5jb2RlID0gZW5jb2RlciA/IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGVuY29kZXIuY2FsbCh0aGlzLCB2YWx1ZSwgZW5jb2RlKTtcbiAgfSA6IGVuY29kZTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnMubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgIHJldHVybiBfZW5jb2RlKHBhaXJbMF0pICsgJz0nICsgX2VuY29kZShwYWlyWzFdKTtcbiAgfSwgJycpLmpvaW4oJyYnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuXG4vKipcbiAqIEl0IHJlcGxhY2VzIGFsbCBpbnN0YW5jZXMgb2YgdGhlIGNoYXJhY3RlcnMgYDpgLCBgJGAsIGAsYCwgYCtgLCBgW2AsIGFuZCBgXWAgd2l0aCB0aGVpclxuICogVVJJIGVuY29kZWQgY291bnRlcnBhcnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCBUaGUgdmFsdWUgdG8gYmUgZW5jb2RlZC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcGFyYW0gez8ob2JqZWN0fEZ1bmN0aW9uKX0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBvcHRpb25zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgXG4gIGNvbnN0IF9lbmNvZGUgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5jb2RlIHx8IGVuY29kZTtcblxuICBpZiAodXRpbHMuaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBzZXJpYWxpemU6IG9wdGlvbnNcbiAgICB9O1xuICB9IFxuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmNlcHRvciB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICBmbihoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbFxuIiwiaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICcuL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzJ1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJy4vY2xhc3Nlcy9Gb3JtRGF0YS5qcydcbmltcG9ydCBCbG9iIGZyb20gJy4vY2xhc3Nlcy9CbG9iLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtcyxcbiAgICBGb3JtRGF0YSxcbiAgICBCbG9iXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXG59O1xuIiwiY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmNvbnN0IF9uYXZpZ2F0b3IgPSB0eXBlb2YgbmF2aWdhdG9yID09PSAnb2JqZWN0JyAmJiBuYXZpZ2F0b3IgfHwgdW5kZWZpbmVkO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyRW52ID0gaGFzQnJvd3NlckVudiAmJlxuICAoIV9uYXZpZ2F0b3IgfHwgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKF9uYXZpZ2F0b3IucHJvZHVjdCkgPCAwKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgd2ViV29ya2VyIGVudmlyb25tZW50XG4gKlxuICogQWx0aG91Z2ggdGhlIGBpc1N0YW5kYXJkQnJvd3NlckVudmAgbWV0aG9kIGluZGljYXRlcyB0aGF0XG4gKiBgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXJgLCB0aGUgV2ViV29ya2VyIHdpbGwgc3RpbGwgYmVcbiAqIGZpbHRlcmVkIG91dCBkdWUgdG8gaXRzIGp1ZGdtZW50IHN0YW5kYXJkXG4gKiBgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ2AuXG4gKiBUaGlzIGxlYWRzIHRvIGEgcHJvYmxlbSB3aGVuIGF4aW9zIHBvc3QgYEZvcm1EYXRhYCBpbiB3ZWJXb3JrZXJcbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52ID0gKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlICYmXG4gICAgdHlwZW9mIHNlbGYuaW1wb3J0U2NyaXB0cyA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufSkoKTtcblxuY29uc3Qgb3JpZ2luID0gaGFzQnJvd3NlckVudiAmJiB3aW5kb3cubG9jYXRpb24uaHJlZiB8fCAnaHR0cDovL2xvY2FsaG9zdCc7XG5cbmV4cG9ydCB7XG4gIGhhc0Jyb3dzZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyRW52LFxuICBfbmF2aWdhdG9yIGFzIG5hdmlnYXRvcixcbiAgb3JpZ2luXG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi9ub2RlL2luZGV4LmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAuLi51dGlscyxcbiAgLi4ucGxhdGZvcm1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIHtcbiAgICB2aXNpdG9yOiBmdW5jdGlvbih2YWx1ZSwga2V5LCBwYXRoLCBoZWxwZXJzKSB7XG4gICAgICBpZiAocGxhdGZvcm0uaXNOb2RlICYmIHV0aWxzLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlbHBlcnMuZGVmYXVsdFZpc2l0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIC4uLm9wdGlvbnNcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcgbGlrZSBgZm9vW3hdW3ldW3pdYCBhbmQgcmV0dXJucyBhbiBhcnJheSBsaWtlIGBbJ2ZvbycsICd4JywgJ3knLCAneiddXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICpcbiAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHN0cmluZ3MuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlUHJvcFBhdGgobmFtZSkge1xuICAvLyBmb29beF1beV1bel1cbiAgLy8gZm9vLngueS56XG4gIC8vIGZvby14LXktelxuICAvLyBmb28geCB5IHpcbiAgcmV0dXJuIHV0aWxzLm1hdGNoQWxsKC9cXHcrfFxcWyhcXHcqKV0vZywgbmFtZSkubWFwKG1hdGNoID0+IHtcbiAgICByZXR1cm4gbWF0Y2hbMF0gPT09ICdbXScgPyAnJyA6IG1hdGNoWzFdIHx8IG1hdGNoWzBdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuIGFycmF5IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjb252ZXJ0IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBrZXlzIGFuZCB2YWx1ZXMgYXMgdGhlIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheVRvT2JqZWN0KGFycikge1xuICBjb25zdCBvYmogPSB7fTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XG4gIGxldCBpO1xuICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgbGV0IGtleTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAga2V5ID0ga2V5c1tpXTtcbiAgICBvYmpba2V5XSA9IGFycltrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBGb3JtRGF0YSBvYmplY3QgYW5kIHJldHVybnMgYSBKYXZhU2NyaXB0IG9iamVjdFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGNvbnZlcnQgdG8gSlNPTi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0PHN0cmluZywgYW55PiB8IG51bGx9IFRoZSBjb252ZXJ0ZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBmb3JtRGF0YVRvSlNPTihmb3JtRGF0YSkge1xuICBmdW5jdGlvbiBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldCwgaW5kZXgpIHtcbiAgICBsZXQgbmFtZSA9IHBhdGhbaW5kZXgrK107XG5cbiAgICBpZiAobmFtZSA9PT0gJ19fcHJvdG9fXycpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgaXNOdW1lcmljS2V5ID0gTnVtYmVyLmlzRmluaXRlKCtuYW1lKTtcbiAgICBjb25zdCBpc0xhc3QgPSBpbmRleCA+PSBwYXRoLmxlbmd0aDtcbiAgICBuYW1lID0gIW5hbWUgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0Lmxlbmd0aCA6IG5hbWU7XG5cbiAgICBpZiAoaXNMYXN0KSB7XG4gICAgICBpZiAodXRpbHMuaGFzT3duUHJvcCh0YXJnZXQsIG5hbWUpKSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IFt0YXJnZXRbbmFtZV0sIHZhbHVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldFtuYW1lXSB8fCAhdXRpbHMuaXNPYmplY3QodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gW107XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXRbbmFtZV0sIGluZGV4KTtcblxuICAgIGlmIChyZXN1bHQgJiYgdXRpbHMuaXNBcnJheSh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBhcnJheVRvT2JqZWN0KHRhcmdldFtuYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gIH1cblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShmb3JtRGF0YSkgJiYgdXRpbHMuaXNGdW5jdGlvbihmb3JtRGF0YS5lbnRyaWVzKSkge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuXG4gICAgdXRpbHMuZm9yRWFjaEVudHJ5KGZvcm1EYXRhLCAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGJ1aWxkUGF0aChwYXJzZVByb3BQYXRoKG5hbWUpLCB2YWx1ZSwgb2JqLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZm9ybURhdGFUb0pTT047XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4vdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4uL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgdG9VUkxFbmNvZGVkRm9ybSBmcm9tICcuLi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBmb3JtRGF0YVRvSlNPTiBmcm9tICcuLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZywgdHJpZXMgdG8gcGFyc2UgaXQsIGFuZCBpZiBpdCBmYWlscywgaXQgcmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvblxuICogb2YgdGhlIGlucHV0XG4gKlxuICogQHBhcmFtIHthbnl9IHJhd1ZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHN0cmluZ2lmaWVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyc2VyIC0gQSBmdW5jdGlvbiB0aGF0IHBhcnNlcyBhIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmNvZGVyIC0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIHJldHVybnMgYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSByYXdWYWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcbiAgaWYgKHV0aWxzLmlzU3RyaW5nKHJhd1ZhbHVlKSkge1xuICAgIHRyeSB7XG4gICAgICAocGFyc2VyIHx8IEpTT04ucGFyc2UpKHJhd1ZhbHVlKTtcbiAgICAgIHJldHVybiB1dGlscy50cmltKHJhd1ZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5uYW1lICE9PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChlbmNvZGVyIHx8IEpTT04uc3RyaW5naWZ5KShyYXdWYWx1ZSk7XG59XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuXG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogWyd4aHInLCAnaHR0cCcsICdmZXRjaCddLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSB8fCAnJztcbiAgICBjb25zdCBoYXNKU09OQ29udGVudFR5cGUgPSBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPiAtMTtcbiAgICBjb25zdCBpc09iamVjdFBheWxvYWQgPSB1dGlscy5pc09iamVjdChkYXRhKTtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgJiYgdXRpbHMuaXNIVE1MRm9ybShkYXRhKSkge1xuICAgICAgZGF0YSA9IG5ldyBGb3JtRGF0YShkYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0Zvcm1EYXRhID0gdXRpbHMuaXNGb3JtRGF0YShkYXRhKTtcblxuICAgIGlmIChpc0Zvcm1EYXRhKSB7XG4gICAgICByZXR1cm4gaGFzSlNPTkNvbnRlbnRUeXBlID8gSlNPTi5zdHJpbmdpZnkoZm9ybURhdGFUb0pTT04oZGF0YSkpIDogZGF0YTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JywgZmFsc2UpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBsZXQgaXNGaWxlTGlzdDtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQpIHtcbiAgICAgIGlmIChjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIHRoaXMuZm9ybVNlcmlhbGl6ZXIpLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICgoaXNGaWxlTGlzdCA9IHV0aWxzLmlzRmlsZUxpc3QoZGF0YSkpIHx8IGNvbnRlbnRUeXBlLmluZGV4T2YoJ211bHRpcGFydC9mb3JtLWRhdGEnKSA+IC0xKSB7XG4gICAgICAgIGNvbnN0IF9Gb3JtRGF0YSA9IHRoaXMuZW52ICYmIHRoaXMuZW52LkZvcm1EYXRhO1xuXG4gICAgICAgIHJldHVybiB0b0Zvcm1EYXRhKFxuICAgICAgICAgIGlzRmlsZUxpc3QgPyB7J2ZpbGVzW10nOiBkYXRhfSA6IGRhdGEsXG4gICAgICAgICAgX0Zvcm1EYXRhICYmIG5ldyBfRm9ybURhdGEoKSxcbiAgICAgICAgICB0aGlzLmZvcm1TZXJpYWxpemVyXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCB8fCBoYXNKU09OQ29udGVudFR5cGUgKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi9qc29uJywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHN0cmluZ2lmeVNhZmVseShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgY29uc3QgdHJhbnNpdGlvbmFsID0gdGhpcy50cmFuc2l0aW9uYWwgfHwgZGVmYXVsdHMudHJhbnNpdGlvbmFsO1xuICAgIGNvbnN0IGZvcmNlZEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5mb3JjZWRKU09OUGFyc2luZztcbiAgICBjb25zdCBKU09OUmVxdWVzdGVkID0gdGhpcy5yZXNwb25zZVR5cGUgPT09ICdqc29uJztcblxuICAgIGlmICh1dGlscy5pc1Jlc3BvbnNlKGRhdGEpIHx8IHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGlmIChkYXRhICYmIHV0aWxzLmlzU3RyaW5nKGRhdGEpICYmICgoZm9yY2VkSlNPTlBhcnNpbmcgJiYgIXRoaXMucmVzcG9uc2VUeXBlKSB8fCBKU09OUmVxdWVzdGVkKSkge1xuICAgICAgY29uc3Qgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgICAgY29uc3Qgc3RyaWN0SlNPTlBhcnNpbmcgPSAhc2lsZW50SlNPTlBhcnNpbmcgJiYgSlNPTlJlcXVlc3RlZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSwgdGhpcy5wYXJzZVJldml2ZXIpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscy50b09iamVjdFNldChbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCByYXdIZWFkZXJzID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiYgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBhcnNlSGVhZGVycyBmcm9tICcuLi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyc7XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcbiAgfVxuXG4gIGlmIChpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgICB2YWx1ZSA9IGhlYWRlcjtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc1JlZ0V4cChmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci50ZXN0KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKFthLXpcXGRdKShcXHcqKS9nLCAodywgY2hhciwgc3RyKSA9PiB7XG4gICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEFjY2Vzc29ycyhvYmosIGhlYWRlcikge1xuICBjb25zdCBhY2Nlc3Nvck5hbWUgPSB1dGlscy50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZigha2V5IHx8IHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8IF9yZXdyaXRlID09PSB0cnVlIHx8IChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpXG4gICAgfSBlbHNlIGlmKHV0aWxzLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdChoZWFkZXIpICYmIHV0aWxzLmlzSXRlcmFibGUoaGVhZGVyKSkge1xuICAgICAgbGV0IG9iaiA9IHt9LCBkZXN0LCBrZXk7XG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGhlYWRlcikge1xuICAgICAgICBpZiAoIXV0aWxzLmlzQXJyYXkoZW50cnkpKSB7XG4gICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdPYmplY3QgaXRlcmF0b3IgbXVzdCByZXR1cm4gYSBrZXktdmFsdWUgcGFpcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqW2tleSA9IGVudHJ5WzBdXSA9IChkZXN0ID0gb2JqW2tleV0pID9cbiAgICAgICAgICAodXRpbHMuaXNBcnJheShkZXN0KSA/IFsuLi5kZXN0LCBlbnRyeVsxXV0gOiBbZGVzdCwgZW50cnlbMV1dKSA6IGVudHJ5WzFdO1xuICAgICAgfVxuXG4gICAgICBzZXRIZWFkZXJzKG9iaiwgdmFsdWVPclJld3JpdGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgIGlmICghcGFyc2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZVRva2Vucyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIHJldHVybiAhIShrZXkgJiYgdGhpc1trZXldICE9PSB1bmRlZmluZWQgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVIZWFkZXIoX2hlYWRlcikge1xuICAgICAgX2hlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCAnKSA6IHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpLm1hcCgoW2hlYWRlciwgdmFsdWVdKSA9PiBoZWFkZXIgKyAnOiAnICsgdmFsdWUpLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0U2V0Q29va2llKCkge1xuICAgIHJldHVybiB0aGlzLmdldChcInNldC1jb29raWVcIikgfHwgW107XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdBeGlvc0hlYWRlcnMnO1xuICB9XG5cbiAgc3RhdGljIGZyb20odGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiB0aGlzID8gdGhpbmcgOiBuZXcgdGhpcyh0aGluZyk7XG4gIH1cblxuICBzdGF0aWMgY29uY2F0KGZpcnN0LCAuLi50YXJnZXRzKSB7XG4gICAgY29uc3QgY29tcHV0ZWQgPSBuZXcgdGhpcyhmaXJzdCk7XG5cbiAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4gY29tcHV0ZWQuc2V0KHRhcmdldCkpO1xuXG4gICAgcmV0dXJuIGNvbXB1dGVkO1xuICB9XG5cbiAgc3RhdGljIGFjY2Vzc29yKGhlYWRlcikge1xuICAgIGNvbnN0IGludGVybmFscyA9IHRoaXNbJGludGVybmFsc10gPSAodGhpc1skaW50ZXJuYWxzXSA9IHtcbiAgICAgIGFjY2Vzc29yczoge31cbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IGludGVybmFscy5hY2Nlc3NvcnM7XG4gICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWFjY2Vzc29yc1tsSGVhZGVyXSkge1xuICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xuICAgICAgICBhY2Nlc3NvcnNbbEhlYWRlcl0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzLmlzQXJyYXkoaGVhZGVyKSA/IGhlYWRlci5mb3JFYWNoKGRlZmluZUFjY2Vzc29yKSA6IGRlZmluZUFjY2Vzc29yKGhlYWRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5BeGlvc0hlYWRlcnMuYWNjZXNzb3IoWydDb250ZW50LVR5cGUnLCAnQ29udGVudC1MZW5ndGgnLCAnQWNjZXB0JywgJ0FjY2VwdC1FbmNvZGluZycsICdVc2VyLUFnZW50JywgJ0F1dGhvcml6YXRpb24nXSk7XG5cbi8vIHJlc2VydmVkIG5hbWVzIGhvdGZpeFxudXRpbHMucmVkdWNlRGVzY3JpcHRvcnMoQXhpb3NIZWFkZXJzLnByb3RvdHlwZSwgKHt2YWx1ZX0sIGtleSkgPT4ge1xuICBsZXQgbWFwcGVkID0ga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7IC8vIG1hcCBgc2V0YCA9PiBgU2V0YFxuICByZXR1cm4ge1xuICAgIGdldDogKCkgPT4gdmFsdWUsXG4gICAgc2V0KGhlYWRlclZhbHVlKSB7XG4gICAgICB0aGlzW21hcHBlZF0gPSBoZWFkZXJWYWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG51dGlscy5mcmVlemVNZXRob2RzKEF4aW9zSGVhZGVycyk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zSGVhZGVycztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzO1xuICBjb25zdCBjb250ZXh0ID0gcmVzcG9uc2UgfHwgY29uZmlnO1xuICBjb25zdCBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29udGV4dC5oZWFkZXJzKTtcbiAgbGV0IGRhdGEgPSBjb250ZXh0LmRhdGE7XG5cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdD19IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3Q9fSByZXF1ZXN0IFRoZSByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxlZEVycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIEF4aW9zRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlID09IG51bGwgPyAnY2FuY2VsZWQnIDogbWVzc2FnZSwgQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQsIGNvbmZpZywgcmVxdWVzdCk7XG4gIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbn1cblxudXRpbHMuaW5oZXJpdHMoQ2FuY2VsZWRFcnJvciwgQXhpb3NFcnJvciwge1xuICBfX0NBTkNFTF9fOiB0cnVlXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsZWRFcnJvcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9BeGlvc0Vycm9yLmpzJztcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZVByb3RvY29sKHVybCkge1xuICBjb25zdCBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDYWxjdWxhdGUgZGF0YSBtYXhSYXRlXG4gKiBAcGFyYW0ge051bWJlcn0gW3NhbXBsZXNDb3VudD0gMTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW21pbj0gMTAwMF1cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3BlZWRvbWV0ZXIoc2FtcGxlc0NvdW50LCBtaW4pIHtcbiAgc2FtcGxlc0NvdW50ID0gc2FtcGxlc0NvdW50IHx8IDEwO1xuICBjb25zdCBieXRlcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBjb25zdCB0aW1lc3RhbXBzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGxldCBoZWFkID0gMDtcbiAgbGV0IHRhaWwgPSAwO1xuICBsZXQgZmlyc3RTYW1wbGVUUztcblxuICBtaW4gPSBtaW4gIT09IHVuZGVmaW5lZCA/IG1pbiA6IDEwMDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHB1c2goY2h1bmtMZW5ndGgpIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3Qgc3RhcnRlZEF0ID0gdGltZXN0YW1wc1t0YWlsXTtcblxuICAgIGlmICghZmlyc3RTYW1wbGVUUykge1xuICAgICAgZmlyc3RTYW1wbGVUUyA9IG5vdztcbiAgICB9XG5cbiAgICBieXRlc1toZWFkXSA9IGNodW5rTGVuZ3RoO1xuICAgIHRpbWVzdGFtcHNbaGVhZF0gPSBub3c7XG5cbiAgICBsZXQgaSA9IHRhaWw7XG4gICAgbGV0IGJ5dGVzQ291bnQgPSAwO1xuXG4gICAgd2hpbGUgKGkgIT09IGhlYWQpIHtcbiAgICAgIGJ5dGVzQ291bnQgKz0gYnl0ZXNbaSsrXTtcbiAgICAgIGkgPSBpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGhlYWQgPSAoaGVhZCArIDEpICUgc2FtcGxlc0NvdW50O1xuXG4gICAgaWYgKGhlYWQgPT09IHRhaWwpIHtcbiAgICAgIHRhaWwgPSAodGFpbCArIDEpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGlmIChub3cgLSBmaXJzdFNhbXBsZVRTIDwgbWluKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFzc2VkID0gc3RhcnRlZEF0ICYmIG5vdyAtIHN0YXJ0ZWRBdDtcblxuICAgIHJldHVybiBwYXNzZWQgPyBNYXRoLnJvdW5kKGJ5dGVzQ291bnQgKiAxMDAwIC8gcGFzc2VkKSA6IHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3BlZWRvbWV0ZXI7XG4iLCIvKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGxldCB0aHJlc2hvbGQgPSAxMDAwIC8gZnJlcTtcbiAgbGV0IGxhc3RBcmdzO1xuICBsZXQgdGltZXI7XG5cbiAgY29uc3QgaW52b2tlID0gKGFyZ3MsIG5vdyA9IERhdGUubm93KCkpID0+IHtcbiAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgbGFzdEFyZ3MgPSBudWxsO1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICB9XG4gICAgZm4oLi4uYXJncyk7XG4gIH1cblxuICBjb25zdCB0aHJvdHRsZWQgPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcGFzc2VkID0gbm93IC0gdGltZXN0YW1wO1xuICAgIGlmICggcGFzc2VkID49IHRocmVzaG9sZCkge1xuICAgICAgaW52b2tlKGFyZ3MsIG5vdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RBcmdzID0gYXJncztcbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgaW52b2tlKGxhc3RBcmdzKVxuICAgICAgICB9LCB0aHJlc2hvbGQgLSBwYXNzZWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZsdXNoID0gKCkgPT4gbGFzdEFyZ3MgJiYgaW52b2tlKGxhc3RBcmdzKTtcblxuICByZXR1cm4gW3Rocm90dGxlZCwgZmx1c2hdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0aHJvdHRsZTtcbiIsImltcG9ydCBzcGVlZG9tZXRlciBmcm9tIFwiLi9zcGVlZG9tZXRlci5qc1wiO1xuaW1wb3J0IHRocm90dGxlIGZyb20gXCIuL3Rocm90dGxlLmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBwcm9ncmVzc0V2ZW50UmVkdWNlciA9IChsaXN0ZW5lciwgaXNEb3dubG9hZFN0cmVhbSwgZnJlcSA9IDMpID0+IHtcbiAgbGV0IGJ5dGVzTm90aWZpZWQgPSAwO1xuICBjb25zdCBfc3BlZWRvbWV0ZXIgPSBzcGVlZG9tZXRlcig1MCwgMjUwKTtcblxuICByZXR1cm4gdGhyb3R0bGUoZSA9PiB7XG4gICAgY29uc3QgbG9hZGVkID0gZS5sb2FkZWQ7XG4gICAgY29uc3QgdG90YWwgPSBlLmxlbmd0aENvbXB1dGFibGUgPyBlLnRvdGFsIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHByb2dyZXNzQnl0ZXMgPSBsb2FkZWQgLSBieXRlc05vdGlmaWVkO1xuICAgIGNvbnN0IHJhdGUgPSBfc3BlZWRvbWV0ZXIocHJvZ3Jlc3NCeXRlcyk7XG4gICAgY29uc3QgaW5SYW5nZSA9IGxvYWRlZCA8PSB0b3RhbDtcblxuICAgIGJ5dGVzTm90aWZpZWQgPSBsb2FkZWQ7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbG9hZGVkLFxuICAgICAgdG90YWwsXG4gICAgICBwcm9ncmVzczogdG90YWwgPyAobG9hZGVkIC8gdG90YWwpIDogdW5kZWZpbmVkLFxuICAgICAgYnl0ZXM6IHByb2dyZXNzQnl0ZXMsXG4gICAgICByYXRlOiByYXRlID8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCAmJiBpblJhbmdlID8gKHRvdGFsIC0gbG9hZGVkKSAvIHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBldmVudDogZSxcbiAgICAgIGxlbmd0aENvbXB1dGFibGU6IHRvdGFsICE9IG51bGwsXG4gICAgICBbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ106IHRydWVcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufVxuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudERlY29yYXRvciA9ICh0b3RhbCwgdGhyb3R0bGVkKSA9PiB7XG4gIGNvbnN0IGxlbmd0aENvbXB1dGFibGUgPSB0b3RhbCAhPSBudWxsO1xuXG4gIHJldHVybiBbKGxvYWRlZCkgPT4gdGhyb3R0bGVkWzBdKHtcbiAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgIHRvdGFsLFxuICAgIGxvYWRlZFxuICB9KSwgdGhyb3R0bGVkWzFdXTtcbn1cblxuZXhwb3J0IGNvbnN0IGFzeW5jRGVjb3JhdG9yID0gKGZuKSA9PiAoLi4uYXJncykgPT4gdXRpbHMuYXNhcCgoKSA9PiBmbiguLi5hcmdzKSk7XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgPyAoKG9yaWdpbiwgaXNNU0lFKSA9PiAodXJsKSA9PiB7XG4gIHVybCA9IG5ldyBVUkwodXJsLCBwbGF0Zm9ybS5vcmlnaW4pO1xuXG4gIHJldHVybiAoXG4gICAgb3JpZ2luLnByb3RvY29sID09PSB1cmwucHJvdG9jb2wgJiZcbiAgICBvcmlnaW4uaG9zdCA9PT0gdXJsLmhvc3QgJiZcbiAgICAoaXNNU0lFIHx8IG9yaWdpbi5wb3J0ID09PSB1cmwucG9ydClcbiAgKTtcbn0pKFxuICBuZXcgVVJMKHBsYXRmb3JtLm9yaWdpbiksXG4gIHBsYXRmb3JtLm5hdmlnYXRvciAmJiAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KHBsYXRmb3JtLm5hdmlnYXRvci51c2VyQWdlbnQpXG4pIDogKCkgPT4gdHJ1ZTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIHtcbiAgICB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIGNvbnN0IGNvb2tpZSA9IFtuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKV07XG5cbiAgICAgIHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpICYmIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcocGF0aCkgJiYgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuXG4gICAgICB1dGlscy5pc1N0cmluZyhkb21haW4pICYmIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG5cbiAgICAgIHNlY3VyZSA9PT0gdHJ1ZSAmJiBjb29raWUucHVzaCgnc2VjdXJlJyk7XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG5cbiAgICByZWFkKG5hbWUpIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgfSxcblxuICAgIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfVxuXG4gIDpcblxuICAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIHtcbiAgICB3cml0ZSgpIHt9LFxuICAgIHJlYWQoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZSgpIHt9XG4gIH07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlzQWJzb2x1dGVVUkwgZnJvbSAnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMLmpzJztcbmltcG9ydCBjb21iaW5lVVJMcyBmcm9tICcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMLCBhbGxvd0Fic29sdXRlVXJscykge1xuICBsZXQgaXNSZWxhdGl2ZVVybCA9ICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCk7XG4gIGlmIChiYXNlVVJMICYmIChpc1JlbGF0aXZlVXJsIHx8IGFsbG93QWJzb2x1dGVVcmxzID09IGZhbHNlKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuL0F4aW9zSGVhZGVycy5qc1wiO1xuXG5jb25zdCBoZWFkZXJzVG9PYmplY3QgPSAodGhpbmcpID0+IHRoaW5nIGluc3RhbmNlb2YgQXhpb3NIZWFkZXJzID8geyAuLi50aGluZyB9IDogdGhpbmc7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIGNvbnN0IGNvbmZpZyA9IHt9O1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlLCBwcm9wLCBjYXNlbGVzcykge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UuY2FsbCh7Y2FzZWxlc3N9LCB0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMoYSwgYiwgcHJvcCAsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIHByb3AgLCBjYXNlbGVzcyk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEsIHByb3AgLCBjYXNlbGVzcyk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGlyZWN0S2V5cyhhLCBiLCBwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIpO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBtZXJnZU1hcCA9IHtcbiAgICB1cmw6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgbWV0aG9kOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGRhdGE6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgYmFzZVVSTDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlc3BvbnNlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHBhcmFtc1NlcmlhbGl6ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0TWVzc2FnZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aFhTUkZUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhZGFwdGVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlVHlwZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmQ29va2llTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmSGVhZGVyTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvblVwbG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uRG93bmxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBkZWNvbXByZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heENvbnRlbnRMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Qm9keUxlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBiZWZvcmVSZWRpcmVjdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc3BvcnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cEFnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBzQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgY2FuY2VsVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgc29ja2V0UGF0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZUVuY29kaW5nOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHZhbGlkYXRlU3RhdHVzOiBtZXJnZURpcmVjdEtleXMsXG4gICAgaGVhZGVyczogKGEsIGIgLCBwcm9wKSA9PiBtZXJnZURlZXBQcm9wZXJ0aWVzKGhlYWRlcnNUb09iamVjdChhKSwgaGVhZGVyc1RvT2JqZWN0KGIpLHByb3AsIHRydWUpXG4gIH07XG5cbiAgdXRpbHMuZm9yRWFjaChPYmplY3Qua2V5cyh7Li4uY29uZmlnMSwgLi4uY29uZmlnMn0pLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBpc1VSTFNhbWVPcmlnaW4gZnJvbSBcIi4vaXNVUkxTYW1lT3JpZ2luLmpzXCI7XG5pbXBvcnQgY29va2llcyBmcm9tIFwiLi9jb29raWVzLmpzXCI7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tIFwiLi4vY29yZS9idWlsZEZ1bGxQYXRoLmpzXCI7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSBcIi4uL2NvcmUvbWVyZ2VDb25maWcuanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYnVpbGRVUkwgZnJvbSBcIi4vYnVpbGRVUkwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICBsZXQgeyBkYXRhLCB3aXRoWFNSRlRva2VuLCB4c3JmSGVhZGVyTmFtZSwgeHNyZkNvb2tpZU5hbWUsIGhlYWRlcnMsIGF1dGggfSA9IG5ld0NvbmZpZztcblxuICBuZXdDb25maWcuaGVhZGVycyA9IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShoZWFkZXJzKTtcblxuICBuZXdDb25maWcudXJsID0gYnVpbGRVUkwoYnVpbGRGdWxsUGF0aChuZXdDb25maWcuYmFzZVVSTCwgbmV3Q29uZmlnLnVybCwgbmV3Q29uZmlnLmFsbG93QWJzb2x1dGVVcmxzKSwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuXG4gIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgaWYgKGF1dGgpIHtcbiAgICBoZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICtcbiAgICAgIGJ0b2EoKGF1dGgudXNlcm5hbWUgfHwgJycpICsgJzonICsgKGF1dGgucGFzc3dvcmQgPyB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYXV0aC5wYXNzd29yZCkpIDogJycpKVxuICAgICk7XG4gIH1cblxuICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgfHwgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKHVuZGVmaW5lZCk7IC8vIGJyb3dzZXIgaGFuZGxlcyBpdFxuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNGdW5jdGlvbihkYXRhLmdldEhlYWRlcnMpKSB7XG4gICAgICAvLyBOb2RlLmpzIEZvcm1EYXRhIChsaWtlIGZvcm0tZGF0YSBwYWNrYWdlKVxuICAgICAgY29uc3QgZm9ybUhlYWRlcnMgPSBkYXRhLmdldEhlYWRlcnMoKTtcbiAgICAgIC8vIE9ubHkgc2V0IHNhZmUgaGVhZGVycyB0byBhdm9pZCBvdmVyd3JpdGluZyBzZWN1cml0eSBoZWFkZXJzXG4gICAgICBjb25zdCBhbGxvd2VkSGVhZGVycyA9IFsnY29udGVudC10eXBlJywgJ2NvbnRlbnQtbGVuZ3RoJ107XG4gICAgICBPYmplY3QuZW50cmllcyhmb3JtSGVhZGVycykuZm9yRWFjaCgoW2tleSwgdmFsXSkgPT4ge1xuICAgICAgICBpZiAoYWxsb3dlZEhlYWRlcnMuaW5jbHVkZXMoa2V5LnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgaGVhZGVycy5zZXQoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0gIFxuXG4gIC8vIEFkZCB4c3JmIGhlYWRlclxuICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cblxuICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52KSB7XG4gICAgd2l0aFhTUkZUb2tlbiAmJiB1dGlscy5pc0Z1bmN0aW9uKHdpdGhYU1JGVG9rZW4pICYmICh3aXRoWFNSRlRva2VuID0gd2l0aFhTUkZUb2tlbihuZXdDb25maWcpKTtcblxuICAgIGlmICh3aXRoWFNSRlRva2VuIHx8ICh3aXRoWFNSRlRva2VuICE9PSBmYWxzZSAmJiBpc1VSTFNhbWVPcmlnaW4obmV3Q29uZmlnLnVybCkpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIGNvbnN0IHhzcmZWYWx1ZSA9IHhzcmZIZWFkZXJOYW1lICYmIHhzcmZDb29raWVOYW1lICYmIGNvb2tpZXMucmVhZCh4c3JmQ29va2llTmFtZSk7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgaGVhZGVycy5zZXQoeHNyZkhlYWRlck5hbWUsIHhzcmZWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0NvbmZpZztcbn1cblxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IHNldHRsZSBmcm9tICcuLy4uL2NvcmUvc2V0dGxlLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBwYXJzZVByb3RvY29sIGZyb20gJy4uL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQge3Byb2dyZXNzRXZlbnRSZWR1Y2VyfSBmcm9tICcuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzJztcbmltcG9ydCByZXNvbHZlQ29uZmlnIGZyb20gXCIuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanNcIjtcblxuY29uc3QgaXNYSFJBZGFwdGVyU3VwcG9ydGVkID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJztcblxuZXhwb3J0IGRlZmF1bHQgaXNYSFJBZGFwdGVyU3VwcG9ydGVkICYmIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBjb25zdCBfY29uZmlnID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuICAgIGxldCByZXF1ZXN0RGF0YSA9IF9jb25maWcuZGF0YTtcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKF9jb25maWcuaGVhZGVycykubm9ybWFsaXplKCk7XG4gICAgbGV0IHtyZXNwb25zZVR5cGUsIG9uVXBsb2FkUHJvZ3Jlc3MsIG9uRG93bmxvYWRQcm9ncmVzc30gPSBfY29uZmlnO1xuICAgIGxldCBvbkNhbmNlbGVkO1xuICAgIGxldCB1cGxvYWRUaHJvdHRsZWQsIGRvd25sb2FkVGhyb3R0bGVkO1xuICAgIGxldCBmbHVzaFVwbG9hZCwgZmx1c2hEb3dubG9hZDtcblxuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBmbHVzaFVwbG9hZCAmJiBmbHVzaFVwbG9hZCgpOyAvLyBmbHVzaCBldmVudHNcbiAgICAgIGZsdXNoRG93bmxvYWQgJiYgZmx1c2hEb3dubG9hZCgpOyAvLyBmbHVzaCBldmVudHNcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuXG4gICAgICBfY29uZmlnLnNpZ25hbCAmJiBfY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgIH1cblxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oX2NvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgX2NvbmZpZy51cmwsIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBfY29uZmlnLnRpbWVvdXQ7XG5cbiAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKFxuICAgICAgICAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ICYmIHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcbiAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZURhdGEgPSAhcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nID9cbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCBmdW5jdGlvbiBfcmVqZWN0KGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoJ29ubG9hZGVuZCcgaW4gcmVxdWVzdCkge1xuICAgICAgLy8gVXNlIG9ubG9hZGVuZCBpZiBhdmFpbGFibGVcbiAgICAgIHJlcXVlc3Qub25sb2FkZW5kID0gb25sb2FkZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlIHRvIGVtdWxhdGUgb25sb2FkZW5kXG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVhZHlzdGF0ZSBoYW5kbGVyIGlzIGNhbGxpbmcgYmVmb3JlIG9uZXJyb3Igb3Igb250aW1lb3V0IGhhbmRsZXJzLFxuICAgICAgICAvLyBzbyB3ZSBzaG91bGQgY2FsbCBvbmxvYWRlbmQgb24gdGhlIG5leHQgJ3RpY2snXG4gICAgICAgIHNldFRpbWVvdXQob25sb2FkZW5kKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCwgY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKGV2ZW50KSB7XG4gICAgICAgLy8gQnJvd3NlcnMgZGVsaXZlciBhIFByb2dyZXNzRXZlbnQgaW4gWEhSIG9uZXJyb3JcbiAgICAgICAvLyAobWVzc2FnZSBtYXkgYmUgZW1wdHk7IHdoZW4gcHJlc2VudCwgc3VyZmFjZSBpdClcbiAgICAgICAvLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L2Vycm9yX2V2ZW50XG4gICAgICAgY29uc3QgbXNnID0gZXZlbnQgJiYgZXZlbnQubWVzc2FnZSA/IGV2ZW50Lm1lc3NhZ2UgOiAnTmV0d29yayBFcnJvcic7XG4gICAgICAgY29uc3QgZXJyID0gbmV3IEF4aW9zRXJyb3IobXNnLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgIC8vIGF0dGFjaCB0aGUgdW5kZXJseWluZyBldmVudCBmb3IgY29uc3VtZXJzIHdobyB3YW50IGRldGFpbHNcbiAgICAgICBlcnIuZXZlbnQgPSBldmVudCB8fCBudWxsO1xuICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG4gICAgXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICBsZXQgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBfY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnIDogJ3RpbWVvdXQgZXhjZWVkZWQnO1xuICAgICAgY29uc3QgdHJhbnNpdGlvbmFsID0gX2NvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBpZiAoX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgcmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCAmJiByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShudWxsKTtcblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLnRvSlNPTigpLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFfY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBfY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKG9uRG93bmxvYWRQcm9ncmVzcykge1xuICAgICAgKFtkb3dubG9hZFRocm90dGxlZCwgZmx1c2hEb3dubG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpKTtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBkb3dubG9hZFRocm90dGxlZCk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAob25VcGxvYWRQcm9ncmVzcyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgKFt1cGxvYWRUaHJvdHRsZWQsIGZsdXNoVXBsb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uVXBsb2FkUHJvZ3Jlc3MpKTtcblxuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCB1cGxvYWRUaHJvdHRsZWQpO1xuXG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZmx1c2hVcGxvYWQpO1xuICAgIH1cblxuICAgIGlmIChfY29uZmlnLmNhbmNlbFRva2VuIHx8IF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgb25DYW5jZWxlZCA9IGNhbmNlbCA9PiB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChfY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBfY29uZmlnLnNpZ25hbC5hYm9ydGVkID8gb25DYW5jZWxlZCgpIDogX2NvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woX2NvbmZpZy51cmwpO1xuXG4gICAgaWYgKHByb3RvY29sICYmIHBsYXRmb3JtLnByb3RvY29scy5pbmRleE9mKHByb3RvY29sKSA9PT0gLTEpIHtcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignVW5zdXBwb3J0ZWQgcHJvdG9jb2wgJyArIHByb3RvY29sICsgJzonLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgY29uZmlnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhIHx8IG51bGwpO1xuICB9KTtcbn1cbiIsImltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gXCIuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qc1wiO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuY29uc3QgY29tcG9zZVNpZ25hbHMgPSAoc2lnbmFscywgdGltZW91dCkgPT4ge1xuICBjb25zdCB7bGVuZ3RofSA9IChzaWduYWxzID0gc2lnbmFscyA/IHNpZ25hbHMuZmlsdGVyKEJvb2xlYW4pIDogW10pO1xuXG4gIGlmICh0aW1lb3V0IHx8IGxlbmd0aCkge1xuICAgIGxldCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgbGV0IGFib3J0ZWQ7XG5cbiAgICBjb25zdCBvbmFib3J0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICBjb25zdCBlcnIgPSByZWFzb24gaW5zdGFuY2VvZiBFcnJvciA/IHJlYXNvbiA6IHRoaXMucmVhc29uO1xuICAgICAgICBjb250cm9sbGVyLmFib3J0KGVyciBpbnN0YW5jZW9mIEF4aW9zRXJyb3IgPyBlcnIgOiBuZXcgQ2FuY2VsZWRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogZXJyKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHRpbWVyID0gdGltZW91dCAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIG9uYWJvcnQobmV3IEF4aW9zRXJyb3IoYHRpbWVvdXQgJHt0aW1lb3V0fSBvZiBtcyBleGNlZWRlZGAsIEF4aW9zRXJyb3IuRVRJTUVET1VUKSlcbiAgICB9LCB0aW1lb3V0KVxuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSAoKSA9PiB7XG4gICAgICBpZiAoc2lnbmFscykge1xuICAgICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIHNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xuICAgICAgICAgIHNpZ25hbC51bnN1YnNjcmliZSA/IHNpZ25hbC51bnN1YnNjcmliZShvbmFib3J0KSA6IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2lnbmFscyA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpKTtcblxuICAgIGNvbnN0IHtzaWduYWx9ID0gY29udHJvbGxlcjtcblxuICAgIHNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHV0aWxzLmFzYXAodW5zdWJzY3JpYmUpO1xuXG4gICAgcmV0dXJuIHNpZ25hbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wb3NlU2lnbmFscztcbiIsIlxuZXhwb3J0IGNvbnN0IHN0cmVhbUNodW5rID0gZnVuY3Rpb24qIChjaHVuaywgY2h1bmtTaXplKSB7XG4gIGxldCBsZW4gPSBjaHVuay5ieXRlTGVuZ3RoO1xuXG4gIGlmICghY2h1bmtTaXplIHx8IGxlbiA8IGNodW5rU2l6ZSkge1xuICAgIHlpZWxkIGNodW5rO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBwb3MgPSAwO1xuICBsZXQgZW5kO1xuXG4gIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICBlbmQgPSBwb3MgKyBjaHVua1NpemU7XG4gICAgeWllbGQgY2h1bmsuc2xpY2UocG9zLCBlbmQpO1xuICAgIHBvcyA9IGVuZDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVhZEJ5dGVzID0gYXN5bmMgZnVuY3Rpb24qIChpdGVyYWJsZSwgY2h1bmtTaXplKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgcmVhZFN0cmVhbShpdGVyYWJsZSkpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoY2h1bmssIGNodW5rU2l6ZSk7XG4gIH1cbn1cblxuY29uc3QgcmVhZFN0cmVhbSA9IGFzeW5jIGZ1bmN0aW9uKiAoc3RyZWFtKSB7XG4gIGlmIChzdHJlYW1bU3ltYm9sLmFzeW5jSXRlcmF0b3JdKSB7XG4gICAgeWllbGQqIHN0cmVhbTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWFkZXIgPSBzdHJlYW0uZ2V0UmVhZGVyKCk7XG4gIHRyeSB7XG4gICAgZm9yICg7Oykge1xuICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCByZWFkZXIuY2FuY2VsKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCkgPT4ge1xuICBjb25zdCBpdGVyYXRvciA9IHJlYWRCeXRlcyhzdHJlYW0sIGNodW5rU2l6ZSk7XG5cbiAgbGV0IGJ5dGVzID0gMDtcbiAgbGV0IGRvbmU7XG4gIGxldCBfb25GaW5pc2ggPSAoZSkgPT4ge1xuICAgIGlmICghZG9uZSkge1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICBvbkZpbmlzaCAmJiBvbkZpbmlzaChlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtKHtcbiAgICBhc3luYyBwdWxsKGNvbnRyb2xsZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHtkb25lLCB2YWx1ZX0gPSBhd2FpdCBpdGVyYXRvci5uZXh0KCk7XG5cbiAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgIF9vbkZpbmlzaCgpO1xuICAgICAgICAgIGNvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGVuID0gdmFsdWUuYnl0ZUxlbmd0aDtcbiAgICAgICAgaWYgKG9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgICBsZXQgbG9hZGVkQnl0ZXMgPSBieXRlcyArPSBsZW47XG4gICAgICAgICAgb25Qcm9ncmVzcyhsb2FkZWRCeXRlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKG5ldyBVaW50OEFycmF5KHZhbHVlKSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgX29uRmluaXNoKGVycik7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhbmNlbChyZWFzb24pIHtcbiAgICAgIF9vbkZpbmlzaChyZWFzb24pO1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yLnJldHVybigpO1xuICAgIH1cbiAgfSwge1xuICAgIGhpZ2hXYXRlck1hcms6IDJcbiAgfSlcbn1cbiIsImltcG9ydCBwbGF0Zm9ybSBmcm9tIFwiLi4vcGxhdGZvcm0vaW5kZXguanNcIjtcbmltcG9ydCB1dGlscyBmcm9tIFwiLi4vdXRpbHMuanNcIjtcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcbmltcG9ydCBjb21wb3NlU2lnbmFscyBmcm9tIFwiLi4vaGVscGVycy9jb21wb3NlU2lnbmFscy5qc1wiO1xuaW1wb3J0IHt0cmFja1N0cmVhbX0gZnJvbSBcIi4uL2hlbHBlcnMvdHJhY2tTdHJlYW0uanNcIjtcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSBcIi4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQge3Byb2dyZXNzRXZlbnRSZWR1Y2VyLCBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yLCBhc3luY0RlY29yYXRvcn0gZnJvbSBcIi4uL2hlbHBlcnMvcHJvZ3Jlc3NFdmVudFJlZHVjZXIuanNcIjtcbmltcG9ydCByZXNvbHZlQ29uZmlnIGZyb20gXCIuLi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanNcIjtcbmltcG9ydCBzZXR0bGUgZnJvbSBcIi4uL2NvcmUvc2V0dGxlLmpzXCI7XG5cbmNvbnN0IERFRkFVTFRfQ0hVTktfU0laRSA9IDY0ICogMTAyNDtcblxuY29uc3Qge2lzRnVuY3Rpb259ID0gdXRpbHM7XG5cbmNvbnN0IGdsb2JhbEZldGNoQVBJID0gKCh7ZmV0Y2gsIFJlcXVlc3QsIFJlc3BvbnNlfSkgPT4gKHtcbiAgICBmZXRjaCwgUmVxdWVzdCwgUmVzcG9uc2VcbiAgfSkpKHV0aWxzLmdsb2JhbCk7XG5cbmNvbnN0IHtcbiAgUmVhZGFibGVTdHJlYW0sIFRleHRFbmNvZGVyXG59ID0gdXRpbHMuZ2xvYmFsO1xuXG5cbmNvbnN0IHRlc3QgPSAoZm4sIC4uLmFyZ3MpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFmbiguLi5hcmdzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IGZhY3RvcnkgPSAoZW52KSA9PiB7XG4gIGNvbnN0IHtmZXRjaCwgUmVxdWVzdCwgUmVzcG9uc2V9ID0gT2JqZWN0LmFzc2lnbih7fSwgZ2xvYmFsRmV0Y2hBUEksIGVudik7XG4gIGNvbnN0IGlzRmV0Y2hTdXBwb3J0ZWQgPSBpc0Z1bmN0aW9uKGZldGNoKTtcbiAgY29uc3QgaXNSZXF1ZXN0U3VwcG9ydGVkID0gaXNGdW5jdGlvbihSZXF1ZXN0KTtcbiAgY29uc3QgaXNSZXNwb25zZVN1cHBvcnRlZCA9IGlzRnVuY3Rpb24oUmVzcG9uc2UpO1xuXG4gIGlmICghaXNGZXRjaFN1cHBvcnRlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgPSBpc0ZldGNoU3VwcG9ydGVkICYmIGlzRnVuY3Rpb24oUmVhZGFibGVTdHJlYW0pO1xuXG4gIGNvbnN0IGVuY29kZVRleHQgPSBpc0ZldGNoU3VwcG9ydGVkICYmICh0eXBlb2YgVGV4dEVuY29kZXIgPT09ICdmdW5jdGlvbicgP1xuICAgICAgKChlbmNvZGVyKSA9PiAoc3RyKSA9PiBlbmNvZGVyLmVuY29kZShzdHIpKShuZXcgVGV4dEVuY29kZXIoKSkgOlxuICAgICAgYXN5bmMgKHN0cikgPT4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgbmV3IFJlcXVlc3Qoc3RyKS5hcnJheUJ1ZmZlcigpKVxuICApO1xuXG4gIGNvbnN0IHN1cHBvcnRzUmVxdWVzdFN0cmVhbSA9IGlzUmVxdWVzdFN1cHBvcnRlZCAmJiBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmIHRlc3QoKCkgPT4ge1xuICAgIGxldCBkdXBsZXhBY2Nlc3NlZCA9IGZhbHNlO1xuXG4gICAgY29uc3QgaGFzQ29udGVudFR5cGUgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICAgIGJvZHk6IG5ldyBSZWFkYWJsZVN0cmVhbSgpLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBnZXQgZHVwbGV4KCkge1xuICAgICAgICBkdXBsZXhBY2Nlc3NlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiAnaGFsZic7XG4gICAgICB9LFxuICAgIH0pLmhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKTtcblxuICAgIHJldHVybiBkdXBsZXhBY2Nlc3NlZCAmJiAhaGFzQ29udGVudFR5cGU7XG4gIH0pO1xuXG4gIGNvbnN0IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gPSBpc1Jlc3BvbnNlU3VwcG9ydGVkICYmIGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiZcbiAgICB0ZXN0KCgpID0+IHV0aWxzLmlzUmVhZGFibGVTdHJlYW0obmV3IFJlc3BvbnNlKCcnKS5ib2R5KSk7XG5cbiAgY29uc3QgcmVzb2x2ZXJzID0ge1xuICAgIHN0cmVhbTogc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAoKHJlcykgPT4gcmVzLmJvZHkpXG4gIH07XG5cbiAgaXNGZXRjaFN1cHBvcnRlZCAmJiAoKCgpID0+IHtcbiAgICBbJ3RleHQnLCAnYXJyYXlCdWZmZXInLCAnYmxvYicsICdmb3JtRGF0YScsICdzdHJlYW0nXS5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICAgIXJlc29sdmVyc1t0eXBlXSAmJiAocmVzb2x2ZXJzW3R5cGVdID0gKHJlcywgY29uZmlnKSA9PiB7XG4gICAgICAgIGxldCBtZXRob2QgPSByZXMgJiYgcmVzW3R5cGVdO1xuXG4gICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICByZXR1cm4gbWV0aG9kLmNhbGwocmVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBSZXNwb25zZSB0eXBlICcke3R5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCwgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsIGNvbmZpZyk7XG4gICAgICB9KVxuICAgIH0pO1xuICB9KSgpKTtcblxuICBjb25zdCBnZXRCb2R5TGVuZ3RoID0gYXN5bmMgKGJvZHkpID0+IHtcbiAgICBpZiAoYm9keSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNCbG9iKGJvZHkpKSB7XG4gICAgICByZXR1cm4gYm9keS5zaXplO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGJvZHkpKSB7XG4gICAgICBjb25zdCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHBsYXRmb3JtLm9yaWdpbiwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIChhd2FpdCBfcmVxdWVzdC5hcnJheUJ1ZmZlcigpKS5ieXRlTGVuZ3RoO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhib2R5KSB8fCB1dGlscy5pc0FycmF5QnVmZmVyKGJvZHkpKSB7XG4gICAgICByZXR1cm4gYm9keS5ieXRlTGVuZ3RoO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuICAgICAgYm9keSA9IGJvZHkgKyAnJztcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNTdHJpbmcoYm9keSkpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgZW5jb2RlVGV4dChib2R5KSkuYnl0ZUxlbmd0aDtcbiAgICB9XG4gIH1cblxuICBjb25zdCByZXNvbHZlQm9keUxlbmd0aCA9IGFzeW5jIChoZWFkZXJzLCBib2R5KSA9PiB7XG4gICAgY29uc3QgbGVuZ3RoID0gdXRpbHMudG9GaW5pdGVOdW1iZXIoaGVhZGVycy5nZXRDb250ZW50TGVuZ3RoKCkpO1xuXG4gICAgcmV0dXJuIGxlbmd0aCA9PSBudWxsID8gZ2V0Qm9keUxlbmd0aChib2R5KSA6IGxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiBhc3luYyAoY29uZmlnKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgIHVybCxcbiAgICAgIG1ldGhvZCxcbiAgICAgIGRhdGEsXG4gICAgICBzaWduYWwsXG4gICAgICBjYW5jZWxUb2tlbixcbiAgICAgIHRpbWVvdXQsXG4gICAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgICBvblVwbG9hZFByb2dyZXNzLFxuICAgICAgcmVzcG9uc2VUeXBlLFxuICAgICAgaGVhZGVycyxcbiAgICAgIHdpdGhDcmVkZW50aWFscyA9ICdzYW1lLW9yaWdpbicsXG4gICAgICBmZXRjaE9wdGlvbnNcbiAgICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlID8gKHJlc3BvbnNlVHlwZSArICcnKS50b0xvd2VyQ2FzZSgpIDogJ3RleHQnO1xuXG4gICAgbGV0IGNvbXBvc2VkU2lnbmFsID0gY29tcG9zZVNpZ25hbHMoW3NpZ25hbCwgY2FuY2VsVG9rZW4gJiYgY2FuY2VsVG9rZW4udG9BYm9ydFNpZ25hbCgpXSwgdGltZW91dCk7XG5cbiAgICBsZXQgcmVxdWVzdCA9IG51bGw7XG5cbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IGNvbXBvc2VkU2lnbmFsICYmIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlICYmICgoKSA9PiB7XG4gICAgICBjb21wb3NlZFNpZ25hbC51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuXG4gICAgbGV0IHJlcXVlc3RDb250ZW50TGVuZ3RoO1xuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChcbiAgICAgICAgb25VcGxvYWRQcm9ncmVzcyAmJiBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gJiYgbWV0aG9kICE9PSAnZ2V0JyAmJiBtZXRob2QgIT09ICdoZWFkJyAmJlxuICAgICAgICAocmVxdWVzdENvbnRlbnRMZW5ndGggPSBhd2FpdCByZXNvbHZlQm9keUxlbmd0aChoZWFkZXJzLCBkYXRhKSkgIT09IDBcbiAgICAgICkge1xuICAgICAgICBsZXQgX3JlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICAgIGR1cGxleDogXCJoYWxmXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGNvbnRlbnRUeXBlSGVhZGVyO1xuXG4gICAgICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpICYmIChjb250ZW50VHlwZUhlYWRlciA9IF9yZXF1ZXN0LmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkpIHtcbiAgICAgICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKGNvbnRlbnRUeXBlSGVhZGVyKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9yZXF1ZXN0LmJvZHkpIHtcbiAgICAgICAgICBjb25zdCBbb25Qcm9ncmVzcywgZmx1c2hdID0gcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoYXN5bmNEZWNvcmF0b3Iob25VcGxvYWRQcm9ncmVzcykpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGRhdGEgPSB0cmFja1N0cmVhbShfcmVxdWVzdC5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uUHJvZ3Jlc3MsIGZsdXNoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXV0aWxzLmlzU3RyaW5nKHdpdGhDcmVkZW50aWFscykpIHtcbiAgICAgICAgd2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzID8gJ2luY2x1ZGUnIDogJ29taXQnO1xuICAgICAgfVxuXG4gICAgICAvLyBDbG91ZGZsYXJlIFdvcmtlcnMgdGhyb3dzIHdoZW4gY3JlZGVudGlhbHMgYXJlIGRlZmluZWRcbiAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY2xvdWRmbGFyZS93b3JrZXJkL2lzc3Vlcy85MDJcbiAgICAgIGNvbnN0IGlzQ3JlZGVudGlhbHNTdXBwb3J0ZWQgPSBpc1JlcXVlc3RTdXBwb3J0ZWQgJiYgXCJjcmVkZW50aWFsc1wiIGluIFJlcXVlc3QucHJvdG90eXBlO1xuXG4gICAgICBjb25zdCByZXNvbHZlZE9wdGlvbnMgPSB7XG4gICAgICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICAgICAgc2lnbmFsOiBjb21wb3NlZFNpZ25hbCxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QudG9VcHBlckNhc2UoKSxcbiAgICAgICAgaGVhZGVyczogaGVhZGVycy5ub3JtYWxpemUoKS50b0pTT04oKSxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgZHVwbGV4OiBcImhhbGZcIixcbiAgICAgICAgY3JlZGVudGlhbHM6IGlzQ3JlZGVudGlhbHNTdXBwb3J0ZWQgPyB3aXRoQ3JlZGVudGlhbHMgOiB1bmRlZmluZWRcbiAgICAgIH07XG5cbiAgICAgIHJlcXVlc3QgPSBpc1JlcXVlc3RTdXBwb3J0ZWQgJiYgbmV3IFJlcXVlc3QodXJsLCByZXNvbHZlZE9wdGlvbnMpO1xuXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCAoaXNSZXF1ZXN0U3VwcG9ydGVkID8gZmV0Y2gocmVxdWVzdCwgZmV0Y2hPcHRpb25zKSA6IGZldGNoKHVybCwgcmVzb2x2ZWRPcHRpb25zKSk7XG5cbiAgICAgIGNvbnN0IGlzU3RyZWFtUmVzcG9uc2UgPSBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChyZXNwb25zZVR5cGUgPT09ICdzdHJlYW0nIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3Jlc3BvbnNlJyk7XG5cbiAgICAgIGlmIChzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChvbkRvd25sb2FkUHJvZ3Jlc3MgfHwgKGlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUpKSkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge307XG5cbiAgICAgICAgWydzdGF0dXMnLCAnc3RhdHVzVGV4dCcsICdoZWFkZXJzJ10uZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICBvcHRpb25zW3Byb3BdID0gcmVzcG9uc2VbcHJvcF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlQ29udGVudExlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpKTtcblxuICAgICAgICBjb25zdCBbb25Qcm9ncmVzcywgZmx1c2hdID0gb25Eb3dubG9hZFByb2dyZXNzICYmIHByb2dyZXNzRXZlbnREZWNvcmF0b3IoXG4gICAgICAgICAgcmVzcG9uc2VDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uRG93bmxvYWRQcm9ncmVzcyksIHRydWUpXG4gICAgICAgICkgfHwgW107XG5cbiAgICAgICAgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoXG4gICAgICAgICAgdHJhY2tTdHJlYW0ocmVzcG9uc2UuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBvblByb2dyZXNzLCAoKSA9PiB7XG4gICAgICAgICAgICBmbHVzaCAmJiBmbHVzaCgpO1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBvcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSB8fCAndGV4dCc7XG5cbiAgICAgIGxldCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNvbHZlcnNbdXRpbHMuZmluZEtleShyZXNvbHZlcnMsIHJlc3BvbnNlVHlwZSkgfHwgJ3RleHQnXShyZXNwb25zZSwgY29uZmlnKTtcblxuICAgICAgIWlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwge1xuICAgICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgICBoZWFkZXJzOiBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0LFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICByZXF1ZXN0XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgICAgaWYgKGVyciAmJiBlcnIubmFtZSA9PT0gJ1R5cGVFcnJvcicgJiYgL0xvYWQgZmFpbGVkfGZldGNoL2kudGVzdChlcnIubWVzc2FnZSkpIHtcbiAgICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICBuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCksXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2F1c2U6IGVyci5jYXVzZSB8fCBlcnJcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBzZWVkQ2FjaGUgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBnZXRGZXRjaCA9IChjb25maWcpID0+IHtcbiAgbGV0IGVudiA9IHV0aWxzLm1lcmdlLmNhbGwoe1xuICAgIHNraXBVbmRlZmluZWQ6IHRydWVcbiAgfSwgZ2xvYmFsRmV0Y2hBUEksIGNvbmZpZyA/IGNvbmZpZy5lbnYgOiBudWxsKTtcblxuICBjb25zdCB7ZmV0Y2gsIFJlcXVlc3QsIFJlc3BvbnNlfSA9IGVudjtcblxuICBjb25zdCBzZWVkcyA9IFtcbiAgICBSZXF1ZXN0LCBSZXNwb25zZSwgZmV0Y2hcbiAgXTtcblxuICBsZXQgbGVuID0gc2VlZHMubGVuZ3RoLCBpID0gbGVuLFxuICAgIHNlZWQsIHRhcmdldCwgbWFwID0gc2VlZENhY2hlO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBzZWVkID0gc2VlZHNbaV07XG4gICAgdGFyZ2V0ID0gbWFwLmdldChzZWVkKTtcblxuICAgIHRhcmdldCA9PT0gdW5kZWZpbmVkICYmIG1hcC5zZXQoc2VlZCwgdGFyZ2V0ID0gKGkgPyBuZXcgTWFwKCkgOiBmYWN0b3J5KGVudikpKVxuXG4gICAgbWFwID0gdGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbmNvbnN0IGFkYXB0ZXIgPSBnZXRGZXRjaCgpO1xuXG5leHBvcnQgZGVmYXVsdCBhZGFwdGVyO1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBodHRwQWRhcHRlciBmcm9tICcuL2h0dHAuanMnO1xuaW1wb3J0IHhockFkYXB0ZXIgZnJvbSAnLi94aHIuanMnO1xuaW1wb3J0ICogYXMgZmV0Y2hBZGFwdGVyIGZyb20gJy4vZmV0Y2guanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xuICBodHRwOiBodHRwQWRhcHRlcixcbiAgeGhyOiB4aHJBZGFwdGVyLFxuICBmZXRjaDoge1xuICAgIGdldDogZmV0Y2hBZGFwdGVyLmdldEZldGNoLFxuICB9XG59XG5cbnV0aWxzLmZvckVhY2goa25vd25BZGFwdGVycywgKGZuLCB2YWx1ZSkgPT4ge1xuICBpZiAoZm4pIHtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHt2YWx1ZX0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICdhZGFwdGVyTmFtZScsIHt2YWx1ZX0pO1xuICB9XG59KTtcblxuY29uc3QgcmVuZGVyUmVhc29uID0gKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YDtcblxuY29uc3QgaXNSZXNvbHZlZEhhbmRsZSA9IChhZGFwdGVyKSA9PiB1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzLCBjb25maWcpID0+IHtcbiAgICBhZGFwdGVycyA9IHV0aWxzLmlzQXJyYXkoYWRhcHRlcnMpID8gYWRhcHRlcnMgOiBbYWRhcHRlcnNdO1xuXG4gICAgY29uc3Qge2xlbmd0aH0gPSBhZGFwdGVycztcbiAgICBsZXQgbmFtZU9yQWRhcHRlcjtcbiAgICBsZXQgYWRhcHRlcjtcblxuICAgIGNvbnN0IHJlamVjdGVkUmVhc29ucyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgICAgbGV0IGlkO1xuXG4gICAgICBhZGFwdGVyID0gbmFtZU9yQWRhcHRlcjtcblxuICAgICAgaWYgKCFpc1Jlc29sdmVkSGFuZGxlKG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICAgIGFkYXB0ZXIgPSBrbm93bkFkYXB0ZXJzWyhpZCA9IFN0cmluZyhuYW1lT3JBZGFwdGVyKSkudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKGFkYXB0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBVbmtub3duIGFkYXB0ZXIgJyR7aWR9J2ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGFwdGVyICYmICh1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IChhZGFwdGVyID0gYWRhcHRlci5nZXQoY29uZmlnKSkpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZWplY3RlZFJlYXNvbnNbaWQgfHwgJyMnICsgaV0gPSBhZGFwdGVyO1xuICAgIH1cblxuICAgIGlmICghYWRhcHRlcikge1xuXG4gICAgICBjb25zdCByZWFzb25zID0gT2JqZWN0LmVudHJpZXMocmVqZWN0ZWRSZWFzb25zKVxuICAgICAgICAubWFwKChbaWQsIHN0YXRlXSkgPT4gYGFkYXB0ZXIgJHtpZH0gYCArXG4gICAgICAgICAgKHN0YXRlID09PSBmYWxzZSA/ICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudCcgOiAnaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGQnKVxuICAgICAgICApO1xuXG4gICAgICBsZXQgcyA9IGxlbmd0aCA/XG4gICAgICAgIChyZWFzb25zLmxlbmd0aCA+IDEgPyAnc2luY2UgOlxcbicgKyByZWFzb25zLm1hcChyZW5kZXJSZWFzb24pLmpvaW4oJ1xcbicpIDogJyAnICsgcmVuZGVyUmVhc29uKHJlYXNvbnNbMF0pKSA6XG4gICAgICAgICdhcyBubyBhZGFwdGVyIHNwZWNpZmllZCc7XG5cbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gc3VpdGFibGUgYWRhcHRlciB0byBkaXNwYXRjaCB0aGUgcmVxdWVzdCBgICsgcyxcbiAgICAgICAgJ0VSUl9OT1RfU1VQUE9SVCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkYXB0ZXI7XG4gIH0sXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0cmFuc2Zvcm1EYXRhIGZyb20gJy4vdHJhbnNmb3JtRGF0YS5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi4vY2FuY2VsL2lzQ2FuY2VsLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcbmltcG9ydCBhZGFwdGVycyBmcm9tIFwiLi4vYWRhcHRlcnMvYWRhcHRlcnMuanNcIjtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc2lnbmFsICYmIGNvbmZpZy5zaWduYWwuYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbmZpZy5oZWFkZXJzKTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgIGNvbmZpZyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIGlmIChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10uaW5kZXhPZihjb25maWcubWV0aG9kKSAhPT0gLTEpIHtcbiAgICBjb25maWcuaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgYWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXIoY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlciwgY29uZmlnKTtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgIGNvbmZpZyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZWFzb24ucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufVxuIiwiZXhwb3J0IGNvbnN0IFZFUlNJT04gPSBcIjEuMTIuMVwiOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuLi9lbnYvZGF0YS5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuXG5jb25zdCB2YWxpZGF0b3JzID0ge307XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5bJ29iamVjdCcsICdib29sZWFuJywgJ251bWJlcicsICdmdW5jdGlvbicsICdzdHJpbmcnLCAnc3ltYm9sJ10uZm9yRWFjaCgodHlwZSwgaSkgPT4ge1xuICB2YWxpZGF0b3JzW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxuY29uc3QgZGVwcmVjYXRlZFdhcm5pbmdzID0ge307XG5cbi8qKlxuICogVHJhbnNpdGlvbmFsIG9wdGlvbiB2YWxpZGF0b3JcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMudHJhbnNpdGlvbmFsID0gZnVuY3Rpb24gdHJhbnNpdGlvbmFsKHZhbGlkYXRvciwgdmVyc2lvbiwgbWVzc2FnZSkge1xuICBmdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG9wdCwgZGVzYykge1xuICAgIHJldHVybiAnW0F4aW9zIHYnICsgVkVSU0lPTiArICddIFRyYW5zaXRpb25hbCBvcHRpb24gXFwnJyArIG9wdCArICdcXCcnICsgZGVzYyArIChtZXNzYWdlID8gJy4gJyArIG1lc3NhZ2UgOiAnJyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gKHZhbHVlLCBvcHQsIG9wdHMpID0+IHtcbiAgICBpZiAodmFsaWRhdG9yID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGZvcm1hdE1lc3NhZ2Uob3B0LCAnIGhhcyBiZWVuIHJlbW92ZWQnICsgKHZlcnNpb24gPyAnIGluICcgKyB2ZXJzaW9uIDogJycpKSxcbiAgICAgICAgQXhpb3NFcnJvci5FUlJfREVQUkVDQVRFRFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodmVyc2lvbiAmJiAhZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0pIHtcbiAgICAgIGRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdID0gdHJ1ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGZvcm1hdE1lc3NhZ2UoXG4gICAgICAgICAgb3B0LFxuICAgICAgICAgICcgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2JyArIHZlcnNpb24gKyAnIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5lYXIgZnV0dXJlJ1xuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0b3IgPyB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0cykgOiB0cnVlO1xuICB9O1xufTtcblxudmFsaWRhdG9ycy5zcGVsbGluZyA9IGZ1bmN0aW9uIHNwZWxsaW5nKGNvcnJlY3RTcGVsbGluZykge1xuICByZXR1cm4gKHZhbHVlLCBvcHQpID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUud2FybihgJHtvcHR9IGlzIGxpa2VseSBhIG1pc3NwZWxsaW5nIG9mICR7Y29ycmVjdFNwZWxsaW5nfWApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtib29sZWFuP30gYWxsb3dVbmtub3duXG4gKlxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBjb25zdCBvcHQgPSBrZXlzW2ldO1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IHNjaGVtYVtvcHRdO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0aW9ucyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb24gJyArIG9wdCArICcgbXVzdCBiZSAnICsgcmVzdWx0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYWxsb3dVbmtub3duICE9PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignVW5rbm93biBvcHRpb24gJyArIG9wdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXNzZXJ0T3B0aW9ucyxcbiAgdmFsaWRhdG9yc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IGJ1aWxkVVJMIGZyb20gJy4uL2hlbHBlcnMvYnVpbGRVUkwuanMnO1xuaW1wb3J0IEludGVyY2VwdG9yTWFuYWdlciBmcm9tICcuL0ludGVyY2VwdG9yTWFuYWdlci5qcyc7XG5pbXBvcnQgZGlzcGF0Y2hSZXF1ZXN0IGZyb20gJy4vZGlzcGF0Y2hSZXF1ZXN0LmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL21lcmdlQ29uZmlnLmpzJztcbmltcG9ydCBidWlsZEZ1bGxQYXRoIGZyb20gJy4vYnVpbGRGdWxsUGF0aC5qcyc7XG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uL2hlbHBlcnMvdmFsaWRhdG9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi9BeGlvc0hlYWRlcnMuanMnO1xuXG5jb25zdCB2YWxpZGF0b3JzID0gdmFsaWRhdG9yLnZhbGlkYXRvcnM7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmNsYXNzIEF4aW9zIHtcbiAgY29uc3RydWN0b3IoaW5zdGFuY2VDb25maWcpIHtcbiAgICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWcgfHwge307XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBjb25maWdPclVybCBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gICAqIEBwYXJhbSB7P09iamVjdH0gY29uZmlnXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAgICovXG4gIGFzeW5jIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBsZXQgZHVtbXkgPSB7fTtcblxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15KSA6IChkdW1teSA9IG5ldyBFcnJvcigpKTtcblxuICAgICAgICAvLyBzbGljZSBvZmYgdGhlIEVycm9yOiAuLi4gbGluZVxuICAgICAgICBjb25zdCBzdGFjayA9IGR1bW15LnN0YWNrID8gZHVtbXkuc3RhY2sucmVwbGFjZSgvXi4rXFxuLywgJycpIDogJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFlcnIuc3RhY2spIHtcbiAgICAgICAgICAgIGVyci5zdGFjayA9IHN0YWNrO1xuICAgICAgICAgICAgLy8gbWF0Y2ggd2l0aG91dCB0aGUgMiB0b3Agc3RhY2sgbGluZXNcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YWNrICYmICFTdHJpbmcoZXJyLnN0YWNrKS5lbmRzV2l0aChzdGFjay5yZXBsYWNlKC9eLitcXG4uK1xcbi8sICcnKSkpIHtcbiAgICAgICAgICAgIGVyci5zdGFjayArPSAnXFxuJyArIHN0YWNrXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaWdub3JlIHRoZSBjYXNlIHdoZXJlIFwic3RhY2tcIiBpcyBhbiB1bi13cml0YWJsZSBwcm9wZXJ0eVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBfcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICAgIGlmICh0eXBlb2YgY29uZmlnT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICAgIH1cblxuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBjb25zdCB7dHJhbnNpdGlvbmFsLCBwYXJhbXNTZXJpYWxpemVyLCBoZWFkZXJzfSA9IGNvbmZpZztcblxuICAgIGlmICh0cmFuc2l0aW9uYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnModHJhbnNpdGlvbmFsLCB7XG4gICAgICAgIHNpbGVudEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBmb3JjZWRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgY2xhcmlmeVRpbWVvdXRFcnJvcjogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKVxuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXNTZXJpYWxpemVyICE9IG51bGwpIHtcbiAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHBhcmFtc1NlcmlhbGl6ZXIpKSB7XG4gICAgICAgIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyID0ge1xuICAgICAgICAgIHNlcmlhbGl6ZTogcGFyYW1zU2VyaWFsaXplclxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhwYXJhbXNTZXJpYWxpemVyLCB7XG4gICAgICAgICAgZW5jb2RlOiB2YWxpZGF0b3JzLmZ1bmN0aW9uLFxuICAgICAgICAgIHNlcmlhbGl6ZTogdmFsaWRhdG9ycy5mdW5jdGlvblxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgY29uZmlnLmFsbG93QWJzb2x1dGVVcmxzXG4gICAgaWYgKGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBkbyBub3RoaW5nXG4gICAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLmFsbG93QWJzb2x1dGVVcmxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRoaXMuZGVmYXVsdHMuYWxsb3dBYnNvbHV0ZVVybHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMoY29uZmlnLCB7XG4gICAgICBiYXNlVXJsOiB2YWxpZGF0b3JzLnNwZWxsaW5nKCdiYXNlVVJMJyksXG4gICAgICB3aXRoWHNyZlRva2VuOiB2YWxpZGF0b3JzLnNwZWxsaW5nKCd3aXRoWFNSRlRva2VuJylcbiAgICB9LCB0cnVlKTtcblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscy5tZXJnZShcbiAgICAgIGhlYWRlcnMuY29tbW9uLFxuICAgICAgaGVhZGVyc1tjb25maWcubWV0aG9kXVxuICAgICk7XG5cbiAgICBoZWFkZXJzICYmIHV0aWxzLmZvckVhY2goXG4gICAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICAgIChtZXRob2QpID0+IHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbjtcblxuICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgICBjb25zdCBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QuYmluZCh0aGlzKSwgdW5kZWZpbmVkXTtcbiAgICAgIGNoYWluLnVuc2hpZnQoLi4ucmVxdWVzdEludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgY2hhaW4ucHVzaCguLi5yZXNwb25zZUludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgbGVuID0gY2hhaW4ubGVuZ3RoO1xuXG4gICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW5baSsrXSwgY2hhaW5baSsrXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIGxlbiA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIGxldCBuZXdDb25maWcgPSBjb25maWc7XG5cbiAgICBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwsIGNvbmZpZy5hbGxvd0Fic29sdXRlVXJscyk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IGlzRm9ybSA/IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIH0gOiB7fSxcbiAgICAgICAgdXJsLFxuICAgICAgICBkYXRhXG4gICAgICB9KSk7XG4gICAgfTtcbiAgfVxuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZ2VuZXJhdGVIVFRQTWV0aG9kKCk7XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZCArICdGb3JtJ10gPSBnZW5lcmF0ZUhUVFBNZXRob2QodHJ1ZSk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vQ2FuY2VsZWRFcnJvci5qcyc7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMge0NhbmNlbFRva2VufVxuICovXG5jbGFzcyBDYW5jZWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTtcblxuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IHRoaXM7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuKGNhbmNlbCA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gb25mdWxmaWxsZWQgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICAgKi9cbiAgdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIHRocm93IHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgdG9BYm9ydFNpZ25hbCgpIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgY29uc3QgYWJvcnQgPSAoZXJyKSA9PiB7XG4gICAgICBjb250cm9sbGVyLmFib3J0KGVycik7XG4gICAgfTtcblxuICAgIHRoaXMuc3Vic2NyaWJlKGFib3J0KTtcblxuICAgIGNvbnRyb2xsZXIuc2lnbmFsLnVuc3Vic2NyaWJlID0gKCkgPT4gdGhpcy51bnN1YnNjcmliZShhYm9ydCk7XG5cbiAgICByZXR1cm4gY29udHJvbGxlci5zaWduYWw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICAgKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICAgKi9cbiAgc3RhdGljIHNvdXJjZSgpIHtcbiAgICBsZXQgY2FuY2VsO1xuICAgIGNvbnN0IHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICAgIGNhbmNlbCA9IGM7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuLFxuICAgICAgY2FuY2VsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuIHV0aWxzLmlzT2JqZWN0KHBheWxvYWQpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59XG4iLCJjb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxufTtcblxuT2JqZWN0LmVudHJpZXMoSHR0cFN0YXR1c0NvZGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICBIdHRwU3RhdHVzQ29kZVt2YWx1ZV0gPSBrZXk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgSHR0cFN0YXR1c0NvZGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCBiaW5kIGZyb20gJy4vaGVscGVycy9iaW5kLmpzJztcbmltcG9ydCBBeGlvcyBmcm9tICcuL2NvcmUvQXhpb3MuanMnO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gJy4vY29yZS9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IENhbmNlbFRva2VuIGZyb20gJy4vY2FuY2VsL0NhbmNlbFRva2VuLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQge1ZFUlNJT059IGZyb20gJy4vZW52L2RhdGEuanMnO1xuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHNwcmVhZCBmcm9tICcuL2hlbHBlcnMvc3ByZWFkLmpzJztcbmltcG9ydCBpc0F4aW9zRXJyb3IgZnJvbSAnLi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuL2NvcmUvQXhpb3NIZWFkZXJzLmpzXCI7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSAnLi9hZGFwdGVycy9hZGFwdGVycy5qcyc7XG5pbXBvcnQgSHR0cFN0YXR1c0NvZGUgZnJvbSAnLi9oZWxwZXJzL0h0dHBTdGF0dXNDb2RlLmpzJztcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm5zIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICBjb25zdCBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICBjb25zdCBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0LCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQsIG51bGwsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuY29uc3QgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWxlZEVycm9yID0gQ2FuY2VsZWRFcnJvcjtcbmF4aW9zLkNhbmNlbFRva2VuID0gQ2FuY2VsVG9rZW47XG5heGlvcy5pc0NhbmNlbCA9IGlzQ2FuY2VsO1xuYXhpb3MuVkVSU0lPTiA9IFZFUlNJT047XG5heGlvcy50b0Zvcm1EYXRhID0gdG9Gb3JtRGF0YTtcblxuLy8gRXhwb3NlIEF4aW9zRXJyb3IgY2xhc3NcbmF4aW9zLkF4aW9zRXJyb3IgPSBBeGlvc0Vycm9yO1xuXG4vLyBhbGlhcyBmb3IgQ2FuY2VsZWRFcnJvciBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuYXhpb3MuQ2FuY2VsID0gYXhpb3MuQ2FuY2VsZWRFcnJvcjtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gc3ByZWFkO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSBpc0F4aW9zRXJyb3I7XG5cbi8vIEV4cG9zZSBtZXJnZUNvbmZpZ1xuYXhpb3MubWVyZ2VDb25maWcgPSBtZXJnZUNvbmZpZztcblxuYXhpb3MuQXhpb3NIZWFkZXJzID0gQXhpb3NIZWFkZXJzO1xuXG5heGlvcy5mb3JtVG9KU09OID0gdGhpbmcgPT4gZm9ybURhdGFUb0pTT04odXRpbHMuaXNIVE1MRm9ybSh0aGluZykgPyBuZXcgRm9ybURhdGEodGhpbmcpIDogdGhpbmcpO1xuXG5heGlvcy5nZXRBZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcjtcblxuYXhpb3MuSHR0cFN0YXR1c0NvZGUgPSBIdHRwU3RhdHVzQ29kZTtcblxuYXhpb3MuZGVmYXVsdCA9IGF4aW9zO1xuXG4vLyB0aGlzIG1vZHVsZSBzaG91bGQgb25seSBoYXZlIGEgZGVmYXVsdCBleHBvcnRcbmV4cG9ydCBkZWZhdWx0IGF4aW9zXG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnLi9saWIvYXhpb3MuanMnO1xuXG4vLyBUaGlzIG1vZHVsZSBpcyBpbnRlbmRlZCB0byB1bndyYXAgQXhpb3MgZGVmYXVsdCBleHBvcnQgYXMgbmFtZWQuXG4vLyBLZWVwIHRvcC1sZXZlbCBleHBvcnQgc2FtZSB3aXRoIHN0YXRpYyBwcm9wZXJ0aWVzXG4vLyBzbyB0aGF0IGl0IGNhbiBrZWVwIHNhbWUgd2l0aCBlcyBtb2R1bGUgb3IgY2pzXG5jb25zdCB7XG4gIEF4aW9zLFxuICBBeGlvc0Vycm9yLFxuICBDYW5jZWxlZEVycm9yLFxuICBpc0NhbmNlbCxcbiAgQ2FuY2VsVG9rZW4sXG4gIFZFUlNJT04sXG4gIGFsbCxcbiAgQ2FuY2VsLFxuICBpc0F4aW9zRXJyb3IsXG4gIHNwcmVhZCxcbiAgdG9Gb3JtRGF0YSxcbiAgQXhpb3NIZWFkZXJzLFxuICBIdHRwU3RhdHVzQ29kZSxcbiAgZm9ybVRvSlNPTixcbiAgZ2V0QWRhcHRlcixcbiAgbWVyZ2VDb25maWdcbn0gPSBheGlvcztcblxuZXhwb3J0IHtcbiAgYXhpb3MgYXMgZGVmYXVsdCxcbiAgQXhpb3MsXG4gIEF4aW9zRXJyb3IsXG4gIENhbmNlbGVkRXJyb3IsXG4gIGlzQ2FuY2VsLFxuICBDYW5jZWxUb2tlbixcbiAgVkVSU0lPTixcbiAgYWxsLFxuICBDYW5jZWwsXG4gIGlzQXhpb3NFcnJvcixcbiAgc3ByZWFkLFxuICB0b0Zvcm1EYXRhLFxuICBBeGlvc0hlYWRlcnMsXG4gIEh0dHBTdGF0dXNDb2RlLFxuICBmb3JtVG9KU09OLFxuICBnZXRBZGFwdGVyLFxuICBtZXJnZUNvbmZpZ1xufVxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9iYXNlNjQgdjEuMC4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMS4wLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwidmFyIFN1YmFjY291bnRzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN1YmFjY291bnRzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgU3ViYWNjb3VudHNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92NS9hY2NvdW50cy9zdWJhY2NvdW50cycsIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pO1xuICAgIH07XG4gICAgU3ViYWNjb3VudHNDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChcIi92NS9hY2NvdW50cy9zdWJhY2NvdW50cy9cIi5jb25jYXQoaWQpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pO1xuICAgIH07XG4gICAgU3ViYWNjb3VudHNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3Y1L2FjY291bnRzL3N1YmFjY291bnRzJywgeyBuYW1lOiBuYW1lIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBTdWJhY2NvdW50c0NsaWVudC5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChcIi92NS9hY2NvdW50cy9zdWJhY2NvdW50cy9cIi5jb25jYXQoaWQsIFwiL2VuYWJsZVwiKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIFN1YmFjY291bnRzQ2xpZW50LnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChcIi92NS9hY2NvdW50cy9zdWJhY2NvdW50cy9cIi5jb25jYXQoaWQsIFwiL2Rpc2FibGVcIikpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBTdWJhY2NvdW50c0NsaWVudC5TVUJBQ0NPVU5UX0hFQURFUiA9ICdYLU1haWxndW4tT24tQmVoYWxmLU9mJztcbiAgICByZXR1cm4gU3ViYWNjb3VudHNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgU3ViYWNjb3VudHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IGF4aW9zLCB7IEF4aW9zSGVhZGVycywgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSAnYmFzZS02NCc7XG5pbXBvcnQgU3ViYWNjb3VudHNDbGllbnQgZnJvbSAnLi4vLi4vU3ViYWNjb3VudHMuanMnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL0Vycm9yLmpzJztcbnZhciBBeGlvc1Byb3ZpZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEF4aW9zUHJvdmlkZXIoX2EpIHtcbiAgICAgICAgdmFyIHVzZXJuYW1lID0gX2EudXNlcm5hbWUsIGtleSA9IF9hLmtleSwgdGltZW91dCA9IF9hLnRpbWVvdXQsIG1heEJvZHlMZW5ndGggPSBfYS5tYXhCb2R5TGVuZ3RoLCBwcm94eSA9IF9hLnByb3h5LCBjb25maWdIZWFkZXJzID0gX2EuY29uZmlnSGVhZGVycywgdXNlRmV0Y2ggPSBfYS51c2VGZXRjaDtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICAgICAgdGhpcy5tYXhCb2R5TGVuZ3RoID0gbWF4Qm9keUxlbmd0aDtcbiAgICAgICAgdGhpcy5wcm94eSA9IHByb3h5O1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLm1ha2VIZWFkZXJzRnJvbU9iamVjdChjb25maWdIZWFkZXJzKTtcbiAgICAgICAgdGhpcy51c2VGZXRjaCA9IHVzZUZldGNoO1xuICAgIH1cbiAgICBBeGlvc1Byb3ZpZGVyLnByb3RvdHlwZS5nZXRSZXNwb25zZUJvZHkgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHt9LFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlID09PSBudWxsIHx8IHJlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXNwb25zZS5zdGF0dXNcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgPT09ICdNYWlsZ3VuIE1hZ25pZmljZW50IEFQSScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogJ0luY29ycmVjdCB1cmwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlcy5ib2R5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuZGF0YVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmJvZHkgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEF4aW9zUHJvdmlkZXIucHJvdG90eXBlLmdldERhdGFSZWxhdGVkSGVhZGVycyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgaXNGb3JtVVJMRW5jb2RlZCA9IChfYSA9IGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy5pc0Zvcm1VUkxFbmNvZGVkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0cnVlO1xuICAgICAgICB2YXIgaXNNdWx0aXBhcnRGb3JtRGF0YSA9IGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy5pc011bHRpcGFydEZvcm1EYXRhO1xuICAgICAgICB2YXIgaXNBcHBsaWNhdGlvbkpTT04gPSBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuaXNBcHBsaWNhdGlvbkpTT047XG4gICAgICAgIHZhciBoZWFkZXJzID0ge307XG4gICAgICAgIGlmIChpc0Zvcm1VUkxFbmNvZGVkKSB7XG4gICAgICAgICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc011bHRpcGFydEZvcm1EYXRhKSB7XG4gICAgICAgICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdtdWx0aXBhcnQvZm9ybS1kYXRhJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcHBsaWNhdGlvbkpTT04pIHtcbiAgICAgICAgICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH07XG4gICAgQXhpb3NQcm92aWRlci5wcm90b3R5cGUuYWRkUmVxdWVzdExldmVsSGVhZGVycyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gbmV3IEF4aW9zSGVhZGVycygpO1xuICAgICAgICB2YXIgYmFzaWMgPSBiYXNlNjQuZW5jb2RlKFwiXCIuY29uY2F0KHRoaXMudXNlcm5hbWUsIFwiOlwiKS5jb25jYXQodGhpcy5rZXkpKTtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnMuc2V0QXV0aG9yaXphdGlvbihcIkJhc2ljIFwiLmNvbmNhdChiYXNpYykpO1xuICAgICAgICByZXF1ZXN0SGVhZGVycy5zZXQodGhpcy5oZWFkZXJzKTtcbiAgICAgICAgdmFyIGRhdGFSZWxhdGVkSGVhZGVycyA9IHRoaXMuZ2V0RGF0YVJlbGF0ZWRIZWFkZXJzKGNvbmZpZyk7XG4gICAgICAgIHZhciBvbkNhbGxIZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3QoZGF0YVJlbGF0ZWRIZWFkZXJzKTtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnMuc2V0KG9uQ2FsbEhlYWRlcnMpO1xuICAgICAgICByZXR1cm4gcmVxdWVzdEhlYWRlcnM7XG4gICAgfTtcbiAgICBBeGlvc1Byb3ZpZGVyLnByb3RvdHlwZS5tYWtlSGVhZGVyc0Zyb21PYmplY3QgPSBmdW5jdGlvbiAoaGVhZGVyc09iamVjdCkge1xuICAgICAgICBpZiAoaGVhZGVyc09iamVjdCA9PT0gdm9pZCAwKSB7IGhlYWRlcnNPYmplY3QgPSB7fTsgfVxuICAgICAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBuZXcgQXhpb3NIZWFkZXJzKCk7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzID0gT2JqZWN0LmVudHJpZXMoaGVhZGVyc09iamVjdCkucmVkdWNlKGZ1bmN0aW9uIChoZWFkZXJzQWNjdW11bGF0b3IsIGN1cnJlbnRQYWlyKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gY3VycmVudFBhaXJbMF0sIHZhbHVlID0gY3VycmVudFBhaXJbMV07XG4gICAgICAgICAgICBoZWFkZXJzQWNjdW11bGF0b3Iuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIGhlYWRlcnNBY2N1bXVsYXRvcjtcbiAgICAgICAgfSwgcmVxdWVzdEhlYWRlcnMpO1xuICAgICAgICByZXR1cm4gcmVxdWVzdEhlYWRlcnM7XG4gICAgfTtcbiAgICBBeGlvc1Byb3ZpZGVyLnByb3RvdHlwZS5zZXRTdWJBY2NvdW50SGVhZGVyID0gZnVuY3Rpb24gKHN1YkFjY291bnRJZCkge1xuICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KFN1YmFjY291bnRzQ2xpZW50LlNVQkFDQ09VTlRfSEVBREVSLCBzdWJBY2NvdW50SWQpO1xuICAgIH07XG4gICAgQXhpb3NQcm92aWRlci5wcm90b3R5cGUucmVzZXRTdWJBY2NvdW50SGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmhlYWRlcnMuZGVsZXRlKFN1YmFjY291bnRzQ2xpZW50LlNVQkFDQ09VTlRfSEVBREVSKTtcbiAgICB9O1xuICAgIEF4aW9zUHJvdmlkZXIucHJvdG90eXBlLm1ha2VSZXF1ZXN0ID0gZnVuY3Rpb24gKHVybCwgbWV0aG9kLCBkYXRhLCBjb25maWcpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSwgcmVxdWVzdEhlYWRlcnMsIHJlcU9iamVjdCwgZXJyXzEsIGVycm9yUmVzcG9uc2UsIHJlcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2QpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9kLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RIZWFkZXJzID0gdGhpcy5hZGRSZXF1ZXN0TGV2ZWxIZWFkZXJzKGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZC5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kLnRyeXMucHVzaChbMSwgMywgLCA0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXFPYmplY3QgPSBfX2Fzc2lnbihfX2Fzc2lnbih7IG1ldGhvZDogbWV0aG9kLnRvTG9jYWxlVXBwZXJDYXNlKCksIHRpbWVvdXQ6IHRoaXMudGltZW91dCwgdXJsOiB1cmwsIGhlYWRlcnM6IHJlcXVlc3RIZWFkZXJzIH0sIGRhdGEpLCB7IG1heEJvZHlMZW5ndGg6IHRoaXMubWF4Qm9keUxlbmd0aCwgcHJveHk6IHRoaXMucHJveHkgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VGZXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcU9iamVjdC5hZGFwdGVyID0gJ2ZldGNoJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnLmRhdGFTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuZGF0YVNpemUgPiAwICYmIGNvbmZpZy5kYXRhU2l6ZSA+IHRoaXMubWF4Qm9keUxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiAnKEZldGNoKSBSZXF1ZXN0IGJvZHkgbGFyZ2VyIHRoYW4gbWF4Qm9keUxlbmd0aCBsaW1pdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogXCIoRmV0Y2gpIFJlcXVlc3QgYm9keSBzaXplIG9mIFwiLmNvbmNhdChjb25maWcuZGF0YVNpemUsIFwiIGJ5dGVzIGV4Y2VlZHMgdGhlIG1heGltdW0gYWxsb3dlZCBzaXplIG9mIFwiKS5jb25jYXQodGhpcy5tYXhCb2R5TGVuZ3RoLCBcIiBieXRlc1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBheGlvcy5yZXF1ZXN0KHJlcU9iamVjdCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9kLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJfMSA9IF9kLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yUmVzcG9uc2UgPSBlcnJfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAoKF9hID0gZXJyb3JSZXNwb25zZSA9PT0gbnVsbCB8fCBlcnJvclJlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlcnJvclJlc3BvbnNlLnJlc3BvbnNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3RhdHVzKSB8fCA0MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogKChfYiA9IGVycm9yUmVzcG9uc2UgPT09IG51bGwgfHwgZXJyb3JSZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3JSZXNwb25zZS5yZXNwb25zZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnN0YXR1c1RleHQpIHx8IGVycm9yUmVzcG9uc2UuY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiAoKF9jID0gZXJyb3JSZXNwb25zZSA9PT0gbnVsbCB8fCBlcnJvclJlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlcnJvclJlc3BvbnNlLnJlc3BvbnNlKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZGF0YSkgfHwgZXJyb3JSZXNwb25zZS5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldFJlc3BvbnNlQm9keShyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBfZC5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQXhpb3NQcm92aWRlcjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBBeGlvc1Byb3ZpZGVyO1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBGb3JtRGF0YUJ1aWxkZXIgZnJvbSAnLi9Gb3JtRGF0YUJ1aWxkZXIuanMnO1xuaW1wb3J0IEF4aW9zUHJvdmlkZXIgZnJvbSAnLi9SZXF1ZXN0UHJvdmlkZXJzL0F4aW9zUHJvdmlkZXIuanMnO1xudmFyIFJlcXVlc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVxdWVzdChvcHRpb25zLCBmb3JtRGF0YSkge1xuICAgICAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsO1xuICAgICAgICB0aGlzLmZvcm1EYXRhQnVpbGRlciA9IG5ldyBGb3JtRGF0YUJ1aWxkZXIoZm9ybURhdGEsIHsgdXNlRmV0Y2g6IG9wdGlvbnMudXNlRmV0Y2ggfSk7XG4gICAgICAgIHZhciBwcm92aWRlcnNDb25maWcgPSB7XG4gICAgICAgICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQsXG4gICAgICAgICAgICBtYXhCb2R5TGVuZ3RoOiA1MjQyODgwMCxcbiAgICAgICAgICAgIHByb3h5OiBvcHRpb25zLnByb3h5LFxuICAgICAgICAgICAgdXNlcm5hbWU6IG9wdGlvbnMudXNlcm5hbWUsXG4gICAgICAgICAgICBrZXk6IG9wdGlvbnMua2V5LFxuICAgICAgICAgICAgY29uZmlnSGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgdXNlRmV0Y2g6IG9wdGlvbnMudXNlRmV0Y2hcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0UHJvdmlkZXIgPSBuZXcgQXhpb3NQcm92aWRlcihwcm92aWRlcnNDb25maWcpO1xuICAgIH1cbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBvbkNhbGxPcHRpb25zLCBjb25maWcpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucywgcGFyYW1zLCB1cmxWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gX19hc3NpZ24oe30sIG9uQ2FsbE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgICAgIHVybFZhbHVlID0gdXJsam9pbih0aGlzLnVybCwgdXJsKTtcbiAgICAgICAgICAgICAgICBpZiAoKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5xdWVyeSkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnF1ZXJ5KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucXVlcnkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZWFyY2hQYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5wYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKG9wdGlvbnMucXVlcnkuc2VhcmNoUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5wYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKG9wdGlvbnMucXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuZGF0YSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5ib2R5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0UHJvdmlkZXIubWFrZVJlcXVlc3QodXJsVmFsdWUsIG1ldGhvZC50b1VwcGVyQ2FzZSgpLCBwYXJhbXMsIGNvbmZpZyldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUuc2V0U3ViYWNjb3VudEhlYWRlciA9IGZ1bmN0aW9uIChzdWJBY2NvdW50SWQpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0UHJvdmlkZXIuc2V0U3ViQWNjb3VudEhlYWRlcihzdWJBY2NvdW50SWQpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUucmVzZXRTdWJhY2NvdW50SGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlcXVlc3RQcm92aWRlci5yZXNldFN1YkFjY291bnRIZWFkZXIoKTtcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB7IHF1ZXJ5OiBxdWVyeSB9KTtcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLmNvbW1hbmQgPSBmdW5jdGlvbiAobWV0aG9kLCB1cmwsIGRhdGEsIGNvbmZpZywgcXVlcnlPYmplY3QpIHtcbiAgICAgICAgdmFyIHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeU9iamVjdCA9PT0gbnVsbCB8fCBxdWVyeU9iamVjdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcXVlcnlPYmplY3QucXVlcnksXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHJlcXVlc3RPcHRpb25zLCBjb25maWcpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHVybCwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkoJ2dldCcsIHVybCwgcXVlcnkpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBkYXRhLCB7XG4gICAgICAgICAgICBpc0Zvcm1VUkxFbmNvZGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGlzQXBwbGljYXRpb25KU09OOiBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuaXNBcHBsaWNhdGlvbkpTT05cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5wb3N0V2l0aEZEID0gZnVuY3Rpb24gKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EsIGZvcm1EYXRhLCBkYXRhU2l6ZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgZm9ybURhdGEgPSBfYS5mb3JtRGF0YSwgZGF0YVNpemUgPSBfYS5kYXRhU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRm9ybVVSTEVuY29kZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc011bHRpcGFydEZvcm1EYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhU2l6ZTogZGF0YVNpemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUucHV0V2l0aEZEID0gZnVuY3Rpb24gKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EsIGZvcm1EYXRhLCBkYXRhU2l6ZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgZm9ybURhdGEgPSBfYS5mb3JtRGF0YSwgZGF0YVNpemUgPSBfYS5kYXRhU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGb3JtVVJMRW5jb2RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTXVsdGlwYXJ0Rm9ybURhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTaXplOiBkYXRhU2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5wYXRjaFdpdGhGRCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hLCBmb3JtRGF0YSwgZGF0YVNpemU7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCksIGZvcm1EYXRhID0gX2EuZm9ybURhdGEsIGRhdGFTaXplID0gX2EuZGF0YVNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5jb21tYW5kKCdwYXRjaCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGb3JtVVJMRW5jb2RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTXVsdGlwYXJ0Rm9ybURhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTaXplOiBkYXRhU2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBxdWVyeU9iamVjdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGRhdGEsIHt9LCBxdWVyeU9iamVjdCk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAodXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ2RlbGV0ZScsIHVybCwgZGF0YSk7XG4gICAgfTtcbiAgICByZXR1cm4gUmVxdWVzdDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG52YXIgRG9tYWluID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvbWFpbihkYXRhLCByZWNlaXZpbmcsIHNlbmRpbmcpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICB0aGlzLnJlcXVpcmVfdGxzID0gZGF0YS5yZXF1aXJlX3RscztcbiAgICAgICAgdGhpcy5za2lwX3ZlcmlmaWNhdGlvbiA9IGRhdGEuc2tpcF92ZXJpZmljYXRpb247XG4gICAgICAgIHRoaXMuc3RhdGUgPSBkYXRhLnN0YXRlO1xuICAgICAgICB0aGlzLndpbGRjYXJkID0gZGF0YS53aWxkY2FyZDtcbiAgICAgICAgdGhpcy5zcGFtX2FjdGlvbiA9IGRhdGEuc3BhbV9hY3Rpb247XG4gICAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgICAgIHRoaXMuc210cF9wYXNzd29yZCA9IGRhdGEuc210cF9wYXNzd29yZDtcbiAgICAgICAgdGhpcy5zbXRwX2xvZ2luID0gZGF0YS5zbXRwX2xvZ2luO1xuICAgICAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGU7XG4gICAgICAgIHRoaXMucmVjZWl2aW5nX2Ruc19yZWNvcmRzID0gcmVjZWl2aW5nIHx8IG51bGw7XG4gICAgICAgIHRoaXMuc2VuZGluZ19kbnNfcmVjb3JkcyA9IHNlbmRpbmcgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMuaXNfZGlzYWJsZWQgPSBkYXRhLmlzX2Rpc2FibGVkO1xuICAgICAgICB0aGlzLndlYl9wcmVmaXggPSBkYXRhLndlYl9wcmVmaXg7XG4gICAgICAgIHRoaXMud2ViX3NjaGVtZSA9IGRhdGEud2ViX3NjaGVtZTtcbiAgICAgICAgdGhpcy51c2VfYXV0b21hdGljX3NlbmRlcl9zZWN1cml0eSA9IGRhdGEudXNlX2F1dG9tYXRpY19zZW5kZXJfc2VjdXJpdHk7XG4gICAgICAgIC8qXG4gICAgICAgICAgZG9tYWluIGdldCBhbmQgdXBkYXRlIG1ldGhvZHMgbWF5IGhhdmUgcmljaGVyIHJlc3BvbnNlIHRoYW4gY3JlYXRlIG1ldGhvZC5cbiAgICAgICAgKi9cbiAgICAgICAgdmFyIGR5bmFtaWNLZXlzID0gWydka2ltX2hvc3QnLCAnbWFpbGZyb21faG9zdCddO1xuICAgICAgICB2YXIgZHluYW1pY1Byb3BlcnRpZXMgPSBkeW5hbWljS2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtwcm9wZXJ0eU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBwcm9wZXJ0eU5hbWU7XG4gICAgICAgICAgICAgICAgYWNjW3Byb3BdID0gZGF0YVtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGR5bmFtaWNQcm9wZXJ0aWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIERvbWFpbjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBEb21haW47XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvci5qcyc7XG5pbXBvcnQgRG9tYWluIGZyb20gJy4vZG9tYWluLmpzJztcbnZhciBEb21haW5zQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvbWFpbnNDbGllbnQocmVxdWVzdCwgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQsIGRvbWFpblRlbXBsYXRlc0NsaWVudCwgZG9tYWluVGFnc0NsaWVudCwgZG9tYWluVHJhY2tpbmcsIGxvZ2dlcikge1xuICAgICAgICBpZiAobG9nZ2VyID09PSB2b2lkIDApIHsgbG9nZ2VyID0gY29uc29sZTsgfVxuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLmRvbWFpbkNyZWRlbnRpYWxzID0gZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ7XG4gICAgICAgIHRoaXMuZG9tYWluVGVtcGxhdGVzID0gZG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuICAgICAgICB0aGlzLmRvbWFpblRhZ3MgPSBkb21haW5UYWdzQ2xpZW50O1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgdGhpcy5kb21haW5UcmFja2luZyA9IGRvbWFpblRyYWNraW5nO1xuICAgIH1cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5faGFuZGxlQm9vbFZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBwcm9wc0ZvclJlcGxhY2VtZW50ID0gZGF0YTtcbiAgICAgICAgdmFyIHJlcGxhY2VkUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wc0ZvclJlcGxhY2VtZW50KS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IGtleTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXTtcbiAgICAgICAgICAgICAgICBhY2NbcHJvcF0gPSAodmFsdWUudG9TdHJpbmcoKSA9PT0gJ3RydWUnKSA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YSksIHJlcGxhY2VkUHJvcHMpO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlTWVzc2FnZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLnBhcnNlRG9tYWluTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UuYm9keSAmJiByZXNwb25zZS5ib2R5Lml0ZW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbWFpbihpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLl9wYXJzZURvbWFpbiA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gbmV3IERvbWFpbihyZXNwb25zZS5ib2R5LmRvbWFpbiwgcmVzcG9uc2UuYm9keS5yZWNlaXZpbmdfZG5zX3JlY29yZHMsIHJlc3BvbnNlLmJvZHkuc2VuZGluZ19kbnNfcmVjb3Jkcyk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvZG9tYWlucycsIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VEb21haW5MaXN0KHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdmFyIHByZXBhcmVkUXVlcnkgPSBxdWVyeSA/IHtcbiAgICAgICAgICAgICdoOmV4dGVuZGVkJzogKF9hID0gcXVlcnkgPT09IG51bGwgfHwgcXVlcnkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHF1ZXJ5LmV4dGVuZGVkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBmYWxzZSxcbiAgICAgICAgICAgICdoOndpdGhfZG5zJzogKF9iID0gcXVlcnkgPT09IG51bGwgfHwgcXVlcnkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHF1ZXJ5LndpdGhfZG5zKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB0cnVlLFxuICAgICAgICB9IDoge307XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y0L2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbiksIHByZXBhcmVkUXVlcnkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VEb21haW4ocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcG9zdE9iaiA9IHRoaXMuX2hhbmRsZUJvb2xWYWx1ZXMoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3Y0L2RvbWFpbnMnLCBwb3N0T2JqKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlRG9tYWluKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcHV0RGF0YSA9IHRoaXMuX2hhbmRsZUJvb2xWYWx1ZXMoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKFwiL3Y0L2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbiksIHB1dERhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VEb21haW4ocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS52ZXJpZnkgPSBmdW5jdGlvbiAoZG9tYWluKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KFwiL3Y0L2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbiwgXCIvdmVyaWZ5XCIpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlRG9tYWluKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoXCIvdjMvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLl9wYXJzZU1lc3NhZ2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5nZXRDb25uZWN0aW9uID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChcIi92My9kb21haW5zL1wiLmNvbmNhdChkb21haW4sIFwiL2Nvbm5lY3Rpb25cIikpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXM7IH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS51cGRhdGVDb25uZWN0aW9uID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChcIi92My9kb21haW5zL1wiLmNvbmNhdChkb21haW4sIFwiL2Nvbm5lY3Rpb25cIiksIGRhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXM7IH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICAvLyBUcmFja2luZ1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgJ2RvbWFpbnMuZ2V0VHJhY2tpbmcnIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkLlxuICAgICogUGxlYXNlIHVzZSAnZG9tYWlucy5kb21haW5UcmFja2luZy5nZXRUcmFja2luZycgaW5zdGVhZC5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmdldFRyYWNraW5nID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFwiXFxuICAgICAgJ2RvbWFpbnMuZ2V0VHJhY2tpbmcnIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlICdkb21haW5zLmRvbWFpblRyYWNraW5nLmdldFRyYWNraW5nJyBpbnN0ZWFkLlxcbiAgICBcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbWFpblRyYWNraW5nLmdldFRyYWNraW5nKGRvbWFpbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkICdkb21haW5zLnVwZGF0ZVRyYWNraW5nJyBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAqIFBsZWFzZSB1c2UgJ2RvbWFpbnMuZG9tYWluVHJhY2tpbmcudXBkYXRlVHJhY2tpbmcnIGluc3RlYWQuXG4gICAgKi9cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS51cGRhdGVUcmFja2luZyA9IGZ1bmN0aW9uIChkb21haW4sIHR5cGUsIGRhdGEpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIlxcbiAgICAgICdkb21haW5zLnVwZGF0ZVRyYWNraW5nJyBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSAnZG9tYWlucy5kb21haW5UcmFja2luZy51cGRhdGVUcmFja2luZycgaW5zdGVhZC5cXG4gICAgXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb21haW5UcmFja2luZy51cGRhdGVUcmFja2luZyhkb21haW4sIHR5cGUsIGRhdGEpO1xuICAgIH07XG4gICAgLy8gSVBzXG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMuZ2V0SXBzXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmdldElwcyA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLmdldElwc1wiIG1ldGhvZCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyB2YXIgX2E7IHJldHVybiAoX2EgPSByZXNwb25zZSA9PT0gbnVsbCB8fCByZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzcG9uc2UuYm9keSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLml0ZW1zOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLmFzc2lnbklwXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmFzc2lnbklwID0gZnVuY3Rpb24gKGRvbWFpbiwgaXApIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLmFzc2lnbklwXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBpcDogaXAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkIFwiZG9tYWlucy5kZWxldGVJcFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSBtb3ZlZCB0byB0aGUgSXBzQ2xpZW50LlxuICAgICovXG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuZGVsZXRlSXAgPSBmdW5jdGlvbiAoZG9tYWluLCBpcCkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMuZGVsZXRlSXBcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSBtb3ZlZCBpbnRvIHRoZSBJcHNDbGllbnQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCBpcCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMubGlua0lwUG9vbFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkXG4gICAgKiBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLlxuICAgICovXG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUubGlua0lwUG9vbCA9IGZ1bmN0aW9uIChkb21haW4sIHBvb2xJZCkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMubGlua0lwUG9vbFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IHBvb2xfaWQ6IHBvb2xJZCB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLnVubGlua0lwUG9sbFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSBtb3ZlZCBpbnRvIHRoZSBJcHNDbGllbnRcbiAgICAqIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICAgKi9cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS51bmxpbmtJcFBvbGwgPSBmdW5jdGlvbiAoZG9tYWluLCByZXBsYWNlbWVudCkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMudW5saW5rSXBQb2xsXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIG1vdmVkIGludG8gdGhlIElwc0NsaWVudCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICB2YXIgc2VhcmNoUGFyYW1zID0gJyc7XG4gICAgICAgIGlmIChyZXBsYWNlbWVudC5wb29sX2lkICYmIHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdUb28gbXVjaCBkYXRhIGZvciByZXBsYWNlbWVudCcsICdQbGVhc2Ugc3BlY2lmeSBlaXRoZXIgcG9vbF9pZCBvciBpcCAobm90IGJvdGgpJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zID0gXCI/cG9vbF9pZD1cIi5jb25jYXQocmVwbGFjZW1lbnQucG9vbF9pZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVwbGFjZW1lbnQuaXApIHtcbiAgICAgICAgICAgIHNlYXJjaFBhcmFtcyA9IFwiP2lwPVwiLmNvbmNhdChyZXBsYWNlbWVudC5pcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCAnaXBfcG9vbCcsIHNlYXJjaFBhcmFtcykpO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUudXBkYXRlREtJTUF1dGhvcml0eSA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7IHF1ZXJ5OiBcInNlbGY9XCIuY29uY2F0KGRhdGEuc2VsZikgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoXCIvdjMvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluLCBcIi9ka2ltX2F1dGhvcml0eVwiKSwge30sIG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXM7IH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS51cGRhdGVES0lNU2VsZWN0b3IgPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMsIHJlcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7IHF1ZXJ5OiBcImRraW1fc2VsZWN0b3I9XCIuY29uY2F0KGRhdGEuZGtpbVNlbGVjdG9yKSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnB1dChcIi92My9kb21haW5zL1wiLmNvbmNhdChkb21haW4sIFwiL2RraW1fc2VsZWN0b3JcIiksIHt9LCBvcHRpb25zKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogKF9hID0gcmVzID09PSBudWxsIHx8IHJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzLmJvZHkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMudXBkYXRlV2ViUHJlZml4XCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQuXG4gICAgKiBQbGVhc2UgdXNlIGRvbWFpbnMudXBkYXRlIHRvIHNldCBuZXcgXCJ3ZWJfcHJlZml4XCIuXG4gICAgKiBDdXJyZW50IG1ldGhvZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLnVwZGF0ZVdlYlByZWZpeCA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLnVwZGF0ZVdlYlByZWZpeFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGRvbWFpbnMudXBkYXRlIHRvIHNldCBuZXcgXCJ3ZWJfcHJlZml4XCIuIEN1cnJlbnQgbWV0aG9kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHsgcXVlcnk6IFwid2ViX3ByZWZpeD1cIi5jb25jYXQoZGF0YS53ZWJQcmVmaXgpIH07XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KFwiL3YzL2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbiwgXCIvd2ViX3ByZWZpeFwiKSwge30sIG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXM7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERvbWFpbnNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgRG9tYWluc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvci5qcyc7XG52YXIgTmF2aWdhdGlvblRocnVQYWdlcyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZpZ2F0aW9uVGhydVBhZ2VzKHJlcXVlc3QpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIH1cbiAgICB9XG4gICAgTmF2aWdhdGlvblRocnVQYWdlcy5wcm90b3R5cGUucGFyc2VQYWdlID0gZnVuY3Rpb24gKGlkLCBwYWdlVXJsLCB1cmxTZXBhcmF0b3IsIGl0ZXJhdG9yTmFtZSkge1xuICAgICAgICB2YXIgcGFyc2VkVXJsID0gbmV3IFVSTChwYWdlVXJsKTtcbiAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IHBhcnNlZFVybC5zZWFyY2hQYXJhbXM7XG4gICAgICAgIHZhciBwYWdlVmFsdWUgPSBwYWdlVXJsICYmIHR5cGVvZiBwYWdlVXJsID09PSAnc3RyaW5nJyA/IHBhZ2VVcmwuc3BsaXQodXJsU2VwYXJhdG9yKS5wb3AoKSB8fCAnJyA6ICcnO1xuICAgICAgICB2YXIgaXRlcmF0b3JQb3NpdGlvbiA9IG51bGw7XG4gICAgICAgIGlmIChpdGVyYXRvck5hbWUpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yUG9zaXRpb24gPSBzZWFyY2hQYXJhbXMuaGFzKGl0ZXJhdG9yTmFtZSlcbiAgICAgICAgICAgICAgICA/IHNlYXJjaFBhcmFtcy5nZXQoaXRlcmF0b3JOYW1lKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBwYWdlOiB1cmxTZXBhcmF0b3IgPT09ICc/JyA/IFwiP1wiLmNvbmNhdChwYWdlVmFsdWUpIDogcGFnZVZhbHVlLFxuICAgICAgICAgICAgaXRlcmF0b3JQb3NpdGlvbjogaXRlcmF0b3JQb3NpdGlvbixcbiAgICAgICAgICAgIHVybDogcGFnZVVybFxuICAgICAgICB9O1xuICAgIH07XG4gICAgTmF2aWdhdGlvblRocnVQYWdlcy5wcm90b3R5cGUucGFyc2VQYWdlTGlua3MgPSBmdW5jdGlvbiAocmVzcG9uc2UsIHVybFNlcGFyYXRvciwgaXRlcmF0b3JOYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBwYWdlcyA9IE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlLmJvZHkucGFnaW5nKTtcbiAgICAgICAgcmV0dXJuIHBhZ2VzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBfYSkge1xuICAgICAgICAgICAgdmFyIGlkID0gX2FbMF0sIHBhZ2VVcmwgPSBfYVsxXTtcbiAgICAgICAgICAgIGFjY1tpZF0gPSBfdGhpcy5wYXJzZVBhZ2UoaWQsIHBhZ2VVcmwsIHVybFNlcGFyYXRvciwgaXRlcmF0b3JOYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9O1xuICAgIE5hdmlnYXRpb25UaHJ1UGFnZXMucHJvdG90eXBlLnVwZGF0ZVVybEFuZFF1ZXJ5ID0gZnVuY3Rpb24gKGNsaWVudFVybCwgcXVlcnkpIHtcbiAgICAgICAgdmFyIHVybCA9IGNsaWVudFVybDtcbiAgICAgICAgdmFyIHF1ZXJ5Q29weSA9IF9fYXNzaWduKHt9LCBxdWVyeSk7XG4gICAgICAgIGlmIChxdWVyeUNvcHkucGFnZSkge1xuICAgICAgICAgICAgdXJsID0gdXJsam9pbihjbGllbnRVcmwsIHF1ZXJ5Q29weS5wYWdlKTtcbiAgICAgICAgICAgIGRlbGV0ZSBxdWVyeUNvcHkucGFnZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICB1cGRhdGVkUXVlcnk6IHF1ZXJ5Q29weVxuICAgICAgICB9O1xuICAgIH07XG4gICAgTmF2aWdhdGlvblRocnVQYWdlcy5wcm90b3R5cGUucmVxdWVzdExpc3RXaXRoUGFnZXMgPSBmdW5jdGlvbiAoY2xpZW50VXJsLCBxdWVyeSwgTW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hLCB1cmwsIHVwZGF0ZWRRdWVyeSwgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHRoaXMudXBkYXRlVXJsQW5kUXVlcnkoY2xpZW50VXJsLCBxdWVyeSksIHVybCA9IF9hLnVybCwgdXBkYXRlZFF1ZXJ5ID0gX2EudXBkYXRlZFF1ZXJ5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJlcXVlc3QpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCh1cmwsIHVwZGF0ZWRRdWVyeSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1vZGVsIGhlcmUgaXMgdXN1YWxseSB1bmRlZmluZWQgZXhjZXB0IGZvciBTdXBwcmVzc2lvbiBDbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSwgTW9kZWwpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiA1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiAnUmVxdWVzdCBwcm9wZXJ0eSBpcyBlbXB0eScsXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB7IG1lc3NhZ2U6ICcnIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE5hdmlnYXRpb25UaHJ1UGFnZXM7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgTmF2aWdhdGlvblRocnVQYWdlcztcbiIsImltcG9ydCB7IF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG52YXIgRXZlbnRDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEV2ZW50Q2xpZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEV2ZW50Q2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgRXZlbnRDbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICcvJyk7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIEV2ZW50Q2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbignL3YzJywgZG9tYWluLCAnZXZlbnRzJyksIHF1ZXJ5KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRXZlbnRDbGllbnQ7XG59KE5hdmlnYXRpb25UaHJ1UGFnZXMpKTtcbmV4cG9ydCBkZWZhdWx0IEV2ZW50Q2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24gfSBmcm9tIFwidHNsaWJcIjtcbnZhciBTdGF0c0NvbnRhaW5lciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdGF0c0NvbnRhaW5lcihkYXRhKSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZShkYXRhLnN0YXJ0KTtcbiAgICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZShkYXRhLmVuZCk7XG4gICAgICAgIHRoaXMucmVzb2x1dGlvbiA9IGRhdGEucmVzb2x1dGlvbjtcbiAgICAgICAgdGhpcy5zdGF0cyA9IGRhdGEuc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0KSB7XG4gICAgICAgICAgICB2YXIgcmVzID0gX19hc3NpZ24oe30sIHN0YXQpO1xuICAgICAgICAgICAgcmVzLnRpbWUgPSBuZXcgRGF0ZShzdGF0LnRpbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBTdGF0c0NvbnRhaW5lcjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBTdGF0c0NvbnRhaW5lcjtcbiIsImltcG9ydCB7IF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBTdGF0c0NvbnRhaW5lciBmcm9tICcuL1N0YXRzQ29udGFpbmVyLmpzJztcbnZhciBTdGF0c0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdGF0c0NsaWVudChyZXF1ZXN0LCBsb2dnZXIpIHtcbiAgICAgICAgaWYgKGxvZ2dlciA9PT0gdm9pZCAwKSB7IGxvZ2dlciA9IGNvbnNvbGU7IH1cbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuICAgIFN0YXRzQ2xpZW50LnByb3RvdHlwZS5jb252ZXJ0RGF0ZVRvVVRDID0gZnVuY3Rpb24gKGtleSwgaW5wdXREYXRlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgQmVjYXVzZSBcIm5ldyBEYXRlKCcyMDIyLTEyLTI1VDAwOjAwOjAwLjAwMFonKVwiIGJlY29tZXMgXCJTdW4gRGVjIDI1IDIwMjIgMDI6MDA6MDAgR01UKzAyMDBcIlxuICAgICAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgICAgICBleDogJ1RodSwgMTMgT2N0IDIwMTEgMTg6MDI6MDAgKzAwMDAnLlxuICAgICAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFwiRGF0ZTpcXFwiXCIuY29uY2F0KGlucHV0RGF0ZSwgXCJcXFwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxcblZhbHVlIFxcXCJcIikuY29uY2F0KGlucHV0RGF0ZS50b1VUQ1N0cmluZygpLCBcIlxcXCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxcbkNvbnNpZGVyIHVzaW5nIHN0cmluZyB0eXBlIGZvciBwcm9wZXJ0eSBcXFwiXCIpLmNvbmNhdChrZXksIFwiXFxcIiB0byBhdm9pZCBhdXRvLWNvbnZlcnRpbmdcIikpO1xuICAgICAgICByZXR1cm4gW2tleSwgaW5wdXREYXRlLnRvVVRDU3RyaW5nKCldO1xuICAgIH07XG4gICAgU3RhdHNDbGllbnQucHJvdG90eXBlLnByZXBhcmVTZWFyY2hQYXJhbXMgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IFtdO1xuICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMgPSBPYmplY3QuZW50cmllcyhxdWVyeSkucmVkdWNlKGZ1bmN0aW9uIChhcnJheVdpdGhQYWlycywgY3VycmVudFBhaXIpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gY3VycmVudFBhaXJbMF0sIHZhbHVlID0gY3VycmVudFBhaXJbMV07XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCkgeyAvLyBldmVudDogWydkZWxpdmVyZWQnLCAnYWNjZXB0ZWQnXVxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVwZWF0ZWRQcm9wZXJ0eSA9IHZhbHVlLm1hcChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gW2tleSwgaXRlbV07IH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19zcHJlYWRBcnJheShfX3NwcmVhZEFycmF5KFtdLCBhcnJheVdpdGhQYWlycywgdHJ1ZSksIHJlcGVhdGVkUHJvcGVydHksIHRydWUpOyAvLyBbW2V2ZW50LGRlbGl2ZXJlZF0sIFtldmVudCxhY2NlcHRlZF1dXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlXaXRoUGFpcnMucHVzaChfdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKGtleSwgdmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5V2l0aFBhaXJzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheVdpdGhQYWlycztcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VhcmNoUGFyYW1zO1xuICAgIH07XG4gICAgU3RhdHNDbGllbnQucHJvdG90eXBlLnBhcnNlU3RhdHMgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdGF0c0NvbnRhaW5lcihyZXNwb25zZS5ib2R5KTtcbiAgICB9O1xuICAgIFN0YXRzQ2xpZW50LnByb3RvdHlwZS5nZXREb21haW4gPSBmdW5jdGlvbiAoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICB2YXIgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzJywgZG9tYWluLCAnc3RhdHMvdG90YWwnKSwgeyBzZWFyY2hQYXJhbXM6IHNlYXJjaFBhcmFtcyB9KVxuICAgICAgICAgICAgLnRoZW4odGhpcy5wYXJzZVN0YXRzKTtcbiAgICB9O1xuICAgIFN0YXRzQ2xpZW50LnByb3RvdHlwZS5nZXRBY2NvdW50ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3N0YXRzL3RvdGFsJywgeyBzZWFyY2hQYXJhbXM6IHNlYXJjaFBhcmFtcyB9KVxuICAgICAgICAgICAgLnRoZW4odGhpcy5wYXJzZVN0YXRzKTtcbiAgICB9O1xuICAgIHJldHVybiBTdGF0c0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBTdGF0c0NsaWVudDtcbiIsImV4cG9ydCB2YXIgUmVzb2x1dGlvbjtcbihmdW5jdGlvbiAoUmVzb2x1dGlvbikge1xuICAgIFJlc29sdXRpb25bXCJIT1VSXCJdID0gXCJob3VyXCI7XG4gICAgUmVzb2x1dGlvbltcIkRBWVwiXSA9IFwiZGF5XCI7XG4gICAgUmVzb2x1dGlvbltcIk1PTlRIXCJdID0gXCJtb250aFwiO1xufSkoUmVzb2x1dGlvbiB8fCAoUmVzb2x1dGlvbiA9IHt9KSk7XG5leHBvcnQgdmFyIFN1cHByZXNzaW9uTW9kZWxzO1xuKGZ1bmN0aW9uIChTdXBwcmVzc2lvbk1vZGVscykge1xuICAgIFN1cHByZXNzaW9uTW9kZWxzW1wiQk9VTkNFU1wiXSA9IFwiYm91bmNlc1wiO1xuICAgIFN1cHByZXNzaW9uTW9kZWxzW1wiQ09NUExBSU5UU1wiXSA9IFwiY29tcGxhaW50c1wiO1xuICAgIFN1cHByZXNzaW9uTW9kZWxzW1wiVU5TVUJTQ1JJQkVTXCJdID0gXCJ1bnN1YnNjcmliZXNcIjtcbiAgICBTdXBwcmVzc2lvbk1vZGVsc1tcIldISVRFTElTVFNcIl0gPSBcIndoaXRlbGlzdHNcIjtcbn0pKFN1cHByZXNzaW9uTW9kZWxzIHx8IChTdXBwcmVzc2lvbk1vZGVscyA9IHt9KSk7XG5leHBvcnQgdmFyIFdlYmhvb2tzSWRzO1xuKGZ1bmN0aW9uIChXZWJob29rc0lkcykge1xuICAgIFdlYmhvb2tzSWRzW1wiQ0xJQ0tFRFwiXSA9IFwiY2xpY2tlZFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiQ09NUExBSU5FRFwiXSA9IFwiY29tcGxhaW5lZFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiREVMSVZFUkVEXCJdID0gXCJkZWxpdmVyZWRcIjtcbiAgICBXZWJob29rc0lkc1tcIk9QRU5FRFwiXSA9IFwib3BlbmVkXCI7XG4gICAgV2ViaG9va3NJZHNbXCJQRVJNQU5FTlRfRkFJTFwiXSA9IFwicGVybWFuZW50X2ZhaWxcIjtcbiAgICBXZWJob29rc0lkc1tcIlRFTVBPUkFSWV9GQUlMXCJdID0gXCJ0ZW1wb3JhcnlfZmFpbFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiVU5TVUJTQ1JJQkVEXCJdID0gXCJ1bnN1YnNjcmliZVwiO1xufSkoV2ViaG9va3NJZHMgfHwgKFdlYmhvb2tzSWRzID0ge30pKTtcbmV4cG9ydCB2YXIgWWVzTm87XG4oZnVuY3Rpb24gKFllc05vKSB7XG4gICAgWWVzTm9bXCJZRVNcIl0gPSBcInllc1wiO1xuICAgIFllc05vW1wiTk9cIl0gPSBcIm5vXCI7XG59KShZZXNObyB8fCAoWWVzTm8gPSB7fSkpO1xuIiwidmFyIFN1cHByZXNzaW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN1cHByZXNzaW9uKHR5cGUpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgcmV0dXJuIFN1cHByZXNzaW9uO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFN1cHByZXNzaW9uO1xuIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zL2luZGV4LmpzJztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uLmpzJztcbnZhciBCb3VuY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJvdW5jZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCb3VuY2UoZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBTdXBwcmVzc2lvbk1vZGVscy5CT1VOQ0VTKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgICBfdGhpcy5jb2RlID0gK2RhdGEuY29kZTtcbiAgICAgICAgX3RoaXMuZXJyb3IgPSBkYXRhLmVycm9yO1xuICAgICAgICBfdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQm91bmNlO1xufShTdXBwcmVzc2lvbikpO1xuZXhwb3J0IGRlZmF1bHQgQm91bmNlO1xuIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zL2luZGV4LmpzJztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uLmpzJztcbnZhciBDb21wbGFpbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbXBsYWludCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb21wbGFpbnQoZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBTdXBwcmVzc2lvbk1vZGVscy5DT01QTEFJTlRTKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgICBfdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQ29tcGxhaW50O1xufShTdXBwcmVzc2lvbikpO1xuZXhwb3J0IGRlZmF1bHQgQ29tcGxhaW50O1xuIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zL2luZGV4LmpzJztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uLmpzJztcbnZhciBVbnN1YnNjcmliZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVW5zdWJzY3JpYmUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVW5zdWJzY3JpYmUoZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBTdXBwcmVzc2lvbk1vZGVscy5VTlNVQlNDUklCRVMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICAgIF90aGlzLnRhZ3MgPSBkYXRhLnRhZ3M7XG4gICAgICAgIF90aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBVbnN1YnNjcmliZTtcbn0oU3VwcHJlc3Npb24pKTtcbmV4cG9ydCBkZWZhdWx0IFVuc3Vic2NyaWJlO1xuIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zL2luZGV4LmpzJztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uLmpzJztcbnZhciBXaGl0ZUxpc3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFdoaXRlTGlzdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBXaGl0ZUxpc3QoZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBTdXBwcmVzc2lvbk1vZGVscy5XSElURUxJU1RTKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgICAgIF90aGlzLnJlYXNvbiA9IGRhdGEucmVhc29uO1xuICAgICAgICBfdGhpcy5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRBdCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFdoaXRlTGlzdDtcbn0oU3VwcHJlc3Npb24pKTtcbmV4cG9ydCBkZWZhdWx0IFdoaXRlTGlzdDtcbiIsImltcG9ydCB7IF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciwgX19zcHJlYWRBcnJheSB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvci5qcyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG5pbXBvcnQgQm91bmNlIGZyb20gJy4vQm91bmNlLmpzJztcbmltcG9ydCBDb21wbGFpbnQgZnJvbSAnLi9Db21wbGFpbnQuanMnO1xuaW1wb3J0IFVuc3Vic2NyaWJlIGZyb20gJy4vVW5zdWJzY3JpYmUuanMnO1xuaW1wb3J0IFdoaXRlTGlzdCBmcm9tICcuL1doaXRlTGlzdC5qcyc7XG52YXIgU3VwcHJlc3Npb25DbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1cHByZXNzaW9uQ2xpZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1cHByZXNzaW9uQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLm1vZGVscyA9IHtcbiAgICAgICAgICAgIGJvdW5jZXM6IEJvdW5jZSxcbiAgICAgICAgICAgIGNvbXBsYWludHM6IENvbXBsYWludCxcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlczogVW5zdWJzY3JpYmUsXG4gICAgICAgICAgICB3aGl0ZWxpc3RzOiBXaGl0ZUxpc3QsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSwgTW9kZWwpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gKChfYSA9IHJlc3BvbnNlLmJvZHkuaXRlbXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIG5ldyBNb2RlbChpdGVtKTsgfSkpIHx8IFtdO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBTdXBwcmVzc2lvbkNsaWVudC5wcm90b3R5cGUuX3BhcnNlSXRlbSA9IGZ1bmN0aW9uIChkYXRhLCBNb2RlbCkge1xuICAgICAgICByZXR1cm4gbmV3IE1vZGVsKGRhdGEpO1xuICAgIH07XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLmNyZWF0ZVdoaXRlTGlzdCA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEsIGlzRGF0YUFycmF5KSB7XG4gICAgICAgIGlmIChpc0RhdGFBcnJheSkge1xuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0JywgJ1doaXRlbGlzdFxcJ3MgY3JlYXRpb24gcHJvY2VzcyBkb2VzIG5vdCBzdXBwb3J0IG11bHRpcGxlIGNyZWF0aW9ucy4gRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgICAgICAgLnBvc3RXaXRoRkQodXJsam9pbigndjMnLCBkb21haW4sICd3aGl0ZWxpc3RzJyksIGRhdGEpXG4gICAgICAgICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gICAgfTtcbiAgICBTdXBwcmVzc2lvbkNsaWVudC5wcm90b3R5cGUuY3JlYXRlVW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7IC8vIFVzZXIgcHJvdmlkZWQgYW4gYXJyYXlcbiAgICAgICAgICAgIHZhciBpc0NvbnRhaW5zVGFnID0gZGF0YS5zb21lKGZ1bmN0aW9uICh1bnN1YnNjcmliZSkgeyByZXR1cm4gdW5zdWJzY3JpYmUudGFnOyB9KTtcbiAgICAgICAgICAgIGlmIChpc0NvbnRhaW5zVGFnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignVGFnIHByb3BlcnR5IHNob3VsZCBub3QgYmUgdXNlZCBmb3IgY3JlYXRpbmcgbXVsdGlwbGUgdW5zdWJzY3JpYmVzLicsICdUYWcgcHJvcGVydHkgY2FuIGJlIHVzZWQgb25seSBpZiBvbmUgdW5zdWJzY3JpYmUgcHJvdmlkZWQgYXMgc2Vjb25kIGFyZ3VtZW50IG9mIGNyZWF0ZSBtZXRob2QuIFBsZWFzZSB1c2UgdGFncyBpbnN0ZWFkLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgICAgICAgICAgIC5wb3N0KHVybGpvaW4oJ3YzJywgZG9tYWluLCAndW5zdWJzY3JpYmVzJyksIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7IGlzQXBwbGljYXRpb25KU09OOiB0cnVlIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEudGFncykge1xuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignVGFncyBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHVzZWQgZm9yIGNyZWF0aW5nIG9uZSB1bnN1YnNjcmliZS4nLCAnVGFncyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCBpZiB5b3UgcHJvdmlkZXMgYW4gYXJyYXkgb2YgdW5zdWJzY3JpYmVzIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kLiBQbGVhc2UgdXNlIHRhZyBpbnN0ZWFkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS50YWcpKSB7XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdUYWcgcHJvcGVydHkgY2FuIG5vdCBiZSBhbiBhcnJheScsICdQbGVhc2UgdXNlIGFycmF5IG9mIHVuc3Vic2NyaWJlcyBhcyBzZWNvbmQgYXJndW1lbnQgb2YgY3JlYXRlIG1ldGhvZCB0byBiZSBhYmxlIHRvIHByb3ZpZGUgZmV3IHRhZ3MnKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBXZSBuZWVkIEZvcm0gRGF0YSBmb3IgdW5zdWJzY3JpYmVzIGlmIHdlIHdhbnQgdG8gc3VwcG9ydCB0aGUgXCJ0YWdcIiBwcm9wZXJ0eSAqL1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAgICAgICAucG9zdFdpdGhGRCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3Vuc3Vic2NyaWJlcycpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICAgIH07XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLmdldE1vZGVsID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUgaW4gdGhpcy5tb2RlbHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdVbmtub3duIHR5cGUgdmFsdWUnLCAnVHlwZSBtYXkgYmUgb25seSBvbmUgb2YgW2JvdW5jZXMsIGNvbXBsYWludHMsIHVuc3Vic2NyaWJlcywgd2hpdGVsaXN0c10nKTtcbiAgICB9O1xuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5wcmVwYXJlUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgICAgICAgIHR5cGU6IHJlc3BvbnNlLmJvZHkudHlwZSB8fCAnJyxcbiAgICAgICAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKGRvbWFpbiwgdHlwZSwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG1vZGVsO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIG1vZGVsID0gdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIHF1ZXJ5LCBtb2RlbCldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkb21haW4sIHR5cGUsIGFkZHJlc3MpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgICAgICAgLmdldCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSwgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gX3RoaXMuX3BhcnNlSXRlbShyZXNwb25zZS5ib2R5LCBtb2RlbCk7IH0pO1xuICAgIH07XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIHR5cGUsIGRhdGEpIHtcbiAgICAgICAgdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICAgICAgLy8gc3VwcG9ydHMgYWRkaW5nIG11bHRpcGxlIHN1cHByZXNzaW9ucyBieSBkZWZhdWx0XG4gICAgICAgIHZhciBwb3N0RGF0YTtcbiAgICAgICAgdmFyIGlzRGF0YUFycmF5ID0gQXJyYXkuaXNBcnJheShkYXRhKTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICd3aGl0ZWxpc3RzJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlV2hpdGVMaXN0KGRvbWFpbiwgZGF0YSwgaXNEYXRhQXJyYXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSAndW5zdWJzY3JpYmVzJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVW5zdWJzY3JpYmUoZG9tYWluLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRGF0YUFycmF5KSB7XG4gICAgICAgICAgICBwb3N0RGF0YSA9IFtkYXRhXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBvc3REYXRhID0gX19zcHJlYWRBcnJheShbXSwgZGF0YSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgICAgICAgLnBvc3QodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBKU09OLnN0cmluZ2lmeShwb3N0RGF0YSksIHsgaXNBcHBsaWNhdGlvbkpTT046IHRydWUgfSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgICB9O1xuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGRvbWFpbiwgdHlwZSwgYWRkcmVzcykge1xuICAgICAgICB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAgICAgICAuZGVsZXRlKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiAoe1xuICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgICAgICAgdmFsdWU6IHJlc3BvbnNlLmJvZHkudmFsdWUgfHwgJycsXG4gICAgICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5ib2R5LmFkZHJlc3MgfHwgJycsXG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICB9KTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3VwcHJlc3Npb25DbGllbnQ7XG59KE5hdmlnYXRpb25UaHJ1UGFnZXMpKTtcbmV4cG9ydCBkZWZhdWx0IFN1cHByZXNzaW9uQ2xpZW50O1xuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xudmFyIFdlYmhvb2sgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gV2ViaG9vayhpZCwgdXJsLCB1cmxzKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMudXJscyA9IHVybHM7XG4gICAgfVxuICAgIHJldHVybiBXZWJob29rO1xufSgpKTtcbmV4cG9ydCB7IFdlYmhvb2sgfTtcbnZhciBXZWJob29rc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXZWJob29rc0NsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIFdlYmhvb2tzQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VXZWJob29rTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS53ZWJob29rcztcbiAgICB9O1xuICAgIFdlYmhvb2tzQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VXZWJob29rV2l0aElEID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHZhciB3ZWJob29rUmVzcG9uc2UgPSAoX2EgPSByZXNwb25zZSA9PT0gbnVsbCB8fCByZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzcG9uc2UuYm9keSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLndlYmhvb2s7XG4gICAgICAgICAgICB2YXIgdXJsID0gd2ViaG9va1Jlc3BvbnNlID09PSBudWxsIHx8IHdlYmhvb2tSZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2ViaG9va1Jlc3BvbnNlLnVybDtcbiAgICAgICAgICAgIHZhciB1cmxzID0gd2ViaG9va1Jlc3BvbnNlID09PSBudWxsIHx8IHdlYmhvb2tSZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2ViaG9va1Jlc3BvbnNlLnVybHM7XG4gICAgICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgICAgIHVybCA9IHVybHMgJiYgdXJscy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgPyB1cmxzWzBdXG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCghdXJscyB8fCB1cmxzLmxlbmd0aCA9PT0gMCkgJiYgdXJsKSB7XG4gICAgICAgICAgICAgICAgdXJscyA9IFt1cmxdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBXZWJob29rKGlkLCB1cmwsIHVybHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgV2ViaG9va3NDbGllbnQucHJvdG90eXBlLl9wYXJzZVdlYmhvb2tUZXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RlOiByZXNwb25zZS5ib2R5LmNvZGUsXG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFdlYmhvb2tzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCBxdWVyeSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va0xpc3QpO1xuICAgIH07XG4gICAgV2ViaG9va3NDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkb21haW4sIGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgICB9O1xuICAgIFdlYmhvb2tzQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCBpZCwgdXJsLCB0ZXN0KSB7XG4gICAgICAgIGlmICh0ZXN0ID09PSB2b2lkIDApIHsgdGVzdCA9IGZhbHNlOyB9XG4gICAgICAgIGlmICh0ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQsICd0ZXN0JyksIHsgdXJsOiB1cmwgfSlcbiAgICAgICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tUZXN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCB7IGlkOiBpZCwgdXJsOiB1cmwgfSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICAgIH07XG4gICAgV2ViaG9va3NDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIGlkLCB1cmxWYWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSwgeyB1cmw6IHVybFZhbHVlcyB9KVxuICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gICAgfTtcbiAgICBXZWJob29rc0NsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkb21haW4sIGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgICB9O1xuICAgIHJldHVybiBXZWJob29rc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBXZWJob29rc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9jb21tb24vRXJyb3IuanMnO1xudmFyIE1lc3NhZ2VzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1lc3NhZ2VzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgTWVzc2FnZXNDbGllbnQucHJvdG90eXBlLnByZXBhcmVCb29sZWFuVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHllc05vUHJvcGVydGllcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgJ286dGVzdG1vZGUnLFxuICAgICAgICAgICAgJ3Q6dGV4dCcsXG4gICAgICAgICAgICAnbzpka2ltJyxcbiAgICAgICAgICAgICdvOnRyYWNraW5nJyxcbiAgICAgICAgICAgICdvOnRyYWNraW5nLWNsaWNrcycsXG4gICAgICAgICAgICAnbzp0cmFja2luZy1vcGVucycsXG4gICAgICAgICAgICAnbzpyZXF1aXJlLXRscycsXG4gICAgICAgICAgICAnbzpza2lwLXZlcmlmaWNhdGlvbidcbiAgICAgICAgXSk7XG4gICAgICAgIGlmICghZGF0YSB8fCBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ01lc3NhZ2UgZGF0YSBvYmplY3QgY2FuIG5vdCBiZSBlbXB0eScsICdNZXNzYWdlIGRhdGEgb2JqZWN0IGNhbiBub3QgYmUgZW1wdHknKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICAgICAgaWYgKHllc05vUHJvcGVydGllcy5oYXMoa2V5KSAmJiB0eXBlb2YgZGF0YVtrZXldID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGRhdGFba2V5XSA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgIH07XG4gICAgTWVzc2FnZXNDbGllbnQucHJvdG90eXBlLl9wYXJzZVJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3BvbnNlLmJvZHkpO1xuICAgIH07XG4gICAgTWVzc2FnZXNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKFwiL3YzL1wiLmNvbmNhdChkb21haW4sIFwiL21lc3NhZ2VzLm1pbWVcIiksIGRhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1vZGlmaWVkRGF0YSA9IHRoaXMucHJlcGFyZUJvb2xlYW5WYWx1ZXMoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChcIi92My9cIi5jb25jYXQoZG9tYWluLCBcIi9tZXNzYWdlc1wiKSwgbW9kaWZpZWREYXRhKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gICAgfTtcbiAgICByZXR1cm4gTWVzc2FnZXNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZXNDbGllbnQ7XG4iLCJ2YXIgUm91dGVzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJvdXRlc0NsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIFJvdXRlc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3JvdXRlcycsIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5Lml0ZW1zOyB9KTtcbiAgICB9O1xuICAgIFJvdXRlc0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KFwiL3YzL3JvdXRlcy9cIi5jb25jYXQoaWQpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5LnJvdXRlOyB9KTtcbiAgICB9O1xuICAgIFJvdXRlc0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvcm91dGVzJywgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keS5yb3V0ZTsgfSk7XG4gICAgfTtcbiAgICBSb3V0ZXNDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChpZCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChcIi92My9yb3V0ZXMvXCIuY29uY2F0KGlkKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keTsgfSk7XG4gICAgfTtcbiAgICBSb3V0ZXNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoXCIvdjMvcm91dGVzL1wiLmNvbmNhdChpZCkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFJvdXRlc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBSb3V0ZXNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgVmFsaWRhdGVDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVmFsaWRhdGVDbGllbnQocmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMubXVsdGlwbGVWYWxpZGF0aW9uID0gbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50O1xuICAgIH1cbiAgICBWYWxpZGF0ZUNsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGFkZHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5LCByZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeSA9IHsgYWRkcmVzczogYWRkcmVzcyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUnLCBxdWVyeSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzdWx0LmJvZHldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBWYWxpZGF0ZUNsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0ZUNsaWVudDtcbiIsImltcG9ydCB7IF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBJcHNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSXBzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgSXBzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2lwcycsIHF1ZXJ5KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucGFyc2VJcHNSZXNwb25zZShyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIElwc0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlwKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldChcIi92My9pcHMvXCIuY29uY2F0KGlwKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnBhcnNlSXBzUmVzcG9uc2UocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJcHNDbGllbnQucHJvdG90eXBlLnBhcnNlSXBzUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gICAgfTtcbiAgICByZXR1cm4gSXBzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IElwc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgSXBQb29sc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJcFBvb2xzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgSXBQb29sc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92MS9pcF9wb29scycpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIF90aGlzLnBhcnNlSXBQb29sc1Jlc3BvbnNlKHJlc3BvbnNlKTsgfSk7XG4gICAgfTtcbiAgICBJcFBvb2xzQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjEvaXBfcG9vbHMnLCBkYXRhKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSwgcmVzcG9uc2UuYm9keSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIElwUG9vbHNDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChwb29sSWQsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucGF0Y2hXaXRoRkQoXCIvdjEvaXBfcG9vbHMvXCIuY29uY2F0KHBvb2xJZCksIGRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9LCByZXNwb25zZS5ib2R5KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSXBQb29sc0NsaWVudC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHBvb2xJZCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5kZWxldGUoXCIvdjEvaXBfcG9vbHMvXCIuY29uY2F0KHBvb2xJZCksIGRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9LCByZXNwb25zZS5ib2R5KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSXBQb29sc0NsaWVudC5wcm90b3R5cGUucGFyc2VJcFBvb2xzUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSwgcmVzcG9uc2UuYm9keSk7XG4gICAgfTtcbiAgICByZXR1cm4gSXBQb29sc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBJcFBvb2xzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xudmFyIE1haWxpbmdMaXN0c0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbGluZ0xpc3RzQ2xpZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE1haWxpbmdMaXN0c0NsaWVudChyZXF1ZXN0LCBtZW1iZXJzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBfdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgICAgICAgX3RoaXMubWVtYmVycyA9IG1lbWJlcnM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS5wYXJzZVZhbGlkYXRpb25SZXN1bHQgPSBmdW5jdGlvbiAoc3RhdHVzLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyxcbiAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHQ6IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkYXRhKSwgeyBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQgKiAxMDAwKSAvLyBhZGQgbWlsbGlzZWNvbmQgdG8gVW5peCB0aW1lc3RhbXBcbiAgICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIE1haWxpbmdMaXN0c0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUsIFwiL3BhZ2VzXCIpLCBxdWVyeSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHkubGlzdDsgfSk7XG4gICAgfTtcbiAgICBNYWlsaW5nTGlzdHNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh0aGlzLmJhc2VSb3V0ZSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keS5saXN0OyB9KTtcbiAgICB9O1xuICAgIE1haWxpbmdMaXN0c0NsaWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcywgZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5Lmxpc3Q7IH0pO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5OyB9KTtcbiAgICB9O1xuICAgIE1haWxpbmdMaXN0c0NsaWVudC5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL3ZhbGlkYXRlXCIpLCB7fSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gKF9fYXNzaWduKHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSwgcmVzcG9uc2UuYm9keSkpOyB9KTtcbiAgICB9O1xuICAgIE1haWxpbmdMaXN0c0NsaWVudC5wcm90b3R5cGUudmFsaWRhdGlvblJlc3VsdCA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUsIFwiL1wiKS5jb25jYXQobWFpbExpc3RBZGRyZXNzLCBcIi92YWxpZGF0ZVwiKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gX3RoaXMucGFyc2VWYWxpZGF0aW9uUmVzdWx0KHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuYm9keSk7IH0pO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS5jYW5jZWxWYWxpZGF0aW9uID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL3ZhbGlkYXRlXCIpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiAoe1xuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICAgICAgfSk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE1haWxpbmdMaXN0c0NsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgTWFpbGluZ0xpc3RzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xudmFyIE1haWxMaXN0c01lbWJlcnMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1haWxMaXN0c01lbWJlcnMsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbExpc3RzTWVtYmVycyhyZXF1ZXN0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBfdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS5jaGVja0FuZFVwZGF0ZURhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgbmV3RGF0YSA9IF9fYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnZhcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBuZXdEYXRhLnZhcnMgPSBKU09OLnN0cmluZ2lmeShuZXdEYXRhLnZhcnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5zdWJzY3JpYmVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIG5ld0RhdGEuc3Vic2NyaWJlZCA9IGRhdGEuc3Vic2NyaWJlZCA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9O1xuICAgIE1haWxMaXN0c01lbWJlcnMucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS5saXN0TWVtYmVycyA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MsIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyhcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL21lbWJlcnMvcGFnZXNcIiksIHF1ZXJ5KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS5nZXRNZW1iZXIgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzLCBtYWlsTGlzdE1lbWJlckFkZHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUsIFwiL1wiKS5jb25jYXQobWFpbExpc3RBZGRyZXNzLCBcIi9tZW1iZXJzL1wiKS5jb25jYXQobWFpbExpc3RNZW1iZXJBZGRyZXNzKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keS5tZW1iZXI7IH0pO1xuICAgIH07XG4gICAgTWFpbExpc3RzTWVtYmVycy5wcm90b3R5cGUuY3JlYXRlTWVtYmVyID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcywgZGF0YSkge1xuICAgICAgICB2YXIgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUsIFwiL1wiKS5jb25jYXQobWFpbExpc3RBZGRyZXNzLCBcIi9tZW1iZXJzXCIpLCByZXFEYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5Lm1lbWJlcjsgfSk7XG4gICAgfTtcbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS5jcmVhdGVNZW1iZXJzID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcywgZGF0YSkge1xuICAgICAgICB2YXIgbmV3RGF0YSA9IHtcbiAgICAgICAgICAgIG1lbWJlcnM6IEFycmF5LmlzQXJyYXkoZGF0YS5tZW1iZXJzKSA/IEpTT04uc3RyaW5naWZ5KGRhdGEubWVtYmVycykgOiBkYXRhLm1lbWJlcnMsXG4gICAgICAgICAgICB1cHNlcnQ6IGRhdGEudXBzZXJ0XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL21lbWJlcnMuanNvblwiKSwgbmV3RGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keTsgfSk7XG4gICAgfTtcbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS51cGRhdGVNZW1iZXIgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzLCBtYWlsTGlzdE1lbWJlckFkZHJlc3MsIGRhdGEpIHtcbiAgICAgICAgdmFyIHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUsIFwiL1wiKS5jb25jYXQobWFpbExpc3RBZGRyZXNzLCBcIi9tZW1iZXJzL1wiKS5jb25jYXQobWFpbExpc3RNZW1iZXJBZGRyZXNzKSwgcmVxRGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keS5tZW1iZXI7IH0pO1xuICAgIH07XG4gICAgTWFpbExpc3RzTWVtYmVycy5wcm90b3R5cGUuZGVzdHJveU1lbWJlciA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MsIG1haWxMaXN0TWVtYmVyQWRkcmVzcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL21lbWJlcnMvXCIpLmNvbmNhdChtYWlsTGlzdE1lbWJlckFkZHJlc3MpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5OyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBNYWlsTGlzdHNNZW1iZXJzO1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBNYWlsTGlzdHNNZW1iZXJzO1xuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xudmFyIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2RvbWFpbnMvJztcbiAgICB9XG4gICAgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQucHJvdG90eXBlLl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXRlbXM6IHJlc3BvbnNlLmJvZHkuaXRlbXMsXG4gICAgICAgICAgICB0b3RhbENvdW50OiByZXNwb25zZS5ib2R5LnRvdGFsX2NvdW50XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBEb21haW5DcmVkZW50aWFsc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlTWVzc2FnZVJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQucHJvdG90eXBlLl9wYXJzZURlbGV0ZWRSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgICBzcGVjOiByZXNwb25zZS5ib2R5LnNwZWNcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL2NyZWRlbnRpYWxzJyksIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlKS5jb25jYXQoZG9tYWluLCBcIi9jcmVkZW50aWFsc1wiKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCBjcmVkZW50aWFsc0xvZ2luLCBkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlKS5jb25jYXQoZG9tYWluLCBcIi9jcmVkZW50aWFscy9cIikuY29uY2F0KGNyZWRlbnRpYWxzTG9naW4pLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZG9tYWluLCBjcmVkZW50aWFsc0xvZ2luKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlKS5jb25jYXQoZG9tYWluLCBcIi9jcmVkZW50aWFscy9cIikuY29uY2F0KGNyZWRlbnRpYWxzTG9naW4pKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlRGVsZXRlZFJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xuaW1wb3J0IEF0dGFjaG1lbnRzSGFuZGxlciBmcm9tICcuLi9jb21tb24vQXR0YWNobWVudHNIYW5kbGVyLmpzJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3IuanMnO1xudmFyIE11bHRpcGxlVmFsaWRhdGlvbkpvYiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNdWx0aXBsZVZhbGlkYXRpb25Kb2IoZGF0YSwgcmVzcG9uc2VTdGF0dXNDb2RlKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSBkYXRhLnF1YW50aXR5O1xuICAgICAgICB0aGlzLnJlY29yZHNQcm9jZXNzZWQgPSBkYXRhLnJlY29yZHNfcHJvY2Vzc2VkO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgICB0aGlzLnJlc3BvbnNlU3RhdHVzQ29kZSA9IHJlc3BvbnNlU3RhdHVzQ29kZTtcbiAgICAgICAgaWYgKGRhdGEuZG93bmxvYWRfdXJsKSB7XG4gICAgICAgICAgICB0aGlzLmRvd25sb2FkVXJsID0ge1xuICAgICAgICAgICAgICAgIGNzdjogKF9hID0gZGF0YS5kb3dubG9hZF91cmwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jc3YsXG4gICAgICAgICAgICAgICAganNvbjogKF9iID0gZGF0YS5kb3dubG9hZF91cmwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5qc29uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLnN1bW1hcnkpIHtcbiAgICAgICAgICAgIHRoaXMuc3VtbWFyeSA9IHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2hBbGw6IGRhdGEuc3VtbWFyeS5yZXN1bHQuY2F0Y2hfYWxsLFxuICAgICAgICAgICAgICAgICAgICBkZWxpdmVyYWJsZTogZGF0YS5zdW1tYXJ5LnJlc3VsdC5kZWxpdmVyYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgZG9Ob3RTZW5kOiBkYXRhLnN1bW1hcnkucmVzdWx0LmRvX25vdF9zZW5kLFxuICAgICAgICAgICAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBkYXRhLnN1bW1hcnkucmVzdWx0LnVuZGVsaXZlcmFibGUsXG4gICAgICAgICAgICAgICAgICAgIHVua25vd246IGRhdGEuc3VtbWFyeS5yZXN1bHQudW5rbm93blxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmlzazoge1xuICAgICAgICAgICAgICAgICAgICBoaWdoOiBkYXRhLnN1bW1hcnkucmlzay5oaWdoLFxuICAgICAgICAgICAgICAgICAgICBsb3c6IGRhdGEuc3VtbWFyeS5yaXNrLmxvdyxcbiAgICAgICAgICAgICAgICAgICAgbWVkaXVtOiBkYXRhLnN1bW1hcnkucmlzay5tZWRpdW0sXG4gICAgICAgICAgICAgICAgICAgIHVua25vd246IGRhdGEuc3VtbWFyeS5yaXNrLnVua25vd25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBNdWx0aXBsZVZhbGlkYXRpb25Kb2I7XG59KCkpO1xuZXhwb3J0IHsgTXVsdGlwbGVWYWxpZGF0aW9uSm9iIH07XG52YXIgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLmF0dGFjaG1lbnRzSGFuZGxlciA9IG5ldyBBdHRhY2htZW50c0hhbmRsZXIoKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQucHJvdG90eXBlLmhhbmRsZVJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3BvbnNlID09PSBudWxsIHx8IHJlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXNwb25zZS5ib2R5KTtcbiAgICB9O1xuICAgIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudC5wcm90b3R5cGUucGFyc2VMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEuam9icyA9IHJlc3BvbnNlLmJvZHkuam9icy5tYXAoZnVuY3Rpb24gKGpvYikgeyByZXR1cm4gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkpvYihqb2IsIHJlc3BvbnNlLnN0YXR1cyk7IH0pO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncGl2b3QnKTtcbiAgICAgICAgZGF0YS50b3RhbCA9IHJlc3BvbnNlLmJvZHkudG90YWw7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoJy92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsnLCBxdWVyeSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobGlzdElkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldChcIi92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvXCIuY29uY2F0KGxpc3RJZCkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3IE11bHRpcGxlVmFsaWRhdGlvbkpvYihyZXNwb25zZS5ib2R5LCByZXNwb25zZS5zdGF0dXMpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQucHJvdG90eXBlLmNvbnZlcnRUb0V4cGVjdGVkU2hhcGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YTtcbiAgICAgICAgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGRhdGEuZmlsZSkpIHtcbiAgICAgICAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IGRhdGEuZmlsZSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhLmZpbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiB7IGRhdGE6IGRhdGEuZmlsZSB9IH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0oZGF0YS5maWxlKSkge1xuICAgICAgICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHsgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZTogZGF0YS5maWxlIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXVsdGlwbGVWYWxpZGF0aW9uRGF0YTtcbiAgICB9O1xuICAgIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGxpc3RJZCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSwgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEgfHwgIWRhdGEuZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1wiZmlsZVwiIHByb3BlcnR5IGV4cGVjdGVkLicsICdNYWtlIHN1cmUgc2Vjb25kIGFyZ3VtZW50IGhhcyBcImZpbGVcIiBwcm9wZXJ0eS4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB0aGlzLmNvbnZlcnRUb0V4cGVjdGVkU2hhcGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChcIi92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvXCIuY29uY2F0KGxpc3RJZCksIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5oYW5kbGVSZXNwb25zZShyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChsaXN0SWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay9cIi5jb25jYXQobGlzdElkKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xudmFyIERvbWFpblRlbXBsYXRlSXRlbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb21haW5UZW1wbGF0ZUl0ZW0oZG9tYWluVGVtcGxhdGVGcm9tQVBJKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5uYW1lO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmNyZWF0ZWRBdCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQgPyBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0KSA6ICcnO1xuICAgICAgICB0aGlzLmNyZWF0ZWRCeSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQnk7XG4gICAgICAgIHRoaXMuaWQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuaWQ7XG4gICAgICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbikge1xuICAgICAgICAgICAgdGhpcy52ZXJzaW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb247XG4gICAgICAgICAgICBpZiAodGhpcy52ZXJzaW9uICYmIGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVyc2lvbi5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMgJiYgZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy52ZXJzaW9ucyA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5tYXAoZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gX19hc3NpZ24oe30sIHZlcnNpb24pO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5jcmVhdGVkQXQgPSBuZXcgRGF0ZSh2ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBEb21haW5UZW1wbGF0ZUl0ZW07XG59KCkpO1xuZXhwb3J0IHsgRG9tYWluVGVtcGxhdGVJdGVtIH07XG52YXIgRG9tYWluVGVtcGxhdGVzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhEb21haW5UZW1wbGF0ZXNDbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRG9tYWluVGVtcGxhdGVzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLmJhc2VSb3V0ZSA9ICcvdjMvJztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlQ3JlYXRpb25SZXNwb25zZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGRhdGEuYm9keS50ZW1wbGF0ZSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICAgICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5wYXJzZU11dGF0aW9uUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICAgICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC50ZW1wbGF0ZU5hbWUgPSBkYXRhLmJvZHkudGVtcGxhdGUubmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5wYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICAgICAgaWYgKGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgICAgICAgcmVzdWx0LnRlbXBsYXRlVmVyc2lvbiA9IHsgdGFnOiBkYXRhLmJvZHkudGVtcGxhdGUudmVyc2lvbi50YWcgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGQpOyB9KTtcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3AnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlc3BvbnNlLmJvZHkudGVtcGxhdGUpO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncCcpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChkb21haW4sIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIHF1ZXJ5KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkb21haW4sIHRlbXBsYXRlTmFtZSwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBxdWVyeSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VDcmVhdGlvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCB0ZW1wbGF0ZU5hbWUsIGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VNdXRhdGlvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGRvbWFpbiwgdGVtcGxhdGVOYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLnBhcnNlTXV0YXRpb25SZXNwb25zZShyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUuZGVzdHJveUFsbCA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VOb3RpZmljYXRpb25SZXNwb25zZShyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUubGlzdFZlcnNpb25zID0gZnVuY3Rpb24gKGRvbWFpbiwgdGVtcGxhdGVOYW1lLCBxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUuZ2V0VmVyc2lvbiA9IGZ1bmN0aW9uIChkb21haW4sIHRlbXBsYXRlTmFtZSwgdGFnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlcy5ib2R5LnRlbXBsYXRlKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLmNyZWF0ZVZlcnNpb24gPSBmdW5jdGlvbiAoZG9tYWluLCB0ZW1wbGF0ZU5hbWUsIGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIGRhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS51cGRhdGVWZXJzaW9uID0gZnVuY3Rpb24gKGRvbWFpbiwgdGVtcGxhdGVOYW1lLCB0YWcsIGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICBmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95VmVyc2lvbiA9IGZ1bmN0aW9uIChkb21haW4sIHRlbXBsYXRlTmFtZSwgdGFnKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEb21haW5UZW1wbGF0ZXNDbGllbnQ7XG59KE5hdmlnYXRpb25UaHJ1UGFnZXMpKTtcbmV4cG9ydCBkZWZhdWx0IERvbWFpblRlbXBsYXRlc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZXh0ZW5kcywgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLmpzJztcbnZhciBEb21haW5UYWcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9tYWluVGFnKHRhZ0luZm8pIHtcbiAgICAgICAgdGhpcy50YWcgPSB0YWdJbmZvLnRhZztcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ0luZm8uZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXNbJ2ZpcnN0LXNlZW4nXSA9IG5ldyBEYXRlKHRhZ0luZm9bJ2ZpcnN0LXNlZW4nXSk7XG4gICAgICAgIHRoaXNbJ2xhc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snbGFzdC1zZWVuJ10pO1xuICAgIH1cbiAgICByZXR1cm4gRG9tYWluVGFnO1xufSgpKTtcbmV4cG9ydCB7IERvbWFpblRhZyB9O1xudmFyIERvbWFpblRhZ1N0YXRpc3RpYyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb21haW5UYWdTdGF0aXN0aWModGFnU3RhdGlzdGljSW5mbykge1xuICAgICAgICB0aGlzLnRhZyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS50YWc7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSh0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhcnQpO1xuICAgICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5lbmQpO1xuICAgICAgICB0aGlzLnJlc29sdXRpb24gPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkucmVzb2x1dGlvbjtcbiAgICAgICAgdGhpcy5zdGF0cyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQpIHtcbiAgICAgICAgICAgIHZhciByZXMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc3RhdCksIHsgdGltZTogbmV3IERhdGUoc3RhdC50aW1lKSB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gRG9tYWluVGFnU3RhdGlzdGljO1xufSgpKTtcbmV4cG9ydCB7IERvbWFpblRhZ1N0YXRpc3RpYyB9O1xudmFyIERvbWFpblRhZ3NDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERvbWFpblRhZ3NDbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRG9tYWluVGFnc0NsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBfdGhpcy5iYXNlUm91dGUgPSAnL3YzLyc7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUucGFyc2VMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAodGFnSW5mbykgeyByZXR1cm4gbmV3IERvbWFpblRhZyh0YWdJbmZvKTsgfSk7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICd0YWcnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlVGFnU3RhdGlzdGljID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9tYWluVGFnU3RhdGlzdGljKHJlc3BvbnNlKTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnKSwgcXVlcnkpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkb21haW4sIHRhZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBuZXcgRG9tYWluVGFnKHJlcy5ib2R5KTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UYWdzQ2xpZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCB0YWcsIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSwgeyBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZG9tYWluLCB0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUpLmNvbmNhdChkb21haW4sIFwiL3RhZ3MvXCIpLmNvbmNhdCh0YWcpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlcy5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgICBzdGF0dXM6IHJlcy5zdGF0dXNcbiAgICAgICAgfSk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUuc3RhdGlzdGljID0gZnVuY3Rpb24gKGRvbWFpbiwgdGFnLCBxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzJyksIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlVGFnU3RhdGlzdGljKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUuY291bnRyaWVzID0gZnVuY3Rpb24gKGRvbWFpbiwgdGFnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9jb3VudHJpZXMnKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLnByb3ZpZGVycyA9IGZ1bmN0aW9uIChkb21haW4sIHRhZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvcHJvdmlkZXJzJykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UYWdzQ2xpZW50LnByb3RvdHlwZS5kZXZpY2VzID0gZnVuY3Rpb24gKGRvbWFpbiwgdGFnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9kZXZpY2VzJykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRG9tYWluVGFnc0NsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgRG9tYWluVGFnc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZXh0ZW5kcywgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uLy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLmpzJztcbnZhciBTZWVkc0xpc3RzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTZWVkc0xpc3RzQ2xpZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNlZWRzTGlzdHNDbGllbnQocmVxdWVzdCwgYXR0cmlidXRlcywgZmlsdGVycywgbG9nZ2VyKSB7XG4gICAgICAgIGlmIChsb2dnZXIgPT09IHZvaWQgMCkgeyBsb2dnZXIgPSBjb25zb2xlOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBfdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgICAgICAgX3RoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgICAgIF90aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5jb252ZXJ0RGF0ZVRvVVRDID0gZnVuY3Rpb24gKGtleSwgaW5wdXREYXRlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgQmVjYXVzZSBcIm5ldyBEYXRlKCcyMDIyLTEyLTI1VDAwOjAwOjAwLjAwMFonKVwiIGJlY29tZXMgXCJTdW4gRGVjIDI1IDIwMjIgMDI6MDA6MDAgR01UKzAyMDBcIlxuICAgICAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgICAgICBleDogJ1RodSwgMTMgT2N0IDIwMTEgMTg6MDI6MDAgKzAwMDAnLlxuICAgICAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFwiRGF0ZTogXFxcIlwiLmNvbmNhdChpbnB1dERhdGUsIFwiXFxcIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cXG5WYWx1ZSBcXFwiXCIpLmNvbmNhdChpbnB1dERhdGUudG9JU09TdHJpbmcoKSwgXCJcXFwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXFxcIlwiKS5jb25jYXQoa2V5LCBcIlxcXCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nXCIpKTtcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0ZS50b0lTT1N0cmluZygpO1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUucHJlcGFyZVF1ZXJ5RGF0YSA9IGZ1bmN0aW9uIChxdWVyeURhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHByb3BzRm9yUmVwbGFjZW1lbnQgPSBxdWVyeURhdGE7XG4gICAgICAgIHZhciByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICAgICAgdmFyIHByb3AgPSBrZXk7XG4gICAgICAgICAgICBpZiAoISFwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdICYmIHR5cGVvZiBwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHF1ZXJ5RGF0YVtwcm9wXTtcbiAgICAgICAgICAgICAgICBhY2NbcHJvcF0gPSBfdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKHByb3AsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBxdWVyeURhdGEpLCByZXBsYWNlZFByb3BzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIFNlZWRzTGlzdHNDbGllbnQucHJvdG90eXBlLnByZXBhcmVSZXN1bHQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHZhciBzZWVkTGlzdCA9IHRoaXMucHJlcGFyZVNlZWRMaXN0KGRhdGEuYm9keSk7XG4gICAgICAgIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBzZWVkTGlzdCksIHsgc3RhdHVzOiBkYXRhLnN0YXR1cyB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIFNlZWRzTGlzdHNDbGllbnQucHJvdG90eXBlLnByZXBhcmVTZWVkTGlzdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBzZWVkcztcbiAgICAgICAgdmFyIGhhbmRsZWRTZWVkTGlzdERhdGVzID0ge1xuICAgICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KSxcbiAgICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEudXBkYXRlZF9hdCksXG4gICAgICAgICAgICBsYXN0X3Jlc3VsdF9hdDogbmV3IERhdGUoZGF0YS5sYXN0X3Jlc3VsdF9hdCksXG4gICAgICAgIH07XG4gICAgICAgIGlmIChkYXRhLlNlZWRzKSB7XG4gICAgICAgICAgICBzZWVkcyA9IGRhdGEuU2VlZHMubWFwKGZ1bmN0aW9uIChzZWVkSXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWVkID0ge307XG4gICAgICAgICAgICAgICAgdmFyIGhhbmRsZWRTZWVkRGF0ZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLmNyZWF0ZWRfYXQpLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShzZWVkSXRlbS51cGRhdGVkX2F0KSxcbiAgICAgICAgICAgICAgICAgICAgbWF4X2VtYWlsX2NvdW50X2hpdF9hdDogbmV3IERhdGUoc2VlZEl0ZW0ubWF4X2VtYWlsX2NvdW50X2hpdF9hdCksXG4gICAgICAgICAgICAgICAgICAgIGxhc3Rfc2VudF90b19hdDogbmV3IERhdGUoc2VlZEl0ZW0ubGFzdF9zZW50X3RvX2F0KSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdF9kZWxpdmVyZWRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLmxhc3RfZGVsaXZlcmVkX2F0KSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHNlZWQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgc2VlZEl0ZW0pLCBoYW5kbGVkU2VlZERhdGVzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VlZHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWVkTGlzdCA9IF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCBkYXRhKSwgeyBTZWVkczogc2VlZHMgfSksIGhhbmRsZWRTZWVkTGlzdERhdGVzKTtcbiAgICAgICAgZGVsZXRlIHNlZWRMaXN0LklkO1xuICAgICAgICByZXR1cm4gc2VlZExpc3Q7XG4gICAgfTtcbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9O1xuICAgICAgICBkYXRhLml0ZW1zID0gKF9hID0gcmVzcG9uc2UuYm9keS5pdGVtcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gX3RoaXMucHJlcGFyZVNlZWRMaXN0KGl0ZW0pOyB9KTtcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnlEYXRhLCByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5RGF0YSA9IHRoaXMucHJlcGFyZVF1ZXJ5RGF0YShxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvaW5ib3gvc2VlZGxpc3RzJywgcXVlcnlEYXRhKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSkpLCB7IHN0YXR1czogMjAwIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCB1cGRhdGVkU2VlZHNMaXN0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y0L2luYm94L3NlZWRsaXN0cy9cIi5jb25jYXQoaWQpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZFNlZWRzTGlzdCA9IHRoaXMucHJlcGFyZVNlZWRMaXN0KHJlc3BvbnNlLmJvZHkuc2VlZGxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCB1cGRhdGVkU2VlZHNMaXN0KSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3Y0L2luYm94L3NlZWRsaXN0cycsIGRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wcmVwYXJlUmVzdWx0KHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGlkLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnB1dChcIi92NC9pbmJveC9zZWVkbGlzdHMvXCIuY29uY2F0KGlkKSwgZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnByZXBhcmVSZXN1bHQocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIi92NC9pbmJveC9zZWVkbGlzdHMvXCIuY29uY2F0KGlkKSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFNlZWRzTGlzdHNDbGllbnQ7XG59KE5hdmlnYXRpb25UaHJ1UGFnZXMpKTtcbmV4cG9ydCBkZWZhdWx0IFNlZWRzTGlzdHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIEluYm94UGxhY2VtZW50c0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbmJveFBsYWNlbWVudHNDbGllbnQocmVxdWVzdCwgc2VlZHNMaXN0c0NsaWVudCwgcmVzdWx0cywgcHJvdmlkZXJzKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMuc2VlZHNMaXN0cyA9IHNlZWRzTGlzdHNDbGllbnQ7XG4gICAgICAgIHRoaXMuc2VlZHNMaXN0cyA9IHNlZWRzTGlzdHNDbGllbnQ7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgICAgIHRoaXMucHJvdmlkZXJzID0gcHJvdmlkZXJzO1xuICAgIH1cbiAgICBJbmJveFBsYWNlbWVudHNDbGllbnQucHJvdG90eXBlLnJ1blRlc3QgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0KCcvdjQvaW5ib3gvdGVzdHMnLCBkYXRhKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXNwb25zZS5ib2R5KSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEluYm94UGxhY2VtZW50c0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBJbmJveFBsYWNlbWVudHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi8uLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG52YXIgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50KHJlcXVlc3QsIGF0dHJpYnV0ZXMsIGZpbHRlcnMsIHNoYXJpbmcsIGxvZ2dlcikge1xuICAgICAgICBpZiAobG9nZ2VyID09PSB2b2lkIDApIHsgbG9nZ2VyID0gY29uc29sZTsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCByZXF1ZXN0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgX3RoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgICAgIF90aGlzLmZpbHRlcnMgPSBmaWx0ZXJzO1xuICAgICAgICBfdGhpcy5zaGFyaW5nID0gc2hhcmluZztcbiAgICAgICAgX3RoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQucHJvdG90eXBlLmNvbnZlcnREYXRlVG9VVEMgPSBmdW5jdGlvbiAoa2V5LCBpbnB1dERhdGUpIHtcbiAgICAgICAgLypcbiAgICAgICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAgICAgKHBsdXMgMiBob3VycyBmcm9tIHRoZSB0aW1lem9uZSlcbiAgICAgICAgICBhbmQgYmVjYXVzZSBmb3IgQVBJLCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGRhdGUgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdFxuICAgICAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICAgICAgSGVyZSB3ZSB0cnkgYXV0by1jb252ZXJ0IHRoZW0gdG8gVVRDXG4gICAgICAgICovXG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJEYXRlOiBcXFwiXCIuY29uY2F0KGlucHV0RGF0ZSwgXCJcXFwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxcblZhbHVlIFxcXCJcIikuY29uY2F0KGlucHV0RGF0ZS50b0lTT1N0cmluZygpLCBcIlxcXCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxcbkNvbnNpZGVyIHVzaW5nIHN0cmluZyB0eXBlIGZvciBwcm9wZXJ0eSBcXFwiXCIpLmNvbmNhdChrZXksIFwiXFxcIiB0byBhdm9pZCBhdXRvLWNvbnZlcnRpbmdcIikpO1xuICAgICAgICByZXR1cm4gaW5wdXREYXRlLnRvSVNPU3RyaW5nKCk7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LnByb3RvdHlwZS5wcmVwYXJlUXVlcnlEYXRhID0gZnVuY3Rpb24gKHF1ZXJ5RGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcHJvcHNGb3JSZXBsYWNlbWVudCA9IHF1ZXJ5RGF0YTtcbiAgICAgICAgdmFyIHJlcGxhY2VkUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wc0ZvclJlcGxhY2VtZW50KS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IGtleTtcbiAgICAgICAgICAgIGlmICghIXByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gJiYgdHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcXVlcnlEYXRhW3Byb3BdO1xuICAgICAgICAgICAgICAgIGFjY1twcm9wXSA9IF90aGlzLmNvbnZlcnREYXRlVG9VVEMocHJvcCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgICAgICB2YXIgcmVzdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHF1ZXJ5RGF0YSksIHJlcGxhY2VkUHJvcHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC5wcm90b3R5cGUucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBib3ggPSB7fTtcbiAgICAgICAgdmFyIGhhbmRsZWRTZWVkTGlzdERhdGVzID0ge1xuICAgICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KSxcbiAgICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEudXBkYXRlZF9hdCksXG4gICAgICAgICAgICBzaGFyaW5nX2V4cGlyZXNfYXQ6IG5ldyBEYXRlKGRhdGEuc2hhcmluZ19leHBpcmVzX2F0KSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGRhdGEuQm94KSB7XG4gICAgICAgICAgICBib3ggPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YS5Cb3gpLCB7IGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuQm94LmNyZWF0ZWRfYXQpLCB1cGRhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLkJveC51cGRhdGVkX2F0KSwgbGFzdF9yZXN1bHRfYXQ6IG5ldyBEYXRlKGRhdGEuQm94Lmxhc3RfcmVzdWx0X2F0KSB9KTtcbiAgICAgICAgICAgIGRlbGV0ZSBib3guSUQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluYm94UGxhY2VtZW50c1Jlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCBkYXRhKSwgeyBCb3g6IGJveCB9KSwgaGFuZGxlZFNlZWRMaXN0RGF0ZXMpLCB7IGlkOiBkYXRhLklkIH0pO1xuICAgICAgICBkZWxldGUgaW5ib3hQbGFjZW1lbnRzUmVzdWx0LklEO1xuICAgICAgICByZXR1cm4gaW5ib3hQbGFjZW1lbnRzUmVzdWx0O1xuICAgIH07XG4gICAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC5wcm90b3R5cGUucGFyc2VMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gX3RoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChpdGVtKTsgfSk7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5RGF0YSwgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeURhdGEgPSB0aGlzLnByZXBhcmVRdWVyeURhdGEocXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2luYm94L3Jlc3VsdHMnLCBfX2Fzc2lnbih7fSwgcXVlcnlEYXRhKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UsIGluYm94UGxhY2VtZW50UmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y0L2luYm94L3Jlc3VsdHMvXCIuY29uY2F0KGlkKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluYm94UGxhY2VtZW50UmVzdWx0ID0gdGhpcy5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0KHJlc3BvbnNlLmJvZHkucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmJveFBsYWNlbWVudFJlc3VsdDogaW5ib3hQbGFjZW1lbnRSZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIi92NC9pbmJveC9yZXN1bHRzL1wiLmNvbmNhdChpZCkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9LCByZXNwb25zZS5ib2R5KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC5wcm90b3R5cGUuZ2V0UmVzdWx0QnlTaGFyZUlkID0gZnVuY3Rpb24gKHNoYXJlSWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlLCBpbmJveFBsYWNlbWVudFJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldChcIi92NC9pbmJveC9zaGFyaW5nL3B1YmxpYy9cIi5jb25jYXQoc2hhcmVJZCkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmJveFBsYWNlbWVudFJlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChyZXNwb25zZS5ib2R5LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5ib3hQbGFjZW1lbnRSZXN1bHQ6IGluYm94UGxhY2VtZW50UmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQ7XG59KE5hdmlnYXRpb25UaHJ1UGFnZXMpKTtcbmV4cG9ydCBkZWZhdWx0IEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudChyZXF1ZXN0LCBwYXRoKSB7XG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCh0aGlzLnBhdGgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiXCIuY29uY2F0KHRoaXMucGF0aCwgXCIvXCIpLmNvbmNhdChhdHRyaWJ1dGVOYW1lKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzcG9uc2UuYm9keSksIHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50KHJlcXVlc3QsIHBhdGgpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB9XG4gICAgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCh0aGlzLnBhdGgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXN1bHQuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWRfZmlsdGVyczogcmVzdWx0LmJvZHkuc3VwcG9ydGVkX2ZpbHRlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBJUFJTaGFyaW5nQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIElQUlNoYXJpbmdDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBJUFJTaGFyaW5nQ2xpZW50LnByb3RvdHlwZS5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0U2hhcmluZyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBoYW5kbGVkU2VlZExpc3REYXRlcyA9IHtcbiAgICAgICAgICAgIGV4cGlyZXNfYXQ6IG5ldyBEYXRlKGRhdGEuZXhwaXJlc19hdCksXG4gICAgICAgIH07XG4gICAgICAgIHZhciByZXN1bHQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YSksIGhhbmRsZWRTZWVkTGlzdERhdGVzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIElQUlNoYXJpbmdDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UsIHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldChcIi92NC9pbmJveC9zaGFyaW5nL1wiLmNvbmNhdChpZCkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHRTaGFyaW5nKHJlc3BvbnNlLmJvZHkuc2hhcmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9LCByZXN1bHQpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJUFJTaGFyaW5nQ2xpZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoaWQsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMsIHJlc3BvbnNlLCByZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0geyBxdWVyeTogXCJlbmFibGVkPVwiLmNvbmNhdChkYXRhLmVuYWJsZWQpIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucHV0KFwiL3Y0L2luYm94L3NoYXJpbmcvXCIuY29uY2F0KGlkKSwge30sIG9wdGlvbnMpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHRTaGFyaW5nKHJlc3BvbnNlLmJvZHkuc2hhcmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc3VsdCksIHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBJUFJTaGFyaW5nQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IElQUlNoYXJpbmdDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnBhdGggPSAnL3Y0L2luYm94L3Byb3ZpZGVycyc7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudC5wcm90b3R5cGUucGFyc2VMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZWRQcm92aWRlckRhdGVzID0ge1xuICAgICAgICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGl0ZW0uY3JlYXRlZF9hdCksXG4gICAgICAgICAgICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoaXRlbS51cGRhdGVkX2F0KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGl0ZW0pLCBoYW5kbGVkUHJvdmlkZXJEYXRlcyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQodGhpcy5wYXRoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucGFyc2VMaXN0KHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIE1ldHJpY3NDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWV0cmljc0NsaWVudChyZXF1ZXN0LCBsb2dnZXIpIHtcbiAgICAgICAgaWYgKGxvZ2dlciA9PT0gdm9pZCAwKSB7IGxvZ2dlciA9IGNvbnNvbGU7IH1cbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgfVxuICAgIE1ldHJpY3NDbGllbnQucHJvdG90eXBlLmNvbnZlcnREYXRlVG9VVEMgPSBmdW5jdGlvbiAoa2V5LCBpbnB1dERhdGUpIHtcbiAgICAgICAgLypcbiAgICAgICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAgICAgKHBsdXMgMiBob3VycyBmcm9tIHRoZSB0aW1lem9uZSlcbiAgICAgICAgICBhbmQgYmVjYXVzZSBmb3IgQVBJLCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGRhdGUgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdFxuICAgICAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICAgICAgSGVyZSB3ZSB0cnkgYXV0by1jb252ZXJ0IHRoZW0gdG8gVVRDXG4gICAgICAgICovXG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJEYXRlOlxcXCJcIi5jb25jYXQoaW5wdXREYXRlLCBcIlxcXCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXFxuVmFsdWUgXFxcIlwiKS5jb25jYXQoaW5wdXREYXRlLnRvVVRDU3RyaW5nKCksIFwiXFxcIiB3aWxsIGJlIHVzZWQgZm9yIHJlcXVlc3QuXFxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFxcXCJcIikuY29uY2F0KGtleSwgXCJcXFwiIHRvIGF2b2lkIGF1dG8tY29udmVydGluZ1wiKSk7XG4gICAgICAgIHJldHVybiBpbnB1dERhdGUudG9VVENTdHJpbmcoKTtcbiAgICB9O1xuICAgIE1ldHJpY3NDbGllbnQucHJvdG90eXBlLnByZXBhcmVRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICB2YXIgc3RhcnREYXRlO1xuICAgICAgICB2YXIgZW5kRGF0ZTtcbiAgICAgICAgaWYgKHF1ZXJ5KSB7XG4gICAgICAgICAgICB2YXIgcVN0YXJ0ID0gcXVlcnkgPT09IG51bGwgfHwgcXVlcnkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHF1ZXJ5LnN0YXJ0O1xuICAgICAgICAgICAgdmFyIHFFbmQgPSBxdWVyeSA9PT0gbnVsbCB8fCBxdWVyeSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcXVlcnkuZW5kO1xuICAgICAgICAgICAgc3RhcnREYXRlID0gcVN0YXJ0IGluc3RhbmNlb2YgRGF0ZSA/IHRoaXMuY29udmVydERhdGVUb1VUQygnc3RhcnQnLCBxU3RhcnQpIDogcVN0YXJ0ICE9PSBudWxsICYmIHFTdGFydCAhPT0gdm9pZCAwID8gcVN0YXJ0IDogJyc7XG4gICAgICAgICAgICBlbmREYXRlID0gcUVuZCAmJiBxRW5kIGluc3RhbmNlb2YgRGF0ZSA/IHRoaXMuY29udmVydERhdGVUb1VUQygnZW5kJywgcUVuZCkgOiBxRW5kICE9PSBudWxsICYmIHFFbmQgIT09IHZvaWQgMCA/IHFFbmQgOiAnJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHF1ZXJ5KSwgeyBzdGFydDogc3RhcnREYXRlLCBlbmQ6IGVuZERhdGUgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBNZXRyaWNzQ2xpZW50LnByb3RvdHlwZS5oYW5kbGVSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgcmVzQm9keSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgICAgIHZhciBzdGFydERhdGUgPSBEYXRlLnBhcnNlKHJlc0JvZHkuc3RhcnQpID8gbmV3IERhdGUocmVzQm9keS5zdGFydCkgOiBudWxsO1xuICAgICAgICB2YXIgZW5kRGF0ZSA9IERhdGUucGFyc2UocmVzQm9keS5lbmQpID8gbmV3IERhdGUocmVzQm9keS5lbmQpIDogbnVsbDtcbiAgICAgICAgdmFyIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXNCb2R5KSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cywgc3RhcnQ6IHN0YXJ0RGF0ZSwgZW5kOiBlbmREYXRlIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgTWV0cmljc0NsaWVudC5wcm90b3R5cGUuZ2V0QWNjb3VudCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnlEYXRhLCByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5RGF0YSA9IHRoaXMucHJlcGFyZVF1ZXJ5KHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0KCcvdjEvYW5hbHl0aWNzL21ldHJpY3MnLCBxdWVyeURhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5oYW5kbGVSZXNwb25zZShyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE1ldHJpY3NDbGllbnQucHJvdG90eXBlLmdldEFjY291bnRVc2FnZSA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnlEYXRhLCByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5RGF0YSA9IHRoaXMucHJlcGFyZVF1ZXJ5KHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0KCcvdjEvYW5hbHl0aWNzL3VzYWdlL21ldHJpY3MnLCBxdWVyeURhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5oYW5kbGVSZXNwb25zZShyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBNZXRyaWNzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE1ldHJpY3NDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xudmFyIERvbWFpblRyYWNraW5nQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvbWFpblRyYWNraW5nQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgRG9tYWluVHJhY2tpbmdDbGllbnQucHJvdG90eXBlLl9wYXJzZVRyYWNraW5nU2V0dGluZ3MgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkudHJhY2tpbmc7XG4gICAgfTtcbiAgICBEb21haW5UcmFja2luZ0NsaWVudC5wcm90b3R5cGUuX3BhcnNlVHJhY2tpbmdVcGRhdGUgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gICAgfTtcbiAgICBEb21haW5UcmFja2luZ0NsaWVudC5wcm90b3R5cGUuX2lzT3BlblRyYWNraW5nSW5mb1dpdFBsYWNlID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgJ3BsYWNlX2F0X3RoZV90b3AnIGluIG9iajtcbiAgICB9O1xuICAgIERvbWFpblRyYWNraW5nQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoZG9tYWluKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldChcIi92Mi94NTA5L1wiLmNvbmNhdChkb21haW4sIFwiL3N0YXR1c1wiKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzcG9uc2UuYm9keSksIHsgcmVzcG9uc2VTdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXMgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERvbWFpblRyYWNraW5nQ2xpZW50LnByb3RvdHlwZS5nZW5lcmF0ZSA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucG9zdChcIi92Mi94NTA5L1wiLmNvbmNhdChkb21haW4pKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXNwb25zZS5ib2R5KSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRG9tYWluVHJhY2tpbmdDbGllbnQucHJvdG90eXBlLnJlZ2VuZXJhdGUgPSBmdW5jdGlvbiAoZG9tYWluKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnB1dChcIi92Mi94NTA5L1wiLmNvbmNhdChkb21haW4pKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXNwb25zZS5ib2R5KSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRG9tYWluVHJhY2tpbmdDbGllbnQucHJvdG90eXBlLmdldFRyYWNraW5nID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyhyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERvbWFpblRyYWNraW5nQ2xpZW50LnByb3RvdHlwZS51cGRhdGVUcmFja2luZyA9IGZ1bmN0aW9uIChkb21haW4sIHR5cGUsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHByZXBhcmVkRGF0YSwgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVwYXJlZERhdGEgPSBfX2Fzc2lnbih7fSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEuYWN0aXZlKSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlcGFyZWREYXRhLmFjdGl2ZSA9IChkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEuYWN0aXZlKSA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc09wZW5UcmFja2luZ0luZm9XaXRQbGFjZShkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS5wbGFjZV9hdF90aGVfdG9wKSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXBhcmVkRGF0YS5wbGFjZV9hdF90aGVfdG9wID0gKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS5wbGFjZV9hdF90aGVfdG9wKSA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnLCB0eXBlKSwgcHJlcGFyZWREYXRhKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuX3BhcnNlVHJhY2tpbmdVcGRhdGUocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRG9tYWluVHJhY2tpbmdDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgRG9tYWluVHJhY2tpbmdDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiB9IGZyb20gXCJ0c2xpYlwiO1xuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0LmpzJztcbmltcG9ydCBEb21haW5zQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zQ2xpZW50LmpzJztcbmltcG9ydCBFdmVudENsaWVudCBmcm9tICcuL0V2ZW50cy5qcyc7XG5pbXBvcnQgU3RhdHNDbGllbnQgZnJvbSAnLi9TdGF0cy9TdGF0c0NsaWVudC5qcyc7XG5pbXBvcnQgU3VwcHJlc3Npb25DbGllbnQgZnJvbSAnLi9TdXBwcmVzc2lvbnMvU3VwcHJlc3Npb25zQ2xpZW50LmpzJztcbmltcG9ydCBXZWJob29rc0NsaWVudCBmcm9tICcuL1dlYmhvb2tzLmpzJztcbmltcG9ydCBNZXNzYWdlc0NsaWVudCBmcm9tICcuL01lc3NhZ2VzLmpzJztcbmltcG9ydCBSb3V0ZXNDbGllbnQgZnJvbSAnLi9Sb3V0ZXMuanMnO1xuaW1wb3J0IFZhbGlkYXRlQ2xpZW50IGZyb20gJy4vVmFsaWRhdGlvbnMvdmFsaWRhdGUuanMnO1xuaW1wb3J0IElwc0NsaWVudCBmcm9tICcuL0lQcy5qcyc7XG5pbXBvcnQgSXBQb29sc0NsaWVudCBmcm9tICcuL0lQUG9vbHMuanMnO1xuaW1wb3J0IE1haWxpbmdMaXN0c0NsaWVudCBmcm9tICcuL01haWxpbmdMaXN0cy9tYWlsaW5nTGlzdHMuanMnO1xuaW1wb3J0IE1haWxMaXN0c01lbWJlcnMgZnJvbSAnLi9NYWlsaW5nTGlzdHMvbWFpbExpc3RNZW1iZXJzLmpzJztcbmltcG9ydCBEb21haW5DcmVkZW50aWFsc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc0NyZWRlbnRpYWxzLmpzJztcbmltcG9ydCBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgZnJvbSAnLi9WYWxpZGF0aW9ucy9tdWx0aXBsZVZhbGlkYXRpb24uanMnO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc1RlbXBsYXRlcy5qcyc7XG5pbXBvcnQgRG9tYWluVGFnc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc1RhZ3MuanMnO1xuaW1wb3J0IFN1YmFjY291bnRzQ2xpZW50IGZyb20gJy4vU3ViYWNjb3VudHMuanMnO1xuaW1wb3J0IFNlZWRzTGlzdHNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50LmpzJztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvaW5ib3hQbGFjZW1lbnRzLmpzJztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC5qcyc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9BdHRyaWJ1dGVzQ2xpZW50LmpzJztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL0ZpbHRlcnNDbGllbnQuanMnO1xuaW1wb3J0IElQUlNoYXJpbmdDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudC5qcyc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL3Byb3ZpZGVycy9JbmJveFBsYWNlbWVudHNQcm92aWRlcnMuanMnO1xuaW1wb3J0IE1ldHJpY3NDbGllbnQgZnJvbSAnLi9NZXRyaWNzL01ldHJpY3NDbGllbnQuanMnO1xuaW1wb3J0IERvbWFpblRyYWNraW5nQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zVHJhY2tpbmcuanMnO1xudmFyIE1haWxndW5DbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFpbGd1bkNsaWVudChvcHRpb25zLCBmb3JtRGF0YSkge1xuICAgICAgICB2YXIgY29uZmlnID0gX19hc3NpZ24oe30sIG9wdGlvbnMpO1xuICAgICAgICBpZiAoIWNvbmZpZy51cmwpIHtcbiAgICAgICAgICAgIGNvbmZpZy51cmwgPSAnaHR0cHM6Ly9hcGkubWFpbGd1bi5uZXQnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uZmlnLnVzZXJuYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcInVzZXJuYW1lXCIgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbmZpZy5rZXkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwia2V5XCIgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLnVzZUZldGNoICYmIGNvbmZpZy5wcm94eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm94eSBjYW4gbm90IGJlIHVzZWQgd2l0aCBmZXRjaCBwcm92aWRlcicpO1xuICAgICAgICB9XG4gICAgICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gbmV3IFJlcXVlc3QoY29uZmlnLCBmb3JtRGF0YSk7XG4gICAgICAgIHZhciBtYWlsTGlzdHNNZW1iZXJzID0gbmV3IE1haWxMaXN0c01lbWJlcnModGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdmFyIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50ID0gbmV3IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHZhciBkb21haW5UZW1wbGF0ZXNDbGllbnQgPSBuZXcgRG9tYWluVGVtcGxhdGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHZhciBkb21haW5UYWdzQ2xpZW50ID0gbmV3IERvbWFpblRhZ3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdmFyIGRvbWFpblRyYWNraW5nQ2xpZW50ID0gbmV3IERvbWFpblRyYWNraW5nQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHZhciBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgPSBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHZhciBJbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudCA9IG5ldyBJUFJTaGFyaW5nQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHZhciBzZWVkc0xpc3RzQXR0cmlidXRlcyA9IG5ldyBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9zZWVkbGlzdHMvYScpO1xuICAgICAgICB2YXIgcmVzdWx0c0F0dHJpYnV0ZXNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvcmVzdWx0cy9hJyk7XG4gICAgICAgIHZhciBzZWVkc0xpc3RzRmlsdGVyc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9zZWVkbGlzdHMvX2ZpbHRlcnMnKTtcbiAgICAgICAgdmFyIHJlc3VsdHNGaWx0ZXJzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3Jlc3VsdHMvX2ZpbHRlcnMnKTtcbiAgICAgICAgdmFyIHNlZWRzTGlzdHNDbGllbnQgPSBuZXcgU2VlZHNMaXN0c0NsaWVudCh0aGlzLnJlcXVlc3QsIHNlZWRzTGlzdHNBdHRyaWJ1dGVzLCBzZWVkc0xpc3RzRmlsdGVyc0NsaWVudCk7XG4gICAgICAgIHZhciBpbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQodGhpcy5yZXF1ZXN0LCByZXN1bHRzQXR0cmlidXRlc0NsaWVudCwgcmVzdWx0c0ZpbHRlcnNDbGllbnQsIEluYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50KTtcbiAgICAgICAgdmFyIGluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5kb21haW5zID0gbmV3IERvbWFpbnNDbGllbnQodGhpcy5yZXF1ZXN0LCBkb21haW5DcmVkZW50aWFsc0NsaWVudCwgZG9tYWluVGVtcGxhdGVzQ2xpZW50LCBkb21haW5UYWdzQ2xpZW50LCBkb21haW5UcmFja2luZ0NsaWVudCk7XG4gICAgICAgIHRoaXMud2ViaG9va3MgPSBuZXcgV2ViaG9va3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0c0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLm1ldHJpY3MgPSBuZXcgTWV0cmljc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLnN1cHByZXNzaW9ucyA9IG5ldyBTdXBwcmVzc2lvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gbmV3IE1lc3NhZ2VzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMucm91dGVzID0gbmV3IFJvdXRlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLmlwcyA9IG5ldyBJcHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5pcF9wb29scyA9IG5ldyBJcFBvb2xzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMubGlzdHMgPSBuZXcgTWFpbGluZ0xpc3RzQ2xpZW50KHRoaXMucmVxdWVzdCwgbWFpbExpc3RzTWVtYmVycyk7XG4gICAgICAgIHRoaXMudmFsaWRhdGUgPSBuZXcgVmFsaWRhdGVDbGllbnQodGhpcy5yZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpO1xuICAgICAgICB0aGlzLnN1YmFjY291bnRzID0gbmV3IFN1YmFjY291bnRzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMuaW5ib3hQbGFjZW1lbnRzID0gbmV3IEluYm94UGxhY2VtZW50c0NsaWVudCh0aGlzLnJlcXVlc3QsIHNlZWRzTGlzdHNDbGllbnQsIGluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQsIGluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCk7XG4gICAgfVxuICAgIE1haWxndW5DbGllbnQucHJvdG90eXBlLnNldFN1YmFjY291bnQgPSBmdW5jdGlvbiAoc3ViYWNjb3VudElkKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5yZXF1ZXN0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0U3ViYWNjb3VudEhlYWRlcihzdWJhY2NvdW50SWQpO1xuICAgIH07XG4gICAgTWFpbGd1bkNsaWVudC5wcm90b3R5cGUucmVzZXRTdWJhY2NvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIChfYSA9IHRoaXMucmVxdWVzdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlc2V0U3ViYWNjb3VudEhlYWRlcigpO1xuICAgIH07XG4gICAgcmV0dXJuIE1haWxndW5DbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgTWFpbGd1bkNsaWVudDtcbiIsImltcG9ydCBNYWlsZ3VuQ2xpZW50IGZyb20gJy4vQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50LmpzJztcbnZhciBNYWlsZ3VuID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haWxndW4oRm9ybURhdGEpIHtcbiAgICAgICAgdGhpcy5mb3JtRGF0YSA9IEZvcm1EYXRhO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWFpbGd1biwgXCJkZWZhdWx0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgTWFpbGd1bi5wcm90b3R5cGUuY2xpZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYWlsZ3VuQ2xpZW50KG9wdGlvbnMsIHRoaXMuZm9ybURhdGEpO1xuICAgIH07XG4gICAgcmV0dXJuIE1haWxndW47XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgTWFpbGd1bjtcbiJdLCJuYW1lcyI6WyJ0aGlzIiwiaXNGdW5jdGlvbiIsIkF4aW9zRXJyb3IiLCJ1dGlscyIsInByb3RvdHlwZSIsInRvRm9ybURhdGEiLCJlbmNvZGUiLCJVUkxTZWFyY2hQYXJhbXMiLCJGb3JtRGF0YSIsIkJsb2IiLCJwbGF0Zm9ybSIsIkF4aW9zSGVhZGVycyIsImlzQ2FuY2VsIiwiQ2FuY2VsZWRFcnJvciIsIm1lcmdlQ29uZmlnIiwiUmVhZGFibGVTdHJlYW0iLCJmZXRjaEFkYXB0ZXIuZ2V0RmV0Y2giLCJWRVJTSU9OIiwidmFsaWRhdG9ycyIsIkF4aW9zIiwic3ByZWFkIiwiaXNBeGlvc0Vycm9yIiwiSHR0cFN0YXR1c0NvZGUiLCJDYW5jZWxUb2tlbiIsImdsb2JhbCIsImJhc2U2NC5lbmNvZGUiXSwibWFwcGluZ3MiOiI7OztJQUFBO0lBQ0E7QUFDQTtJQUNBO0lBQ0E7QUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtBQUNBO0lBQ0EsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ25DLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0lBQ3pDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMxRyxJQUFJLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDRjtJQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDaEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssSUFBSTtJQUM3QyxRQUFRLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7SUFDbEcsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0lBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RixDQUFDO0FBQ0Q7SUFDTyxJQUFJLFFBQVEsR0FBRyxXQUFXO0lBQ2pDLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFO0lBQ3JELFFBQVEsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDN0QsWUFBWSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLFlBQVksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsU0FBUztJQUNULFFBQVEsT0FBTyxDQUFDLENBQUM7SUFDakIsTUFBSztJQUNMLElBQUksT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzQyxFQUFDO0FBeUVEO0lBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0lBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0lBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtJQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5RSxLQUFLLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDRDtJQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxVQUFVLEdBQUcsUUFBUSxHQUFHLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEssSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtJQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUN0RSxRQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJO0lBQ3RELFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BELFlBQVksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0lBQzlDLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDeEUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7SUFDakUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7SUFDakUsZ0JBQWdCO0lBQ2hCLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO0lBQ2hJLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO0lBQzFHLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMs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QWMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO0lBQzlDLFFBQVEsR0FBRyxFQUFFLFlBQVksRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFO0lBQ3pDLFFBQVEsVUFBVSxFQUFFLEtBQUs7SUFDekIsUUFBUSxZQUFZLEVBQUU7SUFDdEIsS0FBSyxDQUFDO0lBQ04sSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFVLE9BQU8sRUFBRTtJQUNsRCxRQUFRLE9BQU8sSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDeEQsS0FBSztJQUNMLElBQUksT0FBTyxPQUFPO0lBQ2xCLENBQUMsRUFBRTs7Ozs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMjksMzAsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDAsNDEsNDIsNDMsNDQsNDUsNDYsNDcsNDgsNDksNTAsNTEsNTIsNTMsNTQsNTVdfQ==
