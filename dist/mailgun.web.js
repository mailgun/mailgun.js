/*! mailgun.js v4.0.1 */
/*! mailgun.js v4.0.1 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mailgun"] = factory();
	else
		root["mailgun"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

var client_1 = __importDefault(__webpack_require__(/*! ./lib/client */ "./lib/client.ts"));

var Mailgun =
/** @class */
function () {
  function Mailgun(FormData) {
    this.formData = FormData;
  }

  Mailgun.prototype.client = function (options) {
    return new client_1.default(options, this.formData);
  };

  return Mailgun;
}();

module.exports = Mailgun;

/***/ }),

/***/ "./lib/client.ts":
/*!***********************!*\
  !*** ./lib/client.ts ***!
  \***********************/
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

var request_1 = __importDefault(__webpack_require__(/*! ./request */ "./lib/request.ts"));

var domains_1 = __importDefault(__webpack_require__(/*! ./domains */ "./lib/domains.ts"));

var events_1 = __importDefault(__webpack_require__(/*! ./events */ "./lib/events.ts"));

var stats_1 = __importDefault(__webpack_require__(/*! ./stats */ "./lib/stats.ts"));

var suppressions_1 = __importDefault(__webpack_require__(/*! ./suppressions */ "./lib/suppressions.ts"));

var webhooks_1 = __importDefault(__webpack_require__(/*! ./webhooks */ "./lib/webhooks.ts"));

var messages_1 = __importDefault(__webpack_require__(/*! ./messages */ "./lib/messages.ts"));

var routes_1 = __importDefault(__webpack_require__(/*! ./routes */ "./lib/routes.ts"));

var validate_1 = __importDefault(__webpack_require__(/*! ./validate */ "./lib/validate.ts"));

var ips_1 = __importDefault(__webpack_require__(/*! ./ips */ "./lib/ips.ts"));

var ip_pools_1 = __importDefault(__webpack_require__(/*! ./ip-pools */ "./lib/ip-pools.ts"));

var lists_1 = __importDefault(__webpack_require__(/*! ./lists */ "./lib/lists.ts"));

var mailListMembers_1 = __importDefault(__webpack_require__(/*! ./mailListMembers */ "./lib/mailListMembers.ts"));

var domainsCredentials_1 = __importDefault(__webpack_require__(/*! ./domainsCredentials */ "./lib/domainsCredentials.ts"));

var multipleValidation_1 = __importDefault(__webpack_require__(/*! ./multipleValidation */ "./lib/multipleValidation.ts"));

var Client =
/** @class */
function () {
  function Client(options, formData) {
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


    this.request = new request_1.default(config, formData);
    var mailListsMembers = new mailListMembers_1.default(this.request);
    var domainCredentialsClient = new domainsCredentials_1.default(this.request);
    var multipleValidationClient = new multipleValidation_1.default(this.request);
    this.domains = new domains_1.default(this.request, domainCredentialsClient);
    this.webhooks = new webhooks_1.default(this.request);
    this.events = new events_1.default(this.request);
    this.stats = new stats_1.default(this.request);
    this.suppressions = new suppressions_1.default(this.request);
    this.messages = new messages_1.default(this.request);
    this.routes = new routes_1.default(this.request);
    this.ips = new ips_1.default(this.request);
    this.ip_pools = new ip_pools_1.default(this.request);
    this.lists = new lists_1.default(this.request, mailListsMembers);
    this.validate = new validate_1.default(this.request, multipleValidationClient);
  }

  return Client;
}();

exports["default"] = Client;

/***/ }),

/***/ "./lib/domains.ts":
/*!************************!*\
  !*** ./lib/domains.ts ***!
  \************************/
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
exports.Domain = void 0;
/* eslint-disable camelcase */

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var error_1 = __importDefault(__webpack_require__(/*! ./error */ "./lib/error.ts"));

var Domain =
/** @class */
function () {
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
  }

  return Domain;
}();

exports.Domain = Domain;

var DomainClient =
/** @class */
function () {
  function DomainClient(request, domainCredentialsClient) {
    this.request = request;
    this.domainCredentials = domainCredentialsClient;
  }

  DomainClient.prototype._parseMessage = function (response) {
    return response.body;
  };

  DomainClient.prototype._parseDomainList = function (response) {
    return response.body.items.map(function (item) {
      return new Domain(item);
    });
  };

  DomainClient.prototype._parseDomain = function (response) {
    return new Domain(response.body.domain, response.body.receiving_dns_records, response.body.sending_dns_records);
  };

  DomainClient.prototype._parseTrackingSettings = function (response) {
    return response.body.tracking;
  };

  DomainClient.prototype._parseTrackingUpdate = function (response) {
    return response.body;
  };

  DomainClient.prototype.list = function (query) {
    var _this = this;

    return this.request.get('/v3/domains', query).then(function (res) {
      return _this._parseDomainList(res);
    });
  };

  DomainClient.prototype.get = function (domain) {
    var _this = this;

    return this.request.get("/v3/domains/" + domain).then(function (res) {
      return _this._parseDomain(res);
    });
  };

  DomainClient.prototype.create = function (data) {
    var _this = this;

    var postObj = __assign({}, data);

    if ('force_dkim_authority' in postObj && typeof postObj.force_dkim_authority === 'boolean') {
      postObj.force_dkim_authority = postObj.toString() === 'true' ? 'true' : 'false';
    }

    return this.request.postWithFD('/v3/domains', postObj).then(function (res) {
      return _this._parseDomain(res);
    });
  };

  DomainClient.prototype.destroy = function (domain) {
    var _this = this;

    return this.request.delete("/v3/domains/" + domain).then(function (res) {
      return _this._parseMessage(res);
    });
  };

  DomainClient.prototype.getConnection = function (domain) {
    return this.request.get("/v3/domains/" + domain + "/connection").then(function (res) {
      return res;
    }).then(function (res) {
      return res.body.connection;
    });
  };

  DomainClient.prototype.updateConnection = function (domain, data) {
    return this.request.put("/v3/domains/" + domain + "/connection", data).then(function (res) {
      return res;
    }).then(function (res) {
      return res.body;
    });
  }; // Tracking


  DomainClient.prototype.getTracking = function (domain) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'tracking')).then(this._parseTrackingSettings);
  };

  DomainClient.prototype.updateTracking = function (domain, type, data) {
    var _this = this;

    if (typeof (data === null || data === void 0 ? void 0 : data.active) === 'boolean') {
      throw new error_1.default({
        status: 400,
        statusText: '',
        body: {
          message: 'Property "active" must contain string value.'
        }
      });
    }

    return this.request.putWithFD((0, url_join_1.default)('/v3/domains', domain, 'tracking', type), data).then(function (res) {
      return _this._parseTrackingUpdate(res);
    });
  }; // IPs


  DomainClient.prototype.getIps = function (domain) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'ips')).then(function (response) {
      var _a;

      return (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.items;
    });
  };

  DomainClient.prototype.assignIp = function (domain, ip) {
    return this.request.postWithFD((0, url_join_1.default)('/v3/domains', domain, 'ips'), {
      ip: ip
    });
  };

  DomainClient.prototype.deleteIp = function (domain, ip) {
    return this.request.delete((0, url_join_1.default)('/v3/domains', domain, 'ips', ip));
  };

  DomainClient.prototype.linkIpPool = function (domain, pool_id) {
    return this.request.postWithFD((0, url_join_1.default)('/v3/domains', domain, 'ips'), {
      pool_id: pool_id
    });
  };

  DomainClient.prototype.unlinkIpPoll = function (domain, replacement) {
    var searchParams = '';

    if (replacement.pool_id && replacement.ip) {
      throw new error_1.default({
        status: 400,
        statusText: '',
        body: {
          message: 'Please specify either pool_id or ip (not both)'
        }
      });
    } else if (replacement.pool_id) {
      searchParams = "?pool_id=" + replacement.pool_id;
    } else if (replacement.ip) {
      searchParams = "?ip=" + replacement.ip;
    }

    return this.request.delete((0, url_join_1.default)('/v3/domains', domain, 'ips', 'ip_pool', searchParams));
  };

  DomainClient.prototype.updateDKIMAuthority = function (domain, data) {
    return this.request.put("/v3/domains/" + domain + "/dkim_authority", {}, {
      query: "self=" + data.self
    }).then(function (res) {
      return res;
    }).then(function (res) {
      return res.body;
    });
  };

  DomainClient.prototype.updateDKIMSelector = function (domain, data) {
    return this.request.put("/v3/domains/" + domain + "/dkim_selector", {}, {
      query: "dkim_selector=" + data.dkimSelector
    }).then(function (res) {
      return res;
    });
  };

  DomainClient.prototype.updateWebPrefix = function (domain, data) {
    return this.request.put("/v3/domains/" + domain + "/web_prefix", {}, {
      query: "web_prefix=" + data.webPrefix
    }).then(function (res) {
      return res;
    });
  };

  return DomainClient;
}();

exports["default"] = DomainClient;

/***/ }),

/***/ "./lib/domainsCredentials.ts":
/*!***********************************!*\
  !*** ./lib/domainsCredentials.ts ***!
  \***********************************/
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

var DomainCredentialsClient =
/** @class */
function () {
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

    return this.request.postWithFD("" + this.baseRoute + domain + "/credentials", data).then(function (res) {
      return _this._parseMessageResponse(res);
    });
  };

  DomainCredentialsClient.prototype.update = function (domain, credentialsLogin, data) {
    var _this = this;

    return this.request.putWithFD("" + this.baseRoute + domain + "/credentials/" + credentialsLogin, data).then(function (res) {
      return _this._parseMessageResponse(res);
    });
  };

  DomainCredentialsClient.prototype.destroy = function (domain, credentialsLogin) {
    var _this = this;

    return this.request.delete("" + this.baseRoute + domain + "/credentials/" + credentialsLogin).then(function (res) {
      return _this._parseDeletedResponse(res);
    });
  };

  return DomainCredentialsClient;
}();

exports["default"] = DomainCredentialsClient;

/***/ }),

/***/ "./lib/error.ts":
/*!**********************!*\
  !*** ./lib/error.ts ***!
  \**********************/
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

var APIError =
/** @class */
function (_super) {
  __extends(APIError, _super);

  function APIError(_a) {
    var status = _a.status,
        statusText = _a.statusText,
        message = _a.message,
        _b = _a.body,
        body = _b === void 0 ? {} : _b;

    var _this = this;

    var bodyMessage = body.message,
        error = body.error;
    _this = _super.call(this) || this;
    _this.stack = '';
    _this.status = status;
    _this.message = message || error || statusText;
    _this.details = bodyMessage;
    return _this;
  }

  return APIError;
}(Error);

exports["default"] = APIError;

/***/ }),

/***/ "./lib/events.ts":
/*!***********************!*\
  !*** ./lib/events.ts ***!
  \***********************/
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

var EventClient =
/** @class */
function () {
  function EventClient(request) {
    this.request = request;
  }

  EventClient.prototype._parsePageNumber = function (url) {
    return url.split('/').pop();
  };

  EventClient.prototype._parsePage = function (id, url) {
    return {
      id: id,
      number: this._parsePageNumber(url),
      url: url
    };
  };

  EventClient.prototype._parsePageLinks = function (response) {
    var _this = this;

    var pages = Object.entries(response.body.paging);
    return pages.reduce(function (acc, entrie) {
      var id = entrie[0];
      var url = entrie[1];
      acc[id] = _this._parsePage(id, url);
      return acc;
    }, {});
  };

  EventClient.prototype._parseEventList = function (response) {
    return {
      items: response.body.items,
      pages: this._parsePageLinks(response)
    };
  };

  EventClient.prototype.get = function (domain, query) {
    var _this = this;

    var url;

    var queryCopy = __assign({}, query);

    if (queryCopy && queryCopy.page) {
      url = (0, url_join_1.default)('/v3', domain, 'events', queryCopy.page);
      delete queryCopy.page;
    } else {
      url = (0, url_join_1.default)('/v3', domain, 'events');
    }

    return this.request.get(url, queryCopy).then(function (response) {
      return _this._parseEventList(response);
    });
  };

  return EventClient;
}();

exports["default"] = EventClient;

/***/ }),

/***/ "./lib/ip-pools.ts":
/*!*************************!*\
  !*** ./lib/ip-pools.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var IpPoolsClient =
/** @class */
function () {
  function IpPoolsClient(request) {
    this.request = request;
  }

  IpPoolsClient.prototype.list = function (query) {
    var _this = this;

    return this.request.get('/v1/ip_pools', query).then(function (response) {
      return _this.parseIpPoolsResponse(response);
    });
  };

  IpPoolsClient.prototype.create = function (data) {
    return this.request.post('/v1/ip_pools', data).then(function (response) {
      return response === null || response === void 0 ? void 0 : response.body;
    });
  };

  IpPoolsClient.prototype.update = function (poolId, data) {
    return this.request.patch("/v1/ip_pools/" + poolId, data).then(function (response) {
      return response === null || response === void 0 ? void 0 : response.body;
    });
  };

  IpPoolsClient.prototype.delete = function (poolId, data) {
    return this.request.delete("/v1/ip_pools/" + poolId, data).then(function (response) {
      return response === null || response === void 0 ? void 0 : response.body;
    });
  };

  IpPoolsClient.prototype.parseIpPoolsResponse = function (response) {
    return response.body.ip_pools;
  };

  return IpPoolsClient;
}();

exports["default"] = IpPoolsClient;

/***/ }),

/***/ "./lib/ips.ts":
/*!********************!*\
  !*** ./lib/ips.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var IpsClient =
/** @class */
function () {
  function IpsClient(request) {
    this.request = request;
  }

  IpsClient.prototype.list = function (query) {
    var _this = this;

    return this.request.get('/v3/ips', query).then(function (response) {
      return _this.parseIpsResponse(response);
    });
  };

  IpsClient.prototype.get = function (ip) {
    var _this = this;

    return this.request.get("/v3/ips/" + ip).then(function (response) {
      return _this.parseIpsResponse(response);
    });
  };

  IpsClient.prototype.parseIpsResponse = function (response) {
    return response.body;
  };

  return IpsClient;
}();

exports["default"] = IpsClient;

/***/ }),

/***/ "./lib/lists.ts":
/*!**********************!*\
  !*** ./lib/lists.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var ListsClient =
/** @class */
function () {
  function ListsClient(request, members) {
    this.request = request;
    this.baseRoute = '/v3/lists';
    this.members = members;
  }

  ListsClient.prototype.list = function (query) {
    return this.request.get(this.baseRoute + "/pages", query).then(function (response) {
      return response.body.items;
    });
  };

  ListsClient.prototype.get = function (mailListAddress) {
    return this.request.get(this.baseRoute + "/" + mailListAddress).then(function (response) {
      return response.body.list;
    });
  };

  ListsClient.prototype.create = function (data) {
    return this.request.postWithFD(this.baseRoute, data).then(function (response) {
      return response.body.list;
    });
  };

  ListsClient.prototype.update = function (mailListAddress, data) {
    return this.request.putWithFD(this.baseRoute + "/" + mailListAddress, data).then(function (response) {
      return response.body.list;
    });
  };

  ListsClient.prototype.destroy = function (mailListAddress) {
    return this.request.delete(this.baseRoute + "/" + mailListAddress).then(function (response) {
      return response.body;
    });
  };

  return ListsClient;
}();

exports["default"] = ListsClient;

/***/ }),

/***/ "./lib/mailListMembers.ts":
/*!********************************!*\
  !*** ./lib/mailListMembers.ts ***!
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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var MailListsMembers =
/** @class */
function () {
  function MailListsMembers(request) {
    this.request = request;
    this.baseRoute = '/v3/lists';
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

  MailListsMembers.prototype.listMembers = function (mailListAddress, query) {
    return this.request.get(this.baseRoute + "/" + mailListAddress + "/members/pages", query).then(function (response) {
      return response.body.items;
    });
  };

  MailListsMembers.prototype.getMember = function (mailListAddress, mailListMemberAddress) {
    return this.request.get(this.baseRoute + "/" + mailListAddress + "/members/" + mailListMemberAddress).then(function (response) {
      return response.body.member;
    });
  };

  MailListsMembers.prototype.createMember = function (mailListAddress, data) {
    var reqData = this.checkAndUpdateData(data);
    return this.request.postWithFD(this.baseRoute + "/" + mailListAddress + "/members", reqData).then(function (response) {
      return response.body.member;
    });
  };

  MailListsMembers.prototype.createMembers = function (mailListAddress, data) {
    var newData = {
      members: Array.isArray(data.members) ? JSON.stringify(data.members) : data.members,
      upsert: data.upsert
    };
    return this.request.postWithFD(this.baseRoute + "/" + mailListAddress + "/members.json", newData).then(function (response) {
      return response.body;
    });
  };

  MailListsMembers.prototype.updateMember = function (mailListAddress, mailListMemberAddress, data) {
    var reqData = this.checkAndUpdateData(data);
    return this.request.putWithFD(this.baseRoute + "/" + mailListAddress + "/members/" + mailListMemberAddress, reqData).then(function (response) {
      return response.body.member;
    });
  };

  MailListsMembers.prototype.destroyMember = function (mailListAddress, mailListMemberAddress) {
    return this.request.delete(this.baseRoute + "/" + mailListAddress + "/members/" + mailListMemberAddress).then(function (response) {
      return response.body;
    });
  };

  return MailListsMembers;
}();

exports["default"] = MailListsMembers;

/***/ }),

/***/ "./lib/messages.ts":
/*!*************************!*\
  !*** ./lib/messages.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var MessagesClient =
/** @class */
function () {
  function MessagesClient(request) {
    this.request = request;
  }

  MessagesClient.prototype._parseResponse = function (response) {
    if (response.body) {
      return response.body;
    }

    return response;
  };

  MessagesClient.prototype.create = function (domain, data) {
    if (data.message) {
      return this.request.postWithFD("/v3/" + domain + "/messages.mime", data).then(this._parseResponse);
    }

    return this.request.postWithFD("/v3/" + domain + "/messages", data).then(this._parseResponse);
  };

  return MessagesClient;
}();

exports["default"] = MessagesClient;

/***/ }),

/***/ "./lib/multipleValidation.ts":
/*!***********************************!*\
  !*** ./lib/multipleValidation.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var MultipleValidationClient =
/** @class */
function () {
  function MultipleValidationClient(request) {
    this.request = request;
  }

  MultipleValidationClient.prototype.list = function () {
    return this.request.get('/v4/address/validate/bulk').then(function (response) {
      return response.body;
    });
  };

  MultipleValidationClient.prototype.get = function (listId) {
    return this.request.get("/v4/address/validate/bulk/" + listId).then(function (response) {
      return response.body;
    });
  };

  MultipleValidationClient.prototype.create = function (listId, file) {
    return this.request.postWithFD("/v4/address/validate/bulk/" + listId, file).then(function (response) {
      return response.body;
    });
  };

  MultipleValidationClient.prototype.destroy = function (listId) {
    return this.request.delete("/v4/address/validate/bulk/" + listId).then(function (response) {
      return response;
    });
  };

  return MultipleValidationClient;
}();

exports["default"] = MultipleValidationClient;

/***/ }),

/***/ "./lib/request.ts":
/*!************************!*\
  !*** ./lib/request.ts ***!
  \************************/
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

    while (_) try {
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

var base_64_1 = __importDefault(__webpack_require__(/*! base-64 */ "./node_modules/base-64/base64.js"));

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var ky_universal_1 = __importDefault(__webpack_require__(/*! ky-universal */ "./node_modules/ky-universal/browser.js"));

var error_1 = __importDefault(__webpack_require__(/*! ./error */ "./lib/error.ts"));

var isStream = function (attachment) {
  return typeof attachment === 'object' && typeof attachment.pipe === 'function';
};

function isNodeFormData(formDataInstance) {
  return formDataInstance.getHeaders !== undefined;
}

var getAttachmentOptions = function (item) {
  if (typeof item !== 'object' || isStream(item)) return {};
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

var streamToString = function (stream) {
  var chunks = [];
  return new Promise(function (resolve, reject) {
    stream.on('data', function (chunk) {
      return chunks.push(chunk);
    });
    stream.on('error', reject);
    stream.on('end', function () {
      return resolve(Buffer.concat(chunks).toString('utf8'));
    });
  });
};

var Request =
/** @class */
function () {
  function Request(options, formData) {
    this.username = options.username;
    this.key = options.key;
    this.url = options.url;
    this.timeout = options.timeout;
    this.headers = options.headers || {};
    this.FormDataConstructor = formData;
  }

  Request.prototype.request = function (method, url, inputOptions) {
    return __awaiter(this, void 0, void 0, function () {
      var options, basic, headers, params, response, message, _a, res;

      var _b;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            options = __assign({}, inputOptions);
            basic = base_64_1.default.encode(this.username + ":" + this.key);
            headers = __assign(__assign({
              Authorization: "Basic " + basic
            }, this.headers), options === null || options === void 0 ? void 0 : options.headers);
            options === null || options === void 0 ? true : delete options.headers;

            if (!headers['Content-Type']) {
              // for form-data it will be Null so we need to remove it
              delete headers['Content-Type'];
            }

            params = __assign({}, options);

            if ((options === null || options === void 0 ? void 0 : options.query) && Object.getOwnPropertyNames(options === null || options === void 0 ? void 0 : options.query).length > 0) {
              params.searchParams = options.query;
              delete params.query;
            }

            console.log('url --->', (0, url_join_1.default)(this.url, url));
            return [4
            /*yield*/
            , (0, ky_universal_1.default)((0, url_join_1.default)(this.url, url), __assign({
              method: method.toLocaleUpperCase(),
              headers: headers,
              throwHttpErrors: false,
              timeout: this.timeout
            }, params))];

          case 1:
            response = _c.sent();
            if (!!(response === null || response === void 0 ? void 0 : response.ok)) return [3
            /*break*/
            , 6];
            if (!((response === null || response === void 0 ? void 0 : response.body) && isStream(response.body))) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , streamToString(response.body)];

          case 2:
            _a = _c.sent();
            return [3
            /*break*/
            , 5];

          case 3:
            return [4
            /*yield*/
            , response === null || response === void 0 ? void 0 : response.json()];

          case 4:
            _a = _c.sent();
            _c.label = 5;

          case 5:
            message = _a;
            throw new error_1.default({
              status: response === null || response === void 0 ? void 0 : response.status,
              statusText: response === null || response === void 0 ? void 0 : response.statusText,
              body: {
                message: message
              }
            });

          case 6:
            _b = {};
            return [4
            /*yield*/
            , response === null || response === void 0 ? void 0 : response.json()];

          case 7:
            res = (_b.body = _c.sent(), _b.status = response === null || response === void 0 ? void 0 : response.status, _b);
            return [2
            /*return*/
            , res];
        }
      });
    });
  };

  Request.prototype.query = function (method, url, query, options) {
    return this.request(method, url, __assign({
      query: query
    }, options));
  };

  Request.prototype.command = function (method, url, data, options) {
    return this.request(method, url, __assign({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    }, options));
  };

  Request.prototype.get = function (url, query, options) {
    return this.query('get', url, query, options);
  };

  Request.prototype.head = function (url, query, options) {
    return this.query('head', url, query, options);
  };

  Request.prototype.options = function (url, query, options) {
    return this.query('options', url, query, options);
  };

  Request.prototype.post = function (url, data, options) {
    return this.command('post', url, data, options);
  };

  Request.prototype.postWithFD = function (url, data) {
    if (!data) {
      throw new Error('Please provide data object');
    }

    var params = {
      headers: {
        'Content-Type': null
      }
    };
    var formData = this.createFormData(data);
    return this.command('post', url, formData, params);
  };

  Request.prototype.putWithFD = function (url, data) {
    if (!data) {
      throw new Error('Please provide data object');
    }

    var params = {
      headers: {
        'Content-Type': null
      }
    };
    var formData = this.createFormData(data);
    return this.command('put', url, formData, params);
  };

  Request.prototype.createFormData = function (data) {
    var _this = this;

    var formData = Object.keys(data).filter(function (key) {
      return data[key];
    }).reduce(function (formDataAcc, key) {
      var fileKeys = ['attachment', 'inline', 'file'];

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

  Request.prototype.addMimeDataToFD = function (key, data, formDataInstance) {
    if (isNodeFormData(formDataInstance)) {
      if (Buffer.isBuffer(data)) {
        formDataInstance.append(key, data, {
          filename: 'MimeMessage'
        });
      }
    } else {
      formDataInstance.append(key, data, 'MimeMessage');
    }
  };

  Request.prototype.addFilesToFD = function (propertyName, value, formDataInstance) {
    var appendFileToFD = function (key, obj, formData) {
      var isStreamData = isStream(obj);
      var objData = isStreamData ? obj : obj.data; // getAttachmentOptions should be called with obj parameter to prevent loosing filename

      var options = getAttachmentOptions(obj);

      if (isNodeFormData(formData)) {
        formData.append(key, objData, options);
        return;
      }

      formData.append(key, objData, options.filename);
    };

    if (Array.isArray(value)) {
      value.forEach(function (item) {
        appendFileToFD(propertyName, item, formDataInstance);
      });
    } else {
      appendFileToFD(propertyName, value, formDataInstance);
    }
  };

  Request.prototype.addCommonPropertyToFD = function (key, value, formDataAcc) {
    if (Array.isArray(value)) {
      value.forEach(function (item) {
        formDataAcc.append(key, item);
      });
    } else if (value != null) {
      formDataAcc.append(key, value);
    }
  };

  Request.prototype.put = function (url, data, options) {
    return this.command('put', url, data, options);
  };

  Request.prototype.patch = function (url, data, options) {
    return this.command('patch', url, data, options);
  };

  Request.prototype.delete = function (url, data, options) {
    return this.command('delete', url, data, options);
  };

  return Request;
}();

exports["default"] = Request;

/***/ }),

/***/ "./lib/routes.ts":
/*!***********************!*\
  !*** ./lib/routes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var RoutesClient =
/** @class */
function () {
  function RoutesClient(request) {
    this.request = request;
  }

  RoutesClient.prototype.list = function (query) {
    return this.request.get('/v3/routes', query).then(function (response) {
      return response.body.items;
    });
  };

  RoutesClient.prototype.get = function (id) {
    return this.request.get("/v3/routes/" + id).then(function (response) {
      return response.body.route;
    });
  };

  RoutesClient.prototype.create = function (data) {
    return this.request.postWithFD('/v3/routes', data).then(function (response) {
      return response.body.route;
    });
  };

  RoutesClient.prototype.update = function (id, data) {
    return this.request.putWithFD("/v3/routes/" + id, data).then(function (response) {
      return response.body;
    });
  };

  RoutesClient.prototype.destroy = function (id) {
    return this.request.delete("/v3/routes/" + id).then(function (response) {
      return response.body;
    });
  };

  return RoutesClient;
}();

exports["default"] = RoutesClient;

/***/ }),

/***/ "./lib/stats.ts":
/*!**********************!*\
  !*** ./lib/stats.ts ***!
  \**********************/
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

var Stats =
/** @class */
function () {
  function Stats(data) {
    this.start = new Date(data.start);
    this.end = new Date(data.end);
    this.resolution = data.resolution;
    this.stats = data.stats.map(function (stat) {
      var res = __assign({}, stat);

      res.time = new Date(stat.time);
      return res;
    });
  }

  return Stats;
}();

var StatsClient =
/** @class */
function () {
  function StatsClient(request) {
    this.request = request;
  }

  StatsClient.prototype._parseStats = function (response) {
    return new Stats(response.body);
  };

  StatsClient.prototype.getDomain = function (domain, query) {
    return this.request.get((0, url_join_1.default)('/v3', domain, 'stats/total'), query).then(this._parseStats);
  };

  StatsClient.prototype.getAccount = function (query) {
    return this.request.get('/v3/stats/total', query).then(this._parseStats);
  };

  return StatsClient;
}();

exports["default"] = StatsClient;

/***/ }),

/***/ "./lib/suppressions.ts":
/*!*****************************!*\
  !*** ./lib/suppressions.ts ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

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
/* eslint-disable camelcase */

var url_1 = __importDefault(__webpack_require__(/*! url */ "./node_modules/url/url.js"));

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var createOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

var Bounce =
/** @class */
function () {
  function Bounce(data) {
    this.type = 'bounces';
    this.address = data.address;
    this.code = +data.code;
    this.error = data.error;
    this.created_at = new Date(data.created_at);
  }

  return Bounce;
}();

var Complaint =
/** @class */
function () {
  function Complaint(data) {
    this.type = 'complaints';
    this.address = data.address;
    this.created_at = new Date(data.created_at);
  }

  return Complaint;
}();

