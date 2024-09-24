/*! mailgun.js v11.0.0 */
/*! mailgun.js v11.0.0 */
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
// Axios v1.7.4 Copyright (c) 2024 Matt Zabriskie and contributors


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
  response && (this.response = response);
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
      status: this.response && this.response.status ? this.response.status : null
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
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

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
const hasStandardBrowserEnv = (
  (product) => {
    return hasBrowserEnv && ['ReactNative', 'NativeScript', 'NS'].indexOf(product) < 0
  })(typeof navigator !== 'undefined' && navigator.product);

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

var isURLSameOrigin = platform.hasStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover its components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

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
      const parsed = (utils$1.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })();

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

  function getMergedValue(target, source, caseless) {
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
  function mergeDeepProperties(a, b, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
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
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
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
  let controller = new AbortController();

  let aborted;

  const onabort = function (cancel) {
    if (!aborted) {
      aborted = true;
      unsubscribe();
      const err = cancel instanceof Error ? cancel : this.reason;
      controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
    }
  };

  let timer = timeout && setTimeout(() => {
    onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
  }, timeout);

  const unsubscribe = () => {
    if (signals) {
      timer && clearTimeout(timer);
      timer = null;
      signals.forEach(signal => {
        signal &&
        (signal.removeEventListener ? signal.removeEventListener('abort', onabort) : signal.unsubscribe(onabort));
      });
      signals = null;
    }
  };

  signals.forEach((signal) => signal && signal.addEventListener && signal.addEventListener('abort', onabort));

  const {signal} = controller;

  signal.unsubscribe = unsubscribe;

  return [signal, () => {
    timer && clearTimeout(timer);
    timer = null;
  }];
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

const readBytes = async function* (iterable, chunkSize, encode) {
  for await (const chunk of iterable) {
    yield* streamChunk(ArrayBuffer.isView(chunk) ? chunk : (await encode(String(chunk))), chunkSize);
  }
};

const trackStream = (stream, chunkSize, onProgress, onFinish, encode) => {
  const iterator = readBytes(stream, chunkSize, encode);

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
    return (await new Request(body).arrayBuffer()).byteLength;
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

  let [composedSignal, stopTimeout] = (signal || cancelToken || timeout) ?
    composeSignals$1([signal, cancelToken], timeout) : [];

  let finished, request;

  const onFinish = () => {
    !finished && setTimeout(() => {
      composedSignal && composedSignal.unsubscribe();
    });

    finished = true;
  };

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

        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush, encodeText);
      }
    }

    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? 'include' : 'omit';
    }

    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: withCredentials
    });

    let response = await fetch(request);

    const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

    if (supportsResponseStream && (onDownloadProgress || isStreamResponse)) {
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
          isStreamResponse && onFinish();
        }, encodeText),
        options
      );
    }

    responseType = responseType || 'text';

    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);

    !isStreamResponse && onFinish();

    stopTimeout && stopTimeout();

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
    onFinish();

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

const VERSION = "1.7.4";

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
        let dummy;

        Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : (dummy = new Error());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUV6QztBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUyxRQUFRO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLGFBQWE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsV0FBVyxjQUFjO0FBQzVCLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsbUJBQW1CO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxvREFBb0QsTUFBTTtBQUMxRCxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQixXQUFXLFNBQVM7QUFDcEI7QUFDQSxhQUFhLEdBQUc7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsYUFBYSxlQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQixLQUFLO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUF1QztBQUN2QyxLQUFLOztBQUVMO0FBQ0EsMERBQTBELHdCQUF3QjtBQUNsRjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVFQUF1RSxXQUFXOztBQUVsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLFNBQVM7QUFDMUMsTUFBTTtBQUNOLDZCQUE2QjtBQUM3QixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0M7O0FBRWxDLE9BQU8sb0VBQW9FOztBQUUzRTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHlDQUF5QztBQUN6QyxNQUFNO0FBQ047QUFDQSxrRUFBa0U7QUFDbEUsZ0ZBQWdGO0FBQ2hGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxvREFBb0Q7QUFDN0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DO0FBQ3BDLHdDQUF3Qzs7QUFFeEM7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTs7QUFF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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztVRUpBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc0NyZWRlbnRpYWxzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNUYWdzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNUZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RyYWNraW5nLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9FdmVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0lQUG9vbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0lQcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL0F0dHJpYnV0ZXNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9GaWx0ZXJzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL1NlZWRzTGlzdHMvU2VlZHNMaXN0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL2luYm94UGxhY2VtZW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL3Byb3ZpZGVycy9JbmJveFBsYWNlbWVudHNQcm92aWRlcnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL01haWxndW5DbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL01haWxpbmdMaXN0cy9tYWlsTGlzdE1lbWJlcnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL01haWxpbmdMaXN0cy9tYWlsaW5nTGlzdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL01lc3NhZ2VzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NZXRyaWNzL01ldHJpY3NDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1JvdXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3RhdHMvU3RhdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N0YXRzL1N0YXRzQ29udGFpbmVyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdWJhY2NvdW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL0JvdW5jZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL0NvbXBsYWludC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvU3VwcHJlc3Npb25zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvVW5zdWJzY3JpYmUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9XaGl0ZUxpc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1ZhbGlkYXRpb25zL211bHRpcGxlVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvVmFsaWRhdGlvbnMvdmFsaWRhdGUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1dlYmhvb2tzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vQXR0YWNobWVudHNIYW5kbGVyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vRXJyb3IudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9Gb3JtRGF0YUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vUmVxdWVzdC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0VudW1zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Db21tb24vTG9nZ2VyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Db21tb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvRG9tYWluQ3JlZGVudGlhbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvRG9tYWluVGFncy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9Eb21haW5UZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvRG9tYWluVHJhY2tpbmcudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvRG9tYWluc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRXZlbnRDbGllbnQvSUV2ZW50Q2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9FdmVudENsaWVudC9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSVBQb29scy9JSVBQb29sc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSVBQb29scy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSVBzL0lJUHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0lQcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL0F0dHJpYnV0ZXNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9GaWx0ZXJzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvSW5ib3hQbGFjZW1lbnRzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL1NlZWRzTGlzdHMvU2VlZHNMaXN0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsZ3VuQ2xpZW50L0lNYWlsZ3VuQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsZ3VuQ2xpZW50L2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01lc3NhZ2VzL0lNZXNzYWdlc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWVzc2FnZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1JvdXRlcy9JUm91dGVzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Sb3V0ZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N0YXRzL1N0YXRzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdGF0cy9TdGF0c0NvbnRhaW5lci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3RhdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1YmFjY291bnRzL0lTdWJhY2NvdW50c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3ViYWNjb3VudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9Cb3VuY2UudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9Db21wbGFpbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9JU3VwcHJlc3Npb25zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvVW5zdWJzY3JpYmUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9XaGl0ZUxpc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMvTXVsdGlwbGVWYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9WYWxpZGF0aW9ucy9WYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9WYWxpZGF0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvV2ViaG9va3MvSVdlYkhvb2tzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9XZWJob29rcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vRXJyb3IudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vRm9ybURhdGEudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vTmF2aWdhdGlvblRocnVQYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9SZXF1ZXN0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWluQ3JlZGVudGlhbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpblRhZ3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpblRlbXBsYXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWluVHJhY2tpbmcudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRXZlbnRzL0V2ZW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0V2ZW50cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0lQUG9vbHMvSXBQb29scy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0lQUG9vbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9JUHMvSVBzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvSVBzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWFpbGd1bkNsaWVudC9NYWlsZ3VuQ2xpZW50T3B0aW9ucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxndW5DbGllbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWFpbGluZ0xpc3RzL01haWxpbmdMaXN0cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxpbmdMaXN0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01lc3NhZ2VzL01lc3NhZ2VzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWVzc2FnZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Sb3V0ZXMvUm91dGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvUm91dGVzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3RhdHMvU3RhdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdGF0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1YmFjY291bnRzL1N1YmFjY291bnRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3ViYWNjb3VudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvQm91bmNlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL0NvbXBsYWludC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvVW5zdWJzY3JpYmUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvV2hpdGVMaXN0LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvVmFsaWRhdGlvbnMvTXVsdGlwbGVWYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvVmFsaWRhdGlvbnMvVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1ZhbGlkYXRpb25zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvV2ViaG9va3MvV2ViaG9va3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9XZWJob29rcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9iYXNlLTY0L2Jhc2U2NC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL3VybC1qb2luL2xpYi91cmwtam9pbi5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2Rpc3QvYnJvd3Nlci9heGlvcy5janMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBETlNSZWNvcmQsXG4gIERvbWFpbkRhdGEsXG4gIERvbWFpbkR5bmFtaWNQcm9wc1R5cGUsXG4gIFREb21haW5cbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluIGltcGxlbWVudHMgVERvbWFpbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xuICBzdGF0ZTogc3RyaW5nO1xuICB3aWxkY2FyZDogYm9vbGVhbjtcbiAgc3BhbV9hY3Rpb246IHN0cmluZztcbiAgY3JlYXRlZF9hdDogRGF0ZTtcbiAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICBzbXRwX2xvZ2luOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgaWQ6IHN0cmluZztcbiAgaXNfZGlzYWJsZWQ6IGJvb2xlYW47XG4gIHdlYl9wcmVmaXg6IHN0cmluZztcbiAgd2ViX3NjaGVtZTogc3RyaW5nO1xuICB1c2VfYXV0b21hdGljX3NlbmRlcl9zZWN1cml0eTogYm9vbGVhbjtcbiAgZGtpbV9ob3N0Pzogc3RyaW5nO1xuICBtYWlsZnJvbV9ob3N0Pzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGRhdGE6IERvbWFpbkRhdGEsXG4gICAgcmVjZWl2aW5nPzogRE5TUmVjb3JkW10gfCBudWxsLFxuICAgIHNlbmRpbmc/OiBETlNSZWNvcmRbXSB8IG51bGxcbiAgKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMucmVxdWlyZV90bHMgPSBkYXRhLnJlcXVpcmVfdGxzO1xuICAgIHRoaXMuc2tpcF92ZXJpZmljYXRpb24gPSBkYXRhLnNraXBfdmVyaWZpY2F0aW9uO1xuICAgIHRoaXMuc3RhdGUgPSBkYXRhLnN0YXRlO1xuICAgIHRoaXMud2lsZGNhcmQgPSBkYXRhLndpbGRjYXJkO1xuICAgIHRoaXMuc3BhbV9hY3Rpb24gPSBkYXRhLnNwYW1fYWN0aW9uO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgdGhpcy5zbXRwX3Bhc3N3b3JkID0gZGF0YS5zbXRwX3Bhc3N3b3JkO1xuICAgIHRoaXMuc210cF9sb2dpbiA9IGRhdGEuc210cF9sb2dpbjtcbiAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGU7XG4gICAgdGhpcy5yZWNlaXZpbmdfZG5zX3JlY29yZHMgPSByZWNlaXZpbmcgfHwgbnVsbDtcbiAgICB0aGlzLnNlbmRpbmdfZG5zX3JlY29yZHMgPSBzZW5kaW5nIHx8IG51bGw7XG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgdGhpcy5pc19kaXNhYmxlZCA9IGRhdGEuaXNfZGlzYWJsZWQ7XG4gICAgdGhpcy53ZWJfcHJlZml4ID0gZGF0YS53ZWJfcHJlZml4O1xuICAgIHRoaXMud2ViX3NjaGVtZSA9IGRhdGEud2ViX3NjaGVtZTtcbiAgICB0aGlzLnVzZV9hdXRvbWF0aWNfc2VuZGVyX3NlY3VyaXR5ID0gZGF0YS51c2VfYXV0b21hdGljX3NlbmRlcl9zZWN1cml0eTtcblxuICAgIC8qXG4gICAgICBkb21haW4gZ2V0IGFuZCB1cGRhdGUgbWV0aG9kcyBtYXkgaGF2ZSByaWNoZXIgcmVzcG9uc2UgdGhhbiBjcmVhdGUgbWV0aG9kLlxuICAgICovXG4gICAgY29uc3QgZHluYW1pY0tleXM6IChrZXlvZiBEb21haW5EeW5hbWljUHJvcHNUeXBlKVtdID0gWydka2ltX2hvc3QnLCAnbWFpbGZyb21faG9zdCddO1xuXG4gICAgY29uc3QgZHluYW1pY1Byb3BlcnRpZXMgPSBkeW5hbWljS2V5cy5yZWR1Y2UoKGFjYywgcHJvcGVydHlOYW1lKSA9PiB7XG4gICAgICBpZiAoZGF0YVtwcm9wZXJ0eU5hbWVdKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0eU5hbWUgYXMga2V5b2YgRG9tYWluRHluYW1pY1Byb3BzVHlwZTtcbiAgICAgICAgYWNjW3Byb3BdID0gZGF0YVtwcm9wZXJ0eU5hbWVdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBEb21haW5EeW5hbWljUHJvcHNUeXBlKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGR5bmFtaWNQcm9wZXJ0aWVzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHtcbiAgSURvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgSURvbWFpblRhZ3NDbGllbnQsXG4gIElEb21haW5DcmVkZW50aWFscyxcbiAgSURvbWFpbnNDbGllbnRcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcblxuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvcic7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIERlc3Ryb3llZERvbWFpblJlc3BvbnNlLFxuICBNZXNzYWdlUmVzcG9uc2UsXG4gIERvbWFpbkxpc3RSZXNwb25zZURhdGEsXG4gIERvbWFpblJlc3BvbnNlRGF0YSxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBVcGRhdGVkT3BlblRyYWNraW5nLFxuICBEb21haW5zUXVlcnksXG4gIERvbWFpbkluZm8sXG4gIENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UsXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MsXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMsXG4gIE9wZW5UcmFja2luZ0luZm8sXG4gIENsaWNrVHJhY2tpbmdJbmZvLFxuICBVbnN1YnNjcmliZVRyYWNraW5nSW5mbyxcbiAgUmVwbGFjZW1lbnRGb3JQb29sLFxuICBES0lNQXV0aG9yaXR5SW5mbyxcbiAgVXBkYXRlZERLSU1BdXRob3JpdHksXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UsXG4gIERLSU1TZWxlY3RvckluZm8sXG4gIFVwZGF0ZWRES0lNU2VsZWN0b3JSZXNwb25zZSxcbiAgV2ViUHJlZml4SW5mbyxcbiAgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlLFxuICBURG9tYWluLFxuICBEb21haW5VcGRhdGVJbmZvLFxuICBEb21haW5VcGRhdGVJbmZvUmVxLFxuICBEb21haW5JbmZvUmVxLFxuICBCb29sVG9TdHJpbmcsXG4gIERvbWFpbkdldFF1ZXJ5LFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzdWx0LFxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcbmltcG9ydCBEb21haW4gZnJvbSAnLi9kb21haW4nO1xuaW1wb3J0IHsgSUxvZ2dlciwgSURvbWFpblRyYWNraW5nQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbnNDbGllbnQgaW1wbGVtZW50cyBJRG9tYWluc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHB1YmxpYyBkb21haW5DcmVkZW50aWFsczogSURvbWFpbkNyZWRlbnRpYWxzO1xuICBwdWJsaWMgZG9tYWluVGVtcGxhdGVzOiBJRG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuICBwdWJsaWMgZG9tYWluVGFnczogSURvbWFpblRhZ3NDbGllbnQ7XG4gIHB1YmxpYyBkb21haW5UcmFja2luZzogSURvbWFpblRyYWNraW5nQ2xpZW50O1xuICBwcml2YXRlIGxvZ2dlcjogSUxvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50OiBJRG9tYWluQ3JlZGVudGlhbHMsXG4gICAgZG9tYWluVGVtcGxhdGVzQ2xpZW50OiBJRG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICAgIGRvbWFpblRhZ3NDbGllbnQ6IElEb21haW5UYWdzQ2xpZW50LFxuICAgIGRvbWFpblRyYWNraW5nOiBJRG9tYWluVHJhY2tpbmdDbGllbnQsXG4gICAgbG9nZ2VyOiBJTG9nZ2VyID0gY29uc29sZVxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuZG9tYWluQ3JlZGVudGlhbHMgPSBkb21haW5DcmVkZW50aWFsc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRlbXBsYXRlcyA9IGRvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRhZ3MgPSBkb21haW5UYWdzQ2xpZW50O1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIHRoaXMuZG9tYWluVHJhY2tpbmcgPSBkb21haW5UcmFja2luZztcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUJvb2xWYWx1ZXMoXG4gICAgZGF0YTogRG9tYWluSW5mbyB8IERvbWFpblVwZGF0ZUluZm9cbiAgKTogRG9tYWluSW5mb1JlcSB8IERvbWFpblVwZGF0ZUluZm9SZXEge1xuICAgIGNvbnN0IHByb3BzRm9yUmVwbGFjZW1lbnQgPSBkYXRhIGFzIEJvb2xUb1N0cmluZztcbiAgICBjb25zdCByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IGtleSBhcyBrZXlvZiBCb29sVG9TdHJpbmc7XG4gICAgICBpZiAodHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdib29sZWFuJykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gYXMgYm9vbGVhbjtcbiAgICAgICAgYWNjW3Byb3BdID0gKHZhbHVlLnRvU3RyaW5nKCkgPT09ICd0cnVlJykgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBSZWNvcmQ8a2V5b2YgQm9vbFRvU3RyaW5nLCAndHJ1ZSd8ICdmYWxzZSc+KTtcbiAgICByZXR1cm4geyAuLi5kYXRhLCAuLi5yZXBsYWNlZFByb3BzIH0gYXMgRG9tYWluVXBkYXRlSW5mb1JlcSB8IERvbWFpbkluZm9SZXE7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZU1lc3NhZ2UocmVzcG9uc2U6IERlc3Ryb3llZERvbWFpblJlc3BvbnNlKSA6IE1lc3NhZ2VSZXNwb25zZSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlRG9tYWluTGlzdChyZXNwb25zZTogRG9tYWluTGlzdFJlc3BvbnNlRGF0YSk6IFREb21haW5bXSB7XG4gICAgaWYgKHJlc3BvbnNlLmJvZHkgJiYgcmVzcG9uc2UuYm9keS5pdGVtcykge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9tYWluKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluKHJlc3BvbnNlOiBEb21haW5SZXNwb25zZURhdGEpOiBURG9tYWluIHtcbiAgICByZXR1cm4gbmV3IERvbWFpbihcbiAgICAgIHJlc3BvbnNlLmJvZHkuZG9tYWluLFxuICAgICAgcmVzcG9uc2UuYm9keS5yZWNlaXZpbmdfZG5zX3JlY29yZHMsXG4gICAgICByZXNwb25zZS5ib2R5LnNlbmRpbmdfZG5zX3JlY29yZHNcbiAgICApO1xuICB9XG5cbiAgbGlzdChxdWVyeT86IERvbWFpbnNRdWVyeSk6IFByb21pc2U8VERvbWFpbltdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92NC9kb21haW5zJywgcXVlcnkpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VEb21haW5MaXN0KHJlcyBhcyBEb21haW5MaXN0UmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluR2V0UXVlcnkpIDogUHJvbWlzZTxURG9tYWluPiB7XG4gICAgY29uc3QgcHJlcGFyZWRRdWVyeSA9IHF1ZXJ5ID8ge1xuICAgICAgJ2g6ZXh0ZW5kZWQnOiBxdWVyeT8uZXh0ZW5kZWQgPz8gZmFsc2UsXG4gICAgICAnaDp3aXRoX2Rucyc6IHF1ZXJ5Py53aXRoX2RucyA/PyB0cnVlLFxuICAgIH0gOiB7fTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2RvbWFpbnMvJHtkb21haW59YCwgcHJlcGFyZWRRdWVyeSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IERvbWFpbkluZm8pIDogUHJvbWlzZTxURG9tYWluPiB7XG4gICAgY29uc3QgcG9zdE9iaiA9IHRoaXMuX2hhbmRsZUJvb2xWYWx1ZXMoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjQvZG9tYWlucycsIHBvc3RPYmopXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgZGF0YTogRG9tYWluVXBkYXRlSW5mbykgOiBQcm9taXNlPFREb21haW4+IHtcbiAgICBjb25zdCBwdXREYXRhID0gdGhpcy5faGFuZGxlQm9vbFZhbHVlcyhkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgL3Y0L2RvbWFpbnMvJHtkb21haW59YCwgcHV0RGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgdmVyaWZ5KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxURG9tYWluPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92NC9kb21haW5zLyR7ZG9tYWlufS92ZXJpZnlgKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxNZXNzYWdlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YzL2RvbWFpbnMvJHtkb21haW59YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlKHJlcyBhcyBEZXN0cm95ZWREb21haW5SZXNwb25zZSkpO1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbihkb21haW46IHN0cmluZyk6IFByb21pc2U8Q29ubmVjdGlvblNldHRpbmdzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9jb25uZWN0aW9uYClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlczpDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgQ29ubmVjdGlvblNldHRpbmdzKTtcbiAgfVxuXG4gIHVwZGF0ZUNvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcsIGRhdGE6IENvbm5lY3Rpb25TZXR0aW5ncyk6IFByb21pc2U8VXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vY29ubmVjdGlvbmAsIGRhdGEpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzKVxuICAgICAgLnRoZW4oKHJlczpVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzKSA9PiByZXMuYm9keSBhcyBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzKTtcbiAgfVxuXG4gIC8vIFRyYWNraW5nXG4gIC8qKlxuICAqIEBkZXByZWNhdGVkICdkb21haW5zLmdldFRyYWNraW5nJyBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZC5cbiAgKiBQbGVhc2UgdXNlICdkb21haW5zLmRvbWFpblRyYWNraW5nLmdldFRyYWNraW5nJyBpbnN0ZWFkLlxuICAqL1xuXG4gIGdldFRyYWNraW5nKGRvbWFpbjogc3RyaW5nKSA6IFByb21pc2U8RG9tYWluVHJhY2tpbmdEYXRhPiB7XG4gICAgdGhpcy5sb2dnZXIud2FybihgXG4gICAgICAnZG9tYWlucy5nZXRUcmFja2luZycgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgJ2RvbWFpbnMuZG9tYWluVHJhY2tpbmcuZ2V0VHJhY2tpbmcnIGluc3RlYWQuXG4gICAgYCk7XG4gICAgcmV0dXJuIHRoaXMuZG9tYWluVHJhY2tpbmcuZ2V0VHJhY2tpbmcoZG9tYWluKTtcbiAgfVxuXG4gIC8qKlxuICAqIEBkZXByZWNhdGVkICdkb21haW5zLnVwZGF0ZVRyYWNraW5nJyBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZC5cbiAgKiBQbGVhc2UgdXNlICdkb21haW5zLmRvbWFpblRyYWNraW5nLnVwZGF0ZVRyYWNraW5nJyBpbnN0ZWFkLlxuICAqL1xuICB1cGRhdGVUcmFja2luZyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogT3BlblRyYWNraW5nSW5mbyB8IENsaWNrVHJhY2tpbmdJbmZvIHwgVW5zdWJzY3JpYmVUcmFja2luZ0luZm9cbiAgKTogUHJvbWlzZTxVcGRhdGVkT3BlblRyYWNraW5nPiB7XG4gICAgdGhpcy5sb2dnZXIud2FybihgXG4gICAgICAnZG9tYWlucy51cGRhdGVUcmFja2luZycgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgJ2RvbWFpbnMuZG9tYWluVHJhY2tpbmcudXBkYXRlVHJhY2tpbmcnIGluc3RlYWQuXG4gICAgYCk7XG4gICAgcmV0dXJuIHRoaXMuZG9tYWluVHJhY2tpbmcudXBkYXRlVHJhY2tpbmcoZG9tYWluLCB0eXBlLCBkYXRhKTtcbiAgfVxuXG4gIC8vIElQc1xuICAvKipcbiAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMuZ2V0SXBzXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy5cbiAgKi9cbiAgZ2V0SXBzKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy5nZXRJcHNcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuJyk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogQVBJUmVzcG9uc2UpID0+IHJlc3BvbnNlPy5ib2R5Py5pdGVtcyk7XG4gIH1cblxuICAvKipcbiAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMuYXNzaWduSXBcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLlxuICAqL1xuICBhc3NpZ25JcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMuYXNzaWduSXBcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuJyk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgaXAgfSk7XG4gIH1cblxuICAvKipcbiAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMuZGVsZXRlSXBcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgbW92ZWQgdG8gdGhlIElwc0NsaWVudC5cbiAgKi9cbiAgZGVsZXRlSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLmRlbGV0ZUlwXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgbW92ZWQgaW50byB0aGUgSXBzQ2xpZW50IGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuJyk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCBpcCkpO1xuICB9XG5cbiAgLyoqXG4gICogQGRlcHJlY2F0ZWQgXCJkb21haW5zLmxpbmtJcFBvb2xcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZFxuICAqIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICovXG4gIGxpbmtJcFBvb2woZG9tYWluOiBzdHJpbmcsIHBvb2xJZDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHRoaXMubG9nZ2VyLndhcm4oJ1wiZG9tYWlucy5saW5rSXBQb29sXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSByZWxlYXNlcy4nKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBwb29sX2lkOiBwb29sSWQgfSk7XG4gIH1cblxuICAvKipcbiAgKiBAZGVwcmVjYXRlZCBcImRvbWFpbnMudW5saW5rSXBQb2xsXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIG1vdmVkIGludG8gdGhlIElwc0NsaWVudFxuICAqIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICovXG4gIHVubGlua0lwUG9sbChkb21haW46IHN0cmluZywgcmVwbGFjZW1lbnQ6IFJlcGxhY2VtZW50Rm9yUG9vbCk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICB0aGlzLmxvZ2dlci53YXJuKCdcImRvbWFpbnMudW5saW5rSXBQb2xsXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIGJlIG1vdmVkIGludG8gdGhlIElwc0NsaWVudCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgIGxldCBzZWFyY2hQYXJhbXMgPSAnJztcbiAgICBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCAmJiByZXBsYWNlbWVudC5pcCkge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignVG9vIG11Y2ggZGF0YSBmb3IgcmVwbGFjZW1lbnQnLCAnUGxlYXNlIHNwZWNpZnkgZWl0aGVyIHBvb2xfaWQgb3IgaXAgKG5vdCBib3RoKScpO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gYD9wb29sX2lkPSR7cmVwbGFjZW1lbnQucG9vbF9pZH1gO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/aXA9JHtyZXBsYWNlbWVudC5pcH1gO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsICdpcF9wb29sJywgc2VhcmNoUGFyYW1zKSk7XG4gIH1cblxuICB1cGRhdGVES0lNQXV0aG9yaXR5KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNQXV0aG9yaXR5SW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1BdXRob3JpdHk+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2RraW1fYXV0aG9yaXR5YCwge30sIHsgcXVlcnk6IGBzZWxmPSR7ZGF0YS5zZWxmfWAgfSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpXG4gICAgICAudGhlbigocmVzIDogVXBkYXRlZERLSU1BdXRob3JpdHlSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgVXBkYXRlZERLSU1BdXRob3JpdHkpO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlREtJTVNlbGVjdG9yKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERLSU1TZWxlY3RvckluZm9cbiAgKTogUHJvbWlzZTxVcGRhdGVkREtJTVNlbGVjdG9yUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzOiBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vZGtpbV9zZWxlY3RvcmAsIHt9LCB7IHF1ZXJ5OiBgZGtpbV9zZWxlY3Rvcj0ke2RhdGEuZGtpbVNlbGVjdG9yfWAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXMuc3RhdHVzLFxuICAgICAgbWVzc2FnZTogcmVzPy5ib2R5Py5tZXNzYWdlXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAqIEBkZXByZWNhdGVkIFwiZG9tYWlucy51cGRhdGVXZWJQcmVmaXhcIiBtZXRob2QgaXMgZGVwcmVjYXRlZC5cbiAgKiBQbGVhc2UgdXNlIGRvbWFpbnMudXBkYXRlIHRvIHNldCBuZXcgXCJ3ZWJfcHJlZml4XCIuXG4gICogQ3VycmVudCBtZXRob2Qgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUgcmVsZWFzZXMuXG4gICovXG4gIHVwZGF0ZVdlYlByZWZpeChkb21haW46IHN0cmluZywgZGF0YTogV2ViUHJlZml4SW5mbyk6IFByb21pc2U8VXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlPiB7XG4gICAgdGhpcy5sb2dnZXIud2FybignXCJkb21haW5zLnVwZGF0ZVdlYlByZWZpeFwiIG1ldGhvZCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGRvbWFpbnMudXBkYXRlIHRvIHNldCBuZXcgXCJ3ZWJfcHJlZml4XCIuIEN1cnJlbnQgbWV0aG9kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlIHJlbGVhc2VzLicpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vd2ViX3ByZWZpeGAsIHt9LCB7IHF1ZXJ5OiBgd2ViX3ByZWZpeD0ke2RhdGEud2ViUHJlZml4fWAgfSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlJztcbmltcG9ydCB7IElEb21haW5DcmVkZW50aWFscyB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5pbXBvcnQge1xuICBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSxcbiAgRG9tYWluQ3JlZGVudGlhbHNMaXN0LFxuICBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UsXG4gIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0LFxuICBEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSxcbiAgRG9tYWluQ3JlZGVudGlhbHNRdWVyeSxcbiAgRG9tYWluQ3JlZGVudGlhbHMsXG4gIFVwZGF0ZURvbWFpbkNyZWRlbnRpYWxzRGF0YVxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgaW1wbGVtZW50cyBJRG9tYWluQ3JlZGVudGlhbHMge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvZG9tYWlucy8nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QoXG4gICAgcmVzcG9uc2U6IERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhXG4gICk6IERvbWFpbkNyZWRlbnRpYWxzTGlzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLFxuICAgICAgdG90YWxDb3VudDogcmVzcG9uc2UuYm9keS50b3RhbF9jb3VudFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZU1lc3NhZ2VSZXNwb25zZShcbiAgICByZXNwb25zZTogQ3JlYXRlZFVwZGF0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlXG4gICk6IERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgIH0gYXMgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRGVsZXRlZFJlc3BvbnNlKFxuICAgIHJlc3BvbnNlOkRlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlXG4gICk6IERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgIHNwZWM6IHJlc3BvbnNlLmJvZHkuc3BlY1xuICAgIH0gYXMgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5DcmVkZW50aWFsc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvY3JlZGVudGlhbHMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KHJlcyBhcyBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSlcbiAgICAgICk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluQ3JlZGVudGlhbHNcbiAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHNgLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgdXBkYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZyxcbiAgICBkYXRhOiBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbiAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFscy8ke2NyZWRlbnRpYWxzTG9naW59YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWApXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEZWxldGVkUmVzcG9uc2UocmVzKSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgSURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdCxcbiAgSURvbWFpblRhZ3NDbGllbnRcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IFJlc29sdXRpb24gfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQge1xuICBEb21haW5UYWdzSXRlbSxcbiAgRG9tYWluVGFnc0l0ZW1JbmZvLFxuICBEb21haW5UYWdTdGF0aXN0aWNJdGVtLFxuICBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtLFxuICBEb21haW5UYWdzTGlzdCxcbiAgRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSxcbiAgRG9tYWluVGFnc1F1ZXJ5LFxuICBEb21haW5UYWdzTWVzc2FnZVJlcyxcbiAgRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5LFxuICBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdQcm92aWRlcnNBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdEZXZpY2VzQVBJUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UYWcgaW1wbGVtZW50cyBEb21haW5UYWdzSXRlbSB7XG4gIHRhZzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAnZmlyc3Qtc2Vlbic6IERhdGU7XG4gICdsYXN0LXNlZW4nOiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKHRhZ0luZm86IERvbWFpblRhZ3NJdGVtSW5mbykge1xuICAgIHRoaXMudGFnID0gdGFnSW5mby50YWc7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ0luZm8uZGVzY3JpcHRpb247XG4gICAgdGhpc1snZmlyc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snZmlyc3Qtc2VlbiddKTtcbiAgICB0aGlzWydsYXN0LXNlZW4nXSA9IG5ldyBEYXRlKHRhZ0luZm9bJ2xhc3Qtc2VlbiddKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRG9tYWluVGFnU3RhdGlzdGljIGltcGxlbWVudHMgSURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdCB7XG4gIHRhZzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBzdGFydDogRGF0ZTtcbiAgZW5kOiBEYXRlO1xuICByZXNvbHV0aW9uOiBSZXNvbHV0aW9uO1xuICBzdGF0czogRG9tYWluVGFnU3RhdGlzdGljSXRlbVtdO1xuXG4gIGNvbnN0cnVjdG9yKHRhZ1N0YXRpc3RpY0luZm86IERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSkge1xuICAgIHRoaXMudGFnID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnRhZztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSh0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhcnQpO1xuICAgIHRoaXMuZW5kID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LmVuZCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnJlc29sdXRpb247XG4gICAgdGhpcy5zdGF0cyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQ6IERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtKSB7XG4gICAgICBjb25zdCByZXMgPSB7IC4uLnN0YXQsIHRpbWU6IG5ldyBEYXRlKHN0YXQudGltZSkgfTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluVGFnc0NsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8RG9tYWluVGFnc0xpc3Q+XG4gIGltcGxlbWVudHMgSURvbWFpblRhZ3NDbGllbnQge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvJztcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IERvbWFpblRhZ3NSZXNwb25zZURhdGEsXG4gICk6IERvbWFpblRhZ3NMaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgRG9tYWluVGFnc0xpc3Q7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKCh0YWdJbmZvOiBEb21haW5UYWdzSXRlbUluZm8pID0+IG5ldyBEb21haW5UYWcodGFnSW5mbykpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3RhZycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUYWdTdGF0aXN0aWMoXG4gICAgcmVzcG9uc2U6IERvbWFpblRhZ1N0YXRBUElSZXNwb25zZVxuICApOiBJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0IHtcbiAgICByZXR1cm4gbmV3IERvbWFpblRhZ1N0YXRpc3RpYyhyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRhZ3NRdWVyeSk6IFByb21pc2U8RG9tYWluVGFnc0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycpLCBxdWVyeSk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRhZyhyZXMuYm9keSlcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSwgZGVzY3JpcHRpb24pXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzXG4gICAgICApO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L3RhZ3MvJHt0YWd9YClcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiAoXG4gICAgICAgIHtcbiAgICAgICAgICBtZXNzYWdlOiByZXMuYm9keS5tZXNzYWdlLFxuICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1c1xuICAgICAgICB9IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzKSk7XG4gIH1cblxuICBzdGF0aXN0aWMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBxdWVyeTogRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5KVxuICAgIDogUHJvbWlzZTxEb21haW5UYWdTdGF0aXN0aWM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZVRhZ1N0YXRpc3RpYyhyZXMpXG4gICAgICApO1xuICB9XG5cbiAgY291bnRyaWVzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvY291bnRyaWVzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgcHJvdmlkZXJzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvcHJvdmlkZXJzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgZGV2aWNlcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9kZXZpY2VzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgRG9tYWluVGVtcGxhdGVEYXRhLFxuICBEb21haW5UZW1wbGF0ZXNRdWVyeSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhLFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhLFxuICBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhLFxuICBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0LFxuICBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBOb3RpZmljYXRpb25BUElSZXNwb25zZSxcbiAgTm90aWZpY2F0aW9uUmVzdWx0LFxuICBTaG9ydFRlbXBsYXRlVmVyc2lvbixcbiAgVGVtcGxhdGVRdWVyeSxcbiAgVGVtcGxhdGVWZXJzaW9uLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UsXG4gIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHRcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBJRG9tYWluVGVtcGxhdGUsIElEb21haW5UZW1wbGF0ZXNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluVGVtcGxhdGVJdGVtIGltcGxlbWVudHMgSURvbWFpblRlbXBsYXRlIHtcbiAgbmFtZSA6IHN0cmluZztcbiAgZGVzY3JpcHRpb24gOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdCA6IERhdGUgfCAnJztcbiAgY3JlYXRlZEJ5IDogc3RyaW5nO1xuICBpZCA6IHN0cmluZztcbiAgdmVyc2lvbj86IFRlbXBsYXRlVmVyc2lvbjtcbiAgdmVyc2lvbnM/OiBTaG9ydFRlbXBsYXRlVmVyc2lvbltdO1xuXG4gIGNvbnN0cnVjdG9yKGRvbWFpblRlbXBsYXRlRnJvbUFQSTogSURvbWFpblRlbXBsYXRlKSB7XG4gICAgdGhpcy5uYW1lID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLm5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQgPyBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0KSA6ICcnO1xuICAgIHRoaXMuY3JlYXRlZEJ5ID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRCeTtcbiAgICB0aGlzLmlkID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmlkO1xuXG4gICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uKSB7XG4gICAgICB0aGlzLnZlcnNpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbjtcbiAgICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpIHtcbiAgICAgICAgdGhpcy52ZXJzaW9uLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucyAmJiBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnZlcnNpb25zID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLm1hcCgodmVyc2lvbikgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7IC4uLnZlcnNpb24gfTtcbiAgICAgICAgcmVzdWx0LmNyZWF0ZWRBdCA9IG5ldyBEYXRlKHZlcnNpb24uY3JlYXRlZEF0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5UZW1wbGF0ZXNDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ+XG4gIGltcGxlbWVudHMgSURvbWFpblRlbXBsYXRlc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNyZWF0aW9uUmVzcG9uc2UoZGF0YTogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSk6IElEb21haW5UZW1wbGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShcbiAgICBkYXRhOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZVxuICApOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge30gYXMgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkgJiYgZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGRhdGEuYm9keS50ZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTXV0YXRpb25SZXNwb25zZShcbiAgICBkYXRhOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2VcbiAgKTogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0ID0ge30gYXMgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKGRhdGE6IE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlKTogTm90aWZpY2F0aW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IE5vdGlmaWNhdGlvblJlc3VsdCA9IHt9IGFzIE5vdGlmaWNhdGlvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKFxuICAgIGRhdGE6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlXG4gICk6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7fSBhcyBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgcmVzdWx0LnRlbXBsYXRlVmVyc2lvbiA9IHsgdGFnOiBkYXRhLmJvZHkudGVtcGxhdGUudmVyc2lvbi50YWcgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QocmVzcG9uc2U6IExpc3REb21haW5UZW1wbGF0ZXNBUElSZXNwb25zZSk6IExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0O1xuXG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKChkOiBJRG9tYWluVGVtcGxhdGUpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZCkpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3AnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zKFxuICAgIHJlc3BvbnNlOiBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlXG4gICk6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQ7XG5cbiAgICBkYXRhLnRlbXBsYXRlID0gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXNwb25zZS5ib2R5LnRlbXBsYXRlKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwJyk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHF1ZXJ5PzogVGVtcGxhdGVRdWVyeSk6IFByb21pc2U8SURvbWFpblRlbXBsYXRlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlcy5ib2R5LnRlbXBsYXRlKVxuICAgICAgKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZURhdGFcbiAgKTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhXG4gICk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZyk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95QWxsKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxOb3RpZmljYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJykpXG4gICAgICAudGhlbigocmVzOiBOb3RpZmljYXRpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgbGlzdFZlcnNpb25zKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnlcbiAgKTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBnZXRWZXJzaW9uKGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXMuYm9keS50ZW1wbGF0ZSlcbiAgICAgICk7XG4gIH1cblxuICBjcmVhdGVWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGFcbiAgKTogUHJvbWlzZTxDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGVWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGFcbiAgKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpLCBkYXRhKVxuICAgICAgLnRoZW4oXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgIChyZXM6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3lWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSlcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAudGhlbigocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcykpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgeyBJRG9tYWluVHJhY2tpbmdDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIENsaWNrVHJhY2tpbmdJbmZvLFxuICBEb21haW5UcmFja2luZ0RhdGEsXG4gIERvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIEdlbmVyYXRlRG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlLFxuICBHZXREb21haW5UcmFja2luZ0NlcnRpZmljYXRlUmVzcG9uc2UsXG4gIE9wZW5UcmFja2luZ0luZm8sXG4gIFJlZ2VuZXJhdGVEb21haW5UcmFja2luZ0NlcnRpZmljYXRlUmVzcG9uc2UsXG4gIFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvLFxuICBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlLFxuICBVcGRhdGVkT3BlblRyYWNraW5nLFxufSBmcm9tICcuLi8uLi9UeXBlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpblRyYWNraW5nQ2xpZW50IGltcGxlbWVudHMgSURvbWFpblRyYWNraW5nQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyhyZXNwb25zZTogRG9tYWluVHJhY2tpbmdSZXNwb25zZSk6IERvbWFpblRyYWNraW5nRGF0YSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkudHJhY2tpbmc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRyYWNraW5nVXBkYXRlKHJlc3BvbnNlOiBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKTogVXBkYXRlZE9wZW5UcmFja2luZyB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBwcml2YXRlIF9pc09wZW5UcmFja2luZ0luZm9XaXRQbGFjZShvYmo6IHVua25vd24pOiBvYmogaXMgT3BlblRyYWNraW5nSW5mbyB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICdwbGFjZV9hdF90aGVfdG9wJyBpbiAob2JqIGFzIE9wZW5UcmFja2luZ0luZm8pO1xuICB9XG5cbiAgYXN5bmMgZ2V0KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxHZXREb21haW5UcmFja2luZ0NlcnRpZmljYXRlUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92Mi94NTA5LyR7ZG9tYWlufS9zdGF0dXNgKTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5yZXNwb25zZS5ib2R5LFxuICAgICAgcmVzcG9uc2VTdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2VuZXJhdGUoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPEdlbmVyYXRlRG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdChgL3YyL3g1MDkvJHtkb21haW59YCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHksXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH07XG4gIH1cblxuICBhc3luYyByZWdlbmVyYXRlKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxSZWdlbmVyYXRlRG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucHV0KGAvdjIveDUwOS8ke2RvbWFpbn1gKTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ucmVzcG9uc2UuYm9keSxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldFRyYWNraW5nKGRvbWFpbjogc3RyaW5nKSA6IFByb21pc2U8RG9tYWluVHJhY2tpbmdEYXRhPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnKSk7XG4gICAgcmV0dXJuIHRoaXMuX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyhyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGVUcmFja2luZyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogT3BlblRyYWNraW5nSW5mbyB8IENsaWNrVHJhY2tpbmdJbmZvIHwgVW5zdWJzY3JpYmVUcmFja2luZ0luZm9cbiAgKTogUHJvbWlzZTxVcGRhdGVkT3BlblRyYWNraW5nPiB7XG4gICAgY29uc3QgcHJlcGFyZWREYXRhOiBPcGVuVHJhY2tpbmdJbmZvIHwgQ2xpY2tUcmFja2luZ0luZm8gfCBVbnN1YnNjcmliZVRyYWNraW5nSW5mbyA9IHtcbiAgICAgIC4uLmRhdGFcbiAgICB9O1xuICAgIGlmICh0eXBlb2YgZGF0YT8uYWN0aXZlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHByZXBhcmVkRGF0YS5hY3RpdmUgPSAoZGF0YT8uYWN0aXZlKSA/ICd5ZXMnIDogJ25vJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faXNPcGVuVHJhY2tpbmdJbmZvV2l0UGxhY2UoZGF0YSkpIHtcbiAgICAgIGlmICh0eXBlb2YgZGF0YT8ucGxhY2VfYXRfdGhlX3RvcCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIChwcmVwYXJlZERhdGEgYXMgT3BlblRyYWNraW5nSW5mbykucGxhY2VfYXRfdGhlX3RvcCA9IChkYXRhPy5wbGFjZV9hdF90aGVfdG9wKSA/ICd5ZXMnIDogJ25vJztcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnLCB0eXBlKSwgcHJlcGFyZWREYXRhKTtcbiAgICByZXR1cm4gdGhpcy5fcGFyc2VUcmFja2luZ1VwZGF0ZShyZXNwb25zZSBhcyBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQge1xuICBFdmVudHNMaXN0LFxuICBFdmVudHNRdWVyeSxcbiAgRXZlbnRzUmVzcG9uc2UsXG59IGZyb20gJy4uL1R5cGVzL0V2ZW50cyc7XG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSUV2ZW50Q2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50Q2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxFdmVudHNMaXN0PlxuICBpbXBsZW1lbnRzIElFdmVudENsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBFdmVudHNSZXNwb25zZSxcbiAgKTogRXZlbnRzTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIEV2ZW50c0xpc3Q7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJy8nKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGdldChkb21haW46IHN0cmluZywgcXVlcnk/OiBFdmVudHNRdWVyeSkgOiBQcm9taXNlPEV2ZW50c0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKCcvdjMnLCBkb21haW4sICdldmVudHMnKSwgcXVlcnkpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBJcFBvb2xDcmVhdGVEYXRhLFxuICBJcFBvb2xDcmVhdGVSZXNwb25zZSxcbiAgSXBQb29sQ3JlYXRlUmVzdWx0LFxuICBJcFBvb2xEZWxldGVEYXRhLFxuICBJcFBvb2xMaXN0UmVzcG9uc2UsXG4gIElwUG9vbExpc3RSZXN1bHQsXG4gIElwUG9vbE1lc3NhZ2VSZXNwb25zZSxcbiAgSXBQb29sTWVzc2FnZVJlc3VsdCxcbiAgSXBQb29sVXBkYXRlRGF0YSxcbn0gZnJvbSAnLi4vVHlwZXMvSVBQb29scyc7XG5pbXBvcnQgeyBJSVBQb29sc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcFBvb2xzQ2xpZW50IGltcGxlbWVudHMgSUlQUG9vbHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdCgpOiBQcm9taXNlPElwUG9vbExpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YxL2lwX3Bvb2xzJylcbiAgICAgIC50aGVuKChyZXNwb25zZTogSXBQb29sTGlzdFJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlSXBQb29sc1Jlc3BvbnNlKHJlc3BvbnNlKSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoZGF0YTogSXBQb29sQ3JlYXRlRGF0YSk6IFByb21pc2U8SXBQb29sQ3JlYXRlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IElwUG9vbENyZWF0ZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92MS9pcF9wb29scycsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xVcGRhdGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IElwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wYXRjaFdpdGhGRChgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xEZWxldGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6SXBQb29sTWVzc2FnZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZTogSXBQb29sTGlzdFJlc3BvbnNlKTogSXBQb29sTGlzdFJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCBNZ1JlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJcERhdGEsIElQc0xpc3RRdWVyeSwgSXBzTGlzdFJlc3BvbnNlQm9keSB9IGZyb20gJy4uL1R5cGVzL0lQcyc7XG5pbXBvcnQgeyBJSVBzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElwc0NsaWVudCBpbXBsZW1lbnRzIElJUHNDbGllbnQge1xuICByZXF1ZXN0OiBNZ1JlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogTWdSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk/OiBJUHNMaXN0UXVlcnkpOiBQcm9taXNlPElwc0xpc3RSZXNwb25zZUJvZHk+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92My9pcHMnLCBxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VJcHNSZXNwb25zZTxJcHNMaXN0UmVzcG9uc2VCb2R5PihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBnZXQoaXA6IHN0cmluZyk6IFByb21pc2U8SXBEYXRhPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvaXBzLyR7aXB9YCk7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VJcHNSZXNwb25zZTxJcERhdGE+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJcHNSZXNwb25zZTxUPihyZXNwb25zZTogeyBib2R5OiBUIH0pOiBUIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNBcGlSZXNwb25zZSxcbiAgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc1Jlc3VsdCxcbiAgSW5ib3hQbGFjZW1lbnRzVmFsdWVzQXBpUmVzcG9uc2UsXG4gIEluYm94UGxhY2VtZW50c1ZhbHVlc1Jlc3VsdFxufSBmcm9tICcuLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IGltcGxlbWVudHMgSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBwYXRoOiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgYXN5bmMgbGlzdCgpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQodGhpcy5wYXRoKSBhcyBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQXBpUmVzcG9uc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgfSBhcyBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzUmVzdWx0O1xuICB9XG5cbiAgYXN5bmMgZ2V0KGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzVmFsdWVzUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMucGF0aH0vJHthdHRyaWJ1dGVOYW1lfWApIGFzIEluYm94UGxhY2VtZW50c1ZhbHVlc0FwaVJlc3BvbnNlO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5yZXNwb25zZS5ib2R5LFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQXBpUmVzcG9uc2UsIEluYm94UGxhY2VtZW50c0ZpbHRlcnNSZXN1bHQgfSBmcm9tICcuLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCBpbXBsZW1lbnRzIElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgcGF0aDogc3RyaW5nXG4gICkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNGaWx0ZXJzUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCh0aGlzLnBhdGgpIGFzIEluYm94UGxhY2VtZW50c0ZpbHRlcnNBcGlSZXNwb25zZTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXN1bHQuc3RhdHVzLFxuICAgICAgc3VwcG9ydGVkX2ZpbHRlcnM6IHJlc3VsdC5ib2R5LnN1cHBvcnRlZF9maWx0ZXJzXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSUlQUlNoYXJpbmdDbGllbnQsXG4gIElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50LFxuICBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCxcbiAgSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQsXG4gIElMb2dnZXJcbn0gZnJvbSAnLi4vLi4vLi4vSW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7XG4gIEluYm94UGxhY2VtZW50c0JveCxcbiAgSW5ib3hQbGFjZW1lbnRzRGVzdHJveUFQSVJlc3BvbnNlLFxuICBJbmJveFBsYWNlbWVudHNEZXN0cm95UmVzdWx0LFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHQsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdEFQSVJlc3BvbnNlLFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRBUElTaGFwZSxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0V2l0aFN0YXR1cyxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0FwaVF1ZXJ5LFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRzRGF0ZXMsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0LFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdEFQSVJlc3BvbnNlLFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRzUXVlcnlcbn0gZnJvbSAnLi4vLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcblxuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdD5cbiAgaW1wbGVtZW50cyBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHB1YmxpYyBhdHRyaWJ1dGVzOiBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudDtcbiAgcHVibGljIGZpbHRlcnM6IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50O1xuICBwdWJsaWMgc2hhcmluZzogSUlQUlNoYXJpbmdDbGllbnQ7XG4gIHByaXZhdGUgbG9nZ2VyOiBJTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgYXR0cmlidXRlczogSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQsXG4gICAgZmlsdGVyczogSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQsXG4gICAgc2hhcmluZzogSUlQUlNoYXJpbmdDbGllbnQsXG4gICAgbG9nZ2VyOiBJTG9nZ2VyID0gY29uc29sZVxuICApIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgdGhpcy5maWx0ZXJzID0gZmlsdGVycztcbiAgICB0aGlzLnNoYXJpbmcgPSBzaGFyaW5nO1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RGF0ZVRvVVRDKGtleTpzdHJpbmcsIGlucHV0RGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgLypcbiAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICBhbmQgYmVjYXVzZSBmb3IgQVBJLCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGRhdGUgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdFxuICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICovXG4gICAgdGhpcy5sb2dnZXIud2FybihgRGF0ZTogXCIke2lucHV0RGF0ZX1cIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cblZhbHVlIFwiJHtpbnB1dERhdGUudG9JU09TdHJpbmcoKX1cIiB3aWxsIGJlIHVzZWQgZm9yIHJlcXVlc3QuXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXCIke2tleX1cIiB0byBhdm9pZCBhdXRvLWNvbnZlcnRpbmdgKTtcbiAgICByZXR1cm4gaW5wdXREYXRlLnRvSVNPU3RyaW5nKCk7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVRdWVyeURhdGEoXG4gICAgcXVlcnlEYXRhOiBJbmJveFBsYWNlbWVudHNSZXN1bHRzUXVlcnlcbiAgKTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0FwaVF1ZXJ5IHtcbiAgICBjb25zdCBwcm9wc0ZvclJlcGxhY2VtZW50ID0gcXVlcnlEYXRhIGFzIEluYm94UGxhY2VtZW50c1Jlc3VsdHNEYXRlcztcbiAgICBjb25zdCByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IGtleSBhcyBrZXlvZiBJbmJveFBsYWNlbWVudHNSZXN1bHRzRGF0ZXM7XG4gICAgICBpZiAoISFwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdICYmIHR5cGVvZiBwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHF1ZXJ5RGF0YVtwcm9wXSBhcyBEYXRlO1xuICAgICAgICBhY2NbcHJvcF0gPSB0aGlzLmNvbnZlcnREYXRlVG9VVEMocHJvcCwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBSZWNvcmQ8a2V5b2YgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0RhdGVzLCBzdHJpbmc+KTtcblxuICAgIGNvbnN0IHJlc3VsdDogSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0FwaVF1ZXJ5ID0ge1xuICAgICAgLi4ucXVlcnlEYXRhLFxuICAgICAgLi4ucmVwbGFjZWRQcm9wc1xuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChkYXRhOiBJbmJveFBsYWNlbWVudHNSZXN1bHRBUElTaGFwZSk6IEluYm94UGxhY2VtZW50c1Jlc3VsdCB7XG4gICAgbGV0IGJveCA9IHt9IGFzIEluYm94UGxhY2VtZW50c0JveDtcblxuICAgIGNvbnN0IGhhbmRsZWRTZWVkTGlzdERhdGVzID0ge1xuICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KSxcbiAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEudXBkYXRlZF9hdCksXG4gICAgICBzaGFyaW5nX2V4cGlyZXNfYXQ6IG5ldyBEYXRlKGRhdGEuc2hhcmluZ19leHBpcmVzX2F0KSxcbiAgICB9O1xuXG4gICAgaWYgKGRhdGEuQm94KSB7XG4gICAgICBib3ggPSB7XG4gICAgICAgIC4uLmRhdGEuQm94LFxuICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLkJveC5jcmVhdGVkX2F0KSxcbiAgICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoZGF0YS5Cb3gudXBkYXRlZF9hdCksXG4gICAgICAgIGxhc3RfcmVzdWx0X2F0OiBuZXcgRGF0ZShkYXRhLkJveC5sYXN0X3Jlc3VsdF9hdCksXG4gICAgICB9O1xuICAgICAgZGVsZXRlIChib3ggYXMge0lEPzogc3RyaW5nfSkuSUQ7XG4gICAgfVxuXG4gICAgY29uc3QgaW5ib3hQbGFjZW1lbnRzUmVzdWx0OiBJbmJveFBsYWNlbWVudHNSZXN1bHQgPSB7XG4gICAgICAuLi5kYXRhLFxuICAgICAgQm94OiBib3gsXG4gICAgICAuLi5oYW5kbGVkU2VlZExpc3REYXRlcyxcbiAgICAgIGlkOiBkYXRhLklkLFxuICAgIH07XG5cbiAgICBkZWxldGUgKGluYm94UGxhY2VtZW50c1Jlc3VsdCBhcyB7SUQ/OiBzdHJpbmd9KS5JRDtcblxuICAgIHJldHVybiBpbmJveFBsYWNlbWVudHNSZXN1bHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KHJlc3BvbnNlOiBJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdEFQSVJlc3BvbnNlKTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChcbiAgICAgIChpdGVtOiBJbmJveFBsYWNlbWVudHNSZXN1bHRBUElTaGFwZSlcbiAgICAgICAgOiBJbmJveFBsYWNlbWVudHNSZXN1bHQgPT4gdGhpcy5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0KGl0ZW0pXG4gICAgKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNRdWVyeSk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3Q+IHtcbiAgICBjb25zdCBxdWVyeURhdGEgPSB0aGlzLnByZXBhcmVRdWVyeURhdGEocXVlcnkpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2luYm94L3Jlc3VsdHMnLCBxdWVyeURhdGEpIGFzIEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0QVBJUmVzcG9uc2U7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VMaXN0KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNSZXN1bHRXaXRoU3RhdHVzPiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IEluYm94UGxhY2VtZW50c1Jlc3VsdEFQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2luYm94L3Jlc3VsdHMvJHtpZH1gKSBhcyBJbmJveFBsYWNlbWVudHNSZXN1bHRBUElSZXNwb25zZTtcbiAgICBjb25zdCBpbmJveFBsYWNlbWVudFJlc3VsdDogSW5ib3hQbGFjZW1lbnRzUmVzdWx0ID0gdGhpcy5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0KFxuICAgICAgcmVzcG9uc2UuYm9keS5yZXN1bHRcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIGluYm94UGxhY2VtZW50UmVzdWx0XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3koaWQ6IHN0cmluZykgOiBQcm9taXNlPEluYm94UGxhY2VtZW50c0Rlc3Ryb3lSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5kZWxldGUoYC92NC9pbmJveC9yZXN1bHRzLyR7aWR9YCkgYXMgSW5ib3hQbGFjZW1lbnRzRGVzdHJveUFQSVJlc3BvbnNlO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2V0UmVzdWx0QnlTaGFyZUlkKHNoYXJlSWQ6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUmVzdWx0V2l0aFN0YXR1cz4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2luYm94L3NoYXJpbmcvcHVibGljLyR7c2hhcmVJZH1gKSBhcyBJbmJveFBsYWNlbWVudHNSZXN1bHRBUElSZXNwb25zZTtcbiAgICBjb25zdCBpbmJveFBsYWNlbWVudFJlc3VsdDogSW5ib3hQbGFjZW1lbnRzUmVzdWx0ID0gdGhpcy5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0KFxuICAgICAgcmVzcG9uc2UuYm9keS5yZXN1bHRcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIGluYm94UGxhY2VtZW50UmVzdWx0XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSUlQUlNoYXJpbmdDbGllbnQgfSBmcm9tICcuLi8uLi8uLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIElQUlNoYXJpbmdBUElSZXNwb25zZSxcbiAgSVBSU2hhcmluZ0FwaVNoYXBlLFxuICBJUFJTaGFyaW5nUmVzdWx0LFxuICBJUFJTaGFyaW5nVXBkYXRlQVBJUmVzcG9uc2UsXG4gIElQUlNoYXJpbmdVcGRhdGVEYXRhLFxuICBJUFJTaGFyaW5nVXBkYXRlUmVzdWx0XG59IGZyb20gJy4uLy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi8uLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElQUlNoYXJpbmdDbGllbnQgaW1wbGVtZW50cyBJSVBSU2hhcmluZ0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmcoZGF0YTogSVBSU2hhcmluZ0FwaVNoYXBlKTogSVBSU2hhcmluZ1Jlc3VsdCB7XG4gICAgY29uc3QgaGFuZGxlZFNlZWRMaXN0RGF0ZXMgPSB7XG4gICAgICBleHBpcmVzX2F0OiBuZXcgRGF0ZShkYXRhLmV4cGlyZXNfYXQpLFxuICAgIH07XG5cbiAgICBjb25zdCByZXN1bHQ6IElQUlNoYXJpbmdSZXN1bHQgPSB7XG4gICAgICAuLi5kYXRhLFxuICAgICAgLi4uaGFuZGxlZFNlZWRMaXN0RGF0ZXNcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGFzeW5jIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxJUFJTaGFyaW5nUmVzdWx0ICYge3N0YXR1czogbnVtYmVyfT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2luYm94L3NoYXJpbmcvJHtpZH1gKSBhcyBJUFJTaGFyaW5nQVBJUmVzcG9uc2U7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0U2hhcmluZyhyZXNwb25zZS5ib2R5LnNoYXJpbmcpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3VsdFxuICAgIH07XG4gIH1cblxuICBhc3luYyB1cGRhdGUoXG4gICAgaWQ6IHN0cmluZyxcbiAgICBkYXRhOiBJUFJTaGFyaW5nVXBkYXRlRGF0YVxuICApOiBQcm9taXNlPElQUlNoYXJpbmdVcGRhdGVSZXN1bHQgJiB7IHN0YXR1czogbnVtYmVyIH0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wdXQoYC92NC9pbmJveC9zaGFyaW5nLyR7aWR9YCwge30sIHsgcXVlcnk6IGBlbmFibGVkPSR7ZGF0YS5lbmFibGVkfWAgfSkgYXMgSVBSU2hhcmluZ1VwZGF0ZUFQSVJlc3BvbnNlO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmcocmVzcG9uc2UuYm9keS5zaGFyaW5nKTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ucmVzdWx0LFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBJTG9nZ2VyLFxuICBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCxcbiAgSVNlZWRzTGlzdHNDbGllbnQsXG4gIElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50XG59IGZyb20gJy4uLy4uLy4uL0ludGVyZmFjZXMnO1xuaW1wb3J0IHtcbiAgU2VlZExpc3QsXG4gIFNlZWRMaXN0QVBJU2hhcGUsXG4gIFNlZWRzTGlzdHNBUElRdWVyeSxcbiAgU2VlZHNMaXN0c0FQSVF1ZXJ5RGF0ZXMsXG4gIFNlZWRzTGlzdHNBUElSZXNwb25zZSxcbiAgU2VlZHNMaXN0c0NyZWF0aW5nRGF0YSxcbiAgU2VlZHNMaXN0c1F1ZXJ5LFxuICBTZWVkc0xpc3RzUmVzdWx0LFxuICBTZWVkLFxuICBTZWVkQVBJU2hhcGUsXG4gIFNlZWRzTGlzdHNEZXN0cm95QXBpUmVzcG9uc2UsXG4gIFNlZWRzTGlzdHNVcGRhdGluZ0RhdGEsXG4gIFNlZWRMaXN0UmVzdWx0LFxuICBTZWVkTGlzdEdldEFQSVJlc3BvbnNlLFxuICBTZWVkTGlzdEFQSVJlc3BvbnNlXG59IGZyb20gJy4uLy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi8uLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi8uLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlZWRzTGlzdHNDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPFNlZWRzTGlzdHNSZXN1bHQ+XG4gIGltcGxlbWVudHMgSVNlZWRzTGlzdHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgYXR0cmlidXRlczogSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQ7XG4gIHB1YmxpYyBmaWx0ZXJzOiBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudDtcbiAgcHJpdmF0ZSBsb2dnZXI6IElMb2dnZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBhdHRyaWJ1dGVzOiBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCxcbiAgICBmaWx0ZXJzOiBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCxcbiAgICBsb2dnZXI6IElMb2dnZXIgPSBjb25zb2xlXG4gICkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgICB0aGlzLmZpbHRlcnMgPSBmaWx0ZXJzO1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RGF0ZVRvVVRDKGtleTpzdHJpbmcsIGlucHV0RGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgLypcbiAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICBhbmQgYmVjYXVzZSBmb3IgQVBJLCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGRhdGUgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdFxuICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICovXG4gICAgdGhpcy5sb2dnZXIud2FybihgRGF0ZTogXCIke2lucHV0RGF0ZX1cIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cblZhbHVlIFwiJHtpbnB1dERhdGUudG9JU09TdHJpbmcoKX1cIiB3aWxsIGJlIHVzZWQgZm9yIHJlcXVlc3QuXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXCIke2tleX1cIiB0byBhdm9pZCBhdXRvLWNvbnZlcnRpbmdgKTtcbiAgICByZXR1cm4gaW5wdXREYXRlLnRvSVNPU3RyaW5nKCk7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVRdWVyeURhdGEocXVlcnlEYXRhOiBTZWVkc0xpc3RzUXVlcnkpIDogU2VlZHNMaXN0c0FQSVF1ZXJ5IHtcbiAgICBjb25zdCBwcm9wc0ZvclJlcGxhY2VtZW50ID0gcXVlcnlEYXRhIGFzIFNlZWRzTGlzdHNBUElRdWVyeURhdGVzO1xuICAgIGNvbnN0IHJlcGxhY2VkUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wc0ZvclJlcGxhY2VtZW50KS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICBjb25zdCBwcm9wID0ga2V5IGFzIGtleW9mIFNlZWRzTGlzdHNBUElRdWVyeURhdGVzO1xuICAgICAgaWYgKCEhcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSAmJiB0eXBlb2YgcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBxdWVyeURhdGFbcHJvcF0gYXMgRGF0ZTtcbiAgICAgICAgYWNjW3Byb3BdID0gdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKHByb3AsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgUmVjb3JkPGtleW9mIFNlZWRzTGlzdHNBUElRdWVyeURhdGVzLCBzdHJpbmc+KTtcblxuICAgIGNvbnN0IHJlc3VsdDogU2VlZHNMaXN0c0FQSVF1ZXJ5ID0ge1xuICAgICAgLi4ucXVlcnlEYXRhLFxuICAgICAgLi4ucmVwbGFjZWRQcm9wc1xuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVJlc3VsdChkYXRhOiBTZWVkTGlzdEFQSVJlc3BvbnNlKTogU2VlZExpc3RSZXN1bHQge1xuICAgIGxldCByZXN1bHQgPSB7fSBhcyBTZWVkTGlzdFJlc3VsdDtcbiAgICBjb25zdCBzZWVkTGlzdCA9IHRoaXMucHJlcGFyZVNlZWRMaXN0KGRhdGEuYm9keSk7XG4gICAgcmVzdWx0ID0ge1xuICAgICAgLi4uc2VlZExpc3QsXG4gICAgICBzdGF0dXM6IGRhdGEuc3RhdHVzXG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlU2VlZExpc3QoZGF0YTogU2VlZExpc3RBUElTaGFwZSk6IFNlZWRMaXN0IHtcbiAgICBsZXQgc2VlZHM6IFNlZWRbXSB8IG51bGw7XG5cbiAgICBjb25zdCBoYW5kbGVkU2VlZExpc3REYXRlcyA9IHtcbiAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCksXG4gICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLnVwZGF0ZWRfYXQpLFxuICAgICAgbGFzdF9yZXN1bHRfYXQ6IG5ldyBEYXRlKGRhdGEubGFzdF9yZXN1bHRfYXQpLFxuICAgIH07XG5cbiAgICBpZiAoZGF0YS5TZWVkcykge1xuICAgICAgc2VlZHMgPSBkYXRhLlNlZWRzLm1hcCgoc2VlZEl0ZW06IFNlZWRBUElTaGFwZSk6IFNlZWQgPT4ge1xuICAgICAgICBsZXQgc2VlZCA9IHt9IGFzIFNlZWQ7XG4gICAgICAgIGNvbnN0IGhhbmRsZWRTZWVkRGF0ZXMgPSB7XG4gICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoc2VlZEl0ZW0uY3JlYXRlZF9hdCksXG4gICAgICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoc2VlZEl0ZW0udXBkYXRlZF9hdCksXG4gICAgICAgICAgbWF4X2VtYWlsX2NvdW50X2hpdF9hdDogbmV3IERhdGUoc2VlZEl0ZW0ubWF4X2VtYWlsX2NvdW50X2hpdF9hdCksXG4gICAgICAgICAgbGFzdF9zZW50X3RvX2F0OiBuZXcgRGF0ZShzZWVkSXRlbS5sYXN0X3NlbnRfdG9fYXQpLFxuICAgICAgICAgIGxhc3RfZGVsaXZlcmVkX2F0OiBuZXcgRGF0ZShzZWVkSXRlbS5sYXN0X2RlbGl2ZXJlZF9hdCksXG4gICAgICAgIH07XG4gICAgICAgIHNlZWQgPSB7XG4gICAgICAgICAgLi4uc2VlZEl0ZW0sXG4gICAgICAgICAgLi4uaGFuZGxlZFNlZWREYXRlc1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc2VlZDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWVkcyA9IG51bGw7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VlZExpc3Q6IFNlZWRMaXN0ID0ge1xuICAgICAgLi4uZGF0YSxcbiAgICAgIFNlZWRzOiBzZWVkcyxcbiAgICAgIC4uLmhhbmRsZWRTZWVkTGlzdERhdGVzXG4gICAgfTtcblxuICAgIGRlbGV0ZSAoc2VlZExpc3QgYXMge0lkPzogc3RyaW5nfSkuSWQ7XG5cbiAgICByZXR1cm4gc2VlZExpc3Q7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KHJlc3BvbnNlOiBTZWVkc0xpc3RzQVBJUmVzcG9uc2UpOiBTZWVkc0xpc3RzUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgaXRlbXM6IFtdXG4gICAgfSBhcyBTZWVkc0xpc3RzUmVzdWx0O1xuXG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM/Lm1hcChcbiAgICAgIChpdGVtOiBTZWVkTGlzdEFQSVNoYXBlKTogU2VlZExpc3QgPT4gdGhpcy5wcmVwYXJlU2VlZExpc3QoaXRlbSlcbiAgICApO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdChxdWVyeTogU2VlZHNMaXN0c1F1ZXJ5KTogUHJvbWlzZTxTZWVkc0xpc3RzUmVzdWx0PiB7XG4gICAgY29uc3QgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnlEYXRhKHF1ZXJ5KTtcbiAgICBjb25zdCByZXNwb25zZTogU2VlZHNMaXN0c0FQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2luYm94L3NlZWRsaXN0cycsIHF1ZXJ5RGF0YSkgYXMgU2VlZHNMaXN0c0FQSVJlc3BvbnNlO1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLnBhcnNlTGlzdChyZXNwb25zZSksXG4gICAgICBzdGF0dXM6IDIwMFxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8U2VlZExpc3RSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZTogU2VlZExpc3RHZXRBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9zZWVkbGlzdHMvJHtpZH1gKSBhcyBTZWVkTGlzdEdldEFQSVJlc3BvbnNlO1xuICAgIGNvbnN0IHVwZGF0ZWRTZWVkc0xpc3QgPSB0aGlzLnByZXBhcmVTZWVkTGlzdChyZXNwb25zZS5ib2R5LnNlZWRsaXN0KTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udXBkYXRlZFNlZWRzTGlzdCxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZShkYXRhOiBTZWVkc0xpc3RzQ3JlYXRpbmdEYXRhKTogUHJvbWlzZTxTZWVkTGlzdFJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92NC9pbmJveC9zZWVkbGlzdHMnLCBkYXRhKSBhcyBTZWVkTGlzdEFQSVJlc3BvbnNlO1xuICAgIHJldHVybiB0aGlzLnByZXBhcmVSZXN1bHQocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IFNlZWRzTGlzdHNVcGRhdGluZ0RhdGEpOiBQcm9taXNlPFNlZWRMaXN0UmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucHV0KGAvdjQvaW5ib3gvc2VlZGxpc3RzLyR7aWR9YCwgZGF0YSkgYXMgU2VlZExpc3RBUElSZXNwb25zZTtcbiAgICByZXR1cm4gdGhpcy5wcmVwYXJlUmVzdWx0KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3koaWQ6IHN0cmluZyk6IFByb21pc2U8U2VlZHNMaXN0c0Rlc3Ryb3lBcGlSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjQvaW5ib3gvc2VlZGxpc3RzLyR7aWR9YCkgYXMgdW5rbm93biBhcyBTZWVkc0xpc3RzRGVzdHJveUFwaVJlc3BvbnNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzQ2xpZW50LCBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMnO1xuaW1wb3J0IHsgSVNlZWRzTGlzdHNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQnO1xuaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL3Byb3ZpZGVycy9JbmJveFBsYWNlbWVudHNQcm92aWRlcnMnO1xuaW1wb3J0IHsgSW5ib3hQbGFjZW1lbnRzRGF0YSwgSW5ib3hQbGFjZW1lbnRzVGVzdFJlc3VsdCwgSW5ib3hQbGFjZW1lbnRzVGVzdFJlc3VsdEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3hQbGFjZW1lbnRzQ2xpZW50IGltcGxlbWVudHMgSUluYm94UGxhY2VtZW50c0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHB1YmxpYyBzZWVkc0xpc3RzOiBJU2VlZHNMaXN0c0NsaWVudDtcbiAgcHVibGljIHJlc3VsdHM6IElJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50O1xuICBwdWJsaWMgcHJvdmlkZXJzOiBJSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgc2VlZHNMaXN0c0NsaWVudDogSVNlZWRzTGlzdHNDbGllbnQsXG4gICAgcmVzdWx0czogSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQsXG4gICAgcHJvdmlkZXJzOiBJSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50XG4gICkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5zZWVkc0xpc3RzID0gc2VlZHNMaXN0c0NsaWVudDtcbiAgICB0aGlzLnNlZWRzTGlzdHMgPSBzZWVkc0xpc3RzQ2xpZW50O1xuICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBwcm92aWRlcnM7XG4gIH1cblxuICBhc3luYyBydW5UZXN0KGRhdGE6IEluYm94UGxhY2VtZW50c0RhdGEpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Rlc3RSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0KCcvdjQvaW5ib3gvdGVzdHMnLCBkYXRhKSBhcyBJbmJveFBsYWNlbWVudHNUZXN0UmVzdWx0QVBJUmVzcG9uc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHksXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IElJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgfSBmcm9tICcuLi8uLi8uLi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzJztcbmltcG9ydCB7XG4gIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyLFxuICBJbmJveFBsYWNlbWVudHNQcm92aWRlckFQSVNoYXBlLFxuICBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNMaXN0LFxuICBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNMaXN0QVBJUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uLy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IGltcGxlbWVudHMgSUluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICApIHtcbiAgICB0aGlzLnBhdGggPSAnL3Y0L2luYm94L3Byb3ZpZGVycyc7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNMaXN0QVBJUmVzcG9uc2VcbiAgKTogSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0xpc3Q7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoXG4gICAgICAoaXRlbTogSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJBUElTaGFwZSk6IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlZFByb3ZpZGVyRGF0ZXMgPSB7XG4gICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoaXRlbS5jcmVhdGVkX2F0KSxcbiAgICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShpdGVtLnVwZGF0ZWRfYXQpLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXN1bHQ6IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyID0ge1xuICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgLi4uaGFuZGxlZFByb3ZpZGVyRGF0ZXNcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNQcm92aWRlcnNMaXN0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHRoaXMucGF0aCkgYXMgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdEFQSVJlc3BvbnNlO1xuICAgIHJldHVybiB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBNYWlsZ3VuQ2xpZW50T3B0aW9ucywgSW5wdXRGb3JtRGF0YSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuLi9UeXBlcyc7XG5cbmltcG9ydCBEb21haW5zQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zQ2xpZW50JztcbmltcG9ydCBFdmVudENsaWVudCBmcm9tICcuL0V2ZW50cyc7XG5pbXBvcnQgU3RhdHNDbGllbnQgZnJvbSAnLi9TdGF0cy9TdGF0c0NsaWVudCc7XG5pbXBvcnQgU3VwcHJlc3Npb25DbGllbnQgZnJvbSAnLi9TdXBwcmVzc2lvbnMvU3VwcHJlc3Npb25zQ2xpZW50JztcbmltcG9ydCBXZWJob29rc0NsaWVudCBmcm9tICcuL1dlYmhvb2tzJztcbmltcG9ydCBNZXNzYWdlc0NsaWVudCBmcm9tICcuL01lc3NhZ2VzJztcbmltcG9ydCBSb3V0ZXNDbGllbnQgZnJvbSAnLi9Sb3V0ZXMnO1xuaW1wb3J0IFZhbGlkYXRlQ2xpZW50IGZyb20gJy4vVmFsaWRhdGlvbnMvdmFsaWRhdGUnO1xuaW1wb3J0IElwc0NsaWVudCBmcm9tICcuL0lQcyc7XG5pbXBvcnQgSXBQb29sc0NsaWVudCBmcm9tICcuL0lQUG9vbHMnO1xuaW1wb3J0IE1haWxpbmdMaXN0c0NsaWVudCBmcm9tICcuL01haWxpbmdMaXN0cy9tYWlsaW5nTGlzdHMnO1xuaW1wb3J0IE1haWxMaXN0c01lbWJlcnMgZnJvbSAnLi9NYWlsaW5nTGlzdHMvbWFpbExpc3RNZW1iZXJzJztcbmltcG9ydCBEb21haW5DcmVkZW50aWFsc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc0NyZWRlbnRpYWxzJztcbmltcG9ydCBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgZnJvbSAnLi9WYWxpZGF0aW9ucy9tdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc1RlbXBsYXRlcyc7XG5pbXBvcnQgRG9tYWluVGFnc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc1RhZ3MnO1xuaW1wb3J0IFN1YmFjY291bnRzQ2xpZW50IGZyb20gJy4vU3ViYWNjb3VudHMnO1xuXG5pbXBvcnQge1xuICBJRG9tYWluc0NsaWVudCxcbiAgSVdlYkhvb2tzQ2xpZW50LFxuICBJTWFpbGd1bkNsaWVudCxcbiAgSU1haWxpbmdMaXN0c0NsaWVudCxcbiAgSUV2ZW50Q2xpZW50LFxuICBJU3RhdHNDbGllbnQsXG4gIElTdXBwcmVzc2lvbkNsaWVudCxcbiAgSU1lc3NhZ2VzQ2xpZW50LFxuICBJUm91dGVzQ2xpZW50LFxuICBJVmFsaWRhdGlvbkNsaWVudCxcbiAgSUlQc0NsaWVudCxcbiAgSUlQUG9vbHNDbGllbnQsXG4gIElTdWJhY2NvdW50c0NsaWVudCxcbiAgSUluYm94UGxhY2VtZW50c0NsaWVudCxcbn0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQgU2VlZHNMaXN0c0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9pbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50JztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL0F0dHJpYnV0ZXNDbGllbnQnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvRmlsdGVyc0NsaWVudCc7XG5pbXBvcnQgSVBSU2hhcmluZ0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50JztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvcHJvdmlkZXJzL0luYm94UGxhY2VtZW50c1Byb3ZpZGVycyc7XG5pbXBvcnQgTWV0cmljc0NsaWVudCBmcm9tICcuL01ldHJpY3MvTWV0cmljc0NsaWVudCc7XG5pbXBvcnQgeyBJTWV0cmljc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMvTWV0cmljcy9NZXRyaWNzQ2xpZW50JztcbmltcG9ydCBEb21haW5UcmFja2luZ0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc1RyYWNraW5nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbGd1bkNsaWVudCBpbXBsZW1lbnRzIElNYWlsZ3VuQ2xpZW50IHtcbiAgcHJpdmF0ZSByZXF1ZXN0O1xuXG4gIHB1YmxpYyBkb21haW5zOiBJRG9tYWluc0NsaWVudDtcbiAgcHVibGljIHdlYmhvb2tzOiBJV2ViSG9va3NDbGllbnQ7XG4gIHB1YmxpYyBldmVudHM6IElFdmVudENsaWVudDtcbiAgcHVibGljIHN0YXRzOiBJU3RhdHNDbGllbnQ7XG4gIHB1YmxpYyBtZXRyaWNzOiBJTWV0cmljc0NsaWVudDtcbiAgcHVibGljIHN1cHByZXNzaW9uczogSVN1cHByZXNzaW9uQ2xpZW50O1xuICBwdWJsaWMgbWVzc2FnZXM6IElNZXNzYWdlc0NsaWVudDtcbiAgcHVibGljIHJvdXRlczogSVJvdXRlc0NsaWVudDtcbiAgcHVibGljIHZhbGlkYXRlOiBJVmFsaWRhdGlvbkNsaWVudDtcbiAgcHVibGljIGlwczogSUlQc0NsaWVudDtcbiAgcHVibGljIGlwX3Bvb2xzOiBJSVBQb29sc0NsaWVudDtcbiAgcHVibGljIGxpc3RzOiBJTWFpbGluZ0xpc3RzQ2xpZW50O1xuICBwdWJsaWMgc3ViYWNjb3VudHM6IElTdWJhY2NvdW50c0NsaWVudDtcbiAgcHVibGljIGluYm94UGxhY2VtZW50czogSUluYm94UGxhY2VtZW50c0NsaWVudDtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBNYWlsZ3VuQ2xpZW50T3B0aW9ucywgZm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICBjb25zdCBjb25maWc6IFJlcXVlc3RPcHRpb25zID0geyAuLi5vcHRpb25zIH0gYXMgUmVxdWVzdE9wdGlvbnM7XG5cbiAgICBpZiAoIWNvbmZpZy51cmwpIHtcbiAgICAgIGNvbmZpZy51cmwgPSAnaHR0cHM6Ly9hcGkubWFpbGd1bi5uZXQnO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLnVzZXJuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcInVzZXJuYW1lXCIgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5rZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwia2V5XCIgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgdGhpcy5yZXF1ZXN0ID0gbmV3IFJlcXVlc3QoY29uZmlnLCBmb3JtRGF0YSk7XG4gICAgY29uc3QgbWFpbExpc3RzTWVtYmVycyA9IG5ldyBNYWlsTGlzdHNNZW1iZXJzKHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQgPSBuZXcgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5UZW1wbGF0ZXNDbGllbnQgPSBuZXcgRG9tYWluVGVtcGxhdGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluVGFnc0NsaWVudCA9IG5ldyBEb21haW5UYWdzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluVHJhY2tpbmdDbGllbnQgPSBuZXcgRG9tYWluVHJhY2tpbmdDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgPSBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQgPSBuZXcgSVBSU2hhcmluZ0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuXG4gICAgY29uc3Qgc2VlZHNMaXN0c0F0dHJpYnV0ZXMgPSBuZXcgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvc2VlZGxpc3RzL2EnKTtcbiAgICBjb25zdCByZXN1bHRzQXR0cmlidXRlc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9yZXN1bHRzL2EnKTtcblxuICAgIGNvbnN0IHNlZWRzTGlzdHNGaWx0ZXJzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3NlZWRsaXN0cy9fZmlsdGVycycpO1xuICAgIGNvbnN0IHJlc3VsdHNGaWx0ZXJzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3Jlc3VsdHMvX2ZpbHRlcnMnKTtcblxuICAgIGNvbnN0IHNlZWRzTGlzdHNDbGllbnQgPSBuZXcgU2VlZHNMaXN0c0NsaWVudChcbiAgICAgIHRoaXMucmVxdWVzdCxcbiAgICAgIHNlZWRzTGlzdHNBdHRyaWJ1dGVzLFxuICAgICAgc2VlZHNMaXN0c0ZpbHRlcnNDbGllbnRcbiAgICApO1xuXG4gICAgY29uc3QgaW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0LFxuICAgICAgcmVzdWx0c0F0dHJpYnV0ZXNDbGllbnQsXG4gICAgICByZXN1bHRzRmlsdGVyc0NsaWVudCxcbiAgICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50XG4gICAgKTtcblxuICAgIGNvbnN0IGluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQoXG4gICAgICB0aGlzLnJlcXVlc3RcbiAgICApO1xuXG4gICAgdGhpcy5kb21haW5zID0gbmV3IERvbWFpbnNDbGllbnQoXG4gICAgICB0aGlzLnJlcXVlc3QsXG4gICAgICBkb21haW5DcmVkZW50aWFsc0NsaWVudCxcbiAgICAgIGRvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgICAgIGRvbWFpblRhZ3NDbGllbnQsXG4gICAgICBkb21haW5UcmFja2luZ0NsaWVudFxuICAgICk7XG4gICAgdGhpcy53ZWJob29rcyA9IG5ldyBXZWJob29rc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50Q2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0c0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMubWV0cmljcyA9IG5ldyBNZXRyaWNzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5zdXBwcmVzc2lvbnMgPSBuZXcgU3VwcHJlc3Npb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLm1lc3NhZ2VzID0gbmV3IE1lc3NhZ2VzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5yb3V0ZXMgPSBuZXcgUm91dGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pcHMgPSBuZXcgSXBzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pcF9wb29scyA9IG5ldyBJcFBvb2xzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5saXN0cyA9IG5ldyBNYWlsaW5nTGlzdHNDbGllbnQodGhpcy5yZXF1ZXN0LCBtYWlsTGlzdHNNZW1iZXJzKTtcbiAgICB0aGlzLnZhbGlkYXRlID0gbmV3IFZhbGlkYXRlQ2xpZW50KHRoaXMucmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KTtcbiAgICB0aGlzLnN1YmFjY291bnRzID0gbmV3IFN1YmFjY291bnRzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pbmJveFBsYWNlbWVudHMgPSBuZXcgSW5ib3hQbGFjZW1lbnRzQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0LFxuICAgICAgc2VlZHNMaXN0c0NsaWVudCxcbiAgICAgIGluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQsXG4gICAgICBpbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQsXG4gICAgKTtcbiAgfVxuXG4gIHNldFN1YmFjY291bnQoc3ViYWNjb3VudElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVlc3Q/LnNldFN1YmFjY291bnRIZWFkZXIoc3ViYWNjb3VudElkKTtcbiAgfVxuXG4gIHJlc2V0U3ViYWNjb3VudCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVlc3Q/LnJlc2V0U3ViYWNjb3VudEhlYWRlcigpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQge1xuICBNYWlsTGlzdE1lbWJlcnNRdWVyeSxcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzLFxuICBNYWlsTGlzdE1lbWJlcixcbiAgTXVsdGlwbGVNZW1iZXJzRGF0YSxcbiAgTXVsdGlwbGVNZW1iZXJzUmVxRGF0YSxcbiAgRGVsZXRlZE1lbWJlcixcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzUmVxLFxuICBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSxcbiAgTWFpbExpc3RNZW1iZXJzUmVzdWx0LFxuICBNYWlsTGlzdE1lbWJlcnNSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9NYWlsaW5nTGlzdHMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgSU1haWxMaXN0c01lbWJlcnMgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxMaXN0c01lbWJlcnNcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPE1haWxMaXN0TWVtYmVyc1Jlc3VsdD5cbiAgaW1wbGVtZW50cyBJTWFpbExpc3RzTWVtYmVycyB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My9saXN0cyc7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrQW5kVXBkYXRlRGF0YShkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMpIHtcbiAgICBjb25zdCBuZXdEYXRhID0geyAuLi5kYXRhIH07XG5cbiAgICBpZiAodHlwZW9mIGRhdGEudmFycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG5ld0RhdGEudmFycyA9IEpTT04uc3RyaW5naWZ5KG5ld0RhdGEudmFycyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhLnN1YnNjcmliZWQgPT09ICdib29sZWFuJykge1xuICAgICAgbmV3RGF0YS5zdWJzY3JpYmVkID0gZGF0YS5zdWJzY3JpYmVkID8gJ3llcycgOiAnbm8nO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdEYXRhIGFzIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1JlcTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IE1haWxMaXN0TWVtYmVyc1Jlc3BvbnNlLFxuICApOiBNYWlsTGlzdE1lbWJlcnNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBNYWlsTGlzdE1lbWJlcnNSZXN1bHQ7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdE1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBNYWlsTGlzdE1lbWJlcnNRdWVyeVxuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy9wYWdlc2AsIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldE1lbWJlcihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGNyZWF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzYCwgcmVxRGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgY3JlYXRlTWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZU1lbWJlcnNEYXRhXG4gICk6IFByb21pc2U8TmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2U+IHtcbiAgICBjb25zdCBuZXdEYXRhOiBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhID0ge1xuICAgICAgbWVtYmVyczogQXJyYXkuaXNBcnJheShkYXRhLm1lbWJlcnMpID8gSlNPTi5zdHJpbmdpZnkoZGF0YS5tZW1iZXJzKSA6IGRhdGEubWVtYmVycyxcbiAgICAgIHVwc2VydDogZGF0YS51cHNlcnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy5qc29uYCwgbmV3RGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSk7XG4gIH1cblxuICB1cGRhdGVNZW1iZXIoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzXG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICBjb25zdCByZXFEYXRhID0gdGhpcy5jaGVja0FuZFVwZGF0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWAsIHJlcURhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGRlc3Ryb3lNZW1iZXIobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nKSA6IFByb21pc2U8RGVsZXRlZE1lbWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIERlbGV0ZWRNZW1iZXIpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQge1xuICBMaXN0c1F1ZXJ5LFxuICBDcmVhdGVVcGRhdGVMaXN0LFxuICBEZXN0cm95ZWRMaXN0LFxuICBNYWlsaW5nTGlzdCxcbiAgTWFpbGluZ0xpc3RWYWxpZGF0aW9uQXBpUmVzcG9uc2UsXG4gIFN0YXJ0VmFsaWRhdGlvblJlc3VsdCxcbiAgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0LFxuICBNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQsXG4gIE1haWxpbmdMaXN0UmVzdWx0LFxuICBNYWlsaW5nTGlzdEFwaVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL01haWxpbmdMaXN0cyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvTWFpbGluZ0xpc3RzL01haWxpbmdMaXN0TWVtYmVycyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBJTWFpbGluZ0xpc3RzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxpbmdMaXN0c0NsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8TWFpbGluZ0xpc3RSZXN1bHQ+XG4gIGltcGxlbWVudHMgSU1haWxpbmdMaXN0c0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgbWVtYmVyczogSU1haWxMaXN0c01lbWJlcnM7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbWVtYmVyczogSU1haWxMaXN0c01lbWJlcnMpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My9saXN0cyc7XG4gICAgdGhpcy5tZW1iZXJzID0gbWVtYmVycztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VWYWxpZGF0aW9uUmVzdWx0KFxuICAgIHN0YXR1czogbnVtYmVyLFxuICAgIGRhdGE6IE1haWxpbmdMaXN0VmFsaWRhdGlvbkFwaVJlc3BvbnNlXG4gICk6IE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIHZhbGlkYXRpb25SZXN1bHQ6IHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0ICogMTAwMCkgLy8gYWRkIG1pbGxpc2Vjb25kIHRvIFVuaXggdGltZXN0YW1wXG4gICAgICB9XG4gICAgfSBhcyBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KHJlc3BvbnNlOiBNYWlsaW5nTGlzdEFwaVJlc3BvbnNlKTogTWFpbGluZ0xpc3RSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBNYWlsaW5nTGlzdFJlc3VsdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdChxdWVyeT86IExpc3RzUXVlcnkpOiBQcm9taXNlPE1haWxpbmdMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoYCR7dGhpcy5iYXNlUm91dGV9L3BhZ2VzYCwgcXVlcnkpO1xuICB9XG5cbiAgZ2V0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHRoaXMuYmFzZVJvdXRlLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgdXBkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgZGVzdHJveShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8RGVzdHJveWVkTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIERlc3Ryb3llZExpc3QpO1xuICB9XG5cbiAgdmFsaWRhdGUobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFN0YXJ0VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYCwge30pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+ICh7XG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgICB9KSBhcyBTdGFydFZhbGlkYXRpb25SZXN1bHQpO1xuICB9XG5cbiAgdmFsaWRhdGlvblJlc3VsdChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWApXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlVmFsaWRhdGlvblJlc3VsdChcbiAgICAgICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgIHJlc3BvbnNlLmJvZHkgYXMgTWFpbGluZ0xpc3RWYWxpZGF0aW9uQXBpUmVzcG9uc2VcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGNhbmNlbFZhbGlkYXRpb24obWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgICB9IGFzIE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdCkpO1xuICB9XG59XG4iLCJpbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9jb21tb24vRXJyb3InO1xuaW1wb3J0IHtcbiAgTWFpbGd1bk1lc3NhZ2VEYXRhLFxuICBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSxcbiAgTWVzc2FnZXNTZW5kUmVzdWx0XG59IGZyb20gJy4uL1R5cGVzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSU1lc3NhZ2VzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VzQ2xpZW50IGltcGxlbWVudHMgSU1lc3NhZ2VzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZUJvb2xlYW5WYWx1ZXMoZGF0YTogTWFpbGd1bk1lc3NhZ2VEYXRhKTogTWFpbGd1bk1lc3NhZ2VEYXRhIHtcbiAgICBjb25zdCB5ZXNOb1Byb3BlcnRpZXMgPSBuZXcgU2V0KFtcbiAgICAgICdvOnRlc3Rtb2RlJyxcbiAgICAgICd0OnRleHQnLFxuICAgICAgJ286ZGtpbScsXG4gICAgICAnbzp0cmFja2luZycsXG4gICAgICAnbzp0cmFja2luZy1jbGlja3MnLFxuICAgICAgJ286dHJhY2tpbmctb3BlbnMnLFxuICAgICAgJ286cmVxdWlyZS10bHMnLFxuICAgICAgJ286c2tpcC12ZXJpZmljYXRpb24nXG4gICAgXSk7XG5cbiAgICBpZiAoIWRhdGEgfHwgT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdNZXNzYWdlIGRhdGEgb2JqZWN0IGNhbiBub3QgYmUgZW1wdHknLCAnTWVzc2FnZSBkYXRhIG9iamVjdCBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3Qua2V5cyhkYXRhKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICBpZiAoeWVzTm9Qcm9wZXJ0aWVzLmhhcyhrZXkpICYmIHR5cGVvZiBkYXRhW2tleV0gPT09ICdib29sZWFuJykge1xuICAgICAgICBhY2Nba2V5XSA9IGRhdGFba2V5XSA/ICd5ZXMnIDogJ25vJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBNYWlsZ3VuTWVzc2FnZURhdGEpO1xuICB9XG5cbiAgX3BhcnNlUmVzcG9uc2UocmVzcG9uc2U6IE1lc3NhZ2VzU2VuZEFQSVJlc3BvbnNlKTogTWVzc2FnZXNTZW5kUmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogTWFpbGd1bk1lc3NhZ2VEYXRhKTogUHJvbWlzZTxNZXNzYWdlc1NlbmRSZXN1bHQ+IHtcbiAgICBpZiAoZGF0YS5tZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92My8ke2RvbWFpbn0vbWVzc2FnZXMubWltZWAsIGRhdGEpXG4gICAgICAgIC50aGVuKHRoaXMuX3BhcnNlUmVzcG9uc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGlmaWVkRGF0YSA9IHRoaXMucHJlcGFyZUJvb2xlYW5WYWx1ZXMoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzYCwgbW9kaWZpZWREYXRhKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0NvbW1vbic7XG5pbXBvcnQgeyBJTWV0cmljc0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvTWV0cmljcy9NZXRyaWNzQ2xpZW50JztcbmltcG9ydCB7XG4gIE1ldHJpY3NBUElRdWVyeSwgTWV0cmljc0FQSVJlc3BvbnNlLCBNZXRyaWNzUXVlcnksIE1ldHJpY3NSZXN1bHRcbn0gZnJvbSAnLi4vLi4vVHlwZXMvTWV0cmljcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1ldHJpY3NDbGllbnQgaW1wbGVtZW50cyBJTWV0cmljc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHByaXZhdGUgbG9nZ2VyOiBJTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIGxvZ2dlcjogSUxvZ2dlciA9IGNvbnNvbGUpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RGF0ZVRvVVRDKGtleTpzdHJpbmcsIGlucHV0RGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgLypcbiAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICBhbmQgYmVjYXVzZSBmb3IgQVBJLCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGRhdGUgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdFxuICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICovXG4gICAgdGhpcy5sb2dnZXIud2FybihgRGF0ZTpcIiR7aW5wdXREYXRlfVwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxuVmFsdWUgXCIke2lucHV0RGF0ZS50b1VUQ1N0cmluZygpfVwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cbkNvbnNpZGVyIHVzaW5nIHN0cmluZyB0eXBlIGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiIHRvIGF2b2lkIGF1dG8tY29udmVydGluZ2ApO1xuICAgIHJldHVybiBpbnB1dERhdGUudG9VVENTdHJpbmcoKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVF1ZXJ5KHF1ZXJ5OiBNZXRyaWNzUXVlcnkgfCB1bmRlZmluZWQpOiBNZXRyaWNzQVBJUXVlcnkge1xuICAgIGxldCBzdGFydERhdGU7XG4gICAgbGV0IGVuZERhdGU7XG4gICAgaWYgKHF1ZXJ5KSB7XG4gICAgICBjb25zdCBxU3RhcnQgPSBxdWVyeT8uc3RhcnQ7XG4gICAgICBjb25zdCBxRW5kID0gcXVlcnk/LmVuZDtcbiAgICAgIHN0YXJ0RGF0ZSA9IHFTdGFydCBpbnN0YW5jZW9mIERhdGUgPyB0aGlzLmNvbnZlcnREYXRlVG9VVEMoJ3N0YXJ0JywgcVN0YXJ0KSA6IHFTdGFydCA/PyAnJztcbiAgICAgIGVuZERhdGUgPSBxRW5kICYmIHFFbmQgaW5zdGFuY2VvZiBEYXRlID8gdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKCdlbmQnLCBxRW5kKSA6IHFFbmQgPz8gJyc7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdDogTWV0cmljc0FQSVF1ZXJ5ID0ge1xuICAgICAgLi4ucXVlcnksXG4gICAgICBzdGFydDogc3RhcnREYXRlLFxuICAgICAgZW5kOiBlbmREYXRlXG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVSZXNwb25zZShyZXNwb25zZTogTWV0cmljc0FQSVJlc3BvbnNlKTogTWV0cmljc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzQm9keSA9IHJlc3BvbnNlLmJvZHk7XG4gICAgY29uc3Qgc3RhcnREYXRlID0gRGF0ZS5wYXJzZShyZXNCb2R5LnN0YXJ0KSA/IG5ldyBEYXRlKHJlc0JvZHkuc3RhcnQpIDogbnVsbDtcbiAgICBjb25zdCBlbmREYXRlID0gRGF0ZS5wYXJzZShyZXNCb2R5LmVuZCkgPyBuZXcgRGF0ZShyZXNCb2R5LmVuZCkgOiBudWxsO1xuICAgIGNvbnN0IHJlc3VsdDogTWV0cmljc1Jlc3VsdCA9IHtcbiAgICAgIC4uLnJlc0JvZHksXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHN0YXJ0OiBzdGFydERhdGUsXG4gICAgICBlbmQ6IGVuZERhdGVcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhc3luYyBnZXRBY2NvdW50KHF1ZXJ5PzogTWV0cmljc1F1ZXJ5KTogUHJvbWlzZTxNZXRyaWNzUmVzdWx0PiB7XG4gICAgY29uc3QgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnkocXVlcnkpO1xuICAgIGNvbnN0IHJlc3BvbnNlOiBNZXRyaWNzQVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdCgnL3YxL2FuYWx5dGljcy9tZXRyaWNzJywgcXVlcnlEYXRhKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZShyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBnZXRBY2NvdW50VXNhZ2UocXVlcnk/OiBNZXRyaWNzUXVlcnkpOiBQcm9taXNlPE1ldHJpY3NSZXN1bHQ+IHtcbiAgICBjb25zdCBxdWVyeURhdGEgPSB0aGlzLnByZXBhcmVRdWVyeShxdWVyeSk7XG4gICAgY29uc3QgcmVzcG9uc2U6IE1ldHJpY3NBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0KCcvdjEvYW5hbHl0aWNzL3VzYWdlL21ldHJpY3MnLCBxdWVyeURhdGEpO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVJvdXRlc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuaW1wb3J0IHtcbiAgQ3JlYXRlVXBkYXRlUm91dGVEYXRhLCBEZXN0cm95Um91dGVSZXNwb25zZSwgUm91dGUsIFJvdXRlc0xpc3RRdWVyeSwgVXBkYXRlUm91dGVSZXNwb25zZVxufSBmcm9tICcuLi9UeXBlcy9Sb3V0ZXMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlc0NsaWVudCBpbXBsZW1lbnRzIElSb3V0ZXNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeTogUm91dGVzTGlzdFF1ZXJ5KTogUHJvbWlzZTxSb3V0ZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9yb3V0ZXMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyk7XG4gIH1cblxuICBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL3JvdXRlcy8ke2lkfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92My9yb3V0ZXMnLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5LnJvdXRlKTtcbiAgfVxuXG4gIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFVwZGF0ZVJvdXRlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgL3YzL3JvdXRlcy8ke2lkfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95Um91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IFN0YXRzUXVlcnksIFN0YXRzT3B0aW9ucyB9IGZyb20gJy4uLy4uL1R5cGVzL1N0YXRzJztcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0NvbW1vbic7XG5pbXBvcnQgU3RhdHNDb250YWluZXIgZnJvbSAnLi9TdGF0c0NvbnRhaW5lcic7XG5pbXBvcnQgeyBJU3RhdHNDbGllbnQsIElTdGF0c0NvbnRhaW5lciB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3RhdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c0NsaWVudCBpbXBsZW1lbnRzIElTdGF0c0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHByaXZhdGUgbG9nZ2VyOiBJTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIGxvZ2dlcjogSUxvZ2dlciA9IGNvbnNvbGUpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RGF0ZVRvVVRDKGtleTpzdHJpbmcsIGlucHV0RGF0ZTogRGF0ZSk6IEFycmF5PHN0cmluZz4ge1xuICAgIC8qXG4gICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAqL1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYERhdGU6XCIke2lucHV0RGF0ZX1cIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cblZhbHVlIFwiJHtpbnB1dERhdGUudG9VVENTdHJpbmcoKX1cIiB3aWxsIGJlIHVzZWQgZm9yIHJlcXVlc3QuXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXCIke2tleX1cIiB0byBhdm9pZCBhdXRvLWNvbnZlcnRpbmdgKTtcbiAgICByZXR1cm4gW2tleSwgaW5wdXREYXRlLnRvVVRDU3RyaW5nKCldO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5OiBTdGF0c1F1ZXJ5IHwgdW5kZWZpbmVkKTogQXJyYXk8QXJyYXk8c3RyaW5nPj4ge1xuICAgIGxldCBzZWFyY2hQYXJhbXMgPSBbXSBhcyBBcnJheTxBcnJheTxzdHJpbmc+PjtcbiAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoKSB7XG4gICAgICBzZWFyY2hQYXJhbXMgPSBPYmplY3QuZW50cmllcyhxdWVyeSkucmVkdWNlKChhcnJheVdpdGhQYWlycywgY3VycmVudFBhaXIpID0+IHtcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gY3VycmVudFBhaXI7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCkgeyAvLyBldmVudDogWydkZWxpdmVyZWQnLCAnYWNjZXB0ZWQnXVxuICAgICAgICAgIGNvbnN0IHJlcGVhdGVkUHJvcGVydHkgPSB2YWx1ZS5tYXAoKGl0ZW0pID0+IFtrZXksIGl0ZW1dKTtcbiAgICAgICAgICByZXR1cm4gWy4uLmFycmF5V2l0aFBhaXJzLCAuLi5yZXBlYXRlZFByb3BlcnR5XTsgLy8gW1tldmVudCxkZWxpdmVyZWRdLCBbZXZlbnQsYWNjZXB0ZWRdXVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgIGFycmF5V2l0aFBhaXJzLnB1c2godGhpcy5jb252ZXJ0RGF0ZVRvVVRDKGtleSwgdmFsdWUpKTtcbiAgICAgICAgICByZXR1cm4gYXJyYXlXaXRoUGFpcnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGFycmF5V2l0aFBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcnJheVdpdGhQYWlycztcbiAgICAgIH0sIFtdIGFzIEFycmF5PEFycmF5PHN0cmluZz4+KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VhcmNoUGFyYW1zO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZVN0YXRzKHJlc3BvbnNlOiB7IGJvZHk6IFN0YXRzT3B0aW9ucyB9KTogSVN0YXRzQ29udGFpbmVyIHtcbiAgICByZXR1cm4gbmV3IFN0YXRzQ29udGFpbmVyKHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZ2V0RG9tYWluKGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPElTdGF0c0NvbnRhaW5lcj4ge1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzJywgZG9tYWluLCAnc3RhdHMvdG90YWwnKSwgc2VhcmNoUGFyYW1zKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZVN0YXRzKTtcbiAgfVxuXG4gIGdldEFjY291bnQocXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxJU3RhdHNDb250YWluZXI+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvc3RhdHMvdG90YWwnLCBzZWFyY2hQYXJhbXMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlU3RhdHMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJU3RhdHNDb250YWluZXIgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N0YXRzJztcbmltcG9ydCB7IFN0YXQsIFN0YXRzT3B0aW9ucyB9IGZyb20gJy4uLy4uL1R5cGVzL1N0YXRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHNDb250YWluZXIgaW1wbGVtZW50cyBJU3RhdHNDb250YWluZXIge1xuICAgIHN0YXJ0OiBEYXRlO1xuICAgIGVuZDogRGF0ZTtcbiAgICByZXNvbHV0aW9uOiBzdHJpbmc7XG4gICAgc3RhdHM6IFN0YXRbXTtcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBTdGF0c09wdGlvbnMpIHtcbiAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZShkYXRhLnN0YXJ0KTtcbiAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoZGF0YS5lbmQpO1xuICAgICAgdGhpcy5yZXNvbHV0aW9uID0gZGF0YS5yZXNvbHV0aW9uO1xuICAgICAgdGhpcy5zdGF0cyA9IGRhdGEuc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0OiBTdGF0KSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHsgLi4uc3RhdCB9O1xuICAgICAgICByZXMudGltZSA9IG5ldyBEYXRlKHN0YXQudGltZSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElTdWJhY2NvdW50c0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuaW1wb3J0IHtcbiAgU3ViYWNjb3VudExpc3RSZXNwb25zZURhdGEsXG4gIFN1YmFjY291bnRSZXNwb25zZURhdGEsXG4gIFN1YmFjY291bnRzUXVlcnksXG59IGZyb20gJy4uL1R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ViYWNjb3VudHNDbGllbnQgaW1wbGVtZW50cyBJU3ViYWNjb3VudHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBzdGF0aWMgU1VCQUNDT1VOVF9IRUFERVIgPSAnWC1NYWlsZ3VuLU9uLUJlaGFsZi1PZic7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogU3ViYWNjb3VudHNRdWVyeSk6IFByb21pc2U8U3ViYWNjb3VudExpc3RSZXNwb25zZURhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3Y1L2FjY291bnRzL3N1YmFjY291bnRzJywgcXVlcnkpXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gIH1cblxuICBnZXQoaWQ6c3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92NS9hY2NvdW50cy9zdWJhY2NvdW50cy8ke2lkfWApXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gIH1cblxuICBjcmVhdGUobmFtZTpzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92NS9hY2NvdW50cy9zdWJhY2NvdW50cycsIHsgbmFtZSB9KVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG5cbiAgZW5hYmxlKGlkOnN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChgL3Y1L2FjY291bnRzL3N1YmFjY291bnRzLyR7aWR9L2VuYWJsZWApXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gIH1cblxuICBkaXNhYmxlKGlkOnN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChgL3Y1L2FjY291bnRzL3N1YmFjY291bnRzLyR7aWR9L2Rpc2FibGVgKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IElCb3VuY2UgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBCb3VuY2VEYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm91bmNlIGV4dGVuZHMgU3VwcHJlc3Npb24gaW1wbGVtZW50cyBJQm91bmNlIHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IEJvdW5jZURhdGEpIHtcbiAgICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLkJPVU5DRVMpO1xuICAgICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgdGhpcy5jb2RlID0gK2RhdGEuY29kZTtcbiAgICAgIHRoaXMuZXJyb3IgPSBkYXRhLmVycm9yO1xuICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IElDb21wbGFpbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBDb21wbGFpbnREYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGxhaW50IGV4dGVuZHMgU3VwcHJlc3Npb24gaW1wbGVtZW50cyBJQ29tcGxhaW50IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBDb21wbGFpbnREYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5DT01QTEFJTlRTKTtcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1cHByZXNzaW9uIHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IodHlwZTogU3VwcHJlc3Npb25Nb2RlbHMpIHtcbiAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi4vY29tbW9uL0Vycm9yJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCBCb3VuY2UgZnJvbSAnLi9Cb3VuY2UnO1xuaW1wb3J0IENvbXBsYWludCBmcm9tICcuL0NvbXBsYWludCc7XG5pbXBvcnQgVW5zdWJzY3JpYmUgZnJvbSAnLi9VbnN1YnNjcmliZSc7XG5pbXBvcnQgV2hpdGVMaXN0IGZyb20gJy4vV2hpdGVMaXN0JztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uJztcbmltcG9ydCB7XG4gIElCb3VuY2UsXG4gIElDb21wbGFpbnQsXG4gIElTdXBwcmVzc2lvbkNsaWVudCxcbiAgSVVuc3Vic2NyaWJlLFxuICBJV2hpdGVMaXN0XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7XG4gIFN1cHByZXNzaW9uTGlzdCxcbiAgU3VwcHJlc3Npb25MaXN0UmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uRGF0YVR5cGUsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0LFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uTGlzdFF1ZXJ5LFxuICBTdXBwcmVzc2lvblJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQsXG4gIFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5cbmNvbnN0IGNyZWF0ZU9wdGlvbnMgPSB7XG4gIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBwcmVzc2lvbkNsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8U3VwcHJlc3Npb25MaXN0PlxuICBpbXBsZW1lbnRzIElTdXBwcmVzc2lvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIG1vZGVsczogb2JqZWN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubW9kZWxzID0ge1xuICAgICAgYm91bmNlczogQm91bmNlLFxuICAgICAgY29tcGxhaW50czogQ29tcGxhaW50LFxuICAgICAgdW5zdWJzY3JpYmVzOiBVbnN1YnNjcmliZSxcbiAgICAgIHdoaXRlbGlzdHM6IFdoaXRlTGlzdCxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogU3VwcHJlc3Npb25MaXN0UmVzcG9uc2UsXG4gICAgTW9kZWw6IHtcbiAgICAgIG5ldyhkYXRhOiBTdXBwcmVzc2lvbkRhdGFUeXBlKTpcbiAgICAgIElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdFxuICAgIH1cbiAgKTogU3VwcHJlc3Npb25MaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgU3VwcHJlc3Npb25MaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zPy5tYXAoKGl0ZW0pID0+IG5ldyBNb2RlbChpdGVtKSkgfHwgW107XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgX3BhcnNlSXRlbTxUIGV4dGVuZHMgU3VwcHJlc3Npb24+KFxuICAgIGRhdGEgOiBTdXBwcmVzc2lvbkRhdGFUeXBlLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YVR5cGU6IFN1cHByZXNzaW9uRGF0YVR5cGUpOlRcbiAgICB9XG4gICk6IFQge1xuICAgIHJldHVybiBuZXcgTW9kZWwoZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVdoaXRlTGlzdChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW10sXG4gICAgaXNEYXRhQXJyYXk6IGJvb2xlYW5cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgaWYgKGlzRGF0YUFycmF5KSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAnRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0JyxcbiAgICAgICAgJ1doaXRlbGlzdFxcJ3MgY3JlYXRpb24gcHJvY2VzcyBkb2VzIG5vdCBzdXBwb3J0IG11bHRpcGxlIGNyZWF0aW9ucy4gRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0J1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3RXaXRoRkQodXJsam9pbigndjMnLCBkb21haW4sICd3aGl0ZWxpc3RzJyksIGRhdGEgYXMgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVVuc3Vic2NyaWJlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkgeyAvLyBVc2VyIHByb3ZpZGVkIGFuIGFycmF5XG4gICAgICBjb25zdCBpc0NvbnRhaW5zVGFnID0gZGF0YS5zb21lKCh1bnN1YnNjcmliZTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEpID0+IHVuc3Vic2NyaWJlLnRhZyk7XG4gICAgICBpZiAoaXNDb250YWluc1RhZykge1xuICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAgICdUYWcgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSB1c2VkIGZvciBjcmVhdGluZyBtdWx0aXBsZSB1bnN1YnNjcmliZXMuJyxcbiAgICAgICAgICAnVGFnIHByb3BlcnR5IGNhbiBiZSB1c2VkIG9ubHkgaWYgb25lIHVuc3Vic2NyaWJlIHByb3ZpZGVkIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kLiBQbGVhc2UgdXNlIHRhZ3MgaW5zdGVhZC4nXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAgIC5wb3N0KHVybGpvaW4oJ3YzJywgZG9tYWluLCAndW5zdWJzY3JpYmVzJyksIEpTT04uc3RyaW5naWZ5KGRhdGEpLCBjcmVhdGVPcHRpb25zKVxuICAgICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGE/LnRhZ3MpIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgICdUYWdzIHByb3BlcnR5IHNob3VsZCBub3QgYmUgdXNlZCBmb3IgY3JlYXRpbmcgb25lIHVuc3Vic2NyaWJlLicsXG4gICAgICAgICdUYWdzIHByb3BlcnR5IGNhbiBiZSB1c2VkIGlmIHlvdSBwcm92aWRlcyBhbiBhcnJheSBvZiB1bnN1YnNjcmliZXMgYXMgc2Vjb25kIGFyZ3VtZW50IG9mIGNyZWF0ZSBtZXRob2QuIFBsZWFzZSB1c2UgdGFnIGluc3RlYWQnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLnRhZykpIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgICdUYWcgcHJvcGVydHkgY2FuIG5vdCBiZSBhbiBhcnJheScsXG4gICAgICAgICdQbGVhc2UgdXNlIGFycmF5IG9mIHVuc3Vic2NyaWJlcyBhcyBzZWNvbmQgYXJndW1lbnQgb2YgY3JlYXRlIG1ldGhvZCB0byBiZSBhYmxlIHRvIHByb3ZpZGUgZmV3IHRhZ3MnXG4gICAgICApO1xuICAgIH1cbiAgICAvKiBXZSBuZWVkIEZvcm0gRGF0YSBmb3IgdW5zdWJzY3JpYmVzIGlmIHdlIHdhbnQgdG8gc3VwcG9ydCB0aGUgXCJ0YWdcIiBwcm9wZXJ0eSAqL1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAndW5zdWJzY3JpYmVzJyksIGRhdGEpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBwcml2YXRlIGdldE1vZGVsKHR5cGU6IHN0cmluZykge1xuICAgIGlmICh0eXBlIGluIHRoaXMubW9kZWxzKSB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbHNbdHlwZSBhcyBrZXlvZiB0eXBlb2YgdGhpcy5tb2RlbHNdO1xuICAgIH1cbiAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgJ1Vua25vd24gdHlwZSB2YWx1ZScsXG4gICAgICAnVHlwZSBtYXkgYmUgb25seSBvbmUgb2YgW2JvdW5jZXMsIGNvbXBsYWludHMsIHVuc3Vic2NyaWJlcywgd2hpdGVsaXN0c10nXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVJlc3BvbnNlKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzcG9uc2UpOiBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgdHlwZTogcmVzcG9uc2UuYm9keS50eXBlIHx8ICcnLFxuICAgICAgdmFsdWU6IHJlc3BvbnNlLmJvZHkudmFsdWUgfHwgJycsXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH07XG4gIH1cblxuICBhc3luYyBsaXN0KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBxdWVyeT86IFN1cHByZXNzaW9uTGlzdFF1ZXJ5XG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25MaXN0PiB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlKSwgcXVlcnksIG1vZGVsKTtcbiAgfVxuXG4gIGdldChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8SUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0PiB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5nZXQodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IFN1cHByZXNzaW9uUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlSXRlbTx0eXBlb2YgbW9kZWw+KHJlc3BvbnNlLmJvZHksIG1vZGVsKSk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+IHtcbiAgICB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgIC8vIHN1cHBvcnRzIGFkZGluZyBtdWx0aXBsZSBzdXBwcmVzc2lvbnMgYnkgZGVmYXVsdFxuICAgIGxldCBwb3N0RGF0YTtcbiAgICBjb25zdCBpc0RhdGFBcnJheSA9IEFycmF5LmlzQXJyYXkoZGF0YSk7XG5cbiAgICBpZiAodHlwZSA9PT0gJ3doaXRlbGlzdHMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVXaGl0ZUxpc3QoZG9tYWluLCBkYXRhLCBpc0RhdGFBcnJheSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGUgPT09ICd1bnN1YnNjcmliZXMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVVbnN1YnNjcmliZShkb21haW4sIGRhdGEpO1xuICAgIH1cblxuICAgIGlmICghaXNEYXRhQXJyYXkpIHtcbiAgICAgIHBvc3REYXRhID0gW2RhdGFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3N0RGF0YSA9IFsuLi5kYXRhXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIEpTT04uc3RyaW5naWZ5KHBvc3REYXRhKSwgY3JlYXRlT3B0aW9ucylcbiAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgfVxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdD4ge1xuICAgIHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLmRlbGV0ZSh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSwgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogU3VwcHJlc3Npb25EZXN0cm95UmVzcG9uc2UpID0+ICh7XG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgICAgdmFsdWU6IHJlc3BvbnNlLmJvZHkudmFsdWUgfHwgJycsXG4gICAgICAgIGFkZHJlc3M6IHJlc3BvbnNlLmJvZHkuYWRkcmVzcyB8fCAnJyxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICAgIH0pKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN1cHByZXNzaW9uQ2xpZW50O1xuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJVW5zdWJzY3JpYmUgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBVbnN1YnNjcmliZURhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuXG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuc3Vic2NyaWJlIGV4dGVuZHMgU3VwcHJlc3Npb24gaW1wbGVtZW50cyBJVW5zdWJzY3JpYmUge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICB0YWdzOiBzdHJpbmdbXTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogVW5zdWJzY3JpYmVEYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5VTlNVQlNDUklCRVMpO1xuICAgICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgdGhpcy50YWdzID0gZGF0YS50YWdzO1xuICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IElXaGl0ZUxpc3QgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBXaGl0ZUxpc3REYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2hpdGVMaXN0IGV4dGVuZHMgU3VwcHJlc3Npb24gaW1wbGVtZW50cyBJV2hpdGVMaXN0IHtcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIHJlYXNvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFdoaXRlTGlzdERhdGEpIHtcbiAgICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLldISVRFTElTVFMpO1xuICAgICAgdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgICB0aGlzLnJlYXNvbiA9IGRhdGEucmVhc29uO1xuICAgICAgdGhpcy5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRBdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQge1xuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHQsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYkRhdGEsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0LFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3BvbnNlLFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFF1ZXJ5LFxuICBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGEsXG4gIENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVVwZGF0ZWQsXG4gIENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iXG59IGZyb20gJy4uLy4uL1R5cGVzL1ZhbGlkYXRpb25zL011bHRpcGxlVmFsaWRhdGlvbic7XG5pbXBvcnQgQXR0YWNobWVudHNIYW5kbGVyIGZyb20gJy4uL2NvbW1vbi9BdHRhY2htZW50c0hhbmRsZXInO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZVZhbGlkYXRpb25Kb2IgaW1wbGVtZW50cyBNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHQge1xuICBjcmVhdGVkQXQ6IERhdGU7XG4gIGlkOiBzdHJpbmc7XG4gIHF1YW50aXR5OiBudW1iZXJcbiAgcmVjb3Jkc1Byb2Nlc3NlZDogbnVtYmVyIHwgbnVsbDtcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIGRvd25sb2FkVXJsPzoge1xuICAgIGNzdjogc3RyaW5nO1xuICAgIGpzb246IHN0cmluZztcbiAgfTtcblxuICByZXNwb25zZVN0YXR1c0NvZGU6IG51bWJlcjtcbiAgc3VtbWFyeT86IHtcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICAgIGNhdGNoQWxsOiBudW1iZXI7XG4gICAgICAgICAgZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICBkb05vdFNlbmQ6IG51bWJlcjtcbiAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgfTtcbiAgICAgIHJpc2s6IHtcbiAgICAgICAgICBoaWdoOiBudW1iZXI7XG4gICAgICAgICAgbG93OiBudW1iZXI7XG4gICAgICAgICAgbWVkaXVtOiBudW1iZXI7XG4gICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uSm9iRGF0YSwgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXIpIHtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgdGhpcy5xdWFudGl0eSA9IGRhdGEucXVhbnRpdHk7XG4gICAgdGhpcy5yZWNvcmRzUHJvY2Vzc2VkID0gZGF0YS5yZWNvcmRzX3Byb2Nlc3NlZDtcbiAgICB0aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHRoaXMucmVzcG9uc2VTdGF0dXNDb2RlID0gcmVzcG9uc2VTdGF0dXNDb2RlO1xuICAgIGlmIChkYXRhLmRvd25sb2FkX3VybCkge1xuICAgICAgdGhpcy5kb3dubG9hZFVybCA9IHtcbiAgICAgICAgY3N2OiBkYXRhLmRvd25sb2FkX3VybD8uY3N2LFxuICAgICAgICBqc29uOiBkYXRhLmRvd25sb2FkX3VybD8uanNvblxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKGRhdGEuc3VtbWFyeSkge1xuICAgICAgdGhpcy5zdW1tYXJ5ID0ge1xuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICBjYXRjaEFsbDogZGF0YS5zdW1tYXJ5LnJlc3VsdC5jYXRjaF9hbGwsXG4gICAgICAgICAgZGVsaXZlcmFibGU6IGRhdGEuc3VtbWFyeS5yZXN1bHQuZGVsaXZlcmFibGUsXG4gICAgICAgICAgZG9Ob3RTZW5kOiBkYXRhLnN1bW1hcnkucmVzdWx0LmRvX25vdF9zZW5kLFxuICAgICAgICAgIHVuZGVsaXZlcmFibGU6IGRhdGEuc3VtbWFyeS5yZXN1bHQudW5kZWxpdmVyYWJsZSxcbiAgICAgICAgICB1bmtub3duOiBkYXRhLnN1bW1hcnkucmVzdWx0LnVua25vd25cbiAgICAgICAgfSxcbiAgICAgICAgcmlzazoge1xuICAgICAgICAgIGhpZ2g6IGRhdGEuc3VtbWFyeS5yaXNrLmhpZ2gsXG4gICAgICAgICAgbG93OiBkYXRhLnN1bW1hcnkucmlzay5sb3csXG4gICAgICAgICAgbWVkaXVtOiBkYXRhLnN1bW1hcnkucmlzay5tZWRpdW0sXG4gICAgICAgICAgdW5rbm93bjogZGF0YS5zdW1tYXJ5LnJpc2sudW5rbm93blxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PlxuICBpbXBsZW1lbnRzIElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwcml2YXRlIGF0dGFjaG1lbnRzSGFuZGxlcjogQXR0YWNobWVudHNIYW5kbGVyO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIgPSBuZXcgQXR0YWNobWVudHNIYW5kbGVyKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVJlc3BvbnNlPFQ+KHJlc3BvbnNlOiBBUElSZXNwb25zZSk6IFQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlPy5ib2R5XG4gICAgfSBhcyBUO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXNwb25zZSlcbiAgICA6IE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ7XG5cbiAgICBkYXRhLmpvYnMgPSByZXNwb25zZS5ib2R5LmpvYnMubWFwKChqb2IpID0+IG5ldyBNdWx0aXBsZVZhbGlkYXRpb25Kb2Ioam9iLCByZXNwb25zZS5zdGF0dXMpKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwaXZvdCcpO1xuICAgIGRhdGEudG90YWwgPSByZXNwb25zZS5ib2R5LnRvdGFsO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5PzogTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeSk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcygnL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsaycsIHF1ZXJ5KTtcbiAgfVxuXG4gIGFzeW5jIGdldChsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWApO1xuICAgIHJldHVybiBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uSm9iKHJlc3BvbnNlLmJvZHksIHJlc3BvbnNlLnN0YXR1cyk7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRUb0V4cGVjdGVkU2hhcGUoZGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhKVxuICAgIDogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhVXBkYXRlZCB7XG4gICAgbGV0IG11bHRpcGxlVmFsaWRhdGlvbkRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVVwZGF0ZWQ7XG4gICAgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGRhdGEuZmlsZSkpIHtcbiAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IGRhdGEuZmlsZSB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEuZmlsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IHsgZGF0YTogZGF0YS5maWxlIH0gfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKGRhdGEuZmlsZSkpIHtcbiAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IGRhdGEuZmlsZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbXVsdGlwbGVWYWxpZGF0aW9uRGF0YTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZShcbiAgICBsaXN0SWQ6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFcbiAgKTogUHJvbWlzZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgaWYgKCFkYXRhIHx8ICFkYXRhLmZpbGUpIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1wiZmlsZVwiIHByb3BlcnR5IGV4cGVjdGVkLicsICdNYWtlIHN1cmUgc2Vjb25kIGFyZ3VtZW50IGhhcyBcImZpbGVcIiBwcm9wZXJ0eS4nKTtcbiAgICB9XG4gICAgY29uc3QgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHRoaXMuY29udmVydFRvRXhwZWN0ZWRTaGFwZShkYXRhKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWAsIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEpO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlPENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3kobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWApO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlPENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPihyZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElWYWxpZGF0aW9uQ2xpZW50LCBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uUXVlcnksIFZhbGlkYXRpb25SZXN1bHQsIFZhbGlkYXRpb25SZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL1ZhbGlkYXRpb25zJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdGVDbGllbnQgaW1wbGVtZW50cyBJVmFsaWRhdGlvbkNsaWVudCB7XG4gIHB1YmxpYyBtdWx0aXBsZVZhbGlkYXRpb247XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50OiBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLm11bHRpcGxlVmFsaWRhdGlvbiA9IG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDtcbiAgfVxuXG4gIGFzeW5jIGdldChhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICBjb25zdCBxdWVyeTogVmFsaWRhdGlvblF1ZXJ5ID0geyBhZGRyZXNzIH07XG4gICAgY29uc3QgcmVzdWx0OiBWYWxpZGF0aW9uUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvYWRkcmVzcy92YWxpZGF0ZScsIHF1ZXJ5KTtcbiAgICByZXR1cm4gcmVzdWx0LmJvZHkgYXMgVmFsaWRhdGlvblJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHsgV2ViaG9va3NJZHMgfSBmcm9tICcuLi9FbnVtcyc7XG5pbXBvcnQgeyBJV2ViSG9va3NDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzL1dlYmhvb2tzJztcblxuaW1wb3J0IHtcbiAgV2ViaG9va1ZhbGlkYXRpb25SZXNwb25zZSxcbiAgV2ViaG9va0xpc3QsXG4gIFdlYmhvb2tSZXNwb25zZSxcbiAgV2ViaG9va3NRdWVyeSxcbiAgV2ViaG9va1Jlc3VsdFxufSBmcm9tICcuLi9UeXBlcy9XZWJob29rcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGNsYXNzIFdlYmhvb2sgaW1wbGVtZW50cyBXZWJob29rUmVzdWx0IHtcbiAgaWQ6IHN0cmluZztcbiAgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHVybHM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkLCB1cmxzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLnVybHMgPSB1cmxzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYmhvb2tzQ2xpZW50IGltcGxlbWVudHMgSVdlYkhvb2tzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlV2ViaG9va0xpc3QocmVzcG9uc2U6IHsgYm9keTogeyB3ZWJob29rczogV2ViaG9va0xpc3QgfSB9KTogV2ViaG9va0xpc3Qge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5LndlYmhvb2tzO1xuICB9XG5cbiAgX3BhcnNlV2ViaG9va1dpdGhJRChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNwb25zZTogV2ViaG9va1Jlc3BvbnNlKTogV2ViaG9va1Jlc3VsdCB7XG4gICAgICBjb25zdCB3ZWJob29rUmVzcG9uc2UgPSByZXNwb25zZT8uYm9keT8ud2ViaG9vaztcbiAgICAgIGxldCB1cmwgPSB3ZWJob29rUmVzcG9uc2U/LnVybDtcbiAgICAgIGxldCB1cmxzID0gd2ViaG9va1Jlc3BvbnNlPy51cmxzO1xuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgdXJsID0gdXJscyAmJiB1cmxzLmxlbmd0aFxuICAgICAgICAgID8gdXJsc1swXVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKCghdXJscyB8fCB1cmxzLmxlbmd0aCA9PT0gMCkgJiYgdXJsKSB7XG4gICAgICAgIHVybHMgPSBbdXJsXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgV2ViaG9vayhpZCwgdXJsLCB1cmxzIGFzIHN0cmluZ1tdKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VXZWJob29rVGVzdChyZXNwb25zZTogeyBib2R5OiB7IGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nIH0gfSlcbiAgOiB7Y29kZTogbnVtYmVyLCBtZXNzYWdlOnN0cmluZ30ge1xuICAgIHJldHVybiB7XG4gICAgICBjb2RlOiByZXNwb25zZS5ib2R5LmNvZGUsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICB9IGFzIFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2U7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeTogV2ViaG9va3NRdWVyeSk6IFByb21pc2U8V2ViaG9va0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rTGlzdCk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIGlkOiBXZWJob29rc0lkcyk6IFByb21pc2U8V2ViaG9va1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIGNyZWF0ZShkb21haW46IHN0cmluZyxcbiAgICBpZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIHRlc3QgPSBmYWxzZSk6IFByb21pc2U8V2ViaG9va1Jlc3VsdCB8IFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2U+IHtcbiAgICBpZiAodGVzdCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkLCAndGVzdCcpLCB7IHVybCB9KVxuICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tUZXN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCB7IGlkLCB1cmwgfSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgdXBkYXRlKGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nLCB1cmxWYWx1ZXM6IHN0cmluZyB8IHN0cmluZ1tdKTogUHJvbWlzZTxXZWJob29rUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSwgeyB1cmw6IHVybFZhbHVlcyB9KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nKSA6IFByb21pc2U8V2ViaG9va1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0IHsgQ3VzdG9tRmlsZSwgQ3VzdG9tRmlsZURhdGEgfSBmcm9tICcuLi8uLi9UeXBlcyc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvcic7XG5pbXBvcnQgeyBBdHRhY2htZW50SW5mbywgU3RyZWFtVmFsdWUgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXR0YWNobWVudHMnO1xuXG5jbGFzcyBCbG9iRnJvbVN0cmVhbSB7XG4gIHByaXZhdGUgX3N0cmVhbTogUmVhZGFibGVcbiAgc2l6ZTogbnVtYmVyXG5cbiAgY29uc3RydWN0b3Ioc3RyZWFtOiBSZWFkYWJsZSwgc2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3RyZWFtID0gc3RyZWFtO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gIH1cblxuICBzdHJlYW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmVhbTtcbiAgfVxuXG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gJ0Jsb2InO1xuICB9XG59XG5cbmNsYXNzIEF0dGFjaG1lbnRzSGFuZGxlciB7XG4gIHByaXZhdGUgZ2V0QXR0YWNobWVudE9wdGlvbnMoaXRlbToge1xuICAgIGZpbGVuYW1lPzogc3RyaW5nO1xuICAgIGNvbnRlbnRUeXBlPyA6IHN0cmluZztcbiAgICBrbm93bkxlbmd0aD86IG51bWJlcjtcbiAgfSk6IEF0dGFjaG1lbnRJbmZvIHtcbiAgICBjb25zdCB7XG4gICAgICBmaWxlbmFtZSxcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAga25vd25MZW5ndGgsXG4gICAgfSA9IGl0ZW07XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLihmaWxlbmFtZSA/IHsgZmlsZW5hbWUgfSA6IHsgZmlsZW5hbWU6ICdmaWxlJyB9KSxcbiAgICAgIC4uLihjb250ZW50VHlwZSAmJiB7IGNvbnRlbnRUeXBlIH0pLFxuICAgICAgLi4uKGtub3duTGVuZ3RoICYmIHsga25vd25MZW5ndGggfSlcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWxlSW5mbyhmaWxlOiBGaWxlKSB7IC8vIGJyb3dzZXIgY29tcGxpYW50IGZpbGVcbiAgICBjb25zdCB7XG4gICAgICBuYW1lOiBmaWxlbmFtZSxcbiAgICAgIHR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgc2l6ZToga25vd25MZW5ndGgsXG4gICAgfSA9IGZpbGU7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZSwgY29udGVudFR5cGUsIGtub3duTGVuZ3RoIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDdXN0b21GaWxlSW5mbyhmaWxlOiBDdXN0b21GaWxlKSB7IC8vIGN1c3RvbSBjcmVhdGVkIGZpbGVcbiAgICBjb25zdCB7XG4gICAgICBmaWxlbmFtZSxcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAga25vd25MZW5ndGgsXG4gICAgfSA9IGZpbGU7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZSwgY29udGVudFR5cGUsIGtub3duTGVuZ3RoIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRCdWZmZXJJbmZvKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgY29uc3Qge1xuICAgICAgYnl0ZUxlbmd0aDoga25vd25MZW5ndGgsXG4gICAgfSA9IGJ1ZmZlcjtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyh7IGZpbGVuYW1lOiAnZmlsZScsIGNvbnRlbnRUeXBlOiAnJywga25vd25MZW5ndGggfSk7XG4gIH1cblxuICBwdWJsaWMgaXNTdHJlYW0oZGF0YTogdW5rbm93bikgOiBkYXRhIGlzIFN0cmVhbVZhbHVlIHtcbiAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmIHR5cGVvZiAoZGF0YSBhcyBTdHJlYW1WYWx1ZSkucGlwZSA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIHB1YmxpYyBpc0N1c3RvbUZpbGUob2JqOiB1bmtub3duKTogb2JqIGlzIEN1c3RvbUZpbGUge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xuICAgICAgJiYgISEob2JqIGFzIEN1c3RvbUZpbGUpLmRhdGE7XG4gIH1cblxuICBwdWJsaWMgaXNCcm93c2VyRmlsZShvYmo6IHVua25vd24pOiBvYmogaXMgRmlsZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICghIShvYmogYXMgRmlsZSkubmFtZSB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0J1ZmZlcihkYXRhOiB1bmtub3duKTogZGF0YSBpcyBCdWZmZXIge1xuICAgIHJldHVybiB0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBCdWZmZXIuaXNCdWZmZXIoZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXR0YWNobWVudEluZm8oXG4gICAgYXR0YWNobWVudDogQ3VzdG9tRmlsZSB8IEZpbGUgfCBzdHJpbmcgfCBDdXN0b21GaWxlRGF0YVxuICApOiBBdHRhY2htZW50SW5mbyB7XG4gICAgY29uc3QgaXNCcm93c2VyRmlsZSA9IHRoaXMuaXNCcm93c2VyRmlsZShhdHRhY2htZW50KTtcbiAgICBjb25zdCBpc0N1c3RvbUZpbGUgPSB0aGlzLmlzQ3VzdG9tRmlsZShhdHRhY2htZW50KTtcbiAgICBjb25zdCBpc1N0cmluZyA9IHR5cGVvZiBhdHRhY2htZW50ID09PSAnc3RyaW5nJztcbiAgICBpZiAoIWlzU3RyaW5nKSB7XG4gICAgICBpZiAoaXNCcm93c2VyRmlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWxlSW5mbyhhdHRhY2htZW50IGFzIEZpbGUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIEJ1ZmZlci5pc0J1ZmZlcihhdHRhY2htZW50KSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWZmZXJJbmZvKGF0dGFjaG1lbnQgYXMgQnVmZmVyKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0N1c3RvbUZpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q3VzdG9tRmlsZUluZm8oYXR0YWNobWVudCBhcyBDdXN0b21GaWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zOiBBdHRhY2htZW50SW5mbyA9IHtcbiAgICAgIGZpbGVuYW1lOiAnZmlsZScsXG4gICAgICBjb250ZW50VHlwZTogdW5kZWZpbmVkLFxuICAgICAga25vd25MZW5ndGg6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgY29udmVydFRvRkRleHBlY3RlZFNoYXBlKFxuICAgIHVzZXJQcm92aWRlZFZhbHVlOiBDdXN0b21GaWxlIHwgRmlsZSB8IHN0cmluZyB8IEN1c3RvbUZpbGVEYXRhXG4gICkge1xuICAgIGNvbnN0IGlzU3RyZWFtID0gdGhpcy5pc1N0cmVhbSh1c2VyUHJvdmlkZWRWYWx1ZSk7XG4gICAgY29uc3QgaXNCcm93c2VyRmlsZSA9IHRoaXMuaXNCcm93c2VyRmlsZSh1c2VyUHJvdmlkZWRWYWx1ZSk7XG4gICAgY29uc3QgaXNDdXN0b21GaWxlID0gdGhpcy5pc0N1c3RvbUZpbGUodXNlclByb3ZpZGVkVmFsdWUpO1xuICAgIGNvbnN0IGlzU3RyaW5nID0gdHlwZW9mIHVzZXJQcm92aWRlZFZhbHVlID09PSAnc3RyaW5nJztcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChpc1N0cmVhbSB8fCBpc1N0cmluZyB8fCBpc0Jyb3dzZXJGaWxlIHx8IHRoaXMuaXNCdWZmZXIodXNlclByb3ZpZGVkVmFsdWUpKSB7XG4gICAgICByZXN1bHQgPSB1c2VyUHJvdmlkZWRWYWx1ZTtcbiAgICB9IGVsc2UgaWYgKGlzQ3VzdG9tRmlsZSkge1xuICAgICAgcmVzdWx0ID0gdXNlclByb3ZpZGVkVmFsdWUuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgYFVua25vd24gYXR0YWNobWVudCB0eXBlICR7dHlwZW9mIHVzZXJQcm92aWRlZFZhbHVlfWAsXG4gICAgICAgIGBUaGUgXCJhdHRhY2htZW50XCIgcHJvcGVydHkgZXhwZWN0cyBlaXRoZXIgQnVmZmVyLCBCbG9iLCBvciBTdHJpbmcuXG4gICAgICAgICAgQWxzbywgSXQgaXMgcG9zc2libGUgdG8gcHJvdmlkZSBhbiBvYmplY3QgdGhhdCBoYXMgdGhlIHByb3BlcnR5IFwiZGF0YVwiIHdpdGggYSB2YWx1ZSB0aGF0IGlzIGVxdWFsIHRvIG9uZSBvZiB0aGUgdHlwZXMgY291bnRlZCBiZWZvcmUuXG4gICAgICAgICAgQWRkaXRpb25hbGx5LCB5b3UgbWF5IHVzZSBhbiBhcnJheSB0byBzZW5kIG1vcmUgdGhhbiBvbmUgYXR0YWNobWVudC5gXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGdldEJsb2JGcm9tU3RyZWFtKHN0cmVhbTogUmVhZGFibGUsIHNpemU6IG51bWJlcik6IEJsb2JGcm9tU3RyZWFtIHtcbiAgICByZXR1cm4gbmV3IEJsb2JGcm9tU3RyZWFtKHN0cmVhbSwgc2l6ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXR0YWNobWVudHNIYW5kbGVyO1xuIiwiaW1wb3J0IHsgQVBJRXJyb3JPcHRpb25zLCBBUElFcnJvclR5cGUgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUElFcnJvciBleHRlbmRzIEVycm9yIGltcGxlbWVudHMgQVBJRXJyb3JUeXBlIHtcbiAgcHVibGljIHN0YXR1czogbnVtYmVyIDtcbiAgcHVibGljIHN0YWNrOiBzdHJpbmc7XG4gIHB1YmxpYyBkZXRhaWxzOiBzdHJpbmc7XG4gIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG5cbiAgcHVibGljIHN0YXRpYyBnZXRVc2VyRGF0YUVycm9yKHN0YXR1c1RleHQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKHtcbiAgICAgIHN0YXR1czogNDAwLFxuICAgICAgc3RhdHVzVGV4dCxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHN0YXR1cyxcbiAgICBzdGF0dXNUZXh0LFxuICAgIG1lc3NhZ2UsXG4gICAgYm9keSA9IHt9XG4gIH06IEFQSUVycm9yT3B0aW9ucykge1xuICAgIGxldCBib2R5TWVzc2FnZSA9ICcnO1xuICAgIGxldCBlcnJvciA9ICcnO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGJvZHlNZXNzYWdlID0gYm9keTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keU1lc3NhZ2UgPSBib2R5Py5tZXNzYWdlIHx8ICcnO1xuICAgICAgZXJyb3IgPSBib2R5Py5lcnJvciB8fCAnJztcbiAgICB9XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IGVycm9yIHx8IHN0YXR1c1RleHQgfHwgJyc7XG4gICAgdGhpcy5kZXRhaWxzID0gYm9keU1lc3NhZ2U7XG4gICAgdGhpcy50eXBlID0gJ01haWxndW5BUElFcnJvcic7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0IHsgRm9ybURhdGFJbnB1dCwgSW5wdXRGb3JtRGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvcic7XG5cbmltcG9ydCB7XG4gIEN1c3RvbUZpbGUsXG4gIEN1c3RvbUZpbGVEYXRhLFxuICBGb3JtRGF0YUlucHV0VmFsdWUsXG4gIE1lc3NhZ2VBdHRhY2htZW50LFxuICBNaW1lTWVzc2FnZVxufSBmcm9tICcuLi8uLi9UeXBlcyc7XG5pbXBvcnQgQXR0YWNobWVudHNIYW5kbGVyIGZyb20gJy4vQXR0YWNobWVudHNIYW5kbGVyJztcbmltcG9ydCB7IEF0dGFjaG1lbnRJbmZvIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0F0dGFjaG1lbnRzJztcblxuY2xhc3MgRm9ybURhdGFCdWlsZGVyIHtcbiAgcHJpdmF0ZSBGb3JtRGF0YUNvbnN0cnVjdG9yOiBJbnB1dEZvcm1EYXRhO1xuICBwcml2YXRlIGZpbGVLZXlzOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBhdHRhY2htZW50c0hhbmRsZXI6IEF0dGFjaG1lbnRzSGFuZGxlcjtcblxuICBjb25zdHJ1Y3RvcihGb3JtRGF0YUNvbnN0cnVjdG9yOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy5Gb3JtRGF0YUNvbnN0cnVjdG9yID0gRm9ybURhdGFDb25zdHJ1Y3RvcjtcbiAgICB0aGlzLmZpbGVLZXlzID0gWydhdHRhY2htZW50JywgJ2lubGluZScsICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJ107XG4gICAgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIgPSBuZXcgQXR0YWNobWVudHNIYW5kbGVyKCk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlRm9ybURhdGEoZGF0YTogRm9ybURhdGFJbnB1dCk6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgZGF0YSBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgZm9ybURhdGE6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZGF0YVtrZXldOyB9KVxuICAgICAgLnJlZHVjZSgoZm9ybURhdGFBY2M6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZUtleXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgIGNvbnN0IGF0dGFjaG1lbnRWYWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgICBpZiAodGhpcy5pc01lc3NhZ2VBdHRhY2htZW50KGF0dGFjaG1lbnRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRmlsZXNUb0ZEKGtleSwgYXR0YWNobWVudFZhbHVlLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgICAgICBgVW5rbm93biB2YWx1ZSAke2RhdGFba2V5XX0gd2l0aCB0eXBlICR7dHlwZW9mIGRhdGFba2V5XX0gZm9yIHByb3BlcnR5IFwiJHtrZXl9XCJgLFxuICAgICAgICAgICAgYFRoZSBrZXkgXCIke2tleX1cIiBzaG91bGQgaGF2ZSB0eXBlIG9mIEJ1ZmZlciwgU3RyZWFtLCBGaWxlLCBvciBTdHJpbmcgYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5ID09PSAnbWVzc2FnZScpIHsgLy8gbWltZSBtZXNzYWdlXG4gICAgICAgICAgY29uc3QgbWVzc2FnZVZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICAgIGlmICghbWVzc2FnZVZhbHVlIHx8ICF0aGlzLmlzTUlNRShtZXNzYWdlVmFsdWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAgICAgICBgVW5rbm93biBkYXRhIHR5cGUgZm9yIFwiJHtrZXl9XCIgcHJvcGVydHlgLFxuICAgICAgICAgICAgICAnVGhlIG1pbWUgZGF0YSBzaG91bGQgaGF2ZSB0eXBlIG9mIEJ1ZmZlciwgU3RyaW5nIG9yIEJsb2InXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZE1pbWVEYXRhVG9GRChrZXksIG1lc3NhZ2VWYWx1ZSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uUHJvcGVydHlUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgIH0sIG5ldyB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IoKSk7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRNaW1lRGF0YVRvRkQoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgZGF0YTogTWltZU1lc3NhZ2UsXG4gICAgZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykgeyAvLyBpZiBzdHJpbmcgb25seSB0d28gcGFyYW1ldGVycyBzaG91bGQgYmUgdXNlZC5cbiAgICAgIGZvcm1EYXRhSW5zdGFuY2UuYXBwZW5kKGtleSwgZGF0YSBhcyBzdHJpbmcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRm9ybURhdGFQYWNrYWdlKGZvcm1EYXRhSW5zdGFuY2UpKSB7IC8vIGZvcm0tZGF0YSBwYWNrYWdlIGlzIHVzZWRcbiAgICAgIGNvbnN0IG5vZGVGb3JtRGF0YSA9IGZvcm1EYXRhSW5zdGFuY2UgYXMgTm9kZUZvcm1EYXRhO1xuICAgICAgbm9kZUZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGEsIHsgZmlsZW5hbWU6ICdNaW1lTWVzc2FnZScgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBCbG9iICE9PSB1bmRlZmluZWQpIHsgLy8gZWl0aGVyIG5vZGUgPiAxOCBvciBicm93c2VyXG4gICAgICBjb25zdCBicm93c2VyRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlIGFzIEZvcm1EYXRhOyAvLyBCcm93c2VyIGNvbXBsaWFudCBGb3JtRGF0YVxuICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhLCAnTWltZU1lc3NhZ2UnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGRhdGEpKSB7IC8vIG5vZGUgZW52aXJvbm1lbnRcbiAgICAgICAgY29uc3QgYmxvYkluc3RhbmNlID0gbmV3IEJsb2IoW2RhdGFdKTtcbiAgICAgICAgYnJvd3NlckZvcm1EYXRhLmFwcGVuZChrZXksIGJsb2JJbnN0YW5jZSwgJ01pbWVNZXNzYWdlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzTUlNRShkYXRhOiB1bmtub3duKSA6IGRhdGEgaXMgTWltZU1lc3NhZ2Uge1xuICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZydcbiAgICAgIHx8ICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihkYXRhKVxuICAgICAgfHwgKHR5cGVvZiBSZWFkYWJsZVN0cmVhbSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YSBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNGb3JtRGF0YVBhY2thZ2Uob2JqOiB1bmtub3duKTogb2JqIGlzIE5vZGVGb3JtRGF0YSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG4gICAgICAmJiBvYmogIT09IG51bGxcbiAgICAgICYmIHR5cGVvZiAob2JqIGFzIE5vZGVGb3JtRGF0YSkuZ2V0SGVhZGVycyA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIHByaXZhdGUgaXNNZXNzYWdlQXR0YWNobWVudCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIE1lc3NhZ2VBdHRhY2htZW50IHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNDdXN0b21GaWxlKHZhbHVlKVxuICAgICAgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xuICAgICAgfHwgKHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpXG4gICAgICB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQmxvYilcbiAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKHZhbHVlKVxuICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0odmFsdWUpXG4gICAgICB8fCAoXG4gICAgICAgIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmV2ZXJ5KFxuICAgICAgICAgIChpdGVtKSA9PiB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0N1c3RvbUZpbGUoaXRlbSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSBpbnN0YW5jZW9mIEZpbGUpXG4gICAgICAgICAgICB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQmxvYilcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGl0ZW0pXG4gICAgICAgICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShpdGVtKVxuICAgICAgICApXG4gICAgICApXG5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRGaWxlc1RvRkQoXG4gICAgcHJvcGVydHlOYW1lOiB0eXBlb2YgdGhpcy5maWxlS2V5c1tudW1iZXJdLFxuICAgIHZhbHVlOiBNZXNzYWdlQXR0YWNobWVudCxcbiAgICBmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhcHBlbmRGaWxlVG9GRCA9IChcbiAgICAgIG9yaWdpbmFsS2V5OiBzdHJpbmcsXG4gICAgICBhdHRhY2htZW50OiBDdXN0b21GaWxlIHwgRmlsZSB8IHN0cmluZ3wgQ3VzdG9tRmlsZURhdGEsXG4gICAgICBmb3JtRGF0YTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgICApOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IG9yaWdpbmFsS2V5ID09PSAnbXVsdGlwbGVWYWxpZGF0aW9uRmlsZScgPyAnZmlsZScgOiBvcmlnaW5hbEtleTtcbiAgICAgIGNvbnN0IG9iakRhdGEgPSB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5jb252ZXJ0VG9GRGV4cGVjdGVkU2hhcGUoYXR0YWNobWVudCk7XG4gICAgICBjb25zdCBvcHRpb25zOiBBdHRhY2htZW50SW5mbyA9IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmdldEF0dGFjaG1lbnRJbmZvKGF0dGFjaG1lbnQpO1xuXG4gICAgICBpZiAodGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YSkpIHtcbiAgICAgICAgY29uc3QgZmQgPSBmb3JtRGF0YSBhcyBOb2RlRm9ybURhdGE7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0eXBlb2Ygb2JqRGF0YSA9PT0gJ3N0cmluZycgPyBCdWZmZXIuZnJvbShvYmpEYXRhKSA6IG9iakRhdGE7XG4gICAgICAgIGZkLmFwcGVuZChrZXksIGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkKSB7IC8vIGVpdGhlciBub2RlID4gMTggb3IgYnJvd3NlclxuICAgICAgICBjb25zdCBicm93c2VyRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlIGFzIEZvcm1EYXRhOyAvLyBCcm93c2VyIGNvbXBsaWFudCBGb3JtRGF0YVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqRGF0YSA9PT0gJ3N0cmluZycgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIob2JqRGF0YSkpIHtcbiAgICAgICAgICBjb25zdCBibG9iSW5zdGFuY2UgPSBuZXcgQmxvYihbb2JqRGF0YV0pO1xuICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBibG9iSW5zdGFuY2UsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYmpEYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBvYmpEYXRhLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0ob2JqRGF0YSkpIHtcbiAgICAgICAgICBjb25zdCBibG9iID0gdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuZ2V0QmxvYkZyb21TdHJlYW0oXG4gICAgICAgICAgICBvYmpEYXRhIGFzIHVua25vd24gYXMgUmVhZGFibGUsXG4gICAgICAgICAgICBvcHRpb25zLmtub3duTGVuZ3RoIGFzIG51bWJlclxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJvd3NlckZvcm1EYXRhLnNldChrZXksIGJsb2IgYXMgdW5rbm93biBhcyBGaWxlLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCBpdGVtLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBlbmRGaWxlVG9GRChwcm9wZXJ0eU5hbWUsIHZhbHVlLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZENvbW1vblByb3BlcnR5VG9GRChcbiAgICBrZXk6IHN0cmluZyxcbiAgICB2YWx1ZTogRm9ybURhdGFJbnB1dFZhbHVlLFxuICAgIGZvcm1EYXRhQWNjOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhZGRWYWx1ZUJhc2VkT25GRCA9IChmZEtleTogc3RyaW5nLCBmZFZhbHVlOiBGb3JtRGF0YUlucHV0VmFsdWUpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLmlzRm9ybURhdGFQYWNrYWdlKGZvcm1EYXRhQWNjKSkge1xuICAgICAgICBpZiAodHlwZW9mIGZkVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSByZWNlaXZlZCB2YWx1ZSBpcyBhbiBvYmplY3QuIFxcbidcbiAgICAgICAgICArICdcIkpTT04uU3RyaW5naWZ5XCIgd2lsbCBiZSB1c2VkIHRvIGF2b2lkIFR5cGVFcnJvciBcXG4nXG4gICAgICAgICAgKyAnVG8gcmVtb3ZlIHRoaXMgd2FybmluZzogXFxuJ1xuICAgICAgICAgICsgJ0NvbnNpZGVyIHN3aXRjaGluZyB0byBidWlsdC1pbiBGb3JtRGF0YSBvciBjb252ZXJ0aW5nIHRoZSB2YWx1ZSBvbiB5b3VyIG93bi5cXG4nKTtcbiAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBKU09OLnN0cmluZ2lmeShmZFZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgZmRWYWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGZkVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIGZkVmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBCbG9iICE9PSB1bmRlZmluZWQgJiYgZmRWYWx1ZSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgZmRWYWx1ZSk7XG4gICAgICB9XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAnVW5rbm93biB2YWx1ZSB0eXBlIGZvciBGb3JtIERhdGEuIFN0cmluZyBvciBCbG9iIGV4cGVjdGVkJyxcbiAgICAgICAgJ0Jyb3dzZXIgY29tcGxpYW50IEZvcm1EYXRhIGFsbG93cyBvbmx5IHN0cmluZyBvciBCbG9iIHZhbHVlcyBmb3IgcHJvcGVydGllcyB0aGF0IGFyZSBub3QgYXR0YWNobWVudHMuJ1xuICAgICAgKTtcbiAgICB9O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOiBGb3JtRGF0YUlucHV0VmFsdWUpIHtcbiAgICAgICAgYWRkVmFsdWVCYXNlZE9uRkQoa2V5LCBpdGVtKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgYWRkVmFsdWVCYXNlZE9uRkQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBGb3JtRGF0YUJ1aWxkZXI7XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvcic7XG5cbmltcG9ydCB7XG4gIFBhZ2VzTGlzdEFjY3VtdWxhdG9yLFxuICBQYXJzZWRQYWdlLFxuICBQYXJzZWRQYWdlc0xpc3QsXG4gIFF1ZXJ5V2l0aFBhZ2UsXG4gIFJlc3BvbnNlV2l0aFBhZ2luZyxcbiAgVXBkYXRlZFVybEFuZFF1ZXJ5LFxuICBBUElFcnJvck9wdGlvbnNcbn0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcbmltcG9ydCB7XG4gIElCb3VuY2UsXG4gIElDb21wbGFpbnQsXG4gIElVbnN1YnNjcmliZSxcbiAgSVdoaXRlTGlzdFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL1JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgU3VwcHJlc3Npb25EYXRhVHlwZVxufSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBOYXZpZ2F0aW9uVGhydVBhZ2VzIDxUPiB7XG4gIHJlcXVlc3Q/OiBSZXF1ZXN0O1xuICBjb25zdHJ1Y3RvcihyZXF1ZXN0PzogUmVxdWVzdCkge1xuICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZVBhZ2UoXG4gICAgaWQ6IHN0cmluZyxcbiAgICBwYWdlVXJsOiBzdHJpbmcsXG4gICAgdXJsU2VwYXJhdG9yOiBzdHJpbmcsXG4gICAgaXRlcmF0b3JOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgKSA6IFBhcnNlZFBhZ2Uge1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwocGFnZVVybCk7XG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IHBhcnNlZFVybDtcblxuICAgIGNvbnN0IHBhZ2VWYWx1ZSA9IHBhZ2VVcmwgJiYgdHlwZW9mIHBhZ2VVcmwgPT09ICdzdHJpbmcnID8gcGFnZVVybC5zcGxpdCh1cmxTZXBhcmF0b3IpLnBvcCgpIHx8ICcnIDogJyc7XG4gICAgbGV0IGl0ZXJhdG9yUG9zaXRpb24gPSBudWxsO1xuICAgIGlmIChpdGVyYXRvck5hbWUpIHtcbiAgICAgIGl0ZXJhdG9yUG9zaXRpb24gPSBzZWFyY2hQYXJhbXMuaGFzKGl0ZXJhdG9yTmFtZSlcbiAgICAgICAgPyBzZWFyY2hQYXJhbXMuZ2V0KGl0ZXJhdG9yTmFtZSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpZCxcbiAgICAgIHBhZ2U6IHVybFNlcGFyYXRvciA9PT0gJz8nID8gYD8ke3BhZ2VWYWx1ZX1gIDogcGFnZVZhbHVlLFxuICAgICAgaXRlcmF0b3JQb3NpdGlvbixcbiAgICAgIHVybDogcGFnZVVybFxuICAgIH0gYXMgUGFyc2VkUGFnZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZVBhZ2VMaW5rcyhcbiAgICByZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nLFxuICAgIHVybFNlcGFyYXRvcjogc3RyaW5nLFxuICAgIGl0ZXJhdG9yTmFtZT86IHN0cmluZ1xuICApOiBQYXJzZWRQYWdlc0xpc3Qge1xuICAgIGNvbnN0IHBhZ2VzID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuYm9keS5wYWdpbmcpO1xuICAgIHJldHVybiBwYWdlcy5yZWR1Y2UoXG4gICAgICAoYWNjOiBQYWdlc0xpc3RBY2N1bXVsYXRvciwgW2lkLCBwYWdlVXJsXTogWyBpZDogc3RyaW5nLCBwYWdlVXJsOiBzdHJpbmddKSA9PiB7XG4gICAgICAgIGFjY1tpZF0gPSB0aGlzLnBhcnNlUGFnZShpZCwgcGFnZVVybCwgdXJsU2VwYXJhdG9yLCBpdGVyYXRvck5hbWUpO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge31cbiAgICApIGFzIHVua25vd24gYXMgUGFyc2VkUGFnZXNMaXN0O1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVVcmxBbmRRdWVyeShjbGllbnRVcmw6IHN0cmluZywgcXVlcnk/OiBRdWVyeVdpdGhQYWdlKTogVXBkYXRlZFVybEFuZFF1ZXJ5IHtcbiAgICBsZXQgdXJsID0gY2xpZW50VXJsO1xuICAgIGNvbnN0IHF1ZXJ5Q29weSA9IHsgLi4ucXVlcnkgfTtcbiAgICBpZiAocXVlcnlDb3B5LnBhZ2UpIHtcbiAgICAgIHVybCA9IHVybGpvaW4oY2xpZW50VXJsLCBxdWVyeUNvcHkucGFnZSk7XG4gICAgICBkZWxldGUgcXVlcnlDb3B5LnBhZ2U7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB1cmwsXG4gICAgICB1cGRhdGVkUXVlcnk6IHF1ZXJ5Q29weVxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgcmVxdWVzdExpc3RXaXRoUGFnZXMoY2xpZW50VXJsOnN0cmluZywgcXVlcnk/OiBRdWVyeVdpdGhQYWdlLCBNb2RlbD86IHtcbiAgICBuZXcoZGF0YTogU3VwcHJlc3Npb25EYXRhVHlwZSk6XG4gICAgSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0XG4gIH0pOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCB7IHVybCwgdXBkYXRlZFF1ZXJ5IH0gPSB0aGlzLnVwZGF0ZVVybEFuZFF1ZXJ5KGNsaWVudFVybCwgcXVlcnkpO1xuICAgIGlmICh0aGlzLnJlcXVlc3QpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZVdpdGhQYWdpbmcgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHVybCwgdXBkYXRlZFF1ZXJ5KTtcbiAgICAgIC8vIE1vZGVsIGhlcmUgaXMgdXN1YWxseSB1bmRlZmluZWQgZXhjZXB0IGZvciBTdXBwcmVzc2lvbiBDbGllbnRcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSwgTW9kZWwpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgc3RhdHVzOiA1MDAsXG4gICAgICBzdGF0dXNUZXh0OiAnUmVxdWVzdCBwcm9wZXJ0eSBpcyBlbXB0eScsXG4gICAgICBib2R5OiB7IG1lc3NhZ2U6ICcnIH1cbiAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcGFyc2VMaXN0KHJlc3BvbnNlOiBSZXNwb25zZVdpdGhQYWdpbmcsIE1vZGVsPzoge1xuICAgIG5ldyhkYXRhOiBTdXBwcmVzc2lvbkRhdGFUeXBlKTpcbiAgICBJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3RcbiAgfSk6IFQ7XG59XG4iLCJpbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSAnYmFzZS02NCc7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgYXhpb3MsIHtcbiAgQXhpb3NFcnJvcixcbiAgQXhpb3NSZXNwb25zZSxcbiAgQXhpb3NIZWFkZXJzLFxuICBSYXdBeGlvc1JlcXVlc3RIZWFkZXJzLFxuICBBeGlvc1Byb3h5Q29uZmlnLFxufSBmcm9tICdheGlvcyc7XG5pbXBvcnQgKiBhcyBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yJztcbmltcG9ydCB7XG4gIE9uQ2FsbFJlcXVlc3RPcHRpb25zLFxuICBSZXF1ZXN0T3B0aW9ucyxcbiAgQVBJRXJyb3JPcHRpb25zLFxuICBJbnB1dEZvcm1EYXRhLFxuICBBUElSZXNwb25zZSxcbiAgSXBQb29sRGVsZXRlRGF0YSxcbiAgRm9ybURhdGFJbnB1dFxufSBmcm9tICcuLi8uLi9UeXBlcyc7XG5cbmltcG9ydCBGb3JtRGF0YUJ1aWxkZXIgZnJvbSAnLi9Gb3JtRGF0YUJ1aWxkZXInO1xuaW1wb3J0IFN1YmFjY291bnRzQ2xpZW50IGZyb20gJy4uL1N1YmFjY291bnRzJztcblxuY2xhc3MgUmVxdWVzdCB7XG4gIHByaXZhdGUgdXNlcm5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBrZXk6IHN0cmluZztcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZztcbiAgcHJpdmF0ZSB0aW1lb3V0OiBudW1iZXI7XG4gIHByaXZhdGUgaGVhZGVyczogQXhpb3NIZWFkZXJzO1xuICBwcml2YXRlIGZvcm1EYXRhQnVpbGRlcjogRm9ybURhdGFCdWlsZGVyO1xuICBwcml2YXRlIG1heEJvZHlMZW5ndGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBwcm94eTogQXhpb3NQcm94eUNvbmZpZyB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucywgZm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLnVzZXJuYW1lID0gb3B0aW9ucy51c2VybmFtZTtcbiAgICB0aGlzLmtleSA9IG9wdGlvbnMua2V5O1xuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgYXMgc3RyaW5nO1xuICAgIHRoaXMudGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcbiAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLm1ha2VIZWFkZXJzRnJvbU9iamVjdChvcHRpb25zLmhlYWRlcnMpO1xuICAgIHRoaXMuZm9ybURhdGFCdWlsZGVyID0gbmV3IEZvcm1EYXRhQnVpbGRlcihmb3JtRGF0YSk7XG4gICAgdGhpcy5tYXhCb2R5TGVuZ3RoID0gNTI0Mjg4MDA7IC8vIDUwIE1CXG4gICAgdGhpcy5wcm94eSA9IG9wdGlvbnM/LnByb3h5O1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdChcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBvbkNhbGxPcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IG9wdGlvbnM6IE9uQ2FsbFJlcXVlc3RPcHRpb25zID0geyAuLi5vbkNhbGxPcHRpb25zIH07XG4gICAgZGVsZXRlIG9wdGlvbnM/LmhlYWRlcnM7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSB0aGlzLmpvaW5BbmRUcmFuc2Zvcm1IZWFkZXJzKG9uQ2FsbE9wdGlvbnMpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4ub3B0aW9ucyB9O1xuXG4gICAgaWYgKG9wdGlvbnM/LnF1ZXJ5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9wdGlvbnM/LnF1ZXJ5KS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJhbXMucGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhvcHRpb25zLnF1ZXJ5KTtcbiAgICAgIGRlbGV0ZSBwYXJhbXMucXVlcnk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmJvZHkpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSBvcHRpb25zPy5ib2R5O1xuICAgICAgcGFyYW1zLmRhdGEgPSBib2R5O1xuICAgICAgZGVsZXRlIHBhcmFtcy5ib2R5O1xuICAgIH1cbiAgICBsZXQgcmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U7XG4gICAgY29uc3QgdXJsVmFsdWUgPSB1cmxqb2luKHRoaXMudXJsLCB1cmwpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucmVxdWVzdCh7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLnRvTG9jYWxlVXBwZXJDYXNlKCksXG4gICAgICAgIHRpbWVvdXQ6IHRoaXMudGltZW91dCxcbiAgICAgICAgdXJsOiB1cmxWYWx1ZSxcbiAgICAgICAgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMsXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgICAgbWF4Qm9keUxlbmd0aDogdGhpcy5tYXhCb2R5TGVuZ3RoLFxuICAgICAgICBwcm94eTogdGhpcy5wcm94eSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IGVyciBhcyBBeGlvc0Vycm9yO1xuXG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IGVycm9yUmVzcG9uc2U/LnJlc3BvbnNlPy5zdGF0dXMgfHwgNDAwLFxuICAgICAgICBzdGF0dXNUZXh0OiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uc3RhdHVzVGV4dCB8fCBlcnJvclJlc3BvbnNlLmNvZGUsXG4gICAgICAgIGJvZHk6IGVycm9yUmVzcG9uc2U/LnJlc3BvbnNlPy5kYXRhIHx8IGVycm9yUmVzcG9uc2UubWVzc2FnZVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlKTtcbiAgICByZXR1cm4gcmVzIGFzIEFQSVJlc3BvbnNlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRSZXNwb25zZUJvZHkocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2UpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzID0ge1xuICAgICAgYm9keToge30sXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlPy5zdGF0dXNcbiAgICB9IGFzIEFQSVJlc3BvbnNlO1xuXG4gICAgaWYgKHR5cGVvZiByZXNwb25zZS5kYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgPT09ICdNYWlsZ3VuIE1hZ25pZmljZW50IEFQSScpIHtcbiAgICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgICBzdGF0dXNUZXh0OiAnSW5jb3JyZWN0IHVybCcsXG4gICAgICAgICAgYm9keTogcmVzcG9uc2UuZGF0YVxuICAgICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgICB9XG4gICAgICByZXMuYm9keSA9IHtcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuZGF0YVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLmJvZHkgPSByZXNwb25zZS5kYXRhO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBqb2luQW5kVHJhbnNmb3JtSGVhZGVycyhcbiAgICBvbkNhbGxPcHRpb25zPzogT25DYWxsUmVxdWVzdE9wdGlvbnNcbiAgKTogQXhpb3NIZWFkZXJzIHtcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IG5ldyBBeGlvc0hlYWRlcnMoKTtcblxuICAgIGNvbnN0IGJhc2ljID0gYmFzZTY0LmVuY29kZShgJHt0aGlzLnVzZXJuYW1lfToke3RoaXMua2V5fWApO1xuICAgIHJlcXVlc3RIZWFkZXJzLnNldEF1dGhvcml6YXRpb24oYEJhc2ljICR7YmFzaWN9YCk7XG4gICAgcmVxdWVzdEhlYWRlcnMuc2V0KHRoaXMuaGVhZGVycyk7XG5cbiAgICBjb25zdCByZWNlaXZlZE9uQ2FsbEhlYWRlcnMgPSBvbkNhbGxPcHRpb25zICYmIG9uQ2FsbE9wdGlvbnMuaGVhZGVycztcbiAgICBjb25zdCBvbkNhbGxIZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3QocmVjZWl2ZWRPbkNhbGxIZWFkZXJzKTtcbiAgICByZXF1ZXN0SGVhZGVycy5zZXQob25DYWxsSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlcXVlc3RIZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlSGVhZGVyc0Zyb21PYmplY3QoXG4gICAgaGVhZGVyc09iamVjdDogUmF3QXhpb3NSZXF1ZXN0SGVhZGVycyA9IHt9XG4gICk6IEF4aW9zSGVhZGVycyB7XG4gICAgbGV0IHJlcXVlc3RIZWFkZXJzID0gbmV3IEF4aW9zSGVhZGVycygpO1xuICAgIHJlcXVlc3RIZWFkZXJzID0gT2JqZWN0LmVudHJpZXMoaGVhZGVyc09iamVjdCkucmVkdWNlKFxuICAgICAgKGhlYWRlcnNBY2N1bXVsYXRvcjogQXhpb3NIZWFkZXJzLCBjdXJyZW50UGFpcikgPT4ge1xuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBjdXJyZW50UGFpcjtcbiAgICAgICAgaGVhZGVyc0FjY3VtdWxhdG9yLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGhlYWRlcnNBY2N1bXVsYXRvcjtcbiAgICAgIH0sIHJlcXVlc3RIZWFkZXJzXG4gICAgKTtcbiAgICByZXR1cm4gcmVxdWVzdEhlYWRlcnM7XG4gIH1cblxuICBzZXRTdWJhY2NvdW50SGVhZGVyKHN1YmFjY291bnRJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgaGVhZGVycyA9IHRoaXMubWFrZUhlYWRlcnNGcm9tT2JqZWN0KHtcbiAgICAgIC4uLnRoaXMuaGVhZGVycyxcbiAgICAgIFtTdWJhY2NvdW50c0NsaWVudC5TVUJBQ0NPVU5UX0hFQURFUl06IHN1YmFjY291bnRJZFxuICAgIH0pO1xuICAgIHRoaXMuaGVhZGVycy5zZXQoaGVhZGVycyk7XG4gIH1cblxuICByZXNldFN1YmFjY291bnRIZWFkZXIoKTogdm9pZCB7XG4gICAgdGhpcy5oZWFkZXJzLmRlbGV0ZShTdWJhY2NvdW50c0NsaWVudC5TVUJBQ0NPVU5UX0hFQURFUik7XG4gIH1cblxuICBxdWVyeShcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBxdWVyeT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgQXJyYXk8QXJyYXk8c3RyaW5nPj4sXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB7IHF1ZXJ5LCAuLi5vcHRpb25zIH0pO1xuICB9XG5cbiAgY29tbWFuZChcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdIHwgc3RyaW5nIHwgTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEsXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICAgIGFkZERlZmF1bHRIZWFkZXJzID0gdHJ1ZVxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgbGV0IGhlYWRlcnMgPSB7fTtcbiAgICBpZiAoYWRkRGVmYXVsdEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMgPSB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9O1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIC4uLmhlYWRlcnMsXG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIHJlcXVlc3RPcHRpb25zXG4gICAgKTtcbiAgfVxuXG4gIGdldChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBxdWVyeT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgQXJyYXk8QXJyYXk8c3RyaW5nPj4sXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeSgnZ2V0JywgdXJsLCBxdWVyeSwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0KFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHN0cmluZyxcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdFdpdGhGRChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhOiBGb3JtRGF0YUlucHV0XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHB1dFdpdGhGRCh1cmw6IHN0cmluZywgZGF0YTogRm9ybURhdGFJbnB1dCk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcGF0Y2hXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IEZvcm1EYXRhSW5wdXQpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwYXRjaCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcHV0KHVybDogc3RyaW5nLCBkYXRhPzogRm9ybURhdGFJbnB1dCB8IHN0cmluZywgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxuICA6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgZGVsZXRlKHVybDogc3RyaW5nLCBkYXRhPzogSXBQb29sRGVsZXRlRGF0YSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdkZWxldGUnLCB1cmwsIGRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVlc3Q7XG4iLCJleHBvcnQgZW51bSBSZXNvbHV0aW9uIHtcbiAgICBIT1VSID0gJ2hvdXInLFxuICAgIERBWSA9ICdkYXknLFxuICAgIE1PTlRIID0gJ21vbnRoJ1xufVxuXG5leHBvcnQgZW51bSBTdXBwcmVzc2lvbk1vZGVscyB7XG4gICAgQk9VTkNFUyA9ICdib3VuY2VzJyxcbiAgICBDT01QTEFJTlRTID0gJ2NvbXBsYWludHMnLFxuICAgIFVOU1VCU0NSSUJFUyA9ICd1bnN1YnNjcmliZXMnLFxuICAgIFdISVRFTElTVFMgPSAnd2hpdGVsaXN0cydcbn1cblxuZXhwb3J0IGVudW0gV2ViaG9va3NJZHMge1xuICAgIENMSUNLRUQgPSAnY2xpY2tlZCcsXG4gICAgQ09NUExBSU5FRCA9ICdjb21wbGFpbmVkJyxcbiAgICBERUxJVkVSRUQgPSAnZGVsaXZlcmVkJyxcbiAgICBPUEVORUQgPSAnb3BlbmVkJyxcbiAgICBQRVJNQU5FTlRfRkFJTCA9ICdwZXJtYW5lbnRfZmFpbCcsXG4gICAgVEVNUE9SQVJZX0ZBSUwgPSAndGVtcG9yYXJ5X2ZhaWwnLFxuICAgIFVOU1VCU0NSSUJFRCA9ICd1bnN1YnNjcmliZScsXG59XG5cbmV4cG9ydCBlbnVtIFllc05vIHtcbiAgICBZRVMgPSAneWVzJyxcbiAgICBOTyA9ICdubydcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgSUxvZ2dlciB7XG4gIHdhcm4obWVzc2FnZTogc3RyaW5nKTogdm9pZFxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Mb2dnZXInO1xuIiwiaW1wb3J0IHtcbiAgRG9tYWluQ3JlZGVudGlhbHMsXG4gIERvbWFpbkNyZWRlbnRpYWxzTGlzdCxcbiAgRG9tYWluQ3JlZGVudGlhbHNRdWVyeSxcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQsXG4gIFVwZGF0ZURvbWFpbkNyZWRlbnRpYWxzRGF0YVxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluQ3JlZGVudGlhbHMge1xuICAgIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5OiBEb21haW5DcmVkZW50aWFsc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc0xpc3Q+XG4gICAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBEb21haW5DcmVkZW50aWFsc1xuICAgICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+XG4gICAgdXBkYXRlKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nLFxuICAgICAgICBkYXRhOiBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbiAgICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PlxuICAgIGRlc3Ryb3koXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PlxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgeyBSZXNvbHV0aW9uIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHtcbiAgRG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ3NJdGVtLFxuICBEb21haW5UYWdzTGlzdCxcbiAgRG9tYWluVGFnc01lc3NhZ2VSZXMsXG4gIERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSxcbiAgRG9tYWluVGFnU3RhdGlzdGljSXRlbVxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0IHtcbiAgICB0YWc6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHN0YXJ0OiBEYXRlO1xuICAgIGVuZDogRGF0ZTtcbiAgICByZXNvbHV0aW9uOiBSZXNvbHV0aW9uO1xuICAgIHN0YXRzOiBEb21haW5UYWdTdGF0aXN0aWNJdGVtW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpblRhZ3NDbGllbnQge1xuICAgIGxpc3QoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NMaXN0PlxuICAgIGdldChkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NJdGVtPlxuICAgIHVwZGF0ZShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nLFxuICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz5cbiAgICBkZXN0cm95KFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGFnOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPlxuICAgIHN0YXRpc3RpYyhcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nLFxuICAgICAgICBxdWVyeTogRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5XG4gICAgKTogUHJvbWlzZTxJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0PlxuICAgIGNvdW50cmllcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uPlxuICAgIHByb3ZpZGVycyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uPlxuICAgIGRldmljZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24+XG59XG4iLCJpbXBvcnQge1xuICBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQsXG4gIERvbWFpblRlbXBsYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVzUXVlcnksXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YSxcbiAgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdCxcbiAgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQsXG4gIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgTm90aWZpY2F0aW9uUmVzdWx0LFxuICBTaG9ydFRlbXBsYXRlVmVyc2lvbixcbiAgVGVtcGxhdGVRdWVyeSxcbiAgVGVtcGxhdGVWZXJzaW9uLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5UZW1wbGF0ZSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBzdHJpbmcgfCBEYXRlO1xuICAgIGNyZWF0ZWRCeTogc3RyaW5nO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdmVyc2lvbj86IFRlbXBsYXRlVmVyc2lvbjtcbiAgICB2ZXJzaW9ucz86IFNob3J0VGVtcGxhdGVWZXJzaW9uW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpblRlbXBsYXRlc0NsaWVudCB7XG4gICAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5UZW1wbGF0ZXNRdWVyeSk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdD5cbiAgICBnZXQoZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nLCBxdWVyeT86IFRlbXBsYXRlUXVlcnkpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT5cbiAgICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERvbWFpblRlbXBsYXRlRGF0YSk6IFByb21pc2U8SURvbWFpblRlbXBsYXRlPlxuICAgIHVwZGF0ZShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgICAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGFcbiAgICApOiBQcm9taXNlPFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ+XG4gICAgZGVzdHJveShkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ+XG4gICAgZGVzdHJveUFsbChkb21haW46IHN0cmluZyk6IFByb21pc2U8Tm90aWZpY2F0aW9uUmVzdWx0PlxuICAgIGNyZWF0ZVZlcnNpb24oXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgZGF0YTogRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YVxuICAgICkgOiBQcm9taXNlPENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD5cbiAgICBnZXRWZXJzaW9uKGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT5cbiAgICB1cGRhdGVWZXJzaW9uKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nLFxuICAgICAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhXG4gICAgKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+XG4gICAgZGVzdHJveVZlcnNpb24oXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgdGFnOiBzdHJpbmcpOiBQcm9taXNlPE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD5cbiAgICBsaXN0VmVyc2lvbnMoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgcXVlcnk/OiBEb21haW5UZW1wbGF0ZXNRdWVyeSk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQ+XG59XG4iLCJpbXBvcnQge1xuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBHZW5lcmF0ZURvbWFpblRyYWNraW5nQ2VydGlmaWNhdGVSZXNwb25zZSxcbiAgR2V0RG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBSZWdlbmVyYXRlRG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlLFxuICBVbnN1YnNjcmliZVRyYWNraW5nSW5mbyxcbiAgVXBkYXRlZE9wZW5UcmFja2luZyxcbn0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5UcmFja2luZ0NsaWVudCB7XG4gIGdldChkb21haW46IHN0cmluZyk6IFByb21pc2U8R2V0RG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlPlxuICBnZW5lcmF0ZShkb21haW46IHN0cmluZyk6IFByb21pc2U8R2VuZXJhdGVEb21haW5UcmFja2luZ0NlcnRpZmljYXRlUmVzcG9uc2U+XG4gIHJlZ2VuZXJhdGUoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPFJlZ2VuZXJhdGVEb21haW5UcmFja2luZ0NlcnRpZmljYXRlUmVzcG9uc2U+XG4gIGdldFRyYWNraW5nKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UcmFja2luZ0RhdGE+XG4gIHVwZGF0ZVRyYWNraW5nKFxuICAgICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICAgIHR5cGU6IHN0cmluZyxcbiAgICAgICAgICBkYXRhOiBPcGVuVHJhY2tpbmdJbmZvIHwgQ2xpY2tUcmFja2luZ0luZm8gfCBVbnN1YnNjcmliZVRyYWNraW5nSW5mb1xuICAgICAgKTogUHJvbWlzZTxVcGRhdGVkT3BlblRyYWNraW5nPlxufVxuIiwiaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuaW1wb3J0IHtcbiAgQ2xpY2tUcmFja2luZ0luZm8sXG4gIENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIERLSU1TZWxlY3RvckluZm8sXG4gIERvbWFpbkdldFF1ZXJ5LFxuICBEb21haW5JbmZvLFxuICBEb21haW5zUXVlcnksXG4gIERvbWFpblRyYWNraW5nRGF0YSxcbiAgRG9tYWluVXBkYXRlSW5mbyxcbiAgTWVzc2FnZVJlc3BvbnNlLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBSZXBsYWNlbWVudEZvclBvb2wsXG4gIFREb21haW4sXG4gIFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvLFxuICBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzLFxuICBVcGRhdGVkREtJTUF1dGhvcml0eSxcbiAgVXBkYXRlZERLSU1TZWxlY3RvclJlc3VsdCxcbiAgVXBkYXRlZE9wZW5UcmFja2luZyxcbiAgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlLFxuICBXZWJQcmVmaXhJbmZvXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG5pbXBvcnQgeyBJRG9tYWluQ3JlZGVudGlhbHMgfSBmcm9tICcuL0RvbWFpbkNyZWRlbnRpYWxzJztcbmltcG9ydCB7IElEb21haW5UYWdzQ2xpZW50IH0gZnJvbSAnLi9Eb21haW5UYWdzJztcbmltcG9ydCB7IElEb21haW5UZW1wbGF0ZXNDbGllbnQgfSBmcm9tICcuL0RvbWFpblRlbXBsYXRlcyc7XG5pbXBvcnQgeyBJRG9tYWluVHJhY2tpbmdDbGllbnQgfSBmcm9tICcuL0RvbWFpblRyYWNraW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluc0NsaWVudCB7XG4gICAgZG9tYWluQ3JlZGVudGlhbHM6IElEb21haW5DcmVkZW50aWFscztcbiAgICBkb21haW5UZW1wbGF0ZXM6IElEb21haW5UZW1wbGF0ZXNDbGllbnQ7XG4gICAgZG9tYWluVGFnczogSURvbWFpblRhZ3NDbGllbnQ7XG4gICAgZG9tYWluVHJhY2tpbmc6IElEb21haW5UcmFja2luZ0NsaWVudDtcbiAgICBsaXN0KHF1ZXJ5PzogRG9tYWluc1F1ZXJ5KTogUHJvbWlzZTxURG9tYWluW10+XG4gICAgZ2V0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpbkdldFF1ZXJ5KTogUHJvbWlzZTxURG9tYWluPlxuICAgIGNyZWF0ZShkYXRhOiBEb21haW5JbmZvKTogUHJvbWlzZTxURG9tYWluPlxuICAgIHVwZGF0ZShkb21haW46IHN0cmluZywgZGF0YTogRG9tYWluVXBkYXRlSW5mbyk6IFByb21pc2U8VERvbWFpbj5cbiAgICB2ZXJpZnkoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPFREb21haW4+XG4gICAgZGVzdHJveShkb21haW46IHN0cmluZyk6IFByb21pc2U8TWVzc2FnZVJlc3BvbnNlPlxuICAgIGdldENvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPENvbm5lY3Rpb25TZXR0aW5ncz5cbiAgICB1cGRhdGVDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBDb25uZWN0aW9uU2V0dGluZ3MpOiBQcm9taXNlPFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3M+XG4gICAgZ2V0VHJhY2tpbmcoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRyYWNraW5nRGF0YT5cbiAgICB1cGRhdGVUcmFja2luZyhcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHR5cGU6IHN0cmluZyxcbiAgICAgICAgZGF0YTogT3BlblRyYWNraW5nSW5mbyB8IENsaWNrVHJhY2tpbmdJbmZvIHwgVW5zdWJzY3JpYmVUcmFja2luZ0luZm9cbiAgICApOiBQcm9taXNlPFVwZGF0ZWRPcGVuVHJhY2tpbmc+XG4gICAgZ2V0SXBzKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT5cbiAgICBhc3NpZ25JcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+XG4gICAgZGVsZXRlSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICBsaW5rSXBQb29sKGRvbWFpbjogc3RyaW5nLCBwb29sX2lkOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPlxuICAgIHVubGlua0lwUG9sbChkb21haW46IHN0cmluZywgcmVwbGFjZW1lbnQ6IFJlcGxhY2VtZW50Rm9yUG9vbCk6IFByb21pc2U8QVBJUmVzcG9uc2U+XG4gICAgdXBkYXRlREtJTUF1dGhvcml0eShkb21haW46IHN0cmluZywgZGF0YTogREtJTUF1dGhvcml0eUluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNQXV0aG9yaXR5PlxuICAgIHVwZGF0ZURLSU1TZWxlY3Rvcihkb21haW46IHN0cmluZywgZGF0YTogREtJTVNlbGVjdG9ySW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1TZWxlY3RvclJlc3VsdD5cbiAgICB1cGRhdGVXZWJQcmVmaXgoZG9tYWluOiBzdHJpbmcsIGRhdGE6IFdlYlByZWZpeEluZm8pOiBQcm9taXNlPFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZT5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vRG9tYWluQ3JlZGVudGlhbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UYWdzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGVtcGxhdGVzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluc0NsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRyYWNraW5nJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5pbXBvcnQgeyBFdmVudHNMaXN0LCBFdmVudHNRdWVyeSB9IGZyb20gJy4uLy4uL1R5cGVzL0V2ZW50cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50Q2xpZW50IHtcbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IEV2ZW50c1F1ZXJ5KSA6IFByb21pc2U8RXZlbnRzTGlzdD5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSUV2ZW50Q2xpZW50JztcbiIsImltcG9ydCB7XG4gIElwUG9vbENyZWF0ZURhdGEsIElwUG9vbENyZWF0ZVJlc3VsdCxcbiAgSXBQb29sRGVsZXRlRGF0YSwgSXBQb29sTGlzdFJlc3VsdCxcbiAgSXBQb29sTWVzc2FnZVJlc3VsdCwgSXBQb29sVXBkYXRlRGF0YVxufSBmcm9tICcuLi8uLi9UeXBlcy9JUFBvb2xzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSVBQb29sc0NsaWVudCB7XG4gIGxpc3QoKTogUHJvbWlzZTxJcFBvb2xMaXN0UmVzdWx0PlxuICBjcmVhdGUoZGF0YTogSXBQb29sQ3JlYXRlRGF0YSk6IFByb21pc2U8SXBQb29sQ3JlYXRlUmVzdWx0PlxuICB1cGRhdGUocG9vbElkOiBzdHJpbmcsIGRhdGE6IElwUG9vbFVwZGF0ZURhdGEpOiBQcm9taXNlPElwUG9vbE1lc3NhZ2VSZXN1bHQ+XG4gIGRlbGV0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sRGVsZXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSUlQUG9vbHNDbGllbnQnO1xuIiwiaW1wb3J0IHsgSXBEYXRhLCBJUHNMaXN0UXVlcnksIElwc0xpc3RSZXNwb25zZUJvZHkgfSBmcm9tICcuLi8uLi9UeXBlcy9JUHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJUHNDbGllbnQge1xuICBsaXN0KHF1ZXJ5OiBJUHNMaXN0UXVlcnkpOiBQcm9taXNlPElwc0xpc3RSZXNwb25zZUJvZHk+XG4gIGdldChpcDogc3RyaW5nKTogUHJvbWlzZTxJcERhdGE+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lJUHNDbGllbnQnO1xuIiwiaW1wb3J0IHsgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc1Jlc3VsdCwgSW5ib3hQbGFjZW1lbnRzVmFsdWVzUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCB7XG4gIGxpc3QoKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzUmVzdWx0PjtcbiAgZ2V0KGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzVmFsdWVzUmVzdWx0Pjtcbn1cbiIsImltcG9ydCB7IEluYm94UGxhY2VtZW50c0ZpbHRlcnNSZXN1bHQgfSBmcm9tICcuLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50IHtcbiAgbGlzdCgpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c0ZpbHRlcnNSZXN1bHQ+XG59XG4iLCJpbXBvcnQgeyBJbmJveFBsYWNlbWVudHNEYXRhLCBJbmJveFBsYWNlbWVudHNUZXN0UmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50IH0gZnJvbSAnLi9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHMnO1xuaW1wb3J0IHsgSVNlZWRzTGlzdHNDbGllbnQgfSBmcm9tICcuL1NlZWRzTGlzdHMvU2VlZHNMaXN0c0NsaWVudCc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IH0gZnJvbSAnLi9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSW5ib3hQbGFjZW1lbnRzQ2xpZW50IHtcbiAgICBzZWVkc0xpc3RzOiBJU2VlZHNMaXN0c0NsaWVudDtcbiAgICByZXN1bHRzOiBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudDtcbiAgICBwcm92aWRlcnM6IElJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQ7XG4gICAgcnVuVGVzdChkYXRhOiBJbmJveFBsYWNlbWVudHNEYXRhKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNUZXN0UmVzdWx0Pjtcbn1cbiIsImltcG9ydCB7XG4gIEluYm94UGxhY2VtZW50c0Rlc3Ryb3lSZXN1bHQsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdFdpdGhTdGF0dXMsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0LFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRzUXVlcnlcbn0gZnJvbSAnLi4vLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IH0gZnJvbSAnLi4vQXR0cmlidXRlc0NsaWVudCc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCB9IGZyb20gJy4uL0ZpbHRlcnNDbGllbnQnO1xuaW1wb3J0IHsgSUlQUlNoYXJpbmdDbGllbnQgfSBmcm9tICcuL0luYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCB7XG4gIHNoYXJpbmc6IElJUFJTaGFyaW5nQ2xpZW50O1xuICBhdHRyaWJ1dGVzOiBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudDtcbiAgZmlsdGVyczogSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQ7XG4gIGxpc3QocXVlcnk6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNRdWVyeSk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3Q+O1xuICBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNSZXN1bHRXaXRoU3RhdHVzPjtcbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNEZXN0cm95UmVzdWx0PjtcbiAgZ2V0UmVzdWx0QnlTaGFyZUlkKHNoYXJlSWQ6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUmVzdWx0V2l0aFN0YXR1cz47XG59XG4iLCJpbXBvcnQge1xuICBJUFJTaGFyaW5nUmVzdWx0LFxuICBJUFJTaGFyaW5nVXBkYXRlRGF0YSxcbiAgSVBSU2hhcmluZ1VwZGF0ZVJlc3VsdFxufSBmcm9tICcuLi8uLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJUFJTaGFyaW5nQ2xpZW50IHtcbiAgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPElQUlNoYXJpbmdSZXN1bHQ+O1xuICB1cGRhdGUoaWQ6IHN0cmluZywgZGF0YTogSVBSU2hhcmluZ1VwZGF0ZURhdGEpOiBQcm9taXNlPElQUlNoYXJpbmdVcGRhdGVSZXN1bHQ+O1xufVxuIiwiaW1wb3J0IHtcbiAgU2VlZExpc3RSZXN1bHQsXG4gIFNlZWRzTGlzdHNDcmVhdGluZ0RhdGEsXG4gIFNlZWRzTGlzdHNEZXN0cm95QXBpUmVzcG9uc2UsXG4gIFNlZWRzTGlzdHNRdWVyeSxcbiAgU2VlZHNMaXN0c1Jlc3VsdCxcbiAgU2VlZHNMaXN0c1VwZGF0aW5nRGF0YSxcbn0gZnJvbSAnLi4vLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IH0gZnJvbSAnLi4vQXR0cmlidXRlc0NsaWVudCc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCB9IGZyb20gJy4uL0ZpbHRlcnNDbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZWVkc0xpc3RzQ2xpZW50IHtcbiAgYXR0cmlidXRlczogSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQ7XG4gIGZpbHRlcnM6IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50O1xuICBsaXN0KHF1ZXJ5OiBTZWVkc0xpc3RzUXVlcnkpOiBQcm9taXNlPFNlZWRzTGlzdHNSZXN1bHQ+O1xuICBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxTZWVkTGlzdFJlc3VsdD47XG4gIGNyZWF0ZShkYXRhOiBTZWVkc0xpc3RzQ3JlYXRpbmdEYXRhKTogUHJvbWlzZTxTZWVkTGlzdFJlc3VsdD47XG4gIHVwZGF0ZShhZGRyZXNzOiBzdHJpbmcsIGRhdGE6IFNlZWRzTGlzdHNVcGRhdGluZ0RhdGEpOiBQcm9taXNlPFNlZWRMaXN0UmVzdWx0PjtcbiAgZGVzdHJveShhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFNlZWRzTGlzdHNEZXN0cm95QXBpUmVzcG9uc2U+O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JbmJveFBsYWNlbWVudHNDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9BdHRyaWJ1dGVzQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vRmlsdGVyc0NsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL1NlZWRzTGlzdHMvU2VlZHNMaXN0c0NsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0cyc7XG5leHBvcnQgKiBmcm9tICcuL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmcnO1xuIiwiaW1wb3J0IHsgSVdlYkhvb2tzQ2xpZW50IH0gZnJvbSAnLi4vV2ViaG9va3MnO1xuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgeyBJRG9tYWluc0NsaWVudCB9IGZyb20gJy4uL0RvbWFpbnMnO1xuaW1wb3J0IHsgSUV2ZW50Q2xpZW50IH0gZnJvbSAnLi4vRXZlbnRDbGllbnQnO1xuaW1wb3J0IHsgSVN0YXRzQ2xpZW50IH0gZnJvbSAnLi4vU3RhdHMnO1xuaW1wb3J0IHsgSU1lc3NhZ2VzQ2xpZW50IH0gZnJvbSAnLi4vTWVzc2FnZXMnO1xuaW1wb3J0IHsgSVN1cHByZXNzaW9uQ2xpZW50IH0gZnJvbSAnLi4vU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IElSb3V0ZXNDbGllbnQgfSBmcm9tICcuLi9Sb3V0ZXMnO1xuaW1wb3J0IHsgSVZhbGlkYXRpb25DbGllbnQgfSBmcm9tICcuLi9WYWxpZGF0aW9ucyc7XG5pbXBvcnQgeyBJSVBzQ2xpZW50IH0gZnJvbSAnLi4vSVBzJztcbmltcG9ydCB7IElJUFBvb2xzQ2xpZW50IH0gZnJvbSAnLi4vSVBQb29scyc7XG5pbXBvcnQgeyBJTWFpbGluZ0xpc3RzQ2xpZW50IH0gZnJvbSAnLi4vTWFpbGluZ0xpc3RzJztcbmltcG9ydCB7IElTdWJhY2NvdW50c0NsaWVudCB9IGZyb20gJy4uL1N1YmFjY291bnRzJztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNDbGllbnQgfSBmcm9tICcuLi9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IHsgSU1ldHJpY3NDbGllbnQgfSBmcm9tICcuLi9NZXRyaWNzL01ldHJpY3NDbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYWlsZ3VuQ2xpZW50IHtcbiAgICBkb21haW5zOiBJRG9tYWluc0NsaWVudDtcbiAgICB3ZWJob29rczogSVdlYkhvb2tzQ2xpZW50O1xuICAgIGV2ZW50czogSUV2ZW50Q2xpZW50O1xuICAgIHN0YXRzOiBJU3RhdHNDbGllbnQ7XG4gICAgbWV0cmljczogSU1ldHJpY3NDbGllbnQ7XG4gICAgc3VwcHJlc3Npb25zOiBJU3VwcHJlc3Npb25DbGllbnQ7XG4gICAgbWVzc2FnZXM6IElNZXNzYWdlc0NsaWVudDtcbiAgICByb3V0ZXM6IElSb3V0ZXNDbGllbnQ7XG4gICAgdmFsaWRhdGU6IElWYWxpZGF0aW9uQ2xpZW50O1xuICAgIGlwczogSUlQc0NsaWVudDtcbiAgICBpcF9wb29sczogSUlQUG9vbHNDbGllbnQ7XG4gICAgbGlzdHM6IElNYWlsaW5nTGlzdHNDbGllbnQ7XG4gICAgc3ViYWNjb3VudHM6IElTdWJhY2NvdW50c0NsaWVudDtcbiAgICBpbmJveFBsYWNlbWVudHM6IElJbmJveFBsYWNlbWVudHNDbGllbnQ7XG4gICAgc2V0U3ViYWNjb3VudChzdWJhY2NvdW50SWQ6IHN0cmluZyk6IHZvaWQ7XG4gICAgcmVzZXRTdWJhY2NvdW50KCk6IHZvaWQ7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lNYWlsZ3VuQ2xpZW50JztcbiIsImltcG9ydCB7XG4gIE1haWxMaXN0TWVtYmVyc1F1ZXJ5LFxuICBNYWlsTGlzdE1lbWJlcnNSZXN1bHQsXG4gIE1haWxMaXN0TWVtYmVyLFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMsXG4gIE11bHRpcGxlTWVtYmVyc0RhdGEsXG4gIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlLFxuICBEZWxldGVkTWVtYmVyXG59IGZyb20gJy4uLy4uL1R5cGVzL01haWxpbmdMaXN0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1haWxMaXN0c01lbWJlcnMge1xuICBsaXN0TWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBxdWVyeT86IE1haWxMaXN0TWVtYmVyc1F1ZXJ5XG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXJzUmVzdWx0PjtcblxuICBnZXRNZW1iZXIoYWRkcmVzczogc3RyaW5nLCBtZW1iZXJBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPixcbiAgY3JlYXRlTWVtYmVyKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+LFxuICBjcmVhdGVNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlTWVtYmVyc0RhdGEpOiBQcm9taXNlPE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlPixcbiAgdXBkYXRlTWVtYmVyKFxuICAgIGFkZHJlc3M6IHN0cmluZyxcbiAgICBtZW1iZXJBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4sXG4gIGRlc3Ryb3lNZW1iZXIoYWRkcmVzczogc3RyaW5nLCBtZW1iZXJBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPERlbGV0ZWRNZW1iZXI+XG59XG4iLCJpbXBvcnQge1xuICBDcmVhdGVVcGRhdGVMaXN0LCBEZXN0cm95ZWRMaXN0LCBMaXN0c1F1ZXJ5LCBNYWlsaW5nTGlzdCxcbiAgTWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0LCBNYWlsaW5nTGlzdFJlc3VsdCxcbiAgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0LCBTdGFydFZhbGlkYXRpb25SZXN1bHRcbn0gZnJvbSAnLi4vLi4vVHlwZXMvTWFpbGluZ0xpc3RzJztcbmltcG9ydCB7IElNYWlsTGlzdHNNZW1iZXJzIH0gZnJvbSAnLi9NYWlsaW5nTGlzdE1lbWJlcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYWlsaW5nTGlzdHNDbGllbnQge1xuICBtZW1iZXJzOiBJTWFpbExpc3RzTWVtYmVycztcbiAgbGlzdChxdWVyeT86IExpc3RzUXVlcnkpOiBQcm9taXNlPE1haWxpbmdMaXN0UmVzdWx0PlxuICBnZXQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0PlxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+XG4gIHVwZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+XG4gIGRlc3Ryb3kobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3llZExpc3Q+XG4gIHZhbGlkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxTdGFydFZhbGlkYXRpb25SZXN1bHQ+XG4gIHZhbGlkYXRpb25SZXN1bHQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdD5cbiAgY2FuY2VsVmFsaWRhdGlvbihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0PlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdE1lbWJlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdHNDbGllbnQnO1xuIiwiaW1wb3J0IHsgTWFpbGd1bk1lc3NhZ2VEYXRhLCBNZXNzYWdlc1NlbmRSZXN1bHQgfSBmcm9tICcuLi8uLi9UeXBlcy9NZXNzYWdlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NhZ2VzQ2xpZW50IHtcbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBNYWlsZ3VuTWVzc2FnZURhdGEpOiBQcm9taXNlPE1lc3NhZ2VzU2VuZFJlc3VsdD5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSU1lc3NhZ2VzQ2xpZW50JztcbiIsImltcG9ydCB7XG4gIENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSwgRGVzdHJveVJvdXRlUmVzcG9uc2UsIFJvdXRlLCBSb3V0ZXNMaXN0UXVlcnksIFVwZGF0ZVJvdXRlUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvUm91dGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBJUm91dGVzQ2xpZW50IHtcbiAgbGlzdChxdWVyeTogUm91dGVzTGlzdFF1ZXJ5KTogUHJvbWlzZTxSb3V0ZVtdPlxuICBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8Um91dGU+XG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFJvdXRlPlxuICB1cGRhdGUoaWQ6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxVcGRhdGVSb3V0ZVJlc3BvbnNlPlxuICBkZXN0cm95KGlkOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3lSb3V0ZVJlc3BvbnNlPlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JUm91dGVzQ2xpZW50JztcbiIsImltcG9ydCB7IFN0YXRzUXVlcnkgfSBmcm9tICcuLi8uLi9UeXBlcy9TdGF0cyc7XG5pbXBvcnQgeyBJU3RhdHNDb250YWluZXIgfSBmcm9tICcuL1N0YXRzQ29udGFpbmVyJztcblxuZXhwb3J0IGludGVyZmFjZSBJU3RhdHNDbGllbnQge1xuICBnZXREb21haW4oZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8SVN0YXRzQ29udGFpbmVyPlxuICBnZXRBY2NvdW50KHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8SVN0YXRzQ29udGFpbmVyPlxufVxuIiwiaW1wb3J0IHsgU3RhdCB9IGZyb20gJy4uLy4uL1R5cGVzL1N0YXRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJU3RhdHNDb250YWluZXIge1xuICAgIHN0YXJ0OiBEYXRlO1xuICAgIGVuZDogRGF0ZTtcbiAgICByZXNvbHV0aW9uOiBzdHJpbmc7XG4gICAgc3RhdHM6IFN0YXRbXTtcbiAgfVxuIiwiZXhwb3J0ICogZnJvbSAnLi9TdGF0c0NsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRzQ29udGFpbmVyJztcbiIsImltcG9ydCB7IFN1YmFjY291bnRMaXN0UmVzcG9uc2VEYXRhLCBTdWJhY2NvdW50UmVzcG9uc2VEYXRhLCBTdWJhY2NvdW50c1F1ZXJ5IH0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdWJhY2NvdW50c0NsaWVudCB7XG4gIGxpc3QocXVlcnk/OiBTdWJhY2NvdW50c1F1ZXJ5KTogUHJvbWlzZTxTdWJhY2NvdW50TGlzdFJlc3BvbnNlRGF0YT5cbiAgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+XG4gIGNyZWF0ZShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+XG4gIGRpc2FibGUoaWQ6IHN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT5cbiAgZW5hYmxlKGlkOiBzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lTdWJhY2NvdW50c0NsaWVudCc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUJvdW5jZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG4gICAgdHlwZTogc3RyaW5nO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgaW50ZXJmYWNlIElDb21wbGFpbnQge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIHR5cGU6IHN0cmluZztcbn1cbiIsImltcG9ydCB7XG4gIFN1cHByZXNzaW9uTGlzdCxcbiAgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQsXG4gIFN1cHByZXNzaW9uTGlzdFF1ZXJ5LFxuICBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHRcbn0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IElCb3VuY2UgfSBmcm9tICcuL0JvdW5jZSc7XG5pbXBvcnQgeyBJQ29tcGxhaW50IH0gZnJvbSAnLi9Db21wbGFpbnQnO1xuaW1wb3J0IHsgSVVuc3Vic2NyaWJlIH0gZnJvbSAnLi9VbnN1YnNjcmliZSc7XG5pbXBvcnQgeyBJV2hpdGVMaXN0IH0gZnJvbSAnLi9XaGl0ZUxpc3QnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdXBwcmVzc2lvbkNsaWVudCB7XG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgcXVlcnk/OiBTdXBwcmVzc2lvbkxpc3RRdWVyeSk6IFByb21pc2U8U3VwcHJlc3Npb25MaXN0PlxuXG4gIGdldChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8SUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0PlxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgfCBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YVtdXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdD5cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQ+XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVVuc3Vic2NyaWJlIHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgdGFnczogYW55O1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG4gICAgdHlwZTogc3RyaW5nO1xufVxuIiwiZXhwb3J0IGludGVyZmFjZSBJV2hpdGVMaXN0IHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICByZWFzb246IHN0cmluZztcbiAgICBjcmVhdGVkQXQ6IERhdGU7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0JvdW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL0NvbXBsYWludCc7XG5leHBvcnQgKiBmcm9tICcuL1Vuc3Vic2NyaWJlJztcbmV4cG9ydCAqIGZyb20gJy4vV2hpdGVMaXN0JztcbmV4cG9ydCAqIGZyb20gJy4vSVN1cHByZXNzaW9uc0NsaWVudCc7XG4iLCJpbXBvcnQge1xuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdCxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0LFxuICBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYixcbiAgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhLFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFF1ZXJ5XG59IGZyb20gJy4uLy4uL1R5cGVzL1ZhbGlkYXRpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IHtcbiAgbGlzdChxdWVyeT86TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeSk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+XG4gIGdldChsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0PlxuICBjcmVhdGUoXG4gICAgbGlzdElkOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj5cbiAgZGVzdHJveShsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8Q2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCB7IFZhbGlkYXRpb25SZXN1bHQgfSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQgeyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi9NdWx0aXBsZVZhbGlkYXRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uQ2xpZW50IHtcbiAgbXVsdGlwbGVWYWxpZGF0aW9uOiBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50XG4gIGdldChhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFZhbGlkYXRpb25SZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL011bHRpcGxlVmFsaWRhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL1ZhbGlkYXRpb24nO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmltcG9ydCB7IFdlYmhvb2tzSWRzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHtcbiAgV2ViaG9va0xpc3QsXG4gIFdlYmhvb2tSZXN1bHQsXG4gIFdlYmhvb2tzUXVlcnksXG4gIFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvV2ViaG9va3MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElXZWJIb29rc0NsaWVudCB7XG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5OiBXZWJob29rc1F1ZXJ5KTogUHJvbWlzZTxXZWJob29rTGlzdD5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBpZDogV2ViaG9va3NJZHMpOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+XG4gIGNyZWF0ZShkb21haW46IHN0cmluZyxcbiAgICBpZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIHRlc3Q6IGJvb2xlYW5cbiAgKTogUHJvbWlzZTxXZWJob29rUmVzdWx0IHwgV2ViaG9va1ZhbGlkYXRpb25SZXNwb25zZT5cbiAgdXBkYXRlKGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nLCB1cmw6IHN0cmluZyB8IHN0cmluZ1tdKTogUHJvbWlzZTxXZWJob29rUmVzdWx0PlxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nKSA6IFByb21pc2U8V2ViaG9va1Jlc3VsdD5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSVdlYkhvb2tzQ2xpZW50JztcbiIsImV4cG9ydCAqIGZyb20gJy4vQ29tbW9uJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWlucyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxndW5DbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdGF0cyc7XG5leHBvcnQgKiBmcm9tICcuL1N1cHByZXNzaW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL1ZhbGlkYXRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9XZWJob29rcyc7XG5leHBvcnQgKiBmcm9tICcuL01lc3NhZ2VzJztcbmV4cG9ydCAqIGZyb20gJy4vUm91dGVzJztcbmV4cG9ydCAqIGZyb20gJy4vSVBzJztcbmV4cG9ydCAqIGZyb20gJy4vSVBQb29scyc7XG5leHBvcnQgKiBmcm9tICcuL1N1YmFjY291bnRzJztcbmV4cG9ydCAqIGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzJztcbiIsImV4cG9ydCB0eXBlIEFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IGFueTtcbn1cbiIsImV4cG9ydCB0eXBlIEFQSUVycm9yT3B0aW9ucyA9IHtcbiAgaGVhZGVycz86IHsgW2tleTogc3RyaW5nXTogdW5rbm93biB9O1xuICBzdGF0dXM6IG51bWJlcjtcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgYm9keToge1xuICAgIGVycm9yPzogc3RyaW5nLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmdcbiAgfTtcbiAgdXJsPzogc3RyaW5nO1xuICBzdGF0dXNUZXh0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBBUElFcnJvclR5cGUgPSB7XG4gIHN0YWNrOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGRldGFpbHM6IHN0cmluZztcbn1cbiIsImltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IHsgRm9ybURhdGFJbnB1dFZhbHVlIH0gZnJvbSAnLi4vTWVzc2FnZXMnO1xuXG5leHBvcnQgdHlwZSBGb3JtRGF0YU9wdGlvbnMgPSB7XG4gIFtrZXk6IHN0cmluZ106IE5vZGVGb3JtRGF0YTtcbn1cblxuZXhwb3J0IHR5cGUgSW5wdXRGb3JtRGF0YSA9XG4gIHtcbiAgICBuZXcoZm9ybT86IEhUTUxGb3JtRWxlbWVudCB8IHVuZGVmaW5lZCwgc3VibWl0dGVyPzogSFRNTEVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkKTogRm9ybURhdGE7XG4gIH0gfFxuICB7XG4gICAgbmV3KG9wdGlvbnM/OiBGb3JtRGF0YU9wdGlvbnMpOiBOb2RlRm9ybURhdGFcbiAgfVxuXG5leHBvcnQgdHlwZSBGb3JtRGF0YUlucHV0ID0ge1xuICBba2V5OiBzdHJpbmddOiBGb3JtRGF0YUlucHV0VmFsdWU7XG59O1xuIiwiZXhwb3J0IHR5cGUgUGFnZXNMaXN0ID0ge1xuICAgIHByZXZpb3VzOiBzdHJpbmc7XG4gICAgZmlyc3Q6IHN0cmluZztcbiAgICBsYXN0OiBzdHJpbmc7XG4gICAgbmV4dDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBQYXJzZWRQYWdlID0ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcGFnZTogc3RyaW5nO1xuICAgIGl0ZXJhdG9yUG9zaXRpb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB1cmw6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBQYXJzZWRQYWdlc0xpc3QgPSB7XG4gICAgcHJldmlvdXM6IFBhcnNlZFBhZ2U7XG4gICAgZmlyc3Q6IFBhcnNlZFBhZ2U7XG4gICAgbGFzdDogUGFyc2VkUGFnZTtcbiAgICBuZXh0OiBQYXJzZWRQYWdlO1xufVxuXG5leHBvcnQgdHlwZSBQYWdlc0xpc3RBY2N1bXVsYXRvciA9IHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFBhcnNlZFBhZ2U7XG59XG5cbmV4cG9ydCB0eXBlIFJlc3BvbnNlV2l0aFBhZ2luZyA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBRdWVyeVdpdGhQYWdlID0ge1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRVcmxBbmRRdWVyeSA9IHtcbiAgICB1cmw6IHN0cmluZztcbiAgICB1cGRhdGVkUXVlcnk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xufVxuIiwiaW1wb3J0IHsgQXhpb3NSZXF1ZXN0SGVhZGVycywgUmF3QXhpb3NSZXF1ZXN0SGVhZGVycyB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IE1haWxndW5DbGllbnRPcHRpb25zIH0gZnJvbSAnLi4vTWFpbGd1bkNsaWVudCc7XG5cbmV4cG9ydCB0eXBlIE9uQ2FsbEVtcHR5SGVhZGVycyA9IHtcbiAgW2tleTogc3RyaW5nXTogdW5kZWZpbmVkO1xufVxuZXhwb3J0IHR5cGUgUmVxdWVzdE9wdGlvbnMgPSBNYWlsZ3VuQ2xpZW50T3B0aW9ucyAmIHtcbiAgaGVhZGVyczogQXhpb3NSZXF1ZXN0SGVhZGVycyB8IFJhd0F4aW9zUmVxdWVzdEhlYWRlcnM7XG4gIHRpbWVvdXQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgT25DYWxsUmVxdWVzdE9wdGlvbnMgPSB7XG4gIHRpbWVvdXQ/OiBudW1iZXI7XG4gIGhlYWRlcnM/OiBBeGlvc1JlcXVlc3RIZWFkZXJzIHwgUmF3QXhpb3NSZXF1ZXN0SGVhZGVycztcbiAgcXVlcnk/OiBhbnk7XG4gIFtrZXk6IHN0cmluZ106IHVua25vd24gfCB1bmRlZmluZWQ7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0Vycm9yJztcbmV4cG9ydCAqIGZyb20gJy4vQXBpUmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9Gb3JtRGF0YSc7XG5leHBvcnQgKiBmcm9tICcuL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9SZXF1ZXN0T3B0aW9ucyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzUXVlcnkgPSB7XG4gICAgbGltaXQ6IG51bWJlcjtcbiAgICBza2lwOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzID0ge1xuICAgIGxvZ2luOiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHNJdGVtID0ge1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZyxcbiAgICBsb2dpbjogc3RyaW5nLFxuICAgIG1haWxib3g6IHN0cmluZyxcbiAgICBzaXplX2J5dGVzOiBudW1iZXIgfCBudWxsXG59XG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBEb21haW5DcmVkZW50aWFsc0l0ZW1bXTtcbiAgICAgICAgdG90YWxfY291bnQ6IG51bWJlcjtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzTGlzdCA9IHtcbiAgICBpdGVtczogRG9tYWluQ3JlZGVudGlhbHNJdGVtW107XG4gICAgdG90YWxDb3VudDogbnVtYmVyO1xufVxuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXIsXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHNwZWM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcixcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyLFxuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICBzcGVjOiBzdHJpbmc7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGEgPSB7XG4gICAgcGFzc3dvcmQ6IHN0cmluZztcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHsgUmVzb2x1dGlvbiB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc1F1ZXJ5ID0ge1xuICAgIGxpbWl0OiBudW1iZXI7XG4gICAgcGFnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5ID0ge1xuICAgIGV2ZW50OiBzdHJpbmc7XG4gICAgc3RhcnQ/OiBudW1iZXI7XG4gICAgZW5kPzogbnVtYmVyO1xuICAgIHJlc29sdXRpb24/OiBSZXNvbHV0aW9uO1xuICAgIGR1cmF0aW9uPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzSXRlbUluZm8gPSB7XG4gICAgdGFnOiBzdHJpbmcsXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgICAnZmlyc3Qtc2Vlbic6IHN0cmluZyxcbiAgICAnbGFzdC1zZWVuJzogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NJdGVtID0ge1xuICAgIHRhZzogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgJ2ZpcnN0LXNlZW4nOiBEYXRlLFxuICAgICdsYXN0LXNlZW4nOiBEYXRlXG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NSZXNwb25zZURhdGEgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogRG9tYWluVGFnc0l0ZW1JbmZvW107XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzTGlzdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBpdGVtczogRG9tYWluVGFnc0l0ZW1bXTtcbiAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzTWVzc2FnZVJlcyA9IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgc3RhdHVzPzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSA9IHtcbiAgICB0aW1lOnN0cmluZ1xuICAgIGFjY2VwdGVkPzoge1xuICAgICAgICBpbmNvbWluZzogbnVtYmVyO1xuICAgICAgICBvdXRnb2luZzogbnVtYmVyO1xuICAgICAgICB0b3RhbDogbnVtYmVyXG4gICAgfVxuICAgIGRlbGl2ZXJlZD86IHtcbiAgICAgICAgc210cDogbnVtYmVyO1xuICAgICAgICBodHRwOiBudW1iZXI7XG4gICAgICAgIG9wdGltaXplZDogbnVtYmVyO1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH07XG4gICAgb3BlbmVkPzoge1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH07XG4gICAgZmFpbGVkPzoge1xuICAgICAgICB0ZW1wb3Jhcnk6e1xuICAgICAgICAgICAgZXNwYmxvY2s6IG51bWJlcjtcbiAgICAgICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgICAgIHBlcm1hbmVudDoge1xuICAgICAgICAgICAgJ3N1cHByZXNzLWJvdW5jZSc6IG51bWJlcjtcbiAgICAgICAgICAgICdzdXBwcmVzcy11bnN1YnNjcmliZSc6IG51bWJlcjtcbiAgICAgICAgICAgICdzdXBwcmVzcy1jb21wbGFpbnQnOiBudW1iZXI7XG4gICAgICAgICAgICBib3VuY2U6IG51bWJlcjtcbiAgICAgICAgICAgICdkZWxheWVkLWJvdW5jZSc6IG51bWJlcjtcbiAgICAgICAgICAgIHdlYmhvb2s6IG51bWJlcjtcbiAgICAgICAgICAgIG9wdGltaXplZDogbnVtYmVyO1xuICAgICAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNsaWNrZWQ/OiB7XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfTtcbiAgICB1bnN1YnNjcmliZWQ/OiB7XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfTtcbiAgICBjb21wbGFpbmVkPzoge1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH07XG4gICAgc3RvcmVkPzoge1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlID0ge1xuICAgIGJvZHk6e1xuICAgICAgICB0YWc6IHN0cmluZztcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICAgICAgc3RhcnQ6IHN0cmluZztcbiAgICAgICAgZW5kOiBzdHJpbmc7XG4gICAgICAgIHJlc29sdXRpb246IFJlc29sdXRpb247XG4gICAgICAgIHN0YXRzOiBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbVtdO1xuICAgIH1cbn1cbmV4cG9ydCB0eXBlIERvbWFpblRhZ1N0YXRpc3RpY0l0ZW0gPSBPbWl0IDxEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSwgJ3RpbWUnPiAmIHtcbiAgICB0aW1lOiBEYXRlXG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ0NvdW50cmllc0FQSVJlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgdGFnOnN0cmluZztcbiAgICAgICAgY291bnRyeToge1xuICAgICAgICAgICAgW2tleTpzdHJpbmddOiB7XG4gICAgICAgICAgICAgICAgY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIGNvbXBsYWluZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBvcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bmlxdWVfY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuaXF1ZV9vcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uID0ge1xuICAgIHRhZzpzdHJpbmc7XG4gICAgY291bnRyeToge1xuICAgICAgICBba2V5OiBzdHJpbmddOiB7XG4gICAgICAgICAgICBjbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgICAgICAgICBvcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuaXF1ZV9jbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICB1bmlxdWVfb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICB1bnN1YnNjcmliZWQ6IG51bWJlcjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICB0YWc6c3RyaW5nO1xuICAgICAgICBwcm92aWRlcjoge1xuICAgICAgICAgICAgW2tleTpzdHJpbmddOiB7XG4gICAgICAgICAgICAgICAgYWNjZXB0ZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBjbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgY29tcGxhaW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIG9wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuaXF1ZV9jbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5pcXVlX29wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlZDogbnVtYmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24gPSB7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgcHJvdmlkZXI6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICAgICAgYWNjZXB0ZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIGNsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIGNvbXBsYWluZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIGRlbGl2ZXJlZDogbnVtYmVyO1xuICAgICAgICAgICAgb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICB1bmlxdWVfY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5pcXVlX29wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBEZXZpY2VTdGF0aXN0aWMgPSB7XG4gICAgY2xpY2tlZDogbnVtYmVyO1xuICAgIGNvbXBsYWluZWQ6IG51bWJlcjtcbiAgICBvcGVuZWQ6IG51bWJlcjtcbiAgICB1bmlxdWVfY2xpY2tlZDogbnVtYmVyO1xuICAgIHVuaXF1ZV9vcGVuZWQ6IG51bWJlcjtcbiAgICB1bnN1YnNjcmliZWQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRGV2aWNlc1R5cGVzID0ge1xuICAgIGRlc2t0b3A6IERldmljZVN0YXRpc3RpYztcbiAgICBtb2JpbGU6IERldmljZVN0YXRpc3RpYztcbiAgICB0YWJsZXQ6IERldmljZVN0YXRpc3RpYztcbiAgICB1bmtub3duOiBEZXZpY2VTdGF0aXN0aWM7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ0RldmljZXNBUElSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIHRhZzpzdHJpbmc7XG4gICAgICAgIGRldmljZTogRGV2aWNlc1R5cGVzO1xuICAgIH1cbiAgICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uID0ge1xuICAgIHRhZzogc3RyaW5nO1xuICAgIGRldmljZTogRGV2aWNlc1R5cGVzO1xufVxuIiwiaW1wb3J0IHsgWWVzTm8gfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJRG9tYWluVGVtcGxhdGUgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIERvbWFpblRlbXBsYXRlRGF0YSA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICB0ZW1wbGF0ZTogc3RyaW5nO1xuICAgIHRhZz86IHN0cmluZztcbiAgICBlbmdpbmU/OiBzdHJpbmc7XG4gICAgY29tbWVudD86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YSA9IHtcbiAgICB0ZW1wbGF0ZTogc3RyaW5nO1xuICAgIHRhZzogc3RyaW5nO1xuICAgIGVuZ2luZT86IHN0cmluZztcbiAgICBjb21tZW50Pzogc3RyaW5nO1xuICAgIGFjdGl2ZT86IFllc05vO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGEgPSB7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YSA9IHtcbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbiAgICBjb21tZW50Pzogc3RyaW5nO1xuICAgIGFjdGl2ZT86IFllc05vO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UZW1wbGF0ZXNRdWVyeSA9IHtcbiAgICAvKiogJ3BhZ2UnIChvcHRpb25hbGx5ICdwJykgcGFyYW1zIGZyb20gcHJldmlvdXMgcmVzcG9uc2UncyAncGFnaW5nJyBvYmplY3QuXG4gICAgICogVmFsdWUgbXVzdCBiZSBzdHJpbmdpZmllZCBhcyBxdWVyeSBwYXJhbXMuIEV4OiAnP3BhZ2U9Zmlyc3QnLCc/cGFnZT1uZXh0JnA9bmFtZS1vZi1sYXN0LWl0ZW0nXG4gICAgIC4uLi4gKi9cbiAgICBwYWdlPzogYD8ke3N0cmluZ31gO1xuICAgIC8qKiBOdW1iZXIgb2YgcmVjb3JkcyB0byByZXRyaWV2ZS4gRGVmYXVsdCB2YWx1ZSBpcyAxMC4gKi9cbiAgICBsaW1pdD86IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgVGVtcGxhdGVRdWVyeSA9IHtcbiAgICBhY3RpdmU6IFllc05vO1xufVxuXG5leHBvcnQgdHlwZSBTaG9ydFRlbXBsYXRlVmVyc2lvbiA9IHtcbiAgICB0YWc6IHN0cmluZztcbiAgICBlbmdpbmU6IHN0cmluZztcbiAgICBtam1sOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBzdHJpbmcgfCBEYXRlO1xuICAgIGNvbW1lbnQ6IHN0cmluZztcbiAgICBhY3RpdmU6IGJvb2xlYW47XG4gICAgaWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgVGVtcGxhdGVWZXJzaW9uID0gU2hvcnRUZW1wbGF0ZVZlcnNpb24gJiB7XG4gICAgdGVtcGxhdGU6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgdGVtcGxhdGU6IElEb21haW5UZW1wbGF0ZTtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogSURvbWFpblRlbXBsYXRlW107XG4gICAgICAgIHBhZ2luZzoge1xuICAgICAgICAgICAgZmlyc3Q6IHN0cmluZztcbiAgICAgICAgICAgIGxhc3Q6IHN0cmluZztcbiAgICAgICAgICAgIG5leHQ6IHN0cmluZztcbiAgICAgICAgICAgIHByZXZpb3VzOiBzdHJpbmc7XG4gICAgICAgIH07XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdCA9IHtcbiAgICAgICAgaXRlbXM6IElEb21haW5UZW1wbGF0ZVtdO1xuICAgICAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xuICAgICAgICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgbmFtZTogc3RyaW5nXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0ZW1wbGF0ZU5hbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIE5vdGlmaWNhdGlvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICB0ZW1wbGF0ZTogSURvbWFpblRlbXBsYXRlO1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdGVtcGxhdGU6IElEb21haW5UZW1wbGF0ZTtcbn1cblxuZXhwb3J0IHR5cGUgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgICAgICB2ZXJzaW9uOiB7XG4gICAgICAgICAgICAgICAgdGFnOiBzdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZztcbiAgICB0ZW1wbGF0ZVZlcnNpb246IHtcbiAgICAgICAgdGFnOiBzdHJpbmc7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgICAgICAgICBjcmVhdGVkQXQ6IHN0cmluZztcbiAgICAgICAgICAgIGNyZWF0ZWRCeTogc3RyaW5nO1xuICAgICAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgICAgICAgIHZlcnNpb25zOiBTaG9ydFRlbXBsYXRlVmVyc2lvbltdXG4gICAgICAgIH1cbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3Q7XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQgPSB7XG4gICAgdGVtcGxhdGU6IElEb21haW5UZW1wbGF0ZTtcbiAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmV4cG9ydCB0eXBlIERvbWFpblRyYWNraW5nRGF0YSA9IHtcbiAgY2xpY2s6IHsgYWN0aXZlOiBib29sZWFuIH07XG4gIG9wZW46IHsgYWN0aXZlOiBib29sZWFuIH07XG4gIHVuc3Vic2NyaWJlOiB7XG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIGh0bWxfZm9vdGVyOiBzdHJpbmc7XG4gICAgdGV4dF9mb290ZXI6IHN0cmluZztcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UcmFja2luZ1Jlc3BvbnNlID0ge1xuICBzdGF0dXM6IG51bWJlcjtcbiAgYm9keToge1xuICAgIHRyYWNraW5nOiBEb21haW5UcmFja2luZ0RhdGFcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZE9wZW5UcmFja2luZyA9IHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBvcGVuPzogeyBhY3RpdmU6IGJvb2xlYW4gfTtcbiAgY2xpY2s/OiB7IGFjdGl2ZTogYm9vbGVhbiB8ICdodG1sb25seScgfTtcbiAgdW5zdWJzY3JpYmU/OiB7XG4gICAgYWN0aXZlOiBib29sZWFuLFxuICAgIGh0bWxfZm9vdGVyOiBzdHJpbmc7XG4gICAgdGV4dF9mb290ZXI6IHN0cmluZztcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSA9IHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIGJvZHk6IFVwZGF0ZWRPcGVuVHJhY2tpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE9wZW5UcmFja2luZ0luZm8gPSB7XG4gIHBsYWNlX2F0X3RoZV90b3A/OiAneWVzJyB8ICdubycgfCAndHJ1ZScgfCAnZmFsc2UnfCBib29sZWFuLFxuICBhY3RpdmU6ICd5ZXMnIHwgJ25vJyB8ICd0cnVlJyB8ICdmYWxzZSd8IGJvb2xlYW47XG59XG5leHBvcnQgdHlwZSBDbGlja1RyYWNraW5nSW5mbyA9IHtcbiAgYWN0aXZlPzogJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwgJ2ZhbHNlJyB8ICdodG1sb25seScgfCBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBVbnN1YnNjcmliZVRyYWNraW5nSW5mbyA9IHtcbiAgYWN0aXZlPzogJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwgJ2ZhbHNlJyB8IGJvb2xlYW47XG4gIGh0bWxfZm9vdGVyPzogc3RyaW5nO1xuICB0ZXh0X2Zvb3Rlcj86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgR2V0RG9tYWluVHJhY2tpbmdDZXJ0aWZpY2F0ZVJlc3BvbnNlID0ge1xuICByZXNwb25zZVN0YXR1c0NvZGU6IG51bWJlclxuICBzdGF0dXM6IHN0cmluZztcbiAgZXJyb3I6IHN0cmluZztcbiAgY2VydGlmaWNhdGU6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgR2VuZXJhdGVEb21haW5UcmFja2luZ0NlcnRpZmljYXRlUmVzcG9uc2UgPSB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgbG9jYXRpb246IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFJlZ2VuZXJhdGVEb21haW5UcmFja2luZ0NlcnRpZmljYXRlUmVzcG9uc2UgPSB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgbG9jYXRpb246IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIERvbWFpbnNRdWVyeSA9IHtcbiAgICBsaW1pdD86IG51bWJlcjtcbiAgICBza2lwPzogbnVtYmVyO1xuICAgIHN0YXRlPzogJ2FjdGl2ZScgfCAndW52ZXJpZmllZCcgfCAnZGlzYWJsZWQnO1xuICAgIHNvcnQ/OiAnbmFtZTphc2MnIHwgJ25hbWU6IGRlc2MnXG4gICAgYXV0aG9yaXR5PyA6IHN0cmluZztcbiAgICBzZWFyY2g/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblVwZGF0ZUluZm8gPSB7XG4gICAgc3BhbV9hY3Rpb24/OiAnZGlzYWJsZWQnIHwgJ2Jsb2NrJyB8ICd0YWcnO1xuICAgIHdlYl9zY2hlbWU/OiAnaHR0cCcgfCAnaHR0cHMnO1xuICAgIHdpbGRjYXJkPzogYm9vbGVhbiB8ICd0cnVlJyB8ICdmYWxzZSc7XG4gICAgbWFpbGZyb21faG9zdD86IHN0cmluZztcbiAgICBtZXNzYWdlX3R0bD86IG51bWJlcjtcbiAgICBzbXRwX3Bhc3N3b3JkPzogc3RyaW5nO1xuICAgIHVzZV9hdXRvbWF0aWNfc2VuZGVyX3NlY3VyaXR5PzogYm9vbGVhbiB8ICd0cnVlJyB8ICdmYWxzZSc7XG4gICAgd2ViX3ByZWZpeD86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVXBkYXRlSW5mb1JlcSA9IE9taXQ8RG9tYWluVXBkYXRlSW5mbywgJ21lc3NhZ2VfdHRsJz4gJiB7XG4gICAgd2lsZGNhcmQ/OiAndHJ1ZScgfCAnZmFsc2UnOyAvLyBhcGkgc3VwcG9ydHMgb25seSBzdHJpbmdzXG4gICAgdXNlX2F1dG9tYXRpY19zZW5kZXJfc2VjdXJpdHk/OiAndHJ1ZScgfCAnZmFsc2UnOyAvLyBhcGkgc3VwcG9ydHMgb25seSBzdHJpbmdzXG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkluZm8gPSBEb21haW5VcGRhdGVJbmZvICYge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBka2ltX2hvc3RfbmFtZT86IHN0cmluZztcbiAgICBka2ltX2tleV9zaXplPzogMTAyNCB8IDIwNDg7XG4gICAgZGtpbV9zZWxlY3Rvcj86IHN0cmluZztcbiAgICBlbmNyeXB0X2luY29taW5nX21lc3NhZ2U/OiBib29sZWFuIHwgJ3RydWUnIHwgJ2ZhbHNlJztcbiAgICBmb3JjZV9ka2ltX2F1dGhvcml0eT86IGJvb2xlYW4gfCAndHJ1ZScgfCAnZmFsc2UnO1xuICAgIGZvcmNlX3Jvb3RfZGtpbV9ob3N0PzogYm9vbGVhbiB8ICd0cnVlJyB8ICdmYWxzZSc7XG4gICAgcG9vbF9pZD86ICcnO1xuICAgIGlwcz86ICcnO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5JbmZvUmVxID0gRG9tYWluSW5mbyAmIHtcbiAgICBmb3JjZV9ka2ltX2F1dGhvcml0eT86ICd0cnVlJyB8ICdmYWxzZSc7XG59XG5cbmV4cG9ydCB0eXBlIEJvb2xUb1N0cmluZyA9IHtcbiAgICBlbmNyeXB0X2luY29taW5nX21lc3NhZ2U6IERvbWFpbkluZm9bJ2VuY3J5cHRfaW5jb21pbmdfbWVzc2FnZSddO1xuICAgIGZvcmNlX2RraW1fYXV0aG9yaXR5OiBEb21haW5JbmZvWydmb3JjZV9ka2ltX2F1dGhvcml0eSddO1xuICAgIGZvcmNlX3Jvb3RfZGtpbV9ob3N0OiBEb21haW5JbmZvWydmb3JjZV9yb290X2RraW1faG9zdCddO1xuICAgIHdpbGRjYXJkOiBEb21haW5JbmZvWyd3aWxkY2FyZCddO1xuICAgIHVzZV9hdXRvbWF0aWNfc2VuZGVyX3NlY3VyaXR5OiBEb21haW5JbmZvWyd1c2VfYXV0b21hdGljX3NlbmRlcl9zZWN1cml0eSddO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5EYXRhID0ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgaXNfZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgd2ViX3ByZWZpeDogc3RyaW5nO1xuICAgIHdlYl9zY2hlbWU6IHN0cmluZztcbiAgICB1c2VfYXV0b21hdGljX3NlbmRlcl9zZWN1cml0eTogYm9vbGVhbjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gICAgc2tpcF92ZXJpZmljYXRpb246IGJvb2xlYW47XG4gICAgc3RhdGU6IHN0cmluZztcbiAgICB3aWxkY2FyZDogYm9vbGVhbjtcbiAgICBzcGFtX2FjdGlvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgICBzbXRwX3Bhc3N3b3JkOiBzdHJpbmc7XG4gICAgc210cF9sb2dpbjogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBka2ltX2hvc3Q/OiBzdHJpbmc7XG4gICAgbWFpbGZyb21faG9zdD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb21haW5zTGlzdEl0ZW0gZXh0ZW5kcyBEb21haW5EYXRhe1xuICAgIHJlY2VpdmluZ19kbnNfcmVjb3JkczogbnVsbDtcbiAgICBzZW5kaW5nX2Ruc19yZWNvcmRzOiBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEROU1JlY29yZCB7XG4gICAgY2FjaGVkOiBhbnlbXTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcmVjb3JkX3R5cGU6IHN0cmluZztcbiAgICB2YWxpZDogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgcHJpb3JpdHk/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblJlc3BvbnNlRGF0YSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGRvbWFpbjogRG9tYWluRGF0YTtcbiAgICAgICAgbWVzc2FnZT86IHN0cmluZztcbiAgICAgICAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXTtcbiAgICAgICAgc2VuZGluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW107XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5MaXN0UmVzcG9uc2VEYXRhID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IERvbWFpbnNMaXN0SXRlbVtdIHwgbnVsbDtcbiAgICAgICAgdG90YWxfY291bnQ6IG51bWJlcjtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VSZXNwb25zZSA9IHtcbiAgICBtZXNzYWdlIDogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIERlc3Ryb3llZERvbWFpblJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IE1lc3NhZ2VSZXNwb25zZVxufVxuXG5leHBvcnQgdHlwZSBDb25uZWN0aW9uU2V0dGluZ3MgPSB7XG4gICAgcmVxdWlyZV90bHM/OiBib29sZWFuO1xuICAgIHNraXBfdmVyaWZpY2F0aW9uPzogYm9vbGVhbjtcbn1cbmV4cG9ydCB0eXBlIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlID0ge1xuICAgIGJvZHk6IENvbm5lY3Rpb25TZXR0aW5nc1xuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MgPSB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICAgIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMgPSB7XG4gICAgYm9keTogVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncztcbiAgICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBES0lNQXV0aG9yaXR5SW5mbyA9IHtcbiAgICBzZWxmOiBib29sZWFuIHwgJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwnZmFsc2UnXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRES0lNQXV0aG9yaXR5ID0ge1xuICAgIGNoYW5nZWQ6IGJvb2xlYW47XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UgPSB7XG4gICAgYm9keTogVXBkYXRlZERLSU1BdXRob3JpdHk7XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERLSU1TZWxlY3RvckluZm8gPSB7XG4gICAgZGtpbVNlbGVjdG9yOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlID0ge1xuICAgIGJvZHk6TWVzc2FnZVJlc3BvbnNlO1xuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRES0lNU2VsZWN0b3JSZXN1bHQgPSBNZXNzYWdlUmVzcG9uc2UgJiB7XG4gIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFdlYlByZWZpeEluZm8gPSB7XG4gICAgd2ViUHJlZml4OiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZFdlYlByZWZpeCA9IHtcbiAgICBtZXNzYWdlIDogc3RyaW5nXG59XG5leHBvcnQgdHlwZSBVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2UgPSB7XG4gICAgYm9keTpNZXNzYWdlUmVzcG9uc2U7XG4gICAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgUmVwbGFjZW1lbnRGb3JQb29sID0ge1xuICAgIHBvb2xfaWQ/OiBzdHJpbmc7XG4gICAgaXA/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFREb21haW4gPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xuICBzdGF0ZTogc3RyaW5nO1xuICB3aWxkY2FyZDogYm9vbGVhbjtcbiAgc3BhbV9hY3Rpb246IHN0cmluZztcbiAgY3JlYXRlZF9hdDogRGF0ZTtcbiAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICBzbXRwX2xvZ2luOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgaWQ6IHN0cmluZztcbiAgaXNfZGlzYWJsZWQ6IGJvb2xlYW47XG4gIHdlYl9wcmVmaXg6IHN0cmluZztcbiAgd2ViX3NjaGVtZTogc3RyaW5nO1xuICB1c2VfYXV0b21hdGljX3NlbmRlcl9zZWN1cml0eTogYm9vbGVhbjtcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgZGtpbV9ob3N0Pzogc3RyaW5nO1xuICBtYWlsZnJvbV9ob3N0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5EeW5hbWljUHJvcHNUeXBlID0gUGljazxEb21haW5EYXRhLCAnZGtpbV9ob3N0JyB8ICdtYWlsZnJvbV9ob3N0JyA+XG5cbmV4cG9ydCB0eXBlIERvbWFpbkdldFF1ZXJ5ID0ge1xuICBleHRlbmRlZD86IGJvb2xlYW47XG4gIHdpdGhfZG5zPzogYm9vbGVhbjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vRG9tYWluQ3JlZGVudGlhbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5zJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGFncyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRlbXBsYXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRyYWNraW5nJztcbiIsImltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcblxuZXhwb3J0IHR5cGUgRXZlbnRzUGFnZSA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG51bWJlcjogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBGaWx0ZXJGaWVsZCA9IHtcbiAgICBldmVudD86IHN0cmluZztcbiAgICBsaXN0Pzogc3RyaW5nO1xuICAgIGF0dGFjaG1lbnQ/OiBzdHJpbmc7XG4gICAgZnJvbT86IHN0cmluZztcbiAgICAnbWVzc2FnZS1pZCc/OiBzdHJpbmc7XG4gICAgc3ViamVjdD86IHN0cmluZztcbiAgICB0bz86IHN0cmluZztcbiAgICBzaXplPzogc3RyaW5nO1xuICAgIHJlY2lwaWVudD86IHN0cmluZztcbiAgICByZWNpcGllbnRzPzogc3RyaW5nO1xuICAgIHRhZ3M/OiBzdHJpbmc7XG4gICAgc2V2ZXJpdHk/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEV2ZW50c1F1ZXJ5ID0gRmlsdGVyRmllbGQgJiB7XG4gICAgcGFnZT86IHN0cmluZztcbiAgICBiZWdpbj86IHN0cmluZztcbiAgICBlbmQ/OiBzdHJpbmc7XG4gICAgYXNjZW5kaW5nPzogJ3llcyd8ICdubyc7XG4gICAgbGltaXQ/OiBudW1iZXI7XG59XG5leHBvcnQgdHlwZSBFdmVudHNSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBbXTtcbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3Q7XG4gICAgfSxcbiAgICBzdGF0dXM6IG51bWJlclxufVxuZXhwb3J0IHR5cGUgRG9tYWluRXZlbnQgPSB7XG4gICAgc2V2ZXJpdHk6IHN0cmluZztcbiAgICB0YWdzOiBzdHJpbmdbXTtcbiAgICBzdG9yYWdlOiB7XG4gICAgICAgIHVybDogc3RyaW5nO1xuICAgICAgICBrZXk6IHN0cmluZ1xuICAgIH07XG4gICAgJ2RlbGl2ZXJ5LXN0YXR1cyc6IHtcbiAgICAgICAgdGxzOiBib29sZWFuO1xuICAgICAgICAnbXgtaG9zdCc6IHN0cmluZztcbiAgICAgICAgY29kZTogbnVtYmVyO1xuICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgICAgICAnc2Vzc2lvbi1zZWNvbmRzJzogbnVtYmVyO1xuICAgICAgICB1dGY4OiBib29sZWFuO1xuICAgICAgICAnYXR0ZW1wdC1ubyc6IG51bWJlcjtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICAnY2VydGlmaWNhdGUtdmVyaWZpZWQnOiBib29sZWFuXG4gICAgfTtcbiAgICAncmVjaXBpZW50LWRvbWFpbic6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIGNhbXBhaWduczogW107XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgJ3VzZXItdmFyaWFibGVzJzoge1xuICAgICAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICAgIH07XG4gICAgZmxhZ3M6IHtcbiAgICAgICAgJ2lzLXJvdXRlZCc6IGJvb2xlYW47XG4gICAgICAgICdpcy1hdXRoZW50aWNhdGVkJzogYm9vbGVhbjtcbiAgICAgICAgJ2lzLXN5c3RlbS10ZXN0JzogYm9vbGVhbjtcbiAgICAgICAgJ2lzLXRlc3QtbW9kZSc6IGJvb2xlYW5cbiAgICB9O1xuICAgICdsb2ctbGV2ZWwnIDogc3RyaW5nO1xuICAgIHRlbXBsYXRlPzogdW5rbm93bjtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICBlbnZlbG9wZToge1xuICAgICAgICB0cmFuc3BvcnQ6IHN0cmluZztcbiAgICAgICAgc2VuZGVyOiBzdHJpbmc7XG4gICAgICAgICdzZW5kaW5nLWlwJzogc3RyaW5nO1xuICAgICAgICB0YXJnZXRzOiBzdHJpbmdcbiAgICB9O1xuICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgdG86IHN0cmluZztcbiAgICAgICAgICAgICdtZXNzYWdlLWlkJzogc3RyaW5nO1xuICAgICAgICAgICAgZnJvbTogc3RyaW5nO1xuICAgICAgICAgICAgc3ViamVjdDogc3RyaW5nXG4gICAgICAgIH07XG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXTtcbiAgICAgICAgc2l6ZTogMzA4XG4gICAgfTtcbiAgICByZWNpcGllbnQ6IHN0cmluZztcbiAgICBldmVudDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBFdmVudHNMaXN0ID0ge1xuICAgIGl0ZW1zOiBEb21haW5FdmVudFtdO1xuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0V2ZW50cyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIElwUG9vbCA9IHtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaXBzOiBzdHJpbmdbXTtcbiAgaXNfbGlua2VkOiBib29sZWFuO1xuICBuYW1lOiBzdHJpbmc7XG4gIHBvb2xfaWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sTGlzdFJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgaXBfcG9vbHM6IElwUG9vbCxcbiAgICBtZXNzYWdlOiBzdHJpbmdcbiAgfSxcbiAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sTGlzdFJlc3VsdCA9IHtcbiAgaXBfcG9vbHM6IElwUG9vbCxcbiAgbWVzc2FnZTogc3RyaW5nLFxuICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xVcGRhdGVEYXRhID0ge1xuICBuYW1lOiBzdHJpbmcsXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gIGlwczogc3RyaW5nW11cbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sTWVzc2FnZVJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICB9XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xNZXNzYWdlUmVzdWx0ID0ge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xEZWxldGVEYXRhID0ge1xuICBpcD86IHN0cmluZyxcbiAgcG9vbF9pZD86IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xDcmVhdGVEYXRhID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBpcHM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sQ3JlYXRlUmVzcG9uc2UgPSB7XG4gIGJvZHk6IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcG9vbF9pZDogc3RyaW5nO1xuICB9XG4gIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbENyZWF0ZVJlc3VsdCA9IHtcbiAgc3RhdHVzOiBudW1iZXJcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBwb29sX2lkOiBzdHJpbmc7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lwUG9vbHMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBJcHNMaXN0UmVzcG9uc2VCb2R5ID0ge1xuICBhc3NpZ25hYmxlX3RvX3Bvb2xzOiBib29sZWFuO1xuICBpdGVtczogc3RyaW5nW107XG4gIHRvdGFsX2NvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIElwRGF0YSA9IHtcbiAgaXA6IHN0cmluZztcbiAgZGVkaWNhdGVkOiBib29sZWFuO1xuICByZG5zOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIElQc0xpc3RRdWVyeSA9IHtcbiAgZGVkaWNhdGVkOiBib29sZWFuIHwgc3RyaW5nXG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lQcyc7XG4iLCJpbXBvcnQgeyBBeGlvc1Byb3h5Q29uZmlnIH0gZnJvbSAnYXhpb3MnO1xuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBNYWlsZ3VuQ2xpZW50T3B0aW9ucyA9IHtcbiAgdXNlcm5hbWU6IHN0cmluZztcbiAga2V5OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgcHVibGljX2tleT86IHN0cmluZztcbiAgdGltZW91dD86IG51bWJlcjtcbiAgcHJveHk/OiBBeGlvc1Byb3h5Q29uZmlnO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NYWlsZ3VuQ2xpZW50T3B0aW9ucyc7XG4iLCJpbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5pbXBvcnQgeyBNYWlsaW5nTGlzdCB9IGZyb20gJy4vTWFpbGluZ0xpc3RzJztcblxuZXhwb3J0IHR5cGUgTWFpbExpc3RNZW1iZXIgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzdWJzY3JpYmVkOiBib29sZWFuLFxuICAgIHZhcnM6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93blxuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIE1haWxMaXN0TWVtYmVyc1F1ZXJ5ID0ge1xuICAgIHN1YnNjcmliZWQ/OiAneWVzJyB8ICdubyc7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgcGFnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVNZW1iZXJzRGF0YSA9IHtcbiAgICBtZW1iZXJzOiBBcnJheTxNYWlsTGlzdE1lbWJlcj47XG4gICAgdXBzZXJ0OiAneWVzJyB8ICdubyc7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlTWVtYmVyc1JlcURhdGEgPSB7XG4gICAgbWVtYmVyczogc3RyaW5nO1xuICAgIHVwc2VydDogJ3llcycgfCAnbm8nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdmFycz86IHN0cmluZztcbiAgICBzdWJzY3JpYmVkPzogJ3llcycgfCAnbm8nIHwgYm9vbGVhbjtcbiAgICB1cHNlcnQ/OiAneWVzJyB8ICdubyc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1JlcSA9IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICB2YXJzPzogc3RyaW5nO1xuICAgIHN1YnNjcmliZWQ/OiAneWVzJyB8ICdubycgfCBib29sZWFuO1xuICAgIHVwc2VydD86ICd5ZXMnIHwgJ25vJztcbn1cblxuZXhwb3J0IHR5cGUgRGVsZXRlZE1lbWJlciA9IHtcbiAgICBtZW1iZXI6IHtcbiAgICAgICAgYWRkcmVzczogc3RyaW5nO1xuICAgIH0sXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICB9XG5cbmV4cG9ydCB0eXBlIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlID0ge1xuICAgIGxpc3Q6IE1haWxpbmdMaXN0O1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAndGFzay1pZCc6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWFpbExpc3RNZW1iZXJzUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogTWFpbExpc3RNZW1iZXJbXVxuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdFxuICAgIH0sXG4gICAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgTWFpbExpc3RNZW1iZXJzUmVzdWx0ID0ge1xuICAgIGl0ZW1zOiBNYWlsTGlzdE1lbWJlcltdXG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdFxuICAgIHN0YXR1czogbnVtYmVyXG59XG4iLCJpbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgTGlzdHNRdWVyeSA9IHtcbiAgICBhZGRyZXNzPzogc3RyaW5nO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVVwZGF0ZUxpc3QgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgYWNjZXNzX2xldmVsPzogJ3JlYWRvbmx5JyB8ICdtZW1iZXJzJ3wgJ2V2ZXJ5b25lJztcbiAgICByZXBseV9wcmVmZXJlbmNlPzogJ2xpc3QnIHwgJ3NlbmRlcic7XG59XG5cbmV4cG9ydCB0eXBlIERlc3Ryb3llZExpc3QgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgU3RhcnRWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgICBkb3dubG9hZF91cmw6IHtcbiAgICAgIGNzdjogc3RyaW5nO1xuICAgICAganNvbjogc3RyaW5nXG4gICAgfTtcbiAgICBpZDogc3RyaW5nO1xuICAgIHF1YW50aXR5OiBudW1iZXI7XG4gICAgcmVjb3Jkc19wcm9jZXNzZWQ6IG51bWJlcjtcbiAgICBzdW1tYXJ5OiB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgY2F0Y2hfYWxsOiBudW1iZXI7XG4gICAgICAgIGRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgIGRvX25vdF9zZW5kOiBudW1iZXI7XG4gICAgICAgIHVuZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgdW5rbm93bjogbnVtYmVyXG4gICAgICB9XG4gICAgICByaXNrOiB7XG4gICAgICAgIGhpZ2g6IG51bWJlcjtcbiAgICAgICAgbG93OiBudW1iZXI7XG4gICAgICAgIG1lZGl1bTogbnVtYmVyO1xuICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RWYWxpZGF0aW9uQXBpUmVzcG9uc2UgPSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXNwb25zZSAmIHtcbiAgICBjcmVhdGVkX2F0OiBudW1iZXI7XG59XG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHREYXRhID0gTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzcG9uc2UgJiB7XG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcbn1cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICB2YWxpZGF0aW9uUmVzdWx0OiBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHREYXRhO1xufVxuXG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3QgPSB7XG4gICAgYWNjZXNzX2xldmVsOiBzdHJpbmc7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIG1lbWJlcnNfY291bnQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcmVwbHlfcHJlZmVyZW5jZTogbnVsbCB8IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RSZXN1bHQgPSB7XG4gICAgaXRlbXM6IE1haWxpbmdMaXN0W107XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdFxufVxuXG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdEFwaVJlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IE1haWxpbmdMaXN0W107XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICAgIH1cbiAgICBzdGF0dXM6IG51bWJlcjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RNZW1iZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKipcbiAqIEVuc3VyZXMgdGhlIG9iamVjdCBoYXMgbGVhc3Qgb25lIGtleSBwcmVzZW50IGFuZCBub3QgdW5kZWZpbmVkXG4gKlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ5NzI1MTk4fVxuICovXG5leHBvcnQgdHlwZSBBdExlYXN0T25lS2V5UHJlc2VudDxcbiAgT2JqZWN0XyxcbiAgS2V5cyBleHRlbmRzIGtleW9mIE9iamVjdF8gPSBrZXlvZiBPYmplY3RfXG4+ID0gUGljazxPYmplY3RfLCBFeGNsdWRlPGtleW9mIE9iamVjdF8sIEtleXM+PiAmXG4gIHtcbiAgICBbSyBpbiBLZXlzXS0/OiBSZXF1aXJlZDxQaWNrPE9iamVjdF8sIEs+PiAmXG4gICAgICBQYXJ0aWFsPFBpY2s8T2JqZWN0XywgRXhjbHVkZTxLZXlzLCBLPj4+O1xuICB9W0tleXNdO1xuXG5leHBvcnQgdHlwZSBNaW1lTWVzc2FnZSA9IHN0cmluZyB8IEJsb2IgfCBCdWZmZXIgfCBOb2RlSlMuUmVhZGFibGVTdHJlYW07XG5leHBvcnQgdHlwZSBDdXN0b21GaWxlRGF0YSA9IHN0cmluZyB8IEJsb2IgfCBGaWxlIHwgQnVmZmVyIHwgTm9kZUpTLlJlYWRhYmxlU3RyZWFtO1xuXG5leHBvcnQgdHlwZSBDdXN0b21GaWxlID0ge1xuICBkYXRhOiBDdXN0b21GaWxlRGF0YTtcbiAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gIGNvbnRlbnRUeXBlPyA6IHN0cmluZztcbiAga25vd25MZW5ndGg/OiBudW1iZXI7XG4gIFtrZXk6IHN0cmluZ106IHVua25vd247XG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VBdHRhY2htZW50ID1cbiAgQ3VzdG9tRmlsZVxuICB8IEN1c3RvbUZpbGVbXVxuICB8IEZpbGVcbiAgfCBGaWxlW11cbiAgfCBzdHJpbmdcbiAgfCBDdXN0b21GaWxlRGF0YVxuICB8IEN1c3RvbUZpbGVEYXRhW11cblxuZXhwb3J0IHR5cGUgRm9ybURhdGFJbnB1dFZhbHVlID1cbiAgTWltZU1lc3NhZ2VcbiAgfCBDdXN0b21GaWxlRGF0YVxuICB8IHN0cmluZ1xuICB8IHN0cmluZ1tdXG4gIHwgYm9vbGVhblxuICB8IE1lc3NhZ2VBdHRhY2htZW50XG4gIHwgdW5kZWZpbmVkXG4gIHwgbnVtYmVyIC8vIGRvYyBzYXlzIGl0IHNob3VsZCBiZSBhdXRvLWNvbnZlcnRlZCBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRm9ybURhdGEvYXBwZW5kXG4gIHwgSnNvbk9iamVjdFxuXG5leHBvcnQgdHlwZSBKc29uUHJpbWl0aXZlID0gc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGw7XG5leHBvcnQgdHlwZSBKc29uQXJyYXkgPSBKc29uW107XG5leHBvcnQgdHlwZSBKc29uT2JqZWN0ID0geyBba2V5OiBzdHJpbmddOiBKc29uIH07XG5leHBvcnQgdHlwZSBKc29uQ29tcG9zaXRlID0gSnNvbkFycmF5IHwgSnNvbk9iamVjdDtcbmV4cG9ydCB0eXBlIEpzb24gPSBKc29uUHJpbWl0aXZlIHwgSnNvbkNvbXBvc2l0ZTtcblxuZXhwb3J0IHR5cGUgTWFpbGd1bk1lc3NhZ2VDb250ZW50ID0gQXRMZWFzdE9uZUtleVByZXNlbnQ8e1xuICAgIC8qKlxuICAgICAqIEJvZHkgb2YgdGhlIG1lc3NhZ2UuICh0ZXh0IHZlcnNpb24pXG4gICAgICovXG4gICAgdGV4dD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEJvZHkgb2YgdGhlIG1lc3NhZ2UuIChIVE1MIHZlcnNpb24pXG4gICAgICovXG4gICAgaHRtbD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBCb2R5IG9mIHRoZSBtZXNzYWdlLiAoTUlNRSB2ZXJzaW9uKVxuICAgICAqL1xuICAgIG1lc3NhZ2U/OiBNaW1lTWVzc2FnZTtcbiAgICAgLyoqXG4gICAgICogTmFtZSBvZiBhIHRlbXBsYXRlIHN0b3JlZCB2aWEgW3RlbXBsYXRlIEFQSV0oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC9hcGktdGVtcGxhdGVzLmh0bWwjYXBpLXRlbXBsYXRlcykuIFNlZSBbVGVtcGxhdGVzXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjdGVtcGxhdGluZykgZm9yIG1vcmUgaW5mb3JtYXRpb25cbiAgICAgKi9cbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbn0+O1xuXG5leHBvcnQgdHlwZSBNYWlsZ3VuTWVzc2FnZURhdGEgPSBNYWlsZ3VuTWVzc2FnZUNvbnRlbnQgJiB7XG4gICAgLyoqXG4gICAgICogRW1haWwgYWRkcmVzcyBmb3IgYEZyb21gIGhlYWRlclxuICAgICAqL1xuICAgIGZyb20/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBFbWFpbCBhZGRyZXNzIG9mIHRoZSByZWNpcGllbnQocykuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBgQm9iIDxib2JAaG9zdC5jb20+YC4gWW91IGNhbiB1c2UgY29tbWFzIHRvIHNlcGFyYXRlIG11bHRpcGxlIHJlY2lwaWVudHMuXG4gICAgICovXG4gICAgdG8/OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIFNhbWUgYXMgYFRvYCBidXQgZm9yIGBjYXJib24gY29weWBcbiAgICAgKi9cbiAgICBjYz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBgVG9gIGJ1dCBmb3IgYGJsaW5kIGNhcmJvbiBjb3B5YFxuICAgICAqL1xuICAgIGJjYz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogTWVzc2FnZSBzdWJqZWN0XG4gICAgICovXG4gICAgc3ViamVjdD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFtBTVBdKGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2dtYWlsL2FtcGVtYWlsLykgcGFydCBvZiB0aGUgbWVzc2FnZS4gUGxlYXNlIGZvbGxvdyBnb29nbGUgZ3VpZGVsaW5lcyB0byBjb21wb3NlIGFuZCBzZW5kIEFNUCBlbWFpbHMuXG4gICAgICovXG4gICAgJ2FtcC1odG1sJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEZpbGUgYXR0YWNobWVudC4gWW91IGNhbiBwb3N0IG11bHRpcGxlIGBhdHRhY2htZW50YCB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiAqKkltcG9ydGFudDoqKiBZb3UgbXVzdCB1c2UgYG11bHRpcGFydC9mb3JtLWRhdGFgIGVuY29kaW5nIHdoZW4gc2VuZGluZyBhdHRhY2htZW50cy5cbiAgICAgKi9cbiAgICBhdHRhY2htZW50PzogTWVzc2FnZUF0dGFjaG1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2htZW50IHdpdGggYGlubGluZWAgZGlzcG9zaXRpb24uIENhbiBiZSB1c2VkIHRvIHNlbmQgaW5saW5lIGltYWdlcyAoc2VlIGV4YW1wbGUpLlxuICAgICAqXG4gICAgICogWW91IGNhbiBwb3N0IG11bHRpcGxlIGBpbmxpbmVgIHZhbHVlcy5cbiAgICAgKi9cbiAgICBpbmxpbmU/OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyBwYXJhbWV0ZXIgdG8gc2VuZCBhIG1lc3NhZ2UgdG8gc3BlY2lmaWMgdmVyc2lvbiBvZiBhIHRlbXBsYXRlXG4gICAgICovXG4gICAgJ3Q6dmVyc2lvbic/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBQYXNzIGB5ZXNgIGlmIHlvdSB3YW50IHRvIGhhdmUgcmVuZGVyZWQgdGVtcGxhdGVcbiAgICAgKiBpbiB0aGUgdGV4dCBwYXJ0IG9mIHRoZSBtZXNzYWdlIGluIGNhc2Ugb2YgdGVtcGxhdGUgc2VuZGluZ1xuICAgICAqL1xuICAgICd0OnRleHQnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIEEgdmFsaWQgSlNPTi1lbmNvZGVkIGRpY3Rpb25hcnkgdXNlZCBhcyB0aGUgaW5wdXQgZm9yIHRlbXBsYXRlIHZhcmlhYmxlIGV4cGFuc2lvbi5cbiAgICAgKiBTZWUgW1RlbXBsYXRlc10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC9hcGktdGVtcGxhdGVzLmh0bWwjYXBpLXRlbXBsYXRlcykgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgJ3Q6dmFyaWFibGVzJz86IHN0cmluZyB8IEpzb25PYmplY3Q7XG5cbiAgICAvKipcbiAgICAgKiBUYWcgc3RyaW5nLiBTZWUgW1RhZ2dpbmddKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCN0YWdnaW5nKSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICAnbzp0YWcnPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzL2Rpc2FibGVzIERLSU0gc2lnbmF0dXJlcyBvbiBwZXItbWVzc2FnZSBiYXNpcy4gUGFzcyBgeWVzYCwgYG5vYCwgYHRydWVgIG9yIGBmYWxzZWBcbiAgICAgKi9cbiAgICAnbzpka2ltJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBEZXNpcmVkIHRpbWUgb2YgZGVsaXZlcnkuIFNlZSBbRGF0ZSBGb3JtYXRdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvYXBpLWludHJvLmh0bWwjZGF0ZS1mb3JtYXQpLlxuICAgICAqXG4gICAgICogTm90ZTogTWVzc2FnZXMgY2FuIGJlIHNjaGVkdWxlZCBmb3IgYSBtYXhpbXVtIG9mIDMgZGF5cyBpbiB0aGUgZnV0dXJlLlxuICAgICAqL1xuICAgICdvOmRlbGl2ZXJ5dGltZSc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIFNlbmQgVGltZSBPcHRpbWl6YXRpb24gKFNUTykgb24gYSBwZXItbWVzc2FnZSBiYXNpcy5cbiAgICAgKlxuICAgICAqIFN0cmluZyBzaG91bGQgYmUgc2V0IHRvIHRoZSBudW1iZXIgb2YgaG91cnMgaW4gYFswLTldK2hgIGZvcm1hdCxcbiAgICAgKiB3aXRoIHRoZSBtaW5pbXVtIGJlaW5nIGAyNGhgIGFuZCB0aGUgbWF4aW11bSBiZWluZyBgNzJoYC5cbiAgICAgKlxuICAgICAqIFRoaXMgdmFsdWUgZGVmaW5lcyB0aGUgdGltZSB3aW5kb3cgaW4gd2hpY2ggTWFpbGd1biB3aWxsIHJ1biB0aGUgb3B0aW1pemF0aW9uIGFsZ29yaXRobSBiYXNlZCBvbiBwcmlvciBlbmdhZ2VtZW50IGRhdGEgb2YgYSBnaXZlbiByZWNpcGllbnQuIFNlZSBbU2VuZGluZyBhIG1lc3NhZ2Ugd2l0aCBTVE9dKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCNzdG8tc2VuZGluZykgZm9yIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBfUGxlYXNlIG5vdGUgdGhhdCBTVE8gaXMgb25seSBhdmFpbGFibGUgb24gY2VydGFpbiBwbGFucy5cbiAgICAgKiBTZWUgd3d3Lm1haWxndW4uY29tL3ByaWNpbmcgZm9yIG1vcmUgaW5mby5fXG4gICAgICovXG4gICAgJ286ZGVsaXZlcnl0aW1lLW9wdGltaXplLXBlcmlvZCc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIFRpbWV6b25lIE9wdGltaXphdGlvbiAoVFpPKSBvbiBhIHBlciBtZXNzYWdlIGJhc2lzLlxuICAgICAqXG4gICAgICogU3RyaW5nIHNob3VsZCBiZSBzZXQgdG8gcHJlZmVycmVkIGRlbGl2ZXJ5IHRpbWUgaW4gYEhIOm1tYCBvciBgaGg6bW1hYWAgZm9ybWF0LCB3aGVyZSBgSEg6bW1gIGlzIHVzZWQgZm9yIDI0IGhvdXIgZm9ybWF0IHdpdGhvdXQgQU0vUE0gYW5kIGBoaDptbWFhYCBpcyB1c2VkIGZvciAxMiBob3VyIGZvcm1hdCB3aXRoIEFNL1BNLiBTZWUgW1NlbmRpbmcgYSBtZXNzYWdlIHdpdGggVFpPXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjdHpvLXNlbmRpbmcpIGZvciBkZXRhaWxzLlxuICAgICAqXG4gICAgICogUGxlYXNlIG5vdGUgdGhhdCBUWk8gaXMgb25seSBhdmFpbGFibGUgb24gY2VydGFpbiBwbGFucy5cbiAgICAgKiBTZWUgd3d3Lm1haWxndW4uY29tL3ByaWNpbmcgZm9yIG1vcmUgaW5mby5cbiAgICAgKi9cbiAgICAnbzp0aW1lLXpvbmUtbG9jYWxpemUnPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBzZW5kaW5nIGluIHRlc3QgbW9kZS4gUGFzcyBgeWVzYCBpZiBuZWVkZWQuIFNlZSBbU2VuZGluZyBpbiBUZXN0IE1vZGVdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCNtYW51YWwtdGVzdG1vZGUpXG4gICAgICovXG4gICAgJ286dGVzdG1vZGUnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdHJhY2tpbmcgb24gYSBwZXItbWVzc2FnZSBiYXNpcywgc2VlIFtUcmFja2luZyBNZXNzYWdlc10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI3RyYWNraW5nLW1lc3NhZ2VzIGZvciBkZXRhaWxzLiBQYXNzICd5ZXMnLCAnbm8nLCAndHJ1ZScgb3IgJ2ZhbHNlJ1xuICAgICAqL1xuICAgICdvOnRyYWNraW5nJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIGNsaWNrcyB0cmFja2luZyBvbiBhIHBlci1tZXNzYWdlIGJhc2lzLlxuICAgICAqIEhhcyBoaWdoZXIgcHJpb3JpdHkgdGhhbiBkb21haW4tbGV2ZWwgc2V0dGluZy5cbiAgICAgKiBQYXNzIGB5ZXNgLCBgbm9gLCBgdHJ1ZWAsIGBmYWxzZWAgb3IgYGh0bWxvbmx5YC5cbiAgICAgKi9cbiAgICAnbzp0cmFja2luZy1jbGlja3MnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJyB8ICdodG1sb25seSc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIG9wZW5zIHRyYWNraW5nIG9uIGEgcGVyLW1lc3NhZ2UgYmFzaXMuXG4gICAgICogSGFzIGhpZ2hlciBwcmlvcml0eSB0aGFuIGRvbWFpbi1sZXZlbCBzZXR0aW5nLlxuICAgICAqICBQYXNzICd5ZXMnIG9yICdubycsICd0cnVlJyBvciAnZmFsc2UnXG4gICAgICovXG4gICAgJ286dHJhY2tpbmctb3BlbnMnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIElmIHNldCB0byAnVHJ1ZScgb3IgJ3llcycgdGhpcyByZXF1aXJlcyB0aGUgbWVzc2FnZSBvbmx5IGJlIHNlbnQgb3ZlciBhIFRMUyBjb25uZWN0aW9uLlxuICAgICAqIElmIGEgVExTIGNvbm5lY3Rpb24gY2FuIG5vdCBiZSBlc3RhYmxpc2hlZCwgTWFpbGd1biB3aWxsIG5vdCBkZWxpdmVyIHRoZSBtZXNzYWdlLlxuICAgICAqXG4gICAgICogSWYgc2V0IHRvICdGYWxzZScgb3IgJ25vJywgTWFpbGd1biB3aWxsIHN0aWxsIHRyeSBhbmQgdXBncmFkZSB0aGUgY29ubmVjdGlvbixcbiAgICAgKiBidXQgaWYgTWFpbGd1biBjYW4gbm90LCB0aGUgbWVzc2FnZSB3aWxsIGJlIGRlbGl2ZXJlZCBvdmVyIGEgcGxhaW50ZXh0IFNNVFAgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IGlzICdGYWxzZScuXG4gICAgICovXG4gICAgJ286cmVxdWlyZS10bHMnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIElmIHNldCB0byBgVHJ1ZWAgb3IgYHllc2AsIHRoZSBjZXJ0aWZpY2F0ZSBhbmQgaG9zdG5hbWUgd2lsbCBub3QgYmUgdmVyaWZpZWRcbiAgICAgKiB3aGVuIHRyeWluZyB0byBlc3RhYmxpc2ggYSBUTFMgY29ubmVjdGlvblxuICAgICAqIGFuZCBNYWlsZ3VuIHdpbGwgYWNjZXB0IGFueSBjZXJ0aWZpY2F0ZSBkdXJpbmcgZGVsaXZlcnkuXG4gICAgICpcbiAgICAgKiBJZiBzZXQgdG8gYEZhbHNlYCBvciBgbm9gLCBNYWlsZ3VuIHdpbGwgdmVyaWZ5IHRoZSBjZXJ0aWZpY2F0ZSBhbmQgaG9zdG5hbWUuXG4gICAgICogSWYgZWl0aGVyIG9uZSBjYW4gbm90IGJlIHZlcmlmaWVkLCBhIFRMUyBjb25uZWN0aW9uIHdpbGwgbm90IGJlIGVzdGFibGlzaGVkLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaXMgYEZhbHNlYC5cbiAgICAgKi9cbiAgICAnbzpza2lwLXZlcmlmaWNhdGlvbic/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogQSB2YWxpZCBKU09OLWVuY29kZWQgZGljdGlvbmFyeSwgd2hlcmUga2V5IGlzIGEgcGxhaW4gcmVjaXBpZW50IGFkZHJlc3MgYW5kIHZhbHVlIGlzIGEgZGljdGlvbmFyeSB3aXRoIHZhcmlhYmxlcyB0aGF0IGNhbiBiZSByZWZlcmVuY2VkIGluIHRoZSBtZXNzYWdlIGJvZHkuIFNlZSBbQmF0Y2ggU2VuZGluZ10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI2JhdGNoLXNlbmRpbmcpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgICdyZWNpcGllbnQtdmFyaWFibGVzJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIGg6JyBwcmVmaXggZm9sbG93ZWQgYnkgYW4gYXJiaXRyYXJ5IHZhbHVlIGFsbG93cyB0byBhcHBlbmQgYSBjdXN0b20gTUlNRSBoZWFkZXJcbiAgICAgKiB0byB0aGUgbWVzc2FnZSAoJ1gtTXktSGVhZGVyJyBpbiB0aGlzIGNhc2UpLlxuICAgICAqIEZvciBleGFtcGxlLCBgaDpSZXBseS1Ub2AgdG8gc3BlY2lmeSBSZXBseS1UbyBhZGRyZXNzLlxuICAgICAqL1xuICAgICdoOlgtTXktSGVhZGVyJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIGB2OmAgcHJlZml4IGZvbGxvd2VkIGJ5IGFuIGFyYml0cmFyeSBuYW1lIGFsbG93cyB0byBhdHRhY2ggYSBjdXN0b20gSlNPTiBkYXRhIHRvIHRoZSBtZXNzYWdlLiBTZWUgW0F0dGFjaGluZyBEYXRhIHRvIE1lc3NhZ2VzXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjbWFudWFsLWN1c3RvbWRhdGEpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgICd2Om15LXZhcic/OiBzdHJpbmc7XG5cbiAgICBba2V5OiBzdHJpbmddOiBGb3JtRGF0YUlucHV0VmFsdWU7XG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VzU2VuZEFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTWVzc2FnZXNTZW5kUmVzdWx0ID0ge1xuICAgIGlkPzogc3RyaW5nLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgZGV0YWlscz86IHN0cmluZztcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTWVzc2FnZXMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBSb3V0ZSA9IHtcbiAgICBhY3Rpb25zOiBzdHJpbmdbXTtcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBleHByZXNzaW9uOiBzdHJpbmc7XG4gICAgaWQ6IHN0cmluZztcbiAgICBwcmlvcml0eTogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVSb3V0ZVJlc3BvbnNlID0gUm91dGUgJiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEZXN0cm95Um91dGVSZXNwb25zZSA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlVXBkYXRlUm91dGVEYXRhID0ge1xuICAgIHByaW9yaXR5PzogbnVtYmVyO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIGV4cHJlc3Npb246IHN0cmluZztcbiAgICBhY3Rpb246IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgdHlwZSBSb3V0ZXNMaXN0UXVlcnkgPSB7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgc2tpcD86IG51bWJlcjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vUm91dGVzJztcbiIsImV4cG9ydCB0eXBlIFN0YXQgPSB7XG4gIHRpbWU6IHN0cmluZyB8IERhdGUsXG4gIGRlbGl2ZXJlZDoge1xuICAgIHNtdHA6IG51bWJlcixcbiAgICBodHRwOiBudW1iZXIsXG4gICAgdG90YWw6IG51bWJlclxuICB9XG59XG5cbmV4cG9ydCB0eXBlIFN0YXRzT3B0aW9ucyA9IHtcbiAgc3RhcnQ6IHN0cmluZyB8IERhdGU7XG4gIGVuZDogc3RyaW5nIHwgRGF0ZTtcbiAgcmVzb2x1dGlvbjogc3RyaW5nO1xuICBzdGF0czogU3RhdFtdO1xufVxuXG5leHBvcnQgdHlwZSBTdGF0c0V2ZW50ID0gJ2FjY2VwdGVkJyB8ICdkZWxpdmVyZWQnIHwgJ29wZW5lZCcgfCAnY2xpY2tlZCcgfCAndW5zdWJzY3JpYmVkJyB8ICdzdG9yZWQnIHwgJ2NvbXBsYWluZWQnIHwgJ2ZhaWxlZCc7XG5cbmV4cG9ydCB0eXBlIFN0YXRzUXVlcnkgPSB7XG4gIGV2ZW50OiBTdGF0c0V2ZW50IHwgU3RhdHNFdmVudFtdO1xuICBzdGFydD86IHN0cmluZyB8IERhdGU7XG4gIGVuZD86IHN0cmluZyB8IERhdGU7XG4gIHJlc29sdXRpb24/OiAnaG91cid8ICdkYXknIHwgJ21vbnRoJztcbiAgZHVyYXRpb24/OiBzdHJpbmc7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1N0YXRzJztcbiIsImV4cG9ydCB0eXBlIFN1YmFjY291bnRzUXVlcnkgPSB7XG4gIGVuYWJsZWQ/OiBib29sZWFuO1xuICBsaW1pdD86IG51bWJlcjtcbiAgc2tpcD86IG51bWJlcjtcbiAgc29ydD86ICdhc2MnIHwgJ2Rlc2MnO1xufVxuXG5leHBvcnQgdHlwZSBTdWJhY2NvdW50TGlzdEl0ZW0gPSB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgc3RhdHVzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFN1YmFjY291bnRMaXN0UmVzcG9uc2VEYXRhID0ge1xuICBzdWJhY2NvdW50czogU3ViYWNjb3VudExpc3RJdGVtW107XG4gIHRvdGFsOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1YmFjY291bnRSZXNwb25zZURhdGEgPSB7XG4gIHN1YmFjY291bnQ6IFN1YmFjY291bnRMaXN0SXRlbVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9TdWJhY2NvdW50cyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIEJvdW5jZURhdGEgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIENvbXBsYWludERhdGEgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG4iLCJpbXBvcnQge1xuICBCb3VuY2VEYXRhLFxuICBDb21wbGFpbnREYXRhLFxuICBVbnN1YnNjcmliZURhdGEsXG4gIFdoaXRlTGlzdERhdGFcbn0gZnJvbSAnLic7XG5pbXBvcnQge1xuICBJQm91bmNlLCBJQ29tcGxhaW50LCBJVW5zdWJzY3JpYmUsIElXaGl0ZUxpc3Rcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uTGlzdCA9IHtcbiAgaXRlbXM6IChJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3QpW107XG4gIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkxpc3RRdWVyeSA9IHtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uRGF0YVR5cGUgPSBCb3VuY2VEYXRhIHwgQ29tcGxhaW50RGF0YSB8IFVuc3Vic2NyaWJlRGF0YSB8IFdoaXRlTGlzdERhdGE7XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgaXRlbXM6IEJvdW5jZURhdGFbXSB8IENvbXBsYWludERhdGFbXSB8IFVuc3Vic2NyaWJlRGF0YVtdIHwgV2hpdGVMaXN0RGF0YVtdO1xuICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICB9XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvblJlc3BvbnNlID0ge1xuICBib2R5OiBTdXBwcmVzc2lvbkRhdGFUeXBlO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25EZXN0cm95UmVzcG9uc2UgPSB7XG4gIGJvZHk6IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdmFsdWU/OiBzdHJpbmc7XG4gICAgYWRkcmVzcz86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25EZXN0cm95UmVzdWx0ID0ge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvZGU/OiBudW1iZXI7XG4gIGVycm9yPzogc3RyaW5nO1xuICBkb21haW4/OiBzdHJpbmc7XG4gIHRhZz86IHN0cmluZzsgLy8gd29ya3Mgb25seSB3aXRoIEZvcm1EYXRhIHVzYWdlIGZvciBvbmUgdW5zdWJzY3JpYmVcbiAgY3JlYXRlZF9hdD86IHN0cmluZyA7XG4gIHRhZ3M/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlID0ge1xuICBib2R5OntcbiAgICBtZXNzYWdlOnN0cmluZztcbiAgICB0eXBlPzogc3RyaW5nO1xuICAgIHZhbHVlPzogc3RyaW5nO1xuICB9XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0ID0ge1xuICBtZXNzYWdlOnN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgVW5zdWJzY3JpYmVEYXRhID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICB0YWdzOiBhbnk7XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nIHwgRGF0ZTtcbn1cbiIsImV4cG9ydCB0eXBlIFdoaXRlTGlzdERhdGEgPSB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBzdHJpbmcgfCBEYXRlO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Cb3VuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9Db21wbGFpbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9TdXBwcmVzc2lvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9VbnN1YnNjcmliZSc7XG5leHBvcnQgKiBmcm9tICcuL1doaXRlTGlzdCc7XG4iLCJpbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5pbXBvcnQgeyBDdXN0b21GaWxlLCBDdXN0b21GaWxlRGF0YSB9IGZyb20gJy4uL01lc3NhZ2VzJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JEYXRhID0ge1xuICAgIGNyZWF0ZWRfYXQ6IG51bWJlcjtcbiAgICBpZDogc3RyaW5nO1xuICAgIHF1YW50aXR5OiBudW1iZXI7XG4gICAgcmVjb3Jkc19wcm9jZXNzZWQ6IG51bWJlciB8IG51bGw7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgZG93bmxvYWRfdXJsPzoge1xuICAgICAgICBjc3Y6IHN0cmluZztcbiAgICAgICAganNvbjogc3RyaW5nO1xuICAgIH07XG4gICAgc3VtbWFyeT86IHtcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICBjYXRjaF9hbGw6IG51bWJlcjtcbiAgICAgICAgICAgIGRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgICBkb19ub3Rfc2VuZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5kZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgICB9O1xuICAgICAgICByaXNrOiB7XG4gICAgICAgICAgICBoaWdoOiBudW1iZXI7XG4gICAgICAgICAgICBsb3c6IG51bWJlcjtcbiAgICAgICAgICAgIG1lZGl1bTogbnVtYmVyO1xuICAgICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHQgPSB7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcXVhbnRpdHk6IG51bWJlcjtcbiAgICByZWNvcmRzUHJvY2Vzc2VkOiBudW1iZXIgfCBudWxsO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIHJlc3BvbnNlU3RhdHVzQ29kZTogbnVtYmVyOyAvLyBodHRwIHJlc3BvbnNlIHN0YXR1cyBjb2RlXG4gICAgZG93bmxvYWRVcmw/OiB7XG4gICAgICAgIGNzdjogc3RyaW5nO1xuICAgICAgICBqc29uOiBzdHJpbmc7XG4gICAgfTtcbiAgICBzdW1tYXJ5Pzoge1xuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgIGNhdGNoQWxsOiBudW1iZXI7XG4gICAgICAgICAgICBkZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgICAgZG9Ob3RTZW5kOiBudW1iZXI7XG4gICAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgICAgIHJpc2s6IHtcbiAgICAgICAgICAgIGhpZ2g6IG51bWJlcjtcbiAgICAgICAgICAgIGxvdzogbnVtYmVyO1xuICAgICAgICAgICAgbWVkaXVtOiBudW1iZXI7XG4gICAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGEgPSB7XG4gICAgZmlsZTogQ3VzdG9tRmlsZURhdGEgfCBDdXN0b21GaWxlXG59XG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkID0ge1xuICAgIG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IEN1c3RvbUZpbGVEYXRhIHwgQ3VzdG9tRmlsZTtcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQgPSB7XG4gICAgam9iczogTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0W107XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbiAgICB0b3RhbDogbnVtYmVyO1xuICAgIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFF1ZXJ5ID0ge1xuICAgIGxpbWl0OiBudW1iZXI7XG4gICAgcGFnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICAgICAgICBqb2JzOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JEYXRhW107XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfVxufVxuZXhwb3J0IHR5cGUgQ2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IgPSB7XG4gICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuZXhwb3J0IHR5cGUgVmFsaWRhdGlvblF1ZXJ5ID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG59XG5leHBvcnQgdHlwZSBWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGlzX2Rpc3Bvc2FibGVfYWRkcmVzczogYm9vbGVhbjtcbiAgaXNfcm9sZV9hZGRyZXNzOiBib29sZWFuO1xuICByZWFzb246IHN0cmluZ1tdO1xuICByZXN1bHQ6IHN0cmluZztcbiAgcmlzazogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBWYWxpZGF0aW9uUmVzcG9uc2UgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBib2R5OiBWYWxpZGF0aW9uUmVzdWx0O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NdWx0aXBsZVZhbGlkYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9uJztcbiIsImV4cG9ydCB0eXBlIEFQSVdlYmhvb2sgPSB7XG4gICAgdXJsPzogc3RyaW5nXG4gICAgdXJscz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgdHlwZSBXZWJob29rUmVzcG9uc2VCb2R5ID0ge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB3ZWJob29rOiBBUElXZWJob29rO1xufVxuXG5leHBvcnQgdHlwZSBXZWJob29rUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keTogV2ViaG9va1Jlc3BvbnNlQm9keTtcbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va0xpc3QgPSB7XG4gICAgW2lkOiBzdHJpbmddOiB7XG4gICAgICAgIHVybHM6IHN0cmluZ1tdXG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBXZWJob29rc1F1ZXJ5ID0ge1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHNraXA/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2UgPSB7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va1Jlc3VsdCA9IHtcbiAgaWQ6IHN0cmluZztcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVybCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLiBVc2UgXCJ1cmxzXCIgaW5zdGVhZC5cbiAgICovXG4gIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICB1cmxzOiBzdHJpbmdbXTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vV2ViaG9va3MnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9Db21tb24nO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5zJztcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vSVBQb29scyc7XG5leHBvcnQgKiBmcm9tICcuL0lQcyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxndW5DbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9NZXNzYWdlcyc7XG5leHBvcnQgKiBmcm9tICcuL1JvdXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRzJztcbmV4cG9ydCAqIGZyb20gJy4vU3ViYWNjb3VudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdXBwcmVzc2lvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL1dlYmhvb2tzJztcbiIsImltcG9ydCBNYWlsZ3VuQ2xpZW50IGZyb20gJy4vQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50JztcbmltcG9ydCB7IElNYWlsZ3VuQ2xpZW50IH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEsIE1haWxndW5DbGllbnRPcHRpb25zIH0gZnJvbSAnLi9UeXBlcyc7XG5cbmV4cG9ydCAqIGFzIEVudW1zIGZyb20gJy4vRW51bXMnO1xuZXhwb3J0ICogZnJvbSAnLi9UeXBlcyc7XG5leHBvcnQgKiBhcyBJbnRlcmZhY2VzIGZyb20gJy4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW4ge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHQoKTogdHlwZW9mIE1haWxndW4geyByZXR1cm4gdGhpczsgfVxuICBwcml2YXRlIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhXG5cbiAgY29uc3RydWN0b3IoRm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLmZvcm1EYXRhID0gRm9ybURhdGE7XG4gIH1cblxuICBjbGllbnQob3B0aW9uczogTWFpbGd1bkNsaWVudE9wdGlvbnMpIDogSU1haWxndW5DbGllbnQge1xuICAgIHJldHVybiBuZXcgTWFpbGd1bkNsaWVudChvcHRpb25zLCB0aGlzLmZvcm1EYXRhKTtcbiAgfVxufVxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9iYXNlNjQgdjEuMC4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMS4wLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiKGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pO1xuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG59KSgndXJsam9pbicsIHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBub3JtYWxpemUgKHN0ckFycmF5KSB7XG4gICAgdmFyIHJlc3VsdEFycmF5ID0gW107XG4gICAgaWYgKHN0ckFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cblxuICAgIGlmICh0eXBlb2Ygc3RyQXJyYXlbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIHN0ckFycmF5WzBdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZmlyc3QgcGFydCBpcyBhIHBsYWluIHByb3RvY29sLCB3ZSBjb21iaW5lIGl0IHdpdGggdGhlIG5leHQgcGFydC5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15bXi86XSs6XFwvKiQvKSAmJiBzdHJBcnJheS5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgZmlyc3QgPSBzdHJBcnJheS5zaGlmdCgpO1xuICAgICAgc3RyQXJyYXlbMF0gPSBmaXJzdCArIHN0ckFycmF5WzBdO1xuICAgIH1cblxuICAgIC8vIFRoZXJlIG11c3QgYmUgdHdvIG9yIHRocmVlIHNsYXNoZXMgaW4gdGhlIGZpbGUgcHJvdG9jb2wsIHR3byBzbGFzaGVzIGluIGFueXRoaW5nIGVsc2UuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eZmlsZTpcXC9cXC9cXC8vKSkge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLycpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBzdHJBcnJheVtpXTtcblxuICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgY29tcG9uZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvbmVudCA9PT0gJycpIHsgY29udGludWU7IH1cblxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBzdGFydGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGZpcnN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvXltcXC9dKy8sICcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgc3RyQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgZW5kaW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgbGFzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3IgdGhlIGxhc3QgY29tcG9uZW50IHdlIHdpbGwgY29tYmluZSBtdWx0aXBsZSBzbGFzaGVzIHRvIGEgc2luZ2xlIG9uZS5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnLycpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRBcnJheS5wdXNoKGNvbXBvbmVudCk7XG5cbiAgICB9XG5cbiAgICB2YXIgc3RyID0gcmVzdWx0QXJyYXkuam9pbignLycpO1xuICAgIC8vIEVhY2ggaW5wdXQgY29tcG9uZW50IGlzIG5vdyBzZXBhcmF0ZWQgYnkgYSBzaW5nbGUgc2xhc2ggZXhjZXB0IHRoZSBwb3NzaWJsZSBmaXJzdCBwbGFpbiBwcm90b2NvbCBwYXJ0LlxuXG4gICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGJlZm9yZSBwYXJhbWV0ZXJzIG9yIGhhc2hcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFwvKFxcP3wmfCNbXiFdKS9nLCAnJDEnKTtcblxuICAgIC8vIHJlcGxhY2UgPyBpbiBwYXJhbWV0ZXJzIHdpdGggJlxuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnPycpO1xuICAgIHN0ciA9IHBhcnRzLnNoaWZ0KCkgKyAocGFydHMubGVuZ3RoID4gMCA/ICc/JzogJycpICsgcGFydHMuam9pbignJicpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlucHV0O1xuXG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpbnB1dCA9IGFyZ3VtZW50c1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShpbnB1dCk7XG4gIH07XG5cbn0pO1xuIiwiLy8gQXhpb3MgdjEuNy40IENvcHlyaWdodCAoYykgMjAyNCBNYXR0IFphYnJpc2tpZSBhbmQgY29udHJpYnV0b3JzXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbmNvbnN0IHt0b1N0cmluZ30gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3Qge2dldFByb3RvdHlwZU9mfSA9IE9iamVjdDtcblxuY29uc3Qga2luZE9mID0gKGNhY2hlID0+IHRoaW5nID0+IHtcbiAgICBjb25zdCBzdHIgPSB0b1N0cmluZy5jYWxsKHRoaW5nKTtcbiAgICByZXR1cm4gY2FjaGVbc3RyXSB8fCAoY2FjaGVbc3RyXSA9IHN0ci5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKSk7XG59KShPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuY29uc3Qga2luZE9mVGVzdCA9ICh0eXBlKSA9PiB7XG4gIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAodGhpbmcpID0+IGtpbmRPZih0aGluZykgPT09IHR5cGVcbn07XG5cbmNvbnN0IHR5cGVPZlRlc3QgPSB0eXBlID0+IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gdHlwZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IHtpc0FycmF5fSA9IEFycmF5O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVW5kZWZpbmVkID0gdHlwZU9mVGVzdCgndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgaXNGdW5jdGlvbih2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIpICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQXJyYXlCdWZmZXIgPSBraW5kT2ZUZXN0KCdBcnJheUJ1ZmZlcicpO1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmluZyA9IHR5cGVPZlRlc3QoJ3N0cmluZycpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlT2ZUZXN0KCdmdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzTnVtYmVyID0gdHlwZU9mVGVzdCgnbnVtYmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQm9vbGVhblxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQm9vbGVhbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQm9vbGVhbiA9IHRoaW5nID0+IHRoaW5nID09PSB0cnVlIHx8IHRoaW5nID09PSBmYWxzZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1BsYWluT2JqZWN0ID0gKHZhbCkgPT4ge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIChwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpID09PSBudWxsKSAmJiAhKFN5bWJvbC50b1N0cmluZ1RhZyBpbiB2YWwpICYmICEoU3ltYm9sLml0ZXJhdG9yIGluIHZhbCk7XG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNEYXRlID0ga2luZE9mVGVzdCgnRGF0ZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCbG9iID0ga2luZE9mVGVzdCgnQmxvYicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZUxpc3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZUxpc3QgPSBraW5kT2ZUZXN0KCdGaWxlTGlzdCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyZWFtID0gKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGb3JtRGF0YSA9ICh0aGluZykgPT4ge1xuICBsZXQga2luZDtcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8IChcbiAgICAgIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiAoXG4gICAgICAgIChraW5kID0ga2luZE9mKHRoaW5nKSkgPT09ICdmb3JtZGF0YScgfHxcbiAgICAgICAgLy8gZGV0ZWN0IGZvcm0tZGF0YSBpbnN0YW5jZVxuICAgICAgICAoa2luZCA9PT0gJ29iamVjdCcgJiYgaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgRm9ybURhdGFdJylcbiAgICAgIClcbiAgICApXG4gIClcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VSTFNlYXJjaFBhcmFtcyA9IGtpbmRPZlRlc3QoJ1VSTFNlYXJjaFBhcmFtcycpO1xuXG5jb25zdCBbaXNSZWFkYWJsZVN0cmVhbSwgaXNSZXF1ZXN0LCBpc1Jlc3BvbnNlLCBpc0hlYWRlcnNdID0gWydSZWFkYWJsZVN0cmVhbScsICdSZXF1ZXN0JywgJ1Jlc3BvbnNlJywgJ0hlYWRlcnMnXS5tYXAoa2luZE9mVGVzdCk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmNvbnN0IHRyaW0gPSAoc3RyKSA9PiBzdHIudHJpbSA/XG4gIHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FsbE93bktleXMgPSBmYWxzZV1cbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbiwge2FsbE93bktleXMgPSBmYWxzZX0gPSB7fSkge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBpO1xuICBsZXQgbDtcblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAoaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgY29uc3Qga2V5cyA9IGFsbE93bktleXMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopIDogT2JqZWN0LmtleXMob2JqKTtcbiAgICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQga2V5O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kS2V5KG9iaiwga2V5KSB7XG4gIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgbGV0IF9rZXk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgX2tleSA9IGtleXNbaV07XG4gICAgaWYgKGtleSA9PT0gX2tleS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gX2tleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IF9nbG9iYWwgPSAoKCkgPT4ge1xuICAvKmVzbGludCBuby11bmRlZjowKi9cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZ2xvYmFsVGhpcztcbiAgcmV0dXJuIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbClcbn0pKCk7XG5cbmNvbnN0IGlzQ29udGV4dERlZmluZWQgPSAoY29udGV4dCkgPT4gIWlzVW5kZWZpbmVkKGNvbnRleHQpICYmIGNvbnRleHQgIT09IF9nbG9iYWw7XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgY29uc3Qge2Nhc2VsZXNzfSA9IGlzQ29udGV4dERlZmluZWQodGhpcykgJiYgdGhpcyB8fCB7fTtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGNvbnN0IGFzc2lnblZhbHVlID0gKHZhbCwga2V5KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0S2V5ID0gY2FzZWxlc3MgJiYgZmluZEtleShyZXN1bHQsIGtleSkgfHwga2V5O1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFt0YXJnZXRLZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2UocmVzdWx0W3RhcmdldEtleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsO1xuICAgIH1cbiAgfTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhcmd1bWVudHNbaV0gJiYgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHthbGxPd25LZXlzfT0ge30pID0+IHtcbiAgZm9yRWFjaChiLCAodmFsLCBrZXkpID0+IHtcbiAgICBpZiAodGhpc0FyZyAmJiBpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSwge2FsbE93bktleXN9KTtcbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5jb25zdCBzdHJpcEJPTSA9IChjb250ZW50KSA9PiB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufTtcblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXVxuICogQHBhcmFtIHtvYmplY3R9IFtkZXNjcmlwdG9yc11cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgaW5oZXJpdHMgPSAoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykgPT4ge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IsICdzdXBlcicsIHtcbiAgICB2YWx1ZTogc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGVcbiAgfSk7XG4gIHByb3BzICYmIE9iamVjdC5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufEJvb2xlYW59IFtmaWx0ZXJdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvcEZpbHRlcl1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCB0b0ZsYXRPYmplY3QgPSAoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIsIHByb3BGaWx0ZXIpID0+IHtcbiAgbGV0IHByb3BzO1xuICBsZXQgaTtcbiAgbGV0IHByb3A7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgaWYgKHNvdXJjZU9iaiA9PSBudWxsKSByZXR1cm4gZGVzdE9iajtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICgoIXByb3BGaWx0ZXIgfHwgcHJvcEZpbHRlcihwcm9wLCBzb3VyY2VPYmosIGRlc3RPYmopKSAmJiAhbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IGZpbHRlciAhPT0gZmFsc2UgJiYgZ2V0UHJvdG90eXBlT2Yoc291cmNlT2JqKTtcbiAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xuXG4gIHJldHVybiBkZXN0T2JqO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcG9zaXRpb249IDBdXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGVuZHNXaXRoID0gKHN0ciwgc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT4ge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcG9zaXRpb24gPiBzdHIubGVuZ3RoKSB7XG4gICAgcG9zaXRpb24gPSBzdHIubGVuZ3RoO1xuICB9XG4gIHBvc2l0aW9uIC09IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gIGNvbnN0IGxhc3RJbmRleCA9IHN0ci5pbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pO1xuICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvc2l0aW9uO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqXG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqXG4gKiBAcmV0dXJucyB7P0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICBpZiAoaXNBcnJheSh0aGluZykpIHJldHVybiB0aGluZztcbiAgbGV0IGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmICghaXNOdW1iZXIoaSkpIHJldHVybiBudWxsO1xuICBjb25zdCBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoVHlwZWRBcnJheSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiB0aGluZyA9PiB7XG4gICAgcmV0dXJuIFR5cGVkQXJyYXkgJiYgdGhpbmcgaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xuICB9O1xufSkodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxuLyoqXG4gKiBGb3IgZWFjaCBlbnRyeSBpbiB0aGUgb2JqZWN0LCBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBrZXkgYW5kIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGVudHJ5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBmb3JFYWNoRW50cnkgPSAob2JqLCBmbikgPT4ge1xuICBjb25zdCBnZW5lcmF0b3IgPSBvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl07XG5cbiAgY29uc3QgaXRlcmF0b3IgPSBnZW5lcmF0b3IuY2FsbChvYmopO1xuXG4gIGxldCByZXN1bHQ7XG5cbiAgd2hpbGUgKChyZXN1bHQgPSBpdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59O1xuXG4vKipcbiAqIEl0IHRha2VzIGEgcmVndWxhciBleHByZXNzaW9uIGFuZCBhIHN0cmluZywgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgYWxsIHRoZSBtYXRjaGVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZ0V4cCAtIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggYWdhaW5zdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIHNlYXJjaC5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXk8Ym9vbGVhbj59XG4gKi9cbmNvbnN0IG1hdGNoQWxsID0gKHJlZ0V4cCwgc3RyKSA9PiB7XG4gIGxldCBtYXRjaGVzO1xuICBjb25zdCBhcnIgPSBbXTtcblxuICB3aGlsZSAoKG1hdGNoZXMgPSByZWdFeHAuZXhlYyhzdHIpKSAhPT0gbnVsbCkge1xuICAgIGFyci5wdXNoKG1hdGNoZXMpO1xuICB9XG5cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qIENoZWNraW5nIGlmIHRoZSBraW5kT2ZUZXN0IGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB3aGVuIHBhc3NlZCBhbiBIVE1MRm9ybUVsZW1lbnQuICovXG5jb25zdCBpc0hUTUxGb3JtID0ga2luZE9mVGVzdCgnSFRNTEZvcm1FbGVtZW50Jyk7XG5cbmNvbnN0IHRvQ2FtZWxDYXNlID0gc3RyID0+IHtcbiAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1stX1xcc10oW2EtelxcZF0pKFxcdyopL2csXG4gICAgZnVuY3Rpb24gcmVwbGFjZXIobSwgcDEsIHAyKSB7XG4gICAgICByZXR1cm4gcDEudG9VcHBlckNhc2UoKSArIHAyO1xuICAgIH1cbiAgKTtcbn07XG5cbi8qIENyZWF0aW5nIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBwcm9wZXJ0eS4gKi9cbmNvbnN0IGhhc093blByb3BlcnR5ID0gKCh7aGFzT3duUHJvcGVydHl9KSA9PiAob2JqLCBwcm9wKSA9PiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpKE9iamVjdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNSZWdFeHAgPSBraW5kT2ZUZXN0KCdSZWdFeHAnKTtcblxuY29uc3QgcmVkdWNlRGVzY3JpcHRvcnMgPSAob2JqLCByZWR1Y2VyKSA9PiB7XG4gIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKTtcbiAgY29uc3QgcmVkdWNlZERlc2NyaXB0b3JzID0ge307XG5cbiAgZm9yRWFjaChkZXNjcmlwdG9ycywgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICBsZXQgcmV0O1xuICAgIGlmICgocmV0ID0gcmVkdWNlcihkZXNjcmlwdG9yLCBuYW1lLCBvYmopKSAhPT0gZmFsc2UpIHtcbiAgICAgIHJlZHVjZWREZXNjcmlwdG9yc1tuYW1lXSA9IHJldCB8fCBkZXNjcmlwdG9yO1xuICAgIH1cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMob2JqLCByZWR1Y2VkRGVzY3JpcHRvcnMpO1xufTtcblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCB0b09iamVjdFNldCA9IChhcnJheU9yU3RyaW5nLCBkZWxpbWl0ZXIpID0+IHtcbiAgY29uc3Qgb2JqID0ge307XG5cbiAgY29uc3QgZGVmaW5lID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIG9ialt2YWx1ZV0gPSB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIGlzQXJyYXkoYXJyYXlPclN0cmluZykgPyBkZWZpbmUoYXJyYXlPclN0cmluZykgOiBkZWZpbmUoU3RyaW5nKGFycmF5T3JTdHJpbmcpLnNwbGl0KGRlbGltaXRlcikpO1xuXG4gIHJldHVybiBvYmo7XG59O1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbmNvbnN0IHRvRmluaXRlTnVtYmVyID0gKHZhbHVlLCBkZWZhdWx0VmFsdWUpID0+IHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlID0gK3ZhbHVlKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xufTtcblxuY29uc3QgQUxQSEEgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonO1xuXG5jb25zdCBESUdJVCA9ICcwMTIzNDU2Nzg5JztcblxuY29uc3QgQUxQSEFCRVQgPSB7XG4gIERJR0lULFxuICBBTFBIQSxcbiAgQUxQSEFfRElHSVQ6IEFMUEhBICsgQUxQSEEudG9VcHBlckNhc2UoKSArIERJR0lUXG59O1xuXG5jb25zdCBnZW5lcmF0ZVN0cmluZyA9IChzaXplID0gMTYsIGFscGhhYmV0ID0gQUxQSEFCRVQuQUxQSEFfRElHSVQpID0+IHtcbiAgbGV0IHN0ciA9ICcnO1xuICBjb25zdCB7bGVuZ3RofSA9IGFscGhhYmV0O1xuICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgc3RyICs9IGFscGhhYmV0W01hdGgucmFuZG9tKCkgKiBsZW5ndGh8MF07XG4gIH1cblxuICByZXR1cm4gc3RyO1xufTtcblxuLyoqXG4gKiBJZiB0aGUgdGhpbmcgaXMgYSBGb3JtRGF0YSBvYmplY3QsIHJldHVybiB0cnVlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2suXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BlY0NvbXBsaWFudEZvcm0odGhpbmcpIHtcbiAgcmV0dXJuICEhKHRoaW5nICYmIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiB0aGluZ1tTeW1ib2wudG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW1N5bWJvbC5pdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH07XG5cbiAgcmV0dXJuIHZpc2l0KG9iaiwgMCk7XG59O1xuXG5jb25zdCBpc0FzeW5jRm4gPSBraW5kT2ZUZXN0KCdBc3luY0Z1bmN0aW9uJyk7XG5cbmNvbnN0IGlzVGhlbmFibGUgPSAodGhpbmcpID0+XG4gIHRoaW5nICYmIChpc09iamVjdCh0aGluZykgfHwgaXNGdW5jdGlvbih0aGluZykpICYmIGlzRnVuY3Rpb24odGhpbmcudGhlbikgJiYgaXNGdW5jdGlvbih0aGluZy5jYXRjaCk7XG5cbi8vIG9yaWdpbmFsIGNvZGVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EaWdpdGFsQnJhaW5KUy9BeGlvc1Byb21pc2UvYmxvYi8xNmRlYWIxMzcxMGVjMDk3Nzk5MjIxMzFmM2ZhNTk1NDMyMGY4M2FiL2xpYi91dGlscy5qcyNMMTEtTDM0XG5cbmNvbnN0IF9zZXRJbW1lZGlhdGUgPSAoKHNldEltbWVkaWF0ZVN1cHBvcnRlZCwgcG9zdE1lc3NhZ2VTdXBwb3J0ZWQpID0+IHtcbiAgaWYgKHNldEltbWVkaWF0ZVN1cHBvcnRlZCkge1xuICAgIHJldHVybiBzZXRJbW1lZGlhdGU7XG4gIH1cblxuICByZXR1cm4gcG9zdE1lc3NhZ2VTdXBwb3J0ZWQgPyAoKHRva2VuLCBjYWxsYmFja3MpID0+IHtcbiAgICBfZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsICh7c291cmNlLCBkYXRhfSkgPT4ge1xuICAgICAgaWYgKHNvdXJjZSA9PT0gX2dsb2JhbCAmJiBkYXRhID09PSB0b2tlbikge1xuICAgICAgICBjYWxsYmFja3MubGVuZ3RoICYmIGNhbGxiYWNrcy5zaGlmdCgpKCk7XG4gICAgICB9XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgcmV0dXJuIChjYikgPT4ge1xuICAgICAgY2FsbGJhY2tzLnB1c2goY2IpO1xuICAgICAgX2dsb2JhbC5wb3N0TWVzc2FnZSh0b2tlbiwgXCIqXCIpO1xuICAgIH1cbiAgfSkoYGF4aW9zQCR7TWF0aC5yYW5kb20oKX1gLCBbXSkgOiAoY2IpID0+IHNldFRpbWVvdXQoY2IpO1xufSkoXG4gIHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicsXG4gIGlzRnVuY3Rpb24oX2dsb2JhbC5wb3N0TWVzc2FnZSlcbik7XG5cbmNvbnN0IGFzYXAgPSB0eXBlb2YgcXVldWVNaWNyb3Rhc2sgIT09ICd1bmRlZmluZWQnID9cbiAgcXVldWVNaWNyb3Rhc2suYmluZChfZ2xvYmFsKSA6ICggdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MubmV4dFRpY2sgfHwgX3NldEltbWVkaWF0ZSk7XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKlxuXG52YXIgdXRpbHMkMSA9IHtcbiAgaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXIsXG4gIGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZyxcbiAgaXNOdW1iZXIsXG4gIGlzQm9vbGVhbixcbiAgaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3QsXG4gIGlzUmVhZGFibGVTdHJlYW0sXG4gIGlzUmVxdWVzdCxcbiAgaXNSZXNwb25zZSxcbiAgaXNIZWFkZXJzLFxuICBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlLFxuICBpc0ZpbGUsXG4gIGlzQmxvYixcbiAgaXNSZWdFeHAsXG4gIGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNUeXBlZEFycmF5LFxuICBpc0ZpbGVMaXN0LFxuICBmb3JFYWNoLFxuICBtZXJnZSxcbiAgZXh0ZW5kLFxuICB0cmltLFxuICBzdHJpcEJPTSxcbiAgaW5oZXJpdHMsXG4gIHRvRmxhdE9iamVjdCxcbiAga2luZE9mLFxuICBraW5kT2ZUZXN0LFxuICBlbmRzV2l0aCxcbiAgdG9BcnJheSxcbiAgZm9yRWFjaEVudHJ5LFxuICBtYXRjaEFsbCxcbiAgaXNIVE1MRm9ybSxcbiAgaGFzT3duUHJvcGVydHksXG4gIGhhc093blByb3A6IGhhc093blByb3BlcnR5LCAvLyBhbiBhbGlhcyB0byBhdm9pZCBFU0xpbnQgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIGRldGVjdGlvblxuICByZWR1Y2VEZXNjcmlwdG9ycyxcbiAgZnJlZXplTWV0aG9kcyxcbiAgdG9PYmplY3RTZXQsXG4gIHRvQ2FtZWxDYXNlLFxuICBub29wLFxuICB0b0Zpbml0ZU51bWJlcixcbiAgZmluZEtleSxcbiAgZ2xvYmFsOiBfZ2xvYmFsLFxuICBpc0NvbnRleHREZWZpbmVkLFxuICBBTFBIQUJFVCxcbiAgZ2VuZXJhdGVTdHJpbmcsXG4gIGlzU3BlY0NvbXBsaWFudEZvcm0sXG4gIHRvSlNPTk9iamVjdCxcbiAgaXNBc3luY0ZuLFxuICBpc1RoZW5hYmxlLFxuICBzZXRJbW1lZGlhdGU6IF9zZXRJbW1lZGlhdGUsXG4gIGFzYXBcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjaztcbiAgfVxuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgcmVzcG9uc2UgJiYgKHRoaXMucmVzcG9uc2UgPSByZXNwb25zZSk7XG59XG5cbnV0aWxzJDEuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdXRpbHMkMS50b0pTT05PYmplY3QodGhpcy5jb25maWcpLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgc3RhdHVzOiB0aGlzLnJlc3BvbnNlICYmIHRoaXMucmVzcG9uc2Uuc3RhdHVzID8gdGhpcy5yZXNwb25zZS5zdGF0dXMgOiBudWxsXG4gICAgfTtcbiAgfVxufSk7XG5cbmNvbnN0IHByb3RvdHlwZSQxID0gQXhpb3NFcnJvci5wcm90b3R5cGU7XG5jb25zdCBkZXNjcmlwdG9ycyA9IHt9O1xuXG5bXG4gICdFUlJfQkFEX09QVElPTl9WQUxVRScsXG4gICdFUlJfQkFEX09QVElPTicsXG4gICdFQ09OTkFCT1JURUQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VSUl9ORVRXT1JLJyxcbiAgJ0VSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMnLFxuICAnRVJSX0RFUFJFQ0FURUQnLFxuICAnRVJSX0JBRF9SRVNQT05TRScsXG4gICdFUlJfQkFEX1JFUVVFU1QnLFxuICAnRVJSX0NBTkNFTEVEJyxcbiAgJ0VSUl9OT1RfU1VQUE9SVCcsXG4gICdFUlJfSU5WQUxJRF9VUkwnXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXS5mb3JFYWNoKGNvZGUgPT4ge1xuICBkZXNjcmlwdG9yc1tjb2RlXSA9IHt2YWx1ZTogY29kZX07XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQXhpb3NFcnJvciwgZGVzY3JpcHRvcnMpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSQxLCAnaXNBeGlvc0Vycm9yJywge3ZhbHVlOiB0cnVlfSk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5BeGlvc0Vycm9yLmZyb20gPSAoZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSA9PiB7XG4gIGNvbnN0IGF4aW9zRXJyb3IgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSQxKTtcblxuICB1dGlscyQxLnRvRmxhdE9iamVjdChlcnJvciwgYXhpb3NFcnJvciwgZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IEVycm9yLnByb3RvdHlwZTtcbiAgfSwgcHJvcCA9PiB7XG4gICAgcmV0dXJuIHByb3AgIT09ICdpc0F4aW9zRXJyb3InO1xuICB9KTtcblxuICBBeGlvc0Vycm9yLmNhbGwoYXhpb3NFcnJvciwgZXJyb3IubWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG5cbiAgYXhpb3NFcnJvci5jYXVzZSA9IGVycm9yO1xuXG4gIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG52YXIgaHR0cEFkYXB0ZXIgPSBudWxsO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzJDEuaXNQbGFpbk9iamVjdCh0aGluZykgfHwgdXRpbHMkMS5pc0FycmF5KHRoaW5nKTtcbn1cblxuLyoqXG4gKiBJdCByZW1vdmVzIHRoZSBicmFja2V0cyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgcGFyYW1ldGVyLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgd2l0aG91dCB0aGUgYnJhY2tldHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xuICByZXR1cm4gdXRpbHMkMS5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aC5jb25jYXQoa2V5KS5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRva2VuID0gcmVtb3ZlQnJhY2tldHModG9rZW4pO1xuICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgfSkuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzJDEuaXNBcnJheShhcnIpICYmICFhcnIuc29tZShpc1Zpc2l0YWJsZSk7XG59XG5cbmNvbnN0IHByZWRpY2F0ZXMgPSB1dGlscyQxLnRvRmxhdE9iamVjdCh1dGlscyQxLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMkMS5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGFyZ2V0IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgKEZvcm1EYXRhKSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBvcHRpb25zID0gdXRpbHMkMS50b0ZsYXRPYmplY3Qob3B0aW9ucywge1xuICAgIG1ldGFUb2tlbnM6IHRydWUsXG4gICAgZG90czogZmFsc2UsXG4gICAgaW5kZXhlczogZmFsc2VcbiAgfSwgZmFsc2UsIGZ1bmN0aW9uIGRlZmluZWQob3B0aW9uLCBzb3VyY2UpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgICByZXR1cm4gIXV0aWxzJDEuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICB9KTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2I7XG4gIGNvbnN0IHVzZUJsb2IgPSBfQmxvYiAmJiB1dGlscyQxLmlzU3BlY0NvbXBsaWFudEZvcm0oZm9ybURhdGEpO1xuXG4gIGlmICghdXRpbHMkMS5pc0Z1bmN0aW9uKHZpc2l0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmlzaXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHV0aWxzJDEuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VCbG9iICYmIHV0aWxzJDEuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzJDEuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMkMS5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdXNlQmxvYiAmJiB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBCbG9iKFt2YWx1ZV0pIDogQnVmZmVyLmZyb20odmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZpc2l0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBrZXlcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmd8TnVtYmVyPn0gcGF0aFxuICAgKiBAdGhpcyB7Rm9ybURhdGF9XG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm4gdHJ1ZSB0byB2aXNpdCB0aGUgZWFjaCBwcm9wIG9mIHRoZSB2YWx1ZSByZWN1cnNpdmVseVxuICAgKi9cbiAgZnVuY3Rpb24gZGVmYXVsdFZpc2l0b3IodmFsdWUsIGtleSwgcGF0aCkge1xuICAgIGxldCBhcnIgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSAmJiAhcGF0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodXRpbHMkMS5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSBtZXRhVG9rZW5zID8ga2V5IDoga2V5LnNsaWNlKDAsIC0yKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHV0aWxzJDEuaXNBcnJheSh2YWx1ZSkgJiYgaXNGbGF0QXJyYXkodmFsdWUpKSB8fFxuICAgICAgICAoKHV0aWxzJDEuaXNGaWxlTGlzdCh2YWx1ZSkgfHwgdXRpbHMkMS5lbmRzV2l0aChrZXksICdbXScpKSAmJiAoYXJyID0gdXRpbHMkMS50b0FycmF5KHZhbHVlKSlcbiAgICAgICAgKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gcmVtb3ZlQnJhY2tldHMoa2V5KTtcblxuICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiBlYWNoKGVsLCBpbmRleCkge1xuICAgICAgICAgICEodXRpbHMkMS5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgICAgICAgICAgaW5kZXhlcyA9PT0gdHJ1ZSA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpIDogKGluZGV4ZXMgPT09IG51bGwgPyBrZXkgOiBrZXkgKyAnW10nKSxcbiAgICAgICAgICAgIGNvbnZlcnRWYWx1ZShlbClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkKHZhbHVlLCBwYXRoKSB7XG4gICAgaWYgKHV0aWxzJDEuaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm47XG5cbiAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICcgKyBwYXRoLmpvaW4oJy4nKSk7XG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWx1ZSk7XG5cbiAgICB1dGlscyQxLmZvckVhY2godmFsdWUsIGZ1bmN0aW9uIGVhY2goZWwsIGtleSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gISh1dGlscyQxLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgdmlzaXRvci5jYWxsKFxuICAgICAgICBmb3JtRGF0YSwgZWwsIHV0aWxzJDEuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIGJ1aWxkKGVsLCBwYXRoID8gcGF0aC5jb25jYXQoa2V5KSA6IFtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscyQxLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkYXRhIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICBidWlsZChvYmopO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxuLyoqXG4gKiBJdCBlbmNvZGVzIGEgc3RyaW5nIGJ5IHJlcGxhY2luZyBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgaW4gdGhlIHVucmVzZXJ2ZWQgc2V0IHdpdGhcbiAqIHRoZWlyIHBlcmNlbnQtZW5jb2RlZCBlcXVpdmFsZW50c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGVuY29kZS5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSQxKHN0cikge1xuICBjb25zdCBjaGFyTWFwID0ge1xuICAgICchJzogJyUyMScsXG4gICAgXCInXCI6ICclMjcnLFxuICAgICcoJzogJyUyOCcsXG4gICAgJyknOiAnJTI5JyxcbiAgICAnfic6ICclN0UnLFxuICAgICclMjAnOiAnKycsXG4gICAgJyUwMCc6ICdcXHgwMCdcbiAgfTtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpfl18JTIwfCUwMC9nLCBmdW5jdGlvbiByZXBsYWNlcihtYXRjaCkge1xuICAgIHJldHVybiBjaGFyTWFwW21hdGNoXTtcbiAgfSk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXJhbXMgb2JqZWN0IGFuZCBjb252ZXJ0cyBpdCB0byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgdG8gYmUgY29udmVydGVkIHRvIGEgRm9ybURhdGEgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZCB0byB0aGUgQXhpb3MgY29uc3RydWN0b3IuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykge1xuICB0aGlzLl9wYWlycyA9IFtdO1xuXG4gIHBhcmFtcyAmJiB0b0Zvcm1EYXRhKHBhcmFtcywgdGhpcywgb3B0aW9ucyk7XG59XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZTtcblxucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICB0aGlzLl9wYWlycy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xufTtcblxucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoZW5jb2Rlcikge1xuICBjb25zdCBfZW5jb2RlID0gZW5jb2RlciA/IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGVuY29kZXIuY2FsbCh0aGlzLCB2YWx1ZSwgZW5jb2RlJDEpO1xuICB9IDogZW5jb2RlJDE7XG5cbiAgcmV0dXJuIHRoaXMuX3BhaXJzLm1hcChmdW5jdGlvbiBlYWNoKHBhaXIpIHtcbiAgICByZXR1cm4gX2VuY29kZShwYWlyWzBdKSArICc9JyArIF9lbmNvZGUocGFpclsxXSk7XG4gIH0sICcnKS5qb2luKCcmJyk7XG59O1xuXG4vKipcbiAqIEl0IHJlcGxhY2VzIGFsbCBpbnN0YW5jZXMgb2YgdGhlIGNoYXJhY3RlcnMgYDpgLCBgJGAsIGAsYCwgYCtgLCBgW2AsIGFuZCBgXWAgd2l0aCB0aGVpclxuICogVVJJIGVuY29kZWQgY291bnRlcnBhcnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCBUaGUgdmFsdWUgdG8gYmUgZW5jb2RlZC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEBwYXJhbSB7P29iamVjdH0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBvcHRpb25zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgXG4gIGNvbnN0IF9lbmNvZGUgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5jb2RlIHx8IGVuY29kZTtcblxuICBjb25zdCBzZXJpYWxpemVGbiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zZXJpYWxpemU7XG5cbiAgbGV0IHNlcmlhbGl6ZWRQYXJhbXM7XG5cbiAgaWYgKHNlcmlhbGl6ZUZuKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHNlcmlhbGl6ZUZuKHBhcmFtcywgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHV0aWxzJDEuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAgICovXG4gIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICAgIGZ1bGZpbGxlZCxcbiAgICAgIHJlamVjdGVkLFxuICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaW50ZXJjZXB0b3Igd2FzIHJlbW92ZWQsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHV0aWxzJDEuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICBmbihoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyJDEgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cbnZhciB0cmFuc2l0aW9uYWxEZWZhdWx0cyA9IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcblxudmFyIFVSTFNlYXJjaFBhcmFtcyQxID0gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcblxudmFyIEZvcm1EYXRhJDEgPSB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnID8gRm9ybURhdGEgOiBudWxsO1xuXG52YXIgQmxvYiQxID0gdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnID8gQmxvYiA6IG51bGw7XG5cbnZhciBwbGF0Zm9ybSQxID0ge1xuICBpc0Jyb3dzZXI6IHRydWUsXG4gIGNsYXNzZXM6IHtcbiAgICBVUkxTZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyQxLFxuICAgIEZvcm1EYXRhOiBGb3JtRGF0YSQxLFxuICAgIEJsb2I6IEJsb2IkMVxuICB9LFxuICBwcm90b2NvbHM6IFsnaHR0cCcsICdodHRwcycsICdmaWxlJywgJ2Jsb2InLCAndXJsJywgJ2RhdGEnXVxufTtcblxuY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPSAoXG4gIChwcm9kdWN0KSA9PiB7XG4gICAgcmV0dXJuIGhhc0Jyb3dzZXJFbnYgJiYgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKHByb2R1Y3QpIDwgMFxuICB9KSh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIHdlYldvcmtlciBlbnZpcm9ubWVudFxuICpcbiAqIEFsdGhvdWdoIHRoZSBgaXNTdGFuZGFyZEJyb3dzZXJFbnZgIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdFxuICogYGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyYCwgdGhlIFdlYldvcmtlciB3aWxsIHN0aWxsIGJlXG4gKiBmaWx0ZXJlZCBvdXQgZHVlIHRvIGl0cyBqdWRnbWVudCBzdGFuZGFyZFxuICogYHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdgLlxuICogVGhpcyBsZWFkcyB0byBhIHByb2JsZW0gd2hlbiBheGlvcyBwb3N0IGBGb3JtRGF0YWAgaW4gd2ViV29ya2VyXG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgIHR5cGVvZiBzZWxmLmltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbidcbiAgKTtcbn0pKCk7XG5cbmNvbnN0IG9yaWdpbiA9IGhhc0Jyb3dzZXJFbnYgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG52YXIgdXRpbHMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgaGFzQnJvd3NlckVudjogaGFzQnJvd3NlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52OiBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudjogaGFzU3RhbmRhcmRCcm93c2VyRW52LFxuICBvcmlnaW46IG9yaWdpblxufSk7XG5cbnZhciBwbGF0Zm9ybSA9IHtcbiAgLi4udXRpbHMsXG4gIC4uLnBsYXRmb3JtJDFcbn07XG5cbmZ1bmN0aW9uIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgb3B0aW9ucykge1xuICByZXR1cm4gdG9Gb3JtRGF0YShkYXRhLCBuZXcgcGxhdGZvcm0uY2xhc3Nlcy5VUkxTZWFyY2hQYXJhbXMoKSwgT2JqZWN0LmFzc2lnbih7XG4gICAgdmlzaXRvcjogZnVuY3Rpb24odmFsdWUsIGtleSwgcGF0aCwgaGVscGVycykge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzTm9kZSAmJiB1dGlscyQxLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlbHBlcnMuZGVmYXVsdFZpc2l0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH0sIG9wdGlvbnMpKTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZyBsaWtlIGBmb29beF1beV1bel1gIGFuZCByZXR1cm5zIGFuIGFycmF5IGxpa2UgYFsnZm9vJywgJ3gnLCAneScsICd6J11cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKlxuICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc3RyaW5ncy5cbiAqL1xuZnVuY3Rpb24gcGFyc2VQcm9wUGF0aChuYW1lKSB7XG4gIC8vIGZvb1t4XVt5XVt6XVxuICAvLyBmb28ueC55LnpcbiAgLy8gZm9vLXgteS16XG4gIC8vIGZvbyB4IHkgelxuICByZXR1cm4gdXRpbHMkMS5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzJDEuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0Lmxlbmd0aCA6IG5hbWU7XG5cbiAgICBpZiAoaXNMYXN0KSB7XG4gICAgICBpZiAodXRpbHMkMS5oYXNPd25Qcm9wKHRhcmdldCwgbmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gW3RhcmdldFtuYW1lXSwgdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0W25hbWVdIHx8ICF1dGlscyQxLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzJDEuaXNBcnJheSh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBhcnJheVRvT2JqZWN0KHRhcmdldFtuYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gIH1cblxuICBpZiAodXRpbHMkMS5pc0Zvcm1EYXRhKGZvcm1EYXRhKSAmJiB1dGlscyQxLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzJDEuZm9yRWFjaEVudHJ5KGZvcm1EYXRhLCAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGJ1aWxkUGF0aChwYXJzZVByb3BQYXRoKG5hbWUpLCB2YWx1ZSwgb2JqLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZywgdHJpZXMgdG8gcGFyc2UgaXQsIGFuZCBpZiBpdCBmYWlscywgaXQgcmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvblxuICogb2YgdGhlIGlucHV0XG4gKlxuICogQHBhcmFtIHthbnl9IHJhd1ZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHN0cmluZ2lmaWVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyc2VyIC0gQSBmdW5jdGlvbiB0aGF0IHBhcnNlcyBhIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmNvZGVyIC0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIHJldHVybnMgYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSByYXdWYWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcbiAgaWYgKHV0aWxzJDEuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzJDEudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMkMS5pc09iamVjdChkYXRhKTtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgJiYgdXRpbHMkMS5pc0hUTUxGb3JtKGRhdGEpKSB7XG4gICAgICBkYXRhID0gbmV3IEZvcm1EYXRhKGRhdGEpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9ybURhdGEgPSB1dGlscyQxLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzJDEuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzJDEuaXNCbG9iKGRhdGEpIHx8XG4gICAgICB1dGlscyQxLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMkMS5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMkMS5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLCBmYWxzZSk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGxldCBpc0ZpbGVMaXN0O1xuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCkge1xuICAgICAgaWYgKGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgdGhpcy5mb3JtU2VyaWFsaXplcikudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChpc0ZpbGVMaXN0ID0gdXRpbHMkMS5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMkMS5pc1Jlc3BvbnNlKGRhdGEpIHx8IHV0aWxzJDEuaXNSZWFkYWJsZVN0cmVhbShkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEgJiYgdXRpbHMkMS5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscyQxLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgKG1ldGhvZCkgPT4ge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG52YXIgZGVmYXVsdHMkMSA9IGRlZmF1bHRzO1xuXG4vLyBSYXdBeGlvc0hlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzJDEudG9PYmplY3RTZXQoW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl0pO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmF3SGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKlxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xudmFyIHBhcnNlSGVhZGVycyA9IHJhd0hlYWRlcnMgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB7fTtcbiAgbGV0IGtleTtcbiAgbGV0IHZhbDtcbiAgbGV0IGk7XG5cbiAgcmF3SGVhZGVycyAmJiByYXdIZWFkZXJzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IGxpbmUuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IGxpbmUuc3Vic3RyaW5nKGkgKyAxKS50cmltKCk7XG5cbiAgICBpZiAoIWtleSB8fCAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2Zba2V5XSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSkge1xuICAgICAgICBwYXJzZWRba2V5XS5wdXNoKHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscyQxLmlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKG5vcm1hbGl6ZVZhbHVlKSA6IFN0cmluZyh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW5zKHN0cikge1xuICBjb25zdCB0b2tlbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCB0b2tlbnNSRSA9IC8oW15cXHMsOz1dKylcXHMqKD86PVxccyooW14sO10rKSk/L2c7XG4gIGxldCBtYXRjaDtcblxuICB3aGlsZSAoKG1hdGNoID0gdG9rZW5zUkUuZXhlYyhzdHIpKSkge1xuICAgIHRva2Vuc1ttYXRjaFsxXV0gPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmNvbnN0IGlzVmFsaWRIZWFkZXJOYW1lID0gKHN0cikgPT4gL15bLV9hLXpBLVowLTleYHx+LCEjJCUmJyorLl0rJC8udGVzdChzdHIudHJpbSgpKTtcblxuZnVuY3Rpb24gbWF0Y2hIZWFkZXJWYWx1ZShjb250ZXh0LCB2YWx1ZSwgaGVhZGVyLCBmaWx0ZXIsIGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICBpZiAodXRpbHMkMS5pc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgdmFsdWUsIGhlYWRlcik7XG4gIH1cblxuICBpZiAoaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gICAgdmFsdWUgPSBoZWFkZXI7XG4gIH1cblxuICBpZiAoIXV0aWxzJDEuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzJDEuaXNTdHJpbmcoZmlsdGVyKSkge1xuICAgIHJldHVybiB2YWx1ZS5pbmRleE9mKGZpbHRlcikgIT09IC0xO1xuICB9XG5cbiAgaWYgKHV0aWxzJDEuaXNSZWdFeHAoZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyhbYS16XFxkXSkoXFx3KikvZywgKHcsIGNoYXIsIHN0cikgPT4ge1xuICAgICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKSArIHN0cjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcbiAgY29uc3QgYWNjZXNzb3JOYW1lID0gdXRpbHMkMS50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkoc2VsZiwgbEhlYWRlcik7XG5cbiAgICAgIGlmKCFrZXkgfHwgc2VsZltrZXldID09PSB1bmRlZmluZWQgfHwgX3Jld3JpdGUgPT09IHRydWUgfHwgKF9yZXdyaXRlID09PSB1bmRlZmluZWQgJiYgc2VsZltrZXldICE9PSBmYWxzZSkpIHtcbiAgICAgICAgc2VsZltrZXkgfHwgX2hlYWRlcl0gPSBub3JtYWxpemVWYWx1ZShfdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNldEhlYWRlcnMgPSAoaGVhZGVycywgX3Jld3JpdGUpID0+XG4gICAgICB1dGlscyQxLmZvckVhY2goaGVhZGVycywgKF92YWx1ZSwgX2hlYWRlcikgPT4gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpKTtcblxuICAgIGlmICh1dGlscyQxLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZih1dGlscyQxLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscyQxLmlzSGVhZGVycyhoZWFkZXIpKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBoZWFkZXIuZW50cmllcygpKSB7XG4gICAgICAgIHNldEhlYWRlcih2YWx1ZSwga2V5LCByZXdyaXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyICE9IG51bGwgJiYgc2V0SGVhZGVyKHZhbHVlT3JSZXdyaXRlLCBoZWFkZXIsIHJld3JpdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KGhlYWRlciwgcGFyc2VyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICBpZiAoIXBhcnNlcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzJDEuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzJDEuaXNSZWdFeHAocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuZXhlYyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJzZXIgbXVzdCBiZSBib29sZWFufHJlZ2V4cHxmdW5jdGlvbicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhcyhoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzJDEuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICByZXR1cm4gISEoa2V5ICYmIHRoaXNba2V5XSAhPT0gdW5kZWZpbmVkICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlSGVhZGVyKF9oZWFkZXIpIHtcbiAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmIChfaGVhZGVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHV0aWxzJDEuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMkMS5pc0FycmF5KGhlYWRlcikpIHtcbiAgICAgIGhlYWRlci5mb3JFYWNoKGRlbGV0ZUhlYWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZUhlYWRlcihoZWFkZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgY2xlYXIobWF0Y2hlcikge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBub3JtYWxpemUoZm9ybWF0KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuXG4gICAgdXRpbHMkMS5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMkMS5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZSAmJiAob2JqW2hlYWRlcl0gPSBhc1N0cmluZ3MgJiYgdXRpbHMkMS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywgJykgOiB2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKS5tYXAoKFtoZWFkZXIsIHZhbHVlXSkgPT4gaGVhZGVyICsgJzogJyArIHZhbHVlKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gJ0F4aW9zSGVhZGVycyc7XG4gIH1cblxuICBzdGF0aWMgZnJvbSh0aGluZykge1xuICAgIHJldHVybiB0aGluZyBpbnN0YW5jZW9mIHRoaXMgPyB0aGluZyA6IG5ldyB0aGlzKHRoaW5nKTtcbiAgfVxuXG4gIHN0YXRpYyBjb25jYXQoZmlyc3QsIC4uLnRhcmdldHMpIHtcbiAgICBjb25zdCBjb21wdXRlZCA9IG5ldyB0aGlzKGZpcnN0KTtcblxuICAgIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiBjb21wdXRlZC5zZXQodGFyZ2V0KSk7XG5cbiAgICByZXR1cm4gY29tcHV0ZWQ7XG4gIH1cblxuICBzdGF0aWMgYWNjZXNzb3IoaGVhZGVyKSB7XG4gICAgY29uc3QgaW50ZXJuYWxzID0gdGhpc1skaW50ZXJuYWxzXSA9ICh0aGlzWyRpbnRlcm5hbHNdID0ge1xuICAgICAgYWNjZXNzb3JzOiB7fVxuICAgIH0pO1xuXG4gICAgY29uc3QgYWNjZXNzb3JzID0gaW50ZXJuYWxzLmFjY2Vzc29ycztcbiAgICBjb25zdCBwcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZUFjY2Vzc29yKF9oZWFkZXIpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghYWNjZXNzb3JzW2xIZWFkZXJdKSB7XG4gICAgICAgIGJ1aWxkQWNjZXNzb3JzKHByb3RvdHlwZSwgX2hlYWRlcik7XG4gICAgICAgIGFjY2Vzc29yc1tsSGVhZGVyXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXRpbHMkMS5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzJDEucmVkdWNlRGVzY3JpcHRvcnMoQXhpb3NIZWFkZXJzLnByb3RvdHlwZSwgKHt2YWx1ZX0sIGtleSkgPT4ge1xuICBsZXQgbWFwcGVkID0ga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7IC8vIG1hcCBgc2V0YCA9PiBgU2V0YFxuICByZXR1cm4ge1xuICAgIGdldDogKCkgPT4gdmFsdWUsXG4gICAgc2V0KGhlYWRlclZhbHVlKSB7XG4gICAgICB0aGlzW21hcHBlZF0gPSBoZWFkZXJWYWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG51dGlscyQxLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzKTtcblxudmFyIEF4aW9zSGVhZGVycyQxID0gQXhpb3NIZWFkZXJzO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzJDE7XG4gIGNvbnN0IGNvbnRleHQgPSByZXNwb25zZSB8fCBjb25maWc7XG4gIGNvbnN0IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzJDEuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG5cbi8qKlxuICogQSBgQ2FuY2VsZWRFcnJvcmAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdD19IHJlcXVlc3QgVGhlIHJlcXVlc3QuXG4gKlxuICogQHJldHVybnMge0NhbmNlbGVkRXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgQXhpb3NFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UgPT0gbnVsbCA/ICdjYW5jZWxlZCcgOiBtZXNzYWdlLCBBeGlvc0Vycm9yLkVSUl9DQU5DRUxFRCwgY29uZmlnLCByZXF1ZXN0KTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscyQxLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5mdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbi8qKlxuICogVGhyb3R0bGUgZGVjb3JhdG9yXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtOdW1iZXJ9IGZyZXFcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmbiwgZnJlcSkge1xuICBsZXQgdGltZXN0YW1wID0gMDtcbiAgbGV0IHRocmVzaG9sZCA9IDEwMDAgLyBmcmVxO1xuICBsZXQgbGFzdEFyZ3M7XG4gIGxldCB0aW1lcjtcblxuICBjb25zdCBpbnZva2UgPSAoYXJncywgbm93ID0gRGF0ZS5ub3coKSkgPT4ge1xuICAgIHRpbWVzdGFtcCA9IG5vdztcbiAgICBsYXN0QXJncyA9IG51bGw7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgIH1cbiAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgfTtcblxuICBjb25zdCB0aHJvdHRsZWQgPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcGFzc2VkID0gbm93IC0gdGltZXN0YW1wO1xuICAgIGlmICggcGFzc2VkID49IHRocmVzaG9sZCkge1xuICAgICAgaW52b2tlKGFyZ3MsIG5vdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3RBcmdzID0gYXJncztcbiAgICAgIGlmICghdGltZXIpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICAgICAgaW52b2tlKGxhc3RBcmdzKTtcbiAgICAgICAgfSwgdGhyZXNob2xkIC0gcGFzc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZmx1c2ggPSAoKSA9PiBsYXN0QXJncyAmJiBpbnZva2UobGFzdEFyZ3MpO1xuXG4gIHJldHVybiBbdGhyb3R0bGVkLCBmbHVzaF07XG59XG5cbmNvbnN0IHByb2dyZXNzRXZlbnRSZWR1Y2VyID0gKGxpc3RlbmVyLCBpc0Rvd25sb2FkU3RyZWFtLCBmcmVxID0gMykgPT4ge1xuICBsZXQgYnl0ZXNOb3RpZmllZCA9IDA7XG4gIGNvbnN0IF9zcGVlZG9tZXRlciA9IHNwZWVkb21ldGVyKDUwLCAyNTApO1xuXG4gIHJldHVybiB0aHJvdHRsZShlID0+IHtcbiAgICBjb25zdCBsb2FkZWQgPSBlLmxvYWRlZDtcbiAgICBjb25zdCB0b3RhbCA9IGUubGVuZ3RoQ29tcHV0YWJsZSA/IGUudG90YWwgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcHJvZ3Jlc3NCeXRlcyA9IGxvYWRlZCAtIGJ5dGVzTm90aWZpZWQ7XG4gICAgY29uc3QgcmF0ZSA9IF9zcGVlZG9tZXRlcihwcm9ncmVzc0J5dGVzKTtcbiAgICBjb25zdCBpblJhbmdlID0gbG9hZGVkIDw9IHRvdGFsO1xuXG4gICAgYnl0ZXNOb3RpZmllZCA9IGxvYWRlZDtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBsb2FkZWQsXG4gICAgICB0b3RhbCxcbiAgICAgIHByb2dyZXNzOiB0b3RhbCA/IChsb2FkZWQgLyB0b3RhbCkgOiB1bmRlZmluZWQsXG4gICAgICBieXRlczogcHJvZ3Jlc3NCeXRlcyxcbiAgICAgIHJhdGU6IHJhdGUgPyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXN0aW1hdGVkOiByYXRlICYmIHRvdGFsICYmIGluUmFuZ2UgPyAodG90YWwgLSBsb2FkZWQpIC8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGV2ZW50OiBlLFxuICAgICAgbGVuZ3RoQ29tcHV0YWJsZTogdG90YWwgIT0gbnVsbCxcbiAgICAgIFtpc0Rvd25sb2FkU3RyZWFtID8gJ2Rvd25sb2FkJyA6ICd1cGxvYWQnXTogdHJ1ZVxuICAgIH07XG5cbiAgICBsaXN0ZW5lcihkYXRhKTtcbiAgfSwgZnJlcSk7XG59O1xuXG5jb25zdCBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yID0gKHRvdGFsLCB0aHJvdHRsZWQpID0+IHtcbiAgY29uc3QgbGVuZ3RoQ29tcHV0YWJsZSA9IHRvdGFsICE9IG51bGw7XG5cbiAgcmV0dXJuIFsobG9hZGVkKSA9PiB0aHJvdHRsZWRbMF0oe1xuICAgIGxlbmd0aENvbXB1dGFibGUsXG4gICAgdG90YWwsXG4gICAgbG9hZGVkXG4gIH0pLCB0aHJvdHRsZWRbMV1dO1xufTtcblxuY29uc3QgYXN5bmNEZWNvcmF0b3IgPSAoZm4pID0+ICguLi5hcmdzKSA9PiB1dGlscyQxLmFzYXAoKCkgPT4gZm4oLi4uYXJncykpO1xuXG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID9cblxuLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4vLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICBjb25zdCBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBjb25zdCB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsZXQgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdHMgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgbGV0IGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9ICh1dGlscyQxLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKTtcblxudmFyIGNvb2tpZXMgPSBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICB7XG4gICAgd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICBjb25zdCBjb29raWUgPSBbbmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSldO1xuXG4gICAgICB1dGlscyQxLmlzTnVtYmVyKGV4cGlyZXMpICYmIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcblxuICAgICAgdXRpbHMkMS5pc1N0cmluZyhwYXRoKSAmJiBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG5cbiAgICAgIHV0aWxzJDEuaXNTdHJpbmcoZG9tYWluKSAmJiBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuXG4gICAgICBzZWN1cmUgPT09IHRydWUgJiYgY29va2llLnB1c2goJ3NlY3VyZScpO1xuXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICB9LFxuXG4gICAgcmVhZChuYW1lKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgIH0sXG5cbiAgICByZW1vdmUobmFtZSkge1xuICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICB9XG4gIH1cblxuICA6XG5cbiAgLy8gTm9uLXN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICB7XG4gICAgd3JpdGUoKSB7fSxcbiAgICByZWFkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICByZW1vdmUoKSB7fVxuICB9O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZCtcXC0uXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbmZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8/XFwvJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xuZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59XG5cbmNvbnN0IGhlYWRlcnNUb09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgaW5zdGFuY2VvZiBBeGlvc0hlYWRlcnMkMSA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMkMS5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMkMS5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscyQxLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMkMS5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscyQxLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMkMS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYiwgY2FzZWxlc3MpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzJDEuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEsIGNhc2VsZXNzKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEaXJlY3RLZXlzKGEsIGIsIHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYik7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lcmdlTWFwID0ge1xuICAgIHVybDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBtZXRob2Q6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgZGF0YTogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBiYXNlVVJMOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVzcG9uc2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcGFyYW1zU2VyaWFsaXplcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXRNZXNzYWdlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhDcmVkZW50aWFsczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoWFNSRlRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGFkYXB0ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VUeXBlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZDb29raWVOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZIZWFkZXJOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25Eb3dubG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGRlY29tcHJlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Q29udGVudExlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhCb2R5TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGJlZm9yZVJlZGlyZWN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zcG9ydDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cHNBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBjYW5jZWxUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBzb2NrZXRQYXRoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlRW5jb2Rpbmc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdmFsaWRhdGVTdGF0dXM6IG1lcmdlRGlyZWN0S2V5cyxcbiAgICBoZWFkZXJzOiAoYSwgYikgPT4gbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSwgdHJ1ZSlcbiAgfTtcblxuICB1dGlscyQxLmZvckVhY2goT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnMSwgY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscyQxLmlzVW5kZWZpbmVkKGNvbmZpZ1ZhbHVlKSAmJiBtZXJnZSAhPT0gbWVyZ2VEaXJlY3RLZXlzKSB8fCAoY29uZmlnW3Byb3BdID0gY29uZmlnVmFsdWUpO1xuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG52YXIgcmVzb2x2ZUNvbmZpZyA9IChjb25maWcpID0+IHtcbiAgY29uc3QgbmV3Q29uZmlnID0gbWVyZ2VDb25maWcoe30sIGNvbmZpZyk7XG5cbiAgbGV0IHtkYXRhLCB3aXRoWFNSRlRva2VuLCB4c3JmSGVhZGVyTmFtZSwgeHNyZkNvb2tpZU5hbWUsIGhlYWRlcnMsIGF1dGh9ID0gbmV3Q29uZmlnO1xuXG4gIG5ld0NvbmZpZy5oZWFkZXJzID0gaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwpLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG5cbiAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICBpZiAoYXV0aCkge1xuICAgIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgK1xuICAgICAgYnRvYSgoYXV0aC51c2VybmFtZSB8fCAnJykgKyAnOicgKyAoYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhdXRoLnBhc3N3b3JkKSkgOiAnJykpXG4gICAgKTtcbiAgfVxuXG4gIGxldCBjb250ZW50VHlwZTtcblxuICBpZiAodXRpbHMkMS5pc0Zvcm1EYXRhKGRhdGEpKSB7XG4gICAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiB8fCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYpIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUodW5kZWZpbmVkKTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH0gZWxzZSBpZiAoKGNvbnRlbnRUeXBlID0gaGVhZGVycy5nZXRDb250ZW50VHlwZSgpKSAhPT0gZmFsc2UpIHtcbiAgICAgIC8vIGZpeCBzZW1pY29sb24gZHVwbGljYXRpb24gaXNzdWUgZm9yIFJlYWN0TmF0aXZlIEZvcm1EYXRhIGltcGxlbWVudGF0aW9uXG4gICAgICBjb25zdCBbdHlwZSwgLi4udG9rZW5zXSA9IGNvbnRlbnRUeXBlID8gY29udGVudFR5cGUuc3BsaXQoJzsnKS5tYXAodG9rZW4gPT4gdG9rZW4udHJpbSgpKS5maWx0ZXIoQm9vbGVhbikgOiBbXTtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoW3R5cGUgfHwgJ211bHRpcGFydC9mb3JtLWRhdGEnLCAuLi50b2tlbnNdLmpvaW4oJzsgJykpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCB4c3JmIGhlYWRlclxuICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cblxuICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52KSB7XG4gICAgd2l0aFhTUkZUb2tlbiAmJiB1dGlscyQxLmlzRnVuY3Rpb24od2l0aFhTUkZUb2tlbikgJiYgKHdpdGhYU1JGVG9rZW4gPSB3aXRoWFNSRlRva2VuKG5ld0NvbmZpZykpO1xuXG4gICAgaWYgKHdpdGhYU1JGVG9rZW4gfHwgKHdpdGhYU1JGVG9rZW4gIT09IGZhbHNlICYmIGlzVVJMU2FtZU9yaWdpbihuZXdDb25maWcudXJsKSkpIHtcbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgY29uc3QgeHNyZlZhbHVlID0geHNyZkhlYWRlck5hbWUgJiYgeHNyZkNvb2tpZU5hbWUgJiYgY29va2llcy5yZWFkKHhzcmZDb29raWVOYW1lKTtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICBoZWFkZXJzLnNldCh4c3JmSGVhZGVyTmFtZSwgeHNyZlZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3Q29uZmlnO1xufTtcblxuY29uc3QgaXNYSFJBZGFwdGVyU3VwcG9ydGVkID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJztcblxudmFyIHhockFkYXB0ZXIgPSBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgJiYgZnVuY3Rpb24gKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIGNvbnN0IF9jb25maWcgPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG4gICAgbGV0IHJlcXVlc3REYXRhID0gX2NvbmZpZy5kYXRhO1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShfY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgIGxldCB7cmVzcG9uc2VUeXBlLCBvblVwbG9hZFByb2dyZXNzLCBvbkRvd25sb2FkUHJvZ3Jlc3N9ID0gX2NvbmZpZztcbiAgICBsZXQgb25DYW5jZWxlZDtcbiAgICBsZXQgdXBsb2FkVGhyb3R0bGVkLCBkb3dubG9hZFRocm90dGxlZDtcbiAgICBsZXQgZmx1c2hVcGxvYWQsIGZsdXNoRG93bmxvYWQ7XG5cbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgZmx1c2hVcGxvYWQgJiYgZmx1c2hVcGxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG4gICAgICBmbHVzaERvd25sb2FkICYmIGZsdXNoRG93bmxvYWQoKTsgLy8gZmx1c2ggZXZlbnRzXG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi51bnN1YnNjcmliZShvbkNhbmNlbGVkKTtcblxuICAgICAgX2NvbmZpZy5zaWduYWwgJiYgX2NvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICB9XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgcmVxdWVzdC5vcGVuKF9jb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIF9jb25maWcudXJsLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKFxuICAgICAgICAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ICYmIHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcbiAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZURhdGEgPSAhcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nID9cbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCBmdW5jdGlvbiBfcmVqZWN0KGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoJ29ubG9hZGVuZCcgaW4gcmVxdWVzdCkge1xuICAgICAgLy8gVXNlIG9ubG9hZGVuZCBpZiBhdmFpbGFibGVcbiAgICAgIHJlcXVlc3Qub25sb2FkZW5kID0gb25sb2FkZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlIHRvIGVtdWxhdGUgb25sb2FkZW5kXG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVhZHlzdGF0ZSBoYW5kbGVyIGlzIGNhbGxpbmcgYmVmb3JlIG9uZXJyb3Igb3Igb250aW1lb3V0IGhhbmRsZXJzLFxuICAgICAgICAvLyBzbyB3ZSBzaG91bGQgY2FsbCBvbmxvYWRlbmQgb24gdGhlIG5leHQgJ3RpY2snXG4gICAgICAgIHNldFRpbWVvdXQob25sb2FkZW5kKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCwgY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIGxldCB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0ID8gJ3RpbWVvdXQgb2YgJyArIF9jb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSBfY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGlmIChfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSxcbiAgICAgICAgdHJhbnNpdGlvbmFsLmNsYXJpZnlUaW1lb3V0RXJyb3IgPyBBeGlvc0Vycm9yLkVUSU1FRE9VVCA6IEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICByZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkICYmIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKG51bGwpO1xuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzJDEuZm9yRWFjaChyZXF1ZXN0SGVhZGVycy50b0pTT04oKSwgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFfY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBfY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKG9uRG93bmxvYWRQcm9ncmVzcykge1xuICAgICAgKFtkb3dubG9hZFRocm90dGxlZCwgZmx1c2hEb3dubG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpKTtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBkb3dubG9hZFRocm90dGxlZCk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAob25VcGxvYWRQcm9ncmVzcyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgKFt1cGxvYWRUaHJvdHRsZWQsIGZsdXNoVXBsb2FkXSA9IHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uVXBsb2FkUHJvZ3Jlc3MpKTtcblxuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCB1cGxvYWRUaHJvdHRsZWQpO1xuXG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZW5kJywgZmx1c2hVcGxvYWQpO1xuICAgIH1cblxuICAgIGlmIChfY29uZmlnLmNhbmNlbFRva2VuIHx8IF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgb25DYW5jZWxlZCA9IGNhbmNlbCA9PiB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChfY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBfY29uZmlnLnNpZ25hbC5hYm9ydGVkID8gb25DYW5jZWxlZCgpIDogX2NvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woX2NvbmZpZy51cmwpO1xuXG4gICAgaWYgKHByb3RvY29sICYmIHBsYXRmb3JtLnByb3RvY29scy5pbmRleE9mKHByb3RvY29sKSA9PT0gLTEpIHtcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignVW5zdXBwb3J0ZWQgcHJvdG9jb2wgJyArIHByb3RvY29sICsgJzonLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgY29uZmlnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhIHx8IG51bGwpO1xuICB9KTtcbn07XG5cbmNvbnN0IGNvbXBvc2VTaWduYWxzID0gKHNpZ25hbHMsIHRpbWVvdXQpID0+IHtcbiAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgbGV0IGFib3J0ZWQ7XG5cbiAgY29uc3Qgb25hYm9ydCA9IGZ1bmN0aW9uIChjYW5jZWwpIHtcbiAgICBpZiAoIWFib3J0ZWQpIHtcbiAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgIGNvbnN0IGVyciA9IGNhbmNlbCBpbnN0YW5jZW9mIEVycm9yID8gY2FuY2VsIDogdGhpcy5yZWFzb247XG4gICAgICBjb250cm9sbGVyLmFib3J0KGVyciBpbnN0YW5jZW9mIEF4aW9zRXJyb3IgPyBlcnIgOiBuZXcgQ2FuY2VsZWRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogZXJyKSk7XG4gICAgfVxuICB9O1xuXG4gIGxldCB0aW1lciA9IHRpbWVvdXQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgb25hYm9ydChuZXcgQXhpb3NFcnJvcihgdGltZW91dCAke3RpbWVvdXR9IG9mIG1zIGV4Y2VlZGVkYCwgQXhpb3NFcnJvci5FVElNRURPVVQpKTtcbiAgfSwgdGltZW91dCk7XG5cbiAgY29uc3QgdW5zdWJzY3JpYmUgPSAoKSA9PiB7XG4gICAgaWYgKHNpZ25hbHMpIHtcbiAgICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICBzaWduYWxzLmZvckVhY2goc2lnbmFsID0+IHtcbiAgICAgICAgc2lnbmFsICYmXG4gICAgICAgIChzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lciA/IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpIDogc2lnbmFsLnVuc3Vic2NyaWJlKG9uYWJvcnQpKTtcbiAgICAgIH0pO1xuICAgICAgc2lnbmFscyA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiBzaWduYWwgJiYgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCkpO1xuXG4gIGNvbnN0IHtzaWduYWx9ID0gY29udHJvbGxlcjtcblxuICBzaWduYWwudW5zdWJzY3JpYmUgPSB1bnN1YnNjcmliZTtcblxuICByZXR1cm4gW3NpZ25hbCwgKCkgPT4ge1xuICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgdGltZXIgPSBudWxsO1xuICB9XTtcbn07XG5cbnZhciBjb21wb3NlU2lnbmFscyQxID0gY29tcG9zZVNpZ25hbHM7XG5cbmNvbnN0IHN0cmVhbUNodW5rID0gZnVuY3Rpb24qIChjaHVuaywgY2h1bmtTaXplKSB7XG4gIGxldCBsZW4gPSBjaHVuay5ieXRlTGVuZ3RoO1xuXG4gIGlmICghY2h1bmtTaXplIHx8IGxlbiA8IGNodW5rU2l6ZSkge1xuICAgIHlpZWxkIGNodW5rO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBwb3MgPSAwO1xuICBsZXQgZW5kO1xuXG4gIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICBlbmQgPSBwb3MgKyBjaHVua1NpemU7XG4gICAgeWllbGQgY2h1bmsuc2xpY2UocG9zLCBlbmQpO1xuICAgIHBvcyA9IGVuZDtcbiAgfVxufTtcblxuY29uc3QgcmVhZEJ5dGVzID0gYXN5bmMgZnVuY3Rpb24qIChpdGVyYWJsZSwgY2h1bmtTaXplLCBlbmNvZGUpIHtcbiAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBpdGVyYWJsZSkge1xuICAgIHlpZWxkKiBzdHJlYW1DaHVuayhBcnJheUJ1ZmZlci5pc1ZpZXcoY2h1bmspID8gY2h1bmsgOiAoYXdhaXQgZW5jb2RlKFN0cmluZyhjaHVuaykpKSwgY2h1bmtTaXplKTtcbiAgfVxufTtcblxuY29uc3QgdHJhY2tTdHJlYW0gPSAoc3RyZWFtLCBjaHVua1NpemUsIG9uUHJvZ3Jlc3MsIG9uRmluaXNoLCBlbmNvZGUpID0+IHtcbiAgY29uc3QgaXRlcmF0b3IgPSByZWFkQnl0ZXMoc3RyZWFtLCBjaHVua1NpemUsIGVuY29kZSk7XG5cbiAgbGV0IGJ5dGVzID0gMDtcbiAgbGV0IGRvbmU7XG4gIGxldCBfb25GaW5pc2ggPSAoZSkgPT4ge1xuICAgIGlmICghZG9uZSkge1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICBvbkZpbmlzaCAmJiBvbkZpbmlzaChlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgYXN5bmMgcHVsbChjb250cm9sbGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICBfb25GaW5pc2goKTtcbiAgICAgICAgICBjb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxlbiA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChvblByb2dyZXNzKSB7XG4gICAgICAgICAgbGV0IGxvYWRlZEJ5dGVzID0gYnl0ZXMgKz0gbGVuO1xuICAgICAgICAgIG9uUHJvZ3Jlc3MobG9hZGVkQnl0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIF9vbkZpbmlzaChlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYW5jZWwocmVhc29uKSB7XG4gICAgICBfb25GaW5pc2gocmVhc29uKTtcbiAgICAgIHJldHVybiBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBoaWdoV2F0ZXJNYXJrOiAyXG4gIH0pXG59O1xuXG5jb25zdCBpc0ZldGNoU3VwcG9ydGVkID0gdHlwZW9mIGZldGNoID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgPSBpc0ZldGNoU3VwcG9ydGVkICYmIHR5cGVvZiBSZWFkYWJsZVN0cmVhbSA9PT0gJ2Z1bmN0aW9uJztcblxuLy8gdXNlZCBvbmx5IGluc2lkZSB0aGUgZmV0Y2ggYWRhcHRlclxuY29uc3QgZW5jb2RlVGV4dCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgKChlbmNvZGVyKSA9PiAoc3RyKSA9PiBlbmNvZGVyLmVuY29kZShzdHIpKShuZXcgVGV4dEVuY29kZXIoKSkgOlxuICAgIGFzeW5jIChzdHIpID0+IG5ldyBVaW50OEFycmF5KGF3YWl0IG5ldyBSZXNwb25zZShzdHIpLmFycmF5QnVmZmVyKCkpXG4pO1xuXG5jb25zdCB0ZXN0ID0gKGZuLCAuLi5hcmdzKSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZm4oLi4uYXJncyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufTtcblxuY29uc3Qgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtID0gaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJiB0ZXN0KCgpID0+IHtcbiAgbGV0IGR1cGxleEFjY2Vzc2VkID0gZmFsc2U7XG5cbiAgY29uc3QgaGFzQ29udGVudFR5cGUgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBnZXQgZHVwbGV4KCkge1xuICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuICdoYWxmJztcbiAgICB9LFxuICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbn0pO1xuXG5jb25zdCBERUZBVUxUX0NIVU5LX1NJWkUgPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gPSBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmXG4gIHRlc3QoKCkgPT4gdXRpbHMkMS5pc1JlYWRhYmxlU3RyZWFtKG5ldyBSZXNwb25zZSgnJykuYm9keSkpO1xuXG5cbmNvbnN0IHJlc29sdmVycyA9IHtcbiAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSlcbn07XG5cbmlzRmV0Y2hTdXBwb3J0ZWQgJiYgKCgocmVzKSA9PiB7XG4gIFsndGV4dCcsICdhcnJheUJ1ZmZlcicsICdibG9iJywgJ2Zvcm1EYXRhJywgJ3N0cmVhbSddLmZvckVhY2godHlwZSA9PiB7XG4gICAgIXJlc29sdmVyc1t0eXBlXSAmJiAocmVzb2x2ZXJzW3R5cGVdID0gdXRpbHMkMS5pc0Z1bmN0aW9uKHJlc1t0eXBlXSkgPyAocmVzKSA9PiByZXNbdHlwZV0oKSA6XG4gICAgICAoXywgY29uZmlnKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBSZXNwb25zZSB0eXBlICcke3R5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCwgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsIGNvbmZpZyk7XG4gICAgICB9KTtcbiAgfSk7XG59KShuZXcgUmVzcG9uc2UpKTtcblxuY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gIGlmIChib2R5ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNCbG9iKGJvZHkpKSB7XG4gICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgIHJldHVybiAoYXdhaXQgbmV3IFJlcXVlc3QoYm9keSkuYXJyYXlCdWZmZXIoKSkuYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkgfHwgdXRpbHMkMS5pc0FycmF5QnVmZmVyKGJvZHkpKSB7XG4gICAgcmV0dXJuIGJvZHkuYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcbiAgICBib2R5ID0gYm9keSArICcnO1xuICB9XG5cbiAgaWYodXRpbHMkMS5pc1N0cmluZyhib2R5KSkge1xuICAgIHJldHVybiAoYXdhaXQgZW5jb2RlVGV4dChib2R5KSkuYnl0ZUxlbmd0aDtcbiAgfVxufTtcblxuY29uc3QgcmVzb2x2ZUJvZHlMZW5ndGggPSBhc3luYyAoaGVhZGVycywgYm9keSkgPT4ge1xuICBjb25zdCBsZW5ndGggPSB1dGlscyQxLnRvRmluaXRlTnVtYmVyKGhlYWRlcnMuZ2V0Q29udGVudExlbmd0aCgpKTtcblxuICByZXR1cm4gbGVuZ3RoID09IG51bGwgPyBnZXRCb2R5TGVuZ3RoKGJvZHkpIDogbGVuZ3RoO1xufTtcblxudmFyIGZldGNoQWRhcHRlciA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKGFzeW5jIChjb25maWcpID0+IHtcbiAgbGV0IHtcbiAgICB1cmwsXG4gICAgbWV0aG9kLFxuICAgIGRhdGEsXG4gICAgc2lnbmFsLFxuICAgIGNhbmNlbFRva2VuLFxuICAgIHRpbWVvdXQsXG4gICAgb25Eb3dubG9hZFByb2dyZXNzLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3MsXG4gICAgcmVzcG9uc2VUeXBlLFxuICAgIGhlYWRlcnMsXG4gICAgd2l0aENyZWRlbnRpYWxzID0gJ3NhbWUtb3JpZ2luJyxcbiAgICBmZXRjaE9wdGlvbnNcbiAgfSA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcblxuICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgPyAocmVzcG9uc2VUeXBlICsgJycpLnRvTG93ZXJDYXNlKCkgOiAndGV4dCc7XG5cbiAgbGV0IFtjb21wb3NlZFNpZ25hbCwgc3RvcFRpbWVvdXRdID0gKHNpZ25hbCB8fCBjYW5jZWxUb2tlbiB8fCB0aW1lb3V0KSA/XG4gICAgY29tcG9zZVNpZ25hbHMkMShbc2lnbmFsLCBjYW5jZWxUb2tlbl0sIHRpbWVvdXQpIDogW107XG5cbiAgbGV0IGZpbmlzaGVkLCByZXF1ZXN0O1xuXG4gIGNvbnN0IG9uRmluaXNoID0gKCkgPT4ge1xuICAgICFmaW5pc2hlZCAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbXBvc2VkU2lnbmFsICYmIGNvbXBvc2VkU2lnbmFsLnVuc3Vic2NyaWJlKCk7XG4gICAgfSk7XG5cbiAgICBmaW5pc2hlZCA9IHRydWU7XG4gIH07XG5cbiAgbGV0IHJlcXVlc3RDb250ZW50TGVuZ3RoO1xuXG4gIHRyeSB7XG4gICAgaWYgKFxuICAgICAgb25VcGxvYWRQcm9ncmVzcyAmJiBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gJiYgbWV0aG9kICE9PSAnZ2V0JyAmJiBtZXRob2QgIT09ICdoZWFkJyAmJlxuICAgICAgKHJlcXVlc3RDb250ZW50TGVuZ3RoID0gYXdhaXQgcmVzb2x2ZUJvZHlMZW5ndGgoaGVhZGVycywgZGF0YSkpICE9PSAwXG4gICAgKSB7XG4gICAgICBsZXQgX3JlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAgIGR1cGxleDogXCJoYWxmXCJcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgY29udGVudFR5cGVIZWFkZXI7XG5cbiAgICAgIGlmICh1dGlscyQxLmlzRm9ybURhdGEoZGF0YSkgJiYgKGNvbnRlbnRUeXBlSGVhZGVyID0gX3JlcXVlc3QuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSkge1xuICAgICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKGNvbnRlbnRUeXBlSGVhZGVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9yZXF1ZXN0LmJvZHkpIHtcbiAgICAgICAgY29uc3QgW29uUHJvZ3Jlc3MsIGZsdXNoXSA9IHByb2dyZXNzRXZlbnREZWNvcmF0b3IoXG4gICAgICAgICAgcmVxdWVzdENvbnRlbnRMZW5ndGgsXG4gICAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoYXN5bmNEZWNvcmF0b3Iob25VcGxvYWRQcm9ncmVzcykpXG4gICAgICAgICk7XG5cbiAgICAgICAgZGF0YSA9IHRyYWNrU3RyZWFtKF9yZXF1ZXN0LmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25Qcm9ncmVzcywgZmx1c2gsIGVuY29kZVRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdXRpbHMkMS5pc1N0cmluZyh3aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICB3aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHMgPyAnaW5jbHVkZScgOiAnb21pdCc7XG4gICAgfVxuXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgLi4uZmV0Y2hPcHRpb25zLFxuICAgICAgc2lnbmFsOiBjb21wb3NlZFNpZ25hbCxcbiAgICAgIG1ldGhvZDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLm5vcm1hbGl6ZSgpLnRvSlNPTigpLFxuICAgICAgYm9keTogZGF0YSxcbiAgICAgIGR1cGxleDogXCJoYWxmXCIsXG4gICAgICBjcmVkZW50aWFsczogd2l0aENyZWRlbnRpYWxzXG4gICAgfSk7XG5cbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0KTtcblxuICAgIGNvbnN0IGlzU3RyZWFtUmVzcG9uc2UgPSBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChyZXNwb25zZVR5cGUgPT09ICdzdHJlYW0nIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3Jlc3BvbnNlJyk7XG5cbiAgICBpZiAoc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAob25Eb3dubG9hZFByb2dyZXNzIHx8IGlzU3RyZWFtUmVzcG9uc2UpKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0ge307XG5cbiAgICAgIFsnc3RhdHVzJywgJ3N0YXR1c1RleHQnLCAnaGVhZGVycyddLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgIG9wdGlvbnNbcHJvcF0gPSByZXNwb25zZVtwcm9wXTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCByZXNwb25zZUNvbnRlbnRMZW5ndGggPSB1dGlscyQxLnRvRmluaXRlTnVtYmVyKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpKTtcblxuICAgICAgY29uc3QgW29uUHJvZ3Jlc3MsIGZsdXNoXSA9IG9uRG93bmxvYWRQcm9ncmVzcyAmJiBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICByZXNwb25zZUNvbnRlbnRMZW5ndGgsXG4gICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uRG93bmxvYWRQcm9ncmVzcyksIHRydWUpXG4gICAgICApIHx8IFtdO1xuXG4gICAgICByZXNwb25zZSA9IG5ldyBSZXNwb25zZShcbiAgICAgICAgdHJhY2tTdHJlYW0ocmVzcG9uc2UuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBvblByb2dyZXNzLCAoKSA9PiB7XG4gICAgICAgICAgZmx1c2ggJiYgZmx1c2goKTtcbiAgICAgICAgICBpc1N0cmVhbVJlc3BvbnNlICYmIG9uRmluaXNoKCk7XG4gICAgICAgIH0sIGVuY29kZVRleHQpLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSB8fCAndGV4dCc7XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzb2x2ZXJzW3V0aWxzJDEuZmluZEtleShyZXNvbHZlcnMsIHJlc3BvbnNlVHlwZSkgfHwgJ3RleHQnXShyZXNwb25zZSwgY29uZmlnKTtcblxuICAgICFpc1N0cmVhbVJlc3BvbnNlICYmIG9uRmluaXNoKCk7XG5cbiAgICBzdG9wVGltZW91dCAmJiBzdG9wVGltZW91dCgpO1xuXG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBoZWFkZXJzOiBBeGlvc0hlYWRlcnMkMS5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9KVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBvbkZpbmlzaCgpO1xuXG4gICAgaWYgKGVyciAmJiBlcnIubmFtZSA9PT0gJ1R5cGVFcnJvcicgJiYgL2ZldGNoL2kudGVzdChlcnIubWVzc2FnZSkpIHtcbiAgICAgIHRocm93IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KSxcbiAgICAgICAge1xuICAgICAgICAgIGNhdXNlOiBlcnIuY2F1c2UgfHwgZXJyXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZXJyLCBlcnIgJiYgZXJyLmNvZGUsIGNvbmZpZywgcmVxdWVzdCk7XG4gIH1cbn0pO1xuXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xuICBodHRwOiBodHRwQWRhcHRlcixcbiAgeGhyOiB4aHJBZGFwdGVyLFxuICBmZXRjaDogZmV0Y2hBZGFwdGVyXG59O1xuXG51dGlscyQxLmZvckVhY2goa25vd25BZGFwdGVycywgKGZuLCB2YWx1ZSkgPT4ge1xuICBpZiAoZm4pIHtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHt2YWx1ZX0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICdhZGFwdGVyTmFtZScsIHt2YWx1ZX0pO1xuICB9XG59KTtcblxuY29uc3QgcmVuZGVyUmVhc29uID0gKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YDtcblxuY29uc3QgaXNSZXNvbHZlZEhhbmRsZSA9IChhZGFwdGVyKSA9PiB1dGlscyQxLmlzRnVuY3Rpb24oYWRhcHRlcikgfHwgYWRhcHRlciA9PT0gbnVsbCB8fCBhZGFwdGVyID09PSBmYWxzZTtcblxudmFyIGFkYXB0ZXJzID0ge1xuICBnZXRBZGFwdGVyOiAoYWRhcHRlcnMpID0+IHtcbiAgICBhZGFwdGVycyA9IHV0aWxzJDEuaXNBcnJheShhZGFwdGVycykgPyBhZGFwdGVycyA6IFthZGFwdGVyc107XG5cbiAgICBjb25zdCB7bGVuZ3RofSA9IGFkYXB0ZXJzO1xuICAgIGxldCBuYW1lT3JBZGFwdGVyO1xuICAgIGxldCBhZGFwdGVyO1xuXG4gICAgY29uc3QgcmVqZWN0ZWRSZWFzb25zID0ge307XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBuYW1lT3JBZGFwdGVyID0gYWRhcHRlcnNbaV07XG4gICAgICBsZXQgaWQ7XG5cbiAgICAgIGFkYXB0ZXIgPSBuYW1lT3JBZGFwdGVyO1xuXG4gICAgICBpZiAoIWlzUmVzb2x2ZWRIYW5kbGUobmFtZU9yQWRhcHRlcikpIHtcbiAgICAgICAgYWRhcHRlciA9IGtub3duQWRhcHRlcnNbKGlkID0gU3RyaW5nKG5hbWVPckFkYXB0ZXIpKS50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICBpZiAoYWRhcHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoYFVua25vd24gYWRhcHRlciAnJHtpZH0nYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGFkYXB0ZXIpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJlamVjdGVkUmVhc29uc1tpZCB8fCAnIycgKyBpXSA9IGFkYXB0ZXI7XG4gICAgfVxuXG4gICAgaWYgKCFhZGFwdGVyKSB7XG5cbiAgICAgIGNvbnN0IHJlYXNvbnMgPSBPYmplY3QuZW50cmllcyhyZWplY3RlZFJlYXNvbnMpXG4gICAgICAgIC5tYXAoKFtpZCwgc3RhdGVdKSA9PiBgYWRhcHRlciAke2lkfSBgICtcbiAgICAgICAgICAoc3RhdGUgPT09IGZhbHNlID8gJ2lzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGVudmlyb25tZW50JyA6ICdpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBidWlsZCcpXG4gICAgICAgICk7XG5cbiAgICAgIGxldCBzID0gbGVuZ3RoID9cbiAgICAgICAgKHJlYXNvbnMubGVuZ3RoID4gMSA/ICdzaW5jZSA6XFxuJyArIHJlYXNvbnMubWFwKHJlbmRlclJlYXNvbikuam9pbignXFxuJykgOiAnICcgKyByZW5kZXJSZWFzb24ocmVhc29uc1swXSkpIDpcbiAgICAgICAgJ2FzIG5vIGFkYXB0ZXIgc3BlY2lmaWVkJztcblxuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGBUaGVyZSBpcyBubyBzdWl0YWJsZSBhZGFwdGVyIHRvIGRpc3BhdGNoIHRoZSByZXF1ZXN0IGAgKyBzLFxuICAgICAgICAnRVJSX05PVF9TVVBQT1JUJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRhcHRlcjtcbiAgfSxcbiAgYWRhcHRlcnM6IGtub3duQWRhcHRlcnNcbn07XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKGNvbmZpZy5oZWFkZXJzKTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgIGNvbmZpZyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIGlmIChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10uaW5kZXhPZihjb25maWcubWV0aG9kKSAhPT0gLTEpIHtcbiAgICBjb25maWcuaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgYWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXIoY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMkMS5hZGFwdGVyKTtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgIGNvbmZpZyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20ocmVhc29uLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn1cblxuY29uc3QgVkVSU0lPTiA9IFwiMS43LjRcIjtcblxuY29uc3QgdmFsaWRhdG9ycyQxID0ge307XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5bJ29iamVjdCcsICdib29sZWFuJywgJ251bWJlcicsICdmdW5jdGlvbicsICdzdHJpbmcnLCAnc3ltYm9sJ10uZm9yRWFjaCgodHlwZSwgaSkgPT4ge1xuICB2YWxpZGF0b3JzJDFbdHlwZV0gPSBmdW5jdGlvbiB2YWxpZGF0b3IodGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSB0eXBlIHx8ICdhJyArIChpIDwgMSA/ICduICcgOiAnICcpICsgdHlwZTtcbiAgfTtcbn0pO1xuXG5jb25zdCBkZXByZWNhdGVkV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uYWwgb3B0aW9uIHZhbGlkYXRvclxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb258Ym9vbGVhbj99IHZhbGlkYXRvciAtIHNldCB0byBmYWxzZSBpZiB0aGUgdHJhbnNpdGlvbmFsIG9wdGlvbiBoYXMgYmVlbiByZW1vdmVkXG4gKiBAcGFyYW0ge3N0cmluZz99IHZlcnNpb24gLSBkZXByZWNhdGVkIHZlcnNpb24gLyByZW1vdmVkIHNpbmNlIHZlcnNpb25cbiAqIEBwYXJhbSB7c3RyaW5nP30gbWVzc2FnZSAtIHNvbWUgbWVzc2FnZSB3aXRoIGFkZGl0aW9uYWwgaW5mb1xuICpcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xudmFsaWRhdG9ycyQxLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gJ1tBeGlvcyB2JyArIFZFUlNJT04gKyAnXSBUcmFuc2l0aW9uYWwgb3B0aW9uIFxcJycgKyBvcHQgKyAnXFwnJyArIGRlc2MgKyAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh2YWx1ZSwgb3B0LCBvcHRzKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGNvbnN0IG9wdCA9IGtleXNbaV07XG4gICAgY29uc3QgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIHZhbGlkYXRvciA9IHtcbiAgYXNzZXJ0T3B0aW9ucyxcbiAgdmFsaWRhdG9yczogdmFsaWRhdG9ycyQxXG59O1xuXG5jb25zdCB2YWxpZGF0b3JzID0gdmFsaWRhdG9yLnZhbGlkYXRvcnM7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmNsYXNzIEF4aW9zIHtcbiAgY29uc3RydWN0b3IoaW5zdGFuY2VDb25maWcpIHtcbiAgICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyJDEoKSxcbiAgICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyJDEoKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gY29uZmlnT3JVcmwgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICAgKiBAcGFyYW0gez9PYmplY3R9IGNvbmZpZ1xuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gICAqL1xuICBhc3luYyByZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgbGV0IGR1bW15O1xuXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID8gRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZHVtbXkgPSB7fSkgOiAoZHVtbXkgPSBuZXcgRXJyb3IoKSk7XG5cbiAgICAgICAgLy8gc2xpY2Ugb2ZmIHRoZSBFcnJvcjogLi4uIGxpbmVcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBkdW1teS5zdGFjayA/IGR1bW15LnN0YWNrLnJlcGxhY2UoL14uK1xcbi8sICcnKSA6ICcnO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghZXJyLnN0YWNrKSB7XG4gICAgICAgICAgICBlcnIuc3RhY2sgPSBzdGFjaztcbiAgICAgICAgICAgIC8vIG1hdGNoIHdpdGhvdXQgdGhlIDIgdG9wIHN0YWNrIGxpbmVzXG4gICAgICAgICAgfSBlbHNlIGlmIChzdGFjayAmJiAhU3RyaW5nKGVyci5zdGFjaykuZW5kc1dpdGgoc3RhY2sucmVwbGFjZSgvXi4rXFxuLitcXG4vLCAnJykpKSB7XG4gICAgICAgICAgICBlcnIuc3RhY2sgKz0gJ1xcbicgKyBzdGFjaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZ25vcmUgdGhlIGNhc2Ugd2hlcmUgXCJzdGFja1wiIGlzIGFuIHVuLXdyaXRhYmxlIHByb3BlcnR5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIF9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gICAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gICAgfVxuXG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGNvbnN0IHt0cmFuc2l0aW9uYWwsIHBhcmFtc1NlcmlhbGl6ZXIsIGhlYWRlcnN9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHV0aWxzJDEuaXNGdW5jdGlvbihwYXJhbXNTZXJpYWxpemVyKSkge1xuICAgICAgICBjb25maWcucGFyYW1zU2VyaWFsaXplciA9IHtcbiAgICAgICAgICBzZXJpYWxpemU6IHBhcmFtc1NlcmlhbGl6ZXJcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcbiAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscyQxLm1lcmdlKFxuICAgICAgaGVhZGVycy5jb21tb24sXG4gICAgICBoZWFkZXJzW2NvbmZpZy5tZXRob2RdXG4gICAgKTtcblxuICAgIGhlYWRlcnMgJiYgdXRpbHMkMS5mb3JFYWNoKFxuICAgICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgICAobWV0aG9kKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW21ldGhvZF07XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbjtcblxuICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgICBjb25zdCBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QuYmluZCh0aGlzKSwgdW5kZWZpbmVkXTtcbiAgICAgIGNoYWluLnVuc2hpZnQuYXBwbHkoY2hhaW4sIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2guYXBwbHkoY2hhaW4sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGNvbnN0IG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIGNvbnN0IG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQobmV3Q29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIG9uUmVqZWN0ZWQuY2FsbCh0aGlzLCBlcnJvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0LmNhbGwodGhpcywgbmV3Q29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBsZW4gPSByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldFVyaShjb25maWcpIHtcbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscyQxLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMkMS5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBpc0Zvcm0gPyB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgICB9IDoge30sXG4gICAgICAgIHVybCxcbiAgICAgICAgZGF0YVxuICAgICAgfSkpO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xufSk7XG5cbnZhciBBeGlvcyQxID0gQXhpb3M7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMge0NhbmNlbFRva2VufVxuICovXG5jbGFzcyBDYW5jZWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTtcblxuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IHRoaXM7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuKGNhbmNlbCA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gb25mdWxmaWxsZWQgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICAgKi9cbiAgdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIHRocm93IHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbFxuICAgIH07XG4gIH1cbn1cblxudmFyIENhbmNlbFRva2VuJDEgPSBDYW5jZWxUb2tlbjtcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscyQxLmlzT2JqZWN0KHBheWxvYWQpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59XG5cbmNvbnN0IEh0dHBTdGF0dXNDb2RlID0ge1xuICBDb250aW51ZTogMTAwLFxuICBTd2l0Y2hpbmdQcm90b2NvbHM6IDEwMSxcbiAgUHJvY2Vzc2luZzogMTAyLFxuICBFYXJseUhpbnRzOiAxMDMsXG4gIE9rOiAyMDAsXG4gIENyZWF0ZWQ6IDIwMSxcbiAgQWNjZXB0ZWQ6IDIwMixcbiAgTm9uQXV0aG9yaXRhdGl2ZUluZm9ybWF0aW9uOiAyMDMsXG4gIE5vQ29udGVudDogMjA0LFxuICBSZXNldENvbnRlbnQ6IDIwNSxcbiAgUGFydGlhbENvbnRlbnQ6IDIwNixcbiAgTXVsdGlTdGF0dXM6IDIwNyxcbiAgQWxyZWFkeVJlcG9ydGVkOiAyMDgsXG4gIEltVXNlZDogMjI2LFxuICBNdWx0aXBsZUNob2ljZXM6IDMwMCxcbiAgTW92ZWRQZXJtYW5lbnRseTogMzAxLFxuICBGb3VuZDogMzAyLFxuICBTZWVPdGhlcjogMzAzLFxuICBOb3RNb2RpZmllZDogMzA0LFxuICBVc2VQcm94eTogMzA1LFxuICBVbnVzZWQ6IDMwNixcbiAgVGVtcG9yYXJ5UmVkaXJlY3Q6IDMwNyxcbiAgUGVybWFuZW50UmVkaXJlY3Q6IDMwOCxcbiAgQmFkUmVxdWVzdDogNDAwLFxuICBVbmF1dGhvcml6ZWQ6IDQwMSxcbiAgUGF5bWVudFJlcXVpcmVkOiA0MDIsXG4gIEZvcmJpZGRlbjogNDAzLFxuICBOb3RGb3VuZDogNDA0LFxuICBNZXRob2ROb3RBbGxvd2VkOiA0MDUsXG4gIE5vdEFjY2VwdGFibGU6IDQwNixcbiAgUHJveHlBdXRoZW50aWNhdGlvblJlcXVpcmVkOiA0MDcsXG4gIFJlcXVlc3RUaW1lb3V0OiA0MDgsXG4gIENvbmZsaWN0OiA0MDksXG4gIEdvbmU6IDQxMCxcbiAgTGVuZ3RoUmVxdWlyZWQ6IDQxMSxcbiAgUHJlY29uZGl0aW9uRmFpbGVkOiA0MTIsXG4gIFBheWxvYWRUb29MYXJnZTogNDEzLFxuICBVcmlUb29Mb25nOiA0MTQsXG4gIFVuc3VwcG9ydGVkTWVkaWFUeXBlOiA0MTUsXG4gIFJhbmdlTm90U2F0aXNmaWFibGU6IDQxNixcbiAgRXhwZWN0YXRpb25GYWlsZWQ6IDQxNyxcbiAgSW1BVGVhcG90OiA0MTgsXG4gIE1pc2RpcmVjdGVkUmVxdWVzdDogNDIxLFxuICBVbnByb2Nlc3NhYmxlRW50aXR5OiA0MjIsXG4gIExvY2tlZDogNDIzLFxuICBGYWlsZWREZXBlbmRlbmN5OiA0MjQsXG4gIFRvb0Vhcmx5OiA0MjUsXG4gIFVwZ3JhZGVSZXF1aXJlZDogNDI2LFxuICBQcmVjb25kaXRpb25SZXF1aXJlZDogNDI4LFxuICBUb29NYW55UmVxdWVzdHM6IDQyOSxcbiAgUmVxdWVzdEhlYWRlckZpZWxkc1Rvb0xhcmdlOiA0MzEsXG4gIFVuYXZhaWxhYmxlRm9yTGVnYWxSZWFzb25zOiA0NTEsXG4gIEludGVybmFsU2VydmVyRXJyb3I6IDUwMCxcbiAgTm90SW1wbGVtZW50ZWQ6IDUwMSxcbiAgQmFkR2F0ZXdheTogNTAyLFxuICBTZXJ2aWNlVW5hdmFpbGFibGU6IDUwMyxcbiAgR2F0ZXdheVRpbWVvdXQ6IDUwNCxcbiAgSHR0cFZlcnNpb25Ob3RTdXBwb3J0ZWQ6IDUwNSxcbiAgVmFyaWFudEFsc29OZWdvdGlhdGVzOiA1MDYsXG4gIEluc3VmZmljaWVudFN0b3JhZ2U6IDUwNyxcbiAgTG9vcERldGVjdGVkOiA1MDgsXG4gIE5vdEV4dGVuZGVkOiA1MTAsXG4gIE5ldHdvcmtBdXRoZW50aWNhdGlvblJlcXVpcmVkOiA1MTEsXG59O1xuXG5PYmplY3QuZW50cmllcyhIdHRwU3RhdHVzQ29kZSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gIEh0dHBTdGF0dXNDb2RlW3ZhbHVlXSA9IGtleTtcbn0pO1xuXG52YXIgSHR0cFN0YXR1c0NvZGUkMSA9IEh0dHBTdGF0dXNDb2RlO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKlxuICogQHJldHVybnMge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIGNvbnN0IGNvbnRleHQgPSBuZXcgQXhpb3MkMShkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zJDEucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzJDEuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcyQxLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMkMS5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQsIG51bGwsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuY29uc3QgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyQxKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zJDE7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuJDE7XG5heGlvcy5pc0NhbmNlbCA9IGlzQ2FuY2VsO1xuYXhpb3MuVkVSU0lPTiA9IFZFUlNJT047XG5heGlvcy50b0Zvcm1EYXRhID0gdG9Gb3JtRGF0YTtcblxuLy8gRXhwb3NlIEF4aW9zRXJyb3IgY2xhc3NcbmF4aW9zLkF4aW9zRXJyb3IgPSBBeGlvc0Vycm9yO1xuXG4vLyBhbGlhcyBmb3IgQ2FuY2VsZWRFcnJvciBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuYXhpb3MuQ2FuY2VsID0gYXhpb3MuQ2FuY2VsZWRFcnJvcjtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gc3ByZWFkO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSBpc0F4aW9zRXJyb3I7XG5cbi8vIEV4cG9zZSBtZXJnZUNvbmZpZ1xuYXhpb3MubWVyZ2VDb25maWcgPSBtZXJnZUNvbmZpZztcblxuYXhpb3MuQXhpb3NIZWFkZXJzID0gQXhpb3NIZWFkZXJzJDE7XG5cbmF4aW9zLmZvcm1Ub0pTT04gPSB0aGluZyA9PiBmb3JtRGF0YVRvSlNPTih1dGlscyQxLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGUkMTtcblxuYXhpb3MuZGVmYXVsdCA9IGF4aW9zO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXhpb3MuY2pzLm1hcFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9saWIvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOlsiRG9tYWluIiwiZGF0YSIsInJlY2VpdmluZyIsInNlbmRpbmciLCJuYW1lIiwicmVxdWlyZV90bHMiLCJza2lwX3ZlcmlmaWNhdGlvbiIsInN0YXRlIiwid2lsZGNhcmQiLCJzcGFtX2FjdGlvbiIsImNyZWF0ZWRfYXQiLCJEYXRlIiwic210cF9wYXNzd29yZCIsInNtdHBfbG9naW4iLCJ0eXBlIiwicmVjZWl2aW5nX2Ruc19yZWNvcmRzIiwic2VuZGluZ19kbnNfcmVjb3JkcyIsImlkIiwiaXNfZGlzYWJsZWQiLCJ3ZWJfcHJlZml4Iiwid2ViX3NjaGVtZSIsInVzZV9hdXRvbWF0aWNfc2VuZGVyX3NlY3VyaXR5IiwiZHluYW1pY0tleXMiLCJkeW5hbWljUHJvcGVydGllcyIsInJlZHVjZSIsImFjYyIsInByb3BlcnR5TmFtZSIsInByb3AiLCJPYmplY3QiLCJhc3NpZ24iLCJ1cmxfam9pbl8xIiwiX19pbXBvcnREZWZhdWx0IiwicmVxdWlyZSIsIkVycm9yXzEiLCJkb21haW5fMSIsIkRvbWFpbnNDbGllbnQiLCJyZXF1ZXN0IiwiZG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJkb21haW5UZW1wbGF0ZXNDbGllbnQiLCJkb21haW5UYWdzQ2xpZW50IiwiZG9tYWluVHJhY2tpbmciLCJsb2dnZXIiLCJjb25zb2xlIiwiZG9tYWluQ3JlZGVudGlhbHMiLCJkb21haW5UZW1wbGF0ZXMiLCJkb21haW5UYWdzIiwicHJvdG90eXBlIiwiX2hhbmRsZUJvb2xWYWx1ZXMiLCJwcm9wc0ZvclJlcGxhY2VtZW50IiwicmVwbGFjZWRQcm9wcyIsImtleXMiLCJrZXkiLCJ2YWx1ZSIsInRvU3RyaW5nIiwiX19hc3NpZ24iLCJfcGFyc2VNZXNzYWdlIiwicmVzcG9uc2UiLCJib2R5IiwicGFyc2VEb21haW5MaXN0IiwiaXRlbXMiLCJtYXAiLCJpdGVtIiwiZGVmYXVsdCIsIl9wYXJzZURvbWFpbiIsImRvbWFpbiIsImxpc3QiLCJxdWVyeSIsIl90aGlzIiwiZ2V0IiwidGhlbiIsInJlcyIsInByZXBhcmVkUXVlcnkiLCJfYSIsImV4dGVuZGVkIiwiX2IiLCJ3aXRoX2RucyIsImNvbmNhdCIsImNyZWF0ZSIsInBvc3RPYmoiLCJwb3N0V2l0aEZEIiwidXBkYXRlIiwicHV0RGF0YSIsInB1dFdpdGhGRCIsInZlcmlmeSIsInB1dCIsImRlc3Ryb3kiLCJkZWxldGUiLCJnZXRDb25uZWN0aW9uIiwidXBkYXRlQ29ubmVjdGlvbiIsImdldFRyYWNraW5nIiwid2FybiIsInVwZGF0ZVRyYWNraW5nIiwiZ2V0SXBzIiwiYXNzaWduSXAiLCJpcCIsImRlbGV0ZUlwIiwibGlua0lwUG9vbCIsInBvb2xJZCIsInBvb2xfaWQiLCJ1bmxpbmtJcFBvbGwiLCJyZXBsYWNlbWVudCIsInNlYXJjaFBhcmFtcyIsImdldFVzZXJEYXRhRXJyb3IiLCJ1cGRhdGVES0lNQXV0aG9yaXR5Iiwic2VsZiIsInVwZGF0ZURLSU1TZWxlY3RvciIsImRraW1TZWxlY3RvciIsInNlbnQiLCJzdGF0dXMiLCJtZXNzYWdlIiwidXBkYXRlV2ViUHJlZml4Iiwid2ViUHJlZml4IiwiRG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJiYXNlUm91dGUiLCJfcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QiLCJ0b3RhbENvdW50IiwidG90YWxfY291bnQiLCJfcGFyc2VNZXNzYWdlUmVzcG9uc2UiLCJyZXN1bHQiLCJfcGFyc2VEZWxldGVkUmVzcG9uc2UiLCJzcGVjIiwiY3JlZGVudGlhbHNMb2dpbiIsIk5hdmlnYXRpb25UaHJ1UGFnZXNfMSIsIkRvbWFpblRhZyIsInRhZ0luZm8iLCJ0YWciLCJkZXNjcmlwdGlvbiIsImV4cG9ydHMiLCJEb21haW5UYWdTdGF0aXN0aWMiLCJ0YWdTdGF0aXN0aWNJbmZvIiwic3RhcnQiLCJlbmQiLCJyZXNvbHV0aW9uIiwic3RhdHMiLCJzdGF0IiwidGltZSIsIkRvbWFpblRhZ3NDbGllbnQiLCJfc3VwZXIiLCJfX2V4dGVuZHMiLCJjYWxsIiwicGFyc2VMaXN0IiwicGFnZXMiLCJwYXJzZVBhZ2VMaW5rcyIsIl9wYXJzZVRhZ1N0YXRpc3RpYyIsInJlcXVlc3RMaXN0V2l0aFBhZ2VzIiwic3RhdGlzdGljIiwiY291bnRyaWVzIiwicHJvdmlkZXJzIiwiZGV2aWNlcyIsIkRvbWFpblRlbXBsYXRlSXRlbSIsImRvbWFpblRlbXBsYXRlRnJvbUFQSSIsImNyZWF0ZWRBdCIsImNyZWF0ZWRCeSIsInZlcnNpb24iLCJ2ZXJzaW9ucyIsImxlbmd0aCIsIkRvbWFpblRlbXBsYXRlc0NsaWVudCIsInBhcnNlQ3JlYXRpb25SZXNwb25zZSIsInRlbXBsYXRlIiwicGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZSIsInBhcnNlTXV0YXRpb25SZXNwb25zZSIsInRlbXBsYXRlTmFtZSIsInBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UiLCJwYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlIiwidGVtcGxhdGVWZXJzaW9uIiwiZCIsInBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMiLCJkZXN0cm95QWxsIiwibGlzdFZlcnNpb25zIiwiZ2V0VmVyc2lvbiIsImNyZWF0ZVZlcnNpb24iLCJ1cGRhdGVWZXJzaW9uIiwiZGVzdHJveVZlcnNpb24iLCJEb21haW5UcmFja2luZ0NsaWVudCIsIl9wYXJzZVRyYWNraW5nU2V0dGluZ3MiLCJ0cmFja2luZyIsIl9wYXJzZVRyYWNraW5nVXBkYXRlIiwiX2lzT3BlblRyYWNraW5nSW5mb1dpdFBsYWNlIiwib2JqIiwicmVzcG9uc2VTdGF0dXNDb2RlIiwiZ2VuZXJhdGUiLCJwb3N0IiwicmVnZW5lcmF0ZSIsInByZXBhcmVkRGF0YSIsImFjdGl2ZSIsInBsYWNlX2F0X3RoZV90b3AiLCJFdmVudENsaWVudCIsIklwUG9vbHNDbGllbnQiLCJwYXJzZUlwUG9vbHNSZXNwb25zZSIsInBhdGNoV2l0aEZEIiwiSXBzQ2xpZW50IiwicGFyc2VJcHNSZXNwb25zZSIsIkluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQiLCJwYXRoIiwiYXR0cmlidXRlTmFtZSIsIkluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQiLCJzdXBwb3J0ZWRfZmlsdGVycyIsIkluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQiLCJhdHRyaWJ1dGVzIiwiZmlsdGVycyIsInNoYXJpbmciLCJjb252ZXJ0RGF0ZVRvVVRDIiwiaW5wdXREYXRlIiwidG9JU09TdHJpbmciLCJwcmVwYXJlUXVlcnlEYXRhIiwicXVlcnlEYXRhIiwicHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdCIsImJveCIsImhhbmRsZWRTZWVkTGlzdERhdGVzIiwidXBkYXRlZF9hdCIsInNoYXJpbmdfZXhwaXJlc19hdCIsIkJveCIsImxhc3RfcmVzdWx0X2F0IiwiSUQiLCJpbmJveFBsYWNlbWVudHNSZXN1bHQiLCJJZCIsImluYm94UGxhY2VtZW50UmVzdWx0IiwiZ2V0UmVzdWx0QnlTaGFyZUlkIiwic2hhcmVJZCIsIklQUlNoYXJpbmdDbGllbnQiLCJwcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0U2hhcmluZyIsImV4cGlyZXNfYXQiLCJlbmFibGVkIiwiU2VlZHNMaXN0c0NsaWVudCIsInByZXBhcmVSZXN1bHQiLCJzZWVkTGlzdCIsInByZXBhcmVTZWVkTGlzdCIsInNlZWRzIiwiU2VlZHMiLCJzZWVkSXRlbSIsInNlZWQiLCJoYW5kbGVkU2VlZERhdGVzIiwibWF4X2VtYWlsX2NvdW50X2hpdF9hdCIsImxhc3Rfc2VudF90b19hdCIsImxhc3RfZGVsaXZlcmVkX2F0IiwidXBkYXRlZFNlZWRzTGlzdCIsInNlZWRsaXN0IiwiSW5ib3hQbGFjZW1lbnRzQ2xpZW50Iiwic2VlZHNMaXN0c0NsaWVudCIsInJlc3VsdHMiLCJzZWVkc0xpc3RzIiwicnVuVGVzdCIsIkluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCIsImhhbmRsZWRQcm92aWRlckRhdGVzIiwiUmVxdWVzdF8xIiwiZG9tYWluc0NsaWVudF8xIiwiRXZlbnRzXzEiLCJTdGF0c0NsaWVudF8xIiwiU3VwcHJlc3Npb25zQ2xpZW50XzEiLCJXZWJob29rc18xIiwiTWVzc2FnZXNfMSIsIlJvdXRlc18xIiwidmFsaWRhdGVfMSIsIklQc18xIiwiSVBQb29sc18xIiwibWFpbGluZ0xpc3RzXzEiLCJtYWlsTGlzdE1lbWJlcnNfMSIsImRvbWFpbnNDcmVkZW50aWFsc18xIiwibXVsdGlwbGVWYWxpZGF0aW9uXzEiLCJkb21haW5zVGVtcGxhdGVzXzEiLCJkb21haW5zVGFnc18xIiwiU3ViYWNjb3VudHNfMSIsIlNlZWRzTGlzdHNDbGllbnRfMSIsImluYm94UGxhY2VtZW50c18xIiwiSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudF8xIiwiQXR0cmlidXRlc0NsaWVudF8xIiwiRmlsdGVyc0NsaWVudF8xIiwiSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnRfMSIsIkluYm94UGxhY2VtZW50c1Byb3ZpZGVyc18xIiwiTWV0cmljc0NsaWVudF8xIiwiZG9tYWluc1RyYWNraW5nXzEiLCJNYWlsZ3VuQ2xpZW50Iiwib3B0aW9ucyIsImZvcm1EYXRhIiwiY29uZmlnIiwidXJsIiwidXNlcm5hbWUiLCJFcnJvciIsIm1haWxMaXN0c01lbWJlcnMiLCJkb21haW5UcmFja2luZ0NsaWVudCIsIm11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCIsIkluYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50Iiwic2VlZHNMaXN0c0F0dHJpYnV0ZXMiLCJyZXN1bHRzQXR0cmlidXRlc0NsaWVudCIsInNlZWRzTGlzdHNGaWx0ZXJzQ2xpZW50IiwicmVzdWx0c0ZpbHRlcnNDbGllbnQiLCJpbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50IiwiaW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IiwiZG9tYWlucyIsIndlYmhvb2tzIiwiZXZlbnRzIiwibWV0cmljcyIsInN1cHByZXNzaW9ucyIsIm1lc3NhZ2VzIiwicm91dGVzIiwiaXBzIiwiaXBfcG9vbHMiLCJsaXN0cyIsInZhbGlkYXRlIiwic3ViYWNjb3VudHMiLCJpbmJveFBsYWNlbWVudHMiLCJzZXRTdWJhY2NvdW50Iiwic3ViYWNjb3VudElkIiwic2V0U3ViYWNjb3VudEhlYWRlciIsInJlc2V0U3ViYWNjb3VudCIsInJlc2V0U3ViYWNjb3VudEhlYWRlciIsIk1haWxMaXN0c01lbWJlcnMiLCJjaGVja0FuZFVwZGF0ZURhdGEiLCJuZXdEYXRhIiwidmFycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWJzY3JpYmVkIiwibGlzdE1lbWJlcnMiLCJtYWlsTGlzdEFkZHJlc3MiLCJnZXRNZW1iZXIiLCJtYWlsTGlzdE1lbWJlckFkZHJlc3MiLCJtZW1iZXIiLCJjcmVhdGVNZW1iZXIiLCJyZXFEYXRhIiwiY3JlYXRlTWVtYmVycyIsIm1lbWJlcnMiLCJBcnJheSIsImlzQXJyYXkiLCJ1cHNlcnQiLCJ1cGRhdGVNZW1iZXIiLCJkZXN0cm95TWVtYmVyIiwiTWFpbGluZ0xpc3RzQ2xpZW50IiwicGFyc2VWYWxpZGF0aW9uUmVzdWx0IiwidmFsaWRhdGlvblJlc3VsdCIsImNhbmNlbFZhbGlkYXRpb24iLCJNZXNzYWdlc0NsaWVudCIsInByZXBhcmVCb29sZWFuVmFsdWVzIiwieWVzTm9Qcm9wZXJ0aWVzIiwiU2V0IiwiaGFzIiwiX3BhcnNlUmVzcG9uc2UiLCJtb2RpZmllZERhdGEiLCJNZXRyaWNzQ2xpZW50IiwidG9VVENTdHJpbmciLCJwcmVwYXJlUXVlcnkiLCJzdGFydERhdGUiLCJlbmREYXRlIiwicVN0YXJ0IiwicUVuZCIsImhhbmRsZVJlc3BvbnNlIiwicmVzQm9keSIsInBhcnNlIiwiZ2V0QWNjb3VudCIsImdldEFjY291bnRVc2FnZSIsIlJvdXRlc0NsaWVudCIsInJvdXRlIiwiU3RhdHNDb250YWluZXJfMSIsIlN0YXRzQ2xpZW50IiwicHJlcGFyZVNlYXJjaFBhcmFtcyIsImVudHJpZXMiLCJhcnJheVdpdGhQYWlycyIsImN1cnJlbnRQYWlyIiwicmVwZWF0ZWRQcm9wZXJ0eSIsIl9fc3ByZWFkQXJyYXkiLCJwdXNoIiwicGFyc2VTdGF0cyIsImdldERvbWFpbiIsIlN0YXRzQ29udGFpbmVyIiwiU3ViYWNjb3VudHNDbGllbnQiLCJlbmFibGUiLCJkaXNhYmxlIiwiU1VCQUNDT1VOVF9IRUFERVIiLCJFbnVtc18xIiwiU3VwcHJlc3Npb25fMSIsIkJvdW5jZSIsIlN1cHByZXNzaW9uTW9kZWxzIiwiQk9VTkNFUyIsImFkZHJlc3MiLCJjb2RlIiwiZXJyb3IiLCJDb21wbGFpbnQiLCJDT01QTEFJTlRTIiwiU3VwcHJlc3Npb24iLCJCb3VuY2VfMSIsIkNvbXBsYWludF8xIiwiVW5zdWJzY3JpYmVfMSIsIldoaXRlTGlzdF8xIiwiY3JlYXRlT3B0aW9ucyIsImhlYWRlcnMiLCJTdXBwcmVzc2lvbkNsaWVudCIsIm1vZGVscyIsImJvdW5jZXMiLCJjb21wbGFpbnRzIiwidW5zdWJzY3JpYmVzIiwid2hpdGVsaXN0cyIsIk1vZGVsIiwiX3BhcnNlSXRlbSIsImNyZWF0ZVdoaXRlTGlzdCIsImlzRGF0YUFycmF5IiwicHJlcGFyZVJlc3BvbnNlIiwiY3JlYXRlVW5zdWJzY3JpYmUiLCJpc0NvbnRhaW5zVGFnIiwic29tZSIsInVuc3Vic2NyaWJlIiwidGFncyIsImdldE1vZGVsIiwibW9kZWwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJwb3N0RGF0YSIsIm1vZHVsZSIsIlVuc3Vic2NyaWJlIiwiVU5TVUJTQ1JJQkVTIiwiV2hpdGVMaXN0IiwiV0hJVEVMSVNUUyIsInJlYXNvbiIsIkF0dGFjaG1lbnRzSGFuZGxlcl8xIiwiTXVsdGlwbGVWYWxpZGF0aW9uSm9iIiwicXVhbnRpdHkiLCJyZWNvcmRzUHJvY2Vzc2VkIiwicmVjb3Jkc19wcm9jZXNzZWQiLCJkb3dubG9hZF91cmwiLCJkb3dubG9hZFVybCIsImNzdiIsImpzb24iLCJzdW1tYXJ5IiwiY2F0Y2hBbGwiLCJjYXRjaF9hbGwiLCJkZWxpdmVyYWJsZSIsImRvTm90U2VuZCIsImRvX25vdF9zZW5kIiwidW5kZWxpdmVyYWJsZSIsInVua25vd24iLCJyaXNrIiwiaGlnaCIsImxvdyIsIm1lZGl1bSIsIk11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCIsImF0dGFjaG1lbnRzSGFuZGxlciIsImpvYnMiLCJqb2IiLCJ0b3RhbCIsImxpc3RJZCIsImNvbnZlcnRUb0V4cGVjdGVkU2hhcGUiLCJtdWx0aXBsZVZhbGlkYXRpb25EYXRhIiwiaXNCdWZmZXIiLCJmaWxlIiwibXVsdGlwbGVWYWxpZGF0aW9uRmlsZSIsImlzU3RyZWFtIiwiVmFsaWRhdGVDbGllbnQiLCJtdWx0aXBsZVZhbGlkYXRpb24iLCJXZWJob29rIiwidXJscyIsIldlYmhvb2tzQ2xpZW50IiwiX3BhcnNlV2ViaG9va0xpc3QiLCJfcGFyc2VXZWJob29rV2l0aElEIiwid2ViaG9va1Jlc3BvbnNlIiwid2ViaG9vayIsInVuZGVmaW5lZCIsIl9wYXJzZVdlYmhvb2tUZXN0IiwidGVzdCIsInVybFZhbHVlcyIsIkJsb2JGcm9tU3RyZWFtIiwic3RyZWFtIiwic2l6ZSIsIl9zdHJlYW0iLCJkZWZpbmVQcm9wZXJ0eSIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiQXR0YWNobWVudHNIYW5kbGVyIiwiZ2V0QXR0YWNobWVudE9wdGlvbnMiLCJmaWxlbmFtZSIsImNvbnRlbnRUeXBlIiwia25vd25MZW5ndGgiLCJnZXRGaWxlSW5mbyIsImdldEN1c3RvbUZpbGVJbmZvIiwiZ2V0QnVmZmVySW5mbyIsImJ1ZmZlciIsImJ5dGVMZW5ndGgiLCJwaXBlIiwiaXNDdXN0b21GaWxlIiwiaXNCcm93c2VyRmlsZSIsIkJsb2IiLCJCdWZmZXIiLCJnZXRBdHRhY2htZW50SW5mbyIsImF0dGFjaG1lbnQiLCJpc1N0cmluZyIsImNvbnZlcnRUb0ZEZXhwZWN0ZWRTaGFwZSIsInVzZXJQcm92aWRlZFZhbHVlIiwiZ2V0QmxvYkZyb21TdHJlYW0iLCJBUElFcnJvciIsInN0YXR1c1RleHQiLCJib2R5TWVzc2FnZSIsInN0YWNrIiwiZGV0YWlscyIsIkZvcm1EYXRhQnVpbGRlciIsIkZvcm1EYXRhQ29uc3RydWN0b3IiLCJmaWxlS2V5cyIsImNyZWF0ZUZvcm1EYXRhIiwiZmlsdGVyIiwiZm9ybURhdGFBY2MiLCJpbmNsdWRlcyIsImF0dGFjaG1lbnRWYWx1ZSIsImlzTWVzc2FnZUF0dGFjaG1lbnQiLCJhZGRGaWxlc1RvRkQiLCJtZXNzYWdlVmFsdWUiLCJpc01JTUUiLCJhZGRNaW1lRGF0YVRvRkQiLCJhZGRDb21tb25Qcm9wZXJ0eVRvRkQiLCJmb3JtRGF0YUluc3RhbmNlIiwiYXBwZW5kIiwiaXNGb3JtRGF0YVBhY2thZ2UiLCJub2RlRm9ybURhdGEiLCJicm93c2VyRm9ybURhdGEiLCJibG9iSW5zdGFuY2UiLCJSZWFkYWJsZVN0cmVhbSIsImdldEhlYWRlcnMiLCJGaWxlIiwiZXZlcnkiLCJhcHBlbmRGaWxlVG9GRCIsIm9yaWdpbmFsS2V5Iiwib2JqRGF0YSIsImZkIiwiZnJvbSIsImJsb2IiLCJzZXQiLCJmb3JFYWNoIiwiYWRkVmFsdWVCYXNlZE9uRkQiLCJmZEtleSIsImZkVmFsdWUiLCJOYXZpZ2F0aW9uVGhydVBhZ2VzIiwicGFyc2VQYWdlIiwicGFnZVVybCIsInVybFNlcGFyYXRvciIsIml0ZXJhdG9yTmFtZSIsInBhcnNlZFVybCIsIlVSTCIsInBhZ2VWYWx1ZSIsInNwbGl0IiwicG9wIiwiaXRlcmF0b3JQb3NpdGlvbiIsInBhZ2UiLCJwYWdpbmciLCJ1cGRhdGVVcmxBbmRRdWVyeSIsImNsaWVudFVybCIsInF1ZXJ5Q29weSIsInVwZGF0ZWRRdWVyeSIsImJhc2U2NCIsIl9faW1wb3J0U3RhciIsImF4aW9zXzEiLCJGb3JtRGF0YUJ1aWxkZXJfMSIsIlJlcXVlc3QiLCJ0aW1lb3V0IiwibWFrZUhlYWRlcnNGcm9tT2JqZWN0IiwiZm9ybURhdGFCdWlsZGVyIiwibWF4Qm9keUxlbmd0aCIsInByb3h5IiwibWV0aG9kIiwib25DYWxsT3B0aW9ucyIsInJlcXVlc3RIZWFkZXJzIiwiam9pbkFuZFRyYW5zZm9ybUhlYWRlcnMiLCJwYXJhbXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiVVJMU2VhcmNoUGFyYW1zIiwidXJsVmFsdWUiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsIl9kIiwiZXJyb3JSZXNwb25zZSIsImVycl8xIiwiX2MiLCJnZXRSZXNwb25zZUJvZHkiLCJBeGlvc0hlYWRlcnMiLCJiYXNpYyIsImVuY29kZSIsInNldEF1dGhvcml6YXRpb24iLCJyZWNlaXZlZE9uQ2FsbEhlYWRlcnMiLCJvbkNhbGxIZWFkZXJzIiwiaGVhZGVyc09iamVjdCIsImhlYWRlcnNBY2N1bXVsYXRvciIsImNvbW1hbmQiLCJhZGREZWZhdWx0SGVhZGVycyIsInJlcXVlc3RPcHRpb25zIiwiUmVzb2x1dGlvbiIsIldlYmhvb2tzSWRzIiwiWWVzTm8iLCJfX2V4cG9ydFN0YXIiLCJNYWlsZ3VuQ2xpZW50XzEiLCJFbnVtcyIsIkludGVyZmFjZXMiLCJNYWlsZ3VuIiwiRm9ybURhdGEiLCJjbGllbnQiXSwic291cmNlUm9vdCI6IiJ9