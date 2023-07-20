/*! mailgun.js v11.1.0 */
/*! mailgun.js v11.1.0 */
define(() => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/Classes/Domains/domain.ts":
/*!***************************************!*\
  !*** ./lib/Classes/Domains/domain.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/* eslint-disable camelcase */
var Domain = /** @class */function () {
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
}();
exports["default"] = Domain;

/***/ }),

/***/ "./lib/Classes/Domains/domainsClient.ts":
/*!**********************************************!*\
  !*** ./lib/Classes/Domains/domainsClient.ts ***!
  \**********************************************/
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
var Error_1 = __importDefault(__webpack_require__(/*! ../common/Error */ "./lib/Classes/common/Error.ts"));
var domain_1 = __importDefault(__webpack_require__(/*! ./domain */ "./lib/Classes/Domains/domain.ts"));
var DomainsClient = /** @class */function () {
  function DomainsClient(request, domainCredentialsClient, domainTemplatesClient, domainTagsClient, domainTracking, logger) {
    if (logger === void 0) {
      logger = console;
    }
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
        acc[prop] = value.toString() === 'true' ? 'true' : 'false';
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
        return new domain_1.default(item);
      });
    }
    return [];
  };
  DomainsClient.prototype._parseDomain = function (response) {
    return new domain_1.default(response.body.domain, response.body.receiving_dns_records, response.body.sending_dns_records);
  };
  DomainsClient.prototype.list = function (query) {
    var _this = this;
    return this.request.get('/v4/domains', query).then(function (res) {
      return _this.parseDomainList(res);
    });
  };
  DomainsClient.prototype.get = function (domain, query) {
    var _this = this;
    var _a, _b;
    var preparedQuery = query ? {
      'h:extended': (_a = query === null || query === void 0 ? void 0 : query.extended) !== null && _a !== void 0 ? _a : false,
      'h:with_dns': (_b = query === null || query === void 0 ? void 0 : query.with_dns) !== null && _b !== void 0 ? _b : true
    } : {};
    return this.request.get("/v4/domains/".concat(domain), preparedQuery).then(function (res) {
      return _this._parseDomain(res);
    });
  };
  DomainsClient.prototype.create = function (data) {
    var _this = this;
    var postObj = this._handleBoolValues(data);
    return this.request.postWithFD('/v4/domains', postObj).then(function (res) {
      return _this._parseDomain(res);
    });
  };
  DomainsClient.prototype.update = function (domain, data) {
    var _this = this;
    var putData = this._handleBoolValues(data);
    return this.request.putWithFD("/v4/domains/".concat(domain), putData).then(function (res) {
      return _this._parseDomain(res);
    });
  };
  DomainsClient.prototype.verify = function (domain) {
    var _this = this;
    return this.request.put("/v4/domains/".concat(domain, "/verify")).then(function (res) {
      return _this._parseDomain(res);
    });
  };
  DomainsClient.prototype.destroy = function (domain) {
    var _this = this;
    return this.request.delete("/v3/domains/".concat(domain)).then(function (res) {
      return _this._parseMessage(res);
    });
  };
  DomainsClient.prototype.getConnection = function (domain) {
    return this.request.get("/v3/domains/".concat(domain, "/connection")).then(function (res) {
      return res;
    }).then(function (res) {
      return res.body;
    });
  };
  DomainsClient.prototype.updateConnection = function (domain, data) {
    return this.request.put("/v3/domains/".concat(domain, "/connection"), data).then(function (res) {
      return res;
    }).then(function (res) {
      return res.body;
    });
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
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'ips')).then(function (response) {
      var _a;
      return (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.items;
    });
  };
  /**
  * @deprecated "domains.assignIp" method is deprecated, and will be removed in the future releases.
  */
  DomainsClient.prototype.assignIp = function (domain, ip) {
    this.logger.warn('"domains.assignIp" method is deprecated and will be removed in the future releases.');
    return this.request.postWithFD((0, url_join_1.default)('/v3/domains', domain, 'ips'), {
      ip: ip
    });
  };
  /**
  * @deprecated "domains.deleteIp" method is deprecated, and will be moved to the IpsClient.
  */
  DomainsClient.prototype.deleteIp = function (domain, ip) {
    this.logger.warn('"domains.deleteIp" method is deprecated and will be moved into the IpsClient in the future releases.');
    return this.request.delete((0, url_join_1.default)('/v3/domains', domain, 'ips', ip));
  };
  /**
  * @deprecated "domains.linkIpPool" method is deprecated, and will be removed
  * in the future releases.
  */
  DomainsClient.prototype.linkIpPool = function (domain, poolId) {
    this.logger.warn('"domains.linkIpPool" method is deprecated, and will be removed in the future releases.');
    return this.request.postWithFD((0, url_join_1.default)('/v3/domains', domain, 'ips'), {
      pool_id: poolId
    });
  };
  /**
  * @deprecated "domains.unlinkIpPoll" method is deprecated, and will be moved into the IpsClient
  * in the future releases.
  */
  DomainsClient.prototype.unlinkIpPoll = function (domain, replacement) {
    this.logger.warn('"domains.unlinkIpPoll" method is deprecated, and will be moved into the IpsClient in the future releases.');
    var searchParams = '';
    if (replacement.pool_id && replacement.ip) {
      throw Error_1.default.getUserDataError('Too much data for replacement', 'Please specify either pool_id or ip (not both)');
    } else if (replacement.pool_id) {
      searchParams = "?pool_id=".concat(replacement.pool_id);
    } else if (replacement.ip) {
      searchParams = "?ip=".concat(replacement.ip);
    }
    return this.request.delete((0, url_join_1.default)('/v3/domains', domain, 'ips', 'ip_pool', searchParams));
  };
  DomainsClient.prototype.updateDKIMAuthority = function (domain, data) {
    return this.request.put("/v3/domains/".concat(domain, "/dkim_authority"), {}, {
      query: "self=".concat(data.self)
    }).then(function (res) {
      return res;
    }).then(function (res) {
      return res.body;
    });
  };
  DomainsClient.prototype.updateDKIMSelector = function (domain, data) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var res;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4 /*yield*/, this.request.put("/v3/domains/".concat(domain, "/dkim_selector"), {}, {
              query: "dkim_selector=".concat(data.dkimSelector)
            })];
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
    return this.request.put("/v3/domains/".concat(domain, "/web_prefix"), {}, {
      query: "web_prefix=".concat(data.webPrefix)
    }).then(function (res) {
      return res;
    });
  };
  return DomainsClient;
}();
exports["default"] = DomainsClient;

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
  DomainTemplatesClient.prototype.listVersions = function (domain, templateName, query) {
    var _this = this;
    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/templates', templateName, '/versions'), query).then(function (res) {
      return _this.parseListTemplateVersions(res);
    });
  };
  DomainTemplatesClient.prototype.getVersion = function (domain, templateName, tag) {
    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag)).then(function (res) {
      return new DomainTemplateItem(res.body.template);
    });
  };
  DomainTemplatesClient.prototype.createVersion = function (domain, templateName, data) {
    var _this = this;
    return this.request.postWithFD((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName, '/versions'), data).then(function (res) {
      return _this.parseCreationVersionResponse(res);
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
  return DomainTemplatesClient;
}(NavigationThruPages_1.default);
exports["default"] = DomainTemplatesClient;

/***/ }),

/***/ "./lib/Classes/Domains/domainsTracking.ts":
/*!************************************************!*\
  !*** ./lib/Classes/Domains/domainsTracking.ts ***!
  \************************************************/
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
var DomainTrackingClient = /** @class */function () {
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
          case 0:
            return [4 /*yield*/, this.request.get("/v2/x509/".concat(domain, "/status"))];
          case 1:
            response = _a.sent();
            return [2 /*return*/, __assign(__assign({}, response.body), {
              responseStatusCode: response.status
            })];
        }
      });
    });
  };
  DomainTrackingClient.prototype.generate = function (domain) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.request.post("/v2/x509/".concat(domain))];
          case 1:
            response = _a.sent();
            return [2 /*return*/, __assign(__assign({}, response.body), {
              status: response.status
            })];
        }
      });
    });
  };
  DomainTrackingClient.prototype.regenerate = function (domain) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.request.put("/v2/x509/".concat(domain))];
          case 1:
            response = _a.sent();
            return [2 /*return*/, __assign(__assign({}, response.body), {
              status: response.status
            })];
        }
      });
    });
  };
  DomainTrackingClient.prototype.getTracking = function (domain) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.request.get((0, url_join_1.default)('/v3/domains', domain, 'tracking'))];
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
            return [4 /*yield*/, this.request.putWithFD((0, url_join_1.default)('/v3/domains', domain, 'tracking', type), preparedData)];
          case 1:
            response = _a.sent();
            return [2 /*return*/, this._parseTrackingUpdate(response)];
        }
      });
    });
  };
  return DomainTrackingClient;
}();
exports["default"] = DomainTrackingClient;

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

/***/ "./lib/Classes/InboxPlacements/AttributesClient.ts":
/*!*********************************************************!*\
  !*** ./lib/Classes/InboxPlacements/AttributesClient.ts ***!
  \*********************************************************/
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
var InboxPlacementsAttributesClient = /** @class */function () {
  function InboxPlacementsAttributesClient(request, path) {
    this.path = path;
    this.request = request;
  }
  InboxPlacementsAttributesClient.prototype.list = function () {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.request.get(this.path)];
          case 1:
            response = _a.sent();
            return [2 /*return*/, {
              items: response.body.items,
              status: response.status
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
          case 0:
            return [4 /*yield*/, this.request.get("".concat(this.path, "/").concat(attributeName))];
          case 1:
            response = _a.sent();
            return [2 /*return*/, __assign(__assign({}, response.body), {
              status: response.status
            })];
        }
      });
    });
  };
  return InboxPlacementsAttributesClient;
}();
exports["default"] = InboxPlacementsAttributesClient;

/***/ }),

/***/ "./lib/Classes/InboxPlacements/FiltersClient.ts":
/*!******************************************************!*\
  !*** ./lib/Classes/InboxPlacements/FiltersClient.ts ***!
  \******************************************************/
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
var InboxPlacementsFiltersClient = /** @class */function () {
  function InboxPlacementsFiltersClient(request, path) {
    this.request = request;
    this.path = path;
  }
  InboxPlacementsFiltersClient.prototype.list = function () {
    return __awaiter(this, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.request.get(this.path)];
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
}();
exports["default"] = InboxPlacementsFiltersClient;

/***/ }),

/***/ "./lib/Classes/InboxPlacements/Results/InboxPlacementsResultsClient.ts":
/*!*****************************************************************************!*\
  !*** ./lib/Classes/InboxPlacements/Results/InboxPlacementsResultsClient.ts ***!
  \*****************************************************************************/
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
var NavigationThruPages_1 = __importDefault(__webpack_require__(/*! ../../common/NavigationThruPages */ "./lib/Classes/common/NavigationThruPages.ts"));
var InboxPlacementsResultsClient = /** @class */function (_super) {
  __extends(InboxPlacementsResultsClient, _super);
  function InboxPlacementsResultsClient(request, attributes, filters, sharing, logger) {
    if (logger === void 0) {
      logger = console;
    }
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
      sharing_expires_at: new Date(data.sharing_expires_at)
    };
    if (data.Box) {
      box = __assign(__assign({}, data.Box), {
        created_at: new Date(data.Box.created_at),
        updated_at: new Date(data.Box.updated_at),
        last_result_at: new Date(data.Box.last_result_at)
      });
      delete box.ID;
    }
    var inboxPlacementsResult = __assign(__assign(__assign(__assign({}, data), {
      Box: box
    }), handledSeedListDates), {
      id: data.Id
    });
    delete inboxPlacementsResult.ID;
    return inboxPlacementsResult;
  };
  InboxPlacementsResultsClient.prototype.parseList = function (response) {
    var _this = this;
    var data = {};
    data.items = response.body.items.map(function (item) {
      return _this.prepareInboxPlacementsResult(item);
    });
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
          case 0:
            return [4 /*yield*/, this.request.get("/v4/inbox/results/".concat(id))];
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
          case 0:
            return [4 /*yield*/, this.request.delete("/v4/inbox/results/".concat(id))];
          case 1:
            response = _a.sent();
            return [2 /*return*/, __assign({
              status: response.status
            }, response.body)];
        }
      });
    });
  };
  InboxPlacementsResultsClient.prototype.getResultByShareId = function (shareId) {
    return __awaiter(this, void 0, void 0, function () {
      var response, inboxPlacementResult;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.request.get("/v4/inbox/sharing/public/".concat(shareId))];
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
}(NavigationThruPages_1.default);
exports["default"] = InboxPlacementsResultsClient;

/***/ }),

/***/ "./lib/Classes/InboxPlacements/Results/InboxPlacementsResultsSharingClient.ts":
/*!************************************************************************************!*\
  !*** ./lib/Classes/InboxPlacements/Results/InboxPlacementsResultsSharingClient.ts ***!
  \************************************************************************************/
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
var IPRSharingClient = /** @class */function () {
  function IPRSharingClient(request) {
    this.request = request;
  }
  IPRSharingClient.prototype.prepareInboxPlacementsResultSharing = function (data) {
    var handledSeedListDates = {
      expires_at: new Date(data.expires_at)
    };
    var result = __assign(__assign({}, data), handledSeedListDates);
    return result;
  };
  IPRSharingClient.prototype.get = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      var response, result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.request.get("/v4/inbox/sharing/".concat(id))];
          case 1:
            response = _a.sent();
            result = this.prepareInboxPlacementsResultSharing(response.body.sharing);
            return [2 /*return*/, __assign({
              status: response.status
            }, result)];
        }
      });
    });
  };
  IPRSharingClient.prototype.update = function (id, data) {
    return __awaiter(this, void 0, void 0, function () {
      var response, result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.request.put("/v4/inbox/sharing/".concat(id), {}, {
              query: "enabled=".concat(data.enabled)
            })];
          case 1:
            response = _a.sent();
            result = this.prepareInboxPlacementsResultSharing(response.body.sharing);
            return [2 /*return*/, __assign(__assign({}, result), {
              status: response.status
            })];
        }
      });
    });
  };
  return IPRSharingClient;
}();
exports["default"] = IPRSharingClient;

/***/ }),

/***/ "./lib/Classes/InboxPlacements/SeedsLists/SeedsListsClient.ts":
/*!********************************************************************!*\
  !*** ./lib/Classes/InboxPlacements/SeedsLists/SeedsListsClient.ts ***!
  \********************************************************************/
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
var NavigationThruPages_1 = __importDefault(__webpack_require__(/*! ../../common/NavigationThruPages */ "./lib/Classes/common/NavigationThruPages.ts"));
var SeedsListsClient = /** @class */function (_super) {
  __extends(SeedsListsClient, _super);
  function SeedsListsClient(request, attributes, filters, logger) {
    if (logger === void 0) {
      logger = console;
    }
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
    result = __assign(__assign({}, seedList), {
      status: data.status
    });
    return result;
  };
  SeedsListsClient.prototype.prepareSeedList = function (data) {
    var seeds;
    var handledSeedListDates = {
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
      last_result_at: new Date(data.last_result_at)
    };
    if (data.Seeds) {
      seeds = data.Seeds.map(function (seedItem) {
        var seed = {};
        var handledSeedDates = {
          created_at: new Date(seedItem.created_at),
          updated_at: new Date(seedItem.updated_at),
          max_email_count_hit_at: new Date(seedItem.max_email_count_hit_at),
          last_sent_to_at: new Date(seedItem.last_sent_to_at),
          last_delivered_at: new Date(seedItem.last_delivered_at)
        };
        seed = __assign(__assign({}, seedItem), handledSeedDates);
        return seed;
      });
    } else {
      seeds = null;
    }
    var seedList = __assign(__assign(__assign({}, data), {
      Seeds: seeds
    }), handledSeedListDates);
    delete seedList.Id;
    return seedList;
  };
  SeedsListsClient.prototype.parseList = function (response) {
    var _this = this;
    var _a;
    var data = {
      items: []
    };
    data.items = (_a = response.body.items) === null || _a === void 0 ? void 0 : _a.map(function (item) {
      return _this.prepareSeedList(item);
    });
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
            return [2 /*return*/, __assign(__assign({}, this.parseList(response)), {
              status: 200
            })];
        }
      });
    });
  };
  SeedsListsClient.prototype.get = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      var response, updatedSeedsList;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.request.get("/v4/inbox/seedlists/".concat(id))];
          case 1:
            response = _a.sent();
            updatedSeedsList = this.prepareSeedList(response.body.seedlist);
            return [2 /*return*/, __assign(__assign({}, updatedSeedsList), {
              status: response.status
            })];
        }
      });
    });
  };
  SeedsListsClient.prototype.create = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.request.postWithFD('/v4/inbox/seedlists', data)];
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
          case 0:
            return [4 /*yield*/, this.request.put("/v4/inbox/seedlists/".concat(id), data)];
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
}(NavigationThruPages_1.default);
exports["default"] = SeedsListsClient;

/***/ }),

/***/ "./lib/Classes/InboxPlacements/inboxPlacements.ts":
/*!********************************************************!*\
  !*** ./lib/Classes/InboxPlacements/inboxPlacements.ts ***!
  \********************************************************/
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
var InboxPlacementsClient = /** @class */function () {
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
          case 0:
            return [4 /*yield*/, this.request.post('/v4/inbox/tests', data)];
          case 1:
            response = _a.sent();
            return [2 /*return*/, __assign(__assign({}, response.body), {
              status: response.status
            })];
        }
      });
    });
  };
  return InboxPlacementsClient;
}();
exports["default"] = InboxPlacementsClient;

/***/ }),

/***/ "./lib/Classes/InboxPlacements/providers/InboxPlacementsProviders.ts":
/*!***************************************************************************!*\
  !*** ./lib/Classes/InboxPlacements/providers/InboxPlacementsProviders.ts ***!
  \***************************************************************************/
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
var InboxPlacementsProvidersClient = /** @class */function () {
  function InboxPlacementsProvidersClient(request) {
    this.path = '/v4/inbox/providers';
    this.request = request;
  }
  InboxPlacementsProvidersClient.prototype.parseList = function (response) {
    var data = {};
    data.items = response.body.items.map(function (item) {
      var handledProviderDates = {
        created_at: new Date(item.created_at),
        updated_at: new Date(item.updated_at)
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
          case 0:
            return [4 /*yield*/, this.request.get(this.path)];
          case 1:
            response = _a.sent();
            return [2 /*return*/, this.parseList(response)];
        }
      });
    });
  };
  return InboxPlacementsProvidersClient;
}();
exports["default"] = InboxPlacementsProvidersClient;

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
var domainsClient_1 = __importDefault(__webpack_require__(/*! ./Domains/domainsClient */ "./lib/Classes/Domains/domainsClient.ts"));
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
var Subaccounts_1 = __importDefault(__webpack_require__(/*! ./Subaccounts */ "./lib/Classes/Subaccounts.ts"));
var SeedsListsClient_1 = __importDefault(__webpack_require__(/*! ./InboxPlacements/SeedsLists/SeedsListsClient */ "./lib/Classes/InboxPlacements/SeedsLists/SeedsListsClient.ts"));
var inboxPlacements_1 = __importDefault(__webpack_require__(/*! ./InboxPlacements/inboxPlacements */ "./lib/Classes/InboxPlacements/inboxPlacements.ts"));
var InboxPlacementsResultsClient_1 = __importDefault(__webpack_require__(/*! ./InboxPlacements/Results/InboxPlacementsResultsClient */ "./lib/Classes/InboxPlacements/Results/InboxPlacementsResultsClient.ts"));
var AttributesClient_1 = __importDefault(__webpack_require__(/*! ./InboxPlacements/AttributesClient */ "./lib/Classes/InboxPlacements/AttributesClient.ts"));
var FiltersClient_1 = __importDefault(__webpack_require__(/*! ./InboxPlacements/FiltersClient */ "./lib/Classes/InboxPlacements/FiltersClient.ts"));
var InboxPlacementsResultsSharingClient_1 = __importDefault(__webpack_require__(/*! ./InboxPlacements/Results/InboxPlacementsResultsSharingClient */ "./lib/Classes/InboxPlacements/Results/InboxPlacementsResultsSharingClient.ts"));
var InboxPlacementsProviders_1 = __importDefault(__webpack_require__(/*! ./InboxPlacements/providers/InboxPlacementsProviders */ "./lib/Classes/InboxPlacements/providers/InboxPlacementsProviders.ts"));
var MetricsClient_1 = __importDefault(__webpack_require__(/*! ./Metrics/MetricsClient */ "./lib/Classes/Metrics/MetricsClient.ts"));
var domainsTracking_1 = __importDefault(__webpack_require__(/*! ./Domains/domainsTracking */ "./lib/Classes/Domains/domainsTracking.ts"));
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
    var domainTrackingClient = new domainsTracking_1.default(this.request);
    var multipleValidationClient = new multipleValidation_1.default(this.request);
    var InboxPlacementsResultsSharingClient = new InboxPlacementsResultsSharingClient_1.default(this.request);
    var seedsListsAttributes = new AttributesClient_1.default(this.request, '/v4/inbox/seedlists/a');
    var resultsAttributesClient = new AttributesClient_1.default(this.request, '/v4/inbox/results/a');
    var seedsListsFiltersClient = new FiltersClient_1.default(this.request, '/v4/inbox/seedlists/_filters');
    var resultsFiltersClient = new FiltersClient_1.default(this.request, '/v4/inbox/results/_filters');
    var seedsListsClient = new SeedsListsClient_1.default(this.request, seedsListsAttributes, seedsListsFiltersClient);
    var inboxPlacementsResultsClient = new InboxPlacementsResultsClient_1.default(this.request, resultsAttributesClient, resultsFiltersClient, InboxPlacementsResultsSharingClient);
    var inboxPlacementsProvidersClient = new InboxPlacementsProviders_1.default(this.request);
    this.domains = new domainsClient_1.default(this.request, domainCredentialsClient, domainTemplatesClient, domainTagsClient, domainTrackingClient);
    this.webhooks = new Webhooks_1.default(this.request);
    this.events = new Events_1.default(this.request);
    this.stats = new StatsClient_1.default(this.request);
    this.metrics = new MetricsClient_1.default(this.request);
    this.suppressions = new SuppressionsClient_1.default(this.request);
    this.messages = new Messages_1.default(this.request);
    this.routes = new Routes_1.default(this.request);
    this.ips = new IPs_1.default(this.request);
    this.ip_pools = new IPPools_1.default(this.request);
    this.lists = new mailingLists_1.default(this.request, mailListsMembers);
    this.validate = new validate_1.default(this.request, multipleValidationClient);
    this.subaccounts = new Subaccounts_1.default(this.request);
    this.inboxPlacements = new inboxPlacements_1.default(this.request, seedsListsClient, inboxPlacementsResultsClient, inboxPlacementsProvidersClient);
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
var MailingListsClient = /** @class */function (_super) {
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
      validationResult: __assign(__assign({}, data), {
        created_at: new Date(data.created_at * 1000) // add millisecond to Unix timestamp
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
    return this.request.get("".concat(this.baseRoute, "/").concat(mailListAddress)).then(function (response) {
      return response.body.list;
    });
  };
  MailingListsClient.prototype.create = function (data) {
    return this.request.postWithFD(this.baseRoute, data).then(function (response) {
      return response.body.list;
    });
  };
  MailingListsClient.prototype.update = function (mailListAddress, data) {
    return this.request.putWithFD("".concat(this.baseRoute, "/").concat(mailListAddress), data).then(function (response) {
      return response.body.list;
    });
  };
  MailingListsClient.prototype.destroy = function (mailListAddress) {
    return this.request.delete("".concat(this.baseRoute, "/").concat(mailListAddress)).then(function (response) {
      return response.body;
    });
  };
  MailingListsClient.prototype.validate = function (mailListAddress) {
    return this.request.post("".concat(this.baseRoute, "/").concat(mailListAddress, "/validate"), {}).then(function (response) {
      return __assign({
        status: response.status
      }, response.body);
    });
  };
  MailingListsClient.prototype.validationResult = function (mailListAddress) {
    var _this = this;
    return this.request.get("".concat(this.baseRoute, "/").concat(mailListAddress, "/validate")).then(function (response) {
      return _this.parseValidationResult(response.status, response.body);
    });
  };
  MailingListsClient.prototype.cancelValidation = function (mailListAddress) {
    return this.request.delete("".concat(this.baseRoute, "/").concat(mailListAddress, "/validate")).then(function (response) {
      return {
        status: response.status,
        message: response.body.message
      };
    });
  };
  return MailingListsClient;
}(NavigationThruPages_1.default);
exports["default"] = MailingListsClient;

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
      throw Error_1.default.getUserDataError('Message data object can not be empty', 'Message data object can not be empty');
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

/***/ "./lib/Classes/Metrics/MetricsClient.ts":
/*!**********************************************!*\
  !*** ./lib/Classes/Metrics/MetricsClient.ts ***!
  \**********************************************/
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
var MetricsClient = /** @class */function () {
  function MetricsClient(request, logger) {
    if (logger === void 0) {
      logger = console;
    }
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
    var result = __assign(__assign({}, query), {
      start: startDate,
      end: endDate
    });
    return result;
  };
  MetricsClient.prototype.handleResponse = function (response) {
    var resBody = response.body;
    var startDate = Date.parse(resBody.start) ? new Date(resBody.start) : null;
    var endDate = Date.parse(resBody.end) ? new Date(resBody.end) : null;
    var result = __assign(__assign({}, resBody), {
      status: response.status,
      start: startDate,
      end: endDate
    });
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
}();
exports["default"] = MetricsClient;

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
    this.logger.warn("Date:\"".concat(inputDate, "\" was auto-converted to UTC time zone.\nValue \"").concat(inputDate.toUTCString(), "\" will be used for request.\nConsider using string type for property \"").concat(key, "\" to avoid auto-converting"));
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

/***/ "./lib/Classes/Subaccounts.ts":
/*!************************************!*\
  !*** ./lib/Classes/Subaccounts.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var SubaccountsClient = /** @class */function () {
  function SubaccountsClient(request) {
    this.request = request;
  }
  SubaccountsClient.prototype.list = function (query) {
    return this.request.get('/v5/accounts/subaccounts', query).then(function (res) {
      return res.body;
    });
  };
  SubaccountsClient.prototype.get = function (id) {
    return this.request.get("/v5/accounts/subaccounts/".concat(id)).then(function (res) {
      return res.body;
    });
  };
  SubaccountsClient.prototype.create = function (name) {
    return this.request.postWithFD('/v5/accounts/subaccounts', {
      name: name
    }).then(function (res) {
      return res.body;
    });
  };
  SubaccountsClient.prototype.enable = function (id) {
    return this.request.post("/v5/accounts/subaccounts/".concat(id, "/enable")).then(function (res) {
      return res.body;
    });
  };
  SubaccountsClient.prototype.disable = function (id) {
    return this.request.post("/v5/accounts/subaccounts/".concat(id, "/disable")).then(function (res) {
      return res.body;
    });
  };
  SubaccountsClient.SUBACCOUNT_HEADER = 'X-Mailgun-On-Behalf-Of';
  return SubaccountsClient;
}();
exports["default"] = SubaccountsClient;

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
    _this.models = {
      bounces: Bounce_1.default,
      complaints: Complaint_1.default,
      unsubscribes: Unsubscribe_1.default,
      whitelists: WhiteList_1.default
    };
    return _this;
  }
  SuppressionClient.prototype.parseList = function (response, Model) {
    var _a;
    var data = {};
    data.items = ((_a = response.body.items) === null || _a === void 0 ? void 0 : _a.map(function (item) {
      return new Model(item);
    })) || [];
    data.pages = this.parsePageLinks(response, '?', 'address');
    data.status = response.status;
    return data;
  };
  SuppressionClient.prototype._parseItem = function (data, Model) {
    return new Model(data);
  };
  SuppressionClient.prototype.createWhiteList = function (domain, data, isDataArray) {
    if (isDataArray) {
      throw Error_1.default.getUserDataError('Data property should be an object', 'Whitelist\'s creation process does not support multiple creations. Data property should be an object');
    }
    return this.request.postWithFD((0, url_join_1.default)('v3', domain, 'whitelists'), data).then(this.prepareResponse);
  };
  SuppressionClient.prototype.createUnsubscribe = function (domain, data) {
    if (Array.isArray(data)) {
      // User provided an array
      var isContainsTag = data.some(function (unsubscribe) {
        return unsubscribe.tag;
      });
      if (isContainsTag) {
        throw Error_1.default.getUserDataError('Tag property should not be used for creating multiple unsubscribes.', 'Tag property can be used only if one unsubscribe provided as second argument of create method. Please use tags instead.');
      }
      return this.request.post((0, url_join_1.default)('v3', domain, 'unsubscribes'), JSON.stringify(data), createOptions).then(this.prepareResponse);
    }
    if (data === null || data === void 0 ? void 0 : data.tags) {
      throw Error_1.default.getUserDataError('Tags property should not be used for creating one unsubscribe.', 'Tags property can be used if you provides an array of unsubscribes as second argument of create method. Please use tag instead');
    }
    if (Array.isArray(data.tag)) {
      throw Error_1.default.getUserDataError('Tag property can not be an array', 'Please use array of unsubscribes as second argument of create method to be able to provide few tags');
    }
    /* We need Form Data for unsubscribes if we want to support the "tag" property */
    return this.request.postWithFD((0, url_join_1.default)('v3', domain, 'unsubscribes'), data).then(this.prepareResponse);
  };
  SuppressionClient.prototype.getModel = function (type) {
    if (type in this.models) {
      return this.models[type];
    }
    throw Error_1.default.getUserDataError('Unknown type value', 'Type may be only one of [bounces, complaints, unsubscribes, whitelists]');
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
        return [2 /*return*/, this.requestListWithPages((0, url_join_1.default)('v3', domain, type), query, model)];
      });
    });
  };
  SuppressionClient.prototype.get = function (domain, type, address) {
    var _this = this;
    var model = this.getModel(type);
    return this.request.get((0, url_join_1.default)('v3', domain, type, encodeURIComponent(address))).then(function (response) {
      return _this._parseItem(response.body, model);
    });
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
    } else {
      postData = __spreadArray([], data, true);
    }
    return this.request.post((0, url_join_1.default)('v3', domain, type), JSON.stringify(postData), createOptions).then(this.prepareResponse);
  };
  SuppressionClient.prototype.destroy = function (domain, type, address) {
    this.getModel(type);
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
var AttachmentsHandler_1 = __importDefault(__webpack_require__(/*! ../common/AttachmentsHandler */ "./lib/Classes/common/AttachmentsHandler.ts"));
var Error_1 = __importDefault(__webpack_require__(/*! ../common/Error */ "./lib/Classes/common/Error.ts"));
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
    _this.attachmentsHandler = new AttachmentsHandler_1.default();
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
  MultipleValidationClient.prototype.convertToExpectedShape = function (data) {
    var multipleValidationData;
    if (this.attachmentsHandler.isBuffer(data.file)) {
      multipleValidationData = {
        multipleValidationFile: data.file
      };
    } else if (typeof data.file === 'string') {
      multipleValidationData = {
        multipleValidationFile: {
          data: data.file
        }
      };
    } else if (this.attachmentsHandler.isStream(data.file)) {
      multipleValidationData = {
        multipleValidationFile: data.file
      };
    } else {
      multipleValidationData = {
        multipleValidationFile: data.file
      };
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
              throw Error_1.default.getUserDataError('"file" property expected.', 'Make sure second argument has "file" property.');
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
exports.Webhook = void 0;
var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));
var Webhook = /** @class */function () {
  function Webhook(id, url, urls) {
    this.id = id;
    this.url = url;
    this.urls = urls;
  }
  return Webhook;
}();
exports.Webhook = Webhook;
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
      var urls = webhookResponse === null || webhookResponse === void 0 ? void 0 : webhookResponse.urls;
      if (!url) {
        url = urls && urls.length ? urls[0] : undefined;
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
  WebhooksClient.prototype.update = function (domain, id, urlValues) {
    return this.request.putWithFD((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id), {
      url: urlValues
    }).then(this._parseWebhookWithID(id));
  };
  WebhooksClient.prototype.destroy = function (domain, id) {
    return this.request.delete((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id)).then(this._parseWebhookWithID(id));
  };
  return WebhooksClient;
}();
exports["default"] = WebhooksClient;

/***/ }),

/***/ "./lib/Classes/common/AttachmentsHandler.ts":
/*!**************************************************!*\
  !*** ./lib/Classes/common/AttachmentsHandler.ts ***!
  \**************************************************/
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
var Error_1 = __importDefault(__webpack_require__(/*! ./Error */ "./lib/Classes/common/Error.ts"));
var BlobFromStream = /** @class */function () {
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
}();
var AttachmentsHandler = /** @class */function () {
  function AttachmentsHandler() {}
  AttachmentsHandler.prototype.getAttachmentOptions = function (item) {
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
  AttachmentsHandler.prototype.getFileInfo = function (file) {
    var filename = file.name,
      contentType = file.type,
      knownLength = file.size;
    return this.getAttachmentOptions({
      filename: filename,
      contentType: contentType,
      knownLength: knownLength
    });
  };
  AttachmentsHandler.prototype.getCustomFileInfo = function (file) {
    var filename = file.filename,
      contentType = file.contentType,
      knownLength = file.knownLength;
    return this.getAttachmentOptions({
      filename: filename,
      contentType: contentType,
      knownLength: knownLength
    });
  };
  AttachmentsHandler.prototype.getBufferInfo = function (buffer) {
    var knownLength = buffer.byteLength;
    return this.getAttachmentOptions({
      filename: 'file',
      contentType: '',
      knownLength: knownLength
    });
  };
  AttachmentsHandler.prototype.isStream = function (data) {
    return typeof data === 'object' && typeof data.pipe === 'function';
  };
  AttachmentsHandler.prototype.isCustomFile = function (obj) {
    return typeof obj === 'object' && !!obj.data;
  };
  AttachmentsHandler.prototype.isBrowserFile = function (obj) {
    return typeof obj === 'object' && (!!obj.name || typeof Blob !== 'undefined' && obj instanceof Blob);
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
    } else if (isCustomFile) {
      result = userProvidedValue.data;
    } else {
      throw Error_1.default.getUserDataError("Unknown attachment type ".concat(typeof userProvidedValue), "The \"attachment\" property expects either Buffer, Blob, or String.\n          Also, It is possible to provide an object that has the property \"data\" with a value that is equal to one of the types counted before.\n          Additionally, you may use an array to send more than one attachment.");
    }
    return result;
  };
  AttachmentsHandler.prototype.getBlobFromStream = function (stream, size) {
    return new BlobFromStream(stream, size);
  };
  return AttachmentsHandler;
}();
exports["default"] = AttachmentsHandler;

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
}(Error);
exports["default"] = APIError;

/***/ }),

/***/ "./lib/Classes/common/FormDataBuilder.ts":
/*!***********************************************!*\
  !*** ./lib/Classes/common/FormDataBuilder.ts ***!
  \***********************************************/
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
var Error_1 = __importDefault(__webpack_require__(/*! ./Error */ "./lib/Classes/common/Error.ts"));
var AttachmentsHandler_1 = __importDefault(__webpack_require__(/*! ./AttachmentsHandler */ "./lib/Classes/common/AttachmentsHandler.ts"));
var FormDataBuilder = /** @class */function () {
  function FormDataBuilder(FormDataConstructor) {
    this.FormDataConstructor = FormDataConstructor;
    this.fileKeys = ['attachment', 'inline', 'multipleValidationFile'];
    this.attachmentsHandler = new AttachmentsHandler_1.default();
  }
  FormDataBuilder.prototype.createFormData = function (data) {
    var _this = this;
    if (!data) {
      throw new Error('Please provide data object');
    }
    var formData = Object.keys(data).filter(function (key) {
      return data[key];
    }).reduce(function (formDataAcc, key) {
      if (_this.fileKeys.includes(key)) {
        var attachmentValue = data[key];
        if (_this.isMessageAttachment(attachmentValue)) {
          _this.addFilesToFD(key, attachmentValue, formDataAcc);
          return formDataAcc;
        }
        throw Error_1.default.getUserDataError("Unknown value ".concat(data[key], " with type ").concat(typeof data[key], " for property \"").concat(key, "\""), "The key \"".concat(key, "\" should have type of Buffer, Stream, File, or String "));
      }
      if (key === 'message') {
        // mime message
        var messageValue = data[key];
        if (!messageValue || !_this.isMIME(messageValue)) {
          throw Error_1.default.getUserDataError("Unknown data type for \"".concat(key, "\" property"), 'The mime data should have type of Buffer, String or Blob');
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
    if (typeof data === 'string') {
      // if string only two parameters should be used.
      formDataInstance.append(key, data);
      return;
    }
    if (this.isFormDataPackage(formDataInstance)) {
      // form-data package is used
      var nodeFormData = formDataInstance;
      nodeFormData.append(key, data, {
        filename: 'MimeMessage'
      });
      return;
    }
    if (typeof Blob !== undefined) {
      // either node > 18 or browser
      var browserFormData = formDataInstance; // Browser compliant FormData
      if (data instanceof Blob) {
        browserFormData.append(key, data, 'MimeMessage');
        return;
      }
      if (this.attachmentsHandler.isBuffer(data)) {
        // node environment
        var blobInstance = new Blob([data]);
        browserFormData.append(key, blobInstance, 'MimeMessage');
      }
    }
  };
  FormDataBuilder.prototype.isMIME = function (data) {
    return typeof data === 'string' || typeof Blob !== 'undefined' && data instanceof Blob || this.attachmentsHandler.isBuffer(data) || typeof ReadableStream !== 'undefined' && data instanceof ReadableStream;
  };
  FormDataBuilder.prototype.isFormDataPackage = function (obj) {
    return typeof obj === 'object' && obj !== null && typeof obj.getHeaders === 'function';
  };
  FormDataBuilder.prototype.isMessageAttachment = function (value) {
    var _this = this;
    return this.attachmentsHandler.isCustomFile(value) || typeof value === 'string' || typeof File !== 'undefined' && value instanceof File || typeof Blob !== 'undefined' && value instanceof Blob || this.attachmentsHandler.isBuffer(value) || this.attachmentsHandler.isStream(value) || Array.isArray(value) && value.every(function (item) {
      return _this.attachmentsHandler.isCustomFile(item) || typeof File !== 'undefined' && item instanceof File || typeof Blob !== 'undefined' && value instanceof Blob || _this.attachmentsHandler.isBuffer(item) || _this.attachmentsHandler.isStream(item);
    });
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
      if (typeof Blob !== undefined) {
        // either node > 18 or browser
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
    } else {
      appendFileToFD(propertyName, value, formDataInstance);
    }
  };
  FormDataBuilder.prototype.addCommonPropertyToFD = function (key, value, formDataAcc) {
    var _this = this;
    var addValueBasedOnFD = function (fdKey, fdValue) {
      if (_this.isFormDataPackage(formDataAcc)) {
        if (typeof fdValue === 'object') {
          // eslint-disable-next-line no-console
          console.warn('The received value is an object. \n' + '"JSON.Stringify" will be used to avoid TypeError \n' + 'To remove this warning: \n' + 'Consider switching to built-in FormData or converting the value on your own.\n');
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
      throw Error_1.default.getUserDataError('Unknown value type for Form Data. String or Blob expected', 'Browser compliant FormData allows only string or Blob values for properties that are not attachments.');
    };
    if (Array.isArray(value)) {
      value.forEach(function (item) {
        addValueBasedOnFD(key, item);
      });
    } else if (value != null) {
      addValueBasedOnFD(key, value);
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
var axios_1 = __importStar(__webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs"));
var Error_1 = __importDefault(__webpack_require__(/*! ./Error */ "./lib/Classes/common/Error.ts"));
var FormDataBuilder_1 = __importDefault(__webpack_require__(/*! ./FormDataBuilder */ "./lib/Classes/common/FormDataBuilder.ts"));
var Subaccounts_1 = __importDefault(__webpack_require__(/*! ../Subaccounts */ "./lib/Classes/Subaccounts.ts"));
var Request = /** @class */function () {
  function Request(options, formData) {
    this.username = options.username;
    this.key = options.key;
    this.url = options.url;
    this.timeout = options.timeout;
    this.headers = this.makeHeadersFromObject(options.headers);
    this.formDataBuilder = new FormDataBuilder_1.default(formData);
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
            urlValue = (0, url_join_1.default)(this.url, url);
            _d.label = 1;
          case 1:
            _d.trys.push([1, 3,, 4]);
            return [4 /*yield*/, axios_1.default.request(__assign(__assign({
              method: method.toLocaleUpperCase(),
              timeout: this.timeout,
              url: urlValue,
              headers: requestHeaders
            }, params), {
              maxBodyLength: this.maxBodyLength,
              proxy: this.proxy
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
  Request.prototype.joinAndTransformHeaders = function (onCallOptions) {
    var requestHeaders = new axios_1.AxiosHeaders();
    var basic = base64.encode("".concat(this.username, ":").concat(this.key));
    requestHeaders.setAuthorization("Basic ".concat(basic));
    requestHeaders.set(this.headers);
    var receivedOnCallHeaders = onCallOptions && onCallOptions.headers;
    var onCallHeaders = this.makeHeadersFromObject(receivedOnCallHeaders);
    requestHeaders.set(onCallHeaders);
    return requestHeaders;
  };
  Request.prototype.makeHeadersFromObject = function (headersObject) {
    if (headersObject === void 0) {
      headersObject = {};
    }
    var requestHeaders = new axios_1.AxiosHeaders();
    requestHeaders = Object.entries(headersObject).reduce(function (headersAccumulator, currentPair) {
      var key = currentPair[0],
        value = currentPair[1];
      headersAccumulator.set(key, value);
      return headersAccumulator;
    }, requestHeaders);
    return requestHeaders;
  };
  Request.prototype.setSubaccountHeader = function (subaccountId) {
    var _a;
    var headers = this.makeHeadersFromObject(__assign(__assign({}, this.headers), (_a = {}, _a[Subaccounts_1.default.SUBACCOUNT_HEADER] = subaccountId, _a)));
    this.headers.set(headers);
  };
  Request.prototype.resetSubaccountHeader = function () {
    this.headers.delete(Subaccounts_1.default.SUBACCOUNT_HEADER);
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

/***/ "./lib/Interfaces/Domains/DomainTracking.ts":
/*!**************************************************!*\
  !*** ./lib/Interfaces/Domains/DomainTracking.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Domains/DomainsClient.ts":
/*!*************************************************!*\
  !*** ./lib/Interfaces/Domains/DomainsClient.ts ***!
  \*************************************************/
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
__exportStar(__webpack_require__(/*! ./DomainsClient */ "./lib/Interfaces/Domains/DomainsClient.ts"), exports);
__exportStar(__webpack_require__(/*! ./DomainTracking */ "./lib/Interfaces/Domains/DomainTracking.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/EventClient/IEventClient.ts":
/*!****************************************************!*\
  !*** ./lib/Interfaces/EventClient/IEventClient.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/* eslint-disable camelcase */
Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/EventClient/index.ts":
/*!*********************************************!*\
  !*** ./lib/Interfaces/EventClient/index.ts ***!
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
__exportStar(__webpack_require__(/*! ./IEventClient */ "./lib/Interfaces/EventClient/IEventClient.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/IPPools/IIPPoolsClient.ts":
/*!**************************************************!*\
  !*** ./lib/Interfaces/IPPools/IIPPoolsClient.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/IPPools/index.ts":
/*!*****************************************!*\
  !*** ./lib/Interfaces/IPPools/index.ts ***!
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
__exportStar(__webpack_require__(/*! ./IIPPoolsClient */ "./lib/Interfaces/IPPools/IIPPoolsClient.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/IPs/IIPsClient.ts":
/*!******************************************!*\
  !*** ./lib/Interfaces/IPs/IIPsClient.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/IPs/index.ts":
/*!*************************************!*\
  !*** ./lib/Interfaces/IPs/index.ts ***!
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
__exportStar(__webpack_require__(/*! ./IIPsClient */ "./lib/Interfaces/IPs/IIPsClient.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/InboxPlacements/AttributesClient.ts":
/*!************************************************************!*\
  !*** ./lib/Interfaces/InboxPlacements/AttributesClient.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/InboxPlacements/FiltersClient.ts":
/*!*********************************************************!*\
  !*** ./lib/Interfaces/InboxPlacements/FiltersClient.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/InboxPlacements/InboxPlacementsClient.ts":
/*!*****************************************************************!*\
  !*** ./lib/Interfaces/InboxPlacements/InboxPlacementsClient.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts":
/*!**************************************************************************!*\
  !*** ./lib/Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/InboxPlacements/Results/InboxPlacementsResultsSharing.ts":
/*!*********************************************************************************!*\
  !*** ./lib/Interfaces/InboxPlacements/Results/InboxPlacementsResultsSharing.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts":
/*!***********************************************************************!*\
  !*** ./lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/InboxPlacements/index.ts":
/*!*************************************************!*\
  !*** ./lib/Interfaces/InboxPlacements/index.ts ***!
  \*************************************************/
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
__exportStar(__webpack_require__(/*! ./InboxPlacementsClient */ "./lib/Interfaces/InboxPlacements/InboxPlacementsClient.ts"), exports);
__exportStar(__webpack_require__(/*! ./AttributesClient */ "./lib/Interfaces/InboxPlacements/AttributesClient.ts"), exports);
__exportStar(__webpack_require__(/*! ./FiltersClient */ "./lib/Interfaces/InboxPlacements/FiltersClient.ts"), exports);
__exportStar(__webpack_require__(/*! ./SeedsLists/SeedsListsClient */ "./lib/Interfaces/InboxPlacements/SeedsLists/SeedsListsClient.ts"), exports);
__exportStar(__webpack_require__(/*! ./Results/InboxPlacementsResults */ "./lib/Interfaces/InboxPlacements/Results/InboxPlacementsResults.ts"), exports);
__exportStar(__webpack_require__(/*! ./Results/InboxPlacementsResultsSharing */ "./lib/Interfaces/InboxPlacements/Results/InboxPlacementsResultsSharing.ts"), exports);

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

/***/ "./lib/Interfaces/MailingLists/MailingListsClient.ts":
/*!***********************************************************!*\
  !*** ./lib/Interfaces/MailingLists/MailingListsClient.ts ***!
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
__exportStar(__webpack_require__(/*! ./MailingListsClient */ "./lib/Interfaces/MailingLists/MailingListsClient.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/Messages/IMessagesClient.ts":
/*!****************************************************!*\
  !*** ./lib/Interfaces/Messages/IMessagesClient.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Messages/index.ts":
/*!******************************************!*\
  !*** ./lib/Interfaces/Messages/index.ts ***!
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
__exportStar(__webpack_require__(/*! ./IMessagesClient */ "./lib/Interfaces/Messages/IMessagesClient.ts"), exports);

/***/ }),

/***/ "./lib/Interfaces/Routes/IRoutesClient.ts":
/*!************************************************!*\
  !*** ./lib/Interfaces/Routes/IRoutesClient.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Routes/index.ts":
/*!****************************************!*\
  !*** ./lib/Interfaces/Routes/index.ts ***!
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
__exportStar(__webpack_require__(/*! ./IRoutesClient */ "./lib/Interfaces/Routes/IRoutesClient.ts"), exports);

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

/***/ "./lib/Interfaces/Subaccounts/ISubaccountsClient.ts":
/*!**********************************************************!*\
  !*** ./lib/Interfaces/Subaccounts/ISubaccountsClient.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Subaccounts/index.ts":
/*!*********************************************!*\
  !*** ./lib/Interfaces/Subaccounts/index.ts ***!
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
__exportStar(__webpack_require__(/*! ./ISubaccountsClient */ "./lib/Interfaces/Subaccounts/ISubaccountsClient.ts"), exports);

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

/***/ "./lib/Interfaces/Suppressions/ISuppressionsClient.ts":
/*!************************************************************!*\
  !*** ./lib/Interfaces/Suppressions/ISuppressionsClient.ts ***!
  \************************************************************/
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
__exportStar(__webpack_require__(/*! ./ISuppressionsClient */ "./lib/Interfaces/Suppressions/ISuppressionsClient.ts"), exports);

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

/***/ "./lib/Interfaces/Webhooks/IWebHooksClient.ts":
/*!****************************************************!*\
  !*** ./lib/Interfaces/Webhooks/IWebHooksClient.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/* eslint-disable camelcase */
Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Interfaces/Webhooks/index.ts":
/*!******************************************!*\
  !*** ./lib/Interfaces/Webhooks/index.ts ***!
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
__exportStar(__webpack_require__(/*! ./IWebHooksClient */ "./lib/Interfaces/Webhooks/IWebHooksClient.ts"), exports);

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
__exportStar(__webpack_require__(/*! ./EventClient */ "./lib/Interfaces/EventClient/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Webhooks */ "./lib/Interfaces/Webhooks/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Messages */ "./lib/Interfaces/Messages/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Routes */ "./lib/Interfaces/Routes/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./IPs */ "./lib/Interfaces/IPs/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./IPPools */ "./lib/Interfaces/IPPools/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Subaccounts */ "./lib/Interfaces/Subaccounts/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./InboxPlacements */ "./lib/Interfaces/InboxPlacements/index.ts"), exports);

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

/***/ "./lib/Types/Subaccounts/Subaccounts.ts":
/*!**********************************************!*\
  !*** ./lib/Types/Subaccounts/Subaccounts.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./lib/Types/Subaccounts/index.ts":
/*!****************************************!*\
  !*** ./lib/Types/Subaccounts/index.ts ***!
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
__exportStar(__webpack_require__(/*! ./Subaccounts */ "./lib/Types/Subaccounts/Subaccounts.ts"), exports);

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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./Common */ "./lib/Types/Common/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Domains */ "./lib/Types/Domains/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Events */ "./lib/Types/Events/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./IPPools */ "./lib/Types/IPPools/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./IPs */ "./lib/Types/IPs/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./MailgunClient */ "./lib/Types/MailgunClient/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./MailingLists */ "./lib/Types/MailingLists/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Messages */ "./lib/Types/Messages/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Routes */ "./lib/Types/Routes/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Stats */ "./lib/Types/Stats/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Subaccounts */ "./lib/Types/Subaccounts/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Suppressions */ "./lib/Types/Suppressions/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Validations */ "./lib/Types/Validations/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./Webhooks */ "./lib/Types/Webhooks/index.ts"), exports);

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
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Interfaces = exports.Enums = void 0;
var MailgunClient_1 = __importDefault(__webpack_require__(/*! ./Classes/MailgunClient */ "./lib/Classes/MailgunClient.ts"));
exports.Enums = __importStar(__webpack_require__(/*! ./Enums */ "./lib/Enums/index.ts"));
__exportStar(__webpack_require__(/*! ./Types */ "./lib/Types/index.ts"), exports);
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


/***/ }),

/***/ "./node_modules/axios/dist/browser/axios.cjs":
/*!***************************************************!*\
  !*** ./node_modules/axios/dist/browser/axios.cjs ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Axios v1.7.9 Copyright (c) 2024 Matt Zabriskie and contributors


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
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : __webpack_require__.g)
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
function AxiosError(message, code, config, request, response) {
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

utils$1.inherits(AxiosError, Error, {
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

const prototype$1 = AxiosError.prototype;
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

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);

  utils$1.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

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
function toFormData(obj, formData, options) {
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
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
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

  params && toFormData(params, this, options);
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

var InterceptorManager$1 = InterceptorManager;

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
  hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
  hasStandardBrowserEnv: hasStandardBrowserEnv,
  navigator: _navigator,
  origin: origin
});

var platform = {
  ...utils,
  ...platform$1
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
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

        return toFormData(
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

var defaults$1 = defaults;

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

class AxiosHeaders {
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
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
utils$1.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

utils$1.freezeMethods(AxiosHeaders);

var AxiosHeaders$1 = AxiosHeaders;

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults$1;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;

  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel(value) {
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
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils$1.inherits(CanceledError, AxiosError, {
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
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
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
function mergeConfig(config1, config2) {
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
  const newConfig = mergeConfig({}, config);

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

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

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
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
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
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
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
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
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
        controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
      }
    };

    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
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

var composeSignals$1 = composeSignals;

const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;

  if (!chunkSize || len < chunkSize) {
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
        throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
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

  let composedSignal = composeSignals$1([signal, cancelToken && cancelToken.toAbortSignal()], timeout);

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
        new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      )
    }

    throw AxiosError.from(err, err && err.code, config, request);
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
          throw new AxiosError(`Unknown adapter '${id}'`);
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

      throw new AxiosError(
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
    throw new CanceledError(null, config);
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

  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

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
    if (!isCancel(reason)) {
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

const VERSION = "1.7.9";

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
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
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
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
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
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
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
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
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

    config = mergeConfig(this.defaults, config);

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
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
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
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

var Axios$1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
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

      token.reason = new CanceledError(message, config, request);
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
}

var CancelToken$1 = CancelToken;

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
function spread(callback) {
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
function isAxiosError(payload) {
  return utils$1.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode = {
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

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

var HttpStatusCode$1 = HttpStatusCode;

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
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults$1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$1;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = AxiosHeaders$1;

axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = adapters.getAdapter;

axios.HttpStatusCode = HttpStatusCode$1;

axios.default = axios;

module.exports = axios;
//# sourceMappingURL=axios.cjs.map


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLG1CQUFtQjtBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esb0RBQW9ELE1BQU07QUFDMUQsb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Es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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsU0FBUyxRQUFROztBQUVqQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxTQUFTO0FBQ2pELEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxXQUFXLFFBQVE7O0FBRW5COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYLGFBQWEsYUFBYTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLEtBQUs7QUFDcEQsT0FBTztBQUNQLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJ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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGFBQWEsU0FBUztBQUN0QjtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7O0FBRUEsV0FBVyx5Q0FBeUM7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FB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RUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVKQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNDcmVkZW50aWFscy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVGFncy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVGVtcGxhdGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNUcmFja2luZy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRXZlbnRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JUFBvb2xzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JUHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9BdHRyaWJ1dGVzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvRmlsdGVyc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9pbmJveFBsYWNlbWVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NYWlsaW5nTGlzdHMvbWFpbExpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NZXNzYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWV0cmljcy9NZXRyaWNzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Sb3V0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N0YXRzL1N0YXRzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdGF0cy9TdGF0c0NvbnRhaW5lci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3ViYWNjb3VudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9Cb3VuY2UudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9Db21wbGFpbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1Vuc3Vic2NyaWJlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvV2hpdGVMaXN0LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9WYWxpZGF0aW9ucy9tdWx0aXBsZVZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1ZhbGlkYXRpb25zL3ZhbGlkYXRlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9XZWJob29rcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvY29tbW9uL0F0dGFjaG1lbnRzSGFuZGxlci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvY29tbW9uL0Vycm9yLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vRm9ybURhdGFCdWlsZGVyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvY29tbW9uL1JlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9FbnVtcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvQ29tbW9uL0xvZ2dlci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvQ29tbW9uL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Eb21haW5zL0RvbWFpbkNyZWRlbnRpYWxzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Eb21haW5zL0RvbWFpblRhZ3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvRG9tYWluVGVtcGxhdGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Eb21haW5zL0RvbWFpblRyYWNraW5nLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Eb21haW5zL0RvbWFpbnNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0V2ZW50Q2xpZW50L0lFdmVudENsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRXZlbnRDbGllbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0lQUG9vbHMvSUlQUG9vbHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0lQUG9vbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0lQcy9JSVBzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JUHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9BdHRyaWJ1dGVzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvRmlsdGVyc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL0luYm94UGxhY2VtZW50c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmcudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWFpbGd1bkNsaWVudC9JTWFpbGd1bkNsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWFpbGd1bkNsaWVudC9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWFpbGluZ0xpc3RzL01haWxpbmdMaXN0TWVtYmVycy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWFpbGluZ0xpc3RzL01haWxpbmdMaXN0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWFpbGluZ0xpc3RzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NZXNzYWdlcy9JTWVzc2FnZXNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01lc3NhZ2VzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Sb3V0ZXMvSVJvdXRlc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvUm91dGVzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdGF0cy9TdGF0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3RhdHMvU3RhdHNDb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N0YXRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdWJhY2NvdW50cy9JU3ViYWNjb3VudHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1YmFjY291bnRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvQm91bmNlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvQ29tcGxhaW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvSVN1cHByZXNzaW9uc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zL1Vuc3Vic2NyaWJlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvV2hpdGVMaXN0LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1ZhbGlkYXRpb25zL011bHRpcGxlVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMvVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1dlYmhvb2tzL0lXZWJIb29rc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvV2ViaG9va3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvQ29tbW9uL0Vycm9yLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvQ29tbW9uL0Zvcm1EYXRhLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvQ29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vUmVxdWVzdE9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpbkNyZWRlbnRpYWxzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRG9tYWlucy9Eb21haW5UYWdzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRG9tYWlucy9Eb21haW5UZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpblRyYWNraW5nLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRG9tYWlucy9Eb21haW5zLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRG9tYWlucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0V2ZW50cy9FdmVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9FdmVudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9JUFBvb2xzL0lwUG9vbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9JUFBvb2xzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvSVBzL0lQcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0lQcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxndW5DbGllbnQvTWFpbGd1bkNsaWVudE9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NYWlsZ3VuQ2xpZW50L2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWFpbGluZ0xpc3RzL01haWxpbmdMaXN0TWVtYmVycy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxpbmdMaXN0cy9NYWlsaW5nTGlzdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NYWlsaW5nTGlzdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NZXNzYWdlcy9NZXNzYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01lc3NhZ2VzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvUm91dGVzL1JvdXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1JvdXRlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N0YXRzL1N0YXRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3RhdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdWJhY2NvdW50cy9TdWJhY2NvdW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1YmFjY291bnRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL0JvdW5jZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9Db21wbGFpbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvU3VwcHJlc3Npb25zLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL1Vuc3Vic2NyaWJlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL1doaXRlTGlzdC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1ZhbGlkYXRpb25zL011bHRpcGxlVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1ZhbGlkYXRpb25zL1ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9WYWxpZGF0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1dlYmhvb2tzL1dlYmhvb2tzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvV2ViaG9va3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy91cmwtam9pbi9saWIvdXJsLWpvaW4uanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9kaXN0L2Jyb3dzZXIvYXhpb3MuY2pzIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRE5TUmVjb3JkLFxuICBEb21haW5EYXRhLFxuICBEb21haW5EeW5hbWljUHJvcHNUeXBlLFxuICBURG9tYWluXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbiBpbXBsZW1lbnRzIFREb21haW4ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgc3RhdGU6IHN0cmluZztcbiAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gIHNwYW1fYWN0aW9uOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IERhdGU7XG4gIHNtdHBfcGFzc3dvcmQ6IHN0cmluZztcbiAgc210cF9sb2dpbjogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHJlY2VpdmluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuICBzZW5kaW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIGlkOiBzdHJpbmc7XG4gIGlzX2Rpc2FibGVkOiBib29sZWFuO1xuICB3ZWJfcHJlZml4OiBzdHJpbmc7XG4gIHdlYl9zY2hlbWU6IHN0cmluZztcbiAgdXNlX2F1dG9tYXRpY19zZW5kZXJfc2VjdXJpdHk6IGJvb2xlYW47XG4gIGRraW1faG9zdD86IHN0cmluZztcbiAgbWFpbGZyb21faG9zdD86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBkYXRhOiBEb21haW5EYXRhLFxuICAgIHJlY2VpdmluZz86IEROU1JlY29yZFtdIHwgbnVsbCxcbiAgICBzZW5kaW5nPzogRE5TUmVjb3JkW10gfCBudWxsXG4gICkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLnJlcXVpcmVfdGxzID0gZGF0YS5yZXF1aXJlX3RscztcbiAgICB0aGlzLnNraXBfdmVyaWZpY2F0aW9uID0gZGF0YS5za2lwX3ZlcmlmaWNhdGlvbjtcbiAgICB0aGlzLnN0YXRlID0gZGF0YS5zdGF0ZTtcbiAgICB0aGlzLndpbGRjYXJkID0gZGF0YS53aWxkY2FyZDtcbiAgICB0aGlzLnNwYW1fYWN0aW9uID0gZGF0YS5zcGFtX2FjdGlvbjtcbiAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIHRoaXMuc210cF9wYXNzd29yZCA9IGRhdGEuc210cF9wYXNzd29yZDtcbiAgICB0aGlzLnNtdHBfbG9naW4gPSBkYXRhLnNtdHBfbG9naW47XG4gICAgdGhpcy50eXBlID0gZGF0YS50eXBlO1xuICAgIHRoaXMucmVjZWl2aW5nX2Ruc19yZWNvcmRzID0gcmVjZWl2aW5nIHx8IG51bGw7XG4gICAgdGhpcy5zZW5kaW5nX2Ruc19yZWNvcmRzID0gc2VuZGluZyB8fCBudWxsO1xuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgIHRoaXMuaXNfZGlzYWJsZWQgPSBkYXRhLmlzX2Rpc2FibGVkO1xuICAgIHRoaXMud2ViX3ByZWZpeCA9IGRhdGEud2ViX3ByZWZpeDtcbiAgICB0aGlzLndlYl9zY2hlbWUgPSBkYXRhLndlYl9zY2hlbWU7XG4gICAgdGhpcy51c2VfYXV0b21hdGljX3NlbmRlcl9zZWN1cml0eSA9IGRhdGEudXNlX2F1dG9tYXRpY19zZW5kZXJfc2VjdXJpdHk7XG5cbiAgICAvKlxuICAgICAgZG9tYWluIGdldCBhbmQgdXBkYXRlIG1ldGhvZHMgbWF5IGhhdmUgcmljaGVyIHJlc3BvbnNlIHRoYW4gY3JlYXRlIG1ldGhvZC5cbiAgICAqL1xuICAgIGNvbnN0IGR5bmFtaWNLZXlzOiAoa2V5b2YgRG9tYWluRHluYW1pY1Byb3BzVHlwZSlbXSA9IFsnZGtpbV9ob3N0JywgJ21haWxmcm9tX2hvc3QnXTtcblxuICAgIGNvbnN0IGR5bmFtaWNQcm9wZXJ0aWVzID0gZHluYW1pY0tleXMucmVkdWNlKChhY2MsIHByb3BlcnR5TmFtZSkgPT4ge1xuICAgICAgaWYgKGRhdGFbcHJvcGVydHlOYW1lXSkge1xuICAgICAgICBjb25zdCBwcm9wID0gcHJvcGVydHlOYW1lIGFzIGtleW9mIERvbWFpbkR5bmFtaWNQcm9wc1R5cGU7XG4gICAgICAgIGFjY1twcm9wXSA9IGRhdGFbcHJvcGVydHlOYW1lXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgRG9tYWluRHluYW1pY1Byb3BzVHlwZSk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkeW5hbWljUHJvcGVydGllcyk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7XG4gIElEb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gIElEb21haW5UYWdzQ2xpZW50LFxuICBJRG9tYWluQ3JlZGVudGlhbHMsXG4gIElEb21haW5zQ2xpZW50XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5cbmltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3InO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBEZXN0cm95ZWREb21haW5SZXNwb25zZSxcbiAgTWVzc2FnZVJlc3BvbnNlLFxuICBEb21haW5MaXN0UmVzcG9uc2VEYXRhLFxuICBEb21haW5SZXNwb25zZURhdGEsXG4gIERvbWFpblRyYWNraW5nRGF0YSxcbiAgVXBkYXRlZE9wZW5UcmFja2luZyxcbiAgRG9tYWluc1F1ZXJ5LFxuICBEb21haW5JbmZvLFxuICBDb25uZWN0aW9uU2V0dGluZ3MsXG4gIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlLFxuICBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzLFxuICBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFJlcGxhY2VtZW50Rm9yUG9vbCxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlLFxuICBES0lNU2VsZWN0b3JJbmZvLFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFdlYlByZWZpeEluZm8sXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgVERvbWFpbixcbiAgRG9tYWluVXBkYXRlSW5mbyxcbiAgRG9tYWluVXBkYXRlSW5mb1JlcSxcbiAgRG9tYWluSW5mb1JlcSxcbiAgQm9vbFRvU3RyaW5nLFxuICBEb21haW5HZXRRdWVyeSxcbiAgVXBkYXRlZERLSU1TZWxlY3RvclJlc3VsdCxcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5pbXBvcnQgRG9tYWluIGZyb20gJy4vZG9tYWluJztcbmltcG9ydCB7IElMb2dnZXIsIElEb21haW5UcmFja2luZ0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5zQ2xpZW50IGltcGxlbWVudHMgSURvbWFpbnNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgZG9tYWluQ3JlZGVudGlhbHM6IElEb21haW5DcmVkZW50aWFscztcbiAgcHVibGljIGRvbWFpblRlbXBsYXRlczogSURvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgcHVibGljIGRvbWFpblRhZ3M6IElEb21haW5UYWdzQ2xpZW50O1xuICBwdWJsaWMgZG9tYWluVHJhY2tpbmc6IElEb21haW5UcmFja2luZ0NsaWVudDtcbiAgcHJpdmF0ZSBsb2dnZXI6IElMb2dnZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBkb21haW5DcmVkZW50aWFsc0NsaWVudDogSURvbWFpbkNyZWRlbnRpYWxzLFxuICAgIGRvbWFpblRlbXBsYXRlc0NsaWVudDogSURvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgICBkb21haW5UYWdzQ2xpZW50OiBJRG9tYWluVGFnc0NsaWVudCxcbiAgICBkb21haW5UcmFja2luZzogSURvbWFpblRyYWNraW5nQ2xpZW50LFxuICAgIGxvZ2dlcjogSUxvZ2dlciA9IGNvbnNvbGVcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmRvbWFpbkNyZWRlbnRpYWxzID0gZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ7XG4gICAgdGhpcy5kb21haW5UZW1wbGF0ZXMgPSBkb21haW5UZW1wbGF0ZXNDbGllbnQ7XG4gICAgdGhpcy5kb21haW5UYWdzID0gZG9tYWluVGFnc0NsaWVudDtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICB0aGlzLmRvbWFpblRyYWNraW5nID0gZG9tYWluVHJhY2tpbmc7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVCb29sVmFsdWVzKFxuICAgIGRhdGE6IERvbWFpbkluZm8gfCBEb21haW5VcGRhdGVJbmZvXG4gICk6IERvbWFpbkluZm9SZXEgfCBEb21haW5VcGRhdGVJbmZvUmVxIHtcbiAgICBjb25zdCBwcm9wc0ZvclJlcGxhY2VtZW50ID0gZGF0YSBhcyBCb29sVG9TdHJpbmc7XG4gICAgY29uc3QgcmVwbGFjZWRQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzRm9yUmVwbGFjZW1lbnQpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHByb3AgPSBrZXkgYXMga2V5b2YgQm9vbFRvU3RyaW5nO1xuICAgICAgaWYgKHR5cGVvZiBwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdIGFzIGJvb2xlYW47XG4gICAgICAgIGFjY1twcm9wXSA9ICh2YWx1ZS50b1N0cmluZygpID09PSAndHJ1ZScpID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgUmVjb3JkPGtleW9mIEJvb2xUb1N0cmluZywgJ3RydWUnfCAnZmFsc2UnPik7XG4gICAgcmV0dXJuIHsgLi4uZGF0YSwgLi4ucmVwbGFjZWRQcm9wcyB9IGFzIERvbWFpblVwZGF0ZUluZm9SZXEgfCBEb21haW5JbmZvUmVxO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlKHJlc3BvbnNlOiBEZXN0cm95ZWREb21haW5SZXNwb25zZSkgOiBNZXNzYWdlUmVzcG9uc2Uge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZURvbWFpbkxpc3QocmVzcG9uc2U6IERvbWFpbkxpc3RSZXNwb25zZURhdGEpOiBURG9tYWluW10ge1xuICAgIGlmIChyZXNwb25zZS5ib2R5ICYmIHJlc3BvbnNlLmJvZHkuaXRlbXMpIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gbmV3IERvbWFpbihpdGVtKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURvbWFpbihyZXNwb25zZTogRG9tYWluUmVzcG9uc2VEYXRhKTogVERvbWFpbiB7XG4gICAgcmV0dXJuIG5ldyBEb21haW4oXG4gICAgICByZXNwb25zZS5ib2R5LmRvbWFpbixcbiAgICAgIHJlc3BvbnNlLmJvZHkucmVjZWl2aW5nX2Ruc19yZWNvcmRzLFxuICAgICAgcmVzcG9uc2UuYm9keS5zZW5kaW5nX2Ruc19yZWNvcmRzXG4gICAgKTtcbiAgfVxuXG4gIGxpc3QocXVlcnk/OiBEb21haW5zUXVlcnkpOiBQcm9taXNlPFREb21haW5bXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvZG9tYWlucycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlRG9tYWluTGlzdChyZXMgYXMgRG9tYWluTGlzdFJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpbkdldFF1ZXJ5KSA6IFByb21pc2U8VERvbWFpbj4ge1xuICAgIGNvbnN0IHByZXBhcmVkUXVlcnkgPSBxdWVyeSA/IHtcbiAgICAgICdoOmV4dGVuZGVkJzogcXVlcnk/LmV4dGVuZGVkID8/IGZhbHNlLFxuICAgICAgJ2g6d2l0aF9kbnMnOiBxdWVyeT8ud2l0aF9kbnMgPz8gdHJ1ZSxcbiAgICB9IDoge307XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92NC9kb21haW5zLyR7ZG9tYWlufWAsIHByZXBhcmVkUXVlcnkpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBEb21haW5JbmZvKSA6IFByb21pc2U8VERvbWFpbj4ge1xuICAgIGNvbnN0IHBvc3RPYmogPSB0aGlzLl9oYW5kbGVCb29sVmFsdWVzKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3Y0L2RvbWFpbnMnLCBwb3N0T2JqKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERvbWFpblVwZGF0ZUluZm8pIDogUHJvbWlzZTxURG9tYWluPiB7XG4gICAgY29uc3QgcHV0RGF0YSA9IHRoaXMuX2hhbmRsZUJvb2xWYWx1ZXMoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYC92NC9kb21haW5zLyR7ZG9tYWlufWAsIHB1dERhdGEpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIHZlcmlmeShkb21haW46IHN0cmluZyk6IFByb21pc2U8VERvbWFpbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjQvZG9tYWlucy8ke2RvbWFpbn0vdmVyaWZ5YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZyk6IFByb21pc2U8TWVzc2FnZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92My9kb21haW5zLyR7ZG9tYWlufWApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZShyZXMgYXMgRGVzdHJveWVkRG9tYWluUmVzcG9uc2UpKTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPENvbm5lY3Rpb25TZXR0aW5ncz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vY29ubmVjdGlvbmApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSlcbiAgICAgIC50aGVuKChyZXM6Q29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIENvbm5lY3Rpb25TZXR0aW5ncyk7XG4gIH1cblxuICB1cGRhdGVDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBDb25uZWN0aW9uU2V0dGluZ3MpOiBQcm9taXNlPFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3M+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2Nvbm5lY3Rpb25gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcylcbiAgICAgIC50aGVuKChyZXM6VXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcykgPT4gcmVzLmJvZHkgYXMgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyk7XG4gIH1cblxuICAvLyBUcmFja2luZ1xuICAvKipcbiAgKiBAZGVwcmVjYXRlZCAnZG9tYWlucy5nZXRUcmFja2luZycgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQuXG4gICogUGxlYXNlIHVzZSAnZG9tYWlucy5kb21haW5UcmFja2luZy5nZXRUcmFja2luZycgaW5zdGVhZC5cbiAgKi9cblxuICBnZXRUcmFja2luZyhkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpblRyYWNraW5nRGF0YT4ge1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYFxuICAgICAgJ2RvbWFpbnMuZ2V0VHJhY2tpbmcnIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlICdkb21haW5zLmRvbWFpblRyYWNraW5nLmdldFRyYWNraW5nJyBpbnN0ZWFkLlxuICAgIGApO1xuICAgIHJldHVybiB0aGlzLmRvbWFpblRyYWNraW5nLmdldFRyYWNraW5nKGRvbWFpbik7XG4gIH1cblxuICAvKipcbiAgKiBAZGVwcmVjYXRlZCAnZG9tYWlucy51cGRhdGVUcmFja2luZycgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQuXG4gICogUGxlYXNlIHVzZSAnZG9tYWlucy5kb21haW5UcmFja2luZy51cGRhdGVUcmFja2luZycgaW5zdGVhZC5cbiAgKi9cbiAgdXBkYXRlVHJhY2tpbmcoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IE9wZW5UcmFja2luZ0luZm8gfCBDbGlja1RyYWNraW5nSW5mbyB8IFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvXG4gICk6IFByb21pc2U8VXBkYXRlZE9wZW5UcmFja2luZz4ge1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYFxuICAgICAgJ2RvbWFpbnMudXBkYXRlVHJhY2tpbmcnIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlICdkb21haW5zLmRvbWFpblRyYWNraW5nLnVwZGF0ZVRyYWNraW5nJyBpbnN0ZWFkLlxuICAgIGApO1xuICAgIHJldHVybiB0aGlzLmRvbWFpblRyYWNraW5nLnVwZGF0ZVRyYWNraW5nKGRvbWFpbiwgdHlwZSwgZGF0YSk7XG4gIH1cblxuICAvLyBJUHNcbiAgLyoqXG4gICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLmdldElwc1wiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICovXG4gIGdldElwcyhkb21haW46IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMuZ2V0SXBzXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJykpXG4gICAgICAudGhlbigocmVzcG9uc2U6IEFQSVJlc3BvbnNlKSA9PiByZXNwb25zZT8uYm9keT8uaXRlbXMpO1xuICB9XG5cbiAgLyoqXG4gICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLmFzc2lnbklwXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy5cbiAgKi9cbiAgYXNzaWduSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLmFzc2lnbklwXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IGlwIH0pO1xuICB9XG5cbiAgLyoqXG4gICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLmRlbGV0ZUlwXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIG1vdmVkIHRvIHRoZSBJcHNDbGllbnQuXG4gICovXG4gIGRlbGV0ZUlwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy5kZWxldGVJcFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIG1vdmVkIGludG8gdGhlIElwc0NsaWVudCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJywgaXApKTtcbiAgfVxuXG4gIC8qKlxuICAqIEBkZXByZWNhdGVkIFwiZG9tYWlucy5saW5rSXBQb29sXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWRcbiAgKiBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLlxuICAqL1xuICBsaW5rSXBQb29sKGRvbWFpbjogc3RyaW5nLCBwb29sSWQ6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMubGlua0lwUG9vbFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuJyk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgcG9vbF9pZDogcG9vbElkIH0pO1xuICB9XG5cbiAgLyoqXG4gICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLnVubGlua0lwUG9sbFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSBtb3ZlZCBpbnRvIHRoZSBJcHNDbGllbnRcbiAgKiBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLlxuICAqL1xuICB1bmxpbmtJcFBvbGwoZG9tYWluOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBSZXBsYWNlbWVudEZvclBvb2wpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLnVubGlua0lwUG9sbFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBhbmQgd2lsbCBiZSBtb3ZlZCBpbnRvIHRoZSBJcHNDbGllbnQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gJyc7XG4gICAgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQgJiYgcmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1RvbyBtdWNoIGRhdGEgZm9yIHJlcGxhY2VtZW50JywgJ1BsZWFzZSBzcGVjaWZ5IGVpdGhlciBwb29sX2lkIG9yIGlwIChub3QgYm90aCknKTtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/cG9vbF9pZD0ke3JlcGxhY2VtZW50LnBvb2xfaWR9YDtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICBzZWFyY2hQYXJhbXMgPSBgP2lwPSR7cmVwbGFjZW1lbnQuaXB9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCAnaXBfcG9vbCcsIHNlYXJjaFBhcmFtcykpO1xuICB9XG5cbiAgdXBkYXRlREtJTUF1dGhvcml0eShkb21haW46IHN0cmluZywgZGF0YTogREtJTUF1dGhvcml0eUluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNQXV0aG9yaXR5PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX2F1dGhvcml0eWAsIHt9LCB7IHF1ZXJ5OiBgc2VsZj0ke2RhdGEuc2VsZn1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlcyA6IFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5KTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZURLSU1TZWxlY3RvcihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBES0lNU2VsZWN0b3JJbmZvXG4gICk6IFByb21pc2U8VXBkYXRlZERLSU1TZWxlY3RvclJlc3VsdD4ge1xuICAgIGNvbnN0IHJlczogVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2RraW1fc2VsZWN0b3JgLCB7fSwgeyBxdWVyeTogYGRraW1fc2VsZWN0b3I9JHtkYXRhLmRraW1TZWxlY3Rvcn1gIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzLnN0YXR1cyxcbiAgICAgIG1lc3NhZ2U6IHJlcz8uYm9keT8ubWVzc2FnZVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMudXBkYXRlV2ViUHJlZml4XCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQuXG4gICogUGxlYXNlIHVzZSBkb21haW5zLnVwZGF0ZSB0byBzZXQgbmV3IFwid2ViX3ByZWZpeFwiLlxuICAqIEN1cnJlbnQgbWV0aG9kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLlxuICAqL1xuICB1cGRhdGVXZWJQcmVmaXgoZG9tYWluOiBzdHJpbmcsIGRhdGE6IFdlYlByZWZpeEluZm8pOiBQcm9taXNlPFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZT4ge1xuICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy51cGRhdGVXZWJQcmVmaXhcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBkb21haW5zLnVwZGF0ZSB0byBzZXQgbmV3IFwid2ViX3ByZWZpeFwiLiBDdXJyZW50IG1ldGhvZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L3dlYl9wcmVmaXhgLCB7fSwgeyBxdWVyeTogYHdlYl9wcmVmaXg9JHtkYXRhLndlYlByZWZpeH1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgeyBBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BcGlSZXNwb25zZSc7XG5pbXBvcnQgeyBJRG9tYWluQ3JlZGVudGlhbHMgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuaW1wb3J0IHtcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEsXG4gIERvbWFpbkNyZWRlbnRpYWxzTGlzdCxcbiAgQ3JlYXRlZFVwZGF0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlLFxuICBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCxcbiAgRGVsZXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UsXG4gIERvbWFpbkNyZWRlbnRpYWxzUXVlcnksXG4gIERvbWFpbkNyZWRlbnRpYWxzLFxuICBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGltcGxlbWVudHMgSURvbWFpbkNyZWRlbnRpYWxzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2RvbWFpbnMvJztcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KFxuICAgIHJlc3BvbnNlOiBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YVxuICApOiBEb21haW5DcmVkZW50aWFsc0xpc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHRvdGFsQ291bnQ6IHJlc3BvbnNlLmJvZHkudG90YWxfY291bnRcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6IENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURlbGV0ZWRSZXNwb25zZShcbiAgICByZXNwb25zZTpEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICBzcGVjOiByZXNwb25zZS5ib2R5LnNwZWNcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluQ3JlZGVudGlhbHNRdWVyeSk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL2NyZWRlbnRpYWxzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChyZXMgYXMgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpbkNyZWRlbnRpYWxzXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmcsXG4gICAgZGF0YTogVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzLyR7Y3JlZGVudGlhbHNMb2dpbn1gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRGVsZXRlZFJlc3BvbnNlKHJlcykpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgeyBBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BcGlSZXNwb25zZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIElEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQsXG4gIElEb21haW5UYWdzQ2xpZW50XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBSZXNvbHV0aW9uIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHtcbiAgRG9tYWluVGFnc0l0ZW0sXG4gIERvbWFpblRhZ3NJdGVtSW5mbyxcbiAgRG9tYWluVGFnU3RhdGlzdGljSXRlbSxcbiAgRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlLFxuICBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSxcbiAgRG9tYWluVGFnc0xpc3QsXG4gIERvbWFpblRhZ3NSZXNwb25zZURhdGEsXG4gIERvbWFpblRhZ3NRdWVyeSxcbiAgRG9tYWluVGFnc01lc3NhZ2VSZXMsXG4gIERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSxcbiAgRG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ0NvdW50cmllc0FQSVJlc3BvbnNlLFxuICBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluVGFnIGltcGxlbWVudHMgRG9tYWluVGFnc0l0ZW0ge1xuICB0YWc6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgJ2ZpcnN0LXNlZW4nOiBEYXRlO1xuICAnbGFzdC1zZWVuJzogRGF0ZTtcblxuICBjb25zdHJ1Y3Rvcih0YWdJbmZvOiBEb21haW5UYWdzSXRlbUluZm8pIHtcbiAgICB0aGlzLnRhZyA9IHRhZ0luZm8udGFnO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YWdJbmZvLmRlc2NyaXB0aW9uO1xuICAgIHRoaXNbJ2ZpcnN0LXNlZW4nXSA9IG5ldyBEYXRlKHRhZ0luZm9bJ2ZpcnN0LXNlZW4nXSk7XG4gICAgdGhpc1snbGFzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydsYXN0LXNlZW4nXSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZ1N0YXRpc3RpYyBpbXBsZW1lbnRzIElEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQge1xuICB0YWc6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgc3RhcnQ6IERhdGU7XG4gIGVuZDogRGF0ZTtcbiAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgc3RhdHM6IERvbWFpblRhZ1N0YXRpc3RpY0l0ZW1bXTtcblxuICBjb25zdHJ1Y3Rvcih0YWdTdGF0aXN0aWNJbmZvOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2UpIHtcbiAgICB0aGlzLnRhZyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS50YWc7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXJ0KTtcbiAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5lbmQpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5yZXNvbHV0aW9uO1xuICAgIHRoaXMuc3RhdHMgPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0OiBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSkge1xuICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0LCB0aW1lOiBuZXcgRGF0ZShzdGF0LnRpbWUpIH07XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpblRhZ3NDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPERvbWFpblRhZ3NMaXN0PlxuICBpbXBsZW1lbnRzIElEb21haW5UYWdzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzLyc7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBEb21haW5UYWdzUmVzcG9uc2VEYXRhLFxuICApOiBEb21haW5UYWdzTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIERvbWFpblRhZ3NMaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgodGFnSW5mbzogRG9tYWluVGFnc0l0ZW1JbmZvKSA9PiBuZXcgRG9tYWluVGFnKHRhZ0luZm8pKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICd0YWcnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVGFnU3RhdGlzdGljKFxuICAgIHJlc3BvbnNlOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2VcbiAgKTogSURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdCB7XG4gICAgcmV0dXJuIG5ldyBEb21haW5UYWdTdGF0aXN0aWMocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5UYWdzUXVlcnkpOiBQcm9taXNlPERvbWFpblRhZ3NMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnKSwgcXVlcnkpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnc0l0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UYWcocmVzLmJvZHkpXG4gICAgICApO1xuICB9XG5cbiAgdXBkYXRlKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZyksIGRlc2NyaXB0aW9uKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdzTWVzc2FnZVJlc1xuICAgICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGFnOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS90YWdzLyR7dGFnfWApXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gKFxuICAgICAgICB7XG4gICAgICAgICAgbWVzc2FnZTogcmVzLmJvZHkubWVzc2FnZSxcbiAgICAgICAgICBzdGF0dXM6IHJlcy5zdGF0dXNcbiAgICAgICAgfSBhcyBEb21haW5UYWdzTWVzc2FnZVJlcykpO1xuICB9XG5cbiAgc3RhdGlzdGljKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZywgcXVlcnk6IERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSlcbiAgICA6IFByb21pc2U8RG9tYWluVGFnU3RhdGlzdGljPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VUYWdTdGF0aXN0aWMocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGNvdW50cmllcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL2NvdW50cmllcycpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IERvbWFpblRhZ0NvdW50cmllc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvblxuICAgICAgKTtcbiAgfVxuXG4gIHByb3ZpZGVycyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL3Byb3ZpZGVycycpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IERvbWFpblRhZ1Byb3ZpZGVyc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvblxuICAgICAgKTtcbiAgfVxuXG4gIGRldmljZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvZGV2aWNlcycpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IERvbWFpblRhZ0RldmljZXNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIENyZWF0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UsXG4gIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlLFxuICBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQsXG4gIERvbWFpblRlbXBsYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVzUXVlcnksXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YSxcbiAgR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0LFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UsXG4gIE5vdGlmaWNhdGlvblJlc3VsdCxcbiAgU2hvcnRUZW1wbGF0ZVZlcnNpb24sXG4gIFRlbXBsYXRlUXVlcnksXG4gIFRlbXBsYXRlVmVyc2lvbixcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgSURvbWFpblRlbXBsYXRlLCBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcblxuZXhwb3J0IGNsYXNzIERvbWFpblRlbXBsYXRlSXRlbSBpbXBsZW1lbnRzIElEb21haW5UZW1wbGF0ZSB7XG4gIG5hbWUgOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uIDogc3RyaW5nO1xuICBjcmVhdGVkQXQgOiBEYXRlIHwgJyc7XG4gIGNyZWF0ZWRCeSA6IHN0cmluZztcbiAgaWQgOiBzdHJpbmc7XG4gIHZlcnNpb24/OiBUZW1wbGF0ZVZlcnNpb247XG4gIHZlcnNpb25zPzogU2hvcnRUZW1wbGF0ZVZlcnNpb25bXTtcblxuICBjb25zdHJ1Y3Rvcihkb21haW5UZW1wbGF0ZUZyb21BUEk6IElEb21haW5UZW1wbGF0ZSkge1xuICAgIHRoaXMubmFtZSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5uYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuZGVzY3JpcHRpb247XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0ID8gbmV3IERhdGUoZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRBdCkgOiAnJztcbiAgICB0aGlzLmNyZWF0ZWRCeSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQnk7XG4gICAgdGhpcy5pZCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5pZDtcblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbikge1xuICAgICAgdGhpcy52ZXJzaW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb247XG4gICAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24uY3JlYXRlZEF0KSB7XG4gICAgICAgIHRoaXMudmVyc2lvbi5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMgJiYgZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy52ZXJzaW9ucyA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5tYXAoKHZlcnNpb24pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyAuLi52ZXJzaW9uIH07XG4gICAgICAgIHJlc3VsdC5jcmVhdGVkQXQgPSBuZXcgRGF0ZSh2ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluVGVtcGxhdGVzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0PlxuICBpbXBsZW1lbnRzIElEb21haW5UZW1wbGF0ZXNDbGllbnQge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvJztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VDcmVhdGlvblJlc3BvbnNlKGRhdGE6IENyZWF0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpOiBJRG9tYWluVGVtcGxhdGUge1xuICAgIHJldHVybiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGRhdGEuYm9keS50ZW1wbGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UoXG4gICAgZGF0YTogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2VcbiAgKTogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHt9IGFzIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlID0gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkYXRhLmJvZHkudGVtcGxhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU11dGF0aW9uUmVzcG9uc2UoXG4gICAgZGF0YTogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlXG4gICk6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCA9IHt9IGFzIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZU5hbWUgPSBkYXRhLmJvZHkudGVtcGxhdGUubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VOb3RpZmljYXRpb25SZXNwb25zZShkYXRhOiBOb3RpZmljYXRpb25BUElSZXNwb25zZSk6IE5vdGlmaWNhdGlvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBOb3RpZmljYXRpb25SZXN1bHQgPSB7fSBhcyBOb3RpZmljYXRpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShcbiAgICBkYXRhOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZVxuICApOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge30gYXMgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZU5hbWUgPSBkYXRhLmJvZHkudGVtcGxhdGUubmFtZTtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZVZlcnNpb24gPSB7IHRhZzogZGF0YS5ib2R5LnRlbXBsYXRlLnZlcnNpb24udGFnIH07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KHJlc3BvbnNlOiBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UpOiBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgoZDogSURvbWFpblRlbXBsYXRlKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGQpKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhcbiAgICByZXNwb25zZTogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZVxuICApOiBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0O1xuXG4gICAgZGF0YS50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzcG9uc2UuYm9keS50ZW1wbGF0ZSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncCcpO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5KTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBxdWVyeSk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nLCBxdWVyeT86IFRlbXBsYXRlUXVlcnkpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXMuYm9keS50ZW1wbGF0ZSlcbiAgICAgICk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVEYXRhXG4gICk6IFByb21pc2U8SURvbWFpblRlbXBsYXRlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IENyZWF0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VDcmVhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgdXBkYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YVxuICApOiBQcm9taXNlPFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSkpXG4gICAgICAudGhlbigocmVzOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgZGVzdHJveUFsbChkb21haW46IHN0cmluZyk6IFByb21pc2U8Tm90aWZpY2F0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpKVxuICAgICAgLnRoZW4oKHJlczogTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VOb3RpZmljYXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGxpc3RWZXJzaW9ucyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5XG4gICk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhyZXMpXG4gICAgICApO1xuICB9XG5cbiAgZ2V0VmVyc2lvbihkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIGRhdGEpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShyZXMpXG4gICAgICApO1xuICB9XG5cbiAgdXBkYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBkZXN0cm95VmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgLnRoZW4oKHJlczogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHsgSURvbWFpblRyYWNraW5nQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBEb21haW5UcmFja2luZ1Jlc3BvbnNlLFxuICBHZW5lcmF0ZURvbWFpblRyYWNraW5nQ2VydGlmaWNhdGVSZXNwb25zZSxcbiAgR2V0RG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBSZWdlbmVyYXRlRG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlLFxuICBVbnN1YnNjcmliZVRyYWNraW5nSW5mbyxcbiAgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSxcbiAgVXBkYXRlZE9wZW5UcmFja2luZyxcbn0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5UcmFja2luZ0NsaWVudCBpbXBsZW1lbnRzIElEb21haW5UcmFja2luZ0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRyYWNraW5nU2V0dGluZ3MocmVzcG9uc2U6IERvbWFpblRyYWNraW5nUmVzcG9uc2UpOiBEb21haW5UcmFja2luZ0RhdGEge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5LnRyYWNraW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1VwZGF0ZShyZXNwb25zZTogVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSk6IFVwZGF0ZWRPcGVuVHJhY2tpbmcge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNPcGVuVHJhY2tpbmdJbmZvV2l0UGxhY2Uob2JqOiB1bmtub3duKTogb2JqIGlzIE9wZW5UcmFja2luZ0luZm8ge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAncGxhY2VfYXRfdGhlX3RvcCcgaW4gKG9iaiBhcyBPcGVuVHJhY2tpbmdJbmZvKTtcbiAgfVxuXG4gIGFzeW5jIGdldChkb21haW46IHN0cmluZyk6IFByb21pc2U8R2V0RG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjIveDUwOS8ke2RvbWFpbn0vc3RhdHVzYCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4ucmVzcG9uc2UuYm9keSxcbiAgICAgIHJlc3BvbnNlU3RhdHVzQ29kZTogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdlbmVyYXRlKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxHZW5lcmF0ZURvbWFpblRyYWNraW5nQ2VydGlmaWNhdGVSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3QoYC92Mi94NTA5LyR7ZG9tYWlufWApO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5yZXNwb25zZS5ib2R5LFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgcmVnZW5lcmF0ZShkb21haW46IHN0cmluZyk6IFByb21pc2U8UmVnZW5lcmF0ZURvbWFpblRyYWNraW5nQ2VydGlmaWNhdGVSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnB1dChgL3YyL3g1MDkvJHtkb21haW59YCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHksXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXRUcmFja2luZyhkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpblRyYWNraW5nRGF0YT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJykpO1xuICAgIHJldHVybiB0aGlzLl9wYXJzZVRyYWNraW5nU2V0dGluZ3MocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlVHJhY2tpbmcoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IE9wZW5UcmFja2luZ0luZm8gfCBDbGlja1RyYWNraW5nSW5mbyB8IFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvXG4gICk6IFByb21pc2U8VXBkYXRlZE9wZW5UcmFja2luZz4ge1xuICAgIGNvbnN0IHByZXBhcmVkRGF0YTogT3BlblRyYWNraW5nSW5mbyB8IENsaWNrVHJhY2tpbmdJbmZvIHwgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8gPSB7XG4gICAgICAuLi5kYXRhXG4gICAgfTtcbiAgICBpZiAodHlwZW9mIGRhdGE/LmFjdGl2ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBwcmVwYXJlZERhdGEuYWN0aXZlID0gKGRhdGE/LmFjdGl2ZSkgPyAneWVzJyA6ICdubyc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2lzT3BlblRyYWNraW5nSW5mb1dpdFBsYWNlKGRhdGEpKSB7XG4gICAgICBpZiAodHlwZW9mIGRhdGE/LnBsYWNlX2F0X3RoZV90b3AgPT09ICdib29sZWFuJykge1xuICAgICAgICAocHJlcGFyZWREYXRhIGFzIE9wZW5UcmFja2luZ0luZm8pLnBsYWNlX2F0X3RoZV90b3AgPSAoZGF0YT8ucGxhY2VfYXRfdGhlX3RvcCkgPyAneWVzJyA6ICdubyc7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJywgdHlwZSksIHByZXBhcmVkRGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuX3BhcnNlVHJhY2tpbmdVcGRhdGUocmVzcG9uc2UgYXMgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHtcbiAgRXZlbnRzTGlzdCxcbiAgRXZlbnRzUXVlcnksXG4gIEV2ZW50c1Jlc3BvbnNlLFxufSBmcm9tICcuLi9UeXBlcy9FdmVudHMnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElFdmVudENsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudENsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8RXZlbnRzTGlzdD5cbiAgaW1wbGVtZW50cyBJRXZlbnRDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogRXZlbnRzUmVzcG9uc2UsXG4gICk6IEV2ZW50c0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBFdmVudHNMaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICcvJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBnZXQoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRXZlbnRzUXVlcnkpIDogUHJvbWlzZTxFdmVudHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbignL3YzJywgZG9tYWluLCAnZXZlbnRzJyksIHF1ZXJ5KTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgSXBQb29sQ3JlYXRlRGF0YSxcbiAgSXBQb29sQ3JlYXRlUmVzcG9uc2UsXG4gIElwUG9vbENyZWF0ZVJlc3VsdCxcbiAgSXBQb29sRGVsZXRlRGF0YSxcbiAgSXBQb29sTGlzdFJlc3BvbnNlLFxuICBJcFBvb2xMaXN0UmVzdWx0LFxuICBJcFBvb2xNZXNzYWdlUmVzcG9uc2UsXG4gIElwUG9vbE1lc3NhZ2VSZXN1bHQsXG4gIElwUG9vbFVwZGF0ZURhdGEsXG59IGZyb20gJy4uL1R5cGVzL0lQUG9vbHMnO1xuaW1wb3J0IHsgSUlQUG9vbHNDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXBQb29sc0NsaWVudCBpbXBsZW1lbnRzIElJUFBvb2xzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QoKTogUHJvbWlzZTxJcFBvb2xMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92MS9pcF9wb29scycpXG4gICAgICAudGhlbigocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZSkpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKGRhdGE6IElwUG9vbENyZWF0ZURhdGEpOiBQcm9taXNlPElwUG9vbENyZWF0ZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJcFBvb2xDcmVhdGVSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjEvaXBfcG9vbHMnLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sVXBkYXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJcFBvb2xNZXNzYWdlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucGF0Y2hXaXRoRkQoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sRGVsZXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOklwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5kZWxldGUoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJcFBvb2xzUmVzcG9uc2UocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSk6IElwUG9vbExpc3RSZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgTWdSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSXBEYXRhLCBJUHNMaXN0UXVlcnksIElwc0xpc3RSZXNwb25zZUJvZHkgfSBmcm9tICcuLi9UeXBlcy9JUHMnO1xuaW1wb3J0IHsgSUlQc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcHNDbGllbnQgaW1wbGVtZW50cyBJSVBzQ2xpZW50IHtcbiAgcmVxdWVzdDogTWdSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IE1nUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5PzogSVBzTGlzdFF1ZXJ5KTogUHJvbWlzZTxJcHNMaXN0UmVzcG9uc2VCb2R5PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvaXBzJywgcXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnBhcnNlSXBzUmVzcG9uc2U8SXBzTGlzdFJlc3BvbnNlQm9keT4ocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgZ2V0KGlwOiBzdHJpbmcpOiBQcm9taXNlPElwRGF0YT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3YzL2lwcy8ke2lwfWApO1xuICAgIHJldHVybiB0aGlzLnBhcnNlSXBzUmVzcG9uc2U8SXBEYXRhPihyZXNwb25zZSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlSXBzUmVzcG9uc2U8VD4ocmVzcG9uc2U6IHsgYm9keTogVCB9KTogVCB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQXBpUmVzcG9uc2UsXG4gIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNSZXN1bHQsXG4gIEluYm94UGxhY2VtZW50c1ZhbHVlc0FwaVJlc3BvbnNlLFxuICBJbmJveFBsYWNlbWVudHNWYWx1ZXNSZXN1bHRcbn0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCBpbXBsZW1lbnRzIElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgcGF0aDogc3RyaW5nXG4gICkge1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHRoaXMucGF0aCkgYXMgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0FwaVJlc3BvbnNlO1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgIH0gYXMgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc1Jlc3VsdDtcbiAgfVxuXG4gIGFzeW5jIGdldChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1ZhbHVlc1Jlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLnBhdGh9LyR7YXR0cmlidXRlTmFtZX1gKSBhcyBJbmJveFBsYWNlbWVudHNWYWx1ZXNBcGlSZXNwb25zZTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ucmVzcG9uc2UuYm9keSxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0FwaVJlc3BvbnNlLCBJbmJveFBsYWNlbWVudHNGaWx0ZXJzUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQgaW1wbGVtZW50cyBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIHBhdGg6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gIH1cblxuICBhc3luYyBsaXN0KCk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzRmlsdGVyc1Jlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQodGhpcy5wYXRoKSBhcyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQXBpUmVzcG9uc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzdWx0LnN0YXR1cyxcbiAgICAgIHN1cHBvcnRlZF9maWx0ZXJzOiByZXN1bHQuYm9keS5zdXBwb3J0ZWRfZmlsdGVyc1xuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIElJUFJTaGFyaW5nQ2xpZW50LFxuICBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCxcbiAgSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQsXG4gIElJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LFxuICBJTG9nZ2VyXG59IGZyb20gJy4uLy4uLy4uL0ludGVyZmFjZXMnO1xuXG5pbXBvcnQge1xuICBJbmJveFBsYWNlbWVudHNCb3gsXG4gIEluYm94UGxhY2VtZW50c0Rlc3Ryb3lBUElSZXNwb25zZSxcbiAgSW5ib3hQbGFjZW1lbnRzRGVzdHJveVJlc3VsdCxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0LFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRBUElSZXNwb25zZSxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJU2hhcGUsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdFdpdGhTdGF0dXMsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdHNBcGlRdWVyeSxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0RhdGVzLFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdCxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3RBUElSZXNwb25zZSxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1F1ZXJ5XG59IGZyb20gJy4uLy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5cbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uLy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uLy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8SW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3Q+XG4gIGltcGxlbWVudHMgSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgYXR0cmlidXRlczogSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQ7XG4gIHB1YmxpYyBmaWx0ZXJzOiBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudDtcbiAgcHVibGljIHNoYXJpbmc6IElJUFJTaGFyaW5nQ2xpZW50O1xuICBwcml2YXRlIGxvZ2dlcjogSUxvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIGF0dHJpYnV0ZXM6IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50LFxuICAgIGZpbHRlcnM6IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50LFxuICAgIHNoYXJpbmc6IElJUFJTaGFyaW5nQ2xpZW50LFxuICAgIGxvZ2dlcjogSUxvZ2dlciA9IGNvbnNvbGVcbiAgKSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgIHRoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgdGhpcy5zaGFyaW5nID0gc2hhcmluZztcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydERhdGVUb1VUQyhrZXk6c3RyaW5nLCBpbnB1dERhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIC8qXG4gICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAqL1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYERhdGU6IFwiJHtpbnB1dERhdGV9XCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXG5WYWx1ZSBcIiR7aW5wdXREYXRlLnRvSVNPU3RyaW5nKCl9XCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nYCk7XG4gICAgcmV0dXJuIGlucHV0RGF0ZS50b0lTT1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUXVlcnlEYXRhKFxuICAgIHF1ZXJ5RGF0YTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1F1ZXJ5XG4gICk6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNBcGlRdWVyeSB7XG4gICAgY29uc3QgcHJvcHNGb3JSZXBsYWNlbWVudCA9IHF1ZXJ5RGF0YSBhcyBJbmJveFBsYWNlbWVudHNSZXN1bHRzRGF0ZXM7XG4gICAgY29uc3QgcmVwbGFjZWRQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzRm9yUmVwbGFjZW1lbnQpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHByb3AgPSBrZXkgYXMga2V5b2YgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0RhdGVzO1xuICAgICAgaWYgKCEhcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSAmJiB0eXBlb2YgcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBxdWVyeURhdGFbcHJvcF0gYXMgRGF0ZTtcbiAgICAgICAgYWNjW3Byb3BdID0gdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKHByb3AsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgUmVjb3JkPGtleW9mIEluYm94UGxhY2VtZW50c1Jlc3VsdHNEYXRlcywgc3RyaW5nPik7XG5cbiAgICBjb25zdCByZXN1bHQ6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNBcGlRdWVyeSA9IHtcbiAgICAgIC4uLnF1ZXJ5RGF0YSxcbiAgICAgIC4uLnJlcGxhY2VkUHJvcHNcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQoZGF0YTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJU2hhcGUpOiBJbmJveFBsYWNlbWVudHNSZXN1bHQge1xuICAgIGxldCBib3ggPSB7fSBhcyBJbmJveFBsYWNlbWVudHNCb3g7XG5cbiAgICBjb25zdCBoYW5kbGVkU2VlZExpc3REYXRlcyA9IHtcbiAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCksXG4gICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLnVwZGF0ZWRfYXQpLFxuICAgICAgc2hhcmluZ19leHBpcmVzX2F0OiBuZXcgRGF0ZShkYXRhLnNoYXJpbmdfZXhwaXJlc19hdCksXG4gICAgfTtcblxuICAgIGlmIChkYXRhLkJveCkge1xuICAgICAgYm94ID0ge1xuICAgICAgICAuLi5kYXRhLkJveCxcbiAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5Cb3guY3JlYXRlZF9hdCksXG4gICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuQm94LnVwZGF0ZWRfYXQpLFxuICAgICAgICBsYXN0X3Jlc3VsdF9hdDogbmV3IERhdGUoZGF0YS5Cb3gubGFzdF9yZXN1bHRfYXQpLFxuICAgICAgfTtcbiAgICAgIGRlbGV0ZSAoYm94IGFzIHtJRD86IHN0cmluZ30pLklEO1xuICAgIH1cblxuICAgIGNvbnN0IGluYm94UGxhY2VtZW50c1Jlc3VsdDogSW5ib3hQbGFjZW1lbnRzUmVzdWx0ID0ge1xuICAgICAgLi4uZGF0YSxcbiAgICAgIEJveDogYm94LFxuICAgICAgLi4uaGFuZGxlZFNlZWRMaXN0RGF0ZXMsXG4gICAgICBpZDogZGF0YS5JZCxcbiAgICB9O1xuXG4gICAgZGVsZXRlIChpbmJveFBsYWNlbWVudHNSZXN1bHQgYXMge0lEPzogc3RyaW5nfSkuSUQ7XG5cbiAgICByZXR1cm4gaW5ib3hQbGFjZW1lbnRzUmVzdWx0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3RBUElSZXNwb25zZSk6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3Q7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoXG4gICAgICAoaXRlbTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJU2hhcGUpXG4gICAgICAgIDogSW5ib3hQbGFjZW1lbnRzUmVzdWx0ID0+IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChpdGVtKVxuICAgICk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5OiBJbmJveFBsYWNlbWVudHNSZXN1bHRzUXVlcnkpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0PiB7XG4gICAgY29uc3QgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnlEYXRhKHF1ZXJ5KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92NC9pbmJveC9yZXN1bHRzJywgcXVlcnlEYXRhKSBhcyBJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdEFQSVJlc3BvbnNlO1xuICAgIHJldHVybiB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUmVzdWx0V2l0aFN0YXR1cz4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJbmJveFBsYWNlbWVudHNSZXN1bHRBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9yZXN1bHRzLyR7aWR9YCkgYXMgSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJUmVzcG9uc2U7XG4gICAgY29uc3QgaW5ib3hQbGFjZW1lbnRSZXN1bHQ6IEluYm94UGxhY2VtZW50c1Jlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChcbiAgICAgIHJlc3BvbnNlLmJvZHkucmVzdWx0XG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBpbmJveFBsYWNlbWVudFJlc3VsdFxuICAgIH07XG4gIH1cblxuICBhc3luYyBkZXN0cm95KGlkOiBzdHJpbmcpIDogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNEZXN0cm95UmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjQvaW5ib3gvcmVzdWx0cy8ke2lkfWApIGFzIEluYm94UGxhY2VtZW50c0Rlc3Ryb3lBUElSZXNwb25zZTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldFJlc3VsdEJ5U2hhcmVJZChzaGFyZUlkOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Jlc3VsdFdpdGhTdGF0dXM+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9zaGFyaW5nL3B1YmxpYy8ke3NoYXJlSWR9YCkgYXMgSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJUmVzcG9uc2U7XG4gICAgY29uc3QgaW5ib3hQbGFjZW1lbnRSZXN1bHQ6IEluYm94UGxhY2VtZW50c1Jlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChcbiAgICAgIHJlc3BvbnNlLmJvZHkucmVzdWx0XG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBpbmJveFBsYWNlbWVudFJlc3VsdFxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IElJUFJTaGFyaW5nQ2xpZW50IH0gZnJvbSAnLi4vLi4vLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBJUFJTaGFyaW5nQVBJUmVzcG9uc2UsXG4gIElQUlNoYXJpbmdBcGlTaGFwZSxcbiAgSVBSU2hhcmluZ1Jlc3VsdCxcbiAgSVBSU2hhcmluZ1VwZGF0ZUFQSVJlc3BvbnNlLFxuICBJUFJTaGFyaW5nVXBkYXRlRGF0YSxcbiAgSVBSU2hhcmluZ1VwZGF0ZVJlc3VsdFxufSBmcm9tICcuLi8uLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJUFJTaGFyaW5nQ2xpZW50IGltcGxlbWVudHMgSUlQUlNoYXJpbmdDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHRTaGFyaW5nKGRhdGE6IElQUlNoYXJpbmdBcGlTaGFwZSk6IElQUlNoYXJpbmdSZXN1bHQge1xuICAgIGNvbnN0IGhhbmRsZWRTZWVkTGlzdERhdGVzID0ge1xuICAgICAgZXhwaXJlc19hdDogbmV3IERhdGUoZGF0YS5leHBpcmVzX2F0KSxcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0OiBJUFJTaGFyaW5nUmVzdWx0ID0ge1xuICAgICAgLi4uZGF0YSxcbiAgICAgIC4uLmhhbmRsZWRTZWVkTGlzdERhdGVzXG4gICAgfTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhc3luYyBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8SVBSU2hhcmluZ1Jlc3VsdCAmIHtzdGF0dXM6IG51bWJlcn0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9zaGFyaW5nLyR7aWR9YCkgYXMgSVBSU2hhcmluZ0FQSVJlc3BvbnNlO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmcocmVzcG9uc2UuYm9keS5zaGFyaW5nKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXN1bHRcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgZGF0YTogSVBSU2hhcmluZ1VwZGF0ZURhdGFcbiAgKTogUHJvbWlzZTxJUFJTaGFyaW5nVXBkYXRlUmVzdWx0ICYgeyBzdGF0dXM6IG51bWJlciB9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucHV0KGAvdjQvaW5ib3gvc2hhcmluZy8ke2lkfWAsIHt9LCB7IHF1ZXJ5OiBgZW5hYmxlZD0ke2RhdGEuZW5hYmxlZH1gIH0pIGFzIElQUlNoYXJpbmdVcGRhdGVBUElSZXNwb25zZTtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHRTaGFyaW5nKHJlc3BvbnNlLmJvZHkuc2hhcmluZyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJlc3VsdCxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSUxvZ2dlcixcbiAgSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQsXG4gIElTZWVkc0xpc3RzQ2xpZW50LFxuICBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudFxufSBmcm9tICcuLi8uLi8uLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIFNlZWRMaXN0LFxuICBTZWVkTGlzdEFQSVNoYXBlLFxuICBTZWVkc0xpc3RzQVBJUXVlcnksXG4gIFNlZWRzTGlzdHNBUElRdWVyeURhdGVzLFxuICBTZWVkc0xpc3RzQVBJUmVzcG9uc2UsXG4gIFNlZWRzTGlzdHNDcmVhdGluZ0RhdGEsXG4gIFNlZWRzTGlzdHNRdWVyeSxcbiAgU2VlZHNMaXN0c1Jlc3VsdCxcbiAgU2VlZCxcbiAgU2VlZEFQSVNoYXBlLFxuICBTZWVkc0xpc3RzRGVzdHJveUFwaVJlc3BvbnNlLFxuICBTZWVkc0xpc3RzVXBkYXRpbmdEYXRhLFxuICBTZWVkTGlzdFJlc3VsdCxcbiAgU2VlZExpc3RHZXRBUElSZXNwb25zZSxcbiAgU2VlZExpc3RBUElSZXNwb25zZVxufSBmcm9tICcuLi8uLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWVkc0xpc3RzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxTZWVkc0xpc3RzUmVzdWx0PlxuICBpbXBsZW1lbnRzIElTZWVkc0xpc3RzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHVibGljIGF0dHJpYnV0ZXM6IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50O1xuICBwdWJsaWMgZmlsdGVyczogSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQ7XG4gIHByaXZhdGUgbG9nZ2VyOiBJTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgYXR0cmlidXRlczogSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQsXG4gICAgZmlsdGVyczogSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQsXG4gICAgbG9nZ2VyOiBJTG9nZ2VyID0gY29uc29sZVxuICApIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgdGhpcy5maWx0ZXJzID0gZmlsdGVycztcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydERhdGVUb1VUQyhrZXk6c3RyaW5nLCBpbnB1dERhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIC8qXG4gICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAqL1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYERhdGU6IFwiJHtpbnB1dERhdGV9XCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXG5WYWx1ZSBcIiR7aW5wdXREYXRlLnRvSVNPU3RyaW5nKCl9XCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nYCk7XG4gICAgcmV0dXJuIGlucHV0RGF0ZS50b0lTT1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUXVlcnlEYXRhKHF1ZXJ5RGF0YTogU2VlZHNMaXN0c1F1ZXJ5KSA6IFNlZWRzTGlzdHNBUElRdWVyeSB7XG4gICAgY29uc3QgcHJvcHNGb3JSZXBsYWNlbWVudCA9IHF1ZXJ5RGF0YSBhcyBTZWVkc0xpc3RzQVBJUXVlcnlEYXRlcztcbiAgICBjb25zdCByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IGtleSBhcyBrZXlvZiBTZWVkc0xpc3RzQVBJUXVlcnlEYXRlcztcbiAgICAgIGlmICghIXByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gJiYgdHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcXVlcnlEYXRhW3Byb3BdIGFzIERhdGU7XG4gICAgICAgIGFjY1twcm9wXSA9IHRoaXMuY29udmVydERhdGVUb1VUQyhwcm9wLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9IGFzIFJlY29yZDxrZXlvZiBTZWVkc0xpc3RzQVBJUXVlcnlEYXRlcywgc3RyaW5nPik7XG5cbiAgICBjb25zdCByZXN1bHQ6IFNlZWRzTGlzdHNBUElRdWVyeSA9IHtcbiAgICAgIC4uLnF1ZXJ5RGF0YSxcbiAgICAgIC4uLnJlcGxhY2VkUHJvcHNcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVSZXN1bHQoZGF0YTogU2VlZExpc3RBUElSZXNwb25zZSk6IFNlZWRMaXN0UmVzdWx0IHtcbiAgICBsZXQgcmVzdWx0ID0ge30gYXMgU2VlZExpc3RSZXN1bHQ7XG4gICAgY29uc3Qgc2VlZExpc3QgPSB0aGlzLnByZXBhcmVTZWVkTGlzdChkYXRhLmJvZHkpO1xuICAgIHJlc3VsdCA9IHtcbiAgICAgIC4uLnNlZWRMaXN0LFxuICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1c1xuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVNlZWRMaXN0KGRhdGE6IFNlZWRMaXN0QVBJU2hhcGUpOiBTZWVkTGlzdCB7XG4gICAgbGV0IHNlZWRzOiBTZWVkW10gfCBudWxsO1xuXG4gICAgY29uc3QgaGFuZGxlZFNlZWRMaXN0RGF0ZXMgPSB7XG4gICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpLFxuICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoZGF0YS51cGRhdGVkX2F0KSxcbiAgICAgIGxhc3RfcmVzdWx0X2F0OiBuZXcgRGF0ZShkYXRhLmxhc3RfcmVzdWx0X2F0KSxcbiAgICB9O1xuXG4gICAgaWYgKGRhdGEuU2VlZHMpIHtcbiAgICAgIHNlZWRzID0gZGF0YS5TZWVkcy5tYXAoKHNlZWRJdGVtOiBTZWVkQVBJU2hhcGUpOiBTZWVkID0+IHtcbiAgICAgICAgbGV0IHNlZWQgPSB7fSBhcyBTZWVkO1xuICAgICAgICBjb25zdCBoYW5kbGVkU2VlZERhdGVzID0ge1xuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLmNyZWF0ZWRfYXQpLFxuICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLnVwZGF0ZWRfYXQpLFxuICAgICAgICAgIG1heF9lbWFpbF9jb3VudF9oaXRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLm1heF9lbWFpbF9jb3VudF9oaXRfYXQpLFxuICAgICAgICAgIGxhc3Rfc2VudF90b19hdDogbmV3IERhdGUoc2VlZEl0ZW0ubGFzdF9zZW50X3RvX2F0KSxcbiAgICAgICAgICBsYXN0X2RlbGl2ZXJlZF9hdDogbmV3IERhdGUoc2VlZEl0ZW0ubGFzdF9kZWxpdmVyZWRfYXQpLFxuICAgICAgICB9O1xuICAgICAgICBzZWVkID0ge1xuICAgICAgICAgIC4uLnNlZWRJdGVtLFxuICAgICAgICAgIC4uLmhhbmRsZWRTZWVkRGF0ZXNcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHNlZWQ7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VlZHMgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNlZWRMaXN0OiBTZWVkTGlzdCA9IHtcbiAgICAgIC4uLmRhdGEsXG4gICAgICBTZWVkczogc2VlZHMsXG4gICAgICAuLi5oYW5kbGVkU2VlZExpc3REYXRlc1xuICAgIH07XG5cbiAgICBkZWxldGUgKHNlZWRMaXN0IGFzIHtJZD86IHN0cmluZ30pLklkO1xuXG4gICAgcmV0dXJuIHNlZWRMaXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogU2VlZHNMaXN0c0FQSVJlc3BvbnNlKTogU2VlZHNMaXN0c1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGl0ZW1zOiBbXVxuICAgIH0gYXMgU2VlZHNMaXN0c1Jlc3VsdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zPy5tYXAoXG4gICAgICAoaXRlbTogU2VlZExpc3RBUElTaGFwZSk6IFNlZWRMaXN0ID0+IHRoaXMucHJlcGFyZVNlZWRMaXN0KGl0ZW0pXG4gICAgKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk6IFNlZWRzTGlzdHNRdWVyeSk6IFByb21pc2U8U2VlZHNMaXN0c1Jlc3VsdD4ge1xuICAgIGNvbnN0IHF1ZXJ5RGF0YSA9IHRoaXMucHJlcGFyZVF1ZXJ5RGF0YShxdWVyeSk7XG4gICAgY29uc3QgcmVzcG9uc2U6IFNlZWRzTGlzdHNBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92NC9pbmJveC9zZWVkbGlzdHMnLCBxdWVyeURhdGEpIGFzIFNlZWRzTGlzdHNBUElSZXNwb25zZTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5wYXJzZUxpc3QocmVzcG9uc2UpLFxuICAgICAgc3RhdHVzOiAyMDBcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFNlZWRMaXN0UmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IFNlZWRMaXN0R2V0QVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjQvaW5ib3gvc2VlZGxpc3RzLyR7aWR9YCkgYXMgU2VlZExpc3RHZXRBUElSZXNwb25zZTtcbiAgICBjb25zdCB1cGRhdGVkU2VlZHNMaXN0ID0gdGhpcy5wcmVwYXJlU2VlZExpc3QocmVzcG9uc2UuYm9keS5zZWVkbGlzdCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnVwZGF0ZWRTZWVkc0xpc3QsXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH07XG4gIH1cblxuICBhc3luYyBjcmVhdGUoZGF0YTogU2VlZHNMaXN0c0NyZWF0aW5nRGF0YSk6IFByb21pc2U8U2VlZExpc3RSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjQvaW5ib3gvc2VlZGxpc3RzJywgZGF0YSkgYXMgU2VlZExpc3RBUElSZXNwb25zZTtcbiAgICByZXR1cm4gdGhpcy5wcmVwYXJlUmVzdWx0KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBTZWVkc0xpc3RzVXBkYXRpbmdEYXRhKTogUHJvbWlzZTxTZWVkTGlzdFJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnB1dChgL3Y0L2luYm94L3NlZWRsaXN0cy8ke2lkfWAsIGRhdGEpIGFzIFNlZWRMaXN0QVBJUmVzcG9uc2U7XG4gICAgcmV0dXJuIHRoaXMucHJlcGFyZVJlc3VsdChyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBkZXN0cm95KGlkOiBzdHJpbmcpOiBQcm9taXNlPFNlZWRzTGlzdHNEZXN0cm95QXBpUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2luYm94L3NlZWRsaXN0cy8ke2lkfWApIGFzIHVua25vd24gYXMgU2VlZHNMaXN0c0Rlc3Ryb3lBcGlSZXNwb25zZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c0NsaWVudCwgSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7IElTZWVkc0xpc3RzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50JztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzJztcbmltcG9ydCB7IEluYm94UGxhY2VtZW50c0RhdGEsIEluYm94UGxhY2VtZW50c1Rlc3RSZXN1bHQsIEluYm94UGxhY2VtZW50c1Rlc3RSZXN1bHRBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94UGxhY2VtZW50c0NsaWVudCBpbXBsZW1lbnRzIElJbmJveFBsYWNlbWVudHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgc2VlZHNMaXN0czogSVNlZWRzTGlzdHNDbGllbnQ7XG4gIHB1YmxpYyByZXN1bHRzOiBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudDtcbiAgcHVibGljIHByb3ZpZGVyczogSUluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIHNlZWRzTGlzdHNDbGllbnQ6IElTZWVkc0xpc3RzQ2xpZW50LFxuICAgIHJlc3VsdHM6IElJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LFxuICAgIHByb3ZpZGVyczogSUluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuc2VlZHNMaXN0cyA9IHNlZWRzTGlzdHNDbGllbnQ7XG4gICAgdGhpcy5zZWVkc0xpc3RzID0gc2VlZHNMaXN0c0NsaWVudDtcbiAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgIHRoaXMucHJvdmlkZXJzID0gcHJvdmlkZXJzO1xuICB9XG5cbiAgYXN5bmMgcnVuVGVzdChkYXRhOiBJbmJveFBsYWNlbWVudHNEYXRhKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNUZXN0UmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdCgnL3Y0L2luYm94L3Rlc3RzJywgZGF0YSkgYXMgSW5ib3hQbGFjZW1lbnRzVGVzdFJlc3VsdEFQSVJlc3BvbnNlO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5yZXNwb25zZS5ib2R5LFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IH0gZnJvbSAnLi4vLi4vLi4vSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvcHJvdmlkZXJzL0luYm94UGxhY2VtZW50c1Byb3ZpZGVycyc7XG5pbXBvcnQge1xuICBJbmJveFBsYWNlbWVudHNQcm92aWRlcixcbiAgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJBUElTaGFwZSxcbiAgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdCxcbiAgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdEFQSVJlc3BvbnNlXG59IGZyb20gJy4uLy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi8uLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCBpbXBsZW1lbnRzIElJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgKSB7XG4gICAgdGhpcy5wYXRoID0gJy92NC9pbmJveC9wcm92aWRlcnMnO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdEFQSVJlc3BvbnNlXG4gICk6IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNMaXN0O1xuXG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKFxuICAgICAgKGl0ZW06IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyQVBJU2hhcGUpOiBJbmJveFBsYWNlbWVudHNQcm92aWRlciA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZWRQcm92aWRlckRhdGVzID0ge1xuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGl0ZW0uY3JlYXRlZF9hdCksXG4gICAgICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoaXRlbS51cGRhdGVkX2F0KSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBJbmJveFBsYWNlbWVudHNQcm92aWRlciA9IHtcbiAgICAgICAgICAuLi5pdGVtLFxuICAgICAgICAgIC4uLmhhbmRsZWRQcm92aWRlckRhdGVzXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgKTtcblxuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KCk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCh0aGlzLnBhdGgpIGFzIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0xpc3RBUElSZXNwb25zZTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgTWFpbGd1bkNsaWVudE9wdGlvbnMsIElucHV0Rm9ybURhdGEsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi4vVHlwZXMnO1xuXG5pbXBvcnQgRG9tYWluc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc0NsaWVudCc7XG5pbXBvcnQgRXZlbnRDbGllbnQgZnJvbSAnLi9FdmVudHMnO1xuaW1wb3J0IFN0YXRzQ2xpZW50IGZyb20gJy4vU3RhdHMvU3RhdHNDbGllbnQnO1xuaW1wb3J0IFN1cHByZXNzaW9uQ2xpZW50IGZyb20gJy4vU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uc0NsaWVudCc7XG5pbXBvcnQgV2ViaG9va3NDbGllbnQgZnJvbSAnLi9XZWJob29rcyc7XG5pbXBvcnQgTWVzc2FnZXNDbGllbnQgZnJvbSAnLi9NZXNzYWdlcyc7XG5pbXBvcnQgUm91dGVzQ2xpZW50IGZyb20gJy4vUm91dGVzJztcbmltcG9ydCBWYWxpZGF0ZUNsaWVudCBmcm9tICcuL1ZhbGlkYXRpb25zL3ZhbGlkYXRlJztcbmltcG9ydCBJcHNDbGllbnQgZnJvbSAnLi9JUHMnO1xuaW1wb3J0IElwUG9vbHNDbGllbnQgZnJvbSAnLi9JUFBvb2xzJztcbmltcG9ydCBNYWlsaW5nTGlzdHNDbGllbnQgZnJvbSAnLi9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzJztcbmltcG9ydCBNYWlsTGlzdHNNZW1iZXJzIGZyb20gJy4vTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycyc7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNDcmVkZW50aWFscyc7XG5pbXBvcnQgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGZyb20gJy4vVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUYWdzJztcbmltcG9ydCBTdWJhY2NvdW50c0NsaWVudCBmcm9tICcuL1N1YmFjY291bnRzJztcblxuaW1wb3J0IHtcbiAgSURvbWFpbnNDbGllbnQsXG4gIElXZWJIb29rc0NsaWVudCxcbiAgSU1haWxndW5DbGllbnQsXG4gIElNYWlsaW5nTGlzdHNDbGllbnQsXG4gIElFdmVudENsaWVudCxcbiAgSVN0YXRzQ2xpZW50LFxuICBJU3VwcHJlc3Npb25DbGllbnQsXG4gIElNZXNzYWdlc0NsaWVudCxcbiAgSVJvdXRlc0NsaWVudCxcbiAgSVZhbGlkYXRpb25DbGllbnQsXG4gIElJUHNDbGllbnQsXG4gIElJUFBvb2xzQ2xpZW50LFxuICBJU3ViYWNjb3VudHNDbGllbnQsXG4gIElJbmJveFBsYWNlbWVudHNDbGllbnQsXG59IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuaW1wb3J0IFNlZWRzTGlzdHNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50JztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvaW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9BdHRyaWJ1dGVzQ2xpZW50JztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL0ZpbHRlcnNDbGllbnQnO1xuaW1wb3J0IElQUlNoYXJpbmdDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudCc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL3Byb3ZpZGVycy9JbmJveFBsYWNlbWVudHNQcm92aWRlcnMnO1xuaW1wb3J0IE1ldHJpY3NDbGllbnQgZnJvbSAnLi9NZXRyaWNzL01ldHJpY3NDbGllbnQnO1xuaW1wb3J0IHsgSU1ldHJpY3NDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzL01ldHJpY3MvTWV0cmljc0NsaWVudCc7XG5pbXBvcnQgRG9tYWluVHJhY2tpbmdDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUcmFja2luZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW5DbGllbnQgaW1wbGVtZW50cyBJTWFpbGd1bkNsaWVudCB7XG4gIHByaXZhdGUgcmVxdWVzdDtcblxuICBwdWJsaWMgZG9tYWluczogSURvbWFpbnNDbGllbnQ7XG4gIHB1YmxpYyB3ZWJob29rczogSVdlYkhvb2tzQ2xpZW50O1xuICBwdWJsaWMgZXZlbnRzOiBJRXZlbnRDbGllbnQ7XG4gIHB1YmxpYyBzdGF0czogSVN0YXRzQ2xpZW50O1xuICBwdWJsaWMgbWV0cmljczogSU1ldHJpY3NDbGllbnQ7XG4gIHB1YmxpYyBzdXBwcmVzc2lvbnM6IElTdXBwcmVzc2lvbkNsaWVudDtcbiAgcHVibGljIG1lc3NhZ2VzOiBJTWVzc2FnZXNDbGllbnQ7XG4gIHB1YmxpYyByb3V0ZXM6IElSb3V0ZXNDbGllbnQ7XG4gIHB1YmxpYyB2YWxpZGF0ZTogSVZhbGlkYXRpb25DbGllbnQ7XG4gIHB1YmxpYyBpcHM6IElJUHNDbGllbnQ7XG4gIHB1YmxpYyBpcF9wb29sczogSUlQUG9vbHNDbGllbnQ7XG4gIHB1YmxpYyBsaXN0czogSU1haWxpbmdMaXN0c0NsaWVudDtcbiAgcHVibGljIHN1YmFjY291bnRzOiBJU3ViYWNjb3VudHNDbGllbnQ7XG4gIHB1YmxpYyBpbmJveFBsYWNlbWVudHM6IElJbmJveFBsYWNlbWVudHNDbGllbnQ7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTWFpbGd1bkNsaWVudE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgY29uc3QgY29uZmlnOiBSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub3B0aW9ucyB9IGFzIFJlcXVlc3RPcHRpb25zO1xuXG4gICAgaWYgKCFjb25maWcudXJsKSB7XG4gICAgICBjb25maWcudXJsID0gJ2h0dHBzOi8vYXBpLm1haWxndW4ubmV0JztcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy51c2VybmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJ1c2VybmFtZVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcua2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcImtleVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHRoaXMucmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGNvbmZpZywgZm9ybURhdGEpO1xuICAgIGNvbnN0IG1haWxMaXN0c01lbWJlcnMgPSBuZXcgTWFpbExpc3RzTWVtYmVycyh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50ID0gbmV3IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluVGVtcGxhdGVzQ2xpZW50ID0gbmV3IERvbWFpblRlbXBsYXRlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpblRhZ3NDbGllbnQgPSBuZXcgRG9tYWluVGFnc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpblRyYWNraW5nQ2xpZW50ID0gbmV3IERvbWFpblRyYWNraW5nQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50ID0gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IEluYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50ID0gbmV3IElQUlNoYXJpbmdDbGllbnQodGhpcy5yZXF1ZXN0KTtcblxuICAgIGNvbnN0IHNlZWRzTGlzdHNBdHRyaWJ1dGVzID0gbmV3IEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3NlZWRsaXN0cy9hJyk7XG4gICAgY29uc3QgcmVzdWx0c0F0dHJpYnV0ZXNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvcmVzdWx0cy9hJyk7XG5cbiAgICBjb25zdCBzZWVkc0xpc3RzRmlsdGVyc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9zZWVkbGlzdHMvX2ZpbHRlcnMnKTtcbiAgICBjb25zdCByZXN1bHRzRmlsdGVyc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9yZXN1bHRzL19maWx0ZXJzJyk7XG5cbiAgICBjb25zdCBzZWVkc0xpc3RzQ2xpZW50ID0gbmV3IFNlZWRzTGlzdHNDbGllbnQoXG4gICAgICB0aGlzLnJlcXVlc3QsXG4gICAgICBzZWVkc0xpc3RzQXR0cmlidXRlcyxcbiAgICAgIHNlZWRzTGlzdHNGaWx0ZXJzQ2xpZW50XG4gICAgKTtcblxuICAgIGNvbnN0IGluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudChcbiAgICAgIHRoaXMucmVxdWVzdCxcbiAgICAgIHJlc3VsdHNBdHRyaWJ1dGVzQ2xpZW50LFxuICAgICAgcmVzdWx0c0ZpbHRlcnNDbGllbnQsXG4gICAgICBJbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudFxuICAgICk7XG5cbiAgICBjb25zdCBpbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0XG4gICAgKTtcblxuICAgIHRoaXMuZG9tYWlucyA9IG5ldyBEb21haW5zQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0LFxuICAgICAgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgICBkb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgICBkb21haW5UYWdzQ2xpZW50LFxuICAgICAgZG9tYWluVHJhY2tpbmdDbGllbnRcbiAgICApO1xuICAgIHRoaXMud2ViaG9va3MgPSBuZXcgV2ViaG9va3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudENsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLm1ldHJpY3MgPSBuZXcgTWV0cmljc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuc3VwcHJlc3Npb25zID0gbmV3IFN1cHByZXNzaW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5tZXNzYWdlcyA9IG5ldyBNZXNzYWdlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMucm91dGVzID0gbmV3IFJvdXRlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuaXBzID0gbmV3IElwc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuaXBfcG9vbHMgPSBuZXcgSXBQb29sc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMubGlzdHMgPSBuZXcgTWFpbGluZ0xpc3RzQ2xpZW50KHRoaXMucmVxdWVzdCwgbWFpbExpc3RzTWVtYmVycyk7XG4gICAgdGhpcy52YWxpZGF0ZSA9IG5ldyBWYWxpZGF0ZUNsaWVudCh0aGlzLnJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCk7XG4gICAgdGhpcy5zdWJhY2NvdW50cyA9IG5ldyBTdWJhY2NvdW50c0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuaW5ib3hQbGFjZW1lbnRzID0gbmV3IEluYm94UGxhY2VtZW50c0NsaWVudChcbiAgICAgIHRoaXMucmVxdWVzdCxcbiAgICAgIHNlZWRzTGlzdHNDbGllbnQsXG4gICAgICBpbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LFxuICAgICAgaW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50LFxuICAgICk7XG4gIH1cblxuICBzZXRTdWJhY2NvdW50KHN1YmFjY291bnRJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0Py5zZXRTdWJhY2NvdW50SGVhZGVyKHN1YmFjY291bnRJZCk7XG4gIH1cblxuICByZXNldFN1YmFjY291bnQoKTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0Py5yZXNldFN1YmFjY291bnRIZWFkZXIoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgTWFpbExpc3RNZW1iZXJzUXVlcnksXG4gIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyxcbiAgTWFpbExpc3RNZW1iZXIsXG4gIE11bHRpcGxlTWVtYmVyc0RhdGEsXG4gIE11bHRpcGxlTWVtYmVyc1JlcURhdGEsXG4gIERlbGV0ZWRNZW1iZXIsXG4gIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1JlcSxcbiAgTmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2UsXG4gIE1haWxMaXN0TWVtYmVyc1Jlc3VsdCxcbiAgTWFpbExpc3RNZW1iZXJzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvTWFpbGluZ0xpc3RzJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IElNYWlsTGlzdHNNZW1iZXJzIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsTGlzdHNNZW1iZXJzXG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxNYWlsTGlzdE1lbWJlcnNSZXN1bHQ+XG4gIGltcGxlbWVudHMgSU1haWxMaXN0c01lbWJlcnMge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0FuZFVwZGF0ZURhdGEoZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzKSB7XG4gICAgY29uc3QgbmV3RGF0YSA9IHsgLi4uZGF0YSB9O1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhLnZhcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBuZXdEYXRhLnZhcnMgPSBKU09OLnN0cmluZ2lmeShuZXdEYXRhLnZhcnMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YS5zdWJzY3JpYmVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIG5ld0RhdGEuc3Vic2NyaWJlZCA9IGRhdGEuc3Vic2NyaWJlZCA/ICd5ZXMnIDogJ25vJztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RGF0YSBhcyBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXE7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBNYWlsTGlzdE1lbWJlcnNSZXNwb25zZSxcbiAgKTogTWFpbExpc3RNZW1iZXJzUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTWFpbExpc3RNZW1iZXJzUmVzdWx0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3RNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIHF1ZXJ5PzogTWFpbExpc3RNZW1iZXJzUXVlcnlcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcnNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyhgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvcGFnZXNgLCBxdWVyeSk7XG4gIH1cblxuICBnZXRNZW1iZXIobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBjcmVhdGVNZW1iZXIoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzXG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICBjb25zdCByZXFEYXRhID0gdGhpcy5jaGVja0FuZFVwZGF0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVyc2AsIHJlcURhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGNyZWF0ZU1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVNZW1iZXJzRGF0YVxuICApOiBQcm9taXNlPE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgbmV3RGF0YTogTXVsdGlwbGVNZW1iZXJzUmVxRGF0YSA9IHtcbiAgICAgIG1lbWJlcnM6IEFycmF5LmlzQXJyYXkoZGF0YS5tZW1iZXJzKSA/IEpTT04uc3RyaW5naWZ5KGRhdGEubWVtYmVycykgOiBkYXRhLm1lbWJlcnMsXG4gICAgICB1cHNlcnQ6IGRhdGEudXBzZXJ0XG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMuanNvbmAsIG5ld0RhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgTmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2UpO1xuICB9XG5cbiAgdXBkYXRlTWVtYmVyKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1xuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgY29uc3QgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gLCByZXFEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBkZXN0cm95TWVtYmVyKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZykgOiBQcm9taXNlPERlbGV0ZWRNZW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBEZWxldGVkTWVtYmVyKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgTGlzdHNRdWVyeSxcbiAgQ3JlYXRlVXBkYXRlTGlzdCxcbiAgRGVzdHJveWVkTGlzdCxcbiAgTWFpbGluZ0xpc3QsXG4gIE1haWxpbmdMaXN0VmFsaWRhdGlvbkFwaVJlc3BvbnNlLFxuICBTdGFydFZhbGlkYXRpb25SZXN1bHQsXG4gIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdCxcbiAgTWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0LFxuICBNYWlsaW5nTGlzdFJlc3VsdCxcbiAgTWFpbGluZ0xpc3RBcGlSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9NYWlsaW5nTGlzdHMnO1xuaW1wb3J0IHsgSU1haWxMaXN0c01lbWJlcnMgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cy9NYWlsaW5nTGlzdE1lbWJlcnMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgSU1haWxpbmdMaXN0c0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsaW5nTGlzdHNDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPE1haWxpbmdMaXN0UmVzdWx0PlxuICBpbXBsZW1lbnRzIElNYWlsaW5nTGlzdHNDbGllbnQge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHVibGljIG1lbWJlcnM6IElNYWlsTGlzdHNNZW1iZXJzO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIG1lbWJlcnM6IElNYWlsTGlzdHNNZW1iZXJzKSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgIHRoaXMubWVtYmVycyA9IG1lbWJlcnM7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlVmFsaWRhdGlvblJlc3VsdChcbiAgICBzdGF0dXM6IG51bWJlcixcbiAgICBkYXRhOiBNYWlsaW5nTGlzdFZhbGlkYXRpb25BcGlSZXNwb25zZVxuICApOiBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICB2YWxpZGF0aW9uUmVzdWx0OiB7XG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCAqIDEwMDApIC8vIGFkZCBtaWxsaXNlY29uZCB0byBVbml4IHRpbWVzdGFtcFxuICAgICAgfVxuICAgIH0gYXMgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogTWFpbGluZ0xpc3RBcGlSZXNwb25zZSk6IE1haWxpbmdMaXN0UmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTWFpbGluZ0xpc3RSZXN1bHQ7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk/OiBMaXN0c1F1ZXJ5KTogUHJvbWlzZTxNYWlsaW5nTGlzdFJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKGAke3RoaXMuYmFzZVJvdXRlfS9wYWdlc2AsIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh0aGlzLmJhc2VSb3V0ZSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIHVwZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGRlc3Ryb3kobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3llZExpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBEZXN0cm95ZWRMaXN0KTtcbiAgfVxuXG4gIHZhbGlkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxTdGFydFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWAsIHt9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgICAgfSkgYXMgU3RhcnRWYWxpZGF0aW9uUmVzdWx0KTtcbiAgfVxuXG4gIHZhbGlkYXRpb25SZXN1bHQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXNwb25zZSkgPT4gdGhpcy5wYXJzZVZhbGlkYXRpb25SZXN1bHQoXG4gICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICByZXNwb25zZS5ib2R5IGFzIE1haWxpbmdMaXN0VmFsaWRhdGlvbkFwaVJlc3BvbnNlXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBjYW5jZWxWYWxpZGF0aW9uKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gKHtcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgICAgfSBhcyBNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQpKTtcbiAgfVxufVxuIiwiaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vY29tbW9uL0Vycm9yJztcbmltcG9ydCB7XG4gIE1haWxndW5NZXNzYWdlRGF0YSxcbiAgTWVzc2FnZXNTZW5kQVBJUmVzcG9uc2UsXG4gIE1lc3NhZ2VzU2VuZFJlc3VsdFxufSBmcm9tICcuLi9UeXBlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElNZXNzYWdlc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlc0NsaWVudCBpbXBsZW1lbnRzIElNZXNzYWdlc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVCb29sZWFuVmFsdWVzKGRhdGE6IE1haWxndW5NZXNzYWdlRGF0YSk6IE1haWxndW5NZXNzYWdlRGF0YSB7XG4gICAgY29uc3QgeWVzTm9Qcm9wZXJ0aWVzID0gbmV3IFNldChbXG4gICAgICAnbzp0ZXN0bW9kZScsXG4gICAgICAndDp0ZXh0JyxcbiAgICAgICdvOmRraW0nLFxuICAgICAgJ286dHJhY2tpbmcnLFxuICAgICAgJ286dHJhY2tpbmctY2xpY2tzJyxcbiAgICAgICdvOnRyYWNraW5nLW9wZW5zJyxcbiAgICAgICdvOnJlcXVpcmUtdGxzJyxcbiAgICAgICdvOnNraXAtdmVyaWZpY2F0aW9uJ1xuICAgIF0pO1xuXG4gICAgaWYgKCFkYXRhIHx8IE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignTWVzc2FnZSBkYXRhIG9iamVjdCBjYW4gbm90IGJlIGVtcHR5JywgJ01lc3NhZ2UgZGF0YSBvYmplY3QgY2FuIG5vdCBiZSBlbXB0eScpO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgaWYgKHllc05vUHJvcGVydGllcy5oYXMoa2V5KSAmJiB0eXBlb2YgZGF0YVtrZXldID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgYWNjW2tleV0gPSBkYXRhW2tleV0gPyAneWVzJyA6ICdubyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY2Nba2V5XSA9IGRhdGFba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgTWFpbGd1bk1lc3NhZ2VEYXRhKTtcbiAgfVxuXG4gIF9wYXJzZVJlc3BvbnNlKHJlc3BvbnNlOiBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSk6IE1lc3NhZ2VzU2VuZFJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cblxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IE1haWxndW5NZXNzYWdlRGF0YSk6IFByb21pc2U8TWVzc2FnZXNTZW5kUmVzdWx0PiB7XG4gICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzLm1pbWVgLCBkYXRhKVxuICAgICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2RpZmllZERhdGEgPSB0aGlzLnByZXBhcmVCb29sZWFuVmFsdWVzKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3YzLyR7ZG9tYWlufS9tZXNzYWdlc2AsIG1vZGlmaWVkRGF0YSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlUmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Db21tb24nO1xuaW1wb3J0IHsgSU1ldHJpY3NDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL01ldHJpY3MvTWV0cmljc0NsaWVudCc7XG5pbXBvcnQge1xuICBNZXRyaWNzQVBJUXVlcnksIE1ldHJpY3NBUElSZXNwb25zZSwgTWV0cmljc1F1ZXJ5LCBNZXRyaWNzUmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL01ldHJpY3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXRyaWNzQ2xpZW50IGltcGxlbWVudHMgSU1ldHJpY3NDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwcml2YXRlIGxvZ2dlcjogSUxvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBsb2dnZXI6IElMb2dnZXIgPSBjb25zb2xlKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydERhdGVUb1VUQyhrZXk6c3RyaW5nLCBpbnB1dERhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIC8qXG4gICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAqL1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYERhdGU6XCIke2lucHV0RGF0ZX1cIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cblZhbHVlIFwiJHtpbnB1dERhdGUudG9VVENTdHJpbmcoKX1cIiB3aWxsIGJlIHVzZWQgZm9yIHJlcXVlc3QuXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXCIke2tleX1cIiB0byBhdm9pZCBhdXRvLWNvbnZlcnRpbmdgKTtcbiAgICByZXR1cm4gaW5wdXREYXRlLnRvVVRDU3RyaW5nKCk7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVRdWVyeShxdWVyeTogTWV0cmljc1F1ZXJ5IHwgdW5kZWZpbmVkKTogTWV0cmljc0FQSVF1ZXJ5IHtcbiAgICBsZXQgc3RhcnREYXRlO1xuICAgIGxldCBlbmREYXRlO1xuICAgIGlmIChxdWVyeSkge1xuICAgICAgY29uc3QgcVN0YXJ0ID0gcXVlcnk/LnN0YXJ0O1xuICAgICAgY29uc3QgcUVuZCA9IHF1ZXJ5Py5lbmQ7XG4gICAgICBzdGFydERhdGUgPSBxU3RhcnQgaW5zdGFuY2VvZiBEYXRlID8gdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKCdzdGFydCcsIHFTdGFydCkgOiBxU3RhcnQgPz8gJyc7XG4gICAgICBlbmREYXRlID0gcUVuZCAmJiBxRW5kIGluc3RhbmNlb2YgRGF0ZSA/IHRoaXMuY29udmVydERhdGVUb1VUQygnZW5kJywgcUVuZCkgOiBxRW5kID8/ICcnO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQ6IE1ldHJpY3NBUElRdWVyeSA9IHtcbiAgICAgIC4uLnF1ZXJ5LFxuICAgICAgc3RhcnQ6IHN0YXJ0RGF0ZSxcbiAgICAgIGVuZDogZW5kRGF0ZVxuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlUmVzcG9uc2UocmVzcG9uc2U6IE1ldHJpY3NBUElSZXNwb25zZSk6IE1ldHJpY3NSZXN1bHQge1xuICAgIGNvbnN0IHJlc0JvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IERhdGUucGFyc2UocmVzQm9keS5zdGFydCkgPyBuZXcgRGF0ZShyZXNCb2R5LnN0YXJ0KSA6IG51bGw7XG4gICAgY29uc3QgZW5kRGF0ZSA9IERhdGUucGFyc2UocmVzQm9keS5lbmQpID8gbmV3IERhdGUocmVzQm9keS5lbmQpIDogbnVsbDtcbiAgICBjb25zdCByZXN1bHQ6IE1ldHJpY3NSZXN1bHQgPSB7XG4gICAgICAuLi5yZXNCb2R5LFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBzdGFydDogc3RhcnREYXRlLFxuICAgICAgZW5kOiBlbmREYXRlXG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgYXN5bmMgZ2V0QWNjb3VudChxdWVyeT86IE1ldHJpY3NRdWVyeSk6IFByb21pc2U8TWV0cmljc1Jlc3VsdD4ge1xuICAgIGNvbnN0IHF1ZXJ5RGF0YSA9IHRoaXMucHJlcGFyZVF1ZXJ5KHF1ZXJ5KTtcbiAgICBjb25zdCByZXNwb25zZTogTWV0cmljc0FQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3QoJy92MS9hbmFseXRpY3MvbWV0cmljcycsIHF1ZXJ5RGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2UocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgZ2V0QWNjb3VudFVzYWdlKHF1ZXJ5PzogTWV0cmljc1F1ZXJ5KTogUHJvbWlzZTxNZXRyaWNzUmVzdWx0PiB7XG4gICAgY29uc3QgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnkocXVlcnkpO1xuICAgIGNvbnN0IHJlc3BvbnNlOiBNZXRyaWNzQVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdCgnL3YxL2FuYWx5dGljcy91c2FnZS9tZXRyaWNzJywgcXVlcnlEYXRhKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShyZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElSb3V0ZXNDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSwgRGVzdHJveVJvdXRlUmVzcG9uc2UsIFJvdXRlLCBSb3V0ZXNMaXN0UXVlcnksIFVwZGF0ZVJvdXRlUmVzcG9uc2Vcbn0gZnJvbSAnLi4vVHlwZXMvUm91dGVzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXNDbGllbnQgaW1wbGVtZW50cyBJUm91dGVzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QocXVlcnk6IFJvdXRlc0xpc3RRdWVyeSk6IFByb21pc2U8Um91dGVbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvcm91dGVzJywgcXVlcnkpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkuaXRlbXMpO1xuICB9XG5cbiAgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFJvdXRlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92My9yb3V0ZXMvJHtpZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5LnJvdXRlKTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFJvdXRlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvcm91dGVzJywgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5yb3V0ZSk7XG4gIH1cblxuICB1cGRhdGUoaWQ6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxVcGRhdGVSb3V0ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYC92My9yb3V0ZXMvJHtpZH1gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGRlc3Ryb3koaWQ6IHN0cmluZyk6IFByb21pc2U8RGVzdHJveVJvdXRlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YzL3JvdXRlcy8ke2lkfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBTdGF0c1F1ZXJ5LCBTdGF0c09wdGlvbnMgfSBmcm9tICcuLi8uLi9UeXBlcy9TdGF0cyc7XG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Db21tb24nO1xuaW1wb3J0IFN0YXRzQ29udGFpbmVyIGZyb20gJy4vU3RhdHNDb250YWluZXInO1xuaW1wb3J0IHsgSVN0YXRzQ2xpZW50LCBJU3RhdHNDb250YWluZXIgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N0YXRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHNDbGllbnQgaW1wbGVtZW50cyBJU3RhdHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwcml2YXRlIGxvZ2dlcjogSUxvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBsb2dnZXI6IElMb2dnZXIgPSBjb25zb2xlKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydERhdGVUb1VUQyhrZXk6c3RyaW5nLCBpbnB1dERhdGU6IERhdGUpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAvKlxuICAgICAgQmVjYXVzZSBcIm5ldyBEYXRlKCcyMDIyLTEyLTI1VDAwOjAwOjAwLjAwMFonKVwiIGJlY29tZXMgXCJTdW4gRGVjIDI1IDIwMjIgMDI6MDA6MDAgR01UKzAyMDBcIlxuICAgICAgKHBsdXMgMiBob3VycyBmcm9tIHRoZSB0aW1lem9uZSlcbiAgICAgIGFuZCBiZWNhdXNlIGZvciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XG4gICAgICBleDogJ1RodSwgMTMgT2N0IDIwMTEgMTg6MDI6MDAgKzAwMDAnLlxuICAgICAgSGVyZSB3ZSB0cnkgYXV0by1jb252ZXJ0IHRoZW0gdG8gVVRDXG4gICAgKi9cbiAgICB0aGlzLmxvZ2dlci53YXJuKGBEYXRlOlwiJHtpbnB1dERhdGV9XCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXG5WYWx1ZSBcIiR7aW5wdXREYXRlLnRvVVRDU3RyaW5nKCl9XCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nYCk7XG4gICAgcmV0dXJuIFtrZXksIGlucHV0RGF0ZS50b1VUQ1N0cmluZygpXTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeTogU3RhdHNRdWVyeSB8IHVuZGVmaW5lZCk6IEFycmF5PEFycmF5PHN0cmluZz4+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gW10gYXMgQXJyYXk8QXJyYXk8c3RyaW5nPj47XG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gT2JqZWN0LmVudHJpZXMocXVlcnkpLnJlZHVjZSgoYXJyYXlXaXRoUGFpcnMsIGN1cnJlbnRQYWlyKSA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGN1cnJlbnRQYWlyO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGgpIHsgLy8gZXZlbnQ6IFsnZGVsaXZlcmVkJywgJ2FjY2VwdGVkJ11cbiAgICAgICAgICBjb25zdCByZXBlYXRlZFByb3BlcnR5ID0gdmFsdWUubWFwKChpdGVtKSA9PiBba2V5LCBpdGVtXSk7XG4gICAgICAgICAgcmV0dXJuIFsuLi5hcnJheVdpdGhQYWlycywgLi4ucmVwZWF0ZWRQcm9wZXJ0eV07IC8vIFtbZXZlbnQsZGVsaXZlcmVkXSwgW2V2ZW50LGFjY2VwdGVkXV1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKHRoaXMuY29udmVydERhdGVUb1VUQyhrZXksIHZhbHVlKSk7XG4gICAgICAgICAgcmV0dXJuIGFycmF5V2l0aFBhaXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJyYXlXaXRoUGFpcnM7XG4gICAgICB9LCBbXSBhcyBBcnJheTxBcnJheTxzdHJpbmc+Pik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlYXJjaFBhcmFtcztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VTdGF0cyhyZXNwb25zZTogeyBib2R5OiBTdGF0c09wdGlvbnMgfSk6IElTdGF0c0NvbnRhaW5lciB7XG4gICAgcmV0dXJuIG5ldyBTdGF0c0NvbnRhaW5lcihyZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGdldERvbWFpbihkb21haW46IHN0cmluZywgcXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxJU3RhdHNDb250YWluZXI+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ3N0YXRzL3RvdGFsJyksIHNlYXJjaFBhcmFtcylcbiAgICAgIC50aGVuKHRoaXMucGFyc2VTdGF0cyk7XG4gIH1cblxuICBnZXRBY2NvdW50KHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8SVN0YXRzQ29udGFpbmVyPiB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3N0YXRzL3RvdGFsJywgc2VhcmNoUGFyYW1zKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZVN0YXRzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVN0YXRzQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdGF0cyc7XG5pbXBvcnQgeyBTdGF0LCBTdGF0c09wdGlvbnMgfSBmcm9tICcuLi8uLi9UeXBlcy9TdGF0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQ29udGFpbmVyIGltcGxlbWVudHMgSVN0YXRzQ29udGFpbmVyIHtcbiAgICBzdGFydDogRGF0ZTtcbiAgICBlbmQ6IERhdGU7XG4gICAgcmVzb2x1dGlvbjogc3RyaW5nO1xuICAgIHN0YXRzOiBTdGF0W107XG4gICAgY29uc3RydWN0b3IoZGF0YTogU3RhdHNPcHRpb25zKSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoZGF0YS5zdGFydCk7XG4gICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKGRhdGEuZW5kKTtcbiAgICAgIHRoaXMucmVzb2x1dGlvbiA9IGRhdGEucmVzb2x1dGlvbjtcbiAgICAgIHRoaXMuc3RhdHMgPSBkYXRhLnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdDogU3RhdCkge1xuICAgICAgICBjb25zdCByZXMgPSB7IC4uLnN0YXQgfTtcbiAgICAgICAgcmVzLnRpbWUgPSBuZXcgRGF0ZShzdGF0LnRpbWUpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJU3ViYWNjb3VudHNDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIFN1YmFjY291bnRMaXN0UmVzcG9uc2VEYXRhLFxuICBTdWJhY2NvdW50UmVzcG9uc2VEYXRhLFxuICBTdWJhY2NvdW50c1F1ZXJ5LFxufSBmcm9tICcuLi9UeXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YmFjY291bnRzQ2xpZW50IGltcGxlbWVudHMgSVN1YmFjY291bnRzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgc3RhdGljIFNVQkFDQ09VTlRfSEVBREVSID0gJ1gtTWFpbGd1bi1Pbi1CZWhhbGYtT2YnO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeT86IFN1YmFjY291bnRzUXVlcnkpOiBQcm9taXNlPFN1YmFjY291bnRMaXN0UmVzcG9uc2VEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92NS9hY2NvdW50cy9zdWJhY2NvdW50cycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG5cbiAgZ2V0KGlkOnN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMvJHtpZH1gKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG5cbiAgY3JlYXRlKG5hbWU6c3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMnLCB7IG5hbWUgfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5ib2R5KTtcbiAgfVxuXG4gIGVuYWJsZShpZDpzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoYC92NS9hY2NvdW50cy9zdWJhY2NvdW50cy8ke2lkfS9lbmFibGVgKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG5cbiAgZGlzYWJsZShpZDpzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoYC92NS9hY2NvdW50cy9zdWJhY2NvdW50cy8ke2lkfS9kaXNhYmxlYClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5ib2R5KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJQm91bmNlIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgQm91bmNlRGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvdW5jZSBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSUJvdW5jZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBCb3VuY2VEYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5CT1VOQ0VTKTtcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgIHRoaXMuY29kZSA9ICtkYXRhLmNvZGU7XG4gICAgICB0aGlzLmVycm9yID0gZGF0YS5lcnJvcjtcbiAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJQ29tcGxhaW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgQ29tcGxhaW50RGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBsYWludCBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSUNvbXBsYWludCB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG4gICAgY29uc3RydWN0b3IoZGF0YTogQ29tcGxhaW50RGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuQ09NUExBSU5UUyk7XG4gICAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBwcmVzc2lvbiB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKHR5cGU6IFN1cHByZXNzaW9uTW9kZWxzKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvcic7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgQm91bmNlIGZyb20gJy4vQm91bmNlJztcbmltcG9ydCBDb21wbGFpbnQgZnJvbSAnLi9Db21wbGFpbnQnO1xuaW1wb3J0IFVuc3Vic2NyaWJlIGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuaW1wb3J0IFdoaXRlTGlzdCBmcm9tICcuL1doaXRlTGlzdCc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5pbXBvcnQge1xuICBJQm91bmNlLFxuICBJQ29tcGxhaW50LFxuICBJU3VwcHJlc3Npb25DbGllbnQsXG4gIElVbnN1YnNjcmliZSxcbiAgSVdoaXRlTGlzdFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQge1xuICBTdXBwcmVzc2lvbkxpc3QsXG4gIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbkRhdGFUeXBlLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSxcbiAgU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCxcbiAgU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbkxpc3RRdWVyeSxcbiAgU3VwcHJlc3Npb25SZXNwb25zZSxcbiAgU3VwcHJlc3Npb25EZXN0cm95UmVzdWx0LFxuICBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuXG5jb25zdCBjcmVhdGVPcHRpb25zID0ge1xuICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwcHJlc3Npb25DbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPFN1cHByZXNzaW9uTGlzdD5cbiAgaW1wbGVtZW50cyBJU3VwcHJlc3Npb25DbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBtb2RlbHM6IG9iamVjdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLm1vZGVscyA9IHtcbiAgICAgIGJvdW5jZXM6IEJvdW5jZSxcbiAgICAgIGNvbXBsYWludHM6IENvbXBsYWludCxcbiAgICAgIHVuc3Vic2NyaWJlczogVW5zdWJzY3JpYmUsXG4gICAgICB3aGl0ZWxpc3RzOiBXaGl0ZUxpc3QsXG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YTogU3VwcHJlc3Npb25EYXRhVHlwZSk6XG4gICAgICBJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3RcbiAgICB9XG4gICk6IFN1cHByZXNzaW9uTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIFN1cHByZXNzaW9uTGlzdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcz8ubWFwKChpdGVtKSA9PiBuZXcgTW9kZWwoaXRlbSkpIHx8IFtdO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIF9wYXJzZUl0ZW08VCBleHRlbmRzIFN1cHByZXNzaW9uPihcbiAgICBkYXRhIDogU3VwcHJlc3Npb25EYXRhVHlwZSxcbiAgICBNb2RlbDoge1xuICAgICAgbmV3KGRhdGFUeXBlOiBTdXBwcmVzc2lvbkRhdGFUeXBlKTpUXG4gICAgfVxuICApOiBUIHtcbiAgICByZXR1cm4gbmV3IE1vZGVsKGRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVXaGl0ZUxpc3QoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgZGF0YTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgfCBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YVtdLFxuICAgIGlzRGF0YUFycmF5OiBib29sZWFuXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdD4ge1xuICAgIGlmIChpc0RhdGFBcnJheSkge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgJ0RhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCcsXG4gICAgICAgICdXaGl0ZWxpc3RcXCdzIGNyZWF0aW9uIHByb2Nlc3MgZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBjcmVhdGlvbnMuIERhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCdcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAnd2hpdGVsaXN0cycpLCBkYXRhIGFzIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhKVxuICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVVbnN1YnNjcmliZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW11cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHsgLy8gVXNlciBwcm92aWRlZCBhbiBhcnJheVxuICAgICAgY29uc3QgaXNDb250YWluc1RhZyA9IGRhdGEuc29tZSgodW5zdWJzY3JpYmU6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhKSA9PiB1bnN1YnNjcmliZS50YWcpO1xuICAgICAgaWYgKGlzQ29udGFpbnNUYWcpIHtcbiAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgICAnVGFnIHByb3BlcnR5IHNob3VsZCBub3QgYmUgdXNlZCBmb3IgY3JlYXRpbmcgbXVsdGlwbGUgdW5zdWJzY3JpYmVzLicsXG4gICAgICAgICAgJ1RhZyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCBvbmx5IGlmIG9uZSB1bnN1YnNjcmliZSBwcm92aWRlZCBhcyBzZWNvbmQgYXJndW1lbnQgb2YgY3JlYXRlIG1ldGhvZC4gUGxlYXNlIHVzZSB0YWdzIGluc3RlYWQuJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgICAucG9zdCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3Vuc3Vic2NyaWJlcycpLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgY3JlYXRlT3B0aW9ucylcbiAgICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICAgIH1cblxuICAgIGlmIChkYXRhPy50YWdzKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAnVGFncyBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHVzZWQgZm9yIGNyZWF0aW5nIG9uZSB1bnN1YnNjcmliZS4nLFxuICAgICAgICAnVGFncyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCBpZiB5b3UgcHJvdmlkZXMgYW4gYXJyYXkgb2YgdW5zdWJzY3JpYmVzIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kLiBQbGVhc2UgdXNlIHRhZyBpbnN0ZWFkJ1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS50YWcpKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAnVGFnIHByb3BlcnR5IGNhbiBub3QgYmUgYW4gYXJyYXknLFxuICAgICAgICAnUGxlYXNlIHVzZSBhcnJheSBvZiB1bnN1YnNjcmliZXMgYXMgc2Vjb25kIGFyZ3VtZW50IG9mIGNyZWF0ZSBtZXRob2QgdG8gYmUgYWJsZSB0byBwcm92aWRlIGZldyB0YWdzJ1xuICAgICAgKTtcbiAgICB9XG4gICAgLyogV2UgbmVlZCBGb3JtIERhdGEgZm9yIHVuc3Vic2NyaWJlcyBpZiB3ZSB3YW50IHRvIHN1cHBvcnQgdGhlIFwidGFnXCIgcHJvcGVydHkgKi9cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdFdpdGhGRCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3Vuc3Vic2NyaWJlcycpLCBkYXRhKVxuICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRNb2RlbCh0eXBlOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZSBpbiB0aGlzLm1vZGVscykge1xuICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW3R5cGUgYXMga2V5b2YgdHlwZW9mIHRoaXMubW9kZWxzXTtcbiAgICB9XG4gICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICdVbmtub3duIHR5cGUgdmFsdWUnLFxuICAgICAgJ1R5cGUgbWF5IGJlIG9ubHkgb25lIG9mIFtib3VuY2VzLCBjb21wbGFpbnRzLCB1bnN1YnNjcmliZXMsIHdoaXRlbGlzdHNdJ1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVSZXNwb25zZShyZXNwb25zZTogU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlKTogU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgIHR5cGU6IHJlc3BvbnNlLmJvZHkudHlwZSB8fCAnJyxcbiAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgbGlzdChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBTdXBwcmVzc2lvbkxpc3RRdWVyeVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uTGlzdD4ge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIHF1ZXJ5LCBtb2RlbCk7XG4gIH1cblxuICBnZXQoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdD4ge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAuZ2V0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBTdXBwcmVzc2lvblJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZUl0ZW08dHlwZW9mIG1vZGVsPihyZXNwb25zZS5ib2R5LCBtb2RlbCkpO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW11cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICAvLyBzdXBwb3J0cyBhZGRpbmcgbXVsdGlwbGUgc3VwcHJlc3Npb25zIGJ5IGRlZmF1bHRcbiAgICBsZXQgcG9zdERhdGE7XG4gICAgY29uc3QgaXNEYXRhQXJyYXkgPSBBcnJheS5pc0FycmF5KGRhdGEpO1xuXG4gICAgaWYgKHR5cGUgPT09ICd3aGl0ZWxpc3RzJykge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlV2hpdGVMaXN0KGRvbWFpbiwgZGF0YSwgaXNEYXRhQXJyYXkpO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAndW5zdWJzY3JpYmVzJykge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVW5zdWJzY3JpYmUoZG9tYWluLCBkYXRhKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzRGF0YUFycmF5KSB7XG4gICAgICBwb3N0RGF0YSA9IFtkYXRhXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zdERhdGEgPSBbLi4uZGF0YV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3QodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBKU09OLnN0cmluZ2lmeShwb3N0RGF0YSksIGNyZWF0ZU9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQ+IHtcbiAgICB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5kZWxldGUodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5ib2R5LmFkZHJlc3MgfHwgJycsXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICB9KSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdXBwcmVzc2lvbkNsaWVudDtcbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSVVuc3Vic2NyaWJlIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgVW5zdWJzY3JpYmVEYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcblxuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbnN1YnNjcmliZSBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSVVuc3Vic2NyaWJlIHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgdGFnczogc3RyaW5nW107XG4gICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFVuc3Vic2NyaWJlRGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuVU5TVUJTQ1JJQkVTKTtcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgIHRoaXMudGFncyA9IGRhdGEudGFncztcbiAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJV2hpdGVMaXN0IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgV2hpdGVMaXN0RGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdoaXRlTGlzdCBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSVdoaXRlTGlzdCB7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICByZWFzb246IHN0cmluZztcbiAgICBjcmVhdGVkQXQ6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBXaGl0ZUxpc3REYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5XSElURUxJU1RTKTtcbiAgICAgIHRoaXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgdGhpcy5yZWFzb24gPSBkYXRhLnJlYXNvbjtcbiAgICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHtcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0LFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JEYXRhLFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdCxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXNwb25zZSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhLFxuICBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkLFxuICBDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYlxufSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucy9NdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IEF0dGFjaG1lbnRzSGFuZGxlciBmcm9tICcuLi9jb21tb24vQXR0YWNobWVudHNIYW5kbGVyJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3InO1xuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uSm9iIGltcGxlbWVudHMgTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0IHtcbiAgY3JlYXRlZEF0OiBEYXRlO1xuICBpZDogc3RyaW5nO1xuICBxdWFudGl0eTogbnVtYmVyXG4gIHJlY29yZHNQcm9jZXNzZWQ6IG51bWJlciB8IG51bGw7XG4gIHN0YXR1czogc3RyaW5nO1xuICBkb3dubG9hZFVybD86IHtcbiAgICBjc3Y6IHN0cmluZztcbiAgICBqc29uOiBzdHJpbmc7XG4gIH07XG5cbiAgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXI7XG4gIHN1bW1hcnk/OiB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgICBjYXRjaEFsbDogbnVtYmVyO1xuICAgICAgICAgIGRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgZG9Ob3RTZW5kOiBudW1iZXI7XG4gICAgICAgICAgdW5kZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgIH07XG4gICAgICByaXNrOiB7XG4gICAgICAgICAgaGlnaDogbnVtYmVyO1xuICAgICAgICAgIGxvdzogbnVtYmVyO1xuICAgICAgICAgIG1lZGl1bTogbnVtYmVyO1xuICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkpvYkRhdGEsIHJlc3BvbnNlU3RhdHVzQ29kZTogbnVtYmVyKSB7XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgIHRoaXMucXVhbnRpdHkgPSBkYXRhLnF1YW50aXR5O1xuICAgIHRoaXMucmVjb3Jkc1Byb2Nlc3NlZCA9IGRhdGEucmVjb3Jkc19wcm9jZXNzZWQ7XG4gICAgdGhpcy5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICB0aGlzLnJlc3BvbnNlU3RhdHVzQ29kZSA9IHJlc3BvbnNlU3RhdHVzQ29kZTtcbiAgICBpZiAoZGF0YS5kb3dubG9hZF91cmwpIHtcbiAgICAgIHRoaXMuZG93bmxvYWRVcmwgPSB7XG4gICAgICAgIGNzdjogZGF0YS5kb3dubG9hZF91cmw/LmNzdixcbiAgICAgICAganNvbjogZGF0YS5kb3dubG9hZF91cmw/Lmpzb25cbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChkYXRhLnN1bW1hcnkpIHtcbiAgICAgIHRoaXMuc3VtbWFyeSA9IHtcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgY2F0Y2hBbGw6IGRhdGEuc3VtbWFyeS5yZXN1bHQuY2F0Y2hfYWxsLFxuICAgICAgICAgIGRlbGl2ZXJhYmxlOiBkYXRhLnN1bW1hcnkucmVzdWx0LmRlbGl2ZXJhYmxlLFxuICAgICAgICAgIGRvTm90U2VuZDogZGF0YS5zdW1tYXJ5LnJlc3VsdC5kb19ub3Rfc2VuZCxcbiAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBkYXRhLnN1bW1hcnkucmVzdWx0LnVuZGVsaXZlcmFibGUsXG4gICAgICAgICAgdW5rbm93bjogZGF0YS5zdW1tYXJ5LnJlc3VsdC51bmtub3duXG4gICAgICAgIH0sXG4gICAgICAgIHJpc2s6IHtcbiAgICAgICAgICBoaWdoOiBkYXRhLnN1bW1hcnkucmlzay5oaWdoLFxuICAgICAgICAgIGxvdzogZGF0YS5zdW1tYXJ5LnJpc2subG93LFxuICAgICAgICAgIG1lZGl1bTogZGF0YS5zdW1tYXJ5LnJpc2subWVkaXVtLFxuICAgICAgICAgIHVua25vd246IGRhdGEuc3VtbWFyeS5yaXNrLnVua25vd25cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdD5cbiAgaW1wbGVtZW50cyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHJpdmF0ZSBhdHRhY2htZW50c0hhbmRsZXI6IEF0dGFjaG1lbnRzSGFuZGxlcjtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyID0gbmV3IEF0dGFjaG1lbnRzSGFuZGxlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVSZXNwb25zZTxUPihyZXNwb25zZTogQVBJUmVzcG9uc2UpOiBUIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZT8uYm9keVxuICAgIH0gYXMgVDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QocmVzcG9uc2U6IE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzcG9uc2UpXG4gICAgOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0O1xuXG4gICAgZGF0YS5qb2JzID0gcmVzcG9uc2UuYm9keS5qb2JzLm1hcCgoam9iKSA9PiBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uSm9iKGpvYiwgcmVzcG9uc2Uuc3RhdHVzKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncGl2b3QnKTtcbiAgICBkYXRhLnRvdGFsID0gcmVzcG9uc2UuYm9keS50b3RhbDtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdChxdWVyeT86IE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnkpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoJy92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsnLCBxdWVyeSk7XG4gIH1cblxuICBhc3luYyBnZXQobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKTtcbiAgICByZXR1cm4gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkpvYihyZXNwb25zZS5ib2R5LCByZXNwb25zZS5zdGF0dXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0VG9FeHBlY3RlZFNoYXBlKGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YSlcbiAgICA6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVVwZGF0ZWQge1xuICAgIGxldCBtdWx0aXBsZVZhbGlkYXRpb25EYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkO1xuICAgIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihkYXRhLmZpbGUpKSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhLmZpbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiB7IGRhdGE6IGRhdGEuZmlsZSB9IH07XG4gICAgfSBlbHNlIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShkYXRhLmZpbGUpKSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHsgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZTogZGF0YS5maWxlIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG11bHRpcGxlVmFsaWRhdGlvbkRhdGE7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoXG4gICAgbGlzdElkOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGlmICghZGF0YSB8fCAhZGF0YS5maWxlKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdcImZpbGVcIiBwcm9wZXJ0eSBleHBlY3RlZC4nLCAnTWFrZSBzdXJlIHNlY29uZCBhcmd1bWVudCBoYXMgXCJmaWxlXCIgcHJvcGVydHkuJyk7XG4gICAgfVxuICAgIGNvbnN0IG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB0aGlzLmNvbnZlcnRUb0V4cGVjdGVkU2hhcGUoZGF0YSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gLCBtdWx0aXBsZVZhbGlkYXRpb25EYXRhKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBkZXN0cm95KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ocmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJVmFsaWRhdGlvbkNsaWVudCwgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgVmFsaWRhdGlvblF1ZXJ5LCBWYWxpZGF0aW9uUmVzdWx0LCBWYWxpZGF0aW9uUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRlQ2xpZW50IGltcGxlbWVudHMgSVZhbGlkYXRpb25DbGllbnQge1xuICBwdWJsaWMgbXVsdGlwbGVWYWxpZGF0aW9uO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDogSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5tdWx0aXBsZVZhbGlkYXRpb24gPSBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ7XG4gIH1cblxuICBhc3luYyBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgY29uc3QgcXVlcnk6IFZhbGlkYXRpb25RdWVyeSA9IHsgYWRkcmVzcyB9O1xuICAgIGNvbnN0IHJlc3VsdDogVmFsaWRhdGlvblJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUnLCBxdWVyeSk7XG4gICAgcmV0dXJuIHJlc3VsdC5ib2R5IGFzIFZhbGlkYXRpb25SZXN1bHQ7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7IFdlYmhvb2tzSWRzIH0gZnJvbSAnLi4vRW51bXMnO1xuaW1wb3J0IHsgSVdlYkhvb2tzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcy9XZWJob29rcyc7XG5cbmltcG9ydCB7XG4gIFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2UsXG4gIFdlYmhvb2tMaXN0LFxuICBXZWJob29rUmVzcG9uc2UsXG4gIFdlYmhvb2tzUXVlcnksXG4gIFdlYmhvb2tSZXN1bHRcbn0gZnJvbSAnLi4vVHlwZXMvV2ViaG9va3MnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBjbGFzcyBXZWJob29rIGltcGxlbWVudHMgV2ViaG9va1Jlc3VsdCB7XG4gIGlkOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICB1cmxzOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZCwgdXJsczogc3RyaW5nW10pIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy51cmxzID0gdXJscztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJob29rc0NsaWVudCBpbXBsZW1lbnRzIElXZWJIb29rc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVdlYmhvb2tMaXN0KHJlc3BvbnNlOiB7IGJvZHk6IHsgd2ViaG9va3M6IFdlYmhvb2tMaXN0IH0gfSk6IFdlYmhvb2tMaXN0IHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keS53ZWJob29rcztcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tXaXRoSUQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2U6IFdlYmhvb2tSZXNwb25zZSk6IFdlYmhvb2tSZXN1bHQge1xuICAgICAgY29uc3Qgd2ViaG9va1Jlc3BvbnNlID0gcmVzcG9uc2U/LmJvZHk/LndlYmhvb2s7XG4gICAgICBsZXQgdXJsID0gd2ViaG9va1Jlc3BvbnNlPy51cmw7XG4gICAgICBsZXQgdXJscyA9IHdlYmhvb2tSZXNwb25zZT8udXJscztcbiAgICAgIGlmICghdXJsKSB7XG4gICAgICAgIHVybCA9IHVybHMgJiYgdXJscy5sZW5ndGhcbiAgICAgICAgICA/IHVybHNbMF1cbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmICgoIXVybHMgfHwgdXJscy5sZW5ndGggPT09IDApICYmIHVybCkge1xuICAgICAgICB1cmxzID0gW3VybF07XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFdlYmhvb2soaWQsIHVybCwgdXJscyBhcyBzdHJpbmdbXSk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlV2ViaG9va1Rlc3QocmVzcG9uc2U6IHsgYm9keTogeyBjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZyB9IH0pXG4gIDoge2NvZGU6IG51bWJlciwgbWVzc2FnZTpzdHJpbmd9IHtcbiAgICByZXR1cm4ge1xuICAgICAgY29kZTogcmVzcG9uc2UuYm9keS5jb2RlLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgfSBhcyBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlO1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk6IFdlYmhvb2tzUXVlcnkpOiBQcm9taXNlPFdlYmhvb2tMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCBxdWVyeSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va0xpc3QpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBpZDogV2ViaG9va3NJZHMpOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsXG4gICAgaWQ6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICB0ZXN0ID0gZmFsc2UpOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQgfCBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlPiB7XG4gICAgaWYgKHRlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCwgJ3Rlc3QnKSwgeyB1cmwgfSlcbiAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rVGVzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgeyBpZCwgdXJsIH0pXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZywgdXJsVmFsdWVzOiBzdHJpbmcgfCBzdHJpbmdbXSk6IFByb21pc2U8V2ViaG9va1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCksIHsgdXJsOiB1cmxWYWx1ZXMgfSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZykgOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCB7IEN1c3RvbUZpbGUsIEN1c3RvbUZpbGVEYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuaW1wb3J0IHsgQXR0YWNobWVudEluZm8sIFN0cmVhbVZhbHVlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0F0dGFjaG1lbnRzJztcblxuY2xhc3MgQmxvYkZyb21TdHJlYW0ge1xuICBwcml2YXRlIF9zdHJlYW06IFJlYWRhYmxlXG4gIHNpemU6IG51bWJlclxuXG4gIGNvbnN0cnVjdG9yKHN0cmVhbTogUmVhZGFibGUsIHNpemU6IG51bWJlcikge1xuICAgIHRoaXMuX3N0cmVhbSA9IHN0cmVhbTtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICB9XG5cbiAgc3RyZWFtKCkge1xuICAgIHJldHVybiB0aGlzLl9zdHJlYW07XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdCbG9iJztcbiAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50c0hhbmRsZXIge1xuICBwcml2YXRlIGdldEF0dGFjaG1lbnRPcHRpb25zKGl0ZW06IHtcbiAgICBmaWxlbmFtZT86IHN0cmluZztcbiAgICBjb250ZW50VHlwZT8gOiBzdHJpbmc7XG4gICAga25vd25MZW5ndGg/OiBudW1iZXI7XG4gIH0pOiBBdHRhY2htZW50SW5mbyB7XG4gICAgY29uc3Qge1xuICAgICAgZmlsZW5hbWUsXG4gICAgICBjb250ZW50VHlwZSxcbiAgICAgIGtub3duTGVuZ3RoLFxuICAgIH0gPSBpdGVtO1xuICAgIHJldHVybiB7XG4gICAgICAuLi4oZmlsZW5hbWUgPyB7IGZpbGVuYW1lIH0gOiB7IGZpbGVuYW1lOiAnZmlsZScgfSksXG4gICAgICAuLi4oY29udGVudFR5cGUgJiYgeyBjb250ZW50VHlwZSB9KSxcbiAgICAgIC4uLihrbm93bkxlbmd0aCAmJiB7IGtub3duTGVuZ3RoIH0pXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsZUluZm8oZmlsZTogRmlsZSkgeyAvLyBicm93c2VyIGNvbXBsaWFudCBmaWxlXG4gICAgY29uc3Qge1xuICAgICAgbmFtZTogZmlsZW5hbWUsXG4gICAgICB0eXBlOiBjb250ZW50VHlwZSxcbiAgICAgIHNpemU6IGtub3duTGVuZ3RoLFxuICAgIH0gPSBmaWxlO1xuICAgIHJldHVybiB0aGlzLmdldEF0dGFjaG1lbnRPcHRpb25zKHsgZmlsZW5hbWUsIGNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q3VzdG9tRmlsZUluZm8oZmlsZTogQ3VzdG9tRmlsZSkgeyAvLyBjdXN0b20gY3JlYXRlZCBmaWxlXG4gICAgY29uc3Qge1xuICAgICAgZmlsZW5hbWUsXG4gICAgICBjb250ZW50VHlwZSxcbiAgICAgIGtub3duTGVuZ3RoLFxuICAgIH0gPSBmaWxlO1xuICAgIHJldHVybiB0aGlzLmdldEF0dGFjaG1lbnRPcHRpb25zKHsgZmlsZW5hbWUsIGNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QnVmZmVySW5mbyhidWZmZXI6IEJ1ZmZlcikge1xuICAgIGNvbnN0IHtcbiAgICAgIGJ5dGVMZW5ndGg6IGtub3duTGVuZ3RoLFxuICAgIH0gPSBidWZmZXI7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZTogJ2ZpbGUnLCBjb250ZW50VHlwZTogJycsIGtub3duTGVuZ3RoIH0pO1xuICB9XG5cbiAgcHVibGljIGlzU3RyZWFtKGRhdGE6IHVua25vd24pIDogZGF0YSBpcyBTdHJlYW1WYWx1ZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgKGRhdGEgYXMgU3RyZWFtVmFsdWUpLnBpcGUgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICBwdWJsaWMgaXNDdXN0b21GaWxlKG9iajogdW5rbm93bik6IG9iaiBpcyBDdXN0b21GaWxlIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbiAgICAgICYmICEhKG9iaiBhcyBDdXN0b21GaWxlKS5kYXRhO1xuICB9XG5cbiAgcHVibGljIGlzQnJvd3NlckZpbGUob2JqOiB1bmtub3duKTogb2JqIGlzIEZpbGUge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAoISEob2JqIGFzIEZpbGUpLm5hbWUgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSk7XG4gIH1cblxuICBwdWJsaWMgaXNCdWZmZXIoZGF0YTogdW5rbm93bik6IGRhdGEgaXMgQnVmZmVyIHtcbiAgICByZXR1cm4gdHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQnVmZmVyLmlzQnVmZmVyKGRhdGEpO1xuICB9XG5cbiAgcHVibGljIGdldEF0dGFjaG1lbnRJbmZvKFxuICAgIGF0dGFjaG1lbnQ6IEN1c3RvbUZpbGUgfCBGaWxlIHwgc3RyaW5nIHwgQ3VzdG9tRmlsZURhdGFcbiAgKTogQXR0YWNobWVudEluZm8ge1xuICAgIGNvbnN0IGlzQnJvd3NlckZpbGUgPSB0aGlzLmlzQnJvd3NlckZpbGUoYXR0YWNobWVudCk7XG4gICAgY29uc3QgaXNDdXN0b21GaWxlID0gdGhpcy5pc0N1c3RvbUZpbGUoYXR0YWNobWVudCk7XG4gICAgY29uc3QgaXNTdHJpbmcgPSB0eXBlb2YgYXR0YWNobWVudCA9PT0gJ3N0cmluZyc7XG4gICAgaWYgKCFpc1N0cmluZykge1xuICAgICAgaWYgKGlzQnJvd3NlckZpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsZUluZm8oYXR0YWNobWVudCBhcyBGaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBCdWZmZXIuaXNCdWZmZXIoYXR0YWNobWVudCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnVmZmVySW5mbyhhdHRhY2htZW50IGFzIEJ1ZmZlcik7XG4gICAgICB9XG4gICAgICBpZiAoaXNDdXN0b21GaWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEN1c3RvbUZpbGVJbmZvKGF0dGFjaG1lbnQgYXMgQ3VzdG9tRmlsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9uczogQXR0YWNobWVudEluZm8gPSB7XG4gICAgICBmaWxlbmFtZTogJ2ZpbGUnLFxuICAgICAgY29udGVudFR5cGU6IHVuZGVmaW5lZCxcbiAgICAgIGtub3duTGVuZ3RoOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgcHVibGljIGNvbnZlcnRUb0ZEZXhwZWN0ZWRTaGFwZShcbiAgICB1c2VyUHJvdmlkZWRWYWx1ZTogQ3VzdG9tRmlsZSB8IEZpbGUgfCBzdHJpbmcgfCBDdXN0b21GaWxlRGF0YVxuICApIHtcbiAgICBjb25zdCBpc1N0cmVhbSA9IHRoaXMuaXNTdHJlYW0odXNlclByb3ZpZGVkVmFsdWUpO1xuICAgIGNvbnN0IGlzQnJvd3NlckZpbGUgPSB0aGlzLmlzQnJvd3NlckZpbGUodXNlclByb3ZpZGVkVmFsdWUpO1xuICAgIGNvbnN0IGlzQ3VzdG9tRmlsZSA9IHRoaXMuaXNDdXN0b21GaWxlKHVzZXJQcm92aWRlZFZhbHVlKTtcbiAgICBjb25zdCBpc1N0cmluZyA9IHR5cGVvZiB1c2VyUHJvdmlkZWRWYWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAoaXNTdHJlYW0gfHwgaXNTdHJpbmcgfHwgaXNCcm93c2VyRmlsZSB8fCB0aGlzLmlzQnVmZmVyKHVzZXJQcm92aWRlZFZhbHVlKSkge1xuICAgICAgcmVzdWx0ID0gdXNlclByb3ZpZGVkVmFsdWU7XG4gICAgfSBlbHNlIGlmIChpc0N1c3RvbUZpbGUpIHtcbiAgICAgIHJlc3VsdCA9IHVzZXJQcm92aWRlZFZhbHVlLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgIGBVbmtub3duIGF0dGFjaG1lbnQgdHlwZSAke3R5cGVvZiB1c2VyUHJvdmlkZWRWYWx1ZX1gLFxuICAgICAgICBgVGhlIFwiYXR0YWNobWVudFwiIHByb3BlcnR5IGV4cGVjdHMgZWl0aGVyIEJ1ZmZlciwgQmxvYiwgb3IgU3RyaW5nLlxuICAgICAgICAgIEFsc28sIEl0IGlzIHBvc3NpYmxlIHRvIHByb3ZpZGUgYW4gb2JqZWN0IHRoYXQgaGFzIHRoZSBwcm9wZXJ0eSBcImRhdGFcIiB3aXRoIGEgdmFsdWUgdGhhdCBpcyBlcXVhbCB0byBvbmUgb2YgdGhlIHR5cGVzIGNvdW50ZWQgYmVmb3JlLlxuICAgICAgICAgIEFkZGl0aW9uYWxseSwgeW91IG1heSB1c2UgYW4gYXJyYXkgdG8gc2VuZCBtb3JlIHRoYW4gb25lIGF0dGFjaG1lbnQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRCbG9iRnJvbVN0cmVhbShzdHJlYW06IFJlYWRhYmxlLCBzaXplOiBudW1iZXIpOiBCbG9iRnJvbVN0cmVhbSB7XG4gICAgcmV0dXJuIG5ldyBCbG9iRnJvbVN0cmVhbShzdHJlYW0sIHNpemUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dGFjaG1lbnRzSGFuZGxlcjtcbiIsImltcG9ydCB7IEFQSUVycm9yT3B0aW9ucywgQVBJRXJyb3JUeXBlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBJRXJyb3IgZXh0ZW5kcyBFcnJvciBpbXBsZW1lbnRzIEFQSUVycm9yVHlwZSB7XG4gIHB1YmxpYyBzdGF0dXM6IG51bWJlciA7XG4gIHB1YmxpYyBzdGFjazogc3RyaW5nO1xuICBwdWJsaWMgZGV0YWlsczogc3RyaW5nO1xuICBwdWJsaWMgdHlwZTogc3RyaW5nO1xuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VXNlckRhdGFFcnJvcihzdGF0dXNUZXh0OiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgdGhpcyh7XG4gICAgICBzdGF0dXM6IDQwMCxcbiAgICAgIHN0YXR1c1RleHQsXG4gICAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2VcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBzdGF0dXMsXG4gICAgc3RhdHVzVGV4dCxcbiAgICBtZXNzYWdlLFxuICAgIGJvZHkgPSB7fVxuICB9OiBBUElFcnJvck9wdGlvbnMpIHtcbiAgICBsZXQgYm9keU1lc3NhZ2UgPSAnJztcbiAgICBsZXQgZXJyb3IgPSAnJztcbiAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBib2R5TWVzc2FnZSA9IGJvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHlNZXNzYWdlID0gYm9keT8ubWVzc2FnZSB8fCAnJztcbiAgICAgIGVycm9yID0gYm9keT8uZXJyb3IgfHwgJyc7XG4gICAgfVxuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBlcnJvciB8fCBzdGF0dXNUZXh0IHx8ICcnO1xuICAgIHRoaXMuZGV0YWlscyA9IGJvZHlNZXNzYWdlO1xuICAgIHRoaXMudHlwZSA9ICdNYWlsZ3VuQVBJRXJyb3InO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCB7IEZvcm1EYXRhSW5wdXQsIElucHV0Rm9ybURhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuXG5pbXBvcnQge1xuICBDdXN0b21GaWxlLFxuICBDdXN0b21GaWxlRGF0YSxcbiAgRm9ybURhdGFJbnB1dFZhbHVlLFxuICBNZXNzYWdlQXR0YWNobWVudCxcbiAgTWltZU1lc3NhZ2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuaW1wb3J0IEF0dGFjaG1lbnRzSGFuZGxlciBmcm9tICcuL0F0dGFjaG1lbnRzSGFuZGxlcic7XG5pbXBvcnQgeyBBdHRhY2htZW50SW5mbyB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BdHRhY2htZW50cyc7XG5cbmNsYXNzIEZvcm1EYXRhQnVpbGRlciB7XG4gIHByaXZhdGUgRm9ybURhdGFDb25zdHJ1Y3RvcjogSW5wdXRGb3JtRGF0YTtcbiAgcHJpdmF0ZSBmaWxlS2V5czogc3RyaW5nW107XG4gIHByaXZhdGUgYXR0YWNobWVudHNIYW5kbGVyOiBBdHRhY2htZW50c0hhbmRsZXI7XG5cbiAgY29uc3RydWN0b3IoRm9ybURhdGFDb25zdHJ1Y3RvcjogSW5wdXRGb3JtRGF0YSkge1xuICAgIHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvciA9IEZvcm1EYXRhQ29uc3RydWN0b3I7XG4gICAgdGhpcy5maWxlS2V5cyA9IFsnYXR0YWNobWVudCcsICdpbmxpbmUnLCAnbXVsdGlwbGVWYWxpZGF0aW9uRmlsZSddO1xuICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyID0gbmV3IEF0dGFjaG1lbnRzSGFuZGxlcigpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUZvcm1EYXRhKGRhdGE6IEZvcm1EYXRhSW5wdXQpOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRhdGEgb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGZvcm1EYXRhOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSA9IE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGRhdGFba2V5XTsgfSlcbiAgICAgIC5yZWR1Y2UoKGZvcm1EYXRhQWNjOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSwga2V5KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmZpbGVLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICBjb25zdCBhdHRhY2htZW50VmFsdWUgPSBkYXRhW2tleV07XG4gICAgICAgICAgaWYgKHRoaXMuaXNNZXNzYWdlQXR0YWNobWVudChhdHRhY2htZW50VmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEZpbGVzVG9GRChrZXksIGF0dGFjaG1lbnRWYWx1ZSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAgICAgYFVua25vd24gdmFsdWUgJHtkYXRhW2tleV19IHdpdGggdHlwZSAke3R5cGVvZiBkYXRhW2tleV19IGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiYCxcbiAgICAgICAgICAgIGBUaGUga2V5IFwiJHtrZXl9XCIgc2hvdWxkIGhhdmUgdHlwZSBvZiBCdWZmZXIsIFN0cmVhbSwgRmlsZSwgb3IgU3RyaW5nIGBcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ21lc3NhZ2UnKSB7IC8vIG1pbWUgbWVzc2FnZVxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2VWYWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgICBpZiAoIW1lc3NhZ2VWYWx1ZSB8fCAhdGhpcy5pc01JTUUobWVzc2FnZVZhbHVlKSkge1xuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgICAgICAgYFVua25vd24gZGF0YSB0eXBlIGZvciBcIiR7a2V5fVwiIHByb3BlcnR5YCxcbiAgICAgICAgICAgICAgJ1RoZSBtaW1lIGRhdGEgc2hvdWxkIGhhdmUgdHlwZSBvZiBCdWZmZXIsIFN0cmluZyBvciBCbG9iJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRNaW1lRGF0YVRvRkQoa2V5LCBtZXNzYWdlVmFsdWUsIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZENvbW1vblByb3BlcnR5VG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICB9LCBuZXcgdGhpcy5Gb3JtRGF0YUNvbnN0cnVjdG9yKCkpO1xuICAgIHJldHVybiBmb3JtRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkTWltZURhdGFUb0ZEKFxuICAgIGtleTogc3RyaW5nLFxuICAgIGRhdGE6IE1pbWVNZXNzYWdlLFxuICAgIGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHsgLy8gaWYgc3RyaW5nIG9ubHkgdHdvIHBhcmFtZXRlcnMgc2hvdWxkIGJlIHVzZWQuXG4gICAgICBmb3JtRGF0YUluc3RhbmNlLmFwcGVuZChrZXksIGRhdGEgYXMgc3RyaW5nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YUluc3RhbmNlKSkgeyAvLyBmb3JtLWRhdGEgcGFja2FnZSBpcyB1c2VkXG4gICAgICBjb25zdCBub2RlRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlIGFzIE5vZGVGb3JtRGF0YTtcbiAgICAgIG5vZGVGb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhLCB7IGZpbGVuYW1lOiAnTWltZU1lc3NhZ2UnIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkKSB7IC8vIGVpdGhlciBub2RlID4gMTggb3IgYnJvd3NlclxuICAgICAgY29uc3QgYnJvd3NlckZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZSBhcyBGb3JtRGF0YTsgLy8gQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGFcbiAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YSwgJ01pbWVNZXNzYWdlJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihkYXRhKSkgeyAvLyBub2RlIGVudmlyb25tZW50XG4gICAgICAgIGNvbnN0IGJsb2JJbnN0YW5jZSA9IG5ldyBCbG9iKFtkYXRhXSk7XG4gICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBibG9iSW5zdGFuY2UsICdNaW1lTWVzc2FnZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc01JTUUoZGF0YTogdW5rbm93bikgOiBkYXRhIGlzIE1pbWVNZXNzYWdlIHtcbiAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnXG4gICAgICB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGRhdGEgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoZGF0YSlcbiAgICAgIHx8ICh0eXBlb2YgUmVhZGFibGVTdHJlYW0gIT09ICd1bmRlZmluZWQnICYmIGRhdGEgaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbSk7XG4gIH1cblxuICBwcml2YXRlIGlzRm9ybURhdGFQYWNrYWdlKG9iajogdW5rbm93bik6IG9iaiBpcyBOb2RlRm9ybURhdGEge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xuICAgICAgJiYgb2JqICE9PSBudWxsXG4gICAgICAmJiB0eXBlb2YgKG9iaiBhcyBOb2RlRm9ybURhdGEpLmdldEhlYWRlcnMgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICBwcml2YXRlIGlzTWVzc2FnZUF0dGFjaG1lbnQodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBNZXNzYWdlQXR0YWNobWVudCB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQ3VzdG9tRmlsZSh2YWx1ZSlcbiAgICAgIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcbiAgICAgIHx8ICh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBGaWxlKVxuICAgICAgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcih2YWx1ZSlcbiAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKHZhbHVlKVxuICAgICAgfHwgKFxuICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeShcbiAgICAgICAgICAoaXRlbSkgPT4gdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNDdXN0b21GaWxlKGl0ZW0pXG4gICAgICAgICAgICB8fCAodHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gaW5zdGFuY2VvZiBGaWxlKVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihpdGVtKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0oaXRlbSlcbiAgICAgICAgKVxuICAgICAgKVxuXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkRmlsZXNUb0ZEKFxuICAgIHByb3BlcnR5TmFtZTogdHlwZW9mIHRoaXMuZmlsZUtleXNbbnVtYmVyXSxcbiAgICB2YWx1ZTogTWVzc2FnZUF0dGFjaG1lbnQsXG4gICAgZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYXBwZW5kRmlsZVRvRkQgPSAoXG4gICAgICBvcmlnaW5hbEtleTogc3RyaW5nLFxuICAgICAgYXR0YWNobWVudDogQ3VzdG9tRmlsZSB8IEZpbGUgfCBzdHJpbmd8IEN1c3RvbUZpbGVEYXRhLFxuICAgICAgZm9ybURhdGE6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICAgKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBvcmlnaW5hbEtleSA9PT0gJ211bHRpcGxlVmFsaWRhdGlvbkZpbGUnID8gJ2ZpbGUnIDogb3JpZ2luYWxLZXk7XG4gICAgICBjb25zdCBvYmpEYXRhID0gdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuY29udmVydFRvRkRleHBlY3RlZFNoYXBlKGF0dGFjaG1lbnQpO1xuICAgICAgY29uc3Qgb3B0aW9uczogQXR0YWNobWVudEluZm8gPSB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5nZXRBdHRhY2htZW50SW5mbyhhdHRhY2htZW50KTtcblxuICAgICAgaWYgKHRoaXMuaXNGb3JtRGF0YVBhY2thZ2UoZm9ybURhdGEpKSB7XG4gICAgICAgIGNvbnN0IGZkID0gZm9ybURhdGEgYXMgTm9kZUZvcm1EYXRhO1xuICAgICAgICBjb25zdCBkYXRhID0gdHlwZW9mIG9iakRhdGEgPT09ICdzdHJpbmcnID8gQnVmZmVyLmZyb20ob2JqRGF0YSkgOiBvYmpEYXRhO1xuICAgICAgICBmZC5hcHBlbmQoa2V5LCBkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIEJsb2IgIT09IHVuZGVmaW5lZCkgeyAvLyBlaXRoZXIgbm9kZSA+IDE4IG9yIGJyb3dzZXJcbiAgICAgICAgY29uc3QgYnJvd3NlckZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZSBhcyBGb3JtRGF0YTsgLy8gQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGFcblxuICAgICAgICBpZiAodHlwZW9mIG9iakRhdGEgPT09ICdzdHJpbmcnIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKG9iakRhdGEpKSB7XG4gICAgICAgICAgY29uc3QgYmxvYkluc3RhbmNlID0gbmV3IEJsb2IoW29iakRhdGFdKTtcbiAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgYmxvYkluc3RhbmNlLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqRGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgb2JqRGF0YSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKG9iakRhdGEpKSB7XG4gICAgICAgICAgY29uc3QgYmxvYiA9IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmdldEJsb2JGcm9tU3RyZWFtKFxuICAgICAgICAgICAgb2JqRGF0YSBhcyB1bmtub3duIGFzIFJlYWRhYmxlLFxuICAgICAgICAgICAgb3B0aW9ucy5rbm93bkxlbmd0aCBhcyBudW1iZXJcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5zZXQoa2V5LCBibG9iIGFzIHVua25vd24gYXMgRmlsZSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgaXRlbSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCB2YWx1ZSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRDb21tb25Qcm9wZXJ0eVRvRkQoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgdmFsdWU6IEZvcm1EYXRhSW5wdXRWYWx1ZSxcbiAgICBmb3JtRGF0YUFjYzogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYWRkVmFsdWVCYXNlZE9uRkQgPSAoZmRLZXk6IHN0cmluZywgZmRWYWx1ZTogRm9ybURhdGFJbnB1dFZhbHVlKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YUFjYykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmZFZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgcmVjZWl2ZWQgdmFsdWUgaXMgYW4gb2JqZWN0LiBcXG4nXG4gICAgICAgICAgKyAnXCJKU09OLlN0cmluZ2lmeVwiIHdpbGwgYmUgdXNlZCB0byBhdm9pZCBUeXBlRXJyb3IgXFxuJ1xuICAgICAgICAgICsgJ1RvIHJlbW92ZSB0aGlzIHdhcm5pbmc6IFxcbidcbiAgICAgICAgICArICdDb25zaWRlciBzd2l0Y2hpbmcgdG8gYnVpbHQtaW4gRm9ybURhdGEgb3IgY29udmVydGluZyB0aGUgdmFsdWUgb24geW91ciBvd24uXFxuJyk7XG4gICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgSlNPTi5zdHJpbmdpZnkoZmRWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIGZkVmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBmZFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBmZFZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkICYmIGZkVmFsdWUgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIGZkVmFsdWUpO1xuICAgICAgfVxuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgJ1Vua25vd24gdmFsdWUgdHlwZSBmb3IgRm9ybSBEYXRhLiBTdHJpbmcgb3IgQmxvYiBleHBlY3RlZCcsXG4gICAgICAgICdCcm93c2VyIGNvbXBsaWFudCBGb3JtRGF0YSBhbGxvd3Mgb25seSBzdHJpbmcgb3IgQmxvYiB2YWx1ZXMgZm9yIHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IGF0dGFjaG1lbnRzLidcbiAgICAgICk7XG4gICAgfTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogRm9ybURhdGFJbnB1dFZhbHVlKSB7XG4gICAgICAgIGFkZFZhbHVlQmFzZWRPbkZEKGtleSwgaXRlbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIGFkZFZhbHVlQmFzZWRPbkZEKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybURhdGFCdWlsZGVyO1xuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuXG5pbXBvcnQge1xuICBQYWdlc0xpc3RBY2N1bXVsYXRvcixcbiAgUGFyc2VkUGFnZSxcbiAgUGFyc2VkUGFnZXNMaXN0LFxuICBRdWVyeVdpdGhQYWdlLFxuICBSZXNwb25zZVdpdGhQYWdpbmcsXG4gIFVwZGF0ZWRVcmxBbmRRdWVyeSxcbiAgQVBJRXJyb3JPcHRpb25zXG59IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5pbXBvcnQge1xuICBJQm91bmNlLFxuICBJQ29tcGxhaW50LFxuICBJVW5zdWJzY3JpYmUsXG4gIElXaGl0ZUxpc3Rcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9SZXF1ZXN0JztcbmltcG9ydCB7XG4gIFN1cHByZXNzaW9uRGF0YVR5cGVcbn0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgTmF2aWdhdGlvblRocnVQYWdlcyA8VD4ge1xuICByZXF1ZXN0PzogUmVxdWVzdDtcbiAgY29uc3RydWN0b3IocmVxdWVzdD86IFJlcXVlc3QpIHtcbiAgICBpZiAocmVxdWVzdCkge1xuICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VQYWdlKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcGFnZVVybDogc3RyaW5nLFxuICAgIHVybFNlcGFyYXRvcjogc3RyaW5nLFxuICAgIGl0ZXJhdG9yTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4gICkgOiBQYXJzZWRQYWdlIHtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKHBhZ2VVcmwpO1xuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBwYXJzZWRVcmw7XG5cbiAgICBjb25zdCBwYWdlVmFsdWUgPSBwYWdlVXJsICYmIHR5cGVvZiBwYWdlVXJsID09PSAnc3RyaW5nJyA/IHBhZ2VVcmwuc3BsaXQodXJsU2VwYXJhdG9yKS5wb3AoKSB8fCAnJyA6ICcnO1xuICAgIGxldCBpdGVyYXRvclBvc2l0aW9uID0gbnVsbDtcbiAgICBpZiAoaXRlcmF0b3JOYW1lKSB7XG4gICAgICBpdGVyYXRvclBvc2l0aW9uID0gc2VhcmNoUGFyYW1zLmhhcyhpdGVyYXRvck5hbWUpXG4gICAgICAgID8gc2VhcmNoUGFyYW1zLmdldChpdGVyYXRvck5hbWUpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaWQsXG4gICAgICBwYWdlOiB1cmxTZXBhcmF0b3IgPT09ICc/JyA/IGA/JHtwYWdlVmFsdWV9YCA6IHBhZ2VWYWx1ZSxcbiAgICAgIGl0ZXJhdG9yUG9zaXRpb24sXG4gICAgICB1cmw6IHBhZ2VVcmxcbiAgICB9IGFzIFBhcnNlZFBhZ2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VQYWdlTGlua3MoXG4gICAgcmVzcG9uc2U6IFJlc3BvbnNlV2l0aFBhZ2luZyxcbiAgICB1cmxTZXBhcmF0b3I6IHN0cmluZyxcbiAgICBpdGVyYXRvck5hbWU/OiBzdHJpbmdcbiAgKTogUGFyc2VkUGFnZXNMaXN0IHtcbiAgICBjb25zdCBwYWdlcyA9IE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlLmJvZHkucGFnaW5nKTtcbiAgICByZXR1cm4gcGFnZXMucmVkdWNlKFxuICAgICAgKGFjYzogUGFnZXNMaXN0QWNjdW11bGF0b3IsIFtpZCwgcGFnZVVybF06IFsgaWQ6IHN0cmluZywgcGFnZVVybDogc3RyaW5nXSkgPT4ge1xuICAgICAgICBhY2NbaWRdID0gdGhpcy5wYXJzZVBhZ2UoaWQsIHBhZ2VVcmwsIHVybFNlcGFyYXRvciwgaXRlcmF0b3JOYW1lKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9XG4gICAgKSBhcyB1bmtub3duIGFzIFBhcnNlZFBhZ2VzTGlzdDtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVXJsQW5kUXVlcnkoY2xpZW50VXJsOiBzdHJpbmcsIHF1ZXJ5PzogUXVlcnlXaXRoUGFnZSk6IFVwZGF0ZWRVcmxBbmRRdWVyeSB7XG4gICAgbGV0IHVybCA9IGNsaWVudFVybDtcbiAgICBjb25zdCBxdWVyeUNvcHkgPSB7IC4uLnF1ZXJ5IH07XG4gICAgaWYgKHF1ZXJ5Q29weS5wYWdlKSB7XG4gICAgICB1cmwgPSB1cmxqb2luKGNsaWVudFVybCwgcXVlcnlDb3B5LnBhZ2UpO1xuICAgICAgZGVsZXRlIHF1ZXJ5Q29weS5wYWdlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdXJsLFxuICAgICAgdXBkYXRlZFF1ZXJ5OiBxdWVyeUNvcHlcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIHJlcXVlc3RMaXN0V2l0aFBhZ2VzKGNsaWVudFVybDpzdHJpbmcsIHF1ZXJ5PzogUXVlcnlXaXRoUGFnZSwgTW9kZWw/OiB7XG4gICAgbmV3KGRhdGE6IFN1cHByZXNzaW9uRGF0YVR5cGUpOlxuICAgIElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdFxuICB9KTogUHJvbWlzZTxUPiB7XG4gICAgY29uc3QgeyB1cmwsIHVwZGF0ZWRRdWVyeSB9ID0gdGhpcy51cGRhdGVVcmxBbmRRdWVyeShjbGllbnRVcmwsIHF1ZXJ5KTtcbiAgICBpZiAodGhpcy5yZXF1ZXN0KSB7XG4gICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCh1cmwsIHVwZGF0ZWRRdWVyeSk7XG4gICAgICAvLyBNb2RlbCBoZXJlIGlzIHVzdWFsbHkgdW5kZWZpbmVkIGV4Y2VwdCBmb3IgU3VwcHJlc3Npb24gQ2xpZW50XG4gICAgICByZXR1cm4gdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UsIE1vZGVsKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgIHN0YXR1czogNTAwLFxuICAgICAgc3RhdHVzVGV4dDogJ1JlcXVlc3QgcHJvcGVydHkgaXMgZW1wdHknLFxuICAgICAgYm9keTogeyBtZXNzYWdlOiAnJyB9XG4gICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHBhcnNlTGlzdChyZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nLCBNb2RlbD86IHtcbiAgICBuZXcoZGF0YTogU3VwcHJlc3Npb25EYXRhVHlwZSk6XG4gICAgSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0XG4gIH0pOiBUO1xufVxuIiwiaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gJ2Jhc2UtNjQnO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IGF4aW9zLCB7XG4gIEF4aW9zRXJyb3IsXG4gIEF4aW9zUmVzcG9uc2UsXG4gIEF4aW9zSGVhZGVycyxcbiAgUmF3QXhpb3NSZXF1ZXN0SGVhZGVycyxcbiAgQXhpb3NQcm94eUNvbmZpZyxcbn0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0ICogYXMgTm9kZUZvcm1EYXRhIGZyb20gJ2Zvcm0tZGF0YSc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvcic7XG5pbXBvcnQge1xuICBPbkNhbGxSZXF1ZXN0T3B0aW9ucyxcbiAgUmVxdWVzdE9wdGlvbnMsXG4gIEFQSUVycm9yT3B0aW9ucyxcbiAgSW5wdXRGb3JtRGF0YSxcbiAgQVBJUmVzcG9uc2UsXG4gIElwUG9vbERlbGV0ZURhdGEsXG4gIEZvcm1EYXRhSW5wdXRcbn0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuXG5pbXBvcnQgRm9ybURhdGFCdWlsZGVyIGZyb20gJy4vRm9ybURhdGFCdWlsZGVyJztcbmltcG9ydCBTdWJhY2NvdW50c0NsaWVudCBmcm9tICcuLi9TdWJhY2NvdW50cyc7XG5cbmNsYXNzIFJlcXVlc3Qge1xuICBwcml2YXRlIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUga2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgdXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgdGltZW91dDogbnVtYmVyO1xuICBwcml2YXRlIGhlYWRlcnM6IEF4aW9zSGVhZGVycztcbiAgcHJpdmF0ZSBmb3JtRGF0YUJ1aWxkZXI6IEZvcm1EYXRhQnVpbGRlcjtcbiAgcHJpdmF0ZSBtYXhCb2R5TGVuZ3RoOiBudW1iZXI7XG4gIHByaXZhdGUgcHJveHk6IEF4aW9zUHJveHlDb25maWcgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogUmVxdWVzdE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy51c2VybmFtZSA9IG9wdGlvbnMudXNlcm5hbWU7XG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIGFzIHN0cmluZztcbiAgICB0aGlzLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XG4gICAgdGhpcy5oZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3Qob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB0aGlzLmZvcm1EYXRhQnVpbGRlciA9IG5ldyBGb3JtRGF0YUJ1aWxkZXIoZm9ybURhdGEpO1xuICAgIHRoaXMubWF4Qm9keUxlbmd0aCA9IDUyNDI4ODAwOyAvLyA1MCBNQlxuICAgIHRoaXMucHJveHkgPSBvcHRpb25zPy5wcm94eTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb25DYWxsT3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBvcHRpb25zOiBPbkNhbGxSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub25DYWxsT3B0aW9ucyB9O1xuICAgIGRlbGV0ZSBvcHRpb25zPy5oZWFkZXJzO1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gdGhpcy5qb2luQW5kVHJhbnNmb3JtSGVhZGVycyhvbkNhbGxPcHRpb25zKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLm9wdGlvbnMgfTtcblxuICAgIGlmIChvcHRpb25zPy5xdWVyeSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvcHRpb25zPy5xdWVyeSkubGVuZ3RoID4gMCkge1xuICAgICAgcGFyYW1zLnBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeSk7XG4gICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5ib2R5KSB7XG4gICAgICBjb25zdCBib2R5ID0gb3B0aW9ucz8uYm9keTtcbiAgICAgIHBhcmFtcy5kYXRhID0gYm9keTtcbiAgICAgIGRlbGV0ZSBwYXJhbXMuYm9keTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlO1xuICAgIGNvbnN0IHVybFZhbHVlID0gdXJsam9pbih0aGlzLnVybCwgdXJsKTtcblxuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6IG1ldGhvZC50b0xvY2FsZVVwcGVyQ2FzZSgpLFxuICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgIHVybDogdXJsVmFsdWUsXG4gICAgICAgIGhlYWRlcnM6IHJlcXVlc3RIZWFkZXJzLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgIG1heEJvZHlMZW5ndGg6IHRoaXMubWF4Qm9keUxlbmd0aCxcbiAgICAgICAgcHJveHk6IHRoaXMucHJveHksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSBlcnIgYXMgQXhpb3NFcnJvcjtcblxuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgc3RhdHVzOiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uc3RhdHVzIHx8IDQwMCxcbiAgICAgICAgc3RhdHVzVGV4dDogZXJyb3JSZXNwb25zZT8ucmVzcG9uc2U/LnN0YXR1c1RleHQgfHwgZXJyb3JSZXNwb25zZS5jb2RlLFxuICAgICAgICBib2R5OiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uZGF0YSB8fCBlcnJvclJlc3BvbnNlLm1lc3NhZ2VcbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmdldFJlc3BvbnNlQm9keShyZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlcyBhcyBBUElSZXNwb25zZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlcyA9IHtcbiAgICAgIGJvZHk6IHt9LFxuICAgICAgc3RhdHVzOiByZXNwb25zZT8uc3RhdHVzXG4gICAgfSBhcyBBUElSZXNwb25zZTtcblxuICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhID09PSAnTWFpbGd1biBNYWduaWZpY2VudCBBUEknKSB7XG4gICAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgc3RhdHVzVGV4dDogJ0luY29ycmVjdCB1cmwnLFxuICAgICAgICAgIGJvZHk6IHJlc3BvbnNlLmRhdGFcbiAgICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcmVzLmJvZHkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmRhdGFcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5ib2R5ID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHByaXZhdGUgam9pbkFuZFRyYW5zZm9ybUhlYWRlcnMoXG4gICAgb25DYWxsT3B0aW9ucz86IE9uQ2FsbFJlcXVlc3RPcHRpb25zXG4gICk6IEF4aW9zSGVhZGVycyB7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBuZXcgQXhpb3NIZWFkZXJzKCk7XG5cbiAgICBjb25zdCBiYXNpYyA9IGJhc2U2NC5lbmNvZGUoYCR7dGhpcy51c2VybmFtZX06JHt0aGlzLmtleX1gKTtcbiAgICByZXF1ZXN0SGVhZGVycy5zZXRBdXRob3JpemF0aW9uKGBCYXNpYyAke2Jhc2ljfWApO1xuICAgIHJlcXVlc3RIZWFkZXJzLnNldCh0aGlzLmhlYWRlcnMpO1xuXG4gICAgY29uc3QgcmVjZWl2ZWRPbkNhbGxIZWFkZXJzID0gb25DYWxsT3B0aW9ucyAmJiBvbkNhbGxPcHRpb25zLmhlYWRlcnM7XG4gICAgY29uc3Qgb25DYWxsSGVhZGVycyA9IHRoaXMubWFrZUhlYWRlcnNGcm9tT2JqZWN0KHJlY2VpdmVkT25DYWxsSGVhZGVycyk7XG4gICAgcmVxdWVzdEhlYWRlcnMuc2V0KG9uQ2FsbEhlYWRlcnMpO1xuICAgIHJldHVybiByZXF1ZXN0SGVhZGVycztcbiAgfVxuXG4gIHByaXZhdGUgbWFrZUhlYWRlcnNGcm9tT2JqZWN0KFxuICAgIGhlYWRlcnNPYmplY3Q6IFJhd0F4aW9zUmVxdWVzdEhlYWRlcnMgPSB7fVxuICApOiBBeGlvc0hlYWRlcnMge1xuICAgIGxldCByZXF1ZXN0SGVhZGVycyA9IG5ldyBBeGlvc0hlYWRlcnMoKTtcbiAgICByZXF1ZXN0SGVhZGVycyA9IE9iamVjdC5lbnRyaWVzKGhlYWRlcnNPYmplY3QpLnJlZHVjZShcbiAgICAgIChoZWFkZXJzQWNjdW11bGF0b3I6IEF4aW9zSGVhZGVycywgY3VycmVudFBhaXIpID0+IHtcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gY3VycmVudFBhaXI7XG4gICAgICAgIGhlYWRlcnNBY2N1bXVsYXRvci5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiBoZWFkZXJzQWNjdW11bGF0b3I7XG4gICAgICB9LCByZXF1ZXN0SGVhZGVyc1xuICAgICk7XG4gICAgcmV0dXJuIHJlcXVlc3RIZWFkZXJzO1xuICB9XG5cbiAgc2V0U3ViYWNjb3VudEhlYWRlcihzdWJhY2NvdW50SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLm1ha2VIZWFkZXJzRnJvbU9iamVjdCh7XG4gICAgICAuLi50aGlzLmhlYWRlcnMsXG4gICAgICBbU3ViYWNjb3VudHNDbGllbnQuU1VCQUNDT1VOVF9IRUFERVJdOiBzdWJhY2NvdW50SWRcbiAgICB9KTtcbiAgICB0aGlzLmhlYWRlcnMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgcmVzZXRTdWJhY2NvdW50SGVhZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuaGVhZGVycy5kZWxldGUoU3ViYWNjb3VudHNDbGllbnQuU1VCQUNDT1VOVF9IRUFERVIpO1xuICB9XG5cbiAgcXVlcnkoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IEFycmF5PEFycmF5PHN0cmluZz4+LFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgeyBxdWVyeSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIGNvbW1hbmQoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXSB8IHN0cmluZyB8IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhLFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgICBhZGREZWZhdWx0SGVhZGVycyA9IHRydWVcbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGxldCBoZWFkZXJzID0ge307XG4gICAgaWYgKGFkZERlZmF1bHRIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzID0geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfTtcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAuLi5oZWFkZXJzLFxuICAgICAgYm9keTogZGF0YSxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICByZXF1ZXN0T3B0aW9uc1xuICAgICk7XG4gIH1cblxuICBnZXQoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IEFycmF5PEFycmF5PHN0cmluZz4+LFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkoJ2dldCcsIHVybCwgcXVlcnksIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBzdHJpbmcsXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3RXaXRoRkQoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YTogRm9ybURhdGFJbnB1dFxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBwdXRXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IEZvcm1EYXRhSW5wdXQpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHBhdGNoV2l0aEZEKHVybDogc3RyaW5nLCBkYXRhOiBGb3JtRGF0YUlucHV0KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncGF0Y2gnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHB1dCh1cmw6IHN0cmluZywgZGF0YT86IEZvcm1EYXRhSW5wdXQgfCBzdHJpbmcsIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcbiAgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZSh1cmw6IHN0cmluZywgZGF0YT86IElwUG9vbERlbGV0ZURhdGEpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgnZGVsZXRlJywgdXJsLCBkYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIiwiZXhwb3J0IGVudW0gUmVzb2x1dGlvbiB7XG4gICAgSE9VUiA9ICdob3VyJyxcbiAgICBEQVkgPSAnZGF5JyxcbiAgICBNT05USCA9ICdtb250aCdcbn1cblxuZXhwb3J0IGVudW0gU3VwcHJlc3Npb25Nb2RlbHMge1xuICAgIEJPVU5DRVMgPSAnYm91bmNlcycsXG4gICAgQ09NUExBSU5UUyA9ICdjb21wbGFpbnRzJyxcbiAgICBVTlNVQlNDUklCRVMgPSAndW5zdWJzY3JpYmVzJyxcbiAgICBXSElURUxJU1RTID0gJ3doaXRlbGlzdHMnXG59XG5cbmV4cG9ydCBlbnVtIFdlYmhvb2tzSWRzIHtcbiAgICBDTElDS0VEID0gJ2NsaWNrZWQnLFxuICAgIENPTVBMQUlORUQgPSAnY29tcGxhaW5lZCcsXG4gICAgREVMSVZFUkVEID0gJ2RlbGl2ZXJlZCcsXG4gICAgT1BFTkVEID0gJ29wZW5lZCcsXG4gICAgUEVSTUFORU5UX0ZBSUwgPSAncGVybWFuZW50X2ZhaWwnLFxuICAgIFRFTVBPUkFSWV9GQUlMID0gJ3RlbXBvcmFyeV9mYWlsJyxcbiAgICBVTlNVQlNDUklCRUQgPSAndW5zdWJzY3JpYmUnLFxufVxuXG5leHBvcnQgZW51bSBZZXNObyB7XG4gICAgWUVTID0gJ3llcycsXG4gICAgTk8gPSAnbm8nXG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIElMb2dnZXIge1xuICB3YXJuKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWRcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTG9nZ2VyJztcbiIsImltcG9ydCB7XG4gIERvbWFpbkNyZWRlbnRpYWxzLFxuICBEb21haW5DcmVkZW50aWFsc0xpc3QsXG4gIERvbWFpbkNyZWRlbnRpYWxzUXVlcnksXG4gIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0LFxuICBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpbkNyZWRlbnRpYWxzIHtcbiAgICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeTogRG9tYWluQ3JlZGVudGlhbHNRdWVyeSk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNMaXN0PlxuICAgIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogRG9tYWluQ3JlZGVudGlhbHNcbiAgICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PlxuICAgIHVwZGF0ZShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZyxcbiAgICAgICAgZGF0YTogVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG4gICAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD5cbiAgICBkZXN0cm95KFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD5cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHsgUmVzb2x1dGlvbiB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7XG4gIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdzSXRlbSxcbiAgRG9tYWluVGFnc0xpc3QsXG4gIERvbWFpblRhZ3NNZXNzYWdlUmVzLFxuICBEb21haW5UYWdzU3RhdGlzdGljUXVlcnksXG4gIERvbWFpblRhZ1N0YXRpc3RpY0l0ZW1cbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdCB7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBzdGFydDogRGF0ZTtcbiAgICBlbmQ6IERhdGU7XG4gICAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgICBzdGF0czogRG9tYWluVGFnU3RhdGlzdGljSXRlbVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5UYWdzQ2xpZW50IHtcbiAgICBsaXN0KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzTGlzdD5cbiAgICBnZXQoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzSXRlbT5cbiAgICB1cGRhdGUoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyxcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZ1xuICAgICk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+XG4gICAgZGVzdHJveShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz5cbiAgICBzdGF0aXN0aWMoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyxcbiAgICAgICAgcXVlcnk6IERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeVxuICAgICk6IFByb21pc2U8SURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdD5cbiAgICBjb3VudHJpZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbj5cbiAgICBwcm92aWRlcnMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbj5cbiAgICBkZXZpY2VzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uPlxufVxuIiwiaW1wb3J0IHtcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBEb21haW5UZW1wbGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlc1F1ZXJ5LFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGEsXG4gIERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGEsXG4gIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0LFxuICBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQsXG4gIE5vdGlmaWNhdGlvblJlc3VsdCxcbiAgU2hvcnRUZW1wbGF0ZVZlcnNpb24sXG4gIFRlbXBsYXRlUXVlcnksXG4gIFRlbXBsYXRlVmVyc2lvbixcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdFxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluVGVtcGxhdGUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbiAgICBjcmVhdGVkQnk6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHZlcnNpb24/OiBUZW1wbGF0ZVZlcnNpb247XG4gICAgdmVyc2lvbnM/OiBTaG9ydFRlbXBsYXRlVmVyc2lvbltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5UZW1wbGF0ZXNDbGllbnQge1xuICAgIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ+XG4gICAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgcXVlcnk/OiBUZW1wbGF0ZVF1ZXJ5KTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+XG4gICAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBEb21haW5UZW1wbGF0ZURhdGEpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT5cbiAgICB1cGRhdGUoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhXG4gICAgKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PlxuICAgIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PlxuICAgIGRlc3Ryb3lBbGwoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE5vdGlmaWNhdGlvblJlc3VsdD5cbiAgICBjcmVhdGVWZXJzaW9uKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGFcbiAgICApIDogUHJvbWlzZTxDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+XG4gICAgZ2V0VmVyc2lvbihkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+XG4gICAgdXBkYXRlVmVyc2lvbihcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyxcbiAgICAgICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YVxuICAgICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PlxuICAgIGRlc3Ryb3lWZXJzaW9uKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+XG4gICAgbGlzdFZlcnNpb25zKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0PlxufVxuIiwiaW1wb3J0IHtcbiAgQ2xpY2tUcmFja2luZ0luZm8sXG4gIERvbWFpblRyYWNraW5nRGF0YSxcbiAgR2VuZXJhdGVEb21haW5UcmFja2luZ0NlcnRpZmljYXRlUmVzcG9uc2UsXG4gIEdldERvbWFpblRyYWNraW5nQ2VydGlmaWNhdGVSZXNwb25zZSxcbiAgT3BlblRyYWNraW5nSW5mbyxcbiAgUmVnZW5lcmF0ZURvbWFpblRyYWNraW5nQ2VydGlmaWNhdGVSZXNwb25zZSxcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFVwZGF0ZWRPcGVuVHJhY2tpbmcsXG59IGZyb20gJy4uLy4uL1R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluVHJhY2tpbmdDbGllbnQge1xuICBnZXQoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPEdldERvbWFpblRyYWNraW5nQ2VydGlmaWNhdGVSZXNwb25zZT5cbiAgZ2VuZXJhdGUoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPEdlbmVyYXRlRG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlPlxuICByZWdlbmVyYXRlKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxSZWdlbmVyYXRlRG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlPlxuICBnZXRUcmFja2luZyhkb21haW46IHN0cmluZyk6IFByb21pc2U8RG9tYWluVHJhY2tpbmdEYXRhPlxuICB1cGRhdGVUcmFja2luZyhcbiAgICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgICB0eXBlOiBzdHJpbmcsXG4gICAgICAgICAgZGF0YTogT3BlblRyYWNraW5nSW5mbyB8IENsaWNrVHJhY2tpbmdJbmZvIHwgVW5zdWJzY3JpYmVUcmFja2luZ0luZm9cbiAgICAgICk6IFByb21pc2U8VXBkYXRlZE9wZW5UcmFja2luZz5cbn1cbiIsImltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcbmltcG9ydCB7XG4gIENsaWNrVHJhY2tpbmdJbmZvLFxuICBDb25uZWN0aW9uU2V0dGluZ3MsXG4gIERLSU1BdXRob3JpdHlJbmZvLFxuICBES0lNU2VsZWN0b3JJbmZvLFxuICBEb21haW5HZXRRdWVyeSxcbiAgRG9tYWluSW5mbyxcbiAgRG9tYWluc1F1ZXJ5LFxuICBEb21haW5UcmFja2luZ0RhdGEsXG4gIERvbWFpblVwZGF0ZUluZm8sXG4gIE1lc3NhZ2VSZXNwb25zZSxcbiAgT3BlblRyYWNraW5nSW5mbyxcbiAgUmVwbGFjZW1lbnRGb3JQb29sLFxuICBURG9tYWluLFxuICBVbnN1YnNjcmliZVRyYWNraW5nSW5mbyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZERLSU1BdXRob3JpdHksXG4gIFVwZGF0ZWRES0lNU2VsZWN0b3JSZXN1bHQsXG4gIFVwZGF0ZWRPcGVuVHJhY2tpbmcsXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgV2ViUHJlZml4SW5mb1xufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuaW1wb3J0IHsgSURvbWFpbkNyZWRlbnRpYWxzIH0gZnJvbSAnLi9Eb21haW5DcmVkZW50aWFscyc7XG5pbXBvcnQgeyBJRG9tYWluVGFnc0NsaWVudCB9IGZyb20gJy4vRG9tYWluVGFncyc7XG5pbXBvcnQgeyBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IH0gZnJvbSAnLi9Eb21haW5UZW1wbGF0ZXMnO1xuaW1wb3J0IHsgSURvbWFpblRyYWNraW5nQ2xpZW50IH0gZnJvbSAnLi9Eb21haW5UcmFja2luZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpbnNDbGllbnQge1xuICAgIGRvbWFpbkNyZWRlbnRpYWxzOiBJRG9tYWluQ3JlZGVudGlhbHM7XG4gICAgZG9tYWluVGVtcGxhdGVzOiBJRG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuICAgIGRvbWFpblRhZ3M6IElEb21haW5UYWdzQ2xpZW50O1xuICAgIGRvbWFpblRyYWNraW5nOiBJRG9tYWluVHJhY2tpbmdDbGllbnQ7XG4gICAgbGlzdChxdWVyeT86IERvbWFpbnNRdWVyeSk6IFByb21pc2U8VERvbWFpbltdPlxuICAgIGdldChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5HZXRRdWVyeSk6IFByb21pc2U8VERvbWFpbj5cbiAgICBjcmVhdGUoZGF0YTogRG9tYWluSW5mbyk6IFByb21pc2U8VERvbWFpbj5cbiAgICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERvbWFpblVwZGF0ZUluZm8pOiBQcm9taXNlPFREb21haW4+XG4gICAgdmVyaWZ5KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxURG9tYWluPlxuICAgIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT5cbiAgICBnZXRDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxDb25uZWN0aW9uU2V0dGluZ3M+XG4gICAgdXBkYXRlQ29ubmVjdGlvbihkb21haW46IHN0cmluZywgZGF0YTogQ29ubmVjdGlvblNldHRpbmdzKTogUHJvbWlzZTxVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzPlxuICAgIGdldFRyYWNraW5nKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UcmFja2luZ0RhdGE+XG4gICAgdXBkYXRlVHJhY2tpbmcoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0eXBlOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IE9wZW5UcmFja2luZ0luZm8gfCBDbGlja1RyYWNraW5nSW5mbyB8IFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvXG4gICAgKTogUHJvbWlzZTxVcGRhdGVkT3BlblRyYWNraW5nPlxuICAgIGdldElwcyhkb21haW46IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+XG4gICAgYXNzaWduSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPlxuICAgIGRlbGV0ZUlwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgbGlua0lwUG9vbChkb21haW46IHN0cmluZywgcG9vbF9pZDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT5cbiAgICB1bmxpbmtJcFBvbGwoZG9tYWluOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBSZXBsYWNlbWVudEZvclBvb2wpOiBQcm9taXNlPEFQSVJlc3BvbnNlPlxuICAgIHVwZGF0ZURLSU1BdXRob3JpdHkoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERLSU1BdXRob3JpdHlJbmZvKTogUHJvbWlzZTxVcGRhdGVkREtJTUF1dGhvcml0eT5cbiAgICB1cGRhdGVES0lNU2VsZWN0b3IoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERLSU1TZWxlY3RvckluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNU2VsZWN0b3JSZXN1bHQ+XG4gICAgdXBkYXRlV2ViUHJlZml4KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBXZWJQcmVmaXhJbmZvKTogUHJvbWlzZTxVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2U+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0RvbWFpbkNyZWRlbnRpYWxzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGFncyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRlbXBsYXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpbnNDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UcmFja2luZyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuaW1wb3J0IHsgRXZlbnRzTGlzdCwgRXZlbnRzUXVlcnkgfSBmcm9tICcuLi8uLi9UeXBlcy9FdmVudHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElFdmVudENsaWVudCB7XG4gIGdldChkb21haW46IHN0cmluZywgcXVlcnk/OiBFdmVudHNRdWVyeSkgOiBQcm9taXNlPEV2ZW50c0xpc3Q+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lFdmVudENsaWVudCc7XG4iLCJpbXBvcnQge1xuICBJcFBvb2xDcmVhdGVEYXRhLCBJcFBvb2xDcmVhdGVSZXN1bHQsXG4gIElwUG9vbERlbGV0ZURhdGEsIElwUG9vbExpc3RSZXN1bHQsXG4gIElwUG9vbE1lc3NhZ2VSZXN1bHQsIElwUG9vbFVwZGF0ZURhdGFcbn0gZnJvbSAnLi4vLi4vVHlwZXMvSVBQb29scyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUlQUG9vbHNDbGllbnQge1xuICBsaXN0KCk6IFByb21pc2U8SXBQb29sTGlzdFJlc3VsdD5cbiAgY3JlYXRlKGRhdGE6IElwUG9vbENyZWF0ZURhdGEpOiBQcm9taXNlPElwUG9vbENyZWF0ZVJlc3VsdD5cbiAgdXBkYXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xVcGRhdGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PlxuICBkZWxldGUocG9vbElkOiBzdHJpbmcsIGRhdGE6IElwUG9vbERlbGV0ZURhdGEpOiBQcm9taXNlPElwUG9vbE1lc3NhZ2VSZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lJUFBvb2xzQ2xpZW50JztcbiIsImltcG9ydCB7IElwRGF0YSwgSVBzTGlzdFF1ZXJ5LCBJcHNMaXN0UmVzcG9uc2VCb2R5IH0gZnJvbSAnLi4vLi4vVHlwZXMvSVBzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSVBzQ2xpZW50IHtcbiAgbGlzdChxdWVyeTogSVBzTGlzdFF1ZXJ5KTogUHJvbWlzZTxJcHNMaXN0UmVzcG9uc2VCb2R5PlxuICBnZXQoaXA6IHN0cmluZyk6IFByb21pc2U8SXBEYXRhPlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JSVBzQ2xpZW50JztcbiIsImltcG9ydCB7IEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNSZXN1bHQsIEluYm94UGxhY2VtZW50c1ZhbHVlc1Jlc3VsdCB9IGZyb20gJy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQge1xuICBsaXN0KCk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc1Jlc3VsdD47XG4gIGdldChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1ZhbHVlc1Jlc3VsdD47XG59XG4iLCJpbXBvcnQgeyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCB7XG4gIGxpc3QoKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNGaWx0ZXJzUmVzdWx0PlxufVxuIiwiaW1wb3J0IHsgSW5ib3hQbGFjZW1lbnRzRGF0YSwgSW5ib3hQbGFjZW1lbnRzVGVzdFJlc3VsdCB9IGZyb20gJy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCB9IGZyb20gJy4vUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzJztcbmltcG9ydCB7IElTZWVkc0xpc3RzQ2xpZW50IH0gZnJvbSAnLi9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQnO1xuaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCB9IGZyb20gJy4vcHJvdmlkZXJzL0luYm94UGxhY2VtZW50c1Byb3ZpZGVycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUluYm94UGxhY2VtZW50c0NsaWVudCB7XG4gICAgc2VlZHNMaXN0czogSVNlZWRzTGlzdHNDbGllbnQ7XG4gICAgcmVzdWx0czogSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQ7XG4gICAgcHJvdmlkZXJzOiBJSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50O1xuICAgIHJ1blRlc3QoZGF0YTogSW5ib3hQbGFjZW1lbnRzRGF0YSk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzVGVzdFJlc3VsdD47XG59XG4iLCJpbXBvcnQge1xuICBJbmJveFBsYWNlbWVudHNEZXN0cm95UmVzdWx0LFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRXaXRoU3RhdHVzLFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdCxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1F1ZXJ5XG59IGZyb20gJy4uLy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCB9IGZyb20gJy4uL0F0dHJpYnV0ZXNDbGllbnQnO1xuaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQgfSBmcm9tICcuLi9GaWx0ZXJzQ2xpZW50JztcbmltcG9ydCB7IElJUFJTaGFyaW5nQ2xpZW50IH0gZnJvbSAnLi9JbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQge1xuICBzaGFyaW5nOiBJSVBSU2hhcmluZ0NsaWVudDtcbiAgYXR0cmlidXRlczogSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQ7XG4gIGZpbHRlcnM6IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50O1xuICBsaXN0KHF1ZXJ5OiBJbmJveFBsYWNlbWVudHNSZXN1bHRzUXVlcnkpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0PjtcbiAgZ2V0KGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUmVzdWx0V2l0aFN0YXR1cz47XG4gIGRlc3Ryb3koaWQ6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzRGVzdHJveVJlc3VsdD47XG4gIGdldFJlc3VsdEJ5U2hhcmVJZChzaGFyZUlkOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Jlc3VsdFdpdGhTdGF0dXM+O1xufVxuIiwiaW1wb3J0IHtcbiAgSVBSU2hhcmluZ1Jlc3VsdCxcbiAgSVBSU2hhcmluZ1VwZGF0ZURhdGEsXG4gIElQUlNoYXJpbmdVcGRhdGVSZXN1bHRcbn0gZnJvbSAnLi4vLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSVBSU2hhcmluZ0NsaWVudCB7XG4gIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxJUFJTaGFyaW5nUmVzdWx0PjtcbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IElQUlNoYXJpbmdVcGRhdGVEYXRhKTogUHJvbWlzZTxJUFJTaGFyaW5nVXBkYXRlUmVzdWx0Pjtcbn1cbiIsImltcG9ydCB7XG4gIFNlZWRMaXN0UmVzdWx0LFxuICBTZWVkc0xpc3RzQ3JlYXRpbmdEYXRhLFxuICBTZWVkc0xpc3RzRGVzdHJveUFwaVJlc3BvbnNlLFxuICBTZWVkc0xpc3RzUXVlcnksXG4gIFNlZWRzTGlzdHNSZXN1bHQsXG4gIFNlZWRzTGlzdHNVcGRhdGluZ0RhdGEsXG59IGZyb20gJy4uLy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCB9IGZyb20gJy4uL0F0dHJpYnV0ZXNDbGllbnQnO1xuaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQgfSBmcm9tICcuLi9GaWx0ZXJzQ2xpZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBJU2VlZHNMaXN0c0NsaWVudCB7XG4gIGF0dHJpYnV0ZXM6IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50O1xuICBmaWx0ZXJzOiBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudDtcbiAgbGlzdChxdWVyeTogU2VlZHNMaXN0c1F1ZXJ5KTogUHJvbWlzZTxTZWVkc0xpc3RzUmVzdWx0PjtcbiAgZ2V0KGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8U2VlZExpc3RSZXN1bHQ+O1xuICBjcmVhdGUoZGF0YTogU2VlZHNMaXN0c0NyZWF0aW5nRGF0YSk6IFByb21pc2U8U2VlZExpc3RSZXN1bHQ+O1xuICB1cGRhdGUoYWRkcmVzczogc3RyaW5nLCBkYXRhOiBTZWVkc0xpc3RzVXBkYXRpbmdEYXRhKTogUHJvbWlzZTxTZWVkTGlzdFJlc3VsdD47XG4gIGRlc3Ryb3koYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxTZWVkc0xpc3RzRGVzdHJveUFwaVJlc3BvbnNlPjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQXR0cmlidXRlc0NsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL0ZpbHRlcnNDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nJztcbiIsImltcG9ydCB7IElXZWJIb29rc0NsaWVudCB9IGZyb20gJy4uL1dlYmhvb2tzJztcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHsgSURvbWFpbnNDbGllbnQgfSBmcm9tICcuLi9Eb21haW5zJztcbmltcG9ydCB7IElFdmVudENsaWVudCB9IGZyb20gJy4uL0V2ZW50Q2xpZW50JztcbmltcG9ydCB7IElTdGF0c0NsaWVudCB9IGZyb20gJy4uL1N0YXRzJztcbmltcG9ydCB7IElNZXNzYWdlc0NsaWVudCB9IGZyb20gJy4uL01lc3NhZ2VzJztcbmltcG9ydCB7IElTdXBwcmVzc2lvbkNsaWVudCB9IGZyb20gJy4uL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBJUm91dGVzQ2xpZW50IH0gZnJvbSAnLi4vUm91dGVzJztcbmltcG9ydCB7IElWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi4vVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgSUlQc0NsaWVudCB9IGZyb20gJy4uL0lQcyc7XG5pbXBvcnQgeyBJSVBQb29sc0NsaWVudCB9IGZyb20gJy4uL0lQUG9vbHMnO1xuaW1wb3J0IHsgSU1haWxpbmdMaXN0c0NsaWVudCB9IGZyb20gJy4uL01haWxpbmdMaXN0cyc7XG5pbXBvcnQgeyBJU3ViYWNjb3VudHNDbGllbnQgfSBmcm9tICcuLi9TdWJhY2NvdW50cyc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzQ2xpZW50IH0gZnJvbSAnLi4vSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCB7IElNZXRyaWNzQ2xpZW50IH0gZnJvbSAnLi4vTWV0cmljcy9NZXRyaWNzQ2xpZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFpbGd1bkNsaWVudCB7XG4gICAgZG9tYWluczogSURvbWFpbnNDbGllbnQ7XG4gICAgd2ViaG9va3M6IElXZWJIb29rc0NsaWVudDtcbiAgICBldmVudHM6IElFdmVudENsaWVudDtcbiAgICBzdGF0czogSVN0YXRzQ2xpZW50O1xuICAgIG1ldHJpY3M6IElNZXRyaWNzQ2xpZW50O1xuICAgIHN1cHByZXNzaW9uczogSVN1cHByZXNzaW9uQ2xpZW50O1xuICAgIG1lc3NhZ2VzOiBJTWVzc2FnZXNDbGllbnQ7XG4gICAgcm91dGVzOiBJUm91dGVzQ2xpZW50O1xuICAgIHZhbGlkYXRlOiBJVmFsaWRhdGlvbkNsaWVudDtcbiAgICBpcHM6IElJUHNDbGllbnQ7XG4gICAgaXBfcG9vbHM6IElJUFBvb2xzQ2xpZW50O1xuICAgIGxpc3RzOiBJTWFpbGluZ0xpc3RzQ2xpZW50O1xuICAgIHN1YmFjY291bnRzOiBJU3ViYWNjb3VudHNDbGllbnQ7XG4gICAgaW5ib3hQbGFjZW1lbnRzOiBJSW5ib3hQbGFjZW1lbnRzQ2xpZW50O1xuICAgIHNldFN1YmFjY291bnQoc3ViYWNjb3VudElkOiBzdHJpbmcpOiB2b2lkO1xuICAgIHJlc2V0U3ViYWNjb3VudCgpOiB2b2lkO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JTWFpbGd1bkNsaWVudCc7XG4iLCJpbXBvcnQge1xuICBNYWlsTGlzdE1lbWJlcnNRdWVyeSxcbiAgTWFpbExpc3RNZW1iZXJzUmVzdWx0LFxuICBNYWlsTGlzdE1lbWJlcixcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzLFxuICBNdWx0aXBsZU1lbWJlcnNEYXRhLFxuICBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSxcbiAgRGVsZXRlZE1lbWJlclxufSBmcm9tICcuLi8uLi9UeXBlcy9NYWlsaW5nTGlzdHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYWlsTGlzdHNNZW1iZXJzIHtcbiAgbGlzdE1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBNYWlsTGlzdE1lbWJlcnNRdWVyeVxuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyc1Jlc3VsdD47XG5cbiAgZ2V0TWVtYmVyKGFkZHJlc3M6IHN0cmluZywgbWVtYmVyQWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4sXG4gIGNyZWF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPixcbiAgY3JlYXRlTWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZU1lbWJlcnNEYXRhKTogUHJvbWlzZTxOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZT4sXG4gIHVwZGF0ZU1lbWJlcihcbiAgICBhZGRyZXNzOiBzdHJpbmcsXG4gICAgbWVtYmVyQWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+LFxuICBkZXN0cm95TWVtYmVyKGFkZHJlc3M6IHN0cmluZywgbWVtYmVyQWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxEZWxldGVkTWVtYmVyPlxufVxuIiwiaW1wb3J0IHtcbiAgQ3JlYXRlVXBkYXRlTGlzdCwgRGVzdHJveWVkTGlzdCwgTGlzdHNRdWVyeSwgTWFpbGluZ0xpc3QsXG4gIE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdCwgTWFpbGluZ0xpc3RSZXN1bHQsXG4gIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdCwgU3RhcnRWYWxpZGF0aW9uUmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL01haWxpbmdMaXN0cyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4vTWFpbGluZ0xpc3RNZW1iZXJzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFpbGluZ0xpc3RzQ2xpZW50IHtcbiAgbWVtYmVyczogSU1haWxMaXN0c01lbWJlcnM7XG4gIGxpc3QocXVlcnk/OiBMaXN0c1F1ZXJ5KTogUHJvbWlzZTxNYWlsaW5nTGlzdFJlc3VsdD5cbiAgZ2V0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdD5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PlxuICB1cGRhdGUobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PlxuICBkZXN0cm95KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95ZWRMaXN0PlxuICB2YWxpZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8U3RhcnRWYWxpZGF0aW9uUmVzdWx0PlxuICB2YWxpZGF0aW9uUmVzdWx0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQ+XG4gIGNhbmNlbFZhbGlkYXRpb24obWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdD5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RNZW1iZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzQ2xpZW50JztcbiIsImltcG9ydCB7IE1haWxndW5NZXNzYWdlRGF0YSwgTWVzc2FnZXNTZW5kUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvTWVzc2FnZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlc0NsaWVudCB7XG4gIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogTWFpbGd1bk1lc3NhZ2VEYXRhKTogUHJvbWlzZTxNZXNzYWdlc1NlbmRSZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lNZXNzYWdlc0NsaWVudCc7XG4iLCJpbXBvcnQge1xuICBDcmVhdGVVcGRhdGVSb3V0ZURhdGEsIERlc3Ryb3lSb3V0ZVJlc3BvbnNlLCBSb3V0ZSwgUm91dGVzTGlzdFF1ZXJ5LCBVcGRhdGVSb3V0ZVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL1JvdXRlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJvdXRlc0NsaWVudCB7XG4gIGxpc3QocXVlcnk6IFJvdXRlc0xpc3RRdWVyeSk6IFByb21pc2U8Um91dGVbXT5cbiAgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFJvdXRlPlxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxSb3V0ZT5cbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8VXBkYXRlUm91dGVSZXNwb25zZT5cbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95Um91dGVSZXNwb25zZT5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSVJvdXRlc0NsaWVudCc7XG4iLCJpbXBvcnQgeyBTdGF0c1F1ZXJ5IH0gZnJvbSAnLi4vLi4vVHlwZXMvU3RhdHMnO1xuaW1wb3J0IHsgSVN0YXRzQ29udGFpbmVyIH0gZnJvbSAnLi9TdGF0c0NvbnRhaW5lcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRzQ2xpZW50IHtcbiAgZ2V0RG9tYWluKGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPElTdGF0c0NvbnRhaW5lcj5cbiAgZ2V0QWNjb3VudChxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPElTdGF0c0NvbnRhaW5lcj5cbn1cbiIsImltcG9ydCB7IFN0YXQgfSBmcm9tICcuLi8uLi9UeXBlcy9TdGF0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRzQ29udGFpbmVyIHtcbiAgICBzdGFydDogRGF0ZTtcbiAgICBlbmQ6IERhdGU7XG4gICAgcmVzb2x1dGlvbjogc3RyaW5nO1xuICAgIHN0YXRzOiBTdGF0W107XG4gIH1cbiIsImV4cG9ydCAqIGZyb20gJy4vU3RhdHNDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9TdGF0c0NvbnRhaW5lcic7XG4iLCJpbXBvcnQgeyBTdWJhY2NvdW50TGlzdFJlc3BvbnNlRGF0YSwgU3ViYWNjb3VudFJlc3BvbnNlRGF0YSwgU3ViYWNjb3VudHNRdWVyeSB9IGZyb20gJy4uLy4uL1R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBJU3ViYWNjb3VudHNDbGllbnQge1xuICBsaXN0KHF1ZXJ5PzogU3ViYWNjb3VudHNRdWVyeSk6IFByb21pc2U8U3ViYWNjb3VudExpc3RSZXNwb25zZURhdGE+XG4gIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPlxuICBjcmVhdGUobmFtZTogc3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPlxuICBkaXNhYmxlKGlkOiBzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+XG4gIGVuYWJsZShpZDogc3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JU3ViYWNjb3VudHNDbGllbnQnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgaW50ZXJmYWNlIElCb3VuY2Uge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIHR5cGU6IHN0cmluZztcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29tcGxhaW50IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcbiAgICB0eXBlOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge1xuICBTdXBwcmVzc2lvbkxpc3QsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0LFxuICBTdXBwcmVzc2lvbkxpc3RRdWVyeSxcbiAgU3VwcHJlc3Npb25EZXN0cm95UmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBJQm91bmNlIH0gZnJvbSAnLi9Cb3VuY2UnO1xuaW1wb3J0IHsgSUNvbXBsYWludCB9IGZyb20gJy4vQ29tcGxhaW50JztcbmltcG9ydCB7IElVbnN1YnNjcmliZSB9IGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuaW1wb3J0IHsgSVdoaXRlTGlzdCB9IGZyb20gJy4vV2hpdGVMaXN0JztcblxuZXhwb3J0IGludGVyZmFjZSBJU3VwcHJlc3Npb25DbGllbnQge1xuICBsaXN0KGRvbWFpbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIHF1ZXJ5PzogU3VwcHJlc3Npb25MaXN0UXVlcnkpOiBQcm9taXNlPFN1cHByZXNzaW9uTGlzdD5cblxuICBnZXQoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdD5cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25EZXN0cm95UmVzdWx0PlxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgaW50ZXJmYWNlIElVbnN1YnNjcmliZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIHRhZ3M6IGFueTtcbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIHR5cGU6IHN0cmluZztcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgSVdoaXRlTGlzdCB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Cb3VuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9Db21wbGFpbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9VbnN1YnNjcmliZSc7XG5leHBvcnQgKiBmcm9tICcuL1doaXRlTGlzdCc7XG5leHBvcnQgKiBmcm9tICcuL0lTdXBwcmVzc2lvbnNDbGllbnQnO1xuIiwiaW1wb3J0IHtcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdCxcbiAgQ3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYixcbiAgQ2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeVxufSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB7XG4gIGxpc3QocXVlcnk/Ok11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnkpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PlxuICBnZXQobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdD5cbiAgY3JlYXRlKFxuICAgIGxpc3RJZDogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVxuICApOiBQcm9taXNlPENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+XG4gIGRlc3Ryb3kobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPlxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgeyBWYWxpZGF0aW9uUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4vTXVsdGlwbGVWYWxpZGF0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbkNsaWVudCB7XG4gIG11bHRpcGxlVmFsaWRhdGlvbjogSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudFxuICBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxWYWxpZGF0aW9uUmVzdWx0PlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NdWx0aXBsZVZhbGlkYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9uJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5pbXBvcnQgeyBXZWJob29rc0lkcyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7XG4gIFdlYmhvb2tMaXN0LFxuICBXZWJob29rUmVzdWx0LFxuICBXZWJob29rc1F1ZXJ5LFxuICBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL1dlYmhvb2tzJztcblxuZXhwb3J0IGludGVyZmFjZSBJV2ViSG9va3NDbGllbnQge1xuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeTogV2ViaG9va3NRdWVyeSk6IFByb21pc2U8V2ViaG9va0xpc3Q+XG4gIGdldChkb21haW46IHN0cmluZywgaWQ6IFdlYmhvb2tzSWRzKTogUHJvbWlzZTxXZWJob29rUmVzdWx0PlxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsXG4gICAgaWQ6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICB0ZXN0OiBib29sZWFuXG4gICk6IFByb21pc2U8V2ViaG9va1Jlc3VsdCB8IFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2U+XG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcgfCBzdHJpbmdbXSk6IFByb21pc2U8V2ViaG9va1Jlc3VsdD5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZykgOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lXZWJIb29rc0NsaWVudCc7XG4iLCJleHBvcnQgKiBmcm9tICcuL0NvbW1vbic7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsZ3VuQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzJztcbmV4cG9ydCAqIGZyb20gJy4vU3RhdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdXBwcmVzc2lvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL0V2ZW50Q2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vV2ViaG9va3MnO1xuZXhwb3J0ICogZnJvbSAnLi9NZXNzYWdlcyc7XG5leHBvcnQgKiBmcm9tICcuL1JvdXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL0lQcyc7XG5leHBvcnQgKiBmcm9tICcuL0lQUG9vbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdWJhY2NvdW50cyc7XG5leHBvcnQgKiBmcm9tICcuL0luYm94UGxhY2VtZW50cyc7XG4iLCJleHBvcnQgdHlwZSBBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiBhbnk7XG59XG4iLCJleHBvcnQgdHlwZSBBUElFcnJvck9wdGlvbnMgPSB7XG4gIGhlYWRlcnM/OiB7IFtrZXk6IHN0cmluZ106IHVua25vd24gfTtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIGJvZHk6IHtcbiAgICBlcnJvcj86IHN0cmluZyxcbiAgICBtZXNzYWdlPzogc3RyaW5nXG4gIH07XG4gIHVybD86IHN0cmluZztcbiAgc3RhdHVzVGV4dD86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQVBJRXJyb3JUeXBlID0ge1xuICBzdGFjazogc3RyaW5nO1xuICBzdGF0dXM6IG51bWJlcjtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBkZXRhaWxzOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgKiBhcyBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCB7IEZvcm1EYXRhSW5wdXRWYWx1ZSB9IGZyb20gJy4uL01lc3NhZ2VzJztcblxuZXhwb3J0IHR5cGUgRm9ybURhdGFPcHRpb25zID0ge1xuICBba2V5OiBzdHJpbmddOiBOb2RlRm9ybURhdGE7XG59XG5cbmV4cG9ydCB0eXBlIElucHV0Rm9ybURhdGEgPVxuICB7XG4gICAgbmV3KGZvcm0/OiBIVE1MRm9ybUVsZW1lbnQgfCB1bmRlZmluZWQsIHN1Ym1pdHRlcj86IEhUTUxFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZCk6IEZvcm1EYXRhO1xuICB9IHxcbiAge1xuICAgIG5ldyhvcHRpb25zPzogRm9ybURhdGFPcHRpb25zKTogTm9kZUZvcm1EYXRhXG4gIH1cblxuZXhwb3J0IHR5cGUgRm9ybURhdGFJbnB1dCA9IHtcbiAgW2tleTogc3RyaW5nXTogRm9ybURhdGFJbnB1dFZhbHVlO1xufTtcbiIsImV4cG9ydCB0eXBlIFBhZ2VzTGlzdCA9IHtcbiAgICBwcmV2aW91czogc3RyaW5nO1xuICAgIGZpcnN0OiBzdHJpbmc7XG4gICAgbGFzdDogc3RyaW5nO1xuICAgIG5leHQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VkUGFnZSA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHBhZ2U6IHN0cmluZztcbiAgICBpdGVyYXRvclBvc2l0aW9uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgdXJsOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VkUGFnZXNMaXN0ID0ge1xuICAgIHByZXZpb3VzOiBQYXJzZWRQYWdlO1xuICAgIGZpcnN0OiBQYXJzZWRQYWdlO1xuICAgIGxhc3Q6IFBhcnNlZFBhZ2U7XG4gICAgbmV4dDogUGFyc2VkUGFnZTtcbn1cblxuZXhwb3J0IHR5cGUgUGFnZXNMaXN0QWNjdW11bGF0b3IgPSB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBQYXJzZWRQYWdlO1xufVxuXG5leHBvcnQgdHlwZSBSZXNwb25zZVdpdGhQYWdpbmcgPSB7XG4gICAgYm9keToge1xuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdFxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgUXVlcnlXaXRoUGFnZSA9IHtcbiAgICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkVXJsQW5kUXVlcnkgPSB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgdXBkYXRlZFF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbn1cbiIsImltcG9ydCB7IEF4aW9zUmVxdWVzdEhlYWRlcnMsIFJhd0F4aW9zUmVxdWVzdEhlYWRlcnMgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBNYWlsZ3VuQ2xpZW50T3B0aW9ucyB9IGZyb20gJy4uL01haWxndW5DbGllbnQnO1xuXG5leHBvcnQgdHlwZSBPbkNhbGxFbXB0eUhlYWRlcnMgPSB7XG4gIFtrZXk6IHN0cmluZ106IHVuZGVmaW5lZDtcbn1cbmV4cG9ydCB0eXBlIFJlcXVlc3RPcHRpb25zID0gTWFpbGd1bkNsaWVudE9wdGlvbnMgJiB7XG4gIGhlYWRlcnM6IEF4aW9zUmVxdWVzdEhlYWRlcnMgfCBSYXdBeGlvc1JlcXVlc3RIZWFkZXJzO1xuICB0aW1lb3V0OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIE9uQ2FsbFJlcXVlc3RPcHRpb25zID0ge1xuICB0aW1lb3V0PzogbnVtYmVyO1xuICBoZWFkZXJzPzogQXhpb3NSZXF1ZXN0SGVhZGVycyB8IFJhd0F4aW9zUmVxdWVzdEhlYWRlcnM7XG4gIHF1ZXJ5PzogYW55O1xuICBba2V5OiBzdHJpbmddOiB1bmtub3duIHwgdW5kZWZpbmVkO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9FcnJvcic7XG5leHBvcnQgKiBmcm9tICcuL0FwaVJlc3BvbnNlJztcbmV4cG9ydCAqIGZyb20gJy4vRm9ybURhdGEnO1xuZXhwb3J0ICogZnJvbSAnLi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmV4cG9ydCAqIGZyb20gJy4vUmVxdWVzdE9wdGlvbnMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFsc1F1ZXJ5ID0ge1xuICAgIGxpbWl0OiBudW1iZXI7XG4gICAgc2tpcDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFscyA9IHtcbiAgICBsb2dpbjogc3RyaW5nO1xuICAgIHBhc3N3b3JkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzSXRlbSA9IHtcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmcsXG4gICAgbG9naW46IHN0cmluZyxcbiAgICBtYWlsYm94OiBzdHJpbmcsXG4gICAgc2l6ZV9ieXRlczogbnVtYmVyIHwgbnVsbFxufVxuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogRG9tYWluQ3JlZGVudGlhbHNJdGVtW107XG4gICAgICAgIHRvdGFsX2NvdW50OiBudW1iZXI7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFsc0xpc3QgPSB7XG4gICAgaXRlbXM6IERvbWFpbkNyZWRlbnRpYWxzSXRlbVtdO1xuICAgIHRvdGFsQ291bnQ6IG51bWJlcjtcbn1cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyLFxuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzcGVjPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXIsXG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcixcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgc3BlYzogc3RyaW5nO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhID0ge1xuICAgIHBhc3N3b3JkOiBzdHJpbmc7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCB7IFJlc29sdXRpb24gfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NRdWVyeSA9IHtcbiAgICBsaW1pdDogbnVtYmVyO1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSA9IHtcbiAgICBldmVudDogc3RyaW5nO1xuICAgIHN0YXJ0PzogbnVtYmVyO1xuICAgIGVuZD86IG51bWJlcjtcbiAgICByZXNvbHV0aW9uPzogUmVzb2x1dGlvbjtcbiAgICBkdXJhdGlvbj86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc0l0ZW1JbmZvID0ge1xuICAgIHRhZzogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgJ2ZpcnN0LXNlZW4nOiBzdHJpbmcsXG4gICAgJ2xhc3Qtc2Vlbic6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzSXRlbSA9IHtcbiAgICB0YWc6IHN0cmluZyxcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgICdmaXJzdC1zZWVuJzogRGF0ZSxcbiAgICAnbGFzdC1zZWVuJzogRGF0ZVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzUmVzcG9uc2VEYXRhID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IERvbWFpblRhZ3NJdGVtSW5mb1tdO1xuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdFxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc0xpc3QgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgaXRlbXM6IERvbWFpblRhZ3NJdGVtW107XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc01lc3NhZ2VSZXMgPSB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHN0YXR1cz86IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0gPSB7XG4gICAgdGltZTpzdHJpbmdcbiAgICBhY2NlcHRlZD86IHtcbiAgICAgICAgaW5jb21pbmc6IG51bWJlcjtcbiAgICAgICAgb3V0Z29pbmc6IG51bWJlcjtcbiAgICAgICAgdG90YWw6IG51bWJlclxuICAgIH1cbiAgICBkZWxpdmVyZWQ/OiB7XG4gICAgICAgIHNtdHA6IG51bWJlcjtcbiAgICAgICAgaHR0cDogbnVtYmVyO1xuICAgICAgICBvcHRpbWl6ZWQ6IG51bWJlcjtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIG9wZW5lZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIGZhaWxlZD86IHtcbiAgICAgICAgdGVtcG9yYXJ5OntcbiAgICAgICAgICAgIGVzcGJsb2NrOiBudW1iZXI7XG4gICAgICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgICAgICB9O1xuICAgICAgICBwZXJtYW5lbnQ6IHtcbiAgICAgICAgICAgICdzdXBwcmVzcy1ib3VuY2UnOiBudW1iZXI7XG4gICAgICAgICAgICAnc3VwcHJlc3MtdW5zdWJzY3JpYmUnOiBudW1iZXI7XG4gICAgICAgICAgICAnc3VwcHJlc3MtY29tcGxhaW50JzogbnVtYmVyO1xuICAgICAgICAgICAgYm91bmNlOiBudW1iZXI7XG4gICAgICAgICAgICAnZGVsYXllZC1ib3VuY2UnOiBudW1iZXI7XG4gICAgICAgICAgICB3ZWJob29rOiBudW1iZXI7XG4gICAgICAgICAgICBvcHRpbWl6ZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjbGlja2VkPzoge1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH07XG4gICAgdW5zdWJzY3JpYmVkPzoge1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH07XG4gICAgY29tcGxhaW5lZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIHN0b3JlZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSA9IHtcbiAgICBib2R5OntcbiAgICAgICAgdGFnOiBzdHJpbmc7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgICAgIHN0YXJ0OiBzdHJpbmc7XG4gICAgICAgIGVuZDogc3RyaW5nO1xuICAgICAgICByZXNvbHV0aW9uOiBSZXNvbHV0aW9uO1xuICAgICAgICBzdGF0czogRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW1bXTtcbiAgICB9XG59XG5leHBvcnQgdHlwZSBEb21haW5UYWdTdGF0aXN0aWNJdGVtID0gT21pdCA8RG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0sICd0aW1lJz4gJiB7XG4gICAgdGltZTogRGF0ZVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIHRhZzpzdHJpbmc7XG4gICAgICAgIGNvdW50cnk6IHtcbiAgICAgICAgICAgIFtrZXk6c3RyaW5nXToge1xuICAgICAgICAgICAgICAgIGNsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bmlxdWVfb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbiA9IHtcbiAgICB0YWc6c3RyaW5nO1xuICAgIGNvdW50cnk6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICAgICAgY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgY29tcGxhaW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICB1bmlxdWVfY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5pcXVlX29wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ1Byb3ZpZGVyc0FQSVJlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgdGFnOnN0cmluZztcbiAgICAgICAgcHJvdmlkZXI6IHtcbiAgICAgICAgICAgIFtrZXk6c3RyaW5nXToge1xuICAgICAgICAgICAgICAgIGFjY2VwdGVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIGNvbXBsYWluZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBkZWxpdmVyZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBvcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bmlxdWVfY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuaXF1ZV9vcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uID0ge1xuICAgIHRhZzogc3RyaW5nO1xuICAgIHByb3ZpZGVyOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHtcbiAgICAgICAgICAgIGFjY2VwdGVkOiBudW1iZXI7XG4gICAgICAgICAgICBjbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgICAgICAgICBkZWxpdmVyZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIG9wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuaXF1ZV9vcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlZDogbnVtYmVyO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgRGV2aWNlU3RhdGlzdGljID0ge1xuICAgIGNsaWNrZWQ6IG51bWJlcjtcbiAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgb3BlbmVkOiBudW1iZXI7XG4gICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICB1bmlxdWVfb3BlbmVkOiBudW1iZXI7XG4gICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERldmljZXNUeXBlcyA9IHtcbiAgICBkZXNrdG9wOiBEZXZpY2VTdGF0aXN0aWM7XG4gICAgbW9iaWxlOiBEZXZpY2VTdGF0aXN0aWM7XG4gICAgdGFibGV0OiBEZXZpY2VTdGF0aXN0aWM7XG4gICAgdW5rbm93bjogRGV2aWNlU3RhdGlzdGljO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdEZXZpY2VzQVBJUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICB0YWc6c3RyaW5nO1xuICAgICAgICBkZXZpY2U6IERldmljZXNUeXBlcztcbiAgICB9XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbiA9IHtcbiAgICB0YWc6IHN0cmluZztcbiAgICBkZXZpY2U6IERldmljZXNUeXBlcztcbn1cbiIsImltcG9ydCB7IFllc05vIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSURvbWFpblRlbXBsYXRlIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcbmltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBEb21haW5UZW1wbGF0ZURhdGEgPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgdGVtcGxhdGU6IHN0cmluZztcbiAgICB0YWc/OiBzdHJpbmc7XG4gICAgZW5naW5lPzogc3RyaW5nO1xuICAgIGNvbW1lbnQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGEgPSB7XG4gICAgdGVtcGxhdGU6IHN0cmluZztcbiAgICB0YWc6IHN0cmluZztcbiAgICBlbmdpbmU/OiBzdHJpbmc7XG4gICAgY29tbWVudD86IHN0cmluZztcbiAgICBhY3RpdmU/OiBZZXNObztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhID0ge1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGEgPSB7XG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7XG4gICAgY29tbWVudD86IHN0cmluZztcbiAgICBhY3RpdmU/OiBZZXNObztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGVtcGxhdGVzUXVlcnkgPSB7XG4gICAgLyoqICdwYWdlJyAob3B0aW9uYWxseSAncCcpIHBhcmFtcyBmcm9tIHByZXZpb3VzIHJlc3BvbnNlJ3MgJ3BhZ2luZycgb2JqZWN0LlxuICAgICAqIFZhbHVlIG11c3QgYmUgc3RyaW5naWZpZWQgYXMgcXVlcnkgcGFyYW1zLiBFeDogJz9wYWdlPWZpcnN0JywnP3BhZ2U9bmV4dCZwPW5hbWUtb2YtbGFzdC1pdGVtJ1xuICAgICAuLi4uICovXG4gICAgcGFnZT86IGA/JHtzdHJpbmd9YDtcbiAgICAvKiogTnVtYmVyIG9mIHJlY29yZHMgdG8gcmV0cmlldmUuIERlZmF1bHQgdmFsdWUgaXMgMTAuICovXG4gICAgbGltaXQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFRlbXBsYXRlUXVlcnkgPSB7XG4gICAgYWN0aXZlOiBZZXNObztcbn1cblxuZXhwb3J0IHR5cGUgU2hvcnRUZW1wbGF0ZVZlcnNpb24gPSB7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgZW5naW5lOiBzdHJpbmc7XG4gICAgbWptbDogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbiAgICBjb21tZW50OiBzdHJpbmc7XG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIGlkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFRlbXBsYXRlVmVyc2lvbiA9IFNob3J0VGVtcGxhdGVWZXJzaW9uICYge1xuICAgIHRlbXBsYXRlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IElEb21haW5UZW1wbGF0ZVtdO1xuICAgICAgICBwYWdpbmc6IHtcbiAgICAgICAgICAgIGZpcnN0OiBzdHJpbmc7XG4gICAgICAgICAgICBsYXN0OiBzdHJpbmc7XG4gICAgICAgICAgICBuZXh0OiBzdHJpbmc7XG4gICAgICAgICAgICBwcmV2aW91czogc3RyaW5nO1xuICAgICAgICB9O1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQgPSB7XG4gICAgICAgIGl0ZW1zOiBJRG9tYWluVGVtcGxhdGVbXTtcbiAgICAgICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbiAgICAgICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICB0ZW1wbGF0ZTogSURvbWFpblRlbXBsYXRlO1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZ1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdGVtcGxhdGVOYW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBOb3RpZmljYXRpb25BUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBOb3RpZmljYXRpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgdGVtcGxhdGU6IElEb21haW5UZW1wbGF0ZTtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG59XG5cbmV4cG9ydCB0eXBlIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICAgICAgdmVyc2lvbjoge1xuICAgICAgICAgICAgICAgIHRhZzogc3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmc7XG4gICAgdGVtcGxhdGVWZXJzaW9uOiB7XG4gICAgICAgIHRhZzogc3RyaW5nO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgICAgICAgICAgY3JlYXRlZEF0OiBzdHJpbmc7XG4gICAgICAgICAgICBjcmVhdGVkQnk6IHN0cmluZztcbiAgICAgICAgICAgIGlkOiBzdHJpbmc7XG4gICAgICAgICAgICB2ZXJzaW9uczogU2hvcnRUZW1wbGF0ZVZlcnNpb25bXVxuICAgICAgICB9XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0ID0ge1xuICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5leHBvcnQgdHlwZSBEb21haW5UcmFja2luZ0RhdGEgPSB7XG4gIGNsaWNrOiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuICBvcGVuOiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuICB1bnN1YnNjcmliZToge1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBodG1sX2Zvb3Rlcjogc3RyaW5nO1xuICAgIHRleHRfZm9vdGVyOiBzdHJpbmc7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVHJhY2tpbmdSZXNwb25zZSA9IHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIGJvZHk6IHtcbiAgICB0cmFja2luZzogRG9tYWluVHJhY2tpbmdEYXRhXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRPcGVuVHJhY2tpbmcgPSB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgb3Blbj86IHsgYWN0aXZlOiBib29sZWFuIH07XG4gIGNsaWNrPzogeyBhY3RpdmU6IGJvb2xlYW4gfCAnaHRtbG9ubHknIH07XG4gIHVuc3Vic2NyaWJlPzoge1xuICAgIGFjdGl2ZTogYm9vbGVhbixcbiAgICBodG1sX2Zvb3Rlcjogc3RyaW5nO1xuICAgIHRleHRfZm9vdGVyOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBib2R5OiBVcGRhdGVkT3BlblRyYWNraW5nO1xufVxuXG5leHBvcnQgdHlwZSBPcGVuVHJhY2tpbmdJbmZvID0ge1xuICBwbGFjZV9hdF90aGVfdG9wPzogJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwgJ2ZhbHNlJ3wgYm9vbGVhbixcbiAgYWN0aXZlOiAneWVzJyB8ICdubycgfCAndHJ1ZScgfCAnZmFsc2UnfCBib29sZWFuO1xufVxuZXhwb3J0IHR5cGUgQ2xpY2tUcmFja2luZ0luZm8gPSB7XG4gIGFjdGl2ZT86ICd5ZXMnIHwgJ25vJyB8ICd0cnVlJyB8ICdmYWxzZScgfCAnaHRtbG9ubHknIHwgYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8gPSB7XG4gIGFjdGl2ZT86ICd5ZXMnIHwgJ25vJyB8ICd0cnVlJyB8ICdmYWxzZScgfCBib29sZWFuO1xuICBodG1sX2Zvb3Rlcj86IHN0cmluZztcbiAgdGV4dF9mb290ZXI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEdldERvbWFpblRyYWNraW5nQ2VydGlmaWNhdGVSZXNwb25zZSA9IHtcbiAgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXJcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGNlcnRpZmljYXRlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEdlbmVyYXRlRG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlID0ge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGxvY2F0aW9uOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBSZWdlbmVyYXRlRG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlID0ge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGxvY2F0aW9uOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBEb21haW5zUXVlcnkgPSB7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgc2tpcD86IG51bWJlcjtcbiAgICBzdGF0ZT86ICdhY3RpdmUnIHwgJ3VudmVyaWZpZWQnIHwgJ2Rpc2FibGVkJztcbiAgICBzb3J0PzogJ25hbWU6YXNjJyB8ICduYW1lOiBkZXNjJ1xuICAgIGF1dGhvcml0eT8gOiBzdHJpbmc7XG4gICAgc2VhcmNoPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5VcGRhdGVJbmZvID0ge1xuICAgIHNwYW1fYWN0aW9uPzogJ2Rpc2FibGVkJyB8ICdibG9jaycgfCAndGFnJztcbiAgICB3ZWJfc2NoZW1lPzogJ2h0dHAnIHwgJ2h0dHBzJztcbiAgICB3aWxkY2FyZD86IGJvb2xlYW4gfCAndHJ1ZScgfCAnZmFsc2UnO1xuICAgIG1haWxmcm9tX2hvc3Q/OiBzdHJpbmc7XG4gICAgbWVzc2FnZV90dGw/OiBudW1iZXI7XG4gICAgc210cF9wYXNzd29yZD86IHN0cmluZztcbiAgICB1c2VfYXV0b21hdGljX3NlbmRlcl9zZWN1cml0eT86IGJvb2xlYW4gfCAndHJ1ZScgfCAnZmFsc2UnO1xuICAgIHdlYl9wcmVmaXg/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblVwZGF0ZUluZm9SZXEgPSBPbWl0PERvbWFpblVwZGF0ZUluZm8sICdtZXNzYWdlX3R0bCc+ICYge1xuICAgIHdpbGRjYXJkPzogJ3RydWUnIHwgJ2ZhbHNlJzsgLy8gYXBpIHN1cHBvcnRzIG9ubHkgc3RyaW5nc1xuICAgIHVzZV9hdXRvbWF0aWNfc2VuZGVyX3NlY3VyaXR5PzogJ3RydWUnIHwgJ2ZhbHNlJzsgLy8gYXBpIHN1cHBvcnRzIG9ubHkgc3RyaW5nc1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5JbmZvID0gRG9tYWluVXBkYXRlSW5mbyAmIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGtpbV9ob3N0X25hbWU/OiBzdHJpbmc7XG4gICAgZGtpbV9rZXlfc2l6ZT86IDEwMjQgfCAyMDQ4O1xuICAgIGRraW1fc2VsZWN0b3I/OiBzdHJpbmc7XG4gICAgZW5jcnlwdF9pbmNvbWluZ19tZXNzYWdlPzogYm9vbGVhbiB8ICd0cnVlJyB8ICdmYWxzZSc7XG4gICAgZm9yY2VfZGtpbV9hdXRob3JpdHk/OiBib29sZWFuIHwgJ3RydWUnIHwgJ2ZhbHNlJztcbiAgICBmb3JjZV9yb290X2RraW1faG9zdD86IGJvb2xlYW4gfCAndHJ1ZScgfCAnZmFsc2UnO1xuICAgIHBvb2xfaWQ/OiAnJztcbiAgICBpcHM/OiAnJztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluSW5mb1JlcSA9IERvbWFpbkluZm8gJiB7XG4gICAgZm9yY2VfZGtpbV9hdXRob3JpdHk/OiAndHJ1ZScgfCAnZmFsc2UnO1xufVxuXG5leHBvcnQgdHlwZSBCb29sVG9TdHJpbmcgPSB7XG4gICAgZW5jcnlwdF9pbmNvbWluZ19tZXNzYWdlOiBEb21haW5JbmZvWydlbmNyeXB0X2luY29taW5nX21lc3NhZ2UnXTtcbiAgICBmb3JjZV9ka2ltX2F1dGhvcml0eTogRG9tYWluSW5mb1snZm9yY2VfZGtpbV9hdXRob3JpdHknXTtcbiAgICBmb3JjZV9yb290X2RraW1faG9zdDogRG9tYWluSW5mb1snZm9yY2Vfcm9vdF9ka2ltX2hvc3QnXTtcbiAgICB3aWxkY2FyZDogRG9tYWluSW5mb1snd2lsZGNhcmQnXTtcbiAgICB1c2VfYXV0b21hdGljX3NlbmRlcl9zZWN1cml0eTogRG9tYWluSW5mb1sndXNlX2F1dG9tYXRpY19zZW5kZXJfc2VjdXJpdHknXTtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluRGF0YSA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGlzX2Rpc2FibGVkOiBib29sZWFuO1xuICAgIHdlYl9wcmVmaXg6IHN0cmluZztcbiAgICB3ZWJfc2NoZW1lOiBzdHJpbmc7XG4gICAgdXNlX2F1dG9tYXRpY19zZW5kZXJfc2VjdXJpdHk6IGJvb2xlYW47XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICAgIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xuICAgIHN0YXRlOiBzdHJpbmc7XG4gICAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gICAgc3BhbV9hY3Rpb246IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gICAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICAgIHNtdHBfbG9naW46IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgZGtpbV9ob3N0Pzogc3RyaW5nO1xuICAgIG1haWxmcm9tX2hvc3Q/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9tYWluc0xpc3RJdGVtIGV4dGVuZHMgRG9tYWluRGF0YXtcbiAgICByZWNlaXZpbmdfZG5zX3JlY29yZHM6IG51bGw7XG4gICAgc2VuZGluZ19kbnNfcmVjb3JkczogbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBETlNSZWNvcmQge1xuICAgIGNhY2hlZDogYW55W107XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJlY29yZF90eXBlOiBzdHJpbmc7XG4gICAgdmFsaWQ6IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIHByaW9yaXR5Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5SZXNwb25zZURhdGEgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBkb21haW46IERvbWFpbkRhdGE7XG4gICAgICAgIG1lc3NhZ2U/OiBzdHJpbmc7XG4gICAgICAgIHJlY2VpdmluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW107XG4gICAgICAgIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluTGlzdFJlc3BvbnNlRGF0YSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBEb21haW5zTGlzdEl0ZW1bXSB8IG51bGw7XG4gICAgICAgIHRvdGFsX2NvdW50OiBudW1iZXI7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBNZXNzYWdlUmVzcG9uc2UgPSB7XG4gICAgbWVzc2FnZSA6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBEZXN0cm95ZWREb21haW5SZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiBNZXNzYWdlUmVzcG9uc2Vcbn1cblxuZXhwb3J0IHR5cGUgQ29ubmVjdGlvblNldHRpbmdzID0ge1xuICAgIHJlcXVpcmVfdGxzPzogYm9vbGVhbjtcbiAgICBza2lwX3ZlcmlmaWNhdGlvbj86IGJvb2xlYW47XG59XG5leHBvcnQgdHlwZSBDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSA9IHtcbiAgICBib2R5OiBDb25uZWN0aW9uU2V0dGluZ3NcbiAgICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzID0ge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICByZXF1aXJlX3RsczogYm9vbGVhbjtcbiAgICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhblxufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzID0ge1xuICAgIGJvZHk6IFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3M7XG4gICAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgREtJTUF1dGhvcml0eUluZm8gPSB7XG4gICAgc2VsZjogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJyB8ICd0cnVlJyB8J2ZhbHNlJ1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkREtJTUF1dGhvcml0eSA9IHtcbiAgICBjaGFuZ2VkOiBib29sZWFuO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzZW5kaW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXVxufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlID0ge1xuICAgIGJvZHk6IFVwZGF0ZWRES0lNQXV0aG9yaXR5O1xuICAgIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBES0lNU2VsZWN0b3JJbmZvID0ge1xuICAgIGRraW1TZWxlY3Rvcjogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRES0lNU2VsZWN0b3JSZXNwb25zZSA9IHtcbiAgICBib2R5Ok1lc3NhZ2VSZXNwb25zZTtcbiAgICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkREtJTVNlbGVjdG9yUmVzdWx0ID0gTWVzc2FnZVJlc3BvbnNlICYge1xuICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBXZWJQcmVmaXhJbmZvID0ge1xuICAgIHdlYlByZWZpeDogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRXZWJQcmVmaXggPSB7XG4gICAgbWVzc2FnZSA6IHN0cmluZ1xufVxuZXhwb3J0IHR5cGUgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlID0ge1xuICAgIGJvZHk6TWVzc2FnZVJlc3BvbnNlO1xuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFJlcGxhY2VtZW50Rm9yUG9vbCA9IHtcbiAgICBwb29sX2lkPzogc3RyaW5nO1xuICAgIGlwPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBURG9tYWluID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgc3RhdGU6IHN0cmluZztcbiAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gIHNwYW1fYWN0aW9uOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IERhdGU7XG4gIHNtdHBfcGFzc3dvcmQ6IHN0cmluZztcbiAgc210cF9sb2dpbjogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHJlY2VpdmluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuICBzZW5kaW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIGlkOiBzdHJpbmc7XG4gIGlzX2Rpc2FibGVkOiBib29sZWFuO1xuICB3ZWJfcHJlZml4OiBzdHJpbmc7XG4gIHdlYl9zY2hlbWU6IHN0cmluZztcbiAgdXNlX2F1dG9tYXRpY19zZW5kZXJfc2VjdXJpdHk6IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIGRraW1faG9zdD86IHN0cmluZztcbiAgbWFpbGZyb21faG9zdD86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluRHluYW1pY1Byb3BzVHlwZSA9IFBpY2s8RG9tYWluRGF0YSwgJ2RraW1faG9zdCcgfCAnbWFpbGZyb21faG9zdCcgPlxuXG5leHBvcnQgdHlwZSBEb21haW5HZXRRdWVyeSA9IHtcbiAgZXh0ZW5kZWQ/OiBib29sZWFuO1xuICB3aXRoX2Rucz86IGJvb2xlYW47XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0RvbWFpbkNyZWRlbnRpYWxzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWlucyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRhZ3MnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UZW1wbGF0ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UcmFja2luZyc7XG4iLCJpbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbmV4cG9ydCB0eXBlIEV2ZW50c1BhZ2UgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBudW1iZXI6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRmlsdGVyRmllbGQgPSB7XG4gICAgZXZlbnQ/OiBzdHJpbmc7XG4gICAgbGlzdD86IHN0cmluZztcbiAgICBhdHRhY2htZW50Pzogc3RyaW5nO1xuICAgIGZyb20/OiBzdHJpbmc7XG4gICAgJ21lc3NhZ2UtaWQnPzogc3RyaW5nO1xuICAgIHN1YmplY3Q/OiBzdHJpbmc7XG4gICAgdG8/OiBzdHJpbmc7XG4gICAgc2l6ZT86IHN0cmluZztcbiAgICByZWNpcGllbnQ/OiBzdHJpbmc7XG4gICAgcmVjaXBpZW50cz86IHN0cmluZztcbiAgICB0YWdzPzogc3RyaW5nO1xuICAgIHNldmVyaXR5Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBFdmVudHNRdWVyeSA9IEZpbHRlckZpZWxkICYge1xuICAgIHBhZ2U/OiBzdHJpbmc7XG4gICAgYmVnaW4/OiBzdHJpbmc7XG4gICAgZW5kPzogc3RyaW5nO1xuICAgIGFzY2VuZGluZz86ICd5ZXMnfCAnbm8nO1xuICAgIGxpbWl0PzogbnVtYmVyO1xufVxuZXhwb3J0IHR5cGUgRXZlbnRzUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogW107XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICAgIH0sXG4gICAgc3RhdHVzOiBudW1iZXJcbn1cbmV4cG9ydCB0eXBlIERvbWFpbkV2ZW50ID0ge1xuICAgIHNldmVyaXR5OiBzdHJpbmc7XG4gICAgdGFnczogc3RyaW5nW107XG4gICAgc3RvcmFnZToge1xuICAgICAgICB1cmw6IHN0cmluZztcbiAgICAgICAga2V5OiBzdHJpbmdcbiAgICB9O1xuICAgICdkZWxpdmVyeS1zdGF0dXMnOiB7XG4gICAgICAgIHRsczogYm9vbGVhbjtcbiAgICAgICAgJ214LWhvc3QnOiBzdHJpbmc7XG4gICAgICAgIGNvZGU6IG51bWJlcjtcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICAgICAgJ3Nlc3Npb24tc2Vjb25kcyc6IG51bWJlcjtcbiAgICAgICAgdXRmODogYm9vbGVhbjtcbiAgICAgICAgJ2F0dGVtcHQtbm8nOiBudW1iZXI7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgJ2NlcnRpZmljYXRlLXZlcmlmaWVkJzogYm9vbGVhblxuICAgIH07XG4gICAgJ3JlY2lwaWVudC1kb21haW4nOiBzdHJpbmc7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjYW1wYWlnbnM6IFtdO1xuICAgIHJlYXNvbjogc3RyaW5nO1xuICAgICd1c2VyLXZhcmlhYmxlcyc6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgICB9O1xuICAgIGZsYWdzOiB7XG4gICAgICAgICdpcy1yb3V0ZWQnOiBib29sZWFuO1xuICAgICAgICAnaXMtYXV0aGVudGljYXRlZCc6IGJvb2xlYW47XG4gICAgICAgICdpcy1zeXN0ZW0tdGVzdCc6IGJvb2xlYW47XG4gICAgICAgICdpcy10ZXN0LW1vZGUnOiBib29sZWFuXG4gICAgfTtcbiAgICAnbG9nLWxldmVsJyA6IHN0cmluZztcbiAgICB0ZW1wbGF0ZT86IHVua25vd247XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gICAgZW52ZWxvcGU6IHtcbiAgICAgICAgdHJhbnNwb3J0OiBzdHJpbmc7XG4gICAgICAgIHNlbmRlcjogc3RyaW5nO1xuICAgICAgICAnc2VuZGluZy1pcCc6IHN0cmluZztcbiAgICAgICAgdGFyZ2V0czogc3RyaW5nXG4gICAgfTtcbiAgICBtZXNzYWdlOiB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIHRvOiBzdHJpbmc7XG4gICAgICAgICAgICAnbWVzc2FnZS1pZCc6IHN0cmluZztcbiAgICAgICAgICAgIGZyb206IHN0cmluZztcbiAgICAgICAgICAgIHN1YmplY3Q6IHN0cmluZ1xuICAgICAgICB9O1xuICAgICAgICBhdHRhY2htZW50czogW107XG4gICAgICAgIHNpemU6IDMwOFxuICAgIH07XG4gICAgcmVjaXBpZW50OiBzdHJpbmc7XG4gICAgZXZlbnQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRXZlbnRzTGlzdCA9IHtcbiAgICBpdGVtczogRG9tYWluRXZlbnRbXTtcbiAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xuICAgIHN0YXR1czogbnVtYmVyO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9FdmVudHMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBJcFBvb2wgPSB7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGlwczogc3RyaW5nW107XG4gIGlzX2xpbmtlZDogYm9vbGVhbjtcbiAgbmFtZTogc3RyaW5nO1xuICBwb29sX2lkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbExpc3RSZXNwb25zZSA9IHtcbiAgYm9keToge1xuICAgIGlwX3Bvb2xzOiBJcFBvb2wsXG4gICAgbWVzc2FnZTogc3RyaW5nXG4gIH0sXG4gIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbExpc3RSZXN1bHQgPSB7XG4gIGlwX3Bvb2xzOiBJcFBvb2wsXG4gIG1lc3NhZ2U6IHN0cmluZyxcbiAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sVXBkYXRlRGF0YSA9IHtcbiAgbmFtZTogc3RyaW5nLFxuICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICBpcHM6IHN0cmluZ1tdXG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IHtcbiAgYm9keToge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sTWVzc2FnZVJlc3VsdCA9IHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sRGVsZXRlRGF0YSA9IHtcbiAgaXA/OiBzdHJpbmcsXG4gIHBvb2xfaWQ/OiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sQ3JlYXRlRGF0YSA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgaXBzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbENyZWF0ZVJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHBvb2xfaWQ6IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xDcmVhdGVSZXN1bHQgPSB7XG4gIHN0YXR1czogbnVtYmVyXG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgcG9vbF9pZDogc3RyaW5nO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JcFBvb2xzJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgSXBzTGlzdFJlc3BvbnNlQm9keSA9IHtcbiAgYXNzaWduYWJsZV90b19wb29sczogYm9vbGVhbjtcbiAgaXRlbXM6IHN0cmluZ1tdO1xuICB0b3RhbF9jb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJcERhdGEgPSB7XG4gIGlwOiBzdHJpbmc7XG4gIGRlZGljYXRlZDogYm9vbGVhbjtcbiAgcmRuczogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBJUHNMaXN0UXVlcnkgPSB7XG4gIGRlZGljYXRlZDogYm9vbGVhbiB8IHN0cmluZ1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JUHMnO1xuIiwiaW1wb3J0IHsgQXhpb3NQcm94eUNvbmZpZyB9IGZyb20gJ2F4aW9zJztcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgTWFpbGd1bkNsaWVudE9wdGlvbnMgPSB7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGtleTogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG4gIHB1YmxpY19rZXk/OiBzdHJpbmc7XG4gIHRpbWVvdXQ/OiBudW1iZXI7XG4gIHByb3h5PzogQXhpb3NQcm94eUNvbmZpZztcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTWFpbGd1bkNsaWVudE9wdGlvbnMnO1xuIiwiaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuaW1wb3J0IHsgTWFpbGluZ0xpc3QgfSBmcm9tICcuL01haWxpbmdMaXN0cyc7XG5cbmV4cG9ydCB0eXBlIE1haWxMaXN0TWVtYmVyID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc3Vic2NyaWJlZDogYm9vbGVhbixcbiAgICB2YXJzOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHVua25vd25cbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBNYWlsTGlzdE1lbWJlcnNRdWVyeSA9IHtcbiAgICBzdWJzY3JpYmVkPzogJ3llcycgfCAnbm8nO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlTWVtYmVyc0RhdGEgPSB7XG4gICAgbWVtYmVyczogQXJyYXk8TWFpbExpc3RNZW1iZXI+O1xuICAgIHVwc2VydDogJ3llcycgfCAnbm8nO1xufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhID0ge1xuICAgIG1lbWJlcnM6IHN0cmluZztcbiAgICB1cHNlcnQ6ICd5ZXMnIHwgJ25vJztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHZhcnM/OiBzdHJpbmc7XG4gICAgc3Vic2NyaWJlZD86ICd5ZXMnIHwgJ25vJyB8IGJvb2xlYW47XG4gICAgdXBzZXJ0PzogJ3llcycgfCAnbm8nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXEgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdmFycz86IHN0cmluZztcbiAgICBzdWJzY3JpYmVkPzogJ3llcycgfCAnbm8nIHwgYm9vbGVhbjtcbiAgICB1cHNlcnQ/OiAneWVzJyB8ICdubyc7XG59XG5cbmV4cG9ydCB0eXBlIERlbGV0ZWRNZW1iZXIgPSB7XG4gICAgbWVtYmVyOiB7XG4gICAgICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICB9LFxuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgfVxuXG5leHBvcnQgdHlwZSBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSA9IHtcbiAgICBsaXN0OiBNYWlsaW5nTGlzdDtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgJ3Rhc2staWQnOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE1haWxMaXN0TWVtYmVyc1Jlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IE1haWxMaXN0TWVtYmVyW11cbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3RcbiAgICB9LFxuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIE1haWxMaXN0TWVtYmVyc1Jlc3VsdCA9IHtcbiAgICBpdGVtczogTWFpbExpc3RNZW1iZXJbXVxuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3RcbiAgICBzdGF0dXM6IG51bWJlclxufVxuIiwiaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIExpc3RzUXVlcnkgPSB7XG4gICAgYWRkcmVzcz86IHN0cmluZztcbiAgICBsaW1pdD86IG51bWJlcjtcbiAgICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVVcGRhdGVMaXN0ID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIGFjY2Vzc19sZXZlbD86ICdyZWFkb25seScgfCAnbWVtYmVycyd8ICdldmVyeW9uZSc7XG4gICAgcmVwbHlfcHJlZmVyZW5jZT86ICdsaXN0JyB8ICdzZW5kZXInO1xufVxuXG5leHBvcnQgdHlwZSBEZXN0cm95ZWRMaXN0ID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFN0YXJ0VmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBpZDogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgZG93bmxvYWRfdXJsOiB7XG4gICAgICBjc3Y6IHN0cmluZztcbiAgICAgIGpzb246IHN0cmluZ1xuICAgIH07XG4gICAgaWQ6IHN0cmluZztcbiAgICBxdWFudGl0eTogbnVtYmVyO1xuICAgIHJlY29yZHNfcHJvY2Vzc2VkOiBudW1iZXI7XG4gICAgc3VtbWFyeToge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGNhdGNoX2FsbDogbnVtYmVyO1xuICAgICAgICBkZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICBkb19ub3Rfc2VuZDogbnVtYmVyO1xuICAgICAgICB1bmRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgIHVua25vd246IG51bWJlclxuICAgICAgfVxuICAgICAgcmlzazoge1xuICAgICAgICBoaWdoOiBudW1iZXI7XG4gICAgICAgIGxvdzogbnVtYmVyO1xuICAgICAgICBtZWRpdW06IG51bWJlcjtcbiAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0VmFsaWRhdGlvbkFwaVJlc3BvbnNlID0gTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzcG9uc2UgJiB7XG4gICAgY3JlYXRlZF9hdDogbnVtYmVyO1xufVxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0RGF0YSA9IE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3BvbnNlICYge1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG59XG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgdmFsaWRhdGlvblJlc3VsdDogTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0RGF0YTtcbn1cblxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0ID0ge1xuICAgIGFjY2Vzc19sZXZlbDogc3RyaW5nO1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBtZW1iZXJzX2NvdW50OiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJlcGx5X3ByZWZlcmVuY2U6IG51bGwgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0UmVzdWx0ID0ge1xuICAgIGl0ZW1zOiBNYWlsaW5nTGlzdFtdO1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Rcbn1cblxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RBcGlSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBNYWlsaW5nTGlzdFtdO1xuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgICB9XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0TWVtYmVycyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0cyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyoqXG4gKiBFbnN1cmVzIHRoZSBvYmplY3QgaGFzIGxlYXN0IG9uZSBrZXkgcHJlc2VudCBhbmQgbm90IHVuZGVmaW5lZFxuICpcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80OTcyNTE5OH1cbiAqL1xuZXhwb3J0IHR5cGUgQXRMZWFzdE9uZUtleVByZXNlbnQ8XG4gIE9iamVjdF8sXG4gIEtleXMgZXh0ZW5kcyBrZXlvZiBPYmplY3RfID0ga2V5b2YgT2JqZWN0X1xuPiA9IFBpY2s8T2JqZWN0XywgRXhjbHVkZTxrZXlvZiBPYmplY3RfLCBLZXlzPj4gJlxuICB7XG4gICAgW0sgaW4gS2V5c10tPzogUmVxdWlyZWQ8UGljazxPYmplY3RfLCBLPj4gJlxuICAgICAgUGFydGlhbDxQaWNrPE9iamVjdF8sIEV4Y2x1ZGU8S2V5cywgSz4+PjtcbiAgfVtLZXlzXTtcblxuZXhwb3J0IHR5cGUgTWltZU1lc3NhZ2UgPSBzdHJpbmcgfCBCbG9iIHwgQnVmZmVyIHwgTm9kZUpTLlJlYWRhYmxlU3RyZWFtO1xuZXhwb3J0IHR5cGUgQ3VzdG9tRmlsZURhdGEgPSBzdHJpbmcgfCBCbG9iIHwgRmlsZSB8IEJ1ZmZlciB8IE5vZGVKUy5SZWFkYWJsZVN0cmVhbTtcblxuZXhwb3J0IHR5cGUgQ3VzdG9tRmlsZSA9IHtcbiAgZGF0YTogQ3VzdG9tRmlsZURhdGE7XG4gIGZpbGVuYW1lPzogc3RyaW5nO1xuICBjb250ZW50VHlwZT8gOiBzdHJpbmc7XG4gIGtub3duTGVuZ3RoPzogbnVtYmVyO1xuICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xufVxuXG5leHBvcnQgdHlwZSBNZXNzYWdlQXR0YWNobWVudCA9XG4gIEN1c3RvbUZpbGVcbiAgfCBDdXN0b21GaWxlW11cbiAgfCBGaWxlXG4gIHwgRmlsZVtdXG4gIHwgc3RyaW5nXG4gIHwgQ3VzdG9tRmlsZURhdGFcbiAgfCBDdXN0b21GaWxlRGF0YVtdXG5cbmV4cG9ydCB0eXBlIEZvcm1EYXRhSW5wdXRWYWx1ZSA9XG4gIE1pbWVNZXNzYWdlXG4gIHwgQ3VzdG9tRmlsZURhdGFcbiAgfCBzdHJpbmdcbiAgfCBzdHJpbmdbXVxuICB8IGJvb2xlYW5cbiAgfCBNZXNzYWdlQXR0YWNobWVudFxuICB8IHVuZGVmaW5lZFxuICB8IG51bWJlciAvLyBkb2Mgc2F5cyBpdCBzaG91bGQgYmUgYXV0by1jb252ZXJ0ZWQgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Zvcm1EYXRhL2FwcGVuZFxuICB8IEpzb25PYmplY3RcblxuZXhwb3J0IHR5cGUgSnNvblByaW1pdGl2ZSA9IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsO1xuZXhwb3J0IHR5cGUgSnNvbkFycmF5ID0gSnNvbltdO1xuZXhwb3J0IHR5cGUgSnNvbk9iamVjdCA9IHsgW2tleTogc3RyaW5nXTogSnNvbiB9O1xuZXhwb3J0IHR5cGUgSnNvbkNvbXBvc2l0ZSA9IEpzb25BcnJheSB8IEpzb25PYmplY3Q7XG5leHBvcnQgdHlwZSBKc29uID0gSnNvblByaW1pdGl2ZSB8IEpzb25Db21wb3NpdGU7XG5cbmV4cG9ydCB0eXBlIE1haWxndW5NZXNzYWdlQ29udGVudCA9IEF0TGVhc3RPbmVLZXlQcmVzZW50PHtcbiAgICAvKipcbiAgICAgKiBCb2R5IG9mIHRoZSBtZXNzYWdlLiAodGV4dCB2ZXJzaW9uKVxuICAgICAqL1xuICAgIHRleHQ/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBCb2R5IG9mIHRoZSBtZXNzYWdlLiAoSFRNTCB2ZXJzaW9uKVxuICAgICAqL1xuICAgIGh0bWw/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogQm9keSBvZiB0aGUgbWVzc2FnZS4gKE1JTUUgdmVyc2lvbilcbiAgICAgKi9cbiAgICBtZXNzYWdlPzogTWltZU1lc3NhZ2U7XG4gICAgIC8qKlxuICAgICAqIE5hbWUgb2YgYSB0ZW1wbGF0ZSBzdG9yZWQgdmlhIFt0ZW1wbGF0ZSBBUEldKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvYXBpLXRlbXBsYXRlcy5odG1sI2FwaS10ZW1wbGF0ZXMpLiBTZWUgW1RlbXBsYXRlc10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI3RlbXBsYXRpbmcpIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gICAgICovXG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7XG59PjtcblxuZXhwb3J0IHR5cGUgTWFpbGd1bk1lc3NhZ2VEYXRhID0gTWFpbGd1bk1lc3NhZ2VDb250ZW50ICYge1xuICAgIC8qKlxuICAgICAqIEVtYWlsIGFkZHJlc3MgZm9yIGBGcm9tYCBoZWFkZXJcbiAgICAgKi9cbiAgICBmcm9tPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRW1haWwgYWRkcmVzcyBvZiB0aGUgcmVjaXBpZW50KHMpLlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYEJvYiA8Ym9iQGhvc3QuY29tPmAuIFlvdSBjYW4gdXNlIGNvbW1hcyB0byBzZXBhcmF0ZSBtdWx0aXBsZSByZWNpcGllbnRzLlxuICAgICAqL1xuICAgIHRvPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIGBUb2AgYnV0IGZvciBgY2FyYm9uIGNvcHlgXG4gICAgICovXG4gICAgY2M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIFNhbWUgYXMgYFRvYCBidXQgZm9yIGBibGluZCBjYXJib24gY29weWBcbiAgICAgKi9cbiAgICBiY2M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIE1lc3NhZ2Ugc3ViamVjdFxuICAgICAqL1xuICAgIHN1YmplY3Q/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBbQU1QXShodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9nbWFpbC9hbXBlbWFpbC8pIHBhcnQgb2YgdGhlIG1lc3NhZ2UuIFBsZWFzZSBmb2xsb3cgZ29vZ2xlIGd1aWRlbGluZXMgdG8gY29tcG9zZSBhbmQgc2VuZCBBTVAgZW1haWxzLlxuICAgICAqL1xuICAgICdhbXAtaHRtbCc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBGaWxlIGF0dGFjaG1lbnQuIFlvdSBjYW4gcG9zdCBtdWx0aXBsZSBgYXR0YWNobWVudGAgdmFsdWVzLlxuICAgICAqXG4gICAgICogKipJbXBvcnRhbnQ6KiogWW91IG11c3QgdXNlIGBtdWx0aXBhcnQvZm9ybS1kYXRhYCBlbmNvZGluZyB3aGVuIHNlbmRpbmcgYXR0YWNobWVudHMuXG4gICAgICovXG4gICAgYXR0YWNobWVudD86IE1lc3NhZ2VBdHRhY2htZW50O1xuXG4gICAgLyoqXG4gICAgICogQXR0YWNobWVudCB3aXRoIGBpbmxpbmVgIGRpc3Bvc2l0aW9uLiBDYW4gYmUgdXNlZCB0byBzZW5kIGlubGluZSBpbWFnZXMgKHNlZSBleGFtcGxlKS5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gcG9zdCBtdWx0aXBsZSBgaW5saW5lYCB2YWx1ZXMuXG4gICAgICovXG4gICAgaW5saW5lPzogYW55O1xuXG4gICAgLyoqXG4gICAgICogVXNlIHRoaXMgcGFyYW1ldGVyIHRvIHNlbmQgYSBtZXNzYWdlIHRvIHNwZWNpZmljIHZlcnNpb24gb2YgYSB0ZW1wbGF0ZVxuICAgICAqL1xuICAgICd0OnZlcnNpb24nPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUGFzcyBgeWVzYCBpZiB5b3Ugd2FudCB0byBoYXZlIHJlbmRlcmVkIHRlbXBsYXRlXG4gICAgICogaW4gdGhlIHRleHQgcGFydCBvZiB0aGUgbWVzc2FnZSBpbiBjYXNlIG9mIHRlbXBsYXRlIHNlbmRpbmdcbiAgICAgKi9cbiAgICAndDp0ZXh0Jz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBBIHZhbGlkIEpTT04tZW5jb2RlZCBkaWN0aW9uYXJ5IHVzZWQgYXMgdGhlIGlucHV0IGZvciB0ZW1wbGF0ZSB2YXJpYWJsZSBleHBhbnNpb24uXG4gICAgICogU2VlIFtUZW1wbGF0ZXNdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvYXBpLXRlbXBsYXRlcy5odG1sI2FwaS10ZW1wbGF0ZXMpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgICd0OnZhcmlhYmxlcyc/OiBzdHJpbmcgfCBKc29uT2JqZWN0O1xuXG4gICAgLyoqXG4gICAgICogVGFnIHN0cmluZy4gU2VlIFtUYWdnaW5nXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjdGFnZ2luZykgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgJ286dGFnJz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcy9kaXNhYmxlcyBES0lNIHNpZ25hdHVyZXMgb24gcGVyLW1lc3NhZ2UgYmFzaXMuIFBhc3MgYHllc2AsIGBub2AsIGB0cnVlYCBvciBgZmFsc2VgXG4gICAgICovXG4gICAgJ286ZGtpbSc/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogRGVzaXJlZCB0aW1lIG9mIGRlbGl2ZXJ5LiBTZWUgW0RhdGUgRm9ybWF0XShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L2FwaS1pbnRyby5odG1sI2RhdGUtZm9ybWF0KS5cbiAgICAgKlxuICAgICAqIE5vdGU6IE1lc3NhZ2VzIGNhbiBiZSBzY2hlZHVsZWQgZm9yIGEgbWF4aW11bSBvZiAzIGRheXMgaW4gdGhlIGZ1dHVyZS5cbiAgICAgKi9cbiAgICAnbzpkZWxpdmVyeXRpbWUnPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBTZW5kIFRpbWUgT3B0aW1pemF0aW9uIChTVE8pIG9uIGEgcGVyLW1lc3NhZ2UgYmFzaXMuXG4gICAgICpcbiAgICAgKiBTdHJpbmcgc2hvdWxkIGJlIHNldCB0byB0aGUgbnVtYmVyIG9mIGhvdXJzIGluIGBbMC05XStoYCBmb3JtYXQsXG4gICAgICogd2l0aCB0aGUgbWluaW11bSBiZWluZyBgMjRoYCBhbmQgdGhlIG1heGltdW0gYmVpbmcgYDcyaGAuXG4gICAgICpcbiAgICAgKiBUaGlzIHZhbHVlIGRlZmluZXMgdGhlIHRpbWUgd2luZG93IGluIHdoaWNoIE1haWxndW4gd2lsbCBydW4gdGhlIG9wdGltaXphdGlvbiBhbGdvcml0aG0gYmFzZWQgb24gcHJpb3IgZW5nYWdlbWVudCBkYXRhIG9mIGEgZ2l2ZW4gcmVjaXBpZW50LiBTZWUgW1NlbmRpbmcgYSBtZXNzYWdlIHdpdGggU1RPXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjc3RvLXNlbmRpbmcpIGZvciBkZXRhaWxzLlxuICAgICAqXG4gICAgICogX1BsZWFzZSBub3RlIHRoYXQgU1RPIGlzIG9ubHkgYXZhaWxhYmxlIG9uIGNlcnRhaW4gcGxhbnMuXG4gICAgICogU2VlIHd3dy5tYWlsZ3VuLmNvbS9wcmljaW5nIGZvciBtb3JlIGluZm8uX1xuICAgICAqL1xuICAgICdvOmRlbGl2ZXJ5dGltZS1vcHRpbWl6ZS1wZXJpb2QnPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBUaW1lem9uZSBPcHRpbWl6YXRpb24gKFRaTykgb24gYSBwZXIgbWVzc2FnZSBiYXNpcy5cbiAgICAgKlxuICAgICAqIFN0cmluZyBzaG91bGQgYmUgc2V0IHRvIHByZWZlcnJlZCBkZWxpdmVyeSB0aW1lIGluIGBISDptbWAgb3IgYGhoOm1tYWFgIGZvcm1hdCwgd2hlcmUgYEhIOm1tYCBpcyB1c2VkIGZvciAyNCBob3VyIGZvcm1hdCB3aXRob3V0IEFNL1BNIGFuZCBgaGg6bW1hYWAgaXMgdXNlZCBmb3IgMTIgaG91ciBmb3JtYXQgd2l0aCBBTS9QTS4gU2VlIFtTZW5kaW5nIGEgbWVzc2FnZSB3aXRoIFRaT10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI3R6by1zZW5kaW5nKSBmb3IgZGV0YWlscy5cbiAgICAgKlxuICAgICAqIFBsZWFzZSBub3RlIHRoYXQgVFpPIGlzIG9ubHkgYXZhaWxhYmxlIG9uIGNlcnRhaW4gcGxhbnMuXG4gICAgICogU2VlIHd3dy5tYWlsZ3VuLmNvbS9wcmljaW5nIGZvciBtb3JlIGluZm8uXG4gICAgICovXG4gICAgJ286dGltZS16b25lLWxvY2FsaXplJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgc2VuZGluZyBpbiB0ZXN0IG1vZGUuIFBhc3MgYHllc2AgaWYgbmVlZGVkLiBTZWUgW1NlbmRpbmcgaW4gVGVzdCBNb2RlXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjbWFudWFsLXRlc3Rtb2RlKVxuICAgICAqL1xuICAgICdvOnRlc3Rtb2RlJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRyYWNraW5nIG9uIGEgcGVyLW1lc3NhZ2UgYmFzaXMsIHNlZSBbVHJhY2tpbmcgTWVzc2FnZXNdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCN0cmFja2luZy1tZXNzYWdlcyBmb3IgZGV0YWlscy4gUGFzcyAneWVzJywgJ25vJywgJ3RydWUnIG9yICdmYWxzZSdcbiAgICAgKi9cbiAgICAnbzp0cmFja2luZyc/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBjbGlja3MgdHJhY2tpbmcgb24gYSBwZXItbWVzc2FnZSBiYXNpcy5cbiAgICAgKiBIYXMgaGlnaGVyIHByaW9yaXR5IHRoYW4gZG9tYWluLWxldmVsIHNldHRpbmcuXG4gICAgICogUGFzcyBgeWVzYCwgYG5vYCwgYHRydWVgLCBgZmFsc2VgIG9yIGBodG1sb25seWAuXG4gICAgICovXG4gICAgJ286dHJhY2tpbmctY2xpY2tzJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubycgfCAnaHRtbG9ubHknO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBvcGVucyB0cmFja2luZyBvbiBhIHBlci1tZXNzYWdlIGJhc2lzLlxuICAgICAqIEhhcyBoaWdoZXIgcHJpb3JpdHkgdGhhbiBkb21haW4tbGV2ZWwgc2V0dGluZy5cbiAgICAgKiAgUGFzcyAneWVzJyBvciAnbm8nLCAndHJ1ZScgb3IgJ2ZhbHNlJ1xuICAgICAqL1xuICAgICdvOnRyYWNraW5nLW9wZW5zJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBJZiBzZXQgdG8gJ1RydWUnIG9yICd5ZXMnIHRoaXMgcmVxdWlyZXMgdGhlIG1lc3NhZ2Ugb25seSBiZSBzZW50IG92ZXIgYSBUTFMgY29ubmVjdGlvbi5cbiAgICAgKiBJZiBhIFRMUyBjb25uZWN0aW9uIGNhbiBub3QgYmUgZXN0YWJsaXNoZWQsIE1haWxndW4gd2lsbCBub3QgZGVsaXZlciB0aGUgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIElmIHNldCB0byAnRmFsc2UnIG9yICdubycsIE1haWxndW4gd2lsbCBzdGlsbCB0cnkgYW5kIHVwZ3JhZGUgdGhlIGNvbm5lY3Rpb24sXG4gICAgICogYnV0IGlmIE1haWxndW4gY2FuIG5vdCwgdGhlIG1lc3NhZ2Ugd2lsbCBiZSBkZWxpdmVyZWQgb3ZlciBhIHBsYWludGV4dCBTTVRQIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBUaGUgZGVmYXVsdCBpcyAnRmFsc2UnLlxuICAgICAqL1xuICAgICdvOnJlcXVpcmUtdGxzJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBJZiBzZXQgdG8gYFRydWVgIG9yIGB5ZXNgLCB0aGUgY2VydGlmaWNhdGUgYW5kIGhvc3RuYW1lIHdpbGwgbm90IGJlIHZlcmlmaWVkXG4gICAgICogd2hlbiB0cnlpbmcgdG8gZXN0YWJsaXNoIGEgVExTIGNvbm5lY3Rpb25cbiAgICAgKiBhbmQgTWFpbGd1biB3aWxsIGFjY2VwdCBhbnkgY2VydGlmaWNhdGUgZHVyaW5nIGRlbGl2ZXJ5LlxuICAgICAqXG4gICAgICogSWYgc2V0IHRvIGBGYWxzZWAgb3IgYG5vYCwgTWFpbGd1biB3aWxsIHZlcmlmeSB0aGUgY2VydGlmaWNhdGUgYW5kIGhvc3RuYW1lLlxuICAgICAqIElmIGVpdGhlciBvbmUgY2FuIG5vdCBiZSB2ZXJpZmllZCwgYSBUTFMgY29ubmVjdGlvbiB3aWxsIG5vdCBiZSBlc3RhYmxpc2hlZC5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IGlzIGBGYWxzZWAuXG4gICAgICovXG4gICAgJ286c2tpcC12ZXJpZmljYXRpb24nPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIEEgdmFsaWQgSlNPTi1lbmNvZGVkIGRpY3Rpb25hcnksIHdoZXJlIGtleSBpcyBhIHBsYWluIHJlY2lwaWVudCBhZGRyZXNzIGFuZCB2YWx1ZSBpcyBhIGRpY3Rpb25hcnkgd2l0aCB2YXJpYWJsZXMgdGhhdCBjYW4gYmUgcmVmZXJlbmNlZCBpbiB0aGUgbWVzc2FnZSBib2R5LiBTZWUgW0JhdGNoIFNlbmRpbmddKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCNiYXRjaC1zZW5kaW5nKSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICAncmVjaXBpZW50LXZhcmlhYmxlcyc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBoOicgcHJlZml4IGZvbGxvd2VkIGJ5IGFuIGFyYml0cmFyeSB2YWx1ZSBhbGxvd3MgdG8gYXBwZW5kIGEgY3VzdG9tIE1JTUUgaGVhZGVyXG4gICAgICogdG8gdGhlIG1lc3NhZ2UgKCdYLU15LUhlYWRlcicgaW4gdGhpcyBjYXNlKS5cbiAgICAgKiBGb3IgZXhhbXBsZSwgYGg6UmVwbHktVG9gIHRvIHNwZWNpZnkgUmVwbHktVG8gYWRkcmVzcy5cbiAgICAgKi9cbiAgICAnaDpYLU15LUhlYWRlcic/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBgdjpgIHByZWZpeCBmb2xsb3dlZCBieSBhbiBhcmJpdHJhcnkgbmFtZSBhbGxvd3MgdG8gYXR0YWNoIGEgY3VzdG9tIEpTT04gZGF0YSB0byB0aGUgbWVzc2FnZS4gU2VlIFtBdHRhY2hpbmcgRGF0YSB0byBNZXNzYWdlc10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI21hbnVhbC1jdXN0b21kYXRhKSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICAndjpteS12YXInPzogc3RyaW5nO1xuXG4gICAgW2tleTogc3RyaW5nXTogRm9ybURhdGFJbnB1dFZhbHVlO1xufVxuXG5leHBvcnQgdHlwZSBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VzU2VuZFJlc3VsdCA9IHtcbiAgICBpZD86IHN0cmluZyxcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGRldGFpbHM/OiBzdHJpbmc7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL01lc3NhZ2VzJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgUm91dGUgPSB7XG4gICAgYWN0aW9uczogc3RyaW5nW107XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZXhwcmVzc2lvbjogc3RyaW5nO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcHJpb3JpdHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlUm91dGVSZXNwb25zZSA9IFJvdXRlICYge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRGVzdHJveVJvdXRlUmVzcG9uc2UgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSA9IHtcbiAgICBwcmlvcml0eT86IG51bWJlcjtcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBleHByZXNzaW9uOiBzdHJpbmc7XG4gICAgYWN0aW9uOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IHR5cGUgUm91dGVzTGlzdFF1ZXJ5ID0ge1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHNraXA/OiBudW1iZXI7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1JvdXRlcyc7XG4iLCJleHBvcnQgdHlwZSBTdGF0ID0ge1xuICB0aW1lOiBzdHJpbmcgfCBEYXRlLFxuICBkZWxpdmVyZWQ6IHtcbiAgICBzbXRwOiBudW1iZXIsXG4gICAgaHR0cDogbnVtYmVyLFxuICAgIHRvdGFsOiBudW1iZXJcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBTdGF0c09wdGlvbnMgPSB7XG4gIHN0YXJ0OiBzdHJpbmcgfCBEYXRlO1xuICBlbmQ6IHN0cmluZyB8IERhdGU7XG4gIHJlc29sdXRpb246IHN0cmluZztcbiAgc3RhdHM6IFN0YXRbXTtcbn1cblxuZXhwb3J0IHR5cGUgU3RhdHNFdmVudCA9ICdhY2NlcHRlZCcgfCAnZGVsaXZlcmVkJyB8ICdvcGVuZWQnIHwgJ2NsaWNrZWQnIHwgJ3Vuc3Vic2NyaWJlZCcgfCAnc3RvcmVkJyB8ICdjb21wbGFpbmVkJyB8ICdmYWlsZWQnO1xuXG5leHBvcnQgdHlwZSBTdGF0c1F1ZXJ5ID0ge1xuICBldmVudDogU3RhdHNFdmVudCB8IFN0YXRzRXZlbnRbXTtcbiAgc3RhcnQ/OiBzdHJpbmcgfCBEYXRlO1xuICBlbmQ/OiBzdHJpbmcgfCBEYXRlO1xuICByZXNvbHV0aW9uPzogJ2hvdXInfCAnZGF5JyB8ICdtb250aCc7XG4gIGR1cmF0aW9uPzogc3RyaW5nO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9TdGF0cyc7XG4iLCJleHBvcnQgdHlwZSBTdWJhY2NvdW50c1F1ZXJ5ID0ge1xuICBlbmFibGVkPzogYm9vbGVhbjtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHNraXA/OiBudW1iZXI7XG4gIHNvcnQ/OiAnYXNjJyB8ICdkZXNjJztcbn1cblxuZXhwb3J0IHR5cGUgU3ViYWNjb3VudExpc3RJdGVtID0ge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHN0YXR1czogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBTdWJhY2NvdW50TGlzdFJlc3BvbnNlRGF0YSA9IHtcbiAgc3ViYWNjb3VudHM6IFN1YmFjY291bnRMaXN0SXRlbVtdO1xuICB0b3RhbDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdWJhY2NvdW50UmVzcG9uc2VEYXRhID0ge1xuICBzdWJhY2NvdW50OiBTdWJhY2NvdW50TGlzdEl0ZW1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vU3ViYWNjb3VudHMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBCb3VuY2VEYXRhID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBDb21wbGFpbnREYXRhID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuIiwiaW1wb3J0IHtcbiAgQm91bmNlRGF0YSxcbiAgQ29tcGxhaW50RGF0YSxcbiAgVW5zdWJzY3JpYmVEYXRhLFxuICBXaGl0ZUxpc3REYXRhXG59IGZyb20gJy4nO1xuaW1wb3J0IHtcbiAgSUJvdW5jZSwgSUNvbXBsYWludCwgSVVuc3Vic2NyaWJlLCBJV2hpdGVMaXN0XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkxpc3QgPSB7XG4gIGl0ZW1zOiAoSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0KVtdO1xuICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25MaXN0UXVlcnkgPSB7XG4gIGxpbWl0PzogbnVtYmVyO1xuICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkRhdGFUeXBlID0gQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhO1xuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSA9IHtcbiAgYm9keToge1xuICAgIGl0ZW1zOiBCb3VuY2VEYXRhW10gfCBDb21wbGFpbnREYXRhW10gfCBVbnN1YnNjcmliZURhdGFbXSB8IFdoaXRlTGlzdERhdGFbXTtcbiAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25SZXNwb25zZSA9IHtcbiAgYm9keTogU3VwcHJlc3Npb25EYXRhVHlwZTtcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHZhbHVlPzogc3RyaW5nO1xuICAgIGFkZHJlc3M/OiBzdHJpbmc7XG4gIH1cbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdCA9IHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSA9IHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjb2RlPzogbnVtYmVyO1xuICBlcnJvcj86IHN0cmluZztcbiAgZG9tYWluPzogc3RyaW5nO1xuICB0YWc/OiBzdHJpbmc7IC8vIHdvcmtzIG9ubHkgd2l0aCBGb3JtRGF0YSB1c2FnZSBmb3Igb25lIHVuc3Vic2NyaWJlXG4gIGNyZWF0ZWRfYXQ/OiBzdHJpbmcgO1xuICB0YWdzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSA9IHtcbiAgYm9keTp7XG4gICAgbWVzc2FnZTpzdHJpbmc7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCA9IHtcbiAgbWVzc2FnZTpzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIFVuc3Vic2NyaWJlRGF0YSA9IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgdGFnczogYW55O1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG4iLCJleHBvcnQgdHlwZSBXaGl0ZUxpc3REYXRhID0ge1xuICAgIHR5cGU6IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIHJlYXNvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vQm91bmNlJztcbmV4cG9ydCAqIGZyb20gJy4vQ29tcGxhaW50JztcbmV4cG9ydCAqIGZyb20gJy4vU3VwcHJlc3Npb25zJztcbmV4cG9ydCAqIGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuZXhwb3J0ICogZnJvbSAnLi9XaGl0ZUxpc3QnO1xuIiwiaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuaW1wb3J0IHsgQ3VzdG9tRmlsZSwgQ3VzdG9tRmlsZURhdGEgfSBmcm9tICcuLi9NZXNzYWdlcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uSm9iRGF0YSA9IHtcbiAgICBjcmVhdGVkX2F0OiBudW1iZXI7XG4gICAgaWQ6IHN0cmluZztcbiAgICBxdWFudGl0eTogbnVtYmVyO1xuICAgIHJlY29yZHNfcHJvY2Vzc2VkOiBudW1iZXIgfCBudWxsO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIGRvd25sb2FkX3VybD86IHtcbiAgICAgICAgY3N2OiBzdHJpbmc7XG4gICAgICAgIGpzb246IHN0cmluZztcbiAgICB9O1xuICAgIHN1bW1hcnk/OiB7XG4gICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgY2F0Y2hfYWxsOiBudW1iZXI7XG4gICAgICAgICAgICBkZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgICAgZG9fbm90X3NlbmQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgICAgfTtcbiAgICAgICAgcmlzazoge1xuICAgICAgICAgICAgaGlnaDogbnVtYmVyO1xuICAgICAgICAgICAgbG93OiBudW1iZXI7XG4gICAgICAgICAgICBtZWRpdW06IG51bWJlcjtcbiAgICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0ID0ge1xuICAgIGNyZWF0ZWRBdDogRGF0ZTtcbiAgICBpZDogc3RyaW5nO1xuICAgIHF1YW50aXR5OiBudW1iZXI7XG4gICAgcmVjb3Jkc1Byb2Nlc3NlZDogbnVtYmVyIHwgbnVsbDtcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgICByZXNwb25zZVN0YXR1c0NvZGU6IG51bWJlcjsgLy8gaHR0cCByZXNwb25zZSBzdGF0dXMgY29kZVxuICAgIGRvd25sb2FkVXJsPzoge1xuICAgICAgICBjc3Y6IHN0cmluZztcbiAgICAgICAganNvbjogc3RyaW5nO1xuICAgIH07XG4gICAgc3VtbWFyeT86IHtcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICBjYXRjaEFsbDogbnVtYmVyO1xuICAgICAgICAgICAgZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICAgIGRvTm90U2VuZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5kZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgICB9O1xuICAgICAgICByaXNrOiB7XG4gICAgICAgICAgICBoaWdoOiBudW1iZXI7XG4gICAgICAgICAgICBsb3c6IG51bWJlcjtcbiAgICAgICAgICAgIG1lZGl1bTogbnVtYmVyO1xuICAgICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iID0ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhID0ge1xuICAgIGZpbGU6IEN1c3RvbUZpbGVEYXRhIHwgQ3VzdG9tRmlsZVxufVxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhVXBkYXRlZCA9IHtcbiAgICBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBDdXN0b21GaWxlRGF0YSB8IEN1c3RvbUZpbGU7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0ID0ge1xuICAgIGpvYnM6IE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdFtdO1xuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG4gICAgdG90YWw6IG51bWJlcjtcbiAgICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeSA9IHtcbiAgICBsaW1pdDogbnVtYmVyO1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgICAgICAgam9iczogTXVsdGlwbGVWYWxpZGF0aW9uSm9iRGF0YVtdO1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH1cbn1cbmV4cG9ydCB0eXBlIENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iID0ge1xuICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgIHN0YXR1czogbnVtYmVyO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmV4cG9ydCB0eXBlIFZhbGlkYXRpb25RdWVyeSA9IHtcbiAgYWRkcmVzczogc3RyaW5nO1xufVxuZXhwb3J0IHR5cGUgVmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBpc19kaXNwb3NhYmxlX2FkZHJlc3M6IGJvb2xlYW47XG4gIGlzX3JvbGVfYWRkcmVzczogYm9vbGVhbjtcbiAgcmVhc29uOiBzdHJpbmdbXTtcbiAgcmVzdWx0OiBzdHJpbmc7XG4gIHJpc2s6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgVmFsaWRhdGlvblJlc3BvbnNlID0ge1xuICBzdGF0dXM6IG51bWJlcjtcbiAgYm9keTogVmFsaWRhdGlvblJlc3VsdDtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTXVsdGlwbGVWYWxpZGF0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vVmFsaWRhdGlvbic7XG4iLCJleHBvcnQgdHlwZSBBUElXZWJob29rID0ge1xuICAgIHVybD86IHN0cmluZ1xuICAgIHVybHM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va1Jlc3BvbnNlQm9keSA9IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgd2ViaG9vazogQVBJV2ViaG9vaztcbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va1Jlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IFdlYmhvb2tSZXNwb25zZUJvZHk7XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tMaXN0ID0ge1xuICAgIFtpZDogc3RyaW5nXToge1xuICAgICAgICB1cmxzOiBzdHJpbmdbXVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va3NRdWVyeSA9IHtcbiAgICBsaW1pdD86IG51bWJlcjtcbiAgICBza2lwPzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlID0ge1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tSZXN1bHQgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1cmwgcHJvcGVydHkgaXMgZGVwcmVjYXRlZC4gVXNlIFwidXJsc1wiIGluc3RlYWQuXG4gICAqL1xuICB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgdXJsczogc3RyaW5nW107XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1dlYmhvb2tzJztcbiIsImV4cG9ydCAqIGZyb20gJy4vQ29tbW9uJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWlucyc7XG5leHBvcnQgKiBmcm9tICcuL0V2ZW50cyc7XG5leHBvcnQgKiBmcm9tICcuL0lQUG9vbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9JUHMnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsZ3VuQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzJztcbmV4cG9ydCAqIGZyb20gJy4vTWVzc2FnZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Sb3V0ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdGF0cyc7XG5leHBvcnQgKiBmcm9tICcuL1N1YmFjY291bnRzJztcbmV4cG9ydCAqIGZyb20gJy4vU3VwcHJlc3Npb25zJztcbmV4cG9ydCAqIGZyb20gJy4vVmFsaWRhdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9XZWJob29rcyc7XG4iLCJpbXBvcnQgTWFpbGd1bkNsaWVudCBmcm9tICcuL0NsYXNzZXMvTWFpbGd1bkNsaWVudCc7XG5pbXBvcnQgeyBJTWFpbGd1bkNsaWVudCB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhLCBNYWlsZ3VuQ2xpZW50T3B0aW9ucyB9IGZyb20gJy4vVHlwZXMnO1xuXG5leHBvcnQgKiBhcyBFbnVtcyBmcm9tICcuL0VudW1zJztcbmV4cG9ydCAqIGZyb20gJy4vVHlwZXMnO1xuZXhwb3J0ICogYXMgSW50ZXJmYWNlcyBmcm9tICcuL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsZ3VuIHtcbiAgc3RhdGljIGdldCBkZWZhdWx0KCk6IHR5cGVvZiBNYWlsZ3VuIHsgcmV0dXJuIHRoaXM7IH1cbiAgcHJpdmF0ZSBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YVxuXG4gIGNvbnN0cnVjdG9yKEZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy5mb3JtRGF0YSA9IEZvcm1EYXRhO1xuICB9XG5cbiAgY2xpZW50KG9wdGlvbnM6IE1haWxndW5DbGllbnRPcHRpb25zKSA6IElNYWlsZ3VuQ2xpZW50IHtcbiAgICByZXR1cm4gbmV3IE1haWxndW5DbGllbnQob3B0aW9ucywgdGhpcy5mb3JtRGF0YSk7XG4gIH1cbn1cbiIsIi8qISBodHRwczovL210aHMuYmUvYmFzZTY0IHYxLjAuMCBieSBAbWF0aGlhcyB8IE1JVCBsaWNlbnNlICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgLlxuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLlxuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0bW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsIGFuZCB1c2Vcblx0Ly8gaXQgYXMgYHJvb3RgLlxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fTtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cblx0dmFyIGVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdC8vIE5vdGU6IHRoZSBlcnJvciBtZXNzYWdlcyB1c2VkIHRocm91Z2hvdXQgdGhpcyBmaWxlIG1hdGNoIHRob3NlIHVzZWQgYnlcblx0XHQvLyB0aGUgbmF0aXZlIGBhdG9iYC9gYnRvYWAgaW1wbGVtZW50YXRpb24gaW4gQ2hyb21pdW0uXG5cdFx0dGhyb3cgbmV3IEludmFsaWRDaGFyYWN0ZXJFcnJvcihtZXNzYWdlKTtcblx0fTtcblxuXHR2YXIgVEFCTEUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cdC8vIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvY29tbW9uLW1pY3Jvc3ludGF4ZXMuaHRtbCNzcGFjZS1jaGFyYWN0ZXJcblx0dmFyIFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMgPSAvW1xcdFxcblxcZlxcciBdL2c7XG5cblx0Ly8gYGRlY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBhdG9iYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQuIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYXRvYlxuXHQvLyBUaGUgb3B0aW1pemVkIGJhc2U2NC1kZWNvZGluZyBhbGdvcml0aG0gdXNlZCBpcyBiYXNlZCBvbiBAYXRr4oCZcyBleGNlbGxlbnRcblx0Ly8gaW1wbGVtZW50YXRpb24uIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2F0ay8xMDIwMzk2XG5cdHZhciBkZWNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KVxuXHRcdFx0LnJlcGxhY2UoUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUywgJycpO1xuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0aWYgKGxlbmd0aCAlIDQgPT0gMCkge1xuXHRcdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKC89PT8kLywgJycpO1xuXHRcdFx0bGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRsZW5ndGggJSA0ID09IDEgfHxcblx0XHRcdC8vIGh0dHA6Ly93aGF0d2cub3JnL0MjYWxwaGFudW1lcmljLWFzY2lpLWNoYXJhY3RlcnNcblx0XHRcdC9bXithLXpBLVowLTkvXS8udGVzdChpbnB1dClcblx0XHQpIHtcblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnSW52YWxpZCBjaGFyYWN0ZXI6IHRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIGJpdENvdW50ZXIgPSAwO1xuXHRcdHZhciBiaXRTdG9yYWdlO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHRidWZmZXIgPSBUQUJMRS5pbmRleE9mKGlucHV0LmNoYXJBdChwb3NpdGlvbikpO1xuXHRcdFx0Yml0U3RvcmFnZSA9IGJpdENvdW50ZXIgJSA0ID8gYml0U3RvcmFnZSAqIDY0ICsgYnVmZmVyIDogYnVmZmVyO1xuXHRcdFx0Ly8gVW5sZXNzIHRoaXMgaXMgdGhlIGZpcnN0IG9mIGEgZ3JvdXAgb2YgNCBjaGFyYWN0ZXJz4oCmXG5cdFx0XHRpZiAoYml0Q291bnRlcisrICUgNCkge1xuXHRcdFx0XHQvLyDigKZjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gYSBzaW5nbGUgQVNDSUkgY2hhcmFjdGVyLlxuXHRcdFx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0XHRcdFx0XHQweEZGICYgYml0U3RvcmFnZSA+PiAoLTIgKiBiaXRDb3VudGVyICYgNilcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHQvLyBgZW5jb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGJ0b2FgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZDogaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1idG9hXG5cdHZhciBlbmNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KTtcblx0XHRpZiAoL1teXFwwLVxceEZGXS8udGVzdChpbnB1dCkpIHtcblx0XHRcdC8vIE5vdGU6IG5vIG5lZWQgdG8gc3BlY2lhbC1jYXNlIGFzdHJhbCBzeW1ib2xzIGhlcmUsIGFzIHN1cnJvZ2F0ZXMgYXJlXG5cdFx0XHQvLyBtYXRjaGVkLCBhbmQgdGhlIGlucHV0IGlzIHN1cHBvc2VkIHRvIG9ubHkgY29udGFpbiBBU0NJSSBhbnl3YXkuXG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J1RoZSBzdHJpbmcgdG8gYmUgZW5jb2RlZCBjb250YWlucyBjaGFyYWN0ZXJzIG91dHNpZGUgb2YgdGhlICcgK1xuXHRcdFx0XHQnTGF0aW4xIHJhbmdlLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBwYWRkaW5nID0gaW5wdXQubGVuZ3RoICUgMztcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0dmFyIGE7XG5cdFx0dmFyIGI7XG5cdFx0dmFyIGM7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHQvLyBNYWtlIHN1cmUgYW55IHBhZGRpbmcgaXMgaGFuZGxlZCBvdXRzaWRlIG9mIHRoZSBsb29wLlxuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGggLSBwYWRkaW5nO1xuXG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdC8vIFJlYWQgdGhyZWUgYnl0ZXMsIGkuZS4gMjQgYml0cy5cblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCAxNjtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pIDw8IDg7XG5cdFx0XHRjID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiICsgYztcblx0XHRcdC8vIFR1cm4gdGhlIDI0IGJpdHMgaW50byBmb3VyIGNodW5rcyBvZiA2IGJpdHMgZWFjaCwgYW5kIGFwcGVuZCB0aGVcblx0XHRcdC8vIG1hdGNoaW5nIGNoYXJhY3RlciBmb3IgZWFjaCBvZiB0aGVtIHRvIHRoZSBvdXRwdXQuXG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDE4ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEyICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDYgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgJiAweDNGKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAocGFkZGluZyA9PSAyKSB7XG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgODtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGI7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEwKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyID4+IDQpICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCAyKSAmIDB4M0YpICtcblx0XHRcdFx0Jz0nXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAocGFkZGluZyA9PSAxKSB7XG5cdFx0XHRidWZmZXIgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCA0KSAmIDB4M0YpICtcblx0XHRcdFx0Jz09J1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdHZhciBiYXNlNjQgPSB7XG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCd2ZXJzaW9uJzogJzEuMC4wJ1xuXHR9O1xuXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGJhc2U2NDtcblx0XHR9KTtcblx0fVx0ZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG5cdFx0aWYgKGZyZWVNb2R1bGUpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IGJhc2U2NDtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGJhc2U2NCkge1xuXHRcdFx0XHRiYXNlNjQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IGJhc2U2NFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LmJhc2U2NCA9IGJhc2U2NDtcblx0fVxuXG59KHRoaXMpKTtcbiIsIihmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShkZWZpbml0aW9uKTtcbiAgZWxzZSBjb250ZXh0W25hbWVdID0gZGVmaW5pdGlvbigpO1xufSkoJ3VybGpvaW4nLCB0aGlzLCBmdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplIChzdHJBcnJheSkge1xuICAgIHZhciByZXN1bHRBcnJheSA9IFtdO1xuICAgIGlmIChzdHJBcnJheS5sZW5ndGggPT09IDApIHsgcmV0dXJuICcnOyB9XG5cbiAgICBpZiAodHlwZW9mIHN0ckFycmF5WzBdICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVXJsIG11c3QgYmUgYSBzdHJpbmcuIFJlY2VpdmVkICcgKyBzdHJBcnJheVswXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGZpcnN0IHBhcnQgaXMgYSBwbGFpbiBwcm90b2NvbCwgd2UgY29tYmluZSBpdCB3aXRoIHRoZSBuZXh0IHBhcnQuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eW14vOl0rOlxcLyokLykgJiYgc3RyQXJyYXkubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGZpcnN0ID0gc3RyQXJyYXkuc2hpZnQoKTtcbiAgICAgIHN0ckFycmF5WzBdID0gZmlyc3QgKyBzdHJBcnJheVswXTtcbiAgICB9XG5cbiAgICAvLyBUaGVyZSBtdXN0IGJlIHR3byBvciB0aHJlZSBzbGFzaGVzIGluIHRoZSBmaWxlIHByb3RvY29sLCB0d28gc2xhc2hlcyBpbiBhbnl0aGluZyBlbHNlLlxuICAgIGlmIChzdHJBcnJheVswXS5tYXRjaCgvXmZpbGU6XFwvXFwvXFwvLykpIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8vJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8nKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gc3RyQXJyYXlbaV07XG5cbiAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIGNvbXBvbmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wb25lbnQgPT09ICcnKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgc3RhcnRpbmcgc2xhc2hlcyBmb3IgZWFjaCBjb21wb25lbnQgYnV0IHRoZSBmaXJzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL15bXFwvXSsvLCAnJyk7XG4gICAgICB9XG4gICAgICBpZiAoaSA8IHN0ckFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGVuZGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGxhc3QuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIHRoZSBsYXN0IGNvbXBvbmVudCB3ZSB3aWxsIGNvbWJpbmUgbXVsdGlwbGUgc2xhc2hlcyB0byBhIHNpbmdsZSBvbmUuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJy8nKTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0QXJyYXkucHVzaChjb21wb25lbnQpO1xuXG4gICAgfVxuXG4gICAgdmFyIHN0ciA9IHJlc3VsdEFycmF5LmpvaW4oJy8nKTtcbiAgICAvLyBFYWNoIGlucHV0IGNvbXBvbmVudCBpcyBub3cgc2VwYXJhdGVkIGJ5IGEgc2luZ2xlIHNsYXNoIGV4Y2VwdCB0aGUgcG9zc2libGUgZmlyc3QgcGxhaW4gcHJvdG9jb2wgcGFydC5cblxuICAgIC8vIHJlbW92ZSB0cmFpbGluZyBzbGFzaCBiZWZvcmUgcGFyYW1ldGVycyBvciBoYXNoXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcLyhcXD98JnwjW14hXSkvZywgJyQxJyk7XG5cbiAgICAvLyByZXBsYWNlID8gaW4gcGFyYW1ldGVycyB3aXRoICZcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJz8nKTtcbiAgICBzdHIgPSBwYXJ0cy5zaGlmdCgpICsgKHBhcnRzLmxlbmd0aCA+IDAgPyAnPyc6ICcnKSArIHBhcnRzLmpvaW4oJyYnKTtcblxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnB1dDtcblxuICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgaW5wdXQgPSBhcmd1bWVudHNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0ID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBub3JtYWxpemUoaW5wdXQpO1xuICB9O1xuXG59KTtcbiIsIi8vIEF4aW9zIHYxLjcuOSBDb3B5cmlnaHQgKGMpIDIwMjQgTWF0dCBaYWJyaXNraWUgYW5kIGNvbnRyaWJ1dG9yc1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5jb25zdCB7dG9TdHJpbmd9ID0gT2JqZWN0LnByb3RvdHlwZTtcbmNvbnN0IHtnZXRQcm90b3R5cGVPZn0gPSBPYmplY3Q7XG5cbmNvbnN0IGtpbmRPZiA9IChjYWNoZSA9PiB0aGluZyA9PiB7XG4gICAgY29uc3Qgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmNvbnN0IGtpbmRPZlRlc3QgPSAodHlwZSkgPT4ge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKHRoaW5nKSA9PiBraW5kT2YodGhpbmcpID09PSB0eXBlXG59O1xuXG5jb25zdCB0eXBlT2ZUZXN0ID0gdHlwZSA9PiB0aGluZyA9PiB0eXBlb2YgdGhpbmcgPT09IHR5cGU7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCB7aXNBcnJheX0gPSBBcnJheTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VuZGVmaW5lZCA9IHR5cGVPZlRlc3QoJ3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIGlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKSAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0FycmF5QnVmZmVyID0ga2luZE9mVGVzdCgnQXJyYXlCdWZmZXInKTtcblxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIGxldCByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKGlzQXJyYXlCdWZmZXIodmFsLmJ1ZmZlcikpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJpbmcgPSB0eXBlT2ZUZXN0KCdzdHJpbmcnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Z1bmN0aW9uID0gdHlwZU9mVGVzdCgnZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc051bWJlciA9IHR5cGVPZlRlc3QoJ251bWJlcicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgIT09IG51bGwgJiYgdHlwZW9mIHRoaW5nID09PSAnb2JqZWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJvb2xlYW5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJvb2xlYW4sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jvb2xlYW4gPSB0aGluZyA9PiB0aGluZyA9PT0gdHJ1ZSB8fCB0aGluZyA9PT0gZmFsc2U7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgaWYgKGtpbmRPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiAocHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKSA9PT0gbnVsbCkgJiYgIShTeW1ib2wudG9TdHJpbmdUYWcgaW4gdmFsKSAmJiAhKFN5bWJvbC5pdGVyYXRvciBpbiB2YWwpO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRGF0ZSA9IGtpbmRPZlRlc3QoJ0RhdGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZSA9IGtpbmRPZlRlc3QoJ0ZpbGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGVMaXN0ID0ga2luZE9mVGVzdCgnRmlsZUxpc3QnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmVhbSA9ICh2YWwpID0+IGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRm9ybURhdGEgPSAodGhpbmcpID0+IHtcbiAgbGV0IGtpbmQ7XG4gIHJldHVybiB0aGluZyAmJiAoXG4gICAgKHR5cGVvZiBGb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGluZyBpbnN0YW5jZW9mIEZvcm1EYXRhKSB8fCAoXG4gICAgICBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiYgKFxuICAgICAgICAoa2luZCA9IGtpbmRPZih0aGluZykpID09PSAnZm9ybWRhdGEnIHx8XG4gICAgICAgIC8vIGRldGVjdCBmb3JtLWRhdGEgaW5zdGFuY2VcbiAgICAgICAgKGtpbmQgPT09ICdvYmplY3QnICYmIGlzRnVuY3Rpb24odGhpbmcudG9TdHJpbmcpICYmIHRoaW5nLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IEZvcm1EYXRhXScpXG4gICAgICApXG4gICAgKVxuICApXG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuY29uc3QgW2lzUmVhZGFibGVTdHJlYW0sIGlzUmVxdWVzdCwgaXNSZXNwb25zZSwgaXNIZWFkZXJzXSA9IFsnUmVhZGFibGVTdHJlYW0nLCAnUmVxdWVzdCcsICdSZXNwb25zZScsICdIZWFkZXJzJ10ubWFwKGtpbmRPZlRlc3QpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4gc3RyLnRyaW0gP1xuICBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHthbGxPd25LZXlzID0gZmFsc2V9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpXG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIGNvbnN0IHtjYXNlbGVzc30gPSBpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEtleSA9IGNhc2VsZXNzICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgYXJndW1lbnRzW2ldICYmIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FsbE93bktleXNdXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmNvbnN0IGV4dGVuZCA9IChhLCBiLCB0aGlzQXJnLCB7YWxsT3duS2V5c309IHt9KSA9PiB7XG4gIGZvckVhY2goYiwgKHZhbCwga2V5KSA9PiB7XG4gICAgaWYgKHRoaXNBcmcgJiYgaXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0sIHthbGxPd25LZXlzfSk7XG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuY29uc3Qgc3RyaXBCT00gPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn07XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlXG4gIH0pO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlIG9iamVjdCB3aXRoIGRlZXAgcHJvdG90eXBlIGNoYWluIHRvIGEgZmxhdCBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2VPYmogc291cmNlIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IFtkZXN0T2JqXVxuICogQHBhcmFtIHtGdW5jdGlvbnxCb29sZWFufSBbZmlsdGVyXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Byb3BGaWx0ZXJdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuY29uc3QgdG9GbGF0T2JqZWN0ID0gKHNvdXJjZU9iaiwgZGVzdE9iaiwgZmlsdGVyLCBwcm9wRmlsdGVyKSA9PiB7XG4gIGxldCBwcm9wcztcbiAgbGV0IGk7XG4gIGxldCBwcm9wO1xuICBjb25zdCBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIGlmIChzb3VyY2VPYmogPT0gbnVsbCkgcmV0dXJuIGRlc3RPYmo7XG5cbiAgZG8ge1xuICAgIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlT2JqKTtcbiAgICBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICBwcm9wID0gcHJvcHNbaV07XG4gICAgICBpZiAoKCFwcm9wRmlsdGVyIHx8IHByb3BGaWx0ZXIocHJvcCwgc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgIW1lcmdlZFtwcm9wXSkge1xuICAgICAgICBkZXN0T2JqW3Byb3BdID0gc291cmNlT2JqW3Byb3BdO1xuICAgICAgICBtZXJnZWRbcHJvcF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBzb3VyY2VPYmogPSBmaWx0ZXIgIT09IGZhbHNlICYmIGdldFByb3RvdHlwZU9mKHNvdXJjZU9iaik7XG4gIH0gd2hpbGUgKHNvdXJjZU9iaiAmJiAoIWZpbHRlciB8fCBmaWx0ZXIoc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgc291cmNlT2JqICE9PSBPYmplY3QucHJvdG90eXBlKTtcblxuICByZXR1cm4gZGVzdE9iajtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3RyaW5nIGVuZHMgd2l0aCB0aGUgY2hhcmFjdGVycyBvZiBhIHNwZWNpZmllZCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gW3Bvc2l0aW9uPSAwXVxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBlbmRzV2l0aCA9IChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pID0+IHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICBjb25zdCBsYXN0SW5kZXggPSBzdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3NpdGlvbjtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKlxuICogQHBhcmFtIHsqfSBbdGhpbmddXG4gKlxuICogQHJldHVybnMgez9BcnJheX1cbiAqL1xuY29uc3QgdG9BcnJheSA9ICh0aGluZykgPT4ge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgaWYgKGlzQXJyYXkodGhpbmcpKSByZXR1cm4gdGhpbmc7XG4gIGxldCBpID0gdGhpbmcubGVuZ3RoO1xuICBpZiAoIWlzTnVtYmVyKGkpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGFycltpXSA9IHRoaW5nW2ldO1xuICB9XG4gIHJldHVybiBhcnI7XG59O1xuXG4vKipcbiAqIENoZWNraW5nIGlmIHRoZSBVaW50OEFycmF5IGV4aXN0cyBhbmQgaWYgaXQgZG9lcywgaXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZVxuICogdGhpbmcgcGFzc2VkIGluIGlzIGFuIGluc3RhbmNlIG9mIFVpbnQ4QXJyYXlcbiAqXG4gKiBAcGFyYW0ge1R5cGVkQXJyYXl9XG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuY29uc3QgaXNUeXBlZEFycmF5ID0gKFR5cGVkQXJyYXkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gdGhpbmcgPT4ge1xuICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgfTtcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBnZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSk7XG5cbi8qKlxuICogRm9yIGVhY2ggZW50cnkgaW4gdGhlIG9iamVjdCwgY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCB0aGUga2V5IGFuZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBlbnRyeS5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgZm9yRWFjaEVudHJ5ID0gKG9iaiwgZm4pID0+IHtcbiAgY29uc3QgZ2VuZXJhdG9yID0gb2JqICYmIG9ialtTeW1ib2wuaXRlcmF0b3JdO1xuXG4gIGNvbnN0IGl0ZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwob2JqKTtcblxuICBsZXQgcmVzdWx0O1xuXG4gIHdoaWxlICgocmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpKSAmJiAhcmVzdWx0LmRvbmUpIHtcbiAgICBjb25zdCBwYWlyID0gcmVzdWx0LnZhbHVlO1xuICAgIGZuLmNhbGwob2JqLCBwYWlyWzBdLCBwYWlyWzFdKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhbmQgYSBzdHJpbmcsIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIGFsbCB0aGUgbWF0Y2hlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWdFeHAgLSBUaGUgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIGFnYWluc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBzZWFyY2guXG4gKlxuICogQHJldHVybnMge0FycmF5PGJvb2xlYW4+fVxuICovXG5jb25zdCBtYXRjaEFsbCA9IChyZWdFeHAsIHN0cikgPT4ge1xuICBsZXQgbWF0Y2hlcztcbiAgY29uc3QgYXJyID0gW107XG5cbiAgd2hpbGUgKChtYXRjaGVzID0gcmVnRXhwLmV4ZWMoc3RyKSkgIT09IG51bGwpIHtcbiAgICBhcnIucHVzaChtYXRjaGVzKTtcbiAgfVxuXG4gIHJldHVybiBhcnI7XG59O1xuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn07XG5cbi8qKlxuICogTWFrZXMgYWxsIG1ldGhvZHMgcmVhZC1vbmx5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuY29uc3QgZnJlZXplTWV0aG9kcyA9IChvYmopID0+IHtcbiAgcmVkdWNlRGVzY3JpcHRvcnMob2JqLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIC8vIHNraXAgcmVzdHJpY3RlZCBwcm9wcyBpbiBzdHJpY3QgbW9kZVxuICAgIGlmIChpc0Z1bmN0aW9uKG9iaikgJiYgWydhcmd1bWVudHMnLCAnY2FsbGVyJywgJ2NhbGxlZSddLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBvYmpbbmFtZV07XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm47XG5cbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTtcblxuICAgIGlmICgnd3JpdGFibGUnIGluIGRlc2NyaXB0b3IpIHtcbiAgICAgIGRlc2NyaXB0b3Iud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldCA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0NhbiBub3QgcmV3cml0ZSByZWFkLW9ubHkgbWV0aG9kIFxcJycgKyBuYW1lICsgJ1xcJycpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgdG9PYmplY3RTZXQgPSAoYXJyYXlPclN0cmluZywgZGVsaW1pdGVyKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuXG4gIGNvbnN0IGRlZmluZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBvYmpbdmFsdWVdID0gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufTtcblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5jb25zdCB0b0Zpbml0ZU51bWJlciA9ICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSA9PiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSA9ICt2YWx1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbn07XG5cbmNvbnN0IEFMUEhBID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6JztcblxuY29uc3QgRElHSVQgPSAnMDEyMzQ1Njc4OSc7XG5cbmNvbnN0IEFMUEhBQkVUID0ge1xuICBESUdJVCxcbiAgQUxQSEEsXG4gIEFMUEhBX0RJR0lUOiBBTFBIQSArIEFMUEhBLnRvVXBwZXJDYXNlKCkgKyBESUdJVFxufTtcblxuY29uc3QgZ2VuZXJhdGVTdHJpbmcgPSAoc2l6ZSA9IDE2LCBhbHBoYWJldCA9IEFMUEhBQkVULkFMUEhBX0RJR0lUKSA9PiB7XG4gIGxldCBzdHIgPSAnJztcbiAgY29uc3Qge2xlbmd0aH0gPSBhbHBoYWJldDtcbiAgd2hpbGUgKHNpemUtLSkge1xuICAgIHN0ciArPSBhbHBoYWJldFtNYXRoLnJhbmRvbSgpICogbGVuZ3RofDBdO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cbi8qKlxuICogSWYgdGhlIHRoaW5nIGlzIGEgRm9ybURhdGEgb2JqZWN0LCByZXR1cm4gdHJ1ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IHRoaW5nIC0gVGhlIHRoaW5nIHRvIGNoZWNrLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1NwZWNDb21wbGlhbnRGb3JtKHRoaW5nKSB7XG4gIHJldHVybiAhISh0aGluZyAmJiBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiYgdGhpbmdbU3ltYm9sLnRvU3RyaW5nVGFnXSA9PT0gJ0Zvcm1EYXRhJyAmJiB0aGluZ1tTeW1ib2wuaXRlcmF0b3JdKTtcbn1cblxuY29uc3QgdG9KU09OT2JqZWN0ID0gKG9iaikgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBBcnJheSgxMCk7XG5cbiAgY29uc3QgdmlzaXQgPSAoc291cmNlLCBpKSA9PiB7XG5cbiAgICBpZiAoaXNPYmplY3Qoc291cmNlKSkge1xuICAgICAgaWYgKHN0YWNrLmluZGV4T2Yoc291cmNlKSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYoISgndG9KU09OJyBpbiBzb3VyY2UpKSB7XG4gICAgICAgIHN0YWNrW2ldID0gc291cmNlO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBpc0FycmF5KHNvdXJjZSkgPyBbXSA6IHt9O1xuXG4gICAgICAgIGZvckVhY2goc291cmNlLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHZhbHVlLCBpICsgMSk7XG4gICAgICAgICAgIWlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkgJiYgKHRhcmdldFtrZXldID0gcmVkdWNlZFZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RhY2tbaV0gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9O1xuXG4gIHJldHVybiB2aXNpdChvYmosIDApO1xufTtcblxuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG5jb25zdCBpc1RoZW5hYmxlID0gKHRoaW5nKSA9PlxuICB0aGluZyAmJiAoaXNPYmplY3QodGhpbmcpIHx8IGlzRnVuY3Rpb24odGhpbmcpKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRoZW4pICYmIGlzRnVuY3Rpb24odGhpbmcuY2F0Y2gpO1xuXG4vLyBvcmlnaW5hbCBjb2RlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vRGlnaXRhbEJyYWluSlMvQXhpb3NQcm9taXNlL2Jsb2IvMTZkZWFiMTM3MTBlYzA5Nzc5OTIyMTMxZjNmYTU5NTQzMjBmODNhYi9saWIvdXRpbHMuanMjTDExLUwzNFxuXG5jb25zdCBfc2V0SW1tZWRpYXRlID0gKChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQsIHBvc3RNZXNzYWdlU3VwcG9ydGVkKSA9PiB7XG4gIGlmIChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gc2V0SW1tZWRpYXRlO1xuICB9XG5cbiAgcmV0dXJuIHBvc3RNZXNzYWdlU3VwcG9ydGVkID8gKCh0b2tlbiwgY2FsbGJhY2tzKSA9PiB7XG4gICAgX2dsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoe3NvdXJjZSwgZGF0YX0pID0+IHtcbiAgICAgIGlmIChzb3VyY2UgPT09IF9nbG9iYWwgJiYgZGF0YSA9PT0gdG9rZW4pIHtcbiAgICAgICAgY2FsbGJhY2tzLmxlbmd0aCAmJiBjYWxsYmFja3Muc2hpZnQoKSgpO1xuICAgICAgfVxuICAgIH0sIGZhbHNlKTtcblxuICAgIHJldHVybiAoY2IpID0+IHtcbiAgICAgIGNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgIF9nbG9iYWwucG9zdE1lc3NhZ2UodG9rZW4sIFwiKlwiKTtcbiAgICB9XG4gIH0pKGBheGlvc0Ake01hdGgucmFuZG9tKCl9YCwgW10pIDogKGNiKSA9PiBzZXRUaW1lb3V0KGNiKTtcbn0pKFxuICB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nLFxuICBpc0Z1bmN0aW9uKF9nbG9iYWwucG9zdE1lc3NhZ2UpXG4pO1xuXG5jb25zdCBhc2FwID0gdHlwZW9mIHF1ZXVlTWljcm90YXNrICE9PSAndW5kZWZpbmVkJyA/XG4gIHF1ZXVlTWljcm90YXNrLmJpbmQoX2dsb2JhbCkgOiAoIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLm5leHRUaWNrIHx8IF9zZXRJbW1lZGlhdGUpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKipcblxudmFyIHV0aWxzJDEgPSB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgQUxQSEFCRVQsXG4gIGdlbmVyYXRlU3RyaW5nLFxuICBpc1NwZWNDb21wbGlhbnRGb3JtLFxuICB0b0pTT05PYmplY3QsXG4gIGlzQXN5bmNGbixcbiAgaXNUaGVuYWJsZSxcbiAgc2V0SW1tZWRpYXRlOiBfc2V0SW1tZWRpYXRlLFxuICBhc2FwXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQXhpb3NFcnJvcihtZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIEVycm9yLmNhbGwodGhpcyk7XG5cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2s7XG4gIH1cblxuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLm5hbWUgPSAnQXhpb3NFcnJvcic7XG4gIGNvZGUgJiYgKHRoaXMuY29kZSA9IGNvZGUpO1xuICBjb25maWcgJiYgKHRoaXMuY29uZmlnID0gY29uZmlnKTtcbiAgcmVxdWVzdCAmJiAodGhpcy5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gIGlmIChyZXNwb25zZSkge1xuICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB0aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cyA/IHJlc3BvbnNlLnN0YXR1cyA6IG51bGw7XG4gIH1cbn1cblxudXRpbHMkMS5pbmhlcml0cyhBeGlvc0Vycm9yLCBFcnJvciwge1xuICB0b0pTT046IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB1dGlscyQxLnRvSlNPTk9iamVjdCh0aGlzLmNvbmZpZyksXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzXG4gICAgfTtcbiAgfVxufSk7XG5cbmNvbnN0IHByb3RvdHlwZSQxID0gQXhpb3NFcnJvci5wcm90b3R5cGU7XG5jb25zdCBkZXNjcmlwdG9ycyA9IHt9O1xuXG5bXG4gICdFUlJfQkFEX09QVElPTl9WQUxVRScsXG4gICdFUlJfQkFEX09QVElPTicsXG4gICdFQ09OTkFCT1JURUQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VSUl9ORVRXT1JLJyxcbiAgJ0VSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMnLFxuICAnRVJSX0RFUFJFQ0FURUQnLFxuICAnRVJSX0JBRF9SRVNQT05TRScsXG4gICdFUlJfQkFEX1JFUVVFU1QnLFxuICAnRVJSX0NBTkNFTEVEJyxcbiAgJ0VSUl9OT1RfU1VQUE9SVCcsXG4gICdFUlJfSU5WQUxJRF9VUkwnXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXS5mb3JFYWNoKGNvZGUgPT4ge1xuICBkZXNjcmlwdG9yc1tjb2RlXSA9IHt2YWx1ZTogY29kZX07XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQXhpb3NFcnJvciwgZGVzY3JpcHRvcnMpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSQxLCAnaXNBeGlvc0Vycm9yJywge3ZhbHVlOiB0cnVlfSk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5BeGlvc0Vycm9yLmZyb20gPSAoZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSA9PiB7XG4gIGNvbnN0IGF4aW9zRXJyb3IgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSQxKTtcblxuICB1dGlscyQxLnRvRmxhdE9iamVjdChlcnJvciwgYXhpb3NFcnJvciwgZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IEVycm9yLnByb3RvdHlwZTtcbiAgfSwgcHJvcCA9PiB7XG4gICAgcmV0dXJuIHByb3AgIT09ICdpc0F4aW9zRXJyb3InO1xuICB9KTtcblxuICBBeGlvc0Vycm9yLmNhbGwoYXhpb3NFcnJvciwgZXJyb3IubWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG5cbiAgYXhpb3NFcnJvci5jYXVzZSA9IGVycm9yO1xuXG4gIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG52YXIgaHR0cEFkYXB0ZXIgPSBudWxsO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzJDEuaXNQbGFpbk9iamVjdCh0aGluZykgfHwgdXRpbHMkMS5pc0FycmF5KHRoaW5nKTtcbn1cblxuLyoqXG4gKiBJdCByZW1vdmVzIHRoZSBicmFja2V0cyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgcGFyYW1ldGVyLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgd2l0aG91dCB0aGUgYnJhY2tldHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xuICByZXR1cm4gdXRpbHMkMS5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aC5jb25jYXQoa2V5KS5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRva2VuID0gcmVtb3ZlQnJhY2tldHModG9rZW4pO1xuICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgfSkuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzJDEuaXNBcnJheShhcnIpICYmICFhcnIuc29tZShpc1Zpc2l0YWJsZSk7XG59XG5cbmNvbnN0IHByZWRpY2F0ZXMgPSB1dGlscyQxLnRvRmxhdE9iamVjdCh1dGlscyQxLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMkMS5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGFyZ2V0IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgKEZvcm1EYXRhKSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBvcHRpb25zID0gdXRpbHMkMS50b0ZsYXRPYmplY3Qob3B0aW9ucywge1xuICAgIG1ldGFUb2tlbnM6IHRydWUsXG4gICAgZG90czogZmFsc2UsXG4gICAgaW5kZXhlczogZmFsc2VcbiAgfSwgZmFsc2UsIGZ1bmN0aW9uIGRlZmluZWQob3B0aW9uLCBzb3VyY2UpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgICByZXR1cm4gIXV0aWxzJDEuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICB9KTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2I7XG4gIGNvbnN0IHVzZUJsb2IgPSBfQmxvYiAmJiB1dGlscyQxLmlzU3BlY0NvbXBsaWFudEZvcm0oZm9ybURhdGEpO1xuXG4gIGlmICghdXRpbHMkMS5pc0Z1bmN0aW9uKHZpc2l0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmlzaXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHV0aWxzJDEuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VCbG9iICYmIHV0aWxzJDEuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzJDEuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMkMS5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdXNlQmxvYiAmJiB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBCbG9iKFt2YWx1ZV0pIDogQnVmZmVyLmZyb20odmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZpc2l0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBrZXlcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmd8TnVtYmVyPn0gcGF0aFxuICAgKiBAdGhpcyB7Rm9ybURhdGF9XG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm4gdHJ1ZSB0byB2aXNpdCB0aGUgZWFjaCBwcm9wIG9mIHRoZSB2YWx1ZSByZWN1cnNpdmVseVxuICAgKi9cbiAgZnVuY3Rpb24gZGVmYXVsdFZpc2l0b3IodmFsdWUsIGtleSwgcGF0aCkge1xuICAgIGxldCBhcnIgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSAmJiAhcGF0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodXRpbHMkMS5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSBtZXRhVG9rZW5zID8ga2V5IDoga2V5LnNsaWNlKDAsIC0yKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHV0aWxzJDEuaXNBcnJheSh2YWx1ZSkgJiYgaXNGbGF0QXJyYXkodmFsdWUpKSB8fFxuICAgICAgICAoKHV0aWxzJDEuaXNGaWxlTGlzdCh2YWx1ZSkgfHwgdXRpbHMkMS5lbmRzV2l0aChrZXksICdbXScpKSAmJiAoYXJyID0gdXRpbHMkMS50b0FycmF5KHZhbHVlKSlcbiAgICAgICAgKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gcmVtb3ZlQnJhY2tldHMoa2V5KTtcblxuICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiBlYWNoKGVsLCBpbmRleCkge1xuICAgICAgICAgICEodXRpbHMkMS5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgICAgICAgICAgaW5kZXhlcyA9PT0gdHJ1ZSA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpIDogKGluZGV4ZXMgPT09IG51bGwgPyBrZXkgOiBrZXkgKyAnW10nKSxcbiAgICAgICAgICAgIGNvbnZlcnRWYWx1ZShlbClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkKHZhbHVlLCBwYXRoKSB7XG4gICAgaWYgKHV0aWxzJDEuaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm47XG5cbiAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICcgKyBwYXRoLmpvaW4oJy4nKSk7XG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWx1ZSk7XG5cbiAgICB1dGlscyQxLmZvckVhY2godmFsdWUsIGZ1bmN0aW9uIGVhY2goZWwsIGtleSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gISh1dGlscyQxLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgdmlzaXRvci5jYWxsKFxuICAgICAgICBmb3JtRGF0YSwgZWwsIHV0aWxzJDEuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIGJ1aWxkKGVsLCBwYXRoID8gcGF0aC5jb25jYXQoa2V5KSA6IFtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscyQxLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkYXRhIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICBidWlsZChvYmopO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxuLyoqXG4gKiBJdCBlbmNvZGVzIGEgc3RyaW5nIGJ5IHJlcGxhY2luZyBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgaW4gdGhlIHVucmVzZXJ2ZWQgc2V0IHdpdGhcbiAqIHRoZWlyIHBlcmNlbnQtZW5jb2RlZCBlcXVpdmFsZW50c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGVuY29kZS5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSQxKHN0cikge1xuICBjb25zdCBjaGFyTWFwID0ge1xuICAgICchJzogJyUyMScsXG4gICAgXCInXCI6ICclMjcnLFxuICAgICcoJzogJyUyOCcsXG4gICAgJyknOiAnJTI5JyxcbiAgICAnfic6ICclN0UnLFxuICAgICclMjAnOiAnKycsXG4gICAgJyUwMCc6ICdcXHgwMCdcbiAgfTtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpfl18JTIwfCUwMC9nLCBmdW5jdGlvbiByZXBsYWNlcihtYXRjaCkge1xuICAgIHJldHVybiBjaGFyTWFwW21hdGNoXTtcbiAgfSk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXJhbXMgb2JqZWN0IGFuZCBjb252ZXJ0cyBpdCB0byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgdG8gYmUgY29udmVydGVkIHRvIGEgRm9ybURhdGEgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZCB0byB0aGUgQXhpb3MgY29uc3RydWN0b3IuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykge1xuICB0aGlzLl9wYWlycyA9IFtdO1xuXG4gIHBhcmFtcyAmJiB0b0Zvcm1EYXRhKHBhcmFtcywgdGhpcywgb3B0aW9ucyk7XG59XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZTtcblxucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICB0aGlzLl9wYWlycy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xufTtcblxucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoZW5jb2Rlcikge1xuICBjb25zdCBfZW5jb2RlID0gZW5jb2RlciA/IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGVuY29kZXIuY2FsbCh0aGlzLCB2YWx1ZSwgZW5jb2RlJDEpO1xuICB9IDogZW5jb2RlJDE7XG5cbiAgcmV0dXJuIHRoaXMuX3BhaXJzLm1hcChmdW5jdGlvbiBlYWNoKHBhaXIpIHtcbiAgICByZXR1cm4gX2VuY29kZShwYWlyWzBdKSArICc9JyArIF9lbmNvZGUocGFpclsxXSk7XG4gIH0sICcnKS5qb2luKCcmJyk7XG59O1xuXG4vKipcbiAqIEl0IHJlcGxhY2VzIGFsbCBpbnN0YW5jZXMgb2YgdGhlIGNoYXJhY3RlcnMgYDpgLCBgJGAsIGAsYCwgYCtgLCBgW2AsIGFuZCBgXWAgd2l0aCB0aGVpclxuICogVVJJIGVuY29kZWQgY291bnRlcnBhcnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCBUaGUgdmFsdWUgdG8gYmUgZW5jb2RlZC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEBwYXJhbSB7PyhvYmplY3R8RnVuY3Rpb24pfSBvcHRpb25zXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICBcbiAgY29uc3QgX2VuY29kZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGlmICh1dGlscyQxLmlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgc2VyaWFsaXplOiBvcHRpb25zXG4gICAgfTtcbiAgfSBcblxuICBjb25zdCBzZXJpYWxpemVGbiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zZXJpYWxpemU7XG5cbiAgbGV0IHNlcmlhbGl6ZWRQYXJhbXM7XG5cbiAgaWYgKHNlcmlhbGl6ZUZuKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHNlcmlhbGl6ZUZuKHBhcmFtcywgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHV0aWxzJDEuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAgICovXG4gIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICAgIGZ1bGZpbGxlZCxcbiAgICAgIHJlamVjdGVkLFxuICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaW50ZXJjZXB0b3Igd2FzIHJlbW92ZWQsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHV0aWxzJDEuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICBmbihoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyJDEgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cbnZhciB0cmFuc2l0aW9uYWxEZWZhdWx0cyA9IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcblxudmFyIFVSTFNlYXJjaFBhcmFtcyQxID0gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcblxudmFyIEZvcm1EYXRhJDEgPSB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnID8gRm9ybURhdGEgOiBudWxsO1xuXG52YXIgQmxvYiQxID0gdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnID8gQmxvYiA6IG51bGw7XG5cbnZhciBwbGF0Zm9ybSQxID0ge1xuICBpc0Jyb3dzZXI6IHRydWUsXG4gIGNsYXNzZXM6IHtcbiAgICBVUkxTZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyQxLFxuICAgIEZvcm1EYXRhOiBGb3JtRGF0YSQxLFxuICAgIEJsb2I6IEJsb2IkMVxuICB9LFxuICBwcm90b2NvbHM6IFsnaHR0cCcsICdodHRwcycsICdmaWxlJywgJ2Jsb2InLCAndXJsJywgJ2RhdGEnXVxufTtcblxuY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmNvbnN0IF9uYXZpZ2F0b3IgPSB0eXBlb2YgbmF2aWdhdG9yID09PSAnb2JqZWN0JyAmJiBuYXZpZ2F0b3IgfHwgdW5kZWZpbmVkO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyRW52ID0gaGFzQnJvd3NlckVudiAmJlxuICAoIV9uYXZpZ2F0b3IgfHwgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKF9uYXZpZ2F0b3IucHJvZHVjdCkgPCAwKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgd2ViV29ya2VyIGVudmlyb25tZW50XG4gKlxuICogQWx0aG91Z2ggdGhlIGBpc1N0YW5kYXJkQnJvd3NlckVudmAgbWV0aG9kIGluZGljYXRlcyB0aGF0XG4gKiBgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXJgLCB0aGUgV2ViV29ya2VyIHdpbGwgc3RpbGwgYmVcbiAqIGZpbHRlcmVkIG91dCBkdWUgdG8gaXRzIGp1ZGdtZW50IHN0YW5kYXJkXG4gKiBgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ2AuXG4gKiBUaGlzIGxlYWRzIHRvIGEgcHJvYmxlbSB3aGVuIGF4aW9zIHBvc3QgYEZvcm1EYXRhYCBpbiB3ZWJXb3JrZXJcbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52ID0gKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlICYmXG4gICAgdHlwZW9mIHNlbGYuaW1wb3J0U2NyaXB0cyA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufSkoKTtcblxuY29uc3Qgb3JpZ2luID0gaGFzQnJvd3NlckVudiAmJiB3aW5kb3cubG9jYXRpb24uaHJlZiB8fCAnaHR0cDovL2xvY2FsaG9zdCc7XG5cbnZhciB1dGlscyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgX19wcm90b19fOiBudWxsLFxuICBoYXNCcm93c2VyRW52OiBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnY6IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyRW52OiBoYXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIG5hdmlnYXRvcjogX25hdmlnYXRvcixcbiAgb3JpZ2luOiBvcmlnaW5cbn0pO1xuXG52YXIgcGxhdGZvcm0gPSB7XG4gIC4uLnV0aWxzLFxuICAuLi5wbGF0Zm9ybSQxXG59O1xuXG5mdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIE9iamVjdC5hc3NpZ24oe1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uKHZhbHVlLCBrZXksIHBhdGgsIGhlbHBlcnMpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pc05vZGUgJiYgdXRpbHMkMS5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWxwZXJzLmRlZmF1bHRWaXNpdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9LCBvcHRpb25zKSk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcgbGlrZSBgZm9vW3hdW3ldW3pdYCBhbmQgcmV0dXJucyBhbiBhcnJheSBsaWtlIGBbJ2ZvbycsICd4JywgJ3knLCAneiddXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICpcbiAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHN0cmluZ3MuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlUHJvcFBhdGgobmFtZSkge1xuICAvLyBmb29beF1beV1bel1cbiAgLy8gZm9vLngueS56XG4gIC8vIGZvby14LXktelxuICAvLyBmb28geCB5IHpcbiAgcmV0dXJuIHV0aWxzJDEubWF0Y2hBbGwoL1xcdyt8XFxbKFxcdyopXS9nLCBuYW1lKS5tYXAobWF0Y2ggPT4ge1xuICAgIHJldHVybiBtYXRjaFswXSA9PT0gJ1tdJyA/ICcnIDogbWF0Y2hbMV0gfHwgbWF0Y2hbMF07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYW4gYXJyYXkgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNvbnZlcnQgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIGtleXMgYW5kIHZhbHVlcyBhcyB0aGUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5VG9PYmplY3QoYXJyKSB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcbiAgbGV0IGk7XG4gIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICBsZXQga2V5O1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIG9ialtrZXldID0gYXJyW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIEZvcm1EYXRhIG9iamVjdCBhbmQgcmV0dXJucyBhIEphdmFTY3JpcHQgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gY29udmVydCB0byBKU09OLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3Q8c3RyaW5nLCBhbnk+IHwgbnVsbH0gVGhlIGNvbnZlcnRlZCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGZvcm1EYXRhVG9KU09OKGZvcm1EYXRhKSB7XG4gIGZ1bmN0aW9uIGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0LCBpbmRleCkge1xuICAgIGxldCBuYW1lID0gcGF0aFtpbmRleCsrXTtcblxuICAgIGlmIChuYW1lID09PSAnX19wcm90b19fJykgcmV0dXJuIHRydWU7XG5cbiAgICBjb25zdCBpc051bWVyaWNLZXkgPSBOdW1iZXIuaXNGaW5pdGUoK25hbWUpO1xuICAgIGNvbnN0IGlzTGFzdCA9IGluZGV4ID49IHBhdGgubGVuZ3RoO1xuICAgIG5hbWUgPSAhbmFtZSAmJiB1dGlscyQxLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzJDEuaGFzT3duUHJvcCh0YXJnZXQsIG5hbWUpKSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IFt0YXJnZXRbbmFtZV0sIHZhbHVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldFtuYW1lXSB8fCAhdXRpbHMkMS5pc09iamVjdCh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldFtuYW1lXSwgaW5kZXgpO1xuXG4gICAgaWYgKHJlc3VsdCAmJiB1dGlscyQxLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzJDEuaXNGb3JtRGF0YShmb3JtRGF0YSkgJiYgdXRpbHMkMS5pc0Z1bmN0aW9uKGZvcm1EYXRhLmVudHJpZXMpKSB7XG4gICAgY29uc3Qgb2JqID0ge307XG5cbiAgICB1dGlscyQxLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscyQxLmlzU3RyaW5nKHJhd1ZhbHVlKSkge1xuICAgIHRyeSB7XG4gICAgICAocGFyc2VyIHx8IEpTT04ucGFyc2UpKHJhd1ZhbHVlKTtcbiAgICAgIHJldHVybiB1dGlscyQxLnRyaW0ocmF3VmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLm5hbWUgIT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gKGVuY29kZXIgfHwgSlNPTi5zdHJpbmdpZnkpKHJhd1ZhbHVlKTtcbn1cblxuY29uc3QgZGVmYXVsdHMgPSB7XG5cbiAgdHJhbnNpdGlvbmFsOiB0cmFuc2l0aW9uYWxEZWZhdWx0cyxcblxuICBhZGFwdGVyOiBbJ3hocicsICdodHRwJywgJ2ZldGNoJ10sXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gaGVhZGVycy5nZXRDb250ZW50VHlwZSgpIHx8ICcnO1xuICAgIGNvbnN0IGhhc0pTT05Db250ZW50VHlwZSA9IGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL2pzb24nKSA+IC0xO1xuICAgIGNvbnN0IGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzJDEuaXNPYmplY3QoZGF0YSk7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzJDEuaXNIVE1MRm9ybShkYXRhKSkge1xuICAgICAgZGF0YSA9IG5ldyBGb3JtRGF0YShkYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0Zvcm1EYXRhID0gdXRpbHMkMS5pc0Zvcm1EYXRhKGRhdGEpO1xuXG4gICAgaWYgKGlzRm9ybURhdGEpIHtcbiAgICAgIHJldHVybiBoYXNKU09OQ29udGVudFR5cGUgPyBKU09OLnN0cmluZ2lmeShmb3JtRGF0YVRvSlNPTihkYXRhKSkgOiBkYXRhO1xuICAgIH1cblxuICAgIGlmICh1dGlscyQxLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzJDEuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzJDEuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzJDEuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscyQxLmlzQmxvYihkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzJDEuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzJDEuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JywgZmFsc2UpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBsZXQgaXNGaWxlTGlzdDtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQpIHtcbiAgICAgIGlmIChjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIHRoaXMuZm9ybVNlcmlhbGl6ZXIpLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICgoaXNGaWxlTGlzdCA9IHV0aWxzJDEuaXNGaWxlTGlzdChkYXRhKSkgfHwgY29udGVudFR5cGUuaW5kZXhPZignbXVsdGlwYXJ0L2Zvcm0tZGF0YScpID4gLTEpIHtcbiAgICAgICAgY29uc3QgX0Zvcm1EYXRhID0gdGhpcy5lbnYgJiYgdGhpcy5lbnYuRm9ybURhdGE7XG5cbiAgICAgICAgcmV0dXJuIHRvRm9ybURhdGEoXG4gICAgICAgICAgaXNGaWxlTGlzdCA/IHsnZmlsZXNbXSc6IGRhdGF9IDogZGF0YSxcbiAgICAgICAgICBfRm9ybURhdGEgJiYgbmV3IF9Gb3JtRGF0YSgpLFxuICAgICAgICAgIHRoaXMuZm9ybVNlcmlhbGl6ZXJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkIHx8IGhhc0pTT05Db250ZW50VHlwZSApIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nLCBmYWxzZSk7XG4gICAgICByZXR1cm4gc3RyaW5naWZ5U2FmZWx5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSB0aGlzLnRyYW5zaXRpb25hbCB8fCBkZWZhdWx0cy50cmFuc2l0aW9uYWw7XG4gICAgY29uc3QgZm9yY2VkSlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLmZvcmNlZEpTT05QYXJzaW5nO1xuICAgIGNvbnN0IEpTT05SZXF1ZXN0ZWQgPSB0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nO1xuXG4gICAgaWYgKHV0aWxzJDEuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscyQxLmlzUmVhZGFibGVTdHJlYW0oZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGlmIChkYXRhICYmIHV0aWxzJDEuaXNTdHJpbmcoZGF0YSkgJiYgKChmb3JjZWRKU09OUGFyc2luZyAmJiAhdGhpcy5yZXNwb25zZVR5cGUpIHx8IEpTT05SZXF1ZXN0ZWQpKSB7XG4gICAgICBjb25zdCBzaWxlbnRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuc2lsZW50SlNPTlBhcnNpbmc7XG4gICAgICBjb25zdCBzdHJpY3RKU09OUGFyc2luZyA9ICFzaWxlbnRKU09OUGFyc2luZyAmJiBKU09OUmVxdWVzdGVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XG4gICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiBwbGF0Zm9ybS5jbGFzc2VzLkZvcm1EYXRhLFxuICAgIEJsb2I6IHBsYXRmb3JtLmNsYXNzZXMuQmxvYlxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufTtcblxudXRpbHMkMS5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudmFyIGRlZmF1bHRzJDEgPSBkZWZhdWx0cztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscyQxLnRvT2JqZWN0U2V0KFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dKTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJhd0hlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbnZhciBwYXJzZUhlYWRlcnMgPSByYXdIZWFkZXJzID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiYgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5jb25zdCAkaW50ZXJuYWxzID0gU3ltYm9sKCdpbnRlcm5hbHMnKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyICYmIFN0cmluZyhoZWFkZXIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdXRpbHMkMS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzJDEuaXNGdW5jdGlvbihmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKHRoaXMsIHZhbHVlLCBoZWFkZXIpO1xuICB9XG5cbiAgaWYgKGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICAgIHZhbHVlID0gaGVhZGVyO1xuICB9XG5cbiAgaWYgKCF1dGlscyQxLmlzU3RyaW5nKHZhbHVlKSkgcmV0dXJuO1xuXG4gIGlmICh1dGlscyQxLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscyQxLmlzUmVnRXhwKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLnRlc3QodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlci50cmltKClcbiAgICAudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oW2EtelxcZF0pKFxcdyopL2csICh3LCBjaGFyLCBzdHIpID0+IHtcbiAgICAgIHJldHVybiBjaGFyLnRvVXBwZXJDYXNlKCkgKyBzdHI7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQWNjZXNzb3JzKG9iaiwgaGVhZGVyKSB7XG4gIGNvbnN0IGFjY2Vzc29yTmFtZSA9IHV0aWxzJDEudG9DYW1lbENhc2UoJyAnICsgaGVhZGVyKTtcblxuICBbJ2dldCcsICdzZXQnLCAnaGFzJ10uZm9yRWFjaChtZXRob2ROYW1lID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBtZXRob2ROYW1lICsgYWNjZXNzb3JOYW1lLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICByZXR1cm4gdGhpc1ttZXRob2ROYW1lXS5jYWxsKHRoaXMsIGhlYWRlciwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0pO1xufVxuXG5jbGFzcyBBeGlvc0hlYWRlcnMge1xuICBjb25zdHJ1Y3RvcihoZWFkZXJzKSB7XG4gICAgaGVhZGVycyAmJiB0aGlzLnNldChoZWFkZXJzKTtcbiAgfVxuXG4gIHNldChoZWFkZXIsIHZhbHVlT3JSZXdyaXRlLCByZXdyaXRlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFsSGVhZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaGVhZGVyIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qga2V5ID0gdXRpbHMkMS5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZigha2V5IHx8IHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8IF9yZXdyaXRlID09PSB0cnVlIHx8IChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMkMS5mb3JFYWNoKGhlYWRlcnMsIChfdmFsdWUsIF9oZWFkZXIpID0+IHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSk7XG5cbiAgICBpZiAodXRpbHMkMS5pc1BsYWluT2JqZWN0KGhlYWRlcikgfHwgaGVhZGVyIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3Rvcikge1xuICAgICAgc2V0SGVhZGVycyhoZWFkZXIsIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2UgaWYodXRpbHMkMS5pc1N0cmluZyhoZWFkZXIpICYmIChoZWFkZXIgPSBoZWFkZXIudHJpbSgpKSAmJiAhaXNWYWxpZEhlYWRlck5hbWUoaGVhZGVyKSkge1xuICAgICAgc2V0SGVhZGVycyhwYXJzZUhlYWRlcnMoaGVhZGVyKSwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMkMS5pc0hlYWRlcnMoaGVhZGVyKSkge1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgaGVhZGVyLmVudHJpZXMoKSkge1xuICAgICAgICBzZXRIZWFkZXIodmFsdWUsIGtleSwgcmV3cml0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMkMS5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzW2tleV07XG5cbiAgICAgICAgaWYgKCFwYXJzZXIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyc2VyID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlVG9rZW5zKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscyQxLmlzRnVuY3Rpb24ocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuY2FsbCh0aGlzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscyQxLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgcmV0dXJuICEhKGtleSAmJiB0aGlzW2tleV0gIT09IHVuZGVmaW5lZCAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlcikpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkZWxldGUoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUhlYWRlcihfaGVhZGVyKSB7XG4gICAgICBfaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoX2hlYWRlcikge1xuICAgICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkoc2VsZiwgX2hlYWRlcik7XG5cbiAgICAgICAgaWYgKGtleSAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZShzZWxmLCBzZWxmW2tleV0sIGtleSwgbWF0Y2hlcikpKSB7XG4gICAgICAgICAgZGVsZXRlIHNlbGZba2V5XTtcblxuICAgICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzJDEuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzJDEuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMkMS5maW5kS2V5KGhlYWRlcnMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgc2VsZltrZXldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBmb3JtYXQgPyBmb3JtYXRIZWFkZXIoaGVhZGVyKSA6IFN0cmluZyhoZWFkZXIpLnRyaW0oKTtcblxuICAgICAgaWYgKG5vcm1hbGl6ZWQgIT09IGhlYWRlcikge1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgfVxuXG4gICAgICBzZWxmW25vcm1hbGl6ZWRdID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWRdID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29uY2F0KC4uLnRhcmdldHMpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jb25jYXQodGhpcywgLi4udGFyZ2V0cyk7XG4gIH1cblxuICB0b0pTT04oYXNTdHJpbmdzKSB7XG4gICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIHV0aWxzJDEuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzJDEuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKCcsICcpIDogdmFsdWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSkubWFwKChbaGVhZGVyLCB2YWx1ZV0pID0+IGhlYWRlciArICc6ICcgKyB2YWx1ZSkuam9pbignXFxuJyk7XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdBeGlvc0hlYWRlcnMnO1xuICB9XG5cbiAgc3RhdGljIGZyb20odGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiB0aGlzID8gdGhpbmcgOiBuZXcgdGhpcyh0aGluZyk7XG4gIH1cblxuICBzdGF0aWMgY29uY2F0KGZpcnN0LCAuLi50YXJnZXRzKSB7XG4gICAgY29uc3QgY29tcHV0ZWQgPSBuZXcgdGhpcyhmaXJzdCk7XG5cbiAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4gY29tcHV0ZWQuc2V0KHRhcmdldCkpO1xuXG4gICAgcmV0dXJuIGNvbXB1dGVkO1xuICB9XG5cbiAgc3RhdGljIGFjY2Vzc29yKGhlYWRlcikge1xuICAgIGNvbnN0IGludGVybmFscyA9IHRoaXNbJGludGVybmFsc10gPSAodGhpc1skaW50ZXJuYWxzXSA9IHtcbiAgICAgIGFjY2Vzc29yczoge31cbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IGludGVybmFscy5hY2Nlc3NvcnM7XG4gICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWFjY2Vzc29yc1tsSGVhZGVyXSkge1xuICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xuICAgICAgICBhY2Nlc3NvcnNbbEhlYWRlcl0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzJDEuaXNBcnJheShoZWFkZXIpID8gaGVhZGVyLmZvckVhY2goZGVmaW5lQWNjZXNzb3IpIDogZGVmaW5lQWNjZXNzb3IoaGVhZGVyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbkF4aW9zSGVhZGVycy5hY2Nlc3NvcihbJ0NvbnRlbnQtVHlwZScsICdDb250ZW50LUxlbmd0aCcsICdBY2NlcHQnLCAnQWNjZXB0LUVuY29kaW5nJywgJ1VzZXItQWdlbnQnLCAnQXV0aG9yaXphdGlvbiddKTtcblxuLy8gcmVzZXJ2ZWQgbmFtZXMgaG90Zml4XG51dGlscyQxLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7dmFsdWV9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudXRpbHMkMS5mcmVlemVNZXRob2RzKEF4aW9zSGVhZGVycyk7XG5cbnZhciBBeGlvc0hlYWRlcnMkMSA9IEF4aW9zSGVhZGVycztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHBhcmFtIHs/T2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcbiAgY29uc3QgY29uZmlnID0gdGhpcyB8fCBkZWZhdWx0cyQxO1xuICBjb25zdCBjb250ZXh0ID0gcmVzcG9uc2UgfHwgY29uZmlnO1xuICBjb25zdCBoZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShjb250ZXh0LmhlYWRlcnMpO1xuICBsZXQgZGF0YSA9IGNvbnRleHQuZGF0YTtcblxuICB1dGlscyQxLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaGVhZGVycy5ub3JtYWxpemUoKTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdD19IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3Q9fSByZXF1ZXN0IFRoZSByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxlZEVycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIEF4aW9zRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlID09IG51bGwgPyAnY2FuY2VsZWQnIDogbWVzc2FnZSwgQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQsIGNvbmZpZywgcmVxdWVzdCk7XG4gIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbn1cblxudXRpbHMkMS5pbmhlcml0cyhDYW5jZWxlZEVycm9yLCBBeGlvc0Vycm9yLCB7XG4gIF9fQ0FOQ0VMX186IHRydWVcbn0pO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSByZXNwb25zZS5cbiAqL1xuZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgY29uc3QgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIFtBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFXVtNYXRoLmZsb29yKHJlc3BvbnNlLnN0YXR1cyAvIDEwMCkgLSA0XSxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIGNvbnN0IG1hdGNoID0gL14oWy0rXFx3XXsxLDI1fSkoOj9cXC9cXC98OikvLmV4ZWModXJsKTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdIHx8ICcnO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSBkYXRhIG1heFJhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2FtcGxlc0NvdW50PSAxMF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbbWluPSAxMDAwXVxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBzcGVlZG9tZXRlcihzYW1wbGVzQ291bnQsIG1pbikge1xuICBzYW1wbGVzQ291bnQgPSBzYW1wbGVzQ291bnQgfHwgMTA7XG4gIGNvbnN0IGJ5dGVzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGNvbnN0IHRpbWVzdGFtcHMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgbGV0IGhlYWQgPSAwO1xuICBsZXQgdGFpbCA9IDA7XG4gIGxldCBmaXJzdFNhbXBsZVRTO1xuXG4gIG1pbiA9IG1pbiAhPT0gdW5kZWZpbmVkID8gbWluIDogMTAwMDtcblxuICByZXR1cm4gZnVuY3Rpb24gcHVzaChjaHVua0xlbmd0aCkge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgICBjb25zdCBzdGFydGVkQXQgPSB0aW1lc3RhbXBzW3RhaWxdO1xuXG4gICAgaWYgKCFmaXJzdFNhbXBsZVRTKSB7XG4gICAgICBmaXJzdFNhbXBsZVRTID0gbm93O1xuICAgIH1cblxuICAgIGJ5dGVzW2hlYWRdID0gY2h1bmtMZW5ndGg7XG4gICAgdGltZXN0YW1wc1toZWFkXSA9IG5vdztcblxuICAgIGxldCBpID0gdGFpbDtcbiAgICBsZXQgYnl0ZXNDb3VudCA9IDA7XG5cbiAgICB3aGlsZSAoaSAhPT0gaGVhZCkge1xuICAgICAgYnl0ZXNDb3VudCArPSBieXRlc1tpKytdO1xuICAgICAgaSA9IGkgJSBzYW1wbGVzQ291bnQ7XG4gICAgfVxuXG4gICAgaGVhZCA9IChoZWFkICsgMSkgJSBzYW1wbGVzQ291bnQ7XG5cbiAgICBpZiAoaGVhZCA9PT0gdGFpbCkge1xuICAgICAgdGFpbCA9ICh0YWlsICsgMSkgJSBzYW1wbGVzQ291bnQ7XG4gICAgfVxuXG4gICAgaWYgKG5vdyAtIGZpcnN0U2FtcGxlVFMgPCBtaW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYXNzZWQgPSBzdGFydGVkQXQgJiYgbm93IC0gc3RhcnRlZEF0O1xuXG4gICAgcmV0dXJuIHBhc3NlZCA/IE1hdGgucm91bmQoYnl0ZXNDb3VudCAqIDEwMDAgLyBwYXNzZWQpIDogdW5kZWZpbmVkO1xuICB9O1xufVxuXG4vKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGxldCB0aHJlc2hvbGQgPSAxMDAwIC8gZnJlcTtcbiAgbGV0IGxhc3RBcmdzO1xuICBsZXQgdGltZXI7XG5cbiAgY29uc3QgaW52b2tlID0gKGFyZ3MsIG5vdyA9IERhdGUubm93KCkpID0+IHtcbiAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgbGFzdEFyZ3MgPSBudWxsO1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICB9XG4gICAgZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gIH07XG5cbiAgY29uc3QgdGhyb3R0bGVkID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhc3NlZCA9IG5vdyAtIHRpbWVzdGFtcDtcbiAgICBpZiAoIHBhc3NlZCA+PSB0aHJlc2hvbGQpIHtcbiAgICAgIGludm9rZShhcmdzLCBub3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0QXJncyA9IGFyZ3M7XG4gICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgIGludm9rZShsYXN0QXJncyk7XG4gICAgICAgIH0sIHRocmVzaG9sZCAtIHBhc3NlZCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZsdXNoID0gKCkgPT4gbGFzdEFyZ3MgJiYgaW52b2tlKGxhc3RBcmdzKTtcblxuICByZXR1cm4gW3Rocm90dGxlZCwgZmx1c2hdO1xufVxuXG5jb25zdCBwcm9ncmVzc0V2ZW50UmVkdWNlciA9IChsaXN0ZW5lciwgaXNEb3dubG9hZFN0cmVhbSwgZnJlcSA9IDMpID0+IHtcbiAgbGV0IGJ5dGVzTm90aWZpZWQgPSAwO1xuICBjb25zdCBfc3BlZWRvbWV0ZXIgPSBzcGVlZG9tZXRlcig1MCwgMjUwKTtcblxuICByZXR1cm4gdGhyb3R0bGUoZSA9PiB7XG4gICAgY29uc3QgbG9hZGVkID0gZS5sb2FkZWQ7XG4gICAgY29uc3QgdG90YWwgPSBlLmxlbmd0aENvbXB1dGFibGUgPyBlLnRvdGFsIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHByb2dyZXNzQnl0ZXMgPSBsb2FkZWQgLSBieXRlc05vdGlmaWVkO1xuICAgIGNvbnN0IHJhdGUgPSBfc3BlZWRvbWV0ZXIocHJvZ3Jlc3NCeXRlcyk7XG4gICAgY29uc3QgaW5SYW5nZSA9IGxvYWRlZCA8PSB0b3RhbDtcblxuICAgIGJ5dGVzTm90aWZpZWQgPSBsb2FkZWQ7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbG9hZGVkLFxuICAgICAgdG90YWwsXG4gICAgICBwcm9ncmVzczogdG90YWwgPyAobG9hZGVkIC8gdG90YWwpIDogdW5kZWZpbmVkLFxuICAgICAgYnl0ZXM6IHByb2dyZXNzQnl0ZXMsXG4gICAgICByYXRlOiByYXRlID8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCAmJiBpblJhbmdlID8gKHRvdGFsIC0gbG9hZGVkKSAvIHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBldmVudDogZSxcbiAgICAgIGxlbmd0aENvbXB1dGFibGU6IHRvdGFsICE9IG51bGwsXG4gICAgICBbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ106IHRydWVcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufTtcblxuY29uc3QgcHJvZ3Jlc3NFdmVudERlY29yYXRvciA9ICh0b3RhbCwgdGhyb3R0bGVkKSA9PiB7XG4gIGNvbnN0IGxlbmd0aENvbXB1dGFibGUgPSB0b3RhbCAhPSBudWxsO1xuXG4gIHJldHVybiBbKGxvYWRlZCkgPT4gdGhyb3R0bGVkWzBdKHtcbiAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgIHRvdGFsLFxuICAgIGxvYWRlZFxuICB9KSwgdGhyb3R0bGVkWzFdXTtcbn07XG5cbmNvbnN0IGFzeW5jRGVjb3JhdG9yID0gKGZuKSA9PiAoLi4uYXJncykgPT4gdXRpbHMkMS5hc2FwKCgpID0+IGZuKC4uLmFyZ3MpKTtcblxudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiA/ICgob3JpZ2luLCBpc01TSUUpID0+ICh1cmwpID0+IHtcbiAgdXJsID0gbmV3IFVSTCh1cmwsIHBsYXRmb3JtLm9yaWdpbik7XG5cbiAgcmV0dXJuIChcbiAgICBvcmlnaW4ucHJvdG9jb2wgPT09IHVybC5wcm90b2NvbCAmJlxuICAgIG9yaWdpbi5ob3N0ID09PSB1cmwuaG9zdCAmJlxuICAgIChpc01TSUUgfHwgb3JpZ2luLnBvcnQgPT09IHVybC5wb3J0KVxuICApO1xufSkoXG4gIG5ldyBVUkwocGxhdGZvcm0ub3JpZ2luKSxcbiAgcGxhdGZvcm0ubmF2aWdhdG9yICYmIC8obXNpZXx0cmlkZW50KS9pLnRlc3QocGxhdGZvcm0ubmF2aWdhdG9yLnVzZXJBZ2VudClcbikgOiAoKSA9PiB0cnVlO1xuXG52YXIgY29va2llcyA9IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIHtcbiAgICB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIGNvbnN0IGNvb2tpZSA9IFtuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKV07XG5cbiAgICAgIHV0aWxzJDEuaXNOdW1iZXIoZXhwaXJlcykgJiYgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuXG4gICAgICB1dGlscyQxLmlzU3RyaW5nKHBhdGgpICYmIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcblxuICAgICAgdXRpbHMkMS5pc1N0cmluZyhkb21haW4pICYmIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG5cbiAgICAgIHNlY3VyZSA9PT0gdHJ1ZSAmJiBjb29raWUucHVzaCgnc2VjdXJlJyk7XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG5cbiAgICByZWFkKG5hbWUpIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgfSxcblxuICAgIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfVxuXG4gIDpcblxuICAvLyBOb24tc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIHtcbiAgICB3cml0ZSgpIHt9LFxuICAgIHJlYWQoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZSgpIHt9XG4gIH07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkK1xcLS5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLz9cXC8kLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5mdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn1cblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyQxID8geyAuLi50aGluZyB9IDogdGhpbmc7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xuZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIGNvbnN0IGNvbmZpZyA9IHt9O1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlLCBwcm9wLCBjYXNlbGVzcykge1xuICAgIGlmICh1dGlscyQxLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscyQxLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzJDEubWVyZ2UuY2FsbCh7Y2FzZWxlc3N9LCB0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscyQxLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzJDEubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscyQxLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMoYSwgYiwgcHJvcCAsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYiwgcHJvcCAsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhLCBwcm9wICwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzJDEuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzJDEuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGIpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzJDEuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhYU1JGVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWRhcHRlcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZVR5cGU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkNvb2tpZU5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkhlYWRlck5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25VcGxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgZGVjb21wcmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhDb250ZW50TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heEJvZHlMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYmVmb3JlUmVkaXJlY3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNwb3J0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwc0FnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGNhbmNlbFRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHNvY2tldFBhdGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiICwgcHJvcCkgPT4gbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSxwcm9wLCB0cnVlKVxuICB9O1xuXG4gIHV0aWxzJDEuZm9yRWFjaChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCBjb25maWcxLCBjb25maWcyKSksIGZ1bmN0aW9uIGNvbXB1dGVDb25maWdWYWx1ZShwcm9wKSB7XG4gICAgY29uc3QgbWVyZ2UgPSBtZXJnZU1hcFtwcm9wXSB8fCBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIGNvbnN0IGNvbmZpZ1ZhbHVlID0gbWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSwgcHJvcCk7XG4gICAgKHV0aWxzJDEuaXNVbmRlZmluZWQoY29uZmlnVmFsdWUpICYmIG1lcmdlICE9PSBtZXJnZURpcmVjdEtleXMpIHx8IChjb25maWdbcHJvcF0gPSBjb25maWdWYWx1ZSk7XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59XG5cbnZhciByZXNvbHZlQ29uZmlnID0gKGNvbmZpZykgPT4ge1xuICBjb25zdCBuZXdDb25maWcgPSBtZXJnZUNvbmZpZyh7fSwgY29uZmlnKTtcblxuICBsZXQge2RhdGEsIHdpdGhYU1JGVG9rZW4sIHhzcmZIZWFkZXJOYW1lLCB4c3JmQ29va2llTmFtZSwgaGVhZGVycywgYXV0aH0gPSBuZXdDb25maWc7XG5cbiAgbmV3Q29uZmlnLmhlYWRlcnMgPSBoZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShoZWFkZXJzKTtcblxuICBuZXdDb25maWcudXJsID0gYnVpbGRVUkwoYnVpbGRGdWxsUGF0aChuZXdDb25maWcuYmFzZVVSTCwgbmV3Q29uZmlnLnVybCksIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcblxuICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gIGlmIChhdXRoKSB7XG4gICAgaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArXG4gICAgICBidG9hKChhdXRoLnVzZXJuYW1lIHx8ICcnKSArICc6JyArIChhdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgucGFzc3dvcmQpKSA6ICcnKSlcbiAgICApO1xuICB9XG5cbiAgbGV0IGNvbnRlbnRUeXBlO1xuXG4gIGlmICh1dGlscyQxLmlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52IHx8IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudikge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSh1bmRlZmluZWQpOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfSBlbHNlIGlmICgoY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkpICE9PSBmYWxzZSkge1xuICAgICAgLy8gZml4IHNlbWljb2xvbiBkdXBsaWNhdGlvbiBpc3N1ZSBmb3IgUmVhY3ROYXRpdmUgRm9ybURhdGEgaW1wbGVtZW50YXRpb25cbiAgICAgIGNvbnN0IFt0eXBlLCAuLi50b2tlbnNdID0gY29udGVudFR5cGUgPyBjb250ZW50VHlwZS5zcGxpdCgnOycpLm1hcCh0b2tlbiA9PiB0b2tlbi50cmltKCkpLmZpbHRlcihCb29sZWFuKSA6IFtdO1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShbdHlwZSB8fCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsIC4uLnRva2Vuc10uam9pbignOyAnKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG4gIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYpIHtcbiAgICB3aXRoWFNSRlRva2VuICYmIHV0aWxzJDEuaXNGdW5jdGlvbih3aXRoWFNSRlRva2VuKSAmJiAod2l0aFhTUkZUb2tlbiA9IHdpdGhYU1JGVG9rZW4obmV3Q29uZmlnKSk7XG5cbiAgICBpZiAod2l0aFhTUkZUb2tlbiB8fCAod2l0aFhTUkZUb2tlbiAhPT0gZmFsc2UgJiYgaXNVUkxTYW1lT3JpZ2luKG5ld0NvbmZpZy51cmwpKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSB4c3JmSGVhZGVyTmFtZSAmJiB4c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoeHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0KHhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59O1xuXG5jb25zdCBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnO1xuXG52YXIgeGhyQWRhcHRlciA9IGlzWEhSQWRhcHRlclN1cHBvcnRlZCAmJiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcbiAgICBsZXQgcmVxdWVzdERhdGEgPSBfY29uZmlnLmRhdGE7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKF9jb25maWcuaGVhZGVycykubm9ybWFsaXplKCk7XG4gICAgbGV0IHtyZXNwb25zZVR5cGUsIG9uVXBsb2FkUHJvZ3Jlc3MsIG9uRG93bmxvYWRQcm9ncmVzc30gPSBfY29uZmlnO1xuICAgIGxldCBvbkNhbmNlbGVkO1xuICAgIGxldCB1cGxvYWRUaHJvdHRsZWQsIGRvd25sb2FkVGhyb3R0bGVkO1xuICAgIGxldCBmbHVzaFVwbG9hZCwgZmx1c2hEb3dubG9hZDtcblxuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBmbHVzaFVwbG9hZCAmJiBmbHVzaFVwbG9hZCgpOyAvLyBmbHVzaCBldmVudHNcbiAgICAgIGZsdXNoRG93bmxvYWQgJiYgZmx1c2hEb3dubG9hZCgpOyAvLyBmbHVzaCBldmVudHNcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuXG4gICAgICBfY29uZmlnLnNpZ25hbCAmJiBfY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgIH1cblxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oX2NvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgX2NvbmZpZy51cmwsIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBfY29uZmlnLnRpbWVvdXQ7XG5cbiAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oXG4gICAgICAgICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgJiYgcmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9ICFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSAndGV4dCcgfHwgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXQgPyAndGltZW91dCBvZiAnICsgX2NvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IF9jb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgaWYgKF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgIHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQgJiYgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUobnVsbCk7XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMkMS5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLnRvSlNPTigpLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKF9jb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIV9jb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IF9jb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAob25Eb3dubG9hZFByb2dyZXNzKSB7XG4gICAgICAoW2Rvd25sb2FkVGhyb3R0bGVkLCBmbHVzaERvd25sb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uRG93bmxvYWRQcm9ncmVzcywgdHJ1ZSkpO1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGRvd25sb2FkVGhyb3R0bGVkKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmIChvblVwbG9hZFByb2dyZXNzICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICAoW3VwbG9hZFRocm90dGxlZCwgZmx1c2hVcGxvYWRdID0gcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25VcGxvYWRQcm9ncmVzcykpO1xuXG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZFRocm90dGxlZCk7XG5cbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCBmbHVzaFVwbG9hZCk7XG4gICAgfVxuXG4gICAgaWYgKF9jb25maWcuY2FuY2VsVG9rZW4gfHwgX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBvbkNhbmNlbGVkID0gY2FuY2VsID0+IHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IGNhbmNlbC50eXBlID8gbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnLCByZXF1ZXN0KSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBfY29uZmlnLmNhbmNlbFRva2VuICYmIF9jb25maWcuY2FuY2VsVG9rZW4uc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgaWYgKF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAgIF9jb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBfY29uZmlnLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3RvY29sID0gcGFyc2VQcm90b2NvbChfY29uZmlnLnVybCk7XG5cbiAgICBpZiAocHJvdG9jb2wgJiYgcGxhdGZvcm0ucHJvdG9jb2xzLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBjb25maWcpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEgfHwgbnVsbCk7XG4gIH0pO1xufTtcblxuY29uc3QgY29tcG9zZVNpZ25hbHMgPSAoc2lnbmFscywgdGltZW91dCkgPT4ge1xuICBjb25zdCB7bGVuZ3RofSA9IChzaWduYWxzID0gc2lnbmFscyA/IHNpZ25hbHMuZmlsdGVyKEJvb2xlYW4pIDogW10pO1xuXG4gIGlmICh0aW1lb3V0IHx8IGxlbmd0aCkge1xuICAgIGxldCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgbGV0IGFib3J0ZWQ7XG5cbiAgICBjb25zdCBvbmFib3J0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICBjb25zdCBlcnIgPSByZWFzb24gaW5zdGFuY2VvZiBFcnJvciA/IHJlYXNvbiA6IHRoaXMucmVhc29uO1xuICAgICAgICBjb250cm9sbGVyLmFib3J0KGVyciBpbnN0YW5jZW9mIEF4aW9zRXJyb3IgPyBlcnIgOiBuZXcgQ2FuY2VsZWRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogZXJyKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCB0aW1lciA9IHRpbWVvdXQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICBvbmFib3J0KG5ldyBBeGlvc0Vycm9yKGB0aW1lb3V0ICR7dGltZW91dH0gb2YgbXMgZXhjZWVkZWRgLCBBeGlvc0Vycm9yLkVUSU1FRE9VVCkpO1xuICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSAoKSA9PiB7XG4gICAgICBpZiAoc2lnbmFscykge1xuICAgICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgIHNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xuICAgICAgICAgIHNpZ25hbC51bnN1YnNjcmliZSA/IHNpZ25hbC51bnN1YnNjcmliZShvbmFib3J0KSA6IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2lnbmFscyA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KSk7XG5cbiAgICBjb25zdCB7c2lnbmFsfSA9IGNvbnRyb2xsZXI7XG5cbiAgICBzaWduYWwudW5zdWJzY3JpYmUgPSAoKSA9PiB1dGlscyQxLmFzYXAodW5zdWJzY3JpYmUpO1xuXG4gICAgcmV0dXJuIHNpZ25hbDtcbiAgfVxufTtcblxudmFyIGNvbXBvc2VTaWduYWxzJDEgPSBjb21wb3NlU2lnbmFscztcblxuY29uc3Qgc3RyZWFtQ2h1bmsgPSBmdW5jdGlvbiogKGNodW5rLCBjaHVua1NpemUpIHtcbiAgbGV0IGxlbiA9IGNodW5rLmJ5dGVMZW5ndGg7XG5cbiAgaWYgKCFjaHVua1NpemUgfHwgbGVuIDwgY2h1bmtTaXplKSB7XG4gICAgeWllbGQgY2h1bms7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHBvcyA9IDA7XG4gIGxldCBlbmQ7XG5cbiAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgIGVuZCA9IHBvcyArIGNodW5rU2l6ZTtcbiAgICB5aWVsZCBjaHVuay5zbGljZShwb3MsIGVuZCk7XG4gICAgcG9zID0gZW5kO1xuICB9XG59O1xuXG5jb25zdCByZWFkQnl0ZXMgPSBhc3luYyBmdW5jdGlvbiogKGl0ZXJhYmxlLCBjaHVua1NpemUpIHtcbiAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiByZWFkU3RyZWFtKGl0ZXJhYmxlKSkge1xuICAgIHlpZWxkKiBzdHJlYW1DaHVuayhjaHVuaywgY2h1bmtTaXplKTtcbiAgfVxufTtcblxuY29uc3QgcmVhZFN0cmVhbSA9IGFzeW5jIGZ1bmN0aW9uKiAoc3RyZWFtKSB7XG4gIGlmIChzdHJlYW1bU3ltYm9sLmFzeW5jSXRlcmF0b3JdKSB7XG4gICAgeWllbGQqIHN0cmVhbTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWFkZXIgPSBzdHJlYW0uZ2V0UmVhZGVyKCk7XG4gIHRyeSB7XG4gICAgZm9yICg7Oykge1xuICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCByZWFkZXIuY2FuY2VsKCk7XG4gIH1cbn07XG5cbmNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCkgPT4ge1xuICBjb25zdCBpdGVyYXRvciA9IHJlYWRCeXRlcyhzdHJlYW0sIGNodW5rU2l6ZSk7XG5cbiAgbGV0IGJ5dGVzID0gMDtcbiAgbGV0IGRvbmU7XG4gIGxldCBfb25GaW5pc2ggPSAoZSkgPT4ge1xuICAgIGlmICghZG9uZSkge1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICBvbkZpbmlzaCAmJiBvbkZpbmlzaChlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgYXN5bmMgcHVsbChjb250cm9sbGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICBfb25GaW5pc2goKTtcbiAgICAgICAgICBjb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAgICAgbGV0IGxvYWRlZEJ5dGVzID0gYnl0ZXMgKz0gbGVuO1xuICAgICAgICAgIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9vbkZpbmlzaChlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwocmVhc29uKSB7XG4gICAgICBfb25GaW5pc2gocmVhc29uKTtcbiAgICAgIHJldHVybiBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBoaWdoV2F0ZXJNYXJrOiAyXG4gIH0pXG59O1xuXG5jb25zdCBpc0ZldGNoU3VwcG9ydGVkID0gdHlwZW9mIGZldGNoID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgPSBpc0ZldGNoU3VwcG9ydGVkICYmIHR5cGVvZiBSZWFkYWJsZVN0cmVhbSA9PT0gJ2Z1bmN0aW9uJztcblxuLy8gdXNlZCBvbmx5IGluc2lkZSB0aGUgZmV0Y2ggYWRhcHRlclxuY29uc3QgZW5jb2RlVGV4dCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgKChlbmNvZGVyKSA9PiAoc3RyKSA9PiBlbmNvZGVyLmVuY29kZShzdHIpKShuZXcgVGV4dEVuY29kZXIoKSkgOlxuICAgIGFzeW5jIChzdHIpID0+IG5ldyBVaW50OEFycmF5KGF3YWl0IG5ldyBSZXNwb25zZShzdHIpLmFycmF5QnVmZmVyKCkpXG4pO1xuXG5jb25zdCB0ZXN0ID0gKGZuLCAuLi5hcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufTtcblxuY29uc3Qgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtID0gaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJiB0ZXN0KCgpID0+IHtcbiAgbGV0IGR1cGxleEFjY2Vzc2VkID0gZmFsc2U7XG5cbiAgY29uc3QgaGFzQ29udGVudFR5cGUgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBnZXQgZHVwbGV4KCkge1xuICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuICdoYWxmJztcbiAgICB9LFxuICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbn0pO1xuXG5jb25zdCBERUZBVUxUX0NIVU5LX1NJWkUgPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gPSBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gIHRlc3QoKCkgPT4gdXRpbHMkMS5pc1JlYWRhYmxlU3RyZWFtKG5ldyBSZXNwb25zZSgnJykuYm9keSkpO1xuXG5cbmNvbnN0IHJlc29sdmVycyA9IHtcbiAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSlcbn07XG5cbmlzRmV0Y2hTdXBwb3J0ZWQgJiYgKCgocmVzKSA9PiB7XG4gIFsndGV4dCcsICdhcnJheUJ1ZmZlcicsICdibG9iJywgJ2Zvcm1EYXRhJywgJ3N0cmVhbSddLmZvckVhY2godHlwZSA9PiB7XG4gICAgIXJlc29sdmVyc1t0eXBlXSAmJiAocmVzb2x2ZXJzW3R5cGVdID0gdXRpbHMkMS5pc0Z1bmN0aW9uKHJlc1t0eXBlXSkgPyAocmVzKSA9PiByZXNbdHlwZV0oKSA6XG4gICAgICAoXywgY29uZmlnKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBSZXNwb25zZSB0eXBlICcke3R5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCwgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsIGNvbmZpZyk7XG4gICAgICB9KTtcbiAgfSk7XG59KShuZXcgUmVzcG9uc2UpKTtcblxuY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gIGlmIChib2R5ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNCbG9iKGJvZHkpKSB7XG4gICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgIGNvbnN0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHksXG4gICAgfSk7XG4gICAgcmV0dXJuIChhd2FpdCBfcmVxdWVzdC5hcnJheUJ1ZmZlcigpKS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMkMS5pc0FycmF5QnVmZmVyVmlldyhib2R5KSB8fCB1dGlscyQxLmlzQXJyYXlCdWZmZXIoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMkMS5pc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gIH1cblxuICBpZih1dGlscyQxLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgcmV0dXJuIChhd2FpdCBlbmNvZGVUZXh0KGJvZHkpKS5ieXRlTGVuZ3RoO1xuICB9XG59O1xuXG5jb25zdCByZXNvbHZlQm9keUxlbmd0aCA9IGFzeW5jIChoZWFkZXJzLCBib2R5KSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IHV0aWxzJDEudG9GaW5pdGVOdW1iZXIoaGVhZGVycy5nZXRDb250ZW50TGVuZ3RoKCkpO1xuXG4gIHJldHVybiBsZW5ndGggPT0gbnVsbCA/IGdldEJvZHlMZW5ndGgoYm9keSkgOiBsZW5ndGg7XG59O1xuXG52YXIgZmV0Y2hBZGFwdGVyID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAoYXN5bmMgKGNvbmZpZykgPT4ge1xuICBsZXQge1xuICAgIHVybCxcbiAgICBtZXRob2QsXG4gICAgZGF0YSxcbiAgICBzaWduYWwsXG4gICAgY2FuY2VsVG9rZW4sXG4gICAgdGltZW91dCxcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICByZXNwb25zZVR5cGUsXG4gICAgaGVhZGVycyxcbiAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgIGZldGNoT3B0aW9uc1xuICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSA/IChyZXNwb25zZVR5cGUgKyAnJykudG9Mb3dlckNhc2UoKSA6ICd0ZXh0JztcblxuICBsZXQgY29tcG9zZWRTaWduYWwgPSBjb21wb3NlU2lnbmFscyQxKFtzaWduYWwsIGNhbmNlbFRva2VuICYmIGNhbmNlbFRva2VuLnRvQWJvcnRTaWduYWwoKV0sIHRpbWVvdXQpO1xuXG4gIGxldCByZXF1ZXN0O1xuXG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gY29tcG9zZWRTaWduYWwgJiYgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUgJiYgKCgpID0+IHtcbiAgICAgIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlKCk7XG4gIH0pO1xuXG4gIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICB0cnkge1xuICAgIGlmIChcbiAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MgJiYgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmIG1ldGhvZCAhPT0gJ2dldCcgJiYgbWV0aG9kICE9PSAnaGVhZCcgJiZcbiAgICAgIChyZXF1ZXN0Q29udGVudExlbmd0aCA9IGF3YWl0IHJlc29sdmVCb2R5TGVuZ3RoKGhlYWRlcnMsIGRhdGEpKSAhPT0gMFxuICAgICkge1xuICAgICAgbGV0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICBkdXBsZXg6IFwiaGFsZlwiXG4gICAgICB9KTtcblxuICAgICAgbGV0IGNvbnRlbnRUeXBlSGVhZGVyO1xuXG4gICAgICBpZiAodXRpbHMkMS5pc0Zvcm1EYXRhKGRhdGEpICYmIChjb250ZW50VHlwZUhlYWRlciA9IF9yZXF1ZXN0LmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkpIHtcbiAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChfcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uVXBsb2FkUHJvZ3Jlc3MpKVxuICAgICAgICApO1xuXG4gICAgICAgIGRhdGEgPSB0cmFja1N0cmVhbShfcmVxdWVzdC5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uUHJvZ3Jlc3MsIGZsdXNoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXV0aWxzJDEuaXNTdHJpbmcod2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgd2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzID8gJ2luY2x1ZGUnIDogJ29taXQnO1xuICAgIH1cblxuICAgIC8vIENsb3VkZmxhcmUgV29ya2VycyB0aHJvd3Mgd2hlbiBjcmVkZW50aWFscyBhcmUgZGVmaW5lZFxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vY2xvdWRmbGFyZS93b3JrZXJkL2lzc3Vlcy85MDJcbiAgICBjb25zdCBpc0NyZWRlbnRpYWxzU3VwcG9ydGVkID0gXCJjcmVkZW50aWFsc1wiIGluIFJlcXVlc3QucHJvdG90eXBlO1xuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICBtZXRob2Q6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgaGVhZGVyczogaGVhZGVycy5ub3JtYWxpemUoKS50b0pTT04oKSxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICBkdXBsZXg6IFwiaGFsZlwiLFxuICAgICAgY3JlZGVudGlhbHM6IGlzQ3JlZGVudGlhbHNTdXBwb3J0ZWQgPyB3aXRoQ3JlZGVudGlhbHMgOiB1bmRlZmluZWRcbiAgICB9KTtcblxuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3QpO1xuXG4gICAgY29uc3QgaXNTdHJlYW1SZXNwb25zZSA9IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKHJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScgfHwgcmVzcG9uc2VUeXBlID09PSAncmVzcG9uc2UnKTtcblxuICAgIGlmIChzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChvbkRvd25sb2FkUHJvZ3Jlc3MgfHwgKGlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUpKSkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG4gICAgICBbJ3N0YXR1cycsICdzdGF0dXNUZXh0JywgJ2hlYWRlcnMnXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBvcHRpb25zW3Byb3BdID0gcmVzcG9uc2VbcHJvcF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcmVzcG9uc2VDb250ZW50TGVuZ3RoID0gdXRpbHMkMS50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG5cbiAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBvbkRvd25sb2FkUHJvZ3Jlc3MgJiYgcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgcmVzcG9uc2VDb250ZW50TGVuZ3RoLFxuICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvbkRvd25sb2FkUHJvZ3Jlc3MpLCB0cnVlKVxuICAgICAgKSB8fCBbXTtcblxuICAgICAgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoXG4gICAgICAgIHRyYWNrU3RyZWFtKHJlc3BvbnNlLmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25Qcm9ncmVzcywgKCkgPT4ge1xuICAgICAgICAgIGZsdXNoICYmIGZsdXNoKCk7XG4gICAgICAgICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSksXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlIHx8ICd0ZXh0JztcblxuICAgIGxldCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNvbHZlcnNbdXRpbHMkMS5maW5kS2V5KHJlc29sdmVycywgcmVzcG9uc2VUeXBlKSB8fCAndGV4dCddKHJlc3BvbnNlLCBjb25maWcpO1xuXG4gICAgIWlzU3RyZWFtUmVzcG9uc2UgJiYgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgaGVhZGVyczogQXhpb3NIZWFkZXJzJDEuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdW5zdWJzY3JpYmUgJiYgdW5zdWJzY3JpYmUoKTtcblxuICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9mZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCksXG4gICAgICAgIHtcbiAgICAgICAgICBjYXVzZTogZXJyLmNhdXNlIHx8IGVyclxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QpO1xuICB9XG59KTtcblxuY29uc3Qga25vd25BZGFwdGVycyA9IHtcbiAgaHR0cDogaHR0cEFkYXB0ZXIsXG4gIHhocjogeGhyQWRhcHRlcixcbiAgZmV0Y2g6IGZldGNoQWRhcHRlclxufTtcblxudXRpbHMkMS5mb3JFYWNoKGtub3duQWRhcHRlcnMsIChmbiwgdmFsdWUpID0+IHtcbiAgaWYgKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ25hbWUnLCB7dmFsdWV9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7dmFsdWV9KTtcbiAgfVxufSk7XG5cbmNvbnN0IHJlbmRlclJlYXNvbiA9IChyZWFzb24pID0+IGAtICR7cmVhc29ufWA7XG5cbmNvbnN0IGlzUmVzb2x2ZWRIYW5kbGUgPSAoYWRhcHRlcikgPT4gdXRpbHMkMS5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbnZhciBhZGFwdGVycyA9IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscyQxLmlzQXJyYXkoYWRhcHRlcnMpID8gYWRhcHRlcnMgOiBbYWRhcHRlcnNdO1xuXG4gICAgY29uc3Qge2xlbmd0aH0gPSBhZGFwdGVycztcbiAgICBsZXQgbmFtZU9yQWRhcHRlcjtcbiAgICBsZXQgYWRhcHRlcjtcblxuICAgIGNvbnN0IHJlamVjdGVkUmVhc29ucyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgICAgbGV0IGlkO1xuXG4gICAgICBhZGFwdGVyID0gbmFtZU9yQWRhcHRlcjtcblxuICAgICAgaWYgKCFpc1Jlc29sdmVkSGFuZGxlKG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICAgIGFkYXB0ZXIgPSBrbm93bkFkYXB0ZXJzWyhpZCA9IFN0cmluZyhuYW1lT3JBZGFwdGVyKSkudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKGFkYXB0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBVbmtub3duIGFkYXB0ZXIgJyR7aWR9J2ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGFwdGVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZWplY3RlZFJlYXNvbnNbaWQgfHwgJyMnICsgaV0gPSBhZGFwdGVyO1xuICAgIH1cblxuICAgIGlmICghYWRhcHRlcikge1xuXG4gICAgICBjb25zdCByZWFzb25zID0gT2JqZWN0LmVudHJpZXMocmVqZWN0ZWRSZWFzb25zKVxuICAgICAgICAubWFwKChbaWQsIHN0YXRlXSkgPT4gYGFkYXB0ZXIgJHtpZH0gYCArXG4gICAgICAgICAgKHN0YXRlID09PSBmYWxzZSA/ICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudCcgOiAnaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGQnKVxuICAgICAgICApO1xuXG4gICAgICBsZXQgcyA9IGxlbmd0aCA/XG4gICAgICAgIChyZWFzb25zLmxlbmd0aCA+IDEgPyAnc2luY2UgOlxcbicgKyByZWFzb25zLm1hcChyZW5kZXJSZWFzb24pLmpvaW4oJ1xcbicpIDogJyAnICsgcmVuZGVyUmVhc29uKHJlYXNvbnNbMF0pKSA6XG4gICAgICAgICdhcyBubyBhZGFwdGVyIHNwZWNpZmllZCc7XG5cbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gc3VpdGFibGUgYWRhcHRlciB0byBkaXNwYXRjaCB0aGUgcmVxdWVzdCBgICsgcyxcbiAgICAgICAgJ0VSUl9OT1RfU1VQUE9SVCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkYXB0ZXI7XG4gIH0sXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzXG59O1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbmZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShjb25maWcuaGVhZGVycyk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzJDEuYWRhcHRlcik7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICBjb25maWcsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICByZXNwb25zZVxuICAgICk7XG5cbiAgICByZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShyZXNwb25zZS5oZWFkZXJzKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59XG5cbmNvbnN0IFZFUlNJT04gPSBcIjEuNy45XCI7XG5cbmNvbnN0IHZhbGlkYXRvcnMkMSA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9ycyQxW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxuY29uc3QgZGVwcmVjYXRlZFdhcm5pbmdzID0ge307XG5cbi8qKlxuICogVHJhbnNpdGlvbmFsIG9wdGlvbiB2YWxpZGF0b3JcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMkMS50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG52YWxpZGF0b3JzJDEuc3BlbGxpbmcgPSBmdW5jdGlvbiBzcGVsbGluZyhjb3JyZWN0U3BlbGxpbmcpIHtcbiAgcmV0dXJuICh2YWx1ZSwgb3B0KSA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oYCR7b3B0fSBpcyBsaWtlbHkgYSBtaXNzcGVsbGluZyBvZiAke2NvcnJlY3RTcGVsbGluZ31gKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0J3MgcHJvcGVydGllcyB0eXBlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0T3B0aW9ucyhvcHRpb25zLCBzY2hlbWEsIGFsbG93VW5rbm93bikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgY29uc3Qgb3B0ID0ga2V5c1tpXTtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBzY2hlbWFbb3B0XTtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG52YXIgdmFsaWRhdG9yID0ge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzOiB2YWxpZGF0b3JzJDFcbn07XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIkMSgpLFxuICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIkMSgpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBjb25maWdPclVybCBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gICAqIEBwYXJhbSB7P09iamVjdH0gY29uZmlnXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAgICovXG4gIGFzeW5jIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBsZXQgZHVtbXkgPSB7fTtcblxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15KSA6IChkdW1teSA9IG5ldyBFcnJvcigpKTtcblxuICAgICAgICAvLyBzbGljZSBvZmYgdGhlIEVycm9yOiAuLi4gbGluZVxuICAgICAgICBjb25zdCBzdGFjayA9IGR1bW15LnN0YWNrID8gZHVtbXkuc3RhY2sucmVwbGFjZSgvXi4rXFxuLywgJycpIDogJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFlcnIuc3RhY2spIHtcbiAgICAgICAgICAgIGVyci5zdGFjayA9IHN0YWNrO1xuICAgICAgICAgICAgLy8gbWF0Y2ggd2l0aG91dCB0aGUgMiB0b3Agc3RhY2sgbGluZXNcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YWNrICYmICFTdHJpbmcoZXJyLnN0YWNrKS5lbmRzV2l0aChzdGFjay5yZXBsYWNlKC9eLitcXG4uK1xcbi8sICcnKSkpIHtcbiAgICAgICAgICAgIGVyci5zdGFjayArPSAnXFxuJyArIHN0YWNrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlnbm9yZSB0aGUgY2FzZSB3aGVyZSBcInN0YWNrXCIgaXMgYW4gdW4td3JpdGFibGUgcHJvcGVydHlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcgPSBjb25maWdPclVybCB8fCB7fTtcbiAgICB9XG5cbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgY29uc3Qge3RyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVyc30gPSBjb25maWc7XG5cbiAgICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xuICAgICAgICBzaWxlbnRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMkMS5pc0Z1bmN0aW9uKHBhcmFtc1NlcmlhbGl6ZXIpKSB7XG4gICAgICAgIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyID0ge1xuICAgICAgICAgIHNlcmlhbGl6ZTogcGFyYW1zU2VyaWFsaXplclxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMocGFyYW1zU2VyaWFsaXplciwge1xuICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICBzZXJpYWxpemU6IHZhbGlkYXRvcnMuZnVuY3Rpb25cbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMoY29uZmlnLCB7XG4gICAgICBiYXNlVXJsOiB2YWxpZGF0b3JzLnNwZWxsaW5nKCdiYXNlVVJMJyksXG4gICAgICB3aXRoWHNyZlRva2VuOiB2YWxpZGF0b3JzLnNwZWxsaW5nKCd3aXRoWFNSRlRva2VuJylcbiAgICB9LCB0cnVlKTtcblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscyQxLm1lcmdlKFxuICAgICAgaGVhZGVycy5jb21tb24sXG4gICAgICBoZWFkZXJzW2NvbmZpZy5tZXRob2RdXG4gICAgKTtcblxuICAgIGhlYWRlcnMgJiYgdXRpbHMkMS5mb3JFYWNoKFxuICAgICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgICAobWV0aG9kKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW21ldGhvZF07XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbjtcblxuICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgICBjb25zdCBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QuYmluZCh0aGlzKSwgdW5kZWZpbmVkXTtcbiAgICAgIGNoYWluLnVuc2hpZnQuYXBwbHkoY2hhaW4sIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2guYXBwbHkoY2hhaW4sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGNvbnN0IG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIGNvbnN0IG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQobmV3Q29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIG9uUmVqZWN0ZWQuY2FsbCh0aGlzLCBlcnJvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0LmNhbGwodGhpcywgbmV3Q29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBsZW4gPSByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldFVyaShjb25maWcpIHtcbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscyQxLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMkMS5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBpc0Zvcm0gPyB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgICB9IDoge30sXG4gICAgICAgIHVybCxcbiAgICAgICAgZGF0YVxuICAgICAgfSkpO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xufSk7XG5cbnZhciBBeGlvcyQxID0gQXhpb3M7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMge0NhbmNlbFRva2VufVxuICovXG5jbGFzcyBDYW5jZWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTtcblxuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IHRoaXM7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuKGNhbmNlbCA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gb25mdWxmaWxsZWQgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICAgKi9cbiAgdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIHRocm93IHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgdG9BYm9ydFNpZ25hbCgpIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgY29uc3QgYWJvcnQgPSAoZXJyKSA9PiB7XG4gICAgICBjb250cm9sbGVyLmFib3J0KGVycik7XG4gICAgfTtcblxuICAgIHRoaXMuc3Vic2NyaWJlKGFib3J0KTtcblxuICAgIGNvbnRyb2xsZXIuc2lnbmFsLnVuc3Vic2NyaWJlID0gKCkgPT4gdGhpcy51bnN1YnNjcmliZShhYm9ydCk7XG5cbiAgICByZXR1cm4gY29udHJvbGxlci5zaWduYWw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICAgKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICAgKi9cbiAgc3RhdGljIHNvdXJjZSgpIHtcbiAgICBsZXQgY2FuY2VsO1xuICAgIGNvbnN0IHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICAgIGNhbmNlbCA9IGM7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuLFxuICAgICAgY2FuY2VsXG4gICAgfTtcbiAgfVxufVxuXG52YXIgQ2FuY2VsVG9rZW4kMSA9IENhbmNlbFRva2VuO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuIHV0aWxzJDEuaXNPYmplY3QocGF5bG9hZCkgJiYgKHBheWxvYWQuaXNBeGlvc0Vycm9yID09PSB0cnVlKTtcbn1cblxuY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbnZhciBIdHRwU3RhdHVzQ29kZSQxID0gSHR0cFN0YXR1c0NvZGU7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyQxKGRlZmF1bHRDb25maWcpO1xuICBjb25zdCBpbnN0YW5jZSA9IGJpbmQoQXhpb3MkMS5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMkMS5leHRlbmQoaW5zdGFuY2UsIEF4aW9zJDEucHJvdG90eXBlLCBjb250ZXh0LCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscyQxLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCwgbnVsbCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG4gIGluc3RhbmNlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICAgIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhkZWZhdWx0Q29uZmlnLCBpbnN0YW5jZUNvbmZpZykpO1xuICB9O1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG5jb25zdCBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzJDEpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3MkMTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWxlZEVycm9yID0gQ2FuY2VsZWRFcnJvcjtcbmF4aW9zLkNhbmNlbFRva2VuID0gQ2FuY2VsVG9rZW4kMTtcbmF4aW9zLmlzQ2FuY2VsID0gaXNDYW5jZWw7XG5heGlvcy5WRVJTSU9OID0gVkVSU0lPTjtcbmF4aW9zLnRvRm9ybURhdGEgPSB0b0Zvcm1EYXRhO1xuXG4vLyBFeHBvc2UgQXhpb3NFcnJvciBjbGFzc1xuYXhpb3MuQXhpb3NFcnJvciA9IEF4aW9zRXJyb3I7XG5cbi8vIGFsaWFzIGZvciBDYW5jZWxlZEVycm9yIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5heGlvcy5DYW5jZWwgPSBheGlvcy5DYW5jZWxlZEVycm9yO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG5heGlvcy5zcHJlYWQgPSBzcHJlYWQ7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IGlzQXhpb3NFcnJvcjtcblxuLy8gRXhwb3NlIG1lcmdlQ29uZmlnXG5heGlvcy5tZXJnZUNvbmZpZyA9IG1lcmdlQ29uZmlnO1xuXG5heGlvcy5BeGlvc0hlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMTtcblxuYXhpb3MuZm9ybVRvSlNPTiA9IHRoaW5nID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzJDEuaXNIVE1MRm9ybSh0aGluZykgPyBuZXcgRm9ybURhdGEodGhpbmcpIDogdGhpbmcpO1xuXG5heGlvcy5nZXRBZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcjtcblxuYXhpb3MuSHR0cFN0YXR1c0NvZGUgPSBIdHRwU3RhdHVzQ29kZSQxO1xuXG5heGlvcy5kZWZhdWx0ID0gYXhpb3M7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1heGlvcy5janMubWFwXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2xpYi9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJEb21haW4iLCJkYXRhIiwicmVjZWl2aW5nIiwic2VuZGluZyIsIm5hbWUiLCJyZXF1aXJlX3RscyIsInNraXBfdmVyaWZpY2F0aW9uIiwic3RhdGUiLCJ3aWxkY2FyZCIsInNwYW1fYWN0aW9uIiwiY3JlYXRlZF9hdCIsIkRhdGUiLCJzbXRwX3Bhc3N3b3JkIiwic210cF9sb2dpbiIsInR5cGUiLCJyZWNlaXZpbmdfZG5zX3JlY29yZHMiLCJzZW5kaW5nX2Ruc19yZWNvcmRzIiwiaWQiLCJpc19kaXNhYmxlZCIsIndlYl9wcmVmaXgiLCJ3ZWJfc2NoZW1lIiwidXNlX2F1dG9tYXRpY19zZW5kZXJfc2VjdXJpdHkiLCJkeW5hbWljS2V5cyIsImR5bmFtaWNQcm9wZXJ0aWVzIiwicmVkdWNlIiwiYWNjIiwicHJvcGVydHlOYW1lIiwicHJvcCIsIk9iamVjdCIsImFzc2lnbiIsInVybF9qb2luXzEiLCJfX2ltcG9ydERlZmF1bHQiLCJyZXF1aXJlIiwiRXJyb3JfMSIsImRvbWFpbl8xIiwiRG9tYWluc0NsaWVudCIsInJlcXVlc3QiLCJkb21haW5DcmVkZW50aWFsc0NsaWVudCIsImRvbWFpblRlbXBsYXRlc0NsaWVudCIsImRvbWFpblRhZ3NDbGllbnQiLCJkb21haW5UcmFja2luZyIsImxvZ2dlciIsImNvbnNvbGUiLCJkb21haW5DcmVkZW50aWFscyIsImRvbWFpblRlbXBsYXRlcyIsImRvbWFpblRhZ3MiLCJwcm90b3R5cGUiLCJfaGFuZGxlQm9vbFZhbHVlcyIsInByb3BzRm9yUmVwbGFjZW1lbnQiLCJyZXBsYWNlZFByb3BzIiwia2V5cyIsImtleSIsInZhbHVlIiwidG9TdHJpbmciLCJfX2Fzc2lnbiIsIl9wYXJzZU1lc3NhZ2UiLCJyZXNwb25zZSIsImJvZHkiLCJwYXJzZURvbWFpbkxpc3QiLCJpdGVtcyIsIm1hcCIsIml0ZW0iLCJkZWZhdWx0IiwiX3BhcnNlRG9tYWluIiwiZG9tYWluIiwibGlzdCIsInF1ZXJ5IiwiX3RoaXMiLCJnZXQiLCJ0aGVuIiwicmVzIiwicHJlcGFyZWRRdWVyeSIsIl9hIiwiZXh0ZW5kZWQiLCJfYiIsIndpdGhfZG5zIiwiY29uY2F0IiwiY3JlYXRlIiwicG9zdE9iaiIsInBvc3RXaXRoRkQiLCJ1cGRhdGUiLCJwdXREYXRhIiwicHV0V2l0aEZEIiwidmVyaWZ5IiwicHV0IiwiZGVzdHJveSIsImRlbGV0ZSIsImdldENvbm5lY3Rpb24iLCJ1cGRhdGVDb25uZWN0aW9uIiwiZ2V0VHJhY2tpbmciLCJ3YXJuIiwidXBkYXRlVHJhY2tpbmciLCJnZXRJcHMiLCJhc3NpZ25JcCIsImlwIiwiZGVsZXRlSXAiLCJsaW5rSXBQb29sIiwicG9vbElkIiwicG9vbF9pZCIsInVubGlua0lwUG9sbCIsInJlcGxhY2VtZW50Iiwic2VhcmNoUGFyYW1zIiwiZ2V0VXNlckRhdGFFcnJvciIsInVwZGF0ZURLSU1BdXRob3JpdHkiLCJzZWxmIiwidXBkYXRlREtJTVNlbGVjdG9yIiwiZGtpbVNlbGVjdG9yIiwic2VudCIsInN0YXR1cyIsIm1lc3NhZ2UiLCJ1cGRhdGVXZWJQcmVmaXgiLCJ3ZWJQcmVmaXgiLCJEb21haW5DcmVkZW50aWFsc0NsaWVudCIsImJhc2VSb3V0ZSIsIl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdCIsInRvdGFsQ291bnQiLCJ0b3RhbF9jb3VudCIsIl9wYXJzZU1lc3NhZ2VSZXNwb25zZSIsInJlc3VsdCIsIl9wYXJzZURlbGV0ZWRSZXNwb25zZSIsInNwZWMiLCJjcmVkZW50aWFsc0xvZ2luIiwiTmF2aWdhdGlvblRocnVQYWdlc18xIiwiRG9tYWluVGFnIiwidGFnSW5mbyIsInRhZyIsImRlc2NyaXB0aW9uIiwiZXhwb3J0cyIsIkRvbWFpblRhZ1N0YXRpc3RpYyIsInRhZ1N0YXRpc3RpY0luZm8iLCJzdGFydCIsImVuZCIsInJlc29sdXRpb24iLCJzdGF0cyIsInN0YXQiLCJ0aW1lIiwiRG9tYWluVGFnc0NsaWVudCIsIl9zdXBlciIsIl9fZXh0ZW5kcyIsImNhbGwiLCJwYXJzZUxpc3QiLCJwYWdlcyIsInBhcnNlUGFnZUxpbmtzIiwiX3BhcnNlVGFnU3RhdGlzdGljIiwicmVxdWVzdExpc3RXaXRoUGFnZXMiLCJzdGF0aXN0aWMiLCJjb3VudHJpZXMiLCJwcm92aWRlcnMiLCJkZXZpY2VzIiwiRG9tYWluVGVtcGxhdGVJdGVtIiwiZG9tYWluVGVtcGxhdGVGcm9tQVBJIiwiY3JlYXRlZEF0IiwiY3JlYXRlZEJ5IiwidmVyc2lvbiIsInZlcnNpb25zIiwibGVuZ3RoIiwiRG9tYWluVGVtcGxhdGVzQ2xpZW50IiwicGFyc2VDcmVhdGlvblJlc3BvbnNlIiwidGVtcGxhdGUiLCJwYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlIiwicGFyc2VNdXRhdGlvblJlc3BvbnNlIiwidGVtcGxhdGVOYW1lIiwicGFyc2VOb3RpZmljYXRpb25SZXNwb25zZSIsInBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UiLCJ0ZW1wbGF0ZVZlcnNpb24iLCJkIiwicGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyIsImRlc3Ryb3lBbGwiLCJsaXN0VmVyc2lvbnMiLCJnZXRWZXJzaW9uIiwiY3JlYXRlVmVyc2lvbiIsInVwZGF0ZVZlcnNpb24iLCJkZXN0cm95VmVyc2lvbiIsIkRvbWFpblRyYWNraW5nQ2xpZW50IiwiX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyIsInRyYWNraW5nIiwiX3BhcnNlVHJhY2tpbmdVcGRhdGUiLCJfaXNPcGVuVHJhY2tpbmdJbmZvV2l0UGxhY2UiLCJvYmoiLCJyZXNwb25zZVN0YXR1c0NvZGUiLCJnZW5lcmF0ZSIsInBvc3QiLCJyZWdlbmVyYXRlIiwicHJlcGFyZWREYXRhIiwiYWN0aXZlIiwicGxhY2VfYXRfdGhlX3RvcCIsIkV2ZW50Q2xpZW50IiwiSXBQb29sc0NsaWVudCIsInBhcnNlSXBQb29sc1Jlc3BvbnNlIiwicGF0Y2hXaXRoRkQiLCJJcHNDbGllbnQiLCJwYXJzZUlwc1Jlc3BvbnNlIiwiSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCIsInBhdGgiLCJhdHRyaWJ1dGVOYW1lIiwiSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCIsInN1cHBvcnRlZF9maWx0ZXJzIiwiSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCIsImF0dHJpYnV0ZXMiLCJmaWx0ZXJzIiwic2hhcmluZyIsImNvbnZlcnREYXRlVG9VVEMiLCJpbnB1dERhdGUiLCJ0b0lTT1N0cmluZyIsInByZXBhcmVRdWVyeURhdGEiLCJxdWVyeURhdGEiLCJwcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0IiwiYm94IiwiaGFuZGxlZFNlZWRMaXN0RGF0ZXMiLCJ1cGRhdGVkX2F0Iiwic2hhcmluZ19leHBpcmVzX2F0IiwiQm94IiwibGFzdF9yZXN1bHRfYXQiLCJJRCIsImluYm94UGxhY2VtZW50c1Jlc3VsdCIsIklkIiwiaW5ib3hQbGFjZW1lbnRSZXN1bHQiLCJnZXRSZXN1bHRCeVNoYXJlSWQiLCJzaGFyZUlkIiwiSVBSU2hhcmluZ0NsaWVudCIsInByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHRTaGFyaW5nIiwiZXhwaXJlc19hdCIsImVuYWJsZWQiLCJTZWVkc0xpc3RzQ2xpZW50IiwicHJlcGFyZVJlc3VsdCIsInNlZWRMaXN0IiwicHJlcGFyZVNlZWRMaXN0Iiwic2VlZHMiLCJTZWVkcyIsInNlZWRJdGVtIiwic2VlZCIsImhhbmRsZWRTZWVkRGF0ZXMiLCJtYXhfZW1haWxfY291bnRfaGl0X2F0IiwibGFzdF9zZW50X3RvX2F0IiwibGFzdF9kZWxpdmVyZWRfYXQiLCJ1cGRhdGVkU2VlZHNMaXN0Iiwic2VlZGxpc3QiLCJJbmJveFBsYWNlbWVudHNDbGllbnQiLCJzZWVkc0xpc3RzQ2xpZW50IiwicmVzdWx0cyIsInNlZWRzTGlzdHMiLCJydW5UZXN0IiwiSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IiwiaGFuZGxlZFByb3ZpZGVyRGF0ZXMiLCJSZXF1ZXN0XzEiLCJkb21haW5zQ2xpZW50XzEiLCJFdmVudHNfMSIsIlN0YXRzQ2xpZW50XzEiLCJTdXBwcmVzc2lvbnNDbGllbnRfMSIsIldlYmhvb2tzXzEiLCJNZXNzYWdlc18xIiwiUm91dGVzXzEiLCJ2YWxpZGF0ZV8xIiwiSVBzXzEiLCJJUFBvb2xzXzEiLCJtYWlsaW5nTGlzdHNfMSIsIm1haWxMaXN0TWVtYmVyc18xIiwiZG9tYWluc0NyZWRlbnRpYWxzXzEiLCJtdWx0aXBsZVZhbGlkYXRpb25fMSIsImRvbWFpbnNUZW1wbGF0ZXNfMSIsImRvbWFpbnNUYWdzXzEiLCJTdWJhY2NvdW50c18xIiwiU2VlZHNMaXN0c0NsaWVudF8xIiwiaW5ib3hQbGFjZW1lbnRzXzEiLCJJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50XzEiLCJBdHRyaWJ1dGVzQ2xpZW50XzEiLCJGaWx0ZXJzQ2xpZW50XzEiLCJJbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudF8xIiwiSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzXzEiLCJNZXRyaWNzQ2xpZW50XzEiLCJkb21haW5zVHJhY2tpbmdfMSIsIk1haWxndW5DbGllbnQiLCJvcHRpb25zIiwiZm9ybURhdGEiLCJjb25maWciLCJ1cmwiLCJ1c2VybmFtZSIsIkVycm9yIiwibWFpbExpc3RzTWVtYmVycyIsImRvbWFpblRyYWNraW5nQ2xpZW50IiwibXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IiwiSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQiLCJzZWVkc0xpc3RzQXR0cmlidXRlcyIsInJlc3VsdHNBdHRyaWJ1dGVzQ2xpZW50Iiwic2VlZHNMaXN0c0ZpbHRlcnNDbGllbnQiLCJyZXN1bHRzRmlsdGVyc0NsaWVudCIsImluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQiLCJpbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQiLCJkb21haW5zIiwid2ViaG9va3MiLCJldmVudHMiLCJtZXRyaWNzIiwic3VwcHJlc3Npb25zIiwibWVzc2FnZXMiLCJyb3V0ZXMiLCJpcHMiLCJpcF9wb29scyIsImxpc3RzIiwidmFsaWRhdGUiLCJzdWJhY2NvdW50cyIsImluYm94UGxhY2VtZW50cyIsInNldFN1YmFjY291bnQiLCJzdWJhY2NvdW50SWQiLCJzZXRTdWJhY2NvdW50SGVhZGVyIiwicmVzZXRTdWJhY2NvdW50IiwicmVzZXRTdWJhY2NvdW50SGVhZGVyIiwiTWFpbExpc3RzTWVtYmVycyIsImNoZWNrQW5kVXBkYXRlRGF0YSIsIm5ld0RhdGEiLCJ2YXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsInN1YnNjcmliZWQiLCJsaXN0TWVtYmVycyIsIm1haWxMaXN0QWRkcmVzcyIsImdldE1lbWJlciIsIm1haWxMaXN0TWVtYmVyQWRkcmVzcyIsIm1lbWJlciIsImNyZWF0ZU1lbWJlciIsInJlcURhdGEiLCJjcmVhdGVNZW1iZXJzIiwibWVtYmVycyIsIkFycmF5IiwiaXNBcnJheSIsInVwc2VydCIsInVwZGF0ZU1lbWJlciIsImRlc3Ryb3lNZW1iZXIiLCJNYWlsaW5nTGlzdHNDbGllbnQiLCJwYXJzZVZhbGlkYXRpb25SZXN1bHQiLCJ2YWxpZGF0aW9uUmVzdWx0IiwiY2FuY2VsVmFsaWRhdGlvbiIsIk1lc3NhZ2VzQ2xpZW50IiwicHJlcGFyZUJvb2xlYW5WYWx1ZXMiLCJ5ZXNOb1Byb3BlcnRpZXMiLCJTZXQiLCJoYXMiLCJfcGFyc2VSZXNwb25zZSIsIm1vZGlmaWVkRGF0YSIsIk1ldHJpY3NDbGllbnQiLCJ0b1VUQ1N0cmluZyIsInByZXBhcmVRdWVyeSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJxU3RhcnQiLCJxRW5kIiwiaGFuZGxlUmVzcG9uc2UiLCJyZXNCb2R5IiwicGFyc2UiLCJnZXRBY2NvdW50IiwiZ2V0QWNjb3VudFVzYWdlIiwiUm91dGVzQ2xpZW50Iiwicm91dGUiLCJTdGF0c0NvbnRhaW5lcl8xIiwiU3RhdHNDbGllbnQiLCJwcmVwYXJlU2VhcmNoUGFyYW1zIiwiZW50cmllcyIsImFycmF5V2l0aFBhaXJzIiwiY3VycmVudFBhaXIiLCJyZXBlYXRlZFByb3BlcnR5IiwiX19zcHJlYWRBcnJheSIsInB1c2giLCJwYXJzZVN0YXRzIiwiZ2V0RG9tYWluIiwiU3RhdHNDb250YWluZXIiLCJTdWJhY2NvdW50c0NsaWVudCIsImVuYWJsZSIsImRpc2FibGUiLCJTVUJBQ0NPVU5UX0hFQURFUiIsIkVudW1zXzEiLCJTdXBwcmVzc2lvbl8xIiwiQm91bmNlIiwiU3VwcHJlc3Npb25Nb2RlbHMiLCJCT1VOQ0VTIiwiYWRkcmVzcyIsImNvZGUiLCJlcnJvciIsIkNvbXBsYWludCIsIkNPTVBMQUlOVFMiLCJTdXBwcmVzc2lvbiIsIkJvdW5jZV8xIiwiQ29tcGxhaW50XzEiLCJVbnN1YnNjcmliZV8xIiwiV2hpdGVMaXN0XzEiLCJjcmVhdGVPcHRpb25zIiwiaGVhZGVycyIsIlN1cHByZXNzaW9uQ2xpZW50IiwibW9kZWxzIiwiYm91bmNlcyIsImNvbXBsYWludHMiLCJ1bnN1YnNjcmliZXMiLCJ3aGl0ZWxpc3RzIiwiTW9kZWwiLCJfcGFyc2VJdGVtIiwiY3JlYXRlV2hpdGVMaXN0IiwiaXNEYXRhQXJyYXkiLCJwcmVwYXJlUmVzcG9uc2UiLCJjcmVhdGVVbnN1YnNjcmliZSIsImlzQ29udGFpbnNUYWciLCJzb21lIiwidW5zdWJzY3JpYmUiLCJ0YWdzIiwiZ2V0TW9kZWwiLCJtb2RlbCIsImVuY29kZVVSSUNvbXBvbmVudCIsInBvc3REYXRhIiwibW9kdWxlIiwiVW5zdWJzY3JpYmUiLCJVTlNVQlNDUklCRVMiLCJXaGl0ZUxpc3QiLCJXSElURUxJU1RTIiwicmVhc29uIiwiQXR0YWNobWVudHNIYW5kbGVyXzEiLCJNdWx0aXBsZVZhbGlkYXRpb25Kb2IiLCJxdWFudGl0eSIsInJlY29yZHNQcm9jZXNzZWQiLCJyZWNvcmRzX3Byb2Nlc3NlZCIsImRvd25sb2FkX3VybCIsImRvd25sb2FkVXJsIiwiY3N2IiwianNvbiIsInN1bW1hcnkiLCJjYXRjaEFsbCIsImNhdGNoX2FsbCIsImRlbGl2ZXJhYmxlIiwiZG9Ob3RTZW5kIiwiZG9fbm90X3NlbmQiLCJ1bmRlbGl2ZXJhYmxlIiwidW5rbm93biIsInJpc2siLCJoaWdoIiwibG93IiwibWVkaXVtIiwiTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IiwiYXR0YWNobWVudHNIYW5kbGVyIiwiam9icyIsImpvYiIsInRvdGFsIiwibGlzdElkIiwiY29udmVydFRvRXhwZWN0ZWRTaGFwZSIsIm11bHRpcGxlVmFsaWRhdGlvbkRhdGEiLCJpc0J1ZmZlciIsImZpbGUiLCJtdWx0aXBsZVZhbGlkYXRpb25GaWxlIiwiaXNTdHJlYW0iLCJWYWxpZGF0ZUNsaWVudCIsIm11bHRpcGxlVmFsaWRhdGlvbiIsIldlYmhvb2siLCJ1cmxzIiwiV2ViaG9va3NDbGllbnQiLCJfcGFyc2VXZWJob29rTGlzdCIsIl9wYXJzZVdlYmhvb2tXaXRoSUQiLCJ3ZWJob29rUmVzcG9uc2UiLCJ3ZWJob29rIiwidW5kZWZpbmVkIiwiX3BhcnNlV2ViaG9va1Rlc3QiLCJ0ZXN0IiwidXJsVmFsdWVzIiwiQmxvYkZyb21TdHJlYW0iLCJzdHJlYW0iLCJzaXplIiwiX3N0cmVhbSIsImRlZmluZVByb3BlcnR5IiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJBdHRhY2htZW50c0hhbmRsZXIiLCJnZXRBdHRhY2htZW50T3B0aW9ucyIsImZpbGVuYW1lIiwiY29udGVudFR5cGUiLCJrbm93bkxlbmd0aCIsImdldEZpbGVJbmZvIiwiZ2V0Q3VzdG9tRmlsZUluZm8iLCJnZXRCdWZmZXJJbmZvIiwiYnVmZmVyIiwiYnl0ZUxlbmd0aCIsInBpcGUiLCJpc0N1c3RvbUZpbGUiLCJpc0Jyb3dzZXJGaWxlIiwiQmxvYiIsIkJ1ZmZlciIsImdldEF0dGFjaG1lbnRJbmZvIiwiYXR0YWNobWVudCIsImlzU3RyaW5nIiwiY29udmVydFRvRkRleHBlY3RlZFNoYXBlIiwidXNlclByb3ZpZGVkVmFsdWUiLCJnZXRCbG9iRnJvbVN0cmVhbSIsIkFQSUVycm9yIiwic3RhdHVzVGV4dCIsImJvZHlNZXNzYWdlIiwic3RhY2siLCJkZXRhaWxzIiwiRm9ybURhdGFCdWlsZGVyIiwiRm9ybURhdGFDb25zdHJ1Y3RvciIsImZpbGVLZXlzIiwiY3JlYXRlRm9ybURhdGEiLCJmaWx0ZXIiLCJmb3JtRGF0YUFjYyIsImluY2x1ZGVzIiwiYXR0YWNobWVudFZhbHVlIiwiaXNNZXNzYWdlQXR0YWNobWVudCIsImFkZEZpbGVzVG9GRCIsIm1lc3NhZ2VWYWx1ZSIsImlzTUlNRSIsImFkZE1pbWVEYXRhVG9GRCIsImFkZENvbW1vblByb3BlcnR5VG9GRCIsImZvcm1EYXRhSW5zdGFuY2UiLCJhcHBlbmQiLCJpc0Zvcm1EYXRhUGFja2FnZSIsIm5vZGVGb3JtRGF0YSIsImJyb3dzZXJGb3JtRGF0YSIsImJsb2JJbnN0YW5jZSIsIlJlYWRhYmxlU3RyZWFtIiwiZ2V0SGVhZGVycyIsIkZpbGUiLCJldmVyeSIsImFwcGVuZEZpbGVUb0ZEIiwib3JpZ2luYWxLZXkiLCJvYmpEYXRhIiwiZmQiLCJmcm9tIiwiYmxvYiIsInNldCIsImZvckVhY2giLCJhZGRWYWx1ZUJhc2VkT25GRCIsImZkS2V5IiwiZmRWYWx1ZSIsIk5hdmlnYXRpb25UaHJ1UGFnZXMiLCJwYXJzZVBhZ2UiLCJwYWdlVXJsIiwidXJsU2VwYXJhdG9yIiwiaXRlcmF0b3JOYW1lIiwicGFyc2VkVXJsIiwiVVJMIiwicGFnZVZhbHVlIiwic3BsaXQiLCJwb3AiLCJpdGVyYXRvclBvc2l0aW9uIiwicGFnZSIsInBhZ2luZyIsInVwZGF0ZVVybEFuZFF1ZXJ5IiwiY2xpZW50VXJsIiwicXVlcnlDb3B5IiwidXBkYXRlZFF1ZXJ5IiwiYmFzZTY0IiwiX19pbXBvcnRTdGFyIiwiYXhpb3NfMSIsIkZvcm1EYXRhQnVpbGRlcl8xIiwiUmVxdWVzdCIsInRpbWVvdXQiLCJtYWtlSGVhZGVyc0Zyb21PYmplY3QiLCJmb3JtRGF0YUJ1aWxkZXIiLCJtYXhCb2R5TGVuZ3RoIiwicHJveHkiLCJtZXRob2QiLCJvbkNhbGxPcHRpb25zIiwicmVxdWVzdEhlYWRlcnMiLCJqb2luQW5kVHJhbnNmb3JtSGVhZGVycyIsInBhcmFtcyIsImdldE93blByb3BlcnR5TmFtZXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJ1cmxWYWx1ZSIsInRvTG9jYWxlVXBwZXJDYXNlIiwiX2QiLCJlcnJvclJlc3BvbnNlIiwiZXJyXzEiLCJfYyIsImdldFJlc3BvbnNlQm9keSIsIkF4aW9zSGVhZGVycyIsImJhc2ljIiwiZW5jb2RlIiwic2V0QXV0aG9yaXphdGlvbiIsInJlY2VpdmVkT25DYWxsSGVhZGVycyIsIm9uQ2FsbEhlYWRlcnMiLCJoZWFkZXJzT2JqZWN0IiwiaGVhZGVyc0FjY3VtdWxhdG9yIiwiY29tbWFuZCIsImFkZERlZmF1bHRIZWFkZXJzIiwicmVxdWVzdE9wdGlvbnMiLCJSZXNvbHV0aW9uIiwiV2ViaG9va3NJZHMiLCJZZXNObyIsIl9fZXhwb3J0U3RhciIsIk1haWxndW5DbGllbnRfMSIsIkVudW1zIiwiSW50ZXJmYWNlcyIsIk1haWxndW4iLCJGb3JtRGF0YSIsImNsaWVudCJdLCJzb3VyY2VSb290IjoiIn0=