var Unsubscribe =
/** @class */
function () {
  function Unsubscribe(data) {
    this.type = 'unsubscribes';
    this.address = data.address;
    this.tags = data.tags;
    this.created_at = new Date(data.created_at);
  }

  return Unsubscribe;
}();

var WhiteList =
/** @class */
function () {
  function WhiteList(data) {
    this.type = 'whitelists';
    this.value = data.value;
    this.reason = data.reason;
    this.createdAt = new Date(data.createdAt);
  }

  return WhiteList;
}();

var SuppressionClient =
/** @class */
function () {
  function SuppressionClient(request) {
    this.request = request;
    this.models = {
      bounces: Bounce,
      complaints: Complaint,
      unsubscribes: Unsubscribe,
      whitelists: WhiteList
    };
  }

  SuppressionClient.prototype._parsePage = function (id, pageUrl) {
    var parsedUrl = url_1.default.parse(pageUrl, true);
    var query = parsedUrl.query;
    return {
      id: id,
      page: query.page,
      address: query.address,
      url: pageUrl
    };
  };

  SuppressionClient.prototype._parsePageLinks = function (response) {
    var _this = this;

    var pages = Object.entries(response.body.paging);
    return pages.reduce(function (acc, _a) {
      var id = _a[0],
          pageUrl = _a[1];
      acc[id] = _this._parsePage(id, pageUrl);
      return acc;
    }, {});
  };

  SuppressionClient.prototype._parseList = function (response, Model) {
    console.log('response ----------->', response.body.items);
    var data = {};
    data.items = response.body.items.map(function (d) {
      return new Model(d);
    });
    data.pages = this._parsePageLinks(response);
    return data;
  };

  SuppressionClient.prototype._parseItem = function (response, Model) {
    return new Model(response.body);
  };

  SuppressionClient.prototype.createWhiteList = function (domain, data) {
    // supports adding multiple suppressions by default
    return this.request.postWithFD((0, url_join_1.default)('v3', domain, 'whitelists'), data, createOptions).then(function (response) {
      return response.body;
    });
  };

  SuppressionClient.prototype.list = function (domain, type, query) {
    var _this = this;

    var model = this.models[type];
    return this.request.get((0, url_join_1.default)('v3', domain, type), query).then(function (response) {
      return _this._parseList(response, model);
    });
  };

  SuppressionClient.prototype.get = function (domain, type, address) {
    var _this = this;

    var model = this.models[type];
    return this.request.get((0, url_join_1.default)('v3', domain, type, encodeURIComponent(address))).then(function (response) {
      return _this._parseItem(response, model);
    });
  };

  SuppressionClient.prototype.create = function (domain, type, data) {
    // supports adding multiple suppressions by default
    var postData;

    if (type === 'whitelists') {
      return this.createWhiteList(domain, data);
    }

    if (!Array.isArray(data)) {
      postData = [data];
    } else {
      postData = __spreadArray([], data, true);
    }

    console.log('postData', postData);
    return this.request.post((0, url_join_1.default)('v3', domain, type), JSON.stringify(postData), createOptions).then(function (response) {
      return response.body;
    });
  };

  SuppressionClient.prototype.destroy = function (domain, type, address) {
    return this.request.delete((0, url_join_1.default)('v3', domain, type, encodeURIComponent(address))).then(function (response) {
      return response.body;
    });
  };

  return SuppressionClient;
}();

exports["default"] = SuppressionClient;
module.exports = SuppressionClient;

/***/ }),

/***/ "./lib/validate.ts":
/*!*************************!*\
  !*** ./lib/validate.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var ValidateClient =
/** @class */
function () {
  function ValidateClient(request, multipleValidationClient) {
    this.request = request;
    this.multipleValidation = multipleValidationClient;
  }

  ValidateClient.prototype.get = function (address) {
    return this.request.get('/v4/address/validate', {
      address: address
    }).then(function (response) {
      return response;
    }).then(function (res) {
      return res.body;
    });
  };

  return ValidateClient;
}();

exports["default"] = ValidateClient;

/***/ }),

/***/ "./lib/webhooks.ts":
/*!*************************!*\
  !*** ./lib/webhooks.ts ***!
  \*************************/
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

var Webhook =
/** @class */
function () {
  function Webhook(id, url) {
    this.id = id;
    this.url = url;
  }

  return Webhook;
}();

var WebhookClient =
/** @class */
function () {
  function WebhookClient(request) {
    this.request = request;
  }

  WebhookClient.prototype._parseWebhookList = function (response) {
    return response.body.webhooks;
  };

  WebhookClient.prototype._parseWebhookWithID = function (id) {
    return function (response) {
      var _a;

      var webhookResponse = (_a = response === null || response === void 0 ? void 0 : response.body) === null || _a === void 0 ? void 0 : _a.webhook;
      var url = webhookResponse === null || webhookResponse === void 0 ? void 0 : webhookResponse.url;

      if (!url) {
        url = (webhookResponse === null || webhookResponse === void 0 ? void 0 : webhookResponse.urls) && webhookResponse.urls.length ? webhookResponse.urls[0] : null;
      }

      return new Webhook(id, url);
    };
  };

  WebhookClient.prototype._parseWebhookTest = function (response) {
    return {
      code: response.body.code,
      message: response.body.message
    };
  };

  WebhookClient.prototype.list = function (domain, query) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'webhooks'), query).then(this._parseWebhookList);
  };

  WebhookClient.prototype.get = function (domain, id) {
    return this.request.get((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id)).then(this._parseWebhookWithID(id));
  };

  WebhookClient.prototype.create = function (domain, id, url, test) {
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

  WebhookClient.prototype.update = function (domain, id, url) {
    return this.request.putWithFD((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id), {
      url: url
    }).then(this._parseWebhookWithID(id));
  };

  WebhookClient.prototype.destroy = function (domain, id) {
    return this.request.delete((0, url_join_1.default)('/v3/domains', domain, 'webhooks', id)).then(this._parseWebhookWithID(id));
  };

  return WebhookClient;
}();

exports["default"] = WebhookClient;

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

/***/ "./node_modules/ky-universal/browser.js":
/*!**********************************************!*\
  !*** ./node_modules/ky-universal/browser.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ ky__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var ky__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ky */ "./node_modules/ky/index.js");



/***/ }),

/***/ "./node_modules/ky/index.js":
/*!**********************************!*\
  !*** ./node_modules/ky/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*! MIT License © Sindre Sorhus */

const globals = {};

const getGlobal = property => {
	/* istanbul ignore next */
	if (typeof self !== 'undefined' && self && property in self) {
		return self;
	}

	/* istanbul ignore next */
	if (typeof window !== 'undefined' && window && property in window) {
		return window;
	}

	if (typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g && property in __webpack_require__.g) {
		return __webpack_require__.g;
	}

	/* istanbul ignore next */
	if (typeof globalThis !== 'undefined' && globalThis) {
		return globalThis;
	}
};

const globalProperties = [
	'Headers',
	'Request',
	'Response',
	'ReadableStream',
	'fetch',
	'AbortController',
	'FormData'
];

for (const property of globalProperties) {
	Object.defineProperty(globals, property, {
		get() {
			const globalObject = getGlobal(property);
			const value = globalObject && globalObject[property];
			return typeof value === 'function' ? value.bind(globalObject) : value;
		}
	});
}

const isObject = value => value !== null && typeof value === 'object';
const supportsAbortController = typeof globals.AbortController === 'function';
const supportsStreams = typeof globals.ReadableStream === 'function';
const supportsFormData = typeof globals.FormData === 'function';

const mergeHeaders = (source1, source2) => {
	const result = new globals.Headers(source1 || {});
	const isHeadersInstance = source2 instanceof globals.Headers;
	const source = new globals.Headers(source2 || {});

	for (const [key, value] of source) {
		if ((isHeadersInstance && value === 'undefined') || value === undefined) {
			result.delete(key);
		} else {
			result.set(key, value);
		}
	}

	return result;
};

const deepMerge = (...sources) => {
	let returnValue = {};
	let headers = {};

	for (const source of sources) {
		if (Array.isArray(source)) {
			if (!(Array.isArray(returnValue))) {
				returnValue = [];
			}

			returnValue = [...returnValue, ...source];
		} else if (isObject(source)) {
			for (let [key, value] of Object.entries(source)) {
				if (isObject(value) && (key in returnValue)) {
					value = deepMerge(returnValue[key], value);
				}

				returnValue = {...returnValue, [key]: value};
			}

			if (isObject(source.headers)) {
				headers = mergeHeaders(headers, source.headers);
			}
		}

		returnValue.headers = headers;
	}

	return returnValue;
};

const requestMethods = [
	'get',
	'post',
	'put',
	'patch',
	'head',
	'delete'
];

const responseTypes = {
	json: 'application/json',
	text: 'text/*',
	formData: 'multipart/form-data',
	arrayBuffer: '*/*',
	blob: '*/*'
};

const retryMethods = [
	'get',
	'put',
	'head',
	'delete',
	'options',
	'trace'
];

const retryStatusCodes = [
	408,
	413,
	429,
	500,
	502,
	503,
	504
];

const retryAfterStatusCodes = [
	413,
	429,
	503
];

const stop = Symbol('stop');

class HTTPError extends Error {
	constructor(response) {
		// Set the message to the status text, such as Unauthorized,
		// with some fallbacks. This message should never be undefined.
		super(
			response.statusText ||
			String(
				(response.status === 0 || response.status) ?
					response.status : 'Unknown response error'
			)
		);
		this.name = 'HTTPError';
		this.response = response;
	}
}

class TimeoutError extends Error {
	constructor(request) {
		super('Request timed out');
		this.name = 'TimeoutError';
		this.request = request;
	}
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// `Promise.race()` workaround (#91)
const timeout = (request, abortController, options) =>
	new Promise((resolve, reject) => {
		const timeoutID = setTimeout(() => {
			if (abortController) {
				abortController.abort();
			}

			reject(new TimeoutError(request));
		}, options.timeout);

		/* eslint-disable promise/prefer-await-to-then */
		options.fetch(request)
			.then(resolve)
			.catch(reject)
			.then(() => {
				clearTimeout(timeoutID);
			});
		/* eslint-enable promise/prefer-await-to-then */
	});

const normalizeRequestMethod = input => requestMethods.includes(input) ? input.toUpperCase() : input;

const defaultRetryOptions = {
	limit: 2,
	methods: retryMethods,
	statusCodes: retryStatusCodes,
	afterStatusCodes: retryAfterStatusCodes
};

const normalizeRetryOptions = (retry = {}) => {
	if (typeof retry === 'number') {
		return {
			...defaultRetryOptions,
			limit: retry
		};
	}

	if (retry.methods && !Array.isArray(retry.methods)) {
		throw new Error('retry.methods must be an array');
	}

	if (retry.statusCodes && !Array.isArray(retry.statusCodes)) {
		throw new Error('retry.statusCodes must be an array');
	}

	return {
		...defaultRetryOptions,
		...retry,
		afterStatusCodes: retryAfterStatusCodes
	};
};

// The maximum value of a 32bit int (see issue #117)
const maxSafeTimeout = 2147483647;

class Ky {
	constructor(input, options = {}) {
		this._retryCount = 0;
		this._input = input;
		this._options = {
			// TODO: credentials can be removed when the spec change is implemented in all browsers. Context: https://www.chromestatus.com/feature/4539473312350208
			credentials: this._input.credentials || 'same-origin',
			...options,
			headers: mergeHeaders(this._input.headers, options.headers),
			hooks: deepMerge({
				beforeRequest: [],
				beforeRetry: [],
				afterResponse: []
			}, options.hooks),
			method: normalizeRequestMethod(options.method || this._input.method),
			prefixUrl: String(options.prefixUrl || ''),
			retry: normalizeRetryOptions(options.retry),
			throwHttpErrors: options.throwHttpErrors !== false,
			timeout: typeof options.timeout === 'undefined' ? 10000 : options.timeout,
			fetch: options.fetch || globals.fetch
		};

		if (typeof this._input !== 'string' && !(this._input instanceof URL || this._input instanceof globals.Request)) {
			throw new TypeError('`input` must be a string, URL, or Request');
		}

		if (this._options.prefixUrl && typeof this._input === 'string') {
			if (this._input.startsWith('/')) {
				throw new Error('`input` must not begin with a slash when using `prefixUrl`');
			}

			if (!this._options.prefixUrl.endsWith('/')) {
				this._options.prefixUrl += '/';
			}

			this._input = this._options.prefixUrl + this._input;
		}

		if (supportsAbortController) {
			this.abortController = new globals.AbortController();
			if (this._options.signal) {
				this._options.signal.addEventListener('abort', () => {
					this.abortController.abort();
				});
			}

			this._options.signal = this.abortController.signal;
		}

		this.request = new globals.Request(this._input, this._options);

		if (this._options.searchParams) {
			const searchParams = '?' + new URLSearchParams(this._options.searchParams).toString();
			const url = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, searchParams);

			// To provide correct form boundary, Content-Type header should be deleted each time when new Request instantiated from another one
			if (((supportsFormData && this._options.body instanceof globals.FormData) || this._options.body instanceof URLSearchParams) && !(this._options.headers && this._options.headers['content-type'])) {
				this.request.headers.delete('content-type');
			}

			this.request = new globals.Request(new globals.Request(url, this.request), this._options);
		}

		if (this._options.json !== undefined) {
			this._options.body = JSON.stringify(this._options.json);
			this.request.headers.set('content-type', 'application/json');
			this.request = new globals.Request(this.request, {body: this._options.body});
		}

		const fn = async () => {
			if (this._options.timeout > maxSafeTimeout) {
				throw new RangeError(`The \`timeout\` option cannot be greater than ${maxSafeTimeout}`);
			}

			await delay(1);
			let response = await this._fetch();

			for (const hook of this._options.hooks.afterResponse) {
				// eslint-disable-next-line no-await-in-loop
				const modifiedResponse = await hook(
					this.request,
					this._options,
					this._decorateResponse(response.clone())
				);

				if (modifiedResponse instanceof globals.Response) {
					response = modifiedResponse;
				}
			}

			this._decorateResponse(response);

			if (!response.ok && this._options.throwHttpErrors) {
				throw new HTTPError(response);
			}

			// If `onDownloadProgress` is passed, it uses the stream API internally
			/* istanbul ignore next */
			if (this._options.onDownloadProgress) {
				if (typeof this._options.onDownloadProgress !== 'function') {
					throw new TypeError('The `onDownloadProgress` option must be a function');
				}

				if (!supportsStreams) {
					throw new Error('Streams are not supported in your environment. `ReadableStream` is missing.');
				}

				return this._stream(response.clone(), this._options.onDownloadProgress);
			}

			return response;
		};

		const isRetriableMethod = this._options.retry.methods.includes(this.request.method.toLowerCase());
		const result = isRetriableMethod ? this._retry(fn) : fn();

		for (const [type, mimeType] of Object.entries(responseTypes)) {
			result[type] = async () => {
				this.request.headers.set('accept', this.request.headers.get('accept') || mimeType);

				const response = (await result).clone();

				if (type === 'json') {
					if (response.status === 204) {
						return '';
					}

					if (options.parseJson) {
						return options.parseJson(await response.text());
					}
				}

				return response[type]();
			};
		}

		return result;
	}

	_calculateRetryDelay(error) {
		this._retryCount++;

		if (this._retryCount < this._options.retry.limit && !(error instanceof TimeoutError)) {
			if (error instanceof HTTPError) {
				if (!this._options.retry.statusCodes.includes(error.response.status)) {
					return 0;
				}

				const retryAfter = error.response.headers.get('Retry-After');
				if (retryAfter && this._options.retry.afterStatusCodes.includes(error.response.status)) {
					let after = Number(retryAfter);
					if (Number.isNaN(after)) {
						after = Date.parse(retryAfter) - Date.now();
					} else {
						after *= 1000;
					}

					if (typeof this._options.retry.maxRetryAfter !== 'undefined' && after > this._options.retry.maxRetryAfter) {
						return 0;
					}

					return after;
				}

				if (error.response.status === 413) {
					return 0;
				}
			}

			const BACKOFF_FACTOR = 0.3;
			return BACKOFF_FACTOR * (2 ** (this._retryCount - 1)) * 1000;
		}

		return 0;
	}

	_decorateResponse(response) {
		if (this._options.parseJson) {
			response.json = async () => {
				return this._options.parseJson(await response.text());
			};
		}

		return response;
	}

	async _retry(fn) {
		try {
			return await fn();
		} catch (error) {
			const ms = Math.min(this._calculateRetryDelay(error), maxSafeTimeout);
			if (ms !== 0 && this._retryCount > 0) {
				await delay(ms);

				for (const hook of this._options.hooks.beforeRetry) {
					// eslint-disable-next-line no-await-in-loop
					const hookResult = await hook({
						request: this.request,
						options: this._options,
						error,
						retryCount: this._retryCount
					});

					// If `stop` is returned from the hook, the retry process is stopped
					if (hookResult === stop) {
						return;
					}
				}

				return this._retry(fn);
			}

			if (this._options.throwHttpErrors) {
				throw error;
			}
		}
	}

	async _fetch() {
		for (const hook of this._options.hooks.beforeRequest) {
			// eslint-disable-next-line no-await-in-loop
			const result = await hook(this.request, this._options);

			if (result instanceof Request) {
				this.request = result;
				break;
			}

			if (result instanceof Response) {
				return result;
			}
		}

		if (this._options.timeout === false) {
			return this._options.fetch(this.request.clone());
		}

		return timeout(this.request.clone(), this.abortController, this._options);
	}

	/* istanbul ignore next */
	_stream(response, onDownloadProgress) {
		const totalBytes = Number(response.headers.get('content-length')) || 0;
		let transferredBytes = 0;

		return new globals.Response(
			new globals.ReadableStream({
				start(controller) {
					const reader = response.body.getReader();

					if (onDownloadProgress) {
						onDownloadProgress({percent: 0, transferredBytes: 0, totalBytes}, new Uint8Array());
					}

					async function read() {
						const {done, value} = await reader.read();
						if (done) {
							controller.close();
							return;
						}

						if (onDownloadProgress) {
							transferredBytes += value.byteLength;
							const percent = totalBytes === 0 ? 0 : transferredBytes / totalBytes;
							onDownloadProgress({percent, transferredBytes, totalBytes}, value);
						}

						controller.enqueue(value);
						read();
					}

					read();
				}
			})
		);
	}
}

const validateAndMerge = (...sources) => {
	for (const source of sources) {
		if ((!isObject(source) || Array.isArray(source)) && typeof source !== 'undefined') {
			throw new TypeError('The `options` argument must be an object');
		}
	}

	return deepMerge({}, ...sources);
};

const createInstance = defaults => {
	const ky = (input, options) => new Ky(input, validateAndMerge(defaults, options));

	for (const method of requestMethods) {
		ky[method] = (input, options) => new Ky(input, validateAndMerge(defaults, options, {method}));
	}

	ky.HTTPError = HTTPError;
	ky.TimeoutError = TimeoutError;
	ky.create = newDefaults => createInstance(validateAndMerge(newDefaults));
	ky.extend = newDefaults => createInstance(validateAndMerge(defaults, newDefaults));
	ky.stop = stop;

	return ky;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createInstance());


/***/ }),

/***/ "./node_modules/punycode/punycode.js":
/*!*******************************************!*\
  !*** ./node_modules/punycode/punycode.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));


/***/ }),

/***/ "./node_modules/querystring/decode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/decode.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};


/***/ }),

/***/ "./node_modules/querystring/encode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/encode.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};


/***/ }),

/***/ "./node_modules/querystring/index.js":
/*!*******************************************!*\
  !*** ./node_modules/querystring/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring/encode.js");


/***/ }),

/***/ "./node_modules/url-join/lib/url-join.js":
/*!***********************************************!*\
  !*** ./node_modules/url-join/lib/url-join.js ***!
  \***********************************************/
