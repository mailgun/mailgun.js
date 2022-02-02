/*! mailgun.js v4.1.6 */
/*! mailgun.js v4.1.6 */
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

var domainsTemplates_1 = __importDefault(__webpack_require__(/*! ./domainsTemplates */ "./lib/domainsTemplates.ts"));

var domainsTags_1 = __importDefault(__webpack_require__(/*! ./domainsTags */ "./lib/domainsTags.ts"));

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
    var domainTemplatesClient = new domainsTemplates_1.default(this.request);
    var domainTagsClient = new domainsTags_1.default(this.request);
    var multipleValidationClient = new multipleValidation_1.default(this.request);
    this.domains = new domains_1.default(this.request, domainCredentialsClient, domainTemplatesClient, domainTagsClient);
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
  function DomainClient(request, domainCredentialsClient, domainTemplatesClient, domainTagsClient) {
    this.request = request;
    this.domainCredentials = domainCredentialsClient;
    this.domainTemplates = domainTemplatesClient;
    this.domainTags = domainTagsClient;
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

/***/ "./lib/domainsTags.ts":
/*!****************************!*\
  !*** ./lib/domainsTags.ts ***!
  \****************************/
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
exports.DomainTagStatistic = exports.DomainTag = void 0;

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var DomainTag =
/** @class */
function () {
  function DomainTag(tagInfo) {
    this.tag = tagInfo.tag;
    this.description = tagInfo.description;
    this['first-seen'] = new Date(tagInfo['first-seen']);
    this['last-seen'] = new Date(tagInfo['last-seen']);
  }

  return DomainTag;
}();

exports.DomainTag = DomainTag;

var DomainTagStatistic =
/** @class */
function () {
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

var DomainTagsClient =
/** @class */
function () {
  function DomainTagsClient(request) {
    this.request = request;
    this.baseRoute = '/v3/';
  }

  DomainTagsClient.prototype._parsePageLinks = function (response) {
    var pages = Object.entries(response.body.paging);
    return pages.reduce(function (acc, entrie) {
      var id = entrie[0];
      var url = entrie[1];
      acc[id] = {
        id: id,
        url: url
      };
      return acc;
    }, {});
  };

  DomainTagsClient.prototype._parseDomainTagsList = function (response) {
    return {
      items: response.body.items.map(function (tagInfo) {
        return new DomainTag(tagInfo);
      }),
      pages: this._parsePageLinks(response)
    };
  };

  DomainTagsClient.prototype._parseTagStatistic = function (response) {
    return new DomainTagStatistic(response);
  };

  DomainTagsClient.prototype.list = function (domain, query) {
    var _this = this;

    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/tags'), query).then(function (res) {
      return _this._parseDomainTagsList(res);
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
    return this.request.delete("" + this.baseRoute + domain + "/tags/" + tag).then(function (res) {
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
}();

exports["default"] = DomainTagsClient;

/***/ }),

/***/ "./lib/domainsTemplates.ts":
/*!*********************************!*\
  !*** ./lib/domainsTemplates.ts ***!
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
exports.DomainTemplateItem = void 0;

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var DomainTemplateItem =
/** @class */
function () {
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

var DomainTemplatesClient =
/** @class */
function () {
  function DomainTemplatesClient(request) {
    this.request = request;
    this.baseRoute = '/v3/';
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
    data.pages = response.body.paging;
    return data;
  };

  DomainTemplatesClient.prototype.parseListTemplateVersions = function (response) {
    var data = {};
    data.template = new DomainTemplateItem(response.body.template);
    data.pages = response.body.paging;
    return data;
  };

  DomainTemplatesClient.prototype.list = function (domain, query) {
    var _this = this;

    return this.request.get((0, url_join_1.default)(this.baseRoute, domain, '/templates'), query).then(function (res) {
      return _this.parseList(res);
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

    return this.request.putWithFD((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag), data).then( // eslint-disable-next-line max-len
    function (res) {
      return _this.parseMutateTemplateVersionResponse(res);
    });
  };

  DomainTemplatesClient.prototype.destroyVersion = function (domain, templateName, tag) {
    var _this = this;

    return this.request.delete((0, url_join_1.default)(this.baseRoute, domain, '/templates/', templateName, '/versions/', tag)) // eslint-disable-next-line max-len
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
}();

exports["default"] = DomainTemplatesClient;

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
    return this.request.postWithFD('/v1/ip_pools', data).then(function (response) {
      return response === null || response === void 0 ? void 0 : response.body;
    });
  };

  IpPoolsClient.prototype.update = function (poolId, data) {
    return this.request.patchWithFD("/v1/ip_pools/" + poolId, data).then(function (response) {
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

            console.log('url --------->', (0, url_join_1.default)(this.url, url));
            console.log('method --------->', method);
            console.log('params --------->', params);
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
            console.log('res ------------->', res);
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

  Request.prototype.patchWithFD = function (url, data) {
    if (!data) {
      throw new Error('Please provide data object');
    }

    var params = {
      headers: {
        'Content-Type': null
      }
    };
    var formData = this.createFormData(data);
    return this.command('patch', url, formData, params);
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

  StatsClient.prototype.prepareSearchParams = function (query) {
    var searchParams = [];

    if (typeof query === 'object' && Object.keys(query).length) {
      searchParams = Object.entries(query).reduce(function (arrayWithPairs, currentPair) {
        var key = currentPair[0],
            value = currentPair[1];

        if (Array.isArray(value) && value.length) {
          var repeatedProperty = value.map(function (item) {
            return [key, item];
          });
          return __spreadArray(__spreadArray([], arrayWithPairs, true), repeatedProperty, true);
        }

        arrayWithPairs.push([key, value]);
        return arrayWithPairs;
      }, []);
    }

    return searchParams;
  };

  StatsClient.prototype._parseStats = function (response) {
    return new Stats(response.body);
  };

  StatsClient.prototype.getDomain = function (domain, query) {
    var searchParams = this.prepareSearchParams(query);
    return this.request.get((0, url_join_1.default)('/v3', domain, 'stats/total'), searchParams).then(this._parseStats);
  };

  StatsClient.prototype.getAccount = function (query) {
    var searchParams = this.prepareSearchParams(query);
    return this.request.get('/v3/stats/total', searchParams).then(this._parseStats);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQseUJBQXlCO0FBQzlFOztBQUVBO0FBQ0E7QUFDQSwwRUFBMEUsZUFBZTtBQUN6Rjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsUUFBUTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzN0QmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVKQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21haWxndW4vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL21haWxndW4vLi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2NsaWVudC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2RvbWFpbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9kb21haW5zQ3JlZGVudGlhbHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9kb21haW5zVGFncy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2RvbWFpbnNUZW1wbGF0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9lcnJvci50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2V2ZW50cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2lwLXBvb2xzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvaXBzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvbGlzdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9tYWlsTGlzdE1lbWJlcnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9tZXNzYWdlcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL211bHRpcGxlVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL3JlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9yb3V0ZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9zdGF0cy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL3N1cHByZXNzaW9ucy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL3ZhbGlkYXRlLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvd2ViaG9va3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9iYXNlLTY0L2Jhc2U2NC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2t5LXVuaXZlcnNhbC9icm93c2VyLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMva3kvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9wdW55Y29kZS9wdW55Y29kZS5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nL2RlY29kZS5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nL2VuY29kZS5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nL2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvdXJsL3VybC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL3VybC91dGlsLmpzIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFpbGd1bi93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJtYWlsZ3VuXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm1haWxndW5cIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJpbXBvcnQgQ2xpZW50IGZyb20gJy4vbGliL2NsaWVudCc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9saWIvaW50ZXJmYWNlcy9JRm9ybURhdGEnO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9saWIvaW50ZXJmYWNlcy9PcHRpb25zJztcblxuY2xhc3MgTWFpbGd1biB7XG4gIHByaXZhdGUgZm9ybURhdGE6IElucHV0Rm9ybURhdGFcblxuICBjb25zdHJ1Y3RvcihGb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIHRoaXMuZm9ybURhdGEgPSBGb3JtRGF0YTtcbiAgfVxuXG4gIGNsaWVudChvcHRpb25zOiBPcHRpb25zKSA6IENsaWVudCB7XG4gICAgcmV0dXJuIG5ldyBDbGllbnQob3B0aW9ucywgdGhpcy5mb3JtRGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0ID0gTWFpbGd1bjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCBPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9PcHRpb25zJztcbmltcG9ydCBSZXF1ZXN0T3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvUmVxdWVzdE9wdGlvbnMnO1xuXG5pbXBvcnQgRG9tYWluQ2xpZW50IGZyb20gJy4vZG9tYWlucyc7XG5pbXBvcnQgRXZlbnRDbGllbnQgZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IFN0YXRzQ2xpZW50IGZyb20gJy4vc3RhdHMnO1xuaW1wb3J0IFN1cHByZXNzaW9uQ2xpZW50IGZyb20gJy4vc3VwcHJlc3Npb25zJztcbmltcG9ydCBXZWJob29rQ2xpZW50IGZyb20gJy4vd2ViaG9va3MnO1xuaW1wb3J0IE1lc3NhZ2VzQ2xpZW50IGZyb20gJy4vbWVzc2FnZXMnO1xuaW1wb3J0IFJvdXRlc0NsaWVudCBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgVmFsaWRhdGVDbGllbnQgZnJvbSAnLi92YWxpZGF0ZSc7XG5pbXBvcnQgSXBzQ2xpZW50IGZyb20gJy4vaXBzJztcbmltcG9ydCBJcFBvb2xzQ2xpZW50IGZyb20gJy4vaXAtcG9vbHMnO1xuaW1wb3J0IExpc3RzQ2xpZW50IGZyb20gJy4vbGlzdHMnO1xuaW1wb3J0IE1haWxMaXN0c01lbWJlcnMgZnJvbSAnLi9tYWlsTGlzdE1lbWJlcnMnO1xuaW1wb3J0IHsgSW5wdXRGb3JtRGF0YSB9IGZyb20gJy4vaW50ZXJmYWNlcy9JRm9ybURhdGEnO1xuaW1wb3J0IERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGZyb20gJy4vZG9tYWluc0NyZWRlbnRpYWxzJztcbmltcG9ydCBNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgZnJvbSAnLi9tdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IERvbWFpblRhZ3NDbGllbnQgZnJvbSAnLi9kb21haW5zVGFncyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWVudCB7XG4gIHByaXZhdGUgcmVxdWVzdDtcblxuICBwdWJsaWMgZG9tYWlucztcbiAgcHVibGljIHdlYmhvb2tzO1xuICBwdWJsaWMgZXZlbnRzO1xuICBwdWJsaWMgc3RhdHM7XG4gIHB1YmxpYyBzdXBwcmVzc2lvbnM7XG4gIHB1YmxpYyBtZXNzYWdlcztcbiAgcHVibGljIHJvdXRlcztcbiAgcHVibGljIHZhbGlkYXRlO1xuICBwdWJsaWMgaXBzO1xuICBwdWJsaWMgaXBfcG9vbHM7XG4gIHB1YmxpYyBsaXN0cztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPcHRpb25zLCBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIGNvbnN0IGNvbmZpZzogUmVxdWVzdE9wdGlvbnMgPSB7IC4uLm9wdGlvbnMgfSBhcyBSZXF1ZXN0T3B0aW9ucztcblxuICAgIGlmICghY29uZmlnLnVybCkge1xuICAgICAgY29uZmlnLnVybCA9ICdodHRwczovL2FwaS5tYWlsZ3VuLm5ldCc7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcudXNlcm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwidXNlcm5hbWVcIiBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJrZXlcIiBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICB0aGlzLnJlcXVlc3QgPSBuZXcgUmVxdWVzdChjb25maWcsIGZvcm1EYXRhKTtcbiAgICBjb25zdCBtYWlsTGlzdHNNZW1iZXJzID0gbmV3IE1haWxMaXN0c01lbWJlcnModGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5DcmVkZW50aWFsc0NsaWVudCA9IG5ldyBEb21haW5DcmVkZW50aWFsc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpblRlbXBsYXRlc0NsaWVudCA9IG5ldyBEb21haW5UZW1wbGF0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5UYWdzQ2xpZW50ID0gbmV3IERvbWFpblRhZ3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgPSBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG5cbiAgICB0aGlzLmRvbWFpbnMgPSBuZXcgRG9tYWluQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0LFxuICAgICAgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgICBkb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgICBkb21haW5UYWdzQ2xpZW50XG4gICAgKTtcbiAgICB0aGlzLndlYmhvb2tzID0gbmV3IFdlYmhvb2tDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudENsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnN1cHByZXNzaW9ucyA9IG5ldyBTdXBwcmVzc2lvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMubWVzc2FnZXMgPSBuZXcgTWVzc2FnZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnJvdXRlcyA9IG5ldyBSb3V0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmlwcyA9IG5ldyBJcHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmlwX3Bvb2xzID0gbmV3IElwUG9vbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmxpc3RzID0gbmV3IExpc3RzQ2xpZW50KHRoaXMucmVxdWVzdCwgbWFpbExpc3RzTWVtYmVycyk7XG4gICAgdGhpcy52YWxpZGF0ZSA9IG5ldyBWYWxpZGF0ZUNsaWVudCh0aGlzLnJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHtcbiAgRG9tYWluUmVzcG9uc2VEYXRhLFxuICBEZXN0cm95ZWREb21haW5SZXNwb25zZSxcbiAgRG9tYWluc1F1ZXJ5LFxuICBEb21haW5JbmZvLFxuICBEb21haW5MaXN0UmVzcG9uc2VEYXRhLFxuICBEb21haW5TaG9ydERhdGEsXG4gIEROU1JlY29yZCxcbiAgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UsXG4gIENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcyxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlLFxuICBES0lNU2VsZWN0b3JJbmZvLFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFdlYlByZWZpeEluZm8sXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgUmVwbGFjZW1lbnRGb3JQb29sLFxuICBNZXNzYWdlUmVzcG9uc2UsXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5zJztcblxuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgRG9tYWluVHJhY2tpbmdSZXNwb25zZSxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIFVwZGF0ZWRPcGVuVHJhY2tpbmdcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRyYWNraW5nJztcbmltcG9ydCB7IElEb21haW5DcmVkZW50aWFscyB9IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5DcmVkZW50aWFscyc7XG5pbXBvcnQgeyBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRlbXBsYXRlcyc7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9kb21haW5zQ3JlZGVudGlhbHMnO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IHsgSURvbWFpblRhZ3NDbGllbnQgfSBmcm9tICcuL2ludGVyZmFjZXMvRG9tYWluVGFncyc7XG5pbXBvcnQgRG9tYWluVGFnc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUYWdzJztcblxuZXhwb3J0IGNsYXNzIERvbWFpbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xuICBzdGF0ZTogc3RyaW5nO1xuICB3aWxkY2FyZDogYm9vbGVhbjtcbiAgc3BhbV9hY3Rpb246IHN0cmluZztcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICBzbXRwX3Bhc3N3b3JkOiBzdHJpbmc7XG4gIHNtdHBfbG9naW46IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICByZWNlaXZpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgc2VuZGluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IERvbWFpblNob3J0RGF0YSwgcmVjZWl2aW5nPzogRE5TUmVjb3JkW10gfCBudWxsLCBzZW5kaW5nPzogRE5TUmVjb3JkW10gfCBudWxsKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMucmVxdWlyZV90bHMgPSBkYXRhLnJlcXVpcmVfdGxzO1xuICAgIHRoaXMuc2tpcF92ZXJpZmljYXRpb24gPSBkYXRhLnNraXBfdmVyaWZpY2F0aW9uO1xuICAgIHRoaXMuc3RhdGUgPSBkYXRhLnN0YXRlO1xuICAgIHRoaXMud2lsZGNhcmQgPSBkYXRhLndpbGRjYXJkO1xuICAgIHRoaXMuc3BhbV9hY3Rpb24gPSBkYXRhLnNwYW1fYWN0aW9uO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IGRhdGEuY3JlYXRlZF9hdDtcbiAgICB0aGlzLnNtdHBfcGFzc3dvcmQgPSBkYXRhLnNtdHBfcGFzc3dvcmQ7XG4gICAgdGhpcy5zbXRwX2xvZ2luID0gZGF0YS5zbXRwX2xvZ2luO1xuICAgIHRoaXMudHlwZSA9IGRhdGEudHlwZTtcblxuICAgIHRoaXMucmVjZWl2aW5nX2Ruc19yZWNvcmRzID0gcmVjZWl2aW5nIHx8IG51bGw7XG4gICAgdGhpcy5zZW5kaW5nX2Ruc19yZWNvcmRzID0gc2VuZGluZyB8fCBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHB1YmxpYyBkb21haW5DcmVkZW50aWFsczogSURvbWFpbkNyZWRlbnRpYWxzO1xuICBwdWJsaWMgZG9tYWluVGVtcGxhdGVzOiBJRG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuICBwdWJsaWMgZG9tYWluVGFnczogSURvbWFpblRhZ3NDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBkb21haW5DcmVkZW50aWFsc0NsaWVudDogRG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgZG9tYWluVGVtcGxhdGVzQ2xpZW50OiBEb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgZG9tYWluVGFnc0NsaWVudDogRG9tYWluVGFnc0NsaWVudFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuZG9tYWluQ3JlZGVudGlhbHMgPSBkb21haW5DcmVkZW50aWFsc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRlbXBsYXRlcyA9IGRvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRhZ3MgPSBkb21haW5UYWdzQ2xpZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlKHJlc3BvbnNlOiBEZXN0cm95ZWREb21haW5SZXNwb25zZSkgOiBNZXNzYWdlUmVzcG9uc2Uge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW5MaXN0KHJlc3BvbnNlOiBEb21haW5MaXN0UmVzcG9uc2VEYXRhKTogRG9tYWluW10ge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIG5ldyBEb21haW4oaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURvbWFpbihyZXNwb25zZTogRG9tYWluUmVzcG9uc2VEYXRhKTogRG9tYWluIHtcbiAgICByZXR1cm4gbmV3IERvbWFpbihcbiAgICAgIHJlc3BvbnNlLmJvZHkuZG9tYWluLFxuICAgICAgcmVzcG9uc2UuYm9keS5yZWNlaXZpbmdfZG5zX3JlY29yZHMsXG4gICAgICByZXNwb25zZS5ib2R5LnNlbmRpbmdfZG5zX3JlY29yZHNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1NldHRpbmdzKHJlc3BvbnNlOiBEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6IERvbWFpblRyYWNraW5nRGF0YSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkudHJhY2tpbmc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRyYWNraW5nVXBkYXRlKHJlc3BvbnNlOiBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6VXBkYXRlZE9wZW5UcmFja2luZyB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogRG9tYWluc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5bXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvZG9tYWlucycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkxpc3QocmVzIGFzIERvbWFpbkxpc3RSZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogRG9tYWluSW5mbykgOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIGNvbnN0IHBvc3RPYmogPSB7IC4uLmRhdGEgfTtcbiAgICBpZiAoJ2ZvcmNlX2RraW1fYXV0aG9yaXR5JyBpbiBwb3N0T2JqICYmIHR5cGVvZiBwb3N0T2JqLmZvcmNlX2RraW1fYXV0aG9yaXR5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHBvc3RPYmouZm9yY2VfZGtpbV9hdXRob3JpdHkgPSBwb3N0T2JqLnRvU3RyaW5nKCkgPT09ICd0cnVlJyA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvZG9tYWlucycsIHBvc3RPYmopXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2UocmVzIGFzIERlc3Ryb3llZERvbWFpblJlc3BvbnNlKSk7XG4gIH1cblxuICBnZXRDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxDb25uZWN0aW9uU2V0dGluZ3M+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL2RvbWFpbnMvJHtkb21haW59L2Nvbm5lY3Rpb25gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UpXG4gICAgICAudGhlbigocmVzOkNvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlKSA9PiByZXMuYm9keS5jb25uZWN0aW9uIGFzIENvbm5lY3Rpb25TZXR0aW5ncyk7XG4gIH1cblxuICB1cGRhdGVDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBDb25uZWN0aW9uU2V0dGluZ3MpOiBQcm9taXNlPFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3M+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2Nvbm5lY3Rpb25gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcylcbiAgICAgIC50aGVuKChyZXM6VXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcykgPT4gcmVzLmJvZHkgYXMgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyk7XG4gIH1cblxuICAvLyBUcmFja2luZ1xuXG4gIGdldFRyYWNraW5nKGRvbWFpbjogc3RyaW5nKSA6IFByb21pc2U8RG9tYWluVHJhY2tpbmdEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VUcmFja2luZ1NldHRpbmdzKTtcbiAgfVxuXG4gIHVwZGF0ZVRyYWNraW5nKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBPcGVuVHJhY2tpbmdJbmZvIHwgQ2xpY2tUcmFja2luZ0luZm8gfCBVbnN1YnNjcmliZVRyYWNraW5nSW5mb1xuICApOiBQcm9taXNlPFVwZGF0ZWRPcGVuVHJhY2tpbmc+IHtcbiAgICBpZiAodHlwZW9mIGRhdGE/LmFjdGl2ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3IoeyBzdGF0dXM6IDQwMCwgc3RhdHVzVGV4dDogJycsIGJvZHk6IHsgbWVzc2FnZTogJ1Byb3BlcnR5IFwiYWN0aXZlXCIgbXVzdCBjb250YWluIHN0cmluZyB2YWx1ZS4nIH0gfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJywgdHlwZSksIGRhdGEpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlVHJhY2tpbmdVcGRhdGUocmVzIGFzIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UpKTtcbiAgfVxuXG4gIC8vIElQc1xuXG4gIGdldElwcyhkb21haW46IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBBUElSZXNwb25zZSkgPT4gcmVzcG9uc2U/LmJvZHk/Lml0ZW1zKTtcbiAgfVxuXG4gIGFzc2lnbklwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IGlwIH0pO1xuICB9XG5cbiAgZGVsZXRlSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCBpcCkpO1xuICB9XG5cbiAgbGlua0lwUG9vbChkb21haW46IHN0cmluZywgcG9vbF9pZDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IHBvb2xfaWQgfSk7XG4gIH1cblxuICB1bmxpbmtJcFBvbGwoZG9tYWluOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBSZXBsYWNlbWVudEZvclBvb2wpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9ICcnO1xuICAgIGlmIChyZXBsYWNlbWVudC5wb29sX2lkICYmIHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3IoeyBzdGF0dXM6IDQwMCwgc3RhdHVzVGV4dDogJycsIGJvZHk6IHsgbWVzc2FnZTogJ1BsZWFzZSBzcGVjaWZ5IGVpdGhlciBwb29sX2lkIG9yIGlwIChub3QgYm90aCknIH0gfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gYD9wb29sX2lkPSR7cmVwbGFjZW1lbnQucG9vbF9pZH1gO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/aXA9JHtyZXBsYWNlbWVudC5pcH1gO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsICdpcF9wb29sJywgc2VhcmNoUGFyYW1zKSk7XG4gIH1cblxuICB1cGRhdGVES0lNQXV0aG9yaXR5KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNQXV0aG9yaXR5SW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1BdXRob3JpdHk+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2RraW1fYXV0aG9yaXR5YCwge30sIHsgcXVlcnk6IGBzZWxmPSR7ZGF0YS5zZWxmfWAgfSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzKVxuICAgICAgLnRoZW4oKHJlcyA6IFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5KTtcbiAgfVxuXG4gIHVwZGF0ZURLSU1TZWxlY3Rvcihkb21haW46IHN0cmluZywgZGF0YTogREtJTVNlbGVjdG9ySW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX3NlbGVjdG9yYCwge30sIHsgcXVlcnk6IGBka2ltX3NlbGVjdG9yPSR7ZGF0YS5ka2ltU2VsZWN0b3J9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZVdlYlByZWZpeChkb21haW46IHN0cmluZywgZGF0YTogV2ViUHJlZml4SW5mbyk6IFByb21pc2U8VXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS93ZWJfcHJlZml4YCwge30sIHsgcXVlcnk6IGB3ZWJfcHJlZml4PSR7ZGF0YS53ZWJQcmVmaXh9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UsXG4gIERlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlLFxuICBEb21haW5DcmVkZW50aWFscyxcbiAgRG9tYWluQ3JlZGVudGlhbHNMaXN0LFxuICBEb21haW5DcmVkZW50aWFsc1F1ZXJ5LFxuICBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSxcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQsXG4gIElEb21haW5DcmVkZW50aWFscyxcbiAgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5DcmVkZW50aWFscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGltcGxlbWVudHMgSURvbWFpbkNyZWRlbnRpYWxzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2RvbWFpbnMvJztcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KFxuICAgIHJlc3BvbnNlOiBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YVxuICApOiBEb21haW5DcmVkZW50aWFsc0xpc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHRvdGFsQ291bnQ6IHJlc3BvbnNlLmJvZHkudG90YWxfY291bnRcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6IENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURlbGV0ZWRSZXNwb25zZShcbiAgICByZXNwb25zZTpEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICBzcGVjOiByZXNwb25zZS5ib2R5LnNwZWNcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluQ3JlZGVudGlhbHNRdWVyeSk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL2NyZWRlbnRpYWxzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChyZXMgYXMgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpbkNyZWRlbnRpYWxzXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmcsXG4gICAgZGF0YTogVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzLyR7Y3JlZGVudGlhbHNMb2dpbn1gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRGVsZXRlZFJlc3BvbnNlKHJlcykpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJUmVzcG9uc2UgZnJvbSAnLi9pbnRlcmZhY2VzL0FwaVJlc3BvbnNlJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtLFxuICBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlLFxuICBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ3NJdGVtLFxuICBEb21haW5UYWdzSXRlbUluZm8sXG4gIERvbWFpblRhZ3NMaXN0LFxuICBEb21haW5UYWdzTWVzc2FnZVJlcyxcbiAgRG9tYWluVGFnc1F1ZXJ5LFxuICBEb21haW5UYWdzUmVzcG9uc2VEYXRhLFxuICBEb21haW5UYWdzU3RhdGlzdGljUXVlcnksXG4gIERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnU3RhdGlzdGljSXRlbSxcbiAgRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0LFxuICBJRG9tYWluVGFnc0NsaWVudCxcbiAgUGFnZXNMaXN0LFxuICBQYWdlc0xpc3RBY2N1bXVsYXRvcixcbiAgUGFyc2VkUGFnZXNMaXN0LFxuICBSZXNvbHV0aW9uXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5UYWdzJztcblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZyBpbXBsZW1lbnRzIERvbWFpblRhZ3NJdGVtIHtcbiAgdGFnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICdmaXJzdC1zZWVuJzogRGF0ZTtcbiAgJ2xhc3Qtc2Vlbic6IERhdGU7XG5cbiAgY29uc3RydWN0b3IodGFnSW5mbzogRG9tYWluVGFnc0l0ZW1JbmZvKSB7XG4gICAgdGhpcy50YWcgPSB0YWdJbmZvLnRhZztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnSW5mby5kZXNjcmlwdGlvbjtcbiAgICB0aGlzWydmaXJzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydmaXJzdC1zZWVuJ10pO1xuICAgIHRoaXNbJ2xhc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snbGFzdC1zZWVuJ10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UYWdTdGF0aXN0aWMgaW1wbGVtZW50cyBEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQge1xuICB0YWc6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgc3RhcnQ6IERhdGU7XG4gIGVuZDogRGF0ZTtcbiAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgc3RhdHM6IERvbWFpblRhZ1N0YXRpc3RpY0l0ZW1bXTtcblxuICBjb25zdHJ1Y3Rvcih0YWdTdGF0aXN0aWNJbmZvOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2UpIHtcbiAgICB0aGlzLnRhZyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS50YWc7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXJ0KTtcbiAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5lbmQpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5yZXNvbHV0aW9uO1xuICAgIHRoaXMuc3RhdHMgPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0OiBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSkge1xuICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0LCB0aW1lOiBuZXcgRGF0ZShzdGF0LnRpbWUpIH07XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpblRhZ3NDbGllbnQgaW1wbGVtZW50cyBJRG9tYWluVGFnc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VQYWdlTGlua3MocmVzcG9uc2U6IERvbWFpblRhZ3NSZXNwb25zZURhdGEpOiBQYXJzZWRQYWdlc0xpc3Qge1xuICAgIGNvbnN0IHBhZ2VzID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuYm9keS5wYWdpbmcgYXMgUGFnZXNMaXN0KTtcbiAgICByZXR1cm4gcGFnZXMucmVkdWNlKFxuICAgICAgKGFjYzogUGFnZXNMaXN0QWNjdW11bGF0b3IsIGVudHJpZTogW3VybDogc3RyaW5nLCBpZDogc3RyaW5nXSkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IGVudHJpZVswXTtcbiAgICAgICAgY29uc3QgdXJsID0gZW50cmllWzFdO1xuICAgICAgICBhY2NbaWRdID0ge1xuICAgICAgICAgIGlkLFxuICAgICAgICAgIHVybFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge31cbiAgICApIGFzIHVua25vd24gYXMgUGFyc2VkUGFnZXNMaXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW5UYWdzTGlzdChcbiAgICByZXNwb25zZTogRG9tYWluVGFnc1Jlc3BvbnNlRGF0YVxuICApOiBEb21haW5UYWdzTGlzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgodGFnSW5mbykgPT4gbmV3IERvbWFpblRhZyh0YWdJbmZvKSksXG4gICAgICBwYWdlczogdGhpcy5fcGFyc2VQYWdlTGlua3MocmVzcG9uc2UpXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVGFnU3RhdGlzdGljKFxuICAgIHJlc3BvbnNlOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2VcbiAgKTogRG9tYWluVGFnU3RhdGlzdGljIHtcbiAgICByZXR1cm4gbmV3IERvbWFpblRhZ1N0YXRpc3RpYyhyZXNwb25zZSk7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRhZ3NRdWVyeSk6IFByb21pc2U8RG9tYWluVGFnc0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW5UYWdzTGlzdChyZXMgYXMgRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSlcbiAgICAgICk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRhZyhyZXMuYm9keSlcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSwgZGVzY3JpcHRpb24pXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzXG4gICAgICApO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L3RhZ3MvJHt0YWd9YClcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiAoXG4gICAgICAgIHtcbiAgICAgICAgICBtZXNzYWdlOiByZXMuYm9keS5tZXNzYWdlLFxuICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1c1xuICAgICAgICB9IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzKSk7XG4gIH1cblxuICBzdGF0aXN0aWMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBxdWVyeTogRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5KVxuICAgIDogUHJvbWlzZTxEb21haW5UYWdTdGF0aXN0aWM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZVRhZ1N0YXRpc3RpYyhyZXMpXG4gICAgICApO1xuICB9XG5cbiAgY291bnRyaWVzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvY291bnRyaWVzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgcHJvdmlkZXJzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvcHJvdmlkZXJzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgZGV2aWNlcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9kZXZpY2VzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgRG9tYWluVGVtcGxhdGUsIERvbWFpblRlbXBsYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVzUXVlcnksXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YSxcbiAgR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgSURvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0LFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UsXG4gIE5vdGlmaWNhdGlvblJlc3VsdCxcbiAgU2hvcnRUZW1wbGF0ZVZlcnNpb24sXG4gIFRlbXBsYXRlUXVlcnksXG4gIFRlbXBsYXRlVmVyc2lvbixcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0XG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5UZW1wbGF0ZXMnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluVGVtcGxhdGVJdGVtIGltcGxlbWVudHMgRG9tYWluVGVtcGxhdGUge1xuICBuYW1lIDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbiA6IHN0cmluZztcbiAgY3JlYXRlZEF0IDogRGF0ZSB8ICcnO1xuICBjcmVhdGVkQnkgOiBzdHJpbmc7XG4gIGlkIDogc3RyaW5nO1xuICB2ZXJzaW9uPzogVGVtcGxhdGVWZXJzaW9uO1xuICB2ZXJzaW9ucz86IFNob3J0VGVtcGxhdGVWZXJzaW9uW107XG5cbiAgY29uc3RydWN0b3IoZG9tYWluVGVtcGxhdGVGcm9tQVBJOiBEb21haW5UZW1wbGF0ZSkge1xuICAgIHRoaXMubmFtZSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5uYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuZGVzY3JpcHRpb247XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0ID8gbmV3IERhdGUoZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRBdCkgOiAnJztcbiAgICB0aGlzLmNyZWF0ZWRCeSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQnk7XG4gICAgdGhpcy5pZCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5pZDtcblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbikge1xuICAgICAgdGhpcy52ZXJzaW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb247XG4gICAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24uY3JlYXRlZEF0KSB7XG4gICAgICAgIHRoaXMudmVyc2lvbi5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMgJiYgZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy52ZXJzaW9ucyA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5tYXAoKHZlcnNpb24pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyAuLi52ZXJzaW9uIH07XG4gICAgICAgIHJlc3VsdC5jcmVhdGVkQXQgPSBuZXcgRGF0ZSh2ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluVGVtcGxhdGVzQ2xpZW50IGltcGxlbWVudHMgSURvbWFpblRlbXBsYXRlc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNyZWF0aW9uUmVzcG9uc2UoZGF0YTogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSk6IERvbWFpblRlbXBsYXRlSXRlbSB7XG4gICAgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShcbiAgICBkYXRhOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZVxuICApOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge30gYXMgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkgJiYgZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGRhdGEuYm9keS50ZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTXV0YXRpb25SZXNwb25zZShcbiAgICBkYXRhOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2VcbiAgKTogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0ID0ge30gYXMgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKGRhdGE6IE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlKTogTm90aWZpY2F0aW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IE5vdGlmaWNhdGlvblJlc3VsdCA9IHt9IGFzIE5vdGlmaWNhdGlvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKFxuICAgIGRhdGE6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlXG4gICk6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7fSBhcyBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgcmVzdWx0LnRlbXBsYXRlVmVyc2lvbiA9IHsgdGFnOiBkYXRhLmJvZHkudGVtcGxhdGUudmVyc2lvbi50YWcgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VMaXN0KHJlc3BvbnNlOiBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UpOiBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgoZDogRG9tYWluVGVtcGxhdGUpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZCkpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHJlc3BvbnNlLmJvZHkucGFnaW5nO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMoXG4gICAgcmVzcG9uc2U6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2VcbiAgKTogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdDtcblxuICAgIGRhdGEudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlc3BvbnNlLmJvZHkudGVtcGxhdGUpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHJlc3BvbnNlLmJvZHkucGFnaW5nO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5KTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUxpc3QocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHF1ZXJ5PzogVGVtcGxhdGVRdWVyeSk6IFByb21pc2U8RG9tYWluVGVtcGxhdGVJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlcy5ib2R5LnRlbXBsYXRlKVxuICAgICAgKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZURhdGFcbiAgKTogUHJvbWlzZTxEb21haW5UZW1wbGF0ZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhXG4gICk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZyk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95QWxsKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxOb3RpZmljYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJykpXG4gICAgICAudGhlbigocmVzOiBOb3RpZmljYXRpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgY3JlYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIGRhdGEpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShyZXMpXG4gICAgICApO1xuICB9XG5cbiAgZ2V0VmVyc2lvbihkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UZW1wbGF0ZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpXG4gICAgICApO1xuICB9XG5cbiAgdXBkYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBkZXN0cm95VmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgLnRoZW4oKHJlczogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGxpc3RWZXJzaW9ucyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5XG4gICk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhyZXMpXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUElFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgc3RhdHVzOiBudW1iZXIgfCBzdHJpbmc7XG4gIHN0YWNrOiBzdHJpbmc7XG4gIGRldGFpbHM6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgc3RhdHVzLFxuICAgIHN0YXR1c1RleHQsXG4gICAgbWVzc2FnZSxcbiAgICBib2R5ID0ge31cbiAgfTogQVBJRXJyb3JPcHRpb25zKSB7XG4gICAgY29uc3QgeyBtZXNzYWdlOiBib2R5TWVzc2FnZSwgZXJyb3IgfSA9IGJvZHk7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IGVycm9yIHx8IHN0YXR1c1RleHQ7XG4gICAgdGhpcy5kZXRhaWxzID0gYm9keU1lc3NhZ2U7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7XG4gIEV2ZW50c0xpc3QsIEV2ZW50c1BhZ2UsIEV2ZW50c1Jlc3BvbnNlLCBQYWdlc0xpc3QsIFBhZ2VzTGlzdEFjY3VtdWxhdG9yLCBQYXJzZWRQYWdlc0xpc3Rcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0V2ZW50cyc7XG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50Q2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIF9wYXJzZVBhZ2VOdW1iZXIodXJsOiBzdHJpbmcpIDogc3RyaW5nIHtcbiAgICByZXR1cm4gdXJsLnNwbGl0KCcvJykucG9wKCk7XG4gIH1cblxuICBfcGFyc2VQYWdlKGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKSA6IEV2ZW50c1BhZ2Uge1xuICAgIHJldHVybiB7IGlkLCBudW1iZXI6IHRoaXMuX3BhcnNlUGFnZU51bWJlcih1cmwpLCB1cmwgfTtcbiAgfVxuXG4gIF9wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZTogRXZlbnRzUmVzcG9uc2UpIDogUGFyc2VkUGFnZXNMaXN0IHtcbiAgICBjb25zdCBwYWdlcyA9IE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlLmJvZHkucGFnaW5nIGFzIFBhZ2VzTGlzdCk7XG4gICAgcmV0dXJuIHBhZ2VzLnJlZHVjZShcbiAgICAgIChhY2M6IFBhZ2VzTGlzdEFjY3VtdWxhdG9yLCBlbnRyaWU6IFt1cmw6IHN0cmluZywgaWQ6IHN0cmluZ10pID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBlbnRyaWVbMF07XG4gICAgICAgIGNvbnN0IHVybCA9IGVudHJpZVsxXTtcbiAgICAgICAgYWNjW2lkXSA9IHRoaXMuX3BhcnNlUGFnZShpZCwgdXJsKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9XG4gICAgKSBhcyB1bmtub3duIGFzIFBhcnNlZFBhZ2VzTGlzdDtcbiAgfVxuXG4gIF9wYXJzZUV2ZW50TGlzdChyZXNwb25zZTogRXZlbnRzUmVzcG9uc2UpIDogRXZlbnRzTGlzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLFxuICAgICAgcGFnZXM6IHRoaXMuX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlKVxuICAgIH07XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogeyBwYWdlOiBzdHJpbmcgfSkgOiBQcm9taXNlPEV2ZW50c0xpc3Q+IHtcbiAgICBsZXQgdXJsO1xuICAgIGNvbnN0IHF1ZXJ5Q29weSA9IHsgLi4ucXVlcnkgfTtcbiAgICBpZiAocXVlcnlDb3B5ICYmIHF1ZXJ5Q29weS5wYWdlKSB7XG4gICAgICB1cmwgPSB1cmxqb2luKCcvdjMnLCBkb21haW4sICdldmVudHMnLCBxdWVyeUNvcHkucGFnZSk7XG4gICAgICBkZWxldGUgcXVlcnlDb3B5LnBhZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ2V2ZW50cycpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmwsIHF1ZXJ5Q29weSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogRXZlbnRzUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRXZlbnRMaXN0KHJlc3BvbnNlKSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuaW1wb3J0IHsgSXBQb29sLCBJcFBvb2xMaXN0UmVzcG9uc2UsIElwUG9vbFVwZGF0ZURhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvSXBQb29scyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElwUG9vbHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeTogYW55KTogUHJvbWlzZTxJcFBvb2xbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjEvaXBfcG9vbHMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogSXBQb29sTGlzdFJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlSXBQb29sc1Jlc3BvbnNlKHJlc3BvbnNlKSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogeyBuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uPzogc3RyaW5nLCBpcHM/OiBzdHJpbmdbXSB9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjEvaXBfcG9vbHMnLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7IGJvZHk6IHsgbWVzc2FnZTogc3RyaW5nLCBwb29sX2lkOiBzdHJpbmcgfSB9KSA9PiByZXNwb25zZT8uYm9keSk7XG4gIH1cblxuICB1cGRhdGUocG9vbElkOiBzdHJpbmcsIGRhdGE6IElwUG9vbFVwZGF0ZURhdGEpIDogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBhdGNoV2l0aEZEKGAvdjEvaXBfcG9vbHMvJHtwb29sSWR9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogeyBib2R5OiBhbnkgfSkgPT4gcmVzcG9uc2U/LmJvZHkpO1xuICB9XG5cbiAgZGVsZXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiB7IGlkOiBzdHJpbmcsIHBvb2xfaWQ6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92MS9pcF9wb29scy8ke3Bvb2xJZH1gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7IGJvZHk6IGFueSB9KSA9PiByZXNwb25zZT8uYm9keSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlSXBQb29sc1Jlc3BvbnNlKHJlc3BvbnNlOiB7IGJvZHk6IGFueSB8IGFueSB9KSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkuaXBfcG9vbHM7XG4gIH1cbn1cbiIsImltcG9ydCBNZ1JlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7IElwRGF0YSwgSXBzTGlzdFJlc3BvbnNlQm9keSB9IGZyb20gJy4vaW50ZXJmYWNlcy9JcHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcHNDbGllbnQge1xuICByZXF1ZXN0OiBNZ1JlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogTWdSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QocXVlcnk6IGFueSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvaXBzJywgcXVlcnkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IHsgYm9keTogSXBzTGlzdFJlc3BvbnNlQm9keSB9KSA9PiB0aGlzLnBhcnNlSXBzUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgfVxuXG4gIGdldChpcDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92My9pcHMvJHtpcH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7IGJvZHk6IElwRGF0YSB9KSA9PiB0aGlzLnBhcnNlSXBzUmVzcG9uc2UocmVzcG9uc2UpKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VJcHNSZXNwb25zZShyZXNwb25zZTogeyBib2R5OiBJcHNMaXN0UmVzcG9uc2VCb2R5IHwgSXBEYXRhIH0pIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7XG4gIExpc3RzUXVlcnksXG4gIENyZWF0ZVVwZGF0ZUxpc3QsXG4gIERlc3Ryb3llZExpc3QsXG4gIE1haWxpbmdMaXN0XG59IGZyb20gJy4vaW50ZXJmYWNlcy9saXN0cyc7XG5pbXBvcnQgeyBJTWFpbExpc3RzTWVtYmVycyB9IGZyb20gJy4vaW50ZXJmYWNlcy9tYWlsTGlzdE1lbWJlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0c0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBtZW1iZXJzOiBJTWFpbExpc3RzTWVtYmVycztcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBtZW1iZXJzOklNYWlsTGlzdHNNZW1iZXJzKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICAgIHRoaXMubWVtYmVycyA9IG1lbWJlcnM7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogTGlzdHNRdWVyeSk6IFByb21pc2U8TWFpbGluZ0xpc3RbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS9wYWdlc2AsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lml0ZW1zIGFzIE1haWxpbmdMaXN0W10pO1xuICB9XG5cbiAgZ2V0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHRoaXMuYmFzZVJvdXRlLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgdXBkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgZGVzdHJveShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8RGVzdHJveWVkTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIERlc3Ryb3llZExpc3QpO1xuICB9XG59XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgTWFpbExpc3RNZW1iZXJzUXVlcnksXG4gIElNYWlsTGlzdHNNZW1iZXJzLFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnMsXG4gIE1haWxMaXN0TWVtYmVyLFxuICBNdWx0aXBsZU1lbWJlcnNEYXRhLFxuICBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhLFxuICBEZWxldGVkTWVtYmVyLFxuICBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXEsXG4gIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlXG59IGZyb20gJy4vaW50ZXJmYWNlcy9tYWlsTGlzdE1lbWJlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlsTGlzdHNNZW1iZXJzIGltcGxlbWVudHMgSU1haWxMaXN0c01lbWJlcnMge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvbGlzdHMnO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0FuZFVwZGF0ZURhdGEoZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzKSB7XG4gICAgY29uc3QgbmV3RGF0YSA9IHsgLi4uZGF0YSB9O1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhLnZhcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBuZXdEYXRhLnZhcnMgPSBKU09OLnN0cmluZ2lmeShuZXdEYXRhLnZhcnMpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YS5zdWJzY3JpYmVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIG5ld0RhdGEuc3Vic2NyaWJlZCA9IGRhdGEuc3Vic2NyaWJlZCA/ICd5ZXMnIDogJ25vJztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RGF0YSBhcyBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNSZXE7XG4gIH1cblxuICBsaXN0TWVtYmVycyhtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgcXVlcnk/OiBNYWlsTGlzdE1lbWJlcnNRdWVyeSk6IFByb21pc2U8TWFpbExpc3RNZW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy9wYWdlc2AsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lml0ZW1zIGFzIE1haWxMaXN0TWVtYmVyW10pO1xuICB9XG5cbiAgZ2V0TWVtYmVyKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgY3JlYXRlTWVtYmVyKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVyc1xuICApOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgY29uc3QgcmVxRGF0YSA9IHRoaXMuY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnNgLCByZXFEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lm1lbWJlciBhcyBNYWlsTGlzdE1lbWJlcik7XG4gIH1cblxuICBjcmVhdGVNZW1iZXJzKFxuICAgIG1haWxMaXN0QWRkcmVzczogc3RyaW5nLFxuICAgIGRhdGE6IE11bHRpcGxlTWVtYmVyc0RhdGFcbiAgKTogUHJvbWlzZTxOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZT4ge1xuICAgIGNvbnN0IG5ld0RhdGE6IE11bHRpcGxlTWVtYmVyc1JlcURhdGEgPSB7XG4gICAgICBtZW1iZXJzOiBBcnJheS5pc0FycmF5KGRhdGEubWVtYmVycykgPyBKU09OLnN0cmluZ2lmeShkYXRhLm1lbWJlcnMpIDogZGF0YS5tZW1iZXJzLFxuICAgICAgdXBzZXJ0OiBkYXRhLnVwc2VydFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLmpzb25gLCBuZXdEYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIE5ld011bHRpcGxlTWVtYmVyc1Jlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBtYWlsTGlzdE1lbWJlckFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvJHttYWlsTGlzdE1lbWJlckFkZHJlc3N9YCwgcmVxRGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgZGVzdHJveU1lbWJlcihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcpIDogUHJvbWlzZTxEZWxldGVkTWVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgRGVsZXRlZE1lbWJlcik7XG4gIH1cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIF9wYXJzZVJlc3BvbnNlKHJlc3BvbnNlOiB7IGJvZHk6IGFueSB9KSB7XG4gICAgaWYgKHJlc3BvbnNlLmJvZHkpIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICAgIH1cblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIGNyZWF0ZShkb21haW46IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzLm1pbWVgLCBkYXRhKVxuICAgICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92My8ke2RvbWFpbn0vbWVzc2FnZXNgLCBkYXRhKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0XG59XG4gIGZyb20gJy4vaW50ZXJmYWNlcy9NdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGltcGxlbWVudHMgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KCk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsaycpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQpO1xuICB9XG5cbiAgZ2V0KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZShsaXN0SWQ6IHN0cmluZywgZmlsZTogYW55KTogUHJvbWlzZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWAsIGZpbGUpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8Q2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCBOb2RlRm9ybURhdGEgZnJvbSAnZm9ybS1kYXRhJztcbmltcG9ydCBiYXNlNjQgZnJvbSAnYmFzZS02NCc7XG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQga3kgZnJvbSAna3ktdW5pdmVyc2FsJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuL2Vycm9yJztcbmltcG9ydCBSZXF1ZXN0T3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvUmVxdWVzdE9wdGlvbnMnO1xuaW1wb3J0IEFQSUVycm9yT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvQVBJRXJyb3JPcHRpb25zJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvSUZvcm1EYXRhJztcbmltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuXG5jb25zdCBpc1N0cmVhbSA9IChhdHRhY2htZW50OiBhbnkpID0+IHR5cGVvZiBhdHRhY2htZW50ID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYXR0YWNobWVudC5waXBlID09PSAnZnVuY3Rpb24nO1xuXG5mdW5jdGlvbiBpc05vZGVGb3JtRGF0YShmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSlcbiAgOiBmb3JtRGF0YUluc3RhbmNlIGlzIE5vZGVGb3JtRGF0YSB7XG4gIHJldHVybiAoPE5vZGVGb3JtRGF0YT5mb3JtRGF0YUluc3RhbmNlKS5nZXRIZWFkZXJzICE9PSB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IGdldEF0dGFjaG1lbnRPcHRpb25zID0gKGl0ZW06IGFueSk6IHtcbiAgZmlsZW5hbWU/OiBzdHJpbmcsXG4gIGNvbnRlbnRUeXBlPzogc3RyaW5nLFxuICBrbm93bkxlbmd0aD86IG51bWJlclxufSA9PiB7XG4gIGlmICh0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcgfHwgaXNTdHJlYW0oaXRlbSkpIHJldHVybiB7fTtcblxuICBjb25zdCB7XG4gICAgZmlsZW5hbWUsXG4gICAgY29udGVudFR5cGUsXG4gICAga25vd25MZW5ndGhcbiAgfSA9IGl0ZW07XG5cbiAgcmV0dXJuIHtcbiAgICAuLi4oZmlsZW5hbWUgPyB7IGZpbGVuYW1lIH0gOiB7IGZpbGVuYW1lOiAnZmlsZScgfSksXG4gICAgLi4uKGNvbnRlbnRUeXBlICYmIHsgY29udGVudFR5cGUgfSksXG4gICAgLi4uKGtub3duTGVuZ3RoICYmIHsga25vd25MZW5ndGggfSlcbiAgfTtcbn07XG5cbmNvbnN0IHN0cmVhbVRvU3RyaW5nID0gKHN0cmVhbTogYW55KSA9PiB7XG4gIGNvbnN0IGNodW5rczogYW55ID0gW107XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc3RyZWFtLm9uKCdkYXRhJywgKGNodW5rOiBhbnkpID0+IGNodW5rcy5wdXNoKGNodW5rKSk7XG4gICAgc3RyZWFtLm9uKCdlcnJvcicsIHJlamVjdCk7XG4gICAgc3RyZWFtLm9uKCdlbmQnLCAoKSA9PiByZXNvbHZlKEJ1ZmZlci5jb25jYXQoY2h1bmtzKS50b1N0cmluZygndXRmOCcpKSk7XG4gIH0pO1xufTtcblxuY2xhc3MgUmVxdWVzdCB7XG4gIHByaXZhdGUgdXNlcm5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBrZXk6IHN0cmluZztcbiAgcHJpdmF0ZSB1cmw6IHN0cmluZztcbiAgcHJpdmF0ZSB0aW1lb3V0OiBudW1iZXI7XG4gIHByaXZhdGUgaGVhZGVyczogYW55O1xuICBwcml2YXRlIEZvcm1EYXRhQ29uc3RydWN0b3I6IElucHV0Rm9ybURhdGE7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogUmVxdWVzdE9wdGlvbnMsIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhKSB7XG4gICAgdGhpcy51c2VybmFtZSA9IG9wdGlvbnMudXNlcm5hbWU7XG4gICAgdGhpcy5rZXkgPSBvcHRpb25zLmtleTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIGFzIHN0cmluZztcbiAgICB0aGlzLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XG4gICAgdGhpcy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICAgIHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvciA9IGZvcm1EYXRhO1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdChtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIGlucHV0T3B0aW9ucz86IGFueSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCBvcHRpb25zID0geyAuLi5pbnB1dE9wdGlvbnMgfTtcbiAgICBjb25zdCBiYXNpYyA9IGJhc2U2NC5lbmNvZGUoYCR7dGhpcy51c2VybmFtZX06JHt0aGlzLmtleX1gKTtcbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7YmFzaWN9YCxcbiAgICAgIC4uLnRoaXMuaGVhZGVycyxcbiAgICAgIC4uLm9wdGlvbnM/LmhlYWRlcnNcbiAgICB9O1xuXG4gICAgZGVsZXRlIG9wdGlvbnM/LmhlYWRlcnM7XG5cbiAgICBpZiAoIWhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSB7XG4gICAgICAvLyBmb3IgZm9ybS1kYXRhIGl0IHdpbGwgYmUgTnVsbCBzbyB3ZSBuZWVkIHRvIHJlbW92ZSBpdFxuICAgICAgZGVsZXRlIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcmFtcyA9IHsgLi4ub3B0aW9ucyB9O1xuXG4gICAgaWYgKG9wdGlvbnM/LnF1ZXJ5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9wdGlvbnM/LnF1ZXJ5KS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJhbXMuc2VhcmNoUGFyYW1zID0gb3B0aW9ucy5xdWVyeTtcbiAgICAgIGRlbGV0ZSBwYXJhbXMucXVlcnk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCd1cmwgLS0tLS0tLS0tPicsIHVybGpvaW4odGhpcy51cmwsIHVybCkpO1xuICAgIGNvbnNvbGUubG9nKCdtZXRob2QgLS0tLS0tLS0tPicsIG1ldGhvZCk7XG4gICAgY29uc29sZS5sb2coJ3BhcmFtcyAtLS0tLS0tLS0+JywgcGFyYW1zKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGt5KFxuICAgICAgdXJsam9pbih0aGlzLnVybCwgdXJsKSxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiBtZXRob2QudG9Mb2NhbGVVcHBlckNhc2UoKSxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgdGhyb3dIdHRwRXJyb3JzOiBmYWxzZSxcbiAgICAgICAgdGltZW91dDogdGhpcy50aW1lb3V0LFxuICAgICAgICAuLi5wYXJhbXNcbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKCFyZXNwb25zZT8ub2spIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSByZXNwb25zZT8uYm9keSAmJiBpc1N0cmVhbShyZXNwb25zZS5ib2R5KVxuICAgICAgICA/IGF3YWl0IHN0cmVhbVRvU3RyaW5nKHJlc3BvbnNlLmJvZHkpXG4gICAgICAgIDogYXdhaXQgcmVzcG9uc2U/Lmpzb24oKTtcblxuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZT8uc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXNwb25zZT8uc3RhdHVzVGV4dCxcbiAgICAgICAgYm9keTogeyBtZXNzYWdlIH1cbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXMgPSB7XG4gICAgICBib2R5OiBhd2FpdCByZXNwb25zZT8uanNvbigpLFxuICAgICAgc3RhdHVzOiByZXNwb25zZT8uc3RhdHVzXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZygncmVzIC0tLS0tLS0tLS0tLS0+JywgcmVzKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcXVlcnkobWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBxdWVyeTogYW55LCBvcHRpb25zPzogYW55KSA6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB7IHF1ZXJ5LCAuLi5vcHRpb25zIH0pO1xuICB9XG5cbiAgY29tbWFuZChtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIGRhdGE6IGFueSwgb3B0aW9ucz86IGFueSkgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSxcbiAgICAgIGJvZHk6IGRhdGEsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfSk7XG4gIH1cblxuICBnZXQodXJsOiBzdHJpbmcsIHF1ZXJ5PzogYW55LCBvcHRpb25zPzogYW55KSA6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeSgnZ2V0JywgdXJsLCBxdWVyeSwgb3B0aW9ucyk7XG4gIH1cblxuICBoZWFkKHVybDogc3RyaW5nLCBxdWVyeTogYW55LCBvcHRpb25zOiBhbnkpIDogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5KCdoZWFkJywgdXJsLCBxdWVyeSwgb3B0aW9ucyk7XG4gIH1cblxuICBvcHRpb25zKHVybDogc3RyaW5nLCBxdWVyeTogYW55LCBvcHRpb25zOiBhbnkpIDogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5KCdvcHRpb25zJywgdXJsLCBxdWVyeSwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0KHVybDogc3RyaW5nLCBkYXRhOiBhbnksIG9wdGlvbnM/OiBhbnkpIDogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdFdpdGhGRCh1cmw6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBkYXRhIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6IG51bGwgfVxuICAgIH07XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3Bvc3QnLCB1cmwsIGZvcm1EYXRhLCBwYXJhbXMpO1xuICB9XG5cbiAgcHV0V2l0aEZEKHVybDogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRhdGEgb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHBhcmFtczogYW55ID0ge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogbnVsbCB9XG4gICAgfTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBmb3JtRGF0YSwgcGFyYW1zKTtcbiAgfVxuXG4gIHBhdGNoV2l0aEZEKHVybDogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRhdGEgb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHBhcmFtczogYW55ID0ge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogbnVsbCB9XG4gICAgfTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncGF0Y2gnLCB1cmwsIGZvcm1EYXRhLCBwYXJhbXMpO1xuICB9XG5cbiAgY3JlYXRlRm9ybURhdGEoZGF0YTogYW55KTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEge1xuICAgIGNvbnN0IGZvcm1EYXRhOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSA9IE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGRhdGFba2V5XTsgfSlcbiAgICAgIC5yZWR1Y2UoKGZvcm1EYXRhQWNjOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSwga2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGVLZXlzID0gWydhdHRhY2htZW50JywgJ2lubGluZScsICdmaWxlJ107XG4gICAgICAgIGlmIChmaWxlS2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgdGhpcy5hZGRGaWxlc1RvRkQoa2V5LCBkYXRhW2tleV0sIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5ID09PSAnbWVzc2FnZScpIHsgLy8gbWltZSBtZXNzYWdlXG4gICAgICAgICAgdGhpcy5hZGRNaW1lRGF0YVRvRkQoa2V5LCBkYXRhW2tleV0sIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZENvbW1vblByb3BlcnR5VG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICByZXR1cm4gZm9ybURhdGFBY2M7XG4gICAgICB9LCBuZXcgdGhpcy5Gb3JtRGF0YUNvbnN0cnVjdG9yKCkpO1xuICAgIHJldHVybiBmb3JtRGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkTWltZURhdGFUb0ZEKFxuICAgIGtleTogc3RyaW5nLFxuICAgIGRhdGE6IEJ1ZmZlciB8IEJsb2IsXG4gICAgZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgaWYgKGlzTm9kZUZvcm1EYXRhKGZvcm1EYXRhSW5zdGFuY2UpKSB7XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSB7XG4gICAgICAgIGZvcm1EYXRhSW5zdGFuY2UuYXBwZW5kKGtleSwgZGF0YSwgeyBmaWxlbmFtZTogJ01pbWVNZXNzYWdlJyB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybURhdGFJbnN0YW5jZS5hcHBlbmQoa2V5LCBkYXRhIGFzIEJsb2IsICdNaW1lTWVzc2FnZScpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkRmlsZXNUb0ZEKFxuICAgIHByb3BlcnR5TmFtZTogc3RyaW5nLFxuICAgIHZhbHVlOiBhbnksXG4gICAgZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgYXBwZW5kRmlsZVRvRkQgPSAoXG4gICAgICBrZXk6IHN0cmluZyxcbiAgICAgIG9iajogYW55LFxuICAgICAgZm9ybURhdGE6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICAgKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBpc1N0cmVhbURhdGEgPSBpc1N0cmVhbShvYmopO1xuICAgICAgY29uc3Qgb2JqRGF0YSA9IGlzU3RyZWFtRGF0YSA/IG9iaiA6IG9iai5kYXRhO1xuICAgICAgLy8gZ2V0QXR0YWNobWVudE9wdGlvbnMgc2hvdWxkIGJlIGNhbGxlZCB3aXRoIG9iaiBwYXJhbWV0ZXIgdG8gcHJldmVudCBsb29zaW5nIGZpbGVuYW1lXG4gICAgICBjb25zdCBvcHRpb25zID0gZ2V0QXR0YWNobWVudE9wdGlvbnMob2JqKTtcbiAgICAgIGlmIChpc05vZGVGb3JtRGF0YShmb3JtRGF0YSkpIHtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgb2JqRGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIG9iakRhdGEsIG9wdGlvbnMuZmlsZW5hbWUpO1xuICAgIH07XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCBpdGVtLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHBlbmRGaWxlVG9GRChwcm9wZXJ0eU5hbWUsIHZhbHVlLCBmb3JtRGF0YUluc3RhbmNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZENvbW1vblByb3BlcnR5VG9GRChcbiAgICBrZXk6IHN0cmluZyxcbiAgICB2YWx1ZTogYW55LFxuICAgIGZvcm1EYXRhQWNjOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW06IGFueSkge1xuICAgICAgICBmb3JtRGF0YUFjYy5hcHBlbmQoa2V5LCBpdGVtKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgZm9ybURhdGFBY2MuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHB1dCh1cmw6IHN0cmluZywgZGF0YTogYW55LCBvcHRpb25zPzogYW55KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICBwYXRjaCh1cmw6IHN0cmluZywgZGF0YTogYW55LCBvcHRpb25zPzogYW55KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3BhdGNoJywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIGRlbGV0ZSh1cmw6IHN0cmluZywgZGF0YT86IGFueSwgb3B0aW9ucz86IGFueSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdkZWxldGUnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVlc3Q7XG4iLCJpbXBvcnQge1xuICBDcmVhdGVVcGRhdGVSb3V0ZURhdGEsIERlc3Ryb3lSb3V0ZVJlc3BvbnNlLCBSb3V0ZSwgUm91dGVzTGlzdFF1ZXJ5LCBVcGRhdGVSb3V0ZVJlc3BvbnNlXG59IGZyb20gJy4vaW50ZXJmYWNlcy9yb3V0ZXMnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QocXVlcnk6IFJvdXRlc0xpc3RRdWVyeSk6IFByb21pc2U8Um91dGVbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvcm91dGVzJywgcXVlcnkpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkuaXRlbXMpO1xuICB9XG5cbiAgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFJvdXRlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYC92My9yb3V0ZXMvJHtpZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5LnJvdXRlKTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFJvdXRlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvcm91dGVzJywgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5yb3V0ZSk7XG4gIH1cblxuICB1cGRhdGUoaWQ6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxVcGRhdGVSb3V0ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYC92My9yb3V0ZXMvJHtpZH1gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGRlc3Ryb3koaWQ6IHN0cmluZyk6IFByb21pc2U8RGVzdHJveVJvdXRlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3YzL3JvdXRlcy8ke2lkfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHsgU3RhdHNRdWVyeSwgU3RhdHNPcHRpb25zLCBTdGF0IH0gZnJvbSAnLi9pbnRlcmZhY2VzL1N0YXRzT3B0aW9ucyc7XG5cbmNsYXNzIFN0YXRzIHtcbiAgc3RhcnQ6IERhdGU7XG4gIGVuZDogRGF0ZTtcbiAgcmVzb2x1dGlvbjogc3RyaW5nO1xuICBzdGF0czogU3RhdFtdO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFN0YXRzT3B0aW9ucykge1xuICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZShkYXRhLnN0YXJ0KTtcbiAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKGRhdGEuZW5kKTtcbiAgICB0aGlzLnJlc29sdXRpb24gPSBkYXRhLnJlc29sdXRpb247XG4gICAgdGhpcy5zdGF0cyA9IGRhdGEuc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0OiBTdGF0KSB7XG4gICAgICBjb25zdCByZXMgPSB7IC4uLnN0YXQgfTtcbiAgICAgIHJlcy50aW1lID0gbmV3IERhdGUoc3RhdC50aW1lKTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5OiBTdGF0c1F1ZXJ5KTogQXJyYXk8QXJyYXk8c3RyaW5nPj4ge1xuICAgIGxldCBzZWFyY2hQYXJhbXMgPSBbXTtcbiAgICBpZiAodHlwZW9mIHF1ZXJ5ID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoKSB7XG4gICAgICBzZWFyY2hQYXJhbXMgPSBPYmplY3QuZW50cmllcyhxdWVyeSkucmVkdWNlKChhcnJheVdpdGhQYWlycywgY3VycmVudFBhaXIpID0+IHtcbiAgICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gY3VycmVudFBhaXI7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCByZXBlYXRlZFByb3BlcnR5ID0gdmFsdWUubWFwKChpdGVtKSA9PiBba2V5LCBpdGVtXSk7XG4gICAgICAgICAgcmV0dXJuIFsuLi5hcnJheVdpdGhQYWlycywgLi4ucmVwZWF0ZWRQcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXlXaXRoUGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgICByZXR1cm4gYXJyYXlXaXRoUGFpcnM7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlYXJjaFBhcmFtcztcbiAgfVxuXG4gIF9wYXJzZVN0YXRzKHJlc3BvbnNlOiB7IGJvZHk6IFN0YXRzT3B0aW9ucyB9KTogU3RhdHMge1xuICAgIHJldHVybiBuZXcgU3RhdHMocmVzcG9uc2UuYm9keSk7XG4gIH1cblxuICBnZXREb21haW4oZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8U3RhdHM+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ3N0YXRzL3RvdGFsJyksIHNlYXJjaFBhcmFtcylcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlU3RhdHMpO1xuICB9XG5cbiAgZ2V0QWNjb3VudChxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPFN0YXRzPiB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3N0YXRzL3RvdGFsJywgc2VhcmNoUGFyYW1zKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VTdGF0cyk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgQm91bmNlRGF0YSxcbiAgQ29tcGxhaW50RGF0YSxcbiAgVW5zdWJzY3JpYmVEYXRhLFxuICBXaGl0ZUxpc3REYXRhXG59IGZyb20gJy4vaW50ZXJmYWNlcy9TdXByZXNzaW9ucyc7XG5cbmNvbnN0IGNyZWF0ZU9wdGlvbnMgPSB7XG4gIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XG59O1xuXG5jbGFzcyBCb3VuY2Uge1xuICB0eXBlOiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY29kZTogbnVtYmVyO1xuICBlcnJvcjogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IEJvdW5jZURhdGEpIHtcbiAgICB0aGlzLnR5cGUgPSAnYm91bmNlcyc7XG4gICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgIHRoaXMuY29kZSA9ICtkYXRhLmNvZGU7XG4gICAgdGhpcy5lcnJvciA9IGRhdGEuZXJyb3I7XG4gICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgfVxufVxuXG5jbGFzcyBDb21wbGFpbnQge1xuICB0eXBlOiBzdHJpbmc7XG4gIGFkZHJlc3M6IGFueTtcbiAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBDb21wbGFpbnREYXRhKSB7XG4gICAgdGhpcy50eXBlID0gJ2NvbXBsYWludHMnO1xuICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICB9XG59XG5cbmNsYXNzIFVuc3Vic2NyaWJlIHtcbiAgdHlwZTogc3RyaW5nO1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIHRhZ3M6IGFueTtcbiAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBVbnN1YnNjcmliZURhdGEpIHtcbiAgICB0aGlzLnR5cGUgPSAndW5zdWJzY3JpYmVzJztcbiAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgdGhpcy50YWdzID0gZGF0YS50YWdzO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gIH1cbn1cblxuY2xhc3MgV2hpdGVMaXN0IHtcbiAgdHlwZTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICByZWFzb246IHN0cmluZztcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFdoaXRlTGlzdERhdGEpIHtcbiAgICB0aGlzLnR5cGUgPSAnd2hpdGVsaXN0cyc7XG4gICAgdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgdGhpcy5yZWFzb24gPSBkYXRhLnJlYXNvbjtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZEF0KTtcbiAgfVxufVxuXG50eXBlIFRNb2RlbCA9IHR5cGVvZiBCb3VuY2UgfCB0eXBlb2YgQ29tcGxhaW50IHwgdHlwZW9mIFVuc3Vic2NyaWJlIHwgdHlwZW9mIFdoaXRlTGlzdDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwcHJlc3Npb25DbGllbnQge1xuICByZXF1ZXN0OiBhbnk7XG4gIG1vZGVsczoge1xuICAgIGJvdW5jZXM6IHR5cGVvZiBCb3VuY2U7XG4gICAgY29tcGxhaW50czogdHlwZW9mIENvbXBsYWludDtcbiAgICB1bnN1YnNjcmliZXM6IHR5cGVvZiBVbnN1YnNjcmliZTtcbiAgICB3aGl0ZWxpc3RzOiB0eXBlb2YgV2hpdGVMaXN0O1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubW9kZWxzID0ge1xuICAgICAgYm91bmNlczogQm91bmNlLFxuICAgICAgY29tcGxhaW50czogQ29tcGxhaW50LFxuICAgICAgdW5zdWJzY3JpYmVzOiBVbnN1YnNjcmliZSxcbiAgICAgIHdoaXRlbGlzdHM6IFdoaXRlTGlzdCxcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlUGFnZShpZDogc3RyaW5nLCBwYWdlVXJsOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXJzZWRVcmwgPSB1cmwucGFyc2UocGFnZVVybCwgdHJ1ZSk7XG4gICAgY29uc3QgeyBxdWVyeSB9ID0gcGFyc2VkVXJsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkLFxuICAgICAgcGFnZTogcXVlcnkucGFnZSxcbiAgICAgIGFkZHJlc3M6IHF1ZXJ5LmFkZHJlc3MsXG4gICAgICB1cmw6IHBhZ2VVcmxcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlOiB7IGJvZHk6IHsgcGFnaW5nOiBhbnkgfSB9KSB7XG4gICAgY29uc3QgcGFnZXMgPSBPYmplY3QuZW50cmllcyhyZXNwb25zZS5ib2R5LnBhZ2luZyk7XG4gICAgcmV0dXJuIHBhZ2VzLnJlZHVjZShcbiAgICAgIChhY2M6IGFueSwgW2lkLCBwYWdlVXJsXTogW3BhZ2VVcmw6IHN0cmluZywgaWQ6IHN0cmluZ10pID0+IHtcbiAgICAgICAgYWNjW2lkXSA9IHRoaXMuX3BhcnNlUGFnZShpZCwgcGFnZVVybCk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fVxuICAgICk7XG4gIH1cblxuICBfcGFyc2VMaXN0KHJlc3BvbnNlOiB7IGJvZHk6IHsgaXRlbXM6IGFueSwgcGFnaW5nOiBhbnkgfSB9LCBNb2RlbDogVE1vZGVsKSB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIGFueTtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgoZDogYW55KSA9PiBuZXcgTW9kZWwoZCkpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMuX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlKTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgX3BhcnNlSXRlbShyZXNwb25zZTogeyBib2R5OiBhbnkgfSwgTW9kZWw6IFRNb2RlbCkge1xuICAgIHJldHVybiBuZXcgTW9kZWwocmVzcG9uc2UuYm9keSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVdoaXRlTGlzdChkb21haW46IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3RXaXRoRkQodXJsam9pbigndjMnLCBkb21haW4sICd3aGl0ZWxpc3RzJyksIGRhdGEsIGNyZWF0ZU9wdGlvbnMpXG4gICAgICAudGhlbigocmVzcG9uc2U6IHsgYm9keTogYW55IH0pID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgdHlwZTogc3RyaW5nLCBxdWVyeTogYW55KSB7XG4gICAgY29uc3QgbW9kZWwgPSAodGhpcy5tb2RlbHMgYXMgYW55KVt0eXBlXTtcblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5nZXQodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogeyBib2R5OiB7IGl0ZW1zOiBhbnksIHBhZ2luZzogYW55IH0gfSkgPT4gdGhpcy5fcGFyc2VMaXN0KHJlc3BvbnNlLCBtb2RlbCkpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGFkZHJlc3M6IHN0cmluZykge1xuICAgIGNvbnN0IG1vZGVsID0gKHRoaXMubW9kZWxzIGFzIGFueSlbdHlwZV07XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAuZ2V0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7IGJvZHk6IGFueSB9KSA9PiB0aGlzLl9wYXJzZUl0ZW0ocmVzcG9uc2UsIG1vZGVsKSk7XG4gIH1cblxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgLy8gc3VwcG9ydHMgYWRkaW5nIG11bHRpcGxlIHN1cHByZXNzaW9ucyBieSBkZWZhdWx0XG4gICAgbGV0IHBvc3REYXRhO1xuICAgIGlmICh0eXBlID09PSAnd2hpdGVsaXN0cycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVdoaXRlTGlzdChkb21haW4sIGRhdGEpO1xuICAgIH1cblxuICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgcG9zdERhdGEgPSBbZGF0YV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc3REYXRhID0gWy4uLmRhdGFdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0KHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlKSwgSlNPTi5zdHJpbmdpZnkocG9zdERhdGEpLCBjcmVhdGVPcHRpb25zKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7IGJvZHk6IGFueSB9KSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgYWRkcmVzczogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLmRlbGV0ZSh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSwgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogeyBib2R5OiBhbnkgfSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdXBwcmVzc2lvbkNsaWVudDtcbiIsImltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IHsgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4vaW50ZXJmYWNlcy9NdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IHsgVmFsaWRhdGlvblJlc3VsdCwgVmFsaWRhdGlvblJlc3BvbnNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL1ZhbGlkYXRlJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRlQ2xpZW50IHtcbiAgcHVibGljIG11bHRpcGxlVmFsaWRhdGlvbjtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ6IElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubXVsdGlwbGVWYWxpZGF0aW9uID0gbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50O1xuICB9XG5cbiAgZ2V0KGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvYWRkcmVzcy92YWxpZGF0ZScsIHsgYWRkcmVzcyB9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlIDogQVBJUmVzcG9uc2UpID0+IHJlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlcyA6IFZhbGlkYXRpb25SZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgVmFsaWRhdGlvblJlc3VsdCk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcblxuaW1wb3J0IHtcbiAgVmFsaWRhdGlvblJlc3BvbnNlLFxuICBXZWJob29rTGlzdCxcbiAgV2ViaG9va1Jlc3BvbnNlLFxuICBXZWJob29rc1F1ZXJ5XG59IGZyb20gJy4vaW50ZXJmYWNlcy9XZWJob29rcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5jbGFzcyBXZWJob29rIHtcbiAgaWQ6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViaG9va0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBfcGFyc2VXZWJob29rTGlzdChyZXNwb25zZTogeyBib2R5OiB7IHdlYmhvb2tzOiBXZWJob29rTGlzdCB9IH0pOiBXZWJob29rTGlzdCB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkud2ViaG9va3M7XG4gIH1cblxuICBfcGFyc2VXZWJob29rV2l0aElEKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlc3BvbnNlOiBXZWJob29rUmVzcG9uc2UpOiBXZWJob29rIHtcbiAgICAgIGNvbnN0IHdlYmhvb2tSZXNwb25zZSA9IHJlc3BvbnNlPy5ib2R5Py53ZWJob29rO1xuICAgICAgbGV0IHVybCA9IHdlYmhvb2tSZXNwb25zZT8udXJsO1xuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgdXJsID0gd2ViaG9va1Jlc3BvbnNlPy51cmxzICYmIHdlYmhvb2tSZXNwb25zZS51cmxzLmxlbmd0aCA/IHdlYmhvb2tSZXNwb25zZS51cmxzWzBdIDogbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgV2ViaG9vayhpZCwgdXJsKTtcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlV2ViaG9va1Rlc3QocmVzcG9uc2U6IHsgYm9keTogeyBjb2RlOiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZyB9IH0pXG4gIDoge2NvZGU6IG51bWJlciwgbWVzc2FnZTpzdHJpbmd9IHtcbiAgICByZXR1cm4geyBjb2RlOiByZXNwb25zZS5ib2R5LmNvZGUsIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSB9IGFzIFZhbGlkYXRpb25SZXNwb25zZTtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5OiBXZWJob29rc1F1ZXJ5KTogUHJvbWlzZTxXZWJob29rTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnKSwgcXVlcnkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tMaXN0KTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgaWQ6IHN0cmluZyk6IFByb21pc2U8V2ViaG9vaz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIGNyZWF0ZShkb21haW46IHN0cmluZyxcbiAgICBpZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIHRlc3QgPSBmYWxzZSk6IFByb21pc2U8V2ViaG9vayB8IFZhbGlkYXRpb25SZXNwb25zZT4ge1xuICAgIGlmICh0ZXN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQsICd0ZXN0JyksIHsgdXJsIH0pXG4gICAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1Rlc3QpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJyksIHsgaWQsIHVybCB9KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogUHJvbWlzZTxXZWJob29rPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSwgeyB1cmwgfSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZykgOiBQcm9taXNlPFdlYmhvb2s+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cbn1cbiIsIi8qISBodHRwczovL210aHMuYmUvYmFzZTY0IHYxLjAuMCBieSBAbWF0aGlhcyB8IE1JVCBsaWNlbnNlICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgLlxuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLlxuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0bW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsIGFuZCB1c2Vcblx0Ly8gaXQgYXMgYHJvb3RgLlxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fTtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cblx0dmFyIGVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdC8vIE5vdGU6IHRoZSBlcnJvciBtZXNzYWdlcyB1c2VkIHRocm91Z2hvdXQgdGhpcyBmaWxlIG1hdGNoIHRob3NlIHVzZWQgYnlcblx0XHQvLyB0aGUgbmF0aXZlIGBhdG9iYC9gYnRvYWAgaW1wbGVtZW50YXRpb24gaW4gQ2hyb21pdW0uXG5cdFx0dGhyb3cgbmV3IEludmFsaWRDaGFyYWN0ZXJFcnJvcihtZXNzYWdlKTtcblx0fTtcblxuXHR2YXIgVEFCTEUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cdC8vIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvY29tbW9uLW1pY3Jvc3ludGF4ZXMuaHRtbCNzcGFjZS1jaGFyYWN0ZXJcblx0dmFyIFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMgPSAvW1xcdFxcblxcZlxcciBdL2c7XG5cblx0Ly8gYGRlY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBhdG9iYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQuIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYXRvYlxuXHQvLyBUaGUgb3B0aW1pemVkIGJhc2U2NC1kZWNvZGluZyBhbGdvcml0aG0gdXNlZCBpcyBiYXNlZCBvbiBAYXRr4oCZcyBleGNlbGxlbnRcblx0Ly8gaW1wbGVtZW50YXRpb24uIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2F0ay8xMDIwMzk2XG5cdHZhciBkZWNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KVxuXHRcdFx0LnJlcGxhY2UoUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUywgJycpO1xuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0aWYgKGxlbmd0aCAlIDQgPT0gMCkge1xuXHRcdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKC89PT8kLywgJycpO1xuXHRcdFx0bGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRsZW5ndGggJSA0ID09IDEgfHxcblx0XHRcdC8vIGh0dHA6Ly93aGF0d2cub3JnL0MjYWxwaGFudW1lcmljLWFzY2lpLWNoYXJhY3RlcnNcblx0XHRcdC9bXithLXpBLVowLTkvXS8udGVzdChpbnB1dClcblx0XHQpIHtcblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnSW52YWxpZCBjaGFyYWN0ZXI6IHRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIGJpdENvdW50ZXIgPSAwO1xuXHRcdHZhciBiaXRTdG9yYWdlO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHRidWZmZXIgPSBUQUJMRS5pbmRleE9mKGlucHV0LmNoYXJBdChwb3NpdGlvbikpO1xuXHRcdFx0Yml0U3RvcmFnZSA9IGJpdENvdW50ZXIgJSA0ID8gYml0U3RvcmFnZSAqIDY0ICsgYnVmZmVyIDogYnVmZmVyO1xuXHRcdFx0Ly8gVW5sZXNzIHRoaXMgaXMgdGhlIGZpcnN0IG9mIGEgZ3JvdXAgb2YgNCBjaGFyYWN0ZXJz4oCmXG5cdFx0XHRpZiAoYml0Q291bnRlcisrICUgNCkge1xuXHRcdFx0XHQvLyDigKZjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gYSBzaW5nbGUgQVNDSUkgY2hhcmFjdGVyLlxuXHRcdFx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0XHRcdFx0XHQweEZGICYgYml0U3RvcmFnZSA+PiAoLTIgKiBiaXRDb3VudGVyICYgNilcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHQvLyBgZW5jb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGJ0b2FgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZDogaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1idG9hXG5cdHZhciBlbmNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KTtcblx0XHRpZiAoL1teXFwwLVxceEZGXS8udGVzdChpbnB1dCkpIHtcblx0XHRcdC8vIE5vdGU6IG5vIG5lZWQgdG8gc3BlY2lhbC1jYXNlIGFzdHJhbCBzeW1ib2xzIGhlcmUsIGFzIHN1cnJvZ2F0ZXMgYXJlXG5cdFx0XHQvLyBtYXRjaGVkLCBhbmQgdGhlIGlucHV0IGlzIHN1cHBvc2VkIHRvIG9ubHkgY29udGFpbiBBU0NJSSBhbnl3YXkuXG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J1RoZSBzdHJpbmcgdG8gYmUgZW5jb2RlZCBjb250YWlucyBjaGFyYWN0ZXJzIG91dHNpZGUgb2YgdGhlICcgK1xuXHRcdFx0XHQnTGF0aW4xIHJhbmdlLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBwYWRkaW5nID0gaW5wdXQubGVuZ3RoICUgMztcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0dmFyIGE7XG5cdFx0dmFyIGI7XG5cdFx0dmFyIGM7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHQvLyBNYWtlIHN1cmUgYW55IHBhZGRpbmcgaXMgaGFuZGxlZCBvdXRzaWRlIG9mIHRoZSBsb29wLlxuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGggLSBwYWRkaW5nO1xuXG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdC8vIFJlYWQgdGhyZWUgYnl0ZXMsIGkuZS4gMjQgYml0cy5cblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCAxNjtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pIDw8IDg7XG5cdFx0XHRjID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiICsgYztcblx0XHRcdC8vIFR1cm4gdGhlIDI0IGJpdHMgaW50byBmb3VyIGNodW5rcyBvZiA2IGJpdHMgZWFjaCwgYW5kIGFwcGVuZCB0aGVcblx0XHRcdC8vIG1hdGNoaW5nIGNoYXJhY3RlciBmb3IgZWFjaCBvZiB0aGVtIHRvIHRoZSBvdXRwdXQuXG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDE4ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEyICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDYgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgJiAweDNGKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAocGFkZGluZyA9PSAyKSB7XG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgODtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGI7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEwKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyID4+IDQpICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCAyKSAmIDB4M0YpICtcblx0XHRcdFx0Jz0nXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAocGFkZGluZyA9PSAxKSB7XG5cdFx0XHRidWZmZXIgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCA0KSAmIDB4M0YpICtcblx0XHRcdFx0Jz09J1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdHZhciBiYXNlNjQgPSB7XG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCd2ZXJzaW9uJzogJzEuMC4wJ1xuXHR9O1xuXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGJhc2U2NDtcblx0XHR9KTtcblx0fVx0ZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG5cdFx0aWYgKGZyZWVNb2R1bGUpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IGJhc2U2NDtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGJhc2U2NCkge1xuXHRcdFx0XHRiYXNlNjQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IGJhc2U2NFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LmJhc2U2NCA9IGJhc2U2NDtcblx0fVxuXG59KHRoaXMpKTtcbiIsImV4cG9ydCB7ZGVmYXVsdH0gZnJvbSAna3knO1xuIiwiLyohIE1JVCBMaWNlbnNlIMKpIFNpbmRyZSBTb3JodXMgKi9cblxuY29uc3QgZ2xvYmFscyA9IHt9O1xuXG5jb25zdCBnZXRHbG9iYWwgPSBwcm9wZXJ0eSA9PiB7XG5cdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiAmJiBwcm9wZXJ0eSBpbiBzZWxmKSB7XG5cdFx0cmV0dXJuIHNlbGY7XG5cdH1cblxuXHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93ICYmIHByb3BlcnR5IGluIHdpbmRvdykge1xuXHRcdHJldHVybiB3aW5kb3c7XG5cdH1cblxuXHRpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsICYmIHByb3BlcnR5IGluIGdsb2JhbCkge1xuXHRcdHJldHVybiBnbG9iYWw7XG5cdH1cblxuXHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbFRoaXMpIHtcblx0XHRyZXR1cm4gZ2xvYmFsVGhpcztcblx0fVxufTtcblxuY29uc3QgZ2xvYmFsUHJvcGVydGllcyA9IFtcblx0J0hlYWRlcnMnLFxuXHQnUmVxdWVzdCcsXG5cdCdSZXNwb25zZScsXG5cdCdSZWFkYWJsZVN0cmVhbScsXG5cdCdmZXRjaCcsXG5cdCdBYm9ydENvbnRyb2xsZXInLFxuXHQnRm9ybURhdGEnXG5dO1xuXG5mb3IgKGNvbnN0IHByb3BlcnR5IG9mIGdsb2JhbFByb3BlcnRpZXMpIHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGdsb2JhbHMsIHByb3BlcnR5LCB7XG5cdFx0Z2V0KCkge1xuXHRcdFx0Y29uc3QgZ2xvYmFsT2JqZWN0ID0gZ2V0R2xvYmFsKHByb3BlcnR5KTtcblx0XHRcdGNvbnN0IHZhbHVlID0gZ2xvYmFsT2JqZWN0ICYmIGdsb2JhbE9iamVjdFtwcm9wZXJ0eV07XG5cdFx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nID8gdmFsdWUuYmluZChnbG9iYWxPYmplY3QpIDogdmFsdWU7XG5cdFx0fVxuXHR9KTtcbn1cblxuY29uc3QgaXNPYmplY3QgPSB2YWx1ZSA9PiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xuY29uc3Qgc3VwcG9ydHNBYm9ydENvbnRyb2xsZXIgPSB0eXBlb2YgZ2xvYmFscy5BYm9ydENvbnRyb2xsZXIgPT09ICdmdW5jdGlvbic7XG5jb25zdCBzdXBwb3J0c1N0cmVhbXMgPSB0eXBlb2YgZ2xvYmFscy5SZWFkYWJsZVN0cmVhbSA9PT0gJ2Z1bmN0aW9uJztcbmNvbnN0IHN1cHBvcnRzRm9ybURhdGEgPSB0eXBlb2YgZ2xvYmFscy5Gb3JtRGF0YSA9PT0gJ2Z1bmN0aW9uJztcblxuY29uc3QgbWVyZ2VIZWFkZXJzID0gKHNvdXJjZTEsIHNvdXJjZTIpID0+IHtcblx0Y29uc3QgcmVzdWx0ID0gbmV3IGdsb2JhbHMuSGVhZGVycyhzb3VyY2UxIHx8IHt9KTtcblx0Y29uc3QgaXNIZWFkZXJzSW5zdGFuY2UgPSBzb3VyY2UyIGluc3RhbmNlb2YgZ2xvYmFscy5IZWFkZXJzO1xuXHRjb25zdCBzb3VyY2UgPSBuZXcgZ2xvYmFscy5IZWFkZXJzKHNvdXJjZTIgfHwge30pO1xuXG5cdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIHNvdXJjZSkge1xuXHRcdGlmICgoaXNIZWFkZXJzSW5zdGFuY2UgJiYgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXN1bHQuZGVsZXRlKGtleSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdC5zZXQoa2V5LCB2YWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IGRlZXBNZXJnZSA9ICguLi5zb3VyY2VzKSA9PiB7XG5cdGxldCByZXR1cm5WYWx1ZSA9IHt9O1xuXHRsZXQgaGVhZGVycyA9IHt9O1xuXG5cdGZvciAoY29uc3Qgc291cmNlIG9mIHNvdXJjZXMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG5cdFx0XHRpZiAoIShBcnJheS5pc0FycmF5KHJldHVyblZhbHVlKSkpIHtcblx0XHRcdFx0cmV0dXJuVmFsdWUgPSBbXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuVmFsdWUgPSBbLi4ucmV0dXJuVmFsdWUsIC4uLnNvdXJjZV07XG5cdFx0fSBlbHNlIGlmIChpc09iamVjdChzb3VyY2UpKSB7XG5cdFx0XHRmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuXHRcdFx0XHRpZiAoaXNPYmplY3QodmFsdWUpICYmIChrZXkgaW4gcmV0dXJuVmFsdWUpKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBkZWVwTWVyZ2UocmV0dXJuVmFsdWVba2V5XSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuVmFsdWUgPSB7Li4ucmV0dXJuVmFsdWUsIFtrZXldOiB2YWx1ZX07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc09iamVjdChzb3VyY2UuaGVhZGVycykpIHtcblx0XHRcdFx0aGVhZGVycyA9IG1lcmdlSGVhZGVycyhoZWFkZXJzLCBzb3VyY2UuaGVhZGVycyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuVmFsdWUuaGVhZGVycyA9IGhlYWRlcnM7XG5cdH1cblxuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XG59O1xuXG5jb25zdCByZXF1ZXN0TWV0aG9kcyA9IFtcblx0J2dldCcsXG5cdCdwb3N0Jyxcblx0J3B1dCcsXG5cdCdwYXRjaCcsXG5cdCdoZWFkJyxcblx0J2RlbGV0ZSdcbl07XG5cbmNvbnN0IHJlc3BvbnNlVHlwZXMgPSB7XG5cdGpzb246ICdhcHBsaWNhdGlvbi9qc29uJyxcblx0dGV4dDogJ3RleHQvKicsXG5cdGZvcm1EYXRhOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXG5cdGFycmF5QnVmZmVyOiAnKi8qJyxcblx0YmxvYjogJyovKidcbn07XG5cbmNvbnN0IHJldHJ5TWV0aG9kcyA9IFtcblx0J2dldCcsXG5cdCdwdXQnLFxuXHQnaGVhZCcsXG5cdCdkZWxldGUnLFxuXHQnb3B0aW9ucycsXG5cdCd0cmFjZSdcbl07XG5cbmNvbnN0IHJldHJ5U3RhdHVzQ29kZXMgPSBbXG5cdDQwOCxcblx0NDEzLFxuXHQ0MjksXG5cdDUwMCxcblx0NTAyLFxuXHQ1MDMsXG5cdDUwNFxuXTtcblxuY29uc3QgcmV0cnlBZnRlclN0YXR1c0NvZGVzID0gW1xuXHQ0MTMsXG5cdDQyOSxcblx0NTAzXG5dO1xuXG5jb25zdCBzdG9wID0gU3ltYm9sKCdzdG9wJyk7XG5cbmNsYXNzIEhUVFBFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IocmVzcG9uc2UpIHtcblx0XHQvLyBTZXQgdGhlIG1lc3NhZ2UgdG8gdGhlIHN0YXR1cyB0ZXh0LCBzdWNoIGFzIFVuYXV0aG9yaXplZCxcblx0XHQvLyB3aXRoIHNvbWUgZmFsbGJhY2tzLiBUaGlzIG1lc3NhZ2Ugc2hvdWxkIG5ldmVyIGJlIHVuZGVmaW5lZC5cblx0XHRzdXBlcihcblx0XHRcdHJlc3BvbnNlLnN0YXR1c1RleHQgfHxcblx0XHRcdFN0cmluZyhcblx0XHRcdFx0KHJlc3BvbnNlLnN0YXR1cyA9PT0gMCB8fCByZXNwb25zZS5zdGF0dXMpID9cblx0XHRcdFx0XHRyZXNwb25zZS5zdGF0dXMgOiAnVW5rbm93biByZXNwb25zZSBlcnJvcidcblx0XHRcdClcblx0XHQpO1xuXHRcdHRoaXMubmFtZSA9ICdIVFRQRXJyb3InO1xuXHRcdHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcblx0fVxufVxuXG5jbGFzcyBUaW1lb3V0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKHJlcXVlc3QpIHtcblx0XHRzdXBlcignUmVxdWVzdCB0aW1lZCBvdXQnKTtcblx0XHR0aGlzLm5hbWUgPSAnVGltZW91dEVycm9yJztcblx0XHR0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuXHR9XG59XG5cbmNvbnN0IGRlbGF5ID0gbXMgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG5cbi8vIGBQcm9taXNlLnJhY2UoKWAgd29ya2Fyb3VuZCAoIzkxKVxuY29uc3QgdGltZW91dCA9IChyZXF1ZXN0LCBhYm9ydENvbnRyb2xsZXIsIG9wdGlvbnMpID0+XG5cdG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjb25zdCB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGlmIChhYm9ydENvbnRyb2xsZXIpIHtcblx0XHRcdFx0YWJvcnRDb250cm9sbGVyLmFib3J0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHJlamVjdChuZXcgVGltZW91dEVycm9yKHJlcXVlc3QpKTtcblx0XHR9LCBvcHRpb25zLnRpbWVvdXQpO1xuXG5cdFx0LyogZXNsaW50LWRpc2FibGUgcHJvbWlzZS9wcmVmZXItYXdhaXQtdG8tdGhlbiAqL1xuXHRcdG9wdGlvbnMuZmV0Y2gocmVxdWVzdClcblx0XHRcdC50aGVuKHJlc29sdmUpXG5cdFx0XHQuY2F0Y2gocmVqZWN0KVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dElEKTtcblx0XHRcdH0pO1xuXHRcdC8qIGVzbGludC1lbmFibGUgcHJvbWlzZS9wcmVmZXItYXdhaXQtdG8tdGhlbiAqL1xuXHR9KTtcblxuY29uc3Qgbm9ybWFsaXplUmVxdWVzdE1ldGhvZCA9IGlucHV0ID0+IHJlcXVlc3RNZXRob2RzLmluY2x1ZGVzKGlucHV0KSA/IGlucHV0LnRvVXBwZXJDYXNlKCkgOiBpbnB1dDtcblxuY29uc3QgZGVmYXVsdFJldHJ5T3B0aW9ucyA9IHtcblx0bGltaXQ6IDIsXG5cdG1ldGhvZHM6IHJldHJ5TWV0aG9kcyxcblx0c3RhdHVzQ29kZXM6IHJldHJ5U3RhdHVzQ29kZXMsXG5cdGFmdGVyU3RhdHVzQ29kZXM6IHJldHJ5QWZ0ZXJTdGF0dXNDb2Rlc1xufTtcblxuY29uc3Qgbm9ybWFsaXplUmV0cnlPcHRpb25zID0gKHJldHJ5ID0ge30pID0+IHtcblx0aWYgKHR5cGVvZiByZXRyeSA9PT0gJ251bWJlcicpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4uZGVmYXVsdFJldHJ5T3B0aW9ucyxcblx0XHRcdGxpbWl0OiByZXRyeVxuXHRcdH07XG5cdH1cblxuXHRpZiAocmV0cnkubWV0aG9kcyAmJiAhQXJyYXkuaXNBcnJheShyZXRyeS5tZXRob2RzKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcigncmV0cnkubWV0aG9kcyBtdXN0IGJlIGFuIGFycmF5Jyk7XG5cdH1cblxuXHRpZiAocmV0cnkuc3RhdHVzQ29kZXMgJiYgIUFycmF5LmlzQXJyYXkocmV0cnkuc3RhdHVzQ29kZXMpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdyZXRyeS5zdGF0dXNDb2RlcyBtdXN0IGJlIGFuIGFycmF5Jyk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdC4uLmRlZmF1bHRSZXRyeU9wdGlvbnMsXG5cdFx0Li4ucmV0cnksXG5cdFx0YWZ0ZXJTdGF0dXNDb2RlczogcmV0cnlBZnRlclN0YXR1c0NvZGVzXG5cdH07XG59O1xuXG4vLyBUaGUgbWF4aW11bSB2YWx1ZSBvZiBhIDMyYml0IGludCAoc2VlIGlzc3VlICMxMTcpXG5jb25zdCBtYXhTYWZlVGltZW91dCA9IDIxNDc0ODM2NDc7XG5cbmNsYXNzIEt5IHtcblx0Y29uc3RydWN0b3IoaW5wdXQsIG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMuX3JldHJ5Q291bnQgPSAwO1xuXHRcdHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5fb3B0aW9ucyA9IHtcblx0XHRcdC8vIFRPRE86IGNyZWRlbnRpYWxzIGNhbiBiZSByZW1vdmVkIHdoZW4gdGhlIHNwZWMgY2hhbmdlIGlzIGltcGxlbWVudGVkIGluIGFsbCBicm93c2Vycy4gQ29udGV4dDogaHR0cHM6Ly93d3cuY2hyb21lc3RhdHVzLmNvbS9mZWF0dXJlLzQ1Mzk0NzMzMTIzNTAyMDhcblx0XHRcdGNyZWRlbnRpYWxzOiB0aGlzLl9pbnB1dC5jcmVkZW50aWFscyB8fCAnc2FtZS1vcmlnaW4nLFxuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHRcdGhlYWRlcnM6IG1lcmdlSGVhZGVycyh0aGlzLl9pbnB1dC5oZWFkZXJzLCBvcHRpb25zLmhlYWRlcnMpLFxuXHRcdFx0aG9va3M6IGRlZXBNZXJnZSh7XG5cdFx0XHRcdGJlZm9yZVJlcXVlc3Q6IFtdLFxuXHRcdFx0XHRiZWZvcmVSZXRyeTogW10sXG5cdFx0XHRcdGFmdGVyUmVzcG9uc2U6IFtdXG5cdFx0XHR9LCBvcHRpb25zLmhvb2tzKSxcblx0XHRcdG1ldGhvZDogbm9ybWFsaXplUmVxdWVzdE1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLl9pbnB1dC5tZXRob2QpLFxuXHRcdFx0cHJlZml4VXJsOiBTdHJpbmcob3B0aW9ucy5wcmVmaXhVcmwgfHwgJycpLFxuXHRcdFx0cmV0cnk6IG5vcm1hbGl6ZVJldHJ5T3B0aW9ucyhvcHRpb25zLnJldHJ5KSxcblx0XHRcdHRocm93SHR0cEVycm9yczogb3B0aW9ucy50aHJvd0h0dHBFcnJvcnMgIT09IGZhbHNlLFxuXHRcdFx0dGltZW91dDogdHlwZW9mIG9wdGlvbnMudGltZW91dCA9PT0gJ3VuZGVmaW5lZCcgPyAxMDAwMCA6IG9wdGlvbnMudGltZW91dCxcblx0XHRcdGZldGNoOiBvcHRpb25zLmZldGNoIHx8IGdsb2JhbHMuZmV0Y2hcblx0XHR9O1xuXG5cdFx0aWYgKHR5cGVvZiB0aGlzLl9pbnB1dCAhPT0gJ3N0cmluZycgJiYgISh0aGlzLl9pbnB1dCBpbnN0YW5jZW9mIFVSTCB8fCB0aGlzLl9pbnB1dCBpbnN0YW5jZW9mIGdsb2JhbHMuUmVxdWVzdCkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2BpbnB1dGAgbXVzdCBiZSBhIHN0cmluZywgVVJMLCBvciBSZXF1ZXN0Jyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29wdGlvbnMucHJlZml4VXJsICYmIHR5cGVvZiB0aGlzLl9pbnB1dCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmICh0aGlzLl9pbnB1dC5zdGFydHNXaXRoKCcvJykpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdgaW5wdXRgIG11c3Qgbm90IGJlZ2luIHdpdGggYSBzbGFzaCB3aGVuIHVzaW5nIGBwcmVmaXhVcmxgJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghdGhpcy5fb3B0aW9ucy5wcmVmaXhVcmwuZW5kc1dpdGgoJy8nKSkge1xuXHRcdFx0XHR0aGlzLl9vcHRpb25zLnByZWZpeFVybCArPSAnLyc7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2lucHV0ID0gdGhpcy5fb3B0aW9ucy5wcmVmaXhVcmwgKyB0aGlzLl9pbnB1dDtcblx0XHR9XG5cblx0XHRpZiAoc3VwcG9ydHNBYm9ydENvbnRyb2xsZXIpIHtcblx0XHRcdHRoaXMuYWJvcnRDb250cm9sbGVyID0gbmV3IGdsb2JhbHMuQWJvcnRDb250cm9sbGVyKCk7XG5cdFx0XHRpZiAodGhpcy5fb3B0aW9ucy5zaWduYWwpIHtcblx0XHRcdFx0dGhpcy5fb3B0aW9ucy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5hYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX29wdGlvbnMuc2lnbmFsID0gdGhpcy5hYm9ydENvbnRyb2xsZXIuc2lnbmFsO1xuXHRcdH1cblxuXHRcdHRoaXMucmVxdWVzdCA9IG5ldyBnbG9iYWxzLlJlcXVlc3QodGhpcy5faW5wdXQsIHRoaXMuX29wdGlvbnMpO1xuXG5cdFx0aWYgKHRoaXMuX29wdGlvbnMuc2VhcmNoUGFyYW1zKSB7XG5cdFx0XHRjb25zdCBzZWFyY2hQYXJhbXMgPSAnPycgKyBuZXcgVVJMU2VhcmNoUGFyYW1zKHRoaXMuX29wdGlvbnMuc2VhcmNoUGFyYW1zKS50b1N0cmluZygpO1xuXHRcdFx0Y29uc3QgdXJsID0gdGhpcy5yZXF1ZXN0LnVybC5yZXBsYWNlKC8oPzpcXD8uKj8pPyg/PSN8JCkvLCBzZWFyY2hQYXJhbXMpO1xuXG5cdFx0XHQvLyBUbyBwcm92aWRlIGNvcnJlY3QgZm9ybSBib3VuZGFyeSwgQ29udGVudC1UeXBlIGhlYWRlciBzaG91bGQgYmUgZGVsZXRlZCBlYWNoIHRpbWUgd2hlbiBuZXcgUmVxdWVzdCBpbnN0YW50aWF0ZWQgZnJvbSBhbm90aGVyIG9uZVxuXHRcdFx0aWYgKCgoc3VwcG9ydHNGb3JtRGF0YSAmJiB0aGlzLl9vcHRpb25zLmJvZHkgaW5zdGFuY2VvZiBnbG9iYWxzLkZvcm1EYXRhKSB8fCB0aGlzLl9vcHRpb25zLmJvZHkgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXMpICYmICEodGhpcy5fb3B0aW9ucy5oZWFkZXJzICYmIHRoaXMuX29wdGlvbnMuaGVhZGVyc1snY29udGVudC10eXBlJ10pKSB7XG5cdFx0XHRcdHRoaXMucmVxdWVzdC5oZWFkZXJzLmRlbGV0ZSgnY29udGVudC10eXBlJyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucmVxdWVzdCA9IG5ldyBnbG9iYWxzLlJlcXVlc3QobmV3IGdsb2JhbHMuUmVxdWVzdCh1cmwsIHRoaXMucmVxdWVzdCksIHRoaXMuX29wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9vcHRpb25zLmpzb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fb3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkodGhpcy5fb3B0aW9ucy5qc29uKTtcblx0XHRcdHRoaXMucmVxdWVzdC5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblx0XHRcdHRoaXMucmVxdWVzdCA9IG5ldyBnbG9iYWxzLlJlcXVlc3QodGhpcy5yZXF1ZXN0LCB7Ym9keTogdGhpcy5fb3B0aW9ucy5ib2R5fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZm4gPSBhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fb3B0aW9ucy50aW1lb3V0ID4gbWF4U2FmZVRpbWVvdXQpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoYFRoZSBcXGB0aW1lb3V0XFxgIG9wdGlvbiBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuICR7bWF4U2FmZVRpbWVvdXR9YCk7XG5cdFx0XHR9XG5cblx0XHRcdGF3YWl0IGRlbGF5KDEpO1xuXHRcdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZmV0Y2goKTtcblxuXHRcdFx0Zm9yIChjb25zdCBob29rIG9mIHRoaXMuX29wdGlvbnMuaG9va3MuYWZ0ZXJSZXNwb25zZSkge1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuXHRcdFx0XHRjb25zdCBtb2RpZmllZFJlc3BvbnNlID0gYXdhaXQgaG9vayhcblx0XHRcdFx0XHR0aGlzLnJlcXVlc3QsXG5cdFx0XHRcdFx0dGhpcy5fb3B0aW9ucyxcblx0XHRcdFx0XHR0aGlzLl9kZWNvcmF0ZVJlc3BvbnNlKHJlc3BvbnNlLmNsb25lKCkpXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0aWYgKG1vZGlmaWVkUmVzcG9uc2UgaW5zdGFuY2VvZiBnbG9iYWxzLlJlc3BvbnNlKSB7XG5cdFx0XHRcdFx0cmVzcG9uc2UgPSBtb2RpZmllZFJlc3BvbnNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2RlY29yYXRlUmVzcG9uc2UocmVzcG9uc2UpO1xuXG5cdFx0XHRpZiAoIXJlc3BvbnNlLm9rICYmIHRoaXMuX29wdGlvbnMudGhyb3dIdHRwRXJyb3JzKSB7XG5cdFx0XHRcdHRocm93IG5ldyBIVFRQRXJyb3IocmVzcG9uc2UpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBgb25Eb3dubG9hZFByb2dyZXNzYCBpcyBwYXNzZWQsIGl0IHVzZXMgdGhlIHN0cmVhbSBBUEkgaW50ZXJuYWxseVxuXHRcdFx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0XHRcdGlmICh0aGlzLl9vcHRpb25zLm9uRG93bmxvYWRQcm9ncmVzcykge1xuXHRcdFx0XHRpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMub25Eb3dubG9hZFByb2dyZXNzICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGBvbkRvd25sb2FkUHJvZ3Jlc3NgIG9wdGlvbiBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICghc3VwcG9ydHNTdHJlYW1zKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdTdHJlYW1zIGFyZSBub3Qgc3VwcG9ydGVkIGluIHlvdXIgZW52aXJvbm1lbnQuIGBSZWFkYWJsZVN0cmVhbWAgaXMgbWlzc2luZy4nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0aGlzLl9zdHJlYW0ocmVzcG9uc2UuY2xvbmUoKSwgdGhpcy5fb3B0aW9ucy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdFx0fTtcblxuXHRcdGNvbnN0IGlzUmV0cmlhYmxlTWV0aG9kID0gdGhpcy5fb3B0aW9ucy5yZXRyeS5tZXRob2RzLmluY2x1ZGVzKHRoaXMucmVxdWVzdC5tZXRob2QudG9Mb3dlckNhc2UoKSk7XG5cdFx0Y29uc3QgcmVzdWx0ID0gaXNSZXRyaWFibGVNZXRob2QgPyB0aGlzLl9yZXRyeShmbikgOiBmbigpO1xuXG5cdFx0Zm9yIChjb25zdCBbdHlwZSwgbWltZVR5cGVdIG9mIE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlVHlwZXMpKSB7XG5cdFx0XHRyZXN1bHRbdHlwZV0gPSBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucmVxdWVzdC5oZWFkZXJzLnNldCgnYWNjZXB0JywgdGhpcy5yZXF1ZXN0LmhlYWRlcnMuZ2V0KCdhY2NlcHQnKSB8fCBtaW1lVHlwZSk7XG5cblx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSAoYXdhaXQgcmVzdWx0KS5jbG9uZSgpO1xuXG5cdFx0XHRcdGlmICh0eXBlID09PSAnanNvbicpIHtcblx0XHRcdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDQpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAob3B0aW9ucy5wYXJzZUpzb24pIHtcblx0XHRcdFx0XHRcdHJldHVybiBvcHRpb25zLnBhcnNlSnNvbihhd2FpdCByZXNwb25zZS50ZXh0KCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiByZXNwb25zZVt0eXBlXSgpO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0X2NhbGN1bGF0ZVJldHJ5RGVsYXkoZXJyb3IpIHtcblx0XHR0aGlzLl9yZXRyeUNvdW50Kys7XG5cblx0XHRpZiAodGhpcy5fcmV0cnlDb3VudCA8IHRoaXMuX29wdGlvbnMucmV0cnkubGltaXQgJiYgIShlcnJvciBpbnN0YW5jZW9mIFRpbWVvdXRFcnJvcikpIHtcblx0XHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIEhUVFBFcnJvcikge1xuXHRcdFx0XHRpZiAoIXRoaXMuX29wdGlvbnMucmV0cnkuc3RhdHVzQ29kZXMuaW5jbHVkZXMoZXJyb3IucmVzcG9uc2Uuc3RhdHVzKSkge1xuXHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgcmV0cnlBZnRlciA9IGVycm9yLnJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdSZXRyeS1BZnRlcicpO1xuXHRcdFx0XHRpZiAocmV0cnlBZnRlciAmJiB0aGlzLl9vcHRpb25zLnJldHJ5LmFmdGVyU3RhdHVzQ29kZXMuaW5jbHVkZXMoZXJyb3IucmVzcG9uc2Uuc3RhdHVzKSkge1xuXHRcdFx0XHRcdGxldCBhZnRlciA9IE51bWJlcihyZXRyeUFmdGVyKTtcblx0XHRcdFx0XHRpZiAoTnVtYmVyLmlzTmFOKGFmdGVyKSkge1xuXHRcdFx0XHRcdFx0YWZ0ZXIgPSBEYXRlLnBhcnNlKHJldHJ5QWZ0ZXIpIC0gRGF0ZS5ub3coKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWZ0ZXIgKj0gMTAwMDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMucmV0cnkubWF4UmV0cnlBZnRlciAhPT0gJ3VuZGVmaW5lZCcgJiYgYWZ0ZXIgPiB0aGlzLl9vcHRpb25zLnJldHJ5Lm1heFJldHJ5QWZ0ZXIpIHtcblx0XHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBhZnRlcjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQxMykge1xuXHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IEJBQ0tPRkZfRkFDVE9SID0gMC4zO1xuXHRcdFx0cmV0dXJuIEJBQ0tPRkZfRkFDVE9SICogKDIgKiogKHRoaXMuX3JldHJ5Q291bnQgLSAxKSkgKiAxMDAwO1xuXHRcdH1cblxuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0X2RlY29yYXRlUmVzcG9uc2UocmVzcG9uc2UpIHtcblx0XHRpZiAodGhpcy5fb3B0aW9ucy5wYXJzZUpzb24pIHtcblx0XHRcdHJlc3BvbnNlLmpzb24gPSBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9vcHRpb25zLnBhcnNlSnNvbihhd2FpdCByZXNwb25zZS50ZXh0KCkpO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzcG9uc2U7XG5cdH1cblxuXHRhc3luYyBfcmV0cnkoZm4pIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGF3YWl0IGZuKCk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnN0IG1zID0gTWF0aC5taW4odGhpcy5fY2FsY3VsYXRlUmV0cnlEZWxheShlcnJvciksIG1heFNhZmVUaW1lb3V0KTtcblx0XHRcdGlmIChtcyAhPT0gMCAmJiB0aGlzLl9yZXRyeUNvdW50ID4gMCkge1xuXHRcdFx0XHRhd2FpdCBkZWxheShtcyk7XG5cblx0XHRcdFx0Zm9yIChjb25zdCBob29rIG9mIHRoaXMuX29wdGlvbnMuaG9va3MuYmVmb3JlUmV0cnkpIHtcblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuXHRcdFx0XHRcdGNvbnN0IGhvb2tSZXN1bHQgPSBhd2FpdCBob29rKHtcblx0XHRcdFx0XHRcdHJlcXVlc3Q6IHRoaXMucmVxdWVzdCxcblx0XHRcdFx0XHRcdG9wdGlvbnM6IHRoaXMuX29wdGlvbnMsXG5cdFx0XHRcdFx0XHRlcnJvcixcblx0XHRcdFx0XHRcdHJldHJ5Q291bnQ6IHRoaXMuX3JldHJ5Q291bnRcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8vIElmIGBzdG9wYCBpcyByZXR1cm5lZCBmcm9tIHRoZSBob29rLCB0aGUgcmV0cnkgcHJvY2VzcyBpcyBzdG9wcGVkXG5cdFx0XHRcdFx0aWYgKGhvb2tSZXN1bHQgPT09IHN0b3ApIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fcmV0cnkoZm4pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fb3B0aW9ucy50aHJvd0h0dHBFcnJvcnMpIHtcblx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YXN5bmMgX2ZldGNoKCkge1xuXHRcdGZvciAoY29uc3QgaG9vayBvZiB0aGlzLl9vcHRpb25zLmhvb2tzLmJlZm9yZVJlcXVlc3QpIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG5cdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCBob29rKHRoaXMucmVxdWVzdCwgdGhpcy5fb3B0aW9ucyk7XG5cblx0XHRcdGlmIChyZXN1bHQgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG5cdFx0XHRcdHRoaXMucmVxdWVzdCA9IHJlc3VsdDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChyZXN1bHQgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9vcHRpb25zLnRpbWVvdXQgPT09IGZhbHNlKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fb3B0aW9ucy5mZXRjaCh0aGlzLnJlcXVlc3QuY2xvbmUoKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRpbWVvdXQodGhpcy5yZXF1ZXN0LmNsb25lKCksIHRoaXMuYWJvcnRDb250cm9sbGVyLCB0aGlzLl9vcHRpb25zKTtcblx0fVxuXG5cdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdF9zdHJlYW0ocmVzcG9uc2UsIG9uRG93bmxvYWRQcm9ncmVzcykge1xuXHRcdGNvbnN0IHRvdGFsQnl0ZXMgPSBOdW1iZXIocmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtbGVuZ3RoJykpIHx8IDA7XG5cdFx0bGV0IHRyYW5zZmVycmVkQnl0ZXMgPSAwO1xuXG5cdFx0cmV0dXJuIG5ldyBnbG9iYWxzLlJlc3BvbnNlKFxuXHRcdFx0bmV3IGdsb2JhbHMuUmVhZGFibGVTdHJlYW0oe1xuXHRcdFx0XHRzdGFydChjb250cm9sbGVyKSB7XG5cdFx0XHRcdFx0Y29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcblxuXHRcdFx0XHRcdGlmIChvbkRvd25sb2FkUHJvZ3Jlc3MpIHtcblx0XHRcdFx0XHRcdG9uRG93bmxvYWRQcm9ncmVzcyh7cGVyY2VudDogMCwgdHJhbnNmZXJyZWRCeXRlczogMCwgdG90YWxCeXRlc30sIG5ldyBVaW50OEFycmF5KCkpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGFzeW5jIGZ1bmN0aW9uIHJlYWQoKSB7XG5cdFx0XHRcdFx0XHRjb25zdCB7ZG9uZSwgdmFsdWV9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcblx0XHRcdFx0XHRcdGlmIChkb25lKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRyb2xsZXIuY2xvc2UoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAob25Eb3dubG9hZFByb2dyZXNzKSB7XG5cdFx0XHRcdFx0XHRcdHRyYW5zZmVycmVkQnl0ZXMgKz0gdmFsdWUuYnl0ZUxlbmd0aDtcblx0XHRcdFx0XHRcdFx0Y29uc3QgcGVyY2VudCA9IHRvdGFsQnl0ZXMgPT09IDAgPyAwIDogdHJhbnNmZXJyZWRCeXRlcyAvIHRvdGFsQnl0ZXM7XG5cdFx0XHRcdFx0XHRcdG9uRG93bmxvYWRQcm9ncmVzcyh7cGVyY2VudCwgdHJhbnNmZXJyZWRCeXRlcywgdG90YWxCeXRlc30sIHZhbHVlKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y29udHJvbGxlci5lbnF1ZXVlKHZhbHVlKTtcblx0XHRcdFx0XHRcdHJlYWQoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZWFkKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0KTtcblx0fVxufVxuXG5jb25zdCB2YWxpZGF0ZUFuZE1lcmdlID0gKC4uLnNvdXJjZXMpID0+IHtcblx0Zm9yIChjb25zdCBzb3VyY2Ugb2Ygc291cmNlcykge1xuXHRcdGlmICgoIWlzT2JqZWN0KHNvdXJjZSkgfHwgQXJyYXkuaXNBcnJheShzb3VyY2UpKSAmJiB0eXBlb2Ygc291cmNlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGBvcHRpb25zYCBhcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBkZWVwTWVyZ2Uoe30sIC4uLnNvdXJjZXMpO1xufTtcblxuY29uc3QgY3JlYXRlSW5zdGFuY2UgPSBkZWZhdWx0cyA9PiB7XG5cdGNvbnN0IGt5ID0gKGlucHV0LCBvcHRpb25zKSA9PiBuZXcgS3koaW5wdXQsIHZhbGlkYXRlQW5kTWVyZ2UoZGVmYXVsdHMsIG9wdGlvbnMpKTtcblxuXHRmb3IgKGNvbnN0IG1ldGhvZCBvZiByZXF1ZXN0TWV0aG9kcykge1xuXHRcdGt5W21ldGhvZF0gPSAoaW5wdXQsIG9wdGlvbnMpID0+IG5ldyBLeShpbnB1dCwgdmFsaWRhdGVBbmRNZXJnZShkZWZhdWx0cywgb3B0aW9ucywge21ldGhvZH0pKTtcblx0fVxuXG5cdGt5LkhUVFBFcnJvciA9IEhUVFBFcnJvcjtcblx0a3kuVGltZW91dEVycm9yID0gVGltZW91dEVycm9yO1xuXHRreS5jcmVhdGUgPSBuZXdEZWZhdWx0cyA9PiBjcmVhdGVJbnN0YW5jZSh2YWxpZGF0ZUFuZE1lcmdlKG5ld0RlZmF1bHRzKSk7XG5cdGt5LmV4dGVuZCA9IG5ld0RlZmF1bHRzID0+IGNyZWF0ZUluc3RhbmNlKHZhbGlkYXRlQW5kTWVyZ2UoZGVmYXVsdHMsIG5ld0RlZmF1bHRzKSk7XG5cdGt5LnN0b3AgPSBzdG9wO1xuXG5cdHJldHVybiBreTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUluc3RhbmNlKCk7XG4iLCIvKiEgaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlIHYxLjMuMiBieSBAbWF0aGlhcyAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0LyoqIERldGVjdCBmcmVlIHZhcmlhYmxlcyAqL1xuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmXG5cdFx0IWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdCFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoXG5cdFx0ZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCB8fFxuXHRcdGZyZWVHbG9iYWwuc2VsZiA9PT0gZnJlZUdsb2JhbFxuXHQpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgYHB1bnljb2RlYCBvYmplY3QuXG5cdCAqIEBuYW1lIHB1bnljb2RlXG5cdCAqIEB0eXBlIE9iamVjdFxuXHQgKi9cblx0dmFyIHB1bnljb2RlLFxuXG5cdC8qKiBIaWdoZXN0IHBvc2l0aXZlIHNpZ25lZCAzMi1iaXQgZmxvYXQgdmFsdWUgKi9cblx0bWF4SW50ID0gMjE0NzQ4MzY0NywgLy8gYWthLiAweDdGRkZGRkZGIG9yIDJeMzEtMVxuXG5cdC8qKiBCb290c3RyaW5nIHBhcmFtZXRlcnMgKi9cblx0YmFzZSA9IDM2LFxuXHR0TWluID0gMSxcblx0dE1heCA9IDI2LFxuXHRza2V3ID0gMzgsXG5cdGRhbXAgPSA3MDAsXG5cdGluaXRpYWxCaWFzID0gNzIsXG5cdGluaXRpYWxOID0gMTI4LCAvLyAweDgwXG5cdGRlbGltaXRlciA9ICctJywgLy8gJ1xceDJEJ1xuXG5cdC8qKiBSZWd1bGFyIGV4cHJlc3Npb25zICovXG5cdHJlZ2V4UHVueWNvZGUgPSAvXnhuLS0vLFxuXHRyZWdleE5vbkFTQ0lJID0gL1teXFx4MjAtXFx4N0VdLywgLy8gdW5wcmludGFibGUgQVNDSUkgY2hhcnMgKyBub24tQVNDSUkgY2hhcnNcblx0cmVnZXhTZXBhcmF0b3JzID0gL1tcXHgyRVxcdTMwMDJcXHVGRjBFXFx1RkY2MV0vZywgLy8gUkZDIDM0OTAgc2VwYXJhdG9yc1xuXG5cdC8qKiBFcnJvciBtZXNzYWdlcyAqL1xuXHRlcnJvcnMgPSB7XG5cdFx0J292ZXJmbG93JzogJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJyxcblx0XHQnbm90LWJhc2ljJzogJ0lsbGVnYWwgaW5wdXQgPj0gMHg4MCAobm90IGEgYmFzaWMgY29kZSBwb2ludCknLFxuXHRcdCdpbnZhbGlkLWlucHV0JzogJ0ludmFsaWQgaW5wdXQnXG5cdH0sXG5cblx0LyoqIENvbnZlbmllbmNlIHNob3J0Y3V0cyAqL1xuXHRiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW4sXG5cdGZsb29yID0gTWF0aC5mbG9vcixcblx0c3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZSxcblxuXHQvKiogVGVtcG9yYXJ5IHZhcmlhYmxlICovXG5cdGtleTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICogQSBnZW5lcmljIGVycm9yIHV0aWxpdHkgZnVuY3Rpb24uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBlcnJvciB0eXBlLlxuXHQgKiBAcmV0dXJucyB7RXJyb3J9IFRocm93cyBhIGBSYW5nZUVycm9yYCB3aXRoIHRoZSBhcHBsaWNhYmxlIGVycm9yIG1lc3NhZ2UuXG5cdCAqL1xuXHRmdW5jdGlvbiBlcnJvcih0eXBlKSB7XG5cdFx0dGhyb3cgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcblx0ICogaXRlbS5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwKGFycmF5LCBmbikge1xuXHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdHdoaWxlIChsZW5ndGgtLSkge1xuXHRcdFx0cmVzdWx0W2xlbmd0aF0gPSBmbihhcnJheVtsZW5ndGhdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3Mgb3IgZW1haWxcblx0ICogYWRkcmVzc2VzLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZG9tYWluIFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcblx0ICogY2hhcmFjdGVyLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuXHQgKiBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdFx0dmFyIHBhcnRzID0gc3RyaW5nLnNwbGl0KCdAJyk7XG5cdFx0dmFyIHJlc3VsdCA9ICcnO1xuXHRcdGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG5cdFx0XHQvLyBJbiBlbWFpbCBhZGRyZXNzZXMsIG9ubHkgdGhlIGRvbWFpbiBuYW1lIHNob3VsZCBiZSBwdW55Y29kZWQuIExlYXZlXG5cdFx0XHQvLyB0aGUgbG9jYWwgcGFydCAoaS5lLiBldmVyeXRoaW5nIHVwIHRvIGBAYCkgaW50YWN0LlxuXHRcdFx0cmVzdWx0ID0gcGFydHNbMF0gKyAnQCc7XG5cdFx0XHRzdHJpbmcgPSBwYXJ0c1sxXTtcblx0XHR9XG5cdFx0Ly8gQXZvaWQgYHNwbGl0KHJlZ2V4KWAgZm9yIElFOCBjb21wYXRpYmlsaXR5LiBTZWUgIzE3LlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlZ2V4U2VwYXJhdG9ycywgJ1xceDJFJyk7XG5cdFx0dmFyIGxhYmVscyA9IHN0cmluZy5zcGxpdCgnLicpO1xuXHRcdHZhciBlbmNvZGVkID0gbWFwKGxhYmVscywgZm4pLmpvaW4oJy4nKTtcblx0XHRyZXR1cm4gcmVzdWx0ICsgZW5jb2RlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG5cdCAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcblx0ICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcblx0ICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG5cdCAqIG1hdGNoaW5nIFVURi0xNi5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5lbmNvZGVgXG5cdCAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBkZWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgVW5pY29kZSBpbnB1dCBzdHJpbmcgKFVDUy0yKS5cblx0ICogQHJldHVybnMge0FycmF5fSBUaGUgbmV3IGFycmF5IG9mIGNvZGUgcG9pbnRzLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGNvdW50ZXIgPSAwLFxuXHRcdCAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxuXHRcdCAgICB2YWx1ZSxcblx0XHQgICAgZXh0cmE7XG5cdFx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdFx0Ly8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG5cdFx0XHRcdGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdFx0aWYgKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKSB7IC8vIGxvdyBzdXJyb2dhdGVcblx0XHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZSBuZXh0XG5cdFx0XHRcdFx0Ly8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdGNvdW50ZXItLTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBzdHJpbmcgYmFzZWQgb24gYW4gYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5kZWNvZGVgXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGVuY29kZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBjb2RlUG9pbnRzIFRoZSBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgbmV3IFVuaWNvZGUgc3RyaW5nIChVQ1MtMikuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdFx0cmV0dXJuIG1hcChhcnJheSwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0XHR2YWx1ZSAtPSAweDEwMDAwO1xuXHRcdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdFx0XHRyZXR1cm4gb3V0cHV0O1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgYmFzaWMgY29kZSBwb2ludCBpbnRvIGEgZGlnaXQvaW50ZWdlci5cblx0ICogQHNlZSBgZGlnaXRUb0Jhc2ljKClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlUG9pbnQgVGhlIGJhc2ljIG51bWVyaWMgY29kZSBwb2ludCB2YWx1ZS5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50IChmb3IgdXNlIGluXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaW4gdGhlIHJhbmdlIGAwYCB0byBgYmFzZSAtIDFgLCBvciBgYmFzZWAgaWZcblx0ICogdGhlIGNvZGUgcG9pbnQgZG9lcyBub3QgcmVwcmVzZW50IGEgdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBiYXNpY1RvRGlnaXQoY29kZVBvaW50KSB7XG5cdFx0aWYgKGNvZGVQb2ludCAtIDQ4IDwgMTApIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSAyMjtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDY1IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA2NTtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDk3IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA5Nztcblx0XHR9XG5cdFx0cmV0dXJuIGJhc2U7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBkaWdpdC9pbnRlZ2VyIGludG8gYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAc2VlIGBiYXNpY1RvRGlnaXQoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpZ2l0IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2ljIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgKHdoZW4gdXNlZCBmb3Jcblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpcyBgZGlnaXRgLCB3aGljaCBuZWVkcyB0byBiZSBpbiB0aGUgcmFuZ2Vcblx0ICogYDBgIHRvIGBiYXNlIC0gMWAuIElmIGBmbGFnYCBpcyBub24temVybywgdGhlIHVwcGVyY2FzZSBmb3JtIGlzXG5cdCAqIHVzZWQ7IGVsc2UsIHRoZSBsb3dlcmNhc2UgZm9ybSBpcyB1c2VkLiBUaGUgYmVoYXZpb3IgaXMgdW5kZWZpbmVkXG5cdCAqIGlmIGBmbGFnYCBpcyBub24temVybyBhbmQgYGRpZ2l0YCBoYXMgbm8gdXBwZXJjYXNlIGZvcm0uXG5cdCAqL1xuXHRmdW5jdGlvbiBkaWdpdFRvQmFzaWMoZGlnaXQsIGZsYWcpIHtcblx0XHQvLyAgMC4uMjUgbWFwIHRvIEFTQ0lJIGEuLnogb3IgQS4uWlxuXHRcdC8vIDI2Li4zNSBtYXAgdG8gQVNDSUkgMC4uOVxuXHRcdHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNikgLSAoKGZsYWcgIT0gMCkgPDwgNSk7XG5cdH1cblxuXHQvKipcblx0ICogQmlhcyBhZGFwdGF0aW9uIGZ1bmN0aW9uIGFzIHBlciBzZWN0aW9uIDMuNCBvZiBSRkMgMzQ5Mi5cblx0ICogaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzQ5MiNzZWN0aW9uLTMuNFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0ZnVuY3Rpb24gYWRhcHQoZGVsdGEsIG51bVBvaW50cywgZmlyc3RUaW1lKSB7XG5cdFx0dmFyIGsgPSAwO1xuXHRcdGRlbHRhID0gZmlyc3RUaW1lID8gZmxvb3IoZGVsdGEgLyBkYW1wKSA6IGRlbHRhID4+IDE7XG5cdFx0ZGVsdGEgKz0gZmxvb3IoZGVsdGEgLyBudW1Qb2ludHMpO1xuXHRcdGZvciAoLyogbm8gaW5pdGlhbGl6YXRpb24gKi87IGRlbHRhID4gYmFzZU1pbnVzVE1pbiAqIHRNYXggPj4gMTsgayArPSBiYXNlKSB7XG5cdFx0XHRkZWx0YSA9IGZsb29yKGRlbHRhIC8gYmFzZU1pbnVzVE1pbik7XG5cdFx0fVxuXHRcdHJldHVybiBmbG9vcihrICsgKGJhc2VNaW51c1RNaW4gKyAxKSAqIGRlbHRhIC8gKGRlbHRhICsgc2tldykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scyB0byBhIHN0cmluZyBvZiBVbmljb2RlXG5cdCAqIHN5bWJvbHMuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICovXG5cdGZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuXHRcdC8vIERvbid0IHVzZSBVQ1MtMlxuXHRcdHZhciBvdXRwdXQgPSBbXSxcblx0XHQgICAgaW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGgsXG5cdFx0ICAgIG91dCxcblx0XHQgICAgaSA9IDAsXG5cdFx0ICAgIG4gPSBpbml0aWFsTixcblx0XHQgICAgYmlhcyA9IGluaXRpYWxCaWFzLFxuXHRcdCAgICBiYXNpYyxcblx0XHQgICAgaixcblx0XHQgICAgaW5kZXgsXG5cdFx0ICAgIG9sZGksXG5cdFx0ICAgIHcsXG5cdFx0ICAgIGssXG5cdFx0ICAgIGRpZ2l0LFxuXHRcdCAgICB0LFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgYmFzZU1pbnVzVDtcblxuXHRcdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHM6IGxldCBgYmFzaWNgIGJlIHRoZSBudW1iZXIgb2YgaW5wdXQgY29kZVxuXHRcdC8vIHBvaW50cyBiZWZvcmUgdGhlIGxhc3QgZGVsaW1pdGVyLCBvciBgMGAgaWYgdGhlcmUgaXMgbm9uZSwgdGhlbiBjb3B5XG5cdFx0Ly8gdGhlIGZpcnN0IGJhc2ljIGNvZGUgcG9pbnRzIHRvIHRoZSBvdXRwdXQuXG5cblx0XHRiYXNpYyA9IGlucHV0Lmxhc3RJbmRleE9mKGRlbGltaXRlcik7XG5cdFx0aWYgKGJhc2ljIDwgMCkge1xuXHRcdFx0YmFzaWMgPSAwO1xuXHRcdH1cblxuXHRcdGZvciAoaiA9IDA7IGogPCBiYXNpYzsgKytqKSB7XG5cdFx0XHQvLyBpZiBpdCdzIG5vdCBhIGJhc2ljIGNvZGUgcG9pbnRcblx0XHRcdGlmIChpbnB1dC5jaGFyQ29kZUF0KGopID49IDB4ODApIHtcblx0XHRcdFx0ZXJyb3IoJ25vdC1iYXNpYycpO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0LnB1c2goaW5wdXQuY2hhckNvZGVBdChqKSk7XG5cdFx0fVxuXG5cdFx0Ly8gTWFpbiBkZWNvZGluZyBsb29wOiBzdGFydCBqdXN0IGFmdGVyIHRoZSBsYXN0IGRlbGltaXRlciBpZiBhbnkgYmFzaWMgY29kZVxuXHRcdC8vIHBvaW50cyB3ZXJlIGNvcGllZDsgc3RhcnQgYXQgdGhlIGJlZ2lubmluZyBvdGhlcndpc2UuXG5cblx0XHRmb3IgKGluZGV4ID0gYmFzaWMgPiAwID8gYmFzaWMgKyAxIDogMDsgaW5kZXggPCBpbnB1dExlbmd0aDsgLyogbm8gZmluYWwgZXhwcmVzc2lvbiAqLykge1xuXG5cdFx0XHQvLyBgaW5kZXhgIGlzIHRoZSBpbmRleCBvZiB0aGUgbmV4dCBjaGFyYWN0ZXIgdG8gYmUgY29uc3VtZWQuXG5cdFx0XHQvLyBEZWNvZGUgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlciBpbnRvIGBkZWx0YWAsXG5cdFx0XHQvLyB3aGljaCBnZXRzIGFkZGVkIHRvIGBpYC4gVGhlIG92ZXJmbG93IGNoZWNraW5nIGlzIGVhc2llclxuXHRcdFx0Ly8gaWYgd2UgaW5jcmVhc2UgYGlgIGFzIHdlIGdvLCB0aGVuIHN1YnRyYWN0IG9mZiBpdHMgc3RhcnRpbmdcblx0XHRcdC8vIHZhbHVlIGF0IHRoZSBlbmQgdG8gb2J0YWluIGBkZWx0YWAuXG5cdFx0XHRmb3IgKG9sZGkgPSBpLCB3ID0gMSwgayA9IGJhc2U7IC8qIG5vIGNvbmRpdGlvbiAqLzsgayArPSBiYXNlKSB7XG5cblx0XHRcdFx0aWYgKGluZGV4ID49IGlucHV0TGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ2ludmFsaWQtaW5wdXQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRpZ2l0ID0gYmFzaWNUb0RpZ2l0KGlucHV0LmNoYXJDb2RlQXQoaW5kZXgrKykpO1xuXG5cdFx0XHRcdGlmIChkaWdpdCA+PSBiYXNlIHx8IGRpZ2l0ID4gZmxvb3IoKG1heEludCAtIGkpIC8gdykpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGkgKz0gZGlnaXQgKiB3O1xuXHRcdFx0XHR0ID0gayA8PSBiaWFzID8gdE1pbiA6IChrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPCB0KSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdGlmICh3ID4gZmxvb3IobWF4SW50IC8gYmFzZU1pbnVzVCkpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHcgKj0gYmFzZU1pbnVzVDtcblxuXHRcdFx0fVxuXG5cdFx0XHRvdXQgPSBvdXRwdXQubGVuZ3RoICsgMTtcblx0XHRcdGJpYXMgPSBhZGFwdChpIC0gb2xkaSwgb3V0LCBvbGRpID09IDApO1xuXG5cdFx0XHQvLyBgaWAgd2FzIHN1cHBvc2VkIHRvIHdyYXAgYXJvdW5kIGZyb20gYG91dGAgdG8gYDBgLFxuXHRcdFx0Ly8gaW5jcmVtZW50aW5nIGBuYCBlYWNoIHRpbWUsIHNvIHdlJ2xsIGZpeCB0aGF0IG5vdzpcblx0XHRcdGlmIChmbG9vcihpIC8gb3V0KSA+IG1heEludCAtIG4pIHtcblx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdG4gKz0gZmxvb3IoaSAvIG91dCk7XG5cdFx0XHRpICU9IG91dDtcblxuXHRcdFx0Ly8gSW5zZXJ0IGBuYCBhdCBwb3NpdGlvbiBgaWAgb2YgdGhlIG91dHB1dFxuXHRcdFx0b3V0cHV0LnNwbGljZShpKyssIDAsIG4pO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVjczJlbmNvZGUob3V0cHV0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMgKGUuZy4gYSBkb21haW4gbmFtZSBsYWJlbCkgdG8gYVxuXHQgKiBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBlbmNvZGUoaW5wdXQpIHtcblx0XHR2YXIgbixcblx0XHQgICAgZGVsdGEsXG5cdFx0ICAgIGhhbmRsZWRDUENvdW50LFxuXHRcdCAgICBiYXNpY0xlbmd0aCxcblx0XHQgICAgYmlhcyxcblx0XHQgICAgaixcblx0XHQgICAgbSxcblx0XHQgICAgcSxcblx0XHQgICAgayxcblx0XHQgICAgdCxcblx0XHQgICAgY3VycmVudFZhbHVlLFxuXHRcdCAgICBvdXRwdXQgPSBbXSxcblx0XHQgICAgLyoqIGBpbnB1dExlbmd0aGAgd2lsbCBob2xkIHRoZSBudW1iZXIgb2YgY29kZSBwb2ludHMgaW4gYGlucHV0YC4gKi9cblx0XHQgICAgaW5wdXRMZW5ndGgsXG5cdFx0ICAgIC8qKiBDYWNoZWQgY2FsY3VsYXRpb24gcmVzdWx0cyAqL1xuXHRcdCAgICBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsXG5cdFx0ICAgIGJhc2VNaW51c1QsXG5cdFx0ICAgIHFNaW51c1Q7XG5cblx0XHQvLyBDb252ZXJ0IHRoZSBpbnB1dCBpbiBVQ1MtMiB0byBVbmljb2RlXG5cdFx0aW5wdXQgPSB1Y3MyZGVjb2RlKGlucHV0KTtcblxuXHRcdC8vIENhY2hlIHRoZSBsZW5ndGhcblx0XHRpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblxuXHRcdC8vIEluaXRpYWxpemUgdGhlIHN0YXRlXG5cdFx0biA9IGluaXRpYWxOO1xuXHRcdGRlbHRhID0gMDtcblx0XHRiaWFzID0gaW5pdGlhbEJpYXM7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzXG5cdFx0Zm9yIChqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA8IDB4ODApIHtcblx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGN1cnJlbnRWYWx1ZSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGhhbmRsZWRDUENvdW50ID0gYmFzaWNMZW5ndGggPSBvdXRwdXQubGVuZ3RoO1xuXG5cdFx0Ly8gYGhhbmRsZWRDUENvdW50YCBpcyB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIHRoYXQgaGF2ZSBiZWVuIGhhbmRsZWQ7XG5cdFx0Ly8gYGJhc2ljTGVuZ3RoYCBpcyB0aGUgbnVtYmVyIG9mIGJhc2ljIGNvZGUgcG9pbnRzLlxuXG5cdFx0Ly8gRmluaXNoIHRoZSBiYXNpYyBzdHJpbmcgLSBpZiBpdCBpcyBub3QgZW1wdHkgLSB3aXRoIGEgZGVsaW1pdGVyXG5cdFx0aWYgKGJhc2ljTGVuZ3RoKSB7XG5cdFx0XHRvdXRwdXQucHVzaChkZWxpbWl0ZXIpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZW5jb2RpbmcgbG9vcDpcblx0XHR3aGlsZSAoaGFuZGxlZENQQ291bnQgPCBpbnB1dExlbmd0aCkge1xuXG5cdFx0XHQvLyBBbGwgbm9uLWJhc2ljIGNvZGUgcG9pbnRzIDwgbiBoYXZlIGJlZW4gaGFuZGxlZCBhbHJlYWR5LiBGaW5kIHRoZSBuZXh0XG5cdFx0XHQvLyBsYXJnZXIgb25lOlxuXHRcdFx0Zm9yIChtID0gbWF4SW50LCBqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPj0gbiAmJiBjdXJyZW50VmFsdWUgPCBtKSB7XG5cdFx0XHRcdFx0bSA9IGN1cnJlbnRWYWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbmNyZWFzZSBgZGVsdGFgIGVub3VnaCB0byBhZHZhbmNlIHRoZSBkZWNvZGVyJ3MgPG4saT4gc3RhdGUgdG8gPG0sMD4sXG5cdFx0XHQvLyBidXQgZ3VhcmQgYWdhaW5zdCBvdmVyZmxvd1xuXHRcdFx0aGFuZGxlZENQQ291bnRQbHVzT25lID0gaGFuZGxlZENQQ291bnQgKyAxO1xuXHRcdFx0aWYgKG0gLSBuID4gZmxvb3IoKG1heEludCAtIGRlbHRhKSAvIGhhbmRsZWRDUENvdW50UGx1c09uZSkpIHtcblx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdGRlbHRhICs9IChtIC0gbikgKiBoYW5kbGVkQ1BDb3VudFBsdXNPbmU7XG5cdFx0XHRuID0gbTtcblxuXHRcdFx0Zm9yIChqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA8IG4gJiYgKytkZWx0YSA+IG1heEludCkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PSBuKSB7XG5cdFx0XHRcdFx0Ly8gUmVwcmVzZW50IGRlbHRhIGFzIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXJcblx0XHRcdFx0XHRmb3IgKHEgPSBkZWx0YSwgayA9IGJhc2U7IC8qIG5vIGNvbmRpdGlvbiAqLzsgayArPSBiYXNlKSB7XG5cdFx0XHRcdFx0XHR0ID0gayA8PSBiaWFzID8gdE1pbiA6IChrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzKTtcblx0XHRcdFx0XHRcdGlmIChxIDwgdCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHFNaW51c1QgPSBxIC0gdDtcblx0XHRcdFx0XHRcdGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0XHRcdG91dHB1dC5wdXNoKFxuXHRcdFx0XHRcdFx0XHRzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHQgKyBxTWludXNUICUgYmFzZU1pbnVzVCwgMCkpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cSA9IGZsb29yKHFNaW51c1QgLyBiYXNlTWludXNUKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHEsIDApKSk7XG5cdFx0XHRcdFx0YmlhcyA9IGFkYXB0KGRlbHRhLCBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsIGhhbmRsZWRDUENvdW50ID09IGJhc2ljTGVuZ3RoKTtcblx0XHRcdFx0XHRkZWx0YSA9IDA7XG5cdFx0XHRcdFx0KytoYW5kbGVkQ1BDb3VudDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQrK2RlbHRhO1xuXHRcdFx0KytuO1xuXG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQuam9pbignJyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzc1xuXHQgKiB0byBVbmljb2RlLiBPbmx5IHRoZSBQdW55Y29kZWQgcGFydHMgb2YgdGhlIGlucHV0IHdpbGwgYmUgY29udmVydGVkLCBpLmUuXG5cdCAqIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IG9uIGEgc3RyaW5nIHRoYXQgaGFzIGFscmVhZHkgYmVlblxuXHQgKiBjb252ZXJ0ZWQgdG8gVW5pY29kZS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGVkIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogY29udmVydCB0byBVbmljb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgVW5pY29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gUHVueWNvZGVcblx0ICogc3RyaW5nLlxuXHQgKi9cblx0ZnVuY3Rpb24gdG9Vbmljb2RlKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhQdW55Y29kZS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyBkZWNvZGUoc3RyaW5nLnNsaWNlKDQpLnRvTG93ZXJDYXNlKCkpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgVW5pY29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzcyB0b1xuXHQgKiBQdW55Y29kZS4gT25seSB0aGUgbm9uLUFTQ0lJIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB3aWxsIGJlIGNvbnZlcnRlZCxcblx0ICogaS5lLiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQncyBhbHJlYWR5IGluXG5cdCAqIEFTQ0lJLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvIGNvbnZlcnQsIGFzIGFcblx0ICogVW5pY29kZSBzdHJpbmcuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBQdW55Y29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gZG9tYWluIG5hbWUgb3Jcblx0ICogZW1haWwgYWRkcmVzcy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvQVNDSUkoaW5wdXQpIHtcblx0XHRyZXR1cm4gbWFwRG9tYWluKGlucHV0LCBmdW5jdGlvbihzdHJpbmcpIHtcblx0XHRcdHJldHVybiByZWdleE5vbkFTQ0lJLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHQ/ICd4bi0tJyArIGVuY29kZShzdHJpbmcpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqIERlZmluZSB0aGUgcHVibGljIEFQSSAqL1xuXHRwdW55Y29kZSA9IHtcblx0XHQvKipcblx0XHQgKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgUHVueWNvZGUuanMgdmVyc2lvbiBudW1iZXIuXG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgU3RyaW5nXG5cdFx0ICovXG5cdFx0J3ZlcnNpb24nOiAnMS4zLjInLFxuXHRcdC8qKlxuXHRcdCAqIEFuIG9iamVjdCBvZiBtZXRob2RzIHRvIGNvbnZlcnQgZnJvbSBKYXZhU2NyaXB0J3MgaW50ZXJuYWwgY2hhcmFjdGVyXG5cdFx0ICogcmVwcmVzZW50YXRpb24gKFVDUy0yKSB0byBVbmljb2RlIGNvZGUgcG9pbnRzLCBhbmQgYmFjay5cblx0XHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0XHQgKiBAdHlwZSBPYmplY3Rcblx0XHQgKi9cblx0XHQndWNzMic6IHtcblx0XHRcdCdkZWNvZGUnOiB1Y3MyZGVjb2RlLFxuXHRcdFx0J2VuY29kZSc6IHVjczJlbmNvZGVcblx0XHR9LFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQndG9BU0NJSSc6IHRvQVNDSUksXG5cdFx0J3RvVW5pY29kZSc6IHRvVW5pY29kZVxuXHR9O1xuXG5cdC8qKiBFeHBvc2UgYHB1bnljb2RlYCAqL1xuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZSgncHVueWNvZGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBwdW55Y29kZTtcblx0XHR9KTtcblx0fSBlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiBmcmVlTW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBwdW55Y29kZTtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yIChrZXkgaW4gcHVueWNvZGUpIHtcblx0XHRcdFx0cHVueWNvZGUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IHB1bnljb2RlW2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QucHVueWNvZGUgPSBwdW55Y29kZTtcblx0fVxuXG59KHRoaXMpKTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gb2JqW2tdLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbiIsImZ1bmN0aW9uIG5vcm1hbGl6ZSAoc3RyKSB7XG4gIHJldHVybiBzdHJcbiAgICAgICAgICAucmVwbGFjZSgvW1xcL10rL2csICcvJylcbiAgICAgICAgICAucmVwbGFjZSgvXFwvXFw/L2csICc/JylcbiAgICAgICAgICAucmVwbGFjZSgvXFwvXFwjL2csICcjJylcbiAgICAgICAgICAucmVwbGFjZSgvXFw6XFwvL2csICc6Ly8nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBqb2luZWQgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkuam9pbignLycpO1xuICByZXR1cm4gbm9ybWFsaXplKGpvaW5lZCk7XG59OyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwdW55Y29kZSA9IHJlcXVpcmUoJ3B1bnljb2RlJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5leHBvcnRzLnBhcnNlID0gdXJsUGFyc2U7XG5leHBvcnRzLnJlc29sdmUgPSB1cmxSZXNvbHZlO1xuZXhwb3J0cy5yZXNvbHZlT2JqZWN0ID0gdXJsUmVzb2x2ZU9iamVjdDtcbmV4cG9ydHMuZm9ybWF0ID0gdXJsRm9ybWF0O1xuXG5leHBvcnRzLlVybCA9IFVybDtcblxuZnVuY3Rpb24gVXJsKCkge1xuICB0aGlzLnByb3RvY29sID0gbnVsbDtcbiAgdGhpcy5zbGFzaGVzID0gbnVsbDtcbiAgdGhpcy5hdXRoID0gbnVsbDtcbiAgdGhpcy5ob3N0ID0gbnVsbDtcbiAgdGhpcy5wb3J0ID0gbnVsbDtcbiAgdGhpcy5ob3N0bmFtZSA9IG51bGw7XG4gIHRoaXMuaGFzaCA9IG51bGw7XG4gIHRoaXMuc2VhcmNoID0gbnVsbDtcbiAgdGhpcy5xdWVyeSA9IG51bGw7XG4gIHRoaXMucGF0aG5hbWUgPSBudWxsO1xuICB0aGlzLnBhdGggPSBudWxsO1xuICB0aGlzLmhyZWYgPSBudWxsO1xufVxuXG4vLyBSZWZlcmVuY2U6IFJGQyAzOTg2LCBSRkMgMTgwOCwgUkZDIDIzOTZcblxuLy8gZGVmaW5lIHRoZXNlIGhlcmUgc28gYXQgbGVhc3QgdGhleSBvbmx5IGhhdmUgdG8gYmVcbi8vIGNvbXBpbGVkIG9uY2Ugb24gdGhlIGZpcnN0IG1vZHVsZSBsb2FkLlxudmFyIHByb3RvY29sUGF0dGVybiA9IC9eKFthLXowLTkuKy1dKzopL2ksXG4gICAgcG9ydFBhdHRlcm4gPSAvOlswLTldKiQvLFxuXG4gICAgLy8gU3BlY2lhbCBjYXNlIGZvciBhIHNpbXBsZSBwYXRoIFVSTFxuICAgIHNpbXBsZVBhdGhQYXR0ZXJuID0gL14oXFwvXFwvPyg/IVxcLylbXlxcP1xcc10qKShcXD9bXlxcc10qKT8kLyxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIHJlc2VydmVkIGZvciBkZWxpbWl0aW5nIFVSTHMuXG4gICAgLy8gV2UgYWN0dWFsbHkganVzdCBhdXRvLWVzY2FwZSB0aGVzZS5cbiAgICBkZWxpbXMgPSBbJzwnLCAnPicsICdcIicsICdgJywgJyAnLCAnXFxyJywgJ1xcbicsICdcXHQnXSxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkIGZvciB2YXJpb3VzIHJlYXNvbnMuXG4gICAgdW53aXNlID0gWyd7JywgJ30nLCAnfCcsICdcXFxcJywgJ14nLCAnYCddLmNvbmNhdChkZWxpbXMpLFxuXG4gICAgLy8gQWxsb3dlZCBieSBSRkNzLCBidXQgY2F1c2Ugb2YgWFNTIGF0dGFja3MuICBBbHdheXMgZXNjYXBlIHRoZXNlLlxuICAgIGF1dG9Fc2NhcGUgPSBbJ1xcJyddLmNvbmNhdCh1bndpc2UpLFxuICAgIC8vIENoYXJhY3RlcnMgdGhhdCBhcmUgbmV2ZXIgZXZlciBhbGxvd2VkIGluIGEgaG9zdG5hbWUuXG4gICAgLy8gTm90ZSB0aGF0IGFueSBpbnZhbGlkIGNoYXJzIGFyZSBhbHNvIGhhbmRsZWQsIGJ1dCB0aGVzZVxuICAgIC8vIGFyZSB0aGUgb25lcyB0aGF0IGFyZSAqZXhwZWN0ZWQqIHRvIGJlIHNlZW4sIHNvIHdlIGZhc3QtcGF0aFxuICAgIC8vIHRoZW0uXG4gICAgbm9uSG9zdENoYXJzID0gWyclJywgJy8nLCAnPycsICc7JywgJyMnXS5jb25jYXQoYXV0b0VzY2FwZSksXG4gICAgaG9zdEVuZGluZ0NoYXJzID0gWycvJywgJz8nLCAnIyddLFxuICAgIGhvc3RuYW1lTWF4TGVuID0gMjU1LFxuICAgIGhvc3RuYW1lUGFydFBhdHRlcm4gPSAvXlsrYS16MC05QS1aXy1dezAsNjN9JC8sXG4gICAgaG9zdG5hbWVQYXJ0U3RhcnQgPSAvXihbK2EtejAtOUEtWl8tXXswLDYzfSkoLiopJC8sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgY2FuIGFsbG93IFwidW5zYWZlXCIgYW5kIFwidW53aXNlXCIgY2hhcnMuXG4gICAgdW5zYWZlUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBuZXZlciBoYXZlIGEgaG9zdG5hbWUuXG4gICAgaG9zdGxlc3NQcm90b2NvbCA9IHtcbiAgICAgICdqYXZhc2NyaXB0JzogdHJ1ZSxcbiAgICAgICdqYXZhc2NyaXB0Oic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IGFsd2F5cyBjb250YWluIGEgLy8gYml0LlxuICAgIHNsYXNoZWRQcm90b2NvbCA9IHtcbiAgICAgICdodHRwJzogdHJ1ZSxcbiAgICAgICdodHRwcyc6IHRydWUsXG4gICAgICAnZnRwJzogdHJ1ZSxcbiAgICAgICdnb3BoZXInOiB0cnVlLFxuICAgICAgJ2ZpbGUnOiB0cnVlLFxuICAgICAgJ2h0dHA6JzogdHJ1ZSxcbiAgICAgICdodHRwczonOiB0cnVlLFxuICAgICAgJ2Z0cDonOiB0cnVlLFxuICAgICAgJ2dvcGhlcjonOiB0cnVlLFxuICAgICAgJ2ZpbGU6JzogdHJ1ZVxuICAgIH0sXG4gICAgcXVlcnlzdHJpbmcgPSByZXF1aXJlKCdxdWVyeXN0cmluZycpO1xuXG5mdW5jdGlvbiB1cmxQYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG4gIGlmICh1cmwgJiYgdXRpbC5pc09iamVjdCh1cmwpICYmIHVybCBpbnN0YW5jZW9mIFVybCkgcmV0dXJuIHVybDtcblxuICB2YXIgdSA9IG5ldyBVcmw7XG4gIHUucGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCk7XG4gIHJldHVybiB1O1xufVxuXG5VcmwucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24odXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCkge1xuICBpZiAoIXV0aWwuaXNTdHJpbmcodXJsKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQYXJhbWV0ZXIgJ3VybCcgbXVzdCBiZSBhIHN0cmluZywgbm90IFwiICsgdHlwZW9mIHVybCk7XG4gIH1cblxuICAvLyBDb3B5IGNocm9tZSwgSUUsIG9wZXJhIGJhY2tzbGFzaC1oYW5kbGluZyBiZWhhdmlvci5cbiAgLy8gQmFjayBzbGFzaGVzIGJlZm9yZSB0aGUgcXVlcnkgc3RyaW5nIGdldCBjb252ZXJ0ZWQgdG8gZm9yd2FyZCBzbGFzaGVzXG4gIC8vIFNlZTogaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTI1OTE2XG4gIHZhciBxdWVyeUluZGV4ID0gdXJsLmluZGV4T2YoJz8nKSxcbiAgICAgIHNwbGl0dGVyID1cbiAgICAgICAgICAocXVlcnlJbmRleCAhPT0gLTEgJiYgcXVlcnlJbmRleCA8IHVybC5pbmRleE9mKCcjJykpID8gJz8nIDogJyMnLFxuICAgICAgdVNwbGl0ID0gdXJsLnNwbGl0KHNwbGl0dGVyKSxcbiAgICAgIHNsYXNoUmVnZXggPSAvXFxcXC9nO1xuICB1U3BsaXRbMF0gPSB1U3BsaXRbMF0ucmVwbGFjZShzbGFzaFJlZ2V4LCAnLycpO1xuICB1cmwgPSB1U3BsaXQuam9pbihzcGxpdHRlcik7XG5cbiAgdmFyIHJlc3QgPSB1cmw7XG5cbiAgLy8gdHJpbSBiZWZvcmUgcHJvY2VlZGluZy5cbiAgLy8gVGhpcyBpcyB0byBzdXBwb3J0IHBhcnNlIHN0dWZmIGxpa2UgXCIgIGh0dHA6Ly9mb28uY29tICBcXG5cIlxuICByZXN0ID0gcmVzdC50cmltKCk7XG5cbiAgaWYgKCFzbGFzaGVzRGVub3RlSG9zdCAmJiB1cmwuc3BsaXQoJyMnKS5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBUcnkgZmFzdCBwYXRoIHJlZ2V4cFxuICAgIHZhciBzaW1wbGVQYXRoID0gc2ltcGxlUGF0aFBhdHRlcm4uZXhlYyhyZXN0KTtcbiAgICBpZiAoc2ltcGxlUGF0aCkge1xuICAgICAgdGhpcy5wYXRoID0gcmVzdDtcbiAgICAgIHRoaXMuaHJlZiA9IHJlc3Q7XG4gICAgICB0aGlzLnBhdGhuYW1lID0gc2ltcGxlUGF0aFsxXTtcbiAgICAgIGlmIChzaW1wbGVQYXRoWzJdKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gc2ltcGxlUGF0aFsyXTtcbiAgICAgICAgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5zZWFyY2guc3Vic3RyKDEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5zZWFyY2guc3Vic3RyKDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSAnJztcbiAgICAgICAgdGhpcy5xdWVyeSA9IHt9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XG5cbiAgdmFyIHByb3RvID0gcHJvdG9jb2xQYXR0ZXJuLmV4ZWMocmVzdCk7XG4gIGlmIChwcm90bykge1xuICAgIHByb3RvID0gcHJvdG9bMF07XG4gICAgdmFyIGxvd2VyUHJvdG8gPSBwcm90by50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMucHJvdG9jb2wgPSBsb3dlclByb3RvO1xuICAgIHJlc3QgPSByZXN0LnN1YnN0cihwcm90by5sZW5ndGgpO1xuICB9XG5cbiAgLy8gZmlndXJlIG91dCBpZiBpdCdzIGdvdCBhIGhvc3RcbiAgLy8gdXNlckBzZXJ2ZXIgaXMgKmFsd2F5cyogaW50ZXJwcmV0ZWQgYXMgYSBob3N0bmFtZSwgYW5kIHVybFxuICAvLyByZXNvbHV0aW9uIHdpbGwgdHJlYXQgLy9mb28vYmFyIGFzIGhvc3Q9Zm9vLHBhdGg9YmFyIGJlY2F1c2UgdGhhdCdzXG4gIC8vIGhvdyB0aGUgYnJvd3NlciByZXNvbHZlcyByZWxhdGl2ZSBVUkxzLlxuICBpZiAoc2xhc2hlc0Rlbm90ZUhvc3QgfHwgcHJvdG8gfHwgcmVzdC5tYXRjaCgvXlxcL1xcL1teQFxcL10rQFteQFxcL10rLykpIHtcbiAgICB2YXIgc2xhc2hlcyA9IHJlc3Quc3Vic3RyKDAsIDIpID09PSAnLy8nO1xuICAgIGlmIChzbGFzaGVzICYmICEocHJvdG8gJiYgaG9zdGxlc3NQcm90b2NvbFtwcm90b10pKSB7XG4gICAgICByZXN0ID0gcmVzdC5zdWJzdHIoMik7XG4gICAgICB0aGlzLnNsYXNoZXMgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaG9zdGxlc3NQcm90b2NvbFtwcm90b10gJiZcbiAgICAgIChzbGFzaGVzIHx8IChwcm90byAmJiAhc2xhc2hlZFByb3RvY29sW3Byb3RvXSkpKSB7XG5cbiAgICAvLyB0aGVyZSdzIGEgaG9zdG5hbWUuXG4gICAgLy8gdGhlIGZpcnN0IGluc3RhbmNlIG9mIC8sID8sIDssIG9yICMgZW5kcyB0aGUgaG9zdC5cbiAgICAvL1xuICAgIC8vIElmIHRoZXJlIGlzIGFuIEAgaW4gdGhlIGhvc3RuYW1lLCB0aGVuIG5vbi1ob3N0IGNoYXJzICphcmUqIGFsbG93ZWRcbiAgICAvLyB0byB0aGUgbGVmdCBvZiB0aGUgbGFzdCBAIHNpZ24sIHVubGVzcyBzb21lIGhvc3QtZW5kaW5nIGNoYXJhY3RlclxuICAgIC8vIGNvbWVzICpiZWZvcmUqIHRoZSBALXNpZ24uXG4gICAgLy8gVVJMcyBhcmUgb2Jub3hpb3VzLlxuICAgIC8vXG4gICAgLy8gZXg6XG4gICAgLy8gaHR0cDovL2FAYkBjLyA9PiB1c2VyOmFAYiBob3N0OmNcbiAgICAvLyBodHRwOi8vYUBiP0BjID0+IHVzZXI6YSBob3N0OmMgcGF0aDovP0BjXG5cbiAgICAvLyB2MC4xMiBUT0RPKGlzYWFjcyk6IFRoaXMgaXMgbm90IHF1aXRlIGhvdyBDaHJvbWUgZG9lcyB0aGluZ3MuXG4gICAgLy8gUmV2aWV3IG91ciB0ZXN0IGNhc2UgYWdhaW5zdCBicm93c2VycyBtb3JlIGNvbXByZWhlbnNpdmVseS5cblxuICAgIC8vIGZpbmQgdGhlIGZpcnN0IGluc3RhbmNlIG9mIGFueSBob3N0RW5kaW5nQ2hhcnNcbiAgICB2YXIgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaG9zdEVuZGluZ0NoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKGhvc3RFbmRpbmdDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuXG4gICAgLy8gYXQgdGhpcyBwb2ludCwgZWl0aGVyIHdlIGhhdmUgYW4gZXhwbGljaXQgcG9pbnQgd2hlcmUgdGhlXG4gICAgLy8gYXV0aCBwb3J0aW9uIGNhbm5vdCBnbyBwYXN0LCBvciB0aGUgbGFzdCBAIGNoYXIgaXMgdGhlIGRlY2lkZXIuXG4gICAgdmFyIGF1dGgsIGF0U2lnbjtcbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpIHtcbiAgICAgIC8vIGF0U2lnbiBjYW4gYmUgYW55d2hlcmUuXG4gICAgICBhdFNpZ24gPSByZXN0Lmxhc3RJbmRleE9mKCdAJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGF0U2lnbiBtdXN0IGJlIGluIGF1dGggcG9ydGlvbi5cbiAgICAgIC8vIGh0dHA6Ly9hQGIvY0BkID0+IGhvc3Q6YiBhdXRoOmEgcGF0aDovY0BkXG4gICAgICBhdFNpZ24gPSByZXN0Lmxhc3RJbmRleE9mKCdAJywgaG9zdEVuZCk7XG4gICAgfVxuXG4gICAgLy8gTm93IHdlIGhhdmUgYSBwb3J0aW9uIHdoaWNoIGlzIGRlZmluaXRlbHkgdGhlIGF1dGguXG4gICAgLy8gUHVsbCB0aGF0IG9mZi5cbiAgICBpZiAoYXRTaWduICE9PSAtMSkge1xuICAgICAgYXV0aCA9IHJlc3Quc2xpY2UoMCwgYXRTaWduKTtcbiAgICAgIHJlc3QgPSByZXN0LnNsaWNlKGF0U2lnbiArIDEpO1xuICAgICAgdGhpcy5hdXRoID0gZGVjb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIH1cblxuICAgIC8vIHRoZSBob3N0IGlzIHRoZSByZW1haW5pbmcgdG8gdGhlIGxlZnQgb2YgdGhlIGZpcnN0IG5vbi1ob3N0IGNoYXJcbiAgICBob3N0RW5kID0gLTE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub25Ib3N0Q2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBoZWMgPSByZXN0LmluZGV4T2Yobm9uSG9zdENoYXJzW2ldKTtcbiAgICAgIGlmIChoZWMgIT09IC0xICYmIChob3N0RW5kID09PSAtMSB8fCBoZWMgPCBob3N0RW5kKSlcbiAgICAgICAgaG9zdEVuZCA9IGhlYztcbiAgICB9XG4gICAgLy8gaWYgd2Ugc3RpbGwgaGF2ZSBub3QgaGl0IGl0LCB0aGVuIHRoZSBlbnRpcmUgdGhpbmcgaXMgYSBob3N0LlxuICAgIGlmIChob3N0RW5kID09PSAtMSlcbiAgICAgIGhvc3RFbmQgPSByZXN0Lmxlbmd0aDtcblxuICAgIHRoaXMuaG9zdCA9IHJlc3Quc2xpY2UoMCwgaG9zdEVuZCk7XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoaG9zdEVuZCk7XG5cbiAgICAvLyBwdWxsIG91dCBwb3J0LlxuICAgIHRoaXMucGFyc2VIb3N0KCk7XG5cbiAgICAvLyB3ZSd2ZSBpbmRpY2F0ZWQgdGhhdCB0aGVyZSBpcyBhIGhvc3RuYW1lLFxuICAgIC8vIHNvIGV2ZW4gaWYgaXQncyBlbXB0eSwgaXQgaGFzIHRvIGJlIHByZXNlbnQuXG4gICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUgfHwgJyc7XG5cbiAgICAvLyBpZiBob3N0bmFtZSBiZWdpbnMgd2l0aCBbIGFuZCBlbmRzIHdpdGggXVxuICAgIC8vIGFzc3VtZSB0aGF0IGl0J3MgYW4gSVB2NiBhZGRyZXNzLlxuICAgIHZhciBpcHY2SG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lWzBdID09PSAnWycgJiZcbiAgICAgICAgdGhpcy5ob3N0bmFtZVt0aGlzLmhvc3RuYW1lLmxlbmd0aCAtIDFdID09PSAnXSc7XG5cbiAgICAvLyB2YWxpZGF0ZSBhIGxpdHRsZS5cbiAgICBpZiAoIWlwdjZIb3N0bmFtZSkge1xuICAgICAgdmFyIGhvc3RwYXJ0cyA9IHRoaXMuaG9zdG5hbWUuc3BsaXQoL1xcLi8pO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBob3N0cGFydHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBwYXJ0ID0gaG9zdHBhcnRzW2ldO1xuICAgICAgICBpZiAoIXBhcnQpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoIXBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICB2YXIgbmV3cGFydCA9ICcnO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwLCBrID0gcGFydC5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChwYXJ0LmNoYXJDb2RlQXQoaikgPiAxMjcpIHtcbiAgICAgICAgICAgICAgLy8gd2UgcmVwbGFjZSBub24tQVNDSUkgY2hhciB3aXRoIGEgdGVtcG9yYXJ5IHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgIC8vIHdlIG5lZWQgdGhpcyB0byBtYWtlIHN1cmUgc2l6ZSBvZiBob3N0bmFtZSBpcyBub3RcbiAgICAgICAgICAgICAgLy8gYnJva2VuIGJ5IHJlcGxhY2luZyBub24tQVNDSUkgYnkgbm90aGluZ1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9ICd4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld3BhcnQgKz0gcGFydFtqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2UgdGVzdCBhZ2FpbiB3aXRoIEFTQ0lJIGNoYXIgb25seVxuICAgICAgICAgIGlmICghbmV3cGFydC5tYXRjaChob3N0bmFtZVBhcnRQYXR0ZXJuKSkge1xuICAgICAgICAgICAgdmFyIHZhbGlkUGFydHMgPSBob3N0cGFydHMuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICB2YXIgbm90SG9zdCA9IGhvc3RwYXJ0cy5zbGljZShpICsgMSk7XG4gICAgICAgICAgICB2YXIgYml0ID0gcGFydC5tYXRjaChob3N0bmFtZVBhcnRTdGFydCk7XG4gICAgICAgICAgICBpZiAoYml0KSB7XG4gICAgICAgICAgICAgIHZhbGlkUGFydHMucHVzaChiaXRbMV0pO1xuICAgICAgICAgICAgICBub3RIb3N0LnVuc2hpZnQoYml0WzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub3RIb3N0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXN0ID0gJy8nICsgbm90SG9zdC5qb2luKCcuJykgKyByZXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ob3N0bmFtZSA9IHZhbGlkUGFydHMuam9pbignLicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaG9zdG5hbWUubGVuZ3RoID4gaG9zdG5hbWVNYXhMZW4pIHtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaG9zdG5hbWVzIGFyZSBhbHdheXMgbG93ZXIgY2FzZS5cbiAgICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIC8vIElETkEgU3VwcG9ydDogUmV0dXJucyBhIHB1bnljb2RlZCByZXByZXNlbnRhdGlvbiBvZiBcImRvbWFpblwiLlxuICAgICAgLy8gSXQgb25seSBjb252ZXJ0cyBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgdGhhdFxuICAgICAgLy8gaGF2ZSBub24tQVNDSUkgY2hhcmFjdGVycywgaS5lLiBpdCBkb2Vzbid0IG1hdHRlciBpZlxuICAgICAgLy8geW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0IGFscmVhZHkgaXMgQVNDSUktb25seS5cbiAgICAgIHRoaXMuaG9zdG5hbWUgPSBwdW55Y29kZS50b0FTQ0lJKHRoaXMuaG9zdG5hbWUpO1xuICAgIH1cblxuICAgIHZhciBwID0gdGhpcy5wb3J0ID8gJzonICsgdGhpcy5wb3J0IDogJyc7XG4gICAgdmFyIGggPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuICAgIHRoaXMuaG9zdCA9IGggKyBwO1xuICAgIHRoaXMuaHJlZiArPSB0aGlzLmhvc3Q7XG5cbiAgICAvLyBzdHJpcCBbIGFuZCBdIGZyb20gdGhlIGhvc3RuYW1lXG4gICAgLy8gdGhlIGhvc3QgZmllbGQgc3RpbGwgcmV0YWlucyB0aGVtLCB0aG91Z2hcbiAgICBpZiAoaXB2Nkhvc3RuYW1lKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS5zdWJzdHIoMSwgdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIGlmIChyZXN0WzBdICE9PSAnLycpIHtcbiAgICAgICAgcmVzdCA9ICcvJyArIHJlc3Q7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gbm93IHJlc3QgaXMgc2V0IHRvIHRoZSBwb3N0LWhvc3Qgc3R1ZmYuXG4gIC8vIGNob3Agb2ZmIGFueSBkZWxpbSBjaGFycy5cbiAgaWYgKCF1bnNhZmVQcm90b2NvbFtsb3dlclByb3RvXSkge1xuXG4gICAgLy8gRmlyc3QsIG1ha2UgMTAwJSBzdXJlIHRoYXQgYW55IFwiYXV0b0VzY2FwZVwiIGNoYXJzIGdldFxuICAgIC8vIGVzY2FwZWQsIGV2ZW4gaWYgZW5jb2RlVVJJQ29tcG9uZW50IGRvZXNuJ3QgdGhpbmsgdGhleVxuICAgIC8vIG5lZWQgdG8gYmUuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhdXRvRXNjYXBlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIGFlID0gYXV0b0VzY2FwZVtpXTtcbiAgICAgIGlmIChyZXN0LmluZGV4T2YoYWUpID09PSAtMSlcbiAgICAgICAgY29udGludWU7XG4gICAgICB2YXIgZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50KGFlKTtcbiAgICAgIGlmIChlc2MgPT09IGFlKSB7XG4gICAgICAgIGVzYyA9IGVzY2FwZShhZSk7XG4gICAgICB9XG4gICAgICByZXN0ID0gcmVzdC5zcGxpdChhZSkuam9pbihlc2MpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gY2hvcCBvZmYgZnJvbSB0aGUgdGFpbCBmaXJzdC5cbiAgdmFyIGhhc2ggPSByZXN0LmluZGV4T2YoJyMnKTtcbiAgaWYgKGhhc2ggIT09IC0xKSB7XG4gICAgLy8gZ290IGEgZnJhZ21lbnQgc3RyaW5nLlxuICAgIHRoaXMuaGFzaCA9IHJlc3Quc3Vic3RyKGhhc2gpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIGhhc2gpO1xuICB9XG4gIHZhciBxbSA9IHJlc3QuaW5kZXhPZignPycpO1xuICBpZiAocW0gIT09IC0xKSB7XG4gICAgdGhpcy5zZWFyY2ggPSByZXN0LnN1YnN0cihxbSk7XG4gICAgdGhpcy5xdWVyeSA9IHJlc3Quc3Vic3RyKHFtICsgMSk7XG4gICAgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgIHRoaXMucXVlcnkgPSBxdWVyeXN0cmluZy5wYXJzZSh0aGlzLnF1ZXJ5KTtcbiAgICB9XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoMCwgcW0pO1xuICB9IGVsc2UgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAvLyBubyBxdWVyeSBzdHJpbmcsIGJ1dCBwYXJzZVF1ZXJ5U3RyaW5nIHN0aWxsIHJlcXVlc3RlZFxuICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgdGhpcy5xdWVyeSA9IHt9O1xuICB9XG4gIGlmIChyZXN0KSB0aGlzLnBhdGhuYW1lID0gcmVzdDtcbiAgaWYgKHNsYXNoZWRQcm90b2NvbFtsb3dlclByb3RvXSAmJlxuICAgICAgdGhpcy5ob3N0bmFtZSAmJiAhdGhpcy5wYXRobmFtZSkge1xuICAgIHRoaXMucGF0aG5hbWUgPSAnLyc7XG4gIH1cblxuICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gIGlmICh0aGlzLnBhdGhuYW1lIHx8IHRoaXMuc2VhcmNoKSB7XG4gICAgdmFyIHAgPSB0aGlzLnBhdGhuYW1lIHx8ICcnO1xuICAgIHZhciBzID0gdGhpcy5zZWFyY2ggfHwgJyc7XG4gICAgdGhpcy5wYXRoID0gcCArIHM7XG4gIH1cblxuICAvLyBmaW5hbGx5LCByZWNvbnN0cnVjdCB0aGUgaHJlZiBiYXNlZCBvbiB3aGF0IGhhcyBiZWVuIHZhbGlkYXRlZC5cbiAgdGhpcy5ocmVmID0gdGhpcy5mb3JtYXQoKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBmb3JtYXQgYSBwYXJzZWQgb2JqZWN0IGludG8gYSB1cmwgc3RyaW5nXG5mdW5jdGlvbiB1cmxGb3JtYXQob2JqKSB7XG4gIC8vIGVuc3VyZSBpdCdzIGFuIG9iamVjdCwgYW5kIG5vdCBhIHN0cmluZyB1cmwuXG4gIC8vIElmIGl0J3MgYW4gb2JqLCB0aGlzIGlzIGEgbm8tb3AuXG4gIC8vIHRoaXMgd2F5LCB5b3UgY2FuIGNhbGwgdXJsX2Zvcm1hdCgpIG9uIHN0cmluZ3NcbiAgLy8gdG8gY2xlYW4gdXAgcG90ZW50aWFsbHkgd29ua3kgdXJscy5cbiAgaWYgKHV0aWwuaXNTdHJpbmcob2JqKSkgb2JqID0gdXJsUGFyc2Uob2JqKTtcbiAgaWYgKCEob2JqIGluc3RhbmNlb2YgVXJsKSkgcmV0dXJuIFVybC5wcm90b3R5cGUuZm9ybWF0LmNhbGwob2JqKTtcbiAgcmV0dXJuIG9iai5mb3JtYXQoKTtcbn1cblxuVXJsLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGF1dGggPSB0aGlzLmF1dGggfHwgJyc7XG4gIGlmIChhdXRoKSB7XG4gICAgYXV0aCA9IGVuY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICBhdXRoID0gYXV0aC5yZXBsYWNlKC8lM0EvaSwgJzonKTtcbiAgICBhdXRoICs9ICdAJztcbiAgfVxuXG4gIHZhciBwcm90b2NvbCA9IHRoaXMucHJvdG9jb2wgfHwgJycsXG4gICAgICBwYXRobmFtZSA9IHRoaXMucGF0aG5hbWUgfHwgJycsXG4gICAgICBoYXNoID0gdGhpcy5oYXNoIHx8ICcnLFxuICAgICAgaG9zdCA9IGZhbHNlLFxuICAgICAgcXVlcnkgPSAnJztcblxuICBpZiAodGhpcy5ob3N0KSB7XG4gICAgaG9zdCA9IGF1dGggKyB0aGlzLmhvc3Q7XG4gIH0gZWxzZSBpZiAodGhpcy5ob3N0bmFtZSkge1xuICAgIGhvc3QgPSBhdXRoICsgKHRoaXMuaG9zdG5hbWUuaW5kZXhPZignOicpID09PSAtMSA/XG4gICAgICAgIHRoaXMuaG9zdG5hbWUgOlxuICAgICAgICAnWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nKTtcbiAgICBpZiAodGhpcy5wb3J0KSB7XG4gICAgICBob3N0ICs9ICc6JyArIHRoaXMucG9ydDtcbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy5xdWVyeSAmJlxuICAgICAgdXRpbC5pc09iamVjdCh0aGlzLnF1ZXJ5KSAmJlxuICAgICAgT2JqZWN0LmtleXModGhpcy5xdWVyeSkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkodGhpcy5xdWVyeSk7XG4gIH1cblxuICB2YXIgc2VhcmNoID0gdGhpcy5zZWFyY2ggfHwgKHF1ZXJ5ICYmICgnPycgKyBxdWVyeSkpIHx8ICcnO1xuXG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5zdWJzdHIoLTEpICE9PSAnOicpIHByb3RvY29sICs9ICc6JztcblxuICAvLyBvbmx5IHRoZSBzbGFzaGVkUHJvdG9jb2xzIGdldCB0aGUgLy8uICBOb3QgbWFpbHRvOiwgeG1wcDosIGV0Yy5cbiAgLy8gdW5sZXNzIHRoZXkgaGFkIHRoZW0gdG8gYmVnaW4gd2l0aC5cbiAgaWYgKHRoaXMuc2xhc2hlcyB8fFxuICAgICAgKCFwcm90b2NvbCB8fCBzbGFzaGVkUHJvdG9jb2xbcHJvdG9jb2xdKSAmJiBob3N0ICE9PSBmYWxzZSkge1xuICAgIGhvc3QgPSAnLy8nICsgKGhvc3QgfHwgJycpO1xuICAgIGlmIChwYXRobmFtZSAmJiBwYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJykgcGF0aG5hbWUgPSAnLycgKyBwYXRobmFtZTtcbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSAnJztcbiAgfVxuXG4gIGlmIChoYXNoICYmIGhhc2guY2hhckF0KDApICE9PSAnIycpIGhhc2ggPSAnIycgKyBoYXNoO1xuICBpZiAoc2VhcmNoICYmIHNlYXJjaC5jaGFyQXQoMCkgIT09ICc/Jykgc2VhcmNoID0gJz8nICsgc2VhcmNoO1xuXG4gIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZSgvWz8jXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQobWF0Y2gpO1xuICB9KTtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoJyMnLCAnJTIzJyk7XG5cbiAgcmV0dXJuIHByb3RvY29sICsgaG9zdCArIHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaDtcbn07XG5cbmZ1bmN0aW9uIHVybFJlc29sdmUoc291cmNlLCByZWxhdGl2ZSkge1xuICByZXR1cm4gdXJsUGFyc2Uoc291cmNlLCBmYWxzZSwgdHJ1ZSkucmVzb2x2ZShyZWxhdGl2ZSk7XG59XG5cblVybC5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uKHJlbGF0aXZlKSB7XG4gIHJldHVybiB0aGlzLnJlc29sdmVPYmplY3QodXJsUGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKSkuZm9ybWF0KCk7XG59O1xuXG5mdW5jdGlvbiB1cmxSZXNvbHZlT2JqZWN0KHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgaWYgKCFzb3VyY2UpIHJldHVybiByZWxhdGl2ZTtcbiAgcmV0dXJuIHVybFBhcnNlKHNvdXJjZSwgZmFsc2UsIHRydWUpLnJlc29sdmVPYmplY3QocmVsYXRpdmUpO1xufVxuXG5VcmwucHJvdG90eXBlLnJlc29sdmVPYmplY3QgPSBmdW5jdGlvbihyZWxhdGl2ZSkge1xuICBpZiAodXRpbC5pc1N0cmluZyhyZWxhdGl2ZSkpIHtcbiAgICB2YXIgcmVsID0gbmV3IFVybCgpO1xuICAgIHJlbC5wYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpO1xuICAgIHJlbGF0aXZlID0gcmVsO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBVcmwoKTtcbiAgdmFyIHRrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gIGZvciAodmFyIHRrID0gMDsgdGsgPCB0a2V5cy5sZW5ndGg7IHRrKyspIHtcbiAgICB2YXIgdGtleSA9IHRrZXlzW3RrXTtcbiAgICByZXN1bHRbdGtleV0gPSB0aGlzW3RrZXldO1xuICB9XG5cbiAgLy8gaGFzaCBpcyBhbHdheXMgb3ZlcnJpZGRlbiwgbm8gbWF0dGVyIHdoYXQuXG4gIC8vIGV2ZW4gaHJlZj1cIlwiIHdpbGwgcmVtb3ZlIGl0LlxuICByZXN1bHQuaGFzaCA9IHJlbGF0aXZlLmhhc2g7XG5cbiAgLy8gaWYgdGhlIHJlbGF0aXZlIHVybCBpcyBlbXB0eSwgdGhlbiB0aGVyZSdzIG5vdGhpbmcgbGVmdCB0byBkbyBoZXJlLlxuICBpZiAocmVsYXRpdmUuaHJlZiA9PT0gJycpIHtcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gaHJlZnMgbGlrZSAvL2Zvby9iYXIgYWx3YXlzIGN1dCB0byB0aGUgcHJvdG9jb2wuXG4gIGlmIChyZWxhdGl2ZS5zbGFzaGVzICYmICFyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgIC8vIHRha2UgZXZlcnl0aGluZyBleGNlcHQgdGhlIHByb3RvY29sIGZyb20gcmVsYXRpdmVcbiAgICB2YXIgcmtleXMgPSBPYmplY3Qua2V5cyhyZWxhdGl2ZSk7XG4gICAgZm9yICh2YXIgcmsgPSAwOyByayA8IHJrZXlzLmxlbmd0aDsgcmsrKykge1xuICAgICAgdmFyIHJrZXkgPSBya2V5c1tya107XG4gICAgICBpZiAocmtleSAhPT0gJ3Byb3RvY29sJylcbiAgICAgICAgcmVzdWx0W3JrZXldID0gcmVsYXRpdmVbcmtleV07XG4gICAgfVxuXG4gICAgLy91cmxQYXJzZSBhcHBlbmRzIHRyYWlsaW5nIC8gdG8gdXJscyBsaWtlIGh0dHA6Ly93d3cuZXhhbXBsZS5jb21cbiAgICBpZiAoc2xhc2hlZFByb3RvY29sW3Jlc3VsdC5wcm90b2NvbF0gJiZcbiAgICAgICAgcmVzdWx0Lmhvc3RuYW1lICYmICFyZXN1bHQucGF0aG5hbWUpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gcmVzdWx0LnBhdGhuYW1lID0gJy8nO1xuICAgIH1cblxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAocmVsYXRpdmUucHJvdG9jb2wgJiYgcmVsYXRpdmUucHJvdG9jb2wgIT09IHJlc3VsdC5wcm90b2NvbCkge1xuICAgIC8vIGlmIGl0J3MgYSBrbm93biB1cmwgcHJvdG9jb2wsIHRoZW4gY2hhbmdpbmdcbiAgICAvLyB0aGUgcHJvdG9jb2wgZG9lcyB3ZWlyZCB0aGluZ3NcbiAgICAvLyBmaXJzdCwgaWYgaXQncyBub3QgZmlsZTosIHRoZW4gd2UgTVVTVCBoYXZlIGEgaG9zdCxcbiAgICAvLyBhbmQgaWYgdGhlcmUgd2FzIGEgcGF0aFxuICAgIC8vIHRvIGJlZ2luIHdpdGgsIHRoZW4gd2UgTVVTVCBoYXZlIGEgcGF0aC5cbiAgICAvLyBpZiBpdCBpcyBmaWxlOiwgdGhlbiB0aGUgaG9zdCBpcyBkcm9wcGVkLFxuICAgIC8vIGJlY2F1c2UgdGhhdCdzIGtub3duIHRvIGJlIGhvc3RsZXNzLlxuICAgIC8vIGFueXRoaW5nIGVsc2UgaXMgYXNzdW1lZCB0byBiZSBhYnNvbHV0ZS5cbiAgICBpZiAoIXNsYXNoZWRQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmVsYXRpdmUpO1xuICAgICAgZm9yICh2YXIgdiA9IDA7IHYgPCBrZXlzLmxlbmd0aDsgdisrKSB7XG4gICAgICAgIHZhciBrID0ga2V5c1t2XTtcbiAgICAgICAgcmVzdWx0W2tdID0gcmVsYXRpdmVba107XG4gICAgICB9XG4gICAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmVzdWx0LnByb3RvY29sID0gcmVsYXRpdmUucHJvdG9jb2w7XG4gICAgaWYgKCFyZWxhdGl2ZS5ob3N0ICYmICFob3N0bGVzc1Byb3RvY29sW3JlbGF0aXZlLnByb3RvY29sXSkge1xuICAgICAgdmFyIHJlbFBhdGggPSAocmVsYXRpdmUucGF0aG5hbWUgfHwgJycpLnNwbGl0KCcvJyk7XG4gICAgICB3aGlsZSAocmVsUGF0aC5sZW5ndGggJiYgIShyZWxhdGl2ZS5ob3N0ID0gcmVsUGF0aC5zaGlmdCgpKSk7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3QpIHJlbGF0aXZlLmhvc3QgPSAnJztcbiAgICAgIGlmICghcmVsYXRpdmUuaG9zdG5hbWUpIHJlbGF0aXZlLmhvc3RuYW1lID0gJyc7XG4gICAgICBpZiAocmVsUGF0aFswXSAhPT0gJycpIHJlbFBhdGgudW5zaGlmdCgnJyk7XG4gICAgICBpZiAocmVsUGF0aC5sZW5ndGggPCAyKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgcmVzdWx0LnBhdGhuYW1lID0gcmVsUGF0aC5qb2luKCcvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbGF0aXZlLnBhdGhuYW1lO1xuICAgIH1cbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIHJlc3VsdC5ob3N0ID0gcmVsYXRpdmUuaG9zdCB8fCAnJztcbiAgICByZXN1bHQuYXV0aCA9IHJlbGF0aXZlLmF1dGg7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVsYXRpdmUuaG9zdG5hbWUgfHwgcmVsYXRpdmUuaG9zdDtcbiAgICByZXN1bHQucG9ydCA9IHJlbGF0aXZlLnBvcnQ7XG4gICAgLy8gdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAocmVzdWx0LnBhdGhuYW1lIHx8IHJlc3VsdC5zZWFyY2gpIHtcbiAgICAgIHZhciBwID0gcmVzdWx0LnBhdGhuYW1lIHx8ICcnO1xuICAgICAgdmFyIHMgPSByZXN1bHQuc2VhcmNoIHx8ICcnO1xuICAgICAgcmVzdWx0LnBhdGggPSBwICsgcztcbiAgICB9XG4gICAgcmVzdWx0LnNsYXNoZXMgPSByZXN1bHQuc2xhc2hlcyB8fCByZWxhdGl2ZS5zbGFzaGVzO1xuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB2YXIgaXNTb3VyY2VBYnMgPSAocmVzdWx0LnBhdGhuYW1lICYmIHJlc3VsdC5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJyksXG4gICAgICBpc1JlbEFicyA9IChcbiAgICAgICAgICByZWxhdGl2ZS5ob3N0IHx8XG4gICAgICAgICAgcmVsYXRpdmUucGF0aG5hbWUgJiYgcmVsYXRpdmUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLydcbiAgICAgICksXG4gICAgICBtdXN0RW5kQWJzID0gKGlzUmVsQWJzIHx8IGlzU291cmNlQWJzIHx8XG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuaG9zdCAmJiByZWxhdGl2ZS5wYXRobmFtZSkpLFxuICAgICAgcmVtb3ZlQWxsRG90cyA9IG11c3RFbmRBYnMsXG4gICAgICBzcmNQYXRoID0gcmVzdWx0LnBhdGhuYW1lICYmIHJlc3VsdC5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcmVsUGF0aCA9IHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLnNwbGl0KCcvJykgfHwgW10sXG4gICAgICBwc3ljaG90aWMgPSByZXN1bHQucHJvdG9jb2wgJiYgIXNsYXNoZWRQcm90b2NvbFtyZXN1bHQucHJvdG9jb2xdO1xuXG4gIC8vIGlmIHRoZSB1cmwgaXMgYSBub24tc2xhc2hlZCB1cmwsIHRoZW4gcmVsYXRpdmVcbiAgLy8gbGlua3MgbGlrZSAuLi8uLiBzaG91bGQgYmUgYWJsZVxuICAvLyB0byBjcmF3bCB1cCB0byB0aGUgaG9zdG5hbWUsIGFzIHdlbGwuICBUaGlzIGlzIHN0cmFuZ2UuXG4gIC8vIHJlc3VsdC5wcm90b2NvbCBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSBub3cuXG4gIC8vIExhdGVyIG9uLCBwdXQgdGhlIGZpcnN0IHBhdGggcGFydCBpbnRvIHRoZSBob3N0IGZpZWxkLlxuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gJyc7XG4gICAgcmVzdWx0LnBvcnQgPSBudWxsO1xuICAgIGlmIChyZXN1bHQuaG9zdCkge1xuICAgICAgaWYgKHNyY1BhdGhbMF0gPT09ICcnKSBzcmNQYXRoWzBdID0gcmVzdWx0Lmhvc3Q7XG4gICAgICBlbHNlIHNyY1BhdGgudW5zaGlmdChyZXN1bHQuaG9zdCk7XG4gICAgfVxuICAgIHJlc3VsdC5ob3N0ID0gJyc7XG4gICAgaWYgKHJlbGF0aXZlLnByb3RvY29sKSB7XG4gICAgICByZWxhdGl2ZS5ob3N0bmFtZSA9IG51bGw7XG4gICAgICByZWxhdGl2ZS5wb3J0ID0gbnVsbDtcbiAgICAgIGlmIChyZWxhdGl2ZS5ob3N0KSB7XG4gICAgICAgIGlmIChyZWxQYXRoWzBdID09PSAnJykgcmVsUGF0aFswXSA9IHJlbGF0aXZlLmhvc3Q7XG4gICAgICAgIGVsc2UgcmVsUGF0aC51bnNoaWZ0KHJlbGF0aXZlLmhvc3QpO1xuICAgICAgfVxuICAgICAgcmVsYXRpdmUuaG9zdCA9IG51bGw7XG4gICAgfVxuICAgIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzICYmIChyZWxQYXRoWzBdID09PSAnJyB8fCBzcmNQYXRoWzBdID09PSAnJyk7XG4gIH1cblxuICBpZiAoaXNSZWxBYnMpIHtcbiAgICAvLyBpdCdzIGFic29sdXRlLlxuICAgIHJlc3VsdC5ob3N0ID0gKHJlbGF0aXZlLmhvc3QgfHwgcmVsYXRpdmUuaG9zdCA9PT0gJycpID9cbiAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3QgOiByZXN1bHQuaG9zdDtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSAocmVsYXRpdmUuaG9zdG5hbWUgfHwgcmVsYXRpdmUuaG9zdG5hbWUgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgOiByZXN1bHQuaG9zdG5hbWU7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICBzcmNQYXRoID0gcmVsUGF0aDtcbiAgICAvLyBmYWxsIHRocm91Z2ggdG8gdGhlIGRvdC1oYW5kbGluZyBiZWxvdy5cbiAgfSBlbHNlIGlmIChyZWxQYXRoLmxlbmd0aCkge1xuICAgIC8vIGl0J3MgcmVsYXRpdmVcbiAgICAvLyB0aHJvdyBhd2F5IHRoZSBleGlzdGluZyBmaWxlLCBhbmQgdGFrZSB0aGUgbmV3IHBhdGggaW5zdGVhZC5cbiAgICBpZiAoIXNyY1BhdGgpIHNyY1BhdGggPSBbXTtcbiAgICBzcmNQYXRoLnBvcCgpO1xuICAgIHNyY1BhdGggPSBzcmNQYXRoLmNvbmNhdChyZWxQYXRoKTtcbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICB9IGVsc2UgaWYgKCF1dGlsLmlzTnVsbE9yVW5kZWZpbmVkKHJlbGF0aXZlLnNlYXJjaCkpIHtcbiAgICAvLyBqdXN0IHB1bGwgb3V0IHRoZSBzZWFyY2guXG4gICAgLy8gbGlrZSBocmVmPSc/Zm9vJy5cbiAgICAvLyBQdXQgdGhpcyBhZnRlciB0aGUgb3RoZXIgdHdvIGNhc2VzIGJlY2F1c2UgaXQgc2ltcGxpZmllcyB0aGUgYm9vbGVhbnNcbiAgICBpZiAocHN5Y2hvdGljKSB7XG4gICAgICByZXN1bHQuaG9zdG5hbWUgPSByZXN1bHQuaG9zdCA9IHNyY1BhdGguc2hpZnQoKTtcbiAgICAgIC8vb2NjYXRpb25hbHkgdGhlIGF1dGggY2FuIGdldCBzdHVjayBvbmx5IGluIGhvc3RcbiAgICAgIC8vdGhpcyBlc3BlY2lhbGx5IGhhcHBlbnMgaW4gY2FzZXMgbGlrZVxuICAgICAgLy91cmwucmVzb2x2ZU9iamVjdCgnbWFpbHRvOmxvY2FsMUBkb21haW4xJywgJ2xvY2FsMkBkb21haW4yJylcbiAgICAgIHZhciBhdXRoSW5Ib3N0ID0gcmVzdWx0Lmhvc3QgJiYgcmVzdWx0Lmhvc3QuaW5kZXhPZignQCcpID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ob3N0LnNwbGl0KCdAJykgOiBmYWxzZTtcbiAgICAgIGlmIChhdXRoSW5Ib3N0KSB7XG4gICAgICAgIHJlc3VsdC5hdXRoID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgICByZXN1bHQuaG9zdCA9IHJlc3VsdC5ob3N0bmFtZSA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKCF1dGlsLmlzTnVsbChyZXN1bHQucGF0aG5hbWUpIHx8ICF1dGlsLmlzTnVsbChyZXN1bHQuc2VhcmNoKSkge1xuICAgICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5zZWFyY2ggPyByZXN1bHQuc2VhcmNoIDogJycpO1xuICAgIH1cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIC8vIG5vIHBhdGggYXQgYWxsLiAgZWFzeS5cbiAgICAvLyB3ZSd2ZSBhbHJlYWR5IGhhbmRsZWQgdGhlIG90aGVyIHN0dWZmIGFib3ZlLlxuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChyZXN1bHQuc2VhcmNoKSB7XG4gICAgICByZXN1bHQucGF0aCA9ICcvJyArIHJlc3VsdC5zZWFyY2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gbnVsbDtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGlmIGEgdXJsIEVORHMgaW4gLiBvciAuLiwgdGhlbiBpdCBtdXN0IGdldCBhIHRyYWlsaW5nIHNsYXNoLlxuICAvLyBob3dldmVyLCBpZiBpdCBlbmRzIGluIGFueXRoaW5nIGVsc2Ugbm9uLXNsYXNoeSxcbiAgLy8gdGhlbiBpdCBtdXN0IE5PVCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgdmFyIGxhc3QgPSBzcmNQYXRoLnNsaWNlKC0xKVswXTtcbiAgdmFyIGhhc1RyYWlsaW5nU2xhc2ggPSAoXG4gICAgICAocmVzdWx0Lmhvc3QgfHwgcmVsYXRpdmUuaG9zdCB8fCBzcmNQYXRoLmxlbmd0aCA+IDEpICYmXG4gICAgICAobGFzdCA9PT0gJy4nIHx8IGxhc3QgPT09ICcuLicpIHx8IGxhc3QgPT09ICcnKTtcblxuICAvLyBzdHJpcCBzaW5nbGUgZG90cywgcmVzb2x2ZSBkb3VibGUgZG90cyB0byBwYXJlbnQgZGlyXG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBzcmNQYXRoLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICBsYXN0ID0gc3JjUGF0aFtpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoIW11c3RFbmRBYnMgJiYgIXJlbW92ZUFsbERvdHMpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHNyY1BhdGgudW5zaGlmdCgnLi4nKTtcbiAgICB9XG4gIH1cblxuICBpZiAobXVzdEVuZEFicyAmJiBzcmNQYXRoWzBdICE9PSAnJyAmJlxuICAgICAgKCFzcmNQYXRoWzBdIHx8IHNyY1BhdGhbMF0uY2hhckF0KDApICE9PSAnLycpKSB7XG4gICAgc3JjUGF0aC51bnNoaWZ0KCcnKTtcbiAgfVxuXG4gIGlmIChoYXNUcmFpbGluZ1NsYXNoICYmIChzcmNQYXRoLmpvaW4oJy8nKS5zdWJzdHIoLTEpICE9PSAnLycpKSB7XG4gICAgc3JjUGF0aC5wdXNoKCcnKTtcbiAgfVxuXG4gIHZhciBpc0Fic29sdXRlID0gc3JjUGF0aFswXSA9PT0gJycgfHxcbiAgICAgIChzcmNQYXRoWzBdICYmIHNyY1BhdGhbMF0uY2hhckF0KDApID09PSAnLycpO1xuXG4gIC8vIHB1dCB0aGUgaG9zdCBiYWNrXG4gIGlmIChwc3ljaG90aWMpIHtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSByZXN1bHQuaG9zdCA9IGlzQWJzb2x1dGUgPyAnJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNQYXRoLmxlbmd0aCA/IHNyY1BhdGguc2hpZnQoKSA6ICcnO1xuICAgIC8vb2NjYXRpb25hbHkgdGhlIGF1dGggY2FuIGdldCBzdHVjayBvbmx5IGluIGhvc3RcbiAgICAvL3RoaXMgZXNwZWNpYWxseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuICAgIHZhciBhdXRoSW5Ib3N0ID0gcmVzdWx0Lmhvc3QgJiYgcmVzdWx0Lmhvc3QuaW5kZXhPZignQCcpID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgaWYgKGF1dGhJbkhvc3QpIHtcbiAgICAgIHJlc3VsdC5hdXRoID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgfVxuICB9XG5cbiAgbXVzdEVuZEFicyA9IG11c3RFbmRBYnMgfHwgKHJlc3VsdC5ob3N0ICYmIHNyY1BhdGgubGVuZ3RoKTtcblxuICBpZiAobXVzdEVuZEFicyAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoIXNyY1BhdGgubGVuZ3RoKSB7XG4gICAgcmVzdWx0LnBhdGhuYW1lID0gbnVsbDtcbiAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0LnBhdGhuYW1lID0gc3JjUGF0aC5qb2luKCcvJyk7XG4gIH1cblxuICAvL3RvIHN1cHBvcnQgcmVxdWVzdC5odHRwXG4gIGlmICghdXRpbC5pc051bGwocmVzdWx0LnBhdGhuYW1lKSB8fCAhdXRpbC5pc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICByZXN1bHQucGF0aCA9IChyZXN1bHQucGF0aG5hbWUgPyByZXN1bHQucGF0aG5hbWUgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHJlc3VsdC5zZWFyY2ggPyByZXN1bHQuc2VhcmNoIDogJycpO1xuICB9XG4gIHJlc3VsdC5hdXRoID0gcmVsYXRpdmUuYXV0aCB8fCByZXN1bHQuYXV0aDtcbiAgcmVzdWx0LnNsYXNoZXMgPSByZXN1bHQuc2xhc2hlcyB8fCByZWxhdGl2ZS5zbGFzaGVzO1xuICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblVybC5wcm90b3R5cGUucGFyc2VIb3N0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBob3N0ID0gdGhpcy5ob3N0O1xuICB2YXIgcG9ydCA9IHBvcnRQYXR0ZXJuLmV4ZWMoaG9zdCk7XG4gIGlmIChwb3J0KSB7XG4gICAgcG9ydCA9IHBvcnRbMF07XG4gICAgaWYgKHBvcnQgIT09ICc6Jykge1xuICAgICAgdGhpcy5wb3J0ID0gcG9ydC5zdWJzdHIoMSk7XG4gICAgfVxuICAgIGhvc3QgPSBob3N0LnN1YnN0cigwLCBob3N0Lmxlbmd0aCAtIHBvcnQubGVuZ3RoKTtcbiAgfVxuICBpZiAoaG9zdCkgdGhpcy5ob3N0bmFtZSA9IGhvc3Q7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNTdHJpbmc6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB0eXBlb2YoYXJnKSA9PT0gJ3N0cmluZyc7XG4gIH0sXG4gIGlzT2JqZWN0OiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gdHlwZW9mKGFyZykgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbiAgfSxcbiAgaXNOdWxsOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gYXJnID09PSBudWxsO1xuICB9LFxuICBpc051bGxPclVuZGVmaW5lZDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGFyZyA9PSBudWxsO1xuICB9XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsbnVsbCwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9pbmRleC50c1wiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==