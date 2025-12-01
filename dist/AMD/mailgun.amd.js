// mailgun.js v12.2.0 Copyright (c) 2025 Mailgun and contributors
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
        SubaccountsClient.prototype.convertToDate = function (data) {
            var res = __assign(__assign({}, data), { created_at: new Date(data.created_at), updated_at: new Date(data.updated_at) });
            return res;
        };
        SubaccountsClient.prototype.list = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get('/v5/accounts/subaccounts', query)];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, {
                                    total: res.body.total,
                                    subaccounts: res.body.subaccounts.map(this.convertToDate)
                                }];
                    }
                });
            });
        };
        SubaccountsClient.prototype.get = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get("/v5/accounts/subaccounts/".concat(id))];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, {
                                    subaccount: this.convertToDate(res.body.subaccount)
                                }];
                    }
                });
            });
        };
        SubaccountsClient.prototype.create = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.postWithFD('/v5/accounts/subaccounts', { name: name })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, {
                                    subaccount: this.convertToDate(res.body.subaccount)
                                }];
                    }
                });
            });
        };
        SubaccountsClient.prototype.destroy = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            this.request.setSubaccountHeader(id);
                            return [4 /*yield*/, this.request.delete('/v5/accounts/subaccounts')];
                        case 1:
                            response = _a.sent();
                            this.request.resetSubaccountHeader();
                            return [2 /*return*/, response.body];
                        case 2:
                            error_1 = _a.sent();
                            this.request.resetSubaccountHeader();
                            throw error_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        SubaccountsClient.prototype.getMonthlySendingLimit = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get("/v5/accounts/subaccounts/".concat(id, "/limit/custom/monthly"))];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.body];
                    }
                });
            });
        };
        SubaccountsClient.prototype.setMonthlySendingLimit = function (id, limit) {
            return __awaiter(this, void 0, void 0, function () {
                var customLimit, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            customLimit = { query: "limit=".concat(limit) };
                            return [4 /*yield*/, this.request.put("/v5/accounts/subaccounts/".concat(id, "/limit/custom/monthly"), undefined, customLimit)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.body];
                    }
                });
            });
        };
        SubaccountsClient.prototype.updateSubaccountFeature = function (id, features) {
            return __awaiter(this, void 0, void 0, function () {
                var keys, readyFeatures, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            keys = ['email_preview', 'inbox_placement', 'sending', 'validations', 'validations_bulk'];
                            readyFeatures = keys.reduce(function (acc, currentFeatureName) {
                                if (currentFeatureName in features && typeof features[currentFeatureName] === 'boolean') {
                                    acc[currentFeatureName] = JSON.stringify({
                                        enabled: features[currentFeatureName]
                                    });
                                }
                                return acc;
                            }, {});
                            return [4 /*yield*/, this.request.put("/v5/accounts/subaccounts/".concat(id, "/features"), readyFeatures)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response.body];
                    }
                });
            });
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
                var options, params, fullUrl;
                return __generator(this, function (_b) {
                    options = __assign({}, onCallOptions);
                    params = {};
                    if (config === null || config === void 0 ? void 0 : config.isStorageAPI) {
                        fullUrl = url;
                    }
                    else {
                        fullUrl = urljoin(this.url, url);
                    }
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
                    return [2 /*return*/, this.requestProvider.makeRequest(fullUrl, method.toUpperCase(), params, config)];
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
        Request.prototype.delete = function (url, data, queryObject) {
            return this.command('delete', url, data, {}, { query: queryObject });
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
        function DomainsClient(request, domainCredentialsClient, domainTemplatesClient, domainTagsClient, domainTracking, domainKeysClient, logger) {
            if (logger === void 0) { logger = console; }
            this.request = request;
            this.domainCredentials = domainCredentialsClient;
            this.domainTemplates = domainTemplatesClient;
            this.domainTags = domainTagsClient;
            this.logger = logger;
            this.domainTracking = domainTracking;
            this.domainKeys = domainKeysClient;
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
        /**
        * @deprecated "domains.updateDKIMAuthority" method is deprecated,
        * and moved into the "domains.domainKeys.updateDKIMAuthority".
        * Current method will be removed in the future releases.
        */
        DomainsClient.prototype.updateDKIMAuthority = function (domain, data) {
            this.logger.warn('"domains.updateDKIMAuthority" method is deprecated. Please use "domains.domainKeys.updateDKIMAuthority" instead');
            return this.domainKeys.updateDKIMAuthority(domain, data);
        };
        /**
        * @deprecated "domains.updateDKIMSelector" method is deprecated,
        * and moved into the "domains.domainKeys.updateDKIMSelector".
        * Current method will be removed in the future releases.
        */
        DomainsClient.prototype.updateDKIMSelector = function (domain, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.logger.warn('"domains.updateDKIMSelector" method is deprecated. Please use domains.domainKeys.updateDKIMSelector instead');
                    return [2 /*return*/, this.domainKeys.updateDKIMSelector(domain, data)];
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
            if (!data || Object.keys(data).length === 0) {
                throw APIError.getUserDataError('Message data object can not be empty', 'Message data object can not be empty');
            }
            if (data.message) {
                return this.request.postWithFD("/v3/".concat(domain, "/messages.mime"), data)
                    .then(this._parseResponse);
            }
            var modifiedData = this.prepareBooleanValues(data);
            return this.request.postWithFD("/v3/".concat(domain, "/messages"), modifiedData)
                .then(this._parseResponse);
        };
        MessagesClient.prototype.retrieveStoredEmail = function (domain, storageKey) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get("/v3/domains/".concat(domain, "/messages/").concat(storageKey))];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.body];
                    }
                });
            });
        };
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
        MessagesClient.prototype.resendEmail = function (domain, storageKey, recipients) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.postWithFD("/v3/domains/".concat(domain, "/messages/").concat(storageKey), { to: recipients })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, this._parseResponse(res)];
                    }
                });
            });
        };
        MessagesClient.prototype.getMessagesQueueStatus = function (domain) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return __awaiter(this, void 0, void 0, function () {
                var res, apiResponse, result;
                return __generator(this, function (_l) {
                    switch (_l.label) {
                        case 0: return [4 /*yield*/, this.request.get("/v3/domains/".concat(domain, "/sending_queues"))];
                        case 1:
                            res = _l.sent();
                            apiResponse = res.body;
                            result = {
                                regular: {
                                    is_disabled: (_a = apiResponse.regular) === null || _a === void 0 ? void 0 : _a.is_disabled,
                                    disabled: {
                                        until: ((_c = (_b = apiResponse.regular) === null || _b === void 0 ? void 0 : _b.disabled) === null || _c === void 0 ? void 0 : _c.until) ? new Date(apiResponse.regular.disabled.until) : '',
                                        reason: ((_e = (_d = apiResponse.regular) === null || _d === void 0 ? void 0 : _d.disabled) === null || _e === void 0 ? void 0 : _e.reason) || '',
                                    }
                                },
                                scheduled: {
                                    is_disabled: (_f = apiResponse.scheduled) === null || _f === void 0 ? void 0 : _f.is_disabled,
                                    disabled: {
                                        until: ((_h = (_g = apiResponse.scheduled) === null || _g === void 0 ? void 0 : _g.disabled) === null || _h === void 0 ? void 0 : _h.until) ? new Date(apiResponse.scheduled.disabled.until) : '',
                                        reason: ((_k = (_j = apiResponse.scheduled) === null || _j === void 0 ? void 0 : _j.disabled) === null || _k === void 0 ? void 0 : _k.reason) || '',
                                    }
                                }
                            };
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /** Deletes all scheduled and undelivered mail from the domain queue.
         * https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/messages/delete-v3--domain-name--envelopes
        */
        MessagesClient.prototype.clearMessagesQueue = function (domain, storageUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var allowedStorageUrls, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            allowedStorageUrls = ['storage-us-east4.api.mailgun.net', 'storage-us-west1.api.mailgun.net', 'storage-europe-west1.api.mailgun.net'];
                            if (!allowedStorageUrls.includes(storageUrl)) {
                                throw APIError.getUserDataError('Invalid storage URL', 'The provided storage URL is not allowed.');
                            }
                            return [4 /*yield*/, this.request.command('delete', "https://".concat(storageUrl, "/v3/").concat(domain, "/envelopes"), undefined, { isStorageAPI: true })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.body];
                    }
                });
            });
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

    var DomainKeysClient = /** @class */ (function (_super) {
        __extends(DomainKeysClient, _super);
        function DomainKeysClient(request) {
            var _this = _super.call(this, request) || this;
            _this.request = request;
            _this.baseRoute = '/v3/domains/';
            return _this;
        }
        DomainKeysClient.prototype._parseDomainKeysList = function (response) {
            return {
                items: response.items,
            };
        };
        DomainKeysClient.prototype.parseList = function (response) {
            response.body.items;
            this.parsePageLinks(response, '?', 'page');
            response.status;
            return {
                items: response.body.items,
                pages: this.parsePageLinks(response, '?', 'page'),
                status: response.status || 200,
            };
        };
        DomainKeysClient.prototype.list = function (domainName) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.get(urljoin('v4/domains/', domainName, '/keys'))];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, this._parseDomainKeysList(res.body)), { status: res.status })];
                    }
                });
            });
        };
        DomainKeysClient.prototype.listAll = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var preparedQuery, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            preparedQuery = __assign(__assign(__assign({}, ((query === null || query === void 0 ? void 0 : query.signingDomain)
                                ? { signing_domain: encodeURIComponent(query.signingDomain) }
                                : {})), ((query === null || query === void 0 ? void 0 : query.selector) ? { selector: encodeURIComponent(query.selector) } : {})), { page: '', limit: '' });
                            return [4 /*yield*/, this.requestListWithPages(urljoin('/v1/dkim/keys'), preparedQuery)];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res];
                    }
                });
            });
        };
        DomainKeysClient.prototype.create = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var preparedData, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            preparedData = {
                                signing_domain: data.signingDomain,
                                selector: data.selector,
                            };
                            if (data.bits) {
                                preparedData.bits = data.bits;
                            }
                            if (data.pem) {
                                preparedData.pem = data.pem;
                            }
                            return [4 /*yield*/, this.request.postWithFD(urljoin('v1/dkim/keys'), preparedData)];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, __assign({ status: res.status }, res.body)];
                    }
                });
            });
        };
        DomainKeysClient.prototype.activate = function (domainName, selector) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.put("/v4/domains/".concat(domainName, "/keys/").concat(selector, "/activate"))];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, res.body), { status: res.status })];
                    }
                });
            });
        };
        DomainKeysClient.prototype.deactivate = function (domainName, selector) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.put("/v4/domains/".concat(domainName, "/keys/").concat(selector, "/deactivate"))];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, res.body), { status: res.status })];
                    }
                });
            });
        };
        DomainKeysClient.prototype.destroy = function (domain, selector) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.request.delete(urljoin('v1/dkim/keys'), undefined, { signing_domain: domain, selector: selector })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.body];
                    }
                });
            });
        };
        DomainKeysClient.prototype.updateDKIMSelector = function (domain, data) {
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
        DomainKeysClient.prototype.updateDKIMAuthority = function (domain, data) {
            return __awaiter(this, void 0, void 0, function () {
                var options;
                return __generator(this, function (_a) {
                    options = { query: "self=".concat(data.self) };
                    return [2 /*return*/, this.request.put("/v3/domains/".concat(domain, "/dkim_authority"), {}, options)
                            .then(function (res) { return res; })
                            .then(function (res) { return res.body; })];
                });
            });
        };
        return DomainKeysClient;
    }(NavigationThruPages));

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
            var domainKeysClient = new DomainKeysClient(this.request);
            var multipleValidationClient = new MultipleValidationClient(this.request);
            var InboxPlacementsResultsSharingClient = new IPRSharingClient(this.request);
            var seedsListsAttributes = new InboxPlacementsAttributesClient(this.request, '/v4/inbox/seedlists/a');
            var resultsAttributesClient = new InboxPlacementsAttributesClient(this.request, '/v4/inbox/results/a');
            var seedsListsFiltersClient = new InboxPlacementsFiltersClient(this.request, '/v4/inbox/seedlists/_filters');
            var resultsFiltersClient = new InboxPlacementsFiltersClient(this.request, '/v4/inbox/results/_filters');
            var seedsListsClient = new SeedsListsClient(this.request, seedsListsAttributes, seedsListsFiltersClient);
            var inboxPlacementsResultsClient = new InboxPlacementsResultsClient(this.request, resultsAttributesClient, resultsFiltersClient, InboxPlacementsResultsSharingClient);
            var inboxPlacementsProvidersClient = new InboxPlacementsProvidersClient(this.request);
            this.domains = new DomainsClient(this.request, domainCredentialsClient, domainTemplatesClient, domainTagsClient, domainTrackingClient, domainKeysClient);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbGd1bi5hbWQuanMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwiLi4vLi4vbGliL0NsYXNzZXMvY29tbW9uL0Vycm9yLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvY29tbW9uL0F0dGFjaG1lbnRzSGFuZGxlci50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL2NvbW1vbi9Gb3JtRGF0YUJ1aWxkZXIudHMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9udWxsLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvRm9ybURhdGEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9VUkxTZWFyY2hQYXJhbXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvY2xhc3Nlcy9Gb3JtRGF0YS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Jsb2IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2Jyb3dzZXIvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3BsYXRmb3JtL2NvbW1vbi91dGlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9VUkxFbmNvZGVkRm9ybS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zSGVhZGVycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZVByb3RvY29sLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwZWVkb21ldGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Rocm90dGxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9tZXJnZUNvbmZpZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdHJhY2tTdHJlYW0uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2ZldGNoLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy9hZGFwdGVycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2Vudi9kYXRhLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3ZhbGlkYXRvci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2Jhc2UtNjQvYmFzZTY0LmpzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3ViYWNjb3VudHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9jb21tb24vUmVxdWVzdFByb3ZpZGVycy9BeGlvc1Byb3ZpZGVyLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvY29tbW9uL1JlcXVlc3QudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbi50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRXZlbnRzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3RhdHMvU3RhdHNDb250YWluZXIudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdGF0cy9TdGF0c0NsaWVudC50cyIsIi4uLy4uL2xpYi9FbnVtcy9pbmRleC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbi50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9Cb3VuY2UudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvQ29tcGxhaW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1Vuc3Vic2NyaWJlLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1doaXRlTGlzdC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbnNDbGllbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9XZWJob29rcy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL01lc3NhZ2VzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvUm91dGVzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvVmFsaWRhdGlvbnMvdmFsaWRhdGUudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JUHMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JUFBvb2xzLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvTWFpbGluZ0xpc3RzL21haWxpbmdMaXN0cy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL01haWxpbmdMaXN0cy9tYWlsTGlzdE1lbWJlcnMudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNDcmVkZW50aWFscy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL1ZhbGlkYXRpb25zL211bHRpcGxlVmFsaWRhdGlvbi50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RlbXBsYXRlcy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RhZ3MudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL2luYm94UGxhY2VtZW50cy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvQXR0cmlidXRlc0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9GaWx0ZXJzQ2xpZW50LnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQudHMiLCIuLi8uLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvcHJvdmlkZXJzL0luYm94UGxhY2VtZW50c1Byb3ZpZGVycy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL01ldHJpY3MvTWV0cmljc0NsaWVudC50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RyYWNraW5nLnRzIiwiLi4vLi4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zS2V5cy50cyIsIi4uLy4uL2xpYi9DbGFzc2VzL01haWxndW5DbGllbnQudHMiLCIuLi8uLi9saWIvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xyXG4gICAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XHJcbiAgICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xyXG4gICAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XHJcbiAgICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcclxuICAgIHZhciBfLCBkb25lID0gZmFsc2U7XHJcbiAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XHJcbiAgICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcclxuICAgICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcclxuICAgICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xyXG4gICAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xyXG4gICAgZG9uZSA9IHRydWU7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xyXG4gICAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XHJcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XHJcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xyXG4gICAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbnZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xyXG4gICAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgdmFyIGFyID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcclxuICAgICAgICByZXR1cm4gYXI7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG93bktleXMobyk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xyXG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcclxuICAgICAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XHJcbiAgICAgICAgaWYgKGFzeW5jKSB7XHJcbiAgICAgICAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcclxuICAgICAgICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcclxuICAgICAgICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcclxuICAgICAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXN5bmMpIHtcclxuICAgICAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG5cclxufVxyXG5cclxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XHJcbiAgICBmdW5jdGlvbiBmYWlsKGUpIHtcclxuICAgICAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XHJcbiAgICAgICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHZhciByLCBzID0gMDtcclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBzIHw9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XHJcbiAgICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXRoO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBfX2V4dGVuZHM6IF9fZXh0ZW5kcyxcclxuICAgIF9fYXNzaWduOiBfX2Fzc2lnbixcclxuICAgIF9fcmVzdDogX19yZXN0LFxyXG4gICAgX19kZWNvcmF0ZTogX19kZWNvcmF0ZSxcclxuICAgIF9fcGFyYW06IF9fcGFyYW0sXHJcbiAgICBfX2VzRGVjb3JhdGU6IF9fZXNEZWNvcmF0ZSxcclxuICAgIF9fcnVuSW5pdGlhbGl6ZXJzOiBfX3J1bkluaXRpYWxpemVycyxcclxuICAgIF9fcHJvcEtleTogX19wcm9wS2V5LFxyXG4gICAgX19zZXRGdW5jdGlvbk5hbWU6IF9fc2V0RnVuY3Rpb25OYW1lLFxyXG4gICAgX19tZXRhZGF0YTogX19tZXRhZGF0YSxcclxuICAgIF9fYXdhaXRlcjogX19hd2FpdGVyLFxyXG4gICAgX19nZW5lcmF0b3I6IF9fZ2VuZXJhdG9yLFxyXG4gICAgX19jcmVhdGVCaW5kaW5nOiBfX2NyZWF0ZUJpbmRpbmcsXHJcbiAgICBfX2V4cG9ydFN0YXI6IF9fZXhwb3J0U3RhcixcclxuICAgIF9fdmFsdWVzOiBfX3ZhbHVlcyxcclxuICAgIF9fcmVhZDogX19yZWFkLFxyXG4gICAgX19zcHJlYWQ6IF9fc3ByZWFkLFxyXG4gICAgX19zcHJlYWRBcnJheXM6IF9fc3ByZWFkQXJyYXlzLFxyXG4gICAgX19zcHJlYWRBcnJheTogX19zcHJlYWRBcnJheSxcclxuICAgIF9fYXdhaXQ6IF9fYXdhaXQsXHJcbiAgICBfX2FzeW5jR2VuZXJhdG9yOiBfX2FzeW5jR2VuZXJhdG9yLFxyXG4gICAgX19hc3luY0RlbGVnYXRvcjogX19hc3luY0RlbGVnYXRvcixcclxuICAgIF9fYXN5bmNWYWx1ZXM6IF9fYXN5bmNWYWx1ZXMsXHJcbiAgICBfX21ha2VUZW1wbGF0ZU9iamVjdDogX19tYWtlVGVtcGxhdGVPYmplY3QsXHJcbiAgICBfX2ltcG9ydFN0YXI6IF9faW1wb3J0U3RhcixcclxuICAgIF9faW1wb3J0RGVmYXVsdDogX19pbXBvcnREZWZhdWx0LFxyXG4gICAgX19jbGFzc1ByaXZhdGVGaWVsZEdldDogX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcclxuICAgIF9fY2xhc3NQcml2YXRlRmllbGRTZXQ6IF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXHJcbiAgICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW46IF9fY2xhc3NQcml2YXRlRmllbGRJbixcclxuICAgIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlOiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcclxuICAgIF9fZGlzcG9zZVJlc291cmNlczogX19kaXNwb3NlUmVzb3VyY2VzLFxyXG4gICAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb246IF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxyXG59O1xyXG4iLCIoZnVuY3Rpb24gKG5hbWUsIGNvbnRleHQsIGRlZmluaXRpb24pIHtcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKTtcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoZGVmaW5pdGlvbik7XG4gIGVsc2UgY29udGV4dFtuYW1lXSA9IGRlZmluaXRpb24oKTtcbn0pKCd1cmxqb2luJywgdGhpcywgZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZSAoc3RyQXJyYXkpIHtcbiAgICB2YXIgcmVzdWx0QXJyYXkgPSBbXTtcbiAgICBpZiAoc3RyQXJyYXkubGVuZ3RoID09PSAwKSB7IHJldHVybiAnJzsgfVxuXG4gICAgaWYgKHR5cGVvZiBzdHJBcnJheVswXSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgc3RyQXJyYXlbMF0pO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBmaXJzdCBwYXJ0IGlzIGEgcGxhaW4gcHJvdG9jb2wsIHdlIGNvbWJpbmUgaXQgd2l0aCB0aGUgbmV4dCBwYXJ0LlxuICAgIGlmIChzdHJBcnJheVswXS5tYXRjaCgvXlteLzpdKzpcXC8qJC8pICYmIHN0ckFycmF5Lmxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBmaXJzdCA9IHN0ckFycmF5LnNoaWZ0KCk7XG4gICAgICBzdHJBcnJheVswXSA9IGZpcnN0ICsgc3RyQXJyYXlbMF07XG4gICAgfVxuXG4gICAgLy8gVGhlcmUgbXVzdCBiZSB0d28gb3IgdGhyZWUgc2xhc2hlcyBpbiB0aGUgZmlsZSBwcm90b2NvbCwgdHdvIHNsYXNoZXMgaW4gYW55dGhpbmcgZWxzZS5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15maWxlOlxcL1xcL1xcLy8pKSB7XG4gICAgICBzdHJBcnJheVswXSA9IHN0ckFycmF5WzBdLnJlcGxhY2UoL14oW14vOl0rKTpcXC8qLywgJyQxOi8vLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHJBcnJheVswXSA9IHN0ckFycmF5WzBdLnJlcGxhY2UoL14oW14vOl0rKTpcXC8qLywgJyQxOi8vJyk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNvbXBvbmVudCA9IHN0ckFycmF5W2ldO1xuXG4gICAgICBpZiAodHlwZW9mIGNvbXBvbmVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVXJsIG11c3QgYmUgYSBzdHJpbmcuIFJlY2VpdmVkICcgKyBjb21wb25lbnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcG9uZW50ID09PSAnJykgeyBjb250aW51ZTsgfVxuXG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIHN0YXJ0aW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgZmlyc3QuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9eW1xcL10rLywgJycpO1xuICAgICAgfVxuICAgICAgaWYgKGkgPCBzdHJBcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBlbmRpbmcgc2xhc2hlcyBmb3IgZWFjaCBjb21wb25lbnQgYnV0IHRoZSBsYXN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvW1xcL10rJC8sICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciB0aGUgbGFzdCBjb21wb25lbnQgd2Ugd2lsbCBjb21iaW5lIG11bHRpcGxlIHNsYXNoZXMgdG8gYSBzaW5nbGUgb25lLlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvW1xcL10rJC8sICcvJyk7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdEFycmF5LnB1c2goY29tcG9uZW50KTtcblxuICAgIH1cblxuICAgIHZhciBzdHIgPSByZXN1bHRBcnJheS5qb2luKCcvJyk7XG4gICAgLy8gRWFjaCBpbnB1dCBjb21wb25lbnQgaXMgbm93IHNlcGFyYXRlZCBieSBhIHNpbmdsZSBzbGFzaCBleGNlcHQgdGhlIHBvc3NpYmxlIGZpcnN0IHBsYWluIHByb3RvY29sIHBhcnQuXG5cbiAgICAvLyByZW1vdmUgdHJhaWxpbmcgc2xhc2ggYmVmb3JlIHBhcmFtZXRlcnMgb3IgaGFzaFxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXC8oXFw/fCZ8I1teIV0pL2csICckMScpO1xuXG4gICAgLy8gcmVwbGFjZSA/IGluIHBhcmFtZXRlcnMgd2l0aCAmXG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KCc/Jyk7XG4gICAgc3RyID0gcGFydHMuc2hpZnQoKSArIChwYXJ0cy5sZW5ndGggPiAwID8gJz8nOiAnJykgKyBwYXJ0cy5qb2luKCcmJyk7XG5cbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW5wdXQ7XG5cbiAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlucHV0ID0gYXJndW1lbnRzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnB1dCA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9ybWFsaXplKGlucHV0KTtcbiAgfTtcblxufSk7XG4iLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBBUElFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQVBJRXJyb3IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQVBJRXJyb3IoX2EpIHtcbiAgICAgICAgdmFyIHN0YXR1cyA9IF9hLnN0YXR1cywgc3RhdHVzVGV4dCA9IF9hLnN0YXR1c1RleHQsIG1lc3NhZ2UgPSBfYS5tZXNzYWdlLCBfYiA9IF9hLmJvZHksIGJvZHkgPSBfYiA9PT0gdm9pZCAwID8ge30gOiBfYjtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGJvZHlNZXNzYWdlID0gJyc7XG4gICAgICAgIHZhciBlcnJvciA9ICcnO1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBib2R5TWVzc2FnZSA9IGJvZHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBib2R5TWVzc2FnZSA9IChib2R5ID09PSBudWxsIHx8IGJvZHkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJvZHkubWVzc2FnZSkgfHwgJyc7XG4gICAgICAgICAgICBlcnJvciA9IChib2R5ID09PSBudWxsIHx8IGJvZHkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJvZHkuZXJyb3IpIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc3RhY2sgPSAnJztcbiAgICAgICAgX3RoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICBfdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBlcnJvciB8fCBzdGF0dXNUZXh0IHx8ICcnO1xuICAgICAgICBfdGhpcy5kZXRhaWxzID0gYm9keU1lc3NhZ2U7XG4gICAgICAgIF90aGlzLnR5cGUgPSAnTWFpbGd1bkFQSUVycm9yJztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBUElFcnJvci5pc0FwaUVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGVyciA9PT0gJ29iamVjdCcgJiYgKGVyciA9PT0gbnVsbCB8fCBlcnIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVyci50eXBlKSA9PT0gJ01haWxndW5BUElFcnJvcic7XG4gICAgfTtcbiAgICBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yID0gZnVuY3Rpb24gKHN0YXR1c1RleHQsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHtcbiAgICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgICAgc3RhdHVzVGV4dDogc3RhdHVzVGV4dCxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEFQSUVycm9yO1xufShFcnJvcikpO1xuZXhwb3J0IGRlZmF1bHQgQVBJRXJyb3I7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3IuanMnO1xudmFyIEJsb2JGcm9tU3RyZWFtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJsb2JGcm9tU3RyZWFtKHN0cmVhbSwgc2l6ZSkge1xuICAgICAgICB0aGlzLl9zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgfVxuICAgIEJsb2JGcm9tU3RyZWFtLnByb3RvdHlwZS5zdHJlYW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHJlYW07XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQmxvYkZyb21TdHJlYW0ucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJ0Jsb2InO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIEJsb2JGcm9tU3RyZWFtO1xufSgpKTtcbnZhciBBdHRhY2htZW50c0hhbmRsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXR0YWNobWVudHNIYW5kbGVyKCkge1xuICAgIH1cbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmdldEF0dGFjaG1lbnRPcHRpb25zID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIGZpbGVuYW1lID0gaXRlbS5maWxlbmFtZSwgY29udGVudFR5cGUgPSBpdGVtLmNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aCA9IGl0ZW0ua25vd25MZW5ndGg7XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgKGZpbGVuYW1lID8geyBmaWxlbmFtZTogZmlsZW5hbWUgfSA6IHsgZmlsZW5hbWU6ICdmaWxlJyB9KSksIChjb250ZW50VHlwZSAmJiB7IGNvbnRlbnRUeXBlOiBjb250ZW50VHlwZSB9KSksIChrbm93bkxlbmd0aCAmJiB7IGtub3duTGVuZ3RoOiBrbm93bkxlbmd0aCB9KSk7XG4gICAgfTtcbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmdldEZpbGVJbmZvID0gZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgdmFyIGZpbGVuYW1lID0gZmlsZS5uYW1lLCBjb250ZW50VHlwZSA9IGZpbGUudHlwZSwga25vd25MZW5ndGggPSBmaWxlLnNpemU7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dGFjaG1lbnRPcHRpb25zKHsgZmlsZW5hbWU6IGZpbGVuYW1lLCBjb250ZW50VHlwZTogY29udGVudFR5cGUsIGtub3duTGVuZ3RoOiBrbm93bkxlbmd0aCB9KTtcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuZ2V0Q3VzdG9tRmlsZUluZm8gPSBmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICB2YXIgZmlsZW5hbWUgPSBmaWxlLmZpbGVuYW1lLCBjb250ZW50VHlwZSA9IGZpbGUuY29udGVudFR5cGUsIGtub3duTGVuZ3RoID0gZmlsZS5rbm93bkxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZTogZmlsZW5hbWUsIGNvbnRlbnRUeXBlOiBjb250ZW50VHlwZSwga25vd25MZW5ndGg6IGtub3duTGVuZ3RoIH0pO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5nZXRCdWZmZXJJbmZvID0gZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICB2YXIga25vd25MZW5ndGggPSBidWZmZXIuYnl0ZUxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZTogJ2ZpbGUnLCBjb250ZW50VHlwZTogJycsIGtub3duTGVuZ3RoOiBrbm93bkxlbmd0aCB9KTtcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuaXNTdHJlYW0gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmIHR5cGVvZiBkYXRhLnBpcGUgPT09ICdmdW5jdGlvbic7XG4gICAgfTtcbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmlzQ3VzdG9tRmlsZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG4gICAgICAgICAgICAmJiAhIW9iai5kYXRhO1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5pc0Jyb3dzZXJGaWxlID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgKCEhb2JqLm5hbWUgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSk7XG4gICAgfTtcbiAgICBBdHRhY2htZW50c0hhbmRsZXIucHJvdG90eXBlLmlzQnVmZmVyID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIEJ1ZmZlci5pc0J1ZmZlcihkYXRhKTtcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuZ2V0QXR0YWNobWVudEluZm8gPSBmdW5jdGlvbiAoYXR0YWNobWVudCkge1xuICAgICAgICB2YXIgaXNCcm93c2VyRmlsZSA9IHRoaXMuaXNCcm93c2VyRmlsZShhdHRhY2htZW50KTtcbiAgICAgICAgdmFyIGlzQ3VzdG9tRmlsZSA9IHRoaXMuaXNDdXN0b21GaWxlKGF0dGFjaG1lbnQpO1xuICAgICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgYXR0YWNobWVudCA9PT0gJ3N0cmluZyc7XG4gICAgICAgIGlmICghaXNTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmIChpc0Jyb3dzZXJGaWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsZUluZm8oYXR0YWNobWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQnVmZmVyLmlzQnVmZmVyKGF0dGFjaG1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnVmZmVySW5mbyhhdHRhY2htZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0N1c3RvbUZpbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXN0b21GaWxlSW5mbyhhdHRhY2htZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiAnZmlsZScsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAga25vd25MZW5ndGg6IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9O1xuICAgIEF0dGFjaG1lbnRzSGFuZGxlci5wcm90b3R5cGUuY29udmVydFRvRkRleHBlY3RlZFNoYXBlID0gZnVuY3Rpb24gKHVzZXJQcm92aWRlZFZhbHVlKSB7XG4gICAgICAgIHZhciBpc1N0cmVhbSA9IHRoaXMuaXNTdHJlYW0odXNlclByb3ZpZGVkVmFsdWUpO1xuICAgICAgICB2YXIgaXNCcm93c2VyRmlsZSA9IHRoaXMuaXNCcm93c2VyRmlsZSh1c2VyUHJvdmlkZWRWYWx1ZSk7XG4gICAgICAgIHZhciBpc0N1c3RvbUZpbGUgPSB0aGlzLmlzQ3VzdG9tRmlsZSh1c2VyUHJvdmlkZWRWYWx1ZSk7XG4gICAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiB1c2VyUHJvdmlkZWRWYWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIGlmIChpc1N0cmVhbSB8fCBpc1N0cmluZyB8fCBpc0Jyb3dzZXJGaWxlIHx8IHRoaXMuaXNCdWZmZXIodXNlclByb3ZpZGVkVmFsdWUpKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB1c2VyUHJvdmlkZWRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0N1c3RvbUZpbGUpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHVzZXJQcm92aWRlZFZhbHVlLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFwiVW5rbm93biBhdHRhY2htZW50IHR5cGUgXCIuY29uY2F0KHR5cGVvZiB1c2VyUHJvdmlkZWRWYWx1ZSksIFwiVGhlIFxcXCJhdHRhY2htZW50XFxcIiBwcm9wZXJ0eSBleHBlY3RzIGVpdGhlciBCdWZmZXIsIEJsb2IsIG9yIFN0cmluZy5cXG4gICAgICAgICAgQWxzbywgSXQgaXMgcG9zc2libGUgdG8gcHJvdmlkZSBhbiBvYmplY3QgdGhhdCBoYXMgdGhlIHByb3BlcnR5IFxcXCJkYXRhXFxcIiB3aXRoIGEgdmFsdWUgdGhhdCBpcyBlcXVhbCB0byBvbmUgb2YgdGhlIHR5cGVzIGNvdW50ZWQgYmVmb3JlLlxcbiAgICAgICAgICBBZGRpdGlvbmFsbHksIHlvdSBtYXkgdXNlIGFuIGFycmF5IHRvIHNlbmQgbW9yZSB0aGFuIG9uZSBhdHRhY2htZW50LlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgQXR0YWNobWVudHNIYW5kbGVyLnByb3RvdHlwZS5nZXRCbG9iRnJvbVN0cmVhbSA9IGZ1bmN0aW9uIChzdHJlYW0sIHNpemUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCbG9iRnJvbVN0cmVhbShzdHJlYW0sIHNpemUpO1xuICAgIH07XG4gICAgcmV0dXJuIEF0dGFjaG1lbnRzSGFuZGxlcjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBBdHRhY2htZW50c0hhbmRsZXI7XG4iLCJpbXBvcnQgeyBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvci5qcyc7XG5pbXBvcnQgQXR0YWNobWVudHNIYW5kbGVyIGZyb20gJy4vQXR0YWNobWVudHNIYW5kbGVyLmpzJztcbnZhciBGb3JtRGF0YUJ1aWxkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRm9ybURhdGFCdWlsZGVyKEZvcm1EYXRhQ29uc3RydWN0b3IsIGNvbmZpZykge1xuICAgICAgICB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IgPSBGb3JtRGF0YUNvbnN0cnVjdG9yO1xuICAgICAgICB0aGlzLmZpbGVLZXlzID0gWydhdHRhY2htZW50JywgJ2lubGluZScsICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJ107XG4gICAgICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyID0gbmV3IEF0dGFjaG1lbnRzSGFuZGxlcigpO1xuICAgICAgICB0aGlzLnVzZUZldGNoID0gY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnLnVzZUZldGNoO1xuICAgIH1cbiAgICBGb3JtRGF0YUJ1aWxkZXIucHJvdG90eXBlLmNyZWF0ZUZvcm1EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGZvcm1EYXRhSW5zdGFuY2UsIGlzRm9ybURhdGFQLCBmb3JtRGF0YSwgcmVzdWx0LCByZXNPYmosIGJsb2I7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBkYXRhIG9iamVjdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdGFJbnN0YW5jZSA9IG5ldyB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRm9ybURhdGFQID0gdGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Zvcm1EYXRhUCAmJiB0aGlzLnVzZUZldGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW4gY2FzZSBmb3JtLWRhdGEgcGFja2FnZSBpcyB1c2VkIGZldGNoIGNsaWVudCB0aGlua3MgZm9ybS1kYXRhIGlzIG9mIHRoZSBzdHJpbmcgdHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsc28gQ29udGVudC1UeXBlIGlzIHJlY29nbml6ZWQgaW5jb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdcImZvcm0tZGF0YVwiIG5wbSBwYWNrYWdlIGRldGVjdGVkLCBhbmQgaXQgY2FuIG5vdCBiZSB1c2VkIHRvZ2V0aGVyIHdpdGggXCJmZXRjaFwiIGNsaWVudCcsICdmZXRjaCBjbGllbnQgZG9lcyBub3QgcmVjb2duaXplIG9iamVjdCBjcmVhdGVkIGJ5IGZvcm0tZGF0YSBwYWNrYWdlIGFzIHZhbGlkIEZvcm1EYXRhIGluc3RhbmNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YSA9IE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBkYXRhW2tleV07IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAoZm9ybURhdGFBY2MsIGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5maWxlS2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdHRhY2htZW50VmFsdWUgPSBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5pc01lc3NhZ2VBdHRhY2htZW50KGF0dGFjaG1lbnRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmFkZEZpbGVzVG9GRChrZXksIGF0dGFjaG1lbnRWYWx1ZSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXCJVbmtub3duIHZhbHVlIFwiLmNvbmNhdChkYXRhW2tleV0sIFwiIHdpdGggdHlwZSBcIikuY29uY2F0KHR5cGVvZiBkYXRhW2tleV0sIFwiIGZvciBwcm9wZXJ0eSBcXFwiXCIpLmNvbmNhdChrZXksIFwiXFxcIlwiKSwgXCJUaGUga2V5IFxcXCJcIi5jb25jYXQoa2V5LCBcIlxcXCIgc2hvdWxkIGhhdmUgdHlwZSBvZiBCdWZmZXIsIFN0cmVhbSwgRmlsZSwgb3IgU3RyaW5nIFwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdtZXNzYWdlJykgeyAvLyBtaW1lIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2VWYWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtZXNzYWdlVmFsdWUgfHwgIV90aGlzLmlzTUlNRShtZXNzYWdlVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFwiVW5rbm93biBkYXRhIHR5cGUgZm9yIFxcXCJcIi5jb25jYXQoa2V5LCBcIlxcXCIgcHJvcGVydHlcIiksICdUaGUgbWltZSBkYXRhIHNob3VsZCBoYXZlIHR5cGUgb2YgQnVmZmVyLCBTdHJpbmcgb3IgQmxvYicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmFkZE1pbWVEYXRhVG9GRChrZXksIG1lc3NhZ2VWYWx1ZSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmFkZENvbW1vblByb3BlcnR5VG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhOiBmb3JtRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhU2l6ZTogMFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRoaXMudXNlRmV0Y2ggJiYgIWlzRm9ybURhdGFQKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBheGlvcyB0cmljayB0byBnZXQgY29ycmVjdCBDb250ZW50LVR5cGUgd2l0aCBib3VuZGFyeVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGJvdW5kYXJ5IGlzIG1pc3NpbmcgYW5kIHJlcXVlc3QgZmFpbHNcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmb3JtRGF0YSwgJ2dldEhlYWRlcnMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7ICdDb250ZW50LVR5cGUnOiB1bmRlZmluZWQgfSk7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKFJlc3BvbnNlICE9PSB1bmRlZmluZWQpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc09iaiA9IG5ldyBSZXNwb25zZShmb3JtRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCByZXNPYmouYmxvYigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvYiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRhU2l6ZSA9IGJsb2Iuc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzdWx0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBGb3JtRGF0YUJ1aWxkZXIucHJvdG90eXBlLmFkZE1pbWVEYXRhVG9GRCA9IGZ1bmN0aW9uIChrZXksIGRhdGEsIGZvcm1EYXRhSW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykgeyAvLyBpZiBzdHJpbmcgb25seSB0d28gcGFyYW1ldGVycyBzaG91bGQgYmUgdXNlZC5cbiAgICAgICAgICAgIGZvcm1EYXRhSW5zdGFuY2UuYXBwZW5kKGtleSwgZGF0YSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNGb3JtRGF0YVBhY2thZ2UoZm9ybURhdGFJbnN0YW5jZSkpIHsgLy8gZm9ybS1kYXRhIHBhY2thZ2UgaXMgdXNlZFxuICAgICAgICAgICAgdmFyIG5vZGVGb3JtRGF0YSA9IGZvcm1EYXRhSW5zdGFuY2U7XG4gICAgICAgICAgICBub2RlRm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YSwgeyBmaWxlbmFtZTogJ01pbWVNZXNzYWdlJyB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIEJsb2IgIT09IHVuZGVmaW5lZCkgeyAvLyBlaXRoZXIgbm9kZSA+IDE4IG9yIGJyb3dzZXJcbiAgICAgICAgICAgIHZhciBicm93c2VyRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlOyAvLyBCcm93c2VyIGNvbXBsaWFudCBGb3JtRGF0YVxuICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICAgICAgYnJvd3NlckZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGEsICdNaW1lTWVzc2FnZScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihkYXRhKSkgeyAvLyBub2RlIGVudmlyb25tZW50XG4gICAgICAgICAgICAgICAgdmFyIGJsb2JJbnN0YW5jZSA9IG5ldyBCbG9iKFtkYXRhXSk7XG4gICAgICAgICAgICAgICAgYnJvd3NlckZvcm1EYXRhLmFwcGVuZChrZXksIGJsb2JJbnN0YW5jZSwgJ01pbWVNZXNzYWdlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEZvcm1EYXRhQnVpbGRlci5wcm90b3R5cGUuaXNNSU1FID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhIGluc3RhbmNlb2YgQmxvYilcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGRhdGEpXG4gICAgICAgICAgICB8fCAodHlwZW9mIFJlYWRhYmxlU3RyZWFtICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhIGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW0pO1xuICAgIH07XG4gICAgRm9ybURhdGFCdWlsZGVyLnByb3RvdHlwZS5pc0Zvcm1EYXRhUGFja2FnZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG4gICAgICAgICAgICAmJiBvYmogIT09IG51bGxcbiAgICAgICAgICAgICYmIHR5cGVvZiBvYmouZ2V0SGVhZGVycyA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9O1xuICAgIEZvcm1EYXRhQnVpbGRlci5wcm90b3R5cGUuaXNNZXNzYWdlQXR0YWNobWVudCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQ3VzdG9tRmlsZSh2YWx1ZSlcbiAgICAgICAgICAgIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgIHx8ICh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBGaWxlKVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcih2YWx1ZSlcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKHZhbHVlKVxuICAgICAgICAgICAgfHwgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmV2ZXJ5KGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBfdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNDdXN0b21GaWxlKGl0ZW0pXG4gICAgICAgICAgICAgICAgfHwgKHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtIGluc3RhbmNlb2YgRmlsZSlcbiAgICAgICAgICAgICAgICB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQmxvYilcbiAgICAgICAgICAgICAgICB8fCBfdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoaXRlbSlcbiAgICAgICAgICAgICAgICB8fCBfdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0oaXRlbSk7IH0pKSk7XG4gICAgfTtcbiAgICBGb3JtRGF0YUJ1aWxkZXIucHJvdG90eXBlLmFkZEZpbGVzVG9GRCA9IGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUsIHZhbHVlLCBmb3JtRGF0YUluc3RhbmNlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBhcHBlbmRGaWxlVG9GRCA9IGZ1bmN0aW9uIChvcmlnaW5hbEtleSwgYXR0YWNobWVudCwgZm9ybURhdGEpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBvcmlnaW5hbEtleSA9PT0gJ211bHRpcGxlVmFsaWRhdGlvbkZpbGUnID8gJ2ZpbGUnIDogb3JpZ2luYWxLZXk7XG4gICAgICAgICAgICB2YXIgb2JqRGF0YSA9IF90aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5jb252ZXJ0VG9GRGV4cGVjdGVkU2hhcGUoYXR0YWNobWVudCk7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IF90aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5nZXRBdHRhY2htZW50SW5mbyhhdHRhY2htZW50KTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmQgPSBmb3JtRGF0YTtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHR5cGVvZiBvYmpEYXRhID09PSAnc3RyaW5nJyA/IEJ1ZmZlci5mcm9tKG9iakRhdGEpIDogb2JqRGF0YTtcbiAgICAgICAgICAgICAgICBmZC5hcHBlbmQoa2V5LCBkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIEJsb2IgIT09IHVuZGVmaW5lZCkgeyAvLyBlaXRoZXIgbm9kZSA+IDE4IG9yIGJyb3dzZXJcbiAgICAgICAgICAgICAgICB2YXIgYnJvd3NlckZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZTsgLy8gQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGFcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iakRhdGEgPT09ICdzdHJpbmcnIHx8IF90aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihvYmpEYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmxvYkluc3RhbmNlID0gbmV3IEJsb2IoW29iakRhdGFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJvd3NlckZvcm1EYXRhLmFwcGVuZChrZXksIGJsb2JJbnN0YW5jZSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9iakRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBvYmpEYXRhLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKG9iakRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBibG9iID0gX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyLmdldEJsb2JGcm9tU3RyZWFtKG9iakRhdGEsIG9wdGlvbnMua25vd25MZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBicm93c2VyRm9ybURhdGEuc2V0KGtleSwgYmxvYiwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBhcHBlbmRGaWxlVG9GRChwcm9wZXJ0eU5hbWUsIGl0ZW0sIGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhcHBlbmRGaWxlVG9GRChwcm9wZXJ0eU5hbWUsIHZhbHVlLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRm9ybURhdGFCdWlsZGVyLnByb3RvdHlwZS5hZGRDb21tb25Qcm9wZXJ0eVRvRkQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgZm9ybURhdGFBY2MpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGFkZFZhbHVlQmFzZWRPbkZEID0gZnVuY3Rpb24gKGZkS2V5LCBmZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuaXNGb3JtRGF0YVBhY2thZ2UoZm9ybURhdGFBY2MpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmZFZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSByZWNlaXZlZCB2YWx1ZSBpcyBhbiBvYmplY3QuIFxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ1wiSlNPTi5TdHJpbmdpZnlcIiB3aWxsIGJlIHVzZWQgdG8gYXZvaWQgVHlwZUVycm9yIFxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ1RvIHJlbW92ZSB0aGlzIHdhcm5pbmc6IFxcbidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJ0NvbnNpZGVyIHN3aXRjaGluZyB0byBidWlsdC1pbiBGb3JtRGF0YSBvciBjb252ZXJ0aW5nIHRoZSB2YWx1ZSBvbiB5b3VyIG93bi5cXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgSlNPTi5zdHJpbmdpZnkoZmRWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBmZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmRWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBmZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkICYmIGZkVmFsdWUgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgZmRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdVbmtub3duIHZhbHVlIHR5cGUgZm9yIEZvcm0gRGF0YS4gU3RyaW5nIG9yIEJsb2IgZXhwZWN0ZWQnLCAnQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGEgYWxsb3dzIG9ubHkgc3RyaW5nIG9yIEJsb2IgdmFsdWVzIGZvciBwcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBhdHRhY2htZW50cy4nKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgYWRkVmFsdWVCYXNlZE9uRkQoa2V5LCBpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGFkZFZhbHVlQmFzZWRPbkZEKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRm9ybURhdGFCdWlsZGVyO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEZvcm1EYXRhQnVpbGRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGJpbmQgZnJvbSAnLi9oZWxwZXJzL2JpbmQuanMnO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5jb25zdCB7dG9TdHJpbmd9ID0gT2JqZWN0LnByb3RvdHlwZTtcbmNvbnN0IHtnZXRQcm90b3R5cGVPZn0gPSBPYmplY3Q7XG5jb25zdCB7aXRlcmF0b3IsIHRvU3RyaW5nVGFnfSA9IFN5bWJvbDtcblxuY29uc3Qga2luZE9mID0gKGNhY2hlID0+IHRoaW5nID0+IHtcbiAgICBjb25zdCBzdHIgPSB0b1N0cmluZy5jYWxsKHRoaW5nKTtcbiAgICByZXR1cm4gY2FjaGVbc3RyXSB8fCAoY2FjaGVbc3RyXSA9IHN0ci5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKSk7XG59KShPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuY29uc3Qga2luZE9mVGVzdCA9ICh0eXBlKSA9PiB7XG4gIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAodGhpbmcpID0+IGtpbmRPZih0aGluZykgPT09IHR5cGVcbn1cblxuY29uc3QgdHlwZU9mVGVzdCA9IHR5cGUgPT4gdGhpbmcgPT4gdHlwZW9mIHRoaW5nID09PSB0eXBlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3Qge2lzQXJyYXl9ID0gQXJyYXk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVbmRlZmluZWQgPSB0eXBlT2ZUZXN0KCd1bmRlZmluZWQnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiBpc0Z1bmN0aW9uKHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcikgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICBsZXQgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmIChpc0FycmF5QnVmZmVyKHZhbC5idWZmZXIpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyaW5nID0gdHlwZU9mVGVzdCgnc3RyaW5nJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVPZlRlc3QoJ2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNOdW1iZXIgPSB0eXBlT2ZUZXN0KCdudW1iZXInKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAodGhpbmcpID0+IHRoaW5nICE9PSBudWxsICYmIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCb29sZWFuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCb29sZWFuLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCb29sZWFuID0gdGhpbmcgPT4gdGhpbmcgPT09IHRydWUgfHwgdGhpbmcgPT09IGZhbHNlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB7XG4gIGlmIChraW5kT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gKHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSkgPT09IG51bGwpICYmICEodG9TdHJpbmdUYWcgaW4gdmFsKSAmJiAhKGl0ZXJhdG9yIGluIHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gZW1wdHkgb2JqZWN0IChzYWZlbHkgaGFuZGxlcyBCdWZmZXJzKVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gZW1wdHkgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNFbXB0eU9iamVjdCA9ICh2YWwpID0+IHtcbiAgLy8gRWFybHkgcmV0dXJuIGZvciBub24tb2JqZWN0cyBvciBCdWZmZXJzIHRvIHByZXZlbnQgUmFuZ2VFcnJvclxuICBpZiAoIWlzT2JqZWN0KHZhbCkgfHwgaXNCdWZmZXIodmFsKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoID09PSAwICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpID09PSBPYmplY3QucHJvdG90eXBlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gRmFsbGJhY2sgZm9yIGFueSBvdGhlciBvYmplY3RzIHRoYXQgbWlnaHQgY2F1c2UgUmFuZ2VFcnJvciB3aXRoIE9iamVjdC5rZXlzKClcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRGF0ZSA9IGtpbmRPZlRlc3QoJ0RhdGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZSA9IGtpbmRPZlRlc3QoJ0ZpbGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGVMaXN0ID0ga2luZE9mVGVzdCgnRmlsZUxpc3QnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmVhbSA9ICh2YWwpID0+IGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRm9ybURhdGEgPSAodGhpbmcpID0+IHtcbiAgbGV0IGtpbmQ7XG4gIHJldHVybiB0aGluZyAmJiAoXG4gICAgKHR5cGVvZiBGb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGluZyBpbnN0YW5jZW9mIEZvcm1EYXRhKSB8fCAoXG4gICAgICBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiYgKFxuICAgICAgICAoa2luZCA9IGtpbmRPZih0aGluZykpID09PSAnZm9ybWRhdGEnIHx8XG4gICAgICAgIC8vIGRldGVjdCBmb3JtLWRhdGEgaW5zdGFuY2VcbiAgICAgICAgKGtpbmQgPT09ICdvYmplY3QnICYmIGlzRnVuY3Rpb24odGhpbmcudG9TdHJpbmcpICYmIHRoaW5nLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IEZvcm1EYXRhXScpXG4gICAgICApXG4gICAgKVxuICApXG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VSTFNlYXJjaFBhcmFtcyA9IGtpbmRPZlRlc3QoJ1VSTFNlYXJjaFBhcmFtcycpO1xuXG5jb25zdCBbaXNSZWFkYWJsZVN0cmVhbSwgaXNSZXF1ZXN0LCBpc1Jlc3BvbnNlLCBpc0hlYWRlcnNdID0gWydSZWFkYWJsZVN0cmVhbScsICdSZXF1ZXN0JywgJ1Jlc3BvbnNlJywgJ0hlYWRlcnMnXS5tYXAoa2luZE9mVGVzdCk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmNvbnN0IHRyaW0gPSAoc3RyKSA9PiBzdHIudHJpbSA/XG4gIHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FsbE93bktleXMgPSBmYWxzZV1cbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbiwge2FsbE93bktleXMgPSBmYWxzZX0gPSB7fSkge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBpO1xuICBsZXQgbDtcblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAoaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gQnVmZmVyIGNoZWNrXG4gICAgaWYgKGlzQnVmZmVyKG9iaikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBjb25zdCBrZXlzID0gYWxsT3duS2V5cyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikgOiBPYmplY3Qua2V5cyhvYmopO1xuICAgIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBrZXk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRLZXkob2JqLCBrZXkpIHtcbiAgaWYgKGlzQnVmZmVyKG9iaikpe1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICBsZXQgX2tleTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBfa2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoa2V5ID09PSBfa2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiBfa2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY29uc3QgX2dsb2JhbCA9ICgoKSA9PiB7XG4gIC8qZXNsaW50IG5vLXVuZGVmOjAqL1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWxUaGlzO1xuICByZXR1cm4gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKVxufSkoKTtcblxuY29uc3QgaXNDb250ZXh0RGVmaW5lZCA9IChjb250ZXh0KSA9PiAhaXNVbmRlZmluZWQoY29udGV4dCkgJiYgY29udGV4dCAhPT0gX2dsb2JhbDtcblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKlxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICBjb25zdCB7Y2FzZWxlc3MsIHNraXBVbmRlZmluZWR9ID0gaXNDb250ZXh0RGVmaW5lZCh0aGlzKSAmJiB0aGlzIHx8IHt9O1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgY29uc3QgYXNzaWduVmFsdWUgPSAodmFsLCBrZXkpID0+IHtcbiAgICBjb25zdCB0YXJnZXRLZXkgPSBjYXNlbGVzcyAmJiBmaW5kS2V5KHJlc3VsdCwga2V5KSB8fCBrZXk7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W3RhcmdldEtleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZShyZXN1bHRbdGFyZ2V0S2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFza2lwVW5kZWZpbmVkIHx8ICFpc1VuZGVmaW5lZCh2YWwpKSB7XG4gICAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGFyZ3VtZW50c1tpXSAmJiBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzXVxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5jb25zdCBleHRlbmQgPSAoYSwgYiwgdGhpc0FyZywge2FsbE93bktleXN9PSB7fSkgPT4ge1xuICBmb3JFYWNoKGIsICh2YWwsIGtleSkgPT4ge1xuICAgIGlmICh0aGlzQXJnICYmIGlzRnVuY3Rpb24odmFsKSkge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9LCB7YWxsT3duS2V5c30pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuY29uc3Qgc3RyaXBCT00gPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn1cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXVxuICogQHBhcmFtIHtvYmplY3R9IFtkZXNjcmlwdG9yc11cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgaW5oZXJpdHMgPSAoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykgPT4ge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IsICdzdXBlcicsIHtcbiAgICB2YWx1ZTogc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGVcbiAgfSk7XG4gIHByb3BzICYmIE9iamVjdC5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm9wcyk7XG59XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3RyaW5nIGVuZHMgd2l0aCB0aGUgY2hhcmFjdGVycyBvZiBhIHNwZWNpZmllZCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gW3Bvc2l0aW9uPSAwXVxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBlbmRzV2l0aCA9IChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pID0+IHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICBjb25zdCBsYXN0SW5kZXggPSBzdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3NpdGlvbjtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqXG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqXG4gKiBAcmV0dXJucyB7P0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICBpZiAoaXNBcnJheSh0aGluZykpIHJldHVybiB0aGluZztcbiAgbGV0IGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmICghaXNOdW1iZXIoaSkpIHJldHVybiBudWxsO1xuICBjb25zdCBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLyoqXG4gKiBDaGVja2luZyBpZiB0aGUgVWludDhBcnJheSBleGlzdHMgYW5kIGlmIGl0IGRvZXMsIGl0IHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGVcbiAqIHRoaW5nIHBhc3NlZCBpbiBpcyBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5XG4gKlxuICogQHBhcmFtIHtUeXBlZEFycmF5fVxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmNvbnN0IGlzVHlwZWRBcnJheSA9IChUeXBlZEFycmF5ID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuIHRoaW5nID0+IHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2V0UHJvdG90eXBlT2YoVWludDhBcnJheSkpO1xuXG4vKipcbiAqIEZvciBlYWNoIGVudHJ5IGluIHRoZSBvYmplY3QsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGtleSBhbmQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggZW50cnkuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGZvckVhY2hFbnRyeSA9IChvYmosIGZuKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRvciA9IG9iaiAmJiBvYmpbaXRlcmF0b3JdO1xuXG4gIGNvbnN0IF9pdGVyYXRvciA9IGdlbmVyYXRvci5jYWxsKG9iaik7XG5cbiAgbGV0IHJlc3VsdDtcblxuICB3aGlsZSAoKHJlc3VsdCA9IF9pdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn1cblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufVxuXG5jb25zdCBub29wID0gKCkgPT4ge31cblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUgPSArdmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59XG5cblxuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEodGhpbmcgJiYgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIHRoaW5nW3RvU3RyaW5nVGFnXSA9PT0gJ0Zvcm1EYXRhJyAmJiB0aGluZ1tpdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvL0J1ZmZlciBjaGVja1xuICAgICAgaWYgKGlzQnVmZmVyKHNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgIH1cblxuICAgICAgaWYoISgndG9KU09OJyBpbiBzb3VyY2UpKSB7XG4gICAgICAgIHN0YWNrW2ldID0gc291cmNlO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBpc0FycmF5KHNvdXJjZSkgPyBbXSA6IHt9O1xuXG4gICAgICAgIGZvckVhY2goc291cmNlLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHZhbHVlLCBpICsgMSk7XG4gICAgICAgICAgIWlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkgJiYgKHRhcmdldFtrZXldID0gcmVkdWNlZFZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RhY2tbaV0gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgcmV0dXJuIHZpc2l0KG9iaiwgMCk7XG59XG5cbmNvbnN0IGlzQXN5bmNGbiA9IGtpbmRPZlRlc3QoJ0FzeW5jRnVuY3Rpb24nKTtcblxuY29uc3QgaXNUaGVuYWJsZSA9ICh0aGluZykgPT5cbiAgdGhpbmcgJiYgKGlzT2JqZWN0KHRoaW5nKSB8fCBpc0Z1bmN0aW9uKHRoaW5nKSkgJiYgaXNGdW5jdGlvbih0aGluZy50aGVuKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLmNhdGNoKTtcblxuLy8gb3JpZ2luYWwgY29kZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0RpZ2l0YWxCcmFpbkpTL0F4aW9zUHJvbWlzZS9ibG9iLzE2ZGVhYjEzNzEwZWMwOTc3OTkyMjEzMWYzZmE1OTU0MzIwZjgzYWIvbGliL3V0aWxzLmpzI0wxMS1MMzRcblxuY29uc3QgX3NldEltbWVkaWF0ZSA9ICgoc2V0SW1tZWRpYXRlU3VwcG9ydGVkLCBwb3N0TWVzc2FnZVN1cHBvcnRlZCkgPT4ge1xuICBpZiAoc2V0SW1tZWRpYXRlU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIHNldEltbWVkaWF0ZTtcbiAgfVxuXG4gIHJldHVybiBwb3N0TWVzc2FnZVN1cHBvcnRlZCA/ICgodG9rZW4sIGNhbGxiYWNrcykgPT4ge1xuICAgIF9nbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKHtzb3VyY2UsIGRhdGF9KSA9PiB7XG4gICAgICBpZiAoc291cmNlID09PSBfZ2xvYmFsICYmIGRhdGEgPT09IHRva2VuKSB7XG4gICAgICAgIGNhbGxiYWNrcy5sZW5ndGggJiYgY2FsbGJhY2tzLnNoaWZ0KCkoKTtcbiAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG5cbiAgICByZXR1cm4gKGNiKSA9PiB7XG4gICAgICBjYWxsYmFja3MucHVzaChjYik7XG4gICAgICBfZ2xvYmFsLnBvc3RNZXNzYWdlKHRva2VuLCBcIipcIik7XG4gICAgfVxuICB9KShgYXhpb3NAJHtNYXRoLnJhbmRvbSgpfWAsIFtdKSA6IChjYikgPT4gc2V0VGltZW91dChjYik7XG59KShcbiAgdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyxcbiAgaXNGdW5jdGlvbihfZ2xvYmFsLnBvc3RNZXNzYWdlKVxuKTtcblxuY29uc3QgYXNhcCA9IHR5cGVvZiBxdWV1ZU1pY3JvdGFzayAhPT0gJ3VuZGVmaW5lZCcgP1xuICBxdWV1ZU1pY3JvdGFzay5iaW5kKF9nbG9iYWwpIDogKCB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5uZXh0VGljayB8fCBfc2V0SW1tZWRpYXRlKTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqXG5cblxuY29uc3QgaXNJdGVyYWJsZSA9ICh0aGluZykgPT4gdGhpbmcgIT0gbnVsbCAmJiBpc0Z1bmN0aW9uKHRoaW5nW2l0ZXJhdG9yXSk7XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNFbXB0eU9iamVjdCxcbiAgaXNSZWFkYWJsZVN0cmVhbSxcbiAgaXNSZXF1ZXN0LFxuICBpc1Jlc3BvbnNlLFxuICBpc0hlYWRlcnMsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0RhdGUsXG4gIGlzRmlsZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIGlzU3BlY0NvbXBsaWFudEZvcm0sXG4gIHRvSlNPTk9iamVjdCxcbiAgaXNBc3luY0ZuLFxuICBpc1RoZW5hYmxlLFxuICBzZXRJbW1lZGlhdGU6IF9zZXRJbW1lZGlhdGUsXG4gIGFzYXAsXG4gIGlzSXRlcmFibGVcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjaztcbiAgfVxuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgaWYgKHJlc3BvbnNlKSB7XG4gICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIHRoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzID8gcmVzcG9uc2Uuc3RhdHVzIDogbnVsbDtcbiAgfVxufVxuXG51dGlscy5pbmhlcml0cyhBeGlvc0Vycm9yLCBFcnJvciwge1xuICB0b0pTT046IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB1dGlscy50b0pTT05PYmplY3QodGhpcy5jb25maWcpLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1c1xuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbmNvbnN0IGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnLFxuICAnRVJSX05PVF9TVVBQT1JUJyxcbiAgJ0VSUl9JTlZBTElEX1VSTCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goY29kZSA9PiB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlLCAnaXNBeGlvc0Vycm9yJywge3ZhbHVlOiB0cnVlfSk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5BeGlvc0Vycm9yLmZyb20gPSAoZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSA9PiB7XG4gIGNvbnN0IGF4aW9zRXJyb3IgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG5cbiAgdXRpbHMudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xuICB9LCBwcm9wID0+IHtcbiAgICByZXR1cm4gcHJvcCAhPT0gJ2lzQXhpb3NFcnJvcic7XG4gIH0pO1xuXG4gIGNvbnN0IG1zZyA9IGVycm9yICYmIGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogJ0Vycm9yJztcblxuICAvLyBQcmVmZXIgZXhwbGljaXQgY29kZTsgb3RoZXJ3aXNlIGNvcHkgdGhlIGxvdy1sZXZlbCBlcnJvcidzIGNvZGUgKGUuZy4gRUNPTk5SRUZVU0VEKVxuICBjb25zdCBlcnJDb2RlID0gY29kZSA9PSBudWxsICYmIGVycm9yID8gZXJyb3IuY29kZSA6IGNvZGU7XG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBtc2csIGVyckNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpO1xuXG4gIC8vIENoYWluIHRoZSBvcmlnaW5hbCBlcnJvciBvbiB0aGUgc3RhbmRhcmQgZmllbGQ7IG5vbi1lbnVtZXJhYmxlIHRvIGF2b2lkIEpTT04gbm9pc2VcbiAgaWYgKGVycm9yICYmIGF4aW9zRXJyb3IuY2F1c2UgPT0gbnVsbCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShheGlvc0Vycm9yLCAnY2F1c2UnLCB7IHZhbHVlOiBlcnJvciwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICB9XG5cbiAgYXhpb3NFcnJvci5uYW1lID0gKGVycm9yICYmIGVycm9yLm5hbWUpIHx8ICdFcnJvcic7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0Vycm9yO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxuZXhwb3J0IGRlZmF1bHQgbnVsbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG4vLyB0ZW1wb3JhcnkgaG90Zml4IHRvIGF2b2lkIGNpcmN1bGFyIHJlZmVyZW5jZXMgdW50aWwgQXhpb3NVUkxTZWFyY2hQYXJhbXMgaXMgcmVmYWN0b3JlZFxuaW1wb3J0IFBsYXRmb3JtRm9ybURhdGEgZnJvbSAnLi4vcGxhdGZvcm0vbm9kZS9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0aGluZyBpcyBhIGFycmF5IG9yIGpzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhpbmcgLSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGJlIHZpc2l0ZWQuXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVmlzaXRhYmxlKHRoaW5nKSB7XG4gIHJldHVybiB1dGlscy5pc1BsYWluT2JqZWN0KHRoaW5nKSB8fCB1dGlscy5pc0FycmF5KHRoaW5nKTtcbn1cblxuLyoqXG4gKiBJdCByZW1vdmVzIHRoZSBicmFja2V0cyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgcGFyYW1ldGVyLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgd2l0aG91dCB0aGUgYnJhY2tldHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xuICByZXR1cm4gdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSA/IGtleS5zbGljZSgwLCAtMikgOiBrZXk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXRoLCBhIGtleSwgYW5kIGEgYm9vbGVhbiwgYW5kIHJldHVybnMgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBjdXJyZW50IG9iamVjdCBiZWluZyBpdGVyYXRlZCBvdmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGRvdHMgLSBJZiB0cnVlLCB0aGUga2V5IHdpbGwgYmUgcmVuZGVyZWQgd2l0aCBkb3RzIGluc3RlYWQgb2YgYnJhY2tldHMuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICovXG5mdW5jdGlvbiByZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSB7XG4gIGlmICghcGF0aCkgcmV0dXJuIGtleTtcbiAgcmV0dXJuIHBhdGguY29uY2F0KGtleSkubWFwKGZ1bmN0aW9uIGVhY2godG9rZW4sIGkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB0b2tlbiA9IHJlbW92ZUJyYWNrZXRzKHRva2VuKTtcbiAgICByZXR1cm4gIWRvdHMgJiYgaSA/ICdbJyArIHRva2VuICsgJ10nIDogdG9rZW47XG4gIH0pLmpvaW4oZG90cyA/ICcuJyA6ICcnKTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgYXJyYXkgaXMgYW4gYXJyYXkgYW5kIG5vbmUgb2YgaXRzIGVsZW1lbnRzIGFyZSB2aXNpdGFibGUsIHRoZW4gaXQncyBhIGZsYXQgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNGbGF0QXJyYXkoYXJyKSB7XG4gIHJldHVybiB1dGlscy5pc0FycmF5KGFycikgJiYgIWFyci5zb21lKGlzVmlzaXRhYmxlKTtcbn1cblxuY29uc3QgcHJlZGljYXRlcyA9IHV0aWxzLnRvRmxhdE9iamVjdCh1dGlscywge30sIG51bGwsIGZ1bmN0aW9uIGZpbHRlcihwcm9wKSB7XG4gIHJldHVybiAvXmlzW0EtWl0vLnRlc3QocHJvcCk7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgZGF0YSBvYmplY3QgdG8gRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEBwYXJhbSB7P09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy52aXNpdG9yXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tZXRhVG9rZW5zID0gdHJ1ZV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZG90cyA9IGZhbHNlXVxuICogQHBhcmFtIHs/Qm9vbGVhbn0gW29wdGlvbnMuaW5kZXhlcyA9IGZhbHNlXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbi8qKlxuICogSXQgY29udmVydHMgYW4gb2JqZWN0IGludG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBmb3JtIGRhdGEuXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgLSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGFwcGVuZCB0by5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSwgb3B0aW9ucykge1xuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXQgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBmb3JtRGF0YSA9IGZvcm1EYXRhIHx8IG5ldyAoUGxhdGZvcm1Gb3JtRGF0YSB8fCBGb3JtRGF0YSkoKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgb3B0aW9ucyA9IHV0aWxzLnRvRmxhdE9iamVjdChvcHRpb25zLCB7XG4gICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBpbmRleGVzOiBmYWxzZVxuICB9LCBmYWxzZSwgZnVuY3Rpb24gZGVmaW5lZChvcHRpb24sIHNvdXJjZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICAgIHJldHVybiAhdXRpbHMuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICB9KTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2I7XG4gIGNvbnN0IHVzZUJsb2IgPSBfQmxvYiAmJiB1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGZvcm1EYXRhKTtcblxuICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICghdXNlQmxvYiAmJiB1dGlscy5pc0Jsb2IodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignQmxvYiBpcyBub3Qgc3VwcG9ydGVkLiBVc2UgYSBCdWZmZXIgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHVzZUJsb2IgJiYgdHlwZW9mIEJsb2IgPT09ICdmdW5jdGlvbicgPyBuZXcgQmxvYihbdmFsdWVdKSA6IEJ1ZmZlci5mcm9tKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCB2aXNpdG9yLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0ga2V5XG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nfE51bWJlcj59IHBhdGhcbiAgICogQHRoaXMge0Zvcm1EYXRhfVxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gcmV0dXJuIHRydWUgdG8gdmlzaXQgdGhlIGVhY2ggcHJvcCBvZiB0aGUgdmFsdWUgcmVjdXJzaXZlbHlcbiAgICovXG4gIGZ1bmN0aW9uIGRlZmF1bHRWaXNpdG9yKHZhbHVlLCBrZXksIHBhdGgpIHtcbiAgICBsZXQgYXJyID0gdmFsdWU7XG5cbiAgICBpZiAodmFsdWUgJiYgIXBhdGggJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHV0aWxzLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IG1ldGFUb2tlbnMgPyBrZXkgOiBrZXkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAodXRpbHMuaXNBcnJheSh2YWx1ZSkgJiYgaXNGbGF0QXJyYXkodmFsdWUpKSB8fFxuICAgICAgICAoKHV0aWxzLmlzRmlsZUxpc3QodmFsdWUpIHx8IHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykpICYmIChhcnIgPSB1dGlscy50b0FycmF5KHZhbHVlKSlcbiAgICAgICAgKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gcmVtb3ZlQnJhY2tldHMoa2V5KTtcblxuICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiBlYWNoKGVsLCBpbmRleCkge1xuICAgICAgICAgICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICAgICAgICAgIGluZGV4ZXMgPT09IHRydWUgPyByZW5kZXJLZXkoW2tleV0sIGluZGV4LCBkb3RzKSA6IChpbmRleGVzID09PSBudWxsID8ga2V5IDoga2V5ICsgJ1tdJyksXG4gICAgICAgICAgICBjb252ZXJ0VmFsdWUoZWwpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNWaXNpdGFibGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3JtRGF0YS5hcHBlbmQocmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cyksIGNvbnZlcnRWYWx1ZSh2YWx1ZSkpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3Qgc3RhY2sgPSBbXTtcblxuICBjb25zdCBleHBvc2VkSGVscGVycyA9IE9iamVjdC5hc3NpZ24ocHJlZGljYXRlcywge1xuICAgIGRlZmF1bHRWaXNpdG9yLFxuICAgIGNvbnZlcnRWYWx1ZSxcbiAgICBpc1Zpc2l0YWJsZVxuICB9KTtcblxuICBmdW5jdGlvbiBidWlsZCh2YWx1ZSwgcGF0aCkge1xuICAgIGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcblxuICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhdGguam9pbignLicpKTtcbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbHVlKTtcblxuICAgIHV0aWxzLmZvckVhY2godmFsdWUsIGZ1bmN0aW9uIGVhY2goZWwsIGtleSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIHZpc2l0b3IuY2FsbChcbiAgICAgICAgZm9ybURhdGEsIGVsLCB1dGlscy5pc1N0cmluZyhrZXkpID8ga2V5LnRyaW0oKSA6IGtleSwgcGF0aCwgZXhwb3NlZEhlbHBlcnNcbiAgICAgICk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgYnVpbGQoZWwsIHBhdGggPyBwYXRoLmNvbmNhdChrZXkpIDogW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3RhY2sucG9wKCk7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkYXRhIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICBidWlsZChvYmopO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9Gb3JtRGF0YTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBJdCBlbmNvZGVzIGEgc3RyaW5nIGJ5IHJlcGxhY2luZyBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgaW4gdGhlIHVucmVzZXJ2ZWQgc2V0IHdpdGhcbiAqIHRoZWlyIHBlcmNlbnQtZW5jb2RlZCBlcXVpdmFsZW50c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGVuY29kZS5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZShzdHIpIHtcbiAgY29uc3QgY2hhck1hcCA9IHtcbiAgICAnISc6ICclMjEnLFxuICAgIFwiJ1wiOiAnJTI3JyxcbiAgICAnKCc6ICclMjgnLFxuICAgICcpJzogJyUyOScsXG4gICAgJ34nOiAnJTdFJyxcbiAgICAnJTIwJzogJysnLFxuICAgICclMDAnOiAnXFx4MDAnXG4gIH07XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKX5dfCUyMHwlMDAvZywgZnVuY3Rpb24gcmVwbGFjZXIobWF0Y2gpIHtcbiAgICByZXR1cm4gY2hhck1hcFttYXRjaF07XG4gIH0pO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGFyYW1zIG9iamVjdCBhbmQgY29udmVydHMgaXQgdG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IHBhcmFtcyAtIFRoZSBwYXJhbWV0ZXJzIHRvIGJlIGNvbnZlcnRlZCB0byBhIEZvcm1EYXRhIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBwYXNzZWQgdG8gdGhlIEF4aW9zIGNvbnN0cnVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpIHtcbiAgdGhpcy5fcGFpcnMgPSBbXTtcblxuICBwYXJhbXMgJiYgdG9Gb3JtRGF0YShwYXJhbXMsIHRoaXMsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc1VSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGU7XG5cbnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiBhcHBlbmQobmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5fcGFpcnMucHVzaChbbmFtZSwgdmFsdWVdKTtcbn07XG5cbnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kZXIpIHtcbiAgY29uc3QgX2VuY29kZSA9IGVuY29kZXIgPyBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBlbmNvZGVyLmNhbGwodGhpcywgdmFsdWUsIGVuY29kZSk7XG4gIH0gOiBlbmNvZGU7XG5cbiAgcmV0dXJuIHRoaXMuX3BhaXJzLm1hcChmdW5jdGlvbiBlYWNoKHBhaXIpIHtcbiAgICByZXR1cm4gX2VuY29kZShwYWlyWzBdKSArICc9JyArIF9lbmNvZGUocGFpclsxXSk7XG4gIH0sICcnKS5qb2luKCcmJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcblxuLyoqXG4gKiBJdCByZXBsYWNlcyBhbGwgaW5zdGFuY2VzIG9mIHRoZSBjaGFyYWN0ZXJzIGA6YCwgYCRgLCBgLGAsIGArYCwgYFtgLCBhbmQgYF1gIHdpdGggdGhlaXJcbiAqIFVSSSBlbmNvZGVkIGNvdW50ZXJwYXJ0c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgVGhlIHZhbHVlIHRvIGJlIGVuY29kZWQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/KG9iamVjdHxGdW5jdGlvbil9IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgb3B0aW9ucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIFxuICBjb25zdCBfZW5jb2RlID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuY29kZSB8fCBlbmNvZGU7XG5cbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgc2VyaWFsaXplOiBvcHRpb25zXG4gICAgfTtcbiAgfSBcblxuICBjb25zdCBzZXJpYWxpemVGbiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zZXJpYWxpemU7XG5cbiAgbGV0IHNlcmlhbGl6ZWRQYXJhbXM7XG5cbiAgaWYgKHNlcmlhbGl6ZUZuKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHNlcmlhbGl6ZUZuKHBhcmFtcywgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykgP1xuICAgICAgcGFyYW1zLnRvU3RyaW5nKCkgOlxuICAgICAgbmV3IEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykudG9TdHJpbmcoX2VuY29kZSk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIGNvbnN0IGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZihcIiNcIik7XG5cbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAgICovXG4gIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICAgIGZ1bGZpbGxlZCxcbiAgICAgIHJlamVjdGVkLFxuICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaW50ZXJjZXB0b3Igd2FzIHJlbW92ZWQsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgICAgZm4oaCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2Vcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc1VSTFNlYXJjaFBhcmFtcyBmcm9tICcuLi8uLi8uLi9oZWxwZXJzL0F4aW9zVVJMU2VhcmNoUGFyYW1zLmpzJztcbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnID8gVVJMU2VhcmNoUGFyYW1zIDogQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBGb3JtRGF0YSA6IG51bGw7XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnID8gQmxvYiA6IG51bGxcbiIsImltcG9ydCBVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi9jbGFzc2VzL1VSTFNlYXJjaFBhcmFtcy5qcydcbmltcG9ydCBGb3JtRGF0YSBmcm9tICcuL2NsYXNzZXMvRm9ybURhdGEuanMnXG5pbXBvcnQgQmxvYiBmcm9tICcuL2NsYXNzZXMvQmxvYi5qcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0Jyb3dzZXI6IHRydWUsXG4gIGNsYXNzZXM6IHtcbiAgICBVUkxTZWFyY2hQYXJhbXMsXG4gICAgRm9ybURhdGEsXG4gICAgQmxvYlxuICB9LFxuICBwcm90b2NvbHM6IFsnaHR0cCcsICdodHRwcycsICdmaWxlJywgJ2Jsb2InLCAndXJsJywgJ2RhdGEnXVxufTtcbiIsImNvbnN0IGhhc0Jyb3dzZXJFbnYgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG5jb25zdCBfbmF2aWdhdG9yID0gdHlwZW9mIG5hdmlnYXRvciA9PT0gJ29iamVjdCcgJiYgbmF2aWdhdG9yIHx8IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlckVudiA9IGhhc0Jyb3dzZXJFbnYgJiZcbiAgKCFfbmF2aWdhdG9yIHx8IFsnUmVhY3ROYXRpdmUnLCAnTmF0aXZlU2NyaXB0JywgJ05TJ10uaW5kZXhPZihfbmF2aWdhdG9yLnByb2R1Y3QpIDwgMCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIHdlYldvcmtlciBlbnZpcm9ubWVudFxuICpcbiAqIEFsdGhvdWdoIHRoZSBgaXNTdGFuZGFyZEJyb3dzZXJFbnZgIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdFxuICogYGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyYCwgdGhlIFdlYldvcmtlciB3aWxsIHN0aWxsIGJlXG4gKiBmaWx0ZXJlZCBvdXQgZHVlIHRvIGl0cyBqdWRnbWVudCBzdGFuZGFyZFxuICogYHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdgLlxuICogVGhpcyBsZWFkcyB0byBhIHByb2JsZW0gd2hlbiBheGlvcyBwb3N0IGBGb3JtRGF0YWAgaW4gd2ViV29ya2VyXG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgIHR5cGVvZiBzZWxmLmltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbidcbiAgKTtcbn0pKCk7XG5cbmNvbnN0IG9yaWdpbiA9IGhhc0Jyb3dzZXJFbnYgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG5leHBvcnQge1xuICBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgX25hdmlnYXRvciBhcyBuYXZpZ2F0b3IsXG4gIG9yaWdpblxufVxuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4vbm9kZS9pbmRleC5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2NvbW1vbi91dGlscy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4udXRpbHMsXG4gIC4uLnBsYXRmb3JtXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b0Zvcm1EYXRhKGRhdGEsIG5ldyBwbGF0Zm9ybS5jbGFzc2VzLlVSTFNlYXJjaFBhcmFtcygpLCB7XG4gICAgdmlzaXRvcjogZnVuY3Rpb24odmFsdWUsIGtleSwgcGF0aCwgaGVscGVycykge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzTm9kZSAmJiB1dGlscy5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWxwZXJzLmRlZmF1bHRWaXNpdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICAuLi5vcHRpb25zXG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1EYXRhVG9KU09OO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuL3RyYW5zaXRpb25hbC5qcyc7XG5pbXBvcnQgdG9Gb3JtRGF0YSBmcm9tICcuLi9oZWxwZXJzL3RvRm9ybURhdGEuanMnO1xuaW1wb3J0IHRvVVJMRW5jb2RlZEZvcm0gZnJvbSAnLi4vaGVscGVycy90b1VSTEVuY29kZWRGb3JtLmpzJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuLi9wbGF0Zm9ybS9pbmRleC5qcyc7XG5pbXBvcnQgZm9ybURhdGFUb0pTT04gZnJvbSAnLi4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscy5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMuaXNPYmplY3QoZGF0YSk7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBuZXcgRm9ybURhdGEoZGF0YSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCB0aGlzLmZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiB1dGlscy5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEsIHRoaXMucGFyc2VSZXZpdmVyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XG4gICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiBwbGF0Zm9ybS5jbGFzc2VzLkZvcm1EYXRhLFxuICAgIEJsb2I6IHBsYXRmb3JtLmNsYXNzZXMuQmxvYlxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCddLCAobWV0aG9kKSA9PiB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbi8vIFJhd0F4aW9zSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbmNvbnN0IGlnbm9yZUR1cGxpY2F0ZU9mID0gdXRpbHMudG9PYmplY3RTZXQoW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl0pO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmF3SGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKlxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgcmF3SGVhZGVycyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHt9O1xuICBsZXQga2V5O1xuICBsZXQgdmFsO1xuICBsZXQgaTtcblxuICByYXdIZWFkZXJzICYmIHJhd0hlYWRlcnMuc3BsaXQoJ1xcbicpLmZvckVhY2goZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gbGluZS5zdWJzdHJpbmcoMCwgaSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gbGluZS5zdWJzdHJpbmcoaSArIDEpLnRyaW0oKTtcblxuICAgIGlmICgha2V5IHx8IChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZltrZXldKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgaWYgKHBhcnNlZFtrZXldKSB7XG4gICAgICAgIHBhcnNlZFtrZXldLnB1c2godmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gW3ZhbF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBwYXJzZUhlYWRlcnMgZnJvbSAnLi4vaGVscGVycy9wYXJzZUhlYWRlcnMuanMnO1xuXG5jb25zdCAkaW50ZXJuYWxzID0gU3ltYm9sKCdpbnRlcm5hbHMnKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyICYmIFN0cmluZyhoZWFkZXIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAobm9ybWFsaXplVmFsdWUpIDogU3RyaW5nKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbnMoc3RyKSB7XG4gIGNvbnN0IHRva2VucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IHRva2Vuc1JFID0gLyhbXlxccyw7PV0rKVxccyooPzo9XFxzKihbXiw7XSspKT8vZztcbiAgbGV0IG1hdGNoO1xuXG4gIHdoaWxlICgobWF0Y2ggPSB0b2tlbnNSRS5leGVjKHN0cikpKSB7XG4gICAgdG9rZW5zW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxuY29uc3QgaXNWYWxpZEhlYWRlck5hbWUgPSAoc3RyKSA9PiAvXlstX2EtekEtWjAtOV5gfH4sISMkJSYnKisuXSskLy50ZXN0KHN0ci50cmltKCkpO1xuXG5mdW5jdGlvbiBtYXRjaEhlYWRlclZhbHVlKGNvbnRleHQsIHZhbHVlLCBoZWFkZXIsIGZpbHRlciwgaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gIGlmICh1dGlscy5pc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgdmFsdWUsIGhlYWRlcik7XG4gIH1cblxuICBpZiAoaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gICAgdmFsdWUgPSBoZWFkZXI7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzU3RyaW5nKHZhbHVlKSkgcmV0dXJuO1xuXG4gIGlmICh1dGlscy5pc1N0cmluZyhmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmluZGV4T2YoZmlsdGVyKSAhPT0gLTE7XG4gIH1cblxuICBpZiAodXRpbHMuaXNSZWdFeHAoZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyhbYS16XFxkXSkoXFx3KikvZywgKHcsIGNoYXIsIHN0cikgPT4ge1xuICAgICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKSArIHN0cjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcbiAgY29uc3QgYWNjZXNzb3JOYW1lID0gdXRpbHMudG9DYW1lbENhc2UoJyAnICsgaGVhZGVyKTtcblxuICBbJ2dldCcsICdzZXQnLCAnaGFzJ10uZm9yRWFjaChtZXRob2ROYW1lID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBtZXRob2ROYW1lICsgYWNjZXNzb3JOYW1lLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICByZXR1cm4gdGhpc1ttZXRob2ROYW1lXS5jYWxsKHRoaXMsIGhlYWRlciwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0pO1xufVxuXG5jbGFzcyBBeGlvc0hlYWRlcnMge1xuICBjb25zdHJ1Y3RvcihoZWFkZXJzKSB7XG4gICAgaGVhZGVycyAmJiB0aGlzLnNldChoZWFkZXJzKTtcbiAgfVxuXG4gIHNldChoZWFkZXIsIHZhbHVlT3JSZXdyaXRlLCByZXdyaXRlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFsSGVhZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaGVhZGVyIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBsSGVhZGVyKTtcblxuICAgICAgaWYoIWtleSB8fCBzZWxmW2tleV0gPT09IHVuZGVmaW5lZCB8fCBfcmV3cml0ZSA9PT0gdHJ1ZSB8fCAoX3Jld3JpdGUgPT09IHVuZGVmaW5lZCAmJiBzZWxmW2tleV0gIT09IGZhbHNlKSkge1xuICAgICAgICBzZWxmW2tleSB8fCBfaGVhZGVyXSA9IG5vcm1hbGl6ZVZhbHVlKF92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0SGVhZGVycyA9IChoZWFkZXJzLCBfcmV3cml0ZSkgPT5cbiAgICAgIHV0aWxzLmZvckVhY2goaGVhZGVycywgKF92YWx1ZSwgX2hlYWRlcikgPT4gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpKTtcblxuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KGhlYWRlcikgfHwgaGVhZGVyIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3Rvcikge1xuICAgICAgc2V0SGVhZGVycyhoZWFkZXIsIHZhbHVlT3JSZXdyaXRlKVxuICAgIH0gZWxzZSBpZih1dGlscy5pc1N0cmluZyhoZWFkZXIpICYmIChoZWFkZXIgPSBoZWFkZXIudHJpbSgpKSAmJiAhaXNWYWxpZEhlYWRlck5hbWUoaGVhZGVyKSkge1xuICAgICAgc2V0SGVhZGVycyhwYXJzZUhlYWRlcnMoaGVhZGVyKSwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoaGVhZGVyKSAmJiB1dGlscy5pc0l0ZXJhYmxlKGhlYWRlcikpIHtcbiAgICAgIGxldCBvYmogPSB7fSwgZGVzdCwga2V5O1xuICAgICAgZm9yIChjb25zdCBlbnRyeSBvZiBoZWFkZXIpIHtcbiAgICAgICAgaWYgKCF1dGlscy5pc0FycmF5KGVudHJ5KSkge1xuICAgICAgICAgIHRocm93IFR5cGVFcnJvcignT2JqZWN0IGl0ZXJhdG9yIG11c3QgcmV0dXJuIGEga2V5LXZhbHVlIHBhaXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9ialtrZXkgPSBlbnRyeVswXV0gPSAoZGVzdCA9IG9ialtrZXldKSA/XG4gICAgICAgICAgKHV0aWxzLmlzQXJyYXkoZGVzdCkgPyBbLi4uZGVzdCwgZW50cnlbMV1dIDogW2Rlc3QsIGVudHJ5WzFdXSkgOiBlbnRyeVsxXTtcbiAgICAgIH1cblxuICAgICAgc2V0SGVhZGVycyhvYmosIHZhbHVlT3JSZXdyaXRlKVxuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXIgIT0gbnVsbCAmJiBzZXRIZWFkZXIodmFsdWVPclJld3JpdGUsIGhlYWRlciwgcmV3cml0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQoaGVhZGVyLCBwYXJzZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICBpZiAoIXBhcnNlcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuY2FsbCh0aGlzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1JlZ0V4cChwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5leGVjKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcnNlciBtdXN0IGJlIGJvb2xlYW58cmVnZXhwfGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICByZXR1cm4gISEoa2V5ICYmIHRoaXNba2V5XSAhPT0gdW5kZWZpbmVkICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlSGVhZGVyKF9oZWFkZXIpIHtcbiAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmIChfaGVhZGVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgX2hlYWRlcik7XG5cbiAgICAgICAgaWYgKGtleSAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZShzZWxmLCBzZWxmW2tleV0sIGtleSwgbWF0Y2hlcikpKSB7XG4gICAgICAgICAgZGVsZXRlIHNlbGZba2V5XTtcblxuICAgICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXkoaGVhZGVyKSkge1xuICAgICAgaGVhZGVyLmZvckVhY2goZGVsZXRlSGVhZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlSGVhZGVyKGhlYWRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBjbGVhcihtYXRjaGVyKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICAgIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICBpZighbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyLCB0cnVlKSkge1xuICAgICAgICBkZWxldGUgdGhpc1trZXldO1xuICAgICAgICBkZWxldGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIG5vcm1hbGl6ZShmb3JtYXQpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KGhlYWRlcnMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgc2VsZltrZXldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBmb3JtYXQgPyBmb3JtYXRIZWFkZXIoaGVhZGVyKSA6IFN0cmluZyhoZWFkZXIpLnRyaW0oKTtcblxuICAgICAgaWYgKG5vcm1hbGl6ZWQgIT09IGhlYWRlcikge1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgfVxuXG4gICAgICBzZWxmW25vcm1hbGl6ZWRdID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWRdID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29uY2F0KC4uLnRhcmdldHMpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jb25jYXQodGhpcywgLi4udGFyZ2V0cyk7XG4gIH1cblxuICB0b0pTT04oYXNTdHJpbmdzKSB7XG4gICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IGZhbHNlICYmIChvYmpbaGVhZGVyXSA9IGFzU3RyaW5ncyAmJiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywgJykgOiB2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKS5tYXAoKFtoZWFkZXIsIHZhbHVlXSkgPT4gaGVhZGVyICsgJzogJyArIHZhbHVlKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIGdldFNldENvb2tpZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoXCJzZXQtY29va2llXCIpIHx8IFtdO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdID0gKHRoaXNbJGludGVybmFsc10gPSB7XG4gICAgICBhY2Nlc3NvcnM6IHt9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSBpbnRlcm5hbHMuYWNjZXNzb3JzO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lQWNjZXNzb3IoX2hlYWRlcikge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFhY2Nlc3NvcnNbbEhlYWRlcl0pIHtcbiAgICAgICAgYnVpbGRBY2Nlc3NvcnMocHJvdG90eXBlLCBfaGVhZGVyKTtcbiAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlscy5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7dmFsdWV9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudXRpbHMuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc0hlYWRlcnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy9pbmRleC5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4uL2NvcmUvQXhpb3NIZWFkZXJzLmpzJztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHBhcmFtIHs/T2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcbiAgY29uc3QgY29uZmlnID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgY29uc3QgY29udGV4dCA9IHJlc3BvbnNlIHx8IGNvbmZpZztcbiAgY29uc3QgaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaGVhZGVycy5ub3JtYWxpemUoKTtcblxuICByZXR1cm4gZGF0YTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3Q9fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsZWRFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG59XG5cbnV0aWxzLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhbmNlbGVkRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vQXhpb3NFcnJvci5qcyc7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNwZWVkb21ldGVyO1xuIiwiLyoqXG4gKiBUaHJvdHRsZSBkZWNvcmF0b3JcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge051bWJlcn0gZnJlcVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZuLCBmcmVxKSB7XG4gIGxldCB0aW1lc3RhbXAgPSAwO1xuICBsZXQgdGhyZXNob2xkID0gMTAwMCAvIGZyZXE7XG4gIGxldCBsYXN0QXJncztcbiAgbGV0IHRpbWVyO1xuXG4gIGNvbnN0IGludm9rZSA9IChhcmdzLCBub3cgPSBEYXRlLm5vdygpKSA9PiB7XG4gICAgdGltZXN0YW1wID0gbm93O1xuICAgIGxhc3RBcmdzID0gbnVsbDtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgfVxuICAgIGZuKC4uLmFyZ3MpO1xuICB9XG5cbiAgY29uc3QgdGhyb3R0bGVkID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhc3NlZCA9IG5vdyAtIHRpbWVzdGFtcDtcbiAgICBpZiAoIHBhc3NlZCA+PSB0aHJlc2hvbGQpIHtcbiAgICAgIGludm9rZShhcmdzLCBub3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0QXJncyA9IGFyZ3M7XG4gICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgIGludm9rZShsYXN0QXJncylcbiAgICAgICAgfSwgdGhyZXNob2xkIC0gcGFzc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBmbHVzaCA9ICgpID0+IGxhc3RBcmdzICYmIGludm9rZShsYXN0QXJncyk7XG5cbiAgcmV0dXJuIFt0aHJvdHRsZWQsIGZsdXNoXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGhyb3R0bGU7XG4iLCJpbXBvcnQgc3BlZWRvbWV0ZXIgZnJvbSBcIi4vc3BlZWRvbWV0ZXIuanNcIjtcbmltcG9ydCB0aHJvdHRsZSBmcm9tIFwiLi90aHJvdHRsZS5qc1wiO1xuaW1wb3J0IHV0aWxzIGZyb20gXCIuLi91dGlscy5qc1wiO1xuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NFdmVudFJlZHVjZXIgPSAobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0sIGZyZXEgPSAzKSA9PiB7XG4gIGxldCBieXRlc05vdGlmaWVkID0gMDtcbiAgY29uc3QgX3NwZWVkb21ldGVyID0gc3BlZWRvbWV0ZXIoNTAsIDI1MCk7XG5cbiAgcmV0dXJuIHRocm90dGxlKGUgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XG5cbiAgICBieXRlc05vdGlmaWVkID0gbG9hZGVkO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gKGxvYWRlZCAvIHRvdGFsKSA6IHVuZGVmaW5lZCxcbiAgICAgIGJ5dGVzOiBwcm9ncmVzc0J5dGVzLFxuICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBlc3RpbWF0ZWQ6IHJhdGUgJiYgdG90YWwgJiYgaW5SYW5nZSA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsLFxuICAgICAgW2lzRG93bmxvYWRTdHJlYW0gPyAnZG93bmxvYWQnIDogJ3VwbG9hZCddOiB0cnVlXG4gICAgfTtcblxuICAgIGxpc3RlbmVyKGRhdGEpO1xuICB9LCBmcmVxKTtcbn1cblxuZXhwb3J0IGNvbnN0IHByb2dyZXNzRXZlbnREZWNvcmF0b3IgPSAodG90YWwsIHRocm90dGxlZCkgPT4ge1xuICBjb25zdCBsZW5ndGhDb21wdXRhYmxlID0gdG90YWwgIT0gbnVsbDtcblxuICByZXR1cm4gWyhsb2FkZWQpID0+IHRocm90dGxlZFswXSh7XG4gICAgbGVuZ3RoQ29tcHV0YWJsZSxcbiAgICB0b3RhbCxcbiAgICBsb2FkZWRcbiAgfSksIHRocm90dGxlZFsxXV07XG59XG5cbmV4cG9ydCBjb25zdCBhc3luY0RlY29yYXRvciA9IChmbikgPT4gKC4uLmFyZ3MpID0+IHV0aWxzLmFzYXAoKCkgPT4gZm4oLi4uYXJncykpO1xuIiwiaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID8gKChvcmlnaW4sIGlzTVNJRSkgPT4gKHVybCkgPT4ge1xuICB1cmwgPSBuZXcgVVJMKHVybCwgcGxhdGZvcm0ub3JpZ2luKTtcblxuICByZXR1cm4gKFxuICAgIG9yaWdpbi5wcm90b2NvbCA9PT0gdXJsLnByb3RvY29sICYmXG4gICAgb3JpZ2luLmhvc3QgPT09IHVybC5ob3N0ICYmXG4gICAgKGlzTVNJRSB8fCBvcmlnaW4ucG9ydCA9PT0gdXJsLnBvcnQpXG4gICk7XG59KShcbiAgbmV3IFVSTChwbGF0Zm9ybS5vcmlnaW4pLFxuICBwbGF0Zm9ybS5uYXZpZ2F0b3IgJiYgLyhtc2llfHRyaWRlbnQpL2kudGVzdChwbGF0Zm9ybS5uYXZpZ2F0b3IudXNlckFnZW50KVxuKSA6ICgpID0+IHRydWU7XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICB7XG4gICAgd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICBjb25zdCBjb29raWUgPSBbbmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSldO1xuXG4gICAgICB1dGlscy5pc051bWJlcihleHBpcmVzKSAmJiBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG5cbiAgICAgIHV0aWxzLmlzU3RyaW5nKHBhdGgpICYmIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcblxuICAgICAgdXRpbHMuaXNTdHJpbmcoZG9tYWluKSAmJiBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuXG4gICAgICBzZWN1cmUgPT09IHRydWUgJiYgY29va2llLnB1c2goJ3NlY3VyZScpO1xuXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICB9LFxuXG4gICAgcmVhZChuYW1lKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgIH0sXG5cbiAgICByZW1vdmUobmFtZSkge1xuICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICB9XG4gIH1cblxuICA6XG5cbiAgLy8gTm9uLXN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICB7XG4gICAgd3JpdGUoKSB7fSxcbiAgICByZWFkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICByZW1vdmUoKSB7fVxuICB9O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLz9cXC8kLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpc0Fic29sdXRlVVJMIGZyb20gJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyc7XG5pbXBvcnQgY29tYmluZVVSTHMgZnJvbSAnLi4vaGVscGVycy9jb21iaW5lVVJMcy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCwgYWxsb3dBYnNvbHV0ZVVybHMpIHtcbiAgbGV0IGlzUmVsYXRpdmVVcmwgPSAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpO1xuICBpZiAoYmFzZVVSTCAmJiAoaXNSZWxhdGl2ZVVybCB8fCBhbGxvd0Fic29sdXRlVXJscyA9PSBmYWxzZSkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9BeGlvc0hlYWRlcnMuanNcIjtcblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgcHJvcCwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIHByb3AgLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiLCBwcm9wICwgY2FzZWxlc3MpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhLCBwcm9wICwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhYU1JGVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWRhcHRlcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZVR5cGU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkNvb2tpZU5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkhlYWRlck5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25VcGxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgZGVjb21wcmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhDb250ZW50TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heEJvZHlMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYmVmb3JlUmVkaXJlY3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNwb3J0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwc0FnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGNhbmNlbFRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHNvY2tldFBhdGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiICwgcHJvcCkgPT4gbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSxwcm9wLCB0cnVlKVxuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoey4uLmNvbmZpZzEsIC4uLmNvbmZpZzJ9KSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICBjb25zdCBtZXJnZSA9IG1lcmdlTWFwW3Byb3BdIHx8IG1lcmdlRGVlcFByb3BlcnRpZXM7XG4gICAgY29uc3QgY29uZmlnVmFsdWUgPSBtZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdLCBwcm9wKTtcbiAgICAodXRpbHMuaXNVbmRlZmluZWQoY29uZmlnVmFsdWUpICYmIG1lcmdlICE9PSBtZXJnZURpcmVjdEtleXMpIHx8IChjb25maWdbcHJvcF0gPSBjb25maWdWYWx1ZSk7XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSBcIi4uL3BsYXRmb3JtL2luZGV4LmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5pbXBvcnQgaXNVUkxTYW1lT3JpZ2luIGZyb20gXCIuL2lzVVJMU2FtZU9yaWdpbi5qc1wiO1xuaW1wb3J0IGNvb2tpZXMgZnJvbSBcIi4vY29va2llcy5qc1wiO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSBcIi4uL2NvcmUvYnVpbGRGdWxsUGF0aC5qc1wiO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gXCIuLi9jb3JlL21lcmdlQ29uZmlnLmpzXCI7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGJ1aWxkVVJMIGZyb20gXCIuL2J1aWxkVVJMLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChjb25maWcpID0+IHtcbiAgY29uc3QgbmV3Q29uZmlnID0gbWVyZ2VDb25maWcoe30sIGNvbmZpZyk7XG5cbiAgbGV0IHsgZGF0YSwgd2l0aFhTUkZUb2tlbiwgeHNyZkhlYWRlck5hbWUsIHhzcmZDb29raWVOYW1lLCBoZWFkZXJzLCBhdXRoIH0gPSBuZXdDb25maWc7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwsIG5ld0NvbmZpZy5hbGxvd0Fic29sdXRlVXJscyksIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcblxuICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gIGlmIChhdXRoKSB7XG4gICAgaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArXG4gICAgICBidG9hKChhdXRoLnVzZXJuYW1lIHx8ICcnKSArICc6JyArIChhdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgucGFzc3dvcmQpKSA6ICcnKSlcbiAgICApO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52IHx8IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudikge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSh1bmRlZmluZWQpOyAvLyBicm93c2VyIGhhbmRsZXMgaXRcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZGF0YS5nZXRIZWFkZXJzKSkge1xuICAgICAgLy8gTm9kZS5qcyBGb3JtRGF0YSAobGlrZSBmb3JtLWRhdGEgcGFja2FnZSlcbiAgICAgIGNvbnN0IGZvcm1IZWFkZXJzID0gZGF0YS5nZXRIZWFkZXJzKCk7XG4gICAgICAvLyBPbmx5IHNldCBzYWZlIGhlYWRlcnMgdG8gYXZvaWQgb3ZlcndyaXRpbmcgc2VjdXJpdHkgaGVhZGVyc1xuICAgICAgY29uc3QgYWxsb3dlZEhlYWRlcnMgPSBbJ2NvbnRlbnQtdHlwZScsICdjb250ZW50LWxlbmd0aCddO1xuICAgICAgT2JqZWN0LmVudHJpZXMoZm9ybUhlYWRlcnMpLmZvckVhY2goKFtrZXksIHZhbF0pID0+IHtcbiAgICAgICAgaWYgKGFsbG93ZWRIZWFkZXJzLmluY2x1ZGVzKGtleS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgIGhlYWRlcnMuc2V0KGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9ICBcblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIHdpdGhYU1JGVG9rZW4gJiYgdXRpbHMuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59XG5cbiIsImltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBzZXR0bGUgZnJvbSAnLi8uLi9jb3JlL3NldHRsZS5qcyc7XG5pbXBvcnQgdHJhbnNpdGlvbmFsRGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuLi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyc7XG5pbXBvcnQgcGFyc2VQcm90b2NvbCBmcm9tICcuLi9oZWxwZXJzL3BhcnNlUHJvdG9jb2wuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IHtwcm9ncmVzc0V2ZW50UmVkdWNlcn0gZnJvbSAnLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyc7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tIFwiLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzXCI7XG5cbmNvbnN0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCAmJiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcbiAgICBsZXQgcmVxdWVzdERhdGEgPSBfY29uZmlnLmRhdGE7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShfY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgIGxldCB7cmVzcG9uc2VUeXBlLCBvblVwbG9hZFByb2dyZXNzLCBvbkRvd25sb2FkUHJvZ3Jlc3N9ID0gX2NvbmZpZztcbiAgICBsZXQgb25DYW5jZWxlZDtcbiAgICBsZXQgdXBsb2FkVGhyb3R0bGVkLCBkb3dubG9hZFRocm90dGxlZDtcbiAgICBsZXQgZmx1c2hVcGxvYWQsIGZsdXNoRG93bmxvYWQ7XG5cbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgZmx1c2hVcGxvYWQgJiYgZmx1c2hVcGxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG4gICAgICBmbHVzaERvd25sb2FkICYmIGZsdXNoRG93bmxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcblxuICAgICAgX2NvbmZpZy5zaWduYWwgJiYgX2NvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICB9XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgcmVxdWVzdC5vcGVuKF9jb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIF9jb25maWcudXJsLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShcbiAgICAgICAgJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcihldmVudCkge1xuICAgICAgIC8vIEJyb3dzZXJzIGRlbGl2ZXIgYSBQcm9ncmVzc0V2ZW50IGluIFhIUiBvbmVycm9yXG4gICAgICAgLy8gKG1lc3NhZ2UgbWF5IGJlIGVtcHR5OyB3aGVuIHByZXNlbnQsIHN1cmZhY2UgaXQpXG4gICAgICAgLy8gU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdC9lcnJvcl9ldmVudFxuICAgICAgIGNvbnN0IG1zZyA9IGV2ZW50ICYmIGV2ZW50Lm1lc3NhZ2UgPyBldmVudC5tZXNzYWdlIDogJ05ldHdvcmsgRXJyb3InO1xuICAgICAgIGNvbnN0IGVyciA9IG5ldyBBeGlvc0Vycm9yKG1zZywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KTtcbiAgICAgICAvLyBhdHRhY2ggdGhlIHVuZGVybHlpbmcgZXZlbnQgZm9yIGNvbnN1bWVycyB3aG8gd2FudCBkZXRhaWxzXG4gICAgICAgZXJyLmV2ZW50ID0gZXZlbnQgfHwgbnVsbDtcbiAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuICAgIFxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXQgPyAndGltZW91dCBvZiAnICsgX2NvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IF9jb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgaWYgKF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgIHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQgJiYgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUobnVsbCk7XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycy50b0pTT04oKSwgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoX2NvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhX2NvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChyZXNwb25zZVR5cGUgJiYgcmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gX2NvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmIChvbkRvd25sb2FkUHJvZ3Jlc3MpIHtcbiAgICAgIChbZG93bmxvYWRUaHJvdHRsZWQsIGZsdXNoRG93bmxvYWRdID0gcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKSk7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZG93bmxvYWRUaHJvdHRsZWQpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKG9uVXBsb2FkUHJvZ3Jlc3MgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIChbdXBsb2FkVGhyb3R0bGVkLCBmbHVzaFVwbG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvblVwbG9hZFByb2dyZXNzKSk7XG5cbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgdXBsb2FkVGhyb3R0bGVkKTtcblxuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGZsdXNoVXBsb2FkKTtcbiAgICB9XG5cbiAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbiB8fCBfY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBjYW5jZWwgPT4ge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KCFjYW5jZWwgfHwgY2FuY2VsLnR5cGUgPyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcsIHJlcXVlc3QpIDogY2FuY2VsKTtcbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgX2NvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IF9jb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKF9jb25maWcudXJsKTtcblxuICAgIGlmIChwcm90b2NvbCAmJiBwbGF0Zm9ybS5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tIFwiLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanNcIjtcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbmNvbnN0IGNvbXBvc2VTaWduYWxzID0gKHNpZ25hbHMsIHRpbWVvdXQpID0+IHtcbiAgY29uc3Qge2xlbmd0aH0gPSAoc2lnbmFscyA9IHNpZ25hbHMgPyBzaWduYWxzLmZpbHRlcihCb29sZWFuKSA6IFtdKTtcblxuICBpZiAodGltZW91dCB8fCBsZW5ndGgpIHtcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGxldCBhYm9ydGVkO1xuXG4gICAgY29uc3Qgb25hYm9ydCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmICghYWJvcnRlZCkge1xuICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgY29uc3QgZXJyID0gcmVhc29uIGluc3RhbmNlb2YgRXJyb3IgPyByZWFzb24gOiB0aGlzLnJlYXNvbjtcbiAgICAgICAgY29udHJvbGxlci5hYm9ydChlcnIgaW5zdGFuY2VvZiBBeGlvc0Vycm9yID8gZXJyIDogbmV3IENhbmNlbGVkRXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IGVycikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB0aW1lciA9IHRpbWVvdXQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICBvbmFib3J0KG5ldyBBeGlvc0Vycm9yKGB0aW1lb3V0ICR7dGltZW91dH0gb2YgbXMgZXhjZWVkZWRgLCBBeGlvc0Vycm9yLkVUSU1FRE9VVCkpXG4gICAgfSwgdGltZW91dClcblxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4ge1xuICAgICAgaWYgKHNpZ25hbHMpIHtcbiAgICAgICAgdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICBzaWduYWxzLmZvckVhY2goc2lnbmFsID0+IHtcbiAgICAgICAgICBzaWduYWwudW5zdWJzY3JpYmUgPyBzaWduYWwudW5zdWJzY3JpYmUob25hYm9ydCkgOiBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNpZ25hbHMgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KSk7XG5cbiAgICBjb25zdCB7c2lnbmFsfSA9IGNvbnRyb2xsZXI7XG5cbiAgICBzaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB1dGlscy5hc2FwKHVuc3Vic2NyaWJlKTtcblxuICAgIHJldHVybiBzaWduYWw7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZVNpZ25hbHM7XG4iLCJcbmV4cG9ydCBjb25zdCBzdHJlYW1DaHVuayA9IGZ1bmN0aW9uKiAoY2h1bmssIGNodW5rU2l6ZSkge1xuICBsZXQgbGVuID0gY2h1bmsuYnl0ZUxlbmd0aDtcblxuICBpZiAoIWNodW5rU2l6ZSB8fCBsZW4gPCBjaHVua1NpemUpIHtcbiAgICB5aWVsZCBjaHVuaztcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcG9zID0gMDtcbiAgbGV0IGVuZDtcblxuICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgZW5kID0gcG9zICsgY2h1bmtTaXplO1xuICAgIHlpZWxkIGNodW5rLnNsaWNlKHBvcywgZW5kKTtcbiAgICBwb3MgPSBlbmQ7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlYWRCeXRlcyA9IGFzeW5jIGZ1bmN0aW9uKiAoaXRlcmFibGUsIGNodW5rU2l6ZSkge1xuICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIHJlYWRTdHJlYW0oaXRlcmFibGUpKSB7XG4gICAgeWllbGQqIHN0cmVhbUNodW5rKGNodW5rLCBjaHVua1NpemUpO1xuICB9XG59XG5cbmNvbnN0IHJlYWRTdHJlYW0gPSBhc3luYyBmdW5jdGlvbiogKHN0cmVhbSkge1xuICBpZiAoc3RyZWFtW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSkge1xuICAgIHlpZWxkKiBzdHJlYW07XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVhZGVyID0gc3RyZWFtLmdldFJlYWRlcigpO1xuICB0cnkge1xuICAgIGZvciAoOzspIHtcbiAgICAgIGNvbnN0IHtkb25lLCB2YWx1ZX0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB5aWVsZCB2YWx1ZTtcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgcmVhZGVyLmNhbmNlbCgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0cmFja1N0cmVhbSA9IChzdHJlYW0sIGNodW5rU2l6ZSwgb25Qcm9ncmVzcywgb25GaW5pc2gpID0+IHtcbiAgY29uc3QgaXRlcmF0b3IgPSByZWFkQnl0ZXMoc3RyZWFtLCBjaHVua1NpemUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG4gIGxldCBkb25lO1xuICBsZXQgX29uRmluaXNoID0gKGUpID0+IHtcbiAgICBpZiAoIWRvbmUpIHtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgb25GaW5pc2ggJiYgb25GaW5pc2goZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgYXN5bmMgcHVsbChjb250cm9sbGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICBfb25GaW5pc2goKTtcbiAgICAgICAgICBjb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAgICAgbGV0IGxvYWRlZEJ5dGVzID0gYnl0ZXMgKz0gbGVuO1xuICAgICAgICAgIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9vbkZpbmlzaChlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwocmVhc29uKSB7XG4gICAgICBfb25GaW5pc2gocmVhc29uKTtcbiAgICAgIHJldHVybiBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBoaWdoV2F0ZXJNYXJrOiAyXG4gIH0pXG59XG4iLCJpbXBvcnQgcGxhdGZvcm0gZnJvbSBcIi4uL3BsYXRmb3JtL2luZGV4LmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tIFwiLi4vY29yZS9BeGlvc0Vycm9yLmpzXCI7XG5pbXBvcnQgY29tcG9zZVNpZ25hbHMgZnJvbSBcIi4uL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanNcIjtcbmltcG9ydCB7dHJhY2tTdHJlYW19IGZyb20gXCIuLi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzXCI7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IHtwcm9ncmVzc0V2ZW50UmVkdWNlciwgcHJvZ3Jlc3NFdmVudERlY29yYXRvciwgYXN5bmNEZWNvcmF0b3J9IGZyb20gXCIuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzXCI7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tIFwiLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzXCI7XG5pbXBvcnQgc2V0dGxlIGZyb20gXCIuLi9jb3JlL3NldHRsZS5qc1wiO1xuXG5jb25zdCBERUZBVUxUX0NIVU5LX1NJWkUgPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IHtpc0Z1bmN0aW9ufSA9IHV0aWxzO1xuXG5jb25zdCBnbG9iYWxGZXRjaEFQSSA9ICgoe2ZldGNoLCBSZXF1ZXN0LCBSZXNwb25zZX0pID0+ICh7XG4gICAgZmV0Y2gsIFJlcXVlc3QsIFJlc3BvbnNlXG4gIH0pKSh1dGlscy5nbG9iYWwpO1xuXG5jb25zdCB7XG4gIFJlYWRhYmxlU3RyZWFtLCBUZXh0RW5jb2RlclxufSA9IHV0aWxzLmdsb2JhbDtcblxuXG5jb25zdCB0ZXN0ID0gKGZuLCAuLi5hcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBmYWN0b3J5ID0gKGVudikgPT4ge1xuICBjb25zdCB7ZmV0Y2gsIFJlcXVlc3QsIFJlc3BvbnNlfSA9IE9iamVjdC5hc3NpZ24oe30sIGdsb2JhbEZldGNoQVBJLCBlbnYpO1xuICBjb25zdCBpc0ZldGNoU3VwcG9ydGVkID0gaXNGdW5jdGlvbihmZXRjaCk7XG4gIGNvbnN0IGlzUmVxdWVzdFN1cHBvcnRlZCA9IGlzRnVuY3Rpb24oUmVxdWVzdCk7XG4gIGNvbnN0IGlzUmVzcG9uc2VTdXBwb3J0ZWQgPSBpc0Z1bmN0aW9uKFJlc3BvbnNlKTtcblxuICBpZiAoIWlzRmV0Y2hTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkID0gaXNGZXRjaFN1cHBvcnRlZCAmJiBpc0Z1bmN0aW9uKFJlYWRhYmxlU3RyZWFtKTtcblxuICBjb25zdCBlbmNvZGVUZXh0ID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAodHlwZW9mIFRleHRFbmNvZGVyID09PSAnZnVuY3Rpb24nID9cbiAgICAgICgoZW5jb2RlcikgPT4gKHN0cikgPT4gZW5jb2Rlci5lbmNvZGUoc3RyKSkobmV3IFRleHRFbmNvZGVyKCkpIDpcbiAgICAgIGFzeW5jIChzdHIpID0+IG5ldyBVaW50OEFycmF5KGF3YWl0IG5ldyBSZXF1ZXN0KHN0cikuYXJyYXlCdWZmZXIoKSlcbiAgKTtcblxuICBjb25zdCBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gPSBpc1JlcXVlc3RTdXBwb3J0ZWQgJiYgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJiB0ZXN0KCgpID0+IHtcbiAgICBsZXQgZHVwbGV4QWNjZXNzZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IGhhc0NvbnRlbnRUeXBlID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZ2V0IGR1cGxleCgpIHtcbiAgICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gJ2hhbGYnO1xuICAgICAgfSxcbiAgICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgICByZXR1cm4gZHVwbGV4QWNjZXNzZWQgJiYgIWhhc0NvbnRlbnRUeXBlO1xuICB9KTtcblxuICBjb25zdCBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtID0gaXNSZXNwb25zZVN1cHBvcnRlZCAmJiBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gICAgdGVzdCgoKSA9PiB1dGlscy5pc1JlYWRhYmxlU3RyZWFtKG5ldyBSZXNwb25zZSgnJykuYm9keSkpO1xuXG4gIGNvbnN0IHJlc29sdmVycyA9IHtcbiAgICBzdHJlYW06IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKChyZXMpID0+IHJlcy5ib2R5KVxuICB9O1xuXG4gIGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKCgoKSA9PiB7XG4gICAgWyd0ZXh0JywgJ2FycmF5QnVmZmVyJywgJ2Jsb2InLCAnZm9ybURhdGEnLCAnc3RyZWFtJ10uZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgICFyZXNvbHZlcnNbdHlwZV0gJiYgKHJlc29sdmVyc1t0eXBlXSA9IChyZXMsIGNvbmZpZykgPT4ge1xuICAgICAgICBsZXQgbWV0aG9kID0gcmVzICYmIHJlc1t0eXBlXTtcblxuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgcmV0dXJuIG1ldGhvZC5jYWxsKHJlcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgUmVzcG9uc2UgdHlwZSAnJHt0eXBlfScgaXMgbm90IHN1cHBvcnRlZGAsIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JULCBjb25maWcpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgfSkoKSk7XG5cbiAgY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gICAgaWYgKGJvZHkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQmxvYihib2R5KSkge1xuICAgICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgICAgY29uc3QgX3JlcXVlc3QgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiAoYXdhaXQgX3JlcXVlc3QuYXJyYXlCdWZmZXIoKSkuYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihib2R5KSkge1xuICAgICAgcmV0dXJuIGJvZHkuYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcbiAgICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IGVuY29kZVRleHQoYm9keSkpLmJ5dGVMZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVzb2x2ZUJvZHlMZW5ndGggPSBhc3luYyAoaGVhZGVycywgYm9keSkgPT4ge1xuICAgIGNvbnN0IGxlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKGhlYWRlcnMuZ2V0Q29udGVudExlbmd0aCgpKTtcblxuICAgIHJldHVybiBsZW5ndGggPT0gbnVsbCA/IGdldEJvZHlMZW5ndGgoYm9keSkgOiBsZW5ndGg7XG4gIH1cblxuICByZXR1cm4gYXN5bmMgKGNvbmZpZykgPT4ge1xuICAgIGxldCB7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICBkYXRhLFxuICAgICAgc2lnbmFsLFxuICAgICAgY2FuY2VsVG9rZW4sXG4gICAgICB0aW1lb3V0LFxuICAgICAgb25Eb3dubG9hZFByb2dyZXNzLFxuICAgICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICAgIHJlc3BvbnNlVHlwZSxcbiAgICAgIGhlYWRlcnMsXG4gICAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgICAgZmV0Y2hPcHRpb25zXG4gICAgfSA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcblxuICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSA/IChyZXNwb25zZVR5cGUgKyAnJykudG9Mb3dlckNhc2UoKSA6ICd0ZXh0JztcblxuICAgIGxldCBjb21wb3NlZFNpZ25hbCA9IGNvbXBvc2VTaWduYWxzKFtzaWduYWwsIGNhbmNlbFRva2VuICYmIGNhbmNlbFRva2VuLnRvQWJvcnRTaWduYWwoKV0sIHRpbWVvdXQpO1xuXG4gICAgbGV0IHJlcXVlc3QgPSBudWxsO1xuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBjb21wb3NlZFNpZ25hbCAmJiBjb21wb3NlZFNpZ25hbC51bnN1YnNjcmliZSAmJiAoKCkgPT4ge1xuICAgICAgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcblxuICAgIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoXG4gICAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MgJiYgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmIG1ldGhvZCAhPT0gJ2dldCcgJiYgbWV0aG9kICE9PSAnaGVhZCcgJiZcbiAgICAgICAgKHJlcXVlc3RDb250ZW50TGVuZ3RoID0gYXdhaXQgcmVzb2x2ZUJvZHlMZW5ndGgoaGVhZGVycywgZGF0YSkpICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgbGV0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgICBkdXBsZXg6IFwiaGFsZlwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjb250ZW50VHlwZUhlYWRlcjtcblxuICAgICAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSAmJiAoY29udGVudFR5cGVIZWFkZXIgPSBfcmVxdWVzdC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpKSB7XG4gICAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgICAgY29uc3QgW29uUHJvZ3Jlc3MsIGZsdXNoXSA9IHByb2dyZXNzRXZlbnREZWNvcmF0b3IoXG4gICAgICAgICAgICByZXF1ZXN0Q29udGVudExlbmd0aCxcbiAgICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uVXBsb2FkUHJvZ3Jlc3MpKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBkYXRhID0gdHJhY2tTdHJlYW0oX3JlcXVlc3QuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBvblByb2dyZXNzLCBmbHVzaCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF1dGlscy5pc1N0cmluZyh3aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICAgIHdpdGhDcmVkZW50aWFscyA9IHdpdGhDcmVkZW50aWFscyA/ICdpbmNsdWRlJyA6ICdvbWl0JztcbiAgICAgIH1cblxuICAgICAgLy8gQ2xvdWRmbGFyZSBXb3JrZXJzIHRocm93cyB3aGVuIGNyZWRlbnRpYWxzIGFyZSBkZWZpbmVkXG4gICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2Nsb3VkZmxhcmUvd29ya2VyZC9pc3N1ZXMvOTAyXG4gICAgICBjb25zdCBpc0NyZWRlbnRpYWxzU3VwcG9ydGVkID0gaXNSZXF1ZXN0U3VwcG9ydGVkICYmIFwiY3JlZGVudGlhbHNcIiBpbiBSZXF1ZXN0LnByb3RvdHlwZTtcblxuICAgICAgY29uc3QgcmVzb2x2ZWRPcHRpb25zID0ge1xuICAgICAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICAgIGhlYWRlcnM6IGhlYWRlcnMubm9ybWFsaXplKCkudG9KU09OKCksXG4gICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgIGR1cGxleDogXCJoYWxmXCIsXG4gICAgICAgIGNyZWRlbnRpYWxzOiBpc0NyZWRlbnRpYWxzU3VwcG9ydGVkID8gd2l0aENyZWRlbnRpYWxzIDogdW5kZWZpbmVkXG4gICAgICB9O1xuXG4gICAgICByZXF1ZXN0ID0gaXNSZXF1ZXN0U3VwcG9ydGVkICYmIG5ldyBSZXF1ZXN0KHVybCwgcmVzb2x2ZWRPcHRpb25zKTtcblxuICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgKGlzUmVxdWVzdFN1cHBvcnRlZCA/IGZldGNoKHJlcXVlc3QsIGZldGNoT3B0aW9ucykgOiBmZXRjaCh1cmwsIHJlc29sdmVkT3B0aW9ucykpO1xuXG4gICAgICBjb25zdCBpc1N0cmVhbVJlc3BvbnNlID0gc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAocmVzcG9uc2VUeXBlID09PSAnc3RyZWFtJyB8fCByZXNwb25zZVR5cGUgPT09ICdyZXNwb25zZScpO1xuXG4gICAgICBpZiAoc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAob25Eb3dubG9hZFByb2dyZXNzIHx8IChpc1N0cmVhbVJlc3BvbnNlICYmIHVuc3Vic2NyaWJlKSkpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG4gICAgICAgIFsnc3RhdHVzJywgJ3N0YXR1c1RleHQnLCAnaGVhZGVycyddLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgb3B0aW9uc1twcm9wXSA9IHJlc3BvbnNlW3Byb3BdO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXNwb25zZUNvbnRlbnRMZW5ndGggPSB1dGlscy50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG5cbiAgICAgICAgY29uc3QgW29uUHJvZ3Jlc3MsIGZsdXNoXSA9IG9uRG93bmxvYWRQcm9ncmVzcyAmJiBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICAgIHJlc3BvbnNlQ29udGVudExlbmd0aCxcbiAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvbkRvd25sb2FkUHJvZ3Jlc3MpLCB0cnVlKVxuICAgICAgICApIHx8IFtdO1xuXG4gICAgICAgIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKFxuICAgICAgICAgIHRyYWNrU3RyZWFtKHJlc3BvbnNlLmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25Qcm9ncmVzcywgKCkgPT4ge1xuICAgICAgICAgICAgZmx1c2ggJiYgZmx1c2goKTtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgfHwgJ3RleHQnO1xuXG4gICAgICBsZXQgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzb2x2ZXJzW3V0aWxzLmZpbmRLZXkocmVzb2x2ZXJzLCByZXNwb25zZVR5cGUpIHx8ICd0ZXh0J10ocmVzcG9uc2UsIGNvbmZpZyk7XG5cbiAgICAgICFpc1N0cmVhbVJlc3BvbnNlICYmIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG5cbiAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHtcbiAgICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgICAgaGVhZGVyczogQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyksXG4gICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgcmVxdWVzdFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHVuc3Vic2NyaWJlICYmIHVuc3Vic2NyaWJlKCk7XG5cbiAgICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9Mb2FkIGZhaWxlZHxmZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICAgIHRocm93IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgbmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNhdXNlOiBlcnIuY2F1c2UgfHwgZXJyXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlcnIsIGVyciAmJiBlcnIuY29kZSwgY29uZmlnLCByZXF1ZXN0KTtcbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc2VlZENhY2hlID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgY29uc3QgZ2V0RmV0Y2ggPSAoY29uZmlnKSA9PiB7XG4gIGxldCBlbnYgPSB1dGlscy5tZXJnZS5jYWxsKHtcbiAgICBza2lwVW5kZWZpbmVkOiB0cnVlXG4gIH0sIGdsb2JhbEZldGNoQVBJLCBjb25maWcgPyBjb25maWcuZW52IDogbnVsbCk7XG5cbiAgY29uc3Qge2ZldGNoLCBSZXF1ZXN0LCBSZXNwb25zZX0gPSBlbnY7XG5cbiAgY29uc3Qgc2VlZHMgPSBbXG4gICAgUmVxdWVzdCwgUmVzcG9uc2UsIGZldGNoXG4gIF07XG5cbiAgbGV0IGxlbiA9IHNlZWRzLmxlbmd0aCwgaSA9IGxlbixcbiAgICBzZWVkLCB0YXJnZXQsIG1hcCA9IHNlZWRDYWNoZTtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgc2VlZCA9IHNlZWRzW2ldO1xuICAgIHRhcmdldCA9IG1hcC5nZXQoc2VlZCk7XG5cbiAgICB0YXJnZXQgPT09IHVuZGVmaW5lZCAmJiBtYXAuc2V0KHNlZWQsIHRhcmdldCA9IChpID8gbmV3IE1hcCgpIDogZmFjdG9yeShlbnYpKSlcblxuICAgIG1hcCA9IHRhcmdldDtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5jb25zdCBhZGFwdGVyID0gZ2V0RmV0Y2goKTtcblxuZXhwb3J0IGRlZmF1bHQgYWRhcHRlcjtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgaHR0cEFkYXB0ZXIgZnJvbSAnLi9odHRwLmpzJztcbmltcG9ydCB4aHJBZGFwdGVyIGZyb20gJy4veGhyLmpzJztcbmltcG9ydCAqIGFzIGZldGNoQWRhcHRlciBmcm9tICcuL2ZldGNoLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcblxuY29uc3Qga25vd25BZGFwdGVycyA9IHtcbiAgaHR0cDogaHR0cEFkYXB0ZXIsXG4gIHhocjogeGhyQWRhcHRlcixcbiAgZmV0Y2g6IHtcbiAgICBnZXQ6IGZldGNoQWRhcHRlci5nZXRGZXRjaCxcbiAgfVxufVxuXG51dGlscy5mb3JFYWNoKGtub3duQWRhcHRlcnMsIChmbiwgdmFsdWUpID0+IHtcbiAgaWYgKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ25hbWUnLCB7dmFsdWV9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7dmFsdWV9KTtcbiAgfVxufSk7XG5cbmNvbnN0IHJlbmRlclJlYXNvbiA9IChyZWFzb24pID0+IGAtICR7cmVhc29ufWA7XG5cbmNvbnN0IGlzUmVzb2x2ZWRIYW5kbGUgPSAoYWRhcHRlcikgPT4gdXRpbHMuaXNGdW5jdGlvbihhZGFwdGVyKSB8fCBhZGFwdGVyID09PSBudWxsIHx8IGFkYXB0ZXIgPT09IGZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldEFkYXB0ZXI6IChhZGFwdGVycywgY29uZmlnKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscy5pc0FycmF5KGFkYXB0ZXJzKSA/IGFkYXB0ZXJzIDogW2FkYXB0ZXJzXTtcblxuICAgIGNvbnN0IHtsZW5ndGh9ID0gYWRhcHRlcnM7XG4gICAgbGV0IG5hbWVPckFkYXB0ZXI7XG4gICAgbGV0IGFkYXB0ZXI7XG5cbiAgICBjb25zdCByZWplY3RlZFJlYXNvbnMgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG5hbWVPckFkYXB0ZXIgPSBhZGFwdGVyc1tpXTtcbiAgICAgIGxldCBpZDtcblxuICAgICAgYWRhcHRlciA9IG5hbWVPckFkYXB0ZXI7XG5cbiAgICAgIGlmICghaXNSZXNvbHZlZEhhbmRsZShuYW1lT3JBZGFwdGVyKSkge1xuICAgICAgICBhZGFwdGVyID0ga25vd25BZGFwdGVyc1soaWQgPSBTdHJpbmcobmFtZU9yQWRhcHRlcikpLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICAgIGlmIChhZGFwdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgVW5rbm93biBhZGFwdGVyICcke2lkfSdgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWRhcHRlciAmJiAodXRpbHMuaXNGdW5jdGlvbihhZGFwdGVyKSB8fCAoYWRhcHRlciA9IGFkYXB0ZXIuZ2V0KGNvbmZpZykpKSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmVqZWN0ZWRSZWFzb25zW2lkIHx8ICcjJyArIGldID0gYWRhcHRlcjtcbiAgICB9XG5cbiAgICBpZiAoIWFkYXB0ZXIpIHtcblxuICAgICAgY29uc3QgcmVhc29ucyA9IE9iamVjdC5lbnRyaWVzKHJlamVjdGVkUmVhc29ucylcbiAgICAgICAgLm1hcCgoW2lkLCBzdGF0ZV0pID0+IGBhZGFwdGVyICR7aWR9IGAgK1xuICAgICAgICAgIChzdGF0ZSA9PT0gZmFsc2UgPyAnaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQnIDogJ2lzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJ1aWxkJylcbiAgICAgICAgKTtcblxuICAgICAgbGV0IHMgPSBsZW5ndGggP1xuICAgICAgICAocmVhc29ucy5sZW5ndGggPiAxID8gJ3NpbmNlIDpcXG4nICsgcmVhc29ucy5tYXAocmVuZGVyUmVhc29uKS5qb2luKCdcXG4nKSA6ICcgJyArIHJlbmRlclJlYXNvbihyZWFzb25zWzBdKSkgOlxuICAgICAgICAnYXMgbm8gYWRhcHRlciBzcGVjaWZpZWQnO1xuXG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIG5vIHN1aXRhYmxlIGFkYXB0ZXIgdG8gZGlzcGF0Y2ggdGhlIHJlcXVlc3QgYCArIHMsXG4gICAgICAgICdFUlJfTk9UX1NVUFBPUlQnXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBhZGFwdGVyO1xuICB9LFxuICBhZGFwdGVyczoga25vd25BZGFwdGVyc1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdHJhbnNmb3JtRGF0YSBmcm9tICcuL3RyYW5zZm9ybURhdGEuanMnO1xuaW1wb3J0IGlzQ2FuY2VsIGZyb20gJy4uL2NhbmNlbC9pc0NhbmNlbC5qcyc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgYWRhcHRlcnMgZnJvbSBcIi4uL2FkYXB0ZXJzL2FkYXB0ZXJzLmpzXCI7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShjb25maWcuaGVhZGVycyk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXIsIGNvbmZpZyk7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICBjb25maWcsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICByZXNwb25zZVxuICAgICk7XG5cbiAgICByZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20ocmVzcG9uc2UuaGVhZGVycyk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20ocmVhc29uLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn1cbiIsImV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIxLjEyLjFcIjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7VkVSU0lPTn0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gJ1tBeGlvcyB2JyArIFZFUlNJT04gKyAnXSBUcmFuc2l0aW9uYWwgb3B0aW9uIFxcJycgKyBvcHQgKyAnXFwnJyArIGRlc2MgKyAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh2YWx1ZSwgb3B0LCBvcHRzKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbnZhbGlkYXRvcnMuc3BlbGxpbmcgPSBmdW5jdGlvbiBzcGVsbGluZyhjb3JyZWN0U3BlbGxpbmcpIHtcbiAgcmV0dXJuICh2YWx1ZSwgb3B0KSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oYCR7b3B0fSBpcyBsaWtlbHkgYSBtaXNzcGVsbGluZyBvZiAke2NvcnJlY3RTcGVsbGluZ31gKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0J3MgcHJvcGVydGllcyB0eXBlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0T3B0aW9ucyhvcHRpb25zLCBzY2hlbWEsIGFsbG93VW5rbm93bikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgY29uc3Qgb3B0ID0ga2V5c1tpXTtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBzY2hlbWFbb3B0XTtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnNcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcbmltcG9ydCBidWlsZFVSTCBmcm9tICcuLi9oZWxwZXJzL2J1aWxkVVJMLmpzJztcbmltcG9ydCBJbnRlcmNlcHRvck1hbmFnZXIgZnJvbSAnLi9JbnRlcmNlcHRvck1hbmFnZXIuanMnO1xuaW1wb3J0IGRpc3BhdGNoUmVxdWVzdCBmcm9tICcuL2Rpc3BhdGNoUmVxdWVzdC5qcyc7XG5pbXBvcnQgbWVyZ2VDb25maWcgZnJvbSAnLi9tZXJnZUNvbmZpZy5qcyc7XG5pbXBvcnQgYnVpbGRGdWxsUGF0aCBmcm9tICcuL2J1aWxkRnVsbFBhdGguanMnO1xuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi9oZWxwZXJzL3ZhbGlkYXRvci5qcyc7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gJy4vQXhpb3NIZWFkZXJzLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5jbGFzcyBBeGlvcyB7XG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnIHx8IHt9O1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gY29uZmlnT3JVcmwgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICAgKiBAcGFyYW0gez9PYmplY3R9IGNvbmZpZ1xuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gICAqL1xuICBhc3luYyByZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgbGV0IGR1bW15ID0ge307XG5cbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgPyBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShkdW1teSkgOiAoZHVtbXkgPSBuZXcgRXJyb3IoKSk7XG5cbiAgICAgICAgLy8gc2xpY2Ugb2ZmIHRoZSBFcnJvcjogLi4uIGxpbmVcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBkdW1teS5zdGFjayA/IGR1bW15LnN0YWNrLnJlcGxhY2UoL14uK1xcbi8sICcnKSA6ICcnO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghZXJyLnN0YWNrKSB7XG4gICAgICAgICAgICBlcnIuc3RhY2sgPSBzdGFjaztcbiAgICAgICAgICAgIC8vIG1hdGNoIHdpdGhvdXQgdGhlIDIgdG9wIHN0YWNrIGxpbmVzXG4gICAgICAgICAgfSBlbHNlIGlmIChzdGFjayAmJiAhU3RyaW5nKGVyci5zdGFjaykuZW5kc1dpdGgoc3RhY2sucmVwbGFjZSgvXi4rXFxuLitcXG4vLCAnJykpKSB7XG4gICAgICAgICAgICBlcnIuc3RhY2sgKz0gJ1xcbicgKyBzdGFja1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlnbm9yZSB0aGUgY2FzZSB3aGVyZSBcInN0YWNrXCIgaXMgYW4gdW4td3JpdGFibGUgcHJvcGVydHlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcgPSBjb25maWdPclVybCB8fCB7fTtcbiAgICB9XG5cbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgY29uc3Qge3RyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVyc30gPSBjb25maWc7XG5cbiAgICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xuICAgICAgICBzaWxlbnRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJhbXNTZXJpYWxpemVyKSkge1xuICAgICAgICBjb25maWcucGFyYW1zU2VyaWFsaXplciA9IHtcbiAgICAgICAgICBzZXJpYWxpemU6IHBhcmFtc1NlcmlhbGl6ZXJcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMocGFyYW1zU2VyaWFsaXplciwge1xuICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICBzZXJpYWxpemU6IHZhbGlkYXRvcnMuZnVuY3Rpb25cbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IGNvbmZpZy5hbGxvd0Fic29sdXRlVXJsc1xuICAgIGlmIChjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5hbGxvd0Fic29sdXRlVXJscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgPSB0aGlzLmRlZmF1bHRzLmFsbG93QWJzb2x1dGVVcmxzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKGNvbmZpZywge1xuICAgICAgYmFzZVVybDogdmFsaWRhdG9ycy5zcGVsbGluZygnYmFzZVVSTCcpLFxuICAgICAgd2l0aFhzcmZUb2tlbjogdmFsaWRhdG9ycy5zcGVsbGluZygnd2l0aFhTUkZUb2tlbicpXG4gICAgfSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICAgIGNvbmZpZy5tZXRob2QgPSAoY29uZmlnLm1ldGhvZCB8fCB0aGlzLmRlZmF1bHRzLm1ldGhvZCB8fCAnZ2V0JykudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICAgIGxldCBjb250ZXh0SGVhZGVycyA9IGhlYWRlcnMgJiYgdXRpbHMubWVyZ2UoXG4gICAgICBoZWFkZXJzLmNvbW1vbixcbiAgICAgIGhlYWRlcnNbY29uZmlnLm1ldGhvZF1cbiAgICApO1xuXG4gICAgaGVhZGVycyAmJiB1dGlscy5mb3JFYWNoKFxuICAgICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgICAobWV0aG9kKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW21ldGhvZF07XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmNvbmNhdChjb250ZXh0SGVhZGVycywgaGVhZGVycyk7XG5cbiAgICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gICAgY29uc3QgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICBsZXQgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgbGV0IHByb21pc2U7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsZW47XG5cbiAgICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgICAgY29uc3QgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LmJpbmQodGhpcyksIHVuZGVmaW5lZF07XG4gICAgICBjaGFpbi51bnNoaWZ0KC4uLnJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2goLi4ucmVzcG9uc2VJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGxlbiA9IGNoYWluLmxlbmd0aDtcblxuICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gICAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluW2krK10sIGNoYWluW2krK10pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBsZW4gPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICBsZXQgbmV3Q29uZmlnID0gY29uZmlnO1xuXG4gICAgaSA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgY29uc3Qgb25GdWxmaWxsZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgY29uc3Qgb25SZWplY3RlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICB0cnkge1xuICAgICAgICBuZXdDb25maWcgPSBvbkZ1bGZpbGxlZChuZXdDb25maWcpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgb25SZWplY3RlZC5jYWxsKHRoaXMsIGVycm9yKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHByb21pc2UgPSBkaXNwYXRjaFJlcXVlc3QuY2FsbCh0aGlzLCBuZXdDb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxuICAgIGkgPSAwO1xuICAgIGxlbiA9IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihyZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZ2V0VXJpKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gICAgY29uc3QgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsLCBjb25maWcuYWxsb3dBYnNvbHV0ZVVybHMpO1xuICAgIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuICB9XG59XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBpc0Zvcm0gPyB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgICB9IDoge30sXG4gICAgICAgIHVybCxcbiAgICAgICAgZGF0YVxuICAgICAgfSkpO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL0NhbmNlbGVkRXJyb3IuanMnO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxUb2tlbn1cbiAqL1xuY2xhc3MgQ2FuY2VsVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbihjYW5jZWwgPT4ge1xuICAgICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgIGxldCBpID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIHRva2VuLl9saXN0ZW5lcnNbaV0oY2FuY2VsKTtcbiAgICAgIH1cbiAgICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbiA9IG9uZnVsZmlsbGVkID0+IHtcbiAgICAgIGxldCBfcmVzb2x2ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAgICovXG4gIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHRvQWJvcnRTaWduYWwoKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGNvbnN0IGFib3J0ID0gKGVycikgPT4ge1xuICAgICAgY29udHJvbGxlci5hYm9ydChlcnIpO1xuICAgIH07XG5cbiAgICB0aGlzLnN1YnNjcmliZShhYm9ydCk7XG5cbiAgICBjb250cm9sbGVyLnNpZ25hbC51bnN1YnNjcmliZSA9ICgpID0+IHRoaXMudW5zdWJzY3JpYmUoYWJvcnQpO1xuXG4gICAgcmV0dXJuIGNvbnRyb2xsZXIuc2lnbmFsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi8uLi91dGlscy5qcyc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuIiwiY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBTdGF0dXNDb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBDYW5jZWxUb2tlbiBmcm9tICcuL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuL2Vudi9kYXRhLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBzcHJlYWQgZnJvbSAnLi9oZWxwZXJzL3NwcmVhZC5qcyc7XG5pbXBvcnQgaXNBeGlvc0Vycm9yIGZyb20gJy4vaGVscGVycy9pc0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IEh0dHBTdGF0dXNDb2RlIGZyb20gJy4vaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycztcblxuYXhpb3MuZm9ybVRvSlNPTiA9IHRoaW5nID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGU7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxuLy8gdGhpcyBtb2R1bGUgc2hvdWxkIG9ubHkgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBheGlvc1xuIiwiaW1wb3J0IGF4aW9zIGZyb20gJy4vbGliL2F4aW9zLmpzJztcblxuLy8gVGhpcyBtb2R1bGUgaXMgaW50ZW5kZWQgdG8gdW53cmFwIEF4aW9zIGRlZmF1bHQgZXhwb3J0IGFzIG5hbWVkLlxuLy8gS2VlcCB0b3AtbGV2ZWwgZXhwb3J0IHNhbWUgd2l0aCBzdGF0aWMgcHJvcGVydGllc1xuLy8gc28gdGhhdCBpdCBjYW4ga2VlcCBzYW1lIHdpdGggZXMgbW9kdWxlIG9yIGNqc1xuY29uc3Qge1xuICBBeGlvcyxcbiAgQXhpb3NFcnJvcixcbiAgQ2FuY2VsZWRFcnJvcixcbiAgaXNDYW5jZWwsXG4gIENhbmNlbFRva2VuLFxuICBWRVJTSU9OLFxuICBhbGwsXG4gIENhbmNlbCxcbiAgaXNBeGlvc0Vycm9yLFxuICBzcHJlYWQsXG4gIHRvRm9ybURhdGEsXG4gIEF4aW9zSGVhZGVycyxcbiAgSHR0cFN0YXR1c0NvZGUsXG4gIGZvcm1Ub0pTT04sXG4gIGdldEFkYXB0ZXIsXG4gIG1lcmdlQ29uZmlnXG59ID0gYXhpb3M7XG5cbmV4cG9ydCB7XG4gIGF4aW9zIGFzIGRlZmF1bHQsXG4gIEF4aW9zLFxuICBBeGlvc0Vycm9yLFxuICBDYW5jZWxlZEVycm9yLFxuICBpc0NhbmNlbCxcbiAgQ2FuY2VsVG9rZW4sXG4gIFZFUlNJT04sXG4gIGFsbCxcbiAgQ2FuY2VsLFxuICBpc0F4aW9zRXJyb3IsXG4gIHNwcmVhZCxcbiAgdG9Gb3JtRGF0YSxcbiAgQXhpb3NIZWFkZXJzLFxuICBIdHRwU3RhdHVzQ29kZSxcbiAgZm9ybVRvSlNPTixcbiAgZ2V0QWRhcHRlcixcbiAgbWVyZ2VDb25maWdcbn1cbiIsIi8qISBodHRwczovL210aHMuYmUvYmFzZTY0IHYxLjAuMCBieSBAbWF0aGlhcyB8IE1JVCBsaWNlbnNlICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgLlxuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLlxuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0bW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsIGFuZCB1c2Vcblx0Ly8gaXQgYXMgYHJvb3RgLlxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fTtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cblx0dmFyIGVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdC8vIE5vdGU6IHRoZSBlcnJvciBtZXNzYWdlcyB1c2VkIHRocm91Z2hvdXQgdGhpcyBmaWxlIG1hdGNoIHRob3NlIHVzZWQgYnlcblx0XHQvLyB0aGUgbmF0aXZlIGBhdG9iYC9gYnRvYWAgaW1wbGVtZW50YXRpb24gaW4gQ2hyb21pdW0uXG5cdFx0dGhyb3cgbmV3IEludmFsaWRDaGFyYWN0ZXJFcnJvcihtZXNzYWdlKTtcblx0fTtcblxuXHR2YXIgVEFCTEUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cdC8vIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvY29tbW9uLW1pY3Jvc3ludGF4ZXMuaHRtbCNzcGFjZS1jaGFyYWN0ZXJcblx0dmFyIFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMgPSAvW1xcdFxcblxcZlxcciBdL2c7XG5cblx0Ly8gYGRlY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBhdG9iYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQuIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYXRvYlxuXHQvLyBUaGUgb3B0aW1pemVkIGJhc2U2NC1kZWNvZGluZyBhbGdvcml0aG0gdXNlZCBpcyBiYXNlZCBvbiBAYXRr4oCZcyBleGNlbGxlbnRcblx0Ly8gaW1wbGVtZW50YXRpb24uIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2F0ay8xMDIwMzk2XG5cdHZhciBkZWNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KVxuXHRcdFx0LnJlcGxhY2UoUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUywgJycpO1xuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0aWYgKGxlbmd0aCAlIDQgPT0gMCkge1xuXHRcdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKC89PT8kLywgJycpO1xuXHRcdFx0bGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRsZW5ndGggJSA0ID09IDEgfHxcblx0XHRcdC8vIGh0dHA6Ly93aGF0d2cub3JnL0MjYWxwaGFudW1lcmljLWFzY2lpLWNoYXJhY3RlcnNcblx0XHRcdC9bXithLXpBLVowLTkvXS8udGVzdChpbnB1dClcblx0XHQpIHtcblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnSW52YWxpZCBjaGFyYWN0ZXI6IHRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIGJpdENvdW50ZXIgPSAwO1xuXHRcdHZhciBiaXRTdG9yYWdlO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHRidWZmZXIgPSBUQUJMRS5pbmRleE9mKGlucHV0LmNoYXJBdChwb3NpdGlvbikpO1xuXHRcdFx0Yml0U3RvcmFnZSA9IGJpdENvdW50ZXIgJSA0ID8gYml0U3RvcmFnZSAqIDY0ICsgYnVmZmVyIDogYnVmZmVyO1xuXHRcdFx0Ly8gVW5sZXNzIHRoaXMgaXMgdGhlIGZpcnN0IG9mIGEgZ3JvdXAgb2YgNCBjaGFyYWN0ZXJz4oCmXG5cdFx0XHRpZiAoYml0Q291bnRlcisrICUgNCkge1xuXHRcdFx0XHQvLyDigKZjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gYSBzaW5nbGUgQVNDSUkgY2hhcmFjdGVyLlxuXHRcdFx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0XHRcdFx0XHQweEZGICYgYml0U3RvcmFnZSA+PiAoLTIgKiBiaXRDb3VudGVyICYgNilcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHQvLyBgZW5jb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGJ0b2FgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZDogaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1idG9hXG5cdHZhciBlbmNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KTtcblx0XHRpZiAoL1teXFwwLVxceEZGXS8udGVzdChpbnB1dCkpIHtcblx0XHRcdC8vIE5vdGU6IG5vIG5lZWQgdG8gc3BlY2lhbC1jYXNlIGFzdHJhbCBzeW1ib2xzIGhlcmUsIGFzIHN1cnJvZ2F0ZXMgYXJlXG5cdFx0XHQvLyBtYXRjaGVkLCBhbmQgdGhlIGlucHV0IGlzIHN1cHBvc2VkIHRvIG9ubHkgY29udGFpbiBBU0NJSSBhbnl3YXkuXG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J1RoZSBzdHJpbmcgdG8gYmUgZW5jb2RlZCBjb250YWlucyBjaGFyYWN0ZXJzIG91dHNpZGUgb2YgdGhlICcgK1xuXHRcdFx0XHQnTGF0aW4xIHJhbmdlLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBwYWRkaW5nID0gaW5wdXQubGVuZ3RoICUgMztcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0dmFyIGE7XG5cdFx0dmFyIGI7XG5cdFx0dmFyIGM7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHQvLyBNYWtlIHN1cmUgYW55IHBhZGRpbmcgaXMgaGFuZGxlZCBvdXRzaWRlIG9mIHRoZSBsb29wLlxuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGggLSBwYWRkaW5nO1xuXG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdC8vIFJlYWQgdGhyZWUgYnl0ZXMsIGkuZS4gMjQgYml0cy5cblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCAxNjtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pIDw8IDg7XG5cdFx0XHRjID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiICsgYztcblx0XHRcdC8vIFR1cm4gdGhlIDI0IGJpdHMgaW50byBmb3VyIGNodW5rcyBvZiA2IGJpdHMgZWFjaCwgYW5kIGFwcGVuZCB0aGVcblx0XHRcdC8vIG1hdGNoaW5nIGNoYXJhY3RlciBmb3IgZWFjaCBvZiB0aGVtIHRvIHRoZSBvdXRwdXQuXG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDE4ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEyICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDYgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgJiAweDNGKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAocGFkZGluZyA9PSAyKSB7XG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgODtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGI7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEwKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyID4+IDQpICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCAyKSAmIDB4M0YpICtcblx0XHRcdFx0Jz0nXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAocGFkZGluZyA9PSAxKSB7XG5cdFx0XHRidWZmZXIgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCA0KSAmIDB4M0YpICtcblx0XHRcdFx0Jz09J1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdHZhciBiYXNlNjQgPSB7XG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCd2ZXJzaW9uJzogJzEuMC4wJ1xuXHR9O1xuXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGJhc2U2NDtcblx0XHR9KTtcblx0fVx0ZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG5cdFx0aWYgKGZyZWVNb2R1bGUpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IGJhc2U2NDtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGJhc2U2NCkge1xuXHRcdFx0XHRiYXNlNjQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IGJhc2U2NFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LmJhc2U2NCA9IGJhc2U2NDtcblx0fVxuXG59KHRoaXMpKTtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgU3ViYWNjb3VudHNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3ViYWNjb3VudHNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBTdWJhY2NvdW50c0NsaWVudC5wcm90b3R5cGUuY29udmVydFRvRGF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciByZXMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGF0YSksIHsgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KSwgdXBkYXRlZF9hdDogbmV3IERhdGUoZGF0YS51cGRhdGVkX2F0KSB9KTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICAgIFN1YmFjY291bnRzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoJy92NS9hY2NvdW50cy9zdWJhY2NvdW50cycsIHF1ZXJ5KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsOiByZXMuYm9keS50b3RhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViYWNjb3VudHM6IHJlcy5ib2R5LnN1YmFjY291bnRzLm1hcCh0aGlzLmNvbnZlcnRUb0RhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViYWNjb3VudHNDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y1L2FjY291bnRzL3N1YmFjY291bnRzL1wiLmNvbmNhdChpZCkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViYWNjb3VudDogdGhpcy5jb252ZXJ0VG9EYXRlKHJlcy5ib2R5LnN1YmFjY291bnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViYWNjb3VudHNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMnLCB7IG5hbWU6IG5hbWUgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJhY2NvdW50OiB0aGlzLmNvbnZlcnRUb0RhdGUocmVzLmJvZHkuc3ViYWNjb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdWJhY2NvdW50c0NsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UsIGVycm9yXzE7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDIsICwgM10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LnNldFN1YmFjY291bnRIZWFkZXIoaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmRlbGV0ZSgnL3Y1L2FjY291bnRzL3N1YmFjY291bnRzJyldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5yZXNldFN1YmFjY291bnRIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZS5ib2R5XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdC5yZXNldFN1YmFjY291bnRIZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yXzE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFN1YmFjY291bnRzQ2xpZW50LnByb3RvdHlwZS5nZXRNb250aGx5U2VuZGluZ0xpbWl0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldChcIi92NS9hY2NvdW50cy9zdWJhY2NvdW50cy9cIi5jb25jYXQoaWQsIFwiL2xpbWl0L2N1c3RvbS9tb250aGx5XCIpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlLmJvZHldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFN1YmFjY291bnRzQ2xpZW50LnByb3RvdHlwZS5zZXRNb250aGx5U2VuZGluZ0xpbWl0ID0gZnVuY3Rpb24gKGlkLCBsaW1pdCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VzdG9tTGltaXQsIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTGltaXQgPSB7IHF1ZXJ5OiBcImxpbWl0PVwiLmNvbmNhdChsaW1pdCkgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wdXQoXCIvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMvXCIuY29uY2F0KGlkLCBcIi9saW1pdC9jdXN0b20vbW9udGhseVwiKSwgdW5kZWZpbmVkLCBjdXN0b21MaW1pdCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNwb25zZS5ib2R5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTdWJhY2NvdW50c0NsaWVudC5wcm90b3R5cGUudXBkYXRlU3ViYWNjb3VudEZlYXR1cmUgPSBmdW5jdGlvbiAoaWQsIGZlYXR1cmVzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBrZXlzLCByZWFkeUZlYXR1cmVzLCByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMgPSBbJ2VtYWlsX3ByZXZpZXcnLCAnaW5ib3hfcGxhY2VtZW50JywgJ3NlbmRpbmcnLCAndmFsaWRhdGlvbnMnLCAndmFsaWRhdGlvbnNfYnVsayddO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZHlGZWF0dXJlcyA9IGtleXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGN1cnJlbnRGZWF0dXJlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50RmVhdHVyZU5hbWUgaW4gZmVhdHVyZXMgJiYgdHlwZW9mIGZlYXR1cmVzW2N1cnJlbnRGZWF0dXJlTmFtZV0gPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2NbY3VycmVudEZlYXR1cmVOYW1lXSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZlYXR1cmVzW2N1cnJlbnRGZWF0dXJlTmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucHV0KFwiL3Y1L2FjY291bnRzL3N1YmFjY291bnRzL1wiLmNvbmNhdChpZCwgXCIvZmVhdHVyZXNcIiksIHJlYWR5RmVhdHVyZXMpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcG9uc2UuYm9keV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ViYWNjb3VudHNDbGllbnQucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoXCIvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMvXCIuY29uY2F0KGlkLCBcIi9lbmFibGVcIikpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuYm9keTsgfSk7XG4gICAgfTtcbiAgICBTdWJhY2NvdW50c0NsaWVudC5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoXCIvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMvXCIuY29uY2F0KGlkLCBcIi9kaXNhYmxlXCIpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pO1xuICAgIH07XG4gICAgU3ViYWNjb3VudHNDbGllbnQuU1VCQUNDT1VOVF9IRUFERVIgPSAnWC1NYWlsZ3VuLU9uLUJlaGFsZi1PZic7XG4gICAgcmV0dXJuIFN1YmFjY291bnRzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFN1YmFjY291bnRzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCBheGlvcywgeyBBeGlvc0hlYWRlcnMsIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gJ2Jhc2UtNjQnO1xuaW1wb3J0IFN1YmFjY291bnRzQ2xpZW50IGZyb20gJy4uLy4uL1N1YmFjY291bnRzLmpzJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9FcnJvci5qcyc7XG52YXIgQXhpb3NQcm92aWRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBeGlvc1Byb3ZpZGVyKF9hKSB7XG4gICAgICAgIHZhciB1c2VybmFtZSA9IF9hLnVzZXJuYW1lLCBrZXkgPSBfYS5rZXksIHRpbWVvdXQgPSBfYS50aW1lb3V0LCBtYXhCb2R5TGVuZ3RoID0gX2EubWF4Qm9keUxlbmd0aCwgcHJveHkgPSBfYS5wcm94eSwgY29uZmlnSGVhZGVycyA9IF9hLmNvbmZpZ0hlYWRlcnMsIHVzZUZldGNoID0gX2EudXNlRmV0Y2g7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgICAgIHRoaXMubWF4Qm9keUxlbmd0aCA9IG1heEJvZHlMZW5ndGg7XG4gICAgICAgIHRoaXMucHJveHkgPSBwcm94eTtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXJuYW1lO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3QoY29uZmlnSGVhZGVycyk7XG4gICAgICAgIHRoaXMudXNlRmV0Y2ggPSB1c2VGZXRjaDtcbiAgICB9XG4gICAgQXhpb3NQcm92aWRlci5wcm90b3R5cGUuZ2V0UmVzcG9uc2VCb2R5ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmVzID0ge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiB7fSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZSA9PT0gbnVsbCB8fCByZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhID09PSAnTWFpbGd1biBNYWduaWZpY2VudCBBUEknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6ICdJbmNvcnJlY3QgdXJsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiByZXNwb25zZS5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXMuYm9keSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5ib2R5ID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBeGlvc1Byb3ZpZGVyLnByb3RvdHlwZS5nZXREYXRhUmVsYXRlZEhlYWRlcnMgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGlzRm9ybVVSTEVuY29kZWQgPSAoX2EgPSBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuaXNGb3JtVVJMRW5jb2RlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdHJ1ZTtcbiAgICAgICAgdmFyIGlzTXVsdGlwYXJ0Rm9ybURhdGEgPSBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuaXNNdWx0aXBhcnRGb3JtRGF0YTtcbiAgICAgICAgdmFyIGlzQXBwbGljYXRpb25KU09OID0gY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnLmlzQXBwbGljYXRpb25KU09OO1xuICAgICAgICB2YXIgaGVhZGVycyA9IHt9O1xuICAgICAgICBpZiAoaXNGb3JtVVJMRW5jb2RlZCkge1xuICAgICAgICAgICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNNdWx0aXBhcnRGb3JtRGF0YSkge1xuICAgICAgICAgICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXBwbGljYXRpb25KU09OKSB7XG4gICAgICAgICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9O1xuICAgIEF4aW9zUHJvdmlkZXIucHJvdG90eXBlLmFkZFJlcXVlc3RMZXZlbEhlYWRlcnMgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IG5ldyBBeGlvc0hlYWRlcnMoKTtcbiAgICAgICAgdmFyIGJhc2ljID0gYmFzZTY0LmVuY29kZShcIlwiLmNvbmNhdCh0aGlzLnVzZXJuYW1lLCBcIjpcIikuY29uY2F0KHRoaXMua2V5KSk7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzLnNldEF1dGhvcml6YXRpb24oXCJCYXNpYyBcIi5jb25jYXQoYmFzaWMpKTtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnMuc2V0KHRoaXMuaGVhZGVycyk7XG4gICAgICAgIHZhciBkYXRhUmVsYXRlZEhlYWRlcnMgPSB0aGlzLmdldERhdGFSZWxhdGVkSGVhZGVycyhjb25maWcpO1xuICAgICAgICB2YXIgb25DYWxsSGVhZGVycyA9IHRoaXMubWFrZUhlYWRlcnNGcm9tT2JqZWN0KGRhdGFSZWxhdGVkSGVhZGVycyk7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzLnNldChvbkNhbGxIZWFkZXJzKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RIZWFkZXJzO1xuICAgIH07XG4gICAgQXhpb3NQcm92aWRlci5wcm90b3R5cGUubWFrZUhlYWRlcnNGcm9tT2JqZWN0ID0gZnVuY3Rpb24gKGhlYWRlcnNPYmplY3QpIHtcbiAgICAgICAgaWYgKGhlYWRlcnNPYmplY3QgPT09IHZvaWQgMCkgeyBoZWFkZXJzT2JqZWN0ID0ge307IH1cbiAgICAgICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gbmV3IEF4aW9zSGVhZGVycygpO1xuICAgICAgICByZXF1ZXN0SGVhZGVycyA9IE9iamVjdC5lbnRyaWVzKGhlYWRlcnNPYmplY3QpLnJlZHVjZShmdW5jdGlvbiAoaGVhZGVyc0FjY3VtdWxhdG9yLCBjdXJyZW50UGFpcikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGN1cnJlbnRQYWlyWzBdLCB2YWx1ZSA9IGN1cnJlbnRQYWlyWzFdO1xuICAgICAgICAgICAgaGVhZGVyc0FjY3VtdWxhdG9yLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJzQWNjdW11bGF0b3I7XG4gICAgICAgIH0sIHJlcXVlc3RIZWFkZXJzKTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RIZWFkZXJzO1xuICAgIH07XG4gICAgQXhpb3NQcm92aWRlci5wcm90b3R5cGUuc2V0U3ViQWNjb3VudEhlYWRlciA9IGZ1bmN0aW9uIChzdWJBY2NvdW50SWQpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzLnNldChTdWJhY2NvdW50c0NsaWVudC5TVUJBQ0NPVU5UX0hFQURFUiwgc3ViQWNjb3VudElkKTtcbiAgICB9O1xuICAgIEF4aW9zUHJvdmlkZXIucHJvdG90eXBlLnJlc2V0U3ViQWNjb3VudEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzLmRlbGV0ZShTdWJhY2NvdW50c0NsaWVudC5TVUJBQ0NPVU5UX0hFQURFUik7XG4gICAgfTtcbiAgICBBeGlvc1Byb3ZpZGVyLnByb3RvdHlwZS5tYWtlUmVxdWVzdCA9IGZ1bmN0aW9uICh1cmwsIG1ldGhvZCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UsIHJlcXVlc3RIZWFkZXJzLCByZXFPYmplY3QsIGVycl8xLCBlcnJvclJlc3BvbnNlLCByZXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9kKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfZC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SGVhZGVycyA9IHRoaXMuYWRkUmVxdWVzdExldmVsSGVhZGVycyhjb25maWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2QubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfZC50cnlzLnB1c2goWzEsIDMsICwgNF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxT2JqZWN0ID0gX19hc3NpZ24oX19hc3NpZ24oeyBtZXRob2Q6IG1ldGhvZC50b0xvY2FsZVVwcGVyQ2FzZSgpLCB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsIHVybDogdXJsLCBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyB9LCBkYXRhKSwgeyBtYXhCb2R5TGVuZ3RoOiB0aGlzLm1heEJvZHlMZW5ndGgsIHByb3h5OiB0aGlzLnByb3h5IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlRmV0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXFPYmplY3QuYWRhcHRlciA9ICdmZXRjaCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy5kYXRhU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmRhdGFTaXplID4gMCAmJiBjb25maWcuZGF0YVNpemUgPiB0aGlzLm1heEJvZHlMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogJyhGZXRjaCkgUmVxdWVzdCBib2R5IGxhcmdlciB0aGFuIG1heEJvZHlMZW5ndGggbGltaXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IFwiKEZldGNoKSBSZXF1ZXN0IGJvZHkgc2l6ZSBvZiBcIi5jb25jYXQoY29uZmlnLmRhdGFTaXplLCBcIiBieXRlcyBleGNlZWRzIHRoZSBtYXhpbXVtIGFsbG93ZWQgc2l6ZSBvZiBcIikuY29uY2F0KHRoaXMubWF4Qm9keUxlbmd0aCwgXCIgYnl0ZXNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgYXhpb3MucmVxdWVzdChyZXFPYmplY3QpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfZC5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyXzEgPSBfZC5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclJlc3BvbnNlID0gZXJyXzE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogKChfYSA9IGVycm9yUmVzcG9uc2UgPT09IG51bGwgfHwgZXJyb3JSZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3JSZXNwb25zZS5yZXNwb25zZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnN0YXR1cykgfHwgNDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6ICgoX2IgPSBlcnJvclJlc3BvbnNlID09PSBudWxsIHx8IGVycm9yUmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9yUmVzcG9uc2UucmVzcG9uc2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zdGF0dXNUZXh0KSB8fCBlcnJvclJlc3BvbnNlLmNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogKChfYyA9IGVycm9yUmVzcG9uc2UgPT09IG51bGwgfHwgZXJyb3JSZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3JSZXNwb25zZS5yZXNwb25zZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmRhdGEpIHx8IGVycm9yUmVzcG9uc2UubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5nZXRSZXNwb25zZUJvZHkocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Quc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEF4aW9zUHJvdmlkZXI7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgQXhpb3NQcm92aWRlcjtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgRm9ybURhdGFCdWlsZGVyIGZyb20gJy4vRm9ybURhdGFCdWlsZGVyLmpzJztcbmltcG9ydCBBeGlvc1Byb3ZpZGVyIGZyb20gJy4vUmVxdWVzdFByb3ZpZGVycy9BeGlvc1Byb3ZpZGVyLmpzJztcbnZhciBSZXF1ZXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlcXVlc3Qob3B0aW9ucywgZm9ybURhdGEpIHtcbiAgICAgICAgdGhpcy51cmwgPSBvcHRpb25zLnVybDtcbiAgICAgICAgdGhpcy5mb3JtRGF0YUJ1aWxkZXIgPSBuZXcgRm9ybURhdGFCdWlsZGVyKGZvcm1EYXRhLCB7IHVzZUZldGNoOiBvcHRpb25zLnVzZUZldGNoIH0pO1xuICAgICAgICB2YXIgcHJvdmlkZXJzQ29uZmlnID0ge1xuICAgICAgICAgICAgdGltZW91dDogb3B0aW9ucy50aW1lb3V0LFxuICAgICAgICAgICAgbWF4Qm9keUxlbmd0aDogNTI0Mjg4MDAsXG4gICAgICAgICAgICBwcm94eTogb3B0aW9ucy5wcm94eSxcbiAgICAgICAgICAgIHVzZXJuYW1lOiBvcHRpb25zLnVzZXJuYW1lLFxuICAgICAgICAgICAga2V5OiBvcHRpb25zLmtleSxcbiAgICAgICAgICAgIGNvbmZpZ0hlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgIHVzZUZldGNoOiBvcHRpb25zLnVzZUZldGNoXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVxdWVzdFByb3ZpZGVyID0gbmV3IEF4aW9zUHJvdmlkZXIocHJvdmlkZXJzQ29uZmlnKTtcbiAgICB9XG4gICAgUmVxdWVzdC5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIChtZXRob2QsIHVybCwgb25DYWxsT3B0aW9ucywgY29uZmlnKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMsIHBhcmFtcywgZnVsbFVybDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gX19hc3NpZ24oe30sIG9uQ2FsbE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuaXNTdG9yYWdlQVBJKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxVcmwgPSB1cmw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmdWxsVXJsID0gdXJsam9pbih0aGlzLnVybCwgdXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucXVlcnkpICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5xdWVyeSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnF1ZXJ5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2VhcmNoUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMucGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhvcHRpb25zLnF1ZXJ5LnNlYXJjaFBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMucGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhvcHRpb25zLnF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmRhdGEgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuYm9keTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucmVxdWVzdFByb3ZpZGVyLm1ha2VSZXF1ZXN0KGZ1bGxVcmwsIG1ldGhvZC50b1VwcGVyQ2FzZSgpLCBwYXJhbXMsIGNvbmZpZyldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUuc2V0U3ViYWNjb3VudEhlYWRlciA9IGZ1bmN0aW9uIChzdWJBY2NvdW50SWQpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0UHJvdmlkZXIuc2V0U3ViQWNjb3VudEhlYWRlcihzdWJBY2NvdW50SWQpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUucmVzZXRTdWJhY2NvdW50SGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlcXVlc3RQcm92aWRlci5yZXNldFN1YkFjY291bnRIZWFkZXIoKTtcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB7IHF1ZXJ5OiBxdWVyeSB9KTtcbiAgICB9O1xuICAgIFJlcXVlc3QucHJvdG90eXBlLmNvbW1hbmQgPSBmdW5jdGlvbiAobWV0aG9kLCB1cmwsIGRhdGEsIGNvbmZpZywgcXVlcnlPYmplY3QpIHtcbiAgICAgICAgdmFyIHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeU9iamVjdCA9PT0gbnVsbCB8fCBxdWVyeU9iamVjdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcXVlcnlPYmplY3QucXVlcnksXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHJlcXVlc3RPcHRpb25zLCBjb25maWcpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHVybCwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkoJ2dldCcsIHVybCwgcXVlcnkpO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBkYXRhLCB7XG4gICAgICAgICAgICBpc0Zvcm1VUkxFbmNvZGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGlzQXBwbGljYXRpb25KU09OOiBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuaXNBcHBsaWNhdGlvbkpTT05cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5wb3N0V2l0aEZEID0gZnVuY3Rpb24gKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EsIGZvcm1EYXRhLCBkYXRhU2l6ZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgZm9ybURhdGEgPSBfYS5mb3JtRGF0YSwgZGF0YVNpemUgPSBfYS5kYXRhU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRm9ybVVSTEVuY29kZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc011bHRpcGFydEZvcm1EYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhU2l6ZTogZGF0YVNpemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVxdWVzdC5wcm90b3R5cGUucHV0V2l0aEZEID0gZnVuY3Rpb24gKHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EsIGZvcm1EYXRhLCBkYXRhU2l6ZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IF9iLnNlbnQoKSwgZm9ybURhdGEgPSBfYS5mb3JtRGF0YSwgZGF0YVNpemUgPSBfYS5kYXRhU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGb3JtVVJMRW5jb2RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTXVsdGlwYXJ0Rm9ybURhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTaXplOiBkYXRhU2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5wYXRjaFdpdGhGRCA9IGZ1bmN0aW9uICh1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF9hLCBmb3JtRGF0YSwgZGF0YVNpemU7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCksIGZvcm1EYXRhID0gX2EuZm9ybURhdGEsIGRhdGFTaXplID0gX2EuZGF0YVNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5jb21tYW5kKCdwYXRjaCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGb3JtVVJMRW5jb2RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTXVsdGlwYXJ0Rm9ybURhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTaXplOiBkYXRhU2l6ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBxdWVyeU9iamVjdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGRhdGEsIHt9LCBxdWVyeU9iamVjdCk7XG4gICAgfTtcbiAgICBSZXF1ZXN0LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBxdWVyeU9iamVjdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdkZWxldGUnLCB1cmwsIGRhdGEsIHt9LCB7IHF1ZXJ5OiBxdWVyeU9iamVjdCB9KTtcbiAgICB9O1xuICAgIHJldHVybiBSZXF1ZXN0O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFJlcXVlc3Q7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbnZhciBEb21haW4gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9tYWluKGRhdGEsIHJlY2VpdmluZywgc2VuZGluZykge1xuICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgIHRoaXMucmVxdWlyZV90bHMgPSBkYXRhLnJlcXVpcmVfdGxzO1xuICAgICAgICB0aGlzLnNraXBfdmVyaWZpY2F0aW9uID0gZGF0YS5za2lwX3ZlcmlmaWNhdGlvbjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IGRhdGEuc3RhdGU7XG4gICAgICAgIHRoaXMud2lsZGNhcmQgPSBkYXRhLndpbGRjYXJkO1xuICAgICAgICB0aGlzLnNwYW1fYWN0aW9uID0gZGF0YS5zcGFtX2FjdGlvbjtcbiAgICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICAgICAgdGhpcy5zbXRwX3Bhc3N3b3JkID0gZGF0YS5zbXRwX3Bhc3N3b3JkO1xuICAgICAgICB0aGlzLnNtdHBfbG9naW4gPSBkYXRhLnNtdHBfbG9naW47XG4gICAgICAgIHRoaXMudHlwZSA9IGRhdGEudHlwZTtcbiAgICAgICAgdGhpcy5yZWNlaXZpbmdfZG5zX3JlY29yZHMgPSByZWNlaXZpbmcgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5zZW5kaW5nX2Ruc19yZWNvcmRzID0gc2VuZGluZyB8fCBudWxsO1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5pZDtcbiAgICAgICAgdGhpcy5pc19kaXNhYmxlZCA9IGRhdGEuaXNfZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMud2ViX3ByZWZpeCA9IGRhdGEud2ViX3ByZWZpeDtcbiAgICAgICAgdGhpcy53ZWJfc2NoZW1lID0gZGF0YS53ZWJfc2NoZW1lO1xuICAgICAgICB0aGlzLnVzZV9hdXRvbWF0aWNfc2VuZGVyX3NlY3VyaXR5ID0gZGF0YS51c2VfYXV0b21hdGljX3NlbmRlcl9zZWN1cml0eTtcbiAgICAgICAgLypcbiAgICAgICAgICBkb21haW4gZ2V0IGFuZCB1cGRhdGUgbWV0aG9kcyBtYXkgaGF2ZSByaWNoZXIgcmVzcG9uc2UgdGhhbiBjcmVhdGUgbWV0aG9kLlxuICAgICAgICAqL1xuICAgICAgICB2YXIgZHluYW1pY0tleXMgPSBbJ2RraW1faG9zdCcsICdtYWlsZnJvbV9ob3N0J107XG4gICAgICAgIHZhciBkeW5hbWljUHJvcGVydGllcyA9IGR5bmFtaWNLZXlzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgIGlmIChkYXRhW3Byb3BlcnR5TmFtZV0pIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgICAgICBhY2NbcHJvcF0gPSBkYXRhW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZHluYW1pY1Byb3BlcnRpZXMpO1xuICAgIH1cbiAgICByZXR1cm4gRG9tYWluO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IERvbWFpbjtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi4vY29tbW9uL0Vycm9yLmpzJztcbmltcG9ydCBEb21haW4gZnJvbSAnLi9kb21haW4uanMnO1xudmFyIERvbWFpbnNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9tYWluc0NsaWVudChyZXF1ZXN0LCBkb21haW5DcmVkZW50aWFsc0NsaWVudCwgZG9tYWluVGVtcGxhdGVzQ2xpZW50LCBkb21haW5UYWdzQ2xpZW50LCBkb21haW5UcmFja2luZywgZG9tYWluS2V5c0NsaWVudCwgbG9nZ2VyKSB7XG4gICAgICAgIGlmIChsb2dnZXIgPT09IHZvaWQgMCkgeyBsb2dnZXIgPSBjb25zb2xlOyB9XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMuZG9tYWluQ3JlZGVudGlhbHMgPSBkb21haW5DcmVkZW50aWFsc0NsaWVudDtcbiAgICAgICAgdGhpcy5kb21haW5UZW1wbGF0ZXMgPSBkb21haW5UZW1wbGF0ZXNDbGllbnQ7XG4gICAgICAgIHRoaXMuZG9tYWluVGFncyA9IGRvbWFpblRhZ3NDbGllbnQ7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICB0aGlzLmRvbWFpblRyYWNraW5nID0gZG9tYWluVHJhY2tpbmc7XG4gICAgICAgIHRoaXMuZG9tYWluS2V5cyA9IGRvbWFpbktleXNDbGllbnQ7XG4gICAgfVxuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLl9oYW5kbGVCb29sVmFsdWVzID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHByb3BzRm9yUmVwbGFjZW1lbnQgPSBkYXRhO1xuICAgICAgICB2YXIgcmVwbGFjZWRQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzRm9yUmVwbGFjZW1lbnQpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcm9wID0ga2V5O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdO1xuICAgICAgICAgICAgICAgIGFjY1twcm9wXSA9ICh2YWx1ZS50b1N0cmluZygpID09PSAndHJ1ZScpID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKF9fYXNzaWduKHt9LCBkYXRhKSwgcmVwbGFjZWRQcm9wcyk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VNZXNzYWdlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUucGFyc2VEb21haW5MaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5ib2R5ICYmIHJlc3BvbnNlLmJvZHkuaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRG9tYWluKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH07XG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlRG9tYWluID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9tYWluKHJlc3BvbnNlLmJvZHkuZG9tYWluLCByZXNwb25zZS5ib2R5LnJlY2VpdmluZ19kbnNfcmVjb3JkcywgcmVzcG9uc2UuYm9keS5zZW5kaW5nX2Ruc19yZWNvcmRzKTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92NC9kb21haW5zJywgcXVlcnkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZURvbWFpbkxpc3QocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB2YXIgcHJlcGFyZWRRdWVyeSA9IHF1ZXJ5ID8ge1xuICAgICAgICAgICAgJ2g6ZXh0ZW5kZWQnOiAoX2EgPSBxdWVyeSA9PT0gbnVsbCB8fCBxdWVyeSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcXVlcnkuZXh0ZW5kZWQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGZhbHNlLFxuICAgICAgICAgICAgJ2g6d2l0aF9kbnMnOiAoX2IgPSBxdWVyeSA9PT0gbnVsbCB8fCBxdWVyeSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcXVlcnkud2l0aF9kbnMpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHRydWUsXG4gICAgICAgIH0gOiB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoXCIvdjQvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluKSwgcHJlcGFyZWRRdWVyeSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLl9wYXJzZURvbWFpbihyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBwb3N0T2JqID0gdGhpcy5faGFuZGxlQm9vbFZhbHVlcyhkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjQvZG9tYWlucycsIHBvc3RPYmopXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VEb21haW4ocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBwdXREYXRhID0gdGhpcy5faGFuZGxlQm9vbFZhbHVlcyhkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoXCIvdjQvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluKSwgcHV0RGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLl9wYXJzZURvbWFpbihyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLnZlcmlmeSA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoXCIvdjQvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluLCBcIi92ZXJpZnlcIikpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VEb21haW4ocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIi92My9kb21haW5zL1wiLmNvbmNhdChkb21haW4pKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlTWVzc2FnZShyZXMpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLmdldENvbm5lY3Rpb24gPSBmdW5jdGlvbiAoZG9tYWluKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KFwiL3YzL2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbiwgXCIvY29ubmVjdGlvblwiKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlczsgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLnVwZGF0ZUNvbm5lY3Rpb24gPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KFwiL3YzL2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbiwgXCIvY29ubmVjdGlvblwiKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlczsgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIC8vIFRyYWNraW5nXG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCAnZG9tYWlucy5nZXRUcmFja2luZycgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQuXG4gICAgKiBQbGVhc2UgdXNlICdkb21haW5zLmRvbWFpblRyYWNraW5nLmdldFRyYWNraW5nJyBpbnN0ZWFkLlxuICAgICovXG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuZ2V0VHJhY2tpbmcgPSBmdW5jdGlvbiAoZG9tYWluKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJcXG4gICAgICAnZG9tYWlucy5nZXRUcmFja2luZycgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgJ2RvbWFpbnMuZG9tYWluVHJhY2tpbmcuZ2V0VHJhY2tpbmcnIGluc3RlYWQuXFxuICAgIFwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tYWluVHJhY2tpbmcuZ2V0VHJhY2tpbmcoZG9tYWluKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgJ2RvbWFpbnMudXBkYXRlVHJhY2tpbmcnIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkLlxuICAgICogUGxlYXNlIHVzZSAnZG9tYWlucy5kb21haW5UcmFja2luZy51cGRhdGVUcmFja2luZycgaW5zdGVhZC5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLnVwZGF0ZVRyYWNraW5nID0gZnVuY3Rpb24gKGRvbWFpbiwgdHlwZSwgZGF0YSkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFwiXFxuICAgICAgJ2RvbWFpbnMudXBkYXRlVHJhY2tpbmcnIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlICdkb21haW5zLmRvbWFpblRyYWNraW5nLnVwZGF0ZVRyYWNraW5nJyBpbnN0ZWFkLlxcbiAgICBcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbWFpblRyYWNraW5nLnVwZGF0ZVRyYWNraW5nKGRvbWFpbiwgdHlwZSwgZGF0YSk7XG4gICAgfTtcbiAgICAvLyBJUHNcbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkIFwiZG9tYWlucy5nZXRJcHNcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLlxuICAgICovXG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuZ2V0SXBzID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMuZ2V0SXBzXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHZhciBfYTsgcmV0dXJuIChfYSA9IHJlc3BvbnNlID09PSBudWxsIHx8IHJlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXNwb25zZS5ib2R5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaXRlbXM7IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMuYXNzaWduSXBcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLlxuICAgICovXG4gICAgRG9tYWluc0NsaWVudC5wcm90b3R5cGUuYXNzaWduSXAgPSBmdW5jdGlvbiAoZG9tYWluLCBpcCkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMuYXNzaWduSXBcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IGlwOiBpcCB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLmRlbGV0ZUlwXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIG1vdmVkIHRvIHRoZSBJcHNDbGllbnQuXG4gICAgKi9cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5kZWxldGVJcCA9IGZ1bmN0aW9uIChkb21haW4sIGlwKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy5kZWxldGVJcFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIG1vdmVkIGludG8gdGhlIElwc0NsaWVudCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsIGlwKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkIFwiZG9tYWlucy5saW5rSXBQb29sXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWRcbiAgICAqIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICAgKi9cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS5saW5rSXBQb29sID0gZnVuY3Rpb24gKGRvbWFpbiwgcG9vbElkKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy5saW5rSXBQb29sXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgcG9vbF9pZDogcG9vbElkIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMudW5saW5rSXBQb2xsXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIG1vdmVkIGludG8gdGhlIElwc0NsaWVudFxuICAgICogaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLnVubGlua0lwUG9sbCA9IGZ1bmN0aW9uIChkb21haW4sIHJlcGxhY2VtZW50KSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy51bmxpbmtJcFBvbGxcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgbW92ZWQgaW50byB0aGUgSXBzQ2xpZW50IGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuJyk7XG4gICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSAnJztcbiAgICAgICAgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQgJiYgcmVwbGFjZW1lbnQuaXApIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1RvbyBtdWNoIGRhdGEgZm9yIHJlcGxhY2VtZW50JywgJ1BsZWFzZSBzcGVjaWZ5IGVpdGhlciBwb29sX2lkIG9yIGlwIChub3QgYm90aCknKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXBsYWNlbWVudC5wb29sX2lkKSB7XG4gICAgICAgICAgICBzZWFyY2hQYXJhbXMgPSBcIj9wb29sX2lkPVwiLmNvbmNhdChyZXBsYWNlbWVudC5wb29sX2lkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXBsYWNlbWVudC5pcCkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zID0gXCI/aXA9XCIuY29uY2F0KHJlcGxhY2VtZW50LmlwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsICdpcF9wb29sJywgc2VhcmNoUGFyYW1zKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBkZXByZWNhdGVkIFwiZG9tYWlucy51cGRhdGVES0lNQXV0aG9yaXR5XCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsXG4gICAgKiBhbmQgbW92ZWQgaW50byB0aGUgXCJkb21haW5zLmRvbWFpbktleXMudXBkYXRlREtJTUF1dGhvcml0eVwiLlxuICAgICogQ3VycmVudCBtZXRob2Qgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICAgKi9cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS51cGRhdGVES0lNQXV0aG9yaXR5ID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMudXBkYXRlREtJTUF1dGhvcml0eVwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIFwiZG9tYWlucy5kb21haW5LZXlzLnVwZGF0ZURLSU1BdXRob3JpdHlcIiBpbnN0ZWFkJyk7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbWFpbktleXMudXBkYXRlREtJTUF1dGhvcml0eShkb21haW4sIGRhdGEpO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMudXBkYXRlREtJTVNlbGVjdG9yXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsXG4gICAgKiBhbmQgbW92ZWQgaW50byB0aGUgXCJkb21haW5zLmRvbWFpbktleXMudXBkYXRlREtJTVNlbGVjdG9yXCIuXG4gICAgKiBDdXJyZW50IG1ldGhvZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy5cbiAgICAqL1xuICAgIERvbWFpbnNDbGllbnQucHJvdG90eXBlLnVwZGF0ZURLSU1TZWxlY3RvciA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy51cGRhdGVES0lNU2VsZWN0b3JcIiBtZXRob2QgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBkb21haW5zLmRvbWFpbktleXMudXBkYXRlREtJTVNlbGVjdG9yIGluc3RlYWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5kb21haW5LZXlzLnVwZGF0ZURLSU1TZWxlY3Rvcihkb21haW4sIGRhdGEpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLnVwZGF0ZVdlYlByZWZpeFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLlxuICAgICogUGxlYXNlIHVzZSBkb21haW5zLnVwZGF0ZSB0byBzZXQgbmV3IFwid2ViX3ByZWZpeFwiLlxuICAgICogQ3VycmVudCBtZXRob2Qgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICAgKi9cbiAgICBEb21haW5zQ2xpZW50LnByb3RvdHlwZS51cGRhdGVXZWJQcmVmaXggPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy51cGRhdGVXZWJQcmVmaXhcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBkb21haW5zLnVwZGF0ZSB0byBzZXQgbmV3IFwid2ViX3ByZWZpeFwiLiBDdXJyZW50IG1ldGhvZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7IHF1ZXJ5OiBcIndlYl9wcmVmaXg9XCIuY29uY2F0KGRhdGEud2ViUHJlZml4KSB9O1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChcIi92My9kb21haW5zL1wiLmNvbmNhdChkb21haW4sIFwiL3dlYl9wcmVmaXhcIiksIHt9LCBvcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEb21haW5zQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IERvbWFpbnNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3IuanMnO1xudmFyIE5hdmlnYXRpb25UaHJ1UGFnZXMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2aWdhdGlvblRocnVQYWdlcyhyZXF1ZXN0KSB7XG4gICAgICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB9XG4gICAgfVxuICAgIE5hdmlnYXRpb25UaHJ1UGFnZXMucHJvdG90eXBlLnBhcnNlUGFnZSA9IGZ1bmN0aW9uIChpZCwgcGFnZVVybCwgdXJsU2VwYXJhdG9yLCBpdGVyYXRvck5hbWUpIHtcbiAgICAgICAgdmFyIHBhcnNlZFVybCA9IG5ldyBVUkwocGFnZVVybCk7XG4gICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSBwYXJzZWRVcmwuc2VhcmNoUGFyYW1zO1xuICAgICAgICB2YXIgcGFnZVZhbHVlID0gcGFnZVVybCAmJiB0eXBlb2YgcGFnZVVybCA9PT0gJ3N0cmluZycgPyBwYWdlVXJsLnNwbGl0KHVybFNlcGFyYXRvcikucG9wKCkgfHwgJycgOiAnJztcbiAgICAgICAgdmFyIGl0ZXJhdG9yUG9zaXRpb24gPSBudWxsO1xuICAgICAgICBpZiAoaXRlcmF0b3JOYW1lKSB7XG4gICAgICAgICAgICBpdGVyYXRvclBvc2l0aW9uID0gc2VhcmNoUGFyYW1zLmhhcyhpdGVyYXRvck5hbWUpXG4gICAgICAgICAgICAgICAgPyBzZWFyY2hQYXJhbXMuZ2V0KGl0ZXJhdG9yTmFtZSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgcGFnZTogdXJsU2VwYXJhdG9yID09PSAnPycgPyBcIj9cIi5jb25jYXQocGFnZVZhbHVlKSA6IHBhZ2VWYWx1ZSxcbiAgICAgICAgICAgIGl0ZXJhdG9yUG9zaXRpb246IGl0ZXJhdG9yUG9zaXRpb24sXG4gICAgICAgICAgICB1cmw6IHBhZ2VVcmxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE5hdmlnYXRpb25UaHJ1UGFnZXMucHJvdG90eXBlLnBhcnNlUGFnZUxpbmtzID0gZnVuY3Rpb24gKHJlc3BvbnNlLCB1cmxTZXBhcmF0b3IsIGl0ZXJhdG9yTmFtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGFnZXMgPSBPYmplY3QuZW50cmllcyhyZXNwb25zZS5ib2R5LnBhZ2luZyk7XG4gICAgICAgIHJldHVybiBwYWdlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgX2EpIHtcbiAgICAgICAgICAgIHZhciBpZCA9IF9hWzBdLCBwYWdlVXJsID0gX2FbMV07XG4gICAgICAgICAgICBhY2NbaWRdID0gX3RoaXMucGFyc2VQYWdlKGlkLCBwYWdlVXJsLCB1cmxTZXBhcmF0b3IsIGl0ZXJhdG9yTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgfTtcbiAgICBOYXZpZ2F0aW9uVGhydVBhZ2VzLnByb3RvdHlwZS51cGRhdGVVcmxBbmRRdWVyeSA9IGZ1bmN0aW9uIChjbGllbnRVcmwsIHF1ZXJ5KSB7XG4gICAgICAgIHZhciB1cmwgPSBjbGllbnRVcmw7XG4gICAgICAgIHZhciBxdWVyeUNvcHkgPSBfX2Fzc2lnbih7fSwgcXVlcnkpO1xuICAgICAgICBpZiAocXVlcnlDb3B5LnBhZ2UpIHtcbiAgICAgICAgICAgIHVybCA9IHVybGpvaW4oY2xpZW50VXJsLCBxdWVyeUNvcHkucGFnZSk7XG4gICAgICAgICAgICBkZWxldGUgcXVlcnlDb3B5LnBhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgdXBkYXRlZFF1ZXJ5OiBxdWVyeUNvcHlcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE5hdmlnYXRpb25UaHJ1UGFnZXMucHJvdG90eXBlLnJlcXVlc3RMaXN0V2l0aFBhZ2VzID0gZnVuY3Rpb24gKGNsaWVudFVybCwgcXVlcnksIE1vZGVsKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSwgdXJsLCB1cGRhdGVkUXVlcnksIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSB0aGlzLnVwZGF0ZVVybEFuZFF1ZXJ5KGNsaWVudFVybCwgcXVlcnkpLCB1cmwgPSBfYS51cmwsIHVwZGF0ZWRRdWVyeSA9IF9hLnVwZGF0ZWRRdWVyeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5yZXF1ZXN0KSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQodXJsLCB1cGRhdGVkUXVlcnkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNb2RlbCBoZXJlIGlzIHVzdWFsbHkgdW5kZWZpbmVkIGV4Y2VwdCBmb3IgU3VwcHJlc3Npb24gQ2xpZW50XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UsIE1vZGVsKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogJ1JlcXVlc3QgcHJvcGVydHkgaXMgZW1wdHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogeyBtZXNzYWdlOiAnJyB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBOYXZpZ2F0aW9uVGhydVBhZ2VzO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE5hdmlnYXRpb25UaHJ1UGFnZXM7XG4iLCJpbXBvcnQgeyBfX2F3YWl0ZXIsIF9fZXh0ZW5kcywgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xudmFyIEV2ZW50Q2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhFdmVudENsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBFdmVudENsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEV2ZW50Q2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnLycpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBFdmVudENsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ2V2ZW50cycpLCBxdWVyeSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEV2ZW50Q2xpZW50O1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBFdmVudENsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduIH0gZnJvbSBcInRzbGliXCI7XG52YXIgU3RhdHNDb250YWluZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RhdHNDb250YWluZXIoZGF0YSkge1xuICAgICAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoZGF0YS5zdGFydCk7XG4gICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoZGF0YS5lbmQpO1xuICAgICAgICB0aGlzLnJlc29sdXRpb24gPSBkYXRhLnJlc29sdXRpb247XG4gICAgICAgIHRoaXMuc3RhdHMgPSBkYXRhLnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdCkge1xuICAgICAgICAgICAgdmFyIHJlcyA9IF9fYXNzaWduKHt9LCBzdGF0KTtcbiAgICAgICAgICAgIHJlcy50aW1lID0gbmV3IERhdGUoc3RhdC50aW1lKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gU3RhdHNDb250YWluZXI7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgU3RhdHNDb250YWluZXI7XG4iLCJpbXBvcnQgeyBfX3NwcmVhZEFycmF5IH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgU3RhdHNDb250YWluZXIgZnJvbSAnLi9TdGF0c0NvbnRhaW5lci5qcyc7XG52YXIgU3RhdHNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RhdHNDbGllbnQocmVxdWVzdCwgbG9nZ2VyKSB7XG4gICAgICAgIGlmIChsb2dnZXIgPT09IHZvaWQgMCkgeyBsb2dnZXIgPSBjb25zb2xlOyB9XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIH1cbiAgICBTdGF0c0NsaWVudC5wcm90b3R5cGUuY29udmVydERhdGVUb1VUQyA9IGZ1bmN0aW9uIChrZXksIGlucHV0RGF0ZSkge1xuICAgICAgICAvKlxuICAgICAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgICAgIGFuZCBiZWNhdXNlIGZvciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XG4gICAgICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIkRhdGU6XFxcIlwiLmNvbmNhdChpbnB1dERhdGUsIFwiXFxcIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cXG5WYWx1ZSBcXFwiXCIpLmNvbmNhdChpbnB1dERhdGUudG9VVENTdHJpbmcoKSwgXCJcXFwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXFxcIlwiKS5jb25jYXQoa2V5LCBcIlxcXCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nXCIpKTtcbiAgICAgICAgcmV0dXJuIFtrZXksIGlucHV0RGF0ZS50b1VUQ1N0cmluZygpXTtcbiAgICB9O1xuICAgIFN0YXRzQ2xpZW50LnByb3RvdHlwZS5wcmVwYXJlU2VhcmNoUGFyYW1zID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzZWFyY2hQYXJhbXMgPSBbXTtcbiAgICAgICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zID0gT2JqZWN0LmVudHJpZXMocXVlcnkpLnJlZHVjZShmdW5jdGlvbiAoYXJyYXlXaXRoUGFpcnMsIGN1cnJlbnRQYWlyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGN1cnJlbnRQYWlyWzBdLCB2YWx1ZSA9IGN1cnJlbnRQYWlyWzFdO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGgpIHsgLy8gZXZlbnQ6IFsnZGVsaXZlcmVkJywgJ2FjY2VwdGVkJ11cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcGVhdGVkUHJvcGVydHkgPSB2YWx1ZS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIFtrZXksIGl0ZW1dOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fc3ByZWFkQXJyYXkoX19zcHJlYWRBcnJheShbXSwgYXJyYXlXaXRoUGFpcnMsIHRydWUpLCByZXBlYXRlZFByb3BlcnR5LCB0cnVlKTsgLy8gW1tldmVudCxkZWxpdmVyZWRdLCBbZXZlbnQsYWNjZXB0ZWRdXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5V2l0aFBhaXJzLnB1c2goX3RoaXMuY29udmVydERhdGVUb1VUQyhrZXksIHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheVdpdGhQYWlycztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlXaXRoUGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlXaXRoUGFpcnM7XG4gICAgICAgICAgICB9LCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlYXJjaFBhcmFtcztcbiAgICB9O1xuICAgIFN0YXRzQ2xpZW50LnByb3RvdHlwZS5wYXJzZVN0YXRzID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RhdHNDb250YWluZXIocmVzcG9uc2UuYm9keSk7XG4gICAgfTtcbiAgICBTdGF0c0NsaWVudC5wcm90b3R5cGUuZ2V0RG9tYWluID0gZnVuY3Rpb24gKGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgdmFyIHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ3N0YXRzL3RvdGFsJyksIHsgc2VhcmNoUGFyYW1zOiBzZWFyY2hQYXJhbXMgfSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMucGFyc2VTdGF0cyk7XG4gICAgfTtcbiAgICBTdGF0c0NsaWVudC5wcm90b3R5cGUuZ2V0QWNjb3VudCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICB2YXIgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9zdGF0cy90b3RhbCcsIHsgc2VhcmNoUGFyYW1zOiBzZWFyY2hQYXJhbXMgfSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMucGFyc2VTdGF0cyk7XG4gICAgfTtcbiAgICByZXR1cm4gU3RhdHNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgU3RhdHNDbGllbnQ7XG4iLCJleHBvcnQgdmFyIFJlc29sdXRpb247XG4oZnVuY3Rpb24gKFJlc29sdXRpb24pIHtcbiAgICBSZXNvbHV0aW9uW1wiSE9VUlwiXSA9IFwiaG91clwiO1xuICAgIFJlc29sdXRpb25bXCJEQVlcIl0gPSBcImRheVwiO1xuICAgIFJlc29sdXRpb25bXCJNT05USFwiXSA9IFwibW9udGhcIjtcbn0pKFJlc29sdXRpb24gfHwgKFJlc29sdXRpb24gPSB7fSkpO1xuZXhwb3J0IHZhciBTdXBwcmVzc2lvbk1vZGVscztcbihmdW5jdGlvbiAoU3VwcHJlc3Npb25Nb2RlbHMpIHtcbiAgICBTdXBwcmVzc2lvbk1vZGVsc1tcIkJPVU5DRVNcIl0gPSBcImJvdW5jZXNcIjtcbiAgICBTdXBwcmVzc2lvbk1vZGVsc1tcIkNPTVBMQUlOVFNcIl0gPSBcImNvbXBsYWludHNcIjtcbiAgICBTdXBwcmVzc2lvbk1vZGVsc1tcIlVOU1VCU0NSSUJFU1wiXSA9IFwidW5zdWJzY3JpYmVzXCI7XG4gICAgU3VwcHJlc3Npb25Nb2RlbHNbXCJXSElURUxJU1RTXCJdID0gXCJ3aGl0ZWxpc3RzXCI7XG59KShTdXBwcmVzc2lvbk1vZGVscyB8fCAoU3VwcHJlc3Npb25Nb2RlbHMgPSB7fSkpO1xuZXhwb3J0IHZhciBXZWJob29rc0lkcztcbihmdW5jdGlvbiAoV2ViaG9va3NJZHMpIHtcbiAgICBXZWJob29rc0lkc1tcIkNMSUNLRURcIl0gPSBcImNsaWNrZWRcIjtcbiAgICBXZWJob29rc0lkc1tcIkNPTVBMQUlORURcIl0gPSBcImNvbXBsYWluZWRcIjtcbiAgICBXZWJob29rc0lkc1tcIkRFTElWRVJFRFwiXSA9IFwiZGVsaXZlcmVkXCI7XG4gICAgV2ViaG9va3NJZHNbXCJPUEVORURcIl0gPSBcIm9wZW5lZFwiO1xuICAgIFdlYmhvb2tzSWRzW1wiUEVSTUFORU5UX0ZBSUxcIl0gPSBcInBlcm1hbmVudF9mYWlsXCI7XG4gICAgV2ViaG9va3NJZHNbXCJURU1QT1JBUllfRkFJTFwiXSA9IFwidGVtcG9yYXJ5X2ZhaWxcIjtcbiAgICBXZWJob29rc0lkc1tcIlVOU1VCU0NSSUJFRFwiXSA9IFwidW5zdWJzY3JpYmVcIjtcbn0pKFdlYmhvb2tzSWRzIHx8IChXZWJob29rc0lkcyA9IHt9KSk7XG5leHBvcnQgdmFyIFllc05vO1xuKGZ1bmN0aW9uIChZZXNObykge1xuICAgIFllc05vW1wiWUVTXCJdID0gXCJ5ZXNcIjtcbiAgICBZZXNOb1tcIk5PXCJdID0gXCJub1wiO1xufSkoWWVzTm8gfHwgKFllc05vID0ge30pKTtcbiIsInZhciBTdXBwcmVzc2lvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdXBwcmVzc2lvbih0eXBlKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIHJldHVybiBTdXBwcmVzc2lvbjtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBTdXBwcmVzc2lvbjtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcy9pbmRleC5qcyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbi5qcyc7XG52YXIgQm91bmNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCb3VuY2UsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQm91bmNlKGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgU3VwcHJlc3Npb25Nb2RlbHMuQk9VTkNFUykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgICAgX3RoaXMuY29kZSA9ICtkYXRhLmNvZGU7XG4gICAgICAgIF90aGlzLmVycm9yID0gZGF0YS5lcnJvcjtcbiAgICAgICAgX3RoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEJvdW5jZTtcbn0oU3VwcHJlc3Npb24pKTtcbmV4cG9ydCBkZWZhdWx0IEJvdW5jZTtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcy9pbmRleC5qcyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbi5qcyc7XG52YXIgQ29tcGxhaW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb21wbGFpbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29tcGxhaW50KGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgU3VwcHJlc3Npb25Nb2RlbHMuQ09NUExBSU5UUykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgICAgX3RoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENvbXBsYWludDtcbn0oU3VwcHJlc3Npb24pKTtcbmV4cG9ydCBkZWZhdWx0IENvbXBsYWludDtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcy9pbmRleC5qcyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbi5qcyc7XG52YXIgVW5zdWJzY3JpYmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVuc3Vic2NyaWJlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVuc3Vic2NyaWJlKGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgU3VwcHJlc3Npb25Nb2RlbHMuVU5TVUJTQ1JJQkVTKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgICBfdGhpcy50YWdzID0gZGF0YS50YWdzO1xuICAgICAgICBfdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gVW5zdWJzY3JpYmU7XG59KFN1cHByZXNzaW9uKSk7XG5leHBvcnQgZGVmYXVsdCBVbnN1YnNjcmliZTtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcy9pbmRleC5qcyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbi5qcyc7XG52YXIgV2hpdGVMaXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhXaGl0ZUxpc3QsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gV2hpdGVMaXN0KGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgU3VwcHJlc3Npb25Nb2RlbHMuV0hJVEVMSVNUUykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgICBfdGhpcy5yZWFzb24gPSBkYXRhLnJlYXNvbjtcbiAgICAgICAgX3RoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBXaGl0ZUxpc3Q7XG59KFN1cHByZXNzaW9uKSk7XG5leHBvcnQgZGVmYXVsdCBXaGl0ZUxpc3Q7XG4iLCJpbXBvcnQgeyBfX2F3YWl0ZXIsIF9fZXh0ZW5kcywgX19nZW5lcmF0b3IsIF9fc3ByZWFkQXJyYXkgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3IuanMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xuaW1wb3J0IEJvdW5jZSBmcm9tICcuL0JvdW5jZS5qcyc7XG5pbXBvcnQgQ29tcGxhaW50IGZyb20gJy4vQ29tcGxhaW50LmpzJztcbmltcG9ydCBVbnN1YnNjcmliZSBmcm9tICcuL1Vuc3Vic2NyaWJlLmpzJztcbmltcG9ydCBXaGl0ZUxpc3QgZnJvbSAnLi9XaGl0ZUxpc3QuanMnO1xudmFyIFN1cHByZXNzaW9uQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdXBwcmVzc2lvbkNsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdXBwcmVzc2lvbkNsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBfdGhpcy5tb2RlbHMgPSB7XG4gICAgICAgICAgICBib3VuY2VzOiBCb3VuY2UsXG4gICAgICAgICAgICBjb21wbGFpbnRzOiBDb21wbGFpbnQsXG4gICAgICAgICAgICB1bnN1YnNjcmliZXM6IFVuc3Vic2NyaWJlLFxuICAgICAgICAgICAgd2hpdGVsaXN0czogV2hpdGVMaXN0LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UsIE1vZGVsKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9ICgoX2EgPSByZXNwb25zZS5ib2R5Lml0ZW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWFwKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBuZXcgTW9kZWwoaXRlbSk7IH0pKSB8fCBbXTtcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLl9wYXJzZUl0ZW0gPSBmdW5jdGlvbiAoZGF0YSwgTW9kZWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNb2RlbChkYXRhKTtcbiAgICB9O1xuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5jcmVhdGVXaGl0ZUxpc3QgPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhLCBpc0RhdGFBcnJheSkge1xuICAgICAgICBpZiAoaXNEYXRhQXJyYXkpIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ0RhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCcsICdXaGl0ZWxpc3RcXCdzIGNyZWF0aW9uIHByb2Nlc3MgZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBjcmVhdGlvbnMuIERhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAnd2hpdGVsaXN0cycpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICAgIH07XG4gICAgU3VwcHJlc3Npb25DbGllbnQucHJvdG90eXBlLmNyZWF0ZVVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkgeyAvLyBVc2VyIHByb3ZpZGVkIGFuIGFycmF5XG4gICAgICAgICAgICB2YXIgaXNDb250YWluc1RhZyA9IGRhdGEuc29tZShmdW5jdGlvbiAodW5zdWJzY3JpYmUpIHsgcmV0dXJuIHVuc3Vic2NyaWJlLnRhZzsgfSk7XG4gICAgICAgICAgICBpZiAoaXNDb250YWluc1RhZykge1xuICAgICAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1RhZyBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHVzZWQgZm9yIGNyZWF0aW5nIG11bHRpcGxlIHVuc3Vic2NyaWJlcy4nLCAnVGFnIHByb3BlcnR5IGNhbiBiZSB1c2VkIG9ubHkgaWYgb25lIHVuc3Vic2NyaWJlIHByb3ZpZGVkIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kLiBQbGVhc2UgdXNlIHRhZ3MgaW5zdGVhZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3Vuc3Vic2NyaWJlcycpLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgeyBpc0FwcGxpY2F0aW9uSlNPTjogdHJ1ZSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLnRhZ3MpIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1RhZ3MgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSB1c2VkIGZvciBjcmVhdGluZyBvbmUgdW5zdWJzY3JpYmUuJywgJ1RhZ3MgcHJvcGVydHkgY2FuIGJlIHVzZWQgaWYgeW91IHByb3ZpZGVzIGFuIGFycmF5IG9mIHVuc3Vic2NyaWJlcyBhcyBzZWNvbmQgYXJndW1lbnQgb2YgY3JlYXRlIG1ldGhvZC4gUGxlYXNlIHVzZSB0YWcgaW5zdGVhZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEudGFnKSkge1xuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignVGFnIHByb3BlcnR5IGNhbiBub3QgYmUgYW4gYXJyYXknLCAnUGxlYXNlIHVzZSBhcnJheSBvZiB1bnN1YnNjcmliZXMgYXMgc2Vjb25kIGFyZ3VtZW50IG9mIGNyZWF0ZSBtZXRob2QgdG8gYmUgYWJsZSB0byBwcm92aWRlIGZldyB0YWdzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyogV2UgbmVlZCBGb3JtIERhdGEgZm9yIHVuc3Vic2NyaWJlcyBpZiB3ZSB3YW50IHRvIHN1cHBvcnQgdGhlIFwidGFnXCIgcHJvcGVydHkgKi9cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgICAgICAgLnBvc3RXaXRoRkQodXJsam9pbigndjMnLCBkb21haW4sICd1bnN1YnNjcmliZXMnKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgICB9O1xuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5nZXRNb2RlbCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlIGluIHRoaXMubW9kZWxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignVW5rbm93biB0eXBlIHZhbHVlJywgJ1R5cGUgbWF5IGJlIG9ubHkgb25lIG9mIFtib3VuY2VzLCBjb21wbGFpbnRzLCB1bnN1YnNjcmliZXMsIHdoaXRlbGlzdHNdJyk7XG4gICAgfTtcbiAgICBTdXBwcmVzc2lvbkNsaWVudC5wcm90b3R5cGUucHJlcGFyZVJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgICB0eXBlOiByZXNwb25zZS5ib2R5LnR5cGUgfHwgJycsXG4gICAgICAgICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBTdXBwcmVzc2lvbkNsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChkb21haW4sIHR5cGUsIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtb2RlbDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBxdWVyeSwgbW9kZWwpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoZG9tYWluLCB0eXBlLCBhZGRyZXNzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgIC5nZXQodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIF90aGlzLl9wYXJzZUl0ZW0ocmVzcG9uc2UuYm9keSwgbW9kZWwpOyB9KTtcbiAgICB9O1xuICAgIFN1cHByZXNzaW9uQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCB0eXBlLCBkYXRhKSB7XG4gICAgICAgIHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgICAgIC8vIHN1cHBvcnRzIGFkZGluZyBtdWx0aXBsZSBzdXBwcmVzc2lvbnMgYnkgZGVmYXVsdFxuICAgICAgICB2YXIgcG9zdERhdGE7XG4gICAgICAgIHZhciBpc0RhdGFBcnJheSA9IEFycmF5LmlzQXJyYXkoZGF0YSk7XG4gICAgICAgIGlmICh0eXBlID09PSAnd2hpdGVsaXN0cycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVdoaXRlTGlzdChkb21haW4sIGRhdGEsIGlzRGF0YUFycmF5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gJ3Vuc3Vic2NyaWJlcycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVVuc3Vic2NyaWJlKGRvbWFpbiwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0RhdGFBcnJheSkge1xuICAgICAgICAgICAgcG9zdERhdGEgPSBbZGF0YV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwb3N0RGF0YSA9IF9fc3ByZWFkQXJyYXkoW10sIGRhdGEsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgICAgIC5wb3N0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlKSwgSlNPTi5zdHJpbmdpZnkocG9zdERhdGEpLCB7IGlzQXBwbGljYXRpb25KU09OOiB0cnVlIH0pXG4gICAgICAgICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gICAgfTtcbiAgICBTdXBwcmVzc2lvbkNsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkb21haW4sIHR5cGUsIGFkZHJlc3MpIHtcbiAgICAgICAgdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgICAgICAgLmRlbGV0ZSh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSwgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgICAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgICAgICAgYWRkcmVzczogcmVzcG9uc2UuYm9keS5hZGRyZXNzIHx8ICcnLFxuICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICAgICAgfSk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFN1cHByZXNzaW9uQ2xpZW50O1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBTdXBwcmVzc2lvbkNsaWVudDtcbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbnZhciBXZWJob29rID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdlYmhvb2soaWQsIHVybCwgdXJscykge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLnVybHMgPSB1cmxzO1xuICAgIH1cbiAgICByZXR1cm4gV2ViaG9vaztcbn0oKSk7XG5leHBvcnQgeyBXZWJob29rIH07XG52YXIgV2ViaG9va3NDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gV2ViaG9va3NDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBXZWJob29rc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlV2ViaG9va0xpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkud2ViaG9va3M7XG4gICAgfTtcbiAgICBXZWJob29rc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlV2ViaG9va1dpdGhJRCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICB2YXIgd2ViaG9va1Jlc3BvbnNlID0gKF9hID0gcmVzcG9uc2UgPT09IG51bGwgfHwgcmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc3BvbnNlLmJvZHkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS53ZWJob29rO1xuICAgICAgICAgICAgdmFyIHVybCA9IHdlYmhvb2tSZXNwb25zZSA9PT0gbnVsbCB8fCB3ZWJob29rUmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdlYmhvb2tSZXNwb25zZS51cmw7XG4gICAgICAgICAgICB2YXIgdXJscyA9IHdlYmhvb2tSZXNwb25zZSA9PT0gbnVsbCB8fCB3ZWJob29rUmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdlYmhvb2tSZXNwb25zZS51cmxzO1xuICAgICAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmxzICYmIHVybHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgID8gdXJsc1swXVxuICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoIXVybHMgfHwgdXJscy5sZW5ndGggPT09IDApICYmIHVybCkge1xuICAgICAgICAgICAgICAgIHVybHMgPSBbdXJsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgV2ViaG9vayhpZCwgdXJsLCB1cmxzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFdlYmhvb2tzQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VXZWJob29rVGVzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29kZTogcmVzcG9uc2UuYm9keS5jb2RlLFxuICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBXZWJob29rc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChkb21haW4sIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgcXVlcnkpXG4gICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tMaXN0KTtcbiAgICB9O1xuICAgIFdlYmhvb2tzQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoZG9tYWluLCBpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gICAgfTtcbiAgICBXZWJob29rc0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRvbWFpbiwgaWQsIHVybCwgdGVzdCkge1xuICAgICAgICBpZiAodGVzdCA9PT0gdm9pZCAwKSB7IHRlc3QgPSBmYWxzZTsgfVxuICAgICAgICBpZiAodGVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkLCAndGVzdCcpLCB7IHVybDogdXJsIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rVGVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgeyBpZDogaWQsIHVybDogdXJsIH0pXG4gICAgICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgICB9O1xuICAgIFdlYmhvb2tzQ2xpZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCBpZCwgdXJsVmFsdWVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCksIHsgdXJsOiB1cmxWYWx1ZXMgfSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICAgIH07XG4gICAgV2ViaG9va3NDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZG9tYWluLCBpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gICAgfTtcbiAgICByZXR1cm4gV2ViaG9va3NDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgV2ViaG9va3NDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vY29tbW9uL0Vycm9yLmpzJztcbnZhciBNZXNzYWdlc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXNzYWdlc0NsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIE1lc3NhZ2VzQ2xpZW50LnByb3RvdHlwZS5wcmVwYXJlQm9vbGVhblZhbHVlcyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciB5ZXNOb1Byb3BlcnRpZXMgPSBuZXcgU2V0KFtcbiAgICAgICAgICAgICdvOnRlc3Rtb2RlJyxcbiAgICAgICAgICAgICd0OnRleHQnLFxuICAgICAgICAgICAgJ286ZGtpbScsXG4gICAgICAgICAgICAnbzp0cmFja2luZycsXG4gICAgICAgICAgICAnbzp0cmFja2luZy1jbGlja3MnLFxuICAgICAgICAgICAgJ286dHJhY2tpbmctb3BlbnMnLFxuICAgICAgICAgICAgJ286cmVxdWlyZS10bHMnLFxuICAgICAgICAgICAgJ286c2tpcC12ZXJpZmljYXRpb24nXG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICAgICAgaWYgKHllc05vUHJvcGVydGllcy5oYXMoa2V5KSAmJiB0eXBlb2YgZGF0YVtrZXldID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGRhdGFba2V5XSA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgIH07XG4gICAgTWVzc2FnZXNDbGllbnQucHJvdG90eXBlLl9wYXJzZVJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3BvbnNlLmJvZHkpO1xuICAgIH07XG4gICAgTWVzc2FnZXNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhIHx8IE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignTWVzc2FnZSBkYXRhIG9iamVjdCBjYW4gbm90IGJlIGVtcHR5JywgJ01lc3NhZ2UgZGF0YSBvYmplY3QgY2FuIG5vdCBiZSBlbXB0eScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChcIi92My9cIi5jb25jYXQoZG9tYWluLCBcIi9tZXNzYWdlcy5taW1lXCIpLCBkYXRhKVxuICAgICAgICAgICAgICAgIC50aGVuKHRoaXMuX3BhcnNlUmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtb2RpZmllZERhdGEgPSB0aGlzLnByZXBhcmVCb29sZWFuVmFsdWVzKGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoXCIvdjMvXCIuY29uY2F0KGRvbWFpbiwgXCIvbWVzc2FnZXNcIiksIG1vZGlmaWVkRGF0YSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMuX3BhcnNlUmVzcG9uc2UpO1xuICAgIH07XG4gICAgTWVzc2FnZXNDbGllbnQucHJvdG90eXBlLnJldHJpZXZlU3RvcmVkRW1haWwgPSBmdW5jdGlvbiAoZG9tYWluLCBzdG9yYWdlS2V5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoXCIvdjMvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluLCBcIi9tZXNzYWdlcy9cIikuY29uY2F0KHN0b3JhZ2VLZXkpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXMuYm9keV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogZG9tYWluOiBzdHJpbmdcbiAgICAgKiBEb21haW4gbmFtZSB1c2VkIHRvIHNlbmQgdGhlIG1lc3NhZ2VcbiAgICAgKlxuICAgICAqIHN0b3JhZ2VLZXk6IHN0cmluZ1xuICAgICAqIFN0b3JhZ2Uga2V5IGZyb20gdGhlIGVtYWlsJ3MgYXNzb2NpYXRlZCBldmVudHNcbiAgICAgKiAoRXhhbXBsZTogQWNjZXB0ZWQvRGVsaXZlcmVkIGV2ZW50cyBzdG9yYWdlLmtleSBmaWVsZClcbiAgICAgKlxuICAgICAqIHJlY2lwaWVudHM6IHN0cmluZ1xuICAgICAqIEVtYWlsIGFkZHJlc3Mgb2YgdGhlIHJlY2lwaWVudChzKS4gWW91IGNhbiB1c2UgY29tbWFzIHRvIHNlcGFyYXRlIG11bHRpcGxlIHJlY2lwaWVudHNcbiAgICAgKi9cbiAgICBNZXNzYWdlc0NsaWVudC5wcm90b3R5cGUucmVzZW5kRW1haWwgPSBmdW5jdGlvbiAoZG9tYWluLCBzdG9yYWdlS2V5LCByZWNpcGllbnRzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKFwiL3YzL2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbiwgXCIvbWVzc2FnZXMvXCIpLmNvbmNhdChzdG9yYWdlS2V5KSwgeyB0bzogcmVjaXBpZW50cyB9KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLl9wYXJzZVJlc3BvbnNlKHJlcyldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE1lc3NhZ2VzQ2xpZW50LnByb3RvdHlwZS5nZXRNZXNzYWdlc1F1ZXVlU3RhdHVzID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2s7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXMsIGFwaVJlc3BvbnNlLCByZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9sKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfbC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoXCIvdjMvZG9tYWlucy9cIi5jb25jYXQoZG9tYWluLCBcIi9zZW5kaW5nX3F1ZXVlc1wiKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBfbC5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGlSZXNwb25zZSA9IHJlcy5ib2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ3VsYXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNfZGlzYWJsZWQ6IChfYSA9IGFwaVJlc3BvbnNlLnJlZ3VsYXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pc19kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVudGlsOiAoKF9jID0gKF9iID0gYXBpUmVzcG9uc2UucmVndWxhcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmRpc2FibGVkKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MudW50aWwpID8gbmV3IERhdGUoYXBpUmVzcG9uc2UucmVndWxhci5kaXNhYmxlZC51bnRpbCkgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYXNvbjogKChfZSA9IChfZCA9IGFwaVJlc3BvbnNlLnJlZ3VsYXIpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5kaXNhYmxlZCkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnJlYXNvbikgfHwgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc19kaXNhYmxlZDogKF9mID0gYXBpUmVzcG9uc2Uuc2NoZWR1bGVkKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YuaXNfZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnRpbDogKChfaCA9IChfZyA9IGFwaVJlc3BvbnNlLnNjaGVkdWxlZCkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLmRpc2FibGVkKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2gudW50aWwpID8gbmV3IERhdGUoYXBpUmVzcG9uc2Uuc2NoZWR1bGVkLmRpc2FibGVkLnVudGlsKSA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhc29uOiAoKF9rID0gKF9qID0gYXBpUmVzcG9uc2Uuc2NoZWR1bGVkKSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2ouZGlzYWJsZWQpID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfay5yZWFzb24pIHx8ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXN1bHRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBEZWxldGVzIGFsbCBzY2hlZHVsZWQgYW5kIHVuZGVsaXZlcmVkIG1haWwgZnJvbSB0aGUgZG9tYWluIHF1ZXVlLlxuICAgICAqIGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9kb2NzL21haWxndW4vYXBpLXJlZmVyZW5jZS9zZW5kL21haWxndW4vbWVzc2FnZXMvZGVsZXRlLXYzLS1kb21haW4tbmFtZS0tZW52ZWxvcGVzXG4gICAgKi9cbiAgICBNZXNzYWdlc0NsaWVudC5wcm90b3R5cGUuY2xlYXJNZXNzYWdlc1F1ZXVlID0gZnVuY3Rpb24gKGRvbWFpbiwgc3RvcmFnZVVybCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYWxsb3dlZFN0b3JhZ2VVcmxzLCByZXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvd2VkU3RvcmFnZVVybHMgPSBbJ3N0b3JhZ2UtdXMtZWFzdDQuYXBpLm1haWxndW4ubmV0JywgJ3N0b3JhZ2UtdXMtd2VzdDEuYXBpLm1haWxndW4ubmV0JywgJ3N0b3JhZ2UtZXVyb3BlLXdlc3QxLmFwaS5tYWlsZ3VuLm5ldCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhbGxvd2VkU3RvcmFnZVVybHMuaW5jbHVkZXMoc3RvcmFnZVVybCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdJbnZhbGlkIHN0b3JhZ2UgVVJMJywgJ1RoZSBwcm92aWRlZCBzdG9yYWdlIFVSTCBpcyBub3QgYWxsb3dlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5jb21tYW5kKCdkZWxldGUnLCBcImh0dHBzOi8vXCIuY29uY2F0KHN0b3JhZ2VVcmwsIFwiL3YzL1wiKS5jb25jYXQoZG9tYWluLCBcIi9lbnZlbG9wZXNcIiksIHVuZGVmaW5lZCwgeyBpc1N0b3JhZ2VBUEk6IHRydWUgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzLmJvZHldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBNZXNzYWdlc0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlc0NsaWVudDtcbiIsInZhciBSb3V0ZXNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUm91dGVzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgUm91dGVzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvcm91dGVzJywgcXVlcnkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHkuaXRlbXM7IH0pO1xuICAgIH07XG4gICAgUm91dGVzQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoXCIvdjMvcm91dGVzL1wiLmNvbmNhdChpZCkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHkucm91dGU7IH0pO1xuICAgIH07XG4gICAgUm91dGVzQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92My9yb3V0ZXMnLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5LnJvdXRlOyB9KTtcbiAgICB9O1xuICAgIFJvdXRlc0NsaWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGlkLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKFwiL3YzL3JvdXRlcy9cIi5jb25jYXQoaWQpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5OyB9KTtcbiAgICB9O1xuICAgIFJvdXRlc0NsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIi92My9yb3V0ZXMvXCIuY29uY2F0KGlkKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gUm91dGVzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFJvdXRlc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBWYWxpZGF0ZUNsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBWYWxpZGF0ZUNsaWVudChyZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5tdWx0aXBsZVZhbGlkYXRpb24gPSBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ7XG4gICAgfVxuICAgIFZhbGlkYXRlQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoYWRkcmVzcykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnksIHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5ID0geyBhZGRyZXNzOiBhZGRyZXNzIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvYWRkcmVzcy92YWxpZGF0ZScsIHF1ZXJ5KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXN1bHQuYm9keV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFZhbGlkYXRlQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFZhbGlkYXRlQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIElwc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJcHNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBJcHNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvaXBzJywgcXVlcnkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wYXJzZUlwc1Jlc3BvbnNlKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSXBzQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaXApIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3YzL2lwcy9cIi5jb25jYXQoaXApKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucGFyc2VJcHNSZXNwb25zZShyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIElwc0NsaWVudC5wcm90b3R5cGUucGFyc2VJcHNSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICB9O1xuICAgIHJldHVybiBJcHNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgSXBzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBJcFBvb2xzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIElwUG9vbHNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBJcFBvb2xzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YxL2lwX3Bvb2xzJylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gX3RoaXMucGFyc2VJcFBvb2xzUmVzcG9uc2UocmVzcG9uc2UpOyB9KTtcbiAgICB9O1xuICAgIElwUG9vbHNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92MS9pcF9wb29scycsIGRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9LCByZXNwb25zZS5ib2R5KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSXBQb29sc0NsaWVudC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKHBvb2xJZCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wYXRjaFdpdGhGRChcIi92MS9pcF9wb29scy9cIi5jb25jYXQocG9vbElkKSwgZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3BvbnNlLmJvZHkpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJcFBvb2xzQ2xpZW50LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAocG9vbElkLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIi92MS9pcF9wb29scy9cIi5jb25jYXQocG9vbElkKSwgZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3BvbnNlLmJvZHkpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJcFBvb2xzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUlwUG9vbHNSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gX19hc3NpZ24oeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9LCByZXNwb25zZS5ib2R5KTtcbiAgICB9O1xuICAgIHJldHVybiBJcFBvb2xzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IElwUG9vbHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG52YXIgTWFpbGluZ0xpc3RzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhNYWlsaW5nTGlzdHNDbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFpbGluZ0xpc3RzQ2xpZW50KHJlcXVlc3QsIG1lbWJlcnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgICAgICBfdGhpcy5tZW1iZXJzID0gbWVtYmVycztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBNYWlsaW5nTGlzdHNDbGllbnQucHJvdG90eXBlLnBhcnNlVmFsaWRhdGlvblJlc3VsdCA9IGZ1bmN0aW9uIChzdGF0dXMsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXR1czogc3RhdHVzLFxuICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdDogX19hc3NpZ24oX19hc3NpZ24oe30sIGRhdGEpLCB7IGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCAqIDEwMDApIC8vIGFkZCBtaWxsaXNlY29uZCB0byBVbml4IHRpbWVzdGFtcFxuICAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBNYWlsaW5nTGlzdHNDbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyhcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvcGFnZXNcIiksIHF1ZXJ5KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNYWlsaW5nTGlzdHNDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUsIFwiL1wiKS5jb25jYXQobWFpbExpc3RBZGRyZXNzKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkgeyByZXR1cm4gcmVzcG9uc2UuYm9keS5saXN0OyB9KTtcbiAgICB9O1xuICAgIE1haWxpbmdMaXN0c0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHRoaXMuYmFzZVJvdXRlLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5Lmxpc3Q7IH0pO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcyksIGRhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHkubGlzdDsgfSk7XG4gICAgfTtcbiAgICBNYWlsaW5nTGlzdHNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHk7IH0pO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcywgXCIvdmFsaWRhdGVcIiksIHt9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiAoX19hc3NpZ24oeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9LCByZXNwb25zZS5ib2R5KSk7IH0pO1xuICAgIH07XG4gICAgTWFpbGluZ0xpc3RzQ2xpZW50LnByb3RvdHlwZS52YWxpZGF0aW9uUmVzdWx0ID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL3ZhbGlkYXRlXCIpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiBfdGhpcy5wYXJzZVZhbGlkYXRpb25SZXN1bHQocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5ib2R5KTsgfSk7XG4gICAgfTtcbiAgICBNYWlsaW5nTGlzdHNDbGllbnQucHJvdG90eXBlLmNhbmNlbFZhbGlkYXRpb24gPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcywgXCIvdmFsaWRhdGVcIikpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuICh7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgICAgICB9KTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTWFpbGluZ0xpc3RzQ2xpZW50O1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBNYWlsaW5nTGlzdHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG52YXIgTWFpbExpc3RzTWVtYmVycyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTWFpbExpc3RzTWVtYmVycywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYWlsTGlzdHNNZW1iZXJzKHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE1haWxMaXN0c01lbWJlcnMucHJvdG90eXBlLmNoZWNrQW5kVXBkYXRlRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBuZXdEYXRhID0gX19hc3NpZ24oe30sIGRhdGEpO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEudmFycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIG5ld0RhdGEudmFycyA9IEpTT04uc3RyaW5naWZ5KG5ld0RhdGEudmFycyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLnN1YnNjcmliZWQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgbmV3RGF0YS5zdWJzY3JpYmVkID0gZGF0YS5zdWJzY3JpYmVkID8gJ3llcycgOiAnbm8nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgIH07XG4gICAgTWFpbExpc3RzTWVtYmVycy5wcm90b3R5cGUucGFyc2VMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuICAgIE1haWxMaXN0c01lbWJlcnMucHJvdG90eXBlLmxpc3RNZW1iZXJzID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcywgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcywgXCIvbWVtYmVycy9wYWdlc1wiKSwgcXVlcnkpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE1haWxMaXN0c01lbWJlcnMucHJvdG90eXBlLmdldE1lbWJlciA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MsIG1haWxMaXN0TWVtYmVyQWRkcmVzcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL21lbWJlcnMvXCIpLmNvbmNhdChtYWlsTGlzdE1lbWJlckFkZHJlc3MpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5Lm1lbWJlcjsgfSk7XG4gICAgfTtcbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS5jcmVhdGVNZW1iZXIgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzLCBkYXRhKSB7XG4gICAgICAgIHZhciByZXFEYXRhID0gdGhpcy5jaGVja0FuZFVwZGF0ZURhdGEoZGF0YSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL21lbWJlcnNcIiksIHJlcURhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHkubWVtYmVyOyB9KTtcbiAgICB9O1xuICAgIE1haWxMaXN0c01lbWJlcnMucHJvdG90eXBlLmNyZWF0ZU1lbWJlcnMgPSBmdW5jdGlvbiAobWFpbExpc3RBZGRyZXNzLCBkYXRhKSB7XG4gICAgICAgIHZhciBuZXdEYXRhID0ge1xuICAgICAgICAgICAgbWVtYmVyczogQXJyYXkuaXNBcnJheShkYXRhLm1lbWJlcnMpID8gSlNPTi5zdHJpbmdpZnkoZGF0YS5tZW1iZXJzKSA6IGRhdGEubWVtYmVycyxcbiAgICAgICAgICAgIHVwc2VydDogZGF0YS51cHNlcnRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcywgXCIvbWVtYmVycy5qc29uXCIpLCBuZXdEYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5OyB9KTtcbiAgICB9O1xuICAgIE1haWxMaXN0c01lbWJlcnMucHJvdG90eXBlLnVwZGF0ZU1lbWJlciA9IGZ1bmN0aW9uIChtYWlsTGlzdEFkZHJlc3MsIG1haWxMaXN0TWVtYmVyQWRkcmVzcywgZGF0YSkge1xuICAgICAgICB2YXIgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSwgXCIvXCIpLmNvbmNhdChtYWlsTGlzdEFkZHJlc3MsIFwiL21lbWJlcnMvXCIpLmNvbmNhdChtYWlsTGlzdE1lbWJlckFkZHJlc3MpLCByZXFEYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS5ib2R5Lm1lbWJlcjsgfSk7XG4gICAgfTtcbiAgICBNYWlsTGlzdHNNZW1iZXJzLnByb3RvdHlwZS5kZXN0cm95TWVtYmVyID0gZnVuY3Rpb24gKG1haWxMaXN0QWRkcmVzcywgbWFpbExpc3RNZW1iZXJBZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiXCIuY29uY2F0KHRoaXMuYmFzZVJvdXRlLCBcIi9cIikuY29uY2F0KG1haWxMaXN0QWRkcmVzcywgXCIvbWVtYmVycy9cIikuY29uY2F0KG1haWxMaXN0TWVtYmVyQWRkcmVzcykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIHJlc3BvbnNlLmJvZHk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE1haWxMaXN0c01lbWJlcnM7XG59KE5hdmlnYXRpb25UaHJ1UGFnZXMpKTtcbmV4cG9ydCBkZWZhdWx0IE1haWxMaXN0c01lbWJlcnM7XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG52YXIgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9tYWluQ3JlZGVudGlhbHNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvZG9tYWlucy8nO1xuICAgIH1cbiAgICBEb21haW5DcmVkZW50aWFsc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0ID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgICAgICAgIHRvdGFsQ291bnQ6IHJlc3BvbnNlLmJvZHkudG90YWxfY291bnRcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VNZXNzYWdlUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBEb21haW5DcmVkZW50aWFsc0NsaWVudC5wcm90b3R5cGUuX3BhcnNlRGVsZXRlZFJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgICAgICAgIHNwZWM6IHJlc3BvbnNlLmJvZHkuc3BlY1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAoZG9tYWluLCBxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvY3JlZGVudGlhbHMnKSwgcXVlcnkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5DcmVkZW50aWFsc0NsaWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGRvbWFpbiwgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUpLmNvbmNhdChkb21haW4sIFwiL2NyZWRlbnRpYWxzXCIpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIGNyZWRlbnRpYWxzTG9naW4sIGRhdGEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUpLmNvbmNhdChkb21haW4sIFwiL2NyZWRlbnRpYWxzL1wiKS5jb25jYXQoY3JlZGVudGlhbHNMb2dpbiksIGRhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5DcmVkZW50aWFsc0NsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkb21haW4sIGNyZWRlbnRpYWxzTG9naW4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoXCJcIi5jb25jYXQodGhpcy5iYXNlUm91dGUpLmNvbmNhdChkb21haW4sIFwiL2NyZWRlbnRpYWxzL1wiKS5jb25jYXQoY3JlZGVudGlhbHNMb2dpbikpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VEZWxldGVkUmVzcG9uc2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRG9tYWluQ3JlZGVudGlhbHNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG5pbXBvcnQgQXR0YWNobWVudHNIYW5kbGVyIGZyb20gJy4uL2NvbW1vbi9BdHRhY2htZW50c0hhbmRsZXIuanMnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvci5qcyc7XG52YXIgTXVsdGlwbGVWYWxpZGF0aW9uSm9iID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE11bHRpcGxlVmFsaWRhdGlvbkpvYihkYXRhLCByZXNwb25zZVN0YXR1c0NvZGUpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdGhpcy5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5pZDtcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IGRhdGEucXVhbnRpdHk7XG4gICAgICAgIHRoaXMucmVjb3Jkc1Byb2Nlc3NlZCA9IGRhdGEucmVjb3Jkc19wcm9jZXNzZWQ7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgICAgIHRoaXMucmVzcG9uc2VTdGF0dXNDb2RlID0gcmVzcG9uc2VTdGF0dXNDb2RlO1xuICAgICAgICBpZiAoZGF0YS5kb3dubG9hZF91cmwpIHtcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRVcmwgPSB7XG4gICAgICAgICAgICAgICAgY3N2OiAoX2EgPSBkYXRhLmRvd25sb2FkX3VybCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNzdixcbiAgICAgICAgICAgICAgICBqc29uOiAoX2IgPSBkYXRhLmRvd25sb2FkX3VybCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmpzb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuc3VtbWFyeSkge1xuICAgICAgICAgICAgdGhpcy5zdW1tYXJ5ID0ge1xuICAgICAgICAgICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgICAgICAgICBjYXRjaEFsbDogZGF0YS5zdW1tYXJ5LnJlc3VsdC5jYXRjaF9hbGwsXG4gICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJhYmxlOiBkYXRhLnN1bW1hcnkucmVzdWx0LmRlbGl2ZXJhYmxlLFxuICAgICAgICAgICAgICAgICAgICBkb05vdFNlbmQ6IGRhdGEuc3VtbWFyeS5yZXN1bHQuZG9fbm90X3NlbmQsXG4gICAgICAgICAgICAgICAgICAgIHVuZGVsaXZlcmFibGU6IGRhdGEuc3VtbWFyeS5yZXN1bHQudW5kZWxpdmVyYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgdW5rbm93bjogZGF0YS5zdW1tYXJ5LnJlc3VsdC51bmtub3duXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByaXNrOiB7XG4gICAgICAgICAgICAgICAgICAgIGhpZ2g6IGRhdGEuc3VtbWFyeS5yaXNrLmhpZ2gsXG4gICAgICAgICAgICAgICAgICAgIGxvdzogZGF0YS5zdW1tYXJ5LnJpc2subG93LFxuICAgICAgICAgICAgICAgICAgICBtZWRpdW06IGRhdGEuc3VtbWFyeS5yaXNrLm1lZGl1bSxcbiAgICAgICAgICAgICAgICAgICAgdW5rbm93bjogZGF0YS5zdW1tYXJ5LnJpc2sudW5rbm93blxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIE11bHRpcGxlVmFsaWRhdGlvbkpvYjtcbn0oKSk7XG5leHBvcnQgeyBNdWx0aXBsZVZhbGlkYXRpb25Kb2IgfTtcbnZhciBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQocmVxdWVzdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgX3RoaXMuYXR0YWNobWVudHNIYW5kbGVyID0gbmV3IEF0dGFjaG1lbnRzSGFuZGxlcigpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudC5wcm90b3R5cGUuaGFuZGxlUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduKHsgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMgfSwgcmVzcG9uc2UgPT09IG51bGwgfHwgcmVzcG9uc2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc3BvbnNlLmJvZHkpO1xuICAgIH07XG4gICAgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5qb2JzID0gcmVzcG9uc2UuYm9keS5qb2JzLm1hcChmdW5jdGlvbiAoam9iKSB7IHJldHVybiBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uSm9iKGpvYiwgcmVzcG9uc2Uuc3RhdHVzKTsgfSk7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwaXZvdCcpO1xuICAgICAgICBkYXRhLnRvdGFsID0gcmVzcG9uc2UuYm9keS50b3RhbDtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcygnL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsaycsIHF1ZXJ5KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChsaXN0SWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay9cIi5jb25jYXQobGlzdElkKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uSm9iKHJlc3BvbnNlLmJvZHksIHJlc3BvbnNlLnN0YXR1cyldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudC5wcm90b3R5cGUuY29udmVydFRvRXhwZWN0ZWRTaGFwZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBtdWx0aXBsZVZhbGlkYXRpb25EYXRhO1xuICAgICAgICBpZiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoZGF0YS5maWxlKSkge1xuICAgICAgICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHsgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZTogZGF0YS5maWxlIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGRhdGEuZmlsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IHsgZGF0YTogZGF0YS5maWxlIH0gfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShkYXRhLmZpbGUpKSB7XG4gICAgICAgICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IGRhdGEuZmlsZSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtdWx0aXBsZVZhbGlkYXRpb25EYXRhO1xuICAgIH07XG4gICAgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAobGlzdElkLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtdWx0aXBsZVZhbGlkYXRpb25EYXRhLCByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSB8fCAhZGF0YS5maWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignXCJmaWxlXCIgcHJvcGVydHkgZXhwZWN0ZWQuJywgJ01ha2Ugc3VyZSBzZWNvbmQgYXJndW1lbnQgaGFzIFwiZmlsZVwiIHByb3BlcnR5LicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHRoaXMuY29udmVydFRvRXhwZWN0ZWRTaGFwZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKFwiL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay9cIi5jb25jYXQobGlzdElkKSwgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKGxpc3RJZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5kZWxldGUoXCIvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrL1wiLmNvbmNhdChsaXN0SWQpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuaGFuZGxlUmVzcG9uc2UocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50O1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2V4dGVuZHMsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy5qcyc7XG52YXIgRG9tYWluVGVtcGxhdGVJdGVtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvbWFpblRlbXBsYXRlSXRlbShkb21haW5UZW1wbGF0ZUZyb21BUEkpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLm5hbWU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuY3JlYXRlZEF0ID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRBdCA/IG5ldyBEYXRlKGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQpIDogJyc7XG4gICAgICAgIHRoaXMuY3JlYXRlZEJ5ID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRCeTtcbiAgICAgICAgdGhpcy5pZCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5pZDtcbiAgICAgICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnNpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlcnNpb24gJiYgZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24uY3JlYXRlZEF0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZXJzaW9uLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucyAmJiBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnNpb25zID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLm1hcChmdW5jdGlvbiAodmVyc2lvbikge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBfX2Fzc2lnbih7fSwgdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmNyZWF0ZWRBdCA9IG5ldyBEYXRlKHZlcnNpb24uY3JlYXRlZEF0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIERvbWFpblRlbXBsYXRlSXRlbTtcbn0oKSk7XG5leHBvcnQgeyBEb21haW5UZW1wbGF0ZUl0ZW0gfTtcbnZhciBEb21haW5UZW1wbGF0ZXNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERvbWFpblRlbXBsYXRlc0NsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEb21haW5UZW1wbGF0ZXNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCByZXF1ZXN0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgX3RoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUucGFyc2VDcmVhdGlvblJlc3BvbnNlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUucGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgICAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmVzdWx0LnRlbXBsYXRlID0gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkYXRhLmJvZHkudGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlTXV0YXRpb25SZXNwb25zZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgICAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgICAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgICAgICBpZiAoZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICAgICAgICByZXN1bHQudGVtcGxhdGVOYW1lID0gZGF0YS5ib2R5LnRlbXBsYXRlLm5hbWU7XG4gICAgICAgICAgICByZXN1bHQudGVtcGxhdGVWZXJzaW9uID0geyB0YWc6IGRhdGEuYm9keS50ZW1wbGF0ZS52ZXJzaW9uLnRhZyB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZCk7IH0pO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncCcpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzcG9uc2UuYm9keS50ZW1wbGF0ZSk7XG4gICAgICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwJyk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKGRvbWFpbiwgcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSwgcXVlcnkpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRvbWFpbiwgdGVtcGxhdGVOYW1lLCBxdWVyeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIHF1ZXJ5KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXMuYm9keS50ZW1wbGF0ZSk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIGRhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZUNyZWF0aW9uUmVzcG9uc2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIHRlbXBsYXRlTmFtZSwgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIGRhdGEpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZG9tYWluLCB0ZW1wbGF0ZU5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMucGFyc2VNdXRhdGlvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5kZXN0cm95QWxsID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5saXN0VmVyc2lvbnMgPSBmdW5jdGlvbiAoZG9tYWluLCB0ZW1wbGF0ZU5hbWUsIHF1ZXJ5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgcXVlcnkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zKHJlcyk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGVtcGxhdGVzQ2xpZW50LnByb3RvdHlwZS5nZXRWZXJzaW9uID0gZnVuY3Rpb24gKGRvbWFpbiwgdGVtcGxhdGVOYW1lLCB0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRlbXBsYXRlc0NsaWVudC5wcm90b3R5cGUuY3JlYXRlVmVyc2lvbiA9IGZ1bmN0aW9uIChkb21haW4sIHRlbXBsYXRlTmFtZSwgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLnBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLnVwZGF0ZVZlcnNpb24gPSBmdW5jdGlvbiAoZG9tYWluLCB0ZW1wbGF0ZU5hbWUsIHRhZywgZGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgIGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLnBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UZW1wbGF0ZXNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3lWZXJzaW9uID0gZnVuY3Rpb24gKGRvbWFpbiwgdGVtcGxhdGVOYW1lLCB0YWcpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSlcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcyk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERvbWFpblRlbXBsYXRlc0NsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgRG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xudmFyIERvbWFpblRhZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEb21haW5UYWcodGFnSW5mbykge1xuICAgICAgICB0aGlzLnRhZyA9IHRhZ0luZm8udGFnO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnSW5mby5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpc1snZmlyc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snZmlyc3Qtc2VlbiddKTtcbiAgICAgICAgdGhpc1snbGFzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydsYXN0LXNlZW4nXSk7XG4gICAgfVxuICAgIHJldHVybiBEb21haW5UYWc7XG59KCkpO1xuZXhwb3J0IHsgRG9tYWluVGFnIH07XG52YXIgRG9tYWluVGFnU3RhdGlzdGljID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvbWFpblRhZ1N0YXRpc3RpYyh0YWdTdGF0aXN0aWNJbmZvKSB7XG4gICAgICAgIHRoaXMudGFnID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnRhZztcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGFydCk7XG4gICAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LmVuZCk7XG4gICAgICAgIHRoaXMucmVzb2x1dGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5yZXNvbHV0aW9uO1xuICAgICAgICB0aGlzLnN0YXRzID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdCkge1xuICAgICAgICAgICAgdmFyIHJlcyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBzdGF0KSwgeyB0aW1lOiBuZXcgRGF0ZShzdGF0LnRpbWUpIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBEb21haW5UYWdTdGF0aXN0aWM7XG59KCkpO1xuZXhwb3J0IHsgRG9tYWluVGFnU3RhdGlzdGljIH07XG52YXIgRG9tYWluVGFnc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRG9tYWluVGFnc0NsaWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEb21haW5UYWdzQ2xpZW50KHJlcXVlc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLmJhc2VSb3V0ZSA9ICcvdjMvJztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBEb21haW5UYWdzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uICh0YWdJbmZvKSB7IHJldHVybiBuZXcgRG9tYWluVGFnKHRhZ0luZm8pOyB9KTtcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3RhZycpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBEb21haW5UYWdzQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VUYWdTdGF0aXN0aWMgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb21haW5UYWdTdGF0aXN0aWMocmVzcG9uc2UpO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChkb21haW4sIHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycpLCBxdWVyeSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGRvbWFpbiwgdGFnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIG5ldyBEb21haW5UYWcocmVzLmJvZHkpOyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkb21haW4sIHRhZywgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpLCB7IGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChkb21haW4sIHRhZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShcIlwiLmNvbmNhdCh0aGlzLmJhc2VSb3V0ZSkuY29uY2F0KGRvbWFpbiwgXCIvdGFncy9cIikuY29uY2F0KHRhZykpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiAoe1xuICAgICAgICAgICAgbWVzc2FnZTogcmVzLmJvZHkubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1c1xuICAgICAgICB9KTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UYWdzQ2xpZW50LnByb3RvdHlwZS5zdGF0aXN0aWMgPSBmdW5jdGlvbiAoZG9tYWluLCB0YWcsIHF1ZXJ5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMnKSwgcXVlcnkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5fcGFyc2VUYWdTdGF0aXN0aWMocmVzKTsgfSk7XG4gICAgfTtcbiAgICBEb21haW5UYWdzQ2xpZW50LnByb3RvdHlwZS5jb3VudHJpZXMgPSBmdW5jdGlvbiAoZG9tYWluLCB0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL2NvdW50cmllcycpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pO1xuICAgIH07XG4gICAgRG9tYWluVGFnc0NsaWVudC5wcm90b3R5cGUucHJvdmlkZXJzID0gZnVuY3Rpb24gKGRvbWFpbiwgdGFnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9wcm92aWRlcnMnKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIERvbWFpblRhZ3NDbGllbnQucHJvdG90eXBlLmRldmljZXMgPSBmdW5jdGlvbiAoZG9tYWluLCB0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL2RldmljZXMnKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIHJlcy5ib2R5OyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEb21haW5UYWdzQ2xpZW50O1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBEb21haW5UYWdzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24sIF9fYXdhaXRlciwgX19leHRlbmRzLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMuanMnO1xudmFyIFNlZWRzTGlzdHNDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNlZWRzTGlzdHNDbGllbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2VlZHNMaXN0c0NsaWVudChyZXF1ZXN0LCBhdHRyaWJ1dGVzLCBmaWx0ZXJzLCBsb2dnZXIpIHtcbiAgICAgICAgaWYgKGxvZ2dlciA9PT0gdm9pZCAwKSB7IGxvZ2dlciA9IGNvbnNvbGU7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcmVxdWVzdCkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIF90aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgICAgICBfdGhpcy5maWx0ZXJzID0gZmlsdGVycztcbiAgICAgICAgX3RoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFNlZWRzTGlzdHNDbGllbnQucHJvdG90eXBlLmNvbnZlcnREYXRlVG9VVEMgPSBmdW5jdGlvbiAoa2V5LCBpbnB1dERhdGUpIHtcbiAgICAgICAgLypcbiAgICAgICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAgICAgKHBsdXMgMiBob3VycyBmcm9tIHRoZSB0aW1lem9uZSlcbiAgICAgICAgICBhbmQgYmVjYXVzZSBmb3IgQVBJLCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGRhdGUgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdFxuICAgICAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICAgICAgSGVyZSB3ZSB0cnkgYXV0by1jb252ZXJ0IHRoZW0gdG8gVVRDXG4gICAgICAgICovXG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJEYXRlOiBcXFwiXCIuY29uY2F0KGlucHV0RGF0ZSwgXCJcXFwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxcblZhbHVlIFxcXCJcIikuY29uY2F0KGlucHV0RGF0ZS50b0lTT1N0cmluZygpLCBcIlxcXCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxcbkNvbnNpZGVyIHVzaW5nIHN0cmluZyB0eXBlIGZvciBwcm9wZXJ0eSBcXFwiXCIpLmNvbmNhdChrZXksIFwiXFxcIiB0byBhdm9pZCBhdXRvLWNvbnZlcnRpbmdcIikpO1xuICAgICAgICByZXR1cm4gaW5wdXREYXRlLnRvSVNPU3RyaW5nKCk7XG4gICAgfTtcbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5wcmVwYXJlUXVlcnlEYXRhID0gZnVuY3Rpb24gKHF1ZXJ5RGF0YSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcHJvcHNGb3JSZXBsYWNlbWVudCA9IHF1ZXJ5RGF0YTtcbiAgICAgICAgdmFyIHJlcGxhY2VkUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wc0ZvclJlcGxhY2VtZW50KS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IGtleTtcbiAgICAgICAgICAgIGlmICghIXByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gJiYgdHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcXVlcnlEYXRhW3Byb3BdO1xuICAgICAgICAgICAgICAgIGFjY1twcm9wXSA9IF90aGlzLmNvbnZlcnREYXRlVG9VVEMocHJvcCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgICAgICB2YXIgcmVzdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHF1ZXJ5RGF0YSksIHJlcGxhY2VkUHJvcHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUucHJlcGFyZVJlc3VsdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgdmFyIHNlZWRMaXN0ID0gdGhpcy5wcmVwYXJlU2VlZExpc3QoZGF0YS5ib2R5KTtcbiAgICAgICAgcmVzdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHNlZWRMaXN0KSwgeyBzdGF0dXM6IGRhdGEuc3RhdHVzIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgU2VlZHNMaXN0c0NsaWVudC5wcm90b3R5cGUucHJlcGFyZVNlZWRMaXN0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHNlZWRzO1xuICAgICAgICB2YXIgaGFuZGxlZFNlZWRMaXN0RGF0ZXMgPSB7XG4gICAgICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpLFxuICAgICAgICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoZGF0YS51cGRhdGVkX2F0KSxcbiAgICAgICAgICAgIGxhc3RfcmVzdWx0X2F0OiBuZXcgRGF0ZShkYXRhLmxhc3RfcmVzdWx0X2F0KSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGRhdGEuU2VlZHMpIHtcbiAgICAgICAgICAgIHNlZWRzID0gZGF0YS5TZWVkcy5tYXAoZnVuY3Rpb24gKHNlZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZWQgPSB7fTtcbiAgICAgICAgICAgICAgICB2YXIgaGFuZGxlZFNlZWREYXRlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoc2VlZEl0ZW0uY3JlYXRlZF9hdCksXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLnVwZGF0ZWRfYXQpLFxuICAgICAgICAgICAgICAgICAgICBtYXhfZW1haWxfY291bnRfaGl0X2F0OiBuZXcgRGF0ZShzZWVkSXRlbS5tYXhfZW1haWxfY291bnRfaGl0X2F0KSxcbiAgICAgICAgICAgICAgICAgICAgbGFzdF9zZW50X3RvX2F0OiBuZXcgRGF0ZShzZWVkSXRlbS5sYXN0X3NlbnRfdG9fYXQpLFxuICAgICAgICAgICAgICAgICAgICBsYXN0X2RlbGl2ZXJlZF9hdDogbmV3IERhdGUoc2VlZEl0ZW0ubGFzdF9kZWxpdmVyZWRfYXQpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgc2VlZCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBzZWVkSXRlbSksIGhhbmRsZWRTZWVkRGF0ZXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWVkcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlZWRMaXN0ID0gX19hc3NpZ24oX19hc3NpZ24oX19hc3NpZ24oe30sIGRhdGEpLCB7IFNlZWRzOiBzZWVkcyB9KSwgaGFuZGxlZFNlZWRMaXN0RGF0ZXMpO1xuICAgICAgICBkZWxldGUgc2VlZExpc3QuSWQ7XG4gICAgICAgIHJldHVybiBzZWVkTGlzdDtcbiAgICB9O1xuICAgIFNlZWRzTGlzdHNDbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgIH07XG4gICAgICAgIGRhdGEuaXRlbXMgPSAoX2EgPSByZXNwb25zZS5ib2R5Lml0ZW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWFwKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBfdGhpcy5wcmVwYXJlU2VlZExpc3QoaXRlbSk7IH0pO1xuICAgICAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeURhdGEsIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnlEYXRhKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoJy92NC9pbmJveC9zZWVkbGlzdHMnLCBxdWVyeURhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMucGFyc2VMaXN0KHJlc3BvbnNlKSksIHsgc3RhdHVzOiAyMDAgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNlZWRzTGlzdHNDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UsIHVwZGF0ZWRTZWVkc0xpc3Q7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoXCIvdjQvaW5ib3gvc2VlZGxpc3RzL1wiLmNvbmNhdChpZCkpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkU2VlZHNMaXN0ID0gdGhpcy5wcmVwYXJlU2VlZExpc3QocmVzcG9uc2UuYm9keS5zZWVkbGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oX19hc3NpZ24oe30sIHVwZGF0ZWRTZWVkc0xpc3QpLCB7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjQvaW5ib3gvc2VlZGxpc3RzJywgZGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnByZXBhcmVSZXN1bHQocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTZWVkc0xpc3RzQ2xpZW50LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoaWQsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucHV0KFwiL3Y0L2luYm94L3NlZWRsaXN0cy9cIi5jb25jYXQoaWQpLCBkYXRhKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucHJlcGFyZVJlc3VsdChyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNlZWRzTGlzdHNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiL3Y0L2luYm94L3NlZWRsaXN0cy9cIi5jb25jYXQoaWQpKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2VlZHNMaXN0c0NsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgU2VlZHNMaXN0c0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgSW5ib3hQbGFjZW1lbnRzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEluYm94UGxhY2VtZW50c0NsaWVudChyZXF1ZXN0LCBzZWVkc0xpc3RzQ2xpZW50LCByZXN1bHRzLCBwcm92aWRlcnMpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgdGhpcy5zZWVkc0xpc3RzID0gc2VlZHNMaXN0c0NsaWVudDtcbiAgICAgICAgdGhpcy5zZWVkc0xpc3RzID0gc2VlZHNMaXN0c0NsaWVudDtcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0cztcbiAgICAgICAgdGhpcy5wcm92aWRlcnMgPSBwcm92aWRlcnM7XG4gICAgfVxuICAgIEluYm94UGxhY2VtZW50c0NsaWVudC5wcm90b3R5cGUucnVuVGVzdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnBvc3QoJy92NC9pbmJveC90ZXN0cycsIGRhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc3BvbnNlLmJvZHkpLCB7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5ib3hQbGFjZW1lbnRzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEluYm94UGxhY2VtZW50c0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZXh0ZW5kcywgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uLy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLmpzJztcbnZhciBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQocmVxdWVzdCwgYXR0cmlidXRlcywgZmlsdGVycywgc2hhcmluZywgbG9nZ2VyKSB7XG4gICAgICAgIGlmIChsb2dnZXIgPT09IHZvaWQgMCkgeyBsb2dnZXIgPSBjb25zb2xlOyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJlcXVlc3QpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICBfdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgICAgICAgX3RoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgICAgIF90aGlzLnNoYXJpbmcgPSBzaGFyaW5nO1xuICAgICAgICBfdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC5wcm90b3R5cGUuY29udmVydERhdGVUb1VUQyA9IGZ1bmN0aW9uIChrZXksIGlucHV0RGF0ZSkge1xuICAgICAgICAvKlxuICAgICAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgICAgIGFuZCBiZWNhdXNlIGZvciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XG4gICAgICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIkRhdGU6IFxcXCJcIi5jb25jYXQoaW5wdXREYXRlLCBcIlxcXCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXFxuVmFsdWUgXFxcIlwiKS5jb25jYXQoaW5wdXREYXRlLnRvSVNPU3RyaW5nKCksIFwiXFxcIiB3aWxsIGJlIHVzZWQgZm9yIHJlcXVlc3QuXFxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFxcXCJcIikuY29uY2F0KGtleSwgXCJcXFwiIHRvIGF2b2lkIGF1dG8tY29udmVydGluZ1wiKSk7XG4gICAgICAgIHJldHVybiBpbnB1dERhdGUudG9JU09TdHJpbmcoKTtcbiAgICB9O1xuICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQucHJvdG90eXBlLnByZXBhcmVRdWVyeURhdGEgPSBmdW5jdGlvbiAocXVlcnlEYXRhKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBwcm9wc0ZvclJlcGxhY2VtZW50ID0gcXVlcnlEYXRhO1xuICAgICAgICB2YXIgcmVwbGFjZWRQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzRm9yUmVwbGFjZW1lbnQpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcm9wID0ga2V5O1xuICAgICAgICAgICAgaWYgKCEhcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSAmJiB0eXBlb2YgcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBxdWVyeURhdGFbcHJvcF07XG4gICAgICAgICAgICAgICAgYWNjW3Byb3BdID0gX3RoaXMuY29udmVydERhdGVUb1VUQyhwcm9wLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIHZhciByZXN1bHQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcXVlcnlEYXRhKSwgcmVwbGFjZWRQcm9wcyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LnByb3RvdHlwZS5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIGJveCA9IHt9O1xuICAgICAgICB2YXIgaGFuZGxlZFNlZWRMaXN0RGF0ZXMgPSB7XG4gICAgICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpLFxuICAgICAgICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoZGF0YS51cGRhdGVkX2F0KSxcbiAgICAgICAgICAgIHNoYXJpbmdfZXhwaXJlc19hdDogbmV3IERhdGUoZGF0YS5zaGFyaW5nX2V4cGlyZXNfYXQpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoZGF0YS5Cb3gpIHtcbiAgICAgICAgICAgIGJveCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkYXRhLkJveCksIHsgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5Cb3guY3JlYXRlZF9hdCksIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuQm94LnVwZGF0ZWRfYXQpLCBsYXN0X3Jlc3VsdF9hdDogbmV3IERhdGUoZGF0YS5Cb3gubGFzdF9yZXN1bHRfYXQpIH0pO1xuICAgICAgICAgICAgZGVsZXRlIGJveC5JRDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5ib3hQbGFjZW1lbnRzUmVzdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oX19hc3NpZ24oX19hc3NpZ24oe30sIGRhdGEpLCB7IEJveDogYm94IH0pLCBoYW5kbGVkU2VlZExpc3REYXRlcyksIHsgaWQ6IGRhdGEuSWQgfSk7XG4gICAgICAgIGRlbGV0ZSBpbmJveFBsYWNlbWVudHNSZXN1bHQuSUQ7XG4gICAgICAgIHJldHVybiBpbmJveFBsYWNlbWVudHNSZXN1bHQ7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBfdGhpcy5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0KGl0ZW0pOyB9KTtcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnlEYXRhLCByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5RGF0YSA9IHRoaXMucHJlcGFyZVF1ZXJ5RGF0YShxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvaW5ib3gvcmVzdWx0cycsIF9fYXNzaWduKHt9LCBxdWVyeURhdGEpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMucGFyc2VMaXN0KHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSwgaW5ib3hQbGFjZW1lbnRSZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoXCIvdjQvaW5ib3gvcmVzdWx0cy9cIi5jb25jYXQoaWQpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5ib3hQbGFjZW1lbnRSZXN1bHQgPSB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQocmVzcG9uc2UuYm9keS5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluYm94UGxhY2VtZW50UmVzdWx0OiBpbmJveFBsYWNlbWVudFJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZGVsZXRlKFwiL3Y0L2luYm94L3Jlc3VsdHMvXCIuY29uY2F0KGlkKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3BvbnNlLmJvZHkpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LnByb3RvdHlwZS5nZXRSZXN1bHRCeVNoYXJlSWQgPSBmdW5jdGlvbiAoc2hhcmVJZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UsIGluYm94UGxhY2VtZW50UmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y0L2luYm94L3NoYXJpbmcvcHVibGljL1wiLmNvbmNhdChzaGFyZUlkKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluYm94UGxhY2VtZW50UmVzdWx0ID0gdGhpcy5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0KHJlc3BvbnNlLmJvZHkucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmJveFBsYWNlbWVudFJlc3VsdDogaW5ib3hQbGFjZW1lbnRSZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudDtcbn0oTmF2aWdhdGlvblRocnVQYWdlcykpO1xuZXhwb3J0IGRlZmF1bHQgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50KHJlcXVlc3QsIHBhdGgpIHtcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudC5wcm90b3R5cGUubGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KHRoaXMucGF0aCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5nZXQoXCJcIi5jb25jYXQodGhpcy5wYXRoLCBcIi9cIikuY29uY2F0KGF0dHJpYnV0ZU5hbWUpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXNwb25zZS5ib2R5KSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXdhaXRlciwgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbnZhciBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQocmVxdWVzdCwgcGF0aCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIH1cbiAgICBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KHRoaXMucGF0aCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3VsdC5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZF9maWx0ZXJzOiByZXN1bHQuYm9keS5zdXBwb3J0ZWRfZmlsdGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQ7XG4iLCJpbXBvcnQgeyBfX2Fzc2lnbiwgX19hd2FpdGVyLCBfX2dlbmVyYXRvciB9IGZyb20gXCJ0c2xpYlwiO1xudmFyIElQUlNoYXJpbmdDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSVBSU2hhcmluZ0NsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICAgIElQUlNoYXJpbmdDbGllbnQucHJvdG90eXBlLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHRTaGFyaW5nID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIGhhbmRsZWRTZWVkTGlzdERhdGVzID0ge1xuICAgICAgICAgICAgZXhwaXJlc19hdDogbmV3IERhdGUoZGF0YS5leHBpcmVzX2F0KSxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBkYXRhKSwgaGFuZGxlZFNlZWRMaXN0RGF0ZXMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgSVBSU2hhcmluZ0NsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSwgcmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3Y0L2luYm94L3NoYXJpbmcvXCIuY29uY2F0KGlkKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmcocmVzcG9uc2UuYm9keS5zaGFyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbih7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0sIHJlc3VsdCldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIElQUlNoYXJpbmdDbGllbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChpZCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucywgcmVzcG9uc2UsIHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7IHF1ZXJ5OiBcImVuYWJsZWQ9XCIuY29uY2F0KGRhdGEuZW5hYmxlZCkgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wdXQoXCIvdjQvaW5ib3gvc2hhcmluZy9cIi5jb25jYXQoaWQpLCB7fSwgb3B0aW9ucyldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmcocmVzcG9uc2UuYm9keS5zaGFyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzdWx0KSwgeyBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIElQUlNoYXJpbmdDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgSVBSU2hhcmluZ0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudChyZXF1ZXN0KSB7XG4gICAgICAgIHRoaXMucGF0aCA9ICcvdjQvaW5ib3gvcHJvdmlkZXJzJztcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gICAgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50LnByb3RvdHlwZS5wYXJzZUxpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7fTtcbiAgICAgICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlZFByb3ZpZGVyRGF0ZXMgPSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoaXRlbS5jcmVhdGVkX2F0KSxcbiAgICAgICAgICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShpdGVtLnVwZGF0ZWRfYXQpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgaXRlbSksIGhhbmRsZWRQcm92aWRlckRhdGVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgICAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQucHJvdG90eXBlLmxpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCh0aGlzLnBhdGgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG52YXIgTWV0cmljc0NsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNZXRyaWNzQ2xpZW50KHJlcXVlc3QsIGxvZ2dlcikge1xuICAgICAgICBpZiAobG9nZ2VyID09PSB2b2lkIDApIHsgbG9nZ2VyID0gY29uc29sZTsgfVxuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB9XG4gICAgTWV0cmljc0NsaWVudC5wcm90b3R5cGUuY29udmVydERhdGVUb1VUQyA9IGZ1bmN0aW9uIChrZXksIGlucHV0RGF0ZSkge1xuICAgICAgICAvKlxuICAgICAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgICAgIGFuZCBiZWNhdXNlIGZvciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XG4gICAgICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIkRhdGU6XFxcIlwiLmNvbmNhdChpbnB1dERhdGUsIFwiXFxcIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cXG5WYWx1ZSBcXFwiXCIpLmNvbmNhdChpbnB1dERhdGUudG9VVENTdHJpbmcoKSwgXCJcXFwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXFxcIlwiKS5jb25jYXQoa2V5LCBcIlxcXCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nXCIpKTtcbiAgICAgICAgcmV0dXJuIGlucHV0RGF0ZS50b1VUQ1N0cmluZygpO1xuICAgIH07XG4gICAgTWV0cmljc0NsaWVudC5wcm90b3R5cGUucHJlcGFyZVF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHZhciBzdGFydERhdGU7XG4gICAgICAgIHZhciBlbmREYXRlO1xuICAgICAgICBpZiAocXVlcnkpIHtcbiAgICAgICAgICAgIHZhciBxU3RhcnQgPSBxdWVyeSA9PT0gbnVsbCB8fCBxdWVyeSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcXVlcnkuc3RhcnQ7XG4gICAgICAgICAgICB2YXIgcUVuZCA9IHF1ZXJ5ID09PSBudWxsIHx8IHF1ZXJ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBxdWVyeS5lbmQ7XG4gICAgICAgICAgICBzdGFydERhdGUgPSBxU3RhcnQgaW5zdGFuY2VvZiBEYXRlID8gdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKCdzdGFydCcsIHFTdGFydCkgOiBxU3RhcnQgIT09IG51bGwgJiYgcVN0YXJ0ICE9PSB2b2lkIDAgPyBxU3RhcnQgOiAnJztcbiAgICAgICAgICAgIGVuZERhdGUgPSBxRW5kICYmIHFFbmQgaW5zdGFuY2VvZiBEYXRlID8gdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKCdlbmQnLCBxRW5kKSA6IHFFbmQgIT09IG51bGwgJiYgcUVuZCAhPT0gdm9pZCAwID8gcUVuZCA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcXVlcnkpLCB7IHN0YXJ0OiBzdGFydERhdGUsIGVuZDogZW5kRGF0ZSB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIE1ldHJpY3NDbGllbnQucHJvdG90eXBlLmhhbmRsZVJlc3BvbnNlID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciByZXNCb2R5ID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IERhdGUucGFyc2UocmVzQm9keS5zdGFydCkgPyBuZXcgRGF0ZShyZXNCb2R5LnN0YXJ0KSA6IG51bGw7XG4gICAgICAgIHZhciBlbmREYXRlID0gRGF0ZS5wYXJzZShyZXNCb2R5LmVuZCkgPyBuZXcgRGF0ZShyZXNCb2R5LmVuZCkgOiBudWxsO1xuICAgICAgICB2YXIgcmVzdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc0JvZHkpLCB7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLCBzdGFydDogc3RhcnREYXRlLCBlbmQ6IGVuZERhdGUgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBNZXRyaWNzQ2xpZW50LnByb3RvdHlwZS5nZXRBY2NvdW50ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeURhdGEsIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnkocXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnBvc3QoJy92MS9hbmFseXRpY3MvbWV0cmljcycsIHF1ZXJ5RGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTWV0cmljc0NsaWVudC5wcm90b3R5cGUuZ2V0QWNjb3VudFVzYWdlID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeURhdGEsIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnkocXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnBvc3QoJy92MS9hbmFseXRpY3MvdXNhZ2UvbWV0cmljcycsIHF1ZXJ5RGF0YSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLmhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIE1ldHJpY3NDbGllbnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgTWV0cmljc0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZ2VuZXJhdG9yIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG52YXIgRG9tYWluVHJhY2tpbmdDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9tYWluVHJhY2tpbmdDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgICBEb21haW5UcmFja2luZ0NsaWVudC5wcm90b3R5cGUuX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS50cmFja2luZztcbiAgICB9O1xuICAgIERvbWFpblRyYWNraW5nQ2xpZW50LnByb3RvdHlwZS5fcGFyc2VUcmFja2luZ1VwZGF0ZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgICB9O1xuICAgIERvbWFpblRyYWNraW5nQ2xpZW50LnByb3RvdHlwZS5faXNPcGVuVHJhY2tpbmdJbmZvV2l0UGxhY2UgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAncGxhY2VfYXRfdGhlX3RvcCcgaW4gb2JqO1xuICAgIH07XG4gICAgRG9tYWluVHJhY2tpbmdDbGllbnQucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZ2V0KFwiL3YyL3g1MDkvXCIuY29uY2F0KGRvbWFpbiwgXCIvc3RhdHVzXCIpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKF9fYXNzaWduKHt9LCByZXNwb25zZS5ib2R5KSwgeyByZXNwb25zZVN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRG9tYWluVHJhY2tpbmdDbGllbnQucHJvdG90eXBlLmdlbmVyYXRlID0gZnVuY3Rpb24gKGRvbWFpbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0KFwiL3YyL3g1MDkvXCIuY29uY2F0KGRvbWFpbikpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc3BvbnNlLmJvZHkpLCB7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEb21haW5UcmFja2luZ0NsaWVudC5wcm90b3R5cGUucmVnZW5lcmF0ZSA9IGZ1bmN0aW9uIChkb21haW4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucHV0KFwiL3YyL3g1MDkvXCIuY29uY2F0KGRvbWFpbikpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oX19hc3NpZ24oe30sIHJlc3BvbnNlLmJvZHkpLCB7IHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzIH0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEb21haW5UcmFja2luZ0NsaWVudC5wcm90b3R5cGUuZ2V0VHJhY2tpbmcgPSBmdW5jdGlvbiAoZG9tYWluKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJykpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5fcGFyc2VUcmFja2luZ1NldHRpbmdzKHJlc3BvbnNlKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRG9tYWluVHJhY2tpbmdDbGllbnQucHJvdG90eXBlLnVwZGF0ZVRyYWNraW5nID0gZnVuY3Rpb24gKGRvbWFpbiwgdHlwZSwgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcHJlcGFyZWREYXRhLCByZXNwb25zZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXBhcmVkRGF0YSA9IF9fYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS5hY3RpdmUpID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVwYXJlZERhdGEuYWN0aXZlID0gKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS5hY3RpdmUpID8gJ3llcycgOiAnbm8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzT3BlblRyYWNraW5nSW5mb1dpdFBsYWNlKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLnBsYWNlX2F0X3RoZV90b3ApID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlcGFyZWREYXRhLnBsYWNlX2F0X3RoZV90b3AgPSAoZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLnBsYWNlX2F0X3RoZV90b3ApID8gJ3llcycgOiAnbm8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycsIHR5cGUpLCBwcmVwYXJlZERhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5fcGFyc2VUcmFja2luZ1VwZGF0ZShyZXNwb25zZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEb21haW5UcmFja2luZ0NsaWVudDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBEb21haW5UcmFja2luZ0NsaWVudDtcbiIsImltcG9ydCB7IF9fYXNzaWduLCBfX2F3YWl0ZXIsIF9fZXh0ZW5kcywgX19nZW5lcmF0b3IgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLmpzJztcbnZhciBEb21haW5LZXlzQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhEb21haW5LZXlzQ2xpZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERvbWFpbktleXNDbGllbnQocmVxdWVzdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCByZXF1ZXN0KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICAgX3RoaXMuYmFzZVJvdXRlID0gJy92My9kb21haW5zLyc7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgRG9tYWluS2V5c0NsaWVudC5wcm90b3R5cGUuX3BhcnNlRG9tYWluS2V5c0xpc3QgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGl0ZW1zOiByZXNwb25zZS5pdGVtcyxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIERvbWFpbktleXNDbGllbnQucHJvdG90eXBlLnBhcnNlTGlzdCA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcbiAgICAgICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3BhZ2UnKTtcbiAgICAgICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgICAgICAgIHBhZ2VzOiB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwYWdlJyksXG4gICAgICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyB8fCAyMDAsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBEb21haW5LZXlzQ2xpZW50LnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24gKGRvbWFpbk5hbWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCd2NC9kb21haW5zLycsIGRvbWFpbk5hbWUsICcva2V5cycpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5fcGFyc2VEb21haW5LZXlzTGlzdChyZXMuYm9keSkpLCB7IHN0YXR1czogcmVzLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRG9tYWluS2V5c0NsaWVudC5wcm90b3R5cGUubGlzdEFsbCA9IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcHJlcGFyZWRRdWVyeSwgcmVzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlcGFyZWRRdWVyeSA9IF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCAoKHF1ZXJ5ID09PSBudWxsIHx8IHF1ZXJ5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBxdWVyeS5zaWduaW5nRG9tYWluKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8geyBzaWduaW5nX2RvbWFpbjogZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5LnNpZ25pbmdEb21haW4pIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHt9KSksICgocXVlcnkgPT09IG51bGwgfHwgcXVlcnkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHF1ZXJ5LnNlbGVjdG9yKSA/IHsgc2VsZWN0b3I6IGVuY29kZVVSSUNvbXBvbmVudChxdWVyeS5zZWxlY3RvcikgfSA6IHt9KSksIHsgcGFnZTogJycsIGxpbWl0OiAnJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbignL3YxL2RraW0va2V5cycpLCBwcmVwYXJlZFF1ZXJ5KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXNdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERvbWFpbktleXNDbGllbnQucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwcmVwYXJlZERhdGEsIHJlcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXBhcmVkRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduaW5nX2RvbWFpbjogZGF0YS5zaWduaW5nRG9tYWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBkYXRhLnNlbGVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJpdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVwYXJlZERhdGEuYml0cyA9IGRhdGEuYml0cztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnBlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXBhcmVkRGF0YS5wZW0gPSBkYXRhLnBlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YxL2RraW0va2V5cycpLCBwcmVwYXJlZERhdGEpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9fYXNzaWduKHsgc3RhdHVzOiByZXMuc3RhdHVzIH0sIHJlcy5ib2R5KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRG9tYWluS2V5c0NsaWVudC5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAoZG9tYWluTmFtZSwgc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnB1dChcIi92NC9kb21haW5zL1wiLmNvbmNhdChkb21haW5OYW1lLCBcIi9rZXlzL1wiKS5jb25jYXQoc2VsZWN0b3IsIFwiL2FjdGl2YXRlXCIpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcmVzLmJvZHkpLCB7IHN0YXR1czogcmVzLnN0YXR1cyB9KV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRG9tYWluS2V5c0NsaWVudC5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uIChkb21haW5OYW1lLCBzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QucHV0KFwiL3Y0L2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbk5hbWUsIFwiL2tleXMvXCIpLmNvbmNhdChzZWxlY3RvciwgXCIvZGVhY3RpdmF0ZVwiKSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgX19hc3NpZ24oX19hc3NpZ24oe30sIHJlcy5ib2R5KSwgeyBzdGF0dXM6IHJlcy5zdGF0dXMgfSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERvbWFpbktleXNDbGllbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZG9tYWluLCBzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJ3YxL2RraW0va2V5cycpLCB1bmRlZmluZWQsIHsgc2lnbmluZ19kb21haW46IGRvbWFpbiwgc2VsZWN0b3I6IHNlbGVjdG9yIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlcy5ib2R5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEb21haW5LZXlzQ2xpZW50LnByb3RvdHlwZS51cGRhdGVES0lNU2VsZWN0b3IgPSBmdW5jdGlvbiAoZG9tYWluLCBkYXRhKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMsIHJlcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7IHF1ZXJ5OiBcImRraW1fc2VsZWN0b3I9XCIuY29uY2F0KGRhdGEuZGtpbVNlbGVjdG9yKSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5yZXF1ZXN0LnB1dChcIi92My9kb21haW5zL1wiLmNvbmNhdChkb21haW4sIFwiL2RraW1fc2VsZWN0b3JcIiksIHt9LCBvcHRpb25zKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogKF9hID0gcmVzID09PSBudWxsIHx8IHJlcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzLmJvZHkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRG9tYWluS2V5c0NsaWVudC5wcm90b3R5cGUudXBkYXRlREtJTUF1dGhvcml0eSA9IGZ1bmN0aW9uIChkb21haW4sIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHsgcXVlcnk6IFwic2VsZj1cIi5jb25jYXQoZGF0YS5zZWxmKSB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnJlcXVlc3QucHV0KFwiL3YzL2RvbWFpbnMvXCIuY29uY2F0KGRvbWFpbiwgXCIvZGtpbV9hdXRob3JpdHlcIiksIHt9LCBvcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzOyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gcmVzLmJvZHk7IH0pXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBEb21haW5LZXlzQ2xpZW50O1xufShOYXZpZ2F0aW9uVGhydVBhZ2VzKSk7XG5leHBvcnQgZGVmYXVsdCBEb21haW5LZXlzQ2xpZW50O1xuIiwiaW1wb3J0IHsgX19hc3NpZ24gfSBmcm9tIFwidHNsaWJcIjtcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdC5qcyc7XG5pbXBvcnQgRG9tYWluc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc0NsaWVudC5qcyc7XG5pbXBvcnQgRXZlbnRDbGllbnQgZnJvbSAnLi9FdmVudHMuanMnO1xuaW1wb3J0IFN0YXRzQ2xpZW50IGZyb20gJy4vU3RhdHMvU3RhdHNDbGllbnQuanMnO1xuaW1wb3J0IFN1cHByZXNzaW9uQ2xpZW50IGZyb20gJy4vU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uc0NsaWVudC5qcyc7XG5pbXBvcnQgV2ViaG9va3NDbGllbnQgZnJvbSAnLi9XZWJob29rcy5qcyc7XG5pbXBvcnQgTWVzc2FnZXNDbGllbnQgZnJvbSAnLi9NZXNzYWdlcy5qcyc7XG5pbXBvcnQgUm91dGVzQ2xpZW50IGZyb20gJy4vUm91dGVzLmpzJztcbmltcG9ydCBWYWxpZGF0ZUNsaWVudCBmcm9tICcuL1ZhbGlkYXRpb25zL3ZhbGlkYXRlLmpzJztcbmltcG9ydCBJcHNDbGllbnQgZnJvbSAnLi9JUHMuanMnO1xuaW1wb3J0IElwUG9vbHNDbGllbnQgZnJvbSAnLi9JUFBvb2xzLmpzJztcbmltcG9ydCBNYWlsaW5nTGlzdHNDbGllbnQgZnJvbSAnLi9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzLmpzJztcbmltcG9ydCBNYWlsTGlzdHNNZW1iZXJzIGZyb20gJy4vTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycy5qcyc7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNDcmVkZW50aWFscy5qcyc7XG5pbXBvcnQgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGZyb20gJy4vVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uLmpzJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUZW1wbGF0ZXMuanMnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUYWdzLmpzJztcbmltcG9ydCBTdWJhY2NvdW50c0NsaWVudCBmcm9tICcuL1N1YmFjY291bnRzLmpzJztcbmltcG9ydCBTZWVkc0xpc3RzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL1NlZWRzTGlzdHMvU2VlZHNMaXN0c0NsaWVudC5qcyc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL2luYm94UGxhY2VtZW50cy5qcyc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQuanMnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvQXR0cmlidXRlc0NsaWVudC5qcyc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9GaWx0ZXJzQ2xpZW50LmpzJztcbmltcG9ydCBJUFJTaGFyaW5nQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQuanMnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzLmpzJztcbmltcG9ydCBNZXRyaWNzQ2xpZW50IGZyb20gJy4vTWV0cmljcy9NZXRyaWNzQ2xpZW50LmpzJztcbmltcG9ydCBEb21haW5UcmFja2luZ0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc1RyYWNraW5nLmpzJztcbmltcG9ydCBEb21haW5LZXlzQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zS2V5cy5qcyc7XG52YXIgTWFpbGd1bkNsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWlsZ3VuQ2xpZW50KG9wdGlvbnMsIGZvcm1EYXRhKSB7XG4gICAgICAgIHZhciBjb25maWcgPSBfX2Fzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgICAgIGlmICghY29uZmlnLnVybCkge1xuICAgICAgICAgICAgY29uZmlnLnVybCA9ICdodHRwczovL2FwaS5tYWlsZ3VuLm5ldCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25maWcudXNlcm5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwidXNlcm5hbWVcIiBpcyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uZmlnLmtleSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJrZXlcIiBpcyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcudXNlRmV0Y2ggJiYgY29uZmlnLnByb3h5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3h5IGNhbiBub3QgYmUgdXNlZCB3aXRoIGZldGNoIHByb3ZpZGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSBuZXcgUmVxdWVzdChjb25maWcsIGZvcm1EYXRhKTtcbiAgICAgICAgdmFyIG1haWxMaXN0c01lbWJlcnMgPSBuZXcgTWFpbExpc3RzTWVtYmVycyh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB2YXIgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQgPSBuZXcgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdmFyIGRvbWFpblRlbXBsYXRlc0NsaWVudCA9IG5ldyBEb21haW5UZW1wbGF0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdmFyIGRvbWFpblRhZ3NDbGllbnQgPSBuZXcgRG9tYWluVGFnc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB2YXIgZG9tYWluVHJhY2tpbmdDbGllbnQgPSBuZXcgRG9tYWluVHJhY2tpbmdDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdmFyIGRvbWFpbktleXNDbGllbnQgPSBuZXcgRG9tYWluS2V5c0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB2YXIgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50ID0gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB2YXIgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQgPSBuZXcgSVBSU2hhcmluZ0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB2YXIgc2VlZHNMaXN0c0F0dHJpYnV0ZXMgPSBuZXcgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvc2VlZGxpc3RzL2EnKTtcbiAgICAgICAgdmFyIHJlc3VsdHNBdHRyaWJ1dGVzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3Jlc3VsdHMvYScpO1xuICAgICAgICB2YXIgc2VlZHNMaXN0c0ZpbHRlcnNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvc2VlZGxpc3RzL19maWx0ZXJzJyk7XG4gICAgICAgIHZhciByZXN1bHRzRmlsdGVyc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9yZXN1bHRzL19maWx0ZXJzJyk7XG4gICAgICAgIHZhciBzZWVkc0xpc3RzQ2xpZW50ID0gbmV3IFNlZWRzTGlzdHNDbGllbnQodGhpcy5yZXF1ZXN0LCBzZWVkc0xpc3RzQXR0cmlidXRlcywgc2VlZHNMaXN0c0ZpbHRlcnNDbGllbnQpO1xuICAgICAgICB2YXIgaW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50KHRoaXMucmVxdWVzdCwgcmVzdWx0c0F0dHJpYnV0ZXNDbGllbnQsIHJlc3VsdHNGaWx0ZXJzQ2xpZW50LCBJbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudCk7XG4gICAgICAgIHZhciBpbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMuZG9tYWlucyA9IG5ldyBEb21haW5zQ2xpZW50KHRoaXMucmVxdWVzdCwgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQsIGRvbWFpblRlbXBsYXRlc0NsaWVudCwgZG9tYWluVGFnc0NsaWVudCwgZG9tYWluVHJhY2tpbmdDbGllbnQsIGRvbWFpbktleXNDbGllbnQpO1xuICAgICAgICB0aGlzLndlYmhvb2tzID0gbmV3IFdlYmhvb2tzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50Q2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5tZXRyaWNzID0gbmV3IE1ldHJpY3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5zdXBwcmVzc2lvbnMgPSBuZXcgU3VwcHJlc3Npb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IG5ldyBNZXNzYWdlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLnJvdXRlcyA9IG5ldyBSb3V0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICAgICAgdGhpcy5pcHMgPSBuZXcgSXBzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgICAgIHRoaXMuaXBfcG9vbHMgPSBuZXcgSXBQb29sc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLmxpc3RzID0gbmV3IE1haWxpbmdMaXN0c0NsaWVudCh0aGlzLnJlcXVlc3QsIG1haWxMaXN0c01lbWJlcnMpO1xuICAgICAgICB0aGlzLnZhbGlkYXRlID0gbmV3IFZhbGlkYXRlQ2xpZW50KHRoaXMucmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KTtcbiAgICAgICAgdGhpcy5zdWJhY2NvdW50cyA9IG5ldyBTdWJhY2NvdW50c0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgICAgICB0aGlzLmluYm94UGxhY2VtZW50cyA9IG5ldyBJbmJveFBsYWNlbWVudHNDbGllbnQodGhpcy5yZXF1ZXN0LCBzZWVkc0xpc3RzQ2xpZW50LCBpbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LCBpbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQpO1xuICAgIH1cbiAgICBNYWlsZ3VuQ2xpZW50LnByb3RvdHlwZS5zZXRTdWJhY2NvdW50ID0gZnVuY3Rpb24gKHN1YmFjY291bnRJZCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIChfYSA9IHRoaXMucmVxdWVzdCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNldFN1YmFjY291bnRIZWFkZXIoc3ViYWNjb3VudElkKTtcbiAgICB9O1xuICAgIE1haWxndW5DbGllbnQucHJvdG90eXBlLnJlc2V0U3ViYWNjb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoX2EgPSB0aGlzLnJlcXVlc3QpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZXNldFN1YmFjY291bnRIZWFkZXIoKTtcbiAgICB9O1xuICAgIHJldHVybiBNYWlsZ3VuQ2xpZW50O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE1haWxndW5DbGllbnQ7XG4iLCJpbXBvcnQgTWFpbGd1bkNsaWVudCBmcm9tICcuL0NsYXNzZXMvTWFpbGd1bkNsaWVudC5qcyc7XG52YXIgTWFpbGd1biA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWlsZ3VuKEZvcm1EYXRhKSB7XG4gICAgICAgIHRoaXMuZm9ybURhdGEgPSBGb3JtRGF0YTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1haWxndW4sIFwiZGVmYXVsdFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE1haWxndW4ucHJvdG90eXBlLmNsaWVudCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWFpbGd1bkNsaWVudChvcHRpb25zLCB0aGlzLmZvcm1EYXRhKTtcbiAgICB9O1xuICAgIHJldHVybiBNYWlsZ3VuO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IE1haWxndW47XG4iXSwibmFtZXMiOlsidGhpcyIsImlzRnVuY3Rpb24iLCJBeGlvc0Vycm9yIiwidXRpbHMiLCJwcm90b3R5cGUiLCJ0b0Zvcm1EYXRhIiwiZW5jb2RlIiwiVVJMU2VhcmNoUGFyYW1zIiwiRm9ybURhdGEiLCJCbG9iIiwicGxhdGZvcm0iLCJBeGlvc0hlYWRlcnMiLCJpc0NhbmNlbCIsIkNhbmNlbGVkRXJyb3IiLCJtZXJnZUNvbmZpZyIsIlJlYWRhYmxlU3RyZWFtIiwiZmV0Y2hBZGFwdGVyLmdldEZldGNoIiwiVkVSU0lPTiIsInZhbGlkYXRvcnMiLCJBeGlvcyIsInNwcmVhZCIsImlzQXhpb3NFcnJvciIsIkh0dHBTdGF0dXNDb2RlIiwiQ2FuY2VsVG9rZW4iLCJnbG9iYWwiLCJiYXNlNjQuZW5jb2RlIl0sIm1hcHBpbmdzIjoiOzs7SUFBQTtJQUNBO0FBQ0E7SUFDQTtJQUNBO0FBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7QUFDQTtJQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztJQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7SUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2hDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUk7SUFDN0MsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDO0lBQ2xHLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekYsQ0FBQztBQUNEO0lBQ08sSUFBSSxRQUFRLEdBQUcsV0FBVztJQUNqQyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFNBQVMsUUFBUSxDQUFDLENBQUMsRUFBRTtJQUNyRCxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzdELFlBQVksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixZQUFZLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLFNBQVM7SUFDVCxRQUFRLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLE1BQUs7SUFDTCxJQUFJLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0MsRUFBQztBQXlFRDtJQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtJQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtJQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7SUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDOUUsS0FBSyxDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0Q7SUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssVUFBVSxHQUFHLFFBQVEsR0FBRyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDck0sSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hLLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7SUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDdEUsUUFBUSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSTtJQUN0RCxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtJQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0lBQ2pFLGdCQUFnQjtJQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtJQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtJQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO0lBQ3pGLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFF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LENBQUM7O0FDckZELFFBQUMsT0FBTyxrQkFBa0IsWUFBWTtJQUN6QyxJQUFJLFNBQVMsT0FBTyxDQUFDLFFBQVEsRUFBRTtJQUMvQixRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUTtJQUNoQztJQUNBLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFO0lBQzlDLFFBQVEsR0FBRyxFQUFFLFlBQVksRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFO0lBQ3pDLFFBQVEsVUFBVSxFQUFFLEtBQUs7SUFDekIsUUFBUSxZQUFZLEVBQUU7SUFDdEIsS0FBSyxDQUFDO0lBQ04sSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFVLE9BQU8sRUFBRTtJQUNsRCxRQUFRLE9BQU8sSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDeEQsS0FBSztJQUNMLElBQUksT0FBTyxPQUFPO0lBQ2xCLENBQUMsRUFBRTs7Ozs7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzAsMSw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMjksMzAsMzEsMzIsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDAsNDEsNDIsNDMsNDQsNDUsNDYsNDcsNDgsNDksNTAsNTEsNTIsNTMsNTQsNTVdfQ==