/***/ ((module) => {

function normalize (str) {
  return str
          .replace(/[\/]+/g, '/')
          .replace(/\/\?/g, '?')
          .replace(/\/\#/g, '#')
          .replace(/\:\//g, '://');
}

module.exports = function () {
  var joined = [].slice.call(arguments, 0).join('/');
  return normalize(joined);
};

/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/***/ ((module) => {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
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
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQSxpREFBaUQ7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLE9BQU87QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsT0FBTztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFFBQVE7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzdEJhOztBQUViO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1VFSkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9kb21haW5zLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvZG9tYWluc0NyZWRlbnRpYWxzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvZXJyb3IudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9pcC1wb29scy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2lwcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2xpc3RzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvbWFpbExpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvbWVzc2FnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9tdWx0aXBsZVZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9yZXF1ZXN0LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvcm91dGVzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvc3RhdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9zdXBwcmVzc2lvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi92YWxpZGF0ZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL3dlYmhvb2tzLnRzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9reS11bml2ZXJzYWwvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2t5L2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvcHVueWNvZGUvcHVueWNvZGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy9kZWNvZGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL3VybC1qb2luL2xpYi91cmwtam9pbi5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL3VybC91cmwuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy91cmwvdXRpbC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWFpbGd1bi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21haWxndW4vd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibWFpbGd1blwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJtYWlsZ3VuXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiaW1wb3J0IENsaWVudCBmcm9tICcuL2xpYi9jbGllbnQnO1xuaW1wb3J0IHsgSW5wdXRGb3JtRGF0YSB9IGZyb20gJy4vbGliL2ludGVyZmFjZXMvSUZvcm1EYXRhJztcbmltcG9ydCBPcHRpb25zIGZyb20gJy4vbGliL2ludGVyZmFjZXMvT3B0aW9ucyc7XG5cbmNsYXNzIE1haWxndW4ge1xuICBwcml2YXRlIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhXG5cbiAgY29uc3RydWN0b3IoRm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLmZvcm1EYXRhID0gRm9ybURhdGE7XG4gIH1cblxuICBjbGllbnQob3B0aW9uczogT3B0aW9ucykgOiBDbGllbnQge1xuICAgIHJldHVybiBuZXcgQ2xpZW50KG9wdGlvbnMsIHRoaXMuZm9ybURhdGEpO1xuICB9XG59XG5cbmV4cG9ydCA9IE1haWxndW47XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvT3B0aW9ucyc7XG5pbXBvcnQgUmVxdWVzdE9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL1JlcXVlc3RPcHRpb25zJztcblxuaW1wb3J0IERvbWFpbkNsaWVudCBmcm9tICcuL2RvbWFpbnMnO1xuaW1wb3J0IEV2ZW50Q2xpZW50IGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCBTdGF0c0NsaWVudCBmcm9tICcuL3N0YXRzJztcbmltcG9ydCBTdXBwcmVzc2lvbkNsaWVudCBmcm9tICcuL3N1cHByZXNzaW9ucyc7XG5pbXBvcnQgV2ViaG9va0NsaWVudCBmcm9tICcuL3dlYmhvb2tzJztcbmltcG9ydCBNZXNzYWdlc0NsaWVudCBmcm9tICcuL21lc3NhZ2VzJztcbmltcG9ydCBSb3V0ZXNDbGllbnQgZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IFZhbGlkYXRlQ2xpZW50IGZyb20gJy4vdmFsaWRhdGUnO1xuaW1wb3J0IElwc0NsaWVudCBmcm9tICcuL2lwcyc7XG5pbXBvcnQgSXBQb29sc0NsaWVudCBmcm9tICcuL2lwLXBvb2xzJztcbmltcG9ydCBMaXN0c0NsaWVudCBmcm9tICcuL2xpc3RzJztcbmltcG9ydCBNYWlsTGlzdHNNZW1iZXJzIGZyb20gJy4vbWFpbExpc3RNZW1iZXJzJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvSUZvcm1EYXRhJztcbmltcG9ydCBEb21haW5DcmVkZW50aWFsc0NsaWVudCBmcm9tICcuL2RvbWFpbnNDcmVkZW50aWFscyc7XG5pbXBvcnQgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGZyb20gJy4vbXVsdGlwbGVWYWxpZGF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpZW50IHtcbiAgcHJpdmF0ZSByZXF1ZXN0O1xuXG4gIHB1YmxpYyBkb21haW5zO1xuICBwdWJsaWMgd2ViaG9va3M7XG4gIHB1YmxpYyBldmVudHM7XG4gIHB1YmxpYyBzdGF0cztcbiAgcHVibGljIHN1cHByZXNzaW9ucztcbiAgcHVibGljIG1lc3NhZ2VzO1xuICBwdWJsaWMgcm91dGVzO1xuICBwdWJsaWMgdmFsaWRhdGU7XG4gIHB1YmxpYyBpcHM7XG4gIHB1YmxpYyBpcF9wb29scztcbiAgcHVibGljIGxpc3RzO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgY29uc3QgY29uZmlnOiBSZXF1ZXN0T3B0aW9ucyA9IHsgLi4ub3B0aW9ucyB9IGFzIFJlcXVlc3RPcHRpb25zO1xuXG4gICAgaWYgKCFjb25maWcudXJsKSB7XG4gICAgICBjb25maWcudXJsID0gJ2h0dHBzOi8vYXBpLm1haWxndW4ubmV0JztcbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy51c2VybmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJ1c2VybmFtZVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcua2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlciBcImtleVwiIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHRoaXMucmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGNvbmZpZywgZm9ybURhdGEpO1xuICAgIGNvbnN0IG1haWxMaXN0c01lbWJlcnMgPSBuZXcgTWFpbExpc3RzTWVtYmVycyh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50ID0gbmV3IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50KHRoaXMucmVxdWVzdCk7XG4gICAgY29uc3QgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50ID0gbmV3IE11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuXG4gICAgdGhpcy5kb21haW5zID0gbmV3IERvbWFpbkNsaWVudCh0aGlzLnJlcXVlc3QsIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50KTtcbiAgICB0aGlzLndlYmhvb2tzID0gbmV3IFdlYmhvb2tDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudENsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnN1cHByZXNzaW9ucyA9IG5ldyBTdXBwcmVzc2lvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMubWVzc2FnZXMgPSBuZXcgTWVzc2FnZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnJvdXRlcyA9IG5ldyBSb3V0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmlwcyA9IG5ldyBJcHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmlwX3Bvb2xzID0gbmV3IElwUG9vbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmxpc3RzID0gbmV3IExpc3RzQ2xpZW50KHRoaXMucmVxdWVzdCwgbWFpbExpc3RzTWVtYmVycyk7XG4gICAgdGhpcy52YWxpZGF0ZSA9IG5ldyBWYWxpZGF0ZUNsaWVudCh0aGlzLnJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHtcbiAgRG9tYWluUmVzcG9uc2VEYXRhLFxuICBEZXN0cm95ZWREb21haW5SZXNwb25zZSxcbiAgRG9tYWluc1F1ZXJ5LFxuICBEb21haW5JbmZvLFxuICBEb21haW5MaXN0UmVzcG9uc2VEYXRhLFxuICBEb21haW5TaG9ydERhdGEsXG4gIEROU1JlY29yZCxcbiAgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UsXG4gIENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcyxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlLFxuICBES0lNU2VsZWN0b3JJbmZvLFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFdlYlByZWZpeEluZm8sXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgUmVwbGFjZW1lbnRGb3JQb29sLFxuICBNZXNzYWdlUmVzcG9uc2UsXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5zJztcblxuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgRG9tYWluVHJhY2tpbmdSZXNwb25zZSxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIFVwZGF0ZWRPcGVuVHJhY2tpbmdcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRyYWNraW5nJztcbmltcG9ydCBEb21haW5DcmVkZW50aWFsc0NsaWVudCBmcm9tICcuL2RvbWFpbnNDcmVkZW50aWFscyc7XG5cbmV4cG9ydCBjbGFzcyBEb21haW4ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlcXVpcmVfdGxzOiBib29sZWFuO1xuICBza2lwX3ZlcmlmaWNhdGlvbjogYm9vbGVhbjtcbiAgc3RhdGU6IHN0cmluZztcbiAgd2lsZGNhcmQ6IGJvb2xlYW47XG4gIHNwYW1fYWN0aW9uOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZztcbiAgc210cF9wYXNzd29yZDogc3RyaW5nO1xuICBzbXRwX2xvZ2luOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgcmVjZWl2aW5nX2Ruc19yZWNvcmRzOiBETlNSZWNvcmRbXSB8IG51bGw7XG4gIHNlbmRpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBEb21haW5TaG9ydERhdGEsIHJlY2VpdmluZz86IEROU1JlY29yZFtdIHwgbnVsbCwgc2VuZGluZz86IEROU1JlY29yZFtdIHwgbnVsbCkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICB0aGlzLnJlcXVpcmVfdGxzID0gZGF0YS5yZXF1aXJlX3RscztcbiAgICB0aGlzLnNraXBfdmVyaWZpY2F0aW9uID0gZGF0YS5za2lwX3ZlcmlmaWNhdGlvbjtcbiAgICB0aGlzLnN0YXRlID0gZGF0YS5zdGF0ZTtcbiAgICB0aGlzLndpbGRjYXJkID0gZGF0YS53aWxkY2FyZDtcbiAgICB0aGlzLnNwYW1fYWN0aW9uID0gZGF0YS5zcGFtX2FjdGlvbjtcbiAgICB0aGlzLmNyZWF0ZWRfYXQgPSBkYXRhLmNyZWF0ZWRfYXQ7XG4gICAgdGhpcy5zbXRwX3Bhc3N3b3JkID0gZGF0YS5zbXRwX3Bhc3N3b3JkO1xuICAgIHRoaXMuc210cF9sb2dpbiA9IGRhdGEuc210cF9sb2dpbjtcbiAgICB0aGlzLnR5cGUgPSBkYXRhLnR5cGU7XG5cbiAgICB0aGlzLnJlY2VpdmluZ19kbnNfcmVjb3JkcyA9IHJlY2VpdmluZyB8fCBudWxsO1xuICAgIHRoaXMuc2VuZGluZ19kbnNfcmVjb3JkcyA9IHNlbmRpbmcgfHwgbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5DbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwdWJsaWMgZG9tYWluQ3JlZGVudGlhbHM6IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50OiBEb21haW5DcmVkZW50aWFsc0NsaWVudCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5kb21haW5DcmVkZW50aWFscyA9IGRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlKHJlc3BvbnNlOiBEZXN0cm95ZWREb21haW5SZXNwb25zZSkgOiBNZXNzYWdlUmVzcG9uc2Uge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW5MaXN0KHJlc3BvbnNlOiBEb21haW5MaXN0UmVzcG9uc2VEYXRhKTogRG9tYWluW10ge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIG5ldyBEb21haW4oaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURvbWFpbihyZXNwb25zZTogRG9tYWluUmVzcG9uc2VEYXRhKTogRG9tYWluIHtcbiAgICByZXR1cm4gbmV3IERvbWFpbihcbiAgICAgIHJlc3BvbnNlLmJvZHkuZG9tYWluLFxuICAgICAgcmVzcG9uc2UuYm9keS5yZWNlaXZpbmdfZG5zX3JlY29yZHMsXG4gICAgICByZXNwb25zZS5ib2R5LnNlbmRpbmdfZG5zX3JlY29yZHNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1NldHRpbmdzKHJlc3BvbnNlOiBEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6IERvbWFpblRyYWNraW5nRGF0YSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkudHJhY2tpbmc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRyYWNraW5nVXBkYXRlKHJlc3BvbnNlOiBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6VXBkYXRlZE9wZW5UcmFja2luZyB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogRG9tYWluc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5bXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvZG9tYWlucycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkxpc3QocmVzIGFzIERvbWFpbkxpc3RSZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogRG9tYWluSW5mbykgOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIGNvbnN0IHBvc3RPYmogPSB7IC4uLmRhdGEgfTtcbiAgICBpZiAoJ2ZvcmNlX2RraW1fYXV0aG9yaXR5JyBpbiBwb3N0T2JqICYmIHR5cGVvZiBwb3N0T2JqLmZvcmNlX2RraW1fYXV0aG9yaXR5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHBvc3RPYmouZm9yY2VfZGtpbV9hdXRob3JpdHkgPSBwb3N0T2JqLnRvU3RyaW5nKCkgPT09ICd0cnVlJyA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvZG9tYWlucycsIHBvc3RPYmopXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2UocmVzIGFzIERlc3Ryb3llZERvbWFpblJlc3BvbnNlKSk7XG4gIH1cblxuICBnZXRDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxDb25uZWN0aW9uU2V0dGluZ3M+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL2RvbWFpbnMvJHtkb21haW59L2Nvbm5lY3Rpb25gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UpXG4gICAgICAudGhlbigocmVzOkNvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlKSA9PiByZXMuYm9keS5jb25uZWN0aW9uIGFzIENvbm5lY3Rpb25TZXR0aW5ncyk7XG4gIH1cblxuICB1cGRhdGVDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBDb25uZWN0aW9uU2V0dGluZ3MpOiBQcm9taXNlPFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3M+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2Nvbm5lY3Rpb25gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcylcbiAgICAgIC50aGVuKChyZXM6VXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcykgPT4gcmVzLmJvZHkgYXMgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyk7XG4gIH1cblxuICAvLyBUcmFja2luZ1xuXG4gIGdldFRyYWNraW5nKGRvbWFpbjogc3RyaW5nKSA6IFByb21pc2U8RG9tYWluVHJhY2tpbmdEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VUcmFja2luZ1NldHRpbmdzKTtcbiAgfVxuXG4gIHVwZGF0ZVRyYWNraW5nKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBPcGVuVHJhY2tpbmdJbmZvIHwgQ2xpY2tUcmFja2luZ0luZm8gfCBVbnN1YnNjcmliZVRyYWNraW5nSW5mb1xuICApOiBQcm9taXNlPFVwZGF0ZWRPcGVuVHJhY2tpbmc+IHtcbiAgICBpZiAodHlwZW9mIGRhdGE/LmFjdGl2ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3IoeyBzdGF0dXM6IDQwMCwgc3RhdHVzVGV4dDogJycsIGJvZHk6IHsgbWVzc2FnZTogJ1Byb3BlcnR5IFwiYWN0aXZlXCIgbXVzdCBjb250YWluIHN0cmluZyB2YWx1ZS4nIH0gfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJywgdHlwZSksIGRhdGEpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlVHJhY2tpbmdVcGRhdGUocmVzIGFzIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UpKTtcbiAgfVxuXG4gIC8vIElQc1xuXG4gIGdldElwcyhkb21haW46IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBBUElSZXNwb25zZSkgPT4gcmVzcG9uc2U/LmJvZHk/Lml0ZW1zKTtcbiAgfVxuXG4gIGFzc2lnbklwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IGlwIH0pO1xuICB9XG5cbiAgZGVsZXRlSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCBpcCkpO1xuICB9XG5cbiAgbGlua0lwUG9vbChkb21haW46IHN0cmluZywgcG9vbF9pZDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IHBvb2xfaWQgfSk7XG4gIH1cblxuICB1bmxpbmtJcFBvbGwoZG9tYWluOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBSZXBsYWNlbWVudEZvclBvb2wpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9ICcnO1xuICAgIGlmIChyZXBsYWNlbWVudC5wb29sX2lkICYmIHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3IoeyBzdGF0dXM6IDQwMCwgc3RhdHVzVGV4dDogJycsIGJvZHk6IHsgbWVzc2FnZTogJ1BsZWFzZSBzcGVjaWZ5IGVpdGhlciBwb29sX2lkIG9yIGlwIChub3QgYm90aCknIH0gfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gYD9wb29sX2lkPSR7cmVwbGFjZW1lbnQucG9vbF9pZH1gO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/aXA9JHtyZXBsYWNlbWVudC5pcH1gO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsICdpcF9wb29sJywgc2VhcmNoUGFyYW1zKSk7XG4gIH1cblxuICB1cGRhdGVES0lNQXV0aG9yaXR5KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNQXV0aG9yaXR5SW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1BdXRob3JpdHk+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2RraW1fYXV0aG9yaXR5YCwge30sIHsgcXVlcnk6IGBzZWxmPSR7ZGF0YS5zZWxmfWAgfSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzKVxuICAgICAgLnRoZW4oKHJlcyA6IFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5KTtcbiAgfVxuXG4gIHVwZGF0ZURLSU1TZWxlY3Rvcihkb21haW46IHN0cmluZywgZGF0YTogREtJTVNlbGVjdG9ySW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX3NlbGVjdG9yYCwge30sIHsgcXVlcnk6IGBka2ltX3NlbGVjdG9yPSR7ZGF0YS5ka2ltU2VsZWN0b3J9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZVdlYlByZWZpeChkb21haW46IHN0cmluZywgZGF0YTogV2ViUHJlZml4SW5mbyk6IFByb21pc2U8VXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS93ZWJfcHJlZml4YCwge30sIHsgcXVlcnk6IGB3ZWJfcHJlZml4PSR7ZGF0YS53ZWJQcmVmaXh9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UsXG4gIERlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlLFxuICBEb21haW5DcmVkZW50aWFscyxcbiAgRG9tYWluQ3JlZGVudGlhbHNMaXN0LFxuICBEb21haW5DcmVkZW50aWFsc1F1ZXJ5LFxuICBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSxcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQsXG4gIElEb21haW5DcmVkZW50aWFscyxcbiAgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5DcmVkZW50aWFscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGltcGxlbWVudHMgSURvbWFpbkNyZWRlbnRpYWxzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2RvbWFpbnMvJztcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KFxuICAgIHJlc3BvbnNlOiBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YVxuICApOiBEb21haW5DcmVkZW50aWFsc0xpc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHRvdGFsQ291bnQ6IHJlc3BvbnNlLmJvZHkudG90YWxfY291bnRcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6IENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURlbGV0ZWRSZXNwb25zZShcbiAgICByZXNwb25zZTpEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICBzcGVjOiByZXNwb25zZS5ib2R5LnNwZWNcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluQ3JlZGVudGlhbHNRdWVyeSk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL2NyZWRlbnRpYWxzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChyZXMgYXMgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpbkNyZWRlbnRpYWxzXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmcsXG4gICAgZGF0YTogVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzLyR7Y3JlZGVudGlhbHNMb2dpbn1gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRGVsZXRlZFJlc3BvbnNlKHJlcykpO1xuICB9XG59XG4iLCJpbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUElFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgc3RhdHVzOiBudW1iZXIgfCBzdHJpbmc7XG4gIHN0YWNrOiBzdHJpbmc7XG4gIGRldGFpbHM6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgc3RhdHVzLFxuICAgIHN0YXR1c1RleHQsXG4gICAgbWVzc2FnZSxcbiAgICBib2R5ID0ge31cbiAgfTogQVBJRXJyb3JPcHRpb25zKSB7XG4gICAgY29uc3QgeyBtZXNzYWdlOiBib2R5TWVzc2FnZSwgZXJyb3IgfSA9IGJvZHk7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IGVycm9yIHx8IHN0YXR1c1RleHQ7XG4gICAgdGhpcy5kZXRhaWxzID0gYm9keU1lc3NhZ2U7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7XG4gIEV2ZW50c0xpc3QsIEV2ZW50c1BhZ2UsIEV2ZW50c1Jlc3BvbnNlLCBQYWdlc0xpc3QsIFBhZ2VzTGlzdEFjY3VtdWxhdG9yLCBQYXJzZWRQYWdlc0xpc3Rcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0V2ZW50cyc7XG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50Q2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIF9wYXJzZVBhZ2VOdW1iZXIodXJsOiBzdHJpbmcpIDogc3RyaW5nIHtcbiAgICByZXR1cm4gdXJsLnNwbGl0KCcvJykucG9wKCk7XG4gIH1cblxuICBfcGFyc2VQYWdlKGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKSA6IEV2ZW50c1BhZ2Uge1xuICAgIHJldHVybiB7IGlkLCBudW1iZXI6IHRoaXMuX3BhcnNlUGFnZU51bWJlcih1cmwpLCB1cmwgfTtcbiAgfVxuXG4gIF9wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZTogRXZlbnRzUmVzcG9uc2UpIDogUGFyc2VkUGFnZXNMaXN0IHtcbiAgICBjb25zdCBwYWdlcyA9IE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlLmJvZHkucGFnaW5nIGFzIFBhZ2VzTGlzdCk7XG4gICAgcmV0dXJuIHBhZ2VzLnJlZHVjZShcbiAgICAgIChhY2M6IFBhZ2VzTGlzdEFjY3VtdWxhdG9yLCBlbnRyaWU6IFt1cmw6IHN0cmluZywgaWQ6IHN0cmluZ10pID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBlbnRyaWVbMF07XG4gICAgICAgIGNvbnN0IHVybCA9IGVudHJpZVsxXTtcbiAgICAgICAgYWNjW2lkXSA9IHRoaXMuX3BhcnNlUGFnZShpZCwgdXJsKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9XG4gICAgKSBhcyB1bmtub3duIGFzIFBhcnNlZFBhZ2VzTGlzdDtcbiAgfVxuXG4gIF9wYXJzZUV2ZW50TGlzdChyZXNwb25zZTogRXZlbnRzUmVzcG9uc2UpIDogRXZlbnRzTGlzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLFxuICAgICAgcGFnZXM6IHRoaXMuX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlKVxuICAgIH07XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogeyBwYWdlOiBzdHJpbmcgfSkgOiBQcm9taXNlPEV2ZW50c0xpc3Q+IHtcbiAgICBsZXQgdXJsO1xuICAgIGNvbnN0IHF1ZXJ5Q29weSA9IHsgLi4ucXVlcnkgfTtcbiAgICBpZiAocXVlcnlDb3B5ICYmIHF1ZXJ5Q29weS5wYWdlKSB7XG4gICAgICB1cmwgPSB1cmxqb2luKCcvdjMnLCBkb21haW4sICdldmVudHMnLCBxdWVyeUNvcHkucGFnZSk7XG4gICAgICBkZWxldGUgcXVlcnlDb3B5LnBhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ2V2ZW50cycpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmwsIHF1ZXJ5Q29weSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogRXZlbnRzUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRXZlbnRMaXN0KHJlc3BvbnNlKSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuaW1wb3J0IHsgSXBQb29sLCBJcFBvb2xMaXN0UmVzcG9uc2UsIElwUG9vbFVwZGF0ZURhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvSXBQb29scyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElwUG9vbHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeTogYW55KTogUHJvbWlzZTxJcFBvb2xbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjEvaXBfcG9vbHMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogSXBQb29sTGlzdFJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlSXBQb29sc1Jlc3BvbnNlKHJlc3BvbnNlKSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogeyBuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uPzogc3RyaW5nLCBpcHM/OiBzdHJpbmdbXSB9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0KCcvdjEvaXBfcG9vbHMnLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7IGJvZHk6IHsgbWVzc2FnZTogc3RyaW5nLCBwb29sX2lkOiBzdHJpbmcgfSB9KSA9PiByZXNwb25zZT8uYm9keSk7XG4gIH1cblxuICB1cGRhdGUocG9vbElkOiBzdHJpbmcsIGRhdGE6IElwUG9vbFVwZGF0ZURhdGEpIDogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBhdGNoKGAvdjEvaXBfcG9vbHMvJHtwb29sSWR9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogeyBib2R5OiBhbnkgfSkgPT4gcmVzcG9uc2U/LmJvZHkpO1xuICB9XG5cbiAgZGVsZXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiB7IGlkOiBzdHJpbmcsIHBvb2xfaWQ6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7IGJvZHk6IGFueSB9KSA9PiByZXNwb25zZT8uYm9keSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlSXBQb29sc1Jlc3BvbnNlKHJlc3BvbnNlOiB7IGJvZHk6IGFueSB8IGFueSB9KSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkuaXBfcG9vbHM7XG4gIH1cbn1cbiIsImltcG9ydCBNZ1JlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7IElwRGF0YSwgSXBzTGlzdFJlc3BvbnNlQm9keSB9IGZyb20gJy4vaW50ZXJmYWNlcy9JcHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcHNDbGllbnQge1xuICByZXF1ZXN0OiBNZ1JlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogTWdSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QocXVlcnk6IGFueSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvaXBzJywgcXVlcnkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IHsgYm9keTogSXBzTGlzdFJlc3BvbnNlQm9keSB9KSA9PiB0aGlzLnBhcnNlSXBzUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgfVxuXG4gIGdldChpcDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92My9pcHMvJHtpcH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7IGJvZHk6IElwRGF0YSB9KSA9PiB0aGlzLnBhcnNlSXBzUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJcHNSZXNwb25zZShyZXNwb25zZTogeyBib2R5OiBJcHNMaXN0UmVzcG9uc2VCb2R5IHwgSXBEYXRhIH0pIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7XG4gIExpc3RzUXVlcnksXG4gIENyZWF0ZVVwZGF0ZUxpc3QsXG4gIERlc3Ryb3llZExpc3QsXG4gIE1haWxpbmdMaXN0XG59IGZyb20gJy4vaW50ZXJmYWNlcy9saXN0cyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4vaW50ZXJmYWNlcy9tYWlsTGlzdE1lbWJlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0c0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBtZW1iZXJzOiBJTWFpbExpc3RzTWVtYmVycztcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBtZW1iZXJzOklNYWlsTGlzdHNNZW1iZXJzKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgIHRoaXMubWVtYmVycyA9IG1lbWJlcnM7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogTGlzdHNRdWVyeSk6IFByb21pc2U8TWFpbGluZ0xpc3RbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS9wYWdlc2AsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lml0ZW1zIGFzIE1haWxpbmdMaXN0W10pO1xuICB9XG5cbiAgZ2V0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHRoaXMuYmFzZVJvdXRlLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgdXBkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgZGVzdHJveShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8RGVzdHJveWVkTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIERlc3Ryb3llZExpc3QpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgTWFpbExpc3RNZW1iZXJzUXVlcnksXG4gIElNYWlsTGlzdHNNZW1iZXJzLFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMsXG4gIE1haWxMaXN0TWVtYmVyLFxuICBNdWx0aXBsZU1lbWJlcnNEYXRhLFxuICBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhLFxuICBEZWxldGVkTWVtYmVyLFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXEsXG4gIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlXG59IGZyb20gJy4vaW50ZXJmYWNlcy9tYWlsTGlzdE1lbWJlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsTGlzdHNNZW1iZXJzIGltcGxlbWVudHMgSU1haWxMaXN0c01lbWJlcnMge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0FuZFVwZGF0ZURhdGEoZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzKSB7XG4gICAgY29uc3QgbmV3RGF0YSA9IHsgLi4uZGF0YSB9O1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhLnZhcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBuZXdEYXRhLnZhcnMgPSBKU09OLnN0cmluZ2lmeShuZXdEYXRhLnZhcnMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YS5zdWJzY3JpYmVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIG5ld0RhdGEuc3Vic2NyaWJlZCA9IGRhdGEuc3Vic2NyaWJlZCA/ICd5ZXMnIDogJ25vJztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RGF0YSBhcyBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXE7XG4gIH1cblxuICBsaXN0TWVtYmVycyhtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgcXVlcnk/OiBNYWlsTGlzdE1lbWJlcnNRdWVyeSk6IFByb21pc2U8TWFpbExpc3RNZW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy9wYWdlc2AsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lml0ZW1zIGFzIE1haWxMaXN0TWVtYmVyW10pO1xuICB9XG5cbiAgZ2V0TWVtYmVyKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgY3JlYXRlTWVtYmVyKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1xuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgY29uc3QgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnNgLCByZXFEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBjcmVhdGVNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlTWVtYmVyc0RhdGFcbiAgKTogUHJvbWlzZTxOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZT4ge1xuICAgIGNvbnN0IG5ld0RhdGE6IE11bHRpcGxlTWVtYmVyc1JlcURhdGEgPSB7XG4gICAgICBtZW1iZXJzOiBBcnJheS5pc0FycmF5KGRhdGEubWVtYmVycykgPyBKU09OLnN0cmluZ2lmeShkYXRhLm1lbWJlcnMpIDogZGF0YS5tZW1iZXJzLFxuICAgICAgdXBzZXJ0OiBkYXRhLnVwc2VydFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLmpzb25gLCBuZXdEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YCwgcmVxRGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgZGVzdHJveU1lbWJlcihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcpIDogUHJvbWlzZTxEZWxldGVkTWVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgRGVsZXRlZE1lbWJlcik7XG4gIH1cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIF9wYXJzZVJlc3BvbnNlKHJlc3BvbnNlOiB7IGJvZHk6IGFueSB9KSB7XG4gICAgaWYgKHJlc3BvbnNlLmJvZHkpIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzLm1pbWVgLCBkYXRhKVxuICAgICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92My8ke2RvbWFpbn0vbWVzc2FnZXNgLCBkYXRhKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0XG59XG4gIGZyb20gJy4vaW50ZXJmYWNlcy9NdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGltcGxlbWVudHMgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KCk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsaycpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQpO1xuICB9XG5cbiAgZ2V0KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZShsaXN0SWQ6IHN0cmluZywgZmlsZTogYW55KTogUHJvbWlzZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWAsIGZpbGUpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8Q2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCBiYXNlNjQgZnJvbSAnYmFzZS02NCc7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQga3kgZnJvbSAna3ktdW5pdmVyc2FsJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL2Vycm9yJztcbmltcG9ydCBSZXF1ZXN0T3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvUmVxdWVzdE9wdGlvbnMnO1xuaW1wb3J0IEFQSUVycm9yT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvQVBJRXJyb3JPcHRpb25zJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvSUZvcm1EYXRhJztcbmltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuXG5jb25zdCBpc1N0cmVhbSA9IChhdHRhY2htZW50OiBhbnkpID0+IHR5cGVvZiBhdHRhY2htZW50ID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYXR0YWNobWVudC5waXBlID09PSAnZnVuY3Rpb24nO1xuXG5mdW5jdGlvbiBpc05vZGVGb3JtRGF0YShmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSlcbiAgOiBmb3JtRGF0YUluc3RhbmNlIGlzIE5vZGVGb3JtRGF0YSB7XG4gIHJldHVybiAoPE5vZGVGb3JtRGF0YT5mb3JtRGF0YUluc3RhbmNlKS5nZXRIZWFkZXJzICE9PSB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IGdldEF0dGFjaG1lbnRPcHRpb25zID0gKGl0ZW06IGFueSk6IHtcbiAgZmlsZW5hbWU/OiBzdHJpbmcsXG4gIGNvbnRlbnRUeXBlPzogc3RyaW5nLFxuICBrbm93bkxlbmd0aD86IG51bWJlclxufSA9PiB7XG4gIGlmICh0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcgfHwgaXNTdHJlYW0oaXRlbSkpIHJldHVybiB7fTtcblxuICBjb25zdCB7XG4gICAgZmlsZW5hbWUsXG4gICAgY29udGVudFR5cGUsXG4gICAga25vd25MZW5ndGhcbiAgfSA9IGl0ZW07XG5cbiAgcmV0dXJuIHtcbiAgICAuLi4oZmlsZW5hbWUgPyB7IGZpbGVuYW1lIH0gOiB7IGZpbGVuYW1lOiAnZmlsZScgfSksXG4gICAgLi4uKGNvbnRlbnRUeXBlICYmIHsgY29udGVudFR5cGUgfSksXG4gICAgLi4uKGtub3duTGVuZ3RoICYmIHsga25vd25MZW5ndGggfSlcbiAgfTtcbn07XG5cbmNvbnN0IHN0cmVhbVRvU3RyaW5nID0gKHN0cmVhbTogYW55KSA9PiB7XG4gIGNvbnN0IGNodW5rczogYW55ID0gW107XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc3RyZWFtLm9uKCdkYXRhJywgKGNodW5rOiBhbnkpID0+IGNodW5rcy5wdXNoKGNodW5rKSk7XG4gICAgc3RyZWFtLm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgc3RyZWFtLm9uKCdlbmQnLCAoKSA9PiByZXNvbHZlKEJ1ZmZlci5jb25jYXQoY2h1bmtzKS50b1N0cmluZygndXRmOCcpKSk7XG4gIH0pO1xufTtcblxuY2xhc3MgUmVxdWVzdCB7XG4gIHByaXZhdGUgdXNlcm5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBrZXk6IHN0cmluZztcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZztcbiAgcHJpdmF0ZSB0aW1lb3V0OiBudW1iZXI7XG4gIHByaXZhdGUgaGVhZGVyczogYW55O1xuICBwcml2YXRlIEZvcm1EYXRhQ29uc3RydWN0b3I6IElucHV0Rm9ybURhdGE7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogUmVxdWVzdE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy51c2VybmFtZSA9IG9wdGlvbnMudXNlcm5hbWU7XG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIGFzIHN0cmluZztcbiAgICB0aGlzLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XG4gICAgdGhpcy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICAgIHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvciA9IGZvcm1EYXRhO1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdChtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIGlucHV0T3B0aW9ucz86IGFueSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBvcHRpb25zID0geyAuLi5pbnB1dE9wdGlvbnMgfTtcbiAgICBjb25zdCBiYXNpYyA9IGJhc2U2NC5lbmNvZGUoYCR7dGhpcy51c2VybmFtZX06JHt0aGlzLmtleX1gKTtcbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7YmFzaWN9YCxcbiAgICAgIC4uLnRoaXMuaGVhZGVycyxcbiAgICAgIC4uLm9wdGlvbnM/LmhlYWRlcnNcbiAgICB9O1xuXG4gICAgZGVsZXRlIG9wdGlvbnM/LmhlYWRlcnM7XG5cbiAgICBpZiAoIWhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSB7XG4gICAgICAvLyBmb3IgZm9ybS1kYXRhIGl0IHdpbGwgYmUgTnVsbCBzbyB3ZSBuZWVkIHRvIHJlbW92ZSBpdFxuICAgICAgZGVsZXRlIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4ub3B0aW9ucyB9O1xuXG4gICAgaWYgKG9wdGlvbnM/LnF1ZXJ5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9wdGlvbnM/LnF1ZXJ5KS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJhbXMuc2VhcmNoUGFyYW1zID0gb3B0aW9ucy5xdWVyeTtcbiAgICAgIGRlbGV0ZSBwYXJhbXMucXVlcnk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCd1cmwgLS0tPicsIHVybGpvaW4odGhpcy51cmwsIHVybCkpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQga3koXG4gICAgICB1cmxqb2luKHRoaXMudXJsLCB1cmwpLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZC50b0xvY2FsZVVwcGVyQ2FzZSgpLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICB0aHJvd0h0dHBFcnJvcnM6IGZhbHNlLFxuICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgIC4uLnBhcmFtc1xuICAgICAgfVxuICAgICk7XG5cbiAgICBpZiAoIXJlc3BvbnNlPy5vaykge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHJlc3BvbnNlPy5ib2R5ICYmIGlzU3RyZWFtKHJlc3BvbnNlLmJvZHkpXG4gICAgICAgID8gYXdhaXQgc3RyZWFtVG9TdHJpbmcocmVzcG9uc2UuYm9keSlcbiAgICAgICAgOiBhd2FpdCByZXNwb25zZT8uanNvbigpO1xuXG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlPy5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlPy5zdGF0dXNUZXh0LFxuICAgICAgICBib2R5OiB7IG1lc3NhZ2UgfVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcyA9IHtcbiAgICAgIGJvZHk6IGF3YWl0IHJlc3BvbnNlPy5qc29uKCksXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlPy5zdGF0dXNcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHF1ZXJ5KG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgcXVlcnk6IGFueSwgb3B0aW9ucz86IGFueSkgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgeyBxdWVyeSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIGNvbW1hbmQobWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBkYXRhOiBhbnksIG9wdGlvbnM/OiBhbnkpIDogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH0sXG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0KHVybDogc3RyaW5nLCBxdWVyeT86IGFueSwgb3B0aW9ucz86IGFueSkgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkoJ2dldCcsIHVybCwgcXVlcnksIG9wdGlvbnMpO1xuICB9XG5cbiAgaGVhZCh1cmw6IHN0cmluZywgcXVlcnk6IGFueSwgb3B0aW9uczogYW55KSA6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeSgnaGVhZCcsIHVybCwgcXVlcnksIG9wdGlvbnMpO1xuICB9XG5cbiAgb3B0aW9ucyh1cmw6IHN0cmluZywgcXVlcnk6IGFueSwgb3B0aW9uczogYW55KSA6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeSgnb3B0aW9ucycsIHVybCwgcXVlcnksIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdCh1cmw6IHN0cmluZywgZGF0YTogYW55LCBvcHRpb25zPzogYW55KSA6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3RXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgZGF0YSBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiBudWxsIH1cbiAgICB9O1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBmb3JtRGF0YSwgcGFyYW1zKTtcbiAgfVxuXG4gIHB1dFdpdGhGRCh1cmw6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBkYXRhIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6IG51bGwgfVxuICAgIH07XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZm9ybURhdGEsIHBhcmFtcyk7XG4gIH1cblxuICBjcmVhdGVGb3JtRGF0YShkYXRhOiBhbnkpOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSB7XG4gICAgY29uc3QgZm9ybURhdGE6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZGF0YVtrZXldOyB9KVxuICAgICAgLnJlZHVjZSgoZm9ybURhdGFBY2M6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZUtleXMgPSBbJ2F0dGFjaG1lbnQnLCAnaW5saW5lJywgJ2ZpbGUnXTtcbiAgICAgICAgaWYgKGZpbGVLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICB0aGlzLmFkZEZpbGVzVG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkgPT09ICdtZXNzYWdlJykgeyAvLyBtaW1lIG1lc3NhZ2VcbiAgICAgICAgICB0aGlzLmFkZE1pbWVEYXRhVG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uUHJvcGVydHlUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgIH0sIG5ldyB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IoKSk7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRNaW1lRGF0YVRvRkQoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgZGF0YTogQnVmZmVyIHwgQmxvYixcbiAgICBmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBpZiAoaXNOb2RlRm9ybURhdGEoZm9ybURhdGFJbnN0YW5jZSkpIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgZm9ybURhdGFJbnN0YW5jZS5hcHBlbmQoa2V5LCBkYXRhLCB7IGZpbGVuYW1lOiAnTWltZU1lc3NhZ2UnIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtRGF0YUluc3RhbmNlLmFwcGVuZChrZXksIGRhdGEgYXMgQmxvYiwgJ01pbWVNZXNzYWdlJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRGaWxlc1RvRkQoXG4gICAgcHJvcGVydHlOYW1lOiBzdHJpbmcsXG4gICAgdmFsdWU6IGFueSxcbiAgICBmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhcHBlbmRGaWxlVG9GRCA9IChcbiAgICAgIGtleTogc3RyaW5nLFxuICAgICAgb2JqOiBhbnksXG4gICAgICBmb3JtRGF0YTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgICApOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGlzU3RyZWFtRGF0YSA9IGlzU3RyZWFtKG9iaik7XG4gICAgICBjb25zdCBvYmpEYXRhID0gaXNTdHJlYW1EYXRhID8gb2JqIDogb2JqLmRhdGE7XG4gICAgICAvLyBnZXRBdHRhY2htZW50T3B0aW9ucyBzaG91bGQgYmUgY2FsbGVkIHdpdGggb2JqIHBhcmFtZXRlciB0byBwcmV2ZW50IGxvb3NpbmcgZmlsZW5hbWVcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBnZXRBdHRhY2htZW50T3B0aW9ucyhvYmopO1xuICAgICAgaWYgKGlzTm9kZUZvcm1EYXRhKGZvcm1EYXRhKSkge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBvYmpEYXRhLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgb2JqRGF0YSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgfTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBhcHBlbmRGaWxlVG9GRChwcm9wZXJ0eU5hbWUsIGl0ZW0sIGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgdmFsdWUsIGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29tbW9uUHJvcGVydHlUb0ZEKFxuICAgIGtleTogc3RyaW5nLFxuICAgIHZhbHVlOiBhbnksXG4gICAgZm9ybURhdGFBY2M6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogYW55KSB7XG4gICAgICAgIGZvcm1EYXRhQWNjLmFwcGVuZChrZXksIGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBmb3JtRGF0YUFjYy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHV0KHVybDogc3RyaW5nLCBkYXRhOiBhbnksIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBhdGNoKHVybDogc3RyaW5nLCBkYXRhOiBhbnksIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncGF0Y2gnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgZGVsZXRlKHVybDogc3RyaW5nLCBkYXRhPzogYW55LCBvcHRpb25zPzogYW55KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ2RlbGV0ZScsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdDtcbiIsImltcG9ydCB7XG4gIENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSwgRGVzdHJveVJvdXRlUmVzcG9uc2UsIFJvdXRlLCBSb3V0ZXNMaXN0UXVlcnksIFVwZGF0ZVJvdXRlUmVzcG9uc2Vcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL3JvdXRlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeTogUm91dGVzTGlzdFF1ZXJ5KTogUHJvbWlzZTxSb3V0ZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9yb3V0ZXMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyk7XG4gIH1cblxuICBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL3JvdXRlcy8ke2lkfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92My9yb3V0ZXMnLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5LnJvdXRlKTtcbiAgfVxuXG4gIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFVwZGF0ZVJvdXRlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgL3YzL3JvdXRlcy8ke2lkfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95Um91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgU3RhdHNPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9TdGF0c09wdGlvbnMnO1xuXG5jbGFzcyBTdGF0cyB7XG4gIHN0YXJ0OiBEYXRlO1xuICBlbmQ6IERhdGU7XG4gIHJlc29sdXRpb246IHN0cmluZztcbiAgc3RhdHM6IGFueTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBTdGF0c09wdGlvbnMpIHtcbiAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoZGF0YS5zdGFydCk7XG4gICAgdGhpcy5lbmQgPSBuZXcgRGF0ZShkYXRhLmVuZCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uID0gZGF0YS5yZXNvbHV0aW9uO1xuICAgIHRoaXMuc3RhdHMgPSBkYXRhLnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdDogeyB0aW1lOiBzdHJpbmcgfCBEYXRlIH0pIHtcbiAgICAgIGNvbnN0IHJlcyA9IHsgLi4uc3RhdCB9O1xuICAgICAgcmVzLnRpbWUgPSBuZXcgRGF0ZShzdGF0LnRpbWUpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBfcGFyc2VTdGF0cyhyZXNwb25zZTogeyBib2R5OiBTdGF0c09wdGlvbnMgfSkge1xuICAgIHJldHVybiBuZXcgU3RhdHMocmVzcG9uc2UuYm9keSk7XG4gIH1cblxuICBnZXREb21haW4oZG9tYWluOiBzdHJpbmcsIHF1ZXJ5OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMnLCBkb21haW4sICdzdGF0cy90b3RhbCcpLCBxdWVyeSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlU3RhdHMpO1xuICB9XG5cbiAgZ2V0QWNjb3VudChxdWVyeTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9zdGF0cy90b3RhbCcsIHF1ZXJ5KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VTdGF0cyk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgQm91bmNlRGF0YSxcbiAgQ29tcGxhaW50RGF0YSxcbiAgVW5zdWJzY3JpYmVEYXRhLFxuICBXaGl0ZUxpc3REYXRhXG59IGZyb20gJy4vaW50ZXJmYWNlcy9TdXByZXNzaW9ucyc7XG5cbmNvbnN0IGNyZWF0ZU9wdGlvbnMgPSB7XG4gIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XG59O1xuXG5jbGFzcyBCb3VuY2Uge1xuICB0eXBlOiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY29kZTogbnVtYmVyO1xuICBlcnJvcjogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IEJvdW5jZURhdGEpIHtcbiAgICB0aGlzLnR5cGUgPSAnYm91bmNlcyc7XG4gICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgIHRoaXMuY29kZSA9ICtkYXRhLmNvZGU7XG4gICAgdGhpcy5lcnJvciA9IGRhdGEuZXJyb3I7XG4gICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgfVxufVxuXG5jbGFzcyBDb21wbGFpbnQge1xuICB0eXBlOiBzdHJpbmc7XG4gIGFkZHJlc3M6IGFueTtcbiAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBDb21wbGFpbnREYXRhKSB7XG4gICAgdGhpcy50eXBlID0gJ2NvbXBsYWludHMnO1xuICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICB9XG59XG5cbmNsYXNzIFVuc3Vic2NyaWJlIHtcbiAgdHlwZTogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIHRhZ3M6IGFueTtcbiAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBVbnN1YnNjcmliZURhdGEpIHtcbiAgICB0aGlzLnR5cGUgPSAndW5zdWJzY3JpYmVzJztcbiAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgdGhpcy50YWdzID0gZGF0YS50YWdzO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gIH1cbn1cblxuY2xhc3MgV2hpdGVMaXN0IHtcbiAgdHlwZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICByZWFzb246IHN0cmluZztcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFdoaXRlTGlzdERhdGEpIHtcbiAgICB0aGlzLnR5cGUgPSAnd2hpdGVsaXN0cyc7XG4gICAgdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgdGhpcy5yZWFzb24gPSBkYXRhLnJlYXNvbjtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZEF0KTtcbiAgfVxufVxuXG50eXBlIFRNb2RlbCA9IHR5cGVvZiBCb3VuY2UgfCB0eXBlb2YgQ29tcGxhaW50IHwgdHlwZW9mIFVuc3Vic2NyaWJlIHwgdHlwZW9mIFdoaXRlTGlzdDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwcHJlc3Npb25DbGllbnQge1xuICByZXF1ZXN0OiBhbnk7XG4gIG1vZGVsczoge1xuICAgIGJvdW5jZXM6IHR5cGVvZiBCb3VuY2U7XG4gICAgY29tcGxhaW50czogdHlwZW9mIENvbXBsYWludDtcbiAgICB1bnN1YnNjcmliZXM6IHR5cGVvZiBVbnN1YnNjcmliZTtcbiAgICB3aGl0ZWxpc3RzOiB0eXBlb2YgV2hpdGVMaXN0O1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubW9kZWxzID0ge1xuICAgICAgYm91bmNlczogQm91bmNlLFxuICAgICAgY29tcGxhaW50czogQ29tcGxhaW50LFxuICAgICAgdW5zdWJzY3JpYmVzOiBVbnN1YnNjcmliZSxcbiAgICAgIHdoaXRlbGlzdHM6IFdoaXRlTGlzdCxcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlUGFnZShpZDogc3RyaW5nLCBwYWdlVXJsOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSB1cmwucGFyc2UocGFnZVVybCwgdHJ1ZSk7XG4gICAgY29uc3QgeyBxdWVyeSB9ID0gcGFyc2VkVXJsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkLFxuICAgICAgcGFnZTogcXVlcnkucGFnZSxcbiAgICAgIGFkZHJlc3M6IHF1ZXJ5LmFkZHJlc3MsXG4gICAgICB1cmw6IHBhZ2VVcmxcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlOiB7IGJvZHk6IHsgcGFnaW5nOiBhbnkgfSB9KSB7XG4gICAgY29uc3QgcGFnZXMgPSBPYmplY3QuZW50cmllcyhyZXNwb25zZS5ib2R5LnBhZ2luZyk7XG4gICAgcmV0dXJuIHBhZ2VzLnJlZHVjZShcbiAgICAgIChhY2M6IGFueSwgW2lkLCBwYWdlVXJsXTogW3BhZ2VVcmw6IHN0cmluZywgaWQ6IHN0cmluZ10pID0+IHtcbiAgICAgICAgYWNjW2lkXSA9IHRoaXMuX3BhcnNlUGFnZShpZCwgcGFnZVVybCk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fVxuICAgICk7XG4gIH1cblxuICBfcGFyc2VMaXN0KHJlc3BvbnNlOiB7IGJvZHk6IHsgaXRlbXM6IGFueSwgcGFnaW5nOiBhbnkgfSB9LCBNb2RlbDogVE1vZGVsKSB7XG4gICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlIC0tLS0tLS0tLS0tPicsIHJlc3BvbnNlLmJvZHkuaXRlbXMpO1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBhbnk7XG5cbiAgICBkYXRhLml0ZW1zID0gcmVzcG9uc2UuYm9keS5pdGVtcy5tYXAoKGQ6IGFueSkgPT4gbmV3IE1vZGVsKGQpKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLl9wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIF9wYXJzZUl0ZW0ocmVzcG9uc2U6IHsgYm9keTogYW55IH0sIE1vZGVsOiBUTW9kZWwpIHtcbiAgICByZXR1cm4gbmV3IE1vZGVsKHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVXaGl0ZUxpc3QoZG9tYWluOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgIC8vIHN1cHBvcnRzIGFkZGluZyBtdWx0aXBsZSBzdXBwcmVzc2lvbnMgYnkgZGVmYXVsdFxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAnd2hpdGVsaXN0cycpLCBkYXRhLCBjcmVhdGVPcHRpb25zKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7IGJvZHk6IGFueSB9KSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgcXVlcnk6IGFueSkge1xuICAgIGNvbnN0IG1vZGVsID0gKHRoaXMubW9kZWxzIGFzIGFueSlbdHlwZV07XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAuZ2V0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlKSwgcXVlcnkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IHsgYm9keTogeyBpdGVtczogYW55LCBwYWdpbmc6IGFueSB9IH0pID0+IHRoaXMuX3BhcnNlTGlzdChyZXNwb25zZSwgbW9kZWwpKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdHlwZTogc3RyaW5nLCBhZGRyZXNzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBtb2RlbCA9ICh0aGlzLm1vZGVscyBhcyBhbnkpW3R5cGVdO1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLmdldCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSwgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogeyBib2R5OiBhbnkgfSkgPT4gdGhpcy5fcGFyc2VJdGVtKHJlc3BvbnNlLCBtb2RlbCkpO1xuICB9XG5cbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgIC8vIHN1cHBvcnRzIGFkZGluZyBtdWx0aXBsZSBzdXBwcmVzc2lvbnMgYnkgZGVmYXVsdFxuICAgIGxldCBwb3N0RGF0YTtcbiAgICBpZiAodHlwZSA9PT0gJ3doaXRlbGlzdHMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVXaGl0ZUxpc3QoZG9tYWluLCBkYXRhKTtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHBvc3REYXRhID0gW2RhdGFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3N0RGF0YSA9IFsuLi5kYXRhXTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygncG9zdERhdGEnLCBwb3N0RGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3QodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBKU09OLnN0cmluZ2lmeShwb3N0RGF0YSksIGNyZWF0ZU9wdGlvbnMpXG4gICAgICAudGhlbigocmVzcG9uc2U6IHsgYm9keTogYW55IH0pID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgdHlwZTogc3RyaW5nLCBhZGRyZXNzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAuZGVsZXRlKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7IGJvZHk6IGFueSB9KSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN1cHByZXNzaW9uQ2xpZW50O1xuIiwiaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgeyBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL011bHRpcGxlVmFsaWRhdGlvbic7XG5pbXBvcnQgeyBWYWxpZGF0aW9uUmVzdWx0LCBWYWxpZGF0aW9uUmVzcG9uc2UgfSBmcm9tICcuL2ludGVyZmFjZXMvVmFsaWRhdGUnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdGVDbGllbnQge1xuICBwdWJsaWMgbXVsdGlwbGVWYWxpZGF0aW9uO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDogSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5tdWx0aXBsZVZhbGlkYXRpb24gPSBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ7XG4gIH1cblxuICBnZXQoYWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxWYWxpZGF0aW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92NC9hZGRyZXNzL3ZhbGlkYXRlJywgeyBhZGRyZXNzIH0pXG4gICAgICAudGhlbigocmVzcG9uc2UgOiBBUElSZXNwb25zZSkgPT4gcmVzcG9uc2UpXG4gICAgICAudGhlbigocmVzIDogVmFsaWRhdGlvblJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBWYWxpZGF0aW9uUmVzdWx0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuXG5pbXBvcnQge1xuICBWYWxpZGF0aW9uUmVzcG9uc2UsXG4gIFdlYmhvb2tMaXN0LFxuICBXZWJob29rUmVzcG9uc2UsXG4gIFdlYmhvb2tzUXVlcnlcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL1dlYmhvb2tzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmNsYXNzIFdlYmhvb2sge1xuICBpZDogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB1cmw6IHN0cmluZykge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJob29rQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tMaXN0KHJlc3BvbnNlOiB7IGJvZHk6IHsgd2ViaG9va3M6IFdlYmhvb2tMaXN0IH0gfSk6IFdlYmhvb2tMaXN0IHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keS53ZWJob29rcztcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tXaXRoSUQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2U6IFdlYmhvb2tSZXNwb25zZSk6IFdlYmhvb2sge1xuICAgICAgY29uc3Qgd2ViaG9va1Jlc3BvbnNlID0gcmVzcG9uc2U/LmJvZHk/LndlYmhvb2s7XG4gICAgICBsZXQgdXJsID0gd2ViaG9va1Jlc3BvbnNlPy51cmw7XG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICB1cmwgPSB3ZWJob29rUmVzcG9uc2U/LnVybHMgJiYgd2ViaG9va1Jlc3BvbnNlLnVybHMubGVuZ3RoID8gd2ViaG9va1Jlc3BvbnNlLnVybHNbMF0gOiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBXZWJob29rKGlkLCB1cmwpO1xuICAgIH07XG4gIH1cblxuICBfcGFyc2VXZWJob29rVGVzdChyZXNwb25zZTogeyBib2R5OiB7IGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nIH0gfSlcbiAgOiB7Y29kZTogbnVtYmVyLCBtZXNzYWdlOnN0cmluZ30ge1xuICAgIHJldHVybiB7IGNvZGU6IHJlc3BvbnNlLmJvZHkuY29kZSwgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlIH0gYXMgVmFsaWRhdGlvblJlc3BvbnNlO1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk6IFdlYmhvb2tzUXVlcnkpOiBQcm9taXNlPFdlYmhvb2tMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCBxdWVyeSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va0xpc3QpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nKTogUHJvbWlzZTxXZWJob29rPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgY3JlYXRlKGRvbWFpbjogc3RyaW5nLFxuICAgIGlkOiBzdHJpbmcsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgdGVzdCA9IGZhbHNlKTogUHJvbWlzZTxXZWJob29rIHwgVmFsaWRhdGlvblJlc3BvbnNlPiB7XG4gICAgaWYgKHRlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCwgJ3Rlc3QnKSwgeyB1cmwgfSlcbiAgICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rVGVzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgeyBpZCwgdXJsIH0pXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBQcm9taXNlPFdlYmhvb2s+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpLCB7IHVybCB9KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nKSA6IFByb21pc2U8V2ViaG9vaz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxufVxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS9iYXNlNjQgdjEuMC4wIGJ5IEBtYXRoaWFzIHwgTUlUIGxpY2Vuc2UgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2AuXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSwgYW5kIHVzZVxuXHQvLyBpdCBhcyBgcm9vdGAuXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIEludmFsaWRDaGFyYWN0ZXJFcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9O1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yO1xuXHRJbnZhbGlkQ2hhcmFjdGVyRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuXHR2YXIgZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0Ly8gTm90ZTogdGhlIGVycm9yIG1lc3NhZ2VzIHVzZWQgdGhyb3VnaG91dCB0aGlzIGZpbGUgbWF0Y2ggdGhvc2UgdXNlZCBieVxuXHRcdC8vIHRoZSBuYXRpdmUgYGF0b2JgL2BidG9hYCBpbXBsZW1lbnRhdGlvbiBpbiBDaHJvbWl1bS5cblx0XHR0aHJvdyBuZXcgSW52YWxpZENoYXJhY3RlckVycm9yKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHZhciBUQUJMRSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC9jb21tb24tbWljcm9zeW50YXhlcy5odG1sI3NwYWNlLWNoYXJhY3RlclxuXHR2YXIgUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUyA9IC9bXFx0XFxuXFxmXFxyIF0vZztcblxuXHQvLyBgZGVjb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGF0b2JgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZC4gaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1hdG9iXG5cdC8vIFRoZSBvcHRpbWl6ZWQgYmFzZTY0LWRlY29kaW5nIGFsZ29yaXRobSB1c2VkIGlzIGJhc2VkIG9uIEBhdGvigJlzIGV4Y2VsbGVudFxuXHQvLyBpbXBsZW1lbnRhdGlvbi4gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYXRrLzEwMjAzOTZcblx0dmFyIGRlY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpXG5cdFx0XHQucmVwbGFjZShSRUdFWF9TUEFDRV9DSEFSQUNURVJTLCAnJyk7XG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHRpZiAobGVuZ3RoICUgNCA9PSAwKSB7XG5cdFx0XHRpbnB1dCA9IGlucHV0LnJlcGxhY2UoLz09PyQvLCAnJyk7XG5cdFx0XHRsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0fVxuXHRcdGlmIChcblx0XHRcdGxlbmd0aCAlIDQgPT0gMSB8fFxuXHRcdFx0Ly8gaHR0cDovL3doYXR3Zy5vcmcvQyNhbHBoYW51bWVyaWMtYXNjaWktY2hhcmFjdGVyc1xuXHRcdFx0L1teK2EtekEtWjAtOS9dLy50ZXN0KGlucHV0KVxuXHRcdCkge1xuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdJbnZhbGlkIGNoYXJhY3RlcjogdGhlIHN0cmluZyB0byBiZSBkZWNvZGVkIGlzIG5vdCBjb3JyZWN0bHkgZW5jb2RlZC4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgYml0Q291bnRlciA9IDA7XG5cdFx0dmFyIGJpdFN0b3JhZ2U7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdGJ1ZmZlciA9IFRBQkxFLmluZGV4T2YoaW5wdXQuY2hhckF0KHBvc2l0aW9uKSk7XG5cdFx0XHRiaXRTdG9yYWdlID0gYml0Q291bnRlciAlIDQgPyBiaXRTdG9yYWdlICogNjQgKyBidWZmZXIgOiBidWZmZXI7XG5cdFx0XHQvLyBVbmxlc3MgdGhpcyBpcyB0aGUgZmlyc3Qgb2YgYSBncm91cCBvZiA0IGNoYXJhY3RlcnPigKZcblx0XHRcdGlmIChiaXRDb3VudGVyKysgJSA0KSB7XG5cdFx0XHRcdC8vIOKApmNvbnZlcnQgdGhlIGZpcnN0IDggYml0cyB0byBhIHNpbmdsZSBBU0NJSSBjaGFyYWN0ZXIuXG5cdFx0XHRcdG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdFx0XHRcdDB4RkYgJiBiaXRTdG9yYWdlID4+ICgtMiAqIGJpdENvdW50ZXIgJiA2KVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdC8vIGBlbmNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYnRvYWAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkOiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWJ0b2Fcblx0dmFyIGVuY29kZSA9IGZ1bmN0aW9uKGlucHV0KSB7XG5cdFx0aW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuXHRcdGlmICgvW15cXDAtXFx4RkZdLy50ZXN0KGlucHV0KSkge1xuXHRcdFx0Ly8gTm90ZTogbm8gbmVlZCB0byBzcGVjaWFsLWNhc2UgYXN0cmFsIHN5bWJvbHMgaGVyZSwgYXMgc3Vycm9nYXRlcyBhcmVcblx0XHRcdC8vIG1hdGNoZWQsIGFuZCB0aGUgaW5wdXQgaXMgc3VwcG9zZWQgdG8gb25seSBjb250YWluIEFTQ0lJIGFueXdheS5cblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnVGhlIHN0cmluZyB0byBiZSBlbmNvZGVkIGNvbnRhaW5zIGNoYXJhY3RlcnMgb3V0c2lkZSBvZiB0aGUgJyArXG5cdFx0XHRcdCdMYXRpbjEgcmFuZ2UuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIHBhZGRpbmcgPSBpbnB1dC5sZW5ndGggJSAzO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR2YXIgYTtcblx0XHR2YXIgYjtcblx0XHR2YXIgYztcblx0XHR2YXIgYnVmZmVyO1xuXHRcdC8vIE1ha2Ugc3VyZSBhbnkgcGFkZGluZyBpcyBoYW5kbGVkIG91dHNpZGUgb2YgdGhlIGxvb3AuXG5cdFx0dmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCAtIHBhZGRpbmc7XG5cblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gUmVhZCB0aHJlZSBieXRlcywgaS5lLiAyNCBiaXRzLlxuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDE2O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbikgPDwgODtcblx0XHRcdGMgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGIgKyBjO1xuXHRcdFx0Ly8gVHVybiB0aGUgMjQgYml0cyBpbnRvIGZvdXIgY2h1bmtzIG9mIDYgYml0cyBlYWNoLCBhbmQgYXBwZW5kIHRoZVxuXHRcdFx0Ly8gbWF0Y2hpbmcgY2hhcmFjdGVyIGZvciBlYWNoIG9mIHRoZW0gdG8gdGhlIG91dHB1dC5cblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTggJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTIgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gNiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciAmIDB4M0YpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmIChwYWRkaW5nID09IDIpIHtcblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YiA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYjtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMTApICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPj4gNCkgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDIpICYgMHgzRikgK1xuXHRcdFx0XHQnPSdcblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChwYWRkaW5nID09IDEpIHtcblx0XHRcdGJ1ZmZlciA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAyKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyIDw8IDQpICYgMHgzRikgK1xuXHRcdFx0XHQnPT0nXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0dmFyIGJhc2U2NCA9IHtcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J3ZlcnNpb24nOiAnMS4wLjAnXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTY0O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gYmFzZTY0O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYmFzZTY0KSB7XG5cdFx0XHRcdGJhc2U2NC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gYmFzZTY0W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QuYmFzZTY0ID0gYmFzZTY0O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiZXhwb3J0IHtkZWZhdWx0fSBmcm9tICdreSc7XG4iLCIvKiEgTUlUIExpY2Vuc2UgwqkgU2luZHJlIFNvcmh1cyAqL1xuXG5jb25zdCBnbG9iYWxzID0ge307XG5cbmNvbnN0IGdldEdsb2JhbCA9IHByb3BlcnR5ID0+IHtcblx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0aWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmICYmIHByb3BlcnR5IGluIHNlbGYpIHtcblx0XHRyZXR1cm4gc2VsZjtcblx0fVxuXG5cdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgJiYgcHJvcGVydHkgaW4gd2luZG93KSB7XG5cdFx0cmV0dXJuIHdpbmRvdztcblx0fVxuXG5cdGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwgJiYgcHJvcGVydHkgaW4gZ2xvYmFsKSB7XG5cdFx0cmV0dXJuIGdsb2JhbDtcblx0fVxuXG5cdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcykge1xuXHRcdHJldHVybiBnbG9iYWxUaGlzO1xuXHR9XG59O1xuXG5jb25zdCBnbG9iYWxQcm9wZXJ0aWVzID0gW1xuXHQnSGVhZGVycycsXG5cdCdSZXF1ZXN0Jyxcblx0J1Jlc3BvbnNlJyxcblx0J1JlYWRhYmxlU3RyZWFtJyxcblx0J2ZldGNoJyxcblx0J0Fib3J0Q29udHJvbGxlcicsXG5cdCdGb3JtRGF0YSdcbl07XG5cbmZvciAoY29uc3QgcHJvcGVydHkgb2YgZ2xvYmFsUHJvcGVydGllcykge1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZ2xvYmFscywgcHJvcGVydHksIHtcblx0XHRnZXQoKSB7XG5cdFx0XHRjb25zdCBnbG9iYWxPYmplY3QgPSBnZXRHbG9iYWwocHJvcGVydHkpO1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBnbG9iYWxPYmplY3QgJiYgZ2xvYmFsT2JqZWN0W3Byb3BlcnR5XTtcblx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyB2YWx1ZS5iaW5kKGdsb2JhbE9iamVjdCkgOiB2YWx1ZTtcblx0XHR9XG5cdH0pO1xufVxuXG5jb25zdCBpc09iamVjdCA9IHZhbHVlID0+IHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCc7XG5jb25zdCBzdXBwb3J0c0Fib3J0Q29udHJvbGxlciA9IHR5cGVvZiBnbG9iYWxzLkFib3J0Q29udHJvbGxlciA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IHN1cHBvcnRzU3RyZWFtcyA9IHR5cGVvZiBnbG9iYWxzLlJlYWRhYmxlU3RyZWFtID09PSAnZnVuY3Rpb24nO1xuY29uc3Qgc3VwcG9ydHNGb3JtRGF0YSA9IHR5cGVvZiBnbG9iYWxzLkZvcm1EYXRhID09PSAnZnVuY3Rpb24nO1xuXG5jb25zdCBtZXJnZUhlYWRlcnMgPSAoc291cmNlMSwgc291cmNlMikgPT4ge1xuXHRjb25zdCByZXN1bHQgPSBuZXcgZ2xvYmFscy5IZWFkZXJzKHNvdXJjZTEgfHwge30pO1xuXHRjb25zdCBpc0hlYWRlcnNJbnN0YW5jZSA9IHNvdXJjZTIgaW5zdGFuY2VvZiBnbG9iYWxzLkhlYWRlcnM7XG5cdGNvbnN0IHNvdXJjZSA9IG5ldyBnbG9iYWxzLkhlYWRlcnMoc291cmNlMiB8fCB7fSk7XG5cblx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2Ygc291cmNlKSB7XG5cdFx0aWYgKChpc0hlYWRlcnNJbnN0YW5jZSAmJiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJlc3VsdC5kZWxldGUoa2V5KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0LnNldChrZXksIHZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgZGVlcE1lcmdlID0gKC4uLnNvdXJjZXMpID0+IHtcblx0bGV0IHJldHVyblZhbHVlID0ge307XG5cdGxldCBoZWFkZXJzID0ge307XG5cblx0Zm9yIChjb25zdCBzb3VyY2Ugb2Ygc291cmNlcykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcblx0XHRcdGlmICghKEFycmF5LmlzQXJyYXkocmV0dXJuVmFsdWUpKSkge1xuXHRcdFx0XHRyZXR1cm5WYWx1ZSA9IFtdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm5WYWx1ZSA9IFsuLi5yZXR1cm5WYWx1ZSwgLi4uc291cmNlXTtcblx0XHR9IGVsc2UgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcblx0XHRcdGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzb3VyY2UpKSB7XG5cdFx0XHRcdGlmIChpc09iamVjdCh2YWx1ZSkgJiYgKGtleSBpbiByZXR1cm5WYWx1ZSkpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGRlZXBNZXJnZShyZXR1cm5WYWx1ZVtrZXldLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm5WYWx1ZSA9IHsuLi5yZXR1cm5WYWx1ZSwgW2tleV06IHZhbHVlfTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzT2JqZWN0KHNvdXJjZS5oZWFkZXJzKSkge1xuXHRcdFx0XHRoZWFkZXJzID0gbWVyZ2VIZWFkZXJzKGhlYWRlcnMsIHNvdXJjZS5oZWFkZXJzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm5WYWx1ZS5oZWFkZXJzID0gaGVhZGVycztcblx0fVxuXG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn07XG5cbmNvbnN0IHJlcXVlc3RNZXRob2RzID0gW1xuXHQnZ2V0Jyxcblx0J3Bvc3QnLFxuXHQncHV0Jyxcblx0J3BhdGNoJyxcblx0J2hlYWQnLFxuXHQnZGVsZXRlJ1xuXTtcblxuY29uc3QgcmVzcG9uc2VUeXBlcyA9IHtcblx0anNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHR0ZXh0OiAndGV4dC8qJyxcblx0Zm9ybURhdGE6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcblx0YXJyYXlCdWZmZXI6ICcqLyonLFxuXHRibG9iOiAnKi8qJ1xufTtcblxuY29uc3QgcmV0cnlNZXRob2RzID0gW1xuXHQnZ2V0Jyxcblx0J3B1dCcsXG5cdCdoZWFkJyxcblx0J2RlbGV0ZScsXG5cdCdvcHRpb25zJyxcblx0J3RyYWNlJ1xuXTtcblxuY29uc3QgcmV0cnlTdGF0dXNDb2RlcyA9IFtcblx0NDA4LFxuXHQ0MTMsXG5cdDQyOSxcblx0NTAwLFxuXHQ1MDIsXG5cdDUwMyxcblx0NTA0XG5dO1xuXG5jb25zdCByZXRyeUFmdGVyU3RhdHVzQ29kZXMgPSBbXG5cdDQxMyxcblx0NDI5LFxuXHQ1MDNcbl07XG5cbmNvbnN0IHN0b3AgPSBTeW1ib2woJ3N0b3AnKTtcblxuY2xhc3MgSFRUUEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihyZXNwb25zZSkge1xuXHRcdC8vIFNldCB0aGUgbWVzc2FnZSB0byB0aGUgc3RhdHVzIHRleHQsIHN1Y2ggYXMgVW5hdXRob3JpemVkLFxuXHRcdC8vIHdpdGggc29tZSBmYWxsYmFja3MuIFRoaXMgbWVzc2FnZSBzaG91bGQgbmV2ZXIgYmUgdW5kZWZpbmVkLlxuXHRcdHN1cGVyKFxuXHRcdFx0cmVzcG9uc2Uuc3RhdHVzVGV4dCB8fFxuXHRcdFx0U3RyaW5nKFxuXHRcdFx0XHQocmVzcG9uc2Uuc3RhdHVzID09PSAwIHx8IHJlc3BvbnNlLnN0YXR1cykgP1xuXHRcdFx0XHRcdHJlc3BvbnNlLnN0YXR1cyA6ICdVbmtub3duIHJlc3BvbnNlIGVycm9yJ1xuXHRcdFx0KVxuXHRcdCk7XG5cdFx0dGhpcy5uYW1lID0gJ0hUVFBFcnJvcic7XG5cdFx0dGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuXHR9XG59XG5cbmNsYXNzIFRpbWVvdXRFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IocmVxdWVzdCkge1xuXHRcdHN1cGVyKCdSZXF1ZXN0IHRpbWVkIG91dCcpO1xuXHRcdHRoaXMubmFtZSA9ICdUaW1lb3V0RXJyb3InO1xuXHRcdHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG5cdH1cbn1cblxuY29uc3QgZGVsYXkgPSBtcyA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcblxuLy8gYFByb21pc2UucmFjZSgpYCB3b3JrYXJvdW5kICgjOTEpXG5jb25zdCB0aW1lb3V0ID0gKHJlcXVlc3QsIGFib3J0Q29udHJvbGxlciwgb3B0aW9ucykgPT5cblx0bmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGNvbnN0IHRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0aWYgKGFib3J0Q29udHJvbGxlcikge1xuXHRcdFx0XHRhYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcblx0XHRcdH1cblxuXHRcdFx0cmVqZWN0KG5ldyBUaW1lb3V0RXJyb3IocmVxdWVzdCkpO1xuXHRcdH0sIG9wdGlvbnMudGltZW91dCk7XG5cblx0XHQvKiBlc2xpbnQtZGlzYWJsZSBwcm9taXNlL3ByZWZlci1hd2FpdC10by10aGVuICovXG5cdFx0b3B0aW9ucy5mZXRjaChyZXF1ZXN0KVxuXHRcdFx0LnRoZW4ocmVzb2x2ZSlcblx0XHRcdC5jYXRjaChyZWplY3QpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuXHRcdFx0fSk7XG5cdFx0LyogZXNsaW50LWVuYWJsZSBwcm9taXNlL3ByZWZlci1hd2FpdC10by10aGVuICovXG5cdH0pO1xuXG5jb25zdCBub3JtYWxpemVSZXF1ZXN0TWV0aG9kID0gaW5wdXQgPT4gcmVxdWVzdE1ldGhvZHMuaW5jbHVkZXMoaW5wdXQpID8gaW5wdXQudG9VcHBlckNhc2UoKSA6IGlucHV0O1xuXG5jb25zdCBkZWZhdWx0UmV0cnlPcHRpb25zID0ge1xuXHRsaW1pdDogMixcblx0bWV0aG9kczogcmV0cnlNZXRob2RzLFxuXHRzdGF0dXNDb2RlczogcmV0cnlTdGF0dXNDb2Rlcyxcblx0YWZ0ZXJTdGF0dXNDb2RlczogcmV0cnlBZnRlclN0YXR1c0NvZGVzXG59O1xuXG5jb25zdCBub3JtYWxpemVSZXRyeU9wdGlvbnMgPSAocmV0cnkgPSB7fSkgPT4ge1xuXHRpZiAodHlwZW9mIHJldHJ5ID09PSAnbnVtYmVyJykge1xuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5kZWZhdWx0UmV0cnlPcHRpb25zLFxuXHRcdFx0bGltaXQ6IHJldHJ5XG5cdFx0fTtcblx0fVxuXG5cdGlmIChyZXRyeS5tZXRob2RzICYmICFBcnJheS5pc0FycmF5KHJldHJ5Lm1ldGhvZHMpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdyZXRyeS5tZXRob2RzIG11c3QgYmUgYW4gYXJyYXknKTtcblx0fVxuXG5cdGlmIChyZXRyeS5zdGF0dXNDb2RlcyAmJiAhQXJyYXkuaXNBcnJheShyZXRyeS5zdGF0dXNDb2RlcykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3JldHJ5LnN0YXR1c0NvZGVzIG11c3QgYmUgYW4gYXJyYXknKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Li4uZGVmYXVsdFJldHJ5T3B0aW9ucyxcblx0XHQuLi5yZXRyeSxcblx0XHRhZnRlclN0YXR1c0NvZGVzOiByZXRyeUFmdGVyU3RhdHVzQ29kZXNcblx0fTtcbn07XG5cbi8vIFRoZSBtYXhpbXVtIHZhbHVlIG9mIGEgMzJiaXQgaW50IChzZWUgaXNzdWUgIzExNylcbmNvbnN0IG1heFNhZmVUaW1lb3V0ID0gMjE0NzQ4MzY0NztcblxuY2xhc3MgS3kge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5fcmV0cnlDb3VudCA9IDA7XG5cdFx0dGhpcy5faW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLl9vcHRpb25zID0ge1xuXHRcdFx0Ly8gVE9ETzogY3JlZGVudGlhbHMgY2FuIGJlIHJlbW92ZWQgd2hlbiB0aGUgc3BlYyBjaGFuZ2UgaXMgaW1wbGVtZW50ZWQgaW4gYWxsIGJyb3dzZXJzLiBDb250ZXh0OiBodHRwczovL3d3dy5jaHJvbWVzdGF0dXMuY29tL2ZlYXR1cmUvNDUzOTQ3MzMxMjM1MDIwOFxuXHRcdFx0Y3JlZGVudGlhbHM6IHRoaXMuX2lucHV0LmNyZWRlbnRpYWxzIHx8ICdzYW1lLW9yaWdpbicsXG5cdFx0XHQuLi5vcHRpb25zLFxuXHRcdFx0aGVhZGVyczogbWVyZ2VIZWFkZXJzKHRoaXMuX2lucHV0LmhlYWRlcnMsIG9wdGlvbnMuaGVhZGVycyksXG5cdFx0XHRob29rczogZGVlcE1lcmdlKHtcblx0XHRcdFx0YmVmb3JlUmVxdWVzdDogW10sXG5cdFx0XHRcdGJlZm9yZVJldHJ5OiBbXSxcblx0XHRcdFx0YWZ0ZXJSZXNwb25zZTogW11cblx0XHRcdH0sIG9wdGlvbnMuaG9va3MpLFxuXHRcdFx0bWV0aG9kOiBub3JtYWxpemVSZXF1ZXN0TWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMuX2lucHV0Lm1ldGhvZCksXG5cdFx0XHRwcmVmaXhVcmw6IFN0cmluZyhvcHRpb25zLnByZWZpeFVybCB8fCAnJyksXG5cdFx0XHRyZXRyeTogbm9ybWFsaXplUmV0cnlPcHRpb25zKG9wdGlvbnMucmV0cnkpLFxuXHRcdFx0dGhyb3dIdHRwRXJyb3JzOiBvcHRpb25zLnRocm93SHR0cEVycm9ycyAhPT0gZmFsc2UsXG5cdFx0XHR0aW1lb3V0OiB0eXBlb2Ygb3B0aW9ucy50aW1lb3V0ID09PSAndW5kZWZpbmVkJyA/IDEwMDAwIDogb3B0aW9ucy50aW1lb3V0LFxuXHRcdFx0ZmV0Y2g6IG9wdGlvbnMuZmV0Y2ggfHwgZ2xvYmFscy5mZXRjaFxuXHRcdH07XG5cblx0XHRpZiAodHlwZW9mIHRoaXMuX2lucHV0ICE9PSAnc3RyaW5nJyAmJiAhKHRoaXMuX2lucHV0IGluc3RhbmNlb2YgVVJMIHx8IHRoaXMuX2lucHV0IGluc3RhbmNlb2YgZ2xvYmFscy5SZXF1ZXN0KSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignYGlucHV0YCBtdXN0IGJlIGEgc3RyaW5nLCBVUkwsIG9yIFJlcXVlc3QnKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb3B0aW9ucy5wcmVmaXhVcmwgJiYgdHlwZW9mIHRoaXMuX2lucHV0ID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKHRoaXMuX2lucHV0LnN0YXJ0c1dpdGgoJy8nKSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2BpbnB1dGAgbXVzdCBub3QgYmVnaW4gd2l0aCBhIHNsYXNoIHdoZW4gdXNpbmcgYHByZWZpeFVybGAnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCF0aGlzLl9vcHRpb25zLnByZWZpeFVybC5lbmRzV2l0aCgnLycpKSB7XG5cdFx0XHRcdHRoaXMuX29wdGlvbnMucHJlZml4VXJsICs9ICcvJztcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5faW5wdXQgPSB0aGlzLl9vcHRpb25zLnByZWZpeFVybCArIHRoaXMuX2lucHV0O1xuXHRcdH1cblxuXHRcdGlmIChzdXBwb3J0c0Fib3J0Q29udHJvbGxlcikge1xuXHRcdFx0dGhpcy5hYm9ydENvbnRyb2xsZXIgPSBuZXcgZ2xvYmFscy5BYm9ydENvbnRyb2xsZXIoKTtcblx0XHRcdGlmICh0aGlzLl9vcHRpb25zLnNpZ25hbCkge1xuXHRcdFx0XHR0aGlzLl9vcHRpb25zLnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fb3B0aW9ucy5zaWduYWwgPSB0aGlzLmFib3J0Q29udHJvbGxlci5zaWduYWw7XG5cdFx0fVxuXG5cdFx0dGhpcy5yZXF1ZXN0ID0gbmV3IGdsb2JhbHMuUmVxdWVzdCh0aGlzLl9pbnB1dCwgdGhpcy5fb3B0aW9ucyk7XG5cblx0XHRpZiAodGhpcy5fb3B0aW9ucy5zZWFyY2hQYXJhbXMpIHtcblx0XHRcdGNvbnN0IHNlYXJjaFBhcmFtcyA9ICc/JyArIG5ldyBVUkxTZWFyY2hQYXJhbXModGhpcy5fb3B0aW9ucy5zZWFyY2hQYXJhbXMpLnRvU3RyaW5nKCk7XG5cdFx0XHRjb25zdCB1cmwgPSB0aGlzLnJlcXVlc3QudXJsLnJlcGxhY2UoLyg/OlxcPy4qPyk/KD89I3wkKS8sIHNlYXJjaFBhcmFtcyk7XG5cblx0XHRcdC8vIFRvIHByb3ZpZGUgY29ycmVjdCBmb3JtIGJvdW5kYXJ5LCBDb250ZW50LVR5cGUgaGVhZGVyIHNob3VsZCBiZSBkZWxldGVkIGVhY2ggdGltZSB3aGVuIG5ldyBSZXF1ZXN0IGluc3RhbnRpYXRlZCBmcm9tIGFub3RoZXIgb25lXG5cdFx0XHRpZiAoKChzdXBwb3J0c0Zvcm1EYXRhICYmIHRoaXMuX29wdGlvbnMuYm9keSBpbnN0YW5jZW9mIGdsb2JhbHMuRm9ybURhdGEpIHx8IHRoaXMuX29wdGlvbnMuYm9keSBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcykgJiYgISh0aGlzLl9vcHRpb25zLmhlYWRlcnMgJiYgdGhpcy5fb3B0aW9ucy5oZWFkZXJzWydjb250ZW50LXR5cGUnXSkpIHtcblx0XHRcdFx0dGhpcy5yZXF1ZXN0LmhlYWRlcnMuZGVsZXRlKCdjb250ZW50LXR5cGUnKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5yZXF1ZXN0ID0gbmV3IGdsb2JhbHMuUmVxdWVzdChuZXcgZ2xvYmFscy5SZXF1ZXN0KHVybCwgdGhpcy5yZXF1ZXN0KSwgdGhpcy5fb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29wdGlvbnMuanNvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9vcHRpb25zLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9vcHRpb25zLmpzb24pO1xuXHRcdFx0dGhpcy5yZXF1ZXN0LmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXHRcdFx0dGhpcy5yZXF1ZXN0ID0gbmV3IGdsb2JhbHMuUmVxdWVzdCh0aGlzLnJlcXVlc3QsIHtib2R5OiB0aGlzLl9vcHRpb25zLmJvZHl9KTtcblx0XHR9XG5cblx0XHRjb25zdCBmbiA9IGFzeW5jICgpID0+IHtcblx0XHRcdGlmICh0aGlzLl9vcHRpb25zLnRpbWVvdXQgPiBtYXhTYWZlVGltZW91dCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihgVGhlIFxcYHRpbWVvdXRcXGAgb3B0aW9uIGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gJHttYXhTYWZlVGltZW91dH1gKTtcblx0XHRcdH1cblxuXHRcdFx0YXdhaXQgZGVsYXkoMSk7XG5cdFx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9mZXRjaCgpO1xuXG5cdFx0XHRmb3IgKGNvbnN0IGhvb2sgb2YgdGhpcy5fb3B0aW9ucy5ob29rcy5hZnRlclJlc3BvbnNlKSB7XG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG5cdFx0XHRcdGNvbnN0IG1vZGlmaWVkUmVzcG9uc2UgPSBhd2FpdCBob29rKFxuXHRcdFx0XHRcdHRoaXMucmVxdWVzdCxcblx0XHRcdFx0XHR0aGlzLl9vcHRpb25zLFxuXHRcdFx0XHRcdHRoaXMuX2RlY29yYXRlUmVzcG9uc2UocmVzcG9uc2UuY2xvbmUoKSlcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRpZiAobW9kaWZpZWRSZXNwb25zZSBpbnN0YW5jZW9mIGdsb2JhbHMuUmVzcG9uc2UpIHtcblx0XHRcdFx0XHRyZXNwb25zZSA9IG1vZGlmaWVkUmVzcG9uc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fZGVjb3JhdGVSZXNwb25zZShyZXNwb25zZSk7XG5cblx0XHRcdGlmICghcmVzcG9uc2Uub2sgJiYgdGhpcy5fb3B0aW9ucy50aHJvd0h0dHBFcnJvcnMpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEhUVFBFcnJvcihyZXNwb25zZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGBvbkRvd25sb2FkUHJvZ3Jlc3NgIGlzIHBhc3NlZCwgaXQgdXNlcyB0aGUgc3RyZWFtIEFQSSBpbnRlcm5hbGx5XG5cdFx0XHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRcdFx0aWYgKHRoaXMuX29wdGlvbnMub25Eb3dubG9hZFByb2dyZXNzKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5vbkRvd25sb2FkUHJvZ3Jlc3MgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgYG9uRG93bmxvYWRQcm9ncmVzc2Agb3B0aW9uIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFzdXBwb3J0c1N0cmVhbXMpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1N0cmVhbXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBlbnZpcm9ubWVudC4gYFJlYWRhYmxlU3RyZWFtYCBpcyBtaXNzaW5nLicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMuX3N0cmVhbShyZXNwb25zZS5jbG9uZSgpLCB0aGlzLl9vcHRpb25zLm9uRG93bmxvYWRQcm9ncmVzcyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHR9O1xuXG5cdFx0Y29uc3QgaXNSZXRyaWFibGVNZXRob2QgPSB0aGlzLl9vcHRpb25zLnJldHJ5Lm1ldGhvZHMuaW5jbHVkZXModGhpcy5yZXF1ZXN0Lm1ldGhvZC50b0xvd2VyQ2FzZSgpKTtcblx0XHRjb25zdCByZXN1bHQgPSBpc1JldHJpYWJsZU1ldGhvZCA/IHRoaXMuX3JldHJ5KGZuKSA6IGZuKCk7XG5cblx0XHRmb3IgKGNvbnN0IFt0eXBlLCBtaW1lVHlwZV0gb2YgT2JqZWN0LmVudHJpZXMocmVzcG9uc2VUeXBlcykpIHtcblx0XHRcdHJlc3VsdFt0eXBlXSA9IGFzeW5jICgpID0+IHtcblx0XHRcdFx0dGhpcy5yZXF1ZXN0LmhlYWRlcnMuc2V0KCdhY2NlcHQnLCB0aGlzLnJlcXVlc3QuaGVhZGVycy5nZXQoJ2FjY2VwdCcpIHx8IG1pbWVUeXBlKTtcblxuXHRcdFx0XHRjb25zdCByZXNwb25zZSA9IChhd2FpdCByZXN1bHQpLmNsb25lKCk7XG5cblx0XHRcdFx0aWYgKHR5cGUgPT09ICdqc29uJykge1xuXHRcdFx0XHRcdGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwNCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChvcHRpb25zLnBhcnNlSnNvbikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG9wdGlvbnMucGFyc2VKc29uKGF3YWl0IHJlc3BvbnNlLnRleHQoKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlW3R5cGVdKCk7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRfY2FsY3VsYXRlUmV0cnlEZWxheShlcnJvcikge1xuXHRcdHRoaXMuX3JldHJ5Q291bnQrKztcblxuXHRcdGlmICh0aGlzLl9yZXRyeUNvdW50IDwgdGhpcy5fb3B0aW9ucy5yZXRyeS5saW1pdCAmJiAhKGVycm9yIGluc3RhbmNlb2YgVGltZW91dEVycm9yKSkge1xuXHRcdFx0aWYgKGVycm9yIGluc3RhbmNlb2YgSFRUUEVycm9yKSB7XG5cdFx0XHRcdGlmICghdGhpcy5fb3B0aW9ucy5yZXRyeS5zdGF0dXNDb2Rlcy5pbmNsdWRlcyhlcnJvci5yZXNwb25zZS5zdGF0dXMpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCByZXRyeUFmdGVyID0gZXJyb3IucmVzcG9uc2UuaGVhZGVycy5nZXQoJ1JldHJ5LUFmdGVyJyk7XG5cdFx0XHRcdGlmIChyZXRyeUFmdGVyICYmIHRoaXMuX29wdGlvbnMucmV0cnkuYWZ0ZXJTdGF0dXNDb2Rlcy5pbmNsdWRlcyhlcnJvci5yZXNwb25zZS5zdGF0dXMpKSB7XG5cdFx0XHRcdFx0bGV0IGFmdGVyID0gTnVtYmVyKHJldHJ5QWZ0ZXIpO1xuXHRcdFx0XHRcdGlmIChOdW1iZXIuaXNOYU4oYWZ0ZXIpKSB7XG5cdFx0XHRcdFx0XHRhZnRlciA9IERhdGUucGFyc2UocmV0cnlBZnRlcikgLSBEYXRlLm5vdygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRhZnRlciAqPSAxMDAwO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5yZXRyeS5tYXhSZXRyeUFmdGVyICE9PSAndW5kZWZpbmVkJyAmJiBhZnRlciA+IHRoaXMuX29wdGlvbnMucmV0cnkubWF4UmV0cnlBZnRlcikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGFmdGVyO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDEzKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgQkFDS09GRl9GQUNUT1IgPSAwLjM7XG5cdFx0XHRyZXR1cm4gQkFDS09GRl9GQUNUT1IgKiAoMiAqKiAodGhpcy5fcmV0cnlDb3VudCAtIDEpKSAqIDEwMDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRfZGVjb3JhdGVSZXNwb25zZShyZXNwb25zZSkge1xuXHRcdGlmICh0aGlzLl9vcHRpb25zLnBhcnNlSnNvbikge1xuXHRcdFx0cmVzcG9uc2UuanNvbiA9IGFzeW5jICgpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX29wdGlvbnMucGFyc2VKc29uKGF3YWl0IHJlc3BvbnNlLnRleHQoKSk7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHJldHVybiByZXNwb25zZTtcblx0fVxuXG5cdGFzeW5jIF9yZXRyeShmbikge1xuXHRcdHRyeSB7XG5cdFx0XHRyZXR1cm4gYXdhaXQgZm4oKTtcblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0Y29uc3QgbXMgPSBNYXRoLm1pbih0aGlzLl9jYWxjdWxhdGVSZXRyeURlbGF5KGVycm9yKSwgbWF4U2FmZVRpbWVvdXQpO1xuXHRcdFx0aWYgKG1zICE9PSAwICYmIHRoaXMuX3JldHJ5Q291bnQgPiAwKSB7XG5cdFx0XHRcdGF3YWl0IGRlbGF5KG1zKTtcblxuXHRcdFx0XHRmb3IgKGNvbnN0IGhvb2sgb2YgdGhpcy5fb3B0aW9ucy5ob29rcy5iZWZvcmVSZXRyeSkge1xuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG5cdFx0XHRcdFx0Y29uc3QgaG9va1Jlc3VsdCA9IGF3YWl0IGhvb2soe1xuXHRcdFx0XHRcdFx0cmVxdWVzdDogdGhpcy5yZXF1ZXN0LFxuXHRcdFx0XHRcdFx0b3B0aW9uczogdGhpcy5fb3B0aW9ucyxcblx0XHRcdFx0XHRcdGVycm9yLFxuXHRcdFx0XHRcdFx0cmV0cnlDb3VudDogdGhpcy5fcmV0cnlDb3VudFxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Ly8gSWYgYHN0b3BgIGlzIHJldHVybmVkIGZyb20gdGhlIGhvb2ssIHRoZSByZXRyeSBwcm9jZXNzIGlzIHN0b3BwZWRcblx0XHRcdFx0XHRpZiAoaG9va1Jlc3VsdCA9PT0gc3RvcCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0aGlzLl9yZXRyeShmbik7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9vcHRpb25zLnRocm93SHR0cEVycm9ycykge1xuXHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhc3luYyBfZmV0Y2goKSB7XG5cdFx0Zm9yIChjb25zdCBob29rIG9mIHRoaXMuX29wdGlvbnMuaG9va3MuYmVmb3JlUmVxdWVzdCkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3Bcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGhvb2sodGhpcy5yZXF1ZXN0LCB0aGlzLl9vcHRpb25zKTtcblxuXHRcdFx0aWYgKHJlc3VsdCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcblx0XHRcdFx0dGhpcy5yZXF1ZXN0ID0gcmVzdWx0O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHJlc3VsdCBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29wdGlvbnMudGltZW91dCA9PT0gZmFsc2UpIHtcblx0XHRcdHJldHVybiB0aGlzLl9vcHRpb25zLmZldGNoKHRoaXMucmVxdWVzdC5jbG9uZSgpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGltZW91dCh0aGlzLnJlcXVlc3QuY2xvbmUoKSwgdGhpcy5hYm9ydENvbnRyb2xsZXIsIHRoaXMuX29wdGlvbnMpO1xuXHR9XG5cblx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0X3N0cmVhbShyZXNwb25zZSwgb25Eb3dubG9hZFByb2dyZXNzKSB7XG5cdFx0Y29uc3QgdG90YWxCeXRlcyA9IE51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSkgfHwgMDtcblx0XHRsZXQgdHJhbnNmZXJyZWRCeXRlcyA9IDA7XG5cblx0XHRyZXR1cm4gbmV3IGdsb2JhbHMuUmVzcG9uc2UoXG5cdFx0XHRuZXcgZ2xvYmFscy5SZWFkYWJsZVN0cmVhbSh7XG5cdFx0XHRcdHN0YXJ0KGNvbnRyb2xsZXIpIHtcblx0XHRcdFx0XHRjb25zdCByZWFkZXIgPSByZXNwb25zZS5ib2R5LmdldFJlYWRlcigpO1xuXG5cdFx0XHRcdFx0aWYgKG9uRG93bmxvYWRQcm9ncmVzcykge1xuXHRcdFx0XHRcdFx0b25Eb3dubG9hZFByb2dyZXNzKHtwZXJjZW50OiAwLCB0cmFuc2ZlcnJlZEJ5dGVzOiAwLCB0b3RhbEJ5dGVzfSwgbmV3IFVpbnQ4QXJyYXkoKSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YXN5bmMgZnVuY3Rpb24gcmVhZCgpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHtkb25lLCB2YWx1ZX0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuXHRcdFx0XHRcdFx0aWYgKGRvbmUpIHtcblx0XHRcdFx0XHRcdFx0Y29udHJvbGxlci5jbG9zZSgpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChvbkRvd25sb2FkUHJvZ3Jlc3MpIHtcblx0XHRcdFx0XHRcdFx0dHJhbnNmZXJyZWRCeXRlcyArPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBwZXJjZW50ID0gdG90YWxCeXRlcyA9PT0gMCA/IDAgOiB0cmFuc2ZlcnJlZEJ5dGVzIC8gdG90YWxCeXRlcztcblx0XHRcdFx0XHRcdFx0b25Eb3dubG9hZFByb2dyZXNzKHtwZXJjZW50LCB0cmFuc2ZlcnJlZEJ5dGVzLCB0b3RhbEJ5dGVzfSwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjb250cm9sbGVyLmVucXVldWUodmFsdWUpO1xuXHRcdFx0XHRcdFx0cmVhZCgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlYWQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHQpO1xuXHR9XG59XG5cbmNvbnN0IHZhbGlkYXRlQW5kTWVyZ2UgPSAoLi4uc291cmNlcykgPT4ge1xuXHRmb3IgKGNvbnN0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XG5cdFx0aWYgKCghaXNPYmplY3Qoc291cmNlKSB8fCBBcnJheS5pc0FycmF5KHNvdXJjZSkpICYmIHR5cGVvZiBzb3VyY2UgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgYG9wdGlvbnNgIGFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRlZXBNZXJnZSh7fSwgLi4uc291cmNlcyk7XG59O1xuXG5jb25zdCBjcmVhdGVJbnN0YW5jZSA9IGRlZmF1bHRzID0+IHtcblx0Y29uc3Qga3kgPSAoaW5wdXQsIG9wdGlvbnMpID0+IG5ldyBLeShpbnB1dCwgdmFsaWRhdGVBbmRNZXJnZShkZWZhdWx0cywgb3B0aW9ucykpO1xuXG5cdGZvciAoY29uc3QgbWV0aG9kIG9mIHJlcXVlc3RNZXRob2RzKSB7XG5cdFx0a3lbbWV0aG9kXSA9IChpbnB1dCwgb3B0aW9ucykgPT4gbmV3IEt5KGlucHV0LCB2YWxpZGF0ZUFuZE1lcmdlKGRlZmF1bHRzLCBvcHRpb25zLCB7bWV0aG9kfSkpO1xuXHR9XG5cblx0a3kuSFRUUEVycm9yID0gSFRUUEVycm9yO1xuXHRreS5UaW1lb3V0RXJyb3IgPSBUaW1lb3V0RXJyb3I7XG5cdGt5LmNyZWF0ZSA9IG5ld0RlZmF1bHRzID0+IGNyZWF0ZUluc3RhbmNlKHZhbGlkYXRlQW5kTWVyZ2UobmV3RGVmYXVsdHMpKTtcblx0a3kuZXh0ZW5kID0gbmV3RGVmYXVsdHMgPT4gY3JlYXRlSW5zdGFuY2UodmFsaWRhdGVBbmRNZXJnZShkZWZhdWx0cywgbmV3RGVmYXVsdHMpKTtcblx0a3kuc3RvcCA9IHN0b3A7XG5cblx0cmV0dXJuIGt5O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSW5zdGFuY2UoKTtcbiIsIi8qISBodHRwczovL210aHMuYmUvcHVueWNvZGUgdjEuMy4yIGJ5IEBtYXRoaWFzICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGVzICovXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiZcblx0XHQhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0IW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChcblx0XHRmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fFxuXHRcdGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC5zZWxmID09PSBmcmVlR2xvYmFsXG5cdCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBgcHVueWNvZGVgIG9iamVjdC5cblx0ICogQG5hbWUgcHVueWNvZGVcblx0ICogQHR5cGUgT2JqZWN0XG5cdCAqL1xuXHR2YXIgcHVueWNvZGUsXG5cblx0LyoqIEhpZ2hlc3QgcG9zaXRpdmUgc2lnbmVkIDMyLWJpdCBmbG9hdCB2YWx1ZSAqL1xuXHRtYXhJbnQgPSAyMTQ3NDgzNjQ3LCAvLyBha2EuIDB4N0ZGRkZGRkYgb3IgMl4zMS0xXG5cblx0LyoqIEJvb3RzdHJpbmcgcGFyYW1ldGVycyAqL1xuXHRiYXNlID0gMzYsXG5cdHRNaW4gPSAxLFxuXHR0TWF4ID0gMjYsXG5cdHNrZXcgPSAzOCxcblx0ZGFtcCA9IDcwMCxcblx0aW5pdGlhbEJpYXMgPSA3Mixcblx0aW5pdGlhbE4gPSAxMjgsIC8vIDB4ODBcblx0ZGVsaW1pdGVyID0gJy0nLCAvLyAnXFx4MkQnXG5cblx0LyoqIFJlZ3VsYXIgZXhwcmVzc2lvbnMgKi9cblx0cmVnZXhQdW55Y29kZSA9IC9eeG4tLS8sXG5cdHJlZ2V4Tm9uQVNDSUkgPSAvW15cXHgyMC1cXHg3RV0vLCAvLyB1bnByaW50YWJsZSBBU0NJSSBjaGFycyArIG5vbi1BU0NJSSBjaGFyc1xuXHRyZWdleFNlcGFyYXRvcnMgPSAvW1xceDJFXFx1MzAwMlxcdUZGMEVcXHVGRjYxXS9nLCAvLyBSRkMgMzQ5MCBzZXBhcmF0b3JzXG5cblx0LyoqIEVycm9yIG1lc3NhZ2VzICovXG5cdGVycm9ycyA9IHtcblx0XHQnb3ZlcmZsb3cnOiAnT3ZlcmZsb3c6IGlucHV0IG5lZWRzIHdpZGVyIGludGVnZXJzIHRvIHByb2Nlc3MnLFxuXHRcdCdub3QtYmFzaWMnOiAnSWxsZWdhbCBpbnB1dCA+PSAweDgwIChub3QgYSBiYXNpYyBjb2RlIHBvaW50KScsXG5cdFx0J2ludmFsaWQtaW5wdXQnOiAnSW52YWxpZCBpbnB1dCdcblx0fSxcblxuXHQvKiogQ29udmVuaWVuY2Ugc2hvcnRjdXRzICovXG5cdGJhc2VNaW51c1RNaW4gPSBiYXNlIC0gdE1pbixcblx0Zmxvb3IgPSBNYXRoLmZsb29yLFxuXHRzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLFxuXG5cdC8qKiBUZW1wb3JhcnkgdmFyaWFibGUgKi9cblx0a2V5O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgZXJyb3IgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIGVycm9yIHR5cGUuXG5cdCAqIEByZXR1cm5zIHtFcnJvcn0gVGhyb3dzIGEgYFJhbmdlRXJyb3JgIHdpdGggdGhlIGFwcGxpY2FibGUgZXJyb3IgbWVzc2FnZS5cblx0ICovXG5cdGZ1bmN0aW9uIGVycm9yKHR5cGUpIHtcblx0XHR0aHJvdyBSYW5nZUVycm9yKGVycm9yc1t0eXBlXSk7XG5cdH1cblxuXHQvKipcblx0ICogQSBnZW5lcmljIGBBcnJheSNtYXBgIHV0aWxpdHkgZnVuY3Rpb24uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeSBhcnJheVxuXHQgKiBpdGVtLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IGFycmF5IG9mIHZhbHVlcyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXAoYXJyYXksIGZuKSB7XG5cdFx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0d2hpbGUgKGxlbmd0aC0tKSB7XG5cdFx0XHRyZXN1bHRbbGVuZ3RoXSA9IGZuKGFycmF5W2xlbmd0aF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgc2ltcGxlIGBBcnJheSNtYXBgLWxpa2Ugd3JhcHBlciB0byB3b3JrIHdpdGggZG9tYWluIG5hbWUgc3RyaW5ncyBvciBlbWFpbFxuXHQgKiBhZGRyZXNzZXMuXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW4gVGhlIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeVxuXHQgKiBjaGFyYWN0ZXIuXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgc3RyaW5nIG9mIGNoYXJhY3RlcnMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrXG5cdCAqIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwRG9tYWluKHN0cmluZywgZm4pIHtcblx0XHR2YXIgcGFydHMgPSBzdHJpbmcuc3BsaXQoJ0AnKTtcblx0XHR2YXIgcmVzdWx0ID0gJyc7XG5cdFx0aWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdC8vIEluIGVtYWlsIGFkZHJlc3Nlcywgb25seSB0aGUgZG9tYWluIG5hbWUgc2hvdWxkIGJlIHB1bnljb2RlZC4gTGVhdmVcblx0XHRcdC8vIHRoZSBsb2NhbCBwYXJ0IChpLmUuIGV2ZXJ5dGhpbmcgdXAgdG8gYEBgKSBpbnRhY3QuXG5cdFx0XHRyZXN1bHQgPSBwYXJ0c1swXSArICdAJztcblx0XHRcdHN0cmluZyA9IHBhcnRzWzFdO1xuXHRcdH1cblx0XHQvLyBBdm9pZCBgc3BsaXQocmVnZXgpYCBmb3IgSUU4IGNvbXBhdGliaWxpdHkuIFNlZSAjMTcuXG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmVnZXhTZXBhcmF0b3JzLCAnXFx4MkUnKTtcblx0XHR2YXIgbGFiZWxzID0gc3RyaW5nLnNwbGl0KCcuJyk7XG5cdFx0dmFyIGVuY29kZWQgPSBtYXAobGFiZWxzLCBmbikuam9pbignLicpO1xuXHRcdHJldHVybiByZXN1bHQgKyBlbmNvZGVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgbnVtZXJpYyBjb2RlIHBvaW50cyBvZiBlYWNoIFVuaWNvZGVcblx0ICogY2hhcmFjdGVyIGluIHRoZSBzdHJpbmcuIFdoaWxlIEphdmFTY3JpcHQgdXNlcyBVQ1MtMiBpbnRlcm5hbGx5LFxuXHQgKiB0aGlzIGZ1bmN0aW9uIHdpbGwgY29udmVydCBhIHBhaXIgb2Ygc3Vycm9nYXRlIGhhbHZlcyAoZWFjaCBvZiB3aGljaFxuXHQgKiBVQ1MtMiBleHBvc2VzIGFzIHNlcGFyYXRlIGNoYXJhY3RlcnMpIGludG8gYSBzaW5nbGUgY29kZSBwb2ludCxcblx0ICogbWF0Y2hpbmcgVVRGLTE2LlxuXHQgKiBAc2VlIGBwdW55Y29kZS51Y3MyLmVuY29kZWBcblx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGRlY29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBVbmljb2RlIGlucHV0IHN0cmluZyAoVUNTLTIpLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBuZXcgYXJyYXkgb2YgY29kZSBwb2ludHMuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZGVjb2RlKHN0cmluZykge1xuXHRcdHZhciBvdXRwdXQgPSBbXSxcblx0XHQgICAgY291bnRlciA9IDAsXG5cdFx0ICAgIGxlbmd0aCA9IHN0cmluZy5sZW5ndGgsXG5cdFx0ICAgIHZhbHVlLFxuXHRcdCAgICBleHRyYTtcblx0XHR3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0dmFsdWUgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0XHQvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcblx0XHRcdFx0ZXh0cmEgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gbG93IHN1cnJvZ2F0ZVxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlIG5leHRcblx0XHRcdFx0XHQvLyBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXJcblx0XHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIHN0cmluZyBiYXNlZCBvbiBhbiBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAc2VlIGBwdW55Y29kZS51Y3MyLmRlY29kZWBcblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZW5jb2RlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGNvZGVQb2ludHMgVGhlIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBuZXcgVW5pY29kZSBzdHJpbmcgKFVDUy0yKS5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpIHtcblx0XHRyZXR1cm4gbWFwKGFycmF5LCBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdFx0aWYgKHZhbHVlID4gMHhGRkZGKSB7XG5cdFx0XHRcdHZhbHVlIC09IDB4MTAwMDA7XG5cdFx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO1xuXHRcdFx0XHR2YWx1ZSA9IDB4REMwMCB8IHZhbHVlICYgMHgzRkY7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlKTtcblx0XHRcdHJldHVybiBvdXRwdXQ7XG5cdFx0fSkuam9pbignJyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBiYXNpYyBjb2RlIHBvaW50IGludG8gYSBkaWdpdC9pbnRlZ2VyLlxuXHQgKiBAc2VlIGBkaWdpdFRvQmFzaWMoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGNvZGVQb2ludCBUaGUgYmFzaWMgbnVtZXJpYyBjb2RlIHBvaW50IHZhbHVlLlxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQgKGZvciB1c2UgaW5cblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpbiB0aGUgcmFuZ2UgYDBgIHRvIGBiYXNlIC0gMWAsIG9yIGBiYXNlYCBpZlxuXHQgKiB0aGUgY29kZSBwb2ludCBkb2VzIG5vdCByZXByZXNlbnQgYSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGJhc2ljVG9EaWdpdChjb2RlUG9pbnQpIHtcblx0XHRpZiAoY29kZVBvaW50IC0gNDggPCAxMCkge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDIyO1xuXHRcdH1cblx0XHRpZiAoY29kZVBvaW50IC0gNjUgPCAyNikge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDY1O1xuXHRcdH1cblx0XHRpZiAoY29kZVBvaW50IC0gOTcgPCAyNikge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDk3O1xuXHRcdH1cblx0XHRyZXR1cm4gYmFzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGRpZ2l0L2ludGVnZXIgaW50byBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEBzZWUgYGJhc2ljVG9EaWdpdCgpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGlnaXQgVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYmFzaWMgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSAod2hlbiB1c2VkIGZvclxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGlzIGBkaWdpdGAsIHdoaWNoIG5lZWRzIHRvIGJlIGluIHRoZSByYW5nZVxuXHQgKiBgMGAgdG8gYGJhc2UgLSAxYC4gSWYgYGZsYWdgIGlzIG5vbi16ZXJvLCB0aGUgdXBwZXJjYXNlIGZvcm0gaXNcblx0ICogdXNlZDsgZWxzZSwgdGhlIGxvd2VyY2FzZSBmb3JtIGlzIHVzZWQuIFRoZSBiZWhhdmlvciBpcyB1bmRlZmluZWRcblx0ICogaWYgYGZsYWdgIGlzIG5vbi16ZXJvIGFuZCBgZGlnaXRgIGhhcyBubyB1cHBlcmNhc2UgZm9ybS5cblx0ICovXG5cdGZ1bmN0aW9uIGRpZ2l0VG9CYXNpYyhkaWdpdCwgZmxhZykge1xuXHRcdC8vICAwLi4yNSBtYXAgdG8gQVNDSUkgYS4ueiBvciBBLi5aXG5cdFx0Ly8gMjYuLjM1IG1hcCB0byBBU0NJSSAwLi45XG5cdFx0cmV0dXJuIGRpZ2l0ICsgMjIgKyA3NSAqIChkaWdpdCA8IDI2KSAtICgoZmxhZyAhPSAwKSA8PCA1KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCaWFzIGFkYXB0YXRpb24gZnVuY3Rpb24gYXMgcGVyIHNlY3Rpb24gMy40IG9mIFJGQyAzNDkyLlxuXHQgKiBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzNDkyI3NlY3Rpb24tMy40XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRmdW5jdGlvbiBhZGFwdChkZWx0YSwgbnVtUG9pbnRzLCBmaXJzdFRpbWUpIHtcblx0XHR2YXIgayA9IDA7XG5cdFx0ZGVsdGEgPSBmaXJzdFRpbWUgPyBmbG9vcihkZWx0YSAvIGRhbXApIDogZGVsdGEgPj4gMTtcblx0XHRkZWx0YSArPSBmbG9vcihkZWx0YSAvIG51bVBvaW50cyk7XG5cdFx0Zm9yICgvKiBubyBpbml0aWFsaXphdGlvbiAqLzsgZGVsdGEgPiBiYXNlTWludXNUTWluICogdE1heCA+PiAxOyBrICs9IGJhc2UpIHtcblx0XHRcdGRlbHRhID0gZmxvb3IoZGVsdGEgLyBiYXNlTWludXNUTWluKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZsb29yKGsgKyAoYmFzZU1pbnVzVE1pbiArIDEpICogZGVsdGEgLyAoZGVsdGEgKyBza2V3KSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzIHRvIGEgc3RyaW5nIG9mIFVuaWNvZGVcblx0ICogc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG5cdFx0Ly8gRG9uJ3QgdXNlIFVDUy0yXG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aCxcblx0XHQgICAgb3V0LFxuXHRcdCAgICBpID0gMCxcblx0XHQgICAgbiA9IGluaXRpYWxOLFxuXHRcdCAgICBiaWFzID0gaW5pdGlhbEJpYXMsXG5cdFx0ICAgIGJhc2ljLFxuXHRcdCAgICBqLFxuXHRcdCAgICBpbmRleCxcblx0XHQgICAgb2xkaSxcblx0XHQgICAgdyxcblx0XHQgICAgayxcblx0XHQgICAgZGlnaXQsXG5cdFx0ICAgIHQsXG5cdFx0ICAgIC8qKiBDYWNoZWQgY2FsY3VsYXRpb24gcmVzdWx0cyAqL1xuXHRcdCAgICBiYXNlTWludXNUO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50czogbGV0IGBiYXNpY2AgYmUgdGhlIG51bWJlciBvZiBpbnB1dCBjb2RlXG5cdFx0Ly8gcG9pbnRzIGJlZm9yZSB0aGUgbGFzdCBkZWxpbWl0ZXIsIG9yIGAwYCBpZiB0aGVyZSBpcyBub25lLCB0aGVuIGNvcHlcblx0XHQvLyB0aGUgZmlyc3QgYmFzaWMgY29kZSBwb2ludHMgdG8gdGhlIG91dHB1dC5cblxuXHRcdGJhc2ljID0gaW5wdXQubGFzdEluZGV4T2YoZGVsaW1pdGVyKTtcblx0XHRpZiAoYmFzaWMgPCAwKSB7XG5cdFx0XHRiYXNpYyA9IDA7XG5cdFx0fVxuXG5cdFx0Zm9yIChqID0gMDsgaiA8IGJhc2ljOyArK2opIHtcblx0XHRcdC8vIGlmIGl0J3Mgbm90IGEgYmFzaWMgY29kZSBwb2ludFxuXHRcdFx0aWYgKGlucHV0LmNoYXJDb2RlQXQoaikgPj0gMHg4MCkge1xuXHRcdFx0XHRlcnJvcignbm90LWJhc2ljJyk7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQucHVzaChpbnB1dC5jaGFyQ29kZUF0KGopKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGRlY29kaW5nIGxvb3A6IHN0YXJ0IGp1c3QgYWZ0ZXIgdGhlIGxhc3QgZGVsaW1pdGVyIGlmIGFueSBiYXNpYyBjb2RlXG5cdFx0Ly8gcG9pbnRzIHdlcmUgY29waWVkOyBzdGFydCBhdCB0aGUgYmVnaW5uaW5nIG90aGVyd2lzZS5cblxuXHRcdGZvciAoaW5kZXggPSBiYXNpYyA+IDAgPyBiYXNpYyArIDEgOiAwOyBpbmRleCA8IGlucHV0TGVuZ3RoOyAvKiBubyBmaW5hbCBleHByZXNzaW9uICovKSB7XG5cblx0XHRcdC8vIGBpbmRleGAgaXMgdGhlIGluZGV4IG9mIHRoZSBuZXh0IGNoYXJhY3RlciB0byBiZSBjb25zdW1lZC5cblx0XHRcdC8vIERlY29kZSBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyIGludG8gYGRlbHRhYCxcblx0XHRcdC8vIHdoaWNoIGdldHMgYWRkZWQgdG8gYGlgLiBUaGUgb3ZlcmZsb3cgY2hlY2tpbmcgaXMgZWFzaWVyXG5cdFx0XHQvLyBpZiB3ZSBpbmNyZWFzZSBgaWAgYXMgd2UgZ28sIHRoZW4gc3VidHJhY3Qgb2ZmIGl0cyBzdGFydGluZ1xuXHRcdFx0Ly8gdmFsdWUgYXQgdGhlIGVuZCB0byBvYnRhaW4gYGRlbHRhYC5cblx0XHRcdGZvciAob2xkaSA9IGksIHcgPSAxLCBrID0gYmFzZTsgLyogbm8gY29uZGl0aW9uICovOyBrICs9IGJhc2UpIHtcblxuXHRcdFx0XHRpZiAoaW5kZXggPj0gaW5wdXRMZW5ndGgpIHtcblx0XHRcdFx0XHRlcnJvcignaW52YWxpZC1pbnB1dCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGlnaXQgPSBiYXNpY1RvRGlnaXQoaW5wdXQuY2hhckNvZGVBdChpbmRleCsrKSk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0ID49IGJhc2UgfHwgZGlnaXQgPiBmbG9vcigobWF4SW50IC0gaSkgLyB3KSkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aSArPSBkaWdpdCAqIHc7XG5cdFx0XHRcdHQgPSBrIDw9IGJpYXMgPyB0TWluIDogKGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXMpO1xuXG5cdFx0XHRcdGlmIChkaWdpdCA8IHQpIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0aWYgKHcgPiBmbG9vcihtYXhJbnQgLyBiYXNlTWludXNUKSkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dyAqPSBiYXNlTWludXNUO1xuXG5cdFx0XHR9XG5cblx0XHRcdG91dCA9IG91dHB1dC5sZW5ndGggKyAxO1xuXHRcdFx0YmlhcyA9IGFkYXB0KGkgLSBvbGRpLCBvdXQsIG9sZGkgPT0gMCk7XG5cblx0XHRcdC8vIGBpYCB3YXMgc3VwcG9zZWQgdG8gd3JhcCBhcm91bmQgZnJvbSBgb3V0YCB0byBgMGAsXG5cdFx0XHQvLyBpbmNyZW1lbnRpbmcgYG5gIGVhY2ggdGltZSwgc28gd2UnbGwgZml4IHRoYXQgbm93OlxuXHRcdFx0aWYgKGZsb29yKGkgLyBvdXQpID4gbWF4SW50IC0gbikge1xuXHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0biArPSBmbG9vcihpIC8gb3V0KTtcblx0XHRcdGkgJT0gb3V0O1xuXG5cdFx0XHQvLyBJbnNlcnQgYG5gIGF0IHBvc2l0aW9uIGBpYCBvZiB0aGUgb3V0cHV0XG5cdFx0XHRvdXRwdXQuc3BsaWNlKGkrKywgMCwgbik7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdWNzMmVuY29kZShvdXRwdXQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scyAoZS5nLiBhIGRvbWFpbiBuYW1lIGxhYmVsKSB0byBhXG5cdCAqIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICovXG5cdGZ1bmN0aW9uIGVuY29kZShpbnB1dCkge1xuXHRcdHZhciBuLFxuXHRcdCAgICBkZWx0YSxcblx0XHQgICAgaGFuZGxlZENQQ291bnQsXG5cdFx0ICAgIGJhc2ljTGVuZ3RoLFxuXHRcdCAgICBiaWFzLFxuXHRcdCAgICBqLFxuXHRcdCAgICBtLFxuXHRcdCAgICBxLFxuXHRcdCAgICBrLFxuXHRcdCAgICB0LFxuXHRcdCAgICBjdXJyZW50VmFsdWUsXG5cdFx0ICAgIG91dHB1dCA9IFtdLFxuXHRcdCAgICAvKiogYGlucHV0TGVuZ3RoYCB3aWxsIGhvbGQgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyBpbiBgaW5wdXRgLiAqL1xuXHRcdCAgICBpbnB1dExlbmd0aCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGhhbmRsZWRDUENvdW50UGx1c09uZSxcblx0XHQgICAgYmFzZU1pbnVzVCxcblx0XHQgICAgcU1pbnVzVDtcblxuXHRcdC8vIENvbnZlcnQgdGhlIGlucHV0IGluIFVDUy0yIHRvIFVuaWNvZGVcblx0XHRpbnB1dCA9IHVjczJkZWNvZGUoaW5wdXQpO1xuXG5cdFx0Ly8gQ2FjaGUgdGhlIGxlbmd0aFxuXHRcdGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgc3RhdGVcblx0XHRuID0gaW5pdGlhbE47XG5cdFx0ZGVsdGEgPSAwO1xuXHRcdGJpYXMgPSBpbml0aWFsQmlhcztcblxuXHRcdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHNcblx0XHRmb3IgKGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cdFx0XHRpZiAoY3VycmVudFZhbHVlIDwgMHg4MCkge1xuXHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoY3VycmVudFZhbHVlKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aGFuZGxlZENQQ291bnQgPSBiYXNpY0xlbmd0aCA9IG91dHB1dC5sZW5ndGg7XG5cblx0XHQvLyBgaGFuZGxlZENQQ291bnRgIGlzIHRoZSBudW1iZXIgb2YgY29kZSBwb2ludHMgdGhhdCBoYXZlIGJlZW4gaGFuZGxlZDtcblx0XHQvLyBgYmFzaWNMZW5ndGhgIGlzIHRoZSBudW1iZXIgb2YgYmFzaWMgY29kZSBwb2ludHMuXG5cblx0XHQvLyBGaW5pc2ggdGhlIGJhc2ljIHN0cmluZyAtIGlmIGl0IGlzIG5vdCBlbXB0eSAtIHdpdGggYSBkZWxpbWl0ZXJcblx0XHRpZiAoYmFzaWNMZW5ndGgpIHtcblx0XHRcdG91dHB1dC5wdXNoKGRlbGltaXRlcik7XG5cdFx0fVxuXG5cdFx0Ly8gTWFpbiBlbmNvZGluZyBsb29wOlxuXHRcdHdoaWxlIChoYW5kbGVkQ1BDb3VudCA8IGlucHV0TGVuZ3RoKSB7XG5cblx0XHRcdC8vIEFsbCBub24tYmFzaWMgY29kZSBwb2ludHMgPCBuIGhhdmUgYmVlbiBoYW5kbGVkIGFscmVhZHkuIEZpbmQgdGhlIG5leHRcblx0XHRcdC8vIGxhcmdlciBvbmU6XG5cdFx0XHRmb3IgKG0gPSBtYXhJbnQsIGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA+PSBuICYmIGN1cnJlbnRWYWx1ZSA8IG0pIHtcblx0XHRcdFx0XHRtID0gY3VycmVudFZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEluY3JlYXNlIGBkZWx0YWAgZW5vdWdoIHRvIGFkdmFuY2UgdGhlIGRlY29kZXIncyA8bixpPiBzdGF0ZSB0byA8bSwwPixcblx0XHRcdC8vIGJ1dCBndWFyZCBhZ2FpbnN0IG92ZXJmbG93XG5cdFx0XHRoYW5kbGVkQ1BDb3VudFBsdXNPbmUgPSBoYW5kbGVkQ1BDb3VudCArIDE7XG5cdFx0XHRpZiAobSAtIG4gPiBmbG9vcigobWF4SW50IC0gZGVsdGEpIC8gaGFuZGxlZENQQ291bnRQbHVzT25lKSkge1xuXHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdH1cblxuXHRcdFx0ZGVsdGEgKz0gKG0gLSBuKSAqIGhhbmRsZWRDUENvdW50UGx1c09uZTtcblx0XHRcdG4gPSBtO1xuXG5cdFx0XHRmb3IgKGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlIDwgbiAmJiArK2RlbHRhID4gbWF4SW50KSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID09IG4pIHtcblx0XHRcdFx0XHQvLyBSZXByZXNlbnQgZGVsdGEgYXMgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlclxuXHRcdFx0XHRcdGZvciAocSA9IGRlbHRhLCBrID0gYmFzZTsgLyogbm8gY29uZGl0aW9uICovOyBrICs9IGJhc2UpIHtcblx0XHRcdFx0XHRcdHQgPSBrIDw9IGJpYXMgPyB0TWluIDogKGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXMpO1xuXHRcdFx0XHRcdFx0aWYgKHEgPCB0KSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cU1pbnVzVCA9IHEgLSB0O1xuXHRcdFx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRcdFx0b3V0cHV0LnB1c2goXG5cdFx0XHRcdFx0XHRcdHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWModCArIHFNaW51c1QgJSBiYXNlTWludXNULCAwKSlcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRxID0gZmxvb3IocU1pbnVzVCAvIGJhc2VNaW51c1QpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWMocSwgMCkpKTtcblx0XHRcdFx0XHRiaWFzID0gYWRhcHQoZGVsdGEsIGhhbmRsZWRDUENvdW50UGx1c09uZSwgaGFuZGxlZENQQ291bnQgPT0gYmFzaWNMZW5ndGgpO1xuXHRcdFx0XHRcdGRlbHRhID0gMDtcblx0XHRcdFx0XHQrK2hhbmRsZWRDUENvdW50O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdCsrZGVsdGE7XG5cdFx0XHQrK247XG5cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dC5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSBvciBhbiBlbWFpbCBhZGRyZXNzXG5cdCAqIHRvIFVuaWNvZGUuIE9ubHkgdGhlIFB1bnljb2RlZCBwYXJ0cyBvZiB0aGUgaW5wdXQgd2lsbCBiZSBjb252ZXJ0ZWQsIGkuZS5cblx0ICogaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgb24gYSBzdHJpbmcgdGhhdCBoYXMgYWxyZWFkeSBiZWVuXG5cdCAqIGNvbnZlcnRlZCB0byBVbmljb2RlLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZWQgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0b1xuXHQgKiBjb252ZXJ0IHRvIFVuaWNvZGUuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBVbmljb2RlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiBQdW55Y29kZVxuXHQgKiBzdHJpbmcuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b1VuaWNvZGUoaW5wdXQpIHtcblx0XHRyZXR1cm4gbWFwRG9tYWluKGlucHV0LCBmdW5jdGlvbihzdHJpbmcpIHtcblx0XHRcdHJldHVybiByZWdleFB1bnljb2RlLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHQ/IGRlY29kZShzdHJpbmcuc2xpY2UoNCkudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0OiBzdHJpbmc7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBVbmljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSBvciBhbiBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIFB1bnljb2RlLiBPbmx5IHRoZSBub24tQVNDSUkgcGFydHMgb2YgdGhlIGRvbWFpbiBuYW1lIHdpbGwgYmUgY29udmVydGVkLFxuXHQgKiBpLmUuIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCdzIGFscmVhZHkgaW5cblx0ICogQVNDSUkuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG8gY29udmVydCwgYXMgYVxuXHQgKiBVbmljb2RlIHN0cmluZy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFB1bnljb2RlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiBkb21haW4gbmFtZSBvclxuXHQgKiBlbWFpbCBhZGRyZXNzLlxuXHQgKi9cblx0ZnVuY3Rpb24gdG9BU0NJSShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4Tm9uQVNDSUkudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gJ3huLS0nICsgZW5jb2RlKHN0cmluZylcblx0XHRcdFx0OiBzdHJpbmc7XG5cdFx0fSk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKiogRGVmaW5lIHRoZSBwdWJsaWMgQVBJICovXG5cdHB1bnljb2RlID0ge1xuXHRcdC8qKlxuXHRcdCAqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBQdW55Y29kZS5qcyB2ZXJzaW9uIG51bWJlci5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0XHQgKiBAdHlwZSBTdHJpbmdcblx0XHQgKi9cblx0XHQndmVyc2lvbic6ICcxLjMuMicsXG5cdFx0LyoqXG5cdFx0ICogQW4gb2JqZWN0IG9mIG1ldGhvZHMgdG8gY29udmVydCBmcm9tIEphdmFTY3JpcHQncyBpbnRlcm5hbCBjaGFyYWN0ZXJcblx0XHQgKiByZXByZXNlbnRhdGlvbiAoVUNTLTIpIHRvIFVuaWNvZGUgY29kZSBwb2ludHMsIGFuZCBiYWNrLlxuXHRcdCAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIE9iamVjdFxuXHRcdCAqL1xuXHRcdCd1Y3MyJzoge1xuXHRcdFx0J2RlY29kZSc6IHVjczJkZWNvZGUsXG5cdFx0XHQnZW5jb2RlJzogdWNzMmVuY29kZVxuXHRcdH0sXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQnZW5jb2RlJzogZW5jb2RlLFxuXHRcdCd0b0FTQ0lJJzogdG9BU0NJSSxcblx0XHQndG9Vbmljb2RlJzogdG9Vbmljb2RlXG5cdH07XG5cblx0LyoqIEV4cG9zZSBgcHVueWNvZGVgICovXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKCdwdW55Y29kZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHB1bnljb2RlO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmIGZyZWVNb2R1bGUpIHtcblx0XHRpZiAobW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IHB1bnljb2RlO1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKGtleSBpbiBwdW55Y29kZSkge1xuXHRcdFx0XHRwdW55Y29kZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gcHVueWNvZGVba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC5wdW55Y29kZSA9IHB1bnljb2RlO1xuXHR9XG5cbn0odGhpcykpO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeVByaW1pdGl2ZSA9IGZ1bmN0aW9uKHYpIHtcbiAgc3dpdGNoICh0eXBlb2Ygdikge1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdjtcblxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHYgPyAndHJ1ZScgOiAnZmFsc2UnO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBpc0Zpbml0ZSh2KSA/IHYgOiAnJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgb2JqID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGZ1bmN0aW9uKGspIHtcbiAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmpba10pKSB7XG4gICAgICAgIHJldHVybiBvYmpba10ubWFwKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcbiAgICAgICAgfSkuam9pbihzZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcbiAgICAgIH1cbiAgICB9KS5qb2luKHNlcCk7XG5cbiAgfVxuXG4gIGlmICghbmFtZSkgcmV0dXJuICcnO1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXG4gICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9iaikpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xuIiwiZnVuY3Rpb24gbm9ybWFsaXplIChzdHIpIHtcbiAgcmV0dXJuIHN0clxuICAgICAgICAgIC5yZXBsYWNlKC9bXFwvXSsvZywgJy8nKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXC9cXD8vZywgJz8nKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXC9cXCMvZywgJyMnKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXDpcXC8vZywgJzovLycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGpvaW5lZCA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKS5qb2luKCcvJyk7XG4gIHJldHVybiBub3JtYWxpemUoam9pbmVkKTtcbn07IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHB1bnljb2RlID0gcmVxdWlyZSgncHVueWNvZGUnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmV4cG9ydHMucGFyc2UgPSB1cmxQYXJzZTtcbmV4cG9ydHMucmVzb2x2ZSA9IHVybFJlc29sdmU7XG5leHBvcnRzLnJlc29sdmVPYmplY3QgPSB1cmxSZXNvbHZlT2JqZWN0O1xuZXhwb3J0cy5mb3JtYXQgPSB1cmxGb3JtYXQ7XG5cbmV4cG9ydHMuVXJsID0gVXJsO1xuXG5mdW5jdGlvbiBVcmwoKSB7XG4gIHRoaXMucHJvdG9jb2wgPSBudWxsO1xuICB0aGlzLnNsYXNoZXMgPSBudWxsO1xuICB0aGlzLmF1dGggPSBudWxsO1xuICB0aGlzLmhvc3QgPSBudWxsO1xuICB0aGlzLnBvcnQgPSBudWxsO1xuICB0aGlzLmhvc3RuYW1lID0gbnVsbDtcbiAgdGhpcy5oYXNoID0gbnVsbDtcbiAgdGhpcy5zZWFyY2ggPSBudWxsO1xuICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgdGhpcy5wYXRobmFtZSA9IG51bGw7XG4gIHRoaXMucGF0aCA9IG51bGw7XG4gIHRoaXMuaHJlZiA9IG51bGw7XG59XG5cbi8vIFJlZmVyZW5jZTogUkZDIDM5ODYsIFJGQyAxODA4LCBSRkMgMjM5NlxuXG4vLyBkZWZpbmUgdGhlc2UgaGVyZSBzbyBhdCBsZWFzdCB0aGV5IG9ubHkgaGF2ZSB0byBiZVxuLy8gY29tcGlsZWQgb25jZSBvbiB0aGUgZmlyc3QgbW9kdWxlIGxvYWQuXG52YXIgcHJvdG9jb2xQYXR0ZXJuID0gL14oW2EtejAtOS4rLV0rOikvaSxcbiAgICBwb3J0UGF0dGVybiA9IC86WzAtOV0qJC8sXG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIGEgc2ltcGxlIHBhdGggVVJMXG4gICAgc2ltcGxlUGF0aFBhdHRlcm4gPSAvXihcXC9cXC8/KD8hXFwvKVteXFw/XFxzXSopKFxcP1teXFxzXSopPyQvLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgcmVzZXJ2ZWQgZm9yIGRlbGltaXRpbmcgVVJMcy5cbiAgICAvLyBXZSBhY3R1YWxseSBqdXN0IGF1dG8tZXNjYXBlIHRoZXNlLlxuICAgIGRlbGltcyA9IFsnPCcsICc+JywgJ1wiJywgJ2AnLCAnICcsICdcXHInLCAnXFxuJywgJ1xcdCddLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgbm90IGFsbG93ZWQgZm9yIHZhcmlvdXMgcmVhc29ucy5cbiAgICB1bndpc2UgPSBbJ3snLCAnfScsICd8JywgJ1xcXFwnLCAnXicsICdgJ10uY29uY2F0KGRlbGltcyksXG5cbiAgICAvLyBBbGxvd2VkIGJ5IFJGQ3MsIGJ1dCBjYXVzZSBvZiBYU1MgYXR0YWNrcy4gIEFsd2F5cyBlc2NhcGUgdGhlc2UuXG4gICAgYXV0b0VzY2FwZSA9IFsnXFwnJ10uY29uY2F0KHVud2lzZSksXG4gICAgLy8gQ2hhcmFjdGVycyB0aGF0IGFyZSBuZXZlciBldmVyIGFsbG93ZWQgaW4gYSBob3N0bmFtZS5cbiAgICAvLyBOb3RlIHRoYXQgYW55IGludmFsaWQgY2hhcnMgYXJlIGFsc28gaGFuZGxlZCwgYnV0IHRoZXNlXG4gICAgLy8gYXJlIHRoZSBvbmVzIHRoYXQgYXJlICpleHBlY3RlZCogdG8gYmUgc2Vlbiwgc28gd2UgZmFzdC1wYXRoXG4gICAgLy8gdGhlbS5cbiAgICBub25Ib3N0Q2hhcnMgPSBbJyUnLCAnLycsICc/JywgJzsnLCAnIyddLmNvbmNhdChhdXRvRXNjYXBlKSxcbiAgICBob3N0RW5kaW5nQ2hhcnMgPSBbJy8nLCAnPycsICcjJ10sXG4gICAgaG9zdG5hbWVNYXhMZW4gPSAyNTUsXG4gICAgaG9zdG5hbWVQYXJ0UGF0dGVybiA9IC9eWythLXowLTlBLVpfLV17MCw2M30kLyxcbiAgICBob3N0bmFtZVBhcnRTdGFydCA9IC9eKFsrYS16MC05QS1aXy1dezAsNjN9KSguKikkLyxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBjYW4gYWxsb3cgXCJ1bnNhZmVcIiBhbmQgXCJ1bndpc2VcIiBjaGFycy5cbiAgICB1bnNhZmVQcm90b2NvbCA9IHtcbiAgICAgICdqYXZhc2NyaXB0JzogdHJ1ZSxcbiAgICAgICdqYXZhc2NyaXB0Oic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IG5ldmVyIGhhdmUgYSBob3N0bmFtZS5cbiAgICBob3N0bGVzc1Byb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgYWx3YXlzIGNvbnRhaW4gYSAvLyBiaXQuXG4gICAgc2xhc2hlZFByb3RvY29sID0ge1xuICAgICAgJ2h0dHAnOiB0cnVlLFxuICAgICAgJ2h0dHBzJzogdHJ1ZSxcbiAgICAgICdmdHAnOiB0cnVlLFxuICAgICAgJ2dvcGhlcic6IHRydWUsXG4gICAgICAnZmlsZSc6IHRydWUsXG4gICAgICAnaHR0cDonOiB0cnVlLFxuICAgICAgJ2h0dHBzOic6IHRydWUsXG4gICAgICAnZnRwOic6IHRydWUsXG4gICAgICAnZ29waGVyOic6IHRydWUsXG4gICAgICAnZmlsZTonOiB0cnVlXG4gICAgfSxcbiAgICBxdWVyeXN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJyk7XG5cbmZ1bmN0aW9uIHVybFBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKHVybCAmJiB1dGlsLmlzT2JqZWN0KHVybCkgJiYgdXJsIGluc3RhbmNlb2YgVXJsKSByZXR1cm4gdXJsO1xuXG4gIHZhciB1ID0gbmV3IFVybDtcbiAgdS5wYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KTtcbiAgcmV0dXJuIHU7XG59XG5cblVybC5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbih1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG4gIGlmICghdXRpbC5pc1N0cmluZyh1cmwpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlBhcmFtZXRlciAndXJsJyBtdXN0IGJlIGEgc3RyaW5nLCBub3QgXCIgKyB0eXBlb2YgdXJsKTtcbiAgfVxuXG4gIC8vIENvcHkgY2hyb21lLCBJRSwgb3BlcmEgYmFja3NsYXNoLWhhbmRsaW5nIGJlaGF2aW9yLlxuICAvLyBCYWNrIHNsYXNoZXMgYmVmb3JlIHRoZSBxdWVyeSBzdHJpbmcgZ2V0IGNvbnZlcnRlZCB0byBmb3J3YXJkIHNsYXNoZXNcbiAgLy8gU2VlOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MjU5MTZcbiAgdmFyIHF1ZXJ5SW5kZXggPSB1cmwuaW5kZXhPZignPycpLFxuICAgICAgc3BsaXR0ZXIgPVxuICAgICAgICAgIChxdWVyeUluZGV4ICE9PSAtMSAmJiBxdWVyeUluZGV4IDwgdXJsLmluZGV4T2YoJyMnKSkgPyAnPycgOiAnIycsXG4gICAgICB1U3BsaXQgPSB1cmwuc3BsaXQoc3BsaXR0ZXIpLFxuICAgICAgc2xhc2hSZWdleCA9IC9cXFxcL2c7XG4gIHVTcGxpdFswXSA9IHVTcGxpdFswXS5yZXBsYWNlKHNsYXNoUmVnZXgsICcvJyk7XG4gIHVybCA9IHVTcGxpdC5qb2luKHNwbGl0dGVyKTtcblxuICB2YXIgcmVzdCA9IHVybDtcblxuICAvLyB0cmltIGJlZm9yZSBwcm9jZWVkaW5nLlxuICAvLyBUaGlzIGlzIHRvIHN1cHBvcnQgcGFyc2Ugc3R1ZmYgbGlrZSBcIiAgaHR0cDovL2Zvby5jb20gIFxcblwiXG4gIHJlc3QgPSByZXN0LnRyaW0oKTtcblxuICBpZiAoIXNsYXNoZXNEZW5vdGVIb3N0ICYmIHVybC5zcGxpdCgnIycpLmxlbmd0aCA9PT0gMSkge1xuICAgIC8vIFRyeSBmYXN0IHBhdGggcmVnZXhwXG4gICAgdmFyIHNpbXBsZVBhdGggPSBzaW1wbGVQYXRoUGF0dGVybi5leGVjKHJlc3QpO1xuICAgIGlmIChzaW1wbGVQYXRoKSB7XG4gICAgICB0aGlzLnBhdGggPSByZXN0O1xuICAgICAgdGhpcy5ocmVmID0gcmVzdDtcbiAgICAgIHRoaXMucGF0aG5hbWUgPSBzaW1wbGVQYXRoWzFdO1xuICAgICAgaWYgKHNpbXBsZVBhdGhbMl0pIHtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSBzaW1wbGVQYXRoWzJdO1xuICAgICAgICBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeXN0cmluZy5wYXJzZSh0aGlzLnNlYXJjaC5zdWJzdHIoMSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucXVlcnkgPSB0aGlzLnNlYXJjaC5zdWJzdHIoMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0ge307XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cblxuICB2YXIgcHJvdG8gPSBwcm90b2NvbFBhdHRlcm4uZXhlYyhyZXN0KTtcbiAgaWYgKHByb3RvKSB7XG4gICAgcHJvdG8gPSBwcm90b1swXTtcbiAgICB2YXIgbG93ZXJQcm90byA9IHByb3RvLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5wcm90b2NvbCA9IGxvd2VyUHJvdG87XG4gICAgcmVzdCA9IHJlc3Quc3Vic3RyKHByb3RvLmxlbmd0aCk7XG4gIH1cblxuICAvLyBmaWd1cmUgb3V0IGlmIGl0J3MgZ290IGEgaG9zdFxuICAvLyB1c2VyQHNlcnZlciBpcyAqYWx3YXlzKiBpbnRlcnByZXRlZCBhcyBhIGhvc3RuYW1lLCBhbmQgdXJsXG4gIC8vIHJlc29sdXRpb24gd2lsbCB0cmVhdCAvL2Zvby9iYXIgYXMgaG9zdD1mb28scGF0aD1iYXIgYmVjYXVzZSB0aGF0J3NcbiAgLy8gaG93IHRoZSBicm93c2VyIHJlc29sdmVzIHJlbGF0aXZlIFVSTHMuXG4gIGlmIChzbGFzaGVzRGVub3RlSG9zdCB8fCBwcm90byB8fCByZXN0Lm1hdGNoKC9eXFwvXFwvW15AXFwvXStAW15AXFwvXSsvKSkge1xuICAgIHZhciBzbGFzaGVzID0gcmVzdC5zdWJzdHIoMCwgMikgPT09ICcvLyc7XG4gICAgaWYgKHNsYXNoZXMgJiYgIShwcm90byAmJiBob3N0bGVzc1Byb3RvY29sW3Byb3RvXSkpIHtcbiAgICAgIHJlc3QgPSByZXN0LnN1YnN0cigyKTtcbiAgICAgIHRoaXMuc2xhc2hlcyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFob3N0bGVzc1Byb3RvY29sW3Byb3RvXSAmJlxuICAgICAgKHNsYXNoZXMgfHwgKHByb3RvICYmICFzbGFzaGVkUHJvdG9jb2xbcHJvdG9dKSkpIHtcblxuICAgIC8vIHRoZXJlJ3MgYSBob3N0bmFtZS5cbiAgICAvLyB0aGUgZmlyc3QgaW5zdGFuY2Ugb2YgLywgPywgOywgb3IgIyBlbmRzIHRoZSBob3N0LlxuICAgIC8vXG4gICAgLy8gSWYgdGhlcmUgaXMgYW4gQCBpbiB0aGUgaG9zdG5hbWUsIHRoZW4gbm9uLWhvc3QgY2hhcnMgKmFyZSogYWxsb3dlZFxuICAgIC8vIHRvIHRoZSBsZWZ0IG9mIHRoZSBsYXN0IEAgc2lnbiwgdW5sZXNzIHNvbWUgaG9zdC1lbmRpbmcgY2hhcmFjdGVyXG4gICAgLy8gY29tZXMgKmJlZm9yZSogdGhlIEAtc2lnbi5cbiAgICAvLyBVUkxzIGFyZSBvYm5veGlvdXMuXG4gICAgLy9cbiAgICAvLyBleDpcbiAgICAvLyBodHRwOi8vYUBiQGMvID0+IHVzZXI6YUBiIGhvc3Q6Y1xuICAgIC8vIGh0dHA6Ly9hQGI/QGMgPT4gdXNlcjphIGhvc3Q6YyBwYXRoOi8/QGNcblxuICAgIC8vIHYwLjEyIFRPRE8oaXNhYWNzKTogVGhpcyBpcyBub3QgcXVpdGUgaG93IENocm9tZSBkb2VzIHRoaW5ncy5cbiAgICAvLyBSZXZpZXcgb3VyIHRlc3QgY2FzZSBhZ2FpbnN0IGJyb3dzZXJzIG1vcmUgY29tcHJlaGVuc2l2ZWx5LlxuXG4gICAgLy8gZmluZCB0aGUgZmlyc3QgaW5zdGFuY2Ugb2YgYW55IGhvc3RFbmRpbmdDaGFyc1xuICAgIHZhciBob3N0RW5kID0gLTE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob3N0RW5kaW5nQ2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBoZWMgPSByZXN0LmluZGV4T2YoaG9zdEVuZGluZ0NoYXJzW2ldKTtcbiAgICAgIGlmIChoZWMgIT09IC0xICYmIChob3N0RW5kID09PSAtMSB8fCBoZWMgPCBob3N0RW5kKSlcbiAgICAgICAgaG9zdEVuZCA9IGhlYztcbiAgICB9XG5cbiAgICAvLyBhdCB0aGlzIHBvaW50LCBlaXRoZXIgd2UgaGF2ZSBhbiBleHBsaWNpdCBwb2ludCB3aGVyZSB0aGVcbiAgICAvLyBhdXRoIHBvcnRpb24gY2Fubm90IGdvIHBhc3QsIG9yIHRoZSBsYXN0IEAgY2hhciBpcyB0aGUgZGVjaWRlci5cbiAgICB2YXIgYXV0aCwgYXRTaWduO1xuICAgIGlmIChob3N0RW5kID09PSAtMSkge1xuICAgICAgLy8gYXRTaWduIGNhbiBiZSBhbnl3aGVyZS5cbiAgICAgIGF0U2lnbiA9IHJlc3QubGFzdEluZGV4T2YoJ0AnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYXRTaWduIG11c3QgYmUgaW4gYXV0aCBwb3J0aW9uLlxuICAgICAgLy8gaHR0cDovL2FAYi9jQGQgPT4gaG9zdDpiIGF1dGg6YSBwYXRoOi9jQGRcbiAgICAgIGF0U2lnbiA9IHJlc3QubGFzdEluZGV4T2YoJ0AnLCBob3N0RW5kKTtcbiAgICB9XG5cbiAgICAvLyBOb3cgd2UgaGF2ZSBhIHBvcnRpb24gd2hpY2ggaXMgZGVmaW5pdGVseSB0aGUgYXV0aC5cbiAgICAvLyBQdWxsIHRoYXQgb2ZmLlxuICAgIGlmIChhdFNpZ24gIT09IC0xKSB7XG4gICAgICBhdXRoID0gcmVzdC5zbGljZSgwLCBhdFNpZ24pO1xuICAgICAgcmVzdCA9IHJlc3Quc2xpY2UoYXRTaWduICsgMSk7XG4gICAgICB0aGlzLmF1dGggPSBkZWNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgfVxuXG4gICAgLy8gdGhlIGhvc3QgaXMgdGhlIHJlbWFpbmluZyB0byB0aGUgbGVmdCBvZiB0aGUgZmlyc3Qgbm9uLWhvc3QgY2hhclxuICAgIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vbkhvc3RDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihub25Ib3N0Q2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cbiAgICAvLyBpZiB3ZSBzdGlsbCBoYXZlIG5vdCBoaXQgaXQsIHRoZW4gdGhlIGVudGlyZSB0aGluZyBpcyBhIGhvc3QuXG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKVxuICAgICAgaG9zdEVuZCA9IHJlc3QubGVuZ3RoO1xuXG4gICAgdGhpcy5ob3N0ID0gcmVzdC5zbGljZSgwLCBob3N0RW5kKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZShob3N0RW5kKTtcblxuICAgIC8vIHB1bGwgb3V0IHBvcnQuXG4gICAgdGhpcy5wYXJzZUhvc3QoKTtcblxuICAgIC8vIHdlJ3ZlIGluZGljYXRlZCB0aGF0IHRoZXJlIGlzIGEgaG9zdG5hbWUsXG4gICAgLy8gc28gZXZlbiBpZiBpdCdzIGVtcHR5LCBpdCBoYXMgdG8gYmUgcHJlc2VudC5cbiAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcblxuICAgIC8vIGlmIGhvc3RuYW1lIGJlZ2lucyB3aXRoIFsgYW5kIGVuZHMgd2l0aCBdXG4gICAgLy8gYXNzdW1lIHRoYXQgaXQncyBhbiBJUHY2IGFkZHJlc3MuXG4gICAgdmFyIGlwdjZIb3N0bmFtZSA9IHRoaXMuaG9zdG5hbWVbMF0gPT09ICdbJyAmJlxuICAgICAgICB0aGlzLmhvc3RuYW1lW3RoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMV0gPT09ICddJztcblxuICAgIC8vIHZhbGlkYXRlIGEgbGl0dGxlLlxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICB2YXIgaG9zdHBhcnRzID0gdGhpcy5ob3N0bmFtZS5zcGxpdCgvXFwuLyk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGhvc3RwYXJ0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnQgPSBob3N0cGFydHNbaV07XG4gICAgICAgIGlmICghcGFydCkgY29udGludWU7XG4gICAgICAgIGlmICghcGFydC5tYXRjaChob3N0bmFtZVBhcnRQYXR0ZXJuKSkge1xuICAgICAgICAgIHZhciBuZXdwYXJ0ID0gJyc7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGsgPSBwYXJ0Lmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgaWYgKHBhcnQuY2hhckNvZGVBdChqKSA+IDEyNykge1xuICAgICAgICAgICAgICAvLyB3ZSByZXBsYWNlIG5vbi1BU0NJSSBjaGFyIHdpdGggYSB0ZW1wb3JhcnkgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgLy8gd2UgbmVlZCB0aGlzIHRvIG1ha2Ugc3VyZSBzaXplIG9mIGhvc3RuYW1lIGlzIG5vdFxuICAgICAgICAgICAgICAvLyBicm9rZW4gYnkgcmVwbGFjaW5nIG5vbi1BU0NJSSBieSBub3RoaW5nXG4gICAgICAgICAgICAgIG5ld3BhcnQgKz0gJ3gnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3cGFydCArPSBwYXJ0W2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3ZSB0ZXN0IGFnYWluIHdpdGggQVNDSUkgY2hhciBvbmx5XG4gICAgICAgICAgaWYgKCFuZXdwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgICB2YXIgdmFsaWRQYXJ0cyA9IGhvc3RwYXJ0cy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHZhciBub3RIb3N0ID0gaG9zdHBhcnRzLnNsaWNlKGkgKyAxKTtcbiAgICAgICAgICAgIHZhciBiaXQgPSBwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChiaXQpIHtcbiAgICAgICAgICAgICAgdmFsaWRQYXJ0cy5wdXNoKGJpdFsxXSk7XG4gICAgICAgICAgICAgIG5vdEhvc3QudW5zaGlmdChiaXRbMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vdEhvc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJlc3QgPSAnLycgKyBub3RIb3N0LmpvaW4oJy4nKSArIHJlc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhvc3RuYW1lID0gdmFsaWRQYXJ0cy5qb2luKCcuJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5ob3N0bmFtZS5sZW5ndGggPiBob3N0bmFtZU1heExlbikge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBob3N0bmFtZXMgYXJlIGFsd2F5cyBsb3dlciBjYXNlLlxuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoIWlwdjZIb3N0bmFtZSkge1xuICAgICAgLy8gSUROQSBTdXBwb3J0OiBSZXR1cm5zIGEgcHVueWNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIFwiZG9tYWluXCIuXG4gICAgICAvLyBJdCBvbmx5IGNvbnZlcnRzIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB0aGF0XG4gICAgICAvLyBoYXZlIG5vbi1BU0NJSSBjaGFyYWN0ZXJzLCBpLmUuIGl0IGRvZXNuJ3QgbWF0dGVyIGlmXG4gICAgICAvLyB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQgYWxyZWFkeSBpcyBBU0NJSS1vbmx5LlxuICAgICAgdGhpcy5ob3N0bmFtZSA9IHB1bnljb2RlLnRvQVNDSUkodGhpcy5ob3N0bmFtZSk7XG4gICAgfVxuXG4gICAgdmFyIHAgPSB0aGlzLnBvcnQgPyAnOicgKyB0aGlzLnBvcnQgOiAnJztcbiAgICB2YXIgaCA9IHRoaXMuaG9zdG5hbWUgfHwgJyc7XG4gICAgdGhpcy5ob3N0ID0gaCArIHA7XG4gICAgdGhpcy5ocmVmICs9IHRoaXMuaG9zdDtcblxuICAgIC8vIHN0cmlwIFsgYW5kIF0gZnJvbSB0aGUgaG9zdG5hbWVcbiAgICAvLyB0aGUgaG9zdCBmaWVsZCBzdGlsbCByZXRhaW5zIHRoZW0sIHRob3VnaFxuICAgIGlmIChpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lLnN1YnN0cigxLCB0aGlzLmhvc3RuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgaWYgKHJlc3RbMF0gIT09ICcvJykge1xuICAgICAgICByZXN0ID0gJy8nICsgcmVzdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBub3cgcmVzdCBpcyBzZXQgdG8gdGhlIHBvc3QtaG9zdCBzdHVmZi5cbiAgLy8gY2hvcCBvZmYgYW55IGRlbGltIGNoYXJzLlxuICBpZiAoIXVuc2FmZVByb3RvY29sW2xvd2VyUHJvdG9dKSB7XG5cbiAgICAvLyBGaXJzdCwgbWFrZSAxMDAlIHN1cmUgdGhhdCBhbnkgXCJhdXRvRXNjYXBlXCIgY2hhcnMgZ2V0XG4gICAgLy8gZXNjYXBlZCwgZXZlbiBpZiBlbmNvZGVVUklDb21wb25lbnQgZG9lc24ndCB0aGluayB0aGV5XG4gICAgLy8gbmVlZCB0byBiZS5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGF1dG9Fc2NhcGUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgYWUgPSBhdXRvRXNjYXBlW2ldO1xuICAgICAgaWYgKHJlc3QuaW5kZXhPZihhZSkgPT09IC0xKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIHZhciBlc2MgPSBlbmNvZGVVUklDb21wb25lbnQoYWUpO1xuICAgICAgaWYgKGVzYyA9PT0gYWUpIHtcbiAgICAgICAgZXNjID0gZXNjYXBlKGFlKTtcbiAgICAgIH1cbiAgICAgIHJlc3QgPSByZXN0LnNwbGl0KGFlKS5qb2luKGVzYyk7XG4gICAgfVxuICB9XG5cblxuICAvLyBjaG9wIG9mZiBmcm9tIHRoZSB0YWlsIGZpcnN0LlxuICB2YXIgaGFzaCA9IHJlc3QuaW5kZXhPZignIycpO1xuICBpZiAoaGFzaCAhPT0gLTEpIHtcbiAgICAvLyBnb3QgYSBmcmFnbWVudCBzdHJpbmcuXG4gICAgdGhpcy5oYXNoID0gcmVzdC5zdWJzdHIoaGFzaCk7XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoMCwgaGFzaCk7XG4gIH1cbiAgdmFyIHFtID0gcmVzdC5pbmRleE9mKCc/Jyk7XG4gIGlmIChxbSAhPT0gLTEpIHtcbiAgICB0aGlzLnNlYXJjaCA9IHJlc3Quc3Vic3RyKHFtKTtcbiAgICB0aGlzLnF1ZXJ5ID0gcmVzdC5zdWJzdHIocW0gKyAxKTtcbiAgICBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5c3RyaW5nLnBhcnNlKHRoaXMucXVlcnkpO1xuICAgIH1cbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBxbSk7XG4gIH0gZWxzZSBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgIC8vIG5vIHF1ZXJ5IHN0cmluZywgYnV0IHBhcnNlUXVlcnlTdHJpbmcgc3RpbGwgcmVxdWVzdGVkXG4gICAgdGhpcy5zZWFyY2ggPSAnJztcbiAgICB0aGlzLnF1ZXJ5ID0ge307XG4gIH1cbiAgaWYgKHJlc3QpIHRoaXMucGF0aG5hbWUgPSByZXN0O1xuICBpZiAoc2xhc2hlZFByb3RvY29sW2xvd2VyUHJvdG9dICYmXG4gICAgICB0aGlzLmhvc3RuYW1lICYmICF0aGlzLnBhdGhuYW1lKSB7XG4gICAgdGhpcy5wYXRobmFtZSA9ICcvJztcbiAgfVxuXG4gIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgaWYgKHRoaXMucGF0aG5hbWUgfHwgdGhpcy5zZWFyY2gpIHtcbiAgICB2YXIgcCA9IHRoaXMucGF0aG5hbWUgfHwgJyc7XG4gICAgdmFyIHMgPSB0aGlzLnNlYXJjaCB8fCAnJztcbiAgICB0aGlzLnBhdGggPSBwICsgcztcbiAgfVxuXG4gIC8vIGZpbmFsbHksIHJlY29uc3RydWN0IHRoZSBocmVmIGJhc2VkIG9uIHdoYXQgaGFzIGJlZW4gdmFsaWRhdGVkLlxuICB0aGlzLmhyZWYgPSB0aGlzLmZvcm1hdCgpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGZvcm1hdCBhIHBhcnNlZCBvYmplY3QgaW50byBhIHVybCBzdHJpbmdcbmZ1bmN0aW9uIHVybEZvcm1hdChvYmopIHtcbiAgLy8gZW5zdXJlIGl0J3MgYW4gb2JqZWN0LCBhbmQgbm90IGEgc3RyaW5nIHVybC5cbiAgLy8gSWYgaXQncyBhbiBvYmosIHRoaXMgaXMgYSBuby1vcC5cbiAgLy8gdGhpcyB3YXksIHlvdSBjYW4gY2FsbCB1cmxfZm9ybWF0KCkgb24gc3RyaW5nc1xuICAvLyB0byBjbGVhbiB1cCBwb3RlbnRpYWxseSB3b25reSB1cmxzLlxuICBpZiAodXRpbC5pc1N0cmluZyhvYmopKSBvYmogPSB1cmxQYXJzZShvYmopO1xuICBpZiAoIShvYmogaW5zdGFuY2VvZiBVcmwpKSByZXR1cm4gVXJsLnByb3RvdHlwZS5mb3JtYXQuY2FsbChvYmopO1xuICByZXR1cm4gb2JqLmZvcm1hdCgpO1xufVxuXG5VcmwucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYXV0aCA9IHRoaXMuYXV0aCB8fCAnJztcbiAgaWYgKGF1dGgpIHtcbiAgICBhdXRoID0gZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIGF1dGggPSBhdXRoLnJlcGxhY2UoLyUzQS9pLCAnOicpO1xuICAgIGF1dGggKz0gJ0AnO1xuICB9XG5cbiAgdmFyIHByb3RvY29sID0gdGhpcy5wcm90b2NvbCB8fCAnJyxcbiAgICAgIHBhdGhuYW1lID0gdGhpcy5wYXRobmFtZSB8fCAnJyxcbiAgICAgIGhhc2ggPSB0aGlzLmhhc2ggfHwgJycsXG4gICAgICBob3N0ID0gZmFsc2UsXG4gICAgICBxdWVyeSA9ICcnO1xuXG4gIGlmICh0aGlzLmhvc3QpIHtcbiAgICBob3N0ID0gYXV0aCArIHRoaXMuaG9zdDtcbiAgfSBlbHNlIGlmICh0aGlzLmhvc3RuYW1lKSB7XG4gICAgaG9zdCA9IGF1dGggKyAodGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgPT09IC0xID9cbiAgICAgICAgdGhpcy5ob3N0bmFtZSA6XG4gICAgICAgICdbJyArIHRoaXMuaG9zdG5hbWUgKyAnXScpO1xuICAgIGlmICh0aGlzLnBvcnQpIHtcbiAgICAgIGhvc3QgKz0gJzonICsgdGhpcy5wb3J0O1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLnF1ZXJ5ICYmXG4gICAgICB1dGlsLmlzT2JqZWN0KHRoaXMucXVlcnkpICYmXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnF1ZXJ5KS5sZW5ndGgpIHtcbiAgICBxdWVyeSA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh0aGlzLnF1ZXJ5KTtcbiAgfVxuXG4gIHZhciBzZWFyY2ggPSB0aGlzLnNlYXJjaCB8fCAocXVlcnkgJiYgKCc/JyArIHF1ZXJ5KSkgfHwgJyc7XG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonO1xuXG4gIC8vIG9ubHkgdGhlIHNsYXNoZWRQcm90b2NvbHMgZ2V0IHRoZSAvLy4gIE5vdCBtYWlsdG86LCB4bXBwOiwgZXRjLlxuICAvLyB1bmxlc3MgdGhleSBoYWQgdGhlbSB0byBiZWdpbiB3aXRoLlxuICBpZiAodGhpcy5zbGFzaGVzIHx8XG4gICAgICAoIXByb3RvY29sIHx8IHNsYXNoZWRQcm90b2NvbFtwcm90b2NvbF0pICYmIGhvc3QgIT09IGZhbHNlKSB7XG4gICAgaG9zdCA9ICcvLycgKyAoaG9zdCB8fCAnJyk7XG4gICAgaWYgKHBhdGhuYW1lICYmIHBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nKSBwYXRobmFtZSA9ICcvJyArIHBhdGhuYW1lO1xuICB9IGVsc2UgaWYgKCFob3N0KSB7XG4gICAgaG9zdCA9ICcnO1xuICB9XG5cbiAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09ICcjJykgaGFzaCA9ICcjJyArIGhhc2g7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoLmNoYXJBdCgwKSAhPT0gJz8nKSBzZWFyY2ggPSAnPycgKyBzZWFyY2g7XG5cbiAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKC9bPyNdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChtYXRjaCk7XG4gIH0pO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZSgnIycsICclMjMnKTtcblxuICByZXR1cm4gcHJvdG9jb2wgKyBob3N0ICsgcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZShzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlKHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgcmV0dXJuIHRoaXMucmVzb2x2ZU9iamVjdCh1cmxQYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpKS5mb3JtYXQoKTtcbn07XG5cbmZ1bmN0aW9uIHVybFJlc29sdmVPYmplY3Qoc291cmNlLCByZWxhdGl2ZSkge1xuICBpZiAoIXNvdXJjZSkgcmV0dXJuIHJlbGF0aXZlO1xuICByZXR1cm4gdXJsUGFyc2Uoc291cmNlLCBmYWxzZSwgdHJ1ZSkucmVzb2x2ZU9iamVjdChyZWxhdGl2ZSk7XG59XG5cblVybC5wcm90b3R5cGUucmVzb2x2ZU9iamVjdCA9IGZ1bmN0aW9uKHJlbGF0aXZlKSB7XG4gIGlmICh1dGlsLmlzU3RyaW5nKHJlbGF0aXZlKSkge1xuICAgIHZhciByZWwgPSBuZXcgVXJsKCk7XG4gICAgcmVsLnBhcnNlKHJlbGF0aXZlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgcmVsYXRpdmUgPSByZWw7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gbmV3IFVybCgpO1xuICB2YXIgdGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgZm9yICh2YXIgdGsgPSAwOyB0ayA8IHRrZXlzLmxlbmd0aDsgdGsrKykge1xuICAgIHZhciB0a2V5ID0gdGtleXNbdGtdO1xuICAgIHJlc3VsdFt0a2V5XSA9IHRoaXNbdGtleV07XG4gIH1cblxuICAvLyBoYXNoIGlzIGFsd2F5cyBvdmVycmlkZGVuLCBubyBtYXR0ZXIgd2hhdC5cbiAgLy8gZXZlbiBocmVmPVwiXCIgd2lsbCByZW1vdmUgaXQuXG4gIHJlc3VsdC5oYXNoID0gcmVsYXRpdmUuaGFzaDtcblxuICAvLyBpZiB0aGUgcmVsYXRpdmUgdXJsIGlzIGVtcHR5LCB0aGVuIHRoZXJlJ3Mgbm90aGluZyBsZWZ0IHRvIGRvIGhlcmUuXG4gIGlmIChyZWxhdGl2ZS5ocmVmID09PSAnJykge1xuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBocmVmcyBsaWtlIC8vZm9vL2JhciBhbHdheXMgY3V0IHRvIHRoZSBwcm90b2NvbC5cbiAgaWYgKHJlbGF0aXZlLnNsYXNoZXMgJiYgIXJlbGF0aXZlLnByb3RvY29sKSB7XG4gICAgLy8gdGFrZSBldmVyeXRoaW5nIGV4Y2VwdCB0aGUgcHJvdG9jb2wgZnJvbSByZWxhdGl2ZVxuICAgIHZhciBya2V5cyA9IE9iamVjdC5rZXlzKHJlbGF0aXZlKTtcbiAgICBmb3IgKHZhciByayA9IDA7IHJrIDwgcmtleXMubGVuZ3RoOyByaysrKSB7XG4gICAgICB2YXIgcmtleSA9IHJrZXlzW3JrXTtcbiAgICAgIGlmIChya2V5ICE9PSAncHJvdG9jb2wnKVxuICAgICAgICByZXN1bHRbcmtleV0gPSByZWxhdGl2ZVtya2V5XTtcbiAgICB9XG5cbiAgICAvL3VybFBhcnNlIGFwcGVuZHMgdHJhaWxpbmcgLyB0byB1cmxzIGxpa2UgaHR0cDovL3d3dy5leGFtcGxlLmNvbVxuICAgIGlmIChzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXSAmJlxuICAgICAgICByZXN1bHQuaG9zdG5hbWUgJiYgIXJlc3VsdC5wYXRobmFtZSkge1xuICAgICAgcmVzdWx0LnBhdGggPSByZXN1bHQucGF0aG5hbWUgPSAnLyc7XG4gICAgfVxuXG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmIChyZWxhdGl2ZS5wcm90b2NvbCAmJiByZWxhdGl2ZS5wcm90b2NvbCAhPT0gcmVzdWx0LnByb3RvY29sKSB7XG4gICAgLy8gaWYgaXQncyBhIGtub3duIHVybCBwcm90b2NvbCwgdGhlbiBjaGFuZ2luZ1xuICAgIC8vIHRoZSBwcm90b2NvbCBkb2VzIHdlaXJkIHRoaW5nc1xuICAgIC8vIGZpcnN0LCBpZiBpdCdzIG5vdCBmaWxlOiwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBob3N0LFxuICAgIC8vIGFuZCBpZiB0aGVyZSB3YXMgYSBwYXRoXG4gICAgLy8gdG8gYmVnaW4gd2l0aCwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBwYXRoLlxuICAgIC8vIGlmIGl0IGlzIGZpbGU6LCB0aGVuIHRoZSBob3N0IGlzIGRyb3BwZWQsXG4gICAgLy8gYmVjYXVzZSB0aGF0J3Mga25vd24gdG8gYmUgaG9zdGxlc3MuXG4gICAgLy8gYW55dGhpbmcgZWxzZSBpcyBhc3N1bWVkIHRvIGJlIGFic29sdXRlLlxuICAgIGlmICghc2xhc2hlZFByb3RvY29sW3JlbGF0aXZlLnByb3RvY29sXSkge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyZWxhdGl2ZSk7XG4gICAgICBmb3IgKHZhciB2ID0gMDsgdiA8IGtleXMubGVuZ3RoOyB2KyspIHtcbiAgICAgICAgdmFyIGsgPSBrZXlzW3ZdO1xuICAgICAgICByZXN1bHRba10gPSByZWxhdGl2ZVtrXTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXN1bHQucHJvdG9jb2wgPSByZWxhdGl2ZS5wcm90b2NvbDtcbiAgICBpZiAoIXJlbGF0aXZlLmhvc3QgJiYgIWhvc3RsZXNzUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIgcmVsUGF0aCA9IChyZWxhdGl2ZS5wYXRobmFtZSB8fCAnJykuc3BsaXQoJy8nKTtcbiAgICAgIHdoaWxlIChyZWxQYXRoLmxlbmd0aCAmJiAhKHJlbGF0aXZlLmhvc3QgPSByZWxQYXRoLnNoaWZ0KCkpKTtcbiAgICAgIGlmICghcmVsYXRpdmUuaG9zdCkgcmVsYXRpdmUuaG9zdCA9ICcnO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0bmFtZSkgcmVsYXRpdmUuaG9zdG5hbWUgPSAnJztcbiAgICAgIGlmIChyZWxQYXRoWzBdICE9PSAnJykgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIGlmIChyZWxQYXRoLmxlbmd0aCA8IDIpIHJlbFBhdGgudW5zaGlmdCgnJyk7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxQYXRoLmpvaW4oJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnBhdGhuYW1lID0gcmVsYXRpdmUucGF0aG5hbWU7XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgcmVzdWx0Lmhvc3QgPSByZWxhdGl2ZS5ob3N0IHx8ICcnO1xuICAgIHJlc3VsdC5hdXRoID0gcmVsYXRpdmUuYXV0aDtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSByZWxhdGl2ZS5ob3N0bmFtZSB8fCByZWxhdGl2ZS5ob3N0O1xuICAgIHJlc3VsdC5wb3J0ID0gcmVsYXRpdmUucG9ydDtcbiAgICAvLyB0byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChyZXN1bHQucGF0aG5hbWUgfHwgcmVzdWx0LnNlYXJjaCkge1xuICAgICAgdmFyIHAgPSByZXN1bHQucGF0aG5hbWUgfHwgJyc7XG4gICAgICB2YXIgcyA9IHJlc3VsdC5zZWFyY2ggfHwgJyc7XG4gICAgICByZXN1bHQucGF0aCA9IHAgKyBzO1xuICAgIH1cbiAgICByZXN1bHQuc2xhc2hlcyA9IHJlc3VsdC5zbGFzaGVzIHx8IHJlbGF0aXZlLnNsYXNoZXM7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZhciBpc1NvdXJjZUFicyA9IChyZXN1bHQucGF0aG5hbWUgJiYgcmVzdWx0LnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSxcbiAgICAgIGlzUmVsQWJzID0gKFxuICAgICAgICAgIHJlbGF0aXZlLmhvc3QgfHxcbiAgICAgICAgICByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJ1xuICAgICAgKSxcbiAgICAgIG11c3RFbmRBYnMgPSAoaXNSZWxBYnMgfHwgaXNTb3VyY2VBYnMgfHxcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5ob3N0ICYmIHJlbGF0aXZlLnBhdGhuYW1lKSksXG4gICAgICByZW1vdmVBbGxEb3RzID0gbXVzdEVuZEFicyxcbiAgICAgIHNyY1BhdGggPSByZXN1bHQucGF0aG5hbWUgJiYgcmVzdWx0LnBhdGhuYW1lLnNwbGl0KCcvJykgfHwgW10sXG4gICAgICByZWxQYXRoID0gcmVsYXRpdmUucGF0aG5hbWUgJiYgcmVsYXRpdmUucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHBzeWNob3RpYyA9IHJlc3VsdC5wcm90b2NvbCAmJiAhc2xhc2hlZFByb3RvY29sW3Jlc3VsdC5wcm90b2NvbF07XG5cbiAgLy8gaWYgdGhlIHVybCBpcyBhIG5vbi1zbGFzaGVkIHVybCwgdGhlbiByZWxhdGl2ZVxuICAvLyBsaW5rcyBsaWtlIC4uLy4uIHNob3VsZCBiZSBhYmxlXG4gIC8vIHRvIGNyYXdsIHVwIHRvIHRoZSBob3N0bmFtZSwgYXMgd2VsbC4gIFRoaXMgaXMgc3RyYW5nZS5cbiAgLy8gcmVzdWx0LnByb3RvY29sIGhhcyBhbHJlYWR5IGJlZW4gc2V0IGJ5IG5vdy5cbiAgLy8gTGF0ZXIgb24sIHB1dCB0aGUgZmlyc3QgcGF0aCBwYXJ0IGludG8gdGhlIGhvc3QgZmllbGQuXG4gIGlmIChwc3ljaG90aWMpIHtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSAnJztcbiAgICByZXN1bHQucG9ydCA9IG51bGw7XG4gICAgaWYgKHJlc3VsdC5ob3N0KSB7XG4gICAgICBpZiAoc3JjUGF0aFswXSA9PT0gJycpIHNyY1BhdGhbMF0gPSByZXN1bHQuaG9zdDtcbiAgICAgIGVsc2Ugc3JjUGF0aC51bnNoaWZ0KHJlc3VsdC5ob3N0KTtcbiAgICB9XG4gICAgcmVzdWx0Lmhvc3QgPSAnJztcbiAgICBpZiAocmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAgIHJlbGF0aXZlLmhvc3RuYW1lID0gbnVsbDtcbiAgICAgIHJlbGF0aXZlLnBvcnQgPSBudWxsO1xuICAgICAgaWYgKHJlbGF0aXZlLmhvc3QpIHtcbiAgICAgICAgaWYgKHJlbFBhdGhbMF0gPT09ICcnKSByZWxQYXRoWzBdID0gcmVsYXRpdmUuaG9zdDtcbiAgICAgICAgZWxzZSByZWxQYXRoLnVuc2hpZnQocmVsYXRpdmUuaG9zdCk7XG4gICAgICB9XG4gICAgICByZWxhdGl2ZS5ob3N0ID0gbnVsbDtcbiAgICB9XG4gICAgbXVzdEVuZEFicyA9IG11c3RFbmRBYnMgJiYgKHJlbFBhdGhbMF0gPT09ICcnIHx8IHNyY1BhdGhbMF0gPT09ICcnKTtcbiAgfVxuXG4gIGlmIChpc1JlbEFicykge1xuICAgIC8vIGl0J3MgYWJzb2x1dGUuXG4gICAgcmVzdWx0Lmhvc3QgPSAocmVsYXRpdmUuaG9zdCB8fCByZWxhdGl2ZS5ob3N0ID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgcmVsYXRpdmUuaG9zdCA6IHJlc3VsdC5ob3N0O1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IChyZWxhdGl2ZS5ob3N0bmFtZSB8fCByZWxhdGl2ZS5ob3N0bmFtZSA9PT0gJycpID9cbiAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0bmFtZSA6IHJlc3VsdC5ob3N0bmFtZTtcbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIHNyY1BhdGggPSByZWxQYXRoO1xuICAgIC8vIGZhbGwgdGhyb3VnaCB0byB0aGUgZG90LWhhbmRsaW5nIGJlbG93LlxuICB9IGVsc2UgaWYgKHJlbFBhdGgubGVuZ3RoKSB7XG4gICAgLy8gaXQncyByZWxhdGl2ZVxuICAgIC8vIHRocm93IGF3YXkgdGhlIGV4aXN0aW5nIGZpbGUsIGFuZCB0YWtlIHRoZSBuZXcgcGF0aCBpbnN0ZWFkLlxuICAgIGlmICghc3JjUGF0aCkgc3JjUGF0aCA9IFtdO1xuICAgIHNyY1BhdGgucG9wKCk7XG4gICAgc3JjUGF0aCA9IHNyY1BhdGguY29uY2F0KHJlbFBhdGgpO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gIH0gZWxzZSBpZiAoIXV0aWwuaXNOdWxsT3JVbmRlZmluZWQocmVsYXRpdmUuc2VhcmNoKSkge1xuICAgIC8vIGp1c3QgcHVsbCBvdXQgdGhlIHNlYXJjaC5cbiAgICAvLyBsaWtlIGhyZWY9Jz9mb28nLlxuICAgIC8vIFB1dCB0aGlzIGFmdGVyIHRoZSBvdGhlciB0d28gY2FzZXMgYmVjYXVzZSBpdCBzaW1wbGlmaWVzIHRoZSBib29sZWFuc1xuICAgIGlmIChwc3ljaG90aWMpIHtcbiAgICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlc3VsdC5ob3N0ID0gc3JjUGF0aC5zaGlmdCgpO1xuICAgICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuICAgICAgLy90aGlzIGVzcGVjaWFsbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuICAgICAgdmFyIGF1dGhJbkhvc3QgPSByZXN1bHQuaG9zdCAmJiByZXN1bHQuaG9zdC5pbmRleE9mKCdAJykgPiAwID9cbiAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgICAgaWYgKGF1dGhJbkhvc3QpIHtcbiAgICAgICAgcmVzdWx0LmF1dGggPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAoIXV0aWwuaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIXV0aWwuaXNOdWxsKHJlc3VsdC5zZWFyY2gpKSB7XG4gICAgICByZXN1bHQucGF0aCA9IChyZXN1bHQucGF0aG5hbWUgPyByZXN1bHQucGF0aG5hbWUgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgICAocmVzdWx0LnNlYXJjaCA/IHJlc3VsdC5zZWFyY2ggOiAnJyk7XG4gICAgfVxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAoIXNyY1BhdGgubGVuZ3RoKSB7XG4gICAgLy8gbm8gcGF0aCBhdCBhbGwuICBlYXN5LlxuICAgIC8vIHdlJ3ZlIGFscmVhZHkgaGFuZGxlZCB0aGUgb3RoZXIgc3R1ZmYgYWJvdmUuXG4gICAgcmVzdWx0LnBhdGhuYW1lID0gbnVsbDtcbiAgICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5zZWFyY2gpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gJy8nICsgcmVzdWx0LnNlYXJjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnBhdGggPSBudWxsO1xuICAgIH1cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gaWYgYSB1cmwgRU5EcyBpbiAuIG9yIC4uLCB0aGVuIGl0IG11c3QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIC8vIGhvd2V2ZXIsIGlmIGl0IGVuZHMgaW4gYW55dGhpbmcgZWxzZSBub24tc2xhc2h5LFxuICAvLyB0aGVuIGl0IG11c3QgTk9UIGdldCBhIHRyYWlsaW5nIHNsYXNoLlxuICB2YXIgbGFzdCA9IHNyY1BhdGguc2xpY2UoLTEpWzBdO1xuICB2YXIgaGFzVHJhaWxpbmdTbGFzaCA9IChcbiAgICAgIChyZXN1bHQuaG9zdCB8fCByZWxhdGl2ZS5ob3N0IHx8IHNyY1BhdGgubGVuZ3RoID4gMSkgJiZcbiAgICAgIChsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJykgfHwgbGFzdCA9PT0gJycpO1xuXG4gIC8vIHN0cmlwIHNpbmdsZSBkb3RzLCByZXNvbHZlIGRvdWJsZSBkb3RzIHRvIHBhcmVudCBkaXJcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHNyY1BhdGgubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgIGxhc3QgPSBzcmNQYXRoW2ldO1xuICAgIGlmIChsYXN0ID09PSAnLicpIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXG4gIGlmICghbXVzdEVuZEFicyAmJiAhcmVtb3ZlQWxsRG90cykge1xuICAgIGZvciAoOyB1cC0tOyB1cCkge1xuICAgICAgc3JjUGF0aC51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtdXN0RW5kQWJzICYmIHNyY1BhdGhbMF0gIT09ICcnICYmXG4gICAgICAoIXNyY1BhdGhbMF0gfHwgc3JjUGF0aFswXS5jaGFyQXQoMCkgIT09ICcvJykpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKGhhc1RyYWlsaW5nU2xhc2ggJiYgKHNyY1BhdGguam9pbignLycpLnN1YnN0cigtMSkgIT09ICcvJykpIHtcbiAgICBzcmNQYXRoLnB1c2goJycpO1xuICB9XG5cbiAgdmFyIGlzQWJzb2x1dGUgPSBzcmNQYXRoWzBdID09PSAnJyB8fFxuICAgICAgKHNyY1BhdGhbMF0gJiYgc3JjUGF0aFswXS5jaGFyQXQoMCkgPT09ICcvJyk7XG5cbiAgLy8gcHV0IHRoZSBob3N0IGJhY2tcbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlc3VsdC5ob3N0ID0gaXNBYnNvbHV0ZSA/ICcnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyY1BhdGgubGVuZ3RoID8gc3JjUGF0aC5zaGlmdCgpIDogJyc7XG4gICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuICAgIC8vdGhpcyBlc3BlY2lhbGx5IGhhcHBlbnMgaW4gY2FzZXMgbGlrZVxuICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgdmFyIGF1dGhJbkhvc3QgPSByZXN1bHQuaG9zdCAmJiByZXN1bHQuaG9zdC5pbmRleE9mKCdAJykgPiAwID9cbiAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ob3N0LnNwbGl0KCdAJykgOiBmYWxzZTtcbiAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgcmVzdWx0LmF1dGggPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICByZXN1bHQuaG9zdCA9IHJlc3VsdC5ob3N0bmFtZSA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICB9XG4gIH1cblxuICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyB8fCAocmVzdWx0Lmhvc3QgJiYgc3JjUGF0aC5sZW5ndGgpO1xuXG4gIGlmIChtdXN0RW5kQWJzICYmICFpc0Fic29sdXRlKSB7XG4gICAgc3JjUGF0aC51bnNoaWZ0KCcnKTtcbiAgfVxuXG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuICAgIHJlc3VsdC5wYXRoID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQucGF0aG5hbWUgPSBzcmNQYXRoLmpvaW4oJy8nKTtcbiAgfVxuXG4gIC8vdG8gc3VwcG9ydCByZXF1ZXN0Lmh0dHBcbiAgaWYgKCF1dGlsLmlzTnVsbChyZXN1bHQucGF0aG5hbWUpIHx8ICF1dGlsLmlzTnVsbChyZXN1bHQuc2VhcmNoKSkge1xuICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocmVzdWx0LnNlYXJjaCA/IHJlc3VsdC5zZWFyY2ggOiAnJyk7XG4gIH1cbiAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoIHx8IHJlc3VsdC5hdXRoO1xuICByZXN1bHQuc2xhc2hlcyA9IHJlc3VsdC5zbGFzaGVzIHx8IHJlbGF0aXZlLnNsYXNoZXM7XG4gIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuVXJsLnByb3RvdHlwZS5wYXJzZUhvc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhvc3QgPSB0aGlzLmhvc3Q7XG4gIHZhciBwb3J0ID0gcG9ydFBhdHRlcm4uZXhlYyhob3N0KTtcbiAgaWYgKHBvcnQpIHtcbiAgICBwb3J0ID0gcG9ydFswXTtcbiAgICBpZiAocG9ydCAhPT0gJzonKSB7XG4gICAgICB0aGlzLnBvcnQgPSBwb3J0LnN1YnN0cigxKTtcbiAgICB9XG4gICAgaG9zdCA9IGhvc3Quc3Vic3RyKDAsIGhvc3QubGVuZ3RoIC0gcG9ydC5sZW5ndGgpO1xuICB9XG4gIGlmIChob3N0KSB0aGlzLmhvc3RuYW1lID0gaG9zdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc1N0cmluZzogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHR5cGVvZihhcmcpID09PSAnc3RyaW5nJztcbiAgfSxcbiAgaXNPYmplY3Q6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB0eXBlb2YoYXJnKSA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xuICB9LFxuICBpc051bGw6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBhcmcgPT09IG51bGw7XG4gIH0sXG4gIGlzTnVsbE9yVW5kZWZpbmVkOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gYXJnID09IG51bGw7XG4gIH1cbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IixudWxsLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2luZGV4LnRzXCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9