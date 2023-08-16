/*! mailgun.js v9.2.0 */
/*! mailgun.js v9.2.0 */
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
      throw new Error_1.default({
        status: 400,
        statusText: 'Received boolean value for active property',
        body: {
          message: 'Property "active" must contain string value.'
        }
      });
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
      throw new Error_1.default({
        status: 400,
        statusText: 'Too much data for replacement',
        body: {
          message: 'Please specify either pool_id or ip (not both)'
        }
      });
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
  }
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
      throw new Error_1.default({
        status: 400,
        message: 'Message data object can not be empty'
      });
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
      throw new Error_1.default({
        status: 400,
        statusText: 'Data property should be an object',
        body: {
          message: 'Whitelist\'s creation process does not support multiple creations. Data property should be an object'
        }
      });
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
        throw new Error_1.default({
          status: 400,
          statusText: 'Tag property should not be used for creating multiple unsubscribes.',
          body: {
            message: 'Tag property can be used only if one unsubscribe provided as second argument of create method. Please use tags instead.'
          }
        });
      }
      return this.request.post((0, url_join_1.default)('v3', domain, 'unsubscribes'), JSON.stringify(data), createOptions).then(this.prepareResponse);
    }
    if (data === null || data === void 0 ? void 0 : data.tags) {
      throw new Error_1.default({
        status: 400,
        statusText: 'Tags property should not be used for creating one unsubscribe.',
        body: {
          message: 'Tags property can be used if you provides an array of unsubscribes as second argument of create method. Please use tag instead'
        }
      });
    }
    if (Array.isArray(data.tag)) {
      throw new Error_1.default({
        status: 400,
        statusText: 'Tag property can not be an array',
        body: {
          message: 'Please use array of unsubscribes as second argument of create method to be able to provide few tags'
        }
      });
    }
    /* We need Form Data for unsubscribes if we want to support the "tag" property */
    return this.request.postWithFD((0, url_join_1.default)('v3', domain, 'unsubscribes'), data).then(this.prepareResponse);
  };
  SuppressionClient.prototype.getModel = function (type) {
    if (type in this.models) {
      return this.models[type];
    }
    throw new Error_1.default({
      status: 400,
      statusText: 'Unknown type value',
      body: {
        message: 'Type may be only one of [bounces, complaints, unsubscribes, whitelists]'
      }
    });
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
  MultipleValidationClient.prototype.create = function (listId, data) {
    return __awaiter(this, void 0, void 0, function () {
      var multipleValidationData, response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            multipleValidationData = __assign({
              multipleValidationFile: __assign({}, data === null || data === void 0 ? void 0 : data.file)
            }, data);
            delete multipleValidationData.file;
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
  function Webhook(id, url) {
    this.id = id;
    this.url = url;
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
      if (!url) {
        url = (webhookResponse === null || webhookResponse === void 0 ? void 0 : webhookResponse.urls) && webhookResponse.urls.length ? webhookResponse.urls[0] : undefined;
      }
      return new Webhook(id, url);
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
  WebhooksClient.prototype.update = function (domain, id, url) {
    return this.request.putWithFD((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id), {
      url: url
    }).then(this._parseWebhookWithID(id));
  };
  WebhooksClient.prototype.destroy = function (domain, id) {
    return this.request.delete((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id)).then(this._parseWebhookWithID(id));
  };
  return WebhooksClient;
}();
exports["default"] = WebhooksClient;

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
var FormDataBuilder = /** @class */function () {
  function FormDataBuilder(FormDataConstructor) {
    this.FormDataConstructor = FormDataConstructor;
  }
  FormDataBuilder.prototype.createFormData = function (data) {
    var _this = this;
    if (!data) {
      throw new Error('Please provide data object');
    }
    var formData = Object.keys(data).filter(function (key) {
      return data[key];
    }).reduce(function (formDataAcc, key) {
      var fileKeys = ['attachment', 'inline', 'multipleValidationFile'];
      if (fileKeys.includes(key)) {
        _this.addFilesToFD(key, data[key], formDataAcc);
        return formDataAcc;
      }
      if (key === 'message') {
        // mime message
        _this.addMimeDataToFD(key, data[key], formDataAcc);
        return formDataAcc;
      }
      _this.addCommonPropertyToFD(key, data[key], formDataAcc);
      return formDataAcc;
    }, new this.FormDataConstructor());
    return formData;
  };
  FormDataBuilder.prototype.isFormDataPackage = function (formDataInstance) {
    return formDataInstance.getHeaders !== undefined;
  };
  FormDataBuilder.prototype.getAttachmentOptions = function (item) {
    if (typeof item !== 'object' || this.isStream(item)) return {};
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
      if (typeof Buffer !== 'undefined') {
        // node environment
        if (Buffer.isBuffer(data)) {
          var blobInstance = new Blob([data]);
          browserFormData.append(key, blobInstance, 'MimeMessage');
          return;
        }
      }
    }
    throw new Error_1.default({
      status: 400,
      statusText: "Unknown data type for ".concat(key, " property"),
      body: 'The mime data should have type of Buffer, String or Blob'
    });
  };
  FormDataBuilder.prototype.addFilesToFD = function (propertyName, value, formDataInstance) {
    var _this = this;
    var appendFileToFD = function (originalKey, obj, formData) {
      var key = originalKey === 'multipleValidationFile' ? 'file' : originalKey;
      var isStreamData = _this.isStream(obj);
      var objData = isStreamData ? obj : obj.data;
      // getAttachmentOptions should be called with obj parameter to prevent loosing filename
      var options = _this.getAttachmentOptions(obj);
      if (typeof objData === 'string') {
        formData.append(key, objData);
        return;
      }
      if (_this.isFormDataPackage(formData)) {
        var fd = formData;
        fd.append(key, objData, options);
        return;
      }
      if (typeof Blob !== undefined) {
        // either node > 18 or browser
        var browserFormData = formDataInstance; // Browser compliant FormData
        if (objData instanceof Blob) {
          browserFormData.append(key, objData, options.filename);
          return;
        }
        if (typeof Buffer !== 'undefined') {
          // node environment
          if (Buffer.isBuffer(objData)) {
            var blobInstance = new Blob([objData]);
            browserFormData.append(key, blobInstance, options.filename);
          }
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
  FormDataBuilder.prototype.isStream = function (data) {
    return typeof data === 'object' && typeof data.pipe === 'function';
  };
  FormDataBuilder.prototype.addCommonPropertyToFD = function (key, value, formDataAcc) {
    if (Array.isArray(value)) {
      value.forEach(function (item) {
        formDataAcc.append(key, item);
      });
    } else if (value != null) {
      formDataAcc.append(key, value);
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
var Request = /** @class */function () {
  function Request(options, formData) {
    this.username = options.username;
    this.key = options.key;
    this.url = options.url;
    this.timeout = options.timeout;
    this.headers = this.makeHeadersFromObject(options.headers);
    this.formDataBuilder = new FormDataBuilder_1.default(formData);
    this.maxBodyLength = 52428800; // 50 MB
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
              maxBodyLength: this.maxBodyLength
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
// Axios v1.4.0 Copyright (c) 2023 Matt Zabriskie and contributors


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
    if (reducer(descriptor, name, obj) !== false) {
      reducedDescriptors[name] = descriptor;
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

const DEFAULT_CONTENT_TYPE = {
  'Content-Type': undefined
};

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
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
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

utils.freezeMethods(AxiosHeaders.prototype);
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

    if (utils.isFormData(requestData)) {
      if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else {
        requestHeaders.setContentType('multipart/form-data;', false); // mobile/desktop app frameworks
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
      const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath))
        && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

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
  if(fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

var adapters = {
  getAdapter: (adapters) => {
    adapters = utils.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      if((adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
        break;
      }
    }

    if (!adapter) {
      if (adapter === false) {
        throw new AxiosError(
          `Adapter ${nameOrAdapter} is not supported by the environment`,
          'ERR_NOT_SUPPORT'
        );
      }

      throw new Error(
        utils.hasOwnProp(knownAdapters, nameOrAdapter) ?
          `Adapter '${nameOrAdapter}' is not available in the build` :
          `Unknown adapter '${nameOrAdapter}'`
      );
    }

    if (!utils.isFunction(adapter)) {
      throw new TypeError('adapter is not a function');
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

const VERSION = "1.4.0";

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

    let contextHeaders;

    // Flatten headers
    contextHeaders = headers && utils.merge(
      headers.common,
      headers[config.method]
    );

    contextHeaders && utils.forEach(
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZCxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFB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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7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Q0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhDQUE4QztBQUM5QyxRQUFRO0FBQ1IsMkRBQTJELFdBQVc7QUFDdEU7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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dXJjZXMiOlsid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNDcmVkZW50aWFscy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVGFncy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zVGVtcGxhdGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9FdmVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0lQUG9vbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0lQcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWFpbGd1bkNsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWFpbGluZ0xpc3RzL21haWxpbmdMaXN0cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWVzc2FnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1JvdXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3RhdHMvU3RhdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N0YXRzL1N0YXRzQ29udGFpbmVyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvQm91bmNlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvQ29tcGxhaW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvU3VwcHJlc3Npb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbnNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9VbnN1YnNjcmliZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1doaXRlTGlzdC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9WYWxpZGF0aW9ucy92YWxpZGF0ZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvV2ViaG9va3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9FcnJvci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvY29tbW9uL0Zvcm1EYXRhQnVpbGRlci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9SZXF1ZXN0LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvRW51bXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0NvbW1vbi9Mb2dnZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0NvbW1vbi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9Eb21haW5DcmVkZW50aWFscy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9Eb21haW5UYWdzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Eb21haW5zL0RvbWFpblRlbXBsYXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9Eb21haW5zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Eb21haW5zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9FdmVudENsaWVudC9JRXZlbnRDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0V2ZW50Q2xpZW50L2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JUFBvb2xzL0lJUFBvb2xzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JUFBvb2xzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JUHMvSUlQc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSVBzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsZ3VuQ2xpZW50L0lNYWlsZ3VuQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsZ3VuQ2xpZW50L2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01lc3NhZ2VzL0lNZXNzYWdlc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWVzc2FnZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1JvdXRlcy9JUm91dGVzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Sb3V0ZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N0YXRzL1N0YXRzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdGF0cy9TdGF0c0NvbnRhaW5lci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3RhdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9Cb3VuY2UudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9Db21wbGFpbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9JU3VwcHJlc3Npb25zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvVW5zdWJzY3JpYmUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9XaGl0ZUxpc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMvTXVsdGlwbGVWYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9WYWxpZGF0aW9ucy9WYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9WYWxpZGF0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvV2ViaG9va3MvSVdlYkhvb2tzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9XZWJob29rcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vRXJyb3IudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vRm9ybURhdGEudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vTmF2aWdhdGlvblRocnVQYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9SZXF1ZXN0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWluQ3JlZGVudGlhbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpblRhZ3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpblRlbXBsYXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWluVHJhY2tpbmcudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRXZlbnRzL0V2ZW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0V2ZW50cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0lQUG9vbHMvSXBQb29scy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0lQUG9vbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9JUHMvSVBzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvSVBzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWFpbGd1bkNsaWVudC9NYWlsZ3VuQ2xpZW50T3B0aW9ucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxndW5DbGllbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWFpbGluZ0xpc3RzL01haWxpbmdMaXN0cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxpbmdMaXN0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01lc3NhZ2VzL01lc3NhZ2VzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWVzc2FnZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Sb3V0ZXMvUm91dGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvUm91dGVzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3RhdHMvU3RhdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdGF0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9Cb3VuY2UudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvQ29tcGxhaW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9ucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9VbnN1YnNjcmliZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9XaGl0ZUxpc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9WYWxpZGF0aW9ucy9NdWx0aXBsZVZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9WYWxpZGF0aW9ucy9WYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvVmFsaWRhdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9XZWJob29rcy9XZWJob29rcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1dlYmhvb2tzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2Jhc2UtNjQvYmFzZTY0LmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvZGlzdC9icm93c2VyL2F4aW9zLmNqcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEROU1JlY29yZCxcbiAgRG9tYWluRGF0YSxcbiAgRG9tYWluU2hvcnREYXRhLFxuICBURG9tYWluXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbiBpbXBsZW1lbnRzIFREb21haW4ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgc3RhdGU6IHN0cmluZztcbiAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gIHNwYW1fYWN0aW9uOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICBzbXRwX2xvZ2luOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgaWQ/OiBzdHJpbmc7XG4gIGlzX2Rpc2FibGVkPzogYm9vbGVhbjtcbiAgd2ViX3ByZWZpeD86IHN0cmluZztcbiAgd2ViX3NjaGVtZT86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBkYXRhOiBEb21haW5TaG9ydERhdGEgfCBEb21haW5EYXRhLFxuICAgIHJlY2VpdmluZz86IEROU1JlY29yZFtdIHwgbnVsbCxcbiAgICBzZW5kaW5nPzogRE5TUmVjb3JkW10gfCBudWxsXG4gICkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLnJlcXVpcmVfdGxzID0gZGF0YS5yZXF1aXJlX3RscztcbiAgICB0aGlzLnNraXBfdmVyaWZpY2F0aW9uID0gZGF0YS5za2lwX3ZlcmlmaWNhdGlvbjtcbiAgICB0aGlzLnN0YXRlID0gZGF0YS5zdGF0ZTtcbiAgICB0aGlzLndpbGRjYXJkID0gZGF0YS53aWxkY2FyZDtcbiAgICB0aGlzLnNwYW1fYWN0aW9uID0gZGF0YS5zcGFtX2FjdGlvbjtcbiAgICB0aGlzLmNyZWF0ZWRfYXQgPSBkYXRhLmNyZWF0ZWRfYXQ7XG4gICAgdGhpcy5zbXRwX3Bhc3N3b3JkID0gZGF0YS5zbXRwX3Bhc3N3b3JkO1xuICAgIHRoaXMuc210cF9sb2dpbiA9IGRhdGEuc210cF9sb2dpbjtcbiAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGU7XG4gICAgdGhpcy5yZWNlaXZpbmdfZG5zX3JlY29yZHMgPSByZWNlaXZpbmcgfHwgbnVsbDtcbiAgICB0aGlzLnNlbmRpbmdfZG5zX3JlY29yZHMgPSBzZW5kaW5nIHx8IG51bGw7XG4gICAgLypcbiAgICAgIGRvbWFpbiBsaXN0IGhhcyBzaG9ydGVyIHJlc3BvbnNlIHRoZW4gZ2V0LCBjcmVhdGUsIGFuZCB1cGRhdGUgbWV0aG9kcy5cbiAgICAqL1xuXG4gICAgY29uc3QgZHluYW1pY0tleXM6IChrZXlvZiBEb21haW5EYXRhKVtdID0gWydpZCcsICdpc19kaXNhYmxlZCcsICd3ZWJfcHJlZml4JywgJ3dlYl9zY2hlbWUnXTtcblxuICAgIGNvbnN0IGR5bmFtaWNQcm9wZXJ0aWVzID0gZHluYW1pY0tleXMucmVkdWNlKChhY2MsIHByb3BlcnR5TmFtZSkgPT4ge1xuICAgICAgaWYgKHByb3BlcnR5TmFtZSBpbiBkYXRhKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0eU5hbWUgYXMga2V5b2YgRG9tYWluO1xuICAgICAgICBhY2NbcHJvcF0gPSAoZGF0YSBhcyBEb21haW5EYXRhKVtwcm9wZXJ0eU5hbWVdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBSZWNvcmQ8a2V5b2YgRG9tYWluLCBzdHJpbmcgfCBib29sZWFuPik7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkeW5hbWljUHJvcGVydGllcyk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7XG4gIElEb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gIElEb21haW5UYWdzQ2xpZW50LFxuICBJRG9tYWluQ3JlZGVudGlhbHMsXG4gIElEb21haW5zQ2xpZW50XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5cbmltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3InO1xuaW1wb3J0IHsgQVBJRXJyb3JPcHRpb25zIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9kb21haW5zQ3JlZGVudGlhbHMnO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9kb21haW5zVGFncyc7XG5pbXBvcnQge1xuICBEZXN0cm95ZWREb21haW5SZXNwb25zZSxcbiAgTWVzc2FnZVJlc3BvbnNlLFxuICBEb21haW5MaXN0UmVzcG9uc2VEYXRhLFxuICBEb21haW5SZXNwb25zZURhdGEsXG4gIERvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIERvbWFpblRyYWNraW5nRGF0YSxcbiAgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSxcbiAgVXBkYXRlZE9wZW5UcmFja2luZyxcbiAgRG9tYWluc1F1ZXJ5LFxuICBEb21haW5JbmZvLFxuICBDb25uZWN0aW9uU2V0dGluZ3MsXG4gIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlLFxuICBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzLFxuICBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFJlcGxhY2VtZW50Rm9yUG9vbCxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlLFxuICBES0lNU2VsZWN0b3JJbmZvLFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFdlYlByZWZpeEluZm8sXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgVERvbWFpbixcbiAgRG9tYWluVXBkYXRlSW5mbyxcbiAgRG9tYWluVXBkYXRlSW5mb1JlcSxcbiAgRG9tYWluSW5mb1JlcSxcbiAgQm9vbFRvU3RyaW5nLFxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcbmltcG9ydCBEb21haW4gZnJvbSAnLi9kb21haW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5zQ2xpZW50IGltcGxlbWVudHMgSURvbWFpbnNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgZG9tYWluQ3JlZGVudGlhbHM6IElEb21haW5DcmVkZW50aWFscztcbiAgcHVibGljIGRvbWFpblRlbXBsYXRlczogSURvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgcHVibGljIGRvbWFpblRhZ3M6IElEb21haW5UYWdzQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ6IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LFxuICAgIGRvbWFpblRlbXBsYXRlc0NsaWVudDogRG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICAgIGRvbWFpblRhZ3NDbGllbnQ6IERvbWFpblRhZ3NDbGllbnRcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmRvbWFpbkNyZWRlbnRpYWxzID0gZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ7XG4gICAgdGhpcy5kb21haW5UZW1wbGF0ZXMgPSBkb21haW5UZW1wbGF0ZXNDbGllbnQ7XG4gICAgdGhpcy5kb21haW5UYWdzID0gZG9tYWluVGFnc0NsaWVudDtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUJvb2xWYWx1ZXMoXG4gICAgZGF0YTogRG9tYWluSW5mbyB8IERvbWFpblVwZGF0ZUluZm9cbiAgKTogRG9tYWluSW5mb1JlcSB8IERvbWFpblVwZGF0ZUluZm9SZXEge1xuICAgIGNvbnN0IHByb3BzRm9yUmVwbGFjZW1lbnQgPSBkYXRhIGFzIEJvb2xUb1N0cmluZztcbiAgICBjb25zdCByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IGtleSBhcyBrZXlvZiBCb29sVG9TdHJpbmc7XG4gICAgICBpZiAodHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdib29sZWFuJykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gYXMgYm9vbGVhbjtcbiAgICAgICAgYWNjW3Byb3BdID0gKHZhbHVlLnRvU3RyaW5nKCkgPT09ICd0cnVlJykgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBSZWNvcmQ8a2V5b2YgQm9vbFRvU3RyaW5nLCAndHJ1ZSd8ICdmYWxzZSc+KTtcbiAgICByZXR1cm4geyAuLi5kYXRhLCAuLi5yZXBsYWNlZFByb3BzIH0gYXMgRG9tYWluVXBkYXRlSW5mb1JlcSB8IERvbWFpbkluZm9SZXE7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZU1lc3NhZ2UocmVzcG9uc2U6IERlc3Ryb3llZERvbWFpblJlc3BvbnNlKSA6IE1lc3NhZ2VSZXNwb25zZSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlRG9tYWluTGlzdChyZXNwb25zZTogRG9tYWluTGlzdFJlc3BvbnNlRGF0YSk6IFREb21haW5bXSB7XG4gICAgaWYgKHJlc3BvbnNlLmJvZHkgJiYgcmVzcG9uc2UuYm9keS5pdGVtcykge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9tYWluKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluKHJlc3BvbnNlOiBEb21haW5SZXNwb25zZURhdGEpOiBURG9tYWluIHtcbiAgICByZXR1cm4gbmV3IERvbWFpbihcbiAgICAgIHJlc3BvbnNlLmJvZHkuZG9tYWluLFxuICAgICAgcmVzcG9uc2UuYm9keS5yZWNlaXZpbmdfZG5zX3JlY29yZHMsXG4gICAgICByZXNwb25zZS5ib2R5LnNlbmRpbmdfZG5zX3JlY29yZHNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1NldHRpbmdzKHJlc3BvbnNlOiBEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6IERvbWFpblRyYWNraW5nRGF0YSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkudHJhY2tpbmc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRyYWNraW5nVXBkYXRlKHJlc3BvbnNlOiBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6VXBkYXRlZE9wZW5UcmFja2luZyB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogRG9tYWluc1F1ZXJ5KTogUHJvbWlzZTxURG9tYWluW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2RvbWFpbnMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZURvbWFpbkxpc3QocmVzIGFzIERvbWFpbkxpc3RSZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZykgOiBQcm9taXNlPFREb21haW4+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL2RvbWFpbnMvJHtkb21haW59YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IERvbWFpbkluZm8pIDogUHJvbWlzZTxURG9tYWluPiB7XG4gICAgY29uc3QgcG9zdE9iaiA9IHRoaXMuX2hhbmRsZUJvb2xWYWx1ZXMoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvZG9tYWlucycsIHBvc3RPYmopXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgZGF0YTogRG9tYWluVXBkYXRlSW5mbykgOiBQcm9taXNlPFREb21haW4+IHtcbiAgICBjb25zdCBwdXREYXRhID0gdGhpcy5faGFuZGxlQm9vbFZhbHVlcyhkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgL3YzL2RvbWFpbnMvJHtkb21haW59YCwgcHV0RGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgdmVyaWZ5KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxURG9tYWluPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS92ZXJpZnlgKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxNZXNzYWdlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YzL2RvbWFpbnMvJHtkb21haW59YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlKHJlcyBhcyBEZXN0cm95ZWREb21haW5SZXNwb25zZSkpO1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbihkb21haW46IHN0cmluZyk6IFByb21pc2U8Q29ubmVjdGlvblNldHRpbmdzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9jb25uZWN0aW9uYClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlczpDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSkgPT4gcmVzLmJvZHkuY29ubmVjdGlvbiBhcyBDb25uZWN0aW9uU2V0dGluZ3MpO1xuICB9XG5cbiAgdXBkYXRlQ29ubmVjdGlvbihkb21haW46IHN0cmluZywgZGF0YTogQ29ubmVjdGlvblNldHRpbmdzKTogUHJvbWlzZTxVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9jb25uZWN0aW9uYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMpXG4gICAgICAudGhlbigocmVzOlVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MpO1xuICB9XG5cbiAgLy8gVHJhY2tpbmdcblxuICBnZXRUcmFja2luZyhkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpblRyYWNraW5nRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyk7XG4gIH1cblxuICB1cGRhdGVUcmFja2luZyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogT3BlblRyYWNraW5nSW5mbyB8IENsaWNrVHJhY2tpbmdJbmZvIHwgVW5zdWJzY3JpYmVUcmFja2luZ0luZm9cbiAgKTogUHJvbWlzZTxVcGRhdGVkT3BlblRyYWNraW5nPiB7XG4gICAgaWYgKHR5cGVvZiBkYXRhPy5hY3RpdmUgPT09ICdib29sZWFuJykge1xuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHsgc3RhdHVzOiA0MDAsIHN0YXR1c1RleHQ6ICdSZWNlaXZlZCBib29sZWFuIHZhbHVlIGZvciBhY3RpdmUgcHJvcGVydHknLCBib2R5OiB7IG1lc3NhZ2U6ICdQcm9wZXJ0eSBcImFjdGl2ZVwiIG11c3QgY29udGFpbiBzdHJpbmcgdmFsdWUuJyB9IH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycsIHR5cGUpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZVRyYWNraW5nVXBkYXRlKHJlcyBhcyBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSk7XG4gIH1cblxuICAvLyBJUHNcblxuICBnZXRJcHMoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogQVBJUmVzcG9uc2UpID0+IHJlc3BvbnNlPy5ib2R5Py5pdGVtcyk7XG4gIH1cblxuICBhc3NpZ25JcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBpcCB9KTtcbiAgfVxuXG4gIGRlbGV0ZUlwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJywgaXApKTtcbiAgfVxuXG4gIGxpbmtJcFBvb2woZG9tYWluOiBzdHJpbmcsIHBvb2xJZDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IHBvb2xfaWQ6IHBvb2xJZCB9KTtcbiAgfVxuXG4gIHVubGlua0lwUG9sbChkb21haW46IHN0cmluZywgcmVwbGFjZW1lbnQ6IFJlcGxhY2VtZW50Rm9yUG9vbCk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gJyc7XG4gICAgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQgJiYgcmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcihcbiAgICAgICAge1xuICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgIHN0YXR1c1RleHQ6ICdUb28gbXVjaCBkYXRhIGZvciByZXBsYWNlbWVudCcsXG4gICAgICAgICAgYm9keTogeyBtZXNzYWdlOiAnUGxlYXNlIHNwZWNpZnkgZWl0aGVyIHBvb2xfaWQgb3IgaXAgKG5vdCBib3RoKScgfVxuICAgICAgICB9IGFzIEFQSUVycm9yT3B0aW9uc1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/cG9vbF9pZD0ke3JlcGxhY2VtZW50LnBvb2xfaWR9YDtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICBzZWFyY2hQYXJhbXMgPSBgP2lwPSR7cmVwbGFjZW1lbnQuaXB9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCAnaXBfcG9vbCcsIHNlYXJjaFBhcmFtcykpO1xuICB9XG5cbiAgdXBkYXRlREtJTUF1dGhvcml0eShkb21haW46IHN0cmluZywgZGF0YTogREtJTUF1dGhvcml0eUluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNQXV0aG9yaXR5PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX2F1dGhvcml0eWAsIHt9LCB7IHF1ZXJ5OiBgc2VsZj0ke2RhdGEuc2VsZn1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlcyA6IFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5KTtcbiAgfVxuXG4gIHVwZGF0ZURLSU1TZWxlY3Rvcihkb21haW46IHN0cmluZywgZGF0YTogREtJTVNlbGVjdG9ySW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX3NlbGVjdG9yYCwge30sIHsgcXVlcnk6IGBka2ltX3NlbGVjdG9yPSR7ZGF0YS5ka2ltU2VsZWN0b3J9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZVdlYlByZWZpeChkb21haW46IHN0cmluZywgZGF0YTogV2ViUHJlZml4SW5mbyk6IFByb21pc2U8VXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS93ZWJfcHJlZml4YCwge30sIHsgcXVlcnk6IGB3ZWJfcHJlZml4PSR7ZGF0YS53ZWJQcmVmaXh9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuaW1wb3J0IHsgSURvbWFpbkNyZWRlbnRpYWxzIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcbmltcG9ydCB7XG4gIERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhLFxuICBEb21haW5DcmVkZW50aWFsc0xpc3QsXG4gIENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSxcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQsXG4gIERlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlLFxuICBEb21haW5DcmVkZW50aWFsc1F1ZXJ5LFxuICBEb21haW5DcmVkZW50aWFscyxcbiAgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5DcmVkZW50aWFsc0NsaWVudCBpbXBsZW1lbnRzIElEb21haW5DcmVkZW50aWFscyB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My9kb21haW5zLyc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChcbiAgICByZXNwb25zZTogRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGFcbiAgKTogRG9tYWluQ3JlZGVudGlhbHNMaXN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IHJlc3BvbnNlLmJvZHkuaXRlbXMsXG4gICAgICB0b3RhbENvdW50OiByZXNwb25zZS5ib2R5LnRvdGFsX2NvdW50XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlTWVzc2FnZVJlc3BvbnNlKFxuICAgIHJlc3BvbnNlOiBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VcbiAgKTogRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgfSBhcyBEb21haW5DcmVkZW50aWFsc1Jlc3VsdDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEZWxldGVkUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6RGVsZXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VcbiAgKTogRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgc3BlYzogcmVzcG9uc2UuYm9keS5zcGVjXG4gICAgfSBhcyBEb21haW5DcmVkZW50aWFsc1Jlc3VsdDtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpbkNyZWRlbnRpYWxzUXVlcnkpOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy9jcmVkZW50aWFscycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QocmVzIGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhKVxuICAgICAgKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5DcmVkZW50aWFsc1xuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFsc2AsIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nLFxuICAgIGRhdGE6IFVwZGF0ZURvbWFpbkNyZWRlbnRpYWxzRGF0YVxuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzLyR7Y3JlZGVudGlhbHNMb2dpbn1gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFscy8ke2NyZWRlbnRpYWxzTG9naW59YClcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURlbGV0ZWRSZXNwb25zZShyZXMpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0LFxuICBJRG9tYWluVGFnc0NsaWVudFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgUmVzb2x1dGlvbiB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7XG4gIERvbWFpblRhZ3NJdGVtLFxuICBEb21haW5UYWdzSXRlbUluZm8sXG4gIERvbWFpblRhZ1N0YXRpc3RpY0l0ZW0sXG4gIERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0sXG4gIERvbWFpblRhZ3NMaXN0LFxuICBEb21haW5UYWdzUmVzcG9uc2VEYXRhLFxuICBEb21haW5UYWdzUXVlcnksXG4gIERvbWFpblRhZ3NNZXNzYWdlUmVzLFxuICBEb21haW5UYWdzU3RhdGlzdGljUXVlcnksXG4gIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ1Byb3ZpZGVyc0FQSVJlc3BvbnNlLFxuICBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ0RldmljZXNBUElSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZyBpbXBsZW1lbnRzIERvbWFpblRhZ3NJdGVtIHtcbiAgdGFnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICdmaXJzdC1zZWVuJzogRGF0ZTtcbiAgJ2xhc3Qtc2Vlbic6IERhdGU7XG5cbiAgY29uc3RydWN0b3IodGFnSW5mbzogRG9tYWluVGFnc0l0ZW1JbmZvKSB7XG4gICAgdGhpcy50YWcgPSB0YWdJbmZvLnRhZztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnSW5mby5kZXNjcmlwdGlvbjtcbiAgICB0aGlzWydmaXJzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydmaXJzdC1zZWVuJ10pO1xuICAgIHRoaXNbJ2xhc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snbGFzdC1zZWVuJ10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UYWdTdGF0aXN0aWMgaW1wbGVtZW50cyBJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0IHtcbiAgdGFnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHN0YXJ0OiBEYXRlO1xuICBlbmQ6IERhdGU7XG4gIHJlc29sdXRpb246IFJlc29sdXRpb247XG4gIHN0YXRzOiBEb21haW5UYWdTdGF0aXN0aWNJdGVtW107XG5cbiAgY29uc3RydWN0b3IodGFnU3RhdGlzdGljSW5mbzogRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlKSB7XG4gICAgdGhpcy50YWcgPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkudGFnO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuZGVzY3JpcHRpb247XG4gICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGFydCk7XG4gICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSh0YWdTdGF0aXN0aWNJbmZvLmJvZHkuZW5kKTtcbiAgICB0aGlzLnJlc29sdXRpb24gPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkucmVzb2x1dGlvbjtcbiAgICB0aGlzLnN0YXRzID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdDogRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0pIHtcbiAgICAgIGNvbnN0IHJlcyA9IHsgLi4uc3RhdCwgdGltZTogbmV3IERhdGUoc3RhdC50aW1lKSB9O1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5UYWdzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxEb21haW5UYWdzTGlzdD5cbiAgaW1wbGVtZW50cyBJRG9tYWluVGFnc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSxcbiAgKTogRG9tYWluVGFnc0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBEb21haW5UYWdzTGlzdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoKHRhZ0luZm86IERvbWFpblRhZ3NJdGVtSW5mbykgPT4gbmV3IERvbWFpblRhZyh0YWdJbmZvKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAndGFnJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRhZ1N0YXRpc3RpYyhcbiAgICByZXNwb25zZTogRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlXG4gICk6IElEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQge1xuICAgIHJldHVybiBuZXcgRG9tYWluVGFnU3RhdGlzdGljKHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGFnc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5UYWdzTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJyksIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGFnKHJlcy5ib2R5KVxuICAgICAgKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpLCBkZXNjcmlwdGlvbilcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnc01lc3NhZ2VSZXNcbiAgICAgICk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nXG4gICk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vdGFncy8ke3RhZ31gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IChcbiAgICAgICAge1xuICAgICAgICAgIG1lc3NhZ2U6IHJlcy5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgc3RhdHVzOiByZXMuc3RhdHVzXG4gICAgICAgIH0gYXMgRG9tYWluVGFnc01lc3NhZ2VSZXMpKTtcbiAgfVxuXG4gIHN0YXRpc3RpYyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcsIHF1ZXJ5OiBEb21haW5UYWdzU3RhdGlzdGljUXVlcnkpXG4gICAgOiBQcm9taXNlPERvbWFpblRhZ1N0YXRpc3RpYz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlVGFnU3RhdGlzdGljKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBjb3VudHJpZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9jb3VudHJpZXMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cblxuICBwcm92aWRlcnMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9wcm92aWRlcnMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdQcm92aWRlcnNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cblxuICBkZXZpY2VzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL2RldmljZXMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdEZXZpY2VzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvblxuICAgICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSxcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBEb21haW5UZW1wbGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlc1F1ZXJ5LFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGEsXG4gIERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGEsXG4gIEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZXNBUElSZXNwb25zZSxcbiAgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdCxcbiAgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZSxcbiAgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQsXG4gIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlLFxuICBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQsXG4gIE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlLFxuICBOb3RpZmljYXRpb25SZXN1bHQsXG4gIFNob3J0VGVtcGxhdGVWZXJzaW9uLFxuICBUZW1wbGF0ZVF1ZXJ5LFxuICBUZW1wbGF0ZVZlcnNpb24sXG4gIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdFxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IElEb21haW5UZW1wbGF0ZSwgSURvbWFpblRlbXBsYXRlc0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UZW1wbGF0ZUl0ZW0gaW1wbGVtZW50cyBJRG9tYWluVGVtcGxhdGUge1xuICBuYW1lIDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbiA6IHN0cmluZztcbiAgY3JlYXRlZEF0IDogRGF0ZSB8ICcnO1xuICBjcmVhdGVkQnkgOiBzdHJpbmc7XG4gIGlkIDogc3RyaW5nO1xuICB2ZXJzaW9uPzogVGVtcGxhdGVWZXJzaW9uO1xuICB2ZXJzaW9ucz86IFNob3J0VGVtcGxhdGVWZXJzaW9uW107XG5cbiAgY29uc3RydWN0b3IoZG9tYWluVGVtcGxhdGVGcm9tQVBJOiBJRG9tYWluVGVtcGxhdGUpIHtcbiAgICB0aGlzLm5hbWUgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkubmFtZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuY3JlYXRlZEF0ID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRBdCA/IG5ldyBEYXRlKGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQpIDogJyc7XG4gICAgdGhpcy5jcmVhdGVkQnkgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEJ5O1xuICAgIHRoaXMuaWQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuaWQ7XG5cbiAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24pIHtcbiAgICAgIHRoaXMudmVyc2lvbiA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uO1xuICAgICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCkge1xuICAgICAgICB0aGlzLnZlcnNpb24uY3JlYXRlZEF0ID0gbmV3IERhdGUoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24uY3JlYXRlZEF0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zICYmIGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMudmVyc2lvbnMgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMubWFwKCh2ZXJzaW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgLi4udmVyc2lvbiB9O1xuICAgICAgICByZXN1bHQuY3JlYXRlZEF0ID0gbmV3IERhdGUodmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpblRlbXBsYXRlc0NsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8TGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdD5cbiAgaW1wbGVtZW50cyBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzLyc7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQ3JlYXRpb25SZXNwb25zZShkYXRhOiBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKTogSURvbWFpblRlbXBsYXRlIHtcbiAgICByZXR1cm4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkYXRhLmJvZHkudGVtcGxhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKFxuICAgIGRhdGE6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlXG4gICk6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7fSBhcyBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VNdXRhdGlvblJlc3BvbnNlKFxuICAgIGRhdGE6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZVxuICApOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQgPSB7fSBhcyBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkgJiYgZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGVOYW1lID0gZGF0YS5ib2R5LnRlbXBsYXRlLm5hbWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UoZGF0YTogTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UpOiBOb3RpZmljYXRpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogTm90aWZpY2F0aW9uUmVzdWx0ID0ge30gYXMgTm90aWZpY2F0aW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UoXG4gICAgZGF0YTogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2VcbiAgKTogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHt9IGFzIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGVOYW1lID0gZGF0YS5ib2R5LnRlbXBsYXRlLm5hbWU7XG4gICAgICByZXN1bHQudGVtcGxhdGVWZXJzaW9uID0geyB0YWc6IGRhdGEuYm9keS50ZW1wbGF0ZS52ZXJzaW9uLnRhZyB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlKTogTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoKGQ6IElEb21haW5UZW1wbGF0ZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncCcpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMoXG4gICAgcmVzcG9uc2U6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2VcbiAgKTogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdDtcblxuICAgIGRhdGEudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlc3BvbnNlLmJvZHkudGVtcGxhdGUpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3AnKTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5UZW1wbGF0ZXNRdWVyeSk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSwgcXVlcnkpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgcXVlcnk/OiBUZW1wbGF0ZVF1ZXJ5KTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlRGF0YVxuICApOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlQ3JlYXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGFcbiAgKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpKVxuICAgICAgLnRoZW4oKHJlczogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3lBbGwoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE5vdGlmaWNhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSlcbiAgICAgIC50aGVuKChyZXM6IE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBjcmVhdGVWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGFcbiAgKTogUHJvbWlzZTxDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBnZXRWZXJzaW9uKGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXMuYm9keS50ZW1wbGF0ZSlcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGVWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGFcbiAgKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpLCBkYXRhKVxuICAgICAgLnRoZW4oXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgIChyZXM6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3lWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSlcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAudGhlbigocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgbGlzdFZlcnNpb25zKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnlcbiAgKTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zKHJlcylcbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHtcbiAgRXZlbnRzTGlzdCxcbiAgRXZlbnRzUXVlcnksXG4gIEV2ZW50c1Jlc3BvbnNlLFxufSBmcm9tICcuLi9UeXBlcy9FdmVudHMnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElFdmVudENsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudENsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8RXZlbnRzTGlzdD5cbiAgaW1wbGVtZW50cyBJRXZlbnRDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogRXZlbnRzUmVzcG9uc2UsXG4gICk6IEV2ZW50c0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBFdmVudHNMaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICcvJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBnZXQoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRXZlbnRzUXVlcnkpIDogUHJvbWlzZTxFdmVudHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbignL3YzJywgZG9tYWluLCAnZXZlbnRzJyksIHF1ZXJ5KTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgSXBQb29sQ3JlYXRlRGF0YSxcbiAgSXBQb29sQ3JlYXRlUmVzcG9uc2UsXG4gIElwUG9vbENyZWF0ZVJlc3VsdCxcbiAgSXBQb29sRGVsZXRlRGF0YSxcbiAgSXBQb29sTGlzdFJlc3BvbnNlLFxuICBJcFBvb2xMaXN0UmVzdWx0LFxuICBJcFBvb2xNZXNzYWdlUmVzcG9uc2UsXG4gIElwUG9vbE1lc3NhZ2VSZXN1bHQsXG4gIElwUG9vbFVwZGF0ZURhdGEsXG59IGZyb20gJy4uL1R5cGVzL0lQUG9vbHMnO1xuaW1wb3J0IHsgSUlQUG9vbHNDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXBQb29sc0NsaWVudCBpbXBsZW1lbnRzIElJUFBvb2xzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QoKTogUHJvbWlzZTxJcFBvb2xMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92MS9pcF9wb29scycpXG4gICAgICAudGhlbigocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZSkpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKGRhdGE6IElwUG9vbENyZWF0ZURhdGEpOiBQcm9taXNlPElwUG9vbENyZWF0ZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJcFBvb2xDcmVhdGVSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjEvaXBfcG9vbHMnLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sVXBkYXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJcFBvb2xNZXNzYWdlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucGF0Y2hXaXRoRkQoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sRGVsZXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOklwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5kZWxldGUoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJcFBvb2xzUmVzcG9uc2UocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSk6IElwUG9vbExpc3RSZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgTWdSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSXBEYXRhLCBJUHNMaXN0UXVlcnksIElwc0xpc3RSZXNwb25zZUJvZHkgfSBmcm9tICcuLi9UeXBlcy9JUHMnO1xuaW1wb3J0IHsgSUlQc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcHNDbGllbnQgaW1wbGVtZW50cyBJSVBzQ2xpZW50IHtcbiAgcmVxdWVzdDogTWdSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IE1nUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5PzogSVBzTGlzdFF1ZXJ5KTogUHJvbWlzZTxJcHNMaXN0UmVzcG9uc2VCb2R5PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvaXBzJywgcXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnBhcnNlSXBzUmVzcG9uc2U8SXBzTGlzdFJlc3BvbnNlQm9keT4ocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgZ2V0KGlwOiBzdHJpbmcpOiBQcm9taXNlPElwRGF0YT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3YzL2lwcy8ke2lwfWApO1xuICAgIHJldHVybiB0aGlzLnBhcnNlSXBzUmVzcG9uc2U8SXBEYXRhPihyZXNwb25zZSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlSXBzUmVzcG9uc2U8VD4ocmVzcG9uc2U6IHsgYm9keTogVCB9KTogVCB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBNYWlsZ3VuQ2xpZW50T3B0aW9ucyB9IGZyb20gJy4uL1R5cGVzL01haWxndW5DbGllbnQnO1xuXG5pbXBvcnQgRG9tYWluc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc0NsaWVudCc7XG5pbXBvcnQgRXZlbnRDbGllbnQgZnJvbSAnLi9FdmVudHMnO1xuaW1wb3J0IFN0YXRzQ2xpZW50IGZyb20gJy4vU3RhdHMvU3RhdHNDbGllbnQnO1xuaW1wb3J0IFN1cHByZXNzaW9uQ2xpZW50IGZyb20gJy4vU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uc0NsaWVudCc7XG5pbXBvcnQgV2ViaG9va3NDbGllbnQgZnJvbSAnLi9XZWJob29rcyc7XG5pbXBvcnQgTWVzc2FnZXNDbGllbnQgZnJvbSAnLi9NZXNzYWdlcyc7XG5pbXBvcnQgUm91dGVzQ2xpZW50IGZyb20gJy4vUm91dGVzJztcbmltcG9ydCBWYWxpZGF0ZUNsaWVudCBmcm9tICcuL1ZhbGlkYXRpb25zL3ZhbGlkYXRlJztcbmltcG9ydCBJcHNDbGllbnQgZnJvbSAnLi9JUHMnO1xuaW1wb3J0IElwUG9vbHNDbGllbnQgZnJvbSAnLi9JUFBvb2xzJztcbmltcG9ydCBNYWlsaW5nTGlzdHNDbGllbnQgZnJvbSAnLi9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzJztcbmltcG9ydCBNYWlsTGlzdHNNZW1iZXJzIGZyb20gJy4vTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycyc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4uL1R5cGVzL0NvbW1vbic7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNDcmVkZW50aWFscyc7XG5pbXBvcnQgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGZyb20gJy4vVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUYWdzJztcblxuaW1wb3J0IHtcbiAgSURvbWFpbnNDbGllbnQsXG4gIElXZWJIb29rc0NsaWVudCxcbiAgSU1haWxndW5DbGllbnQsXG4gIElNYWlsaW5nTGlzdHNDbGllbnQsXG4gIElFdmVudENsaWVudCxcbiAgSVN0YXRzQ2xpZW50LFxuICBJU3VwcHJlc3Npb25DbGllbnQsXG4gIElNZXNzYWdlc0NsaWVudCxcbiAgSVJvdXRlc0NsaWVudCxcbiAgSVZhbGlkYXRpb25DbGllbnQsXG4gIElJUHNDbGllbnQsXG4gIElJUFBvb2xzQ2xpZW50XG59IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsZ3VuQ2xpZW50IGltcGxlbWVudHMgSU1haWxndW5DbGllbnQge1xuICBwcml2YXRlIHJlcXVlc3Q7XG5cbiAgcHVibGljIGRvbWFpbnM6IElEb21haW5zQ2xpZW50O1xuICBwdWJsaWMgd2ViaG9va3M6IElXZWJIb29rc0NsaWVudDtcbiAgcHVibGljIGV2ZW50czogSUV2ZW50Q2xpZW50O1xuICBwdWJsaWMgc3RhdHM6IElTdGF0c0NsaWVudDtcbiAgcHVibGljIHN1cHByZXNzaW9uczogSVN1cHByZXNzaW9uQ2xpZW50O1xuICBwdWJsaWMgbWVzc2FnZXM6IElNZXNzYWdlc0NsaWVudDtcbiAgcHVibGljIHJvdXRlczogSVJvdXRlc0NsaWVudDtcbiAgcHVibGljIHZhbGlkYXRlOiBJVmFsaWRhdGlvbkNsaWVudDtcbiAgcHVibGljIGlwczogSUlQc0NsaWVudDtcbiAgcHVibGljIGlwX3Bvb2xzOiBJSVBQb29sc0NsaWVudDtcbiAgcHVibGljIGxpc3RzOiBJTWFpbGluZ0xpc3RzQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE1haWxndW5DbGllbnRPcHRpb25zLCBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIGNvbnN0IGNvbmZpZzogUmVxdWVzdE9wdGlvbnMgPSB7IC4uLm9wdGlvbnMgfSBhcyBSZXF1ZXN0T3B0aW9ucztcblxuICAgIGlmICghY29uZmlnLnVybCkge1xuICAgICAgY29uZmlnLnVybCA9ICdodHRwczovL2FwaS5tYWlsZ3VuLm5ldCc7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcudXNlcm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwidXNlcm5hbWVcIiBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJrZXlcIiBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICB0aGlzLnJlcXVlc3QgPSBuZXcgUmVxdWVzdChjb25maWcsIGZvcm1EYXRhKTtcbiAgICBjb25zdCBtYWlsTGlzdHNNZW1iZXJzID0gbmV3IE1haWxMaXN0c01lbWJlcnModGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5DcmVkZW50aWFsc0NsaWVudCA9IG5ldyBEb21haW5DcmVkZW50aWFsc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpblRlbXBsYXRlc0NsaWVudCA9IG5ldyBEb21haW5UZW1wbGF0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5UYWdzQ2xpZW50ID0gbmV3IERvbWFpblRhZ3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgPSBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG5cbiAgICB0aGlzLmRvbWFpbnMgPSBuZXcgRG9tYWluc0NsaWVudChcbiAgICAgIHRoaXMucmVxdWVzdCxcbiAgICAgIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LFxuICAgICAgZG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICAgICAgZG9tYWluVGFnc0NsaWVudFxuICAgICk7XG4gICAgdGhpcy53ZWJob29rcyA9IG5ldyBXZWJob29rc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50Q2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0c0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuc3VwcHJlc3Npb25zID0gbmV3IFN1cHByZXNzaW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5tZXNzYWdlcyA9IG5ldyBNZXNzYWdlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMucm91dGVzID0gbmV3IFJvdXRlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuaXBzID0gbmV3IElwc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuaXBfcG9vbHMgPSBuZXcgSXBQb29sc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMubGlzdHMgPSBuZXcgTWFpbGluZ0xpc3RzQ2xpZW50KHRoaXMucmVxdWVzdCwgbWFpbExpc3RzTWVtYmVycyk7XG4gICAgdGhpcy52YWxpZGF0ZSA9IG5ldyBWYWxpZGF0ZUNsaWVudCh0aGlzLnJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCk7XG4gIH1cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7XG4gIE1haWxMaXN0TWVtYmVyc1F1ZXJ5LFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMsXG4gIE1haWxMaXN0TWVtYmVyLFxuICBNdWx0aXBsZU1lbWJlcnNEYXRhLFxuICBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhLFxuICBEZWxldGVkTWVtYmVyLFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXEsXG4gIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlLFxuICBNYWlsTGlzdE1lbWJlcnNSZXN1bHQsXG4gIE1haWxMaXN0TWVtYmVyc1Jlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL01haWxpbmdMaXN0cyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvTWFpbGluZ0xpc3RzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbExpc3RzTWVtYmVyc1xuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8TWFpbExpc3RNZW1iZXJzUmVzdWx0PlxuICBpbXBsZW1lbnRzIElNYWlsTGlzdHNNZW1iZXJzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycykge1xuICAgIGNvbnN0IG5ld0RhdGEgPSB7IC4uLmRhdGEgfTtcblxuICAgIGlmICh0eXBlb2YgZGF0YS52YXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbmV3RGF0YS52YXJzID0gSlNPTi5zdHJpbmdpZnkobmV3RGF0YS52YXJzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEuc3Vic2NyaWJlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBuZXdEYXRhLnN1YnNjcmliZWQgPSBkYXRhLnN1YnNjcmliZWQgPyAneWVzJyA6ICdubyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld0RhdGEgYXMgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzUmVxO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogTWFpbExpc3RNZW1iZXJzUmVzcG9uc2UsXG4gICk6IE1haWxMaXN0TWVtYmVyc1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIE1haWxMaXN0TWVtYmVyc1Jlc3VsdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0TWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBxdWVyeT86IE1haWxMaXN0TWVtYmVyc1F1ZXJ5XG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXJzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzL3BhZ2VzYCwgcXVlcnkpO1xuICB9XG5cbiAgZ2V0TWVtYmVyKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgY3JlYXRlTWVtYmVyKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1xuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgY29uc3QgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnNgLCByZXFEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBjcmVhdGVNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlTWVtYmVyc0RhdGFcbiAgKTogUHJvbWlzZTxOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZT4ge1xuICAgIGNvbnN0IG5ld0RhdGE6IE11bHRpcGxlTWVtYmVyc1JlcURhdGEgPSB7XG4gICAgICBtZW1iZXJzOiBBcnJheS5pc0FycmF5KGRhdGEubWVtYmVycykgPyBKU09OLnN0cmluZ2lmeShkYXRhLm1lbWJlcnMpIDogZGF0YS5tZW1iZXJzLFxuICAgICAgdXBzZXJ0OiBkYXRhLnVwc2VydFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLmpzb25gLCBuZXdEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YCwgcmVxRGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgZGVzdHJveU1lbWJlcihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcpIDogUHJvbWlzZTxEZWxldGVkTWVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgRGVsZXRlZE1lbWJlcik7XG4gIH1cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7XG4gIExpc3RzUXVlcnksXG4gIENyZWF0ZVVwZGF0ZUxpc3QsXG4gIERlc3Ryb3llZExpc3QsXG4gIE1haWxpbmdMaXN0LFxuICBNYWlsaW5nTGlzdFZhbGlkYXRpb25BcGlSZXNwb25zZSxcbiAgU3RhcnRWYWxpZGF0aW9uUmVzdWx0LFxuICBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQsXG4gIE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdCxcbiAgTWFpbGluZ0xpc3RSZXN1bHQsXG4gIE1haWxpbmdMaXN0QXBpUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvTWFpbGluZ0xpc3RzJztcbmltcG9ydCB7IElNYWlsTGlzdHNNZW1iZXJzIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RNZW1iZXJzJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IElNYWlsaW5nTGlzdHNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbGluZ0xpc3RzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxNYWlsaW5nTGlzdFJlc3VsdD5cbiAgaW1wbGVtZW50cyBJTWFpbGluZ0xpc3RzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHB1YmxpYyBtZW1iZXJzOiBJTWFpbExpc3RzTWVtYmVycztcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBtZW1iZXJzOiBJTWFpbExpc3RzTWVtYmVycykge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgICB0aGlzLm1lbWJlcnMgPSBtZW1iZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZVZhbGlkYXRpb25SZXN1bHQoXG4gICAgc3RhdHVzOiBudW1iZXIsXG4gICAgZGF0YTogTWFpbGluZ0xpc3RWYWxpZGF0aW9uQXBpUmVzcG9uc2VcbiAgKTogTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgdmFsaWRhdGlvblJlc3VsdDoge1xuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQgKiAxMDAwKSAvLyBhZGQgbWlsbGlzZWNvbmQgdG8gVW5peCB0aW1lc3RhbXBcbiAgICAgIH1cbiAgICB9IGFzIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QocmVzcG9uc2U6IE1haWxpbmdMaXN0QXBpUmVzcG9uc2UpOiBNYWlsaW5nTGlzdFJlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIE1haWxpbmdMaXN0UmVzdWx0O1xuXG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5PzogTGlzdHNRdWVyeSk6IFByb21pc2U8TWFpbGluZ0xpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyhgJHt0aGlzLmJhc2VSb3V0ZX0vcGFnZXNgLCBxdWVyeSk7XG4gIH1cblxuICBnZXQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCBhcyBNYWlsaW5nTGlzdCk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodGhpcy5iYXNlUm91dGUsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCBhcyBNYWlsaW5nTGlzdCk7XG4gIH1cblxuICB1cGRhdGUobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCBhcyBNYWlsaW5nTGlzdCk7XG4gIH1cblxuICBkZXN0cm95KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95ZWRMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgRGVzdHJveWVkTGlzdCk7XG4gIH1cblxuICB2YWxpZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8U3RhcnRWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgLCB7fSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gKHtcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICAgIH0pIGFzIFN0YXJ0VmFsaWRhdGlvblJlc3VsdCk7XG4gIH1cblxuICB2YWxpZGF0aW9uUmVzdWx0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYClcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzcG9uc2UpID0+IHRoaXMucGFyc2VWYWxpZGF0aW9uUmVzdWx0KFxuICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgcmVzcG9uc2UuYm9keSBhcyBNYWlsaW5nTGlzdFZhbGlkYXRpb25BcGlSZXNwb25zZVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgY2FuY2VsVmFsaWRhdGlvbihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+ICh7XG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICAgIH0gYXMgTWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0KSk7XG4gIH1cbn1cbiIsImltcG9ydCBBUElFcnJvciBmcm9tICcuL2NvbW1vbi9FcnJvcic7XG5pbXBvcnQgeyBBUElFcnJvck9wdGlvbnMgfSBmcm9tICcuLi9UeXBlcy9Db21tb24nO1xuaW1wb3J0IHtcbiAgTWFpbGd1bk1lc3NhZ2VEYXRhLFxuICBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSxcbiAgTWVzc2FnZXNTZW5kUmVzdWx0XG59IGZyb20gJy4uL1R5cGVzL01lc3NhZ2VzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSU1lc3NhZ2VzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VzQ2xpZW50IGltcGxlbWVudHMgSU1lc3NhZ2VzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZUJvb2xlYW5WYWx1ZXMoZGF0YTogTWFpbGd1bk1lc3NhZ2VEYXRhKTogTWFpbGd1bk1lc3NhZ2VEYXRhIHtcbiAgICBjb25zdCB5ZXNOb1Byb3BlcnRpZXMgPSBuZXcgU2V0KFtcbiAgICAgICdvOnRlc3Rtb2RlJyxcbiAgICAgICd0OnRleHQnLFxuICAgICAgJ286ZGtpbScsXG4gICAgICAnbzp0cmFja2luZycsXG4gICAgICAnbzp0cmFja2luZy1jbGlja3MnLFxuICAgICAgJ286dHJhY2tpbmctb3BlbnMnLFxuICAgICAgJ286cmVxdWlyZS10bHMnLFxuICAgICAgJ286c2tpcC12ZXJpZmljYXRpb24nXG4gICAgXSk7XG5cbiAgICBpZiAoIWRhdGEgfHwgT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgbWVzc2FnZTogJ01lc3NhZ2UgZGF0YSBvYmplY3QgY2FuIG5vdCBiZSBlbXB0eSdcbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGlmICh5ZXNOb1Byb3BlcnRpZXMuaGFzKGtleSkgJiYgdHlwZW9mIGRhdGFba2V5XSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldID8gJ3llcycgOiAnbm8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjW2tleV0gPSBkYXRhW2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9IGFzIE1haWxndW5NZXNzYWdlRGF0YSk7XG4gIH1cblxuICBfcGFyc2VSZXNwb25zZShyZXNwb25zZTogTWVzc2FnZXNTZW5kQVBJUmVzcG9uc2UpOiBNZXNzYWdlc1NlbmRSZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBNYWlsZ3VuTWVzc2FnZURhdGEpOiBQcm9taXNlPE1lc3NhZ2VzU2VuZFJlc3VsdD4ge1xuICAgIGlmIChkYXRhLm1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3YzLyR7ZG9tYWlufS9tZXNzYWdlcy5taW1lYCwgZGF0YSlcbiAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kaWZpZWREYXRhID0gdGhpcy5wcmVwYXJlQm9vbGVhblZhbHVlcyhkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92My8ke2RvbWFpbn0vbWVzc2FnZXNgLCBtb2RpZmllZERhdGEpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVJvdXRlc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuaW1wb3J0IHtcbiAgQ3JlYXRlVXBkYXRlUm91dGVEYXRhLCBEZXN0cm95Um91dGVSZXNwb25zZSwgUm91dGUsIFJvdXRlc0xpc3RRdWVyeSwgVXBkYXRlUm91dGVSZXNwb25zZVxufSBmcm9tICcuLi9UeXBlcy9Sb3V0ZXMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlc0NsaWVudCBpbXBsZW1lbnRzIElSb3V0ZXNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeTogUm91dGVzTGlzdFF1ZXJ5KTogUHJvbWlzZTxSb3V0ZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9yb3V0ZXMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyk7XG4gIH1cblxuICBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL3JvdXRlcy8ke2lkfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92My9yb3V0ZXMnLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5LnJvdXRlKTtcbiAgfVxuXG4gIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFVwZGF0ZVJvdXRlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgL3YzL3JvdXRlcy8ke2lkfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95Um91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IFN0YXRzUXVlcnksIFN0YXRzT3B0aW9ucyB9IGZyb20gJy4uLy4uL1R5cGVzL1N0YXRzJztcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0NvbW1vbic7XG5pbXBvcnQgU3RhdHNDb250YWluZXIgZnJvbSAnLi9TdGF0c0NvbnRhaW5lcic7XG5pbXBvcnQgeyBJU3RhdHNDbGllbnQsIElTdGF0c0NvbnRhaW5lciB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3RhdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c0NsaWVudCBpbXBsZW1lbnRzIElTdGF0c0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHByaXZhdGUgbG9nZ2VyOiBJTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIGxvZ2dlcjogSUxvZ2dlciA9IGNvbnNvbGUpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RGF0ZVRvVVRDKGtleTpzdHJpbmcsIGlucHV0RGF0ZTogRGF0ZSk6IEFycmF5PHN0cmluZz4ge1xuICAgIC8qXG4gICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAqL1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYERhdGU6XCIke2lucHV0RGF0ZX1cIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cblZhbHVlIFwiJHtpbnB1dERhdGUudG9VVENTdHJpbmcoKX1cIiB3aWxsIGJlIHVzZWQgZm9yIHJlcXVlc3QuXG5Db25zaWRlciB1c2luZyBzdGluZyB0eXBlIGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiIHRvIGF2b2lkIGF1dG8tY29udmVydGluZ2ApO1xuICAgIHJldHVybiBba2V5LCBpbnB1dERhdGUudG9VVENTdHJpbmcoKV07XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnk6IFN0YXRzUXVlcnkgfCB1bmRlZmluZWQpOiBBcnJheTxBcnJheTxzdHJpbmc+PiB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9IFtdIGFzIEFycmF5PEFycmF5PHN0cmluZz4+O1xuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHF1ZXJ5KS5sZW5ndGgpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IE9iamVjdC5lbnRyaWVzKHF1ZXJ5KS5yZWR1Y2UoKGFycmF5V2l0aFBhaXJzLCBjdXJyZW50UGFpcikgPT4ge1xuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBjdXJyZW50UGFpcjtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoKSB7IC8vIGV2ZW50OiBbJ2RlbGl2ZXJlZCcsICdhY2NlcHRlZCddXG4gICAgICAgICAgY29uc3QgcmVwZWF0ZWRQcm9wZXJ0eSA9IHZhbHVlLm1hcCgoaXRlbSkgPT4gW2tleSwgaXRlbV0pO1xuICAgICAgICAgIHJldHVybiBbLi4uYXJyYXlXaXRoUGFpcnMsIC4uLnJlcGVhdGVkUHJvcGVydHldOyAvLyBbW2V2ZW50LGRlbGl2ZXJlZF0sIFtldmVudCxhY2NlcHRlZF1dXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgYXJyYXlXaXRoUGFpcnMucHVzaCh0aGlzLmNvbnZlcnREYXRlVG9VVEMoa2V5LCB2YWx1ZSkpO1xuICAgICAgICAgIHJldHVybiBhcnJheVdpdGhQYWlycztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgYXJyYXlXaXRoUGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFycmF5V2l0aFBhaXJzO1xuICAgICAgfSwgW10gYXMgQXJyYXk8QXJyYXk8c3RyaW5nPj4pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWFyY2hQYXJhbXM7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlU3RhdHMocmVzcG9uc2U6IHsgYm9keTogU3RhdHNPcHRpb25zIH0pOiBJU3RhdHNDb250YWluZXIge1xuICAgIHJldHVybiBuZXcgU3RhdHNDb250YWluZXIocmVzcG9uc2UuYm9keSk7XG4gIH1cblxuICBnZXREb21haW4oZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8SVN0YXRzQ29udGFpbmVyPiB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMnLCBkb21haW4sICdzdGF0cy90b3RhbCcpLCBzZWFyY2hQYXJhbXMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlU3RhdHMpO1xuICB9XG5cbiAgZ2V0QWNjb3VudChxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPElTdGF0c0NvbnRhaW5lcj4ge1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9zdGF0cy90b3RhbCcsIHNlYXJjaFBhcmFtcylcbiAgICAgIC50aGVuKHRoaXMucGFyc2VTdGF0cyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElTdGF0c0NvbnRhaW5lciB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3RhdHMnO1xuaW1wb3J0IHsgU3RhdCwgU3RhdHNPcHRpb25zIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3RhdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c0NvbnRhaW5lciBpbXBsZW1lbnRzIElTdGF0c0NvbnRhaW5lciB7XG4gICAgc3RhcnQ6IERhdGU7XG4gICAgZW5kOiBEYXRlO1xuICAgIHJlc29sdXRpb246IHN0cmluZztcbiAgICBzdGF0czogU3RhdFtdO1xuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFN0YXRzT3B0aW9ucykge1xuICAgICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKGRhdGEuc3RhcnQpO1xuICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZShkYXRhLmVuZCk7XG4gICAgICB0aGlzLnJlc29sdXRpb24gPSBkYXRhLnJlc29sdXRpb247XG4gICAgICB0aGlzLnN0YXRzID0gZGF0YS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQ6IFN0YXQpIHtcbiAgICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0IH07XG4gICAgICAgIHJlcy50aW1lID0gbmV3IERhdGUoc3RhdC50aW1lKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSUJvdW5jZSB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IEJvdW5jZURhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3VuY2UgZXh0ZW5kcyBTdXBwcmVzc2lvbiBpbXBsZW1lbnRzIElCb3VuY2Uge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogQm91bmNlRGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuQk9VTkNFUyk7XG4gICAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICB0aGlzLmNvZGUgPSArZGF0YS5jb2RlO1xuICAgICAgdGhpcy5lcnJvciA9IGRhdGEuZXJyb3I7XG4gICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSUNvbXBsYWludCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IENvbXBsYWludERhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wbGFpbnQgZXh0ZW5kcyBTdXBwcmVzc2lvbiBpbXBsZW1lbnRzIElDb21wbGFpbnQge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIGNvbnN0cnVjdG9yKGRhdGE6IENvbXBsYWludERhdGEpIHtcbiAgICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLkNPTVBMQUlOVFMpO1xuICAgICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwcHJlc3Npb24ge1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBTdXBwcmVzc2lvbk1vZGVscykge1xuICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3InO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IEJvdW5jZSBmcm9tICcuL0JvdW5jZSc7XG5pbXBvcnQgQ29tcGxhaW50IGZyb20gJy4vQ29tcGxhaW50JztcbmltcG9ydCBVbnN1YnNjcmliZSBmcm9tICcuL1Vuc3Vic2NyaWJlJztcbmltcG9ydCBXaGl0ZUxpc3QgZnJvbSAnLi9XaGl0ZUxpc3QnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuaW1wb3J0IHtcbiAgSUJvdW5jZSxcbiAgSUNvbXBsYWludCxcbiAgSVN1cHByZXNzaW9uQ2xpZW50LFxuICBJVW5zdWJzY3JpYmUsXG4gIElXaGl0ZUxpc3Rcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHtcbiAgU3VwcHJlc3Npb25MaXN0LFxuICBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSxcbiAgU3VwcHJlc3Npb25EYXRhVHlwZSxcbiAgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSxcbiAgU3VwcHJlc3Npb25MaXN0UXVlcnksXG4gIFN1cHByZXNzaW9uUmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdCxcbiAgU3VwcHJlc3Npb25EZXN0cm95UmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IEFQSUVycm9yT3B0aW9ucyB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5cbmNvbnN0IGNyZWF0ZU9wdGlvbnMgPSB7XG4gIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBwcmVzc2lvbkNsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8U3VwcHJlc3Npb25MaXN0PlxuICBpbXBsZW1lbnRzIElTdXBwcmVzc2lvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIG1vZGVsczogb2JqZWN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubW9kZWxzID0ge1xuICAgICAgYm91bmNlczogQm91bmNlLFxuICAgICAgY29tcGxhaW50czogQ29tcGxhaW50LFxuICAgICAgdW5zdWJzY3JpYmVzOiBVbnN1YnNjcmliZSxcbiAgICAgIHdoaXRlbGlzdHM6IFdoaXRlTGlzdCxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogU3VwcHJlc3Npb25MaXN0UmVzcG9uc2UsXG4gICAgTW9kZWw6IHtcbiAgICAgIG5ldyhkYXRhOiBTdXBwcmVzc2lvbkRhdGFUeXBlKTpcbiAgICAgIElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdFxuICAgIH1cbiAgKTogU3VwcHJlc3Npb25MaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgU3VwcHJlc3Npb25MaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zPy5tYXAoKGl0ZW0pID0+IG5ldyBNb2RlbChpdGVtKSkgfHwgW107XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgX3BhcnNlSXRlbTxUIGV4dGVuZHMgU3VwcHJlc3Npb24+KFxuICAgIGRhdGEgOiBTdXBwcmVzc2lvbkRhdGFUeXBlLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YVR5cGU6IFN1cHByZXNzaW9uRGF0YVR5cGUpOlRcbiAgICB9XG4gICk6IFQge1xuICAgIHJldHVybiBuZXcgTW9kZWwoZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVdoaXRlTGlzdChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW10sXG4gICAgaXNEYXRhQXJyYXk6IGJvb2xlYW5cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgaWYgKGlzRGF0YUFycmF5KSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgc3RhdHVzVGV4dDogJ0RhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCcsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBtZXNzYWdlOiAnV2hpdGVsaXN0XFwncyBjcmVhdGlvbiBwcm9jZXNzIGRvZXMgbm90IHN1cHBvcnQgbXVsdGlwbGUgY3JlYXRpb25zLiBEYXRhIHByb3BlcnR5IHNob3VsZCBiZSBhbiBvYmplY3QnXG4gICAgICAgIH1cbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3RXaXRoRkQodXJsam9pbigndjMnLCBkb21haW4sICd3aGl0ZWxpc3RzJyksIGRhdGEpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVVuc3Vic2NyaWJlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkgeyAvLyBVc2VyIHByb3ZpZGVkIGFuIGFycmF5XG4gICAgICBjb25zdCBpc0NvbnRhaW5zVGFnID0gZGF0YS5zb21lKCh1bnN1YnNjcmliZTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEpID0+IHVuc3Vic2NyaWJlLnRhZyk7XG4gICAgICBpZiAoaXNDb250YWluc1RhZykge1xuICAgICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgIHN0YXR1c1RleHQ6ICdUYWcgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSB1c2VkIGZvciBjcmVhdGluZyBtdWx0aXBsZSB1bnN1YnNjcmliZXMuJyxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBtZXNzYWdlOiAnVGFnIHByb3BlcnR5IGNhbiBiZSB1c2VkIG9ubHkgaWYgb25lIHVuc3Vic2NyaWJlIHByb3ZpZGVkIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kLiBQbGVhc2UgdXNlIHRhZ3MgaW5zdGVhZC4nXG4gICAgICAgICAgfVxuICAgICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAgIC5wb3N0KHVybGpvaW4oJ3YzJywgZG9tYWluLCAndW5zdWJzY3JpYmVzJyksIEpTT04uc3RyaW5naWZ5KGRhdGEpLCBjcmVhdGVPcHRpb25zKVxuICAgICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGE/LnRhZ3MpIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBzdGF0dXNUZXh0OiAnVGFncyBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHVzZWQgZm9yIGNyZWF0aW5nIG9uZSB1bnN1YnNjcmliZS4nLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgbWVzc2FnZTogJ1RhZ3MgcHJvcGVydHkgY2FuIGJlIHVzZWQgaWYgeW91IHByb3ZpZGVzIGFuIGFycmF5IG9mIHVuc3Vic2NyaWJlcyBhcyBzZWNvbmQgYXJndW1lbnQgb2YgY3JlYXRlIG1ldGhvZC4gUGxlYXNlIHVzZSB0YWcgaW5zdGVhZCdcbiAgICAgICAgfVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLnRhZykpIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBzdGF0dXNUZXh0OiAnVGFnIHByb3BlcnR5IGNhbiBub3QgYmUgYW4gYXJyYXknLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgbWVzc2FnZTogJ1BsZWFzZSB1c2UgYXJyYXkgb2YgdW5zdWJzY3JpYmVzIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kIHRvIGJlIGFibGUgdG8gcHJvdmlkZSBmZXcgdGFncydcbiAgICAgICAgfVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cbiAgICAvKiBXZSBuZWVkIEZvcm0gRGF0YSBmb3IgdW5zdWJzY3JpYmVzIGlmIHdlIHdhbnQgdG8gc3VwcG9ydCB0aGUgXCJ0YWdcIiBwcm9wZXJ0eSAqL1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAndW5zdWJzY3JpYmVzJyksIGRhdGEpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBwcml2YXRlIGdldE1vZGVsKHR5cGU6IHN0cmluZykge1xuICAgIGlmICh0eXBlIGluIHRoaXMubW9kZWxzKSB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbHNbdHlwZSBhcyBrZXlvZiB0eXBlb2YgdGhpcy5tb2RlbHNdO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICBzdGF0dXNUZXh0OiAnVW5rbm93biB0eXBlIHZhbHVlJyxcbiAgICAgIGJvZHk6IHsgbWVzc2FnZTogJ1R5cGUgbWF5IGJlIG9ubHkgb25lIG9mIFtib3VuY2VzLCBjb21wbGFpbnRzLCB1bnN1YnNjcmliZXMsIHdoaXRlbGlzdHNdJyB9XG4gICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUmVzcG9uc2UocmVzcG9uc2U6IFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSk6IFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICB0eXBlOiByZXNwb25zZS5ib2R5LnR5cGUgfHwgJycsXG4gICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIHF1ZXJ5PzogU3VwcHJlc3Npb25MaXN0UXVlcnlcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkxpc3Q+IHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBxdWVyeSwgbW9kZWwpO1xuICB9XG5cbiAgZ2V0KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3Q+IHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLmdldCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSwgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogU3VwcHJlc3Npb25SZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VJdGVtPHR5cGVvZiBtb2RlbD4ocmVzcG9uc2UuYm9keSwgbW9kZWwpKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgfCBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YVtdXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdD4ge1xuICAgIHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgLy8gc3VwcG9ydHMgYWRkaW5nIG11bHRpcGxlIHN1cHByZXNzaW9ucyBieSBkZWZhdWx0XG4gICAgbGV0IHBvc3REYXRhO1xuICAgIGNvbnN0IGlzRGF0YUFycmF5ID0gQXJyYXkuaXNBcnJheShkYXRhKTtcblxuICAgIGlmICh0eXBlID09PSAnd2hpdGVsaXN0cycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVdoaXRlTGlzdChkb21haW4sIGRhdGEsIGlzRGF0YUFycmF5KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ3Vuc3Vic2NyaWJlcycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVVuc3Vic2NyaWJlKGRvbWFpbiwgZGF0YSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0RhdGFBcnJheSkge1xuICAgICAgcG9zdERhdGEgPSBbZGF0YV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc3REYXRhID0gWy4uLmRhdGFdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlKSwgSlNPTi5zdHJpbmdpZnkocG9zdERhdGEpLCBjcmVhdGVPcHRpb25zKVxuICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25EZXN0cm95UmVzdWx0PiB7XG4gICAgdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAuZGVsZXRlKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZSkgPT4gKHtcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgICAgYWRkcmVzczogcmVzcG9uc2UuYm9keS5hZGRyZXNzIHx8ICcnLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgfSkpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3VwcHJlc3Npb25DbGllbnQ7XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IElVbnN1YnNjcmliZSB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IFVuc3Vic2NyaWJlRGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5cbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5zdWJzY3JpYmUgZXh0ZW5kcyBTdXBwcmVzc2lvbiBpbXBsZW1lbnRzIElVbnN1YnNjcmliZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIHRhZ3M6IHN0cmluZ1tdO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBVbnN1YnNjcmliZURhdGEpIHtcbiAgICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLlVOU1VCU0NSSUJFUyk7XG4gICAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICB0aGlzLnRhZ3MgPSBkYXRhLnRhZ3M7XG4gICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSVdoaXRlTGlzdCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IFdoaXRlTGlzdERhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaGl0ZUxpc3QgZXh0ZW5kcyBTdXBwcmVzc2lvbiBpbXBsZW1lbnRzIElXaGl0ZUxpc3Qge1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogV2hpdGVMaXN0RGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuV0hJVEVMSVNUUyk7XG4gICAgICB0aGlzLnZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICAgIHRoaXMucmVhc29uID0gZGF0YS5yZWFzb247XG4gICAgICB0aGlzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZEF0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BcGlSZXNwb25zZSc7XG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1ZhbGlkYXRpb25zJztcbmltcG9ydCB7XG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdCxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9iRGF0YSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzcG9uc2UsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnksXG4gIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YSxcbiAgQ3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYixcbiAgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhVXBkYXRlZCxcbiAgQ2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2Jcbn0gZnJvbSAnLi4vLi4vVHlwZXMvVmFsaWRhdGlvbnMvTXVsdGlwbGVWYWxpZGF0aW9uJztcblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlVmFsaWRhdGlvbkpvYiBpbXBsZW1lbnRzIE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdCB7XG4gIGNyZWF0ZWRBdDogRGF0ZTtcbiAgaWQ6IHN0cmluZztcbiAgcXVhbnRpdHk6IG51bWJlclxuICByZWNvcmRzUHJvY2Vzc2VkOiBudW1iZXIgfCBudWxsO1xuICBzdGF0dXM6IHN0cmluZztcbiAgZG93bmxvYWRVcmw/OiB7XG4gICAgY3N2OiBzdHJpbmc7XG4gICAganNvbjogc3RyaW5nO1xuICB9O1xuXG4gIHJlc3BvbnNlU3RhdHVzQ29kZTogbnVtYmVyO1xuICBzdW1tYXJ5Pzoge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgY2F0Y2hBbGw6IG51bWJlcjtcbiAgICAgICAgICBkZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgIGRvTm90U2VuZDogbnVtYmVyO1xuICAgICAgICAgIHVuZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICB9O1xuICAgICAgcmlzazoge1xuICAgICAgICAgIGhpZ2g6IG51bWJlcjtcbiAgICAgICAgICBsb3c6IG51bWJlcjtcbiAgICAgICAgICBtZWRpdW06IG51bWJlcjtcbiAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihkYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JEYXRhLCByZXNwb25zZVN0YXR1c0NvZGU6IG51bWJlcikge1xuICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcbiAgICB0aGlzLnF1YW50aXR5ID0gZGF0YS5xdWFudGl0eTtcbiAgICB0aGlzLnJlY29yZHNQcm9jZXNzZWQgPSBkYXRhLnJlY29yZHNfcHJvY2Vzc2VkO1xuICAgIHRoaXMuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgdGhpcy5yZXNwb25zZVN0YXR1c0NvZGUgPSByZXNwb25zZVN0YXR1c0NvZGU7XG4gICAgaWYgKGRhdGEuZG93bmxvYWRfdXJsKSB7XG4gICAgICB0aGlzLmRvd25sb2FkVXJsID0ge1xuICAgICAgICBjc3Y6IGRhdGEuZG93bmxvYWRfdXJsPy5jc3YsXG4gICAgICAgIGpzb246IGRhdGEuZG93bmxvYWRfdXJsPy5qc29uXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoZGF0YS5zdW1tYXJ5KSB7XG4gICAgICB0aGlzLnN1bW1hcnkgPSB7XG4gICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgIGNhdGNoQWxsOiBkYXRhLnN1bW1hcnkucmVzdWx0LmNhdGNoX2FsbCxcbiAgICAgICAgICBkZWxpdmVyYWJsZTogZGF0YS5zdW1tYXJ5LnJlc3VsdC5kZWxpdmVyYWJsZSxcbiAgICAgICAgICBkb05vdFNlbmQ6IGRhdGEuc3VtbWFyeS5yZXN1bHQuZG9fbm90X3NlbmQsXG4gICAgICAgICAgdW5kZWxpdmVyYWJsZTogZGF0YS5zdW1tYXJ5LnJlc3VsdC51bmRlbGl2ZXJhYmxlLFxuICAgICAgICAgIHVua25vd246IGRhdGEuc3VtbWFyeS5yZXN1bHQudW5rbm93blxuICAgICAgICB9LFxuICAgICAgICByaXNrOiB7XG4gICAgICAgICAgaGlnaDogZGF0YS5zdW1tYXJ5LnJpc2suaGlnaCxcbiAgICAgICAgICBsb3c6IGRhdGEuc3VtbWFyeS5yaXNrLmxvdyxcbiAgICAgICAgICBtZWRpdW06IGRhdGEuc3VtbWFyeS5yaXNrLm1lZGl1bSxcbiAgICAgICAgICB1bmtub3duOiBkYXRhLnN1bW1hcnkucmlzay51bmtub3duXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+XG4gIGltcGxlbWVudHMgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlUmVzcG9uc2U8VD4ocmVzcG9uc2U6IEFQSVJlc3BvbnNlKTogVCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2U/LmJvZHlcbiAgICB9IGFzIFQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KHJlc3BvbnNlOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3BvbnNlKVxuICAgIDogTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdDtcblxuICAgIGRhdGEuam9icyA9IHJlc3BvbnNlLmJvZHkuam9icy5tYXAoKGpvYikgPT4gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkpvYihqb2IsIHJlc3BvbnNlLnN0YXR1cykpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3Bpdm90Jyk7XG4gICAgZGF0YS50b3RhbCA9IHJlc3BvbnNlLmJvZHkudG90YWw7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk/OiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFF1ZXJ5KTogUHJvbWlzZTxNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKCcvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrJywgcXVlcnkpO1xuICB9XG5cbiAgYXN5bmMgZ2V0KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvJHtsaXN0SWR9YCk7XG4gICAgcmV0dXJuIG5ldyBNdWx0aXBsZVZhbGlkYXRpb25Kb2IocmVzcG9uc2UuYm9keSwgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZShcbiAgICBsaXN0SWQ6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFcbiAgKTogUHJvbWlzZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgY29uc3QgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhVXBkYXRlZCA9IHtcbiAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IHtcbiAgICAgICAgLi4uZGF0YT8uZmlsZVxuICAgICAgfSxcbiAgICAgIC4uLmRhdGFcbiAgICB9O1xuICAgIGRlbGV0ZSBtdWx0aXBsZVZhbGlkYXRpb25EYXRhLmZpbGU7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gLCBtdWx0aXBsZVZhbGlkYXRpb25EYXRhKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBkZXN0cm95KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ocmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJVmFsaWRhdGlvbkNsaWVudCwgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgVmFsaWRhdGlvblF1ZXJ5LCBWYWxpZGF0aW9uUmVzdWx0LCBWYWxpZGF0aW9uUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRlQ2xpZW50IGltcGxlbWVudHMgSVZhbGlkYXRpb25DbGllbnQge1xuICBwdWJsaWMgbXVsdGlwbGVWYWxpZGF0aW9uO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDogSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5tdWx0aXBsZVZhbGlkYXRpb24gPSBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ7XG4gIH1cblxuICBhc3luYyBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgY29uc3QgcXVlcnk6IFZhbGlkYXRpb25RdWVyeSA9IHsgYWRkcmVzcyB9O1xuICAgIGNvbnN0IHJlc3VsdDogVmFsaWRhdGlvblJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUnLCBxdWVyeSk7XG4gICAgcmV0dXJuIHJlc3VsdC5ib2R5IGFzIFZhbGlkYXRpb25SZXN1bHQ7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7IFdlYmhvb2tzSWRzIH0gZnJvbSAnLi4vRW51bXMnO1xuaW1wb3J0IHsgSVdlYkhvb2tzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcy9XZWJob29rcyc7XG5cbmltcG9ydCB7XG4gIFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2UsXG4gIFdlYmhvb2tMaXN0LFxuICBXZWJob29rUmVzcG9uc2UsXG4gIFdlYmhvb2tzUXVlcnksXG4gIFdlYmhvb2tSZXN1bHRcbn0gZnJvbSAnLi4vVHlwZXMvV2ViaG9va3MnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBjbGFzcyBXZWJob29rIGltcGxlbWVudHMgV2ViaG9va1Jlc3VsdCB7XG4gIGlkOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudXJsID0gdXJsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYmhvb2tzQ2xpZW50IGltcGxlbWVudHMgSVdlYkhvb2tzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlV2ViaG9va0xpc3QocmVzcG9uc2U6IHsgYm9keTogeyB3ZWJob29rczogV2ViaG9va0xpc3QgfSB9KTogV2ViaG9va0xpc3Qge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5LndlYmhvb2tzO1xuICB9XG5cbiAgX3BhcnNlV2ViaG9va1dpdGhJRChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNwb25zZTogV2ViaG9va1Jlc3BvbnNlKTogV2ViaG9va1Jlc3VsdCB7XG4gICAgICBjb25zdCB3ZWJob29rUmVzcG9uc2UgPSByZXNwb25zZT8uYm9keT8ud2ViaG9vaztcbiAgICAgIGxldCB1cmwgPSB3ZWJob29rUmVzcG9uc2U/LnVybDtcbiAgICAgIGlmICghdXJsKSB7XG4gICAgICAgIHVybCA9IHdlYmhvb2tSZXNwb25zZT8udXJscyAmJiB3ZWJob29rUmVzcG9uc2UudXJscy5sZW5ndGhcbiAgICAgICAgICA/IHdlYmhvb2tSZXNwb25zZS51cmxzWzBdXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFdlYmhvb2soaWQsIHVybCk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlV2ViaG9va1Rlc3QocmVzcG9uc2U6IHsgYm9keTogeyBjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZyB9IH0pXG4gIDoge2NvZGU6IG51bWJlciwgbWVzc2FnZTpzdHJpbmd9IHtcbiAgICByZXR1cm4ge1xuICAgICAgY29kZTogcmVzcG9uc2UuYm9keS5jb2RlLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgfSBhcyBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlO1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk6IFdlYmhvb2tzUXVlcnkpOiBQcm9taXNlPFdlYmhvb2tMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCBxdWVyeSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va0xpc3QpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBpZDogV2ViaG9va3NJZHMpOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsXG4gICAgaWQ6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICB0ZXN0ID0gZmFsc2UpOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQgfCBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlPiB7XG4gICAgaWYgKHRlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCwgJ3Rlc3QnKSwgeyB1cmwgfSlcbiAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rVGVzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgeyBpZCwgdXJsIH0pXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpLCB7IHVybCB9KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nKSA6IFByb21pc2U8V2ViaG9va1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQVBJRXJyb3JPcHRpb25zLCBBUElFcnJvclR5cGUgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUElFcnJvciBleHRlbmRzIEVycm9yIGltcGxlbWVudHMgQVBJRXJyb3JUeXBlIHtcbiAgcHVibGljIHN0YXR1czogbnVtYmVyIDtcbiAgcHVibGljIHN0YWNrOiBzdHJpbmc7XG4gIHB1YmxpYyBkZXRhaWxzOiBzdHJpbmc7XG4gIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHN0YXR1cyxcbiAgICBzdGF0dXNUZXh0LFxuICAgIG1lc3NhZ2UsXG4gICAgYm9keSA9IHt9XG4gIH06IEFQSUVycm9yT3B0aW9ucykge1xuICAgIGxldCBib2R5TWVzc2FnZSA9ICcnO1xuICAgIGxldCBlcnJvciA9ICcnO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGJvZHlNZXNzYWdlID0gYm9keTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keU1lc3NhZ2UgPSBib2R5Py5tZXNzYWdlIHx8ICcnO1xuICAgICAgZXJyb3IgPSBib2R5Py5lcnJvciB8fCAnJztcbiAgICB9XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IGVycm9yIHx8IHN0YXR1c1RleHQgfHwgJyc7XG4gICAgdGhpcy5kZXRhaWxzID0gYm9keU1lc3NhZ2U7XG4gICAgdGhpcy50eXBlID0gJ01haWxndW5BUElFcnJvcic7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IHsgQVBJRXJyb3JPcHRpb25zLCBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yJztcblxuY2xhc3MgRm9ybURhdGFCdWlsZGVyIHtcbiAgcHJpdmF0ZSBGb3JtRGF0YUNvbnN0cnVjdG9yOiBJbnB1dEZvcm1EYXRhO1xuICBjb25zdHJ1Y3RvcihGb3JtRGF0YUNvbnN0cnVjdG9yOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy5Gb3JtRGF0YUNvbnN0cnVjdG9yID0gRm9ybURhdGFDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVGb3JtRGF0YShkYXRhOiBhbnkpOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRhdGEgb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGZvcm1EYXRhOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSA9IE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGRhdGFba2V5XTsgfSlcbiAgICAgIC5yZWR1Y2UoKGZvcm1EYXRhQWNjOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSwga2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGVLZXlzID0gWydhdHRhY2htZW50JywgJ2lubGluZScsICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJ107XG4gICAgICAgIGlmIChmaWxlS2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgdGhpcy5hZGRGaWxlc1RvRkQoa2V5LCBkYXRhW2tleV0sIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5ID09PSAnbWVzc2FnZScpIHsgLy8gbWltZSBtZXNzYWdlXG4gICAgICAgICAgdGhpcy5hZGRNaW1lRGF0YVRvRkQoa2V5LCBkYXRhW2tleV0sIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZENvbW1vblByb3BlcnR5VG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICB9LCBuZXcgdGhpcy5Gb3JtRGF0YUNvbnN0cnVjdG9yKCkpO1xuICAgIHJldHVybiBmb3JtRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgaXNGb3JtRGF0YVBhY2thZ2UoZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEpXG4gIDogYm9vbGVhbiB7XG4gICAgcmV0dXJuICg8Tm9kZUZvcm1EYXRhPmZvcm1EYXRhSW5zdGFuY2UpLmdldEhlYWRlcnMgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXR0YWNobWVudE9wdGlvbnMoaXRlbToge1xuICAgIGZpbGVuYW1lPzogc3RyaW5nO1xuICAgIGNvbnRlbnRUeXBlPyA6IHN0cmluZztcbiAgICBrbm93bkxlbmd0aD86IG51bWJlcjtcbiAgfSk6IHtcbiAgICBmaWxlbmFtZT86IHN0cmluZyxcbiAgICBjb250ZW50VHlwZT86IHN0cmluZyxcbiAgICBrbm93bkxlbmd0aD86IG51bWJlclxuICB9IHtcbiAgICBpZiAodHlwZW9mIGl0ZW0gIT09ICdvYmplY3QnIHx8IHRoaXMuaXNTdHJlYW0oaXRlbSkpIHJldHVybiB7fTtcbiAgICBjb25zdCB7XG4gICAgICBmaWxlbmFtZSxcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAga25vd25MZW5ndGhcbiAgICB9ID0gaXRlbTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uKGZpbGVuYW1lID8geyBmaWxlbmFtZSB9IDogeyBmaWxlbmFtZTogJ2ZpbGUnIH0pLFxuICAgICAgLi4uKGNvbnRlbnRUeXBlICYmIHsgY29udGVudFR5cGUgfSksXG4gICAgICAuLi4oa25vd25MZW5ndGggJiYgeyBrbm93bkxlbmd0aCB9KVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFkZE1pbWVEYXRhVG9GRChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBkYXRhOiBCdWZmZXIgfCBCbG9iIHwgc3RyaW5nLFxuICAgIGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHsgLy8gaWYgc3RyaW5nIG9ubHkgdHdvIHBhcmFtZXRlcnMgc2hvdWxkIGJlIHVzZWQuXG4gICAgICBmb3JtRGF0YUluc3RhbmNlLmFwcGVuZChrZXksIGRhdGEgYXMgc3RyaW5nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YUluc3RhbmNlKSkgeyAvLyBmb3JtLWRhdGEgcGFja2FnZSBpcyB1c2VkXG4gICAgICBjb25zdCBub2RlRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlIGFzIE5vZGVGb3JtRGF0YTtcbiAgICAgIG5vZGVGb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhLCB7IGZpbGVuYW1lOiAnTWltZU1lc3NhZ2UnIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkKSB7IC8vIGVpdGhlciBub2RlID4gMTggb3IgYnJvd3NlclxuICAgICAgY29uc3QgYnJvd3NlckZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZSBhcyBGb3JtRGF0YTsgLy8gQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGFcbiAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YSwgJ01pbWVNZXNzYWdlJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJykgeyAvLyBub2RlIGVudmlyb25tZW50XG4gICAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgICBjb25zdCBibG9iSW5zdGFuY2UgPSBuZXcgQmxvYihbZGF0YV0pO1xuICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBibG9iSW5zdGFuY2UsICdNaW1lTWVzc2FnZScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICBzdGF0dXM6IDQwMCxcbiAgICAgIHN0YXR1c1RleHQ6IGBVbmtub3duIGRhdGEgdHlwZSBmb3IgJHtrZXl9IHByb3BlcnR5YCxcbiAgICAgIGJvZHk6ICdUaGUgbWltZSBkYXRhIHNob3VsZCBoYXZlIHR5cGUgb2YgQnVmZmVyLCBTdHJpbmcgb3IgQmxvYidcbiAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGFkZEZpbGVzVG9GRChcbiAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZyxcbiAgICB2YWx1ZTogYW55LFxuICAgIGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGFwcGVuZEZpbGVUb0ZEID0gKFxuICAgICAgb3JpZ2luYWxLZXk6IHN0cmluZyxcbiAgICAgIG9iajogYW55LFxuICAgICAgZm9ybURhdGE6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICAgKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBvcmlnaW5hbEtleSA9PT0gJ211bHRpcGxlVmFsaWRhdGlvbkZpbGUnID8gJ2ZpbGUnIDogb3JpZ2luYWxLZXk7XG4gICAgICBjb25zdCBpc1N0cmVhbURhdGEgPSB0aGlzLmlzU3RyZWFtKG9iaik7XG4gICAgICBjb25zdCBvYmpEYXRhID0gaXNTdHJlYW1EYXRhID8gb2JqIDogb2JqLmRhdGE7XG4gICAgICAvLyBnZXRBdHRhY2htZW50T3B0aW9ucyBzaG91bGQgYmUgY2FsbGVkIHdpdGggb2JqIHBhcmFtZXRlciB0byBwcmV2ZW50IGxvb3NpbmcgZmlsZW5hbWVcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldEF0dGFjaG1lbnRPcHRpb25zKG9iaik7XG4gICAgICBpZiAodHlwZW9mIG9iakRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIG9iakRhdGEgYXMgc3RyaW5nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YSkpIHtcbiAgICAgICAgY29uc3QgZmQgPSBmb3JtRGF0YSBhcyBOb2RlRm9ybURhdGE7XG4gICAgICAgIGZkLmFwcGVuZChrZXksIG9iakRhdGEsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkKSB7IC8vIGVpdGhlciBub2RlID4gMTggb3IgYnJvd3NlclxuICAgICAgICBjb25zdCBicm93c2VyRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlIGFzIEZvcm1EYXRhOyAvLyBCcm93c2VyIGNvbXBsaWFudCBGb3JtRGF0YVxuICAgICAgICBpZiAob2JqRGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgb2JqRGF0YSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJykgeyAvLyBub2RlIGVudmlyb25tZW50XG4gICAgICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmpEYXRhKSkge1xuICAgICAgICAgICAgY29uc3QgYmxvYkluc3RhbmNlID0gbmV3IEJsb2IoW29iakRhdGFdKTtcbiAgICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBibG9iSW5zdGFuY2UsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCBpdGVtLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBlbmRGaWxlVG9GRChwcm9wZXJ0eU5hbWUsIHZhbHVlLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzU3RyZWFtKGRhdGE6IGFueSkge1xuICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGRhdGEucGlwZSA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29tbW9uUHJvcGVydHlUb0ZEKFxuICAgIGtleTogc3RyaW5nLFxuICAgIHZhbHVlOiBhbnksXG4gICAgZm9ybURhdGFBY2M6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogYW55KSB7XG4gICAgICAgIGZvcm1EYXRhQWNjLmFwcGVuZChrZXksIGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBmb3JtRGF0YUFjYy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBGb3JtRGF0YUJ1aWxkZXI7XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvcic7XG5cbmltcG9ydCB7XG4gIFBhZ2VzTGlzdEFjY3VtdWxhdG9yLFxuICBQYXJzZWRQYWdlLFxuICBQYXJzZWRQYWdlc0xpc3QsXG4gIFF1ZXJ5V2l0aFBhZ2UsXG4gIFJlc3BvbnNlV2l0aFBhZ2luZyxcbiAgVXBkYXRlZFVybEFuZFF1ZXJ5LFxuICBBUElFcnJvck9wdGlvbnNcbn0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcbmltcG9ydCB7XG4gIElCb3VuY2UsXG4gIElDb21wbGFpbnQsXG4gIElVbnN1YnNjcmliZSxcbiAgSVdoaXRlTGlzdFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL1JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgU3VwcHJlc3Npb25EYXRhVHlwZVxufSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBOYXZpZ2F0aW9uVGhydVBhZ2VzIDxUPiB7XG4gIHJlcXVlc3Q/OiBSZXF1ZXN0O1xuICBjb25zdHJ1Y3RvcihyZXF1ZXN0PzogUmVxdWVzdCkge1xuICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZVBhZ2UoXG4gICAgaWQ6IHN0cmluZyxcbiAgICBwYWdlVXJsOiBzdHJpbmcsXG4gICAgdXJsU2VwYXJhdG9yOiBzdHJpbmcsXG4gICAgaXRlcmF0b3JOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgKSA6IFBhcnNlZFBhZ2Uge1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwocGFnZVVybCk7XG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IHBhcnNlZFVybDtcblxuICAgIGNvbnN0IHBhZ2VWYWx1ZSA9IHBhZ2VVcmwgJiYgdHlwZW9mIHBhZ2VVcmwgPT09ICdzdHJpbmcnID8gcGFnZVVybC5zcGxpdCh1cmxTZXBhcmF0b3IpLnBvcCgpIHx8ICcnIDogJyc7XG4gICAgbGV0IGl0ZXJhdG9yUG9zaXRpb24gPSBudWxsO1xuICAgIGlmIChpdGVyYXRvck5hbWUpIHtcbiAgICAgIGl0ZXJhdG9yUG9zaXRpb24gPSBzZWFyY2hQYXJhbXMuaGFzKGl0ZXJhdG9yTmFtZSlcbiAgICAgICAgPyBzZWFyY2hQYXJhbXMuZ2V0KGl0ZXJhdG9yTmFtZSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpZCxcbiAgICAgIHBhZ2U6IHVybFNlcGFyYXRvciA9PT0gJz8nID8gYD8ke3BhZ2VWYWx1ZX1gIDogcGFnZVZhbHVlLFxuICAgICAgaXRlcmF0b3JQb3NpdGlvbixcbiAgICAgIHVybDogcGFnZVVybFxuICAgIH0gYXMgUGFyc2VkUGFnZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZVBhZ2VMaW5rcyhcbiAgICByZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nLFxuICAgIHVybFNlcGFyYXRvcjogc3RyaW5nLFxuICAgIGl0ZXJhdG9yTmFtZT86IHN0cmluZ1xuICApOiBQYXJzZWRQYWdlc0xpc3Qge1xuICAgIGNvbnN0IHBhZ2VzID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuYm9keS5wYWdpbmcpO1xuICAgIHJldHVybiBwYWdlcy5yZWR1Y2UoXG4gICAgICAoYWNjOiBQYWdlc0xpc3RBY2N1bXVsYXRvciwgW2lkLCBwYWdlVXJsXTogWyBpZDogc3RyaW5nLCBwYWdlVXJsOiBzdHJpbmddKSA9PiB7XG4gICAgICAgIGFjY1tpZF0gPSB0aGlzLnBhcnNlUGFnZShpZCwgcGFnZVVybCwgdXJsU2VwYXJhdG9yLCBpdGVyYXRvck5hbWUpO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge31cbiAgICApIGFzIHVua25vd24gYXMgUGFyc2VkUGFnZXNMaXN0O1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVVcmxBbmRRdWVyeShjbGllbnRVcmw6IHN0cmluZywgcXVlcnk/OiBRdWVyeVdpdGhQYWdlKTogVXBkYXRlZFVybEFuZFF1ZXJ5IHtcbiAgICBsZXQgdXJsID0gY2xpZW50VXJsO1xuICAgIGNvbnN0IHF1ZXJ5Q29weSA9IHsgLi4ucXVlcnkgfTtcbiAgICBpZiAocXVlcnlDb3B5LnBhZ2UpIHtcbiAgICAgIHVybCA9IHVybGpvaW4oY2xpZW50VXJsLCBxdWVyeUNvcHkucGFnZSk7XG4gICAgICBkZWxldGUgcXVlcnlDb3B5LnBhZ2U7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB1cmwsXG4gICAgICB1cGRhdGVkUXVlcnk6IHF1ZXJ5Q29weVxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgcmVxdWVzdExpc3RXaXRoUGFnZXMoY2xpZW50VXJsOnN0cmluZywgcXVlcnk/OiBRdWVyeVdpdGhQYWdlLCBNb2RlbD86IHtcbiAgICBuZXcoZGF0YTogU3VwcHJlc3Npb25EYXRhVHlwZSk6XG4gICAgSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0XG4gIH0pOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCB7IHVybCwgdXBkYXRlZFF1ZXJ5IH0gPSB0aGlzLnVwZGF0ZVVybEFuZFF1ZXJ5KGNsaWVudFVybCwgcXVlcnkpO1xuICAgIGlmICh0aGlzLnJlcXVlc3QpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZVdpdGhQYWdpbmcgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHVybCwgdXBkYXRlZFF1ZXJ5KTtcbiAgICAgIC8vIE1vZGVsIGhlcmUgaXMgdXN1YWxseSB1bmRlZmluZWQgZXhjZXB0IGZvciBTdXBwcmVzc2lvbiBDbGllbnRcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSwgTW9kZWwpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgc3RhdHVzOiA1MDAsXG4gICAgICBzdGF0dXNUZXh0OiAnUmVxdWVzdCBwcm9wZXJ0eSBpcyBlbXB0eScsXG4gICAgICBib2R5OiB7IG1lc3NhZ2U6ICcnIH1cbiAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcGFyc2VMaXN0KHJlc3BvbnNlOiBSZXNwb25zZVdpdGhQYWdpbmcsIE1vZGVsPzoge1xuICAgIG5ldyhkYXRhOiBTdXBwcmVzc2lvbkRhdGFUeXBlKTpcbiAgICBJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3RcbiAgfSk6IFQ7XG59XG4iLCJpbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSAnYmFzZS02NCc7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgYXhpb3MsIHtcbiAgQXhpb3NFcnJvciwgQXhpb3NSZXNwb25zZSwgQXhpb3NIZWFkZXJzLCBSYXdBeGlvc1JlcXVlc3RIZWFkZXJzXG59IGZyb20gJ2F4aW9zJztcbmltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuaW1wb3J0IHtcbiAgT25DYWxsUmVxdWVzdE9wdGlvbnMsXG4gIFJlcXVlc3RPcHRpb25zLFxuICBBUElFcnJvck9wdGlvbnMsXG4gIElucHV0Rm9ybURhdGEsXG4gIEFQSVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5cbmltcG9ydCBGb3JtRGF0YUJ1aWxkZXIgZnJvbSAnLi9Gb3JtRGF0YUJ1aWxkZXInO1xuaW1wb3J0IHsgSXBQb29sRGVsZXRlRGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL0lQUG9vbHMnO1xuXG5jbGFzcyBSZXF1ZXN0IHtcbiAgcHJpdmF0ZSB1c2VybmFtZTogc3RyaW5nO1xuICBwcml2YXRlIGtleTogc3RyaW5nO1xuICBwcml2YXRlIHVybDogc3RyaW5nO1xuICBwcml2YXRlIHRpbWVvdXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBoZWFkZXJzOiBBeGlvc0hlYWRlcnM7XG4gIHByaXZhdGUgZm9ybURhdGFCdWlsZGVyOiBGb3JtRGF0YUJ1aWxkZXI7XG4gIHByaXZhdGUgbWF4Qm9keUxlbmd0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zLCBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIHRoaXMudXNlcm5hbWUgPSBvcHRpb25zLnVzZXJuYW1lO1xuICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXk7XG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCBhcyBzdHJpbmc7XG4gICAgdGhpcy50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0O1xuICAgIHRoaXMuaGVhZGVycyA9IHRoaXMubWFrZUhlYWRlcnNGcm9tT2JqZWN0KG9wdGlvbnMuaGVhZGVycyk7XG4gICAgdGhpcy5mb3JtRGF0YUJ1aWxkZXIgPSBuZXcgRm9ybURhdGFCdWlsZGVyKGZvcm1EYXRhKTtcbiAgICB0aGlzLm1heEJvZHlMZW5ndGggPSA1MjQyODgwMDsgLy8gNTAgTUJcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb25DYWxsT3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBvcHRpb25zOiBPbkNhbGxSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub25DYWxsT3B0aW9ucyB9O1xuICAgIGRlbGV0ZSBvcHRpb25zPy5oZWFkZXJzO1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gdGhpcy5qb2luQW5kVHJhbnNmb3JtSGVhZGVycyhvbkNhbGxPcHRpb25zKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLm9wdGlvbnMgfTtcblxuICAgIGlmIChvcHRpb25zPy5xdWVyeSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvcHRpb25zPy5xdWVyeSkubGVuZ3RoID4gMCkge1xuICAgICAgcGFyYW1zLnBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeSk7XG4gICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5ib2R5KSB7XG4gICAgICBjb25zdCBib2R5ID0gb3B0aW9ucz8uYm9keTtcbiAgICAgIHBhcmFtcy5kYXRhID0gYm9keTtcbiAgICAgIGRlbGV0ZSBwYXJhbXMuYm9keTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlO1xuICAgIGNvbnN0IHVybFZhbHVlID0gdXJsam9pbih0aGlzLnVybCwgdXJsKTtcblxuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6IG1ldGhvZC50b0xvY2FsZVVwcGVyQ2FzZSgpLFxuICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgIHVybDogdXJsVmFsdWUsXG4gICAgICAgIGhlYWRlcnM6IHJlcXVlc3RIZWFkZXJzLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgIG1heEJvZHlMZW5ndGg6IHRoaXMubWF4Qm9keUxlbmd0aFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICBjb25zdCBlcnJvclJlc3BvbnNlID0gZXJyIGFzIEF4aW9zRXJyb3I7XG5cbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgIHN0YXR1czogZXJyb3JSZXNwb25zZT8ucmVzcG9uc2U/LnN0YXR1cyB8fCA0MDAsXG4gICAgICAgIHN0YXR1c1RleHQ6IGVycm9yUmVzcG9uc2U/LnJlc3BvbnNlPy5zdGF0dXNUZXh0IHx8IGVycm9yUmVzcG9uc2UuY29kZSxcbiAgICAgICAgYm9keTogZXJyb3JSZXNwb25zZT8ucmVzcG9uc2U/LmRhdGEgfHwgZXJyb3JSZXNwb25zZS5tZXNzYWdlXG4gICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5nZXRSZXNwb25zZUJvZHkocmVzcG9uc2UpO1xuICAgIHJldHVybiByZXMgYXMgQVBJUmVzcG9uc2U7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldFJlc3BvbnNlQm9keShyZXNwb25zZTogQXhpb3NSZXNwb25zZSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXMgPSB7XG4gICAgICBib2R5OiB7fSxcbiAgICAgIHN0YXR1czogcmVzcG9uc2U/LnN0YXR1c1xuICAgIH0gYXMgQVBJUmVzcG9uc2U7XG5cbiAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSA9PT0gJ01haWxndW4gTWFnbmlmaWNlbnQgQVBJJykge1xuICAgICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgIHN0YXR1c1RleHQ6ICdJbmNvcnJlY3QgdXJsJyxcbiAgICAgICAgICBib2R5OiByZXNwb25zZS5kYXRhXG4gICAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHJlcy5ib2R5ID0ge1xuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5kYXRhXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMuYm9keSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwcml2YXRlIGpvaW5BbmRUcmFuc2Zvcm1IZWFkZXJzKFxuICAgIG9uQ2FsbE9wdGlvbnM/OiBPbkNhbGxSZXF1ZXN0T3B0aW9uc1xuICApOiBBeGlvc0hlYWRlcnMge1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gbmV3IEF4aW9zSGVhZGVycygpO1xuXG4gICAgY29uc3QgYmFzaWMgPSBiYXNlNjQuZW5jb2RlKGAke3RoaXMudXNlcm5hbWV9OiR7dGhpcy5rZXl9YCk7XG4gICAgcmVxdWVzdEhlYWRlcnMuc2V0QXV0aG9yaXphdGlvbihgQmFzaWMgJHtiYXNpY31gKTtcbiAgICByZXF1ZXN0SGVhZGVycy5zZXQodGhpcy5oZWFkZXJzKTtcblxuICAgIGNvbnN0IHJlY2VpdmVkT25DYWxsSGVhZGVycyA9IG9uQ2FsbE9wdGlvbnMgJiYgb25DYWxsT3B0aW9ucy5oZWFkZXJzO1xuICAgIGNvbnN0IG9uQ2FsbEhlYWRlcnMgPSB0aGlzLm1ha2VIZWFkZXJzRnJvbU9iamVjdChyZWNlaXZlZE9uQ2FsbEhlYWRlcnMpO1xuICAgIHJlcXVlc3RIZWFkZXJzLnNldChvbkNhbGxIZWFkZXJzKTtcbiAgICByZXR1cm4gcmVxdWVzdEhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIG1ha2VIZWFkZXJzRnJvbU9iamVjdChcbiAgICBoZWFkZXJzT2JqZWN0OiBSYXdBeGlvc1JlcXVlc3RIZWFkZXJzID0ge31cbiAgKTogQXhpb3NIZWFkZXJzIHtcbiAgICBsZXQgcmVxdWVzdEhlYWRlcnMgPSBuZXcgQXhpb3NIZWFkZXJzKCk7XG4gICAgcmVxdWVzdEhlYWRlcnMgPSBPYmplY3QuZW50cmllcyhoZWFkZXJzT2JqZWN0KS5yZWR1Y2UoXG4gICAgICAoaGVhZGVyc0FjY3VtdWxhdG9yOiBBeGlvc0hlYWRlcnMsIGN1cnJlbnRQYWlyKSA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGN1cnJlbnRQYWlyO1xuICAgICAgICBoZWFkZXJzQWNjdW11bGF0b3Iuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gaGVhZGVyc0FjY3VtdWxhdG9yO1xuICAgICAgfSwgcmVxdWVzdEhlYWRlcnNcbiAgICApO1xuICAgIHJldHVybiByZXF1ZXN0SGVhZGVycztcbiAgfVxuXG4gIHF1ZXJ5KFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIHF1ZXJ5PzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBBcnJheTxBcnJheTxzdHJpbmc+PixcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHsgcXVlcnksIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICBjb21tYW5kKFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+W10gfCBzdHJpbmcgfCBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSxcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gICAgYWRkRGVmYXVsdEhlYWRlcnMgPSB0cnVlXG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBsZXQgaGVhZGVycyA9IHt9O1xuICAgIGlmIChhZGREZWZhdWx0SGVhZGVycykge1xuICAgICAgaGVhZGVycyA9IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH07XG4gICAgfVxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgLi4uaGVhZGVycyxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgcmVxdWVzdE9wdGlvbnNcbiAgICApO1xuICB9XG5cbiAgZ2V0KFxuICAgIHVybDogc3RyaW5nLFxuICAgIHF1ZXJ5PzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBBcnJheTxBcnJheTxzdHJpbmc+PixcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5KCdnZXQnLCB1cmwsIHF1ZXJ5LCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3QoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncG9zdCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0V2l0aEZEKFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXVxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBwdXRXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBwYXRjaFdpdGhGRCh1cmw6IHN0cmluZywgZGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwYXRjaCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcHV0KHVybDogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBzdHJpbmcsIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcbiAgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZSh1cmw6IHN0cmluZywgZGF0YT86IElwUG9vbERlbGV0ZURhdGEpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgnZGVsZXRlJywgdXJsLCBkYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIiwiZXhwb3J0IGVudW0gUmVzb2x1dGlvbiB7XG4gICAgSE9VUiA9ICdob3VyJyxcbiAgICBEQVkgPSAnZGF5JyxcbiAgICBNT05USCA9ICdtb250aCdcbn1cblxuZXhwb3J0IGVudW0gU3VwcHJlc3Npb25Nb2RlbHMge1xuICAgIEJPVU5DRVMgPSAnYm91bmNlcycsXG4gICAgQ09NUExBSU5UUyA9ICdjb21wbGFpbnRzJyxcbiAgICBVTlNVQlNDUklCRVMgPSAndW5zdWJzY3JpYmVzJyxcbiAgICBXSElURUxJU1RTID0gJ3doaXRlbGlzdHMnXG59XG5cbmV4cG9ydCBlbnVtIFdlYmhvb2tzSWRzIHtcbiAgICBDTElDS0VEID0gJ2NsaWNrZWQnLFxuICAgIENPTVBMQUlORUQgPSAnY29tcGxhaW5lZCcsXG4gICAgREVMSVZFUkVEID0gJ2RlbGl2ZXJlZCcsXG4gICAgT1BFTkVEID0gJ29wZW5lZCcsXG4gICAgUEVSTUFORU5UX0ZBSUwgPSAncGVybWFuZW50X2ZhaWwnLFxuICAgIFRFTVBPUkFSWV9GQUlMID0gJ3RlbXBvcmFyeV9mYWlsJyxcbiAgICBVTlNVQlNDUklCRUQgPSAndW5zdWJzY3JpYmUnLFxufVxuXG5leHBvcnQgZW51bSBZZXNObyB7XG4gICAgWUVTID0gJ3llcycsXG4gICAgTk8gPSAnbm8nXG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIElMb2dnZXIge1xuICB3YXJuKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWRcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTG9nZ2VyJztcbiIsImltcG9ydCB7XG4gIERvbWFpbkNyZWRlbnRpYWxzLFxuICBEb21haW5DcmVkZW50aWFsc0xpc3QsXG4gIERvbWFpbkNyZWRlbnRpYWxzUXVlcnksXG4gIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0LFxuICBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpbkNyZWRlbnRpYWxzIHtcbiAgICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeTogRG9tYWluQ3JlZGVudGlhbHNRdWVyeSk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNMaXN0PlxuICAgIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogRG9tYWluQ3JlZGVudGlhbHNcbiAgICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PlxuICAgIHVwZGF0ZShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZyxcbiAgICAgICAgZGF0YTogVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG4gICAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD5cbiAgICBkZXN0cm95KFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD5cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHsgUmVzb2x1dGlvbiB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7XG4gIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdzSXRlbSxcbiAgRG9tYWluVGFnc0xpc3QsXG4gIERvbWFpblRhZ3NNZXNzYWdlUmVzLFxuICBEb21haW5UYWdzU3RhdGlzdGljUXVlcnksXG4gIERvbWFpblRhZ1N0YXRpc3RpY0l0ZW1cbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdCB7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBzdGFydDogRGF0ZTtcbiAgICBlbmQ6IERhdGU7XG4gICAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgICBzdGF0czogRG9tYWluVGFnU3RhdGlzdGljSXRlbVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5UYWdzQ2xpZW50IHtcbiAgICBsaXN0KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzTGlzdD5cbiAgICBnZXQoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzSXRlbT5cbiAgICB1cGRhdGUoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyxcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZ1xuICAgICk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+XG4gICAgZGVzdHJveShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz5cbiAgICBzdGF0aXN0aWMoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyxcbiAgICAgICAgcXVlcnk6IERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeVxuICAgICk6IFByb21pc2U8SURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdD5cbiAgICBjb3VudHJpZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbj5cbiAgICBwcm92aWRlcnMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbj5cbiAgICBkZXZpY2VzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uPlxufVxuIiwiaW1wb3J0IHtcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBEb21haW5UZW1wbGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlc1F1ZXJ5LFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGEsXG4gIERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGEsXG4gIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0LFxuICBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQsXG4gIE5vdGlmaWNhdGlvblJlc3VsdCxcbiAgU2hvcnRUZW1wbGF0ZVZlcnNpb24sXG4gIFRlbXBsYXRlUXVlcnksXG4gIFRlbXBsYXRlVmVyc2lvbixcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdFxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluVGVtcGxhdGUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbiAgICBjcmVhdGVkQnk6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHZlcnNpb24/OiBUZW1wbGF0ZVZlcnNpb247XG4gICAgdmVyc2lvbnM/OiBTaG9ydFRlbXBsYXRlVmVyc2lvbltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5UZW1wbGF0ZXNDbGllbnQge1xuICAgIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ+XG4gICAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgcXVlcnk/OiBUZW1wbGF0ZVF1ZXJ5KTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+XG4gICAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBEb21haW5UZW1wbGF0ZURhdGEpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT5cbiAgICB1cGRhdGUoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhXG4gICAgKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PlxuICAgIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PlxuICAgIGRlc3Ryb3lBbGwoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE5vdGlmaWNhdGlvblJlc3VsdD5cbiAgICBjcmVhdGVWZXJzaW9uKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGFcbiAgICApIDogUHJvbWlzZTxDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+XG4gICAgZ2V0VmVyc2lvbihkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+XG4gICAgdXBkYXRlVmVyc2lvbihcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyxcbiAgICAgICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YVxuICAgICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PlxuICAgIGRlc3Ryb3lWZXJzaW9uKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+XG4gICAgbGlzdFZlcnNpb25zKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0PlxufVxuIiwiaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuaW1wb3J0IHtcbiAgQ2xpY2tUcmFja2luZ0luZm8sXG4gIENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIERLSU1TZWxlY3RvckluZm8sXG4gIERvbWFpbkluZm8sXG4gIERvbWFpbnNRdWVyeSxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBEb21haW5VcGRhdGVJbmZvLFxuICBNZXNzYWdlUmVzcG9uc2UsXG4gIE9wZW5UcmFja2luZ0luZm8sXG4gIFJlcGxhY2VtZW50Rm9yUG9vbCxcbiAgVERvbWFpbixcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MsXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFVwZGF0ZWRPcGVuVHJhY2tpbmcsXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgV2ViUHJlZml4SW5mb1xufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcbmltcG9ydCB7IElEb21haW5DcmVkZW50aWFscyB9IGZyb20gJy4vRG9tYWluQ3JlZGVudGlhbHMnO1xuaW1wb3J0IHsgSURvbWFpblRhZ3NDbGllbnQgfSBmcm9tICcuL0RvbWFpblRhZ3MnO1xuaW1wb3J0IHsgSURvbWFpblRlbXBsYXRlc0NsaWVudCB9IGZyb20gJy4vRG9tYWluVGVtcGxhdGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluc0NsaWVudCB7XG4gICAgZG9tYWluQ3JlZGVudGlhbHM6IElEb21haW5DcmVkZW50aWFsc1xuICAgIGRvbWFpblRlbXBsYXRlczogSURvbWFpblRlbXBsYXRlc0NsaWVudFxuICAgIGRvbWFpblRhZ3M6IElEb21haW5UYWdzQ2xpZW50XG4gICAgbGlzdChxdWVyeT86IERvbWFpbnNRdWVyeSk6IFByb21pc2U8VERvbWFpbltdPlxuICAgIGdldChkb21haW46IHN0cmluZyk6IFByb21pc2U8VERvbWFpbj5cbiAgICBjcmVhdGUoZGF0YTogRG9tYWluSW5mbyk6IFByb21pc2U8VERvbWFpbj5cbiAgICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERvbWFpblVwZGF0ZUluZm8pOiBQcm9taXNlPFREb21haW4+XG4gICAgdmVyaWZ5KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxURG9tYWluPlxuICAgIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT5cbiAgICBnZXRDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxDb25uZWN0aW9uU2V0dGluZ3M+XG4gICAgdXBkYXRlQ29ubmVjdGlvbihkb21haW46IHN0cmluZywgZGF0YTogQ29ubmVjdGlvblNldHRpbmdzKTogUHJvbWlzZTxVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzPlxuICAgIGdldFRyYWNraW5nKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UcmFja2luZ0RhdGE+XG4gICAgdXBkYXRlVHJhY2tpbmcoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0eXBlOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IE9wZW5UcmFja2luZ0luZm8gfCBDbGlja1RyYWNraW5nSW5mbyB8IFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvXG4gICAgKTogUHJvbWlzZTxVcGRhdGVkT3BlblRyYWNraW5nPlxuICAgIGdldElwcyhkb21haW46IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+XG4gICAgYXNzaWduSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPlxuICAgIGRlbGV0ZUlwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgbGlua0lwUG9vbChkb21haW46IHN0cmluZywgcG9vbF9pZDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT5cbiAgICB1bmxpbmtJcFBvbGwoZG9tYWluOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBSZXBsYWNlbWVudEZvclBvb2wpOiBQcm9taXNlPEFQSVJlc3BvbnNlPlxuICAgIHVwZGF0ZURLSU1BdXRob3JpdHkoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERLSU1BdXRob3JpdHlJbmZvKTogUHJvbWlzZTxVcGRhdGVkREtJTUF1dGhvcml0eT5cbiAgICB1cGRhdGVES0lNU2VsZWN0b3IoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERLSU1TZWxlY3RvckluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNU2VsZWN0b3JSZXNwb25zZT5cbiAgICB1cGRhdGVXZWJQcmVmaXgoZG9tYWluOiBzdHJpbmcsIGRhdGE6IFdlYlByZWZpeEluZm8pOiBQcm9taXNlPFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZT5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vRG9tYWluQ3JlZGVudGlhbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UYWdzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGVtcGxhdGVzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluc0NsaWVudCc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuaW1wb3J0IHsgRXZlbnRzTGlzdCwgRXZlbnRzUXVlcnkgfSBmcm9tICcuLi8uLi9UeXBlcy9FdmVudHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElFdmVudENsaWVudCB7XG4gIGdldChkb21haW46IHN0cmluZywgcXVlcnk/OiBFdmVudHNRdWVyeSkgOiBQcm9taXNlPEV2ZW50c0xpc3Q+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lFdmVudENsaWVudCc7XG4iLCJpbXBvcnQge1xuICBJcFBvb2xDcmVhdGVEYXRhLCBJcFBvb2xDcmVhdGVSZXN1bHQsXG4gIElwUG9vbERlbGV0ZURhdGEsIElwUG9vbExpc3RSZXN1bHQsXG4gIElwUG9vbE1lc3NhZ2VSZXN1bHQsIElwUG9vbFVwZGF0ZURhdGFcbn0gZnJvbSAnLi4vLi4vVHlwZXMvSVBQb29scyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUlQUG9vbHNDbGllbnQge1xuICBsaXN0KCk6IFByb21pc2U8SXBQb29sTGlzdFJlc3VsdD5cbiAgY3JlYXRlKGRhdGE6IElwUG9vbENyZWF0ZURhdGEpOiBQcm9taXNlPElwUG9vbENyZWF0ZVJlc3VsdD5cbiAgdXBkYXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xVcGRhdGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PlxuICBkZWxldGUocG9vbElkOiBzdHJpbmcsIGRhdGE6IElwUG9vbERlbGV0ZURhdGEpOiBQcm9taXNlPElwUG9vbE1lc3NhZ2VSZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lJUFBvb2xzQ2xpZW50JztcbiIsImltcG9ydCB7IElwRGF0YSwgSVBzTGlzdFF1ZXJ5LCBJcHNMaXN0UmVzcG9uc2VCb2R5IH0gZnJvbSAnLi4vLi4vVHlwZXMvSVBzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSVBzQ2xpZW50IHtcbiAgbGlzdChxdWVyeTogSVBzTGlzdFF1ZXJ5KTogUHJvbWlzZTxJcHNMaXN0UmVzcG9uc2VCb2R5PlxuICBnZXQoaXA6IHN0cmluZyk6IFByb21pc2U8SXBEYXRhPlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JSVBzQ2xpZW50JztcbiIsImltcG9ydCB7IElXZWJIb29rc0NsaWVudCB9IGZyb20gJy4uL1dlYmhvb2tzJztcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHsgSURvbWFpbnNDbGllbnQgfSBmcm9tICcuLi9Eb21haW5zJztcbmltcG9ydCB7IElFdmVudENsaWVudCB9IGZyb20gJy4uL0V2ZW50Q2xpZW50JztcbmltcG9ydCB7IElTdGF0c0NsaWVudCB9IGZyb20gJy4uL1N0YXRzJztcbmltcG9ydCB7IElNZXNzYWdlc0NsaWVudCB9IGZyb20gJy4uL01lc3NhZ2VzJztcbmltcG9ydCB7IElTdXBwcmVzc2lvbkNsaWVudCB9IGZyb20gJy4uL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBJUm91dGVzQ2xpZW50IH0gZnJvbSAnLi4vUm91dGVzJztcbmltcG9ydCB7IElWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi4vVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgSUlQc0NsaWVudCB9IGZyb20gJy4uL0lQcyc7XG5pbXBvcnQgeyBJSVBQb29sc0NsaWVudCB9IGZyb20gJy4uL0lQUG9vbHMnO1xuaW1wb3J0IHsgSU1haWxpbmdMaXN0c0NsaWVudCB9IGZyb20gJy4uL01haWxpbmdMaXN0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1haWxndW5DbGllbnQge1xuICAgIGRvbWFpbnM6IElEb21haW5zQ2xpZW50O1xuICAgIHdlYmhvb2tzOiBJV2ViSG9va3NDbGllbnQ7XG4gICAgZXZlbnRzOiBJRXZlbnRDbGllbnQ7XG4gICAgc3RhdHM6IElTdGF0c0NsaWVudDtcbiAgICBzdXBwcmVzc2lvbnM6IElTdXBwcmVzc2lvbkNsaWVudDtcbiAgICBtZXNzYWdlczogSU1lc3NhZ2VzQ2xpZW50O1xuICAgIHJvdXRlczogSVJvdXRlc0NsaWVudDtcbiAgICB2YWxpZGF0ZTogSVZhbGlkYXRpb25DbGllbnQ7XG4gICAgaXBzOiBJSVBzQ2xpZW50O1xuICAgIGlwX3Bvb2xzOiBJSVBQb29sc0NsaWVudDtcbiAgICBsaXN0czogSU1haWxpbmdMaXN0c0NsaWVudDtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSU1haWxndW5DbGllbnQnO1xuIiwiaW1wb3J0IHtcbiAgTWFpbExpc3RNZW1iZXJzUXVlcnksXG4gIE1haWxMaXN0TWVtYmVyc1Jlc3VsdCxcbiAgTWFpbExpc3RNZW1iZXIsXG4gIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyxcbiAgTXVsdGlwbGVNZW1iZXJzRGF0YSxcbiAgTmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2UsXG4gIERlbGV0ZWRNZW1iZXJcbn0gZnJvbSAnLi4vLi4vVHlwZXMvTWFpbGluZ0xpc3RzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFpbExpc3RzTWVtYmVycyB7XG4gIGxpc3RNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIHF1ZXJ5PzogTWFpbExpc3RNZW1iZXJzUXVlcnlcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcnNSZXN1bHQ+O1xuXG4gIGdldE1lbWJlcihhZGRyZXNzOiBzdHJpbmcsIG1lbWJlckFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+LFxuICBjcmVhdGVNZW1iZXIoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4sXG4gIGNyZWF0ZU1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVNZW1iZXJzRGF0YSk6IFByb21pc2U8TmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2U+LFxuICB1cGRhdGVNZW1iZXIoXG4gICAgYWRkcmVzczogc3RyaW5nLFxuICAgIG1lbWJlckFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPixcbiAgZGVzdHJveU1lbWJlcihhZGRyZXNzOiBzdHJpbmcsIG1lbWJlckFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8RGVsZXRlZE1lbWJlcj5cbn1cbiIsImltcG9ydCB7XG4gIENyZWF0ZVVwZGF0ZUxpc3QsIERlc3Ryb3llZExpc3QsIExpc3RzUXVlcnksIE1haWxpbmdMaXN0LFxuICBNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQsIE1haWxpbmdMaXN0UmVzdWx0LFxuICBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQsIFN0YXJ0VmFsaWRhdGlvblJlc3VsdFxufSBmcm9tICcuLi8uLi9UeXBlcy9NYWlsaW5nTGlzdHMnO1xuaW1wb3J0IHsgSU1haWxMaXN0c01lbWJlcnMgfSBmcm9tICcuL01haWxpbmdMaXN0TWVtYmVycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1haWxpbmdMaXN0c0NsaWVudCB7XG4gIG1lbWJlcnM6IElNYWlsTGlzdHNNZW1iZXJzO1xuICBsaXN0KHF1ZXJ5PzogTGlzdHNRdWVyeSk6IFByb21pc2U8TWFpbGluZ0xpc3RSZXN1bHQ+XG4gIGdldChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3Q+XG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD5cbiAgdXBkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD5cbiAgZGVzdHJveShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8RGVzdHJveWVkTGlzdD5cbiAgdmFsaWRhdGUobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFN0YXJ0VmFsaWRhdGlvblJlc3VsdD5cbiAgdmFsaWRhdGlvblJlc3VsdChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0PlxuICBjYW5jZWxWYWxpZGF0aW9uKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0TWVtYmVycyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0c0NsaWVudCc7XG4iLCJpbXBvcnQgeyBNYWlsZ3VuTWVzc2FnZURhdGEsIE1lc3NhZ2VzU2VuZFJlc3VsdCB9IGZyb20gJy4uLy4uL1R5cGVzL01lc3NhZ2VzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZXNDbGllbnQge1xuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IE1haWxndW5NZXNzYWdlRGF0YSk6IFByb21pc2U8TWVzc2FnZXNTZW5kUmVzdWx0PlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JTWVzc2FnZXNDbGllbnQnO1xuIiwiaW1wb3J0IHtcbiAgQ3JlYXRlVXBkYXRlUm91dGVEYXRhLCBEZXN0cm95Um91dGVSZXNwb25zZSwgUm91dGUsIFJvdXRlc0xpc3RRdWVyeSwgVXBkYXRlUm91dGVSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9Sb3V0ZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSb3V0ZXNDbGllbnQge1xuICBsaXN0KHF1ZXJ5OiBSb3V0ZXNMaXN0UXVlcnkpOiBQcm9taXNlPFJvdXRlW10+XG4gIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxSb3V0ZT5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8Um91dGU+XG4gIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFVwZGF0ZVJvdXRlUmVzcG9uc2U+XG4gIGRlc3Ryb3koaWQ6IHN0cmluZyk6IFByb21pc2U8RGVzdHJveVJvdXRlUmVzcG9uc2U+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lSb3V0ZXNDbGllbnQnO1xuIiwiaW1wb3J0IHsgU3RhdHNRdWVyeSB9IGZyb20gJy4uLy4uL1R5cGVzL1N0YXRzJztcbmltcG9ydCB7IElTdGF0c0NvbnRhaW5lciB9IGZyb20gJy4vU3RhdHNDb250YWluZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0c0NsaWVudCB7XG4gIGdldERvbWFpbihkb21haW46IHN0cmluZywgcXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxJU3RhdHNDb250YWluZXI+XG4gIGdldEFjY291bnQocXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxJU3RhdHNDb250YWluZXI+XG59XG4iLCJpbXBvcnQgeyBTdGF0IH0gZnJvbSAnLi4vLi4vVHlwZXMvU3RhdHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0c0NvbnRhaW5lciB7XG4gICAgc3RhcnQ6IERhdGU7XG4gICAgZW5kOiBEYXRlO1xuICAgIHJlc29sdXRpb246IHN0cmluZztcbiAgICBzdGF0czogU3RhdFtdO1xuICB9XG4iLCJleHBvcnQgKiBmcm9tICcuL1N0YXRzQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vU3RhdHNDb250YWluZXInO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgaW50ZXJmYWNlIElCb3VuY2Uge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIHR5cGU6IHN0cmluZztcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29tcGxhaW50IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcbiAgICB0eXBlOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge1xuICBTdXBwcmVzc2lvbkxpc3QsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0LFxuICBTdXBwcmVzc2lvbkxpc3RRdWVyeSxcbiAgU3VwcHJlc3Npb25EZXN0cm95UmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBJQm91bmNlIH0gZnJvbSAnLi9Cb3VuY2UnO1xuaW1wb3J0IHsgSUNvbXBsYWludCB9IGZyb20gJy4vQ29tcGxhaW50JztcbmltcG9ydCB7IElVbnN1YnNjcmliZSB9IGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuaW1wb3J0IHsgSVdoaXRlTGlzdCB9IGZyb20gJy4vV2hpdGVMaXN0JztcblxuZXhwb3J0IGludGVyZmFjZSBJU3VwcHJlc3Npb25DbGllbnQge1xuICBsaXN0KGRvbWFpbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIHF1ZXJ5PzogU3VwcHJlc3Npb25MaXN0UXVlcnkpOiBQcm9taXNlPFN1cHByZXNzaW9uTGlzdD5cblxuICBnZXQoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdD5cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25EZXN0cm95UmVzdWx0PlxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgaW50ZXJmYWNlIElVbnN1YnNjcmliZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIHRhZ3M6IGFueTtcbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIHR5cGU6IHN0cmluZztcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgSVdoaXRlTGlzdCB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Cb3VuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9Db21wbGFpbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9VbnN1YnNjcmliZSc7XG5leHBvcnQgKiBmcm9tICcuL1doaXRlTGlzdCc7XG5leHBvcnQgKiBmcm9tICcuL0lTdXBwcmVzc2lvbnNDbGllbnQnO1xuIiwiaW1wb3J0IHtcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdCxcbiAgQ3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYixcbiAgQ2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeVxufSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB7XG4gIGxpc3QocXVlcnk/Ok11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnkpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PlxuICBnZXQobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdD5cbiAgY3JlYXRlKFxuICAgIGxpc3RJZDogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVxuICApOiBQcm9taXNlPENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+XG4gIGRlc3Ryb3kobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPlxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgeyBWYWxpZGF0aW9uUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4vTXVsdGlwbGVWYWxpZGF0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbkNsaWVudCB7XG4gIG11bHRpcGxlVmFsaWRhdGlvbjogSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudFxuICBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxWYWxpZGF0aW9uUmVzdWx0PlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NdWx0aXBsZVZhbGlkYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9uJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5pbXBvcnQgeyBXZWJob29rc0lkcyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7XG4gIFdlYmhvb2tMaXN0LFxuICBXZWJob29rUmVzdWx0LFxuICBXZWJob29rc1F1ZXJ5LFxuICBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL1dlYmhvb2tzJztcblxuZXhwb3J0IGludGVyZmFjZSBJV2ViSG9va3NDbGllbnQge1xuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeTogV2ViaG9va3NRdWVyeSk6IFByb21pc2U8V2ViaG9va0xpc3Q+XG4gIGdldChkb21haW46IHN0cmluZywgaWQ6IFdlYmhvb2tzSWRzKTogUHJvbWlzZTxXZWJob29rUmVzdWx0PlxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsXG4gICAgaWQ6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICB0ZXN0OiBib29sZWFuXG4gICk6IFByb21pc2U8V2ViaG9va1Jlc3VsdCB8IFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2U+XG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+XG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIGlkOiBzdHJpbmcpIDogUHJvbWlzZTxXZWJob29rUmVzdWx0PlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JV2ViSG9va3NDbGllbnQnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9Db21tb24nO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5zJztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGd1bkNsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0cyc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRzJztcbmV4cG9ydCAqIGZyb20gJy4vU3VwcHJlc3Npb25zJztcbmV4cG9ydCAqIGZyb20gJy4vVmFsaWRhdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9FdmVudENsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL1dlYmhvb2tzJztcbmV4cG9ydCAqIGZyb20gJy4vTWVzc2FnZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Sb3V0ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9JUHMnO1xuZXhwb3J0ICogZnJvbSAnLi9JUFBvb2xzJztcbiIsImV4cG9ydCB0eXBlIEFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IGFueTtcbn1cbiIsImV4cG9ydCB0eXBlIEFQSUVycm9yT3B0aW9ucyA9IHtcbiAgaGVhZGVycz86IHsgW2tleTogc3RyaW5nXTogdW5rbm93biB9O1xuICBzdGF0dXM6IG51bWJlcjtcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgYm9keToge1xuICAgIGVycm9yPzogc3RyaW5nLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmdcbiAgfTtcbiAgdXJsPzogc3RyaW5nO1xuICBzdGF0dXNUZXh0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBBUElFcnJvclR5cGUgPSB7XG4gIHN0YWNrOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGRldGFpbHM6IHN0cmluZztcbn1cbiIsImltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuXG5leHBvcnQgdHlwZSBGb3JtRGF0YU9wdGlvbnMgPSB7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgSW5wdXRGb3JtRGF0YSA9IHtcbiAgbmV3IChvcHRpb25zPzogSFRNTEZvcm1FbGVtZW50IHwgRm9ybURhdGFPcHRpb25zKTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGE7XG59XG4iLCJleHBvcnQgdHlwZSBQYWdlc0xpc3QgPSB7XG4gICAgcHJldmlvdXM6IHN0cmluZztcbiAgICBmaXJzdDogc3RyaW5nO1xuICAgIGxhc3Q6IHN0cmluZztcbiAgICBuZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFBhcnNlZFBhZ2UgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBwYWdlOiBzdHJpbmc7XG4gICAgaXRlcmF0b3JQb3NpdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIHVybDogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFBhcnNlZFBhZ2VzTGlzdCA9IHtcbiAgICBwcmV2aW91czogUGFyc2VkUGFnZTtcbiAgICBmaXJzdDogUGFyc2VkUGFnZTtcbiAgICBsYXN0OiBQYXJzZWRQYWdlO1xuICAgIG5leHQ6IFBhcnNlZFBhZ2U7XG59XG5cbmV4cG9ydCB0eXBlIFBhZ2VzTGlzdEFjY3VtdWxhdG9yID0ge1xuICAgIFtpbmRleDogc3RyaW5nXTogUGFyc2VkUGFnZTtcbn1cblxuZXhwb3J0IHR5cGUgUmVzcG9uc2VXaXRoUGFnaW5nID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3RcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5V2l0aFBhZ2UgPSB7XG4gICAgcGFnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZFVybEFuZFF1ZXJ5ID0ge1xuICAgIHVybDogc3RyaW5nO1xuICAgIHVwZGF0ZWRRdWVyeTogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG59XG4iLCJpbXBvcnQgeyBBeGlvc1JlcXVlc3RIZWFkZXJzLCBSYXdBeGlvc1JlcXVlc3RIZWFkZXJzIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgTWFpbGd1bkNsaWVudE9wdGlvbnMgfSBmcm9tICcuLi9NYWlsZ3VuQ2xpZW50JztcblxuZXhwb3J0IHR5cGUgT25DYWxsRW1wdHlIZWFkZXJzID0ge1xuICBba2V5OiBzdHJpbmddOiB1bmRlZmluZWQ7XG59XG5leHBvcnQgdHlwZSBSZXF1ZXN0T3B0aW9ucyA9IE1haWxndW5DbGllbnRPcHRpb25zICYge1xuICBoZWFkZXJzOiBBeGlvc1JlcXVlc3RIZWFkZXJzIHwgUmF3QXhpb3NSZXF1ZXN0SGVhZGVycztcbiAgdGltZW91dDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBPbkNhbGxSZXF1ZXN0T3B0aW9ucyA9IHtcbiAgdGltZW91dD86IG51bWJlcjtcbiAgaGVhZGVycz86IEF4aW9zUmVxdWVzdEhlYWRlcnMgfCBSYXdBeGlvc1JlcXVlc3RIZWFkZXJzO1xuICBxdWVyeT86IGFueTtcbiAgW2tleTogc3RyaW5nXTogdW5rbm93biB8IHVuZGVmaW5lZDtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vRXJyb3InO1xuZXhwb3J0ICogZnJvbSAnLi9BcGlSZXNwb25zZSc7XG5leHBvcnQgKiBmcm9tICcuL0Zvcm1EYXRhJztcbmV4cG9ydCAqIGZyb20gJy4vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5leHBvcnQgKiBmcm9tICcuL1JlcXVlc3RPcHRpb25zJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHNRdWVyeSA9IHtcbiAgICBsaW1pdDogbnVtYmVyO1xuICAgIHNraXA6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHMgPSB7XG4gICAgbG9naW46IHN0cmluZztcbiAgICBwYXNzd29yZDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFsc0l0ZW0gPSB7XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nLFxuICAgIGxvZ2luOiBzdHJpbmcsXG4gICAgbWFpbGJveDogc3RyaW5nLFxuICAgIHNpemVfYnl0ZXM6IG51bWJlciB8IG51bGxcbn1cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IERvbWFpbkNyZWRlbnRpYWxzSXRlbVtdO1xuICAgICAgICB0b3RhbF9jb3VudDogbnVtYmVyO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHNMaXN0ID0ge1xuICAgIGl0ZW1zOiBEb21haW5DcmVkZW50aWFsc0l0ZW1bXTtcbiAgICB0b3RhbENvdW50OiBudW1iZXI7XG59XG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcixcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgc3BlYz86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlZFVwZGF0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyLFxuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRGVsZXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXIsXG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIHNwZWM6IHN0cmluZztcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZURvbWFpbkNyZWRlbnRpYWxzRGF0YSA9IHtcbiAgICBwYXNzd29yZDogc3RyaW5nO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgeyBSZXNvbHV0aW9uIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzUXVlcnkgPSB7XG4gICAgbGltaXQ6IG51bWJlcjtcbiAgICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzU3RhdGlzdGljUXVlcnkgPSB7XG4gICAgZXZlbnQ6IHN0cmluZztcbiAgICBzdGFydD86IG51bWJlcjtcbiAgICBlbmQ/OiBudW1iZXI7XG4gICAgcmVzb2x1dGlvbj86IFJlc29sdXRpb247XG4gICAgZHVyYXRpb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NJdGVtSW5mbyA9IHtcbiAgICB0YWc6IHN0cmluZyxcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgICdmaXJzdC1zZWVuJzogc3RyaW5nLFxuICAgICdsYXN0LXNlZW4nOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc0l0ZW0gPSB7XG4gICAgdGFnOiBzdHJpbmcsXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgICAnZmlyc3Qtc2Vlbic6IERhdGUsXG4gICAgJ2xhc3Qtc2Vlbic6IERhdGVcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBEb21haW5UYWdzSXRlbUluZm9bXTtcbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3RcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NMaXN0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGl0ZW1zOiBEb21haW5UYWdzSXRlbVtdO1xuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NNZXNzYWdlUmVzID0ge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzdGF0dXM/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtID0ge1xuICAgIHRpbWU6c3RyaW5nXG4gICAgYWNjZXB0ZWQ/OiB7XG4gICAgICAgIGluY29taW5nOiBudW1iZXI7XG4gICAgICAgIG91dGdvaW5nOiBudW1iZXI7XG4gICAgICAgIHRvdGFsOiBudW1iZXJcbiAgICB9XG4gICAgZGVsaXZlcmVkPzoge1xuICAgICAgICBzbXRwOiBudW1iZXI7XG4gICAgICAgIGh0dHA6IG51bWJlcjtcbiAgICAgICAgb3B0aW1pemVkOiBudW1iZXI7XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfTtcbiAgICBvcGVuZWQ/OiB7XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfTtcbiAgICBmYWlsZWQ/OiB7XG4gICAgICAgIHRlbXBvcmFyeTp7XG4gICAgICAgICAgICBlc3BibG9jazogbnVtYmVyO1xuICAgICAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICAgICAgfTtcbiAgICAgICAgcGVybWFuZW50OiB7XG4gICAgICAgICAgICAnc3VwcHJlc3MtYm91bmNlJzogbnVtYmVyO1xuICAgICAgICAgICAgJ3N1cHByZXNzLXVuc3Vic2NyaWJlJzogbnVtYmVyO1xuICAgICAgICAgICAgJ3N1cHByZXNzLWNvbXBsYWludCc6IG51bWJlcjtcbiAgICAgICAgICAgIGJvdW5jZTogbnVtYmVyO1xuICAgICAgICAgICAgJ2RlbGF5ZWQtYm91bmNlJzogbnVtYmVyO1xuICAgICAgICAgICAgd2ViaG9vazogbnVtYmVyO1xuICAgICAgICAgICAgb3B0aW1pemVkOiBudW1iZXI7XG4gICAgICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgY2xpY2tlZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIHVuc3Vic2NyaWJlZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIGNvbXBsYWluZWQ/OiB7XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfTtcbiAgICBzdG9yZWQ/OiB7XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2UgPSB7XG4gICAgYm9keTp7XG4gICAgICAgIHRhZzogc3RyaW5nO1xuICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgICAgICBzdGFydDogc3RyaW5nO1xuICAgICAgICBlbmQ6IHN0cmluZztcbiAgICAgICAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgICAgICAgc3RhdHM6IERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtW107XG4gICAgfVxufVxuZXhwb3J0IHR5cGUgRG9tYWluVGFnU3RhdGlzdGljSXRlbSA9IE9taXQgPERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtLCAndGltZSc+ICYge1xuICAgIHRpbWU6IERhdGVcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICB0YWc6c3RyaW5nO1xuICAgICAgICBjb3VudHJ5OiB7XG4gICAgICAgICAgICBba2V5OnN0cmluZ106IHtcbiAgICAgICAgICAgICAgICBjbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgY29tcGxhaW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIG9wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuaXF1ZV9jbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5pcXVlX29wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlZDogbnVtYmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24gPSB7XG4gICAgdGFnOnN0cmluZztcbiAgICBjb3VudHJ5OiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHtcbiAgICAgICAgICAgIGNsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIGNvbXBsYWluZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIG9wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuaXF1ZV9vcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlZDogbnVtYmVyO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdQcm92aWRlcnNBUElSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIHRhZzpzdHJpbmc7XG4gICAgICAgIHByb3ZpZGVyOiB7XG4gICAgICAgICAgICBba2V5OnN0cmluZ106IHtcbiAgICAgICAgICAgICAgICBhY2NlcHRlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIGNsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bmlxdWVfb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbiA9IHtcbiAgICB0YWc6IHN0cmluZztcbiAgICBwcm92aWRlcjoge1xuICAgICAgICBba2V5OiBzdHJpbmddOiB7XG4gICAgICAgICAgICBhY2NlcHRlZDogbnVtYmVyO1xuICAgICAgICAgICAgY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgY29tcGxhaW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgZGVsaXZlcmVkOiBudW1iZXI7XG4gICAgICAgICAgICBvcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuaXF1ZV9jbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICB1bmlxdWVfb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICB1bnN1YnNjcmliZWQ6IG51bWJlcjtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIERldmljZVN0YXRpc3RpYyA9IHtcbiAgICBjbGlja2VkOiBudW1iZXI7XG4gICAgY29tcGxhaW5lZDogbnVtYmVyO1xuICAgIG9wZW5lZDogbnVtYmVyO1xuICAgIHVuaXF1ZV9jbGlja2VkOiBudW1iZXI7XG4gICAgdW5pcXVlX29wZW5lZDogbnVtYmVyO1xuICAgIHVuc3Vic2NyaWJlZDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBEZXZpY2VzVHlwZXMgPSB7XG4gICAgZGVza3RvcDogRGV2aWNlU3RhdGlzdGljO1xuICAgIG1vYmlsZTogRGV2aWNlU3RhdGlzdGljO1xuICAgIHRhYmxldDogRGV2aWNlU3RhdGlzdGljO1xuICAgIHVua25vd246IERldmljZVN0YXRpc3RpYztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgdGFnOnN0cmluZztcbiAgICAgICAgZGV2aWNlOiBEZXZpY2VzVHlwZXM7XG4gICAgfVxuICAgIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24gPSB7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgZGV2aWNlOiBEZXZpY2VzVHlwZXM7XG59XG4iLCJpbXBvcnQgeyBZZXNObyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IElEb21haW5UZW1wbGF0ZSB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5pbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgRG9tYWluVGVtcGxhdGVEYXRhID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHRlbXBsYXRlOiBzdHJpbmc7XG4gICAgdGFnPzogc3RyaW5nO1xuICAgIGVuZ2luZT86IHN0cmluZztcbiAgICBjb21tZW50Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhID0ge1xuICAgIHRlbXBsYXRlOiBzdHJpbmc7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgZW5naW5lPzogc3RyaW5nO1xuICAgIGNvbW1lbnQ/OiBzdHJpbmc7XG4gICAgYWN0aXZlPzogWWVzTm87XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YSA9IHtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhID0ge1xuICAgIHRlbXBsYXRlPzogc3RyaW5nO1xuICAgIGNvbW1lbnQ/OiBzdHJpbmc7XG4gICAgYWN0aXZlPzogWWVzTm87XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRlbXBsYXRlc1F1ZXJ5ID0ge1xuICAgIC8qKiAncGFnZScgKG9wdGlvbmFsbHkgJ3AnKSBwYXJhbXMgZnJvbSBwcmV2aW91cyByZXNwb25zZSdzICdwYWdpbmcnIG9iamVjdC5cbiAgICAgKiBWYWx1ZSBtdXN0IGJlIHN0cmluZ2lmaWVkIGFzIHF1ZXJ5IHBhcmFtcy4gRXg6ICc/cGFnZT1maXJzdCcsJz9wYWdlPW5leHQmcD1uYW1lLW9mLWxhc3QtaXRlbSdcbiAgICAgLi4uLiAqL1xuICAgIHBhZ2U/OiBgPyR7c3RyaW5nfWA7XG4gICAgLyoqIE51bWJlciBvZiByZWNvcmRzIHRvIHJldHJpZXZlLiBEZWZhdWx0IHZhbHVlIGlzIDEwLiAqL1xuICAgIGxpbWl0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBUZW1wbGF0ZVF1ZXJ5ID0ge1xuICAgIGFjdGl2ZTogWWVzTm87XG59XG5cbmV4cG9ydCB0eXBlIFNob3J0VGVtcGxhdGVWZXJzaW9uID0ge1xuICAgIHRhZzogc3RyaW5nO1xuICAgIGVuZ2luZTogc3RyaW5nO1xuICAgIG1qbWw6IHN0cmluZztcbiAgICBjcmVhdGVkQXQ6IHN0cmluZyB8IERhdGU7XG4gICAgY29tbWVudDogc3RyaW5nO1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBpZDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBUZW1wbGF0ZVZlcnNpb24gPSBTaG9ydFRlbXBsYXRlVmVyc2lvbiAmIHtcbiAgICB0ZW1wbGF0ZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICB0ZW1wbGF0ZTogSURvbWFpblRlbXBsYXRlO1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3REb21haW5UZW1wbGF0ZXNBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBJRG9tYWluVGVtcGxhdGVbXTtcbiAgICAgICAgcGFnaW5nOiB7XG4gICAgICAgICAgICBmaXJzdDogc3RyaW5nO1xuICAgICAgICAgICAgbGFzdDogc3RyaW5nO1xuICAgICAgICAgICAgbmV4dDogc3RyaW5nO1xuICAgICAgICAgICAgcHJldmlvdXM6IHN0cmluZztcbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0ID0ge1xuICAgICAgICBpdGVtczogSURvbWFpblRlbXBsYXRlW107XG4gICAgICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG4gICAgICAgIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgdGVtcGxhdGU6IElEb21haW5UZW1wbGF0ZTtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICBuYW1lOiBzdHJpbmdcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHRlbXBsYXRlTmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTm90aWZpY2F0aW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0ZW1wbGF0ZTogSURvbWFpblRlbXBsYXRlO1xufVxuXG5leHBvcnQgdHlwZSBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgICAgIHZlcnNpb246IHtcbiAgICAgICAgICAgICAgICB0YWc6IHN0cmluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nO1xuICAgIHRlbXBsYXRlVmVyc2lvbjoge1xuICAgICAgICB0YWc6IHN0cmluZztcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogc3RyaW5nO1xuICAgICAgICAgICAgY3JlYXRlZEJ5OiBzdHJpbmc7XG4gICAgICAgICAgICBpZDogc3RyaW5nO1xuICAgICAgICAgICAgdmVyc2lvbnM6IFNob3J0VGVtcGxhdGVWZXJzaW9uW11cbiAgICAgICAgfVxuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCA9IHtcbiAgICB0ZW1wbGF0ZTogSURvbWFpblRlbXBsYXRlO1xuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuZXhwb3J0IHR5cGUgRG9tYWluVHJhY2tpbmdEYXRhID0ge1xuICBjbGljazogeyBhY3RpdmU6IGJvb2xlYW4gfTtcbiAgb3BlbjogeyBhY3RpdmU6IGJvb2xlYW4gfTtcbiAgdW5zdWJzY3JpYmU6IHtcbiAgICBhY3RpdmU6IGJvb2xlYW47XG4gICAgaHRtbF9mb290ZXI6IHN0cmluZztcbiAgICB0ZXh0X2Zvb3Rlcjogc3RyaW5nO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRyYWNraW5nUmVzcG9uc2UgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBib2R5OiB7XG4gICAgdHJhY2tpbmc6IERvbWFpblRyYWNraW5nRGF0YVxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkT3BlblRyYWNraW5nID0ge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIG9wZW4/OiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuICBjbGljaz86IHsgYWN0aXZlOiBib29sZWFuIHwgJ2h0bWxvbmx5JyB9O1xuICB1bnN1YnNjcmliZT86IHtcbiAgICBhY3RpdmU6IGJvb2xlYW4sXG4gICAgaHRtbF9mb290ZXI6IHN0cmluZztcbiAgICB0ZXh0X2Zvb3Rlcjogc3RyaW5nO1xuICB9O1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlID0ge1xuICBzdGF0dXM6IG51bWJlcjtcbiAgYm9keTogVXBkYXRlZE9wZW5UcmFja2luZztcbn1cblxuZXhwb3J0IHR5cGUgT3BlblRyYWNraW5nSW5mbyA9IHtcbiAgYWN0aXZlOiAneWVzJyB8ICdubycgfCAndHJ1ZScgfCAnZmFsc2UnO1xufVxuZXhwb3J0IHR5cGUgQ2xpY2tUcmFja2luZ0luZm8gPSB7XG4gIGFjdGl2ZTogJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwgJ2ZhbHNlJyB8ICdodG1sb25seSc7XG59XG5cbmV4cG9ydCB0eXBlIFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvID0ge1xuICBhY3RpdmU6ICd5ZXMnIHwgJ25vJyB8ICd0cnVlJyB8ICdmYWxzZSc7XG4gIGh0bWxfZm9vdGVyOiBzdHJpbmc7XG4gIHRleHRfZm9vdGVyOiBzdHJpbmc7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIERvbWFpbnNRdWVyeSA9IHtcbiAgICBhdXRob3JpdHk/IDogc3RyaW5nO1xuICAgIHN0YXRlPzogJ2FjdGl2ZScgfCAndW52ZXJpZmllZCcgfCAnZGlzYWJsZWQnO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHNraXA/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblVwZGF0ZUluZm8gPSB7XG4gICAgc3BhbV9hY3Rpb24/OiAnZGlzYWJsZWQnIHwgJ2Jsb2NrJyB8ICd0YWcnO1xuICAgIHdlYl9zY2hlbWU/OiAnaHR0cCcgfCAnaHR0cHMnO1xuICAgIHdpbGRjYXJkPzogYm9vbGVhbiB8ICd0cnVlJyB8ICdmYWxzZSc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblVwZGF0ZUluZm9SZXEgPSBEb21haW5VcGRhdGVJbmZvICYge1xuICAgIHdpbGRjYXJkPzogJ3RydWUnIHwgJ2ZhbHNlJzsgLy8gYXBpIHN1cHBvcnRzIG9ubHkgc3RyaW5nc1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5JbmZvID0gRG9tYWluVXBkYXRlSW5mbyAmIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICAgIGZvcmNlX2RraW1fYXV0aG9yaXR5PzogYm9vbGVhbiB8ICd0cnVlJyB8ICdmYWxzZSc7XG4gICAgZGtpbV9rZXlfc2l6ZT86IDEwMjQgfCAyMDQ4O1xuICAgIGlwcz86ICcnO1xuICAgIHBvb2xfaWQ/OiAnJztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluSW5mb1JlcSA9IERvbWFpbkluZm8gJiB7XG4gICAgZm9yY2VfZGtpbV9hdXRob3JpdHk/OiAndHJ1ZScgfCAnZmFsc2UnO1xufVxuXG5leHBvcnQgdHlwZSBCb29sVG9TdHJpbmcgPSB7XG4gICAgZm9yY2VfZGtpbV9hdXRob3JpdHk/OiBEb21haW5JbmZvWydmb3JjZV9ka2ltX2F1dGhvcml0eSddO1xuICAgIHdpbGRjYXJkPzogRG9tYWluVXBkYXRlSW5mb1snd2lsZGNhcmQnXTtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluU2hvcnREYXRhID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICByZXF1aXJlX3RsczogYm9vbGVhbjtcbiAgICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgICBzdGF0ZTogc3RyaW5nO1xuICAgIHdpbGRjYXJkOiBib29sZWFuO1xuICAgIHNwYW1fYWN0aW9uOiBzdHJpbmc7XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICAgIHNtdHBfcGFzc3dvcmQ6IHN0cmluZztcbiAgICBzbXRwX2xvZ2luOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5EYXRhID0gRG9tYWluU2hvcnREYXRhICYge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgaXNfZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgd2ViX3ByZWZpeDogc3RyaW5nO1xuICAgIHdlYl9zY2hlbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb21haW5zTGlzdEl0ZW0gZXh0ZW5kcyBEb21haW5TaG9ydERhdGF7XG4gICAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBudWxsO1xuICAgIHNlbmRpbmdfZG5zX3JlY29yZHM6IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRE5TUmVjb3JkIHtcbiAgICBjYWNoZWQ6IGFueVtdO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICByZWNvcmRfdHlwZTogc3RyaW5nO1xuICAgIHZhbGlkOiBzdHJpbmc7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBwcmlvcml0eT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluUmVzcG9uc2VEYXRhID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgZG9tYWluOiBEb21haW5EYXRhO1xuICAgICAgICBtZXNzYWdlPzogc3RyaW5nO1xuICAgICAgICByZWNlaXZpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdO1xuICAgICAgICBzZW5kaW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXTtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkxpc3RSZXNwb25zZURhdGEgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogRG9tYWluc0xpc3RJdGVtW10gfCBudWxsO1xuICAgICAgICB0b3RhbF9jb3VudDogbnVtYmVyO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTWVzc2FnZVJlc3BvbnNlID0ge1xuICAgIG1lc3NhZ2UgOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgRGVzdHJveWVkRG9tYWluUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keTogTWVzc2FnZVJlc3BvbnNlXG59XG5cbmV4cG9ydCB0eXBlIENvbm5lY3Rpb25TZXR0aW5ncyA9IHtcbiAgICByZXF1aXJlX3RsczogYm9vbGVhbjtcbiAgICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbn1cbmV4cG9ydCB0eXBlIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgY29ubmVjdGlvbjogQ29ubmVjdGlvblNldHRpbmdzXG4gICAgfVxuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MgPSB7XG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHJlcXVpcmVfdGxzOiBib29sZWFuLFxuICAgIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMgPSB7XG4gICAgYm9keTogVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBES0lNQXV0aG9yaXR5SW5mbyA9IHtcbiAgICBzZWxmOiBib29sZWFuIHwgJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwnZmFsc2UnXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRES0lNQXV0aG9yaXR5ID0ge1xuICAgIGNoYW5nZWQ6IGJvb2xlYW4sXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UgPSB7XG4gICAgYm9keTogVXBkYXRlZERLSU1BdXRob3JpdHksXG4gICAgc3RhdHVzOiAyMDBcbn1cblxuZXhwb3J0IHR5cGUgREtJTVNlbGVjdG9ySW5mbyA9IHtcbiAgICBka2ltU2VsZWN0b3I6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UgPSB7XG4gICAgYm9keTpNZXNzYWdlUmVzcG9uc2UsXG4gICAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgV2ViUHJlZml4SW5mbyA9IHtcbiAgICB3ZWJQcmVmaXg6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkV2ViUHJlZml4ID0ge1xuICAgIG1lc3NhZ2UgOiBzdHJpbmdcbn1cbmV4cG9ydCB0eXBlIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSA9IHtcbiAgICBib2R5Ok1lc3NhZ2VSZXNwb25zZSxcbiAgICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBSZXBsYWNlbWVudEZvclBvb2wgPSB7XG4gICAgcG9vbF9pZD86IHN0cmluZztcbiAgICBpcD86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgVERvbWFpbiA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICByZXF1aXJlX3RsczogYm9vbGVhbjtcbiAgc2tpcF92ZXJpZmljYXRpb246IGJvb2xlYW47XG4gIHN0YXRlOiBzdHJpbmc7XG4gIHdpbGRjYXJkOiBib29sZWFuO1xuICBzcGFtX2FjdGlvbjogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIHNtdHBfcGFzc3dvcmQ6IHN0cmluZztcbiAgc210cF9sb2dpbjogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHJlY2VpdmluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuICBzZW5kaW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIGlkPzogc3RyaW5nO1xuICBpc19kaXNhYmxlZD86IGJvb2xlYW47XG4gIHdlYl9wcmVmaXg/OiBzdHJpbmc7XG4gIHdlYl9zY2hlbWU/OiBzdHJpbmc7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0RvbWFpbkNyZWRlbnRpYWxzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWlucyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRhZ3MnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UZW1wbGF0ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UcmFja2luZyc7XG4iLCJpbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbmV4cG9ydCB0eXBlIEV2ZW50c1BhZ2UgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBudW1iZXI6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRmlsdGVyRmllbGQgPSB7XG4gICAgZXZlbnQ/OiBzdHJpbmc7XG4gICAgbGlzdD86IHN0cmluZztcbiAgICBhdHRhY2htZW50Pzogc3RyaW5nO1xuICAgIGZyb20/OiBzdHJpbmc7XG4gICAgJ21lc3NhZ2UtaWQnPzogc3RyaW5nO1xuICAgIHN1YmplY3Q/OiBzdHJpbmc7XG4gICAgdG8/OiBzdHJpbmc7XG4gICAgc2l6ZT86IHN0cmluZztcbiAgICByZWNpcGllbnQ/OiBzdHJpbmc7XG4gICAgcmVjaXBpZW50cz86IHN0cmluZztcbiAgICB0YWdzPzogc3RyaW5nO1xuICAgIHNldmVyaXR5Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBFdmVudHNRdWVyeSA9IEZpbHRlckZpZWxkICYge1xuICAgIHBhZ2U/OiBzdHJpbmc7XG4gICAgYmVnaW4/OiBzdHJpbmc7XG4gICAgZW5kPzogc3RyaW5nO1xuICAgIGFzY2VuZGluZz86ICd5ZXMnfCAnbm8nO1xuICAgIGxpbWl0PzogbnVtYmVyO1xufVxuZXhwb3J0IHR5cGUgRXZlbnRzUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogW107XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICAgIH0sXG4gICAgc3RhdHVzOiBudW1iZXJcbn1cbmV4cG9ydCB0eXBlIERvbWFpbkV2ZW50ID0ge1xuICAgIHNldmVyaXR5OiBzdHJpbmc7XG4gICAgdGFnczogc3RyaW5nW107XG4gICAgc3RvcmFnZToge1xuICAgICAgICB1cmw6IHN0cmluZztcbiAgICAgICAga2V5OiBzdHJpbmdcbiAgICB9O1xuICAgICdkZWxpdmVyeS1zdGF0dXMnOiB7XG4gICAgICAgIHRsczogYm9vbGVhbjtcbiAgICAgICAgJ214LWhvc3QnOiBzdHJpbmc7XG4gICAgICAgIGNvZGU6IG51bWJlcjtcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICAgICAgJ3Nlc3Npb24tc2Vjb25kcyc6IG51bWJlcjtcbiAgICAgICAgdXRmODogYm9vbGVhbjtcbiAgICAgICAgJ2F0dGVtcHQtbm8nOiBudW1iZXI7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgJ2NlcnRpZmljYXRlLXZlcmlmaWVkJzogYm9vbGVhblxuICAgIH07XG4gICAgJ3JlY2lwaWVudC1kb21haW4nOiBzdHJpbmc7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjYW1wYWlnbnM6IFtdO1xuICAgIHJlYXNvbjogc3RyaW5nO1xuICAgICd1c2VyLXZhcmlhYmxlcyc6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgICB9O1xuICAgIGZsYWdzOiB7XG4gICAgICAgICdpcy1yb3V0ZWQnOiBib29sZWFuO1xuICAgICAgICAnaXMtYXV0aGVudGljYXRlZCc6IGJvb2xlYW47XG4gICAgICAgICdpcy1zeXN0ZW0tdGVzdCc6IGJvb2xlYW47XG4gICAgICAgICdpcy10ZXN0LW1vZGUnOiBib29sZWFuXG4gICAgfTtcbiAgICAnbG9nLWxldmVsJyA6IHN0cmluZztcbiAgICB0ZW1wbGF0ZT86IHVua25vd247XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gICAgZW52ZWxvcGU6IHtcbiAgICAgICAgdHJhbnNwb3J0OiBzdHJpbmc7XG4gICAgICAgIHNlbmRlcjogc3RyaW5nO1xuICAgICAgICAnc2VuZGluZy1pcCc6IHN0cmluZztcbiAgICAgICAgdGFyZ2V0czogc3RyaW5nXG4gICAgfTtcbiAgICBtZXNzYWdlOiB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIHRvOiBzdHJpbmc7XG4gICAgICAgICAgICAnbWVzc2FnZS1pZCc6IHN0cmluZztcbiAgICAgICAgICAgIGZyb206IHN0cmluZztcbiAgICAgICAgICAgIHN1YmplY3Q6IHN0cmluZ1xuICAgICAgICB9O1xuICAgICAgICBhdHRhY2htZW50czogW107XG4gICAgICAgIHNpemU6IDMwOFxuICAgIH07XG4gICAgcmVjaXBpZW50OiBzdHJpbmc7XG4gICAgZXZlbnQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRXZlbnRzTGlzdCA9IHtcbiAgICBpdGVtczogRG9tYWluRXZlbnRbXTtcbiAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xuICAgIHN0YXR1czogbnVtYmVyO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9FdmVudHMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBJcFBvb2wgPSB7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGlwczogc3RyaW5nW107XG4gIGlzX2xpbmtlZDogYm9vbGVhbjtcbiAgbmFtZTogc3RyaW5nO1xuICBwb29sX2lkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbExpc3RSZXNwb25zZSA9IHtcbiAgYm9keToge1xuICAgIGlwX3Bvb2xzOiBJcFBvb2wsXG4gICAgbWVzc2FnZTogc3RyaW5nXG4gIH0sXG4gIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbExpc3RSZXN1bHQgPSB7XG4gIGlwX3Bvb2xzOiBJcFBvb2wsXG4gIG1lc3NhZ2U6IHN0cmluZyxcbiAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sVXBkYXRlRGF0YSA9IHtcbiAgbmFtZTogc3RyaW5nLFxuICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICBpcHM6IHN0cmluZ1tdXG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IHtcbiAgYm9keToge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sTWVzc2FnZVJlc3VsdCA9IHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sRGVsZXRlRGF0YSA9IHtcbiAgaXA/OiBzdHJpbmcsXG4gIHBvb2xfaWQ/OiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sQ3JlYXRlRGF0YSA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgaXBzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbENyZWF0ZVJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHBvb2xfaWQ6IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xDcmVhdGVSZXN1bHQgPSB7XG4gIHN0YXR1czogbnVtYmVyXG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgcG9vbF9pZDogc3RyaW5nO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JcFBvb2xzJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgSXBzTGlzdFJlc3BvbnNlQm9keSA9IHtcbiAgYXNzaWduYWJsZV90b19wb29sczogYm9vbGVhbjtcbiAgaXRlbXM6IHN0cmluZ1tdO1xuICB0b3RhbF9jb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJcERhdGEgPSB7XG4gIGlwOiBzdHJpbmc7XG4gIGRlZGljYXRlZDogYm9vbGVhbjtcbiAgcmRuczogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBJUHNMaXN0UXVlcnkgPSB7XG4gIGRlZGljYXRlZDogYm9vbGVhbiB8IHN0cmluZ1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JUHMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBNYWlsZ3VuQ2xpZW50T3B0aW9ucyA9IHtcbiAgdXNlcm5hbWU6IHN0cmluZztcbiAga2V5OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgcHVibGljX2tleT86IHN0cmluZztcbiAgdGltZW91dD86IG51bWJlcjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTWFpbGd1bkNsaWVudE9wdGlvbnMnO1xuIiwiaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuaW1wb3J0IHsgTWFpbGluZ0xpc3QgfSBmcm9tICcuL01haWxpbmdMaXN0cyc7XG5cbmV4cG9ydCB0eXBlIE1haWxMaXN0TWVtYmVyID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc3Vic2NyaWJlZDogYm9vbGVhbixcbiAgICB2YXJzOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHVua25vd25cbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBNYWlsTGlzdE1lbWJlcnNRdWVyeSA9IHtcbiAgICBzdWJzY3JpYmVkPzogJ3llcycgfCAnbm8nO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlTWVtYmVyc0RhdGEgPSB7XG4gICAgbWVtYmVyczogQXJyYXk8TWFpbExpc3RNZW1iZXI+O1xuICAgIHVwc2VydDogJ3llcycgfCAnbm8nO1xufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhID0ge1xuICAgIG1lbWJlcnM6IHN0cmluZztcbiAgICB1cHNlcnQ6ICd5ZXMnIHwgJ25vJztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHZhcnM/OiBzdHJpbmc7XG4gICAgc3Vic2NyaWJlZD86ICd5ZXMnIHwgJ25vJyB8IGJvb2xlYW47XG4gICAgdXBzZXJ0PzogJ3llcycgfCAnbm8nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXEgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdmFycz86IHN0cmluZztcbiAgICBzdWJzY3JpYmVkPzogJ3llcycgfCAnbm8nIHwgYm9vbGVhbjtcbiAgICB1cHNlcnQ/OiAneWVzJyB8ICdubyc7XG59XG5cbmV4cG9ydCB0eXBlIERlbGV0ZWRNZW1iZXIgPSB7XG4gICAgbWVtYmVyOiB7XG4gICAgICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICB9LFxuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgfVxuXG5leHBvcnQgdHlwZSBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSA9IHtcbiAgICBsaXN0OiBNYWlsaW5nTGlzdDtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgJ3Rhc2staWQnOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE1haWxMaXN0TWVtYmVyc1Jlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IE1haWxMaXN0TWVtYmVyW11cbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3RcbiAgICB9LFxuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIE1haWxMaXN0TWVtYmVyc1Jlc3VsdCA9IHtcbiAgICBpdGVtczogTWFpbExpc3RNZW1iZXJbXVxuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3RcbiAgICBzdGF0dXM6IG51bWJlclxufVxuIiwiaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIExpc3RzUXVlcnkgPSB7XG4gICAgYWRkcmVzcz86IHN0cmluZztcbiAgICBsaW1pdD86IG51bWJlcjtcbiAgICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVVcGRhdGVMaXN0ID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIGFjY2Vzc19sZXZlbD86ICdyZWFkb25seScgfCAnbWVtYmVycyd8ICdldmVyeW9uZSc7XG4gICAgcmVwbHlfcHJlZmVyZW5jZT86ICdsaXN0JyB8ICdzZW5kZXInO1xufVxuXG5leHBvcnQgdHlwZSBEZXN0cm95ZWRMaXN0ID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFN0YXJ0VmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBpZDogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgZG93bmxvYWRfdXJsOiB7XG4gICAgICBjc3Y6IHN0cmluZztcbiAgICAgIGpzb246IHN0cmluZ1xuICAgIH07XG4gICAgaWQ6IHN0cmluZztcbiAgICBxdWFudGl0eTogbnVtYmVyO1xuICAgIHJlY29yZHNfcHJvY2Vzc2VkOiBudW1iZXI7XG4gICAgc3VtbWFyeToge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGNhdGNoX2FsbDogbnVtYmVyO1xuICAgICAgICBkZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICBkb19ub3Rfc2VuZDogbnVtYmVyO1xuICAgICAgICB1bmRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgIHVua25vd246IG51bWJlclxuICAgICAgfVxuICAgICAgcmlzazoge1xuICAgICAgICBoaWdoOiBudW1iZXI7XG4gICAgICAgIGxvdzogbnVtYmVyO1xuICAgICAgICBtZWRpdW06IG51bWJlcjtcbiAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0VmFsaWRhdGlvbkFwaVJlc3BvbnNlID0gTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzcG9uc2UgJiB7XG4gICAgY3JlYXRlZF9hdDogbnVtYmVyO1xufVxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0RGF0YSA9IE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3BvbnNlICYge1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG59XG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgdmFsaWRhdGlvblJlc3VsdDogTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0RGF0YTtcbn1cblxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0ID0ge1xuICAgIGFjY2Vzc19sZXZlbDogc3RyaW5nO1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBtZW1iZXJzX2NvdW50OiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJlcGx5X3ByZWZlcmVuY2U6IG51bGwgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0UmVzdWx0ID0ge1xuICAgIGl0ZW1zOiBNYWlsaW5nTGlzdFtdO1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Rcbn1cblxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RBcGlSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBNYWlsaW5nTGlzdFtdO1xuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgICB9XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0TWVtYmVycyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0cyc7XG4iLCIvKipcbiAqIEVuc3VyZXMgdGhlIG9iamVjdCBoYXMgbGVhc3Qgb25lIGtleSBwcmVzZW50IGFuZCBub3QgdW5kZWZpbmVkXG4gKlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ5NzI1MTk4fVxuICovXG5leHBvcnQgdHlwZSBBdExlYXN0T25lS2V5UHJlc2VudDxcbiAgT2JqZWN0XyxcbiAgS2V5cyBleHRlbmRzIGtleW9mIE9iamVjdF8gPSBrZXlvZiBPYmplY3RfXG4+ID0gUGljazxPYmplY3RfLCBFeGNsdWRlPGtleW9mIE9iamVjdF8sIEtleXM+PiAmXG4gIHtcbiAgICBbSyBpbiBLZXlzXS0/OiBSZXF1aXJlZDxQaWNrPE9iamVjdF8sIEs+PiAmXG4gICAgICBQYXJ0aWFsPFBpY2s8T2JqZWN0XywgRXhjbHVkZTxLZXlzLCBLPj4+O1xuICB9W0tleXNdO1xuXG5leHBvcnQgdHlwZSBNYWlsZ3VuTWVzc2FnZUNvbnRlbnQgPSBBdExlYXN0T25lS2V5UHJlc2VudDx7XG4gICAgLyoqXG4gICAgICogQm9keSBvZiB0aGUgbWVzc2FnZS4gKHRleHQgdmVyc2lvbilcbiAgICAgKi9cbiAgICB0ZXh0Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQm9keSBvZiB0aGUgbWVzc2FnZS4gKEhUTUwgdmVyc2lvbilcbiAgICAgKi9cbiAgICBodG1sPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEJvZHkgb2YgdGhlIG1lc3NhZ2UuIChNSU1FIHZlcnNpb24pXG4gICAgICovXG4gICAgbWVzc2FnZT86IHN0cmluZyB8IEJ1ZmZlciB8IEJsb2I7XG4gICAgIC8qKlxuICAgICAqIE5hbWUgb2YgYSB0ZW1wbGF0ZSBzdG9yZWQgdmlhIFt0ZW1wbGF0ZSBBUEldKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvYXBpLXRlbXBsYXRlcy5odG1sI2FwaS10ZW1wbGF0ZXMpLiBTZWUgW1RlbXBsYXRlc10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI3RlbXBsYXRpbmcpIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gICAgICovXG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7XG59PjtcblxuZXhwb3J0IHR5cGUgTWFpbGd1bk1lc3NhZ2VEYXRhID0gTWFpbGd1bk1lc3NhZ2VDb250ZW50ICYge1xuICAgIC8qKlxuICAgICAqIEVtYWlsIGFkZHJlc3MgZm9yIGBGcm9tYCBoZWFkZXJcbiAgICAgKi9cbiAgICBmcm9tPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRW1haWwgYWRkcmVzcyBvZiB0aGUgcmVjaXBpZW50KHMpLlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYEJvYiA8Ym9iQGhvc3QuY29tPmAuIFlvdSBjYW4gdXNlIGNvbW1hcyB0byBzZXBhcmF0ZSBtdWx0aXBsZSByZWNpcGllbnRzLlxuICAgICAqL1xuICAgIHRvPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIGBUb2AgYnV0IGZvciBgY2FyYm9uIGNvcHlgXG4gICAgICovXG4gICAgY2M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIFNhbWUgYXMgYFRvYCBidXQgZm9yIGBibGluZCBjYXJib24gY29weWBcbiAgICAgKi9cbiAgICBiY2M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIE1lc3NhZ2Ugc3ViamVjdFxuICAgICAqL1xuICAgIHN1YmplY3Q/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBbQU1QXShodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9nbWFpbC9hbXBlbWFpbC8pIHBhcnQgb2YgdGhlIG1lc3NhZ2UuIFBsZWFzZSBmb2xsb3cgZ29vZ2xlIGd1aWRlbGluZXMgdG8gY29tcG9zZSBhbmQgc2VuZCBBTVAgZW1haWxzLlxuICAgICAqL1xuICAgICdhbXAtaHRtbCc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBGaWxlIGF0dGFjaG1lbnQuIFlvdSBjYW4gcG9zdCBtdWx0aXBsZSBgYXR0YWNobWVudGAgdmFsdWVzLlxuICAgICAqXG4gICAgICogKipJbXBvcnRhbnQ6KiogWW91IG11c3QgdXNlIGBtdWx0aXBhcnQvZm9ybS1kYXRhYCBlbmNvZGluZyB3aGVuIHNlbmRpbmcgYXR0YWNobWVudHMuXG4gICAgICovXG4gICAgYXR0YWNobWVudD86IGFueTtcblxuICAgIC8qKlxuICAgICAqIEF0dGFjaG1lbnQgd2l0aCBgaW5saW5lYCBkaXNwb3NpdGlvbi4gQ2FuIGJlIHVzZWQgdG8gc2VuZCBpbmxpbmUgaW1hZ2VzIChzZWUgZXhhbXBsZSkuXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIHBvc3QgbXVsdGlwbGUgYGlubGluZWAgdmFsdWVzLlxuICAgICAqL1xuICAgIGlubGluZT86IGFueTtcblxuICAgIC8qKlxuICAgICAqIFVzZSB0aGlzIHBhcmFtZXRlciB0byBzZW5kIGEgbWVzc2FnZSB0byBzcGVjaWZpYyB2ZXJzaW9uIG9mIGEgdGVtcGxhdGVcbiAgICAgKi9cbiAgICAndDp2ZXJzaW9uJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFBhc3MgYHllc2AgaWYgeW91IHdhbnQgdG8gaGF2ZSByZW5kZXJlZCB0ZW1wbGF0ZVxuICAgICAqIGluIHRoZSB0ZXh0IHBhcnQgb2YgdGhlIG1lc3NhZ2UgaW4gY2FzZSBvZiB0ZW1wbGF0ZSBzZW5kaW5nXG4gICAgICovXG4gICAgJ3Q6dGV4dCc/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogVGFnIHN0cmluZy4gU2VlIFtUYWdnaW5nXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjdGFnZ2luZykgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgJ286dGFnJz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcy9kaXNhYmxlcyBES0lNIHNpZ25hdHVyZXMgb24gcGVyLW1lc3NhZ2UgYmFzaXMuIFBhc3MgYHllc2AsIGBub2AsIGB0cnVlYCBvciBgZmFsc2VgXG4gICAgICovXG4gICAgJ286ZGtpbSc/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogRGVzaXJlZCB0aW1lIG9mIGRlbGl2ZXJ5LiBTZWUgW0RhdGUgRm9ybWF0XShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L2FwaS1pbnRyby5odG1sI2RhdGUtZm9ybWF0KS5cbiAgICAgKlxuICAgICAqIE5vdGU6IE1lc3NhZ2VzIGNhbiBiZSBzY2hlZHVsZWQgZm9yIGEgbWF4aW11bSBvZiAzIGRheXMgaW4gdGhlIGZ1dHVyZS5cbiAgICAgKi9cbiAgICAnbzpkZWxpdmVyeXRpbWUnPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBTZW5kIFRpbWUgT3B0aW1pemF0aW9uIChTVE8pIG9uIGEgcGVyLW1lc3NhZ2UgYmFzaXMuXG4gICAgICpcbiAgICAgKiBTdHJpbmcgc2hvdWxkIGJlIHNldCB0byB0aGUgbnVtYmVyIG9mIGhvdXJzIGluIGBbMC05XStoYCBmb3JtYXQsXG4gICAgICogd2l0aCB0aGUgbWluaW11bSBiZWluZyBgMjRoYCBhbmQgdGhlIG1heGltdW0gYmVpbmcgYDcyaGAuXG4gICAgICpcbiAgICAgKiBUaGlzIHZhbHVlIGRlZmluZXMgdGhlIHRpbWUgd2luZG93IGluIHdoaWNoIE1haWxndW4gd2lsbCBydW4gdGhlIG9wdGltaXphdGlvbiBhbGdvcml0aG0gYmFzZWQgb24gcHJpb3IgZW5nYWdlbWVudCBkYXRhIG9mIGEgZ2l2ZW4gcmVjaXBpZW50LiBTZWUgW1NlbmRpbmcgYSBtZXNzYWdlIHdpdGggU1RPXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjc3RvLXNlbmRpbmcpIGZvciBkZXRhaWxzLlxuICAgICAqXG4gICAgICogX1BsZWFzZSBub3RlIHRoYXQgU1RPIGlzIG9ubHkgYXZhaWxhYmxlIG9uIGNlcnRhaW4gcGxhbnMuXG4gICAgICogU2VlIHd3dy5tYWlsZ3VuLmNvbS9wcmljaW5nIGZvciBtb3JlIGluZm8uX1xuICAgICAqL1xuICAgICdvOmRlbGl2ZXJ5dGltZS1vcHRpbWl6ZS1wZXJpb2QnPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBUaW1lem9uZSBPcHRpbWl6YXRpb24gKFRaTykgb24gYSBwZXIgbWVzc2FnZSBiYXNpcy5cbiAgICAgKlxuICAgICAqIFN0cmluZyBzaG91bGQgYmUgc2V0IHRvIHByZWZlcnJlZCBkZWxpdmVyeSB0aW1lIGluIGBISDptbWAgb3IgYGhoOm1tYWFgIGZvcm1hdCwgd2hlcmUgYEhIOm1tYCBpcyB1c2VkIGZvciAyNCBob3VyIGZvcm1hdCB3aXRob3V0IEFNL1BNIGFuZCBgaGg6bW1hYWAgaXMgdXNlZCBmb3IgMTIgaG91ciBmb3JtYXQgd2l0aCBBTS9QTS4gU2VlIFtTZW5kaW5nIGEgbWVzc2FnZSB3aXRoIFRaT10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI3R6by1zZW5kaW5nKSBmb3IgZGV0YWlscy5cbiAgICAgKlxuICAgICAqIFBsZWFzZSBub3RlIHRoYXQgVFpPIGlzIG9ubHkgYXZhaWxhYmxlIG9uIGNlcnRhaW4gcGxhbnMuXG4gICAgICogU2VlIHd3dy5tYWlsZ3VuLmNvbS9wcmljaW5nIGZvciBtb3JlIGluZm8uXG4gICAgICovXG4gICAgJ286dGltZS16b25lLWxvY2FsaXplJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgc2VuZGluZyBpbiB0ZXN0IG1vZGUuIFBhc3MgYHllc2AgaWYgbmVlZGVkLiBTZWUgW1NlbmRpbmcgaW4gVGVzdCBNb2RlXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjbWFudWFsLXRlc3Rtb2RlKVxuICAgICAqL1xuICAgICdvOnRlc3Rtb2RlJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRyYWNraW5nIG9uIGEgcGVyLW1lc3NhZ2UgYmFzaXMsIHNlZSBbVHJhY2tpbmcgTWVzc2FnZXNdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCN0cmFja2luZy1tZXNzYWdlcyBmb3IgZGV0YWlscy4gUGFzcyAneWVzJywgJ25vJywgJ3RydWUnIG9yICdmYWxzZSdcbiAgICAgKi9cbiAgICAnbzp0cmFja2luZyc/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBjbGlja3MgdHJhY2tpbmcgb24gYSBwZXItbWVzc2FnZSBiYXNpcy5cbiAgICAgKiBIYXMgaGlnaGVyIHByaW9yaXR5IHRoYW4gZG9tYWluLWxldmVsIHNldHRpbmcuXG4gICAgICogUGFzcyBgeWVzYCwgYG5vYCwgYHRydWVgLCBgZmFsc2VgIG9yIGBodG1sb25seWAuXG4gICAgICovXG4gICAgJ286dHJhY2tpbmctY2xpY2tzJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubycgfCAnaHRtbG9ubHknO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBvcGVucyB0cmFja2luZyBvbiBhIHBlci1tZXNzYWdlIGJhc2lzLlxuICAgICAqIEhhcyBoaWdoZXIgcHJpb3JpdHkgdGhhbiBkb21haW4tbGV2ZWwgc2V0dGluZy5cbiAgICAgKiAgUGFzcyAneWVzJyBvciAnbm8nLCAndHJ1ZScgb3IgJ2ZhbHNlJ1xuICAgICAqL1xuICAgICdvOnRyYWNraW5nLW9wZW5zJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBJZiBzZXQgdG8gJ1RydWUnIG9yICd5ZXMnIHRoaXMgcmVxdWlyZXMgdGhlIG1lc3NhZ2Ugb25seSBiZSBzZW50IG92ZXIgYSBUTFMgY29ubmVjdGlvbi5cbiAgICAgKiBJZiBhIFRMUyBjb25uZWN0aW9uIGNhbiBub3QgYmUgZXN0YWJsaXNoZWQsIE1haWxndW4gd2lsbCBub3QgZGVsaXZlciB0aGUgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIElmIHNldCB0byAnRmFsc2UnIG9yICdubycsIE1haWxndW4gd2lsbCBzdGlsbCB0cnkgYW5kIHVwZ3JhZGUgdGhlIGNvbm5lY3Rpb24sXG4gICAgICogYnV0IGlmIE1haWxndW4gY2FuIG5vdCwgdGhlIG1lc3NhZ2Ugd2lsbCBiZSBkZWxpdmVyZWQgb3ZlciBhIHBsYWludGV4dCBTTVRQIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBUaGUgZGVmYXVsdCBpcyAnRmFsc2UnLlxuICAgICAqL1xuICAgICdvOnJlcXVpcmUtdGxzJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBJZiBzZXQgdG8gYFRydWVgIG9yIGB5ZXNgLCB0aGUgY2VydGlmaWNhdGUgYW5kIGhvc3RuYW1lIHdpbGwgbm90IGJlIHZlcmlmaWVkXG4gICAgICogd2hlbiB0cnlpbmcgdG8gZXN0YWJsaXNoIGEgVExTIGNvbm5lY3Rpb25cbiAgICAgKiBhbmQgTWFpbGd1biB3aWxsIGFjY2VwdCBhbnkgY2VydGlmaWNhdGUgZHVyaW5nIGRlbGl2ZXJ5LlxuICAgICAqXG4gICAgICogSWYgc2V0IHRvIGBGYWxzZWAgb3IgYG5vYCwgTWFpbGd1biB3aWxsIHZlcmlmeSB0aGUgY2VydGlmaWNhdGUgYW5kIGhvc3RuYW1lLlxuICAgICAqIElmIGVpdGhlciBvbmUgY2FuIG5vdCBiZSB2ZXJpZmllZCwgYSBUTFMgY29ubmVjdGlvbiB3aWxsIG5vdCBiZSBlc3RhYmxpc2hlZC5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IGlzIGBGYWxzZWAuXG4gICAgICovXG4gICAgJ286c2tpcC12ZXJpZmljYXRpb24nPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIEEgdmFsaWQgSlNPTi1lbmNvZGVkIGRpY3Rpb25hcnksIHdoZXJlIGtleSBpcyBhIHBsYWluIHJlY2lwaWVudCBhZGRyZXNzIGFuZCB2YWx1ZSBpcyBhIGRpY3Rpb25hcnkgd2l0aCB2YXJpYWJsZXMgdGhhdCBjYW4gYmUgcmVmZXJlbmNlZCBpbiB0aGUgbWVzc2FnZSBib2R5LiBTZWUgW0JhdGNoIFNlbmRpbmddKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCNiYXRjaC1zZW5kaW5nKSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICAncmVjaXBpZW50LXZhcmlhYmxlcyc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBoOicgcHJlZml4IGZvbGxvd2VkIGJ5IGFuIGFyYml0cmFyeSB2YWx1ZSBhbGxvd3MgdG8gYXBwZW5kIGEgY3VzdG9tIE1JTUUgaGVhZGVyXG4gICAgICogdG8gdGhlIG1lc3NhZ2UgKCdYLU15LUhlYWRlcicgaW4gdGhpcyBjYXNlKS5cbiAgICAgKiBGb3IgZXhhbXBsZSwgYGg6UmVwbHktVG9gIHRvIHNwZWNpZnkgUmVwbHktVG8gYWRkcmVzcy5cbiAgICAgKi9cbiAgICAnaDpYLU15LUhlYWRlcic/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBgdjpgIHByZWZpeCBmb2xsb3dlZCBieSBhbiBhcmJpdHJhcnkgbmFtZSBhbGxvd3MgdG8gYXR0YWNoIGEgY3VzdG9tIEpTT04gZGF0YSB0byB0aGUgbWVzc2FnZS4gU2VlIFtBdHRhY2hpbmcgRGF0YSB0byBNZXNzYWdlc10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI21hbnVhbC1jdXN0b21kYXRhKSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICAndjpteS12YXInPzogc3RyaW5nO1xuXG4gICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbn1cblxuZXhwb3J0IHR5cGUgTWVzc2FnZXNTZW5kQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBNZXNzYWdlc1NlbmRSZXN1bHQgPSB7XG4gICAgaWQ/OiBzdHJpbmcsXG4gICAgbWVzc2FnZT86IHN0cmluZztcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBkZXRhaWxzPzogc3RyaW5nO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NZXNzYWdlcyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIFJvdXRlID0ge1xuICAgIGFjdGlvbnM6IHN0cmluZ1tdO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGV4cHJlc3Npb246IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHByaW9yaXR5OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZVJvdXRlUmVzcG9uc2UgPSBSb3V0ZSAmIHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERlc3Ryb3lSb3V0ZVJlc3BvbnNlID0ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVVcGRhdGVSb3V0ZURhdGEgPSB7XG4gICAgcHJpb3JpdHk/OiBudW1iZXI7XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgZXhwcmVzc2lvbjogc3RyaW5nO1xuICAgIGFjdGlvbjogc3RyaW5nW107XG59XG5cbmV4cG9ydCB0eXBlIFJvdXRlc0xpc3RRdWVyeSA9IHtcbiAgICBsaW1pdD86IG51bWJlcjtcbiAgICBza2lwPzogbnVtYmVyO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Sb3V0ZXMnO1xuIiwiZXhwb3J0IHR5cGUgU3RhdCA9IHtcbiAgdGltZTogc3RyaW5nIHwgRGF0ZSxcbiAgZGVsaXZlcmVkOiB7XG4gICAgc210cDogbnVtYmVyLFxuICAgIGh0dHA6IG51bWJlcixcbiAgICB0b3RhbDogbnVtYmVyXG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU3RhdHNPcHRpb25zID0ge1xuICBzdGFydDogc3RyaW5nIHwgRGF0ZTtcbiAgZW5kOiBzdHJpbmcgfCBEYXRlO1xuICByZXNvbHV0aW9uOiBzdHJpbmc7XG4gIHN0YXRzOiBTdGF0W107XG59XG5cbmV4cG9ydCB0eXBlIFN0YXRzRXZlbnQgPSAnYWNjZXB0ZWQnIHwgJ2RlbGl2ZXJlZCcgfCAnb3BlbmVkJyB8ICdjbGlja2VkJyB8ICd1bnN1YnNjcmliZWQnIHwgJ3N0b3JlZCcgfCAnY29tcGxhaW5lZCcgfCAnZmFpbGVkJztcblxuZXhwb3J0IHR5cGUgU3RhdHNRdWVyeSA9IHtcbiAgZXZlbnQ6IFN0YXRzRXZlbnQgfCBTdGF0c0V2ZW50W107XG4gIHN0YXJ0Pzogc3RyaW5nIHwgRGF0ZTtcbiAgZW5kPzogc3RyaW5nIHwgRGF0ZTtcbiAgcmVzb2x1dGlvbj86ICdob3VyJ3wgJ2RheScgfCAnbW9udGgnO1xuICBkdXJhdGlvbj86IHN0cmluZztcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vU3RhdHMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBCb3VuY2VEYXRhID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBDb21wbGFpbnREYXRhID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuIiwiaW1wb3J0IHtcbiAgQm91bmNlRGF0YSxcbiAgQ29tcGxhaW50RGF0YSxcbiAgVW5zdWJzY3JpYmVEYXRhLFxuICBXaGl0ZUxpc3REYXRhXG59IGZyb20gJy4nO1xuaW1wb3J0IHtcbiAgSUJvdW5jZSwgSUNvbXBsYWludCwgSVVuc3Vic2NyaWJlLCBJV2hpdGVMaXN0XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkxpc3QgPSB7XG4gIGl0ZW1zOiAoSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0KVtdO1xuICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25MaXN0UXVlcnkgPSB7XG4gIGxpbWl0PzogbnVtYmVyO1xuICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkRhdGFUeXBlID0gQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhO1xuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSA9IHtcbiAgYm9keToge1xuICAgIGl0ZW1zOiBCb3VuY2VEYXRhW10gfCBDb21wbGFpbnREYXRhW10gfCBVbnN1YnNjcmliZURhdGFbXSB8IFdoaXRlTGlzdERhdGFbXTtcbiAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25SZXNwb25zZSA9IHtcbiAgYm9keTogU3VwcHJlc3Npb25EYXRhVHlwZTtcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHZhbHVlPzogc3RyaW5nO1xuICAgIGFkZHJlc3M/OiBzdHJpbmc7XG4gIH1cbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdCA9IHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSA9IHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjb2RlPzogbnVtYmVyO1xuICBlcnJvcj86IHN0cmluZztcbiAgZG9tYWluPzogc3RyaW5nO1xuICB0YWc/OiBzdHJpbmc7IC8vIHdvcmtzIG9ubHkgd2l0aCBGb3JtRGF0YSB1c2FnZSBmb3Igb25lIHVuc3Vic2NyaWJlXG4gIGNyZWF0ZWRfYXQ/OiBzdHJpbmcgO1xuICB0YWdzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSA9IHtcbiAgYm9keTp7XG4gICAgbWVzc2FnZTpzdHJpbmc7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCA9IHtcbiAgbWVzc2FnZTpzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIFVuc3Vic2NyaWJlRGF0YSA9IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgdGFnczogYW55O1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG4iLCJleHBvcnQgdHlwZSBXaGl0ZUxpc3REYXRhID0ge1xuICAgIHR5cGU6IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIHJlYXNvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vQm91bmNlJztcbmV4cG9ydCAqIGZyb20gJy4vQ29tcGxhaW50JztcbmV4cG9ydCAqIGZyb20gJy4vU3VwcHJlc3Npb25zJztcbmV4cG9ydCAqIGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuZXhwb3J0ICogZnJvbSAnLi9XaGl0ZUxpc3QnO1xuIiwiaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkpvYkRhdGEgPSB7XG4gICAgY3JlYXRlZF9hdDogbnVtYmVyO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcXVhbnRpdHk6IG51bWJlcjtcbiAgICByZWNvcmRzX3Byb2Nlc3NlZDogbnVtYmVyIHwgbnVsbDtcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgICBkb3dubG9hZF91cmw/OiB7XG4gICAgICAgIGNzdjogc3RyaW5nO1xuICAgICAgICBqc29uOiBzdHJpbmc7XG4gICAgfTtcbiAgICBzdW1tYXJ5Pzoge1xuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgIGNhdGNoX2FsbDogbnVtYmVyO1xuICAgICAgICAgICAgZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICAgIGRvX25vdF9zZW5kOiBudW1iZXI7XG4gICAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgICAgIHJpc2s6IHtcbiAgICAgICAgICAgIGhpZ2g6IG51bWJlcjtcbiAgICAgICAgICAgIGxvdzogbnVtYmVyO1xuICAgICAgICAgICAgbWVkaXVtOiBudW1iZXI7XG4gICAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdCA9IHtcbiAgICBjcmVhdGVkQXQ6IERhdGU7XG4gICAgaWQ6IHN0cmluZztcbiAgICBxdWFudGl0eTogbnVtYmVyO1xuICAgIHJlY29yZHNQcm9jZXNzZWQ6IG51bWJlciB8IG51bGw7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXI7IC8vIGh0dHAgcmVzcG9uc2Ugc3RhdHVzIGNvZGVcbiAgICBkb3dubG9hZFVybD86IHtcbiAgICAgICAgY3N2OiBzdHJpbmc7XG4gICAgICAgIGpzb246IHN0cmluZztcbiAgICB9O1xuICAgIHN1bW1hcnk/OiB7XG4gICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgY2F0Y2hBbGw6IG51bWJlcjtcbiAgICAgICAgICAgIGRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgICBkb05vdFNlbmQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgICAgfTtcbiAgICAgICAgcmlzazoge1xuICAgICAgICAgICAgaGlnaDogbnVtYmVyO1xuICAgICAgICAgICAgbG93OiBudW1iZXI7XG4gICAgICAgICAgICBtZWRpdW06IG51bWJlcjtcbiAgICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYiA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YSA9IHtcbiAgICBmaWxlOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duIHwgdW5kZWZpbmVkO1xufVxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhVXBkYXRlZCA9IHtcbiAgICBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdCA9IHtcbiAgICBqb2JzOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHRbXTtcbiAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xuICAgIHRvdGFsOiBudW1iZXI7XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnkgPSB7XG4gICAgbGltaXQ6IG51bWJlcjtcbiAgICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3Q7XG4gICAgICAgIGpvYnM6IE11bHRpcGxlVmFsaWRhdGlvbkpvYkRhdGFbXTtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9XG59XG5leHBvcnQgdHlwZSBDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYiA9IHtcbiAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICBzdGF0dXM6IG51bWJlcjtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5leHBvcnQgdHlwZSBWYWxpZGF0aW9uUXVlcnkgPSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbn1cbmV4cG9ydCB0eXBlIFZhbGlkYXRpb25SZXN1bHQgPSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgaXNfZGlzcG9zYWJsZV9hZGRyZXNzOiBib29sZWFuO1xuICBpc19yb2xlX2FkZHJlc3M6IGJvb2xlYW47XG4gIHJlYXNvbjogc3RyaW5nW107XG4gIHJlc3VsdDogc3RyaW5nO1xuICByaXNrOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFZhbGlkYXRpb25SZXNwb25zZSA9IHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIGJvZHk6IFZhbGlkYXRpb25SZXN1bHQ7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL011bHRpcGxlVmFsaWRhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL1ZhbGlkYXRpb24nO1xuIiwiZXhwb3J0IHR5cGUgQVBJV2ViaG9vayA9IHtcbiAgICB1cmw/OiBzdHJpbmdcbiAgICB1cmxzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tSZXNwb25zZUJvZHkgPSB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHdlYmhvb2s6IEFQSVdlYmhvb2s7XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiBXZWJob29rUmVzcG9uc2VCb2R5O1xufVxuXG5leHBvcnQgdHlwZSBXZWJob29rTGlzdCA9IHtcbiAgICBbaWQ6IHN0cmluZ106IHtcbiAgICAgICAgdXJsczogc3RyaW5nW11cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tzUXVlcnkgPSB7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgc2tpcD86IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va1ZhbGlkYXRpb25SZXNwb25zZSA9IHtcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBXZWJob29rUmVzdWx0ID0ge1xuICBpZDogc3RyaW5nO1xuICB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vV2ViaG9va3MnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9Db21tb24nO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5zJztcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vSVBQb29scyc7XG5leHBvcnQgKiBmcm9tICcuL0lQcyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxndW5DbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9NZXNzYWdlcyc7XG5leHBvcnQgKiBmcm9tICcuL1JvdXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRzJztcbmV4cG9ydCAqIGZyb20gJy4vU3VwcHJlc3Npb25zJztcbmV4cG9ydCAqIGZyb20gJy4vVmFsaWRhdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9XZWJob29rcyc7XG4iLCJpbXBvcnQgTWFpbGd1bkNsaWVudCBmcm9tICcuL0NsYXNzZXMvTWFpbGd1bkNsaWVudCc7XG5pbXBvcnQgeyBJTWFpbGd1bkNsaWVudCB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9UeXBlcy9Db21tb24nO1xuaW1wb3J0IHsgTWFpbGd1bkNsaWVudE9wdGlvbnMgfSBmcm9tICcuL1R5cGVzL01haWxndW5DbGllbnQnO1xuXG5leHBvcnQgKiBhcyBFbnVtcyBmcm9tICcuL0VudW1zJztcbmV4cG9ydCAqIGZyb20gJy4vVHlwZXMnO1xuZXhwb3J0ICogYXMgSW50ZXJmYWNlcyBmcm9tICcuL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsZ3VuIHtcbiAgc3RhdGljIGdldCBkZWZhdWx0KCk6IHR5cGVvZiBNYWlsZ3VuIHsgcmV0dXJuIHRoaXM7IH1cbiAgcHJpdmF0ZSBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YVxuXG4gIGNvbnN0cnVjdG9yKEZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy5mb3JtRGF0YSA9IEZvcm1EYXRhO1xuICB9XG5cbiAgY2xpZW50KG9wdGlvbnM6IE1haWxndW5DbGllbnRPcHRpb25zKSA6IElNYWlsZ3VuQ2xpZW50IHtcbiAgICByZXR1cm4gbmV3IE1haWxndW5DbGllbnQob3B0aW9ucywgdGhpcy5mb3JtRGF0YSk7XG4gIH1cbn1cbiIsIi8qISBodHRwczovL210aHMuYmUvYmFzZTY0IHYxLjAuMCBieSBAbWF0aGlhcyB8IE1JVCBsaWNlbnNlICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgLlxuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLlxuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0bW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsIGFuZCB1c2Vcblx0Ly8gaXQgYXMgYHJvb3RgLlxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fTtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cblx0dmFyIGVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdC8vIE5vdGU6IHRoZSBlcnJvciBtZXNzYWdlcyB1c2VkIHRocm91Z2hvdXQgdGhpcyBmaWxlIG1hdGNoIHRob3NlIHVzZWQgYnlcblx0XHQvLyB0aGUgbmF0aXZlIGBhdG9iYC9gYnRvYWAgaW1wbGVtZW50YXRpb24gaW4gQ2hyb21pdW0uXG5cdFx0dGhyb3cgbmV3IEludmFsaWRDaGFyYWN0ZXJFcnJvcihtZXNzYWdlKTtcblx0fTtcblxuXHR2YXIgVEFCTEUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cdC8vIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvY29tbW9uLW1pY3Jvc3ludGF4ZXMuaHRtbCNzcGFjZS1jaGFyYWN0ZXJcblx0dmFyIFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMgPSAvW1xcdFxcblxcZlxcciBdL2c7XG5cblx0Ly8gYGRlY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBhdG9iYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQuIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYXRvYlxuXHQvLyBUaGUgb3B0aW1pemVkIGJhc2U2NC1kZWNvZGluZyBhbGdvcml0aG0gdXNlZCBpcyBiYXNlZCBvbiBAYXRr4oCZcyBleGNlbGxlbnRcblx0Ly8gaW1wbGVtZW50YXRpb24uIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2F0ay8xMDIwMzk2XG5cdHZhciBkZWNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KVxuXHRcdFx0LnJlcGxhY2UoUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUywgJycpO1xuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0aWYgKGxlbmd0aCAlIDQgPT0gMCkge1xuXHRcdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKC89PT8kLywgJycpO1xuXHRcdFx0bGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRsZW5ndGggJSA0ID09IDEgfHxcblx0XHRcdC8vIGh0dHA6Ly93aGF0d2cub3JnL0MjYWxwaGFudW1lcmljLWFzY2lpLWNoYXJhY3RlcnNcblx0XHRcdC9bXithLXpBLVowLTkvXS8udGVzdChpbnB1dClcblx0XHQpIHtcblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnSW52YWxpZCBjaGFyYWN0ZXI6IHRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIGJpdENvdW50ZXIgPSAwO1xuXHRcdHZhciBiaXRTdG9yYWdlO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHRidWZmZXIgPSBUQUJMRS5pbmRleE9mKGlucHV0LmNoYXJBdChwb3NpdGlvbikpO1xuXHRcdFx0Yml0U3RvcmFnZSA9IGJpdENvdW50ZXIgJSA0ID8gYml0U3RvcmFnZSAqIDY0ICsgYnVmZmVyIDogYnVmZmVyO1xuXHRcdFx0Ly8gVW5sZXNzIHRoaXMgaXMgdGhlIGZpcnN0IG9mIGEgZ3JvdXAgb2YgNCBjaGFyYWN0ZXJz4oCmXG5cdFx0XHRpZiAoYml0Q291bnRlcisrICUgNCkge1xuXHRcdFx0XHQvLyDigKZjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gYSBzaW5nbGUgQVNDSUkgY2hhcmFjdGVyLlxuXHRcdFx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0XHRcdFx0XHQweEZGICYgYml0U3RvcmFnZSA+PiAoLTIgKiBiaXRDb3VudGVyICYgNilcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHQvLyBgZW5jb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGJ0b2FgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZDogaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1idG9hXG5cdHZhciBlbmNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KTtcblx0XHRpZiAoL1teXFwwLVxceEZGXS8udGVzdChpbnB1dCkpIHtcblx0XHRcdC8vIE5vdGU6IG5vIG5lZWQgdG8gc3BlY2lhbC1jYXNlIGFzdHJhbCBzeW1ib2xzIGhlcmUsIGFzIHN1cnJvZ2F0ZXMgYXJlXG5cdFx0XHQvLyBtYXRjaGVkLCBhbmQgdGhlIGlucHV0IGlzIHN1cHBvc2VkIHRvIG9ubHkgY29udGFpbiBBU0NJSSBhbnl3YXkuXG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J1RoZSBzdHJpbmcgdG8gYmUgZW5jb2RlZCBjb250YWlucyBjaGFyYWN0ZXJzIG91dHNpZGUgb2YgdGhlICcgK1xuXHRcdFx0XHQnTGF0aW4xIHJhbmdlLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBwYWRkaW5nID0gaW5wdXQubGVuZ3RoICUgMztcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0dmFyIGE7XG5cdFx0dmFyIGI7XG5cdFx0dmFyIGM7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHQvLyBNYWtlIHN1cmUgYW55IHBhZGRpbmcgaXMgaGFuZGxlZCBvdXRzaWRlIG9mIHRoZSBsb29wLlxuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGggLSBwYWRkaW5nO1xuXG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdC8vIFJlYWQgdGhyZWUgYnl0ZXMsIGkuZS4gMjQgYml0cy5cblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCAxNjtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pIDw8IDg7XG5cdFx0XHRjID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiICsgYztcblx0XHRcdC8vIFR1cm4gdGhlIDI0IGJpdHMgaW50byBmb3VyIGNodW5rcyBvZiA2IGJpdHMgZWFjaCwgYW5kIGFwcGVuZCB0aGVcblx0XHRcdC8vIG1hdGNoaW5nIGNoYXJhY3RlciBmb3IgZWFjaCBvZiB0aGVtIHRvIHRoZSBvdXRwdXQuXG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDE4ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEyICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDYgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgJiAweDNGKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAocGFkZGluZyA9PSAyKSB7XG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgODtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGI7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEwKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyID4+IDQpICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCAyKSAmIDB4M0YpICtcblx0XHRcdFx0Jz0nXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAocGFkZGluZyA9PSAxKSB7XG5cdFx0XHRidWZmZXIgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCA0KSAmIDB4M0YpICtcblx0XHRcdFx0Jz09J1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdHZhciBiYXNlNjQgPSB7XG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCd2ZXJzaW9uJzogJzEuMC4wJ1xuXHR9O1xuXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGJhc2U2NDtcblx0XHR9KTtcblx0fVx0ZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG5cdFx0aWYgKGZyZWVNb2R1bGUpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IGJhc2U2NDtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGJhc2U2NCkge1xuXHRcdFx0XHRiYXNlNjQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IGJhc2U2NFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LmJhc2U2NCA9IGJhc2U2NDtcblx0fVxuXG59KHRoaXMpKTtcbiIsIihmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShkZWZpbml0aW9uKTtcbiAgZWxzZSBjb250ZXh0W25hbWVdID0gZGVmaW5pdGlvbigpO1xufSkoJ3VybGpvaW4nLCB0aGlzLCBmdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplIChzdHJBcnJheSkge1xuICAgIHZhciByZXN1bHRBcnJheSA9IFtdO1xuICAgIGlmIChzdHJBcnJheS5sZW5ndGggPT09IDApIHsgcmV0dXJuICcnOyB9XG5cbiAgICBpZiAodHlwZW9mIHN0ckFycmF5WzBdICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVXJsIG11c3QgYmUgYSBzdHJpbmcuIFJlY2VpdmVkICcgKyBzdHJBcnJheVswXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGZpcnN0IHBhcnQgaXMgYSBwbGFpbiBwcm90b2NvbCwgd2UgY29tYmluZSBpdCB3aXRoIHRoZSBuZXh0IHBhcnQuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eW14vOl0rOlxcLyokLykgJiYgc3RyQXJyYXkubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGZpcnN0ID0gc3RyQXJyYXkuc2hpZnQoKTtcbiAgICAgIHN0ckFycmF5WzBdID0gZmlyc3QgKyBzdHJBcnJheVswXTtcbiAgICB9XG5cbiAgICAvLyBUaGVyZSBtdXN0IGJlIHR3byBvciB0aHJlZSBzbGFzaGVzIGluIHRoZSBmaWxlIHByb3RvY29sLCB0d28gc2xhc2hlcyBpbiBhbnl0aGluZyBlbHNlLlxuICAgIGlmIChzdHJBcnJheVswXS5tYXRjaCgvXmZpbGU6XFwvXFwvXFwvLykpIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8vJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8nKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gc3RyQXJyYXlbaV07XG5cbiAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIGNvbXBvbmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wb25lbnQgPT09ICcnKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgc3RhcnRpbmcgc2xhc2hlcyBmb3IgZWFjaCBjb21wb25lbnQgYnV0IHRoZSBmaXJzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL15bXFwvXSsvLCAnJyk7XG4gICAgICB9XG4gICAgICBpZiAoaSA8IHN0ckFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGVuZGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGxhc3QuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIHRoZSBsYXN0IGNvbXBvbmVudCB3ZSB3aWxsIGNvbWJpbmUgbXVsdGlwbGUgc2xhc2hlcyB0byBhIHNpbmdsZSBvbmUuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJy8nKTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0QXJyYXkucHVzaChjb21wb25lbnQpO1xuXG4gICAgfVxuXG4gICAgdmFyIHN0ciA9IHJlc3VsdEFycmF5LmpvaW4oJy8nKTtcbiAgICAvLyBFYWNoIGlucHV0IGNvbXBvbmVudCBpcyBub3cgc2VwYXJhdGVkIGJ5IGEgc2luZ2xlIHNsYXNoIGV4Y2VwdCB0aGUgcG9zc2libGUgZmlyc3QgcGxhaW4gcHJvdG9jb2wgcGFydC5cblxuICAgIC8vIHJlbW92ZSB0cmFpbGluZyBzbGFzaCBiZWZvcmUgcGFyYW1ldGVycyBvciBoYXNoXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcLyhcXD98JnwjW14hXSkvZywgJyQxJyk7XG5cbiAgICAvLyByZXBsYWNlID8gaW4gcGFyYW1ldGVycyB3aXRoICZcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJz8nKTtcbiAgICBzdHIgPSBwYXJ0cy5zaGlmdCgpICsgKHBhcnRzLmxlbmd0aCA+IDAgPyAnPyc6ICcnKSArIHBhcnRzLmpvaW4oJyYnKTtcblxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnB1dDtcblxuICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgaW5wdXQgPSBhcmd1bWVudHNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0ID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBub3JtYWxpemUoaW5wdXQpO1xuICB9O1xuXG59KTtcbiIsIi8vIEF4aW9zIHYxLjQuMCBDb3B5cmlnaHQgKGMpIDIwMjMgTWF0dCBaYWJyaXNraWUgYW5kIGNvbnRyaWJ1dG9yc1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5jb25zdCB7dG9TdHJpbmd9ID0gT2JqZWN0LnByb3RvdHlwZTtcbmNvbnN0IHtnZXRQcm90b3R5cGVPZn0gPSBPYmplY3Q7XG5cbmNvbnN0IGtpbmRPZiA9IChjYWNoZSA9PiB0aGluZyA9PiB7XG4gICAgY29uc3Qgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmNvbnN0IGtpbmRPZlRlc3QgPSAodHlwZSkgPT4ge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKHRoaW5nKSA9PiBraW5kT2YodGhpbmcpID09PSB0eXBlXG59O1xuXG5jb25zdCB0eXBlT2ZUZXN0ID0gdHlwZSA9PiB0aGluZyA9PiB0eXBlb2YgdGhpbmcgPT09IHR5cGU7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCB7aXNBcnJheX0gPSBBcnJheTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VuZGVmaW5lZCA9IHR5cGVPZlRlc3QoJ3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIGlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKSAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0FycmF5QnVmZmVyID0ga2luZE9mVGVzdCgnQXJyYXlCdWZmZXInKTtcblxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIGxldCByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKGlzQXJyYXlCdWZmZXIodmFsLmJ1ZmZlcikpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJpbmcgPSB0eXBlT2ZUZXN0KCdzdHJpbmcnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Z1bmN0aW9uID0gdHlwZU9mVGVzdCgnZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc051bWJlciA9IHR5cGVPZlRlc3QoJ251bWJlcicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgIT09IG51bGwgJiYgdHlwZW9mIHRoaW5nID09PSAnb2JqZWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJvb2xlYW5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJvb2xlYW4sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jvb2xlYW4gPSB0aGluZyA9PiB0aGluZyA9PT0gdHJ1ZSB8fCB0aGluZyA9PT0gZmFsc2U7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgaWYgKGtpbmRPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiAocHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKSA9PT0gbnVsbCkgJiYgIShTeW1ib2wudG9TdHJpbmdUYWcgaW4gdmFsKSAmJiAhKFN5bWJvbC5pdGVyYXRvciBpbiB2YWwpO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRGF0ZSA9IGtpbmRPZlRlc3QoJ0RhdGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZSA9IGtpbmRPZlRlc3QoJ0ZpbGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGVMaXN0ID0ga2luZE9mVGVzdCgnRmlsZUxpc3QnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmVhbSA9ICh2YWwpID0+IGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRm9ybURhdGEgPSAodGhpbmcpID0+IHtcbiAgbGV0IGtpbmQ7XG4gIHJldHVybiB0aGluZyAmJiAoXG4gICAgKHR5cGVvZiBGb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGluZyBpbnN0YW5jZW9mIEZvcm1EYXRhKSB8fCAoXG4gICAgICBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiYgKFxuICAgICAgICAoa2luZCA9IGtpbmRPZih0aGluZykpID09PSAnZm9ybWRhdGEnIHx8XG4gICAgICAgIC8vIGRldGVjdCBmb3JtLWRhdGEgaW5zdGFuY2VcbiAgICAgICAgKGtpbmQgPT09ICdvYmplY3QnICYmIGlzRnVuY3Rpb24odGhpbmcudG9TdHJpbmcpICYmIHRoaW5nLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IEZvcm1EYXRhXScpXG4gICAgICApXG4gICAgKVxuICApXG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuY29uc3QgdHJpbSA9IChzdHIpID0+IHN0ci50cmltID9cbiAgc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5cyA9IGZhbHNlXVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuLCB7YWxsT3duS2V5cyA9IGZhbHNlfSA9IHt9KSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGk7XG4gIGxldCBsO1xuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yIChpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBjb25zdCBrZXlzID0gYWxsT3duS2V5cyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikgOiBPYmplY3Qua2V5cyhvYmopO1xuICAgIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBrZXk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRLZXkob2JqLCBrZXkpIHtcbiAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICBsZXQgX2tleTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBfa2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoa2V5ID09PSBfa2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiBfa2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY29uc3QgX2dsb2JhbCA9ICgoKSA9PiB7XG4gIC8qZXNsaW50IG5vLXVuZGVmOjAqL1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWxUaGlzO1xuICByZXR1cm4gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKVxufSkoKTtcblxuY29uc3QgaXNDb250ZXh0RGVmaW5lZCA9IChjb250ZXh0KSA9PiAhaXNVbmRlZmluZWQoY29udGV4dCkgJiYgY29udGV4dCAhPT0gX2dsb2JhbDtcblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKlxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICBjb25zdCB7Y2FzZWxlc3N9ID0gaXNDb250ZXh0RGVmaW5lZCh0aGlzKSAmJiB0aGlzIHx8IHt9O1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgY29uc3QgYXNzaWduVmFsdWUgPSAodmFsLCBrZXkpID0+IHtcbiAgICBjb25zdCB0YXJnZXRLZXkgPSBjYXNlbGVzcyAmJiBmaW5kS2V5KHJlc3VsdCwga2V5KSB8fCBrZXk7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W3RhcmdldEtleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZShyZXN1bHRbdGFyZ2V0S2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWw7XG4gICAgfVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGFyZ3VtZW50c1tpXSAmJiBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzXVxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5jb25zdCBleHRlbmQgPSAoYSwgYiwgdGhpc0FyZywge2FsbE93bktleXN9PSB7fSkgPT4ge1xuICBmb3JFYWNoKGIsICh2YWwsIGtleSkgPT4ge1xuICAgIGlmICh0aGlzQXJnICYmIGlzRnVuY3Rpb24odmFsKSkge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9LCB7YWxsT3duS2V5c30pO1xuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59O1xuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ29uc3RydWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcHJvcHNdXG4gKiBAcGFyYW0ge29iamVjdH0gW2Rlc2NyaXB0b3JzXVxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBpbmhlcml0cyA9IChjb25zdHJ1Y3Rvciwgc3VwZXJDb25zdHJ1Y3RvciwgcHJvcHMsIGRlc2NyaXB0b3JzKSA9PiB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKTtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3RvciwgJ3N1cGVyJywge1xuICAgIHZhbHVlOiBzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZVxuICB9KTtcbiAgcHJvcHMgJiYgT2JqZWN0LmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BzKTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyBuZXcgYXJyYXkgZnJvbSBhcnJheSBsaWtlIG9iamVjdCBvciBudWxsIGlmIGZhaWxlZFxuICpcbiAqIEBwYXJhbSB7Kn0gW3RoaW5nXVxuICpcbiAqIEByZXR1cm5zIHs/QXJyYXl9XG4gKi9cbmNvbnN0IHRvQXJyYXkgPSAodGhpbmcpID0+IHtcbiAgaWYgKCF0aGluZykgcmV0dXJuIG51bGw7XG4gIGlmIChpc0FycmF5KHRoaW5nKSkgcmV0dXJuIHRoaW5nO1xuICBsZXQgaSA9IHRoaW5nLmxlbmd0aDtcbiAgaWYgKCFpc051bWJlcihpKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGFyciA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBhcnJbaV0gPSB0aGluZ1tpXTtcbiAgfVxuICByZXR1cm4gYXJyO1xufTtcblxuLyoqXG4gKiBDaGVja2luZyBpZiB0aGUgVWludDhBcnJheSBleGlzdHMgYW5kIGlmIGl0IGRvZXMsIGl0IHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGVcbiAqIHRoaW5nIHBhc3NlZCBpbiBpcyBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5XG4gKlxuICogQHBhcmFtIHtUeXBlZEFycmF5fVxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmNvbnN0IGlzVHlwZWRBcnJheSA9IChUeXBlZEFycmF5ID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuIHRoaW5nID0+IHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2V0UHJvdG90eXBlT2YoVWludDhBcnJheSkpO1xuXG4vKipcbiAqIEZvciBlYWNoIGVudHJ5IGluIHRoZSBvYmplY3QsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGtleSBhbmQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggZW50cnkuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGZvckVhY2hFbnRyeSA9IChvYmosIGZuKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRvciA9IG9iaiAmJiBvYmpbU3ltYm9sLml0ZXJhdG9yXTtcblxuICBjb25zdCBpdGVyYXRvciA9IGdlbmVyYXRvci5jYWxsKG9iaik7XG5cbiAgbGV0IHJlc3VsdDtcblxuICB3aGlsZSAoKHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG4gICAgY29uc3QgcGFpciA9IHJlc3VsdC52YWx1ZTtcbiAgICBmbi5jYWxsKG9iaiwgcGFpclswXSwgcGFpclsxXSk7XG4gIH1cbn07XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufTtcblxuLyogQ2hlY2tpbmcgaWYgdGhlIGtpbmRPZlRlc3QgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHdoZW4gcGFzc2VkIGFuIEhUTUxGb3JtRWxlbWVudC4gKi9cbmNvbnN0IGlzSFRNTEZvcm0gPSBraW5kT2ZUZXN0KCdIVE1MRm9ybUVsZW1lbnQnKTtcblxuY29uc3QgdG9DYW1lbENhc2UgPSBzdHIgPT4ge1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWy1fXFxzXShbYS16XFxkXSkoXFx3KikvZyxcbiAgICBmdW5jdGlvbiByZXBsYWNlcihtLCBwMSwgcDIpIHtcbiAgICAgIHJldHVybiBwMS50b1VwcGVyQ2FzZSgpICsgcDI7XG4gICAgfVxuICApO1xufTtcblxuLyogQ3JlYXRpbmcgYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2hlY2sgaWYgYW4gb2JqZWN0IGhhcyBhIHByb3BlcnR5LiAqL1xuY29uc3QgaGFzT3duUHJvcGVydHkgPSAoKHtoYXNPd25Qcm9wZXJ0eX0pID0+IChvYmosIHByb3ApID0+IGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkoT2JqZWN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlZ0V4cCA9IGtpbmRPZlRlc3QoJ1JlZ0V4cCcpO1xuXG5jb25zdCByZWR1Y2VEZXNjcmlwdG9ycyA9IChvYmosIHJlZHVjZXIpID0+IHtcbiAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopO1xuICBjb25zdCByZWR1Y2VkRGVzY3JpcHRvcnMgPSB7fTtcblxuICBmb3JFYWNoKGRlc2NyaXB0b3JzLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIGlmIChyZWR1Y2VyKGRlc2NyaXB0b3IsIG5hbWUsIG9iaikgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSBkZXNjcmlwdG9yO1xuICAgIH1cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMob2JqLCByZWR1Y2VkRGVzY3JpcHRvcnMpO1xufTtcblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCB0b09iamVjdFNldCA9IChhcnJheU9yU3RyaW5nLCBkZWxpbWl0ZXIpID0+IHtcbiAgY29uc3Qgb2JqID0ge307XG5cbiAgY29uc3QgZGVmaW5lID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIG9ialt2YWx1ZV0gPSB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIGlzQXJyYXkoYXJyYXlPclN0cmluZykgPyBkZWZpbmUoYXJyYXlPclN0cmluZykgOiBkZWZpbmUoU3RyaW5nKGFycmF5T3JTdHJpbmcpLnNwbGl0KGRlbGltaXRlcikpO1xuXG4gIHJldHVybiBvYmo7XG59O1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbmNvbnN0IHRvRmluaXRlTnVtYmVyID0gKHZhbHVlLCBkZWZhdWx0VmFsdWUpID0+IHtcbiAgdmFsdWUgPSArdmFsdWU7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59O1xuXG5jb25zdCBBTFBIQSA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eic7XG5cbmNvbnN0IERJR0lUID0gJzAxMjM0NTY3ODknO1xuXG5jb25zdCBBTFBIQUJFVCA9IHtcbiAgRElHSVQsXG4gIEFMUEhBLFxuICBBTFBIQV9ESUdJVDogQUxQSEEgKyBBTFBIQS50b1VwcGVyQ2FzZSgpICsgRElHSVRcbn07XG5cbmNvbnN0IGdlbmVyYXRlU3RyaW5nID0gKHNpemUgPSAxNiwgYWxwaGFiZXQgPSBBTFBIQUJFVC5BTFBIQV9ESUdJVCkgPT4ge1xuICBsZXQgc3RyID0gJyc7XG4gIGNvbnN0IHtsZW5ndGh9ID0gYWxwaGFiZXQ7XG4gIHdoaWxlIChzaXplLS0pIHtcbiAgICBzdHIgKz0gYWxwaGFiZXRbTWF0aC5yYW5kb20oKSAqIGxlbmd0aHwwXTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEodGhpbmcgJiYgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIHRoaW5nW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdGb3JtRGF0YScgJiYgdGhpbmdbU3ltYm9sLml0ZXJhdG9yXSk7XG59XG5cbmNvbnN0IHRvSlNPTk9iamVjdCA9IChvYmopID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgQXJyYXkoMTApO1xuXG4gIGNvbnN0IHZpc2l0ID0gKHNvdXJjZSwgaSkgPT4ge1xuXG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKHNvdXJjZSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmKCEoJ3RvSlNPTicgaW4gc291cmNlKSkge1xuICAgICAgICBzdGFja1tpXSA9IHNvdXJjZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gaXNBcnJheShzb3VyY2UpID8gW10gOiB7fTtcblxuICAgICAgICBmb3JFYWNoKHNvdXJjZSwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCByZWR1Y2VkVmFsdWUgPSB2aXNpdCh2YWx1ZSwgaSArIDEpO1xuICAgICAgICAgICFpc1VuZGVmaW5lZChyZWR1Y2VkVmFsdWUpICYmICh0YXJnZXRba2V5XSA9IHJlZHVjZWRWYWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0YWNrW2ldID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfTtcblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn07XG5cbmNvbnN0IGlzQXN5bmNGbiA9IGtpbmRPZlRlc3QoJ0FzeW5jRnVuY3Rpb24nKTtcblxuY29uc3QgaXNUaGVuYWJsZSA9ICh0aGluZykgPT5cbiAgdGhpbmcgJiYgKGlzT2JqZWN0KHRoaW5nKSB8fCBpc0Z1bmN0aW9uKHRoaW5nKSkgJiYgaXNGdW5jdGlvbih0aGluZy50aGVuKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLmNhdGNoKTtcblxudmFyIHV0aWxzID0ge1xuICBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgQUxQSEFCRVQsXG4gIGdlbmVyYXRlU3RyaW5nLFxuICBpc1NwZWNDb21wbGlhbnRGb3JtLFxuICB0b0pTT05PYmplY3QsXG4gIGlzQXN5bmNGbixcbiAgaXNUaGVuYWJsZVxufTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrO1xuICB9XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICByZXNwb25zZSAmJiAodGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlKTtcbn1cblxudXRpbHMuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdXRpbHMudG9KU09OT2JqZWN0KHRoaXMuY29uZmlnKSxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5yZXNwb25zZSAmJiB0aGlzLnJlc3BvbnNlLnN0YXR1cyA/IHRoaXMucmVzcG9uc2Uuc3RhdHVzIDogbnVsbFxuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBwcm90b3R5cGUkMSA9IEF4aW9zRXJyb3IucHJvdG90eXBlO1xuY29uc3QgZGVzY3JpcHRvcnMgPSB7fTtcblxuW1xuICAnRVJSX0JBRF9PUFRJT05fVkFMVUUnLFxuICAnRVJSX0JBRF9PUFRJT04nLFxuICAnRUNPTk5BQk9SVEVEJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFUlJfTkVUV09SSycsXG4gICdFUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTJyxcbiAgJ0VSUl9ERVBSRUNBVEVEJyxcbiAgJ0VSUl9CQURfUkVTUE9OU0UnLFxuICAnRVJSX0JBRF9SRVFVRVNUJyxcbiAgJ0VSUl9DQU5DRUxFRCcsXG4gICdFUlJfTk9UX1NVUFBPUlQnLFxuICAnRVJSX0lOVkFMSURfVVJMJ1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbl0uZm9yRWFjaChjb2RlID0+IHtcbiAgZGVzY3JpcHRvcnNbY29kZV0gPSB7dmFsdWU6IGNvZGV9O1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEF4aW9zRXJyb3IsIGRlc2NyaXB0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUkMSwgJ2lzQXhpb3NFcnJvcicsIHt2YWx1ZTogdHJ1ZX0pO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuQXhpb3NFcnJvci5mcm9tID0gKGVycm9yLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlLCBjdXN0b21Qcm9wcykgPT4ge1xuICBjb25zdCBheGlvc0Vycm9yID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUkMSk7XG5cbiAgdXRpbHMudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xuICB9LCBwcm9wID0+IHtcbiAgICByZXR1cm4gcHJvcCAhPT0gJ2lzQXhpb3NFcnJvcic7XG4gIH0pO1xuXG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBlcnJvci5tZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICBheGlvc0Vycm9yLmNhdXNlID0gZXJyb3I7XG5cbiAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcblxuICByZXR1cm4gYXhpb3NFcnJvcjtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzdHJpY3RcbnZhciBodHRwQWRhcHRlciA9IG51bGw7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgZ2l2ZW4gdGhpbmcgaXMgYSBhcnJheSBvciBqcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoaW5nIC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBiZSB2aXNpdGVkLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1Zpc2l0YWJsZSh0aGluZykge1xuICByZXR1cm4gdXRpbHMuaXNQbGFpbk9iamVjdCh0aGluZykgfHwgdXRpbHMuaXNBcnJheSh0aGluZyk7XG59XG5cbi8qKlxuICogSXQgcmVtb3ZlcyB0aGUgYnJhY2tldHMgZnJvbSB0aGUgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIHBhcmFtZXRlci5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUga2V5IHdpdGhvdXQgdGhlIGJyYWNrZXRzLlxuICovXG5mdW5jdGlvbiByZW1vdmVCcmFja2V0cyhrZXkpIHtcbiAgcmV0dXJuIHV0aWxzLmVuZHNXaXRoKGtleSwgJ1tdJykgPyBrZXkuc2xpY2UoMCwgLTIpIDoga2V5O1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGF0aCwgYSBrZXksIGFuZCBhIGJvb2xlYW4sIGFuZCByZXR1cm5zIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgY3VycmVudCBvYmplY3QgYmVpbmcgaXRlcmF0ZWQgb3Zlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkb3RzIC0gSWYgdHJ1ZSwgdGhlIGtleSB3aWxsIGJlIHJlbmRlcmVkIHdpdGggZG90cyBpbnN0ZWFkIG9mIGJyYWNrZXRzLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cykge1xuICBpZiAoIXBhdGgpIHJldHVybiBrZXk7XG4gIHJldHVybiBwYXRoLmNvbmNhdChrZXkpLm1hcChmdW5jdGlvbiBlYWNoKHRva2VuLCBpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdG9rZW4gPSByZW1vdmVCcmFja2V0cyh0b2tlbik7XG4gICAgcmV0dXJuICFkb3RzICYmIGkgPyAnWycgKyB0b2tlbiArICddJyA6IHRva2VuO1xuICB9KS5qb2luKGRvdHMgPyAnLicgOiAnJyk7XG59XG5cbi8qKlxuICogSWYgdGhlIGFycmF5IGlzIGFuIGFycmF5IGFuZCBub25lIG9mIGl0cyBlbGVtZW50cyBhcmUgdmlzaXRhYmxlLCB0aGVuIGl0J3MgYSBmbGF0IGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzRmxhdEFycmF5KGFycikge1xuICByZXR1cm4gdXRpbHMuaXNBcnJheShhcnIpICYmICFhcnIuc29tZShpc1Zpc2l0YWJsZSk7XG59XG5cbmNvbnN0IHByZWRpY2F0ZXMgPSB1dGlscy50b0ZsYXRPYmplY3QodXRpbHMsIHt9LCBudWxsLCBmdW5jdGlvbiBmaWx0ZXIocHJvcCkge1xuICByZXR1cm4gL15pc1tBLVpdLy50ZXN0KHByb3ApO1xufSk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHs/T2JqZWN0fSBbZm9ybURhdGFdXG4gKiBAcGFyYW0gez9PYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMudmlzaXRvcl1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWV0YVRva2VucyA9IHRydWVdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRvdHMgPSBmYWxzZV1cbiAqIEBwYXJhbSB7P0Jvb2xlYW59IFtvcHRpb25zLmluZGV4ZXMgPSBmYWxzZV1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICoqL1xuXG4vKipcbiAqIEl0IGNvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gZm9ybSBkYXRhLlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIC0gVGhlIEZvcm1EYXRhIG9iamVjdCB0byBhcHBlbmQgdG8uXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB0b0Zvcm1EYXRhKG9iaiwgZm9ybURhdGEsIG9wdGlvbnMpIHtcbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGFyZ2V0IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgKEZvcm1EYXRhKSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBvcHRpb25zID0gdXRpbHMudG9GbGF0T2JqZWN0KG9wdGlvbnMsIHtcbiAgICBtZXRhVG9rZW5zOiB0cnVlLFxuICAgIGRvdHM6IGZhbHNlLFxuICAgIGluZGV4ZXM6IGZhbHNlXG4gIH0sIGZhbHNlLCBmdW5jdGlvbiBkZWZpbmVkKG9wdGlvbiwgc291cmNlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gICAgcmV0dXJuICF1dGlscy5pc1VuZGVmaW5lZChzb3VyY2Vbb3B0aW9uXSk7XG4gIH0pO1xuXG4gIGNvbnN0IG1ldGFUb2tlbnMgPSBvcHRpb25zLm1ldGFUb2tlbnM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICBjb25zdCB2aXNpdG9yID0gb3B0aW9ucy52aXNpdG9yIHx8IGRlZmF1bHRWaXNpdG9yO1xuICBjb25zdCBkb3RzID0gb3B0aW9ucy5kb3RzO1xuICBjb25zdCBpbmRleGVzID0gb3B0aW9ucy5pbmRleGVzO1xuICBjb25zdCBfQmxvYiA9IG9wdGlvbnMuQmxvYiB8fCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgQmxvYjtcbiAgY29uc3QgdXNlQmxvYiA9IF9CbG9iICYmIHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oZm9ybURhdGEpO1xuXG4gIGlmICghdXRpbHMuaXNGdW5jdGlvbih2aXNpdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3Zpc2l0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlICYmICFwYXRoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSBtZXRhVG9rZW5zID8ga2V5IDoga2V5LnNsaWNlKDAsIC0yKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHV0aWxzLmlzQXJyYXkodmFsdWUpICYmIGlzRmxhdEFycmF5KHZhbHVlKSkgfHxcbiAgICAgICAgKCh1dGlscy5pc0ZpbGVMaXN0KHZhbHVlKSB8fCB1dGlscy5lbmRzV2l0aChrZXksICdbXScpKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpXG4gICAgICAgICkpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IHJlbW92ZUJyYWNrZXRzKGtleSk7XG5cbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gZWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICBpbmRleGVzID09PSB0cnVlID8gcmVuZGVyS2V5KFtrZXldLCBpbmRleCwgZG90cykgOiAoaW5kZXhlcyA9PT0gbnVsbCA/IGtleSA6IGtleSArICdbXScpLFxuICAgICAgICAgICAgY29udmVydFZhbHVlKGVsKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzVmlzaXRhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHN0YWNrID0gW107XG5cbiAgY29uc3QgZXhwb3NlZEhlbHBlcnMgPSBPYmplY3QuYXNzaWduKHByZWRpY2F0ZXMsIHtcbiAgICBkZWZhdWx0VmlzaXRvcixcbiAgICBjb252ZXJ0VmFsdWUsXG4gICAgaXNWaXNpdGFibGVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGQodmFsdWUsIHBhdGgpIHtcbiAgICBpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm47XG5cbiAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICcgKyBwYXRoLmpvaW4oJy4nKSk7XG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWx1ZSk7XG5cbiAgICB1dGlscy5mb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiBlYWNoKGVsLCBrZXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9ICEodXRpbHMuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiB2aXNpdG9yLmNhbGwoXG4gICAgICAgIGZvcm1EYXRhLCBlbCwgdXRpbHMuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIGJ1aWxkKGVsLCBwYXRoID8gcGF0aC5jb25jYXQoa2V5KSA6IFtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscy5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbi8qKlxuICogSXQgZW5jb2RlcyBhIHN0cmluZyBieSByZXBsYWNpbmcgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGluIHRoZSB1bnJlc2VydmVkIHNldCB3aXRoXG4gKiB0aGVpciBwZXJjZW50LWVuY29kZWQgZXF1aXZhbGVudHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBlbmNvZGUuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlbmNvZGUkMShzdHIpIHtcbiAgY29uc3QgY2hhck1hcCA9IHtcbiAgICAnISc6ICclMjEnLFxuICAgIFwiJ1wiOiAnJTI3JyxcbiAgICAnKCc6ICclMjgnLFxuICAgICcpJzogJyUyOScsXG4gICAgJ34nOiAnJTdFJyxcbiAgICAnJTIwJzogJysnLFxuICAgICclMDAnOiAnXFx4MDAnXG4gIH07XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKX5dfCUyMHwlMDAvZywgZnVuY3Rpb24gcmVwbGFjZXIobWF0Y2gpIHtcbiAgICByZXR1cm4gY2hhck1hcFttYXRjaF07XG4gIH0pO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGFyYW1zIG9iamVjdCBhbmQgY29udmVydHMgaXQgdG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IHBhcmFtcyAtIFRoZSBwYXJhbWV0ZXJzIHRvIGJlIGNvbnZlcnRlZCB0byBhIEZvcm1EYXRhIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBwYXNzZWQgdG8gdGhlIEF4aW9zIGNvbnN0cnVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpIHtcbiAgdGhpcy5fcGFpcnMgPSBbXTtcblxuICBwYXJhbXMgJiYgdG9Gb3JtRGF0YShwYXJhbXMsIHRoaXMsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc1VSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGU7XG5cbnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiBhcHBlbmQobmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5fcGFpcnMucHVzaChbbmFtZSwgdmFsdWVdKTtcbn07XG5cbnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kZXIpIHtcbiAgY29uc3QgX2VuY29kZSA9IGVuY29kZXIgPyBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBlbmNvZGVyLmNhbGwodGhpcywgdmFsdWUsIGVuY29kZSQxKTtcbiAgfSA6IGVuY29kZSQxO1xuXG4gIHJldHVybiB0aGlzLl9wYWlycy5tYXAoZnVuY3Rpb24gZWFjaChwYWlyKSB7XG4gICAgcmV0dXJuIF9lbmNvZGUocGFpclswXSkgKyAnPScgKyBfZW5jb2RlKHBhaXJbMV0pO1xuICB9LCAnJykuam9pbignJicpO1xufTtcblxuLyoqXG4gKiBJdCByZXBsYWNlcyBhbGwgaW5zdGFuY2VzIG9mIHRoZSBjaGFyYWN0ZXJzIGA6YCwgYCRgLCBgLGAsIGArYCwgYFtgLCBhbmQgYF1gIHdpdGggdGhlaXJcbiAqIFVSSSBlbmNvZGVkIGNvdW50ZXJwYXJ0c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgVGhlIHZhbHVlIHRvIGJlIGVuY29kZWQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcGFyYW0gez9vYmplY3R9IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5mdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgb3B0aW9ucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIFxuICBjb25zdCBfZW5jb2RlID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuY29kZSB8fCBlbmNvZGU7XG5cbiAgY29uc3Qgc2VyaWFsaXplRm4gPSBvcHRpb25zICYmIG9wdGlvbnMuc2VyaWFsaXplO1xuXG4gIGxldCBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChzZXJpYWxpemVGbikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBzZXJpYWxpemVGbihwYXJhbXMsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSB1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpID9cbiAgICAgIHBhcmFtcy50b1N0cmluZygpIDpcbiAgICAgIG5ldyBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpLnRvU3RyaW5nKF9lbmNvZGUpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICBjb25zdCBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoXCIjXCIpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmNlcHRvciB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICBmbihoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyJDEgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cbnZhciB0cmFuc2l0aW9uYWxEZWZhdWx0cyA9IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcblxudmFyIFVSTFNlYXJjaFBhcmFtcyQxID0gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcblxudmFyIEZvcm1EYXRhJDEgPSB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnID8gRm9ybURhdGEgOiBudWxsO1xuXG52YXIgQmxvYiQxID0gdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnID8gQmxvYiA6IG51bGw7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBpc1N0YW5kYXJkQnJvd3NlckVudiA9ICgoKSA9PiB7XG4gIGxldCBwcm9kdWN0O1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKFxuICAgIChwcm9kdWN0ID0gbmF2aWdhdG9yLnByb2R1Y3QpID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgcHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICBwcm9kdWN0ID09PSAnTlMnKVxuICApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcbn0pKCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIHdlYldvcmtlciBlbnZpcm9ubWVudFxuICpcbiAqIEFsdGhvdWdoIHRoZSBgaXNTdGFuZGFyZEJyb3dzZXJFbnZgIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdFxuICogYGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyYCwgdGhlIFdlYldvcmtlciB3aWxsIHN0aWxsIGJlXG4gKiBmaWx0ZXJlZCBvdXQgZHVlIHRvIGl0cyBqdWRnbWVudCBzdGFuZGFyZFxuICogYHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdgLlxuICogVGhpcyBsZWFkcyB0byBhIHByb2JsZW0gd2hlbiBheGlvcyBwb3N0IGBGb3JtRGF0YWAgaW4gd2ViV29ya2VyXG4gKi9cbiBjb25zdCBpc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgIHR5cGVvZiBzZWxmLmltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbidcbiAgKTtcbn0pKCk7XG5cblxudmFyIHBsYXRmb3JtID0ge1xuICBpc0Jyb3dzZXI6IHRydWUsXG4gIGNsYXNzZXM6IHtcbiAgICBVUkxTZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyQxLFxuICAgIEZvcm1EYXRhOiBGb3JtRGF0YSQxLFxuICAgIEJsb2I6IEJsb2IkMVxuICB9LFxuICBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgaXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXG59O1xuXG5mdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIE9iamVjdC5hc3NpZ24oe1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uKHZhbHVlLCBrZXksIHBhdGgsIGhlbHBlcnMpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pc05vZGUgJiYgdXRpbHMuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGtleSwgdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVscGVycy5kZWZhdWx0VmlzaXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfSwgb3B0aW9ucykpO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscy5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG59O1xuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nLCB0cmllcyB0byBwYXJzZSBpdCwgYW5kIGlmIGl0IGZhaWxzLCBpdCByZXR1cm5zIHRoZSBzdHJpbmdpZmllZCB2ZXJzaW9uXG4gKiBvZiB0aGUgaW5wdXRcbiAqXG4gKiBAcGFyYW0ge2FueX0gcmF3VmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgc3RyaW5naWZpZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJzZXIgLSBBIGZ1bmN0aW9uIHRoYXQgcGFyc2VzIGEgc3RyaW5nIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVuY29kZXIgLSBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSB2YWx1ZSBhbmQgcmV0dXJucyBhIHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgdGhlIHJhd1ZhbHVlLlxuICovXG5mdW5jdGlvbiBzdHJpbmdpZnlTYWZlbHkocmF3VmFsdWUsIHBhcnNlciwgZW5jb2Rlcikge1xuICBpZiAodXRpbHMuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzLnRyaW0ocmF3VmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLm5hbWUgIT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gKGVuY29kZXIgfHwgSlNPTi5zdHJpbmdpZnkpKHJhd1ZhbHVlKTtcbn1cblxuY29uc3QgZGVmYXVsdHMgPSB7XG5cbiAgdHJhbnNpdGlvbmFsOiB0cmFuc2l0aW9uYWxEZWZhdWx0cyxcblxuICBhZGFwdGVyOiBbJ3hocicsICdodHRwJ10sXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gaGVhZGVycy5nZXRDb250ZW50VHlwZSgpIHx8ICcnO1xuICAgIGNvbnN0IGhhc0pTT05Db250ZW50VHlwZSA9IGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL2pzb24nKSA+IC0xO1xuICAgIGNvbnN0IGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCAmJiB1dGlscy5pc0hUTUxGb3JtKGRhdGEpKSB7XG4gICAgICBkYXRhID0gbmV3IEZvcm1EYXRhKGRhdGEpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9ybURhdGEgPSB1dGlscy5pc0Zvcm1EYXRhKGRhdGEpO1xuXG4gICAgaWYgKGlzRm9ybURhdGEpIHtcbiAgICAgIGlmICghaGFzSlNPTkNvbnRlbnRUeXBlKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCB0aGlzLmZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscy5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAoZGF0YSAmJiB1dGlscy5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgICB9XG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbnZhciBkZWZhdWx0cyQxID0gZGVmYXVsdHM7XG5cbi8vIFJhd0F4aW9zSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbmNvbnN0IGlnbm9yZUR1cGxpY2F0ZU9mID0gdXRpbHMudG9PYmplY3RTZXQoW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl0pO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmF3SGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKlxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xudmFyIHBhcnNlSGVhZGVycyA9IHJhd0hlYWRlcnMgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB7fTtcbiAgbGV0IGtleTtcbiAgbGV0IHZhbDtcbiAgbGV0IGk7XG5cbiAgcmF3SGVhZGVycyAmJiByYXdIZWFkZXJzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IGxpbmUuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IGxpbmUuc3Vic3RyaW5nKGkgKyAxKS50cmltKCk7XG5cbiAgICBpZiAoIWtleSB8fCAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2Zba2V5XSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSkge1xuICAgICAgICBwYXJzZWRba2V5XS5wdXNoKHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcbiAgfVxuXG4gIGlmIChpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgICB2YWx1ZSA9IGhlYWRlcjtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc1JlZ0V4cChmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci50ZXN0KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKFthLXpcXGRdKShcXHcqKS9nLCAodywgY2hhciwgc3RyKSA9PiB7XG4gICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEFjY2Vzc29ycyhvYmosIGhlYWRlcikge1xuICBjb25zdCBhY2Nlc3Nvck5hbWUgPSB1dGlscy50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZigha2V5IHx8IHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8IF9yZXdyaXRlID09PSB0cnVlIHx8IChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZih1dGlscy5pc1N0cmluZyhoZWFkZXIpICYmIChoZWFkZXIgPSBoZWFkZXIudHJpbSgpKSAmJiAhaXNWYWxpZEhlYWRlck5hbWUoaGVhZGVyKSkge1xuICAgICAgc2V0SGVhZGVycyhwYXJzZUhlYWRlcnMoaGVhZGVyKSwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXIgIT0gbnVsbCAmJiBzZXRIZWFkZXIodmFsdWVPclJld3JpdGUsIGhlYWRlciwgcmV3cml0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQoaGVhZGVyLCBwYXJzZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICBpZiAoIXBhcnNlcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuY2FsbCh0aGlzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1JlZ0V4cChwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5leGVjKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcnNlciBtdXN0IGJlIGJvb2xlYW58cmVnZXhwfGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICByZXR1cm4gISEoa2V5ICYmIHRoaXNba2V5XSAhPT0gdW5kZWZpbmVkICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlSGVhZGVyKF9oZWFkZXIpIHtcbiAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmIChfaGVhZGVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgX2hlYWRlcik7XG5cbiAgICAgICAgaWYgKGtleSAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZShzZWxmLCBzZWxmW2tleV0sIGtleSwgbWF0Y2hlcikpKSB7XG4gICAgICAgICAgZGVsZXRlIHNlbGZba2V5XTtcblxuICAgICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXkoaGVhZGVyKSkge1xuICAgICAgaGVhZGVyLmZvckVhY2goZGVsZXRlSGVhZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlSGVhZGVyKGhlYWRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBjbGVhcihtYXRjaGVyKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICAgIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICBpZighbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyLCB0cnVlKSkge1xuICAgICAgICBkZWxldGUgdGhpc1trZXldO1xuICAgICAgICBkZWxldGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIG5vcm1hbGl6ZShmb3JtYXQpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KGhlYWRlcnMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgc2VsZltrZXldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBmb3JtYXQgPyBmb3JtYXRIZWFkZXIoaGVhZGVyKSA6IFN0cmluZyhoZWFkZXIpLnRyaW0oKTtcblxuICAgICAgaWYgKG5vcm1hbGl6ZWQgIT09IGhlYWRlcikge1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgfVxuXG4gICAgICBzZWxmW25vcm1hbGl6ZWRdID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWRdID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29uY2F0KC4uLnRhcmdldHMpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jb25jYXQodGhpcywgLi4udGFyZ2V0cyk7XG4gIH1cblxuICB0b0pTT04oYXNTdHJpbmdzKSB7XG4gICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IGZhbHNlICYmIChvYmpbaGVhZGVyXSA9IGFzU3RyaW5ncyAmJiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywgJykgOiB2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKS5tYXAoKFtoZWFkZXIsIHZhbHVlXSkgPT4gaGVhZGVyICsgJzogJyArIHZhbHVlKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gJ0F4aW9zSGVhZGVycyc7XG4gIH1cblxuICBzdGF0aWMgZnJvbSh0aGluZykge1xuICAgIHJldHVybiB0aGluZyBpbnN0YW5jZW9mIHRoaXMgPyB0aGluZyA6IG5ldyB0aGlzKHRoaW5nKTtcbiAgfVxuXG4gIHN0YXRpYyBjb25jYXQoZmlyc3QsIC4uLnRhcmdldHMpIHtcbiAgICBjb25zdCBjb21wdXRlZCA9IG5ldyB0aGlzKGZpcnN0KTtcblxuICAgIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiBjb21wdXRlZC5zZXQodGFyZ2V0KSk7XG5cbiAgICByZXR1cm4gY29tcHV0ZWQ7XG4gIH1cblxuICBzdGF0aWMgYWNjZXNzb3IoaGVhZGVyKSB7XG4gICAgY29uc3QgaW50ZXJuYWxzID0gdGhpc1skaW50ZXJuYWxzXSA9ICh0aGlzWyRpbnRlcm5hbHNdID0ge1xuICAgICAgYWNjZXNzb3JzOiB7fVxuICAgIH0pO1xuXG4gICAgY29uc3QgYWNjZXNzb3JzID0gaW50ZXJuYWxzLmFjY2Vzc29ycztcbiAgICBjb25zdCBwcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZUFjY2Vzc29yKF9oZWFkZXIpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghYWNjZXNzb3JzW2xIZWFkZXJdKSB7XG4gICAgICAgIGJ1aWxkQWNjZXNzb3JzKHByb3RvdHlwZSwgX2hlYWRlcik7XG4gICAgICAgIGFjY2Vzc29yc1tsSGVhZGVyXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXRpbHMuaXNBcnJheShoZWFkZXIpID8gaGVhZGVyLmZvckVhY2goZGVmaW5lQWNjZXNzb3IpIDogZGVmaW5lQWNjZXNzb3IoaGVhZGVyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbkF4aW9zSGVhZGVycy5hY2Nlc3NvcihbJ0NvbnRlbnQtVHlwZScsICdDb250ZW50LUxlbmd0aCcsICdBY2NlcHQnLCAnQWNjZXB0LUVuY29kaW5nJywgJ1VzZXItQWdlbnQnLCAnQXV0aG9yaXphdGlvbiddKTtcblxudXRpbHMuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMucHJvdG90eXBlKTtcbnV0aWxzLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzKTtcblxudmFyIEF4aW9zSGVhZGVycyQxID0gQXhpb3NIZWFkZXJzO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzJDE7XG4gIGNvbnN0IGNvbnRleHQgPSByZXNwb25zZSB8fCBjb25maWc7XG4gIGNvbnN0IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaGVhZGVycy5ub3JtYWxpemUoKTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdD19IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3Q9fSByZXF1ZXN0IFRoZSByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxlZEVycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIEF4aW9zRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlID09IG51bGwgPyAnY2FuY2VsZWQnIDogbWVzc2FnZSwgQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQsIGNvbmZpZywgcmVxdWVzdCk7XG4gIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbn1cblxudXRpbHMuaW5oZXJpdHMoQ2FuY2VsZWRFcnJvciwgQXhpb3NFcnJvciwge1xuICBfX0NBTkNFTF9fOiB0cnVlXG59KTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgcmVzcG9uc2UuXG4gKi9cbmZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufVxuXG52YXIgY29va2llcyA9IHBsYXRmb3JtLmlzU3RhbmRhcmRCcm93c2VyRW52ID9cblxuLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgY29uc3QgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4vLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5mdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuXG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcGxhdGZvcm0uaXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4vLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3Rcbi8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIGNvbnN0IG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGNvbnN0IHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGxldCBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgbGV0IGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKCk7XG5cbmZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIGNvbnN0IG1hdGNoID0gL14oWy0rXFx3XXsxLDI1fSkoOj9cXC9cXC98OikvLmV4ZWModXJsKTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdIHx8ICcnO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSBkYXRhIG1heFJhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2FtcGxlc0NvdW50PSAxMF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbbWluPSAxMDAwXVxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBzcGVlZG9tZXRlcihzYW1wbGVzQ291bnQsIG1pbikge1xuICBzYW1wbGVzQ291bnQgPSBzYW1wbGVzQ291bnQgfHwgMTA7XG4gIGNvbnN0IGJ5dGVzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGNvbnN0IHRpbWVzdGFtcHMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgbGV0IGhlYWQgPSAwO1xuICBsZXQgdGFpbCA9IDA7XG4gIGxldCBmaXJzdFNhbXBsZVRTO1xuXG4gIG1pbiA9IG1pbiAhPT0gdW5kZWZpbmVkID8gbWluIDogMTAwMDtcblxuICByZXR1cm4gZnVuY3Rpb24gcHVzaChjaHVua0xlbmd0aCkge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgICBjb25zdCBzdGFydGVkQXQgPSB0aW1lc3RhbXBzW3RhaWxdO1xuXG4gICAgaWYgKCFmaXJzdFNhbXBsZVRTKSB7XG4gICAgICBmaXJzdFNhbXBsZVRTID0gbm93O1xuICAgIH1cblxuICAgIGJ5dGVzW2hlYWRdID0gY2h1bmtMZW5ndGg7XG4gICAgdGltZXN0YW1wc1toZWFkXSA9IG5vdztcblxuICAgIGxldCBpID0gdGFpbDtcbiAgICBsZXQgYnl0ZXNDb3VudCA9IDA7XG5cbiAgICB3aGlsZSAoaSAhPT0gaGVhZCkge1xuICAgICAgYnl0ZXNDb3VudCArPSBieXRlc1tpKytdO1xuICAgICAgaSA9IGkgJSBzYW1wbGVzQ291bnQ7XG4gICAgfVxuXG4gICAgaGVhZCA9IChoZWFkICsgMSkgJSBzYW1wbGVzQ291bnQ7XG5cbiAgICBpZiAoaGVhZCA9PT0gdGFpbCkge1xuICAgICAgdGFpbCA9ICh0YWlsICsgMSkgJSBzYW1wbGVzQ291bnQ7XG4gICAgfVxuXG4gICAgaWYgKG5vdyAtIGZpcnN0U2FtcGxlVFMgPCBtaW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYXNzZWQgPSBzdGFydGVkQXQgJiYgbm93IC0gc3RhcnRlZEF0O1xuXG4gICAgcmV0dXJuIHBhc3NlZCA/IE1hdGgucm91bmQoYnl0ZXNDb3VudCAqIDEwMDAgLyBwYXNzZWQpIDogdW5kZWZpbmVkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwcm9ncmVzc0V2ZW50UmVkdWNlcihsaXN0ZW5lciwgaXNEb3dubG9hZFN0cmVhbSkge1xuICBsZXQgYnl0ZXNOb3RpZmllZCA9IDA7XG4gIGNvbnN0IF9zcGVlZG9tZXRlciA9IHNwZWVkb21ldGVyKDUwLCAyNTApO1xuXG4gIHJldHVybiBlID0+IHtcbiAgICBjb25zdCBsb2FkZWQgPSBlLmxvYWRlZDtcbiAgICBjb25zdCB0b3RhbCA9IGUubGVuZ3RoQ29tcHV0YWJsZSA/IGUudG90YWwgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgcHJvZ3Jlc3NCeXRlcyA9IGxvYWRlZCAtIGJ5dGVzTm90aWZpZWQ7XG4gICAgY29uc3QgcmF0ZSA9IF9zcGVlZG9tZXRlcihwcm9ncmVzc0J5dGVzKTtcbiAgICBjb25zdCBpblJhbmdlID0gbG9hZGVkIDw9IHRvdGFsO1xuXG4gICAgYnl0ZXNOb3RpZmllZCA9IGxvYWRlZDtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBsb2FkZWQsXG4gICAgICB0b3RhbCxcbiAgICAgIHByb2dyZXNzOiB0b3RhbCA/IChsb2FkZWQgLyB0b3RhbCkgOiB1bmRlZmluZWQsXG4gICAgICBieXRlczogcHJvZ3Jlc3NCeXRlcyxcbiAgICAgIHJhdGU6IHJhdGUgPyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXN0aW1hdGVkOiByYXRlICYmIHRvdGFsICYmIGluUmFuZ2UgPyAodG90YWwgLSBsb2FkZWQpIC8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGV2ZW50OiBlXG4gICAgfTtcblxuICAgIGRhdGFbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ10gPSB0cnVlO1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH07XG59XG5cbmNvbnN0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCc7XG5cbnZhciB4aHJBZGFwdGVyID0gaXNYSFJBZGFwdGVyU3VwcG9ydGVkICYmIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBsZXQgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgIGNvbnN0IHJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgbGV0IG9uQ2FuY2VsZWQ7XG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBpZiAocGxhdGZvcm0uaXNTdGFuZGFyZEJyb3dzZXJFbnYgfHwgcGxhdGZvcm0uaXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUoZmFsc2UpOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZSgnbXVsdGlwYXJ0L2Zvcm0tZGF0YTsnLCBmYWxzZSk7IC8vIG1vYmlsZS9kZXNrdG9wIGFwcCBmcmFtZXdvcmtzXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIGNvbnN0IHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICBjb25zdCBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgOiAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKSk7XG4gICAgfVxuXG4gICAgY29uc3QgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIGZ1bmN0aW9uIG9ubG9hZGVuZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShcbiAgICAgICAgJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICBsZXQgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0ID8gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IGNvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAocGxhdGZvcm0uaXNTdGFuZGFyZEJyb3dzZXJFbnYpIHtcbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgY29uc3QgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSlcbiAgICAgICAgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lICYmIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzLnNldChjb25maWcueHNyZkhlYWRlck5hbWUsIHhzcmZWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgIHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQgJiYgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUobnVsbCk7XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycy50b0pTT04oKSwgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFjb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuIHx8IGNvbmZpZy5zaWduYWwpIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBvbkNhbmNlbGVkID0gY2FuY2VsID0+IHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IGNhbmNlbC50eXBlID8gbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnLCByZXF1ZXN0KSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4gJiYgY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChjb25maWcuc2lnbmFsKSB7XG4gICAgICAgIGNvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IGNvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woZnVsbFBhdGgpO1xuXG4gICAgaWYgKHByb3RvY29sICYmIHBsYXRmb3JtLnByb3RvY29scy5pbmRleE9mKHByb3RvY29sKSA9PT0gLTEpIHtcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignVW5zdXBwb3J0ZWQgcHJvdG9jb2wgJyArIHByb3RvY29sICsgJzonLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgY29uZmlnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhIHx8IG51bGwpO1xuICB9KTtcbn07XG5cbmNvbnN0IGtub3duQWRhcHRlcnMgPSB7XG4gIGh0dHA6IGh0dHBBZGFwdGVyLFxuICB4aHI6IHhockFkYXB0ZXJcbn07XG5cbnV0aWxzLmZvckVhY2goa25vd25BZGFwdGVycywgKGZuLCB2YWx1ZSkgPT4ge1xuICBpZihmbikge1xuICAgIHRyeSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICduYW1lJywge3ZhbHVlfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ2FkYXB0ZXJOYW1lJywge3ZhbHVlfSk7XG4gIH1cbn0pO1xuXG52YXIgYWRhcHRlcnMgPSB7XG4gIGdldEFkYXB0ZXI6IChhZGFwdGVycykgPT4ge1xuICAgIGFkYXB0ZXJzID0gdXRpbHMuaXNBcnJheShhZGFwdGVycykgPyBhZGFwdGVycyA6IFthZGFwdGVyc107XG5cbiAgICBjb25zdCB7bGVuZ3RofSA9IGFkYXB0ZXJzO1xuICAgIGxldCBuYW1lT3JBZGFwdGVyO1xuICAgIGxldCBhZGFwdGVyO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgICAgaWYoKGFkYXB0ZXIgPSB1dGlscy5pc1N0cmluZyhuYW1lT3JBZGFwdGVyKSA/IGtub3duQWRhcHRlcnNbbmFtZU9yQWRhcHRlci50b0xvd2VyQ2FzZSgpXSA6IG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghYWRhcHRlcikge1xuICAgICAgaWYgKGFkYXB0ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICAgIGBBZGFwdGVyICR7bmFtZU9yQWRhcHRlcn0gaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnRgLFxuICAgICAgICAgICdFUlJfTk9UX1NVUFBPUlQnXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgdXRpbHMuaGFzT3duUHJvcChrbm93bkFkYXB0ZXJzLCBuYW1lT3JBZGFwdGVyKSA/XG4gICAgICAgICAgYEFkYXB0ZXIgJyR7bmFtZU9yQWRhcHRlcn0nIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJ1aWxkYCA6XG4gICAgICAgICAgYFVua25vd24gYWRhcHRlciAnJHtuYW1lT3JBZGFwdGVyfSdgXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghdXRpbHMuaXNGdW5jdGlvbihhZGFwdGVyKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYWRhcHRlciBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgIH1cblxuICAgIHJldHVybiBhZGFwdGVyO1xuICB9LFxuICBhZGFwdGVyczoga25vd25BZGFwdGVyc1xufTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxuXG4gIGlmIChjb25maWcuc2lnbmFsICYmIGNvbmZpZy5zaWduYWwuYWJvcnRlZCkge1xuICAgIHRocm93IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5mdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oY29uZmlnLmhlYWRlcnMpO1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgY29uZmlnLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgaWYgKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXS5pbmRleE9mKGNvbmZpZy5tZXRob2QpICE9PSAtMSkge1xuICAgIGNvbmZpZy5oZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLCBmYWxzZSk7XG4gIH1cblxuICBjb25zdCBhZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcihjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cyQxLmFkYXB0ZXIpO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgY29uZmlnLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgcmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20ocmVzcG9uc2UuaGVhZGVycyk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShyZWFzb24ucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufVxuXG5jb25zdCBoZWFkZXJzVG9PYmplY3QgPSAodGhpbmcpID0+IHRoaW5nIGluc3RhbmNlb2YgQXhpb3NIZWFkZXJzJDEgPyB0aGluZy50b0pTT04oKSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGFkYXB0ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VUeXBlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZDb29raWVOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZIZWFkZXJOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25Eb3dubG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGRlY29tcHJlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Q29udGVudExlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhCb2R5TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGJlZm9yZVJlZGlyZWN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zcG9ydDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cHNBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBjYW5jZWxUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBzb2NrZXRQYXRoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlRW5jb2Rpbmc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdmFsaWRhdGVTdGF0dXM6IG1lcmdlRGlyZWN0S2V5cyxcbiAgICBoZWFkZXJzOiAoYSwgYikgPT4gbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSwgdHJ1ZSlcbiAgfTtcblxuICB1dGlscy5mb3JFYWNoKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZzEsIGNvbmZpZzIpKSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICBjb25zdCBtZXJnZSA9IG1lcmdlTWFwW3Byb3BdIHx8IG1lcmdlRGVlcFByb3BlcnRpZXM7XG4gICAgY29uc3QgY29uZmlnVmFsdWUgPSBtZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdLCBwcm9wKTtcbiAgICAodXRpbHMuaXNVbmRlZmluZWQoY29uZmlnVmFsdWUpICYmIG1lcmdlICE9PSBtZXJnZURpcmVjdEtleXMpIHx8IChjb25maWdbcHJvcF0gPSBjb25maWdWYWx1ZSk7XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59XG5cbmNvbnN0IFZFUlNJT04gPSBcIjEuNC4wXCI7XG5cbmNvbnN0IHZhbGlkYXRvcnMkMSA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9ycyQxW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxuY29uc3QgZGVwcmVjYXRlZFdhcm5pbmdzID0ge307XG5cbi8qKlxuICogVHJhbnNpdGlvbmFsIG9wdGlvbiB2YWxpZGF0b3JcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMkMS50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtib29sZWFuP30gYWxsb3dVbmtub3duXG4gKlxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBjb25zdCBvcHQgPSBrZXlzW2ldO1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IHNjaGVtYVtvcHRdO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0aW9ucyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb24gJyArIG9wdCArICcgbXVzdCBiZSAnICsgcmVzdWx0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYWxsb3dVbmtub3duICE9PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignVW5rbm93biBvcHRpb24gJyArIG9wdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTik7XG4gICAgfVxuICB9XG59XG5cbnZhciB2YWxpZGF0b3IgPSB7XG4gIGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnMkMVxufTtcblxuY29uc3QgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5jbGFzcyBBeGlvcyB7XG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlciQxKCksXG4gICAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlciQxKClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICAgIGlmICh0eXBlb2YgY29uZmlnT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICAgIH1cblxuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBjb25zdCB7dHJhbnNpdGlvbmFsLCBwYXJhbXNTZXJpYWxpemVyLCBoZWFkZXJzfSA9IGNvbmZpZztcblxuICAgIGlmICh0cmFuc2l0aW9uYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnModHJhbnNpdGlvbmFsLCB7XG4gICAgICAgIHNpbGVudEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBmb3JjZWRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgY2xhcmlmeVRpbWVvdXRFcnJvcjogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKVxuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXNTZXJpYWxpemVyICE9IG51bGwpIHtcbiAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHBhcmFtc1NlcmlhbGl6ZXIpKSB7XG4gICAgICAgIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyID0ge1xuICAgICAgICAgIHNlcmlhbGl6ZTogcGFyYW1zU2VyaWFsaXplclxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnMocGFyYW1zU2VyaWFsaXplciwge1xuICAgICAgICAgIGVuY29kZTogdmFsaWRhdG9ycy5mdW5jdGlvbixcbiAgICAgICAgICBzZXJpYWxpemU6IHZhbGlkYXRvcnMuZnVuY3Rpb25cbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgICBjb25maWcubWV0aG9kID0gKGNvbmZpZy5tZXRob2QgfHwgdGhpcy5kZWZhdWx0cy5tZXRob2QgfHwgJ2dldCcpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBsZXQgY29udGV4dEhlYWRlcnM7XG5cbiAgICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgICBjb250ZXh0SGVhZGVycyA9IGhlYWRlcnMgJiYgdXRpbHMubWVyZ2UoXG4gICAgICBoZWFkZXJzLmNvbW1vbixcbiAgICAgIGhlYWRlcnNbY29uZmlnLm1ldGhvZF1cbiAgICApO1xuXG4gICAgY29udGV4dEhlYWRlcnMgJiYgdXRpbHMuZm9yRWFjaChcbiAgICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgICAgKG1ldGhvZCkgPT4ge1xuICAgICAgICBkZWxldGUgaGVhZGVyc1ttZXRob2RdO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmNvbmNhdChjb250ZXh0SGVhZGVycywgaGVhZGVycyk7XG5cbiAgICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gICAgY29uc3QgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICBsZXQgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgbGV0IHByb21pc2U7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsZW47XG5cbiAgICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgICAgY29uc3QgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LmJpbmQodGhpcyksIHVuZGVmaW5lZF07XG4gICAgICBjaGFpbi51bnNoaWZ0LmFwcGx5KGNoYWluLCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBjaGFpbi5wdXNoLmFwcGx5KGNoYWluLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgbGVuID0gY2hhaW4ubGVuZ3RoO1xuXG4gICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW5baSsrXSwgY2hhaW5baSsrXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIGxlbiA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIGxldCBuZXdDb25maWcgPSBjb25maWc7XG5cbiAgICBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuICB9XG59XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBpc0Zvcm0gPyB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgICB9IDoge30sXG4gICAgICAgIHVybCxcbiAgICAgICAgZGF0YVxuICAgICAgfSkpO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xufSk7XG5cbnZhciBBeGlvcyQxID0gQXhpb3M7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMge0NhbmNlbFRva2VufVxuICovXG5jbGFzcyBDYW5jZWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTtcblxuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IHRoaXM7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuKGNhbmNlbCA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gb25mdWxmaWxsZWQgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICAgKi9cbiAgdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIHRocm93IHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbFxuICAgIH07XG4gIH1cbn1cblxudmFyIENhbmNlbFRva2VuJDEgPSBDYW5jZWxUb2tlbjtcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuXG5jb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxufTtcblxuT2JqZWN0LmVudHJpZXMoSHR0cFN0YXR1c0NvZGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICBIdHRwU3RhdHVzQ29kZVt2YWx1ZV0gPSBrZXk7XG59KTtcblxudmFyIEh0dHBTdGF0dXNDb2RlJDEgPSBIdHRwU3RhdHVzQ29kZTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm5zIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICBjb25zdCBjb250ZXh0ID0gbmV3IEF4aW9zJDEoZGVmYXVsdENvbmZpZyk7XG4gIGNvbnN0IGluc3RhbmNlID0gYmluZChBeGlvcyQxLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zJDEucHJvdG90eXBlLCBjb250ZXh0LCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQsIG51bGwsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuY29uc3QgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyQxKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zJDE7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuJDE7XG5heGlvcy5pc0NhbmNlbCA9IGlzQ2FuY2VsO1xuYXhpb3MuVkVSU0lPTiA9IFZFUlNJT047XG5heGlvcy50b0Zvcm1EYXRhID0gdG9Gb3JtRGF0YTtcblxuLy8gRXhwb3NlIEF4aW9zRXJyb3IgY2xhc3NcbmF4aW9zLkF4aW9zRXJyb3IgPSBBeGlvc0Vycm9yO1xuXG4vLyBhbGlhcyBmb3IgQ2FuY2VsZWRFcnJvciBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuYXhpb3MuQ2FuY2VsID0gYXhpb3MuQ2FuY2VsZWRFcnJvcjtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gc3ByZWFkO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSBpc0F4aW9zRXJyb3I7XG5cbi8vIEV4cG9zZSBtZXJnZUNvbmZpZ1xuYXhpb3MubWVyZ2VDb25maWcgPSBtZXJnZUNvbmZpZztcblxuYXhpb3MuQXhpb3NIZWFkZXJzID0gQXhpb3NIZWFkZXJzJDE7XG5cbmF4aW9zLmZvcm1Ub0pTT04gPSB0aGluZyA9PiBmb3JtRGF0YVRvSlNPTih1dGlscy5pc0hUTUxGb3JtKHRoaW5nKSA/IG5ldyBGb3JtRGF0YSh0aGluZykgOiB0aGluZyk7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGUkMTtcblxuYXhpb3MuZGVmYXVsdCA9IGF4aW9zO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXhpb3MuY2pzLm1hcFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9saWIvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOlsiRG9tYWluIiwiZGF0YSIsInJlY2VpdmluZyIsInNlbmRpbmciLCJuYW1lIiwicmVxdWlyZV90bHMiLCJza2lwX3ZlcmlmaWNhdGlvbiIsInN0YXRlIiwid2lsZGNhcmQiLCJzcGFtX2FjdGlvbiIsImNyZWF0ZWRfYXQiLCJzbXRwX3Bhc3N3b3JkIiwic210cF9sb2dpbiIsInR5cGUiLCJyZWNlaXZpbmdfZG5zX3JlY29yZHMiLCJzZW5kaW5nX2Ruc19yZWNvcmRzIiwiZHluYW1pY0tleXMiLCJkeW5hbWljUHJvcGVydGllcyIsInJlZHVjZSIsImFjYyIsInByb3BlcnR5TmFtZSIsInByb3AiLCJPYmplY3QiLCJhc3NpZ24iLCJ1cmxfam9pbl8xIiwiX19pbXBvcnREZWZhdWx0IiwicmVxdWlyZSIsIkVycm9yXzEiLCJkb21haW5fMSIsIkRvbWFpbnNDbGllbnQiLCJyZXF1ZXN0IiwiZG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJkb21haW5UZW1wbGF0ZXNDbGllbnQiLCJkb21haW5UYWdzQ2xpZW50IiwiZG9tYWluQ3JlZGVudGlhbHMiLCJkb21haW5UZW1wbGF0ZXMiLCJkb21haW5UYWdzIiwicHJvdG90eXBlIiwiX2hhbmRsZUJvb2xWYWx1ZXMiLCJwcm9wc0ZvclJlcGxhY2VtZW50IiwicmVwbGFjZWRQcm9wcyIsImtleXMiLCJrZXkiLCJ2YWx1ZSIsInRvU3RyaW5nIiwiX19hc3NpZ24iLCJfcGFyc2VNZXNzYWdlIiwicmVzcG9uc2UiLCJib2R5IiwicGFyc2VEb21haW5MaXN0IiwiaXRlbXMiLCJtYXAiLCJpdGVtIiwiZGVmYXVsdCIsIl9wYXJzZURvbWFpbiIsImRvbWFpbiIsIl9wYXJzZVRyYWNraW5nU2V0dGluZ3MiLCJ0cmFja2luZyIsIl9wYXJzZVRyYWNraW5nVXBkYXRlIiwibGlzdCIsInF1ZXJ5IiwiX3RoaXMiLCJnZXQiLCJ0aGVuIiwicmVzIiwiY29uY2F0IiwiY3JlYXRlIiwicG9zdE9iaiIsInBvc3RXaXRoRkQiLCJ1cGRhdGUiLCJwdXREYXRhIiwicHV0V2l0aEZEIiwidmVyaWZ5IiwicHV0IiwiZGVzdHJveSIsImRlbGV0ZSIsImdldENvbm5lY3Rpb24iLCJjb25uZWN0aW9uIiwidXBkYXRlQ29ubmVjdGlvbiIsImdldFRyYWNraW5nIiwidXBkYXRlVHJhY2tpbmciLCJhY3RpdmUiLCJzdGF0dXMiLCJzdGF0dXNUZXh0IiwibWVzc2FnZSIsImdldElwcyIsIl9hIiwiYXNzaWduSXAiLCJpcCIsImRlbGV0ZUlwIiwibGlua0lwUG9vbCIsInBvb2xJZCIsInBvb2xfaWQiLCJ1bmxpbmtJcFBvbGwiLCJyZXBsYWNlbWVudCIsInNlYXJjaFBhcmFtcyIsInVwZGF0ZURLSU1BdXRob3JpdHkiLCJzZWxmIiwidXBkYXRlREtJTVNlbGVjdG9yIiwiZGtpbVNlbGVjdG9yIiwidXBkYXRlV2ViUHJlZml4Iiwid2ViUHJlZml4IiwiRG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJiYXNlUm91dGUiLCJfcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QiLCJ0b3RhbENvdW50IiwidG90YWxfY291bnQiLCJfcGFyc2VNZXNzYWdlUmVzcG9uc2UiLCJyZXN1bHQiLCJfcGFyc2VEZWxldGVkUmVzcG9uc2UiLCJzcGVjIiwiY3JlZGVudGlhbHNMb2dpbiIsIk5hdmlnYXRpb25UaHJ1UGFnZXNfMSIsIkRvbWFpblRhZyIsInRhZ0luZm8iLCJ0YWciLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJleHBvcnRzIiwiRG9tYWluVGFnU3RhdGlzdGljIiwidGFnU3RhdGlzdGljSW5mbyIsInN0YXJ0IiwiZW5kIiwicmVzb2x1dGlvbiIsInN0YXRzIiwic3RhdCIsInRpbWUiLCJEb21haW5UYWdzQ2xpZW50IiwiX3N1cGVyIiwiX19leHRlbmRzIiwiY2FsbCIsInBhcnNlTGlzdCIsInBhZ2VzIiwicGFyc2VQYWdlTGlua3MiLCJfcGFyc2VUYWdTdGF0aXN0aWMiLCJyZXF1ZXN0TGlzdFdpdGhQYWdlcyIsInN0YXRpc3RpYyIsImNvdW50cmllcyIsInByb3ZpZGVycyIsImRldmljZXMiLCJEb21haW5UZW1wbGF0ZUl0ZW0iLCJkb21haW5UZW1wbGF0ZUZyb21BUEkiLCJjcmVhdGVkQXQiLCJjcmVhdGVkQnkiLCJpZCIsInZlcnNpb24iLCJ2ZXJzaW9ucyIsImxlbmd0aCIsIkRvbWFpblRlbXBsYXRlc0NsaWVudCIsInBhcnNlQ3JlYXRpb25SZXNwb25zZSIsInRlbXBsYXRlIiwicGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZSIsInBhcnNlTXV0YXRpb25SZXNwb25zZSIsInRlbXBsYXRlTmFtZSIsInBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UiLCJwYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlIiwidGVtcGxhdGVWZXJzaW9uIiwiZCIsInBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMiLCJkZXN0cm95QWxsIiwiY3JlYXRlVmVyc2lvbiIsImdldFZlcnNpb24iLCJ1cGRhdGVWZXJzaW9uIiwiZGVzdHJveVZlcnNpb24iLCJsaXN0VmVyc2lvbnMiLCJFdmVudENsaWVudCIsIklwUG9vbHNDbGllbnQiLCJwYXJzZUlwUG9vbHNSZXNwb25zZSIsInNlbnQiLCJwYXRjaFdpdGhGRCIsIklwc0NsaWVudCIsInBhcnNlSXBzUmVzcG9uc2UiLCJSZXF1ZXN0XzEiLCJkb21haW5zQ2xpZW50XzEiLCJFdmVudHNfMSIsIlN0YXRzQ2xpZW50XzEiLCJTdXBwcmVzc2lvbnNDbGllbnRfMSIsIldlYmhvb2tzXzEiLCJNZXNzYWdlc18xIiwiUm91dGVzXzEiLCJ2YWxpZGF0ZV8xIiwiSVBzXzEiLCJJUFBvb2xzXzEiLCJtYWlsaW5nTGlzdHNfMSIsIm1haWxMaXN0TWVtYmVyc18xIiwiZG9tYWluc0NyZWRlbnRpYWxzXzEiLCJtdWx0aXBsZVZhbGlkYXRpb25fMSIsImRvbWFpbnNUZW1wbGF0ZXNfMSIsImRvbWFpbnNUYWdzXzEiLCJNYWlsZ3VuQ2xpZW50Iiwib3B0aW9ucyIsImZvcm1EYXRhIiwiY29uZmlnIiwidXJsIiwidXNlcm5hbWUiLCJFcnJvciIsIm1haWxMaXN0c01lbWJlcnMiLCJtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJkb21haW5zIiwid2ViaG9va3MiLCJldmVudHMiLCJzdXBwcmVzc2lvbnMiLCJtZXNzYWdlcyIsInJvdXRlcyIsImlwcyIsImlwX3Bvb2xzIiwibGlzdHMiLCJ2YWxpZGF0ZSIsIk1haWxMaXN0c01lbWJlcnMiLCJjaGVja0FuZFVwZGF0ZURhdGEiLCJuZXdEYXRhIiwidmFycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWJzY3JpYmVkIiwibGlzdE1lbWJlcnMiLCJtYWlsTGlzdEFkZHJlc3MiLCJnZXRNZW1iZXIiLCJtYWlsTGlzdE1lbWJlckFkZHJlc3MiLCJtZW1iZXIiLCJjcmVhdGVNZW1iZXIiLCJyZXFEYXRhIiwiY3JlYXRlTWVtYmVycyIsIm1lbWJlcnMiLCJBcnJheSIsImlzQXJyYXkiLCJ1cHNlcnQiLCJ1cGRhdGVNZW1iZXIiLCJkZXN0cm95TWVtYmVyIiwiTWFpbGluZ0xpc3RzQ2xpZW50IiwicGFyc2VWYWxpZGF0aW9uUmVzdWx0IiwidmFsaWRhdGlvblJlc3VsdCIsInBvc3QiLCJjYW5jZWxWYWxpZGF0aW9uIiwiTWVzc2FnZXNDbGllbnQiLCJwcmVwYXJlQm9vbGVhblZhbHVlcyIsInllc05vUHJvcGVydGllcyIsIlNldCIsImhhcyIsIl9wYXJzZVJlc3BvbnNlIiwibW9kaWZpZWREYXRhIiwiUm91dGVzQ2xpZW50Iiwicm91dGUiLCJTdGF0c0NvbnRhaW5lcl8xIiwiU3RhdHNDbGllbnQiLCJsb2dnZXIiLCJjb25zb2xlIiwiY29udmVydERhdGVUb1VUQyIsImlucHV0RGF0ZSIsIndhcm4iLCJ0b1VUQ1N0cmluZyIsInByZXBhcmVTZWFyY2hQYXJhbXMiLCJlbnRyaWVzIiwiYXJyYXlXaXRoUGFpcnMiLCJjdXJyZW50UGFpciIsInJlcGVhdGVkUHJvcGVydHkiLCJfX3NwcmVhZEFycmF5IiwicHVzaCIsInBhcnNlU3RhdHMiLCJnZXREb21haW4iLCJnZXRBY2NvdW50IiwiU3RhdHNDb250YWluZXIiLCJFbnVtc18xIiwiU3VwcHJlc3Npb25fMSIsIkJvdW5jZSIsIlN1cHByZXNzaW9uTW9kZWxzIiwiQk9VTkNFUyIsImFkZHJlc3MiLCJjb2RlIiwiZXJyb3IiLCJDb21wbGFpbnQiLCJDT01QTEFJTlRTIiwiU3VwcHJlc3Npb24iLCJCb3VuY2VfMSIsIkNvbXBsYWludF8xIiwiVW5zdWJzY3JpYmVfMSIsIldoaXRlTGlzdF8xIiwiY3JlYXRlT3B0aW9ucyIsImhlYWRlcnMiLCJTdXBwcmVzc2lvbkNsaWVudCIsIm1vZGVscyIsImJvdW5jZXMiLCJjb21wbGFpbnRzIiwidW5zdWJzY3JpYmVzIiwid2hpdGVsaXN0cyIsIk1vZGVsIiwiX3BhcnNlSXRlbSIsImNyZWF0ZVdoaXRlTGlzdCIsImlzRGF0YUFycmF5IiwicHJlcGFyZVJlc3BvbnNlIiwiY3JlYXRlVW5zdWJzY3JpYmUiLCJpc0NvbnRhaW5zVGFnIiwic29tZSIsInVuc3Vic2NyaWJlIiwidGFncyIsImdldE1vZGVsIiwibW9kZWwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJwb3N0RGF0YSIsIm1vZHVsZSIsIlVuc3Vic2NyaWJlIiwiVU5TVUJTQ1JJQkVTIiwiV2hpdGVMaXN0IiwiV0hJVEVMSVNUUyIsInJlYXNvbiIsIk11bHRpcGxlVmFsaWRhdGlvbkpvYiIsInJlc3BvbnNlU3RhdHVzQ29kZSIsInF1YW50aXR5IiwicmVjb3Jkc1Byb2Nlc3NlZCIsInJlY29yZHNfcHJvY2Vzc2VkIiwiZG93bmxvYWRfdXJsIiwiZG93bmxvYWRVcmwiLCJjc3YiLCJqc29uIiwiX2IiLCJzdW1tYXJ5IiwiY2F0Y2hBbGwiLCJjYXRjaF9hbGwiLCJkZWxpdmVyYWJsZSIsImRvTm90U2VuZCIsImRvX25vdF9zZW5kIiwidW5kZWxpdmVyYWJsZSIsInVua25vd24iLCJyaXNrIiwiaGlnaCIsImxvdyIsIm1lZGl1bSIsIk11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCIsImhhbmRsZVJlc3BvbnNlIiwiam9icyIsImpvYiIsInRvdGFsIiwibGlzdElkIiwibXVsdGlwbGVWYWxpZGF0aW9uRGF0YSIsIm11bHRpcGxlVmFsaWRhdGlvbkZpbGUiLCJmaWxlIiwiVmFsaWRhdGVDbGllbnQiLCJtdWx0aXBsZVZhbGlkYXRpb24iLCJXZWJob29rIiwiV2ViaG9va3NDbGllbnQiLCJfcGFyc2VXZWJob29rTGlzdCIsIl9wYXJzZVdlYmhvb2tXaXRoSUQiLCJ3ZWJob29rUmVzcG9uc2UiLCJ3ZWJob29rIiwidXJscyIsInVuZGVmaW5lZCIsIl9wYXJzZVdlYmhvb2tUZXN0IiwidGVzdCIsIkFQSUVycm9yIiwiYm9keU1lc3NhZ2UiLCJzdGFjayIsImRldGFpbHMiLCJGb3JtRGF0YUJ1aWxkZXIiLCJGb3JtRGF0YUNvbnN0cnVjdG9yIiwiY3JlYXRlRm9ybURhdGEiLCJmaWx0ZXIiLCJmb3JtRGF0YUFjYyIsImZpbGVLZXlzIiwiaW5jbHVkZXMiLCJhZGRGaWxlc1RvRkQiLCJhZGRNaW1lRGF0YVRvRkQiLCJhZGRDb21tb25Qcm9wZXJ0eVRvRkQiLCJpc0Zvcm1EYXRhUGFja2FnZSIsImZvcm1EYXRhSW5zdGFuY2UiLCJnZXRIZWFkZXJzIiwiZ2V0QXR0YWNobWVudE9wdGlvbnMiLCJpc1N0cmVhbSIsImZpbGVuYW1lIiwiY29udGVudFR5cGUiLCJrbm93bkxlbmd0aCIsImFwcGVuZCIsIm5vZGVGb3JtRGF0YSIsIkJsb2IiLCJicm93c2VyRm9ybURhdGEiLCJCdWZmZXIiLCJpc0J1ZmZlciIsImJsb2JJbnN0YW5jZSIsImFwcGVuZEZpbGVUb0ZEIiwib3JpZ2luYWxLZXkiLCJvYmoiLCJpc1N0cmVhbURhdGEiLCJvYmpEYXRhIiwiZmQiLCJmb3JFYWNoIiwicGlwZSIsIk5hdmlnYXRpb25UaHJ1UGFnZXMiLCJwYXJzZVBhZ2UiLCJwYWdlVXJsIiwidXJsU2VwYXJhdG9yIiwiaXRlcmF0b3JOYW1lIiwicGFyc2VkVXJsIiwiVVJMIiwicGFnZVZhbHVlIiwic3BsaXQiLCJwb3AiLCJpdGVyYXRvclBvc2l0aW9uIiwicGFnZSIsInBhZ2luZyIsInVwZGF0ZVVybEFuZFF1ZXJ5IiwiY2xpZW50VXJsIiwicXVlcnlDb3B5IiwidXBkYXRlZFF1ZXJ5IiwiYmFzZTY0IiwiX19pbXBvcnRTdGFyIiwiYXhpb3NfMSIsIkZvcm1EYXRhQnVpbGRlcl8xIiwiUmVxdWVzdCIsInRpbWVvdXQiLCJtYWtlSGVhZGVyc0Zyb21PYmplY3QiLCJmb3JtRGF0YUJ1aWxkZXIiLCJtYXhCb2R5TGVuZ3RoIiwibWV0aG9kIiwib25DYWxsT3B0aW9ucyIsInJlcXVlc3RIZWFkZXJzIiwiam9pbkFuZFRyYW5zZm9ybUhlYWRlcnMiLCJwYXJhbXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiVVJMU2VhcmNoUGFyYW1zIiwidXJsVmFsdWUiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsIl9kIiwiZXJyb3JSZXNwb25zZSIsImVycl8xIiwiX2MiLCJnZXRSZXNwb25zZUJvZHkiLCJBeGlvc0hlYWRlcnMiLCJiYXNpYyIsImVuY29kZSIsInNldEF1dGhvcml6YXRpb24iLCJzZXQiLCJyZWNlaXZlZE9uQ2FsbEhlYWRlcnMiLCJvbkNhbGxIZWFkZXJzIiwiaGVhZGVyc09iamVjdCIsImhlYWRlcnNBY2N1bXVsYXRvciIsImNvbW1hbmQiLCJhZGREZWZhdWx0SGVhZGVycyIsInJlcXVlc3RPcHRpb25zIiwiUmVzb2x1dGlvbiIsIldlYmhvb2tzSWRzIiwiWWVzTm8iLCJfX2V4cG9ydFN0YXIiLCJNYWlsZ3VuQ2xpZW50XzEiLCJFbnVtcyIsIkludGVyZmFjZXMiLCJNYWlsZ3VuIiwiRm9ybURhdGEiLCJkZWZpbmVQcm9wZXJ0eSIsImNsaWVudCJdLCJzb3VyY2VSb290IjoiIn0=