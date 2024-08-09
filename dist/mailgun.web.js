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
            return [2 /*return*/, response.body];
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
    var inboxPlacementsResult = __assign(__assign(__assign({}, data), {
      Box: box
    }), handledSeedListDates);
    delete inboxPlacementsResult.Id;
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
    var data = {};
    data.items = response.body.items.map(function (item) {
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
            return [2 /*return*/, this.parseList(response)];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2QsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsR0FBRztBQUNkO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxHQUFHO0FBQ2Q7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7QUFDZDtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWEsUUFB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QUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscUJBQXFCO0FBQ2hDLFdBQVcscUJBQXFCO0FBQ2hDO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFNBQVM7QUFDcEI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsVUFBVTtBQUN2QixhQUFhLFVBQVU7QUFDdkI7QUFDQSxjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsYUFBYSw0QkFBNEI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsVUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFO0FBQ2hFO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQixtQkFBbUI7QUFDOUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG9EQUFvRCxNQUFNO0FBQzFELG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FB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QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0MsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUyxRQUFROztBQUVqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGFBQWEsYUFBYTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLEtBQUs7QUFDcEQsT0FBTztBQUNQLEdBQUc7QUFDSCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FB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b3VyY2VzIjpbIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW4udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRG9tYWlucy9kb21haW5zQ3JlZGVudGlhbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RhZ3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0RvbWFpbnMvZG9tYWluc1RlbXBsYXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvRXZlbnRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JUFBvb2xzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JUHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9BdHRyaWJ1dGVzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9JbmJveFBsYWNlbWVudHMvRmlsdGVyc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9pbmJveFBsYWNlbWVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NYWlsZ3VuQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NYWlsaW5nTGlzdHMvbWFpbExpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NYWlsaW5nTGlzdHMvbWFpbGluZ0xpc3RzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9NZXNzYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvUm91dGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdGF0cy9TdGF0c0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3RhdHMvU3RhdHNDb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1YmFjY291bnRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvQm91bmNlLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvQ29tcGxhaW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9TdXBwcmVzc2lvbnMvU3VwcHJlc3Npb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbnNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL1N1cHByZXNzaW9ucy9VbnN1YnNjcmliZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvU3VwcHJlc3Npb25zL1doaXRlTGlzdC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvVmFsaWRhdGlvbnMvbXVsdGlwbGVWYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvQ2xhc3Nlcy9WYWxpZGF0aW9ucy92YWxpZGF0ZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvV2ViaG9va3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9BdHRhY2htZW50c0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9FcnJvci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvY29tbW9uL0Zvcm1EYXRhQnVpbGRlci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0NsYXNzZXMvY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9DbGFzc2VzL2NvbW1vbi9SZXF1ZXN0LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvRW51bXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0NvbW1vbi9Mb2dnZXIudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0NvbW1vbi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9Eb21haW5DcmVkZW50aWFscy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9Eb21haW5UYWdzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Eb21haW5zL0RvbWFpblRlbXBsYXRlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvRG9tYWlucy9Eb21haW5zQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9Eb21haW5zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9FdmVudENsaWVudC9JRXZlbnRDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0V2ZW50Q2xpZW50L2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JUFBvb2xzL0lJUFBvb2xzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JUFBvb2xzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JUHMvSUlQc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSVBzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvQXR0cmlidXRlc0NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvSW5ib3hQbGFjZW1lbnRzL0ZpbHRlcnNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9JbmJveFBsYWNlbWVudHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01haWxndW5DbGllbnQvSU1haWxndW5DbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01haWxndW5DbGllbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cy9NYWlsaW5nTGlzdE1lbWJlcnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cy9NYWlsaW5nTGlzdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvTWVzc2FnZXMvSU1lc3NhZ2VzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9NZXNzYWdlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvUm91dGVzL0lSb3V0ZXNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1JvdXRlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3RhdHMvU3RhdHNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N0YXRzL1N0YXRzQ29udGFpbmVyLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdGF0cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3ViYWNjb3VudHMvSVN1YmFjY291bnRzQ2xpZW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9TdWJhY2NvdW50cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zL0JvdW5jZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zL0NvbXBsYWludC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zL0lTdXBwcmVzc2lvbnNDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucy9VbnN1YnNjcmliZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zL1doaXRlTGlzdC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL0ludGVyZmFjZXMvU3VwcHJlc3Npb25zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9WYWxpZGF0aW9ucy9NdWx0aXBsZVZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1ZhbGlkYXRpb25zL1ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1ZhbGlkYXRpb25zL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9XZWJob29rcy9JV2ViSG9va3NDbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9JbnRlcmZhY2VzL1dlYmhvb2tzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvSW50ZXJmYWNlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9BcGlSZXNwb25zZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9FcnJvci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9Gb3JtRGF0YS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvQ29tbW9uL1JlcXVlc3RPcHRpb25zLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvQ29tbW9uL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRG9tYWlucy9Eb21haW5DcmVkZW50aWFscy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWluVGFncy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWluVGVtcGxhdGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRG9tYWlucy9Eb21haW5UcmFja2luZy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvRG9tYWlucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0RvbWFpbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9FdmVudHMvRXZlbnRzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvRXZlbnRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvSVBQb29scy9JcFBvb2xzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvSVBQb29scy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL0lQcy9JUHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9JUHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NYWlsZ3VuQ2xpZW50L01haWxndW5DbGllbnRPcHRpb25zLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWFpbGd1bkNsaWVudC9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL01haWxpbmdMaXN0cy9NYWlsaW5nTGlzdE1lbWJlcnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NYWlsaW5nTGlzdHMvTWFpbGluZ0xpc3RzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWFpbGluZ0xpc3RzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvTWVzc2FnZXMvTWVzc2FnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9NZXNzYWdlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1JvdXRlcy9Sb3V0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9Sb3V0ZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdGF0cy9TdGF0cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N0YXRzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3ViYWNjb3VudHMvU3ViYWNjb3VudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdWJhY2NvdW50cy9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9Cb3VuY2UudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvQ29tcGxhaW50LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvU3VwcHJlc3Npb25zL1N1cHByZXNzaW9ucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9VbnN1YnNjcmliZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1N1cHByZXNzaW9ucy9XaGl0ZUxpc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9TdXBwcmVzc2lvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9WYWxpZGF0aW9ucy9NdWx0aXBsZVZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9WYWxpZGF0aW9ucy9WYWxpZGF0aW9uLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvVmFsaWRhdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9UeXBlcy9XZWJob29rcy9XZWJob29rcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL1R5cGVzL1dlYmhvb2tzL2luZGV4LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvVHlwZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2Jhc2UtNjQvYmFzZTY0LmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYXhpb3MvZGlzdC9icm93c2VyL2F4aW9zLmNqcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEROU1JlY29yZCxcbiAgRG9tYWluRGF0YSxcbiAgRG9tYWluU2hvcnREYXRhLFxuICBURG9tYWluXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbiBpbXBsZW1lbnRzIFREb21haW4ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgc3RhdGU6IHN0cmluZztcbiAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gIHNwYW1fYWN0aW9uOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICBzbXRwX2xvZ2luOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgaWQ/OiBzdHJpbmc7XG4gIGlzX2Rpc2FibGVkPzogYm9vbGVhbjtcbiAgd2ViX3ByZWZpeD86IHN0cmluZztcbiAgd2ViX3NjaGVtZT86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBkYXRhOiBEb21haW5TaG9ydERhdGEgfCBEb21haW5EYXRhLFxuICAgIHJlY2VpdmluZz86IEROU1JlY29yZFtdIHwgbnVsbCxcbiAgICBzZW5kaW5nPzogRE5TUmVjb3JkW10gfCBudWxsXG4gICkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLnJlcXVpcmVfdGxzID0gZGF0YS5yZXF1aXJlX3RscztcbiAgICB0aGlzLnNraXBfdmVyaWZpY2F0aW9uID0gZGF0YS5za2lwX3ZlcmlmaWNhdGlvbjtcbiAgICB0aGlzLnN0YXRlID0gZGF0YS5zdGF0ZTtcbiAgICB0aGlzLndpbGRjYXJkID0gZGF0YS53aWxkY2FyZDtcbiAgICB0aGlzLnNwYW1fYWN0aW9uID0gZGF0YS5zcGFtX2FjdGlvbjtcbiAgICB0aGlzLmNyZWF0ZWRfYXQgPSBkYXRhLmNyZWF0ZWRfYXQ7XG4gICAgdGhpcy5zbXRwX3Bhc3N3b3JkID0gZGF0YS5zbXRwX3Bhc3N3b3JkO1xuICAgIHRoaXMuc210cF9sb2dpbiA9IGRhdGEuc210cF9sb2dpbjtcbiAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGU7XG4gICAgdGhpcy5yZWNlaXZpbmdfZG5zX3JlY29yZHMgPSByZWNlaXZpbmcgfHwgbnVsbDtcbiAgICB0aGlzLnNlbmRpbmdfZG5zX3JlY29yZHMgPSBzZW5kaW5nIHx8IG51bGw7XG4gICAgLypcbiAgICAgIGRvbWFpbiBsaXN0IGhhcyBzaG9ydGVyIHJlc3BvbnNlIHRoZW4gZ2V0LCBjcmVhdGUsIGFuZCB1cGRhdGUgbWV0aG9kcy5cbiAgICAqL1xuXG4gICAgY29uc3QgZHluYW1pY0tleXM6IChrZXlvZiBEb21haW5EYXRhKVtdID0gWydpZCcsICdpc19kaXNhYmxlZCcsICd3ZWJfcHJlZml4JywgJ3dlYl9zY2hlbWUnXTtcblxuICAgIGNvbnN0IGR5bmFtaWNQcm9wZXJ0aWVzID0gZHluYW1pY0tleXMucmVkdWNlKChhY2MsIHByb3BlcnR5TmFtZSkgPT4ge1xuICAgICAgaWYgKHByb3BlcnR5TmFtZSBpbiBkYXRhKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0eU5hbWUgYXMga2V5b2YgRG9tYWluO1xuICAgICAgICBhY2NbcHJvcF0gPSAoZGF0YSBhcyBEb21haW5EYXRhKVtwcm9wZXJ0eU5hbWVdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBSZWNvcmQ8a2V5b2YgRG9tYWluLCBzdHJpbmcgfCBib29sZWFuPik7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkeW5hbWljUHJvcGVydGllcyk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7XG4gIElEb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gIElEb21haW5UYWdzQ2xpZW50LFxuICBJRG9tYWluQ3JlZGVudGlhbHMsXG4gIElEb21haW5zQ2xpZW50XG59IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5cbmltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3InO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9kb21haW5zQ3JlZGVudGlhbHMnO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9kb21haW5zVGFncyc7XG5pbXBvcnQge1xuICBEZXN0cm95ZWREb21haW5SZXNwb25zZSxcbiAgTWVzc2FnZVJlc3BvbnNlLFxuICBEb21haW5MaXN0UmVzcG9uc2VEYXRhLFxuICBEb21haW5SZXNwb25zZURhdGEsXG4gIERvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIERvbWFpblRyYWNraW5nRGF0YSxcbiAgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSxcbiAgVXBkYXRlZE9wZW5UcmFja2luZyxcbiAgRG9tYWluc1F1ZXJ5LFxuICBEb21haW5JbmZvLFxuICBDb25uZWN0aW9uU2V0dGluZ3MsXG4gIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlLFxuICBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzLFxuICBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFJlcGxhY2VtZW50Rm9yUG9vbCxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlLFxuICBES0lNU2VsZWN0b3JJbmZvLFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFdlYlByZWZpeEluZm8sXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgVERvbWFpbixcbiAgRG9tYWluVXBkYXRlSW5mbyxcbiAgRG9tYWluVXBkYXRlSW5mb1JlcSxcbiAgRG9tYWluSW5mb1JlcSxcbiAgQm9vbFRvU3RyaW5nLFxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcbmltcG9ydCBEb21haW4gZnJvbSAnLi9kb21haW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5zQ2xpZW50IGltcGxlbWVudHMgSURvbWFpbnNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgZG9tYWluQ3JlZGVudGlhbHM6IElEb21haW5DcmVkZW50aWFscztcbiAgcHVibGljIGRvbWFpblRlbXBsYXRlczogSURvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgcHVibGljIGRvbWFpblRhZ3M6IElEb21haW5UYWdzQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ6IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50LFxuICAgIGRvbWFpblRlbXBsYXRlc0NsaWVudDogRG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICAgIGRvbWFpblRhZ3NDbGllbnQ6IERvbWFpblRhZ3NDbGllbnRcbiAgKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmRvbWFpbkNyZWRlbnRpYWxzID0gZG9tYWluQ3JlZGVudGlhbHNDbGllbnQ7XG4gICAgdGhpcy5kb21haW5UZW1wbGF0ZXMgPSBkb21haW5UZW1wbGF0ZXNDbGllbnQ7XG4gICAgdGhpcy5kb21haW5UYWdzID0gZG9tYWluVGFnc0NsaWVudDtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUJvb2xWYWx1ZXMoXG4gICAgZGF0YTogRG9tYWluSW5mbyB8IERvbWFpblVwZGF0ZUluZm9cbiAgKTogRG9tYWluSW5mb1JlcSB8IERvbWFpblVwZGF0ZUluZm9SZXEge1xuICAgIGNvbnN0IHByb3BzRm9yUmVwbGFjZW1lbnQgPSBkYXRhIGFzIEJvb2xUb1N0cmluZztcbiAgICBjb25zdCByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IGtleSBhcyBrZXlvZiBCb29sVG9TdHJpbmc7XG4gICAgICBpZiAodHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdib29sZWFuJykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gYXMgYm9vbGVhbjtcbiAgICAgICAgYWNjW3Byb3BdID0gKHZhbHVlLnRvU3RyaW5nKCkgPT09ICd0cnVlJykgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBSZWNvcmQ8a2V5b2YgQm9vbFRvU3RyaW5nLCAndHJ1ZSd8ICdmYWxzZSc+KTtcbiAgICByZXR1cm4geyAuLi5kYXRhLCAuLi5yZXBsYWNlZFByb3BzIH0gYXMgRG9tYWluVXBkYXRlSW5mb1JlcSB8IERvbWFpbkluZm9SZXE7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZU1lc3NhZ2UocmVzcG9uc2U6IERlc3Ryb3llZERvbWFpblJlc3BvbnNlKSA6IE1lc3NhZ2VSZXNwb25zZSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlRG9tYWluTGlzdChyZXNwb25zZTogRG9tYWluTGlzdFJlc3BvbnNlRGF0YSk6IFREb21haW5bXSB7XG4gICAgaWYgKHJlc3BvbnNlLmJvZHkgJiYgcmVzcG9uc2UuYm9keS5pdGVtcykge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBuZXcgRG9tYWluKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluKHJlc3BvbnNlOiBEb21haW5SZXNwb25zZURhdGEpOiBURG9tYWluIHtcbiAgICByZXR1cm4gbmV3IERvbWFpbihcbiAgICAgIHJlc3BvbnNlLmJvZHkuZG9tYWluLFxuICAgICAgcmVzcG9uc2UuYm9keS5yZWNlaXZpbmdfZG5zX3JlY29yZHMsXG4gICAgICByZXNwb25zZS5ib2R5LnNlbmRpbmdfZG5zX3JlY29yZHNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1NldHRpbmdzKHJlc3BvbnNlOiBEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6IERvbWFpblRyYWNraW5nRGF0YSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkudHJhY2tpbmc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRyYWNraW5nVXBkYXRlKHJlc3BvbnNlOiBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6VXBkYXRlZE9wZW5UcmFja2luZyB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogRG9tYWluc1F1ZXJ5KTogUHJvbWlzZTxURG9tYWluW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2RvbWFpbnMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZURvbWFpbkxpc3QocmVzIGFzIERvbWFpbkxpc3RSZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZykgOiBQcm9taXNlPFREb21haW4+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL2RvbWFpbnMvJHtkb21haW59YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IERvbWFpbkluZm8pIDogUHJvbWlzZTxURG9tYWluPiB7XG4gICAgY29uc3QgcG9zdE9iaiA9IHRoaXMuX2hhbmRsZUJvb2xWYWx1ZXMoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvZG9tYWlucycsIHBvc3RPYmopXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgZGF0YTogRG9tYWluVXBkYXRlSW5mbykgOiBQcm9taXNlPFREb21haW4+IHtcbiAgICBjb25zdCBwdXREYXRhID0gdGhpcy5faGFuZGxlQm9vbFZhbHVlcyhkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgL3YzL2RvbWFpbnMvJHtkb21haW59YCwgcHV0RGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgdmVyaWZ5KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxURG9tYWluPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS92ZXJpZnlgKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxNZXNzYWdlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YzL2RvbWFpbnMvJHtkb21haW59YClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlKHJlcyBhcyBEZXN0cm95ZWREb21haW5SZXNwb25zZSkpO1xuICB9XG5cbiAgZ2V0Q29ubmVjdGlvbihkb21haW46IHN0cmluZyk6IFByb21pc2U8Q29ubmVjdGlvblNldHRpbmdzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9jb25uZWN0aW9uYClcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlczpDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSkgPT4gcmVzLmJvZHkuY29ubmVjdGlvbiBhcyBDb25uZWN0aW9uU2V0dGluZ3MpO1xuICB9XG5cbiAgdXBkYXRlQ29ubmVjdGlvbihkb21haW46IHN0cmluZywgZGF0YTogQ29ubmVjdGlvblNldHRpbmdzKTogUHJvbWlzZTxVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9jb25uZWN0aW9uYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMpXG4gICAgICAudGhlbigocmVzOlVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MpO1xuICB9XG5cbiAgLy8gVHJhY2tpbmdcblxuICBnZXRUcmFja2luZyhkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpblRyYWNraW5nRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlVHJhY2tpbmdTZXR0aW5ncyk7XG4gIH1cblxuICB1cGRhdGVUcmFja2luZyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogT3BlblRyYWNraW5nSW5mbyB8IENsaWNrVHJhY2tpbmdJbmZvIHwgVW5zdWJzY3JpYmVUcmFja2luZ0luZm9cbiAgKTogUHJvbWlzZTxVcGRhdGVkT3BlblRyYWNraW5nPiB7XG4gICAgaWYgKHR5cGVvZiBkYXRhPy5hY3RpdmUgPT09ICdib29sZWFuJykge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcignUmVjZWl2ZWQgYm9vbGVhbiB2YWx1ZSBmb3IgYWN0aXZlIHByb3BlcnR5JywgJ1Byb3BlcnR5IFwiYWN0aXZlXCIgbXVzdCBjb250YWluIHN0cmluZyB2YWx1ZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycsIHR5cGUpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZVRyYWNraW5nVXBkYXRlKHJlcyBhcyBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSk7XG4gIH1cblxuICAvLyBJUHNcblxuICBnZXRJcHMoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogQVBJUmVzcG9uc2UpID0+IHJlc3BvbnNlPy5ib2R5Py5pdGVtcyk7XG4gIH1cblxuICBhc3NpZ25JcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnKSwgeyBpcCB9KTtcbiAgfVxuXG4gIGRlbGV0ZUlwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJywgaXApKTtcbiAgfVxuXG4gIGxpbmtJcFBvb2woZG9tYWluOiBzdHJpbmcsIHBvb2xJZDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IHBvb2xfaWQ6IHBvb2xJZCB9KTtcbiAgfVxuXG4gIHVubGlua0lwUG9sbChkb21haW46IHN0cmluZywgcmVwbGFjZW1lbnQ6IFJlcGxhY2VtZW50Rm9yUG9vbCk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gJyc7XG4gICAgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQgJiYgcmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoJ1RvbyBtdWNoIGRhdGEgZm9yIHJlcGxhY2VtZW50JywgJ1BsZWFzZSBzcGVjaWZ5IGVpdGhlciBwb29sX2lkIG9yIGlwIChub3QgYm90aCknKTtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/cG9vbF9pZD0ke3JlcGxhY2VtZW50LnBvb2xfaWR9YDtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICBzZWFyY2hQYXJhbXMgPSBgP2lwPSR7cmVwbGFjZW1lbnQuaXB9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCAnaXBfcG9vbCcsIHNlYXJjaFBhcmFtcykpO1xuICB9XG5cbiAgdXBkYXRlREtJTUF1dGhvcml0eShkb21haW46IHN0cmluZywgZGF0YTogREtJTUF1dGhvcml0eUluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNQXV0aG9yaXR5PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX2F1dGhvcml0eWAsIHt9LCB7IHF1ZXJ5OiBgc2VsZj0ke2RhdGEuc2VsZn1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlcyA6IFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5KTtcbiAgfVxuXG4gIHVwZGF0ZURLSU1TZWxlY3Rvcihkb21haW46IHN0cmluZywgZGF0YTogREtJTVNlbGVjdG9ySW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX3NlbGVjdG9yYCwge30sIHsgcXVlcnk6IGBka2ltX3NlbGVjdG9yPSR7ZGF0YS5ka2ltU2VsZWN0b3J9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZVdlYlByZWZpeChkb21haW46IHN0cmluZywgZGF0YTogV2ViUHJlZml4SW5mbyk6IFByb21pc2U8VXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS93ZWJfcHJlZml4YCwge30sIHsgcXVlcnk6IGB3ZWJfcHJlZml4PSR7ZGF0YS53ZWJQcmVmaXh9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuaW1wb3J0IHsgSURvbWFpbkNyZWRlbnRpYWxzIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Eb21haW5zJztcbmltcG9ydCB7XG4gIERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhLFxuICBEb21haW5DcmVkZW50aWFsc0xpc3QsXG4gIENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSxcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQsXG4gIERlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlLFxuICBEb21haW5DcmVkZW50aWFsc1F1ZXJ5LFxuICBEb21haW5DcmVkZW50aWFscyxcbiAgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG59IGZyb20gJy4uLy4uL1R5cGVzL0RvbWFpbnMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5DcmVkZW50aWFsc0NsaWVudCBpbXBsZW1lbnRzIElEb21haW5DcmVkZW50aWFscyB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My9kb21haW5zLyc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChcbiAgICByZXNwb25zZTogRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGFcbiAgKTogRG9tYWluQ3JlZGVudGlhbHNMaXN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IHJlc3BvbnNlLmJvZHkuaXRlbXMsXG4gICAgICB0b3RhbENvdW50OiByZXNwb25zZS5ib2R5LnRvdGFsX2NvdW50XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlTWVzc2FnZVJlc3BvbnNlKFxuICAgIHJlc3BvbnNlOiBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VcbiAgKTogRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgfSBhcyBEb21haW5DcmVkZW50aWFsc1Jlc3VsdDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEZWxldGVkUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6RGVsZXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VcbiAgKTogRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgc3BlYzogcmVzcG9uc2UuYm9keS5zcGVjXG4gICAgfSBhcyBEb21haW5DcmVkZW50aWFsc1Jlc3VsdDtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpbkNyZWRlbnRpYWxzUXVlcnkpOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy9jcmVkZW50aWFscycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QocmVzIGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhKVxuICAgICAgKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5DcmVkZW50aWFsc1xuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFsc2AsIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nLFxuICAgIGRhdGE6IFVwZGF0ZURvbWFpbkNyZWRlbnRpYWxzRGF0YVxuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzLyR7Y3JlZGVudGlhbHNMb2dpbn1gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFscy8ke2NyZWRlbnRpYWxzTG9naW59YClcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURlbGV0ZWRSZXNwb25zZShyZXMpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24vQXBpUmVzcG9uc2UnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0LFxuICBJRG9tYWluVGFnc0NsaWVudFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0RvbWFpbnMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgUmVzb2x1dGlvbiB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7XG4gIERvbWFpblRhZ3NJdGVtLFxuICBEb21haW5UYWdzSXRlbUluZm8sXG4gIERvbWFpblRhZ1N0YXRpc3RpY0l0ZW0sXG4gIERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0sXG4gIERvbWFpblRhZ3NMaXN0LFxuICBEb21haW5UYWdzUmVzcG9uc2VEYXRhLFxuICBEb21haW5UYWdzUXVlcnksXG4gIERvbWFpblRhZ3NNZXNzYWdlUmVzLFxuICBEb21haW5UYWdzU3RhdGlzdGljUXVlcnksXG4gIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ1Byb3ZpZGVyc0FQSVJlc3BvbnNlLFxuICBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ0RldmljZXNBUElSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZyBpbXBsZW1lbnRzIERvbWFpblRhZ3NJdGVtIHtcbiAgdGFnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICdmaXJzdC1zZWVuJzogRGF0ZTtcbiAgJ2xhc3Qtc2Vlbic6IERhdGU7XG5cbiAgY29uc3RydWN0b3IodGFnSW5mbzogRG9tYWluVGFnc0l0ZW1JbmZvKSB7XG4gICAgdGhpcy50YWcgPSB0YWdJbmZvLnRhZztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnSW5mby5kZXNjcmlwdGlvbjtcbiAgICB0aGlzWydmaXJzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydmaXJzdC1zZWVuJ10pO1xuICAgIHRoaXNbJ2xhc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snbGFzdC1zZWVuJ10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UYWdTdGF0aXN0aWMgaW1wbGVtZW50cyBJRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0IHtcbiAgdGFnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHN0YXJ0OiBEYXRlO1xuICBlbmQ6IERhdGU7XG4gIHJlc29sdXRpb246IFJlc29sdXRpb247XG4gIHN0YXRzOiBEb21haW5UYWdTdGF0aXN0aWNJdGVtW107XG5cbiAgY29uc3RydWN0b3IodGFnU3RhdGlzdGljSW5mbzogRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlKSB7XG4gICAgdGhpcy50YWcgPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkudGFnO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuZGVzY3JpcHRpb247XG4gICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGFydCk7XG4gICAgdGhpcy5lbmQgPSBuZXcgRGF0ZSh0YWdTdGF0aXN0aWNJbmZvLmJvZHkuZW5kKTtcbiAgICB0aGlzLnJlc29sdXRpb24gPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkucmVzb2x1dGlvbjtcbiAgICB0aGlzLnN0YXRzID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdDogRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0pIHtcbiAgICAgIGNvbnN0IHJlcyA9IHsgLi4uc3RhdCwgdGltZTogbmV3IERhdGUoc3RhdC50aW1lKSB9O1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5UYWdzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxEb21haW5UYWdzTGlzdD5cbiAgaW1wbGVtZW50cyBJRG9tYWluVGFnc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSxcbiAgKTogRG9tYWluVGFnc0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBEb21haW5UYWdzTGlzdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoKHRhZ0luZm86IERvbWFpblRhZ3NJdGVtSW5mbykgPT4gbmV3IERvbWFpblRhZyh0YWdJbmZvKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAndGFnJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRhZ1N0YXRpc3RpYyhcbiAgICByZXNwb25zZTogRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlXG4gICk6IElEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQge1xuICAgIHJldHVybiBuZXcgRG9tYWluVGFnU3RhdGlzdGljKHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGFnc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5UYWdzTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJyksIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGFnKHJlcy5ib2R5KVxuICAgICAgKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpLCBkZXNjcmlwdGlvbilcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnc01lc3NhZ2VSZXNcbiAgICAgICk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nXG4gICk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vdGFncy8ke3RhZ31gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IChcbiAgICAgICAge1xuICAgICAgICAgIG1lc3NhZ2U6IHJlcy5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgc3RhdHVzOiByZXMuc3RhdHVzXG4gICAgICAgIH0gYXMgRG9tYWluVGFnc01lc3NhZ2VSZXMpKTtcbiAgfVxuXG4gIHN0YXRpc3RpYyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcsIHF1ZXJ5OiBEb21haW5UYWdzU3RhdGlzdGljUXVlcnkpXG4gICAgOiBQcm9taXNlPERvbWFpblRhZ1N0YXRpc3RpYz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlVGFnU3RhdGlzdGljKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBjb3VudHJpZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9jb3VudHJpZXMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cblxuICBwcm92aWRlcnMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9wcm92aWRlcnMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdQcm92aWRlcnNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cblxuICBkZXZpY2VzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL2RldmljZXMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdEZXZpY2VzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvblxuICAgICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSxcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBEb21haW5UZW1wbGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlc1F1ZXJ5LFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGEsXG4gIERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGEsXG4gIEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZXNBUElSZXNwb25zZSxcbiAgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdCxcbiAgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZSxcbiAgTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQsXG4gIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlLFxuICBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQsXG4gIE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlLFxuICBOb3RpZmljYXRpb25SZXN1bHQsXG4gIFNob3J0VGVtcGxhdGVWZXJzaW9uLFxuICBUZW1wbGF0ZVF1ZXJ5LFxuICBUZW1wbGF0ZVZlcnNpb24sXG4gIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdFxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IElEb21haW5UZW1wbGF0ZSwgSURvbWFpblRlbXBsYXRlc0NsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UZW1wbGF0ZUl0ZW0gaW1wbGVtZW50cyBJRG9tYWluVGVtcGxhdGUge1xuICBuYW1lIDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbiA6IHN0cmluZztcbiAgY3JlYXRlZEF0IDogRGF0ZSB8ICcnO1xuICBjcmVhdGVkQnkgOiBzdHJpbmc7XG4gIGlkIDogc3RyaW5nO1xuICB2ZXJzaW9uPzogVGVtcGxhdGVWZXJzaW9uO1xuICB2ZXJzaW9ucz86IFNob3J0VGVtcGxhdGVWZXJzaW9uW107XG5cbiAgY29uc3RydWN0b3IoZG9tYWluVGVtcGxhdGVGcm9tQVBJOiBJRG9tYWluVGVtcGxhdGUpIHtcbiAgICB0aGlzLm5hbWUgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkubmFtZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuY3JlYXRlZEF0ID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRBdCA/IG5ldyBEYXRlKGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQpIDogJyc7XG4gICAgdGhpcy5jcmVhdGVkQnkgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEJ5O1xuICAgIHRoaXMuaWQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuaWQ7XG5cbiAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24pIHtcbiAgICAgIHRoaXMudmVyc2lvbiA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uO1xuICAgICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCkge1xuICAgICAgICB0aGlzLnZlcnNpb24uY3JlYXRlZEF0ID0gbmV3IERhdGUoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24uY3JlYXRlZEF0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zICYmIGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMudmVyc2lvbnMgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMubWFwKCh2ZXJzaW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgLi4udmVyc2lvbiB9O1xuICAgICAgICByZXN1bHQuY3JlYXRlZEF0ID0gbmV3IERhdGUodmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpblRlbXBsYXRlc0NsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8TGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdD5cbiAgaW1wbGVtZW50cyBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHN1cGVyKHJlcXVlc3QpO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzLyc7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQ3JlYXRpb25SZXNwb25zZShkYXRhOiBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKTogSURvbWFpblRlbXBsYXRlIHtcbiAgICByZXR1cm4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkYXRhLmJvZHkudGVtcGxhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKFxuICAgIGRhdGE6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlXG4gICk6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7fSBhcyBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VNdXRhdGlvblJlc3BvbnNlKFxuICAgIGRhdGE6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZVxuICApOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQgPSB7fSBhcyBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkgJiYgZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGVOYW1lID0gZGF0YS5ib2R5LnRlbXBsYXRlLm5hbWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UoZGF0YTogTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UpOiBOb3RpZmljYXRpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogTm90aWZpY2F0aW9uUmVzdWx0ID0ge30gYXMgTm90aWZpY2F0aW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UoXG4gICAgZGF0YTogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2VcbiAgKTogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHt9IGFzIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGVOYW1lID0gZGF0YS5ib2R5LnRlbXBsYXRlLm5hbWU7XG4gICAgICByZXN1bHQudGVtcGxhdGVWZXJzaW9uID0geyB0YWc6IGRhdGEuYm9keS50ZW1wbGF0ZS52ZXJzaW9uLnRhZyB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlKTogTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoKGQ6IElEb21haW5UZW1wbGF0ZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncCcpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMoXG4gICAgcmVzcG9uc2U6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2VcbiAgKTogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdDtcblxuICAgIGRhdGEudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlc3BvbnNlLmJvZHkudGVtcGxhdGUpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ3AnKTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5UZW1wbGF0ZXNRdWVyeSk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSwgcXVlcnkpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgcXVlcnk/OiBUZW1wbGF0ZVF1ZXJ5KTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlRGF0YVxuICApOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlQ3JlYXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGFcbiAgKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpKVxuICAgICAgLnRoZW4oKHJlczogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3lBbGwoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE5vdGlmaWNhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSlcbiAgICAgIC50aGVuKChyZXM6IE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBjcmVhdGVWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGFcbiAgKTogUHJvbWlzZTxDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBnZXRWZXJzaW9uKGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXMuYm9keS50ZW1wbGF0ZSlcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGVWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGFcbiAgKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpLCBkYXRhKVxuICAgICAgLnRoZW4oXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgIChyZXM6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3lWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSlcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAudGhlbigocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgbGlzdFZlcnNpb25zKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnlcbiAgKTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zKHJlcylcbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHtcbiAgRXZlbnRzTGlzdCxcbiAgRXZlbnRzUXVlcnksXG4gIEV2ZW50c1Jlc3BvbnNlLFxufSBmcm9tICcuLi9UeXBlcy9FdmVudHMnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElFdmVudENsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudENsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8RXZlbnRzTGlzdD5cbiAgaW1wbGVtZW50cyBJRXZlbnRDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChcbiAgICByZXNwb25zZTogRXZlbnRzUmVzcG9uc2UsXG4gICk6IEV2ZW50c0xpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBFdmVudHNMaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICcvJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBnZXQoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRXZlbnRzUXVlcnkpIDogUHJvbWlzZTxFdmVudHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXModXJsam9pbignL3YzJywgZG9tYWluLCAnZXZlbnRzJyksIHF1ZXJ5KTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgSXBQb29sQ3JlYXRlRGF0YSxcbiAgSXBQb29sQ3JlYXRlUmVzcG9uc2UsXG4gIElwUG9vbENyZWF0ZVJlc3VsdCxcbiAgSXBQb29sRGVsZXRlRGF0YSxcbiAgSXBQb29sTGlzdFJlc3BvbnNlLFxuICBJcFBvb2xMaXN0UmVzdWx0LFxuICBJcFBvb2xNZXNzYWdlUmVzcG9uc2UsXG4gIElwUG9vbE1lc3NhZ2VSZXN1bHQsXG4gIElwUG9vbFVwZGF0ZURhdGEsXG59IGZyb20gJy4uL1R5cGVzL0lQUG9vbHMnO1xuaW1wb3J0IHsgSUlQUG9vbHNDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXBQb29sc0NsaWVudCBpbXBsZW1lbnRzIElJUFBvb2xzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QoKTogUHJvbWlzZTxJcFBvb2xMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92MS9pcF9wb29scycpXG4gICAgICAudGhlbigocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZSkpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKGRhdGE6IElwUG9vbENyZWF0ZURhdGEpOiBQcm9taXNlPElwUG9vbENyZWF0ZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJcFBvb2xDcmVhdGVSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjEvaXBfcG9vbHMnLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sVXBkYXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJcFBvb2xNZXNzYWdlUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucGF0Y2hXaXRoRkQoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogSXBQb29sRGVsZXRlRGF0YSk6IFByb21pc2U8SXBQb29sTWVzc2FnZVJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOklwUG9vbE1lc3NhZ2VSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5kZWxldGUoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJcFBvb2xzUmVzcG9uc2UocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSk6IElwUG9vbExpc3RSZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHlcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgTWdSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSXBEYXRhLCBJUHNMaXN0UXVlcnksIElwc0xpc3RSZXNwb25zZUJvZHkgfSBmcm9tICcuLi9UeXBlcy9JUHMnO1xuaW1wb3J0IHsgSUlQc0NsaWVudCB9IGZyb20gJy4uL0ludGVyZmFjZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcHNDbGllbnQgaW1wbGVtZW50cyBJSVBzQ2xpZW50IHtcbiAgcmVxdWVzdDogTWdSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IE1nUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5PzogSVBzTGlzdFF1ZXJ5KTogUHJvbWlzZTxJcHNMaXN0UmVzcG9uc2VCb2R5PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvaXBzJywgcXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnBhcnNlSXBzUmVzcG9uc2U8SXBzTGlzdFJlc3BvbnNlQm9keT4ocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgZ2V0KGlwOiBzdHJpbmcpOiBQcm9taXNlPElwRGF0YT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3YzL2lwcy8ke2lwfWApO1xuICAgIHJldHVybiB0aGlzLnBhcnNlSXBzUmVzcG9uc2U8SXBEYXRhPihyZXNwb25zZSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlSXBzUmVzcG9uc2U8VD4ocmVzcG9uc2U6IHsgYm9keTogVCB9KTogVCB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQXBpUmVzcG9uc2UsXG4gIEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNSZXN1bHQsXG4gIEluYm94UGxhY2VtZW50c1ZhbHVlc0FwaVJlc3BvbnNlLFxuICBJbmJveFBsYWNlbWVudHNWYWx1ZXNSZXN1bHRcbn0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCBpbXBsZW1lbnRzIElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgcGF0aDogc3RyaW5nXG4gICkge1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGFzeW5jIGxpc3QoKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzUmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KHRoaXMucGF0aCkgYXMgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0FwaVJlc3BvbnNlO1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgIH0gYXMgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc1Jlc3VsdDtcbiAgfVxuXG4gIGFzeW5jIGdldChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1ZhbHVlc1Jlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLnBhdGh9LyR7YXR0cmlidXRlTmFtZX1gKSBhcyBJbmJveFBsYWNlbWVudHNWYWx1ZXNBcGlSZXNwb25zZTtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0FwaVJlc3BvbnNlLCBJbmJveFBsYWNlbWVudHNGaWx0ZXJzUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQgaW1wbGVtZW50cyBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHBhdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIHBhdGg6IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gIH1cblxuICBhc3luYyBsaXN0KCk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzRmlsdGVyc1Jlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQodGhpcy5wYXRoKSBhcyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzQXBpUmVzcG9uc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzdWx0LnN0YXR1cyxcbiAgICAgIHN1cHBvcnRlZF9maWx0ZXJzOiByZXN1bHQuYm9keS5zdXBwb3J0ZWRfZmlsdGVyc1xuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIElJUFJTaGFyaW5nQ2xpZW50LFxuICBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCxcbiAgSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQsXG4gIElJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50LFxuICBJTG9nZ2VyXG59IGZyb20gJy4uLy4uLy4uL0ludGVyZmFjZXMnO1xuXG5pbXBvcnQge1xuICBJbmJveFBsYWNlbWVudHNCb3gsXG4gIEluYm94UGxhY2VtZW50c0Rlc3Ryb3lBUElSZXNwb25zZSxcbiAgSW5ib3hQbGFjZW1lbnRzRGVzdHJveVJlc3VsdCxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0LFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRBUElSZXNwb25zZSxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJU2hhcGUsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdFdpdGhTdGF0dXMsXG4gIEluYm94UGxhY2VtZW50c1Jlc3VsdHNBcGlRdWVyeSxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0RhdGVzLFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdCxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3RBUElSZXNwb25zZSxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1F1ZXJ5XG59IGZyb20gJy4uLy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5cbmltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uLy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uLy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8SW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3Q+XG4gIGltcGxlbWVudHMgSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgYXR0cmlidXRlczogSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQ7XG4gIHB1YmxpYyBmaWx0ZXJzOiBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudDtcbiAgcHVibGljIHNoYXJpbmc6IElJUFJTaGFyaW5nQ2xpZW50O1xuICBwcml2YXRlIGxvZ2dlcjogSUxvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIGF0dHJpYnV0ZXM6IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50LFxuICAgIGZpbHRlcnM6IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50LFxuICAgIHNoYXJpbmc6IElJUFJTaGFyaW5nQ2xpZW50LFxuICAgIGxvZ2dlcjogSUxvZ2dlciA9IGNvbnNvbGVcbiAgKSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgIHRoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgdGhpcy5zaGFyaW5nID0gc2hhcmluZztcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydERhdGVUb1VUQyhrZXk6c3RyaW5nLCBpbnB1dERhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIC8qXG4gICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAqL1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYERhdGU6IFwiJHtpbnB1dERhdGV9XCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXG5WYWx1ZSBcIiR7aW5wdXREYXRlLnRvSVNPU3RyaW5nKCl9XCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nYCk7XG4gICAgcmV0dXJuIGlucHV0RGF0ZS50b0lTT1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUXVlcnlEYXRhKFxuICAgIHF1ZXJ5RGF0YTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1F1ZXJ5XG4gICk6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNBcGlRdWVyeSB7XG4gICAgY29uc3QgcHJvcHNGb3JSZXBsYWNlbWVudCA9IHF1ZXJ5RGF0YSBhcyBJbmJveFBsYWNlbWVudHNSZXN1bHRzRGF0ZXM7XG4gICAgY29uc3QgcmVwbGFjZWRQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzRm9yUmVwbGFjZW1lbnQpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHByb3AgPSBrZXkgYXMga2V5b2YgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0RhdGVzO1xuICAgICAgaWYgKCEhcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSAmJiB0eXBlb2YgcHJvcHNGb3JSZXBsYWNlbWVudFtwcm9wXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBxdWVyeURhdGFbcHJvcF0gYXMgRGF0ZTtcbiAgICAgICAgYWNjW3Byb3BdID0gdGhpcy5jb252ZXJ0RGF0ZVRvVVRDKHByb3AsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30gYXMgUmVjb3JkPGtleW9mIEluYm94UGxhY2VtZW50c1Jlc3VsdHNEYXRlcywgc3RyaW5nPik7XG5cbiAgICBjb25zdCByZXN1bHQ6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNBcGlRdWVyeSA9IHtcbiAgICAgIC4uLnF1ZXJ5RGF0YSxcbiAgICAgIC4uLnJlcGxhY2VkUHJvcHNcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHQoZGF0YTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJU2hhcGUpOiBJbmJveFBsYWNlbWVudHNSZXN1bHQge1xuICAgIGxldCBib3ggPSB7fSBhcyBJbmJveFBsYWNlbWVudHNCb3g7XG5cbiAgICBjb25zdCBoYW5kbGVkU2VlZExpc3REYXRlcyA9IHtcbiAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCksXG4gICAgICB1cGRhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLnVwZGF0ZWRfYXQpLFxuICAgICAgc2hhcmluZ19leHBpcmVzX2F0OiBuZXcgRGF0ZShkYXRhLnNoYXJpbmdfZXhwaXJlc19hdCksXG4gICAgfTtcblxuICAgIGlmIChkYXRhLkJveCkge1xuICAgICAgYm94ID0ge1xuICAgICAgICAuLi5kYXRhLkJveCxcbiAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5Cb3guY3JlYXRlZF9hdCksXG4gICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGRhdGEuQm94LnVwZGF0ZWRfYXQpLFxuICAgICAgICBsYXN0X3Jlc3VsdF9hdDogbmV3IERhdGUoZGF0YS5Cb3gubGFzdF9yZXN1bHRfYXQpLFxuICAgICAgfTtcbiAgICAgIGRlbGV0ZSAoYm94IGFzIHtJRD86IHN0cmluZ30pLklEO1xuICAgIH1cblxuICAgIGNvbnN0IGluYm94UGxhY2VtZW50c1Jlc3VsdDogSW5ib3hQbGFjZW1lbnRzUmVzdWx0ID0ge1xuICAgICAgLi4uZGF0YSxcbiAgICAgIEJveDogYm94LFxuICAgICAgLi4uaGFuZGxlZFNlZWRMaXN0RGF0ZXNcbiAgICB9O1xuXG4gICAgZGVsZXRlIChpbmJveFBsYWNlbWVudHNSZXN1bHQgYXMge0lkPzogc3RyaW5nfSkuSWQ7XG5cbiAgICByZXR1cm4gaW5ib3hQbGFjZW1lbnRzUmVzdWx0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3RBUElSZXNwb25zZSk6IEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0xpc3Q7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoXG4gICAgICAoaXRlbTogSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJU2hhcGUpXG4gICAgICAgIDogSW5ib3hQbGFjZW1lbnRzUmVzdWx0ID0+IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChpdGVtKVxuICAgICk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIGRhdGEuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBhc3luYyBsaXN0KHF1ZXJ5OiBJbmJveFBsYWNlbWVudHNSZXN1bHRzUXVlcnkpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0PiB7XG4gICAgY29uc3QgcXVlcnlEYXRhID0gdGhpcy5wcmVwYXJlUXVlcnlEYXRhKHF1ZXJ5KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92NC9pbmJveC9yZXN1bHRzJywgcXVlcnlEYXRhKSBhcyBJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdEFQSVJlc3BvbnNlO1xuICAgIHJldHVybiB0aGlzLnBhcnNlTGlzdChyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUmVzdWx0V2l0aFN0YXR1cz4ge1xuICAgIGNvbnN0IHJlc3BvbnNlOiBJbmJveFBsYWNlbWVudHNSZXN1bHRBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9yZXN1bHRzLyR7aWR9YCkgYXMgSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJUmVzcG9uc2U7XG4gICAgY29uc3QgaW5ib3hQbGFjZW1lbnRSZXN1bHQ6IEluYm94UGxhY2VtZW50c1Jlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChcbiAgICAgIHJlc3BvbnNlLmJvZHkucmVzdWx0XG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBpbmJveFBsYWNlbWVudFJlc3VsdFxuICAgIH07XG4gIH1cblxuICBhc3luYyBkZXN0cm95KGlkOiBzdHJpbmcpIDogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNEZXN0cm95UmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjQvaW5ib3gvcmVzdWx0cy8ke2lkfWApIGFzIEluYm94UGxhY2VtZW50c0Rlc3Ryb3lBUElSZXNwb25zZTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldFJlc3VsdEJ5U2hhcmVJZChzaGFyZUlkOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Jlc3VsdFdpdGhTdGF0dXM+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9zaGFyaW5nL3B1YmxpYy8ke3NoYXJlSWR9YCkgYXMgSW5ib3hQbGFjZW1lbnRzUmVzdWx0QVBJUmVzcG9uc2U7XG4gICAgY29uc3QgaW5ib3hQbGFjZW1lbnRSZXN1bHQ6IEluYm94UGxhY2VtZW50c1Jlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdChcbiAgICAgIHJlc3BvbnNlLmJvZHkucmVzdWx0XG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBpbmJveFBsYWNlbWVudFJlc3VsdFxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IElJUFJTaGFyaW5nQ2xpZW50IH0gZnJvbSAnLi4vLi4vLi4vSW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBJUFJTaGFyaW5nQVBJUmVzcG9uc2UsXG4gIElQUlNoYXJpbmdBcGlTaGFwZSxcbiAgSVBSU2hhcmluZ1Jlc3VsdCxcbiAgSVBSU2hhcmluZ1VwZGF0ZUFQSVJlc3BvbnNlLFxuICBJUFJTaGFyaW5nVXBkYXRlRGF0YSxcbiAgSVBSU2hhcmluZ1VwZGF0ZVJlc3VsdFxufSBmcm9tICcuLi8uLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJUFJTaGFyaW5nQ2xpZW50IGltcGxlbWVudHMgSUlQUlNoYXJpbmdDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHRTaGFyaW5nKGRhdGE6IElQUlNoYXJpbmdBcGlTaGFwZSk6IElQUlNoYXJpbmdSZXN1bHQge1xuICAgIGNvbnN0IGhhbmRsZWRTZWVkTGlzdERhdGVzID0ge1xuICAgICAgZXhwaXJlc19hdDogbmV3IERhdGUoZGF0YS5leHBpcmVzX2F0KSxcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0OiBJUFJTaGFyaW5nUmVzdWx0ID0ge1xuICAgICAgLi4uZGF0YSxcbiAgICAgIC4uLmhhbmRsZWRTZWVkTGlzdERhdGVzXG4gICAgfTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhc3luYyBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8SVBSU2hhcmluZ1Jlc3VsdCAmIHtzdGF0dXM6IG51bWJlcn0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoYC92NC9pbmJveC9zaGFyaW5nLyR7aWR9YCkgYXMgSVBSU2hhcmluZ0FQSVJlc3BvbnNlO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdFNoYXJpbmcocmVzcG9uc2UuYm9keS5zaGFyaW5nKTtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXN1bHRcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgZGF0YTogSVBSU2hhcmluZ1VwZGF0ZURhdGFcbiAgKTogUHJvbWlzZTxJUFJTaGFyaW5nVXBkYXRlUmVzdWx0ICYgeyBzdGF0dXM6IG51bWJlciB9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucHV0KGAvdjQvaW5ib3gvc2hhcmluZy8ke2lkfWAsIHt9LCB7IHF1ZXJ5OiBgZW5hYmxlZD0ke2RhdGEuZW5hYmxlZH1gIH0pIGFzIElQUlNoYXJpbmdVcGRhdGVBUElSZXNwb25zZTtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnByZXBhcmVJbmJveFBsYWNlbWVudHNSZXN1bHRTaGFyaW5nKHJlc3BvbnNlLmJvZHkuc2hhcmluZyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJlc3VsdCxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgSUxvZ2dlcixcbiAgSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQsXG4gIElTZWVkc0xpc3RzQ2xpZW50LFxuICBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudFxufSBmcm9tICcuLi8uLi8uLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIFNlZWRMaXN0LFxuICBTZWVkTGlzdEFQSVNoYXBlLFxuICBTZWVkc0xpc3RzQVBJUXVlcnksXG4gIFNlZWRzTGlzdHNBUElRdWVyeURhdGVzLFxuICBTZWVkc0xpc3RzQVBJUmVzcG9uc2UsXG4gIFNlZWRzTGlzdHNDcmVhdGluZ0RhdGEsXG4gIFNlZWRzTGlzdHNRdWVyeSxcbiAgU2VlZHNMaXN0c1Jlc3VsdCxcbiAgU2VlZCxcbiAgU2VlZEFQSVNoYXBlLFxuICBTZWVkc0xpc3RzRGVzdHJveUFwaVJlc3BvbnNlLFxuICBTZWVkc0xpc3RzVXBkYXRpbmdEYXRhLFxuICBTZWVkTGlzdFJlc3VsdCxcbiAgU2VlZExpc3RHZXRBUElSZXNwb25zZSxcbiAgU2VlZExpc3RBUElSZXNwb25zZVxufSBmcm9tICcuLi8uLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWVkc0xpc3RzQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxTZWVkc0xpc3RzUmVzdWx0PlxuICBpbXBsZW1lbnRzIElTZWVkc0xpc3RzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHVibGljIGF0dHJpYnV0ZXM6IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50O1xuICBwdWJsaWMgZmlsdGVyczogSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQ7XG4gIHByaXZhdGUgbG9nZ2VyOiBJTG9nZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgYXR0cmlidXRlczogSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQsXG4gICAgZmlsdGVyczogSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQsXG4gICAgbG9nZ2VyOiBJTG9nZ2VyID0gY29uc29sZVxuICApIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG4gICAgdGhpcy5maWx0ZXJzID0gZmlsdGVycztcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydERhdGVUb1VUQyhrZXk6c3RyaW5nLCBpbnB1dERhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIC8qXG4gICAgICBCZWNhdXNlIFwibmV3IERhdGUoJzIwMjItMTItMjVUMDA6MDA6MDAuMDAwWicpXCIgYmVjb21lcyBcIlN1biBEZWMgMjUgMjAyMiAwMjowMDowMCBHTVQrMDIwMFwiXG4gICAgICAocGx1cyAyIGhvdXJzIGZyb20gdGhlIHRpbWV6b25lKVxuICAgICAgYW5kIGJlY2F1c2UgZm9yIEFQSSwgd2UgbmVlZCB0byBwcm92aWRlIHRoZSBkYXRlIGluIHRoZSBleHBlY3RlZCBmb3JtYXRcbiAgICAgIGV4OiAnVGh1LCAxMyBPY3QgMjAxMSAxODowMjowMCArMDAwMCcuXG4gICAgICBIZXJlIHdlIHRyeSBhdXRvLWNvbnZlcnQgdGhlbSB0byBVVENcbiAgICAqL1xuICAgIHRoaXMubG9nZ2VyLndhcm4oYERhdGU6IFwiJHtpbnB1dERhdGV9XCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXG5WYWx1ZSBcIiR7aW5wdXREYXRlLnRvSVNPU3RyaW5nKCl9XCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nYCk7XG4gICAgcmV0dXJuIGlucHV0RGF0ZS50b0lTT1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUXVlcnlEYXRhKHF1ZXJ5RGF0YTogU2VlZHNMaXN0c1F1ZXJ5KSA6IFNlZWRzTGlzdHNBUElRdWVyeSB7XG4gICAgY29uc3QgcHJvcHNGb3JSZXBsYWNlbWVudCA9IHF1ZXJ5RGF0YSBhcyBTZWVkc0xpc3RzQVBJUXVlcnlEYXRlcztcbiAgICBjb25zdCByZXBsYWNlZFByb3BzID0gT2JqZWN0LmtleXMocHJvcHNGb3JSZXBsYWNlbWVudCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgcHJvcCA9IGtleSBhcyBrZXlvZiBTZWVkc0xpc3RzQVBJUXVlcnlEYXRlcztcbiAgICAgIGlmICghIXByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gJiYgdHlwZW9mIHByb3BzRm9yUmVwbGFjZW1lbnRbcHJvcF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcXVlcnlEYXRhW3Byb3BdIGFzIERhdGU7XG4gICAgICAgIGFjY1twcm9wXSA9IHRoaXMuY29udmVydERhdGVUb1VUQyhwcm9wLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9IGFzIFJlY29yZDxrZXlvZiBTZWVkc0xpc3RzQVBJUXVlcnlEYXRlcywgc3RyaW5nPik7XG5cbiAgICBjb25zdCByZXN1bHQ6IFNlZWRzTGlzdHNBUElRdWVyeSA9IHtcbiAgICAgIC4uLnF1ZXJ5RGF0YSxcbiAgICAgIC4uLnJlcGxhY2VkUHJvcHNcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVSZXN1bHQoZGF0YTogU2VlZExpc3RBUElSZXNwb25zZSk6IFNlZWRMaXN0UmVzdWx0IHtcbiAgICBsZXQgcmVzdWx0ID0ge30gYXMgU2VlZExpc3RSZXN1bHQ7XG4gICAgY29uc3Qgc2VlZExpc3QgPSB0aGlzLnByZXBhcmVTZWVkTGlzdChkYXRhLmJvZHkpO1xuICAgIHJlc3VsdCA9IHtcbiAgICAgIC4uLnNlZWRMaXN0LFxuICAgICAgc3RhdHVzOiBkYXRhLnN0YXR1c1xuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVNlZWRMaXN0KGRhdGE6IFNlZWRMaXN0QVBJU2hhcGUpOiBTZWVkTGlzdCB7XG4gICAgbGV0IHNlZWRzOiBTZWVkW10gfCBudWxsO1xuXG4gICAgY29uc3QgaGFuZGxlZFNlZWRMaXN0RGF0ZXMgPSB7XG4gICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpLFxuICAgICAgdXBkYXRlZF9hdDogbmV3IERhdGUoZGF0YS51cGRhdGVkX2F0KSxcbiAgICAgIGxhc3RfcmVzdWx0X2F0OiBuZXcgRGF0ZShkYXRhLmxhc3RfcmVzdWx0X2F0KSxcbiAgICB9O1xuXG4gICAgaWYgKGRhdGEuU2VlZHMpIHtcbiAgICAgIHNlZWRzID0gZGF0YS5TZWVkcy5tYXAoKHNlZWRJdGVtOiBTZWVkQVBJU2hhcGUpOiBTZWVkID0+IHtcbiAgICAgICAgbGV0IHNlZWQgPSB7fSBhcyBTZWVkO1xuICAgICAgICBjb25zdCBoYW5kbGVkU2VlZERhdGVzID0ge1xuICAgICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLmNyZWF0ZWRfYXQpLFxuICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLnVwZGF0ZWRfYXQpLFxuICAgICAgICAgIG1heF9lbWFpbF9jb3VudF9oaXRfYXQ6IG5ldyBEYXRlKHNlZWRJdGVtLm1heF9lbWFpbF9jb3VudF9oaXRfYXQpLFxuICAgICAgICAgIGxhc3Rfc2VudF90b19hdDogbmV3IERhdGUoc2VlZEl0ZW0ubGFzdF9zZW50X3RvX2F0KSxcbiAgICAgICAgICBsYXN0X2RlbGl2ZXJlZF9hdDogbmV3IERhdGUoc2VlZEl0ZW0ubGFzdF9kZWxpdmVyZWRfYXQpLFxuICAgICAgICB9O1xuICAgICAgICBzZWVkID0ge1xuICAgICAgICAgIC4uLnNlZWRJdGVtLFxuICAgICAgICAgIC4uLmhhbmRsZWRTZWVkRGF0ZXNcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHNlZWQ7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VlZHMgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHNlZWRMaXN0OiBTZWVkTGlzdCA9IHtcbiAgICAgIC4uLmRhdGEsXG4gICAgICBTZWVkczogc2VlZHMsXG4gICAgICAuLi5oYW5kbGVkU2VlZExpc3REYXRlc1xuICAgIH07XG5cbiAgICBkZWxldGUgKHNlZWRMaXN0IGFzIHtJZD86IHN0cmluZ30pLklkO1xuXG4gICAgcmV0dXJuIHNlZWRMaXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhcnNlTGlzdChyZXNwb25zZTogU2VlZHNMaXN0c0FQSVJlc3BvbnNlKTogU2VlZHNMaXN0c1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIFNlZWRzTGlzdHNSZXN1bHQ7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoXG4gICAgICAoaXRlbTogU2VlZExpc3RBUElTaGFwZSk6IFNlZWRMaXN0ID0+IHRoaXMucHJlcGFyZVNlZWRMaXN0KGl0ZW0pXG4gICAgKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLnBhcnNlUGFnZUxpbmtzKHJlc3BvbnNlLCAnPycsICdhZGRyZXNzJyk7XG4gICAgZGF0YS5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGxpc3QocXVlcnk6IFNlZWRzTGlzdHNRdWVyeSk6IFByb21pc2U8U2VlZHNMaXN0c1Jlc3VsdD4ge1xuICAgIGNvbnN0IHF1ZXJ5RGF0YSA9IHRoaXMucHJlcGFyZVF1ZXJ5RGF0YShxdWVyeSk7XG4gICAgY29uc3QgcmVzcG9uc2U6IFNlZWRzTGlzdHNBUElSZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQoJy92NC9pbmJveC9zZWVkbGlzdHMnLCBxdWVyeURhdGEpIGFzIFNlZWRzTGlzdHNBUElSZXNwb25zZTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFNlZWRMaXN0UmVzdWx0PiB7XG4gICAgY29uc3QgcmVzcG9uc2U6IFNlZWRMaXN0R2V0QVBJUmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QuZ2V0KGAvdjQvaW5ib3gvc2VlZGxpc3RzLyR7aWR9YCkgYXMgU2VlZExpc3RHZXRBUElSZXNwb25zZTtcbiAgICBjb25zdCB1cGRhdGVkU2VlZHNMaXN0ID0gdGhpcy5wcmVwYXJlU2VlZExpc3QocmVzcG9uc2UuYm9keS5zZWVkbGlzdCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnVwZGF0ZWRTZWVkc0xpc3QsXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH07XG4gIH1cblxuICBhc3luYyBjcmVhdGUoZGF0YTogU2VlZHNMaXN0c0NyZWF0aW5nRGF0YSk6IFByb21pc2U8U2VlZExpc3RSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjQvaW5ib3gvc2VlZGxpc3RzJywgZGF0YSkgYXMgU2VlZExpc3RBUElSZXNwb25zZTtcbiAgICByZXR1cm4gdGhpcy5wcmVwYXJlUmVzdWx0KHJlc3BvbnNlKTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBTZWVkc0xpc3RzVXBkYXRpbmdEYXRhKTogUHJvbWlzZTxTZWVkTGlzdFJlc3VsdD4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LnB1dChgL3Y0L2luYm94L3NlZWRsaXN0cy8ke2lkfWAsIGRhdGEpIGFzIFNlZWRMaXN0QVBJUmVzcG9uc2U7XG4gICAgcmV0dXJuIHRoaXMucHJlcGFyZVJlc3VsdChyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBkZXN0cm95KGlkOiBzdHJpbmcpOiBQcm9taXNlPFNlZWRzTGlzdHNEZXN0cm95QXBpUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2luYm94L3NlZWRsaXN0cy8ke2lkfWApIGFzIHVua25vd24gYXMgU2VlZHNMaXN0c0Rlc3Ryb3lBcGlSZXNwb25zZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c0NsaWVudCwgSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7IElTZWVkc0xpc3RzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9JbmJveFBsYWNlbWVudHMvU2VlZHNMaXN0cy9TZWVkc0xpc3RzQ2xpZW50JztcbmltcG9ydCB7IElJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzJztcbmltcG9ydCB7IEluYm94UGxhY2VtZW50c0RhdGEsIEluYm94UGxhY2VtZW50c1Rlc3RSZXN1bHQsIEluYm94UGxhY2VtZW50c1Rlc3RSZXN1bHRBUElSZXNwb25zZSB9IGZyb20gJy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluYm94UGxhY2VtZW50c0NsaWVudCBpbXBsZW1lbnRzIElJbmJveFBsYWNlbWVudHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgc2VlZHNMaXN0czogSVNlZWRzTGlzdHNDbGllbnQ7XG4gIHB1YmxpYyByZXN1bHRzOiBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudDtcbiAgcHJvdmlkZXJzOiBJSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50XG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgc2VlZHNMaXN0c0NsaWVudDogSVNlZWRzTGlzdHNDbGllbnQsXG4gICAgcmVzdWx0czogSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQsXG4gICAgcHJvdmlkZXJzOiBJSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50XG4gICkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5zZWVkc0xpc3RzID0gc2VlZHNMaXN0c0NsaWVudDtcbiAgICB0aGlzLnNlZWRzTGlzdHMgPSBzZWVkc0xpc3RzQ2xpZW50O1xuICAgIHRoaXMucmVzdWx0cyA9IHJlc3VsdHM7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBwcm92aWRlcnM7XG4gIH1cblxuICBhc3luYyBydW5UZXN0KGRhdGE6IEluYm94UGxhY2VtZW50c0RhdGEpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Rlc3RSZXN1bHQ+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5wb3N0KCcvdjQvaW5ib3gvdGVzdHMnLCBkYXRhKSBhcyBJbmJveFBsYWNlbWVudHNUZXN0UmVzdWx0QVBJUmVzcG9uc2U7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJlc3BvbnNlLmJvZHksXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IElJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgfSBmcm9tICcuLi8uLi8uLi9JbnRlcmZhY2VzL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzJztcbmltcG9ydCB7IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyLCBJbmJveFBsYWNlbWVudHNQcm92aWRlckFQSVNoYXBlLCBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNMaXN0LCBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNMaXN0QVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi8uLi9UeXBlcy9JbmJveFBsYWNlbWVudHMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vLi4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQgaW1wbGVtZW50cyBJSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICkge1xuICAgIHRoaXMucGF0aCA9ICcvdjQvaW5ib3gvcHJvdmlkZXJzJztcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0xpc3RBUElSZXNwb25zZVxuICApOiBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNMaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzTGlzdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChcbiAgICAgIChpdGVtOiBJbmJveFBsYWNlbWVudHNQcm92aWRlckFQSVNoYXBlKTogSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXIgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVkUHJvdmlkZXJEYXRlcyA9IHtcbiAgICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShpdGVtLmNyZWF0ZWRfYXQpLFxuICAgICAgICAgIHVwZGF0ZWRfYXQ6IG5ldyBEYXRlKGl0ZW0udXBkYXRlZF9hdCksXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlc3VsdDogSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXIgPSB7XG4gICAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgICAuLi5oYW5kbGVkUHJvdmlkZXJEYXRlc1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICk7XG5cbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdCgpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0xpc3Q+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMucmVxdWVzdC5nZXQodGhpcy5wYXRoKSBhcyBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNMaXN0QVBJUmVzcG9uc2U7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VMaXN0KHJlc3BvbnNlKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL2NvbW1vbi9SZXF1ZXN0JztcbmltcG9ydCB7IE1haWxndW5DbGllbnRPcHRpb25zLCBJbnB1dEZvcm1EYXRhLCBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4uL1R5cGVzJztcblxuaW1wb3J0IERvbWFpbnNDbGllbnQgZnJvbSAnLi9Eb21haW5zL2RvbWFpbnNDbGllbnQnO1xuaW1wb3J0IEV2ZW50Q2xpZW50IGZyb20gJy4vRXZlbnRzJztcbmltcG9ydCBTdGF0c0NsaWVudCBmcm9tICcuL1N0YXRzL1N0YXRzQ2xpZW50JztcbmltcG9ydCBTdXBwcmVzc2lvbkNsaWVudCBmcm9tICcuL1N1cHByZXNzaW9ucy9TdXBwcmVzc2lvbnNDbGllbnQnO1xuaW1wb3J0IFdlYmhvb2tzQ2xpZW50IGZyb20gJy4vV2ViaG9va3MnO1xuaW1wb3J0IE1lc3NhZ2VzQ2xpZW50IGZyb20gJy4vTWVzc2FnZXMnO1xuaW1wb3J0IFJvdXRlc0NsaWVudCBmcm9tICcuL1JvdXRlcyc7XG5pbXBvcnQgVmFsaWRhdGVDbGllbnQgZnJvbSAnLi9WYWxpZGF0aW9ucy92YWxpZGF0ZSc7XG5pbXBvcnQgSXBzQ2xpZW50IGZyb20gJy4vSVBzJztcbmltcG9ydCBJcFBvb2xzQ2xpZW50IGZyb20gJy4vSVBQb29scyc7XG5pbXBvcnQgTWFpbGluZ0xpc3RzQ2xpZW50IGZyb20gJy4vTWFpbGluZ0xpc3RzL21haWxpbmdMaXN0cyc7XG5pbXBvcnQgTWFpbExpc3RzTWVtYmVycyBmcm9tICcuL01haWxpbmdMaXN0cy9tYWlsTGlzdE1lbWJlcnMnO1xuaW1wb3J0IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zQ3JlZGVudGlhbHMnO1xuaW1wb3J0IE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCBmcm9tICcuL1ZhbGlkYXRpb25zL211bHRpcGxlVmFsaWRhdGlvbic7XG5pbXBvcnQgRG9tYWluVGVtcGxhdGVzQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zVGVtcGxhdGVzJztcbmltcG9ydCBEb21haW5UYWdzQ2xpZW50IGZyb20gJy4vRG9tYWlucy9kb21haW5zVGFncyc7XG5pbXBvcnQgU3ViYWNjb3VudHNDbGllbnQgZnJvbSAnLi9TdWJhY2NvdW50cyc7XG5cbmltcG9ydCB7XG4gIElEb21haW5zQ2xpZW50LFxuICBJV2ViSG9va3NDbGllbnQsXG4gIElNYWlsZ3VuQ2xpZW50LFxuICBJTWFpbGluZ0xpc3RzQ2xpZW50LFxuICBJRXZlbnRDbGllbnQsXG4gIElTdGF0c0NsaWVudCxcbiAgSVN1cHByZXNzaW9uQ2xpZW50LFxuICBJTWVzc2FnZXNDbGllbnQsXG4gIElSb3V0ZXNDbGllbnQsXG4gIElWYWxpZGF0aW9uQ2xpZW50LFxuICBJSVBzQ2xpZW50LFxuICBJSVBQb29sc0NsaWVudCxcbiAgSVN1YmFjY291bnRzQ2xpZW50LFxuICBJSW5ib3hQbGFjZW1lbnRzQ2xpZW50LFxufSBmcm9tICcuLi9JbnRlcmZhY2VzJztcbmltcG9ydCBTZWVkc0xpc3RzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL1NlZWRzTGlzdHMvU2VlZHNMaXN0c0NsaWVudCc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL2luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQgZnJvbSAnLi9JbmJveFBsYWNlbWVudHMvQXR0cmlidXRlc0NsaWVudCc7XG5pbXBvcnQgSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9GaWx0ZXJzQ2xpZW50JztcbmltcG9ydCBJUFJTaGFyaW5nQ2xpZW50IGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzL1Jlc3VsdHMvSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQnO1xuaW1wb3J0IEluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCBmcm9tICcuL0luYm94UGxhY2VtZW50cy9wcm92aWRlcnMvSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbGd1bkNsaWVudCBpbXBsZW1lbnRzIElNYWlsZ3VuQ2xpZW50IHtcbiAgcHJpdmF0ZSByZXF1ZXN0O1xuXG4gIHB1YmxpYyBkb21haW5zOiBJRG9tYWluc0NsaWVudDtcbiAgcHVibGljIHdlYmhvb2tzOiBJV2ViSG9va3NDbGllbnQ7XG4gIHB1YmxpYyBldmVudHM6IElFdmVudENsaWVudDtcbiAgcHVibGljIHN0YXRzOiBJU3RhdHNDbGllbnQ7XG4gIHB1YmxpYyBzdXBwcmVzc2lvbnM6IElTdXBwcmVzc2lvbkNsaWVudDtcbiAgcHVibGljIG1lc3NhZ2VzOiBJTWVzc2FnZXNDbGllbnQ7XG4gIHB1YmxpYyByb3V0ZXM6IElSb3V0ZXNDbGllbnQ7XG4gIHB1YmxpYyB2YWxpZGF0ZTogSVZhbGlkYXRpb25DbGllbnQ7XG4gIHB1YmxpYyBpcHM6IElJUHNDbGllbnQ7XG4gIHB1YmxpYyBpcF9wb29sczogSUlQUG9vbHNDbGllbnQ7XG4gIHB1YmxpYyBsaXN0czogSU1haWxpbmdMaXN0c0NsaWVudDtcbiAgcHVibGljIHN1YmFjY291bnRzOiBJU3ViYWNjb3VudHNDbGllbnQ7XG4gIHB1YmxpYyBpbmJveF9wbGFjZW1lbnRzOiBJSW5ib3hQbGFjZW1lbnRzQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE1haWxndW5DbGllbnRPcHRpb25zLCBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIGNvbnN0IGNvbmZpZzogUmVxdWVzdE9wdGlvbnMgPSB7IC4uLm9wdGlvbnMgfSBhcyBSZXF1ZXN0T3B0aW9ucztcblxuICAgIGlmICghY29uZmlnLnVybCkge1xuICAgICAgY29uZmlnLnVybCA9ICdodHRwczovL2FwaS5tYWlsZ3VuLm5ldCc7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcudXNlcm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwidXNlcm5hbWVcIiBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJrZXlcIiBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICB0aGlzLnJlcXVlc3QgPSBuZXcgUmVxdWVzdChjb25maWcsIGZvcm1EYXRhKTtcbiAgICBjb25zdCBtYWlsTGlzdHNNZW1iZXJzID0gbmV3IE1haWxMaXN0c01lbWJlcnModGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5DcmVkZW50aWFsc0NsaWVudCA9IG5ldyBEb21haW5DcmVkZW50aWFsc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpblRlbXBsYXRlc0NsaWVudCA9IG5ldyBEb21haW5UZW1wbGF0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5UYWdzQ2xpZW50ID0gbmV3IERvbWFpblRhZ3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgPSBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1NoYXJpbmdDbGllbnQgPSBuZXcgSVBSU2hhcmluZ0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuXG4gICAgY29uc3Qgc2VlZHNMaXN0c0F0dHJpYnV0ZXMgPSBuZXcgSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCh0aGlzLnJlcXVlc3QsICcvdjQvaW5ib3gvc2VlZGxpc3RzL2EnKTtcbiAgICBjb25zdCByZXN1bHRzQXR0cmlidXRlc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50KHRoaXMucmVxdWVzdCwgJy92NC9pbmJveC9yZXN1bHRzL2EnKTtcblxuICAgIGNvbnN0IHNlZWRzTGlzdHNGaWx0ZXJzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3NlZWRsaXN0cy9fZmlsdGVycycpO1xuICAgIGNvbnN0IHJlc3VsdHNGaWx0ZXJzQ2xpZW50ID0gbmV3IEluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQodGhpcy5yZXF1ZXN0LCAnL3Y0L2luYm94L3Jlc3VsdHMvX2ZpbHRlcnMnKTtcblxuICAgIGNvbnN0IHNlZWRzTGlzdHNDbGllbnQgPSBuZXcgU2VlZHNMaXN0c0NsaWVudChcbiAgICAgIHRoaXMucmVxdWVzdCxcbiAgICAgIHNlZWRzTGlzdHNBdHRyaWJ1dGVzLFxuICAgICAgc2VlZHNMaXN0c0ZpbHRlcnNDbGllbnRcbiAgICApO1xuXG4gICAgY29uc3QgaW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0LFxuICAgICAgcmVzdWx0c0F0dHJpYnV0ZXNDbGllbnQsXG4gICAgICByZXN1bHRzRmlsdGVyc0NsaWVudCxcbiAgICAgIEluYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50XG4gICAgKTtcblxuICAgIGNvbnN0IGluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCA9IG5ldyBJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQoXG4gICAgICB0aGlzLnJlcXVlc3RcbiAgICApO1xuXG4gICAgdGhpcy5kb21haW5zID0gbmV3IERvbWFpbnNDbGllbnQoXG4gICAgICB0aGlzLnJlcXVlc3QsXG4gICAgICBkb21haW5DcmVkZW50aWFsc0NsaWVudCxcbiAgICAgIGRvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgICAgIGRvbWFpblRhZ3NDbGllbnRcbiAgICApO1xuICAgIHRoaXMud2ViaG9va3MgPSBuZXcgV2ViaG9va3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudENsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnN1cHByZXNzaW9ucyA9IG5ldyBTdXBwcmVzc2lvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMubWVzc2FnZXMgPSBuZXcgTWVzc2FnZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnJvdXRlcyA9IG5ldyBSb3V0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmlwcyA9IG5ldyBJcHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmlwX3Bvb2xzID0gbmV3IElwUG9vbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmxpc3RzID0gbmV3IE1haWxpbmdMaXN0c0NsaWVudCh0aGlzLnJlcXVlc3QsIG1haWxMaXN0c01lbWJlcnMpO1xuICAgIHRoaXMudmFsaWRhdGUgPSBuZXcgVmFsaWRhdGVDbGllbnQodGhpcy5yZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpO1xuICAgIHRoaXMuc3ViYWNjb3VudHMgPSBuZXcgU3ViYWNjb3VudHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmluYm94X3BsYWNlbWVudHMgPSBuZXcgSW5ib3hQbGFjZW1lbnRzQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0LFxuICAgICAgc2VlZHNMaXN0c0NsaWVudCxcbiAgICAgIGluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQsXG4gICAgICBpbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQsXG4gICAgKTtcbiAgfVxuXG4gIHNldFN1YmFjY291bnQoc3ViYWNjb3VudElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVlc3Q/LnNldFN1YmFjY291bnRIZWFkZXIoc3ViYWNjb3VudElkKTtcbiAgfVxuXG4gIHJlc2V0U3ViYWNjb3VudCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVlc3Q/LnJlc2V0U3ViYWNjb3VudEhlYWRlcigpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQge1xuICBNYWlsTGlzdE1lbWJlcnNRdWVyeSxcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzLFxuICBNYWlsTGlzdE1lbWJlcixcbiAgTXVsdGlwbGVNZW1iZXJzRGF0YSxcbiAgTXVsdGlwbGVNZW1iZXJzUmVxRGF0YSxcbiAgRGVsZXRlZE1lbWJlcixcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzUmVxLFxuICBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSxcbiAgTWFpbExpc3RNZW1iZXJzUmVzdWx0LFxuICBNYWlsTGlzdE1lbWJlcnNSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9NYWlsaW5nTGlzdHMnO1xuaW1wb3J0IE5hdmlnYXRpb25UaHJ1UGFnZXMgZnJvbSAnLi4vY29tbW9uL05hdmlnYXRpb25UaHJ1UGFnZXMnO1xuaW1wb3J0IHsgSU1haWxMaXN0c01lbWJlcnMgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL01haWxpbmdMaXN0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxMaXN0c01lbWJlcnNcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPE1haWxMaXN0TWVtYmVyc1Jlc3VsdD5cbiAgaW1wbGVtZW50cyBJTWFpbExpc3RzTWVtYmVycyB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My9saXN0cyc7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrQW5kVXBkYXRlRGF0YShkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMpIHtcbiAgICBjb25zdCBuZXdEYXRhID0geyAuLi5kYXRhIH07XG5cbiAgICBpZiAodHlwZW9mIGRhdGEudmFycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG5ld0RhdGEudmFycyA9IEpTT04uc3RyaW5naWZ5KG5ld0RhdGEudmFycyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhLnN1YnNjcmliZWQgPT09ICdib29sZWFuJykge1xuICAgICAgbmV3RGF0YS5zdWJzY3JpYmVkID0gZGF0YS5zdWJzY3JpYmVkID8gJ3llcycgOiAnbm8nO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdEYXRhIGFzIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1JlcTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IE1haWxMaXN0TWVtYmVyc1Jlc3BvbnNlLFxuICApOiBNYWlsTGlzdE1lbWJlcnNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBNYWlsTGlzdE1lbWJlcnNSZXN1bHQ7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXM7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAnYWRkcmVzcycpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdE1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBNYWlsTGlzdE1lbWJlcnNRdWVyeVxuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RMaXN0V2l0aFBhZ2VzKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy9wYWdlc2AsIHF1ZXJ5KTtcbiAgfVxuXG4gIGdldE1lbWJlcihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGNyZWF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzYCwgcmVxRGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgY3JlYXRlTWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZU1lbWJlcnNEYXRhXG4gICk6IFByb21pc2U8TmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2U+IHtcbiAgICBjb25zdCBuZXdEYXRhOiBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhID0ge1xuICAgICAgbWVtYmVyczogQXJyYXkuaXNBcnJheShkYXRhLm1lbWJlcnMpID8gSlNPTi5zdHJpbmdpZnkoZGF0YS5tZW1iZXJzKSA6IGRhdGEubWVtYmVycyxcbiAgICAgIHVwc2VydDogZGF0YS51cHNlcnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy5qc29uYCwgbmV3RGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSk7XG4gIH1cblxuICB1cGRhdGVNZW1iZXIoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzXG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICBjb25zdCByZXFEYXRhID0gdGhpcy5jaGVja0FuZFVwZGF0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWAsIHJlcURhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGRlc3Ryb3lNZW1iZXIobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nKSA6IFByb21pc2U8RGVsZXRlZE1lbWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIERlbGV0ZWRNZW1iZXIpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQge1xuICBMaXN0c1F1ZXJ5LFxuICBDcmVhdGVVcGRhdGVMaXN0LFxuICBEZXN0cm95ZWRMaXN0LFxuICBNYWlsaW5nTGlzdCxcbiAgTWFpbGluZ0xpc3RWYWxpZGF0aW9uQXBpUmVzcG9uc2UsXG4gIFN0YXJ0VmFsaWRhdGlvblJlc3VsdCxcbiAgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0LFxuICBNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQsXG4gIE1haWxpbmdMaXN0UmVzdWx0LFxuICBNYWlsaW5nTGlzdEFwaVJlc3BvbnNlXG59IGZyb20gJy4uLy4uL1R5cGVzL01haWxpbmdMaXN0cyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvTWFpbGluZ0xpc3RzL01haWxpbmdMaXN0TWVtYmVycyc7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgeyBJTWFpbGluZ0xpc3RzQ2xpZW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxpbmdMaXN0c0NsaWVudFxuICBleHRlbmRzIE5hdmlnYXRpb25UaHJ1UGFnZXM8TWFpbGluZ0xpc3RSZXN1bHQ+XG4gIGltcGxlbWVudHMgSU1haWxpbmdMaXN0c0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgbWVtYmVyczogSU1haWxMaXN0c01lbWJlcnM7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbWVtYmVyczogSU1haWxMaXN0c01lbWJlcnMpIHtcbiAgICBzdXBlcihyZXF1ZXN0KTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My9saXN0cyc7XG4gICAgdGhpcy5tZW1iZXJzID0gbWVtYmVycztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VWYWxpZGF0aW9uUmVzdWx0KFxuICAgIHN0YXR1czogbnVtYmVyLFxuICAgIGRhdGE6IE1haWxpbmdMaXN0VmFsaWRhdGlvbkFwaVJlc3BvbnNlXG4gICk6IE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIHZhbGlkYXRpb25SZXN1bHQ6IHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0ICogMTAwMCkgLy8gYWRkIG1pbGxpc2Vjb25kIHRvIFVuaXggdGltZXN0YW1wXG4gICAgICB9XG4gICAgfSBhcyBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VMaXN0KHJlc3BvbnNlOiBNYWlsaW5nTGlzdEFwaVJlc3BvbnNlKTogTWFpbGluZ0xpc3RSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBNYWlsaW5nTGlzdFJlc3VsdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdChxdWVyeT86IExpc3RzUXVlcnkpOiBQcm9taXNlPE1haWxpbmdMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoYCR7dGhpcy5iYXNlUm91dGV9L3BhZ2VzYCwgcXVlcnkpO1xuICB9XG5cbiAgZ2V0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHRoaXMuYmFzZVJvdXRlLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgdXBkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgZGVzdHJveShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8RGVzdHJveWVkTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIERlc3Ryb3llZExpc3QpO1xuICB9XG5cbiAgdmFsaWRhdGUobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFN0YXJ0VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYCwge30pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+ICh7XG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgICB9KSBhcyBTdGFydFZhbGlkYXRpb25SZXN1bHQpO1xuICB9XG5cbiAgdmFsaWRhdGlvblJlc3VsdChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS92YWxpZGF0ZWApXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlVmFsaWRhdGlvblJlc3VsdChcbiAgICAgICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgICAgIHJlc3BvbnNlLmJvZHkgYXMgTWFpbGluZ0xpc3RWYWxpZGF0aW9uQXBpUmVzcG9uc2VcbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGNhbmNlbFZhbGlkYXRpb24obWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgICB9IGFzIE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdCkpO1xuICB9XG59XG4iLCJpbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9jb21tb24vRXJyb3InO1xuaW1wb3J0IHtcbiAgTWFpbGd1bk1lc3NhZ2VEYXRhLFxuICBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSxcbiAgTWVzc2FnZXNTZW5kUmVzdWx0XG59IGZyb20gJy4uL1R5cGVzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSU1lc3NhZ2VzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VzQ2xpZW50IGltcGxlbWVudHMgSU1lc3NhZ2VzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZUJvb2xlYW5WYWx1ZXMoZGF0YTogTWFpbGd1bk1lc3NhZ2VEYXRhKTogTWFpbGd1bk1lc3NhZ2VEYXRhIHtcbiAgICBjb25zdCB5ZXNOb1Byb3BlcnRpZXMgPSBuZXcgU2V0KFtcbiAgICAgICdvOnRlc3Rtb2RlJyxcbiAgICAgICd0OnRleHQnLFxuICAgICAgJ286ZGtpbScsXG4gICAgICAnbzp0cmFja2luZycsXG4gICAgICAnbzp0cmFja2luZy1jbGlja3MnLFxuICAgICAgJ286dHJhY2tpbmctb3BlbnMnLFxuICAgICAgJ286cmVxdWlyZS10bHMnLFxuICAgICAgJ286c2tpcC12ZXJpZmljYXRpb24nXG4gICAgXSk7XG5cbiAgICBpZiAoIWRhdGEgfHwgT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdNZXNzYWdlIGRhdGEgb2JqZWN0IGNhbiBub3QgYmUgZW1wdHknLCAnTWVzc2FnZSBkYXRhIG9iamVjdCBjYW4gbm90IGJlIGVtcHR5Jyk7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3Qua2V5cyhkYXRhKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICBpZiAoeWVzTm9Qcm9wZXJ0aWVzLmhhcyhrZXkpICYmIHR5cGVvZiBkYXRhW2tleV0gPT09ICdib29sZWFuJykge1xuICAgICAgICBhY2Nba2V5XSA9IGRhdGFba2V5XSA/ICd5ZXMnIDogJ25vJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjY1trZXldID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSBhcyBNYWlsZ3VuTWVzc2FnZURhdGEpO1xuICB9XG5cbiAgX3BhcnNlUmVzcG9uc2UocmVzcG9uc2U6IE1lc3NhZ2VzU2VuZEFQSVJlc3BvbnNlKTogTWVzc2FnZXNTZW5kUmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgfTtcbiAgfVxuXG4gIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogTWFpbGd1bk1lc3NhZ2VEYXRhKTogUHJvbWlzZTxNZXNzYWdlc1NlbmRSZXN1bHQ+IHtcbiAgICBpZiAoZGF0YS5tZXNzYWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92My8ke2RvbWFpbn0vbWVzc2FnZXMubWltZWAsIGRhdGEpXG4gICAgICAgIC50aGVuKHRoaXMuX3BhcnNlUmVzcG9uc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGlmaWVkRGF0YSA9IHRoaXMucHJlcGFyZUJvb2xlYW5WYWx1ZXMoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzYCwgbW9kaWZpZWREYXRhKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IElSb3V0ZXNDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSwgRGVzdHJveVJvdXRlUmVzcG9uc2UsIFJvdXRlLCBSb3V0ZXNMaXN0UXVlcnksIFVwZGF0ZVJvdXRlUmVzcG9uc2Vcbn0gZnJvbSAnLi4vVHlwZXMvUm91dGVzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vY29tbW9uL1JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXNDbGllbnQgaW1wbGVtZW50cyBJUm91dGVzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QocXVlcnk6IFJvdXRlc0xpc3RRdWVyeSk6IFByb21pc2U8Um91dGVbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvcm91dGVzJywgcXVlcnkpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkuaXRlbXMpO1xuICB9XG5cbiAgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFJvdXRlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92My9yb3V0ZXMvJHtpZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5LnJvdXRlKTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFJvdXRlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvcm91dGVzJywgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5yb3V0ZSk7XG4gIH1cblxuICB1cGRhdGUoaWQ6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxVcGRhdGVSb3V0ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYC92My9yb3V0ZXMvJHtpZH1gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGRlc3Ryb3koaWQ6IHN0cmluZyk6IFByb21pc2U8RGVzdHJveVJvdXRlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YzL3JvdXRlcy8ke2lkfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBTdGF0c1F1ZXJ5LCBTdGF0c09wdGlvbnMgfSBmcm9tICcuLi8uLi9UeXBlcy9TdGF0cyc7XG5pbXBvcnQgeyBJTG9nZ2VyIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9Db21tb24nO1xuaW1wb3J0IFN0YXRzQ29udGFpbmVyIGZyb20gJy4vU3RhdHNDb250YWluZXInO1xuaW1wb3J0IHsgSVN0YXRzQ2xpZW50LCBJU3RhdHNDb250YWluZXIgfSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N0YXRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHNDbGllbnQgaW1wbGVtZW50cyBJU3RhdHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwcml2YXRlIGxvZ2dlcjogSUxvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBsb2dnZXI6IElMb2dnZXIgPSBjb25zb2xlKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydERhdGVUb1VUQyhrZXk6c3RyaW5nLCBpbnB1dERhdGU6IERhdGUpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAvKlxuICAgICAgQmVjYXVzZSBcIm5ldyBEYXRlKCcyMDIyLTEyLTI1VDAwOjAwOjAwLjAwMFonKVwiIGJlY29tZXMgXCJTdW4gRGVjIDI1IDIwMjIgMDI6MDA6MDAgR01UKzAyMDBcIlxuICAgICAgKHBsdXMgMiBob3VycyBmcm9tIHRoZSB0aW1lem9uZSlcbiAgICAgIGFuZCBiZWNhdXNlIGZvciBBUEksIHdlIG5lZWQgdG8gcHJvdmlkZSB0aGUgZGF0ZSBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XG4gICAgICBleDogJ1RodSwgMTMgT2N0IDIwMTEgMTg6MDI6MDAgKzAwMDAnLlxuICAgICAgSGVyZSB3ZSB0cnkgYXV0by1jb252ZXJ0IHRoZW0gdG8gVVRDXG4gICAgKi9cbiAgICB0aGlzLmxvZ2dlci53YXJuKGBEYXRlOlwiJHtpbnB1dERhdGV9XCIgd2FzIGF1dG8tY29udmVydGVkIHRvIFVUQyB0aW1lIHpvbmUuXG5WYWx1ZSBcIiR7aW5wdXREYXRlLnRvVVRDU3RyaW5nKCl9XCIgd2lsbCBiZSB1c2VkIGZvciByZXF1ZXN0LlxuQ29uc2lkZXIgdXNpbmcgc3RyaW5nIHR5cGUgZm9yIHByb3BlcnR5IFwiJHtrZXl9XCIgdG8gYXZvaWQgYXV0by1jb252ZXJ0aW5nYCk7XG4gICAgcmV0dXJuIFtrZXksIGlucHV0RGF0ZS50b1VUQ1N0cmluZygpXTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeTogU3RhdHNRdWVyeSB8IHVuZGVmaW5lZCk6IEFycmF5PEFycmF5PHN0cmluZz4+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gW10gYXMgQXJyYXk8QXJyYXk8c3RyaW5nPj47XG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gT2JqZWN0LmVudHJpZXMocXVlcnkpLnJlZHVjZSgoYXJyYXlXaXRoUGFpcnMsIGN1cnJlbnRQYWlyKSA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGN1cnJlbnRQYWlyO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGgpIHsgLy8gZXZlbnQ6IFsnZGVsaXZlcmVkJywgJ2FjY2VwdGVkJ11cbiAgICAgICAgICBjb25zdCByZXBlYXRlZFByb3BlcnR5ID0gdmFsdWUubWFwKChpdGVtKSA9PiBba2V5LCBpdGVtXSk7XG4gICAgICAgICAgcmV0dXJuIFsuLi5hcnJheVdpdGhQYWlycywgLi4ucmVwZWF0ZWRQcm9wZXJ0eV07IC8vIFtbZXZlbnQsZGVsaXZlcmVkXSwgW2V2ZW50LGFjY2VwdGVkXV1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKHRoaXMuY29udmVydERhdGVUb1VUQyhrZXksIHZhbHVlKSk7XG4gICAgICAgICAgcmV0dXJuIGFycmF5V2l0aFBhaXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJyYXlXaXRoUGFpcnM7XG4gICAgICB9LCBbXSBhcyBBcnJheTxBcnJheTxzdHJpbmc+Pik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlYXJjaFBhcmFtcztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VTdGF0cyhyZXNwb25zZTogeyBib2R5OiBTdGF0c09wdGlvbnMgfSk6IElTdGF0c0NvbnRhaW5lciB7XG4gICAgcmV0dXJuIG5ldyBTdGF0c0NvbnRhaW5lcihyZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGdldERvbWFpbihkb21haW46IHN0cmluZywgcXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxJU3RhdHNDb250YWluZXI+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ3N0YXRzL3RvdGFsJyksIHNlYXJjaFBhcmFtcylcbiAgICAgIC50aGVuKHRoaXMucGFyc2VTdGF0cyk7XG4gIH1cblxuICBnZXRBY2NvdW50KHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8SVN0YXRzQ29udGFpbmVyPiB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3N0YXRzL3RvdGFsJywgc2VhcmNoUGFyYW1zKVxuICAgICAgLnRoZW4odGhpcy5wYXJzZVN0YXRzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVN0YXRzQ29udGFpbmVyIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdGF0cyc7XG5pbXBvcnQgeyBTdGF0LCBTdGF0c09wdGlvbnMgfSBmcm9tICcuLi8uLi9UeXBlcy9TdGF0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQ29udGFpbmVyIGltcGxlbWVudHMgSVN0YXRzQ29udGFpbmVyIHtcbiAgICBzdGFydDogRGF0ZTtcbiAgICBlbmQ6IERhdGU7XG4gICAgcmVzb2x1dGlvbjogc3RyaW5nO1xuICAgIHN0YXRzOiBTdGF0W107XG4gICAgY29uc3RydWN0b3IoZGF0YTogU3RhdHNPcHRpb25zKSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoZGF0YS5zdGFydCk7XG4gICAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKGRhdGEuZW5kKTtcbiAgICAgIHRoaXMucmVzb2x1dGlvbiA9IGRhdGEucmVzb2x1dGlvbjtcbiAgICAgIHRoaXMuc3RhdHMgPSBkYXRhLnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdDogU3RhdCkge1xuICAgICAgICBjb25zdCByZXMgPSB7IC4uLnN0YXQgfTtcbiAgICAgICAgcmVzLnRpbWUgPSBuZXcgRGF0ZShzdGF0LnRpbWUpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5pbXBvcnQgeyBJU3ViYWNjb3VudHNDbGllbnQgfSBmcm9tICcuLi9JbnRlcmZhY2VzJztcbmltcG9ydCB7XG4gIFN1YmFjY291bnRMaXN0UmVzcG9uc2VEYXRhLFxuICBTdWJhY2NvdW50UmVzcG9uc2VEYXRhLFxuICBTdWJhY2NvdW50c1F1ZXJ5LFxufSBmcm9tICcuLi9UeXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YmFjY291bnRzQ2xpZW50IGltcGxlbWVudHMgSVN1YmFjY291bnRzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgc3RhdGljIFNVQkFDQ09VTlRfSEVBREVSID0gJ1gtTWFpbGd1bi1Pbi1CZWhhbGYtT2YnO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeT86IFN1YmFjY291bnRzUXVlcnkpOiBQcm9taXNlPFN1YmFjY291bnRMaXN0UmVzcG9uc2VEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92NS9hY2NvdW50cy9zdWJhY2NvdW50cycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG5cbiAgZ2V0KGlkOnN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMvJHtpZH1gKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG5cbiAgY3JlYXRlKG5hbWU6c3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjUvYWNjb3VudHMvc3ViYWNjb3VudHMnLCB7IG5hbWUgfSlcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5ib2R5KTtcbiAgfVxuXG4gIGVuYWJsZShpZDpzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoYC92NS9hY2NvdW50cy9zdWJhY2NvdW50cy8ke2lkfS9lbmFibGVgKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmJvZHkpO1xuICB9XG5cbiAgZGlzYWJsZShpZDpzdHJpbmcpOiBQcm9taXNlPFN1YmFjY291bnRSZXNwb25zZURhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3QoYC92NS9hY2NvdW50cy9zdWJhY2NvdW50cy8ke2lkfS9kaXNhYmxlYClcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy5ib2R5KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJQm91bmNlIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgQm91bmNlRGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvdW5jZSBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSUJvdW5jZSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBlcnJvcjogc3RyaW5nO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBCb3VuY2VEYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5CT1VOQ0VTKTtcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgIHRoaXMuY29kZSA9ICtkYXRhLmNvZGU7XG4gICAgICB0aGlzLmVycm9yID0gZGF0YS5lcnJvcjtcbiAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJQ29tcGxhaW50IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgQ29tcGxhaW50RGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBsYWludCBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSUNvbXBsYWludCB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG4gICAgY29uc3RydWN0b3IoZGF0YTogQ29tcGxhaW50RGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuQ09NUExBSU5UUyk7XG4gICAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBwcmVzc2lvbiB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKHR5cGU6IFN1cHByZXNzaW9uTW9kZWxzKSB7XG4gICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4uL2NvbW1vbi9SZXF1ZXN0JztcblxuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4uL2NvbW1vbi9FcnJvcic7XG5pbXBvcnQgTmF2aWdhdGlvblRocnVQYWdlcyBmcm9tICcuLi9jb21tb24vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5pbXBvcnQgQm91bmNlIGZyb20gJy4vQm91bmNlJztcbmltcG9ydCBDb21wbGFpbnQgZnJvbSAnLi9Db21wbGFpbnQnO1xuaW1wb3J0IFVuc3Vic2NyaWJlIGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuaW1wb3J0IFdoaXRlTGlzdCBmcm9tICcuL1doaXRlTGlzdCc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5pbXBvcnQge1xuICBJQm91bmNlLFxuICBJQ29tcGxhaW50LFxuICBJU3VwcHJlc3Npb25DbGllbnQsXG4gIElVbnN1YnNjcmliZSxcbiAgSVdoaXRlTGlzdFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQge1xuICBTdXBwcmVzc2lvbkxpc3QsXG4gIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbkRhdGFUeXBlLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSxcbiAgU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCxcbiAgU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbkxpc3RRdWVyeSxcbiAgU3VwcHJlc3Npb25SZXNwb25zZSxcbiAgU3VwcHJlc3Npb25EZXN0cm95UmVzdWx0LFxuICBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuXG5jb25zdCBjcmVhdGVPcHRpb25zID0ge1xuICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwcHJlc3Npb25DbGllbnRcbiAgZXh0ZW5kcyBOYXZpZ2F0aW9uVGhydVBhZ2VzPFN1cHByZXNzaW9uTGlzdD5cbiAgaW1wbGVtZW50cyBJU3VwcHJlc3Npb25DbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBtb2RlbHM6IG9iamVjdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIocmVxdWVzdCk7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLm1vZGVscyA9IHtcbiAgICAgIGJvdW5jZXM6IEJvdW5jZSxcbiAgICAgIGNvbXBsYWludHM6IENvbXBsYWludCxcbiAgICAgIHVuc3Vic2NyaWJlczogVW5zdWJzY3JpYmUsXG4gICAgICB3aGl0ZWxpc3RzOiBXaGl0ZUxpc3QsXG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YTogU3VwcHJlc3Npb25EYXRhVHlwZSk6XG4gICAgICBJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3RcbiAgICB9XG4gICk6IFN1cHByZXNzaW9uTGlzdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIFN1cHByZXNzaW9uTGlzdDtcbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcz8ubWFwKChpdGVtKSA9PiBuZXcgTW9kZWwoaXRlbSkpIHx8IFtdO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMucGFyc2VQYWdlTGlua3MocmVzcG9uc2UsICc/JywgJ2FkZHJlc3MnKTtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIF9wYXJzZUl0ZW08VCBleHRlbmRzIFN1cHByZXNzaW9uPihcbiAgICBkYXRhIDogU3VwcHJlc3Npb25EYXRhVHlwZSxcbiAgICBNb2RlbDoge1xuICAgICAgbmV3KGRhdGFUeXBlOiBTdXBwcmVzc2lvbkRhdGFUeXBlKTpUXG4gICAgfVxuICApOiBUIHtcbiAgICByZXR1cm4gbmV3IE1vZGVsKGRhdGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVXaGl0ZUxpc3QoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgZGF0YTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgfCBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YVtdLFxuICAgIGlzRGF0YUFycmF5OiBib29sZWFuXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdD4ge1xuICAgIGlmIChpc0RhdGFBcnJheSkge1xuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgJ0RhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCcsXG4gICAgICAgICdXaGl0ZWxpc3RcXCdzIGNyZWF0aW9uIHByb2Nlc3MgZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBjcmVhdGlvbnMuIERhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCdcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAnd2hpdGVsaXN0cycpLCBkYXRhIGFzIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhKVxuICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVVbnN1YnNjcmliZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW11cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHsgLy8gVXNlciBwcm92aWRlZCBhbiBhcnJheVxuICAgICAgY29uc3QgaXNDb250YWluc1RhZyA9IGRhdGEuc29tZSgodW5zdWJzY3JpYmU6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhKSA9PiB1bnN1YnNjcmliZS50YWcpO1xuICAgICAgaWYgKGlzQ29udGFpbnNUYWcpIHtcbiAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgICAnVGFnIHByb3BlcnR5IHNob3VsZCBub3QgYmUgdXNlZCBmb3IgY3JlYXRpbmcgbXVsdGlwbGUgdW5zdWJzY3JpYmVzLicsXG4gICAgICAgICAgJ1RhZyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCBvbmx5IGlmIG9uZSB1bnN1YnNjcmliZSBwcm92aWRlZCBhcyBzZWNvbmQgYXJndW1lbnQgb2YgY3JlYXRlIG1ldGhvZC4gUGxlYXNlIHVzZSB0YWdzIGluc3RlYWQuJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgICAucG9zdCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3Vuc3Vic2NyaWJlcycpLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgY3JlYXRlT3B0aW9ucylcbiAgICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICAgIH1cblxuICAgIGlmIChkYXRhPy50YWdzKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAnVGFncyBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHVzZWQgZm9yIGNyZWF0aW5nIG9uZSB1bnN1YnNjcmliZS4nLFxuICAgICAgICAnVGFncyBwcm9wZXJ0eSBjYW4gYmUgdXNlZCBpZiB5b3UgcHJvdmlkZXMgYW4gYXJyYXkgb2YgdW5zdWJzY3JpYmVzIGFzIHNlY29uZCBhcmd1bWVudCBvZiBjcmVhdGUgbWV0aG9kLiBQbGVhc2UgdXNlIHRhZyBpbnN0ZWFkJ1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YS50YWcpKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAnVGFnIHByb3BlcnR5IGNhbiBub3QgYmUgYW4gYXJyYXknLFxuICAgICAgICAnUGxlYXNlIHVzZSBhcnJheSBvZiB1bnN1YnNjcmliZXMgYXMgc2Vjb25kIGFyZ3VtZW50IG9mIGNyZWF0ZSBtZXRob2QgdG8gYmUgYWJsZSB0byBwcm92aWRlIGZldyB0YWdzJ1xuICAgICAgKTtcbiAgICB9XG4gICAgLyogV2UgbmVlZCBGb3JtIERhdGEgZm9yIHVuc3Vic2NyaWJlcyBpZiB3ZSB3YW50IHRvIHN1cHBvcnQgdGhlIFwidGFnXCIgcHJvcGVydHkgKi9cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdFdpdGhGRCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3Vuc3Vic2NyaWJlcycpLCBkYXRhKVxuICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRNb2RlbCh0eXBlOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZSBpbiB0aGlzLm1vZGVscykge1xuICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW3R5cGUgYXMga2V5b2YgdHlwZW9mIHRoaXMubW9kZWxzXTtcbiAgICB9XG4gICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICdVbmtub3duIHR5cGUgdmFsdWUnLFxuICAgICAgJ1R5cGUgbWF5IGJlIG9ubHkgb25lIG9mIFtib3VuY2VzLCBjb21wbGFpbnRzLCB1bnN1YnNjcmliZXMsIHdoaXRlbGlzdHNdJ1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVSZXNwb25zZShyZXNwb25zZTogU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlKTogU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgIHR5cGU6IHJlc3BvbnNlLmJvZHkudHlwZSB8fCAnJyxcbiAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgbGlzdChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBTdXBwcmVzc2lvbkxpc3RRdWVyeVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uTGlzdD4ge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0TGlzdFdpdGhQYWdlcyh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIHF1ZXJ5LCBtb2RlbCk7XG4gIH1cblxuICBnZXQoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdD4ge1xuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAuZ2V0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBTdXBwcmVzc2lvblJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZUl0ZW08dHlwZW9mIG1vZGVsPihyZXNwb25zZS5ib2R5LCBtb2RlbCkpO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW11cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgdGhpcy5nZXRNb2RlbCh0eXBlKTtcbiAgICAvLyBzdXBwb3J0cyBhZGRpbmcgbXVsdGlwbGUgc3VwcHJlc3Npb25zIGJ5IGRlZmF1bHRcbiAgICBsZXQgcG9zdERhdGE7XG4gICAgY29uc3QgaXNEYXRhQXJyYXkgPSBBcnJheS5pc0FycmF5KGRhdGEpO1xuXG4gICAgaWYgKHR5cGUgPT09ICd3aGl0ZWxpc3RzJykge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlV2hpdGVMaXN0KGRvbWFpbiwgZGF0YSwgaXNEYXRhQXJyYXkpO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAndW5zdWJzY3JpYmVzJykge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVW5zdWJzY3JpYmUoZG9tYWluLCBkYXRhKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzRGF0YUFycmF5KSB7XG4gICAgICBwb3N0RGF0YSA9IFtkYXRhXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zdERhdGEgPSBbLi4uZGF0YV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3QodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBKU09OLnN0cmluZ2lmeShwb3N0RGF0YSksIGNyZWF0ZU9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQ+IHtcbiAgICB0aGlzLmdldE1vZGVsKHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5kZWxldGUodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5ib2R5LmFkZHJlc3MgfHwgJycsXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICB9KSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdXBwcmVzc2lvbkNsaWVudDtcbiIsImltcG9ydCB7IFN1cHByZXNzaW9uTW9kZWxzIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgSVVuc3Vic2NyaWJlIH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgVW5zdWJzY3JpYmVEYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcblxuaW1wb3J0IFN1cHByZXNzaW9uIGZyb20gJy4vU3VwcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbnN1YnNjcmliZSBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSVVuc3Vic2NyaWJlIHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgdGFnczogc3RyaW5nW107XG4gICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFVuc3Vic2NyaWJlRGF0YSkge1xuICAgICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuVU5TVUJTQ1JJQkVTKTtcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgIHRoaXMudGFncyA9IGRhdGEudGFncztcbiAgICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgU3VwcHJlc3Npb25Nb2RlbHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQgeyBJV2hpdGVMaXN0IH0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgV2hpdGVMaXN0RGF0YSB9IGZyb20gJy4uLy4uL1R5cGVzL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgU3VwcHJlc3Npb24gZnJvbSAnLi9TdXBwcmVzc2lvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdoaXRlTGlzdCBleHRlbmRzIFN1cHByZXNzaW9uIGltcGxlbWVudHMgSVdoaXRlTGlzdCB7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICByZWFzb246IHN0cmluZztcbiAgICBjcmVhdGVkQXQ6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBXaGl0ZUxpc3REYXRhKSB7XG4gICAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5XSElURUxJU1RTKTtcbiAgICAgIHRoaXMudmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgdGhpcy5yZWFzb24gPSBkYXRhLnJlYXNvbjtcbiAgICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpO1xuICAgIH1cbn1cbiIsImltcG9ydCBOYXZpZ2F0aW9uVGhydVBhZ2VzIGZyb20gJy4uL2NvbW1vbi9OYXZpZ2F0aW9uVGhydVBhZ2VzJztcbmltcG9ydCB7IEFQSVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0FwaVJlc3BvbnNlJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vY29tbW9uL1JlcXVlc3QnO1xuaW1wb3J0IHsgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHtcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0LFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JEYXRhLFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdCxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXNwb25zZSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RRdWVyeSxcbiAgTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhLFxuICBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkLFxuICBDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYlxufSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucy9NdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IEF0dGFjaG1lbnRzSGFuZGxlciBmcm9tICcuLi9jb21tb24vQXR0YWNobWVudHNIYW5kbGVyJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi9jb21tb24vRXJyb3InO1xuXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uSm9iIGltcGxlbWVudHMgTXVsdGlwbGVWYWxpZGF0aW9uSm9iUmVzdWx0IHtcbiAgY3JlYXRlZEF0OiBEYXRlO1xuICBpZDogc3RyaW5nO1xuICBxdWFudGl0eTogbnVtYmVyXG4gIHJlY29yZHNQcm9jZXNzZWQ6IG51bWJlciB8IG51bGw7XG4gIHN0YXR1czogc3RyaW5nO1xuICBkb3dubG9hZFVybD86IHtcbiAgICBjc3Y6IHN0cmluZztcbiAgICBqc29uOiBzdHJpbmc7XG4gIH07XG5cbiAgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXI7XG4gIHN1bW1hcnk/OiB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgICBjYXRjaEFsbDogbnVtYmVyO1xuICAgICAgICAgIGRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgZG9Ob3RTZW5kOiBudW1iZXI7XG4gICAgICAgICAgdW5kZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgIH07XG4gICAgICByaXNrOiB7XG4gICAgICAgICAgaGlnaDogbnVtYmVyO1xuICAgICAgICAgIGxvdzogbnVtYmVyO1xuICAgICAgICAgIG1lZGl1bTogbnVtYmVyO1xuICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkpvYkRhdGEsIHJlc3BvbnNlU3RhdHVzQ29kZTogbnVtYmVyKSB7XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xuICAgIHRoaXMucXVhbnRpdHkgPSBkYXRhLnF1YW50aXR5O1xuICAgIHRoaXMucmVjb3Jkc1Byb2Nlc3NlZCA9IGRhdGEucmVjb3Jkc19wcm9jZXNzZWQ7XG4gICAgdGhpcy5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICB0aGlzLnJlc3BvbnNlU3RhdHVzQ29kZSA9IHJlc3BvbnNlU3RhdHVzQ29kZTtcbiAgICBpZiAoZGF0YS5kb3dubG9hZF91cmwpIHtcbiAgICAgIHRoaXMuZG93bmxvYWRVcmwgPSB7XG4gICAgICAgIGNzdjogZGF0YS5kb3dubG9hZF91cmw/LmNzdixcbiAgICAgICAganNvbjogZGF0YS5kb3dubG9hZF91cmw/Lmpzb25cbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChkYXRhLnN1bW1hcnkpIHtcbiAgICAgIHRoaXMuc3VtbWFyeSA9IHtcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgY2F0Y2hBbGw6IGRhdGEuc3VtbWFyeS5yZXN1bHQuY2F0Y2hfYWxsLFxuICAgICAgICAgIGRlbGl2ZXJhYmxlOiBkYXRhLnN1bW1hcnkucmVzdWx0LmRlbGl2ZXJhYmxlLFxuICAgICAgICAgIGRvTm90U2VuZDogZGF0YS5zdW1tYXJ5LnJlc3VsdC5kb19ub3Rfc2VuZCxcbiAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBkYXRhLnN1bW1hcnkucmVzdWx0LnVuZGVsaXZlcmFibGUsXG4gICAgICAgICAgdW5rbm93bjogZGF0YS5zdW1tYXJ5LnJlc3VsdC51bmtub3duXG4gICAgICAgIH0sXG4gICAgICAgIHJpc2s6IHtcbiAgICAgICAgICBoaWdoOiBkYXRhLnN1bW1hcnkucmlzay5oaWdoLFxuICAgICAgICAgIGxvdzogZGF0YS5zdW1tYXJ5LnJpc2subG93LFxuICAgICAgICAgIG1lZGl1bTogZGF0YS5zdW1tYXJ5LnJpc2subWVkaXVtLFxuICAgICAgICAgIHVua25vd246IGRhdGEuc3VtbWFyeS5yaXNrLnVua25vd25cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50XG4gIGV4dGVuZHMgTmF2aWdhdGlvblRocnVQYWdlczxNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdD5cbiAgaW1wbGVtZW50cyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHJpdmF0ZSBhdHRhY2htZW50c0hhbmRsZXI6IEF0dGFjaG1lbnRzSGFuZGxlcjtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyID0gbmV3IEF0dGFjaG1lbnRzSGFuZGxlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVSZXNwb25zZTxUPihyZXNwb25zZTogQVBJUmVzcG9uc2UpOiBUIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAuLi5yZXNwb25zZT8uYm9keVxuICAgIH0gYXMgVDtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXJzZUxpc3QocmVzcG9uc2U6IE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzcG9uc2UpXG4gICAgOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0O1xuXG4gICAgZGF0YS5qb2JzID0gcmVzcG9uc2UuYm9keS5qb2JzLm1hcCgoam9iKSA9PiBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uSm9iKGpvYiwgcmVzcG9uc2Uuc3RhdHVzKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gdGhpcy5wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSwgJz8nLCAncGl2b3QnKTtcbiAgICBkYXRhLnRvdGFsID0gcmVzcG9uc2UuYm9keS50b3RhbDtcbiAgICBkYXRhLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgbGlzdChxdWVyeT86IE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnkpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdExpc3RXaXRoUGFnZXMoJy92NC9hZGRyZXNzL3ZhbGlkYXRlL2J1bGsnLCBxdWVyeSk7XG4gIH1cblxuICBhc3luYyBnZXQobGlzdElkOiBzdHJpbmcpOiBQcm9taXNlPE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKTtcbiAgICByZXR1cm4gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkpvYihyZXNwb25zZS5ib2R5LCByZXNwb25zZS5zdGF0dXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0VG9FeHBlY3RlZFNoYXBlKGRhdGE6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YSlcbiAgICA6IE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVVwZGF0ZWQge1xuICAgIGxldCBtdWx0aXBsZVZhbGlkYXRpb25EYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFVcGRhdGVkO1xuICAgIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihkYXRhLmZpbGUpKSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhLmZpbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiB7IGRhdGE6IGRhdGEuZmlsZSB9IH07XG4gICAgfSBlbHNlIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc1N0cmVhbShkYXRhLmZpbGUpKSB7XG4gICAgICBtdWx0aXBsZVZhbGlkYXRpb25EYXRhID0geyBtdWx0aXBsZVZhbGlkYXRpb25GaWxlOiBkYXRhLmZpbGUgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbXVsdGlwbGVWYWxpZGF0aW9uRGF0YSA9IHsgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZTogZGF0YS5maWxlIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG11bHRpcGxlVmFsaWRhdGlvbkRhdGE7XG4gIH1cblxuICBhc3luYyBjcmVhdGUoXG4gICAgbGlzdElkOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVWYWxpZGF0aW9uQ3JlYXRpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGlmICghZGF0YSB8fCAhZGF0YS5maWxlKSB7XG4gICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKCdcImZpbGVcIiBwcm9wZXJ0eSBleHBlY3RlZC4nLCAnTWFrZSBzdXJlIHNlY29uZCBhcmd1bWVudCBoYXMgXCJmaWxlXCIgcHJvcGVydHkuJyk7XG4gICAgfVxuICAgIGNvbnN0IG11bHRpcGxlVmFsaWRhdGlvbkRhdGEgPSB0aGlzLmNvbnZlcnRUb0V4cGVjdGVkU2hhcGUoZGF0YSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gLCBtdWx0aXBsZVZhbGlkYXRpb25EYXRhKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBkZXN0cm95KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKTtcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVSZXNwb25zZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj4ocmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJVmFsaWRhdGlvbkNsaWVudCwgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgVmFsaWRhdGlvblF1ZXJ5LCBWYWxpZGF0aW9uUmVzdWx0LCBWYWxpZGF0aW9uUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9WYWxpZGF0aW9ucyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRlQ2xpZW50IGltcGxlbWVudHMgSVZhbGlkYXRpb25DbGllbnQge1xuICBwdWJsaWMgbXVsdGlwbGVWYWxpZGF0aW9uO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDogSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5tdWx0aXBsZVZhbGlkYXRpb24gPSBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ7XG4gIH1cblxuICBhc3luYyBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgY29uc3QgcXVlcnk6IFZhbGlkYXRpb25RdWVyeSA9IHsgYWRkcmVzcyB9O1xuICAgIGNvbnN0IHJlc3VsdDogVmFsaWRhdGlvblJlc3BvbnNlID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUnLCBxdWVyeSk7XG4gICAgcmV0dXJuIHJlc3VsdC5ib2R5IGFzIFZhbGlkYXRpb25SZXN1bHQ7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7IFdlYmhvb2tzSWRzIH0gZnJvbSAnLi4vRW51bXMnO1xuaW1wb3J0IHsgSVdlYkhvb2tzQ2xpZW50IH0gZnJvbSAnLi4vSW50ZXJmYWNlcy9XZWJob29rcyc7XG5cbmltcG9ydCB7XG4gIFdlYmhvb2tWYWxpZGF0aW9uUmVzcG9uc2UsXG4gIFdlYmhvb2tMaXN0LFxuICBXZWJob29rUmVzcG9uc2UsXG4gIFdlYmhvb2tzUXVlcnksXG4gIFdlYmhvb2tSZXN1bHRcbn0gZnJvbSAnLi4vVHlwZXMvV2ViaG9va3MnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9jb21tb24vUmVxdWVzdCc7XG5cbmV4cG9ydCBjbGFzcyBXZWJob29rIGltcGxlbWVudHMgV2ViaG9va1Jlc3VsdCB7XG4gIGlkOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICB1cmxzOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZCwgdXJsczogc3RyaW5nW10pIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy51cmxzID0gdXJscztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJob29rc0NsaWVudCBpbXBsZW1lbnRzIElXZWJIb29rc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVdlYmhvb2tMaXN0KHJlc3BvbnNlOiB7IGJvZHk6IHsgd2ViaG9va3M6IFdlYmhvb2tMaXN0IH0gfSk6IFdlYmhvb2tMaXN0IHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keS53ZWJob29rcztcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tXaXRoSUQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2U6IFdlYmhvb2tSZXNwb25zZSk6IFdlYmhvb2tSZXN1bHQge1xuICAgICAgY29uc3Qgd2ViaG9va1Jlc3BvbnNlID0gcmVzcG9uc2U/LmJvZHk/LndlYmhvb2s7XG4gICAgICBsZXQgdXJsID0gd2ViaG9va1Jlc3BvbnNlPy51cmw7XG4gICAgICBsZXQgdXJscyA9IHdlYmhvb2tSZXNwb25zZT8udXJscztcbiAgICAgIGlmICghdXJsKSB7XG4gICAgICAgIHVybCA9IHVybHMgJiYgdXJscy5sZW5ndGhcbiAgICAgICAgICA/IHVybHNbMF1cbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmICgoIXVybHMgfHwgdXJscy5sZW5ndGggPT09IDApICYmIHVybCkge1xuICAgICAgICB1cmxzID0gW3VybF07XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFdlYmhvb2soaWQsIHVybCwgdXJscyBhcyBzdHJpbmdbXSk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlV2ViaG9va1Rlc3QocmVzcG9uc2U6IHsgYm9keTogeyBjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZyB9IH0pXG4gIDoge2NvZGU6IG51bWJlciwgbWVzc2FnZTpzdHJpbmd9IHtcbiAgICByZXR1cm4ge1xuICAgICAgY29kZTogcmVzcG9uc2UuYm9keS5jb2RlLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgfSBhcyBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlO1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk6IFdlYmhvb2tzUXVlcnkpOiBQcm9taXNlPFdlYmhvb2tMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCBxdWVyeSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va0xpc3QpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBpZDogV2ViaG9va3NJZHMpOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsXG4gICAgaWQ6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICB0ZXN0ID0gZmFsc2UpOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQgfCBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlPiB7XG4gICAgaWYgKHRlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCwgJ3Rlc3QnKSwgeyB1cmwgfSlcbiAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rVGVzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgeyBpZCwgdXJsIH0pXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZywgdXJsVmFsdWVzOiBzdHJpbmcgfCBzdHJpbmdbXSk6IFByb21pc2U8V2ViaG9va1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCksIHsgdXJsOiB1cmxWYWx1ZXMgfSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZykgOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCB7IEN1c3RvbUZpbGUsIEN1c3RvbUZpbGVEYXRhIH0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuaW1wb3J0IHsgQXR0YWNobWVudEluZm8sIFN0cmVhbVZhbHVlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uL0F0dGFjaG1lbnRzJztcblxuY2xhc3MgQmxvYkZyb21TdHJlYW0ge1xuICBwcml2YXRlIF9zdHJlYW06IFJlYWRhYmxlXG4gIHNpemU6IG51bWJlclxuXG4gIGNvbnN0cnVjdG9yKHN0cmVhbTogUmVhZGFibGUsIHNpemU6IG51bWJlcikge1xuICAgIHRoaXMuX3N0cmVhbSA9IHN0cmVhbTtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICB9XG5cbiAgc3RyZWFtKCkge1xuICAgIHJldHVybiB0aGlzLl9zdHJlYW07XG4gIH1cblxuICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgcmV0dXJuICdCbG9iJztcbiAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50c0hhbmRsZXIge1xuICBwcml2YXRlIGdldEF0dGFjaG1lbnRPcHRpb25zKGl0ZW06IHtcbiAgICBmaWxlbmFtZT86IHN0cmluZztcbiAgICBjb250ZW50VHlwZT8gOiBzdHJpbmc7XG4gICAga25vd25MZW5ndGg/OiBudW1iZXI7XG4gIH0pOiBBdHRhY2htZW50SW5mbyB7XG4gICAgY29uc3Qge1xuICAgICAgZmlsZW5hbWUsXG4gICAgICBjb250ZW50VHlwZSxcbiAgICAgIGtub3duTGVuZ3RoLFxuICAgIH0gPSBpdGVtO1xuICAgIHJldHVybiB7XG4gICAgICAuLi4oZmlsZW5hbWUgPyB7IGZpbGVuYW1lIH0gOiB7IGZpbGVuYW1lOiAnZmlsZScgfSksXG4gICAgICAuLi4oY29udGVudFR5cGUgJiYgeyBjb250ZW50VHlwZSB9KSxcbiAgICAgIC4uLihrbm93bkxlbmd0aCAmJiB7IGtub3duTGVuZ3RoIH0pXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmlsZUluZm8oZmlsZTogRmlsZSkgeyAvLyBicm93c2VyIGNvbXBsaWFudCBmaWxlXG4gICAgY29uc3Qge1xuICAgICAgbmFtZTogZmlsZW5hbWUsXG4gICAgICB0eXBlOiBjb250ZW50VHlwZSxcbiAgICAgIHNpemU6IGtub3duTGVuZ3RoLFxuICAgIH0gPSBmaWxlO1xuICAgIHJldHVybiB0aGlzLmdldEF0dGFjaG1lbnRPcHRpb25zKHsgZmlsZW5hbWUsIGNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q3VzdG9tRmlsZUluZm8oZmlsZTogQ3VzdG9tRmlsZSkgeyAvLyBjdXN0b20gY3JlYXRlZCBmaWxlXG4gICAgY29uc3Qge1xuICAgICAgZmlsZW5hbWUsXG4gICAgICBjb250ZW50VHlwZSxcbiAgICAgIGtub3duTGVuZ3RoLFxuICAgIH0gPSBmaWxlO1xuICAgIHJldHVybiB0aGlzLmdldEF0dGFjaG1lbnRPcHRpb25zKHsgZmlsZW5hbWUsIGNvbnRlbnRUeXBlLCBrbm93bkxlbmd0aCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QnVmZmVySW5mbyhidWZmZXI6IEJ1ZmZlcikge1xuICAgIGNvbnN0IHtcbiAgICAgIGJ5dGVMZW5ndGg6IGtub3duTGVuZ3RoLFxuICAgIH0gPSBidWZmZXI7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0YWNobWVudE9wdGlvbnMoeyBmaWxlbmFtZTogJ2ZpbGUnLCBjb250ZW50VHlwZTogJycsIGtub3duTGVuZ3RoIH0pO1xuICB9XG5cbiAgcHVibGljIGlzU3RyZWFtKGRhdGE6IHVua25vd24pIDogZGF0YSBpcyBTdHJlYW1WYWx1ZSB7XG4gICAgcmV0dXJuIHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgKGRhdGEgYXMgU3RyZWFtVmFsdWUpLnBpcGUgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICBwdWJsaWMgaXNDdXN0b21GaWxlKG9iajogdW5rbm93bik6IG9iaiBpcyBDdXN0b21GaWxlIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbiAgICAgICYmICEhKG9iaiBhcyBDdXN0b21GaWxlKS5kYXRhO1xuICB9XG5cbiAgcHVibGljIGlzQnJvd3NlckZpbGUob2JqOiB1bmtub3duKTogb2JqIGlzIEZpbGUge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAoISEob2JqIGFzIEZpbGUpLm5hbWUgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSk7XG4gIH1cblxuICBwdWJsaWMgaXNCdWZmZXIoZGF0YTogdW5rbm93bik6IGRhdGEgaXMgQnVmZmVyIHtcbiAgICByZXR1cm4gdHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQnVmZmVyLmlzQnVmZmVyKGRhdGEpO1xuICB9XG5cbiAgcHVibGljIGdldEF0dGFjaG1lbnRJbmZvKFxuICAgIGF0dGFjaG1lbnQ6IEN1c3RvbUZpbGUgfCBGaWxlIHwgc3RyaW5nIHwgQ3VzdG9tRmlsZURhdGFcbiAgKTogQXR0YWNobWVudEluZm8ge1xuICAgIGNvbnN0IGlzQnJvd3NlckZpbGUgPSB0aGlzLmlzQnJvd3NlckZpbGUoYXR0YWNobWVudCk7XG4gICAgY29uc3QgaXNDdXN0b21GaWxlID0gdGhpcy5pc0N1c3RvbUZpbGUoYXR0YWNobWVudCk7XG4gICAgY29uc3QgaXNTdHJpbmcgPSB0eXBlb2YgYXR0YWNobWVudCA9PT0gJ3N0cmluZyc7XG4gICAgaWYgKCFpc1N0cmluZykge1xuICAgICAgaWYgKGlzQnJvd3NlckZpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsZUluZm8oYXR0YWNobWVudCBhcyBGaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBCdWZmZXIuaXNCdWZmZXIoYXR0YWNobWVudCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QnVmZmVySW5mbyhhdHRhY2htZW50IGFzIEJ1ZmZlcik7XG4gICAgICB9XG4gICAgICBpZiAoaXNDdXN0b21GaWxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEN1c3RvbUZpbGVJbmZvKGF0dGFjaG1lbnQgYXMgQ3VzdG9tRmlsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9uczogQXR0YWNobWVudEluZm8gPSB7XG4gICAgICBmaWxlbmFtZTogJ2ZpbGUnLFxuICAgICAgY29udGVudFR5cGU6IHVuZGVmaW5lZCxcbiAgICAgIGtub3duTGVuZ3RoOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgcHVibGljIGNvbnZlcnRUb0ZEZXhwZWN0ZWRTaGFwZShcbiAgICB1c2VyUHJvdmlkZWRWYWx1ZTogQ3VzdG9tRmlsZSB8IEZpbGUgfCBzdHJpbmcgfCBDdXN0b21GaWxlRGF0YVxuICApIHtcbiAgICBjb25zdCBpc1N0cmVhbSA9IHRoaXMuaXNTdHJlYW0odXNlclByb3ZpZGVkVmFsdWUpO1xuICAgIGNvbnN0IGlzQnJvd3NlckZpbGUgPSB0aGlzLmlzQnJvd3NlckZpbGUodXNlclByb3ZpZGVkVmFsdWUpO1xuICAgIGNvbnN0IGlzQ3VzdG9tRmlsZSA9IHRoaXMuaXNDdXN0b21GaWxlKHVzZXJQcm92aWRlZFZhbHVlKTtcbiAgICBjb25zdCBpc1N0cmluZyA9IHR5cGVvZiB1c2VyUHJvdmlkZWRWYWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAoaXNTdHJlYW0gfHwgaXNTdHJpbmcgfHwgaXNCcm93c2VyRmlsZSB8fCB0aGlzLmlzQnVmZmVyKHVzZXJQcm92aWRlZFZhbHVlKSkge1xuICAgICAgcmVzdWx0ID0gdXNlclByb3ZpZGVkVmFsdWU7XG4gICAgfSBlbHNlIGlmIChpc0N1c3RvbUZpbGUpIHtcbiAgICAgIHJlc3VsdCA9IHVzZXJQcm92aWRlZFZhbHVlLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEFQSUVycm9yLmdldFVzZXJEYXRhRXJyb3IoXG4gICAgICAgIGBVbmtub3duIGF0dGFjaG1lbnQgdHlwZSAke3R5cGVvZiB1c2VyUHJvdmlkZWRWYWx1ZX1gLFxuICAgICAgICBgVGhlIFwiYXR0YWNobWVudFwiIHByb3BlcnR5IGV4cGVjdHMgZWl0aGVyIEJ1ZmZlciwgQmxvYiwgb3IgU3RyaW5nLlxuICAgICAgICAgIEFsc28sIEl0IGlzIHBvc3NpYmxlIHRvIHByb3ZpZGUgYW4gb2JqZWN0IHRoYXQgaGFzIHRoZSBwcm9wZXJ0eSBcImRhdGFcIiB3aXRoIGEgdmFsdWUgdGhhdCBpcyBlcXVhbCB0byBvbmUgb2YgdGhlIHR5cGVzIGNvdW50ZWQgYmVmb3JlLlxuICAgICAgICAgIEFkZGl0aW9uYWxseSwgeW91IG1heSB1c2UgYW4gYXJyYXkgdG8gc2VuZCBtb3JlIHRoYW4gb25lIGF0dGFjaG1lbnQuYFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRCbG9iRnJvbVN0cmVhbShzdHJlYW06IFJlYWRhYmxlLCBzaXplOiBudW1iZXIpOiBCbG9iRnJvbVN0cmVhbSB7XG4gICAgcmV0dXJuIG5ldyBCbG9iRnJvbVN0cmVhbShzdHJlYW0sIHNpemUpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0dGFjaG1lbnRzSGFuZGxlcjtcbiIsImltcG9ydCB7IEFQSUVycm9yT3B0aW9ucywgQVBJRXJyb3JUeXBlIH0gZnJvbSAnLi4vLi4vVHlwZXMvQ29tbW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBJRXJyb3IgZXh0ZW5kcyBFcnJvciBpbXBsZW1lbnRzIEFQSUVycm9yVHlwZSB7XG4gIHB1YmxpYyBzdGF0dXM6IG51bWJlciA7XG4gIHB1YmxpYyBzdGFjazogc3RyaW5nO1xuICBwdWJsaWMgZGV0YWlsczogc3RyaW5nO1xuICBwdWJsaWMgdHlwZTogc3RyaW5nO1xuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0VXNlckRhdGFFcnJvcihzdGF0dXNUZXh0OiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgdGhpcyh7XG4gICAgICBzdGF0dXM6IDQwMCxcbiAgICAgIHN0YXR1c1RleHQsXG4gICAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2VcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBzdGF0dXMsXG4gICAgc3RhdHVzVGV4dCxcbiAgICBtZXNzYWdlLFxuICAgIGJvZHkgPSB7fVxuICB9OiBBUElFcnJvck9wdGlvbnMpIHtcbiAgICBsZXQgYm9keU1lc3NhZ2UgPSAnJztcbiAgICBsZXQgZXJyb3IgPSAnJztcbiAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBib2R5TWVzc2FnZSA9IGJvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHlNZXNzYWdlID0gYm9keT8ubWVzc2FnZSB8fCAnJztcbiAgICAgIGVycm9yID0gYm9keT8uZXJyb3IgfHwgJyc7XG4gICAgfVxuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBlcnJvciB8fCBzdGF0dXNUZXh0IHx8ICcnO1xuICAgIHRoaXMuZGV0YWlscyA9IGJvZHlNZXNzYWdlO1xuICAgIHRoaXMudHlwZSA9ICdNYWlsZ3VuQVBJRXJyb3InO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCB7IFJlYWRhYmxlIH0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCB7IEZvcm1EYXRhSW5wdXQsIElucHV0Rm9ybURhdGEgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuXG5pbXBvcnQge1xuICBDdXN0b21GaWxlLFxuICBDdXN0b21GaWxlRGF0YSxcbiAgRm9ybURhdGFJbnB1dFZhbHVlLFxuICBNZXNzYWdlQXR0YWNobWVudCxcbiAgTWltZU1lc3NhZ2Vcbn0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuaW1wb3J0IEF0dGFjaG1lbnRzSGFuZGxlciBmcm9tICcuL0F0dGFjaG1lbnRzSGFuZGxlcic7XG5pbXBvcnQgeyBBdHRhY2htZW50SW5mbyB9IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbi9BdHRhY2htZW50cyc7XG5cbmNsYXNzIEZvcm1EYXRhQnVpbGRlciB7XG4gIHByaXZhdGUgRm9ybURhdGFDb25zdHJ1Y3RvcjogSW5wdXRGb3JtRGF0YTtcbiAgcHJpdmF0ZSBmaWxlS2V5czogc3RyaW5nW107XG4gIHByaXZhdGUgYXR0YWNobWVudHNIYW5kbGVyOiBBdHRhY2htZW50c0hhbmRsZXI7XG5cbiAgY29uc3RydWN0b3IoRm9ybURhdGFDb25zdHJ1Y3RvcjogSW5wdXRGb3JtRGF0YSkge1xuICAgIHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvciA9IEZvcm1EYXRhQ29uc3RydWN0b3I7XG4gICAgdGhpcy5maWxlS2V5cyA9IFsnYXR0YWNobWVudCcsICdpbmxpbmUnLCAnbXVsdGlwbGVWYWxpZGF0aW9uRmlsZSddO1xuICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyID0gbmV3IEF0dGFjaG1lbnRzSGFuZGxlcigpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUZvcm1EYXRhKGRhdGE6IEZvcm1EYXRhSW5wdXQpOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRhdGEgb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGZvcm1EYXRhOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSA9IE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGRhdGFba2V5XTsgfSlcbiAgICAgIC5yZWR1Y2UoKGZvcm1EYXRhQWNjOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSwga2V5KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmZpbGVLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICBjb25zdCBhdHRhY2htZW50VmFsdWUgPSBkYXRhW2tleV07XG4gICAgICAgICAgaWYgKHRoaXMuaXNNZXNzYWdlQXR0YWNobWVudChhdHRhY2htZW50VmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEZpbGVzVG9GRChrZXksIGF0dGFjaG1lbnRWYWx1ZSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBBUElFcnJvci5nZXRVc2VyRGF0YUVycm9yKFxuICAgICAgICAgICAgYFVua25vd24gdmFsdWUgJHtkYXRhW2tleV19IHdpdGggdHlwZSAke3R5cGVvZiBkYXRhW2tleV19IGZvciBwcm9wZXJ0eSBcIiR7a2V5fVwiYCxcbiAgICAgICAgICAgIGBUaGUga2V5IFwiJHtrZXl9XCIgc2hvdWxkIGhhdmUgdHlwZSBvZiBCdWZmZXIsIFN0cmVhbSwgRmlsZSwgb3IgU3RyaW5nIGBcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ21lc3NhZ2UnKSB7IC8vIG1pbWUgbWVzc2FnZVxuICAgICAgICAgIGNvbnN0IG1lc3NhZ2VWYWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgICBpZiAoIW1lc3NhZ2VWYWx1ZSB8fCAhdGhpcy5pc01JTUUobWVzc2FnZVZhbHVlKSkge1xuICAgICAgICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgICAgICAgYFVua25vd24gZGF0YSB0eXBlIGZvciBcIiR7a2V5fVwiIHByb3BlcnR5YCxcbiAgICAgICAgICAgICAgJ1RoZSBtaW1lIGRhdGEgc2hvdWxkIGhhdmUgdHlwZSBvZiBCdWZmZXIsIFN0cmluZyBvciBCbG9iJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRNaW1lRGF0YVRvRkQoa2V5LCBtZXNzYWdlVmFsdWUsIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZENvbW1vblByb3BlcnR5VG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICB9LCBuZXcgdGhpcy5Gb3JtRGF0YUNvbnN0cnVjdG9yKCkpO1xuICAgIHJldHVybiBmb3JtRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkTWltZURhdGFUb0ZEKFxuICAgIGtleTogc3RyaW5nLFxuICAgIGRhdGE6IE1pbWVNZXNzYWdlLFxuICAgIGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHsgLy8gaWYgc3RyaW5nIG9ubHkgdHdvIHBhcmFtZXRlcnMgc2hvdWxkIGJlIHVzZWQuXG4gICAgICBmb3JtRGF0YUluc3RhbmNlLmFwcGVuZChrZXksIGRhdGEgYXMgc3RyaW5nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YUluc3RhbmNlKSkgeyAvLyBmb3JtLWRhdGEgcGFja2FnZSBpcyB1c2VkXG4gICAgICBjb25zdCBub2RlRm9ybURhdGEgPSBmb3JtRGF0YUluc3RhbmNlIGFzIE5vZGVGb3JtRGF0YTtcbiAgICAgIG5vZGVGb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhLCB7IGZpbGVuYW1lOiAnTWltZU1lc3NhZ2UnIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkKSB7IC8vIGVpdGhlciBub2RlID4gMTggb3IgYnJvd3NlclxuICAgICAgY29uc3QgYnJvd3NlckZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZSBhcyBGb3JtRGF0YTsgLy8gQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGFcbiAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YSwgJ01pbWVNZXNzYWdlJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihkYXRhKSkgeyAvLyBub2RlIGVudmlyb25tZW50XG4gICAgICAgIGNvbnN0IGJsb2JJbnN0YW5jZSA9IG5ldyBCbG9iKFtkYXRhXSk7XG4gICAgICAgIGJyb3dzZXJGb3JtRGF0YS5hcHBlbmQoa2V5LCBibG9iSW5zdGFuY2UsICdNaW1lTWVzc2FnZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc01JTUUoZGF0YTogdW5rbm93bikgOiBkYXRhIGlzIE1pbWVNZXNzYWdlIHtcbiAgICByZXR1cm4gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnXG4gICAgICB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGRhdGEgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNCdWZmZXIoZGF0YSlcbiAgICAgIHx8ICh0eXBlb2YgUmVhZGFibGVTdHJlYW0gIT09ICd1bmRlZmluZWQnICYmIGRhdGEgaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbSk7XG4gIH1cblxuICBwcml2YXRlIGlzRm9ybURhdGFQYWNrYWdlKG9iajogdW5rbm93bik6IG9iaiBpcyBOb2RlRm9ybURhdGEge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xuICAgICAgJiYgb2JqICE9PSBudWxsXG4gICAgICAmJiB0eXBlb2YgKG9iaiBhcyBOb2RlRm9ybURhdGEpLmdldEhlYWRlcnMgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICBwcml2YXRlIGlzTWVzc2FnZUF0dGFjaG1lbnQodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBNZXNzYWdlQXR0YWNobWVudCB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQ3VzdG9tRmlsZSh2YWx1ZSlcbiAgICAgIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcbiAgICAgIHx8ICh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBGaWxlKVxuICAgICAgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcih2YWx1ZSlcbiAgICAgIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKHZhbHVlKVxuICAgICAgfHwgKFxuICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5ldmVyeShcbiAgICAgICAgICAoaXRlbSkgPT4gdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNDdXN0b21GaWxlKGl0ZW0pXG4gICAgICAgICAgICB8fCAodHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gaW5zdGFuY2VvZiBGaWxlKVxuICAgICAgICAgICAgfHwgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5pc0J1ZmZlcihpdGVtKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuaXNTdHJlYW0oaXRlbSlcbiAgICAgICAgKVxuICAgICAgKVxuXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkRmlsZXNUb0ZEKFxuICAgIHByb3BlcnR5TmFtZTogdHlwZW9mIHRoaXMuZmlsZUtleXNbbnVtYmVyXSxcbiAgICB2YWx1ZTogTWVzc2FnZUF0dGFjaG1lbnQsXG4gICAgZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYXBwZW5kRmlsZVRvRkQgPSAoXG4gICAgICBvcmlnaW5hbEtleTogc3RyaW5nLFxuICAgICAgYXR0YWNobWVudDogQ3VzdG9tRmlsZSB8IEZpbGUgfCBzdHJpbmd8IEN1c3RvbUZpbGVEYXRhLFxuICAgICAgZm9ybURhdGE6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICAgKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBvcmlnaW5hbEtleSA9PT0gJ211bHRpcGxlVmFsaWRhdGlvbkZpbGUnID8gJ2ZpbGUnIDogb3JpZ2luYWxLZXk7XG4gICAgICBjb25zdCBvYmpEYXRhID0gdGhpcy5hdHRhY2htZW50c0hhbmRsZXIuY29udmVydFRvRkRleHBlY3RlZFNoYXBlKGF0dGFjaG1lbnQpO1xuICAgICAgY29uc3Qgb3B0aW9uczogQXR0YWNobWVudEluZm8gPSB0aGlzLmF0dGFjaG1lbnRzSGFuZGxlci5nZXRBdHRhY2htZW50SW5mbyhhdHRhY2htZW50KTtcblxuICAgICAgaWYgKHRoaXMuaXNGb3JtRGF0YVBhY2thZ2UoZm9ybURhdGEpKSB7XG4gICAgICAgIGNvbnN0IGZkID0gZm9ybURhdGEgYXMgTm9kZUZvcm1EYXRhO1xuICAgICAgICBjb25zdCBkYXRhID0gdHlwZW9mIG9iakRhdGEgPT09ICdzdHJpbmcnID8gQnVmZmVyLmZyb20ob2JqRGF0YSkgOiBvYmpEYXRhO1xuICAgICAgICBmZC5hcHBlbmQoa2V5LCBkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIEJsb2IgIT09IHVuZGVmaW5lZCkgeyAvLyBlaXRoZXIgbm9kZSA+IDE4IG9yIGJyb3dzZXJcbiAgICAgICAgY29uc3QgYnJvd3NlckZvcm1EYXRhID0gZm9ybURhdGFJbnN0YW5jZSBhcyBGb3JtRGF0YTsgLy8gQnJvd3NlciBjb21wbGlhbnQgRm9ybURhdGFcblxuICAgICAgICBpZiAodHlwZW9mIG9iakRhdGEgPT09ICdzdHJpbmcnIHx8IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzQnVmZmVyKG9iakRhdGEpKSB7XG4gICAgICAgICAgY29uc3QgYmxvYkluc3RhbmNlID0gbmV3IEJsb2IoW29iakRhdGFdKTtcbiAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgYmxvYkluc3RhbmNlLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqRGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICBicm93c2VyRm9ybURhdGEuYXBwZW5kKGtleSwgb2JqRGF0YSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmlzU3RyZWFtKG9iakRhdGEpKSB7XG4gICAgICAgICAgY29uc3QgYmxvYiA9IHRoaXMuYXR0YWNobWVudHNIYW5kbGVyLmdldEJsb2JGcm9tU3RyZWFtKFxuICAgICAgICAgICAgb2JqRGF0YSBhcyB1bmtub3duIGFzIFJlYWRhYmxlLFxuICAgICAgICAgICAgb3B0aW9ucy5rbm93bkxlbmd0aCBhcyBudW1iZXJcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyb3dzZXJGb3JtRGF0YS5zZXQoa2V5LCBibG9iIGFzIHVua25vd24gYXMgRmlsZSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgaXRlbSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCB2YWx1ZSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRDb21tb25Qcm9wZXJ0eVRvRkQoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgdmFsdWU6IEZvcm1EYXRhSW5wdXRWYWx1ZSxcbiAgICBmb3JtRGF0YUFjYzogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYWRkVmFsdWVCYXNlZE9uRkQgPSAoZmRLZXk6IHN0cmluZywgZmRWYWx1ZTogRm9ybURhdGFJbnB1dFZhbHVlKTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy5pc0Zvcm1EYXRhUGFja2FnZShmb3JtRGF0YUFjYykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmZFZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgcmVjZWl2ZWQgdmFsdWUgaXMgYW4gb2JqZWN0LiBcXG4nXG4gICAgICAgICAgKyAnXCJKU09OLlN0cmluZ2lmeVwiIHdpbGwgYmUgdXNlZCB0byBhdm9pZCBUeXBlRXJyb3IgXFxuJ1xuICAgICAgICAgICsgJ1RvIHJlbW92ZSB0aGlzIHdhcm5pbmc6IFxcbidcbiAgICAgICAgICArICdDb25zaWRlciBzd2l0Y2hpbmcgdG8gYnVpbHQtaW4gRm9ybURhdGEgb3IgY29udmVydGluZyB0aGUgdmFsdWUgb24geW91ciBvd24uXFxuJyk7XG4gICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjLmFwcGVuZChmZEtleSwgSlNPTi5zdHJpbmdpZnkoZmRWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIGZkVmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBmZFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZm9ybURhdGFBY2MuYXBwZW5kKGZkS2V5LCBmZFZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gdW5kZWZpbmVkICYmIGZkVmFsdWUgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYy5hcHBlbmQoZmRLZXksIGZkVmFsdWUpO1xuICAgICAgfVxuICAgICAgdGhyb3cgQVBJRXJyb3IuZ2V0VXNlckRhdGFFcnJvcihcbiAgICAgICAgJ1Vua25vd24gdmFsdWUgdHlwZSBmb3IgRm9ybSBEYXRhLiBTdHJpbmcgb3IgQmxvYiBleHBlY3RlZCcsXG4gICAgICAgICdCcm93c2VyIGNvbXBsaWFudCBGb3JtRGF0YSBhbGxvd3Mgb25seSBzdHJpbmcgb3IgQmxvYiB2YWx1ZXMgZm9yIHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IGF0dGFjaG1lbnRzLidcbiAgICAgICk7XG4gICAgfTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogRm9ybURhdGFJbnB1dFZhbHVlKSB7XG4gICAgICAgIGFkZFZhbHVlQmFzZWRPbkZEKGtleSwgaXRlbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIGFkZFZhbHVlQmFzZWRPbkZEKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRm9ybURhdGFCdWlsZGVyO1xuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vRXJyb3InO1xuXG5pbXBvcnQge1xuICBQYWdlc0xpc3RBY2N1bXVsYXRvcixcbiAgUGFyc2VkUGFnZSxcbiAgUGFyc2VkUGFnZXNMaXN0LFxuICBRdWVyeVdpdGhQYWdlLFxuICBSZXNwb25zZVdpdGhQYWdpbmcsXG4gIFVwZGF0ZWRVcmxBbmRRdWVyeSxcbiAgQVBJRXJyb3JPcHRpb25zXG59IGZyb20gJy4uLy4uL1R5cGVzL0NvbW1vbic7XG5pbXBvcnQge1xuICBJQm91bmNlLFxuICBJQ29tcGxhaW50LFxuICBJVW5zdWJzY3JpYmUsXG4gIElXaGl0ZUxpc3Rcbn0gZnJvbSAnLi4vLi4vSW50ZXJmYWNlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9SZXF1ZXN0JztcbmltcG9ydCB7XG4gIFN1cHByZXNzaW9uRGF0YVR5cGVcbn0gZnJvbSAnLi4vLi4vVHlwZXMvU3VwcHJlc3Npb25zJztcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgTmF2aWdhdGlvblRocnVQYWdlcyA8VD4ge1xuICByZXF1ZXN0PzogUmVxdWVzdDtcbiAgY29uc3RydWN0b3IocmVxdWVzdD86IFJlcXVlc3QpIHtcbiAgICBpZiAocmVxdWVzdCkge1xuICAgICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VQYWdlKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcGFnZVVybDogc3RyaW5nLFxuICAgIHVybFNlcGFyYXRvcjogc3RyaW5nLFxuICAgIGl0ZXJhdG9yTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4gICkgOiBQYXJzZWRQYWdlIHtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKHBhZ2VVcmwpO1xuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBwYXJzZWRVcmw7XG5cbiAgICBjb25zdCBwYWdlVmFsdWUgPSBwYWdlVXJsICYmIHR5cGVvZiBwYWdlVXJsID09PSAnc3RyaW5nJyA/IHBhZ2VVcmwuc3BsaXQodXJsU2VwYXJhdG9yKS5wb3AoKSB8fCAnJyA6ICcnO1xuICAgIGxldCBpdGVyYXRvclBvc2l0aW9uID0gbnVsbDtcbiAgICBpZiAoaXRlcmF0b3JOYW1lKSB7XG4gICAgICBpdGVyYXRvclBvc2l0aW9uID0gc2VhcmNoUGFyYW1zLmhhcyhpdGVyYXRvck5hbWUpXG4gICAgICAgID8gc2VhcmNoUGFyYW1zLmdldChpdGVyYXRvck5hbWUpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaWQsXG4gICAgICBwYWdlOiB1cmxTZXBhcmF0b3IgPT09ICc/JyA/IGA/JHtwYWdlVmFsdWV9YCA6IHBhZ2VWYWx1ZSxcbiAgICAgIGl0ZXJhdG9yUG9zaXRpb24sXG4gICAgICB1cmw6IHBhZ2VVcmxcbiAgICB9IGFzIFBhcnNlZFBhZ2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VQYWdlTGlua3MoXG4gICAgcmVzcG9uc2U6IFJlc3BvbnNlV2l0aFBhZ2luZyxcbiAgICB1cmxTZXBhcmF0b3I6IHN0cmluZyxcbiAgICBpdGVyYXRvck5hbWU/OiBzdHJpbmdcbiAgKTogUGFyc2VkUGFnZXNMaXN0IHtcbiAgICBjb25zdCBwYWdlcyA9IE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlLmJvZHkucGFnaW5nKTtcbiAgICByZXR1cm4gcGFnZXMucmVkdWNlKFxuICAgICAgKGFjYzogUGFnZXNMaXN0QWNjdW11bGF0b3IsIFtpZCwgcGFnZVVybF06IFsgaWQ6IHN0cmluZywgcGFnZVVybDogc3RyaW5nXSkgPT4ge1xuICAgICAgICBhY2NbaWRdID0gdGhpcy5wYXJzZVBhZ2UoaWQsIHBhZ2VVcmwsIHVybFNlcGFyYXRvciwgaXRlcmF0b3JOYW1lKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9XG4gICAgKSBhcyB1bmtub3duIGFzIFBhcnNlZFBhZ2VzTGlzdDtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVXJsQW5kUXVlcnkoY2xpZW50VXJsOiBzdHJpbmcsIHF1ZXJ5PzogUXVlcnlXaXRoUGFnZSk6IFVwZGF0ZWRVcmxBbmRRdWVyeSB7XG4gICAgbGV0IHVybCA9IGNsaWVudFVybDtcbiAgICBjb25zdCBxdWVyeUNvcHkgPSB7IC4uLnF1ZXJ5IH07XG4gICAgaWYgKHF1ZXJ5Q29weS5wYWdlKSB7XG4gICAgICB1cmwgPSB1cmxqb2luKGNsaWVudFVybCwgcXVlcnlDb3B5LnBhZ2UpO1xuICAgICAgZGVsZXRlIHF1ZXJ5Q29weS5wYWdlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdXJsLFxuICAgICAgdXBkYXRlZFF1ZXJ5OiBxdWVyeUNvcHlcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIHJlcXVlc3RMaXN0V2l0aFBhZ2VzKGNsaWVudFVybDpzdHJpbmcsIHF1ZXJ5PzogUXVlcnlXaXRoUGFnZSwgTW9kZWw/OiB7XG4gICAgbmV3KGRhdGE6IFN1cHByZXNzaW9uRGF0YVR5cGUpOlxuICAgIElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdFxuICB9KTogUHJvbWlzZTxUPiB7XG4gICAgY29uc3QgeyB1cmwsIHVwZGF0ZWRRdWVyeSB9ID0gdGhpcy51cGRhdGVVcmxBbmRRdWVyeShjbGllbnRVcmwsIHF1ZXJ5KTtcbiAgICBpZiAodGhpcy5yZXF1ZXN0KSB7XG4gICAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nID0gYXdhaXQgdGhpcy5yZXF1ZXN0LmdldCh1cmwsIHVwZGF0ZWRRdWVyeSk7XG4gICAgICAvLyBNb2RlbCBoZXJlIGlzIHVzdWFsbHkgdW5kZWZpbmVkIGV4Y2VwdCBmb3IgU3VwcHJlc3Npb24gQ2xpZW50XG4gICAgICByZXR1cm4gdGhpcy5wYXJzZUxpc3QocmVzcG9uc2UsIE1vZGVsKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgIHN0YXR1czogNTAwLFxuICAgICAgc3RhdHVzVGV4dDogJ1JlcXVlc3QgcHJvcGVydHkgaXMgZW1wdHknLFxuICAgICAgYm9keTogeyBtZXNzYWdlOiAnJyB9XG4gICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHBhcnNlTGlzdChyZXNwb25zZTogUmVzcG9uc2VXaXRoUGFnaW5nLCBNb2RlbD86IHtcbiAgICBuZXcoZGF0YTogU3VwcHJlc3Npb25EYXRhVHlwZSk6XG4gICAgSUJvdW5jZSB8IElDb21wbGFpbnQgfCBJVW5zdWJzY3JpYmUgfCBJV2hpdGVMaXN0XG4gIH0pOiBUO1xufVxuIiwiaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gJ2Jhc2UtNjQnO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IGF4aW9zLCB7XG4gIEF4aW9zRXJyb3IsXG4gIEF4aW9zUmVzcG9uc2UsXG4gIEF4aW9zSGVhZGVycyxcbiAgUmF3QXhpb3NSZXF1ZXN0SGVhZGVycyxcbiAgQXhpb3NQcm94eUNvbmZpZyxcbn0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0ICogYXMgTm9kZUZvcm1EYXRhIGZyb20gJ2Zvcm0tZGF0YSc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9FcnJvcic7XG5pbXBvcnQge1xuICBPbkNhbGxSZXF1ZXN0T3B0aW9ucyxcbiAgUmVxdWVzdE9wdGlvbnMsXG4gIEFQSUVycm9yT3B0aW9ucyxcbiAgSW5wdXRGb3JtRGF0YSxcbiAgQVBJUmVzcG9uc2UsXG4gIElwUG9vbERlbGV0ZURhdGEsXG4gIEZvcm1EYXRhSW5wdXRcbn0gZnJvbSAnLi4vLi4vVHlwZXMnO1xuXG5pbXBvcnQgRm9ybURhdGFCdWlsZGVyIGZyb20gJy4vRm9ybURhdGFCdWlsZGVyJztcbmltcG9ydCBTdWJhY2NvdW50c0NsaWVudCBmcm9tICcuLi9TdWJhY2NvdW50cyc7XG5cbmNsYXNzIFJlcXVlc3Qge1xuICBwcml2YXRlIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUga2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgdXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgdGltZW91dDogbnVtYmVyO1xuICBwcml2YXRlIGhlYWRlcnM6IEF4aW9zSGVhZGVycztcbiAgcHJpdmF0ZSBmb3JtRGF0YUJ1aWxkZXI6IEZvcm1EYXRhQnVpbGRlcjtcbiAgcHJpdmF0ZSBtYXhCb2R5TGVuZ3RoOiBudW1iZXI7XG4gIHByaXZhdGUgcHJveHk6IEF4aW9zUHJveHlDb25maWcgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogUmVxdWVzdE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy51c2VybmFtZSA9IG9wdGlvbnMudXNlcm5hbWU7XG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIGFzIHN0cmluZztcbiAgICB0aGlzLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XG4gICAgdGhpcy5oZWFkZXJzID0gdGhpcy5tYWtlSGVhZGVyc0Zyb21PYmplY3Qob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB0aGlzLmZvcm1EYXRhQnVpbGRlciA9IG5ldyBGb3JtRGF0YUJ1aWxkZXIoZm9ybURhdGEpO1xuICAgIHRoaXMubWF4Qm9keUxlbmd0aCA9IDUyNDI4ODAwOyAvLyA1MCBNQlxuICAgIHRoaXMucHJveHkgPSBvcHRpb25zPy5wcm94eTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgb25DYWxsT3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24gfCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBvcHRpb25zOiBPbkNhbGxSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub25DYWxsT3B0aW9ucyB9O1xuICAgIGRlbGV0ZSBvcHRpb25zPy5oZWFkZXJzO1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gdGhpcy5qb2luQW5kVHJhbnNmb3JtSGVhZGVycyhvbkNhbGxPcHRpb25zKTtcbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLm9wdGlvbnMgfTtcblxuICAgIGlmIChvcHRpb25zPy5xdWVyeSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvcHRpb25zPy5xdWVyeSkubGVuZ3RoID4gMCkge1xuICAgICAgcGFyYW1zLnBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeSk7XG4gICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zPy5ib2R5KSB7XG4gICAgICBjb25zdCBib2R5ID0gb3B0aW9ucz8uYm9keTtcbiAgICAgIHBhcmFtcy5kYXRhID0gYm9keTtcbiAgICAgIGRlbGV0ZSBwYXJhbXMuYm9keTtcbiAgICB9XG4gICAgbGV0IHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlO1xuICAgIGNvbnN0IHVybFZhbHVlID0gdXJsam9pbih0aGlzLnVybCwgdXJsKTtcblxuICAgIHRyeSB7XG4gICAgICByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6IG1ldGhvZC50b0xvY2FsZVVwcGVyQ2FzZSgpLFxuICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgIHVybDogdXJsVmFsdWUsXG4gICAgICAgIGhlYWRlcnM6IHJlcXVlc3RIZWFkZXJzLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICAgIG1heEJvZHlMZW5ndGg6IHRoaXMubWF4Qm9keUxlbmd0aCxcbiAgICAgICAgcHJveHk6IHRoaXMucHJveHksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICAgIGNvbnN0IGVycm9yUmVzcG9uc2UgPSBlcnIgYXMgQXhpb3NFcnJvcjtcblxuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgc3RhdHVzOiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uc3RhdHVzIHx8IDQwMCxcbiAgICAgICAgc3RhdHVzVGV4dDogZXJyb3JSZXNwb25zZT8ucmVzcG9uc2U/LnN0YXR1c1RleHQgfHwgZXJyb3JSZXNwb25zZS5jb2RlLFxuICAgICAgICBib2R5OiBlcnJvclJlc3BvbnNlPy5yZXNwb25zZT8uZGF0YSB8fCBlcnJvclJlc3BvbnNlLm1lc3NhZ2VcbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmdldFJlc3BvbnNlQm9keShyZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlcyBhcyBBUElSZXNwb25zZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlOiBBeGlvc1Jlc3BvbnNlKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IHJlcyA9IHtcbiAgICAgIGJvZHk6IHt9LFxuICAgICAgc3RhdHVzOiByZXNwb25zZT8uc3RhdHVzXG4gICAgfSBhcyBBUElSZXNwb25zZTtcblxuICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhID09PSAnTWFpbGd1biBNYWduaWZpY2VudCBBUEknKSB7XG4gICAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgICAgc3RhdHVzVGV4dDogJ0luY29ycmVjdCB1cmwnLFxuICAgICAgICAgIGJvZHk6IHJlc3BvbnNlLmRhdGFcbiAgICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcmVzLmJvZHkgPSB7XG4gICAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmRhdGFcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5ib2R5ID0gcmVzcG9uc2UuZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHByaXZhdGUgam9pbkFuZFRyYW5zZm9ybUhlYWRlcnMoXG4gICAgb25DYWxsT3B0aW9ucz86IE9uQ2FsbFJlcXVlc3RPcHRpb25zXG4gICk6IEF4aW9zSGVhZGVycyB7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBuZXcgQXhpb3NIZWFkZXJzKCk7XG5cbiAgICBjb25zdCBiYXNpYyA9IGJhc2U2NC5lbmNvZGUoYCR7dGhpcy51c2VybmFtZX06JHt0aGlzLmtleX1gKTtcbiAgICByZXF1ZXN0SGVhZGVycy5zZXRBdXRob3JpemF0aW9uKGBCYXNpYyAke2Jhc2ljfWApO1xuICAgIHJlcXVlc3RIZWFkZXJzLnNldCh0aGlzLmhlYWRlcnMpO1xuXG4gICAgY29uc3QgcmVjZWl2ZWRPbkNhbGxIZWFkZXJzID0gb25DYWxsT3B0aW9ucyAmJiBvbkNhbGxPcHRpb25zLmhlYWRlcnM7XG4gICAgY29uc3Qgb25DYWxsSGVhZGVycyA9IHRoaXMubWFrZUhlYWRlcnNGcm9tT2JqZWN0KHJlY2VpdmVkT25DYWxsSGVhZGVycyk7XG4gICAgcmVxdWVzdEhlYWRlcnMuc2V0KG9uQ2FsbEhlYWRlcnMpO1xuICAgIHJldHVybiByZXF1ZXN0SGVhZGVycztcbiAgfVxuXG4gIHByaXZhdGUgbWFrZUhlYWRlcnNGcm9tT2JqZWN0KFxuICAgIGhlYWRlcnNPYmplY3Q6IFJhd0F4aW9zUmVxdWVzdEhlYWRlcnMgPSB7fVxuICApOiBBeGlvc0hlYWRlcnMge1xuICAgIGxldCByZXF1ZXN0SGVhZGVycyA9IG5ldyBBeGlvc0hlYWRlcnMoKTtcbiAgICByZXF1ZXN0SGVhZGVycyA9IE9iamVjdC5lbnRyaWVzKGhlYWRlcnNPYmplY3QpLnJlZHVjZShcbiAgICAgIChoZWFkZXJzQWNjdW11bGF0b3I6IEF4aW9zSGVhZGVycywgY3VycmVudFBhaXIpID0+IHtcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gY3VycmVudFBhaXI7XG4gICAgICAgIGhlYWRlcnNBY2N1bXVsYXRvci5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiBoZWFkZXJzQWNjdW11bGF0b3I7XG4gICAgICB9LCByZXF1ZXN0SGVhZGVyc1xuICAgICk7XG4gICAgcmV0dXJuIHJlcXVlc3RIZWFkZXJzO1xuICB9XG5cbiAgc2V0U3ViYWNjb3VudEhlYWRlcihzdWJhY2NvdW50SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGhlYWRlcnMgPSB0aGlzLm1ha2VIZWFkZXJzRnJvbU9iamVjdCh7XG4gICAgICAuLi50aGlzLmhlYWRlcnMsXG4gICAgICBbU3ViYWNjb3VudHNDbGllbnQuU1VCQUNDT1VOVF9IRUFERVJdOiBzdWJhY2NvdW50SWRcbiAgICB9KTtcbiAgICB0aGlzLmhlYWRlcnMuc2V0KGhlYWRlcnMpO1xuICB9XG5cbiAgcmVzZXRTdWJhY2NvdW50SGVhZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuaGVhZGVycy5kZWxldGUoU3ViYWNjb3VudHNDbGllbnQuU1VCQUNDT1VOVF9IRUFERVIpO1xuICB9XG5cbiAgcXVlcnkoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IEFycmF5PEFycmF5PHN0cmluZz4+LFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgeyBxdWVyeSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIGNvbW1hbmQoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgUmVjb3JkPHN0cmluZywgdW5rbm93bj5bXSB8IHN0cmluZyB8IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhLFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgICBhZGREZWZhdWx0SGVhZGVycyA9IHRydWVcbiAgKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGxldCBoZWFkZXJzID0ge307XG4gICAgaWYgKGFkZERlZmF1bHRIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzID0geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfTtcbiAgICB9XG4gICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAuLi5oZWFkZXJzLFxuICAgICAgYm9keTogZGF0YSxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICByZXF1ZXN0T3B0aW9uc1xuICAgICk7XG4gIH1cblxuICBnZXQoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IEFycmF5PEFycmF5PHN0cmluZz4+LFxuICAgIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkoJ2dldCcsIHVybCwgcXVlcnksIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBzdHJpbmcsXG4gICAgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG4gICk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3RXaXRoRkQoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YTogRm9ybURhdGFJbnB1dFxuICApOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBmb3JtRGF0YSwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnIH1cbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICBwdXRXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IEZvcm1EYXRhSW5wdXQpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmZvcm1EYXRhQnVpbGRlci5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHBhdGNoV2l0aEZEKHVybDogc3RyaW5nLCBkYXRhOiBGb3JtRGF0YUlucHV0KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5mb3JtRGF0YUJ1aWxkZXIuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncGF0Y2gnLCB1cmwsIGZvcm1EYXRhLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScgfVxuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHB1dCh1cmw6IHN0cmluZywgZGF0YT86IEZvcm1EYXRhSW5wdXQgfCBzdHJpbmcsIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcbiAgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZSh1cmw6IHN0cmluZywgZGF0YT86IElwUG9vbERlbGV0ZURhdGEpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgnZGVsZXRlJywgdXJsLCBkYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIiwiZXhwb3J0IGVudW0gUmVzb2x1dGlvbiB7XG4gICAgSE9VUiA9ICdob3VyJyxcbiAgICBEQVkgPSAnZGF5JyxcbiAgICBNT05USCA9ICdtb250aCdcbn1cblxuZXhwb3J0IGVudW0gU3VwcHJlc3Npb25Nb2RlbHMge1xuICAgIEJPVU5DRVMgPSAnYm91bmNlcycsXG4gICAgQ09NUExBSU5UUyA9ICdjb21wbGFpbnRzJyxcbiAgICBVTlNVQlNDUklCRVMgPSAndW5zdWJzY3JpYmVzJyxcbiAgICBXSElURUxJU1RTID0gJ3doaXRlbGlzdHMnXG59XG5cbmV4cG9ydCBlbnVtIFdlYmhvb2tzSWRzIHtcbiAgICBDTElDS0VEID0gJ2NsaWNrZWQnLFxuICAgIENPTVBMQUlORUQgPSAnY29tcGxhaW5lZCcsXG4gICAgREVMSVZFUkVEID0gJ2RlbGl2ZXJlZCcsXG4gICAgT1BFTkVEID0gJ29wZW5lZCcsXG4gICAgUEVSTUFORU5UX0ZBSUwgPSAncGVybWFuZW50X2ZhaWwnLFxuICAgIFRFTVBPUkFSWV9GQUlMID0gJ3RlbXBvcmFyeV9mYWlsJyxcbiAgICBVTlNVQlNDUklCRUQgPSAndW5zdWJzY3JpYmUnLFxufVxuXG5leHBvcnQgZW51bSBZZXNObyB7XG4gICAgWUVTID0gJ3llcycsXG4gICAgTk8gPSAnbm8nXG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIElMb2dnZXIge1xuICB3YXJuKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWRcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTG9nZ2VyJztcbiIsImltcG9ydCB7XG4gIERvbWFpbkNyZWRlbnRpYWxzLFxuICBEb21haW5DcmVkZW50aWFsc0xpc3QsXG4gIERvbWFpbkNyZWRlbnRpYWxzUXVlcnksXG4gIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0LFxuICBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpbkNyZWRlbnRpYWxzIHtcbiAgICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeTogRG9tYWluQ3JlZGVudGlhbHNRdWVyeSk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNMaXN0PlxuICAgIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogRG9tYWluQ3JlZGVudGlhbHNcbiAgICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PlxuICAgIHVwZGF0ZShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZyxcbiAgICAgICAgZGF0YTogVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG4gICAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD5cbiAgICBkZXN0cm95KFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD5cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHsgUmVzb2x1dGlvbiB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7XG4gIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24sXG4gIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdzSXRlbSxcbiAgRG9tYWluVGFnc0xpc3QsXG4gIERvbWFpblRhZ3NNZXNzYWdlUmVzLFxuICBEb21haW5UYWdzU3RhdGlzdGljUXVlcnksXG4gIERvbWFpblRhZ1N0YXRpc3RpY0l0ZW1cbn0gZnJvbSAnLi4vLi4vVHlwZXMvRG9tYWlucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdCB7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBzdGFydDogRGF0ZTtcbiAgICBlbmQ6IERhdGU7XG4gICAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgICBzdGF0czogRG9tYWluVGFnU3RhdGlzdGljSXRlbVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5UYWdzQ2xpZW50IHtcbiAgICBsaXN0KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzTGlzdD5cbiAgICBnZXQoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzSXRlbT5cbiAgICB1cGRhdGUoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyxcbiAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZ1xuICAgICk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+XG4gICAgZGVzdHJveShcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz5cbiAgICBzdGF0aXN0aWMoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyxcbiAgICAgICAgcXVlcnk6IERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeVxuICAgICk6IFByb21pc2U8SURvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdD5cbiAgICBjb3VudHJpZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbj5cbiAgICBwcm92aWRlcnMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbj5cbiAgICBkZXZpY2VzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uPlxufVxuIiwiaW1wb3J0IHtcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBEb21haW5UZW1wbGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlc1F1ZXJ5LFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGEsXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGEsXG4gIERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGEsXG4gIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0LFxuICBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQsXG4gIE5vdGlmaWNhdGlvblJlc3VsdCxcbiAgU2hvcnRUZW1wbGF0ZVZlcnNpb24sXG4gIFRlbXBsYXRlUXVlcnksXG4gIFRlbXBsYXRlVmVyc2lvbixcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdFxufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluVGVtcGxhdGUge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbiAgICBjcmVhdGVkQnk6IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHZlcnNpb24/OiBUZW1wbGF0ZVZlcnNpb247XG4gICAgdmVyc2lvbnM/OiBTaG9ydFRlbXBsYXRlVmVyc2lvbltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEb21haW5UZW1wbGF0ZXNDbGllbnQge1xuICAgIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ+XG4gICAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgcXVlcnk/OiBUZW1wbGF0ZVF1ZXJ5KTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+XG4gICAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBEb21haW5UZW1wbGF0ZURhdGEpOiBQcm9taXNlPElEb21haW5UZW1wbGF0ZT5cbiAgICB1cGRhdGUoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhXG4gICAgKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PlxuICAgIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PlxuICAgIGRlc3Ryb3lBbGwoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE5vdGlmaWNhdGlvblJlc3VsdD5cbiAgICBjcmVhdGVWZXJzaW9uKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGFcbiAgICApIDogUHJvbWlzZTxDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+XG4gICAgZ2V0VmVyc2lvbihkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxJRG9tYWluVGVtcGxhdGU+XG4gICAgdXBkYXRlVmVyc2lvbihcbiAgICAgICAgZG9tYWluOiBzdHJpbmcsXG4gICAgICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgICAgICB0YWc6IHN0cmluZyxcbiAgICAgICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YVxuICAgICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PlxuICAgIGRlc3Ryb3lWZXJzaW9uKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHRhZzogc3RyaW5nKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+XG4gICAgbGlzdFZlcnNpb25zKFxuICAgICAgICBkb21haW46IHN0cmluZyxcbiAgICAgICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0PlxufVxuIiwiaW1wb3J0IHsgQVBJUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9UeXBlcy9Db21tb24nO1xuaW1wb3J0IHtcbiAgQ2xpY2tUcmFja2luZ0luZm8sXG4gIENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIERLSU1TZWxlY3RvckluZm8sXG4gIERvbWFpbkluZm8sXG4gIERvbWFpbnNRdWVyeSxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBEb21haW5VcGRhdGVJbmZvLFxuICBNZXNzYWdlUmVzcG9uc2UsXG4gIE9wZW5UcmFja2luZ0luZm8sXG4gIFJlcGxhY2VtZW50Rm9yUG9vbCxcbiAgVERvbWFpbixcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MsXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFVwZGF0ZWRPcGVuVHJhY2tpbmcsXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgV2ViUHJlZml4SW5mb1xufSBmcm9tICcuLi8uLi9UeXBlcy9Eb21haW5zJztcbmltcG9ydCB7IElEb21haW5DcmVkZW50aWFscyB9IGZyb20gJy4vRG9tYWluQ3JlZGVudGlhbHMnO1xuaW1wb3J0IHsgSURvbWFpblRhZ3NDbGllbnQgfSBmcm9tICcuL0RvbWFpblRhZ3MnO1xuaW1wb3J0IHsgSURvbWFpblRlbXBsYXRlc0NsaWVudCB9IGZyb20gJy4vRG9tYWluVGVtcGxhdGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBJRG9tYWluc0NsaWVudCB7XG4gICAgZG9tYWluQ3JlZGVudGlhbHM6IElEb21haW5DcmVkZW50aWFsc1xuICAgIGRvbWFpblRlbXBsYXRlczogSURvbWFpblRlbXBsYXRlc0NsaWVudFxuICAgIGRvbWFpblRhZ3M6IElEb21haW5UYWdzQ2xpZW50XG4gICAgbGlzdChxdWVyeT86IERvbWFpbnNRdWVyeSk6IFByb21pc2U8VERvbWFpbltdPlxuICAgIGdldChkb21haW46IHN0cmluZyk6IFByb21pc2U8VERvbWFpbj5cbiAgICBjcmVhdGUoZGF0YTogRG9tYWluSW5mbyk6IFByb21pc2U8VERvbWFpbj5cbiAgICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERvbWFpblVwZGF0ZUluZm8pOiBQcm9taXNlPFREb21haW4+XG4gICAgdmVyaWZ5KGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxURG9tYWluPlxuICAgIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT5cbiAgICBnZXRDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxDb25uZWN0aW9uU2V0dGluZ3M+XG4gICAgdXBkYXRlQ29ubmVjdGlvbihkb21haW46IHN0cmluZywgZGF0YTogQ29ubmVjdGlvblNldHRpbmdzKTogUHJvbWlzZTxVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzPlxuICAgIGdldFRyYWNraW5nKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UcmFja2luZ0RhdGE+XG4gICAgdXBkYXRlVHJhY2tpbmcoXG4gICAgICAgIGRvbWFpbjogc3RyaW5nLFxuICAgICAgICB0eXBlOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IE9wZW5UcmFja2luZ0luZm8gfCBDbGlja1RyYWNraW5nSW5mbyB8IFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvXG4gICAgKTogUHJvbWlzZTxVcGRhdGVkT3BlblRyYWNraW5nPlxuICAgIGdldElwcyhkb21haW46IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+XG4gICAgYXNzaWduSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPlxuICAgIGRlbGV0ZUlwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgbGlua0lwUG9vbChkb21haW46IHN0cmluZywgcG9vbF9pZDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT5cbiAgICB1bmxpbmtJcFBvbGwoZG9tYWluOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBSZXBsYWNlbWVudEZvclBvb2wpOiBQcm9taXNlPEFQSVJlc3BvbnNlPlxuICAgIHVwZGF0ZURLSU1BdXRob3JpdHkoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERLSU1BdXRob3JpdHlJbmZvKTogUHJvbWlzZTxVcGRhdGVkREtJTUF1dGhvcml0eT5cbiAgICB1cGRhdGVES0lNU2VsZWN0b3IoZG9tYWluOiBzdHJpbmcsIGRhdGE6IERLSU1TZWxlY3RvckluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNU2VsZWN0b3JSZXNwb25zZT5cbiAgICB1cGRhdGVXZWJQcmVmaXgoZG9tYWluOiBzdHJpbmcsIGRhdGE6IFdlYlByZWZpeEluZm8pOiBQcm9taXNlPFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZT5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vRG9tYWluQ3JlZGVudGlhbHMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UYWdzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGVtcGxhdGVzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluc0NsaWVudCc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuaW1wb3J0IHsgRXZlbnRzTGlzdCwgRXZlbnRzUXVlcnkgfSBmcm9tICcuLi8uLi9UeXBlcy9FdmVudHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElFdmVudENsaWVudCB7XG4gIGdldChkb21haW46IHN0cmluZywgcXVlcnk/OiBFdmVudHNRdWVyeSkgOiBQcm9taXNlPEV2ZW50c0xpc3Q+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lFdmVudENsaWVudCc7XG4iLCJpbXBvcnQge1xuICBJcFBvb2xDcmVhdGVEYXRhLCBJcFBvb2xDcmVhdGVSZXN1bHQsXG4gIElwUG9vbERlbGV0ZURhdGEsIElwUG9vbExpc3RSZXN1bHQsXG4gIElwUG9vbE1lc3NhZ2VSZXN1bHQsIElwUG9vbFVwZGF0ZURhdGFcbn0gZnJvbSAnLi4vLi4vVHlwZXMvSVBQb29scyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUlQUG9vbHNDbGllbnQge1xuICBsaXN0KCk6IFByb21pc2U8SXBQb29sTGlzdFJlc3VsdD5cbiAgY3JlYXRlKGRhdGE6IElwUG9vbENyZWF0ZURhdGEpOiBQcm9taXNlPElwUG9vbENyZWF0ZVJlc3VsdD5cbiAgdXBkYXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xVcGRhdGVEYXRhKTogUHJvbWlzZTxJcFBvb2xNZXNzYWdlUmVzdWx0PlxuICBkZWxldGUocG9vbElkOiBzdHJpbmcsIGRhdGE6IElwUG9vbERlbGV0ZURhdGEpOiBQcm9taXNlPElwUG9vbE1lc3NhZ2VSZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lJUFBvb2xzQ2xpZW50JztcbiIsImltcG9ydCB7IElwRGF0YSwgSVBzTGlzdFF1ZXJ5LCBJcHNMaXN0UmVzcG9uc2VCb2R5IH0gZnJvbSAnLi4vLi4vVHlwZXMvSVBzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSVBzQ2xpZW50IHtcbiAgbGlzdChxdWVyeTogSVBzTGlzdFF1ZXJ5KTogUHJvbWlzZTxJcHNMaXN0UmVzcG9uc2VCb2R5PlxuICBnZXQoaXA6IHN0cmluZyk6IFByb21pc2U8SXBEYXRhPlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JSVBzQ2xpZW50JztcbiIsImltcG9ydCB7IEluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNSZXN1bHQsIEluYm94UGxhY2VtZW50c1ZhbHVlc1Jlc3VsdCB9IGZyb20gJy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQge1xuICBsaXN0KCk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc1Jlc3VsdD47XG4gIGdldChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1ZhbHVlc1Jlc3VsdD47XG59XG4iLCJpbXBvcnQgeyBJbmJveFBsYWNlbWVudHNGaWx0ZXJzUmVzdWx0IH0gZnJvbSAnLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudCB7XG4gIGxpc3QoKTogUHJvbWlzZTxJbmJveFBsYWNlbWVudHNGaWx0ZXJzUmVzdWx0PlxufVxuIiwiaW1wb3J0IHsgSW5ib3hQbGFjZW1lbnRzRGF0YSwgSW5ib3hQbGFjZW1lbnRzVGVzdFJlc3VsdCB9IGZyb20gJy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzUmVzdWx0c0NsaWVudCB9IGZyb20gJy4vUmVzdWx0cy9JbmJveFBsYWNlbWVudHNSZXN1bHRzJztcbmltcG9ydCB7IElTZWVkc0xpc3RzQ2xpZW50IH0gZnJvbSAnLi9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQnO1xuaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c1Byb3ZpZGVyc0NsaWVudCB9IGZyb20gJy4vcHJvdmlkZXJzL0luYm94UGxhY2VtZW50c1Byb3ZpZGVycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUluYm94UGxhY2VtZW50c0NsaWVudCB7XG4gICAgc2VlZHNMaXN0czogSVNlZWRzTGlzdHNDbGllbnQ7XG4gICAgcmVzdWx0czogSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQ7XG4gICAgcHJvdmlkZXJzOiBJSW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50O1xuICAgIHJ1blRlc3QoZGF0YTogSW5ib3hQbGFjZW1lbnRzRGF0YSk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzVGVzdFJlc3VsdD47XG59XG4iLCJpbXBvcnQge1xuICBJbmJveFBsYWNlbWVudHNEZXN0cm95UmVzdWx0LFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRXaXRoU3RhdHVzLFxuICBJbmJveFBsYWNlbWVudHNSZXN1bHRzTGlzdCxcbiAgSW5ib3hQbGFjZW1lbnRzUmVzdWx0c1F1ZXJ5XG59IGZyb20gJy4uLy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCB9IGZyb20gJy4uL0F0dHJpYnV0ZXNDbGllbnQnO1xuaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQgfSBmcm9tICcuLi9GaWx0ZXJzQ2xpZW50JztcbmltcG9ydCB7IElJUFJTaGFyaW5nQ2xpZW50IH0gZnJvbSAnLi9JbmJveFBsYWNlbWVudHNSZXN1bHRzU2hhcmluZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnQge1xuICBzaGFyaW5nOiBJSVBSU2hhcmluZ0NsaWVudDtcbiAgYXR0cmlidXRlczogSUluYm94UGxhY2VtZW50c0F0dHJpYnV0ZXNDbGllbnQ7XG4gIGZpbHRlcnM6IElJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50O1xuICBsaXN0KHF1ZXJ5OiBJbmJveFBsYWNlbWVudHNSZXN1bHRzUXVlcnkpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Jlc3VsdHNMaXN0PjtcbiAgZ2V0KGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzUmVzdWx0V2l0aFN0YXR1cz47XG4gIGRlc3Ryb3koaWQ6IHN0cmluZyk6IFByb21pc2U8SW5ib3hQbGFjZW1lbnRzRGVzdHJveVJlc3VsdD47XG4gIGdldFJlc3VsdEJ5U2hhcmVJZChzaGFyZUlkOiBzdHJpbmcpOiBQcm9taXNlPEluYm94UGxhY2VtZW50c1Jlc3VsdFdpdGhTdGF0dXM+O1xufVxuIiwiaW1wb3J0IHtcbiAgSVBSU2hhcmluZ1Jlc3VsdCxcbiAgSVBSU2hhcmluZ1VwZGF0ZURhdGEsXG4gIElQUlNoYXJpbmdVcGRhdGVSZXN1bHRcbn0gZnJvbSAnLi4vLi4vLi4vVHlwZXMvSW5ib3hQbGFjZW1lbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJSVBSU2hhcmluZ0NsaWVudCB7XG4gIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxJUFJTaGFyaW5nUmVzdWx0PjtcbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IElQUlNoYXJpbmdVcGRhdGVEYXRhKTogUHJvbWlzZTxJUFJTaGFyaW5nVXBkYXRlUmVzdWx0Pjtcbn1cbiIsImltcG9ydCB7XG4gIFNlZWRMaXN0UmVzdWx0LFxuICBTZWVkc0xpc3RzQ3JlYXRpbmdEYXRhLFxuICBTZWVkc0xpc3RzRGVzdHJveUFwaVJlc3BvbnNlLFxuICBTZWVkc0xpc3RzUXVlcnksXG4gIFNlZWRzTGlzdHNSZXN1bHQsXG4gIFNlZWRzTGlzdHNVcGRhdGluZ0RhdGEsXG59IGZyb20gJy4uLy4uLy4uL1R5cGVzL0luYm94UGxhY2VtZW50cyc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzQXR0cmlidXRlc0NsaWVudCB9IGZyb20gJy4uL0F0dHJpYnV0ZXNDbGllbnQnO1xuaW1wb3J0IHsgSUluYm94UGxhY2VtZW50c0ZpbHRlcnNDbGllbnQgfSBmcm9tICcuLi9GaWx0ZXJzQ2xpZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBJU2VlZHNMaXN0c0NsaWVudCB7XG4gIGF0dHJpYnV0ZXM6IElJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50O1xuICBmaWx0ZXJzOiBJSW5ib3hQbGFjZW1lbnRzRmlsdGVyc0NsaWVudDtcbiAgbGlzdChxdWVyeTogU2VlZHNMaXN0c1F1ZXJ5KTogUHJvbWlzZTxTZWVkc0xpc3RzUmVzdWx0PjtcbiAgZ2V0KGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8U2VlZExpc3RSZXN1bHQ+O1xuICBjcmVhdGUoZGF0YTogU2VlZHNMaXN0c0NyZWF0aW5nRGF0YSk6IFByb21pc2U8U2VlZExpc3RSZXN1bHQ+O1xuICB1cGRhdGUoYWRkcmVzczogc3RyaW5nLCBkYXRhOiBTZWVkc0xpc3RzVXBkYXRpbmdEYXRhKTogUHJvbWlzZTxTZWVkTGlzdFJlc3VsdD47XG4gIGRlc3Ryb3koYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxTZWVkc0xpc3RzRGVzdHJveUFwaVJlc3BvbnNlPjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSW5ib3hQbGFjZW1lbnRzQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vQXR0cmlidXRlc0NsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL0ZpbHRlcnNDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9TZWVkc0xpc3RzL1NlZWRzTGlzdHNDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9SZXN1bHRzL0luYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nJztcbiIsImltcG9ydCB7IElXZWJIb29rc0NsaWVudCB9IGZyb20gJy4uL1dlYmhvb2tzJztcbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHsgSURvbWFpbnNDbGllbnQgfSBmcm9tICcuLi9Eb21haW5zJztcbmltcG9ydCB7IElFdmVudENsaWVudCB9IGZyb20gJy4uL0V2ZW50Q2xpZW50JztcbmltcG9ydCB7IElTdGF0c0NsaWVudCB9IGZyb20gJy4uL1N0YXRzJztcbmltcG9ydCB7IElNZXNzYWdlc0NsaWVudCB9IGZyb20gJy4uL01lc3NhZ2VzJztcbmltcG9ydCB7IElTdXBwcmVzc2lvbkNsaWVudCB9IGZyb20gJy4uL1N1cHByZXNzaW9ucyc7XG5pbXBvcnQgeyBJUm91dGVzQ2xpZW50IH0gZnJvbSAnLi4vUm91dGVzJztcbmltcG9ydCB7IElWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi4vVmFsaWRhdGlvbnMnO1xuaW1wb3J0IHsgSUlQc0NsaWVudCB9IGZyb20gJy4uL0lQcyc7XG5pbXBvcnQgeyBJSVBQb29sc0NsaWVudCB9IGZyb20gJy4uL0lQUG9vbHMnO1xuaW1wb3J0IHsgSU1haWxpbmdMaXN0c0NsaWVudCB9IGZyb20gJy4uL01haWxpbmdMaXN0cyc7XG5pbXBvcnQgeyBJU3ViYWNjb3VudHNDbGllbnQgfSBmcm9tICcuLi9TdWJhY2NvdW50cyc7XG5pbXBvcnQgeyBJSW5ib3hQbGFjZW1lbnRzQ2xpZW50IH0gZnJvbSAnLi4vSW5ib3hQbGFjZW1lbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFpbGd1bkNsaWVudCB7XG4gICAgZG9tYWluczogSURvbWFpbnNDbGllbnQ7XG4gICAgd2ViaG9va3M6IElXZWJIb29rc0NsaWVudDtcbiAgICBldmVudHM6IElFdmVudENsaWVudDtcbiAgICBzdGF0czogSVN0YXRzQ2xpZW50O1xuICAgIHN1cHByZXNzaW9uczogSVN1cHByZXNzaW9uQ2xpZW50O1xuICAgIG1lc3NhZ2VzOiBJTWVzc2FnZXNDbGllbnQ7XG4gICAgcm91dGVzOiBJUm91dGVzQ2xpZW50O1xuICAgIHZhbGlkYXRlOiBJVmFsaWRhdGlvbkNsaWVudDtcbiAgICBpcHM6IElJUHNDbGllbnQ7XG4gICAgaXBfcG9vbHM6IElJUFBvb2xzQ2xpZW50O1xuICAgIGxpc3RzOiBJTWFpbGluZ0xpc3RzQ2xpZW50O1xuICAgIHN1YmFjY291bnRzOiBJU3ViYWNjb3VudHNDbGllbnQ7XG4gICAgaW5ib3hfcGxhY2VtZW50czogSUluYm94UGxhY2VtZW50c0NsaWVudDtcbiAgICBzZXRTdWJhY2NvdW50KHN1YmFjY291bnRJZDogc3RyaW5nKTogdm9pZDtcbiAgICByZXNldFN1YmFjY291bnQoKTogdm9pZDtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSU1haWxndW5DbGllbnQnO1xuIiwiaW1wb3J0IHtcbiAgTWFpbExpc3RNZW1iZXJzUXVlcnksXG4gIE1haWxMaXN0TWVtYmVyc1Jlc3VsdCxcbiAgTWFpbExpc3RNZW1iZXIsXG4gIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyxcbiAgTXVsdGlwbGVNZW1iZXJzRGF0YSxcbiAgTmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2UsXG4gIERlbGV0ZWRNZW1iZXJcbn0gZnJvbSAnLi4vLi4vVHlwZXMvTWFpbGluZ0xpc3RzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWFpbExpc3RzTWVtYmVycyB7XG4gIGxpc3RNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIHF1ZXJ5PzogTWFpbExpc3RNZW1iZXJzUXVlcnlcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcnNSZXN1bHQ+O1xuXG4gIGdldE1lbWJlcihhZGRyZXNzOiBzdHJpbmcsIG1lbWJlckFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+LFxuICBjcmVhdGVNZW1iZXIoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4sXG4gIGNyZWF0ZU1lbWJlcnMoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogTXVsdGlwbGVNZW1iZXJzRGF0YSk6IFByb21pc2U8TmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2U+LFxuICB1cGRhdGVNZW1iZXIoXG4gICAgYWRkcmVzczogc3RyaW5nLFxuICAgIG1lbWJlckFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPixcbiAgZGVzdHJveU1lbWJlcihhZGRyZXNzOiBzdHJpbmcsIG1lbWJlckFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8RGVsZXRlZE1lbWJlcj5cbn1cbiIsImltcG9ydCB7XG4gIENyZWF0ZVVwZGF0ZUxpc3QsIERlc3Ryb3llZExpc3QsIExpc3RzUXVlcnksIE1haWxpbmdMaXN0LFxuICBNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQsIE1haWxpbmdMaXN0UmVzdWx0LFxuICBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXN1bHQsIFN0YXJ0VmFsaWRhdGlvblJlc3VsdFxufSBmcm9tICcuLi8uLi9UeXBlcy9NYWlsaW5nTGlzdHMnO1xuaW1wb3J0IHsgSU1haWxMaXN0c01lbWJlcnMgfSBmcm9tICcuL01haWxpbmdMaXN0TWVtYmVycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1haWxpbmdMaXN0c0NsaWVudCB7XG4gIG1lbWJlcnM6IElNYWlsTGlzdHNNZW1iZXJzO1xuICBsaXN0KHF1ZXJ5PzogTGlzdHNRdWVyeSk6IFByb21pc2U8TWFpbGluZ0xpc3RSZXN1bHQ+XG4gIGdldChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3Q+XG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD5cbiAgdXBkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD5cbiAgZGVzdHJveShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8RGVzdHJveWVkTGlzdD5cbiAgdmFsaWRhdGUobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFN0YXJ0VmFsaWRhdGlvblJlc3VsdD5cbiAgdmFsaWRhdGlvblJlc3VsdChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0PlxuICBjYW5jZWxWYWxpZGF0aW9uKG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdENhbmNlbFZhbGlkYXRpb25SZXN1bHQ+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0TWVtYmVycyc7XG5leHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0c0NsaWVudCc7XG4iLCJpbXBvcnQgeyBNYWlsZ3VuTWVzc2FnZURhdGEsIE1lc3NhZ2VzU2VuZFJlc3VsdCB9IGZyb20gJy4uLy4uL1R5cGVzL01lc3NhZ2VzJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWVzc2FnZXNDbGllbnQge1xuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IE1haWxndW5NZXNzYWdlRGF0YSk6IFByb21pc2U8TWVzc2FnZXNTZW5kUmVzdWx0PlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JTWVzc2FnZXNDbGllbnQnO1xuIiwiaW1wb3J0IHtcbiAgQ3JlYXRlVXBkYXRlUm91dGVEYXRhLCBEZXN0cm95Um91dGVSZXNwb25zZSwgUm91dGUsIFJvdXRlc0xpc3RRdWVyeSwgVXBkYXRlUm91dGVSZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9Sb3V0ZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSb3V0ZXNDbGllbnQge1xuICBsaXN0KHF1ZXJ5OiBSb3V0ZXNMaXN0UXVlcnkpOiBQcm9taXNlPFJvdXRlW10+XG4gIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxSb3V0ZT5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8Um91dGU+XG4gIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFVwZGF0ZVJvdXRlUmVzcG9uc2U+XG4gIGRlc3Ryb3koaWQ6IHN0cmluZyk6IFByb21pc2U8RGVzdHJveVJvdXRlUmVzcG9uc2U+XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0lSb3V0ZXNDbGllbnQnO1xuIiwiaW1wb3J0IHsgU3RhdHNRdWVyeSB9IGZyb20gJy4uLy4uL1R5cGVzL1N0YXRzJztcbmltcG9ydCB7IElTdGF0c0NvbnRhaW5lciB9IGZyb20gJy4vU3RhdHNDb250YWluZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0c0NsaWVudCB7XG4gIGdldERvbWFpbihkb21haW46IHN0cmluZywgcXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxJU3RhdHNDb250YWluZXI+XG4gIGdldEFjY291bnQocXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxJU3RhdHNDb250YWluZXI+XG59XG4iLCJpbXBvcnQgeyBTdGF0IH0gZnJvbSAnLi4vLi4vVHlwZXMvU3RhdHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdGF0c0NvbnRhaW5lciB7XG4gICAgc3RhcnQ6IERhdGU7XG4gICAgZW5kOiBEYXRlO1xuICAgIHJlc29sdXRpb246IHN0cmluZztcbiAgICBzdGF0czogU3RhdFtdO1xuICB9XG4iLCJleHBvcnQgKiBmcm9tICcuL1N0YXRzQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJy4vU3RhdHNDb250YWluZXInO1xuIiwiaW1wb3J0IHsgU3ViYWNjb3VudExpc3RSZXNwb25zZURhdGEsIFN1YmFjY291bnRSZXNwb25zZURhdGEsIFN1YmFjY291bnRzUXVlcnkgfSBmcm9tICcuLi8uLi9UeXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN1YmFjY291bnRzQ2xpZW50IHtcbiAgbGlzdChxdWVyeT86IFN1YmFjY291bnRzUXVlcnkpOiBQcm9taXNlPFN1YmFjY291bnRMaXN0UmVzcG9uc2VEYXRhPlxuICBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT5cbiAgY3JlYXRlKG5hbWU6IHN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT5cbiAgZGlzYWJsZShpZDogc3RyaW5nKTogUHJvbWlzZTxTdWJhY2NvdW50UmVzcG9uc2VEYXRhPlxuICBlbmFibGUoaWQ6IHN0cmluZyk6IFByb21pc2U8U3ViYWNjb3VudFJlc3BvbnNlRGF0YT5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSVN1YmFjY291bnRzQ2xpZW50JztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IGludGVyZmFjZSBJQm91bmNlIHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcbiAgICB0eXBlOiBzdHJpbmc7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBsYWludCB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNyZWF0ZWRfYXQ6IERhdGU7XG4gICAgdHlwZTogc3RyaW5nO1xufVxuIiwiaW1wb3J0IHtcbiAgU3VwcHJlc3Npb25MaXN0LFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSxcbiAgU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCxcbiAgU3VwcHJlc3Npb25MaXN0UXVlcnksXG4gIFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdFxufSBmcm9tICcuLi8uLi9UeXBlcy9TdXBwcmVzc2lvbnMnO1xuaW1wb3J0IHsgSUJvdW5jZSB9IGZyb20gJy4vQm91bmNlJztcbmltcG9ydCB7IElDb21wbGFpbnQgfSBmcm9tICcuL0NvbXBsYWludCc7XG5pbXBvcnQgeyBJVW5zdWJzY3JpYmUgfSBmcm9tICcuL1Vuc3Vic2NyaWJlJztcbmltcG9ydCB7IElXaGl0ZUxpc3QgfSBmcm9tICcuL1doaXRlTGlzdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVN1cHByZXNzaW9uQ2xpZW50IHtcbiAgbGlzdChkb21haW46IHN0cmluZywgdHlwZTogc3RyaW5nLCBxdWVyeT86IFN1cHByZXNzaW9uTGlzdFF1ZXJ5KTogUHJvbWlzZTxTdXBwcmVzc2lvbkxpc3Q+XG5cbiAgZ2V0KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxJQm91bmNlIHwgSUNvbXBsYWludCB8IElVbnN1YnNjcmliZSB8IElXaGl0ZUxpc3Q+XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW11cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PlxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdD5cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IGludGVyZmFjZSBJVW5zdWJzY3JpYmUge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICB0YWdzOiBhbnk7XG4gICAgY3JlYXRlZF9hdDogRGF0ZTtcbiAgICB0eXBlOiBzdHJpbmc7XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIElXaGl0ZUxpc3Qge1xuICAgIHR5cGU6IHN0cmluZztcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIHJlYXNvbjogc3RyaW5nO1xuICAgIGNyZWF0ZWRBdDogRGF0ZTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vQm91bmNlJztcbmV4cG9ydCAqIGZyb20gJy4vQ29tcGxhaW50JztcbmV4cG9ydCAqIGZyb20gJy4vVW5zdWJzY3JpYmUnO1xuZXhwb3J0ICogZnJvbSAnLi9XaGl0ZUxpc3QnO1xuZXhwb3J0ICogZnJvbSAnLi9JU3VwcHJlc3Npb25zQ2xpZW50JztcbiIsImltcG9ydCB7XG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0LFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHQsXG4gIENyZWF0ZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGEsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnlcbn0gZnJvbSAnLi4vLi4vVHlwZXMvVmFsaWRhdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQge1xuICBsaXN0KHF1ZXJ5PzpNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFF1ZXJ5KTogUHJvbWlzZTxNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdD5cbiAgZ2V0KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHQ+XG4gIGNyZWF0ZShcbiAgICBsaXN0SWQ6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZVZhbGlkYXRpb25DcmVhdGlvbkRhdGFcbiAgKTogUHJvbWlzZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPlxuICBkZXN0cm95KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYj5cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHsgVmFsaWRhdGlvblJlc3VsdCB9IGZyb20gJy4uLy4uL1R5cGVzL1ZhbGlkYXRpb25zJztcbmltcG9ydCB7IElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgfSBmcm9tICcuL011bHRpcGxlVmFsaWRhdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25DbGllbnQge1xuICBtdWx0aXBsZVZhbGlkYXRpb246IElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnRcbiAgZ2V0KGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8VmFsaWRhdGlvblJlc3VsdD5cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vTXVsdGlwbGVWYWxpZGF0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vVmFsaWRhdGlvbic7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuaW1wb3J0IHsgV2ViaG9va3NJZHMgfSBmcm9tICcuLi8uLi9FbnVtcyc7XG5pbXBvcnQge1xuICBXZWJob29rTGlzdCxcbiAgV2ViaG9va1Jlc3VsdCxcbiAgV2ViaG9va3NRdWVyeSxcbiAgV2ViaG9va1ZhbGlkYXRpb25SZXNwb25zZVxufSBmcm9tICcuLi8uLi9UeXBlcy9XZWJob29rcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVdlYkhvb2tzQ2xpZW50IHtcbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk6IFdlYmhvb2tzUXVlcnkpOiBQcm9taXNlPFdlYmhvb2tMaXN0PlxuICBnZXQoZG9tYWluOiBzdHJpbmcsIGlkOiBXZWJob29rc0lkcyk6IFByb21pc2U8V2ViaG9va1Jlc3VsdD5cbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLFxuICAgIGlkOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgdGVzdDogYm9vbGVhblxuICApOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQgfCBXZWJob29rVmFsaWRhdGlvblJlc3BvbnNlPlxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHVybDogc3RyaW5nIHwgc3RyaW5nW10pOiBQcm9taXNlPFdlYmhvb2tSZXN1bHQ+XG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIGlkOiBzdHJpbmcpIDogUHJvbWlzZTxXZWJob29rUmVzdWx0PlxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9JV2ViSG9va3NDbGllbnQnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9Db21tb24nO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5zJztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGd1bkNsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0cyc7XG5leHBvcnQgKiBmcm9tICcuL1N0YXRzJztcbmV4cG9ydCAqIGZyb20gJy4vU3VwcHJlc3Npb25zJztcbmV4cG9ydCAqIGZyb20gJy4vVmFsaWRhdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9FdmVudENsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL1dlYmhvb2tzJztcbmV4cG9ydCAqIGZyb20gJy4vTWVzc2FnZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9Sb3V0ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9JUHMnO1xuZXhwb3J0ICogZnJvbSAnLi9JUFBvb2xzJztcbmV4cG9ydCAqIGZyb20gJy4vU3ViYWNjb3VudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9JbmJveFBsYWNlbWVudHMnO1xuIiwiZXhwb3J0IHR5cGUgQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keTogYW55O1xufVxuIiwiZXhwb3J0IHR5cGUgQVBJRXJyb3JPcHRpb25zID0ge1xuICBoZWFkZXJzPzogeyBba2V5OiBzdHJpbmddOiB1bmtub3duIH07XG4gIHN0YXR1czogbnVtYmVyO1xuICBtZXNzYWdlPzogc3RyaW5nO1xuICBib2R5OiB7XG4gICAgZXJyb3I/OiBzdHJpbmcsXG4gICAgbWVzc2FnZT86IHN0cmluZ1xuICB9O1xuICB1cmw/OiBzdHJpbmc7XG4gIHN0YXR1c1RleHQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEFQSUVycm9yVHlwZSA9IHtcbiAgc3RhY2s6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgZGV0YWlsczogc3RyaW5nO1xufVxuIiwiaW1wb3J0ICogYXMgTm9kZUZvcm1EYXRhIGZyb20gJ2Zvcm0tZGF0YSc7XG5pbXBvcnQgeyBGb3JtRGF0YUlucHV0VmFsdWUgfSBmcm9tICcuLi9NZXNzYWdlcyc7XG5cbmV4cG9ydCB0eXBlIEZvcm1EYXRhT3B0aW9ucyA9IHtcbiAgW2tleTogc3RyaW5nXTogTm9kZUZvcm1EYXRhO1xufVxuXG5leHBvcnQgdHlwZSBJbnB1dEZvcm1EYXRhID1cbiAge1xuICAgIG5ldyhmb3JtPzogSFRNTEZvcm1FbGVtZW50IHwgdW5kZWZpbmVkLCBzdWJtaXR0ZXI/OiBIVE1MRWxlbWVudCB8IG51bGwgfCB1bmRlZmluZWQpOiBGb3JtRGF0YTtcbiAgfSB8XG4gIHtcbiAgICBuZXcob3B0aW9ucz86IEZvcm1EYXRhT3B0aW9ucyk6IE5vZGVGb3JtRGF0YVxuICB9XG5cbmV4cG9ydCB0eXBlIEZvcm1EYXRhSW5wdXQgPSB7XG4gIFtrZXk6IHN0cmluZ106IEZvcm1EYXRhSW5wdXRWYWx1ZTtcbn07XG4iLCJleHBvcnQgdHlwZSBQYWdlc0xpc3QgPSB7XG4gICAgcHJldmlvdXM6IHN0cmluZztcbiAgICBmaXJzdDogc3RyaW5nO1xuICAgIGxhc3Q6IHN0cmluZztcbiAgICBuZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFBhcnNlZFBhZ2UgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBwYWdlOiBzdHJpbmc7XG4gICAgaXRlcmF0b3JQb3NpdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIHVybDogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIFBhcnNlZFBhZ2VzTGlzdCA9IHtcbiAgICBwcmV2aW91czogUGFyc2VkUGFnZTtcbiAgICBmaXJzdDogUGFyc2VkUGFnZTtcbiAgICBsYXN0OiBQYXJzZWRQYWdlO1xuICAgIG5leHQ6IFBhcnNlZFBhZ2U7XG59XG5cbmV4cG9ydCB0eXBlIFBhZ2VzTGlzdEFjY3VtdWxhdG9yID0ge1xuICAgIFtpbmRleDogc3RyaW5nXTogUGFyc2VkUGFnZTtcbn1cblxuZXhwb3J0IHR5cGUgUmVzcG9uc2VXaXRoUGFnaW5nID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3RcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5V2l0aFBhZ2UgPSB7XG4gICAgcGFnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZFVybEFuZFF1ZXJ5ID0ge1xuICAgIHVybDogc3RyaW5nO1xuICAgIHVwZGF0ZWRRdWVyeTogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG59XG4iLCJpbXBvcnQgeyBBeGlvc1JlcXVlc3RIZWFkZXJzLCBSYXdBeGlvc1JlcXVlc3RIZWFkZXJzIH0gZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgTWFpbGd1bkNsaWVudE9wdGlvbnMgfSBmcm9tICcuLi9NYWlsZ3VuQ2xpZW50JztcblxuZXhwb3J0IHR5cGUgT25DYWxsRW1wdHlIZWFkZXJzID0ge1xuICBba2V5OiBzdHJpbmddOiB1bmRlZmluZWQ7XG59XG5leHBvcnQgdHlwZSBSZXF1ZXN0T3B0aW9ucyA9IE1haWxndW5DbGllbnRPcHRpb25zICYge1xuICBoZWFkZXJzOiBBeGlvc1JlcXVlc3RIZWFkZXJzIHwgUmF3QXhpb3NSZXF1ZXN0SGVhZGVycztcbiAgdGltZW91dDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBPbkNhbGxSZXF1ZXN0T3B0aW9ucyA9IHtcbiAgdGltZW91dD86IG51bWJlcjtcbiAgaGVhZGVycz86IEF4aW9zUmVxdWVzdEhlYWRlcnMgfCBSYXdBeGlvc1JlcXVlc3RIZWFkZXJzO1xuICBxdWVyeT86IGFueTtcbiAgW2tleTogc3RyaW5nXTogdW5rbm93biB8IHVuZGVmaW5lZDtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vRXJyb3InO1xuZXhwb3J0ICogZnJvbSAnLi9BcGlSZXNwb25zZSc7XG5leHBvcnQgKiBmcm9tICcuL0Zvcm1EYXRhJztcbmV4cG9ydCAqIGZyb20gJy4vTmF2aWdhdGlvblRocnVQYWdlcyc7XG5leHBvcnQgKiBmcm9tICcuL1JlcXVlc3RPcHRpb25zJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHNRdWVyeSA9IHtcbiAgICBsaW1pdDogbnVtYmVyO1xuICAgIHNraXA6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHMgPSB7XG4gICAgbG9naW46IHN0cmluZztcbiAgICBwYXNzd29yZDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFsc0l0ZW0gPSB7XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nLFxuICAgIGxvZ2luOiBzdHJpbmcsXG4gICAgbWFpbGJveDogc3RyaW5nLFxuICAgIHNpemVfYnl0ZXM6IG51bWJlciB8IG51bGxcbn1cbmV4cG9ydCB0eXBlIERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IERvbWFpbkNyZWRlbnRpYWxzSXRlbVtdO1xuICAgICAgICB0b3RhbF9jb3VudDogbnVtYmVyO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluQ3JlZGVudGlhbHNMaXN0ID0ge1xuICAgIGl0ZW1zOiBEb21haW5DcmVkZW50aWFsc0l0ZW1bXTtcbiAgICB0b3RhbENvdW50OiBudW1iZXI7XG59XG5leHBvcnQgdHlwZSBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcixcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgc3BlYz86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlZFVwZGF0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyLFxuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRGVsZXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXIsXG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIHNwZWM6IHN0cmluZztcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZURvbWFpbkNyZWRlbnRpYWxzRGF0YSA9IHtcbiAgICBwYXNzd29yZDogc3RyaW5nO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgeyBSZXNvbHV0aW9uIH0gZnJvbSAnLi4vLi4vRW51bXMnO1xuaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzUXVlcnkgPSB7XG4gICAgbGltaXQ6IG51bWJlcjtcbiAgICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdzU3RhdGlzdGljUXVlcnkgPSB7XG4gICAgZXZlbnQ6IHN0cmluZztcbiAgICBzdGFydD86IG51bWJlcjtcbiAgICBlbmQ/OiBudW1iZXI7XG4gICAgcmVzb2x1dGlvbj86IFJlc29sdXRpb247XG4gICAgZHVyYXRpb24/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NJdGVtSW5mbyA9IHtcbiAgICB0YWc6IHN0cmluZyxcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgICdmaXJzdC1zZWVuJzogc3RyaW5nLFxuICAgICdsYXN0LXNlZW4nOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc0l0ZW0gPSB7XG4gICAgdGFnOiBzdHJpbmcsXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgICAnZmlyc3Qtc2Vlbic6IERhdGUsXG4gICAgJ2xhc3Qtc2Vlbic6IERhdGVcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBEb21haW5UYWdzSXRlbUluZm9bXTtcbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3RcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NMaXN0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGl0ZW1zOiBEb21haW5UYWdzSXRlbVtdO1xuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ3NNZXNzYWdlUmVzID0ge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzdGF0dXM/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtID0ge1xuICAgIHRpbWU6c3RyaW5nXG4gICAgYWNjZXB0ZWQ/OiB7XG4gICAgICAgIGluY29taW5nOiBudW1iZXI7XG4gICAgICAgIG91dGdvaW5nOiBudW1iZXI7XG4gICAgICAgIHRvdGFsOiBudW1iZXJcbiAgICB9XG4gICAgZGVsaXZlcmVkPzoge1xuICAgICAgICBzbXRwOiBudW1iZXI7XG4gICAgICAgIGh0dHA6IG51bWJlcjtcbiAgICAgICAgb3B0aW1pemVkOiBudW1iZXI7XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfTtcbiAgICBvcGVuZWQ/OiB7XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfTtcbiAgICBmYWlsZWQ/OiB7XG4gICAgICAgIHRlbXBvcmFyeTp7XG4gICAgICAgICAgICBlc3BibG9jazogbnVtYmVyO1xuICAgICAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICAgICAgfTtcbiAgICAgICAgcGVybWFuZW50OiB7XG4gICAgICAgICAgICAnc3VwcHJlc3MtYm91bmNlJzogbnVtYmVyO1xuICAgICAgICAgICAgJ3N1cHByZXNzLXVuc3Vic2NyaWJlJzogbnVtYmVyO1xuICAgICAgICAgICAgJ3N1cHByZXNzLWNvbXBsYWludCc6IG51bWJlcjtcbiAgICAgICAgICAgIGJvdW5jZTogbnVtYmVyO1xuICAgICAgICAgICAgJ2RlbGF5ZWQtYm91bmNlJzogbnVtYmVyO1xuICAgICAgICAgICAgd2ViaG9vazogbnVtYmVyO1xuICAgICAgICAgICAgb3B0aW1pemVkOiBudW1iZXI7XG4gICAgICAgICAgICB0b3RhbDogbnVtYmVyO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgY2xpY2tlZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIHVuc3Vic2NyaWJlZD86IHtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9O1xuICAgIGNvbXBsYWluZWQ/OiB7XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfTtcbiAgICBzdG9yZWQ/OiB7XG4gICAgICAgIHRvdGFsOiBudW1iZXI7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2UgPSB7XG4gICAgYm9keTp7XG4gICAgICAgIHRhZzogc3RyaW5nO1xuICAgICAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgICAgICBzdGFydDogc3RyaW5nO1xuICAgICAgICBlbmQ6IHN0cmluZztcbiAgICAgICAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgICAgICAgc3RhdHM6IERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtW107XG4gICAgfVxufVxuZXhwb3J0IHR5cGUgRG9tYWluVGFnU3RhdGlzdGljSXRlbSA9IE9taXQgPERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtLCAndGltZSc+ICYge1xuICAgIHRpbWU6IERhdGVcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICB0YWc6c3RyaW5nO1xuICAgICAgICBjb3VudHJ5OiB7XG4gICAgICAgICAgICBba2V5OnN0cmluZ106IHtcbiAgICAgICAgICAgICAgICBjbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgY29tcGxhaW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIG9wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuaXF1ZV9jbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5pcXVlX29wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlZDogbnVtYmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24gPSB7XG4gICAgdGFnOnN0cmluZztcbiAgICBjb3VudHJ5OiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHtcbiAgICAgICAgICAgIGNsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIGNvbXBsYWluZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIG9wZW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuaXF1ZV9vcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlZDogbnVtYmVyO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdQcm92aWRlcnNBUElSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIHRhZzpzdHJpbmc7XG4gICAgICAgIHByb3ZpZGVyOiB7XG4gICAgICAgICAgICBba2V5OnN0cmluZ106IHtcbiAgICAgICAgICAgICAgICBhY2NlcHRlZDogbnVtYmVyO1xuICAgICAgICAgICAgICAgIGNsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBjb21wbGFpbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5pcXVlX2NsaWNrZWQ6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB1bmlxdWVfb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmVkOiBudW1iZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbiA9IHtcbiAgICB0YWc6IHN0cmluZztcbiAgICBwcm92aWRlcjoge1xuICAgICAgICBba2V5OiBzdHJpbmddOiB7XG4gICAgICAgICAgICBhY2NlcHRlZDogbnVtYmVyO1xuICAgICAgICAgICAgY2xpY2tlZDogbnVtYmVyO1xuICAgICAgICAgICAgY29tcGxhaW5lZDogbnVtYmVyO1xuICAgICAgICAgICAgZGVsaXZlcmVkOiBudW1iZXI7XG4gICAgICAgICAgICBvcGVuZWQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuaXF1ZV9jbGlja2VkOiBudW1iZXI7XG4gICAgICAgICAgICB1bmlxdWVfb3BlbmVkOiBudW1iZXI7XG4gICAgICAgICAgICB1bnN1YnNjcmliZWQ6IG51bWJlcjtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIERldmljZVN0YXRpc3RpYyA9IHtcbiAgICBjbGlja2VkOiBudW1iZXI7XG4gICAgY29tcGxhaW5lZDogbnVtYmVyO1xuICAgIG9wZW5lZDogbnVtYmVyO1xuICAgIHVuaXF1ZV9jbGlja2VkOiBudW1iZXI7XG4gICAgdW5pcXVlX29wZW5lZDogbnVtYmVyO1xuICAgIHVuc3Vic2NyaWJlZDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBEZXZpY2VzVHlwZXMgPSB7XG4gICAgZGVza3RvcDogRGV2aWNlU3RhdGlzdGljO1xuICAgIG1vYmlsZTogRGV2aWNlU3RhdGlzdGljO1xuICAgIHRhYmxldDogRGV2aWNlU3RhdGlzdGljO1xuICAgIHVua25vd246IERldmljZVN0YXRpc3RpYztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgdGFnOnN0cmluZztcbiAgICAgICAgZGV2aWNlOiBEZXZpY2VzVHlwZXM7XG4gICAgfVxuICAgIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb24gPSB7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgZGV2aWNlOiBEZXZpY2VzVHlwZXM7XG59XG4iLCJpbXBvcnQgeyBZZXNObyB9IGZyb20gJy4uLy4uL0VudW1zJztcbmltcG9ydCB7IElEb21haW5UZW1wbGF0ZSB9IGZyb20gJy4uLy4uL0ludGVyZmFjZXMvRG9tYWlucyc7XG5pbXBvcnQgeyBQYWdlc0xpc3QsIFBhcnNlZFBhZ2VzTGlzdCB9IGZyb20gJy4uL0NvbW1vbic7XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgRG9tYWluVGVtcGxhdGVEYXRhID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHRlbXBsYXRlOiBzdHJpbmc7XG4gICAgdGFnPzogc3RyaW5nO1xuICAgIGVuZ2luZT86IHN0cmluZztcbiAgICBjb21tZW50Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhID0ge1xuICAgIHRlbXBsYXRlOiBzdHJpbmc7XG4gICAgdGFnOiBzdHJpbmc7XG4gICAgZW5naW5lPzogc3RyaW5nO1xuICAgIGNvbW1lbnQ/OiBzdHJpbmc7XG4gICAgYWN0aXZlPzogWWVzTm87XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YSA9IHtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhID0ge1xuICAgIHRlbXBsYXRlPzogc3RyaW5nO1xuICAgIGNvbW1lbnQ/OiBzdHJpbmc7XG4gICAgYWN0aXZlPzogWWVzTm87XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRlbXBsYXRlc1F1ZXJ5ID0ge1xuICAgIC8qKiAncGFnZScgKG9wdGlvbmFsbHkgJ3AnKSBwYXJhbXMgZnJvbSBwcmV2aW91cyByZXNwb25zZSdzICdwYWdpbmcnIG9iamVjdC5cbiAgICAgKiBWYWx1ZSBtdXN0IGJlIHN0cmluZ2lmaWVkIGFzIHF1ZXJ5IHBhcmFtcy4gRXg6ICc/cGFnZT1maXJzdCcsJz9wYWdlPW5leHQmcD1uYW1lLW9mLWxhc3QtaXRlbSdcbiAgICAgLi4uLiAqL1xuICAgIHBhZ2U/OiBgPyR7c3RyaW5nfWA7XG4gICAgLyoqIE51bWJlciBvZiByZWNvcmRzIHRvIHJldHJpZXZlLiBEZWZhdWx0IHZhbHVlIGlzIDEwLiAqL1xuICAgIGxpbWl0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBUZW1wbGF0ZVF1ZXJ5ID0ge1xuICAgIGFjdGl2ZTogWWVzTm87XG59XG5cbmV4cG9ydCB0eXBlIFNob3J0VGVtcGxhdGVWZXJzaW9uID0ge1xuICAgIHRhZzogc3RyaW5nO1xuICAgIGVuZ2luZTogc3RyaW5nO1xuICAgIG1qbWw6IHN0cmluZztcbiAgICBjcmVhdGVkQXQ6IHN0cmluZyB8IERhdGU7XG4gICAgY29tbWVudDogc3RyaW5nO1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBpZDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBUZW1wbGF0ZVZlcnNpb24gPSBTaG9ydFRlbXBsYXRlVmVyc2lvbiAmIHtcbiAgICB0ZW1wbGF0ZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgICB0ZW1wbGF0ZTogSURvbWFpblRlbXBsYXRlO1xuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIExpc3REb21haW5UZW1wbGF0ZXNBUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBJRG9tYWluVGVtcGxhdGVbXTtcbiAgICAgICAgcGFnaW5nOiB7XG4gICAgICAgICAgICBmaXJzdDogc3RyaW5nO1xuICAgICAgICAgICAgbGFzdDogc3RyaW5nO1xuICAgICAgICAgICAgbmV4dDogc3RyaW5nO1xuICAgICAgICAgICAgcHJldmlvdXM6IHN0cmluZztcbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0ID0ge1xuICAgICAgICBpdGVtczogSURvbWFpblRlbXBsYXRlW107XG4gICAgICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG4gICAgICAgIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgdGVtcGxhdGU6IElEb21haW5UZW1wbGF0ZTtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICBuYW1lOiBzdHJpbmdcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHRlbXBsYXRlTmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTm90aWZpY2F0aW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIHRlbXBsYXRlOiBJRG9tYWluVGVtcGxhdGU7XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB0ZW1wbGF0ZTogSURvbWFpblRlbXBsYXRlO1xufVxuXG5leHBvcnQgdHlwZSBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiB7XG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgICAgIHZlcnNpb246IHtcbiAgICAgICAgICAgICAgICB0YWc6IHN0cmluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nO1xuICAgIHRlbXBsYXRlVmVyc2lvbjoge1xuICAgICAgICB0YWc6IHN0cmluZztcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogc3RyaW5nO1xuICAgICAgICAgICAgY3JlYXRlZEJ5OiBzdHJpbmc7XG4gICAgICAgICAgICBpZDogc3RyaW5nO1xuICAgICAgICAgICAgdmVyc2lvbnM6IFNob3J0VGVtcGxhdGVWZXJzaW9uW11cbiAgICAgICAgfVxuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgICB9O1xufVxuXG5leHBvcnQgdHlwZSBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCA9IHtcbiAgICB0ZW1wbGF0ZTogSURvbWFpblRlbXBsYXRlO1xuICAgIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuZXhwb3J0IHR5cGUgRG9tYWluVHJhY2tpbmdEYXRhID0ge1xuICBjbGljazogeyBhY3RpdmU6IGJvb2xlYW4gfTtcbiAgb3BlbjogeyBhY3RpdmU6IGJvb2xlYW4gfTtcbiAgdW5zdWJzY3JpYmU6IHtcbiAgICBhY3RpdmU6IGJvb2xlYW47XG4gICAgaHRtbF9mb290ZXI6IHN0cmluZztcbiAgICB0ZXh0X2Zvb3Rlcjogc3RyaW5nO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblRyYWNraW5nUmVzcG9uc2UgPSB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBib2R5OiB7XG4gICAgdHJhY2tpbmc6IERvbWFpblRyYWNraW5nRGF0YVxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVkT3BlblRyYWNraW5nID0ge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIG9wZW4/OiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuICBjbGljaz86IHsgYWN0aXZlOiBib29sZWFuIHwgJ2h0bWxvbmx5JyB9O1xuICB1bnN1YnNjcmliZT86IHtcbiAgICBhY3RpdmU6IGJvb2xlYW4sXG4gICAgaHRtbF9mb290ZXI6IHN0cmluZztcbiAgICB0ZXh0X2Zvb3Rlcjogc3RyaW5nO1xuICB9O1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlID0ge1xuICBzdGF0dXM6IG51bWJlcjtcbiAgYm9keTogVXBkYXRlZE9wZW5UcmFja2luZztcbn1cblxuZXhwb3J0IHR5cGUgT3BlblRyYWNraW5nSW5mbyA9IHtcbiAgYWN0aXZlOiAneWVzJyB8ICdubycgfCAndHJ1ZScgfCAnZmFsc2UnO1xufVxuZXhwb3J0IHR5cGUgQ2xpY2tUcmFja2luZ0luZm8gPSB7XG4gIGFjdGl2ZTogJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwgJ2ZhbHNlJyB8ICdodG1sb25seSc7XG59XG5cbmV4cG9ydCB0eXBlIFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvID0ge1xuICBhY3RpdmU6ICd5ZXMnIHwgJ25vJyB8ICd0cnVlJyB8ICdmYWxzZSc7XG4gIGh0bWxfZm9vdGVyOiBzdHJpbmc7XG4gIHRleHRfZm9vdGVyOiBzdHJpbmc7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIERvbWFpbnNRdWVyeSA9IHtcbiAgICBhdXRob3JpdHk/IDogc3RyaW5nO1xuICAgIHN0YXRlPzogJ2FjdGl2ZScgfCAndW52ZXJpZmllZCcgfCAnZGlzYWJsZWQnO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHNraXA/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblVwZGF0ZUluZm8gPSB7XG4gICAgc3BhbV9hY3Rpb24/OiAnZGlzYWJsZWQnIHwgJ2Jsb2NrJyB8ICd0YWcnO1xuICAgIHdlYl9zY2hlbWU/OiAnaHR0cCcgfCAnaHR0cHMnO1xuICAgIHdpbGRjYXJkPzogYm9vbGVhbiB8ICd0cnVlJyB8ICdmYWxzZSc7XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpblVwZGF0ZUluZm9SZXEgPSBEb21haW5VcGRhdGVJbmZvICYge1xuICAgIHdpbGRjYXJkPzogJ3RydWUnIHwgJ2ZhbHNlJzsgLy8gYXBpIHN1cHBvcnRzIG9ubHkgc3RyaW5nc1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5JbmZvID0gRG9tYWluVXBkYXRlSW5mbyAmIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICAgIGZvcmNlX2RraW1fYXV0aG9yaXR5PzogYm9vbGVhbiB8ICd0cnVlJyB8ICdmYWxzZSc7XG4gICAgZGtpbV9rZXlfc2l6ZT86IDEwMjQgfCAyMDQ4O1xuICAgIGlwcz86ICcnO1xuICAgIHBvb2xfaWQ/OiAnJztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluSW5mb1JlcSA9IERvbWFpbkluZm8gJiB7XG4gICAgZm9yY2VfZGtpbV9hdXRob3JpdHk/OiAndHJ1ZScgfCAnZmFsc2UnO1xufVxuXG5leHBvcnQgdHlwZSBCb29sVG9TdHJpbmcgPSB7XG4gICAgZm9yY2VfZGtpbV9hdXRob3JpdHk/OiBEb21haW5JbmZvWydmb3JjZV9ka2ltX2F1dGhvcml0eSddO1xuICAgIHdpbGRjYXJkPzogRG9tYWluVXBkYXRlSW5mb1snd2lsZGNhcmQnXTtcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluU2hvcnREYXRhID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICByZXF1aXJlX3RsczogYm9vbGVhbjtcbiAgICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgICBzdGF0ZTogc3RyaW5nO1xuICAgIHdpbGRjYXJkOiBib29sZWFuO1xuICAgIHNwYW1fYWN0aW9uOiBzdHJpbmc7XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICAgIHNtdHBfcGFzc3dvcmQ6IHN0cmluZztcbiAgICBzbXRwX2xvZ2luOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBEb21haW5EYXRhID0gRG9tYWluU2hvcnREYXRhICYge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgaXNfZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgd2ViX3ByZWZpeDogc3RyaW5nO1xuICAgIHdlYl9zY2hlbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb21haW5zTGlzdEl0ZW0gZXh0ZW5kcyBEb21haW5TaG9ydERhdGF7XG4gICAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBudWxsO1xuICAgIHNlbmRpbmdfZG5zX3JlY29yZHM6IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRE5TUmVjb3JkIHtcbiAgICBjYWNoZWQ6IGFueVtdO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICByZWNvcmRfdHlwZTogc3RyaW5nO1xuICAgIHZhbGlkOiBzdHJpbmc7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICBwcmlvcml0eT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRG9tYWluUmVzcG9uc2VEYXRhID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgZG9tYWluOiBEb21haW5EYXRhO1xuICAgICAgICBtZXNzYWdlPzogc3RyaW5nO1xuICAgICAgICByZWNlaXZpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdO1xuICAgICAgICBzZW5kaW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXTtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERvbWFpbkxpc3RSZXNwb25zZURhdGEgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogRG9tYWluc0xpc3RJdGVtW10gfCBudWxsO1xuICAgICAgICB0b3RhbF9jb3VudDogbnVtYmVyO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTWVzc2FnZVJlc3BvbnNlID0ge1xuICAgIG1lc3NhZ2UgOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgRGVzdHJveWVkRG9tYWluUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keTogTWVzc2FnZVJlc3BvbnNlXG59XG5cbmV4cG9ydCB0eXBlIENvbm5lY3Rpb25TZXR0aW5ncyA9IHtcbiAgICByZXF1aXJlX3RsczogYm9vbGVhbjtcbiAgICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbn1cbmV4cG9ydCB0eXBlIENvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgY29ubmVjdGlvbjogQ29ubmVjdGlvblNldHRpbmdzXG4gICAgfVxuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3MgPSB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICAgIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3NSZXMgPSB7XG4gICAgYm9keTogVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncztcbiAgICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBES0lNQXV0aG9yaXR5SW5mbyA9IHtcbiAgICBzZWxmOiBib29sZWFuIHwgJ3llcycgfCAnbm8nIHwgJ3RydWUnIHwnZmFsc2UnXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRES0lNQXV0aG9yaXR5ID0ge1xuICAgIGNoYW5nZWQ6IGJvb2xlYW47XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdXG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UgPSB7XG4gICAgYm9keTogVXBkYXRlZERLSU1BdXRob3JpdHk7XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIERLSU1TZWxlY3RvckluZm8gPSB7XG4gICAgZGtpbVNlbGVjdG9yOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlID0ge1xuICAgIGJvZHk6TWVzc2FnZVJlc3BvbnNlO1xuICAgIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIFdlYlByZWZpeEluZm8gPSB7XG4gICAgd2ViUHJlZml4OiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgVXBkYXRlZFdlYlByZWZpeCA9IHtcbiAgICBtZXNzYWdlIDogc3RyaW5nXG59XG5leHBvcnQgdHlwZSBVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2UgPSB7XG4gICAgYm9keTpNZXNzYWdlUmVzcG9uc2U7XG4gICAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgUmVwbGFjZW1lbnRGb3JQb29sID0ge1xuICAgIHBvb2xfaWQ/OiBzdHJpbmc7XG4gICAgaXA/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFREb21haW4gPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xuICBzdGF0ZTogc3RyaW5nO1xuICB3aWxkY2FyZDogYm9vbGVhbjtcbiAgc3BhbV9hY3Rpb246IHN0cmluZztcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICBzbXRwX3Bhc3N3b3JkOiBzdHJpbmc7XG4gIHNtdHBfbG9naW46IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICByZWNlaXZpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgc2VuZGluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuICBpZD86IHN0cmluZztcbiAgaXNfZGlzYWJsZWQ/OiBib29sZWFuO1xuICB3ZWJfcHJlZml4Pzogc3RyaW5nO1xuICB3ZWJfc2NoZW1lPzogc3RyaW5nO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Eb21haW5DcmVkZW50aWFscyc7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9Eb21haW5UYWdzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVGVtcGxhdGVzJztcbmV4cG9ydCAqIGZyb20gJy4vRG9tYWluVHJhY2tpbmcnO1xuIiwiaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuXG5leHBvcnQgdHlwZSBFdmVudHNQYWdlID0ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbnVtYmVyOiBzdHJpbmc7XG4gICAgdXJsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEZpbHRlckZpZWxkID0ge1xuICAgIGV2ZW50Pzogc3RyaW5nO1xuICAgIGxpc3Q/OiBzdHJpbmc7XG4gICAgYXR0YWNobWVudD86IHN0cmluZztcbiAgICBmcm9tPzogc3RyaW5nO1xuICAgICdtZXNzYWdlLWlkJz86IHN0cmluZztcbiAgICBzdWJqZWN0Pzogc3RyaW5nO1xuICAgIHRvPzogc3RyaW5nO1xuICAgIHNpemU/OiBzdHJpbmc7XG4gICAgcmVjaXBpZW50Pzogc3RyaW5nO1xuICAgIHJlY2lwaWVudHM/OiBzdHJpbmc7XG4gICAgdGFncz86IHN0cmluZztcbiAgICBzZXZlcml0eT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRXZlbnRzUXVlcnkgPSBGaWx0ZXJGaWVsZCAmIHtcbiAgICBwYWdlPzogc3RyaW5nO1xuICAgIGJlZ2luPzogc3RyaW5nO1xuICAgIGVuZD86IHN0cmluZztcbiAgICBhc2NlbmRpbmc/OiAneWVzJ3wgJ25vJztcbiAgICBsaW1pdD86IG51bWJlcjtcbn1cbmV4cG9ydCB0eXBlIEV2ZW50c1Jlc3BvbnNlID0ge1xuICAgIGJvZHk6IHtcbiAgICAgICAgaXRlbXM6IFtdO1xuICAgICAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgICB9LFxuICAgIHN0YXR1czogbnVtYmVyXG59XG5leHBvcnQgdHlwZSBEb21haW5FdmVudCA9IHtcbiAgICBzZXZlcml0eTogc3RyaW5nO1xuICAgIHRhZ3M6IHN0cmluZ1tdO1xuICAgIHN0b3JhZ2U6IHtcbiAgICAgICAgdXJsOiBzdHJpbmc7XG4gICAgICAgIGtleTogc3RyaW5nXG4gICAgfTtcbiAgICAnZGVsaXZlcnktc3RhdHVzJzoge1xuICAgICAgICB0bHM6IGJvb2xlYW47XG4gICAgICAgICdteC1ob3N0Jzogc3RyaW5nO1xuICAgICAgICBjb2RlOiBudW1iZXI7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgICAgICdzZXNzaW9uLXNlY29uZHMnOiBudW1iZXI7XG4gICAgICAgIHV0Zjg6IGJvb2xlYW47XG4gICAgICAgICdhdHRlbXB0LW5vJzogbnVtYmVyO1xuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgICdjZXJ0aWZpY2F0ZS12ZXJpZmllZCc6IGJvb2xlYW5cbiAgICB9O1xuICAgICdyZWNpcGllbnQtZG9tYWluJzogc3RyaW5nO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgY2FtcGFpZ25zOiBbXTtcbiAgICByZWFzb246IHN0cmluZztcbiAgICAndXNlci12YXJpYWJsZXMnOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHVua25vd247XG4gICAgfTtcbiAgICBmbGFnczoge1xuICAgICAgICAnaXMtcm91dGVkJzogYm9vbGVhbjtcbiAgICAgICAgJ2lzLWF1dGhlbnRpY2F0ZWQnOiBib29sZWFuO1xuICAgICAgICAnaXMtc3lzdGVtLXRlc3QnOiBib29sZWFuO1xuICAgICAgICAnaXMtdGVzdC1tb2RlJzogYm9vbGVhblxuICAgIH07XG4gICAgJ2xvZy1sZXZlbCcgOiBzdHJpbmc7XG4gICAgdGVtcGxhdGU/OiB1bmtub3duO1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgIGVudmVsb3BlOiB7XG4gICAgICAgIHRyYW5zcG9ydDogc3RyaW5nO1xuICAgICAgICBzZW5kZXI6IHN0cmluZztcbiAgICAgICAgJ3NlbmRpbmctaXAnOiBzdHJpbmc7XG4gICAgICAgIHRhcmdldHM6IHN0cmluZ1xuICAgIH07XG4gICAgbWVzc2FnZToge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICB0bzogc3RyaW5nO1xuICAgICAgICAgICAgJ21lc3NhZ2UtaWQnOiBzdHJpbmc7XG4gICAgICAgICAgICBmcm9tOiBzdHJpbmc7XG4gICAgICAgICAgICBzdWJqZWN0OiBzdHJpbmdcbiAgICAgICAgfTtcbiAgICAgICAgYXR0YWNobWVudHM6IFtdO1xuICAgICAgICBzaXplOiAzMDhcbiAgICB9O1xuICAgIHJlY2lwaWVudDogc3RyaW5nO1xuICAgIGV2ZW50OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEV2ZW50c0xpc3QgPSB7XG4gICAgaXRlbXM6IERvbWFpbkV2ZW50W107XG4gICAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbiAgICBzdGF0dXM6IG51bWJlcjtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vRXZlbnRzJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgSXBQb29sID0ge1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBpcHM6IHN0cmluZ1tdO1xuICBpc19saW5rZWQ6IGJvb2xlYW47XG4gIG5hbWU6IHN0cmluZztcbiAgcG9vbF9pZDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xMaXN0UmVzcG9uc2UgPSB7XG4gIGJvZHk6IHtcbiAgICBpcF9wb29sczogSXBQb29sLFxuICAgIG1lc3NhZ2U6IHN0cmluZ1xuICB9LFxuICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xMaXN0UmVzdWx0ID0ge1xuICBpcF9wb29sczogSXBQb29sLFxuICBtZXNzYWdlOiBzdHJpbmcsXG4gIHN0YXR1czogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbFVwZGF0ZURhdGEgPSB7XG4gIG5hbWU6IHN0cmluZyxcbiAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgaXBzOiBzdHJpbmdbXVxufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xNZXNzYWdlUmVzcG9uc2UgPSB7XG4gIGJvZHk6IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gIH1cbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbE1lc3NhZ2VSZXN1bHQgPSB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbERlbGV0ZURhdGEgPSB7XG4gIGlwPzogc3RyaW5nLFxuICBwb29sX2lkPzogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIElwUG9vbENyZWF0ZURhdGEgPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGlwcz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgdHlwZSBJcFBvb2xDcmVhdGVSZXNwb25zZSA9IHtcbiAgYm9keToge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBwb29sX2lkOiBzdHJpbmc7XG4gIH1cbiAgc3RhdHVzOiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgSXBQb29sQ3JlYXRlUmVzdWx0ID0ge1xuICBzdGF0dXM6IG51bWJlclxuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHBvb2xfaWQ6IHN0cmluZztcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSXBQb29scyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIElwc0xpc3RSZXNwb25zZUJvZHkgPSB7XG4gIGFzc2lnbmFibGVfdG9fcG9vbHM6IGJvb2xlYW47XG4gIGl0ZW1zOiBzdHJpbmdbXTtcbiAgdG90YWxfY291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgSXBEYXRhID0ge1xuICBpcDogc3RyaW5nO1xuICBkZWRpY2F0ZWQ6IGJvb2xlYW47XG4gIHJkbnM6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSVBzTGlzdFF1ZXJ5ID0ge1xuICBkZWRpY2F0ZWQ6IGJvb2xlYW4gfCBzdHJpbmdcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vSVBzJztcbiIsImltcG9ydCB7IEF4aW9zUHJveHlDb25maWcgfSBmcm9tICdheGlvcyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIE1haWxndW5DbGllbnRPcHRpb25zID0ge1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBrZXk6IHN0cmluZztcbiAgdXJsPzogc3RyaW5nO1xuICBwdWJsaWNfa2V5Pzogc3RyaW5nO1xuICB0aW1lb3V0PzogbnVtYmVyO1xuICBwcm94eT86IEF4aW9zUHJveHlDb25maWc7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL01haWxndW5DbGllbnRPcHRpb25zJztcbiIsImltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcbmltcG9ydCB7IE1haWxpbmdMaXN0IH0gZnJvbSAnLi9NYWlsaW5nTGlzdHMnO1xuXG5leHBvcnQgdHlwZSBNYWlsTGlzdE1lbWJlciA9IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHN1YnNjcmliZWQ6IGJvb2xlYW4sXG4gICAgdmFyczoge1xuICAgICAgICBba2V5OiBzdHJpbmddOiB1bmtub3duXG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgTWFpbExpc3RNZW1iZXJzUXVlcnkgPSB7XG4gICAgc3Vic2NyaWJlZD86ICd5ZXMnIHwgJ25vJztcbiAgICBsaW1pdD86IG51bWJlcjtcbiAgICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZU1lbWJlcnNEYXRhID0ge1xuICAgIG1lbWJlcnM6IEFycmF5PE1haWxMaXN0TWVtYmVyPjtcbiAgICB1cHNlcnQ6ICd5ZXMnIHwgJ25vJztcbn1cblxuZXhwb3J0IHR5cGUgTXVsdGlwbGVNZW1iZXJzUmVxRGF0YSA9IHtcbiAgICBtZW1iZXJzOiBzdHJpbmc7XG4gICAgdXBzZXJ0OiAneWVzJyB8ICdubyc7XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycyA9IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICB2YXJzPzogc3RyaW5nO1xuICAgIHN1YnNjcmliZWQ/OiAneWVzJyB8ICdubycgfCBib29sZWFuO1xuICAgIHVwc2VydD86ICd5ZXMnIHwgJ25vJztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzUmVxID0ge1xuICAgIGFkZHJlc3M6IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHZhcnM/OiBzdHJpbmc7XG4gICAgc3Vic2NyaWJlZD86ICd5ZXMnIHwgJ25vJyB8IGJvb2xlYW47XG4gICAgdXBzZXJ0PzogJ3llcycgfCAnbm8nO1xufVxuXG5leHBvcnQgdHlwZSBEZWxldGVkTWVtYmVyID0ge1xuICAgIG1lbWJlcjoge1xuICAgICAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgfSxcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gIH1cblxuZXhwb3J0IHR5cGUgTmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2UgPSB7XG4gICAgbGlzdDogTWFpbGluZ0xpc3Q7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICd0YXNrLWlkJzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNYWlsTGlzdE1lbWJlcnNSZXNwb25zZSA9IHtcbiAgICBib2R5OiB7XG4gICAgICAgIGl0ZW1zOiBNYWlsTGlzdE1lbWJlcltdXG4gICAgICAgIHBhZ2luZzogUGFnZXNMaXN0XG4gICAgfSxcbiAgICBzdGF0dXM6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBNYWlsTGlzdE1lbWJlcnNSZXN1bHQgPSB7XG4gICAgaXRlbXM6IE1haWxMaXN0TWVtYmVyW11cbiAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0XG4gICAgc3RhdHVzOiBudW1iZXJcbn1cbiIsImltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBMaXN0c1F1ZXJ5ID0ge1xuICAgIGFkZHJlc3M/OiBzdHJpbmc7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgcGFnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlVXBkYXRlTGlzdCA9IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBhY2Nlc3NfbGV2ZWw/OiAncmVhZG9ubHknIHwgJ21lbWJlcnMnfCAnZXZlcnlvbmUnO1xuICAgIHJlcGx5X3ByZWZlcmVuY2U/OiAnbGlzdCcgfCAnc2VuZGVyJztcbn1cblxuZXhwb3J0IHR5cGUgRGVzdHJveWVkTGlzdCA9IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBTdGFydFZhbGlkYXRpb25SZXN1bHQgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgaWQ6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIGRvd25sb2FkX3VybDoge1xuICAgICAgY3N2OiBzdHJpbmc7XG4gICAgICBqc29uOiBzdHJpbmdcbiAgICB9O1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcXVhbnRpdHk6IG51bWJlcjtcbiAgICByZWNvcmRzX3Byb2Nlc3NlZDogbnVtYmVyO1xuICAgIHN1bW1hcnk6IHtcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICBjYXRjaF9hbGw6IG51bWJlcjtcbiAgICAgICAgZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgZG9fbm90X3NlbmQ6IG51bWJlcjtcbiAgICAgICAgdW5kZWxpdmVyYWJsZTogbnVtYmVyO1xuICAgICAgICB1bmtub3duOiBudW1iZXJcbiAgICAgIH1cbiAgICAgIHJpc2s6IHtcbiAgICAgICAgaGlnaDogbnVtYmVyO1xuICAgICAgICBsb3c6IG51bWJlcjtcbiAgICAgICAgbWVkaXVtOiBudW1iZXI7XG4gICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdFZhbGlkYXRpb25BcGlSZXNwb25zZSA9IE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3BvbnNlICYge1xuICAgIGNyZWF0ZWRfYXQ6IG51bWJlcjtcbn1cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdERhdGEgPSBNYWlsaW5nTGlzdFZhbGlkYXRpb25SZXNwb25zZSAmIHtcbiAgICBjcmVhdGVkX2F0OiBEYXRlO1xufVxuZXhwb3J0IHR5cGUgTWFpbGluZ0xpc3RWYWxpZGF0aW9uUmVzdWx0ID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIHZhbGlkYXRpb25SZXN1bHQ6IE1haWxpbmdMaXN0VmFsaWRhdGlvblJlc3VsdERhdGE7XG59XG5cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0Q2FuY2VsVmFsaWRhdGlvblJlc3VsdCA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdCA9IHtcbiAgICBhY2Nlc3NfbGV2ZWw6IHN0cmluZztcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgbWVtYmVyc19jb3VudDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICByZXBseV9wcmVmZXJlbmNlOiBudWxsIHwgc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNYWlsaW5nTGlzdFJlc3VsdCA9IHtcbiAgICBpdGVtczogTWFpbGluZ0xpc3RbXTtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0XG59XG5cbmV4cG9ydCB0eXBlIE1haWxpbmdMaXN0QXBpUmVzcG9uc2UgPSB7XG4gICAgYm9keToge1xuICAgICAgICBpdGVtczogTWFpbGluZ0xpc3RbXTtcbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3Q7XG4gICAgfVxuICAgIHN0YXR1czogbnVtYmVyO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdE1lbWJlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9NYWlsaW5nTGlzdHMnO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qKlxuICogRW5zdXJlcyB0aGUgb2JqZWN0IGhhcyBsZWFzdCBvbmUga2V5IHByZXNlbnQgYW5kIG5vdCB1bmRlZmluZWRcbiAqXG4gKiBAc2VlIHtAbGluayBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDk3MjUxOTh9XG4gKi9cbmV4cG9ydCB0eXBlIEF0TGVhc3RPbmVLZXlQcmVzZW50PFxuICBPYmplY3RfLFxuICBLZXlzIGV4dGVuZHMga2V5b2YgT2JqZWN0XyA9IGtleW9mIE9iamVjdF9cbj4gPSBQaWNrPE9iamVjdF8sIEV4Y2x1ZGU8a2V5b2YgT2JqZWN0XywgS2V5cz4+ICZcbiAge1xuICAgIFtLIGluIEtleXNdLT86IFJlcXVpcmVkPFBpY2s8T2JqZWN0XywgSz4+ICZcbiAgICAgIFBhcnRpYWw8UGljazxPYmplY3RfLCBFeGNsdWRlPEtleXMsIEs+Pj47XG4gIH1bS2V5c107XG5cbmV4cG9ydCB0eXBlIE1pbWVNZXNzYWdlID0gc3RyaW5nIHwgQmxvYiB8IEJ1ZmZlciB8IE5vZGVKUy5SZWFkYWJsZVN0cmVhbTtcbmV4cG9ydCB0eXBlIEN1c3RvbUZpbGVEYXRhID0gc3RyaW5nIHwgQmxvYiB8IEZpbGUgfCBCdWZmZXIgfCBOb2RlSlMuUmVhZGFibGVTdHJlYW07XG5cbmV4cG9ydCB0eXBlIEN1c3RvbUZpbGUgPSB7XG4gIGRhdGE6IEN1c3RvbUZpbGVEYXRhO1xuICBmaWxlbmFtZT86IHN0cmluZztcbiAgY29udGVudFR5cGU/IDogc3RyaW5nO1xuICBrbm93bkxlbmd0aD86IG51bWJlcjtcbiAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbn1cblxuZXhwb3J0IHR5cGUgTWVzc2FnZUF0dGFjaG1lbnQgPVxuICBDdXN0b21GaWxlXG4gIHwgQ3VzdG9tRmlsZVtdXG4gIHwgRmlsZVxuICB8IEZpbGVbXVxuICB8IHN0cmluZ1xuICB8IEN1c3RvbUZpbGVEYXRhXG4gIHwgQ3VzdG9tRmlsZURhdGFbXVxuXG5leHBvcnQgdHlwZSBGb3JtRGF0YUlucHV0VmFsdWUgPVxuICBNaW1lTWVzc2FnZVxuICB8IEN1c3RvbUZpbGVEYXRhXG4gIHwgc3RyaW5nXG4gIHwgc3RyaW5nW11cbiAgfCBib29sZWFuXG4gIHwgTWVzc2FnZUF0dGFjaG1lbnRcbiAgfCB1bmRlZmluZWRcbiAgfCBudW1iZXIgLy8gZG9jIHNheXMgaXQgc2hvdWxkIGJlIGF1dG8tY29udmVydGVkIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Gb3JtRGF0YS9hcHBlbmRcbiAgfCBKc29uT2JqZWN0XG5cbmV4cG9ydCB0eXBlIEpzb25QcmltaXRpdmUgPSBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbDtcbmV4cG9ydCB0eXBlIEpzb25BcnJheSA9IEpzb25bXTtcbmV4cG9ydCB0eXBlIEpzb25PYmplY3QgPSB7IFtrZXk6IHN0cmluZ106IEpzb24gfTtcbmV4cG9ydCB0eXBlIEpzb25Db21wb3NpdGUgPSBKc29uQXJyYXkgfCBKc29uT2JqZWN0O1xuZXhwb3J0IHR5cGUgSnNvbiA9IEpzb25QcmltaXRpdmUgfCBKc29uQ29tcG9zaXRlO1xuXG5leHBvcnQgdHlwZSBNYWlsZ3VuTWVzc2FnZUNvbnRlbnQgPSBBdExlYXN0T25lS2V5UHJlc2VudDx7XG4gICAgLyoqXG4gICAgICogQm9keSBvZiB0aGUgbWVzc2FnZS4gKHRleHQgdmVyc2lvbilcbiAgICAgKi9cbiAgICB0ZXh0Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQm9keSBvZiB0aGUgbWVzc2FnZS4gKEhUTUwgdmVyc2lvbilcbiAgICAgKi9cbiAgICBodG1sPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEJvZHkgb2YgdGhlIG1lc3NhZ2UuIChNSU1FIHZlcnNpb24pXG4gICAgICovXG4gICAgbWVzc2FnZT86IE1pbWVNZXNzYWdlO1xuICAgICAvKipcbiAgICAgKiBOYW1lIG9mIGEgdGVtcGxhdGUgc3RvcmVkIHZpYSBbdGVtcGxhdGUgQVBJXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L2FwaS10ZW1wbGF0ZXMuaHRtbCNhcGktdGVtcGxhdGVzKS4gU2VlIFtUZW1wbGF0ZXNdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCN0ZW1wbGF0aW5nKSBmb3IgbW9yZSBpbmZvcm1hdGlvblxuICAgICAqL1xuICAgIHRlbXBsYXRlPzogc3RyaW5nO1xufT47XG5cbmV4cG9ydCB0eXBlIE1haWxndW5NZXNzYWdlRGF0YSA9IE1haWxndW5NZXNzYWdlQ29udGVudCAmIHtcbiAgICAvKipcbiAgICAgKiBFbWFpbCBhZGRyZXNzIGZvciBgRnJvbWAgaGVhZGVyXG4gICAgICovXG4gICAgZnJvbT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIEVtYWlsIGFkZHJlc3Mgb2YgdGhlIHJlY2lwaWVudChzKS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGBCb2IgPGJvYkBob3N0LmNvbT5gLiBZb3UgY2FuIHVzZSBjb21tYXMgdG8gc2VwYXJhdGUgbXVsdGlwbGUgcmVjaXBpZW50cy5cbiAgICAgKi9cbiAgICB0bz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBgVG9gIGJ1dCBmb3IgYGNhcmJvbiBjb3B5YFxuICAgICAqL1xuICAgIGNjPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIGBUb2AgYnV0IGZvciBgYmxpbmQgY2FyYm9uIGNvcHlgXG4gICAgICovXG4gICAgYmNjPzogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBNZXNzYWdlIHN1YmplY3RcbiAgICAgKi9cbiAgICBzdWJqZWN0Pzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogW0FNUF0oaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vZ21haWwvYW1wZW1haWwvKSBwYXJ0IG9mIHRoZSBtZXNzYWdlLiBQbGVhc2UgZm9sbG93IGdvb2dsZSBndWlkZWxpbmVzIHRvIGNvbXBvc2UgYW5kIHNlbmQgQU1QIGVtYWlscy5cbiAgICAgKi9cbiAgICAnYW1wLWh0bWwnPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRmlsZSBhdHRhY2htZW50LiBZb3UgY2FuIHBvc3QgbXVsdGlwbGUgYGF0dGFjaG1lbnRgIHZhbHVlcy5cbiAgICAgKlxuICAgICAqICoqSW1wb3J0YW50OioqIFlvdSBtdXN0IHVzZSBgbXVsdGlwYXJ0L2Zvcm0tZGF0YWAgZW5jb2Rpbmcgd2hlbiBzZW5kaW5nIGF0dGFjaG1lbnRzLlxuICAgICAqL1xuICAgIGF0dGFjaG1lbnQ/OiBNZXNzYWdlQXR0YWNobWVudDtcblxuICAgIC8qKlxuICAgICAqIEF0dGFjaG1lbnQgd2l0aCBgaW5saW5lYCBkaXNwb3NpdGlvbi4gQ2FuIGJlIHVzZWQgdG8gc2VuZCBpbmxpbmUgaW1hZ2VzIChzZWUgZXhhbXBsZSkuXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIHBvc3QgbXVsdGlwbGUgYGlubGluZWAgdmFsdWVzLlxuICAgICAqL1xuICAgIGlubGluZT86IGFueTtcblxuICAgIC8qKlxuICAgICAqIFVzZSB0aGlzIHBhcmFtZXRlciB0byBzZW5kIGEgbWVzc2FnZSB0byBzcGVjaWZpYyB2ZXJzaW9uIG9mIGEgdGVtcGxhdGVcbiAgICAgKi9cbiAgICAndDp2ZXJzaW9uJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFBhc3MgYHllc2AgaWYgeW91IHdhbnQgdG8gaGF2ZSByZW5kZXJlZCB0ZW1wbGF0ZVxuICAgICAqIGluIHRoZSB0ZXh0IHBhcnQgb2YgdGhlIG1lc3NhZ2UgaW4gY2FzZSBvZiB0ZW1wbGF0ZSBzZW5kaW5nXG4gICAgICovXG4gICAgJ3Q6dGV4dCc/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogQSB2YWxpZCBKU09OLWVuY29kZWQgZGljdGlvbmFyeSB1c2VkIGFzIHRoZSBpbnB1dCBmb3IgdGVtcGxhdGUgdmFyaWFibGUgZXhwYW5zaW9uLlxuICAgICAqIFNlZSBbVGVtcGxhdGVzXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L2FwaS10ZW1wbGF0ZXMuaHRtbCNhcGktdGVtcGxhdGVzKSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICAndDp2YXJpYWJsZXMnPzogc3RyaW5nIHwgSnNvbk9iamVjdDtcblxuICAgIC8qKlxuICAgICAqIFRhZyBzdHJpbmcuIFNlZSBbVGFnZ2luZ10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI3RhZ2dpbmcpIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgICdvOnRhZyc/OiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMvZGlzYWJsZXMgREtJTSBzaWduYXR1cmVzIG9uIHBlci1tZXNzYWdlIGJhc2lzLiBQYXNzIGB5ZXNgLCBgbm9gLCBgdHJ1ZWAgb3IgYGZhbHNlYFxuICAgICAqL1xuICAgICdvOmRraW0nPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIERlc2lyZWQgdGltZSBvZiBkZWxpdmVyeS4gU2VlIFtEYXRlIEZvcm1hdF0oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC9hcGktaW50cm8uaHRtbCNkYXRlLWZvcm1hdCkuXG4gICAgICpcbiAgICAgKiBOb3RlOiBNZXNzYWdlcyBjYW4gYmUgc2NoZWR1bGVkIGZvciBhIG1heGltdW0gb2YgMyBkYXlzIGluIHRoZSBmdXR1cmUuXG4gICAgICovXG4gICAgJ286ZGVsaXZlcnl0aW1lJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgU2VuZCBUaW1lIE9wdGltaXphdGlvbiAoU1RPKSBvbiBhIHBlci1tZXNzYWdlIGJhc2lzLlxuICAgICAqXG4gICAgICogU3RyaW5nIHNob3VsZCBiZSBzZXQgdG8gdGhlIG51bWJlciBvZiBob3VycyBpbiBgWzAtOV0raGAgZm9ybWF0LFxuICAgICAqIHdpdGggdGhlIG1pbmltdW0gYmVpbmcgYDI0aGAgYW5kIHRoZSBtYXhpbXVtIGJlaW5nIGA3MmhgLlxuICAgICAqXG4gICAgICogVGhpcyB2YWx1ZSBkZWZpbmVzIHRoZSB0aW1lIHdpbmRvdyBpbiB3aGljaCBNYWlsZ3VuIHdpbGwgcnVuIHRoZSBvcHRpbWl6YXRpb24gYWxnb3JpdGhtIGJhc2VkIG9uIHByaW9yIGVuZ2FnZW1lbnQgZGF0YSBvZiBhIGdpdmVuIHJlY2lwaWVudC4gU2VlIFtTZW5kaW5nIGEgbWVzc2FnZSB3aXRoIFNUT10oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI3N0by1zZW5kaW5nKSBmb3IgZGV0YWlscy5cbiAgICAgKlxuICAgICAqIF9QbGVhc2Ugbm90ZSB0aGF0IFNUTyBpcyBvbmx5IGF2YWlsYWJsZSBvbiBjZXJ0YWluIHBsYW5zLlxuICAgICAqIFNlZSB3d3cubWFpbGd1bi5jb20vcHJpY2luZyBmb3IgbW9yZSBpbmZvLl9cbiAgICAgKi9cbiAgICAnbzpkZWxpdmVyeXRpbWUtb3B0aW1pemUtcGVyaW9kJz86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgVGltZXpvbmUgT3B0aW1pemF0aW9uIChUWk8pIG9uIGEgcGVyIG1lc3NhZ2UgYmFzaXMuXG4gICAgICpcbiAgICAgKiBTdHJpbmcgc2hvdWxkIGJlIHNldCB0byBwcmVmZXJyZWQgZGVsaXZlcnkgdGltZSBpbiBgSEg6bW1gIG9yIGBoaDptbWFhYCBmb3JtYXQsIHdoZXJlIGBISDptbWAgaXMgdXNlZCBmb3IgMjQgaG91ciBmb3JtYXQgd2l0aG91dCBBTS9QTSBhbmQgYGhoOm1tYWFgIGlzIHVzZWQgZm9yIDEyIGhvdXIgZm9ybWF0IHdpdGggQU0vUE0uIFNlZSBbU2VuZGluZyBhIG1lc3NhZ2Ugd2l0aCBUWk9dKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCN0em8tc2VuZGluZykgZm9yIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBQbGVhc2Ugbm90ZSB0aGF0IFRaTyBpcyBvbmx5IGF2YWlsYWJsZSBvbiBjZXJ0YWluIHBsYW5zLlxuICAgICAqIFNlZSB3d3cubWFpbGd1bi5jb20vcHJpY2luZyBmb3IgbW9yZSBpbmZvLlxuICAgICAqL1xuICAgICdvOnRpbWUtem9uZS1sb2NhbGl6ZSc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzIHNlbmRpbmcgaW4gdGVzdCBtb2RlLiBQYXNzIGB5ZXNgIGlmIG5lZWRlZC4gU2VlIFtTZW5kaW5nIGluIFRlc3QgTW9kZV0oaHR0cHM6Ly9kb2N1bWVudGF0aW9uLm1haWxndW4uY29tL2VuL2xhdGVzdC91c2VyX21hbnVhbC5odG1sI21hbnVhbC10ZXN0bW9kZSlcbiAgICAgKi9cbiAgICAnbzp0ZXN0bW9kZSc/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0cmFja2luZyBvbiBhIHBlci1tZXNzYWdlIGJhc2lzLCBzZWUgW1RyYWNraW5nIE1lc3NhZ2VzXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjdHJhY2tpbmctbWVzc2FnZXMgZm9yIGRldGFpbHMuIFBhc3MgJ3llcycsICdubycsICd0cnVlJyBvciAnZmFsc2UnXG4gICAgICovXG4gICAgJ286dHJhY2tpbmcnPzogYm9vbGVhbiB8ICd5ZXMnIHwgJ25vJztcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgY2xpY2tzIHRyYWNraW5nIG9uIGEgcGVyLW1lc3NhZ2UgYmFzaXMuXG4gICAgICogSGFzIGhpZ2hlciBwcmlvcml0eSB0aGFuIGRvbWFpbi1sZXZlbCBzZXR0aW5nLlxuICAgICAqIFBhc3MgYHllc2AsIGBub2AsIGB0cnVlYCwgYGZhbHNlYCBvciBgaHRtbG9ubHlgLlxuICAgICAqL1xuICAgICdvOnRyYWNraW5nLWNsaWNrcyc/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nIHwgJ2h0bWxvbmx5JztcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgb3BlbnMgdHJhY2tpbmcgb24gYSBwZXItbWVzc2FnZSBiYXNpcy5cbiAgICAgKiBIYXMgaGlnaGVyIHByaW9yaXR5IHRoYW4gZG9tYWluLWxldmVsIHNldHRpbmcuXG4gICAgICogIFBhc3MgJ3llcycgb3IgJ25vJywgJ3RydWUnIG9yICdmYWxzZSdcbiAgICAgKi9cbiAgICAnbzp0cmFja2luZy1vcGVucyc/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogSWYgc2V0IHRvICdUcnVlJyBvciAneWVzJyB0aGlzIHJlcXVpcmVzIHRoZSBtZXNzYWdlIG9ubHkgYmUgc2VudCBvdmVyIGEgVExTIGNvbm5lY3Rpb24uXG4gICAgICogSWYgYSBUTFMgY29ubmVjdGlvbiBjYW4gbm90IGJlIGVzdGFibGlzaGVkLCBNYWlsZ3VuIHdpbGwgbm90IGRlbGl2ZXIgdGhlIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBJZiBzZXQgdG8gJ0ZhbHNlJyBvciAnbm8nLCBNYWlsZ3VuIHdpbGwgc3RpbGwgdHJ5IGFuZCB1cGdyYWRlIHRoZSBjb25uZWN0aW9uLFxuICAgICAqIGJ1dCBpZiBNYWlsZ3VuIGNhbiBub3QsIHRoZSBtZXNzYWdlIHdpbGwgYmUgZGVsaXZlcmVkIG92ZXIgYSBwbGFpbnRleHQgU01UUCBjb25uZWN0aW9uLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgaXMgJ0ZhbHNlJy5cbiAgICAgKi9cbiAgICAnbzpyZXF1aXJlLXRscyc/OiBib29sZWFuIHwgJ3llcycgfCAnbm8nO1xuXG4gICAgLyoqXG4gICAgICogSWYgc2V0IHRvIGBUcnVlYCBvciBgeWVzYCwgdGhlIGNlcnRpZmljYXRlIGFuZCBob3N0bmFtZSB3aWxsIG5vdCBiZSB2ZXJpZmllZFxuICAgICAqIHdoZW4gdHJ5aW5nIHRvIGVzdGFibGlzaCBhIFRMUyBjb25uZWN0aW9uXG4gICAgICogYW5kIE1haWxndW4gd2lsbCBhY2NlcHQgYW55IGNlcnRpZmljYXRlIGR1cmluZyBkZWxpdmVyeS5cbiAgICAgKlxuICAgICAqIElmIHNldCB0byBgRmFsc2VgIG9yIGBub2AsIE1haWxndW4gd2lsbCB2ZXJpZnkgdGhlIGNlcnRpZmljYXRlIGFuZCBob3N0bmFtZS5cbiAgICAgKiBJZiBlaXRoZXIgb25lIGNhbiBub3QgYmUgdmVyaWZpZWQsIGEgVExTIGNvbm5lY3Rpb24gd2lsbCBub3QgYmUgZXN0YWJsaXNoZWQuXG4gICAgICpcbiAgICAgKiBUaGUgZGVmYXVsdCBpcyBgRmFsc2VgLlxuICAgICAqL1xuICAgICdvOnNraXAtdmVyaWZpY2F0aW9uJz86IGJvb2xlYW4gfCAneWVzJyB8ICdubyc7XG5cbiAgICAvKipcbiAgICAgKiBBIHZhbGlkIEpTT04tZW5jb2RlZCBkaWN0aW9uYXJ5LCB3aGVyZSBrZXkgaXMgYSBwbGFpbiByZWNpcGllbnQgYWRkcmVzcyBhbmQgdmFsdWUgaXMgYSBkaWN0aW9uYXJ5IHdpdGggdmFyaWFibGVzIHRoYXQgY2FuIGJlIHJlZmVyZW5jZWQgaW4gdGhlIG1lc3NhZ2UgYm9keS4gU2VlIFtCYXRjaCBTZW5kaW5nXShodHRwczovL2RvY3VtZW50YXRpb24ubWFpbGd1bi5jb20vZW4vbGF0ZXN0L3VzZXJfbWFudWFsLmh0bWwjYmF0Y2gtc2VuZGluZykgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgJ3JlY2lwaWVudC12YXJpYWJsZXMnPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogaDonIHByZWZpeCBmb2xsb3dlZCBieSBhbiBhcmJpdHJhcnkgdmFsdWUgYWxsb3dzIHRvIGFwcGVuZCBhIGN1c3RvbSBNSU1FIGhlYWRlclxuICAgICAqIHRvIHRoZSBtZXNzYWdlICgnWC1NeS1IZWFkZXInIGluIHRoaXMgY2FzZSkuXG4gICAgICogRm9yIGV4YW1wbGUsIGBoOlJlcGx5LVRvYCB0byBzcGVjaWZ5IFJlcGx5LVRvIGFkZHJlc3MuXG4gICAgICovXG4gICAgJ2g6WC1NeS1IZWFkZXInPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogYHY6YCBwcmVmaXggZm9sbG93ZWQgYnkgYW4gYXJiaXRyYXJ5IG5hbWUgYWxsb3dzIHRvIGF0dGFjaCBhIGN1c3RvbSBKU09OIGRhdGEgdG8gdGhlIG1lc3NhZ2UuIFNlZSBbQXR0YWNoaW5nIERhdGEgdG8gTWVzc2FnZXNdKGh0dHBzOi8vZG9jdW1lbnRhdGlvbi5tYWlsZ3VuLmNvbS9lbi9sYXRlc3QvdXNlcl9tYW51YWwuaHRtbCNtYW51YWwtY3VzdG9tZGF0YSkgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgJ3Y6bXktdmFyJz86IHN0cmluZztcblxuICAgIFtrZXk6IHN0cmluZ106IEZvcm1EYXRhSW5wdXRWYWx1ZTtcbn1cblxuZXhwb3J0IHR5cGUgTWVzc2FnZXNTZW5kQVBJUmVzcG9uc2UgPSB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgYm9keToge1xuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBNZXNzYWdlc1NlbmRSZXN1bHQgPSB7XG4gICAgaWQ/OiBzdHJpbmcsXG4gICAgbWVzc2FnZT86IHN0cmluZztcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBkZXRhaWxzPzogc3RyaW5nO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NZXNzYWdlcyc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIFJvdXRlID0ge1xuICAgIGFjdGlvbnM6IHN0cmluZ1tdO1xuICAgIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGV4cHJlc3Npb246IHN0cmluZztcbiAgICBpZDogc3RyaW5nO1xuICAgIHByaW9yaXR5OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZVJvdXRlUmVzcG9uc2UgPSBSb3V0ZSAmIHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIERlc3Ryb3lSb3V0ZVJlc3BvbnNlID0ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDcmVhdGVVcGRhdGVSb3V0ZURhdGEgPSB7XG4gICAgcHJpb3JpdHk/OiBudW1iZXI7XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgZXhwcmVzc2lvbjogc3RyaW5nO1xuICAgIGFjdGlvbjogc3RyaW5nW107XG59XG5cbmV4cG9ydCB0eXBlIFJvdXRlc0xpc3RRdWVyeSA9IHtcbiAgICBsaW1pdD86IG51bWJlcjtcbiAgICBza2lwPzogbnVtYmVyO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9Sb3V0ZXMnO1xuIiwiZXhwb3J0IHR5cGUgU3RhdCA9IHtcbiAgdGltZTogc3RyaW5nIHwgRGF0ZSxcbiAgZGVsaXZlcmVkOiB7XG4gICAgc210cDogbnVtYmVyLFxuICAgIGh0dHA6IG51bWJlcixcbiAgICB0b3RhbDogbnVtYmVyXG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU3RhdHNPcHRpb25zID0ge1xuICBzdGFydDogc3RyaW5nIHwgRGF0ZTtcbiAgZW5kOiBzdHJpbmcgfCBEYXRlO1xuICByZXNvbHV0aW9uOiBzdHJpbmc7XG4gIHN0YXRzOiBTdGF0W107XG59XG5cbmV4cG9ydCB0eXBlIFN0YXRzRXZlbnQgPSAnYWNjZXB0ZWQnIHwgJ2RlbGl2ZXJlZCcgfCAnb3BlbmVkJyB8ICdjbGlja2VkJyB8ICd1bnN1YnNjcmliZWQnIHwgJ3N0b3JlZCcgfCAnY29tcGxhaW5lZCcgfCAnZmFpbGVkJztcblxuZXhwb3J0IHR5cGUgU3RhdHNRdWVyeSA9IHtcbiAgZXZlbnQ6IFN0YXRzRXZlbnQgfCBTdGF0c0V2ZW50W107XG4gIHN0YXJ0Pzogc3RyaW5nIHwgRGF0ZTtcbiAgZW5kPzogc3RyaW5nIHwgRGF0ZTtcbiAgcmVzb2x1dGlvbj86ICdob3VyJ3wgJ2RheScgfCAnbW9udGgnO1xuICBkdXJhdGlvbj86IHN0cmluZztcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vU3RhdHMnO1xuIiwiZXhwb3J0IHR5cGUgU3ViYWNjb3VudHNRdWVyeSA9IHtcbiAgZW5hYmxlZD86IGJvb2xlYW47XG4gIGxpbWl0PzogbnVtYmVyO1xuICBza2lwPzogbnVtYmVyO1xuICBzb3J0PzogJ2FzYycgfCAnZGVzYyc7XG59XG5cbmV4cG9ydCB0eXBlIFN1YmFjY291bnRMaXN0SXRlbSA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBzdGF0dXM6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgU3ViYWNjb3VudExpc3RSZXNwb25zZURhdGEgPSB7XG4gIHN1YmFjY291bnRzOiBTdWJhY2NvdW50TGlzdEl0ZW1bXTtcbiAgdG90YWw6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3ViYWNjb3VudFJlc3BvbnNlRGF0YSA9IHtcbiAgc3ViYWNjb3VudDogU3ViYWNjb3VudExpc3RJdGVtXG59XG4iLCJleHBvcnQgKiBmcm9tICcuL1N1YmFjY291bnRzJztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgQm91bmNlRGF0YSA9IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIGVycm9yOiBzdHJpbmc7XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nIHwgRGF0ZTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuZXhwb3J0IHR5cGUgQ29tcGxhaW50RGF0YSA9IHtcbiAgICBhZGRyZXNzOiBzdHJpbmc7XG4gICAgY3JlYXRlZF9hdDogc3RyaW5nIHwgRGF0ZTtcbn1cbiIsImltcG9ydCB7XG4gIEJvdW5jZURhdGEsXG4gIENvbXBsYWludERhdGEsXG4gIFVuc3Vic2NyaWJlRGF0YSxcbiAgV2hpdGVMaXN0RGF0YVxufSBmcm9tICcuJztcbmltcG9ydCB7XG4gIElCb3VuY2UsIElDb21wbGFpbnQsIElVbnN1YnNjcmliZSwgSVdoaXRlTGlzdFxufSBmcm9tICcuLi8uLi9JbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgUGFnZXNMaXN0LCBQYXJzZWRQYWdlc0xpc3QgfSBmcm9tICcuLi9Db21tb24nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25MaXN0ID0ge1xuICBpdGVtczogKElCb3VuY2UgfCBJQ29tcGxhaW50IHwgSVVuc3Vic2NyaWJlIHwgSVdoaXRlTGlzdClbXTtcbiAgcGFnZXM6IFBhcnNlZFBhZ2VzTGlzdDtcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uTGlzdFF1ZXJ5ID0ge1xuICBsaW1pdD86IG51bWJlcjtcbiAgcGFnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25EYXRhVHlwZSA9IEJvdW5jZURhdGEgfCBDb21wbGFpbnREYXRhIHwgVW5zdWJzY3JpYmVEYXRhIHwgV2hpdGVMaXN0RGF0YTtcblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25MaXN0UmVzcG9uc2UgPSB7XG4gIGJvZHk6IHtcbiAgICBpdGVtczogQm91bmNlRGF0YVtdIHwgQ29tcGxhaW50RGF0YVtdIHwgVW5zdWJzY3JpYmVEYXRhW10gfCBXaGl0ZUxpc3REYXRhW107XG4gICAgcGFnaW5nOiBQYWdlc0xpc3Q7XG4gIH1cbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uUmVzcG9uc2UgPSB7XG4gIGJvZHk6IFN1cHByZXNzaW9uRGF0YVR5cGU7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZSA9IHtcbiAgYm9keToge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgICBhZGRyZXNzPzogc3RyaW5nO1xuICB9XG4gIHN0YXR1czogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQgPSB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgYWRkcmVzczogc3RyaW5nO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgPSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY29kZT86IG51bWJlcjtcbiAgZXJyb3I/OiBzdHJpbmc7XG4gIGRvbWFpbj86IHN0cmluZztcbiAgdGFnPzogc3RyaW5nOyAvLyB3b3JrcyBvbmx5IHdpdGggRm9ybURhdGEgdXNhZ2UgZm9yIG9uZSB1bnN1YnNjcmliZVxuICBjcmVhdGVkX2F0Pzogc3RyaW5nIDtcbiAgdGFncz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgdHlwZSBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzcG9uc2UgPSB7XG4gIGJvZHk6e1xuICAgIG1lc3NhZ2U6c3RyaW5nO1xuICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgdmFsdWU/OiBzdHJpbmc7XG4gIH1cbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQgPSB7XG4gIG1lc3NhZ2U6c3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHN0YXR1czogbnVtYmVyO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5leHBvcnQgdHlwZSBVbnN1YnNjcmliZURhdGEgPSB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIHRhZ3M6IGFueTtcbiAgICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuIiwiZXhwb3J0IHR5cGUgV2hpdGVMaXN0RGF0YSA9IHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgdmFsdWU6IHN0cmluZztcbiAgICByZWFzb246IHN0cmluZztcbiAgICBjcmVhdGVkQXQ6IHN0cmluZyB8IERhdGU7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL0JvdW5jZSc7XG5leHBvcnQgKiBmcm9tICcuL0NvbXBsYWludCc7XG5leHBvcnQgKiBmcm9tICcuL1N1cHByZXNzaW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL1Vuc3Vic2NyaWJlJztcbmV4cG9ydCAqIGZyb20gJy4vV2hpdGVMaXN0JztcbiIsImltcG9ydCB7IFBhZ2VzTGlzdCwgUGFyc2VkUGFnZXNMaXN0IH0gZnJvbSAnLi4vQ29tbW9uJztcbmltcG9ydCB7IEN1c3RvbUZpbGUsIEN1c3RvbUZpbGVEYXRhIH0gZnJvbSAnLi4vTWVzc2FnZXMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkpvYkRhdGEgPSB7XG4gICAgY3JlYXRlZF9hdDogbnVtYmVyO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcXVhbnRpdHk6IG51bWJlcjtcbiAgICByZWNvcmRzX3Byb2Nlc3NlZDogbnVtYmVyIHwgbnVsbDtcbiAgICBzdGF0dXM6IHN0cmluZztcbiAgICBkb3dubG9hZF91cmw/OiB7XG4gICAgICAgIGNzdjogc3RyaW5nO1xuICAgICAgICBqc29uOiBzdHJpbmc7XG4gICAgfTtcbiAgICBzdW1tYXJ5Pzoge1xuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgIGNhdGNoX2FsbDogbnVtYmVyO1xuICAgICAgICAgICAgZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICAgIGRvX25vdF9zZW5kOiBudW1iZXI7XG4gICAgICAgICAgICB1bmRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICAgIH07XG4gICAgICAgIHJpc2s6IHtcbiAgICAgICAgICAgIGhpZ2g6IG51bWJlcjtcbiAgICAgICAgICAgIGxvdzogbnVtYmVyO1xuICAgICAgICAgICAgbWVkaXVtOiBudW1iZXI7XG4gICAgICAgICAgICB1bmtub3duOiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkpvYlJlc3VsdCA9IHtcbiAgICBjcmVhdGVkQXQ6IERhdGU7XG4gICAgaWQ6IHN0cmluZztcbiAgICBxdWFudGl0eTogbnVtYmVyO1xuICAgIHJlY29yZHNQcm9jZXNzZWQ6IG51bWJlciB8IG51bGw7XG4gICAgc3RhdHVzOiBzdHJpbmc7XG4gICAgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXI7IC8vIGh0dHAgcmVzcG9uc2Ugc3RhdHVzIGNvZGVcbiAgICBkb3dubG9hZFVybD86IHtcbiAgICAgICAgY3N2OiBzdHJpbmc7XG4gICAgICAgIGpzb246IHN0cmluZztcbiAgICB9O1xuICAgIHN1bW1hcnk/OiB7XG4gICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgY2F0Y2hBbGw6IG51bWJlcjtcbiAgICAgICAgICAgIGRlbGl2ZXJhYmxlOiBudW1iZXI7XG4gICAgICAgICAgICBkb05vdFNlbmQ6IG51bWJlcjtcbiAgICAgICAgICAgIHVuZGVsaXZlcmFibGU6IG51bWJlcjtcbiAgICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgICAgfTtcbiAgICAgICAgcmlzazoge1xuICAgICAgICAgICAgaGlnaDogbnVtYmVyO1xuICAgICAgICAgICAgbG93OiBudW1iZXI7XG4gICAgICAgICAgICBtZWRpdW06IG51bWJlcjtcbiAgICAgICAgICAgIHVua25vd246IG51bWJlcjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlZE11bHRpcGxlVmFsaWRhdGlvbkpvYiA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YSA9IHtcbiAgICBmaWxlOiBDdXN0b21GaWxlRGF0YSB8IEN1c3RvbUZpbGVcbn1cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkNyZWF0aW9uRGF0YVVwZGF0ZWQgPSB7XG4gICAgbXVsdGlwbGVWYWxpZGF0aW9uRmlsZTogQ3VzdG9tRmlsZURhdGEgfCBDdXN0b21GaWxlO1xufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3VsdCA9IHtcbiAgICBqb2JzOiBNdWx0aXBsZVZhbGlkYXRpb25Kb2JSZXN1bHRbXTtcbiAgICBwYWdlczogUGFyc2VkUGFnZXNMaXN0O1xuICAgIHRvdGFsOiBudW1iZXI7XG4gICAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UXVlcnkgPSB7XG4gICAgbGltaXQ6IG51bWJlcjtcbiAgICBwYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNdWx0aXBsZVZhbGlkYXRpb25Kb2JzTGlzdFJlc3BvbnNlID0ge1xuICAgIHN0YXR1czogbnVtYmVyO1xuICAgIGJvZHk6IHtcbiAgICAgICAgcGFnaW5nOiBQYWdlc0xpc3Q7XG4gICAgICAgIGpvYnM6IE11bHRpcGxlVmFsaWRhdGlvbkpvYkRhdGFbXTtcbiAgICAgICAgdG90YWw6IG51bWJlcjtcbiAgICB9XG59XG5leHBvcnQgdHlwZSBDYW5jZWxlZE11bHRpcGxlVmFsaWRhdGlvbkpvYiA9IHtcbiAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICBzdGF0dXM6IG51bWJlcjtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5leHBvcnQgdHlwZSBWYWxpZGF0aW9uUXVlcnkgPSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbn1cbmV4cG9ydCB0eXBlIFZhbGlkYXRpb25SZXN1bHQgPSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgaXNfZGlzcG9zYWJsZV9hZGRyZXNzOiBib29sZWFuO1xuICBpc19yb2xlX2FkZHJlc3M6IGJvb2xlYW47XG4gIHJlYXNvbjogc3RyaW5nW107XG4gIHJlc3VsdDogc3RyaW5nO1xuICByaXNrOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFZhbGlkYXRpb25SZXNwb25zZSA9IHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIGJvZHk6IFZhbGlkYXRpb25SZXN1bHQ7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL011bHRpcGxlVmFsaWRhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL1ZhbGlkYXRpb24nO1xuIiwiZXhwb3J0IHR5cGUgQVBJV2ViaG9vayA9IHtcbiAgICB1cmw/OiBzdHJpbmdcbiAgICB1cmxzPzogc3RyaW5nW107XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tSZXNwb25zZUJvZHkgPSB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHdlYmhvb2s6IEFQSVdlYmhvb2s7XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tSZXNwb25zZSA9IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICBib2R5OiBXZWJob29rUmVzcG9uc2VCb2R5O1xufVxuXG5leHBvcnQgdHlwZSBXZWJob29rTGlzdCA9IHtcbiAgICBbaWQ6IHN0cmluZ106IHtcbiAgICAgICAgdXJsczogc3RyaW5nW11cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIFdlYmhvb2tzUXVlcnkgPSB7XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgc2tpcD86IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgV2ViaG9va1ZhbGlkYXRpb25SZXNwb25zZSA9IHtcbiAgICBjb2RlOiBudW1iZXI7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBXZWJob29rUmVzdWx0ID0ge1xuICBpZDogc3RyaW5nO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXJsIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuIFVzZSBcInVybHNcIiBpbnN0ZWFkLlxuICAgKi9cbiAgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHVybHM6IHN0cmluZ1tdO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9XZWJob29rcyc7XG4iLCJleHBvcnQgKiBmcm9tICcuL0NvbW1vbic7XG5leHBvcnQgKiBmcm9tICcuL0RvbWFpbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9FdmVudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9JUFBvb2xzJztcbmV4cG9ydCAqIGZyb20gJy4vSVBzJztcbmV4cG9ydCAqIGZyb20gJy4vTWFpbGd1bkNsaWVudCc7XG5leHBvcnQgKiBmcm9tICcuL01haWxpbmdMaXN0cyc7XG5leHBvcnQgKiBmcm9tICcuL01lc3NhZ2VzJztcbmV4cG9ydCAqIGZyb20gJy4vUm91dGVzJztcbmV4cG9ydCAqIGZyb20gJy4vU3RhdHMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdWJhY2NvdW50cyc7XG5leHBvcnQgKiBmcm9tICcuL1N1cHByZXNzaW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL1ZhbGlkYXRpb25zJztcbmV4cG9ydCAqIGZyb20gJy4vV2ViaG9va3MnO1xuIiwiaW1wb3J0IE1haWxndW5DbGllbnQgZnJvbSAnLi9DbGFzc2VzL01haWxndW5DbGllbnQnO1xuaW1wb3J0IHsgSU1haWxndW5DbGllbnQgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xuaW1wb3J0IHsgSW5wdXRGb3JtRGF0YSwgTWFpbGd1bkNsaWVudE9wdGlvbnMgfSBmcm9tICcuL1R5cGVzJztcblxuZXhwb3J0ICogYXMgRW51bXMgZnJvbSAnLi9FbnVtcyc7XG5leHBvcnQgKiBmcm9tICcuL1R5cGVzJztcbmV4cG9ydCAqIGFzIEludGVyZmFjZXMgZnJvbSAnLi9JbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbGd1biB7XG4gIHN0YXRpYyBnZXQgZGVmYXVsdCgpOiB0eXBlb2YgTWFpbGd1biB7IHJldHVybiB0aGlzOyB9XG4gIHByaXZhdGUgZm9ybURhdGE6IElucHV0Rm9ybURhdGFcblxuICBjb25zdHJ1Y3RvcihGb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIHRoaXMuZm9ybURhdGEgPSBGb3JtRGF0YTtcbiAgfVxuXG4gIGNsaWVudChvcHRpb25zOiBNYWlsZ3VuQ2xpZW50T3B0aW9ucykgOiBJTWFpbGd1bkNsaWVudCB7XG4gICAgcmV0dXJuIG5ldyBNYWlsZ3VuQ2xpZW50KG9wdGlvbnMsIHRoaXMuZm9ybURhdGEpO1xuICB9XG59XG4iLCIvKiEgaHR0cHM6Ly9tdGhzLmJlL2Jhc2U2NCB2MS4wLjAgYnkgQG1hdGhpYXMgfCBNSVQgbGljZW5zZSAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGVzIGBleHBvcnRzYC5cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC5cblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLCBhbmQgdXNlXG5cdC8vIGl0IGFzIGByb290YC5cblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgSW52YWxpZENoYXJhY3RlckVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH07XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5cdHZhciBlcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHQvLyBOb3RlOiB0aGUgZXJyb3IgbWVzc2FnZXMgdXNlZCB0aHJvdWdob3V0IHRoaXMgZmlsZSBtYXRjaCB0aG9zZSB1c2VkIGJ5XG5cdFx0Ly8gdGhlIG5hdGl2ZSBgYXRvYmAvYGJ0b2FgIGltcGxlbWVudGF0aW9uIGluIENocm9taXVtLlxuXHRcdHRocm93IG5ldyBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IobWVzc2FnZSk7XG5cdH07XG5cblx0dmFyIFRBQkxFID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXHQvLyBodHRwOi8vd2hhdHdnLm9yZy9odG1sL2NvbW1vbi1taWNyb3N5bnRheGVzLmh0bWwjc3BhY2UtY2hhcmFjdGVyXG5cdHZhciBSRUdFWF9TUEFDRV9DSEFSQUNURVJTID0gL1tcXHRcXG5cXGZcXHIgXS9nO1xuXG5cdC8vIGBkZWNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYXRvYmAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkLiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWF0b2Jcblx0Ly8gVGhlIG9wdGltaXplZCBiYXNlNjQtZGVjb2RpbmcgYWxnb3JpdGhtIHVzZWQgaXMgYmFzZWQgb24gQGF0a+KAmXMgZXhjZWxsZW50XG5cdC8vIGltcGxlbWVudGF0aW9uLiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9hdGsvMTAyMDM5NlxuXHR2YXIgZGVjb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dClcblx0XHRcdC5yZXBsYWNlKFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMsICcnKTtcblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdGlmIChsZW5ndGggJSA0ID09IDApIHtcblx0XHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZSgvPT0/JC8sICcnKTtcblx0XHRcdGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0bGVuZ3RoICUgNCA9PSAxIHx8XG5cdFx0XHQvLyBodHRwOi8vd2hhdHdnLm9yZy9DI2FscGhhbnVtZXJpYy1hc2NpaS1jaGFyYWN0ZXJzXG5cdFx0XHQvW14rYS16QS1aMC05L10vLnRlc3QoaW5wdXQpXG5cdFx0KSB7XG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J0ludmFsaWQgY2hhcmFjdGVyOiB0aGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBiaXRDb3VudGVyID0gMDtcblx0XHR2YXIgYml0U3RvcmFnZTtcblx0XHR2YXIgYnVmZmVyO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0YnVmZmVyID0gVEFCTEUuaW5kZXhPZihpbnB1dC5jaGFyQXQocG9zaXRpb24pKTtcblx0XHRcdGJpdFN0b3JhZ2UgPSBiaXRDb3VudGVyICUgNCA/IGJpdFN0b3JhZ2UgKiA2NCArIGJ1ZmZlciA6IGJ1ZmZlcjtcblx0XHRcdC8vIFVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCBvZiBhIGdyb3VwIG9mIDQgY2hhcmFjdGVyc+KAplxuXHRcdFx0aWYgKGJpdENvdW50ZXIrKyAlIDQpIHtcblx0XHRcdFx0Ly8g4oCmY29udmVydCB0aGUgZmlyc3QgOCBiaXRzIHRvIGEgc2luZ2xlIEFTQ0lJIGNoYXJhY3Rlci5cblx0XHRcdFx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdFx0XHRcdFx0MHhGRiAmIGJpdFN0b3JhZ2UgPj4gKC0yICogYml0Q291bnRlciAmIDYpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0Ly8gYGVuY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBidG9hYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQ6IGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYnRvYVxuXHR2YXIgZW5jb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dCk7XG5cdFx0aWYgKC9bXlxcMC1cXHhGRl0vLnRlc3QoaW5wdXQpKSB7XG5cdFx0XHQvLyBOb3RlOiBubyBuZWVkIHRvIHNwZWNpYWwtY2FzZSBhc3RyYWwgc3ltYm9scyBoZXJlLCBhcyBzdXJyb2dhdGVzIGFyZVxuXHRcdFx0Ly8gbWF0Y2hlZCwgYW5kIHRoZSBpbnB1dCBpcyBzdXBwb3NlZCB0byBvbmx5IGNvbnRhaW4gQVNDSUkgYW55d2F5LlxuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdUaGUgc3RyaW5nIHRvIGJlIGVuY29kZWQgY29udGFpbnMgY2hhcmFjdGVycyBvdXRzaWRlIG9mIHRoZSAnICtcblx0XHRcdFx0J0xhdGluMSByYW5nZS4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgcGFkZGluZyA9IGlucHV0Lmxlbmd0aCAlIDM7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHZhciBhO1xuXHRcdHZhciBiO1xuXHRcdHZhciBjO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0Ly8gTWFrZSBzdXJlIGFueSBwYWRkaW5nIGlzIGhhbmRsZWQgb3V0c2lkZSBvZiB0aGUgbG9vcC5cblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoIC0gcGFkZGluZztcblxuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHQvLyBSZWFkIHRocmVlIGJ5dGVzLCBpLmUuIDI0IGJpdHMuXG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgMTY7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YyA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYiArIGM7XG5cdFx0XHQvLyBUdXJuIHRoZSAyNCBiaXRzIGludG8gZm91ciBjaHVua3Mgb2YgNiBiaXRzIGVhY2gsIGFuZCBhcHBlbmQgdGhlXG5cdFx0XHQvLyBtYXRjaGluZyBjaGFyYWN0ZXIgZm9yIGVhY2ggb2YgdGhlbSB0byB0aGUgb3V0cHV0LlxuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxOCAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiA2ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyICYgMHgzRilcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHBhZGRpbmcgPT0gMikge1xuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDg7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMCkgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA+PiA0KSAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgMikgJiAweDNGKSArXG5cdFx0XHRcdCc9J1xuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKHBhZGRpbmcgPT0gMSkge1xuXHRcdFx0YnVmZmVyID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbik7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDIpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgNCkgJiAweDNGKSArXG5cdFx0XHRcdCc9PSdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHR2YXIgYmFzZTY0ID0ge1xuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQndmVyc2lvbic6ICcxLjAuMCdcblx0fTtcblxuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBiYXNlNjQ7XG5cdFx0fSk7XG5cdH1cdGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBiYXNlNjQ7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAodmFyIGtleSBpbiBiYXNlNjQpIHtcblx0XHRcdFx0YmFzZTY0Lmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBiYXNlNjRba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC5iYXNlNjQgPSBiYXNlNjQ7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIoZnVuY3Rpb24gKG5hbWUsIGNvbnRleHQsIGRlZmluaXRpb24pIHtcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKTtcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoZGVmaW5pdGlvbik7XG4gIGVsc2UgY29udGV4dFtuYW1lXSA9IGRlZmluaXRpb24oKTtcbn0pKCd1cmxqb2luJywgdGhpcywgZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZSAoc3RyQXJyYXkpIHtcbiAgICB2YXIgcmVzdWx0QXJyYXkgPSBbXTtcbiAgICBpZiAoc3RyQXJyYXkubGVuZ3RoID09PSAwKSB7IHJldHVybiAnJzsgfVxuXG4gICAgaWYgKHR5cGVvZiBzdHJBcnJheVswXSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgc3RyQXJyYXlbMF0pO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBmaXJzdCBwYXJ0IGlzIGEgcGxhaW4gcHJvdG9jb2wsIHdlIGNvbWJpbmUgaXQgd2l0aCB0aGUgbmV4dCBwYXJ0LlxuICAgIGlmIChzdHJBcnJheVswXS5tYXRjaCgvXlteLzpdKzpcXC8qJC8pICYmIHN0ckFycmF5Lmxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBmaXJzdCA9IHN0ckFycmF5LnNoaWZ0KCk7XG4gICAgICBzdHJBcnJheVswXSA9IGZpcnN0ICsgc3RyQXJyYXlbMF07XG4gICAgfVxuXG4gICAgLy8gVGhlcmUgbXVzdCBiZSB0d28gb3IgdGhyZWUgc2xhc2hlcyBpbiB0aGUgZmlsZSBwcm90b2NvbCwgdHdvIHNsYXNoZXMgaW4gYW55dGhpbmcgZWxzZS5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15maWxlOlxcL1xcL1xcLy8pKSB7XG4gICAgICBzdHJBcnJheVswXSA9IHN0ckFycmF5WzBdLnJlcGxhY2UoL14oW14vOl0rKTpcXC8qLywgJyQxOi8vLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHJBcnJheVswXSA9IHN0ckFycmF5WzBdLnJlcGxhY2UoL14oW14vOl0rKTpcXC8qLywgJyQxOi8vJyk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNvbXBvbmVudCA9IHN0ckFycmF5W2ldO1xuXG4gICAgICBpZiAodHlwZW9mIGNvbXBvbmVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVXJsIG11c3QgYmUgYSBzdHJpbmcuIFJlY2VpdmVkICcgKyBjb21wb25lbnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcG9uZW50ID09PSAnJykgeyBjb250aW51ZTsgfVxuXG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIHN0YXJ0aW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgZmlyc3QuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9eW1xcL10rLywgJycpO1xuICAgICAgfVxuICAgICAgaWYgKGkgPCBzdHJBcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBlbmRpbmcgc2xhc2hlcyBmb3IgZWFjaCBjb21wb25lbnQgYnV0IHRoZSBsYXN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvW1xcL10rJC8sICcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciB0aGUgbGFzdCBjb21wb25lbnQgd2Ugd2lsbCBjb21iaW5lIG11bHRpcGxlIHNsYXNoZXMgdG8gYSBzaW5nbGUgb25lLlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvW1xcL10rJC8sICcvJyk7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdEFycmF5LnB1c2goY29tcG9uZW50KTtcblxuICAgIH1cblxuICAgIHZhciBzdHIgPSByZXN1bHRBcnJheS5qb2luKCcvJyk7XG4gICAgLy8gRWFjaCBpbnB1dCBjb21wb25lbnQgaXMgbm93IHNlcGFyYXRlZCBieSBhIHNpbmdsZSBzbGFzaCBleGNlcHQgdGhlIHBvc3NpYmxlIGZpcnN0IHBsYWluIHByb3RvY29sIHBhcnQuXG5cbiAgICAvLyByZW1vdmUgdHJhaWxpbmcgc2xhc2ggYmVmb3JlIHBhcmFtZXRlcnMgb3IgaGFzaFxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXC8oXFw/fCZ8I1teIV0pL2csICckMScpO1xuXG4gICAgLy8gcmVwbGFjZSA/IGluIHBhcmFtZXRlcnMgd2l0aCAmXG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KCc/Jyk7XG4gICAgc3RyID0gcGFydHMuc2hpZnQoKSArIChwYXJ0cy5sZW5ndGggPiAwID8gJz8nOiAnJykgKyBwYXJ0cy5qb2luKCcmJyk7XG5cbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW5wdXQ7XG5cbiAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlucHV0ID0gYXJndW1lbnRzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnB1dCA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9ybWFsaXplKGlucHV0KTtcbiAgfTtcblxufSk7XG4iLCIvLyBBeGlvcyB2MS43LjIgQ29weXJpZ2h0IChjKSAyMDI0IE1hdHQgWmFicmlza2llIGFuZCBjb250cmlidXRvcnNcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxuY29uc3Qge3RvU3RyaW5nfSA9IE9iamVjdC5wcm90b3R5cGU7XG5jb25zdCB7Z2V0UHJvdG90eXBlT2Z9ID0gT2JqZWN0O1xuXG5jb25zdCBraW5kT2YgPSAoY2FjaGUgPT4gdGhpbmcgPT4ge1xuICAgIGNvbnN0IHN0ciA9IHRvU3RyaW5nLmNhbGwodGhpbmcpO1xuICAgIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5jb25zdCBraW5kT2ZUZXN0ID0gKHR5cGUpID0+IHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuICh0aGluZykgPT4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZVxufTtcblxuY29uc3QgdHlwZU9mVGVzdCA9IHR5cGUgPT4gdGhpbmcgPT4gdHlwZW9mIHRoaW5nID09PSB0eXBlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3Qge2lzQXJyYXl9ID0gQXJyYXk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNVbmRlZmluZWQgPSB0eXBlT2ZUZXN0KCd1bmRlZmluZWQnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiBpc0Z1bmN0aW9uKHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcikgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICBsZXQgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmIChpc0FycmF5QnVmZmVyKHZhbC5idWZmZXIpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyaW5nID0gdHlwZU9mVGVzdCgnc3RyaW5nJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGdW5jdGlvbiA9IHR5cGVPZlRlc3QoJ2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNOdW1iZXIgPSB0eXBlT2ZUZXN0KCdudW1iZXInKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNPYmplY3QgPSAodGhpbmcpID0+IHRoaW5nICE9PSBudWxsICYmIHR5cGVvZiB0aGluZyA9PT0gJ29iamVjdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCb29sZWFuXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCb29sZWFuLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCb29sZWFuID0gdGhpbmcgPT4gdGhpbmcgPT09IHRydWUgfHwgdGhpbmcgPT09IGZhbHNlO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB7XG4gIGlmIChraW5kT2YodmFsKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gKHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5wcm90b3R5cGUgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSkgPT09IG51bGwpICYmICEoU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbCkgJiYgIShTeW1ib2wuaXRlcmF0b3IgaW4gdmFsKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0ZpbGUgPSBraW5kT2ZUZXN0KCdGaWxlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jsb2IgPSBraW5kT2ZUZXN0KCdCbG9iJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlTGlzdFxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJlYW0gPSAodmFsKSA9PiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Zvcm1EYXRhID0gKHRoaW5nKSA9PiB7XG4gIGxldCBraW5kO1xuICByZXR1cm4gdGhpbmcgJiYgKFxuICAgICh0eXBlb2YgRm9ybURhdGEgPT09ICdmdW5jdGlvbicgJiYgdGhpbmcgaW5zdGFuY2VvZiBGb3JtRGF0YSkgfHwgKFxuICAgICAgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIChcbiAgICAgICAgKGtpbmQgPSBraW5kT2YodGhpbmcpKSA9PT0gJ2Zvcm1kYXRhJyB8fFxuICAgICAgICAvLyBkZXRlY3QgZm9ybS1kYXRhIGluc3RhbmNlXG4gICAgICAgIChraW5kID09PSAnb2JqZWN0JyAmJiBpc0Z1bmN0aW9uKHRoaW5nLnRvU3RyaW5nKSAmJiB0aGluZy50b1N0cmluZygpID09PSAnW29iamVjdCBGb3JtRGF0YV0nKVxuICAgICAgKVxuICAgIClcbiAgKVxufTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbmNvbnN0IFtpc1JlYWRhYmxlU3RyZWFtLCBpc1JlcXVlc3QsIGlzUmVzcG9uc2UsIGlzSGVhZGVyc10gPSBbJ1JlYWRhYmxlU3RyZWFtJywgJ1JlcXVlc3QnLCAnUmVzcG9uc2UnLCAnSGVhZGVycyddLm1hcChraW5kT2ZUZXN0KTtcblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuY29uc3QgdHJpbSA9IChzdHIpID0+IHN0ci50cmltID9cbiAgc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5cyA9IGZhbHNlXVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuLCB7YWxsT3duS2V5cyA9IGZhbHNlfSA9IHt9KSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGk7XG4gIGxldCBsO1xuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yIChpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBjb25zdCBrZXlzID0gYWxsT3duS2V5cyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikgOiBPYmplY3Qua2V5cyhvYmopO1xuICAgIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBrZXk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRLZXkob2JqLCBrZXkpIHtcbiAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICBsZXQgX2tleTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBfa2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoa2V5ID09PSBfa2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiBfa2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY29uc3QgX2dsb2JhbCA9ICgoKSA9PiB7XG4gIC8qZXNsaW50IG5vLXVuZGVmOjAqL1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWxUaGlzO1xuICByZXR1cm4gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKVxufSkoKTtcblxuY29uc3QgaXNDb250ZXh0RGVmaW5lZCA9IChjb250ZXh0KSA9PiAhaXNVbmRlZmluZWQoY29udGV4dCkgJiYgY29udGV4dCAhPT0gX2dsb2JhbDtcblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKlxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICBjb25zdCB7Y2FzZWxlc3N9ID0gaXNDb250ZXh0RGVmaW5lZCh0aGlzKSAmJiB0aGlzIHx8IHt9O1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgY29uc3QgYXNzaWduVmFsdWUgPSAodmFsLCBrZXkpID0+IHtcbiAgICBjb25zdCB0YXJnZXRLZXkgPSBjYXNlbGVzcyAmJiBmaW5kS2V5KHJlc3VsdCwga2V5KSB8fCBrZXk7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W3RhcmdldEtleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZShyZXN1bHRbdGFyZ2V0S2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWw7XG4gICAgfVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGFyZ3VtZW50c1tpXSAmJiBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxPd25LZXlzXVxuICogQHJldHVybnMge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5jb25zdCBleHRlbmQgPSAoYSwgYiwgdGhpc0FyZywge2FsbE93bktleXN9PSB7fSkgPT4ge1xuICBmb3JFYWNoKGIsICh2YWwsIGtleSkgPT4ge1xuICAgIGlmICh0aGlzQXJnICYmIGlzRnVuY3Rpb24odmFsKSkge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9LCB7YWxsT3duS2V5c30pO1xuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmNvbnN0IHN0cmlwQk9NID0gKGNvbnRlbnQpID0+IHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59O1xuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ29uc3RydWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcHJvcHNdXG4gKiBAcGFyYW0ge29iamVjdH0gW2Rlc2NyaXB0b3JzXVxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBpbmhlcml0cyA9IChjb25zdHJ1Y3Rvciwgc3VwZXJDb25zdHJ1Y3RvciwgcHJvcHMsIGRlc2NyaXB0b3JzKSA9PiB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKTtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3RvciwgJ3N1cGVyJywge1xuICAgIHZhbHVlOiBzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZVxuICB9KTtcbiAgcHJvcHMgJiYgT2JqZWN0LmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BzKTtcbn07XG5cbi8qKlxuICogUmVzb2x2ZSBvYmplY3Qgd2l0aCBkZWVwIHByb3RvdHlwZSBjaGFpbiB0byBhIGZsYXQgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlT2JqIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGVzdE9ial1cbiAqIEBwYXJhbSB7RnVuY3Rpb258Qm9vbGVhbn0gW2ZpbHRlcl1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9wRmlsdGVyXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IHRvRmxhdE9iamVjdCA9IChzb3VyY2VPYmosIGRlc3RPYmosIGZpbHRlciwgcHJvcEZpbHRlcikgPT4ge1xuICBsZXQgcHJvcHM7XG4gIGxldCBpO1xuICBsZXQgcHJvcDtcbiAgY29uc3QgbWVyZ2VkID0ge307XG5cbiAgZGVzdE9iaiA9IGRlc3RPYmogfHwge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBpZiAoc291cmNlT2JqID09IG51bGwpIHJldHVybiBkZXN0T2JqO1xuXG4gIGRvIHtcbiAgICBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZU9iaik7XG4gICAgaSA9IHByb3BzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgaWYgKCghcHJvcEZpbHRlciB8fCBwcm9wRmlsdGVyKHByb3AsIHNvdXJjZU9iaiwgZGVzdE9iaikpICYmICFtZXJnZWRbcHJvcF0pIHtcbiAgICAgICAgZGVzdE9ialtwcm9wXSA9IHNvdXJjZU9ialtwcm9wXTtcbiAgICAgICAgbWVyZ2VkW3Byb3BdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlT2JqID0gZmlsdGVyICE9PSBmYWxzZSAmJiBnZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBhIHN0cmluZyBlbmRzIHdpdGggdGhlIGNoYXJhY3RlcnMgb2YgYSBzcGVjaWZpZWQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgZW5kc1dpdGggPSAoc3RyLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uKSA9PiB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAocG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCBwb3NpdGlvbiA+IHN0ci5sZW5ndGgpIHtcbiAgICBwb3NpdGlvbiA9IHN0ci5sZW5ndGg7XG4gIH1cbiAgcG9zaXRpb24gLT0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyBuZXcgYXJyYXkgZnJvbSBhcnJheSBsaWtlIG9iamVjdCBvciBudWxsIGlmIGZhaWxlZFxuICpcbiAqIEBwYXJhbSB7Kn0gW3RoaW5nXVxuICpcbiAqIEByZXR1cm5zIHs/QXJyYXl9XG4gKi9cbmNvbnN0IHRvQXJyYXkgPSAodGhpbmcpID0+IHtcbiAgaWYgKCF0aGluZykgcmV0dXJuIG51bGw7XG4gIGlmIChpc0FycmF5KHRoaW5nKSkgcmV0dXJuIHRoaW5nO1xuICBsZXQgaSA9IHRoaW5nLmxlbmd0aDtcbiAgaWYgKCFpc051bWJlcihpKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGFyciA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBhcnJbaV0gPSB0aGluZ1tpXTtcbiAgfVxuICByZXR1cm4gYXJyO1xufTtcblxuLyoqXG4gKiBDaGVja2luZyBpZiB0aGUgVWludDhBcnJheSBleGlzdHMgYW5kIGlmIGl0IGRvZXMsIGl0IHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGVcbiAqIHRoaW5nIHBhc3NlZCBpbiBpcyBhbiBpbnN0YW5jZSBvZiBVaW50OEFycmF5XG4gKlxuICogQHBhcmFtIHtUeXBlZEFycmF5fVxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbmNvbnN0IGlzVHlwZWRBcnJheSA9IChUeXBlZEFycmF5ID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuIHRoaW5nID0+IHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2V0UHJvdG90eXBlT2YoVWludDhBcnJheSkpO1xuXG4vKipcbiAqIEZvciBlYWNoIGVudHJ5IGluIHRoZSBvYmplY3QsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGtleSBhbmQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggZW50cnkuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmNvbnN0IGZvckVhY2hFbnRyeSA9IChvYmosIGZuKSA9PiB7XG4gIGNvbnN0IGdlbmVyYXRvciA9IG9iaiAmJiBvYmpbU3ltYm9sLml0ZXJhdG9yXTtcblxuICBjb25zdCBpdGVyYXRvciA9IGdlbmVyYXRvci5jYWxsKG9iaik7XG5cbiAgbGV0IHJlc3VsdDtcblxuICB3aGlsZSAoKHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG4gICAgY29uc3QgcGFpciA9IHJlc3VsdC52YWx1ZTtcbiAgICBmbi5jYWxsKG9iaiwgcGFpclswXSwgcGFpclsxXSk7XG4gIH1cbn07XG5cbi8qKlxuICogSXQgdGFrZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gYW5kIGEgc3RyaW5nLCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBhbGwgdGhlIG1hdGNoZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnRXhwIC0gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCBhZ2FpbnN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheTxib29sZWFuPn1cbiAqL1xuY29uc3QgbWF0Y2hBbGwgPSAocmVnRXhwLCBzdHIpID0+IHtcbiAgbGV0IG1hdGNoZXM7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIHdoaWxlICgobWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHN0cikpICE9PSBudWxsKSB7XG4gICAgYXJyLnB1c2gobWF0Y2hlcyk7XG4gIH1cblxuICByZXR1cm4gYXJyO1xufTtcblxuLyogQ2hlY2tpbmcgaWYgdGhlIGtpbmRPZlRlc3QgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHdoZW4gcGFzc2VkIGFuIEhUTUxGb3JtRWxlbWVudC4gKi9cbmNvbnN0IGlzSFRNTEZvcm0gPSBraW5kT2ZUZXN0KCdIVE1MRm9ybUVsZW1lbnQnKTtcblxuY29uc3QgdG9DYW1lbENhc2UgPSBzdHIgPT4ge1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWy1fXFxzXShbYS16XFxkXSkoXFx3KikvZyxcbiAgICBmdW5jdGlvbiByZXBsYWNlcihtLCBwMSwgcDIpIHtcbiAgICAgIHJldHVybiBwMS50b1VwcGVyQ2FzZSgpICsgcDI7XG4gICAgfVxuICApO1xufTtcblxuLyogQ3JlYXRpbmcgYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2hlY2sgaWYgYW4gb2JqZWN0IGhhcyBhIHByb3BlcnR5LiAqL1xuY29uc3QgaGFzT3duUHJvcGVydHkgPSAoKHtoYXNPd25Qcm9wZXJ0eX0pID0+IChvYmosIHByb3ApID0+IGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkoT2JqZWN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlZ0V4cCA9IGtpbmRPZlRlc3QoJ1JlZ0V4cCcpO1xuXG5jb25zdCByZWR1Y2VEZXNjcmlwdG9ycyA9IChvYmosIHJlZHVjZXIpID0+IHtcbiAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopO1xuICBjb25zdCByZWR1Y2VkRGVzY3JpcHRvcnMgPSB7fTtcblxuICBmb3JFYWNoKGRlc2NyaXB0b3JzLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIGxldCByZXQ7XG4gICAgaWYgKChyZXQgPSByZWR1Y2VyKGRlc2NyaXB0b3IsIG5hbWUsIG9iaikpICE9PSBmYWxzZSkge1xuICAgICAgcmVkdWNlZERlc2NyaXB0b3JzW25hbWVdID0gcmV0IHx8IGRlc2NyaXB0b3I7XG4gICAgfVxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhvYmosIHJlZHVjZWREZXNjcmlwdG9ycyk7XG59O1xuXG4vKipcbiAqIE1ha2VzIGFsbCBtZXRob2RzIHJlYWQtb25seVxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICovXG5cbmNvbnN0IGZyZWV6ZU1ldGhvZHMgPSAob2JqKSA9PiB7XG4gIHJlZHVjZURlc2NyaXB0b3JzKG9iaiwgKGRlc2NyaXB0b3IsIG5hbWUpID0+IHtcbiAgICAvLyBza2lwIHJlc3RyaWN0ZWQgcHJvcHMgaW4gc3RyaWN0IG1vZGVcbiAgICBpZiAoaXNGdW5jdGlvbihvYmopICYmIFsnYXJndW1lbnRzJywgJ2NhbGxlcicsICdjYWxsZWUnXS5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlID0gb2JqW25hbWVdO1xuXG4gICAgaWYgKCFpc0Z1bmN0aW9uKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZmFsc2U7XG5cbiAgICBpZiAoJ3dyaXRhYmxlJyBpbiBkZXNjcmlwdG9yKSB7XG4gICAgICBkZXNjcmlwdG9yLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFkZXNjcmlwdG9yLnNldCkge1xuICAgICAgZGVzY3JpcHRvci5zZXQgPSAoKSA9PiB7XG4gICAgICAgIHRocm93IEVycm9yKCdDYW4gbm90IHJld3JpdGUgcmVhZC1vbmx5IG1ldGhvZCBcXCcnICsgbmFtZSArICdcXCcnKTtcbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHRvT2JqZWN0U2V0ID0gKGFycmF5T3JTdHJpbmcsIGRlbGltaXRlcikgPT4ge1xuICBjb25zdCBvYmogPSB7fTtcblxuICBjb25zdCBkZWZpbmUgPSAoYXJyKSA9PiB7XG4gICAgYXJyLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgb2JqW3ZhbHVlXSA9IHRydWU7XG4gICAgfSk7XG4gIH07XG5cbiAgaXNBcnJheShhcnJheU9yU3RyaW5nKSA/IGRlZmluZShhcnJheU9yU3RyaW5nKSA6IGRlZmluZShTdHJpbmcoYXJyYXlPclN0cmluZykuc3BsaXQoZGVsaW1pdGVyKSk7XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuY29uc3QgdG9GaW5pdGVOdW1iZXIgPSAodmFsdWUsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUgPSArdmFsdWUpID8gdmFsdWUgOiBkZWZhdWx0VmFsdWU7XG59O1xuXG5jb25zdCBBTFBIQSA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eic7XG5cbmNvbnN0IERJR0lUID0gJzAxMjM0NTY3ODknO1xuXG5jb25zdCBBTFBIQUJFVCA9IHtcbiAgRElHSVQsXG4gIEFMUEhBLFxuICBBTFBIQV9ESUdJVDogQUxQSEEgKyBBTFBIQS50b1VwcGVyQ2FzZSgpICsgRElHSVRcbn07XG5cbmNvbnN0IGdlbmVyYXRlU3RyaW5nID0gKHNpemUgPSAxNiwgYWxwaGFiZXQgPSBBTFBIQUJFVC5BTFBIQV9ESUdJVCkgPT4ge1xuICBsZXQgc3RyID0gJyc7XG4gIGNvbnN0IHtsZW5ndGh9ID0gYWxwaGFiZXQ7XG4gIHdoaWxlIChzaXplLS0pIHtcbiAgICBzdHIgKz0gYWxwaGFiZXRbTWF0aC5yYW5kb20oKSAqIGxlbmd0aHwwXTtcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG4vKipcbiAqIElmIHRoZSB0aGluZyBpcyBhIEZvcm1EYXRhIG9iamVjdCwgcmV0dXJuIHRydWUsIG90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB0aGluZyAtIFRoZSB0aGluZyB0byBjaGVjay5cbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNTcGVjQ29tcGxpYW50Rm9ybSh0aGluZykge1xuICByZXR1cm4gISEodGhpbmcgJiYgaXNGdW5jdGlvbih0aGluZy5hcHBlbmQpICYmIHRoaW5nW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdGb3JtRGF0YScgJiYgdGhpbmdbU3ltYm9sLml0ZXJhdG9yXSk7XG59XG5cbmNvbnN0IHRvSlNPTk9iamVjdCA9IChvYmopID0+IHtcbiAgY29uc3Qgc3RhY2sgPSBuZXcgQXJyYXkoMTApO1xuXG4gIGNvbnN0IHZpc2l0ID0gKHNvdXJjZSwgaSkgPT4ge1xuXG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKHNvdXJjZSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmKCEoJ3RvSlNPTicgaW4gc291cmNlKSkge1xuICAgICAgICBzdGFja1tpXSA9IHNvdXJjZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gaXNBcnJheShzb3VyY2UpID8gW10gOiB7fTtcblxuICAgICAgICBmb3JFYWNoKHNvdXJjZSwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCByZWR1Y2VkVmFsdWUgPSB2aXNpdCh2YWx1ZSwgaSArIDEpO1xuICAgICAgICAgICFpc1VuZGVmaW5lZChyZWR1Y2VkVmFsdWUpICYmICh0YXJnZXRba2V5XSA9IHJlZHVjZWRWYWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN0YWNrW2ldID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfTtcblxuICByZXR1cm4gdmlzaXQob2JqLCAwKTtcbn07XG5cbmNvbnN0IGlzQXN5bmNGbiA9IGtpbmRPZlRlc3QoJ0FzeW5jRnVuY3Rpb24nKTtcblxuY29uc3QgaXNUaGVuYWJsZSA9ICh0aGluZykgPT5cbiAgdGhpbmcgJiYgKGlzT2JqZWN0KHRoaW5nKSB8fCBpc0Z1bmN0aW9uKHRoaW5nKSkgJiYgaXNGdW5jdGlvbih0aGluZy50aGVuKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLmNhdGNoKTtcblxudmFyIHV0aWxzJDEgPSB7XG4gIGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmcsXG4gIGlzTnVtYmVyLFxuICBpc0Jvb2xlYW4sXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBpc1JlYWRhYmxlU3RyZWFtLFxuICBpc1JlcXVlc3QsXG4gIGlzUmVzcG9uc2UsXG4gIGlzSGVhZGVycyxcbiAgaXNVbmRlZmluZWQsXG4gIGlzRGF0ZSxcbiAgaXNGaWxlLFxuICBpc0Jsb2IsXG4gIGlzUmVnRXhwLFxuICBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzVHlwZWRBcnJheSxcbiAgaXNGaWxlTGlzdCxcbiAgZm9yRWFjaCxcbiAgbWVyZ2UsXG4gIGV4dGVuZCxcbiAgdHJpbSxcbiAgc3RyaXBCT00sXG4gIGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3QsXG4gIGtpbmRPZixcbiAga2luZE9mVGVzdCxcbiAgZW5kc1dpdGgsXG4gIHRvQXJyYXksXG4gIGZvckVhY2hFbnRyeSxcbiAgbWF0Y2hBbGwsXG4gIGlzSFRNTEZvcm0sXG4gIGhhc093blByb3BlcnR5LFxuICBoYXNPd25Qcm9wOiBoYXNPd25Qcm9wZXJ0eSwgLy8gYW4gYWxpYXMgdG8gYXZvaWQgRVNMaW50IG5vLXByb3RvdHlwZS1idWlsdGlucyBkZXRlY3Rpb25cbiAgcmVkdWNlRGVzY3JpcHRvcnMsXG4gIGZyZWV6ZU1ldGhvZHMsXG4gIHRvT2JqZWN0U2V0LFxuICB0b0NhbWVsQ2FzZSxcbiAgbm9vcCxcbiAgdG9GaW5pdGVOdW1iZXIsXG4gIGZpbmRLZXksXG4gIGdsb2JhbDogX2dsb2JhbCxcbiAgaXNDb250ZXh0RGVmaW5lZCxcbiAgQUxQSEFCRVQsXG4gIGdlbmVyYXRlU3RyaW5nLFxuICBpc1NwZWNDb21wbGlhbnRGb3JtLFxuICB0b0pTT05PYmplY3QsXG4gIGlzQXN5bmNGbixcbiAgaXNUaGVuYWJsZVxufTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrO1xuICB9XG5cbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5uYW1lID0gJ0F4aW9zRXJyb3InO1xuICBjb2RlICYmICh0aGlzLmNvZGUgPSBjb2RlKTtcbiAgY29uZmlnICYmICh0aGlzLmNvbmZpZyA9IGNvbmZpZyk7XG4gIHJlcXVlc3QgJiYgKHRoaXMucmVxdWVzdCA9IHJlcXVlc3QpO1xuICByZXNwb25zZSAmJiAodGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlKTtcbn1cblxudXRpbHMkMS5pbmhlcml0cyhBeGlvc0Vycm9yLCBFcnJvciwge1xuICB0b0pTT046IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB1dGlscyQxLnRvSlNPTk9iamVjdCh0aGlzLmNvbmZpZyksXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICBzdGF0dXM6IHRoaXMucmVzcG9uc2UgJiYgdGhpcy5yZXNwb25zZS5zdGF0dXMgPyB0aGlzLnJlc3BvbnNlLnN0YXR1cyA6IG51bGxcbiAgICB9O1xuICB9XG59KTtcblxuY29uc3QgcHJvdG90eXBlJDEgPSBBeGlvc0Vycm9yLnByb3RvdHlwZTtcbmNvbnN0IGRlc2NyaXB0b3JzID0ge307XG5cbltcbiAgJ0VSUl9CQURfT1BUSU9OX1ZBTFVFJyxcbiAgJ0VSUl9CQURfT1BUSU9OJyxcbiAgJ0VDT05OQUJPUlRFRCcsXG4gICdFVElNRURPVVQnLFxuICAnRVJSX05FVFdPUksnLFxuICAnRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUycsXG4gICdFUlJfREVQUkVDQVRFRCcsXG4gICdFUlJfQkFEX1JFU1BPTlNFJyxcbiAgJ0VSUl9CQURfUkVRVUVTVCcsXG4gICdFUlJfQ0FOQ0VMRUQnLFxuICAnRVJSX05PVF9TVVBQT1JUJyxcbiAgJ0VSUl9JTlZBTElEX1VSTCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goY29kZSA9PiB7XG4gIGRlc2NyaXB0b3JzW2NvZGVdID0ge3ZhbHVlOiBjb2RlfTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBeGlvc0Vycm9yLCBkZXNjcmlwdG9ycyk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG90eXBlJDEsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IChlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpID0+IHtcbiAgY29uc3QgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlJDEpO1xuXG4gIHV0aWxzJDEudG9GbGF0T2JqZWN0KGVycm9yLCBheGlvc0Vycm9yLCBmdW5jdGlvbiBmaWx0ZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gRXJyb3IucHJvdG90eXBlO1xuICB9LCBwcm9wID0+IHtcbiAgICByZXR1cm4gcHJvcCAhPT0gJ2lzQXhpb3NFcnJvcic7XG4gIH0pO1xuXG4gIEF4aW9zRXJyb3IuY2FsbChheGlvc0Vycm9yLCBlcnJvci5tZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKTtcblxuICBheGlvc0Vycm9yLmNhdXNlID0gZXJyb3I7XG5cbiAgYXhpb3NFcnJvci5uYW1lID0gZXJyb3IubmFtZTtcblxuICBjdXN0b21Qcm9wcyAmJiBPYmplY3QuYXNzaWduKGF4aW9zRXJyb3IsIGN1c3RvbVByb3BzKTtcblxuICByZXR1cm4gYXhpb3NFcnJvcjtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBzdHJpY3RcbnZhciBodHRwQWRhcHRlciA9IG51bGw7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgZ2l2ZW4gdGhpbmcgaXMgYSBhcnJheSBvciBqcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoaW5nIC0gVGhlIG9iamVjdCBvciBhcnJheSB0byBiZSB2aXNpdGVkLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1Zpc2l0YWJsZSh0aGluZykge1xuICByZXR1cm4gdXRpbHMkMS5pc1BsYWluT2JqZWN0KHRoaW5nKSB8fCB1dGlscyQxLmlzQXJyYXkodGhpbmcpO1xufVxuXG4vKipcbiAqIEl0IHJlbW92ZXMgdGhlIGJyYWNrZXRzIGZyb20gdGhlIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBwYXJhbWV0ZXIuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gdGhlIGtleSB3aXRob3V0IHRoZSBicmFja2V0cy5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQnJhY2tldHMoa2V5KSB7XG4gIHJldHVybiB1dGlscyQxLmVuZHNXaXRoKGtleSwgJ1tdJykgPyBrZXkuc2xpY2UoMCwgLTIpIDoga2V5O1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGF0aCwgYSBrZXksIGFuZCBhIGJvb2xlYW4sIGFuZCByZXR1cm5zIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcGF0aCB0byB0aGUgY3VycmVudCBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgY3VycmVudCBvYmplY3QgYmVpbmcgaXRlcmF0ZWQgb3Zlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkb3RzIC0gSWYgdHJ1ZSwgdGhlIGtleSB3aWxsIGJlIHJlbmRlcmVkIHdpdGggZG90cyBpbnN0ZWFkIG9mIGJyYWNrZXRzLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyS2V5KHBhdGgsIGtleSwgZG90cykge1xuICBpZiAoIXBhdGgpIHJldHVybiBrZXk7XG4gIHJldHVybiBwYXRoLmNvbmNhdChrZXkpLm1hcChmdW5jdGlvbiBlYWNoKHRva2VuLCBpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdG9rZW4gPSByZW1vdmVCcmFja2V0cyh0b2tlbik7XG4gICAgcmV0dXJuICFkb3RzICYmIGkgPyAnWycgKyB0b2tlbiArICddJyA6IHRva2VuO1xuICB9KS5qb2luKGRvdHMgPyAnLicgOiAnJyk7XG59XG5cbi8qKlxuICogSWYgdGhlIGFycmF5IGlzIGFuIGFycmF5IGFuZCBub25lIG9mIGl0cyBlbGVtZW50cyBhcmUgdmlzaXRhYmxlLCB0aGVuIGl0J3MgYSBmbGF0IGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzRmxhdEFycmF5KGFycikge1xuICByZXR1cm4gdXRpbHMkMS5pc0FycmF5KGFycikgJiYgIWFyci5zb21lKGlzVmlzaXRhYmxlKTtcbn1cblxuY29uc3QgcHJlZGljYXRlcyA9IHV0aWxzJDEudG9GbGF0T2JqZWN0KHV0aWxzJDEsIHt9LCBudWxsLCBmdW5jdGlvbiBmaWx0ZXIocHJvcCkge1xuICByZXR1cm4gL15pc1tBLVpdLy50ZXN0KHByb3ApO1xufSk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHs/T2JqZWN0fSBbZm9ybURhdGFdXG4gKiBAcGFyYW0gez9PYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMudmlzaXRvcl1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWV0YVRva2VucyA9IHRydWVdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmRvdHMgPSBmYWxzZV1cbiAqIEBwYXJhbSB7P0Jvb2xlYW59IFtvcHRpb25zLmluZGV4ZXMgPSBmYWxzZV1cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICoqL1xuXG4vKipcbiAqIEl0IGNvbnZlcnRzIGFuIG9iamVjdCBpbnRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8YW55LCBhbnk+fSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gZm9ybSBkYXRhLlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIC0gVGhlIEZvcm1EYXRhIG9iamVjdCB0byBhcHBlbmQgdG8uXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJuc1xuICovXG5mdW5jdGlvbiB0b0Zvcm1EYXRhKG9iaiwgZm9ybURhdGEsIG9wdGlvbnMpIHtcbiAgaWYgKCF1dGlscyQxLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXQgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBmb3JtRGF0YSA9IGZvcm1EYXRhIHx8IG5ldyAoRm9ybURhdGEpKCk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIG9wdGlvbnMgPSB1dGlscyQxLnRvRmxhdE9iamVjdChvcHRpb25zLCB7XG4gICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBpbmRleGVzOiBmYWxzZVxuICB9LCBmYWxzZSwgZnVuY3Rpb24gZGVmaW5lZChvcHRpb24sIHNvdXJjZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICAgIHJldHVybiAhdXRpbHMkMS5pc1VuZGVmaW5lZChzb3VyY2Vbb3B0aW9uXSk7XG4gIH0pO1xuXG4gIGNvbnN0IG1ldGFUb2tlbnMgPSBvcHRpb25zLm1ldGFUb2tlbnM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICBjb25zdCB2aXNpdG9yID0gb3B0aW9ucy52aXNpdG9yIHx8IGRlZmF1bHRWaXNpdG9yO1xuICBjb25zdCBkb3RzID0gb3B0aW9ucy5kb3RzO1xuICBjb25zdCBpbmRleGVzID0gb3B0aW9ucy5pbmRleGVzO1xuICBjb25zdCBfQmxvYiA9IG9wdGlvbnMuQmxvYiB8fCB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgQmxvYjtcbiAgY29uc3QgdXNlQmxvYiA9IF9CbG9iICYmIHV0aWxzJDEuaXNTcGVjQ29tcGxpYW50Rm9ybShmb3JtRGF0YSk7XG5cbiAgaWYgKCF1dGlscyQxLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMkMS5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAoIXVzZUJsb2IgJiYgdXRpbHMkMS5pc0Jsb2IodmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignQmxvYiBpcyBub3Qgc3VwcG9ydGVkLiBVc2UgYSBCdWZmZXIgaW5zdGVhZC4nKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMkMS5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscyQxLmlzVHlwZWRBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB1c2VCbG9iICYmIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmF1bHQgdmlzaXRvci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGtleVxuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZ3xOdW1iZXI+fSBwYXRoXG4gICAqIEB0aGlzIHtGb3JtRGF0YX1cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHJldHVybiB0cnVlIHRvIHZpc2l0IHRoZSBlYWNoIHByb3Agb2YgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5XG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0VmlzaXRvcih2YWx1ZSwga2V5LCBwYXRoKSB7XG4gICAgbGV0IGFyciA9IHZhbHVlO1xuXG4gICAgaWYgKHZhbHVlICYmICFwYXRoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh1dGlscyQxLmVuZHNXaXRoKGtleSwgJ3t9JykpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGtleSA9IG1ldGFUb2tlbnMgPyBrZXkgOiBrZXkuc2xpY2UoMCwgLTIpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAodXRpbHMkMS5pc0FycmF5KHZhbHVlKSAmJiBpc0ZsYXRBcnJheSh2YWx1ZSkpIHx8XG4gICAgICAgICgodXRpbHMkMS5pc0ZpbGVMaXN0KHZhbHVlKSB8fCB1dGlscyQxLmVuZHNXaXRoKGtleSwgJ1tdJykpICYmIChhcnIgPSB1dGlscyQxLnRvQXJyYXkodmFsdWUpKVxuICAgICAgICApKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSByZW1vdmVCcmFja2V0cyhrZXkpO1xuXG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIGVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgICAgISh1dGlscyQxLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgZm9ybURhdGEuYXBwZW5kKFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgICAgICAgICBpbmRleGVzID09PSB0cnVlID8gcmVuZGVyS2V5KFtrZXldLCBpbmRleCwgZG90cykgOiAoaW5kZXhlcyA9PT0gbnVsbCA/IGtleSA6IGtleSArICdbXScpLFxuICAgICAgICAgICAgY29udmVydFZhbHVlKGVsKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzVmlzaXRhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9ybURhdGEuYXBwZW5kKHJlbmRlcktleShwYXRoLCBrZXksIGRvdHMpLCBjb252ZXJ0VmFsdWUodmFsdWUpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHN0YWNrID0gW107XG5cbiAgY29uc3QgZXhwb3NlZEhlbHBlcnMgPSBPYmplY3QuYXNzaWduKHByZWRpY2F0ZXMsIHtcbiAgICBkZWZhdWx0VmlzaXRvcixcbiAgICBjb252ZXJ0VmFsdWUsXG4gICAgaXNWaXNpdGFibGVcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYnVpbGQodmFsdWUsIHBhdGgpIHtcbiAgICBpZiAodXRpbHMkMS5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcblxuICAgIGlmIChzdGFjay5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhdGguam9pbignLicpKTtcbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHZhbHVlKTtcblxuICAgIHV0aWxzJDEuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSAhKHV0aWxzJDEuaXNVbmRlZmluZWQoZWwpIHx8IGVsID09PSBudWxsKSAmJiB2aXNpdG9yLmNhbGwoXG4gICAgICAgIGZvcm1EYXRhLCBlbCwgdXRpbHMkMS5pc1N0cmluZyhrZXkpID8ga2V5LnRyaW0oKSA6IGtleSwgcGF0aCwgZXhwb3NlZEhlbHBlcnNcbiAgICAgICk7XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcbiAgICAgICAgYnVpbGQoZWwsIHBhdGggPyBwYXRoLmNvbmNhdChrZXkpIDogW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3RhY2sucG9wKCk7XG4gIH1cblxuICBpZiAoIXV0aWxzJDEuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIGJ1aWxkKG9iaik7XG5cbiAgcmV0dXJuIGZvcm1EYXRhO1xufVxuXG4vKipcbiAqIEl0IGVuY29kZXMgYSBzdHJpbmcgYnkgcmVwbGFjaW5nIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBpbiB0aGUgdW5yZXNlcnZlZCBzZXQgd2l0aFxuICogdGhlaXIgcGVyY2VudC1lbmNvZGVkIGVxdWl2YWxlbnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gZW5jb2RlLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZW5jb2RlJDEoc3RyKSB7XG4gIGNvbnN0IGNoYXJNYXAgPSB7XG4gICAgJyEnOiAnJTIxJyxcbiAgICBcIidcIjogJyUyNycsXG4gICAgJygnOiAnJTI4JyxcbiAgICAnKSc6ICclMjknLFxuICAgICd+JzogJyU3RScsXG4gICAgJyUyMCc6ICcrJyxcbiAgICAnJTAwJzogJ1xceDAwJ1xuICB9O1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCl+XXwlMjB8JTAwL2csIGZ1bmN0aW9uIHJlcGxhY2VyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGNoYXJNYXBbbWF0Y2hdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIHBhcmFtcyBvYmplY3QgYW5kIGNvbnZlcnRzIGl0IHRvIGEgRm9ybURhdGEgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBhbnk+fSBwYXJhbXMgLSBUaGUgcGFyYW1ldGVycyB0byBiZSBjb252ZXJ0ZWQgdG8gYSBGb3JtRGF0YSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgcGFzc2VkIHRvIHRoZSBBeGlvcyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKSB7XG4gIHRoaXMuX3BhaXJzID0gW107XG5cbiAgcGFyYW1zICYmIHRvRm9ybURhdGEocGFyYW1zLCB0aGlzLCBvcHRpb25zKTtcbn1cblxuY29uc3QgcHJvdG90eXBlID0gQXhpb3NVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlO1xuXG5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX3BhaXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XG59O1xuXG5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhlbmNvZGVyKSB7XG4gIGNvbnN0IF9lbmNvZGUgPSBlbmNvZGVyID8gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZW5jb2Rlci5jYWxsKHRoaXMsIHZhbHVlLCBlbmNvZGUkMSk7XG4gIH0gOiBlbmNvZGUkMTtcblxuICByZXR1cm4gdGhpcy5fcGFpcnMubWFwKGZ1bmN0aW9uIGVhY2gocGFpcikge1xuICAgIHJldHVybiBfZW5jb2RlKHBhaXJbMF0pICsgJz0nICsgX2VuY29kZShwYWlyWzFdKTtcbiAgfSwgJycpLmpvaW4oJyYnKTtcbn07XG5cbi8qKlxuICogSXQgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyBvZiB0aGUgY2hhcmFjdGVycyBgOmAsIGAkYCwgYCxgLCBgK2AsIGBbYCwgYW5kIGBdYCB3aXRoIHRoZWlyXG4gKiBVUkkgZW5jb2RlZCBjb3VudGVycGFydHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/b2JqZWN0fSBvcHRpb25zXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICBcbiAgY29uc3QgX2VuY29kZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMkMS5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpID9cbiAgICAgIHBhcmFtcy50b1N0cmluZygpIDpcbiAgICAgIG5ldyBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpLnRvU3RyaW5nKF9lbmNvZGUpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICBjb25zdCBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoXCIjXCIpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbmNsYXNzIEludGVyY2VwdG9yTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAgICpcbiAgICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICAgKi9cbiAgdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgICAgZnVsZmlsbGVkLFxuICAgICAgcmVqZWN0ZWQsXG4gICAgICBzeW5jaHJvbm91czogb3B0aW9ucyA/IG9wdGlvbnMuc3luY2hyb25vdXMgOiBmYWxzZSxcbiAgICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpbnRlcmNlcHRvciB3YXMgcmVtb3ZlZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICovXG4gIGVqZWN0KGlkKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCBpbnRlcmNlcHRvcnMgZnJvbSB0aGUgc3RhY2tcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy5oYW5kbGVycyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICAgKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAgICpcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmb3JFYWNoKGZuKSB7XG4gICAgdXRpbHMkMS5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICAgIGZuKGgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbnZhciBJbnRlcmNlcHRvck1hbmFnZXIkMSA9IEludGVyY2VwdG9yTWFuYWdlcjtcblxudmFyIHRyYW5zaXRpb25hbERlZmF1bHRzID0ge1xuICBzaWxlbnRKU09OUGFyc2luZzogdHJ1ZSxcbiAgZm9yY2VkSlNPTlBhcnNpbmc6IHRydWUsXG4gIGNsYXJpZnlUaW1lb3V0RXJyb3I6IGZhbHNlXG59O1xuXG52YXIgVVJMU2VhcmNoUGFyYW1zJDEgPSB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyA/IFVSTFNlYXJjaFBhcmFtcyA6IEF4aW9zVVJMU2VhcmNoUGFyYW1zO1xuXG52YXIgRm9ybURhdGEkMSA9IHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBGb3JtRGF0YSA6IG51bGw7XG5cbnZhciBCbG9iJDEgPSB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgPyBCbG9iIDogbnVsbDtcblxudmFyIHBsYXRmb3JtJDEgPSB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zJDEsXG4gICAgRm9ybURhdGE6IEZvcm1EYXRhJDEsXG4gICAgQmxvYjogQmxvYiQxXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXG59O1xuXG5jb25zdCBoYXNCcm93c2VyRW52ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGhhc1N0YW5kYXJkQnJvd3NlckVudiA9IChcbiAgKHByb2R1Y3QpID0+IHtcbiAgICByZXR1cm4gaGFzQnJvd3NlckVudiAmJiBbJ1JlYWN0TmF0aXZlJywgJ05hdGl2ZVNjcmlwdCcsICdOUyddLmluZGV4T2YocHJvZHVjdCkgPCAwXG4gIH0pKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0KTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgd2ViV29ya2VyIGVudmlyb25tZW50XG4gKlxuICogQWx0aG91Z2ggdGhlIGBpc1N0YW5kYXJkQnJvd3NlckVudmAgbWV0aG9kIGluZGljYXRlcyB0aGF0XG4gKiBgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXJgLCB0aGUgV2ViV29ya2VyIHdpbGwgc3RpbGwgYmVcbiAqIGZpbHRlcmVkIG91dCBkdWUgdG8gaXRzIGp1ZGdtZW50IHN0YW5kYXJkXG4gKiBgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ2AuXG4gKiBUaGlzIGxlYWRzIHRvIGEgcHJvYmxlbSB3aGVuIGF4aW9zIHBvc3QgYEZvcm1EYXRhYCBpbiB3ZWJXb3JrZXJcbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52ID0gKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlICYmXG4gICAgdHlwZW9mIHNlbGYuaW1wb3J0U2NyaXB0cyA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufSkoKTtcblxuY29uc3Qgb3JpZ2luID0gaGFzQnJvd3NlckVudiAmJiB3aW5kb3cubG9jYXRpb24uaHJlZiB8fCAnaHR0cDovL2xvY2FsaG9zdCc7XG5cbnZhciB1dGlscyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgX19wcm90b19fOiBudWxsLFxuICBoYXNCcm93c2VyRW52OiBoYXNCcm93c2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnY6IGhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyRW52OiBoYXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIG9yaWdpbjogb3JpZ2luXG59KTtcblxudmFyIHBsYXRmb3JtID0ge1xuICAuLi51dGlscyxcbiAgLi4ucGxhdGZvcm0kMVxufTtcblxuZnVuY3Rpb24gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b0Zvcm1EYXRhKGRhdGEsIG5ldyBwbGF0Zm9ybS5jbGFzc2VzLlVSTFNlYXJjaFBhcmFtcygpLCBPYmplY3QuYXNzaWduKHtcbiAgICB2aXNpdG9yOiBmdW5jdGlvbih2YWx1ZSwga2V5LCBwYXRoLCBoZWxwZXJzKSB7XG4gICAgICBpZiAocGxhdGZvcm0uaXNOb2RlICYmIHV0aWxzJDEuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGtleSwgdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVscGVycy5kZWZhdWx0VmlzaXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfSwgb3B0aW9ucykpO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nIGxpa2UgYGZvb1t4XVt5XVt6XWAgYW5kIHJldHVybnMgYW4gYXJyYXkgbGlrZSBgWydmb28nLCAneCcsICd5JywgJ3onXVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqXG4gKiBAcmV0dXJucyBBbiBhcnJheSBvZiBzdHJpbmdzLlxuICovXG5mdW5jdGlvbiBwYXJzZVByb3BQYXRoKG5hbWUpIHtcbiAgLy8gZm9vW3hdW3ldW3pdXG4gIC8vIGZvby54LnkuelxuICAvLyBmb28teC15LXpcbiAgLy8gZm9vIHggeSB6XG4gIHJldHVybiB1dGlscyQxLm1hdGNoQWxsKC9cXHcrfFxcWyhcXHcqKV0vZywgbmFtZSkubWFwKG1hdGNoID0+IHtcbiAgICByZXR1cm4gbWF0Y2hbMF0gPT09ICdbXScgPyAnJyA6IG1hdGNoWzFdIHx8IG1hdGNoWzBdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuIGFycmF5IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PGFueT59IGFyciAtIFRoZSBhcnJheSB0byBjb252ZXJ0IHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBrZXlzIGFuZCB2YWx1ZXMgYXMgdGhlIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheVRvT2JqZWN0KGFycikge1xuICBjb25zdCBvYmogPSB7fTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XG4gIGxldCBpO1xuICBjb25zdCBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgbGV0IGtleTtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAga2V5ID0ga2V5c1tpXTtcbiAgICBvYmpba2V5XSA9IGFycltrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBGb3JtRGF0YSBvYmplY3QgYW5kIHJldHVybnMgYSBKYXZhU2NyaXB0IG9iamVjdFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRGF0YSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGNvbnZlcnQgdG8gSlNPTi5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0PHN0cmluZywgYW55PiB8IG51bGx9IFRoZSBjb252ZXJ0ZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBmb3JtRGF0YVRvSlNPTihmb3JtRGF0YSkge1xuICBmdW5jdGlvbiBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldCwgaW5kZXgpIHtcbiAgICBsZXQgbmFtZSA9IHBhdGhbaW5kZXgrK107XG5cbiAgICBpZiAobmFtZSA9PT0gJ19fcHJvdG9fXycpIHJldHVybiB0cnVlO1xuXG4gICAgY29uc3QgaXNOdW1lcmljS2V5ID0gTnVtYmVyLmlzRmluaXRlKCtuYW1lKTtcbiAgICBjb25zdCBpc0xhc3QgPSBpbmRleCA+PSBwYXRoLmxlbmd0aDtcbiAgICBuYW1lID0gIW5hbWUgJiYgdXRpbHMkMS5pc0FycmF5KHRhcmdldCkgPyB0YXJnZXQubGVuZ3RoIDogbmFtZTtcblxuICAgIGlmIChpc0xhc3QpIHtcbiAgICAgIGlmICh1dGlscyQxLmhhc093blByb3AodGFyZ2V0LCBuYW1lKSkge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSBbdGFyZ2V0W25hbWVdLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICFpc051bWVyaWNLZXk7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXRbbmFtZV0gfHwgIXV0aWxzJDEuaXNPYmplY3QodGFyZ2V0W25hbWVdKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gW107XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYnVpbGRQYXRoKHBhdGgsIHZhbHVlLCB0YXJnZXRbbmFtZV0sIGluZGV4KTtcblxuICAgIGlmIChyZXN1bHQgJiYgdXRpbHMkMS5pc0FycmF5KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IGFycmF5VG9PYmplY3QodGFyZ2V0W25hbWVdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgfVxuXG4gIGlmICh1dGlscyQxLmlzRm9ybURhdGEoZm9ybURhdGEpICYmIHV0aWxzJDEuaXNGdW5jdGlvbihmb3JtRGF0YS5lbnRyaWVzKSkge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuXG4gICAgdXRpbHMkMS5mb3JFYWNoRW50cnkoZm9ybURhdGEsIChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgYnVpbGRQYXRoKHBhcnNlUHJvcFBhdGgobmFtZSksIHZhbHVlLCBvYmosIDApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgc3RyaW5nLCB0cmllcyB0byBwYXJzZSBpdCwgYW5kIGlmIGl0IGZhaWxzLCBpdCByZXR1cm5zIHRoZSBzdHJpbmdpZmllZCB2ZXJzaW9uXG4gKiBvZiB0aGUgaW5wdXRcbiAqXG4gKiBAcGFyYW0ge2FueX0gcmF3VmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgc3RyaW5naWZpZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJzZXIgLSBBIGZ1bmN0aW9uIHRoYXQgcGFyc2VzIGEgc3RyaW5nIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVuY29kZXIgLSBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSB2YWx1ZSBhbmQgcmV0dXJucyBhIHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgdGhlIHJhd1ZhbHVlLlxuICovXG5mdW5jdGlvbiBzdHJpbmdpZnlTYWZlbHkocmF3VmFsdWUsIHBhcnNlciwgZW5jb2Rlcikge1xuICBpZiAodXRpbHMkMS5pc1N0cmluZyhyYXdWYWx1ZSkpIHtcbiAgICB0cnkge1xuICAgICAgKHBhcnNlciB8fCBKU09OLnBhcnNlKShyYXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdXRpbHMkMS50cmltKHJhd1ZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5uYW1lICE9PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChlbmNvZGVyIHx8IEpTT04uc3RyaW5naWZ5KShyYXdWYWx1ZSk7XG59XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuXG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogWyd4aHInLCAnaHR0cCcsICdmZXRjaCddLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSB8fCAnJztcbiAgICBjb25zdCBoYXNKU09OQ29udGVudFR5cGUgPSBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPiAtMTtcbiAgICBjb25zdCBpc09iamVjdFBheWxvYWQgPSB1dGlscyQxLmlzT2JqZWN0KGRhdGEpO1xuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCAmJiB1dGlscyQxLmlzSFRNTEZvcm0oZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBuZXcgRm9ybURhdGEoZGF0YSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JtRGF0YSA9IHV0aWxzJDEuaXNGb3JtRGF0YShkYXRhKTtcblxuICAgIGlmIChpc0Zvcm1EYXRhKSB7XG4gICAgICByZXR1cm4gaGFzSlNPTkNvbnRlbnRUeXBlID8gSlNPTi5zdHJpbmdpZnkoZm9ybURhdGFUb0pTT04oZGF0YSkpIDogZGF0YTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMkMS5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscyQxLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscyQxLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscyQxLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMkMS5pc0Jsb2IoZGF0YSkgfHxcbiAgICAgIHV0aWxzJDEuaXNSZWFkYWJsZVN0cmVhbShkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscyQxLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscyQxLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsIGZhbHNlKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGlzRmlsZUxpc3Q7XG5cbiAgICBpZiAoaXNPYmplY3RQYXlsb2FkKSB7XG4gICAgICBpZiAoY29udGVudFR5cGUuaW5kZXhPZignYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdG9VUkxFbmNvZGVkRm9ybShkYXRhLCB0aGlzLmZvcm1TZXJpYWxpemVyKS50b1N0cmluZygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoKGlzRmlsZUxpc3QgPSB1dGlscyQxLmlzRmlsZUxpc3QoZGF0YSkpIHx8IGNvbnRlbnRUeXBlLmluZGV4T2YoJ211bHRpcGFydC9mb3JtLWRhdGEnKSA+IC0xKSB7XG4gICAgICAgIGNvbnN0IF9Gb3JtRGF0YSA9IHRoaXMuZW52ICYmIHRoaXMuZW52LkZvcm1EYXRhO1xuXG4gICAgICAgIHJldHVybiB0b0Zvcm1EYXRhKFxuICAgICAgICAgIGlzRmlsZUxpc3QgPyB7J2ZpbGVzW10nOiBkYXRhfSA6IGRhdGEsXG4gICAgICAgICAgX0Zvcm1EYXRhICYmIG5ldyBfRm9ybURhdGEoKSxcbiAgICAgICAgICB0aGlzLmZvcm1TZXJpYWxpemVyXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCB8fCBoYXNKU09OQ29udGVudFR5cGUgKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi9qc29uJywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHN0cmluZ2lmeVNhZmVseShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgY29uc3QgdHJhbnNpdGlvbmFsID0gdGhpcy50cmFuc2l0aW9uYWwgfHwgZGVmYXVsdHMudHJhbnNpdGlvbmFsO1xuICAgIGNvbnN0IGZvcmNlZEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5mb3JjZWRKU09OUGFyc2luZztcbiAgICBjb25zdCBKU09OUmVxdWVzdGVkID0gdGhpcy5yZXNwb25zZVR5cGUgPT09ICdqc29uJztcblxuICAgIGlmICh1dGlscyQxLmlzUmVzcG9uc2UoZGF0YSkgfHwgdXRpbHMkMS5pc1JlYWRhYmxlU3RyZWFtKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiB1dGlscyQxLmlzU3RyaW5nKGRhdGEpICYmICgoZm9yY2VkSlNPTlBhcnNpbmcgJiYgIXRoaXMucmVzcG9uc2VUeXBlKSB8fCBKU09OUmVxdWVzdGVkKSkge1xuICAgICAgY29uc3Qgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgICAgY29uc3Qgc3RyaWN0SlNPTlBhcnNpbmcgPSAhc2lsZW50SlNPTlBhcnNpbmcgJiYgSlNPTlJlcXVlc3RlZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChzdHJpY3RKU09OUGFyc2luZykge1xuICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIHRoaXMsIG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICBlbnY6IHtcbiAgICBGb3JtRGF0YTogcGxhdGZvcm0uY2xhc3Nlcy5Gb3JtRGF0YSxcbiAgICBCbG9iOiBwbGF0Zm9ybS5jbGFzc2VzLkJsb2JcbiAgfSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9LFxuXG4gIGhlYWRlcnM6IHtcbiAgICBjb21tb246IHtcbiAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICdDb250ZW50LVR5cGUnOiB1bmRlZmluZWRcbiAgICB9XG4gIH1cbn07XG5cbnV0aWxzJDEuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCddLCAobWV0aG9kKSA9PiB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnZhciBkZWZhdWx0cyQxID0gZGVmYXVsdHM7XG5cbi8vIFJhd0F4aW9zSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbmNvbnN0IGlnbm9yZUR1cGxpY2F0ZU9mID0gdXRpbHMkMS50b09iamVjdFNldChbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG52YXIgcGFyc2VIZWFkZXJzID0gcmF3SGVhZGVycyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHt9O1xuICBsZXQga2V5O1xuICBsZXQgdmFsO1xuICBsZXQgaTtcblxuICByYXdIZWFkZXJzICYmIHJhd0hlYWRlcnMuc3BsaXQoJ1xcbicpLmZvckVhY2goZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gbGluZS5zdWJzdHJpbmcoMCwgaSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gbGluZS5zdWJzdHJpbmcoaSArIDEpLnRyaW0oKTtcblxuICAgIGlmICgha2V5IHx8IChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZltrZXldKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgaWYgKHBhcnNlZFtrZXldKSB7XG4gICAgICAgIHBhcnNlZFtrZXldLnB1c2godmFsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gW3ZhbF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuY29uc3QgJGludGVybmFscyA9IFN5bWJvbCgnaW50ZXJuYWxzJyk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpIHtcbiAgcmV0dXJuIGhlYWRlciAmJiBTdHJpbmcoaGVhZGVyKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHV0aWxzJDEuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAobm9ybWFsaXplVmFsdWUpIDogU3RyaW5nKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbnMoc3RyKSB7XG4gIGNvbnN0IHRva2VucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IHRva2Vuc1JFID0gLyhbXlxccyw7PV0rKVxccyooPzo9XFxzKihbXiw7XSspKT8vZztcbiAgbGV0IG1hdGNoO1xuXG4gIHdoaWxlICgobWF0Y2ggPSB0b2tlbnNSRS5leGVjKHN0cikpKSB7XG4gICAgdG9rZW5zW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxuY29uc3QgaXNWYWxpZEhlYWRlck5hbWUgPSAoc3RyKSA9PiAvXlstX2EtekEtWjAtOV5gfH4sISMkJSYnKisuXSskLy50ZXN0KHN0ci50cmltKCkpO1xuXG5mdW5jdGlvbiBtYXRjaEhlYWRlclZhbHVlKGNvbnRleHQsIHZhbHVlLCBoZWFkZXIsIGZpbHRlciwgaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gIGlmICh1dGlscyQxLmlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLCB2YWx1ZSwgaGVhZGVyKTtcbiAgfVxuXG4gIGlmIChpc0hlYWRlck5hbWVGaWx0ZXIpIHtcbiAgICB2YWx1ZSA9IGhlYWRlcjtcbiAgfVxuXG4gIGlmICghdXRpbHMkMS5pc1N0cmluZyh2YWx1ZSkpIHJldHVybjtcblxuICBpZiAodXRpbHMkMS5pc1N0cmluZyhmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmluZGV4T2YoZmlsdGVyKSAhPT0gLTE7XG4gIH1cblxuICBpZiAodXRpbHMkMS5pc1JlZ0V4cChmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIGZpbHRlci50ZXN0KHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRIZWFkZXIoaGVhZGVyKSB7XG4gIHJldHVybiBoZWFkZXIudHJpbSgpXG4gICAgLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKFthLXpcXGRdKShcXHcqKS9nLCAodywgY2hhciwgc3RyKSA9PiB7XG4gICAgICByZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpICsgc3RyO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZEFjY2Vzc29ycyhvYmosIGhlYWRlcikge1xuICBjb25zdCBhY2Nlc3Nvck5hbWUgPSB1dGlscyQxLnRvQ2FtZWxDYXNlKCcgJyArIGhlYWRlcik7XG5cbiAgWydnZXQnLCAnc2V0JywgJ2hhcyddLmZvckVhY2gobWV0aG9kTmFtZSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbWV0aG9kTmFtZSArIGFjY2Vzc29yTmFtZSwge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbbWV0aG9kTmFtZV0uY2FsbCh0aGlzLCBoZWFkZXIsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9KTtcbn1cblxuY2xhc3MgQXhpb3NIZWFkZXJzIHtcbiAgY29uc3RydWN0b3IoaGVhZGVycykge1xuICAgIGhlYWRlcnMgJiYgdGhpcy5zZXQoaGVhZGVycyk7XG4gIH1cblxuICBzZXQoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSwgcmV3cml0ZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghbEhlYWRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hlYWRlciBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzJDEuZmluZEtleShzZWxmLCBsSGVhZGVyKTtcblxuICAgICAgaWYoIWtleSB8fCBzZWxmW2tleV0gPT09IHVuZGVmaW5lZCB8fCBfcmV3cml0ZSA9PT0gdHJ1ZSB8fCAoX3Jld3JpdGUgPT09IHVuZGVmaW5lZCAmJiBzZWxmW2tleV0gIT09IGZhbHNlKSkge1xuICAgICAgICBzZWxmW2tleSB8fCBfaGVhZGVyXSA9IG5vcm1hbGl6ZVZhbHVlKF92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0SGVhZGVycyA9IChoZWFkZXJzLCBfcmV3cml0ZSkgPT5cbiAgICAgIHV0aWxzJDEuZm9yRWFjaChoZWFkZXJzLCAoX3ZhbHVlLCBfaGVhZGVyKSA9PiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkpO1xuXG4gICAgaWYgKHV0aWxzJDEuaXNQbGFpbk9iamVjdChoZWFkZXIpIHx8IGhlYWRlciBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IpIHtcbiAgICAgIHNldEhlYWRlcnMoaGVhZGVyLCB2YWx1ZU9yUmV3cml0ZSk7XG4gICAgfSBlbHNlIGlmKHV0aWxzJDEuaXNTdHJpbmcoaGVhZGVyKSAmJiAoaGVhZGVyID0gaGVhZGVyLnRyaW0oKSkgJiYgIWlzVmFsaWRIZWFkZXJOYW1lKGhlYWRlcikpIHtcbiAgICAgIHNldEhlYWRlcnMocGFyc2VIZWFkZXJzKGhlYWRlciksIHZhbHVlT3JSZXdyaXRlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzJDEuaXNIZWFkZXJzKGhlYWRlcikpIHtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGhlYWRlci5lbnRyaWVzKCkpIHtcbiAgICAgICAgc2V0SGVhZGVyKHZhbHVlLCBrZXksIHJld3JpdGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXIgIT0gbnVsbCAmJiBzZXRIZWFkZXIodmFsdWVPclJld3JpdGUsIGhlYWRlciwgcmV3cml0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQoaGVhZGVyLCBwYXJzZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzJDEuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICAgIGlmICghcGFyc2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZVRva2Vucyh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMkMS5pc0Z1bmN0aW9uKHBhcnNlcikpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VyLmNhbGwodGhpcywgdmFsdWUsIGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMkMS5pc1JlZ0V4cChwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5leGVjKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcnNlciBtdXN0IGJlIGJvb2xlYW58cmVnZXhwfGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMkMS5maW5kS2V5KHRoaXMsIGhlYWRlcik7XG5cbiAgICAgIHJldHVybiAhIShrZXkgJiYgdGhpc1trZXldICE9PSB1bmRlZmluZWQgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUodGhpcywgdGhpc1trZXldLCBrZXksIG1hdGNoZXIpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVsZXRlKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBkZWxldGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkZWxldGVIZWFkZXIoX2hlYWRlcikge1xuICAgICAgX2hlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKF9oZWFkZXIpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdXRpbHMkMS5maW5kS2V5KHNlbGYsIF9oZWFkZXIpO1xuXG4gICAgICAgIGlmIChrZXkgJiYgKCFtYXRjaGVyIHx8IG1hdGNoSGVhZGVyVmFsdWUoc2VsZiwgc2VsZltrZXldLCBrZXksIG1hdGNoZXIpKSkge1xuICAgICAgICAgIGRlbGV0ZSBzZWxmW2tleV07XG5cbiAgICAgICAgICBkZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1dGlscyQxLmlzQXJyYXkoaGVhZGVyKSkge1xuICAgICAgaGVhZGVyLmZvckVhY2goZGVsZXRlSGVhZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlSGVhZGVyKGhlYWRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBjbGVhcihtYXRjaGVyKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICAgIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICBpZighbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyLCB0cnVlKSkge1xuICAgICAgICBkZWxldGUgdGhpc1trZXldO1xuICAgICAgICBkZWxldGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIG5vcm1hbGl6ZShmb3JtYXQpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG5cbiAgICB1dGlscyQxLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzJDEuZmluZEtleShoZWFkZXJzLCBoZWFkZXIpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHNlbGZba2V5XSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gZm9ybWF0ID8gZm9ybWF0SGVhZGVyKGhlYWRlcikgOiBTdHJpbmcoaGVhZGVyKS50cmltKCk7XG5cbiAgICAgIGlmIChub3JtYWxpemVkICE9PSBoZWFkZXIpIHtcbiAgICAgICAgZGVsZXRlIHNlbGZbaGVhZGVyXTtcbiAgICAgIH1cblxuICAgICAgc2VsZltub3JtYWxpemVkXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcblxuICAgICAgaGVhZGVyc1tub3JtYWxpemVkXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbmNhdCguLi50YXJnZXRzKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuY29uY2F0KHRoaXMsIC4uLnRhcmdldHMpO1xuICB9XG5cbiAgdG9KU09OKGFzU3RyaW5ncykge1xuICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICB1dGlscyQxLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IGZhbHNlICYmIChvYmpbaGVhZGVyXSA9IGFzU3RyaW5ncyAmJiB1dGlscyQxLmlzQXJyYXkodmFsdWUpID8gdmFsdWUuam9pbignLCAnKSA6IHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXModGhpcy50b0pTT04oKSlbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpLm1hcCgoW2hlYWRlciwgdmFsdWVdKSA9PiBoZWFkZXIgKyAnOiAnICsgdmFsdWUpLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuICAgIHJldHVybiAnQXhpb3NIZWFkZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgdGhpcyA/IHRoaW5nIDogbmV3IHRoaXModGhpbmcpO1xuICB9XG5cbiAgc3RhdGljIGNvbmNhdChmaXJzdCwgLi4udGFyZ2V0cykge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gbmV3IHRoaXMoZmlyc3QpO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IGNvbXB1dGVkLnNldCh0YXJnZXQpKTtcblxuICAgIHJldHVybiBjb21wdXRlZDtcbiAgfVxuXG4gIHN0YXRpYyBhY2Nlc3NvcihoZWFkZXIpIHtcbiAgICBjb25zdCBpbnRlcm5hbHMgPSB0aGlzWyRpbnRlcm5hbHNdID0gKHRoaXNbJGludGVybmFsc10gPSB7XG4gICAgICBhY2Nlc3NvcnM6IHt9XG4gICAgfSk7XG5cbiAgICBjb25zdCBhY2Nlc3NvcnMgPSBpbnRlcm5hbHMuYWNjZXNzb3JzO1xuICAgIGNvbnN0IHByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lQWNjZXNzb3IoX2hlYWRlcikge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFhY2Nlc3NvcnNbbEhlYWRlcl0pIHtcbiAgICAgICAgYnVpbGRBY2Nlc3NvcnMocHJvdG90eXBlLCBfaGVhZGVyKTtcbiAgICAgICAgYWNjZXNzb3JzW2xIZWFkZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1dGlscyQxLmlzQXJyYXkoaGVhZGVyKSA/IGhlYWRlci5mb3JFYWNoKGRlZmluZUFjY2Vzc29yKSA6IGRlZmluZUFjY2Vzc29yKGhlYWRlcik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5BeGlvc0hlYWRlcnMuYWNjZXNzb3IoWydDb250ZW50LVR5cGUnLCAnQ29udGVudC1MZW5ndGgnLCAnQWNjZXB0JywgJ0FjY2VwdC1FbmNvZGluZycsICdVc2VyLUFnZW50JywgJ0F1dGhvcml6YXRpb24nXSk7XG5cbi8vIHJlc2VydmVkIG5hbWVzIGhvdGZpeFxudXRpbHMkMS5yZWR1Y2VEZXNjcmlwdG9ycyhBeGlvc0hlYWRlcnMucHJvdG90eXBlLCAoe3ZhbHVlfSwga2V5KSA9PiB7XG4gIGxldCBtYXBwZWQgPSBrZXlbMF0udG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKTsgLy8gbWFwIGBzZXRgID0+IGBTZXRgXG4gIHJldHVybiB7XG4gICAgZ2V0OiAoKSA9PiB2YWx1ZSxcbiAgICBzZXQoaGVhZGVyVmFsdWUpIHtcbiAgICAgIHRoaXNbbWFwcGVkXSA9IGhlYWRlclZhbHVlO1xuICAgIH1cbiAgfVxufSk7XG5cbnV0aWxzJDEuZnJlZXplTWV0aG9kcyhBeGlvc0hlYWRlcnMpO1xuXG52YXIgQXhpb3NIZWFkZXJzJDEgPSBBeGlvc0hlYWRlcnM7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEBwYXJhbSB7P09iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlIG9iamVjdFxuICpcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xuZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShmbnMsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IGNvbmZpZyA9IHRoaXMgfHwgZGVmYXVsdHMkMTtcbiAgY29uc3QgY29udGV4dCA9IHJlc3BvbnNlIHx8IGNvbmZpZztcbiAgY29uc3QgaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oY29udGV4dC5oZWFkZXJzKTtcbiAgbGV0IGRhdGEgPSBjb250ZXh0LmRhdGE7XG5cbiAgdXRpbHMkMS5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuLmNhbGwoY29uZmlnLCBkYXRhLCBoZWFkZXJzLm5vcm1hbGl6ZSgpLCByZXNwb25zZSA/IHJlc3BvbnNlLnN0YXR1cyA6IHVuZGVmaW5lZCk7XG4gIH0pO1xuXG4gIGhlYWRlcnMubm9ybWFsaXplKCk7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn1cblxuLyoqXG4gKiBBIGBDYW5jZWxlZEVycm9yYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3Q9fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gcmVxdWVzdCBUaGUgcmVxdWVzdC5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsZWRFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVELCBjb25maWcsIHJlcXVlc3QpO1xuICB0aGlzLm5hbWUgPSAnQ2FuY2VsZWRFcnJvcic7XG59XG5cbnV0aWxzJDEuaW5oZXJpdHMoQ2FuY2VsZWRFcnJvciwgQXhpb3NFcnJvciwge1xuICBfX0NBTkNFTF9fOiB0cnVlXG59KTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgcmVzcG9uc2UuXG4gKi9cbmZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVByb3RvY29sKHVybCkge1xuICBjb25zdCBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgZGF0YSBtYXhSYXRlXG4gKiBAcGFyYW0ge051bWJlcn0gW3NhbXBsZXNDb3VudD0gMTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW21pbj0gMTAwMF1cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gc3BlZWRvbWV0ZXIoc2FtcGxlc0NvdW50LCBtaW4pIHtcbiAgc2FtcGxlc0NvdW50ID0gc2FtcGxlc0NvdW50IHx8IDEwO1xuICBjb25zdCBieXRlcyA9IG5ldyBBcnJheShzYW1wbGVzQ291bnQpO1xuICBjb25zdCB0aW1lc3RhbXBzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGxldCBoZWFkID0gMDtcbiAgbGV0IHRhaWwgPSAwO1xuICBsZXQgZmlyc3RTYW1wbGVUUztcblxuICBtaW4gPSBtaW4gIT09IHVuZGVmaW5lZCA/IG1pbiA6IDEwMDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHB1c2goY2h1bmtMZW5ndGgpIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3Qgc3RhcnRlZEF0ID0gdGltZXN0YW1wc1t0YWlsXTtcblxuICAgIGlmICghZmlyc3RTYW1wbGVUUykge1xuICAgICAgZmlyc3RTYW1wbGVUUyA9IG5vdztcbiAgICB9XG5cbiAgICBieXRlc1toZWFkXSA9IGNodW5rTGVuZ3RoO1xuICAgIHRpbWVzdGFtcHNbaGVhZF0gPSBub3c7XG5cbiAgICBsZXQgaSA9IHRhaWw7XG4gICAgbGV0IGJ5dGVzQ291bnQgPSAwO1xuXG4gICAgd2hpbGUgKGkgIT09IGhlYWQpIHtcbiAgICAgIGJ5dGVzQ291bnQgKz0gYnl0ZXNbaSsrXTtcbiAgICAgIGkgPSBpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGhlYWQgPSAoaGVhZCArIDEpICUgc2FtcGxlc0NvdW50O1xuXG4gICAgaWYgKGhlYWQgPT09IHRhaWwpIHtcbiAgICAgIHRhaWwgPSAodGFpbCArIDEpICUgc2FtcGxlc0NvdW50O1xuICAgIH1cblxuICAgIGlmIChub3cgLSBmaXJzdFNhbXBsZVRTIDwgbWluKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFzc2VkID0gc3RhcnRlZEF0ICYmIG5vdyAtIHN0YXJ0ZWRBdDtcblxuICAgIHJldHVybiBwYXNzZWQgPyBNYXRoLnJvdW5kKGJ5dGVzQ291bnQgKiAxMDAwIC8gcGFzc2VkKSA6IHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaHJvdHRsZSBkZWNvcmF0b3JcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge051bWJlcn0gZnJlcVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZuLCBmcmVxKSB7XG4gIGxldCB0aW1lc3RhbXAgPSAwO1xuICBjb25zdCB0aHJlc2hvbGQgPSAxMDAwIC8gZnJlcTtcbiAgbGV0IHRpbWVyID0gbnVsbDtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRocm90dGxlZCgpIHtcbiAgICBjb25zdCBmb3JjZSA9IHRoaXMgPT09IHRydWU7XG5cbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGlmIChmb3JjZSB8fCBub3cgLSB0aW1lc3RhbXAgPiB0aHJlc2hvbGQpIHtcbiAgICAgIGlmICh0aW1lcikge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICB9XG4gICAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgaWYgKCF0aW1lcikge1xuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgICB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIH0sIHRocmVzaG9sZCAtIChub3cgLSB0aW1lc3RhbXApKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBwcm9ncmVzc0V2ZW50UmVkdWNlciA9IChsaXN0ZW5lciwgaXNEb3dubG9hZFN0cmVhbSwgZnJlcSA9IDMpID0+IHtcbiAgbGV0IGJ5dGVzTm90aWZpZWQgPSAwO1xuICBjb25zdCBfc3BlZWRvbWV0ZXIgPSBzcGVlZG9tZXRlcig1MCwgMjUwKTtcblxuICByZXR1cm4gdGhyb3R0bGUoZSA9PiB7XG4gICAgY29uc3QgbG9hZGVkID0gZS5sb2FkZWQ7XG4gICAgY29uc3QgdG90YWwgPSBlLmxlbmd0aENvbXB1dGFibGUgPyBlLnRvdGFsIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHByb2dyZXNzQnl0ZXMgPSBsb2FkZWQgLSBieXRlc05vdGlmaWVkO1xuICAgIGNvbnN0IHJhdGUgPSBfc3BlZWRvbWV0ZXIocHJvZ3Jlc3NCeXRlcyk7XG4gICAgY29uc3QgaW5SYW5nZSA9IGxvYWRlZCA8PSB0b3RhbDtcblxuICAgIGJ5dGVzTm90aWZpZWQgPSBsb2FkZWQ7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbG9hZGVkLFxuICAgICAgdG90YWwsXG4gICAgICBwcm9ncmVzczogdG90YWwgPyAobG9hZGVkIC8gdG90YWwpIDogdW5kZWZpbmVkLFxuICAgICAgYnl0ZXM6IHByb2dyZXNzQnl0ZXMsXG4gICAgICByYXRlOiByYXRlID8gcmF0ZSA6IHVuZGVmaW5lZCxcbiAgICAgIGVzdGltYXRlZDogcmF0ZSAmJiB0b3RhbCAmJiBpblJhbmdlID8gKHRvdGFsIC0gbG9hZGVkKSAvIHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBldmVudDogZSxcbiAgICAgIGxlbmd0aENvbXB1dGFibGU6IHRvdGFsICE9IG51bGxcbiAgICB9O1xuXG4gICAgZGF0YVtpc0Rvd25sb2FkU3RyZWFtID8gJ2Rvd25sb2FkJyA6ICd1cGxvYWQnXSA9IHRydWU7XG5cbiAgICBsaXN0ZW5lcihkYXRhKTtcbiAgfSwgZnJlcSk7XG59O1xuXG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID9cblxuLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4vLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICBjb25zdCBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBjb25zdCB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsZXQgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdHMgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgbGV0IGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9ICh1dGlscyQxLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKTtcblxudmFyIGNvb2tpZXMgPSBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICB7XG4gICAgd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICBjb25zdCBjb29raWUgPSBbbmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSldO1xuXG4gICAgICB1dGlscyQxLmlzTnVtYmVyKGV4cGlyZXMpICYmIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcblxuICAgICAgdXRpbHMkMS5pc1N0cmluZyhwYXRoKSAmJiBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG5cbiAgICAgIHV0aWxzJDEuaXNTdHJpbmcoZG9tYWluKSAmJiBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuXG4gICAgICBzZWN1cmUgPT09IHRydWUgJiYgY29va2llLnB1c2goJ3NlY3VyZScpO1xuXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICB9LFxuXG4gICAgcmVhZChuYW1lKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgIH0sXG5cbiAgICByZW1vdmUobmFtZSkge1xuICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICB9XG4gIH1cblxuICA6XG5cbiAgLy8gTm9uLXN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICB7XG4gICAgd3JpdGUoKSB7fSxcbiAgICByZWFkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICByZW1vdmUoKSB7fVxuICB9O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZCtcXC0uXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbmZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8/XFwvJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xuZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59XG5cbmNvbnN0IGhlYWRlcnNUb09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgaW5zdGFuY2VvZiBBeGlvc0hlYWRlcnMkMSA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMkMS5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMkMS5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscyQxLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMkMS5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscyQxLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMkMS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYiwgY2FzZWxlc3MpO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzJDEuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEsIGNhc2VsZXNzKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKGEpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBhKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gbWVyZ2VEaXJlY3RLZXlzKGEsIGIsIHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUoYSwgYik7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1lcmdlTWFwID0ge1xuICAgIHVybDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBtZXRob2Q6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgZGF0YTogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBiYXNlVVJMOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVzcG9uc2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcGFyYW1zU2VyaWFsaXplcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0aW1lb3V0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXRNZXNzYWdlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhDcmVkZW50aWFsczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB3aXRoWFNSRlRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGFkYXB0ZXI6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VUeXBlOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZDb29raWVOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHhzcmZIZWFkZXJOYW1lOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25Eb3dubG9hZFByb2dyZXNzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGRlY29tcHJlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgbWF4Q29udGVudExlbmd0aDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhCb2R5TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGJlZm9yZVJlZGlyZWN0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRyYW5zcG9ydDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwQWdlbnQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgaHR0cHNBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBjYW5jZWxUb2tlbjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBzb2NrZXRQYXRoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHJlc3BvbnNlRW5jb2Rpbmc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdmFsaWRhdGVTdGF0dXM6IG1lcmdlRGlyZWN0S2V5cyxcbiAgICBoZWFkZXJzOiAoYSwgYikgPT4gbWVyZ2VEZWVwUHJvcGVydGllcyhoZWFkZXJzVG9PYmplY3QoYSksIGhlYWRlcnNUb09iamVjdChiKSwgdHJ1ZSlcbiAgfTtcblxuICB1dGlscyQxLmZvckVhY2goT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnMSwgY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscyQxLmlzVW5kZWZpbmVkKGNvbmZpZ1ZhbHVlKSAmJiBtZXJnZSAhPT0gbWVyZ2VEaXJlY3RLZXlzKSB8fCAoY29uZmlnW3Byb3BdID0gY29uZmlnVmFsdWUpO1xuICB9KTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG52YXIgcmVzb2x2ZUNvbmZpZyA9IChjb25maWcpID0+IHtcbiAgY29uc3QgbmV3Q29uZmlnID0gbWVyZ2VDb25maWcoe30sIGNvbmZpZyk7XG5cbiAgbGV0IHtkYXRhLCB3aXRoWFNSRlRva2VuLCB4c3JmSGVhZGVyTmFtZSwgeHNyZkNvb2tpZU5hbWUsIGhlYWRlcnMsIGF1dGh9ID0gbmV3Q29uZmlnO1xuXG4gIG5ld0NvbmZpZy5oZWFkZXJzID0gaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oaGVhZGVycyk7XG5cbiAgbmV3Q29uZmlnLnVybCA9IGJ1aWxkVVJMKGJ1aWxkRnVsbFBhdGgobmV3Q29uZmlnLmJhc2VVUkwsIG5ld0NvbmZpZy51cmwpLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG5cbiAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICBpZiAoYXV0aCkge1xuICAgIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgK1xuICAgICAgYnRvYSgoYXV0aC51c2VybmFtZSB8fCAnJykgKyAnOicgKyAoYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhdXRoLnBhc3N3b3JkKSkgOiAnJykpXG4gICAgKTtcbiAgfVxuXG4gIGxldCBjb250ZW50VHlwZTtcblxuICBpZiAodXRpbHMkMS5pc0Zvcm1EYXRhKGRhdGEpKSB7XG4gICAgaWYgKHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlckVudiB8fCBwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYpIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUodW5kZWZpbmVkKTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH0gZWxzZSBpZiAoKGNvbnRlbnRUeXBlID0gaGVhZGVycy5nZXRDb250ZW50VHlwZSgpKSAhPT0gZmFsc2UpIHtcbiAgICAgIC8vIGZpeCBzZW1pY29sb24gZHVwbGljYXRpb24gaXNzdWUgZm9yIFJlYWN0TmF0aXZlIEZvcm1EYXRhIGltcGxlbWVudGF0aW9uXG4gICAgICBjb25zdCBbdHlwZSwgLi4udG9rZW5zXSA9IGNvbnRlbnRUeXBlID8gY29udGVudFR5cGUuc3BsaXQoJzsnKS5tYXAodG9rZW4gPT4gdG9rZW4udHJpbSgpKS5maWx0ZXIoQm9vbGVhbikgOiBbXTtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoW3R5cGUgfHwgJ211bHRpcGFydC9mb3JtLWRhdGEnLCAuLi50b2tlbnNdLmpvaW4oJzsgJykpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCB4c3JmIGhlYWRlclxuICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cblxuICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52KSB7XG4gICAgd2l0aFhTUkZUb2tlbiAmJiB1dGlscyQxLmlzRnVuY3Rpb24od2l0aFhTUkZUb2tlbikgJiYgKHdpdGhYU1JGVG9rZW4gPSB3aXRoWFNSRlRva2VuKG5ld0NvbmZpZykpO1xuXG4gICAgaWYgKHdpdGhYU1JGVG9rZW4gfHwgKHdpdGhYU1JGVG9rZW4gIT09IGZhbHNlICYmIGlzVVJMU2FtZU9yaWdpbihuZXdDb25maWcudXJsKSkpIHtcbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgY29uc3QgeHNyZlZhbHVlID0geHNyZkhlYWRlck5hbWUgJiYgeHNyZkNvb2tpZU5hbWUgJiYgY29va2llcy5yZWFkKHhzcmZDb29raWVOYW1lKTtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICBoZWFkZXJzLnNldCh4c3JmSGVhZGVyTmFtZSwgeHNyZlZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3Q29uZmlnO1xufTtcblxuY29uc3QgaXNYSFJBZGFwdGVyU3VwcG9ydGVkID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJztcblxudmFyIHhockFkYXB0ZXIgPSBpc1hIUkFkYXB0ZXJTdXBwb3J0ZWQgJiYgZnVuY3Rpb24gKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIGNvbnN0IF9jb25maWcgPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG4gICAgbGV0IHJlcXVlc3REYXRhID0gX2NvbmZpZy5kYXRhO1xuICAgIGNvbnN0IHJlcXVlc3RIZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuZnJvbShfY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgIGxldCB7cmVzcG9uc2VUeXBlfSA9IF9jb25maWc7XG4gICAgbGV0IG9uQ2FuY2VsZWQ7XG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGlmIChfY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4udW5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBfY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oX2NvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgX2NvbmZpZy51cmwsIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBfY29uZmlnLnRpbWVvdXQ7XG5cbiAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20oXG4gICAgICAgICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgJiYgcmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9ICFyZXNwb25zZVR5cGUgfHwgcmVzcG9uc2VUeXBlID09PSAndGV4dCcgfHwgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBfY29uZmlnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgX2NvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICBsZXQgdGltZW91dEVycm9yTWVzc2FnZSA9IF9jb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBfY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnIDogJ3RpbWVvdXQgZXhjZWVkZWQnO1xuICAgICAgY29uc3QgdHJhbnNpdGlvbmFsID0gX2NvbmZpZy50cmFuc2l0aW9uYWwgfHwgdHJhbnNpdGlvbmFsRGVmYXVsdHM7XG4gICAgICBpZiAoX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgX2NvbmZpZyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgIHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQgJiYgcmVxdWVzdEhlYWRlcnMuc2V0Q29udGVudFR5cGUobnVsbCk7XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMkMS5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLnRvSlNPTigpLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscyQxLmlzVW5kZWZpbmVkKF9jb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIV9jb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IF9jb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIF9jb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoX2NvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgX2NvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzRXZlbnRSZWR1Y2VyKF9jb25maWcub25VcGxvYWRQcm9ncmVzcykpO1xuICAgIH1cblxuICAgIGlmIChfY29uZmlnLmNhbmNlbFRva2VuIHx8IF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgb25DYW5jZWxlZCA9IGNhbmNlbCA9PiB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChfY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBfY29uZmlnLnNpZ25hbC5hYm9ydGVkID8gb25DYW5jZWxlZCgpIDogX2NvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woX2NvbmZpZy51cmwpO1xuXG4gICAgaWYgKHByb3RvY29sICYmIHBsYXRmb3JtLnByb3RvY29scy5pbmRleE9mKHByb3RvY29sKSA9PT0gLTEpIHtcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignVW5zdXBwb3J0ZWQgcHJvdG9jb2wgJyArIHByb3RvY29sICsgJzonLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgY29uZmlnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhIHx8IG51bGwpO1xuICB9KTtcbn07XG5cbmNvbnN0IGNvbXBvc2VTaWduYWxzID0gKHNpZ25hbHMsIHRpbWVvdXQpID0+IHtcbiAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgbGV0IGFib3J0ZWQ7XG5cbiAgY29uc3Qgb25hYm9ydCA9IGZ1bmN0aW9uIChjYW5jZWwpIHtcbiAgICBpZiAoIWFib3J0ZWQpIHtcbiAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgIGNvbnN0IGVyciA9IGNhbmNlbCBpbnN0YW5jZW9mIEVycm9yID8gY2FuY2VsIDogdGhpcy5yZWFzb247XG4gICAgICBjb250cm9sbGVyLmFib3J0KGVyciBpbnN0YW5jZW9mIEF4aW9zRXJyb3IgPyBlcnIgOiBuZXcgQ2FuY2VsZWRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogZXJyKSk7XG4gICAgfVxuICB9O1xuXG4gIGxldCB0aW1lciA9IHRpbWVvdXQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgb25hYm9ydChuZXcgQXhpb3NFcnJvcihgdGltZW91dCAke3RpbWVvdXR9IG9mIG1zIGV4Y2VlZGVkYCwgQXhpb3NFcnJvci5FVElNRURPVVQpKTtcbiAgfSwgdGltZW91dCk7XG5cbiAgY29uc3QgdW5zdWJzY3JpYmUgPSAoKSA9PiB7XG4gICAgaWYgKHNpZ25hbHMpIHtcbiAgICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IG51bGw7XG4gICAgICBzaWduYWxzLmZvckVhY2goc2lnbmFsID0+IHtcbiAgICAgICAgc2lnbmFsICYmXG4gICAgICAgIChzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lciA/IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpIDogc2lnbmFsLnVuc3Vic2NyaWJlKG9uYWJvcnQpKTtcbiAgICAgIH0pO1xuICAgICAgc2lnbmFscyA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiBzaWduYWwgJiYgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCkpO1xuXG4gIGNvbnN0IHtzaWduYWx9ID0gY29udHJvbGxlcjtcblxuICBzaWduYWwudW5zdWJzY3JpYmUgPSB1bnN1YnNjcmliZTtcblxuICByZXR1cm4gW3NpZ25hbCwgKCkgPT4ge1xuICAgIHRpbWVyICYmIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgdGltZXIgPSBudWxsO1xuICB9XTtcbn07XG5cbnZhciBjb21wb3NlU2lnbmFscyQxID0gY29tcG9zZVNpZ25hbHM7XG5cbmNvbnN0IHN0cmVhbUNodW5rID0gZnVuY3Rpb24qIChjaHVuaywgY2h1bmtTaXplKSB7XG4gIGxldCBsZW4gPSBjaHVuay5ieXRlTGVuZ3RoO1xuXG4gIGlmICghY2h1bmtTaXplIHx8IGxlbiA8IGNodW5rU2l6ZSkge1xuICAgIHlpZWxkIGNodW5rO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBwb3MgPSAwO1xuICBsZXQgZW5kO1xuXG4gIHdoaWxlIChwb3MgPCBsZW4pIHtcbiAgICBlbmQgPSBwb3MgKyBjaHVua1NpemU7XG4gICAgeWllbGQgY2h1bmsuc2xpY2UocG9zLCBlbmQpO1xuICAgIHBvcyA9IGVuZDtcbiAgfVxufTtcblxuY29uc3QgcmVhZEJ5dGVzID0gYXN5bmMgZnVuY3Rpb24qIChpdGVyYWJsZSwgY2h1bmtTaXplLCBlbmNvZGUpIHtcbiAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBpdGVyYWJsZSkge1xuICAgIHlpZWxkKiBzdHJlYW1DaHVuayhBcnJheUJ1ZmZlci5pc1ZpZXcoY2h1bmspID8gY2h1bmsgOiAoYXdhaXQgZW5jb2RlKFN0cmluZyhjaHVuaykpKSwgY2h1bmtTaXplKTtcbiAgfVxufTtcblxuY29uc3QgdHJhY2tTdHJlYW0gPSAoc3RyZWFtLCBjaHVua1NpemUsIG9uUHJvZ3Jlc3MsIG9uRmluaXNoLCBlbmNvZGUpID0+IHtcbiAgY29uc3QgaXRlcmF0b3IgPSByZWFkQnl0ZXMoc3RyZWFtLCBjaHVua1NpemUsIGVuY29kZSk7XG5cbiAgbGV0IGJ5dGVzID0gMDtcblxuICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtKHtcbiAgICB0eXBlOiAnYnl0ZXMnLFxuXG4gICAgYXN5bmMgcHVsbChjb250cm9sbGVyKSB7XG4gICAgICBjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgaXRlcmF0b3IubmV4dCgpO1xuXG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBjb250cm9sbGVyLmNsb3NlKCk7XG4gICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IGxlbiA9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICBvblByb2dyZXNzICYmIG9uUHJvZ3Jlc3MoYnl0ZXMgKz0gbGVuKTtcbiAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShuZXcgVWludDhBcnJheSh2YWx1ZSkpO1xuICAgIH0sXG4gICAgY2FuY2VsKHJlYXNvbikge1xuICAgICAgb25GaW5pc2gocmVhc29uKTtcbiAgICAgIHJldHVybiBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBoaWdoV2F0ZXJNYXJrOiAyXG4gIH0pXG59O1xuXG5jb25zdCBmZXRjaFByb2dyZXNzRGVjb3JhdG9yID0gKHRvdGFsLCBmbikgPT4ge1xuICBjb25zdCBsZW5ndGhDb21wdXRhYmxlID0gdG90YWwgIT0gbnVsbDtcbiAgcmV0dXJuIChsb2FkZWQpID0+IHNldFRpbWVvdXQoKCkgPT4gZm4oe1xuICAgIGxlbmd0aENvbXB1dGFibGUsXG4gICAgdG90YWwsXG4gICAgbG9hZGVkXG4gIH0pKTtcbn07XG5cbmNvbnN0IGlzRmV0Y2hTdXBwb3J0ZWQgPSB0eXBlb2YgZmV0Y2ggPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFJlcXVlc3QgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFJlc3BvbnNlID09PSAnZnVuY3Rpb24nO1xuY29uc3QgaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCA9IGlzRmV0Y2hTdXBwb3J0ZWQgJiYgdHlwZW9mIFJlYWRhYmxlU3RyZWFtID09PSAnZnVuY3Rpb24nO1xuXG4vLyB1c2VkIG9ubHkgaW5zaWRlIHRoZSBmZXRjaCBhZGFwdGVyXG5jb25zdCBlbmNvZGVUZXh0ID0gaXNGZXRjaFN1cHBvcnRlZCAmJiAodHlwZW9mIFRleHRFbmNvZGVyID09PSAnZnVuY3Rpb24nID9cbiAgICAoKGVuY29kZXIpID0+IChzdHIpID0+IGVuY29kZXIuZW5jb2RlKHN0cikpKG5ldyBUZXh0RW5jb2RlcigpKSA6XG4gICAgYXN5bmMgKHN0cikgPT4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgbmV3IFJlc3BvbnNlKHN0cikuYXJyYXlCdWZmZXIoKSlcbik7XG5cbmNvbnN0IHN1cHBvcnRzUmVxdWVzdFN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiYgKCgpID0+IHtcbiAgbGV0IGR1cGxleEFjY2Vzc2VkID0gZmFsc2U7XG5cbiAgY29uc3QgaGFzQ29udGVudFR5cGUgPSBuZXcgUmVxdWVzdChwbGF0Zm9ybS5vcmlnaW4sIHtcbiAgICBib2R5OiBuZXcgUmVhZGFibGVTdHJlYW0oKSxcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBnZXQgZHVwbGV4KCkge1xuICAgICAgZHVwbGV4QWNjZXNzZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuICdoYWxmJztcbiAgICB9LFxuICB9KS5oZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJyk7XG5cbiAgcmV0dXJuIGR1cGxleEFjY2Vzc2VkICYmICFoYXNDb250ZW50VHlwZTtcbn0pKCk7XG5cbmNvbnN0IERFRkFVTFRfQ0hVTktfU0laRSA9IDY0ICogMTAyNDtcblxuY29uc3Qgc3VwcG9ydHNSZXNwb25zZVN0cmVhbSA9IGlzUmVhZGFibGVTdHJlYW1TdXBwb3J0ZWQgJiYgISEoKCk9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHV0aWxzJDEuaXNSZWFkYWJsZVN0cmVhbShuZXcgUmVzcG9uc2UoJycpLmJvZHkpO1xuICB9IGNhdGNoKGVycikge1xuICAgIC8vIHJldHVybiB1bmRlZmluZWRcbiAgfVxufSkoKTtcblxuY29uc3QgcmVzb2x2ZXJzID0ge1xuICBzdHJlYW06IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKChyZXMpID0+IHJlcy5ib2R5KVxufTtcblxuaXNGZXRjaFN1cHBvcnRlZCAmJiAoKChyZXMpID0+IHtcbiAgWyd0ZXh0JywgJ2FycmF5QnVmZmVyJywgJ2Jsb2InLCAnZm9ybURhdGEnLCAnc3RyZWFtJ10uZm9yRWFjaCh0eXBlID0+IHtcbiAgICAhcmVzb2x2ZXJzW3R5cGVdICYmIChyZXNvbHZlcnNbdHlwZV0gPSB1dGlscyQxLmlzRnVuY3Rpb24ocmVzW3R5cGVdKSA/IChyZXMpID0+IHJlc1t0eXBlXSgpIDpcbiAgICAgIChfLCBjb25maWcpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoYFJlc3BvbnNlIHR5cGUgJyR7dHlwZX0nIGlzIG5vdCBzdXBwb3J0ZWRgLCBBeGlvc0Vycm9yLkVSUl9OT1RfU1VQUE9SVCwgY29uZmlnKTtcbiAgICAgIH0pO1xuICB9KTtcbn0pKG5ldyBSZXNwb25zZSkpO1xuXG5jb25zdCBnZXRCb2R5TGVuZ3RoID0gYXN5bmMgKGJvZHkpID0+IHtcbiAgaWYgKGJvZHkgPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgaWYodXRpbHMkMS5pc0Jsb2IoYm9keSkpIHtcbiAgICByZXR1cm4gYm9keS5zaXplO1xuICB9XG5cbiAgaWYodXRpbHMkMS5pc1NwZWNDb21wbGlhbnRGb3JtKGJvZHkpKSB7XG4gICAgcmV0dXJuIChhd2FpdCBuZXcgUmVxdWVzdChib2R5KS5hcnJheUJ1ZmZlcigpKS5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgaWYodXRpbHMkMS5pc0FycmF5QnVmZmVyVmlldyhib2R5KSkge1xuICAgIHJldHVybiBib2R5LmJ5dGVMZW5ndGg7XG4gIH1cblxuICBpZih1dGlscyQxLmlzVVJMU2VhcmNoUGFyYW1zKGJvZHkpKSB7XG4gICAgYm9keSA9IGJvZHkgKyAnJztcbiAgfVxuXG4gIGlmKHV0aWxzJDEuaXNTdHJpbmcoYm9keSkpIHtcbiAgICByZXR1cm4gKGF3YWl0IGVuY29kZVRleHQoYm9keSkpLmJ5dGVMZW5ndGg7XG4gIH1cbn07XG5cbmNvbnN0IHJlc29sdmVCb2R5TGVuZ3RoID0gYXN5bmMgKGhlYWRlcnMsIGJvZHkpID0+IHtcbiAgY29uc3QgbGVuZ3RoID0gdXRpbHMkMS50b0Zpbml0ZU51bWJlcihoZWFkZXJzLmdldENvbnRlbnRMZW5ndGgoKSk7XG5cbiAgcmV0dXJuIGxlbmd0aCA9PSBudWxsID8gZ2V0Qm9keUxlbmd0aChib2R5KSA6IGxlbmd0aDtcbn07XG5cbnZhciBmZXRjaEFkYXB0ZXIgPSBpc0ZldGNoU3VwcG9ydGVkICYmIChhc3luYyAoY29uZmlnKSA9PiB7XG4gIGxldCB7XG4gICAgdXJsLFxuICAgIG1ldGhvZCxcbiAgICBkYXRhLFxuICAgIHNpZ25hbCxcbiAgICBjYW5jZWxUb2tlbixcbiAgICB0aW1lb3V0LFxuICAgIG9uRG93bmxvYWRQcm9ncmVzcyxcbiAgICBvblVwbG9hZFByb2dyZXNzLFxuICAgIHJlc3BvbnNlVHlwZSxcbiAgICBoZWFkZXJzLFxuICAgIHdpdGhDcmVkZW50aWFscyA9ICdzYW1lLW9yaWdpbicsXG4gICAgZmV0Y2hPcHRpb25zXG4gIH0gPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG5cbiAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlID8gKHJlc3BvbnNlVHlwZSArICcnKS50b0xvd2VyQ2FzZSgpIDogJ3RleHQnO1xuXG4gIGxldCBbY29tcG9zZWRTaWduYWwsIHN0b3BUaW1lb3V0XSA9IChzaWduYWwgfHwgY2FuY2VsVG9rZW4gfHwgdGltZW91dCkgP1xuICAgIGNvbXBvc2VTaWduYWxzJDEoW3NpZ25hbCwgY2FuY2VsVG9rZW5dLCB0aW1lb3V0KSA6IFtdO1xuXG4gIGxldCBmaW5pc2hlZCwgcmVxdWVzdDtcblxuICBjb25zdCBvbkZpbmlzaCA9ICgpID0+IHtcbiAgICAhZmluaXNoZWQgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb21wb3NlZFNpZ25hbCAmJiBjb21wb3NlZFNpZ25hbC51bnN1YnNjcmliZSgpO1xuICAgIH0pO1xuXG4gICAgZmluaXNoZWQgPSB0cnVlO1xuICB9O1xuXG4gIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICB0cnkge1xuICAgIGlmIChcbiAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MgJiYgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmIG1ldGhvZCAhPT0gJ2dldCcgJiYgbWV0aG9kICE9PSAnaGVhZCcgJiZcbiAgICAgIChyZXF1ZXN0Q29udGVudExlbmd0aCA9IGF3YWl0IHJlc29sdmVCb2R5TGVuZ3RoKGhlYWRlcnMsIGRhdGEpKSAhPT0gMFxuICAgICkge1xuICAgICAgbGV0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICBkdXBsZXg6IFwiaGFsZlwiXG4gICAgICB9KTtcblxuICAgICAgbGV0IGNvbnRlbnRUeXBlSGVhZGVyO1xuXG4gICAgICBpZiAodXRpbHMkMS5pc0Zvcm1EYXRhKGRhdGEpICYmIChjb250ZW50VHlwZUhlYWRlciA9IF9yZXF1ZXN0LmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkpIHtcbiAgICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChfcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgIGRhdGEgPSB0cmFja1N0cmVhbShfcmVxdWVzdC5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIGZldGNoUHJvZ3Jlc3NEZWNvcmF0b3IoXG4gICAgICAgICAgcmVxdWVzdENvbnRlbnRMZW5ndGgsXG4gICAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25VcGxvYWRQcm9ncmVzcylcbiAgICAgICAgKSwgbnVsbCwgZW5jb2RlVGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF1dGlscyQxLmlzU3RyaW5nKHdpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHdpdGhDcmVkZW50aWFscyA9IHdpdGhDcmVkZW50aWFscyA/ICdjb3JzJyA6ICdvbWl0JztcbiAgICB9XG5cbiAgICByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgICBzaWduYWw6IGNvbXBvc2VkU2lnbmFsLFxuICAgICAgbWV0aG9kOiBtZXRob2QudG9VcHBlckNhc2UoKSxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMubm9ybWFsaXplKCkudG9KU09OKCksXG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgZHVwbGV4OiBcImhhbGZcIixcbiAgICAgIHdpdGhDcmVkZW50aWFsc1xuICAgIH0pO1xuXG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCk7XG5cbiAgICBjb25zdCBpc1N0cmVhbVJlc3BvbnNlID0gc3VwcG9ydHNSZXNwb25zZVN0cmVhbSAmJiAocmVzcG9uc2VUeXBlID09PSAnc3RyZWFtJyB8fCByZXNwb25zZVR5cGUgPT09ICdyZXNwb25zZScpO1xuXG4gICAgaWYgKHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKG9uRG93bmxvYWRQcm9ncmVzcyB8fCBpc1N0cmVhbVJlc3BvbnNlKSkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuXG4gICAgICBbJ3N0YXR1cycsICdzdGF0dXNUZXh0JywgJ2hlYWRlcnMnXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBvcHRpb25zW3Byb3BdID0gcmVzcG9uc2VbcHJvcF07XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcmVzcG9uc2VDb250ZW50TGVuZ3RoID0gdXRpbHMkMS50b0Zpbml0ZU51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSk7XG5cbiAgICAgIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKFxuICAgICAgICB0cmFja1N0cmVhbShyZXNwb25zZS5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIG9uRG93bmxvYWRQcm9ncmVzcyAmJiBmZXRjaFByb2dyZXNzRGVjb3JhdG9yKFxuICAgICAgICAgIHJlc3BvbnNlQ29udGVudExlbmd0aCxcbiAgICAgICAgICBwcm9ncmVzc0V2ZW50UmVkdWNlcihvbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpXG4gICAgICAgICksIGlzU3RyZWFtUmVzcG9uc2UgJiYgb25GaW5pc2gsIGVuY29kZVRleHQpLFxuICAgICAgICBvcHRpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIHJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSB8fCAndGV4dCc7XG5cbiAgICBsZXQgcmVzcG9uc2VEYXRhID0gYXdhaXQgcmVzb2x2ZXJzW3V0aWxzJDEuZmluZEtleShyZXNvbHZlcnMsIHJlc3BvbnNlVHlwZSkgfHwgJ3RleHQnXShyZXNwb25zZSwgY29uZmlnKTtcblxuICAgICFpc1N0cmVhbVJlc3BvbnNlICYmIG9uRmluaXNoKCk7XG5cbiAgICBzdG9wVGltZW91dCAmJiBzdG9wVGltZW91dCgpO1xuXG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBoZWFkZXJzOiBBeGlvc0hlYWRlcnMkMS5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0XG4gICAgICB9KTtcbiAgICB9KVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBvbkZpbmlzaCgpO1xuXG4gICAgaWYgKGVyciAmJiBlcnIubmFtZSA9PT0gJ1R5cGVFcnJvcicgJiYgL2ZldGNoL2kudGVzdChlcnIubWVzc2FnZSkpIHtcbiAgICAgIHRocm93IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KSxcbiAgICAgICAge1xuICAgICAgICAgIGNhdXNlOiBlcnIuY2F1c2UgfHwgZXJyXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZXJyLCBlcnIgJiYgZXJyLmNvZGUsIGNvbmZpZywgcmVxdWVzdCk7XG4gIH1cbn0pO1xuXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xuICBodHRwOiBodHRwQWRhcHRlcixcbiAgeGhyOiB4aHJBZGFwdGVyLFxuICBmZXRjaDogZmV0Y2hBZGFwdGVyXG59O1xuXG51dGlscyQxLmZvckVhY2goa25vd25BZGFwdGVycywgKGZuLCB2YWx1ZSkgPT4ge1xuICBpZiAoZm4pIHtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHt2YWx1ZX0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICdhZGFwdGVyTmFtZScsIHt2YWx1ZX0pO1xuICB9XG59KTtcblxuY29uc3QgcmVuZGVyUmVhc29uID0gKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YDtcblxuY29uc3QgaXNSZXNvbHZlZEhhbmRsZSA9IChhZGFwdGVyKSA9PiB1dGlscyQxLmlzRnVuY3Rpb24oYWRhcHRlcikgfHwgYWRhcHRlciA9PT0gbnVsbCB8fCBhZGFwdGVyID09PSBmYWxzZTtcblxudmFyIGFkYXB0ZXJzID0ge1xuICBnZXRBZGFwdGVyOiAoYWRhcHRlcnMpID0+IHtcbiAgICBhZGFwdGVycyA9IHV0aWxzJDEuaXNBcnJheShhZGFwdGVycykgPyBhZGFwdGVycyA6IFthZGFwdGVyc107XG5cbiAgICBjb25zdCB7bGVuZ3RofSA9IGFkYXB0ZXJzO1xuICAgIGxldCBuYW1lT3JBZGFwdGVyO1xuICAgIGxldCBhZGFwdGVyO1xuXG4gICAgY29uc3QgcmVqZWN0ZWRSZWFzb25zID0ge307XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBuYW1lT3JBZGFwdGVyID0gYWRhcHRlcnNbaV07XG4gICAgICBsZXQgaWQ7XG5cbiAgICAgIGFkYXB0ZXIgPSBuYW1lT3JBZGFwdGVyO1xuXG4gICAgICBpZiAoIWlzUmVzb2x2ZWRIYW5kbGUobmFtZU9yQWRhcHRlcikpIHtcbiAgICAgICAgYWRhcHRlciA9IGtub3duQWRhcHRlcnNbKGlkID0gU3RyaW5nKG5hbWVPckFkYXB0ZXIpKS50b0xvd2VyQ2FzZSgpXTtcblxuICAgICAgICBpZiAoYWRhcHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoYFVua25vd24gYWRhcHRlciAnJHtpZH0nYCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGFkYXB0ZXIpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJlamVjdGVkUmVhc29uc1tpZCB8fCAnIycgKyBpXSA9IGFkYXB0ZXI7XG4gICAgfVxuXG4gICAgaWYgKCFhZGFwdGVyKSB7XG5cbiAgICAgIGNvbnN0IHJlYXNvbnMgPSBPYmplY3QuZW50cmllcyhyZWplY3RlZFJlYXNvbnMpXG4gICAgICAgIC5tYXAoKFtpZCwgc3RhdGVdKSA9PiBgYWRhcHRlciAke2lkfSBgICtcbiAgICAgICAgICAoc3RhdGUgPT09IGZhbHNlID8gJ2lzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGVudmlyb25tZW50JyA6ICdpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBidWlsZCcpXG4gICAgICAgICk7XG5cbiAgICAgIGxldCBzID0gbGVuZ3RoID9cbiAgICAgICAgKHJlYXNvbnMubGVuZ3RoID4gMSA/ICdzaW5jZSA6XFxuJyArIHJlYXNvbnMubWFwKHJlbmRlclJlYXNvbikuam9pbignXFxuJykgOiAnICcgKyByZW5kZXJSZWFzb24ocmVhc29uc1swXSkpIDpcbiAgICAgICAgJ2FzIG5vIGFkYXB0ZXIgc3BlY2lmaWVkJztcblxuICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIGBUaGVyZSBpcyBubyBzdWl0YWJsZSBhZGFwdGVyIHRvIGRpc3BhdGNoIHRoZSByZXF1ZXN0IGAgKyBzLFxuICAgICAgICAnRVJSX05PVF9TVVBQT1JUJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRhcHRlcjtcbiAgfSxcbiAgYWRhcHRlcnM6IGtub3duQWRhcHRlcnNcbn07XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcihudWxsLCBjb25maWcpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKGNvbmZpZy5oZWFkZXJzKTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YS5jYWxsKFxuICAgIGNvbmZpZyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIGlmIChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10uaW5kZXhPZihjb25maWcubWV0aG9kKSAhPT0gLTEpIHtcbiAgICBjb25maWcuaGVhZGVycy5zZXRDb250ZW50VHlwZSgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgZmFsc2UpO1xuICB9XG5cbiAgY29uc3QgYWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXIoY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMkMS5hZGFwdGVyKTtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgIGNvbmZpZyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMkMS5mcm9tKHJlc3BvbnNlLmhlYWRlcnMpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZVxuICAgICAgICApO1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyA9IEF4aW9zSGVhZGVycyQxLmZyb20ocmVhc29uLnJlc3BvbnNlLmhlYWRlcnMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn1cblxuY29uc3QgVkVSU0lPTiA9IFwiMS43LjJcIjtcblxuY29uc3QgdmFsaWRhdG9ycyQxID0ge307XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5bJ29iamVjdCcsICdib29sZWFuJywgJ251bWJlcicsICdmdW5jdGlvbicsICdzdHJpbmcnLCAnc3ltYm9sJ10uZm9yRWFjaCgodHlwZSwgaSkgPT4ge1xuICB2YWxpZGF0b3JzJDFbdHlwZV0gPSBmdW5jdGlvbiB2YWxpZGF0b3IodGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSB0eXBlIHx8ICdhJyArIChpIDwgMSA/ICduICcgOiAnICcpICsgdHlwZTtcbiAgfTtcbn0pO1xuXG5jb25zdCBkZXByZWNhdGVkV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uYWwgb3B0aW9uIHZhbGlkYXRvclxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb258Ym9vbGVhbj99IHZhbGlkYXRvciAtIHNldCB0byBmYWxzZSBpZiB0aGUgdHJhbnNpdGlvbmFsIG9wdGlvbiBoYXMgYmVlbiByZW1vdmVkXG4gKiBAcGFyYW0ge3N0cmluZz99IHZlcnNpb24gLSBkZXByZWNhdGVkIHZlcnNpb24gLyByZW1vdmVkIHNpbmNlIHZlcnNpb25cbiAqIEBwYXJhbSB7c3RyaW5nP30gbWVzc2FnZSAtIHNvbWUgbWVzc2FnZSB3aXRoIGFkZGl0aW9uYWwgaW5mb1xuICpcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAqL1xudmFsaWRhdG9ycyQxLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gJ1tBeGlvcyB2JyArIFZFUlNJT04gKyAnXSBUcmFuc2l0aW9uYWwgb3B0aW9uIFxcJycgKyBvcHQgKyAnXFwnJyArIGRlc2MgKyAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh2YWx1ZSwgb3B0LCBvcHRzKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGNvbnN0IG9wdCA9IGtleXNbaV07XG4gICAgY29uc3QgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIHZhbGlkYXRvciA9IHtcbiAgYXNzZXJ0T3B0aW9ucyxcbiAgdmFsaWRhdG9yczogdmFsaWRhdG9ycyQxXG59O1xuXG5jb25zdCB2YWxpZGF0b3JzID0gdmFsaWRhdG9yLnZhbGlkYXRvcnM7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmNsYXNzIEF4aW9zIHtcbiAgY29uc3RydWN0b3IoaW5zdGFuY2VDb25maWcpIHtcbiAgICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyJDEoKSxcbiAgICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyJDEoKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gY29uZmlnT3JVcmwgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICAgKiBAcGFyYW0gez9PYmplY3R9IGNvbmZpZ1xuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gICAqL1xuICBhc3luYyByZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3JlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgbGV0IGR1bW15O1xuXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID8gRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZHVtbXkgPSB7fSkgOiAoZHVtbXkgPSBuZXcgRXJyb3IoKSk7XG5cbiAgICAgICAgLy8gc2xpY2Ugb2ZmIHRoZSBFcnJvcjogLi4uIGxpbmVcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBkdW1teS5zdGFjayA/IGR1bW15LnN0YWNrLnJlcGxhY2UoL14uK1xcbi8sICcnKSA6ICcnO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICghZXJyLnN0YWNrKSB7XG4gICAgICAgICAgICBlcnIuc3RhY2sgPSBzdGFjaztcbiAgICAgICAgICAgIC8vIG1hdGNoIHdpdGhvdXQgdGhlIDIgdG9wIHN0YWNrIGxpbmVzXG4gICAgICAgICAgfSBlbHNlIGlmIChzdGFjayAmJiAhU3RyaW5nKGVyci5zdGFjaykuZW5kc1dpdGgoc3RhY2sucmVwbGFjZSgvXi4rXFxuLitcXG4vLCAnJykpKSB7XG4gICAgICAgICAgICBlcnIuc3RhY2sgKz0gJ1xcbicgKyBzdGFjaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpZ25vcmUgdGhlIGNhc2Ugd2hlcmUgXCJzdGFja1wiIGlzIGFuIHVuLXdyaXRhYmxlIHByb3BlcnR5XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxuXG4gIF9yZXF1ZXN0KGNvbmZpZ09yVXJsLCBjb25maWcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gICAgaWYgKHR5cGVvZiBjb25maWdPclVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgIGNvbmZpZy51cmwgPSBjb25maWdPclVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gICAgfVxuXG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAgIGNvbnN0IHt0cmFuc2l0aW9uYWwsIHBhcmFtc1NlcmlhbGl6ZXIsIGhlYWRlcnN9ID0gY29uZmlnO1xuXG4gICAgaWYgKHRyYW5zaXRpb25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyh0cmFuc2l0aW9uYWwsIHtcbiAgICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICAgIGZvcmNlZEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBjbGFyaWZ5VGltZW91dEVycm9yOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pXG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIgIT0gbnVsbCkge1xuICAgICAgaWYgKHV0aWxzJDEuaXNGdW5jdGlvbihwYXJhbXNTZXJpYWxpemVyKSkge1xuICAgICAgICBjb25maWcucGFyYW1zU2VyaWFsaXplciA9IHtcbiAgICAgICAgICBzZXJpYWxpemU6IHBhcmFtc1NlcmlhbGl6ZXJcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHBhcmFtc1NlcmlhbGl6ZXIsIHtcbiAgICAgICAgICBlbmNvZGU6IHZhbGlkYXRvcnMuZnVuY3Rpb24sXG4gICAgICAgICAgc2VyaWFsaXplOiB2YWxpZGF0b3JzLmZ1bmN0aW9uXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBjb25maWcubWV0aG9kXG4gICAgY29uZmlnLm1ldGhvZCA9IChjb25maWcubWV0aG9kIHx8IHRoaXMuZGVmYXVsdHMubWV0aG9kIHx8ICdnZXQnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gICAgbGV0IGNvbnRleHRIZWFkZXJzID0gaGVhZGVycyAmJiB1dGlscyQxLm1lcmdlKFxuICAgICAgaGVhZGVycy5jb21tb24sXG4gICAgICBoZWFkZXJzW2NvbmZpZy5tZXRob2RdXG4gICAgKTtcblxuICAgIGhlYWRlcnMgJiYgdXRpbHMkMS5mb3JFYWNoKFxuICAgICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgICAobWV0aG9kKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW21ldGhvZF07XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzJDEuY29uY2F0KGNvbnRleHRIZWFkZXJzLCBoZWFkZXJzKTtcblxuICAgIC8vIGZpbHRlciBvdXQgc2tpcHBlZCBpbnRlcmNlcHRvcnNcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICAgIGxldCBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSB0cnVlO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZTtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxlbjtcblxuICAgIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgICBjb25zdCBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QuYmluZCh0aGlzKSwgdW5kZWZpbmVkXTtcbiAgICAgIGNoYWluLnVuc2hpZnQuYXBwbHkoY2hhaW4sIHJlcXVlc3RJbnRlcmNlcHRvckNoYWluKTtcbiAgICAgIGNoYWluLnB1c2guYXBwbHkoY2hhaW4sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBsZW4gPSBjaGFpbi5sZW5ndGg7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICAgICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbltpKytdLCBjaGFpbltpKytdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgbGVuID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgbGV0IG5ld0NvbmZpZyA9IGNvbmZpZztcblxuICAgIGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIGNvbnN0IG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIGNvbnN0IG9uUmVqZWN0ZWQgPSByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbltpKytdO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3Q29uZmlnID0gb25GdWxmaWxsZWQobmV3Q29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIG9uUmVqZWN0ZWQuY2FsbCh0aGlzLCBlcnJvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0LmNhbGwodGhpcywgbmV3Q29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG5cbiAgICBpID0gMDtcbiAgICBsZW4gPSByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4ocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluW2krK10sIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGdldFVyaShjb25maWcpIHtcbiAgICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG4gIH1cbn1cblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscyQxLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMkMS5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBpc0Zvcm0gPyB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgICB9IDoge30sXG4gICAgICAgIHVybCxcbiAgICAgICAgZGF0YVxuICAgICAgfSkpO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xufSk7XG5cbnZhciBBeGlvcyQxID0gQXhpb3M7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKlxuICogQHJldHVybnMge0NhbmNlbFRva2VufVxuICovXG5jbGFzcyBDYW5jZWxUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlUHJvbWlzZTtcblxuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2tlbiA9IHRoaXM7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuKGNhbmNlbCA9PiB7XG4gICAgICBpZiAoIXRva2VuLl9saXN0ZW5lcnMpIHJldHVybjtcblxuICAgICAgbGV0IGkgPSB0b2tlbi5fbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgICAgfVxuICAgICAgdG9rZW4uX2xpc3RlbmVycyA9IG51bGw7XG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHRoaXMucHJvbWlzZS50aGVuID0gb25mdWxmaWxsZWQgPT4ge1xuICAgICAgbGV0IF9yZXNvbHZlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgICBfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKG9uZnVsZmlsbGVkKTtcblxuICAgICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICAgIHRva2VuLnVuc3Vic2NyaWJlKF9yZXNvbHZlKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KSB7XG4gICAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCk7XG4gICAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICAgKi9cbiAgdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIHRocm93IHRoaXMucmVhc29uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZSBmcm9tIHRoZSBjYW5jZWwgc2lnbmFsXG4gICAqL1xuXG4gIHVuc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAgICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAgICovXG4gIHN0YXRpYyBzb3VyY2UoKSB7XG4gICAgbGV0IGNhbmNlbDtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgICBjYW5jZWwgPSBjO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIGNhbmNlbFxuICAgIH07XG4gIH1cbn1cblxudmFyIENhbmNlbFRva2VuJDEgPSBDYW5jZWxUb2tlbjtcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvc1xuICpcbiAqIEBwYXJhbSB7Kn0gcGF5bG9hZCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscyQxLmlzT2JqZWN0KHBheWxvYWQpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59XG5cbmNvbnN0IEh0dHBTdGF0dXNDb2RlID0ge1xuICBDb250aW51ZTogMTAwLFxuICBTd2l0Y2hpbmdQcm90b2NvbHM6IDEwMSxcbiAgUHJvY2Vzc2luZzogMTAyLFxuICBFYXJseUhpbnRzOiAxMDMsXG4gIE9rOiAyMDAsXG4gIENyZWF0ZWQ6IDIwMSxcbiAgQWNjZXB0ZWQ6IDIwMixcbiAgTm9uQXV0aG9yaXRhdGl2ZUluZm9ybWF0aW9uOiAyMDMsXG4gIE5vQ29udGVudDogMjA0LFxuICBSZXNldENvbnRlbnQ6IDIwNSxcbiAgUGFydGlhbENvbnRlbnQ6IDIwNixcbiAgTXVsdGlTdGF0dXM6IDIwNyxcbiAgQWxyZWFkeVJlcG9ydGVkOiAyMDgsXG4gIEltVXNlZDogMjI2LFxuICBNdWx0aXBsZUNob2ljZXM6IDMwMCxcbiAgTW92ZWRQZXJtYW5lbnRseTogMzAxLFxuICBGb3VuZDogMzAyLFxuICBTZWVPdGhlcjogMzAzLFxuICBOb3RNb2RpZmllZDogMzA0LFxuICBVc2VQcm94eTogMzA1LFxuICBVbnVzZWQ6IDMwNixcbiAgVGVtcG9yYXJ5UmVkaXJlY3Q6IDMwNyxcbiAgUGVybWFuZW50UmVkaXJlY3Q6IDMwOCxcbiAgQmFkUmVxdWVzdDogNDAwLFxuICBVbmF1dGhvcml6ZWQ6IDQwMSxcbiAgUGF5bWVudFJlcXVpcmVkOiA0MDIsXG4gIEZvcmJpZGRlbjogNDAzLFxuICBOb3RGb3VuZDogNDA0LFxuICBNZXRob2ROb3RBbGxvd2VkOiA0MDUsXG4gIE5vdEFjY2VwdGFibGU6IDQwNixcbiAgUHJveHlBdXRoZW50aWNhdGlvblJlcXVpcmVkOiA0MDcsXG4gIFJlcXVlc3RUaW1lb3V0OiA0MDgsXG4gIENvbmZsaWN0OiA0MDksXG4gIEdvbmU6IDQxMCxcbiAgTGVuZ3RoUmVxdWlyZWQ6IDQxMSxcbiAgUHJlY29uZGl0aW9uRmFpbGVkOiA0MTIsXG4gIFBheWxvYWRUb29MYXJnZTogNDEzLFxuICBVcmlUb29Mb25nOiA0MTQsXG4gIFVuc3VwcG9ydGVkTWVkaWFUeXBlOiA0MTUsXG4gIFJhbmdlTm90U2F0aXNmaWFibGU6IDQxNixcbiAgRXhwZWN0YXRpb25GYWlsZWQ6IDQxNyxcbiAgSW1BVGVhcG90OiA0MTgsXG4gIE1pc2RpcmVjdGVkUmVxdWVzdDogNDIxLFxuICBVbnByb2Nlc3NhYmxlRW50aXR5OiA0MjIsXG4gIExvY2tlZDogNDIzLFxuICBGYWlsZWREZXBlbmRlbmN5OiA0MjQsXG4gIFRvb0Vhcmx5OiA0MjUsXG4gIFVwZ3JhZGVSZXF1aXJlZDogNDI2LFxuICBQcmVjb25kaXRpb25SZXF1aXJlZDogNDI4LFxuICBUb29NYW55UmVxdWVzdHM6IDQyOSxcbiAgUmVxdWVzdEhlYWRlckZpZWxkc1Rvb0xhcmdlOiA0MzEsXG4gIFVuYXZhaWxhYmxlRm9yTGVnYWxSZWFzb25zOiA0NTEsXG4gIEludGVybmFsU2VydmVyRXJyb3I6IDUwMCxcbiAgTm90SW1wbGVtZW50ZWQ6IDUwMSxcbiAgQmFkR2F0ZXdheTogNTAyLFxuICBTZXJ2aWNlVW5hdmFpbGFibGU6IDUwMyxcbiAgR2F0ZXdheVRpbWVvdXQ6IDUwNCxcbiAgSHR0cFZlcnNpb25Ob3RTdXBwb3J0ZWQ6IDUwNSxcbiAgVmFyaWFudEFsc29OZWdvdGlhdGVzOiA1MDYsXG4gIEluc3VmZmljaWVudFN0b3JhZ2U6IDUwNyxcbiAgTG9vcERldGVjdGVkOiA1MDgsXG4gIE5vdEV4dGVuZGVkOiA1MTAsXG4gIE5ldHdvcmtBdXRoZW50aWNhdGlvblJlcXVpcmVkOiA1MTEsXG59O1xuXG5PYmplY3QuZW50cmllcyhIdHRwU3RhdHVzQ29kZSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gIEh0dHBTdGF0dXNDb2RlW3ZhbHVlXSA9IGtleTtcbn0pO1xuXG52YXIgSHR0cFN0YXR1c0NvZGUkMSA9IEh0dHBTdGF0dXNDb2RlO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKlxuICogQHJldHVybnMge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIGNvbnN0IGNvbnRleHQgPSBuZXcgQXhpb3MkMShkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zJDEucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzJDEuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcyQxLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMkMS5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQsIG51bGwsIHthbGxPd25LZXlzOiB0cnVlfSk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuY29uc3QgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyQxKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zJDE7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuJDE7XG5heGlvcy5pc0NhbmNlbCA9IGlzQ2FuY2VsO1xuYXhpb3MuVkVSU0lPTiA9IFZFUlNJT047XG5heGlvcy50b0Zvcm1EYXRhID0gdG9Gb3JtRGF0YTtcblxuLy8gRXhwb3NlIEF4aW9zRXJyb3IgY2xhc3NcbmF4aW9zLkF4aW9zRXJyb3IgPSBBeGlvc0Vycm9yO1xuXG4vLyBhbGlhcyBmb3IgQ2FuY2VsZWRFcnJvciBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuYXhpb3MuQ2FuY2VsID0gYXhpb3MuQ2FuY2VsZWRFcnJvcjtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gc3ByZWFkO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSBpc0F4aW9zRXJyb3I7XG5cbi8vIEV4cG9zZSBtZXJnZUNvbmZpZ1xuYXhpb3MubWVyZ2VDb25maWcgPSBtZXJnZUNvbmZpZztcblxuYXhpb3MuQXhpb3NIZWFkZXJzID0gQXhpb3NIZWFkZXJzJDE7XG5cbmF4aW9zLmZvcm1Ub0pTT04gPSB0aGluZyA9PiBmb3JtRGF0YVRvSlNPTih1dGlscyQxLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGUkMTtcblxuYXhpb3MuZGVmYXVsdCA9IGF4aW9zO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXhpb3MuY2pzLm1hcFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9saWIvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOlsiRG9tYWluIiwiZGF0YSIsInJlY2VpdmluZyIsInNlbmRpbmciLCJuYW1lIiwicmVxdWlyZV90bHMiLCJza2lwX3ZlcmlmaWNhdGlvbiIsInN0YXRlIiwid2lsZGNhcmQiLCJzcGFtX2FjdGlvbiIsImNyZWF0ZWRfYXQiLCJzbXRwX3Bhc3N3b3JkIiwic210cF9sb2dpbiIsInR5cGUiLCJyZWNlaXZpbmdfZG5zX3JlY29yZHMiLCJzZW5kaW5nX2Ruc19yZWNvcmRzIiwiZHluYW1pY0tleXMiLCJkeW5hbWljUHJvcGVydGllcyIsInJlZHVjZSIsImFjYyIsInByb3BlcnR5TmFtZSIsInByb3AiLCJPYmplY3QiLCJhc3NpZ24iLCJ1cmxfam9pbl8xIiwiX19pbXBvcnREZWZhdWx0IiwicmVxdWlyZSIsIkVycm9yXzEiLCJkb21haW5fMSIsIkRvbWFpbnNDbGllbnQiLCJyZXF1ZXN0IiwiZG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJkb21haW5UZW1wbGF0ZXNDbGllbnQiLCJkb21haW5UYWdzQ2xpZW50IiwiZG9tYWluQ3JlZGVudGlhbHMiLCJkb21haW5UZW1wbGF0ZXMiLCJkb21haW5UYWdzIiwicHJvdG90eXBlIiwiX2hhbmRsZUJvb2xWYWx1ZXMiLCJwcm9wc0ZvclJlcGxhY2VtZW50IiwicmVwbGFjZWRQcm9wcyIsImtleXMiLCJrZXkiLCJ2YWx1ZSIsInRvU3RyaW5nIiwiX19hc3NpZ24iLCJfcGFyc2VNZXNzYWdlIiwicmVzcG9uc2UiLCJib2R5IiwicGFyc2VEb21haW5MaXN0IiwiaXRlbXMiLCJtYXAiLCJpdGVtIiwiZGVmYXVsdCIsIl9wYXJzZURvbWFpbiIsImRvbWFpbiIsIl9wYXJzZVRyYWNraW5nU2V0dGluZ3MiLCJ0cmFja2luZyIsIl9wYXJzZVRyYWNraW5nVXBkYXRlIiwibGlzdCIsInF1ZXJ5IiwiX3RoaXMiLCJnZXQiLCJ0aGVuIiwicmVzIiwiY29uY2F0IiwiY3JlYXRlIiwicG9zdE9iaiIsInBvc3RXaXRoRkQiLCJ1cGRhdGUiLCJwdXREYXRhIiwicHV0V2l0aEZEIiwidmVyaWZ5IiwicHV0IiwiZGVzdHJveSIsImRlbGV0ZSIsImdldENvbm5lY3Rpb24iLCJjb25uZWN0aW9uIiwidXBkYXRlQ29ubmVjdGlvbiIsImdldFRyYWNraW5nIiwidXBkYXRlVHJhY2tpbmciLCJhY3RpdmUiLCJnZXRVc2VyRGF0YUVycm9yIiwiZ2V0SXBzIiwiX2EiLCJhc3NpZ25JcCIsImlwIiwiZGVsZXRlSXAiLCJsaW5rSXBQb29sIiwicG9vbElkIiwicG9vbF9pZCIsInVubGlua0lwUG9sbCIsInJlcGxhY2VtZW50Iiwic2VhcmNoUGFyYW1zIiwidXBkYXRlREtJTUF1dGhvcml0eSIsInNlbGYiLCJ1cGRhdGVES0lNU2VsZWN0b3IiLCJka2ltU2VsZWN0b3IiLCJ1cGRhdGVXZWJQcmVmaXgiLCJ3ZWJQcmVmaXgiLCJEb21haW5DcmVkZW50aWFsc0NsaWVudCIsImJhc2VSb3V0ZSIsIl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdCIsInRvdGFsQ291bnQiLCJ0b3RhbF9jb3VudCIsIl9wYXJzZU1lc3NhZ2VSZXNwb25zZSIsInJlc3VsdCIsInN0YXR1cyIsIm1lc3NhZ2UiLCJfcGFyc2VEZWxldGVkUmVzcG9uc2UiLCJzcGVjIiwiY3JlZGVudGlhbHNMb2dpbiIsIk5hdmlnYXRpb25UaHJ1UGFnZXNfMSIsIkRvbWFpblRhZyIsInRhZ0luZm8iLCJ0YWciLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJleHBvcnRzIiwiRG9tYWluVGFnU3RhdGlzdGljIiwidGFnU3RhdGlzdGljSW5mbyIsInN0YXJ0IiwiZW5kIiwicmVzb2x1dGlvbiIsInN0YXRzIiwic3RhdCIsInRpbWUiLCJEb21haW5UYWdzQ2xpZW50IiwiX3N1cGVyIiwiX19leHRlbmRzIiwiY2FsbCIsInBhcnNlTGlzdCIsInBhZ2VzIiwicGFyc2VQYWdlTGlua3MiLCJfcGFyc2VUYWdTdGF0aXN0aWMiLCJyZXF1ZXN0TGlzdFdpdGhQYWdlcyIsInN0YXRpc3RpYyIsImNvdW50cmllcyIsInByb3ZpZGVycyIsImRldmljZXMiLCJEb21haW5UZW1wbGF0ZUl0ZW0iLCJkb21haW5UZW1wbGF0ZUZyb21BUEkiLCJjcmVhdGVkQXQiLCJjcmVhdGVkQnkiLCJpZCIsInZlcnNpb24iLCJ2ZXJzaW9ucyIsImxlbmd0aCIsIkRvbWFpblRlbXBsYXRlc0NsaWVudCIsInBhcnNlQ3JlYXRpb25SZXNwb25zZSIsInRlbXBsYXRlIiwicGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZSIsInBhcnNlTXV0YXRpb25SZXNwb25zZSIsInRlbXBsYXRlTmFtZSIsInBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UiLCJwYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlIiwidGVtcGxhdGVWZXJzaW9uIiwiZCIsInBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMiLCJkZXN0cm95QWxsIiwiY3JlYXRlVmVyc2lvbiIsImdldFZlcnNpb24iLCJ1cGRhdGVWZXJzaW9uIiwiZGVzdHJveVZlcnNpb24iLCJsaXN0VmVyc2lvbnMiLCJFdmVudENsaWVudCIsIklwUG9vbHNDbGllbnQiLCJwYXJzZUlwUG9vbHNSZXNwb25zZSIsInNlbnQiLCJwYXRjaFdpdGhGRCIsIklwc0NsaWVudCIsInBhcnNlSXBzUmVzcG9uc2UiLCJJbmJveFBsYWNlbWVudHNBdHRyaWJ1dGVzQ2xpZW50IiwicGF0aCIsImF0dHJpYnV0ZU5hbWUiLCJJbmJveFBsYWNlbWVudHNGaWx0ZXJzQ2xpZW50Iiwic3VwcG9ydGVkX2ZpbHRlcnMiLCJJbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50IiwiYXR0cmlidXRlcyIsImZpbHRlcnMiLCJzaGFyaW5nIiwibG9nZ2VyIiwiY29uc29sZSIsImNvbnZlcnREYXRlVG9VVEMiLCJpbnB1dERhdGUiLCJ3YXJuIiwidG9JU09TdHJpbmciLCJwcmVwYXJlUXVlcnlEYXRhIiwicXVlcnlEYXRhIiwicHJlcGFyZUluYm94UGxhY2VtZW50c1Jlc3VsdCIsImJveCIsImhhbmRsZWRTZWVkTGlzdERhdGVzIiwidXBkYXRlZF9hdCIsInNoYXJpbmdfZXhwaXJlc19hdCIsIkJveCIsImxhc3RfcmVzdWx0X2F0IiwiSUQiLCJpbmJveFBsYWNlbWVudHNSZXN1bHQiLCJJZCIsImluYm94UGxhY2VtZW50UmVzdWx0IiwiZ2V0UmVzdWx0QnlTaGFyZUlkIiwic2hhcmVJZCIsIklQUlNoYXJpbmdDbGllbnQiLCJwcmVwYXJlSW5ib3hQbGFjZW1lbnRzUmVzdWx0U2hhcmluZyIsImV4cGlyZXNfYXQiLCJlbmFibGVkIiwiU2VlZHNMaXN0c0NsaWVudCIsInByZXBhcmVSZXN1bHQiLCJzZWVkTGlzdCIsInByZXBhcmVTZWVkTGlzdCIsInNlZWRzIiwiU2VlZHMiLCJzZWVkSXRlbSIsInNlZWQiLCJoYW5kbGVkU2VlZERhdGVzIiwibWF4X2VtYWlsX2NvdW50X2hpdF9hdCIsImxhc3Rfc2VudF90b19hdCIsImxhc3RfZGVsaXZlcmVkX2F0IiwidXBkYXRlZFNlZWRzTGlzdCIsInNlZWRsaXN0IiwiSW5ib3hQbGFjZW1lbnRzQ2xpZW50Iiwic2VlZHNMaXN0c0NsaWVudCIsInJlc3VsdHMiLCJzZWVkc0xpc3RzIiwicnVuVGVzdCIsInBvc3QiLCJJbmJveFBsYWNlbWVudHNQcm92aWRlcnNDbGllbnQiLCJoYW5kbGVkUHJvdmlkZXJEYXRlcyIsIlJlcXVlc3RfMSIsImRvbWFpbnNDbGllbnRfMSIsIkV2ZW50c18xIiwiU3RhdHNDbGllbnRfMSIsIlN1cHByZXNzaW9uc0NsaWVudF8xIiwiV2ViaG9va3NfMSIsIk1lc3NhZ2VzXzEiLCJSb3V0ZXNfMSIsInZhbGlkYXRlXzEiLCJJUHNfMSIsIklQUG9vbHNfMSIsIm1haWxpbmdMaXN0c18xIiwibWFpbExpc3RNZW1iZXJzXzEiLCJkb21haW5zQ3JlZGVudGlhbHNfMSIsIm11bHRpcGxlVmFsaWRhdGlvbl8xIiwiZG9tYWluc1RlbXBsYXRlc18xIiwiZG9tYWluc1RhZ3NfMSIsIlN1YmFjY291bnRzXzEiLCJTZWVkc0xpc3RzQ2xpZW50XzEiLCJpbmJveFBsYWNlbWVudHNfMSIsIkluYm94UGxhY2VtZW50c1Jlc3VsdHNDbGllbnRfMSIsIkF0dHJpYnV0ZXNDbGllbnRfMSIsIkZpbHRlcnNDbGllbnRfMSIsIkluYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50XzEiLCJJbmJveFBsYWNlbWVudHNQcm92aWRlcnNfMSIsIk1haWxndW5DbGllbnQiLCJvcHRpb25zIiwiZm9ybURhdGEiLCJjb25maWciLCJ1cmwiLCJ1c2VybmFtZSIsIkVycm9yIiwibWFpbExpc3RzTWVtYmVycyIsIm11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCIsIkluYm94UGxhY2VtZW50c1Jlc3VsdHNTaGFyaW5nQ2xpZW50Iiwic2VlZHNMaXN0c0F0dHJpYnV0ZXMiLCJyZXN1bHRzQXR0cmlidXRlc0NsaWVudCIsInNlZWRzTGlzdHNGaWx0ZXJzQ2xpZW50IiwicmVzdWx0c0ZpbHRlcnNDbGllbnQiLCJpbmJveFBsYWNlbWVudHNSZXN1bHRzQ2xpZW50IiwiaW5ib3hQbGFjZW1lbnRzUHJvdmlkZXJzQ2xpZW50IiwiZG9tYWlucyIsIndlYmhvb2tzIiwiZXZlbnRzIiwic3VwcHJlc3Npb25zIiwibWVzc2FnZXMiLCJyb3V0ZXMiLCJpcHMiLCJpcF9wb29scyIsImxpc3RzIiwidmFsaWRhdGUiLCJzdWJhY2NvdW50cyIsImluYm94X3BsYWNlbWVudHMiLCJzZXRTdWJhY2NvdW50Iiwic3ViYWNjb3VudElkIiwic2V0U3ViYWNjb3VudEhlYWRlciIsInJlc2V0U3ViYWNjb3VudCIsInJlc2V0U3ViYWNjb3VudEhlYWRlciIsIk1haWxMaXN0c01lbWJlcnMiLCJjaGVja0FuZFVwZGF0ZURhdGEiLCJuZXdEYXRhIiwidmFycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWJzY3JpYmVkIiwibGlzdE1lbWJlcnMiLCJtYWlsTGlzdEFkZHJlc3MiLCJnZXRNZW1iZXIiLCJtYWlsTGlzdE1lbWJlckFkZHJlc3MiLCJtZW1iZXIiLCJjcmVhdGVNZW1iZXIiLCJyZXFEYXRhIiwiY3JlYXRlTWVtYmVycyIsIm1lbWJlcnMiLCJBcnJheSIsImlzQXJyYXkiLCJ1cHNlcnQiLCJ1cGRhdGVNZW1iZXIiLCJkZXN0cm95TWVtYmVyIiwiTWFpbGluZ0xpc3RzQ2xpZW50IiwicGFyc2VWYWxpZGF0aW9uUmVzdWx0IiwidmFsaWRhdGlvblJlc3VsdCIsImNhbmNlbFZhbGlkYXRpb24iLCJNZXNzYWdlc0NsaWVudCIsInByZXBhcmVCb29sZWFuVmFsdWVzIiwieWVzTm9Qcm9wZXJ0aWVzIiwiU2V0IiwiaGFzIiwiX3BhcnNlUmVzcG9uc2UiLCJtb2RpZmllZERhdGEiLCJSb3V0ZXNDbGllbnQiLCJyb3V0ZSIsIlN0YXRzQ29udGFpbmVyXzEiLCJTdGF0c0NsaWVudCIsInRvVVRDU3RyaW5nIiwicHJlcGFyZVNlYXJjaFBhcmFtcyIsImVudHJpZXMiLCJhcnJheVdpdGhQYWlycyIsImN1cnJlbnRQYWlyIiwicmVwZWF0ZWRQcm9wZXJ0eSIsIl9fc3ByZWFkQXJyYXkiLCJwdXNoIiwicGFyc2VTdGF0cyIsImdldERvbWFpbiIsImdldEFjY291bnQiLCJTdGF0c0NvbnRhaW5lciIsIlN1YmFjY291bnRzQ2xpZW50IiwiZW5hYmxlIiwiZGlzYWJsZSIsIlNVQkFDQ09VTlRfSEVBREVSIiwiRW51bXNfMSIsIlN1cHByZXNzaW9uXzEiLCJCb3VuY2UiLCJTdXBwcmVzc2lvbk1vZGVscyIsIkJPVU5DRVMiLCJhZGRyZXNzIiwiY29kZSIsImVycm9yIiwiQ29tcGxhaW50IiwiQ09NUExBSU5UUyIsIlN1cHByZXNzaW9uIiwiQm91bmNlXzEiLCJDb21wbGFpbnRfMSIsIlVuc3Vic2NyaWJlXzEiLCJXaGl0ZUxpc3RfMSIsImNyZWF0ZU9wdGlvbnMiLCJoZWFkZXJzIiwiU3VwcHJlc3Npb25DbGllbnQiLCJtb2RlbHMiLCJib3VuY2VzIiwiY29tcGxhaW50cyIsInVuc3Vic2NyaWJlcyIsIndoaXRlbGlzdHMiLCJNb2RlbCIsIl9wYXJzZUl0ZW0iLCJjcmVhdGVXaGl0ZUxpc3QiLCJpc0RhdGFBcnJheSIsInByZXBhcmVSZXNwb25zZSIsImNyZWF0ZVVuc3Vic2NyaWJlIiwiaXNDb250YWluc1RhZyIsInNvbWUiLCJ1bnN1YnNjcmliZSIsInRhZ3MiLCJnZXRNb2RlbCIsIm1vZGVsIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicG9zdERhdGEiLCJtb2R1bGUiLCJVbnN1YnNjcmliZSIsIlVOU1VCU0NSSUJFUyIsIldoaXRlTGlzdCIsIldISVRFTElTVFMiLCJyZWFzb24iLCJBdHRhY2htZW50c0hhbmRsZXJfMSIsIk11bHRpcGxlVmFsaWRhdGlvbkpvYiIsInJlc3BvbnNlU3RhdHVzQ29kZSIsInF1YW50aXR5IiwicmVjb3Jkc1Byb2Nlc3NlZCIsInJlY29yZHNfcHJvY2Vzc2VkIiwiZG93bmxvYWRfdXJsIiwiZG93bmxvYWRVcmwiLCJjc3YiLCJqc29uIiwiX2IiLCJzdW1tYXJ5IiwiY2F0Y2hBbGwiLCJjYXRjaF9hbGwiLCJkZWxpdmVyYWJsZSIsImRvTm90U2VuZCIsImRvX25vdF9zZW5kIiwidW5kZWxpdmVyYWJsZSIsInVua25vd24iLCJyaXNrIiwiaGlnaCIsImxvdyIsIm1lZGl1bSIsIk11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCIsImF0dGFjaG1lbnRzSGFuZGxlciIsImhhbmRsZVJlc3BvbnNlIiwiam9icyIsImpvYiIsInRvdGFsIiwibGlzdElkIiwiY29udmVydFRvRXhwZWN0ZWRTaGFwZSIsIm11bHRpcGxlVmFsaWRhdGlvbkRhdGEiLCJpc0J1ZmZlciIsImZpbGUiLCJtdWx0aXBsZVZhbGlkYXRpb25GaWxlIiwiaXNTdHJlYW0iLCJWYWxpZGF0ZUNsaWVudCIsIm11bHRpcGxlVmFsaWRhdGlvbiIsIldlYmhvb2siLCJ1cmxzIiwiV2ViaG9va3NDbGllbnQiLCJfcGFyc2VXZWJob29rTGlzdCIsIl9wYXJzZVdlYmhvb2tXaXRoSUQiLCJ3ZWJob29rUmVzcG9uc2UiLCJ3ZWJob29rIiwidW5kZWZpbmVkIiwiX3BhcnNlV2ViaG9va1Rlc3QiLCJ0ZXN0IiwidXJsVmFsdWVzIiwiQmxvYkZyb21TdHJlYW0iLCJzdHJlYW0iLCJzaXplIiwiX3N0cmVhbSIsImRlZmluZVByb3BlcnR5IiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJBdHRhY2htZW50c0hhbmRsZXIiLCJnZXRBdHRhY2htZW50T3B0aW9ucyIsImZpbGVuYW1lIiwiY29udGVudFR5cGUiLCJrbm93bkxlbmd0aCIsImdldEZpbGVJbmZvIiwiZ2V0Q3VzdG9tRmlsZUluZm8iLCJnZXRCdWZmZXJJbmZvIiwiYnVmZmVyIiwiYnl0ZUxlbmd0aCIsInBpcGUiLCJpc0N1c3RvbUZpbGUiLCJvYmoiLCJpc0Jyb3dzZXJGaWxlIiwiQmxvYiIsIkJ1ZmZlciIsImdldEF0dGFjaG1lbnRJbmZvIiwiYXR0YWNobWVudCIsImlzU3RyaW5nIiwiY29udmVydFRvRkRleHBlY3RlZFNoYXBlIiwidXNlclByb3ZpZGVkVmFsdWUiLCJnZXRCbG9iRnJvbVN0cmVhbSIsIkFQSUVycm9yIiwic3RhdHVzVGV4dCIsImJvZHlNZXNzYWdlIiwic3RhY2siLCJkZXRhaWxzIiwiRm9ybURhdGFCdWlsZGVyIiwiRm9ybURhdGFDb25zdHJ1Y3RvciIsImZpbGVLZXlzIiwiY3JlYXRlRm9ybURhdGEiLCJmaWx0ZXIiLCJmb3JtRGF0YUFjYyIsImluY2x1ZGVzIiwiYXR0YWNobWVudFZhbHVlIiwiaXNNZXNzYWdlQXR0YWNobWVudCIsImFkZEZpbGVzVG9GRCIsIm1lc3NhZ2VWYWx1ZSIsImlzTUlNRSIsImFkZE1pbWVEYXRhVG9GRCIsImFkZENvbW1vblByb3BlcnR5VG9GRCIsImZvcm1EYXRhSW5zdGFuY2UiLCJhcHBlbmQiLCJpc0Zvcm1EYXRhUGFja2FnZSIsIm5vZGVGb3JtRGF0YSIsImJyb3dzZXJGb3JtRGF0YSIsImJsb2JJbnN0YW5jZSIsIlJlYWRhYmxlU3RyZWFtIiwiZ2V0SGVhZGVycyIsIkZpbGUiLCJldmVyeSIsImFwcGVuZEZpbGVUb0ZEIiwib3JpZ2luYWxLZXkiLCJvYmpEYXRhIiwiZmQiLCJmcm9tIiwiYmxvYiIsInNldCIsImZvckVhY2giLCJhZGRWYWx1ZUJhc2VkT25GRCIsImZkS2V5IiwiZmRWYWx1ZSIsIk5hdmlnYXRpb25UaHJ1UGFnZXMiLCJwYXJzZVBhZ2UiLCJwYWdlVXJsIiwidXJsU2VwYXJhdG9yIiwiaXRlcmF0b3JOYW1lIiwicGFyc2VkVXJsIiwiVVJMIiwicGFnZVZhbHVlIiwic3BsaXQiLCJwb3AiLCJpdGVyYXRvclBvc2l0aW9uIiwicGFnZSIsInBhZ2luZyIsInVwZGF0ZVVybEFuZFF1ZXJ5IiwiY2xpZW50VXJsIiwicXVlcnlDb3B5IiwidXBkYXRlZFF1ZXJ5IiwiYmFzZTY0IiwiX19pbXBvcnRTdGFyIiwiYXhpb3NfMSIsIkZvcm1EYXRhQnVpbGRlcl8xIiwiUmVxdWVzdCIsInRpbWVvdXQiLCJtYWtlSGVhZGVyc0Zyb21PYmplY3QiLCJmb3JtRGF0YUJ1aWxkZXIiLCJtYXhCb2R5TGVuZ3RoIiwicHJveHkiLCJtZXRob2QiLCJvbkNhbGxPcHRpb25zIiwicmVxdWVzdEhlYWRlcnMiLCJqb2luQW5kVHJhbnNmb3JtSGVhZGVycyIsInBhcmFtcyIsImdldE93blByb3BlcnR5TmFtZXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJ1cmxWYWx1ZSIsInRvTG9jYWxlVXBwZXJDYXNlIiwiX2QiLCJlcnJvclJlc3BvbnNlIiwiZXJyXzEiLCJfYyIsImdldFJlc3BvbnNlQm9keSIsIkF4aW9zSGVhZGVycyIsImJhc2ljIiwiZW5jb2RlIiwic2V0QXV0aG9yaXphdGlvbiIsInJlY2VpdmVkT25DYWxsSGVhZGVycyIsIm9uQ2FsbEhlYWRlcnMiLCJoZWFkZXJzT2JqZWN0IiwiaGVhZGVyc0FjY3VtdWxhdG9yIiwiY29tbWFuZCIsImFkZERlZmF1bHRIZWFkZXJzIiwicmVxdWVzdE9wdGlvbnMiLCJSZXNvbHV0aW9uIiwiV2ViaG9va3NJZHMiLCJZZXNObyIsIl9fZXhwb3J0U3RhciIsIk1haWxndW5DbGllbnRfMSIsIkVudW1zIiwiSW50ZXJmYWNlcyIsIk1haWxndW4iLCJGb3JtRGF0YSIsImNsaWVudCJdLCJzb3VyY2VSb290IjoiIn0=