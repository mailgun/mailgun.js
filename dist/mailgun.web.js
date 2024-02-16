/*! mailgun.js v10.2.0 */
/*! mailgun.js v10.2.0 */
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
    this.created_at = data.created_at;
    this.smtp_password = data.smtp_password;
    this.smtp_login = data.smtp_login;
    this.type = data.type;
    this.receiving_dns_records = receiving || null;
    this.sending_dns_records = sending || null;
    /*
      domain list has shorter response then get, create, and update methods.
    */
    var dynamicKeys = ['id', 'is_disabled', 'web_prefix', 'web_scheme'];
    var dynamicProperties = dynamicKeys.reduce(function (acc, propertyName) {
      if (propertyName in data) {
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
  function DomainsClient(request, domainCredentialsClient, domainTemplatesClient, domainTagsClient) {
    this.request = request;
    this.domainCredentials = domainCredentialsClient;
    this.domainTemplates = domainTemplatesClient;
    this.domainTags = domainTagsClient;
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
  DomainsClient.prototype._parseTrackingSettings = function (response) {
    return response.body.tracking;
  };
  DomainsClient.prototype._parseTrackingUpdate = function (response) {
    return response.body;
  };
  DomainsClient.prototype.list = function (query) {
    var _this = this;
    return this.request.get('/v3/domains', query).then(function (res) {
      return _this.parseDomainList(res);
    });
  };
  DomainsClient.prototype.get = function (domain) {
    var _this = this;
    return this.request.get("/v3/domains/".concat(domain)).then(function (res) {
      return _this._parseDomain(res);
    });
  };
  DomainsClient.prototype.create = function (data) {
    var _this = this;
    var postObj = this._handleBoolValues(data);
    return this.request.postWithFD('/v3/domains', postObj).then(function (res) {
      return _this._parseDomain(res);
    });
  };
  DomainsClient.prototype.update = function (domain, data) {
    var _this = this;
    var putData = this._handleBoolValues(data);
    return this.request.putWithFD("/v3/domains/".concat(domain), putData).then(function (res) {
      return _this._parseDomain(res);
    });
  };
  DomainsClient.prototype.verify = function (domain) {
    var _this = this;
    return this.request.put("/v3/domains/".concat(domain, "/verify")).then(function (res) {
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
      return res.body.connection;
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
  DomainsClient.prototype.getTracking = function (domain) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'tracking')).then(this._parseTrackingSettings);
  };
  DomainsClient.prototype.updateTracking = function (domain, type, data) {
    var _this = this;
    if (typeof (data === null || data === void 0 ? void 0 : data.active) === 'boolean') {
      throw Error_1.default.getUserDataError('Received boolean value for active property', 'Property "active" must contain string value.');
    }
    return this.request.putWithFD((0, url_join_1.default)('/v3/domains', domain, 'tracking', type), data).then(function (res) {
      return _this._parseTrackingUpdate(res);
    });
  };
  // IPs
  DomainsClient.prototype.getIps = function (domain) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'ips')).then(function (response) {
      var _a;
      return (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.items;
    });
  };
  DomainsClient.prototype.assignIp = function (domain, ip) {
    return this.request.postWithFD((0, url_join_1.default)('/v3/domains', domain, 'ips'), {
      ip: ip
    });
  };
  DomainsClient.prototype.deleteIp = function (domain, ip) {
    return this.request.delete((0, url_join_1.default)('/v3/domains', domain, 'ips', ip));
  };
  DomainsClient.prototype.linkIpPool = function (domain, poolId) {
    return this.request.postWithFD((0, url_join_1.default)('/v3/domains', domain, 'ips'), {
      pool_id: poolId
    });
  };
  DomainsClient.prototype.unlinkIpPoll = function (domain, replacement) {
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
    return this.request.put("/v3/domains/".concat(domain, "/dkim_selector"), {}, {
      query: "dkim_selector=".concat(data.dkimSelector)
    }).then(function (res) {
      return res;
    });
  };
  DomainsClient.prototype.updateWebPrefix = function (domain, data) {
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
  DomainTemplatesClient.prototype.listVersions = function (domain, templateName, query) {
    var _this = this;
    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/templates', templateName, '/versions'), query).then(function (res) {
      return _this.parseListTemplateVersions(res);
    });
  };
  return DomainTemplatesClient;
}(NavigationThruPages_1.default);
exports["default"] = DomainTemplatesClient;

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
    var multipleValidationClient = new multipleValidation_1.default(this.request);
    this.domains = new domainsClient_1.default(this.request, domainCredentialsClient, domainTemplatesClient, domainTagsClient);
    this.webhooks = new Webhooks_1.default(this.request);
    this.events = new Events_1.default(this.request);
    this.stats = new StatsClient_1.default(this.request);
    this.suppressions = new SuppressionsClient_1.default(this.request);
    this.messages = new Messages_1.default(this.request);
    this.routes = new Routes_1.default(this.request);
    this.ips = new IPs_1.default(this.request);
    this.ip_pools = new IPPools_1.default(this.request);
    this.lists = new mailingLists_1.default(this.request, mailListsMembers);
    this.validate = new validate_1.default(this.request, multipleValidationClient);
    this.subaccounts = new Subaccounts_1.default(this.request);
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
    this.logger.warn("Date:\"".concat(inputDate, "\" was auto-converted to UTC time zone.\nValue \"").concat(inputDate.toUTCString(), "\" will be used for request.\nConsider using sting type for property \"").concat(key, "\" to avoid auto-converting"));
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
// Axios v1.6.0 Copyright (c) 2023 Matt Zabriskie and contributors


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
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
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

