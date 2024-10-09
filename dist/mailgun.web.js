/*! mailgun.js v10.2.3 */
/*! mailgun.js v10.2.3 */
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
// Axios v1.7.2 Copyright (c) 2024 Matt Zabriskie and contributors


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
  const threshold = 1000 / freq;
  let timer = null;
  return function throttled() {
    const force = this === true;

    const now = Date.now();
    if (force || now - timestamp > threshold) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timestamp = now;
      return fn.apply(null, arguments);
    }
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        timestamp = Date.now();
        return fn.apply(null, arguments);
      }, threshold - (now - timestamp));
    }
  };
}

var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
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
      lengthComputable: total != null
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  }, freq);
};

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
    let {responseType} = _config;
    let onCanceled;
    function done() {
      if (_config.cancelToken) {
        _config.cancelToken.unsubscribe(onCanceled);
      }

      if (_config.signal) {
        _config.signal.removeEventListener('abort', onCanceled);
      }
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

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, _config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, _config, request));

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
        _config,
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
    if (typeof _config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(_config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof _config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(_config.onUploadProgress));
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

  return new ReadableStream({
    type: 'bytes',

    async pull(controller) {
      const {done, value} = await iterator.next();

      if (done) {
        controller.close();
        onFinish();
        return;
      }

      let len = value.byteLength;
      onProgress && onProgress(bytes += len);
      controller.enqueue(new Uint8Array(value));
    },
    cancel(reason) {
      onFinish(reason);
      return iterator.return();
    }
  }, {
    highWaterMark: 2
  })
};

const fetchProgressDecorator = (total, fn) => {
  const lengthComputable = total != null;
  return (loaded) => setTimeout(() => fn({
    lengthComputable,
    total,
    loaded
  }));
};

const isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function';

// used only inside the fetch adapter
const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
    ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
    async (str) => new Uint8Array(await new Response(str).arrayBuffer())
);

const supportsRequestStream = isReadableStreamSupported && (() => {
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
})();

const DEFAULT_CHUNK_SIZE = 64 * 1024;

const supportsResponseStream = isReadableStreamSupported && !!(()=> {
  try {
    return utils$1.isReadableStream(new Response('').body);
  } catch(err) {
    // return undefined
  }
})();

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

  if(utils$1.isArrayBufferView(body)) {
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
        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, fetchProgressDecorator(
          requestContentLength,
          progressEventReducer(onUploadProgress)
        ), null, encodeText);
      }
    }

    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? 'cors' : 'omit';
    }

    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      withCredentials
    });

    let response = await fetch(request);

    const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

    if (supportsResponseStream && (onDownloadProgress || isStreamResponse)) {
      const options = {};

      ['status', 'statusText', 'headers'].forEach(prop => {
        options[prop] = response[prop];
      });

      const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));

      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onDownloadProgress && fetchProgressDecorator(
          responseContentLength,
          progressEventReducer(onDownloadProgress, true)
        ), isStreamResponse && onFinish, encodeText),
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

const VERSION = "1.7.2";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYSw0QkFBNEI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsVUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFO0FBQ2hFO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQixtQkFBbUI7QUFDOUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG9EQUFvRCxNQUFNO0FBQzFELG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLFdBQVcsU0FBUztBQUNwQjtBQUNBLGFBQWEsR0FBRztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEI7QUFDQSxhQUFhLGVBQWU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckIsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLEtBQUs7QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLFFBQVE7QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBdUM7QUFDdkMsS0FBSzs7QUFFTDtBQUNBLDBEQUEwRCx3QkFBd0I7QUFDbEY7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1RUFBdUUsV0FBVzs7QUFFbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQyxTQUFTO0FBQzFDLE1BQU07QUFDTiw2QkFBNkI7QUFDN0IsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDOztBQUVsQyxPQUFPLG9FQUFvRTs7QUFFM0U7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekMsTUFBTTtBQUNOO0FBQ0Esa0VBQWtFO0FBQ2xFLGdGQUFnRjtBQUNoRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsY0FBYztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0MsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUyxRQUFROztBQUVqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGFBQWEsYUFBYTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLEtBQUs7QUFDcEQsT0FBTztBQUNQLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtB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QTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1VFSkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW4udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zQ3JlZGVudGlhbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RhZ3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RlbXBsYXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRXZlbnRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JUFBvb2xzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JUHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9BdHRyaWJ1dGVzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvRmlsdGVyc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9pbmJveFBsYWNlbWVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NYWlsaW5nTGlzdHMvbWFpbExpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NZXNzYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvUm91dGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdGF0cy9TdGF0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3RhdHMvU3RhdHNDb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1YmFjY291bnRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvQm91bmNlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvQ29tcGxhaW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvU3VwcHJlc3Npb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbnNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9VbnN1YnNjcmliZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1doaXRlTGlzdC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9WYWxpZGF0aW9ucy92YWxpZGF0ZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvV2ViaG9va3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9BdHRhY2htZW50c0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9FcnJvci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvY29tbW9uL0Zvcm1EYXRhQnVpbGRlci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9SZXF1ZXN0LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvRW51bXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0NvbW1vbi9Mb2dnZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0NvbW1vbi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9Eb21haW5DcmVkZW50aWFscy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9Eb21haW5UYWdzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Eb21haW5zL0RvbWFpblRlbXBsYXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9Eb21haW5zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Eb21haW5zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9FdmVudENsaWVudC9JRXZlbnRDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0V2ZW50Q2xpZW50L2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JUFBvb2xzL0lJUFBvb2xzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JUFBvb2xzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JUHMvSUlQc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSVBzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvQXR0cmlidXRlc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL0ZpbHRlcnNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9JbmJveFBsYWNlbWVudHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01haWxndW5DbGllbnQvSU1haWxndW5DbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01haWxndW5DbGllbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cy9NYWlsaW5nTGlzdE1lbWJlcnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cy9NYWlsaW5nTGlzdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWVzc2FnZXMvSU1lc3NhZ2VzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NZXNzYWdlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvUm91dGVzL0lSb3V0ZXNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1JvdXRlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3RhdHMvU3RhdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N0YXRzL1N0YXRzQ29udGFpbmVyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdGF0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3ViYWNjb3VudHMvSVN1YmFjY291bnRzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdWJhY2NvdW50cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zL0JvdW5jZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zL0NvbXBsYWludC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zL0lTdXBwcmVzc2lvbnNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9VbnN1YnNjcmliZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zL1doaXRlTGlzdC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9WYWxpZGF0aW9ucy9NdWx0aXBsZVZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1ZhbGlkYXRpb25zL1ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1ZhbGlkYXRpb25zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9XZWJob29rcy9JV2ViSG9va3NDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1dlYmhvb2tzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9BcGlSZXNwb25zZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9FcnJvci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9Gb3JtRGF0YS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvQ29tbW9uL1JlcXVlc3RPcHRpb25zLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvQ29tbW9uL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRG9tYWlucy9Eb21haW5DcmVkZW50aWFscy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWluVGFncy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWluVGVtcGxhdGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRG9tYWlucy9Eb21haW5UcmFja2luZy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWlucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9FdmVudHMvRXZlbnRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRXZlbnRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvSVBQb29scy9JcFBvb2xzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvSVBQb29scy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0lQcy9JUHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9JUHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NYWlsZ3VuQ2xpZW50L01haWxndW5DbGllbnRPcHRpb25zLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWFpbGd1bkNsaWVudC9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxpbmdMaXN0cy9NYWlsaW5nTGlzdE1lbWJlcnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWFpbGluZ0xpc3RzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWVzc2FnZXMvTWVzc2FnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NZXNzYWdlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1JvdXRlcy9Sb3V0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Sb3V0ZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdGF0cy9TdGF0cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N0YXRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3ViYWNjb3VudHMvU3ViYWNjb3VudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdWJhY2NvdW50cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9Cb3VuY2UudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvQ29tcGxhaW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9ucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9VbnN1YnNjcmliZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9XaGl0ZUxpc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9WYWxpZGF0aW9ucy9NdWx0aXBsZVZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9WYWxpZGF0aW9ucy9WYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvVmFsaWRhdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9XZWJob29rcy9XZWJob29rcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1dlYmhvb2tzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2Jhc2UtNjQvYmFzZTY0LmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvZGlzdC9icm93c2VyL2F4aW9zLmNqcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEROU1JlY29yZCxcbiAgRG9tYWluRGF0YSxcbiAgRG9tYWluU2hvcnREYXRhLFxuICBURG9tYWluXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbiBpbXBsZW1lbnRzIFREb21haW4ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgc3RhdGU6IHN0cmluZztcbiAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gIHNwYW1fYWN0aW9uOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICBzbXRwX2xvZ2luOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgaWQ/OiBzdHJpbmc7XG4gIGlzX2Rpc2FibGVkPzogYm9vbGVhbjtcbiAgd2ViX3ByZWZpeD86IHN0cmluZztcbiAgd2ViX3NjaGVtZT86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBkYXRhOiBEb21haW5TaG9ydERhdGEgfCBEb21haW5EYXRhLFxuICAgIHJlY2VpdmluZz86IEROU1JlY29yZFtdIHwgbnVsbCxcbiAgICBzZW5kaW5nPzogRE5TUmVjb3JkW10gfCBudWxsXG4gICkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLnJlcXVpcmVfdGxzID0gZGF0YS5yZXF1aXJlX3RscztcbiAgICB0aGlzLnNraXBfdmVyaWZpY2F0aW9uID0gZGF0YS5za2lwX3ZlcmlmaWNhdGlvbjtcbiAgICB0aGlzLnN0YXRlID0gZGF0YS5zdGF0ZTtcbiAgICB0aGlzLndpbGRjYXJkID0gZGF0YS53aWxkY2FyZDtcbiAgICB0aGlzLnNwYW1fYWN0aW9uID0gZGF0YS5zcGFtX2FjdGlvbjtcbiAgICB0aGlzLmNyZWF0ZWRfYXQgPSBkYXRhLmNyZWF0ZWRfYXQ7XG4gICAgdGhpcy5zbXRwX3Bhc3N3b3JkID0gZGF0YS5zbXRwX3Bhc3N3b3JkO1xuICAgIHRoaXMuc210cF9sb2dpbiA9IGRhdGEuc210cF9sb2dpbjtcbiAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGU7XG4gICAgdGhpcy5yZWNlaXZpbmdfZG5zX3JlY29yZHMgPSByZWNlaXZpbmcgfHwgbnVsbDtcbiAgICB0aGlzLnNlbmRpbmdfZG5zX3JlY29yZHMgPSBzZW5kaW5nIHx8IG51bGw7XG4gICAgLypcbiAgICAgIGRvbWFpbiBsaXN0IGhhcyBzaG9ydGVyIHJlc3BvbnNlIHRoZW4gZ2V0LCBjcmVhdGUsIGFuZCB1cGRhdGUgbWV0aG9kcy5cbiAgICAqL1xuXG4gICAgY29uc3QgZHluYW1pY0tleXM6IChrZXlvZiBEb21haW5EYXRhKVtdID0gWydpZCcsICdpc19kaXNhYmxlZCcsICd3ZWJfcHJlZml4JywgJ3dlYl9zY2hlbWUnXTtcblxuICAgIGNvbnN0IGR5bmFtaWNQcm9wZXJ0aWVzID0gZHluYW1pY0tleXMucmVkdWNlKChhY2MsIHByb3BlcnR5TmFtZSkgPT4ge1xuICAgICAgaWYgKHByb3BlcnR5TmFtZSBpbiBkYXRhKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0eU5hbWUgYXMga2V5b2YgRG9tYWluO1xuICAgICAgICBhY2NbcHJvcF0gPSAoZGF0YSBhcyBEb21haW5EYXRhKVtwcm9wZXJ0eU5hbWVdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBSZWNvcmQ8a2V5b2YgRG9tYWluLCBzdHJpbmcgfCBib29sZWFuPik7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkeW5hbWljUHJvcGVydGllcyk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7XG4gIElEb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gIElEb21haW5UYWdzQ2xpZW50LFxuICBJRG9tYWluQ3JlZGVudGlhbHMsXG4gIElEb21haW5zQ2xpZW50XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5cbmltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3InO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9kb21haW5zQ3JlZGVudGlhbHMnO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9kb21haW5zVGFncyc7XG5pbXBvcnQge1xuICBEZXN0cm95ZWREb21haW5SZXNwb25zZSxcbiAgTWVzc2FnZVJlc3BvbnNlLFxuICBEb21haW5MaXN0UmVzcG9uc2VEYXRhLFxuICBEb21haW5SZXNwb25zZURhdGEsXG4gIERvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIERvbWFpblRyYWNraW5nRGF0YSxcbiAgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSxcbiAgVXBkYXRlZE9wZW5UcmFja2luZyxcbiAgRG9tYWluc1F1ZXJ5LFxuICBEb21haW5JbmZvLFxuICBDb25uZWN0aW9uU2V0dGluZ3MsXG4gIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlLFxuICBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzLFxuICBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFJlcGxhY2VtZW50Rm9yUG9vbCxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlLFxuICBES0lNU2VsZWN0b3JJbmZvLFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFdlYlByZWZpeEluZm8sXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgVERvbWFpbixcbiAgRG9tYWluVXBkYXRlSW5mbyxcbiAgRG9tYWluVXBkYXRlSW5mb1JlcSxcbiAgRG9tYWluSW5mb1JlcSxcbiAgQm9vbFRvU3RyaW5nLFxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcbmltcG9ydCBEb21haW4gZnJvbSAnLi9kb21haW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5zQ2xpZW50IGltcGxlbWVudHMgSURvbWFpbnNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgZG9tYWluQ3JlZGVudGlhbHM6IElEb21haW5DcmVkZW50aWFscztcbiAgcHVibGljIGRvbWFpblRlbXBsYXRlczogSURvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgcHVibGljIGRvbWFpblRhZ3M6IElEb21haW5UYWdzQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ6IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LFxuICAgIGRvbWFpblRlbXBsYXRlc0NsaWVudDogRG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICAgIGRvbWFpblRhZ3NDbGllbnQ6IERvbWFpblRhZ3NDbGllbnRcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmRvbWFpbkNyZWRlbnRpYWxzID0gZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ7XG4gICAgdGhpcy5kb21haW5UZW1wbGF0ZXMgPSBkb21haW5UZW1wbGF0ZXNDbGllbnQ7XG4gICAgdGhpcy5kb21haW5UYWdzID0gZG9tYWluVGFnc0NsaWVudDtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUJvb2xWYWx1ZXMoXG4gICAgZGF0YTogRG9tYWluSW5mbyB8IERvbWFpblVwZGF0ZUluZm9cbiAgKTogRG9tYWluSW5mb1JlcSB8IERvbWFpblVwZGF0ZUluZm9SZXEge1xuICAgIGNvbnN0IHByb3BzRm9yUmVwbGFjZW1lbnQgPSBkYXRhIGFzIEJvb2xUb1N0cmluZztcbiAgICBjb25zdCByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IGtleSBhcyBrZXlvZiBCb29sVG9TdHJpbmc7XG4gICAgICBpZiAodHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdib29sZWFuJykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gYXMgYm9vbGVhbjtcbiAgICAgICAgYWNjW3Byb3BdID0gKHZhbHVlLnRvU3RyaW5nKCkgPT09ICd0cnVlJykgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBSZWNvcmQ8a2V5b2YgQm9vbFRvU3RyaW5nLCAndHJ1ZSd8ICdmYWxzZSc+KTtcbiAgICByZXR1cm4geyAuLi5kYXRhLCAuLi5yZXBsYWNlZFByb3BzIH0gYXMgRG9tYWluVXBkYXRlSW5mb1JlcSB8IERvbWFpbkluZm9SZXE7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZU1lc3NhZ2UocmVzcG9uc2U6IERlc3Ryb3llZERvbWFpblJlc3BvbnNlKSA6IE1lc3NhZ2VSZXNwb25zZSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlRG9tYWluTGlzdChyZXNwb25zZTogRG9tYWluTGlzdFJlc3BvbnNlRGF0YSk6IFREb21haW5bXSB7XG4gICAgaWYgKHJlc3BvbnNlLmJvZHkgJiYgcmVzcG9uc2UuYm9keS5pdGVtcykge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9tYWluKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluKHJlc3BvbnNlOiBEb21haW5SZXNwb25zZURhdGEpOiBURG9tYWluIHtcbiAgICByZXR1cm4gbmV3IERvbWFpbihcbiAgICAgIHJlc3BvbnNlLmJvZHkuZG9tYWluLFxuICAgICAgcmVzcG9uc2UuYm9keS5yZWNlaXZpbmdfZG5zX3JlY29yZHMsXG4gICAgICByZXNwb25zZS5ib2R5LnNlbmRpbmdfZG5zX3JlY29yZHNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1NldHRpbmdzKHJlc3BvbnNlOiBEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6IERvbWFpblRyYWNraW5nRGF0YSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkudHJhY2tpbmc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRyYWNraW5nVXBkYXRlKHJlc3BvbnNlOiBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6VXBkYXRlZE9wZW5UcmFja2luZyB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogRG9tYWluc1F1ZXJ5KTogUHJvbWlzZTxURG9tYWluW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2RvbWFpbnMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZURvbWFpbkxpc3QocmVzIGFzIERvbWFpbkxpc3RSZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZykgOiBQcm9taXNlPFREb21haW4+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL2RvbWFpbnMvJHtkb21haW59YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IERvbWFpbkluZm8pIDogUHJvbWlzZTxURG9tYWluPiB7XG4gICAgY29uc3QgcG9zdE9iaiA9IHRoaXMuX2hhbmRsZUJvb2xWYWx1ZXMoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvZG9tYWlucycsIHBvc3RPYmopXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgZGF0YTogRG9tYWluVXBkYXRlSW5mbykgOiBQcm9taXNlPFREb21haW4+IHtcbiAgICBjb25zdCBwdXREYXRhID0gdGhpcy5faGFuZGxlQm9vbFZhbHVlcyhkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgL3YzL2RvbWFpbnMvJHtkb21haW59YCwgcHV0RGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgdmVyaWZ5KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxURG9tYWluPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS92ZXJpZnlgKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxNZXNzYWdlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YzL2RvbWFpbnMvJHtkb21haW59YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlKHJlcyBhcyBEZXN0cm95ZWREb21haW5SZXNwb25zZSkpO1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbihkb21haW46IHN0cmluZyk6IFByb21pc2U8Q29ubmVjdGlvblNldHRpbmdzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9jb25uZWN0aW9uYClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlczpDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSkgPT4gcmVzLmJvZHkuY29ubmVjdGlvbiBhcyBDb25uZWN0aW9uU2V0dGluZ3MpO1xuICB9XG5cbiAgdXBkYXRlQ29ubmVjdGlvbihkb21haW46IHN0cmluZywgZGF0YTogQ29ubmVjdGlvblNldHRpbmdzKTogUHJvbWlzZTxVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9jb25uZWN0aW9uYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMpXG4gICAgICAudGhlbigocmVzOlVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MpO1xuICB9XG5cbiAgLy8gVHJhY2tpbmdcblxuICBnZXRUcmFja2luZyhkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpblRyYWNraW5nRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyk7XG4gIH1cblxuICB1cGRhdGVUcmFja2luZyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogT3BlblRyYWNraW5nSW5mbyB8IENsaWNrVHJhY2tpbmdJbmZvIHwgVW5zdWJzY3JpYmVUcmFja2luZ0luZm9cbiAgKTogUHJvbWlzZTxVcGRhdGVkT3BlblRyYWNraW5nPiB7XG4gICAgaWYgKHR5cGVvZiBkYXRhPy5hY3RpdmUgPT09ICdib29sZWFuJykge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignUmVjZWl2ZWQgYm9vbGVhbiB2YWx1ZSBmb3IgYWN0aXZlIHByb3BlcnR5JywgJ1Byb3BlcnR5IFwiYWN0aXZlXCIgbXVzdCBjb250YWluIHN0cmluZyB2YWx1ZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycsIHR5cGUpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZVRyYWNraW5nVXBkYXRlKHJlcyBhcyBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSk7XG4gIH1cblxuICAvLyBJUHNcblxuICBnZXRJcHMoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogQVBJUmVzcG9uc2UpID0+IHJlc3BvbnNlPy5ib2R5Py5pdGVtcyk7XG4gIH1cblxuICBhc3NpZ25JcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBpcCB9KTtcbiAgfVxuXG4gIGRlbGV0ZUlwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJywgaXApKTtcbiAgfVxuXG4gIGxpbmtJcFBvb2woZG9tYWluOiBzdHJpbmcsIHBvb2xJZDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IHBvb2xfaWQ6IHBvb2xJZCB9KTtcbiAgfVxuXG4gIHVubGlua0lwUG9sbChkb21haW46IHN0cmluZywgcmVwbGFjZW1lbnQ6IFJlcGxhY2VtZW50Rm9yUG9vbCk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gJyc7XG4gICAgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQgJiYgcmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1RvbyBtdWNoIGRhdGEgZm9yIHJlcGxhY2VtZW50JywgJ1BsZWFzZSBzcGVjaWZ5IGVpdGhlciBwb29sX2lkIG9yIGlwIChub3QgYm90aCknKTtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/cG9vbF9pZD0ke3JlcGxhY2VtZW50LnBvb2xfaWR9YDtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICBzZWFyY2hQYXJhbXMgPSBgP2lwPSR7cmVwbGFjZW1lbnQuaXB9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCAnaXBfcG9vbCcsIHNlYXJjaFBhcmFtcykpO1xuICB9XG5cbiAgdXBkYXRlREtJTUF1dGhvcml0eShkb21haW46IHN0cmluZywgZGF0YTogREtJTUF1dGhvcml0eUluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNQXV0aG9yaXR5PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX2F1dGhvcml0eWAsIHt9LCB7IHF1ZXJ5OiBgc2VsZj0ke2RhdGEuc2VsZn1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlcyA6IFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5KTtcbiAgfVxuXG4gIHVwZGF0ZURLSU1TZWxlY3Rvcihkb21haW46IHN0cmluZywgZGF0YTogREtJTVNlbGVjdG9ySW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX3NlbGVjdG9yYCwge30sIHsgcXVlcnk6IGBka2ltX3NlbGVjdG9yPSR7ZGF0YS5ka2ltU2VsZWN0b3J9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZVdlYlByZWZpeChkb21haW46IHN0cmluZywgZGF0YTogV2ViUHJlZml4SW5mbyk6IFByb21pc2U8VXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS93ZWJfcHJlZml4YCwge30sIHsgcXVlcnk6IGB3ZWJfcHJlZml4PSR7ZGF0YS53ZWJQcmVmaXh9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuaW1wb3J0IHsgSURvbWFpbkNyZWRlbnRpYWxzIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcbmltcG9ydCB7XG4gIERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhLFxuICBEb21haW5DcmVkZW50aWFsc0xpc3QsXG4gIENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSxcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQsXG4gIERlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlLFxuICBEb21haW5DcmVkZW50aWFsc1F1ZXJ5LFxuICBEb21haW5DcmVkZW50aWFscyxcbiAgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5DcmVkZW50aWFsc0NsaWVudCBpbXBsZW1lbnRzIElEb21haW5DcmVkZW50aWFscyB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My9kb21haW5zLyc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChcbiAgICByZXNwb25zZTogRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGFcbiAgKTogRG9tYWluQ3JlZGVudGlhbHNMaXN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IHJlc3BvbnNlLmJvZHkuaXRlbXMsXG4gICAgICB0b3RhbENvdW50OiByZXNwb25zZS5ib2R5LnRvdGFsX2NvdW50XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlTWVzc2FnZVJlc3BvbnNlKFxuICAgIHJlc3BvbnNlOiBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VcbiAgKTogRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgfSBhcyBEb21haW5DcmVkZW50aWFsc1Jlc3VsdDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEZWxldGVkUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6RGVsZXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VcbiAgKTogRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgc3BlYzogcmVzcG9uc2UuYm9keS5zcGVjXG4gICAgfSBhcyBEb21haW5DcmVkZW50aWFsc1Jlc3VsdDtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpbkNyZWRlbnRpYWxzUXVlcnkpOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy9jcmVkZW50aWFscycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QocmVzIGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhKVxuICAgICAgKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5DcmVkZW50aWFsc1xuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFsc2AsIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nLFxuICAgIGRhdGE6IFVwZGF0ZURvbWFpbkNyZWRlbnRpYWxzRGF0YVxuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzLyR7Y3JlZGVudGlhbHNMb2dpbn1gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFscy8ke2NyZWRlbnRpYWxzTG9naW59YClcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURlbGV0ZWRSZXNwb25zZShyZXMpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0LFxuICBJRG9tYWluVGFnc0NsaWVudFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgUmVzb2x1dGlvbiB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7XG4gIERvbWFpblRhZ3NJdGVtLFxuICBEb21haW5UYWdzSXRlbUluZm8sXG4gIERvbWFpblRhZ1N0YXRpc3RpY0l0ZW0sXG4gIERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0sXG4gIERvbWFpblRhZ3NMaXN0LFxuICBEb21haW5UYWdzUmVzcG9uc2VEYXRhLFxuICBEb21haW5UYWdzUXVlcnksXG4gIERvbWFpblRhZ3NNZXNzYWdlUmVzLFxuICBEb21haW5UYWdzU3RhdGlzdGljUXVlcnksXG4gIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ1Byb3ZpZGVyc0FQSVJlc3BvbnNlLFxuICBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ0RldmljZXNBUElSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZyBpbXBsZW1lbnRzIERvbWFpblRhZ3NJdGVtIHtcbiAgdGFnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICdmaXJzdC1zZWVuJzogRGF0ZTtcbiAgJ2xhc3Qtc2Vlbic6IERhdGU7XG5cbiAgY29uc3RydWN0b3IodGFnSW5mbzogRG9tYWluVGFnc0l0ZW1JbmZvKSB7XG4gICAgdGhpcy50YWcgPSB0YWdJbmZvLnRhZztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnSW5mby5kZXNjcmlwdGlvbjtcbiAgICB0aGlzWydmaXJzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydmaXJzdC1zZWVuJ10pO1xuICAgIHRoaXNbJ2xhc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snbGFzdC1zZWVuJ10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UYWdTdGF0aXN0aWMgaW1wbGVtZW50cyBJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0IHtcbiAgdGFnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHN0YXJ0OiBEYXRlO1xuICBlbmQ6IERhdGU7XG4gIHJlc29sdXRpb246IFJlc29sdXRpb247XG4gIHN0YXRzOiBEb21haW5UYWdTdGF0aXN0aWNJdGVtW107XG5cbiAgY29uc3RydWN0b3IodGFnU3RhdGlzdGljSW5mbzogRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlKSB7XG4gICAgdGhpcy50YWcgPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkudGFnO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuZGVzY3JpcHRpb247XG4gICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGFydCk7XG4gICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSh0YWdTdGF0aXN0aWNJbmZvLmJvZHkuZW5kKTtcbiAgICB0aGlzLnJlc29sdXRpb24gPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkucmVzb2x1dGlvbjtcbiAgICB0aGlzLnN0YXRzID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdDogRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0pIHtcbiAgICAgIGNvbnN0IHJlcyA9IHsgLi4uc3RhdCwgdGltZTogbmV3IERhdGUoc3RhdC50aW1lKSB9O1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5UYWdzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxEb21haW5UYWdzTGlzdD5cbiAgaW1wbGVtZW50cyBJRG9tYWluVGFnc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSxcbiAgKTogRG9tYWluVGFnc0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBEb21haW5UYWdzTGlzdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoKHRhZ0luZm86IERvbWFpblRhZ3NJdGVtSW5mbykgPT4gbmV3IERvbWFpblRhZyh0YWdJbmZvKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAndGFnJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRhZ1N0YXRpc3RpYyhcbiAgICByZXNwb25zZTogRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlXG4gICk6IElEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQge1xuICAgIHJldHVybiBuZXcgRG9tYWluVGFnU3RhdGlzdGljKHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGFnc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5UYWdzTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJyksIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGFnKHJlcy5ib2R5KVxuICAgICAgKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpLCBkZXNjcmlwdGlvbilcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnc01lc3NhZ2VSZXNcbiAgICAgICk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nXG4gICk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vdGFncy8ke3RhZ31gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IChcbiAgICAgICAge1xuICAgICAgICAgIG1lc3NhZ2U6IHJlcy5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgc3RhdHVzOiByZXMuc3RhdHVzXG4gICAgICAgIH0gYXMgRG9tYWluVGFnc01lc3NhZ2VSZXMpKTtcbiAgfVxuXG4gIHN0YXRpc3RpYyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcsIHF1ZXJ5OiBEb21haW5UYWdzU3RhdGlzdGljUXVlcnkpXG4gICAgOiBQcm9taXNlPERvbWFpblRhZ1N0YXRpc3RpYz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlVGFnU3RhdGlzdGljKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBjb3VudHJpZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9jb3VudHJpZXMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cblxuICBwcm92aWRlcnMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9wcm92aWRlcnMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdQcm92aWRlcnNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cblxuICBkZXZpY2VzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL2RldmljZXMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdEZXZpY2VzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvblxuICAgICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSxcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBEb21haW5UZW1wbGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlc1F1ZXJ5LFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGEsXG4gIERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGEsXG4gIEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZXNBUElSZXNwb25zZSxcbiAgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdCxcbiAgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZSxcbiAgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQsXG4gIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlLFxuICBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQsXG4gIE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlLFxuICBOb3RpZmljYXRpb25SZXN1bHQsXG4gIFNob3J0VGVtcGxhdGVWZXJzaW9uLFxuICBUZW1wbGF0ZVF1ZXJ5LFxuICBUZW1wbGF0ZVZlcnNpb24sXG4gIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdFxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IElEb21haW5UZW1wbGF0ZSwgSURvbWFpblRlbXBsYXRlc0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UZW1wbGF0ZUl0ZW0gaW1wbGVtZW50cyBJRG9tYWluVGVtcGxhdGUge1xuICBuYW1lIDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbiA6IHN0cmluZztcbiAgY3JlYXRlZEF0IDogRGF0ZSB8ICcnO1xuICBjcmVhdGVkQnkgOiBzdHJpbmc7XG4gIGlkIDogc3RyaW5nO1xuICB2ZXJzaW9uPzogVGVtcGxhdGVWZXJzaW9uO1xuICB2ZXJzaW9ucz86IFNob3J0VGVtcGxhdGVWZXJzaW9uW107XG5cbiAgY29uc3RydWN0b3IoZG9tYWluVGVtcGxhdGVGcm9tQVBJOiBJRG9tYWluVGVtcGxhdGUpIHtcbiAgICB0aGlzLm5hbWUgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkubmFtZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuY3JlYXRlZEF0ID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRBdCA/IG5ldyBEYXRlKGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQpIDogJyc7XG4gICAgdGhpcy5jcmVhdGVkQnkgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEJ5O1xuICAgIHRoaXMuaWQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuaWQ7XG5cbiAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24pIHtcbiAgICAgIHRoaXMudmVyc2lvbiA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uO1xuICAgICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCkge1xuICAgICAgICB0aGlzLnZlcnNpb24uY3JlYXRlZEF0ID0gbmV3IERhdGUoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24uY3JlYXRlZEF0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zICYmIGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMudmVyc2lvbnMgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMubWFwKCh2ZXJzaW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgLi4udmVyc2lvbiB9O1xuICAgICAgICByZXN1bHQuY3JlYXRlZEF0ID0gbmV3IERhdGUodmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpblRlbXBsYXRlc0NsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8TGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdD5cbiAgaW1wbGVtZW50cyBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzLyc7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQ3JlYXRpb25SZXNwb25zZShkYXRhOiBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKTogSURvbWFpblRlbXBsYXRlIHtcbiAgICByZXR1cm4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkYXRhLmJvZHkudGVtcGxhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKFxuICAgIGRhdGE6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlXG4gICk6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7fSBhcyBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VNdXRhdGlvblJlc3BvbnNlKFxuICAgIGRhdGE6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZVxuICApOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQgPSB7fSBhcyBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkgJiYgZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGVOYW1lID0gZGF0YS5ib2R5LnRlbXBsYXRlLm5hbWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UoZGF0YTogTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UpOiBOb3RpZmljYXRpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogTm90aWZpY2F0aW9uUmVzdWx0ID0ge30gYXMgTm90aWZpY2F0aW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UoXG4gICAgZGF0YTogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2VcbiAgKTogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHt9IGFzIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGVOYW1lID0gZGF0YS5ib2R5LnRlbXBsYXRlLm5hbWU7XG4gICAgICByZXN1bHQudGVtcGxhdGVWZXJzaW9uID0geyB0YWc6IGRhdGEuYm9keS50ZW1wbGF0ZS52ZXJzaW9uLnRhZyB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlKTogTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoKGQ6IElEb21haW5UZW1wbGF0ZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncCcpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMoXG4gICAgcmVzcG9uc2U6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2VcbiAgKTogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdDtcblxuICAgIGRhdGEudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlc3BvbnNlLmJvZHkudGVtcGxhdGUpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3AnKTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5UZW1wbGF0ZXNRdWVyeSk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSwgcXVlcnkpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgcXVlcnk/OiBUZW1wbGF0ZVF1ZXJ5KTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlRGF0YVxuICApOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlQ3JlYXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGFcbiAgKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpKVxuICAgICAgLnRoZW4oKHJlczogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3lBbGwoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE5vdGlmaWNhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSlcbiAgICAgIC50aGVuKChyZXM6IE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBjcmVhdGVWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGFcbiAgKTogUHJvbWlzZTxDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBnZXRWZXJzaW9uKGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXMuYm9keS50ZW1wbGF0ZSlcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGVWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGFcbiAgKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpLCBkYXRhKVxuICAgICAgLnRoZW4oXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgIChyZXM6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3lWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSlcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAudGhlbigocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgbGlzdFZlcnNpb25zKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnlcbiAgKTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zKHJlcylcbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHtcbiAgRXZlbnRzTGlzdCxcbiAgRXZlbnRzUXVlcnksXG4gIEV2ZW50c1Jlc3BvbnNlLFxufSBmcm9tICcuLi9UeXBlcy9FdmVudHMnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElFdmVudENsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudENsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8RXZlbnRzTGlzdD5cbiAgaW1wbGVtZW50cyBJRXZlbnRDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogRXZlbnRzUmVzcG9uc2UsXG4gICk6IEV2ZW50c0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBFdmVudHNMaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICcvJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBnZXQoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRXZlbnRzUXVlcnkpIDogUHJvbWlzZTxFdmVudHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbignL3YzJywgZG9tYWluLCAnZXZlbnRzJyksIHF1ZXJ5KTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgSXBQb29sQ3JlYXRlRGF0YSxcbiAgSXBQb29sQ3JlYXRlUmVzcG9uc2UsXG4gIElwUG9vbENyZWF0ZVJlc3VsdCxcbiAgSXBQb29sRGVsZXRlRGF0YSxcbiAgSXBQb29sTGlzdFJlc3BvbnNlLFxuICBJcFBvb2xMaXN0UmVzdWx0LFxuICBJcFBvb2xNZXNzYWdlUmVzcG9uc2UsXG4gIElwUG9vbE1lc3NhZ2VSZXN1bHQsXG4gIElwUG9vbFVwZGF0ZURhdGEsXG59IGZyb20gJy4uL1R5cGVzL0lQUG9vbHMnO1xuaW1wb3J0IHsgSUlQUG9vbHNDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXBQb29sc0NsaWVudCBpbXBsZW1lbnRzIElJUFBvb2xzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QoKTogUHJvbWlzZTxJcFBvb2xMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92MS9pcF9wb29scycpXG4gICAgICAudGhlbigocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZSkpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKGRhdGE6IElwUG9vbENyZWF0ZURhdGEpOiBQcm9taXNlPElwUG9vbENyZWF0ZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJcFBvb2xDcmVhdGVSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjEvaXBfcG9vbHMnLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sVXBkYXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJcFBvb2xNZXNzYWdlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucGF0Y2hXaXRoRkQoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sRGVsZXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOklwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5kZWxldGUoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJcFBvb2xzUmVzcG9uc2UocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSk6IElwUG9vbExpc3RSZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgTWdSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSXBEYXRhLCBJUHNMaXN0UXVlcnksIElwc0xpc3RSZXNwb25zZUJvZHkgfSBmcm9tICcuLi9UeXBlcy9JUHMnO1xuaW1wb3J0IHsgSUlQc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcHNDbGllbnQgaW1wbGVtZW50cyBJSVBzQ2xpZW50IHtcbiAgcmVxdWVzdDogTWdSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IE1nUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5PzogSVBzTGlzdFF1ZXJ5KTogUHJvbWlzZTxJcHNMaXN0UmVzcG9uc2VCb2R5PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvaXBzJywgcXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnBhcnNlSXBzUmVzcG9uc2U8SXBzTGlzdFJlc3BvbnNlQm9keT4ocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgZ2V0KGlwOiBzdHJpbmcpOiBQcm9taXNlPElwRGF0YT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3YzL2lwcy8ke2lwfWApO1xuICAgIHJldHVybiB0aGlzLnBhcnNlSXBzUmVzcG9uc2U8SXBEYXRhPihyZXNwb25zZSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlSXBzUmVzcG9uc2U8VD4ocmVzcG9uc2U6IHsgYm9keTogVCB9KTogVCB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQXBpUmVzcG9uc2UsXG4gIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNSZXN1bHQsXG4gIEluYm94UGxhY2VtZW50c1ZhbHVlc0FwaVJlc3BvbnNlLFxuICBJbmJveFBsYWNlbWVudHNWYWx1ZXNSZXN1bHRcbn0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCBpbXBsZW1lbnRzIElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgcGF0aDogc3RyaW5nXG4gICkge1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHRoaXMucGF0aCkgYXMgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0FwaVJlc3BvbnNlO1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgIH0gYXMgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc1Jlc3VsdDtcbiAgfVxuXG4gIGFzeW5jIGdldChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1ZhbHVlc1Jlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLnBhdGh9LyR7YXR0cmlidXRlTmFtZX1gKSBhcyBJbmJveFBsYWNlbWVudHNWYWx1ZXNBcGlSZXNwb25zZTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ucmVzcG9uc2UuYm9keSxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0FwaVJlc3BvbnNlLCBJbmJveFBsYWNlbWVudHNGaWx0ZXJzUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQgaW1wbGVtZW50cyBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIHBhdGg6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gIH1cblxuICBhc3luYyBsaXN0KCk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzRmlsdGVyc1Jlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQodGhpcy5wYXRoKSBhcyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQXBpUmVzcG9uc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzdWx0LnN0YXR1cyxcbiAgICAgIHN1cHBvcnRlZF9maWx0ZXJzOiByZXN1bHQuYm9keS5zdXBwb3J0ZWRfZmlsdGVyc1xuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIElJUFJTaGFyaW5nQ2xpZW50LFxuICBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCxcbiAgSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQsXG4gIElJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LFxuICBJTG9nZ2VyXG59IGZyb20gJy4uLy4uLy4uL0ludGVyZmFjZXMnO1xuXG5pbXBvcnQge1xuICBJbmJveFBsYWNlbWVudHNCb3gsXG4gIEluYm94UGxhY2VtZW50c0Rlc3Ryb3lBUElSZXNwb25zZSxcbiAgSW5ib3hQbGFjZW1lbnRzRGVzdHJveVJlc3VsdCxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0LFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRBUElSZXNwb25zZSxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJU2hhcGUsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdFdpdGhTdGF0dXMsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdHNBcGlRdWVyeSxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0RhdGVzLFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdCxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3RBUElSZXNwb25zZSxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1F1ZXJ5XG59IGZyb20gJy4uLy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5cbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uLy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uLy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8SW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3Q+XG4gIGltcGxlbWVudHMgSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgYXR0cmlidXRlczogSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQ7XG4gIHB1YmxpYyBmaWx0ZXJzOiBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudDtcbiAgcHVibGljIHNoYXJpbmc6IElJUFJTaGFyaW5nQ2xpZW50O1xuICBwcml2YXRlIGxvZ2dlcjogSUxvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIGF0dHJpYnV0ZXM6IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50LFxuICAgIGZpbHRlcnM6IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50LFxuICAgIHNoYXJpbmc6IElJUFJTaGFyaW5nQ2xpZW50LFxuICAgIGxvZ2dlcjogSUxvZ2dlciA9IGNvbnNvbGVcbiAgKSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgIHRoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgdGhpcy5zaGFyaW5nID0gc2hhcmluZztcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydERhdGVUb1VUQyhrZXk6c3RyaW5nLCBpbnB1dERhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIC8qXG4gICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAqL1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYERhdGU6IFwiJHtpbnB1dERhdGV9XCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXG5WYWx1ZSBcIiR7aW5wdXREYXRlLnRvSVNPU3RyaW5nKCl9XCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nYCk7XG4gICAgcmV0dXJuIGlucHV0RGF0ZS50b0lTT1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUXVlcnlEYXRhKFxuICAgIHF1ZXJ5RGF0YTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1F1ZXJ5XG4gICk6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNBcGlRdWVyeSB7XG4gICAgY29uc3QgcHJvcHNGb3JSZXBsYWNlbWVudCA9IHF1ZXJ5RGF0YSBhcyBJbmJveFBsYWNlbWVudHNSZXN1bHRzRGF0ZXM7XG4gICAgY29uc3QgcmVwbGFjZWRQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzRm9yUmVwbGFjZW1lbnQpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHByb3AgPSBrZXkgYXMga2V5b2YgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0RhdGVzO1xuICAgICAgaWYgKCEhcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSAmJiB0eXBlb2YgcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBxdWVyeURhdGFbcHJvcF0gYXMgRGF0ZTtcbiAgICAgICAgYWNjW3Byb3BdID0gdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKHByb3AsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgUmVjb3JkPGtleW9mIEluYm94UGxhY2VtZW50c1Jlc3VsdHNEYXRlcywgc3RyaW5nPik7XG5cbiAgICBjb25zdCByZXN1bHQ6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNBcGlRdWVyeSA9IHtcbiAgICAgIC4uLnF1ZXJ5RGF0YSxcbiAgICAgIC4uLnJlcGxhY2VkUHJvcHNcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQoZGF0YTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJU2hhcGUpOiBJbmJveFBsYWNlbWVudHNSZXN1bHQge1xuICAgIGxldCBib3ggPSB7fSBhcyBJbmJveFBsYWNlbWVudHNCb3g7XG5cbiAgICBjb25zdCBoYW5kbGVkU2VlZExpc3REYXRlcyA9IHtcbiAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCksXG4gICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLnVwZGF0ZWRfYXQpLFxuICAgICAgc2hhcmluZ19leHBpcmVzX2F0OiBuZXcgRGF0ZShkYXRhLnNoYXJpbmdfZXhwaXJlc19hdCksXG4gICAgfTtcblxuICAgIGlmIChkYXRhLkJveCkge1xuICAgICAgYm94ID0ge1xuICAgICAgICAuLi5kYXRhLkJveCxcbiAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5Cb3guY3JlYXRlZF9hdCksXG4gICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuQm94LnVwZGF0ZWRfYXQpLFxuICAgICAgICBsYXN0X3Jlc3VsdF9hdDogbmV3IERhdGUoZGF0YS5Cb3gubGFzdF9yZXN1bHRfYXQpLFxuICAgICAgfTtcbiAgICAgIGRlbGV0ZSAoYm94IGFzIHtJRD86IHN0cmluZ30pLklEO1xuICAgIH1cblxuICAgIGNvbnN0IGluYm94UGxhY2VtZW50c1Jlc3VsdDogSW5ib3hQbGFjZW1lbnRzUmVzdWx0ID0ge1xuICAgICAgLi4uZGF0YSxcbiAgICAgIEJveDogYm94LFxuICAgICAgLi4uaGFuZGxlZFNlZWRMaXN0RGF0ZXMsXG4gICAgICBpZDogZGF0YS5JZCxcbiAgICB9O1xuXG4gICAgZGVsZXRlIChpbmJveFBsYWNlbWVudHNSZXN1bHQgYXMge0lEPzogc3RyaW5nfSkuSUQ7XG5cbiAgICByZXR1cm4gaW5ib3hQbGFjZW1lbnRzUmVzdWx0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3RBUElSZXNwb25zZSk6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3Q7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoXG4gICAgICAoaXRlbTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJU2hhcGUpXG4gICAgICAgIDogSW5ib3hQbGFjZW1lbnRzUmVzdWx0ID0+IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChpdGVtKVxuICAgICk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5OiBJbmJveFBsYWNlbWVudHNSZXN1bHRzUXVlcnkpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0PiB7XG4gICAgY29uc3QgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnlEYXRhKHF1ZXJ5KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92NC9pbmJveC9yZXN1bHRzJywgcXVlcnlEYXRhKSBhcyBJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdEFQSVJlc3BvbnNlO1xuICAgIHJldHVybiB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUmVzdWx0V2l0aFN0YXR1cz4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJbmJveFBsYWNlbWVudHNSZXN1bHRBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9yZXN1bHRzLyR7aWR9YCkgYXMgSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJUmVzcG9uc2U7XG4gICAgY29uc3QgaW5ib3hQbGFjZW1lbnRSZXN1bHQ6IEluYm94UGxhY2VtZW50c1Jlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChcbiAgICAgIHJlc3BvbnNlLmJvZHkucmVzdWx0XG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBpbmJveFBsYWNlbWVudFJlc3VsdFxuICAgIH07XG4gIH1cblxuICBhc3luYyBkZXN0cm95KGlkOiBzdHJpbmcpIDogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNEZXN0cm95UmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjQvaW5ib3gvcmVzdWx0cy8ke2lkfWApIGFzIEluYm94UGxhY2VtZW50c0Rlc3Ryb3lBUElSZXNwb25zZTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldFJlc3VsdEJ5U2hhcmVJZChzaGFyZUlkOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Jlc3VsdFdpdGhTdGF0dXM+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9zaGFyaW5nL3B1YmxpYy8ke3NoYXJlSWR9YCkgYXMgSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJUmVzcG9uc2U7XG4gICAgY29uc3QgaW5ib3hQbGFjZW1lbnRSZXN1bHQ6IEluYm94UGxhY2VtZW50c1Jlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChcbiAgICAgIHJlc3BvbnNlLmJvZHkucmVzdWx0XG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBpbmJveFBsYWNlbWVudFJlc3VsdFxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IElJUFJTaGFyaW5nQ2xpZW50IH0gZnJvbSAnLi4vLi4vLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBJUFJTaGFyaW5nQVBJUmVzcG9uc2UsXG4gIElQUlNoYXJpbmdBcGlTaGFwZSxcbiAgSVBSU2hhcmluZ1Jlc3VsdCxcbiAgSVBSU2hhcmluZ1VwZGF0ZUFQSVJlc3BvbnNlLFxuICBJUFJTaGFyaW5nVXBkYXRlRGF0YSxcbiAgSVBSU2hhcmluZ1VwZGF0ZVJlc3VsdFxufSBmcm9tICcuLi8uLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJUFJTaGFyaW5nQ2xpZW50IGltcGxlbWVudHMgSUlQUlNoYXJpbmdDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHRTaGFyaW5nKGRhdGE6IElQUlNoYXJpbmdBcGlTaGFwZSk6IElQUlNoYXJpbmdSZXN1bHQge1xuICAgIGNvbnN0IGhhbmRsZWRTZWVkTGlzdERhdGVzID0ge1xuICAgICAgZXhwaXJlc19hdDogbmV3IERhdGUoZGF0YS5leHBpcmVzX2F0KSxcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0OiBJUFJTaGFyaW5nUmVzdWx0ID0ge1xuICAgICAgLi4uZGF0YSxcbiAgICAgIC4uLmhhbmRsZWRTZWVkTGlzdERhdGVzXG4gICAgfTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhc3luYyBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8SVBSU2hhcmluZ1Jlc3VsdCAmIHtzdGF0dXM6IG51bWJlcn0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9zaGFyaW5nLyR7aWR9YCkgYXMgSVBSU2hhcmluZ0FQSVJlc3BvbnNlO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmcocmVzcG9uc2UuYm9keS5zaGFyaW5nKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXN1bHRcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgZGF0YTogSVBSU2hhcmluZ1VwZGF0ZURhdGFcbiAgKTogUHJvbWlzZTxJUFJTaGFyaW5nVXBkYXRlUmVzdWx0ICYgeyBzdGF0dXM6IG51bWJlciB9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucHV0KGAvdjQvaW5ib3gvc2hhcmluZy8ke2lkfWAsIHt9LCB7IHF1ZXJ5OiBgZW5hYmxlZD0ke2RhdGEuZW5hYmxlZH1gIH0pIGFzIElQUlNoYXJpbmdVcGRhdGVBUElSZXNwb25zZTtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHRTaGFyaW5nKHJlc3BvbnNlLmJvZHkuc2hhcmluZyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJlc3VsdCxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSUxvZ2dlcixcbiAgSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQsXG4gIElTZWVkc0xpc3RzQ2xpZW50LFxuICBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudFxufSBmcm9tICcuLi8uLi8uLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIFNlZWRMaXN0LFxuICBTZWVkTGlzdEFQSVNoYXBlLFxuICBTZWVkc0xpc3RzQVBJUXVlcnksXG4gIFNlZWRzTGlzdHNBUElRdWVyeURhdGVzLFxuICBTZWVkc0xpc3RzQVBJUmVzcG9uc2UsXG4gIFNlZWRzTGlzdHNDcmVhdGluZ0RhdGEsXG4gIFNlZWRzTGlzdHNRdWVyeSxcbiAgU2VlZHNMaXN0c1Jlc3VsdCxcbiAgU2VlZCxcbiAgU2VlZEFQSVNoYXBlLFxuICBTZWVkc0xpc3RzRGVzdHJveUFwaVJlc3BvbnNlLFxuICBTZWVkc0xpc3RzVXBkYXRpbmdEYXRhLFxuICBTZWVkTGlzdFJlc3VsdCxcbiAgU2VlZExpc3RHZXRBUElSZXNwb25zZSxcbiAgU2VlZExpc3RBUElSZXNwb25zZVxufSBmcm9tICcuLi8uLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWVkc0xpc3RzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxTZWVkc0xpc3RzUmVzdWx0PlxuICBpbXBsZW1lbnRzIElTZWVkc0xpc3RzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHVibGljIGF0dHJpYnV0ZXM6IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50O1xuICBwdWJsaWMgZmlsdGVyczogSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQ7XG4gIHByaXZhdGUgbG9nZ2VyOiBJTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgYXR0cmlidXRlczogSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQsXG4gICAgZmlsdGVyczogSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQsXG4gICAgbG9nZ2VyOiBJTG9nZ2VyID0gY29uc29sZVxuICApIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgdGhpcy5maWx0ZXJzID0gZmlsdGVycztcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydERhdGVUb1VUQyhrZXk6c3RyaW5nLCBpbnB1dERhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIC8qXG4gICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAqL1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYERhdGU6IFwiJHtpbnB1dERhdGV9XCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXG5WYWx1ZSBcIiR7aW5wdXREYXRlLnRvSVNPU3RyaW5nKCl9XCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nYCk7XG4gICAgcmV0dXJuIGlucHV0RGF0ZS50b0lTT1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUXVlcnlEYXRhKHF1ZXJ5RGF0YTogU2VlZHNMaXN0c1F1ZXJ5KSA6IFNlZWRzTGlzdHNBUElRdWVyeSB7XG4gICAgY29uc3QgcHJvcHNGb3JSZXBsYWNlbWVudCA9IHF1ZXJ5RGF0YSBhcyBTZWVkc0xpc3RzQVBJUXVlcnlEYXRlcztcbiAgICBjb25zdCByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IGtleSBhcyBrZXlvZiBTZWVkc0xpc3RzQVBJUXVlcnlEYXRlcztcbiAgICAgIGlmICghIXByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gJiYgdHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcXVlcnlEYXRhW3Byb3BdIGFzIERhdGU7XG4gICAgICAgIGFjY1twcm9wXSA9IHRoaXMuY29udmVydERhdGVUb1VUQyhwcm9wLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9IGFzIFJlY29yZDxrZXlvZiBTZWVkc0xpc3RzQVBJUXVlcnlEYXRlcywgc3RyaW5nPik7XG5cbiAgICBjb25zdCByZXN1bHQ6IFNlZWRzTGlzdHNBUElRdWVyeSA9IHtcbiAgICAgIC4uLnF1ZXJ5RGF0YSxcbiAgICAgIC4uLnJlcGxhY2VkUHJvcHNcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVSZXN1bHQoZGF0YTogU2VlZExpc3RBUElSZXNwb25zZSk6IFNlZWRMaXN0UmVzdWx0IHtcbiAgICBsZXQgcmVzdWx0ID0ge30gYXMgU2VlZExpc3RSZXN1bHQ7XG4gICAgY29uc3Qgc2VlZExpc3QgPSB0aGlzLnByZXBhcmVTZWVkTGlzdChkYXRhLmJvZHkpO1xuICAgIHJlc3VsdCA9IHtcbiAgICAgIC4uLnNlZWRMaXN0LFxuICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1c1xuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVNlZWRMaXN0KGRhdGE6IFNlZWRMaXN0QVBJU2hhcGUpOiBTZWVkTGlzdCB7XG4gICAgbGV0IHNlZWRzOiBTZWVkW10gfCBudWxsO1xuXG4gICAgY29uc3QgaGFuZGxlZFNlZWRMaXN0RGF0ZXMgPSB7XG4gICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpLFxuICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoZGF0YS51cGRhdGVkX2F0KSxcbiAgICAgIGxhc3RfcmVzdWx0X2F0OiBuZXcgRGF0ZShkYXRhLmxhc3RfcmVzdWx0X2F0KSxcbiAgICB9O1xuXG4gICAgaWYgKGRhdGEuU2VlZHMpIHtcbiAgICAgIHNlZWRzID0gZGF0YS5TZWVkcy5tYXAoKHNlZWRJdGVtOiBTZWVkQVBJU2hhcGUpOiBTZWVkID0+IHtcbiAgICAgICAgbGV0IHNlZWQgPSB7fSBhcyBTZWVkO1xuICAgICAgICBjb25zdCBoYW5kbGVkU2VlZERhdGVzID0ge1xuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLmNyZWF0ZWRfYXQpLFxuICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLnVwZGF0ZWRfYXQpLFxuICAgICAgICAgIG1heF9lbWFpbF9jb3VudF9oaXRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLm1heF9lbWFpbF9jb3VudF9oaXRfYXQpLFxuICAgICAgICAgIGxhc3Rfc2VudF90b19hdDogbmV3IERhdGUoc2VlZEl0ZW0ubGFzdF9zZW50X3RvX2F0KSxcbiAgICAgICAgICBsYXN0X2RlbGl2ZXJlZF9hdDogbmV3IERhdGUoc2VlZEl0ZW0ubGFzdF9kZWxpdmVyZWRfYXQpLFxuICAgICAgICB9O1xuICAgICAgICBzZWVkID0ge1xuICAgICAgICAgIC4uLnNlZWRJdGVtLFxuICAgICAgICAgIC4uLmhhbmRsZWRTZWVkRGF0ZXNcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHNlZWQ7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VlZHMgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNlZWRMaXN0OiBTZWVkTGlzdCA9IHtcbiAgICAgIC4uLmRhdGEsXG4gICAgICBTZWVkczogc2VlZHMsXG4gICAgICAuLi5oYW5kbGVkU2VlZExpc3REYXRlc1xuICAgIH07XG5cbiAgICBkZWxldGUgKHNlZWRMaXN0IGFzIHtJZD86IHN0cmluZ30pLklkO1xuXG4gICAgcmV0dXJuIHNlZWRMaXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogU2VlZHNMaXN0c0FQSVJlc3BvbnNlKTogU2VlZHNMaXN0c1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGl0ZW1zOiBbXVxuICAgIH0gYXMgU2VlZHNMaXN0c1Jlc3VsdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zPy5tYXAoXG4gICAgICAoaXRlbTogU2VlZExpc3RBUElTaGFwZSk6IFNlZWRMaXN0ID0+IHRoaXMucHJlcGFyZVNlZWRMaXN0KGl0ZW0pXG4gICAgKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk6IFNlZWRzTGlzdHNRdWVyeSk6IFByb21pc2U8U2VlZHNMaXN0c1Jlc3VsdD4ge1xuICAgIGNvbnN0IHF1ZXJ5RGF0YSA9IHRoaXMucHJlcGFyZVF1ZXJ5RGF0YShxdWVyeSk7XG4gICAgY29uc3QgcmVzcG9uc2U6IFNlZWRzTGlzdHNBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92NC9pbmJveC9zZWVkbGlzdHMnLCBxdWVyeURhdGEpIGFzIFNlZWRzTGlzdHNBUElSZXNwb25zZTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5wYXJzZUxpc3QocmVzcG9uc2UpLFxuICAgICAgc3RhdHVzOiAyMDBcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFNlZWRMaXN0UmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IFNlZWRMaXN0R2V0QVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjQvaW5ib3gvc2VlZGxpc3RzLyR7aWR9YCkgYXMgU2VlZExpc3RHZXRBUElSZXNwb25zZTtcbiAgICBjb25zdCB1cGRhdGVkU2VlZHNMaXN0ID0gdGhpcy5wcmVwYXJlU2VlZExpc3QocmVzcG9uc2UuYm9keS5zZWVkbGlzdCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnVwZGF0ZWRTZWVkc0xpc3QsXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH07XG4gIH1cblxuICBhc3luYyBjcmVhdGUoZGF0YTogU2VlZHNMaXN0c0NyZWF0aW5nRGF0YSk6IFByb21pc2U8U2VlZExpc3RSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjQvaW5ib3gvc2VlZGxpc3RzJywgZGF0YSkgYXMgU2VlZExpc3RBUElSZXNwb25zZTtcbiAgICByZXR1cm4gdGhpcy5wcmVwYXJlUmVzdWx0KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBTZWVkc0xpc3RzVXBkYXRpbmdEYXRhKTogUHJvbWlzZTxTZWVkTGlzdFJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnB1dChgL3Y0L2luYm94L3NlZWRsaXN0cy8ke2lkfWAsIGRhdGEpIGFzIFNlZWRMaXN0QVBJUmVzcG9uc2U7XG4gICAgcmV0dXJuIHRoaXMucHJlcGFyZVJlc3VsdChyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBkZXN0cm95KGlkOiBzdHJpbmcpOiBQcm9taXNlPFNlZWRzTGlzdHNEZXN0cm95QXBpUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2luYm94L3NlZWRsaXN0cy8ke2lkfWApIGFzIHVua25vd24gYXMgU2VlZHNMaXN0c0Rlc3Ryb3lBcGlSZXNwb25zZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c0NsaWVudCwgSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7IElTZWVkc0xpc3RzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50JztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzJztcbmltcG9ydCB7IEluYm94UGxhY2VtZW50c0RhdGEsIEluYm94UGxhY2VtZW50c1Rlc3RSZXN1bHQsIEluYm94UGxhY2VtZW50c1Rlc3RSZXN1bHRBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94UGxhY2VtZW50c0NsaWVudCBpbXBsZW1lbnRzIElJbmJveFBsYWNlbWVudHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgc2VlZHNMaXN0czogSVNlZWRzTGlzdHNDbGllbnQ7XG4gIHB1YmxpYyByZXN1bHRzOiBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudDtcbiAgcHVibGljIHByb3ZpZGVyczogSUluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIHNlZWRzTGlzdHNDbGllbnQ6IElTZWVkc0xpc3RzQ2xpZW50LFxuICAgIHJlc3VsdHM6IElJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LFxuICAgIHByb3ZpZGVyczogSUluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuc2VlZHNMaXN0cyA9IHNlZWRzTGlzdHNDbGllbnQ7XG4gICAgdGhpcy5zZWVkc0xpc3RzID0gc2VlZHNMaXN0c0NsaWVudDtcbiAgICB0aGlzLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgIHRoaXMucHJvdmlkZXJzID0gcHJvdmlkZXJzO1xuICB9XG5cbiAgYXN5bmMgcnVuVGVzdChkYXRhOiBJbmJveFBsYWNlbWVudHNEYXRhKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNUZXN0UmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdCgnL3Y0L2luYm94L3Rlc3RzJywgZGF0YSkgYXMgSW5ib3hQbGFjZW1lbnRzVGVzdFJlc3VsdEFQSVJlc3BvbnNlO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5yZXNwb25zZS5ib2R5LFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IH0gZnJvbSAnLi4vLi4vLi4vSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvcHJvdmlkZXJzL0luYm94UGxhY2VtZW50c1Byb3ZpZGVycyc7XG5pbXBvcnQgeyBJbmJveFBsYWNlbWVudHNQcm92aWRlciwgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJBUElTaGFwZSwgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdCwgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uLy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IGltcGxlbWVudHMgSUluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICApIHtcbiAgICB0aGlzLnBhdGggPSAnL3Y0L2luYm94L3Byb3ZpZGVycyc7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNMaXN0QVBJUmVzcG9uc2VcbiAgKTogSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0xpc3Q7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoXG4gICAgICAoaXRlbTogSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJBUElTaGFwZSk6IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlZFByb3ZpZGVyRGF0ZXMgPSB7XG4gICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoaXRlbS5jcmVhdGVkX2F0KSxcbiAgICAgICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShpdGVtLnVwZGF0ZWRfYXQpLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXN1bHQ6IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyID0ge1xuICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgLi4uaGFuZGxlZFByb3ZpZGVyRGF0ZXNcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNQcm92aWRlcnNMaXN0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHRoaXMucGF0aCkgYXMgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdEFQSVJlc3BvbnNlO1xuICAgIHJldHVybiB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBNYWlsZ3VuQ2xpZW50T3B0aW9ucywgSW5wdXRGb3JtRGF0YSwgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuLi9UeXBlcyc7XG5cbmltcG9ydCBEb21haW5zQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zQ2xpZW50JztcbmltcG9ydCBFdmVudENsaWVudCBmcm9tICcuL0V2ZW50cyc7XG5pbXBvcnQgU3RhdHNDbGllbnQgZnJvbSAnLi9TdGF0cy9TdGF0c0NsaWVudCc7XG5pbXBvcnQgU3VwcHJlc3Npb25DbGllbnQgZnJvbSAnLi9TdXBwcmVzc2lvbnMvU3VwcHJlc3Npb25zQ2xpZW50JztcbmltcG9ydCBXZWJob29rc0NsaWVudCBmcm9tICcuL1dlYmhvb2tzJztcbmltcG9ydCBNZXNzYWdlc0NsaWVudCBmcm9tICcuL01lc3NhZ2VzJztcbmltcG9ydCBSb3V0ZXNDbGllbnQgZnJvbSAnLi9Sb3V0ZXMnO1xuaW1wb3J0IFZhbGlkYXRlQ2xpZW50IGZyb20gJy4vVmFsaWRhdGlvbnMvdmFsaWRhdGUnO1xuaW1wb3J0IElwc0NsaWVudCBmcm9tICcuL0lQcyc7XG5pbXBvcnQgSXBQb29sc0NsaWVudCBmcm9tICcuL0lQUG9vbHMnO1xuaW1wb3J0IE1haWxpbmdMaXN0c0NsaWVudCBmcm9tICcuL01haWxpbmdMaXN0cy9tYWlsaW5nTGlzdHMnO1xuaW1wb3J0IE1haWxMaXN0c01lbWJlcnMgZnJvbSAnLi9NYWlsaW5nTGlzdHMvbWFpbExpc3RNZW1iZXJzJztcbmltcG9ydCBEb21haW5DcmVkZW50aWFsc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc0NyZWRlbnRpYWxzJztcbmltcG9ydCBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgZnJvbSAnLi9WYWxpZGF0aW9ucy9tdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc1RlbXBsYXRlcyc7XG5pbXBvcnQgRG9tYWluVGFnc0NsaWVudCBmcm9tICcuL0RvbWFpbnMvZG9tYWluc1RhZ3MnO1xuaW1wb3J0IFN1YmFjY291bnRzQ2xpZW50IGZyb20gJy4vU3ViYWNjb3VudHMnO1xuXG5pbXBvcnQge1xuICBJRG9tYWluc0NsaWVudCxcbiAgSVdlYkhvb2tzQ2xpZW50LFxuICBJTWFpbGd1bkNsaWVudCxcbiAgSU1haWxpbmdMaXN0c0NsaWVudCxcbiAgSUV2ZW50Q2xpZW50LFxuICBJU3RhdHNDbGllbnQsXG4gIElTdXBwcmVzc2lvbkNsaWVudCxcbiAgSU1lc3NhZ2VzQ2xpZW50LFxuICBJUm91dGVzQ2xpZW50LFxuICBJVmFsaWRhdGlvbkNsaWVudCxcbiAgSUlQc0NsaWVudCxcbiAgSUlQUG9vbHNDbGllbnQsXG4gIElTdWJhY2NvdW50c0NsaWVudCxcbiAgSUluYm94UGxhY2VtZW50c0NsaWVudCxcbn0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQgU2VlZHNMaXN0c0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9pbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50JztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL0F0dHJpYnV0ZXNDbGllbnQnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvRmlsdGVyc0NsaWVudCc7XG5pbXBvcnQgSVBSU2hhcmluZ0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50JztcbmltcG9ydCBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvcHJvdmlkZXJzL0luYm94UGxhY2VtZW50c1Byb3ZpZGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW5DbGllbnQgaW1wbGVtZW50cyBJTWFpbGd1bkNsaWVudCB7XG4gIHByaXZhdGUgcmVxdWVzdDtcblxuICBwdWJsaWMgZG9tYWluczogSURvbWFpbnNDbGllbnQ7XG4gIHB1YmxpYyB3ZWJob29rczogSVdlYkhvb2tzQ2xpZW50O1xuICBwdWJsaWMgZXZlbnRzOiBJRXZlbnRDbGllbnQ7XG4gIHB1YmxpYyBzdGF0czogSVN0YXRzQ2xpZW50O1xuICBwdWJsaWMgc3VwcHJlc3Npb25zOiBJU3VwcHJlc3Npb25DbGllbnQ7XG4gIHB1YmxpYyBtZXNzYWdlczogSU1lc3NhZ2VzQ2xpZW50O1xuICBwdWJsaWMgcm91dGVzOiBJUm91dGVzQ2xpZW50O1xuICBwdWJsaWMgdmFsaWRhdGU6IElWYWxpZGF0aW9uQ2xpZW50O1xuICBwdWJsaWMgaXBzOiBJSVBzQ2xpZW50O1xuICBwdWJsaWMgaXBfcG9vbHM6IElJUFBvb2xzQ2xpZW50O1xuICBwdWJsaWMgbGlzdHM6IElNYWlsaW5nTGlzdHNDbGllbnQ7XG4gIHB1YmxpYyBzdWJhY2NvdW50czogSVN1YmFjY291bnRzQ2xpZW50O1xuICBwdWJsaWMgaW5ib3hfcGxhY2VtZW50czogSUluYm94UGxhY2VtZW50c0NsaWVudDtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBNYWlsZ3VuQ2xpZW50T3B0aW9ucywgZm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICBjb25zdCBjb25maWc6IFJlcXVlc3RPcHRpb25zID0geyAuLi5vcHRpb25zIH0gYXMgUmVxdWVzdE9wdGlvbnM7XG5cbiAgICBpZiAoIWNvbmZpZy51cmwpIHtcbiAgICAgIGNvbmZpZy51cmwgPSAnaHR0cHM6Ly9hcGkubWFpbGd1bi5uZXQnO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLnVzZXJuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcInVzZXJuYW1lXCIgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5rZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwia2V5XCIgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgdGhpcy5yZXF1ZXN0ID0gbmV3IFJlcXVlc3QoY29uZmlnLCBmb3JtRGF0YSk7XG4gICAgY29uc3QgbWFpbExpc3RzTWVtYmVycyA9IG5ldyBNYWlsTGlzdHNNZW1iZXJzKHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQgPSBuZXcgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5UZW1wbGF0ZXNDbGllbnQgPSBuZXcgRG9tYWluVGVtcGxhdGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgZG9tYWluVGFnc0NsaWVudCA9IG5ldyBEb21haW5UYWdzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50ID0gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IEluYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50ID0gbmV3IElQUlNoYXJpbmdDbGllbnQodGhpcy5yZXF1ZXN0KTtcblxuICAgIGNvbnN0IHNlZWRzTGlzdHNBdHRyaWJ1dGVzID0gbmV3IEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3NlZWRsaXN0cy9hJyk7XG4gICAgY29uc3QgcmVzdWx0c0F0dHJpYnV0ZXNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvcmVzdWx0cy9hJyk7XG5cbiAgICBjb25zdCBzZWVkc0xpc3RzRmlsdGVyc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9zZWVkbGlzdHMvX2ZpbHRlcnMnKTtcbiAgICBjb25zdCByZXN1bHRzRmlsdGVyc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9yZXN1bHRzL19maWx0ZXJzJyk7XG5cbiAgICBjb25zdCBzZWVkc0xpc3RzQ2xpZW50ID0gbmV3IFNlZWRzTGlzdHNDbGllbnQoXG4gICAgICB0aGlzLnJlcXVlc3QsXG4gICAgICBzZWVkc0xpc3RzQXR0cmlidXRlcyxcbiAgICAgIHNlZWRzTGlzdHNGaWx0ZXJzQ2xpZW50XG4gICAgKTtcblxuICAgIGNvbnN0IGluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudChcbiAgICAgIHRoaXMucmVxdWVzdCxcbiAgICAgIHJlc3VsdHNBdHRyaWJ1dGVzQ2xpZW50LFxuICAgICAgcmVzdWx0c0ZpbHRlcnNDbGllbnQsXG4gICAgICBJbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudFxuICAgICk7XG5cbiAgICBjb25zdCBpbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgPSBuZXcgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0XG4gICAgKTtcblxuICAgIHRoaXMuZG9tYWlucyA9IG5ldyBEb21haW5zQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0LFxuICAgICAgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgICBkb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgICBkb21haW5UYWdzQ2xpZW50XG4gICAgKTtcbiAgICB0aGlzLndlYmhvb2tzID0gbmV3IFdlYmhvb2tzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5ldmVudHMgPSBuZXcgRXZlbnRDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5zdXBwcmVzc2lvbnMgPSBuZXcgU3VwcHJlc3Npb25DbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLm1lc3NhZ2VzID0gbmV3IE1lc3NhZ2VzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5yb3V0ZXMgPSBuZXcgUm91dGVzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pcHMgPSBuZXcgSXBzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pcF9wb29scyA9IG5ldyBJcFBvb2xzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5saXN0cyA9IG5ldyBNYWlsaW5nTGlzdHNDbGllbnQodGhpcy5yZXF1ZXN0LCBtYWlsTGlzdHNNZW1iZXJzKTtcbiAgICB0aGlzLnZhbGlkYXRlID0gbmV3IFZhbGlkYXRlQ2xpZW50KHRoaXMucmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KTtcbiAgICB0aGlzLnN1YmFjY291bnRzID0gbmV3IFN1YmFjY291bnRzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgdGhpcy5pbmJveF9wbGFjZW1lbnRzID0gbmV3IEluYm94UGxhY2VtZW50c0NsaWVudChcbiAgICAgIHRoaXMucmVxdWVzdCxcbiAgICAgIHNlZWRzTGlzdHNDbGllbnQsXG4gICAgICBpbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LFxuICAgICAgaW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50LFxuICAgICk7XG4gIH1cblxuICBzZXRTdWJhY2NvdW50KHN1YmFjY291bnRJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0Py5zZXRTdWJhY2NvdW50SGVhZGVyKHN1YmFjY291bnRJZCk7XG4gIH1cblxuICByZXNldFN1YmFjY291bnQoKTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0Py5yZXNldFN1YmFjY291bnRIZWFkZXIoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgTWFpbExpc3RNZW1iZXJzUXVlcnksXG4gIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyxcbiAgTWFpbExpc3RNZW1iZXIsXG4gIE11bHRpcGxlTWVtYmVyc0RhdGEsXG4gIE11bHRpcGxlTWVtYmVyc1JlcURhdGEsXG4gIERlbGV0ZWRNZW1iZXIsXG4gIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1JlcSxcbiAgTmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2UsXG4gIE1haWxMaXN0TWVtYmVyc1Jlc3VsdCxcbiAgTWFpbExpc3RNZW1iZXJzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvTWFpbGluZ0xpc3RzJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IElNYWlsTGlzdHNNZW1iZXJzIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9NYWlsaW5nTGlzdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsTGlzdHNNZW1iZXJzXG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxNYWlsTGlzdE1lbWJlcnNSZXN1bHQ+XG4gIGltcGxlbWVudHMgSU1haWxMaXN0c01lbWJlcnMge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0FuZFVwZGF0ZURhdGEoZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzKSB7XG4gICAgY29uc3QgbmV3RGF0YSA9IHsgLi4uZGF0YSB9O1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhLnZhcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBuZXdEYXRhLnZhcnMgPSBKU09OLnN0cmluZ2lmeShuZXdEYXRhLnZhcnMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YS5zdWJzY3JpYmVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIG5ld0RhdGEuc3Vic2NyaWJlZCA9IGRhdGEuc3Vic2NyaWJlZCA/ICd5ZXMnIDogJ25vJztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RGF0YSBhcyBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXE7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBNYWlsTGlzdE1lbWJlcnNSZXNwb25zZSxcbiAgKTogTWFpbExpc3RNZW1iZXJzUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTWFpbExpc3RNZW1iZXJzUmVzdWx0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3RNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIHF1ZXJ5PzogTWFpbExpc3RNZW1iZXJzUXVlcnlcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcnNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyhgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvcGFnZXNgLCBxdWVyeSk7XG4gIH1cblxuICBnZXRNZW1iZXIobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBjcmVhdGVNZW1iZXIoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzXG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICBjb25zdCByZXFEYXRhID0gdGhpcy5jaGVja0FuZFVwZGF0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVyc2AsIHJlcURhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGNyZWF0ZU1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVNZW1iZXJzRGF0YVxuICApOiBQcm9taXNlPE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlPiB7XG4gICAgY29uc3QgbmV3RGF0YTogTXVsdGlwbGVNZW1iZXJzUmVxRGF0YSA9IHtcbiAgICAgIG1lbWJlcnM6IEFycmF5LmlzQXJyYXkoZGF0YS5tZW1iZXJzKSA/IEpTT04uc3RyaW5naWZ5KGRhdGEubWVtYmVycykgOiBkYXRhLm1lbWJlcnMsXG4gICAgICB1cHNlcnQ6IGRhdGEudXBzZXJ0XG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMuanNvbmAsIG5ld0RhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgTmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2UpO1xuICB9XG5cbiAgdXBkYXRlTWVtYmVyKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1xuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgY29uc3QgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gLCByZXFEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBkZXN0cm95TWVtYmVyKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZykgOiBQcm9taXNlPERlbGV0ZWRNZW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBEZWxldGVkTWVtYmVyKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgTGlzdHNRdWVyeSxcbiAgQ3JlYXRlVXBkYXRlTGlzdCxcbiAgRGVzdHJveWVkTGlzdCxcbiAgTWFpbGluZ0xpc3QsXG4gIE1haWxpbmdMaXN0VmFsaWRhdGlvbkFwaVJlc3BvbnNlLFxuICBTdGFydFZhbGlkYXRpb25SZXN1bHQsXG4gIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdCxcbiAgTWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0LFxuICBNYWlsaW5nTGlzdFJlc3VsdCxcbiAgTWFpbGluZ0xpc3RBcGlSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9NYWlsaW5nTGlzdHMnO1xuaW1wb3J0IHsgSU1haWxMaXN0c01lbWJlcnMgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cy9NYWlsaW5nTGlzdE1lbWJlcnMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgSU1haWxpbmdMaXN0c0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsaW5nTGlzdHNDbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPE1haWxpbmdMaXN0UmVzdWx0PlxuICBpbXBsZW1lbnRzIElNYWlsaW5nTGlzdHNDbGllbnQge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHVibGljIG1lbWJlcnM6IElNYWlsTGlzdHNNZW1iZXJzO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIG1lbWJlcnM6IElNYWlsTGlzdHNNZW1iZXJzKSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgIHRoaXMubWVtYmVycyA9IG1lbWJlcnM7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlVmFsaWRhdGlvblJlc3VsdChcbiAgICBzdGF0dXM6IG51bWJlcixcbiAgICBkYXRhOiBNYWlsaW5nTGlzdFZhbGlkYXRpb25BcGlSZXNwb25zZVxuICApOiBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXMsXG4gICAgICB2YWxpZGF0aW9uUmVzdWx0OiB7XG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCAqIDEwMDApIC8vIGFkZCBtaWxsaXNlY29uZCB0byBVbml4IHRpbWVzdGFtcFxuICAgICAgfVxuICAgIH0gYXMgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogTWFpbGluZ0xpc3RBcGlSZXNwb25zZSk6IE1haWxpbmdMaXN0UmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTWFpbGluZ0xpc3RSZXN1bHQ7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcztcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk/OiBMaXN0c1F1ZXJ5KTogUHJvbWlzZTxNYWlsaW5nTGlzdFJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKGAke3RoaXMuYmFzZVJvdXRlfS9wYWdlc2AsIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh0aGlzLmJhc2VSb3V0ZSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIHVwZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGRlc3Ryb3kobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3llZExpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBEZXN0cm95ZWRMaXN0KTtcbiAgfVxuXG4gIHZhbGlkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxTdGFydFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWAsIHt9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgICAgfSkgYXMgU3RhcnRWYWxpZGF0aW9uUmVzdWx0KTtcbiAgfVxuXG4gIHZhbGlkYXRpb25SZXN1bHQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXNwb25zZSkgPT4gdGhpcy5wYXJzZVZhbGlkYXRpb25SZXN1bHQoXG4gICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICByZXNwb25zZS5ib2R5IGFzIE1haWxpbmdMaXN0VmFsaWRhdGlvbkFwaVJlc3BvbnNlXG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBjYW5jZWxWYWxpZGF0aW9uKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gKHtcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgICAgfSBhcyBNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQpKTtcbiAgfVxufVxuIiwiaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vY29tbW9uL0Vycm9yJztcbmltcG9ydCB7XG4gIE1haWxndW5NZXNzYWdlRGF0YSxcbiAgTWVzc2FnZXNTZW5kQVBJUmVzcG9uc2UsXG4gIE1lc3NhZ2VzU2VuZFJlc3VsdFxufSBmcm9tICcuLi9UeXBlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElNZXNzYWdlc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlc0NsaWVudCBpbXBsZW1lbnRzIElNZXNzYWdlc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVCb29sZWFuVmFsdWVzKGRhdGE6IE1haWxndW5NZXNzYWdlRGF0YSk6IE1haWxndW5NZXNzYWdlRGF0YSB7XG4gICAgY29uc3QgeWVzTm9Qcm9wZXJ0aWVzID0gbmV3IFNldChbXG4gICAgICAnbzp0ZXN0bW9kZScsXG4gICAgICAndDp0ZXh0JyxcbiAgICAgICdvOmRraW0nLFxuICAgICAgJ286dHJhY2tpbmcnLFxuICAgICAgJ286dHJhY2tpbmctY2xpY2tzJyxcbiAgICAgICdvOnRyYWNraW5nLW9wZW5zJyxcbiAgICAgICdvOnJlcXVpcmUtdGxzJyxcbiAgICAgICdvOnNraXAtdmVyaWZpY2F0aW9uJ1xuICAgIF0pO1xuXG4gICAgaWYgKCFkYXRhIHx8IE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignTWVzc2FnZSBkYXRhIG9iamVjdCBjYW4gbm90IGJlIGVtcHR5JywgJ01lc3NhZ2UgZGF0YSBvYmplY3QgY2FuIG5vdCBiZSBlbXB0eScpO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZGF0YSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgaWYgKHllc05vUHJvcGVydGllcy5oYXMoa2V5KSAmJiB0eXBlb2YgZGF0YVtrZXldID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgYWNjW2tleV0gPSBkYXRhW2tleV0gPyAneWVzJyA6ICdubyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY2Nba2V5XSA9IGRhdGFba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgTWFpbGd1bk1lc3NhZ2VEYXRhKTtcbiAgfVxuXG4gIF9wYXJzZVJlc3BvbnNlKHJlc3BvbnNlOiBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSk6IE1lc3NhZ2VzU2VuZFJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cblxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IE1haWxndW5NZXNzYWdlRGF0YSk6IFByb21pc2U8TWVzc2FnZXNTZW5kUmVzdWx0PiB7XG4gICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzLm1pbWVgLCBkYXRhKVxuICAgICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2RpZmllZERhdGEgPSB0aGlzLnByZXBhcmVCb29sZWFuVmFsdWVzKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3YzLyR7ZG9tYWlufS9tZXNzYWdlc2AsIG1vZGlmaWVkRGF0YSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlUmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJUm91dGVzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBDcmVhdGVVcGRhdGVSb3V0ZURhdGEsIERlc3Ryb3lSb3V0ZVJlc3BvbnNlLCBSb3V0ZSwgUm91dGVzTGlzdFF1ZXJ5LCBVcGRhdGVSb3V0ZVJlc3BvbnNlXG59IGZyb20gJy4uL1R5cGVzL1JvdXRlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVzQ2xpZW50IGltcGxlbWVudHMgSVJvdXRlc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KHF1ZXJ5OiBSb3V0ZXNMaXN0UXVlcnkpOiBQcm9taXNlPFJvdXRlW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3JvdXRlcycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lml0ZW1zKTtcbiAgfVxuXG4gIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxSb3V0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5yb3V0ZSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxSb3V0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YzL3JvdXRlcycsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8VXBkYXRlUm91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAvdjMvcm91dGVzLyR7aWR9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cblxuICBkZXN0cm95KGlkOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3lSb3V0ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92My9yb3V0ZXMvJHtpZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgU3RhdHNRdWVyeSwgU3RhdHNPcHRpb25zIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3RhdHMnO1xuaW1wb3J0IHsgSUxvZ2dlciB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvQ29tbW9uJztcbmltcG9ydCBTdGF0c0NvbnRhaW5lciBmcm9tICcuL1N0YXRzQ29udGFpbmVyJztcbmltcG9ydCB7IElTdGF0c0NsaWVudCwgSVN0YXRzQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdGF0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQ2xpZW50IGltcGxlbWVudHMgSVN0YXRzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHJpdmF0ZSBsb2dnZXI6IElMb2dnZXI7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbG9nZ2VyOiBJTG9nZ2VyID0gY29uc29sZSkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnREYXRlVG9VVEMoa2V5OnN0cmluZywgaW5wdXREYXRlOiBEYXRlKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgLypcbiAgICAgIEJlY2F1c2UgXCJuZXcgRGF0ZSgnMjAyMi0xMi0yNVQwMDowMDowMC4wMDBaJylcIiBiZWNvbWVzIFwiU3VuIERlYyAyNSAyMDIyIDAyOjAwOjAwIEdNVCswMjAwXCJcbiAgICAgIChwbHVzIDIgaG91cnMgZnJvbSB0aGUgdGltZXpvbmUpXG4gICAgICBhbmQgYmVjYXVzZSBmb3IgQVBJLCB3ZSBuZWVkIHRvIHByb3ZpZGUgdGhlIGRhdGUgaW4gdGhlIGV4cGVjdGVkIGZvcm1hdFxuICAgICAgZXg6ICdUaHUsIDEzIE9jdCAyMDExIDE4OjAyOjAwICswMDAwJy5cbiAgICAgIEhlcmUgd2UgdHJ5IGF1dG8tY29udmVydCB0aGVtIHRvIFVUQ1xuICAgICovXG4gICAgdGhpcy5sb2dnZXIud2FybihgRGF0ZTpcIiR7aW5wdXREYXRlfVwiIHdhcyBhdXRvLWNvbnZlcnRlZCB0byBVVEMgdGltZSB6b25lLlxuVmFsdWUgXCIke2lucHV0RGF0ZS50b1VUQ1N0cmluZygpfVwiIHdpbGwgYmUgdXNlZCBmb3IgcmVxdWVzdC5cbkNvbnNpZGVyIHVzaW5nIHN0cmluZyB0eXBlIGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiIHRvIGF2b2lkIGF1dG8tY29udmVydGluZ2ApO1xuICAgIHJldHVybiBba2V5LCBpbnB1dERhdGUudG9VVENTdHJpbmcoKV07XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnk6IFN0YXRzUXVlcnkgfCB1bmRlZmluZWQpOiBBcnJheTxBcnJheTxzdHJpbmc+PiB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9IFtdIGFzIEFycmF5PEFycmF5PHN0cmluZz4+O1xuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHF1ZXJ5KS5sZW5ndGgpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IE9iamVjdC5lbnRyaWVzKHF1ZXJ5KS5yZWR1Y2UoKGFycmF5V2l0aFBhaXJzLCBjdXJyZW50UGFpcikgPT4ge1xuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBjdXJyZW50UGFpcjtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoKSB7IC8vIGV2ZW50OiBbJ2RlbGl2ZXJlZCcsICdhY2NlcHRlZCddXG4gICAgICAgICAgY29uc3QgcmVwZWF0ZWRQcm9wZXJ0eSA9IHZhbHVlLm1hcCgoaXRlbSkgPT4gW2tleSwgaXRlbV0pO1xuICAgICAgICAgIHJldHVybiBbLi4uYXJyYXlXaXRoUGFpcnMsIC4uLnJlcGVhdGVkUHJvcGVydHldOyAvLyBbW2V2ZW50LGRlbGl2ZXJlZF0sIFtldmVudCxhY2NlcHRlZF1dXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgYXJyYXlXaXRoUGFpcnMucHVzaCh0aGlzLmNvbnZlcnREYXRlVG9VVEMoa2V5LCB2YWx1ZSkpO1xuICAgICAgICAgIHJldHVybiBhcnJheVdpdGhQYWlycztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgYXJyYXlXaXRoUGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFycmF5V2l0aFBhaXJzO1xuICAgICAgfSwgW10gYXMgQXJyYXk8QXJyYXk8c3RyaW5nPj4pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWFyY2hQYXJhbXM7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlU3RhdHMocmVzcG9uc2U6IHsgYm9keTogU3RhdHNPcHRpb25zIH0pOiBJU3RhdHNDb250YWluZXIge1xuICAgIHJldHVybiBuZXcgU3RhdHNDb250YWluZXIocmVzcG9uc2UuYm9keSk7XG4gIH1cblxuICBnZXREb21haW4oZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8SVN0YXRzQ29udGFpbmVyPiB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMnLCBkb21haW4sICdzdGF0cy90b3RhbCcpLCBzZWFyY2hQYXJhbXMpXG4gICAgICAudGhlbih0aGlzLnBhcnNlU3RhdHMpO1xuICB9XG5cbiAgZ2V0QWNjb3VudChxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPElTdGF0c0NvbnRhaW5lcj4ge1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9zdGF0cy90b3RhbCcsIHNlYXJjaFBhcmFtcylcbiAgICAgIC50aGVuKHRoaXMucGFyc2VTdGF0cyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElTdGF0c0NvbnRhaW5lciB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3RhdHMnO1xuaW1wb3J0IHsgU3RhdCwgU3RhdHNPcHRpb25zIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3RhdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c0NvbnRhaW5lciBpbXBsZW1lbnRzIElTdGF0c0NvbnRhaW5lciB7XG4gICAgc3RhcnQ6IERhdGU7XG4gICAgZW5kOiBEYXRlO1xuICAgIHJlc29sdXRpb246IHN0cmluZztcbiAgICBzdGF0czogU3RhdFtdO1xuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFN0YXRzT3B0aW9ucykge1xuICAgICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKGRhdGEuc3RhcnQpO1xuICAgICAgdGhpcy5lbmQgPSBuZXcgRGF0ZShkYXRhLmVuZCk7XG4gICAgICB0aGlzLnJlc29sdXRpb24gPSBkYXRhLnJlc29sdXRpb247XG4gICAgICB0aGlzLnN0YXRzID0gZGF0YS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQ6IFN0YXQpIHtcbiAgICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0IH07XG4gICAgICAgIHJlcy50aW1lID0gbmV3IERhdGUoc3RhdC50aW1lKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSVN1YmFjY291bnRzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBTdWJhY2NvdW50TGlzdFJlc3BvbnNlRGF0YSxcbiAgU3ViYWNjb3VudFJlc3BvbnNlRGF0YSxcbiAgU3ViYWNjb3VudHNRdWVyeSxcbn0gZnJvbSAnLi4vVHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJhY2NvdW50c0NsaWVudCBpbXBsZW1lbnRzIElTdWJhY2NvdW50c0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHN0YXRpYyBTVUJBQ0NPVU5UX0hFQURFUiA9ICdYLU1haWxndW4tT24tQmVoYWxmLU9mJztcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QocXVlcnk/OiBTdWJhY2NvdW50c1F1ZXJ5KTogUHJvbWlzZTxTdWJhY2NvdW50TGlzdFJlc3BvbnNlRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5ib2R5KTtcbiAgfVxuXG4gIGdldChpZDpzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3Y1L2FjY291bnRzL3N1YmFjY291bnRzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5ib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZShuYW1lOnN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3Y1L2FjY291bnRzL3N1YmFjY291bnRzJywgeyBuYW1lIH0pXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gIH1cblxuICBlbmFibGUoaWQ6c3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KGAvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMvJHtpZH0vZW5hYmxlYClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5ib2R5KTtcbiAgfVxuXG4gIGRpc2FibGUoaWQ6c3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KGAvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMvJHtpZH0vZGlzYWJsZWApXG4gICAgICAudGhlbigocmVzKSA9PiByZXMuYm9keSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSUJvdW5jZSB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IEJvdW5jZURhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3VuY2UgZXh0ZW5kcyBTdXBwcmVzc2lvbiBpbXBsZW1lbnRzIElCb3VuY2Uge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgZXJyb3I6IHN0cmluZztcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogQm91bmNlRGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuQk9VTkNFUyk7XG4gICAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICB0aGlzLmNvZGUgPSArZGF0YS5jb2RlO1xuICAgICAgdGhpcy5lcnJvciA9IGRhdGEuZXJyb3I7XG4gICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSUNvbXBsYWludCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IENvbXBsYWludERhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wbGFpbnQgZXh0ZW5kcyBTdXBwcmVzc2lvbiBpbXBsZW1lbnRzIElDb21wbGFpbnQge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIGNvbnN0cnVjdG9yKGRhdGE6IENvbXBsYWludERhdGEpIHtcbiAgICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLkNPTVBMQUlOVFMpO1xuICAgICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwcHJlc3Npb24ge1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBTdXBwcmVzc2lvbk1vZGVscykge1xuICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3InO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IEJvdW5jZSBmcm9tICcuL0JvdW5jZSc7XG5pbXBvcnQgQ29tcGxhaW50IGZyb20gJy4vQ29tcGxhaW50JztcbmltcG9ydCBVbnN1YnNjcmliZSBmcm9tICcuL1Vuc3Vic2NyaWJlJztcbmltcG9ydCBXaGl0ZUxpc3QgZnJvbSAnLi9XaGl0ZUxpc3QnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuaW1wb3J0IHtcbiAgSUJvdW5jZSxcbiAgSUNvbXBsYWludCxcbiAgSVN1cHByZXNzaW9uQ2xpZW50LFxuICBJVW5zdWJzY3JpYmUsXG4gIElXaGl0ZUxpc3Rcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHtcbiAgU3VwcHJlc3Npb25MaXN0LFxuICBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSxcbiAgU3VwcHJlc3Npb25EYXRhVHlwZSxcbiAgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSxcbiAgU3VwcHJlc3Npb25MaXN0UXVlcnksXG4gIFN1cHByZXNzaW9uUmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdCxcbiAgU3VwcHJlc3Npb25EZXN0cm95UmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcblxuY29uc3QgY3JlYXRlT3B0aW9ucyA9IHtcbiAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1cHByZXNzaW9uQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxTdXBwcmVzc2lvbkxpc3Q+XG4gIGltcGxlbWVudHMgSVN1cHByZXNzaW9uQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgbW9kZWxzOiBvYmplY3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5tb2RlbHMgPSB7XG4gICAgICBib3VuY2VzOiBCb3VuY2UsXG4gICAgICBjb21wbGFpbnRzOiBDb21wbGFpbnQsXG4gICAgICB1bnN1YnNjcmliZXM6IFVuc3Vic2NyaWJlLFxuICAgICAgd2hpdGVsaXN0czogV2hpdGVMaXN0LFxuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSxcbiAgICBNb2RlbDoge1xuICAgICAgbmV3KGRhdGE6IFN1cHByZXNzaW9uRGF0YVR5cGUpOlxuICAgICAgSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0XG4gICAgfVxuICApOiBTdXBwcmVzc2lvbkxpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBTdXBwcmVzc2lvbkxpc3Q7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM/Lm1hcCgoaXRlbSkgPT4gbmV3IE1vZGVsKGl0ZW0pKSB8fCBbXTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBfcGFyc2VJdGVtPFQgZXh0ZW5kcyBTdXBwcmVzc2lvbj4oXG4gICAgZGF0YSA6IFN1cHByZXNzaW9uRGF0YVR5cGUsXG4gICAgTW9kZWw6IHtcbiAgICAgIG5ldyhkYXRhVHlwZTogU3VwcHJlc3Npb25EYXRhVHlwZSk6VFxuICAgIH1cbiAgKTogVCB7XG4gICAgcmV0dXJuIG5ldyBNb2RlbChkYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlV2hpdGVMaXN0KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXSxcbiAgICBpc0RhdGFBcnJheTogYm9vbGVhblxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+IHtcbiAgICBpZiAoaXNEYXRhQXJyYXkpIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgICdEYXRhIHByb3BlcnR5IHNob3VsZCBiZSBhbiBvYmplY3QnLFxuICAgICAgICAnV2hpdGVsaXN0XFwncyBjcmVhdGlvbiBwcm9jZXNzIGRvZXMgbm90IHN1cHBvcnQgbXVsdGlwbGUgY3JlYXRpb25zLiBEYXRhIHByb3BlcnR5IHNob3VsZCBiZSBhbiBvYmplY3QnXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdFdpdGhGRCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3doaXRlbGlzdHMnKSwgZGF0YSBhcyBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSlcbiAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVW5zdWJzY3JpYmUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgZGF0YTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgfCBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YVtdXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdD4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7IC8vIFVzZXIgcHJvdmlkZWQgYW4gYXJyYXlcbiAgICAgIGNvbnN0IGlzQ29udGFpbnNUYWcgPSBkYXRhLnNvbWUoKHVuc3Vic2NyaWJlOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSkgPT4gdW5zdWJzY3JpYmUudGFnKTtcbiAgICAgIGlmIChpc0NvbnRhaW5zVGFnKSB7XG4gICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgICAgJ1RhZyBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHVzZWQgZm9yIGNyZWF0aW5nIG11bHRpcGxlIHVuc3Vic2NyaWJlcy4nLFxuICAgICAgICAgICdUYWcgcHJvcGVydHkgY2FuIGJlIHVzZWQgb25seSBpZiBvbmUgdW5zdWJzY3JpYmUgcHJvdmlkZWQgYXMgc2Vjb25kIGFyZ3VtZW50IG9mIGNyZWF0ZSBtZXRob2QuIFBsZWFzZSB1c2UgdGFncyBpbnN0ZWFkLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgICAgLnBvc3QodXJsam9pbigndjMnLCBkb21haW4sICd1bnN1YnNjcmliZXMnKSwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIGNyZWF0ZU9wdGlvbnMpXG4gICAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YT8udGFncykge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgJ1RhZ3MgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSB1c2VkIGZvciBjcmVhdGluZyBvbmUgdW5zdWJzY3JpYmUuJyxcbiAgICAgICAgJ1RhZ3MgcHJvcGVydHkgY2FuIGJlIHVzZWQgaWYgeW91IHByb3ZpZGVzIGFuIGFycmF5IG9mIHVuc3Vic2NyaWJlcyBhcyBzZWNvbmQgYXJndW1lbnQgb2YgY3JlYXRlIG1ldGhvZC4gUGxlYXNlIHVzZSB0YWcgaW5zdGVhZCdcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEudGFnKSkge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgJ1RhZyBwcm9wZXJ0eSBjYW4gbm90IGJlIGFuIGFycmF5JyxcbiAgICAgICAgJ1BsZWFzZSB1c2UgYXJyYXkgb2YgdW5zdWJzY3JpYmVzIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kIHRvIGJlIGFibGUgdG8gcHJvdmlkZSBmZXcgdGFncydcbiAgICAgICk7XG4gICAgfVxuICAgIC8qIFdlIG5lZWQgRm9ybSBEYXRhIGZvciB1bnN1YnNjcmliZXMgaWYgd2Ugd2FudCB0byBzdXBwb3J0IHRoZSBcInRhZ1wiIHByb3BlcnR5ICovXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3RXaXRoRkQodXJsam9pbigndjMnLCBkb21haW4sICd1bnN1YnNjcmliZXMnKSwgZGF0YSlcbiAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TW9kZWwodHlwZTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGUgaW4gdGhpcy5tb2RlbHMpIHtcbiAgICAgIHJldHVybiB0aGlzLm1vZGVsc1t0eXBlIGFzIGtleW9mIHR5cGVvZiB0aGlzLm1vZGVsc107XG4gICAgfVxuICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAnVW5rbm93biB0eXBlIHZhbHVlJyxcbiAgICAgICdUeXBlIG1heSBiZSBvbmx5IG9uZSBvZiBbYm91bmNlcywgY29tcGxhaW50cywgdW5zdWJzY3JpYmVzLCB3aGl0ZWxpc3RzXSdcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUmVzcG9uc2UocmVzcG9uc2U6IFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSk6IFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICB0eXBlOiByZXNwb25zZS5ib2R5LnR5cGUgfHwgJycsXG4gICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIHF1ZXJ5PzogU3VwcHJlc3Npb25MaXN0UXVlcnlcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkxpc3Q+IHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBxdWVyeSwgbW9kZWwpO1xuICB9XG5cbiAgZ2V0KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3Q+IHtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLmdldCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSwgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogU3VwcHJlc3Npb25SZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VJdGVtPHR5cGVvZiBtb2RlbD4ocmVzcG9uc2UuYm9keSwgbW9kZWwpKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgfCBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YVtdXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdD4ge1xuICAgIHRoaXMuZ2V0TW9kZWwodHlwZSk7XG4gICAgLy8gc3VwcG9ydHMgYWRkaW5nIG11bHRpcGxlIHN1cHByZXNzaW9ucyBieSBkZWZhdWx0XG4gICAgbGV0IHBvc3REYXRhO1xuICAgIGNvbnN0IGlzRGF0YUFycmF5ID0gQXJyYXkuaXNBcnJheShkYXRhKTtcblxuICAgIGlmICh0eXBlID09PSAnd2hpdGVsaXN0cycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVdoaXRlTGlzdChkb21haW4sIGRhdGEsIGlzRGF0YUFycmF5KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ3Vuc3Vic2NyaWJlcycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVVuc3Vic2NyaWJlKGRvbWFpbiwgZGF0YSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0RhdGFBcnJheSkge1xuICAgICAgcG9zdERhdGEgPSBbZGF0YV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc3REYXRhID0gWy4uLmRhdGFdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlKSwgSlNPTi5zdHJpbmdpZnkocG9zdERhdGEpLCBjcmVhdGVPcHRpb25zKVxuICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25EZXN0cm95UmVzdWx0PiB7XG4gICAgdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAuZGVsZXRlKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZSkgPT4gKHtcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgICAgYWRkcmVzczogcmVzcG9uc2UuYm9keS5hZGRyZXNzIHx8ICcnLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgfSkpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3VwcHJlc3Npb25DbGllbnQ7XG4iLCJpbXBvcnQgeyBTdXBwcmVzc2lvbk1vZGVscyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IElVbnN1YnNjcmliZSB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IFVuc3Vic2NyaWJlRGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5cbmltcG9ydCBTdXBwcmVzc2lvbiBmcm9tICcuL1N1cHByZXNzaW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5zdWJzY3JpYmUgZXh0ZW5kcyBTdXBwcmVzc2lvbiBpbXBsZW1lbnRzIElVbnN1YnNjcmliZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIHRhZ3M6IHN0cmluZ1tdO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBVbnN1YnNjcmliZURhdGEpIHtcbiAgICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLlVOU1VCU0NSSUJFUyk7XG4gICAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICB0aGlzLnRhZ3MgPSBkYXRhLnRhZ3M7XG4gICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSVdoaXRlTGlzdCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IFdoaXRlTGlzdERhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaGl0ZUxpc3QgZXh0ZW5kcyBTdXBwcmVzc2lvbiBpbXBsZW1lbnRzIElXaGl0ZUxpc3Qge1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogV2hpdGVMaXN0RGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuV0hJVEVMSVNUUyk7XG4gICAgICB0aGlzLnZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICAgIHRoaXMucmVhc29uID0gZGF0YS5yZWFzb247XG4gICAgICB0aGlzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZEF0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BcGlSZXNwb25zZSc7XG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1ZhbGlkYXRpb25zJztcbmltcG9ydCB7XG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdCxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9iRGF0YSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzcG9uc2UsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnksXG4gIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YSxcbiAgQ3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYixcbiAgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhVXBkYXRlZCxcbiAgQ2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2Jcbn0gZnJvbSAnLi4vLi4vVHlwZXMvVmFsaWRhdGlvbnMvTXVsdGlwbGVWYWxpZGF0aW9uJztcbmltcG9ydCBBdHRhY2htZW50c0hhbmRsZXIgZnJvbSAnLi4vY29tbW9uL0F0dGFjaG1lbnRzSGFuZGxlcic7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi4vY29tbW9uL0Vycm9yJztcblxuZXhwb3J0IGNsYXNzIE11bHRpcGxlVmFsaWRhdGlvbkpvYiBpbXBsZW1lbnRzIE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdCB7XG4gIGNyZWF0ZWRBdDogRGF0ZTtcbiAgaWQ6IHN0cmluZztcbiAgcXVhbnRpdHk6IG51bWJlclxuICByZWNvcmRzUHJvY2Vzc2VkOiBudW1iZXIgfCBudWxsO1xuICBzdGF0dXM6IHN0cmluZztcbiAgZG93bmxvYWRVcmw/OiB7XG4gICAgY3N2OiBzdHJpbmc7XG4gICAganNvbjogc3RyaW5nO1xuICB9O1xuXG4gIHJlc3BvbnNlU3RhdHVzQ29kZTogbnVtYmVyO1xuICBzdW1tYXJ5Pzoge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgY2F0Y2hBbGw6IG51bWJlcjtcbiAgICAgICAgICBkZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgIGRvTm90U2VuZDogbnVtYmVyO1xuICAgICAgICAgIHVuZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICB9O1xuICAgICAgcmlzazoge1xuICAgICAgICAgIGhpZ2g6IG51bWJlcjtcbiAgICAgICAgICBsb3c6IG51bWJlcjtcbiAgICAgICAgICBtZWRpdW06IG51bWJlcjtcbiAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihkYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JEYXRhLCByZXNwb25zZVN0YXR1c0NvZGU6IG51bWJlcikge1xuICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgICB0aGlzLmlkID0gZGF0YS5pZDtcbiAgICB0aGlzLnF1YW50aXR5ID0gZGF0YS5xdWFudGl0eTtcbiAgICB0aGlzLnJlY29yZHNQcm9jZXNzZWQgPSBkYXRhLnJlY29yZHNfcHJvY2Vzc2VkO1xuICAgIHRoaXMuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgdGhpcy5yZXNwb25zZVN0YXR1c0NvZGUgPSByZXNwb25zZVN0YXR1c0NvZGU7XG4gICAgaWYgKGRhdGEuZG93bmxvYWRfdXJsKSB7XG4gICAgICB0aGlzLmRvd25sb2FkVXJsID0ge1xuICAgICAgICBjc3Y6IGRhdGEuZG93bmxvYWRfdXJsPy5jc3YsXG4gICAgICAgIGpzb246IGRhdGEuZG93bmxvYWRfdXJsPy5qc29uXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoZGF0YS5zdW1tYXJ5KSB7XG4gICAgICB0aGlzLnN1bW1hcnkgPSB7XG4gICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgIGNhdGNoQWxsOiBkYXRhLnN1bW1hcnkucmVzdWx0LmNhdGNoX2FsbCxcbiAgICAgICAgICBkZWxpdmVyYWJsZTogZGF0YS5zdW1tYXJ5LnJlc3VsdC5kZWxpdmVyYWJsZSxcbiAgICAgICAgICBkb05vdFNlbmQ6IGRhdGEuc3VtbWFyeS5yZXN1bHQuZG9fbm90X3NlbmQsXG4gICAgICAgICAgdW5kZWxpdmVyYWJsZTogZGF0YS5zdW1tYXJ5LnJlc3VsdC51bmRlbGl2ZXJhYmxlLFxuICAgICAgICAgIHVua25vd246IGRhdGEuc3VtbWFyeS5yZXN1bHQudW5rbm93blxuICAgICAgICB9LFxuICAgICAgICByaXNrOiB7XG4gICAgICAgICAgaGlnaDogZGF0YS5zdW1tYXJ5LnJpc2suaGlnaCxcbiAgICAgICAgICBsb3c6IGRhdGEuc3VtbWFyeS5yaXNrLmxvdyxcbiAgICAgICAgICBtZWRpdW06IGRhdGEuc3VtbWFyeS5yaXNrLm1lZGl1bSxcbiAgICAgICAgICB1bmtub3duOiBkYXRhLnN1bW1hcnkucmlzay51bmtub3duXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+XG4gIGltcGxlbWVudHMgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHByaXZhdGUgYXR0YWNobWVudHNIYW5kbGVyOiBBdHRhY2htZW50c0hhbmRsZXI7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlciA9IG5ldyBBdHRhY2htZW50c0hhbmRsZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlUmVzcG9uc2U8VD4ocmVzcG9uc2U6IEFQSVJlc3BvbnNlKTogVCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2U/LmJvZHlcbiAgICB9IGFzIFQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KHJlc3BvbnNlOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3BvbnNlKVxuICAgIDogTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdDtcblxuICAgIGRhdGEuam9icyA9IHJlc3BvbnNlLmJvZHkuam9icy5tYXAoKGpvYikgPT4gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkpvYihqb2IsIHJlc3BvbnNlLnN0YXR1cykpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3Bpdm90Jyk7XG4gICAgZGF0YS50b3RhbCA9IHJlc3BvbnNlLmJvZHkudG90YWw7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk/OiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFF1ZXJ5KTogUHJvbWlzZTxNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKCcvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrJywgcXVlcnkpO1xuICB9XG5cbiAgYXN5bmMgZ2V0KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvJHtsaXN0SWR9YCk7XG4gICAgcmV0dXJuIG5ldyBNdWx0aXBsZVZhbGlkYXRpb25Kb2IocmVzcG9uc2UuYm9keSwgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFRvRXhwZWN0ZWRTaGFwZShkYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGEpXG4gICAgOiBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkIHtcbiAgICBsZXQgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhVXBkYXRlZDtcbiAgICBpZiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoZGF0YS5maWxlKSkge1xuICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHsgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZTogZGF0YS5maWxlIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YS5maWxlID09PSAnc3RyaW5nJykge1xuICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHsgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZTogeyBkYXRhOiBkYXRhLmZpbGUgfSB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0oZGF0YS5maWxlKSkge1xuICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHsgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZTogZGF0YS5maWxlIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB7IG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IGRhdGEuZmlsZSB9O1xuICAgIH1cblxuICAgIHJldHVybiBtdWx0aXBsZVZhbGlkYXRpb25EYXRhO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKFxuICAgIGxpc3RJZDogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVxuICApOiBQcm9taXNlPENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICBpZiAoIWRhdGEgfHwgIWRhdGEuZmlsZSkge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignXCJmaWxlXCIgcHJvcGVydHkgZXhwZWN0ZWQuJywgJ01ha2Ugc3VyZSBzZWNvbmQgYXJndW1lbnQgaGFzIFwiZmlsZVwiIHByb3BlcnR5LicpO1xuICAgIH1cbiAgICBjb25zdCBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0gdGhpcy5jb252ZXJ0VG9FeHBlY3RlZFNoYXBlKGRhdGEpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvJHtsaXN0SWR9YCwgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2U8Q3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgZGVzdHJveShsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8Q2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5kZWxldGUoYC92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsvJHtsaXN0SWR9YCk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVzcG9uc2U8Q2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+KHJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVZhbGlkYXRpb25DbGllbnQsIElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1ZhbGlkYXRpb25zJztcbmltcG9ydCB7IFZhbGlkYXRpb25RdWVyeSwgVmFsaWRhdGlvblJlc3VsdCwgVmFsaWRhdGlvblJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWxpZGF0ZUNsaWVudCBpbXBsZW1lbnRzIElWYWxpZGF0aW9uQ2xpZW50IHtcbiAgcHVibGljIG11bHRpcGxlVmFsaWRhdGlvbjtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ6IElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubXVsdGlwbGVWYWxpZGF0aW9uID0gbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50O1xuICB9XG5cbiAgYXN5bmMgZ2V0KGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIGNvbnN0IHF1ZXJ5OiBWYWxpZGF0aW9uUXVlcnkgPSB7IGFkZHJlc3MgfTtcbiAgICBjb25zdCByZXN1bHQ6IFZhbGlkYXRpb25SZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92NC9hZGRyZXNzL3ZhbGlkYXRlJywgcXVlcnkpO1xuICAgIHJldHVybiByZXN1bHQuYm9keSBhcyBWYWxpZGF0aW9uUmVzdWx0O1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgeyBXZWJob29rc0lkcyB9IGZyb20gJy4uL0VudW1zJztcbmltcG9ydCB7IElXZWJIb29rc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMvV2ViaG9va3MnO1xuXG5pbXBvcnQge1xuICBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlLFxuICBXZWJob29rTGlzdCxcbiAgV2ViaG9va1Jlc3BvbnNlLFxuICBXZWJob29rc1F1ZXJ5LFxuICBXZWJob29rUmVzdWx0XG59IGZyb20gJy4uL1R5cGVzL1dlYmhvb2tzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgY2xhc3MgV2ViaG9vayBpbXBsZW1lbnRzIFdlYmhvb2tSZXN1bHQge1xuICBpZDogc3RyaW5nO1xuICB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgdXJsczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQsIHVybHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMudXJscyA9IHVybHM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViaG9va3NDbGllbnQgaW1wbGVtZW50cyBJV2ViSG9va3NDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VXZWJob29rTGlzdChyZXNwb25zZTogeyBib2R5OiB7IHdlYmhvb2tzOiBXZWJob29rTGlzdCB9IH0pOiBXZWJob29rTGlzdCB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkud2ViaG9va3M7XG4gIH1cblxuICBfcGFyc2VXZWJob29rV2l0aElEKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlc3BvbnNlOiBXZWJob29rUmVzcG9uc2UpOiBXZWJob29rUmVzdWx0IHtcbiAgICAgIGNvbnN0IHdlYmhvb2tSZXNwb25zZSA9IHJlc3BvbnNlPy5ib2R5Py53ZWJob29rO1xuICAgICAgbGV0IHVybCA9IHdlYmhvb2tSZXNwb25zZT8udXJsO1xuICAgICAgbGV0IHVybHMgPSB3ZWJob29rUmVzcG9uc2U/LnVybHM7XG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICB1cmwgPSB1cmxzICYmIHVybHMubGVuZ3RoXG4gICAgICAgICAgPyB1cmxzWzBdXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoKCF1cmxzIHx8IHVybHMubGVuZ3RoID09PSAwKSAmJiB1cmwpIHtcbiAgICAgICAgdXJscyA9IFt1cmxdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBXZWJob29rKGlkLCB1cmwsIHVybHMgYXMgc3RyaW5nW10pO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVdlYmhvb2tUZXN0KHJlc3BvbnNlOiB7IGJvZHk6IHsgY29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcgfSB9KVxuICA6IHtjb2RlOiBudW1iZXIsIG1lc3NhZ2U6c3RyaW5nfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvZGU6IHJlc3BvbnNlLmJvZHkuY29kZSxcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgIH0gYXMgV2ViaG9va1ZhbGlkYXRpb25SZXNwb25zZTtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5OiBXZWJob29rc1F1ZXJ5KTogUHJvbWlzZTxXZWJob29rTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgcXVlcnkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tMaXN0KTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgaWQ6IFdlYmhvb2tzSWRzKTogUHJvbWlzZTxXZWJob29rUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLFxuICAgIGlkOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgdGVzdCA9IGZhbHNlKTogUHJvbWlzZTxXZWJob29rUmVzdWx0IHwgV2ViaG9va1ZhbGlkYXRpb25SZXNwb25zZT4ge1xuICAgIGlmICh0ZXN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQsICd0ZXN0JyksIHsgdXJsIH0pXG4gICAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1Rlc3QpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJyksIHsgaWQsIHVybCB9KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHVybFZhbHVlczogc3RyaW5nIHwgc3RyaW5nW10pOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpLCB7IHVybDogdXJsVmFsdWVzIH0pXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIGlkOiBzdHJpbmcpIDogUHJvbWlzZTxXZWJob29rUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgeyBDdXN0b21GaWxlLCBDdXN0b21GaWxlRGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yJztcbmltcG9ydCB7IEF0dGFjaG1lbnRJbmZvLCBTdHJlYW1WYWx1ZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BdHRhY2htZW50cyc7XG5cbmNsYXNzIEJsb2JGcm9tU3RyZWFtIHtcbiAgcHJpdmF0ZSBfc3RyZWFtOiBSZWFkYWJsZVxuICBzaXplOiBudW1iZXJcblxuICBjb25zdHJ1Y3RvcihzdHJlYW06IFJlYWRhYmxlLCBzaXplOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdHJlYW0gPSBzdHJlYW07XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuXG4gIHN0cmVhbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RyZWFtO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQmxvYic7XG4gIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudHNIYW5kbGVyIHtcbiAgcHJpdmF0ZSBnZXRBdHRhY2htZW50T3B0aW9ucyhpdGVtOiB7XG4gICAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gICAgY29udGVudFR5cGU/IDogc3RyaW5nO1xuICAgIGtub3duTGVuZ3RoPzogbnVtYmVyO1xuICB9KTogQXR0YWNobWVudEluZm8ge1xuICAgIGNvbnN0IHtcbiAgICAgIGZpbGVuYW1lLFxuICAgICAgY29udGVudFR5cGUsXG4gICAgICBrbm93bkxlbmd0aCxcbiAgICB9ID0gaXRlbTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uKGZpbGVuYW1lID8geyBmaWxlbmFtZSB9IDogeyBmaWxlbmFtZTogJ2ZpbGUnIH0pLFxuICAgICAgLi4uKGNvbnRlbnRUeXBlICYmIHsgY29udGVudFR5cGUgfSksXG4gICAgICAuLi4oa25vd25MZW5ndGggJiYgeyBrbm93bkxlbmd0aCB9KVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldEZpbGVJbmZvKGZpbGU6IEZpbGUpIHsgLy8gYnJvd3NlciBjb21wbGlhbnQgZmlsZVxuICAgIGNvbnN0IHtcbiAgICAgIG5hbWU6IGZpbGVuYW1lLFxuICAgICAgdHlwZTogY29udGVudFR5cGUsXG4gICAgICBzaXplOiBrbm93bkxlbmd0aCxcbiAgICB9ID0gZmlsZTtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyh7IGZpbGVuYW1lLCBjb250ZW50VHlwZSwga25vd25MZW5ndGggfSk7XG4gIH1cblxuICBwcml2YXRlIGdldEN1c3RvbUZpbGVJbmZvKGZpbGU6IEN1c3RvbUZpbGUpIHsgLy8gY3VzdG9tIGNyZWF0ZWQgZmlsZVxuICAgIGNvbnN0IHtcbiAgICAgIGZpbGVuYW1lLFxuICAgICAgY29udGVudFR5cGUsXG4gICAgICBrbm93bkxlbmd0aCxcbiAgICB9ID0gZmlsZTtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2htZW50T3B0aW9ucyh7IGZpbGVuYW1lLCBjb250ZW50VHlwZSwga25vd25MZW5ndGggfSk7XG4gIH1cblxuICBwcml2YXRlIGdldEJ1ZmZlckluZm8oYnVmZmVyOiBCdWZmZXIpIHtcbiAgICBjb25zdCB7XG4gICAgICBieXRlTGVuZ3RoOiBrbm93bkxlbmd0aCxcbiAgICB9ID0gYnVmZmVyO1xuICAgIHJldHVybiB0aGlzLmdldEF0dGFjaG1lbnRPcHRpb25zKHsgZmlsZW5hbWU6ICdmaWxlJywgY29udGVudFR5cGU6ICcnLCBrbm93bkxlbmd0aCB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpc1N0cmVhbShkYXRhOiB1bmtub3duKSA6IGRhdGEgaXMgU3RyZWFtVmFsdWUge1xuICAgIHJldHVybiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIChkYXRhIGFzIFN0cmVhbVZhbHVlKS5waXBlID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgcHVibGljIGlzQ3VzdG9tRmlsZShvYmo6IHVua25vd24pOiBvYmogaXMgQ3VzdG9tRmlsZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG4gICAgICAmJiAhIShvYmogYXMgQ3VzdG9tRmlsZSkuZGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBpc0Jyb3dzZXJGaWxlKG9iajogdW5rbm93bik6IG9iaiBpcyBGaWxlIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgKCEhKG9iaiBhcyBGaWxlKS5uYW1lIHx8ICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikpO1xuICB9XG5cbiAgcHVibGljIGlzQnVmZmVyKGRhdGE6IHVua25vd24pOiBkYXRhIGlzIEJ1ZmZlciB7XG4gICAgcmV0dXJuIHR5cGVvZiBCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIEJ1ZmZlci5pc0J1ZmZlcihkYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdHRhY2htZW50SW5mbyhcbiAgICBhdHRhY2htZW50OiBDdXN0b21GaWxlIHwgRmlsZSB8IHN0cmluZyB8IEN1c3RvbUZpbGVEYXRhXG4gICk6IEF0dGFjaG1lbnRJbmZvIHtcbiAgICBjb25zdCBpc0Jyb3dzZXJGaWxlID0gdGhpcy5pc0Jyb3dzZXJGaWxlKGF0dGFjaG1lbnQpO1xuICAgIGNvbnN0IGlzQ3VzdG9tRmlsZSA9IHRoaXMuaXNDdXN0b21GaWxlKGF0dGFjaG1lbnQpO1xuICAgIGNvbnN0IGlzU3RyaW5nID0gdHlwZW9mIGF0dGFjaG1lbnQgPT09ICdzdHJpbmcnO1xuICAgIGlmICghaXNTdHJpbmcpIHtcbiAgICAgIGlmIChpc0Jyb3dzZXJGaWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZpbGVJbmZvKGF0dGFjaG1lbnQgYXMgRmlsZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQnVmZmVyLmlzQnVmZmVyKGF0dGFjaG1lbnQpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEJ1ZmZlckluZm8oYXR0YWNobWVudCBhcyBCdWZmZXIpO1xuICAgICAgfVxuICAgICAgaWYgKGlzQ3VzdG9tRmlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXN0b21GaWxlSW5mbyhhdHRhY2htZW50IGFzIEN1c3RvbUZpbGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnM6IEF0dGFjaG1lbnRJbmZvID0ge1xuICAgICAgZmlsZW5hbWU6ICdmaWxlJyxcbiAgICAgIGNvbnRlbnRUeXBlOiB1bmRlZmluZWQsXG4gICAgICBrbm93bkxlbmd0aDogdW5kZWZpbmVkXG4gICAgfTtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBjb252ZXJ0VG9GRGV4cGVjdGVkU2hhcGUoXG4gICAgdXNlclByb3ZpZGVkVmFsdWU6IEN1c3RvbUZpbGUgfCBGaWxlIHwgc3RyaW5nIHwgQ3VzdG9tRmlsZURhdGFcbiAgKSB7XG4gICAgY29uc3QgaXNTdHJlYW0gPSB0aGlzLmlzU3RyZWFtKHVzZXJQcm92aWRlZFZhbHVlKTtcbiAgICBjb25zdCBpc0Jyb3dzZXJGaWxlID0gdGhpcy5pc0Jyb3dzZXJGaWxlKHVzZXJQcm92aWRlZFZhbHVlKTtcbiAgICBjb25zdCBpc0N1c3RvbUZpbGUgPSB0aGlzLmlzQ3VzdG9tRmlsZSh1c2VyUHJvdmlkZWRWYWx1ZSk7XG4gICAgY29uc3QgaXNTdHJpbmcgPSB0eXBlb2YgdXNlclByb3ZpZGVkVmFsdWUgPT09ICdzdHJpbmcnO1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKGlzU3RyZWFtIHx8IGlzU3RyaW5nIHx8IGlzQnJvd3NlckZpbGUgfHwgdGhpcy5pc0J1ZmZlcih1c2VyUHJvdmlkZWRWYWx1ZSkpIHtcbiAgICAgIHJlc3VsdCA9IHVzZXJQcm92aWRlZFZhbHVlO1xuICAgIH0gZWxzZSBpZiAoaXNDdXN0b21GaWxlKSB7XG4gICAgICByZXN1bHQgPSB1c2VyUHJvdmlkZWRWYWx1ZS5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICBgVW5rbm93biBhdHRhY2htZW50IHR5cGUgJHt0eXBlb2YgdXNlclByb3ZpZGVkVmFsdWV9YCxcbiAgICAgICAgYFRoZSBcImF0dGFjaG1lbnRcIiBwcm9wZXJ0eSBleHBlY3RzIGVpdGhlciBCdWZmZXIsIEJsb2IsIG9yIFN0cmluZy5cbiAgICAgICAgICBBbHNvLCBJdCBpcyBwb3NzaWJsZSB0byBwcm92aWRlIGFuIG9iamVjdCB0aGF0IGhhcyB0aGUgcHJvcGVydHkgXCJkYXRhXCIgd2l0aCBhIHZhbHVlIHRoYXQgaXMgZXF1YWwgdG8gb25lIG9mIHRoZSB0eXBlcyBjb3VudGVkIGJlZm9yZS5cbiAgICAgICAgICBBZGRpdGlvbmFsbHksIHlvdSBtYXkgdXNlIGFuIGFycmF5IHRvIHNlbmQgbW9yZSB0aGFuIG9uZSBhdHRhY2htZW50LmBcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0QmxvYkZyb21TdHJlYW0oc3RyZWFtOiBSZWFkYWJsZSwgc2l6ZTogbnVtYmVyKTogQmxvYkZyb21TdHJlYW0ge1xuICAgIHJldHVybiBuZXcgQmxvYkZyb21TdHJlYW0oc3RyZWFtLCBzaXplKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdHRhY2htZW50c0hhbmRsZXI7XG4iLCJpbXBvcnQgeyBBUElFcnJvck9wdGlvbnMsIEFQSUVycm9yVHlwZSB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSUVycm9yIGV4dGVuZHMgRXJyb3IgaW1wbGVtZW50cyBBUElFcnJvclR5cGUge1xuICBwdWJsaWMgc3RhdHVzOiBudW1iZXIgO1xuICBwdWJsaWMgc3RhY2s6IHN0cmluZztcbiAgcHVibGljIGRldGFpbHM6IHN0cmluZztcbiAgcHVibGljIHR5cGU6IHN0cmluZztcblxuICBwdWJsaWMgc3RhdGljIGdldFVzZXJEYXRhRXJyb3Ioc3RhdHVzVGV4dDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMoe1xuICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICBzdGF0dXNUZXh0LFxuICAgICAgYm9keToge1xuICAgICAgICBtZXNzYWdlXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgc3RhdHVzLFxuICAgIHN0YXR1c1RleHQsXG4gICAgbWVzc2FnZSxcbiAgICBib2R5ID0ge31cbiAgfTogQVBJRXJyb3JPcHRpb25zKSB7XG4gICAgbGV0IGJvZHlNZXNzYWdlID0gJyc7XG4gICAgbGV0IGVycm9yID0gJyc7XG4gICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgYm9keU1lc3NhZ2UgPSBib2R5O1xuICAgIH0gZWxzZSB7XG4gICAgICBib2R5TWVzc2FnZSA9IGJvZHk/Lm1lc3NhZ2UgfHwgJyc7XG4gICAgICBlcnJvciA9IGJvZHk/LmVycm9yIHx8ICcnO1xuICAgIH1cbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgZXJyb3IgfHwgc3RhdHVzVGV4dCB8fCAnJztcbiAgICB0aGlzLmRldGFpbHMgPSBib2R5TWVzc2FnZTtcbiAgICB0aGlzLnR5cGUgPSAnTWFpbGd1bkFQSUVycm9yJztcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgTm9kZUZvcm1EYXRhIGZyb20gJ2Zvcm0tZGF0YSc7XG5pbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgeyBGb3JtRGF0YUlucHV0LCBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yJztcblxuaW1wb3J0IHtcbiAgQ3VzdG9tRmlsZSxcbiAgQ3VzdG9tRmlsZURhdGEsXG4gIEZvcm1EYXRhSW5wdXRWYWx1ZSxcbiAgTWVzc2FnZUF0dGFjaG1lbnQsXG4gIE1pbWVNZXNzYWdlXG59IGZyb20gJy4uLy4uL1R5cGVzJztcbmltcG9ydCBBdHRhY2htZW50c0hhbmRsZXIgZnJvbSAnLi9BdHRhY2htZW50c0hhbmRsZXInO1xuaW1wb3J0IHsgQXR0YWNobWVudEluZm8gfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXR0YWNobWVudHMnO1xuXG5jbGFzcyBGb3JtRGF0YUJ1aWxkZXIge1xuICBwcml2YXRlIEZvcm1EYXRhQ29uc3RydWN0b3I6IElucHV0Rm9ybURhdGE7XG4gIHByaXZhdGUgZmlsZUtleXM6IHN0cmluZ1tdO1xuICBwcml2YXRlIGF0dGFjaG1lbnRzSGFuZGxlcjogQXR0YWNobWVudHNIYW5kbGVyO1xuXG4gIGNvbnN0cnVjdG9yKEZvcm1EYXRhQ29uc3RydWN0b3I6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IgPSBGb3JtRGF0YUNvbnN0cnVjdG9yO1xuICAgIHRoaXMuZmlsZUtleXMgPSBbJ2F0dGFjaG1lbnQnLCAnaW5saW5lJywgJ211bHRpcGxlVmFsaWRhdGlvbkZpbGUnXTtcbiAgICB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlciA9IG5ldyBBdHRhY2htZW50c0hhbmRsZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVGb3JtRGF0YShkYXRhOiBGb3JtRGF0YUlucHV0KTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBkYXRhIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCBmb3JtRGF0YTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEgPSBPYmplY3Qua2V5cyhkYXRhKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBkYXRhW2tleV07IH0pXG4gICAgICAucmVkdWNlKChmb3JtRGF0YUFjYzogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEsIGtleSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5maWxlS2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgY29uc3QgYXR0YWNobWVudFZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICAgIGlmICh0aGlzLmlzTWVzc2FnZUF0dGFjaG1lbnQoYXR0YWNobWVudFZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5hZGRGaWxlc1RvRkQoa2V5LCBhdHRhY2htZW50VmFsdWUsIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgICAgIGBVbmtub3duIHZhbHVlICR7ZGF0YVtrZXldfSB3aXRoIHR5cGUgJHt0eXBlb2YgZGF0YVtrZXldfSBmb3IgcHJvcGVydHkgXCIke2tleX1cImAsXG4gICAgICAgICAgICBgVGhlIGtleSBcIiR7a2V5fVwiIHNob3VsZCBoYXZlIHR5cGUgb2YgQnVmZmVyLCBTdHJlYW0sIEZpbGUsIG9yIFN0cmluZyBgXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkgPT09ICdtZXNzYWdlJykgeyAvLyBtaW1lIG1lc3NhZ2VcbiAgICAgICAgICBjb25zdCBtZXNzYWdlVmFsdWUgPSBkYXRhW2tleV07XG4gICAgICAgICAgaWYgKCFtZXNzYWdlVmFsdWUgfHwgIXRoaXMuaXNNSU1FKG1lc3NhZ2VWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgICAgICAgIGBVbmtub3duIGRhdGEgdHlwZSBmb3IgXCIke2tleX1cIiBwcm9wZXJ0eWAsXG4gICAgICAgICAgICAgICdUaGUgbWltZSBkYXRhIHNob3VsZCBoYXZlIHR5cGUgb2YgQnVmZmVyLCBTdHJpbmcgb3IgQmxvYidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkTWltZURhdGFUb0ZEKGtleSwgbWVzc2FnZVZhbHVlLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRDb21tb25Qcm9wZXJ0eVRvRkQoa2V5LCBkYXRhW2tleV0sIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgfSwgbmV3IHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvcigpKTtcbiAgICByZXR1cm4gZm9ybURhdGE7XG4gIH1cblxuICBwcml2YXRlIGFkZE1pbWVEYXRhVG9GRChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBkYXRhOiBNaW1lTWVzc2FnZSxcbiAgICBmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7IC8vIGlmIHN0cmluZyBvbmx5IHR3byBwYXJhbWV0ZXJzIHNob3VsZCBiZSB1c2VkLlxuICAgICAgZm9ybURhdGFJbnN0YW5jZS5hcHBlbmQoa2V5LCBkYXRhIGFzIHN0cmluZyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNGb3JtRGF0YVBhY2thZ2UoZm9ybURhdGFJbnN0YW5jZSkpIHsgLy8gZm9ybS1kYXRhIHBhY2thZ2UgaXMgdXNlZFxuICAgICAgY29uc3Qgbm9kZUZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZSBhcyBOb2RlRm9ybURhdGE7XG4gICAgICBub2RlRm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YSwgeyBmaWxlbmFtZTogJ01pbWVNZXNzYWdlJyB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIEJsb2IgIT09IHVuZGVmaW5lZCkgeyAvLyBlaXRoZXIgbm9kZSA+IDE4IG9yIGJyb3dzZXJcbiAgICAgIGNvbnN0IGJyb3dzZXJGb3JtRGF0YSA9IGZvcm1EYXRhSW5zdGFuY2UgYXMgRm9ybURhdGE7IC8vIEJyb3dzZXIgY29tcGxpYW50IEZvcm1EYXRhXG4gICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgYnJvd3NlckZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGEsICdNaW1lTWVzc2FnZScpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoZGF0YSkpIHsgLy8gbm9kZSBlbnZpcm9ubWVudFxuICAgICAgICBjb25zdCBibG9iSW5zdGFuY2UgPSBuZXcgQmxvYihbZGF0YV0pO1xuICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgYmxvYkluc3RhbmNlLCAnTWltZU1lc3NhZ2UnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNNSU1FKGRhdGE6IHVua25vd24pIDogZGF0YSBpcyBNaW1lTWVzc2FnZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJ1xuICAgICAgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhIGluc3RhbmNlb2YgQmxvYilcbiAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKGRhdGEpXG4gICAgICB8fCAodHlwZW9mIFJlYWRhYmxlU3RyZWFtICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhIGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0Zvcm1EYXRhUGFja2FnZShvYmo6IHVua25vd24pOiBvYmogaXMgTm9kZUZvcm1EYXRhIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbiAgICAgICYmIG9iaiAhPT0gbnVsbFxuICAgICAgJiYgdHlwZW9mIChvYmogYXMgTm9kZUZvcm1EYXRhKS5nZXRIZWFkZXJzID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgcHJpdmF0ZSBpc01lc3NhZ2VBdHRhY2htZW50KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgTWVzc2FnZUF0dGFjaG1lbnQge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0N1c3RvbUZpbGUodmFsdWUpXG4gICAgICB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnXG4gICAgICB8fCAodHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgRmlsZSlcbiAgICAgIHx8ICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIodmFsdWUpXG4gICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbSh2YWx1ZSlcbiAgICAgIHx8IChcbiAgICAgICAgQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUuZXZlcnkoXG4gICAgICAgICAgKGl0ZW0pID0+IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQ3VzdG9tRmlsZShpdGVtKVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtIGluc3RhbmNlb2YgRmlsZSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoaXRlbSlcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKGl0ZW0pXG4gICAgICAgIClcbiAgICAgIClcblxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFkZEZpbGVzVG9GRChcbiAgICBwcm9wZXJ0eU5hbWU6IHR5cGVvZiB0aGlzLmZpbGVLZXlzW251bWJlcl0sXG4gICAgdmFsdWU6IE1lc3NhZ2VBdHRhY2htZW50LFxuICAgIGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGFwcGVuZEZpbGVUb0ZEID0gKFxuICAgICAgb3JpZ2luYWxLZXk6IHN0cmluZyxcbiAgICAgIGF0dGFjaG1lbnQ6IEN1c3RvbUZpbGUgfCBGaWxlIHwgc3RyaW5nfCBDdXN0b21GaWxlRGF0YSxcbiAgICAgIGZvcm1EYXRhOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICAgICk6IHZvaWQgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gb3JpZ2luYWxLZXkgPT09ICdtdWx0aXBsZVZhbGlkYXRpb25GaWxlJyA/ICdmaWxlJyA6IG9yaWdpbmFsS2V5O1xuICAgICAgY29uc3Qgb2JqRGF0YSA9IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmNvbnZlcnRUb0ZEZXhwZWN0ZWRTaGFwZShhdHRhY2htZW50KTtcbiAgICAgIGNvbnN0IG9wdGlvbnM6IEF0dGFjaG1lbnRJbmZvID0gdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuZ2V0QXR0YWNobWVudEluZm8oYXR0YWNobWVudCk7XG5cbiAgICAgIGlmICh0aGlzLmlzRm9ybURhdGFQYWNrYWdlKGZvcm1EYXRhKSkge1xuICAgICAgICBjb25zdCBmZCA9IGZvcm1EYXRhIGFzIE5vZGVGb3JtRGF0YTtcbiAgICAgICAgY29uc3QgZGF0YSA9IHR5cGVvZiBvYmpEYXRhID09PSAnc3RyaW5nJyA/IEJ1ZmZlci5mcm9tKG9iakRhdGEpIDogb2JqRGF0YTtcbiAgICAgICAgZmQuYXBwZW5kKGtleSwgZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBCbG9iICE9PSB1bmRlZmluZWQpIHsgLy8gZWl0aGVyIG5vZGUgPiAxOCBvciBicm93c2VyXG4gICAgICAgIGNvbnN0IGJyb3dzZXJGb3JtRGF0YSA9IGZvcm1EYXRhSW5zdGFuY2UgYXMgRm9ybURhdGE7IC8vIEJyb3dzZXIgY29tcGxpYW50IEZvcm1EYXRhXG5cbiAgICAgICAgaWYgKHR5cGVvZiBvYmpEYXRhID09PSAnc3RyaW5nJyB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihvYmpEYXRhKSkge1xuICAgICAgICAgIGNvbnN0IGJsb2JJbnN0YW5jZSA9IG5ldyBCbG9iKFtvYmpEYXRhXSk7XG4gICAgICAgICAgYnJvd3NlckZvcm1EYXRhLmFwcGVuZChrZXksIGJsb2JJbnN0YW5jZSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9iakRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgYnJvd3NlckZvcm1EYXRhLmFwcGVuZChrZXksIG9iakRhdGEsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShvYmpEYXRhKSkge1xuICAgICAgICAgIGNvbnN0IGJsb2IgPSB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5nZXRCbG9iRnJvbVN0cmVhbShcbiAgICAgICAgICAgIG9iakRhdGEgYXMgdW5rbm93biBhcyBSZWFkYWJsZSxcbiAgICAgICAgICAgIG9wdGlvbnMua25vd25MZW5ndGggYXMgbnVtYmVyXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicm93c2VyRm9ybURhdGEuc2V0KGtleSwgYmxvYiBhcyB1bmtub3duIGFzIEZpbGUsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBhcHBlbmRGaWxlVG9GRChwcm9wZXJ0eU5hbWUsIGl0ZW0sIGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgdmFsdWUsIGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29tbW9uUHJvcGVydHlUb0ZEKFxuICAgIGtleTogc3RyaW5nLFxuICAgIHZhbHVlOiBGb3JtRGF0YUlucHV0VmFsdWUsXG4gICAgZm9ybURhdGFBY2M6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGFkZFZhbHVlQmFzZWRPbkZEID0gKGZkS2V5OiBzdHJpbmcsIGZkVmFsdWU6IEZvcm1EYXRhSW5wdXRWYWx1ZSk6IHZvaWQgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNGb3JtRGF0YVBhY2thZ2UoZm9ybURhdGFBY2MpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZmRWYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgIGNvbnNvbGUud2FybignVGhlIHJlY2VpdmVkIHZhbHVlIGlzIGFuIG9iamVjdC4gXFxuJ1xuICAgICAgICAgICsgJ1wiSlNPTi5TdHJpbmdpZnlcIiB3aWxsIGJlIHVzZWQgdG8gYXZvaWQgVHlwZUVycm9yIFxcbidcbiAgICAgICAgICArICdUbyByZW1vdmUgdGhpcyB3YXJuaW5nOiBcXG4nXG4gICAgICAgICAgKyAnQ29uc2lkZXIgc3dpdGNoaW5nIHRvIGJ1aWx0LWluIEZvcm1EYXRhIG9yIGNvbnZlcnRpbmcgdGhlIHZhbHVlIG9uIHlvdXIgb3duLlxcbicpO1xuICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIEpTT04uc3RyaW5naWZ5KGZkVmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBmZFZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgZmRWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgZmRWYWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIEJsb2IgIT09IHVuZGVmaW5lZCAmJiBmZFZhbHVlIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBmZFZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgICdVbmtub3duIHZhbHVlIHR5cGUgZm9yIEZvcm0gRGF0YS4gU3RyaW5nIG9yIEJsb2IgZXhwZWN0ZWQnLFxuICAgICAgICAnQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGEgYWxsb3dzIG9ubHkgc3RyaW5nIG9yIEJsb2IgdmFsdWVzIGZvciBwcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBhdHRhY2htZW50cy4nXG4gICAgICApO1xuICAgIH07XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW06IEZvcm1EYXRhSW5wdXRWYWx1ZSkge1xuICAgICAgICBhZGRWYWx1ZUJhc2VkT25GRChrZXksIGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBhZGRWYWx1ZUJhc2VkT25GRChrZXksIHZhbHVlKTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEZvcm1EYXRhQnVpbGRlcjtcbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL0Vycm9yJztcblxuaW1wb3J0IHtcbiAgUGFnZXNMaXN0QWNjdW11bGF0b3IsXG4gIFBhcnNlZFBhZ2UsXG4gIFBhcnNlZFBhZ2VzTGlzdCxcbiAgUXVlcnlXaXRoUGFnZSxcbiAgUmVzcG9uc2VXaXRoUGFnaW5nLFxuICBVcGRhdGVkVXJsQW5kUXVlcnksXG4gIEFQSUVycm9yT3B0aW9uc1xufSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuaW1wb3J0IHtcbiAgSUJvdW5jZSxcbiAgSUNvbXBsYWludCxcbiAgSVVuc3Vic2NyaWJlLFxuICBJV2hpdGVMaXN0XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vUmVxdWVzdCc7XG5pbXBvcnQge1xuICBTdXBwcmVzc2lvbkRhdGFUeXBlXG59IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIE5hdmlnYXRpb25UaHJ1UGFnZXMgPFQ+IHtcbiAgcmVxdWVzdD86IFJlcXVlc3Q7XG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q/OiBSZXF1ZXN0KSB7XG4gICAgaWYgKHJlcXVlc3QpIHtcbiAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlUGFnZShcbiAgICBpZDogc3RyaW5nLFxuICAgIHBhZ2VVcmw6IHN0cmluZyxcbiAgICB1cmxTZXBhcmF0b3I6IHN0cmluZyxcbiAgICBpdGVyYXRvck5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuICApIDogUGFyc2VkUGFnZSB7XG4gICAgY29uc3QgcGFyc2VkVXJsID0gbmV3IFVSTChwYWdlVXJsKTtcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gcGFyc2VkVXJsO1xuXG4gICAgY29uc3QgcGFnZVZhbHVlID0gcGFnZVVybCAmJiB0eXBlb2YgcGFnZVVybCA9PT0gJ3N0cmluZycgPyBwYWdlVXJsLnNwbGl0KHVybFNlcGFyYXRvcikucG9wKCkgfHwgJycgOiAnJztcbiAgICBsZXQgaXRlcmF0b3JQb3NpdGlvbiA9IG51bGw7XG4gICAgaWYgKGl0ZXJhdG9yTmFtZSkge1xuICAgICAgaXRlcmF0b3JQb3NpdGlvbiA9IHNlYXJjaFBhcmFtcy5oYXMoaXRlcmF0b3JOYW1lKVxuICAgICAgICA/IHNlYXJjaFBhcmFtcy5nZXQoaXRlcmF0b3JOYW1lKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkLFxuICAgICAgcGFnZTogdXJsU2VwYXJhdG9yID09PSAnPycgPyBgPyR7cGFnZVZhbHVlfWAgOiBwYWdlVmFsdWUsXG4gICAgICBpdGVyYXRvclBvc2l0aW9uLFxuICAgICAgdXJsOiBwYWdlVXJsXG4gICAgfSBhcyBQYXJzZWRQYWdlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlUGFnZUxpbmtzKFxuICAgIHJlc3BvbnNlOiBSZXNwb25zZVdpdGhQYWdpbmcsXG4gICAgdXJsU2VwYXJhdG9yOiBzdHJpbmcsXG4gICAgaXRlcmF0b3JOYW1lPzogc3RyaW5nXG4gICk6IFBhcnNlZFBhZ2VzTGlzdCB7XG4gICAgY29uc3QgcGFnZXMgPSBPYmplY3QuZW50cmllcyhyZXNwb25zZS5ib2R5LnBhZ2luZyk7XG4gICAgcmV0dXJuIHBhZ2VzLnJlZHVjZShcbiAgICAgIChhY2M6IFBhZ2VzTGlzdEFjY3VtdWxhdG9yLCBbaWQsIHBhZ2VVcmxdOiBbIGlkOiBzdHJpbmcsIHBhZ2VVcmw6IHN0cmluZ10pID0+IHtcbiAgICAgICAgYWNjW2lkXSA9IHRoaXMucGFyc2VQYWdlKGlkLCBwYWdlVXJsLCB1cmxTZXBhcmF0b3IsIGl0ZXJhdG9yTmFtZSk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fVxuICAgICkgYXMgdW5rbm93biBhcyBQYXJzZWRQYWdlc0xpc3Q7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVVybEFuZFF1ZXJ5KGNsaWVudFVybDogc3RyaW5nLCBxdWVyeT86IFF1ZXJ5V2l0aFBhZ2UpOiBVcGRhdGVkVXJsQW5kUXVlcnkge1xuICAgIGxldCB1cmwgPSBjbGllbnRVcmw7XG4gICAgY29uc3QgcXVlcnlDb3B5ID0geyAuLi5xdWVyeSB9O1xuICAgIGlmIChxdWVyeUNvcHkucGFnZSkge1xuICAgICAgdXJsID0gdXJsam9pbihjbGllbnRVcmwsIHF1ZXJ5Q29weS5wYWdlKTtcbiAgICAgIGRlbGV0ZSBxdWVyeUNvcHkucGFnZTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHVybCxcbiAgICAgIHVwZGF0ZWRRdWVyeTogcXVlcnlDb3B5XG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyByZXF1ZXN0TGlzdFdpdGhQYWdlcyhjbGllbnRVcmw6c3RyaW5nLCBxdWVyeT86IFF1ZXJ5V2l0aFBhZ2UsIE1vZGVsPzoge1xuICAgIG5ldyhkYXRhOiBTdXBwcmVzc2lvbkRhdGFUeXBlKTpcbiAgICBJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3RcbiAgfSk6IFByb21pc2U8VD4ge1xuICAgIGNvbnN0IHsgdXJsLCB1cGRhdGVkUXVlcnkgfSA9IHRoaXMudXBkYXRlVXJsQW5kUXVlcnkoY2xpZW50VXJsLCBxdWVyeSk7XG4gICAgaWYgKHRoaXMucmVxdWVzdCkge1xuICAgICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlV2l0aFBhZ2luZyA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQodXJsLCB1cGRhdGVkUXVlcnkpO1xuICAgICAgLy8gTW9kZWwgaGVyZSBpcyB1c3VhbGx5IHVuZGVmaW5lZCBleGNlcHQgZm9yIFN1cHByZXNzaW9uIENsaWVudFxuICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaXN0KHJlc3BvbnNlLCBNb2RlbCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICBzdGF0dXM6IDUwMCxcbiAgICAgIHN0YXR1c1RleHQ6ICdSZXF1ZXN0IHByb3BlcnR5IGlzIGVtcHR5JyxcbiAgICAgIGJvZHk6IHsgbWVzc2FnZTogJycgfVxuICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBwYXJzZUxpc3QocmVzcG9uc2U6IFJlc3BvbnNlV2l0aFBhZ2luZywgTW9kZWw/OiB7XG4gICAgbmV3KGRhdGE6IFN1cHByZXNzaW9uRGF0YVR5cGUpOlxuICAgIElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdFxuICB9KTogVDtcbn1cbiIsImltcG9ydCAqIGFzIGJhc2U2NCBmcm9tICdiYXNlLTY0JztcbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBheGlvcywge1xuICBBeGlvc0Vycm9yLFxuICBBeGlvc1Jlc3BvbnNlLFxuICBBeGlvc0hlYWRlcnMsXG4gIFJhd0F4aW9zUmVxdWVzdEhlYWRlcnMsXG4gIEF4aW9zUHJveHlDb25maWcsXG59IGZyb20gJ2F4aW9zJztcbmltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuaW1wb3J0IHtcbiAgT25DYWxsUmVxdWVzdE9wdGlvbnMsXG4gIFJlcXVlc3RPcHRpb25zLFxuICBBUElFcnJvck9wdGlvbnMsXG4gIElucHV0Rm9ybURhdGEsXG4gIEFQSVJlc3BvbnNlLFxuICBJcFBvb2xEZWxldGVEYXRhLFxuICBGb3JtRGF0YUlucHV0XG59IGZyb20gJy4uLy4uL1R5cGVzJztcblxuaW1wb3J0IEZvcm1EYXRhQnVpbGRlciBmcm9tICcuL0Zvcm1EYXRhQnVpbGRlcic7XG5pbXBvcnQgU3ViYWNjb3VudHNDbGllbnQgZnJvbSAnLi4vU3ViYWNjb3VudHMnO1xuXG5jbGFzcyBSZXF1ZXN0IHtcbiAgcHJpdmF0ZSB1c2VybmFtZTogc3RyaW5nO1xuICBwcml2YXRlIGtleTogc3RyaW5nO1xuICBwcml2YXRlIHVybDogc3RyaW5nO1xuICBwcml2YXRlIHRpbWVvdXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBoZWFkZXJzOiBBeGlvc0hlYWRlcnM7XG4gIHByaXZhdGUgZm9ybURhdGFCdWlsZGVyOiBGb3JtRGF0YUJ1aWxkZXI7XG4gIHByaXZhdGUgbWF4Qm9keUxlbmd0aDogbnVtYmVyO1xuICBwcml2YXRlIHByb3h5OiBBeGlvc1Byb3h5Q29uZmlnIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zLCBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIHRoaXMudXNlcm5hbWUgPSBvcHRpb25zLnVzZXJuYW1lO1xuICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXk7XG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCBhcyBzdHJpbmc7XG4gICAgdGhpcy50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0O1xuICAgIHRoaXMuaGVhZGVycyA9IHRoaXMubWFrZUhlYWRlcnNGcm9tT2JqZWN0KG9wdGlvbnMuaGVhZGVycyk7XG4gICAgdGhpcy5mb3JtRGF0YUJ1aWxkZXIgPSBuZXcgRm9ybURhdGFCdWlsZGVyKGZvcm1EYXRhKTtcbiAgICB0aGlzLm1heEJvZHlMZW5ndGggPSA1MjQyODgwMDsgLy8gNTAgTUJcbiAgICB0aGlzLnByb3h5ID0gb3B0aW9ucz8ucHJveHk7XG4gIH1cblxuICBhc3luYyByZXF1ZXN0KFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIG9uQ2FsbE9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duIHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3Qgb3B0aW9uczogT25DYWxsUmVxdWVzdE9wdGlvbnMgPSB7IC4uLm9uQ2FsbE9wdGlvbnMgfTtcbiAgICBkZWxldGUgb3B0aW9ucz8uaGVhZGVycztcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IHRoaXMuam9pbkFuZFRyYW5zZm9ybUhlYWRlcnMob25DYWxsT3B0aW9ucyk7XG4gICAgY29uc3QgcGFyYW1zID0geyAuLi5vcHRpb25zIH07XG5cbiAgICBpZiAob3B0aW9ucz8ucXVlcnkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob3B0aW9ucz8ucXVlcnkpLmxlbmd0aCA+IDApIHtcbiAgICAgIHBhcmFtcy5wYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKG9wdGlvbnMucXVlcnkpO1xuICAgICAgZGVsZXRlIHBhcmFtcy5xdWVyeTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucz8uYm9keSkge1xuICAgICAgY29uc3QgYm9keSA9IG9wdGlvbnM/LmJvZHk7XG4gICAgICBwYXJhbXMuZGF0YSA9IGJvZHk7XG4gICAgICBkZWxldGUgcGFyYW1zLmJvZHk7XG4gICAgfVxuICAgIGxldCByZXNwb25zZTogQXhpb3NSZXNwb25zZTtcbiAgICBjb25zdCB1cmxWYWx1ZSA9IHVybGpvaW4odGhpcy51cmwsIHVybCk7XG5cbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5yZXF1ZXN0KHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QudG9Mb2NhbGVVcHBlckNhc2UoKSxcbiAgICAgICAgdGltZW91dDogdGhpcy50aW1lb3V0LFxuICAgICAgICB1cmw6IHVybFZhbHVlLFxuICAgICAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICBtYXhCb2R5TGVuZ3RoOiB0aGlzLm1heEJvZHlMZW5ndGgsXG4gICAgICAgIHByb3h5OiB0aGlzLnByb3h5LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICBjb25zdCBlcnJvclJlc3BvbnNlID0gZXJyIGFzIEF4aW9zRXJyb3I7XG5cbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgIHN0YXR1czogZXJyb3JSZXNwb25zZT8ucmVzcG9uc2U/LnN0YXR1cyB8fCA0MDAsXG4gICAgICAgIHN0YXR1c1RleHQ6IGVycm9yUmVzcG9uc2U/LnJlc3BvbnNlPy5zdGF0dXNUZXh0IHx8IGVycm9yUmVzcG9uc2UuY29kZSxcbiAgICAgICAgYm9keTogZXJyb3JSZXNwb25zZT8ucmVzcG9uc2U/LmRhdGEgfHwgZXJyb3JSZXNwb25zZS5tZXNzYWdlXG4gICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5nZXRSZXNwb25zZUJvZHkocmVzcG9uc2UpO1xuICAgIHJldHVybiByZXMgYXMgQVBJUmVzcG9uc2U7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldFJlc3BvbnNlQm9keShyZXNwb25zZTogQXhpb3NSZXNwb25zZSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXMgPSB7XG4gICAgICBib2R5OiB7fSxcbiAgICAgIHN0YXR1czogcmVzcG9uc2U/LnN0YXR1c1xuICAgIH0gYXMgQVBJUmVzcG9uc2U7XG5cbiAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAocmVzcG9uc2UuZGF0YSA9PT0gJ01haWxndW4gTWFnbmlmaWNlbnQgQVBJJykge1xuICAgICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgIHN0YXR1c1RleHQ6ICdJbmNvcnJlY3QgdXJsJyxcbiAgICAgICAgICBib2R5OiByZXNwb25zZS5kYXRhXG4gICAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHJlcy5ib2R5ID0ge1xuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5kYXRhXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMuYm9keSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBwcml2YXRlIGpvaW5BbmRUcmFuc2Zvcm1IZWFkZXJzKFxuICAgIG9uQ2FsbE9wdGlvbnM/OiBPbkNhbGxSZXF1ZXN0T3B0aW9uc1xuICApOiBBeGlvc0hlYWRlcnMge1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gbmV3IEF4aW9zSGVhZGVycygpO1xuXG4gICAgY29uc3QgYmFzaWMgPSBiYXNlNjQuZW5jb2RlKGAke3RoaXMudXNlcm5hbWV9OiR7dGhpcy5rZXl9YCk7XG4gICAgcmVxdWVzdEhlYWRlcnMuc2V0QXV0aG9yaXphdGlvbihgQmFzaWMgJHtiYXNpY31gKTtcbiAgICByZXF1ZXN0SGVhZGVycy5zZXQodGhpcy5oZWFkZXJzKTtcblxuICAgIGNvbnN0IHJlY2VpdmVkT25DYWxsSGVhZGVycyA9IG9uQ2FsbE9wdGlvbnMgJiYgb25DYWxsT3B0aW9ucy5oZWFkZXJzO1xuICAgIGNvbnN0IG9uQ2FsbEhlYWRlcnMgPSB0aGlzLm1ha2VIZWFkZXJzRnJvbU9iamVjdChyZWNlaXZlZE9uQ2FsbEhlYWRlcnMpO1xuICAgIHJlcXVlc3RIZWFkZXJzLnNldChvbkNhbGxIZWFkZXJzKTtcbiAgICByZXR1cm4gcmVxdWVzdEhlYWRlcnM7XG4gIH1cblxuICBwcml2YXRlIG1ha2VIZWFkZXJzRnJvbU9iamVjdChcbiAgICBoZWFkZXJzT2JqZWN0OiBSYXdBeGlvc1JlcXVlc3RIZWFkZXJzID0ge31cbiAgKTogQXhpb3NIZWFkZXJzIHtcbiAgICBsZXQgcmVxdWVzdEhlYWRlcnMgPSBuZXcgQXhpb3NIZWFkZXJzKCk7XG4gICAgcmVxdWVzdEhlYWRlcnMgPSBPYmplY3QuZW50cmllcyhoZWFkZXJzT2JqZWN0KS5yZWR1Y2UoXG4gICAgICAoaGVhZGVyc0FjY3VtdWxhdG9yOiBBeGlvc0hlYWRlcnMsIGN1cnJlbnRQYWlyKSA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGN1cnJlbnRQYWlyO1xuICAgICAgICBoZWFkZXJzQWNjdW11bGF0b3Iuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gaGVhZGVyc0FjY3VtdWxhdG9yO1xuICAgICAgfSwgcmVxdWVzdEhlYWRlcnNcbiAgICApO1xuICAgIHJldHVybiByZXF1ZXN0SGVhZGVycztcbiAgfVxuXG4gIHNldFN1YmFjY291bnRIZWFkZXIoc3ViYWNjb3VudElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBoZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3Qoe1xuICAgICAgLi4udGhpcy5oZWFkZXJzLFxuICAgICAgW1N1YmFjY291bnRzQ2xpZW50LlNVQkFDQ09VTlRfSEVBREVSXTogc3ViYWNjb3VudElkXG4gICAgfSk7XG4gICAgdGhpcy5oZWFkZXJzLnNldChoZWFkZXJzKTtcbiAgfVxuXG4gIHJlc2V0U3ViYWNjb3VudEhlYWRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmhlYWRlcnMuZGVsZXRlKFN1YmFjY291bnRzQ2xpZW50LlNVQkFDQ09VTlRfSEVBREVSKTtcbiAgfVxuXG4gIHF1ZXJ5KFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIHF1ZXJ5PzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBBcnJheTxBcnJheTxzdHJpbmc+PixcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHsgcXVlcnksIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICBjb21tYW5kKFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IFJlY29yZDxzdHJpbmcsIHVua25vd24+W10gfCBzdHJpbmcgfCBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSxcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sXG4gICAgYWRkRGVmYXVsdEhlYWRlcnMgPSB0cnVlXG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBsZXQgaGVhZGVycyA9IHt9O1xuICAgIGlmIChhZGREZWZhdWx0SGVhZGVycykge1xuICAgICAgaGVhZGVycyA9IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH07XG4gICAgfVxuICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgLi4uaGVhZGVycyxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgcmVxdWVzdE9wdGlvbnNcbiAgICApO1xuICB9XG5cbiAgZ2V0KFxuICAgIHVybDogc3RyaW5nLFxuICAgIHF1ZXJ5PzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBBcnJheTxBcnJheTxzdHJpbmc+PixcbiAgICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5KCdnZXQnLCB1cmwsIHF1ZXJ5LCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3QoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgc3RyaW5nLFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncG9zdCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0V2l0aEZEKFxuICAgIHVybDogc3RyaW5nLFxuICAgIGRhdGE6IEZvcm1EYXRhSW5wdXRcbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncG9zdCcsIHVybCwgZm9ybURhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyB9XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcHV0V2l0aEZEKHVybDogc3RyaW5nLCBkYXRhOiBGb3JtRGF0YUlucHV0KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBwYXRjaFdpdGhGRCh1cmw6IHN0cmluZywgZGF0YTogRm9ybURhdGFJbnB1dCk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuZm9ybURhdGFCdWlsZGVyLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3BhdGNoJywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBwdXQodXJsOiBzdHJpbmcsIGRhdGE/OiBGb3JtRGF0YUlucHV0IHwgc3RyaW5nLCBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pXG4gIDogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICBkZWxldGUodXJsOiBzdHJpbmcsIGRhdGE/OiBJcFBvb2xEZWxldGVEYXRhKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ2RlbGV0ZScsIHVybCwgZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdDtcbiIsImV4cG9ydCBlbnVtIFJlc29sdXRpb24ge1xuICAgIEhPVVIgPSAnaG91cicsXG4gICAgREFZID0gJ2RheScsXG4gICAgTU9OVEggPSAnbW9udGgnXG59XG5cbmV4cG9ydCBlbnVtIFN1cHByZXNzaW9uTW9kZWxzIHtcbiAgICBCT1VOQ0VTID0gJ2JvdW5jZXMnLFxuICAgIENPTVBMQUlOVFMgPSAnY29tcGxhaW50cycsXG4gICAgVU5TVUJTQ1JJQkVTID0gJ3Vuc3Vic2NyaWJlcycsXG4gICAgV0hJVEVMSVNUUyA9ICd3aGl0ZWxpc3RzJ1xufVxuXG5leHBvcnQgZW51bSBXZWJob29rc0lkcyB7XG4gICAgQ0xJQ0tFRCA9ICdjbGlja2VkJyxcbiAgICBDT01QTEFJTkVEID0gJ2NvbXBsYWluZWQnLFxuICAgIERFTElWRVJFRCA9ICdkZWxpdmVyZWQnLFxuICAgIE9QRU5FRCA9ICdvcGVuZWQnLFxuICAgIFBFUk1BTkVOVF9GQUlMID0gJ3Blcm1hbmVudF9mYWlsJyxcbiAgICBURU1QT1JBUllfRkFJTCA9ICd0ZW1wb3JhcnlfZmFpbCcsXG4gICAgVU5TVUJTQ1JJQkVEID0gJ3Vuc3Vic2NyaWJlJyxcbn1cblxuZXhwb3J0IGVudW0gWWVzTm8ge1xuICAgIFlFUyA9ICd5ZXMnLFxuICAgIE5PID0gJ25vJ1xufVxuIiwiZXhwb3J0IGludGVyZmFjZSBJTG9nZ2VyIHtcbiAgd2FybihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkXG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0xvZ2dlcic7XG4iLCJpbXBvcnQge1xuICBEb21haW5DcmVkZW50aWFscyxcbiAgRG9tYWluQ3JlZGVudGlhbHNMaXN0LFxuICBEb21haW5DcmVkZW50aWFsc1F1ZXJ5LFxuICBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCxcbiAgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5DcmVkZW50aWFscyB7XG4gICAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk6IERvbWFpbkNyZWRlbnRpYWxzUXVlcnkpOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzTGlzdD5cbiAgICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERvbWFpbkNyZWRlbnRpYWxzXG4gICAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD5cbiAgICB1cGRhdGUoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IFVwZGF0ZURvbWFpbkNyZWRlbnRpYWxzRGF0YVxuICAgICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+XG4gICAgZGVzdHJveShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZ1xuICAgICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCB7IFJlc29sdXRpb24gfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQge1xuICBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnc0l0ZW0sXG4gIERvbWFpblRhZ3NMaXN0LFxuICBEb21haW5UYWdzTWVzc2FnZVJlcyxcbiAgRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5LFxuICBEb21haW5UYWdTdGF0aXN0aWNJdGVtXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQge1xuICAgIHRhZzogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgc3RhcnQ6IERhdGU7XG4gICAgZW5kOiBEYXRlO1xuICAgIHJlc29sdXRpb246IFJlc29sdXRpb247XG4gICAgc3RhdHM6IERvbWFpblRhZ1N0YXRpc3RpY0l0ZW1bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluVGFnc0NsaWVudCB7XG4gICAgbGlzdChkb21haW46IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnc0xpc3Q+XG4gICAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnc0l0ZW0+XG4gICAgdXBkYXRlKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGFnOiBzdHJpbmcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgICApOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPlxuICAgIGRlc3Ryb3koXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZ1xuICAgICk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+XG4gICAgc3RhdGlzdGljKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGFnOiBzdHJpbmcsXG4gICAgICAgIHF1ZXJ5OiBEb21haW5UYWdzU3RhdGlzdGljUXVlcnlcbiAgICApOiBQcm9taXNlPElEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQ+XG4gICAgY291bnRyaWVzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24+XG4gICAgcHJvdmlkZXJzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24+XG4gICAgZGV2aWNlcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbj5cbn1cbiIsImltcG9ydCB7XG4gIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgRG9tYWluVGVtcGxhdGVEYXRhLFxuICBEb21haW5UZW1wbGF0ZXNRdWVyeSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhLFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhLFxuICBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhLFxuICBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0LFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBOb3RpZmljYXRpb25SZXN1bHQsXG4gIFNob3J0VGVtcGxhdGVWZXJzaW9uLFxuICBUZW1wbGF0ZVF1ZXJ5LFxuICBUZW1wbGF0ZVZlcnNpb24sXG4gIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHRcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpblRlbXBsYXRlIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBjcmVhdGVkQXQ6IHN0cmluZyB8IERhdGU7XG4gICAgY3JlYXRlZEJ5OiBzdHJpbmc7XG4gICAgaWQ6IHN0cmluZztcbiAgICB2ZXJzaW9uPzogVGVtcGxhdGVWZXJzaW9uO1xuICAgIHZlcnNpb25zPzogU2hvcnRUZW1wbGF0ZVZlcnNpb25bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IHtcbiAgICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5KTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0PlxuICAgIGdldChkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHF1ZXJ5PzogVGVtcGxhdGVRdWVyeSk6IFByb21pc2U8SURvbWFpblRlbXBsYXRlPlxuICAgIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogRG9tYWluVGVtcGxhdGVEYXRhKTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+XG4gICAgdXBkYXRlKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YVxuICAgICk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD5cbiAgICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZyk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD5cbiAgICBkZXN0cm95QWxsKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxOb3RpZmljYXRpb25SZXN1bHQ+XG4gICAgY3JlYXRlVmVyc2lvbihcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgICAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhXG4gICAgKSA6IFByb21pc2U8Q3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PlxuICAgIGdldFZlcnNpb24oZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8SURvbWFpblRlbXBsYXRlPlxuICAgIHVwZGF0ZVZlcnNpb24oXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgdGFnOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGFcbiAgICApOiBQcm9taXNlPE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD5cbiAgICBkZXN0cm95VmVyc2lvbihcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PlxuICAgIGxpc3RWZXJzaW9ucyhcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgICAgICBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5KTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdD5cbn1cbiIsImltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcbmltcG9ydCB7XG4gIENsaWNrVHJhY2tpbmdJbmZvLFxuICBDb25uZWN0aW9uU2V0dGluZ3MsXG4gIERLSU1BdXRob3JpdHlJbmZvLFxuICBES0lNU2VsZWN0b3JJbmZvLFxuICBEb21haW5JbmZvLFxuICBEb21haW5zUXVlcnksXG4gIERvbWFpblRyYWNraW5nRGF0YSxcbiAgRG9tYWluVXBkYXRlSW5mbyxcbiAgTWVzc2FnZVJlc3BvbnNlLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBSZXBsYWNlbWVudEZvclBvb2wsXG4gIFREb21haW4sXG4gIFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvLFxuICBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzLFxuICBVcGRhdGVkREtJTUF1dGhvcml0eSxcbiAgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlLFxuICBVcGRhdGVkT3BlblRyYWNraW5nLFxuICBVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2UsXG4gIFdlYlByZWZpeEluZm9cbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5pbXBvcnQgeyBJRG9tYWluQ3JlZGVudGlhbHMgfSBmcm9tICcuL0RvbWFpbkNyZWRlbnRpYWxzJztcbmltcG9ydCB7IElEb21haW5UYWdzQ2xpZW50IH0gZnJvbSAnLi9Eb21haW5UYWdzJztcbmltcG9ydCB7IElEb21haW5UZW1wbGF0ZXNDbGllbnQgfSBmcm9tICcuL0RvbWFpblRlbXBsYXRlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpbnNDbGllbnQge1xuICAgIGRvbWFpbkNyZWRlbnRpYWxzOiBJRG9tYWluQ3JlZGVudGlhbHNcbiAgICBkb21haW5UZW1wbGF0ZXM6IElEb21haW5UZW1wbGF0ZXNDbGllbnRcbiAgICBkb21haW5UYWdzOiBJRG9tYWluVGFnc0NsaWVudFxuICAgIGxpc3QocXVlcnk/OiBEb21haW5zUXVlcnkpOiBQcm9taXNlPFREb21haW5bXT5cbiAgICBnZXQoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPFREb21haW4+XG4gICAgY3JlYXRlKGRhdGE6IERvbWFpbkluZm8pOiBQcm9taXNlPFREb21haW4+XG4gICAgdXBkYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBEb21haW5VcGRhdGVJbmZvKTogUHJvbWlzZTxURG9tYWluPlxuICAgIHZlcmlmeShkb21haW46IHN0cmluZyk6IFByb21pc2U8VERvbWFpbj5cbiAgICBkZXN0cm95KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxNZXNzYWdlUmVzcG9uc2U+XG4gICAgZ2V0Q29ubmVjdGlvbihkb21haW46IHN0cmluZyk6IFByb21pc2U8Q29ubmVjdGlvblNldHRpbmdzPlxuICAgIHVwZGF0ZUNvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcsIGRhdGE6IENvbm5lY3Rpb25TZXR0aW5ncyk6IFByb21pc2U8VXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncz5cbiAgICBnZXRUcmFja2luZyhkb21haW46IHN0cmluZyk6IFByb21pc2U8RG9tYWluVHJhY2tpbmdEYXRhPlxuICAgIHVwZGF0ZVRyYWNraW5nKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdHlwZTogc3RyaW5nLFxuICAgICAgICBkYXRhOiBPcGVuVHJhY2tpbmdJbmZvIHwgQ2xpY2tUcmFja2luZ0luZm8gfCBVbnN1YnNjcmliZVRyYWNraW5nSW5mb1xuICAgICk6IFByb21pc2U8VXBkYXRlZE9wZW5UcmFja2luZz5cbiAgICBnZXRJcHMoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPlxuICAgIGFzc2lnbklwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT5cbiAgICBkZWxldGVJcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIGxpbmtJcFBvb2woZG9tYWluOiBzdHJpbmcsIHBvb2xfaWQ6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+XG4gICAgdW5saW5rSXBQb2xsKGRvbWFpbjogc3RyaW5nLCByZXBsYWNlbWVudDogUmVwbGFjZW1lbnRGb3JQb29sKTogUHJvbWlzZTxBUElSZXNwb25zZT5cbiAgICB1cGRhdGVES0lNQXV0aG9yaXR5KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNQXV0aG9yaXR5SW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1BdXRob3JpdHk+XG4gICAgdXBkYXRlREtJTVNlbGVjdG9yKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNU2VsZWN0b3JJbmZvKTogUHJvbWlzZTxVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2U+XG4gICAgdXBkYXRlV2ViUHJlZml4KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBXZWJQcmVmaXhJbmZvKTogUHJvbWlzZTxVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2U+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0RvbWFpbkNyZWRlbnRpYWxzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGFncyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRlbXBsYXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpbnNDbGllbnQnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmltcG9ydCB7IEV2ZW50c0xpc3QsIEV2ZW50c1F1ZXJ5IH0gZnJvbSAnLi4vLi4vVHlwZXMvRXZlbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJRXZlbnRDbGllbnQge1xuICBnZXQoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRXZlbnRzUXVlcnkpIDogUHJvbWlzZTxFdmVudHNMaXN0PlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JRXZlbnRDbGllbnQnO1xuIiwiaW1wb3J0IHtcbiAgSXBQb29sQ3JlYXRlRGF0YSwgSXBQb29sQ3JlYXRlUmVzdWx0LFxuICBJcFBvb2xEZWxldGVEYXRhLCBJcFBvb2xMaXN0UmVzdWx0LFxuICBJcFBvb2xNZXNzYWdlUmVzdWx0LCBJcFBvb2xVcGRhdGVEYXRhXG59IGZyb20gJy4uLy4uL1R5cGVzL0lQUG9vbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJUFBvb2xzQ2xpZW50IHtcbiAgbGlzdCgpOiBQcm9taXNlPElwUG9vbExpc3RSZXN1bHQ+XG4gIGNyZWF0ZShkYXRhOiBJcFBvb2xDcmVhdGVEYXRhKTogUHJvbWlzZTxJcFBvb2xDcmVhdGVSZXN1bHQ+XG4gIHVwZGF0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sVXBkYXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD5cbiAgZGVsZXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xEZWxldGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JSVBQb29sc0NsaWVudCc7XG4iLCJpbXBvcnQgeyBJcERhdGEsIElQc0xpc3RRdWVyeSwgSXBzTGlzdFJlc3BvbnNlQm9keSB9IGZyb20gJy4uLy4uL1R5cGVzL0lQcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUlQc0NsaWVudCB7XG4gIGxpc3QocXVlcnk6IElQc0xpc3RRdWVyeSk6IFByb21pc2U8SXBzTGlzdFJlc3BvbnNlQm9keT5cbiAgZ2V0KGlwOiBzdHJpbmcpOiBQcm9taXNlPElwRGF0YT5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSUlQc0NsaWVudCc7XG4iLCJpbXBvcnQgeyBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzUmVzdWx0LCBJbmJveFBsYWNlbWVudHNWYWx1ZXNSZXN1bHQgfSBmcm9tICcuLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IHtcbiAgbGlzdCgpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNSZXN1bHQ+O1xuICBnZXQoYXR0cmlidXRlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNWYWx1ZXNSZXN1bHQ+O1xufVxuIiwiaW1wb3J0IHsgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc1Jlc3VsdCB9IGZyb20gJy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQge1xuICBsaXN0KCk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzRmlsdGVyc1Jlc3VsdD5cbn1cbiIsImltcG9ydCB7IEluYm94UGxhY2VtZW50c0RhdGEsIEluYm94UGxhY2VtZW50c1Rlc3RSZXN1bHQgfSBmcm9tICcuLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgfSBmcm9tICcuL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0cyc7XG5pbXBvcnQgeyBJU2VlZHNMaXN0c0NsaWVudCB9IGZyb20gJy4vU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50JztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgfSBmcm9tICcuL3Byb3ZpZGVycy9JbmJveFBsYWNlbWVudHNQcm92aWRlcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJbmJveFBsYWNlbWVudHNDbGllbnQge1xuICAgIHNlZWRzTGlzdHM6IElTZWVkc0xpc3RzQ2xpZW50O1xuICAgIHJlc3VsdHM6IElJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50O1xuICAgIHByb3ZpZGVyczogSUluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudDtcbiAgICBydW5UZXN0KGRhdGE6IEluYm94UGxhY2VtZW50c0RhdGEpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Rlc3RSZXN1bHQ+O1xufVxuIiwiaW1wb3J0IHtcbiAgSW5ib3hQbGFjZW1lbnRzRGVzdHJveVJlc3VsdCxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0V2l0aFN0YXR1cyxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3QsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdHNRdWVyeVxufSBmcm9tICcuLi8uLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQgfSBmcm9tICcuLi9BdHRyaWJ1dGVzQ2xpZW50JztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50IH0gZnJvbSAnLi4vRmlsdGVyc0NsaWVudCc7XG5pbXBvcnQgeyBJSVBSU2hhcmluZ0NsaWVudCB9IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50IHtcbiAgc2hhcmluZzogSUlQUlNoYXJpbmdDbGllbnQ7XG4gIGF0dHJpYnV0ZXM6IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50O1xuICBmaWx0ZXJzOiBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudDtcbiAgbGlzdChxdWVyeTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1F1ZXJ5KTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdD47XG4gIGdldChhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Jlc3VsdFdpdGhTdGF0dXM+O1xuICBkZXN0cm95KGlkOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c0Rlc3Ryb3lSZXN1bHQ+O1xuICBnZXRSZXN1bHRCeVNoYXJlSWQoc2hhcmVJZDogc3RyaW5nKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNSZXN1bHRXaXRoU3RhdHVzPjtcbn1cbiIsImltcG9ydCB7XG4gIElQUlNoYXJpbmdSZXN1bHQsXG4gIElQUlNoYXJpbmdVcGRhdGVEYXRhLFxuICBJUFJTaGFyaW5nVXBkYXRlUmVzdWx0XG59IGZyb20gJy4uLy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUlQUlNoYXJpbmdDbGllbnQge1xuICBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8SVBSU2hhcmluZ1Jlc3VsdD47XG4gIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBJUFJTaGFyaW5nVXBkYXRlRGF0YSk6IFByb21pc2U8SVBSU2hhcmluZ1VwZGF0ZVJlc3VsdD47XG59XG4iLCJpbXBvcnQge1xuICBTZWVkTGlzdFJlc3VsdCxcbiAgU2VlZHNMaXN0c0NyZWF0aW5nRGF0YSxcbiAgU2VlZHNMaXN0c0Rlc3Ryb3lBcGlSZXNwb25zZSxcbiAgU2VlZHNMaXN0c1F1ZXJ5LFxuICBTZWVkc0xpc3RzUmVzdWx0LFxuICBTZWVkc0xpc3RzVXBkYXRpbmdEYXRhLFxufSBmcm9tICcuLi8uLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQgfSBmcm9tICcuLi9BdHRyaWJ1dGVzQ2xpZW50JztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50IH0gZnJvbSAnLi4vRmlsdGVyc0NsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlZWRzTGlzdHNDbGllbnQge1xuICBhdHRyaWJ1dGVzOiBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudDtcbiAgZmlsdGVyczogSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQ7XG4gIGxpc3QocXVlcnk6IFNlZWRzTGlzdHNRdWVyeSk6IFByb21pc2U8U2VlZHNMaXN0c1Jlc3VsdD47XG4gIGdldChhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFNlZWRMaXN0UmVzdWx0PjtcbiAgY3JlYXRlKGRhdGE6IFNlZWRzTGlzdHNDcmVhdGluZ0RhdGEpOiBQcm9taXNlPFNlZWRMaXN0UmVzdWx0PjtcbiAgdXBkYXRlKGFkZHJlc3M6IHN0cmluZywgZGF0YTogU2VlZHNMaXN0c1VwZGF0aW5nRGF0YSk6IFByb21pc2U8U2VlZExpc3RSZXN1bHQ+O1xuICBkZXN0cm95KGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8U2VlZHNMaXN0c0Rlc3Ryb3lBcGlSZXNwb25zZT47XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0luYm94UGxhY2VtZW50c0NsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL0F0dHJpYnV0ZXNDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9GaWx0ZXJzQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzJztcbmV4cG9ydCAqIGZyb20gJy4vUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZyc7XG4iLCJpbXBvcnQgeyBJV2ViSG9va3NDbGllbnQgfSBmcm9tICcuLi9XZWJob29rcyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCB7IElEb21haW5zQ2xpZW50IH0gZnJvbSAnLi4vRG9tYWlucyc7XG5pbXBvcnQgeyBJRXZlbnRDbGllbnQgfSBmcm9tICcuLi9FdmVudENsaWVudCc7XG5pbXBvcnQgeyBJU3RhdHNDbGllbnQgfSBmcm9tICcuLi9TdGF0cyc7XG5pbXBvcnQgeyBJTWVzc2FnZXNDbGllbnQgfSBmcm9tICcuLi9NZXNzYWdlcyc7XG5pbXBvcnQgeyBJU3VwcHJlc3Npb25DbGllbnQgfSBmcm9tICcuLi9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgSVJvdXRlc0NsaWVudCB9IGZyb20gJy4uL1JvdXRlcyc7XG5pbXBvcnQgeyBJVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4uL1ZhbGlkYXRpb25zJztcbmltcG9ydCB7IElJUHNDbGllbnQgfSBmcm9tICcuLi9JUHMnO1xuaW1wb3J0IHsgSUlQUG9vbHNDbGllbnQgfSBmcm9tICcuLi9JUFBvb2xzJztcbmltcG9ydCB7IElNYWlsaW5nTGlzdHNDbGllbnQgfSBmcm9tICcuLi9NYWlsaW5nTGlzdHMnO1xuaW1wb3J0IHsgSVN1YmFjY291bnRzQ2xpZW50IH0gZnJvbSAnLi4vU3ViYWNjb3VudHMnO1xuaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c0NsaWVudCB9IGZyb20gJy4uL0luYm94UGxhY2VtZW50cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1haWxndW5DbGllbnQge1xuICAgIGRvbWFpbnM6IElEb21haW5zQ2xpZW50O1xuICAgIHdlYmhvb2tzOiBJV2ViSG9va3NDbGllbnQ7XG4gICAgZXZlbnRzOiBJRXZlbnRDbGllbnQ7XG4gICAgc3RhdHM6IElTdGF0c0NsaWVudDtcbiAgICBzdXBwcmVzc2lvbnM6IElTdXBwcmVzc2lvbkNsaWVudDtcbiAgICBtZXNzYWdlczogSU1lc3NhZ2VzQ2xpZW50O1xuICAgIHJvdXRlczogSVJvdXRlc0NsaWVudDtcbiAgICB2YWxpZGF0ZTogSVZhbGlkYXRpb25DbGllbnQ7XG4gICAgaXBzOiBJSVBzQ2xpZW50O1xuICAgIGlwX3Bvb2xzOiBJSVBQb29sc0NsaWVudDtcbiAgICBsaXN0czogSU1haWxpbmdMaXN0c0NsaWVudDtcbiAgICBzdWJhY2NvdW50czogSVN1YmFjY291bnRzQ2xpZW50O1xuICAgIGluYm94X3BsYWNlbWVudHM6IElJbmJveFBsYWNlbWVudHNDbGllbnQ7XG4gICAgc2V0U3ViYWNjb3VudChzdWJhY2NvdW50SWQ6IHN0cmluZyk6IHZvaWQ7XG4gICAgcmVzZXRTdWJhY2NvdW50KCk6IHZvaWQ7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lNYWlsZ3VuQ2xpZW50JztcbiIsImltcG9ydCB7XG4gIE1haWxMaXN0TWVtYmVyc1F1ZXJ5LFxuICBNYWlsTGlzdE1lbWJlcnNSZXN1bHQsXG4gIE1haWxMaXN0TWVtYmVyLFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMsXG4gIE11bHRpcGxlTWVtYmVyc0RhdGEsXG4gIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlLFxuICBEZWxldGVkTWVtYmVyXG59IGZyb20gJy4uLy4uL1R5cGVzL01haWxpbmdMaXN0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1haWxMaXN0c01lbWJlcnMge1xuICBsaXN0TWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBxdWVyeT86IE1haWxMaXN0TWVtYmVyc1F1ZXJ5XG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXJzUmVzdWx0PjtcblxuICBnZXRNZW1iZXIoYWRkcmVzczogc3RyaW5nLCBtZW1iZXJBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPixcbiAgY3JlYXRlTWVtYmVyKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+LFxuICBjcmVhdGVNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlTWVtYmVyc0RhdGEpOiBQcm9taXNlPE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlPixcbiAgdXBkYXRlTWVtYmVyKFxuICAgIGFkZHJlc3M6IHN0cmluZyxcbiAgICBtZW1iZXJBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4sXG4gIGRlc3Ryb3lNZW1iZXIoYWRkcmVzczogc3RyaW5nLCBtZW1iZXJBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPERlbGV0ZWRNZW1iZXI+XG59XG4iLCJpbXBvcnQge1xuICBDcmVhdGVVcGRhdGVMaXN0LCBEZXN0cm95ZWRMaXN0LCBMaXN0c1F1ZXJ5LCBNYWlsaW5nTGlzdCxcbiAgTWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0LCBNYWlsaW5nTGlzdFJlc3VsdCxcbiAgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0LCBTdGFydFZhbGlkYXRpb25SZXN1bHRcbn0gZnJvbSAnLi4vLi4vVHlwZXMvTWFpbGluZ0xpc3RzJztcbmltcG9ydCB7IElNYWlsTGlzdHNNZW1iZXJzIH0gZnJvbSAnLi9NYWlsaW5nTGlzdE1lbWJlcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNYWlsaW5nTGlzdHNDbGllbnQge1xuICBtZW1iZXJzOiBJTWFpbExpc3RzTWVtYmVycztcbiAgbGlzdChxdWVyeT86IExpc3RzUXVlcnkpOiBQcm9taXNlPE1haWxpbmdMaXN0UmVzdWx0PlxuICBnZXQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0PlxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+XG4gIHVwZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+XG4gIGRlc3Ryb3kobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3llZExpc3Q+XG4gIHZhbGlkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxTdGFydFZhbGlkYXRpb25SZXN1bHQ+XG4gIHZhbGlkYXRpb25SZXN1bHQobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdD5cbiAgY2FuY2VsVmFsaWRhdGlvbihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3RDYW5jZWxWYWxpZGF0aW9uUmVzdWx0PlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdE1lbWJlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdHNDbGllbnQnO1xuIiwiaW1wb3J0IHsgTWFpbGd1bk1lc3NhZ2VEYXRhLCBNZXNzYWdlc1NlbmRSZXN1bHQgfSBmcm9tICcuLi8uLi9UeXBlcy9NZXNzYWdlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1lc3NhZ2VzQ2xpZW50IHtcbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBNYWlsZ3VuTWVzc2FnZURhdGEpOiBQcm9taXNlPE1lc3NhZ2VzU2VuZFJlc3VsdD5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSU1lc3NhZ2VzQ2xpZW50JztcbiIsImltcG9ydCB7XG4gIENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSwgRGVzdHJveVJvdXRlUmVzcG9uc2UsIFJvdXRlLCBSb3V0ZXNMaXN0UXVlcnksIFVwZGF0ZVJvdXRlUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvUm91dGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBJUm91dGVzQ2xpZW50IHtcbiAgbGlzdChxdWVyeTogUm91dGVzTGlzdFF1ZXJ5KTogUHJvbWlzZTxSb3V0ZVtdPlxuICBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8Um91dGU+XG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFJvdXRlPlxuICB1cGRhdGUoaWQ6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxVcGRhdGVSb3V0ZVJlc3BvbnNlPlxuICBkZXN0cm95KGlkOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3lSb3V0ZVJlc3BvbnNlPlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JUm91dGVzQ2xpZW50JztcbiIsImltcG9ydCB7IFN0YXRzUXVlcnkgfSBmcm9tICcuLi8uLi9UeXBlcy9TdGF0cyc7XG5pbXBvcnQgeyBJU3RhdHNDb250YWluZXIgfSBmcm9tICcuL1N0YXRzQ29udGFpbmVyJztcblxuZXhwb3J0IGludGVyZmFjZSBJU3RhdHNDbGllbnQge1xuICBnZXREb21haW4oZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8SVN0YXRzQ29udGFpbmVyPlxuICBnZXRBY2NvdW50KHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8SVN0YXRzQ29udGFpbmVyPlxufVxuIiwiaW1wb3J0IHsgU3RhdCB9IGZyb20gJy4uLy4uL1R5cGVzL1N0YXRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJU3RhdHNDb250YWluZXIge1xuICAgIHN0YXJ0OiBEYXRlO1xuICAgIGVuZDogRGF0ZTtcbiAgICByZXNvbHV0aW9uOiBzdHJpbmc7XG4gICAgc3RhdHM6IFN0YXRbXTtcbiAgfVxuIiwiZXhwb3J0ICogZnJvbSAnLi9TdGF0c0NsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRzQ29udGFpbmVyJztcbiIsImltcG9ydCB7IFN1YmFjY291bnRMaXN0UmVzcG9uc2VEYXRhLCBTdWJhY2NvdW50UmVzcG9uc2VEYXRhLCBTdWJhY2NvdW50c1F1ZXJ5IH0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdWJhY2NvdW50c0NsaWVudCB7XG4gIGxpc3QocXVlcnk/OiBTdWJhY2NvdW50c1F1ZXJ5KTogUHJvbWlzZTxTdWJhY2NvdW50TGlzdFJlc3BvbnNlRGF0YT5cbiAgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+XG4gIGNyZWF0ZShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+XG4gIGRpc2FibGUoaWQ6IHN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT5cbiAgZW5hYmxlKGlkOiBzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lTdWJhY2NvdW50c0NsaWVudCc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUJvdW5jZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG4gICAgdHlwZTogc3RyaW5nO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgaW50ZXJmYWNlIElDb21wbGFpbnQge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xuICAgIHR5cGU6IHN0cmluZztcbn1cbiIsImltcG9ydCB7XG4gIFN1cHByZXNzaW9uTGlzdCxcbiAgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQsXG4gIFN1cHByZXNzaW9uTGlzdFF1ZXJ5LFxuICBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHRcbn0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcbmltcG9ydCB7IElCb3VuY2UgfSBmcm9tICcuL0JvdW5jZSc7XG5pbXBvcnQgeyBJQ29tcGxhaW50IH0gZnJvbSAnLi9Db21wbGFpbnQnO1xuaW1wb3J0IHsgSVVuc3Vic2NyaWJlIH0gZnJvbSAnLi9VbnN1YnNjcmliZSc7XG5pbXBvcnQgeyBJV2hpdGVMaXN0IH0gZnJvbSAnLi9XaGl0ZUxpc3QnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdXBwcmVzc2lvbkNsaWVudCB7XG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgcXVlcnk/OiBTdXBwcmVzc2lvbkxpc3RRdWVyeSk6IFByb21pc2U8U3VwcHJlc3Npb25MaXN0PlxuXG4gIGdldChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8SUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0PlxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgfCBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YVtdXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdD5cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQ+XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVVuc3Vic2NyaWJlIHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgdGFnczogYW55O1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG4gICAgdHlwZTogc3RyaW5nO1xufVxuIiwiZXhwb3J0IGludGVyZmFjZSBJV2hpdGVMaXN0IHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICByZWFzb246IHN0cmluZztcbiAgICBjcmVhdGVkQXQ6IERhdGU7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0JvdW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL0NvbXBsYWludCc7XG5leHBvcnQgKiBmcm9tICcuL1Vuc3Vic2NyaWJlJztcbmV4cG9ydCAqIGZyb20gJy4vV2hpdGVMaXN0JztcbmV4cG9ydCAqIGZyb20gJy4vSVN1cHByZXNzaW9uc0NsaWVudCc7XG4iLCJpbXBvcnQge1xuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdCxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0LFxuICBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYixcbiAgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhLFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFF1ZXJ5XG59IGZyb20gJy4uLy4uL1R5cGVzL1ZhbGlkYXRpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IHtcbiAgbGlzdChxdWVyeT86TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeSk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+XG4gIGdldChsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0PlxuICBjcmVhdGUoXG4gICAgbGlzdElkOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj5cbiAgZGVzdHJveShsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8Q2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCB7IFZhbGlkYXRpb25SZXN1bHQgfSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQgeyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi9NdWx0aXBsZVZhbGlkYXRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uQ2xpZW50IHtcbiAgbXVsdGlwbGVWYWxpZGF0aW9uOiBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50XG4gIGdldChhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFZhbGlkYXRpb25SZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL011bHRpcGxlVmFsaWRhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL1ZhbGlkYXRpb24nO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmltcG9ydCB7IFdlYmhvb2tzSWRzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHtcbiAgV2ViaG9va0xpc3QsXG4gIFdlYmhvb2tSZXN1bHQsXG4gIFdlYmhvb2tzUXVlcnksXG4gIFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMvV2ViaG9va3MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElXZWJIb29rc0NsaWVudCB7XG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5OiBXZWJob29rc1F1ZXJ5KTogUHJvbWlzZTxXZWJob29rTGlzdD5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBpZDogV2ViaG9va3NJZHMpOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+XG4gIGNyZWF0ZShkb21haW46IHN0cmluZyxcbiAgICBpZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIHRlc3Q6IGJvb2xlYW5cbiAgKTogUHJvbWlzZTxXZWJob29rUmVzdWx0IHwgV2ViaG9va1ZhbGlkYXRpb25SZXNwb25zZT5cbiAgdXBkYXRlKGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nLCB1cmw6IHN0cmluZyB8IHN0cmluZ1tdKTogUHJvbWlzZTxXZWJob29rUmVzdWx0PlxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nKSA6IFByb21pc2U8V2ViaG9va1Jlc3VsdD5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSVdlYkhvb2tzQ2xpZW50JztcbiIsImV4cG9ydCAqIGZyb20gJy4vQ29tbW9uJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWlucyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxndW5DbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdGF0cyc7XG5leHBvcnQgKiBmcm9tICcuL1N1cHByZXNzaW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL1ZhbGlkYXRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9XZWJob29rcyc7XG5leHBvcnQgKiBmcm9tICcuL01lc3NhZ2VzJztcbmV4cG9ydCAqIGZyb20gJy4vUm91dGVzJztcbmV4cG9ydCAqIGZyb20gJy4vSVBzJztcbmV4cG9ydCAqIGZyb20gJy4vSVBQb29scyc7XG5leHBvcnQgKiBmcm9tICcuL1N1YmFjY291bnRzJztcbmV4cG9ydCAqIGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzJztcbiIsImV4cG9ydCB0eXBlIEFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IGFueTtcbn1cbiIsImV4cG9ydCB0eXBlIEFQSUVycm9yT3B0aW9ucyA9IHtcbiAgaGVhZGVycz86IHsgW2tleTogc3RyaW5nXTogdW5rbm93biB9O1xuICBzdGF0dXM6IG51bWJlcjtcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgYm9keToge1xuICAgIGVycm9yPzogc3RyaW5nLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmdcbiAgfTtcbiAgdXJsPzogc3RyaW5nO1xuICBzdGF0dXNUZXh0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBBUElFcnJvclR5cGUgPSB7XG4gIHN0YWNrOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGRldGFpbHM6IHN0cmluZztcbn1cbiIsImltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0IHsgRm9ybURhdGFJbnB1dFZhbHVlIH0gZnJvbSAnLi4vTWVzc2FnZXMnO1xuXG5leHBvcnQgdHlwZSBGb3JtRGF0YU9wdGlvbnMgPSB7XG4gIFtrZXk6IHN0cmluZ106IE5vZGVGb3JtRGF0YTtcbn1cblxuZXhwb3J0IHR5cGUgSW5wdXRGb3JtRGF0YSA9XG4gIHtcbiAgICBuZXcoZm9ybT86IEhUTUxGb3JtRWxlbWVudCB8IHVuZGVmaW5lZCwgc3VibWl0dGVyPzogSFRNTEVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkKTogRm9ybURhdGE7XG4gIH0gfFxuICB7XG4gICAgbmV3KG9wdGlvbnM/OiBGb3JtRGF0YU9wdGlvbnMpOiBOb2RlRm9ybURhdGFcbiAgfVxuXG5leHBvcnQgdHlwZSBGb3JtRGF0YUlucHV0ID0ge1xuICBba2V5OiBzdHJpbmddOiBGb3JtRGF0YUlucHV0VmFsdWU7XG59O1xuIiwiZXhwb3J0IHR5cGUgUGFnZXNMaXN0ID0ge1xuICAgIHByZXZpb3VzOiBzdHJpbmc7XG4gICAgZmlyc3Q6IHN0cmluZztcbiAgICBsYXN0OiBzdHJpbmc7XG4gICAgbmV4dDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBQYXJzZWRQYWdlID0ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcGFnZTogc3RyaW5nO1xuICAgIGl0ZXJhdG9yUG9zaXRpb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICB1cmw6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBQYXJzZWRQYWdlc0xpc3QgPSB7XG4gICAgcHJldmlvdXM6IFBhcnNlZFBhZ2U7XG4gICAgZmlyc3Q6IFBhcnNlZFBhZ2U7XG4gICAgbGFzdDogUGFyc2VkUGFnZTtcbiAgICBuZXh0OiBQYXJzZWRQYWdlO1xufVxuXG5leHBvcnQgdHlwZSBQYWdlc0xpc3RBY2N1bXVsYXRvciA9IHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFBhcnNlZFBhZ2U7XG59XG5cbmV4cG9ydCB0eXBlIFJlc3BvbnNlV2l0aFBhZ2luZyA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBRdWVyeVdpdGhQYWdlID0ge1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRVcmxBbmRRdWVyeSA9IHtcbiAgICB1cmw6IHN0cmluZztcbiAgICB1cGRhdGVkUXVlcnk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xufVxuIiwiaW1wb3J0IHsgQXhpb3NSZXF1ZXN0SGVhZGVycywgUmF3QXhpb3NSZXF1ZXN0SGVhZGVycyB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IE1haWxndW5DbGllbnRPcHRpb25zIH0gZnJvbSAnLi4vTWFpbGd1bkNsaWVudCc7XG5cbmV4cG9ydCB0eXBlIE9uQ2FsbEVtcHR5SGVhZGVycyA9IHtcbiAgW2tleTogc3RyaW5nXTogdW5kZWZpbmVkO1xufVxuZXhwb3J0IHR5cGUgUmVxdWVzdE9wdGlvbnMgPSBNYWlsZ3VuQ2xpZW50T3B0aW9ucyAmIHtcbiAgaGVhZGVyczogQXhpb3NSZXF1ZXN0SGVhZGVycyB8IFJhd0F4aW9zUmVxdWVzdEhlYWRlcnM7XG4gIHRpbWVvdXQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgT25DYWxsUmVxdWVzdE9wdGlvbnMgPSB7XG4gIHRpbWVvdXQ/OiBudW1iZXI7XG4gIGhlYWRlcnM/OiBBeGlvc1JlcXVlc3RIZWFkZXJzIHwgUmF3QXhpb3NSZXF1ZXN0SGVhZGVycztcbiAgcXVlcnk/OiBhbnk7XG4gIFtrZXk6IHN0cmluZ106IHVua25vd24gfCB1bmRlZmluZWQ7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0Vycm9yJztcbmV4cG9ydCAqIGZyb20gJy4vQXBpUmVzcG9uc2UnO1xuZXhwb3J0ICogZnJvbSAnLi9Gb3JtRGF0YSc7XG5leHBvcnQgKiBmcm9tICcuL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9SZXF1ZXN0T3B0aW9ucyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzUXVlcnkgPSB7XG4gICAgbGltaXQ6IG51bWJlcjtcbiAgICBza2lwOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzID0ge1xuICAgIGxvZ2luOiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHNJdGVtID0ge1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZyxcbiAgICBsb2dpbjogc3RyaW5nLFxuICAgIG1haWxib3g6IHN0cmluZyxcbiAgICBzaXplX2J5dGVzOiBudW1iZXIgfCBudWxsXG59XG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBEb21haW5DcmVkZW50aWFsc0l0ZW1bXTtcbiAgICAgICAgdG90YWxfY291bnQ6IG51bWJlcjtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzTGlzdCA9IHtcbiAgICBpdGVtczogRG9tYWluQ3JlZGVudGlhbHNJdGVtW107XG4gICAgdG90YWxDb3VudDogbnVtYmVyO1xufVxuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXIsXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHNwZWM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcixcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyLFxuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICBzcGVjOiBzdHJpbmc7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGEgPSB7XG4gICAgcGFzc3dvcmQ6IHN0cmluZztcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHsgUmVzb2x1dGlvbiB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc1F1ZXJ5ID0ge1xuICAgIGxpbWl0OiBudW1iZXI7XG4gICAgcGFnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5ID0ge1xuICAgIGV2ZW50OiBzdHJpbmc7XG4gICAgc3RhcnQ/OiBudW1iZXI7XG4gICAgZW5kPzogbnVtYmVyO1xuICAgIHJlc29sdXRpb24/OiBSZXNvbHV0aW9uO1xuICAgIGR1cmF0aW9uPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzSXRlbUluZm8gPSB7XG4gICAgdGFnOiBzdHJpbmcsXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgICAnZmlyc3Qtc2Vlbic6IHN0cmluZyxcbiAgICAnbGFzdC1zZWVuJzogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NJdGVtID0ge1xuICAgIHRhZzogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgJ2ZpcnN0LXNlZW4nOiBEYXRlLFxuICAgICdsYXN0LXNlZW4nOiBEYXRlXG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NSZXNwb25zZURhdGEgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogRG9tYWluVGFnc0l0ZW1JbmZvW107XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzTGlzdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBpdGVtczogRG9tYWluVGFnc0l0ZW1bXTtcbiAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzTWVzc2FnZVJlcyA9IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgc3RhdHVzPzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSA9IHtcbiAgICB0aW1lOnN0cmluZ1xuICAgIGFjY2VwdGVkPzoge1xuICAgICAgICBpbmNvbWluZzogbnVtYmVyO1xuICAgICAgICBvdXRnb2luZzogbnVtYmVyO1xuICAgICAgICB0b3RhbDogbnVtYmVyXG4gICAgfVxuICAgIGRlbGl2ZXJlZD86IHtcbiAgICAgICAgc210cDogbnVtYmVyO1xuICAgICAgICBodHRwOiBudW1iZXI7XG4gICAgICAgIG9wdGltaXplZDogbnVtYmVyO1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH07XG4gICAgb3BlbmVkPzoge1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH07XG4gICAgZmFpbGVkPzoge1xuICAgICAgICB0ZW1wb3Jhcnk6e1xuICAgICAgICAgICAgZXNwYmxvY2s6IG51bWJlcjtcbiAgICAgICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgICAgIHBlcm1hbmVudDoge1xuICAgICAgICAgICAgJ3N1cHByZXNzLWJvdW5jZSc6IG51bWJlcjtcbiAgICAgICAgICAgICdzdXBwcmVzcy11bnN1YnNjcmliZSc6IG51bWJlcjtcbiAgICAgICAgICAgICdzdXBwcmVzcy1jb21wbGFpbnQnOiBudW1iZXI7XG4gICAgICAgICAgICBib3VuY2U6IG51bWJlcjtcbiAgICAgICAgICAgICdkZWxheWVkLWJvdW5jZSc6IG51bWJlcjtcbiAgICAgICAgICAgIHdlYmhvb2s6IG51bWJlcjtcbiAgICAgICAgICAgIG9wdGltaXplZDogbnVtYmVyO1xuICAgICAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNsaWNrZWQ/OiB7XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfTtcbiAgICB1bnN1YnNjcmliZWQ/OiB7XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfTtcbiAgICBjb21wbGFpbmVkPzoge1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH07XG4gICAgc3RvcmVkPzoge1xuICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlID0ge1xuICAgIGJvZHk6e1xuICAgICAgICB0YWc6IHN0cmluZztcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICAgICAgc3RhcnQ6IHN0cmluZztcbiAgICAgICAgZW5kOiBzdHJpbmc7XG4gICAgICAgIHJlc29sdXRpb246IFJlc29sdXRpb247XG4gICAgICAgIHN0YXRzOiBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbVtdO1xuICAgIH1cbn1cbmV4cG9ydCB0eXBlIERvbWFpblRhZ1N0YXRpc3RpY0l0ZW0gPSBPbWl0IDxEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSwgJ3RpbWUnPiAmIHtcbiAgICB0aW1lOiBEYXRlXG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ0NvdW50cmllc0FQSVJlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgdGFnOnN0cmluZztcbiAgICAgICAgY291bnRyeToge1xuICAgICAgICAgICAgW2tleTpzdHJpbmddOiB7XG4gICAgICAgICAgICAgICAgY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIGNvbXBsYWluZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBvcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bmlxdWVfY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuaXF1ZV9vcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uID0ge1xuICAgIHRhZzpzdHJpbmc7XG4gICAgY291bnRyeToge1xuICAgICAgICBba2V5OiBzdHJpbmddOiB7XG4gICAgICAgICAgICBjbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgICAgICAgICBvcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuaXF1ZV9jbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICB1bmlxdWVfb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICB1bnN1YnNjcmliZWQ6IG51bWJlcjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICB0YWc6c3RyaW5nO1xuICAgICAgICBwcm92aWRlcjoge1xuICAgICAgICAgICAgW2tleTpzdHJpbmddOiB7XG4gICAgICAgICAgICAgICAgYWNjZXB0ZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBjbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgY29tcGxhaW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIG9wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuaXF1ZV9jbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5pcXVlX29wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlZDogbnVtYmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24gPSB7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgcHJvdmlkZXI6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICAgICAgYWNjZXB0ZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIGNsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIGNvbXBsYWluZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIGRlbGl2ZXJlZDogbnVtYmVyO1xuICAgICAgICAgICAgb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICB1bmlxdWVfY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5pcXVlX29wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBEZXZpY2VTdGF0aXN0aWMgPSB7XG4gICAgY2xpY2tlZDogbnVtYmVyO1xuICAgIGNvbXBsYWluZWQ6IG51bWJlcjtcbiAgICBvcGVuZWQ6IG51bWJlcjtcbiAgICB1bmlxdWVfY2xpY2tlZDogbnVtYmVyO1xuICAgIHVuaXF1ZV9vcGVuZWQ6IG51bWJlcjtcbiAgICB1bnN1YnNjcmliZWQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRGV2aWNlc1R5cGVzID0ge1xuICAgIGRlc2t0b3A6IERldmljZVN0YXRpc3RpYztcbiAgICBtb2JpbGU6IERldmljZVN0YXRpc3RpYztcbiAgICB0YWJsZXQ6IERldmljZVN0YXRpc3RpYztcbiAgICB1bmtub3duOiBEZXZpY2VTdGF0aXN0aWM7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ0RldmljZXNBUElSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIHRhZzpzdHJpbmc7XG4gICAgICAgIGRldmljZTogRGV2aWNlc1R5cGVzO1xuICAgIH1cbiAgICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uID0ge1xuICAgIHRhZzogc3RyaW5nO1xuICAgIGRldmljZTogRGV2aWNlc1R5cGVzO1xufVxuIiwiaW1wb3J0IHsgWWVzTm8gfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJRG9tYWluVGVtcGxhdGUgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIERvbWFpblRlbXBsYXRlRGF0YSA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICB0ZW1wbGF0ZTogc3RyaW5nO1xuICAgIHRhZz86IHN0cmluZztcbiAgICBlbmdpbmU/OiBzdHJpbmc7XG4gICAgY29tbWVudD86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YSA9IHtcbiAgICB0ZW1wbGF0ZTogc3RyaW5nO1xuICAgIHRhZzogc3RyaW5nO1xuICAgIGVuZ2luZT86IHN0cmluZztcbiAgICBjb21tZW50Pzogc3RyaW5nO1xuICAgIGFjdGl2ZT86IFllc05vO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGEgPSB7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YSA9IHtcbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbiAgICBjb21tZW50Pzogc3RyaW5nO1xuICAgIGFjdGl2ZT86IFllc05vO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UZW1wbGF0ZXNRdWVyeSA9IHtcbiAgICAvKiogJ3BhZ2UnIChvcHRpb25hbGx5ICdwJykgcGFyYW1zIGZyb20gcHJldmlvdXMgcmVzcG9uc2UncyAncGFnaW5nJyBvYmplY3QuXG4gICAgICogVmFsdWUgbXVzdCBiZSBzdHJpbmdpZmllZCBhcyBxdWVyeSBwYXJhbXMuIEV4OiAnP3BhZ2U9Zmlyc3QnLCc/cGFnZT1uZXh0JnA9bmFtZS1vZi1sYXN0LWl0ZW0nXG4gICAgIC4uLi4gKi9cbiAgICBwYWdlPzogYD8ke3N0cmluZ31gO1xuICAgIC8qKiBOdW1iZXIgb2YgcmVjb3JkcyB0byByZXRyaWV2ZS4gRGVmYXVsdCB2YWx1ZSBpcyAxMC4gKi9cbiAgICBsaW1pdD86IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgVGVtcGxhdGVRdWVyeSA9IHtcbiAgICBhY3RpdmU6IFllc05vO1xufVxuXG5leHBvcnQgdHlwZSBTaG9ydFRlbXBsYXRlVmVyc2lvbiA9IHtcbiAgICB0YWc6IHN0cmluZztcbiAgICBlbmdpbmU6IHN0cmluZztcbiAgICBtam1sOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBzdHJpbmcgfCBEYXRlO1xuICAgIGNvbW1lbnQ6IHN0cmluZztcbiAgICBhY3RpdmU6IGJvb2xlYW47XG4gICAgaWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgVGVtcGxhdGVWZXJzaW9uID0gU2hvcnRUZW1wbGF0ZVZlcnNpb24gJiB7XG4gICAgdGVtcGxhdGU6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgdGVtcGxhdGU6IElEb21haW5UZW1wbGF0ZTtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogSURvbWFpblRlbXBsYXRlW107XG4gICAgICAgIHBhZ2luZzoge1xuICAgICAgICAgICAgZmlyc3Q6IHN0cmluZztcbiAgICAgICAgICAgIGxhc3Q6IHN0cmluZztcbiAgICAgICAgICAgIG5leHQ6IHN0cmluZztcbiAgICAgICAgICAgIHByZXZpb3VzOiBzdHJpbmc7XG4gICAgICAgIH07XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdCA9IHtcbiAgICAgICAgaXRlbXM6IElEb21haW5UZW1wbGF0ZVtdO1xuICAgICAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xuICAgICAgICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgbmFtZTogc3RyaW5nXG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0ZW1wbGF0ZU5hbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIE5vdGlmaWNhdGlvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICB0ZW1wbGF0ZTogSURvbWFpblRlbXBsYXRlO1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdGVtcGxhdGU6IElEb21haW5UZW1wbGF0ZTtcbn1cblxuZXhwb3J0IHR5cGUgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgICAgICB2ZXJzaW9uOiB7XG4gICAgICAgICAgICAgICAgdGFnOiBzdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZztcbiAgICB0ZW1wbGF0ZVZlcnNpb246IHtcbiAgICAgICAgdGFnOiBzdHJpbmc7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgICAgICAgICBjcmVhdGVkQXQ6IHN0cmluZztcbiAgICAgICAgICAgIGNyZWF0ZWRCeTogc3RyaW5nO1xuICAgICAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgICAgICAgIHZlcnNpb25zOiBTaG9ydFRlbXBsYXRlVmVyc2lvbltdXG4gICAgICAgIH1cbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3Q7XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQgPSB7XG4gICAgdGVtcGxhdGU6IElEb21haW5UZW1wbGF0ZTtcbiAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmV4cG9ydCB0eXBlIERvbWFpblRyYWNraW5nRGF0YSA9IHtcbiAgY2xpY2s6IHsgYWN0aXZlOiBib29sZWFuIH07XG4gIG9wZW46IHsgYWN0aXZlOiBib29sZWFuIH07XG4gIHVuc3Vic2NyaWJlOiB7XG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIGh0bWxfZm9vdGVyOiBzdHJpbmc7XG4gICAgdGV4dF9mb290ZXI6IHN0cmluZztcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UcmFja2luZ1Jlc3BvbnNlID0ge1xuICBzdGF0dXM6IG51bWJlcjtcbiAgYm9keToge1xuICAgIHRyYWNraW5nOiBEb21haW5UcmFja2luZ0RhdGFcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZE9wZW5UcmFja2luZyA9IHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBvcGVuPzogeyBhY3RpdmU6IGJvb2xlYW4gfTtcbiAgY2xpY2s/OiB7IGFjdGl2ZTogYm9vbGVhbiB8ICdodG1sb25seScgfTtcbiAgdW5zdWJzY3JpYmU/OiB7XG4gICAgYWN0aXZlOiBib29sZWFuLFxuICAgIGh0bWxfZm9vdGVyOiBzdHJpbmc7XG4gICAgdGV4dF9mb290ZXI6IHN0cmluZztcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSA9IHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIGJvZHk6IFVwZGF0ZWRPcGVuVHJhY2tpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE9wZW5UcmFja2luZ0luZm8gPSB7XG4gIGFjdGl2ZTogJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwgJ2ZhbHNlJztcbn1cbmV4cG9ydCB0eXBlIENsaWNrVHJhY2tpbmdJbmZvID0ge1xuICBhY3RpdmU6ICd5ZXMnIHwgJ25vJyB8ICd0cnVlJyB8ICdmYWxzZScgfCAnaHRtbG9ubHknO1xufVxuXG5leHBvcnQgdHlwZSBVbnN1YnNjcmliZVRyYWNraW5nSW5mbyA9IHtcbiAgYWN0aXZlOiAneWVzJyB8ICdubycgfCAndHJ1ZScgfCAnZmFsc2UnO1xuICBodG1sX2Zvb3Rlcjogc3RyaW5nO1xuICB0ZXh0X2Zvb3Rlcjogc3RyaW5nO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBEb21haW5zUXVlcnkgPSB7XG4gICAgYXV0aG9yaXR5PyA6IHN0cmluZztcbiAgICBzdGF0ZT86ICdhY3RpdmUnIHwgJ3VudmVyaWZpZWQnIHwgJ2Rpc2FibGVkJztcbiAgICBsaW1pdD86IG51bWJlcjtcbiAgICBza2lwPzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5VcGRhdGVJbmZvID0ge1xuICAgIHNwYW1fYWN0aW9uPzogJ2Rpc2FibGVkJyB8ICdibG9jaycgfCAndGFnJztcbiAgICB3ZWJfc2NoZW1lPzogJ2h0dHAnIHwgJ2h0dHBzJztcbiAgICB3aWxkY2FyZD86IGJvb2xlYW4gfCAndHJ1ZScgfCAnZmFsc2UnO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5VcGRhdGVJbmZvUmVxID0gRG9tYWluVXBkYXRlSW5mbyAmIHtcbiAgICB3aWxkY2FyZD86ICd0cnVlJyB8ICdmYWxzZSc7IC8vIGFwaSBzdXBwb3J0cyBvbmx5IHN0cmluZ3Ncbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluSW5mbyA9IERvbWFpblVwZGF0ZUluZm8gJiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHNtdHBfcGFzc3dvcmQ6IHN0cmluZztcbiAgICBmb3JjZV9ka2ltX2F1dGhvcml0eT86IGJvb2xlYW4gfCAndHJ1ZScgfCAnZmFsc2UnO1xuICAgIGRraW1fa2V5X3NpemU/OiAxMDI0IHwgMjA0ODtcbiAgICBpcHM/OiAnJztcbiAgICBwb29sX2lkPzogJyc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkluZm9SZXEgPSBEb21haW5JbmZvICYge1xuICAgIGZvcmNlX2RraW1fYXV0aG9yaXR5PzogJ3RydWUnIHwgJ2ZhbHNlJztcbn1cblxuZXhwb3J0IHR5cGUgQm9vbFRvU3RyaW5nID0ge1xuICAgIGZvcmNlX2RraW1fYXV0aG9yaXR5PzogRG9tYWluSW5mb1snZm9yY2VfZGtpbV9hdXRob3JpdHknXTtcbiAgICB3aWxkY2FyZD86IERvbWFpblVwZGF0ZUluZm9bJ3dpbGRjYXJkJ107XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblNob3J0RGF0YSA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gICAgc2tpcF92ZXJpZmljYXRpb246IGJvb2xlYW47XG4gICAgc3RhdGU6IHN0cmluZztcbiAgICB3aWxkY2FyZDogYm9vbGVhbjtcbiAgICBzcGFtX2FjdGlvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgICBzbXRwX3Bhc3N3b3JkOiBzdHJpbmc7XG4gICAgc210cF9sb2dpbjogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluRGF0YSA9IERvbWFpblNob3J0RGF0YSAmIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGlzX2Rpc2FibGVkOiBib29sZWFuO1xuICAgIHdlYl9wcmVmaXg6IHN0cmluZztcbiAgICB3ZWJfc2NoZW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9tYWluc0xpc3RJdGVtIGV4dGVuZHMgRG9tYWluU2hvcnREYXRhe1xuICAgIHJlY2VpdmluZ19kbnNfcmVjb3JkczogbnVsbDtcbiAgICBzZW5kaW5nX2Ruc19yZWNvcmRzOiBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEROU1JlY29yZCB7XG4gICAgY2FjaGVkOiBhbnlbXTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcmVjb3JkX3R5cGU6IHN0cmluZztcbiAgICB2YWxpZDogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgcHJpb3JpdHk/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblJlc3BvbnNlRGF0YSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGRvbWFpbjogRG9tYWluRGF0YTtcbiAgICAgICAgbWVzc2FnZT86IHN0cmluZztcbiAgICAgICAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXTtcbiAgICAgICAgc2VuZGluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW107XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5MaXN0UmVzcG9uc2VEYXRhID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IERvbWFpbnNMaXN0SXRlbVtdIHwgbnVsbDtcbiAgICAgICAgdG90YWxfY291bnQ6IG51bWJlcjtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VSZXNwb25zZSA9IHtcbiAgICBtZXNzYWdlIDogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIERlc3Ryb3llZERvbWFpblJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IE1lc3NhZ2VSZXNwb25zZVxufVxuXG5leHBvcnQgdHlwZSBDb25uZWN0aW9uU2V0dGluZ3MgPSB7XG4gICAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gICAgc2tpcF92ZXJpZmljYXRpb246IGJvb2xlYW47XG59XG5leHBvcnQgdHlwZSBDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIGNvbm5lY3Rpb246IENvbm5lY3Rpb25TZXR0aW5nc1xuICAgIH1cbiAgICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzID0ge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICByZXF1aXJlX3RsczogYm9vbGVhbjtcbiAgICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhblxufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzID0ge1xuICAgIGJvZHk6IFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3M7XG4gICAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgREtJTUF1dGhvcml0eUluZm8gPSB7XG4gICAgc2VsZjogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJyB8ICd0cnVlJyB8J2ZhbHNlJ1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkREtJTUF1dGhvcml0eSA9IHtcbiAgICBjaGFuZ2VkOiBib29sZWFuO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzZW5kaW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXVxufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlID0ge1xuICAgIGJvZHk6IFVwZGF0ZWRES0lNQXV0aG9yaXR5O1xuICAgIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBES0lNU2VsZWN0b3JJbmZvID0ge1xuICAgIGRraW1TZWxlY3Rvcjogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRES0lNU2VsZWN0b3JSZXNwb25zZSA9IHtcbiAgICBib2R5Ok1lc3NhZ2VSZXNwb25zZTtcbiAgICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBXZWJQcmVmaXhJbmZvID0ge1xuICAgIHdlYlByZWZpeDogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRXZWJQcmVmaXggPSB7XG4gICAgbWVzc2FnZSA6IHN0cmluZ1xufVxuZXhwb3J0IHR5cGUgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlID0ge1xuICAgIGJvZHk6TWVzc2FnZVJlc3BvbnNlO1xuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFJlcGxhY2VtZW50Rm9yUG9vbCA9IHtcbiAgICBwb29sX2lkPzogc3RyaW5nO1xuICAgIGlwPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBURG9tYWluID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgc3RhdGU6IHN0cmluZztcbiAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gIHNwYW1fYWN0aW9uOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICBzbXRwX2xvZ2luOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgaWQ/OiBzdHJpbmc7XG4gIGlzX2Rpc2FibGVkPzogYm9vbGVhbjtcbiAgd2ViX3ByZWZpeD86IHN0cmluZztcbiAgd2ViX3NjaGVtZT86IHN0cmluZztcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vRG9tYWluQ3JlZGVudGlhbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5zJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGFncyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRlbXBsYXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpblRyYWNraW5nJztcbiIsImltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcblxuZXhwb3J0IHR5cGUgRXZlbnRzUGFnZSA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG51bWJlcjogc3RyaW5nO1xuICAgIHVybDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBGaWx0ZXJGaWVsZCA9IHtcbiAgICBldmVudD86IHN0cmluZztcbiAgICBsaXN0Pzogc3RyaW5nO1xuICAgIGF0dGFjaG1lbnQ/OiBzdHJpbmc7XG4gICAgZnJvbT86IHN0cmluZztcbiAgICAnbWVzc2FnZS1pZCc/OiBzdHJpbmc7XG4gICAgc3ViamVjdD86IHN0cmluZztcbiAgICB0bz86IHN0cmluZztcbiAgICBzaXplPzogc3RyaW5nO1xuICAgIHJlY2lwaWVudD86IHN0cmluZztcbiAgICByZWNpcGllbnRzPzogc3RyaW5nO1xuICAgIHRhZ3M/OiBzdHJpbmc7XG4gICAgc2V2ZXJpdHk/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEV2ZW50c1F1ZXJ5ID0gRmlsdGVyRmllbGQgJiB7XG4gICAgcGFnZT86IHN0cmluZztcbiAgICBiZWdpbj86IHN0cmluZztcbiAgICBlbmQ/OiBzdHJpbmc7XG4gICAgYXNjZW5kaW5nPzogJ3llcyd8ICdubyc7XG4gICAgbGltaXQ/OiBudW1iZXI7XG59XG5leHBvcnQgdHlwZSBFdmVudHNSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBbXTtcbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3Q7XG4gICAgfSxcbiAgICBzdGF0dXM6IG51bWJlclxufVxuZXhwb3J0IHR5cGUgRG9tYWluRXZlbnQgPSB7XG4gICAgc2V2ZXJpdHk6IHN0cmluZztcbiAgICB0YWdzOiBzdHJpbmdbXTtcbiAgICBzdG9yYWdlOiB7XG4gICAgICAgIHVybDogc3RyaW5nO1xuICAgICAgICBrZXk6IHN0cmluZ1xuICAgIH07XG4gICAgJ2RlbGl2ZXJ5LXN0YXR1cyc6IHtcbiAgICAgICAgdGxzOiBib29sZWFuO1xuICAgICAgICAnbXgtaG9zdCc6IHN0cmluZztcbiAgICAgICAgY29kZTogbnVtYmVyO1xuICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgICAgICAnc2Vzc2lvbi1zZWNvbmRzJzogbnVtYmVyO1xuICAgICAgICB1dGY4OiBib29sZWFuO1xuICAgICAgICAnYXR0ZW1wdC1ubyc6IG51bWJlcjtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICAnY2VydGlmaWNhdGUtdmVyaWZpZWQnOiBib29sZWFuXG4gICAgfTtcbiAgICAncmVjaXBpZW50LWRvbWFpbic6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIGNhbXBhaWduczogW107XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgJ3VzZXItdmFyaWFibGVzJzoge1xuICAgICAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICAgIH07XG4gICAgZmxhZ3M6IHtcbiAgICAgICAgJ2lzLXJvdXRlZCc6IGJvb2xlYW47XG4gICAgICAgICdpcy1hdXRoZW50aWNhdGVkJzogYm9vbGVhbjtcbiAgICAgICAgJ2lzLXN5c3RlbS10ZXN0JzogYm9vbGVhbjtcbiAgICAgICAgJ2lzLXRlc3QtbW9kZSc6IGJvb2xlYW5cbiAgICB9O1xuICAgICdsb2ctbGV2ZWwnIDogc3RyaW5nO1xuICAgIHRlbXBsYXRlPzogdW5rbm93bjtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICBlbnZlbG9wZToge1xuICAgICAgICB0cmFuc3BvcnQ6IHN0cmluZztcbiAgICAgICAgc2VuZGVyOiBzdHJpbmc7XG4gICAgICAgICdzZW5kaW5nLWlwJzogc3RyaW5nO1xuICAgICAgICB0YXJnZXRzOiBzdHJpbmdcbiAgICB9O1xuICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgdG86IHN0cmluZztcbiAgICAgICAgICAgICdtZXNzYWdlLWlkJzogc3RyaW5nO1xuICAgICAgICAgICAgZnJvbTogc3RyaW5nO1xuICAgICAgICAgICAgc3ViamVjdDogc3RyaW5nXG4gICAgICAgIH07XG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXTtcbiAgICAgICAgc2l6ZTogMzA4XG4gICAgfTtcbiAgICByZWNpcGllbnQ6IHN0cmluZztcbiAgICBldmVudDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBFdmVudHNMaXN0ID0ge1xuICAgIGl0ZW1zOiBEb21haW5FdmVudFtdO1xuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0V2ZW50cyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIElwUG9vbCA9IHtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaXBzOiBzdHJpbmdbXTtcbiAgaXNfbGlua2VkOiBib29sZWFuO1xuICBuYW1lOiBzdHJpbmc7XG4gIHBvb2xfaWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sTGlzdFJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgaXBfcG9vbHM6IElwUG9vbCxcbiAgICBtZXNzYWdlOiBzdHJpbmdcbiAgfSxcbiAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sTGlzdFJlc3VsdCA9IHtcbiAgaXBfcG9vbHM6IElwUG9vbCxcbiAgbWVzc2FnZTogc3RyaW5nLFxuICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xVcGRhdGVEYXRhID0ge1xuICBuYW1lOiBzdHJpbmcsXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gIGlwczogc3RyaW5nW11cbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sTWVzc2FnZVJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICB9XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xNZXNzYWdlUmVzdWx0ID0ge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xEZWxldGVEYXRhID0ge1xuICBpcD86IHN0cmluZyxcbiAgcG9vbF9pZD86IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xDcmVhdGVEYXRhID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBpcHM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sQ3JlYXRlUmVzcG9uc2UgPSB7XG4gIGJvZHk6IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcG9vbF9pZDogc3RyaW5nO1xuICB9XG4gIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbENyZWF0ZVJlc3VsdCA9IHtcbiAgc3RhdHVzOiBudW1iZXJcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBwb29sX2lkOiBzdHJpbmc7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lwUG9vbHMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBJcHNMaXN0UmVzcG9uc2VCb2R5ID0ge1xuICBhc3NpZ25hYmxlX3RvX3Bvb2xzOiBib29sZWFuO1xuICBpdGVtczogc3RyaW5nW107XG4gIHRvdGFsX2NvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIElwRGF0YSA9IHtcbiAgaXA6IHN0cmluZztcbiAgZGVkaWNhdGVkOiBib29sZWFuO1xuICByZG5zOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIElQc0xpc3RRdWVyeSA9IHtcbiAgZGVkaWNhdGVkOiBib29sZWFuIHwgc3RyaW5nXG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lQcyc7XG4iLCJpbXBvcnQgeyBBeGlvc1Byb3h5Q29uZmlnIH0gZnJvbSAnYXhpb3MnO1xuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBNYWlsZ3VuQ2xpZW50T3B0aW9ucyA9IHtcbiAgdXNlcm5hbWU6IHN0cmluZztcbiAga2V5OiBzdHJpbmc7XG4gIHVybD86IHN0cmluZztcbiAgcHVibGljX2tleT86IHN0cmluZztcbiAgdGltZW91dD86IG51bWJlcjtcbiAgcHJveHk/OiBBeGlvc1Byb3h5Q29uZmlnO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NYWlsZ3VuQ2xpZW50T3B0aW9ucyc7XG4iLCJpbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5pbXBvcnQgeyBNYWlsaW5nTGlzdCB9IGZyb20gJy4vTWFpbGluZ0xpc3RzJztcblxuZXhwb3J0IHR5cGUgTWFpbExpc3RNZW1iZXIgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzdWJzY3JpYmVkOiBib29sZWFuLFxuICAgIHZhcnM6IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93blxuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIE1haWxMaXN0TWVtYmVyc1F1ZXJ5ID0ge1xuICAgIHN1YnNjcmliZWQ/OiAneWVzJyB8ICdubyc7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgcGFnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVNZW1iZXJzRGF0YSA9IHtcbiAgICBtZW1iZXJzOiBBcnJheTxNYWlsTGlzdE1lbWJlcj47XG4gICAgdXBzZXJ0OiAneWVzJyB8ICdubyc7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlTWVtYmVyc1JlcURhdGEgPSB7XG4gICAgbWVtYmVyczogc3RyaW5nO1xuICAgIHVwc2VydDogJ3llcycgfCAnbm8nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdmFycz86IHN0cmluZztcbiAgICBzdWJzY3JpYmVkPzogJ3llcycgfCAnbm8nIHwgYm9vbGVhbjtcbiAgICB1cHNlcnQ/OiAneWVzJyB8ICdubyc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1JlcSA9IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICB2YXJzPzogc3RyaW5nO1xuICAgIHN1YnNjcmliZWQ/OiAneWVzJyB8ICdubycgfCBib29sZWFuO1xuICAgIHVwc2VydD86ICd5ZXMnIHwgJ25vJztcbn1cblxuZXhwb3J0IHR5cGUgRGVsZXRlZE1lbWJlciA9IHtcbiAgICBtZW1iZXI6IHtcbiAgICAgICAgYWRkcmVzczogc3RyaW5nO1xuICAgIH0sXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICB9XG5cbmV4cG9ydCB0eXBlIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlID0ge1xuICAgIGxpc3Q6IE1haWxpbmdMaXN0O1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAndGFzay1pZCc6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWFpbExpc3RNZW1iZXJzUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogTWFpbExpc3RNZW1iZXJbXVxuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdFxuICAgIH0sXG4gICAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgTWFpbExpc3RNZW1iZXJzUmVzdWx0ID0ge1xuICAgIGl0ZW1zOiBNYWlsTGlzdE1lbWJlcltdXG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdFxuICAgIHN0YXR1czogbnVtYmVyXG59XG4iLCJpbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgTGlzdHNRdWVyeSA9IHtcbiAgICBhZGRyZXNzPzogc3RyaW5nO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVVwZGF0ZUxpc3QgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgYWNjZXNzX2xldmVsPzogJ3JlYWRvbmx5JyB8ICdtZW1iZXJzJ3wgJ2V2ZXJ5b25lJztcbiAgICByZXBseV9wcmVmZXJlbmNlPzogJ2xpc3QnIHwgJ3NlbmRlcic7XG59XG5cbmV4cG9ydCB0eXBlIERlc3Ryb3llZExpc3QgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgU3RhcnRWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgICBkb3dubG9hZF91cmw6IHtcbiAgICAgIGNzdjogc3RyaW5nO1xuICAgICAganNvbjogc3RyaW5nXG4gICAgfTtcbiAgICBpZDogc3RyaW5nO1xuICAgIHF1YW50aXR5OiBudW1iZXI7XG4gICAgcmVjb3Jkc19wcm9jZXNzZWQ6IG51bWJlcjtcbiAgICBzdW1tYXJ5OiB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgY2F0Y2hfYWxsOiBudW1iZXI7XG4gICAgICAgIGRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgIGRvX25vdF9zZW5kOiBudW1iZXI7XG4gICAgICAgIHVuZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgdW5rbm93bjogbnVtYmVyXG4gICAgICB9XG4gICAgICByaXNrOiB7XG4gICAgICAgIGhpZ2g6IG51bWJlcjtcbiAgICAgICAgbG93OiBudW1iZXI7XG4gICAgICAgIG1lZGl1bTogbnVtYmVyO1xuICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RWYWxpZGF0aW9uQXBpUmVzcG9uc2UgPSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXNwb25zZSAmIHtcbiAgICBjcmVhdGVkX2F0OiBudW1iZXI7XG59XG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHREYXRhID0gTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzcG9uc2UgJiB7XG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcbn1cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICB2YWxpZGF0aW9uUmVzdWx0OiBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHREYXRhO1xufVxuXG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3QgPSB7XG4gICAgYWNjZXNzX2xldmVsOiBzdHJpbmc7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIG1lbWJlcnNfY291bnQ6IG51bWJlcjtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcmVwbHlfcHJlZmVyZW5jZTogbnVsbCB8IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RSZXN1bHQgPSB7XG4gICAgaXRlbXM6IE1haWxpbmdMaXN0W107XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdFxufVxuXG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdEFwaVJlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IE1haWxpbmdMaXN0W107XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICAgIH1cbiAgICBzdGF0dXM6IG51bWJlcjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RNZW1iZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGluZ0xpc3RzJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKipcbiAqIEVuc3VyZXMgdGhlIG9iamVjdCBoYXMgbGVhc3Qgb25lIGtleSBwcmVzZW50IGFuZCBub3QgdW5kZWZpbmVkXG4gKlxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ5NzI1MTk4fVxuICovXG5leHBvcnQgdHlwZSBBdExlYXN0T25lS2V5UHJlc2VudDxcbiAgT2JqZWN0XyxcbiAgS2V5cyBleHRlbmRzIGtleW9mIE9iamVjdF8gPSBrZXlvZiBPYmplY3RfXG4+ID0gUGljazxPYmplY3RfLCBFeGNsdWRlPGtleW9mIE9iamVjdF8sIEtleXM+PiAmXG4gIHtcbiAgICBbSyBpbiBLZXlzXS0/OiBSZXF1aXJlZDxQaWNrPE9iamVjdF8sIEs+PiAmXG4gICAgICBQYXJ0aWFsPFBpY2s8T2JqZWN0XywgRXhjbHVkZTxLZXlzLCBLPj4+O1xuICB9W0tleXNdO1xuXG5leHBvcnQgdHlwZSBNaW1lTWVzc2FnZSA9IHN0cmluZyB8IEJsb2IgfCBCdWZmZXIgfCBOb2RlSlMuUmVhZGFibGVTdHJlYW07XG5leHBvcnQgdHlwZSBDdXN0b21GaWxlRGF0YSA9IHN0cmluZyB8IEJsb2IgfCBGaWxlIHwgQnVmZmVyIHwgTm9kZUpTLlJlYWRhYmxlU3RyZWFtO1xuXG5leHBvcnQgdHlwZSBDdXN0b21GaWxlID0ge1xuICBkYXRhOiBDdXN0b21GaWxlRGF0YTtcbiAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gIGNvbnRlbnRUeXBlPyA6IHN0cmluZztcbiAga25vd25MZW5ndGg/OiBudW1iZXI7XG4gIFtrZXk6IHN0cmluZ106IHVua25vd247XG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VBdHRhY2htZW50ID1cbiAgQ3VzdG9tRmlsZVxuICB8IEN1c3RvbUZpbGVbXVxuICB8IEZpbGVcbiAgfCBGaWxlW11cbiAgfCBzdHJpbmdcbiAgfCBDdXN0b21GaWxlRGF0YVxuICB8IEN1c3RvbUZpbGVEYXRhW11cblxuZXhwb3J0IHR5cGUgRm9ybURhdGFJbnB1dFZhbHVlID1cbiAgTWltZU1lc3NhZ2VcbiAgfCBDdXN0b21GaWxlRGF0YVxuICB8IHN0cmluZ1xuICB8IHN0cmluZ1tdXG4gIHwgYm9vbGVhblxuICB8IE1lc3NhZ2VBdHRhY2htZW50XG4gIHwgdW5kZWZpbmVkXG4gIHwgbnVtYmVyIC8vIGRvYyBzYXlzIGl0IHNob3VsZCBiZSBhdXRvLWNvbnZlcnRlZCBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRm9ybURhdGEvYXBwZW5kXG4gIHwgSnNvbk9iamVjdFxuXG5leHBvcnQgdHlwZSBKc29uUHJpbWl0aXZlID0gc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGw7XG5leHBvcnQgdHlwZSBKc29uQXJyYXkgPSBKc29uW107XG5leHBvcnQgdHlwZSBKc29uT2JqZWN0ID0geyBba2V5OiBzdHJpbmddOiBKc29uIH07XG5leHBvcnQgdHlwZSBKc29uQ29tcG9zaXRlID0gSnNvbkFycmF5IHwgSnNvbk9iamVjdDtcbmV4cG9ydCB0eXBlIEpzb24gPSBKc29uUHJpbWl0aXZlIHwgSnNvbkNvbXBvc2l0ZTtcblxuZXhwb3J0IHR5cGUgTWFpbGd1bk1lc3NhZ2VDb250ZW50ID0gQXRMZWFzdE9uZUtleVByZXNlbnQ8e1xuICAgIC8qKlxuICAgICAqIEJvZHkgb2YgdGhlIG1lc3NhZ2UuICh0ZXh0IHZlcnNpb24pXG4gICAgICovXG4gICAgdGV4dD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEJvZHkgb2YgdGhlIG1lc3NhZ2UuIChIVE1MIHZlcnNpb24pXG4gICAgICovXG4gICAgaHRtbD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBCb2R5IG9mIHRoZSBtZXNzYWdlLiAoTUlNRSB2ZXJzaW9uKVxuICAgICAqL1xuICAgIG1lc3NhZ2U/OiBNaW1lTWVzc2FnZTtcbiAgICAgLyoqXG4gICAgICogTmFtZSBvZiBhIHRlbXBsYXRlIHN0b3JlZCB2aWEgW3RlbXBsYXRlIEFQSV0oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC9hcGktdGVtcGxhdGVzLmh0bWwjYXBpLXRlbXBsYXRlcykuIFNlZSBbVGVtcGxhdGVzXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjdGVtcGxhdGluZykgZm9yIG1vcmUgaW5mb3JtYXRpb25cbiAgICAgKi9cbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcbn0+O1xuXG5leHBvcnQgdHlwZSBNYWlsZ3VuTWVzc2FnZURhdGEgPSBNYWlsZ3VuTWVzc2FnZUNvbnRlbnQgJiB7XG4gICAgLyoqXG4gICAgICogRW1haWwgYWRkcmVzcyBmb3IgYEZyb21gIGhlYWRlclxuICAgICAqL1xuICAgIGZyb20/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBFbWFpbCBhZGRyZXNzIG9mIHRoZSByZWNpcGllbnQocykuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBgQm9iIDxib2JAaG9zdC5jb20+YC4gWW91IGNhbiB1c2UgY29tbWFzIHRvIHNlcGFyYXRlIG11bHRpcGxlIHJlY2lwaWVudHMuXG4gICAgICovXG4gICAgdG8/OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIFNhbWUgYXMgYFRvYCBidXQgZm9yIGBjYXJib24gY29weWBcbiAgICAgKi9cbiAgICBjYz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBgVG9gIGJ1dCBmb3IgYGJsaW5kIGNhcmJvbiBjb3B5YFxuICAgICAqL1xuICAgIGJjYz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogTWVzc2FnZSBzdWJqZWN0XG4gICAgICovXG4gICAgc3ViamVjdD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFtBTVBdKGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2dtYWlsL2FtcGVtYWlsLykgcGFydCBvZiB0aGUgbWVzc2FnZS4gUGxlYXNlIGZvbGxvdyBnb29nbGUgZ3VpZGVsaW5lcyB0byBjb21wb3NlIGFuZCBzZW5kIEFNUCBlbWFpbHMuXG4gICAgICovXG4gICAgJ2FtcC1odG1sJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEZpbGUgYXR0YWNobWVudC4gWW91IGNhbiBwb3N0IG11bHRpcGxlIGBhdHRhY2htZW50YCB2YWx1ZXMuXG4gICAgICpcbiAgICAgKiAqKkltcG9ydGFudDoqKiBZb3UgbXVzdCB1c2UgYG11bHRpcGFydC9mb3JtLWRhdGFgIGVuY29kaW5nIHdoZW4gc2VuZGluZyBhdHRhY2htZW50cy5cbiAgICAgKi9cbiAgICBhdHRhY2htZW50PzogTWVzc2FnZUF0dGFjaG1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2htZW50IHdpdGggYGlubGluZWAgZGlzcG9zaXRpb24uIENhbiBiZSB1c2VkIHRvIHNlbmQgaW5saW5lIGltYWdlcyAoc2VlIGV4YW1wbGUpLlxuICAgICAqXG4gICAgICogWW91IGNhbiBwb3N0IG11bHRpcGxlIGBpbmxpbmVgIHZhbHVlcy5cbiAgICAgKi9cbiAgICBpbmxpbmU/OiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBVc2UgdGhpcyBwYXJhbWV0ZXIgdG8gc2VuZCBhIG1lc3NhZ2UgdG8gc3BlY2lmaWMgdmVyc2lvbiBvZiBhIHRlbXBsYXRlXG4gICAgICovXG4gICAgJ3Q6dmVyc2lvbic/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBQYXNzIGB5ZXNgIGlmIHlvdSB3YW50IHRvIGhhdmUgcmVuZGVyZWQgdGVtcGxhdGVcbiAgICAgKiBpbiB0aGUgdGV4dCBwYXJ0IG9mIHRoZSBtZXNzYWdlIGluIGNhc2Ugb2YgdGVtcGxhdGUgc2VuZGluZ1xuICAgICAqL1xuICAgICd0OnRleHQnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIEEgdmFsaWQgSlNPTi1lbmNvZGVkIGRpY3Rpb25hcnkgdXNlZCBhcyB0aGUgaW5wdXQgZm9yIHRlbXBsYXRlIHZhcmlhYmxlIGV4cGFuc2lvbi5cbiAgICAgKiBTZWUgW1RlbXBsYXRlc10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC9hcGktdGVtcGxhdGVzLmh0bWwjYXBpLXRlbXBsYXRlcykgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgJ3Q6dmFyaWFibGVzJz86IHN0cmluZyB8IEpzb25PYmplY3Q7XG5cbiAgICAvKipcbiAgICAgKiBUYWcgc3RyaW5nLiBTZWUgW1RhZ2dpbmddKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCN0YWdnaW5nKSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICAnbzp0YWcnPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzL2Rpc2FibGVzIERLSU0gc2lnbmF0dXJlcyBvbiBwZXItbWVzc2FnZSBiYXNpcy4gUGFzcyBgeWVzYCwgYG5vYCwgYHRydWVgIG9yIGBmYWxzZWBcbiAgICAgKi9cbiAgICAnbzpka2ltJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBEZXNpcmVkIHRpbWUgb2YgZGVsaXZlcnkuIFNlZSBbRGF0ZSBGb3JtYXRdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvYXBpLWludHJvLmh0bWwjZGF0ZS1mb3JtYXQpLlxuICAgICAqXG4gICAgICogTm90ZTogTWVzc2FnZXMgY2FuIGJlIHNjaGVkdWxlZCBmb3IgYSBtYXhpbXVtIG9mIDMgZGF5cyBpbiB0aGUgZnV0dXJlLlxuICAgICAqL1xuICAgICdvOmRlbGl2ZXJ5dGltZSc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIFNlbmQgVGltZSBPcHRpbWl6YXRpb24gKFNUTykgb24gYSBwZXItbWVzc2FnZSBiYXNpcy5cbiAgICAgKlxuICAgICAqIFN0cmluZyBzaG91bGQgYmUgc2V0IHRvIHRoZSBudW1iZXIgb2YgaG91cnMgaW4gYFswLTldK2hgIGZvcm1hdCxcbiAgICAgKiB3aXRoIHRoZSBtaW5pbXVtIGJlaW5nIGAyNGhgIGFuZCB0aGUgbWF4aW11bSBiZWluZyBgNzJoYC5cbiAgICAgKlxuICAgICAqIFRoaXMgdmFsdWUgZGVmaW5lcyB0aGUgdGltZSB3aW5kb3cgaW4gd2hpY2ggTWFpbGd1biB3aWxsIHJ1biB0aGUgb3B0aW1pemF0aW9uIGFsZ29yaXRobSBiYXNlZCBvbiBwcmlvciBlbmdhZ2VtZW50IGRhdGEgb2YgYSBnaXZlbiByZWNpcGllbnQuIFNlZSBbU2VuZGluZyBhIG1lc3NhZ2Ugd2l0aCBTVE9dKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCNzdG8tc2VuZGluZykgZm9yIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBfUGxlYXNlIG5vdGUgdGhhdCBTVE8gaXMgb25seSBhdmFpbGFibGUgb24gY2VydGFpbiBwbGFucy5cbiAgICAgKiBTZWUgd3d3Lm1haWxndW4uY29tL3ByaWNpbmcgZm9yIG1vcmUgaW5mby5fXG4gICAgICovXG4gICAgJ286ZGVsaXZlcnl0aW1lLW9wdGltaXplLXBlcmlvZCc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIFRpbWV6b25lIE9wdGltaXphdGlvbiAoVFpPKSBvbiBhIHBlciBtZXNzYWdlIGJhc2lzLlxuICAgICAqXG4gICAgICogU3RyaW5nIHNob3VsZCBiZSBzZXQgdG8gcHJlZmVycmVkIGRlbGl2ZXJ5IHRpbWUgaW4gYEhIOm1tYCBvciBgaGg6bW1hYWAgZm9ybWF0LCB3aGVyZSBgSEg6bW1gIGlzIHVzZWQgZm9yIDI0IGhvdXIgZm9ybWF0IHdpdGhvdXQgQU0vUE0gYW5kIGBoaDptbWFhYCBpcyB1c2VkIGZvciAxMiBob3VyIGZvcm1hdCB3aXRoIEFNL1BNLiBTZWUgW1NlbmRpbmcgYSBtZXNzYWdlIHdpdGggVFpPXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjdHpvLXNlbmRpbmcpIGZvciBkZXRhaWxzLlxuICAgICAqXG4gICAgICogUGxlYXNlIG5vdGUgdGhhdCBUWk8gaXMgb25seSBhdmFpbGFibGUgb24gY2VydGFpbiBwbGFucy5cbiAgICAgKiBTZWUgd3d3Lm1haWxndW4uY29tL3ByaWNpbmcgZm9yIG1vcmUgaW5mby5cbiAgICAgKi9cbiAgICAnbzp0aW1lLXpvbmUtbG9jYWxpemUnPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBzZW5kaW5nIGluIHRlc3QgbW9kZS4gUGFzcyBgeWVzYCBpZiBuZWVkZWQuIFNlZSBbU2VuZGluZyBpbiBUZXN0IE1vZGVdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCNtYW51YWwtdGVzdG1vZGUpXG4gICAgICovXG4gICAgJ286dGVzdG1vZGUnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdHJhY2tpbmcgb24gYSBwZXItbWVzc2FnZSBiYXNpcywgc2VlIFtUcmFja2luZyBNZXNzYWdlc10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI3RyYWNraW5nLW1lc3NhZ2VzIGZvciBkZXRhaWxzLiBQYXNzICd5ZXMnLCAnbm8nLCAndHJ1ZScgb3IgJ2ZhbHNlJ1xuICAgICAqL1xuICAgICdvOnRyYWNraW5nJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIGNsaWNrcyB0cmFja2luZyBvbiBhIHBlci1tZXNzYWdlIGJhc2lzLlxuICAgICAqIEhhcyBoaWdoZXIgcHJpb3JpdHkgdGhhbiBkb21haW4tbGV2ZWwgc2V0dGluZy5cbiAgICAgKiBQYXNzIGB5ZXNgLCBgbm9gLCBgdHJ1ZWAsIGBmYWxzZWAgb3IgYGh0bWxvbmx5YC5cbiAgICAgKi9cbiAgICAnbzp0cmFja2luZy1jbGlja3MnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJyB8ICdodG1sb25seSc7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIG9wZW5zIHRyYWNraW5nIG9uIGEgcGVyLW1lc3NhZ2UgYmFzaXMuXG4gICAgICogSGFzIGhpZ2hlciBwcmlvcml0eSB0aGFuIGRvbWFpbi1sZXZlbCBzZXR0aW5nLlxuICAgICAqICBQYXNzICd5ZXMnIG9yICdubycsICd0cnVlJyBvciAnZmFsc2UnXG4gICAgICovXG4gICAgJ286dHJhY2tpbmctb3BlbnMnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIElmIHNldCB0byAnVHJ1ZScgb3IgJ3llcycgdGhpcyByZXF1aXJlcyB0aGUgbWVzc2FnZSBvbmx5IGJlIHNlbnQgb3ZlciBhIFRMUyBjb25uZWN0aW9uLlxuICAgICAqIElmIGEgVExTIGNvbm5lY3Rpb24gY2FuIG5vdCBiZSBlc3RhYmxpc2hlZCwgTWFpbGd1biB3aWxsIG5vdCBkZWxpdmVyIHRoZSBtZXNzYWdlLlxuICAgICAqXG4gICAgICogSWYgc2V0IHRvICdGYWxzZScgb3IgJ25vJywgTWFpbGd1biB3aWxsIHN0aWxsIHRyeSBhbmQgdXBncmFkZSB0aGUgY29ubmVjdGlvbixcbiAgICAgKiBidXQgaWYgTWFpbGd1biBjYW4gbm90LCB0aGUgbWVzc2FnZSB3aWxsIGJlIGRlbGl2ZXJlZCBvdmVyIGEgcGxhaW50ZXh0IFNNVFAgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IGlzICdGYWxzZScuXG4gICAgICovXG4gICAgJ286cmVxdWlyZS10bHMnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIElmIHNldCB0byBgVHJ1ZWAgb3IgYHllc2AsIHRoZSBjZXJ0aWZpY2F0ZSBhbmQgaG9zdG5hbWUgd2lsbCBub3QgYmUgdmVyaWZpZWRcbiAgICAgKiB3aGVuIHRyeWluZyB0byBlc3RhYmxpc2ggYSBUTFMgY29ubmVjdGlvblxuICAgICAqIGFuZCBNYWlsZ3VuIHdpbGwgYWNjZXB0IGFueSBjZXJ0aWZpY2F0ZSBkdXJpbmcgZGVsaXZlcnkuXG4gICAgICpcbiAgICAgKiBJZiBzZXQgdG8gYEZhbHNlYCBvciBgbm9gLCBNYWlsZ3VuIHdpbGwgdmVyaWZ5IHRoZSBjZXJ0aWZpY2F0ZSBhbmQgaG9zdG5hbWUuXG4gICAgICogSWYgZWl0aGVyIG9uZSBjYW4gbm90IGJlIHZlcmlmaWVkLCBhIFRMUyBjb25uZWN0aW9uIHdpbGwgbm90IGJlIGVzdGFibGlzaGVkLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaXMgYEZhbHNlYC5cbiAgICAgKi9cbiAgICAnbzpza2lwLXZlcmlmaWNhdGlvbic/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogQSB2YWxpZCBKU09OLWVuY29kZWQgZGljdGlvbmFyeSwgd2hlcmUga2V5IGlzIGEgcGxhaW4gcmVjaXBpZW50IGFkZHJlc3MgYW5kIHZhbHVlIGlzIGEgZGljdGlvbmFyeSB3aXRoIHZhcmlhYmxlcyB0aGF0IGNhbiBiZSByZWZlcmVuY2VkIGluIHRoZSBtZXNzYWdlIGJvZHkuIFNlZSBbQmF0Y2ggU2VuZGluZ10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI2JhdGNoLXNlbmRpbmcpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgICdyZWNpcGllbnQtdmFyaWFibGVzJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIGg6JyBwcmVmaXggZm9sbG93ZWQgYnkgYW4gYXJiaXRyYXJ5IHZhbHVlIGFsbG93cyB0byBhcHBlbmQgYSBjdXN0b20gTUlNRSBoZWFkZXJcbiAgICAgKiB0byB0aGUgbWVzc2FnZSAoJ1gtTXktSGVhZGVyJyBpbiB0aGlzIGNhc2UpLlxuICAgICAqIEZvciBleGFtcGxlLCBgaDpSZXBseS1Ub2AgdG8gc3BlY2lmeSBSZXBseS1UbyBhZGRyZXNzLlxuICAgICAqL1xuICAgICdoOlgtTXktSGVhZGVyJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIGB2OmAgcHJlZml4IGZvbGxvd2VkIGJ5IGFuIGFyYml0cmFyeSBuYW1lIGFsbG93cyB0byBhdHRhY2ggYSBjdXN0b20gSlNPTiBkYXRhIHRvIHRoZSBtZXNzYWdlLiBTZWUgW0F0dGFjaGluZyBEYXRhIHRvIE1lc3NhZ2VzXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjbWFudWFsLWN1c3RvbWRhdGEpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgICd2Om15LXZhcic/OiBzdHJpbmc7XG5cbiAgICBba2V5OiBzdHJpbmddOiBGb3JtRGF0YUlucHV0VmFsdWU7XG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VzU2VuZEFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaWQ6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTWVzc2FnZXNTZW5kUmVzdWx0ID0ge1xuICAgIGlkPzogc3RyaW5nLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgZGV0YWlscz86IHN0cmluZztcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTWVzc2FnZXMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBSb3V0ZSA9IHtcbiAgICBhY3Rpb25zOiBzdHJpbmdbXTtcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBleHByZXNzaW9uOiBzdHJpbmc7XG4gICAgaWQ6IHN0cmluZztcbiAgICBwcmlvcml0eTogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVSb3V0ZVJlc3BvbnNlID0gUm91dGUgJiB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEZXN0cm95Um91dGVSZXNwb25zZSA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlVXBkYXRlUm91dGVEYXRhID0ge1xuICAgIHByaW9yaXR5PzogbnVtYmVyO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIGV4cHJlc3Npb246IHN0cmluZztcbiAgICBhY3Rpb246IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgdHlwZSBSb3V0ZXNMaXN0UXVlcnkgPSB7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgc2tpcD86IG51bWJlcjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vUm91dGVzJztcbiIsImV4cG9ydCB0eXBlIFN0YXQgPSB7XG4gIHRpbWU6IHN0cmluZyB8IERhdGUsXG4gIGRlbGl2ZXJlZDoge1xuICAgIHNtdHA6IG51bWJlcixcbiAgICBodHRwOiBudW1iZXIsXG4gICAgdG90YWw6IG51bWJlclxuICB9XG59XG5cbmV4cG9ydCB0eXBlIFN0YXRzT3B0aW9ucyA9IHtcbiAgc3RhcnQ6IHN0cmluZyB8IERhdGU7XG4gIGVuZDogc3RyaW5nIHwgRGF0ZTtcbiAgcmVzb2x1dGlvbjogc3RyaW5nO1xuICBzdGF0czogU3RhdFtdO1xufVxuXG5leHBvcnQgdHlwZSBTdGF0c0V2ZW50ID0gJ2FjY2VwdGVkJyB8ICdkZWxpdmVyZWQnIHwgJ29wZW5lZCcgfCAnY2xpY2tlZCcgfCAndW5zdWJzY3JpYmVkJyB8ICdzdG9yZWQnIHwgJ2NvbXBsYWluZWQnIHwgJ2ZhaWxlZCc7XG5cbmV4cG9ydCB0eXBlIFN0YXRzUXVlcnkgPSB7XG4gIGV2ZW50OiBTdGF0c0V2ZW50IHwgU3RhdHNFdmVudFtdO1xuICBzdGFydD86IHN0cmluZyB8IERhdGU7XG4gIGVuZD86IHN0cmluZyB8IERhdGU7XG4gIHJlc29sdXRpb24/OiAnaG91cid8ICdkYXknIHwgJ21vbnRoJztcbiAgZHVyYXRpb24/OiBzdHJpbmc7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1N0YXRzJztcbiIsImV4cG9ydCB0eXBlIFN1YmFjY291bnRzUXVlcnkgPSB7XG4gIGVuYWJsZWQ/OiBib29sZWFuO1xuICBsaW1pdD86IG51bWJlcjtcbiAgc2tpcD86IG51bWJlcjtcbiAgc29ydD86ICdhc2MnIHwgJ2Rlc2MnO1xufVxuXG5leHBvcnQgdHlwZSBTdWJhY2NvdW50TGlzdEl0ZW0gPSB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgc3RhdHVzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFN1YmFjY291bnRMaXN0UmVzcG9uc2VEYXRhID0ge1xuICBzdWJhY2NvdW50czogU3ViYWNjb3VudExpc3RJdGVtW107XG4gIHRvdGFsOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1YmFjY291bnRSZXNwb25zZURhdGEgPSB7XG4gIHN1YmFjY291bnQ6IFN1YmFjY291bnRMaXN0SXRlbVxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9TdWJhY2NvdW50cyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIEJvdW5jZURhdGEgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIENvbXBsYWludERhdGEgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG4iLCJpbXBvcnQge1xuICBCb3VuY2VEYXRhLFxuICBDb21wbGFpbnREYXRhLFxuICBVbnN1YnNjcmliZURhdGEsXG4gIFdoaXRlTGlzdERhdGFcbn0gZnJvbSAnLic7XG5pbXBvcnQge1xuICBJQm91bmNlLCBJQ29tcGxhaW50LCBJVW5zdWJzY3JpYmUsIElXaGl0ZUxpc3Rcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uTGlzdCA9IHtcbiAgaXRlbXM6IChJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3QpW107XG4gIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkxpc3RRdWVyeSA9IHtcbiAgbGltaXQ/OiBudW1iZXI7XG4gIHBhZ2U/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uRGF0YVR5cGUgPSBCb3VuY2VEYXRhIHwgQ29tcGxhaW50RGF0YSB8IFVuc3Vic2NyaWJlRGF0YSB8IFdoaXRlTGlzdERhdGE7XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlID0ge1xuICBib2R5OiB7XG4gICAgaXRlbXM6IEJvdW5jZURhdGFbXSB8IENvbXBsYWludERhdGFbXSB8IFVuc3Vic2NyaWJlRGF0YVtdIHwgV2hpdGVMaXN0RGF0YVtdO1xuICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICB9XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvblJlc3BvbnNlID0ge1xuICBib2R5OiBTdXBwcmVzc2lvbkRhdGFUeXBlO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25EZXN0cm95UmVzcG9uc2UgPSB7XG4gIGJvZHk6IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdmFsdWU/OiBzdHJpbmc7XG4gICAgYWRkcmVzcz86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25EZXN0cm95UmVzdWx0ID0ge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvZGU/OiBudW1iZXI7XG4gIGVycm9yPzogc3RyaW5nO1xuICBkb21haW4/OiBzdHJpbmc7XG4gIHRhZz86IHN0cmluZzsgLy8gd29ya3Mgb25seSB3aXRoIEZvcm1EYXRhIHVzYWdlIGZvciBvbmUgdW5zdWJzY3JpYmVcbiAgY3JlYXRlZF9hdD86IHN0cmluZyA7XG4gIHRhZ3M/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlID0ge1xuICBib2R5OntcbiAgICBtZXNzYWdlOnN0cmluZztcbiAgICB0eXBlPzogc3RyaW5nO1xuICAgIHZhbHVlPzogc3RyaW5nO1xuICB9XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0ID0ge1xuICBtZXNzYWdlOnN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgVW5zdWJzY3JpYmVEYXRhID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICB0YWdzOiBhbnk7XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nIHwgRGF0ZTtcbn1cbiIsImV4cG9ydCB0eXBlIFdoaXRlTGlzdERhdGEgPSB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgcmVhc29uOiBzdHJpbmc7XG4gICAgY3JlYXRlZEF0OiBzdHJpbmcgfCBEYXRlO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Cb3VuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9Db21wbGFpbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9TdXBwcmVzc2lvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9VbnN1YnNjcmliZSc7XG5leHBvcnQgKiBmcm9tICcuL1doaXRlTGlzdCc7XG4iLCJpbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5pbXBvcnQgeyBDdXN0b21GaWxlLCBDdXN0b21GaWxlRGF0YSB9IGZyb20gJy4uL01lc3NhZ2VzJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JEYXRhID0ge1xuICAgIGNyZWF0ZWRfYXQ6IG51bWJlcjtcbiAgICBpZDogc3RyaW5nO1xuICAgIHF1YW50aXR5OiBudW1iZXI7XG4gICAgcmVjb3Jkc19wcm9jZXNzZWQ6IG51bWJlciB8IG51bGw7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgZG93bmxvYWRfdXJsPzoge1xuICAgICAgICBjc3Y6IHN0cmluZztcbiAgICAgICAganNvbjogc3RyaW5nO1xuICAgIH07XG4gICAgc3VtbWFyeT86IHtcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICBjYXRjaF9hbGw6IG51bWJlcjtcbiAgICAgICAgICAgIGRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgICBkb19ub3Rfc2VuZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5kZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgICB9O1xuICAgICAgICByaXNrOiB7XG4gICAgICAgICAgICBoaWdoOiBudW1iZXI7XG4gICAgICAgICAgICBsb3c6IG51bWJlcjtcbiAgICAgICAgICAgIG1lZGl1bTogbnVtYmVyO1xuICAgICAgICAgICAgdW5rbm93bjogbnVtYmVyO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHQgPSB7XG4gICAgY3JlYXRlZEF0OiBEYXRlO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcXVhbnRpdHk6IG51bWJlcjtcbiAgICByZWNvcmRzUHJvY2Vzc2VkOiBudW1iZXIgfCBudWxsO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIHJlc3BvbnNlU3RhdHVzQ29kZTogbnVtYmVyOyAvLyBodHRwIHJlc3BvbnNlIHN0YXR1cyBjb2RlXG4gICAgZG93bmxvYWRVcmw/OiB7XG4gICAgICAgIGNzdjogc3RyaW5nO1xuICAgICAgICBqc29uOiBzdHJpbmc7XG4gICAgfTtcbiAgICBzdW1tYXJ5Pzoge1xuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgIGNhdGNoQWxsOiBudW1iZXI7XG4gICAgICAgICAgICBkZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgICAgZG9Ob3RTZW5kOiBudW1iZXI7XG4gICAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgICAgIHJpc2s6IHtcbiAgICAgICAgICAgIGhpZ2g6IG51bWJlcjtcbiAgICAgICAgICAgIGxvdzogbnVtYmVyO1xuICAgICAgICAgICAgbWVkaXVtOiBudW1iZXI7XG4gICAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGEgPSB7XG4gICAgZmlsZTogQ3VzdG9tRmlsZURhdGEgfCBDdXN0b21GaWxlXG59XG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkID0ge1xuICAgIG11bHRpcGxlVmFsaWRhdGlvbkZpbGU6IEN1c3RvbUZpbGVEYXRhIHwgQ3VzdG9tRmlsZTtcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQgPSB7XG4gICAgam9iczogTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0W107XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbiAgICB0b3RhbDogbnVtYmVyO1xuICAgIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFF1ZXJ5ID0ge1xuICAgIGxpbWl0OiBudW1iZXI7XG4gICAgcGFnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0O1xuICAgICAgICBqb2JzOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JEYXRhW107XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfVxufVxuZXhwb3J0IHR5cGUgQ2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IgPSB7XG4gICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuZXhwb3J0IHR5cGUgVmFsaWRhdGlvblF1ZXJ5ID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG59XG5leHBvcnQgdHlwZSBWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGlzX2Rpc3Bvc2FibGVfYWRkcmVzczogYm9vbGVhbjtcbiAgaXNfcm9sZV9hZGRyZXNzOiBib29sZWFuO1xuICByZWFzb246IHN0cmluZ1tdO1xuICByZXN1bHQ6IHN0cmluZztcbiAgcmlzazogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBWYWxpZGF0aW9uUmVzcG9uc2UgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBib2R5OiBWYWxpZGF0aW9uUmVzdWx0O1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NdWx0aXBsZVZhbGlkYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9uJztcbiIsImV4cG9ydCB0eXBlIEFQSVdlYmhvb2sgPSB7XG4gICAgdXJsPzogc3RyaW5nXG4gICAgdXJscz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgdHlwZSBXZWJob29rUmVzcG9uc2VCb2R5ID0ge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB3ZWJob29rOiBBUElXZWJob29rO1xufVxuXG5leHBvcnQgdHlwZSBXZWJob29rUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keTogV2ViaG9va1Jlc3BvbnNlQm9keTtcbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va0xpc3QgPSB7XG4gICAgW2lkOiBzdHJpbmddOiB7XG4gICAgICAgIHVybHM6IHN0cmluZ1tdXG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBXZWJob29rc1F1ZXJ5ID0ge1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHNraXA/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2UgPSB7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va1Jlc3VsdCA9IHtcbiAgaWQ6IHN0cmluZztcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVybCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLiBVc2UgXCJ1cmxzXCIgaW5zdGVhZC5cbiAgICovXG4gIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICB1cmxzOiBzdHJpbmdbXTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vV2ViaG9va3MnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9Db21tb24nO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5zJztcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vSVBQb29scyc7XG5leHBvcnQgKiBmcm9tICcuL0lQcyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxndW5DbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9NZXNzYWdlcyc7XG5leHBvcnQgKiBmcm9tICcuL1JvdXRlcyc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRzJztcbmV4cG9ydCAqIGZyb20gJy4vU3ViYWNjb3VudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdXBwcmVzc2lvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9WYWxpZGF0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL1dlYmhvb2tzJztcbiIsImltcG9ydCBNYWlsZ3VuQ2xpZW50IGZyb20gJy4vQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50JztcbmltcG9ydCB7IElNYWlsZ3VuQ2xpZW50IH0gZnJvbSAnLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEsIE1haWxndW5DbGllbnRPcHRpb25zIH0gZnJvbSAnLi9UeXBlcyc7XG5cbmV4cG9ydCAqIGFzIEVudW1zIGZyb20gJy4vRW51bXMnO1xuZXhwb3J0ICogZnJvbSAnLi9UeXBlcyc7XG5leHBvcnQgKiBhcyBJbnRlcmZhY2VzIGZyb20gJy4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW4ge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHQoKTogdHlwZW9mIE1haWxndW4geyByZXR1cm4gdGhpczsgfVxuICBwcml2YXRlIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhXG5cbiAgY29uc3RydWN0b3IoRm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLmZvcm1EYXRhID0gRm9ybURhdGE7XG4gIH1cblxuICBjbGllbnQob3B0aW9uczogTWFpbGd1bkNsaWVudE9wdGlvbnMpIDogSU1haWxndW5DbGllbnQge1xuICAgIHJldHVybiBuZXcgTWFpbGd1bkNsaWVudChvcHRpb25zLCB0aGlzLmZvcm1EYXRhKTtcbiAgfVxufVxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9iYXNlNjQgdjEuMC4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMS4wLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiKGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pO1xuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG59KSgndXJsam9pbicsIHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBub3JtYWxpemUgKHN0ckFycmF5KSB7XG4gICAgdmFyIHJlc3VsdEFycmF5ID0gW107XG4gICAgaWYgKHN0ckFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cblxuICAgIGlmICh0eXBlb2Ygc3RyQXJyYXlbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIHN0ckFycmF5WzBdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZmlyc3QgcGFydCBpcyBhIHBsYWluIHByb3RvY29sLCB3ZSBjb21iaW5lIGl0IHdpdGggdGhlIG5leHQgcGFydC5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15bXi86XSs6XFwvKiQvKSAmJiBzdHJBcnJheS5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgZmlyc3QgPSBzdHJBcnJheS5zaGlmdCgpO1xuICAgICAgc3RyQXJyYXlbMF0gPSBmaXJzdCArIHN0ckFycmF5WzBdO1xuICAgIH1cblxuICAgIC8vIFRoZXJlIG11c3QgYmUgdHdvIG9yIHRocmVlIHNsYXNoZXMgaW4gdGhlIGZpbGUgcHJvdG9jb2wsIHR3byBzbGFzaGVzIGluIGFueXRoaW5nIGVsc2UuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eZmlsZTpcXC9cXC9cXC8vKSkge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLycpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBzdHJBcnJheVtpXTtcblxuICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgY29tcG9uZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvbmVudCA9PT0gJycpIHsgY29udGludWU7IH1cblxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBzdGFydGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGZpcnN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvXltcXC9dKy8sICcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgc3RyQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgZW5kaW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgbGFzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3IgdGhlIGxhc3QgY29tcG9uZW50IHdlIHdpbGwgY29tYmluZSBtdWx0aXBsZSBzbGFzaGVzIHRvIGEgc2luZ2xlIG9uZS5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnLycpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRBcnJheS5wdXNoKGNvbXBvbmVudCk7XG5cbiAgICB9XG5cbiAgICB2YXIgc3RyID0gcmVzdWx0QXJyYXkuam9pbignLycpO1xuICAgIC8vIEVhY2ggaW5wdXQgY29tcG9uZW50IGlzIG5vdyBzZXBhcmF0ZWQgYnkgYSBzaW5nbGUgc2xhc2ggZXhjZXB0IHRoZSBwb3NzaWJsZSBmaXJzdCBwbGFpbiBwcm90b2NvbCBwYXJ0LlxuXG4gICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGJlZm9yZSBwYXJhbWV0ZXJzIG9yIGhhc2hcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFwvKFxcP3wmfCNbXiFdKS9nLCAnJDEnKTtcblxuICAgIC8vIHJlcGxhY2UgPyBpbiBwYXJhbWV0ZXJzIHdpdGggJlxuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnPycpO1xuICAgIHN0ciA9IHBhcnRzLnNoaWZ0KCkgKyAocGFydHMubGVuZ3RoID4gMCA/ICc/JzogJycpICsgcGFydHMuam9pbignJicpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlucHV0O1xuXG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpbnB1dCA9IGFyZ3VtZW50c1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShpbnB1dCk7XG4gIH07XG5cbn0pO1xuIiwiLy8gQXhpb3MgdjEuNy4yIENvcHlyaWdodCAoYykgMjAyNCBNYXR0IFphYnJpc2tpZSBhbmQgY29udHJpYnV0b3JzXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbmNvbnN0IHt0b1N0cmluZ30gPSBPYmplY3QucHJvdG90eXBlO1xuY29uc3Qge2dldFByb3RvdHlwZU9mfSA9IE9iamVjdDtcblxuY29uc3Qga2luZE9mID0gKGNhY2hlID0+IHRoaW5nID0+IHtcbiAgICBjb25zdCBzdHIgPSB0b1N0cmluZy5jYWxsKHRoaW5nKTtcbiAgICByZXR1cm4gY2FjaGVbc3RyXSB8fCAoY2FjaGVbc3RyXSA9IHN0ci5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKSk7XG59KShPYmplY3QuY3JlYXRlKG51bGwpKTtcblxuY29uc3Qga2luZE9mVGVzdCA9ICh0eXBlKSA9PiB7XG4gIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiAodGhpbmcpID0+IGtpbmRPZih0aGluZykgPT09IHR5cGVcbn07XG5cbmNvbnN0IHR5cGVPZlRlc3QgPSB0eXBlID0+IHRoaW5nID0+IHR5cGVvZiB0aGluZyA9PT0gdHlwZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IHtpc0FycmF5fSA9IEFycmF5O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVW5kZWZpbmVkID0gdHlwZU9mVGVzdCgndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgaXNGdW5jdGlvbih2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIpICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQXJyYXlCdWZmZXIgPSBraW5kT2ZUZXN0KCdBcnJheUJ1ZmZlcicpO1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgbGV0IHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1N0cmluZyA9IHR5cGVPZlRlc3QoJ3N0cmluZycpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRnVuY3Rpb24gPSB0eXBlT2ZUZXN0KCdmdW5jdGlvbicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzTnVtYmVyID0gdHlwZU9mVGVzdCgnbnVtYmVyJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpbmcgPT09ICdvYmplY3QnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQm9vbGVhblxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQm9vbGVhbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzQm9vbGVhbiA9IHRoaW5nID0+IHRoaW5nID09PSB0cnVlIHx8IHRoaW5nID09PSBmYWxzZTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1BsYWluT2JqZWN0ID0gKHZhbCkgPT4ge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YodmFsKTtcbiAgcmV0dXJuIChwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpID09PSBudWxsKSAmJiAhKFN5bWJvbC50b1N0cmluZ1RhZyBpbiB2YWwpICYmICEoU3ltYm9sLml0ZXJhdG9yIGluIHZhbCk7XG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNEYXRlID0ga2luZE9mVGVzdCgnRGF0ZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCbG9iID0ga2luZE9mVGVzdCgnQmxvYicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZUxpc3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZUxpc3QgPSBraW5kT2ZUZXN0KCdGaWxlTGlzdCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyZWFtID0gKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGb3JtRGF0YSA9ICh0aGluZykgPT4ge1xuICBsZXQga2luZDtcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8IChcbiAgICAgIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiAoXG4gICAgICAgIChraW5kID0ga2luZE9mKHRoaW5nKSkgPT09ICdmb3JtZGF0YScgfHxcbiAgICAgICAgLy8gZGV0ZWN0IGZvcm0tZGF0YSBpbnN0YW5jZVxuICAgICAgICAoa2luZCA9PT0gJ29iamVjdCcgJiYgaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgRm9ybURhdGFdJylcbiAgICAgIClcbiAgICApXG4gIClcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VSTFNlYXJjaFBhcmFtcyA9IGtpbmRPZlRlc3QoJ1VSTFNlYXJjaFBhcmFtcycpO1xuXG5jb25zdCBbaXNSZWFkYWJsZVN0cmVhbSwgaXNSZXF1ZXN0LCBpc1Jlc3BvbnNlLCBpc0hlYWRlcnNdID0gWydSZWFkYWJsZVN0cmVhbScsICdSZXF1ZXN0JywgJ1Jlc3BvbnNlJywgJ0hlYWRlcnMnXS5tYXAoa2luZE9mVGVzdCk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmNvbnN0IHRyaW0gPSAoc3RyKSA9PiBzdHIudHJpbSA/XG4gIHN0ci50cmltKCkgOiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FsbE93bktleXMgPSBmYWxzZV1cbiAqIEByZXR1cm5zIHthbnl9XG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbiwge2FsbE93bktleXMgPSBmYWxzZX0gPSB7fSkge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBpO1xuICBsZXQgbDtcblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAoaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgY29uc3Qga2V5cyA9IGFsbE93bktleXMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopIDogT2JqZWN0LmtleXMob2JqKTtcbiAgICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICBsZXQga2V5O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kS2V5KG9iaiwga2V5KSB7XG4gIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgbGV0IF9rZXk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgX2tleSA9IGtleXNbaV07XG4gICAgaWYgKGtleSA9PT0gX2tleS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICByZXR1cm4gX2tleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IF9nbG9iYWwgPSAoKCkgPT4ge1xuICAvKmVzbGludCBuby11bmRlZjowKi9cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZ2xvYmFsVGhpcztcbiAgcmV0dXJuIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbClcbn0pKCk7XG5cbmNvbnN0IGlzQ29udGV4dERlZmluZWQgPSAoY29udGV4dCkgPT4gIWlzVW5kZWZpbmVkKGNvbnRleHQpICYmIGNvbnRleHQgIT09IF9nbG9iYWw7XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgY29uc3Qge2Nhc2VsZXNzfSA9IGlzQ29udGV4dERlZmluZWQodGhpcykgJiYgdGhpcyB8fCB7fTtcbiAgY29uc3QgcmVzdWx0ID0ge307XG4gIGNvbnN0IGFzc2lnblZhbHVlID0gKHZhbCwga2V5KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0S2V5ID0gY2FzZWxlc3MgJiYgZmluZEtleShyZXN1bHQsIGtleSkgfHwga2V5O1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFt0YXJnZXRLZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2UocmVzdWx0W3RhcmdldEtleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFt0YXJnZXRLZXldID0gdmFsO1xuICAgIH1cbiAgfTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhcmd1bWVudHNbaV0gJiYgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5c11cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuY29uc3QgZXh0ZW5kID0gKGEsIGIsIHRoaXNBcmcsIHthbGxPd25LZXlzfT0ge30pID0+IHtcbiAgZm9yRWFjaChiLCAodmFsLCBrZXkpID0+IHtcbiAgICBpZiAodGhpc0FyZyAmJiBpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSwge2FsbE93bktleXN9KTtcbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5jb25zdCBzdHJpcEJPTSA9IChjb250ZW50KSA9PiB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufTtcblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXVxuICogQHBhcmFtIHtvYmplY3R9IFtkZXNjcmlwdG9yc11cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgaW5oZXJpdHMgPSAoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykgPT4ge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29uc3RydWN0b3IsICdzdXBlcicsIHtcbiAgICB2YWx1ZTogc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGVcbiAgfSk7XG4gIHByb3BzICYmIE9iamVjdC5hc3NpZ24oY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufEJvb2xlYW59IFtmaWx0ZXJdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvcEZpbHRlcl1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5jb25zdCB0b0ZsYXRPYmplY3QgPSAoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIsIHByb3BGaWx0ZXIpID0+IHtcbiAgbGV0IHByb3BzO1xuICBsZXQgaTtcbiAgbGV0IHByb3A7XG4gIGNvbnN0IG1lcmdlZCA9IHt9O1xuXG4gIGRlc3RPYmogPSBkZXN0T2JqIHx8IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgaWYgKHNvdXJjZU9iaiA9PSBudWxsKSByZXR1cm4gZGVzdE9iajtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICgoIXByb3BGaWx0ZXIgfHwgcHJvcEZpbHRlcihwcm9wLCBzb3VyY2VPYmosIGRlc3RPYmopKSAmJiAhbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IGZpbHRlciAhPT0gZmFsc2UgJiYgZ2V0UHJvdG90eXBlT2Yoc291cmNlT2JqKTtcbiAgfSB3aGlsZSAoc291cmNlT2JqICYmICghZmlsdGVyIHx8IGZpbHRlcihzb3VyY2VPYmosIGRlc3RPYmopKSAmJiBzb3VyY2VPYmogIT09IE9iamVjdC5wcm90b3R5cGUpO1xuXG4gIHJldHVybiBkZXN0T2JqO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcG9zaXRpb249IDBdXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGVuZHNXaXRoID0gKHN0ciwgc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT4ge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcG9zaXRpb24gPiBzdHIubGVuZ3RoKSB7XG4gICAgcG9zaXRpb24gPSBzdHIubGVuZ3RoO1xuICB9XG4gIHBvc2l0aW9uIC09IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gIGNvbnN0IGxhc3RJbmRleCA9IHN0ci5pbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pO1xuICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvc2l0aW9uO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgbmV3IGFycmF5IGZyb20gYXJyYXkgbGlrZSBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqXG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqXG4gKiBAcmV0dXJucyB7P0FycmF5fVxuICovXG5jb25zdCB0b0FycmF5ID0gKHRoaW5nKSA9PiB7XG4gIGlmICghdGhpbmcpIHJldHVybiBudWxsO1xuICBpZiAoaXNBcnJheSh0aGluZykpIHJldHVybiB0aGluZztcbiAgbGV0IGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmICghaXNOdW1iZXIoaSkpIHJldHVybiBudWxsO1xuICBjb25zdCBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qKlxuICogQ2hlY2tpbmcgaWYgdGhlIFVpbnQ4QXJyYXkgZXhpc3RzIGFuZCBpZiBpdCBkb2VzLCBpdCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlXG4gKiB0aGluZyBwYXNzZWQgaW4gaXMgYW4gaW5zdGFuY2Ugb2YgVWludDhBcnJheVxuICpcbiAqIEBwYXJhbSB7VHlwZWRBcnJheX1cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5jb25zdCBpc1R5cGVkQXJyYXkgPSAoVHlwZWRBcnJheSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiB0aGluZyA9PiB7XG4gICAgcmV0dXJuIFR5cGVkQXJyYXkgJiYgdGhpbmcgaW5zdGFuY2VvZiBUeXBlZEFycmF5O1xuICB9O1xufSkodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIGdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxuLyoqXG4gKiBGb3IgZWFjaCBlbnRyeSBpbiB0aGUgb2JqZWN0LCBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBrZXkgYW5kIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGVudHJ5LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBmb3JFYWNoRW50cnkgPSAob2JqLCBmbikgPT4ge1xuICBjb25zdCBnZW5lcmF0b3IgPSBvYmogJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl07XG5cbiAgY29uc3QgaXRlcmF0b3IgPSBnZW5lcmF0b3IuY2FsbChvYmopO1xuXG4gIGxldCByZXN1bHQ7XG5cbiAgd2hpbGUgKChyZXN1bHQgPSBpdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGNvbnN0IHBhaXIgPSByZXN1bHQudmFsdWU7XG4gICAgZm4uY2FsbChvYmosIHBhaXJbMF0sIHBhaXJbMV0pO1xuICB9XG59O1xuXG4vKipcbiAqIEl0IHRha2VzIGEgcmVndWxhciBleHByZXNzaW9uIGFuZCBhIHN0cmluZywgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgYWxsIHRoZSBtYXRjaGVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZ0V4cCAtIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggYWdhaW5zdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIHNlYXJjaC5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXk8Ym9vbGVhbj59XG4gKi9cbmNvbnN0IG1hdGNoQWxsID0gKHJlZ0V4cCwgc3RyKSA9PiB7XG4gIGxldCBtYXRjaGVzO1xuICBjb25zdCBhcnIgPSBbXTtcblxuICB3aGlsZSAoKG1hdGNoZXMgPSByZWdFeHAuZXhlYyhzdHIpKSAhPT0gbnVsbCkge1xuICAgIGFyci5wdXNoKG1hdGNoZXMpO1xuICB9XG5cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qIENoZWNraW5nIGlmIHRoZSBraW5kT2ZUZXN0IGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB3aGVuIHBhc3NlZCBhbiBIVE1MRm9ybUVsZW1lbnQuICovXG5jb25zdCBpc0hUTUxGb3JtID0ga2luZE9mVGVzdCgnSFRNTEZvcm1FbGVtZW50Jyk7XG5cbmNvbnN0IHRvQ2FtZWxDYXNlID0gc3RyID0+IHtcbiAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1stX1xcc10oW2EtelxcZF0pKFxcdyopL2csXG4gICAgZnVuY3Rpb24gcmVwbGFjZXIobSwgcDEsIHAyKSB7XG4gICAgICByZXR1cm4gcDEudG9VcHBlckNhc2UoKSArIHAyO1xuICAgIH1cbiAgKTtcbn07XG5cbi8qIENyZWF0aW5nIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBwcm9wZXJ0eS4gKi9cbmNvbnN0IGhhc093blByb3BlcnR5ID0gKCh7aGFzT3duUHJvcGVydHl9KSA9PiAob2JqLCBwcm9wKSA9PiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpKE9iamVjdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNSZWdFeHAgPSBraW5kT2ZUZXN0KCdSZWdFeHAnKTtcblxuY29uc3QgcmVkdWNlRGVzY3JpcHRvcnMgPSAob2JqLCByZWR1Y2VyKSA9PiB7XG4gIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMob2JqKTtcbiAgY29uc3QgcmVkdWNlZERlc2NyaXB0b3JzID0ge307XG5cbiAgZm9yRWFjaChkZXNjcmlwdG9ycywgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICBsZXQgcmV0O1xuICAgIGlmICgocmV0ID0gcmVkdWNlcihkZXNjcmlwdG9yLCBuYW1lLCBvYmopKSAhPT0gZmFsc2UpIHtcbiAgICAgIHJlZHVjZWREZXNjcmlwdG9yc1tuYW1lXSA9IHJldCB8fCBkZXNjcmlwdG9yO1xuICAgIH1cbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMob2JqLCByZWR1Y2VkRGVzY3JpcHRvcnMpO1xufTtcblxuLyoqXG4gKiBNYWtlcyBhbGwgbWV0aG9kcyByZWFkLW9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5jb25zdCBmcmVlemVNZXRob2RzID0gKG9iaikgPT4ge1xuICByZWR1Y2VEZXNjcmlwdG9ycyhvYmosIChkZXNjcmlwdG9yLCBuYW1lKSA9PiB7XG4gICAgLy8gc2tpcCByZXN0cmljdGVkIHByb3BzIGluIHN0cmljdCBtb2RlXG4gICAgaWYgKGlzRnVuY3Rpb24ob2JqKSAmJiBbJ2FyZ3VtZW50cycsICdjYWxsZXInLCAnY2FsbGVlJ10uaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IG9ialtuYW1lXTtcblxuICAgIGlmICghaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybjtcblxuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGZhbHNlO1xuXG4gICAgaWYgKCd3cml0YWJsZScgaW4gZGVzY3JpcHRvcikge1xuICAgICAgZGVzY3JpcHRvci53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0ID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBFcnJvcignQ2FuIG5vdCByZXdyaXRlIHJlYWQtb25seSBtZXRob2QgXFwnJyArIG5hbWUgKyAnXFwnJyk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCB0b09iamVjdFNldCA9IChhcnJheU9yU3RyaW5nLCBkZWxpbWl0ZXIpID0+IHtcbiAgY29uc3Qgb2JqID0ge307XG5cbiAgY29uc3QgZGVmaW5lID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIG9ialt2YWx1ZV0gPSB0cnVlO1xuICAgIH0pO1xuICB9O1xuXG4gIGlzQXJyYXkoYXJyYXlPclN0cmluZykgPyBkZWZpbmUoYXJyYXlPclN0cmluZykgOiBkZWZpbmUoU3RyaW5nKGFycmF5T3JTdHJpbmcpLnNwbGl0KGRlbGltaXRlcikpO1xuXG4gIHJldHVybiBvYmo7XG59O1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbmNvbnN0IHRvRmluaXRlTnVtYmVyID0gKHZhbHVlLCBkZWZhdWx0VmFsdWUpID0+IHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlID0gK3ZhbHVlKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xufTtcblxuY29uc3QgQUxQSEEgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonO1xuXG5jb25zdCBESUdJVCA9ICcwMTIzNDU2Nzg5JztcblxuY29uc3QgQUxQSEFCRVQgPSB7XG4gIERJR0lULFxuICBBTFBIQSxcbiAgQUxQSEFfRElHSVQ6IEFMUEhBICsgQUxQSEEudG9VcHBlckNhc2UoKSArIERJR0lUXG59O1xuXG5jb25zdCBnZW5lcmF0ZVN0cmluZyA9IChzaXplID0gMTYsIGFscGhhYmV0ID0gQUxQSEFCRVQuQUxQSEFfRElHSVQpID0+IHtcbiAgbGV0IHN0ciA9ICcnO1xuICBjb25zdCB7bGVuZ3RofSA9IGFscGhhYmV0O1xuICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgc3RyICs9IGFscGhhYmV0W01hdGgucmFuZG9tKCkgKiBsZW5ndGh8MF07XG4gIH1cblxuICByZXR1cm4gc3RyO1xufTtcblxuLyoqXG4gKiBJZiB0aGUgdGhpbmcgaXMgYSBGb3JtRGF0YSBvYmplY3QsIHJldHVybiB0cnVlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdGhpbmcgLSBUaGUgdGhpbmcgdG8gY2hlY2suXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzU3BlY0NvbXBsaWFudEZvcm0odGhpbmcpIHtcbiAgcmV0dXJuICEhKHRoaW5nICYmIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiB0aGluZ1tTeW1ib2wudG9TdHJpbmdUYWddID09PSAnRm9ybURhdGEnICYmIHRoaW5nW1N5bWJvbC5pdGVyYXRvcl0pO1xufVxuXG5jb25zdCB0b0pTT05PYmplY3QgPSAob2JqKSA9PiB7XG4gIGNvbnN0IHN0YWNrID0gbmV3IEFycmF5KDEwKTtcblxuICBjb25zdCB2aXNpdCA9IChzb3VyY2UsIGkpID0+IHtcblxuICAgIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihzb3VyY2UpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZighKCd0b0pTT04nIGluIHNvdXJjZSkpIHtcbiAgICAgICAgc3RhY2tbaV0gPSBzb3VyY2U7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQXJyYXkoc291cmNlKSA/IFtdIDoge307XG5cbiAgICAgICAgZm9yRWFjaChzb3VyY2UsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVkdWNlZFZhbHVlID0gdmlzaXQodmFsdWUsIGkgKyAxKTtcbiAgICAgICAgICAhaXNVbmRlZmluZWQocmVkdWNlZFZhbHVlKSAmJiAodGFyZ2V0W2tleV0gPSByZWR1Y2VkVmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdGFja1tpXSA9IHVuZGVmaW5lZDtcblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH07XG5cbiAgcmV0dXJuIHZpc2l0KG9iaiwgMCk7XG59O1xuXG5jb25zdCBpc0FzeW5jRm4gPSBraW5kT2ZUZXN0KCdBc3luY0Z1bmN0aW9uJyk7XG5cbmNvbnN0IGlzVGhlbmFibGUgPSAodGhpbmcpID0+XG4gIHRoaW5nICYmIChpc09iamVjdCh0aGluZykgfHwgaXNGdW5jdGlvbih0aGluZykpICYmIGlzRnVuY3Rpb24odGhpbmcudGhlbikgJiYgaXNGdW5jdGlvbih0aGluZy5jYXRjaCk7XG5cbnZhciB1dGlscyQxID0ge1xuICBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNSZWFkYWJsZVN0cmVhbSxcbiAgaXNSZXF1ZXN0LFxuICBpc1Jlc3BvbnNlLFxuICBpc0hlYWRlcnMsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0RhdGUsXG4gIGlzRmlsZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIEFMUEhBQkVULFxuICBnZW5lcmF0ZVN0cmluZyxcbiAgaXNTcGVjQ29tcGxpYW50Rm9ybSxcbiAgdG9KU09OT2JqZWN0LFxuICBpc0FzeW5jRm4sXG4gIGlzVGhlbmFibGVcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBBeGlvc0Vycm9yKG1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzKTtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjaztcbiAgfVxuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMubmFtZSA9ICdBeGlvc0Vycm9yJztcbiAgY29kZSAmJiAodGhpcy5jb2RlID0gY29kZSk7XG4gIGNvbmZpZyAmJiAodGhpcy5jb25maWcgPSBjb25maWcpO1xuICByZXF1ZXN0ICYmICh0aGlzLnJlcXVlc3QgPSByZXF1ZXN0KTtcbiAgcmVzcG9uc2UgJiYgKHRoaXMucmVzcG9uc2UgPSByZXNwb25zZSk7XG59XG5cbnV0aWxzJDEuaW5oZXJpdHMoQXhpb3NFcnJvciwgRXJyb3IsIHtcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdXRpbHMkMS50b0pTT05PYmplY3QodGhpcy5jb25maWcpLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgc3RhdHVzOiB0aGlzLnJlc3BvbnNlICYmIHRoaXMucmVzcG9uc2Uuc3RhdHVzID8gdGhpcy5yZXNwb25zZS5zdGF0dXMgOiBudWxsXG4gICAgfTtcbiAgfVxufSk7XG5cbmNvbnN0IHByb3RvdHlwZSQxID0gQXhpb3NFcnJvci5wcm90b3R5cGU7XG5jb25zdCBkZXNjcmlwdG9ycyA9IHt9O1xuXG5bXG4gICdFUlJfQkFEX09QVElPTl9WQUxVRScsXG4gICdFUlJfQkFEX09QVElPTicsXG4gICdFQ09OTkFCT1JURUQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VSUl9ORVRXT1JLJyxcbiAgJ0VSUl9GUl9UT09fTUFOWV9SRURJUkVDVFMnLFxuICAnRVJSX0RFUFJFQ0FURUQnLFxuICAnRVJSX0JBRF9SRVNQT05TRScsXG4gICdFUlJfQkFEX1JFUVVFU1QnLFxuICAnRVJSX0NBTkNFTEVEJyxcbiAgJ0VSUl9OT1RfU1VQUE9SVCcsXG4gICdFUlJfSU5WQUxJRF9VUkwnXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXS5mb3JFYWNoKGNvZGUgPT4ge1xuICBkZXNjcmlwdG9yc1tjb2RlXSA9IHt2YWx1ZTogY29kZX07XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQXhpb3NFcnJvciwgZGVzY3JpcHRvcnMpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSQxLCAnaXNBeGlvc0Vycm9yJywge3ZhbHVlOiB0cnVlfSk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5BeGlvc0Vycm9yLmZyb20gPSAoZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSA9PiB7XG4gIGNvbnN0IGF4aW9zRXJyb3IgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSQxKTtcblxuICB1dGlscyQxLnRvRmxhdE9iamVjdChlcnJvciwgYXhpb3NFcnJvciwgZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IEVycm9yLnByb3RvdHlwZTtcbiAgfSwgcHJvcCA9PiB7XG4gICAgcmV0dXJuIHByb3AgIT09ICdpc0F4aW9zRXJyb3InO1xuICB9KTtcblxuICBBeGlvc0Vycm9yLmNhbGwoYXhpb3NFcnJvciwgZXJyb3IubWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSk7XG5cbiAgYXhpb3NFcnJvci5jYXVzZSA9IGVycm9yO1xuXG4gIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG52YXIgaHR0cEFkYXB0ZXIgPSBudWxsO1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgdGhlIGdpdmVuIHRoaW5nIGlzIGEgYXJyYXkgb3IganMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGluZyAtIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gYmUgdmlzaXRlZC5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNWaXNpdGFibGUodGhpbmcpIHtcbiAgcmV0dXJuIHV0aWxzJDEuaXNQbGFpbk9iamVjdCh0aGluZykgfHwgdXRpbHMkMS5pc0FycmF5KHRoaW5nKTtcbn1cblxuLyoqXG4gKiBJdCByZW1vdmVzIHRoZSBicmFja2V0cyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgcGFyYW1ldGVyLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgd2l0aG91dCB0aGUgYnJhY2tldHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xuICByZXR1cm4gdXRpbHMkMS5lbmRzV2l0aChrZXksICdbXScpID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhdGgsIGEga2V5LCBhbmQgYSBib29sZWFuLCBhbmQgcmV0dXJucyBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXkgb2YgdGhlIGN1cnJlbnQgb2JqZWN0IGJlaW5nIGl0ZXJhdGVkIG92ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZG90cyAtIElmIHRydWUsIHRoZSBrZXkgd2lsbCBiZSByZW5kZXJlZCB3aXRoIGRvdHMgaW5zdGVhZCBvZiBicmFja2V0cy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpIHtcbiAgaWYgKCFwYXRoKSByZXR1cm4ga2V5O1xuICByZXR1cm4gcGF0aC5jb25jYXQoa2V5KS5tYXAoZnVuY3Rpb24gZWFjaCh0b2tlbiwgaSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHRva2VuID0gcmVtb3ZlQnJhY2tldHModG9rZW4pO1xuICAgIHJldHVybiAhZG90cyAmJiBpID8gJ1snICsgdG9rZW4gKyAnXScgOiB0b2tlbjtcbiAgfSkuam9pbihkb3RzID8gJy4nIDogJycpO1xufVxuXG4vKipcbiAqIElmIHRoZSBhcnJheSBpcyBhbiBhcnJheSBhbmQgbm9uZSBvZiBpdHMgZWxlbWVudHMgYXJlIHZpc2l0YWJsZSwgdGhlbiBpdCdzIGEgZmxhdCBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0ZsYXRBcnJheShhcnIpIHtcbiAgcmV0dXJuIHV0aWxzJDEuaXNBcnJheShhcnIpICYmICFhcnIuc29tZShpc1Zpc2l0YWJsZSk7XG59XG5cbmNvbnN0IHByZWRpY2F0ZXMgPSB1dGlscyQxLnRvRmxhdE9iamVjdCh1dGlscyQxLCB7fSwgbnVsbCwgZnVuY3Rpb24gZmlsdGVyKHByb3ApIHtcbiAgcmV0dXJuIC9eaXNbQS1aXS8udGVzdChwcm9wKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSBkYXRhIG9iamVjdCB0byBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7P09iamVjdH0gW2Zvcm1EYXRhXVxuICogQHBhcmFtIHs/T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZpc2l0b3JdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1ldGFUb2tlbnMgPSB0cnVlXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5kb3RzID0gZmFsc2VdXG4gKiBAcGFyYW0gez9Cb29sZWFufSBbb3B0aW9ucy5pbmRleGVzID0gZmFsc2VdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqKi9cblxuLyoqXG4gKiBJdCBjb252ZXJ0cyBhbiBvYmplY3QgaW50byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PGFueSwgYW55Pn0gb2JqIC0gVGhlIG9iamVjdCB0byBjb252ZXJ0IHRvIGZvcm0gZGF0YS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSAtIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gYXBwZW5kIHRvLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zXG4gKlxuICogQHJldHVybnNcbiAqL1xuZnVuY3Rpb24gdG9Gb3JtRGF0YShvYmosIGZvcm1EYXRhLCBvcHRpb25zKSB7XG4gIGlmICghdXRpbHMkMS5pc09iamVjdChvYmopKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGFyZ2V0IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgKEZvcm1EYXRhKSgpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBvcHRpb25zID0gdXRpbHMkMS50b0ZsYXRPYmplY3Qob3B0aW9ucywge1xuICAgIG1ldGFUb2tlbnM6IHRydWUsXG4gICAgZG90czogZmFsc2UsXG4gICAgaW5kZXhlczogZmFsc2VcbiAgfSwgZmFsc2UsIGZ1bmN0aW9uIGRlZmluZWQob3B0aW9uLCBzb3VyY2UpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgICByZXR1cm4gIXV0aWxzJDEuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICB9KTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2I7XG4gIGNvbnN0IHVzZUJsb2IgPSBfQmxvYiAmJiB1dGlscyQxLmlzU3BlY0NvbXBsaWFudEZvcm0oZm9ybURhdGEpO1xuXG4gIGlmICghdXRpbHMkMS5pc0Z1bmN0aW9uKHZpc2l0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmlzaXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuICcnO1xuXG4gICAgaWYgKHV0aWxzJDEuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VCbG9iICYmIHV0aWxzJDEuaXNCbG9iKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ0Jsb2IgaXMgbm90IHN1cHBvcnRlZC4gVXNlIGEgQnVmZmVyIGluc3RlYWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzJDEuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMkMS5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdXNlQmxvYiAmJiB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBCbG9iKFt2YWx1ZV0pIDogQnVmZmVyLmZyb20odmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZpc2l0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBrZXlcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmd8TnVtYmVyPn0gcGF0aFxuICAgKiBAdGhpcyB7Rm9ybURhdGF9XG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm4gdHJ1ZSB0byB2aXNpdCB0aGUgZWFjaCBwcm9wIG9mIHRoZSB2YWx1ZSByZWN1cnNpdmVseVxuICAgKi9cbiAgZnVuY3Rpb24gZGVmYXVsdFZpc2l0b3IodmFsdWUsIGtleSwgcGF0aCkge1xuICAgIGxldCBhcnIgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSAmJiAhcGF0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodXRpbHMkMS5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSBtZXRhVG9rZW5zID8ga2V5IDoga2V5LnNsaWNlKDAsIC0yKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgKHV0aWxzJDEuaXNBcnJheSh2YWx1ZSkgJiYgaXNGbGF0QXJyYXkodmFsdWUpKSB8fFxuICAgICAgICAoKHV0aWxzJDEuaXNGaWxlTGlzdCh2YWx1ZSkgfHwgdXRpbHMkMS5lbmRzV2l0aChrZXksICdbXScpKSAmJiAoYXJyID0gdXRpbHMkMS50b0FycmF5KHZhbHVlKSlcbiAgICAgICAgKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gcmVtb3ZlQnJhY2tldHMoa2V5KTtcblxuICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiBlYWNoKGVsLCBpbmRleCkge1xuICAgICAgICAgICEodXRpbHMkMS5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgICAgICAgICAgaW5kZXhlcyA9PT0gdHJ1ZSA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpIDogKGluZGV4ZXMgPT09IG51bGwgPyBrZXkgOiBrZXkgKyAnW10nKSxcbiAgICAgICAgICAgIGNvbnZlcnRWYWx1ZShlbClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkKHZhbHVlLCBwYXRoKSB7XG4gICAgaWYgKHV0aWxzJDEuaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm47XG5cbiAgICBpZiAoc3RhY2suaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICB0aHJvdyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICcgKyBwYXRoLmpvaW4oJy4nKSk7XG4gICAgfVxuXG4gICAgc3RhY2sucHVzaCh2YWx1ZSk7XG5cbiAgICB1dGlscyQxLmZvckVhY2godmFsdWUsIGZ1bmN0aW9uIGVhY2goZWwsIGtleSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gISh1dGlscyQxLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgdmlzaXRvci5jYWxsKFxuICAgICAgICBmb3JtRGF0YSwgZWwsIHV0aWxzJDEuaXNTdHJpbmcoa2V5KSA/IGtleS50cmltKCkgOiBrZXksIHBhdGgsIGV4cG9zZWRIZWxwZXJzXG4gICAgICApO1xuXG4gICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIGJ1aWxkKGVsLCBwYXRoID8gcGF0aC5jb25jYXQoa2V5KSA6IFtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN0YWNrLnBvcCgpO1xuICB9XG5cbiAgaWYgKCF1dGlscyQxLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdkYXRhIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICBidWlsZChvYmopO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxuLyoqXG4gKiBJdCBlbmNvZGVzIGEgc3RyaW5nIGJ5IHJlcGxhY2luZyBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgaW4gdGhlIHVucmVzZXJ2ZWQgc2V0IHdpdGhcbiAqIHRoZWlyIHBlcmNlbnQtZW5jb2RlZCBlcXVpdmFsZW50c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGVuY29kZS5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZSQxKHN0cikge1xuICBjb25zdCBjaGFyTWFwID0ge1xuICAgICchJzogJyUyMScsXG4gICAgXCInXCI6ICclMjcnLFxuICAgICcoJzogJyUyOCcsXG4gICAgJyknOiAnJTI5JyxcbiAgICAnfic6ICclN0UnLFxuICAgICclMjAnOiAnKycsXG4gICAgJyUwMCc6ICdcXHgwMCdcbiAgfTtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoL1shJygpfl18JTIwfCUwMC9nLCBmdW5jdGlvbiByZXBsYWNlcihtYXRjaCkge1xuICAgIHJldHVybiBjaGFyTWFwW21hdGNoXTtcbiAgfSk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXJhbXMgb2JqZWN0IGFuZCBjb252ZXJ0cyBpdCB0byBhIEZvcm1EYXRhIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgdG8gYmUgY29udmVydGVkIHRvIGEgRm9ybURhdGEgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IHBhc3NlZCB0byB0aGUgQXhpb3MgY29uc3RydWN0b3IuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIEF4aW9zVVJMU2VhcmNoUGFyYW1zKHBhcmFtcywgb3B0aW9ucykge1xuICB0aGlzLl9wYWlycyA9IFtdO1xuXG4gIHBhcmFtcyAmJiB0b0Zvcm1EYXRhKHBhcmFtcywgdGhpcywgb3B0aW9ucyk7XG59XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZTtcblxucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICB0aGlzLl9wYWlycy5wdXNoKFtuYW1lLCB2YWx1ZV0pO1xufTtcblxucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoZW5jb2Rlcikge1xuICBjb25zdCBfZW5jb2RlID0gZW5jb2RlciA/IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGVuY29kZXIuY2FsbCh0aGlzLCB2YWx1ZSwgZW5jb2RlJDEpO1xuICB9IDogZW5jb2RlJDE7XG5cbiAgcmV0dXJuIHRoaXMuX3BhaXJzLm1hcChmdW5jdGlvbiBlYWNoKHBhaXIpIHtcbiAgICByZXR1cm4gX2VuY29kZShwYWlyWzBdKSArICc9JyArIF9lbmNvZGUocGFpclsxXSk7XG4gIH0sICcnKS5qb2luKCcmJyk7XG59O1xuXG4vKipcbiAqIEl0IHJlcGxhY2VzIGFsbCBpbnN0YW5jZXMgb2YgdGhlIGNoYXJhY3RlcnMgYDpgLCBgJGAsIGAsYCwgYCtgLCBgW2AsIGFuZCBgXWAgd2l0aCB0aGVpclxuICogVVJJIGVuY29kZWQgY291bnRlcnBhcnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCBUaGUgdmFsdWUgdG8gYmUgZW5jb2RlZC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEBwYXJhbSB7P29iamVjdH0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBvcHRpb25zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgXG4gIGNvbnN0IF9lbmNvZGUgPSBvcHRpb25zICYmIG9wdGlvbnMuZW5jb2RlIHx8IGVuY29kZTtcblxuICBjb25zdCBzZXJpYWxpemVGbiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zZXJpYWxpemU7XG5cbiAgbGV0IHNlcmlhbGl6ZWRQYXJhbXM7XG5cbiAgaWYgKHNlcmlhbGl6ZUZuKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHNlcmlhbGl6ZUZuKHBhcmFtcywgb3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHV0aWxzJDEuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAgICovXG4gIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICAgIGZ1bGZpbGxlZCxcbiAgICAgIHJlamVjdGVkLFxuICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaW50ZXJjZXB0b3Igd2FzIHJlbW92ZWQsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHV0aWxzJDEuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgICBmbihoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyJDEgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cbnZhciB0cmFuc2l0aW9uYWxEZWZhdWx0cyA9IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcblxudmFyIFVSTFNlYXJjaFBhcmFtcyQxID0gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcblxudmFyIEZvcm1EYXRhJDEgPSB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnID8gRm9ybURhdGEgOiBudWxsO1xuXG52YXIgQmxvYiQxID0gdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnID8gQmxvYiA6IG51bGw7XG5cbnZhciBwbGF0Zm9ybSQxID0ge1xuICBpc0Jyb3dzZXI6IHRydWUsXG4gIGNsYXNzZXM6IHtcbiAgICBVUkxTZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyQxLFxuICAgIEZvcm1EYXRhOiBGb3JtRGF0YSQxLFxuICAgIEJsb2I6IEJsb2IkMVxuICB9LFxuICBwcm90b2NvbHM6IFsnaHR0cCcsICdodHRwcycsICdmaWxlJywgJ2Jsb2InLCAndXJsJywgJ2RhdGEnXVxufTtcblxuY29uc3QgaGFzQnJvd3NlckVudiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJFbnYgPSAoXG4gIChwcm9kdWN0KSA9PiB7XG4gICAgcmV0dXJuIGhhc0Jyb3dzZXJFbnYgJiYgWydSZWFjdE5hdGl2ZScsICdOYXRpdmVTY3JpcHQnLCAnTlMnXS5pbmRleE9mKHByb2R1Y3QpIDwgMFxuICB9KSh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIHdlYldvcmtlciBlbnZpcm9ubWVudFxuICpcbiAqIEFsdGhvdWdoIHRoZSBgaXNTdGFuZGFyZEJyb3dzZXJFbnZgIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdFxuICogYGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyYCwgdGhlIFdlYldvcmtlciB3aWxsIHN0aWxsIGJlXG4gKiBmaWx0ZXJlZCBvdXQgZHVlIHRvIGl0cyBqdWRnbWVudCBzdGFuZGFyZFxuICogYHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdgLlxuICogVGhpcyBsZWFkcyB0byBhIHByb2JsZW0gd2hlbiBheGlvcyBwb3N0IGBGb3JtRGF0YWAgaW4gd2ViV29ya2VyXG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudiA9ICgoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJlxuICAgIHR5cGVvZiBzZWxmLmltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbidcbiAgKTtcbn0pKCk7XG5cbmNvbnN0IG9yaWdpbiA9IGhhc0Jyb3dzZXJFbnYgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG52YXIgdXRpbHMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgaGFzQnJvd3NlckVudjogaGFzQnJvd3NlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52OiBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYsXG4gIGhhc1N0YW5kYXJkQnJvd3NlckVudjogaGFzU3RhbmRhcmRCcm93c2VyRW52LFxuICBvcmlnaW46IG9yaWdpblxufSk7XG5cbnZhciBwbGF0Zm9ybSA9IHtcbiAgLi4udXRpbHMsXG4gIC4uLnBsYXRmb3JtJDFcbn07XG5cbmZ1bmN0aW9uIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgb3B0aW9ucykge1xuICByZXR1cm4gdG9Gb3JtRGF0YShkYXRhLCBuZXcgcGxhdGZvcm0uY2xhc3Nlcy5VUkxTZWFyY2hQYXJhbXMoKSwgT2JqZWN0LmFzc2lnbih7XG4gICAgdmlzaXRvcjogZnVuY3Rpb24odmFsdWUsIGtleSwgcGF0aCwgaGVscGVycykge1xuICAgICAgaWYgKHBsYXRmb3JtLmlzTm9kZSAmJiB1dGlscyQxLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgICB0aGlzLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCdiYXNlNjQnKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlbHBlcnMuZGVmYXVsdFZpc2l0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH0sIG9wdGlvbnMpKTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZyBsaWtlIGBmb29beF1beV1bel1gIGFuZCByZXR1cm5zIGFuIGFycmF5IGxpa2UgYFsnZm9vJywgJ3gnLCAneScsICd6J11cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKlxuICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc3RyaW5ncy5cbiAqL1xuZnVuY3Rpb24gcGFyc2VQcm9wUGF0aChuYW1lKSB7XG4gIC8vIGZvb1t4XVt5XVt6XVxuICAvLyBmb28ueC55LnpcbiAgLy8gZm9vLXgteS16XG4gIC8vIGZvbyB4IHkgelxuICByZXR1cm4gdXRpbHMkMS5tYXRjaEFsbCgvXFx3K3xcXFsoXFx3KildL2csIG5hbWUpLm1hcChtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoWzBdID09PSAnW10nID8gJycgOiBtYXRjaFsxXSB8fCBtYXRjaFswXTtcbiAgfSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBhcnJheSB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY29udmVydCB0byBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhbmQgdmFsdWVzIGFzIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb09iamVjdChhcnIpIHtcbiAgY29uc3Qgb2JqID0ge307XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuICBsZXQgaTtcbiAgY29uc3QgbGVuID0ga2V5cy5sZW5ndGg7XG4gIGxldCBrZXk7XG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGtleSA9IGtleXNbaV07XG4gICAgb2JqW2tleV0gPSBhcnJba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgRm9ybURhdGEgb2JqZWN0IGFuZCByZXR1cm5zIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgVGhlIEZvcm1EYXRhIG9iamVjdCB0byBjb252ZXJ0IHRvIEpTT04uXG4gKlxuICogQHJldHVybnMge09iamVjdDxzdHJpbmcsIGFueT4gfCBudWxsfSBUaGUgY29udmVydGVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZm9ybURhdGFUb0pTT04oZm9ybURhdGEpIHtcbiAgZnVuY3Rpb24gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXQsIGluZGV4KSB7XG4gICAgbGV0IG5hbWUgPSBwYXRoW2luZGV4KytdO1xuXG4gICAgaWYgKG5hbWUgPT09ICdfX3Byb3RvX18nKSByZXR1cm4gdHJ1ZTtcblxuICAgIGNvbnN0IGlzTnVtZXJpY0tleSA9IE51bWJlci5pc0Zpbml0ZSgrbmFtZSk7XG4gICAgY29uc3QgaXNMYXN0ID0gaW5kZXggPj0gcGF0aC5sZW5ndGg7XG4gICAgbmFtZSA9ICFuYW1lICYmIHV0aWxzJDEuaXNBcnJheSh0YXJnZXQpID8gdGFyZ2V0Lmxlbmd0aCA6IG5hbWU7XG5cbiAgICBpZiAoaXNMYXN0KSB7XG4gICAgICBpZiAodXRpbHMkMS5oYXNPd25Qcm9wKHRhcmdldCwgbmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gW3RhcmdldFtuYW1lXSwgdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0W25hbWVdIHx8ICF1dGlscyQxLmlzT2JqZWN0KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0W25hbWVdLCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0ICYmIHV0aWxzJDEuaXNBcnJheSh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBhcnJheVRvT2JqZWN0KHRhcmdldFtuYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gIH1cblxuICBpZiAodXRpbHMkMS5pc0Zvcm1EYXRhKGZvcm1EYXRhKSAmJiB1dGlscyQxLmlzRnVuY3Rpb24oZm9ybURhdGEuZW50cmllcykpIHtcbiAgICBjb25zdCBvYmogPSB7fTtcblxuICAgIHV0aWxzJDEuZm9yRWFjaEVudHJ5KGZvcm1EYXRhLCAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGJ1aWxkUGF0aChwYXJzZVByb3BQYXRoKG5hbWUpLCB2YWx1ZSwgb2JqLCAwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZywgdHJpZXMgdG8gcGFyc2UgaXQsIGFuZCBpZiBpdCBmYWlscywgaXQgcmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvblxuICogb2YgdGhlIGlucHV0XG4gKlxuICogQHBhcmFtIHthbnl9IHJhd1ZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHN0cmluZ2lmaWVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyc2VyIC0gQSBmdW5jdGlvbiB0aGF0IHBhcnNlcyBhIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmNvZGVyIC0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIHJldHVybnMgYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSByYXdWYWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcbiAgaWYgKHV0aWxzJDEuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzJDEudHJpbShyYXdWYWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUubmFtZSAhPT0gJ1N5bnRheEVycm9yJykge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZW5jb2RlciB8fCBKU09OLnN0cmluZ2lmeSkocmF3VmFsdWUpO1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcblxuICB0cmFuc2l0aW9uYWw6IHRyYW5zaXRpb25hbERlZmF1bHRzLFxuXG4gIGFkYXB0ZXI6IFsneGhyJywgJ2h0dHAnLCAnZmV0Y2gnXSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkgfHwgJyc7XG4gICAgY29uc3QgaGFzSlNPTkNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID4gLTE7XG4gICAgY29uc3QgaXNPYmplY3RQYXlsb2FkID0gdXRpbHMkMS5pc09iamVjdChkYXRhKTtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgJiYgdXRpbHMkMS5pc0hUTUxGb3JtKGRhdGEpKSB7XG4gICAgICBkYXRhID0gbmV3IEZvcm1EYXRhKGRhdGEpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9ybURhdGEgPSB1dGlscyQxLmlzRm9ybURhdGEoZGF0YSk7XG5cbiAgICBpZiAoaXNGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGhhc0pTT05Db250ZW50VHlwZSA/IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhVG9KU09OKGRhdGEpKSA6IGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzJDEuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzJDEuaXNCbG9iKGRhdGEpIHx8XG4gICAgICB1dGlscyQxLmlzUmVhZGFibGVTdHJlYW0oZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMkMS5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMkMS5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLCBmYWxzZSk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGxldCBpc0ZpbGVMaXN0O1xuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCkge1xuICAgICAgaWYgKGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRvVVJMRW5jb2RlZEZvcm0oZGF0YSwgdGhpcy5mb3JtU2VyaWFsaXplcikudG9TdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKChpc0ZpbGVMaXN0ID0gdXRpbHMkMS5pc0ZpbGVMaXN0KGRhdGEpKSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdtdWx0aXBhcnQvZm9ybS1kYXRhJykgPiAtMSkge1xuICAgICAgICBjb25zdCBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcblxuICAgICAgICByZXR1cm4gdG9Gb3JtRGF0YShcbiAgICAgICAgICBpc0ZpbGVMaXN0ID8geydmaWxlc1tdJzogZGF0YX0gOiBkYXRhLFxuICAgICAgICAgIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCksXG4gICAgICAgICAgdGhpcy5mb3JtU2VyaWFsaXplclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgfHwgaGFzSlNPTkNvbnRlbnRUeXBlICkge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24vanNvbicsIGZhbHNlKTtcbiAgICAgIHJldHVybiBzdHJpbmdpZnlTYWZlbHkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICBjb25zdCBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgY29uc3QgSlNPTlJlcXVlc3RlZCA9IHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAodXRpbHMkMS5pc1Jlc3BvbnNlKGRhdGEpIHx8IHV0aWxzJDEuaXNSZWFkYWJsZVN0cmVhbShkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEgJiYgdXRpbHMkMS5pc1N0cmluZyhkYXRhKSAmJiAoKGZvcmNlZEpTT05QYXJzaW5nICYmICF0aGlzLnJlc3BvbnNlVHlwZSkgfHwgSlNPTlJlcXVlc3RlZCkpIHtcbiAgICAgIGNvbnN0IHNpbGVudEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5zaWxlbnRKU09OUGFyc2luZztcbiAgICAgIGNvbnN0IHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIEpTT05SZXF1ZXN0ZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcpIHtcbiAgICAgICAgICBpZiAoZS5uYW1lID09PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgICAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZSwgQXhpb3NFcnJvci5FUlJfQkFEX1JFU1BPTlNFLCB0aGlzLCBudWxsLCB0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgZW52OiB7XG4gICAgRm9ybURhdGE6IHBsYXRmb3JtLmNsYXNzZXMuRm9ybURhdGEsXG4gICAgQmxvYjogcGxhdGZvcm0uY2xhc3Nlcy5CbG9iXG4gIH0sXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfSxcblxuICBoZWFkZXJzOiB7XG4gICAgY29tbW9uOiB7XG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicsXG4gICAgICAnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkXG4gICAgfVxuICB9XG59O1xuXG51dGlscyQxLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgKG1ldGhvZCkgPT4ge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG52YXIgZGVmYXVsdHMkMSA9IGRlZmF1bHRzO1xuXG4vLyBSYXdBeGlvc0hlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5jb25zdCBpZ25vcmVEdXBsaWNhdGVPZiA9IHV0aWxzJDEudG9PYmplY3RTZXQoW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl0pO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmF3SGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKlxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xudmFyIHBhcnNlSGVhZGVycyA9IHJhd0hlYWRlcnMgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB7fTtcbiAgbGV0IGtleTtcbiAgbGV0IHZhbDtcbiAgbGV0IGk7XG5cbiAgcmF3SGVhZGVycyAmJiByYXdIZWFkZXJzLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IGxpbmUuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IGxpbmUuc3Vic3RyaW5nKGkgKyAxKS50cmltKCk7XG5cbiAgICBpZiAoIWtleSB8fCAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2Zba2V5XSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSkge1xuICAgICAgICBwYXJzZWRba2V5XS5wdXNoKHZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IFt2YWxdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbmNvbnN0ICRpbnRlcm5hbHMgPSBTeW1ib2woJ2ludGVybmFscycpO1xuXG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIgJiYgU3RyaW5nKGhlYWRlcikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB1dGlscyQxLmlzQXJyYXkodmFsdWUpID8gdmFsdWUubWFwKG5vcm1hbGl6ZVZhbHVlKSA6IFN0cmluZyh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW5zKHN0cikge1xuICBjb25zdCB0b2tlbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25zdCB0b2tlbnNSRSA9IC8oW15cXHMsOz1dKylcXHMqKD86PVxccyooW14sO10rKSk/L2c7XG4gIGxldCBtYXRjaDtcblxuICB3aGlsZSAoKG1hdGNoID0gdG9rZW5zUkUuZXhlYyhzdHIpKSkge1xuICAgIHRva2Vuc1ttYXRjaFsxXV0gPSBtYXRjaFsyXTtcbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbmNvbnN0IGlzVmFsaWRIZWFkZXJOYW1lID0gKHN0cikgPT4gL15bLV9hLXpBLVowLTleYHx+LCEjJCUmJyorLl0rJC8udGVzdChzdHIudHJpbSgpKTtcblxuZnVuY3Rpb24gbWF0Y2hIZWFkZXJWYWx1ZShjb250ZXh0LCB2YWx1ZSwgaGVhZGVyLCBmaWx0ZXIsIGlzSGVhZGVyTmFtZUZpbHRlcikge1xuICBpZiAodXRpbHMkMS5pc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgdmFsdWUsIGhlYWRlcik7XG4gIH1cblxuICBpZiAoaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gICAgdmFsdWUgPSBoZWFkZXI7XG4gIH1cblxuICBpZiAoIXV0aWxzJDEuaXNTdHJpbmcodmFsdWUpKSByZXR1cm47XG5cbiAgaWYgKHV0aWxzJDEuaXNTdHJpbmcoZmlsdGVyKSkge1xuICAgIHJldHVybiB2YWx1ZS5pbmRleE9mKGZpbHRlcikgIT09IC0xO1xuICB9XG5cbiAgaWYgKHV0aWxzJDEuaXNSZWdFeHAoZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyhbYS16XFxkXSkoXFx3KikvZywgKHcsIGNoYXIsIHN0cikgPT4ge1xuICAgICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKSArIHN0cjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcbiAgY29uc3QgYWNjZXNzb3JOYW1lID0gdXRpbHMkMS50b0NhbWVsQ2FzZSgnICcgKyBoZWFkZXIpO1xuXG4gIFsnZ2V0JywgJ3NldCcsICdoYXMnXS5mb3JFYWNoKG1ldGhvZE5hbWUgPT4ge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG1ldGhvZE5hbWUgKyBhY2Nlc3Nvck5hbWUsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgICAgIHJldHVybiB0aGlzW21ldGhvZE5hbWVdLmNhbGwodGhpcywgaGVhZGVyLCBhcmcxLCBhcmcyLCBhcmczKTtcbiAgICAgIH0sXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNsYXNzIEF4aW9zSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGhlYWRlcnMpIHtcbiAgICBoZWFkZXJzICYmIHRoaXMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgc2V0KGhlYWRlciwgdmFsdWVPclJld3JpdGUsIHJld3JpdGUpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHNldEhlYWRlcihfdmFsdWUsIF9oZWFkZXIsIF9yZXdyaXRlKSB7XG4gICAgICBjb25zdCBsSGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKF9oZWFkZXIpO1xuXG4gICAgICBpZiAoIWxIZWFkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoZWFkZXIgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkoc2VsZiwgbEhlYWRlcik7XG5cbiAgICAgIGlmKCFrZXkgfHwgc2VsZltrZXldID09PSB1bmRlZmluZWQgfHwgX3Jld3JpdGUgPT09IHRydWUgfHwgKF9yZXdyaXRlID09PSB1bmRlZmluZWQgJiYgc2VsZltrZXldICE9PSBmYWxzZSkpIHtcbiAgICAgICAgc2VsZltrZXkgfHwgX2hlYWRlcl0gPSBub3JtYWxpemVWYWx1ZShfdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNldEhlYWRlcnMgPSAoaGVhZGVycywgX3Jld3JpdGUpID0+XG4gICAgICB1dGlscyQxLmZvckVhY2goaGVhZGVycywgKF92YWx1ZSwgX2hlYWRlcikgPT4gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpKTtcblxuICAgIGlmICh1dGlscyQxLmlzUGxhaW5PYmplY3QoaGVhZGVyKSB8fCBoZWFkZXIgaW5zdGFuY2VvZiB0aGlzLmNvbnN0cnVjdG9yKSB7XG4gICAgICBzZXRIZWFkZXJzKGhlYWRlciwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZih1dGlscyQxLmlzU3RyaW5nKGhlYWRlcikgJiYgKGhlYWRlciA9IGhlYWRlci50cmltKCkpICYmICFpc1ZhbGlkSGVhZGVyTmFtZShoZWFkZXIpKSB7XG4gICAgICBzZXRIZWFkZXJzKHBhcnNlSGVhZGVycyhoZWFkZXIpLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscyQxLmlzSGVhZGVycyhoZWFkZXIpKSB7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBoZWFkZXIuZW50cmllcygpKSB7XG4gICAgICAgIHNldEhlYWRlcih2YWx1ZSwga2V5LCByZXdyaXRlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyICE9IG51bGwgJiYgc2V0SGVhZGVyKHZhbHVlT3JSZXdyaXRlLCBoZWFkZXIsIHJld3JpdGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0KGhlYWRlciwgcGFyc2VyKSB7XG4gICAgaGVhZGVyID0gbm9ybWFsaXplSGVhZGVyKGhlYWRlcik7XG5cbiAgICBpZiAoaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICBpZiAoIXBhcnNlcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzJDEuaXNGdW5jdGlvbihwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5jYWxsKHRoaXMsIHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzJDEuaXNSZWdFeHAocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuZXhlYyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJzZXIgbXVzdCBiZSBib29sZWFufHJlZ2V4cHxmdW5jdGlvbicpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhcyhoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzJDEuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICByZXR1cm4gISEoa2V5ICYmIHRoaXNba2V5XSAhPT0gdW5kZWZpbmVkICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlSGVhZGVyKF9oZWFkZXIpIHtcbiAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmIChfaGVhZGVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHV0aWxzJDEuZmluZEtleShzZWxmLCBfaGVhZGVyKTtcblxuICAgICAgICBpZiAoa2V5ICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHNlbGYsIHNlbGZba2V5XSwga2V5LCBtYXRjaGVyKSkpIHtcbiAgICAgICAgICBkZWxldGUgc2VsZltrZXldO1xuXG4gICAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodXRpbHMkMS5pc0FycmF5KGhlYWRlcikpIHtcbiAgICAgIGhlYWRlci5mb3JFYWNoKGRlbGV0ZUhlYWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZUhlYWRlcihoZWFkZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWxldGVkO1xuICB9XG5cbiAgY2xlYXIobWF0Y2hlcikge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZSh0aGlzLCB0aGlzW2tleV0sIGtleSwgbWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNba2V5XTtcbiAgICAgICAgZGVsZXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBub3JtYWxpemUoZm9ybWF0KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgaGVhZGVycyA9IHt9O1xuXG4gICAgdXRpbHMkMS5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscyQxLmZpbmRLZXkoaGVhZGVycywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBzZWxmW2tleV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGZvcm1hdCA/IGZvcm1hdEhlYWRlcihoZWFkZXIpIDogU3RyaW5nKGhlYWRlcikudHJpbSgpO1xuXG4gICAgICBpZiAobm9ybWFsaXplZCAhPT0gaGVhZGVyKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmW2hlYWRlcl07XG4gICAgICB9XG5cbiAgICAgIHNlbGZbbm9ybWFsaXplZF0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSk7XG5cbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZF0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25jYXQoLi4udGFyZ2V0cykge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmNvbmNhdCh0aGlzLCAuLi50YXJnZXRzKTtcbiAgfVxuXG4gIHRvSlNPTihhc1N0cmluZ3MpIHtcbiAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgdXRpbHMkMS5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSBmYWxzZSAmJiAob2JqW2hlYWRlcl0gPSBhc1N0cmluZ3MgJiYgdXRpbHMkMS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywgJykgOiB2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKS5tYXAoKFtoZWFkZXIsIHZhbHVlXSkgPT4gaGVhZGVyICsgJzogJyArIHZhbHVlKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gJ0F4aW9zSGVhZGVycyc7XG4gIH1cblxuICBzdGF0aWMgZnJvbSh0aGluZykge1xuICAgIHJldHVybiB0aGluZyBpbnN0YW5jZW9mIHRoaXMgPyB0aGluZyA6IG5ldyB0aGlzKHRoaW5nKTtcbiAgfVxuXG4gIHN0YXRpYyBjb25jYXQoZmlyc3QsIC4uLnRhcmdldHMpIHtcbiAgICBjb25zdCBjb21wdXRlZCA9IG5ldyB0aGlzKGZpcnN0KTtcblxuICAgIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiBjb21wdXRlZC5zZXQodGFyZ2V0KSk7XG5cbiAgICByZXR1cm4gY29tcHV0ZWQ7XG4gIH1cblxuICBzdGF0aWMgYWNjZXNzb3IoaGVhZGVyKSB7XG4gICAgY29uc3QgaW50ZXJuYWxzID0gdGhpc1skaW50ZXJuYWxzXSA9ICh0aGlzWyRpbnRlcm5hbHNdID0ge1xuICAgICAgYWNjZXNzb3JzOiB7fVxuICAgIH0pO1xuXG4gICAgY29uc3QgYWNjZXNzb3JzID0gaW50ZXJuYWxzLmFjY2Vzc29ycztcbiAgICBjb25zdCBwcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZUFjY2Vzc29yKF9oZWFkZXIpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghYWNjZXNzb3JzW2xIZWFkZXJdKSB7XG4gICAgICAgIGJ1aWxkQWNjZXNzb3JzKHByb3RvdHlwZSwgX2hlYWRlcik7XG4gICAgICAgIGFjY2Vzc29yc1tsSGVhZGVyXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXRpbHMkMS5pc0FycmF5KGhlYWRlcikgPyBoZWFkZXIuZm9yRWFjaChkZWZpbmVBY2Nlc3NvcikgOiBkZWZpbmVBY2Nlc3NvcihoZWFkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQXhpb3NIZWFkZXJzLmFjY2Vzc29yKFsnQ29udGVudC1UeXBlJywgJ0NvbnRlbnQtTGVuZ3RoJywgJ0FjY2VwdCcsICdBY2NlcHQtRW5jb2RpbmcnLCAnVXNlci1BZ2VudCcsICdBdXRob3JpemF0aW9uJ10pO1xuXG4vLyByZXNlcnZlZCBuYW1lcyBob3RmaXhcbnV0aWxzJDEucmVkdWNlRGVzY3JpcHRvcnMoQXhpb3NIZWFkZXJzLnByb3RvdHlwZSwgKHt2YWx1ZX0sIGtleSkgPT4ge1xuICBsZXQgbWFwcGVkID0ga2V5WzBdLnRvVXBwZXJDYXNlKCkgKyBrZXkuc2xpY2UoMSk7IC8vIG1hcCBgc2V0YCA9PiBgU2V0YFxuICByZXR1cm4ge1xuICAgIGdldDogKCkgPT4gdmFsdWUsXG4gICAgc2V0KGhlYWRlclZhbHVlKSB7XG4gICAgICB0aGlzW21hcHBlZF0gPSBoZWFkZXJWYWx1ZTtcbiAgICB9XG4gIH1cbn0pO1xuXG51dGlscyQxLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzKTtcblxudmFyIEF4aW9zSGVhZGVycyQxID0gQXhpb3NIZWFkZXJzO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzJDE7XG4gIGNvbnN0IGNvbnRleHQgPSByZXNwb25zZSB8fCBjb25maWc7XG4gIGNvbnN0IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKGNvbnRleHQuaGVhZGVycyk7XG4gIGxldCBkYXRhID0gY29udGV4dC5kYXRhO1xuXG4gIHV0aWxzJDEuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59XG5cbi8qKlxuICogQSBgQ2FuY2VsZWRFcnJvcmAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdD19IHJlcXVlc3QgVGhlIHJlcXVlc3QuXG4gKlxuICogQHJldHVybnMge0NhbmNlbGVkRXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgQXhpb3NFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UgPT0gbnVsbCA/ICdjYW5jZWxlZCcgOiBtZXNzYWdlLCBBeGlvc0Vycm9yLkVSUl9DQU5DRUxFRCwgY29uZmlnLCByZXF1ZXN0KTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscyQxLmluaGVyaXRzKENhbmNlbGVkRXJyb3IsIEF4aW9zRXJyb3IsIHtcbiAgX19DQU5DRUxfXzogdHJ1ZVxufSk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge29iamVjdH0gVGhlIHJlc3BvbnNlLlxuICovXG5mdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICBjb25zdCB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgW0F4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0VdW01hdGguZmxvb3IocmVzcG9uc2Uuc3RhdHVzIC8gMTAwKSAtIDRdLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIGRhdGEgbWF4UmF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtzYW1wbGVzQ291bnQ9IDEwXVxuICogQHBhcmFtIHtOdW1iZXJ9IFttaW49IDEwMDBdXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHNwZWVkb21ldGVyKHNhbXBsZXNDb3VudCwgbWluKSB7XG4gIHNhbXBsZXNDb3VudCA9IHNhbXBsZXNDb3VudCB8fCAxMDtcbiAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgY29uc3QgdGltZXN0YW1wcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBsZXQgaGVhZCA9IDA7XG4gIGxldCB0YWlsID0gMDtcbiAgbGV0IGZpcnN0U2FtcGxlVFM7XG5cbiAgbWluID0gbWluICE9PSB1bmRlZmluZWQgPyBtaW4gOiAxMDAwO1xuXG4gIHJldHVybiBmdW5jdGlvbiBwdXNoKGNodW5rTGVuZ3RoKSB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHRpbWVzdGFtcHNbdGFpbF07XG5cbiAgICBpZiAoIWZpcnN0U2FtcGxlVFMpIHtcbiAgICAgIGZpcnN0U2FtcGxlVFMgPSBub3c7XG4gICAgfVxuXG4gICAgYnl0ZXNbaGVhZF0gPSBjaHVua0xlbmd0aDtcbiAgICB0aW1lc3RhbXBzW2hlYWRdID0gbm93O1xuXG4gICAgbGV0IGkgPSB0YWlsO1xuICAgIGxldCBieXRlc0NvdW50ID0gMDtcblxuICAgIHdoaWxlIChpICE9PSBoZWFkKSB7XG4gICAgICBieXRlc0NvdW50ICs9IGJ5dGVzW2krK107XG4gICAgICBpID0gaSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBoZWFkID0gKGhlYWQgKyAxKSAlIHNhbXBsZXNDb3VudDtcblxuICAgIGlmIChoZWFkID09PSB0YWlsKSB7XG4gICAgICB0YWlsID0gKHRhaWwgKyAxKSAlIHNhbXBsZXNDb3VudDtcbiAgICB9XG5cbiAgICBpZiAobm93IC0gZmlyc3RTYW1wbGVUUyA8IG1pbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhc3NlZCA9IHN0YXJ0ZWRBdCAmJiBub3cgLSBzdGFydGVkQXQ7XG5cbiAgICByZXR1cm4gcGFzc2VkID8gTWF0aC5yb3VuZChieXRlc0NvdW50ICogMTAwMCAvIHBhc3NlZCkgOiB1bmRlZmluZWQ7XG4gIH07XG59XG5cbi8qKlxuICogVGhyb3R0bGUgZGVjb3JhdG9yXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtOdW1iZXJ9IGZyZXFcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmbiwgZnJlcSkge1xuICBsZXQgdGltZXN0YW1wID0gMDtcbiAgY29uc3QgdGhyZXNob2xkID0gMTAwMCAvIGZyZXE7XG4gIGxldCB0aW1lciA9IG51bGw7XG4gIHJldHVybiBmdW5jdGlvbiB0aHJvdHRsZWQoKSB7XG4gICAgY29uc3QgZm9yY2UgPSB0aGlzID09PSB0cnVlO1xuXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBpZiAoZm9yY2UgfHwgbm93IC0gdGltZXN0YW1wID4gdGhyZXNob2xkKSB7XG4gICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgICAgdGltZXN0YW1wID0gbm93O1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIGlmICghdGltZXIpIHtcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICB9LCB0aHJlc2hvbGQgLSAobm93IC0gdGltZXN0YW1wKSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgcHJvZ3Jlc3NFdmVudFJlZHVjZXIgPSAobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0sIGZyZXEgPSAzKSA9PiB7XG4gIGxldCBieXRlc05vdGlmaWVkID0gMDtcbiAgY29uc3QgX3NwZWVkb21ldGVyID0gc3BlZWRvbWV0ZXIoNTAsIDI1MCk7XG5cbiAgcmV0dXJuIHRocm90dGxlKGUgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XG5cbiAgICBieXRlc05vdGlmaWVkID0gbG9hZGVkO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gKGxvYWRlZCAvIHRvdGFsKSA6IHVuZGVmaW5lZCxcbiAgICAgIGJ5dGVzOiBwcm9ncmVzc0J5dGVzLFxuICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBlc3RpbWF0ZWQ6IHJhdGUgJiYgdG90YWwgJiYgaW5SYW5nZSA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsXG4gICAgfTtcblxuICAgIGRhdGFbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ10gPSB0cnVlO1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufTtcblxudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiA/XG5cbi8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgY29uc3QgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgY29uc3QgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGV0IG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXRzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIGxldCBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICBjb25zdCBwYXJzZWQgPSAodXRpbHMkMS5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKCk7XG5cbnZhciBjb29raWVzID0gcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAge1xuICAgIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgY29uc3QgY29va2llID0gW25hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpXTtcblxuICAgICAgdXRpbHMkMS5pc051bWJlcihleHBpcmVzKSAmJiBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG5cbiAgICAgIHV0aWxzJDEuaXNTdHJpbmcocGF0aCkgJiYgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuXG4gICAgICB1dGlscyQxLmlzU3RyaW5nKGRvbWFpbikgJiYgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcblxuICAgICAgc2VjdXJlID09PSB0cnVlICYmIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcblxuICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgfSxcblxuICAgIHJlYWQobmFtZSkge1xuICAgICAgY29uc3QgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlKG5hbWUpIHtcbiAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgfVxuICB9XG5cbiAgOlxuXG4gIC8vIE5vbi1zdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAge1xuICAgIHdyaXRlKCkge30sXG4gICAgcmVhZCgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlKCkge31cbiAgfTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5mdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvP1xcLyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufVxuXG5jb25zdCBoZWFkZXJzVG9PYmplY3QgPSAodGhpbmcpID0+IHRoaW5nIGluc3RhbmNlb2YgQXhpb3NIZWFkZXJzJDEgPyB7IC4uLnRoaW5nIH0gOiB0aGluZztcblxuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5mdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgY29uc3QgY29uZmlnID0ge307XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UsIGNhc2VsZXNzKSB7XG4gICAgaWYgKHV0aWxzJDEuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzJDEuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMkMS5tZXJnZS5jYWxsKHtjYXNlbGVzc30sIHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzJDEuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMkMS5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzJDEuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhhLCBiLCBjYXNlbGVzcykge1xuICAgIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhLCBjYXNlbGVzcyk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIoYSwgYikge1xuICAgIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGlyZWN0S2V5cyhhLCBiLCBwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIpO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBtZXJnZU1hcCA9IHtcbiAgICB1cmw6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgbWV0aG9kOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGRhdGE6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgYmFzZVVSTDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlc3BvbnNlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHBhcmFtc1NlcmlhbGl6ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0TWVzc2FnZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aFhTUkZUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBhZGFwdGVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlVHlwZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmQ29va2llTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB4c3JmSGVhZGVyTmFtZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvblVwbG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uRG93bmxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBkZWNvbXByZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heENvbnRlbnRMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Qm9keUxlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBiZWZvcmVSZWRpcmVjdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc3BvcnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cEFnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBzQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgY2FuY2VsVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgc29ja2V0UGF0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZUVuY29kaW5nOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHZhbGlkYXRlU3RhdHVzOiBtZXJnZURpcmVjdEtleXMsXG4gICAgaGVhZGVyczogKGEsIGIpID0+IG1lcmdlRGVlcFByb3BlcnRpZXMoaGVhZGVyc1RvT2JqZWN0KGEpLCBoZWFkZXJzVG9PYmplY3QoYiksIHRydWUpXG4gIH07XG5cbiAgdXRpbHMkMS5mb3JFYWNoKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZzEsIGNvbmZpZzIpKSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICBjb25zdCBtZXJnZSA9IG1lcmdlTWFwW3Byb3BdIHx8IG1lcmdlRGVlcFByb3BlcnRpZXM7XG4gICAgY29uc3QgY29uZmlnVmFsdWUgPSBtZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdLCBwcm9wKTtcbiAgICAodXRpbHMkMS5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxudmFyIHJlc29sdmVDb25maWcgPSAoY29uZmlnKSA9PiB7XG4gIGNvbnN0IG5ld0NvbmZpZyA9IG1lcmdlQ29uZmlnKHt9LCBjb25maWcpO1xuXG4gIGxldCB7ZGF0YSwgd2l0aFhTUkZUb2tlbiwgeHNyZkhlYWRlck5hbWUsIHhzcmZDb29raWVOYW1lLCBoZWFkZXJzLCBhdXRofSA9IG5ld0NvbmZpZztcblxuICBuZXdDb25maWcuaGVhZGVycyA9IGhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKGhlYWRlcnMpO1xuXG4gIG5ld0NvbmZpZy51cmwgPSBidWlsZFVSTChidWlsZEZ1bGxQYXRoKG5ld0NvbmZpZy5iYXNlVVJMLCBuZXdDb25maWcudXJsKSwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuXG4gIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgaWYgKGF1dGgpIHtcbiAgICBoZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICtcbiAgICAgIGJ0b2EoKGF1dGgudXNlcm5hbWUgfHwgJycpICsgJzonICsgKGF1dGgucGFzc3dvcmQgPyB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYXV0aC5wYXNzd29yZCkpIDogJycpKVxuICAgICk7XG4gIH1cblxuICBsZXQgY29udGVudFR5cGU7XG5cbiAgaWYgKHV0aWxzJDEuaXNGb3JtRGF0YShkYXRhKSkge1xuICAgIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgfHwgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52KSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKHVuZGVmaW5lZCk7IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9IGVsc2UgaWYgKChjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSkgIT09IGZhbHNlKSB7XG4gICAgICAvLyBmaXggc2VtaWNvbG9uIGR1cGxpY2F0aW9uIGlzc3VlIGZvciBSZWFjdE5hdGl2ZSBGb3JtRGF0YSBpbXBsZW1lbnRhdGlvblxuICAgICAgY29uc3QgW3R5cGUsIC4uLnRva2Vuc10gPSBjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JykubWFwKHRva2VuID0+IHRva2VuLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pIDogW107XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKFt0eXBlIHx8ICdtdWx0aXBhcnQvZm9ybS1kYXRhJywgLi4udG9rZW5zXS5qb2luKCc7ICcpKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cbiAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudikge1xuICAgIHdpdGhYU1JGVG9rZW4gJiYgdXRpbHMkMS5pc0Z1bmN0aW9uKHdpdGhYU1JGVG9rZW4pICYmICh3aXRoWFNSRlRva2VuID0gd2l0aFhTUkZUb2tlbihuZXdDb25maWcpKTtcblxuICAgIGlmICh3aXRoWFNSRlRva2VuIHx8ICh3aXRoWFNSRlRva2VuICE9PSBmYWxzZSAmJiBpc1VSTFNhbWVPcmlnaW4obmV3Q29uZmlnLnVybCkpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIGNvbnN0IHhzcmZWYWx1ZSA9IHhzcmZIZWFkZXJOYW1lICYmIHhzcmZDb29raWVOYW1lICYmIGNvb2tpZXMucmVhZCh4c3JmQ29va2llTmFtZSk7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgaGVhZGVycy5zZXQoeHNyZkhlYWRlck5hbWUsIHhzcmZWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0NvbmZpZztcbn07XG5cbmNvbnN0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCc7XG5cbnZhciB4aHJBZGFwdGVyID0gaXNYSFJBZGFwdGVyU3VwcG9ydGVkICYmIGZ1bmN0aW9uIChjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBjb25zdCBfY29uZmlnID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuICAgIGxldCByZXF1ZXN0RGF0YSA9IF9jb25maWcuZGF0YTtcbiAgICBjb25zdCByZXF1ZXN0SGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oX2NvbmZpZy5oZWFkZXJzKS5ub3JtYWxpemUoKTtcbiAgICBsZXQge3Jlc3BvbnNlVHlwZX0gPSBfY29uZmlnO1xuICAgIGxldCBvbkNhbmNlbGVkO1xuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgICBfY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgX2NvbmZpZy5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgcmVxdWVzdC5vcGVuKF9jb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIF9jb25maWcudXJsLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gX2NvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICBjb25zdCByZXNwb25zZUhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKFxuICAgICAgICAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ICYmIHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcbiAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZURhdGEgPSAhcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nID9cbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCBmdW5jdGlvbiBfcmVqZWN0KGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoJ29ubG9hZGVuZCcgaW4gcmVxdWVzdCkge1xuICAgICAgLy8gVXNlIG9ubG9hZGVuZCBpZiBhdmFpbGFibGVcbiAgICAgIHJlcXVlc3Qub25sb2FkZW5kID0gb25sb2FkZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlIHRvIGVtdWxhdGUgb25sb2FkZW5kXG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVhZHlzdGF0ZSBoYW5kbGVyIGlzIGNhbGxpbmcgYmVmb3JlIG9uZXJyb3Igb3Igb250aW1lb3V0IGhhbmRsZXJzLFxuICAgICAgICAvLyBzbyB3ZSBzaG91bGQgY2FsbCBvbmxvYWRlbmQgb24gdGhlIG5leHQgJ3RpY2snXG4gICAgICAgIHNldFRpbWVvdXQob25sb2FkZW5kKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCwgX2NvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIF9jb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXQgPyAndGltZW91dCBvZiAnICsgX2NvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IF9jb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgaWYgKF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgIF9jb25maWcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICByZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkICYmIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKG51bGwpO1xuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzJDEuZm9yRWFjaChyZXF1ZXN0SGVhZGVycy50b0pTT04oKSwgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmICghdXRpbHMkMS5pc1VuZGVmaW5lZChfY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFfY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBfY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBfY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzRXZlbnRSZWR1Y2VyKF9jb25maWcub25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIF9jb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBwcm9ncmVzc0V2ZW50UmVkdWNlcihfY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpKTtcbiAgICB9XG5cbiAgICBpZiAoX2NvbmZpZy5jYW5jZWxUb2tlbiB8fCBfY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBjYW5jZWwgPT4ge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVqZWN0KCFjYW5jZWwgfHwgY2FuY2VsLnR5cGUgPyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcsIHJlcXVlc3QpIDogY2FuY2VsKTtcbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4gJiYgX2NvbmZpZy5jYW5jZWxUb2tlbi5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICBpZiAoX2NvbmZpZy5zaWduYWwpIHtcbiAgICAgICAgX2NvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IF9jb25maWcuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2wgPSBwYXJzZVByb3RvY29sKF9jb25maWcudXJsKTtcblxuICAgIGlmIChwcm90b2NvbCAmJiBwbGF0Zm9ybS5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1Vuc3VwcG9ydGVkIHByb3RvY29sICcgKyBwcm90b2NvbCArICc6JywgQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIGNvbmZpZykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSB8fCBudWxsKTtcbiAgfSk7XG59O1xuXG5jb25zdCBjb21wb3NlU2lnbmFscyA9IChzaWduYWxzLCB0aW1lb3V0KSA9PiB7XG4gIGxldCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gIGxldCBhYm9ydGVkO1xuXG4gIGNvbnN0IG9uYWJvcnQgPSBmdW5jdGlvbiAoY2FuY2VsKSB7XG4gICAgaWYgKCFhYm9ydGVkKSB7XG4gICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICBjb25zdCBlcnIgPSBjYW5jZWwgaW5zdGFuY2VvZiBFcnJvciA/IGNhbmNlbCA6IHRoaXMucmVhc29uO1xuICAgICAgY29udHJvbGxlci5hYm9ydChlcnIgaW5zdGFuY2VvZiBBeGlvc0Vycm9yID8gZXJyIDogbmV3IENhbmNlbGVkRXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6IGVycikpO1xuICAgIH1cbiAgfTtcblxuICBsZXQgdGltZXIgPSB0aW1lb3V0ICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIG9uYWJvcnQobmV3IEF4aW9zRXJyb3IoYHRpbWVvdXQgJHt0aW1lb3V0fSBvZiBtcyBleGNlZWRlZGAsIEF4aW9zRXJyb3IuRVRJTUVET1VUKSk7XG4gIH0sIHRpbWVvdXQpO1xuXG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4ge1xuICAgIGlmIChzaWduYWxzKSB7XG4gICAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgc2lnbmFscy5mb3JFYWNoKHNpZ25hbCA9PiB7XG4gICAgICAgIHNpZ25hbCAmJlxuICAgICAgICAoc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIgPyBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbmFib3J0KSA6IHNpZ25hbC51bnN1YnNjcmliZShvbmFib3J0KSk7XG4gICAgICB9KTtcbiAgICAgIHNpZ25hbHMgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICBzaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4gc2lnbmFsICYmIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyICYmIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpKTtcblxuICBjb25zdCB7c2lnbmFsfSA9IGNvbnRyb2xsZXI7XG5cbiAgc2lnbmFsLnVuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG5cbiAgcmV0dXJuIFtzaWduYWwsICgpID0+IHtcbiAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRpbWVyID0gbnVsbDtcbiAgfV07XG59O1xuXG52YXIgY29tcG9zZVNpZ25hbHMkMSA9IGNvbXBvc2VTaWduYWxzO1xuXG5jb25zdCBzdHJlYW1DaHVuayA9IGZ1bmN0aW9uKiAoY2h1bmssIGNodW5rU2l6ZSkge1xuICBsZXQgbGVuID0gY2h1bmsuYnl0ZUxlbmd0aDtcblxuICBpZiAoIWNodW5rU2l6ZSB8fCBsZW4gPCBjaHVua1NpemUpIHtcbiAgICB5aWVsZCBjaHVuaztcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgcG9zID0gMDtcbiAgbGV0IGVuZDtcblxuICB3aGlsZSAocG9zIDwgbGVuKSB7XG4gICAgZW5kID0gcG9zICsgY2h1bmtTaXplO1xuICAgIHlpZWxkIGNodW5rLnNsaWNlKHBvcywgZW5kKTtcbiAgICBwb3MgPSBlbmQ7XG4gIH1cbn07XG5cbmNvbnN0IHJlYWRCeXRlcyA9IGFzeW5jIGZ1bmN0aW9uKiAoaXRlcmFibGUsIGNodW5rU2l6ZSwgZW5jb2RlKSB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgaXRlcmFibGUpIHtcbiAgICB5aWVsZCogc3RyZWFtQ2h1bmsoQXJyYXlCdWZmZXIuaXNWaWV3KGNodW5rKSA/IGNodW5rIDogKGF3YWl0IGVuY29kZShTdHJpbmcoY2h1bmspKSksIGNodW5rU2l6ZSk7XG4gIH1cbn07XG5cbmNvbnN0IHRyYWNrU3RyZWFtID0gKHN0cmVhbSwgY2h1bmtTaXplLCBvblByb2dyZXNzLCBvbkZpbmlzaCwgZW5jb2RlKSA9PiB7XG4gIGNvbnN0IGl0ZXJhdG9yID0gcmVhZEJ5dGVzKHN0cmVhbSwgY2h1bmtTaXplLCBlbmNvZGUpO1xuXG4gIGxldCBieXRlcyA9IDA7XG5cbiAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbSh7XG4gICAgdHlwZTogJ2J5dGVzJyxcblxuICAgIGFzeW5jIHB1bGwoY29udHJvbGxlcikge1xuICAgICAgY29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IGl0ZXJhdG9yLm5leHQoKTtcblxuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBsZW4gPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKGJ5dGVzICs9IGxlbik7XG4gICAgICBjb250cm9sbGVyLmVucXVldWUobmV3IFVpbnQ4QXJyYXkodmFsdWUpKTtcbiAgICB9LFxuICAgIGNhbmNlbChyZWFzb24pIHtcbiAgICAgIG9uRmluaXNoKHJlYXNvbik7XG4gICAgICByZXR1cm4gaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgfVxuICB9LCB7XG4gICAgaGlnaFdhdGVyTWFyazogMlxuICB9KVxufTtcblxuY29uc3QgZmV0Y2hQcm9ncmVzc0RlY29yYXRvciA9ICh0b3RhbCwgZm4pID0+IHtcbiAgY29uc3QgbGVuZ3RoQ29tcHV0YWJsZSA9IHRvdGFsICE9IG51bGw7XG4gIHJldHVybiAobG9hZGVkKSA9PiBzZXRUaW1lb3V0KCgpID0+IGZuKHtcbiAgICBsZW5ndGhDb21wdXRhYmxlLFxuICAgIHRvdGFsLFxuICAgIGxvYWRlZFxuICB9KSk7XG59O1xuXG5jb25zdCBpc0ZldGNoU3VwcG9ydGVkID0gdHlwZW9mIGZldGNoID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgPSBpc0ZldGNoU3VwcG9ydGVkICYmIHR5cGVvZiBSZWFkYWJsZVN0cmVhbSA9PT0gJ2Z1bmN0aW9uJztcblxuLy8gdXNlZCBvbmx5IGluc2lkZSB0aGUgZmV0Y2ggYWRhcHRlclxuY29uc3QgZW5jb2RlVGV4dCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgKHR5cGVvZiBUZXh0RW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgKChlbmNvZGVyKSA9PiAoc3RyKSA9PiBlbmNvZGVyLmVuY29kZShzdHIpKShuZXcgVGV4dEVuY29kZXIoKSkgOlxuICAgIGFzeW5jIChzdHIpID0+IG5ldyBVaW50OEFycmF5KGF3YWl0IG5ldyBSZXNwb25zZShzdHIpLmFycmF5QnVmZmVyKCkpXG4pO1xuXG5jb25zdCBzdXBwb3J0c1JlcXVlc3RTdHJlYW0gPSBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmICgoKSA9PiB7XG4gIGxldCBkdXBsZXhBY2Nlc3NlZCA9IGZhbHNlO1xuXG4gIGNvbnN0IGhhc0NvbnRlbnRUeXBlID0gbmV3IFJlcXVlc3QocGxhdGZvcm0ub3JpZ2luLCB7XG4gICAgYm9keTogbmV3IFJlYWRhYmxlU3RyZWFtKCksXG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgZ2V0IGR1cGxleCgpIHtcbiAgICAgIGR1cGxleEFjY2Vzc2VkID0gdHJ1ZTtcbiAgICAgIHJldHVybiAnaGFsZic7XG4gICAgfSxcbiAgfSkuaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpO1xuXG4gIHJldHVybiBkdXBsZXhBY2Nlc3NlZCAmJiAhaGFzQ29udGVudFR5cGU7XG59KSgpO1xuXG5jb25zdCBERUZBVUxUX0NIVU5LX1NJWkUgPSA2NCAqIDEwMjQ7XG5cbmNvbnN0IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gPSBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkICYmICEhKCgpPT4ge1xuICB0cnkge1xuICAgIHJldHVybiB1dGlscyQxLmlzUmVhZGFibGVTdHJlYW0obmV3IFJlc3BvbnNlKCcnKS5ib2R5KTtcbiAgfSBjYXRjaChlcnIpIHtcbiAgICAvLyByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbn0pKCk7XG5cbmNvbnN0IHJlc29sdmVycyA9IHtcbiAgc3RyZWFtOiBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmICgocmVzKSA9PiByZXMuYm9keSlcbn07XG5cbmlzRmV0Y2hTdXBwb3J0ZWQgJiYgKCgocmVzKSA9PiB7XG4gIFsndGV4dCcsICdhcnJheUJ1ZmZlcicsICdibG9iJywgJ2Zvcm1EYXRhJywgJ3N0cmVhbSddLmZvckVhY2godHlwZSA9PiB7XG4gICAgIXJlc29sdmVyc1t0eXBlXSAmJiAocmVzb2x2ZXJzW3R5cGVdID0gdXRpbHMkMS5pc0Z1bmN0aW9uKHJlc1t0eXBlXSkgPyAocmVzKSA9PiByZXNbdHlwZV0oKSA6XG4gICAgICAoXywgY29uZmlnKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBSZXNwb25zZSB0eXBlICcke3R5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCwgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsIGNvbmZpZyk7XG4gICAgICB9KTtcbiAgfSk7XG59KShuZXcgUmVzcG9uc2UpKTtcblxuY29uc3QgZ2V0Qm9keUxlbmd0aCA9IGFzeW5jIChib2R5KSA9PiB7XG4gIGlmIChib2R5ID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNCbG9iKGJvZHkpKSB7XG4gICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNTcGVjQ29tcGxpYW50Rm9ybShib2R5KSkge1xuICAgIHJldHVybiAoYXdhaXQgbmV3IFJlcXVlc3QoYm9keSkuYXJyYXlCdWZmZXIoKSkuYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMkMS5pc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gIH1cblxuICBpZih1dGlscyQxLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgcmV0dXJuIChhd2FpdCBlbmNvZGVUZXh0KGJvZHkpKS5ieXRlTGVuZ3RoO1xuICB9XG59O1xuXG5jb25zdCByZXNvbHZlQm9keUxlbmd0aCA9IGFzeW5jIChoZWFkZXJzLCBib2R5KSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IHV0aWxzJDEudG9GaW5pdGVOdW1iZXIoaGVhZGVycy5nZXRDb250ZW50TGVuZ3RoKCkpO1xuXG4gIHJldHVybiBsZW5ndGggPT0gbnVsbCA/IGdldEJvZHlMZW5ndGgoYm9keSkgOiBsZW5ndGg7XG59O1xuXG52YXIgZmV0Y2hBZGFwdGVyID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAoYXN5bmMgKGNvbmZpZykgPT4ge1xuICBsZXQge1xuICAgIHVybCxcbiAgICBtZXRob2QsXG4gICAgZGF0YSxcbiAgICBzaWduYWwsXG4gICAgY2FuY2VsVG9rZW4sXG4gICAgdGltZW91dCxcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3MsXG4gICAgb25VcGxvYWRQcm9ncmVzcyxcbiAgICByZXNwb25zZVR5cGUsXG4gICAgaGVhZGVycyxcbiAgICB3aXRoQ3JlZGVudGlhbHMgPSAnc2FtZS1vcmlnaW4nLFxuICAgIGZldGNoT3B0aW9uc1xuICB9ID0gcmVzb2x2ZUNvbmZpZyhjb25maWcpO1xuXG4gIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSA/IChyZXNwb25zZVR5cGUgKyAnJykudG9Mb3dlckNhc2UoKSA6ICd0ZXh0JztcblxuICBsZXQgW2NvbXBvc2VkU2lnbmFsLCBzdG9wVGltZW91dF0gPSAoc2lnbmFsIHx8IGNhbmNlbFRva2VuIHx8IHRpbWVvdXQpID9cbiAgICBjb21wb3NlU2lnbmFscyQxKFtzaWduYWwsIGNhbmNlbFRva2VuXSwgdGltZW91dCkgOiBbXTtcblxuICBsZXQgZmluaXNoZWQsIHJlcXVlc3Q7XG5cbiAgY29uc3Qgb25GaW5pc2ggPSAoKSA9PiB7XG4gICAgIWZpbmlzaGVkICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29tcG9zZWRTaWduYWwgJiYgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcblxuICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgfTtcblxuICBsZXQgcmVxdWVzdENvbnRlbnRMZW5ndGg7XG5cbiAgdHJ5IHtcbiAgICBpZiAoXG4gICAgICBvblVwbG9hZFByb2dyZXNzICYmIHN1cHBvcnRzUmVxdWVzdFN0cmVhbSAmJiBtZXRob2QgIT09ICdnZXQnICYmIG1ldGhvZCAhPT0gJ2hlYWQnICYmXG4gICAgICAocmVxdWVzdENvbnRlbnRMZW5ndGggPSBhd2FpdCByZXNvbHZlQm9keUxlbmd0aChoZWFkZXJzLCBkYXRhKSkgIT09IDBcbiAgICApIHtcbiAgICAgIGxldCBfcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgZHVwbGV4OiBcImhhbGZcIlxuICAgICAgfSk7XG5cbiAgICAgIGxldCBjb250ZW50VHlwZUhlYWRlcjtcblxuICAgICAgaWYgKHV0aWxzJDEuaXNGb3JtRGF0YShkYXRhKSAmJiAoY29udGVudFR5cGVIZWFkZXIgPSBfcmVxdWVzdC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoY29udGVudFR5cGVIZWFkZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3JlcXVlc3QuYm9keSkge1xuICAgICAgICBkYXRhID0gdHJhY2tTdHJlYW0oX3JlcXVlc3QuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBmZXRjaFByb2dyZXNzRGVjb3JhdG9yKFxuICAgICAgICAgIHJlcXVlc3RDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uVXBsb2FkUHJvZ3Jlc3MpXG4gICAgICAgICksIG51bGwsIGVuY29kZVRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdXRpbHMkMS5pc1N0cmluZyh3aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICB3aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHMgPyAnY29ycycgOiAnb21pdCc7XG4gICAgfVxuXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgLi4uZmV0Y2hPcHRpb25zLFxuICAgICAgc2lnbmFsOiBjb21wb3NlZFNpZ25hbCxcbiAgICAgIG1ldGhvZDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLm5vcm1hbGl6ZSgpLnRvSlNPTigpLFxuICAgICAgYm9keTogZGF0YSxcbiAgICAgIGR1cGxleDogXCJoYWxmXCIsXG4gICAgICB3aXRoQ3JlZGVudGlhbHNcbiAgICB9KTtcblxuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3QpO1xuXG4gICAgY29uc3QgaXNTdHJlYW1SZXNwb25zZSA9IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKHJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScgfHwgcmVzcG9uc2VUeXBlID09PSAncmVzcG9uc2UnKTtcblxuICAgIGlmIChzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChvbkRvd25sb2FkUHJvZ3Jlc3MgfHwgaXNTdHJlYW1SZXNwb25zZSkpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcblxuICAgICAgWydzdGF0dXMnLCAnc3RhdHVzVGV4dCcsICdoZWFkZXJzJ10uZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgb3B0aW9uc1twcm9wXSA9IHJlc3BvbnNlW3Byb3BdO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlQ29udGVudExlbmd0aCA9IHV0aWxzJDEudG9GaW5pdGVOdW1iZXIocmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtbGVuZ3RoJykpO1xuXG4gICAgICByZXNwb25zZSA9IG5ldyBSZXNwb25zZShcbiAgICAgICAgdHJhY2tTdHJlYW0ocmVzcG9uc2UuYm9keSwgREVGQVVMVF9DSFVOS19TSVpFLCBvbkRvd25sb2FkUHJvZ3Jlc3MgJiYgZmV0Y2hQcm9ncmVzc0RlY29yYXRvcihcbiAgICAgICAgICByZXNwb25zZUNvbnRlbnRMZW5ndGgsXG4gICAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25Eb3dubG9hZFByb2dyZXNzLCB0cnVlKVxuICAgICAgICApLCBpc1N0cmVhbVJlc3BvbnNlICYmIG9uRmluaXNoLCBlbmNvZGVUZXh0KSxcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGUgfHwgJ3RleHQnO1xuXG4gICAgbGV0IHJlc3BvbnNlRGF0YSA9IGF3YWl0IHJlc29sdmVyc1t1dGlscyQxLmZpbmRLZXkocmVzb2x2ZXJzLCByZXNwb25zZVR5cGUpIHx8ICd0ZXh0J10ocmVzcG9uc2UsIGNvbmZpZyk7XG5cbiAgICAhaXNTdHJlYW1SZXNwb25zZSAmJiBvbkZpbmlzaCgpO1xuXG4gICAgc3RvcFRpbWVvdXQgJiYgc3RvcFRpbWVvdXQoKTtcblxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgaGVhZGVyczogQXhpb3NIZWFkZXJzJDEuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfSk7XG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgb25GaW5pc2goKTtcblxuICAgIGlmIChlcnIgJiYgZXJyLm5hbWUgPT09ICdUeXBlRXJyb3InICYmIC9mZXRjaC9pLnRlc3QoZXJyLm1lc3NhZ2UpKSB7XG4gICAgICB0aHJvdyBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIGNvbmZpZywgcmVxdWVzdCksXG4gICAgICAgIHtcbiAgICAgICAgICBjYXVzZTogZXJyLmNhdXNlIHx8IGVyclxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgdGhyb3cgQXhpb3NFcnJvci5mcm9tKGVyciwgZXJyICYmIGVyci5jb2RlLCBjb25maWcsIHJlcXVlc3QpO1xuICB9XG59KTtcblxuY29uc3Qga25vd25BZGFwdGVycyA9IHtcbiAgaHR0cDogaHR0cEFkYXB0ZXIsXG4gIHhocjogeGhyQWRhcHRlcixcbiAgZmV0Y2g6IGZldGNoQWRhcHRlclxufTtcblxudXRpbHMkMS5mb3JFYWNoKGtub3duQWRhcHRlcnMsIChmbiwgdmFsdWUpID0+IHtcbiAgaWYgKGZuKSB7XG4gICAgdHJ5IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgJ25hbWUnLCB7dmFsdWV9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnYWRhcHRlck5hbWUnLCB7dmFsdWV9KTtcbiAgfVxufSk7XG5cbmNvbnN0IHJlbmRlclJlYXNvbiA9IChyZWFzb24pID0+IGAtICR7cmVhc29ufWA7XG5cbmNvbnN0IGlzUmVzb2x2ZWRIYW5kbGUgPSAoYWRhcHRlcikgPT4gdXRpbHMkMS5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbnZhciBhZGFwdGVycyA9IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscyQxLmlzQXJyYXkoYWRhcHRlcnMpID8gYWRhcHRlcnMgOiBbYWRhcHRlcnNdO1xuXG4gICAgY29uc3Qge2xlbmd0aH0gPSBhZGFwdGVycztcbiAgICBsZXQgbmFtZU9yQWRhcHRlcjtcbiAgICBsZXQgYWRhcHRlcjtcblxuICAgIGNvbnN0IHJlamVjdGVkUmVhc29ucyA9IHt9O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbmFtZU9yQWRhcHRlciA9IGFkYXB0ZXJzW2ldO1xuICAgICAgbGV0IGlkO1xuXG4gICAgICBhZGFwdGVyID0gbmFtZU9yQWRhcHRlcjtcblxuICAgICAgaWYgKCFpc1Jlc29sdmVkSGFuZGxlKG5hbWVPckFkYXB0ZXIpKSB7XG4gICAgICAgIGFkYXB0ZXIgPSBrbm93bkFkYXB0ZXJzWyhpZCA9IFN0cmluZyhuYW1lT3JBZGFwdGVyKSkudG9Mb3dlckNhc2UoKV07XG5cbiAgICAgICAgaWYgKGFkYXB0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBVbmtub3duIGFkYXB0ZXIgJyR7aWR9J2ApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChhZGFwdGVyKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZWplY3RlZFJlYXNvbnNbaWQgfHwgJyMnICsgaV0gPSBhZGFwdGVyO1xuICAgIH1cblxuICAgIGlmICghYWRhcHRlcikge1xuXG4gICAgICBjb25zdCByZWFzb25zID0gT2JqZWN0LmVudHJpZXMocmVqZWN0ZWRSZWFzb25zKVxuICAgICAgICAubWFwKChbaWQsIHN0YXRlXSkgPT4gYGFkYXB0ZXIgJHtpZH0gYCArXG4gICAgICAgICAgKHN0YXRlID09PSBmYWxzZSA/ICdpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudCcgOiAnaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnVpbGQnKVxuICAgICAgICApO1xuXG4gICAgICBsZXQgcyA9IGxlbmd0aCA/XG4gICAgICAgIChyZWFzb25zLmxlbmd0aCA+IDEgPyAnc2luY2UgOlxcbicgKyByZWFzb25zLm1hcChyZW5kZXJSZWFzb24pLmpvaW4oJ1xcbicpIDogJyAnICsgcmVuZGVyUmVhc29uKHJlYXNvbnNbMF0pKSA6XG4gICAgICAgICdhcyBubyBhZGFwdGVyIHNwZWNpZmllZCc7XG5cbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBgVGhlcmUgaXMgbm8gc3VpdGFibGUgYWRhcHRlciB0byBkaXNwYXRjaCB0aGUgcmVxdWVzdCBgICsgcyxcbiAgICAgICAgJ0VSUl9OT1RfU1VQUE9SVCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkYXB0ZXI7XG4gIH0sXG4gIGFkYXB0ZXJzOiBrbm93bkFkYXB0ZXJzXG59O1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbmZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShjb25maWcuaGVhZGVycyk7XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICBpZiAoWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgIT09IC0xKSB7XG4gICAgY29uZmlnLmhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IGFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyKGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzJDEuYWRhcHRlcik7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICBjb25maWcsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UsXG4gICAgICByZXNwb25zZVxuICAgICk7XG5cbiAgICByZXNwb25zZS5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShyZXNwb25zZS5oZWFkZXJzKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59XG5cbmNvbnN0IFZFUlNJT04gPSBcIjEuNy4yXCI7XG5cbmNvbnN0IHZhbGlkYXRvcnMkMSA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9ycyQxW3R5cGVdID0gZnVuY3Rpb24gdmFsaWRhdG9yKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gdHlwZSB8fCAnYScgKyAoaSA8IDEgPyAnbiAnIDogJyAnKSArIHR5cGU7XG4gIH07XG59KTtcblxuY29uc3QgZGVwcmVjYXRlZFdhcm5pbmdzID0ge307XG5cbi8qKlxuICogVHJhbnNpdGlvbmFsIG9wdGlvbiB2YWxpZGF0b3JcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufGJvb2xlYW4/fSB2YWxpZGF0b3IgLSBzZXQgdG8gZmFsc2UgaWYgdGhlIHRyYW5zaXRpb25hbCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZFxuICogQHBhcmFtIHtzdHJpbmc/fSB2ZXJzaW9uIC0gZGVwcmVjYXRlZCB2ZXJzaW9uIC8gcmVtb3ZlZCBzaW5jZSB2ZXJzaW9uXG4gKiBAcGFyYW0ge3N0cmluZz99IG1lc3NhZ2UgLSBzb21lIG1lc3NhZ2Ugd2l0aCBhZGRpdGlvbmFsIGluZm9cbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMkMS50cmFuc2l0aW9uYWwgPSBmdW5jdGlvbiB0cmFuc2l0aW9uYWwodmFsaWRhdG9yLCB2ZXJzaW9uLCBtZXNzYWdlKSB7XG4gIGZ1bmN0aW9uIGZvcm1hdE1lc3NhZ2Uob3B0LCBkZXNjKSB7XG4gICAgcmV0dXJuICdbQXhpb3MgdicgKyBWRVJTSU9OICsgJ10gVHJhbnNpdGlvbmFsIG9wdGlvbiBcXCcnICsgb3B0ICsgJ1xcJycgKyBkZXNjICsgKG1lc3NhZ2UgPyAnLiAnICsgbWVzc2FnZSA6ICcnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gIHJldHVybiAodmFsdWUsIG9wdCwgb3B0cykgPT4ge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IHNjaGVtYVxuICogQHBhcmFtIHtib29sZWFuP30gYWxsb3dVbmtub3duXG4gKlxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBjb25zdCBvcHQgPSBrZXlzW2ldO1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IHNjaGVtYVtvcHRdO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1tvcHRdO1xuICAgICAgY29uc3QgcmVzdWx0ID0gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWxpZGF0b3IodmFsdWUsIG9wdCwgb3B0aW9ucyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb24gJyArIG9wdCArICcgbXVzdCBiZSAnICsgcmVzdWx0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OX1ZBTFVFKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYWxsb3dVbmtub3duICE9PSB0cnVlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignVW5rbm93biBvcHRpb24gJyArIG9wdCwgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTik7XG4gICAgfVxuICB9XG59XG5cbnZhciB2YWxpZGF0b3IgPSB7XG4gIGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnMkMVxufTtcblxuY29uc3QgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5jbGFzcyBBeGlvcyB7XG4gIGNvbnN0cnVjdG9yKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlciQxKCksXG4gICAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlciQxKClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGNvbmZpZ09yVXJsIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAgICogQHBhcmFtIHs/T2JqZWN0fSBjb25maWdcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGxldCBkdW1teTtcblxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA/IEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGR1bW15ID0ge30pIDogKGR1bW15ID0gbmV3IEVycm9yKCkpO1xuXG4gICAgICAgIC8vIHNsaWNlIG9mZiB0aGUgRXJyb3I6IC4uLiBsaW5lXG4gICAgICAgIGNvbnN0IHN0YWNrID0gZHVtbXkuc3RhY2sgPyBkdW1teS5zdGFjay5yZXBsYWNlKC9eLitcXG4vLCAnJykgOiAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIWVyci5zdGFjaykge1xuICAgICAgICAgICAgZXJyLnN0YWNrID0gc3RhY2s7XG4gICAgICAgICAgICAvLyBtYXRjaCB3aXRob3V0IHRoZSAyIHRvcCBzdGFjayBsaW5lc1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhY2sgJiYgIVN0cmluZyhlcnIuc3RhY2spLmVuZHNXaXRoKHN0YWNrLnJlcGxhY2UoL14uK1xcbi4rXFxuLywgJycpKSkge1xuICAgICAgICAgICAgZXJyLnN0YWNrICs9ICdcXG4nICsgc3RhY2s7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaWdub3JlIHRoZSBjYXNlIHdoZXJlIFwic3RhY2tcIiBpcyBhbiB1bi13cml0YWJsZSBwcm9wZXJ0eVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBfcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICAgIGlmICh0eXBlb2YgY29uZmlnT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICAgIH1cblxuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBjb25zdCB7dHJhbnNpdGlvbmFsLCBwYXJhbXNTZXJpYWxpemVyLCBoZWFkZXJzfSA9IGNvbmZpZztcblxuICAgIGlmICh0cmFuc2l0aW9uYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnModHJhbnNpdGlvbmFsLCB7XG4gICAgICAgIHNpbGVudEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBmb3JjZWRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgY2xhcmlmeVRpbWVvdXRFcnJvcjogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKVxuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXNTZXJpYWxpemVyICE9IG51bGwpIHtcbiAgICAgIGlmICh1dGlscyQxLmlzRnVuY3Rpb24ocGFyYW1zU2VyaWFsaXplcikpIHtcbiAgICAgICAgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIgPSB7XG4gICAgICAgICAgc2VyaWFsaXplOiBwYXJhbXNTZXJpYWxpemVyXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhwYXJhbXNTZXJpYWxpemVyLCB7XG4gICAgICAgICAgZW5jb2RlOiB2YWxpZGF0b3JzLmZ1bmN0aW9uLFxuICAgICAgICAgIHNlcmlhbGl6ZTogdmFsaWRhdG9ycy5mdW5jdGlvblxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICAgIGNvbmZpZy5tZXRob2QgPSAoY29uZmlnLm1ldGhvZCB8fCB0aGlzLmRlZmF1bHRzLm1ldGhvZCB8fCAnZ2V0JykudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICAgIGxldCBjb250ZXh0SGVhZGVycyA9IGhlYWRlcnMgJiYgdXRpbHMkMS5tZXJnZShcbiAgICAgIGhlYWRlcnMuY29tbW9uLFxuICAgICAgaGVhZGVyc1tjb25maWcubWV0aG9kXVxuICAgICk7XG5cbiAgICBoZWFkZXJzICYmIHV0aWxzJDEuZm9yRWFjaChcbiAgICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgICAgKG1ldGhvZCkgPT4ge1xuICAgICAgICBkZWxldGUgaGVhZGVyc1ttZXRob2RdO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25maWcuaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmNvbmNhdChjb250ZXh0SGVhZGVycywgaGVhZGVycyk7XG5cbiAgICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gICAgY29uc3QgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICBsZXQgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgbGV0IHByb21pc2U7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsZW47XG5cbiAgICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgICAgY29uc3QgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LmJpbmQodGhpcyksIHVuZGVmaW5lZF07XG4gICAgICBjaGFpbi51bnNoaWZ0LmFwcGx5KGNoYWluLCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBjaGFpbi5wdXNoLmFwcGx5KGNoYWluLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgbGVuID0gY2hhaW4ubGVuZ3RoO1xuXG4gICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW5baSsrXSwgY2hhaW5baSsrXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIGxlbiA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIGxldCBuZXdDb25maWcgPSBjb25maWc7XG5cbiAgICBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuICB9XG59XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMkMS5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzJDEuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cblxuICBmdW5jdGlvbiBnZW5lcmF0ZUhUVFBNZXRob2QoaXNGb3JtKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGh0dHBNZXRob2QodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogaXNGb3JtID8ge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcbiAgICAgICAgfSA6IHt9LFxuICAgICAgICB1cmwsXG4gICAgICAgIGRhdGFcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9XG5cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBnZW5lcmF0ZUhUVFBNZXRob2QoKTtcblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kICsgJ0Zvcm0nXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCh0cnVlKTtcbn0pO1xuXG52YXIgQXhpb3MkMSA9IEF4aW9zO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtDYW5jZWxUb2tlbn1cbiAqL1xuY2xhc3MgQ2FuY2VsVG9rZW4ge1xuICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZVByb21pc2U7XG5cbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9rZW4gPSB0aGlzO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbihjYW5jZWwgPT4ge1xuICAgICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICAgIGxldCBpID0gdG9rZW4uX2xpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICAgIHRva2VuLl9saXN0ZW5lcnNbaV0oY2FuY2VsKTtcbiAgICAgIH1cbiAgICAgIHRva2VuLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICB0aGlzLnByb21pc2UudGhlbiA9IG9uZnVsZmlsbGVkID0+IHtcbiAgICAgIGxldCBfcmVzb2x2ZTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHRva2VuLnN1YnNjcmliZShyZXNvbHZlKTtcbiAgICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgfSkudGhlbihvbmZ1bGZpbGxlZCk7XG5cbiAgICAgIHByb21pc2UuY2FuY2VsID0gZnVuY3Rpb24gcmVqZWN0KCkge1xuICAgICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuXG4gICAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAgICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsZWRFcnJvcihtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAgICovXG4gIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgbGlzdGVuZXIodGhpcy5yZWFzb24pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW2xpc3RlbmVyXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmUgZnJvbSB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gICAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gICAqL1xuICBzdGF0aWMgc291cmNlKCkge1xuICAgIGxldCBjYW5jZWw7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgICAgY2FuY2VsID0gYztcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9rZW4sXG4gICAgICBjYW5jZWxcbiAgICB9O1xuICB9XG59XG5cbnZhciBDYW5jZWxUb2tlbiQxID0gQ2FuY2VsVG9rZW47XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMkMS5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufVxuXG5jb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxufTtcblxuT2JqZWN0LmVudHJpZXMoSHR0cFN0YXR1c0NvZGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICBIdHRwU3RhdHVzQ29kZVt2YWx1ZV0gPSBrZXk7XG59KTtcblxudmFyIEh0dHBTdGF0dXNDb2RlJDEgPSBIdHRwU3RhdHVzQ29kZTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm5zIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICBjb25zdCBjb250ZXh0ID0gbmV3IEF4aW9zJDEoZGVmYXVsdENvbmZpZyk7XG4gIGNvbnN0IGluc3RhbmNlID0gYmluZChBeGlvcyQxLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscyQxLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MkMS5wcm90b3R5cGUsIGNvbnRleHQsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzJDEuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMkMSk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcyQxO1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbGVkRXJyb3IgPSBDYW5jZWxlZEVycm9yO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSBDYW5jZWxUb2tlbiQxO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycyQxO1xuXG5heGlvcy5mb3JtVG9KU09OID0gdGhpbmcgPT4gZm9ybURhdGFUb0pTT04odXRpbHMkMS5pc0hUTUxGb3JtKHRoaW5nKSA/IG5ldyBGb3JtRGF0YSh0aGluZykgOiB0aGluZyk7XG5cbmF4aW9zLmdldEFkYXB0ZXIgPSBhZGFwdGVycy5nZXRBZGFwdGVyO1xuXG5heGlvcy5IdHRwU3RhdHVzQ29kZSA9IEh0dHBTdGF0dXNDb2RlJDE7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF4aW9zLmNqcy5tYXBcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbGliL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIkRvbWFpbiIsImRhdGEiLCJyZWNlaXZpbmciLCJzZW5kaW5nIiwibmFtZSIsInJlcXVpcmVfdGxzIiwic2tpcF92ZXJpZmljYXRpb24iLCJzdGF0ZSIsIndpbGRjYXJkIiwic3BhbV9hY3Rpb24iLCJjcmVhdGVkX2F0Iiwic210cF9wYXNzd29yZCIsInNtdHBfbG9naW4iLCJ0eXBlIiwicmVjZWl2aW5nX2Ruc19yZWNvcmRzIiwic2VuZGluZ19kbnNfcmVjb3JkcyIsImR5bmFtaWNLZXlzIiwiZHluYW1pY1Byb3BlcnRpZXMiLCJyZWR1Y2UiLCJhY2MiLCJwcm9wZXJ0eU5hbWUiLCJwcm9wIiwiT2JqZWN0IiwiYXNzaWduIiwidXJsX2pvaW5fMSIsIl9faW1wb3J0RGVmYXVsdCIsInJlcXVpcmUiLCJFcnJvcl8xIiwiZG9tYWluXzEiLCJEb21haW5zQ2xpZW50IiwicmVxdWVzdCIsImRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IiwiZG9tYWluVGVtcGxhdGVzQ2xpZW50IiwiZG9tYWluVGFnc0NsaWVudCIsImRvbWFpbkNyZWRlbnRpYWxzIiwiZG9tYWluVGVtcGxhdGVzIiwiZG9tYWluVGFncyIsInByb3RvdHlwZSIsIl9oYW5kbGVCb29sVmFsdWVzIiwicHJvcHNGb3JSZXBsYWNlbWVudCIsInJlcGxhY2VkUHJvcHMiLCJrZXlzIiwia2V5IiwidmFsdWUiLCJ0b1N0cmluZyIsIl9fYXNzaWduIiwiX3BhcnNlTWVzc2FnZSIsInJlc3BvbnNlIiwiYm9keSIsInBhcnNlRG9tYWluTGlzdCIsIml0ZW1zIiwibWFwIiwiaXRlbSIsImRlZmF1bHQiLCJfcGFyc2VEb21haW4iLCJkb21haW4iLCJfcGFyc2VUcmFja2luZ1NldHRpbmdzIiwidHJhY2tpbmciLCJfcGFyc2VUcmFja2luZ1VwZGF0ZSIsImxpc3QiLCJxdWVyeSIsIl90aGlzIiwiZ2V0IiwidGhlbiIsInJlcyIsImNvbmNhdCIsImNyZWF0ZSIsInBvc3RPYmoiLCJwb3N0V2l0aEZEIiwidXBkYXRlIiwicHV0RGF0YSIsInB1dFdpdGhGRCIsInZlcmlmeSIsInB1dCIsImRlc3Ryb3kiLCJkZWxldGUiLCJnZXRDb25uZWN0aW9uIiwiY29ubmVjdGlvbiIsInVwZGF0ZUNvbm5lY3Rpb24iLCJnZXRUcmFja2luZyIsInVwZGF0ZVRyYWNraW5nIiwiYWN0aXZlIiwiZ2V0VXNlckRhdGFFcnJvciIsImdldElwcyIsIl9hIiwiYXNzaWduSXAiLCJpcCIsImRlbGV0ZUlwIiwibGlua0lwUG9vbCIsInBvb2xJZCIsInBvb2xfaWQiLCJ1bmxpbmtJcFBvbGwiLCJyZXBsYWNlbWVudCIsInNlYXJjaFBhcmFtcyIsInVwZGF0ZURLSU1BdXRob3JpdHkiLCJzZWxmIiwidXBkYXRlREtJTVNlbGVjdG9yIiwiZGtpbVNlbGVjdG9yIiwidXBkYXRlV2ViUHJlZml4Iiwid2ViUHJlZml4IiwiRG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJiYXNlUm91dGUiLCJfcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QiLCJ0b3RhbENvdW50IiwidG90YWxfY291bnQiLCJfcGFyc2VNZXNzYWdlUmVzcG9uc2UiLCJyZXN1bHQiLCJzdGF0dXMiLCJtZXNzYWdlIiwiX3BhcnNlRGVsZXRlZFJlc3BvbnNlIiwic3BlYyIsImNyZWRlbnRpYWxzTG9naW4iLCJOYXZpZ2F0aW9uVGhydVBhZ2VzXzEiLCJEb21haW5UYWciLCJ0YWdJbmZvIiwidGFnIiwiZGVzY3JpcHRpb24iLCJEYXRlIiwiZXhwb3J0cyIsIkRvbWFpblRhZ1N0YXRpc3RpYyIsInRhZ1N0YXRpc3RpY0luZm8iLCJzdGFydCIsImVuZCIsInJlc29sdXRpb24iLCJzdGF0cyIsInN0YXQiLCJ0aW1lIiwiRG9tYWluVGFnc0NsaWVudCIsIl9zdXBlciIsIl9fZXh0ZW5kcyIsImNhbGwiLCJwYXJzZUxpc3QiLCJwYWdlcyIsInBhcnNlUGFnZUxpbmtzIiwiX3BhcnNlVGFnU3RhdGlzdGljIiwicmVxdWVzdExpc3RXaXRoUGFnZXMiLCJzdGF0aXN0aWMiLCJjb3VudHJpZXMiLCJwcm92aWRlcnMiLCJkZXZpY2VzIiwiRG9tYWluVGVtcGxhdGVJdGVtIiwiZG9tYWluVGVtcGxhdGVGcm9tQVBJIiwiY3JlYXRlZEF0IiwiY3JlYXRlZEJ5IiwiaWQiLCJ2ZXJzaW9uIiwidmVyc2lvbnMiLCJsZW5ndGgiLCJEb21haW5UZW1wbGF0ZXNDbGllbnQiLCJwYXJzZUNyZWF0aW9uUmVzcG9uc2UiLCJ0ZW1wbGF0ZSIsInBhcnNlQ3JlYXRpb25WZXJzaW9uUmVzcG9uc2UiLCJwYXJzZU11dGF0aW9uUmVzcG9uc2UiLCJ0ZW1wbGF0ZU5hbWUiLCJwYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlIiwicGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZSIsInRlbXBsYXRlVmVyc2lvbiIsImQiLCJwYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zIiwiZGVzdHJveUFsbCIsImNyZWF0ZVZlcnNpb24iLCJnZXRWZXJzaW9uIiwidXBkYXRlVmVyc2lvbiIsImRlc3Ryb3lWZXJzaW9uIiwibGlzdFZlcnNpb25zIiwiRXZlbnRDbGllbnQiLCJJcFBvb2xzQ2xpZW50IiwicGFyc2VJcFBvb2xzUmVzcG9uc2UiLCJzZW50IiwicGF0Y2hXaXRoRkQiLCJJcHNDbGllbnQiLCJwYXJzZUlwc1Jlc3BvbnNlIiwiSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCIsInBhdGgiLCJhdHRyaWJ1dGVOYW1lIiwiSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCIsInN1cHBvcnRlZF9maWx0ZXJzIiwiSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCIsImF0dHJpYnV0ZXMiLCJmaWx0ZXJzIiwic2hhcmluZyIsImxvZ2dlciIsImNvbnNvbGUiLCJjb252ZXJ0RGF0ZVRvVVRDIiwiaW5wdXREYXRlIiwid2FybiIsInRvSVNPU3RyaW5nIiwicHJlcGFyZVF1ZXJ5RGF0YSIsInF1ZXJ5RGF0YSIsInByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQiLCJib3giLCJoYW5kbGVkU2VlZExpc3REYXRlcyIsInVwZGF0ZWRfYXQiLCJzaGFyaW5nX2V4cGlyZXNfYXQiLCJCb3giLCJsYXN0X3Jlc3VsdF9hdCIsIklEIiwiaW5ib3hQbGFjZW1lbnRzUmVzdWx0IiwiSWQiLCJpbmJveFBsYWNlbWVudFJlc3VsdCIsImdldFJlc3VsdEJ5U2hhcmVJZCIsInNoYXJlSWQiLCJJUFJTaGFyaW5nQ2xpZW50IiwicHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmciLCJleHBpcmVzX2F0IiwiZW5hYmxlZCIsIlNlZWRzTGlzdHNDbGllbnQiLCJwcmVwYXJlUmVzdWx0Iiwic2VlZExpc3QiLCJwcmVwYXJlU2VlZExpc3QiLCJzZWVkcyIsIlNlZWRzIiwic2VlZEl0ZW0iLCJzZWVkIiwiaGFuZGxlZFNlZWREYXRlcyIsIm1heF9lbWFpbF9jb3VudF9oaXRfYXQiLCJsYXN0X3NlbnRfdG9fYXQiLCJsYXN0X2RlbGl2ZXJlZF9hdCIsInVwZGF0ZWRTZWVkc0xpc3QiLCJzZWVkbGlzdCIsIkluYm94UGxhY2VtZW50c0NsaWVudCIsInNlZWRzTGlzdHNDbGllbnQiLCJyZXN1bHRzIiwic2VlZHNMaXN0cyIsInJ1blRlc3QiLCJwb3N0IiwiSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IiwiaGFuZGxlZFByb3ZpZGVyRGF0ZXMiLCJSZXF1ZXN0XzEiLCJkb21haW5zQ2xpZW50XzEiLCJFdmVudHNfMSIsIlN0YXRzQ2xpZW50XzEiLCJTdXBwcmVzc2lvbnNDbGllbnRfMSIsIldlYmhvb2tzXzEiLCJNZXNzYWdlc18xIiwiUm91dGVzXzEiLCJ2YWxpZGF0ZV8xIiwiSVBzXzEiLCJJUFBvb2xzXzEiLCJtYWlsaW5nTGlzdHNfMSIsIm1haWxMaXN0TWVtYmVyc18xIiwiZG9tYWluc0NyZWRlbnRpYWxzXzEiLCJtdWx0aXBsZVZhbGlkYXRpb25fMSIsImRvbWFpbnNUZW1wbGF0ZXNfMSIsImRvbWFpbnNUYWdzXzEiLCJTdWJhY2NvdW50c18xIiwiU2VlZHNMaXN0c0NsaWVudF8xIiwiaW5ib3hQbGFjZW1lbnRzXzEiLCJJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50XzEiLCJBdHRyaWJ1dGVzQ2xpZW50XzEiLCJGaWx0ZXJzQ2xpZW50XzEiLCJJbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudF8xIiwiSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzXzEiLCJNYWlsZ3VuQ2xpZW50Iiwib3B0aW9ucyIsImZvcm1EYXRhIiwiY29uZmlnIiwidXJsIiwidXNlcm5hbWUiLCJFcnJvciIsIm1haWxMaXN0c01lbWJlcnMiLCJtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJJbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZ0NsaWVudCIsInNlZWRzTGlzdHNBdHRyaWJ1dGVzIiwicmVzdWx0c0F0dHJpYnV0ZXNDbGllbnQiLCJzZWVkc0xpc3RzRmlsdGVyc0NsaWVudCIsInJlc3VsdHNGaWx0ZXJzQ2xpZW50IiwiaW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCIsImluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCIsImRvbWFpbnMiLCJ3ZWJob29rcyIsImV2ZW50cyIsInN1cHByZXNzaW9ucyIsIm1lc3NhZ2VzIiwicm91dGVzIiwiaXBzIiwiaXBfcG9vbHMiLCJsaXN0cyIsInZhbGlkYXRlIiwic3ViYWNjb3VudHMiLCJpbmJveF9wbGFjZW1lbnRzIiwic2V0U3ViYWNjb3VudCIsInN1YmFjY291bnRJZCIsInNldFN1YmFjY291bnRIZWFkZXIiLCJyZXNldFN1YmFjY291bnQiLCJyZXNldFN1YmFjY291bnRIZWFkZXIiLCJNYWlsTGlzdHNNZW1iZXJzIiwiY2hlY2tBbmRVcGRhdGVEYXRhIiwibmV3RGF0YSIsInZhcnMiLCJKU09OIiwic3RyaW5naWZ5Iiwic3Vic2NyaWJlZCIsImxpc3RNZW1iZXJzIiwibWFpbExpc3RBZGRyZXNzIiwiZ2V0TWVtYmVyIiwibWFpbExpc3RNZW1iZXJBZGRyZXNzIiwibWVtYmVyIiwiY3JlYXRlTWVtYmVyIiwicmVxRGF0YSIsImNyZWF0ZU1lbWJlcnMiLCJtZW1iZXJzIiwiQXJyYXkiLCJpc0FycmF5IiwidXBzZXJ0IiwidXBkYXRlTWVtYmVyIiwiZGVzdHJveU1lbWJlciIsIk1haWxpbmdMaXN0c0NsaWVudCIsInBhcnNlVmFsaWRhdGlvblJlc3VsdCIsInZhbGlkYXRpb25SZXN1bHQiLCJjYW5jZWxWYWxpZGF0aW9uIiwiTWVzc2FnZXNDbGllbnQiLCJwcmVwYXJlQm9vbGVhblZhbHVlcyIsInllc05vUHJvcGVydGllcyIsIlNldCIsImhhcyIsIl9wYXJzZVJlc3BvbnNlIiwibW9kaWZpZWREYXRhIiwiUm91dGVzQ2xpZW50Iiwicm91dGUiLCJTdGF0c0NvbnRhaW5lcl8xIiwiU3RhdHNDbGllbnQiLCJ0b1VUQ1N0cmluZyIsInByZXBhcmVTZWFyY2hQYXJhbXMiLCJlbnRyaWVzIiwiYXJyYXlXaXRoUGFpcnMiLCJjdXJyZW50UGFpciIsInJlcGVhdGVkUHJvcGVydHkiLCJfX3NwcmVhZEFycmF5IiwicHVzaCIsInBhcnNlU3RhdHMiLCJnZXREb21haW4iLCJnZXRBY2NvdW50IiwiU3RhdHNDb250YWluZXIiLCJTdWJhY2NvdW50c0NsaWVudCIsImVuYWJsZSIsImRpc2FibGUiLCJTVUJBQ0NPVU5UX0hFQURFUiIsIkVudW1zXzEiLCJTdXBwcmVzc2lvbl8xIiwiQm91bmNlIiwiU3VwcHJlc3Npb25Nb2RlbHMiLCJCT1VOQ0VTIiwiYWRkcmVzcyIsImNvZGUiLCJlcnJvciIsIkNvbXBsYWludCIsIkNPTVBMQUlOVFMiLCJTdXBwcmVzc2lvbiIsIkJvdW5jZV8xIiwiQ29tcGxhaW50XzEiLCJVbnN1YnNjcmliZV8xIiwiV2hpdGVMaXN0XzEiLCJjcmVhdGVPcHRpb25zIiwiaGVhZGVycyIsIlN1cHByZXNzaW9uQ2xpZW50IiwibW9kZWxzIiwiYm91bmNlcyIsImNvbXBsYWludHMiLCJ1bnN1YnNjcmliZXMiLCJ3aGl0ZWxpc3RzIiwiTW9kZWwiLCJfcGFyc2VJdGVtIiwiY3JlYXRlV2hpdGVMaXN0IiwiaXNEYXRhQXJyYXkiLCJwcmVwYXJlUmVzcG9uc2UiLCJjcmVhdGVVbnN1YnNjcmliZSIsImlzQ29udGFpbnNUYWciLCJzb21lIiwidW5zdWJzY3JpYmUiLCJ0YWdzIiwiZ2V0TW9kZWwiLCJtb2RlbCIsImVuY29kZVVSSUNvbXBvbmVudCIsInBvc3REYXRhIiwibW9kdWxlIiwiVW5zdWJzY3JpYmUiLCJVTlNVQlNDUklCRVMiLCJXaGl0ZUxpc3QiLCJXSElURUxJU1RTIiwicmVhc29uIiwiQXR0YWNobWVudHNIYW5kbGVyXzEiLCJNdWx0aXBsZVZhbGlkYXRpb25Kb2IiLCJyZXNwb25zZVN0YXR1c0NvZGUiLCJxdWFudGl0eSIsInJlY29yZHNQcm9jZXNzZWQiLCJyZWNvcmRzX3Byb2Nlc3NlZCIsImRvd25sb2FkX3VybCIsImRvd25sb2FkVXJsIiwiY3N2IiwianNvbiIsIl9iIiwic3VtbWFyeSIsImNhdGNoQWxsIiwiY2F0Y2hfYWxsIiwiZGVsaXZlcmFibGUiLCJkb05vdFNlbmQiLCJkb19ub3Rfc2VuZCIsInVuZGVsaXZlcmFibGUiLCJ1bmtub3duIiwicmlzayIsImhpZ2giLCJsb3ciLCJtZWRpdW0iLCJNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJhdHRhY2htZW50c0hhbmRsZXIiLCJoYW5kbGVSZXNwb25zZSIsImpvYnMiLCJqb2IiLCJ0b3RhbCIsImxpc3RJZCIsImNvbnZlcnRUb0V4cGVjdGVkU2hhcGUiLCJtdWx0aXBsZVZhbGlkYXRpb25EYXRhIiwiaXNCdWZmZXIiLCJmaWxlIiwibXVsdGlwbGVWYWxpZGF0aW9uRmlsZSIsImlzU3RyZWFtIiwiVmFsaWRhdGVDbGllbnQiLCJtdWx0aXBsZVZhbGlkYXRpb24iLCJXZWJob29rIiwidXJscyIsIldlYmhvb2tzQ2xpZW50IiwiX3BhcnNlV2ViaG9va0xpc3QiLCJfcGFyc2VXZWJob29rV2l0aElEIiwid2ViaG9va1Jlc3BvbnNlIiwid2ViaG9vayIsInVuZGVmaW5lZCIsIl9wYXJzZVdlYmhvb2tUZXN0IiwidGVzdCIsInVybFZhbHVlcyIsIkJsb2JGcm9tU3RyZWFtIiwic3RyZWFtIiwic2l6ZSIsIl9zdHJlYW0iLCJkZWZpbmVQcm9wZXJ0eSIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwiQXR0YWNobWVudHNIYW5kbGVyIiwiZ2V0QXR0YWNobWVudE9wdGlvbnMiLCJmaWxlbmFtZSIsImNvbnRlbnRUeXBlIiwia25vd25MZW5ndGgiLCJnZXRGaWxlSW5mbyIsImdldEN1c3RvbUZpbGVJbmZvIiwiZ2V0QnVmZmVySW5mbyIsImJ1ZmZlciIsImJ5dGVMZW5ndGgiLCJwaXBlIiwiaXNDdXN0b21GaWxlIiwib2JqIiwiaXNCcm93c2VyRmlsZSIsIkJsb2IiLCJCdWZmZXIiLCJnZXRBdHRhY2htZW50SW5mbyIsImF0dGFjaG1lbnQiLCJpc1N0cmluZyIsImNvbnZlcnRUb0ZEZXhwZWN0ZWRTaGFwZSIsInVzZXJQcm92aWRlZFZhbHVlIiwiZ2V0QmxvYkZyb21TdHJlYW0iLCJBUElFcnJvciIsInN0YXR1c1RleHQiLCJib2R5TWVzc2FnZSIsInN0YWNrIiwiZGV0YWlscyIsIkZvcm1EYXRhQnVpbGRlciIsIkZvcm1EYXRhQ29uc3RydWN0b3IiLCJmaWxlS2V5cyIsImNyZWF0ZUZvcm1EYXRhIiwiZmlsdGVyIiwiZm9ybURhdGFBY2MiLCJpbmNsdWRlcyIsImF0dGFjaG1lbnRWYWx1ZSIsImlzTWVzc2FnZUF0dGFjaG1lbnQiLCJhZGRGaWxlc1RvRkQiLCJtZXNzYWdlVmFsdWUiLCJpc01JTUUiLCJhZGRNaW1lRGF0YVRvRkQiLCJhZGRDb21tb25Qcm9wZXJ0eVRvRkQiLCJmb3JtRGF0YUluc3RhbmNlIiwiYXBwZW5kIiwiaXNGb3JtRGF0YVBhY2thZ2UiLCJub2RlRm9ybURhdGEiLCJicm93c2VyRm9ybURhdGEiLCJibG9iSW5zdGFuY2UiLCJSZWFkYWJsZVN0cmVhbSIsImdldEhlYWRlcnMiLCJGaWxlIiwiZXZlcnkiLCJhcHBlbmRGaWxlVG9GRCIsIm9yaWdpbmFsS2V5Iiwib2JqRGF0YSIsImZkIiwiZnJvbSIsImJsb2IiLCJzZXQiLCJmb3JFYWNoIiwiYWRkVmFsdWVCYXNlZE9uRkQiLCJmZEtleSIsImZkVmFsdWUiLCJOYXZpZ2F0aW9uVGhydVBhZ2VzIiwicGFyc2VQYWdlIiwicGFnZVVybCIsInVybFNlcGFyYXRvciIsIml0ZXJhdG9yTmFtZSIsInBhcnNlZFVybCIsIlVSTCIsInBhZ2VWYWx1ZSIsInNwbGl0IiwicG9wIiwiaXRlcmF0b3JQb3NpdGlvbiIsInBhZ2UiLCJwYWdpbmciLCJ1cGRhdGVVcmxBbmRRdWVyeSIsImNsaWVudFVybCIsInF1ZXJ5Q29weSIsInVwZGF0ZWRRdWVyeSIsImJhc2U2NCIsIl9faW1wb3J0U3RhciIsImF4aW9zXzEiLCJGb3JtRGF0YUJ1aWxkZXJfMSIsIlJlcXVlc3QiLCJ0aW1lb3V0IiwibWFrZUhlYWRlcnNGcm9tT2JqZWN0IiwiZm9ybURhdGFCdWlsZGVyIiwibWF4Qm9keUxlbmd0aCIsInByb3h5IiwibWV0aG9kIiwib25DYWxsT3B0aW9ucyIsInJlcXVlc3RIZWFkZXJzIiwiam9pbkFuZFRyYW5zZm9ybUhlYWRlcnMiLCJwYXJhbXMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiVVJMU2VhcmNoUGFyYW1zIiwidXJsVmFsdWUiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsIl9kIiwiZXJyb3JSZXNwb25zZSIsImVycl8xIiwiX2MiLCJnZXRSZXNwb25zZUJvZHkiLCJBeGlvc0hlYWRlcnMiLCJiYXNpYyIsImVuY29kZSIsInNldEF1dGhvcml6YXRpb24iLCJyZWNlaXZlZE9uQ2FsbEhlYWRlcnMiLCJvbkNhbGxIZWFkZXJzIiwiaGVhZGVyc09iamVjdCIsImhlYWRlcnNBY2N1bXVsYXRvciIsImNvbW1hbmQiLCJhZGREZWZhdWx0SGVhZGVycyIsInJlcXVlc3RPcHRpb25zIiwiUmVzb2x1dGlvbiIsIldlYmhvb2tzSWRzIiwiWWVzTm8iLCJfX2V4cG9ydFN0YXIiLCJNYWlsZ3VuQ2xpZW50XzEiLCJFbnVtcyIsIkludGVyZmFjZXMiLCJNYWlsZ3VuIiwiRm9ybURhdGEiLCJjbGllbnQiXSwic291cmNlUm9vdCI6IiJ9