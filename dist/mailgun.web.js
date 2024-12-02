/*! mailgun.js v10.2.4 */
/*! mailgun.js v10.2.4 */
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
    var InboxPlacementsResultsSharingClient = new InboxPlacementsResultsSharingClient_1.default(this.request);
    var seedsListsAttributes = new AttributesClient_1.default(this.request, '/v4/inbox/seedlists/a');
    var resultsAttributesClient = new AttributesClient_1.default(this.request, '/v4/inbox/results/a');
    var seedsListsFiltersClient = new FiltersClient_1.default(this.request, '/v4/inbox/seedlists/_filters');
    var resultsFiltersClient = new FiltersClient_1.default(this.request, '/v4/inbox/results/_filters');
    var seedsListsClient = new SeedsListsClient_1.default(this.request, seedsListsAttributes, seedsListsFiltersClient);
    var inboxPlacementsResultsClient = new InboxPlacementsResultsClient_1.default(this.request, resultsAttributesClient, resultsFiltersClient, InboxPlacementsResultsSharingClient);
    var inboxPlacementsProvidersClient = new InboxPlacementsProviders_1.default(this.request);
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
    this.inbox_placements = new inboxPlacements_1.default(this.request, seedsListsClient, inboxPlacementsResultsClient, inboxPlacementsProvidersClient);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsbUJBQW1CO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0MsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUyxRQUFROztBQUVqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGFBQWE7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsS0FBSztBQUNwRCxPQUFPO0FBQ1AsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsTUFBTTtBQUMvQyxNQUFNO0FBQ047QUFDQTtBQUNBLDhDQUE4QyxNQUFNO0FBQ3BEO0FBQ0EsQ0FBQzs7QUFFRCxzQ0FBc0MsT0FBTzs7QUFFN0M7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVcsUUFBUTtBQUNuQjtBQUNBOztBQUVBOztBQUVBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRCxHQUFHO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx5Q0FBeUMsSUFBSTtBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsVUFBVTtBQUNyQjtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZUFBZTtBQUM1QixhQUFhLFNBQVM7QUFDdEI7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQSxvRUFBb0U7O0FBRXBFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7O0FBRUEsV0FBVyx5Q0FBeUM7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsVUFBVSxJQUFJO0FBQ2Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdEQUF3RCxpQkFBaUI7O0FBRXpFO0FBQ0EsMkNBQTJDLGlCQUFpQjs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7OztVQ2pvSEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztVRUpBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc0NyZWRlbnRpYWxzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNUYWdzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9Eb21haW5zL2RvbWFpbnNUZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0V2ZW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSVBQb29scy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSVBzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvQXR0cmlidXRlc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL0ZpbHRlcnNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvaW5ib3hQbGFjZW1lbnRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvcHJvdmlkZXJzL0luYm94UGxhY2VtZW50c1Byb3ZpZGVycy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWFpbGd1bkNsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWFpbGluZ0xpc3RzL21haWxpbmdMaXN0cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvTWVzc2FnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1JvdXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3RhdHMvU3RhdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N0YXRzL1N0YXRzQ29udGFpbmVyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdWJhY2NvdW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL0JvdW5jZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL0NvbXBsYWludC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvU3VwcHJlc3Npb25zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvVW5zdWJzY3JpYmUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9XaGl0ZUxpc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1ZhbGlkYXRpb25zL211bHRpcGxlVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvVmFsaWRhdGlvbnMvdmFsaWRhdGUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1dlYmhvb2tzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vQXR0YWNobWVudHNIYW5kbGVyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vRXJyb3IudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9Gb3JtRGF0YUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9jb21tb24vUmVxdWVzdC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0VudW1zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Db21tb24vTG9nZ2VyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Db21tb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvRG9tYWluQ3JlZGVudGlhbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvRG9tYWluVGFncy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9Eb21haW5UZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0RvbWFpbnMvRG9tYWluc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRXZlbnRDbGllbnQvSUV2ZW50Q2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9FdmVudENsaWVudC9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSVBQb29scy9JSVBQb29sc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSVBQb29scy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSVBzL0lJUHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0lQcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL0F0dHJpYnV0ZXNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9GaWx0ZXJzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvSW5ib3hQbGFjZW1lbnRzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL1NlZWRzTGlzdHMvU2VlZHNMaXN0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsZ3VuQ2xpZW50L0lNYWlsZ3VuQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsZ3VuQ2xpZW50L2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01lc3NhZ2VzL0lNZXNzYWdlc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWVzc2FnZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1JvdXRlcy9JUm91dGVzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Sb3V0ZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N0YXRzL1N0YXRzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdGF0cy9TdGF0c0NvbnRhaW5lci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3RhdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1YmFjY291bnRzL0lTdWJhY2NvdW50c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3ViYWNjb3VudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9Cb3VuY2UudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9Db21wbGFpbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9JU3VwcHJlc3Npb25zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMvVW5zdWJzY3JpYmUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9XaGl0ZUxpc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMvTXVsdGlwbGVWYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9WYWxpZGF0aW9ucy9WYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9WYWxpZGF0aW9ucy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvV2ViaG9va3MvSVdlYkhvb2tzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9XZWJob29rcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vRXJyb3IudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vRm9ybURhdGEudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Db21tb24vTmF2aWdhdGlvblRocnVQYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9SZXF1ZXN0T3B0aW9ucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWluQ3JlZGVudGlhbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpblRhZ3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpblRlbXBsYXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWluVHJhY2tpbmcudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL0RvbWFpbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Eb21haW5zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRXZlbnRzL0V2ZW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0V2ZW50cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0lQUG9vbHMvSXBQb29scy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0lQUG9vbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9JUHMvSVBzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvSVBzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWFpbGd1bkNsaWVudC9NYWlsZ3VuQ2xpZW50T3B0aW9ucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxndW5DbGllbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWFpbGluZ0xpc3RzL01haWxpbmdMaXN0cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxpbmdMaXN0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01lc3NhZ2VzL01lc3NhZ2VzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWVzc2FnZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Sb3V0ZXMvUm91dGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvUm91dGVzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3RhdHMvU3RhdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdGF0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1YmFjY291bnRzL1N1YmFjY291bnRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3ViYWNjb3VudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvQm91bmNlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL0NvbXBsYWludC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvVW5zdWJzY3JpYmUudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvV2hpdGVMaXN0LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvVmFsaWRhdGlvbnMvTXVsdGlwbGVWYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvVmFsaWRhdGlvbnMvVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1ZhbGlkYXRpb25zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvV2ViaG9va3MvV2ViaG9va3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9XZWJob29rcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9iYXNlLTY0L2Jhc2U2NC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL3VybC1qb2luL2xpYi91cmwtam9pbi5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2Rpc3QvYnJvd3Nlci9heGlvcy5janMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBETlNSZWNvcmQsXG4gIERvbWFpbkRhdGEsXG4gIERvbWFpblNob3J0RGF0YSxcbiAgVERvbWFpblxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW4gaW1wbGVtZW50cyBURG9tYWluIHtcbiAgbmFtZTogc3RyaW5nO1xuICByZXF1aXJlX3RsczogYm9vbGVhbjtcbiAgc2tpcF92ZXJpZmljYXRpb246IGJvb2xlYW47XG4gIHN0YXRlOiBzdHJpbmc7XG4gIHdpbGRjYXJkOiBib29sZWFuO1xuICBzcGFtX2FjdGlvbjogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIHNtdHBfcGFzc3dvcmQ6IHN0cmluZztcbiAgc210cF9sb2dpbjogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHJlY2VpdmluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuICBzZW5kaW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIGlkPzogc3RyaW5nO1xuICBpc19kaXNhYmxlZD86IGJvb2xlYW47XG4gIHdlYl9wcmVmaXg/OiBzdHJpbmc7XG4gIHdlYl9zY2hlbWU/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZGF0YTogRG9tYWluU2hvcnREYXRhIHwgRG9tYWluRGF0YSxcbiAgICByZWNlaXZpbmc/OiBETlNSZWNvcmRbXSB8IG51bGwsXG4gICAgc2VuZGluZz86IEROU1JlY29yZFtdIHwgbnVsbFxuICApIHtcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5yZXF1aXJlX3RscyA9IGRhdGEucmVxdWlyZV90bHM7XG4gICAgdGhpcy5za2lwX3ZlcmlmaWNhdGlvbiA9IGRhdGEuc2tpcF92ZXJpZmljYXRpb247XG4gICAgdGhpcy5zdGF0ZSA9IGRhdGEuc3RhdGU7XG4gICAgdGhpcy53aWxkY2FyZCA9IGRhdGEud2lsZGNhcmQ7XG4gICAgdGhpcy5zcGFtX2FjdGlvbiA9IGRhdGEuc3BhbV9hY3Rpb247XG4gICAgdGhpcy5jcmVhdGVkX2F0ID0gZGF0YS5jcmVhdGVkX2F0O1xuICAgIHRoaXMuc210cF9wYXNzd29yZCA9IGRhdGEuc210cF9wYXNzd29yZDtcbiAgICB0aGlzLnNtdHBfbG9naW4gPSBkYXRhLnNtdHBfbG9naW47XG4gICAgdGhpcy50eXBlID0gZGF0YS50eXBlO1xuICAgIHRoaXMucmVjZWl2aW5nX2Ruc19yZWNvcmRzID0gcmVjZWl2aW5nIHx8IG51bGw7XG4gICAgdGhpcy5zZW5kaW5nX2Ruc19yZWNvcmRzID0gc2VuZGluZyB8fCBudWxsO1xuICAgIC8qXG4gICAgICBkb21haW4gbGlzdCBoYXMgc2hvcnRlciByZXNwb25zZSB0aGVuIGdldCwgY3JlYXRlLCBhbmQgdXBkYXRlIG1ldGhvZHMuXG4gICAgKi9cblxuICAgIGNvbnN0IGR5bmFtaWNLZXlzOiAoa2V5b2YgRG9tYWluRGF0YSlbXSA9IFsnaWQnLCAnaXNfZGlzYWJsZWQnLCAnd2ViX3ByZWZpeCcsICd3ZWJfc2NoZW1lJ107XG5cbiAgICBjb25zdCBkeW5hbWljUHJvcGVydGllcyA9IGR5bmFtaWNLZXlzLnJlZHVjZSgoYWNjLCBwcm9wZXJ0eU5hbWUpID0+IHtcbiAgICAgIGlmIChwcm9wZXJ0eU5hbWUgaW4gZGF0YSkge1xuICAgICAgICBjb25zdCBwcm9wID0gcHJvcGVydHlOYW1lIGFzIGtleW9mIERvbWFpbjtcbiAgICAgICAgYWNjW3Byb3BdID0gKGRhdGEgYXMgRG9tYWluRGF0YSlbcHJvcGVydHlOYW1lXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgUmVjb3JkPGtleW9mIERvbWFpbiwgc3RyaW5nIHwgYm9vbGVhbj4pO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZHluYW1pY1Byb3BlcnRpZXMpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQge1xuICBJRG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICBJRG9tYWluVGFnc0NsaWVudCxcbiAgSURvbWFpbkNyZWRlbnRpYWxzLFxuICBJRG9tYWluc0NsaWVudFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuXG5pbXBvcnQgeyBBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BcGlSZXNwb25zZSc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi4vY29tbW9uL0Vycm9yJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGZyb20gJy4vZG9tYWluc0NyZWRlbnRpYWxzJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9kb21haW5zVGVtcGxhdGVzJztcbmltcG9ydCBEb21haW5UYWdzQ2xpZW50IGZyb20gJy4vZG9tYWluc1RhZ3MnO1xuaW1wb3J0IHtcbiAgRGVzdHJveWVkRG9tYWluUmVzcG9uc2UsXG4gIE1lc3NhZ2VSZXNwb25zZSxcbiAgRG9tYWluTGlzdFJlc3BvbnNlRGF0YSxcbiAgRG9tYWluUmVzcG9uc2VEYXRhLFxuICBEb21haW5UcmFja2luZ1Jlc3BvbnNlLFxuICBEb21haW5UcmFja2luZ0RhdGEsXG4gIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIFVwZGF0ZWRPcGVuVHJhY2tpbmcsXG4gIERvbWFpbnNRdWVyeSxcbiAgRG9tYWluSW5mbyxcbiAgQ29ubmVjdGlvblNldHRpbmdzLFxuICBDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcyxcbiAgT3BlblRyYWNraW5nSW5mbyxcbiAgQ2xpY2tUcmFja2luZ0luZm8sXG4gIFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvLFxuICBSZXBsYWNlbWVudEZvclBvb2wsXG4gIERLSU1BdXRob3JpdHlJbmZvLFxuICBVcGRhdGVkREtJTUF1dGhvcml0eSxcbiAgVXBkYXRlZERLSU1BdXRob3JpdHlSZXNwb25zZSxcbiAgREtJTVNlbGVjdG9ySW5mbyxcbiAgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlLFxuICBXZWJQcmVmaXhJbmZvLFxuICBVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2UsXG4gIFREb21haW4sXG4gIERvbWFpblVwZGF0ZUluZm8sXG4gIERvbWFpblVwZGF0ZUluZm9SZXEsXG4gIERvbWFpbkluZm9SZXEsXG4gIEJvb2xUb1N0cmluZyxcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5pbXBvcnQgRG9tYWluIGZyb20gJy4vZG9tYWluJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluc0NsaWVudCBpbXBsZW1lbnRzIElEb21haW5zQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHVibGljIGRvbWFpbkNyZWRlbnRpYWxzOiBJRG9tYWluQ3JlZGVudGlhbHM7XG4gIHB1YmxpYyBkb21haW5UZW1wbGF0ZXM6IElEb21haW5UZW1wbGF0ZXNDbGllbnQ7XG4gIHB1YmxpYyBkb21haW5UYWdzOiBJRG9tYWluVGFnc0NsaWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50OiBEb21haW5DcmVkZW50aWFsc0NsaWVudCxcbiAgICBkb21haW5UZW1wbGF0ZXNDbGllbnQ6IERvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgICBkb21haW5UYWdzQ2xpZW50OiBEb21haW5UYWdzQ2xpZW50XG4gICkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5kb21haW5DcmVkZW50aWFscyA9IGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50O1xuICAgIHRoaXMuZG9tYWluVGVtcGxhdGVzID0gZG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuICAgIHRoaXMuZG9tYWluVGFncyA9IGRvbWFpblRhZ3NDbGllbnQ7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVCb29sVmFsdWVzKFxuICAgIGRhdGE6IERvbWFpbkluZm8gfCBEb21haW5VcGRhdGVJbmZvXG4gICk6IERvbWFpbkluZm9SZXEgfCBEb21haW5VcGRhdGVJbmZvUmVxIHtcbiAgICBjb25zdCBwcm9wc0ZvclJlcGxhY2VtZW50ID0gZGF0YSBhcyBCb29sVG9TdHJpbmc7XG4gICAgY29uc3QgcmVwbGFjZWRQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzRm9yUmVwbGFjZW1lbnQpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHByb3AgPSBrZXkgYXMga2V5b2YgQm9vbFRvU3RyaW5nO1xuICAgICAgaWYgKHR5cGVvZiBwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdIGFzIGJvb2xlYW47XG4gICAgICAgIGFjY1twcm9wXSA9ICh2YWx1ZS50b1N0cmluZygpID09PSAndHJ1ZScpID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgUmVjb3JkPGtleW9mIEJvb2xUb1N0cmluZywgJ3RydWUnfCAnZmFsc2UnPik7XG4gICAgcmV0dXJuIHsgLi4uZGF0YSwgLi4ucmVwbGFjZWRQcm9wcyB9IGFzIERvbWFpblVwZGF0ZUluZm9SZXEgfCBEb21haW5JbmZvUmVxO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlKHJlc3BvbnNlOiBEZXN0cm95ZWREb21haW5SZXNwb25zZSkgOiBNZXNzYWdlUmVzcG9uc2Uge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZURvbWFpbkxpc3QocmVzcG9uc2U6IERvbWFpbkxpc3RSZXNwb25zZURhdGEpOiBURG9tYWluW10ge1xuICAgIGlmIChyZXNwb25zZS5ib2R5ICYmIHJlc3BvbnNlLmJvZHkuaXRlbXMpIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gbmV3IERvbWFpbihpdGVtKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURvbWFpbihyZXNwb25zZTogRG9tYWluUmVzcG9uc2VEYXRhKTogVERvbWFpbiB7XG4gICAgcmV0dXJuIG5ldyBEb21haW4oXG4gICAgICByZXNwb25zZS5ib2R5LmRvbWFpbixcbiAgICAgIHJlc3BvbnNlLmJvZHkucmVjZWl2aW5nX2Ruc19yZWNvcmRzLFxuICAgICAgcmVzcG9uc2UuYm9keS5zZW5kaW5nX2Ruc19yZWNvcmRzXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyhyZXNwb25zZTogRG9tYWluVHJhY2tpbmdSZXNwb25zZSkgOiBEb21haW5UcmFja2luZ0RhdGEge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5LnRyYWNraW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1VwZGF0ZShyZXNwb25zZTogVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSkgOlVwZGF0ZWRPcGVuVHJhY2tpbmcge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgbGlzdChxdWVyeT86IERvbWFpbnNRdWVyeSk6IFByb21pc2U8VERvbWFpbltdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9kb21haW5zJywgcXVlcnkpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VEb21haW5MaXN0KHJlcyBhcyBEb21haW5MaXN0UmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcpIDogUHJvbWlzZTxURG9tYWluPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92My9kb21haW5zLyR7ZG9tYWlufWApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBEb21haW5JbmZvKSA6IFByb21pc2U8VERvbWFpbj4ge1xuICAgIGNvbnN0IHBvc3RPYmogPSB0aGlzLl9oYW5kbGVCb29sVmFsdWVzKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YzL2RvbWFpbnMnLCBwb3N0T2JqKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERvbWFpblVwZGF0ZUluZm8pIDogUHJvbWlzZTxURG9tYWluPiB7XG4gICAgY29uc3QgcHV0RGF0YSA9IHRoaXMuX2hhbmRsZUJvb2xWYWx1ZXMoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYC92My9kb21haW5zLyR7ZG9tYWlufWAsIHB1dERhdGEpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIHZlcmlmeShkb21haW46IHN0cmluZyk6IFByb21pc2U8VERvbWFpbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vdmVyaWZ5YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZyk6IFByb21pc2U8TWVzc2FnZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92My9kb21haW5zLyR7ZG9tYWlufWApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZShyZXMgYXMgRGVzdHJveWVkRG9tYWluUmVzcG9uc2UpKTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPENvbm5lY3Rpb25TZXR0aW5ncz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vY29ubmVjdGlvbmApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSlcbiAgICAgIC50aGVuKChyZXM6Q29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UpID0+IHJlcy5ib2R5LmNvbm5lY3Rpb24gYXMgQ29ubmVjdGlvblNldHRpbmdzKTtcbiAgfVxuXG4gIHVwZGF0ZUNvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcsIGRhdGE6IENvbm5lY3Rpb25TZXR0aW5ncyk6IFByb21pc2U8VXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vY29ubmVjdGlvbmAsIGRhdGEpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzKVxuICAgICAgLnRoZW4oKHJlczpVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzKSA9PiByZXMuYm9keSBhcyBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzKTtcbiAgfVxuXG4gIC8vIFRyYWNraW5nXG5cbiAgZ2V0VHJhY2tpbmcoZG9tYWluOiBzdHJpbmcpIDogUHJvbWlzZTxEb21haW5UcmFja2luZ0RhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJykpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVRyYWNraW5nU2V0dGluZ3MpO1xuICB9XG5cbiAgdXBkYXRlVHJhY2tpbmcoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IE9wZW5UcmFja2luZ0luZm8gfCBDbGlja1RyYWNraW5nSW5mbyB8IFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvXG4gICk6IFByb21pc2U8VXBkYXRlZE9wZW5UcmFja2luZz4ge1xuICAgIGlmICh0eXBlb2YgZGF0YT8uYWN0aXZlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1JlY2VpdmVkIGJvb2xlYW4gdmFsdWUgZm9yIGFjdGl2ZSBwcm9wZXJ0eScsICdQcm9wZXJ0eSBcImFjdGl2ZVwiIG11c3QgY29udGFpbiBzdHJpbmcgdmFsdWUuJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnLCB0eXBlKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VUcmFja2luZ1VwZGF0ZShyZXMgYXMgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSkpO1xuICB9XG5cbiAgLy8gSVBzXG5cbiAgZ2V0SXBzKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJykpXG4gICAgICAudGhlbigocmVzcG9uc2U6IEFQSVJlc3BvbnNlKSA9PiByZXNwb25zZT8uYm9keT8uaXRlbXMpO1xuICB9XG5cbiAgYXNzaWduSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgaXAgfSk7XG4gIH1cblxuICBkZWxldGVJcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsIGlwKSk7XG4gIH1cblxuICBsaW5rSXBQb29sKGRvbWFpbjogc3RyaW5nLCBwb29sSWQ6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBwb29sX2lkOiBwb29sSWQgfSk7XG4gIH1cblxuICB1bmxpbmtJcFBvbGwoZG9tYWluOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBSZXBsYWNlbWVudEZvclBvb2wpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9ICcnO1xuICAgIGlmIChyZXBsYWNlbWVudC5wb29sX2lkICYmIHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdUb28gbXVjaCBkYXRhIGZvciByZXBsYWNlbWVudCcsICdQbGVhc2Ugc3BlY2lmeSBlaXRoZXIgcG9vbF9pZCBvciBpcCAobm90IGJvdGgpJyk7XG4gICAgfSBlbHNlIGlmIChyZXBsYWNlbWVudC5wb29sX2lkKSB7XG4gICAgICBzZWFyY2hQYXJhbXMgPSBgP3Bvb2xfaWQ9JHtyZXBsYWNlbWVudC5wb29sX2lkfWA7XG4gICAgfSBlbHNlIGlmIChyZXBsYWNlbWVudC5pcCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gYD9pcD0ke3JlcGxhY2VtZW50LmlwfWA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJywgJ2lwX3Bvb2wnLCBzZWFyY2hQYXJhbXMpKTtcbiAgfVxuXG4gIHVwZGF0ZURLSU1BdXRob3JpdHkoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERLSU1BdXRob3JpdHlJbmZvKTogUHJvbWlzZTxVcGRhdGVkREtJTUF1dGhvcml0eT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vZGtpbV9hdXRob3JpdHlgLCB7fSwgeyBxdWVyeTogYHNlbGY9JHtkYXRhLnNlbGZ9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZERLSU1BdXRob3JpdHlSZXNwb25zZSlcbiAgICAgIC50aGVuKChyZXMgOiBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBVcGRhdGVkREtJTUF1dGhvcml0eSk7XG4gIH1cblxuICB1cGRhdGVES0lNU2VsZWN0b3IoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERLSU1TZWxlY3RvckluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNU2VsZWN0b3JSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vZGtpbV9zZWxlY3RvcmAsIHt9LCB7IHF1ZXJ5OiBgZGtpbV9zZWxlY3Rvcj0ke2RhdGEuZGtpbVNlbGVjdG9yfWAgfSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRES0lNU2VsZWN0b3JSZXNwb25zZSk7XG4gIH1cblxuICB1cGRhdGVXZWJQcmVmaXgoZG9tYWluOiBzdHJpbmcsIGRhdGE6IFdlYlByZWZpeEluZm8pOiBQcm9taXNlPFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vd2ViX3ByZWZpeGAsIHt9LCB7IHF1ZXJ5OiBgd2ViX3ByZWZpeD0ke2RhdGEud2ViUHJlZml4fWAgfSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlJztcbmltcG9ydCB7IElEb21haW5DcmVkZW50aWFscyB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5pbXBvcnQge1xuICBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSxcbiAgRG9tYWluQ3JlZGVudGlhbHNMaXN0LFxuICBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UsXG4gIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0LFxuICBEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSxcbiAgRG9tYWluQ3JlZGVudGlhbHNRdWVyeSxcbiAgRG9tYWluQ3JlZGVudGlhbHMsXG4gIFVwZGF0ZURvbWFpbkNyZWRlbnRpYWxzRGF0YVxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgaW1wbGVtZW50cyBJRG9tYWluQ3JlZGVudGlhbHMge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvZG9tYWlucy8nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QoXG4gICAgcmVzcG9uc2U6IERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhXG4gICk6IERvbWFpbkNyZWRlbnRpYWxzTGlzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLFxuICAgICAgdG90YWxDb3VudDogcmVzcG9uc2UuYm9keS50b3RhbF9jb3VudFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZU1lc3NhZ2VSZXNwb25zZShcbiAgICByZXNwb25zZTogQ3JlYXRlZFVwZGF0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlXG4gICk6IERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgIH0gYXMgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRGVsZXRlZFJlc3BvbnNlKFxuICAgIHJlc3BvbnNlOkRlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlXG4gICk6IERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgIHNwZWM6IHJlc3BvbnNlLmJvZHkuc3BlY1xuICAgIH0gYXMgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5DcmVkZW50aWFsc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvY3JlZGVudGlhbHMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KHJlcyBhcyBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSlcbiAgICAgICk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluQ3JlZGVudGlhbHNcbiAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHNgLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgdXBkYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZyxcbiAgICBkYXRhOiBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbiAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFscy8ke2NyZWRlbnRpYWxzTG9naW59YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWApXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEZWxldGVkUmVzcG9uc2UocmVzKSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgSURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdCxcbiAgSURvbWFpblRhZ3NDbGllbnRcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IFJlc29sdXRpb24gfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQge1xuICBEb21haW5UYWdzSXRlbSxcbiAgRG9tYWluVGFnc0l0ZW1JbmZvLFxuICBEb21haW5UYWdTdGF0aXN0aWNJdGVtLFxuICBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtLFxuICBEb21haW5UYWdzTGlzdCxcbiAgRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSxcbiAgRG9tYWluVGFnc1F1ZXJ5LFxuICBEb21haW5UYWdzTWVzc2FnZVJlcyxcbiAgRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5LFxuICBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdQcm92aWRlcnNBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdEZXZpY2VzQVBJUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UYWcgaW1wbGVtZW50cyBEb21haW5UYWdzSXRlbSB7XG4gIHRhZzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAnZmlyc3Qtc2Vlbic6IERhdGU7XG4gICdsYXN0LXNlZW4nOiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKHRhZ0luZm86IERvbWFpblRhZ3NJdGVtSW5mbykge1xuICAgIHRoaXMudGFnID0gdGFnSW5mby50YWc7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ0luZm8uZGVzY3JpcHRpb247XG4gICAgdGhpc1snZmlyc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snZmlyc3Qtc2VlbiddKTtcbiAgICB0aGlzWydsYXN0LXNlZW4nXSA9IG5ldyBEYXRlKHRhZ0luZm9bJ2xhc3Qtc2VlbiddKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRG9tYWluVGFnU3RhdGlzdGljIGltcGxlbWVudHMgSURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdCB7XG4gIHRhZzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBzdGFydDogRGF0ZTtcbiAgZW5kOiBEYXRlO1xuICByZXNvbHV0aW9uOiBSZXNvbHV0aW9uO1xuICBzdGF0czogRG9tYWluVGFnU3RhdGlzdGljSXRlbVtdO1xuXG4gIGNvbnN0cnVjdG9yKHRhZ1N0YXRpc3RpY0luZm86IERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSkge1xuICAgIHRoaXMudGFnID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnRhZztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSh0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhcnQpO1xuICAgIHRoaXMuZW5kID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LmVuZCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnJlc29sdXRpb247XG4gICAgdGhpcy5zdGF0cyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQ6IERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtKSB7XG4gICAgICBjb25zdCByZXMgPSB7IC4uLnN0YXQsIHRpbWU6IG5ldyBEYXRlKHN0YXQudGltZSkgfTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluVGFnc0NsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8RG9tYWluVGFnc0xpc3Q+XG4gIGltcGxlbWVudHMgSURvbWFpblRhZ3NDbGllbnQge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvJztcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IERvbWFpblRhZ3NSZXNwb25zZURhdGEsXG4gICk6IERvbWFpblRhZ3NMaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgRG9tYWluVGFnc0xpc3Q7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKCh0YWdJbmZvOiBEb21haW5UYWdzSXRlbUluZm8pID0+IG5ldyBEb21haW5UYWcodGFnSW5mbykpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3RhZycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUYWdTdGF0aXN0aWMoXG4gICAgcmVzcG9uc2U6IERvbWFpblRhZ1N0YXRBUElSZXNwb25zZVxuICApOiBJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0IHtcbiAgICByZXR1cm4gbmV3IERvbWFpblRhZ1N0YXRpc3RpYyhyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRhZ3NRdWVyeSk6IFByb21pc2U8RG9tYWluVGFnc0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycpLCBxdWVyeSk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRhZyhyZXMuYm9keSlcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSwgZGVzY3JpcHRpb24pXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzXG4gICAgICApO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L3RhZ3MvJHt0YWd9YClcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiAoXG4gICAgICAgIHtcbiAgICAgICAgICBtZXNzYWdlOiByZXMuYm9keS5tZXNzYWdlLFxuICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1c1xuICAgICAgICB9IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzKSk7XG4gIH1cblxuICBzdGF0aXN0aWMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBxdWVyeTogRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5KVxuICAgIDogUHJvbWlzZTxEb21haW5UYWdTdGF0aXN0aWM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZVRhZ1N0YXRpc3RpYyhyZXMpXG4gICAgICApO1xuICB9XG5cbiAgY291bnRyaWVzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvY291bnRyaWVzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgcHJvdmlkZXJzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvcHJvdmlkZXJzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgZGV2aWNlcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9kZXZpY2VzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgRG9tYWluVGVtcGxhdGVEYXRhLFxuICBEb21haW5UZW1wbGF0ZXNRdWVyeSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhLFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhLFxuICBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhLFxuICBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0LFxuICBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBOb3RpZmljYXRpb25BUElSZXNwb25zZSxcbiAgTm90aWZpY2F0aW9uUmVzdWx0LFxuICBTaG9ydFRlbXBsYXRlVmVyc2lvbixcbiAgVGVtcGxhdGVRdWVyeSxcbiAgVGVtcGxhdGVWZXJzaW9uLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UsXG4gIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHRcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBJRG9tYWluVGVtcGxhdGUsIElEb21haW5UZW1wbGF0ZXNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluVGVtcGxhdGVJdGVtIGltcGxlbWVudHMgSURvbWFpblRlbXBsYXRlIHtcbiAgbmFtZSA6IHN0cmluZztcbiAgZGVzY3JpcHRpb24gOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdCA6IERhdGUgfCAnJztcbiAgY3JlYXRlZEJ5IDogc3RyaW5nO1xuICBpZCA6IHN0cmluZztcbiAgdmVyc2lvbj86IFRlbXBsYXRlVmVyc2lvbjtcbiAgdmVyc2lvbnM/OiBTaG9ydFRlbXBsYXRlVmVyc2lvbltdO1xuXG4gIGNvbnN0cnVjdG9yKGRvbWFpblRlbXBsYXRlRnJvbUFQSTogSURvbWFpblRlbXBsYXRlKSB7XG4gICAgdGhpcy5uYW1lID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLm5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQgPyBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0KSA6ICcnO1xuICAgIHRoaXMuY3JlYXRlZEJ5ID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRCeTtcbiAgICB0aGlzLmlkID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmlkO1xuXG4gICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uKSB7XG4gICAgICB0aGlzLnZlcnNpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbjtcbiAgICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpIHtcbiAgICAgICAgdGhpcy52ZXJzaW9uLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucyAmJiBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnZlcnNpb25zID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLm1hcCgodmVyc2lvbikgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7IC4uLnZlcnNpb24gfTtcbiAgICAgICAgcmVzdWx0LmNyZWF0ZWRBdCA9IG5ldyBEYXRlKHZlcnNpb24uY3JlYXRlZEF0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5UZW1wbGF0ZXNDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ+XG4gIGltcGxlbWVudHMgSURvbWFpblRlbXBsYXRlc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNyZWF0aW9uUmVzcG9uc2UoZGF0YTogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSk6IElEb21haW5UZW1wbGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShcbiAgICBkYXRhOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZVxuICApOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge30gYXMgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkgJiYgZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGRhdGEuYm9keS50ZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTXV0YXRpb25SZXNwb25zZShcbiAgICBkYXRhOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2VcbiAgKTogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0ID0ge30gYXMgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKGRhdGE6IE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlKTogTm90aWZpY2F0aW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IE5vdGlmaWNhdGlvblJlc3VsdCA9IHt9IGFzIE5vdGlmaWNhdGlvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKFxuICAgIGRhdGE6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlXG4gICk6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7fSBhcyBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgcmVzdWx0LnRlbXBsYXRlVmVyc2lvbiA9IHsgdGFnOiBkYXRhLmJvZHkudGVtcGxhdGUudmVyc2lvbi50YWcgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QocmVzcG9uc2U6IExpc3REb21haW5UZW1wbGF0ZXNBUElSZXNwb25zZSk6IExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0O1xuXG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKChkOiBJRG9tYWluVGVtcGxhdGUpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZCkpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3AnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zKFxuICAgIHJlc3BvbnNlOiBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlXG4gICk6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQ7XG5cbiAgICBkYXRhLnRlbXBsYXRlID0gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXNwb25zZS5ib2R5LnRlbXBsYXRlKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwJyk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHF1ZXJ5PzogVGVtcGxhdGVRdWVyeSk6IFByb21pc2U8SURvbWFpblRlbXBsYXRlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlcy5ib2R5LnRlbXBsYXRlKVxuICAgICAgKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZURhdGFcbiAgKTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhXG4gICk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZyk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95QWxsKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxOb3RpZmljYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJykpXG4gICAgICAudGhlbigocmVzOiBOb3RpZmljYXRpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgY3JlYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIGRhdGEpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShyZXMpXG4gICAgICApO1xuICB9XG5cbiAgZ2V0VmVyc2lvbihkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpXG4gICAgICApO1xuICB9XG5cbiAgdXBkYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBkZXN0cm95VmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgLnRoZW4oKHJlczogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGxpc3RWZXJzaW9ucyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5XG4gICk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhyZXMpXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7XG4gIEV2ZW50c0xpc3QsXG4gIEV2ZW50c1F1ZXJ5LFxuICBFdmVudHNSZXNwb25zZSxcbn0gZnJvbSAnLi4vVHlwZXMvRXZlbnRzJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJRXZlbnRDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPEV2ZW50c0xpc3Q+XG4gIGltcGxlbWVudHMgSUV2ZW50Q2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IEV2ZW50c1Jlc3BvbnNlLFxuICApOiBFdmVudHNMaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgRXZlbnRzTGlzdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnLycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgZ2V0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IEV2ZW50c1F1ZXJ5KSA6IFByb21pc2U8RXZlbnRzTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ2V2ZW50cycpLCBxdWVyeSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIElwUG9vbENyZWF0ZURhdGEsXG4gIElwUG9vbENyZWF0ZVJlc3BvbnNlLFxuICBJcFBvb2xDcmVhdGVSZXN1bHQsXG4gIElwUG9vbERlbGV0ZURhdGEsXG4gIElwUG9vbExpc3RSZXNwb25zZSxcbiAgSXBQb29sTGlzdFJlc3VsdCxcbiAgSXBQb29sTWVzc2FnZVJlc3BvbnNlLFxuICBJcFBvb2xNZXNzYWdlUmVzdWx0LFxuICBJcFBvb2xVcGRhdGVEYXRhLFxufSBmcm9tICcuLi9UeXBlcy9JUFBvb2xzJztcbmltcG9ydCB7IElJUFBvb2xzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElwUG9vbHNDbGllbnQgaW1wbGVtZW50cyBJSVBQb29sc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KCk6IFByb21pc2U8SXBQb29sTGlzdFJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjEvaXBfcG9vbHMnKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBJcFBvb2xMaXN0UmVzcG9uc2UpID0+IHRoaXMucGFyc2VJcFBvb2xzUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZShkYXRhOiBJcFBvb2xDcmVhdGVEYXRhKTogUHJvbWlzZTxJcFBvb2xDcmVhdGVSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZTogSXBQb29sQ3JlYXRlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YxL2lwX3Bvb2xzJywgZGF0YSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cblxuICBhc3luYyB1cGRhdGUocG9vbElkOiBzdHJpbmcsIGRhdGE6IElwUG9vbFVwZGF0ZURhdGEpOiBQcm9taXNlPElwUG9vbE1lc3NhZ2VSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZTogSXBQb29sTWVzc2FnZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBhdGNoV2l0aEZEKGAvdjEvaXBfcG9vbHMvJHtwb29sSWR9YCwgZGF0YSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cblxuICBhc3luYyBkZWxldGUocG9vbElkOiBzdHJpbmcsIGRhdGE6IElwUG9vbERlbGV0ZURhdGEpOiBQcm9taXNlPElwUG9vbE1lc3NhZ2VSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZTpJcFBvb2xNZXNzYWdlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjEvaXBfcG9vbHMvJHtwb29sSWR9YCwgZGF0YSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHBhcnNlSXBQb29sc1Jlc3BvbnNlKHJlc3BvbnNlOiBJcFBvb2xMaXN0UmVzcG9uc2UpOiBJcFBvb2xMaXN0UmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IE1nUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElwRGF0YSwgSVBzTGlzdFF1ZXJ5LCBJcHNMaXN0UmVzcG9uc2VCb2R5IH0gZnJvbSAnLi4vVHlwZXMvSVBzJztcbmltcG9ydCB7IElJUHNDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXBzQ2xpZW50IGltcGxlbWVudHMgSUlQc0NsaWVudCB7XG4gIHJlcXVlc3Q6IE1nUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBNZ1JlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgYXN5bmMgbGlzdChxdWVyeT86IElQc0xpc3RRdWVyeSk6IFByb21pc2U8SXBzTGlzdFJlc3BvbnNlQm9keT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2lwcycsIHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlPElwc0xpc3RSZXNwb25zZUJvZHk+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGdldChpcDogc3RyaW5nKTogUHJvbWlzZTxJcERhdGE+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92My9pcHMvJHtpcH1gKTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlPElwRGF0YT4ocmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUlwc1Jlc3BvbnNlPFQ+KHJlc3BvbnNlOiB7IGJvZHk6IFQgfSk6IFQge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG59XG4iLCJpbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMnO1xuaW1wb3J0IHtcbiAgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0FwaVJlc3BvbnNlLFxuICBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzUmVzdWx0LFxuICBJbmJveFBsYWNlbWVudHNWYWx1ZXNBcGlSZXNwb25zZSxcbiAgSW5ib3hQbGFjZW1lbnRzVmFsdWVzUmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQgaW1wbGVtZW50cyBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIHBhdGg6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBhc3luYyBsaXN0KCk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc1Jlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCh0aGlzLnBhdGgpIGFzIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNBcGlSZXNwb25zZTtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IHJlc3BvbnNlLmJvZHkuaXRlbXMsXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICB9IGFzIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNSZXN1bHQ7XG4gIH1cblxuICBhc3luYyBnZXQoYXR0cmlidXRlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNWYWx1ZXNSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5wYXRofS8ke2F0dHJpYnV0ZU5hbWV9YCkgYXMgSW5ib3hQbGFjZW1lbnRzVmFsdWVzQXBpUmVzcG9uc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHksXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IEluYm94UGxhY2VtZW50c0ZpbHRlcnNBcGlSZXNwb25zZSwgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc1Jlc3VsdCB9IGZyb20gJy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50IGltcGxlbWVudHMgSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBwYXRoOiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICB9XG5cbiAgYXN5bmMgbGlzdCgpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c0ZpbHRlcnNSZXN1bHQ+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHRoaXMucGF0aCkgYXMgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0FwaVJlc3BvbnNlO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3VsdC5zdGF0dXMsXG4gICAgICBzdXBwb3J0ZWRfZmlsdGVyczogcmVzdWx0LmJvZHkuc3VwcG9ydGVkX2ZpbHRlcnNcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBJSVBSU2hhcmluZ0NsaWVudCxcbiAgSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQsXG4gIElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50LFxuICBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCxcbiAgSUxvZ2dlclxufSBmcm9tICcuLi8uLi8uLi9JbnRlcmZhY2VzJztcblxuaW1wb3J0IHtcbiAgSW5ib3hQbGFjZW1lbnRzQm94LFxuICBJbmJveFBsYWNlbWVudHNEZXN0cm95QVBJUmVzcG9uc2UsXG4gIEluYm94UGxhY2VtZW50c0Rlc3Ryb3lSZXN1bHQsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdCxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJUmVzcG9uc2UsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdEFQSVNoYXBlLFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRXaXRoU3RhdHVzLFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRzQXBpUXVlcnksXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdHNEYXRlcyxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3QsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0QVBJUmVzcG9uc2UsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdHNRdWVyeVxufSBmcm9tICcuLi8uLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuXG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi8uLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi8uLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0PlxuICBpbXBsZW1lbnRzIElJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHVibGljIGF0dHJpYnV0ZXM6IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50O1xuICBwdWJsaWMgZmlsdGVyczogSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQ7XG4gIHB1YmxpYyBzaGFyaW5nOiBJSVBSU2hhcmluZ0NsaWVudDtcbiAgcHJpdmF0ZSBsb2dnZXI6IElMb2dnZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBhdHRyaWJ1dGVzOiBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCxcbiAgICBmaWx0ZXJzOiBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCxcbiAgICBzaGFyaW5nOiBJSVBSU2hhcmluZ0NsaWVudCxcbiAgICBsb2dnZXI6IElMb2dnZXIgPSBjb25zb2xlXG4gICkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgICB0aGlzLmZpbHRlcnMgPSBmaWx0ZXJzO1xuICAgIHRoaXMuc2hhcmluZyA9IHNoYXJpbmc7XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnREYXRlVG9VVEMoa2V5OnN0cmluZywgaW5wdXREYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAvKlxuICAgICAgQmVjYXVzZSBcIm5ldyBEYXRlKCcyMDIyLTEyLTI1VDAwOjAwOjAwLjAwMFonKVwiIGJlY29tZXMgXCJTdW4gRGVjIDI1IDIwMjIgMDI6MDA6MDAgR01UKzAyMDBcIlxuICAgICAgKHBsdXMgMiBob3VycyBmcm9tIHRoZSB0aW1lem9uZSlcbiAgICAgIGFuZCBiZWNhdXNlIGZvciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XG4gICAgICBleDogJ1RodSwgMTMgT2N0IDIwMTEgMTg6MDI6MDAgKzAwMDAnLlxuICAgICAgSGVyZSB3ZSB0cnkgYXV0by1jb252ZXJ0IHRoZW0gdG8gVVRDXG4gICAgKi9cbiAgICB0aGlzLmxvZ2dlci53YXJuKGBEYXRlOiBcIiR7aW5wdXREYXRlfVwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxuVmFsdWUgXCIke2lucHV0RGF0ZS50b0lTT1N0cmluZygpfVwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cbkNvbnNpZGVyIHVzaW5nIHN0cmluZyB0eXBlIGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiIHRvIGF2b2lkIGF1dG8tY29udmVydGluZ2ApO1xuICAgIHJldHVybiBpbnB1dERhdGUudG9JU09TdHJpbmcoKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVF1ZXJ5RGF0YShcbiAgICBxdWVyeURhdGE6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNRdWVyeVxuICApOiBJbmJveFBsYWNlbWVudHNSZXN1bHRzQXBpUXVlcnkge1xuICAgIGNvbnN0IHByb3BzRm9yUmVwbGFjZW1lbnQgPSBxdWVyeURhdGEgYXMgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0RhdGVzO1xuICAgIGNvbnN0IHJlcGxhY2VkUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wc0ZvclJlcGxhY2VtZW50KS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICBjb25zdCBwcm9wID0ga2V5IGFzIGtleW9mIEluYm94UGxhY2VtZW50c1Jlc3VsdHNEYXRlcztcbiAgICAgIGlmICghIXByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gJiYgdHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcXVlcnlEYXRhW3Byb3BdIGFzIERhdGU7XG4gICAgICAgIGFjY1twcm9wXSA9IHRoaXMuY29udmVydERhdGVUb1VUQyhwcm9wLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9IGFzIFJlY29yZDxrZXlvZiBJbmJveFBsYWNlbWVudHNSZXN1bHRzRGF0ZXMsIHN0cmluZz4pO1xuXG4gICAgY29uc3QgcmVzdWx0OiBJbmJveFBsYWNlbWVudHNSZXN1bHRzQXBpUXVlcnkgPSB7XG4gICAgICAuLi5xdWVyeURhdGEsXG4gICAgICAuLi5yZXBsYWNlZFByb3BzXG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0KGRhdGE6IEluYm94UGxhY2VtZW50c1Jlc3VsdEFQSVNoYXBlKTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0IHtcbiAgICBsZXQgYm94ID0ge30gYXMgSW5ib3hQbGFjZW1lbnRzQm94O1xuXG4gICAgY29uc3QgaGFuZGxlZFNlZWRMaXN0RGF0ZXMgPSB7XG4gICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpLFxuICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoZGF0YS51cGRhdGVkX2F0KSxcbiAgICAgIHNoYXJpbmdfZXhwaXJlc19hdDogbmV3IERhdGUoZGF0YS5zaGFyaW5nX2V4cGlyZXNfYXQpLFxuICAgIH07XG5cbiAgICBpZiAoZGF0YS5Cb3gpIHtcbiAgICAgIGJveCA9IHtcbiAgICAgICAgLi4uZGF0YS5Cb3gsXG4gICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuQm94LmNyZWF0ZWRfYXQpLFxuICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLkJveC51cGRhdGVkX2F0KSxcbiAgICAgICAgbGFzdF9yZXN1bHRfYXQ6IG5ldyBEYXRlKGRhdGEuQm94Lmxhc3RfcmVzdWx0X2F0KSxcbiAgICAgIH07XG4gICAgICBkZWxldGUgKGJveCBhcyB7SUQ/OiBzdHJpbmd9KS5JRDtcbiAgICB9XG5cbiAgICBjb25zdCBpbmJveFBsYWNlbWVudHNSZXN1bHQ6IEluYm94UGxhY2VtZW50c1Jlc3VsdCA9IHtcbiAgICAgIC4uLmRhdGEsXG4gICAgICBCb3g6IGJveCxcbiAgICAgIC4uLmhhbmRsZWRTZWVkTGlzdERhdGVzLFxuICAgICAgaWQ6IGRhdGEuSWQsXG4gICAgfTtcblxuICAgIGRlbGV0ZSAoaW5ib3hQbGFjZW1lbnRzUmVzdWx0IGFzIHtJRD86IHN0cmluZ30pLklEO1xuXG4gICAgcmV0dXJuIGluYm94UGxhY2VtZW50c1Jlc3VsdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QocmVzcG9uc2U6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0QVBJUmVzcG9uc2UpOiBJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0O1xuXG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKFxuICAgICAgKGl0ZW06IEluYm94UGxhY2VtZW50c1Jlc3VsdEFQSVNoYXBlKVxuICAgICAgICA6IEluYm94UGxhY2VtZW50c1Jlc3VsdCA9PiB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQoaXRlbSlcbiAgICApO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdChxdWVyeTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1F1ZXJ5KTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdD4ge1xuICAgIGNvbnN0IHF1ZXJ5RGF0YSA9IHRoaXMucHJlcGFyZVF1ZXJ5RGF0YShxdWVyeSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvaW5ib3gvcmVzdWx0cycsIHF1ZXJ5RGF0YSkgYXMgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3RBUElSZXNwb25zZTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Jlc3VsdFdpdGhTdGF0dXM+IHtcbiAgICBjb25zdCByZXNwb25zZTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjQvaW5ib3gvcmVzdWx0cy8ke2lkfWApIGFzIEluYm94UGxhY2VtZW50c1Jlc3VsdEFQSVJlc3BvbnNlO1xuICAgIGNvbnN0IGluYm94UGxhY2VtZW50UmVzdWx0OiBJbmJveFBsYWNlbWVudHNSZXN1bHQgPSB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQoXG4gICAgICByZXNwb25zZS5ib2R5LnJlc3VsdFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgaW5ib3hQbGFjZW1lbnRSZXN1bHRcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZGVzdHJveShpZDogc3RyaW5nKSA6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzRGVzdHJveVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2luYm94L3Jlc3VsdHMvJHtpZH1gKSBhcyBJbmJveFBsYWNlbWVudHNEZXN0cm95QVBJUmVzcG9uc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXRSZXN1bHRCeVNoYXJlSWQoc2hhcmVJZDogc3RyaW5nKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNSZXN1bHRXaXRoU3RhdHVzPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjQvaW5ib3gvc2hhcmluZy9wdWJsaWMvJHtzaGFyZUlkfWApIGFzIEluYm94UGxhY2VtZW50c1Jlc3VsdEFQSVJlc3BvbnNlO1xuICAgIGNvbnN0IGluYm94UGxhY2VtZW50UmVzdWx0OiBJbmJveFBsYWNlbWVudHNSZXN1bHQgPSB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQoXG4gICAgICByZXNwb25zZS5ib2R5LnJlc3VsdFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgaW5ib3hQbGFjZW1lbnRSZXN1bHRcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBJSVBSU2hhcmluZ0NsaWVudCB9IGZyb20gJy4uLy4uLy4uL0ludGVyZmFjZXMnO1xuaW1wb3J0IHtcbiAgSVBSU2hhcmluZ0FQSVJlc3BvbnNlLFxuICBJUFJTaGFyaW5nQXBpU2hhcGUsXG4gIElQUlNoYXJpbmdSZXN1bHQsXG4gIElQUlNoYXJpbmdVcGRhdGVBUElSZXNwb25zZSxcbiAgSVBSU2hhcmluZ1VwZGF0ZURhdGEsXG4gIElQUlNoYXJpbmdVcGRhdGVSZXN1bHRcbn0gZnJvbSAnLi4vLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uLy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSVBSU2hhcmluZ0NsaWVudCBpbXBsZW1lbnRzIElJUFJTaGFyaW5nQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0U2hhcmluZyhkYXRhOiBJUFJTaGFyaW5nQXBpU2hhcGUpOiBJUFJTaGFyaW5nUmVzdWx0IHtcbiAgICBjb25zdCBoYW5kbGVkU2VlZExpc3REYXRlcyA9IHtcbiAgICAgIGV4cGlyZXNfYXQ6IG5ldyBEYXRlKGRhdGEuZXhwaXJlc19hdCksXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdDogSVBSU2hhcmluZ1Jlc3VsdCA9IHtcbiAgICAgIC4uLmRhdGEsXG4gICAgICAuLi5oYW5kbGVkU2VlZExpc3REYXRlc1xuICAgIH07XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgYXN5bmMgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPElQUlNoYXJpbmdSZXN1bHQgJiB7c3RhdHVzOiBudW1iZXJ9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjQvaW5ib3gvc2hhcmluZy8ke2lkfWApIGFzIElQUlNoYXJpbmdBUElSZXNwb25zZTtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHRTaGFyaW5nKHJlc3BvbnNlLmJvZHkuc2hhcmluZyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzdWx0XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShcbiAgICBpZDogc3RyaW5nLFxuICAgIGRhdGE6IElQUlNoYXJpbmdVcGRhdGVEYXRhXG4gICk6IFByb21pc2U8SVBSU2hhcmluZ1VwZGF0ZVJlc3VsdCAmIHsgc3RhdHVzOiBudW1iZXIgfT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnB1dChgL3Y0L2luYm94L3NoYXJpbmcvJHtpZH1gLCB7fSwgeyBxdWVyeTogYGVuYWJsZWQ9JHtkYXRhLmVuYWJsZWR9YCB9KSBhcyBJUFJTaGFyaW5nVXBkYXRlQVBJUmVzcG9uc2U7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5wcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0U2hhcmluZyhyZXNwb25zZS5ib2R5LnNoYXJpbmcpO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5yZXN1bHQsXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIElMb2dnZXIsXG4gIElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50LFxuICBJU2VlZHNMaXN0c0NsaWVudCxcbiAgSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnRcbn0gZnJvbSAnLi4vLi4vLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBTZWVkTGlzdCxcbiAgU2VlZExpc3RBUElTaGFwZSxcbiAgU2VlZHNMaXN0c0FQSVF1ZXJ5LFxuICBTZWVkc0xpc3RzQVBJUXVlcnlEYXRlcyxcbiAgU2VlZHNMaXN0c0FQSVJlc3BvbnNlLFxuICBTZWVkc0xpc3RzQ3JlYXRpbmdEYXRhLFxuICBTZWVkc0xpc3RzUXVlcnksXG4gIFNlZWRzTGlzdHNSZXN1bHQsXG4gIFNlZWQsXG4gIFNlZWRBUElTaGFwZSxcbiAgU2VlZHNMaXN0c0Rlc3Ryb3lBcGlSZXNwb25zZSxcbiAgU2VlZHNMaXN0c1VwZGF0aW5nRGF0YSxcbiAgU2VlZExpc3RSZXN1bHQsXG4gIFNlZWRMaXN0R2V0QVBJUmVzcG9uc2UsXG4gIFNlZWRMaXN0QVBJUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uLy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uLy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VlZHNMaXN0c0NsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8U2VlZHNMaXN0c1Jlc3VsdD5cbiAgaW1wbGVtZW50cyBJU2VlZHNMaXN0c0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHB1YmxpYyBhdHRyaWJ1dGVzOiBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudDtcbiAgcHVibGljIGZpbHRlcnM6IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50O1xuICBwcml2YXRlIGxvZ2dlcjogSUxvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIGF0dHJpYnV0ZXM6IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50LFxuICAgIGZpbHRlcnM6IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50LFxuICAgIGxvZ2dlcjogSUxvZ2dlciA9IGNvbnNvbGVcbiAgKSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgIHRoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnREYXRlVG9VVEMoa2V5OnN0cmluZywgaW5wdXREYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICAvKlxuICAgICAgQmVjYXVzZSBcIm5ldyBEYXRlKCcyMDIyLTEyLTI1VDAwOjAwOjAwLjAwMFonKVwiIGJlY29tZXMgXCJTdW4gRGVjIDI1IDIwMjIgMDI6MDA6MDAgR01UKzAyMDBcIlxuICAgICAgKHBsdXMgMiBob3VycyBmcm9tIHRoZSB0aW1lem9uZSlcbiAgICAgIGFuZCBiZWNhdXNlIGZvciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XG4gICAgICBleDogJ1RodSwgMTMgT2N0IDIwMTEgMTg6MDI6MDAgKzAwMDAnLlxuICAgICAgSGVyZSB3ZSB0cnkgYXV0by1jb252ZXJ0IHRoZW0gdG8gVVRDXG4gICAgKi9cbiAgICB0aGlzLmxvZ2dlci53YXJuKGBEYXRlOiBcIiR7aW5wdXREYXRlfVwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxuVmFsdWUgXCIke2lucHV0RGF0ZS50b0lTT1N0cmluZygpfVwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cbkNvbnNpZGVyIHVzaW5nIHN0cmluZyB0eXBlIGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiIHRvIGF2b2lkIGF1dG8tY29udmVydGluZ2ApO1xuICAgIHJldHVybiBpbnB1dERhdGUudG9JU09TdHJpbmcoKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVF1ZXJ5RGF0YShxdWVyeURhdGE6IFNlZWRzTGlzdHNRdWVyeSkgOiBTZWVkc0xpc3RzQVBJUXVlcnkge1xuICAgIGNvbnN0IHByb3BzRm9yUmVwbGFjZW1lbnQgPSBxdWVyeURhdGEgYXMgU2VlZHNMaXN0c0FQSVF1ZXJ5RGF0ZXM7XG4gICAgY29uc3QgcmVwbGFjZWRQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzRm9yUmVwbGFjZW1lbnQpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHByb3AgPSBrZXkgYXMga2V5b2YgU2VlZHNMaXN0c0FQSVF1ZXJ5RGF0ZXM7XG4gICAgICBpZiAoISFwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdICYmIHR5cGVvZiBwcm9wc0ZvclJlcGxhY2VtZW50W3Byb3BdID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHF1ZXJ5RGF0YVtwcm9wXSBhcyBEYXRlO1xuICAgICAgICBhY2NbcHJvcF0gPSB0aGlzLmNvbnZlcnREYXRlVG9VVEMocHJvcCwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBSZWNvcmQ8a2V5b2YgU2VlZHNMaXN0c0FQSVF1ZXJ5RGF0ZXMsIHN0cmluZz4pO1xuXG4gICAgY29uc3QgcmVzdWx0OiBTZWVkc0xpc3RzQVBJUXVlcnkgPSB7XG4gICAgICAuLi5xdWVyeURhdGEsXG4gICAgICAuLi5yZXBsYWNlZFByb3BzXG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUmVzdWx0KGRhdGE6IFNlZWRMaXN0QVBJUmVzcG9uc2UpOiBTZWVkTGlzdFJlc3VsdCB7XG4gICAgbGV0IHJlc3VsdCA9IHt9IGFzIFNlZWRMaXN0UmVzdWx0O1xuICAgIGNvbnN0IHNlZWRMaXN0ID0gdGhpcy5wcmVwYXJlU2VlZExpc3QoZGF0YS5ib2R5KTtcbiAgICByZXN1bHQgPSB7XG4gICAgICAuLi5zZWVkTGlzdCxcbiAgICAgIHN0YXR1czogZGF0YS5zdGF0dXNcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVTZWVkTGlzdChkYXRhOiBTZWVkTGlzdEFQSVNoYXBlKTogU2VlZExpc3Qge1xuICAgIGxldCBzZWVkczogU2VlZFtdIHwgbnVsbDtcblxuICAgIGNvbnN0IGhhbmRsZWRTZWVkTGlzdERhdGVzID0ge1xuICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KSxcbiAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEudXBkYXRlZF9hdCksXG4gICAgICBsYXN0X3Jlc3VsdF9hdDogbmV3IERhdGUoZGF0YS5sYXN0X3Jlc3VsdF9hdCksXG4gICAgfTtcblxuICAgIGlmIChkYXRhLlNlZWRzKSB7XG4gICAgICBzZWVkcyA9IGRhdGEuU2VlZHMubWFwKChzZWVkSXRlbTogU2VlZEFQSVNoYXBlKTogU2VlZCA9PiB7XG4gICAgICAgIGxldCBzZWVkID0ge30gYXMgU2VlZDtcbiAgICAgICAgY29uc3QgaGFuZGxlZFNlZWREYXRlcyA9IHtcbiAgICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShzZWVkSXRlbS5jcmVhdGVkX2F0KSxcbiAgICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShzZWVkSXRlbS51cGRhdGVkX2F0KSxcbiAgICAgICAgICBtYXhfZW1haWxfY291bnRfaGl0X2F0OiBuZXcgRGF0ZShzZWVkSXRlbS5tYXhfZW1haWxfY291bnRfaGl0X2F0KSxcbiAgICAgICAgICBsYXN0X3NlbnRfdG9fYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLmxhc3Rfc2VudF90b19hdCksXG4gICAgICAgICAgbGFzdF9kZWxpdmVyZWRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLmxhc3RfZGVsaXZlcmVkX2F0KSxcbiAgICAgICAgfTtcbiAgICAgICAgc2VlZCA9IHtcbiAgICAgICAgICAuLi5zZWVkSXRlbSxcbiAgICAgICAgICAuLi5oYW5kbGVkU2VlZERhdGVzXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBzZWVkO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlZWRzID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBzZWVkTGlzdDogU2VlZExpc3QgPSB7XG4gICAgICAuLi5kYXRhLFxuICAgICAgU2VlZHM6IHNlZWRzLFxuICAgICAgLi4uaGFuZGxlZFNlZWRMaXN0RGF0ZXNcbiAgICB9O1xuXG4gICAgZGVsZXRlIChzZWVkTGlzdCBhcyB7SWQ/OiBzdHJpbmd9KS5JZDtcblxuICAgIHJldHVybiBzZWVkTGlzdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QocmVzcG9uc2U6IFNlZWRzTGlzdHNBUElSZXNwb25zZSk6IFNlZWRzTGlzdHNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBpdGVtczogW11cbiAgICB9IGFzIFNlZWRzTGlzdHNSZXN1bHQ7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcz8ubWFwKFxuICAgICAgKGl0ZW06IFNlZWRMaXN0QVBJU2hhcGUpOiBTZWVkTGlzdCA9PiB0aGlzLnByZXBhcmVTZWVkTGlzdChpdGVtKVxuICAgICk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5OiBTZWVkc0xpc3RzUXVlcnkpOiBQcm9taXNlPFNlZWRzTGlzdHNSZXN1bHQ+IHtcbiAgICBjb25zdCBxdWVyeURhdGEgPSB0aGlzLnByZXBhcmVRdWVyeURhdGEocXVlcnkpO1xuICAgIGNvbnN0IHJlc3BvbnNlOiBTZWVkc0xpc3RzQVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvaW5ib3gvc2VlZGxpc3RzJywgcXVlcnlEYXRhKSBhcyBTZWVkc0xpc3RzQVBJUmVzcG9uc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMucGFyc2VMaXN0KHJlc3BvbnNlKSxcbiAgICAgIHN0YXR1czogMjAwXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxTZWVkTGlzdFJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBTZWVkTGlzdEdldEFQSVJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2luYm94L3NlZWRsaXN0cy8ke2lkfWApIGFzIFNlZWRMaXN0R2V0QVBJUmVzcG9uc2U7XG4gICAgY29uc3QgdXBkYXRlZFNlZWRzTGlzdCA9IHRoaXMucHJlcGFyZVNlZWRMaXN0KHJlc3BvbnNlLmJvZHkuc2VlZGxpc3QpO1xuICAgIHJldHVybiB7XG4gICAgICAuLi51cGRhdGVkU2VlZHNMaXN0LFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKGRhdGE6IFNlZWRzTGlzdHNDcmVhdGluZ0RhdGEpOiBQcm9taXNlPFNlZWRMaXN0UmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3Y0L2luYm94L3NlZWRsaXN0cycsIGRhdGEpIGFzIFNlZWRMaXN0QVBJUmVzcG9uc2U7XG4gICAgcmV0dXJuIHRoaXMucHJlcGFyZVJlc3VsdChyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGUoaWQ6IHN0cmluZywgZGF0YTogU2VlZHNMaXN0c1VwZGF0aW5nRGF0YSk6IFByb21pc2U8U2VlZExpc3RSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wdXQoYC92NC9pbmJveC9zZWVkbGlzdHMvJHtpZH1gLCBkYXRhKSBhcyBTZWVkTGlzdEFQSVJlc3BvbnNlO1xuICAgIHJldHVybiB0aGlzLnByZXBhcmVSZXN1bHQocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxTZWVkc0xpc3RzRGVzdHJveUFwaVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92NC9pbmJveC9zZWVkbGlzdHMvJHtpZH1gKSBhcyB1bmtub3duIGFzIFNlZWRzTGlzdHNEZXN0cm95QXBpUmVzcG9uc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IElJbmJveFBsYWNlbWVudHNDbGllbnQsIElJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBJU2VlZHNMaXN0c0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL1NlZWRzTGlzdHMvU2VlZHNMaXN0c0NsaWVudCc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvcHJvdmlkZXJzL0luYm94UGxhY2VtZW50c1Byb3ZpZGVycyc7XG5pbXBvcnQgeyBJbmJveFBsYWNlbWVudHNEYXRhLCBJbmJveFBsYWNlbWVudHNUZXN0UmVzdWx0LCBJbmJveFBsYWNlbWVudHNUZXN0UmVzdWx0QVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmJveFBsYWNlbWVudHNDbGllbnQgaW1wbGVtZW50cyBJSW5ib3hQbGFjZW1lbnRzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHVibGljIHNlZWRzTGlzdHM6IElTZWVkc0xpc3RzQ2xpZW50O1xuICBwdWJsaWMgcmVzdWx0czogSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQ7XG4gIHB1YmxpYyBwcm92aWRlcnM6IElJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBzZWVkc0xpc3RzQ2xpZW50OiBJU2VlZHNMaXN0c0NsaWVudCxcbiAgICByZXN1bHRzOiBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCxcbiAgICBwcm92aWRlcnM6IElJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnRcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLnNlZWRzTGlzdHMgPSBzZWVkc0xpc3RzQ2xpZW50O1xuICAgIHRoaXMuc2VlZHNMaXN0cyA9IHNlZWRzTGlzdHNDbGllbnQ7XG4gICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0cztcbiAgICB0aGlzLnByb3ZpZGVycyA9IHByb3ZpZGVycztcbiAgfVxuXG4gIGFzeW5jIHJ1blRlc3QoZGF0YTogSW5ib3hQbGFjZW1lbnRzRGF0YSk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzVGVzdFJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3QoJy92NC9pbmJveC90ZXN0cycsIGRhdGEpIGFzIEluYm94UGxhY2VtZW50c1Rlc3RSZXN1bHRBUElSZXNwb25zZTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ucmVzcG9uc2UuYm9keSxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCB9IGZyb20gJy4uLy4uLy4uL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL3Byb3ZpZGVycy9JbmJveFBsYWNlbWVudHNQcm92aWRlcnMnO1xuaW1wb3J0IHsgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXIsIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyQVBJU2hhcGUsIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0xpc3QsIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0xpc3RBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi8uLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCBpbXBsZW1lbnRzIElJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwYXRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgKSB7XG4gICAgdGhpcy5wYXRoID0gJy92NC9pbmJveC9wcm92aWRlcnMnO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdEFQSVJlc3BvbnNlXG4gICk6IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNMaXN0O1xuXG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKFxuICAgICAgKGl0ZW06IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyQVBJU2hhcGUpOiBJbmJveFBsYWNlbWVudHNQcm92aWRlciA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZWRQcm92aWRlckRhdGVzID0ge1xuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGl0ZW0uY3JlYXRlZF9hdCksXG4gICAgICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoaXRlbS51cGRhdGVkX2F0KSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzdWx0OiBJbmJveFBsYWNlbWVudHNQcm92aWRlciA9IHtcbiAgICAgICAgICAuLi5pdGVtLFxuICAgICAgICAgIC4uLmhhbmRsZWRQcm92aWRlckRhdGVzXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgKTtcblxuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KCk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCh0aGlzLnBhdGgpIGFzIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0xpc3RBUElSZXNwb25zZTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgTWFpbGd1bkNsaWVudE9wdGlvbnMsIElucHV0Rm9ybURhdGEsIFJlcXVlc3RPcHRpb25zIH0gZnJvbSAnLi4vVHlwZXMnO1xuXG5pbXBvcnQgRG9tYWluc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc0NsaWVudCc7XG5pbXBvcnQgRXZlbnRDbGllbnQgZnJvbSAnLi9FdmVudHMnO1xuaW1wb3J0IFN0YXRzQ2xpZW50IGZyb20gJy4vU3RhdHMvU3RhdHNDbGllbnQnO1xuaW1wb3J0IFN1cHByZXNzaW9uQ2xpZW50IGZyb20gJy4vU3VwcHJlc3Npb25zL1N1cHByZXNzaW9uc0NsaWVudCc7XG5pbXBvcnQgV2ViaG9va3NDbGllbnQgZnJvbSAnLi9XZWJob29rcyc7XG5pbXBvcnQgTWVzc2FnZXNDbGllbnQgZnJvbSAnLi9NZXNzYWdlcyc7XG5pbXBvcnQgUm91dGVzQ2xpZW50IGZyb20gJy4vUm91dGVzJztcbmltcG9ydCBWYWxpZGF0ZUNsaWVudCBmcm9tICcuL1ZhbGlkYXRpb25zL3ZhbGlkYXRlJztcbmltcG9ydCBJcHNDbGllbnQgZnJvbSAnLi9JUHMnO1xuaW1wb3J0IElwUG9vbHNDbGllbnQgZnJvbSAnLi9JUFBvb2xzJztcbmltcG9ydCBNYWlsaW5nTGlzdHNDbGllbnQgZnJvbSAnLi9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzJztcbmltcG9ydCBNYWlsTGlzdHNNZW1iZXJzIGZyb20gJy4vTWFpbGluZ0xpc3RzL21haWxMaXN0TWVtYmVycyc7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNDcmVkZW50aWFscyc7XG5pbXBvcnQgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGZyb20gJy4vVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNUYWdzJztcbmltcG9ydCBTdWJhY2NvdW50c0NsaWVudCBmcm9tICcuL1N1YmFjY291bnRzJztcblxuaW1wb3J0IHtcbiAgSURvbWFpbnNDbGllbnQsXG4gIElXZWJIb29rc0NsaWVudCxcbiAgSU1haWxndW5DbGllbnQsXG4gIElNYWlsaW5nTGlzdHNDbGllbnQsXG4gIElFdmVudENsaWVudCxcbiAgSVN0YXRzQ2xpZW50LFxuICBJU3VwcHJlc3Npb25DbGllbnQsXG4gIElNZXNzYWdlc0NsaWVudCxcbiAgSVJvdXRlc0NsaWVudCxcbiAgSVZhbGlkYXRpb25DbGllbnQsXG4gIElJUHNDbGllbnQsXG4gIElJUFBvb2xzQ2xpZW50LFxuICBJU3ViYWNjb3VudHNDbGllbnQsXG4gIElJbmJveFBsYWNlbWVudHNDbGllbnQsXG59IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuaW1wb3J0IFNlZWRzTGlzdHNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50JztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvaW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9BdHRyaWJ1dGVzQ2xpZW50JztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL0ZpbHRlcnNDbGllbnQnO1xuaW1wb3J0IElQUlNoYXJpbmdDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudCc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL3Byb3ZpZGVycy9JbmJveFBsYWNlbWVudHNQcm92aWRlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsZ3VuQ2xpZW50IGltcGxlbWVudHMgSU1haWxndW5DbGllbnQge1xuICBwcml2YXRlIHJlcXVlc3Q7XG5cbiAgcHVibGljIGRvbWFpbnM6IElEb21haW5zQ2xpZW50O1xuICBwdWJsaWMgd2ViaG9va3M6IElXZWJIb29rc0NsaWVudDtcbiAgcHVibGljIGV2ZW50czogSUV2ZW50Q2xpZW50O1xuICBwdWJsaWMgc3RhdHM6IElTdGF0c0NsaWVudDtcbiAgcHVibGljIHN1cHByZXNzaW9uczogSVN1cHByZXNzaW9uQ2xpZW50O1xuICBwdWJsaWMgbWVzc2FnZXM6IElNZXNzYWdlc0NsaWVudDtcbiAgcHVibGljIHJvdXRlczogSVJvdXRlc0NsaWVudDtcbiAgcHVibGljIHZhbGlkYXRlOiBJVmFsaWRhdGlvbkNsaWVudDtcbiAgcHVibGljIGlwczogSUlQc0NsaWVudDtcbiAgcHVibGljIGlwX3Bvb2xzOiBJSVBQb29sc0NsaWVudDtcbiAgcHVibGljIGxpc3RzOiBJTWFpbGluZ0xpc3RzQ2xpZW50O1xuICBwdWJsaWMgc3ViYWNjb3VudHM6IElTdWJhY2NvdW50c0NsaWVudDtcbiAgcHVibGljIGluYm94X3BsYWNlbWVudHM6IElJbmJveFBsYWNlbWVudHNDbGllbnQ7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTWFpbGd1bkNsaWVudE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgY29uc3QgY29uZmlnOiBSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub3B0aW9ucyB9IGFzIFJlcXVlc3RPcHRpb25zO1xuXG4gICAgaWYgKCFjb25maWcudXJsKSB7XG4gICAgICBjb25maWcudXJsID0gJ2h0dHBzOi8vYXBpLm1haWxndW4ubmV0JztcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy51c2VybmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJ1c2VybmFtZVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcua2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcImtleVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHRoaXMucmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGNvbmZpZywgZm9ybURhdGEpO1xuICAgIGNvbnN0IG1haWxMaXN0c01lbWJlcnMgPSBuZXcgTWFpbExpc3RzTWVtYmVycyh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50ID0gbmV3IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluVGVtcGxhdGVzQ2xpZW50ID0gbmV3IERvbWFpblRlbXBsYXRlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpblRhZ3NDbGllbnQgPSBuZXcgRG9tYWluVGFnc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCA9IG5ldyBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBJbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudCA9IG5ldyBJUFJTaGFyaW5nQ2xpZW50KHRoaXMucmVxdWVzdCk7XG5cbiAgICBjb25zdCBzZWVkc0xpc3RzQXR0cmlidXRlcyA9IG5ldyBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9zZWVkbGlzdHMvYScpO1xuICAgIGNvbnN0IHJlc3VsdHNBdHRyaWJ1dGVzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3Jlc3VsdHMvYScpO1xuXG4gICAgY29uc3Qgc2VlZHNMaXN0c0ZpbHRlcnNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvc2VlZGxpc3RzL19maWx0ZXJzJyk7XG4gICAgY29uc3QgcmVzdWx0c0ZpbHRlcnNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvcmVzdWx0cy9fZmlsdGVycycpO1xuXG4gICAgY29uc3Qgc2VlZHNMaXN0c0NsaWVudCA9IG5ldyBTZWVkc0xpc3RzQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0LFxuICAgICAgc2VlZHNMaXN0c0F0dHJpYnV0ZXMsXG4gICAgICBzZWVkc0xpc3RzRmlsdGVyc0NsaWVudFxuICAgICk7XG5cbiAgICBjb25zdCBpbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQoXG4gICAgICB0aGlzLnJlcXVlc3QsXG4gICAgICByZXN1bHRzQXR0cmlidXRlc0NsaWVudCxcbiAgICAgIHJlc3VsdHNGaWx0ZXJzQ2xpZW50LFxuICAgICAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnRcbiAgICApO1xuXG4gICAgY29uc3QgaW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudChcbiAgICAgIHRoaXMucmVxdWVzdFxuICAgICk7XG5cbiAgICB0aGlzLmRvbWFpbnMgPSBuZXcgRG9tYWluc0NsaWVudChcbiAgICAgIHRoaXMucmVxdWVzdCxcbiAgICAgIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LFxuICAgICAgZG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICAgICAgZG9tYWluVGFnc0NsaWVudFxuICAgICk7XG4gICAgdGhpcy53ZWJob29rcyA9IG5ldyBXZWJob29rc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50Q2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0c0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuc3VwcHJlc3Npb25zID0gbmV3IFN1cHByZXNzaW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5tZXNzYWdlcyA9IG5ldyBNZXNzYWdlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMucm91dGVzID0gbmV3IFJvdXRlc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuaXBzID0gbmV3IElwc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuaXBfcG9vbHMgPSBuZXcgSXBQb29sc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMubGlzdHMgPSBuZXcgTWFpbGluZ0xpc3RzQ2xpZW50KHRoaXMucmVxdWVzdCwgbWFpbExpc3RzTWVtYmVycyk7XG4gICAgdGhpcy52YWxpZGF0ZSA9IG5ldyBWYWxpZGF0ZUNsaWVudCh0aGlzLnJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCk7XG4gICAgdGhpcy5zdWJhY2NvdW50cyA9IG5ldyBTdWJhY2NvdW50c0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuaW5ib3hfcGxhY2VtZW50cyA9IG5ldyBJbmJveFBsYWNlbWVudHNDbGllbnQoXG4gICAgICB0aGlzLnJlcXVlc3QsXG4gICAgICBzZWVkc0xpc3RzQ2xpZW50LFxuICAgICAgaW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCxcbiAgICAgIGluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCxcbiAgICApO1xuICB9XG5cbiAgc2V0U3ViYWNjb3VudChzdWJhY2NvdW50SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVxdWVzdD8uc2V0U3ViYWNjb3VudEhlYWRlcihzdWJhY2NvdW50SWQpO1xuICB9XG5cbiAgcmVzZXRTdWJhY2NvdW50KCk6IHZvaWQge1xuICAgIHRoaXMucmVxdWVzdD8ucmVzZXRTdWJhY2NvdW50SGVhZGVyKCk7XG4gIH1cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7XG4gIE1haWxMaXN0TWVtYmVyc1F1ZXJ5LFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMsXG4gIE1haWxMaXN0TWVtYmVyLFxuICBNdWx0aXBsZU1lbWJlcnNEYXRhLFxuICBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhLFxuICBEZWxldGVkTWVtYmVyLFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXEsXG4gIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlLFxuICBNYWlsTGlzdE1lbWJlcnNSZXN1bHQsXG4gIE1haWxMaXN0TWVtYmVyc1Jlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL01haWxpbmdMaXN0cyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvTWFpbGluZ0xpc3RzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbExpc3RzTWVtYmVyc1xuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8TWFpbExpc3RNZW1iZXJzUmVzdWx0PlxuICBpbXBsZW1lbnRzIElNYWlsTGlzdHNNZW1iZXJzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycykge1xuICAgIGNvbnN0IG5ld0RhdGEgPSB7IC4uLmRhdGEgfTtcblxuICAgIGlmICh0eXBlb2YgZGF0YS52YXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbmV3RGF0YS52YXJzID0gSlNPTi5zdHJpbmdpZnkobmV3RGF0YS52YXJzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEuc3Vic2NyaWJlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBuZXdEYXRhLnN1YnNjcmliZWQgPSBkYXRhLnN1YnNjcmliZWQgPyAneWVzJyA6ICdubyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld0RhdGEgYXMgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzUmVxO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogTWFpbExpc3RNZW1iZXJzUmVzcG9uc2UsXG4gICk6IE1haWxMaXN0TWVtYmVyc1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIE1haWxMaXN0TWVtYmVyc1Jlc3VsdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0TWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBxdWVyeT86IE1haWxMaXN0TWVtYmVyc1F1ZXJ5XG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXJzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzL3BhZ2VzYCwgcXVlcnkpO1xuICB9XG5cbiAgZ2V0TWVtYmVyKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgY3JlYXRlTWVtYmVyKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1xuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgY29uc3QgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnNgLCByZXFEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBjcmVhdGVNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlTWVtYmVyc0RhdGFcbiAgKTogUHJvbWlzZTxOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZT4ge1xuICAgIGNvbnN0IG5ld0RhdGE6IE11bHRpcGxlTWVtYmVyc1JlcURhdGEgPSB7XG4gICAgICBtZW1iZXJzOiBBcnJheS5pc0FycmF5KGRhdGEubWVtYmVycykgPyBKU09OLnN0cmluZ2lmeShkYXRhLm1lbWJlcnMpIDogZGF0YS5tZW1iZXJzLFxuICAgICAgdXBzZXJ0OiBkYXRhLnVwc2VydFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLmpzb25gLCBuZXdEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YCwgcmVxRGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgZGVzdHJveU1lbWJlcihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcpIDogUHJvbWlzZTxEZWxldGVkTWVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgRGVsZXRlZE1lbWJlcik7XG4gIH1cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7XG4gIExpc3RzUXVlcnksXG4gIENyZWF0ZVVwZGF0ZUxpc3QsXG4gIERlc3Ryb3llZExpc3QsXG4gIE1haWxpbmdMaXN0LFxuICBNYWlsaW5nTGlzdFZhbGlkYXRpb25BcGlSZXNwb25zZSxcbiAgU3RhcnRWYWxpZGF0aW9uUmVzdWx0LFxuICBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQsXG4gIE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdCxcbiAgTWFpbGluZ0xpc3RSZXN1bHQsXG4gIE1haWxpbmdMaXN0QXBpUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvTWFpbGluZ0xpc3RzJztcbmltcG9ydCB7IElNYWlsTGlzdHNNZW1iZXJzIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RNZW1iZXJzJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IElNYWlsaW5nTGlzdHNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbGluZ0xpc3RzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxNYWlsaW5nTGlzdFJlc3VsdD5cbiAgaW1wbGVtZW50cyBJTWFpbGluZ0xpc3RzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHB1YmxpYyBtZW1iZXJzOiBJTWFpbExpc3RzTWVtYmVycztcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBtZW1iZXJzOiBJTWFpbExpc3RzTWVtYmVycykge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgICB0aGlzLm1lbWJlcnMgPSBtZW1iZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZVZhbGlkYXRpb25SZXN1bHQoXG4gICAgc3RhdHVzOiBudW1iZXIsXG4gICAgZGF0YTogTWFpbGluZ0xpc3RWYWxpZGF0aW9uQXBpUmVzcG9uc2VcbiAgKTogTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgdmFsaWRhdGlvblJlc3VsdDoge1xuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQgKiAxMDAwKSAvLyBhZGQgbWlsbGlzZWNvbmQgdG8gVW5peCB0aW1lc3RhbXBcbiAgICAgIH1cbiAgICB9IGFzIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QocmVzcG9uc2U6IE1haWxpbmdMaXN0QXBpUmVzcG9uc2UpOiBNYWlsaW5nTGlzdFJlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIE1haWxpbmdMaXN0UmVzdWx0O1xuXG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5PzogTGlzdHNRdWVyeSk6IFByb21pc2U8TWFpbGluZ0xpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyhgJHt0aGlzLmJhc2VSb3V0ZX0vcGFnZXNgLCBxdWVyeSk7XG4gIH1cblxuICBnZXQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCBhcyBNYWlsaW5nTGlzdCk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodGhpcy5iYXNlUm91dGUsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCBhcyBNYWlsaW5nTGlzdCk7XG4gIH1cblxuICB1cGRhdGUobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubGlzdCBhcyBNYWlsaW5nTGlzdCk7XG4gIH1cblxuICBkZXN0cm95KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95ZWRMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgRGVzdHJveWVkTGlzdCk7XG4gIH1cblxuICB2YWxpZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8U3RhcnRWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgLCB7fSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gKHtcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICAgIH0pIGFzIFN0YXJ0VmFsaWRhdGlvblJlc3VsdCk7XG4gIH1cblxuICB2YWxpZGF0aW9uUmVzdWx0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYClcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzcG9uc2UpID0+IHRoaXMucGFyc2VWYWxpZGF0aW9uUmVzdWx0KFxuICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICAgcmVzcG9uc2UuYm9keSBhcyBNYWlsaW5nTGlzdFZhbGlkYXRpb25BcGlSZXNwb25zZVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgY2FuY2VsVmFsaWRhdGlvbihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+ICh7XG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICAgIH0gYXMgTWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0KSk7XG4gIH1cbn1cbiIsImltcG9ydCBBUElFcnJvciBmcm9tICcuL2NvbW1vbi9FcnJvcic7XG5pbXBvcnQge1xuICBNYWlsZ3VuTWVzc2FnZURhdGEsXG4gIE1lc3NhZ2VzU2VuZEFQSVJlc3BvbnNlLFxuICBNZXNzYWdlc1NlbmRSZXN1bHRcbn0gZnJvbSAnLi4vVHlwZXMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJTWVzc2FnZXNDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZXNDbGllbnQgaW1wbGVtZW50cyBJTWVzc2FnZXNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlQm9vbGVhblZhbHVlcyhkYXRhOiBNYWlsZ3VuTWVzc2FnZURhdGEpOiBNYWlsZ3VuTWVzc2FnZURhdGEge1xuICAgIGNvbnN0IHllc05vUHJvcGVydGllcyA9IG5ldyBTZXQoW1xuICAgICAgJ286dGVzdG1vZGUnLFxuICAgICAgJ3Q6dGV4dCcsXG4gICAgICAnbzpka2ltJyxcbiAgICAgICdvOnRyYWNraW5nJyxcbiAgICAgICdvOnRyYWNraW5nLWNsaWNrcycsXG4gICAgICAnbzp0cmFja2luZy1vcGVucycsXG4gICAgICAnbzpyZXF1aXJlLXRscycsXG4gICAgICAnbzpza2lwLXZlcmlmaWNhdGlvbidcbiAgICBdKTtcblxuICAgIGlmICghZGF0YSB8fCBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ01lc3NhZ2UgZGF0YSBvYmplY3QgY2FuIG5vdCBiZSBlbXB0eScsICdNZXNzYWdlIGRhdGEgb2JqZWN0IGNhbiBub3QgYmUgZW1wdHknKTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGlmICh5ZXNOb1Byb3BlcnRpZXMuaGFzKGtleSkgJiYgdHlwZW9mIGRhdGFba2V5XSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldID8gJ3llcycgOiAnbm8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWNjW2tleV0gPSBkYXRhW2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9IGFzIE1haWxndW5NZXNzYWdlRGF0YSk7XG4gIH1cblxuICBfcGFyc2VSZXNwb25zZShyZXNwb25zZTogTWVzc2FnZXNTZW5kQVBJUmVzcG9uc2UpOiBNZXNzYWdlc1NlbmRSZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG5cbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBNYWlsZ3VuTWVzc2FnZURhdGEpOiBQcm9taXNlPE1lc3NhZ2VzU2VuZFJlc3VsdD4ge1xuICAgIGlmIChkYXRhLm1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3YzLyR7ZG9tYWlufS9tZXNzYWdlcy5taW1lYCwgZGF0YSlcbiAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kaWZpZWREYXRhID0gdGhpcy5wcmVwYXJlQm9vbGVhblZhbHVlcyhkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92My8ke2RvbWFpbn0vbWVzc2FnZXNgLCBtb2RpZmllZERhdGEpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVJvdXRlc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuaW1wb3J0IHtcbiAgQ3JlYXRlVXBkYXRlUm91dGVEYXRhLCBEZXN0cm95Um91dGVSZXNwb25zZSwgUm91dGUsIFJvdXRlc0xpc3RRdWVyeSwgVXBkYXRlUm91dGVSZXNwb25zZVxufSBmcm9tICcuLi9UeXBlcy9Sb3V0ZXMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlc0NsaWVudCBpbXBsZW1lbnRzIElSb3V0ZXNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeTogUm91dGVzTGlzdFF1ZXJ5KTogUHJvbWlzZTxSb3V0ZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9yb3V0ZXMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyk7XG4gIH1cblxuICBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL3JvdXRlcy8ke2lkfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92My9yb3V0ZXMnLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5LnJvdXRlKTtcbiAgfVxuXG4gIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFVwZGF0ZVJvdXRlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgL3YzL3JvdXRlcy8ke2lkfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95Um91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IFN0YXRzUXVlcnksIFN0YXRzT3B0aW9ucyB9IGZyb20gJy4uLy4uL1R5cGVzL1N0YXRzJztcbmltcG9ydCB7IElMb2dnZXIgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0NvbW1vbic7XG5pbXBvcnQgU3RhdHNDb250YWluZXIgZnJvbSAnLi9TdGF0c0NvbnRhaW5lcic7XG5pbXBvcnQgeyBJU3RhdHNDbGllbnQsIElTdGF0c0NvbnRhaW5lciB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3RhdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c0NsaWVudCBpbXBsZW1lbnRzIElTdGF0c0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHByaXZhdGUgbG9nZ2VyOiBJTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIGxvZ2dlcjogSUxvZ2dlciA9IGNvbnNvbGUpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0RGF0ZVRvVVRDKGtleTpzdHJpbmcsIGlucHV0RGF0ZTogRGF0ZSk6IEFycmF5PHN0cmluZz4ge1xuICAgIC8qXG4gICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAqL1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYERhdGU6XCIke2lucHV0RGF0ZX1cIiB3YXMgYXV0by1jb252ZXJ0ZWQgdG8gVVRDIHRpbWUgem9uZS5cblZhbHVlIFwiJHtpbnB1dERhdGUudG9VVENTdHJpbmcoKX1cIiB3aWxsIGJlIHVzZWQgZm9yIHJlcXVlc3QuXG5Db25zaWRlciB1c2luZyBzdHJpbmcgdHlwZSBmb3IgcHJvcGVydHkgXCIke2tleX1cIiB0byBhdm9pZCBhdXRvLWNvbnZlcnRpbmdgKTtcbiAgICByZXR1cm4gW2tleSwgaW5wdXREYXRlLnRvVVRDU3RyaW5nKCldO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5OiBTdGF0c1F1ZXJ5IHwgdW5kZWZpbmVkKTogQXJyYXk8QXJyYXk8c3RyaW5nPj4ge1xuICAgIGxldCBzZWFyY2hQYXJhbXMgPSBbXSBhcyBBcnJheTxBcnJheTxzdHJpbmc+PjtcbiAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoKSB7XG4gICAgICBzZWFyY2hQYXJhbXMgPSBPYmplY3QuZW50cmllcyhxdWVyeSkucmVkdWNlKChhcnJheVdpdGhQYWlycywgY3VycmVudFBhaXIpID0+IHtcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gY3VycmVudFBhaXI7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCkgeyAvLyBldmVudDogWydkZWxpdmVyZWQnLCAnYWNjZXB0ZWQnXVxuICAgICAgICAgIGNvbnN0IHJlcGVhdGVkUHJvcGVydHkgPSB2YWx1ZS5tYXAoKGl0ZW0pID0+IFtrZXksIGl0ZW1dKTtcbiAgICAgICAgICByZXR1cm4gWy4uLmFycmF5V2l0aFBhaXJzLCAuLi5yZXBlYXRlZFByb3BlcnR5XTsgLy8gW1tldmVudCxkZWxpdmVyZWRdLCBbZXZlbnQsYWNjZXB0ZWRdXVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgIGFycmF5V2l0aFBhaXJzLnB1c2godGhpcy5jb252ZXJ0RGF0ZVRvVVRDKGtleSwgdmFsdWUpKTtcbiAgICAgICAgICByZXR1cm4gYXJyYXlXaXRoUGFpcnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGFycmF5V2l0aFBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcnJheVdpdGhQYWlycztcbiAgICAgIH0sIFtdIGFzIEFycmF5PEFycmF5PHN0cmluZz4+KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VhcmNoUGFyYW1zO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZVN0YXRzKHJlc3BvbnNlOiB7IGJvZHk6IFN0YXRzT3B0aW9ucyB9KTogSVN0YXRzQ29udGFpbmVyIHtcbiAgICByZXR1cm4gbmV3IFN0YXRzQ29udGFpbmVyKHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZ2V0RG9tYWluKGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPElTdGF0c0NvbnRhaW5lcj4ge1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzJywgZG9tYWluLCAnc3RhdHMvdG90YWwnKSwgc2VhcmNoUGFyYW1zKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZVN0YXRzKTtcbiAgfVxuXG4gIGdldEFjY291bnQocXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxJU3RhdHNDb250YWluZXI+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvc3RhdHMvdG90YWwnLCBzZWFyY2hQYXJhbXMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlU3RhdHMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJU3RhdHNDb250YWluZXIgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N0YXRzJztcbmltcG9ydCB7IFN0YXQsIFN0YXRzT3B0aW9ucyB9IGZyb20gJy4uLy4uL1R5cGVzL1N0YXRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHNDb250YWluZXIgaW1wbGVtZW50cyBJU3RhdHNDb250YWluZXIge1xuICAgIHN0YXJ0OiBEYXRlO1xuICAgIGVuZDogRGF0ZTtcbiAgICByZXNvbHV0aW9uOiBzdHJpbmc7XG4gICAgc3RhdHM6IFN0YXRbXTtcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBTdGF0c09wdGlvbnMpIHtcbiAgICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZShkYXRhLnN0YXJ0KTtcbiAgICAgIHRoaXMuZW5kID0gbmV3IERhdGUoZGF0YS5lbmQpO1xuICAgICAgdGhpcy5yZXNvbHV0aW9uID0gZGF0YS5yZXNvbHV0aW9uO1xuICAgICAgdGhpcy5zdGF0cyA9IGRhdGEuc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0OiBTdGF0KSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHsgLi4uc3RhdCB9O1xuICAgICAgICByZXMudGltZSA9IG5ldyBEYXRlKHN0YXQudGltZSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElTdWJhY2NvdW50c0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuaW1wb3J0IHtcbiAgU3ViYWNjb3VudExpc3RSZXNwb25zZURhdGEsXG4gIFN1YmFjY291bnRSZXNwb25zZURhdGEsXG4gIFN1YmFjY291bnRzUXVlcnksXG59IGZyb20gJy4uL1R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ViYWNjb3VudHNDbGllbnQgaW1wbGVtZW50cyBJU3ViYWNjb3VudHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBzdGF0aWMgU1VCQUNDT1VOVF9IRUFERVIgPSAnWC1NYWlsZ3VuLU9uLUJlaGFsZi1PZic7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogU3ViYWNjb3VudHNRdWVyeSk6IFByb21pc2U8U3ViYWNjb3VudExpc3RSZXNwb25zZURhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3Y1L2FjY291bnRzL3N1YmFjY291bnRzJywgcXVlcnkpXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gIH1cblxuICBnZXQoaWQ6c3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92NS9hY2NvdW50cy9zdWJhY2NvdW50cy8ke2lkfWApXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gIH1cblxuICBjcmVhdGUobmFtZTpzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92NS9hY2NvdW50cy9zdWJhY2NvdW50cycsIHsgbmFtZSB9KVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG5cbiAgZW5hYmxlKGlkOnN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChgL3Y1L2FjY291bnRzL3N1YmFjY291bnRzLyR7aWR9L2VuYWJsZWApXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gIH1cblxuICBkaXNhYmxlKGlkOnN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChgL3Y1L2FjY291bnRzL3N1YmFjY291bnRzLyR7aWR9L2Rpc2FibGVgKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IElCb3VuY2UgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBCb3VuY2VEYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm91bmNlIGV4dGVuZHMgU3VwcHJlc3Npb24gaW1wbGVtZW50cyBJQm91bmNlIHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IEJvdW5jZURhdGEpIHtcbiAgICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLkJPVU5DRVMpO1xuICAgICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgdGhpcy5jb2RlID0gK2RhdGEuY29kZTtcbiAgICAgIHRoaXMuZXJyb3IgPSBkYXRhLmVycm9yO1xuICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IElDb21wbGFpbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBDb21wbGFpbnREYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGxhaW50IGV4dGVuZHMgU3VwcHJlc3Npb24gaW1wbGVtZW50cyBJQ29tcGxhaW50IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBDb21wbGFpbnREYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5DT01QTEFJTlRTKTtcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1cHByZXNzaW9uIHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IodHlwZTogU3VwcHJlc3Npb25Nb2RlbHMpIHtcbiAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi4vY29tbW9uL0Vycm9yJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCBCb3VuY2UgZnJvbSAnLi9Cb3VuY2UnO1xuaW1wb3J0IENvbXBsYWludCBmcm9tICcuL0NvbXBsYWludCc7XG5pbXBvcnQgVW5zdWJzY3JpYmUgZnJvbSAnLi9VbnN1YnNjcmliZSc7XG5pbXBvcnQgV2hpdGVMaXN0IGZyb20gJy4vV2hpdGVMaXN0JztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uJztcbmltcG9ydCB7XG4gIElCb3VuY2UsXG4gIElDb21wbGFpbnQsXG4gIElTdXBwcmVzc2lvbkNsaWVudCxcbiAgSVVuc3Vic2NyaWJlLFxuICBJV2hpdGVMaXN0XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7XG4gIFN1cHByZXNzaW9uTGlzdCxcbiAgU3VwcHJlc3Npb25MaXN0UmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uRGF0YVR5cGUsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0LFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uTGlzdFF1ZXJ5LFxuICBTdXBwcmVzc2lvblJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQsXG4gIFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5cbmNvbnN0IGNyZWF0ZU9wdGlvbnMgPSB7XG4gIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBwcmVzc2lvbkNsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8U3VwcHJlc3Npb25MaXN0PlxuICBpbXBsZW1lbnRzIElTdXBwcmVzc2lvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIG1vZGVsczogb2JqZWN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubW9kZWxzID0ge1xuICAgICAgYm91bmNlczogQm91bmNlLFxuICAgICAgY29tcGxhaW50czogQ29tcGxhaW50LFxuICAgICAgdW5zdWJzY3JpYmVzOiBVbnN1YnNjcmliZSxcbiAgICAgIHdoaXRlbGlzdHM6IFdoaXRlTGlzdCxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogU3VwcHJlc3Npb25MaXN0UmVzcG9uc2UsXG4gICAgTW9kZWw6IHtcbiAgICAgIG5ldyhkYXRhOiBTdXBwcmVzc2lvbkRhdGFUeXBlKTpcbiAgICAgIElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdFxuICAgIH1cbiAgKTogU3VwcHJlc3Npb25MaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgU3VwcHJlc3Npb25MaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zPy5tYXAoKGl0ZW0pID0+IG5ldyBNb2RlbChpdGVtKSkgfHwgW107XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgX3BhcnNlSXRlbTxUIGV4dGVuZHMgU3VwcHJlc3Npb24+KFxuICAgIGRhdGEgOiBTdXBwcmVzc2lvbkRhdGFUeXBlLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YVR5cGU6IFN1cHByZXNzaW9uRGF0YVR5cGUpOlRcbiAgICB9XG4gICk6IFQge1xuICAgIHJldHVybiBuZXcgTW9kZWwoZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVdoaXRlTGlzdChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW10sXG4gICAgaXNEYXRhQXJyYXk6IGJvb2xlYW5cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgaWYgKGlzRGF0YUFycmF5KSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAnRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0JyxcbiAgICAgICAgJ1doaXRlbGlzdFxcJ3MgY3JlYXRpb24gcHJvY2VzcyBkb2VzIG5vdCBzdXBwb3J0IG11bHRpcGxlIGNyZWF0aW9ucy4gRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0J1xuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3RXaXRoRkQodXJsam9pbigndjMnLCBkb21haW4sICd3aGl0ZWxpc3RzJyksIGRhdGEgYXMgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVVuc3Vic2NyaWJlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkgeyAvLyBVc2VyIHByb3ZpZGVkIGFuIGFycmF5XG4gICAgICBjb25zdCBpc0NvbnRhaW5zVGFnID0gZGF0YS5zb21lKCh1bnN1YnNjcmliZTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEpID0+IHVuc3Vic2NyaWJlLnRhZyk7XG4gICAgICBpZiAoaXNDb250YWluc1RhZykge1xuICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAgICdUYWcgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSB1c2VkIGZvciBjcmVhdGluZyBtdWx0aXBsZSB1bnN1YnNjcmliZXMuJyxcbiAgICAgICAgICAnVGFnIHByb3BlcnR5IGNhbiBiZSB1c2VkIG9ubHkgaWYgb25lIHVuc3Vic2NyaWJlIHByb3ZpZGVkIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kLiBQbGVhc2UgdXNlIHRhZ3MgaW5zdGVhZC4nXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAgIC5wb3N0KHVybGpvaW4oJ3YzJywgZG9tYWluLCAndW5zdWJzY3JpYmVzJyksIEpTT04uc3RyaW5naWZ5KGRhdGEpLCBjcmVhdGVPcHRpb25zKVxuICAgICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGE/LnRhZ3MpIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgICdUYWdzIHByb3BlcnR5IHNob3VsZCBub3QgYmUgdXNlZCBmb3IgY3JlYXRpbmcgb25lIHVuc3Vic2NyaWJlLicsXG4gICAgICAgICdUYWdzIHByb3BlcnR5IGNhbiBiZSB1c2VkIGlmIHlvdSBwcm92aWRlcyBhbiBhcnJheSBvZiB1bnN1YnNjcmliZXMgYXMgc2Vjb25kIGFyZ3VtZW50IG9mIGNyZWF0ZSBtZXRob2QuIFBsZWFzZSB1c2UgdGFnIGluc3RlYWQnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhLnRhZykpIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgICdUYWcgcHJvcGVydHkgY2FuIG5vdCBiZSBhbiBhcnJheScsXG4gICAgICAgICdQbGVhc2UgdXNlIGFycmF5IG9mIHVuc3Vic2NyaWJlcyBhcyBzZWNvbmQgYXJndW1lbnQgb2YgY3JlYXRlIG1ldGhvZCB0byBiZSBhYmxlIHRvIHByb3ZpZGUgZmV3IHRhZ3MnXG4gICAgICApO1xuICAgIH1cbiAgICAvKiBXZSBuZWVkIEZvcm0gRGF0YSBmb3IgdW5zdWJzY3JpYmVzIGlmIHdlIHdhbnQgdG8gc3VwcG9ydCB0aGUgXCJ0YWdcIiBwcm9wZXJ0eSAqL1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAndW5zdWJzY3JpYmVzJyksIGRhdGEpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBwcml2YXRlIGdldE1vZGVsKHR5cGU6IHN0cmluZykge1xuICAgIGlmICh0eXBlIGluIHRoaXMubW9kZWxzKSB7XG4gICAgICByZXR1cm4gdGhpcy5tb2RlbHNbdHlwZSBhcyBrZXlvZiB0eXBlb2YgdGhpcy5tb2RlbHNdO1xuICAgIH1cbiAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgJ1Vua25vd24gdHlwZSB2YWx1ZScsXG4gICAgICAnVHlwZSBtYXkgYmUgb25seSBvbmUgb2YgW2JvdW5jZXMsIGNvbXBsYWludHMsIHVuc3Vic2NyaWJlcywgd2hpdGVsaXN0c10nXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVJlc3BvbnNlKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzcG9uc2UpOiBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgdHlwZTogcmVzcG9uc2UuYm9keS50eXBlIHx8ICcnLFxuICAgICAgdmFsdWU6IHJlc3BvbnNlLmJvZHkudmFsdWUgfHwgJycsXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH07XG4gIH1cblxuICBhc3luYyBsaXN0KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBxdWVyeT86IFN1cHByZXNzaW9uTGlzdFF1ZXJ5XG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25MaXN0PiB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlKSwgcXVlcnksIG1vZGVsKTtcbiAgfVxuXG4gIGdldChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8SUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0PiB7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5nZXQodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IFN1cHByZXNzaW9uUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlSXRlbTx0eXBlb2YgbW9kZWw+KHJlc3BvbnNlLmJvZHksIG1vZGVsKSk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+IHtcbiAgICB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgIC8vIHN1cHBvcnRzIGFkZGluZyBtdWx0aXBsZSBzdXBwcmVzc2lvbnMgYnkgZGVmYXVsdFxuICAgIGxldCBwb3N0RGF0YTtcbiAgICBjb25zdCBpc0RhdGFBcnJheSA9IEFycmF5LmlzQXJyYXkoZGF0YSk7XG5cbiAgICBpZiAodHlwZSA9PT0gJ3doaXRlbGlzdHMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVXaGl0ZUxpc3QoZG9tYWluLCBkYXRhLCBpc0RhdGFBcnJheSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGUgPT09ICd1bnN1YnNjcmliZXMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVVbnN1YnNjcmliZShkb21haW4sIGRhdGEpO1xuICAgIH1cblxuICAgIGlmICghaXNEYXRhQXJyYXkpIHtcbiAgICAgIHBvc3REYXRhID0gW2RhdGFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3N0RGF0YSA9IFsuLi5kYXRhXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIEpTT04uc3RyaW5naWZ5KHBvc3REYXRhKSwgY3JlYXRlT3B0aW9ucylcbiAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgfVxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdD4ge1xuICAgIHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLmRlbGV0ZSh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSwgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogU3VwcHJlc3Npb25EZXN0cm95UmVzcG9uc2UpID0+ICh7XG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgICAgdmFsdWU6IHJlc3BvbnNlLmJvZHkudmFsdWUgfHwgJycsXG4gICAgICAgIGFkZHJlc3M6IHJlc3BvbnNlLmJvZHkuYWRkcmVzcyB8fCAnJyxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICAgIH0pKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN1cHByZXNzaW9uQ2xpZW50O1xuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJVW5zdWJzY3JpYmUgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBVbnN1YnNjcmliZURhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuXG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuc3Vic2NyaWJlIGV4dGVuZHMgU3VwcHJlc3Npb24gaW1wbGVtZW50cyBJVW5zdWJzY3JpYmUge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICB0YWdzOiBzdHJpbmdbXTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogVW5zdWJzY3JpYmVEYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5VTlNVQlNDUklCRVMpO1xuICAgICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgdGhpcy50YWdzID0gZGF0YS50YWdzO1xuICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IElXaGl0ZUxpc3QgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBXaGl0ZUxpc3REYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2hpdGVMaXN0IGV4dGVuZHMgU3VwcHJlc3Npb24gaW1wbGVtZW50cyBJV2hpdGVMaXN0IHtcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIHJlYXNvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFdoaXRlTGlzdERhdGEpIHtcbiAgICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLldISVRFTElTVFMpO1xuICAgICAgdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgICB0aGlzLnJlYXNvbiA9IGRhdGEucmVhc29uO1xuICAgICAgdGhpcy5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRBdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQge1xuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHQsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYkRhdGEsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0LFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3BvbnNlLFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFF1ZXJ5LFxuICBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGEsXG4gIENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVVwZGF0ZWQsXG4gIENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iXG59IGZyb20gJy4uLy4uL1R5cGVzL1ZhbGlkYXRpb25zL011bHRpcGxlVmFsaWRhdGlvbic7XG5pbXBvcnQgQXR0YWNobWVudHNIYW5kbGVyIGZyb20gJy4uL2NvbW1vbi9BdHRhY2htZW50c0hhbmRsZXInO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZVZhbGlkYXRpb25Kb2IgaW1wbGVtZW50cyBNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHQge1xuICBjcmVhdGVkQXQ6IERhdGU7XG4gIGlkOiBzdHJpbmc7XG4gIHF1YW50aXR5OiBudW1iZXJcbiAgcmVjb3Jkc1Byb2Nlc3NlZDogbnVtYmVyIHwgbnVsbDtcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIGRvd25sb2FkVXJsPzoge1xuICAgIGNzdjogc3RyaW5nO1xuICAgIGpzb246IHN0cmluZztcbiAgfTtcblxuICByZXNwb25zZVN0YXR1c0NvZGU6IG51bWJlcjtcbiAgc3VtbWFyeT86IHtcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICAgIGNhdGNoQWxsOiBudW1iZXI7XG4gICAgICAgICAgZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICBkb05vdFNlbmQ6IG51bWJlcjtcbiAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgfTtcbiAgICAgIHJpc2s6IHtcbiAgICAgICAgICBoaWdoOiBudW1iZXI7XG4gICAgICAgICAgbG93OiBudW1iZXI7XG4gICAgICAgICAgbWVkaXVtOiBudW1iZXI7XG4gICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uSm9iRGF0YSwgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXIpIHtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgdGhpcy5xdWFudGl0eSA9IGRhdGEucXVhbnRpdHk7XG4gICAgdGhpcy5yZWNvcmRzUHJvY2Vzc2VkID0gZGF0YS5yZWNvcmRzX3Byb2Nlc3NlZDtcbiAgICB0aGlzLnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHRoaXMucmVzcG9uc2VTdGF0dXNDb2RlID0gcmVzcG9uc2VTdGF0dXNDb2RlO1xuICAgIGlmIChkYXRhLmRvd25sb2FkX3VybCkge1xuICAgICAgdGhpcy5kb3dubG9hZFVybCA9IHtcbiAgICAgICAgY3N2OiBkYXRhLmRvd25sb2FkX3VybD8uY3N2LFxuICAgICAgICBqc29uOiBkYXRhLmRvd25sb2FkX3VybD8uanNvblxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKGRhdGEuc3VtbWFyeSkge1xuICAgICAgdGhpcy5zdW1tYXJ5ID0ge1xuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICBjYXRjaEFsbDogZGF0YS5zdW1tYXJ5LnJlc3VsdC5jYXRjaF9hbGwsXG4gICAgICAgICAgZGVsaXZlcmFibGU6IGRhdGEuc3VtbWFyeS5yZXN1bHQuZGVsaXZlcmFibGUsXG4gICAgICAgICAgZG9Ob3RTZW5kOiBkYXRhLnN1bW1hcnkucmVzdWx0LmRvX25vdF9zZW5kLFxuICAgICAgICAgIHVuZGVsaXZlcmFibGU6IGRhdGEuc3VtbWFyeS5yZXN1bHQudW5kZWxpdmVyYWJsZSxcbiAgICAgICAgICB1bmtub3duOiBkYXRhLnN1bW1hcnkucmVzdWx0LnVua25vd25cbiAgICAgICAgfSxcbiAgICAgICAgcmlzazoge1xuICAgICAgICAgIGhpZ2g6IGRhdGEuc3VtbWFyeS5yaXNrLmhpZ2gsXG4gICAgICAgICAgbG93OiBkYXRhLnN1bW1hcnkucmlzay5sb3csXG4gICAgICAgICAgbWVkaXVtOiBkYXRhLnN1bW1hcnkucmlzay5tZWRpdW0sXG4gICAgICAgICAgdW5rbm93bjogZGF0YS5zdW1tYXJ5LnJpc2sudW5rbm93blxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PlxuICBpbXBsZW1lbnRzIElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwcml2YXRlIGF0dGFjaG1lbnRzSGFuZGxlcjogQXR0YWNobWVudHNIYW5kbGVyO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIgPSBuZXcgQXR0YWNobWVudHNIYW5kbGVyKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVJlc3BvbnNlPFQ+KHJlc3BvbnNlOiBBUElSZXNwb25zZSk6IFQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlPy5ib2R5XG4gICAgfSBhcyBUO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXNwb25zZSlcbiAgICA6IE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ7XG5cbiAgICBkYXRhLmpvYnMgPSByZXNwb25zZS5ib2R5LmpvYnMubWFwKChqb2IpID0+IG5ldyBNdWx0aXBsZVZhbGlkYXRpb25Kb2Ioam9iLCByZXNwb25zZS5zdGF0dXMpKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdwaXZvdCcpO1xuICAgIGRhdGEudG90YWwgPSByZXNwb25zZS5ib2R5LnRvdGFsO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5PzogTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeSk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcygnL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsaycsIHF1ZXJ5KTtcbiAgfVxuXG4gIGFzeW5jIGdldChsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWApO1xuICAgIHJldHVybiBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uSm9iKHJlc3BvbnNlLmJvZHksIHJlc3BvbnNlLnN0YXR1cyk7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRUb0V4cGVjdGVkU2hhcGUoZGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhKVxuICAgIDogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhVXBkYXRlZCB7XG4gICAgbGV0IG11bHRpcGxlVmFsaWRhdGlvbkRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVVwZGF0ZWQ7XG4gICAgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGRhdGEuZmlsZSkpIHtcbiAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IGRhdGEuZmlsZSB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEuZmlsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IHsgZGF0YTogZGF0YS5maWxlIH0gfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKGRhdGEuZmlsZSkpIHtcbiAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IGRhdGEuZmlsZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbXVsdGlwbGVWYWxpZGF0aW9uRGF0YTtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZShcbiAgICBsaXN0SWQ6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFcbiAgKTogUHJvbWlzZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgaWYgKCFkYXRhIHx8ICFkYXRhLmZpbGUpIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1wiZmlsZVwiIHByb3BlcnR5IGV4cGVjdGVkLicsICdNYWtlIHN1cmUgc2Vjb25kIGFyZ3VtZW50IGhhcyBcImZpbGVcIiBwcm9wZXJ0eS4nKTtcbiAgICB9XG4gICAgY29uc3QgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHRoaXMuY29udmVydFRvRXhwZWN0ZWRTaGFwZShkYXRhKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWAsIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEpO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlPENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3kobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWApO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZVJlc3BvbnNlPENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPihyZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElWYWxpZGF0aW9uQ2xpZW50LCBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uUXVlcnksIFZhbGlkYXRpb25SZXN1bHQsIFZhbGlkYXRpb25SZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL1ZhbGlkYXRpb25zJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdGVDbGllbnQgaW1wbGVtZW50cyBJVmFsaWRhdGlvbkNsaWVudCB7XG4gIHB1YmxpYyBtdWx0aXBsZVZhbGlkYXRpb247XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50OiBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLm11bHRpcGxlVmFsaWRhdGlvbiA9IG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDtcbiAgfVxuXG4gIGFzeW5jIGdldChhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICBjb25zdCBxdWVyeTogVmFsaWRhdGlvblF1ZXJ5ID0geyBhZGRyZXNzIH07XG4gICAgY29uc3QgcmVzdWx0OiBWYWxpZGF0aW9uUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvYWRkcmVzcy92YWxpZGF0ZScsIHF1ZXJ5KTtcbiAgICByZXR1cm4gcmVzdWx0LmJvZHkgYXMgVmFsaWRhdGlvblJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHsgV2ViaG9va3NJZHMgfSBmcm9tICcuLi9FbnVtcyc7XG5pbXBvcnQgeyBJV2ViSG9va3NDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzL1dlYmhvb2tzJztcblxuaW1wb3J0IHtcbiAgV2ViaG9va1ZhbGlkYXRpb25SZXNwb25zZSxcbiAgV2ViaG9va0xpc3QsXG4gIFdlYmhvb2tSZXNwb25zZSxcbiAgV2ViaG9va3NRdWVyeSxcbiAgV2ViaG9va1Jlc3VsdFxufSBmcm9tICcuLi9UeXBlcy9XZWJob29rcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGNsYXNzIFdlYmhvb2sgaW1wbGVtZW50cyBXZWJob29rUmVzdWx0IHtcbiAgaWQ6IHN0cmluZztcbiAgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHVybHM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkLCB1cmxzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLnVybHMgPSB1cmxzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYmhvb2tzQ2xpZW50IGltcGxlbWVudHMgSVdlYkhvb2tzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlV2ViaG9va0xpc3QocmVzcG9uc2U6IHsgYm9keTogeyB3ZWJob29rczogV2ViaG9va0xpc3QgfSB9KTogV2ViaG9va0xpc3Qge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5LndlYmhvb2tzO1xuICB9XG5cbiAgX3BhcnNlV2ViaG9va1dpdGhJRChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNwb25zZTogV2ViaG9va1Jlc3BvbnNlKTogV2ViaG9va1Jlc3VsdCB7XG4gICAgICBjb25zdCB3ZWJob29rUmVzcG9uc2UgPSByZXNwb25zZT8uYm9keT8ud2ViaG9vaztcbiAgICAgIGxldCB1cmwgPSB3ZWJob29rUmVzcG9uc2U/LnVybDtcbiAgICAgIGxldCB1cmxzID0gd2ViaG9va1Jlc3BvbnNlPy51cmxzO1xuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgdXJsID0gdXJscyAmJiB1cmxzLmxlbmd0aFxuICAgICAgICAgID8gdXJsc1swXVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKCghdXJscyB8fCB1cmxzLmxlbmd0aCA9PT0gMCkgJiYgdXJsKSB7XG4gICAgICAgIHVybHMgPSBbdXJsXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgV2ViaG9vayhpZCwgdXJsLCB1cmxzIGFzIHN0cmluZ1tdKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VXZWJob29rVGVzdChyZXNwb25zZTogeyBib2R5OiB7IGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nIH0gfSlcbiAgOiB7Y29kZTogbnVtYmVyLCBtZXNzYWdlOnN0cmluZ30ge1xuICAgIHJldHVybiB7XG4gICAgICBjb2RlOiByZXNwb25zZS5ib2R5LmNvZGUsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICB9IGFzIFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2U7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeTogV2ViaG9va3NRdWVyeSk6IFByb21pc2U8V2ViaG9va0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rTGlzdCk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIGlkOiBXZWJob29rc0lkcyk6IFByb21pc2U8V2ViaG9va1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIGNyZWF0ZShkb21haW46IHN0cmluZyxcbiAgICBpZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIHRlc3QgPSBmYWxzZSk6IFByb21pc2U8V2ViaG9va1Jlc3VsdCB8IFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2U+IHtcbiAgICBpZiAodGVzdCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkLCAndGVzdCcpLCB7IHVybCB9KVxuICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tUZXN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCB7IGlkLCB1cmwgfSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgdXBkYXRlKGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nLCB1cmxWYWx1ZXM6IHN0cmluZyB8IHN0cmluZ1tdKTogUHJvbWlzZTxXZWJob29rUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSwgeyB1cmw6IHVybFZhbHVlcyB9KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nKSA6IFByb21pc2U8V2ViaG9va1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0IHsgQ3VzdG9tRmlsZSwgQ3VzdG9tRmlsZURhdGEgfSBmcm9tICcuLi8uLi9UeXBlcyc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvcic7XG5pbXBvcnQgeyBBdHRhY2htZW50SW5mbywgU3RyZWFtVmFsdWUgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXR0YWNobWVudHMnO1xuXG5jbGFzcyBCbG9iRnJvbVN0cmVhbSB7XG4gIHByaXZhdGUgX3N0cmVhbTogUmVhZGFibGVcbiAgc2l6ZTogbnVtYmVyXG5cbiAgY29uc3RydWN0b3Ioc3RyZWFtOiBSZWFkYWJsZSwgc2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3RyZWFtID0gc3RyZWFtO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gIH1cblxuICBzdHJlYW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmVhbTtcbiAgfVxuXG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gJ0Jsb2InO1xuICB9XG59XG5cbmNsYXNzIEF0dGFjaG1lbnRzSGFuZGxlciB7XG4gIHByaXZhdGUgZ2V0QXR0YWNobWVudE9wdGlvbnMoaXRlbToge1xuICAgIGZpbGVuYW1lPzogc3RyaW5nO1xuICAgIGNvbnRlbnRUeXBlPyA6IHN0cmluZztcbiAgICBrbm93bkxlbmd0aD86IG51bWJlcjtcbiAgfSk6IEF0dGFjaG1lbnRJbmZvIHtcbiAgICBjb25zdCB7XG4gICAgICBmaWxlbmFtZSxcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAga25vd25MZW5ndGgsXG4gICAgfSA9IGl0ZW07XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLihmaWxlbmFtZSA/IHsgZmlsZW5hbWUgfSA6IHsgZmlsZW5hbWU6ICdmaWxlJyB9KSxcbiAgICAgIC4uLihjb250ZW50VHlwZSAmJiB7IGNvbnRlbnRUeXBlIH0pLFxuICAgICAgLi4uKGtub3duTGVuZ3RoICYmIHsga25vd25MZW5ndGggfSlcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGaWxlSW5mbyhmaWxlOiBGaWxlKSB7IC8vIGJyb3dzZXIgY29tcGxpYW50IGZpbGVcbiAgICBjb25zdCB7XG4gICAgICBuYW1lOiBmaWxlbmFtZSxcbiAgICAgIHR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgc2l6ZToga25vd25MZW5ndGgsXG4gICAgfSA9IGZpbGU7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZSwgY29udGVudFR5cGUsIGtub3duTGVuZ3RoIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDdXN0b21GaWxlSW5mbyhmaWxlOiBDdXN0b21GaWxlKSB7IC8vIGN1c3RvbSBjcmVhdGVkIGZpbGVcbiAgICBjb25zdCB7XG4gICAgICBmaWxlbmFtZSxcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAga25vd25MZW5ndGgsXG4gICAgfSA9IGZpbGU7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZSwgY29udGVudFR5cGUsIGtub3duTGVuZ3RoIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRCdWZmZXJJbmZvKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgY29uc3Qge1xuICAgICAgYnl0ZUxlbmd0aDoga25vd25MZW5ndGgsXG4gICAgfSA9IGJ1ZmZlcjtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyh7IGZpbGVuYW1lOiAnZmlsZScsIGNvbnRlbnRUeXBlOiAnJywga25vd25MZW5ndGggfSk7XG4gIH1cblxuICBwdWJsaWMgaXNTdHJlYW0oZGF0YTogdW5rbm93bikgOiBkYXRhIGlzIFN0cmVhbVZhbHVlIHtcbiAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmIHR5cGVvZiAoZGF0YSBhcyBTdHJlYW1WYWx1ZSkucGlwZSA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIHB1YmxpYyBpc0N1c3RvbUZpbGUob2JqOiB1bmtub3duKTogb2JqIGlzIEN1c3RvbUZpbGUge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xuICAgICAgJiYgISEob2JqIGFzIEN1c3RvbUZpbGUpLmRhdGE7XG4gIH1cblxuICBwdWJsaWMgaXNCcm93c2VyRmlsZShvYmo6IHVua25vd24pOiBvYmogaXMgRmlsZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICghIShvYmogYXMgRmlsZSkubmFtZSB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0J1ZmZlcihkYXRhOiB1bmtub3duKTogZGF0YSBpcyBCdWZmZXIge1xuICAgIHJldHVybiB0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBCdWZmZXIuaXNCdWZmZXIoZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXR0YWNobWVudEluZm8oXG4gICAgYXR0YWNobWVudDogQ3VzdG9tRmlsZSB8IEZpbGUgfCBzdHJpbmcgfCBDdXN0b21GaWxlRGF0YVxuICApOiBBdHRhY2htZW50SW5mbyB7XG4gICAgY29uc3QgaXNCcm93c2VyRmlsZSA9IHRoaXMuaXNCcm93c2VyRmlsZShhdHRhY2htZW50KTtcbiAgICBjb25zdCBpc0N1c3RvbUZpbGUgPSB0aGlzLmlzQ3VzdG9tRmlsZShhdHRhY2htZW50KTtcbiAgICBjb25zdCBpc1N0cmluZyA9IHR5cGVvZiBhdHRhY2htZW50ID09PSAnc3RyaW5nJztcbiAgICBpZiAoIWlzU3RyaW5nKSB7XG4gICAgICBpZiAoaXNCcm93c2VyRmlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWxlSW5mbyhhdHRhY2htZW50IGFzIEZpbGUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIEJ1ZmZlci5pc0J1ZmZlcihhdHRhY2htZW50KSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRCdWZmZXJJbmZvKGF0dGFjaG1lbnQgYXMgQnVmZmVyKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0N1c3RvbUZpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q3VzdG9tRmlsZUluZm8oYXR0YWNobWVudCBhcyBDdXN0b21GaWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zOiBBdHRhY2htZW50SW5mbyA9IHtcbiAgICAgIGZpbGVuYW1lOiAnZmlsZScsXG4gICAgICBjb250ZW50VHlwZTogdW5kZWZpbmVkLFxuICAgICAga25vd25MZW5ndGg6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgY29udmVydFRvRkRleHBlY3RlZFNoYXBlKFxuICAgIHVzZXJQcm92aWRlZFZhbHVlOiBDdXN0b21GaWxlIHwgRmlsZSB8IHN0cmluZyB8IEN1c3RvbUZpbGVEYXRhXG4gICkge1xuICAgIGNvbnN0IGlzU3RyZWFtID0gdGhpcy5pc1N0cmVhbSh1c2VyUHJvdmlkZWRWYWx1ZSk7XG4gICAgY29uc3QgaXNCcm93c2VyRmlsZSA9IHRoaXMuaXNCcm93c2VyRmlsZSh1c2VyUHJvdmlkZWRWYWx1ZSk7XG4gICAgY29uc3QgaXNDdXN0b21GaWxlID0gdGhpcy5pc0N1c3RvbUZpbGUodXNlclByb3ZpZGVkVmFsdWUpO1xuICAgIGNvbnN0IGlzU3RyaW5nID0gdHlwZW9mIHVzZXJQcm92aWRlZFZhbHVlID09PSAnc3RyaW5nJztcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChpc1N0cmVhbSB8fCBpc1N0cmluZyB8fCBpc0Jyb3dzZXJGaWxlIHx8IHRoaXMuaXNCdWZmZXIodXNlclByb3ZpZGVkVmFsdWUpKSB7XG4gICAgICByZXN1bHQgPSB1c2VyUHJvdmlkZWRWYWx1ZTtcbiAgICB9IGVsc2UgaWYgKGlzQ3VzdG9tRmlsZSkge1xuICAgICAgcmVzdWx0ID0gdXNlclByb3ZpZGVkVmFsdWUuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgYFVua25vd24gYXR0YWNobWVudCB0eXBlICR7dHlwZW9mIHVzZXJQcm92aWRlZFZhbHVlfWAsXG4gICAgICAgIGBUaGUgXCJhdHRhY2htZW50XCIgcHJvcGVydHkgZXhwZWN0cyBlaXRoZXIgQnVmZmVyLCBCbG9iLCBvciBTdHJpbmcuXG4gICAgICAgICAgQWxzbywgSXQgaXMgcG9zc2libGUgdG8gcHJvdmlkZSBhbiBvYmplY3QgdGhhdCBoYXMgdGhlIHByb3BlcnR5IFwiZGF0YVwiIHdpdGggYSB2YWx1ZSB0aGF0IGlzIGVxdWFsIHRvIG9uZSBvZiB0aGUgdHlwZXMgY291bnRlZCBiZWZvcmUuXG4gICAgICAgICAgQWRkaXRpb25hbGx5LCB5b3UgbWF5IHVzZSBhbiBhcnJheSB0byBzZW5kIG1vcmUgdGhhbiBvbmUgYXR0YWNobWVudC5gXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGdldEJsb2JGcm9tU3RyZWFtKHN0cmVhbTogUmVhZGFibGUsIHNpemU6IG51bWJlcik6IEJsb2JGcm9tU3RyZWFtIHtcbiAgICByZXR1cm4gbmV3IEJsb2JGcm9tU3RyZWFtKHN0cmVhbSwgc2l6ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXR0YWNobWVudHNIYW5kbGVyO1xuIiwiaW1wb3J0IHsgQVBJRXJyb3JPcHRpb25zLCBBUElFcnJvclR5cGUgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUElFcnJvciBleHRlbmRzIEVycm9yIGltcGxlbWVudHMgQVBJRXJyb3JUeXBlIHtcbiAgcHVibGljIHN0YXR1czogbnVtYmVyIDtcbiAgcHVibGljIHN0YWNrOiBzdHJpbmc7XG4gIHB1YmxpYyBkZXRhaWxzOiBzdHJpbmc7XG4gIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG5cbiAgcHVibGljIHN0YXRpYyBnZXRVc2VyRGF0YUVycm9yKHN0YXR1c1RleHQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKHtcbiAgICAgIHN0YXR1czogNDAwLFxuICAgICAgc3RhdHVzVGV4dCxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIHN0YXR1cyxcbiAgICBzdGF0dXNUZXh0LFxuICAgIG1lc3NhZ2UsXG4gICAgYm9keSA9IHt9XG4gIH06IEFQSUVycm9yT3B0aW9ucykge1xuICAgIGxldCBib2R5TWVzc2FnZSA9ICcnO1xuICAgIGxldCBlcnJvciA9ICcnO1xuICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGJvZHlNZXNzYWdlID0gYm9keTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9keU1lc3NhZ2UgPSBib2R5Py5tZXNzYWdlIHx8ICcnO1xuICAgICAgZXJyb3IgPSBib2R5Py5lcnJvciB8fCAnJztcbiAgICB9XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IGVycm9yIHx8IHN0YXR1c1RleHQgfHwgJyc7XG4gICAgdGhpcy5kZXRhaWxzID0gYm9keU1lc3NhZ2U7XG4gICAgdGhpcy50eXBlID0gJ01haWxndW5BUElFcnJvcic7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0IHsgRm9ybURhdGFJbnB1dCwgSW5wdXRGb3JtRGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvcic7XG5cbmltcG9ydCB7XG4gIEN1c3RvbUZpbGUsXG4gIEN1c3RvbUZpbGVEYXRhLFxuICBGb3JtRGF0YUlucHV0VmFsdWUsXG4gIE1lc3NhZ2VBdHRhY2htZW50LFxuICBNaW1lTWVzc2FnZVxufSBmcm9tICcuLi8uLi9UeXBlcyc7XG5pbXBvcnQgQXR0YWNobWVudHNIYW5kbGVyIGZyb20gJy4vQXR0YWNobWVudHNIYW5kbGVyJztcbmltcG9ydCB7IEF0dGFjaG1lbnRJbmZvIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0F0dGFjaG1lbnRzJztcblxuY2xhc3MgRm9ybURhdGFCdWlsZGVyIHtcbiAgcHJpdmF0ZSBGb3JtRGF0YUNvbnN0cnVjdG9yOiBJbnB1dEZvcm1EYXRhO1xuICBwcml2YXRlIGZpbGVLZXlzOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBhdHRhY2htZW50c0hhbmRsZXI6IEF0dGFjaG1lbnRzSGFuZGxlcjtcblxuICBjb25zdHJ1Y3RvcihGb3JtRGF0YUNvbnN0cnVjdG9yOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy5Gb3JtRGF0YUNvbnN0cnVjdG9yID0gRm9ybURhdGFDb25zdHJ1Y3RvcjtcbiAgICB0aGlzLmZpbGVLZXlzID0gWydhdHRhY2htZW50JywgJ2lubGluZScsICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJ107XG4gICAgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIgPSBuZXcgQXR0YWNobWVudHNIYW5kbGVyKCk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlRm9ybURhdGEoZGF0YTogRm9ybURhdGFJbnB1dCk6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhIHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgZGF0YSBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgZm9ybURhdGE6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZGF0YVtrZXldOyB9KVxuICAgICAgLnJlZHVjZSgoZm9ybURhdGFBY2M6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZmlsZUtleXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgIGNvbnN0IGF0dGFjaG1lbnRWYWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgICBpZiAodGhpcy5pc01lc3NhZ2VBdHRhY2htZW50KGF0dGFjaG1lbnRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRmlsZXNUb0ZEKGtleSwgYXR0YWNobWVudFZhbHVlLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgICAgICBgVW5rbm93biB2YWx1ZSAke2RhdGFba2V5XX0gd2l0aCB0eXBlICR7dHlwZW9mIGRhdGFba2V5XX0gZm9yIHByb3BlcnR5IFwiJHtrZXl9XCJgLFxuICAgICAgICAgICAgYFRoZSBrZXkgXCIke2tleX1cIiBzaG91bGQgaGF2ZSB0eXBlIG9mIEJ1ZmZlciwgU3RyZWFtLCBGaWxlLCBvciBTdHJpbmcgYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5ID09PSAnbWVzc2FnZScpIHsgLy8gbWltZSBtZXNzYWdlXG4gICAgICAgICAgY29uc3QgbWVzc2FnZVZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICAgIGlmICghbWVzc2FnZVZhbHVlIHx8ICF0aGlzLmlzTUlNRShtZXNzYWdlVmFsdWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAgICAgICBgVW5rbm93biBkYXRhIHR5cGUgZm9yIFwiJHtrZXl9XCIgcHJvcGVydHlgLFxuICAgICAgICAgICAgICAnVGhlIG1pbWUgZGF0YSBzaG91bGQgaGF2ZSB0eXBlIG9mIEJ1ZmZlciwgU3RyaW5nIG9yIEJsb2InXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZE1pbWVEYXRhVG9GRChrZXksIG1lc3NhZ2VWYWx1ZSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uUHJvcGVydHlUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgIH0sIG5ldyB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IoKSk7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRNaW1lRGF0YVRvRkQoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgZGF0YTogTWltZU1lc3NhZ2UsXG4gICAgZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykgeyAvLyBpZiBzdHJpbmcgb25seSB0d28gcGFyYW1ldGVycyBzaG91bGQgYmUgdXNlZC5cbiAgICAgIGZvcm1EYXRhSW5zdGFuY2UuYXBwZW5kKGtleSwgZGF0YSBhcyBzdHJpbmcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRm9ybURhdGFQYWNrYWdlKGZvcm1EYXRhSW5zdGFuY2UpKSB7IC8vIGZvcm0tZGF0YSBwYWNrYWdlIGlzIHVzZWRcbiAgICAgIGNvbnN0IG5vZGVGb3JtRGF0YSA9IGZvcm1EYXRhSW5zdGFuY2UgYXMgTm9kZUZvcm1EYXRhO1xuICAgICAgbm9kZUZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGEsIHsgZmlsZW5hbWU6ICdNaW1lTWVzc2FnZScgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBCbG9iICE9PSB1bmRlZmluZWQpIHsgLy8gZWl0aGVyIG5vZGUgPiAxOCBvciBicm93c2VyXG4gICAgICBjb25zdCBicm93c2VyRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlIGFzIEZvcm1EYXRhOyAvLyBCcm93c2VyIGNvbXBsaWFudCBGb3JtRGF0YVxuICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhLCAnTWltZU1lc3NhZ2UnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGRhdGEpKSB7IC8vIG5vZGUgZW52aXJvbm1lbnRcbiAgICAgICAgY29uc3QgYmxvYkluc3RhbmNlID0gbmV3IEJsb2IoW2RhdGFdKTtcbiAgICAgICAgYnJvd3NlckZvcm1EYXRhLmFwcGVuZChrZXksIGJsb2JJbnN0YW5jZSwgJ01pbWVNZXNzYWdlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzTUlNRShkYXRhOiB1bmtub3duKSA6IGRhdGEgaXMgTWltZU1lc3NhZ2Uge1xuICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZydcbiAgICAgIHx8ICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihkYXRhKVxuICAgICAgfHwgKHR5cGVvZiBSZWFkYWJsZVN0cmVhbSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YSBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNGb3JtRGF0YVBhY2thZ2Uob2JqOiB1bmtub3duKTogb2JqIGlzIE5vZGVGb3JtRGF0YSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG4gICAgICAmJiBvYmogIT09IG51bGxcbiAgICAgICYmIHR5cGVvZiAob2JqIGFzIE5vZGVGb3JtRGF0YSkuZ2V0SGVhZGVycyA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIHByaXZhdGUgaXNNZXNzYWdlQXR0YWNobWVudCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIE1lc3NhZ2VBdHRhY2htZW50IHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNDdXN0b21GaWxlKHZhbHVlKVxuICAgICAgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xuICAgICAgfHwgKHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpXG4gICAgICB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQmxvYilcbiAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKHZhbHVlKVxuICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0odmFsdWUpXG4gICAgICB8fCAoXG4gICAgICAgIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmV2ZXJ5KFxuICAgICAgICAgIChpdGVtKSA9PiB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0N1c3RvbUZpbGUoaXRlbSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSBpbnN0YW5jZW9mIEZpbGUpXG4gICAgICAgICAgICB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQmxvYilcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGl0ZW0pXG4gICAgICAgICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShpdGVtKVxuICAgICAgICApXG4gICAgICApXG5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRGaWxlc1RvRkQoXG4gICAgcHJvcGVydHlOYW1lOiB0eXBlb2YgdGhpcy5maWxlS2V5c1tudW1iZXJdLFxuICAgIHZhbHVlOiBNZXNzYWdlQXR0YWNobWVudCxcbiAgICBmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhcHBlbmRGaWxlVG9GRCA9IChcbiAgICAgIG9yaWdpbmFsS2V5OiBzdHJpbmcsXG4gICAgICBhdHRhY2htZW50OiBDdXN0b21GaWxlIHwgRmlsZSB8IHN0cmluZ3wgQ3VzdG9tRmlsZURhdGEsXG4gICAgICBmb3JtRGF0YTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgICApOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IG9yaWdpbmFsS2V5ID09PSAnbXVsdGlwbGVWYWxpZGF0aW9uRmlsZScgPyAnZmlsZScgOiBvcmlnaW5hbEtleTtcbiAgICAgIGNvbnN0IG9iakRhdGEgPSB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5jb252ZXJ0VG9GRGV4cGVjdGVkU2hhcGUoYXR0YWNobWVudCk7XG4gICAgICBjb25zdCBvcHRpb25zOiBBdHRhY2htZW50SW5mbyA9IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmdldEF0dGFjaG1lbnRJbmZvKGF0dGFjaG1lbnQpO1xuXG4gICAgICBpZiAodGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YSkpIHtcbiAgICAgICAgY29uc3QgZmQgPSBmb3JtRGF0YSBhcyBOb2RlRm9ybURhdGE7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0eXBlb2Ygb2JqRGF0YSA9PT0gJ3N0cmluZycgPyBCdWZmZXIuZnJvbShvYmpEYXRhKSA6IG9iakRhdGE7XG4gICAgICAgIGZkLmFwcGVuZChrZXksIGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkKSB7IC8vIGVpdGhlciBub2RlID4gMTggb3IgYnJvd3NlclxuICAgICAgICBjb25zdCBicm93c2VyRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlIGFzIEZvcm1EYXRhOyAvLyBCcm93c2VyIGNvbXBsaWFudCBGb3JtRGF0YVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqRGF0YSA9PT0gJ3N0cmluZycgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIob2JqRGF0YSkpIHtcbiAgICAgICAgICBjb25zdCBibG9iSW5zdGFuY2UgPSBuZXcgQmxvYihbb2JqRGF0YV0pO1xuICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBibG9iSW5zdGFuY2UsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYmpEYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBvYmpEYXRhLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0ob2JqRGF0YSkpIHtcbiAgICAgICAgICBjb25zdCBibG9iID0gdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuZ2V0QmxvYkZyb21TdHJlYW0oXG4gICAgICAgICAgICBvYmpEYXRhIGFzIHVua25vd24gYXMgUmVhZGFibGUsXG4gICAgICAgICAgICBvcHRpb25zLmtub3duTGVuZ3RoIGFzIG51bWJlclxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJvd3NlckZvcm1EYXRhLnNldChrZXksIGJsb2IgYXMgdW5rbm93biBhcyBGaWxlLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCBpdGVtLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBlbmRGaWxlVG9GRChwcm9wZXJ0eU5hbWUsIHZhbHVlLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZENvbW1vblByb3BlcnR5VG9GRChcbiAgICBrZXk6IHN0cmluZyxcbiAgICB2YWx1ZTogRm9ybURhdGFJbnB1dFZhbHVlLFxuICAgIGZvcm1EYXRhQWNjOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhZGRWYWx1ZUJhc2VkT25GRCA9IChmZEtleTogc3RyaW5nLCBmZFZhbHVlOiBGb3JtRGF0YUlucHV0VmFsdWUpOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLmlzRm9ybURhdGFQYWNrYWdlKGZvcm1EYXRhQWNjKSkge1xuICAgICAgICBpZiAodHlwZW9mIGZkVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSByZWNlaXZlZCB2YWx1ZSBpcyBhbiBvYmplY3QuIFxcbidcbiAgICAgICAgICArICdcIkpTT04uU3RyaW5naWZ5XCIgd2lsbCBiZSB1c2VkIHRvIGF2b2lkIFR5cGVFcnJvciBcXG4nXG4gICAgICAgICAgKyAnVG8gcmVtb3ZlIHRoaXMgd2FybmluZzogXFxuJ1xuICAgICAgICAgICsgJ0NvbnNpZGVyIHN3aXRjaGluZyB0byBidWlsdC1pbiBGb3JtRGF0YSBvciBjb252ZXJ0aW5nIHRoZSB2YWx1ZSBvbiB5b3VyIG93bi5cXG4nKTtcbiAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBKU09OLnN0cmluZ2lmeShmZFZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgZmRWYWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGZkVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIGZkVmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBCbG9iICE9PSB1bmRlZmluZWQgJiYgZmRWYWx1ZSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgZmRWYWx1ZSk7XG4gICAgICB9XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAnVW5rbm93biB2YWx1ZSB0eXBlIGZvciBGb3JtIERhdGEuIFN0cmluZyBvciBCbG9iIGV4cGVjdGVkJyxcbiAgICAgICAgJ0Jyb3dzZXIgY29tcGxpYW50IEZvcm1EYXRhIGFsbG93cyBvbmx5IHN0cmluZyBvciBCbG9iIHZhbHVlcyBmb3IgcHJvcGVydGllcyB0aGF0IGFyZSBub3QgYXR0YWNobWVudHMuJ1xuICAgICAgKTtcbiAgICB9O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOiBGb3JtRGF0YUlucHV0VmFsdWUpIHtcbiAgICAgICAgYWRkVmFsdWVCYXNlZE9uRkQoa2V5LCBpdGVtKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgYWRkVmFsdWVCYXNlZE9uRkQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBGb3JtRGF0YUJ1aWxkZXI7XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvcic7XG5cbmltcG9ydCB7XG4gIFBhZ2VzTGlzdEFjY3VtdWxhdG9yLFxuICBQYXJzZWRQYWdlLFxuICBQYXJzZWRQYWdlc0xpc3QsXG4gIFF1ZXJ5V2l0aFBhZ2UsXG4gIFJlc3BvbnNlV2l0aFBhZ2luZyxcbiAgVXBkYXRlZFVybEFuZFF1ZXJ5LFxuICBBUElFcnJvck9wdGlvbnNcbn0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcbmltcG9ydCB7XG4gIElCb3VuY2UsXG4gIElDb21wbGFpbnQsXG4gIElVbnN1YnNjcmliZSxcbiAgSVdoaXRlTGlzdFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL1JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgU3VwcHJlc3Npb25EYXRhVHlwZVxufSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBOYXZpZ2F0aW9uVGhydVBhZ2VzIDxUPiB7XG4gIHJlcXVlc3Q/OiBSZXF1ZXN0O1xuICBjb25zdHJ1Y3RvcihyZXF1ZXN0PzogUmVxdWVzdCkge1xuICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZVBhZ2UoXG4gICAgaWQ6IHN0cmluZyxcbiAgICBwYWdlVXJsOiBzdHJpbmcsXG4gICAgdXJsU2VwYXJhdG9yOiBzdHJpbmcsXG4gICAgaXRlcmF0b3JOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgKSA6IFBhcnNlZFBhZ2Uge1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwocGFnZVVybCk7XG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IHBhcnNlZFVybDtcblxuICAgIGNvbnN0IHBhZ2VWYWx1ZSA9IHBhZ2VVcmwgJiYgdHlwZW9mIHBhZ2VVcmwgPT09ICdzdHJpbmcnID8gcGFnZVVybC5zcGxpdCh1cmxTZXBhcmF0b3IpLnBvcCgpIHx8ICcnIDogJyc7XG4gICAgbGV0IGl0ZXJhdG9yUG9zaXRpb24gPSBudWxsO1xuICAgIGlmIChpdGVyYXRvck5hbWUpIHtcbiAgICAgIGl0ZXJhdG9yUG9zaXRpb24gPSBzZWFyY2hQYXJhbXMuaGFzKGl0ZXJhdG9yTmFtZSlcbiAgICAgICAgPyBzZWFyY2hQYXJhbXMuZ2V0KGl0ZXJhdG9yTmFtZSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpZCxcbiAgICAgIHBhZ2U6IHVybFNlcGFyYXRvciA9PT0gJz8nID8gYD8ke3BhZ2VWYWx1ZX1gIDogcGFnZVZhbHVlLFxuICAgICAgaXRlcmF0b3JQb3NpdGlvbixcbiAgICAgIHVybDogcGFnZVVybFxuICAgIH0gYXMgUGFyc2VkUGFnZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZVBhZ2VMaW5rcyhcbiAgICByZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nLFxuICAgIHVybFNlcGFyYXRvcjogc3RyaW5nLFxuICAgIGl0ZXJhdG9yTmFtZT86IHN0cmluZ1xuICApOiBQYXJzZWRQYWdlc0xpc3Qge1xuICAgIGNvbnN0IHBhZ2VzID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuYm9keS5wYWdpbmcpO1xuICAgIHJldHVybiBwYWdlcy5yZWR1Y2UoXG4gICAgICAoYWNjOiBQYWdlc0xpc3RBY2N1bXVsYXRvciwgW2lkLCBwYWdlVXJsXTogWyBpZDogc3RyaW5nLCBwYWdlVXJsOiBzdHJpbmddKSA9PiB7XG4gICAgICAgIGFjY1tpZF0gPSB0aGlzLnBhcnNlUGFnZShpZCwgcGFnZVVybCwgdXJsU2VwYXJhdG9yLCBpdGVyYXRvck5hbWUpO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge31cbiAgICApIGFzIHVua25vd24gYXMgUGFyc2VkUGFnZXNMaXN0O1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVVcmxBbmRRdWVyeShjbGllbnRVcmw6IHN0cmluZywgcXVlcnk/OiBRdWVyeVdpdGhQYWdlKTogVXBkYXRlZFVybEFuZFF1ZXJ5IHtcbiAgICBsZXQgdXJsID0gY2xpZW50VXJsO1xuICAgIGNvbnN0IHF1ZXJ5Q29weSA9IHsgLi4ucXVlcnkgfTtcbiAgICBpZiAocXVlcnlDb3B5LnBhZ2UpIHtcbiAgICAgIHVybCA9IHVybGpvaW4oY2xpZW50VXJsLCBxdWVyeUNvcHkucGFnZSk7XG4gICAgICBkZWxldGUgcXVlcnlDb3B5LnBhZ2U7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB1cmwsXG4gICAgICB1cGRhdGVkUXVlcnk6IHF1ZXJ5Q29weVxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgcmVxdWVzdExpc3RXaXRoUGFnZXMoY2xpZW50VXJsOnN0cmluZywgcXVlcnk/OiBRdWVyeVdpdGhQYWdlLCBNb2RlbD86IHtcbiAgICBuZXcoZGF0YTogU3VwcHJlc3Npb25EYXRhVHlwZSk6XG4gICAgSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0XG4gIH0pOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCB7IHVybCwgdXBkYXRlZFF1ZXJ5IH0gPSB0aGlzLnVwZGF0ZVVybEFuZFF1ZXJ5KGNsaWVudFVybCwgcXVlcnkpO1xuICAgIGlmICh0aGlzLnJlcXVlc3QpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBSZXNwb25zZVdpdGhQYWdpbmcgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHVybCwgdXBkYXRlZFF1ZXJ5KTtcbiAgICAgIC8vIE1vZGVsIGhlcmUgaXMgdXN1YWxseSB1bmRlZmluZWQgZXhjZXB0IGZvciBTdXBwcmVzc2lvbiBDbGllbnRcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSwgTW9kZWwpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgc3RhdHVzOiA1MDAsXG4gICAgICBzdGF0dXNUZXh0OiAnUmVxdWVzdCBwcm9wZXJ0eSBpcyBlbXB0eScsXG4gICAgICBib2R5OiB7IG1lc3NhZ2U6ICcnIH1cbiAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcGFyc2VMaXN0KHJlc3BvbnNlOiBSZXNwb25zZVdpdGhQYWdpbmcsIE1vZGVsPzoge1xuICAgIG5ldyhkYXRhOiBTdXBwcmVzc2lvbkRhdGFUeXBlKTpcbiAgICBJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3RcbiAgfSk6IFQ7XG59XG4iLCJpbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSAnYmFzZS02NCc7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgYXhpb3MsIHtcbiAgQXhpb3NFcnJvcixcbiAgQXhpb3NSZXNwb25zZSxcbiAgQXhpb3NIZWFkZXJzLFxuICBSYXdBeGlvc1JlcXVlc3RIZWFkZXJzLFxuICBBeGlvc1Byb3h5Q29uZmlnLFxufSBmcm9tICdheGlvcyc7XG5pbXBvcnQgKiBhcyBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yJztcbmltcG9ydCB7XG4gIE9uQ2FsbFJlcXVlc3RPcHRpb25zLFxuICBSZXF1ZXN0T3B0aW9ucyxcbiAgQVBJRXJyb3JPcHRpb25zLFxuICBJbnB1dEZvcm1EYXRhLFxuICBBUElSZXNwb25zZSxcbiAgSXBQb29sRGVsZXRlRGF0YSxcbiAgRm9ybURhdGFJbnB1dFxufSBmcm9tICcuLi8uLi9UeXBlcyc7XG5cbmltcG9ydCBGb3JtRGF0YUJ1aWxkZXIgZnJvbSAnLi9Gb3JtRGF0YUJ1aWxkZXInO1xuaW1wb3J0IFN1YmFjY291bnRzQ2xpZW50IGZyb20gJy4uL1N1YmFjY291bnRzJztcblxuY2xhc3MgUmVxdWVzdCB7XG4gIHByaXZhdGUgdXNlcm5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBrZXk6IHN0cmluZztcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZztcbiAgcHJpdmF0ZSB0aW1lb3V0OiBudW1iZXI7XG4gIHByaXZhdGUgaGVhZGVyczogQXhpb3NIZWFkZXJzO1xuICBwcml2YXRlIGZvcm1EYXRhQnVpbGRlcjogRm9ybURhdGFCdWlsZGVyO1xuICBwcml2YXRlIG1heEJvZHlMZW5ndGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBwcm94eTogQXhpb3NQcm94eUNvbmZpZyB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucywgZm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLnVzZXJuYW1lID0gb3B0aW9ucy51c2VybmFtZTtcbiAgICB0aGlzLmtleSA9IG9wdGlvbnMua2V5O1xuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgYXMgc3RyaW5nO1xuICAgIHRoaXMudGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcbiAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLm1ha2VIZWFkZXJzRnJvbU9iamVjdChvcHRpb25zLmhlYWRlcnMpO1xuICAgIHRoaXMuZm9ybURhdGFCdWlsZGVyID0gbmV3IEZvcm1EYXRhQnVpbGRlcihmb3JtRGF0YSk7XG4gICAgdGhpcy5tYXhCb2R5TGVuZ3RoID0gNTI0Mjg4MDA7IC8vIDUwIE1CXG4gICAgdGhpcy5wcm94eSA9IG9wdGlvbnM/LnByb3h5O1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdChcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBvbkNhbGxPcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93biB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IG9wdGlvbnM6IE9uQ2FsbFJlcXVlc3RPcHRpb25zID0geyAuLi5vbkNhbGxPcHRpb25zIH07XG4gICAgZGVsZXRlIG9wdGlvbnM/LmhlYWRlcnM7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSB0aGlzLmpvaW5BbmRUcmFuc2Zvcm1IZWFkZXJzKG9uQ2FsbE9wdGlvbnMpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4ub3B0aW9ucyB9O1xuXG4gICAgaWYgKG9wdGlvbnM/LnF1ZXJ5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9wdGlvbnM/LnF1ZXJ5KS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJhbXMucGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhvcHRpb25zLnF1ZXJ5KTtcbiAgICAgIGRlbGV0ZSBwYXJhbXMucXVlcnk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnM/LmJvZHkpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSBvcHRpb25zPy5ib2R5O1xuICAgICAgcGFyYW1zLmRhdGEgPSBib2R5O1xuICAgICAgZGVsZXRlIHBhcmFtcy5ib2R5O1xuICAgIH1cbiAgICBsZXQgcmVzcG9uc2U6IEF4aW9zUmVzcG9uc2U7XG4gICAgY29uc3QgdXJsVmFsdWUgPSB1cmxqb2luKHRoaXMudXJsLCB1cmwpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucmVxdWVzdCh7XG4gICAgICAgIG1ldGhvZDogbWV0aG9kLnRvTG9jYWxlVXBwZXJDYXNlKCksXG4gICAgICAgIHRpbWVvdXQ6IHRoaXMudGltZW91dCxcbiAgICAgICAgdXJsOiB1cmxWYWx1ZSxcbiAgICAgICAgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMsXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgICAgbWF4Qm9keUxlbmd0aDogdGhpcy5tYXhCb2R5TGVuZ3RoLFxuICAgICAgICBwcm94eTogdGhpcy5wcm94eSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgY29uc3QgZXJyb3JSZXNwb25zZSA9IGVyciBhcyBBeGlvc0Vycm9yO1xuXG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IGVycm9yUmVzcG9uc2U/LnJlc3BvbnNlPy5zdGF0dXMgfHwgNDAwLFxuICAgICAgICBzdGF0dXNUZXh0OiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uc3RhdHVzVGV4dCB8fCBlcnJvclJlc3BvbnNlLmNvZGUsXG4gICAgICAgIGJvZHk6IGVycm9yUmVzcG9uc2U/LnJlc3BvbnNlPy5kYXRhIHx8IGVycm9yUmVzcG9uc2UubWVzc2FnZVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlKTtcbiAgICByZXR1cm4gcmVzIGFzIEFQSVJlc3BvbnNlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRSZXNwb25zZUJvZHkocmVzcG9uc2U6IEF4aW9zUmVzcG9uc2UpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzID0ge1xuICAgICAgYm9keToge30sXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlPy5zdGF0dXNcbiAgICB9IGFzIEFQSVJlc3BvbnNlO1xuXG4gICAgaWYgKHR5cGVvZiByZXNwb25zZS5kYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEgPT09ICdNYWlsZ3VuIE1hZ25pZmljZW50IEFQSScpIHtcbiAgICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgICBzdGF0dXNUZXh0OiAnSW5jb3JyZWN0IHVybCcsXG4gICAgICAgICAgYm9keTogcmVzcG9uc2UuZGF0YVxuICAgICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgICB9XG4gICAgICByZXMuYm9keSA9IHtcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuZGF0YVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLmJvZHkgPSByZXNwb25zZS5kYXRhO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBqb2luQW5kVHJhbnNmb3JtSGVhZGVycyhcbiAgICBvbkNhbGxPcHRpb25zPzogT25DYWxsUmVxdWVzdE9wdGlvbnNcbiAgKTogQXhpb3NIZWFkZXJzIHtcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IG5ldyBBeGlvc0hlYWRlcnMoKTtcblxuICAgIGNvbnN0IGJhc2ljID0gYmFzZTY0LmVuY29kZShgJHt0aGlzLnVzZXJuYW1lfToke3RoaXMua2V5fWApO1xuICAgIHJlcXVlc3RIZWFkZXJzLnNldEF1dGhvcml6YXRpb24oYEJhc2ljICR7YmFzaWN9YCk7XG4gICAgcmVxdWVzdEhlYWRlcnMuc2V0KHRoaXMuaGVhZGVycyk7XG5cbiAgICBjb25zdCByZWNlaXZlZE9uQ2FsbEhlYWRlcnMgPSBvbkNhbGxPcHRpb25zICYmIG9uQ2FsbE9wdGlvbnMuaGVhZGVycztcbiAgICBjb25zdCBvbkNhbGxIZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3QocmVjZWl2ZWRPbkNhbGxIZWFkZXJzKTtcbiAgICByZXF1ZXN0SGVhZGVycy5zZXQob25DYWxsSGVhZGVycyk7XG4gICAgcmV0dXJuIHJlcXVlc3RIZWFkZXJzO1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlSGVhZGVyc0Zyb21PYmplY3QoXG4gICAgaGVhZGVyc09iamVjdDogUmF3QXhpb3NSZXF1ZXN0SGVhZGVycyA9IHt9XG4gICk6IEF4aW9zSGVhZGVycyB7XG4gICAgbGV0IHJlcXVlc3RIZWFkZXJzID0gbmV3IEF4aW9zSGVhZGVycygpO1xuICAgIHJlcXVlc3RIZWFkZXJzID0gT2JqZWN0LmVudHJpZXMoaGVhZGVyc09iamVjdCkucmVkdWNlKFxuICAgICAgKGhlYWRlcnNBY2N1bXVsYXRvcjogQXhpb3NIZWFkZXJzLCBjdXJyZW50UGFpcikgPT4ge1xuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBjdXJyZW50UGFpcjtcbiAgICAgICAgaGVhZGVyc0FjY3VtdWxhdG9yLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGhlYWRlcnNBY2N1bXVsYXRvcjtcbiAgICAgIH0sIHJlcXVlc3RIZWFkZXJzXG4gICAgKTtcbiAgICByZXR1cm4gcmVxdWVzdEhlYWRlcnM7XG4gIH1cblxuICBzZXRTdWJhY2NvdW50SGVhZGVyKHN1YmFjY291bnRJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgaGVhZGVycyA9IHRoaXMubWFrZUhlYWRlcnNGcm9tT2JqZWN0KHtcbiAgICAgIC4uLnRoaXMuaGVhZGVycyxcbiAgICAgIFtTdWJhY2NvdW50c0NsaWVudC5TVUJBQ0NPVU5UX0hFQURFUl06IHN1YmFjY291bnRJZFxuICAgIH0pO1xuICAgIHRoaXMuaGVhZGVycy5zZXQoaGVhZGVycyk7XG4gIH1cblxuICByZXNldFN1YmFjY291bnRIZWFkZXIoKTogdm9pZCB7XG4gICAgdGhpcy5oZWFkZXJzLmRlbGV0ZShTdWJhY2NvdW50c0NsaWVudC5TVUJBQ0NPVU5UX0hFQURFUik7XG4gIH1cblxuICBxdWVyeShcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBxdWVyeT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgQXJyYXk8QXJyYXk8c3RyaW5nPj4sXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB7IHF1ZXJ5LCAuLi5vcHRpb25zIH0pO1xuICB9XG5cbiAgY29tbWFuZChcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPltdIHwgc3RyaW5nIHwgTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEsXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICAgIGFkZERlZmF1bHRIZWFkZXJzID0gdHJ1ZVxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgbGV0IGhlYWRlcnMgPSB7fTtcbiAgICBpZiAoYWRkRGVmYXVsdEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMgPSB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9O1xuICAgIH1cbiAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgIC4uLmhlYWRlcnMsXG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIHJlcXVlc3RPcHRpb25zXG4gICAgKTtcbiAgfVxuXG4gIGdldChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBxdWVyeT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgQXJyYXk8QXJyYXk8c3RyaW5nPj4sXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeSgnZ2V0JywgdXJsLCBxdWVyeSwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0KFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHN0cmluZyxcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdFdpdGhGRChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhOiBGb3JtRGF0YUlucHV0XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHB1dFdpdGhGRCh1cmw6IHN0cmluZywgZGF0YTogRm9ybURhdGFJbnB1dCk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcGF0Y2hXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IEZvcm1EYXRhSW5wdXQpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwYXRjaCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcHV0KHVybDogc3RyaW5nLCBkYXRhPzogRm9ybURhdGFJbnB1dCB8IHN0cmluZywgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxuICA6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgZGVsZXRlKHVybDogc3RyaW5nLCBkYXRhPzogSXBQb29sRGVsZXRlRGF0YSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdkZWxldGUnLCB1cmwsIGRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVlc3Q7XG4iLCJleHBvcnQgZW51bSBSZXNvbHV0aW9uIHtcbiAgICBIT1VSID0gJ2hvdXInLFxuICAgIERBWSA9ICdkYXknLFxuICAgIE1PTlRIID0gJ21vbnRoJ1xufVxuXG5leHBvcnQgZW51bSBTdXBwcmVzc2lvbk1vZGVscyB7XG4gICAgQk9VTkNFUyA9ICdib3VuY2VzJyxcbiAgICBDT01QTEFJTlRTID0gJ2NvbXBsYWludHMnLFxuICAgIFVOU1VCU0NSSUJFUyA9ICd1bnN1YnNjcmliZXMnLFxuICAgIFdISVRFTElTVFMgPSAnd2hpdGVsaXN0cydcbn1cblxuZXhwb3J0IGVudW0gV2ViaG9va3NJZHMge1xuICAgIENMSUNLRUQgPSAnY2xpY2tlZCcsXG4gICAgQ09NUExBSU5FRCA9ICdjb21wbGFpbmVkJyxcbiAgICBERUxJVkVSRUQgPSAnZGVsaXZlcmVkJyxcbiAgICBPUEVORUQgPSAnb3BlbmVkJyxcbiAgICBQRVJNQU5FTlRfRkFJTCA9ICdwZXJtYW5lbnRfZmFpbCcsXG4gICAgVEVNUE9SQVJZX0ZBSUwgPSAndGVtcG9yYXJ5X2ZhaWwnLFxuICAgIFVOU1VCU0NSSUJFRCA9ICd1bnN1YnNjcmliZScsXG59XG5cbmV4cG9ydCBlbnVtIFllc05vIHtcbiAgICBZRVMgPSAneWVzJyxcbiAgICBOTyA9ICdubydcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgSUxvZ2dlciB7XG4gIHdhcm4obWVzc2FnZTogc3RyaW5nKTogdm9pZFxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Mb2dnZXInO1xuIiwiaW1wb3J0IHtcbiAgRG9tYWluQ3JlZGVudGlhbHMsXG4gIERvbWFpbkNyZWRlbnRpYWxzTGlzdCxcbiAgRG9tYWluQ3JlZGVudGlhbHNRdWVyeSxcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQsXG4gIFVwZGF0ZURvbWFpbkNyZWRlbnRpYWxzRGF0YVxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluQ3JlZGVudGlhbHMge1xuICAgIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5OiBEb21haW5DcmVkZW50aWFsc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc0xpc3Q+XG4gICAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBEb21haW5DcmVkZW50aWFsc1xuICAgICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+XG4gICAgdXBkYXRlKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nLFxuICAgICAgICBkYXRhOiBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbiAgICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PlxuICAgIGRlc3Ryb3koXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PlxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgeyBSZXNvbHV0aW9uIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHtcbiAgRG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ3NJdGVtLFxuICBEb21haW5UYWdzTGlzdCxcbiAgRG9tYWluVGFnc01lc3NhZ2VSZXMsXG4gIERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSxcbiAgRG9tYWluVGFnU3RhdGlzdGljSXRlbVxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0IHtcbiAgICB0YWc6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHN0YXJ0OiBEYXRlO1xuICAgIGVuZDogRGF0ZTtcbiAgICByZXNvbHV0aW9uOiBSZXNvbHV0aW9uO1xuICAgIHN0YXRzOiBEb21haW5UYWdTdGF0aXN0aWNJdGVtW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpblRhZ3NDbGllbnQge1xuICAgIGxpc3QoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NMaXN0PlxuICAgIGdldChkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NJdGVtPlxuICAgIHVwZGF0ZShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nLFxuICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz5cbiAgICBkZXN0cm95KFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGFnOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPlxuICAgIHN0YXRpc3RpYyhcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nLFxuICAgICAgICBxdWVyeTogRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5XG4gICAgKTogUHJvbWlzZTxJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0PlxuICAgIGNvdW50cmllcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uPlxuICAgIHByb3ZpZGVycyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uPlxuICAgIGRldmljZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24+XG59XG4iLCJpbXBvcnQge1xuICBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQsXG4gIERvbWFpblRlbXBsYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVzUXVlcnksXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YSxcbiAgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdCxcbiAgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQsXG4gIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgTm90aWZpY2F0aW9uUmVzdWx0LFxuICBTaG9ydFRlbXBsYXRlVmVyc2lvbixcbiAgVGVtcGxhdGVRdWVyeSxcbiAgVGVtcGxhdGVWZXJzaW9uLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5UZW1wbGF0ZSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBzdHJpbmcgfCBEYXRlO1xuICAgIGNyZWF0ZWRCeTogc3RyaW5nO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdmVyc2lvbj86IFRlbXBsYXRlVmVyc2lvbjtcbiAgICB2ZXJzaW9ucz86IFNob3J0VGVtcGxhdGVWZXJzaW9uW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpblRlbXBsYXRlc0NsaWVudCB7XG4gICAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5UZW1wbGF0ZXNRdWVyeSk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdD5cbiAgICBnZXQoZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nLCBxdWVyeT86IFRlbXBsYXRlUXVlcnkpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT5cbiAgICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERvbWFpblRlbXBsYXRlRGF0YSk6IFByb21pc2U8SURvbWFpblRlbXBsYXRlPlxuICAgIHVwZGF0ZShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgICAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGFcbiAgICApOiBQcm9taXNlPFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ+XG4gICAgZGVzdHJveShkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQ+XG4gICAgZGVzdHJveUFsbChkb21haW46IHN0cmluZyk6IFByb21pc2U8Tm90aWZpY2F0aW9uUmVzdWx0PlxuICAgIGNyZWF0ZVZlcnNpb24oXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgZGF0YTogRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YVxuICAgICkgOiBQcm9taXNlPENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD5cbiAgICBnZXRWZXJzaW9uKGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT5cbiAgICB1cGRhdGVWZXJzaW9uKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nLFxuICAgICAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhXG4gICAgKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+XG4gICAgZGVzdHJveVZlcnNpb24oXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgdGFnOiBzdHJpbmcpOiBQcm9taXNlPE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD5cbiAgICBsaXN0VmVyc2lvbnMoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgcXVlcnk/OiBEb21haW5UZW1wbGF0ZXNRdWVyeSk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQ+XG59XG4iLCJpbXBvcnQgeyBBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5pbXBvcnQge1xuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgQ29ubmVjdGlvblNldHRpbmdzLFxuICBES0lNQXV0aG9yaXR5SW5mbyxcbiAgREtJTVNlbGVjdG9ySW5mbyxcbiAgRG9tYWluSW5mbyxcbiAgRG9tYWluc1F1ZXJ5LFxuICBEb21haW5UcmFja2luZ0RhdGEsXG4gIERvbWFpblVwZGF0ZUluZm8sXG4gIE1lc3NhZ2VSZXNwb25zZSxcbiAgT3BlblRyYWNraW5nSW5mbyxcbiAgUmVwbGFjZW1lbnRGb3JQb29sLFxuICBURG9tYWluLFxuICBVbnN1YnNjcmliZVRyYWNraW5nSW5mbyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZERLSU1BdXRob3JpdHksXG4gIFVwZGF0ZWRES0lNU2VsZWN0b3JSZXNwb25zZSxcbiAgVXBkYXRlZE9wZW5UcmFja2luZyxcbiAgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlLFxuICBXZWJQcmVmaXhJbmZvXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuaW1wb3J0IHsgSURvbWFpbkNyZWRlbnRpYWxzIH0gZnJvbSAnLi9Eb21haW5DcmVkZW50aWFscyc7XG5pbXBvcnQgeyBJRG9tYWluVGFnc0NsaWVudCB9IGZyb20gJy4vRG9tYWluVGFncyc7XG5pbXBvcnQgeyBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IH0gZnJvbSAnLi9Eb21haW5UZW1wbGF0ZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5zQ2xpZW50IHtcbiAgICBkb21haW5DcmVkZW50aWFsczogSURvbWFpbkNyZWRlbnRpYWxzXG4gICAgZG9tYWluVGVtcGxhdGVzOiBJRG9tYWluVGVtcGxhdGVzQ2xpZW50XG4gICAgZG9tYWluVGFnczogSURvbWFpblRhZ3NDbGllbnRcbiAgICBsaXN0KHF1ZXJ5PzogRG9tYWluc1F1ZXJ5KTogUHJvbWlzZTxURG9tYWluW10+XG4gICAgZ2V0KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxURG9tYWluPlxuICAgIGNyZWF0ZShkYXRhOiBEb21haW5JbmZvKTogUHJvbWlzZTxURG9tYWluPlxuICAgIHVwZGF0ZShkb21haW46IHN0cmluZywgZGF0YTogRG9tYWluVXBkYXRlSW5mbyk6IFByb21pc2U8VERvbWFpbj5cbiAgICB2ZXJpZnkoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPFREb21haW4+XG4gICAgZGVzdHJveShkb21haW46IHN0cmluZyk6IFByb21pc2U8TWVzc2FnZVJlc3BvbnNlPlxuICAgIGdldENvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPENvbm5lY3Rpb25TZXR0aW5ncz5cbiAgICB1cGRhdGVDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBDb25uZWN0aW9uU2V0dGluZ3MpOiBQcm9taXNlPFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3M+XG4gICAgZ2V0VHJhY2tpbmcoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRyYWNraW5nRGF0YT5cbiAgICB1cGRhdGVUcmFja2luZyhcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHR5cGU6IHN0cmluZyxcbiAgICAgICAgZGF0YTogT3BlblRyYWNraW5nSW5mbyB8IENsaWNrVHJhY2tpbmdJbmZvIHwgVW5zdWJzY3JpYmVUcmFja2luZ0luZm9cbiAgICApOiBQcm9taXNlPFVwZGF0ZWRPcGVuVHJhY2tpbmc+XG4gICAgZ2V0SXBzKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT5cbiAgICBhc3NpZ25JcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+XG4gICAgZGVsZXRlSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICBsaW5rSXBQb29sKGRvbWFpbjogc3RyaW5nLCBwb29sX2lkOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPlxuICAgIHVubGlua0lwUG9sbChkb21haW46IHN0cmluZywgcmVwbGFjZW1lbnQ6IFJlcGxhY2VtZW50Rm9yUG9vbCk6IFByb21pc2U8QVBJUmVzcG9uc2U+XG4gICAgdXBkYXRlREtJTUF1dGhvcml0eShkb21haW46IHN0cmluZywgZGF0YTogREtJTUF1dGhvcml0eUluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNQXV0aG9yaXR5PlxuICAgIHVwZGF0ZURLSU1TZWxlY3Rvcihkb21haW46IHN0cmluZywgZGF0YTogREtJTVNlbGVjdG9ySW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlPlxuICAgIHVwZGF0ZVdlYlByZWZpeChkb21haW46IHN0cmluZywgZGF0YTogV2ViUHJlZml4SW5mbyk6IFByb21pc2U8VXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlPlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Eb21haW5DcmVkZW50aWFscyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRhZ3MnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UZW1wbGF0ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5zQ2xpZW50JztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5pbXBvcnQgeyBFdmVudHNMaXN0LCBFdmVudHNRdWVyeSB9IGZyb20gJy4uLy4uL1R5cGVzL0V2ZW50cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50Q2xpZW50IHtcbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IEV2ZW50c1F1ZXJ5KSA6IFByb21pc2U8RXZlbnRzTGlzdD5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSUV2ZW50Q2xpZW50JztcbiIsImltcG9ydCB7XG4gIElwUG9vbENyZWF0ZURhdGEsIElwUG9vbENyZWF0ZVJlc3VsdCxcbiAgSXBQb29sRGVsZXRlRGF0YSwgSXBQb29sTGlzdFJlc3VsdCxcbiAgSXBQb29sTWVzc2FnZVJlc3VsdCwgSXBQb29sVXBkYXRlRGF0YVxufSBmcm9tICcuLi8uLi9UeXBlcy9JUFBvb2xzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSVBQb29sc0NsaWVudCB7XG4gIGxpc3QoKTogUHJvbWlzZTxJcFBvb2xMaXN0UmVzdWx0PlxuICBjcmVhdGUoZGF0YTogSXBQb29sQ3JlYXRlRGF0YSk6IFByb21pc2U8SXBQb29sQ3JlYXRlUmVzdWx0PlxuICB1cGRhdGUocG9vbElkOiBzdHJpbmcsIGRhdGE6IElwUG9vbFVwZGF0ZURhdGEpOiBQcm9taXNlPElwUG9vbE1lc3NhZ2VSZXN1bHQ+XG4gIGRlbGV0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sRGVsZXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSUlQUG9vbHNDbGllbnQnO1xuIiwiaW1wb3J0IHsgSXBEYXRhLCBJUHNMaXN0UXVlcnksIElwc0xpc3RSZXNwb25zZUJvZHkgfSBmcm9tICcuLi8uLi9UeXBlcy9JUHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJUHNDbGllbnQge1xuICBsaXN0KHF1ZXJ5OiBJUHNMaXN0UXVlcnkpOiBQcm9taXNlPElwc0xpc3RSZXNwb25zZUJvZHk+XG4gIGdldChpcDogc3RyaW5nKTogUHJvbWlzZTxJcERhdGE+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lJUHNDbGllbnQnO1xuIiwiaW1wb3J0IHsgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc1Jlc3VsdCwgSW5ib3hQbGFjZW1lbnRzVmFsdWVzUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCB7XG4gIGxpc3QoKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzUmVzdWx0PjtcbiAgZ2V0KGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzVmFsdWVzUmVzdWx0Pjtcbn1cbiIsImltcG9ydCB7IEluYm94UGxhY2VtZW50c0ZpbHRlcnNSZXN1bHQgfSBmcm9tICcuLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50IHtcbiAgbGlzdCgpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c0ZpbHRlcnNSZXN1bHQ+XG59XG4iLCJpbXBvcnQgeyBJbmJveFBsYWNlbWVudHNEYXRhLCBJbmJveFBsYWNlbWVudHNUZXN0UmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50IH0gZnJvbSAnLi9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHMnO1xuaW1wb3J0IHsgSVNlZWRzTGlzdHNDbGllbnQgfSBmcm9tICcuL1NlZWRzTGlzdHMvU2VlZHNMaXN0c0NsaWVudCc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IH0gZnJvbSAnLi9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSW5ib3hQbGFjZW1lbnRzQ2xpZW50IHtcbiAgICBzZWVkc0xpc3RzOiBJU2VlZHNMaXN0c0NsaWVudDtcbiAgICByZXN1bHRzOiBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudDtcbiAgICBwcm92aWRlcnM6IElJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQ7XG4gICAgcnVuVGVzdChkYXRhOiBJbmJveFBsYWNlbWVudHNEYXRhKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNUZXN0UmVzdWx0Pjtcbn1cbiIsImltcG9ydCB7XG4gIEluYm94UGxhY2VtZW50c0Rlc3Ryb3lSZXN1bHQsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdFdpdGhTdGF0dXMsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0LFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRzUXVlcnlcbn0gZnJvbSAnLi4vLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IH0gZnJvbSAnLi4vQXR0cmlidXRlc0NsaWVudCc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCB9IGZyb20gJy4uL0ZpbHRlcnNDbGllbnQnO1xuaW1wb3J0IHsgSUlQUlNoYXJpbmdDbGllbnQgfSBmcm9tICcuL0luYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCB7XG4gIHNoYXJpbmc6IElJUFJTaGFyaW5nQ2xpZW50O1xuICBhdHRyaWJ1dGVzOiBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudDtcbiAgZmlsdGVyczogSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQ7XG4gIGxpc3QocXVlcnk6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNRdWVyeSk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3Q+O1xuICBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNSZXN1bHRXaXRoU3RhdHVzPjtcbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNEZXN0cm95UmVzdWx0PjtcbiAgZ2V0UmVzdWx0QnlTaGFyZUlkKHNoYXJlSWQ6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUmVzdWx0V2l0aFN0YXR1cz47XG59XG4iLCJpbXBvcnQge1xuICBJUFJTaGFyaW5nUmVzdWx0LFxuICBJUFJTaGFyaW5nVXBkYXRlRGF0YSxcbiAgSVBSU2hhcmluZ1VwZGF0ZVJlc3VsdFxufSBmcm9tICcuLi8uLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJUFJTaGFyaW5nQ2xpZW50IHtcbiAgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPElQUlNoYXJpbmdSZXN1bHQ+O1xuICB1cGRhdGUoaWQ6IHN0cmluZywgZGF0YTogSVBSU2hhcmluZ1VwZGF0ZURhdGEpOiBQcm9taXNlPElQUlNoYXJpbmdVcGRhdGVSZXN1bHQ+O1xufVxuIiwiaW1wb3J0IHtcbiAgU2VlZExpc3RSZXN1bHQsXG4gIFNlZWRzTGlzdHNDcmVhdGluZ0RhdGEsXG4gIFNlZWRzTGlzdHNEZXN0cm95QXBpUmVzcG9uc2UsXG4gIFNlZWRzTGlzdHNRdWVyeSxcbiAgU2VlZHNMaXN0c1Jlc3VsdCxcbiAgU2VlZHNMaXN0c1VwZGF0aW5nRGF0YSxcbn0gZnJvbSAnLi4vLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IH0gZnJvbSAnLi4vQXR0cmlidXRlc0NsaWVudCc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCB9IGZyb20gJy4uL0ZpbHRlcnNDbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTZWVkc0xpc3RzQ2xpZW50IHtcbiAgYXR0cmlidXRlczogSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQ7XG4gIGZpbHRlcnM6IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50O1xuICBsaXN0KHF1ZXJ5OiBTZWVkc0xpc3RzUXVlcnkpOiBQcm9taXNlPFNlZWRzTGlzdHNSZXN1bHQ+O1xuICBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxTZWVkTGlzdFJlc3VsdD47XG4gIGNyZWF0ZShkYXRhOiBTZWVkc0xpc3RzQ3JlYXRpbmdEYXRhKTogUHJvbWlzZTxTZWVkTGlzdFJlc3VsdD47XG4gIHVwZGF0ZShhZGRyZXNzOiBzdHJpbmcsIGRhdGE6IFNlZWRzTGlzdHNVcGRhdGluZ0RhdGEpOiBQcm9taXNlPFNlZWRMaXN0UmVzdWx0PjtcbiAgZGVzdHJveShhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFNlZWRzTGlzdHNEZXN0cm95QXBpUmVzcG9uc2U+O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JbmJveFBsYWNlbWVudHNDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9BdHRyaWJ1dGVzQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vRmlsdGVyc0NsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL1NlZWRzTGlzdHMvU2VlZHNMaXN0c0NsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0cyc7XG5leHBvcnQgKiBmcm9tICcuL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmcnO1xuIiwiaW1wb3J0IHsgSVdlYkhvb2tzQ2xpZW50IH0gZnJvbSAnLi4vV2ViaG9va3MnO1xuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgeyBJRG9tYWluc0NsaWVudCB9IGZyb20gJy4uL0RvbWFpbnMnO1xuaW1wb3J0IHsgSUV2ZW50Q2xpZW50IH0gZnJvbSAnLi4vRXZlbnRDbGllbnQnO1xuaW1wb3J0IHsgSVN0YXRzQ2xpZW50IH0gZnJvbSAnLi4vU3RhdHMnO1xuaW1wb3J0IHsgSU1lc3NhZ2VzQ2xpZW50IH0gZnJvbSAnLi4vTWVzc2FnZXMnO1xuaW1wb3J0IHsgSVN1cHByZXNzaW9uQ2xpZW50IH0gZnJvbSAnLi4vU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IElSb3V0ZXNDbGllbnQgfSBmcm9tICcuLi9Sb3V0ZXMnO1xuaW1wb3J0IHsgSVZhbGlkYXRpb25DbGllbnQgfSBmcm9tICcuLi9WYWxpZGF0aW9ucyc7XG5pbXBvcnQgeyBJSVBzQ2xpZW50IH0gZnJvbSAnLi4vSVBzJztcbmltcG9ydCB7IElJUFBvb2xzQ2xpZW50IH0gZnJvbSAnLi4vSVBQb29scyc7XG5pbXBvcnQgeyBJTWFpbGluZ0xpc3RzQ2xpZW50IH0gZnJvbSAnLi4vTWFpbGluZ0xpc3RzJztcbmltcG9ydCB7IElTdWJhY2NvdW50c0NsaWVudCB9IGZyb20gJy4uL1N1YmFjY291bnRzJztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNDbGllbnQgfSBmcm9tICcuLi9JbmJveFBsYWNlbWVudHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYWlsZ3VuQ2xpZW50IHtcbiAgICBkb21haW5zOiBJRG9tYWluc0NsaWVudDtcbiAgICB3ZWJob29rczogSVdlYkhvb2tzQ2xpZW50O1xuICAgIGV2ZW50czogSUV2ZW50Q2xpZW50O1xuICAgIHN0YXRzOiBJU3RhdHNDbGllbnQ7XG4gICAgc3VwcHJlc3Npb25zOiBJU3VwcHJlc3Npb25DbGllbnQ7XG4gICAgbWVzc2FnZXM6IElNZXNzYWdlc0NsaWVudDtcbiAgICByb3V0ZXM6IElSb3V0ZXNDbGllbnQ7XG4gICAgdmFsaWRhdGU6IElWYWxpZGF0aW9uQ2xpZW50O1xuICAgIGlwczogSUlQc0NsaWVudDtcbiAgICBpcF9wb29sczogSUlQUG9vbHNDbGllbnQ7XG4gICAgbGlzdHM6IElNYWlsaW5nTGlzdHNDbGllbnQ7XG4gICAgc3ViYWNjb3VudHM6IElTdWJhY2NvdW50c0NsaWVudDtcbiAgICBpbmJveF9wbGFjZW1lbnRzOiBJSW5ib3hQbGFjZW1lbnRzQ2xpZW50O1xuICAgIHNldFN1YmFjY291bnQoc3ViYWNjb3VudElkOiBzdHJpbmcpOiB2b2lkO1xuICAgIHJlc2V0U3ViYWNjb3VudCgpOiB2b2lkO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JTWFpbGd1bkNsaWVudCc7XG4iLCJpbXBvcnQge1xuICBNYWlsTGlzdE1lbWJlcnNRdWVyeSxcbiAgTWFpbExpc3RNZW1iZXJzUmVzdWx0LFxuICBNYWlsTGlzdE1lbWJlcixcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzLFxuICBNdWx0aXBsZU1lbWJlcnNEYXRhLFxuICBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSxcbiAgRGVsZXRlZE1lbWJlclxufSBmcm9tICcuLi8uLi9UeXBlcy9NYWlsaW5nTGlzdHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYWlsTGlzdHNNZW1iZXJzIHtcbiAgbGlzdE1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBNYWlsTGlzdE1lbWJlcnNRdWVyeVxuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyc1Jlc3VsdD47XG5cbiAgZ2V0TWVtYmVyKGFkZHJlc3M6IHN0cmluZywgbWVtYmVyQWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4sXG4gIGNyZWF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPixcbiAgY3JlYXRlTWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZU1lbWJlcnNEYXRhKTogUHJvbWlzZTxOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZT4sXG4gIHVwZGF0ZU1lbWJlcihcbiAgICBhZGRyZXNzOiBzdHJpbmcsXG4gICAgbWVtYmVyQWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+LFxuICBkZXN0cm95TWVtYmVyKGFkZHJlc3M6IHN0cmluZywgbWVtYmVyQWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxEZWxldGVkTWVtYmVyPlxufVxuIiwiaW1wb3J0IHtcbiAgQ3JlYXRlVXBkYXRlTGlzdCwgRGVzdHJveWVkTGlzdCwgTGlzdHNRdWVyeSwgTWFpbGluZ0xpc3QsXG4gIE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdCwgTWFpbGluZ0xpc3RSZXN1bHQsXG4gIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdCwgU3RhcnRWYWxpZGF0aW9uUmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL01haWxpbmdMaXN0cyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4vTWFpbGluZ0xpc3RNZW1iZXJzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFpbGluZ0xpc3RzQ2xpZW50IHtcbiAgbWVtYmVyczogSU1haWxMaXN0c01lbWJlcnM7XG4gIGxpc3QocXVlcnk/OiBMaXN0c1F1ZXJ5KTogUHJvbWlzZTxNYWlsaW5nTGlzdFJlc3VsdD5cbiAgZ2V0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdD5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PlxuICB1cGRhdGUobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PlxuICBkZXN0cm95KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95ZWRMaXN0PlxuICB2YWxpZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8U3RhcnRWYWxpZGF0aW9uUmVzdWx0PlxuICB2YWxpZGF0aW9uUmVzdWx0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQ+XG4gIGNhbmNlbFZhbGlkYXRpb24obWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdD5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RNZW1iZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzQ2xpZW50JztcbiIsImltcG9ydCB7IE1haWxndW5NZXNzYWdlRGF0YSwgTWVzc2FnZXNTZW5kUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvTWVzc2FnZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlc0NsaWVudCB7XG4gIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogTWFpbGd1bk1lc3NhZ2VEYXRhKTogUHJvbWlzZTxNZXNzYWdlc1NlbmRSZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lNZXNzYWdlc0NsaWVudCc7XG4iLCJpbXBvcnQge1xuICBDcmVhdGVVcGRhdGVSb3V0ZURhdGEsIERlc3Ryb3lSb3V0ZVJlc3BvbnNlLCBSb3V0ZSwgUm91dGVzTGlzdFF1ZXJ5LCBVcGRhdGVSb3V0ZVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL1JvdXRlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJvdXRlc0NsaWVudCB7XG4gIGxpc3QocXVlcnk6IFJvdXRlc0xpc3RRdWVyeSk6IFByb21pc2U8Um91dGVbXT5cbiAgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFJvdXRlPlxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxSb3V0ZT5cbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8VXBkYXRlUm91dGVSZXNwb25zZT5cbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95Um91dGVSZXNwb25zZT5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSVJvdXRlc0NsaWVudCc7XG4iLCJpbXBvcnQgeyBTdGF0c1F1ZXJ5IH0gZnJvbSAnLi4vLi4vVHlwZXMvU3RhdHMnO1xuaW1wb3J0IHsgSVN0YXRzQ29udGFpbmVyIH0gZnJvbSAnLi9TdGF0c0NvbnRhaW5lcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRzQ2xpZW50IHtcbiAgZ2V0RG9tYWluKGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPElTdGF0c0NvbnRhaW5lcj5cbiAgZ2V0QWNjb3VudChxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPElTdGF0c0NvbnRhaW5lcj5cbn1cbiIsImltcG9ydCB7IFN0YXQgfSBmcm9tICcuLi8uLi9UeXBlcy9TdGF0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRzQ29udGFpbmVyIHtcbiAgICBzdGFydDogRGF0ZTtcbiAgICBlbmQ6IERhdGU7XG4gICAgcmVzb2x1dGlvbjogc3RyaW5nO1xuICAgIHN0YXRzOiBTdGF0W107XG4gIH1cbiIsImV4cG9ydCAqIGZyb20gJy4vU3RhdHNDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9TdGF0c0NvbnRhaW5lcic7XG4iLCJpbXBvcnQgeyBTdWJhY2NvdW50TGlzdFJlc3BvbnNlRGF0YSwgU3ViYWNjb3VudFJlc3BvbnNlRGF0YSwgU3ViYWNjb3VudHNRdWVyeSB9IGZyb20gJy4uLy4uL1R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBJU3ViYWNjb3VudHNDbGllbnQge1xuICBsaXN0KHF1ZXJ5PzogU3ViYWNjb3VudHNRdWVyeSk6IFByb21pc2U8U3ViYWNjb3VudExpc3RSZXNwb25zZURhdGE+XG4gIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPlxuICBjcmVhdGUobmFtZTogc3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPlxuICBkaXNhYmxlKGlkOiBzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+XG4gIGVuYWJsZShpZDogc3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JU3ViYWNjb3VudHNDbGllbnQnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgaW50ZXJmYWNlIElCb3VuY2Uge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIHR5cGU6IHN0cmluZztcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IGludGVyZmFjZSBJQ29tcGxhaW50IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcbiAgICB0eXBlOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQge1xuICBTdXBwcmVzc2lvbkxpc3QsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0LFxuICBTdXBwcmVzc2lvbkxpc3RRdWVyeSxcbiAgU3VwcHJlc3Npb25EZXN0cm95UmVzdWx0XG59IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBJQm91bmNlIH0gZnJvbSAnLi9Cb3VuY2UnO1xuaW1wb3J0IHsgSUNvbXBsYWludCB9IGZyb20gJy4vQ29tcGxhaW50JztcbmltcG9ydCB7IElVbnN1YnNjcmliZSB9IGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuaW1wb3J0IHsgSVdoaXRlTGlzdCB9IGZyb20gJy4vV2hpdGVMaXN0JztcblxuZXhwb3J0IGludGVyZmFjZSBJU3VwcHJlc3Npb25DbGllbnQge1xuICBsaXN0KGRvbWFpbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIHF1ZXJ5PzogU3VwcHJlc3Npb25MaXN0UXVlcnkpOiBQcm9taXNlPFN1cHByZXNzaW9uTGlzdD5cblxuICBnZXQoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdD5cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25EZXN0cm95UmVzdWx0PlxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgaW50ZXJmYWNlIElVbnN1YnNjcmliZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIHRhZ3M6IGFueTtcbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIHR5cGU6IHN0cmluZztcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgSVdoaXRlTGlzdCB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Cb3VuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9Db21wbGFpbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9VbnN1YnNjcmliZSc7XG5leHBvcnQgKiBmcm9tICcuL1doaXRlTGlzdCc7XG5leHBvcnQgKiBmcm9tICcuL0lTdXBwcmVzc2lvbnNDbGllbnQnO1xuIiwiaW1wb3J0IHtcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdCxcbiAgQ3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYixcbiAgQ2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeVxufSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB7XG4gIGxpc3QocXVlcnk/Ok11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnkpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PlxuICBnZXQobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdD5cbiAgY3JlYXRlKFxuICAgIGxpc3RJZDogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVxuICApOiBQcm9taXNlPENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+XG4gIGRlc3Ryb3kobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPlxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgeyBWYWxpZGF0aW9uUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4vTXVsdGlwbGVWYWxpZGF0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbkNsaWVudCB7XG4gIG11bHRpcGxlVmFsaWRhdGlvbjogSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudFxuICBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxWYWxpZGF0aW9uUmVzdWx0PlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NdWx0aXBsZVZhbGlkYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9uJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5pbXBvcnQgeyBXZWJob29rc0lkcyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7XG4gIFdlYmhvb2tMaXN0LFxuICBXZWJob29rUmVzdWx0LFxuICBXZWJob29rc1F1ZXJ5LFxuICBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL1dlYmhvb2tzJztcblxuZXhwb3J0IGludGVyZmFjZSBJV2ViSG9va3NDbGllbnQge1xuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeTogV2ViaG9va3NRdWVyeSk6IFByb21pc2U8V2ViaG9va0xpc3Q+XG4gIGdldChkb21haW46IHN0cmluZywgaWQ6IFdlYmhvb2tzSWRzKTogUHJvbWlzZTxXZWJob29rUmVzdWx0PlxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsXG4gICAgaWQ6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICB0ZXN0OiBib29sZWFuXG4gICk6IFByb21pc2U8V2ViaG9va1Jlc3VsdCB8IFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2U+XG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcgfCBzdHJpbmdbXSk6IFByb21pc2U8V2ViaG9va1Jlc3VsdD5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZykgOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lXZWJIb29rc0NsaWVudCc7XG4iLCJleHBvcnQgKiBmcm9tICcuL0NvbW1vbic7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsZ3VuQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzJztcbmV4cG9ydCAqIGZyb20gJy4vU3RhdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdXBwcmVzc2lvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL0V2ZW50Q2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vV2ViaG9va3MnO1xuZXhwb3J0ICogZnJvbSAnLi9NZXNzYWdlcyc7XG5leHBvcnQgKiBmcm9tICcuL1JvdXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL0lQcyc7XG5leHBvcnQgKiBmcm9tICcuL0lQUG9vbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdWJhY2NvdW50cyc7XG5leHBvcnQgKiBmcm9tICcuL0luYm94UGxhY2VtZW50cyc7XG4iLCJleHBvcnQgdHlwZSBBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiBhbnk7XG59XG4iLCJleHBvcnQgdHlwZSBBUElFcnJvck9wdGlvbnMgPSB7XG4gIGhlYWRlcnM/OiB7IFtrZXk6IHN0cmluZ106IHVua25vd24gfTtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIGJvZHk6IHtcbiAgICBlcnJvcj86IHN0cmluZyxcbiAgICBtZXNzYWdlPzogc3RyaW5nXG4gIH07XG4gIHVybD86IHN0cmluZztcbiAgc3RhdHVzVGV4dD86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQVBJRXJyb3JUeXBlID0ge1xuICBzdGFjazogc3RyaW5nO1xuICBzdGF0dXM6IG51bWJlcjtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBkZXRhaWxzOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgKiBhcyBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCB7IEZvcm1EYXRhSW5wdXRWYWx1ZSB9IGZyb20gJy4uL01lc3NhZ2VzJztcblxuZXhwb3J0IHR5cGUgRm9ybURhdGFPcHRpb25zID0ge1xuICBba2V5OiBzdHJpbmddOiBOb2RlRm9ybURhdGE7XG59XG5cbmV4cG9ydCB0eXBlIElucHV0Rm9ybURhdGEgPVxuICB7XG4gICAgbmV3KGZvcm0/OiBIVE1MRm9ybUVsZW1lbnQgfCB1bmRlZmluZWQsIHN1Ym1pdHRlcj86IEhUTUxFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZCk6IEZvcm1EYXRhO1xuICB9IHxcbiAge1xuICAgIG5ldyhvcHRpb25zPzogRm9ybURhdGFPcHRpb25zKTogTm9kZUZvcm1EYXRhXG4gIH1cblxuZXhwb3J0IHR5cGUgRm9ybURhdGFJbnB1dCA9IHtcbiAgW2tleTogc3RyaW5nXTogRm9ybURhdGFJbnB1dFZhbHVlO1xufTtcbiIsImV4cG9ydCB0eXBlIFBhZ2VzTGlzdCA9IHtcbiAgICBwcmV2aW91czogc3RyaW5nO1xuICAgIGZpcnN0OiBzdHJpbmc7XG4gICAgbGFzdDogc3RyaW5nO1xuICAgIG5leHQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VkUGFnZSA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHBhZ2U6IHN0cmluZztcbiAgICBpdGVyYXRvclBvc2l0aW9uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgdXJsOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VkUGFnZXNMaXN0ID0ge1xuICAgIHByZXZpb3VzOiBQYXJzZWRQYWdlO1xuICAgIGZpcnN0OiBQYXJzZWRQYWdlO1xuICAgIGxhc3Q6IFBhcnNlZFBhZ2U7XG4gICAgbmV4dDogUGFyc2VkUGFnZTtcbn1cblxuZXhwb3J0IHR5cGUgUGFnZXNMaXN0QWNjdW11bGF0b3IgPSB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBQYXJzZWRQYWdlO1xufVxuXG5leHBvcnQgdHlwZSBSZXNwb25zZVdpdGhQYWdpbmcgPSB7XG4gICAgYm9keToge1xuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdFxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgUXVlcnlXaXRoUGFnZSA9IHtcbiAgICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkVXJsQW5kUXVlcnkgPSB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgdXBkYXRlZFF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbn1cbiIsImltcG9ydCB7IEF4aW9zUmVxdWVzdEhlYWRlcnMsIFJhd0F4aW9zUmVxdWVzdEhlYWRlcnMgfSBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBNYWlsZ3VuQ2xpZW50T3B0aW9ucyB9IGZyb20gJy4uL01haWxndW5DbGllbnQnO1xuXG5leHBvcnQgdHlwZSBPbkNhbGxFbXB0eUhlYWRlcnMgPSB7XG4gIFtrZXk6IHN0cmluZ106IHVuZGVmaW5lZDtcbn1cbmV4cG9ydCB0eXBlIFJlcXVlc3RPcHRpb25zID0gTWFpbGd1bkNsaWVudE9wdGlvbnMgJiB7XG4gIGhlYWRlcnM6IEF4aW9zUmVxdWVzdEhlYWRlcnMgfCBSYXdBeGlvc1JlcXVlc3RIZWFkZXJzO1xuICB0aW1lb3V0OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIE9uQ2FsbFJlcXVlc3RPcHRpb25zID0ge1xuICB0aW1lb3V0PzogbnVtYmVyO1xuICBoZWFkZXJzPzogQXhpb3NSZXF1ZXN0SGVhZGVycyB8IFJhd0F4aW9zUmVxdWVzdEhlYWRlcnM7XG4gIHF1ZXJ5PzogYW55O1xuICBba2V5OiBzdHJpbmddOiB1bmtub3duIHwgdW5kZWZpbmVkO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9FcnJvcic7XG5leHBvcnQgKiBmcm9tICcuL0FwaVJlc3BvbnNlJztcbmV4cG9ydCAqIGZyb20gJy4vRm9ybURhdGEnO1xuZXhwb3J0ICogZnJvbSAnLi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmV4cG9ydCAqIGZyb20gJy4vUmVxdWVzdE9wdGlvbnMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFsc1F1ZXJ5ID0ge1xuICAgIGxpbWl0OiBudW1iZXI7XG4gICAgc2tpcDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFscyA9IHtcbiAgICBsb2dpbjogc3RyaW5nO1xuICAgIHBhc3N3b3JkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzSXRlbSA9IHtcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmcsXG4gICAgbG9naW46IHN0cmluZyxcbiAgICBtYWlsYm94OiBzdHJpbmcsXG4gICAgc2l6ZV9ieXRlczogbnVtYmVyIHwgbnVsbFxufVxuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogRG9tYWluQ3JlZGVudGlhbHNJdGVtW107XG4gICAgICAgIHRvdGFsX2NvdW50OiBudW1iZXI7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFsc0xpc3QgPSB7XG4gICAgaXRlbXM6IERvbWFpbkNyZWRlbnRpYWxzSXRlbVtdO1xuICAgIHRvdGFsQ291bnQ6IG51bWJlcjtcbn1cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyLFxuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzcGVjPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXIsXG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcixcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgc3BlYzogc3RyaW5nO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhID0ge1xuICAgIHBhc3N3b3JkOiBzdHJpbmc7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCB7IFJlc29sdXRpb24gfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NRdWVyeSA9IHtcbiAgICBsaW1pdDogbnVtYmVyO1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSA9IHtcbiAgICBldmVudDogc3RyaW5nO1xuICAgIHN0YXJ0PzogbnVtYmVyO1xuICAgIGVuZD86IG51bWJlcjtcbiAgICByZXNvbHV0aW9uPzogUmVzb2x1dGlvbjtcbiAgICBkdXJhdGlvbj86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc0l0ZW1JbmZvID0ge1xuICAgIHRhZzogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgJ2ZpcnN0LXNlZW4nOiBzdHJpbmcsXG4gICAgJ2xhc3Qtc2Vlbic6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzSXRlbSA9IHtcbiAgICB0YWc6IHN0cmluZyxcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgICdmaXJzdC1zZWVuJzogRGF0ZSxcbiAgICAnbGFzdC1zZWVuJzogRGF0ZVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzUmVzcG9uc2VEYXRhID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IERvbWFpblRhZ3NJdGVtSW5mb1tdO1xuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdFxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc0xpc3QgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgaXRlbXM6IERvbWFpblRhZ3NJdGVtW107XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc01lc3NhZ2VSZXMgPSB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHN0YXR1cz86IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0gPSB7XG4gICAgdGltZTpzdHJpbmdcbiAgICBhY2NlcHRlZD86IHtcbiAgICAgICAgaW5jb21pbmc6IG51bWJlcjtcbiAgICAgICAgb3V0Z29pbmc6IG51bWJlcjtcbiAgICAgICAgdG90YWw6IG51bWJlclxuICAgIH1cbiAgICBkZWxpdmVyZWQ/OiB7XG4gICAgICAgIHNtdHA6IG51bWJlcjtcbiAgICAgICAgaHR0cDogbnVtYmVyO1xuICAgICAgICBvcHRpbWl6ZWQ6IG51bWJlcjtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIG9wZW5lZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIGZhaWxlZD86IHtcbiAgICAgICAgdGVtcG9yYXJ5OntcbiAgICAgICAgICAgIGVzcGJsb2NrOiBudW1iZXI7XG4gICAgICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgICAgICB9O1xuICAgICAgICBwZXJtYW5lbnQ6IHtcbiAgICAgICAgICAgICdzdXBwcmVzcy1ib3VuY2UnOiBudW1iZXI7XG4gICAgICAgICAgICAnc3VwcHJlc3MtdW5zdWJzY3JpYmUnOiBudW1iZXI7XG4gICAgICAgICAgICAnc3VwcHJlc3MtY29tcGxhaW50JzogbnVtYmVyO1xuICAgICAgICAgICAgYm91bmNlOiBudW1iZXI7XG4gICAgICAgICAgICAnZGVsYXllZC1ib3VuY2UnOiBudW1iZXI7XG4gICAgICAgICAgICB3ZWJob29rOiBudW1iZXI7XG4gICAgICAgICAgICBvcHRpbWl6ZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjbGlja2VkPzoge1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH07XG4gICAgdW5zdWJzY3JpYmVkPzoge1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH07XG4gICAgY29tcGxhaW5lZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIHN0b3JlZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSA9IHtcbiAgICBib2R5OntcbiAgICAgICAgdGFnOiBzdHJpbmc7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgICAgIHN0YXJ0OiBzdHJpbmc7XG4gICAgICAgIGVuZDogc3RyaW5nO1xuICAgICAgICByZXNvbHV0aW9uOiBSZXNvbHV0aW9uO1xuICAgICAgICBzdGF0czogRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW1bXTtcbiAgICB9XG59XG5leHBvcnQgdHlwZSBEb21haW5UYWdTdGF0aXN0aWNJdGVtID0gT21pdCA8RG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0sICd0aW1lJz4gJiB7XG4gICAgdGltZTogRGF0ZVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIHRhZzpzdHJpbmc7XG4gICAgICAgIGNvdW50cnk6IHtcbiAgICAgICAgICAgIFtrZXk6c3RyaW5nXToge1xuICAgICAgICAgICAgICAgIGNsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bmlxdWVfb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbiA9IHtcbiAgICB0YWc6c3RyaW5nO1xuICAgIGNvdW50cnk6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICAgICAgY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgY29tcGxhaW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICB1bmlxdWVfY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5pcXVlX29wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ1Byb3ZpZGVyc0FQSVJlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgdGFnOnN0cmluZztcbiAgICAgICAgcHJvdmlkZXI6IHtcbiAgICAgICAgICAgIFtrZXk6c3RyaW5nXToge1xuICAgICAgICAgICAgICAgIGFjY2VwdGVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIGNvbXBsYWluZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBkZWxpdmVyZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBvcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bmlxdWVfY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuaXF1ZV9vcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uID0ge1xuICAgIHRhZzogc3RyaW5nO1xuICAgIHByb3ZpZGVyOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHtcbiAgICAgICAgICAgIGFjY2VwdGVkOiBudW1iZXI7XG4gICAgICAgICAgICBjbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgICAgICAgICBkZWxpdmVyZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIG9wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuaXF1ZV9vcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlZDogbnVtYmVyO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgRGV2aWNlU3RhdGlzdGljID0ge1xuICAgIGNsaWNrZWQ6IG51bWJlcjtcbiAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgb3BlbmVkOiBudW1iZXI7XG4gICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICB1bmlxdWVfb3BlbmVkOiBudW1iZXI7XG4gICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERldmljZXNUeXBlcyA9IHtcbiAgICBkZXNrdG9wOiBEZXZpY2VTdGF0aXN0aWM7XG4gICAgbW9iaWxlOiBEZXZpY2VTdGF0aXN0aWM7XG4gICAgdGFibGV0OiBEZXZpY2VTdGF0aXN0aWM7XG4gICAgdW5rbm93bjogRGV2aWNlU3RhdGlzdGljO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdEZXZpY2VzQVBJUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICB0YWc6c3RyaW5nO1xuICAgICAgICBkZXZpY2U6IERldmljZXNUeXBlcztcbiAgICB9XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbiA9IHtcbiAgICB0YWc6IHN0cmluZztcbiAgICBkZXZpY2U6IERldmljZXNUeXBlcztcbn1cbiIsImltcG9ydCB7IFllc05vIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSURvbWFpblRlbXBsYXRlIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcbmltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBEb21haW5UZW1wbGF0ZURhdGEgPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgdGVtcGxhdGU6IHN0cmluZztcbiAgICB0YWc/OiBzdHJpbmc7XG4gICAgZW5naW5lPzogc3RyaW5nO1xuICAgIGNvbW1lbnQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGEgPSB7XG4gICAgdGVtcGxhdGU6IHN0cmluZztcbiAgICB0YWc6IHN0cmluZztcbiAgICBlbmdpbmU/OiBzdHJpbmc7XG4gICAgY29tbWVudD86IHN0cmluZztcbiAgICBhY3RpdmU/OiBZZXNObztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhID0ge1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGEgPSB7XG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7XG4gICAgY29tbWVudD86IHN0cmluZztcbiAgICBhY3RpdmU/OiBZZXNObztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGVtcGxhdGVzUXVlcnkgPSB7XG4gICAgLyoqICdwYWdlJyAob3B0aW9uYWxseSAncCcpIHBhcmFtcyBmcm9tIHByZXZpb3VzIHJlc3BvbnNlJ3MgJ3BhZ2luZycgb2JqZWN0LlxuICAgICAqIFZhbHVlIG11c3QgYmUgc3RyaW5naWZpZWQgYXMgcXVlcnkgcGFyYW1zLiBFeDogJz9wYWdlPWZpcnN0JywnP3BhZ2U9bmV4dCZwPW5hbWUtb2YtbGFzdC1pdGVtJ1xuICAgICAuLi4uICovXG4gICAgcGFnZT86IGA/JHtzdHJpbmd9YDtcbiAgICAvKiogTnVtYmVyIG9mIHJlY29yZHMgdG8gcmV0cmlldmUuIERlZmF1bHQgdmFsdWUgaXMgMTAuICovXG4gICAgbGltaXQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFRlbXBsYXRlUXVlcnkgPSB7XG4gICAgYWN0aXZlOiBZZXNObztcbn1cblxuZXhwb3J0IHR5cGUgU2hvcnRUZW1wbGF0ZVZlcnNpb24gPSB7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgZW5naW5lOiBzdHJpbmc7XG4gICAgbWptbDogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbiAgICBjb21tZW50OiBzdHJpbmc7XG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIGlkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFRlbXBsYXRlVmVyc2lvbiA9IFNob3J0VGVtcGxhdGVWZXJzaW9uICYge1xuICAgIHRlbXBsYXRlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IElEb21haW5UZW1wbGF0ZVtdO1xuICAgICAgICBwYWdpbmc6IHtcbiAgICAgICAgICAgIGZpcnN0OiBzdHJpbmc7XG4gICAgICAgICAgICBsYXN0OiBzdHJpbmc7XG4gICAgICAgICAgICBuZXh0OiBzdHJpbmc7XG4gICAgICAgICAgICBwcmV2aW91czogc3RyaW5nO1xuICAgICAgICB9O1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQgPSB7XG4gICAgICAgIGl0ZW1zOiBJRG9tYWluVGVtcGxhdGVbXTtcbiAgICAgICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbiAgICAgICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICB0ZW1wbGF0ZTogSURvbWFpblRlbXBsYXRlO1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZ1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdGVtcGxhdGVOYW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBOb3RpZmljYXRpb25BUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBOb3RpZmljYXRpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgdGVtcGxhdGU6IElEb21haW5UZW1wbGF0ZTtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG59XG5cbmV4cG9ydCB0eXBlIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICAgICAgdmVyc2lvbjoge1xuICAgICAgICAgICAgICAgIHRhZzogc3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmc7XG4gICAgdGVtcGxhdGVWZXJzaW9uOiB7XG4gICAgICAgIHRhZzogc3RyaW5nO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgICAgICAgICAgY3JlYXRlZEF0OiBzdHJpbmc7XG4gICAgICAgICAgICBjcmVhdGVkQnk6IHN0cmluZztcbiAgICAgICAgICAgIGlkOiBzdHJpbmc7XG4gICAgICAgICAgICB2ZXJzaW9uczogU2hvcnRUZW1wbGF0ZVZlcnNpb25bXVxuICAgICAgICB9XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0ID0ge1xuICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5leHBvcnQgdHlwZSBEb21haW5UcmFja2luZ0RhdGEgPSB7XG4gIGNsaWNrOiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuICBvcGVuOiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuICB1bnN1YnNjcmliZToge1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBodG1sX2Zvb3Rlcjogc3RyaW5nO1xuICAgIHRleHRfZm9vdGVyOiBzdHJpbmc7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVHJhY2tpbmdSZXNwb25zZSA9IHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIGJvZHk6IHtcbiAgICB0cmFja2luZzogRG9tYWluVHJhY2tpbmdEYXRhXG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRPcGVuVHJhY2tpbmcgPSB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgb3Blbj86IHsgYWN0aXZlOiBib29sZWFuIH07XG4gIGNsaWNrPzogeyBhY3RpdmU6IGJvb2xlYW4gfCAnaHRtbG9ubHknIH07XG4gIHVuc3Vic2NyaWJlPzoge1xuICAgIGFjdGl2ZTogYm9vbGVhbixcbiAgICBodG1sX2Zvb3Rlcjogc3RyaW5nO1xuICAgIHRleHRfZm9vdGVyOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBib2R5OiBVcGRhdGVkT3BlblRyYWNraW5nO1xufVxuXG5leHBvcnQgdHlwZSBPcGVuVHJhY2tpbmdJbmZvID0ge1xuICBhY3RpdmU6ICd5ZXMnIHwgJ25vJyB8ICd0cnVlJyB8ICdmYWxzZSc7XG59XG5leHBvcnQgdHlwZSBDbGlja1RyYWNraW5nSW5mbyA9IHtcbiAgYWN0aXZlOiAneWVzJyB8ICdubycgfCAndHJ1ZScgfCAnZmFsc2UnIHwgJ2h0bWxvbmx5Jztcbn1cblxuZXhwb3J0IHR5cGUgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8gPSB7XG4gIGFjdGl2ZTogJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwgJ2ZhbHNlJztcbiAgaHRtbF9mb290ZXI6IHN0cmluZztcbiAgdGV4dF9mb290ZXI6IHN0cmluZztcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgRG9tYWluc1F1ZXJ5ID0ge1xuICAgIGF1dGhvcml0eT8gOiBzdHJpbmc7XG4gICAgc3RhdGU/OiAnYWN0aXZlJyB8ICd1bnZlcmlmaWVkJyB8ICdkaXNhYmxlZCc7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgc2tpcD86IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVXBkYXRlSW5mbyA9IHtcbiAgICBzcGFtX2FjdGlvbj86ICdkaXNhYmxlZCcgfCAnYmxvY2snIHwgJ3RhZyc7XG4gICAgd2ViX3NjaGVtZT86ICdodHRwJyB8ICdodHRwcyc7XG4gICAgd2lsZGNhcmQ/OiBib29sZWFuIHwgJ3RydWUnIHwgJ2ZhbHNlJztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVXBkYXRlSW5mb1JlcSA9IERvbWFpblVwZGF0ZUluZm8gJiB7XG4gICAgd2lsZGNhcmQ/OiAndHJ1ZScgfCAnZmFsc2UnOyAvLyBhcGkgc3VwcG9ydHMgb25seSBzdHJpbmdzXG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkluZm8gPSBEb21haW5VcGRhdGVJbmZvICYge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzbXRwX3Bhc3N3b3JkOiBzdHJpbmc7XG4gICAgZm9yY2VfZGtpbV9hdXRob3JpdHk/OiBib29sZWFuIHwgJ3RydWUnIHwgJ2ZhbHNlJztcbiAgICBka2ltX2tleV9zaXplPzogMTAyNCB8IDIwNDg7XG4gICAgaXBzPzogJyc7XG4gICAgcG9vbF9pZD86ICcnO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5JbmZvUmVxID0gRG9tYWluSW5mbyAmIHtcbiAgICBmb3JjZV9ka2ltX2F1dGhvcml0eT86ICd0cnVlJyB8ICdmYWxzZSc7XG59XG5cbmV4cG9ydCB0eXBlIEJvb2xUb1N0cmluZyA9IHtcbiAgICBmb3JjZV9ka2ltX2F1dGhvcml0eT86IERvbWFpbkluZm9bJ2ZvcmNlX2RraW1fYXV0aG9yaXR5J107XG4gICAgd2lsZGNhcmQ/OiBEb21haW5VcGRhdGVJbmZvWyd3aWxkY2FyZCddO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5TaG9ydERhdGEgPSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICAgIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xuICAgIHN0YXRlOiBzdHJpbmc7XG4gICAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gICAgc3BhbV9hY3Rpb246IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gICAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICAgIHNtdHBfbG9naW46IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkRhdGEgPSBEb21haW5TaG9ydERhdGEgJiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBpc19kaXNhYmxlZDogYm9vbGVhbjtcbiAgICB3ZWJfcHJlZml4OiBzdHJpbmc7XG4gICAgd2ViX3NjaGVtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERvbWFpbnNMaXN0SXRlbSBleHRlbmRzIERvbWFpblNob3J0RGF0YXtcbiAgICByZWNlaXZpbmdfZG5zX3JlY29yZHM6IG51bGw7XG4gICAgc2VuZGluZ19kbnNfcmVjb3JkczogbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBETlNSZWNvcmQge1xuICAgIGNhY2hlZDogYW55W107XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJlY29yZF90eXBlOiBzdHJpbmc7XG4gICAgdmFsaWQ6IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIHByaW9yaXR5Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5SZXNwb25zZURhdGEgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBkb21haW46IERvbWFpbkRhdGE7XG4gICAgICAgIG1lc3NhZ2U/OiBzdHJpbmc7XG4gICAgICAgIHJlY2VpdmluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW107XG4gICAgICAgIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluTGlzdFJlc3BvbnNlRGF0YSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBEb21haW5zTGlzdEl0ZW1bXSB8IG51bGw7XG4gICAgICAgIHRvdGFsX2NvdW50OiBudW1iZXI7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBNZXNzYWdlUmVzcG9uc2UgPSB7XG4gICAgbWVzc2FnZSA6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBEZXN0cm95ZWREb21haW5SZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiBNZXNzYWdlUmVzcG9uc2Vcbn1cblxuZXhwb3J0IHR5cGUgQ29ubmVjdGlvblNldHRpbmdzID0ge1xuICAgIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICAgIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xufVxuZXhwb3J0IHR5cGUgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICBjb25uZWN0aW9uOiBDb25uZWN0aW9uU2V0dGluZ3NcbiAgICB9XG4gICAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyA9IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gICAgc2tpcF92ZXJpZmljYXRpb246IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcyA9IHtcbiAgICBib2R5OiBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzO1xuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIERLSU1BdXRob3JpdHlJbmZvID0ge1xuICAgIHNlbGY6IGJvb2xlYW4gfCAneWVzJyB8ICdubycgfCAndHJ1ZScgfCdmYWxzZSdcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZERLSU1BdXRob3JpdHkgPSB7XG4gICAgY2hhbmdlZDogYm9vbGVhbjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgc2VuZGluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW11cbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZERLSU1BdXRob3JpdHlSZXNwb25zZSA9IHtcbiAgICBib2R5OiBVcGRhdGVkREtJTUF1dGhvcml0eTtcbiAgICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgREtJTVNlbGVjdG9ySW5mbyA9IHtcbiAgICBka2ltU2VsZWN0b3I6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UgPSB7XG4gICAgYm9keTpNZXNzYWdlUmVzcG9uc2U7XG4gICAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgV2ViUHJlZml4SW5mbyA9IHtcbiAgICB3ZWJQcmVmaXg6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkV2ViUHJlZml4ID0ge1xuICAgIG1lc3NhZ2UgOiBzdHJpbmdcbn1cbmV4cG9ydCB0eXBlIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSA9IHtcbiAgICBib2R5Ok1lc3NhZ2VSZXNwb25zZTtcbiAgICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBSZXBsYWNlbWVudEZvclBvb2wgPSB7XG4gICAgcG9vbF9pZD86IHN0cmluZztcbiAgICBpcD86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgVERvbWFpbiA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICByZXF1aXJlX3RsczogYm9vbGVhbjtcbiAgc2tpcF92ZXJpZmljYXRpb246IGJvb2xlYW47XG4gIHN0YXRlOiBzdHJpbmc7XG4gIHdpbGRjYXJkOiBib29sZWFuO1xuICBzcGFtX2FjdGlvbjogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gIHNtdHBfcGFzc3dvcmQ6IHN0cmluZztcbiAgc210cF9sb2dpbjogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHJlY2VpdmluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuICBzZW5kaW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIGlkPzogc3RyaW5nO1xuICBpc19kaXNhYmxlZD86IGJvb2xlYW47XG4gIHdlYl9wcmVmaXg/OiBzdHJpbmc7XG4gIHdlYl9zY2hlbWU/OiBzdHJpbmc7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0RvbWFpbkNyZWRlbnRpYWxzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWlucyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRhZ3MnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UZW1wbGF0ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UcmFja2luZyc7XG4iLCJpbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbmV4cG9ydCB0eXBlIEV2ZW50c1BhZ2UgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBudW1iZXI6IHN0cmluZztcbiAgICB1cmw6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRmlsdGVyRmllbGQgPSB7XG4gICAgZXZlbnQ/OiBzdHJpbmc7XG4gICAgbGlzdD86IHN0cmluZztcbiAgICBhdHRhY2htZW50Pzogc3RyaW5nO1xuICAgIGZyb20/OiBzdHJpbmc7XG4gICAgJ21lc3NhZ2UtaWQnPzogc3RyaW5nO1xuICAgIHN1YmplY3Q/OiBzdHJpbmc7XG4gICAgdG8/OiBzdHJpbmc7XG4gICAgc2l6ZT86IHN0cmluZztcbiAgICByZWNpcGllbnQ/OiBzdHJpbmc7XG4gICAgcmVjaXBpZW50cz86IHN0cmluZztcbiAgICB0YWdzPzogc3RyaW5nO1xuICAgIHNldmVyaXR5Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBFdmVudHNRdWVyeSA9IEZpbHRlckZpZWxkICYge1xuICAgIHBhZ2U/OiBzdHJpbmc7XG4gICAgYmVnaW4/OiBzdHJpbmc7XG4gICAgZW5kPzogc3RyaW5nO1xuICAgIGFzY2VuZGluZz86ICd5ZXMnfCAnbm8nO1xuICAgIGxpbWl0PzogbnVtYmVyO1xufVxuZXhwb3J0IHR5cGUgRXZlbnRzUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogW107XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICAgIH0sXG4gICAgc3RhdHVzOiBudW1iZXJcbn1cbmV4cG9ydCB0eXBlIERvbWFpbkV2ZW50ID0ge1xuICAgIHNldmVyaXR5OiBzdHJpbmc7XG4gICAgdGFnczogc3RyaW5nW107XG4gICAgc3RvcmFnZToge1xuICAgICAgICB1cmw6IHN0cmluZztcbiAgICAgICAga2V5OiBzdHJpbmdcbiAgICB9O1xuICAgICdkZWxpdmVyeS1zdGF0dXMnOiB7XG4gICAgICAgIHRsczogYm9vbGVhbjtcbiAgICAgICAgJ214LWhvc3QnOiBzdHJpbmc7XG4gICAgICAgIGNvZGU6IG51bWJlcjtcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICAgICAgJ3Nlc3Npb24tc2Vjb25kcyc6IG51bWJlcjtcbiAgICAgICAgdXRmODogYm9vbGVhbjtcbiAgICAgICAgJ2F0dGVtcHQtbm8nOiBudW1iZXI7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgJ2NlcnRpZmljYXRlLXZlcmlmaWVkJzogYm9vbGVhblxuICAgIH07XG4gICAgJ3JlY2lwaWVudC1kb21haW4nOiBzdHJpbmc7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjYW1wYWlnbnM6IFtdO1xuICAgIHJlYXNvbjogc3RyaW5nO1xuICAgICd1c2VyLXZhcmlhYmxlcyc6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgICB9O1xuICAgIGZsYWdzOiB7XG4gICAgICAgICdpcy1yb3V0ZWQnOiBib29sZWFuO1xuICAgICAgICAnaXMtYXV0aGVudGljYXRlZCc6IGJvb2xlYW47XG4gICAgICAgICdpcy1zeXN0ZW0tdGVzdCc6IGJvb2xlYW47XG4gICAgICAgICdpcy10ZXN0LW1vZGUnOiBib29sZWFuXG4gICAgfTtcbiAgICAnbG9nLWxldmVsJyA6IHN0cmluZztcbiAgICB0ZW1wbGF0ZT86IHVua25vd247XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gICAgZW52ZWxvcGU6IHtcbiAgICAgICAgdHJhbnNwb3J0OiBzdHJpbmc7XG4gICAgICAgIHNlbmRlcjogc3RyaW5nO1xuICAgICAgICAnc2VuZGluZy1pcCc6IHN0cmluZztcbiAgICAgICAgdGFyZ2V0czogc3RyaW5nXG4gICAgfTtcbiAgICBtZXNzYWdlOiB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIHRvOiBzdHJpbmc7XG4gICAgICAgICAgICAnbWVzc2FnZS1pZCc6IHN0cmluZztcbiAgICAgICAgICAgIGZyb206IHN0cmluZztcbiAgICAgICAgICAgIHN1YmplY3Q6IHN0cmluZ1xuICAgICAgICB9O1xuICAgICAgICBhdHRhY2htZW50czogW107XG4gICAgICAgIHNpemU6IDMwOFxuICAgIH07XG4gICAgcmVjaXBpZW50OiBzdHJpbmc7XG4gICAgZXZlbnQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRXZlbnRzTGlzdCA9IHtcbiAgICBpdGVtczogRG9tYWluRXZlbnRbXTtcbiAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xuICAgIHN0YXR1czogbnVtYmVyO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9FdmVudHMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBJcFBvb2wgPSB7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGlwczogc3RyaW5nW107XG4gIGlzX2xpbmtlZDogYm9vbGVhbjtcbiAgbmFtZTogc3RyaW5nO1xuICBwb29sX2lkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbExpc3RSZXNwb25zZSA9IHtcbiAgYm9keToge1xuICAgIGlwX3Bvb2xzOiBJcFBvb2wsXG4gICAgbWVzc2FnZTogc3RyaW5nXG4gIH0sXG4gIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbExpc3RSZXN1bHQgPSB7XG4gIGlwX3Bvb2xzOiBJcFBvb2wsXG4gIG1lc3NhZ2U6IHN0cmluZyxcbiAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sVXBkYXRlRGF0YSA9IHtcbiAgbmFtZTogc3RyaW5nLFxuICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICBpcHM6IHN0cmluZ1tdXG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IHtcbiAgYm9keToge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sTWVzc2FnZVJlc3VsdCA9IHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sRGVsZXRlRGF0YSA9IHtcbiAgaXA/OiBzdHJpbmcsXG4gIHBvb2xfaWQ/OiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sQ3JlYXRlRGF0YSA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgaXBzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbENyZWF0ZVJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHBvb2xfaWQ6IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xDcmVhdGVSZXN1bHQgPSB7XG4gIHN0YXR1czogbnVtYmVyXG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgcG9vbF9pZDogc3RyaW5nO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JcFBvb2xzJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgSXBzTGlzdFJlc3BvbnNlQm9keSA9IHtcbiAgYXNzaWduYWJsZV90b19wb29sczogYm9vbGVhbjtcbiAgaXRlbXM6IHN0cmluZ1tdO1xuICB0b3RhbF9jb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJcERhdGEgPSB7XG4gIGlwOiBzdHJpbmc7XG4gIGRlZGljYXRlZDogYm9vbGVhbjtcbiAgcmRuczogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBJUHNMaXN0UXVlcnkgPSB7XG4gIGRlZGljYXRlZDogYm9vbGVhbiB8IHN0cmluZ1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JUHMnO1xuIiwiaW1wb3J0IHsgQXhpb3NQcm94eUNvbmZpZyB9IGZyb20gJ2F4aW9zJztcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgTWFpbGd1bkNsaWVudE9wdGlvbnMgPSB7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGtleTogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG4gIHB1YmxpY19rZXk/OiBzdHJpbmc7XG4gIHRpbWVvdXQ/OiBudW1iZXI7XG4gIHByb3h5PzogQXhpb3NQcm94eUNvbmZpZztcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTWFpbGd1bkNsaWVudE9wdGlvbnMnO1xuIiwiaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuaW1wb3J0IHsgTWFpbGluZ0xpc3QgfSBmcm9tICcuL01haWxpbmdMaXN0cyc7XG5cbmV4cG9ydCB0eXBlIE1haWxMaXN0TWVtYmVyID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc3Vic2NyaWJlZDogYm9vbGVhbixcbiAgICB2YXJzOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHVua25vd25cbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBNYWlsTGlzdE1lbWJlcnNRdWVyeSA9IHtcbiAgICBzdWJzY3JpYmVkPzogJ3llcycgfCAnbm8nO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlTWVtYmVyc0RhdGEgPSB7XG4gICAgbWVtYmVyczogQXJyYXk8TWFpbExpc3RNZW1iZXI+O1xuICAgIHVwc2VydDogJ3llcycgfCAnbm8nO1xufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhID0ge1xuICAgIG1lbWJlcnM6IHN0cmluZztcbiAgICB1cHNlcnQ6ICd5ZXMnIHwgJ25vJztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHZhcnM/OiBzdHJpbmc7XG4gICAgc3Vic2NyaWJlZD86ICd5ZXMnIHwgJ25vJyB8IGJvb2xlYW47XG4gICAgdXBzZXJ0PzogJ3llcycgfCAnbm8nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXEgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdmFycz86IHN0cmluZztcbiAgICBzdWJzY3JpYmVkPzogJ3llcycgfCAnbm8nIHwgYm9vbGVhbjtcbiAgICB1cHNlcnQ/OiAneWVzJyB8ICdubyc7XG59XG5cbmV4cG9ydCB0eXBlIERlbGV0ZWRNZW1iZXIgPSB7XG4gICAgbWVtYmVyOiB7XG4gICAgICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICB9LFxuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgfVxuXG5leHBvcnQgdHlwZSBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSA9IHtcbiAgICBsaXN0OiBNYWlsaW5nTGlzdDtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgJ3Rhc2staWQnOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE1haWxMaXN0TWVtYmVyc1Jlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IE1haWxMaXN0TWVtYmVyW11cbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3RcbiAgICB9LFxuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIE1haWxMaXN0TWVtYmVyc1Jlc3VsdCA9IHtcbiAgICBpdGVtczogTWFpbExpc3RNZW1iZXJbXVxuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3RcbiAgICBzdGF0dXM6IG51bWJlclxufVxuIiwiaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIExpc3RzUXVlcnkgPSB7XG4gICAgYWRkcmVzcz86IHN0cmluZztcbiAgICBsaW1pdD86IG51bWJlcjtcbiAgICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVVcGRhdGVMaXN0ID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIGFjY2Vzc19sZXZlbD86ICdyZWFkb25seScgfCAnbWVtYmVycyd8ICdldmVyeW9uZSc7XG4gICAgcmVwbHlfcHJlZmVyZW5jZT86ICdsaXN0JyB8ICdzZW5kZXInO1xufVxuXG5leHBvcnQgdHlwZSBEZXN0cm95ZWRMaXN0ID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFN0YXJ0VmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBpZDogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgZG93bmxvYWRfdXJsOiB7XG4gICAgICBjc3Y6IHN0cmluZztcbiAgICAgIGpzb246IHN0cmluZ1xuICAgIH07XG4gICAgaWQ6IHN0cmluZztcbiAgICBxdWFudGl0eTogbnVtYmVyO1xuICAgIHJlY29yZHNfcHJvY2Vzc2VkOiBudW1iZXI7XG4gICAgc3VtbWFyeToge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGNhdGNoX2FsbDogbnVtYmVyO1xuICAgICAgICBkZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICBkb19ub3Rfc2VuZDogbnVtYmVyO1xuICAgICAgICB1bmRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgIHVua25vd246IG51bWJlclxuICAgICAgfVxuICAgICAgcmlzazoge1xuICAgICAgICBoaWdoOiBudW1iZXI7XG4gICAgICAgIGxvdzogbnVtYmVyO1xuICAgICAgICBtZWRpdW06IG51bWJlcjtcbiAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0VmFsaWRhdGlvbkFwaVJlc3BvbnNlID0gTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzcG9uc2UgJiB7XG4gICAgY3JlYXRlZF9hdDogbnVtYmVyO1xufVxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0RGF0YSA9IE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3BvbnNlICYge1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG59XG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgdmFsaWRhdGlvblJlc3VsdDogTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0RGF0YTtcbn1cblxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0ID0ge1xuICAgIGFjY2Vzc19sZXZlbDogc3RyaW5nO1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBtZW1iZXJzX2NvdW50OiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJlcGx5X3ByZWZlcmVuY2U6IG51bGwgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0UmVzdWx0ID0ge1xuICAgIGl0ZW1zOiBNYWlsaW5nTGlzdFtdO1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Rcbn1cblxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RBcGlSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBNYWlsaW5nTGlzdFtdO1xuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgICB9XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0TWVtYmVycyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0cyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyoqXG4gKiBFbnN1cmVzIHRoZSBvYmplY3QgaGFzIGxlYXN0IG9uZSBrZXkgcHJlc2VudCBhbmQgbm90IHVuZGVmaW5lZFxuICpcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80OTcyNTE5OH1cbiAqL1xuZXhwb3J0IHR5cGUgQXRMZWFzdE9uZUtleVByZXNlbnQ8XG4gIE9iamVjdF8sXG4gIEtleXMgZXh0ZW5kcyBrZXlvZiBPYmplY3RfID0ga2V5b2YgT2JqZWN0X1xuPiA9IFBpY2s8T2JqZWN0XywgRXhjbHVkZTxrZXlvZiBPYmplY3RfLCBLZXlzPj4gJlxuICB7XG4gICAgW0sgaW4gS2V5c10tPzogUmVxdWlyZWQ8UGljazxPYmplY3RfLCBLPj4gJlxuICAgICAgUGFydGlhbDxQaWNrPE9iamVjdF8sIEV4Y2x1ZGU8S2V5cywgSz4+PjtcbiAgfVtLZXlzXTtcblxuZXhwb3J0IHR5cGUgTWltZU1lc3NhZ2UgPSBzdHJpbmcgfCBCbG9iIHwgQnVmZmVyIHwgTm9kZUpTLlJlYWRhYmxlU3RyZWFtO1xuZXhwb3J0IHR5cGUgQ3VzdG9tRmlsZURhdGEgPSBzdHJpbmcgfCBCbG9iIHwgRmlsZSB8IEJ1ZmZlciB8IE5vZGVKUy5SZWFkYWJsZVN0cmVhbTtcblxuZXhwb3J0IHR5cGUgQ3VzdG9tRmlsZSA9IHtcbiAgZGF0YTogQ3VzdG9tRmlsZURhdGE7XG4gIGZpbGVuYW1lPzogc3RyaW5nO1xuICBjb250ZW50VHlwZT8gOiBzdHJpbmc7XG4gIGtub3duTGVuZ3RoPzogbnVtYmVyO1xuICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xufVxuXG5leHBvcnQgdHlwZSBNZXNzYWdlQXR0YWNobWVudCA9XG4gIEN1c3RvbUZpbGVcbiAgfCBDdXN0b21GaWxlW11cbiAgfCBGaWxlXG4gIHwgRmlsZVtdXG4gIHwgc3RyaW5nXG4gIHwgQ3VzdG9tRmlsZURhdGFcbiAgfCBDdXN0b21GaWxlRGF0YVtdXG5cbmV4cG9ydCB0eXBlIEZvcm1EYXRhSW5wdXRWYWx1ZSA9XG4gIE1pbWVNZXNzYWdlXG4gIHwgQ3VzdG9tRmlsZURhdGFcbiAgfCBzdHJpbmdcbiAgfCBzdHJpbmdbXVxuICB8IGJvb2xlYW5cbiAgfCBNZXNzYWdlQXR0YWNobWVudFxuICB8IHVuZGVmaW5lZFxuICB8IG51bWJlciAvLyBkb2Mgc2F5cyBpdCBzaG91bGQgYmUgYXV0by1jb252ZXJ0ZWQgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Zvcm1EYXRhL2FwcGVuZFxuICB8IEpzb25PYmplY3RcblxuZXhwb3J0IHR5cGUgSnNvblByaW1pdGl2ZSA9IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsO1xuZXhwb3J0IHR5cGUgSnNvbkFycmF5ID0gSnNvbltdO1xuZXhwb3J0IHR5cGUgSnNvbk9iamVjdCA9IHsgW2tleTogc3RyaW5nXTogSnNvbiB9O1xuZXhwb3J0IHR5cGUgSnNvbkNvbXBvc2l0ZSA9IEpzb25BcnJheSB8IEpzb25PYmplY3Q7XG5leHBvcnQgdHlwZSBKc29uID0gSnNvblByaW1pdGl2ZSB8IEpzb25Db21wb3NpdGU7XG5cbmV4cG9ydCB0eXBlIE1haWxndW5NZXNzYWdlQ29udGVudCA9IEF0TGVhc3RPbmVLZXlQcmVzZW50PHtcbiAgICAvKipcbiAgICAgKiBCb2R5IG9mIHRoZSBtZXNzYWdlLiAodGV4dCB2ZXJzaW9uKVxuICAgICAqL1xuICAgIHRleHQ/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBCb2R5IG9mIHRoZSBtZXNzYWdlLiAoSFRNTCB2ZXJzaW9uKVxuICAgICAqL1xuICAgIGh0bWw/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogQm9keSBvZiB0aGUgbWVzc2FnZS4gKE1JTUUgdmVyc2lvbilcbiAgICAgKi9cbiAgICBtZXNzYWdlPzogTWltZU1lc3NhZ2U7XG4gICAgIC8qKlxuICAgICAqIE5hbWUgb2YgYSB0ZW1wbGF0ZSBzdG9yZWQgdmlhIFt0ZW1wbGF0ZSBBUEldKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvYXBpLXRlbXBsYXRlcy5odG1sI2FwaS10ZW1wbGF0ZXMpLiBTZWUgW1RlbXBsYXRlc10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI3RlbXBsYXRpbmcpIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gICAgICovXG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7XG59PjtcblxuZXhwb3J0IHR5cGUgTWFpbGd1bk1lc3NhZ2VEYXRhID0gTWFpbGd1bk1lc3NhZ2VDb250ZW50ICYge1xuICAgIC8qKlxuICAgICAqIEVtYWlsIGFkZHJlc3MgZm9yIGBGcm9tYCBoZWFkZXJcbiAgICAgKi9cbiAgICBmcm9tPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRW1haWwgYWRkcmVzcyBvZiB0aGUgcmVjaXBpZW50KHMpLlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYEJvYiA8Ym9iQGhvc3QuY29tPmAuIFlvdSBjYW4gdXNlIGNvbW1hcyB0byBzZXBhcmF0ZSBtdWx0aXBsZSByZWNpcGllbnRzLlxuICAgICAqL1xuICAgIHRvPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIGBUb2AgYnV0IGZvciBgY2FyYm9uIGNvcHlgXG4gICAgICovXG4gICAgY2M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIFNhbWUgYXMgYFRvYCBidXQgZm9yIGBibGluZCBjYXJib24gY29weWBcbiAgICAgKi9cbiAgICBiY2M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIE1lc3NhZ2Ugc3ViamVjdFxuICAgICAqL1xuICAgIHN1YmplY3Q/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBbQU1QXShodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9nbWFpbC9hbXBlbWFpbC8pIHBhcnQgb2YgdGhlIG1lc3NhZ2UuIFBsZWFzZSBmb2xsb3cgZ29vZ2xlIGd1aWRlbGluZXMgdG8gY29tcG9zZSBhbmQgc2VuZCBBTVAgZW1haWxzLlxuICAgICAqL1xuICAgICdhbXAtaHRtbCc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBGaWxlIGF0dGFjaG1lbnQuIFlvdSBjYW4gcG9zdCBtdWx0aXBsZSBgYXR0YWNobWVudGAgdmFsdWVzLlxuICAgICAqXG4gICAgICogKipJbXBvcnRhbnQ6KiogWW91IG11c3QgdXNlIGBtdWx0aXBhcnQvZm9ybS1kYXRhYCBlbmNvZGluZyB3aGVuIHNlbmRpbmcgYXR0YWNobWVudHMuXG4gICAgICovXG4gICAgYXR0YWNobWVudD86IE1lc3NhZ2VBdHRhY2htZW50O1xuXG4gICAgLyoqXG4gICAgICogQXR0YWNobWVudCB3aXRoIGBpbmxpbmVgIGRpc3Bvc2l0aW9uLiBDYW4gYmUgdXNlZCB0byBzZW5kIGlubGluZSBpbWFnZXMgKHNlZSBleGFtcGxlKS5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gcG9zdCBtdWx0aXBsZSBgaW5saW5lYCB2YWx1ZXMuXG4gICAgICovXG4gICAgaW5saW5lPzogYW55O1xuXG4gICAgLyoqXG4gICAgICogVXNlIHRoaXMgcGFyYW1ldGVyIHRvIHNlbmQgYSBtZXNzYWdlIHRvIHNwZWNpZmljIHZlcnNpb24gb2YgYSB0ZW1wbGF0ZVxuICAgICAqL1xuICAgICd0OnZlcnNpb24nPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUGFzcyBgeWVzYCBpZiB5b3Ugd2FudCB0byBoYXZlIHJlbmRlcmVkIHRlbXBsYXRlXG4gICAgICogaW4gdGhlIHRleHQgcGFydCBvZiB0aGUgbWVzc2FnZSBpbiBjYXNlIG9mIHRlbXBsYXRlIHNlbmRpbmdcbiAgICAgKi9cbiAgICAndDp0ZXh0Jz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBBIHZhbGlkIEpTT04tZW5jb2RlZCBkaWN0aW9uYXJ5IHVzZWQgYXMgdGhlIGlucHV0IGZvciB0ZW1wbGF0ZSB2YXJpYWJsZSBleHBhbnNpb24uXG4gICAgICogU2VlIFtUZW1wbGF0ZXNdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvYXBpLXRlbXBsYXRlcy5odG1sI2FwaS10ZW1wbGF0ZXMpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgICd0OnZhcmlhYmxlcyc/OiBzdHJpbmcgfCBKc29uT2JqZWN0O1xuXG4gICAgLyoqXG4gICAgICogVGFnIHN0cmluZy4gU2VlIFtUYWdnaW5nXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjdGFnZ2luZykgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgJ286dGFnJz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcy9kaXNhYmxlcyBES0lNIHNpZ25hdHVyZXMgb24gcGVyLW1lc3NhZ2UgYmFzaXMuIFBhc3MgYHllc2AsIGBub2AsIGB0cnVlYCBvciBgZmFsc2VgXG4gICAgICovXG4gICAgJ286ZGtpbSc/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogRGVzaXJlZCB0aW1lIG9mIGRlbGl2ZXJ5LiBTZWUgW0RhdGUgRm9ybWF0XShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L2FwaS1pbnRyby5odG1sI2RhdGUtZm9ybWF0KS5cbiAgICAgKlxuICAgICAqIE5vdGU6IE1lc3NhZ2VzIGNhbiBiZSBzY2hlZHVsZWQgZm9yIGEgbWF4aW11bSBvZiAzIGRheXMgaW4gdGhlIGZ1dHVyZS5cbiAgICAgKi9cbiAgICAnbzpkZWxpdmVyeXRpbWUnPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBTZW5kIFRpbWUgT3B0aW1pemF0aW9uIChTVE8pIG9uIGEgcGVyLW1lc3NhZ2UgYmFzaXMuXG4gICAgICpcbiAgICAgKiBTdHJpbmcgc2hvdWxkIGJlIHNldCB0byB0aGUgbnVtYmVyIG9mIGhvdXJzIGluIGBbMC05XStoYCBmb3JtYXQsXG4gICAgICogd2l0aCB0aGUgbWluaW11bSBiZWluZyBgMjRoYCBhbmQgdGhlIG1heGltdW0gYmVpbmcgYDcyaGAuXG4gICAgICpcbiAgICAgKiBUaGlzIHZhbHVlIGRlZmluZXMgdGhlIHRpbWUgd2luZG93IGluIHdoaWNoIE1haWxndW4gd2lsbCBydW4gdGhlIG9wdGltaXphdGlvbiBhbGdvcml0aG0gYmFzZWQgb24gcHJpb3IgZW5nYWdlbWVudCBkYXRhIG9mIGEgZ2l2ZW4gcmVjaXBpZW50LiBTZWUgW1NlbmRpbmcgYSBtZXNzYWdlIHdpdGggU1RPXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjc3RvLXNlbmRpbmcpIGZvciBkZXRhaWxzLlxuICAgICAqXG4gICAgICogX1BsZWFzZSBub3RlIHRoYXQgU1RPIGlzIG9ubHkgYXZhaWxhYmxlIG9uIGNlcnRhaW4gcGxhbnMuXG4gICAgICogU2VlIHd3dy5tYWlsZ3VuLmNvbS9wcmljaW5nIGZvciBtb3JlIGluZm8uX1xuICAgICAqL1xuICAgICdvOmRlbGl2ZXJ5dGltZS1vcHRpbWl6ZS1wZXJpb2QnPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBUaW1lem9uZSBPcHRpbWl6YXRpb24gKFRaTykgb24gYSBwZXIgbWVzc2FnZSBiYXNpcy5cbiAgICAgKlxuICAgICAqIFN0cmluZyBzaG91bGQgYmUgc2V0IHRvIHByZWZlcnJlZCBkZWxpdmVyeSB0aW1lIGluIGBISDptbWAgb3IgYGhoOm1tYWFgIGZvcm1hdCwgd2hlcmUgYEhIOm1tYCBpcyB1c2VkIGZvciAyNCBob3VyIGZvcm1hdCB3aXRob3V0IEFNL1BNIGFuZCBgaGg6bW1hYWAgaXMgdXNlZCBmb3IgMTIgaG91ciBmb3JtYXQgd2l0aCBBTS9QTS4gU2VlIFtTZW5kaW5nIGEgbWVzc2FnZSB3aXRoIFRaT10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI3R6by1zZW5kaW5nKSBmb3IgZGV0YWlscy5cbiAgICAgKlxuICAgICAqIFBsZWFzZSBub3RlIHRoYXQgVFpPIGlzIG9ubHkgYXZhaWxhYmxlIG9uIGNlcnRhaW4gcGxhbnMuXG4gICAgICogU2VlIHd3dy5tYWlsZ3VuLmNvbS9wcmljaW5nIGZvciBtb3JlIGluZm8uXG4gICAgICovXG4gICAgJ286dGltZS16b25lLWxvY2FsaXplJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgc2VuZGluZyBpbiB0ZXN0IG1vZGUuIFBhc3MgYHllc2AgaWYgbmVlZGVkLiBTZWUgW1NlbmRpbmcgaW4gVGVzdCBNb2RlXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjbWFudWFsLXRlc3Rtb2RlKVxuICAgICAqL1xuICAgICdvOnRlc3Rtb2RlJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRyYWNraW5nIG9uIGEgcGVyLW1lc3NhZ2UgYmFzaXMsIHNlZSBbVHJhY2tpbmcgTWVzc2FnZXNdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCN0cmFja2luZy1tZXNzYWdlcyBmb3IgZGV0YWlscy4gUGFzcyAneWVzJywgJ25vJywgJ3RydWUnIG9yICdmYWxzZSdcbiAgICAgKi9cbiAgICAnbzp0cmFja2luZyc/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBjbGlja3MgdHJhY2tpbmcgb24gYSBwZXItbWVzc2FnZSBiYXNpcy5cbiAgICAgKiBIYXMgaGlnaGVyIHByaW9yaXR5IHRoYW4gZG9tYWluLWxldmVsIHNldHRpbmcuXG4gICAgICogUGFzcyBgeWVzYCwgYG5vYCwgYHRydWVgLCBgZmFsc2VgIG9yIGBodG1sb25seWAuXG4gICAgICovXG4gICAgJ286dHJhY2tpbmctY2xpY2tzJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubycgfCAnaHRtbG9ubHknO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBvcGVucyB0cmFja2luZyBvbiBhIHBlci1tZXNzYWdlIGJhc2lzLlxuICAgICAqIEhhcyBoaWdoZXIgcHJpb3JpdHkgdGhhbiBkb21haW4tbGV2ZWwgc2V0dGluZy5cbiAgICAgKiAgUGFzcyAneWVzJyBvciAnbm8nLCAndHJ1ZScgb3IgJ2ZhbHNlJ1xuICAgICAqL1xuICAgICdvOnRyYWNraW5nLW9wZW5zJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBJZiBzZXQgdG8gJ1RydWUnIG9yICd5ZXMnIHRoaXMgcmVxdWlyZXMgdGhlIG1lc3NhZ2Ugb25seSBiZSBzZW50IG92ZXIgYSBUTFMgY29ubmVjdGlvbi5cbiAgICAgKiBJZiBhIFRMUyBjb25uZWN0aW9uIGNhbiBub3QgYmUgZXN0YWJsaXNoZWQsIE1haWxndW4gd2lsbCBub3QgZGVsaXZlciB0aGUgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIElmIHNldCB0byAnRmFsc2UnIG9yICdubycsIE1haWxndW4gd2lsbCBzdGlsbCB0cnkgYW5kIHVwZ3JhZGUgdGhlIGNvbm5lY3Rpb24sXG4gICAgICogYnV0IGlmIE1haWxndW4gY2FuIG5vdCwgdGhlIG1lc3NhZ2Ugd2lsbCBiZSBkZWxpdmVyZWQgb3ZlciBhIHBsYWludGV4dCBTTVRQIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBUaGUgZGVmYXVsdCBpcyAnRmFsc2UnLlxuICAgICAqL1xuICAgICdvOnJlcXVpcmUtdGxzJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBJZiBzZXQgdG8gYFRydWVgIG9yIGB5ZXNgLCB0aGUgY2VydGlmaWNhdGUgYW5kIGhvc3RuYW1lIHdpbGwgbm90IGJlIHZlcmlmaWVkXG4gICAgICogd2hlbiB0cnlpbmcgdG8gZXN0YWJsaXNoIGEgVExTIGNvbm5lY3Rpb25cbiAgICAgKiBhbmQgTWFpbGd1biB3aWxsIGFjY2VwdCBhbnkgY2VydGlmaWNhdGUgZHVyaW5nIGRlbGl2ZXJ5LlxuICAgICAqXG4gICAgICogSWYgc2V0IHRvIGBGYWxzZWAgb3IgYG5vYCwgTWFpbGd1biB3aWxsIHZlcmlmeSB0aGUgY2VydGlmaWNhdGUgYW5kIGhvc3RuYW1lLlxuICAgICAqIElmIGVpdGhlciBvbmUgY2FuIG5vdCBiZSB2ZXJpZmllZCwgYSBUTFMgY29ubmVjdGlvbiB3aWxsIG5vdCBiZSBlc3RhYmxpc2hlZC5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IGlzIGBGYWxzZWAuXG4gICAgICovXG4gICAgJ286c2tpcC12ZXJpZmljYXRpb24nPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIEEgdmFsaWQgSlNPTi1lbmNvZGVkIGRpY3Rpb25hcnksIHdoZXJlIGtleSBpcyBhIHBsYWluIHJlY2lwaWVudCBhZGRyZXNzIGFuZCB2YWx1ZSBpcyBhIGRpY3Rpb25hcnkgd2l0aCB2YXJpYWJsZXMgdGhhdCBjYW4gYmUgcmVmZXJlbmNlZCBpbiB0aGUgbWVzc2FnZSBib2R5LiBTZWUgW0JhdGNoIFNlbmRpbmddKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCNiYXRjaC1zZW5kaW5nKSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICAncmVjaXBpZW50LXZhcmlhYmxlcyc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBoOicgcHJlZml4IGZvbGxvd2VkIGJ5IGFuIGFyYml0cmFyeSB2YWx1ZSBhbGxvd3MgdG8gYXBwZW5kIGEgY3VzdG9tIE1JTUUgaGVhZGVyXG4gICAgICogdG8gdGhlIG1lc3NhZ2UgKCdYLU15LUhlYWRlcicgaW4gdGhpcyBjYXNlKS5cbiAgICAgKiBGb3IgZXhhbXBsZSwgYGg6UmVwbHktVG9gIHRvIHNwZWNpZnkgUmVwbHktVG8gYWRkcmVzcy5cbiAgICAgKi9cbiAgICAnaDpYLU15LUhlYWRlcic/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBgdjpgIHByZWZpeCBmb2xsb3dlZCBieSBhbiBhcmJpdHJhcnkgbmFtZSBhbGxvd3MgdG8gYXR0YWNoIGEgY3VzdG9tIEpTT04gZGF0YSB0byB0aGUgbWVzc2FnZS4gU2VlIFtBdHRhY2hpbmcgRGF0YSB0byBNZXNzYWdlc10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI21hbnVhbC1jdXN0b21kYXRhKSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICAndjpteS12YXInPzogc3RyaW5nO1xuXG4gICAgW2tleTogc3RyaW5nXTogRm9ybURhdGFJbnB1dFZhbHVlO1xufVxuXG5leHBvcnQgdHlwZSBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VzU2VuZFJlc3VsdCA9IHtcbiAgICBpZD86IHN0cmluZyxcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGRldGFpbHM/OiBzdHJpbmc7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL01lc3NhZ2VzJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgUm91dGUgPSB7XG4gICAgYWN0aW9uczogc3RyaW5nW107XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgZXhwcmVzc2lvbjogc3RyaW5nO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcHJpb3JpdHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlUm91dGVSZXNwb25zZSA9IFJvdXRlICYge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRGVzdHJveVJvdXRlUmVzcG9uc2UgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSA9IHtcbiAgICBwcmlvcml0eT86IG51bWJlcjtcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBleHByZXNzaW9uOiBzdHJpbmc7XG4gICAgYWN0aW9uOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IHR5cGUgUm91dGVzTGlzdFF1ZXJ5ID0ge1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHNraXA/OiBudW1iZXI7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1JvdXRlcyc7XG4iLCJleHBvcnQgdHlwZSBTdGF0ID0ge1xuICB0aW1lOiBzdHJpbmcgfCBEYXRlLFxuICBkZWxpdmVyZWQ6IHtcbiAgICBzbXRwOiBudW1iZXIsXG4gICAgaHR0cDogbnVtYmVyLFxuICAgIHRvdGFsOiBudW1iZXJcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBTdGF0c09wdGlvbnMgPSB7XG4gIHN0YXJ0OiBzdHJpbmcgfCBEYXRlO1xuICBlbmQ6IHN0cmluZyB8IERhdGU7XG4gIHJlc29sdXRpb246IHN0cmluZztcbiAgc3RhdHM6IFN0YXRbXTtcbn1cblxuZXhwb3J0IHR5cGUgU3RhdHNFdmVudCA9ICdhY2NlcHRlZCcgfCAnZGVsaXZlcmVkJyB8ICdvcGVuZWQnIHwgJ2NsaWNrZWQnIHwgJ3Vuc3Vic2NyaWJlZCcgfCAnc3RvcmVkJyB8ICdjb21wbGFpbmVkJyB8ICdmYWlsZWQnO1xuXG5leHBvcnQgdHlwZSBTdGF0c1F1ZXJ5ID0ge1xuICBldmVudDogU3RhdHNFdmVudCB8IFN0YXRzRXZlbnRbXTtcbiAgc3RhcnQ/OiBzdHJpbmcgfCBEYXRlO1xuICBlbmQ/OiBzdHJpbmcgfCBEYXRlO1xuICByZXNvbHV0aW9uPzogJ2hvdXInfCAnZGF5JyB8ICdtb250aCc7XG4gIGR1cmF0aW9uPzogc3RyaW5nO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9TdGF0cyc7XG4iLCJleHBvcnQgdHlwZSBTdWJhY2NvdW50c1F1ZXJ5ID0ge1xuICBlbmFibGVkPzogYm9vbGVhbjtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHNraXA/OiBudW1iZXI7XG4gIHNvcnQ/OiAnYXNjJyB8ICdkZXNjJztcbn1cblxuZXhwb3J0IHR5cGUgU3ViYWNjb3VudExpc3RJdGVtID0ge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHN0YXR1czogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBTdWJhY2NvdW50TGlzdFJlc3BvbnNlRGF0YSA9IHtcbiAgc3ViYWNjb3VudHM6IFN1YmFjY291bnRMaXN0SXRlbVtdO1xuICB0b3RhbDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdWJhY2NvdW50UmVzcG9uc2VEYXRhID0ge1xuICBzdWJhY2NvdW50OiBTdWJhY2NvdW50TGlzdEl0ZW1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vU3ViYWNjb3VudHMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBCb3VuY2VEYXRhID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBDb21wbGFpbnREYXRhID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuIiwiaW1wb3J0IHtcbiAgQm91bmNlRGF0YSxcbiAgQ29tcGxhaW50RGF0YSxcbiAgVW5zdWJzY3JpYmVEYXRhLFxuICBXaGl0ZUxpc3REYXRhXG59IGZyb20gJy4nO1xuaW1wb3J0IHtcbiAgSUJvdW5jZSwgSUNvbXBsYWludCwgSVVuc3Vic2NyaWJlLCBJV2hpdGVMaXN0XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkxpc3QgPSB7XG4gIGl0ZW1zOiAoSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0KVtdO1xuICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25MaXN0UXVlcnkgPSB7XG4gIGxpbWl0PzogbnVtYmVyO1xuICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkRhdGFUeXBlID0gQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhO1xuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSA9IHtcbiAgYm9keToge1xuICAgIGl0ZW1zOiBCb3VuY2VEYXRhW10gfCBDb21wbGFpbnREYXRhW10gfCBVbnN1YnNjcmliZURhdGFbXSB8IFdoaXRlTGlzdERhdGFbXTtcbiAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25SZXNwb25zZSA9IHtcbiAgYm9keTogU3VwcHJlc3Npb25EYXRhVHlwZTtcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHZhbHVlPzogc3RyaW5nO1xuICAgIGFkZHJlc3M/OiBzdHJpbmc7XG4gIH1cbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdCA9IHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSA9IHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjb2RlPzogbnVtYmVyO1xuICBlcnJvcj86IHN0cmluZztcbiAgZG9tYWluPzogc3RyaW5nO1xuICB0YWc/OiBzdHJpbmc7IC8vIHdvcmtzIG9ubHkgd2l0aCBGb3JtRGF0YSB1c2FnZSBmb3Igb25lIHVuc3Vic2NyaWJlXG4gIGNyZWF0ZWRfYXQ/OiBzdHJpbmcgO1xuICB0YWdzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSA9IHtcbiAgYm9keTp7XG4gICAgbWVzc2FnZTpzdHJpbmc7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCA9IHtcbiAgbWVzc2FnZTpzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIFVuc3Vic2NyaWJlRGF0YSA9IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgdGFnczogYW55O1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG4iLCJleHBvcnQgdHlwZSBXaGl0ZUxpc3REYXRhID0ge1xuICAgIHR5cGU6IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIHJlYXNvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vQm91bmNlJztcbmV4cG9ydCAqIGZyb20gJy4vQ29tcGxhaW50JztcbmV4cG9ydCAqIGZyb20gJy4vU3VwcHJlc3Npb25zJztcbmV4cG9ydCAqIGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuZXhwb3J0ICogZnJvbSAnLi9XaGl0ZUxpc3QnO1xuIiwiaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuaW1wb3J0IHsgQ3VzdG9tRmlsZSwgQ3VzdG9tRmlsZURhdGEgfSBmcm9tICcuLi9NZXNzYWdlcyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uSm9iRGF0YSA9IHtcbiAgICBjcmVhdGVkX2F0OiBudW1iZXI7XG4gICAgaWQ6IHN0cmluZztcbiAgICBxdWFudGl0eTogbnVtYmVyO1xuICAgIHJlY29yZHNfcHJvY2Vzc2VkOiBudW1iZXIgfCBudWxsO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIGRvd25sb2FkX3VybD86IHtcbiAgICAgICAgY3N2OiBzdHJpbmc7XG4gICAgICAgIGpzb246IHN0cmluZztcbiAgICB9O1xuICAgIHN1bW1hcnk/OiB7XG4gICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgY2F0Y2hfYWxsOiBudW1iZXI7XG4gICAgICAgICAgICBkZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgICAgZG9fbm90X3NlbmQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgICAgfTtcbiAgICAgICAgcmlzazoge1xuICAgICAgICAgICAgaGlnaDogbnVtYmVyO1xuICAgICAgICAgICAgbG93OiBudW1iZXI7XG4gICAgICAgICAgICBtZWRpdW06IG51bWJlcjtcbiAgICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0ID0ge1xuICAgIGNyZWF0ZWRBdDogRGF0ZTtcbiAgICBpZDogc3RyaW5nO1xuICAgIHF1YW50aXR5OiBudW1iZXI7XG4gICAgcmVjb3Jkc1Byb2Nlc3NlZDogbnVtYmVyIHwgbnVsbDtcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgICByZXNwb25zZVN0YXR1c0NvZGU6IG51bWJlcjsgLy8gaHR0cCByZXNwb25zZSBzdGF0dXMgY29kZVxuICAgIGRvd25sb2FkVXJsPzoge1xuICAgICAgICBjc3Y6IHN0cmluZztcbiAgICAgICAganNvbjogc3RyaW5nO1xuICAgIH07XG4gICAgc3VtbWFyeT86IHtcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICBjYXRjaEFsbDogbnVtYmVyO1xuICAgICAgICAgICAgZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICAgIGRvTm90U2VuZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5kZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgICB9O1xuICAgICAgICByaXNrOiB7XG4gICAgICAgICAgICBoaWdoOiBudW1iZXI7XG4gICAgICAgICAgICBsb3c6IG51bWJlcjtcbiAgICAgICAgICAgIG1lZGl1bTogbnVtYmVyO1xuICAgICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iID0ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhID0ge1xuICAgIGZpbGU6IEN1c3RvbUZpbGVEYXRhIHwgQ3VzdG9tRmlsZVxufVxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhVXBkYXRlZCA9IHtcbiAgICBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBDdXN0b21GaWxlRGF0YSB8IEN1c3RvbUZpbGU7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0ID0ge1xuICAgIGpvYnM6IE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdFtdO1xuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG4gICAgdG90YWw6IG51bWJlcjtcbiAgICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeSA9IHtcbiAgICBsaW1pdDogbnVtYmVyO1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgICAgICAgam9iczogTXVsdGlwbGVWYWxpZGF0aW9uSm9iRGF0YVtdO1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH1cbn1cbmV4cG9ydCB0eXBlIENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iID0ge1xuICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgIHN0YXR1czogbnVtYmVyO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmV4cG9ydCB0eXBlIFZhbGlkYXRpb25RdWVyeSA9IHtcbiAgYWRkcmVzczogc3RyaW5nO1xufVxuZXhwb3J0IHR5cGUgVmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBpc19kaXNwb3NhYmxlX2FkZHJlc3M6IGJvb2xlYW47XG4gIGlzX3JvbGVfYWRkcmVzczogYm9vbGVhbjtcbiAgcmVhc29uOiBzdHJpbmdbXTtcbiAgcmVzdWx0OiBzdHJpbmc7XG4gIHJpc2s6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgVmFsaWRhdGlvblJlc3BvbnNlID0ge1xuICBzdGF0dXM6IG51bWJlcjtcbiAgYm9keTogVmFsaWRhdGlvblJlc3VsdDtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTXVsdGlwbGVWYWxpZGF0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vVmFsaWRhdGlvbic7XG4iLCJleHBvcnQgdHlwZSBBUElXZWJob29rID0ge1xuICAgIHVybD86IHN0cmluZ1xuICAgIHVybHM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va1Jlc3BvbnNlQm9keSA9IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgd2ViaG9vazogQVBJV2ViaG9vaztcbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va1Jlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IFdlYmhvb2tSZXNwb25zZUJvZHk7XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tMaXN0ID0ge1xuICAgIFtpZDogc3RyaW5nXToge1xuICAgICAgICB1cmxzOiBzdHJpbmdbXVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va3NRdWVyeSA9IHtcbiAgICBsaW1pdD86IG51bWJlcjtcbiAgICBza2lwPzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlID0ge1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tSZXN1bHQgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1cmwgcHJvcGVydHkgaXMgZGVwcmVjYXRlZC4gVXNlIFwidXJsc1wiIGluc3RlYWQuXG4gICAqL1xuICB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgdXJsczogc3RyaW5nW107XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1dlYmhvb2tzJztcbiIsImV4cG9ydCAqIGZyb20gJy4vQ29tbW9uJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWlucyc7XG5leHBvcnQgKiBmcm9tICcuL0V2ZW50cyc7XG5leHBvcnQgKiBmcm9tICcuL0lQUG9vbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9JUHMnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsZ3VuQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzJztcbmV4cG9ydCAqIGZyb20gJy4vTWVzc2FnZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Sb3V0ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdGF0cyc7XG5leHBvcnQgKiBmcm9tICcuL1N1YmFjY291bnRzJztcbmV4cG9ydCAqIGZyb20gJy4vU3VwcHJlc3Npb25zJztcbmV4cG9ydCAqIGZyb20gJy4vVmFsaWRhdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9XZWJob29rcyc7XG4iLCJpbXBvcnQgTWFpbGd1bkNsaWVudCBmcm9tICcuL0NsYXNzZXMvTWFpbGd1bkNsaWVudCc7XG5pbXBvcnQgeyBJTWFpbGd1bkNsaWVudCB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhLCBNYWlsZ3VuQ2xpZW50T3B0aW9ucyB9IGZyb20gJy4vVHlwZXMnO1xuXG5leHBvcnQgKiBhcyBFbnVtcyBmcm9tICcuL0VudW1zJztcbmV4cG9ydCAqIGZyb20gJy4vVHlwZXMnO1xuZXhwb3J0ICogYXMgSW50ZXJmYWNlcyBmcm9tICcuL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsZ3VuIHtcbiAgc3RhdGljIGdldCBkZWZhdWx0KCk6IHR5cGVvZiBNYWlsZ3VuIHsgcmV0dXJuIHRoaXM7IH1cbiAgcHJpdmF0ZSBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YVxuXG4gIGNvbnN0cnVjdG9yKEZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy5mb3JtRGF0YSA9IEZvcm1EYXRhO1xuICB9XG5cbiAgY2xpZW50KG9wdGlvbnM6IE1haWxndW5DbGllbnRPcHRpb25zKSA6IElNYWlsZ3VuQ2xpZW50IHtcbiAgICByZXR1cm4gbmV3IE1haWxndW5DbGllbnQob3B0aW9ucywgdGhpcy5mb3JtRGF0YSk7XG4gIH1cbn1cbiIsIi8qISBodHRwczovL210aHMuYmUvYmFzZTY0IHYxLjAuMCBieSBAbWF0aGlhcyB8IE1JVCBsaWNlbnNlICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgLlxuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLlxuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0bW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsIGFuZCB1c2Vcblx0Ly8gaXQgYXMgYHJvb3RgLlxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fTtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cblx0dmFyIGVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdC8vIE5vdGU6IHRoZSBlcnJvciBtZXNzYWdlcyB1c2VkIHRocm91Z2hvdXQgdGhpcyBmaWxlIG1hdGNoIHRob3NlIHVzZWQgYnlcblx0XHQvLyB0aGUgbmF0aXZlIGBhdG9iYC9gYnRvYWAgaW1wbGVtZW50YXRpb24gaW4gQ2hyb21pdW0uXG5cdFx0dGhyb3cgbmV3IEludmFsaWRDaGFyYWN0ZXJFcnJvcihtZXNzYWdlKTtcblx0fTtcblxuXHR2YXIgVEFCTEUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cdC8vIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvY29tbW9uLW1pY3Jvc3ludGF4ZXMuaHRtbCNzcGFjZS1jaGFyYWN0ZXJcblx0dmFyIFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMgPSAvW1xcdFxcblxcZlxcciBdL2c7XG5cblx0Ly8gYGRlY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBhdG9iYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQuIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYXRvYlxuXHQvLyBUaGUgb3B0aW1pemVkIGJhc2U2NC1kZWNvZGluZyBhbGdvcml0aG0gdXNlZCBpcyBiYXNlZCBvbiBAYXRr4oCZcyBleGNlbGxlbnRcblx0Ly8gaW1wbGVtZW50YXRpb24uIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2F0ay8xMDIwMzk2XG5cdHZhciBkZWNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KVxuXHRcdFx0LnJlcGxhY2UoUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUywgJycpO1xuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0aWYgKGxlbmd0aCAlIDQgPT0gMCkge1xuXHRcdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKC89PT8kLywgJycpO1xuXHRcdFx0bGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRsZW5ndGggJSA0ID09IDEgfHxcblx0XHRcdC8vIGh0dHA6Ly93aGF0d2cub3JnL0MjYWxwaGFudW1lcmljLWFzY2lpLWNoYXJhY3RlcnNcblx0XHRcdC9bXithLXpBLVowLTkvXS8udGVzdChpbnB1dClcblx0XHQpIHtcblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnSW52YWxpZCBjaGFyYWN0ZXI6IHRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIGJpdENvdW50ZXIgPSAwO1xuXHRcdHZhciBiaXRTdG9yYWdlO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHRidWZmZXIgPSBUQUJMRS5pbmRleE9mKGlucHV0LmNoYXJBdChwb3NpdGlvbikpO1xuXHRcdFx0Yml0U3RvcmFnZSA9IGJpdENvdW50ZXIgJSA0ID8gYml0U3RvcmFnZSAqIDY0ICsgYnVmZmVyIDogYnVmZmVyO1xuXHRcdFx0Ly8gVW5sZXNzIHRoaXMgaXMgdGhlIGZpcnN0IG9mIGEgZ3JvdXAgb2YgNCBjaGFyYWN0ZXJz4oCmXG5cdFx0XHRpZiAoYml0Q291bnRlcisrICUgNCkge1xuXHRcdFx0XHQvLyDigKZjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gYSBzaW5nbGUgQVNDSUkgY2hhcmFjdGVyLlxuXHRcdFx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0XHRcdFx0XHQweEZGICYgYml0U3RvcmFnZSA+PiAoLTIgKiBiaXRDb3VudGVyICYgNilcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHQvLyBgZW5jb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGJ0b2FgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZDogaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1idG9hXG5cdHZhciBlbmNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KTtcblx0XHRpZiAoL1teXFwwLVxceEZGXS8udGVzdChpbnB1dCkpIHtcblx0XHRcdC8vIE5vdGU6IG5vIG5lZWQgdG8gc3BlY2lhbC1jYXNlIGFzdHJhbCBzeW1ib2xzIGhlcmUsIGFzIHN1cnJvZ2F0ZXMgYXJlXG5cdFx0XHQvLyBtYXRjaGVkLCBhbmQgdGhlIGlucHV0IGlzIHN1cHBvc2VkIHRvIG9ubHkgY29udGFpbiBBU0NJSSBhbnl3YXkuXG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J1RoZSBzdHJpbmcgdG8gYmUgZW5jb2RlZCBjb250YWlucyBjaGFyYWN0ZXJzIG91dHNpZGUgb2YgdGhlICcgK1xuXHRcdFx0XHQnTGF0aW4xIHJhbmdlLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBwYWRkaW5nID0gaW5wdXQubGVuZ3RoICUgMztcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0dmFyIGE7XG5cdFx0dmFyIGI7XG5cdFx0dmFyIGM7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHQvLyBNYWtlIHN1cmUgYW55IHBhZGRpbmcgaXMgaGFuZGxlZCBvdXRzaWRlIG9mIHRoZSBsb29wLlxuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGggLSBwYWRkaW5nO1xuXG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdC8vIFJlYWQgdGhyZWUgYnl0ZXMsIGkuZS4gMjQgYml0cy5cblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCAxNjtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pIDw8IDg7XG5cdFx0XHRjID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiICsgYztcblx0XHRcdC8vIFR1cm4gdGhlIDI0IGJpdHMgaW50byBmb3VyIGNodW5rcyBvZiA2IGJpdHMgZWFjaCwgYW5kIGFwcGVuZCB0aGVcblx0XHRcdC8vIG1hdGNoaW5nIGNoYXJhY3RlciBmb3IgZWFjaCBvZiB0aGVtIHRvIHRoZSBvdXRwdXQuXG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDE4ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEyICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDYgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgJiAweDNGKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAocGFkZGluZyA9PSAyKSB7XG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgODtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGI7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEwKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyID4+IDQpICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCAyKSAmIDB4M0YpICtcblx0XHRcdFx0Jz0nXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAocGFkZGluZyA9PSAxKSB7XG5cdFx0XHRidWZmZXIgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCA0KSAmIDB4M0YpICtcblx0XHRcdFx0Jz09J1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdHZhciBiYXNlNjQgPSB7XG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCd2ZXJzaW9uJzogJzEuMC4wJ1xuXHR9O1xuXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGJhc2U2NDtcblx0XHR9KTtcblx0fVx0ZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG5cdFx0aWYgKGZyZWVNb2R1bGUpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IGJhc2U2NDtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGJhc2U2NCkge1xuXHRcdFx0XHRiYXNlNjQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IGJhc2U2NFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LmJhc2U2NCA9IGJhc2U2NDtcblx0fVxuXG59KHRoaXMpKTtcbiIsIihmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShkZWZpbml0aW9uKTtcbiAgZWxzZSBjb250ZXh0W25hbWVdID0gZGVmaW5pdGlvbigpO1xufSkoJ3VybGpvaW4nLCB0aGlzLCBmdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplIChzdHJBcnJheSkge1xuICAgIHZhciByZXN1bHRBcnJheSA9IFtdO1xuICAgIGlmIChzdHJBcnJheS5sZW5ndGggPT09IDApIHsgcmV0dXJuICcnOyB9XG5cbiAgICBpZiAodHlwZW9mIHN0ckFycmF5WzBdICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVXJsIG11c3QgYmUgYSBzdHJpbmcuIFJlY2VpdmVkICcgKyBzdHJBcnJheVswXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGZpcnN0IHBhcnQgaXMgYSBwbGFpbiBwcm90b2NvbCwgd2UgY29tYmluZSBpdCB3aXRoIHRoZSBuZXh0IHBhcnQuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eW14vOl0rOlxcLyokLykgJiYgc3RyQXJyYXkubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGZpcnN0ID0gc3RyQXJyYXkuc2hpZnQoKTtcbiAgICAgIHN0ckFycmF5WzBdID0gZmlyc3QgKyBzdHJBcnJheVswXTtcbiAgICB9XG5cbiAgICAvLyBUaGVyZSBtdXN0IGJlIHR3byBvciB0aHJlZSBzbGFzaGVzIGluIHRoZSBmaWxlIHByb3RvY29sLCB0d28gc2xhc2hlcyBpbiBhbnl0aGluZyBlbHNlLlxuICAgIGlmIChzdHJBcnJheVswXS5tYXRjaCgvXmZpbGU6XFwvXFwvXFwvLykpIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8vJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8nKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gc3RyQXJyYXlbaV07XG5cbiAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIGNvbXBvbmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wb25lbnQgPT09ICcnKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgc3RhcnRpbmcgc2xhc2hlcyBmb3IgZWFjaCBjb21wb25lbnQgYnV0IHRoZSBmaXJzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL15bXFwvXSsvLCAnJyk7XG4gICAgICB9XG4gICAgICBpZiAoaSA8IHN0ckFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGVuZGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGxhc3QuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIHRoZSBsYXN0IGNvbXBvbmVudCB3ZSB3aWxsIGNvbWJpbmUgbXVsdGlwbGUgc2xhc2hlcyB0byBhIHNpbmdsZSBvbmUuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJy8nKTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0QXJyYXkucHVzaChjb21wb25lbnQpO1xuXG4gICAgfVxuXG4gICAgdmFyIHN0ciA9IHJlc3VsdEFycmF5LmpvaW4oJy8nKTtcbiAgICAvLyBFYWNoIGlucHV0IGNvbXBvbmVudCBpcyBub3cgc2VwYXJhdGVkIGJ5IGEgc2luZ2xlIHNsYXNoIGV4Y2VwdCB0aGUgcG9zc2libGUgZmlyc3QgcGxhaW4gcHJvdG9jb2wgcGFydC5cblxuICAgIC8vIHJlbW92ZSB0cmFpbGluZyBzbGFzaCBiZWZvcmUgcGFyYW1ldGVycyBvciBoYXNoXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcLyhcXD98JnwjW14hXSkvZywgJyQxJyk7XG5cbiAgICAvLyByZXBsYWNlID8gaW4gcGFyYW1ldGVycyB3aXRoICZcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJz8nKTtcbiAgICBzdHIgPSBwYXJ0cy5zaGlmdCgpICsgKHBhcnRzLmxlbmd0aCA+IDAgPyAnPyc6ICcnKSArIHBhcnRzLmpvaW4oJyYnKTtcblxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnB1dDtcblxuICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgaW5wdXQgPSBhcmd1bWVudHNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0ID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBub3JtYWxpemUoaW5wdXQpO1xuICB9O1xuXG59KTtcbiIsIi8vIEF4aW9zIHYxLjcuNCBDb3B5cmlnaHQgKGMpIDIwMjQgTWF0dCBaYWJyaXNraWUgYW5kIGNvbnRyaWJ1dG9yc1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5jb25zdCB7dG9TdHJpbmd9ID0gT2JqZWN0LnByb3RvdHlwZTtcbmNvbnN0IHtnZXRQcm90b3R5cGVPZn0gPSBPYmplY3Q7XG5cbmNvbnN0IGtpbmRPZiA9IChjYWNoZSA9PiB0aGluZyA9PiB7XG4gICAgY29uc3Qgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmNvbnN0IGtpbmRPZlRlc3QgPSAodHlwZSkgPT4ge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKHRoaW5nKSA9PiBraW5kT2YodGhpbmcpID09PSB0eXBlXG59O1xuXG5jb25zdCB0eXBlT2ZUZXN0ID0gdHlwZSA9PiB0aGluZyA9PiB0eXBlb2YgdGhpbmcgPT09IHR5cGU7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCB7aXNBcnJheX0gPSBBcnJheTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VuZGVmaW5lZCA9IHR5cGVPZlRlc3QoJ3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIGlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKSAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0FycmF5QnVmZmVyID0ga2luZE9mVGVzdCgnQXJyYXlCdWZmZXInKTtcblxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIGxldCByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKGlzQXJyYXlCdWZmZXIodmFsLmJ1ZmZlcikpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJpbmcgPSB0eXBlT2ZUZXN0KCdzdHJpbmcnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Z1bmN0aW9uID0gdHlwZU9mVGVzdCgnZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc051bWJlciA9IHR5cGVPZlRlc3QoJ251bWJlcicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgIT09IG51bGwgJiYgdHlwZW9mIHRoaW5nID09PSAnb2JqZWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJvb2xlYW5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJvb2xlYW4sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jvb2xlYW4gPSB0aGluZyA9PiB0aGluZyA9PT0gdHJ1ZSB8fCB0aGluZyA9PT0gZmFsc2U7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgaWYgKGtpbmRPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiAocHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKSA9PT0gbnVsbCkgJiYgIShTeW1ib2wudG9TdHJpbmdUYWcgaW4gdmFsKSAmJiAhKFN5bWJvbC5pdGVyYXRvciBpbiB2YWwpO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRGF0ZSA9IGtpbmRPZlRlc3QoJ0RhdGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZSA9IGtpbmRPZlRlc3QoJ0ZpbGUnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGVMaXN0ID0ga2luZE9mVGVzdCgnRmlsZUxpc3QnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmVhbSA9ICh2YWwpID0+IGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRm9ybURhdGEgPSAodGhpbmcpID0+IHtcbiAgbGV0IGtpbmQ7XG4gIHJldHVybiB0aGluZyAmJiAoXG4gICAgKHR5cGVvZiBGb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGluZyBpbnN0YW5jZW9mIEZvcm1EYXRhKSB8fCAoXG4gICAgICBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiYgKFxuICAgICAgICAoa2luZCA9IGtpbmRPZih0aGluZykpID09PSAnZm9ybWRhdGEnIHx8XG4gICAgICAgIC8vIGRldGVjdCBmb3JtLWRhdGEgaW5zdGFuY2VcbiAgICAgICAgKGtpbmQgPT09ICdvYmplY3QnICYmIGlzRnVuY3Rpb24odGhpbmcudG9TdHJpbmcpICYmIHRoaW5nLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IEZvcm1EYXRhXScpXG4gICAgICApXG4gICAgKVxuICApXG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVUkxTZWFyY2hQYXJhbXMgPSBraW5kT2ZUZXN0KCdVUkxTZWFyY2hQYXJhbXMnKTtcblxuY29uc3QgW2lzUmVhZGFibGVTdHJlYW0sIGlzUmVxdWVzdCwgaXNSZXNwb25zZSwgaXNIZWFkZXJzXSA9IFsnUmVhZGFibGVTdHJlYW0nLCAnUmVxdWVzdCcsICdSZXNwb25zZScsICdIZWFkZXJzJ10ubWFwKGtpbmRPZlRlc3QpO1xuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5jb25zdCB0cmltID0gKHN0cikgPT4gc3RyLnRyaW0gP1xuICBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzID0gZmFsc2VdXG4gKiBAcmV0dXJucyB7YW55fVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4sIHthbGxPd25LZXlzID0gZmFsc2V9ID0ge30pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgaTtcbiAgbGV0IGw7XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGNvbnN0IGtleXMgPSBhbGxPd25LZXlzID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKSA6IE9iamVjdC5rZXlzKG9iaik7XG4gICAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGtleTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEtleShvYmosIGtleSkge1xuICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gIGxldCBfa2V5O1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIF9rZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgPT09IF9rZXkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIF9rZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5jb25zdCBfZ2xvYmFsID0gKCgpID0+IHtcbiAgLyplc2xpbnQgbm8tdW5kZWY6MCovXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpXG59KSgpO1xuXG5jb25zdCBpc0NvbnRleHREZWZpbmVkID0gKGNvbnRleHQpID0+ICFpc1VuZGVmaW5lZChjb250ZXh0KSAmJiBjb250ZXh0ICE9PSBfZ2xvYmFsO1xuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIGNvbnN0IHtjYXNlbGVzc30gPSBpc0NvbnRleHREZWZpbmVkKHRoaXMpICYmIHRoaXMgfHwge307XG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xuICBjb25zdCBhc3NpZ25WYWx1ZSA9ICh2YWwsIGtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEtleSA9IGNhc2VsZXNzICYmIGZpbmRLZXkocmVzdWx0LCBrZXkpIHx8IGtleTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRbdGFyZ2V0S2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHJlc3VsdFt0YXJnZXRLZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbdGFyZ2V0S2V5XSA9IHZhbDtcbiAgICB9XG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgYXJndW1lbnRzW2ldICYmIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FsbE93bktleXNdXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmNvbnN0IGV4dGVuZCA9IChhLCBiLCB0aGlzQXJnLCB7YWxsT3duS2V5c309IHt9KSA9PiB7XG4gIGZvckVhY2goYiwgKHZhbCwga2V5KSA9PiB7XG4gICAgaWYgKHRoaXNBcmcgJiYgaXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0sIHthbGxPd25LZXlzfSk7XG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvbnRlbnQgdmFsdWUgd2l0aG91dCBCT01cbiAqL1xuY29uc3Qgc3RyaXBCT00gPSAoY29udGVudCkgPT4ge1xuICBpZiAoY29udGVudC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gY29udGVudDtcbn07XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGluaGVyaXRzID0gKGNvbnN0cnVjdG9yLCBzdXBlckNvbnN0cnVjdG9yLCBwcm9wcywgZGVzY3JpcHRvcnMpID0+IHtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpO1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCAnc3VwZXInLCB7XG4gICAgdmFsdWU6IHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlXG4gIH0pO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlIG9iamVjdCB3aXRoIGRlZXAgcHJvdG90eXBlIGNoYWluIHRvIGEgZmxhdCBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2VPYmogc291cmNlIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IFtkZXN0T2JqXVxuICogQHBhcmFtIHtGdW5jdGlvbnxCb29sZWFufSBbZmlsdGVyXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Byb3BGaWx0ZXJdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuY29uc3QgdG9GbGF0T2JqZWN0ID0gKHNvdXJjZU9iaiwgZGVzdE9iaiwgZmlsdGVyLCBwcm9wRmlsdGVyKSA9PiB7XG4gIGxldCBwcm9wcztcbiAgbGV0IGk7XG4gIGxldCBwcm9wO1xuICBjb25zdCBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIGlmIChzb3VyY2VPYmogPT0gbnVsbCkgcmV0dXJuIGRlc3RPYmo7XG5cbiAgZG8ge1xuICAgIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlT2JqKTtcbiAgICBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICBwcm9wID0gcHJvcHNbaV07XG4gICAgICBpZiAoKCFwcm9wRmlsdGVyIHx8IHByb3BGaWx0ZXIocHJvcCwgc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgIW1lcmdlZFtwcm9wXSkge1xuICAgICAgICBkZXN0T2JqW3Byb3BdID0gc291cmNlT2JqW3Byb3BdO1xuICAgICAgICBtZXJnZWRbcHJvcF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBzb3VyY2VPYmogPSBmaWx0ZXIgIT09IGZhbHNlICYmIGdldFByb3RvdHlwZU9mKHNvdXJjZU9iaik7XG4gIH0gd2hpbGUgKHNvdXJjZU9iaiAmJiAoIWZpbHRlciB8fCBmaWx0ZXIoc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgc291cmNlT2JqICE9PSBPYmplY3QucHJvdG90eXBlKTtcblxuICByZXR1cm4gZGVzdE9iajtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgc3RyaW5nIGVuZHMgd2l0aCB0aGUgY2hhcmFjdGVycyBvZiBhIHNwZWNpZmllZCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gW3Bvc2l0aW9uPSAwXVxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBlbmRzV2l0aCA9IChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pID0+IHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICBjb25zdCBsYXN0SW5kZXggPSBzdHIuaW5kZXhPZihzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKTtcbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gLTEgJiYgbGFzdEluZGV4ID09PSBwb3NpdGlvbjtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0IG9yIG51bGwgaWYgZmFpbGVkXG4gKlxuICogQHBhcmFtIHsqfSBbdGhpbmddXG4gKlxuICogQHJldHVybnMgez9BcnJheX1cbiAqL1xuY29uc3QgdG9BcnJheSA9ICh0aGluZykgPT4ge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgaWYgKGlzQXJyYXkodGhpbmcpKSByZXR1cm4gdGhpbmc7XG4gIGxldCBpID0gdGhpbmcubGVuZ3RoO1xuICBpZiAoIWlzTnVtYmVyKGkpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgYXJyID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGFycltpXSA9IHRoaW5nW2ldO1xuICB9XG4gIHJldHVybiBhcnI7XG59O1xuXG4vKipcbiAqIENoZWNraW5nIGlmIHRoZSBVaW50OEFycmF5IGV4aXN0cyBhbmQgaWYgaXQgZG9lcywgaXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZVxuICogdGhpbmcgcGFzc2VkIGluIGlzIGFuIGluc3RhbmNlIG9mIFVpbnQ4QXJyYXlcbiAqXG4gKiBAcGFyYW0ge1R5cGVkQXJyYXl9XG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuY29uc3QgaXNUeXBlZEFycmF5ID0gKFR5cGVkQXJyYXkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gdGhpbmcgPT4ge1xuICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgfTtcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBnZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSk7XG5cbi8qKlxuICogRm9yIGVhY2ggZW50cnkgaW4gdGhlIG9iamVjdCwgY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCB0aGUga2V5IGFuZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBlbnRyeS5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgZm9yRWFjaEVudHJ5ID0gKG9iaiwgZm4pID0+IHtcbiAgY29uc3QgZ2VuZXJhdG9yID0gb2JqICYmIG9ialtTeW1ib2wuaXRlcmF0b3JdO1xuXG4gIGNvbnN0IGl0ZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwob2JqKTtcblxuICBsZXQgcmVzdWx0O1xuXG4gIHdoaWxlICgocmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpKSAmJiAhcmVzdWx0LmRvbmUpIHtcbiAgICBjb25zdCBwYWlyID0gcmVzdWx0LnZhbHVlO1xuICAgIGZuLmNhbGwob2JqLCBwYWlyWzBdLCBwYWlyWzFdKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhbmQgYSBzdHJpbmcsIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIGFsbCB0aGUgbWF0Y2hlc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWdFeHAgLSBUaGUgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIGFnYWluc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBzZWFyY2guXG4gKlxuICogQHJldHVybnMge0FycmF5PGJvb2xlYW4+fVxuICovXG5jb25zdCBtYXRjaEFsbCA9IChyZWdFeHAsIHN0cikgPT4ge1xuICBsZXQgbWF0Y2hlcztcbiAgY29uc3QgYXJyID0gW107XG5cbiAgd2hpbGUgKChtYXRjaGVzID0gcmVnRXhwLmV4ZWMoc3RyKSkgIT09IG51bGwpIHtcbiAgICBhcnIucHVzaChtYXRjaGVzKTtcbiAgfVxuXG4gIHJldHVybiBhcnI7XG59O1xuXG4vKiBDaGVja2luZyBpZiB0aGUga2luZE9mVGVzdCBmdW5jdGlvbiByZXR1cm5zIHRydWUgd2hlbiBwYXNzZWQgYW4gSFRNTEZvcm1FbGVtZW50LiAqL1xuY29uc3QgaXNIVE1MRm9ybSA9IGtpbmRPZlRlc3QoJ0hUTUxGb3JtRWxlbWVudCcpO1xuXG5jb25zdCB0b0NhbWVsQ2FzZSA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLV9cXHNdKFthLXpcXGRdKShcXHcqKS9nLFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VyKG0sIHAxLCBwMikge1xuICAgICAgcmV0dXJuIHAxLnRvVXBwZXJDYXNlKCkgKyBwMjtcbiAgICB9XG4gICk7XG59O1xuXG4vKiBDcmVhdGluZyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBjaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgcHJvcGVydHkuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9ICgoe2hhc093blByb3BlcnR5fSkgPT4gKG9iaiwgcHJvcCkgPT4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKShPYmplY3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUmVnRXhwID0ga2luZE9mVGVzdCgnUmVnRXhwJyk7XG5cbmNvbnN0IHJlZHVjZURlc2NyaXB0b3JzID0gKG9iaiwgcmVkdWNlcikgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaik7XG4gIGNvbnN0IHJlZHVjZWREZXNjcmlwdG9ycyA9IHt9O1xuXG4gIGZvckVhY2goZGVzY3JpcHRvcnMsIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgbGV0IHJldDtcbiAgICBpZiAoKHJldCA9IHJlZHVjZXIoZGVzY3JpcHRvciwgbmFtZSwgb2JqKSkgIT09IGZhbHNlKSB7XG4gICAgICByZWR1Y2VkRGVzY3JpcHRvcnNbbmFtZV0gPSByZXQgfHwgZGVzY3JpcHRvcjtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9iaiwgcmVkdWNlZERlc2NyaXB0b3JzKTtcbn07XG5cbi8qKlxuICogTWFrZXMgYWxsIG1ldGhvZHMgcmVhZC1vbmx5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuY29uc3QgZnJlZXplTWV0aG9kcyA9IChvYmopID0+IHtcbiAgcmVkdWNlRGVzY3JpcHRvcnMob2JqLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIC8vIHNraXAgcmVzdHJpY3RlZCBwcm9wcyBpbiBzdHJpY3QgbW9kZVxuICAgIGlmIChpc0Z1bmN0aW9uKG9iaikgJiYgWydhcmd1bWVudHMnLCAnY2FsbGVyJywgJ2NhbGxlZSddLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBvYmpbbmFtZV07XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm47XG5cbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTtcblxuICAgIGlmICgnd3JpdGFibGUnIGluIGRlc2NyaXB0b3IpIHtcbiAgICAgIGRlc2NyaXB0b3Iud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldCA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0NhbiBub3QgcmV3cml0ZSByZWFkLW9ubHkgbWV0aG9kIFxcJycgKyBuYW1lICsgJ1xcJycpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgdG9PYmplY3RTZXQgPSAoYXJyYXlPclN0cmluZywgZGVsaW1pdGVyKSA9PiB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuXG4gIGNvbnN0IGRlZmluZSA9IChhcnIpID0+IHtcbiAgICBhcnIuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBvYmpbdmFsdWVdID0gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcblxuICBpc0FycmF5KGFycmF5T3JTdHJpbmcpID8gZGVmaW5lKGFycmF5T3JTdHJpbmcpIDogZGVmaW5lKFN0cmluZyhhcnJheU9yU3RyaW5nKS5zcGxpdChkZWxpbWl0ZXIpKTtcblxuICByZXR1cm4gb2JqO1xufTtcblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5jb25zdCB0b0Zpbml0ZU51bWJlciA9ICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSA9PiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSA9ICt2YWx1ZSkgPyB2YWx1ZSA6IGRlZmF1bHRWYWx1ZTtcbn07XG5cbmNvbnN0IEFMUEhBID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6JztcblxuY29uc3QgRElHSVQgPSAnMDEyMzQ1Njc4OSc7XG5cbmNvbnN0IEFMUEhBQkVUID0ge1xuICBESUdJVCxcbiAgQUxQSEEsXG4gIEFMUEhBX0RJR0lUOiBBTFBIQSArIEFMUEhBLnRvVXBwZXJDYXNlKCkgKyBESUdJVFxufTtcblxuY29uc3QgZ2VuZXJhdGVTdHJpbmcgPSAoc2l6ZSA9IDE2LCBhbHBoYWJldCA9IEFMUEhBQkVULkFMUEhBX0RJR0lUKSA9PiB7XG4gIGxldCBzdHIgPSAnJztcbiAgY29uc3Qge2xlbmd0aH0gPSBhbHBoYWJldDtcbiAgd2hpbGUgKHNpemUtLSkge1xuICAgIHN0ciArPSBhbHBoYWJldFtNYXRoLnJhbmRvbSgpICogbGVuZ3RofDBdO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cbi8qKlxuICogSWYgdGhlIHRoaW5nIGlzIGEgRm9ybURhdGEgb2JqZWN0LCByZXR1cm4gdHJ1ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IHRoaW5nIC0gVGhlIHRoaW5nIHRvIGNoZWNrLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1NwZWNDb21wbGlhbnRGb3JtKHRoaW5nKSB7XG4gIHJldHVybiAhISh0aGluZyAmJiBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiYgdGhpbmdbU3ltYm9sLnRvU3RyaW5nVGFnXSA9PT0gJ0Zvcm1EYXRhJyAmJiB0aGluZ1tTeW1ib2wuaXRlcmF0b3JdKTtcbn1cblxuY29uc3QgdG9KU09OT2JqZWN0ID0gKG9iaikgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBBcnJheSgxMCk7XG5cbiAgY29uc3QgdmlzaXQgPSAoc291cmNlLCBpKSA9PiB7XG5cbiAgICBpZiAoaXNPYmplY3Qoc291cmNlKSkge1xuICAgICAgaWYgKHN0YWNrLmluZGV4T2Yoc291cmNlKSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYoISgndG9KU09OJyBpbiBzb3VyY2UpKSB7XG4gICAgICAgIHN0YWNrW2ldID0gc291cmNlO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBpc0FycmF5KHNvdXJjZSkgPyBbXSA6IHt9O1xuXG4gICAgICAgIGZvckVhY2goc291cmNlLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHZhbHVlLCBpICsgMSk7XG4gICAgICAgICAgIWlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkgJiYgKHRhcmdldFtrZXldID0gcmVkdWNlZFZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RhY2tbaV0gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9O1xuXG4gIHJldHVybiB2aXNpdChvYmosIDApO1xufTtcblxuY29uc3QgaXNBc3luY0ZuID0ga2luZE9mVGVzdCgnQXN5bmNGdW5jdGlvbicpO1xuXG5jb25zdCBpc1RoZW5hYmxlID0gKHRoaW5nKSA9PlxuICB0aGluZyAmJiAoaXNPYmplY3QodGhpbmcpIHx8IGlzRnVuY3Rpb24odGhpbmcpKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRoZW4pICYmIGlzRnVuY3Rpb24odGhpbmcuY2F0Y2gpO1xuXG4vLyBvcmlnaW5hbCBjb2RlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vRGlnaXRhbEJyYWluSlMvQXhpb3NQcm9taXNlL2Jsb2IvMTZkZWFiMTM3MTBlYzA5Nzc5OTIyMTMxZjNmYTU5NTQzMjBmODNhYi9saWIvdXRpbHMuanMjTDExLUwzNFxuXG5jb25zdCBfc2V0SW1tZWRpYXRlID0gKChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQsIHBvc3RNZXNzYWdlU3VwcG9ydGVkKSA9PiB7XG4gIGlmIChzZXRJbW1lZGlhdGVTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gc2V0SW1tZWRpYXRlO1xuICB9XG5cbiAgcmV0dXJuIHBvc3RNZXNzYWdlU3VwcG9ydGVkID8gKCh0b2tlbiwgY2FsbGJhY2tzKSA9PiB7XG4gICAgX2dsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoe3NvdXJjZSwgZGF0YX0pID0+IHtcbiAgICAgIGlmIChzb3VyY2UgPT09IF9nbG9iYWwgJiYgZGF0YSA9PT0gdG9rZW4pIHtcbiAgICAgICAgY2FsbGJhY2tzLmxlbmd0aCAmJiBjYWxsYmFja3Muc2hpZnQoKSgpO1xuICAgICAgfVxuICAgIH0sIGZhbHNlKTtcblxuICAgIHJldHVybiAoY2IpID0+IHtcbiAgICAgIGNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgIF9nbG9iYWwucG9zdE1lc3NhZ2UodG9rZW4sIFwiKlwiKTtcbiAgICB9XG4gIH0pKGBheGlvc0Ake01hdGgucmFuZG9tKCl9YCwgW10pIDogKGNiKSA9PiBzZXRUaW1lb3V0KGNiKTtcbn0pKFxuICB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nLFxuICBpc0Z1bmN0aW9uKF9nbG9iYWwucG9zdE1lc3NhZ2UpXG4pO1xuXG5jb25zdCBhc2FwID0gdHlwZW9mIHF1ZXVlTWljcm90YXNrICE9PSAndW5kZWZpbmVkJyA/XG4gIHF1ZXVlTWljcm90YXNrLmJpbmQoX2dsb2JhbCkgOiAoIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLm5leHRUaWNrIHx8IF9zZXRJbW1lZGlhdGUpO1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKipcblxudmFyIHV0aWxzJDEgPSB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgQUxQSEFCRVQsXG4gIGdlbmVyYXRlU3RyaW5nLFxuICBpc1NwZWNDb21wbGlhbnRGb3JtLFxuICB0b0pTT05PYmplY3QsXG4gIGlzQXN5bmNGbixcbiAgaXNUaGVuYWJsZSxcbiAgc2V0SW1tZWRpYXRlOiBfc2V0SW1tZWRpYXRlLFxuICBhc2FwXG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQXhpb3NFcnJvcihtZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIEVycm9yLmNhbGwodGhpcyk7XG5cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2s7XG4gIH1cblxuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLm5hbWUgPSAnQXhpb3NFcnJvcic7XG4gIGNvZGUgJiYgKHRoaXMuY29kZSA9IGNvZGUpO1xuICBjb25maWcgJiYgKHRoaXMuY29uZmlnID0gY29uZmlnKTtcbiAgcmVxdWVzdCAmJiAodGhpcy5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gIHJlc3BvbnNlICYmICh0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2UpO1xufVxuXG51dGlscyQxLmluaGVyaXRzKEF4aW9zRXJyb3IsIEVycm9yLCB7XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHV0aWxzJDEudG9KU09OT2JqZWN0KHRoaXMuY29uZmlnKSxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5yZXNwb25zZSAmJiB0aGlzLnJlc3BvbnNlLnN0YXR1cyA/IHRoaXMucmVzcG9uc2Uuc3RhdHVzIDogbnVsbFxuICAgIH07XG4gIH1cbn0pO1xuXG5jb25zdCBwcm90b3R5cGUkMSA9IEF4aW9zRXJyb3IucHJvdG90eXBlO1xuY29uc3QgZGVzY3JpcHRvcnMgPSB7fTtcblxuW1xuICAnRVJSX0JBRF9PUFRJT05fVkFMVUUnLFxuICAnRVJSX0JBRF9PUFRJT04nLFxuICAnRUNPTk5BQk9SVEVEJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFUlJfTkVUV09SSycsXG4gICdFUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTJyxcbiAgJ0VSUl9ERVBSRUNBVEVEJyxcbiAgJ0VSUl9CQURfUkVTUE9OU0UnLFxuICAnRVJSX0JBRF9SRVFVRVNUJyxcbiAgJ0VSUl9DQU5DRUxFRCcsXG4gICdFUlJfTk9UX1NVUFBPUlQnLFxuICAnRVJSX0lOVkFMSURfVVJMJ1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbl0uZm9yRWFjaChjb2RlID0+IHtcbiAgZGVzY3JpcHRvcnNbY29kZV0gPSB7dmFsdWU6IGNvZGV9O1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEF4aW9zRXJyb3IsIGRlc2NyaXB0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUkMSwgJ2lzQXhpb3NFcnJvcicsIHt2YWx1ZTogdHJ1ZX0pO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuQXhpb3NFcnJvci5mcm9tID0gKGVycm9yLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlLCBjdXN0b21Qcm9wcykgPT4ge1xuICBjb25zdCBheGlvc0Vycm9yID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUkMSk7XG5cbiAgdXRpbHMkMS50b0ZsYXRPYmplY3QoZXJyb3IsIGF4aW9zRXJyb3IsIGZ1bmN0aW9uIGZpbHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBFcnJvci5wcm90b3R5cGU7XG4gIH0sIHByb3AgPT4ge1xuICAgIHJldHVybiBwcm9wICE9PSAnaXNBeGlvc0Vycm9yJztcbiAgfSk7XG5cbiAgQXhpb3NFcnJvci5jYWxsKGF4aW9zRXJyb3IsIGVycm9yLm1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpO1xuXG4gIGF4aW9zRXJyb3IuY2F1c2UgPSBlcnJvcjtcblxuICBheGlvc0Vycm9yLm5hbWUgPSBlcnJvci5uYW1lO1xuXG4gIGN1c3RvbVByb3BzICYmIE9iamVjdC5hc3NpZ24oYXhpb3NFcnJvciwgY3VzdG9tUHJvcHMpO1xuXG4gIHJldHVybiBheGlvc0Vycm9yO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxudmFyIGh0dHBBZGFwdGVyID0gbnVsbDtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0aGluZyBpcyBhIGFycmF5IG9yIGpzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhpbmcgLSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGJlIHZpc2l0ZWQuXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVmlzaXRhYmxlKHRoaW5nKSB7XG4gIHJldHVybiB1dGlscyQxLmlzUGxhaW5PYmplY3QodGhpbmcpIHx8IHV0aWxzJDEuaXNBcnJheSh0aGluZyk7XG59XG5cbi8qKlxuICogSXQgcmVtb3ZlcyB0aGUgYnJhY2tldHMgZnJvbSB0aGUgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIHBhcmFtZXRlci5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGUga2V5IHdpdGhvdXQgdGhlIGJyYWNrZXRzLlxuICovXG5mdW5jdGlvbiByZW1vdmVCcmFja2V0cyhrZXkpIHtcbiAgcmV0dXJuIHV0aWxzJDEuZW5kc1dpdGgoa2V5LCAnW10nKSA/IGtleS5zbGljZSgwLCAtMikgOiBrZXk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXRoLCBhIGtleSwgYW5kIGEgYm9vbGVhbiwgYW5kIHJldHVybnMgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBjdXJyZW50IG9iamVjdCBiZWluZyBpdGVyYXRlZCBvdmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGRvdHMgLSBJZiB0cnVlLCB0aGUga2V5IHdpbGwgYmUgcmVuZGVyZWQgd2l0aCBkb3RzIGluc3RlYWQgb2YgYnJhY2tldHMuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICovXG5mdW5jdGlvbiByZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSB7XG4gIGlmICghcGF0aCkgcmV0dXJuIGtleTtcbiAgcmV0dXJuIHBhdGguY29uY2F0KGtleSkubWFwKGZ1bmN0aW9uIGVhY2godG9rZW4sIGkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB0b2tlbiA9IHJlbW92ZUJyYWNrZXRzKHRva2VuKTtcbiAgICByZXR1cm4gIWRvdHMgJiYgaSA/ICdbJyArIHRva2VuICsgJ10nIDogdG9rZW47XG4gIH0pLmpvaW4oZG90cyA/ICcuJyA6ICcnKTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgYXJyYXkgaXMgYW4gYXJyYXkgYW5kIG5vbmUgb2YgaXRzIGVsZW1lbnRzIGFyZSB2aXNpdGFibGUsIHRoZW4gaXQncyBhIGZsYXQgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNGbGF0QXJyYXkoYXJyKSB7XG4gIHJldHVybiB1dGlscyQxLmlzQXJyYXkoYXJyKSAmJiAhYXJyLnNvbWUoaXNWaXNpdGFibGUpO1xufVxuXG5jb25zdCBwcmVkaWNhdGVzID0gdXRpbHMkMS50b0ZsYXRPYmplY3QodXRpbHMkMSwge30sIG51bGwsIGZ1bmN0aW9uIGZpbHRlcihwcm9wKSB7XG4gIHJldHVybiAvXmlzW0EtWl0vLnRlc3QocHJvcCk7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgZGF0YSBvYmplY3QgdG8gRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEBwYXJhbSB7P09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy52aXNpdG9yXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tZXRhVG9rZW5zID0gdHJ1ZV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZG90cyA9IGZhbHNlXVxuICogQHBhcmFtIHs/Qm9vbGVhbn0gW29wdGlvbnMuaW5kZXhlcyA9IGZhbHNlXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbi8qKlxuICogSXQgY29udmVydHMgYW4gb2JqZWN0IGludG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBmb3JtIGRhdGEuXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgLSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGFwcGVuZCB0by5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSwgb3B0aW9ucykge1xuICBpZiAoIXV0aWxzJDEuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RhcmdldCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGZvcm1EYXRhID0gZm9ybURhdGEgfHwgbmV3IChGb3JtRGF0YSkoKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgb3B0aW9ucyA9IHV0aWxzJDEudG9GbGF0T2JqZWN0KG9wdGlvbnMsIHtcbiAgICBtZXRhVG9rZW5zOiB0cnVlLFxuICAgIGRvdHM6IGZhbHNlLFxuICAgIGluZGV4ZXM6IGZhbHNlXG4gIH0sIGZhbHNlLCBmdW5jdGlvbiBkZWZpbmVkKG9wdGlvbiwgc291cmNlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gICAgcmV0dXJuICF1dGlscyQxLmlzVW5kZWZpbmVkKHNvdXJjZVtvcHRpb25dKTtcbiAgfSk7XG5cbiAgY29uc3QgbWV0YVRva2VucyA9IG9wdGlvbnMubWV0YVRva2VucztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gIGNvbnN0IHZpc2l0b3IgPSBvcHRpb25zLnZpc2l0b3IgfHwgZGVmYXVsdFZpc2l0b3I7XG4gIGNvbnN0IGRvdHMgPSBvcHRpb25zLmRvdHM7XG4gIGNvbnN0IGluZGV4ZXMgPSBvcHRpb25zLmluZGV4ZXM7XG4gIGNvbnN0IF9CbG9iID0gb3B0aW9ucy5CbG9iIHx8IHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBCbG9iO1xuICBjb25zdCB1c2VCbG9iID0gX0Jsb2IgJiYgdXRpbHMkMS5pc1NwZWNDb21wbGlhbnRGb3JtKGZvcm1EYXRhKTtcblxuICBpZiAoIXV0aWxzJDEuaXNGdW5jdGlvbih2aXNpdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3Zpc2l0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscyQxLmlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICghdXNlQmxvYiAmJiB1dGlscyQxLmlzQmxvYih2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdCbG9iIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBhIEJ1ZmZlciBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIGlmICh1dGlscyQxLmlzQXJyYXlCdWZmZXIodmFsdWUpIHx8IHV0aWxzJDEuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHVzZUJsb2IgJiYgdHlwZW9mIEJsb2IgPT09ICdmdW5jdGlvbicgPyBuZXcgQmxvYihbdmFsdWVdKSA6IEJ1ZmZlci5mcm9tKHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCB2aXNpdG9yLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0ga2V5XG4gICAqIEBwYXJhbSB7QXJyYXk8U3RyaW5nfE51bWJlcj59IHBhdGhcbiAgICogQHRoaXMge0Zvcm1EYXRhfVxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gcmV0dXJuIHRydWUgdG8gdmlzaXQgdGhlIGVhY2ggcHJvcCBvZiB0aGUgdmFsdWUgcmVjdXJzaXZlbHlcbiAgICovXG4gIGZ1bmN0aW9uIGRlZmF1bHRWaXNpdG9yKHZhbHVlLCBrZXksIHBhdGgpIHtcbiAgICBsZXQgYXJyID0gdmFsdWU7XG5cbiAgICBpZiAodmFsdWUgJiYgIXBhdGggJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHV0aWxzJDEuZW5kc1dpdGgoa2V5LCAne30nKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gbWV0YVRva2VucyA/IGtleSA6IGtleS5zbGljZSgwLCAtMik7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh1dGlscyQxLmlzQXJyYXkodmFsdWUpICYmIGlzRmxhdEFycmF5KHZhbHVlKSkgfHxcbiAgICAgICAgKCh1dGlscyQxLmlzRmlsZUxpc3QodmFsdWUpIHx8IHV0aWxzJDEuZW5kc1dpdGgoa2V5LCAnW10nKSkgJiYgKGFyciA9IHV0aWxzJDEudG9BcnJheSh2YWx1ZSkpXG4gICAgICAgICkpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IHJlbW92ZUJyYWNrZXRzKGtleSk7XG5cbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gZWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAhKHV0aWxzJDEuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICAgICAgICAgIGluZGV4ZXMgPT09IHRydWUgPyByZW5kZXJLZXkoW2tleV0sIGluZGV4LCBkb3RzKSA6IChpbmRleGVzID09PSBudWxsID8ga2V5IDoga2V5ICsgJ1tdJyksXG4gICAgICAgICAgICBjb252ZXJ0VmFsdWUoZWwpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNWaXNpdGFibGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3JtRGF0YS5hcHBlbmQocmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cyksIGNvbnZlcnRWYWx1ZSh2YWx1ZSkpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3Qgc3RhY2sgPSBbXTtcblxuICBjb25zdCBleHBvc2VkSGVscGVycyA9IE9iamVjdC5hc3NpZ24ocHJlZGljYXRlcywge1xuICAgIGRlZmF1bHRWaXNpdG9yLFxuICAgIGNvbnZlcnRWYWx1ZSxcbiAgICBpc1Zpc2l0YWJsZVxuICB9KTtcblxuICBmdW5jdGlvbiBidWlsZCh2YWx1ZSwgcGF0aCkge1xuICAgIGlmICh1dGlscyQxLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGF0aC5qb2luKCcuJykpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuXG4gICAgdXRpbHMkMS5mb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiBlYWNoKGVsLCBrZXkpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9ICEodXRpbHMkMS5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIHZpc2l0b3IuY2FsbChcbiAgICAgICAgZm9ybURhdGEsIGVsLCB1dGlscyQxLmlzU3RyaW5nKGtleSkgPyBrZXkudHJpbSgpIDoga2V5LCBwYXRoLCBleHBvc2VkSGVscGVyc1xuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBidWlsZChlbCwgcGF0aCA/IHBhdGguY29uY2F0KGtleSkgOiBba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdGFjay5wb3AoKTtcbiAgfVxuXG4gIGlmICghdXRpbHMkMS5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZGF0YSBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbi8qKlxuICogSXQgZW5jb2RlcyBhIHN0cmluZyBieSByZXBsYWNpbmcgYWxsIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGluIHRoZSB1bnJlc2VydmVkIHNldCB3aXRoXG4gKiB0aGVpciBwZXJjZW50LWVuY29kZWQgZXF1aXZhbGVudHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBlbmNvZGUuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlbmNvZGUkMShzdHIpIHtcbiAgY29uc3QgY2hhck1hcCA9IHtcbiAgICAnISc6ICclMjEnLFxuICAgIFwiJ1wiOiAnJTI3JyxcbiAgICAnKCc6ICclMjgnLFxuICAgICcpJzogJyUyOScsXG4gICAgJ34nOiAnJTdFJyxcbiAgICAnJTIwJzogJysnLFxuICAgICclMDAnOiAnXFx4MDAnXG4gIH07XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKX5dfCUyMHwlMDAvZywgZnVuY3Rpb24gcmVwbGFjZXIobWF0Y2gpIHtcbiAgICByZXR1cm4gY2hhck1hcFttYXRjaF07XG4gIH0pO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGFyYW1zIG9iamVjdCBhbmQgY29udmVydHMgaXQgdG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IHBhcmFtcyAtIFRoZSBwYXJhbWV0ZXJzIHRvIGJlIGNvbnZlcnRlZCB0byBhIEZvcm1EYXRhIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBwYXNzZWQgdG8gdGhlIEF4aW9zIGNvbnN0cnVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpIHtcbiAgdGhpcy5fcGFpcnMgPSBbXTtcblxuICBwYXJhbXMgJiYgdG9Gb3JtRGF0YShwYXJhbXMsIHRoaXMsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc1VSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGU7XG5cbnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiBhcHBlbmQobmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5fcGFpcnMucHVzaChbbmFtZSwgdmFsdWVdKTtcbn07XG5cbnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kZXIpIHtcbiAgY29uc3QgX2VuY29kZSA9IGVuY29kZXIgPyBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBlbmNvZGVyLmNhbGwodGhpcywgdmFsdWUsIGVuY29kZSQxKTtcbiAgfSA6IGVuY29kZSQxO1xuXG4gIHJldHVybiB0aGlzLl9wYWlycy5tYXAoZnVuY3Rpb24gZWFjaChwYWlyKSB7XG4gICAgcmV0dXJuIF9lbmNvZGUocGFpclswXSkgKyAnPScgKyBfZW5jb2RlKHBhaXJbMV0pO1xuICB9LCAnJykuam9pbignJicpO1xufTtcblxuLyoqXG4gKiBJdCByZXBsYWNlcyBhbGwgaW5zdGFuY2VzIG9mIHRoZSBjaGFyYWN0ZXJzIGA6YCwgYCRgLCBgLGAsIGArYCwgYFtgLCBhbmQgYF1gIHdpdGggdGhlaXJcbiAqIFVSSSBlbmNvZGVkIGNvdW50ZXJwYXJ0c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgVGhlIHZhbHVlIHRvIGJlIGVuY29kZWQuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGVuY29kZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcGFyYW0gez9vYmplY3R9IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5mdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgb3B0aW9ucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIFxuICBjb25zdCBfZW5jb2RlID0gb3B0aW9ucyAmJiBvcHRpb25zLmVuY29kZSB8fCBlbmNvZGU7XG5cbiAgY29uc3Qgc2VyaWFsaXplRm4gPSBvcHRpb25zICYmIG9wdGlvbnMuc2VyaWFsaXplO1xuXG4gIGxldCBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChzZXJpYWxpemVGbikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBzZXJpYWxpemVGbihwYXJhbXMsIG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSB1dGlscyQxLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykgP1xuICAgICAgcGFyYW1zLnRvU3RyaW5nKCkgOlxuICAgICAgbmV3IEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykudG9TdHJpbmcoX2VuY29kZSk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIGNvbnN0IGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZihcIiNcIik7XG5cbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuY2xhc3MgSW50ZXJjZXB0b3JNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gICAqL1xuICB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCwgb3B0aW9ucykge1xuICAgIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgICBmdWxmaWxsZWQsXG4gICAgICByZWplY3RlZCxcbiAgICAgIHN5bmNocm9ub3VzOiBvcHRpb25zID8gb3B0aW9ucy5zeW5jaHJvbm91cyA6IGZhbHNlLFxuICAgICAgcnVuV2hlbjogb3B0aW9ucyA/IG9wdGlvbnMucnVuV2hlbiA6IG51bGxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGludGVyY2VwdG9yIHdhcyByZW1vdmVkLCBgZmFsc2VgIG90aGVyd2lzZVxuICAgKi9cbiAgZWplY3QoaWQpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYWxsIGludGVyY2VwdG9ycyBmcm9tIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGNsZWFyKCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gICAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICAgKlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZvckVhY2goZm4pIHtcbiAgICB1dGlscyQxLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgICAgZm4oaCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxudmFyIEludGVyY2VwdG9yTWFuYWdlciQxID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuXG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSB7XG4gIHNpbGVudEpTT05QYXJzaW5nOiB0cnVlLFxuICBmb3JjZWRKU09OUGFyc2luZzogdHJ1ZSxcbiAgY2xhcmlmeVRpbWVvdXRFcnJvcjogZmFsc2Vcbn07XG5cbnZhciBVUkxTZWFyY2hQYXJhbXMkMSA9IHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnID8gVVJMU2VhcmNoUGFyYW1zIDogQXhpb3NVUkxTZWFyY2hQYXJhbXM7XG5cbnZhciBGb3JtRGF0YSQxID0gdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyA/IEZvcm1EYXRhIDogbnVsbDtcblxudmFyIEJsb2IkMSA9IHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyA/IEJsb2IgOiBudWxsO1xuXG52YXIgcGxhdGZvcm0kMSA9IHtcbiAgaXNCcm93c2VyOiB0cnVlLFxuICBjbGFzc2VzOiB7XG4gICAgVVJMU2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMkMSxcbiAgICBGb3JtRGF0YTogRm9ybURhdGEkMSxcbiAgICBCbG9iOiBCbG9iJDFcbiAgfSxcbiAgcHJvdG9jb2xzOiBbJ2h0dHAnLCAnaHR0cHMnLCAnZmlsZScsICdibG9iJywgJ3VybCcsICdkYXRhJ11cbn07XG5cbmNvbnN0IGhhc0Jyb3dzZXJFbnYgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyRW52ID0gKFxuICAocHJvZHVjdCkgPT4ge1xuICAgIHJldHVybiBoYXNCcm93c2VyRW52ICYmIFsnUmVhY3ROYXRpdmUnLCAnTmF0aXZlU2NyaXB0JywgJ05TJ10uaW5kZXhPZihwcm9kdWN0KSA8IDBcbiAgfSkodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciB3ZWJXb3JrZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBBbHRob3VnaCB0aGUgYGlzU3RhbmRhcmRCcm93c2VyRW52YCBtZXRob2QgaW5kaWNhdGVzIHRoYXRcbiAqIGBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlcmAsIHRoZSBXZWJXb3JrZXIgd2lsbCBzdGlsbCBiZVxuICogZmlsdGVyZWQgb3V0IGR1ZSB0byBpdHMganVkZ21lbnQgc3RhbmRhcmRcbiAqIGB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnYC5cbiAqIFRoaXMgbGVhZHMgdG8gYSBwcm9ibGVtIHdoZW4gYXhpb3MgcG9zdCBgRm9ybURhdGFgIGluIHdlYldvcmtlclxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYgPSAoKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiZcbiAgICB0eXBlb2Ygc2VsZi5pbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nXG4gICk7XG59KSgpO1xuXG5jb25zdCBvcmlnaW4gPSBoYXNCcm93c2VyRW52ICYmIHdpbmRvdy5sb2NhdGlvbi5ocmVmIHx8ICdodHRwOi8vbG9jYWxob3N0JztcblxudmFyIHV0aWxzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICBfX3Byb3RvX186IG51bGwsXG4gIGhhc0Jyb3dzZXJFbnY6IGhhc0Jyb3dzZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudjogaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJFbnY6IGhhc1N0YW5kYXJkQnJvd3NlckVudixcbiAgb3JpZ2luOiBvcmlnaW5cbn0pO1xuXG52YXIgcGxhdGZvcm0gPSB7XG4gIC4uLnV0aWxzLFxuICAuLi5wbGF0Zm9ybSQxXG59O1xuXG5mdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIE9iamVjdC5hc3NpZ24oe1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uKHZhbHVlLCBrZXksIHBhdGgsIGhlbHBlcnMpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pc05vZGUgJiYgdXRpbHMkMS5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygnYmFzZTY0JykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoZWxwZXJzLmRlZmF1bHRWaXNpdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9LCBvcHRpb25zKSk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcgbGlrZSBgZm9vW3hdW3ldW3pdYCBhbmQgcmV0dXJucyBhbiBhcnJheSBsaWtlIGBbJ2ZvbycsICd4JywgJ3knLCAneiddXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICpcbiAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHN0cmluZ3MuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlUHJvcFBhdGgobmFtZSkge1xuICAvLyBmb29beF1beV1bel1cbiAgLy8gZm9vLngueS56XG4gIC8vIGZvby14LXktelxuICAvLyBmb28geCB5IHpcbiAgcmV0dXJuIHV0aWxzJDEubWF0Y2hBbGwoL1xcdyt8XFxbKFxcdyopXS9nLCBuYW1lKS5tYXAobWF0Y2ggPT4ge1xuICAgIHJldHVybiBtYXRjaFswXSA9PT0gJ1tdJyA/ICcnIDogbWF0Y2hbMV0gfHwgbWF0Y2hbMF07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYW4gYXJyYXkgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNvbnZlcnQgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIGtleXMgYW5kIHZhbHVlcyBhcyB0aGUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5VG9PYmplY3QoYXJyKSB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcbiAgbGV0IGk7XG4gIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICBsZXQga2V5O1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIG9ialtrZXldID0gYXJyW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIEZvcm1EYXRhIG9iamVjdCBhbmQgcmV0dXJucyBhIEphdmFTY3JpcHQgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gY29udmVydCB0byBKU09OLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3Q8c3RyaW5nLCBhbnk+IHwgbnVsbH0gVGhlIGNvbnZlcnRlZCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGZvcm1EYXRhVG9KU09OKGZvcm1EYXRhKSB7XG4gIGZ1bmN0aW9uIGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0LCBpbmRleCkge1xuICAgIGxldCBuYW1lID0gcGF0aFtpbmRleCsrXTtcblxuICAgIGlmIChuYW1lID09PSAnX19wcm90b19fJykgcmV0dXJuIHRydWU7XG5cbiAgICBjb25zdCBpc051bWVyaWNLZXkgPSBOdW1iZXIuaXNGaW5pdGUoK25hbWUpO1xuICAgIGNvbnN0IGlzTGFzdCA9IGluZGV4ID49IHBhdGgubGVuZ3RoO1xuICAgIG5hbWUgPSAhbmFtZSAmJiB1dGlscyQxLmlzQXJyYXkodGFyZ2V0KSA/IHRhcmdldC5sZW5ndGggOiBuYW1lO1xuXG4gICAgaWYgKGlzTGFzdCkge1xuICAgICAgaWYgKHV0aWxzJDEuaGFzT3duUHJvcCh0YXJnZXQsIG5hbWUpKSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IFt0YXJnZXRbbmFtZV0sIHZhbHVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldFtuYW1lXSB8fCAhdXRpbHMkMS5pc09iamVjdCh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldFtuYW1lXSwgaW5kZXgpO1xuXG4gICAgaWYgKHJlc3VsdCAmJiB1dGlscyQxLmlzQXJyYXkodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gYXJyYXlUb09iamVjdCh0YXJnZXRbbmFtZV0pO1xuICAgIH1cblxuICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICB9XG5cbiAgaWYgKHV0aWxzJDEuaXNGb3JtRGF0YShmb3JtRGF0YSkgJiYgdXRpbHMkMS5pc0Z1bmN0aW9uKGZvcm1EYXRhLmVudHJpZXMpKSB7XG4gICAgY29uc3Qgb2JqID0ge307XG5cbiAgICB1dGlscyQxLmZvckVhY2hFbnRyeShmb3JtRGF0YSwgKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBidWlsZFBhdGgocGFyc2VQcm9wUGF0aChuYW1lKSwgdmFsdWUsIG9iaiwgMCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBzdHJpbmcsIHRyaWVzIHRvIHBhcnNlIGl0LCBhbmQgaWYgaXQgZmFpbHMsIGl0IHJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb25cbiAqIG9mIHRoZSBpbnB1dFxuICpcbiAqIEBwYXJhbSB7YW55fSByYXdWYWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzdHJpbmdpZmllZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcnNlciAtIEEgZnVuY3Rpb24gdGhhdCBwYXJzZXMgYSBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5jb2RlciAtIEEgZnVuY3Rpb24gdGhhdCB0YWtlcyBhIHZhbHVlIGFuZCByZXR1cm5zIGEgc3RyaW5nLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgcmF3VmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0cmluZ2lmeVNhZmVseShyYXdWYWx1ZSwgcGFyc2VyLCBlbmNvZGVyKSB7XG4gIGlmICh1dGlscyQxLmlzU3RyaW5nKHJhd1ZhbHVlKSkge1xuICAgIHRyeSB7XG4gICAgICAocGFyc2VyIHx8IEpTT04ucGFyc2UpKHJhd1ZhbHVlKTtcbiAgICAgIHJldHVybiB1dGlscyQxLnRyaW0ocmF3VmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLm5hbWUgIT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gKGVuY29kZXIgfHwgSlNPTi5zdHJpbmdpZnkpKHJhd1ZhbHVlKTtcbn1cblxuY29uc3QgZGVmYXVsdHMgPSB7XG5cbiAgdHJhbnNpdGlvbmFsOiB0cmFuc2l0aW9uYWxEZWZhdWx0cyxcblxuICBhZGFwdGVyOiBbJ3hocicsICdodHRwJywgJ2ZldGNoJ10sXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gaGVhZGVycy5nZXRDb250ZW50VHlwZSgpIHx8ICcnO1xuICAgIGNvbnN0IGhhc0pTT05Db250ZW50VHlwZSA9IGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL2pzb24nKSA+IC0xO1xuICAgIGNvbnN0IGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzJDEuaXNPYmplY3QoZGF0YSk7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkICYmIHV0aWxzJDEuaXNIVE1MRm9ybShkYXRhKSkge1xuICAgICAgZGF0YSA9IG5ldyBGb3JtRGF0YShkYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0Zvcm1EYXRhID0gdXRpbHMkMS5pc0Zvcm1EYXRhKGRhdGEpO1xuXG4gICAgaWYgKGlzRm9ybURhdGEpIHtcbiAgICAgIHJldHVybiBoYXNKU09OQ29udGVudFR5cGUgPyBKU09OLnN0cmluZ2lmeShmb3JtRGF0YVRvSlNPTihkYXRhKSkgOiBkYXRhO1xuICAgIH1cblxuICAgIGlmICh1dGlscyQxLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzJDEuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzJDEuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzJDEuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscyQxLmlzQmxvYihkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzJDEuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzJDEuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JywgZmFsc2UpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBsZXQgaXNGaWxlTGlzdDtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQpIHtcbiAgICAgIGlmIChjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIHRoaXMuZm9ybVNlcmlhbGl6ZXIpLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICgoaXNGaWxlTGlzdCA9IHV0aWxzJDEuaXNGaWxlTGlzdChkYXRhKSkgfHwgY29udGVudFR5cGUuaW5kZXhPZignbXVsdGlwYXJ0L2Zvcm0tZGF0YScpID4gLTEpIHtcbiAgICAgICAgY29uc3QgX0Zvcm1EYXRhID0gdGhpcy5lbnYgJiYgdGhpcy5lbnYuRm9ybURhdGE7XG5cbiAgICAgICAgcmV0dXJuIHRvRm9ybURhdGEoXG4gICAgICAgICAgaXNGaWxlTGlzdCA/IHsnZmlsZXNbXSc6IGRhdGF9IDogZGF0YSxcbiAgICAgICAgICBfRm9ybURhdGEgJiYgbmV3IF9Gb3JtRGF0YSgpLFxuICAgICAgICAgIHRoaXMuZm9ybVNlcmlhbGl6ZXJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkIHx8IGhhc0pTT05Db250ZW50VHlwZSApIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nLCBmYWxzZSk7XG4gICAgICByZXR1cm4gc3RyaW5naWZ5U2FmZWx5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICBjb25zdCB0cmFuc2l0aW9uYWwgPSB0aGlzLnRyYW5zaXRpb25hbCB8fCBkZWZhdWx0cy50cmFuc2l0aW9uYWw7XG4gICAgY29uc3QgZm9yY2VkSlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLmZvcmNlZEpTT05QYXJzaW5nO1xuICAgIGNvbnN0IEpTT05SZXF1ZXN0ZWQgPSB0aGlzLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nO1xuXG4gICAgaWYgKHV0aWxzJDEuaXNSZXNwb25zZShkYXRhKSB8fCB1dGlscyQxLmlzUmVhZGFibGVTdHJlYW0oZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGlmIChkYXRhICYmIHV0aWxzJDEuaXNTdHJpbmcoZGF0YSkgJiYgKChmb3JjZWRKU09OUGFyc2luZyAmJiAhdGhpcy5yZXNwb25zZVR5cGUpIHx8IEpTT05SZXF1ZXN0ZWQpKSB7XG4gICAgICBjb25zdCBzaWxlbnRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuc2lsZW50SlNPTlBhcnNpbmc7XG4gICAgICBjb25zdCBzdHJpY3RKU09OUGFyc2luZyA9ICFzaWxlbnRKU09OUGFyc2luZyAmJiBKU09OUmVxdWVzdGVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHN0cmljdEpTT05QYXJzaW5nKSB7XG4gICAgICAgICAgaWYgKGUubmFtZSA9PT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICAgICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGUsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRSwgdGhpcywgbnVsbCwgdGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIG1heEJvZHlMZW5ndGg6IC0xLFxuXG4gIGVudjoge1xuICAgIEZvcm1EYXRhOiBwbGF0Zm9ybS5jbGFzc2VzLkZvcm1EYXRhLFxuICAgIEJsb2I6IHBsYXRmb3JtLmNsYXNzZXMuQmxvYlxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxufTtcblxudXRpbHMkMS5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIChtZXRob2QpID0+IHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudmFyIGRlZmF1bHRzJDEgPSBkZWZhdWx0cztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscyQxLnRvT2JqZWN0U2V0KFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dKTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJhd0hlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbnZhciBwYXJzZUhlYWRlcnMgPSByYXdIZWFkZXJzID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiYgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5jb25zdCAkaW50ZXJuYWxzID0gU3ltYm9sKCdpbnRlcm5hbHMnKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyICYmIFN0cmluZyhoZWFkZXIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdXRpbHMkMS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLm1hcChub3JtYWxpemVWYWx1ZSkgOiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRva2VucyhzdHIpIHtcbiAgY29uc3QgdG9rZW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgdG9rZW5zUkUgPSAvKFteXFxzLDs9XSspXFxzKig/Oj1cXHMqKFteLDtdKykpPy9nO1xuICBsZXQgbWF0Y2g7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHRva2Vuc1JFLmV4ZWMoc3RyKSkpIHtcbiAgICB0b2tlbnNbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG5jb25zdCBpc1ZhbGlkSGVhZGVyTmFtZSA9IChzdHIpID0+IC9eWy1fYS16QS1aMC05XmB8fiwhIyQlJicqKy5dKyQvLnRlc3Qoc3RyLnRyaW0oKSk7XG5cbmZ1bmN0aW9uIG1hdGNoSGVhZGVyVmFsdWUoY29udGV4dCwgdmFsdWUsIGhlYWRlciwgZmlsdGVyLCBpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgaWYgKHV0aWxzJDEuaXNGdW5jdGlvbihmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci5jYWxsKHRoaXMsIHZhbHVlLCBoZWFkZXIpO1xuICB9XG5cbiAgaWYgKGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICAgIHZhbHVlID0gaGVhZGVyO1xuICB9XG5cbiAgaWYgKCF1dGlscyQxLmlzU3RyaW5nKHZhbHVlKSkgcmV0dXJuO1xuXG4gIGlmICh1dGlscyQxLmlzU3RyaW5nKGZpbHRlcikpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5kZXhPZihmaWx0ZXIpICE9PSAtMTtcbiAgfVxuXG4gIGlmICh1dGlscyQxLmlzUmVnRXhwKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLnRlc3QodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlci50cmltKClcbiAgICAudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8oW2EtelxcZF0pKFxcdyopL2csICh3LCBjaGFyLCBzdHIpID0+IHtcbiAgICAgIHJldHVybiBjaGFyLnRvVXBwZXJDYXNlKCkgKyBzdHI7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkQWNjZXNzb3JzKG9iaiwgaGVhZGVyKSB7XG4gIGNvbnN0IGFjY2Vzc29yTmFtZSA9IHV0aWxzJDEudG9DYW1lbENhc2UoJyAnICsgaGVhZGVyKTtcblxuICBbJ2dldCcsICdzZXQnLCAnaGFzJ10uZm9yRWFjaChtZXRob2ROYW1lID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBtZXRob2ROYW1lICsgYWNjZXNzb3JOYW1lLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICByZXR1cm4gdGhpc1ttZXRob2ROYW1lXS5jYWxsKHRoaXMsIGhlYWRlciwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0pO1xufVxuXG5jbGFzcyBBeGlvc0hlYWRlcnMge1xuICBjb25zdHJ1Y3RvcihoZWFkZXJzKSB7XG4gICAgaGVhZGVycyAmJiB0aGlzLnNldChoZWFkZXJzKTtcbiAgfVxuXG4gIHNldChoZWFkZXIsIHZhbHVlT3JSZXdyaXRlLCByZXdyaXRlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFsSGVhZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaGVhZGVyIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qga2V5ID0gdXRpbHMkMS5maW5kS2V5KHNlbGYsIGxIZWFkZXIpO1xuXG4gICAgICBpZigha2V5IHx8IHNlbGZba2V5XSA9PT0gdW5kZWZpbmVkIHx8IF9yZXdyaXRlID09PSB0cnVlIHx8IChfcmV3cml0ZSA9PT0gdW5kZWZpbmVkICYmIHNlbGZba2V5XSAhPT0gZmFsc2UpKSB7XG4gICAgICAgIHNlbGZba2V5IHx8IF9oZWFkZXJdID0gbm9ybWFsaXplVmFsdWUoX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZXRIZWFkZXJzID0gKGhlYWRlcnMsIF9yZXdyaXRlKSA9PlxuICAgICAgdXRpbHMkMS5mb3JFYWNoKGhlYWRlcnMsIChfdmFsdWUsIF9oZWFkZXIpID0+IHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSk7XG5cbiAgICBpZiAodXRpbHMkMS5pc1BsYWluT2JqZWN0KGhlYWRlcikgfHwgaGVhZGVyIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3Rvcikge1xuICAgICAgc2V0SGVhZGVycyhoZWFkZXIsIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2UgaWYodXRpbHMkMS5pc1N0cmluZyhoZWFkZXIpICYmIChoZWFkZXIgPSBoZWFkZXIudHJpbSgpKSAmJiAhaXNWYWxpZEhlYWRlck5hbWUoaGVhZGVyKSkge1xuICAgICAgc2V0SGVhZGVycyhwYXJzZUhlYWRlcnMoaGVhZGVyKSwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMkMS5pc0hlYWRlcnMoaGVhZGVyKSkge1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgaGVhZGVyLmVudHJpZXMoKSkge1xuICAgICAgICBzZXRIZWFkZXIodmFsdWUsIGtleSwgcmV3cml0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWRlciAhPSBudWxsICYmIHNldEhlYWRlcih2YWx1ZU9yUmV3cml0ZSwgaGVhZGVyLCByZXdyaXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldChoZWFkZXIsIHBhcnNlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMkMS5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzW2tleV07XG5cbiAgICAgICAgaWYgKCFwYXJzZXIpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyc2VyID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlVG9rZW5zKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscyQxLmlzRnVuY3Rpb24ocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuY2FsbCh0aGlzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscyQxLmlzUmVnRXhwKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmV4ZWModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncGFyc2VyIG11c3QgYmUgYm9vbGVhbnxyZWdleHB8ZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYXMoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgcmV0dXJuICEhKGtleSAmJiB0aGlzW2tleV0gIT09IHVuZGVmaW5lZCAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlcikpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkZWxldGUoaGVhZGVyLCBtYXRjaGVyKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUhlYWRlcihfaGVhZGVyKSB7XG4gICAgICBfaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoX2hlYWRlcikge1xuICAgICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkoc2VsZiwgX2hlYWRlcik7XG5cbiAgICAgICAgaWYgKGtleSAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZShzZWxmLCBzZWxmW2tleV0sIGtleSwgbWF0Y2hlcikpKSB7XG4gICAgICAgICAgZGVsZXRlIHNlbGZba2V5XTtcblxuICAgICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzJDEuaXNBcnJheShoZWFkZXIpKSB7XG4gICAgICBoZWFkZXIuZm9yRWFjaChkZWxldGVIZWFkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVIZWFkZXIoaGVhZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIGNsZWFyKG1hdGNoZXIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgbm9ybWFsaXplKGZvcm1hdCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7fTtcblxuICAgIHV0aWxzJDEuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMkMS5maW5kS2V5KGhlYWRlcnMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgc2VsZltrZXldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBmb3JtYXQgPyBmb3JtYXRIZWFkZXIoaGVhZGVyKSA6IFN0cmluZyhoZWFkZXIpLnRyaW0oKTtcblxuICAgICAgaWYgKG5vcm1hbGl6ZWQgIT09IGhlYWRlcikge1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgfVxuXG4gICAgICBzZWxmW25vcm1hbGl6ZWRdID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWRdID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29uY2F0KC4uLnRhcmdldHMpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jb25jYXQodGhpcywgLi4udGFyZ2V0cyk7XG4gIH1cblxuICB0b0pTT04oYXNTdHJpbmdzKSB7XG4gICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIHV0aWxzJDEuZm9yRWFjaCh0aGlzLCAodmFsdWUsIGhlYWRlcikgPT4ge1xuICAgICAgdmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gZmFsc2UgJiYgKG9ialtoZWFkZXJdID0gYXNTdHJpbmdzICYmIHV0aWxzJDEuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKCcsICcpIDogdmFsdWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKVtTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSkubWFwKChbaGVhZGVyLCB2YWx1ZV0pID0+IGhlYWRlciArICc6ICcgKyB2YWx1ZSkuam9pbignXFxuJyk7XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdBeGlvc0hlYWRlcnMnO1xuICB9XG5cbiAgc3RhdGljIGZyb20odGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiB0aGlzID8gdGhpbmcgOiBuZXcgdGhpcyh0aGluZyk7XG4gIH1cblxuICBzdGF0aWMgY29uY2F0KGZpcnN0LCAuLi50YXJnZXRzKSB7XG4gICAgY29uc3QgY29tcHV0ZWQgPSBuZXcgdGhpcyhmaXJzdCk7XG5cbiAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4gY29tcHV0ZWQuc2V0KHRhcmdldCkpO1xuXG4gICAgcmV0dXJuIGNvbXB1dGVkO1xuICB9XG5cbiAgc3RhdGljIGFjY2Vzc29yKGhlYWRlcikge1xuICAgIGNvbnN0IGludGVybmFscyA9IHRoaXNbJGludGVybmFsc10gPSAodGhpc1skaW50ZXJuYWxzXSA9IHtcbiAgICAgIGFjY2Vzc29yczoge31cbiAgICB9KTtcblxuICAgIGNvbnN0IGFjY2Vzc29ycyA9IGludGVybmFscy5hY2Nlc3NvcnM7XG4gICAgY29uc3QgcHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY2Nlc3NvcihfaGVhZGVyKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWFjY2Vzc29yc1tsSGVhZGVyXSkge1xuICAgICAgICBidWlsZEFjY2Vzc29ycyhwcm90b3R5cGUsIF9oZWFkZXIpO1xuICAgICAgICBhY2Nlc3NvcnNbbEhlYWRlcl0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHV0aWxzJDEuaXNBcnJheShoZWFkZXIpID8gaGVhZGVyLmZvckVhY2goZGVmaW5lQWNjZXNzb3IpIDogZGVmaW5lQWNjZXNzb3IoaGVhZGVyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbkF4aW9zSGVhZGVycy5hY2Nlc3NvcihbJ0NvbnRlbnQtVHlwZScsICdDb250ZW50LUxlbmd0aCcsICdBY2NlcHQnLCAnQWNjZXB0LUVuY29kaW5nJywgJ1VzZXItQWdlbnQnLCAnQXV0aG9yaXphdGlvbiddKTtcblxuLy8gcmVzZXJ2ZWQgbmFtZXMgaG90Zml4XG51dGlscyQxLnJlZHVjZURlc2NyaXB0b3JzKEF4aW9zSGVhZGVycy5wcm90b3R5cGUsICh7dmFsdWV9LCBrZXkpID0+IHtcbiAgbGV0IG1hcHBlZCA9IGtleVswXS50b1VwcGVyQ2FzZSgpICsga2V5LnNsaWNlKDEpOyAvLyBtYXAgYHNldGAgPT4gYFNldGBcbiAgcmV0dXJuIHtcbiAgICBnZXQ6ICgpID0+IHZhbHVlLFxuICAgIHNldChoZWFkZXJWYWx1ZSkge1xuICAgICAgdGhpc1ttYXBwZWRdID0gaGVhZGVyVmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxudXRpbHMkMS5mcmVlemVNZXRob2RzKEF4aW9zSGVhZGVycyk7XG5cbnZhciBBeGlvc0hlYWRlcnMkMSA9IEF4aW9zSGVhZGVycztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHBhcmFtIHs/T2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGZucywgcmVzcG9uc2UpIHtcbiAgY29uc3QgY29uZmlnID0gdGhpcyB8fCBkZWZhdWx0cyQxO1xuICBjb25zdCBjb250ZXh0ID0gcmVzcG9uc2UgfHwgY29uZmlnO1xuICBjb25zdCBoZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShjb250ZXh0LmhlYWRlcnMpO1xuICBsZXQgZGF0YSA9IGNvbnRleHQuZGF0YTtcblxuICB1dGlscyQxLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb25maWcsIGRhdGEsIGhlYWRlcnMubm9ybWFsaXplKCksIHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzIDogdW5kZWZpbmVkKTtcbiAgfSk7XG5cbiAgaGVhZGVycy5ub3JtYWxpemUoKTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdD19IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3Q9fSByZXF1ZXN0IFRoZSByZXF1ZXN0LlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxlZEVycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIEF4aW9zRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlID09IG51bGwgPyAnY2FuY2VsZWQnIDogbWVzc2FnZSwgQXhpb3NFcnJvci5FUlJfQ0FOQ0VMRUQsIGNvbmZpZywgcmVxdWVzdCk7XG4gIHRoaXMubmFtZSA9ICdDYW5jZWxlZEVycm9yJztcbn1cblxudXRpbHMkMS5pbmhlcml0cyhDYW5jZWxlZEVycm9yLCBBeGlvc0Vycm9yLCB7XG4gIF9fQ0FOQ0VMX186IHRydWVcbn0pO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSByZXNwb25zZS5cbiAqL1xuZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgY29uc3QgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIFtBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFXVtNYXRoLmZsb29yKHJlc3BvbnNlLnN0YXR1cyAvIDEwMCkgLSA0XSxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIGNvbnN0IG1hdGNoID0gL14oWy0rXFx3XXsxLDI1fSkoOj9cXC9cXC98OikvLmV4ZWModXJsKTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdIHx8ICcnO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZSBkYXRhIG1heFJhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2FtcGxlc0NvdW50PSAxMF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbbWluPSAxMDAwXVxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBzcGVlZG9tZXRlcihzYW1wbGVzQ291bnQsIG1pbikge1xuICBzYW1wbGVzQ291bnQgPSBzYW1wbGVzQ291bnQgfHwgMTA7XG4gIGNvbnN0IGJ5dGVzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGNvbnN0IHRpbWVzdGFtcHMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgbGV0IGhlYWQgPSAwO1xuICBsZXQgdGFpbCA9IDA7XG4gIGxldCBmaXJzdFNhbXBsZVRTO1xuXG4gIG1pbiA9IG1pbiAhPT0gdW5kZWZpbmVkID8gbWluIDogMTAwMDtcblxuICByZXR1cm4gZnVuY3Rpb24gcHVzaChjaHVua0xlbmd0aCkge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgICBjb25zdCBzdGFydGVkQXQgPSB0aW1lc3RhbXBzW3RhaWxdO1xuXG4gICAgaWYgKCFmaXJzdFNhbXBsZVRTKSB7XG4gICAgICBmaXJzdFNhbXBsZVRTID0gbm93O1xuICAgIH1cblxuICAgIGJ5dGVzW2hlYWRdID0gY2h1bmtMZW5ndGg7XG4gICAgdGltZXN0YW1wc1toZWFkXSA9IG5vdztcblxuICAgIGxldCBpID0gdGFpbDtcbiAgICBsZXQgYnl0ZXNDb3VudCA9IDA7XG5cbiAgICB3aGlsZSAoaSAhPT0gaGVhZCkge1xuICAgICAgYnl0ZXNDb3VudCArPSBieXRlc1tpKytdO1xuICAgICAgaSA9IGkgJSBzYW1wbGVzQ291bnQ7XG4gICAgfVxuXG4gICAgaGVhZCA9IChoZWFkICsgMSkgJSBzYW1wbGVzQ291bnQ7XG5cbiAgICBpZiAoaGVhZCA9PT0gdGFpbCkge1xuICAgICAgdGFpbCA9ICh0YWlsICsgMSkgJSBzYW1wbGVzQ291bnQ7XG4gICAgfVxuXG4gICAgaWYgKG5vdyAtIGZpcnN0U2FtcGxlVFMgPCBtaW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYXNzZWQgPSBzdGFydGVkQXQgJiYgbm93IC0gc3RhcnRlZEF0O1xuXG4gICAgcmV0dXJuIHBhc3NlZCA/IE1hdGgucm91bmQoYnl0ZXNDb3VudCAqIDEwMDAgLyBwYXNzZWQpIDogdW5kZWZpbmVkO1xuICB9O1xufVxuXG4vKipcbiAqIFRocm90dGxlIGRlY29yYXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmVxXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZm4sIGZyZXEpIHtcbiAgbGV0IHRpbWVzdGFtcCA9IDA7XG4gIGxldCB0aHJlc2hvbGQgPSAxMDAwIC8gZnJlcTtcbiAgbGV0IGxhc3RBcmdzO1xuICBsZXQgdGltZXI7XG5cbiAgY29uc3QgaW52b2tlID0gKGFyZ3MsIG5vdyA9IERhdGUubm93KCkpID0+IHtcbiAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgbGFzdEFyZ3MgPSBudWxsO1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICB9XG4gICAgZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gIH07XG5cbiAgY29uc3QgdGhyb3R0bGVkID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHBhc3NlZCA9IG5vdyAtIHRpbWVzdGFtcDtcbiAgICBpZiAoIHBhc3NlZCA+PSB0aHJlc2hvbGQpIHtcbiAgICAgIGludm9rZShhcmdzLCBub3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0QXJncyA9IGFyZ3M7XG4gICAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICAgIGludm9rZShsYXN0QXJncyk7XG4gICAgICAgIH0sIHRocmVzaG9sZCAtIHBhc3NlZCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGZsdXNoID0gKCkgPT4gbGFzdEFyZ3MgJiYgaW52b2tlKGxhc3RBcmdzKTtcblxuICByZXR1cm4gW3Rocm90dGxlZCwgZmx1c2hdO1xufVxuXG5jb25zdCBwcm9ncmVzc0V2ZW50UmVkdWNlciA9IChsaXN0ZW5lciwgaXNEb3dubG9hZFN0cmVhbSwgZnJlcSA9IDMpID0+IHtcbiAgbGV0IGJ5dGVzTm90aWZpZWQgPSAwO1xuICBjb25zdCBfc3BlZWRvbWV0ZXIgPSBzcGVlZG9tZXRlcig1MCwgMjUwKTtcblxuICByZXR1cm4gdGhyb3R0bGUoZSA9PiB7XG4gICAgY29uc3QgbG9hZGVkID0gZS5sb2FkZWQ7XG4gICAgY29uc3QgdG90YWwgPSBlLmxlbmd0aENvbXB1dGFibGUgPyBlLnRvdGFsIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHByb2dyZXNzQnl0ZXMgPSBsb2FkZWQgLSBieXRlc05vdGlmaWVkO1xuICAgIGNvbnN0IHJhdGUgPSBfc3BlZWRvbWV0ZXIocHJvZ3Jlc3NCeXRlcyk7XG4gICAgY29uc3QgaW5SYW5nZSA9IGxvYWRlZCA8PSB0b3RhbDtcblxuICAgIGJ5dGVzTm90aWZpZWQgPSBsb2FkZWQ7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbG9hZGVkLFxuICAgICAgdG90YWwsXG4gICAgICBwcm9ncmVzczogdG90YWwgPyAobG9hZGVkIC8gdG90YWwpIDogdW5kZWZpbmVkLFxuICAgICAgYnl0ZXM6IHByb2dyZXNzQnl0ZXMsXG4gICAgICByYXRlOiByYXRlID8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCAmJiBpblJhbmdlID8gKHRvdGFsIC0gbG9hZGVkKSAvIHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBldmVudDogZSxcbiAgICAgIGxlbmd0aENvbXB1dGFibGU6IHRvdGFsICE9IG51bGwsXG4gICAgICBbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ106IHRydWVcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufTtcblxuY29uc3QgcHJvZ3Jlc3NFdmVudERlY29yYXRvciA9ICh0b3RhbCwgdGhyb3R0bGVkKSA9PiB7XG4gIGNvbnN0IGxlbmd0aENvbXB1dGFibGUgPSB0b3RhbCAhPSBudWxsO1xuXG4gIHJldHVybiBbKGxvYWRlZCkgPT4gdGhyb3R0bGVkWzBdKHtcbiAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgIHRvdGFsLFxuICAgIGxvYWRlZFxuICB9KSwgdGhyb3R0bGVkWzFdXTtcbn07XG5cbmNvbnN0IGFzeW5jRGVjb3JhdG9yID0gKGZuKSA9PiAoLi4uYXJncykgPT4gdXRpbHMkMS5hc2FwKCgpID0+IGZuKC4uLmFyZ3MpKTtcblxudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbi8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgY29uc3QgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgY29uc3QgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGV0IG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXRzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIGxldCBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICBjb25zdCBwYXJzZWQgPSAodXRpbHMkMS5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKCk7XG5cbnZhciBjb29raWVzID0gcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAge1xuICAgIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgY29uc3QgY29va2llID0gW25hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpXTtcblxuICAgICAgdXRpbHMkMS5pc051bWJlcihleHBpcmVzKSAmJiBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG5cbiAgICAgIHV0aWxzJDEuaXNTdHJpbmcocGF0aCkgJiYgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuXG4gICAgICB1dGlscyQxLmlzU3RyaW5nKGRvbWFpbikgJiYgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcblxuICAgICAgc2VjdXJlID09PSB0cnVlICYmIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcblxuICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgfSxcblxuICAgIHJlYWQobmFtZSkge1xuICAgICAgY29uc3QgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlKG5hbWUpIHtcbiAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgfVxuICB9XG5cbiAgOlxuXG4gIC8vIE5vbi1zdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAge1xuICAgIHdyaXRlKCkge30sXG4gICAgcmVhZCgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlKCkge31cbiAgfTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5mdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuXG5jb25zdCBoZWFkZXJzVG9PYmplY3QgPSAodGhpbmcpID0+IHRoaW5nIGluc3RhbmNlb2YgQXhpb3NIZWFkZXJzJDEgPyB7IC4uLnRoaW5nIH0gOiB0aGluZztcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5mdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgY29uc3QgY29uZmlnID0ge307XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UsIGNhc2VsZXNzKSB7XG4gICAgaWYgKHV0aWxzJDEuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzJDEuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMkMS5tZXJnZS5jYWxsKHtjYXNlbGVzc30sIHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzJDEuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMkMS5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzJDEuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhhLCBiLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhLCBjYXNlbGVzcyk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGlyZWN0S2V5cyhhLCBiLCBwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIpO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBtZXJnZU1hcCA9IHtcbiAgICB1cmw6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgbWV0aG9kOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGRhdGE6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgYmFzZVVSTDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlc3BvbnNlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHBhcmFtc1NlcmlhbGl6ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0TWVzc2FnZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aFhTUkZUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhZGFwdGVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlVHlwZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmQ29va2llTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmSGVhZGVyTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvblVwbG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uRG93bmxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBkZWNvbXByZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heENvbnRlbnRMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Qm9keUxlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBiZWZvcmVSZWRpcmVjdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc3BvcnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cEFnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBzQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgY2FuY2VsVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgc29ja2V0UGF0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZUVuY29kaW5nOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHZhbGlkYXRlU3RhdHVzOiBtZXJnZURpcmVjdEtleXMsXG4gICAgaGVhZGVyczogKGEsIGIpID0+IG1lcmdlRGVlcFByb3BlcnRpZXMoaGVhZGVyc1RvT2JqZWN0KGEpLCBoZWFkZXJzVG9PYmplY3QoYiksIHRydWUpXG4gIH07XG5cbiAgdXRpbHMkMS5mb3JFYWNoKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZzEsIGNvbmZpZzIpKSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICBjb25zdCBtZXJnZSA9IG1lcmdlTWFwW3Byb3BdIHx8IG1lcmdlRGVlcFByb3BlcnRpZXM7XG4gICAgY29uc3QgY29uZmlnVmFsdWUgPSBtZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdLCBwcm9wKTtcbiAgICAodXRpbHMkMS5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxudmFyIHJlc29sdmVDb25maWcgPSAoY29uZmlnKSA9PiB7XG4gIGNvbnN0IG5ld0NvbmZpZyA9IG1lcmdlQ29uZmlnKHt9LCBjb25maWcpO1xuXG4gIGxldCB7ZGF0YSwgd2l0aFhTUkZUb2tlbiwgeHNyZkhlYWRlck5hbWUsIHhzcmZDb29raWVOYW1lLCBoZWFkZXJzLCBhdXRofSA9IG5ld0NvbmZpZztcblxuICBuZXdDb25maWcuaGVhZGVycyA9IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKGhlYWRlcnMpO1xuXG4gIG5ld0NvbmZpZy51cmwgPSBidWlsZFVSTChidWlsZEZ1bGxQYXRoKG5ld0NvbmZpZy5iYXNlVVJMLCBuZXdDb25maWcudXJsKSwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuXG4gIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgaWYgKGF1dGgpIHtcbiAgICBoZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICtcbiAgICAgIGJ0b2EoKGF1dGgudXNlcm5hbWUgfHwgJycpICsgJzonICsgKGF1dGgucGFzc3dvcmQgPyB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYXV0aC5wYXNzd29yZCkpIDogJycpKVxuICAgICk7XG4gIH1cblxuICBsZXQgY29udGVudFR5cGU7XG5cbiAgaWYgKHV0aWxzJDEuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgfHwgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKHVuZGVmaW5lZCk7IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9IGVsc2UgaWYgKChjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSkgIT09IGZhbHNlKSB7XG4gICAgICAvLyBmaXggc2VtaWNvbG9uIGR1cGxpY2F0aW9uIGlzc3VlIGZvciBSZWFjdE5hdGl2ZSBGb3JtRGF0YSBpbXBsZW1lbnRhdGlvblxuICAgICAgY29uc3QgW3R5cGUsIC4uLnRva2Vuc10gPSBjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JykubWFwKHRva2VuID0+IHRva2VuLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogW107XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKFt0eXBlIHx8ICdtdWx0aXBhcnQvZm9ybS1kYXRhJywgLi4udG9rZW5zXS5qb2luKCc7ICcpKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIHdpdGhYU1JGVG9rZW4gJiYgdXRpbHMkMS5pc0Z1bmN0aW9uKHdpdGhYU1JGVG9rZW4pICYmICh3aXRoWFNSRlRva2VuID0gd2l0aFhTUkZUb2tlbihuZXdDb25maWcpKTtcblxuICAgIGlmICh3aXRoWFNSRlRva2VuIHx8ICh3aXRoWFNSRlRva2VuICE9PSBmYWxzZSAmJiBpc1VSTFNhbWVPcmlnaW4obmV3Q29uZmlnLnVybCkpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIGNvbnN0IHhzcmZWYWx1ZSA9IHhzcmZIZWFkZXJOYW1lICYmIHhzcmZDb29raWVOYW1lICYmIGNvb2tpZXMucmVhZCh4c3JmQ29va2llTmFtZSk7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgaGVhZGVycy5zZXQoeHNyZkhlYWRlck5hbWUsIHhzcmZWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0NvbmZpZztcbn07XG5cbmNvbnN0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCc7XG5cbnZhciB4aHJBZGFwdGVyID0gaXNYSFJBZGFwdGVyU3VwcG9ydGVkICYmIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBjb25zdCBfY29uZmlnID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuICAgIGxldCByZXF1ZXN0RGF0YSA9IF9jb25maWcuZGF0YTtcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oX2NvbmZpZy5oZWFkZXJzKS5ub3JtYWxpemUoKTtcbiAgICBsZXQge3Jlc3BvbnNlVHlwZSwgb25VcGxvYWRQcm9ncmVzcywgb25Eb3dubG9hZFByb2dyZXNzfSA9IF9jb25maWc7XG4gICAgbGV0IG9uQ2FuY2VsZWQ7XG4gICAgbGV0IHVwbG9hZFRocm90dGxlZCwgZG93bmxvYWRUaHJvdHRsZWQ7XG4gICAgbGV0IGZsdXNoVXBsb2FkLCBmbHVzaERvd25sb2FkO1xuXG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGZsdXNoVXBsb2FkICYmIGZsdXNoVXBsb2FkKCk7IC8vIGZsdXNoIGV2ZW50c1xuICAgICAgZmx1c2hEb3dubG9hZCAmJiBmbHVzaERvd25sb2FkKCk7IC8vIGZsdXNoIGV2ZW50c1xuXG4gICAgICBfY29uZmlnLmNhbmNlbFRva2VuICYmIF9jb25maWcuY2FuY2VsVG9rZW4udW5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG5cbiAgICAgIF9jb25maWcuc2lnbmFsICYmIF9jb25maWcuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgfVxuXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHJlcXVlc3Qub3BlbihfY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBfY29uZmlnLnVybCwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IF9jb25maWcudGltZW91dDtcblxuICAgIGZ1bmN0aW9uIG9ubG9hZGVuZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgY29uc3QgcmVzcG9uc2VIZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShcbiAgICAgICAgJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCAmJiByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCByZXNwb25zZVR5cGUgPT09ICdqc29uJyA/XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShmdW5jdGlvbiBfcmVzb2x2ZSh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgZnVuY3Rpb24gX3JlamVjdChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCdvbmxvYWRlbmQnIGluIHJlcXVlc3QpIHtcbiAgICAgIC8vIFVzZSBvbmxvYWRlbmQgaWYgYXZhaWxhYmxlXG4gICAgICByZXF1ZXN0Lm9ubG9hZGVuZCA9IG9ubG9hZGVuZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZSB0byBlbXVsYXRlIG9ubG9hZGVuZFxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlYWR5c3RhdGUgaGFuZGxlciBpcyBjYWxsaW5nIGJlZm9yZSBvbmVycm9yIG9yIG9udGltZW91dCBoYW5kbGVycyxcbiAgICAgICAgLy8gc28gd2Ugc2hvdWxkIGNhbGwgb25sb2FkZW5kIG9uIHRoZSBuZXh0ICd0aWNrJ1xuICAgICAgICBzZXRUaW1lb3V0KG9ubG9hZGVuZCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICBsZXQgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBfY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnIDogJ3RpbWVvdXQgZXhjZWVkZWQnO1xuICAgICAgY29uc3QgdHJhbnNpdGlvbmFsID0gX2NvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBpZiAoX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgcmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCAmJiByZXF1ZXN0SGVhZGVycy5zZXRDb250ZW50VHlwZShudWxsKTtcblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscyQxLmZvckVhY2gocmVxdWVzdEhlYWRlcnMudG9KU09OKCksIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzJDEuaXNVbmRlZmluZWQoX2NvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhX2NvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChyZXNwb25zZVR5cGUgJiYgcmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gX2NvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmIChvbkRvd25sb2FkUHJvZ3Jlc3MpIHtcbiAgICAgIChbZG93bmxvYWRUaHJvdHRsZWQsIGZsdXNoRG93bmxvYWRdID0gcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKSk7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZG93bmxvYWRUaHJvdHRsZWQpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKG9uVXBsb2FkUHJvZ3Jlc3MgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIChbdXBsb2FkVGhyb3R0bGVkLCBmbHVzaFVwbG9hZF0gPSBwcm9ncmVzc0V2ZW50UmVkdWNlcihvblVwbG9hZFByb2dyZXNzKSk7XG5cbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgdXBsb2FkVGhyb3R0bGVkKTtcblxuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVuZCcsIGZsdXNoVXBsb2FkKTtcbiAgICB9XG5cbiAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbiB8fCBfY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBjYW5jZWwgPT4ge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KCFjYW5jZWwgfHwgY2FuY2VsLnR5cGUgPyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcsIHJlcXVlc3QpIDogY2FuY2VsKTtcbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgX2NvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IF9jb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKF9jb25maWcudXJsKTtcblxuICAgIGlmIChwcm90b2NvbCAmJiBwbGF0Zm9ybS5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjb21wb3NlU2lnbmFscyA9IChzaWduYWxzLCB0aW1lb3V0KSA9PiB7XG4gIGxldCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gIGxldCBhYm9ydGVkO1xuXG4gIGNvbnN0IG9uYWJvcnQgPSBmdW5jdGlvbiAoY2FuY2VsKSB7XG4gICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICBjb25zdCBlcnIgPSBjYW5jZWwgaW5zdGFuY2VvZiBFcnJvciA/IGNhbmNlbCA6IHRoaXMucmVhc29uO1xuICAgICAgY29udHJvbGxlci5hYm9ydChlcnIgaW5zdGFuY2VvZiBBeGlvc0Vycm9yID8gZXJyIDogbmV3IENhbmNlbGVkRXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IGVycikpO1xuICAgIH1cbiAgfTtcblxuICBsZXQgdGltZXIgPSB0aW1lb3V0ICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIG9uYWJvcnQobmV3IEF4aW9zRXJyb3IoYHRpbWVvdXQgJHt0aW1lb3V0fSBvZiBtcyBleGNlZWRlZGAsIEF4aW9zRXJyb3IuRVRJTUVET1VUKSk7XG4gIH0sIHRpbWVvdXQpO1xuXG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4ge1xuICAgIGlmIChzaWduYWxzKSB7XG4gICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgc2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XG4gICAgICAgIHNpZ25hbCAmJlxuICAgICAgICAoc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIgPyBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KSA6IHNpZ25hbC51bnN1YnNjcmliZShvbmFib3J0KSk7XG4gICAgICB9KTtcbiAgICAgIHNpZ25hbHMgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICBzaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4gc2lnbmFsICYmIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyICYmIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpKTtcblxuICBjb25zdCB7c2lnbmFsfSA9IGNvbnRyb2xsZXI7XG5cbiAgc2lnbmFsLnVuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG5cbiAgcmV0dXJuIFtzaWduYWwsICgpID0+IHtcbiAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRpbWVyID0gbnVsbDtcbiAgfV07XG59O1xuXG52YXIgY29tcG9zZVNpZ25hbHMkMSA9IGNvbXBvc2VTaWduYWxzO1xuXG5jb25zdCBzdHJlYW1DaHVuayA9IGZ1bmN0aW9uKiAoY2h1bmssIGNodW5rU2l6ZSkge1xuICBsZXQgbGVuID0gY2h1bmsuYnl0ZUxlbmd0aDtcblxuICBpZiAoIWNodW5rU2l6ZSB8fCBsZW4gPCBjaHVua1NpemUpIHtcbiAgICB5aWVsZCBjaHVuaztcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcG9zID0gMDtcbiAgbGV0IGVuZDtcblxuICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgZW5kID0gcG9zICsgY2h1bmtTaXplO1xuICAgIHlpZWxkIGNodW5rLnNsaWNlKHBvcywgZW5kKTtcbiAgICBwb3MgPSBlbmQ7XG4gIH1cbn07XG5cbmNvbnN0IHJlYWRCeXRlcyA9IGFzeW5jIGZ1bmN0aW9uKiAoaXRlcmFibGUsIGNodW5rU2l6ZSwgZW5jb2RlKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgaXRlcmFibGUpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoQXJyYXlCdWZmZXIuaXNWaWV3KGNodW5rKSA/IGNodW5rIDogKGF3YWl0IGVuY29kZShTdHJpbmcoY2h1bmspKSksIGNodW5rU2l6ZSk7XG4gIH1cbn07XG5cbmNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCwgZW5jb2RlKSA9PiB7XG4gIGNvbnN0IGl0ZXJhdG9yID0gcmVhZEJ5dGVzKHN0cmVhbSwgY2h1bmtTaXplLCBlbmNvZGUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG4gIGxldCBkb25lO1xuICBsZXQgX29uRmluaXNoID0gKGUpID0+IHtcbiAgICBpZiAoIWRvbmUpIHtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgb25GaW5pc2ggJiYgb25GaW5pc2goZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oe1xuICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IGl0ZXJhdG9yLm5leHQoKTtcblxuICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgX29uRmluaXNoKCk7XG4gICAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsZW4gPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgICBpZiAob25Qcm9ncmVzcykge1xuICAgICAgICAgIGxldCBsb2FkZWRCeXRlcyA9IGJ5dGVzICs9IGxlbjtcbiAgICAgICAgICBvblByb2dyZXNzKGxvYWRlZEJ5dGVzKTtcbiAgICAgICAgfVxuICAgICAgICBjb250cm9sbGVyLmVucXVldWUobmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfb25GaW5pc2goZXJyKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH0sXG4gICAgY2FuY2VsKHJlYXNvbikge1xuICAgICAgX29uRmluaXNoKHJlYXNvbik7XG4gICAgICByZXR1cm4gaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgfVxuICB9LCB7XG4gICAgaGlnaFdhdGVyTWFyazogMlxuICB9KVxufTtcblxuY29uc3QgaXNGZXRjaFN1cHBvcnRlZCA9IHR5cGVvZiBmZXRjaCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgUmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgUmVzcG9uc2UgPT09ICdmdW5jdGlvbic7XG5jb25zdCBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkID0gaXNGZXRjaFN1cHBvcnRlZCAmJiB0eXBlb2YgUmVhZGFibGVTdHJlYW0gPT09ICdmdW5jdGlvbic7XG5cbi8vIHVzZWQgb25seSBpbnNpZGUgdGhlIGZldGNoIGFkYXB0ZXJcbmNvbnN0IGVuY29kZVRleHQgPSBpc0ZldGNoU3VwcG9ydGVkICYmICh0eXBlb2YgVGV4dEVuY29kZXIgPT09ICdmdW5jdGlvbicgP1xuICAgICgoZW5jb2RlcikgPT4gKHN0cikgPT4gZW5jb2Rlci5lbmNvZGUoc3RyKSkobmV3IFRleHRFbmNvZGVyKCkpIDpcbiAgICBhc3luYyAoc3RyKSA9PiBuZXcgVWludDhBcnJheShhd2FpdCBuZXcgUmVzcG9uc2Uoc3RyKS5hcnJheUJ1ZmZlcigpKVxuKTtcblxuY29uc3QgdGVzdCA9IChmbiwgLi4uYXJncykgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiAhIWZuKC4uLmFyZ3MpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn07XG5cbmNvbnN0IHN1cHBvcnRzUmVxdWVzdFN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiYgdGVzdCgoKSA9PiB7XG4gIGxldCBkdXBsZXhBY2Nlc3NlZCA9IGZhbHNlO1xuXG4gIGNvbnN0IGhhc0NvbnRlbnRUeXBlID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgYm9keTogbmV3IFJlYWRhYmxlU3RyZWFtKCksXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgZ2V0IGR1cGxleCgpIHtcbiAgICAgIGR1cGxleEFjY2Vzc2VkID0gdHJ1ZTtcbiAgICAgIHJldHVybiAnaGFsZic7XG4gICAgfSxcbiAgfSkuaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpO1xuXG4gIHJldHVybiBkdXBsZXhBY2Nlc3NlZCAmJiAhaGFzQ29udGVudFR5cGU7XG59KTtcblxuY29uc3QgREVGQVVMVF9DSFVOS19TSVpFID0gNjQgKiAxMDI0O1xuXG5jb25zdCBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtID0gaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJlxuICB0ZXN0KCgpID0+IHV0aWxzJDEuaXNSZWFkYWJsZVN0cmVhbShuZXcgUmVzcG9uc2UoJycpLmJvZHkpKTtcblxuXG5jb25zdCByZXNvbHZlcnMgPSB7XG4gIHN0cmVhbTogc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAoKHJlcykgPT4gcmVzLmJvZHkpXG59O1xuXG5pc0ZldGNoU3VwcG9ydGVkICYmICgoKHJlcykgPT4ge1xuICBbJ3RleHQnLCAnYXJyYXlCdWZmZXInLCAnYmxvYicsICdmb3JtRGF0YScsICdzdHJlYW0nXS5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICFyZXNvbHZlcnNbdHlwZV0gJiYgKHJlc29sdmVyc1t0eXBlXSA9IHV0aWxzJDEuaXNGdW5jdGlvbihyZXNbdHlwZV0pID8gKHJlcykgPT4gcmVzW3R5cGVdKCkgOlxuICAgICAgKF8sIGNvbmZpZykgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgUmVzcG9uc2UgdHlwZSAnJHt0eXBlfScgaXMgbm90IHN1cHBvcnRlZGAsIEF4aW9zRXJyb3IuRVJSX05PVF9TVVBQT1JULCBjb25maWcpO1xuICAgICAgfSk7XG4gIH0pO1xufSkobmV3IFJlc3BvbnNlKSk7XG5cbmNvbnN0IGdldEJvZHlMZW5ndGggPSBhc3luYyAoYm9keSkgPT4ge1xuICBpZiAoYm9keSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZih1dGlscyQxLmlzQmxvYihib2R5KSkge1xuICAgIHJldHVybiBib2R5LnNpemU7XG4gIH1cblxuICBpZih1dGlscyQxLmlzU3BlY0NvbXBsaWFudEZvcm0oYm9keSkpIHtcbiAgICByZXR1cm4gKGF3YWl0IG5ldyBSZXF1ZXN0KGJvZHkpLmFycmF5QnVmZmVyKCkpLmJ5dGVMZW5ndGg7XG4gIH1cblxuICBpZih1dGlscyQxLmlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpIHx8IHV0aWxzJDEuaXNBcnJheUJ1ZmZlcihib2R5KSkge1xuICAgIHJldHVybiBib2R5LmJ5dGVMZW5ndGg7XG4gIH1cblxuICBpZih1dGlscyQxLmlzVVJMU2VhcmNoUGFyYW1zKGJvZHkpKSB7XG4gICAgYm9keSA9IGJvZHkgKyAnJztcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNTdHJpbmcoYm9keSkpIHtcbiAgICByZXR1cm4gKGF3YWl0IGVuY29kZVRleHQoYm9keSkpLmJ5dGVMZW5ndGg7XG4gIH1cbn07XG5cbmNvbnN0IHJlc29sdmVCb2R5TGVuZ3RoID0gYXN5bmMgKGhlYWRlcnMsIGJvZHkpID0+IHtcbiAgY29uc3QgbGVuZ3RoID0gdXRpbHMkMS50b0Zpbml0ZU51bWJlcihoZWFkZXJzLmdldENvbnRlbnRMZW5ndGgoKSk7XG5cbiAgcmV0dXJuIGxlbmd0aCA9PSBudWxsID8gZ2V0Qm9keUxlbmd0aChib2R5KSA6IGxlbmd0aDtcbn07XG5cbnZhciBmZXRjaEFkYXB0ZXIgPSBpc0ZldGNoU3VwcG9ydGVkICYmIChhc3luYyAoY29uZmlnKSA9PiB7XG4gIGxldCB7XG4gICAgdXJsLFxuICAgIG1ldGhvZCxcbiAgICBkYXRhLFxuICAgIHNpZ25hbCxcbiAgICBjYW5jZWxUb2tlbixcbiAgICB0aW1lb3V0LFxuICAgIG9uRG93bmxvYWRQcm9ncmVzcyxcbiAgICBvblVwbG9hZFByb2dyZXNzLFxuICAgIHJlc3BvbnNlVHlwZSxcbiAgICBoZWFkZXJzLFxuICAgIHdpdGhDcmVkZW50aWFscyA9ICdzYW1lLW9yaWdpbicsXG4gICAgZmV0Y2hPcHRpb25zXG4gIH0gPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG5cbiAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlID8gKHJlc3BvbnNlVHlwZSArICcnKS50b0xvd2VyQ2FzZSgpIDogJ3RleHQnO1xuXG4gIGxldCBbY29tcG9zZWRTaWduYWwsIHN0b3BUaW1lb3V0XSA9IChzaWduYWwgfHwgY2FuY2VsVG9rZW4gfHwgdGltZW91dCkgP1xuICAgIGNvbXBvc2VTaWduYWxzJDEoW3NpZ25hbCwgY2FuY2VsVG9rZW5dLCB0aW1lb3V0KSA6IFtdO1xuXG4gIGxldCBmaW5pc2hlZCwgcmVxdWVzdDtcblxuICBjb25zdCBvbkZpbmlzaCA9ICgpID0+IHtcbiAgICAhZmluaXNoZWQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb21wb3NlZFNpZ25hbCAmJiBjb21wb3NlZFNpZ25hbC51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuXG4gICAgZmluaXNoZWQgPSB0cnVlO1xuICB9O1xuXG4gIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICB0cnkge1xuICAgIGlmIChcbiAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MgJiYgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmIG1ldGhvZCAhPT0gJ2dldCcgJiYgbWV0aG9kICE9PSAnaGVhZCcgJiZcbiAgICAgIChyZXF1ZXN0Q29udGVudExlbmd0aCA9IGF3YWl0IHJlc29sdmVCb2R5TGVuZ3RoKGhlYWRlcnMsIGRhdGEpKSAhPT0gMFxuICAgICkge1xuICAgICAgbGV0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICBkdXBsZXg6IFwiaGFsZlwiXG4gICAgICB9KTtcblxuICAgICAgbGV0IGNvbnRlbnRUeXBlSGVhZGVyO1xuXG4gICAgICBpZiAodXRpbHMkMS5pc0Zvcm1EYXRhKGRhdGEpICYmIChjb250ZW50VHlwZUhlYWRlciA9IF9yZXF1ZXN0LmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkpIHtcbiAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChfcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBwcm9ncmVzc0V2ZW50RGVjb3JhdG9yKFxuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKGFzeW5jRGVjb3JhdG9yKG9uVXBsb2FkUHJvZ3Jlc3MpKVxuICAgICAgICApO1xuXG4gICAgICAgIGRhdGEgPSB0cmFja1N0cmVhbShfcmVxdWVzdC5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uUHJvZ3Jlc3MsIGZsdXNoLCBlbmNvZGVUZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXV0aWxzJDEuaXNTdHJpbmcod2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgd2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzID8gJ2luY2x1ZGUnIDogJ29taXQnO1xuICAgIH1cblxuICAgIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIHtcbiAgICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICAgIHNpZ25hbDogY29tcG9zZWRTaWduYWwsXG4gICAgICBtZXRob2Q6IG1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgaGVhZGVyczogaGVhZGVycy5ub3JtYWxpemUoKS50b0pTT04oKSxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICBkdXBsZXg6IFwiaGFsZlwiLFxuICAgICAgY3JlZGVudGlhbHM6IHdpdGhDcmVkZW50aWFsc1xuICAgIH0pO1xuXG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCk7XG5cbiAgICBjb25zdCBpc1N0cmVhbVJlc3BvbnNlID0gc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAocmVzcG9uc2VUeXBlID09PSAnc3RyZWFtJyB8fCByZXNwb25zZVR5cGUgPT09ICdyZXNwb25zZScpO1xuXG4gICAgaWYgKHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKG9uRG93bmxvYWRQcm9ncmVzcyB8fCBpc1N0cmVhbVJlc3BvbnNlKSkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG4gICAgICBbJ3N0YXR1cycsICdzdGF0dXNUZXh0JywgJ2hlYWRlcnMnXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBvcHRpb25zW3Byb3BdID0gcmVzcG9uc2VbcHJvcF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcmVzcG9uc2VDb250ZW50TGVuZ3RoID0gdXRpbHMkMS50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG5cbiAgICAgIGNvbnN0IFtvblByb2dyZXNzLCBmbHVzaF0gPSBvbkRvd25sb2FkUHJvZ3Jlc3MgJiYgcHJvZ3Jlc3NFdmVudERlY29yYXRvcihcbiAgICAgICAgcmVzcG9uc2VDb250ZW50TGVuZ3RoLFxuICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihhc3luY0RlY29yYXRvcihvbkRvd25sb2FkUHJvZ3Jlc3MpLCB0cnVlKVxuICAgICAgKSB8fCBbXTtcblxuICAgICAgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoXG4gICAgICAgIHRyYWNrU3RyZWFtKHJlc3BvbnNlLmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25Qcm9ncmVzcywgKCkgPT4ge1xuICAgICAgICAgIGZsdXNoICYmIGZsdXNoKCk7XG4gICAgICAgICAgaXNTdHJlYW1SZXNwb25zZSAmJiBvbkZpbmlzaCgpO1xuICAgICAgICB9LCBlbmNvZGVUZXh0KSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgfHwgJ3RleHQnO1xuXG4gICAgbGV0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc29sdmVyc1t1dGlscyQxLmZpbmRLZXkocmVzb2x2ZXJzLCByZXNwb25zZVR5cGUpIHx8ICd0ZXh0J10ocmVzcG9uc2UsIGNvbmZpZyk7XG5cbiAgICAhaXNTdHJlYW1SZXNwb25zZSAmJiBvbkZpbmlzaCgpO1xuXG4gICAgc3RvcFRpbWVvdXQgJiYgc3RvcFRpbWVvdXQoKTtcblxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgaGVhZGVyczogQXhpb3NIZWFkZXJzJDEuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgb25GaW5pc2goKTtcblxuICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9mZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCksXG4gICAgICAgIHtcbiAgICAgICAgICBjYXVzZTogZXJyLmNhdXNlIHx8IGVyclxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QpO1xuICB9XG59KTtcblxuY29uc3Qga25vd25BZGFwdGVycyA9IHtcbiAgaHR0cDogaHR0cEFkYXB0ZXIsXG4gIHhocjogeGhyQWRhcHRlcixcbiAgZmV0Y2g6IGZldGNoQWRhcHRlclxufTtcblxudXRpbHMkMS5mb3JFYWNoKGtub3duQWRhcHRlcnMsIChmbiwgdmFsdWUpID0+IHtcbiAgaWYgKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ25hbWUnLCB7dmFsdWV9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7dmFsdWV9KTtcbiAgfVxufSk7XG5cbmNvbnN0IHJlbmRlclJlYXNvbiA9IChyZWFzb24pID0+IGAtICR7cmVhc29ufWA7XG5cbmNvbnN0IGlzUmVzb2x2ZWRIYW5kbGUgPSAoYWRhcHRlcikgPT4gdXRpbHMkMS5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbnZhciBhZGFwdGVycyA9IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscyQxLmlzQXJyYXkoYWRhcHRlcnMpID8gYWRhcHRlcnMgOiBbYWRhcHRlcnNdO1xuXG4gICAgY29uc3Qge2xlbmd0aH0gPSBhZGFwdGVycztcbiAgICBsZXQgbmFtZU9yQWRhcHRlcjtcbiAgICBsZXQgYWRhcHRlcjtcblxuICAgIGNvbnN0IHJlamVjdGVkUmVhc29ucyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgICAgbGV0IGlkO1xuXG4gICAgICBhZGFwdGVyID0gbmFtZU9yQWRhcHRlcjtcblxuICAgICAgaWYgKCFpc1Jlc29sdmVkSGFuZGxlKG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICAgIGFkYXB0ZXIgPSBrbm93bkFkYXB0ZXJzWyhpZCA9IFN0cmluZyhuYW1lT3JBZGFwdGVyKSkudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKGFkYXB0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBVbmtub3duIGFkYXB0ZXIgJyR7aWR9J2ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGFwdGVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZWplY3RlZFJlYXNvbnNbaWQgfHwgJyMnICsgaV0gPSBhZGFwdGVyO1xuICAgIH1cblxuICAgIGlmICghYWRhcHRlcikge1xuXG4gICAgICBjb25zdCByZWFzb25zID0gT2JqZWN0LmVudHJpZXMocmVqZWN0ZWRSZWFzb25zKVxuICAgICAgICAubWFwKChbaWQsIHN0YXRlXSkgPT4gYGFkYXB0ZXIgJHtpZH0gYCArXG4gICAgICAgICAgKHN0YXRlID09PSBmYWxzZSA/ICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudCcgOiAnaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGQnKVxuICAgICAgICApO1xuXG4gICAgICBsZXQgcyA9IGxlbmd0aCA/XG4gICAgICAgIChyZWFzb25zLmxlbmd0aCA+IDEgPyAnc2luY2UgOlxcbicgKyByZWFzb25zLm1hcChyZW5kZXJSZWFzb24pLmpvaW4oJ1xcbicpIDogJyAnICsgcmVuZGVyUmVhc29uKHJlYXNvbnNbMF0pKSA6XG4gICAgICAgICdhcyBubyBhZGFwdGVyIHNwZWNpZmllZCc7XG5cbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gc3VpdGFibGUgYWRhcHRlciB0byBkaXNwYXRjaCB0aGUgcmVxdWVzdCBgICsgcyxcbiAgICAgICAgJ0VSUl9OT1RfU1VQUE9SVCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkYXB0ZXI7XG4gIH0sXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzXG59O1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbmZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShjb25maWcuaGVhZGVycyk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzJDEuYWRhcHRlcik7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICBjb25maWcsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICByZXNwb25zZVxuICAgICk7XG5cbiAgICByZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShyZXNwb25zZS5oZWFkZXJzKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59XG5cbmNvbnN0IFZFUlNJT04gPSBcIjEuNy40XCI7XG5cbmNvbnN0IHZhbGlkYXRvcnMkMSA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9ycyQxW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxuY29uc3QgZGVwcmVjYXRlZFdhcm5pbmdzID0ge307XG5cbi8qKlxuICogVHJhbnNpdGlvbmFsIG9wdGlvbiB2YWxpZGF0b3JcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMkMS50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtib29sZWFuP30gYWxsb3dVbmtub3duXG4gKlxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBjb25zdCBvcHQgPSBrZXlzW2ldO1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IHNjaGVtYVtvcHRdO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0aW9ucyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb24gJyArIG9wdCArICcgbXVzdCBiZSAnICsgcmVzdWx0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYWxsb3dVbmtub3duICE9PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignVW5rbm93biBvcHRpb24gJyArIG9wdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTik7XG4gICAgfVxuICB9XG59XG5cbnZhciB2YWxpZGF0b3IgPSB7XG4gIGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnMkMVxufTtcblxuY29uc3QgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5jbGFzcyBBeGlvcyB7XG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlciQxKCksXG4gICAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlciQxKClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teTtcblxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15ID0ge30pIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZHVtbXkuc3RhY2sgPyBkdW1teS5zdGFjay5yZXBsYWNlKC9eLitcXG4vLCAnJykgOiAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWVyci5zdGFjaykge1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gc3RhY2s7XG4gICAgICAgICAgICAvLyBtYXRjaCB3aXRob3V0IHRoZSAyIHRvcCBzdGFjayBsaW5lc1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhY2sgJiYgIVN0cmluZyhlcnIuc3RhY2spLmVuZHNXaXRoKHN0YWNrLnJlcGxhY2UoL14uK1xcbi4rXFxuLywgJycpKSkge1xuICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2s7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaWdub3JlIHRoZSBjYXNlIHdoZXJlIFwic3RhY2tcIiBpcyBhbiB1bi13cml0YWJsZSBwcm9wZXJ0eVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBfcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICAgIGlmICh0eXBlb2YgY29uZmlnT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICAgIH1cblxuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBjb25zdCB7dHJhbnNpdGlvbmFsLCBwYXJhbXNTZXJpYWxpemVyLCBoZWFkZXJzfSA9IGNvbmZpZztcblxuICAgIGlmICh0cmFuc2l0aW9uYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnModHJhbnNpdGlvbmFsLCB7XG4gICAgICAgIHNpbGVudEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBmb3JjZWRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgY2xhcmlmeVRpbWVvdXRFcnJvcjogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKVxuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXNTZXJpYWxpemVyICE9IG51bGwpIHtcbiAgICAgIGlmICh1dGlscyQxLmlzRnVuY3Rpb24ocGFyYW1zU2VyaWFsaXplcikpIHtcbiAgICAgICAgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIgPSB7XG4gICAgICAgICAgc2VyaWFsaXplOiBwYXJhbXNTZXJpYWxpemVyXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhwYXJhbXNTZXJpYWxpemVyLCB7XG4gICAgICAgICAgZW5jb2RlOiB2YWxpZGF0b3JzLmZ1bmN0aW9uLFxuICAgICAgICAgIHNlcmlhbGl6ZTogdmFsaWRhdG9ycy5mdW5jdGlvblxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICAgIGNvbmZpZy5tZXRob2QgPSAoY29uZmlnLm1ldGhvZCB8fCB0aGlzLmRlZmF1bHRzLm1ldGhvZCB8fCAnZ2V0JykudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICAgIGxldCBjb250ZXh0SGVhZGVycyA9IGhlYWRlcnMgJiYgdXRpbHMkMS5tZXJnZShcbiAgICAgIGhlYWRlcnMuY29tbW9uLFxuICAgICAgaGVhZGVyc1tjb25maWcubWV0aG9kXVxuICAgICk7XG5cbiAgICBoZWFkZXJzICYmIHV0aWxzJDEuZm9yRWFjaChcbiAgICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgICAgKG1ldGhvZCkgPT4ge1xuICAgICAgICBkZWxldGUgaGVhZGVyc1ttZXRob2RdO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmNvbmNhdChjb250ZXh0SGVhZGVycywgaGVhZGVycyk7XG5cbiAgICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gICAgY29uc3QgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICBsZXQgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgbGV0IHByb21pc2U7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsZW47XG5cbiAgICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgICAgY29uc3QgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LmJpbmQodGhpcyksIHVuZGVmaW5lZF07XG4gICAgICBjaGFpbi51bnNoaWZ0LmFwcGx5KGNoYWluLCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBjaGFpbi5wdXNoLmFwcGx5KGNoYWluLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgbGVuID0gY2hhaW4ubGVuZ3RoO1xuXG4gICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW5baSsrXSwgY2hhaW5baSsrXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIGxlbiA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIGxldCBuZXdDb25maWcgPSBjb25maWc7XG5cbiAgICBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuICB9XG59XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMkMS5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzJDEuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cblxuICBmdW5jdGlvbiBnZW5lcmF0ZUhUVFBNZXRob2QoaXNGb3JtKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGh0dHBNZXRob2QodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogaXNGb3JtID8ge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcbiAgICAgICAgfSA6IHt9LFxuICAgICAgICB1cmwsXG4gICAgICAgIGRhdGFcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBnZW5lcmF0ZUhUVFBNZXRob2QoKTtcblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbn0pO1xuXG52YXIgQXhpb3MkMSA9IEF4aW9zO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxUb2tlbn1cbiAqL1xuY2xhc3MgQ2FuY2VsVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbihjYW5jZWwgPT4ge1xuICAgICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgIGxldCBpID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIHRva2VuLl9saXN0ZW5lcnNbaV0oY2FuY2VsKTtcbiAgICAgIH1cbiAgICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbiA9IG9uZnVsZmlsbGVkID0+IHtcbiAgICAgIGxldCBfcmVzb2x2ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAgICovXG4gIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gICAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gICAqL1xuICBzdGF0aWMgc291cmNlKCkge1xuICAgIGxldCBjYW5jZWw7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgICAgY2FuY2VsID0gYztcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW4sXG4gICAgICBjYW5jZWxcbiAgICB9O1xuICB9XG59XG5cbnZhciBDYW5jZWxUb2tlbiQxID0gQ2FuY2VsVG9rZW47XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMkMS5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuXG5jb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxufTtcblxuT2JqZWN0LmVudHJpZXMoSHR0cFN0YXR1c0NvZGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICBIdHRwU3RhdHVzQ29kZVt2YWx1ZV0gPSBrZXk7XG59KTtcblxudmFyIEh0dHBTdGF0dXNDb2RlJDEgPSBIdHRwU3RhdHVzQ29kZTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm5zIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICBjb25zdCBjb250ZXh0ID0gbmV3IEF4aW9zJDEoZGVmYXVsdENvbmZpZyk7XG4gIGNvbnN0IGluc3RhbmNlID0gYmluZChBeGlvcyQxLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscyQxLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MkMS5wcm90b3R5cGUsIGNvbnRleHQsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzJDEuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMkMSk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcyQxO1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbGVkRXJyb3IgPSBDYW5jZWxlZEVycm9yO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSBDYW5jZWxUb2tlbiQxO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycyQxO1xuXG5heGlvcy5mb3JtVG9KU09OID0gdGhpbmcgPT4gZm9ybURhdGFUb0pTT04odXRpbHMkMS5pc0hUTUxGb3JtKHRoaW5nKSA/IG5ldyBGb3JtRGF0YSh0aGluZykgOiB0aGluZyk7XG5cbmF4aW9zLmdldEFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyO1xuXG5heGlvcy5IdHRwU3RhdHVzQ29kZSA9IEh0dHBTdGF0dXNDb2RlJDE7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF4aW9zLmNqcy5tYXBcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbGliL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIkRvbWFpbiIsImRhdGEiLCJyZWNlaXZpbmciLCJzZW5kaW5nIiwibmFtZSIsInJlcXVpcmVfdGxzIiwic2tpcF92ZXJpZmljYXRpb24iLCJzdGF0ZSIsIndpbGRjYXJkIiwic3BhbV9hY3Rpb24iLCJjcmVhdGVkX2F0Iiwic210cF9wYXNzd29yZCIsInNtdHBfbG9naW4iLCJ0eXBlIiwicmVjZWl2aW5nX2Ruc19yZWNvcmRzIiwic2VuZGluZ19kbnNfcmVjb3JkcyIsImR5bmFtaWNLZXlzIiwiZHluYW1pY1Byb3BlcnRpZXMiLCJyZWR1Y2UiLCJhY2MiLCJwcm9wZXJ0eU5hbWUiLCJwcm9wIiwiT2JqZWN0IiwiYXNzaWduIiwidXJsX2pvaW5fMSIsIl9faW1wb3J0RGVmYXVsdCIsInJlcXVpcmUiLCJFcnJvcl8xIiwiZG9tYWluXzEiLCJEb21haW5zQ2xpZW50IiwicmVxdWVzdCIsImRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IiwiZG9tYWluVGVtcGxhdGVzQ2xpZW50IiwiZG9tYWluVGFnc0NsaWVudCIsImRvbWFpbkNyZWRlbnRpYWxzIiwiZG9tYWluVGVtcGxhdGVzIiwiZG9tYWluVGFncyIsInByb3RvdHlwZSIsIl9oYW5kbGVCb29sVmFsdWVzIiwicHJvcHNGb3JSZXBsYWNlbWVudCIsInJlcGxhY2VkUHJvcHMiLCJrZXlzIiwia2V5IiwidmFsdWUiLCJ0b1N0cmluZyIsIl9fYXNzaWduIiwiX3BhcnNlTWVzc2FnZSIsInJlc3BvbnNlIiwiYm9keSIsInBhcnNlRG9tYWluTGlzdCIsIml0ZW1zIiwibWFwIiwiaXRlbSIsImRlZmF1bHQiLCJfcGFyc2VEb21haW4iLCJkb21haW4iLCJfcGFyc2VUcmFja2luZ1NldHRpbmdzIiwidHJhY2tpbmciLCJfcGFyc2VUcmFja2luZ1VwZGF0ZSIsImxpc3QiLCJxdWVyeSIsIl90aGlzIiwiZ2V0IiwidGhlbiIsInJlcyIsImNvbmNhdCIsImNyZWF0ZSIsInBvc3RPYmoiLCJwb3N0V2l0aEZEIiwidXBkYXRlIiwicHV0RGF0YSIsInB1dFdpdGhGRCIsInZlcmlmeSIsInB1dCIsImRlc3Ryb3kiLCJkZWxldGUiLCJnZXRDb25uZWN0aW9uIiwiY29ubmVjdGlvbiIsInVwZGF0ZUNvbm5lY3Rpb24iLCJnZXRUcmFja2luZyIsInVwZGF0ZVRyYWNraW5nIiwiYWN0aXZlIiwiZ2V0VXNlckRhdGFFcnJvciIsImdldElwcyIsIl9hIiwiYXNzaWduSXAiLCJpcCIsImRlbGV0ZUlwIiwibGlua0lwUG9vbCIsInBvb2xJZCIsInBvb2xfaWQiLCJ1bmxpbmtJcFBvbGwiLCJyZXBsYWNlbWVudCIsInNlYXJjaFBhcmFtcyIsInVwZGF0ZURLSU1BdXRob3JpdHkiLCJzZWxmIiwidXBkYXRlREtJTVNlbGVjdG9yIiwiZGtpbVNlbGVjdG9yIiwidXBkYXRlV2ViUHJlZml4Iiwid2ViUHJlZml4IiwiRG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJiYXNlUm91dGUiLCJfcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QiLCJ0b3RhbENvdW50IiwidG90YWxfY291bnQiLCJfcGFyc2VNZXNzYWdlUmVzcG9uc2UiLCJyZXN1bHQiLCJzdGF0dXMiLCJtZXNzYWdlIiwiX3BhcnNlRGVsZXRlZFJlc3BvbnNlIiwic3BlYyIsImNyZWRlbnRpYWxzTG9naW4iLCJOYXZpZ2F0aW9uVGhydVBhZ2VzXzEiLCJEb21haW5UYWciLCJ0YWdJbmZvIiwidGFnIiwiZGVzY3JpcHRpb24iLCJEYXRlIiwiZXhwb3J0cyIsIkRvbWFpblRhZ1N0YXRpc3RpYyIsInRhZ1N0YXRpc3RpY0luZm8iLCJzdGFydCIsImVuZCIsInJlc29sdXRpb24iLCJzdGF0cyIsInN0YXQiLCJ0aW1lIiwiRG9tYWluVGFnc0NsaWVudCIsIl9zdXBlciIsIl9fZXh0ZW5kcyIsImNhbGwiLCJwYXJzZUxpc3QiLCJwYWdlcyIsInBhcnNlUGFnZUxpbmtzIiwiX3BhcnNlVGFnU3RhdGlzdGljIiwicmVxdWVzdExpc3RXaXRoUGFnZXMiLCJzdGF0aXN0aWMiLCJjb3VudHJpZXMiLCJwcm92aWRlcnMiLCJkZXZpY2VzIiwiRG9tYWluVGVtcGxhdGVJdGVtIiwiZG9tYWluVGVtcGxhdGVGcm9tQVBJIiwiY3JlYXRlZEF0IiwiY3JlYXRlZEJ5IiwiaWQiLCJ2ZXJzaW9uIiwidmVyc2lvbnMiLCJsZW5ndGgiLCJEb21haW5UZW1wbGF0ZXNDbGllbnQiLCJwYXJzZUNyZWF0aW9uUmVzcG9uc2UiLCJ0ZW1wbGF0ZSIsInBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UiLCJwYXJzZU11dGF0aW9uUmVzcG9uc2UiLCJ0ZW1wbGF0ZU5hbWUiLCJwYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlIiwicGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZSIsInRlbXBsYXRlVmVyc2lvbiIsImQiLCJwYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zIiwiZGVzdHJveUFsbCIsImNyZWF0ZVZlcnNpb24iLCJnZXRWZXJzaW9uIiwidXBkYXRlVmVyc2lvbiIsImRlc3Ryb3lWZXJzaW9uIiwibGlzdFZlcnNpb25zIiwiRXZlbnRDbGllbnQiLCJJcFBvb2xzQ2xpZW50IiwicGFyc2VJcFBvb2xzUmVzcG9uc2UiLCJzZW50IiwicGF0Y2hXaXRoRkQiLCJJcHNDbGllbnQiLCJwYXJzZUlwc1Jlc3BvbnNlIiwiSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCIsInBhdGgiLCJhdHRyaWJ1dGVOYW1lIiwiSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCIsInN1cHBvcnRlZF9maWx0ZXJzIiwiSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCIsImF0dHJpYnV0ZXMiLCJmaWx0ZXJzIiwic2hhcmluZyIsImxvZ2dlciIsImNvbnNvbGUiLCJjb252ZXJ0RGF0ZVRvVVRDIiwiaW5wdXREYXRlIiwid2FybiIsInRvSVNPU3RyaW5nIiwicHJlcGFyZVF1ZXJ5RGF0YSIsInF1ZXJ5RGF0YSIsInByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQiLCJib3giLCJoYW5kbGVkU2VlZExpc3REYXRlcyIsInVwZGF0ZWRfYXQiLCJzaGFyaW5nX2V4cGlyZXNfYXQiLCJCb3giLCJsYXN0X3Jlc3VsdF9hdCIsIklEIiwiaW5ib3hQbGFjZW1lbnRzUmVzdWx0IiwiSWQiLCJpbmJveFBsYWNlbWVudFJlc3VsdCIsImdldFJlc3VsdEJ5U2hhcmVJZCIsInNoYXJlSWQiLCJJUFJTaGFyaW5nQ2xpZW50IiwicHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmciLCJleHBpcmVzX2F0IiwiZW5hYmxlZCIsIlNlZWRzTGlzdHNDbGllbnQiLCJwcmVwYXJlUmVzdWx0Iiwic2VlZExpc3QiLCJwcmVwYXJlU2VlZExpc3QiLCJzZWVkcyIsIlNlZWRzIiwic2VlZEl0ZW0iLCJzZWVkIiwiaGFuZGxlZFNlZWREYXRlcyIsIm1heF9lbWFpbF9jb3VudF9oaXRfYXQiLCJsYXN0X3NlbnRfdG9fYXQiLCJsYXN0X2RlbGl2ZXJlZF9hdCIsInVwZGF0ZWRTZWVkc0xpc3QiLCJzZWVkbGlzdCIsIkluYm94UGxhY2VtZW50c0NsaWVudCIsInNlZWRzTGlzdHNDbGllbnQiLCJyZXN1bHRzIiwic2VlZHNMaXN0cyIsInJ1blRlc3QiLCJwb3N0IiwiSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IiwiaGFuZGxlZFByb3ZpZGVyRGF0ZXMiLCJSZXF1ZXN0XzEiLCJkb21haW5zQ2xpZW50XzEiLCJFdmVudHNfMSIsIlN0YXRzQ2xpZW50XzEiLCJTdXBwcmVzc2lvbnNDbGllbnRfMSIsIldlYmhvb2tzXzEiLCJNZXNzYWdlc18xIiwiUm91dGVzXzEiLCJ2YWxpZGF0ZV8xIiwiSVBzXzEiLCJJUFBvb2xzXzEiLCJtYWlsaW5nTGlzdHNfMSIsIm1haWxMaXN0TWVtYmVyc18xIiwiZG9tYWluc0NyZWRlbnRpYWxzXzEiLCJtdWx0aXBsZVZhbGlkYXRpb25fMSIsImRvbWFpbnNUZW1wbGF0ZXNfMSIsImRvbWFpbnNUYWdzXzEiLCJTdWJhY2NvdW50c18xIiwiU2VlZHNMaXN0c0NsaWVudF8xIiwiaW5ib3hQbGFjZW1lbnRzXzEiLCJJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50XzEiLCJBdHRyaWJ1dGVzQ2xpZW50XzEiLCJGaWx0ZXJzQ2xpZW50XzEiLCJJbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudF8xIiwiSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzXzEiLCJNYWlsZ3VuQ2xpZW50Iiwib3B0aW9ucyIsImZvcm1EYXRhIiwiY29uZmlnIiwidXJsIiwidXNlcm5hbWUiLCJFcnJvciIsIm1haWxMaXN0c01lbWJlcnMiLCJtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJJbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudCIsInNlZWRzTGlzdHNBdHRyaWJ1dGVzIiwicmVzdWx0c0F0dHJpYnV0ZXNDbGllbnQiLCJzZWVkc0xpc3RzRmlsdGVyc0NsaWVudCIsInJlc3VsdHNGaWx0ZXJzQ2xpZW50IiwiaW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCIsImluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCIsImRvbWFpbnMiLCJ3ZWJob29rcyIsImV2ZW50cyIsInN1cHByZXNzaW9ucyIsIm1lc3NhZ2VzIiwicm91dGVzIiwiaXBzIiwiaXBfcG9vbHMiLCJsaXN0cyIsInZhbGlkYXRlIiwic3ViYWNjb3VudHMiLCJpbmJveF9wbGFjZW1lbnRzIiwic2V0U3ViYWNjb3VudCIsInN1YmFjY291bnRJZCIsInNldFN1YmFjY291bnRIZWFkZXIiLCJyZXNldFN1YmFjY291bnQiLCJyZXNldFN1YmFjY291bnRIZWFkZXIiLCJNYWlsTGlzdHNNZW1iZXJzIiwiY2hlY2tBbmRVcGRhdGVEYXRhIiwibmV3RGF0YSIsInZhcnMiLCJKU09OIiwic3RyaW5naWZ5Iiwic3Vic2NyaWJlZCIsImxpc3RNZW1iZXJzIiwibWFpbExpc3RBZGRyZXNzIiwiZ2V0TWVtYmVyIiwibWFpbExpc3RNZW1iZXJBZGRyZXNzIiwibWVtYmVyIiwiY3JlYXRlTWVtYmVyIiwicmVxRGF0YSIsImNyZWF0ZU1lbWJlcnMiLCJtZW1iZXJzIiwiQXJyYXkiLCJpc0FycmF5IiwidXBzZXJ0IiwidXBkYXRlTWVtYmVyIiwiZGVzdHJveU1lbWJlciIsIk1haWxpbmdMaXN0c0NsaWVudCIsInBhcnNlVmFsaWRhdGlvblJlc3VsdCIsInZhbGlkYXRpb25SZXN1bHQiLCJjYW5jZWxWYWxpZGF0aW9uIiwiTWVzc2FnZXNDbGllbnQiLCJwcmVwYXJlQm9vbGVhblZhbHVlcyIsInllc05vUHJvcGVydGllcyIsIlNldCIsImhhcyIsIl9wYXJzZVJlc3BvbnNlIiwibW9kaWZpZWREYXRhIiwiUm91dGVzQ2xpZW50Iiwicm91dGUiLCJTdGF0c0NvbnRhaW5lcl8xIiwiU3RhdHNDbGllbnQiLCJ0b1VUQ1N0cmluZyIsInByZXBhcmVTZWFyY2hQYXJhbXMiLCJlbnRyaWVzIiwiYXJyYXlXaXRoUGFpcnMiLCJjdXJyZW50UGFpciIsInJlcGVhdGVkUHJvcGVydHkiLCJfX3NwcmVhZEFycmF5IiwicHVzaCIsInBhcnNlU3RhdHMiLCJnZXREb21haW4iLCJnZXRBY2NvdW50IiwiU3RhdHNDb250YWluZXIiLCJTdWJhY2NvdW50c0NsaWVudCIsImVuYWJsZSIsImRpc2FibGUiLCJTVUJBQ0NPVU5UX0hFQURFUiIsIkVudW1zXzEiLCJTdXBwcmVzc2lvbl8xIiwiQm91bmNlIiwiU3VwcHJlc3Npb25Nb2RlbHMiLCJCT1VOQ0VTIiwiYWRkcmVzcyIsImNvZGUiLCJlcnJvciIsIkNvbXBsYWludCIsIkNPTVBMQUlOVFMiLCJTdXBwcmVzc2lvbiIsIkJvdW5jZV8xIiwiQ29tcGxhaW50XzEiLCJVbnN1YnNjcmliZV8xIiwiV2hpdGVMaXN0XzEiLCJjcmVhdGVPcHRpb25zIiwiaGVhZGVycyIsIlN1cHByZXNzaW9uQ2xpZW50IiwibW9kZWxzIiwiYm91bmNlcyIsImNvbXBsYWludHMiLCJ1bnN1YnNjcmliZXMiLCJ3aGl0ZWxpc3RzIiwiTW9kZWwiLCJfcGFyc2VJdGVtIiwiY3JlYXRlV2hpdGVMaXN0IiwiaXNEYXRhQXJyYXkiLCJwcmVwYXJlUmVzcG9uc2UiLCJjcmVhdGVVbnN1YnNjcmliZSIsImlzQ29udGFpbnNUYWciLCJzb21lIiwidW5zdWJzY3JpYmUiLCJ0YWdzIiwiZ2V0TW9kZWwiLCJtb2RlbCIsImVuY29kZVVSSUNvbXBvbmVudCIsInBvc3REYXRhIiwibW9kdWxlIiwiVW5zdWJzY3JpYmUiLCJVTlNVQlNDUklCRVMiLCJXaGl0ZUxpc3QiLCJXSElURUxJU1RTIiwicmVhc29uIiwiQXR0YWNobWVudHNIYW5kbGVyXzEiLCJNdWx0aXBsZVZhbGlkYXRpb25Kb2IiLCJyZXNwb25zZVN0YXR1c0NvZGUiLCJxdWFudGl0eSIsInJlY29yZHNQcm9jZXNzZWQiLCJyZWNvcmRzX3Byb2Nlc3NlZCIsImRvd25sb2FkX3VybCIsImRvd25sb2FkVXJsIiwiY3N2IiwianNvbiIsIl9iIiwic3VtbWFyeSIsImNhdGNoQWxsIiwiY2F0Y2hfYWxsIiwiZGVsaXZlcmFibGUiLCJkb05vdFNlbmQiLCJkb19ub3Rfc2VuZCIsInVuZGVsaXZlcmFibGUiLCJ1bmtub3duIiwicmlzayIsImhpZ2giLCJsb3ciLCJtZWRpdW0iLCJNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJhdHRhY2htZW50c0hhbmRsZXIiLCJoYW5kbGVSZXNwb25zZSIsImpvYnMiLCJqb2IiLCJ0b3RhbCIsImxpc3RJZCIsImNvbnZlcnRUb0V4cGVjdGVkU2hhcGUiLCJtdWx0aXBsZVZhbGlkYXRpb25EYXRhIiwiaXNCdWZmZXIiLCJmaWxlIiwibXVsdGlwbGVWYWxpZGF0aW9uRmlsZSIsImlzU3RyZWFtIiwiVmFsaWRhdGVDbGllbnQiLCJtdWx0aXBsZVZhbGlkYXRpb24iLCJXZWJob29rIiwidXJscyIsIldlYmhvb2tzQ2xpZW50IiwiX3BhcnNlV2ViaG9va0xpc3QiLCJfcGFyc2VXZWJob29rV2l0aElEIiwid2ViaG9va1Jlc3BvbnNlIiwid2ViaG9vayIsInVuZGVmaW5lZCIsIl9wYXJzZVdlYmhvb2tUZXN0IiwidGVzdCIsInVybFZhbHVlcyIsIkJsb2JGcm9tU3RyZWFtIiwic3RyZWFtIiwic2l6ZSIsIl9zdHJlYW0iLCJkZWZpbmVQcm9wZXJ0eSIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiQXR0YWNobWVudHNIYW5kbGVyIiwiZ2V0QXR0YWNobWVudE9wdGlvbnMiLCJmaWxlbmFtZSIsImNvbnRlbnRUeXBlIiwia25vd25MZW5ndGgiLCJnZXRGaWxlSW5mbyIsImdldEN1c3RvbUZpbGVJbmZvIiwiZ2V0QnVmZmVySW5mbyIsImJ1ZmZlciIsImJ5dGVMZW5ndGgiLCJwaXBlIiwiaXNDdXN0b21GaWxlIiwib2JqIiwiaXNCcm93c2VyRmlsZSIsIkJsb2IiLCJCdWZmZXIiLCJnZXRBdHRhY2htZW50SW5mbyIsImF0dGFjaG1lbnQiLCJpc1N0cmluZyIsImNvbnZlcnRUb0ZEZXhwZWN0ZWRTaGFwZSIsInVzZXJQcm92aWRlZFZhbHVlIiwiZ2V0QmxvYkZyb21TdHJlYW0iLCJBUElFcnJvciIsInN0YXR1c1RleHQiLCJib2R5TWVzc2FnZSIsInN0YWNrIiwiZGV0YWlscyIsIkZvcm1EYXRhQnVpbGRlciIsIkZvcm1EYXRhQ29uc3RydWN0b3IiLCJmaWxlS2V5cyIsImNyZWF0ZUZvcm1EYXRhIiwiZmlsdGVyIiwiZm9ybURhdGFBY2MiLCJpbmNsdWRlcyIsImF0dGFjaG1lbnRWYWx1ZSIsImlzTWVzc2FnZUF0dGFjaG1lbnQiLCJhZGRGaWxlc1RvRkQiLCJtZXNzYWdlVmFsdWUiLCJpc01JTUUiLCJhZGRNaW1lRGF0YVRvRkQiLCJhZGRDb21tb25Qcm9wZXJ0eVRvRkQiLCJmb3JtRGF0YUluc3RhbmNlIiwiYXBwZW5kIiwiaXNGb3JtRGF0YVBhY2thZ2UiLCJub2RlRm9ybURhdGEiLCJicm93c2VyRm9ybURhdGEiLCJibG9iSW5zdGFuY2UiLCJSZWFkYWJsZVN0cmVhbSIsImdldEhlYWRlcnMiLCJGaWxlIiwiZXZlcnkiLCJhcHBlbmRGaWxlVG9GRCIsIm9yaWdpbmFsS2V5Iiwib2JqRGF0YSIsImZkIiwiZnJvbSIsImJsb2IiLCJzZXQiLCJmb3JFYWNoIiwiYWRkVmFsdWVCYXNlZE9uRkQiLCJmZEtleSIsImZkVmFsdWUiLCJOYXZpZ2F0aW9uVGhydVBhZ2VzIiwicGFyc2VQYWdlIiwicGFnZVVybCIsInVybFNlcGFyYXRvciIsIml0ZXJhdG9yTmFtZSIsInBhcnNlZFVybCIsIlVSTCIsInBhZ2VWYWx1ZSIsInNwbGl0IiwicG9wIiwiaXRlcmF0b3JQb3NpdGlvbiIsInBhZ2UiLCJwYWdpbmciLCJ1cGRhdGVVcmxBbmRRdWVyeSIsImNsaWVudFVybCIsInF1ZXJ5Q29weSIsInVwZGF0ZWRRdWVyeSIsImJhc2U2NCIsIl9faW1wb3J0U3RhciIsImF4aW9zXzEiLCJGb3JtRGF0YUJ1aWxkZXJfMSIsIlJlcXVlc3QiLCJ0aW1lb3V0IiwibWFrZUhlYWRlcnNGcm9tT2JqZWN0IiwiZm9ybURhdGFCdWlsZGVyIiwibWF4Qm9keUxlbmd0aCIsInByb3h5IiwibWV0aG9kIiwib25DYWxsT3B0aW9ucyIsInJlcXVlc3RIZWFkZXJzIiwiam9pbkFuZFRyYW5zZm9ybUhlYWRlcnMiLCJwYXJhbXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiVVJMU2VhcmNoUGFyYW1zIiwidXJsVmFsdWUiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsIl9kIiwiZXJyb3JSZXNwb25zZSIsImVycl8xIiwiX2MiLCJnZXRSZXNwb25zZUJvZHkiLCJBeGlvc0hlYWRlcnMiLCJiYXNpYyIsImVuY29kZSIsInNldEF1dGhvcml6YXRpb24iLCJyZWNlaXZlZE9uQ2FsbEhlYWRlcnMiLCJvbkNhbGxIZWFkZXJzIiwiaGVhZGVyc09iamVjdCIsImhlYWRlcnNBY2N1bXVsYXRvciIsImNvbW1hbmQiLCJhZGREZWZhdWx0SGVhZGVycyIsInJlcXVlc3RPcHRpb25zIiwiUmVzb2x1dGlvbiIsIldlYmhvb2tzSWRzIiwiWWVzTm8iLCJfX2V4cG9ydFN0YXIiLCJNYWlsZ3VuQ2xpZW50XzEiLCJFbnVtcyIsIkludGVyZmFjZXMiLCJNYWlsZ3VuIiwiRm9ybURhdGEiLCJjbGllbnQiXSwic291cmNlUm9vdCI6IiJ9