var utils = {
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
  isThenable
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
      config: utils.toJSONObject(this.config),
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

  utils.toFlatObject(error, axiosError, function filter(obj) {
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
  return utils.isPlainObject(thing) || utils.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
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
  return utils.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
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
  if (!utils.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils.isSpecCompliantForm(formData);

  if (!utils.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
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
      if (utils.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils.isArray(value) && isFlatArray(value)) ||
        ((utils.isFileList(value) || utils.endsWith(key, '[]')) && (arr = utils.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils.isUndefined(el) || el === null) && formData.append(
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
    if (utils.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils.forEach(value, function each(el, key) {
      const result = !(utils.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils.isObject(obj)) {
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
    serializedParams = utils.isURLSearchParams(params) ?
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
    utils.forEach(this.handlers, function forEachHandler(h) {
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
const isStandardBrowserEnv = (() => {
  let product;
  if (typeof navigator !== 'undefined' && (
    (product = navigator.product) === 'ReactNative' ||
    product === 'NativeScript' ||
    product === 'NS')
  ) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
})();

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
 const isStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();


var platform = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
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
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
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
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    const obj = {};

    utils.forEachEntry(formData, (name, value) => {
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

const defaults = {

  transitional: transitionalDefaults,

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils.isObject(data);

    if (isObjectPayload && utils.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils.isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils.isArrayBuffer(data) ||
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
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
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

    if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
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

utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

var defaults$1 = defaults;

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils.toObjectSet([
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

  return utils.isArray(value) ? value.map(normalizeValue) : String(value);
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
  if (utils.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils.isString(value)) return;

  if (utils.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils.isRegExp(filter)) {
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
  const accessorName = utils.toCamelCase(' ' + header);

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

      const key = utils.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

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
        const key = utils.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils.isArray(header)) {
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

    utils.forEach(this, (value, header) => {
      const key = utils.findKey(headers, header);

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

    utils.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
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

    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
utils.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

utils.freezeMethods(AxiosHeaders);

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

  utils.forEach(fns, function transform(fn) {
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

utils.inherits(CanceledError, AxiosError, {
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

var cookies = platform.isStandardBrowserEnv ?

// Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
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
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
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
  })();

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
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
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

var isURLSameOrigin = platform.isStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover it's components
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
      const parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
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

function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return e => {
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
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

var xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    let contentType;

    if (utils.isFormData(requestData)) {
      if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else if(!requestHeaders.getContentType(/^\s*multipart\/form-data/)){
        requestHeaders.setContentType('multipart/form-data'); // mobile/desktop app frameworks
      } else if(utils.isString(contentType = requestHeaders.getContentType())){
        // fix semicolon duplication issue for ReactNative FormData implementation
        requestHeaders.setContentType(contentType.replace(/^\s*(multipart\/form-data);+/, '$1'));
      }
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

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
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || transitionalDefaults;
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
    if (platform.isStandardBrowserEnv) {
      // Add xsrf header
      // regarding CVE-2023-45857 config.withCredentials condition was removed temporarily
      const xsrfValue = isURLSameOrigin(fullPath) && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
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
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
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

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};

utils.forEach(knownAdapters, (fn, value) => {
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

const isResolvedHandle = (adapter) => utils.isFunction(adapter) || adapter === null || adapter === false;

var adapters = {
  getAdapter: (adapters) => {
    adapters = utils.isArray(adapters) ? adapters : [adapters];

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

const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;

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
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({caseless}, target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils.isUndefined(a)) {
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

  utils.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

const VERSION = "1.6.0";

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
  request(configOrUrl, config) {
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
      if (utils.isFunction(paramsSerializer)) {
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
    let contextHeaders = headers && utils.merge(
      headers.common,
      headers[config.method]
    );

    headers && utils.forEach(
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
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
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
  return utils.isObject(payload) && (payload.isAxiosError === true);
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
  utils.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils.extend(instance, context, null, {allOwnKeys: true});

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

axios.formToJSON = thing => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FtWCxZQUFBLENBQUEvYyxtQkFBQSxtRUFBQTRGLE9BQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FFSkFtWCxZQUFBLENBQUEvYyxtQkFBQSxrREFBQTRGLE9BQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FFQUFtWCxZQUFBLENBQUEvYyxtQkFBQSxxREFBQTRGLE9BQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FFQUFtWCxZQUFBLENBQUEvYyxtQkFBQSx5Q0FBQTRGLE9BQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FFQUFtWCxZQUFBLENBQUEvYyxtQkFBQSxxRkFBQTRGLE9BQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FHQUFtWCxZQUFBLENBQUEvYyxtQkFBQSxnRkFBQTRGLE9BQUE7QUFDQW1YLFlBQUEsQ0FBQS9jLG1CQUFBLG9FQUFBNEYsT0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUVEQW1YLFlBQUEsQ0FBQS9jLG1CQUFBLHdEQUFBNEYsT0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUVBQW1YLFlBQUEsQ0FBQS9jLG1CQUFBLGtEQUFBNEYsT0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUVBQW1YLFlBQUEsQ0FBQS9jLG1CQUFBLCtDQUFBNEYsT0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUVBQW1YLFlBQUEsQ0FBQS9jLG1CQUFBLGlFQUFBNEYsT0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxVQUFVO0FBQ3JCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFD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QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLGVBQWU7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsUUFBUTtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsbUJBQW1CO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsTUFBTTtBQUMvQyxNQUFNO0FBQ047QUFDQTtBQUNBLDhDQUE4QyxNQUFNO0FBQ3BEO0FBQ0EsQ0FBQzs7QUFFRCxzQ0FBc0MsT0FBTzs7QUFFN0M7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVcsUUFBUTtBQUNuQjtBQUNBOztBQUVBOztBQUVBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7O0FBRUE7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QTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzREFBc0QsaUJBQWlCOztBQUV2RTtBQUNBLHlDQUF5QyxpQkFBaUI7O0FBRTFEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7VUNwcUdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVKQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNDcmVkZW50aWFscy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVGFncy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVGVtcGxhdGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9FdmVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0lQUG9vbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0lQcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWFpbGd1bkNsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWFpbGluZ0xpc3RzL21haWxpbmdMaXN0cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWVzc2FnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1JvdXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3RhdHMvU3RhdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N0YXRzL1N0YXRzQ29udGFpbmVyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdWJhY2NvdW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL0JvdW5jZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL0NvbXBsYWludC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvU3VwcHJlc3Npb25zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvVW5zdWJzY3JpYmUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9XaGl0ZUxpc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1ZhbGlkYXRpb25zL211bHRpcGxlVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvVmFsaWRhdGlvbnMvdmFsaWRhdGUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1dlYmhvb2tzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vQXR0YWNobWVudHNIYW5kbGVyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vRXJyb3IudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9Gb3JtRGF0YUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vUmVxdWVzdC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0VudW1zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Db21tb24vTG9nZ2VyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Db21tb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvRG9tYWluQ3JlZGVudGlhbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvRG9tYWluVGFncy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9Eb21haW5UZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvRG9tYWluc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRXZlbnRDbGllbnQvSUV2ZW50Q2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9FdmVudENsaWVudC9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSVBQb29scy9JSVBQb29sc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSVBQb29scy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSVBzL0lJUHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0lQcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWFpbGd1bkNsaWVudC9JTWFpbGd1bkNsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWFpbGd1bkNsaWVudC9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWFpbGluZ0xpc3RzL01haWxpbmdMaXN0TWVtYmVycy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWFpbGluZ0xpc3RzL01haWxpbmdMaXN0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWFpbGluZ0xpc3RzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NZXNzYWdlcy9JTWVzc2FnZXNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01lc3NhZ2VzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Sb3V0ZXMvSVJvdXRlc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvUm91dGVzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdGF0cy9TdGF0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3RhdHMvU3RhdHNDb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N0YXRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdWJhY2NvdW50cy9JU3ViYWNjb3VudHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1YmFjY291bnRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvQm91bmNlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvQ29tcGxhaW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvSVN1cHByZXNzaW9uc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zL1Vuc3Vic2NyaWJlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvV2hpdGVMaXN0LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1ZhbGlkYXRpb25zL011bHRpcGxlVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMvVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1dlYmhvb2tzL0lXZWJIb29rc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvV2ViaG9va3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvQ29tbW9uL0Vycm9yLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvQ29tbW9uL0Zvcm1EYXRhLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvQ29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vUmVxdWVzdE9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpbkNyZWRlbnRpYWxzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRG9tYWlucy9Eb21haW5UYWdzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRG9tYWlucy9Eb21haW5UZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpblRyYWNraW5nLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRG9tYWlucy9Eb21haW5zLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRG9tYWlucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0V2ZW50cy9FdmVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9FdmVudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9JUFBvb2xzL0lwUG9vbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9JUFBvb2xzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvSVBzL0lQcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0lQcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxndW5DbGllbnQvTWFpbGd1bkNsaWVudE9wdGlvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NYWlsZ3VuQ2xpZW50L2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWFpbGluZ0xpc3RzL01haWxpbmdMaXN0TWVtYmVycy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxpbmdMaXN0cy9NYWlsaW5nTGlzdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NYWlsaW5nTGlzdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NZXNzYWdlcy9NZXNzYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01lc3NhZ2VzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvUm91dGVzL1JvdXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1JvdXRlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N0YXRzL1N0YXRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3RhdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdWJhY2NvdW50cy9TdWJhY2NvdW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1YmFjY291bnRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL0JvdW5jZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9Db21wbGFpbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvU3VwcHJlc3Npb25zLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL1Vuc3Vic2NyaWJlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL1doaXRlTGlzdC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1ZhbGlkYXRpb25zL011bHRpcGxlVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1ZhbGlkYXRpb25zL1ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9WYWxpZGF0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1dlYmhvb2tzL1dlYmhvb2tzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvV2ViaG9va3MvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy91cmwtam9pbi9saWIvdXJsLWpvaW4uanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9heGlvcy9kaXN0L2Jyb3dzZXIvYXhpb3MuY2pzIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRE5TUmVjb3JkLFxuICBEb21haW5EYXRhLFxuICBEb21haW5TaG9ydERhdGEsXG4gIFREb21haW5cbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluIGltcGxlbWVudHMgVERvbWFpbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xuICBzdGF0ZTogc3RyaW5nO1xuICB3aWxkY2FyZDogYm9vbGVhbjtcbiAgc3BhbV9hY3Rpb246IHN0cmluZztcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICBzbXRwX3Bhc3N3b3JkOiBzdHJpbmc7XG4gIHNtdHBfbG9naW46IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICByZWNlaXZpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgc2VuZGluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuICBpZD86IHN0cmluZztcbiAgaXNfZGlzYWJsZWQ/OiBib29sZWFuO1xuICB3ZWJfcHJlZml4Pzogc3RyaW5nO1xuICB3ZWJfc2NoZW1lPzogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGRhdGE6IERvbWFpblNob3J0RGF0YSB8IERvbWFpbkRhdGEsXG4gICAgcmVjZWl2aW5nPzogRE5TUmVjb3JkW10gfCBudWxsLFxuICAgIHNlbmRpbmc/OiBETlNSZWNvcmRbXSB8IG51bGxcbiAgKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMucmVxdWlyZV90bHMgPSBkYXRhLnJlcXVpcmVfdGxzO1xuICAgIHRoaXMuc2tpcF92ZXJpZmljYXRpb24gPSBkYXRhLnNraXBfdmVyaWZpY2F0aW9uO1xuICAgIHRoaXMuc3RhdGUgPSBkYXRhLnN0YXRlO1xuICAgIHRoaXMud2lsZGNhcmQgPSBkYXRhLndpbGRjYXJkO1xuICAgIHRoaXMuc3BhbV9hY3Rpb24gPSBkYXRhLnNwYW1fYWN0aW9uO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IGRhdGEuY3JlYXRlZF9hdDtcbiAgICB0aGlzLnNtdHBfcGFzc3dvcmQgPSBkYXRhLnNtdHBfcGFzc3dvcmQ7XG4gICAgdGhpcy5zbXRwX2xvZ2luID0gZGF0YS5zbXRwX2xvZ2luO1xuICAgIHRoaXMudHlwZSA9IGRhdGEudHlwZTtcbiAgICB0aGlzLnJlY2VpdmluZ19kbnNfcmVjb3JkcyA9IHJlY2VpdmluZyB8fCBudWxsO1xuICAgIHRoaXMuc2VuZGluZ19kbnNfcmVjb3JkcyA9IHNlbmRpbmcgfHwgbnVsbDtcbiAgICAvKlxuICAgICAgZG9tYWluIGxpc3QgaGFzIHNob3J0ZXIgcmVzcG9uc2UgdGhlbiBnZXQsIGNyZWF0ZSwgYW5kIHVwZGF0ZSBtZXRob2RzLlxuICAgICovXG5cbiAgICBjb25zdCBkeW5hbWljS2V5czogKGtleW9mIERvbWFpbkRhdGEpW10gPSBbJ2lkJywgJ2lzX2Rpc2FibGVkJywgJ3dlYl9wcmVmaXgnLCAnd2ViX3NjaGVtZSddO1xuXG4gICAgY29uc3QgZHluYW1pY1Byb3BlcnRpZXMgPSBkeW5hbWljS2V5cy5yZWR1Y2UoKGFjYywgcHJvcGVydHlOYW1lKSA9PiB7XG4gICAgICBpZiAocHJvcGVydHlOYW1lIGluIGRhdGEpIHtcbiAgICAgICAgY29uc3QgcHJvcCA9IHByb3BlcnR5TmFtZSBhcyBrZXlvZiBEb21haW47XG4gICAgICAgIGFjY1twcm9wXSA9IChkYXRhIGFzIERvbWFpbkRhdGEpW3Byb3BlcnR5TmFtZV07XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9IGFzIFJlY29yZDxrZXlvZiBEb21haW4sIHN0cmluZyB8IGJvb2xlYW4+KTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGR5bmFtaWNQcm9wZXJ0aWVzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHtcbiAgSURvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgSURvbWFpblRhZ3NDbGllbnQsXG4gIElEb21haW5DcmVkZW50aWFscyxcbiAgSURvbWFpbnNDbGllbnRcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcblxuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvcic7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCBEb21haW5DcmVkZW50aWFsc0NsaWVudCBmcm9tICcuL2RvbWFpbnNDcmVkZW50aWFscyc7XG5pbXBvcnQgRG9tYWluVGVtcGxhdGVzQ2xpZW50IGZyb20gJy4vZG9tYWluc1RlbXBsYXRlcyc7XG5pbXBvcnQgRG9tYWluVGFnc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUYWdzJztcbmltcG9ydCB7XG4gIERlc3Ryb3llZERvbWFpblJlc3BvbnNlLFxuICBNZXNzYWdlUmVzcG9uc2UsXG4gIERvbWFpbkxpc3RSZXNwb25zZURhdGEsXG4gIERvbWFpblJlc3BvbnNlRGF0YSxcbiAgRG9tYWluVHJhY2tpbmdSZXNwb25zZSxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlLFxuICBVcGRhdGVkT3BlblRyYWNraW5nLFxuICBEb21haW5zUXVlcnksXG4gIERvbWFpbkluZm8sXG4gIENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UsXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MsXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMsXG4gIE9wZW5UcmFja2luZ0luZm8sXG4gIENsaWNrVHJhY2tpbmdJbmZvLFxuICBVbnN1YnNjcmliZVRyYWNraW5nSW5mbyxcbiAgUmVwbGFjZW1lbnRGb3JQb29sLFxuICBES0lNQXV0aG9yaXR5SW5mbyxcbiAgVXBkYXRlZERLSU1BdXRob3JpdHksXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UsXG4gIERLSU1TZWxlY3RvckluZm8sXG4gIFVwZGF0ZWRES0lNU2VsZWN0b3JSZXNwb25zZSxcbiAgV2ViUHJlZml4SW5mbyxcbiAgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlLFxuICBURG9tYWluLFxuICBEb21haW5VcGRhdGVJbmZvLFxuICBEb21haW5VcGRhdGVJbmZvUmVxLFxuICBEb21haW5JbmZvUmVxLFxuICBCb29sVG9TdHJpbmcsXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuaW1wb3J0IERvbWFpbiBmcm9tICcuL2RvbWFpbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbnNDbGllbnQgaW1wbGVtZW50cyBJRG9tYWluc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHB1YmxpYyBkb21haW5DcmVkZW50aWFsczogSURvbWFpbkNyZWRlbnRpYWxzO1xuICBwdWJsaWMgZG9tYWluVGVtcGxhdGVzOiBJRG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuICBwdWJsaWMgZG9tYWluVGFnczogSURvbWFpblRhZ3NDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBkb21haW5DcmVkZW50aWFsc0NsaWVudDogRG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgZG9tYWluVGVtcGxhdGVzQ2xpZW50OiBEb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgZG9tYWluVGFnc0NsaWVudDogRG9tYWluVGFnc0NsaWVudFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuZG9tYWluQ3JlZGVudGlhbHMgPSBkb21haW5DcmVkZW50aWFsc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRlbXBsYXRlcyA9IGRvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRhZ3MgPSBkb21haW5UYWdzQ2xpZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQm9vbFZhbHVlcyhcbiAgICBkYXRhOiBEb21haW5JbmZvIHwgRG9tYWluVXBkYXRlSW5mb1xuICApOiBEb21haW5JbmZvUmVxIHwgRG9tYWluVXBkYXRlSW5mb1JlcSB7XG4gICAgY29uc3QgcHJvcHNGb3JSZXBsYWNlbWVudCA9IGRhdGEgYXMgQm9vbFRvU3RyaW5nO1xuICAgIGNvbnN0IHJlcGxhY2VkUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wc0ZvclJlcGxhY2VtZW50KS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICBjb25zdCBwcm9wID0ga2V5IGFzIGtleW9mIEJvb2xUb1N0cmluZztcbiAgICAgIGlmICh0eXBlb2YgcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSBhcyBib29sZWFuO1xuICAgICAgICBhY2NbcHJvcF0gPSAodmFsdWUudG9TdHJpbmcoKSA9PT0gJ3RydWUnKSA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9IGFzIFJlY29yZDxrZXlvZiBCb29sVG9TdHJpbmcsICd0cnVlJ3wgJ2ZhbHNlJz4pO1xuICAgIHJldHVybiB7IC4uLmRhdGEsIC4uLnJlcGxhY2VkUHJvcHMgfSBhcyBEb21haW5VcGRhdGVJbmZvUmVxIHwgRG9tYWluSW5mb1JlcTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlTWVzc2FnZShyZXNwb25zZTogRGVzdHJveWVkRG9tYWluUmVzcG9uc2UpIDogTWVzc2FnZVJlc3BvbnNlIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VEb21haW5MaXN0KHJlc3BvbnNlOiBEb21haW5MaXN0UmVzcG9uc2VEYXRhKTogVERvbWFpbltdIHtcbiAgICBpZiAocmVzcG9uc2UuYm9keSAmJiByZXNwb25zZS5ib2R5Lml0ZW1zKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEb21haW4oaXRlbSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW4ocmVzcG9uc2U6IERvbWFpblJlc3BvbnNlRGF0YSk6IFREb21haW4ge1xuICAgIHJldHVybiBuZXcgRG9tYWluKFxuICAgICAgcmVzcG9uc2UuYm9keS5kb21haW4sXG4gICAgICByZXNwb25zZS5ib2R5LnJlY2VpdmluZ19kbnNfcmVjb3JkcyxcbiAgICAgIHJlc3BvbnNlLmJvZHkuc2VuZGluZ19kbnNfcmVjb3Jkc1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRyYWNraW5nU2V0dGluZ3MocmVzcG9uc2U6IERvbWFpblRyYWNraW5nUmVzcG9uc2UpIDogRG9tYWluVHJhY2tpbmdEYXRhIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keS50cmFja2luZztcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVHJhY2tpbmdVcGRhdGUocmVzcG9uc2U6IFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UpIDpVcGRhdGVkT3BlblRyYWNraW5nIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgfVxuXG4gIGxpc3QocXVlcnk/OiBEb21haW5zUXVlcnkpOiBQcm9taXNlPFREb21haW5bXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvZG9tYWlucycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlRG9tYWluTGlzdChyZXMgYXMgRG9tYWluTGlzdFJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nKSA6IFByb21pc2U8VERvbWFpbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogRG9tYWluSW5mbykgOiBQcm9taXNlPFREb21haW4+IHtcbiAgICBjb25zdCBwb3N0T2JqID0gdGhpcy5faGFuZGxlQm9vbFZhbHVlcyhkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92My9kb21haW5zJywgcG9zdE9iailcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgdXBkYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBEb21haW5VcGRhdGVJbmZvKSA6IFByb21pc2U8VERvbWFpbj4ge1xuICAgIGNvbnN0IHB1dERhdGEgPSB0aGlzLl9oYW5kbGVCb29sVmFsdWVzKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gLCBwdXREYXRhKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICB2ZXJpZnkoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPFREb21haW4+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L3ZlcmlmeWApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2UocmVzIGFzIERlc3Ryb3llZERvbWFpblJlc3BvbnNlKSk7XG4gIH1cblxuICBnZXRDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxDb25uZWN0aW9uU2V0dGluZ3M+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL2RvbWFpbnMvJHtkb21haW59L2Nvbm5lY3Rpb25gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UpXG4gICAgICAudGhlbigocmVzOkNvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlKSA9PiByZXMuYm9keS5jb25uZWN0aW9uIGFzIENvbm5lY3Rpb25TZXR0aW5ncyk7XG4gIH1cblxuICB1cGRhdGVDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBDb25uZWN0aW9uU2V0dGluZ3MpOiBQcm9taXNlPFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3M+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2Nvbm5lY3Rpb25gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcylcbiAgICAgIC50aGVuKChyZXM6VXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcykgPT4gcmVzLmJvZHkgYXMgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyk7XG4gIH1cblxuICAvLyBUcmFja2luZ1xuXG4gIGdldFRyYWNraW5nKGRvbWFpbjogc3RyaW5nKSA6IFByb21pc2U8RG9tYWluVHJhY2tpbmdEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VUcmFja2luZ1NldHRpbmdzKTtcbiAgfVxuXG4gIHVwZGF0ZVRyYWNraW5nKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBPcGVuVHJhY2tpbmdJbmZvIHwgQ2xpY2tUcmFja2luZ0luZm8gfCBVbnN1YnNjcmliZVRyYWNraW5nSW5mb1xuICApOiBQcm9taXNlPFVwZGF0ZWRPcGVuVHJhY2tpbmc+IHtcbiAgICBpZiAodHlwZW9mIGRhdGE/LmFjdGl2ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdSZWNlaXZlZCBib29sZWFuIHZhbHVlIGZvciBhY3RpdmUgcHJvcGVydHknLCAnUHJvcGVydHkgXCJhY3RpdmVcIiBtdXN0IGNvbnRhaW4gc3RyaW5nIHZhbHVlLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJywgdHlwZSksIGRhdGEpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlVHJhY2tpbmdVcGRhdGUocmVzIGFzIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UpKTtcbiAgfVxuXG4gIC8vIElQc1xuXG4gIGdldElwcyhkb21haW46IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBBUElSZXNwb25zZSkgPT4gcmVzcG9uc2U/LmJvZHk/Lml0ZW1zKTtcbiAgfVxuXG4gIGFzc2lnbklwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IGlwIH0pO1xuICB9XG5cbiAgZGVsZXRlSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCBpcCkpO1xuICB9XG5cbiAgbGlua0lwUG9vbChkb21haW46IHN0cmluZywgcG9vbElkOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgcG9vbF9pZDogcG9vbElkIH0pO1xuICB9XG5cbiAgdW5saW5rSXBQb2xsKGRvbWFpbjogc3RyaW5nLCByZXBsYWNlbWVudDogUmVwbGFjZW1lbnRGb3JQb29sKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGxldCBzZWFyY2hQYXJhbXMgPSAnJztcbiAgICBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCAmJiByZXBsYWNlbWVudC5pcCkge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignVG9vIG11Y2ggZGF0YSBmb3IgcmVwbGFjZW1lbnQnLCAnUGxlYXNlIHNwZWNpZnkgZWl0aGVyIHBvb2xfaWQgb3IgaXAgKG5vdCBib3RoKScpO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gYD9wb29sX2lkPSR7cmVwbGFjZW1lbnQucG9vbF9pZH1gO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/aXA9JHtyZXBsYWNlbWVudC5pcH1gO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsICdpcF9wb29sJywgc2VhcmNoUGFyYW1zKSk7XG4gIH1cblxuICB1cGRhdGVES0lNQXV0aG9yaXR5KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNQXV0aG9yaXR5SW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1BdXRob3JpdHk+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2RraW1fYXV0aG9yaXR5YCwge30sIHsgcXVlcnk6IGBzZWxmPSR7ZGF0YS5zZWxmfWAgfSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpXG4gICAgICAudGhlbigocmVzIDogVXBkYXRlZERLSU1BdXRob3JpdHlSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgVXBkYXRlZERLSU1BdXRob3JpdHkpO1xuICB9XG5cbiAgdXBkYXRlREtJTVNlbGVjdG9yKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNU2VsZWN0b3JJbmZvKTogUHJvbWlzZTxVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2RraW1fc2VsZWN0b3JgLCB7fSwgeyBxdWVyeTogYGRraW1fc2VsZWN0b3I9JHtkYXRhLmRraW1TZWxlY3Rvcn1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UpO1xuICB9XG5cbiAgdXBkYXRlV2ViUHJlZml4KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBXZWJQcmVmaXhJbmZvKTogUHJvbWlzZTxVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L3dlYl9wcmVmaXhgLCB7fSwgeyBxdWVyeTogYHdlYl9wcmVmaXg9JHtkYXRhLndlYlByZWZpeH1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgeyBBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BcGlSZXNwb25zZSc7XG5pbXBvcnQgeyBJRG9tYWluQ3JlZGVudGlhbHMgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuaW1wb3J0IHtcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEsXG4gIERvbWFpbkNyZWRlbnRpYWxzTGlzdCxcbiAgQ3JlYXRlZFVwZGF0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlLFxuICBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCxcbiAgRGVsZXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UsXG4gIERvbWFpbkNyZWRlbnRpYWxzUXVlcnksXG4gIERvbWFpbkNyZWRlbnRpYWxzLFxuICBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGltcGxlbWVudHMgSURvbWFpbkNyZWRlbnRpYWxzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2RvbWFpbnMvJztcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KFxuICAgIHJlc3BvbnNlOiBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YVxuICApOiBEb21haW5DcmVkZW50aWFsc0xpc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHRvdGFsQ291bnQ6IHJlc3BvbnNlLmJvZHkudG90YWxfY291bnRcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6IENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURlbGV0ZWRSZXNwb25zZShcbiAgICByZXNwb25zZTpEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICBzcGVjOiByZXNwb25zZS5ib2R5LnNwZWNcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluQ3JlZGVudGlhbHNRdWVyeSk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL2NyZWRlbnRpYWxzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChyZXMgYXMgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpbkNyZWRlbnRpYWxzXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmcsXG4gICAgZGF0YTogVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzLyR7Y3JlZGVudGlhbHNMb2dpbn1gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRGVsZXRlZFJlc3BvbnNlKHJlcykpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgeyBBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BcGlSZXNwb25zZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIElEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQsXG4gIElEb21haW5UYWdzQ2xpZW50XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBSZXNvbHV0aW9uIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHtcbiAgRG9tYWluVGFnc0l0ZW0sXG4gIERvbWFpblRhZ3NJdGVtSW5mbyxcbiAgRG9tYWluVGFnU3RhdGlzdGljSXRlbSxcbiAgRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlLFxuICBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSxcbiAgRG9tYWluVGFnc0xpc3QsXG4gIERvbWFpblRhZ3NSZXNwb25zZURhdGEsXG4gIERvbWFpblRhZ3NRdWVyeSxcbiAgRG9tYWluVGFnc01lc3NhZ2VSZXMsXG4gIERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSxcbiAgRG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ0NvdW50cmllc0FQSVJlc3BvbnNlLFxuICBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluVGFnIGltcGxlbWVudHMgRG9tYWluVGFnc0l0ZW0ge1xuICB0YWc6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgJ2ZpcnN0LXNlZW4nOiBEYXRlO1xuICAnbGFzdC1zZWVuJzogRGF0ZTtcblxuICBjb25zdHJ1Y3Rvcih0YWdJbmZvOiBEb21haW5UYWdzSXRlbUluZm8pIHtcbiAgICB0aGlzLnRhZyA9IHRhZ0luZm8udGFnO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YWdJbmZvLmRlc2NyaXB0aW9uO1xuICAgIHRoaXNbJ2ZpcnN0LXNlZW4nXSA9IG5ldyBEYXRlKHRhZ0luZm9bJ2ZpcnN0LXNlZW4nXSk7XG4gICAgdGhpc1snbGFzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydsYXN0LXNlZW4nXSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZ1N0YXRpc3RpYyBpbXBsZW1lbnRzIElEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQge1xuICB0YWc6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgc3RhcnQ6IERhdGU7XG4gIGVuZDogRGF0ZTtcbiAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgc3RhdHM6IERvbWFpblRhZ1N0YXRpc3RpY0l0ZW1bXTtcblxuICBjb25zdHJ1Y3Rvcih0YWdTdGF0aXN0aWNJbmZvOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2UpIHtcbiAgICB0aGlzLnRhZyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS50YWc7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXJ0KTtcbiAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5lbmQpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5yZXNvbHV0aW9uO1xuICAgIHRoaXMuc3RhdHMgPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0OiBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSkge1xuICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0LCB0aW1lOiBuZXcgRGF0ZShzdGF0LnRpbWUpIH07XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpblRhZ3NDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPERvbWFpblRhZ3NMaXN0PlxuICBpbXBsZW1lbnRzIElEb21haW5UYWdzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzLyc7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBEb21haW5UYWdzUmVzcG9uc2VEYXRhLFxuICApOiBEb21haW5UYWdzTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIERvbWFpblRhZ3NMaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgodGFnSW5mbzogRG9tYWluVGFnc0l0ZW1JbmZvKSA9PiBuZXcgRG9tYWluVGFnKHRhZ0luZm8pKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICd0YWcnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVGFnU3RhdGlzdGljKFxuICAgIHJlc3BvbnNlOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2VcbiAgKTogSURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdCB7XG4gICAgcmV0dXJuIG5ldyBEb21haW5UYWdTdGF0aXN0aWMocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5UYWdzUXVlcnkpOiBQcm9taXNlPERvbWFpblRhZ3NMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnKSwgcXVlcnkpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnc0l0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UYWcocmVzLmJvZHkpXG4gICAgICApO1xuICB9XG5cbiAgdXBkYXRlKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZyksIGRlc2NyaXB0aW9uKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdzTWVzc2FnZVJlc1xuICAgICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGFnOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS90YWdzLyR7dGFnfWApXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gKFxuICAgICAgICB7XG4gICAgICAgICAgbWVzc2FnZTogcmVzLmJvZHkubWVzc2FnZSxcbiAgICAgICAgICBzdGF0dXM6IHJlcy5zdGF0dXNcbiAgICAgICAgfSBhcyBEb21haW5UYWdzTWVzc2FnZVJlcykpO1xuICB9XG5cbiAgc3RhdGlzdGljKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZywgcXVlcnk6IERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSlcbiAgICA6IFByb21pc2U8RG9tYWluVGFnU3RhdGlzdGljPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VUYWdTdGF0aXN0aWMocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGNvdW50cmllcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL2NvdW50cmllcycpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IERvbWFpblRhZ0NvdW50cmllc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvblxuICAgICAgKTtcbiAgfVxuXG4gIHByb3ZpZGVycyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL3Byb3ZpZGVycycpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IERvbWFpblRhZ1Byb3ZpZGVyc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvblxuICAgICAgKTtcbiAgfVxuXG4gIGRldmljZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvZGV2aWNlcycpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IERvbWFpblRhZ0RldmljZXNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIENyZWF0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UsXG4gIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlLFxuICBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQsXG4gIERvbWFpblRlbXBsYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVzUXVlcnksXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YSxcbiAgR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0LFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UsXG4gIE5vdGlmaWNhdGlvblJlc3VsdCxcbiAgU2hvcnRUZW1wbGF0ZVZlcnNpb24sXG4gIFRlbXBsYXRlUXVlcnksXG4gIFRlbXBsYXRlVmVyc2lvbixcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgSURvbWFpblRlbXBsYXRlLCBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcblxuZXhwb3J0IGNsYXNzIERvbWFpblRlbXBsYXRlSXRlbSBpbXBsZW1lbnRzIElEb21haW5UZW1wbGF0ZSB7XG4gIG5hbWUgOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uIDogc3RyaW5nO1xuICBjcmVhdGVkQXQgOiBEYXRlIHwgJyc7XG4gIGNyZWF0ZWRCeSA6IHN0cmluZztcbiAgaWQgOiBzdHJpbmc7XG4gIHZlcnNpb24/OiBUZW1wbGF0ZVZlcnNpb247XG4gIHZlcnNpb25zPzogU2hvcnRUZW1wbGF0ZVZlcnNpb25bXTtcblxuICBjb25zdHJ1Y3Rvcihkb21haW5UZW1wbGF0ZUZyb21BUEk6IElEb21haW5UZW1wbGF0ZSkge1xuICAgIHRoaXMubmFtZSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5uYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuZGVzY3JpcHRpb247XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0ID8gbmV3IERhdGUoZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRBdCkgOiAnJztcbiAgICB0aGlzLmNyZWF0ZWRCeSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQnk7XG4gICAgdGhpcy5pZCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5pZDtcblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbikge1xuICAgICAgdGhpcy52ZXJzaW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb247XG4gICAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24uY3JlYXRlZEF0KSB7XG4gICAgICAgIHRoaXMudmVyc2lvbi5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMgJiYgZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy52ZXJzaW9ucyA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5tYXAoKHZlcnNpb24pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyAuLi52ZXJzaW9uIH07XG4gICAgICAgIHJlc3VsdC5jcmVhdGVkQXQgPSBuZXcgRGF0ZSh2ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluVGVtcGxhdGVzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0PlxuICBpbXBsZW1lbnRzIElEb21haW5UZW1wbGF0ZXNDbGllbnQge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvJztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VDcmVhdGlvblJlc3BvbnNlKGRhdGE6IENyZWF0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpOiBJRG9tYWluVGVtcGxhdGUge1xuICAgIHJldHVybiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGRhdGEuYm9keS50ZW1wbGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UoXG4gICAgZGF0YTogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2VcbiAgKTogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHt9IGFzIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlID0gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkYXRhLmJvZHkudGVtcGxhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU11dGF0aW9uUmVzcG9uc2UoXG4gICAgZGF0YTogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlXG4gICk6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCA9IHt9IGFzIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZU5hbWUgPSBkYXRhLmJvZHkudGVtcGxhdGUubmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VOb3RpZmljYXRpb25SZXNwb25zZShkYXRhOiBOb3RpZmljYXRpb25BUElSZXNwb25zZSk6IE5vdGlmaWNhdGlvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBOb3RpZmljYXRpb25SZXN1bHQgPSB7fSBhcyBOb3RpZmljYXRpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShcbiAgICBkYXRhOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZVxuICApOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge30gYXMgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZU5hbWUgPSBkYXRhLmJvZHkudGVtcGxhdGUubmFtZTtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZVZlcnNpb24gPSB7IHRhZzogZGF0YS5ib2R5LnRlbXBsYXRlLnZlcnNpb24udGFnIH07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KHJlc3BvbnNlOiBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UpOiBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgoZDogSURvbWFpblRlbXBsYXRlKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGQpKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhcbiAgICByZXNwb25zZTogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZVxuICApOiBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0O1xuXG4gICAgZGF0YS50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzcG9uc2UuYm9keS50ZW1wbGF0ZSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncCcpO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5KTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBxdWVyeSk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nLCBxdWVyeT86IFRlbXBsYXRlUXVlcnkpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXMuYm9keS50ZW1wbGF0ZSlcbiAgICAgICk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVEYXRhXG4gICk6IFByb21pc2U8SURvbWFpblRlbXBsYXRlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IENyZWF0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VDcmVhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgdXBkYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YVxuICApOiBQcm9taXNlPFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSkpXG4gICAgICAudGhlbigocmVzOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgZGVzdHJveUFsbChkb21haW46IHN0cmluZyk6IFByb21pc2U8Tm90aWZpY2F0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpKVxuICAgICAgLnRoZW4oKHJlczogTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VOb3RpZmljYXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGNyZWF0ZVZlcnNpb24oXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YVxuICApOiBQcm9taXNlPENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucycpLCBkYXRhKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGdldFZlcnNpb24oZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8SURvbWFpblRlbXBsYXRlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlcy5ib2R5LnRlbXBsYXRlKVxuICAgICAgKTtcbiAgfVxuXG4gIHVwZGF0ZVZlcnNpb24oXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgdGFnOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YVxuICApOiBQcm9taXNlPE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZyksIGRhdGEpXG4gICAgICAudGhlbihcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAgICAgKHJlczogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpXG4gICAgICApO1xuICB9XG5cbiAgZGVzdHJveVZlcnNpb24oXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgdGFnOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpKVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAgIC50aGVuKChyZXM6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBsaXN0VmVyc2lvbnMoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBEb21haW5UZW1wbGF0ZXNRdWVyeVxuICApOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMocmVzKVxuICAgICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQge1xuICBFdmVudHNMaXN0LFxuICBFdmVudHNRdWVyeSxcbiAgRXZlbnRzUmVzcG9uc2UsXG59IGZyb20gJy4uL1R5cGVzL0V2ZW50cyc7XG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSUV2ZW50Q2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50Q2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxFdmVudHNMaXN0PlxuICBpbXBsZW1lbnRzIElFdmVudENsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBFdmVudHNSZXNwb25zZSxcbiAgKTogRXZlbnRzTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIEV2ZW50c0xpc3Q7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJy8nKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGdldChkb21haW46IHN0cmluZywgcXVlcnk/OiBFdmVudHNRdWVyeSkgOiBQcm9taXNlPEV2ZW50c0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKCcvdjMnLCBkb21haW4sICdldmVudHMnKSwgcXVlcnkpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBJcFBvb2xDcmVhdGVEYXRhLFxuICBJcFBvb2xDcmVhdGVSZXNwb25zZSxcbiAgSXBQb29sQ3JlYXRlUmVzdWx0LFxuICBJcFBvb2xEZWxldGVEYXRhLFxuICBJcFBvb2xMaXN0UmVzcG9uc2UsXG4gIElwUG9vbExpc3RSZXN1bHQsXG4gIElwUG9vbE1lc3NhZ2VSZXNwb25zZSxcbiAgSXBQb29sTWVzc2FnZVJlc3VsdCxcbiAgSXBQb29sVXBkYXRlRGF0YSxcbn0gZnJvbSAnLi4vVHlwZXMvSVBQb29scyc7XG5pbXBvcnQgeyBJSVBQb29sc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcFBvb2xzQ2xpZW50IGltcGxlbWVudHMgSUlQUG9vbHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdCgpOiBQcm9taXNlPElwUG9vbExpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YxL2lwX3Bvb2xzJylcbiAgICAgIC50aGVuKChyZXNwb25zZTogSXBQb29sTGlzdFJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlSXBQb29sc1Jlc3BvbnNlKHJlc3BvbnNlKSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoZGF0YTogSXBQb29sQ3JlYXRlRGF0YSk6IFByb21pc2U8SXBQb29sQ3JlYXRlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IElwUG9vbENyZWF0ZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92MS9pcF9wb29scycsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xVcGRhdGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IElwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wYXRjaFdpdGhGRChgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xEZWxldGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6SXBQb29sTWVzc2FnZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZTogSXBQb29sTGlzdFJlc3BvbnNlKTogSXBQb29sTGlzdFJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCBNZ1JlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJcERhdGEsIElQc0xpc3RRdWVyeSwgSXBzTGlzdFJlc3BvbnNlQm9keSB9IGZyb20gJy4uL1R5cGVzL0lQcyc7XG5pbXBvcnQgeyBJSVBzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElwc0NsaWVudCBpbXBsZW1lbnRzIElJUHNDbGllbnQge1xuICByZXF1ZXN0OiBNZ1JlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogTWdSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk/OiBJUHNMaXN0UXVlcnkpOiBQcm9taXNlPElwc0xpc3RSZXNwb25zZUJvZHk+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92My9pcHMnLCBxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VJcHNSZXNwb25zZTxJcHNMaXN0UmVzcG9uc2VCb2R5PihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBnZXQoaXA6IHN0cmluZyk6IFByb21pc2U8SXBEYXRhPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvaXBzLyR7aXB9YCk7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VJcHNSZXNwb25zZTxJcERhdGE+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJcHNSZXNwb25zZTxUPihyZXNwb25zZTogeyBib2R5OiBUIH0pOiBUIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IE1haWxndW5DbGllbnRPcHRpb25zLCBJbnB1dEZvcm1EYXRhLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4uL1R5cGVzJztcblxuaW1wb3J0IERvbWFpbnNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNDbGllbnQnO1xuaW1wb3J0IEV2ZW50Q2xpZW50IGZyb20gJy4vRXZlbnRzJztcbmltcG9ydCBTdGF0c0NsaWVudCBmcm9tICcuL1N0YXRzL1N0YXRzQ2xpZW50JztcbmltcG9ydCBTdXBwcmVzc2lvbkNsaWVudCBmcm9tICcuL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbnNDbGllbnQnO1xuaW1wb3J0IFdlYmhvb2tzQ2xpZW50IGZyb20gJy4vV2ViaG9va3MnO1xuaW1wb3J0IE1lc3NhZ2VzQ2xpZW50IGZyb20gJy4vTWVzc2FnZXMnO1xuaW1wb3J0IFJvdXRlc0NsaWVudCBmcm9tICcuL1JvdXRlcyc7XG5pbXBvcnQgVmFsaWRhdGVDbGllbnQgZnJvbSAnLi9WYWxpZGF0aW9ucy92YWxpZGF0ZSc7XG5pbXBvcnQgSXBzQ2xpZW50IGZyb20gJy4vSVBzJztcbmltcG9ydCBJcFBvb2xzQ2xpZW50IGZyb20gJy4vSVBQb29scyc7XG5pbXBvcnQgTWFpbGluZ0xpc3RzQ2xpZW50IGZyb20gJy4vTWFpbGluZ0xpc3RzL21haWxpbmdMaXN0cyc7XG5pbXBvcnQgTWFpbExpc3RzTWVtYmVycyBmcm9tICcuL01haWxpbmdMaXN0cy9tYWlsTGlzdE1lbWJlcnMnO1xuaW1wb3J0IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zQ3JlZGVudGlhbHMnO1xuaW1wb3J0IE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCBmcm9tICcuL1ZhbGlkYXRpb25zL211bHRpcGxlVmFsaWRhdGlvbic7XG5pbXBvcnQgRG9tYWluVGVtcGxhdGVzQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zVGVtcGxhdGVzJztcbmltcG9ydCBEb21haW5UYWdzQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zVGFncyc7XG5pbXBvcnQgU3ViYWNjb3VudHNDbGllbnQgZnJvbSAnLi9TdWJhY2NvdW50cyc7XG5cbmltcG9ydCB7XG4gIElEb21haW5zQ2xpZW50LFxuICBJV2ViSG9va3NDbGllbnQsXG4gIElNYWlsZ3VuQ2xpZW50LFxuICBJTWFpbGluZ0xpc3RzQ2xpZW50LFxuICBJRXZlbnRDbGllbnQsXG4gIElTdGF0c0NsaWVudCxcbiAgSVN1cHByZXNzaW9uQ2xpZW50LFxuICBJTWVzc2FnZXNDbGllbnQsXG4gIElSb3V0ZXNDbGllbnQsXG4gIElWYWxpZGF0aW9uQ2xpZW50LFxuICBJSVBzQ2xpZW50LFxuICBJSVBQb29sc0NsaWVudCxcbiAgSVN1YmFjY291bnRzQ2xpZW50LFxufSBmcm9tICcuLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbGd1bkNsaWVudCBpbXBsZW1lbnRzIElNYWlsZ3VuQ2xpZW50IHtcbiAgcHJpdmF0ZSByZXF1ZXN0O1xuXG4gIHB1YmxpYyBkb21haW5zOiBJRG9tYWluc0NsaWVudDtcbiAgcHVibGljIHdlYmhvb2tzOiBJV2ViSG9va3NDbGllbnQ7XG4gIHB1YmxpYyBldmVudHM6IElFdmVudENsaWVudDtcbiAgcHVibGljIHN0YXRzOiBJU3RhdHNDbGllbnQ7XG4gIHB1YmxpYyBzdXBwcmVzc2lvbnM6IElTdXBwcmVzc2lvbkNsaWVudDtcbiAgcHVibGljIG1lc3NhZ2VzOiBJTWVzc2FnZXNDbGllbnQ7XG4gIHB1YmxpYyByb3V0ZXM6IElSb3V0ZXNDbGllbnQ7XG4gIHB1YmxpYyB2YWxpZGF0ZTogSVZhbGlkYXRpb25DbGllbnQ7XG4gIHB1YmxpYyBpcHM6IElJUHNDbGllbnQ7XG4gIHB1YmxpYyBpcF9wb29sczogSUlQUG9vbHNDbGllbnQ7XG4gIHB1YmxpYyBsaXN0czogSU1haWxpbmdMaXN0c0NsaWVudDtcbiAgcHVibGljIHN1YmFjY291bnRzOiBJU3ViYWNjb3VudHNDbGllbnQ7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTWFpbGd1bkNsaWVudE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgY29uc3QgY29uZmlnOiBSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub3B0aW9ucyB9IGFzIFJlcXVlc3RPcHRpb25zO1xuXG4gICAgaWYgKCFjb25maWcudXJsKSB7XG4gICAgICBjb25maWcudXJsID0gJ2h0dHBzOi8vYXBpLm1haWxndW4ubmV0JztcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy51c2VybmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJ1c2VybmFtZVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcua2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcImtleVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHRoaXMucmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGNvbmZpZywgZm9ybURhdGEpO1xuICAgIGNvbnN0IG1haWxMaXN0c01lbWJlcnMgPSBuZXcgTWFpbExpc3RzTWVtYmVycyh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50ID0gbmV3IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluVGVtcGxhdGVzQ2xpZW50ID0gbmV3IERvbWFpblRlbXBsYXRlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpblRhZ3NDbGllbnQgPSBuZXcgRG9tYWluVGFnc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCA9IG5ldyBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcblxuICAgIHRoaXMuZG9tYWlucyA9IG5ldyBEb21haW5zQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0LFxuICAgICAgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgICBkb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgICBkb21haW5UYWdzQ2xpZW50XG4gICAgKTtcbiAgICB0aGlzLndlYmhvb2tzID0gbmV3IFdlYmhvb2tzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5zdXBwcmVzc2lvbnMgPSBuZXcgU3VwcHJlc3Npb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLm1lc3NhZ2VzID0gbmV3IE1lc3NhZ2VzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5yb3V0ZXMgPSBuZXcgUm91dGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pcHMgPSBuZXcgSXBzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pcF9wb29scyA9IG5ldyBJcFBvb2xzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5saXN0cyA9IG5ldyBNYWlsaW5nTGlzdHNDbGllbnQodGhpcy5yZXF1ZXN0LCBtYWlsTGlzdHNNZW1iZXJzKTtcbiAgICB0aGlzLnZhbGlkYXRlID0gbmV3IFZhbGlkYXRlQ2xpZW50KHRoaXMucmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KTtcbiAgICB0aGlzLnN1YmFjY291bnRzID0gbmV3IFN1YmFjY291bnRzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gIH1cblxuICBzZXRTdWJhY2NvdW50KHN1YmFjY291bnRJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0Py5zZXRTdWJhY2NvdW50SGVhZGVyKHN1YmFjY291bnRJZCk7XG4gIH1cblxuICByZXNldFN1YmFjY291bnQoKTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0Py5yZXNldFN1YmFjY291bnRIZWFkZXIoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgTWFpbExpc3RNZW1iZXJzUXVlcnksXG4gIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyxcbiAgTWFpbExpc3RNZW1iZXIsXG4gIE11bHRpcGxlTWVtYmVyc0RhdGEsXG4gIE11bHRpcGxlTWVtYmVyc1JlcURhdGEsXG4gIERlbGV0ZWRNZW1iZXIsXG4gIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1JlcSxcbiAgTmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2UsXG4gIE1haWxMaXN0TWVtYmVyc1Jlc3VsdCxcbiAgTWFpbExpc3RNZW1iZXJzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvTWFpbGluZ0xpc3RzJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IElNYWlsTGlzdHNNZW1iZXJzIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsTGlzdHNNZW1iZXJzXG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxNYWlsTGlzdE1lbWJlcnNSZXN1bHQ+XG4gIGltcGxlbWVudHMgSU1haWxMaXN0c01lbWJlcnMge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0FuZFVwZGF0ZURhdGEoZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzKSB7XG4gICAgY29uc3QgbmV3RGF0YSA9IHsgLi4uZGF0YSB9O1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhLnZhcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBuZXdEYXRhLnZhcnMgPSBKU09OLnN0cmluZ2lmeShuZXdEYXRhLnZhcnMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YS5zdWJzY3JpYmVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIG5ld0RhdGEuc3Vic2NyaWJlZCA9IGRhdGEuc3Vic2NyaWJlZCA/ICd5ZXMnIDogJ25vJztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RGF0YSBhcyBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXE7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBNYWlsTGlzdE1lbWJlcnNSZXNwb25zZSxcbiAgKTogTWFpbExpc3RNZW1iZXJzUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTWFpbExpc3RNZW1iZXJzUmVzdWx0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3RNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIHF1ZXJ5PzogTWFpbExpc3RNZW1iZXJzUXVlcnlcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcnNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyhgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvcGFnZXNgLCBxdWVyeSk7XG4gIH1cblxuICBnZXRNZW1iZXIobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBjcmVhdGVNZW1iZXIoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzXG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICBjb25zdCByZXFEYXRhID0gdGhpcy5jaGVja0FuZFVwZGF0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVyc2AsIHJlcURhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGNyZWF0ZU1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVNZW1iZXJzRGF0YVxuICApOiBQcm9taXNlPE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgbmV3RGF0YTogTXVsdGlwbGVNZW1iZXJzUmVxRGF0YSA9IHtcbiAgICAgIG1lbWJlcnM6IEFycmF5LmlzQXJyYXkoZGF0YS5tZW1iZXJzKSA/IEpTT04uc3RyaW5naWZ5KGRhdGEubWVtYmVycykgOiBkYXRhLm1lbWJlcnMsXG4gICAgICB1cHNlcnQ6IGRhdGEudXBzZXJ0XG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMuanNvbmAsIG5ld0RhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgTmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2UpO1xuICB9XG5cbiAgdXBkYXRlTWVtYmVyKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1xuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgY29uc3QgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gLCByZXFEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBkZXN0cm95TWVtYmVyKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZykgOiBQcm9taXNlPERlbGV0ZWRNZW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBEZWxldGVkTWVtYmVyKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgTGlzdHNRdWVyeSxcbiAgQ3JlYXRlVXBkYXRlTGlzdCxcbiAgRGVzdHJveWVkTGlzdCxcbiAgTWFpbGluZ0xpc3QsXG4gIE1haWxpbmdMaXN0VmFsaWRhdGlvbkFwaVJlc3BvbnNlLFxuICBTdGFydFZhbGlkYXRpb25SZXN1bHQsXG4gIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdCxcbiAgTWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0LFxuICBNYWlsaW5nTGlzdFJlc3VsdCxcbiAgTWFpbGluZ0xpc3RBcGlSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9NYWlsaW5nTGlzdHMnO1xuaW1wb3J0IHsgSU1haWxMaXN0c01lbWJlcnMgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cy9NYWlsaW5nTGlzdE1lbWJlcnMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgSU1haWxpbmdMaXN0c0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsaW5nTGlzdHNDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPE1haWxpbmdMaXN0UmVzdWx0PlxuICBpbXBsZW1lbnRzIElNYWlsaW5nTGlzdHNDbGllbnQge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHVibGljIG1lbWJlcnM6IElNYWlsTGlzdHNNZW1iZXJzO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIG1lbWJlcnM6IElNYWlsTGlzdHNNZW1iZXJzKSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgIHRoaXMubWVtYmVycyA9IG1lbWJlcnM7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlVmFsaWRhdGlvblJlc3VsdChcbiAgICBzdGF0dXM6IG51bWJlcixcbiAgICBkYXRhOiBNYWlsaW5nTGlzdFZhbGlkYXRpb25BcGlSZXNwb25zZVxuICApOiBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICB2YWxpZGF0aW9uUmVzdWx0OiB7XG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCAqIDEwMDApIC8vIGFkZCBtaWxsaXNlY29uZCB0byBVbml4IHRpbWVzdGFtcFxuICAgICAgfVxuICAgIH0gYXMgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogTWFpbGluZ0xpc3RBcGlSZXNwb25zZSk6IE1haWxpbmdMaXN0UmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTWFpbGluZ0xpc3RSZXN1bHQ7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk/OiBMaXN0c1F1ZXJ5KTogUHJvbWlzZTxNYWlsaW5nTGlzdFJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKGAke3RoaXMuYmFzZVJvdXRlfS9wYWdlc2AsIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh0aGlzLmJhc2VSb3V0ZSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIHVwZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGRlc3Ryb3kobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3llZExpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBEZXN0cm95ZWRMaXN0KTtcbiAgfVxuXG4gIHZhbGlkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxTdGFydFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWAsIHt9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgICAgfSkgYXMgU3RhcnRWYWxpZGF0aW9uUmVzdWx0KTtcbiAgfVxuXG4gIHZhbGlkYXRpb25SZXN1bHQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXNwb25zZSkgPT4gdGhpcy5wYXJzZVZhbGlkYXRpb25SZXN1bHQoXG4gICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICByZXNwb25zZS5ib2R5IGFzIE1haWxpbmdMaXN0VmFsaWRhdGlvbkFwaVJlc3BvbnNlXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBjYW5jZWxWYWxpZGF0aW9uKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gKHtcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgICAgfSBhcyBNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQpKTtcbiAgfVxufVxuIiwiaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vY29tbW9uL0Vycm9yJztcbmltcG9ydCB7XG4gIE1haWxndW5NZXNzYWdlRGF0YSxcbiAgTWVzc2FnZXNTZW5kQVBJUmVzcG9uc2UsXG4gIE1lc3NhZ2VzU2VuZFJlc3VsdFxufSBmcm9tICcuLi9UeXBlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElNZXNzYWdlc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlc0NsaWVudCBpbXBsZW1lbnRzIElNZXNzYWdlc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVCb29sZWFuVmFsdWVzKGRhdGE6IE1haWxndW5NZXNzYWdlRGF0YSk6IE1haWxndW5NZXNzYWdlRGF0YSB7XG4gICAgY29uc3QgeWVzTm9Qcm9wZXJ0aWVzID0gbmV3IFNldChbXG4gICAgICAnbzp0ZXN0bW9kZScsXG4gICAgICAndDp0ZXh0JyxcbiAgICAgICdvOmRraW0nLFxuICAgICAgJ286dHJhY2tpbmcnLFxuICAgICAgJ286dHJhY2tpbmctY2xpY2tzJyxcbiAgICAgICdvOnRyYWNraW5nLW9wZW5zJyxcbiAgICAgICdvOnJlcXVpcmUtdGxzJyxcbiAgICAgICdvOnNraXAtdmVyaWZpY2F0aW9uJ1xuICAgIF0pO1xuXG4gICAgaWYgKCFkYXRhIHx8IE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignTWVzc2FnZSBkYXRhIG9iamVjdCBjYW4gbm90IGJlIGVtcHR5JywgJ01lc3NhZ2UgZGF0YSBvYmplY3QgY2FuIG5vdCBiZSBlbXB0eScpO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgaWYgKHllc05vUHJvcGVydGllcy5oYXMoa2V5KSAmJiB0eXBlb2YgZGF0YVtrZXldID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgYWNjW2tleV0gPSBkYXRhW2tleV0gPyAneWVzJyA6ICdubyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY2Nba2V5XSA9IGRhdGFba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgTWFpbGd1bk1lc3NhZ2VEYXRhKTtcbiAgfVxuXG4gIF9wYXJzZVJlc3BvbnNlKHJlc3BvbnNlOiBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSk6IE1lc3NhZ2VzU2VuZFJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cblxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IE1haWxndW5NZXNzYWdlRGF0YSk6IFByb21pc2U8TWVzc2FnZXNTZW5kUmVzdWx0PiB7XG4gICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzLm1pbWVgLCBkYXRhKVxuICAgICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2RpZmllZERhdGEgPSB0aGlzLnByZXBhcmVCb29sZWFuVmFsdWVzKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3YzLyR7ZG9tYWlufS9tZXNzYWdlc2AsIG1vZGlmaWVkRGF0YSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlUmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJUm91dGVzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBDcmVhdGVVcGRhdGVSb3V0ZURhdGEsIERlc3Ryb3lSb3V0ZVJlc3BvbnNlLCBSb3V0ZSwgUm91dGVzTGlzdFF1ZXJ5LCBVcGRhdGVSb3V0ZVJlc3BvbnNlXG59IGZyb20gJy4uL1R5cGVzL1JvdXRlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVzQ2xpZW50IGltcGxlbWVudHMgSVJvdXRlc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KHF1ZXJ5OiBSb3V0ZXNMaXN0UXVlcnkpOiBQcm9taXNlPFJvdXRlW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3JvdXRlcycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lml0ZW1zKTtcbiAgfVxuXG4gIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxSb3V0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5yb3V0ZSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxSb3V0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YzL3JvdXRlcycsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8VXBkYXRlUm91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAvdjMvcm91dGVzLyR7aWR9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cblxuICBkZXN0cm95KGlkOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3lSb3V0ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92My9yb3V0ZXMvJHtpZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgU3RhdHNRdWVyeSwgU3RhdHNPcHRpb25zIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3RhdHMnO1xuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvQ29tbW9uJztcbmltcG9ydCBTdGF0c0NvbnRhaW5lciBmcm9tICcuL1N0YXRzQ29udGFpbmVyJztcbmltcG9ydCB7IElTdGF0c0NsaWVudCwgSVN0YXRzQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdGF0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQ2xpZW50IGltcGxlbWVudHMgSVN0YXRzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHJpdmF0ZSBsb2dnZXI6IElMb2dnZXI7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbG9nZ2VyOiBJTG9nZ2VyID0gY29uc29sZSkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnREYXRlVG9VVEMoa2V5OnN0cmluZywgaW5wdXREYXRlOiBEYXRlKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgLypcbiAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICBhbmQgYmVjYXVzZSBmb3IgQVBJLCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGRhdGUgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdFxuICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICovXG4gICAgdGhpcy5sb2dnZXIud2FybihgRGF0ZTpcIiR7aW5wdXREYXRlfVwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxuVmFsdWUgXCIke2lucHV0RGF0ZS50b1VUQ1N0cmluZygpfVwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cbkNvbnNpZGVyIHVzaW5nIHN0aW5nIHR5cGUgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nYCk7XG4gICAgcmV0dXJuIFtrZXksIGlucHV0RGF0ZS50b1VUQ1N0cmluZygpXTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeTogU3RhdHNRdWVyeSB8IHVuZGVmaW5lZCk6IEFycmF5PEFycmF5PHN0cmluZz4+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gW10gYXMgQXJyYXk8QXJyYXk8c3RyaW5nPj47XG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gT2JqZWN0LmVudHJpZXMocXVlcnkpLnJlZHVjZSgoYXJyYXlXaXRoUGFpcnMsIGN1cnJlbnRQYWlyKSA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGN1cnJlbnRQYWlyO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGgpIHsgLy8gZXZlbnQ6IFsnZGVsaXZlcmVkJywgJ2FjY2VwdGVkJ11cbiAgICAgICAgICBjb25zdCByZXBlYXRlZFByb3BlcnR5ID0gdmFsdWUubWFwKChpdGVtKSA9PiBba2V5LCBpdGVtXSk7XG4gICAgICAgICAgcmV0dXJuIFsuLi5hcnJheVdpdGhQYWlycywgLi4ucmVwZWF0ZWRQcm9wZXJ0eV07IC8vIFtbZXZlbnQsZGVsaXZlcmVkXSwgW2V2ZW50LGFjY2VwdGVkXV1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKHRoaXMuY29udmVydERhdGVUb1VUQyhrZXksIHZhbHVlKSk7XG4gICAgICAgICAgcmV0dXJuIGFycmF5V2l0aFBhaXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJyYXlXaXRoUGFpcnM7XG4gICAgICB9LCBbXSBhcyBBcnJheTxBcnJheTxzdHJpbmc+Pik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlYXJjaFBhcmFtcztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VTdGF0cyhyZXNwb25zZTogeyBib2R5OiBTdGF0c09wdGlvbnMgfSk6IElTdGF0c0NvbnRhaW5lciB7XG4gICAgcmV0dXJuIG5ldyBTdGF0c0NvbnRhaW5lcihyZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGdldERvbWFpbihkb21haW46IHN0cmluZywgcXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxJU3RhdHNDb250YWluZXI+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ3N0YXRzL3RvdGFsJyksIHNlYXJjaFBhcmFtcylcbiAgICAgIC50aGVuKHRoaXMucGFyc2VTdGF0cyk7XG4gIH1cblxuICBnZXRBY2NvdW50KHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8SVN0YXRzQ29udGFpbmVyPiB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3N0YXRzL3RvdGFsJywgc2VhcmNoUGFyYW1zKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZVN0YXRzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVN0YXRzQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdGF0cyc7XG5pbXBvcnQgeyBTdGF0LCBTdGF0c09wdGlvbnMgfSBmcm9tICcuLi8uLi9UeXBlcy9TdGF0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQ29udGFpbmVyIGltcGxlbWVudHMgSVN0YXRzQ29udGFpbmVyIHtcbiAgICBzdGFydDogRGF0ZTtcbiAgICBlbmQ6IERhdGU7XG4gICAgcmVzb2x1dGlvbjogc3RyaW5nO1xuICAgIHN0YXRzOiBTdGF0W107XG4gICAgY29uc3RydWN0b3IoZGF0YTogU3RhdHNPcHRpb25zKSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoZGF0YS5zdGFydCk7XG4gICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKGRhdGEuZW5kKTtcbiAgICAgIHRoaXMucmVzb2x1dGlvbiA9IGRhdGEucmVzb2x1dGlvbjtcbiAgICAgIHRoaXMuc3RhdHMgPSBkYXRhLnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdDogU3RhdCkge1xuICAgICAgICBjb25zdCByZXMgPSB7IC4uLnN0YXQgfTtcbiAgICAgICAgcmVzLnRpbWUgPSBuZXcgRGF0ZShzdGF0LnRpbWUpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJU3ViYWNjb3VudHNDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIFN1YmFjY291bnRMaXN0UmVzcG9uc2VEYXRhLFxuICBTdWJhY2NvdW50UmVzcG9uc2VEYXRhLFxuICBTdWJhY2NvdW50c1F1ZXJ5LFxufSBmcm9tICcuLi9UeXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YmFjY291bnRzQ2xpZW50IGltcGxlbWVudHMgSVN1YmFjY291bnRzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgc3RhdGljIFNVQkFDQ09VTlRfSEVBREVSID0gJ1gtTWFpbGd1bi1Pbi1CZWhhbGYtT2YnO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeT86IFN1YmFjY291bnRzUXVlcnkpOiBQcm9taXNlPFN1YmFjY291bnRMaXN0UmVzcG9uc2VEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92NS9hY2NvdW50cy9zdWJhY2NvdW50cycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG5cbiAgZ2V0KGlkOnN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMvJHtpZH1gKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG5cbiAgY3JlYXRlKG5hbWU6c3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMnLCB7IG5hbWUgfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5ib2R5KTtcbiAgfVxuXG4gIGVuYWJsZShpZDpzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoYC92NS9hY2NvdW50cy9zdWJhY2NvdW50cy8ke2lkfS9lbmFibGVgKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG5cbiAgZGlzYWJsZShpZDpzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoYC92NS9hY2NvdW50cy9zdWJhY2NvdW50cy8ke2lkfS9kaXNhYmxlYClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5ib2R5KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJQm91bmNlIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgQm91bmNlRGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvdW5jZSBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSUJvdW5jZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBCb3VuY2VEYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5CT1VOQ0VTKTtcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgIHRoaXMuY29kZSA9ICtkYXRhLmNvZGU7XG4gICAgICB0aGlzLmVycm9yID0gZGF0YS5lcnJvcjtcbiAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJQ29tcGxhaW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgQ29tcGxhaW50RGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBsYWludCBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSUNvbXBsYWludCB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG4gICAgY29uc3RydWN0b3IoZGF0YTogQ29tcGxhaW50RGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuQ09NUExBSU5UUyk7XG4gICAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBwcmVzc2lvbiB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKHR5cGU6IFN1cHByZXNzaW9uTW9kZWxzKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvcic7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgQm91bmNlIGZyb20gJy4vQm91bmNlJztcbmltcG9ydCBDb21wbGFpbnQgZnJvbSAnLi9Db21wbGFpbnQnO1xuaW1wb3J0IFVuc3Vic2NyaWJlIGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuaW1wb3J0IFdoaXRlTGlzdCBmcm9tICcuL1doaXRlTGlzdCc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5pbXBvcnQge1xuICBJQm91bmNlLFxuICBJQ29tcGxhaW50LFxuICBJU3VwcHJlc3Npb25DbGllbnQsXG4gIElVbnN1YnNjcmliZSxcbiAgSVdoaXRlTGlzdFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQge1xuICBTdXBwcmVzc2lvbkxpc3QsXG4gIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbkRhdGFUeXBlLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSxcbiAgU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCxcbiAgU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbkxpc3RRdWVyeSxcbiAgU3VwcHJlc3Npb25SZXNwb25zZSxcbiAgU3VwcHJlc3Npb25EZXN0cm95UmVzdWx0LFxuICBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuXG5jb25zdCBjcmVhdGVPcHRpb25zID0ge1xuICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwcHJlc3Npb25DbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPFN1cHByZXNzaW9uTGlzdD5cbiAgaW1wbGVtZW50cyBJU3VwcHJlc3Npb25DbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBtb2RlbHM6IG9iamVjdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLm1vZGVscyA9IHtcbiAgICAgIGJvdW5jZXM6IEJvdW5jZSxcbiAgICAgIGNvbXBsYWludHM6IENvbXBsYWludCxcbiAgICAgIHVuc3Vic2NyaWJlczogVW5zdWJzY3JpYmUsXG4gICAgICB3aGl0ZWxpc3RzOiBXaGl0ZUxpc3QsXG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YTogU3VwcHJlc3Npb25EYXRhVHlwZSk6XG4gICAgICBJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3RcbiAgICB9XG4gICk6IFN1cHByZXNzaW9uTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIFN1cHByZXNzaW9uTGlzdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcz8ubWFwKChpdGVtKSA9PiBuZXcgTW9kZWwoaXRlbSkpIHx8IFtdO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIF9wYXJzZUl0ZW08VCBleHRlbmRzIFN1cHByZXNzaW9uPihcbiAgICBkYXRhIDogU3VwcHJlc3Npb25EYXRhVHlwZSxcbiAgICBNb2RlbDoge1xuICAgICAgbmV3KGRhdGFUeXBlOiBTdXBwcmVzc2lvbkRhdGFUeXBlKTpUXG4gICAgfVxuICApOiBUIHtcbiAgICByZXR1cm4gbmV3IE1vZGVsKGRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVXaGl0ZUxpc3QoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgZGF0YTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgfCBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YVtdLFxuICAgIGlzRGF0YUFycmF5OiBib29sZWFuXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdD4ge1xuICAgIGlmIChpc0RhdGFBcnJheSkge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgJ0RhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCcsXG4gICAgICAgICdXaGl0ZWxpc3RcXCdzIGNyZWF0aW9uIHByb2Nlc3MgZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBjcmVhdGlvbnMuIERhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCdcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAnd2hpdGVsaXN0cycpLCBkYXRhIGFzIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhKVxuICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVVbnN1YnNjcmliZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW11cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHsgLy8gVXNlciBwcm92aWRlZCBhbiBhcnJheVxuICAgICAgY29uc3QgaXNDb250YWluc1RhZyA9IGRhdGEuc29tZSgodW5zdWJzY3JpYmU6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhKSA9PiB1bnN1YnNjcmliZS50YWcpO1xuICAgICAgaWYgKGlzQ29udGFpbnNUYWcpIHtcbiAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgICAnVGFnIHByb3BlcnR5IHNob3VsZCBub3QgYmUgdXNlZCBmb3IgY3JlYXRpbmcgbXVsdGlwbGUgdW5zdWJzY3JpYmVzLicsXG4gICAgICAgICAgJ1RhZyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCBvbmx5IGlmIG9uZSB1bnN1YnNjcmliZSBwcm92aWRlZCBhcyBzZWNvbmQgYXJndW1lbnQgb2YgY3JlYXRlIG1ldGhvZC4gUGxlYXNlIHVzZSB0YWdzIGluc3RlYWQuJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgICAucG9zdCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3Vuc3Vic2NyaWJlcycpLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgY3JlYXRlT3B0aW9ucylcbiAgICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICAgIH1cblxuICAgIGlmIChkYXRhPy50YWdzKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAnVGFncyBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHVzZWQgZm9yIGNyZWF0aW5nIG9uZSB1bnN1YnNjcmliZS4nLFxuICAgICAgICAnVGFncyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCBpZiB5b3UgcHJvdmlkZXMgYW4gYXJyYXkgb2YgdW5zdWJzY3JpYmVzIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kLiBQbGVhc2UgdXNlIHRhZyBpbnN0ZWFkJ1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS50YWcpKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAnVGFnIHByb3BlcnR5IGNhbiBub3QgYmUgYW4gYXJyYXknLFxuICAgICAgICAnUGxlYXNlIHVzZSBhcnJheSBvZiB1bnN1YnNjcmliZXMgYXMgc2Vjb25kIGFyZ3VtZW50IG9mIGNyZWF0ZSBtZXRob2QgdG8gYmUgYWJsZSB0byBwcm92aWRlIGZldyB0YWdzJ1xuICAgICAgKTtcbiAgICB9XG4gICAgLyogV2UgbmVlZCBGb3JtIERhdGEgZm9yIHVuc3Vic2NyaWJlcyBpZiB3ZSB3YW50IHRvIHN1cHBvcnQgdGhlIFwidGFnXCIgcHJvcGVydHkgKi9cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdFdpdGhGRCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3Vuc3Vic2NyaWJlcycpLCBkYXRhKVxuICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRNb2RlbCh0eXBlOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZSBpbiB0aGlzLm1vZGVscykge1xuICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW3R5cGUgYXMga2V5b2YgdHlwZW9mIHRoaXMubW9kZWxzXTtcbiAgICB9XG4gICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICdVbmtub3duIHR5cGUgdmFsdWUnLFxuICAgICAgJ1R5cGUgbWF5IGJlIG9ubHkgb25lIG9mIFtib3VuY2VzLCBjb21wbGFpbnRzLCB1bnN1YnNjcmliZXMsIHdoaXRlbGlzdHNdJ1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVSZXNwb25zZShyZXNwb25zZTogU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlKTogU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgIHR5cGU6IHJlc3BvbnNlLmJvZHkudHlwZSB8fCAnJyxcbiAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgbGlzdChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBTdXBwcmVzc2lvbkxpc3RRdWVyeVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uTGlzdD4ge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIHF1ZXJ5LCBtb2RlbCk7XG4gIH1cblxuICBnZXQoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdD4ge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAuZ2V0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBTdXBwcmVzc2lvblJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZUl0ZW08dHlwZW9mIG1vZGVsPihyZXNwb25zZS5ib2R5LCBtb2RlbCkpO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW11cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICAvLyBzdXBwb3J0cyBhZGRpbmcgbXVsdGlwbGUgc3VwcHJlc3Npb25zIGJ5IGRlZmF1bHRcbiAgICBsZXQgcG9zdERhdGE7XG4gICAgY29uc3QgaXNEYXRhQXJyYXkgPSBBcnJheS5pc0FycmF5KGRhdGEpO1xuXG4gICAgaWYgKHR5cGUgPT09ICd3aGl0ZWxpc3RzJykge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlV2hpdGVMaXN0KGRvbWFpbiwgZGF0YSwgaXNEYXRhQXJyYXkpO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAndW5zdWJzY3JpYmVzJykge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVW5zdWJzY3JpYmUoZG9tYWluLCBkYXRhKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzRGF0YUFycmF5KSB7XG4gICAgICBwb3N0RGF0YSA9IFtkYXRhXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zdERhdGEgPSBbLi4uZGF0YV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3QodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBKU09OLnN0cmluZ2lmeShwb3N0RGF0YSksIGNyZWF0ZU9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQ+IHtcbiAgICB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5kZWxldGUodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5ib2R5LmFkZHJlc3MgfHwgJycsXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICB9KSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdXBwcmVzc2lvbkNsaWVudDtcbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSVVuc3Vic2NyaWJlIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgVW5zdWJzY3JpYmVEYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcblxuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbnN1YnNjcmliZSBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSVVuc3Vic2NyaWJlIHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgdGFnczogc3RyaW5nW107XG4gICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFVuc3Vic2NyaWJlRGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuVU5TVUJTQ1JJQkVTKTtcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgIHRoaXMudGFncyA9IGRhdGEudGFncztcbiAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJV2hpdGVMaXN0IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgV2hpdGVMaXN0RGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdoaXRlTGlzdCBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSVdoaXRlTGlzdCB7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICByZWFzb246IHN0cmluZztcbiAgICBjcmVhdGVkQXQ6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBXaGl0ZUxpc3REYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5XSElURUxJU1RTKTtcbiAgICAgIHRoaXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgdGhpcy5yZWFzb24gPSBkYXRhLnJlYXNvbjtcbiAgICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHtcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0LFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JEYXRhLFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdCxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXNwb25zZSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhLFxuICBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkLFxuICBDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYlxufSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucy9NdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IEF0dGFjaG1lbnRzSGFuZGxlciBmcm9tICcuLi9jb21tb24vQXR0YWNobWVudHNIYW5kbGVyJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3InO1xuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uSm9iIGltcGxlbWVudHMgTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0IHtcbiAgY3JlYXRlZEF0OiBEYXRlO1xuICBpZDogc3RyaW5nO1xuICBxdWFudGl0eTogbnVtYmVyXG4gIHJlY29yZHNQcm9jZXNzZWQ6IG51bWJlciB8IG51bGw7XG4gIHN0YXR1czogc3RyaW5nO1xuICBkb3dubG9hZFVybD86IHtcbiAgICBjc3Y6IHN0cmluZztcbiAgICBqc29uOiBzdHJpbmc7XG4gIH07XG5cbiAgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXI7XG4gIHN1bW1hcnk/OiB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgICBjYXRjaEFsbDogbnVtYmVyO1xuICAgICAgICAgIGRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgZG9Ob3RTZW5kOiBudW1iZXI7XG4gICAgICAgICAgdW5kZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgIH07XG4gICAgICByaXNrOiB7XG4gICAgICAgICAgaGlnaDogbnVtYmVyO1xuICAgICAgICAgIGxvdzogbnVtYmVyO1xuICAgICAgICAgIG1lZGl1bTogbnVtYmVyO1xuICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkpvYkRhdGEsIHJlc3BvbnNlU3RhdHVzQ29kZTogbnVtYmVyKSB7XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgIHRoaXMucXVhbnRpdHkgPSBkYXRhLnF1YW50aXR5O1xuICAgIHRoaXMucmVjb3Jkc1Byb2Nlc3NlZCA9IGRhdGEucmVjb3Jkc19wcm9jZXNzZWQ7XG4gICAgdGhpcy5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICB0aGlzLnJlc3BvbnNlU3RhdHVzQ29kZSA9IHJlc3BvbnNlU3RhdHVzQ29kZTtcbiAgICBpZiAoZGF0YS5kb3dubG9hZF91cmwpIHtcbiAgICAgIHRoaXMuZG93bmxvYWRVcmwgPSB7XG4gICAgICAgIGNzdjogZGF0YS5kb3dubG9hZF91cmw/LmNzdixcbiAgICAgICAganNvbjogZGF0YS5kb3dubG9hZF91cmw/Lmpzb25cbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChkYXRhLnN1bW1hcnkpIHtcbiAgICAgIHRoaXMuc3VtbWFyeSA9IHtcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgY2F0Y2hBbGw6IGRhdGEuc3VtbWFyeS5yZXN1bHQuY2F0Y2hfYWxsLFxuICAgICAgICAgIGRlbGl2ZXJhYmxlOiBkYXRhLnN1bW1hcnkucmVzdWx0LmRlbGl2ZXJhYmxlLFxuICAgICAgICAgIGRvTm90U2VuZDogZGF0YS5zdW1tYXJ5LnJlc3VsdC5kb19ub3Rfc2VuZCxcbiAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBkYXRhLnN1bW1hcnkucmVzdWx0LnVuZGVsaXZlcmFibGUsXG4gICAgICAgICAgdW5rbm93bjogZGF0YS5zdW1tYXJ5LnJlc3VsdC51bmtub3duXG4gICAgICAgIH0sXG4gICAgICAgIHJpc2s6IHtcbiAgICAgICAgICBoaWdoOiBkYXRhLnN1bW1hcnkucmlzay5oaWdoLFxuICAgICAgICAgIGxvdzogZGF0YS5zdW1tYXJ5LnJpc2subG93LFxuICAgICAgICAgIG1lZGl1bTogZGF0YS5zdW1tYXJ5LnJpc2subWVkaXVtLFxuICAgICAgICAgIHVua25vd246IGRhdGEuc3VtbWFyeS5yaXNrLnVua25vd25cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdD5cbiAgaW1wbGVtZW50cyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHJpdmF0ZSBhdHRhY2htZW50c0hhbmRsZXI6IEF0dGFjaG1lbnRzSGFuZGxlcjtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyID0gbmV3IEF0dGFjaG1lbnRzSGFuZGxlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVSZXNwb25zZTxUPihyZXNwb25zZTogQVBJUmVzcG9uc2UpOiBUIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZT8uYm9keVxuICAgIH0gYXMgVDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QocmVzcG9uc2U6IE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzcG9uc2UpXG4gICAgOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0O1xuXG4gICAgZGF0YS5qb2JzID0gcmVzcG9uc2UuYm9keS5qb2JzLm1hcCgoam9iKSA9PiBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uSm9iKGpvYiwgcmVzcG9uc2Uuc3RhdHVzKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncGl2b3QnKTtcbiAgICBkYXRhLnRvdGFsID0gcmVzcG9uc2UuYm9keS50b3RhbDtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdChxdWVyeT86IE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnkpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoJy92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsnLCBxdWVyeSk7XG4gIH1cblxuICBhc3luYyBnZXQobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKTtcbiAgICByZXR1cm4gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkpvYihyZXNwb25zZS5ib2R5LCByZXNwb25zZS5zdGF0dXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0VG9FeHBlY3RlZFNoYXBlKGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YSlcbiAgICA6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVVwZGF0ZWQge1xuICAgIGxldCBtdWx0aXBsZVZhbGlkYXRpb25EYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkO1xuICAgIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihkYXRhLmZpbGUpKSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhLmZpbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiB7IGRhdGE6IGRhdGEuZmlsZSB9IH07XG4gICAgfSBlbHNlIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShkYXRhLmZpbGUpKSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHsgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZTogZGF0YS5maWxlIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG11bHRpcGxlVmFsaWRhdGlvbkRhdGE7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoXG4gICAgbGlzdElkOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGlmICghZGF0YSB8fCAhZGF0YS5maWxlKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdcImZpbGVcIiBwcm9wZXJ0eSBleHBlY3RlZC4nLCAnTWFrZSBzdXJlIHNlY29uZCBhcmd1bWVudCBoYXMgXCJmaWxlXCIgcHJvcGVydHkuJyk7XG4gICAgfVxuICAgIGNvbnN0IG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB0aGlzLmNvbnZlcnRUb0V4cGVjdGVkU2hhcGUoZGF0YSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gLCBtdWx0aXBsZVZhbGlkYXRpb25EYXRhKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBkZXN0cm95KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ocmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJVmFsaWRhdGlvbkNsaWVudCwgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgVmFsaWRhdGlvblF1ZXJ5LCBWYWxpZGF0aW9uUmVzdWx0LCBWYWxpZGF0aW9uUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRlQ2xpZW50IGltcGxlbWVudHMgSVZhbGlkYXRpb25DbGllbnQge1xuICBwdWJsaWMgbXVsdGlwbGVWYWxpZGF0aW9uO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDogSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5tdWx0aXBsZVZhbGlkYXRpb24gPSBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ7XG4gIH1cblxuICBhc3luYyBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgY29uc3QgcXVlcnk6IFZhbGlkYXRpb25RdWVyeSA9IHsgYWRkcmVzcyB9O1xuICAgIGNvbnN0IHJlc3VsdDogVmFsaWRhdGlvblJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUnLCBxdWVyeSk7XG4gICAgcmV0dXJuIHJlc3VsdC5ib2R5IGFzIFZhbGlkYXRpb25SZXN1bHQ7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7IFdlYmhvb2tzSWRzIH0gZnJvbSAnLi4vRW51bXMnO1xuaW1wb3J0IHsgSVdlYkhvb2tzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcy9XZWJob29rcyc7XG5cbmltcG9ydCB7XG4gIFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2UsXG4gIFdlYmhvb2tMaXN0LFxuICBXZWJob29rUmVzcG9uc2UsXG4gIFdlYmhvb2tzUXVlcnksXG4gIFdlYmhvb2tSZXN1bHRcbn0gZnJvbSAnLi4vVHlwZXMvV2ViaG9va3MnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBjbGFzcyBXZWJob29rIGltcGxlbWVudHMgV2ViaG9va1Jlc3VsdCB7XG4gIGlkOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICB1cmxzOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZCwgdXJsczogc3RyaW5nW10pIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy51cmxzID0gdXJscztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJob29rc0NsaWVudCBpbXBsZW1lbnRzIElXZWJIb29rc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVdlYmhvb2tMaXN0KHJlc3BvbnNlOiB7IGJvZHk6IHsgd2ViaG9va3M6IFdlYmhvb2tMaXN0IH0gfSk6IFdlYmhvb2tMaXN0IHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keS53ZWJob29rcztcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tXaXRoSUQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2U6IFdlYmhvb2tSZXNwb25zZSk6IFdlYmhvb2tSZXN1bHQge1xuICAgICAgY29uc3Qgd2ViaG9va1Jlc3BvbnNlID0gcmVzcG9uc2U/LmJvZHk/LndlYmhvb2s7XG4gICAgICBsZXQgdXJsID0gd2ViaG9va1Jlc3BvbnNlPy51cmw7XG4gICAgICBsZXQgdXJscyA9IHdlYmhvb2tSZXNwb25zZT8udXJscztcbiAgICAgIGlmICghdXJsKSB7XG4gICAgICAgIHVybCA9IHVybHMgJiYgdXJscy5sZW5ndGhcbiAgICAgICAgICA/IHVybHNbMF1cbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmICgoIXVybHMgfHwgdXJscy5sZW5ndGggPT09IDApICYmIHVybCkge1xuICAgICAgICB1cmxzID0gW3VybF07XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFdlYmhvb2soaWQsIHVybCwgdXJscyBhcyBzdHJpbmdbXSk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlV2ViaG9va1Rlc3QocmVzcG9uc2U6IHsgYm9keTogeyBjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZyB9IH0pXG4gIDoge2NvZGU6IG51bWJlciwgbWVzc2FnZTpzdHJpbmd9IHtcbiAgICByZXR1cm4ge1xuICAgICAgY29kZTogcmVzcG9uc2UuYm9keS5jb2RlLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgfSBhcyBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlO1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk6IFdlYmhvb2tzUXVlcnkpOiBQcm9taXNlPFdlYmhvb2tMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCBxdWVyeSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va0xpc3QpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBpZDogV2ViaG9va3NJZHMpOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsXG4gICAgaWQ6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICB0ZXN0ID0gZmFsc2UpOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQgfCBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlPiB7XG4gICAgaWYgKHRlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCwgJ3Rlc3QnKSwgeyB1cmwgfSlcbiAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rVGVzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgeyBpZCwgdXJsIH0pXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZywgdXJsVmFsdWVzOiBzdHJpbmcgfCBzdHJpbmdbXSk6IFByb21pc2U8V2ViaG9va1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCksIHsgdXJsOiB1cmxWYWx1ZXMgfSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZykgOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCB7IEN1c3RvbUZpbGUsIEN1c3RvbUZpbGVEYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuaW1wb3J0IHsgQXR0YWNobWVudEluZm8sIFN0cmVhbVZhbHVlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0F0dGFjaG1lbnRzJztcblxuY2xhc3MgQmxvYkZyb21TdHJlYW0ge1xuICBwcml2YXRlIF9zdHJlYW06IFJlYWRhYmxlXG4gIHNpemU6IG51bWJlclxuXG4gIGNvbnN0cnVjdG9yKHN0cmVhbTogUmVhZGFibGUsIHNpemU6IG51bWJlcikge1xuICAgIHRoaXMuX3N0cmVhbSA9IHN0cmVhbTtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICB9XG5cbiAgc3RyZWFtKCkge1xuICAgIHJldHVybiB0aGlzLl9zdHJlYW07XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdCbG9iJztcbiAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50c0hhbmRsZXIge1xuICBwcml2YXRlIGdldEF0dGFjaG1lbnRPcHRpb25zKGl0ZW06IHtcbiAgICBmaWxlbmFtZT86IHN0cmluZztcbiAgICBjb250ZW50VHlwZT8gOiBzdHJpbmc7XG4gICAga25vd25MZW5ndGg/OiBudW1iZXI7XG4gIH0pOiBBdHRhY2htZW50SW5mbyB7XG4gICAgY29uc3Qge1xuICAgICAgZmlsZW5hbWUsXG4gICAgICBjb250ZW50VHlwZSxcbiAgICAgIGtub3duTGVuZ3RoLFxuICAgIH0gPSBpdGVtO1xuICAgIHJldHVybiB7XG4gICAgICAuLi4oZmlsZW5hbWUgPyB7IGZpbGVuYW1lIH0gOiB7IGZpbGVuYW1lOiAnZmlsZScgfSksXG4gICAgICAuLi4oY29udGVudFR5cGUgJiYgeyBjb250ZW50VHlwZSB9KSxcbiAgICAgIC4uLihrbm93bkxlbmd0aCAmJiB7IGtub3duTGVuZ3RoIH0pXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsZUluZm8oZmlsZTogRmlsZSkgeyAvLyBicm93c2VyIGNvbXBsaWFudCBmaWxlXG4gICAgY29uc3Qge1xuICAgICAgbmFtZTogZmlsZW5hbWUsXG4gICAgICB0eXBlOiBjb250ZW50VHlwZSxcbiAgICAgIHNpemU6IGtub3duTGVuZ3RoLFxuICAgIH0gPSBmaWxlO1xuICAgIHJldHVybiB0aGlzLmdldEF0dGFjaG1lbnRPcHRpb25zKHsgZmlsZW5hbWUsIGNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q3VzdG9tRmlsZUluZm8oZmlsZTogQ3VzdG9tRmlsZSkgeyAvLyBjdXN0b20gY3JlYXRlZCBmaWxlXG4gICAgY29uc3Qge1xuICAgICAgZmlsZW5hbWUsXG4gICAgICBjb250ZW50VHlwZSxcbiAgICAgIGtub3duTGVuZ3RoLFxuICAgIH0gPSBmaWxlO1xuICAgIHJldHVybiB0aGlzLmdldEF0dGFjaG1lbnRPcHRpb25zKHsgZmlsZW5hbWUsIGNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QnVmZmVySW5mbyhidWZmZXI6IEJ1ZmZlcikge1xuICAgIGNvbnN0IHtcbiAgICAgIGJ5dGVMZW5ndGg6IGtub3duTGVuZ3RoLFxuICAgIH0gPSBidWZmZXI7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZTogJ2ZpbGUnLCBjb250ZW50VHlwZTogJycsIGtub3duTGVuZ3RoIH0pO1xuICB9XG5cbiAgcHVibGljIGlzU3RyZWFtKGRhdGE6IHVua25vd24pIDogZGF0YSBpcyBTdHJlYW1WYWx1ZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgKGRhdGEgYXMgU3RyZWFtVmFsdWUpLnBpcGUgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICBwdWJsaWMgaXNDdXN0b21GaWxlKG9iajogdW5rbm93bik6IG9iaiBpcyBDdXN0b21GaWxlIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbiAgICAgICYmICEhKG9iaiBhcyBDdXN0b21GaWxlKS5kYXRhO1xuICB9XG5cbiAgcHVibGljIGlzQnJvd3NlckZpbGUob2JqOiB1bmtub3duKTogb2JqIGlzIEZpbGUge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAoISEob2JqIGFzIEZpbGUpLm5hbWUgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSk7XG4gIH1cblxuICBwdWJsaWMgaXNCdWZmZXIoZGF0YTogdW5rbm93bik6IGRhdGEgaXMgQnVmZmVyIHtcbiAgICByZXR1cm4gdHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQnVmZmVyLmlzQnVmZmVyKGRhdGEpO1xuICB9XG5cbiAgcHVibGljIGdldEF0dGFjaG1lbnRJbmZvKFxuICAgIGF0dGFjaG1lbnQ6IEN1c3RvbUZpbGUgfCBGaWxlIHwgc3RyaW5nIHwgQ3VzdG9tRmlsZURhdGFcbiAgKTogQXR0YWNobWVudEluZm8ge1xuICAgIGNvbnN0IGlzQnJvd3NlckZpbGUgPSB0aGlzLmlzQnJvd3NlckZpbGUoYXR0YWNobWVudCk7XG4gICAgY29uc3QgaXNDdXN0b21GaWxlID0gdGhpcy5pc0N1c3RvbUZpbGUoYXR0YWNobWVudCk7XG4gICAgY29uc3QgaXNTdHJpbmcgPSB0eXBlb2YgYXR0YWNobWVudCA9PT0gJ3N0cmluZyc7XG4gICAgaWYgKCFpc1N0cmluZykge1xuICAgICAgaWYgKGlzQnJvd3NlckZpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsZUluZm8oYXR0YWNobWVudCBhcyBGaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBCdWZmZXIuaXNCdWZmZXIoYXR0YWNobWVudCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnVmZmVySW5mbyhhdHRhY2htZW50IGFzIEJ1ZmZlcik7XG4gICAgICB9XG4gICAgICBpZiAoaXNDdXN0b21GaWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEN1c3RvbUZpbGVJbmZvKGF0dGFjaG1lbnQgYXMgQ3VzdG9tRmlsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9uczogQXR0YWNobWVudEluZm8gPSB7XG4gICAgICBmaWxlbmFtZTogJ2ZpbGUnLFxuICAgICAgY29udGVudFR5cGU6IHVuZGVmaW5lZCxcbiAgICAgIGtub3duTGVuZ3RoOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgcHVibGljIGNvbnZlcnRUb0ZEZXhwZWN0ZWRTaGFwZShcbiAgICB1c2VyUHJvdmlkZWRWYWx1ZTogQ3VzdG9tRmlsZSB8IEZpbGUgfCBzdHJpbmcgfCBDdXN0b21GaWxlRGF0YVxuICApIHtcbiAgICBjb25zdCBpc1N0cmVhbSA9IHRoaXMuaXNTdHJlYW0odXNlclByb3ZpZGVkVmFsdWUpO1xuICAgIGNvbnN0IGlzQnJvd3NlckZpbGUgPSB0aGlzLmlzQnJvd3NlckZpbGUodXNlclByb3ZpZGVkVmFsdWUpO1xuICAgIGNvbnN0IGlzQ3VzdG9tRmlsZSA9IHRoaXMuaXNDdXN0b21GaWxlKHVzZXJQcm92aWRlZFZhbHVlKTtcbiAgICBjb25zdCBpc1N0cmluZyA9IHR5cGVvZiB1c2VyUHJvdmlkZWRWYWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAoaXNTdHJlYW0gfHwgaXNTdHJpbmcgfHwgaXNCcm93c2VyRmlsZSB8fCB0aGlzLmlzQnVmZmVyKHVzZXJQcm92aWRlZFZhbHVlKSkge1xuICAgICAgcmVzdWx0ID0gdXNlclByb3ZpZGVkVmFsdWU7XG4gICAgfSBlbHNlIGlmIChpc0N1c3RvbUZpbGUpIHtcbiAgICAgIHJlc3VsdCA9IHVzZXJQcm92aWRlZFZhbHVlLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgIGBVbmtub3duIGF0dGFjaG1lbnQgdHlwZSAke3R5cGVvZiB1c2VyUHJvdmlkZWRWYWx1ZX1gLFxuICAgICAgICBgVGhlIFwiYXR0YWNobWVudFwiIHByb3BlcnR5IGV4cGVjdHMgZWl0aGVyIEJ1ZmZlciwgQmxvYiwgb3IgU3RyaW5nLlxuICAgICAgICAgIEFsc28sIEl0IGlzIHBvc3NpYmxlIHRvIHByb3ZpZGUgYW4gb2JqZWN0IHRoYXQgaGFzIHRoZSBwcm9wZXJ0eSBcImRhdGFcIiB3aXRoIGEgdmFsdWUgdGhhdCBpcyBlcXVhbCB0byBvbmUgb2YgdGhlIHR5cGVzIGNvdW50ZWQgYmVmb3JlLlxuICAgICAgICAgIEFkZGl0aW9uYWxseSwgeW91IG1heSB1c2UgYW4gYXJyYXkgdG8gc2VuZCBtb3JlIHRoYW4gb25lIGF0dGFjaG1lbnQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRCbG9iRnJvbVN0cmVhbShzdHJlYW06IFJlYWRhYmxlLCBzaXplOiBudW1iZXIpOiBCbG9iRnJvbVN0cmVhbSB7XG4gICAgcmV0dXJuIG5ldyBCbG9iRnJvbVN0cmVhbShzdHJlYW0sIHNpemUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dGFjaG1lbnRzSGFuZGxlcjtcbiIsImltcG9ydCB7IEFQSUVycm9yT3B0aW9ucywgQVBJRXJyb3JUeXBlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBJRXJyb3IgZXh0ZW5kcyBFcnJvciBpbXBsZW1lbnRzIEFQSUVycm9yVHlwZSB7XG4gIHB1YmxpYyBzdGF0dXM6IG51bWJlciA7XG4gIHB1YmxpYyBzdGFjazogc3RyaW5nO1xuICBwdWJsaWMgZGV0YWlsczogc3RyaW5nO1xuICBwdWJsaWMgdHlwZTogc3RyaW5nO1xuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VXNlckRhdGFFcnJvcihzdGF0dXNUZXh0OiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgdGhpcyh7XG4gICAgICBzdGF0dXM6IDQwMCxcbiAgICAgIHN0YXR1c1RleHQsXG4gICAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2VcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBzdGF0dXMsXG4gICAgc3RhdHVzVGV4dCxcbiAgICBtZXNzYWdlLFxuICAgIGJvZHkgPSB7fVxuICB9OiBBUElFcnJvck9wdGlvbnMpIHtcbiAgICBsZXQgYm9keU1lc3NhZ2UgPSAnJztcbiAgICBsZXQgZXJyb3IgPSAnJztcbiAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBib2R5TWVzc2FnZSA9IGJvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHlNZXNzYWdlID0gYm9keT8ubWVzc2FnZSB8fCAnJztcbiAgICAgIGVycm9yID0gYm9keT8uZXJyb3IgfHwgJyc7XG4gICAgfVxuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBlcnJvciB8fCBzdGF0dXNUZXh0IHx8ICcnO1xuICAgIHRoaXMuZGV0YWlscyA9IGJvZHlNZXNzYWdlO1xuICAgIHRoaXMudHlwZSA9ICdNYWlsZ3VuQVBJRXJyb3InO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCB7IEZvcm1EYXRhSW5wdXQsIElucHV0Rm9ybURhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuXG5pbXBvcnQge1xuICBDdXN0b21GaWxlLFxuICBDdXN0b21GaWxlRGF0YSxcbiAgRm9ybURhdGFJbnB1dFZhbHVlLFxuICBNZXNzYWdlQXR0YWNobWVudCxcbiAgTWltZU1lc3NhZ2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuaW1wb3J0IEF0dGFjaG1lbnRzSGFuZGxlciBmcm9tICcuL0F0dGFjaG1lbnRzSGFuZGxlcic7XG5pbXBvcnQgeyBBdHRhY2htZW50SW5mbyB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BdHRhY2htZW50cyc7XG5cbmNsYXNzIEZvcm1EYXRhQnVpbGRlciB7XG4gIHByaXZhdGUgRm9ybURhdGFDb25zdHJ1Y3RvcjogSW5wdXRGb3JtRGF0YTtcbiAgcHJpdmF0ZSBmaWxlS2V5czogc3RyaW5nW107XG4gIHByaXZhdGUgYXR0YWNobWVudHNIYW5kbGVyOiBBdHRhY2htZW50c0hhbmRsZXI7XG5cbiAgY29uc3RydWN0b3IoRm9ybURhdGFDb25zdHJ1Y3RvcjogSW5wdXRGb3JtRGF0YSkge1xuICAgIHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvciA9IEZvcm1EYXRhQ29uc3RydWN0b3I7XG4gICAgdGhpcy5maWxlS2V5cyA9IFsnYXR0YWNobWVudCcsICdpbmxpbmUnLCAnbXVsdGlwbGVWYWxpZGF0aW9uRmlsZSddO1xuICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyID0gbmV3IEF0dGFjaG1lbnRzSGFuZGxlcigpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUZvcm1EYXRhKGRhdGE6IEZvcm1EYXRhSW5wdXQpOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRhdGEgb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGZvcm1EYXRhOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSA9IE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGRhdGFba2V5XTsgfSlcbiAgICAgIC5yZWR1Y2UoKGZvcm1EYXRhQWNjOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSwga2V5KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmZpbGVLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICBjb25zdCBhdHRhY2htZW50VmFsdWUgPSBkYXRhW2tleV07XG4gICAgICAgICAgaWYgKHRoaXMuaXNNZXNzYWdlQXR0YWNobWVudChhdHRhY2htZW50VmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEZpbGVzVG9GRChrZXksIGF0dGFjaG1lbnRWYWx1ZSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAgICAgYFVua25vd24gdmFsdWUgJHtkYXRhW2tleV19IHdpdGggdHlwZSAke3R5cGVvZiBkYXRhW2tleV19IGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiYCxcbiAgICAgICAgICAgIGBUaGUga2V5IFwiJHtrZXl9XCIgc2hvdWxkIGhhdmUgdHlwZSBvZiBCdWZmZXIsIFN0cmVhbSwgRmlsZSwgb3IgU3RyaW5nIGBcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ21lc3NhZ2UnKSB7IC8vIG1pbWUgbWVzc2FnZVxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2VWYWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgICBpZiAoIW1lc3NhZ2VWYWx1ZSB8fCAhdGhpcy5pc01JTUUobWVzc2FnZVZhbHVlKSkge1xuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgICAgICAgYFVua25vd24gZGF0YSB0eXBlIGZvciBcIiR7a2V5fVwiIHByb3BlcnR5YCxcbiAgICAgICAgICAgICAgJ1RoZSBtaW1lIGRhdGEgc2hvdWxkIGhhdmUgdHlwZSBvZiBCdWZmZXIsIFN0cmluZyBvciBCbG9iJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRNaW1lRGF0YVRvRkQoa2V5LCBtZXNzYWdlVmFsdWUsIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZENvbW1vblByb3BlcnR5VG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICB9LCBuZXcgdGhpcy5Gb3JtRGF0YUNvbnN0cnVjdG9yKCkpO1xuICAgIHJldHVybiBmb3JtRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkTWltZURhdGFUb0ZEKFxuICAgIGtleTogc3RyaW5nLFxuICAgIGRhdGE6IE1pbWVNZXNzYWdlLFxuICAgIGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHsgLy8gaWYgc3RyaW5nIG9ubHkgdHdvIHBhcmFtZXRlcnMgc2hvdWxkIGJlIHVzZWQuXG4gICAgICBmb3JtRGF0YUluc3RhbmNlLmFwcGVuZChrZXksIGRhdGEgYXMgc3RyaW5nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YUluc3RhbmNlKSkgeyAvLyBmb3JtLWRhdGEgcGFja2FnZSBpcyB1c2VkXG4gICAgICBjb25zdCBub2RlRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlIGFzIE5vZGVGb3JtRGF0YTtcbiAgICAgIG5vZGVGb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhLCB7IGZpbGVuYW1lOiAnTWltZU1lc3NhZ2UnIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkKSB7IC8vIGVpdGhlciBub2RlID4gMTggb3IgYnJvd3NlclxuICAgICAgY29uc3QgYnJvd3NlckZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZSBhcyBGb3JtRGF0YTsgLy8gQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGFcbiAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YSwgJ01pbWVNZXNzYWdlJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihkYXRhKSkgeyAvLyBub2RlIGVudmlyb25tZW50XG4gICAgICAgIGNvbnN0IGJsb2JJbnN0YW5jZSA9IG5ldyBCbG9iKFtkYXRhXSk7XG4gICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBibG9iSW5zdGFuY2UsICdNaW1lTWVzc2FnZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc01JTUUoZGF0YTogdW5rbm93bikgOiBkYXRhIGlzIE1pbWVNZXNzYWdlIHtcbiAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnXG4gICAgICB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGRhdGEgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoZGF0YSlcbiAgICAgIHx8ICh0eXBlb2YgUmVhZGFibGVTdHJlYW0gIT09ICd1bmRlZmluZWQnICYmIGRhdGEgaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbSk7XG4gIH1cblxuICBwcml2YXRlIGlzRm9ybURhdGFQYWNrYWdlKG9iajogdW5rbm93bik6IG9iaiBpcyBOb2RlRm9ybURhdGEge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xuICAgICAgJiYgb2JqICE9PSBudWxsXG4gICAgICAmJiB0eXBlb2YgKG9iaiBhcyBOb2RlRm9ybURhdGEpLmdldEhlYWRlcnMgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICBwcml2YXRlIGlzTWVzc2FnZUF0dGFjaG1lbnQodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBNZXNzYWdlQXR0YWNobWVudCB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQ3VzdG9tRmlsZSh2YWx1ZSlcbiAgICAgIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcbiAgICAgIHx8ICh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBGaWxlKVxuICAgICAgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcih2YWx1ZSlcbiAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKHZhbHVlKVxuICAgICAgfHwgKFxuICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeShcbiAgICAgICAgICAoaXRlbSkgPT4gdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNDdXN0b21GaWxlKGl0ZW0pXG4gICAgICAgICAgICB8fCAodHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gaW5zdGFuY2VvZiBGaWxlKVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihpdGVtKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0oaXRlbSlcbiAgICAgICAgKVxuICAgICAgKVxuXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkRmlsZXNUb0ZEKFxuICAgIHByb3BlcnR5TmFtZTogdHlwZW9mIHRoaXMuZmlsZUtleXNbbnVtYmVyXSxcbiAgICB2YWx1ZTogTWVzc2FnZUF0dGFjaG1lbnQsXG4gICAgZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYXBwZW5kRmlsZVRvRkQgPSAoXG4gICAgICBvcmlnaW5hbEtleTogc3RyaW5nLFxuICAgICAgYXR0YWNobWVudDogQ3VzdG9tRmlsZSB8IEZpbGUgfCBzdHJpbmd8IEN1c3RvbUZpbGVEYXRhLFxuICAgICAgZm9ybURhdGE6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICAgKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBvcmlnaW5hbEtleSA9PT0gJ211bHRpcGxlVmFsaWRhdGlvbkZpbGUnID8gJ2ZpbGUnIDogb3JpZ2luYWxLZXk7XG4gICAgICBjb25zdCBvYmpEYXRhID0gdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuY29udmVydFRvRkRleHBlY3RlZFNoYXBlKGF0dGFjaG1lbnQpO1xuICAgICAgY29uc3Qgb3B0aW9uczogQXR0YWNobWVudEluZm8gPSB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5nZXRBdHRhY2htZW50SW5mbyhhdHRhY2htZW50KTtcblxuICAgICAgaWYgKHRoaXMuaXNGb3JtRGF0YVBhY2thZ2UoZm9ybURhdGEpKSB7XG4gICAgICAgIGNvbnN0IGZkID0gZm9ybURhdGEgYXMgTm9kZUZvcm1EYXRhO1xuICAgICAgICBjb25zdCBkYXRhID0gdHlwZW9mIG9iakRhdGEgPT09ICdzdHJpbmcnID8gQnVmZmVyLmZyb20ob2JqRGF0YSkgOiBvYmpEYXRhO1xuICAgICAgICBmZC5hcHBlbmQoa2V5LCBkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIEJsb2IgIT09IHVuZGVmaW5lZCkgeyAvLyBlaXRoZXIgbm9kZSA+IDE4IG9yIGJyb3dzZXJcbiAgICAgICAgY29uc3QgYnJvd3NlckZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZSBhcyBGb3JtRGF0YTsgLy8gQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGFcblxuICAgICAgICBpZiAodHlwZW9mIG9iakRhdGEgPT09ICdzdHJpbmcnIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKG9iakRhdGEpKSB7XG4gICAgICAgICAgY29uc3QgYmxvYkluc3RhbmNlID0gbmV3IEJsb2IoW29iakRhdGFdKTtcbiAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgYmxvYkluc3RhbmNlLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqRGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgb2JqRGF0YSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKG9iakRhdGEpKSB7XG4gICAgICAgICAgY29uc3QgYmxvYiA9IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmdldEJsb2JGcm9tU3RyZWFtKFxuICAgICAgICAgICAgb2JqRGF0YSBhcyB1bmtub3duIGFzIFJlYWRhYmxlLFxuICAgICAgICAgICAgb3B0aW9ucy5rbm93bkxlbmd0aCBhcyBudW1iZXJcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5zZXQoa2V5LCBibG9iIGFzIHVua25vd24gYXMgRmlsZSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgaXRlbSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCB2YWx1ZSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRDb21tb25Qcm9wZXJ0eVRvRkQoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgdmFsdWU6IEZvcm1EYXRhSW5wdXRWYWx1ZSxcbiAgICBmb3JtRGF0YUFjYzogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYWRkVmFsdWVCYXNlZE9uRkQgPSAoZmRLZXk6IHN0cmluZywgZmRWYWx1ZTogRm9ybURhdGFJbnB1dFZhbHVlKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YUFjYykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmZFZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgcmVjZWl2ZWQgdmFsdWUgaXMgYW4gb2JqZWN0LiBcXG4nXG4gICAgICAgICAgKyAnXCJKU09OLlN0cmluZ2lmeVwiIHdpbGwgYmUgdXNlZCB0byBhdm9pZCBUeXBlRXJyb3IgXFxuJ1xuICAgICAgICAgICsgJ1RvIHJlbW92ZSB0aGlzIHdhcm5pbmc6IFxcbidcbiAgICAgICAgICArICdDb25zaWRlciBzd2l0Y2hpbmcgdG8gYnVpbHQtaW4gRm9ybURhdGEgb3IgY29udmVydGluZyB0aGUgdmFsdWUgb24geW91ciBvd24uXFxuJyk7XG4gICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgSlNPTi5zdHJpbmdpZnkoZmRWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIGZkVmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBmZFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBmZFZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkICYmIGZkVmFsdWUgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIGZkVmFsdWUpO1xuICAgICAgfVxuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgJ1Vua25vd24gdmFsdWUgdHlwZSBmb3IgRm9ybSBEYXRhLiBTdHJpbmcgb3IgQmxvYiBleHBlY3RlZCcsXG4gICAgICAgICdCcm93c2VyIGNvbXBsaWFudCBGb3JtRGF0YSBhbGxvd3Mgb25seSBzdHJpbmcgb3IgQmxvYiB2YWx1ZXMgZm9yIHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IGF0dGFjaG1lbnRzLidcbiAgICAgICk7XG4gICAgfTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogRm9ybURhdGFJbnB1dFZhbHVlKSB7XG4gICAgICAgIGFkZFZhbHVlQmFzZWRPbkZEKGtleSwgaXRlbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIGFkZFZhbHVlQmFzZWRPbkZEKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybURhdGFCdWlsZGVyO1xuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuXG5pbXBvcnQge1xuICBQYWdlc0xpc3RBY2N1bXVsYXRvcixcbiAgUGFyc2VkUGFnZSxcbiAgUGFyc2VkUGFnZXNMaXN0LFxuICBRdWVyeVdpdGhQYWdlLFxuICBSZXNwb25zZVdpdGhQYWdpbmcsXG4gIFVwZGF0ZWRVcmxBbmRRdWVyeSxcbiAgQVBJRXJyb3JPcHRpb25zXG59IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5pbXBvcnQge1xuICBJQm91bmNlLFxuICBJQ29tcGxhaW50LFxuICBJVW5zdWJzY3JpYmUsXG4gIElXaGl0ZUxpc3Rcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9SZXF1ZXN0JztcbmltcG9ydCB7XG4gIFN1cHByZXNzaW9uRGF0YVR5cGVcbn0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgTmF2aWdhdGlvblRocnVQYWdlcyA8VD4ge1xuICByZXF1ZXN0PzogUmVxdWVzdDtcbiAgY29uc3RydWN0b3IocmVxdWVzdD86IFJlcXVlc3QpIHtcbiAgICBpZiAocmVxdWVzdCkge1xuICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VQYWdlKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcGFnZVVybDogc3RyaW5nLFxuICAgIHVybFNlcGFyYXRvcjogc3RyaW5nLFxuICAgIGl0ZXJhdG9yTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4gICkgOiBQYXJzZWRQYWdlIHtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKHBhZ2VVcmwpO1xuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBwYXJzZWRVcmw7XG5cbiAgICBjb25zdCBwYWdlVmFsdWUgPSBwYWdlVXJsICYmIHR5cGVvZiBwYWdlVXJsID09PSAnc3RyaW5nJyA/IHBhZ2VVcmwuc3BsaXQodXJsU2VwYXJhdG9yKS5wb3AoKSB8fCAnJyA6ICcnO1xuICAgIGxldCBpdGVyYXRvclBvc2l0aW9uID0gbnVsbDtcbiAgICBpZiAoaXRlcmF0b3JOYW1lKSB7XG4gICAgICBpdGVyYXRvclBvc2l0aW9uID0gc2VhcmNoUGFyYW1zLmhhcyhpdGVyYXRvck5hbWUpXG4gICAgICAgID8gc2VhcmNoUGFyYW1zLmdldChpdGVyYXRvck5hbWUpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaWQsXG4gICAgICBwYWdlOiB1cmxTZXBhcmF0b3IgPT09ICc/JyA/IGA/JHtwYWdlVmFsdWV9YCA6IHBhZ2VWYWx1ZSxcbiAgICAgIGl0ZXJhdG9yUG9zaXRpb24sXG4gICAgICB1cmw6IHBhZ2VVcmxcbiAgICB9IGFzIFBhcnNlZFBhZ2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VQYWdlTGlua3MoXG4gICAgcmVzcG9uc2U6IFJlc3BvbnNlV2l0aFBhZ2luZyxcbiAgICB1cmxTZXBhcmF0b3I6IHN0cmluZyxcbiAgICBpdGVyYXRvck5hbWU/OiBzdHJpbmdcbiAgKTogUGFyc2VkUGFnZXNMaXN0IHtcbiAgICBjb25zdCBwYWdlcyA9IE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlLmJvZHkucGFnaW5nKTtcbiAgICByZXR1cm4gcGFnZXMucmVkdWNlKFxuICAgICAgKGFjYzogUGFnZXNMaXN0QWNjdW11bGF0b3IsIFtpZCwgcGFnZVVybF06IFsgaWQ6IHN0cmluZywgcGFnZVVybDogc3RyaW5nXSkgPT4ge1xuICAgICAgICBhY2NbaWRdID0gdGhpcy5wYXJzZVBhZ2UoaWQsIHBhZ2VVcmwsIHVybFNlcGFyYXRvciwgaXRlcmF0b3JOYW1lKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9XG4gICAgKSBhcyB1bmtub3duIGFzIFBhcnNlZFBhZ2VzTGlzdDtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVXJsQW5kUXVlcnkoY2xpZW50VXJsOiBzdHJpbmcsIHF1ZXJ5PzogUXVlcnlXaXRoUGFnZSk6IFVwZGF0ZWRVcmxBbmRRdWVyeSB7XG4gICAgbGV0IHVybCA9IGNsaWVudFVybDtcbiAgICBjb25zdCBxdWVyeUNvcHkgPSB7IC4uLnF1ZXJ5IH07XG4gICAgaWYgKHF1ZXJ5Q29weS5wYWdlKSB7XG4gICAgICB1cmwgPSB1cmxqb2luKGNsaWVudFVybCwgcXVlcnlDb3B5LnBhZ2UpO1xuICAgICAgZGVsZXRlIHF1ZXJ5Q29weS5wYWdlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdXJsLFxuICAgICAgdXBkYXRlZFF1ZXJ5OiBxdWVyeUNvcHlcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIHJlcXVlc3RMaXN0V2l0aFBhZ2VzKGNsaWVudFVybDpzdHJpbmcsIHF1ZXJ5PzogUXVlcnlXaXRoUGFnZSwgTW9kZWw/OiB7XG4gICAgbmV3KGRhdGE6IFN1cHByZXNzaW9uRGF0YVR5cGUpOlxuICAgIElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdFxuICB9KTogUHJvbWlzZTxUPiB7XG4gICAgY29uc3QgeyB1cmwsIHVwZGF0ZWRRdWVyeSB9ID0gdGhpcy51cGRhdGVVcmxBbmRRdWVyeShjbGllbnRVcmwsIHF1ZXJ5KTtcbiAgICBpZiAodGhpcy5yZXF1ZXN0KSB7XG4gICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCh1cmwsIHVwZGF0ZWRRdWVyeSk7XG4gICAgICAvLyBNb2RlbCBoZXJlIGlzIHVzdWFsbHkgdW5kZWZpbmVkIGV4Y2VwdCBmb3IgU3VwcHJlc3Npb24gQ2xpZW50XG4gICAgICByZXR1cm4gdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UsIE1vZGVsKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgIHN0YXR1czogNTAwLFxuICAgICAgc3RhdHVzVGV4dDogJ1JlcXVlc3QgcHJvcGVydHkgaXMgZW1wdHknLFxuICAgICAgYm9keTogeyBtZXNzYWdlOiAnJyB9XG4gICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHBhcnNlTGlzdChyZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nLCBNb2RlbD86IHtcbiAgICBuZXcoZGF0YTogU3VwcHJlc3Npb25EYXRhVHlwZSk6XG4gICAgSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0XG4gIH0pOiBUO1xufVxuIiwiaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gJ2Jhc2UtNjQnO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IGF4aW9zLCB7XG4gIEF4aW9zRXJyb3IsXG4gIEF4aW9zUmVzcG9uc2UsXG4gIEF4aW9zSGVhZGVycyxcbiAgUmF3QXhpb3NSZXF1ZXN0SGVhZGVycyxcbiAgQXhpb3NQcm94eUNvbmZpZyxcbn0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0ICogYXMgTm9kZUZvcm1EYXRhIGZyb20gJ2Zvcm0tZGF0YSc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvcic7XG5pbXBvcnQge1xuICBPbkNhbGxSZXF1ZXN0T3B0aW9ucyxcbiAgUmVxdWVzdE9wdGlvbnMsXG4gIEFQSUVycm9yT3B0aW9ucyxcbiAgSW5wdXRGb3JtRGF0YSxcbiAgQVBJUmVzcG9uc2UsXG4gIElwUG9vbERlbGV0ZURhdGEsXG4gIEZvcm1EYXRhSW5wdXRcbn0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuXG5pbXBvcnQgRm9ybURhdGFCdWlsZGVyIGZyb20gJy4vRm9ybURhdGFCdWlsZGVyJztcbmltcG9ydCBTdWJhY2NvdW50c0NsaWVudCBmcm9tICcuLi9TdWJhY2NvdW50cyc7XG5cbmNsYXNzIFJlcXVlc3Qge1xuICBwcml2YXRlIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUga2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgdXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgdGltZW91dDogbnVtYmVyO1xuICBwcml2YXRlIGhlYWRlcnM6IEF4aW9zSGVhZGVycztcbiAgcHJpdmF0ZSBmb3JtRGF0YUJ1aWxkZXI6IEZvcm1EYXRhQnVpbGRlcjtcbiAgcHJpdmF0ZSBtYXhCb2R5TGVuZ3RoOiBudW1iZXI7XG4gIHByaXZhdGUgcHJveHk6IEF4aW9zUHJveHlDb25maWcgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogUmVxdWVzdE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy51c2VybmFtZSA9IG9wdGlvbnMudXNlcm5hbWU7XG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIGFzIHN0cmluZztcbiAgICB0aGlzLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XG4gICAgdGhpcy5oZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3Qob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB0aGlzLmZvcm1EYXRhQnVpbGRlciA9IG5ldyBGb3JtRGF0YUJ1aWxkZXIoZm9ybURhdGEpO1xuICAgIHRoaXMubWF4Qm9keUxlbmd0aCA9IDUyNDI4ODAwOyAvLyA1MCBNQlxuICAgIHRoaXMucHJveHkgPSBvcHRpb25zPy5wcm94eTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb25DYWxsT3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBvcHRpb25zOiBPbkNhbGxSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub25DYWxsT3B0aW9ucyB9O1xuICAgIGRlbGV0ZSBvcHRpb25zPy5oZWFkZXJzO1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gdGhpcy5qb2luQW5kVHJhbnNmb3JtSGVhZGVycyhvbkNhbGxPcHRpb25zKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLm9wdGlvbnMgfTtcblxuICAgIGlmIChvcHRpb25zPy5xdWVyeSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvcHRpb25zPy5xdWVyeSkubGVuZ3RoID4gMCkge1xuICAgICAgcGFyYW1zLnBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeSk7XG4gICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5ib2R5KSB7XG4gICAgICBjb25zdCBib2R5ID0gb3B0aW9ucz8uYm9keTtcbiAgICAgIHBhcmFtcy5kYXRhID0gYm9keTtcbiAgICAgIGRlbGV0ZSBwYXJhbXMuYm9keTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlO1xuICAgIGNvbnN0IHVybFZhbHVlID0gdXJsam9pbih0aGlzLnVybCwgdXJsKTtcblxuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6IG1ldGhvZC50b0xvY2FsZVVwcGVyQ2FzZSgpLFxuICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgIHVybDogdXJsVmFsdWUsXG4gICAgICAgIGhlYWRlcnM6IHJlcXVlc3RIZWFkZXJzLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgIG1heEJvZHlMZW5ndGg6IHRoaXMubWF4Qm9keUxlbmd0aCxcbiAgICAgICAgcHJveHk6IHRoaXMucHJveHksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSBlcnIgYXMgQXhpb3NFcnJvcjtcblxuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgc3RhdHVzOiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uc3RhdHVzIHx8IDQwMCxcbiAgICAgICAgc3RhdHVzVGV4dDogZXJyb3JSZXNwb25zZT8ucmVzcG9uc2U/LnN0YXR1c1RleHQgfHwgZXJyb3JSZXNwb25zZS5jb2RlLFxuICAgICAgICBib2R5OiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uZGF0YSB8fCBlcnJvclJlc3BvbnNlLm1lc3NhZ2VcbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmdldFJlc3BvbnNlQm9keShyZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlcyBhcyBBUElSZXNwb25zZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlcyA9IHtcbiAgICAgIGJvZHk6IHt9LFxuICAgICAgc3RhdHVzOiByZXNwb25zZT8uc3RhdHVzXG4gICAgfSBhcyBBUElSZXNwb25zZTtcblxuICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhID09PSAnTWFpbGd1biBNYWduaWZpY2VudCBBUEknKSB7XG4gICAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgc3RhdHVzVGV4dDogJ0luY29ycmVjdCB1cmwnLFxuICAgICAgICAgIGJvZHk6IHJlc3BvbnNlLmRhdGFcbiAgICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcmVzLmJvZHkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmRhdGFcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5ib2R5ID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHByaXZhdGUgam9pbkFuZFRyYW5zZm9ybUhlYWRlcnMoXG4gICAgb25DYWxsT3B0aW9ucz86IE9uQ2FsbFJlcXVlc3RPcHRpb25zXG4gICk6IEF4aW9zSGVhZGVycyB7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBuZXcgQXhpb3NIZWFkZXJzKCk7XG5cbiAgICBjb25zdCBiYXNpYyA9IGJhc2U2NC5lbmNvZGUoYCR7dGhpcy51c2VybmFtZX06JHt0aGlzLmtleX1gKTtcbiAgICByZXF1ZXN0SGVhZGVycy5zZXRBdXRob3JpemF0aW9uKGBCYXNpYyAke2Jhc2ljfWApO1xuICAgIHJlcXVlc3RIZWFkZXJzLnNldCh0aGlzLmhlYWRlcnMpO1xuXG4gICAgY29uc3QgcmVjZWl2ZWRPbkNhbGxIZWFkZXJzID0gb25DYWxsT3B0aW9ucyAmJiBvbkNhbGxPcHRpb25zLmhlYWRlcnM7XG4gICAgY29uc3Qgb25DYWxsSGVhZGVycyA9IHRoaXMubWFrZUhlYWRlcnNGcm9tT2JqZWN0KHJlY2VpdmVkT25DYWxsSGVhZGVycyk7XG4gICAgcmVxdWVzdEhlYWRlcnMuc2V0KG9uQ2FsbEhlYWRlcnMpO1xuICAgIHJldHVybiByZXF1ZXN0SGVhZGVycztcbiAgfVxuXG4gIHByaXZhdGUgbWFrZUhlYWRlcnNGcm9tT2JqZWN0KFxuICAgIGhlYWRlcnNPYmplY3Q6IFJhd0F4aW9zUmVxdWVzdEhlYWRlcnMgPSB7fVxuICApOiBBeGlvc0hlYWRlcnMge1xuICAgIGxldCByZXF1ZXN0SGVhZGVycyA9IG5ldyBBeGlvc0hlYWRlcnMoKTtcbiAgICByZXF1ZXN0SGVhZGVycyA9IE9iamVjdC5lbnRyaWVzKGhlYWRlcnNPYmplY3QpLnJlZHVjZShcbiAgICAgIChoZWFkZXJzQWNjdW11bGF0b3I6IEF4aW9zSGVhZGVycywgY3VycmVudFBhaXIpID0+IHtcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gY3VycmVudFBhaXI7XG4gICAgICAgIGhlYWRlcnNBY2N1bXVsYXRvci5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiBoZWFkZXJzQWNjdW11bGF0b3I7XG4gICAgICB9LCByZXF1ZXN0SGVhZGVyc1xuICAgICk7XG4gICAgcmV0dXJuIHJlcXVlc3RIZWFkZXJzO1xuICB9XG5cbiAgc2V0U3ViYWNjb3VudEhlYWRlcihzdWJhY2NvdW50SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLm1ha2VIZWFkZXJzRnJvbU9iamVjdCh7XG4gICAgICAuLi50aGlzLmhlYWRlcnMsXG4gICAgICBbU3ViYWNjb3VudHNDbGllbnQuU1VCQUNDT1VOVF9IRUFERVJdOiBzdWJhY2NvdW50SWRcbiAgICB9KTtcbiAgICB0aGlzLmhlYWRlcnMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgcmVzZXRTdWJhY2NvdW50SGVhZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuaGVhZGVycy5kZWxldGUoU3ViYWNjb3VudHNDbGllbnQuU1VCQUNDT1VOVF9IRUFERVIpO1xuICB9XG5cbiAgcXVlcnkoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IEFycmF5PEFycmF5PHN0cmluZz4+LFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgeyBxdWVyeSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIGNvbW1hbmQoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXSB8IHN0cmluZyB8IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhLFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgICBhZGREZWZhdWx0SGVhZGVycyA9IHRydWVcbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGxldCBoZWFkZXJzID0ge307XG4gICAgaWYgKGFkZERlZmF1bHRIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzID0geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfTtcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAuLi5oZWFkZXJzLFxuICAgICAgYm9keTogZGF0YSxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICByZXF1ZXN0T3B0aW9uc1xuICAgICk7XG4gIH1cblxuICBnZXQoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IEFycmF5PEFycmF5PHN0cmluZz4+LFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkoJ2dldCcsIHVybCwgcXVlcnksIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBzdHJpbmcsXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3RXaXRoRkQoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YTogRm9ybURhdGFJbnB1dFxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBwdXRXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IEZvcm1EYXRhSW5wdXQpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHBhdGNoV2l0aEZEKHVybDogc3RyaW5nLCBkYXRhOiBGb3JtRGF0YUlucHV0KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncGF0Y2gnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHB1dCh1cmw6IHN0cmluZywgZGF0YT86IEZvcm1EYXRhSW5wdXQgfCBzdHJpbmcsIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcbiAgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZSh1cmw6IHN0cmluZywgZGF0YT86IElwUG9vbERlbGV0ZURhdGEpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgnZGVsZXRlJywgdXJsLCBkYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIiwiZXhwb3J0IGVudW0gUmVzb2x1dGlvbiB7XG4gICAgSE9VUiA9ICdob3VyJyxcbiAgICBEQVkgPSAnZGF5JyxcbiAgICBNT05USCA9ICdtb250aCdcbn1cblxuZXhwb3J0IGVudW0gU3VwcHJlc3Npb25Nb2RlbHMge1xuICAgIEJPVU5DRVMgPSAnYm91bmNlcycsXG4gICAgQ09NUExBSU5UUyA9ICdjb21wbGFpbnRzJyxcbiAgICBVTlNVQlNDUklCRVMgPSAndW5zdWJzY3JpYmVzJyxcbiAgICBXSElURUxJU1RTID0gJ3doaXRlbGlzdHMnXG59XG5cbmV4cG9ydCBlbnVtIFdlYmhvb2tzSWRzIHtcbiAgICBDTElDS0VEID0gJ2NsaWNrZWQnLFxuICAgIENPTVBMQUlORUQgPSAnY29tcGxhaW5lZCcsXG4gICAgREVMSVZFUkVEID0gJ2RlbGl2ZXJlZCcsXG4gICAgT1BFTkVEID0gJ29wZW5lZCcsXG4gICAgUEVSTUFORU5UX0ZBSUwgPSAncGVybWFuZW50X2ZhaWwnLFxuICAgIFRFTVBPUkFSWV9GQUlMID0gJ3RlbXBvcmFyeV9mYWlsJyxcbiAgICBVTlNVQlNDUklCRUQgPSAndW5zdWJzY3JpYmUnLFxufVxuXG5leHBvcnQgZW51bSBZZXNObyB7XG4gICAgWUVTID0gJ3llcycsXG4gICAgTk8gPSAnbm8nXG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIElMb2dnZXIge1xuICB3YXJuKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWRcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTG9nZ2VyJztcbiIsImltcG9ydCB7XG4gIERvbWFpbkNyZWRlbnRpYWxzLFxuICBEb21haW5DcmVkZW50aWFsc0xpc3QsXG4gIERvbWFpbkNyZWRlbnRpYWxzUXVlcnksXG4gIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0LFxuICBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpbkNyZWRlbnRpYWxzIHtcbiAgICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeTogRG9tYWluQ3JlZGVudGlhbHNRdWVyeSk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNMaXN0PlxuICAgIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogRG9tYWluQ3JlZGVudGlhbHNcbiAgICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PlxuICAgIHVwZGF0ZShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZyxcbiAgICAgICAgZGF0YTogVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG4gICAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD5cbiAgICBkZXN0cm95KFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD5cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHsgUmVzb2x1dGlvbiB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7XG4gIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdzSXRlbSxcbiAgRG9tYWluVGFnc0xpc3QsXG4gIERvbWFpblRhZ3NNZXNzYWdlUmVzLFxuICBEb21haW5UYWdzU3RhdGlzdGljUXVlcnksXG4gIERvbWFpblRhZ1N0YXRpc3RpY0l0ZW1cbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdCB7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBzdGFydDogRGF0ZTtcbiAgICBlbmQ6IERhdGU7XG4gICAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgICBzdGF0czogRG9tYWluVGFnU3RhdGlzdGljSXRlbVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5UYWdzQ2xpZW50IHtcbiAgICBsaXN0KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzTGlzdD5cbiAgICBnZXQoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzSXRlbT5cbiAgICB1cGRhdGUoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyxcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZ1xuICAgICk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+XG4gICAgZGVzdHJveShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz5cbiAgICBzdGF0aXN0aWMoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyxcbiAgICAgICAgcXVlcnk6IERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeVxuICAgICk6IFByb21pc2U8SURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdD5cbiAgICBjb3VudHJpZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbj5cbiAgICBwcm92aWRlcnMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbj5cbiAgICBkZXZpY2VzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uPlxufVxuIiwiaW1wb3J0IHtcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBEb21haW5UZW1wbGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlc1F1ZXJ5LFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGEsXG4gIERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGEsXG4gIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0LFxuICBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQsXG4gIE5vdGlmaWNhdGlvblJlc3VsdCxcbiAgU2hvcnRUZW1wbGF0ZVZlcnNpb24sXG4gIFRlbXBsYXRlUXVlcnksXG4gIFRlbXBsYXRlVmVyc2lvbixcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdFxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluVGVtcGxhdGUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbiAgICBjcmVhdGVkQnk6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHZlcnNpb24/OiBUZW1wbGF0ZVZlcnNpb247XG4gICAgdmVyc2lvbnM/OiBTaG9ydFRlbXBsYXRlVmVyc2lvbltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5UZW1wbGF0ZXNDbGllbnQge1xuICAgIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ+XG4gICAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgcXVlcnk/OiBUZW1wbGF0ZVF1ZXJ5KTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+XG4gICAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBEb21haW5UZW1wbGF0ZURhdGEpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT5cbiAgICB1cGRhdGUoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhXG4gICAgKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PlxuICAgIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PlxuICAgIGRlc3Ryb3lBbGwoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE5vdGlmaWNhdGlvblJlc3VsdD5cbiAgICBjcmVhdGVWZXJzaW9uKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGFcbiAgICApIDogUHJvbWlzZTxDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+XG4gICAgZ2V0VmVyc2lvbihkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+XG4gICAgdXBkYXRlVmVyc2lvbihcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyxcbiAgICAgICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YVxuICAgICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PlxuICAgIGRlc3Ryb3lWZXJzaW9uKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+XG4gICAgbGlzdFZlcnNpb25zKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0PlxufVxuIiwiaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuaW1wb3J0IHtcbiAgQ2xpY2tUcmFja2luZ0luZm8sXG4gIENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIERLSU1TZWxlY3RvckluZm8sXG4gIERvbWFpbkluZm8sXG4gIERvbWFpbnNRdWVyeSxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBEb21haW5VcGRhdGVJbmZvLFxuICBNZXNzYWdlUmVzcG9uc2UsXG4gIE9wZW5UcmFja2luZ0luZm8sXG4gIFJlcGxhY2VtZW50Rm9yUG9vbCxcbiAgVERvbWFpbixcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MsXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFVwZGF0ZWRPcGVuVHJhY2tpbmcsXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgV2ViUHJlZml4SW5mb1xufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcbmltcG9ydCB7IElEb21haW5DcmVkZW50aWFscyB9IGZyb20gJy4vRG9tYWluQ3JlZGVudGlhbHMnO1xuaW1wb3J0IHsgSURvbWFpblRhZ3NDbGllbnQgfSBmcm9tICcuL0RvbWFpblRhZ3MnO1xuaW1wb3J0IHsgSURvbWFpblRlbXBsYXRlc0NsaWVudCB9IGZyb20gJy4vRG9tYWluVGVtcGxhdGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluc0NsaWVudCB7XG4gICAgZG9tYWluQ3JlZGVudGlhbHM6IElEb21haW5DcmVkZW50aWFsc1xuICAgIGRvbWFpblRlbXBsYXRlczogSURvbWFpblRlbXBsYXRlc0NsaWVudFxuICAgIGRvbWFpblRhZ3M6IElEb21haW5UYWdzQ2xpZW50XG4gICAgbGlzdChxdWVyeT86IERvbWFpbnNRdWVyeSk6IFByb21pc2U8VERvbWFpbltdPlxuICAgIGdldChkb21haW46IHN0cmluZyk6IFByb21pc2U8VERvbWFpbj5cbiAgICBjcmVhdGUoZGF0YTogRG9tYWluSW5mbyk6IFByb21pc2U8VERvbWFpbj5cbiAgICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERvbWFpblVwZGF0ZUluZm8pOiBQcm9taXNlPFREb21haW4+XG4gICAgdmVyaWZ5KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxURG9tYWluPlxuICAgIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT5cbiAgICBnZXRDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxDb25uZWN0aW9uU2V0dGluZ3M+XG4gICAgdXBkYXRlQ29ubmVjdGlvbihkb21haW46IHN0cmluZywgZGF0YTogQ29ubmVjdGlvblNldHRpbmdzKTogUHJvbWlzZTxVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzPlxuICAgIGdldFRyYWNraW5nKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UcmFja2luZ0RhdGE+XG4gICAgdXBkYXRlVHJhY2tpbmcoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0eXBlOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IE9wZW5UcmFja2luZ0luZm8gfCBDbGlja1RyYWNraW5nSW5mbyB8IFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvXG4gICAgKTogUHJvbWlzZTxVcGRhdGVkT3BlblRyYWNraW5nPlxuICAgIGdldElwcyhkb21haW46IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+XG4gICAgYXNzaWduSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPlxuICAgIGRlbGV0ZUlwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgbGlua0lwUG9vbChkb21haW46IHN0cmluZywgcG9vbF9pZDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT5cbiAgICB1bmxpbmtJcFBvbGwoZG9tYWluOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBSZXBsYWNlbWVudEZvclBvb2wpOiBQcm9taXNlPEFQSVJlc3BvbnNlPlxuICAgIHVwZGF0ZURLSU1BdXRob3JpdHkoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERLSU1BdXRob3JpdHlJbmZvKTogUHJvbWlzZTxVcGRhdGVkREtJTUF1dGhvcml0eT5cbiAgICB1cGRhdGVES0lNU2VsZWN0b3IoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERLSU1TZWxlY3RvckluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNU2VsZWN0b3JSZXNwb25zZT5cbiAgICB1cGRhdGVXZWJQcmVmaXgoZG9tYWluOiBzdHJpbmcsIGRhdGE6IFdlYlByZWZpeEluZm8pOiBQcm9taXNlPFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZT5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vRG9tYWluQ3JlZGVudGlhbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UYWdzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGVtcGxhdGVzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluc0NsaWVudCc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuaW1wb3J0IHsgRXZlbnRzTGlzdCwgRXZlbnRzUXVlcnkgfSBmcm9tICcuLi8uLi9UeXBlcy9FdmVudHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElFdmVudENsaWVudCB7XG4gIGdldChkb21haW46IHN0cmluZywgcXVlcnk/OiBFdmVudHNRdWVyeSkgOiBQcm9taXNlPEV2ZW50c0xpc3Q+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lFdmVudENsaWVudCc7XG4iLCJpbXBvcnQge1xuICBJcFBvb2xDcmVhdGVEYXRhLCBJcFBvb2xDcmVhdGVSZXN1bHQsXG4gIElwUG9vbERlbGV0ZURhdGEsIElwUG9vbExpc3RSZXN1bHQsXG4gIElwUG9vbE1lc3NhZ2VSZXN1bHQsIElwUG9vbFVwZGF0ZURhdGFcbn0gZnJvbSAnLi4vLi4vVHlwZXMvSVBQb29scyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUlQUG9vbHNDbGllbnQge1xuICBsaXN0KCk6IFByb21pc2U8SXBQb29sTGlzdFJlc3VsdD5cbiAgY3JlYXRlKGRhdGE6IElwUG9vbENyZWF0ZURhdGEpOiBQcm9taXNlPElwUG9vbENyZWF0ZVJlc3VsdD5cbiAgdXBkYXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xVcGRhdGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PlxuICBkZWxldGUocG9vbElkOiBzdHJpbmcsIGRhdGE6IElwUG9vbERlbGV0ZURhdGEpOiBQcm9taXNlPElwUG9vbE1lc3NhZ2VSZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lJUFBvb2xzQ2xpZW50JztcbiIsImltcG9ydCB7IElwRGF0YSwgSVBzTGlzdFF1ZXJ5LCBJcHNMaXN0UmVzcG9uc2VCb2R5IH0gZnJvbSAnLi4vLi4vVHlwZXMvSVBzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSVBzQ2xpZW50IHtcbiAgbGlzdChxdWVyeTogSVBzTGlzdFF1ZXJ5KTogUHJvbWlzZTxJcHNMaXN0UmVzcG9uc2VCb2R5PlxuICBnZXQoaXA6IHN0cmluZyk6IFByb21pc2U8SXBEYXRhPlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JSVBzQ2xpZW50JztcbiIsImltcG9ydCB7IElXZWJIb29rc0NsaWVudCB9IGZyb20gJy4uL1dlYmhvb2tzJztcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHsgSURvbWFpbnNDbGllbnQgfSBmcm9tICcuLi9Eb21haW5zJztcbmltcG9ydCB7IElFdmVudENsaWVudCB9IGZyb20gJy4uL0V2ZW50Q2xpZW50JztcbmltcG9ydCB7IElTdGF0c0NsaWVudCB9IGZyb20gJy4uL1N0YXRzJztcbmltcG9ydCB7IElNZXNzYWdlc0NsaWVudCB9IGZyb20gJy4uL01lc3NhZ2VzJztcbmltcG9ydCB7IElTdXBwcmVzc2lvbkNsaWVudCB9IGZyb20gJy4uL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBJUm91dGVzQ2xpZW50IH0gZnJvbSAnLi4vUm91dGVzJztcbmltcG9ydCB7IElWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi4vVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgSUlQc0NsaWVudCB9IGZyb20gJy4uL0lQcyc7XG5pbXBvcnQgeyBJSVBQb29sc0NsaWVudCB9IGZyb20gJy4uL0lQUG9vbHMnO1xuaW1wb3J0IHsgSU1haWxpbmdMaXN0c0NsaWVudCB9IGZyb20gJy4uL01haWxpbmdMaXN0cyc7XG5pbXBvcnQgeyBJU3ViYWNjb3VudHNDbGllbnQgfSBmcm9tICcuLi9TdWJhY2NvdW50cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1haWxndW5DbGllbnQge1xuICAgIGRvbWFpbnM6IElEb21haW5zQ2xpZW50O1xuICAgIHdlYmhvb2tzOiBJV2ViSG9va3NDbGllbnQ7XG4gICAgZXZlbnRzOiBJRXZlbnRDbGllbnQ7XG4gICAgc3RhdHM6IElTdGF0c0NsaWVudDtcbiAgICBzdXBwcmVzc2lvbnM6IElTdXBwcmVzc2lvbkNsaWVudDtcbiAgICBtZXNzYWdlczogSU1lc3NhZ2VzQ2xpZW50O1xuICAgIHJvdXRlczogSVJvdXRlc0NsaWVudDtcbiAgICB2YWxpZGF0ZTogSVZhbGlkYXRpb25DbGllbnQ7XG4gICAgaXBzOiBJSVBzQ2xpZW50O1xuICAgIGlwX3Bvb2xzOiBJSVBQb29sc0NsaWVudDtcbiAgICBsaXN0czogSU1haWxpbmdMaXN0c0NsaWVudDtcbiAgICBzdWJhY2NvdW50czogSVN1YmFjY291bnRzQ2xpZW50O1xuICAgIHNldFN1YmFjY291bnQoc3ViYWNjb3VudElkOiBzdHJpbmcpOiB2b2lkO1xuICAgIHJlc2V0U3ViYWNjb3VudCgpOiB2b2lkO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JTWFpbGd1bkNsaWVudCc7XG4iLCJpbXBvcnQge1xuICBNYWlsTGlzdE1lbWJlcnNRdWVyeSxcbiAgTWFpbExpc3RNZW1iZXJzUmVzdWx0LFxuICBNYWlsTGlzdE1lbWJlcixcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzLFxuICBNdWx0aXBsZU1lbWJlcnNEYXRhLFxuICBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSxcbiAgRGVsZXRlZE1lbWJlclxufSBmcm9tICcuLi8uLi9UeXBlcy9NYWlsaW5nTGlzdHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYWlsTGlzdHNNZW1iZXJzIHtcbiAgbGlzdE1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBNYWlsTGlzdE1lbWJlcnNRdWVyeVxuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyc1Jlc3VsdD47XG5cbiAgZ2V0TWVtYmVyKGFkZHJlc3M6IHN0cmluZywgbWVtYmVyQWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4sXG4gIGNyZWF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPixcbiAgY3JlYXRlTWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZU1lbWJlcnNEYXRhKTogUHJvbWlzZTxOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZT4sXG4gIHVwZGF0ZU1lbWJlcihcbiAgICBhZGRyZXNzOiBzdHJpbmcsXG4gICAgbWVtYmVyQWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+LFxuICBkZXN0cm95TWVtYmVyKGFkZHJlc3M6IHN0cmluZywgbWVtYmVyQWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxEZWxldGVkTWVtYmVyPlxufVxuIiwiaW1wb3J0IHtcbiAgQ3JlYXRlVXBkYXRlTGlzdCwgRGVzdHJveWVkTGlzdCwgTGlzdHNRdWVyeSwgTWFpbGluZ0xpc3QsXG4gIE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdCwgTWFpbGluZ0xpc3RSZXN1bHQsXG4gIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdCwgU3RhcnRWYWxpZGF0aW9uUmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL01haWxpbmdMaXN0cyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4vTWFpbGluZ0xpc3RNZW1iZXJzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFpbGluZ0xpc3RzQ2xpZW50IHtcbiAgbWVtYmVyczogSU1haWxMaXN0c01lbWJlcnM7XG4gIGxpc3QocXVlcnk/OiBMaXN0c1F1ZXJ5KTogUHJvbWlzZTxNYWlsaW5nTGlzdFJlc3VsdD5cbiAgZ2V0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdD5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PlxuICB1cGRhdGUobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PlxuICBkZXN0cm95KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95ZWRMaXN0PlxuICB2YWxpZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8U3RhcnRWYWxpZGF0aW9uUmVzdWx0PlxuICB2YWxpZGF0aW9uUmVzdWx0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQ+XG4gIGNhbmNlbFZhbGlkYXRpb24obWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdD5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RNZW1iZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzQ2xpZW50JztcbiIsImltcG9ydCB7IE1haWxndW5NZXNzYWdlRGF0YSwgTWVzc2FnZXNTZW5kUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvTWVzc2FnZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlc0NsaWVudCB7XG4gIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogTWFpbGd1bk1lc3NhZ2VEYXRhKTogUHJvbWlzZTxNZXNzYWdlc1NlbmRSZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lNZXNzYWdlc0NsaWVudCc7XG4iLCJpbXBvcnQge1xuICBDcmVhdGVVcGRhdGVSb3V0ZURhdGEsIERlc3Ryb3lSb3V0ZVJlc3BvbnNlLCBSb3V0ZSwgUm91dGVzTGlzdFF1ZXJ5LCBVcGRhdGVSb3V0ZVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL1JvdXRlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJvdXRlc0NsaWVudCB7XG4gIGxpc3QocXVlcnk6IFJvdXRlc0xpc3RRdWVyeSk6IFByb21pc2U8Um91dGVbXT5cbiAgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFJvdXRlPlxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxSb3V0ZT5cbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8VXBkYXRlUm91dGVSZXNwb25zZT5cbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95Um91dGVSZXNwb25zZT5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSVJvdXRlc0NsaWVudCc7XG4iLCJpbXBvcnQgeyBTdGF0c1F1ZXJ5IH0gZnJvbSAnLi4vLi4vVHlwZXMvU3RhdHMnO1xuaW1wb3J0IHsgSVN0YXRzQ29udGFpbmVyIH0gZnJvbSAnLi9TdGF0c0NvbnRhaW5lcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRzQ2xpZW50IHtcbiAgZ2V0RG9tYWluKGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPElTdGF0c0NvbnRhaW5lcj5cbiAgZ2V0QWNjb3VudChxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPElTdGF0c0NvbnRhaW5lcj5cbn1cbiIsImltcG9ydCB7IFN0YXQgfSBmcm9tICcuLi8uLi9UeXBlcy9TdGF0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRzQ29udGFpbmVyIHtcbiAgICBzdGFydDogRGF0ZTtcbiAgICBlbmQ6IERhdGU7XG4gICAgcmVzb2x1dGlvbjogc3RyaW5nO1xuICAgIHN0YXRzOiBTdGF0W107XG4gIH1cbiIsImV4cG9ydCAqIGZyb20gJy4vU3RhdHNDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9TdGF0c0NvbnRhaW5lcic7XG4iLCJpbXBvcnQgeyBTdWJhY2NvdW50TGlzdFJlc3BvbnNlRGF0YSwgU3ViYWNjb3VudFJlc3BvbnNlRGF0YSwgU3ViYWNjb3VudHNRdWVyeSB9IGZyb20gJy4uLy4uL1R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBJU3ViYWNjb3VudHNDbGllbnQge1xuICBsaXN0KHF1ZXJ5PzogU3ViYWNjb3VudHNRdWVyeSk6IFByb21pc2U8U3ViYWNjb3VudExpc3RSZXNwb25zZURhdGE+XG4gIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPlxuICBjcmVhdGUobmFtZTogc3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPlxuICBkaXNhYmxlKGlkOiBzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+XG4gIGVuYWJsZShpZDogc3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JU3ViYWNjb3VudHNDbGllbnQnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgaW50ZXJmYWNlIElCb3VuY2Uge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIHR5cGU6IHN0cmluZztcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29tcGxhaW50IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcbiAgICB0eXBlOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge1xuICBTdXBwcmVzc2lvbkxpc3QsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0LFxuICBTdXBwcmVzc2lvbkxpc3RRdWVyeSxcbiAgU3VwcHJlc3Npb25EZXN0cm95UmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBJQm91bmNlIH0gZnJvbSAnLi9Cb3VuY2UnO1xuaW1wb3J0IHsgSUNvbXBsYWludCB9IGZyb20gJy4vQ29tcGxhaW50JztcbmltcG9ydCB7IElVbnN1YnNjcmliZSB9IGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuaW1wb3J0IHsgSVdoaXRlTGlzdCB9IGZyb20gJy4vV2hpdGVMaXN0JztcblxuZXhwb3J0IGludGVyZmFjZSBJU3VwcHJlc3Npb25DbGllbnQge1xuICBsaXN0KGRvbWFpbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIHF1ZXJ5PzogU3VwcHJlc3Npb25MaXN0UXVlcnkpOiBQcm9taXNlPFN1cHByZXNzaW9uTGlzdD5cblxuICBnZXQoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdD5cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25EZXN0cm95UmVzdWx0PlxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgaW50ZXJmYWNlIElVbnN1YnNjcmliZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIHRhZ3M6IGFueTtcbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIHR5cGU6IHN0cmluZztcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgSVdoaXRlTGlzdCB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Cb3VuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9Db21wbGFpbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9VbnN1YnNjcmliZSc7XG5leHBvcnQgKiBmcm9tICcuL1doaXRlTGlzdCc7XG5leHBvcnQgKiBmcm9tICcuL0lTdXBwcmVzc2lvbnNDbGllbnQnO1xuIiwiaW1wb3J0IHtcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdCxcbiAgQ3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYixcbiAgQ2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeVxufSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB7XG4gIGxpc3QocXVlcnk/Ok11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnkpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PlxuICBnZXQobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdD5cbiAgY3JlYXRlKFxuICAgIGxpc3RJZDogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVxuICApOiBQcm9taXNlPENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+XG4gIGRlc3Ryb3kobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPlxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgeyBWYWxpZGF0aW9uUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4vTXVsdGlwbGVWYWxpZGF0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbkNsaWVudCB7XG4gIG11bHRpcGxlVmFsaWRhdGlvbjogSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudFxuICBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxWYWxpZGF0aW9uUmVzdWx0PlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NdWx0aXBsZVZhbGlkYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9uJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5pbXBvcnQgeyBXZWJob29rc0lkcyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7XG4gIFdlYmhvb2tMaXN0LFxuICBXZWJob29rUmVzdWx0LFxuICBXZWJob29rc1F1ZXJ5LFxuICBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL1dlYmhvb2tzJztcblxuZXhwb3J0IGludGVyZmFjZSBJV2ViSG9va3NDbGllbnQge1xuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeTogV2ViaG9va3NRdWVyeSk6IFByb21pc2U8V2ViaG9va0xpc3Q+XG4gIGdldChkb21haW46IHN0cmluZywgaWQ6IFdlYmhvb2tzSWRzKTogUHJvbWlzZTxXZWJob29rUmVzdWx0PlxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsXG4gICAgaWQ6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICB0ZXN0OiBib29sZWFuXG4gICk6IFByb21pc2U8V2ViaG9va1Jlc3VsdCB8IFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2U+XG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcgfCBzdHJpbmdbXSk6IFByb21pc2U8V2ViaG9va1Jlc3VsdD5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZykgOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lXZWJIb29rc0NsaWVudCc7XG4iLCJleHBvcnQgKiBmcm9tICcuL0NvbW1vbic7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsZ3VuQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzJztcbmV4cG9ydCAqIGZyb20gJy4vU3RhdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdXBwcmVzc2lvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL0V2ZW50Q2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vV2ViaG9va3MnO1xuZXhwb3J0ICogZnJvbSAnLi9NZXNzYWdlcyc7XG5leHBvcnQgKiBmcm9tICcuL1JvdXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL0lQcyc7XG5leHBvcnQgKiBmcm9tICcuL0lQUG9vbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdWJhY2NvdW50cyc7XG4iLCJleHBvcnQgdHlwZSBBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiBhbnk7XG59XG4iLCJleHBvcnQgdHlwZSBBUElFcnJvck9wdGlvbnMgPSB7XG4gIGhlYWRlcnM/OiB7IFtrZXk6IHN0cmluZ106IHVua25vd24gfTtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIGJvZHk6IHtcbiAgICBlcnJvcj86IHN0cmluZyxcbiAgICBtZXNzYWdlPzogc3RyaW5nXG4gIH07XG4gIHVybD86IHN0cmluZztcbiAgc3RhdHVzVGV4dD86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQVBJRXJyb3JUeXBlID0ge1xuICBzdGFjazogc3RyaW5nO1xuICBzdGF0dXM6IG51bWJlcjtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBkZXRhaWxzOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgKiBhcyBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCB7IEZvcm1EYXRhSW5wdXRWYWx1ZSB9IGZyb20gJy4uL01lc3NhZ2VzJztcblxuZXhwb3J0IHR5cGUgRm9ybURhdGFPcHRpb25zID0ge1xuICBba2V5OiBzdHJpbmddOiBOb2RlRm9ybURhdGE7XG59XG5cbmV4cG9ydCB0eXBlIElucHV0Rm9ybURhdGEgPVxuICB7XG4gICAgbmV3KGZvcm0/OiBIVE1MRm9ybUVsZW1lbnQgfCB1bmRlZmluZWQsIHN1Ym1pdHRlcj86IEhUTUxFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZCk6IEZvcm1EYXRhO1xuICB9IHxcbiAge1xuICAgIG5ldyhvcHRpb25zPzogRm9ybURhdGFPcHRpb25zKTogTm9kZUZvcm1EYXRhXG4gIH1cblxuZXhwb3J0IHR5cGUgRm9ybURhdGFJbnB1dCA9IHtcbiAgW2tleTogc3RyaW5nXTogRm9ybURhdGFJbnB1dFZhbHVlO1xufTtcbiIsImV4cG9ydCB0eXBlIFBhZ2VzTGlzdCA9IHtcbiAgICBwcmV2aW91czogc3RyaW5nO1xuICAgIGZpcnN0OiBzdHJpbmc7XG4gICAgbGFzdDogc3RyaW5nO1xuICAgIG5leHQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VkUGFnZSA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHBhZ2U6IHN0cmluZztcbiAgICBpdGVyYXRvclBvc2l0aW9uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgdXJsOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VkUGFnZXNMaXN0ID0ge1xuICAgIHByZXZpb3VzOiBQYXJzZWRQYWdlO1xuICAgIGZpcnN0OiBQYXJzZWRQYWdlO1xuICAgIGxhc3Q6IFBhcnNlZFBhZ2U7XG4gICAgbmV4dDogUGFyc2VkUGFnZTtcbn1cblxuZXhwb3J0IHR5cGUgUGFnZXNMaXN0QWNjdW11bGF0b3IgPSB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBQYXJzZWRQYWdlO1xufVxuXG5leHBvcnQgdHlwZSBSZXNwb25zZVdpdGhQYWdpbmcgPSB7XG4gICAgYm9keToge1xuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdFxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgUXVlcnlXaXRoUGFnZSA9IHtcbiAgICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkVXJsQW5kUXVlcnkgPSB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgdXBkYXRlZFF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbn1cbiIsImltcG9ydCB7IEF4aW9zUmVxdWVzdEhlYWRlcnMsIFJhd0F4aW9zUmVxdWVzdEhlYWRlcnMgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBNYWlsZ3VuQ2xpZW50T3B0aW9ucyB9IGZyb20gJy4uL01haWxndW5DbGllbnQnO1xuXG5leHBvcnQgdHlwZSBPbkNhbGxFbXB0eUhlYWRlcnMgPSB7XG4gIFtrZXk6IHN0cmluZ106IHVuZGVmaW5lZDtcbn1cbmV4cG9ydCB0eXBlIFJlcXVlc3RPcHRpb25zID0gTWFpbGd1bkNsaWVudE9wdGlvbnMgJiB7XG4gIGhlYWRlcnM6IEF4aW9zUmVxdWVzdEhlYWRlcnMgfCBSYXdBeGlvc1JlcXVlc3RIZWFkZXJzO1xuICB0aW1lb3V0OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIE9uQ2FsbFJlcXVlc3RPcHRpb25zID0ge1xuICB0aW1lb3V0PzogbnVtYmVyO1xuICBoZWFkZXJzPzogQXhpb3NSZXF1ZXN0SGVhZGVycyB8IFJhd0F4aW9zUmVxdWVzdEhlYWRlcnM7XG4gIHF1ZXJ5PzogYW55O1xuICBba2V5OiBzdHJpbmddOiB1bmtub3duIHwgdW5kZWZpbmVkO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9FcnJvcic7XG5leHBvcnQgKiBmcm9tICcuL0FwaVJlc3BvbnNlJztcbmV4cG9ydCAqIGZyb20gJy4vRm9ybURhdGEnO1xuZXhwb3J0ICogZnJvbSAnLi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmV4cG9ydCAqIGZyb20gJy4vUmVxdWVzdE9wdGlvbnMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFsc1F1ZXJ5ID0ge1xuICAgIGxpbWl0OiBudW1iZXI7XG4gICAgc2tpcDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFscyA9IHtcbiAgICBsb2dpbjogc3RyaW5nO1xuICAgIHBhc3N3b3JkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzSXRlbSA9IHtcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmcsXG4gICAgbG9naW46IHN0cmluZyxcbiAgICBtYWlsYm94OiBzdHJpbmcsXG4gICAgc2l6ZV9ieXRlczogbnVtYmVyIHwgbnVsbFxufVxuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogRG9tYWluQ3JlZGVudGlhbHNJdGVtW107XG4gICAgICAgIHRvdGFsX2NvdW50OiBudW1iZXI7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFsc0xpc3QgPSB7XG4gICAgaXRlbXM6IERvbWFpbkNyZWRlbnRpYWxzSXRlbVtdO1xuICAgIHRvdGFsQ291bnQ6IG51bWJlcjtcbn1cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyLFxuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzcGVjPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXIsXG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcixcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgc3BlYzogc3RyaW5nO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhID0ge1xuICAgIHBhc3N3b3JkOiBzdHJpbmc7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCB7IFJlc29sdXRpb24gfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NRdWVyeSA9IHtcbiAgICBsaW1pdDogbnVtYmVyO1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSA9IHtcbiAgICBldmVudDogc3RyaW5nO1xuICAgIHN0YXJ0PzogbnVtYmVyO1xuICAgIGVuZD86IG51bWJlcjtcbiAgICByZXNvbHV0aW9uPzogUmVzb2x1dGlvbjtcbiAgICBkdXJhdGlvbj86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc0l0ZW1JbmZvID0ge1xuICAgIHRhZzogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgJ2ZpcnN0LXNlZW4nOiBzdHJpbmcsXG4gICAgJ2xhc3Qtc2Vlbic6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzSXRlbSA9IHtcbiAgICB0YWc6IHN0cmluZyxcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgICdmaXJzdC1zZWVuJzogRGF0ZSxcbiAgICAnbGFzdC1zZWVuJzogRGF0ZVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzUmVzcG9uc2VEYXRhID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IERvbWFpblRhZ3NJdGVtSW5mb1tdO1xuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdFxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc0xpc3QgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgaXRlbXM6IERvbWFpblRhZ3NJdGVtW107XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc01lc3NhZ2VSZXMgPSB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHN0YXR1cz86IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0gPSB7XG4gICAgdGltZTpzdHJpbmdcbiAgICBhY2NlcHRlZD86IHtcbiAgICAgICAgaW5jb21pbmc6IG51bWJlcjtcbiAgICAgICAgb3V0Z29pbmc6IG51bWJlcjtcbiAgICAgICAgdG90YWw6IG51bWJlclxuICAgIH1cbiAgICBkZWxpdmVyZWQ/OiB7XG4gICAgICAgIHNtdHA6IG51bWJlcjtcbiAgICAgICAgaHR0cDogbnVtYmVyO1xuICAgICAgICBvcHRpbWl6ZWQ6IG51bWJlcjtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIG9wZW5lZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIGZhaWxlZD86IHtcbiAgICAgICAgdGVtcG9yYXJ5OntcbiAgICAgICAgICAgIGVzcGJsb2NrOiBudW1iZXI7XG4gICAgICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgICAgICB9O1xuICAgICAgICBwZXJtYW5lbnQ6IHtcbiAgICAgICAgICAgICdzdXBwcmVzcy1ib3VuY2UnOiBudW1iZXI7XG4gICAgICAgICAgICAnc3VwcHJlc3MtdW5zdWJzY3JpYmUnOiBudW1iZXI7XG4gICAgICAgICAgICAnc3VwcHJlc3MtY29tcGxhaW50JzogbnVtYmVyO1xuICAgICAgICAgICAgYm91bmNlOiBudW1iZXI7XG4gICAgICAgICAgICAnZGVsYXllZC1ib3VuY2UnOiBudW1iZXI7XG4gICAgICAgICAgICB3ZWJob29rOiBudW1iZXI7XG4gICAgICAgICAgICBvcHRpbWl6ZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjbGlja2VkPzoge1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH07XG4gICAgdW5zdWJzY3JpYmVkPzoge1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH07XG4gICAgY29tcGxhaW5lZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIHN0b3JlZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSA9IHtcbiAgICBib2R5OntcbiAgICAgICAgdGFnOiBzdHJpbmc7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgICAgIHN0YXJ0OiBzdHJpbmc7XG4gICAgICAgIGVuZDogc3RyaW5nO1xuICAgICAgICByZXNvbHV0aW9uOiBSZXNvbHV0aW9uO1xuICAgICAgICBzdGF0czogRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW1bXTtcbiAgICB9XG59XG5leHBvcnQgdHlwZSBEb21haW5UYWdTdGF0aXN0aWNJdGVtID0gT21pdCA8RG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0sICd0aW1lJz4gJiB7XG4gICAgdGltZTogRGF0ZVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIHRhZzpzdHJpbmc7XG4gICAgICAgIGNvdW50cnk6IHtcbiAgICAgICAgICAgIFtrZXk6c3RyaW5nXToge1xuICAgICAgICAgICAgICAgIGNsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bmlxdWVfb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbiA9IHtcbiAgICB0YWc6c3RyaW5nO1xuICAgIGNvdW50cnk6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICAgICAgY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgY29tcGxhaW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICB1bmlxdWVfY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5pcXVlX29wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ1Byb3ZpZGVyc0FQSVJlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgdGFnOnN0cmluZztcbiAgICAgICAgcHJvdmlkZXI6IHtcbiAgICAgICAgICAgIFtrZXk6c3RyaW5nXToge1xuICAgICAgICAgICAgICAgIGFjY2VwdGVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIGNvbXBsYWluZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBkZWxpdmVyZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBvcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bmlxdWVfY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuaXF1ZV9vcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uID0ge1xuICAgIHRhZzogc3RyaW5nO1xuICAgIHByb3ZpZGVyOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHtcbiAgICAgICAgICAgIGFjY2VwdGVkOiBudW1iZXI7XG4gICAgICAgICAgICBjbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgICAgICAgICBkZWxpdmVyZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIG9wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuaXF1ZV9vcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlZDogbnVtYmVyO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgRGV2aWNlU3RhdGlzdGljID0ge1xuICAgIGNsaWNrZWQ6IG51bWJlcjtcbiAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgb3BlbmVkOiBudW1iZXI7XG4gICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICB1bmlxdWVfb3BlbmVkOiBudW1iZXI7XG4gICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERldmljZXNUeXBlcyA9IHtcbiAgICBkZXNrdG9wOiBEZXZpY2VTdGF0aXN0aWM7XG4gICAgbW9iaWxlOiBEZXZpY2VTdGF0aXN0aWM7XG4gICAgdGFibGV0OiBEZXZpY2VTdGF0aXN0aWM7XG4gICAgdW5rbm93bjogRGV2aWNlU3RhdGlzdGljO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdEZXZpY2VzQVBJUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICB0YWc6c3RyaW5nO1xuICAgICAgICBkZXZpY2U6IERldmljZXNUeXBlcztcbiAgICB9XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbiA9IHtcbiAgICB0YWc6IHN0cmluZztcbiAgICBkZXZpY2U6IERldmljZXNUeXBlcztcbn1cbiIsImltcG9ydCB7IFllc05vIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSURvbWFpblRlbXBsYXRlIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcbmltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBEb21haW5UZW1wbGF0ZURhdGEgPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgdGVtcGxhdGU6IHN0cmluZztcbiAgICB0YWc/OiBzdHJpbmc7XG4gICAgZW5naW5lPzogc3RyaW5nO1xuICAgIGNvbW1lbnQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGEgPSB7XG4gICAgdGVtcGxhdGU6IHN0cmluZztcbiAgICB0YWc6IHN0cmluZztcbiAgICBlbmdpbmU/OiBzdHJpbmc7XG4gICAgY29tbWVudD86IHN0cmluZztcbiAgICBhY3RpdmU/OiBZZXNObztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhID0ge1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGEgPSB7XG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7XG4gICAgY29tbWVudD86IHN0cmluZztcbiAgICBhY3RpdmU/OiBZZXNObztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGVtcGxhdGVzUXVlcnkgPSB7XG4gICAgLyoqICdwYWdlJyAob3B0aW9uYWxseSAncCcpIHBhcmFtcyBmcm9tIHByZXZpb3VzIHJlc3BvbnNlJ3MgJ3BhZ2luZycgb2JqZWN0LlxuICAgICAqIFZhbHVlIG11c3QgYmUgc3RyaW5naWZpZWQgYXMgcXVlcnkgcGFyYW1zLiBFeDogJz9wYWdlPWZpcnN0JywnP3BhZ2U9bmV4dCZwPW5hbWUtb2YtbGFzdC1pdGVtJ1xuICAgICAuLi4uICovXG4gICAgcGFnZT86IGA/JHtzdHJpbmd9YDtcbiAgICAvKiogTnVtYmVyIG9mIHJlY29yZHMgdG8gcmV0cmlldmUuIERlZmF1bHQgdmFsdWUgaXMgMTAuICovXG4gICAgbGltaXQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFRlbXBsYXRlUXVlcnkgPSB7XG4gICAgYWN0aXZlOiBZZXNObztcbn1cblxuZXhwb3J0IHR5cGUgU2hvcnRUZW1wbGF0ZVZlcnNpb24gPSB7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgZW5naW5lOiBzdHJpbmc7XG4gICAgbWptbDogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbiAgICBjb21tZW50OiBzdHJpbmc7XG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIGlkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFRlbXBsYXRlVmVyc2lvbiA9IFNob3J0VGVtcGxhdGVWZXJzaW9uICYge1xuICAgIHRlbXBsYXRlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IElEb21haW5UZW1wbGF0ZVtdO1xuICAgICAgICBwYWdpbmc6IHtcbiAgICAgICAgICAgIGZpcnN0OiBzdHJpbmc7XG4gICAgICAgICAgICBsYXN0OiBzdHJpbmc7XG4gICAgICAgICAgICBuZXh0OiBzdHJpbmc7XG4gICAgICAgICAgICBwcmV2aW91czogc3RyaW5nO1xuICAgICAgICB9O1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQgPSB7XG4gICAgICAgIGl0ZW1zOiBJRG9tYWluVGVtcGxhdGVbXTtcbiAgICAgICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbiAgICAgICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICB0ZW1wbGF0ZTogSURvbWFpblRlbXBsYXRlO1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZ1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdGVtcGxhdGVOYW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBOb3RpZmljYXRpb25BUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBOb3RpZmljYXRpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgdGVtcGxhdGU6IElEb21haW5UZW1wbGF0ZTtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG59XG5cbmV4cG9ydCB0eXBlIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICAgICAgdmVyc2lvbjoge1xuICAgICAgICAgICAgICAgIHRhZzogc3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmc7XG4gICAgdGVtcGxhdGVWZXJzaW9uOiB7XG4gICAgICAgIHRhZzogc3RyaW5nO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgICAgICAgICAgY3JlYXRlZEF0OiBzdHJpbmc7XG4gICAgICAgICAgICBjcmVhdGVkQnk6IHN0cmluZztcbiAgICAgICAgICAgIGlkOiBzdHJpbmc7XG4gICAgICAgICAgICB2ZXJzaW9uczogU2hvcnRUZW1wbGF0ZVZlcnNpb25bXVxuICAgICAgICB9XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0ID0ge1xuICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5leHBvcnQgdHlwZSBEb21haW5UcmFja2luZ0RhdGEgPSB7XG4gIGNsaWNrOiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuICBvcGVuOiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuICB1bnN1YnNjcmliZToge1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBodG1sX2Zvb3Rlcjogc3RyaW5nO1xuICAgIHRleHRfZm9vdGVyOiBzdHJpbmc7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVHJhY2tpbmdSZXNwb25zZSA9IHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIGJvZHk6IHtcbiAgICB0cmFja2luZzogRG9tYWluVHJhY2tpbmdEYXRhXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRPcGVuVHJhY2tpbmcgPSB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgb3Blbj86IHsgYWN0aXZlOiBib29sZWFuIH07XG4gIGNsaWNrPzogeyBhY3RpdmU6IGJvb2xlYW4gfCAnaHRtbG9ubHknIH07XG4gIHVuc3Vic2NyaWJlPzoge1xuICAgIGFjdGl2ZTogYm9vbGVhbixcbiAgICBodG1sX2Zvb3Rlcjogc3RyaW5nO1xuICAgIHRleHRfZm9vdGVyOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBib2R5OiBVcGRhdGVkT3BlblRyYWNraW5nO1xufVxuXG5leHBvcnQgdHlwZSBPcGVuVHJhY2tpbmdJbmZvID0ge1xuICBhY3RpdmU6ICd5ZXMnIHwgJ25vJyB8ICd0cnVlJyB8ICdmYWxzZSc7XG59XG5leHBvcnQgdHlwZSBDbGlja1RyYWNraW5nSW5mbyA9IHtcbiAgYWN0aXZlOiAneWVzJyB8ICdubycgfCAndHJ1ZScgfCAnZmFsc2UnIHwgJ2h0bWxvbmx5Jztcbn1cblxuZXhwb3J0IHR5cGUgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8gPSB7XG4gIGFjdGl2ZTogJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwgJ2ZhbHNlJztcbiAgaHRtbF9mb290ZXI6IHN0cmluZztcbiAgdGV4dF9mb290ZXI6IHN0cmluZztcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgRG9tYWluc1F1ZXJ5ID0ge1xuICAgIGF1dGhvcml0eT8gOiBzdHJpbmc7XG4gICAgc3RhdGU/OiAnYWN0aXZlJyB8ICd1bnZlcmlmaWVkJyB8ICdkaXNhYmxlZCc7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgc2tpcD86IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVXBkYXRlSW5mbyA9IHtcbiAgICBzcGFtX2FjdGlvbj86ICdkaXNhYmxlZCcgfCAnYmxvY2snIHwgJ3RhZyc7XG4gICAgd2ViX3NjaGVtZT86ICdodHRwJyB8ICdodHRwcyc7XG4gICAgd2lsZGNhcmQ/OiBib29sZWFuIHwgJ3RydWUnIHwgJ2ZhbHNlJztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVXBkYXRlSW5mb1JlcSA9IERvbWFpblVwZGF0ZUluZm8gJiB7XG4gICAgd2lsZGNhcmQ/OiAndHJ1ZScgfCAnZmFsc2UnOyAvLyBhcGkgc3VwcG9ydHMgb25seSBzdHJpbmdzXG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkluZm8gPSBEb21haW5VcGRhdGVJbmZvICYge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzbXRwX3Bhc3N3b3JkOiBzdHJpbmc7XG4gICAgZm9yY2VfZGtpbV9hdXRob3JpdHk/OiBib29sZWFuIHwgJ3RydWUnIHwgJ2ZhbHNlJztcbiAgICBka2ltX2tleV9zaXplPzogMTAyNCB8IDIwNDg7XG4gICAgaXBzPzogJyc7XG4gICAgcG9vbF9pZD86ICcnO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5JbmZvUmVxID0gRG9tYWluSW5mbyAmIHtcbiAgICBmb3JjZV9ka2ltX2F1dGhvcml0eT86ICd0cnVlJyB8ICdmYWxzZSc7XG59XG5cbmV4cG9ydCB0eXBlIEJvb2xUb1N0cmluZyA9IHtcbiAgICBmb3JjZV9ka2ltX2F1dGhvcml0eT86IERvbWFpbkluZm9bJ2ZvcmNlX2RraW1fYXV0aG9yaXR5J107XG4gICAgd2lsZGNhcmQ/OiBEb21haW5VcGRhdGVJbmZvWyd3aWxkY2FyZCddO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5TaG9ydERhdGEgPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICAgIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xuICAgIHN0YXRlOiBzdHJpbmc7XG4gICAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gICAgc3BhbV9hY3Rpb246IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gICAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICAgIHNtdHBfbG9naW46IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkRhdGEgPSBEb21haW5TaG9ydERhdGEgJiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBpc19kaXNhYmxlZDogYm9vbGVhbjtcbiAgICB3ZWJfcHJlZml4OiBzdHJpbmc7XG4gICAgd2ViX3NjaGVtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERvbWFpbnNMaXN0SXRlbSBleHRlbmRzIERvbWFpblNob3J0RGF0YXtcbiAgICByZWNlaXZpbmdfZG5zX3JlY29yZHM6IG51bGw7XG4gICAgc2VuZGluZ19kbnNfcmVjb3JkczogbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBETlNSZWNvcmQge1xuICAgIGNhY2hlZDogYW55W107XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJlY29yZF90eXBlOiBzdHJpbmc7XG4gICAgdmFsaWQ6IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIHByaW9yaXR5Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5SZXNwb25zZURhdGEgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBkb21haW46IERvbWFpbkRhdGE7XG4gICAgICAgIG1lc3NhZ2U/OiBzdHJpbmc7XG4gICAgICAgIHJlY2VpdmluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW107XG4gICAgICAgIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluTGlzdFJlc3BvbnNlRGF0YSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBEb21haW5zTGlzdEl0ZW1bXSB8IG51bGw7XG4gICAgICAgIHRvdGFsX2NvdW50OiBudW1iZXI7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBNZXNzYWdlUmVzcG9uc2UgPSB7XG4gICAgbWVzc2FnZSA6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBEZXN0cm95ZWREb21haW5SZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiBNZXNzYWdlUmVzcG9uc2Vcbn1cblxuZXhwb3J0IHR5cGUgQ29ubmVjdGlvblNldHRpbmdzID0ge1xuICAgIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICAgIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xufVxuZXhwb3J0IHR5cGUgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICBjb25uZWN0aW9uOiBDb25uZWN0aW9uU2V0dGluZ3NcbiAgICB9XG4gICAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyA9IHtcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgcmVxdWlyZV90bHM6IGJvb2xlYW4sXG4gICAgc2tpcF92ZXJpZmljYXRpb246IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcyA9IHtcbiAgICBib2R5OiBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzLFxuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIERLSU1BdXRob3JpdHlJbmZvID0ge1xuICAgIHNlbGY6IGJvb2xlYW4gfCAneWVzJyB8ICdubycgfCAndHJ1ZScgfCdmYWxzZSdcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZERLSU1BdXRob3JpdHkgPSB7XG4gICAgY2hhbmdlZDogYm9vbGVhbixcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgc2VuZGluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW11cbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZERLSU1BdXRob3JpdHlSZXNwb25zZSA9IHtcbiAgICBib2R5OiBVcGRhdGVkREtJTUF1dGhvcml0eSxcbiAgICBzdGF0dXM6IDIwMFxufVxuXG5leHBvcnQgdHlwZSBES0lNU2VsZWN0b3JJbmZvID0ge1xuICAgIGRraW1TZWxlY3Rvcjogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRES0lNU2VsZWN0b3JSZXNwb25zZSA9IHtcbiAgICBib2R5Ok1lc3NhZ2VSZXNwb25zZSxcbiAgICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBXZWJQcmVmaXhJbmZvID0ge1xuICAgIHdlYlByZWZpeDogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRXZWJQcmVmaXggPSB7XG4gICAgbWVzc2FnZSA6IHN0cmluZ1xufVxuZXhwb3J0IHR5cGUgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlID0ge1xuICAgIGJvZHk6TWVzc2FnZVJlc3BvbnNlLFxuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFJlcGxhY2VtZW50Rm9yUG9vbCA9IHtcbiAgICBwb29sX2lkPzogc3RyaW5nO1xuICAgIGlwPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBURG9tYWluID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgc3RhdGU6IHN0cmluZztcbiAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gIHNwYW1fYWN0aW9uOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICBzbXRwX2xvZ2luOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgaWQ/OiBzdHJpbmc7XG4gIGlzX2Rpc2FibGVkPzogYm9vbGVhbjtcbiAgd2ViX3ByZWZpeD86IHN0cmluZztcbiAgd2ViX3NjaGVtZT86IHN0cmluZztcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vRG9tYWluQ3JlZGVudGlhbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5zJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGFncyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRlbXBsYXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRyYWNraW5nJztcbiIsImltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcblxuZXhwb3J0IHR5cGUgRXZlbnRzUGFnZSA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG51bWJlcjogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBGaWx0ZXJGaWVsZCA9IHtcbiAgICBldmVudD86IHN0cmluZztcbiAgICBsaXN0Pzogc3RyaW5nO1xuICAgIGF0dGFjaG1lbnQ/OiBzdHJpbmc7XG4gICAgZnJvbT86IHN0cmluZztcbiAgICAnbWVzc2FnZS1pZCc/OiBzdHJpbmc7XG4gICAgc3ViamVjdD86IHN0cmluZztcbiAgICB0bz86IHN0cmluZztcbiAgICBzaXplPzogc3RyaW5nO1xuICAgIHJlY2lwaWVudD86IHN0cmluZztcbiAgICByZWNpcGllbnRzPzogc3RyaW5nO1xuICAgIHRhZ3M/OiBzdHJpbmc7XG4gICAgc2V2ZXJpdHk/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEV2ZW50c1F1ZXJ5ID0gRmlsdGVyRmllbGQgJiB7XG4gICAgcGFnZT86IHN0cmluZztcbiAgICBiZWdpbj86IHN0cmluZztcbiAgICBlbmQ/OiBzdHJpbmc7XG4gICAgYXNjZW5kaW5nPzogJ3llcyd8ICdubyc7XG4gICAgbGltaXQ/OiBudW1iZXI7XG59XG5leHBvcnQgdHlwZSBFdmVudHNSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBbXTtcbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3Q7XG4gICAgfSxcbiAgICBzdGF0dXM6IG51bWJlclxufVxuZXhwb3J0IHR5cGUgRG9tYWluRXZlbnQgPSB7XG4gICAgc2V2ZXJpdHk6IHN0cmluZztcbiAgICB0YWdzOiBzdHJpbmdbXTtcbiAgICBzdG9yYWdlOiB7XG4gICAgICAgIHVybDogc3RyaW5nO1xuICAgICAgICBrZXk6IHN0cmluZ1xuICAgIH07XG4gICAgJ2RlbGl2ZXJ5LXN0YXR1cyc6IHtcbiAgICAgICAgdGxzOiBib29sZWFuO1xuICAgICAgICAnbXgtaG9zdCc6IHN0cmluZztcbiAgICAgICAgY29kZTogbnVtYmVyO1xuICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgICAgICAnc2Vzc2lvbi1zZWNvbmRzJzogbnVtYmVyO1xuICAgICAgICB1dGY4OiBib29sZWFuO1xuICAgICAgICAnYXR0ZW1wdC1ubyc6IG51bWJlcjtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICAnY2VydGlmaWNhdGUtdmVyaWZpZWQnOiBib29sZWFuXG4gICAgfTtcbiAgICAncmVjaXBpZW50LWRvbWFpbic6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIGNhbXBhaWduczogW107XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgJ3VzZXItdmFyaWFibGVzJzoge1xuICAgICAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICAgIH07XG4gICAgZmxhZ3M6IHtcbiAgICAgICAgJ2lzLXJvdXRlZCc6IGJvb2xlYW47XG4gICAgICAgICdpcy1hdXRoZW50aWNhdGVkJzogYm9vbGVhbjtcbiAgICAgICAgJ2lzLXN5c3RlbS10ZXN0JzogYm9vbGVhbjtcbiAgICAgICAgJ2lzLXRlc3QtbW9kZSc6IGJvb2xlYW5cbiAgICB9O1xuICAgICdsb2ctbGV2ZWwnIDogc3RyaW5nO1xuICAgIHRlbXBsYXRlPzogdW5rbm93bjtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICBlbnZlbG9wZToge1xuICAgICAgICB0cmFuc3BvcnQ6IHN0cmluZztcbiAgICAgICAgc2VuZGVyOiBzdHJpbmc7XG4gICAgICAgICdzZW5kaW5nLWlwJzogc3RyaW5nO1xuICAgICAgICB0YXJnZXRzOiBzdHJpbmdcbiAgICB9O1xuICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgdG86IHN0cmluZztcbiAgICAgICAgICAgICdtZXNzYWdlLWlkJzogc3RyaW5nO1xuICAgICAgICAgICAgZnJvbTogc3RyaW5nO1xuICAgICAgICAgICAgc3ViamVjdDogc3RyaW5nXG4gICAgICAgIH07XG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXTtcbiAgICAgICAgc2l6ZTogMzA4XG4gICAgfTtcbiAgICByZWNpcGllbnQ6IHN0cmluZztcbiAgICBldmVudDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBFdmVudHNMaXN0ID0ge1xuICAgIGl0ZW1zOiBEb21haW5FdmVudFtdO1xuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0V2ZW50cyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIElwUG9vbCA9IHtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaXBzOiBzdHJpbmdbXTtcbiAgaXNfbGlua2VkOiBib29sZWFuO1xuICBuYW1lOiBzdHJpbmc7XG4gIHBvb2xfaWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sTGlzdFJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgaXBfcG9vbHM6IElwUG9vbCxcbiAgICBtZXNzYWdlOiBzdHJpbmdcbiAgfSxcbiAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sTGlzdFJlc3VsdCA9IHtcbiAgaXBfcG9vbHM6IElwUG9vbCxcbiAgbWVzc2FnZTogc3RyaW5nLFxuICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xVcGRhdGVEYXRhID0ge1xuICBuYW1lOiBzdHJpbmcsXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gIGlwczogc3RyaW5nW11cbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sTWVzc2FnZVJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICB9XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xNZXNzYWdlUmVzdWx0ID0ge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xEZWxldGVEYXRhID0ge1xuICBpcD86IHN0cmluZyxcbiAgcG9vbF9pZD86IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xDcmVhdGVEYXRhID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBpcHM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sQ3JlYXRlUmVzcG9uc2UgPSB7XG4gIGJvZHk6IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcG9vbF9pZDogc3RyaW5nO1xuICB9XG4gIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbENyZWF0ZVJlc3VsdCA9IHtcbiAgc3RhdHVzOiBudW1iZXJcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBwb29sX2lkOiBzdHJpbmc7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lwUG9vbHMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBJcHNMaXN0UmVzcG9uc2VCb2R5ID0ge1xuICBhc3NpZ25hYmxlX3RvX3Bvb2xzOiBib29sZWFuO1xuICBpdGVtczogc3RyaW5nW107XG4gIHRvdGFsX2NvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIElwRGF0YSA9IHtcbiAgaXA6IHN0cmluZztcbiAgZGVkaWNhdGVkOiBib29sZWFuO1xuICByZG5zOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIElQc0xpc3RRdWVyeSA9IHtcbiAgZGVkaWNhdGVkOiBib29sZWFuIHwgc3RyaW5nXG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lQcyc7XG4iLCJpbXBvcnQgeyBBeGlvc1Byb3h5Q29uZmlnIH0gZnJvbSAnYXhpb3MnO1xuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBNYWlsZ3VuQ2xpZW50T3B0aW9ucyA9IHtcbiAgdXNlcm5hbWU6IHN0cmluZztcbiAga2V5OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgcHVibGljX2tleT86IHN0cmluZztcbiAgdGltZW91dD86IG51bWJlcjtcbiAgcHJveHk/OiBBeGlvc1Byb3h5Q29uZmlnO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NYWlsZ3VuQ2xpZW50T3B0aW9ucyc7XG4iLCJpbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5pbXBvcnQgeyBNYWlsaW5nTGlzdCB9IGZyb20gJy4vTWFpbGluZ0xpc3RzJztcblxuZXhwb3J0IHR5cGUgTWFpbExpc3RNZW1iZXIgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzdWJzY3JpYmVkOiBib29sZWFuLFxuICAgIHZhcnM6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93blxuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIE1haWxMaXN0TWVtYmVyc1F1ZXJ5ID0ge1xuICAgIHN1YnNjcmliZWQ/OiAneWVzJyB8ICdubyc7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgcGFnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVNZW1iZXJzRGF0YSA9IHtcbiAgICBtZW1iZXJzOiBBcnJheTxNYWlsTGlzdE1lbWJlcj47XG4gICAgdXBzZXJ0OiAneWVzJyB8ICdubyc7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlTWVtYmVyc1JlcURhdGEgPSB7XG4gICAgbWVtYmVyczogc3RyaW5nO1xuICAgIHVwc2VydDogJ3llcycgfCAnbm8nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdmFycz86IHN0cmluZztcbiAgICBzdWJzY3JpYmVkPzogJ3llcycgfCAnbm8nIHwgYm9vbGVhbjtcbiAgICB1cHNlcnQ/OiAneWVzJyB8ICdubyc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1JlcSA9IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICB2YXJzPzogc3RyaW5nO1xuICAgIHN1YnNjcmliZWQ/OiAneWVzJyB8ICdubycgfCBib29sZWFuO1xuICAgIHVwc2VydD86ICd5ZXMnIHwgJ25vJztcbn1cblxuZXhwb3J0IHR5cGUgRGVsZXRlZE1lbWJlciA9IHtcbiAgICBtZW1iZXI6IHtcbiAgICAgICAgYWRkcmVzczogc3RyaW5nO1xuICAgIH0sXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICB9XG5cbmV4cG9ydCB0eXBlIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlID0ge1xuICAgIGxpc3Q6IE1haWxpbmdMaXN0O1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAndGFzay1pZCc6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWFpbExpc3RNZW1iZXJzUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogTWFpbExpc3RNZW1iZXJbXVxuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdFxuICAgIH0sXG4gICAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgTWFpbExpc3RNZW1iZXJzUmVzdWx0ID0ge1xuICAgIGl0ZW1zOiBNYWlsTGlzdE1lbWJlcltdXG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdFxuICAgIHN0YXR1czogbnVtYmVyXG59XG4iLCJpbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgTGlzdHNRdWVyeSA9IHtcbiAgICBhZGRyZXNzPzogc3RyaW5nO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVVwZGF0ZUxpc3QgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgYWNjZXNzX2xldmVsPzogJ3JlYWRvbmx5JyB8ICdtZW1iZXJzJ3wgJ2V2ZXJ5b25lJztcbiAgICByZXBseV9wcmVmZXJlbmNlPzogJ2xpc3QnIHwgJ3NlbmRlcic7XG59XG5cbmV4cG9ydCB0eXBlIERlc3Ryb3llZExpc3QgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgU3RhcnRWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgICBkb3dubG9hZF91cmw6IHtcbiAgICAgIGNzdjogc3RyaW5nO1xuICAgICAganNvbjogc3RyaW5nXG4gICAgfTtcbiAgICBpZDogc3RyaW5nO1xuICAgIHF1YW50aXR5OiBudW1iZXI7XG4gICAgcmVjb3Jkc19wcm9jZXNzZWQ6IG51bWJlcjtcbiAgICBzdW1tYXJ5OiB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgY2F0Y2hfYWxsOiBudW1iZXI7XG4gICAgICAgIGRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgIGRvX25vdF9zZW5kOiBudW1iZXI7XG4gICAgICAgIHVuZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgdW5rbm93bjogbnVtYmVyXG4gICAgICB9XG4gICAgICByaXNrOiB7XG4gICAgICAgIGhpZ2g6IG51bWJlcjtcbiAgICAgICAgbG93OiBudW1iZXI7XG4gICAgICAgIG1lZGl1bTogbnVtYmVyO1xuICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RWYWxpZGF0aW9uQXBpUmVzcG9uc2UgPSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXNwb25zZSAmIHtcbiAgICBjcmVhdGVkX2F0OiBudW1iZXI7XG59XG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHREYXRhID0gTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzcG9uc2UgJiB7XG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcbn1cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICB2YWxpZGF0aW9uUmVzdWx0OiBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHREYXRhO1xufVxuXG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3QgPSB7XG4gICAgYWNjZXNzX2xldmVsOiBzdHJpbmc7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIG1lbWJlcnNfY291bnQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcmVwbHlfcHJlZmVyZW5jZTogbnVsbCB8IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RSZXN1bHQgPSB7XG4gICAgaXRlbXM6IE1haWxpbmdMaXN0W107XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdFxufVxuXG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdEFwaVJlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IE1haWxpbmdMaXN0W107XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICAgIH1cbiAgICBzdGF0dXM6IG51bWJlcjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RNZW1iZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKipcbiAqIEVuc3VyZXMgdGhlIG9iamVjdCBoYXMgbGVhc3Qgb25lIGtleSBwcmVzZW50IGFuZCBub3QgdW5kZWZpbmVkXG4gKlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ5NzI1MTk4fVxuICovXG5leHBvcnQgdHlwZSBBdExlYXN0T25lS2V5UHJlc2VudDxcbiAgT2JqZWN0XyxcbiAgS2V5cyBleHRlbmRzIGtleW9mIE9iamVjdF8gPSBrZXlvZiBPYmplY3RfXG4+ID0gUGljazxPYmplY3RfLCBFeGNsdWRlPGtleW9mIE9iamVjdF8sIEtleXM+PiAmXG4gIHtcbiAgICBbSyBpbiBLZXlzXS0/OiBSZXF1aXJlZDxQaWNrPE9iamVjdF8sIEs+PiAmXG4gICAgICBQYXJ0aWFsPFBpY2s8T2JqZWN0XywgRXhjbHVkZTxLZXlzLCBLPj4+O1xuICB9W0tleXNdO1xuXG5leHBvcnQgdHlwZSBNaW1lTWVzc2FnZSA9IHN0cmluZyB8IEJsb2IgfCBCdWZmZXIgfCBOb2RlSlMuUmVhZGFibGVTdHJlYW07XG5leHBvcnQgdHlwZSBDdXN0b21GaWxlRGF0YSA9IHN0cmluZyB8IEJsb2IgfCBGaWxlIHwgQnVmZmVyIHwgTm9kZUpTLlJlYWRhYmxlU3RyZWFtO1xuXG5leHBvcnQgdHlwZSBDdXN0b21GaWxlID0ge1xuICBkYXRhOiBDdXN0b21GaWxlRGF0YTtcbiAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gIGNvbnRlbnRUeXBlPyA6IHN0cmluZztcbiAga25vd25MZW5ndGg/OiBudW1iZXI7XG4gIFtrZXk6IHN0cmluZ106IHVua25vd247XG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VBdHRhY2htZW50ID1cbiAgQ3VzdG9tRmlsZVxuICB8IEN1c3RvbUZpbGVbXVxuICB8IEZpbGVcbiAgfCBGaWxlW11cbiAgfCBzdHJpbmdcbiAgfCBDdXN0b21GaWxlRGF0YVxuICB8IEN1c3RvbUZpbGVEYXRhW11cblxuZXhwb3J0IHR5cGUgRm9ybURhdGFJbnB1dFZhbHVlID1cbiAgTWltZU1lc3NhZ2VcbiAgfCBDdXN0b21GaWxlRGF0YVxuICB8IHN0cmluZ1xuICB8IHN0cmluZ1tdXG4gIHwgYm9vbGVhblxuICB8IE1lc3NhZ2VBdHRhY2htZW50XG4gIHwgdW5kZWZpbmVkXG4gIHwgbnVtYmVyIC8vIGRvYyBzYXlzIGl0IHNob3VsZCBiZSBhdXRvLWNvbnZlcnRlZCBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRm9ybURhdGEvYXBwZW5kXG4gIHwgSnNvbk9iamVjdFxuXG5leHBvcnQgdHlwZSBKc29uUHJpbWl0aXZlID0gc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGw7XG5leHBvcnQgdHlwZSBKc29uQXJyYXkgPSBKc29uW107XG5leHBvcnQgdHlwZSBKc29uT2JqZWN0ID0geyBba2V5OiBzdHJpbmddOiBKc29uIH07XG5leHBvcnQgdHlwZSBKc29uQ29tcG9zaXRlID0gSnNvbkFycmF5IHwgSnNvbk9iamVjdDtcbmV4cG9ydCB0eXBlIEpzb24gPSBKc29uUHJpbWl0aXZlIHwgSnNvbkNvbXBvc2l0ZTtcblxuZXhwb3J0IHR5cGUgTWFpbGd1bk1lc3NhZ2VDb250ZW50ID0gQXRMZWFzdE9uZUtleVByZXNlbnQ8e1xuICAgIC8qKlxuICAgICAqIEJvZHkgb2YgdGhlIG1lc3NhZ2UuICh0ZXh0IHZlcnNpb24pXG4gICAgICovXG4gICAgdGV4dD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEJvZHkgb2YgdGhlIG1lc3NhZ2UuIChIVE1MIHZlcnNpb24pXG4gICAgICovXG4gICAgaHRtbD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBCb2R5IG9mIHRoZSBtZXNzYWdlLiAoTUlNRSB2ZXJzaW9uKVxuICAgICAqL1xuICAgIG1lc3NhZ2U/OiBNaW1lTWVzc2FnZTtcbiAgICAgLyoqXG4gICAgICogTmFtZSBvZiBhIHRlbXBsYXRlIHN0b3JlZCB2aWEgW3RlbXBsYXRlIEFQSV0oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC9hcGktdGVtcGxhdGVzLmh0bWwjYXBpLXRlbXBsYXRlcykuIFNlZSBbVGVtcGxhdGVzXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjdGVtcGxhdGluZykgZm9yIG1vcmUgaW5mb3JtYXRpb25cbiAgICAgKi9cbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbn0+O1xuXG5leHBvcnQgdHlwZSBNYWlsZ3VuTWVzc2FnZURhdGEgPSBNYWlsZ3VuTWVzc2FnZUNvbnRlbnQgJiB7XG4gICAgLyoqXG4gICAgICogRW1haWwgYWRkcmVzcyBmb3IgYEZyb21gIGhlYWRlclxuICAgICAqL1xuICAgIGZyb20/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBFbWFpbCBhZGRyZXNzIG9mIHRoZSByZWNpcGllbnQocykuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBgQm9iIDxib2JAaG9zdC5jb20+YC4gWW91IGNhbiB1c2UgY29tbWFzIHRvIHNlcGFyYXRlIG11bHRpcGxlIHJlY2lwaWVudHMuXG4gICAgICovXG4gICAgdG8/OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIFNhbWUgYXMgYFRvYCBidXQgZm9yIGBjYXJib24gY29weWBcbiAgICAgKi9cbiAgICBjYz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBgVG9gIGJ1dCBmb3IgYGJsaW5kIGNhcmJvbiBjb3B5YFxuICAgICAqL1xuICAgIGJjYz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogTWVzc2FnZSBzdWJqZWN0XG4gICAgICovXG4gICAgc3ViamVjdD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFtBTVBdKGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2dtYWlsL2FtcGVtYWlsLykgcGFydCBvZiB0aGUgbWVzc2FnZS4gUGxlYXNlIGZvbGxvdyBnb29nbGUgZ3VpZGVsaW5lcyB0byBjb21wb3NlIGFuZCBzZW5kIEFNUCBlbWFpbHMuXG4gICAgICovXG4gICAgJ2FtcC1odG1sJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEZpbGUgYXR0YWNobWVudC4gWW91IGNhbiBwb3N0IG11bHRpcGxlIGBhdHRhY2htZW50YCB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiAqKkltcG9ydGFudDoqKiBZb3UgbXVzdCB1c2UgYG11bHRpcGFydC9mb3JtLWRhdGFgIGVuY29kaW5nIHdoZW4gc2VuZGluZyBhdHRhY2htZW50cy5cbiAgICAgKi9cbiAgICBhdHRhY2htZW50PzogTWVzc2FnZUF0dGFjaG1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2htZW50IHdpdGggYGlubGluZWAgZGlzcG9zaXRpb24uIENhbiBiZSB1c2VkIHRvIHNlbmQgaW5saW5lIGltYWdlcyAoc2VlIGV4YW1wbGUpLlxuICAgICAqXG4gICAgICogWW91IGNhbiBwb3N0IG11bHRpcGxlIGBpbmxpbmVgIHZhbHVlcy5cbiAgICAgKi9cbiAgICBpbmxpbmU/OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyBwYXJhbWV0ZXIgdG8gc2VuZCBhIG1lc3NhZ2UgdG8gc3BlY2lmaWMgdmVyc2lvbiBvZiBhIHRlbXBsYXRlXG4gICAgICovXG4gICAgJ3Q6dmVyc2lvbic/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBQYXNzIGB5ZXNgIGlmIHlvdSB3YW50IHRvIGhhdmUgcmVuZGVyZWQgdGVtcGxhdGVcbiAgICAgKiBpbiB0aGUgdGV4dCBwYXJ0IG9mIHRoZSBtZXNzYWdlIGluIGNhc2Ugb2YgdGVtcGxhdGUgc2VuZGluZ1xuICAgICAqL1xuICAgICd0OnRleHQnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIEEgdmFsaWQgSlNPTi1lbmNvZGVkIGRpY3Rpb25hcnkgdXNlZCBhcyB0aGUgaW5wdXQgZm9yIHRlbXBsYXRlIHZhcmlhYmxlIGV4cGFuc2lvbi5cbiAgICAgKiBTZWUgW1RlbXBsYXRlc10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC9hcGktdGVtcGxhdGVzLmh0bWwjYXBpLXRlbXBsYXRlcykgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgJ3Q6dmFyaWFibGVzJz86IHN0cmluZyB8IEpzb25PYmplY3Q7XG5cbiAgICAvKipcbiAgICAgKiBUYWcgc3RyaW5nLiBTZWUgW1RhZ2dpbmddKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCN0YWdnaW5nKSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICAnbzp0YWcnPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzL2Rpc2FibGVzIERLSU0gc2lnbmF0dXJlcyBvbiBwZXItbWVzc2FnZSBiYXNpcy4gUGFzcyBgeWVzYCwgYG5vYCwgYHRydWVgIG9yIGBmYWxzZWBcbiAgICAgKi9cbiAgICAnbzpka2ltJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBEZXNpcmVkIHRpbWUgb2YgZGVsaXZlcnkuIFNlZSBbRGF0ZSBGb3JtYXRdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvYXBpLWludHJvLmh0bWwjZGF0ZS1mb3JtYXQpLlxuICAgICAqXG4gICAgICogTm90ZTogTWVzc2FnZXMgY2FuIGJlIHNjaGVkdWxlZCBmb3IgYSBtYXhpbXVtIG9mIDMgZGF5cyBpbiB0aGUgZnV0dXJlLlxuICAgICAqL1xuICAgICdvOmRlbGl2ZXJ5dGltZSc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIFNlbmQgVGltZSBPcHRpbWl6YXRpb24gKFNUTykgb24gYSBwZXItbWVzc2FnZSBiYXNpcy5cbiAgICAgKlxuICAgICAqIFN0cmluZyBzaG91bGQgYmUgc2V0IHRvIHRoZSBudW1iZXIgb2YgaG91cnMgaW4gYFswLTldK2hgIGZvcm1hdCxcbiAgICAgKiB3aXRoIHRoZSBtaW5pbXVtIGJlaW5nIGAyNGhgIGFuZCB0aGUgbWF4aW11bSBiZWluZyBgNzJoYC5cbiAgICAgKlxuICAgICAqIFRoaXMgdmFsdWUgZGVmaW5lcyB0aGUgdGltZSB3aW5kb3cgaW4gd2hpY2ggTWFpbGd1biB3aWxsIHJ1biB0aGUgb3B0aW1pemF0aW9uIGFsZ29yaXRobSBiYXNlZCBvbiBwcmlvciBlbmdhZ2VtZW50IGRhdGEgb2YgYSBnaXZlbiByZWNpcGllbnQuIFNlZSBbU2VuZGluZyBhIG1lc3NhZ2Ugd2l0aCBTVE9dKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCNzdG8tc2VuZGluZykgZm9yIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBfUGxlYXNlIG5vdGUgdGhhdCBTVE8gaXMgb25seSBhdmFpbGFibGUgb24gY2VydGFpbiBwbGFucy5cbiAgICAgKiBTZWUgd3d3Lm1haWxndW4uY29tL3ByaWNpbmcgZm9yIG1vcmUgaW5mby5fXG4gICAgICovXG4gICAgJ286ZGVsaXZlcnl0aW1lLW9wdGltaXplLXBlcmlvZCc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIFRpbWV6b25lIE9wdGltaXphdGlvbiAoVFpPKSBvbiBhIHBlciBtZXNzYWdlIGJhc2lzLlxuICAgICAqXG4gICAgICogU3RyaW5nIHNob3VsZCBiZSBzZXQgdG8gcHJlZmVycmVkIGRlbGl2ZXJ5IHRpbWUgaW4gYEhIOm1tYCBvciBgaGg6bW1hYWAgZm9ybWF0LCB3aGVyZSBgSEg6bW1gIGlzIHVzZWQgZm9yIDI0IGhvdXIgZm9ybWF0IHdpdGhvdXQgQU0vUE0gYW5kIGBoaDptbWFhYCBpcyB1c2VkIGZvciAxMiBob3VyIGZvcm1hdCB3aXRoIEFNL1BNLiBTZWUgW1NlbmRpbmcgYSBtZXNzYWdlIHdpdGggVFpPXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjdHpvLXNlbmRpbmcpIGZvciBkZXRhaWxzLlxuICAgICAqXG4gICAgICogUGxlYXNlIG5vdGUgdGhhdCBUWk8gaXMgb25seSBhdmFpbGFibGUgb24gY2VydGFpbiBwbGFucy5cbiAgICAgKiBTZWUgd3d3Lm1haWxndW4uY29tL3ByaWNpbmcgZm9yIG1vcmUgaW5mby5cbiAgICAgKi9cbiAgICAnbzp0aW1lLXpvbmUtbG9jYWxpemUnPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBzZW5kaW5nIGluIHRlc3QgbW9kZS4gUGFzcyBgeWVzYCBpZiBuZWVkZWQuIFNlZSBbU2VuZGluZyBpbiBUZXN0IE1vZGVdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCNtYW51YWwtdGVzdG1vZGUpXG4gICAgICovXG4gICAgJ286dGVzdG1vZGUnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdHJhY2tpbmcgb24gYSBwZXItbWVzc2FnZSBiYXNpcywgc2VlIFtUcmFja2luZyBNZXNzYWdlc10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI3RyYWNraW5nLW1lc3NhZ2VzIGZvciBkZXRhaWxzLiBQYXNzICd5ZXMnLCAnbm8nLCAndHJ1ZScgb3IgJ2ZhbHNlJ1xuICAgICAqL1xuICAgICdvOnRyYWNraW5nJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIGNsaWNrcyB0cmFja2luZyBvbiBhIHBlci1tZXNzYWdlIGJhc2lzLlxuICAgICAqIEhhcyBoaWdoZXIgcHJpb3JpdHkgdGhhbiBkb21haW4tbGV2ZWwgc2V0dGluZy5cbiAgICAgKiBQYXNzIGB5ZXNgLCBgbm9gLCBgdHJ1ZWAsIGBmYWxzZWAgb3IgYGh0bWxvbmx5YC5cbiAgICAgKi9cbiAgICAnbzp0cmFja2luZy1jbGlja3MnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJyB8ICdodG1sb25seSc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIG9wZW5zIHRyYWNraW5nIG9uIGEgcGVyLW1lc3NhZ2UgYmFzaXMuXG4gICAgICogSGFzIGhpZ2hlciBwcmlvcml0eSB0aGFuIGRvbWFpbi1sZXZlbCBzZXR0aW5nLlxuICAgICAqICBQYXNzICd5ZXMnIG9yICdubycsICd0cnVlJyBvciAnZmFsc2UnXG4gICAgICovXG4gICAgJ286dHJhY2tpbmctb3BlbnMnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIElmIHNldCB0byAnVHJ1ZScgb3IgJ3llcycgdGhpcyByZXF1aXJlcyB0aGUgbWVzc2FnZSBvbmx5IGJlIHNlbnQgb3ZlciBhIFRMUyBjb25uZWN0aW9uLlxuICAgICAqIElmIGEgVExTIGNvbm5lY3Rpb24gY2FuIG5vdCBiZSBlc3RhYmxpc2hlZCwgTWFpbGd1biB3aWxsIG5vdCBkZWxpdmVyIHRoZSBtZXNzYWdlLlxuICAgICAqXG4gICAgICogSWYgc2V0IHRvICdGYWxzZScgb3IgJ25vJywgTWFpbGd1biB3aWxsIHN0aWxsIHRyeSBhbmQgdXBncmFkZSB0aGUgY29ubmVjdGlvbixcbiAgICAgKiBidXQgaWYgTWFpbGd1biBjYW4gbm90LCB0aGUgbWVzc2FnZSB3aWxsIGJlIGRlbGl2ZXJlZCBvdmVyIGEgcGxhaW50ZXh0IFNNVFAgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IGlzICdGYWxzZScuXG4gICAgICovXG4gICAgJ286cmVxdWlyZS10bHMnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIElmIHNldCB0byBgVHJ1ZWAgb3IgYHllc2AsIHRoZSBjZXJ0aWZpY2F0ZSBhbmQgaG9zdG5hbWUgd2lsbCBub3QgYmUgdmVyaWZpZWRcbiAgICAgKiB3aGVuIHRyeWluZyB0byBlc3RhYmxpc2ggYSBUTFMgY29ubmVjdGlvblxuICAgICAqIGFuZCBNYWlsZ3VuIHdpbGwgYWNjZXB0IGFueSBjZXJ0aWZpY2F0ZSBkdXJpbmcgZGVsaXZlcnkuXG4gICAgICpcbiAgICAgKiBJZiBzZXQgdG8gYEZhbHNlYCBvciBgbm9gLCBNYWlsZ3VuIHdpbGwgdmVyaWZ5IHRoZSBjZXJ0aWZpY2F0ZSBhbmQgaG9zdG5hbWUuXG4gICAgICogSWYgZWl0aGVyIG9uZSBjYW4gbm90IGJlIHZlcmlmaWVkLCBhIFRMUyBjb25uZWN0aW9uIHdpbGwgbm90IGJlIGVzdGFibGlzaGVkLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaXMgYEZhbHNlYC5cbiAgICAgKi9cbiAgICAnbzpza2lwLXZlcmlmaWNhdGlvbic/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogQSB2YWxpZCBKU09OLWVuY29kZWQgZGljdGlvbmFyeSwgd2hlcmUga2V5IGlzIGEgcGxhaW4gcmVjaXBpZW50IGFkZHJlc3MgYW5kIHZhbHVlIGlzIGEgZGljdGlvbmFyeSB3aXRoIHZhcmlhYmxlcyB0aGF0IGNhbiBiZSByZWZlcmVuY2VkIGluIHRoZSBtZXNzYWdlIGJvZHkuIFNlZSBbQmF0Y2ggU2VuZGluZ10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI2JhdGNoLXNlbmRpbmcpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgICdyZWNpcGllbnQtdmFyaWFibGVzJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIGg6JyBwcmVmaXggZm9sbG93ZWQgYnkgYW4gYXJiaXRyYXJ5IHZhbHVlIGFsbG93cyB0byBhcHBlbmQgYSBjdXN0b20gTUlNRSBoZWFkZXJcbiAgICAgKiB0byB0aGUgbWVzc2FnZSAoJ1gtTXktSGVhZGVyJyBpbiB0aGlzIGNhc2UpLlxuICAgICAqIEZvciBleGFtcGxlLCBgaDpSZXBseS1Ub2AgdG8gc3BlY2lmeSBSZXBseS1UbyBhZGRyZXNzLlxuICAgICAqL1xuICAgICdoOlgtTXktSGVhZGVyJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIGB2OmAgcHJlZml4IGZvbGxvd2VkIGJ5IGFuIGFyYml0cmFyeSBuYW1lIGFsbG93cyB0byBhdHRhY2ggYSBjdXN0b20gSlNPTiBkYXRhIHRvIHRoZSBtZXNzYWdlLiBTZWUgW0F0dGFjaGluZyBEYXRhIHRvIE1lc3NhZ2VzXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjbWFudWFsLWN1c3RvbWRhdGEpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgICd2Om15LXZhcic/OiBzdHJpbmc7XG5cbiAgICBba2V5OiBzdHJpbmddOiBGb3JtRGF0YUlucHV0VmFsdWU7XG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VzU2VuZEFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTWVzc2FnZXNTZW5kUmVzdWx0ID0ge1xuICAgIGlkPzogc3RyaW5nLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgZGV0YWlscz86IHN0cmluZztcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTWVzc2FnZXMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBSb3V0ZSA9IHtcbiAgICBhY3Rpb25zOiBzdHJpbmdbXTtcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBleHByZXNzaW9uOiBzdHJpbmc7XG4gICAgaWQ6IHN0cmluZztcbiAgICBwcmlvcml0eTogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVSb3V0ZVJlc3BvbnNlID0gUm91dGUgJiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEZXN0cm95Um91dGVSZXNwb25zZSA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlVXBkYXRlUm91dGVEYXRhID0ge1xuICAgIHByaW9yaXR5PzogbnVtYmVyO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIGV4cHJlc3Npb246IHN0cmluZztcbiAgICBhY3Rpb246IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgdHlwZSBSb3V0ZXNMaXN0UXVlcnkgPSB7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgc2tpcD86IG51bWJlcjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vUm91dGVzJztcbiIsImV4cG9ydCB0eXBlIFN0YXQgPSB7XG4gIHRpbWU6IHN0cmluZyB8IERhdGUsXG4gIGRlbGl2ZXJlZDoge1xuICAgIHNtdHA6IG51bWJlcixcbiAgICBodHRwOiBudW1iZXIsXG4gICAgdG90YWw6IG51bWJlclxuICB9XG59XG5cbmV4cG9ydCB0eXBlIFN0YXRzT3B0aW9ucyA9IHtcbiAgc3RhcnQ6IHN0cmluZyB8IERhdGU7XG4gIGVuZDogc3RyaW5nIHwgRGF0ZTtcbiAgcmVzb2x1dGlvbjogc3RyaW5nO1xuICBzdGF0czogU3RhdFtdO1xufVxuXG5leHBvcnQgdHlwZSBTdGF0c0V2ZW50ID0gJ2FjY2VwdGVkJyB8ICdkZWxpdmVyZWQnIHwgJ29wZW5lZCcgfCAnY2xpY2tlZCcgfCAndW5zdWJzY3JpYmVkJyB8ICdzdG9yZWQnIHwgJ2NvbXBsYWluZWQnIHwgJ2ZhaWxlZCc7XG5cbmV4cG9ydCB0eXBlIFN0YXRzUXVlcnkgPSB7XG4gIGV2ZW50OiBTdGF0c0V2ZW50IHwgU3RhdHNFdmVudFtdO1xuICBzdGFydD86IHN0cmluZyB8IERhdGU7XG4gIGVuZD86IHN0cmluZyB8IERhdGU7XG4gIHJlc29sdXRpb24/OiAnaG91cid8ICdkYXknIHwgJ21vbnRoJztcbiAgZHVyYXRpb24/OiBzdHJpbmc7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1N0YXRzJztcbiIsImV4cG9ydCB0eXBlIFN1YmFjY291bnRzUXVlcnkgPSB7XG4gIGVuYWJsZWQ/OiBib29sZWFuO1xuICBsaW1pdD86IG51bWJlcjtcbiAgc2tpcD86IG51bWJlcjtcbiAgc29ydD86ICdhc2MnIHwgJ2Rlc2MnO1xufVxuXG5leHBvcnQgdHlwZSBTdWJhY2NvdW50TGlzdEl0ZW0gPSB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgc3RhdHVzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFN1YmFjY291bnRMaXN0UmVzcG9uc2VEYXRhID0ge1xuICBzdWJhY2NvdW50czogU3ViYWNjb3VudExpc3RJdGVtW107XG4gIHRvdGFsOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1YmFjY291bnRSZXNwb25zZURhdGEgPSB7XG4gIHN1YmFjY291bnQ6IFN1YmFjY291bnRMaXN0SXRlbVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9TdWJhY2NvdW50cyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIEJvdW5jZURhdGEgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIENvbXBsYWludERhdGEgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG4iLCJpbXBvcnQge1xuICBCb3VuY2VEYXRhLFxuICBDb21wbGFpbnREYXRhLFxuICBVbnN1YnNjcmliZURhdGEsXG4gIFdoaXRlTGlzdERhdGFcbn0gZnJvbSAnLic7XG5pbXBvcnQge1xuICBJQm91bmNlLCBJQ29tcGxhaW50LCBJVW5zdWJzY3JpYmUsIElXaGl0ZUxpc3Rcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uTGlzdCA9IHtcbiAgaXRlbXM6IChJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3QpW107XG4gIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkxpc3RRdWVyeSA9IHtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uRGF0YVR5cGUgPSBCb3VuY2VEYXRhIHwgQ29tcGxhaW50RGF0YSB8IFVuc3Vic2NyaWJlRGF0YSB8IFdoaXRlTGlzdERhdGE7XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgaXRlbXM6IEJvdW5jZURhdGFbXSB8IENvbXBsYWludERhdGFbXSB8IFVuc3Vic2NyaWJlRGF0YVtdIHwgV2hpdGVMaXN0RGF0YVtdO1xuICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICB9XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvblJlc3BvbnNlID0ge1xuICBib2R5OiBTdXBwcmVzc2lvbkRhdGFUeXBlO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25EZXN0cm95UmVzcG9uc2UgPSB7XG4gIGJvZHk6IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdmFsdWU/OiBzdHJpbmc7XG4gICAgYWRkcmVzcz86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25EZXN0cm95UmVzdWx0ID0ge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvZGU/OiBudW1iZXI7XG4gIGVycm9yPzogc3RyaW5nO1xuICBkb21haW4/OiBzdHJpbmc7XG4gIHRhZz86IHN0cmluZzsgLy8gd29ya3Mgb25seSB3aXRoIEZvcm1EYXRhIHVzYWdlIGZvciBvbmUgdW5zdWJzY3JpYmVcbiAgY3JlYXRlZF9hdD86IHN0cmluZyA7XG4gIHRhZ3M/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlID0ge1xuICBib2R5OntcbiAgICBtZXNzYWdlOnN0cmluZztcbiAgICB0eXBlPzogc3RyaW5nO1xuICAgIHZhbHVlPzogc3RyaW5nO1xuICB9XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0ID0ge1xuICBtZXNzYWdlOnN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgVW5zdWJzY3JpYmVEYXRhID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICB0YWdzOiBhbnk7XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nIHwgRGF0ZTtcbn1cbiIsImV4cG9ydCB0eXBlIFdoaXRlTGlzdERhdGEgPSB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBzdHJpbmcgfCBEYXRlO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Cb3VuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9Db21wbGFpbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9TdXBwcmVzc2lvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9VbnN1YnNjcmliZSc7XG5leHBvcnQgKiBmcm9tICcuL1doaXRlTGlzdCc7XG4iLCJpbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5pbXBvcnQgeyBDdXN0b21GaWxlLCBDdXN0b21GaWxlRGF0YSB9IGZyb20gJy4uL01lc3NhZ2VzJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JEYXRhID0ge1xuICAgIGNyZWF0ZWRfYXQ6IG51bWJlcjtcbiAgICBpZDogc3RyaW5nO1xuICAgIHF1YW50aXR5OiBudW1iZXI7XG4gICAgcmVjb3Jkc19wcm9jZXNzZWQ6IG51bWJlciB8IG51bGw7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgZG93bmxvYWRfdXJsPzoge1xuICAgICAgICBjc3Y6IHN0cmluZztcbiAgICAgICAganNvbjogc3RyaW5nO1xuICAgIH07XG4gICAgc3VtbWFyeT86IHtcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICBjYXRjaF9hbGw6IG51bWJlcjtcbiAgICAgICAgICAgIGRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgICBkb19ub3Rfc2VuZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5kZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgICB9O1xuICAgICAgICByaXNrOiB7XG4gICAgICAgICAgICBoaWdoOiBudW1iZXI7XG4gICAgICAgICAgICBsb3c6IG51bWJlcjtcbiAgICAgICAgICAgIG1lZGl1bTogbnVtYmVyO1xuICAgICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHQgPSB7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcXVhbnRpdHk6IG51bWJlcjtcbiAgICByZWNvcmRzUHJvY2Vzc2VkOiBudW1iZXIgfCBudWxsO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIHJlc3BvbnNlU3RhdHVzQ29kZTogbnVtYmVyOyAvLyBodHRwIHJlc3BvbnNlIHN0YXR1cyBjb2RlXG4gICAgZG93bmxvYWRVcmw/OiB7XG4gICAgICAgIGNzdjogc3RyaW5nO1xuICAgICAgICBqc29uOiBzdHJpbmc7XG4gICAgfTtcbiAgICBzdW1tYXJ5Pzoge1xuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgIGNhdGNoQWxsOiBudW1iZXI7XG4gICAgICAgICAgICBkZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgICAgZG9Ob3RTZW5kOiBudW1iZXI7XG4gICAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgICAgIHJpc2s6IHtcbiAgICAgICAgICAgIGhpZ2g6IG51bWJlcjtcbiAgICAgICAgICAgIGxvdzogbnVtYmVyO1xuICAgICAgICAgICAgbWVkaXVtOiBudW1iZXI7XG4gICAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGEgPSB7XG4gICAgZmlsZTogQ3VzdG9tRmlsZURhdGEgfCBDdXN0b21GaWxlXG59XG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkID0ge1xuICAgIG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IEN1c3RvbUZpbGVEYXRhIHwgQ3VzdG9tRmlsZTtcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQgPSB7XG4gICAgam9iczogTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0W107XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbiAgICB0b3RhbDogbnVtYmVyO1xuICAgIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFF1ZXJ5ID0ge1xuICAgIGxpbWl0OiBudW1iZXI7XG4gICAgcGFnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICAgICAgICBqb2JzOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JEYXRhW107XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfVxufVxuZXhwb3J0IHR5cGUgQ2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IgPSB7XG4gICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuZXhwb3J0IHR5cGUgVmFsaWRhdGlvblF1ZXJ5ID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG59XG5leHBvcnQgdHlwZSBWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGlzX2Rpc3Bvc2FibGVfYWRkcmVzczogYm9vbGVhbjtcbiAgaXNfcm9sZV9hZGRyZXNzOiBib29sZWFuO1xuICByZWFzb246IHN0cmluZ1tdO1xuICByZXN1bHQ6IHN0cmluZztcbiAgcmlzazogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBWYWxpZGF0aW9uUmVzcG9uc2UgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBib2R5OiBWYWxpZGF0aW9uUmVzdWx0O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NdWx0aXBsZVZhbGlkYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9uJztcbiIsImV4cG9ydCB0eXBlIEFQSVdlYmhvb2sgPSB7XG4gICAgdXJsPzogc3RyaW5nXG4gICAgdXJscz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgdHlwZSBXZWJob29rUmVzcG9uc2VCb2R5ID0ge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB3ZWJob29rOiBBUElXZWJob29rO1xufVxuXG5leHBvcnQgdHlwZSBXZWJob29rUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keTogV2ViaG9va1Jlc3BvbnNlQm9keTtcbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va0xpc3QgPSB7XG4gICAgW2lkOiBzdHJpbmddOiB7XG4gICAgICAgIHVybHM6IHN0cmluZ1tdXG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBXZWJob29rc1F1ZXJ5ID0ge1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHNraXA/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2UgPSB7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va1Jlc3VsdCA9IHtcbiAgaWQ6IHN0cmluZztcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVybCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLiBVc2UgXCJ1cmxzXCIgaW5zdGVhZC5cbiAgICovXG4gIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICB1cmxzOiBzdHJpbmdbXTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vV2ViaG9va3MnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9Db21tb24nO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5zJztcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vSVBQb29scyc7XG5leHBvcnQgKiBmcm9tICcuL0lQcyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxndW5DbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9NZXNzYWdlcyc7XG5leHBvcnQgKiBmcm9tICcuL1JvdXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRzJztcbmV4cG9ydCAqIGZyb20gJy4vU3ViYWNjb3VudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdXBwcmVzc2lvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL1dlYmhvb2tzJztcbiIsImltcG9ydCBNYWlsZ3VuQ2xpZW50IGZyb20gJy4vQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50JztcbmltcG9ydCB7IElNYWlsZ3VuQ2xpZW50IH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEsIE1haWxndW5DbGllbnRPcHRpb25zIH0gZnJvbSAnLi9UeXBlcyc7XG5cbmV4cG9ydCAqIGFzIEVudW1zIGZyb20gJy4vRW51bXMnO1xuZXhwb3J0ICogZnJvbSAnLi9UeXBlcyc7XG5leHBvcnQgKiBhcyBJbnRlcmZhY2VzIGZyb20gJy4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW4ge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHQoKTogdHlwZW9mIE1haWxndW4geyByZXR1cm4gdGhpczsgfVxuICBwcml2YXRlIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhXG5cbiAgY29uc3RydWN0b3IoRm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLmZvcm1EYXRhID0gRm9ybURhdGE7XG4gIH1cblxuICBjbGllbnQob3B0aW9uczogTWFpbGd1bkNsaWVudE9wdGlvbnMpIDogSU1haWxndW5DbGllbnQge1xuICAgIHJldHVybiBuZXcgTWFpbGd1bkNsaWVudChvcHRpb25zLCB0aGlzLmZvcm1EYXRhKTtcbiAgfVxufVxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9iYXNlNjQgdjEuMC4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMS4wLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiKGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pO1xuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG59KSgndXJsam9pbicsIHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBub3JtYWxpemUgKHN0ckFycmF5KSB7XG4gICAgdmFyIHJlc3VsdEFycmF5ID0gW107XG4gICAgaWYgKHN0ckFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cblxuICAgIGlmICh0eXBlb2Ygc3RyQXJyYXlbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIHN0ckFycmF5WzBdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZmlyc3QgcGFydCBpcyBhIHBsYWluIHByb3RvY29sLCB3ZSBjb21iaW5lIGl0IHdpdGggdGhlIG5leHQgcGFydC5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15bXi86XSs6XFwvKiQvKSAmJiBzdHJBcnJheS5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgZmlyc3QgPSBzdHJBcnJheS5zaGlmdCgpO1xuICAgICAgc3RyQXJyYXlbMF0gPSBmaXJzdCArIHN0ckFycmF5WzBdO1xuICAgIH1cblxuICAgIC8vIFRoZXJlIG11c3QgYmUgdHdvIG9yIHRocmVlIHNsYXNoZXMgaW4gdGhlIGZpbGUgcHJvdG9jb2wsIHR3byBzbGFzaGVzIGluIGFueXRoaW5nIGVsc2UuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eZmlsZTpcXC9cXC9cXC8vKSkge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLycpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBzdHJBcnJheVtpXTtcblxuICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgY29tcG9uZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvbmVudCA9PT0gJycpIHsgY29udGludWU7IH1cblxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBzdGFydGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGZpcnN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvXltcXC9dKy8sICcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgc3RyQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgZW5kaW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgbGFzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3IgdGhlIGxhc3QgY29tcG9uZW50IHdlIHdpbGwgY29tYmluZSBtdWx0aXBsZSBzbGFzaGVzIHRvIGEgc2luZ2xlIG9uZS5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnLycpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRBcnJheS5wdXNoKGNvbXBvbmVudCk7XG5cbiAgICB9XG5cbiAgICB2YXIgc3RyID0gcmVzdWx0QXJyYXkuam9pbignLycpO1xuICAgIC8vIEVhY2ggaW5wdXQgY29tcG9uZW50IGlzIG5vdyBzZXBhcmF0ZWQgYnkgYSBzaW5nbGUgc2xhc2ggZXhjZXB0IHRoZSBwb3NzaWJsZSBmaXJzdCBwbGFpbiBwcm90b2NvbCBwYXJ0LlxuXG4gICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGJlZm9yZSBwYXJhbWV0ZXJzIG9yIGhhc2hcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFwvKFxcP3wmfCNbXiFdKS9nLCAnJDEnKTtcblxuICAgIC8vIHJlcGxhY2UgPyBpbiBwYXJhbWV0ZXJzIHdpdGggJlxuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnPycpO1xuICAgIHN0ciA9IHBhcnRzLnNoaWZ0KCkgKyAocGFydHMubGVuZ3RoID4gMCA/ICc/JzogJycpICsgcGFydHMuam9pbignJicpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlucHV0O1xuXG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpbnB1dCA9IGFyZ3VtZW50c1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShpbnB1dCk7XG4gIH07XG5cbn0pO1xuIiwiLy8gQXhpb3MgdjEuNi4wIENvcHlyaWdodCAoYykgMjAyMyBNYXR0IFphYnJpc2tpZSBhbmQgY29udHJpYnV0b3JzXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbmNvbnN0IHt0b1N0cmluZ30gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3Qge2dldFByb3RvdHlwZU9mfSA9IE9iamVjdDtcblxuY29uc3Qga2luZE9mID0gKGNhY2hlID0+IHRoaW5nID0+IHtcbiAgICBjb25zdCBzdHIgPSB0b1N0cmluZy5jYWxsKHRoaW5nKTtcbiAgICByZXR1cm4gY2FjaGVbc3RyXSB8fCAoY2FjaGVbc3RyXSA9IHN0ci5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKSk7XG59KShPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuY29uc3Qga2luZE9mVGVzdCA9ICh0eXBlKSA9PiB7XG4gIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAodGhpbmcpID0+IGtpbmRPZih0aGluZykgPT09IHR5cGVcbn07XG5cbmNvbnN0IHR5cGVPZlRlc3QgPSB0eXBlID0+IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gdHlwZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IHtpc0FycmF5fSA9IEFycmF5O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVW5kZWZpbmVkID0gdHlwZU9mVGVzdCgndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgaXNGdW5jdGlvbih2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIpICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQXJyYXlCdWZmZXIgPSBraW5kT2ZUZXN0KCdBcnJheUJ1ZmZlcicpO1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmluZyA9IHR5cGVPZlRlc3QoJ3N0cmluZycpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlT2ZUZXN0KCdmdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzTnVtYmVyID0gdHlwZU9mVGVzdCgnbnVtYmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQm9vbGVhblxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQm9vbGVhbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQm9vbGVhbiA9IHRoaW5nID0+IHRoaW5nID09PSB0cnVlIHx8IHRoaW5nID09PSBmYWxzZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1BsYWluT2JqZWN0ID0gKHZhbCkgPT4ge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIChwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpID09PSBudWxsKSAmJiAhKFN5bWJvbC50b1N0cmluZ1RhZyBpbiB2YWwpICYmICEoU3ltYm9sLml0ZXJhdG9yIGluIHZhbCk7XG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNEYXRlID0ga2luZE9mVGVzdCgnRGF0ZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCbG9iID0ga2luZE9mVGVzdCgnQmxvYicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZUxpc3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZUxpc3QgPSBraW5kT2ZUZXN0KCdGaWxlTGlzdCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyZWFtID0gKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGb3JtRGF0YSA9ICh0aGluZykgPT4ge1xuICBsZXQga2luZDtcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8IChcbiAgICAgIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiAoXG4gICAgICAgIChraW5kID0ga2luZE9mKHRoaW5nKSkgPT09ICdmb3JtZGF0YScgfHxcbiAgICAgICAgLy8gZGV0ZWN0IGZvcm0tZGF0YSBpbnN0YW5jZVxuICAgICAgICAoa2luZCA9PT0gJ29iamVjdCcgJiYgaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgRm9ybURhdGFdJylcbiAgICAgIClcbiAgICApXG4gIClcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VSTFNlYXJjaFBhcmFtcyA9IGtpbmRPZlRlc3QoJ1VSTFNlYXJjaFBhcmFtcycpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4gc3RyLnRyaW0gP1xuICBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHthbGxPd25LZXlzID0gZmFsc2V9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpXG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIGNvbnN0IHtjYXNlbGVzc30gPSBpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEtleSA9IGNhc2VsZXNzICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgYXJndW1lbnRzW2ldICYmIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FsbE93bktleXNdXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmNvbnN0IGV4dGVuZCA9IChhLCBiLCB0aGlzQXJnLCB7YWxsT3duS2V5c309IHt9KSA9PiB7XG4gIGZvckVhY2goYiwgKHZhbCwga2V5KSA9PiB7XG4gICAgaWYgKHRoaXNBcmcgJiYgaXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0sIHthbGxPd25LZXlzfSk7XG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuY29uc3Qgc3RyaXBCT00gPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn07XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlXG4gIH0pO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlIG9iamVjdCB3aXRoIGRlZXAgcHJvdG90eXBlIGNoYWluIHRvIGEgZmxhdCBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2VPYmogc291cmNlIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IFtkZXN0T2JqXVxuICogQHBhcmFtIHtGdW5jdGlvbnxCb29sZWFufSBbZmlsdGVyXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Byb3BGaWx0ZXJdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuY29uc3QgdG9GbGF0T2JqZWN0ID0gKHNvdXJjZU9iaiwgZGVzdE9iaiwgZmlsdGVyLCBwcm9wRmlsdGVyKSA9PiB7XG4gIGxldCBwcm9wcztcbiAgbGV0IGk7XG4gIGxldCBwcm9wO1xuICBjb25zdCBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIGlmIChzb3VyY2VPYmogPT0gbnVsbCkgcmV0dXJuIGRlc3RPYmo7XG5cbiAgZG8ge1xuICAgIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlT2JqKTtcbiAgICBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICBwcm9wID0gcHJvcHNbaV07XG4gICAgICBpZiAoKCFwcm9wRmlsdGVyIHx8IHByb3BGaWx0ZXIocHJvcCwgc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgIW1lcmdlZFtwcm9wXSkge1xuICAgICAgICBkZXN0T2JqW3Byb3BdID0gc291cmNlT2JqW3Byb3BdO1xuICAgICAgICBtZXJnZWRbcHJvcF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBzb3VyY2VPYmogPSBmaWx0ZXIgIT09IGZhbHNlICYmIGdldFByb3RvdHlwZU9mKHNvdXJjZU9iaik7XG4gIH0gd2hpbGUgKHNvdXJjZU9iaiAmJiAoIWZpbHRlciB8fCBmaWx0ZXIoc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgc291cmNlT2JqICE9PSBPYmplY3QucHJvdG90eXBlKTtcblxuICByZXR1cm4gZGVzdE9iajtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3RyaW5nIGVuZHMgd2l0aCB0aGUgY2hhcmFjdGVycyBvZiBhIHNwZWNpZmllZCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gW3Bvc2l0aW9uPSAwXVxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBlbmRzV2l0aCA9IChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pID0+IHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICBjb25zdCBsYXN0SW5kZXggPSBzdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3NpdGlvbjtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKlxuICogQHBhcmFtIHsqfSBbdGhpbmddXG4gKlxuICogQHJldHVybnMgez9BcnJheX1cbiAqL1xuY29uc3QgdG9BcnJheSA9ICh0aGluZykgPT4ge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgaWYgKGlzQXJyYXkodGhpbmcpKSByZXR1cm4gdGhpbmc7XG4gIGxldCBpID0gdGhpbmcubGVuZ3RoO1xuICBpZiAoIWlzTnVtYmVyKGkpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGFycltpXSA9IHRoaW5nW2ldO1xuICB9XG4gIHJldHVybiBhcnI7XG59O1xuXG4vKipcbiAqIENoZWNraW5nIGlmIHRoZSBVaW50OEFycmF5IGV4aXN0cyBhbmQgaWYgaXQgZG9lcywgaXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZVxuICogdGhpbmcgcGFzc2VkIGluIGlzIGFuIGluc3RhbmNlIG9mIFVpbnQ4QXJyYXlcbiAqXG4gKiBAcGFyYW0ge1R5cGVkQXJyYXl9XG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuY29uc3QgaXNUeXBlZEFycmF5ID0gKFR5cGVkQXJyYXkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gdGhpbmcgPT4ge1xuICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgfTtcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBnZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSk7XG5cbi8qKlxuICogRm9yIGVhY2ggZW50cnkgaW4gdGhlIG9iamVjdCwgY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCB0aGUga2V5IGFuZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBlbnRyeS5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgZm9yRWFjaEVudHJ5ID0gKG9iaiwgZm4pID0+IHtcbiAgY29uc3QgZ2VuZXJhdG9yID0gb2JqICYmIG9ialtTeW1ib2wuaXRlcmF0b3JdO1xuXG4gIGNvbnN0IGl0ZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwob2JqKTtcblxuICBsZXQgcmVzdWx0O1xuXG4gIHdoaWxlICgocmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpKSAmJiAhcmVzdWx0LmRvbmUpIHtcbiAgICBjb25zdCBwYWlyID0gcmVzdWx0LnZhbHVlO1xuICAgIGZuLmNhbGwob2JqLCBwYWlyWzBdLCBwYWlyWzFdKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhbmQgYSBzdHJpbmcsIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIGFsbCB0aGUgbWF0Y2hlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWdFeHAgLSBUaGUgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIGFnYWluc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBzZWFyY2guXG4gKlxuICogQHJldHVybnMge0FycmF5PGJvb2xlYW4+fVxuICovXG5jb25zdCBtYXRjaEFsbCA9IChyZWdFeHAsIHN0cikgPT4ge1xuICBsZXQgbWF0Y2hlcztcbiAgY29uc3QgYXJyID0gW107XG5cbiAgd2hpbGUgKChtYXRjaGVzID0gcmVnRXhwLmV4ZWMoc3RyKSkgIT09IG51bGwpIHtcbiAgICBhcnIucHVzaChtYXRjaGVzKTtcbiAgfVxuXG4gIHJldHVybiBhcnI7XG59O1xuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn07XG5cbi8qKlxuICogTWFrZXMgYWxsIG1ldGhvZHMgcmVhZC1vbmx5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuY29uc3QgZnJlZXplTWV0aG9kcyA9IChvYmopID0+IHtcbiAgcmVkdWNlRGVzY3JpcHRvcnMob2JqLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIC8vIHNraXAgcmVzdHJpY3RlZCBwcm9wcyBpbiBzdHJpY3QgbW9kZVxuICAgIGlmIChpc0Z1bmN0aW9uKG9iaikgJiYgWydhcmd1bWVudHMnLCAnY2FsbGVyJywgJ2NhbGxlZSddLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBvYmpbbmFtZV07XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm47XG5cbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTtcblxuICAgIGlmICgnd3JpdGFibGUnIGluIGRlc2NyaXB0b3IpIHtcbiAgICAgIGRlc2NyaXB0b3Iud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldCA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0NhbiBub3QgcmV3cml0ZSByZWFkLW9ubHkgbWV0aG9kIFxcJycgKyBuYW1lICsgJ1xcJycpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgdG9PYmplY3RTZXQgPSAoYXJyYXlPclN0cmluZywgZGVsaW1pdGVyKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuXG4gIGNvbnN0IGRlZmluZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBvYmpbdmFsdWVdID0gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufTtcblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5jb25zdCB0b0Zpbml0ZU51bWJlciA9ICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSA9PiB7XG4gIHZhbHVlID0gK3ZhbHVlO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHZhbHVlKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xufTtcblxuY29uc3QgQUxQSEEgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonO1xuXG5jb25zdCBESUdJVCA9ICcwMTIzNDU2Nzg5JztcblxuY29uc3QgQUxQSEFCRVQgPSB7XG4gIERJR0lULFxuICBBTFBIQSxcbiAgQUxQSEFfRElHSVQ6IEFMUEhBICsgQUxQSEEudG9VcHBlckNhc2UoKSArIERJR0lUXG59O1xuXG5jb25zdCBnZW5lcmF0ZVN0cmluZyA9IChzaXplID0gMTYsIGFscGhhYmV0ID0gQUxQSEFCRVQuQUxQSEFfRElHSVQpID0+IHtcbiAgbGV0IHN0ciA9ICcnO1xuICBjb25zdCB7bGVuZ3RofSA9IGFscGhhYmV0O1xuICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgc3RyICs9IGFscGhhYmV0W01hdGgucmFuZG9tKCkgKiBsZW5ndGh8MF07XG4gIH1cblxuICByZXR1cm4gc3RyO1xufTtcblxuLyoqXG4gKiBJZiB0aGUgdGhpbmcgaXMgYSBGb3JtRGF0YSBvYmplY3QsIHJldHVybiB0cnVlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2suXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BlY0NvbXBsaWFudEZvcm0odGhpbmcpIHtcbiAgcmV0dXJuICEhKHRoaW5nICYmIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiB0aGluZ1tTeW1ib2wudG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW1N5bWJvbC5pdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH07XG5cbiAgcmV0dXJuIHZpc2l0KG9iaiwgMCk7XG59O1xuXG5jb25zdCBpc0FzeW5jRm4gPSBraW5kT2ZUZXN0KCdBc3luY0Z1bmN0aW9uJyk7XG5cbmNvbnN0IGlzVGhlbmFibGUgPSAodGhpbmcpID0+XG4gIHRoaW5nICYmIChpc09iamVjdCh0aGluZykgfHwgaXNGdW5jdGlvbih0aGluZykpICYmIGlzRnVuY3Rpb24odGhpbmcudGhlbikgJiYgaXNGdW5jdGlvbih0aGluZy5jYXRjaCk7XG5cbnZhciB1dGlscyA9IHtcbiAgaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXIsXG4gIGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZyxcbiAgaXNOdW1iZXIsXG4gIGlzQm9vbGVhbixcbiAgaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0RhdGUsXG4gIGlzRmlsZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIEFMUEhBQkVULFxuICBnZW5lcmF0ZVN0cmluZyxcbiAgaXNTcGVjQ29tcGxpYW50Rm9ybSxcbiAgdG9KU09OT2JqZWN0LFxuICBpc0FzeW5jRm4sXG4gIGlzVGhlbmFibGVcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjaztcbiAgfVxuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgcmVzcG9uc2UgJiYgKHRoaXMucmVzcG9uc2UgPSByZXNwb25zZSk7XG59XG5cbnV0aWxzLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHV0aWxzLnRvSlNPTk9iamVjdCh0aGlzLmNvbmZpZyksXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMucmVzcG9uc2UgJiYgdGhpcy5yZXNwb25zZS5zdGF0dXMgPyB0aGlzLnJlc3BvbnNlLnN0YXR1cyA6IG51bGxcbiAgICB9O1xuICB9XG59KTtcblxuY29uc3QgcHJvdG90eXBlJDEgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbmNvbnN0IGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnLFxuICAnRVJSX05PVF9TVVBQT1JUJyxcbiAgJ0VSUl9JTlZBTElEX1VSTCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goY29kZSA9PiB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlJDEsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IChlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpID0+IHtcbiAgY29uc3QgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlJDEpO1xuXG4gIHV0aWxzLnRvRmxhdE9iamVjdChlcnJvciwgYXhpb3NFcnJvciwgZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IEVycm9yLnByb3RvdHlwZTtcbiAgfSwgcHJvcCA9PiB7XG4gICAgcmV0dXJuIHByb3AgIT09ICdpc0F4aW9zRXJyb3InO1xuICB9KTtcblxuICBBeGlvc0Vycm9yLmNhbGwoYXhpb3NFcnJvciwgZXJyb3IubWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG5cbiAgYXhpb3NFcnJvci5jYXVzZSA9IGVycm9yO1xuXG4gIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG52YXIgaHR0cEFkYXB0ZXIgPSBudWxsO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzLmlzUGxhaW5PYmplY3QodGhpbmcpIHx8IHV0aWxzLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscy5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aC5jb25jYXQoa2V5KS5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRva2VuID0gcmVtb3ZlQnJhY2tldHModG9rZW4pO1xuICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgfSkuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkoYXJyKSAmJiAhYXJyLnNvbWUoaXNWaXNpdGFibGUpO1xufVxuXG5jb25zdCBwcmVkaWNhdGVzID0gdXRpbHMudG9GbGF0T2JqZWN0KHV0aWxzLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IChGb3JtRGF0YSkoKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgb3B0aW9ucyA9IHV0aWxzLnRvRmxhdE9iamVjdChvcHRpb25zLCB7XG4gICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBpbmRleGVzOiBmYWxzZVxuICB9LCBmYWxzZSwgZnVuY3Rpb24gZGVmaW5lZChvcHRpb24sIHNvdXJjZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICAgIHJldHVybiAhdXRpbHMuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICB9KTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2I7XG4gIGNvbnN0IHVzZUJsb2IgPSBfQmxvYiAmJiB1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGZvcm1EYXRhKTtcblxuICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VCbG9iICYmIHV0aWxzLmlzQmxvYih2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdCbG9iIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBhIEJ1ZmZlciBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscy5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdXNlQmxvYiAmJiB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBCbG9iKFt2YWx1ZV0pIDogQnVmZmVyLmZyb20odmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZpc2l0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBrZXlcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmd8TnVtYmVyPn0gcGF0aFxuICAgKiBAdGhpcyB7Rm9ybURhdGF9XG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm4gdHJ1ZSB0byB2aXNpdCB0aGUgZWFjaCBwcm9wIG9mIHRoZSB2YWx1ZSByZWN1cnNpdmVseVxuICAgKi9cbiAgZnVuY3Rpb24gZGVmYXVsdFZpc2l0b3IodmFsdWUsIGtleSwgcGF0aCkge1xuICAgIGxldCBhcnIgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSAmJiAhcGF0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAne30nKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gbWV0YVRva2VucyA/IGtleSA6IGtleS5zbGljZSgwLCAtMik7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh1dGlscy5pc0FycmF5KHZhbHVlKSAmJiBpc0ZsYXRBcnJheSh2YWx1ZSkpIHx8XG4gICAgICAgICgodXRpbHMuaXNGaWxlTGlzdCh2YWx1ZSkgfHwgdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSkgJiYgKGFyciA9IHV0aWxzLnRvQXJyYXkodmFsdWUpKVxuICAgICAgICApKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSByZW1vdmVCcmFja2V0cyhrZXkpO1xuXG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIGVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgICAgISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgICAgICAgICAgaW5kZXhlcyA9PT0gdHJ1ZSA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpIDogKGluZGV4ZXMgPT09IG51bGwgPyBrZXkgOiBrZXkgKyAnW10nKSxcbiAgICAgICAgICAgIGNvbnZlcnRWYWx1ZShlbClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkKHZhbHVlLCBwYXRoKSB7XG4gICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGF0aC5qb2luKCcuJykpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgdmlzaXRvci5jYWxsKFxuICAgICAgICBmb3JtRGF0YSwgZWwsIHV0aWxzLmlzU3RyaW5nKGtleSkgPyBrZXkudHJpbSgpIDoga2V5LCBwYXRoLCBleHBvc2VkSGVscGVyc1xuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBidWlsZChlbCwgcGF0aCA/IHBhdGguY29uY2F0KGtleSkgOiBba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdGFjay5wb3AoKTtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIGJ1aWxkKG9iaik7XG5cbiAgcmV0dXJuIGZvcm1EYXRhO1xufVxuXG4vKipcbiAqIEl0IGVuY29kZXMgYSBzdHJpbmcgYnkgcmVwbGFjaW5nIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBpbiB0aGUgdW5yZXNlcnZlZCBzZXQgd2l0aFxuICogdGhlaXIgcGVyY2VudC1lbmNvZGVkIGVxdWl2YWxlbnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gZW5jb2RlLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlJDEoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgICAnJTAwJzogJ1xceDAwJ1xuICB9O1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCl+XXwlMjB8JTAwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyID8gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZW5jb2Rlci5jYWxsKHRoaXMsIHZhbHVlLCBlbmNvZGUkMSk7XG4gIH0gOiBlbmNvZGUkMTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnMubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgIHJldHVybiBfZW5jb2RlKHBhaXJbMF0pICsgJz0nICsgX2VuY29kZShwYWlyWzFdKTtcbiAgfSwgJycpLmpvaW4oJyYnKTtcbn07XG5cbi8qKlxuICogSXQgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyBvZiB0aGUgY2hhcmFjdGVycyBgOmAsIGAkYCwgYCxgLCBgK2AsIGBbYCwgYW5kIGBdYCB3aXRoIHRoZWlyXG4gKiBVUkkgZW5jb2RlZCBjb3VudGVycGFydHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/b2JqZWN0fSBvcHRpb25zXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICBcbiAgY29uc3QgX2VuY29kZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAgICovXG4gIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICAgIGZ1bGZpbGxlZCxcbiAgICAgIHJlamVjdGVkLFxuICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaW50ZXJjZXB0b3Igd2FzIHJlbW92ZWQsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgICAgZm4oaCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxudmFyIEludGVyY2VwdG9yTWFuYWdlciQxID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuXG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2Vcbn07XG5cbnZhciBVUkxTZWFyY2hQYXJhbXMkMSA9IHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnID8gVVJMU2VhcmNoUGFyYW1zIDogQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG5cbnZhciBGb3JtRGF0YSQxID0gdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcblxudmFyIEJsb2IkMSA9IHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyA/IEJsb2IgOiBudWxsO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNTdGFuZGFyZEJyb3dzZXJFbnYgPSAoKCkgPT4ge1xuICBsZXQgcHJvZHVjdDtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChcbiAgICAocHJvZHVjdCA9IG5hdmlnYXRvci5wcm9kdWN0KSA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgIHByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgcHJvZHVjdCA9PT0gJ05TJylcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG59KSgpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciB3ZWJXb3JrZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBBbHRob3VnaCB0aGUgYGlzU3RhbmRhcmRCcm93c2VyRW52YCBtZXRob2QgaW5kaWNhdGVzIHRoYXRcbiAqIGBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlcmAsIHRoZSBXZWJXb3JrZXIgd2lsbCBzdGlsbCBiZVxuICogZmlsdGVyZWQgb3V0IGR1ZSB0byBpdHMganVkZ21lbnQgc3RhbmRhcmRcbiAqIGB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnYC5cbiAqIFRoaXMgbGVhZHMgdG8gYSBwcm9ibGVtIHdoZW4gYXhpb3MgcG9zdCBgRm9ybURhdGFgIGluIHdlYldvcmtlclxuICovXG4gY29uc3QgaXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYgPSAoKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiZcbiAgICB0eXBlb2Ygc2VsZi5pbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nXG4gICk7XG59KSgpO1xuXG5cbnZhciBwbGF0Zm9ybSA9IHtcbiAgaXNCcm93c2VyOiB0cnVlLFxuICBjbGFzc2VzOiB7XG4gICAgVVJMU2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMkMSxcbiAgICBGb3JtRGF0YTogRm9ybURhdGEkMSxcbiAgICBCbG9iOiBCbG9iJDFcbiAgfSxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGlzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52LFxuICBwcm90b2NvbHM6IFsnaHR0cCcsICdodHRwcycsICdmaWxlJywgJ2Jsb2InLCAndXJsJywgJ2RhdGEnXVxufTtcblxuZnVuY3Rpb24gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b0Zvcm1EYXRhKGRhdGEsIG5ldyBwbGF0Zm9ybS5jbGFzc2VzLlVSTFNlYXJjaFBhcmFtcygpLCBPYmplY3QuYXNzaWduKHtcbiAgICB2aXNpdG9yOiBmdW5jdGlvbih2YWx1ZSwga2V5LCBwYXRoLCBoZWxwZXJzKSB7XG4gICAgICBpZiAocGxhdGZvcm0uaXNOb2RlICYmIHV0aWxzLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlbHBlcnMuZGVmYXVsdFZpc2l0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH0sIG9wdGlvbnMpKTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZyBsaWtlIGBmb29beF1beV1bel1gIGFuZCByZXR1cm5zIGFuIGFycmF5IGxpa2UgYFsnZm9vJywgJ3gnLCAneScsICd6J11cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKlxuICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc3RyaW5ncy5cbiAqL1xuZnVuY3Rpb24gcGFyc2VQcm9wUGF0aChuYW1lKSB7XG4gIC8vIGZvb1t4XVt5XVt6XVxuICAvLyBmb28ueC55LnpcbiAgLy8gZm9vLXgteS16XG4gIC8vIGZvbyB4IHkgelxuICByZXR1cm4gdXRpbHMubWF0Y2hBbGwoL1xcdyt8XFxbKFxcdyopXS9nLCBuYW1lKS5tYXAobWF0Y2ggPT4ge1xuICAgIHJldHVybiBtYXRjaFswXSA9PT0gJ1tdJyA/ICcnIDogbWF0Y2hbMV0gfHwgbWF0Y2hbMF07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYW4gYXJyYXkgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNvbnZlcnQgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIGtleXMgYW5kIHZhbHVlcyBhcyB0aGUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5VG9PYmplY3QoYXJyKSB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcbiAgbGV0IGk7XG4gIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICBsZXQga2V5O1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIG9ialtrZXldID0gYXJyW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIEZvcm1EYXRhIG9iamVjdCBhbmQgcmV0dXJucyBhIEphdmFTY3JpcHQgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gY29udmVydCB0byBKU09OLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3Q8c3RyaW5nLCBhbnk+IHwgbnVsbH0gVGhlIGNvbnZlcnRlZCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGZvcm1EYXRhVG9KU09OKGZvcm1EYXRhKSB7XG4gIGZ1bmN0aW9uIGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0LCBpbmRleCkge1xuICAgIGxldCBuYW1lID0gcGF0aFtpbmRleCsrXTtcbiAgICBjb25zdCBpc051bWVyaWNLZXkgPSBOdW1iZXIuaXNGaW5pdGUoK25hbWUpO1xuICAgIGNvbnN0IGlzTGFzdCA9IGluZGV4ID49IHBhdGgubGVuZ3RoO1xuICAgIG5hbWUgPSAhbmFtZSAmJiB1dGlscy5pc0FycmF5KHRhcmdldCkgPyB0YXJnZXQubGVuZ3RoIDogbmFtZTtcblxuICAgIGlmIChpc0xhc3QpIHtcbiAgICAgIGlmICh1dGlscy5oYXNPd25Qcm9wKHRhcmdldCwgbmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gW3RhcmdldFtuYW1lXSwgdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0W25hbWVdIHx8ICF1dGlscy5pc09iamVjdCh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldFtuYW1lXSwgaW5kZXgpO1xuXG4gICAgaWYgKHJlc3VsdCAmJiB1dGlscy5pc0FycmF5KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IGFycmF5VG9PYmplY3QodGFyZ2V0W25hbWVdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc0Zvcm1EYXRhKGZvcm1EYXRhKSAmJiB1dGlscy5pc0Z1bmN0aW9uKGZvcm1EYXRhLmVudHJpZXMpKSB7XG4gICAgY29uc3Qgb2JqID0ge307XG5cbiAgICB1dGlscy5mb3JFYWNoRW50cnkoZm9ybURhdGEsIChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgYnVpbGRQYXRoKHBhcnNlUHJvcFBhdGgobmFtZSksIHZhbHVlLCBvYmosIDApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nLCB0cmllcyB0byBwYXJzZSBpdCwgYW5kIGlmIGl0IGZhaWxzLCBpdCByZXR1cm5zIHRoZSBzdHJpbmdpZmllZCB2ZXJzaW9uXG4gKiBvZiB0aGUgaW5wdXRcbiAqXG4gKiBAcGFyYW0ge2FueX0gcmF3VmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgc3RyaW5naWZpZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJzZXIgLSBBIGZ1bmN0aW9uIHRoYXQgcGFyc2VzIGEgc3RyaW5nIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVuY29kZXIgLSBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSB2YWx1ZSBhbmQgcmV0dXJucyBhIHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgdGhlIHJhd1ZhbHVlLlxuICovXG5mdW5jdGlvbiBzdHJpbmdpZnlTYWZlbHkocmF3VmFsdWUsIHBhcnNlciwgZW5jb2Rlcikge1xuICBpZiAodXRpbHMuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzLnRyaW0ocmF3VmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLm5hbWUgIT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gKGVuY29kZXIgfHwgSlNPTi5zdHJpbmdpZnkpKHJhd1ZhbHVlKTtcbn1cblxuY29uc3QgZGVmYXVsdHMgPSB7XG5cbiAgdHJhbnNpdGlvbmFsOiB0cmFuc2l0aW9uYWxEZWZhdWx0cyxcblxuICBhZGFwdGVyOiBbJ3hocicsICdodHRwJ10sXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gaGVhZGVycy5nZXRDb250ZW50VHlwZSgpIHx8ICcnO1xuICAgIGNvbnN0IGhhc0pTT05Db250ZW50VHlwZSA9IGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL2pzb24nKSA+IC0xO1xuICAgIGNvbnN0IGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCAmJiB1dGlscy5pc0hUTUxGb3JtKGRhdGEpKSB7XG4gICAgICBkYXRhID0gbmV3IEZvcm1EYXRhKGRhdGEpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9ybURhdGEgPSB1dGlscy5pc0Zvcm1EYXRhKGRhdGEpO1xuXG4gICAgaWYgKGlzRm9ybURhdGEpIHtcbiAgICAgIGlmICghaGFzSlNPTkNvbnRlbnRUeXBlKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCB0aGlzLmZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAoZGF0YSAmJiB1dGlscy5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudmFyIGRlZmF1bHRzJDEgPSBkZWZhdWx0cztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscy50b09iamVjdFNldChbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG52YXIgcGFyc2VIZWFkZXJzID0gcmF3SGVhZGVycyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHt9O1xuICBsZXQga2V5O1xuICBsZXQgdmFsO1xuICBsZXQgaTtcblxuICByYXdIZWFkZXJzICYmIHJhd0hlYWRlcnMuc3BsaXQoJ1xcbicpLmZvckVhY2goZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gbGluZS5zdWJzdHJpbmcoMCwgaSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gbGluZS5zdWJzdHJpbmcoaSArIDEpLnRyaW0oKTtcblxuICAgIGlmICgha2V5IHx8IChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZltrZXldKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgaWYgKHBhcnNlZFtrZXldKSB7XG4gICAgICAgIHBhcnNlZFtrZXldLnB1c2godmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gW3ZhbF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuY29uc3QgJGludGVybmFscyA9IFN5bWJvbCgnaW50ZXJuYWxzJyk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlciAmJiBTdHJpbmcoaGVhZGVyKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKG5vcm1hbGl6ZVZhbHVlKSA6IFN0cmluZyh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW5zKHN0cikge1xuICBjb25zdCB0b2tlbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCB0b2tlbnNSRSA9IC8oW15cXHMsOz1dKylcXHMqKD86PVxccyooW14sO10rKSk/L2c7XG4gIGxldCBtYXRjaDtcblxuICB3aGlsZSAoKG1hdGNoID0gdG9rZW5zUkUuZXhlYyhzdHIpKSkge1xuICAgIHRva2Vuc1ttYXRjaFsxXV0gPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmNvbnN0IGlzVmFsaWRIZWFkZXJOYW1lID0gKHN0cikgPT4gL15bLV9hLXpBLVowLTleYHx+LCEjJCUmJyorLl0rJC8udGVzdChzdHIudHJpbSgpKTtcblxuZnVuY3Rpb24gbWF0Y2hIZWFkZXJWYWx1ZShjb250ZXh0LCB2YWx1ZSwgaGVhZGVyLCBmaWx0ZXIsIGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICBpZiAodXRpbHMuaXNGdW5jdGlvbihmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKHRoaXMsIHZhbHVlLCBoZWFkZXIpO1xuICB9XG5cbiAgaWYgKGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICAgIHZhbHVlID0gaGVhZGVyO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc1N0cmluZyh2YWx1ZSkpIHJldHVybjtcblxuICBpZiAodXRpbHMuaXNTdHJpbmcoZmlsdGVyKSkge1xuICAgIHJldHVybiB2YWx1ZS5pbmRleE9mKGZpbHRlcikgIT09IC0xO1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzUmVnRXhwKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLnRlc3QodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlci50cmltKClcbiAgICAudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oW2EtelxcZF0pKFxcdyopL2csICh3LCBjaGFyLCBzdHIpID0+IHtcbiAgICAgIHJldHVybiBjaGFyLnRvVXBwZXJDYXNlKCkgKyBzdHI7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQWNjZXNzb3JzKG9iaiwgaGVhZGVyKSB7XG4gIGNvbnN0IGFjY2Vzc29yTmFtZSA9IHV0aWxzLnRvQ2FtZWxDYXNlKCcgJyArIGhlYWRlcik7XG5cbiAgWydnZXQnLCAnc2V0JywgJ2hhcyddLmZvckVhY2gobWV0aG9kTmFtZSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbWV0aG9kTmFtZSArIGFjY2Vzc29yTmFtZSwge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbbWV0aG9kTmFtZV0uY2FsbCh0aGlzLCBoZWFkZXIsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9KTtcbn1cblxuY2xhc3MgQXhpb3NIZWFkZXJzIHtcbiAgY29uc3RydWN0b3IoaGVhZGVycykge1xuICAgIGhlYWRlcnMgJiYgdGhpcy5zZXQoaGVhZGVycyk7XG4gIH1cblxuICBzZXQoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSwgcmV3cml0ZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghbEhlYWRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hlYWRlciBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgbEhlYWRlcik7XG5cbiAgICAgIGlmKCFrZXkgfHwgc2VsZltrZXldID09PSB1bmRlZmluZWQgfHwgX3Jld3JpdGUgPT09IHRydWUgfHwgKF9yZXdyaXRlID09PSB1bmRlZmluZWQgJiYgc2VsZltrZXldICE9PSBmYWxzZSkpIHtcbiAgICAgICAgc2VsZltrZXkgfHwgX2hlYWRlcl0gPSBub3JtYWxpemVWYWx1ZShfdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNldEhlYWRlcnMgPSAoaGVhZGVycywgX3Jld3JpdGUpID0+XG4gICAgICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIChfdmFsdWUsIF9oZWFkZXIpID0+IHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSk7XG5cbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChoZWFkZXIpIHx8IGhlYWRlciBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IpIHtcbiAgICAgIHNldEhlYWRlcnMoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmKHV0aWxzLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgIGlmICghcGFyc2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZVRva2Vucyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIHJldHVybiAhIShrZXkgJiYgdGhpc1trZXldICE9PSB1bmRlZmluZWQgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVIZWFkZXIoX2hlYWRlcikge1xuICAgICAgX2hlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzLmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCAnKSA6IHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpLm1hcCgoW2hlYWRlciwgdmFsdWVdKSA9PiBoZWFkZXIgKyAnOiAnICsgdmFsdWUpLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdID0gKHRoaXNbJGludGVybmFsc10gPSB7XG4gICAgICBhY2Nlc3NvcnM6IHt9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSBpbnRlcm5hbHMuYWNjZXNzb3JzO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lQWNjZXNzb3IoX2hlYWRlcikge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFhY2Nlc3NvcnNbbEhlYWRlcl0pIHtcbiAgICAgICAgYnVpbGRBY2Nlc3NvcnMocHJvdG90eXBlLCBfaGVhZGVyKTtcbiAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlscy5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7dmFsdWV9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudXRpbHMuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMpO1xuXG52YXIgQXhpb3NIZWFkZXJzJDEgPSBBeGlvc0hlYWRlcnM7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEBwYXJhbSB7P09iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlIG9iamVjdFxuICpcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xuZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShmbnMsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IGNvbmZpZyA9IHRoaXMgfHwgZGVmYXVsdHMkMTtcbiAgY29uc3QgY29udGV4dCA9IHJlc3BvbnNlIHx8IGNvbmZpZztcbiAgY29uc3QgaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oY29udGV4dC5oZWFkZXJzKTtcbiAgbGV0IGRhdGEgPSBjb250ZXh0LmRhdGE7XG5cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG5cbi8qKlxuICogQSBgQ2FuY2VsZWRFcnJvcmAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdD19IHJlcXVlc3QgVGhlIHJlcXVlc3QuXG4gKlxuICogQHJldHVybnMge0NhbmNlbGVkRXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgQXhpb3NFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UgPT0gbnVsbCA/ICdjYW5jZWxlZCcgOiBtZXNzYWdlLCBBeGlvc0Vycm9yLkVSUl9DQU5DRUxFRCwgY29uZmlnLCByZXF1ZXN0KTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscy5pbmhlcml0cyhDYW5jZWxlZEVycm9yLCBBeGlvc0Vycm9yLCB7XG4gIF9fQ0FOQ0VMX186IHRydWVcbn0pO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSByZXNwb25zZS5cbiAqL1xuZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgY29uc3QgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIFtBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFXVtNYXRoLmZsb29yKHJlc3BvbnNlLnN0YXR1cyAvIDEwMCkgLSA0XSxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59XG5cbnZhciBjb29raWVzID0gcGxhdGZvcm0uaXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4vLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICBjb25zdCBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICBjb25zdCBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbi8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZCtcXC0uXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbmZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xuZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59XG5cbnZhciBpc1VSTFNhbWVPcmlnaW4gPSBwbGF0Zm9ybS5pc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbi8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgY29uc3QgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgY29uc3QgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGV0IG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICBsZXQgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgY29uc3QgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKTtcblxuZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGxpc3RlbmVyLCBpc0Rvd25sb2FkU3RyZWFtKSB7XG4gIGxldCBieXRlc05vdGlmaWVkID0gMDtcbiAgY29uc3QgX3NwZWVkb21ldGVyID0gc3BlZWRvbWV0ZXIoNTAsIDI1MCk7XG5cbiAgcmV0dXJuIGUgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XG5cbiAgICBieXRlc05vdGlmaWVkID0gbG9hZGVkO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gKGxvYWRlZCAvIHRvdGFsKSA6IHVuZGVmaW5lZCxcbiAgICAgIGJ5dGVzOiBwcm9ncmVzc0J5dGVzLFxuICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBlc3RpbWF0ZWQ6IHJhdGUgJiYgdG90YWwgJiYgaW5SYW5nZSA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGVcbiAgICB9O1xuXG4gICAgZGF0YVtpc0Rvd25sb2FkU3RyZWFtID8gJ2Rvd25sb2FkJyA6ICd1cGxvYWQnXSA9IHRydWU7XG5cbiAgICBsaXN0ZW5lcihkYXRhKTtcbiAgfTtcbn1cblxuY29uc3QgaXNYSFJBZGFwdGVyU3VwcG9ydGVkID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJztcblxudmFyIHhockFkYXB0ZXIgPSBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgJiYgZnVuY3Rpb24gKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIGxldCByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShjb25maWcuaGVhZGVycykubm9ybWFsaXplKCk7XG4gICAgY29uc3QgcmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICBsZXQgb25DYW5jZWxlZDtcbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgICBjb25maWcuY2FuY2VsVG9rZW4udW5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25maWcuc2lnbmFsKSB7XG4gICAgICAgIGNvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY29udGVudFR5cGU7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pc1N0YW5kYXJkQnJvd3NlckVudiB8fCBwbGF0Zm9ybS5pc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudikge1xuICAgICAgICByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShmYWxzZSk7IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICAgIH0gZWxzZSBpZighcmVxdWVzdEhlYWRlcnMuZ2V0Q29udGVudFR5cGUoL15cXHMqbXVsdGlwYXJ0XFwvZm9ybS1kYXRhLykpe1xuICAgICAgICByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZSgnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpOyAvLyBtb2JpbGUvZGVza3RvcCBhcHAgZnJhbWV3b3Jrc1xuICAgICAgfSBlbHNlIGlmKHV0aWxzLmlzU3RyaW5nKGNvbnRlbnRUeXBlID0gcmVxdWVzdEhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSkpe1xuICAgICAgICAvLyBmaXggc2VtaWNvbG9uIGR1cGxpY2F0aW9uIGlzc3VlIGZvciBSZWFjdE5hdGl2ZSBGb3JtRGF0YSBpbXBsZW1lbnRhdGlvblxuICAgICAgICByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZS5yZXBsYWNlKC9eXFxzKihtdWx0aXBhcnRcXC9mb3JtLWRhdGEpOysvLCAnJDEnKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIGNvbnN0IHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICBjb25zdCBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgOiAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKSk7XG4gICAgfVxuXG4gICAgY29uc3QgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIGZ1bmN0aW9uIG9ubG9hZGVuZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShcbiAgICAgICAgJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICBsZXQgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0ID8gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IGNvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAocGxhdGZvcm0uaXNTdGFuZGFyZEJyb3dzZXJFbnYpIHtcbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgLy8gcmVnYXJkaW5nIENWRS0yMDIzLTQ1ODU3IGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgY29uZGl0aW9uIHdhcyByZW1vdmVkIHRlbXBvcmFyaWx5XG4gICAgICBjb25zdCB4c3JmVmFsdWUgPSBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSAmJiBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKTtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVycy5zZXQoY29uZmlnLnhzcmZIZWFkZXJOYW1lLCB4c3JmVmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICByZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkICYmIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKG51bGwpO1xuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMudG9KU09OKCksIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBwcm9ncmVzc0V2ZW50UmVkdWNlcihjb25maWcub25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbiB8fCBjb25maWcuc2lnbmFsKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgb25DYW5jZWxlZCA9IGNhbmNlbCA9PiB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuICYmIGNvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLmFib3J0ZWQgPyBvbkNhbmNlbGVkKCkgOiBjb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKGZ1bGxQYXRoKTtcblxuICAgIGlmIChwcm90b2NvbCAmJiBwbGF0Zm9ybS5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgfSk7XG59O1xuXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xuICBodHRwOiBodHRwQWRhcHRlcixcbiAgeGhyOiB4aHJBZGFwdGVyXG59O1xuXG51dGlscy5mb3JFYWNoKGtub3duQWRhcHRlcnMsIChmbiwgdmFsdWUpID0+IHtcbiAgaWYgKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ25hbWUnLCB7dmFsdWV9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7dmFsdWV9KTtcbiAgfVxufSk7XG5cbmNvbnN0IHJlbmRlclJlYXNvbiA9IChyZWFzb24pID0+IGAtICR7cmVhc29ufWA7XG5cbmNvbnN0IGlzUmVzb2x2ZWRIYW5kbGUgPSAoYWRhcHRlcikgPT4gdXRpbHMuaXNGdW5jdGlvbihhZGFwdGVyKSB8fCBhZGFwdGVyID09PSBudWxsIHx8IGFkYXB0ZXIgPT09IGZhbHNlO1xuXG52YXIgYWRhcHRlcnMgPSB7XG4gIGdldEFkYXB0ZXI6IChhZGFwdGVycykgPT4ge1xuICAgIGFkYXB0ZXJzID0gdXRpbHMuaXNBcnJheShhZGFwdGVycykgPyBhZGFwdGVycyA6IFthZGFwdGVyc107XG5cbiAgICBjb25zdCB7bGVuZ3RofSA9IGFkYXB0ZXJzO1xuICAgIGxldCBuYW1lT3JBZGFwdGVyO1xuICAgIGxldCBhZGFwdGVyO1xuXG4gICAgY29uc3QgcmVqZWN0ZWRSZWFzb25zID0ge307XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBuYW1lT3JBZGFwdGVyID0gYWRhcHRlcnNbaV07XG4gICAgICBsZXQgaWQ7XG5cbiAgICAgIGFkYXB0ZXIgPSBuYW1lT3JBZGFwdGVyO1xuXG4gICAgICBpZiAoIWlzUmVzb2x2ZWRIYW5kbGUobmFtZU9yQWRhcHRlcikpIHtcbiAgICAgICAgYWRhcHRlciA9IGtub3duQWRhcHRlcnNbKGlkID0gU3RyaW5nKG5hbWVPckFkYXB0ZXIpKS50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICBpZiAoYWRhcHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoYFVua25vd24gYWRhcHRlciAnJHtpZH0nYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGFkYXB0ZXIpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJlamVjdGVkUmVhc29uc1tpZCB8fCAnIycgKyBpXSA9IGFkYXB0ZXI7XG4gICAgfVxuXG4gICAgaWYgKCFhZGFwdGVyKSB7XG5cbiAgICAgIGNvbnN0IHJlYXNvbnMgPSBPYmplY3QuZW50cmllcyhyZWplY3RlZFJlYXNvbnMpXG4gICAgICAgIC5tYXAoKFtpZCwgc3RhdGVdKSA9PiBgYWRhcHRlciAke2lkfSBgICtcbiAgICAgICAgICAoc3RhdGUgPT09IGZhbHNlID8gJ2lzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGVudmlyb25tZW50JyA6ICdpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBidWlsZCcpXG4gICAgICAgICk7XG5cbiAgICAgIGxldCBzID0gbGVuZ3RoID9cbiAgICAgICAgKHJlYXNvbnMubGVuZ3RoID4gMSA/ICdzaW5jZSA6XFxuJyArIHJlYXNvbnMubWFwKHJlbmRlclJlYXNvbikuam9pbignXFxuJykgOiAnICcgKyByZW5kZXJSZWFzb24ocmVhc29uc1swXSkpIDpcbiAgICAgICAgJ2FzIG5vIGFkYXB0ZXIgc3BlY2lmaWVkJztcblxuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGBUaGVyZSBpcyBubyBzdWl0YWJsZSBhZGFwdGVyIHRvIGRpc3BhdGNoIHRoZSByZXF1ZXN0IGAgKyBzLFxuICAgICAgICAnRVJSX05PVF9TVVBQT1JUJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRhcHRlcjtcbiAgfSxcbiAgYWRhcHRlcnM6IGtub3duQWRhcHRlcnNcbn07XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKGNvbmZpZy5oZWFkZXJzKTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgIGNvbmZpZyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIGlmIChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10uaW5kZXhPZihjb25maWcubWV0aG9kKSAhPT0gLTEpIHtcbiAgICBjb25maWcuaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgYWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXIoY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMkMS5hZGFwdGVyKTtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgIGNvbmZpZyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20ocmVhc29uLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn1cblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyQxID8gdGhpbmcudG9KU09OKCkgOiB0aGluZztcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5mdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgY29uc3QgY29uZmlnID0ge307XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UsIGNhc2VsZXNzKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZS5jYWxsKHtjYXNlbGVzc30sIHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhhLCBiLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiLCBjYXNlbGVzcyk7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEsIGNhc2VsZXNzKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYikpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGIpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEaXJlY3RLZXlzKGEsIGIsIHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYik7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lcmdlTWFwID0ge1xuICAgIHVybDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBtZXRob2Q6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgZGF0YTogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBiYXNlVVJMOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVzcG9uc2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcGFyYW1zU2VyaWFsaXplcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXRNZXNzYWdlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhDcmVkZW50aWFsczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhZGFwdGVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlVHlwZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmQ29va2llTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmSGVhZGVyTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvblVwbG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uRG93bmxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBkZWNvbXByZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heENvbnRlbnRMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Qm9keUxlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBiZWZvcmVSZWRpcmVjdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc3BvcnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cEFnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBzQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgY2FuY2VsVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgc29ja2V0UGF0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZUVuY29kaW5nOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHZhbGlkYXRlU3RhdHVzOiBtZXJnZURpcmVjdEtleXMsXG4gICAgaGVhZGVyczogKGEsIGIpID0+IG1lcmdlRGVlcFByb3BlcnRpZXMoaGVhZGVyc1RvT2JqZWN0KGEpLCBoZWFkZXJzVG9PYmplY3QoYiksIHRydWUpXG4gIH07XG5cbiAgdXRpbHMuZm9yRWFjaChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCBjb25maWcxLCBjb25maWcyKSksIGZ1bmN0aW9uIGNvbXB1dGVDb25maWdWYWx1ZShwcm9wKSB7XG4gICAgY29uc3QgbWVyZ2UgPSBtZXJnZU1hcFtwcm9wXSB8fCBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIGNvbnN0IGNvbmZpZ1ZhbHVlID0gbWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSwgcHJvcCk7XG4gICAgKHV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZ1ZhbHVlKSAmJiBtZXJnZSAhPT0gbWVyZ2VEaXJlY3RLZXlzKSB8fCAoY29uZmlnW3Byb3BdID0gY29uZmlnVmFsdWUpO1xuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG5jb25zdCBWRVJTSU9OID0gXCIxLjYuMFwiO1xuXG5jb25zdCB2YWxpZGF0b3JzJDEgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKCh0eXBlLCBpKSA9PiB7XG4gIHZhbGlkYXRvcnMkMVt0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzJDEudHJhbnNpdGlvbmFsID0gZnVuY3Rpb24gdHJhbnNpdGlvbmFsKHZhbGlkYXRvciwgdmVyc2lvbiwgbWVzc2FnZSkge1xuICBmdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG9wdCwgZGVzYykge1xuICAgIHJldHVybiAnW0F4aW9zIHYnICsgVkVSU0lPTiArICddIFRyYW5zaXRpb25hbCBvcHRpb24gXFwnJyArIG9wdCArICdcXCcnICsgZGVzYyArIChtZXNzYWdlID8gJy4gJyArIG1lc3NhZ2UgOiAnJyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gKHZhbHVlLCBvcHQsIG9wdHMpID0+IHtcbiAgICBpZiAodmFsaWRhdG9yID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGZvcm1hdE1lc3NhZ2Uob3B0LCAnIGhhcyBiZWVuIHJlbW92ZWQnICsgKHZlcnNpb24gPyAnIGluICcgKyB2ZXJzaW9uIDogJycpKSxcbiAgICAgICAgQXhpb3NFcnJvci5FUlJfREVQUkVDQVRFRFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodmVyc2lvbiAmJiAhZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0pIHtcbiAgICAgIGRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdID0gdHJ1ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGZvcm1hdE1lc3NhZ2UoXG4gICAgICAgICAgb3B0LFxuICAgICAgICAgICcgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2JyArIHZlcnNpb24gKyAnIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5lYXIgZnV0dXJlJ1xuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0b3IgPyB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0cykgOiB0cnVlO1xuICB9O1xufTtcblxuLyoqXG4gKiBBc3NlcnQgb2JqZWN0J3MgcHJvcGVydGllcyB0eXBlXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBzY2hlbWFcbiAqIEBwYXJhbSB7Ym9vbGVhbj99IGFsbG93VW5rbm93blxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gYXNzZXJ0T3B0aW9ucyhvcHRpb25zLCBzY2hlbWEsIGFsbG93VW5rbm93bikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbnMgbXVzdCBiZSBhbiBvYmplY3QnLCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgY29uc3Qgb3B0ID0ga2V5c1tpXTtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBzY2hlbWFbb3B0XTtcbiAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdGlvbnMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9uICcgKyBvcHQgKyAnIG11c3QgYmUgJyArIHJlc3VsdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKGFsbG93VW5rbm93biAhPT0gdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ1Vua25vd24gb3B0aW9uICcgKyBvcHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT04pO1xuICAgIH1cbiAgfVxufVxuXG52YXIgdmFsaWRhdG9yID0ge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzOiB2YWxpZGF0b3JzJDFcbn07XG5cbmNvbnN0IHZhbGlkYXRvcnMgPSB2YWxpZGF0b3IudmFsaWRhdG9ycztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuY2xhc3MgQXhpb3Mge1xuICBjb25zdHJ1Y3RvcihpbnN0YW5jZUNvbmZpZykge1xuICAgIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIkMSgpLFxuICAgICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIkMSgpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBjb25maWdPclVybCBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gICAqIEBwYXJhbSB7P09iamVjdH0gY29uZmlnXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAgICovXG4gIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgY29uZmlnLnVybCA9IGNvbmZpZ09yVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcgPSBjb25maWdPclVybCB8fCB7fTtcbiAgICB9XG5cbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgY29uc3Qge3RyYW5zaXRpb25hbCwgcGFyYW1zU2VyaWFsaXplciwgaGVhZGVyc30gPSBjb25maWc7XG5cbiAgICBpZiAodHJhbnNpdGlvbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xuICAgICAgICBzaWxlbnRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgZm9yY2VkSlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zU2VyaWFsaXplciAhPSBudWxsKSB7XG4gICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihwYXJhbXNTZXJpYWxpemVyKSkge1xuICAgICAgICBjb25maWcucGFyYW1zU2VyaWFsaXplciA9IHtcbiAgICAgICAgICBzZXJpYWxpemU6IHBhcmFtc1NlcmlhbGl6ZXJcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcbiAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscy5tZXJnZShcbiAgICAgIGhlYWRlcnMuY29tbW9uLFxuICAgICAgaGVhZGVyc1tjb25maWcubWV0aG9kXVxuICAgICk7XG5cbiAgICBoZWFkZXJzICYmIHV0aWxzLmZvckVhY2goXG4gICAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICAgIChtZXRob2QpID0+IHtcbiAgICAgICAgZGVsZXRlIGhlYWRlcnNbbWV0aG9kXTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5jb25jYXQoY29udGV4dEhlYWRlcnMsIGhlYWRlcnMpO1xuXG4gICAgLy8gZmlsdGVyIG91dCBza2lwcGVkIGludGVyY2VwdG9yc1xuICAgIGNvbnN0IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgbGV0IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHRydWU7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICBpZiAodHlwZW9mIGludGVyY2VwdG9yLnJ1bldoZW4gPT09ICdmdW5jdGlvbicgJiYgaW50ZXJjZXB0b3IucnVuV2hlbihjb25maWcpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyA9IHN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycyAmJiBpbnRlcmNlcHRvci5zeW5jaHJvbm91cztcblxuICAgICAgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgICByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgICB9KTtcblxuICAgIGxldCBwcm9taXNlO1xuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGVuO1xuXG4gICAgaWYgKCFzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMpIHtcbiAgICAgIGNvbnN0IGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdC5iaW5kKHRoaXMpLCB1bmRlZmluZWRdO1xuICAgICAgY2hhaW4udW5zaGlmdC5hcHBseShjaGFpbiwgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgY2hhaW4ucHVzaC5hcHBseShjaGFpbiwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGxlbiA9IGNoYWluLmxlbmd0aDtcblxuICAgICAgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gICAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluW2krK10sIGNoYWluW2krK10pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBsZW4gPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICBsZXQgbmV3Q29uZmlnID0gY29uZmlnO1xuXG4gICAgaSA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgY29uc3Qgb25GdWxmaWxsZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgY29uc3Qgb25SZWplY3RlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICB0cnkge1xuICAgICAgICBuZXdDb25maWcgPSBvbkZ1bGZpbGxlZChuZXdDb25maWcpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgb25SZWplY3RlZC5jYWxsKHRoaXMsIGVycm9yKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHByb21pc2UgPSBkaXNwYXRjaFJlcXVlc3QuY2FsbCh0aGlzLCBuZXdDb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cblxuICAgIGkgPSAwO1xuICAgIGxlbiA9IHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaSA8IGxlbikge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihyZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10pO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZ2V0VXJpKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gICAgY29uc3QgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXR1cm4gYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKTtcbiAgfVxufVxuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cblxuICBmdW5jdGlvbiBnZW5lcmF0ZUhUVFBNZXRob2QoaXNGb3JtKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGh0dHBNZXRob2QodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogaXNGb3JtID8ge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcbiAgICAgICAgfSA6IHt9LFxuICAgICAgICB1cmwsXG4gICAgICAgIGRhdGFcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBnZW5lcmF0ZUhUVFBNZXRob2QoKTtcblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbn0pO1xuXG52YXIgQXhpb3MkMSA9IEF4aW9zO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxUb2tlbn1cbiAqL1xuY2xhc3MgQ2FuY2VsVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbihjYW5jZWwgPT4ge1xuICAgICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgIGxldCBpID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIHRva2VuLl9saXN0ZW5lcnNbaV0oY2FuY2VsKTtcbiAgICAgIH1cbiAgICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbiA9IG9uZnVsZmlsbGVkID0+IHtcbiAgICAgIGxldCBfcmVzb2x2ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAgICovXG4gIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gICAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gICAqL1xuICBzdGF0aWMgc291cmNlKCkge1xuICAgIGxldCBjYW5jZWw7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgICAgY2FuY2VsID0gYztcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW4sXG4gICAgICBjYW5jZWxcbiAgICB9O1xuICB9XG59XG5cbnZhciBDYW5jZWxUb2tlbiQxID0gQ2FuY2VsVG9rZW47XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMuaXNPYmplY3QocGF5bG9hZCkgJiYgKHBheWxvYWQuaXNBeGlvc0Vycm9yID09PSB0cnVlKTtcbn1cblxuY29uc3QgSHR0cFN0YXR1c0NvZGUgPSB7XG4gIENvbnRpbnVlOiAxMDAsXG4gIFN3aXRjaGluZ1Byb3RvY29sczogMTAxLFxuICBQcm9jZXNzaW5nOiAxMDIsXG4gIEVhcmx5SGludHM6IDEwMyxcbiAgT2s6IDIwMCxcbiAgQ3JlYXRlZDogMjAxLFxuICBBY2NlcHRlZDogMjAyLFxuICBOb25BdXRob3JpdGF0aXZlSW5mb3JtYXRpb246IDIwMyxcbiAgTm9Db250ZW50OiAyMDQsXG4gIFJlc2V0Q29udGVudDogMjA1LFxuICBQYXJ0aWFsQ29udGVudDogMjA2LFxuICBNdWx0aVN0YXR1czogMjA3LFxuICBBbHJlYWR5UmVwb3J0ZWQ6IDIwOCxcbiAgSW1Vc2VkOiAyMjYsXG4gIE11bHRpcGxlQ2hvaWNlczogMzAwLFxuICBNb3ZlZFBlcm1hbmVudGx5OiAzMDEsXG4gIEZvdW5kOiAzMDIsXG4gIFNlZU90aGVyOiAzMDMsXG4gIE5vdE1vZGlmaWVkOiAzMDQsXG4gIFVzZVByb3h5OiAzMDUsXG4gIFVudXNlZDogMzA2LFxuICBUZW1wb3JhcnlSZWRpcmVjdDogMzA3LFxuICBQZXJtYW5lbnRSZWRpcmVjdDogMzA4LFxuICBCYWRSZXF1ZXN0OiA0MDAsXG4gIFVuYXV0aG9yaXplZDogNDAxLFxuICBQYXltZW50UmVxdWlyZWQ6IDQwMixcbiAgRm9yYmlkZGVuOiA0MDMsXG4gIE5vdEZvdW5kOiA0MDQsXG4gIE1ldGhvZE5vdEFsbG93ZWQ6IDQwNSxcbiAgTm90QWNjZXB0YWJsZTogNDA2LFxuICBQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDQwNyxcbiAgUmVxdWVzdFRpbWVvdXQ6IDQwOCxcbiAgQ29uZmxpY3Q6IDQwOSxcbiAgR29uZTogNDEwLFxuICBMZW5ndGhSZXF1aXJlZDogNDExLFxuICBQcmVjb25kaXRpb25GYWlsZWQ6IDQxMixcbiAgUGF5bG9hZFRvb0xhcmdlOiA0MTMsXG4gIFVyaVRvb0xvbmc6IDQxNCxcbiAgVW5zdXBwb3J0ZWRNZWRpYVR5cGU6IDQxNSxcbiAgUmFuZ2VOb3RTYXRpc2ZpYWJsZTogNDE2LFxuICBFeHBlY3RhdGlvbkZhaWxlZDogNDE3LFxuICBJbUFUZWFwb3Q6IDQxOCxcbiAgTWlzZGlyZWN0ZWRSZXF1ZXN0OiA0MjEsXG4gIFVucHJvY2Vzc2FibGVFbnRpdHk6IDQyMixcbiAgTG9ja2VkOiA0MjMsXG4gIEZhaWxlZERlcGVuZGVuY3k6IDQyNCxcbiAgVG9vRWFybHk6IDQyNSxcbiAgVXBncmFkZVJlcXVpcmVkOiA0MjYsXG4gIFByZWNvbmRpdGlvblJlcXVpcmVkOiA0MjgsXG4gIFRvb01hbnlSZXF1ZXN0czogNDI5LFxuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2U6IDQzMSxcbiAgVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnM6IDQ1MSxcbiAgSW50ZXJuYWxTZXJ2ZXJFcnJvcjogNTAwLFxuICBOb3RJbXBsZW1lbnRlZDogNTAxLFxuICBCYWRHYXRld2F5OiA1MDIsXG4gIFNlcnZpY2VVbmF2YWlsYWJsZTogNTAzLFxuICBHYXRld2F5VGltZW91dDogNTA0LFxuICBIdHRwVmVyc2lvbk5vdFN1cHBvcnRlZDogNTA1LFxuICBWYXJpYW50QWxzb05lZ290aWF0ZXM6IDUwNixcbiAgSW5zdWZmaWNpZW50U3RvcmFnZTogNTA3LFxuICBMb29wRGV0ZWN0ZWQ6IDUwOCxcbiAgTm90RXh0ZW5kZWQ6IDUxMCxcbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQ6IDUxMSxcbn07XG5cbk9iamVjdC5lbnRyaWVzKEh0dHBTdGF0dXNDb2RlKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgSHR0cFN0YXR1c0NvZGVbdmFsdWVdID0ga2V5O1xufSk7XG5cbnZhciBIdHRwU3RhdHVzQ29kZSQxID0gSHR0cFN0YXR1c0NvZGU7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyQxKGRlZmF1bHRDb25maWcpO1xuICBjb25zdCBpbnN0YW5jZSA9IGJpbmQoQXhpb3MkMS5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcyQxLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMkMSk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcyQxO1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbGVkRXJyb3IgPSBDYW5jZWxlZEVycm9yO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSBDYW5jZWxUb2tlbiQxO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycyQxO1xuXG5heGlvcy5mb3JtVG9KU09OID0gdGhpbmcgPT4gZm9ybURhdGFUb0pTT04odXRpbHMuaXNIVE1MRm9ybSh0aGluZykgPyBuZXcgRm9ybURhdGEodGhpbmcpIDogdGhpbmcpO1xuXG5heGlvcy5nZXRBZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcjtcblxuYXhpb3MuSHR0cFN0YXR1c0NvZGUgPSBIdHRwU3RhdHVzQ29kZSQxO1xuXG5heGlvcy5kZWZhdWx0ID0gYXhpb3M7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1heGlvcy5janMubWFwXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2xpYi9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJEb21haW4iLCJkYXRhIiwicmVjZWl2aW5nIiwic2VuZGluZyIsIm5hbWUiLCJyZXF1aXJlX3RscyIsInNraXBfdmVyaWZpY2F0aW9uIiwic3RhdGUiLCJ3aWxkY2FyZCIsInNwYW1fYWN0aW9uIiwiY3JlYXRlZF9hdCIsInNtdHBfcGFzc3dvcmQiLCJzbXRwX2xvZ2luIiwidHlwZSIsInJlY2VpdmluZ19kbnNfcmVjb3JkcyIsInNlbmRpbmdfZG5zX3JlY29yZHMiLCJkeW5hbWljS2V5cyIsImR5bmFtaWNQcm9wZXJ0aWVzIiwicmVkdWNlIiwiYWNjIiwicHJvcGVydHlOYW1lIiwicHJvcCIsIk9iamVjdCIsImFzc2lnbiIsInVybF9qb2luXzEiLCJfX2ltcG9ydERlZmF1bHQiLCJyZXF1aXJlIiwiRXJyb3JfMSIsImRvbWFpbl8xIiwiRG9tYWluc0NsaWVudCIsInJlcXVlc3QiLCJkb21haW5DcmVkZW50aWFsc0NsaWVudCIsImRvbWFpblRlbXBsYXRlc0NsaWVudCIsImRvbWFpblRhZ3NDbGllbnQiLCJkb21haW5DcmVkZW50aWFscyIsImRvbWFpblRlbXBsYXRlcyIsImRvbWFpblRhZ3MiLCJwcm90b3R5cGUiLCJfaGFuZGxlQm9vbFZhbHVlcyIsInByb3BzRm9yUmVwbGFjZW1lbnQiLCJyZXBsYWNlZFByb3BzIiwia2V5cyIsImtleSIsInZhbHVlIiwidG9TdHJpbmciLCJfX2Fzc2lnbiIsIl9wYXJzZU1lc3NhZ2UiLCJyZXNwb25zZSIsImJvZHkiLCJwYXJzZURvbWFpbkxpc3QiLCJpdGVtcyIsIm1hcCIsIml0ZW0iLCJkZWZhdWx0IiwiX3BhcnNlRG9tYWluIiwiZG9tYWluIiwiX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyIsInRyYWNraW5nIiwiX3BhcnNlVHJhY2tpbmdVcGRhdGUiLCJsaXN0IiwicXVlcnkiLCJfdGhpcyIsImdldCIsInRoZW4iLCJyZXMiLCJjb25jYXQiLCJjcmVhdGUiLCJwb3N0T2JqIiwicG9zdFdpdGhGRCIsInVwZGF0ZSIsInB1dERhdGEiLCJwdXRXaXRoRkQiLCJ2ZXJpZnkiLCJwdXQiLCJkZXN0cm95IiwiZGVsZXRlIiwiZ2V0Q29ubmVjdGlvbiIsImNvbm5lY3Rpb24iLCJ1cGRhdGVDb25uZWN0aW9uIiwiZ2V0VHJhY2tpbmciLCJ1cGRhdGVUcmFja2luZyIsImFjdGl2ZSIsImdldFVzZXJEYXRhRXJyb3IiLCJnZXRJcHMiLCJfYSIsImFzc2lnbklwIiwiaXAiLCJkZWxldGVJcCIsImxpbmtJcFBvb2wiLCJwb29sSWQiLCJwb29sX2lkIiwidW5saW5rSXBQb2xsIiwicmVwbGFjZW1lbnQiLCJzZWFyY2hQYXJhbXMiLCJ1cGRhdGVES0lNQXV0aG9yaXR5Iiwic2VsZiIsInVwZGF0ZURLSU1TZWxlY3RvciIsImRraW1TZWxlY3RvciIsInVwZGF0ZVdlYlByZWZpeCIsIndlYlByZWZpeCIsIkRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IiwiYmFzZVJvdXRlIiwiX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0IiwidG90YWxDb3VudCIsInRvdGFsX2NvdW50IiwiX3BhcnNlTWVzc2FnZVJlc3BvbnNlIiwicmVzdWx0Iiwic3RhdHVzIiwibWVzc2FnZSIsIl9wYXJzZURlbGV0ZWRSZXNwb25zZSIsInNwZWMiLCJjcmVkZW50aWFsc0xvZ2luIiwiTmF2aWdhdGlvblRocnVQYWdlc18xIiwiRG9tYWluVGFnIiwidGFnSW5mbyIsInRhZyIsImRlc2NyaXB0aW9uIiwiRGF0ZSIsImV4cG9ydHMiLCJEb21haW5UYWdTdGF0aXN0aWMiLCJ0YWdTdGF0aXN0aWNJbmZvIiwic3RhcnQiLCJlbmQiLCJyZXNvbHV0aW9uIiwic3RhdHMiLCJzdGF0IiwidGltZSIsIkRvbWFpblRhZ3NDbGllbnQiLCJfc3VwZXIiLCJfX2V4dGVuZHMiLCJjYWxsIiwicGFyc2VMaXN0IiwicGFnZXMiLCJwYXJzZVBhZ2VMaW5rcyIsIl9wYXJzZVRhZ1N0YXRpc3RpYyIsInJlcXVlc3RMaXN0V2l0aFBhZ2VzIiwic3RhdGlzdGljIiwiY291bnRyaWVzIiwicHJvdmlkZXJzIiwiZGV2aWNlcyIsIkRvbWFpblRlbXBsYXRlSXRlbSIsImRvbWFpblRlbXBsYXRlRnJvbUFQSSIsImNyZWF0ZWRBdCIsImNyZWF0ZWRCeSIsImlkIiwidmVyc2lvbiIsInZlcnNpb25zIiwibGVuZ3RoIiwiRG9tYWluVGVtcGxhdGVzQ2xpZW50IiwicGFyc2VDcmVhdGlvblJlc3BvbnNlIiwidGVtcGxhdGUiLCJwYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlIiwicGFyc2VNdXRhdGlvblJlc3BvbnNlIiwidGVtcGxhdGVOYW1lIiwicGFyc2VOb3RpZmljYXRpb25SZXNwb25zZSIsInBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UiLCJ0ZW1wbGF0ZVZlcnNpb24iLCJkIiwicGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyIsImRlc3Ryb3lBbGwiLCJjcmVhdGVWZXJzaW9uIiwiZ2V0VmVyc2lvbiIsInVwZGF0ZVZlcnNpb24iLCJkZXN0cm95VmVyc2lvbiIsImxpc3RWZXJzaW9ucyIsIkV2ZW50Q2xpZW50IiwiSXBQb29sc0NsaWVudCIsInBhcnNlSXBQb29sc1Jlc3BvbnNlIiwic2VudCIsInBhdGNoV2l0aEZEIiwiSXBzQ2xpZW50IiwicGFyc2VJcHNSZXNwb25zZSIsIlJlcXVlc3RfMSIsImRvbWFpbnNDbGllbnRfMSIsIkV2ZW50c18xIiwiU3RhdHNDbGllbnRfMSIsIlN1cHByZXNzaW9uc0NsaWVudF8xIiwiV2ViaG9va3NfMSIsIk1lc3NhZ2VzXzEiLCJSb3V0ZXNfMSIsInZhbGlkYXRlXzEiLCJJUHNfMSIsIklQUG9vbHNfMSIsIm1haWxpbmdMaXN0c18xIiwibWFpbExpc3RNZW1iZXJzXzEiLCJkb21haW5zQ3JlZGVudGlhbHNfMSIsIm11bHRpcGxlVmFsaWRhdGlvbl8xIiwiZG9tYWluc1RlbXBsYXRlc18xIiwiZG9tYWluc1RhZ3NfMSIsIlN1YmFjY291bnRzXzEiLCJNYWlsZ3VuQ2xpZW50Iiwib3B0aW9ucyIsImZvcm1EYXRhIiwiY29uZmlnIiwidXJsIiwidXNlcm5hbWUiLCJFcnJvciIsIm1haWxMaXN0c01lbWJlcnMiLCJtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJkb21haW5zIiwid2ViaG9va3MiLCJldmVudHMiLCJzdXBwcmVzc2lvbnMiLCJtZXNzYWdlcyIsInJvdXRlcyIsImlwcyIsImlwX3Bvb2xzIiwibGlzdHMiLCJ2YWxpZGF0ZSIsInN1YmFjY291bnRzIiwic2V0U3ViYWNjb3VudCIsInN1YmFjY291bnRJZCIsInNldFN1YmFjY291bnRIZWFkZXIiLCJyZXNldFN1YmFjY291bnQiLCJyZXNldFN1YmFjY291bnRIZWFkZXIiLCJNYWlsTGlzdHNNZW1iZXJzIiwiY2hlY2tBbmRVcGRhdGVEYXRhIiwibmV3RGF0YSIsInZhcnMiLCJKU09OIiwic3RyaW5naWZ5Iiwic3Vic2NyaWJlZCIsImxpc3RNZW1iZXJzIiwibWFpbExpc3RBZGRyZXNzIiwiZ2V0TWVtYmVyIiwibWFpbExpc3RNZW1iZXJBZGRyZXNzIiwibWVtYmVyIiwiY3JlYXRlTWVtYmVyIiwicmVxRGF0YSIsImNyZWF0ZU1lbWJlcnMiLCJtZW1iZXJzIiwiQXJyYXkiLCJpc0FycmF5IiwidXBzZXJ0IiwidXBkYXRlTWVtYmVyIiwiZGVzdHJveU1lbWJlciIsIk1haWxpbmdMaXN0c0NsaWVudCIsInBhcnNlVmFsaWRhdGlvblJlc3VsdCIsInZhbGlkYXRpb25SZXN1bHQiLCJwb3N0IiwiY2FuY2VsVmFsaWRhdGlvbiIsIk1lc3NhZ2VzQ2xpZW50IiwicHJlcGFyZUJvb2xlYW5WYWx1ZXMiLCJ5ZXNOb1Byb3BlcnRpZXMiLCJTZXQiLCJoYXMiLCJfcGFyc2VSZXNwb25zZSIsIm1vZGlmaWVkRGF0YSIsIlJvdXRlc0NsaWVudCIsInJvdXRlIiwiU3RhdHNDb250YWluZXJfMSIsIlN0YXRzQ2xpZW50IiwibG9nZ2VyIiwiY29uc29sZSIsImNvbnZlcnREYXRlVG9VVEMiLCJpbnB1dERhdGUiLCJ3YXJuIiwidG9VVENTdHJpbmciLCJwcmVwYXJlU2VhcmNoUGFyYW1zIiwiZW50cmllcyIsImFycmF5V2l0aFBhaXJzIiwiY3VycmVudFBhaXIiLCJyZXBlYXRlZFByb3BlcnR5IiwiX19zcHJlYWRBcnJheSIsInB1c2giLCJwYXJzZVN0YXRzIiwiZ2V0RG9tYWluIiwiZ2V0QWNjb3VudCIsIlN0YXRzQ29udGFpbmVyIiwiU3ViYWNjb3VudHNDbGllbnQiLCJlbmFibGUiLCJkaXNhYmxlIiwiU1VCQUNDT1VOVF9IRUFERVIiLCJFbnVtc18xIiwiU3VwcHJlc3Npb25fMSIsIkJvdW5jZSIsIlN1cHByZXNzaW9uTW9kZWxzIiwiQk9VTkNFUyIsImFkZHJlc3MiLCJjb2RlIiwiZXJyb3IiLCJDb21wbGFpbnQiLCJDT01QTEFJTlRTIiwiU3VwcHJlc3Npb24iLCJCb3VuY2VfMSIsIkNvbXBsYWludF8xIiwiVW5zdWJzY3JpYmVfMSIsIldoaXRlTGlzdF8xIiwiY3JlYXRlT3B0aW9ucyIsImhlYWRlcnMiLCJTdXBwcmVzc2lvbkNsaWVudCIsIm1vZGVscyIsImJvdW5jZXMiLCJjb21wbGFpbnRzIiwidW5zdWJzY3JpYmVzIiwid2hpdGVsaXN0cyIsIk1vZGVsIiwiX3BhcnNlSXRlbSIsImNyZWF0ZVdoaXRlTGlzdCIsImlzRGF0YUFycmF5IiwicHJlcGFyZVJlc3BvbnNlIiwiY3JlYXRlVW5zdWJzY3JpYmUiLCJpc0NvbnRhaW5zVGFnIiwic29tZSIsInVuc3Vic2NyaWJlIiwidGFncyIsImdldE1vZGVsIiwibW9kZWwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJwb3N0RGF0YSIsIm1vZHVsZSIsIlVuc3Vic2NyaWJlIiwiVU5TVUJTQ1JJQkVTIiwiV2hpdGVMaXN0IiwiV0hJVEVMSVNUUyIsInJlYXNvbiIsIkF0dGFjaG1lbnRzSGFuZGxlcl8xIiwiTXVsdGlwbGVWYWxpZGF0aW9uSm9iIiwicmVzcG9uc2VTdGF0dXNDb2RlIiwicXVhbnRpdHkiLCJyZWNvcmRzUHJvY2Vzc2VkIiwicmVjb3Jkc19wcm9jZXNzZWQiLCJkb3dubG9hZF91cmwiLCJkb3dubG9hZFVybCIsImNzdiIsImpzb24iLCJfYiIsInN1bW1hcnkiLCJjYXRjaEFsbCIsImNhdGNoX2FsbCIsImRlbGl2ZXJhYmxlIiwiZG9Ob3RTZW5kIiwiZG9fbm90X3NlbmQiLCJ1bmRlbGl2ZXJhYmxlIiwidW5rbm93biIsInJpc2siLCJoaWdoIiwibG93IiwibWVkaXVtIiwiTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IiwiYXR0YWNobWVudHNIYW5kbGVyIiwiaGFuZGxlUmVzcG9uc2UiLCJqb2JzIiwiam9iIiwidG90YWwiLCJsaXN0SWQiLCJjb252ZXJ0VG9FeHBlY3RlZFNoYXBlIiwibXVsdGlwbGVWYWxpZGF0aW9uRGF0YSIsImlzQnVmZmVyIiwiZmlsZSIsIm11bHRpcGxlVmFsaWRhdGlvbkZpbGUiLCJpc1N0cmVhbSIsIlZhbGlkYXRlQ2xpZW50IiwibXVsdGlwbGVWYWxpZGF0aW9uIiwiV2ViaG9vayIsInVybHMiLCJXZWJob29rc0NsaWVudCIsIl9wYXJzZVdlYmhvb2tMaXN0IiwiX3BhcnNlV2ViaG9va1dpdGhJRCIsIndlYmhvb2tSZXNwb25zZSIsIndlYmhvb2siLCJ1bmRlZmluZWQiLCJfcGFyc2VXZWJob29rVGVzdCIsInRlc3QiLCJ1cmxWYWx1ZXMiLCJCbG9iRnJvbVN0cmVhbSIsInN0cmVhbSIsInNpemUiLCJfc3RyZWFtIiwiZGVmaW5lUHJvcGVydHkiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsIkF0dGFjaG1lbnRzSGFuZGxlciIsImdldEF0dGFjaG1lbnRPcHRpb25zIiwiZmlsZW5hbWUiLCJjb250ZW50VHlwZSIsImtub3duTGVuZ3RoIiwiZ2V0RmlsZUluZm8iLCJnZXRDdXN0b21GaWxlSW5mbyIsImdldEJ1ZmZlckluZm8iLCJidWZmZXIiLCJieXRlTGVuZ3RoIiwicGlwZSIsImlzQ3VzdG9tRmlsZSIsIm9iaiIsImlzQnJvd3NlckZpbGUiLCJCbG9iIiwiQnVmZmVyIiwiZ2V0QXR0YWNobWVudEluZm8iLCJhdHRhY2htZW50IiwiaXNTdHJpbmciLCJjb252ZXJ0VG9GRGV4cGVjdGVkU2hhcGUiLCJ1c2VyUHJvdmlkZWRWYWx1ZSIsImdldEJsb2JGcm9tU3RyZWFtIiwiQVBJRXJyb3IiLCJzdGF0dXNUZXh0IiwiYm9keU1lc3NhZ2UiLCJzdGFjayIsImRldGFpbHMiLCJGb3JtRGF0YUJ1aWxkZXIiLCJGb3JtRGF0YUNvbnN0cnVjdG9yIiwiZmlsZUtleXMiLCJjcmVhdGVGb3JtRGF0YSIsImZpbHRlciIsImZvcm1EYXRhQWNjIiwiaW5jbHVkZXMiLCJhdHRhY2htZW50VmFsdWUiLCJpc01lc3NhZ2VBdHRhY2htZW50IiwiYWRkRmlsZXNUb0ZEIiwibWVzc2FnZVZhbHVlIiwiaXNNSU1FIiwiYWRkTWltZURhdGFUb0ZEIiwiYWRkQ29tbW9uUHJvcGVydHlUb0ZEIiwiZm9ybURhdGFJbnN0YW5jZSIsImFwcGVuZCIsImlzRm9ybURhdGFQYWNrYWdlIiwibm9kZUZvcm1EYXRhIiwiYnJvd3NlckZvcm1EYXRhIiwiYmxvYkluc3RhbmNlIiwiUmVhZGFibGVTdHJlYW0iLCJnZXRIZWFkZXJzIiwiRmlsZSIsImV2ZXJ5IiwiYXBwZW5kRmlsZVRvRkQiLCJvcmlnaW5hbEtleSIsIm9iakRhdGEiLCJmZCIsImZyb20iLCJibG9iIiwic2V0IiwiZm9yRWFjaCIsImFkZFZhbHVlQmFzZWRPbkZEIiwiZmRLZXkiLCJmZFZhbHVlIiwiTmF2aWdhdGlvblRocnVQYWdlcyIsInBhcnNlUGFnZSIsInBhZ2VVcmwiLCJ1cmxTZXBhcmF0b3IiLCJpdGVyYXRvck5hbWUiLCJwYXJzZWRVcmwiLCJVUkwiLCJwYWdlVmFsdWUiLCJzcGxpdCIsInBvcCIsIml0ZXJhdG9yUG9zaXRpb24iLCJwYWdlIiwicGFnaW5nIiwidXBkYXRlVXJsQW5kUXVlcnkiLCJjbGllbnRVcmwiLCJxdWVyeUNvcHkiLCJ1cGRhdGVkUXVlcnkiLCJiYXNlNjQiLCJfX2ltcG9ydFN0YXIiLCJheGlvc18xIiwiRm9ybURhdGFCdWlsZGVyXzEiLCJSZXF1ZXN0IiwidGltZW91dCIsIm1ha2VIZWFkZXJzRnJvbU9iamVjdCIsImZvcm1EYXRhQnVpbGRlciIsIm1heEJvZHlMZW5ndGgiLCJwcm94eSIsIm1ldGhvZCIsIm9uQ2FsbE9wdGlvbnMiLCJyZXF1ZXN0SGVhZGVycyIsImpvaW5BbmRUcmFuc2Zvcm1IZWFkZXJzIiwicGFyYW1zIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsIlVSTFNlYXJjaFBhcmFtcyIsInVybFZhbHVlIiwidG9Mb2NhbGVVcHBlckNhc2UiLCJfZCIsImVycm9yUmVzcG9uc2UiLCJlcnJfMSIsIl9jIiwiZ2V0UmVzcG9uc2VCb2R5IiwiQXhpb3NIZWFkZXJzIiwiYmFzaWMiLCJlbmNvZGUiLCJzZXRBdXRob3JpemF0aW9uIiwicmVjZWl2ZWRPbkNhbGxIZWFkZXJzIiwib25DYWxsSGVhZGVycyIsImhlYWRlcnNPYmplY3QiLCJoZWFkZXJzQWNjdW11bGF0b3IiLCJjb21tYW5kIiwiYWRkRGVmYXVsdEhlYWRlcnMiLCJyZXF1ZXN0T3B0aW9ucyIsIlJlc29sdXRpb24iLCJXZWJob29rc0lkcyIsIlllc05vIiwiX19leHBvcnRTdGFyIiwiTWFpbGd1bkNsaWVudF8xIiwiRW51bXMiLCJJbnRlcmZhY2VzIiwiTWFpbGd1biIsIkZvcm1EYXRhIiwiY2xpZW50Il0sInNvdXJjZVJvb3QiOiIifQ==