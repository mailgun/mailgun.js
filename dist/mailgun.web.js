/*! mailgun.js v5.2.1 */
/*! mailgun.js v5.2.1 */
define(() => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

    return this.request.get("/v3/domains/".concat(domain)).then(function (res) {
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

  DomainClient.prototype.verify = function (domain) {
    var _this = this;

    return this.request.put("/v3/domains/".concat(domain, "/verify"), {}).then(function (res) {
      return _this._parseDomain(res);
    });
  };

  DomainClient.prototype.destroy = function (domain) {
    var _this = this;

    return this.request.delete("/v3/domains/".concat(domain)).then(function (res) {
      return _this._parseMessage(res);
    });
  };

  DomainClient.prototype.getConnection = function (domain) {
    return this.request.get("/v3/domains/".concat(domain, "/connection")).then(function (res) {
      return res;
    }).then(function (res) {
      return res.body.connection;
    });
  };

  DomainClient.prototype.updateConnection = function (domain, data) {
    return this.request.put("/v3/domains/".concat(domain, "/connection"), data).then(function (res) {
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
        statusText: 'Received boolean value for active property',
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

  DomainClient.prototype.updateDKIMAuthority = function (domain, data) {
    return this.request.put("/v3/domains/".concat(domain, "/dkim_authority"), {}, {
      query: "self=".concat(data.self)
    }).then(function (res) {
      return res;
    }).then(function (res) {
      return res.body;
    });
  };

  DomainClient.prototype.updateDKIMSelector = function (domain, data) {
    return this.request.put("/v3/domains/".concat(domain, "/dkim_selector"), {}, {
      query: "dkim_selector=".concat(data.dkimSelector)
    }).then(function (res) {
      return res;
    });
  };

  DomainClient.prototype.updateWebPrefix = function (domain, data) {
    return this.request.put("/v3/domains/".concat(domain, "/web_prefix"), {}, {
      query: "web_prefix=".concat(data.webPrefix)
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
    return url.split('/').pop() || '';
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
    return pages.reduce(function (acc, pair) {
      var id = pair[0];
      var url = pair[1];
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

/***/ "./lib/index.ts":
/*!**********************!*\
  !*** ./lib/index.ts ***!
  \**********************/
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

var client_1 = __importDefault(__webpack_require__(/*! ./client */ "./lib/client.ts"));

var Mailgun =
/** @class */
function () {
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
    return new client_1.default(options, this.formData);
  };

  return Mailgun;
}();

exports["default"] = Mailgun;

/***/ }),

/***/ "./lib/interfaces/Supressions.ts":
/*!***************************************!*\
  !*** ./lib/interfaces/Supressions.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SuppressionModels = void 0;
var SuppressionModels;

(function (SuppressionModels) {
  SuppressionModels["BOUNCES"] = "bounces";
  SuppressionModels["COMPLAINTS"] = "complaints";
  SuppressionModels["UNSUBSCRIBES"] = "unsubscribes";
  SuppressionModels["WHITELISTS"] = "whitelists";
})(SuppressionModels = exports.SuppressionModels || (exports.SuppressionModels = {}));

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
    return this.request.patchWithFD("/v1/ip_pools/".concat(poolId), data).then(function (response) {
      return response === null || response === void 0 ? void 0 : response.body;
    });
  };

  IpPoolsClient.prototype.delete = function (poolId, data) {
    return this.request.delete("/v1/ip_pools/".concat(poolId), data).then(function (response) {
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

    return this.request.get("/v3/ips/".concat(ip)).then(function (response) {
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

var ListsClient =
/** @class */
function () {
  function ListsClient(request, members) {
    this.request = request;
    this.baseRoute = '/v3/lists';
    this.members = members;
  }

  ListsClient.prototype.parseValidationResult = function (status, data) {
    return {
      status: status,
      validationResult: __assign(__assign({}, data), {
        created_at: new Date(data.created_at * 1000) // add millisecond to Unix timestamp

      })
    };
  };

  ListsClient.prototype.list = function (query) {
    return this.request.get("".concat(this.baseRoute, "/pages"), query).then(function (response) {
      return response.body.items;
    });
  };

  ListsClient.prototype.get = function (mailListAddress) {
    return this.request.get("".concat(this.baseRoute, "/").concat(mailListAddress)).then(function (response) {
      return response.body.list;
    });
  };

  ListsClient.prototype.create = function (data) {
    return this.request.postWithFD(this.baseRoute, data).then(function (response) {
      return response.body.list;
    });
  };

  ListsClient.prototype.update = function (mailListAddress, data) {
    return this.request.putWithFD("".concat(this.baseRoute, "/").concat(mailListAddress), data).then(function (response) {
      return response.body.list;
    });
  };

  ListsClient.prototype.destroy = function (mailListAddress) {
    return this.request.delete("".concat(this.baseRoute, "/").concat(mailListAddress)).then(function (response) {
      return response.body;
    });
  };

  ListsClient.prototype.validate = function (mailListAddress) {
    return this.request.post("".concat(this.baseRoute, "/").concat(mailListAddress, "/validate"), {}).then(function (response) {
      return __assign({
        status: response.status
      }, response.body);
    });
  };

  ListsClient.prototype.validationResult = function (mailListAddress) {
    var _this = this;

    return this.request.get("".concat(this.baseRoute, "/").concat(mailListAddress, "/validate")).then(function (response) {
      return _this.parseValidationResult(response.status, response.body);
    });
  };

  ListsClient.prototype.cancelValidation = function (mailListAddress) {
    return this.request.delete("".concat(this.baseRoute, "/").concat(mailListAddress, "/validate")).then(function (response) {
      return {
        status: response.status,
        message: response.body.message
      };
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
    return this.request.get("".concat(this.baseRoute, "/").concat(mailListAddress, "/members/pages"), query).then(function (response) {
      return response.body.items;
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
}();

exports["default"] = MailListsMembers;

/***/ }),

/***/ "./lib/messages.ts":
/*!*************************!*\
  !*** ./lib/messages.ts ***!
  \*************************/
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

var MessagesClient =
/** @class */
function () {
  function MessagesClient(request) {
    this.request = request;
  }

  MessagesClient.prototype._parseResponse = function (response) {
    return __assign({
      status: response.status
    }, response.body);
  };

  MessagesClient.prototype.create = function (domain, data) {
    if (data.message) {
      return this.request.postWithFD("/v3/".concat(domain, "/messages.mime"), data).then(this._parseResponse);
    }

    return this.request.postWithFD("/v3/".concat(domain, "/messages"), data).then(this._parseResponse);
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
    return this.request.get("/v4/address/validate/bulk/".concat(listId)).then(function (response) {
      return response.body;
    });
  };

  MultipleValidationClient.prototype.create = function (listId, file) {
    return this.request.postWithFD("/v4/address/validate/bulk/".concat(listId), file).then(function (response) {
      return response.body;
    });
  };

  MultipleValidationClient.prototype.destroy = function (listId) {
    return this.request.delete("/v4/address/validate/bulk/".concat(listId)).then(function (response) {
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

var base64 = __importStar(__webpack_require__(/*! base-64 */ "./node_modules/base-64/base64.js"));

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var ky_universal_1 = __importDefault(__webpack_require__(/*! ky-universal */ "./node_modules/ky-universal/browser.js"));

var error_1 = __importDefault(__webpack_require__(/*! ./error */ "./lib/error.ts"));

var isStream = function (data) {
  return typeof data === 'object' && typeof data.pipe === 'function';
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

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            options = __assign({}, inputOptions);
            basic = base64.encode("".concat(this.username, ":").concat(this.key));
            headers = __assign(__assign({
              Authorization: "Basic ".concat(basic)
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

            return [4
            /*yield*/
            , (0, ky_universal_1.default)((0, url_join_1.default)(this.url, url), __assign({
              method: method.toLocaleUpperCase(),
              headers: headers,
              throwHttpErrors: false,
              timeout: this.timeout
            }, params))];

          case 1:
            response = _b.sent();
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
            _a = _b.sent();
            return [3
            /*break*/
            , 5];

          case 3:
            return [4
            /*yield*/
            , response === null || response === void 0 ? void 0 : response.json()];

          case 4:
            _a = _b.sent();
            _b.label = 5;

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
            return [4
            /*yield*/
            , this.getResponseBody(response)];

          case 7:
            res = _b.sent();
            return [2
            /*return*/
            , res];
        }
      });
    });
  };

  Request.prototype.getResponseBody = function (response) {
    return __awaiter(this, void 0, void 0, function () {
      var res, responseString, jsonBody, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            res = {
              body: {},
              status: response === null || response === void 0 ? void 0 : response.status
            };
            responseString = '';
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3,, 4]);

            return [4
            /*yield*/
            , response.text()];

          case 2:
            responseString = _a.sent();
            jsonBody = JSON.parse(responseString);
            res.body = jsonBody;
            return [2
            /*return*/
            , res];

          case 3:
            error_2 = _a.sent();
            res.body = {
              message: responseString,
              status: 400
            };
            return [2
            /*return*/
            , res];

          case 4:
            return [2
            /*return*/
            ];
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
exports.WhiteList = exports.Unsubscribe = exports.Complaint = exports.Bounce = exports.Suppression = void 0;
/* eslint-disable camelcase */

var url_join_1 = __importDefault(__webpack_require__(/*! url-join */ "./node_modules/url-join/lib/url-join.js"));

var Supressions_1 = __webpack_require__(/*! ./interfaces/Supressions */ "./lib/interfaces/Supressions.ts");

var error_1 = __importDefault(__webpack_require__(/*! ./error */ "./lib/error.ts"));

var createOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

var Suppression =
/** @class */
function () {
  function Suppression(type) {
    this.type = type;
  }

  return Suppression;
}();

exports.Suppression = Suppression;

var Bounce =
/** @class */
function (_super) {
  __extends(Bounce, _super);

  function Bounce(data) {
    var _this = _super.call(this, Supressions_1.SuppressionModels.BOUNCES) || this;

    _this.address = data.address;
    _this.code = +data.code;
    _this.error = data.error;
    _this.created_at = new Date(data.created_at);
    return _this;
  }

  return Bounce;
}(Suppression);

exports.Bounce = Bounce;

var Complaint =
/** @class */
function (_super) {
  __extends(Complaint, _super);

  function Complaint(data) {
    var _this = _super.call(this, Supressions_1.SuppressionModels.COMPLAINTS) || this;

    _this.address = data.address;
    _this.created_at = new Date(data.created_at);
    return _this;
  }

  return Complaint;
}(Suppression);

exports.Complaint = Complaint;

var Unsubscribe =
/** @class */
function (_super) {
  __extends(Unsubscribe, _super);

  function Unsubscribe(data) {
    var _this = _super.call(this, Supressions_1.SuppressionModels.UNSUBSCRIBES) || this;

    _this.address = data.address;
    _this.tags = data.tags;
    _this.created_at = new Date(data.created_at);
    return _this;
  }

  return Unsubscribe;
}(Suppression);

exports.Unsubscribe = Unsubscribe;

var WhiteList =
/** @class */
function (_super) {
  __extends(WhiteList, _super);

  function WhiteList(data) {
    var _this = _super.call(this, Supressions_1.SuppressionModels.WHITELISTS) || this;

    _this.value = data.value;
    _this.reason = data.reason;
    _this.createdAt = new Date(data.createdAt);
    return _this;
  }

  return WhiteList;
}(Suppression);

exports.WhiteList = WhiteList;

var SuppressionClient =
/** @class */
function () {
  function SuppressionClient(request) {
    this.request = request;
    this.models = new Map();
    this.models.set('bounces', Bounce);
    this.models.set('complaints', Complaint);
    this.models.set('unsubscribes', Unsubscribe);
    this.models.set('whitelists', WhiteList);
  }

  SuppressionClient.prototype._parsePage = function (id, pageUrl) {
    var parsedUrl = new URL(pageUrl);
    var searchParams = parsedUrl.searchParams;
    return {
      id: id,
      page: searchParams.has('page') ? searchParams.get('page') : undefined,
      address: searchParams.has('address') ? searchParams.get('address') : undefined,
      url: pageUrl
    };
  };

  SuppressionClient.prototype._parsePageLinks = function (response) {
    var _this = this;

    var pages = Object.entries(response.body.paging);
    return pages.reduce(function (acc, pair) {
      var id = pair[0];
      var pageUrl = pair[1];
      acc[id] = _this._parsePage(id, pageUrl);
      return acc;
    }, {});
  };

  SuppressionClient.prototype._parseList = function (response, Model) {
    var data = {};
    data.items = response.body.items.map(function (item) {
      return new Model(item);
    });
    data.pages = this._parsePageLinks(response);
    return data;
  };

  SuppressionClient.prototype._parseItem = function (data, Model) {
    return new Model(data);
  };

  SuppressionClient.prototype.createWhiteList = function (domain, data) {
    if (Array.isArray(data)) {
      throw new error_1.default({
        status: 400,
        statusText: 'Data property should be an object',
        body: {
          message: 'Whitelist\'s creation process does not support multiple creations. Data property should be an object'
        }
      });
    }

    return this.request.postWithFD((0, url_join_1.default)('v3', domain, 'whitelists'), data).then(this.prepareResponse);
  };

  SuppressionClient.prototype.checkType = function (type) {
    if (!this.models.has(type)) {
      throw new error_1.default({
        status: 400,
        statusText: 'Unknown type value',
        body: {
          message: 'Type may be only one of [bounces, complaints, unsubscribes, whitelists]'
        }
      });
    }
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
    var _this = this;

    this.checkType(type);
    var model = this.models.get(type);
    return this.request.get((0, url_join_1.default)('v3', domain, type), query).then(function (response) {
      return _this._parseList(response, model);
    });
  };

  SuppressionClient.prototype.get = function (domain, type, address) {
    var _this = this;

    this.checkType(type);
    var model = this.models.get(type);
    return this.request.get((0, url_join_1.default)('v3', domain, type, encodeURIComponent(address))).then(function (response) {
      return _this._parseItem(response.body, model);
    });
  };

  SuppressionClient.prototype.create = function (domain, type, data) {
    this.checkType(type); // supports adding multiple suppressions by default

    var postData;

    if (type === 'whitelists') {
      return this.createWhiteList(domain, data);
    }

    if (!Array.isArray(data)) {
      postData = [data];
    } else {
      postData = __spreadArray([], data, true);
    }

    return this.request.post((0, url_join_1.default)('v3', domain, type), JSON.stringify(postData), createOptions).then(this.prepareResponse);
  };

  SuppressionClient.prototype.destroy = function (domain, type, address) {
    this.checkType(type);
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
        url = (webhookResponse === null || webhookResponse === void 0 ? void 0 : webhookResponse.urls) && webhookResponse.urls.length ? webhookResponse.urls[0] : undefined;
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
/******/ 	var __webpack_exports__ = __webpack_require__("./lib/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQseUJBQXlCO0FBQzlFOztBQUVBO0FBQ0E7QUFDQSwwRUFBMEUsZUFBZTtBQUN6Rjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLDRDQUE0QztBQUN0RTs7QUFFQTtBQUNBLGFBQWEsYUFBYTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0NBQXNDO0FBQ2pFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzRkFBc0YsT0FBTztBQUM3Rjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsZ0JBQWdCLEVBQUM7Ozs7Ozs7Ozs7O0FDL2dCaEM7QUFDQSxNQUFNLEtBQTZCO0FBQ25DLFdBQVcsSUFBMEMsRUFBRSxvQ0FBTyxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0dBQUM7QUFDekUsT0FBTyxFQUE2QjtBQUNwQyxDQUFDOztBQUVEO0FBQ0E7QUFDQSxpQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBLG9CQUFvQixxQkFBcUI7QUFDekM7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7VUM3RUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztVRUpBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9kb21haW5zLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvZG9tYWluc0NyZWRlbnRpYWxzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvZG9tYWluc1RhZ3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9kb21haW5zVGVtcGxhdGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvZXJyb3IudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL2ludGVyZmFjZXMvU3VwcmVzc2lvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9pcC1wb29scy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL2lwcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL2xpc3RzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvbWFpbExpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvbWVzc2FnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9tdWx0aXBsZVZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9yZXF1ZXN0LnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvcm91dGVzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9saWIvc3RhdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi9zdXBwcmVzc2lvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL2xpYi92YWxpZGF0ZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbGliL3dlYmhvb2tzLnRzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy8uL25vZGVfbW9kdWxlcy9reS11bml2ZXJzYWwvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzLy4vbm9kZV9tb2R1bGVzL2t5L2luZGV4LmpzIiwid2VicGFjazovL21haWxndW4uanMvLi9ub2RlX21vZHVsZXMvdXJsLWpvaW4vbGliL3VybC1qb2luLmpzIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFpbGd1bi5qcy93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL21haWxndW4uanMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuLmpzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvT3B0aW9ucyc7XG5pbXBvcnQgUmVxdWVzdE9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL1JlcXVlc3RPcHRpb25zJztcblxuaW1wb3J0IERvbWFpbkNsaWVudCBmcm9tICcuL2RvbWFpbnMnO1xuaW1wb3J0IEV2ZW50Q2xpZW50IGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCBTdGF0c0NsaWVudCBmcm9tICcuL3N0YXRzJztcbmltcG9ydCBTdXBwcmVzc2lvbkNsaWVudCBmcm9tICcuL3N1cHByZXNzaW9ucyc7XG5pbXBvcnQgV2ViaG9va0NsaWVudCBmcm9tICcuL3dlYmhvb2tzJztcbmltcG9ydCBNZXNzYWdlc0NsaWVudCBmcm9tICcuL21lc3NhZ2VzJztcbmltcG9ydCBSb3V0ZXNDbGllbnQgZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IFZhbGlkYXRlQ2xpZW50IGZyb20gJy4vdmFsaWRhdGUnO1xuaW1wb3J0IElwc0NsaWVudCBmcm9tICcuL2lwcyc7XG5pbXBvcnQgSXBQb29sc0NsaWVudCBmcm9tICcuL2lwLXBvb2xzJztcbmltcG9ydCBMaXN0c0NsaWVudCBmcm9tICcuL2xpc3RzJztcbmltcG9ydCBNYWlsTGlzdHNNZW1iZXJzIGZyb20gJy4vbWFpbExpc3RNZW1iZXJzJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvSUZvcm1EYXRhJztcbmltcG9ydCBEb21haW5DcmVkZW50aWFsc0NsaWVudCBmcm9tICcuL2RvbWFpbnNDcmVkZW50aWFscyc7XG5pbXBvcnQgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGZyb20gJy4vbXVsdGlwbGVWYWxpZGF0aW9uJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9kb21haW5zVGVtcGxhdGVzJztcbmltcG9ydCBEb21haW5UYWdzQ2xpZW50IGZyb20gJy4vZG9tYWluc1RhZ3MnO1xuaW1wb3J0IHsgSU1haWxndW5DbGllbnQgfSBmcm9tICcuL2ludGVyZmFjZXMvSU1haWxndW5DbGllbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnQgaW1wbGVtZW50cyBJTWFpbGd1bkNsaWVudCB7XG4gIHByaXZhdGUgcmVxdWVzdDtcblxuICBwdWJsaWMgZG9tYWlucztcbiAgcHVibGljIHdlYmhvb2tzO1xuICBwdWJsaWMgZXZlbnRzO1xuICBwdWJsaWMgc3RhdHM7XG4gIHB1YmxpYyBzdXBwcmVzc2lvbnM7XG4gIHB1YmxpYyBtZXNzYWdlcztcbiAgcHVibGljIHJvdXRlcztcbiAgcHVibGljIHZhbGlkYXRlO1xuICBwdWJsaWMgaXBzO1xuICBwdWJsaWMgaXBfcG9vbHM7XG4gIHB1YmxpYyBsaXN0cztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPcHRpb25zLCBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIGNvbnN0IGNvbmZpZzogUmVxdWVzdE9wdGlvbnMgPSB7IC4uLm9wdGlvbnMgfSBhcyBSZXF1ZXN0T3B0aW9ucztcblxuICAgIGlmICghY29uZmlnLnVybCkge1xuICAgICAgY29uZmlnLnVybCA9ICdodHRwczovL2FwaS5tYWlsZ3VuLm5ldCc7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcudXNlcm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwidXNlcm5hbWVcIiBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJrZXlcIiBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICB0aGlzLnJlcXVlc3QgPSBuZXcgUmVxdWVzdChjb25maWcsIGZvcm1EYXRhKTtcbiAgICBjb25zdCBtYWlsTGlzdHNNZW1iZXJzID0gbmV3IE1haWxMaXN0c01lbWJlcnModGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5DcmVkZW50aWFsc0NsaWVudCA9IG5ldyBEb21haW5DcmVkZW50aWFsc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpblRlbXBsYXRlc0NsaWVudCA9IG5ldyBEb21haW5UZW1wbGF0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5UYWdzQ2xpZW50ID0gbmV3IERvbWFpblRhZ3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgPSBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG5cbiAgICB0aGlzLmRvbWFpbnMgPSBuZXcgRG9tYWluQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0LFxuICAgICAgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgICBkb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgICBkb21haW5UYWdzQ2xpZW50XG4gICAgKTtcbiAgICB0aGlzLndlYmhvb2tzID0gbmV3IFdlYmhvb2tDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudENsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnN1cHByZXNzaW9ucyA9IG5ldyBTdXBwcmVzc2lvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMubWVzc2FnZXMgPSBuZXcgTWVzc2FnZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnJvdXRlcyA9IG5ldyBSb3V0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmlwcyA9IG5ldyBJcHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmlwX3Bvb2xzID0gbmV3IElwUG9vbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmxpc3RzID0gbmV3IExpc3RzQ2xpZW50KHRoaXMucmVxdWVzdCwgbWFpbExpc3RzTWVtYmVycyk7XG4gICAgdGhpcy52YWxpZGF0ZSA9IG5ldyBWYWxpZGF0ZUNsaWVudCh0aGlzLnJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHtcbiAgRG9tYWluUmVzcG9uc2VEYXRhLFxuICBEZXN0cm95ZWREb21haW5SZXNwb25zZSxcbiAgRG9tYWluc1F1ZXJ5LFxuICBEb21haW5JbmZvLFxuICBEb21haW5MaXN0UmVzcG9uc2VEYXRhLFxuICBEb21haW5TaG9ydERhdGEsXG4gIEROU1JlY29yZCxcbiAgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UsXG4gIENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcyxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlLFxuICBES0lNU2VsZWN0b3JJbmZvLFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFdlYlByZWZpeEluZm8sXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgUmVwbGFjZW1lbnRGb3JQb29sLFxuICBNZXNzYWdlUmVzcG9uc2UsXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5zJztcblxuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgRG9tYWluVHJhY2tpbmdSZXNwb25zZSxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIFVwZGF0ZWRPcGVuVHJhY2tpbmdcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRyYWNraW5nJztcbmltcG9ydCB7IElEb21haW5DcmVkZW50aWFscyB9IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5DcmVkZW50aWFscyc7XG5pbXBvcnQgeyBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRlbXBsYXRlcyc7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9kb21haW5zQ3JlZGVudGlhbHMnO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IHsgSURvbWFpblRhZ3NDbGllbnQgfSBmcm9tICcuL2ludGVyZmFjZXMvRG9tYWluVGFncyc7XG5pbXBvcnQgRG9tYWluVGFnc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUYWdzJztcblxuZXhwb3J0IGNsYXNzIERvbWFpbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xuICBzdGF0ZTogc3RyaW5nO1xuICB3aWxkY2FyZDogYm9vbGVhbjtcbiAgc3BhbV9hY3Rpb246IHN0cmluZztcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICBzbXRwX3Bhc3N3b3JkOiBzdHJpbmc7XG4gIHNtdHBfbG9naW46IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICByZWNlaXZpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgc2VuZGluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IERvbWFpblNob3J0RGF0YSwgcmVjZWl2aW5nPzogRE5TUmVjb3JkW10gfCBudWxsLCBzZW5kaW5nPzogRE5TUmVjb3JkW10gfCBudWxsKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMucmVxdWlyZV90bHMgPSBkYXRhLnJlcXVpcmVfdGxzO1xuICAgIHRoaXMuc2tpcF92ZXJpZmljYXRpb24gPSBkYXRhLnNraXBfdmVyaWZpY2F0aW9uO1xuICAgIHRoaXMuc3RhdGUgPSBkYXRhLnN0YXRlO1xuICAgIHRoaXMud2lsZGNhcmQgPSBkYXRhLndpbGRjYXJkO1xuICAgIHRoaXMuc3BhbV9hY3Rpb24gPSBkYXRhLnNwYW1fYWN0aW9uO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IGRhdGEuY3JlYXRlZF9hdDtcbiAgICB0aGlzLnNtdHBfcGFzc3dvcmQgPSBkYXRhLnNtdHBfcGFzc3dvcmQ7XG4gICAgdGhpcy5zbXRwX2xvZ2luID0gZGF0YS5zbXRwX2xvZ2luO1xuICAgIHRoaXMudHlwZSA9IGRhdGEudHlwZTtcblxuICAgIHRoaXMucmVjZWl2aW5nX2Ruc19yZWNvcmRzID0gcmVjZWl2aW5nIHx8IG51bGw7XG4gICAgdGhpcy5zZW5kaW5nX2Ruc19yZWNvcmRzID0gc2VuZGluZyB8fCBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHB1YmxpYyBkb21haW5DcmVkZW50aWFsczogSURvbWFpbkNyZWRlbnRpYWxzO1xuICBwdWJsaWMgZG9tYWluVGVtcGxhdGVzOiBJRG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuICBwdWJsaWMgZG9tYWluVGFnczogSURvbWFpblRhZ3NDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBkb21haW5DcmVkZW50aWFsc0NsaWVudDogRG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgZG9tYWluVGVtcGxhdGVzQ2xpZW50OiBEb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgZG9tYWluVGFnc0NsaWVudDogRG9tYWluVGFnc0NsaWVudFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuZG9tYWluQ3JlZGVudGlhbHMgPSBkb21haW5DcmVkZW50aWFsc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRlbXBsYXRlcyA9IGRvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRhZ3MgPSBkb21haW5UYWdzQ2xpZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlKHJlc3BvbnNlOiBEZXN0cm95ZWREb21haW5SZXNwb25zZSkgOiBNZXNzYWdlUmVzcG9uc2Uge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW5MaXN0KHJlc3BvbnNlOiBEb21haW5MaXN0UmVzcG9uc2VEYXRhKTogRG9tYWluW10ge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIG5ldyBEb21haW4oaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURvbWFpbihyZXNwb25zZTogRG9tYWluUmVzcG9uc2VEYXRhKTogRG9tYWluIHtcbiAgICByZXR1cm4gbmV3IERvbWFpbihcbiAgICAgIHJlc3BvbnNlLmJvZHkuZG9tYWluLFxuICAgICAgcmVzcG9uc2UuYm9keS5yZWNlaXZpbmdfZG5zX3JlY29yZHMsXG4gICAgICByZXNwb25zZS5ib2R5LnNlbmRpbmdfZG5zX3JlY29yZHNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1NldHRpbmdzKHJlc3BvbnNlOiBEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6IERvbWFpblRyYWNraW5nRGF0YSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkudHJhY2tpbmc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRyYWNraW5nVXBkYXRlKHJlc3BvbnNlOiBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6VXBkYXRlZE9wZW5UcmFja2luZyB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogRG9tYWluc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5bXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvZG9tYWlucycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkxpc3QocmVzIGFzIERvbWFpbkxpc3RSZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogRG9tYWluSW5mbykgOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIGNvbnN0IHBvc3RPYmogPSB7IC4uLmRhdGEgfTtcbiAgICBpZiAoJ2ZvcmNlX2RraW1fYXV0aG9yaXR5JyBpbiBwb3N0T2JqICYmIHR5cGVvZiBwb3N0T2JqLmZvcmNlX2RraW1fYXV0aG9yaXR5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHBvc3RPYmouZm9yY2VfZGtpbV9hdXRob3JpdHkgPSBwb3N0T2JqLnRvU3RyaW5nKCkgPT09ICd0cnVlJyA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvZG9tYWlucycsIHBvc3RPYmopXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIHZlcmlmeShkb21haW46IHN0cmluZyk6IFByb21pc2U8RG9tYWluPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS92ZXJpZnlgLCB7fSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW4ocmVzIGFzIERvbWFpblJlc3BvbnNlRGF0YSkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZyk6IFByb21pc2U8TWVzc2FnZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92My9kb21haW5zLyR7ZG9tYWlufWApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZShyZXMgYXMgRGVzdHJveWVkRG9tYWluUmVzcG9uc2UpKTtcbiAgfVxuXG4gIGdldENvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPENvbm5lY3Rpb25TZXR0aW5ncz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vY29ubmVjdGlvbmApXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBDb25uZWN0aW9uU2V0dGluZ3NSZXNwb25zZSlcbiAgICAgIC50aGVuKChyZXM6Q29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UpID0+IHJlcy5ib2R5LmNvbm5lY3Rpb24gYXMgQ29ubmVjdGlvblNldHRpbmdzKTtcbiAgfVxuXG4gIHVwZGF0ZUNvbm5lY3Rpb24oZG9tYWluOiBzdHJpbmcsIGRhdGE6IENvbm5lY3Rpb25TZXR0aW5ncyk6IFByb21pc2U8VXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn0vY29ubmVjdGlvbmAsIGRhdGEpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzKVxuICAgICAgLnRoZW4oKHJlczpVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzUmVzKSA9PiByZXMuYm9keSBhcyBVcGRhdGVkQ29ubmVjdGlvblNldHRpbmdzKTtcbiAgfVxuXG4gIC8vIFRyYWNraW5nXG5cbiAgZ2V0VHJhY2tpbmcoZG9tYWluOiBzdHJpbmcpIDogUHJvbWlzZTxEb21haW5UcmFja2luZ0RhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJykpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVRyYWNraW5nU2V0dGluZ3MpO1xuICB9XG5cbiAgdXBkYXRlVHJhY2tpbmcoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IE9wZW5UcmFja2luZ0luZm8gfCBDbGlja1RyYWNraW5nSW5mbyB8IFVuc3Vic2NyaWJlVHJhY2tpbmdJbmZvXG4gICk6IFByb21pc2U8VXBkYXRlZE9wZW5UcmFja2luZz4ge1xuICAgIGlmICh0eXBlb2YgZGF0YT8uYWN0aXZlID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7IHN0YXR1czogNDAwLCBzdGF0dXNUZXh0OiAnUmVjZWl2ZWQgYm9vbGVhbiB2YWx1ZSBmb3IgYWN0aXZlIHByb3BlcnR5JywgYm9keTogeyBtZXNzYWdlOiAnUHJvcGVydHkgXCJhY3RpdmVcIiBtdXN0IGNvbnRhaW4gc3RyaW5nIHZhbHVlLicgfSB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAndHJhY2tpbmcnLCB0eXBlKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VUcmFja2luZ1VwZGF0ZShyZXMgYXMgVXBkYXRlRG9tYWluVHJhY2tpbmdSZXNwb25zZSkpO1xuICB9XG5cbiAgLy8gSVBzXG5cbiAgZ2V0SXBzKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJykpXG4gICAgICAudGhlbigocmVzcG9uc2U6IEFQSVJlc3BvbnNlKSA9PiByZXNwb25zZT8uYm9keT8uaXRlbXMpO1xuICB9XG5cbiAgYXNzaWduSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgaXAgfSk7XG4gIH1cblxuICBkZWxldGVJcChkb21haW46IHN0cmluZywgaXA6IHN0cmluZyk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsIGlwKSk7XG4gIH1cblxuICBsaW5rSXBQb29sKGRvbWFpbjogc3RyaW5nLCBwb29sX2lkOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnaXBzJyksIHsgcG9vbF9pZCB9KTtcbiAgfVxuXG4gIHVubGlua0lwUG9sbChkb21haW46IHN0cmluZywgcmVwbGFjZW1lbnQ6IFJlcGxhY2VtZW50Rm9yUG9vbCk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gJyc7XG4gICAgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQgJiYgcmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcihcbiAgICAgICAge1xuICAgICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICAgIHN0YXR1c1RleHQ6ICdUb28gbXVjaCBkYXRhIGZvciByZXBsYWNlbWVudCcsXG4gICAgICAgICAgYm9keTogeyBtZXNzYWdlOiAnUGxlYXNlIHNwZWNpZnkgZWl0aGVyIHBvb2xfaWQgb3IgaXAgKG5vdCBib3RoKScgfVxuICAgICAgICB9IGFzIEFQSUVycm9yT3B0aW9uc1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LnBvb2xfaWQpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/cG9vbF9pZD0ke3JlcGxhY2VtZW50LnBvb2xfaWR9YDtcbiAgICB9IGVsc2UgaWYgKHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICBzZWFyY2hQYXJhbXMgPSBgP2lwPSR7cmVwbGFjZW1lbnQuaXB9YDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCAnaXBfcG9vbCcsIHNlYXJjaFBhcmFtcykpO1xuICB9XG5cbiAgdXBkYXRlREtJTUF1dGhvcml0eShkb21haW46IHN0cmluZywgZGF0YTogREtJTUF1dGhvcml0eUluZm8pOiBQcm9taXNlPFVwZGF0ZWRES0lNQXV0aG9yaXR5PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX2F1dGhvcml0eWAsIHt9LCB7IHF1ZXJ5OiBgc2VsZj0ke2RhdGEuc2VsZn1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlcyA6IFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5KTtcbiAgfVxuXG4gIHVwZGF0ZURLSU1TZWxlY3Rvcihkb21haW46IHN0cmluZywgZGF0YTogREtJTVNlbGVjdG9ySW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS9ka2ltX3NlbGVjdG9yYCwge30sIHsgcXVlcnk6IGBka2ltX3NlbGVjdG9yPSR7ZGF0YS5ka2ltU2VsZWN0b3J9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZERLSU1TZWxlY3RvclJlc3BvbnNlKTtcbiAgfVxuXG4gIHVwZGF0ZVdlYlByZWZpeChkb21haW46IHN0cmluZywgZGF0YTogV2ViUHJlZml4SW5mbyk6IFByb21pc2U8VXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQoYC92My9kb21haW5zLyR7ZG9tYWlufS93ZWJfcHJlZml4YCwge30sIHsgcXVlcnk6IGB3ZWJfcHJlZml4PSR7ZGF0YS53ZWJQcmVmaXh9YCB9KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZFdlYlByZWZpeFJlc3BvbnNlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBDcmVhdGVkVXBkYXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UsXG4gIERlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlLFxuICBEb21haW5DcmVkZW50aWFscyxcbiAgRG9tYWluQ3JlZGVudGlhbHNMaXN0LFxuICBEb21haW5DcmVkZW50aWFsc1F1ZXJ5LFxuICBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSxcbiAgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQsXG4gIElEb21haW5DcmVkZW50aWFscyxcbiAgVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5DcmVkZW50aWFscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IGltcGxlbWVudHMgSURvbWFpbkNyZWRlbnRpYWxzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2RvbWFpbnMvJztcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KFxuICAgIHJlc3BvbnNlOiBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YVxuICApOiBEb21haW5DcmVkZW50aWFsc0xpc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHRvdGFsQ291bnQ6IHJlc3BvbnNlLmJvZHkudG90YWxfY291bnRcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlUmVzcG9uc2UoXG4gICAgcmVzcG9uc2U6IENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2VcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURlbGV0ZWRSZXNwb25zZShcbiAgICByZXNwb25zZTpEZWxldGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZVxuICApOiBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICBzcGVjOiByZXNwb25zZS5ib2R5LnNwZWNcbiAgICB9IGFzIERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0O1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluQ3JlZGVudGlhbHNRdWVyeSk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL2NyZWRlbnRpYWxzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdChyZXMgYXMgRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZURhdGEpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpbkNyZWRlbnRpYWxzXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzYCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBjcmVkZW50aWFsc0xvZ2luOiBzdHJpbmcsXG4gICAgZGF0YTogVXBkYXRlRG9tYWluQ3JlZGVudGlhbHNEYXRhXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VNZXNzYWdlUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L2NyZWRlbnRpYWxzLyR7Y3JlZGVudGlhbHNMb2dpbn1gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRGVsZXRlZFJlc3BvbnNlKHJlcykpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJUmVzcG9uc2UgZnJvbSAnLi9pbnRlcmZhY2VzL0FwaVJlc3BvbnNlJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtLFxuICBEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlLFxuICBEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbixcbiAgRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ3NJdGVtLFxuICBEb21haW5UYWdzSXRlbUluZm8sXG4gIERvbWFpblRhZ3NMaXN0LFxuICBEb21haW5UYWdzTWVzc2FnZVJlcyxcbiAgRG9tYWluVGFnc1F1ZXJ5LFxuICBEb21haW5UYWdzUmVzcG9uc2VEYXRhLFxuICBEb21haW5UYWdzU3RhdGlzdGljUXVlcnksXG4gIERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnU3RhdGlzdGljSXRlbSxcbiAgRG9tYWluVGFnU3RhdGlzdGljUmVzdWx0LFxuICBJRG9tYWluVGFnc0NsaWVudCxcbiAgUGFnZXNMaXN0LFxuICBQYWdlc0xpc3RBY2N1bXVsYXRvcixcbiAgUGFyc2VkUGFnZXNMaXN0LFxuICBSZXNvbHV0aW9uXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5UYWdzJztcblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZyBpbXBsZW1lbnRzIERvbWFpblRhZ3NJdGVtIHtcbiAgdGFnOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICdmaXJzdC1zZWVuJzogRGF0ZTtcbiAgJ2xhc3Qtc2Vlbic6IERhdGU7XG5cbiAgY29uc3RydWN0b3IodGFnSW5mbzogRG9tYWluVGFnc0l0ZW1JbmZvKSB7XG4gICAgdGhpcy50YWcgPSB0YWdJbmZvLnRhZztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnSW5mby5kZXNjcmlwdGlvbjtcbiAgICB0aGlzWydmaXJzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydmaXJzdC1zZWVuJ10pO1xuICAgIHRoaXNbJ2xhc3Qtc2VlbiddID0gbmV3IERhdGUodGFnSW5mb1snbGFzdC1zZWVuJ10pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UYWdTdGF0aXN0aWMgaW1wbGVtZW50cyBEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQge1xuICB0YWc6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgc3RhcnQ6IERhdGU7XG4gIGVuZDogRGF0ZTtcbiAgcmVzb2x1dGlvbjogUmVzb2x1dGlvbjtcbiAgc3RhdHM6IERvbWFpblRhZ1N0YXRpc3RpY0l0ZW1bXTtcblxuICBjb25zdHJ1Y3Rvcih0YWdTdGF0aXN0aWNJbmZvOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2UpIHtcbiAgICB0aGlzLnRhZyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS50YWc7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LnN0YXJ0KTtcbiAgICB0aGlzLmVuZCA9IG5ldyBEYXRlKHRhZ1N0YXRpc3RpY0luZm8uYm9keS5lbmQpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5yZXNvbHV0aW9uO1xuICAgIHRoaXMuc3RhdHMgPSB0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhdHMubWFwKGZ1bmN0aW9uIChzdGF0OiBEb21haW5UYWdBUElSZXNwb25zZVN0YXRzSXRlbSkge1xuICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0LCB0aW1lOiBuZXcgRGF0ZShzdGF0LnRpbWUpIH07XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpblRhZ3NDbGllbnQgaW1wbGVtZW50cyBJRG9tYWluVGFnc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VQYWdlTGlua3MocmVzcG9uc2U6IERvbWFpblRhZ3NSZXNwb25zZURhdGEpOiBQYXJzZWRQYWdlc0xpc3Qge1xuICAgIGNvbnN0IHBhZ2VzID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuYm9keS5wYWdpbmcgYXMgUGFnZXNMaXN0KTtcbiAgICByZXR1cm4gcGFnZXMucmVkdWNlKFxuICAgICAgKGFjYzogUGFnZXNMaXN0QWNjdW11bGF0b3IsIGVudHJpZTogW3VybDogc3RyaW5nLCBpZDogc3RyaW5nXSkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IGVudHJpZVswXTtcbiAgICAgICAgY29uc3QgdXJsID0gZW50cmllWzFdO1xuICAgICAgICBhY2NbaWRdID0ge1xuICAgICAgICAgIGlkLFxuICAgICAgICAgIHVybFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge31cbiAgICApIGFzIHVua25vd24gYXMgUGFyc2VkUGFnZXNMaXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW5UYWdzTGlzdChcbiAgICByZXNwb25zZTogRG9tYWluVGFnc1Jlc3BvbnNlRGF0YVxuICApOiBEb21haW5UYWdzTGlzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgodGFnSW5mbykgPT4gbmV3IERvbWFpblRhZyh0YWdJbmZvKSksXG4gICAgICBwYWdlczogdGhpcy5fcGFyc2VQYWdlTGlua3MocmVzcG9uc2UpXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlVGFnU3RhdGlzdGljKFxuICAgIHJlc3BvbnNlOiBEb21haW5UYWdTdGF0QVBJUmVzcG9uc2VcbiAgKTogRG9tYWluVGFnU3RhdGlzdGljIHtcbiAgICByZXR1cm4gbmV3IERvbWFpblRhZ1N0YXRpc3RpYyhyZXNwb25zZSk7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRhZ3NRdWVyeSk6IFByb21pc2U8RG9tYWluVGFnc0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEb21haW5UYWdzTGlzdChyZXMgYXMgRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSlcbiAgICAgICk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRhZyhyZXMuYm9keSlcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdzTWVzc2FnZVJlcz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnKSwgZGVzY3JpcHRpb24pXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzXG4gICAgICApO1xuICB9XG5cbiAgZGVzdHJveShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYCR7dGhpcy5iYXNlUm91dGV9JHtkb21haW59L3RhZ3MvJHt0YWd9YClcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiAoXG4gICAgICAgIHtcbiAgICAgICAgICBtZXNzYWdlOiByZXMuYm9keS5tZXNzYWdlLFxuICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1c1xuICAgICAgICB9IGFzIERvbWFpblRhZ3NNZXNzYWdlUmVzKSk7XG4gIH1cblxuICBzdGF0aXN0aWMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nLCBxdWVyeTogRG9tYWluVGFnc1N0YXRpc3RpY1F1ZXJ5KVxuICAgIDogUHJvbWlzZTxEb21haW5UYWdTdGF0aXN0aWM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZVRhZ1N0YXRpc3RpYyhyZXMpXG4gICAgICApO1xuICB9XG5cbiAgY291bnRyaWVzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvY291bnRyaWVzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnQ291bnRyaWVzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgcHJvdmlkZXJzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGFncycsIHRhZywgJ3N0YXRzL2FnZ3JlZ2F0ZXMvcHJvdmlkZXJzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnUHJvdmlkZXJzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uXG4gICAgICApO1xuICB9XG5cbiAgZGV2aWNlcyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9kZXZpY2VzJykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogRG9tYWluVGFnRGV2aWNlc0FQSVJlc3BvbnNlKSA9PiByZXMuYm9keSBhcyBEb21haW5UYWdEZXZpY2VzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgRG9tYWluVGVtcGxhdGUsIERvbWFpblRlbXBsYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVzUXVlcnksXG4gIERvbWFpblRlbXBsYXRlVXBkYXRlRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVWZXJzaW9uRGF0YSxcbiAgRG9tYWluVGVtcGxhdGVWZXJzaW9uRGF0YSxcbiAgR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSxcbiAgSURvbWFpblRlbXBsYXRlc0NsaWVudCxcbiAgTGlzdERvbWFpblRlbXBsYXRlc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0LFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc0FQSVJlc3BvbnNlLFxuICBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UsXG4gIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCxcbiAgTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UsXG4gIE5vdGlmaWNhdGlvblJlc3VsdCxcbiAgU2hvcnRUZW1wbGF0ZVZlcnNpb24sXG4gIFRlbXBsYXRlUXVlcnksXG4gIFRlbXBsYXRlVmVyc2lvbixcbiAgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0XG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5UZW1wbGF0ZXMnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluVGVtcGxhdGVJdGVtIGltcGxlbWVudHMgRG9tYWluVGVtcGxhdGUge1xuICBuYW1lIDogc3RyaW5nO1xuICBkZXNjcmlwdGlvbiA6IHN0cmluZztcbiAgY3JlYXRlZEF0IDogRGF0ZSB8ICcnO1xuICBjcmVhdGVkQnkgOiBzdHJpbmc7XG4gIGlkIDogc3RyaW5nO1xuICB2ZXJzaW9uPzogVGVtcGxhdGVWZXJzaW9uO1xuICB2ZXJzaW9ucz86IFNob3J0VGVtcGxhdGVWZXJzaW9uW107XG5cbiAgY29uc3RydWN0b3IoZG9tYWluVGVtcGxhdGVGcm9tQVBJOiBEb21haW5UZW1wbGF0ZSkge1xuICAgIHRoaXMubmFtZSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5uYW1lO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuZGVzY3JpcHRpb247XG4gICAgdGhpcy5jcmVhdGVkQXQgPSBkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0ID8gbmV3IERhdGUoZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRBdCkgOiAnJztcbiAgICB0aGlzLmNyZWF0ZWRCeSA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQnk7XG4gICAgdGhpcy5pZCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5pZDtcblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbikge1xuICAgICAgdGhpcy52ZXJzaW9uID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb247XG4gICAgICBpZiAoZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb24uY3JlYXRlZEF0KSB7XG4gICAgICAgIHRoaXMudmVyc2lvbi5jcmVhdGVkQXQgPSBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMgJiYgZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy52ZXJzaW9ucyA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucy5tYXAoKHZlcnNpb24pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0geyAuLi52ZXJzaW9uIH07XG4gICAgICAgIHJlc3VsdC5jcmVhdGVkQXQgPSBuZXcgRGF0ZSh2ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluVGVtcGxhdGVzQ2xpZW50IGltcGxlbWVudHMgSURvbWFpblRlbXBsYXRlc0NsaWVudCB7XG4gIGJhc2VSb3V0ZTogc3RyaW5nO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My8nO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNyZWF0aW9uUmVzcG9uc2UoZGF0YTogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSk6IERvbWFpblRlbXBsYXRlSXRlbSB7XG4gICAgcmV0dXJuIG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShcbiAgICBkYXRhOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZVxuICApOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0ID0ge30gYXMgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkgJiYgZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKGRhdGEuYm9keS50ZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTXV0YXRpb25SZXNwb25zZShcbiAgICBkYXRhOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2VcbiAgKTogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0ID0ge30gYXMgVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5ICYmIGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKGRhdGE6IE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlKTogTm90aWZpY2F0aW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IE5vdGlmaWNhdGlvblJlc3VsdCA9IHt9IGFzIE5vdGlmaWNhdGlvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKFxuICAgIGRhdGE6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlXG4gICk6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7fSBhcyBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keS50ZW1wbGF0ZSkge1xuICAgICAgcmVzdWx0LnRlbXBsYXRlTmFtZSA9IGRhdGEuYm9keS50ZW1wbGF0ZS5uYW1lO1xuICAgICAgcmVzdWx0LnRlbXBsYXRlVmVyc2lvbiA9IHsgdGFnOiBkYXRhLmJvZHkudGVtcGxhdGUudmVyc2lvbi50YWcgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VMaXN0KHJlc3BvbnNlOiBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UpOiBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgTGlzdERvbWFpblRlbXBsYXRlc1Jlc3VsdDtcblxuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgoZDogRG9tYWluVGVtcGxhdGUpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZCkpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHJlc3BvbnNlLmJvZHkucGFnaW5nO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMoXG4gICAgcmVzcG9uc2U6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2VcbiAgKTogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdDtcblxuICAgIGRhdGEudGVtcGxhdGUgPSBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlc3BvbnNlLmJvZHkudGVtcGxhdGUpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHJlc3BvbnNlLmJvZHkucGFnaW5nO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5KTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUxpc3QocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHF1ZXJ5PzogVGVtcGxhdGVRdWVyeSk6IFByb21pc2U8RG9tYWluVGVtcGxhdGVJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBxdWVyeSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGVtcGxhdGVJdGVtKHJlcy5ib2R5LnRlbXBsYXRlKVxuICAgICAgKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZURhdGFcbiAgKTogUHJvbWlzZTxEb21haW5UZW1wbGF0ZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcycpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdGVtcGxhdGVOYW1lOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhXG4gICk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZyk6IFByb21pc2U8VXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZVJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lKSlcbiAgICAgIC50aGVuKChyZXM6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBkZXN0cm95QWxsKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxOb3RpZmljYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJykpXG4gICAgICAudGhlbigocmVzOiBOb3RpZmljYXRpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgY3JlYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8Q3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIGRhdGEpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZShyZXMpXG4gICAgICApO1xuICB9XG5cbiAgZ2V0VmVyc2lvbihkb21haW46IHN0cmluZywgdGVtcGxhdGVOYW1lOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UZW1wbGF0ZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpXG4gICAgICApO1xuICB9XG5cbiAgdXBkYXRlVmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBkZXN0cm95VmVyc2lvbihcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICB0YWc6IHN0cmluZ1xuICApOiBQcm9taXNlPE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgLnRoZW4oKHJlczogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGxpc3RWZXJzaW9ucyhcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBxdWVyeT86IERvbWFpblRlbXBsYXRlc1F1ZXJ5XG4gICk6IFByb21pc2U8TGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UpID0+IHRoaXMucGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhyZXMpXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUElFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgc3RhdHVzOiBudW1iZXIgfCBzdHJpbmc7XG4gIHN0YWNrOiBzdHJpbmc7XG4gIGRldGFpbHM6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgc3RhdHVzLFxuICAgIHN0YXR1c1RleHQsXG4gICAgbWVzc2FnZSxcbiAgICBib2R5ID0ge31cbiAgfTogQVBJRXJyb3JPcHRpb25zKSB7XG4gICAgY29uc3QgeyBtZXNzYWdlOiBib2R5TWVzc2FnZSwgZXJyb3IgfSA9IGJvZHk7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IGVycm9yIHx8IHN0YXR1c1RleHQ7XG4gICAgdGhpcy5kZXRhaWxzID0gYm9keU1lc3NhZ2U7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCB7XG4gIEV2ZW50c0xpc3QsXG4gIEV2ZW50c1BhZ2UsXG4gIEV2ZW50c1F1ZXJ5LFxuICBFdmVudHNSZXNwb25zZSxcbiAgUGFnZXNMaXN0LFxuICBQYWdlc0xpc3RBY2N1bXVsYXRvcixcbiAgUGFyc2VkUGFnZXNMaXN0XG59IGZyb20gJy4vaW50ZXJmYWNlcy9FdmVudHMnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudENsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBfcGFyc2VQYWdlTnVtYmVyKHVybDogc3RyaW5nKSA6IHN0cmluZyB7XG4gICAgcmV0dXJuIHVybC5zcGxpdCgnLycpLnBvcCgpIHx8ICcnO1xuICB9XG5cbiAgX3BhcnNlUGFnZShpZDogc3RyaW5nLCB1cmw6IHN0cmluZykgOiBFdmVudHNQYWdlIHtcbiAgICByZXR1cm4geyBpZCwgbnVtYmVyOiB0aGlzLl9wYXJzZVBhZ2VOdW1iZXIodXJsKSwgdXJsIH07XG4gIH1cblxuICBfcGFyc2VQYWdlTGlua3MocmVzcG9uc2U6IEV2ZW50c1Jlc3BvbnNlKSA6IFBhcnNlZFBhZ2VzTGlzdCB7XG4gICAgY29uc3QgcGFnZXMgPSBPYmplY3QuZW50cmllcyhyZXNwb25zZS5ib2R5LnBhZ2luZyBhcyBQYWdlc0xpc3QpO1xuICAgIHJldHVybiBwYWdlcy5yZWR1Y2UoXG4gICAgICAoYWNjOiBQYWdlc0xpc3RBY2N1bXVsYXRvciwgcGFpcjogW3VybDogc3RyaW5nLCBpZDogc3RyaW5nXSkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IHBhaXJbMF07XG4gICAgICAgIGNvbnN0IHVybCA9IHBhaXJbMV07XG4gICAgICAgIGFjY1tpZF0gPSB0aGlzLl9wYXJzZVBhZ2UoaWQsIHVybCk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fVxuICAgICkgYXMgdW5rbm93biBhcyBQYXJzZWRQYWdlc0xpc3Q7XG4gIH1cblxuICBfcGFyc2VFdmVudExpc3QocmVzcG9uc2U6IEV2ZW50c1Jlc3BvbnNlKSA6IEV2ZW50c0xpc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogcmVzcG9uc2UuYm9keS5pdGVtcyxcbiAgICAgIHBhZ2VzOiB0aGlzLl9wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSlcbiAgICB9O1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IEV2ZW50c1F1ZXJ5KSA6IFByb21pc2U8RXZlbnRzTGlzdD4ge1xuICAgIGxldCB1cmw7XG4gICAgY29uc3QgcXVlcnlDb3B5ID0geyAuLi5xdWVyeSB9O1xuICAgIGlmIChxdWVyeUNvcHkgJiYgcXVlcnlDb3B5LnBhZ2UpIHtcbiAgICAgIHVybCA9IHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ2V2ZW50cycsIHF1ZXJ5Q29weS5wYWdlKTtcbiAgICAgIGRlbGV0ZSBxdWVyeUNvcHkucGFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gdXJsam9pbignL3YzJywgZG9tYWluLCAnZXZlbnRzJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybCwgcXVlcnlDb3B5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBFdmVudHNSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VFdmVudExpc3QocmVzcG9uc2UpKTtcbiAgfVxufVxuIiwiaW1wb3J0IENsaWVudCBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lGb3JtRGF0YSc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvT3B0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW4ge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHQoKTogdHlwZW9mIE1haWxndW4geyByZXR1cm4gdGhpczsgfVxuICBwcml2YXRlIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhXG5cbiAgY29uc3RydWN0b3IoRm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLmZvcm1EYXRhID0gRm9ybURhdGE7XG4gIH1cblxuICBjbGllbnQob3B0aW9uczogT3B0aW9ucykgOiBDbGllbnQge1xuICAgIHJldHVybiBuZXcgQ2xpZW50KG9wdGlvbnMsIHRoaXMuZm9ybURhdGEpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBCb3VuY2UsIENvbXBsYWludCwgVW5zdWJzY3JpYmUsIFdoaXRlTGlzdFxufSBmcm9tICcuLi9zdXBwcmVzc2lvbnMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQm91bmNlRGF0YSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY29kZTogbnVtYmVyO1xuICBlcnJvcjogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsYWludERhdGEge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVW5zdWJzY3JpYmVEYXRhIHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICB0YWdzOiBhbnk7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2hpdGVMaXN0RGF0YSB7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXJzZWRQYWdlIHtcbiAgaWQ6IHN0cmluZztcbiAgcGFnZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgYWRkcmVzczogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgdXJsOiBzdHJpbmdcbn1cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2VkUGFnZXNMaXN0IHtcbiAgcHJldmlvdXM6IFBhcnNlZFBhZ2U7XG4gIGZpcnN0OiBQYXJzZWRQYWdlO1xuICBsYXN0OiBQYXJzZWRQYWdlO1xuICBuZXh0OiBQYXJzZWRQYWdlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1cHByZXNzaW9uTGlzdCB7XG4gIGl0ZW1zOiAoQm91bmNlIHwgQ29tcGxhaW50IHwgVW5zdWJzY3JpYmUgfCBXaGl0ZUxpc3QpW107XG4gIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZXNMaXN0IHtcbiAgcHJldmlvdXM6IHN0cmluZztcbiAgZmlyc3Q6IHN0cmluZztcbiAgbGFzdDogc3RyaW5nO1xuICBuZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIFN1cHByZXNzaW9uTW9kZWxzIHtcbiAgQk9VTkNFUyA9ICdib3VuY2VzJyxcbiAgQ09NUExBSU5UUyA9ICdjb21wbGFpbnRzJyxcbiAgVU5TVUJTQ1JJQkVTID0gJ3Vuc3Vic2NyaWJlcycsXG4gIFdISVRFTElTVFMgPSAnd2hpdGVsaXN0cydcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlc0xpc3RBY2N1bXVsYXRvciB7XG4gIFtpbmRleDogc3RyaW5nXTogUGFyc2VkUGFnZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkxpc3RRdWVyeSB7XG4gIGxpbWl0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlIHtcbiAgYm9keToge1xuICAgIGl0ZW1zOiBCb3VuY2VEYXRhW10gfCBDb21wbGFpbnREYXRhW10gfCBVbnN1YnNjcmliZURhdGFbXSB8IFdoaXRlTGlzdERhdGFbXTtcbiAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvblJlc3BvbnNlIHtcbiAgYm9keTogQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZSB7XG4gIGJvZHk6IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdmFsdWU/OiBzdHJpbmc7XG4gICAgYWRkcmVzcz86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvZGU/OiBudW1iZXI7XG4gIGVycm9yPzogc3RyaW5nO1xuICBkb21haW4/OiBzdHJpbmc7XG4gIHRhZz86IHN0cmluZztcbiAgY3JlYXRlZF9hdD86IHN0cmluZyA7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlIHtcbiAgYm9keTp7XG4gICAgbWVzc2FnZTpzdHJpbmc7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0IHtcbiAgbWVzc2FnZTpzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmltcG9ydCB7IElwUG9vbCwgSXBQb29sTGlzdFJlc3BvbnNlLCBJcFBvb2xVcGRhdGVEYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lwUG9vbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcFBvb2xzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QocXVlcnk6IGFueSk6IFByb21pc2U8SXBQb29sW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YxL2lwX3Bvb2xzJywgcXVlcnkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZSkpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IHsgbmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbj86IHN0cmluZywgaXBzPzogc3RyaW5nW10gfSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YxL2lwX3Bvb2xzJywgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogeyBib2R5OiB7IG1lc3NhZ2U6IHN0cmluZywgcG9vbF9pZDogc3RyaW5nIH0gfSkgPT4gcmVzcG9uc2U/LmJvZHkpO1xuICB9XG5cbiAgdXBkYXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xVcGRhdGVEYXRhKSA6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wYXRjaFdpdGhGRChgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2U6IHsgYm9keTogYW55IH0pID0+IHJlc3BvbnNlPy5ib2R5KTtcbiAgfVxuXG4gIGRlbGV0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogeyBpZDogc3RyaW5nLCBwb29sX2lkOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjEvaXBfcG9vbHMvJHtwb29sSWR9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogeyBib2R5OiBhbnkgfSkgPT4gcmVzcG9uc2U/LmJvZHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZTogeyBib2R5OiBhbnkgfCBhbnkgfSkge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5LmlwX3Bvb2xzO1xuICB9XG59XG4iLCJpbXBvcnQgTWdSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgeyBJcERhdGEsIElwc0xpc3RSZXNwb25zZUJvZHkgfSBmcm9tICcuL2ludGVyZmFjZXMvSXBzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXBzQ2xpZW50IHtcbiAgcmVxdWVzdDogTWdSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IE1nUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KHF1ZXJ5OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2lwcycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7IGJvZHk6IElwc0xpc3RSZXNwb25zZUJvZHkgfSkgPT4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlKHJlc3BvbnNlKSk7XG4gIH1cblxuICBnZXQoaXA6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvaXBzLyR7aXB9YClcbiAgICAgIC50aGVuKChyZXNwb25zZTogeyBib2R5OiBJcERhdGEgfSkgPT4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlKHJlc3BvbnNlKSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlSXBzUmVzcG9uc2UocmVzcG9uc2U6IHsgYm9keTogSXBzTGlzdFJlc3BvbnNlQm9keSB8IElwRGF0YSB9KSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQge1xuICBMaXN0c1F1ZXJ5LFxuICBDcmVhdGVVcGRhdGVMaXN0LFxuICBEZXN0cm95ZWRMaXN0LFxuICBNYWlsaW5nTGlzdCxcbiAgVmFsaWRhdGlvbkFwaVJlc3BvbnNlLFxuICBTdGFydFZhbGlkYXRpb25SZXN1bHQsXG4gIFZhbGlkYXRpb25SZXN1bHQsXG4gIENhbmNlbFZhbGlkYXRpb25SZXN1bHRcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL2xpc3RzJztcbmltcG9ydCB7IElNYWlsTGlzdHNNZW1iZXJzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL21haWxMaXN0TWVtYmVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIG1lbWJlcnM6IElNYWlsTGlzdHNNZW1iZXJzO1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QsIG1lbWJlcnM6SU1haWxMaXN0c01lbWJlcnMpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuYmFzZVJvdXRlID0gJy92My9saXN0cyc7XG4gICAgdGhpcy5tZW1iZXJzID0gbWVtYmVycztcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VWYWxpZGF0aW9uUmVzdWx0KHN0YXR1czogbnVtYmVyLCBkYXRhOiBWYWxpZGF0aW9uQXBpUmVzcG9uc2UpOiBWYWxpZGF0aW9uUmVzdWx0IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzLFxuICAgICAgdmFsaWRhdGlvblJlc3VsdDoge1xuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQgKiAxMDAwKSAvLyBhZGQgbWlsbGlzZWNvbmQgdG8gVW5peCB0aW1lc3RhbXBcbiAgICAgIH1cbiAgICB9IGFzIFZhbGlkYXRpb25SZXN1bHQ7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogTGlzdHNRdWVyeSk6IFByb21pc2U8TWFpbGluZ0xpc3RbXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS9wYWdlc2AsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lml0ZW1zIGFzIE1haWxpbmdMaXN0W10pO1xuICB9XG5cbiAgZ2V0KG1haWxMaXN0QWRkcmVzczogc3RyaW5nKTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZUxpc3QpOiBQcm9taXNlPE1haWxpbmdMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKHRoaXMuYmFzZVJvdXRlLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgdXBkYXRlKG1haWxMaXN0QWRkcmVzczogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lmxpc3QgYXMgTWFpbGluZ0xpc3QpO1xuICB9XG5cbiAgZGVzdHJveShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8RGVzdHJveWVkTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIERlc3Ryb3llZExpc3QpO1xuICB9XG5cbiAgdmFsaWRhdGUobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFN0YXJ0VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L3ZhbGlkYXRlYCwge30pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+ICh7XG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAuLi5yZXNwb25zZS5ib2R5XG4gICAgICB9KSBhcyBTdGFydFZhbGlkYXRpb25SZXN1bHQpO1xuICB9XG5cbiAgdmFsaWRhdGlvblJlc3VsdChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXNwb25zZSkgPT4gdGhpcy5wYXJzZVZhbGlkYXRpb25SZXN1bHQoXG4gICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICByZXNwb25zZS5ib2R5IGFzIFZhbGlkYXRpb25BcGlSZXNwb25zZVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgY2FuY2VsVmFsaWRhdGlvbihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8Q2FuY2VsVmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vdmFsaWRhdGVgKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlXG4gICAgICB9IGFzIENhbmNlbFZhbGlkYXRpb25SZXN1bHQpKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7XG4gIE1haWxMaXN0TWVtYmVyc1F1ZXJ5LFxuICBJTWFpbExpc3RzTWVtYmVycyxcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzLFxuICBNYWlsTGlzdE1lbWJlcixcbiAgTXVsdGlwbGVNZW1iZXJzRGF0YSxcbiAgTXVsdGlwbGVNZW1iZXJzUmVxRGF0YSxcbiAgRGVsZXRlZE1lbWJlcixcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzUmVxLFxuICBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZVxufSBmcm9tICcuL2ludGVyZmFjZXMvbWFpbExpc3RNZW1iZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbExpc3RzTWVtYmVycyBpbXBsZW1lbnRzIElNYWlsTGlzdHNNZW1iZXJzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycykge1xuICAgIGNvbnN0IG5ld0RhdGEgPSB7IC4uLmRhdGEgfTtcblxuICAgIGlmICh0eXBlb2YgZGF0YS52YXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbmV3RGF0YS52YXJzID0gSlNPTi5zdHJpbmdpZnkobmV3RGF0YS52YXJzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEuc3Vic2NyaWJlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBuZXdEYXRhLnN1YnNjcmliZWQgPSBkYXRhLnN1YnNjcmliZWQgPyAneWVzJyA6ICdubyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld0RhdGEgYXMgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzUmVxO1xuICB9XG5cbiAgbGlzdE1lbWJlcnMobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIHF1ZXJ5PzogTWFpbExpc3RNZW1iZXJzUXVlcnkpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvcGFnZXNgLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyBhcyBNYWlsTGlzdE1lbWJlcltdKTtcbiAgfVxuXG4gIGdldE1lbWJlcihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGNyZWF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzYCwgcmVxRGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgY3JlYXRlTWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZU1lbWJlcnNEYXRhXG4gICk6IFByb21pc2U8TmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2U+IHtcbiAgICBjb25zdCBuZXdEYXRhOiBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhID0ge1xuICAgICAgbWVtYmVyczogQXJyYXkuaXNBcnJheShkYXRhLm1lbWJlcnMpID8gSlNPTi5zdHJpbmdpZnkoZGF0YS5tZW1iZXJzKSA6IGRhdGEubWVtYmVycyxcbiAgICAgIHVwc2VydDogZGF0YS51cHNlcnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy5qc29uYCwgbmV3RGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSk7XG4gIH1cblxuICB1cGRhdGVNZW1iZXIoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzXG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICBjb25zdCByZXFEYXRhID0gdGhpcy5jaGVja0FuZFVwZGF0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWAsIHJlcURhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGRlc3Ryb3lNZW1iZXIobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nKSA6IFByb21pc2U8RGVsZXRlZE1lbWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIERlbGV0ZWRNZW1iZXIpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBNYWlsZ3VuTWVzc2FnZURhdGEsXG4gIE1lc3NhZ2VzU2VuZEFQSVJlc3BvbnNlLFxuICBNZXNzYWdlc1NlbmRSZXN1bHRcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL01lc3NhZ2VzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIF9wYXJzZVJlc3BvbnNlKHJlc3BvbnNlOiBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSk6IE1lc3NhZ2VzU2VuZFJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cblxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IE1haWxndW5NZXNzYWdlRGF0YSk6IFByb21pc2U8TWVzc2FnZXNTZW5kUmVzdWx0PiB7XG4gICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzLm1pbWVgLCBkYXRhKVxuICAgICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92My8ke2RvbWFpbn0vbWVzc2FnZXNgLCBkYXRhKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0XG59XG4gIGZyb20gJy4vaW50ZXJmYWNlcy9NdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGltcGxlbWVudHMgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KCk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsaycpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQpO1xuICB9XG5cbiAgZ2V0KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZShsaXN0SWQ6IHN0cmluZywgZmlsZTogYW55KTogUHJvbWlzZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWAsIGZpbGUpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8Q2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gJ2Jhc2UtNjQnO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IGt5IGZyb20gJ2t5LXVuaXZlcnNhbCc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgUmVxdWVzdE9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL1JlcXVlc3RPcHRpb25zJztcbmltcG9ydCBBUElFcnJvck9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL0FQSUVycm9yT3B0aW9ucyc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lGb3JtRGF0YSc7XG5pbXBvcnQgQVBJUmVzcG9uc2UgZnJvbSAnLi9pbnRlcmZhY2VzL0FwaVJlc3BvbnNlJztcblxuY29uc3QgaXNTdHJlYW0gPSAoZGF0YTogYW55KSA9PiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGRhdGEucGlwZSA9PT0gJ2Z1bmN0aW9uJztcblxuZnVuY3Rpb24gaXNOb2RlRm9ybURhdGEoZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEpXG4gIDogZm9ybURhdGFJbnN0YW5jZSBpcyBOb2RlRm9ybURhdGEge1xuICByZXR1cm4gKDxOb2RlRm9ybURhdGE+Zm9ybURhdGFJbnN0YW5jZSkuZ2V0SGVhZGVycyAhPT0gdW5kZWZpbmVkO1xufVxuXG5jb25zdCBnZXRBdHRhY2htZW50T3B0aW9ucyA9IChpdGVtOiBhbnkpOiB7XG4gIGZpbGVuYW1lPzogc3RyaW5nLFxuICBjb250ZW50VHlwZT86IHN0cmluZyxcbiAga25vd25MZW5ndGg/OiBudW1iZXJcbn0gPT4ge1xuICBpZiAodHlwZW9mIGl0ZW0gIT09ICdvYmplY3QnIHx8IGlzU3RyZWFtKGl0ZW0pKSByZXR1cm4ge307XG5cbiAgY29uc3Qge1xuICAgIGZpbGVuYW1lLFxuICAgIGNvbnRlbnRUeXBlLFxuICAgIGtub3duTGVuZ3RoXG4gIH0gPSBpdGVtO1xuXG4gIHJldHVybiB7XG4gICAgLi4uKGZpbGVuYW1lID8geyBmaWxlbmFtZSB9IDogeyBmaWxlbmFtZTogJ2ZpbGUnIH0pLFxuICAgIC4uLihjb250ZW50VHlwZSAmJiB7IGNvbnRlbnRUeXBlIH0pLFxuICAgIC4uLihrbm93bkxlbmd0aCAmJiB7IGtub3duTGVuZ3RoIH0pXG4gIH07XG59O1xuXG5jb25zdCBzdHJlYW1Ub1N0cmluZyA9IChzdHJlYW06IGFueSkgPT4ge1xuICBjb25zdCBjaHVua3M6IGFueSA9IFtdO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHN0cmVhbS5vbignZGF0YScsIChjaHVuazogYW55KSA9PiBjaHVua3MucHVzaChjaHVuaykpO1xuICAgIHN0cmVhbS5vbignZXJyb3InLCByZWplY3QpO1xuICAgIHN0cmVhbS5vbignZW5kJywgKCkgPT4gcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykudG9TdHJpbmcoJ3V0ZjgnKSkpO1xuICB9KTtcbn07XG5cbmNsYXNzIFJlcXVlc3Qge1xuICBwcml2YXRlIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUga2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgdXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgdGltZW91dDogbnVtYmVyO1xuICBwcml2YXRlIGhlYWRlcnM6IGFueTtcbiAgcHJpdmF0ZSBGb3JtRGF0YUNvbnN0cnVjdG9yOiBJbnB1dEZvcm1EYXRhO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zLCBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIHRoaXMudXNlcm5hbWUgPSBvcHRpb25zLnVzZXJuYW1lO1xuICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXk7XG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCBhcyBzdHJpbmc7XG4gICAgdGhpcy50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0O1xuICAgIHRoaXMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IgPSBmb3JtRGF0YTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBpbnB1dE9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgLi4uaW5wdXRPcHRpb25zIH07XG4gICAgY29uc3QgYmFzaWMgPSBiYXNlNjQuZW5jb2RlKGAke3RoaXMudXNlcm5hbWV9OiR7dGhpcy5rZXl9YCk7XG4gICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke2Jhc2ljfWAsXG4gICAgICAuLi50aGlzLmhlYWRlcnMsXG4gICAgICAuLi5vcHRpb25zPy5oZWFkZXJzXG4gICAgfTtcblxuICAgIGRlbGV0ZSBvcHRpb25zPy5oZWFkZXJzO1xuXG4gICAgaWYgKCFoZWFkZXJzWydDb250ZW50LVR5cGUnXSkge1xuICAgICAgLy8gZm9yIGZvcm0tZGF0YSBpdCB3aWxsIGJlIE51bGwgc28gd2UgbmVlZCB0byByZW1vdmUgaXRcbiAgICAgIGRlbGV0ZSBoZWFkZXJzWydDb250ZW50LVR5cGUnXTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLm9wdGlvbnMgfTtcblxuICAgIGlmIChvcHRpb25zPy5xdWVyeSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvcHRpb25zPy5xdWVyeSkubGVuZ3RoID4gMCkge1xuICAgICAgcGFyYW1zLnNlYXJjaFBhcmFtcyA9IG9wdGlvbnMucXVlcnk7XG4gICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQga3koXG4gICAgICB1cmxqb2luKHRoaXMudXJsLCB1cmwpLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZC50b0xvY2FsZVVwcGVyQ2FzZSgpLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICB0aHJvd0h0dHBFcnJvcnM6IGZhbHNlLFxuICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgIC4uLnBhcmFtc1xuICAgICAgfVxuICAgICk7XG5cbiAgICBpZiAoIXJlc3BvbnNlPy5vaykge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHJlc3BvbnNlPy5ib2R5ICYmIGlzU3RyZWFtKHJlc3BvbnNlLmJvZHkpXG4gICAgICAgID8gYXdhaXQgc3RyZWFtVG9TdHJpbmcocmVzcG9uc2UuYm9keSlcbiAgICAgICAgOiBhd2FpdCByZXNwb25zZT8uanNvbigpO1xuXG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlPy5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlPy5zdGF0dXNUZXh0LFxuICAgICAgICBib2R5OiB7IG1lc3NhZ2UgfVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZ2V0UmVzcG9uc2VCb2R5KHJlc3BvbnNlKTtcbiAgICByZXR1cm4gcmVzIGFzIEFQSVJlc3BvbnNlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRSZXNwb25zZUJvZHkocmVzcG9uc2U6IGFueSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBjb25zdCByZXMgPSB7XG4gICAgICBib2R5OiB7fSxcbiAgICAgIHN0YXR1czogcmVzcG9uc2U/LnN0YXR1c1xuICAgIH0gYXMgQVBJUmVzcG9uc2U7XG4gICAgbGV0IHJlc3BvbnNlU3RyaW5nID0gJyc7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlU3RyaW5nID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgY29uc3QganNvbkJvZHkgPSBKU09OLnBhcnNlKHJlc3BvbnNlU3RyaW5nKTtcbiAgICAgIHJlcy5ib2R5ID0ganNvbkJvZHk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICByZXMuYm9keSA9IHtcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2VTdHJpbmcsXG4gICAgICAgIHN0YXR1czogNDAwXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gIH1cblxuICBxdWVyeShtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIHF1ZXJ5OiBhbnksIG9wdGlvbnM/OiBhbnkpIDogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHsgcXVlcnksIC4uLm9wdGlvbnMgfSk7XG4gIH1cblxuICBjb21tYW5kKG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgZGF0YTogYW55LCBvcHRpb25zPzogYW55KSA6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1ldGhvZCwgdXJsLCB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9LFxuICAgICAgYm9keTogZGF0YSxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9KTtcbiAgfVxuXG4gIGdldCh1cmw6IHN0cmluZywgcXVlcnk/OiBhbnksIG9wdGlvbnM/OiBhbnkpIDogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5KCdnZXQnLCB1cmwsIHF1ZXJ5LCBvcHRpb25zKTtcbiAgfVxuXG4gIGhlYWQodXJsOiBzdHJpbmcsIHF1ZXJ5OiBhbnksIG9wdGlvbnM6IGFueSkgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkoJ2hlYWQnLCB1cmwsIHF1ZXJ5LCBvcHRpb25zKTtcbiAgfVxuXG4gIG9wdGlvbnModXJsOiBzdHJpbmcsIHF1ZXJ5OiBhbnksIG9wdGlvbnM6IGFueSkgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkoJ29wdGlvbnMnLCB1cmwsIHF1ZXJ5LCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3QodXJsOiBzdHJpbmcsIGRhdGE6IGFueSwgb3B0aW9ucz86IGFueSkgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncG9zdCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICBwb3N0V2l0aEZEKHVybDogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGRhdGEgb2JqZWN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHBhcmFtczogYW55ID0ge1xuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogbnVsbCB9XG4gICAgfTtcbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuY3JlYXRlRm9ybURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncG9zdCcsIHVybCwgZm9ybURhdGEsIHBhcmFtcyk7XG4gIH1cblxuICBwdXRXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgZGF0YSBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiBudWxsIH1cbiAgICB9O1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGZvcm1EYXRhLCBwYXJhbXMpO1xuICB9XG5cbiAgcGF0Y2hXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgZGF0YSBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiBudWxsIH1cbiAgICB9O1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwYXRjaCcsIHVybCwgZm9ybURhdGEsIHBhcmFtcyk7XG4gIH1cblxuICBjcmVhdGVGb3JtRGF0YShkYXRhOiBhbnkpOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YSB7XG4gICAgY29uc3QgZm9ybURhdGE6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZGF0YVtrZXldOyB9KVxuICAgICAgLnJlZHVjZSgoZm9ybURhdGFBY2M6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhLCBrZXkpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZUtleXMgPSBbJ2F0dGFjaG1lbnQnLCAnaW5saW5lJywgJ2ZpbGUnXTtcbiAgICAgICAgaWYgKGZpbGVLZXlzLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICB0aGlzLmFkZEZpbGVzVG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkgPT09ICdtZXNzYWdlJykgeyAvLyBtaW1lIG1lc3NhZ2VcbiAgICAgICAgICB0aGlzLmFkZE1pbWVEYXRhVG9GRChrZXksIGRhdGFba2V5XSwgZm9ybURhdGFBY2MpO1xuICAgICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uUHJvcGVydHlUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgIHJldHVybiBmb3JtRGF0YUFjYztcbiAgICAgIH0sIG5ldyB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IoKSk7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRNaW1lRGF0YVRvRkQoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgZGF0YTogQnVmZmVyIHwgQmxvYixcbiAgICBmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBpZiAoaXNOb2RlRm9ybURhdGEoZm9ybURhdGFJbnN0YW5jZSkpIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgZm9ybURhdGFJbnN0YW5jZS5hcHBlbmQoa2V5LCBkYXRhLCB7IGZpbGVuYW1lOiAnTWltZU1lc3NhZ2UnIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtRGF0YUluc3RhbmNlLmFwcGVuZChrZXksIGRhdGEgYXMgQmxvYiwgJ01pbWVNZXNzYWdlJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRGaWxlc1RvRkQoXG4gICAgcHJvcGVydHlOYW1lOiBzdHJpbmcsXG4gICAgdmFsdWU6IGFueSxcbiAgICBmb3JtRGF0YUluc3RhbmNlOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBhcHBlbmRGaWxlVG9GRCA9IChcbiAgICAgIGtleTogc3RyaW5nLFxuICAgICAgb2JqOiBhbnksXG4gICAgICBmb3JtRGF0YTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgICApOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGlzU3RyZWFtRGF0YSA9IGlzU3RyZWFtKG9iaik7XG4gICAgICBjb25zdCBvYmpEYXRhID0gaXNTdHJlYW1EYXRhID8gb2JqIDogb2JqLmRhdGE7XG4gICAgICAvLyBnZXRBdHRhY2htZW50T3B0aW9ucyBzaG91bGQgYmUgY2FsbGVkIHdpdGggb2JqIHBhcmFtZXRlciB0byBwcmV2ZW50IGxvb3NpbmcgZmlsZW5hbWVcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBnZXRBdHRhY2htZW50T3B0aW9ucyhvYmopO1xuICAgICAgaWYgKGlzTm9kZUZvcm1EYXRhKGZvcm1EYXRhKSkge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBvYmpEYXRhLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgb2JqRGF0YSwgb3B0aW9ucy5maWxlbmFtZSk7XG4gICAgfTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBhcHBlbmRGaWxlVG9GRChwcm9wZXJ0eU5hbWUsIGl0ZW0sIGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgdmFsdWUsIGZvcm1EYXRhSW5zdGFuY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29tbW9uUHJvcGVydHlUb0ZEKFxuICAgIGtleTogc3RyaW5nLFxuICAgIHZhbHVlOiBhbnksXG4gICAgZm9ybURhdGFBY2M6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogYW55KSB7XG4gICAgICAgIGZvcm1EYXRhQWNjLmFwcGVuZChrZXksIGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBmb3JtRGF0YUFjYy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHV0KHVybDogc3RyaW5nLCBkYXRhOiBhbnksIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncHV0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBhdGNoKHVybDogc3RyaW5nLCBkYXRhOiBhbnksIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgncGF0Y2gnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgZGVsZXRlKHVybDogc3RyaW5nLCBkYXRhPzogYW55LCBvcHRpb25zPzogYW55KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ2RlbGV0ZScsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdDtcbiIsImltcG9ydCB7XG4gIENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSwgRGVzdHJveVJvdXRlUmVzcG9uc2UsIFJvdXRlLCBSb3V0ZXNMaXN0UXVlcnksIFVwZGF0ZVJvdXRlUmVzcG9uc2Vcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL3JvdXRlcyc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXNDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgbGlzdChxdWVyeTogUm91dGVzTGlzdFF1ZXJ5KTogUHJvbWlzZTxSb3V0ZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9yb3V0ZXMnLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyk7XG4gIH1cblxuICBnZXQoaWQ6IHN0cmluZyk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL3JvdXRlcy8ke2lkfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8Um91dGU+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoJy92My9yb3V0ZXMnLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5LnJvdXRlKTtcbiAgfVxuXG4gIHVwZGF0ZShpZDogc3RyaW5nLCBkYXRhOiBDcmVhdGVVcGRhdGVSb3V0ZURhdGEpOiBQcm9taXNlPFVwZGF0ZVJvdXRlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgL3YzL3JvdXRlcy8ke2lkfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShpZDogc3RyaW5nKTogUHJvbWlzZTxEZXN0cm95Um91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgeyBTdGF0c1F1ZXJ5LCBTdGF0c09wdGlvbnMsIFN0YXQgfSBmcm9tICcuL2ludGVyZmFjZXMvU3RhdHNPcHRpb25zJztcblxuY2xhc3MgU3RhdHMge1xuICBzdGFydDogRGF0ZTtcbiAgZW5kOiBEYXRlO1xuICByZXNvbHV0aW9uOiBzdHJpbmc7XG4gIHN0YXRzOiBTdGF0W107XG5cbiAgY29uc3RydWN0b3IoZGF0YTogU3RhdHNPcHRpb25zKSB7XG4gICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKGRhdGEuc3RhcnQpO1xuICAgIHRoaXMuZW5kID0gbmV3IERhdGUoZGF0YS5lbmQpO1xuICAgIHRoaXMucmVzb2x1dGlvbiA9IGRhdGEucmVzb2x1dGlvbjtcbiAgICB0aGlzLnN0YXRzID0gZGF0YS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQ6IFN0YXQpIHtcbiAgICAgIGNvbnN0IHJlcyA9IHsgLi4uc3RhdCB9O1xuICAgICAgcmVzLnRpbWUgPSBuZXcgRGF0ZShzdGF0LnRpbWUpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnk6IFN0YXRzUXVlcnkgfCB1bmRlZmluZWQpOiBBcnJheTxBcnJheTxzdHJpbmc+PiB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9IFtdIGFzIEFycmF5PEFycmF5PHN0cmluZz4+O1xuICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHF1ZXJ5KS5sZW5ndGgpIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IE9iamVjdC5lbnRyaWVzKHF1ZXJ5KS5yZWR1Y2UoKGFycmF5V2l0aFBhaXJzLCBjdXJyZW50UGFpcikgPT4ge1xuICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBjdXJyZW50UGFpcjtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IHJlcGVhdGVkUHJvcGVydHkgPSB2YWx1ZS5tYXAoKGl0ZW0pID0+IFtrZXksIGl0ZW1dKTtcbiAgICAgICAgICByZXR1cm4gWy4uLmFycmF5V2l0aFBhaXJzLCAuLi5yZXBlYXRlZFByb3BlcnR5XTtcbiAgICAgICAgfVxuICAgICAgICBhcnJheVdpdGhQYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICAgIHJldHVybiBhcnJheVdpdGhQYWlycztcbiAgICAgIH0sIFtdIGFzIEFycmF5PEFycmF5PHN0cmluZz4+KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VhcmNoUGFyYW1zO1xuICB9XG5cbiAgX3BhcnNlU3RhdHMocmVzcG9uc2U6IHsgYm9keTogU3RhdHNPcHRpb25zIH0pOiBTdGF0cyB7XG4gICAgcmV0dXJuIG5ldyBTdGF0cyhyZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGdldERvbWFpbihkb21haW46IHN0cmluZywgcXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxTdGF0cz4ge1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzJywgZG9tYWluLCAnc3RhdHMvdG90YWwnKSwgc2VhcmNoUGFyYW1zKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VTdGF0cyk7XG4gIH1cblxuICBnZXRBY2NvdW50KHF1ZXJ5PzogU3RhdHNRdWVyeSk6IFByb21pc2U8U3RhdHM+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB0aGlzLnByZXBhcmVTZWFyY2hQYXJhbXMocXVlcnkpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvc3RhdHMvdG90YWwnLCBzZWFyY2hQYXJhbXMpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVN0YXRzKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQge1xuICBCb3VuY2VEYXRhLFxuICBDb21wbGFpbnREYXRhLFxuICBQYWdlc0xpc3QsXG4gIFBhZ2VzTGlzdEFjY3VtdWxhdG9yLFxuICBQYXJzZWRQYWdlLFxuICBQYXJzZWRQYWdlc0xpc3QsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhLFxuICBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQsXG4gIFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQsXG4gIFN1cHByZXNzaW9uTGlzdCxcbiAgU3VwcHJlc3Npb25MaXN0UXVlcnksXG4gIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlLFxuICBTdXBwcmVzc2lvbk1vZGVscyxcbiAgU3VwcHJlc3Npb25SZXNwb25zZSxcbiAgVW5zdWJzY3JpYmVEYXRhLFxuICBXaGl0ZUxpc3REYXRhLFxufSBmcm9tICcuL2ludGVyZmFjZXMvU3VwcmVzc2lvbnMnO1xuaW1wb3J0IEFQSUVycm9yIGZyb20gJy4vZXJyb3InO1xuaW1wb3J0IEFQSUVycm9yT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvQVBJRXJyb3JPcHRpb25zJztcblxuY29uc3QgY3JlYXRlT3B0aW9ucyA9IHtcbiAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH1cbn07XG5leHBvcnQgY2xhc3MgU3VwcHJlc3Npb24ge1xuICB0eXBlOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHR5cGU6IFN1cHByZXNzaW9uTW9kZWxzKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIEJvdW5jZSBleHRlbmRzIFN1cHByZXNzaW9uIHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICBjb2RlOiBudW1iZXI7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogQm91bmNlRGF0YSkge1xuICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLkJPVU5DRVMpO1xuICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICB0aGlzLmNvZGUgPSArZGF0YS5jb2RlO1xuICAgIHRoaXMuZXJyb3IgPSBkYXRhLmVycm9yO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBsYWludCBleHRlbmRzIFN1cHByZXNzaW9uIHtcbiAgYWRkcmVzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBjcmVhdGVkX2F0OiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IENvbXBsYWludERhdGEpIHtcbiAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5DT01QTEFJTlRTKTtcbiAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5zdWJzY3JpYmUgZXh0ZW5kcyBTdXBwcmVzc2lvbiB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgdGFnczogc3RyaW5nW107XG4gIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogVW5zdWJzY3JpYmVEYXRhKSB7XG4gICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuVU5TVUJTQ1JJQkVTKTtcbiAgICB0aGlzLmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgdGhpcy50YWdzID0gZGF0YS50YWdzO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdoaXRlTGlzdCBleHRlbmRzIFN1cHByZXNzaW9uIHtcbiAgdmFsdWU6IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBXaGl0ZUxpc3REYXRhKSB7XG4gICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuV0hJVEVMSVNUUyk7XG4gICAgdGhpcy52YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgdGhpcy5yZWFzb24gPSBkYXRhLnJlYXNvbjtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZEF0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBwcmVzc2lvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIG1vZGVsczogTWFwPHN0cmluZywgYW55PjtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLm1vZGVscyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLm1vZGVscy5zZXQoJ2JvdW5jZXMnLCBCb3VuY2UpO1xuICAgIHRoaXMubW9kZWxzLnNldCgnY29tcGxhaW50cycsIENvbXBsYWludCk7XG4gICAgdGhpcy5tb2RlbHMuc2V0KCd1bnN1YnNjcmliZXMnLCBVbnN1YnNjcmliZSk7XG4gICAgdGhpcy5tb2RlbHMuc2V0KCd3aGl0ZWxpc3RzJywgV2hpdGVMaXN0KTtcbiAgfVxuXG4gIF9wYXJzZVBhZ2UoaWQ6IHN0cmluZywgcGFnZVVybDogc3RyaW5nKSA6IFBhcnNlZFBhZ2Uge1xuICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwocGFnZVVybCk7XG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IHBhcnNlZFVybDtcbiAgICByZXR1cm4ge1xuICAgICAgaWQsXG4gICAgICBwYWdlOiBzZWFyY2hQYXJhbXMuaGFzKCdwYWdlJykgPyBzZWFyY2hQYXJhbXMuZ2V0KCdwYWdlJykgOiB1bmRlZmluZWQsXG4gICAgICBhZGRyZXNzOiBzZWFyY2hQYXJhbXMuaGFzKCdhZGRyZXNzJykgPyBzZWFyY2hQYXJhbXMuZ2V0KCdhZGRyZXNzJykgOiB1bmRlZmluZWQsXG4gICAgICB1cmw6IHBhZ2VVcmxcbiAgICB9O1xuICB9XG5cbiAgX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSk6IFBhcnNlZFBhZ2VzTGlzdCB7XG4gICAgY29uc3QgcGFnZXMgPSBPYmplY3QuZW50cmllcyhyZXNwb25zZS5ib2R5LnBhZ2luZyBhcyBQYWdlc0xpc3QpO1xuICAgIHJldHVybiBwYWdlcy5yZWR1Y2UoXG4gICAgICAoYWNjOiBQYWdlc0xpc3RBY2N1bXVsYXRvciwgcGFpcjogW3BhZ2VVcmw6IHN0cmluZywgaWQ6IHN0cmluZ10pID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBwYWlyWzBdO1xuICAgICAgICBjb25zdCBwYWdlVXJsID0gcGFpclsxXTtcbiAgICAgICAgYWNjW2lkXSA9IHRoaXMuX3BhcnNlUGFnZShpZCwgcGFnZVVybCk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fVxuICAgICkgYXMgdW5rbm93biBhcyBQYXJzZWRQYWdlc0xpc3Q7XG4gIH1cblxuICBfcGFyc2VMaXN0KFxuICAgIHJlc3BvbnNlOiBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSxcbiAgICBNb2RlbDoge1xuICAgICAgbmV3KGRhdGE6IEJvdW5jZURhdGEgfCBDb21wbGFpbnREYXRhIHwgVW5zdWJzY3JpYmVEYXRhIHwgV2hpdGVMaXN0RGF0YSk6XG4gICAgICBCb3VuY2UgfCBDb21wbGFpbnQgfCBVbnN1YnNjcmliZSB8IFdoaXRlTGlzdFxuICAgIH1cbiAgKTogU3VwcHJlc3Npb25MaXN0IHtcbiAgICBjb25zdCBkYXRhID0ge30gYXMgU3VwcHJlc3Npb25MaXN0O1xuICAgIGRhdGEuaXRlbXMgPSByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcCgoaXRlbSkgPT4gbmV3IE1vZGVsKGl0ZW0pKTtcblxuICAgIGRhdGEucGFnZXMgPSB0aGlzLl9wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIF9wYXJzZUl0ZW08VCBleHRlbmRzIFN1cHByZXNzaW9uPihcbiAgICBkYXRhIDogQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YTogQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhKTpcbiAgICAgIFRcbiAgICB9XG4gICk6IFQge1xuICAgIHJldHVybiBuZXcgTW9kZWwoZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVdoaXRlTGlzdChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICBkYXRhOiBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YSB8IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhW11cbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBzdGF0dXNUZXh0OiAnRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0JyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG1lc3NhZ2U6ICdXaGl0ZWxpc3RcXCdzIGNyZWF0aW9uIHByb2Nlc3MgZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBjcmVhdGlvbnMuIERhdGEgcHJvcGVydHkgc2hvdWxkIGJlIGFuIG9iamVjdCdcbiAgICAgICAgfVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdFdpdGhGRCh1cmxqb2luKCd2MycsIGRvbWFpbiwgJ3doaXRlbGlzdHMnKSwgZGF0YSlcbiAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tUeXBlKHR5cGU6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5tb2RlbHMuaGFzKHR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IDQwMCxcbiAgICAgICAgc3RhdHVzVGV4dDogJ1Vua25vd24gdHlwZSB2YWx1ZScsXG4gICAgICAgIGJvZHk6IHsgbWVzc2FnZTogJ1R5cGUgbWF5IGJlIG9ubHkgb25lIG9mIFtib3VuY2VzLCBjb21wbGFpbnRzLCB1bnN1YnNjcmliZXMsIHdoaXRlbGlzdHNdJyB9XG4gICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlUmVzcG9uc2UocmVzcG9uc2U6IFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSk6IFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICB0eXBlOiByZXNwb25zZS5ib2R5LnR5cGUgfHwgJycsXG4gICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgfTtcbiAgfVxuXG4gIGxpc3QoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIHF1ZXJ5PzogU3VwcHJlc3Npb25MaXN0UXVlcnlcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkxpc3Q+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcblxuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbHMuZ2V0KHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5nZXQodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogU3VwcHJlc3Npb25MaXN0UmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTGlzdChyZXNwb25zZSwgbW9kZWwpKTtcbiAgfVxuXG4gIGdldChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgYWRkcmVzczogc3RyaW5nXG4gICk6IFByb21pc2U8Qm91bmNlIHwgQ29tcGxhaW50IHwgVW5zdWJzY3JpYmUgfCBXaGl0ZUxpc3Q+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcblxuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbHMuZ2V0KHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5nZXQodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IFN1cHByZXNzaW9uUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlSXRlbTx0eXBlb2YgbW9kZWw+KHJlc3BvbnNlLmJvZHksIG1vZGVsKSk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcbiAgICAvLyBzdXBwb3J0cyBhZGRpbmcgbXVsdGlwbGUgc3VwcHJlc3Npb25zIGJ5IGRlZmF1bHRcbiAgICBsZXQgcG9zdERhdGE7XG4gICAgaWYgKHR5cGUgPT09ICd3aGl0ZWxpc3RzJykge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlV2hpdGVMaXN0KGRvbWFpbiwgZGF0YSk7XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICBwb3N0RGF0YSA9IFtkYXRhXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zdERhdGEgPSBbLi4uZGF0YV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLnBvc3QodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUpLCBKU09OLnN0cmluZ2lmeShwb3N0RGF0YSksIGNyZWF0ZU9wdGlvbnMpXG4gICAgICAudGhlbih0aGlzLnByZXBhcmVSZXNwb25zZSk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQ+IHtcbiAgICB0aGlzLmNoZWNrVHlwZSh0eXBlKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAuZGVsZXRlKHVybGpvaW4oJ3YzJywgZG9tYWluLCB0eXBlLCBlbmNvZGVVUklDb21wb25lbnQoYWRkcmVzcykpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZSkgPT4gKHtcbiAgICAgICAgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlLFxuICAgICAgICB2YWx1ZTogcmVzcG9uc2UuYm9keS52YWx1ZSB8fCAnJyxcbiAgICAgICAgYWRkcmVzczogcmVzcG9uc2UuYm9keS5hZGRyZXNzIHx8ICcnLFxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgfSkpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3VwcHJlc3Npb25DbGllbnQ7XG4iLCJpbXBvcnQgQVBJUmVzcG9uc2UgZnJvbSAnLi9pbnRlcmZhY2VzL0FwaVJlc3BvbnNlJztcbmltcG9ydCB7IElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgfSBmcm9tICcuL2ludGVyZmFjZXMvTXVsdGlwbGVWYWxpZGF0aW9uJztcbmltcG9ydCB7IFZhbGlkYXRpb25SZXN1bHQsIFZhbGlkYXRpb25SZXNwb25zZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9WYWxpZGF0ZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWxpZGF0ZUNsaWVudCB7XG4gIHB1YmxpYyBtdWx0aXBsZVZhbGlkYXRpb247XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50OiBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLm11bHRpcGxlVmFsaWRhdGlvbiA9IG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudDtcbiAgfVxuXG4gIGdldChhZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPFZhbGlkYXRpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUnLCB7IGFkZHJlc3MgfSlcbiAgICAgIC50aGVuKChyZXNwb25zZSA6IEFQSVJlc3BvbnNlKSA9PiByZXNwb25zZSlcbiAgICAgIC50aGVuKChyZXMgOiBWYWxpZGF0aW9uUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIFZhbGlkYXRpb25SZXN1bHQpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5cbmltcG9ydCB7XG4gIFZhbGlkYXRpb25SZXNwb25zZSxcbiAgV2ViaG9va0xpc3QsXG4gIFdlYmhvb2tSZXNwb25zZSxcbiAgV2ViaG9va3NJZHMsXG4gIFdlYmhvb2tzUXVlcnlcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL1dlYmhvb2tzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmNsYXNzIFdlYmhvb2sge1xuICBpZDogc3RyaW5nO1xuICB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCB1cmw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJob29rQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tMaXN0KHJlc3BvbnNlOiB7IGJvZHk6IHsgd2ViaG9va3M6IFdlYmhvb2tMaXN0IH0gfSk6IFdlYmhvb2tMaXN0IHtcbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keS53ZWJob29rcztcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tXaXRoSUQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2U6IFdlYmhvb2tSZXNwb25zZSk6IFdlYmhvb2sge1xuICAgICAgY29uc3Qgd2ViaG9va1Jlc3BvbnNlID0gcmVzcG9uc2U/LmJvZHk/LndlYmhvb2s7XG4gICAgICBsZXQgdXJsID0gd2ViaG9va1Jlc3BvbnNlPy51cmw7XG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICB1cmwgPSB3ZWJob29rUmVzcG9uc2U/LnVybHMgJiYgd2ViaG9va1Jlc3BvbnNlLnVybHMubGVuZ3RoXG4gICAgICAgICAgPyB3ZWJob29rUmVzcG9uc2UudXJsc1swXVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBXZWJob29rKGlkLCB1cmwpO1xuICAgIH07XG4gIH1cblxuICBfcGFyc2VXZWJob29rVGVzdChyZXNwb25zZTogeyBib2R5OiB7IGNvZGU6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nIH0gfSlcbiAgOiB7Y29kZTogbnVtYmVyLCBtZXNzYWdlOnN0cmluZ30ge1xuICAgIHJldHVybiB7IGNvZGU6IHJlc3BvbnNlLmJvZHkuY29kZSwgbWVzc2FnZTogcmVzcG9uc2UuYm9keS5tZXNzYWdlIH0gYXMgVmFsaWRhdGlvblJlc3BvbnNlO1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk6IFdlYmhvb2tzUXVlcnkpOiBQcm9taXNlPFdlYmhvb2tMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCBxdWVyeSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va0xpc3QpO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCBpZDogV2ViaG9va3NJZHMpOiBQcm9taXNlPFdlYmhvb2s+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsXG4gICAgaWQ6IHN0cmluZyxcbiAgICB1cmw6IHN0cmluZyxcbiAgICB0ZXN0ID0gZmFsc2UpOiBQcm9taXNlPFdlYmhvb2sgfCBWYWxpZGF0aW9uUmVzcG9uc2U+IHtcbiAgICBpZiAodGVzdCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkLCAndGVzdCcpLCB7IHVybCB9KVxuICAgICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tUZXN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycpLCB7IGlkLCB1cmwgfSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgdXBkYXRlKGRvbWFpbjogc3RyaW5nLCBpZDogc3RyaW5nLCB1cmw6IHN0cmluZyk6IFByb21pc2U8V2ViaG9vaz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCksIHsgdXJsIH0pXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIGlkOiBzdHJpbmcpIDogUHJvbWlzZTxXZWJob29rPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG59XG4iLCIvKiEgaHR0cHM6Ly9tdGhzLmJlL2Jhc2U2NCB2MS4wLjAgYnkgQG1hdGhpYXMgfCBNSVQgbGljZW5zZSAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGVzIGBleHBvcnRzYC5cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC5cblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLCBhbmQgdXNlXG5cdC8vIGl0IGFzIGByb290YC5cblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgSW52YWxpZENoYXJhY3RlckVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH07XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5cdEludmFsaWRDaGFyYWN0ZXJFcnJvci5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5cdHZhciBlcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcblx0XHQvLyBOb3RlOiB0aGUgZXJyb3IgbWVzc2FnZXMgdXNlZCB0aHJvdWdob3V0IHRoaXMgZmlsZSBtYXRjaCB0aG9zZSB1c2VkIGJ5XG5cdFx0Ly8gdGhlIG5hdGl2ZSBgYXRvYmAvYGJ0b2FgIGltcGxlbWVudGF0aW9uIGluIENocm9taXVtLlxuXHRcdHRocm93IG5ldyBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IobWVzc2FnZSk7XG5cdH07XG5cblx0dmFyIFRBQkxFID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXHQvLyBodHRwOi8vd2hhdHdnLm9yZy9odG1sL2NvbW1vbi1taWNyb3N5bnRheGVzLmh0bWwjc3BhY2UtY2hhcmFjdGVyXG5cdHZhciBSRUdFWF9TUEFDRV9DSEFSQUNURVJTID0gL1tcXHRcXG5cXGZcXHIgXS9nO1xuXG5cdC8vIGBkZWNvZGVgIGlzIGRlc2lnbmVkIHRvIGJlIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBgYXRvYmAgYXMgZGVzY3JpYmVkIGluIHRoZVxuXHQvLyBIVE1MIFN0YW5kYXJkLiBodHRwOi8vd2hhdHdnLm9yZy9odG1sL3dlYmFwcGFwaXMuaHRtbCNkb20td2luZG93YmFzZTY0LWF0b2Jcblx0Ly8gVGhlIG9wdGltaXplZCBiYXNlNjQtZGVjb2RpbmcgYWxnb3JpdGhtIHVzZWQgaXMgYmFzZWQgb24gQGF0a+KAmXMgZXhjZWxsZW50XG5cdC8vIGltcGxlbWVudGF0aW9uLiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9hdGsvMTAyMDM5NlxuXHR2YXIgZGVjb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dClcblx0XHRcdC5yZXBsYWNlKFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMsICcnKTtcblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdGlmIChsZW5ndGggJSA0ID09IDApIHtcblx0XHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZSgvPT0/JC8sICcnKTtcblx0XHRcdGxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0bGVuZ3RoICUgNCA9PSAxIHx8XG5cdFx0XHQvLyBodHRwOi8vd2hhdHdnLm9yZy9DI2FscGhhbnVtZXJpYy1hc2NpaS1jaGFyYWN0ZXJzXG5cdFx0XHQvW14rYS16QS1aMC05L10vLnRlc3QoaW5wdXQpXG5cdFx0KSB7XG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J0ludmFsaWQgY2hhcmFjdGVyOiB0aGUgc3RyaW5nIHRvIGJlIGRlY29kZWQgaXMgbm90IGNvcnJlY3RseSBlbmNvZGVkLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBiaXRDb3VudGVyID0gMDtcblx0XHR2YXIgYml0U3RvcmFnZTtcblx0XHR2YXIgYnVmZmVyO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR2YXIgcG9zaXRpb24gPSAtMTtcblx0XHR3aGlsZSAoKytwb3NpdGlvbiA8IGxlbmd0aCkge1xuXHRcdFx0YnVmZmVyID0gVEFCTEUuaW5kZXhPZihpbnB1dC5jaGFyQXQocG9zaXRpb24pKTtcblx0XHRcdGJpdFN0b3JhZ2UgPSBiaXRDb3VudGVyICUgNCA/IGJpdFN0b3JhZ2UgKiA2NCArIGJ1ZmZlciA6IGJ1ZmZlcjtcblx0XHRcdC8vIFVubGVzcyB0aGlzIGlzIHRoZSBmaXJzdCBvZiBhIGdyb3VwIG9mIDQgY2hhcmFjdGVyc+KAplxuXHRcdFx0aWYgKGJpdENvdW50ZXIrKyAlIDQpIHtcblx0XHRcdFx0Ly8g4oCmY29udmVydCB0aGUgZmlyc3QgOCBiaXRzIHRvIGEgc2luZ2xlIEFTQ0lJIGNoYXJhY3Rlci5cblx0XHRcdFx0b3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdFx0XHRcdFx0MHhGRiAmIGJpdFN0b3JhZ2UgPj4gKC0yICogYml0Q291bnRlciAmIDYpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH07XG5cblx0Ly8gYGVuY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBidG9hYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQ6IGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYnRvYVxuXHR2YXIgZW5jb2RlID0gZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRpbnB1dCA9IFN0cmluZyhpbnB1dCk7XG5cdFx0aWYgKC9bXlxcMC1cXHhGRl0vLnRlc3QoaW5wdXQpKSB7XG5cdFx0XHQvLyBOb3RlOiBubyBuZWVkIHRvIHNwZWNpYWwtY2FzZSBhc3RyYWwgc3ltYm9scyBoZXJlLCBhcyBzdXJyb2dhdGVzIGFyZVxuXHRcdFx0Ly8gbWF0Y2hlZCwgYW5kIHRoZSBpbnB1dCBpcyBzdXBwb3NlZCB0byBvbmx5IGNvbnRhaW4gQVNDSUkgYW55d2F5LlxuXHRcdFx0ZXJyb3IoXG5cdFx0XHRcdCdUaGUgc3RyaW5nIHRvIGJlIGVuY29kZWQgY29udGFpbnMgY2hhcmFjdGVycyBvdXRzaWRlIG9mIHRoZSAnICtcblx0XHRcdFx0J0xhdGluMSByYW5nZS4nXG5cdFx0XHQpO1xuXHRcdH1cblx0XHR2YXIgcGFkZGluZyA9IGlucHV0Lmxlbmd0aCAlIDM7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHZhciBhO1xuXHRcdHZhciBiO1xuXHRcdHZhciBjO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0Ly8gTWFrZSBzdXJlIGFueSBwYWRkaW5nIGlzIGhhbmRsZWQgb3V0c2lkZSBvZiB0aGUgbG9vcC5cblx0XHR2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoIC0gcGFkZGluZztcblxuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHQvLyBSZWFkIHRocmVlIGJ5dGVzLCBpLmUuIDI0IGJpdHMuXG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgMTY7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKSA8PCA4O1xuXHRcdFx0YyA9IGlucHV0LmNoYXJDb2RlQXQoKytwb3NpdGlvbik7XG5cdFx0XHRidWZmZXIgPSBhICsgYiArIGM7XG5cdFx0XHQvLyBUdXJuIHRoZSAyNCBiaXRzIGludG8gZm91ciBjaHVua3Mgb2YgNiBiaXRzIGVhY2gsIGFuZCBhcHBlbmQgdGhlXG5cdFx0XHQvLyBtYXRjaGluZyBjaGFyYWN0ZXIgZm9yIGVhY2ggb2YgdGhlbSB0byB0aGUgb3V0cHV0LlxuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxOCAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMiAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiA2ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyICYgMHgzRilcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHBhZGRpbmcgPT0gMikge1xuXHRcdFx0YSA9IGlucHV0LmNoYXJDb2RlQXQocG9zaXRpb24pIDw8IDg7XG5cdFx0XHRiID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiO1xuXHRcdFx0b3V0cHV0ICs9IChcblx0XHRcdFx0VEFCTEUuY2hhckF0KGJ1ZmZlciA+PiAxMCkgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA+PiA0KSAmIDB4M0YpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgMikgJiAweDNGKSArXG5cdFx0XHRcdCc9J1xuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKHBhZGRpbmcgPT0gMSkge1xuXHRcdFx0YnVmZmVyID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbik7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDIpICtcblx0XHRcdFx0VEFCTEUuY2hhckF0KChidWZmZXIgPDwgNCkgJiAweDNGKSArXG5cdFx0XHRcdCc9PSdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHR2YXIgYmFzZTY0ID0ge1xuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J2RlY29kZSc6IGRlY29kZSxcblx0XHQndmVyc2lvbic6ICcxLjAuMCdcblx0fTtcblxuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBiYXNlNjQ7XG5cdFx0fSk7XG5cdH1cdGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBiYXNlNjQ7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAodmFyIGtleSBpbiBiYXNlNjQpIHtcblx0XHRcdFx0YmFzZTY0Lmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBiYXNlNjRba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC5iYXNlNjQgPSBiYXNlNjQ7XG5cdH1cblxufSh0aGlzKSk7XG4iLCJleHBvcnQge2RlZmF1bHR9IGZyb20gJ2t5JztcbiIsIi8qISBNSVQgTGljZW5zZSDCqSBTaW5kcmUgU29yaHVzICovXG5cbmNvbnN0IGdsb2JhbHMgPSB7fTtcblxuY29uc3QgZ2V0R2xvYmFsID0gcHJvcGVydHkgPT4ge1xuXHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgJiYgcHJvcGVydHkgaW4gc2VsZikge1xuXHRcdHJldHVybiBzZWxmO1xuXHR9XG5cblx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdyAmJiBwcm9wZXJ0eSBpbiB3aW5kb3cpIHtcblx0XHRyZXR1cm4gd2luZG93O1xuXHR9XG5cblx0aWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbCAmJiBwcm9wZXJ0eSBpbiBnbG9iYWwpIHtcblx0XHRyZXR1cm4gZ2xvYmFsO1xuXHR9XG5cblx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWxUaGlzKSB7XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXM7XG5cdH1cbn07XG5cbmNvbnN0IGdsb2JhbFByb3BlcnRpZXMgPSBbXG5cdCdIZWFkZXJzJyxcblx0J1JlcXVlc3QnLFxuXHQnUmVzcG9uc2UnLFxuXHQnUmVhZGFibGVTdHJlYW0nLFxuXHQnZmV0Y2gnLFxuXHQnQWJvcnRDb250cm9sbGVyJyxcblx0J0Zvcm1EYXRhJ1xuXTtcblxuZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBnbG9iYWxQcm9wZXJ0aWVzKSB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnbG9iYWxzLCBwcm9wZXJ0eSwge1xuXHRcdGdldCgpIHtcblx0XHRcdGNvbnN0IGdsb2JhbE9iamVjdCA9IGdldEdsb2JhbChwcm9wZXJ0eSk7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IGdsb2JhbE9iamVjdCAmJiBnbG9iYWxPYmplY3RbcHJvcGVydHldO1xuXHRcdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLmJpbmQoZ2xvYmFsT2JqZWN0KSA6IHZhbHVlO1xuXHRcdH1cblx0fSk7XG59XG5cbmNvbnN0IGlzT2JqZWN0ID0gdmFsdWUgPT4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JztcbmNvbnN0IHN1cHBvcnRzQWJvcnRDb250cm9sbGVyID0gdHlwZW9mIGdsb2JhbHMuQWJvcnRDb250cm9sbGVyID09PSAnZnVuY3Rpb24nO1xuY29uc3Qgc3VwcG9ydHNTdHJlYW1zID0gdHlwZW9mIGdsb2JhbHMuUmVhZGFibGVTdHJlYW0gPT09ICdmdW5jdGlvbic7XG5jb25zdCBzdXBwb3J0c0Zvcm1EYXRhID0gdHlwZW9mIGdsb2JhbHMuRm9ybURhdGEgPT09ICdmdW5jdGlvbic7XG5cbmNvbnN0IG1lcmdlSGVhZGVycyA9IChzb3VyY2UxLCBzb3VyY2UyKSA9PiB7XG5cdGNvbnN0IHJlc3VsdCA9IG5ldyBnbG9iYWxzLkhlYWRlcnMoc291cmNlMSB8fCB7fSk7XG5cdGNvbnN0IGlzSGVhZGVyc0luc3RhbmNlID0gc291cmNlMiBpbnN0YW5jZW9mIGdsb2JhbHMuSGVhZGVycztcblx0Y29uc3Qgc291cmNlID0gbmV3IGdsb2JhbHMuSGVhZGVycyhzb3VyY2UyIHx8IHt9KTtcblxuXHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBzb3VyY2UpIHtcblx0XHRpZiAoKGlzSGVhZGVyc0luc3RhbmNlICYmIHZhbHVlID09PSAndW5kZWZpbmVkJykgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmVzdWx0LmRlbGV0ZShrZXkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQuc2V0KGtleSwgdmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBkZWVwTWVyZ2UgPSAoLi4uc291cmNlcykgPT4ge1xuXHRsZXQgcmV0dXJuVmFsdWUgPSB7fTtcblx0bGV0IGhlYWRlcnMgPSB7fTtcblxuXHRmb3IgKGNvbnN0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuXHRcdFx0aWYgKCEoQXJyYXkuaXNBcnJheShyZXR1cm5WYWx1ZSkpKSB7XG5cdFx0XHRcdHJldHVyblZhbHVlID0gW107XG5cdFx0XHR9XG5cblx0XHRcdHJldHVyblZhbHVlID0gWy4uLnJldHVyblZhbHVlLCAuLi5zb3VyY2VdO1xuXHRcdH0gZWxzZSBpZiAoaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdFx0Zm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHNvdXJjZSkpIHtcblx0XHRcdFx0aWYgKGlzT2JqZWN0KHZhbHVlKSAmJiAoa2V5IGluIHJldHVyblZhbHVlKSkge1xuXHRcdFx0XHRcdHZhbHVlID0gZGVlcE1lcmdlKHJldHVyblZhbHVlW2tleV0sIHZhbHVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVyblZhbHVlID0gey4uLnJldHVyblZhbHVlLCBba2V5XTogdmFsdWV9O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNPYmplY3Qoc291cmNlLmhlYWRlcnMpKSB7XG5cdFx0XHRcdGhlYWRlcnMgPSBtZXJnZUhlYWRlcnMoaGVhZGVycywgc291cmNlLmhlYWRlcnMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVyblZhbHVlLmhlYWRlcnMgPSBoZWFkZXJzO1xuXHR9XG5cblx0cmV0dXJuIHJldHVyblZhbHVlO1xufTtcblxuY29uc3QgcmVxdWVzdE1ldGhvZHMgPSBbXG5cdCdnZXQnLFxuXHQncG9zdCcsXG5cdCdwdXQnLFxuXHQncGF0Y2gnLFxuXHQnaGVhZCcsXG5cdCdkZWxldGUnXG5dO1xuXG5jb25zdCByZXNwb25zZVR5cGVzID0ge1xuXHRqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG5cdHRleHQ6ICd0ZXh0LyonLFxuXHRmb3JtRGF0YTogJ211bHRpcGFydC9mb3JtLWRhdGEnLFxuXHRhcnJheUJ1ZmZlcjogJyovKicsXG5cdGJsb2I6ICcqLyonXG59O1xuXG5jb25zdCByZXRyeU1ldGhvZHMgPSBbXG5cdCdnZXQnLFxuXHQncHV0Jyxcblx0J2hlYWQnLFxuXHQnZGVsZXRlJyxcblx0J29wdGlvbnMnLFxuXHQndHJhY2UnXG5dO1xuXG5jb25zdCByZXRyeVN0YXR1c0NvZGVzID0gW1xuXHQ0MDgsXG5cdDQxMyxcblx0NDI5LFxuXHQ1MDAsXG5cdDUwMixcblx0NTAzLFxuXHQ1MDRcbl07XG5cbmNvbnN0IHJldHJ5QWZ0ZXJTdGF0dXNDb2RlcyA9IFtcblx0NDEzLFxuXHQ0MjksXG5cdDUwM1xuXTtcblxuY29uc3Qgc3RvcCA9IFN5bWJvbCgnc3RvcCcpO1xuXG5jbGFzcyBIVFRQRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKHJlc3BvbnNlKSB7XG5cdFx0Ly8gU2V0IHRoZSBtZXNzYWdlIHRvIHRoZSBzdGF0dXMgdGV4dCwgc3VjaCBhcyBVbmF1dGhvcml6ZWQsXG5cdFx0Ly8gd2l0aCBzb21lIGZhbGxiYWNrcy4gVGhpcyBtZXNzYWdlIHNob3VsZCBuZXZlciBiZSB1bmRlZmluZWQuXG5cdFx0c3VwZXIoXG5cdFx0XHRyZXNwb25zZS5zdGF0dXNUZXh0IHx8XG5cdFx0XHRTdHJpbmcoXG5cdFx0XHRcdChyZXNwb25zZS5zdGF0dXMgPT09IDAgfHwgcmVzcG9uc2Uuc3RhdHVzKSA/XG5cdFx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzIDogJ1Vua25vd24gcmVzcG9uc2UgZXJyb3InXG5cdFx0XHQpXG5cdFx0KTtcblx0XHR0aGlzLm5hbWUgPSAnSFRUUEVycm9yJztcblx0XHR0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG5cdH1cbn1cblxuY2xhc3MgVGltZW91dEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihyZXF1ZXN0KSB7XG5cdFx0c3VwZXIoJ1JlcXVlc3QgdGltZWQgb3V0Jyk7XG5cdFx0dGhpcy5uYW1lID0gJ1RpbWVvdXRFcnJvcic7XG5cdFx0dGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcblx0fVxufVxuXG5jb25zdCBkZWxheSA9IG1zID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuXG4vLyBgUHJvbWlzZS5yYWNlKClgIHdvcmthcm91bmQgKCM5MSlcbmNvbnN0IHRpbWVvdXQgPSAocmVxdWVzdCwgYWJvcnRDb250cm9sbGVyLCBvcHRpb25zKSA9PlxuXHRuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3QgdGltZW91dElEID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRpZiAoYWJvcnRDb250cm9sbGVyKSB7XG5cdFx0XHRcdGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZWplY3QobmV3IFRpbWVvdXRFcnJvcihyZXF1ZXN0KSk7XG5cdFx0fSwgb3B0aW9ucy50aW1lb3V0KTtcblxuXHRcdC8qIGVzbGludC1kaXNhYmxlIHByb21pc2UvcHJlZmVyLWF3YWl0LXRvLXRoZW4gKi9cblx0XHRvcHRpb25zLmZldGNoKHJlcXVlc3QpXG5cdFx0XHQudGhlbihyZXNvbHZlKVxuXHRcdFx0LmNhdGNoKHJlamVjdClcblx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG5cdFx0XHR9KTtcblx0XHQvKiBlc2xpbnQtZW5hYmxlIHByb21pc2UvcHJlZmVyLWF3YWl0LXRvLXRoZW4gKi9cblx0fSk7XG5cbmNvbnN0IG5vcm1hbGl6ZVJlcXVlc3RNZXRob2QgPSBpbnB1dCA9PiByZXF1ZXN0TWV0aG9kcy5pbmNsdWRlcyhpbnB1dCkgPyBpbnB1dC50b1VwcGVyQ2FzZSgpIDogaW5wdXQ7XG5cbmNvbnN0IGRlZmF1bHRSZXRyeU9wdGlvbnMgPSB7XG5cdGxpbWl0OiAyLFxuXHRtZXRob2RzOiByZXRyeU1ldGhvZHMsXG5cdHN0YXR1c0NvZGVzOiByZXRyeVN0YXR1c0NvZGVzLFxuXHRhZnRlclN0YXR1c0NvZGVzOiByZXRyeUFmdGVyU3RhdHVzQ29kZXNcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVJldHJ5T3B0aW9ucyA9IChyZXRyeSA9IHt9KSA9PiB7XG5cdGlmICh0eXBlb2YgcmV0cnkgPT09ICdudW1iZXInKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLmRlZmF1bHRSZXRyeU9wdGlvbnMsXG5cdFx0XHRsaW1pdDogcmV0cnlcblx0XHR9O1xuXHR9XG5cblx0aWYgKHJldHJ5Lm1ldGhvZHMgJiYgIUFycmF5LmlzQXJyYXkocmV0cnkubWV0aG9kcykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3JldHJ5Lm1ldGhvZHMgbXVzdCBiZSBhbiBhcnJheScpO1xuXHR9XG5cblx0aWYgKHJldHJ5LnN0YXR1c0NvZGVzICYmICFBcnJheS5pc0FycmF5KHJldHJ5LnN0YXR1c0NvZGVzKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcigncmV0cnkuc3RhdHVzQ29kZXMgbXVzdCBiZSBhbiBhcnJheScpO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHQuLi5kZWZhdWx0UmV0cnlPcHRpb25zLFxuXHRcdC4uLnJldHJ5LFxuXHRcdGFmdGVyU3RhdHVzQ29kZXM6IHJldHJ5QWZ0ZXJTdGF0dXNDb2Rlc1xuXHR9O1xufTtcblxuLy8gVGhlIG1heGltdW0gdmFsdWUgb2YgYSAzMmJpdCBpbnQgKHNlZSBpc3N1ZSAjMTE3KVxuY29uc3QgbWF4U2FmZVRpbWVvdXQgPSAyMTQ3NDgzNjQ3O1xuXG5jbGFzcyBLeSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0LCBvcHRpb25zID0ge30pIHtcblx0XHR0aGlzLl9yZXRyeUNvdW50ID0gMDtcblx0XHR0aGlzLl9pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMuX29wdGlvbnMgPSB7XG5cdFx0XHQvLyBUT0RPOiBjcmVkZW50aWFscyBjYW4gYmUgcmVtb3ZlZCB3aGVuIHRoZSBzcGVjIGNoYW5nZSBpcyBpbXBsZW1lbnRlZCBpbiBhbGwgYnJvd3NlcnMuIENvbnRleHQ6IGh0dHBzOi8vd3d3LmNocm9tZXN0YXR1cy5jb20vZmVhdHVyZS80NTM5NDczMzEyMzUwMjA4XG5cdFx0XHRjcmVkZW50aWFsczogdGhpcy5faW5wdXQuY3JlZGVudGlhbHMgfHwgJ3NhbWUtb3JpZ2luJyxcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHRoZWFkZXJzOiBtZXJnZUhlYWRlcnModGhpcy5faW5wdXQuaGVhZGVycywgb3B0aW9ucy5oZWFkZXJzKSxcblx0XHRcdGhvb2tzOiBkZWVwTWVyZ2Uoe1xuXHRcdFx0XHRiZWZvcmVSZXF1ZXN0OiBbXSxcblx0XHRcdFx0YmVmb3JlUmV0cnk6IFtdLFxuXHRcdFx0XHRhZnRlclJlc3BvbnNlOiBbXVxuXHRcdFx0fSwgb3B0aW9ucy5ob29rcyksXG5cdFx0XHRtZXRob2Q6IG5vcm1hbGl6ZVJlcXVlc3RNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5faW5wdXQubWV0aG9kKSxcblx0XHRcdHByZWZpeFVybDogU3RyaW5nKG9wdGlvbnMucHJlZml4VXJsIHx8ICcnKSxcblx0XHRcdHJldHJ5OiBub3JtYWxpemVSZXRyeU9wdGlvbnMob3B0aW9ucy5yZXRyeSksXG5cdFx0XHR0aHJvd0h0dHBFcnJvcnM6IG9wdGlvbnMudGhyb3dIdHRwRXJyb3JzICE9PSBmYWxzZSxcblx0XHRcdHRpbWVvdXQ6IHR5cGVvZiBvcHRpb25zLnRpbWVvdXQgPT09ICd1bmRlZmluZWQnID8gMTAwMDAgOiBvcHRpb25zLnRpbWVvdXQsXG5cdFx0XHRmZXRjaDogb3B0aW9ucy5mZXRjaCB8fCBnbG9iYWxzLmZldGNoXG5cdFx0fTtcblxuXHRcdGlmICh0eXBlb2YgdGhpcy5faW5wdXQgIT09ICdzdHJpbmcnICYmICEodGhpcy5faW5wdXQgaW5zdGFuY2VvZiBVUkwgfHwgdGhpcy5faW5wdXQgaW5zdGFuY2VvZiBnbG9iYWxzLlJlcXVlc3QpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdgaW5wdXRgIG11c3QgYmUgYSBzdHJpbmcsIFVSTCwgb3IgUmVxdWVzdCcpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9vcHRpb25zLnByZWZpeFVybCAmJiB0eXBlb2YgdGhpcy5faW5wdXQgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAodGhpcy5faW5wdXQuc3RhcnRzV2l0aCgnLycpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignYGlucHV0YCBtdXN0IG5vdCBiZWdpbiB3aXRoIGEgc2xhc2ggd2hlbiB1c2luZyBgcHJlZml4VXJsYCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXRoaXMuX29wdGlvbnMucHJlZml4VXJsLmVuZHNXaXRoKCcvJykpIHtcblx0XHRcdFx0dGhpcy5fb3B0aW9ucy5wcmVmaXhVcmwgKz0gJy8nO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9pbnB1dCA9IHRoaXMuX29wdGlvbnMucHJlZml4VXJsICsgdGhpcy5faW5wdXQ7XG5cdFx0fVxuXG5cdFx0aWYgKHN1cHBvcnRzQWJvcnRDb250cm9sbGVyKSB7XG5cdFx0XHR0aGlzLmFib3J0Q29udHJvbGxlciA9IG5ldyBnbG9iYWxzLkFib3J0Q29udHJvbGxlcigpO1xuXHRcdFx0aWYgKHRoaXMuX29wdGlvbnMuc2lnbmFsKSB7XG5cdFx0XHRcdHRoaXMuX29wdGlvbnMuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuYWJvcnRDb250cm9sbGVyLmFib3J0KCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9vcHRpb25zLnNpZ25hbCA9IHRoaXMuYWJvcnRDb250cm9sbGVyLnNpZ25hbDtcblx0XHR9XG5cblx0XHR0aGlzLnJlcXVlc3QgPSBuZXcgZ2xvYmFscy5SZXF1ZXN0KHRoaXMuX2lucHV0LCB0aGlzLl9vcHRpb25zKTtcblxuXHRcdGlmICh0aGlzLl9vcHRpb25zLnNlYXJjaFBhcmFtcykge1xuXHRcdFx0Y29uc3Qgc2VhcmNoUGFyYW1zID0gJz8nICsgbmV3IFVSTFNlYXJjaFBhcmFtcyh0aGlzLl9vcHRpb25zLnNlYXJjaFBhcmFtcykudG9TdHJpbmcoKTtcblx0XHRcdGNvbnN0IHVybCA9IHRoaXMucmVxdWVzdC51cmwucmVwbGFjZSgvKD86XFw/Lio/KT8oPz0jfCQpLywgc2VhcmNoUGFyYW1zKTtcblxuXHRcdFx0Ly8gVG8gcHJvdmlkZSBjb3JyZWN0IGZvcm0gYm91bmRhcnksIENvbnRlbnQtVHlwZSBoZWFkZXIgc2hvdWxkIGJlIGRlbGV0ZWQgZWFjaCB0aW1lIHdoZW4gbmV3IFJlcXVlc3QgaW5zdGFudGlhdGVkIGZyb20gYW5vdGhlciBvbmVcblx0XHRcdGlmICgoKHN1cHBvcnRzRm9ybURhdGEgJiYgdGhpcy5fb3B0aW9ucy5ib2R5IGluc3RhbmNlb2YgZ2xvYmFscy5Gb3JtRGF0YSkgfHwgdGhpcy5fb3B0aW9ucy5ib2R5IGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSAmJiAhKHRoaXMuX29wdGlvbnMuaGVhZGVycyAmJiB0aGlzLl9vcHRpb25zLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddKSkge1xuXHRcdFx0XHR0aGlzLnJlcXVlc3QuaGVhZGVycy5kZWxldGUoJ2NvbnRlbnQtdHlwZScpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnJlcXVlc3QgPSBuZXcgZ2xvYmFscy5SZXF1ZXN0KG5ldyBnbG9iYWxzLlJlcXVlc3QodXJsLCB0aGlzLnJlcXVlc3QpLCB0aGlzLl9vcHRpb25zKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb3B0aW9ucy5qc29uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX29wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KHRoaXMuX29wdGlvbnMuanNvbik7XG5cdFx0XHR0aGlzLnJlcXVlc3QuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cdFx0XHR0aGlzLnJlcXVlc3QgPSBuZXcgZ2xvYmFscy5SZXF1ZXN0KHRoaXMucmVxdWVzdCwge2JvZHk6IHRoaXMuX29wdGlvbnMuYm9keX0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IGZuID0gYXN5bmMgKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuX29wdGlvbnMudGltZW91dCA+IG1heFNhZmVUaW1lb3V0KSB7XG5cdFx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKGBUaGUgXFxgdGltZW91dFxcYCBvcHRpb24gY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiAke21heFNhZmVUaW1lb3V0fWApO1xuXHRcdFx0fVxuXG5cdFx0XHRhd2FpdCBkZWxheSgxKTtcblx0XHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2ZldGNoKCk7XG5cblx0XHRcdGZvciAoY29uc3QgaG9vayBvZiB0aGlzLl9vcHRpb25zLmhvb2tzLmFmdGVyUmVzcG9uc2UpIHtcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3Bcblx0XHRcdFx0Y29uc3QgbW9kaWZpZWRSZXNwb25zZSA9IGF3YWl0IGhvb2soXG5cdFx0XHRcdFx0dGhpcy5yZXF1ZXN0LFxuXHRcdFx0XHRcdHRoaXMuX29wdGlvbnMsXG5cdFx0XHRcdFx0dGhpcy5fZGVjb3JhdGVSZXNwb25zZShyZXNwb25zZS5jbG9uZSgpKVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGlmIChtb2RpZmllZFJlc3BvbnNlIGluc3RhbmNlb2YgZ2xvYmFscy5SZXNwb25zZSkge1xuXHRcdFx0XHRcdHJlc3BvbnNlID0gbW9kaWZpZWRSZXNwb25zZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9kZWNvcmF0ZVJlc3BvbnNlKHJlc3BvbnNlKTtcblxuXHRcdFx0aWYgKCFyZXNwb25zZS5vayAmJiB0aGlzLl9vcHRpb25zLnRocm93SHR0cEVycm9ycykge1xuXHRcdFx0XHR0aHJvdyBuZXcgSFRUUEVycm9yKHJlc3BvbnNlKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYG9uRG93bmxvYWRQcm9ncmVzc2AgaXMgcGFzc2VkLCBpdCB1c2VzIHRoZSBzdHJlYW0gQVBJIGludGVybmFsbHlcblx0XHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdFx0XHRpZiAodGhpcy5fb3B0aW9ucy5vbkRvd25sb2FkUHJvZ3Jlc3MpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLl9vcHRpb25zLm9uRG93bmxvYWRQcm9ncmVzcyAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBgb25Eb3dubG9hZFByb2dyZXNzYCBvcHRpb24gbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIXN1cHBvcnRzU3RyZWFtcykge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignU3RyZWFtcyBhcmUgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGVudmlyb25tZW50LiBgUmVhZGFibGVTdHJlYW1gIGlzIG1pc3NpbmcuJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc3RyZWFtKHJlc3BvbnNlLmNsb25lKCksIHRoaXMuX29wdGlvbnMub25Eb3dubG9hZFByb2dyZXNzKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdH07XG5cblx0XHRjb25zdCBpc1JldHJpYWJsZU1ldGhvZCA9IHRoaXMuX29wdGlvbnMucmV0cnkubWV0aG9kcy5pbmNsdWRlcyh0aGlzLnJlcXVlc3QubWV0aG9kLnRvTG93ZXJDYXNlKCkpO1xuXHRcdGNvbnN0IHJlc3VsdCA9IGlzUmV0cmlhYmxlTWV0aG9kID8gdGhpcy5fcmV0cnkoZm4pIDogZm4oKTtcblxuXHRcdGZvciAoY29uc3QgW3R5cGUsIG1pbWVUeXBlXSBvZiBPYmplY3QuZW50cmllcyhyZXNwb25zZVR5cGVzKSkge1xuXHRcdFx0cmVzdWx0W3R5cGVdID0gYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnJlcXVlc3QuaGVhZGVycy5zZXQoJ2FjY2VwdCcsIHRoaXMucmVxdWVzdC5oZWFkZXJzLmdldCgnYWNjZXB0JykgfHwgbWltZVR5cGUpO1xuXG5cdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gKGF3YWl0IHJlc3VsdCkuY2xvbmUoKTtcblxuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2pzb24nKSB7XG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMucGFyc2VKc29uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gb3B0aW9ucy5wYXJzZUpzb24oYXdhaXQgcmVzcG9uc2UudGV4dCgpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcmVzcG9uc2VbdHlwZV0oKTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdF9jYWxjdWxhdGVSZXRyeURlbGF5KGVycm9yKSB7XG5cdFx0dGhpcy5fcmV0cnlDb3VudCsrO1xuXG5cdFx0aWYgKHRoaXMuX3JldHJ5Q291bnQgPCB0aGlzLl9vcHRpb25zLnJldHJ5LmxpbWl0ICYmICEoZXJyb3IgaW5zdGFuY2VvZiBUaW1lb3V0RXJyb3IpKSB7XG5cdFx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBIVFRQRXJyb3IpIHtcblx0XHRcdFx0aWYgKCF0aGlzLl9vcHRpb25zLnJldHJ5LnN0YXR1c0NvZGVzLmluY2x1ZGVzKGVycm9yLnJlc3BvbnNlLnN0YXR1cykpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHJldHJ5QWZ0ZXIgPSBlcnJvci5yZXNwb25zZS5oZWFkZXJzLmdldCgnUmV0cnktQWZ0ZXInKTtcblx0XHRcdFx0aWYgKHJldHJ5QWZ0ZXIgJiYgdGhpcy5fb3B0aW9ucy5yZXRyeS5hZnRlclN0YXR1c0NvZGVzLmluY2x1ZGVzKGVycm9yLnJlc3BvbnNlLnN0YXR1cykpIHtcblx0XHRcdFx0XHRsZXQgYWZ0ZXIgPSBOdW1iZXIocmV0cnlBZnRlcik7XG5cdFx0XHRcdFx0aWYgKE51bWJlci5pc05hTihhZnRlcikpIHtcblx0XHRcdFx0XHRcdGFmdGVyID0gRGF0ZS5wYXJzZShyZXRyeUFmdGVyKSAtIERhdGUubm93KCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGFmdGVyICo9IDEwMDA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLl9vcHRpb25zLnJldHJ5Lm1heFJldHJ5QWZ0ZXIgIT09ICd1bmRlZmluZWQnICYmIGFmdGVyID4gdGhpcy5fb3B0aW9ucy5yZXRyeS5tYXhSZXRyeUFmdGVyKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gYWZ0ZXI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MTMpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBCQUNLT0ZGX0ZBQ1RPUiA9IDAuMztcblx0XHRcdHJldHVybiBCQUNLT0ZGX0ZBQ1RPUiAqICgyICoqICh0aGlzLl9yZXRyeUNvdW50IC0gMSkpICogMTAwMDtcblx0XHR9XG5cblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdF9kZWNvcmF0ZVJlc3BvbnNlKHJlc3BvbnNlKSB7XG5cdFx0aWYgKHRoaXMuX29wdGlvbnMucGFyc2VKc29uKSB7XG5cdFx0XHRyZXNwb25zZS5qc29uID0gYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fb3B0aW9ucy5wYXJzZUpzb24oYXdhaXQgcmVzcG9uc2UudGV4dCgpKTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9XG5cblx0YXN5bmMgX3JldHJ5KGZuKSB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBhd2FpdCBmbigpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zdCBtcyA9IE1hdGgubWluKHRoaXMuX2NhbGN1bGF0ZVJldHJ5RGVsYXkoZXJyb3IpLCBtYXhTYWZlVGltZW91dCk7XG5cdFx0XHRpZiAobXMgIT09IDAgJiYgdGhpcy5fcmV0cnlDb3VudCA+IDApIHtcblx0XHRcdFx0YXdhaXQgZGVsYXkobXMpO1xuXG5cdFx0XHRcdGZvciAoY29uc3QgaG9vayBvZiB0aGlzLl9vcHRpb25zLmhvb2tzLmJlZm9yZVJldHJ5KSB7XG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3Bcblx0XHRcdFx0XHRjb25zdCBob29rUmVzdWx0ID0gYXdhaXQgaG9vayh7XG5cdFx0XHRcdFx0XHRyZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXG5cdFx0XHRcdFx0XHRvcHRpb25zOiB0aGlzLl9vcHRpb25zLFxuXHRcdFx0XHRcdFx0ZXJyb3IsXG5cdFx0XHRcdFx0XHRyZXRyeUNvdW50OiB0aGlzLl9yZXRyeUNvdW50XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvLyBJZiBgc3RvcGAgaXMgcmV0dXJuZWQgZnJvbSB0aGUgaG9vaywgdGhlIHJldHJ5IHByb2Nlc3MgaXMgc3RvcHBlZFxuXHRcdFx0XHRcdGlmIChob29rUmVzdWx0ID09PSBzdG9wKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMuX3JldHJ5KGZuKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX29wdGlvbnMudGhyb3dIdHRwRXJyb3JzKSB7XG5cdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFzeW5jIF9mZXRjaCgpIHtcblx0XHRmb3IgKGNvbnN0IGhvb2sgb2YgdGhpcy5fb3B0aW9ucy5ob29rcy5iZWZvcmVSZXF1ZXN0KSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuXHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgaG9vayh0aGlzLnJlcXVlc3QsIHRoaXMuX29wdGlvbnMpO1xuXG5cdFx0XHRpZiAocmVzdWx0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuXHRcdFx0XHR0aGlzLnJlcXVlc3QgPSByZXN1bHQ7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocmVzdWx0IGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb3B0aW9ucy50aW1lb3V0ID09PSBmYWxzZSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX29wdGlvbnMuZmV0Y2godGhpcy5yZXF1ZXN0LmNsb25lKCkpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aW1lb3V0KHRoaXMucmVxdWVzdC5jbG9uZSgpLCB0aGlzLmFib3J0Q29udHJvbGxlciwgdGhpcy5fb3B0aW9ucyk7XG5cdH1cblxuXHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRfc3RyZWFtKHJlc3BvbnNlLCBvbkRvd25sb2FkUHJvZ3Jlc3MpIHtcblx0XHRjb25zdCB0b3RhbEJ5dGVzID0gTnVtYmVyKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpKSB8fCAwO1xuXHRcdGxldCB0cmFuc2ZlcnJlZEJ5dGVzID0gMDtcblxuXHRcdHJldHVybiBuZXcgZ2xvYmFscy5SZXNwb25zZShcblx0XHRcdG5ldyBnbG9iYWxzLlJlYWRhYmxlU3RyZWFtKHtcblx0XHRcdFx0c3RhcnQoY29udHJvbGxlcikge1xuXHRcdFx0XHRcdGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCk7XG5cblx0XHRcdFx0XHRpZiAob25Eb3dubG9hZFByb2dyZXNzKSB7XG5cdFx0XHRcdFx0XHRvbkRvd25sb2FkUHJvZ3Jlc3Moe3BlcmNlbnQ6IDAsIHRyYW5zZmVycmVkQnl0ZXM6IDAsIHRvdGFsQnl0ZXN9LCBuZXcgVWludDhBcnJheSgpKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhc3luYyBmdW5jdGlvbiByZWFkKCkge1xuXHRcdFx0XHRcdFx0Y29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG5cdFx0XHRcdFx0XHRpZiAoZG9uZSkge1xuXHRcdFx0XHRcdFx0XHRjb250cm9sbGVyLmNsb3NlKCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKG9uRG93bmxvYWRQcm9ncmVzcykge1xuXHRcdFx0XHRcdFx0XHR0cmFuc2ZlcnJlZEJ5dGVzICs9IHZhbHVlLmJ5dGVMZW5ndGg7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBlcmNlbnQgPSB0b3RhbEJ5dGVzID09PSAwID8gMCA6IHRyYW5zZmVycmVkQnl0ZXMgLyB0b3RhbEJ5dGVzO1xuXHRcdFx0XHRcdFx0XHRvbkRvd25sb2FkUHJvZ3Jlc3Moe3BlcmNlbnQsIHRyYW5zZmVycmVkQnl0ZXMsIHRvdGFsQnl0ZXN9LCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnRyb2xsZXIuZW5xdWV1ZSh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRyZWFkKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVhZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdCk7XG5cdH1cbn1cblxuY29uc3QgdmFsaWRhdGVBbmRNZXJnZSA9ICguLi5zb3VyY2VzKSA9PiB7XG5cdGZvciAoY29uc3Qgc291cmNlIG9mIHNvdXJjZXMpIHtcblx0XHRpZiAoKCFpc09iamVjdChzb3VyY2UpIHx8IEFycmF5LmlzQXJyYXkoc291cmNlKSkgJiYgdHlwZW9mIHNvdXJjZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBgb3B0aW9uc2AgYXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QnKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGVlcE1lcmdlKHt9LCAuLi5zb3VyY2VzKTtcbn07XG5cbmNvbnN0IGNyZWF0ZUluc3RhbmNlID0gZGVmYXVsdHMgPT4ge1xuXHRjb25zdCBreSA9IChpbnB1dCwgb3B0aW9ucykgPT4gbmV3IEt5KGlucHV0LCB2YWxpZGF0ZUFuZE1lcmdlKGRlZmF1bHRzLCBvcHRpb25zKSk7XG5cblx0Zm9yIChjb25zdCBtZXRob2Qgb2YgcmVxdWVzdE1ldGhvZHMpIHtcblx0XHRreVttZXRob2RdID0gKGlucHV0LCBvcHRpb25zKSA9PiBuZXcgS3koaW5wdXQsIHZhbGlkYXRlQW5kTWVyZ2UoZGVmYXVsdHMsIG9wdGlvbnMsIHttZXRob2R9KSk7XG5cdH1cblxuXHRreS5IVFRQRXJyb3IgPSBIVFRQRXJyb3I7XG5cdGt5LlRpbWVvdXRFcnJvciA9IFRpbWVvdXRFcnJvcjtcblx0a3kuY3JlYXRlID0gbmV3RGVmYXVsdHMgPT4gY3JlYXRlSW5zdGFuY2UodmFsaWRhdGVBbmRNZXJnZShuZXdEZWZhdWx0cykpO1xuXHRreS5leHRlbmQgPSBuZXdEZWZhdWx0cyA9PiBjcmVhdGVJbnN0YW5jZSh2YWxpZGF0ZUFuZE1lcmdlKGRlZmF1bHRzLCBuZXdEZWZhdWx0cykpO1xuXHRreS5zdG9wID0gc3RvcDtcblxuXHRyZXR1cm4ga3k7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVJbnN0YW5jZSgpO1xuIiwiKGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pO1xuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG59KSgndXJsam9pbicsIHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBub3JtYWxpemUgKHN0ckFycmF5KSB7XG4gICAgdmFyIHJlc3VsdEFycmF5ID0gW107XG4gICAgaWYgKHN0ckFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cblxuICAgIGlmICh0eXBlb2Ygc3RyQXJyYXlbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIHN0ckFycmF5WzBdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZmlyc3QgcGFydCBpcyBhIHBsYWluIHByb3RvY29sLCB3ZSBjb21iaW5lIGl0IHdpdGggdGhlIG5leHQgcGFydC5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15bXi86XSs6XFwvKiQvKSAmJiBzdHJBcnJheS5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgZmlyc3QgPSBzdHJBcnJheS5zaGlmdCgpO1xuICAgICAgc3RyQXJyYXlbMF0gPSBmaXJzdCArIHN0ckFycmF5WzBdO1xuICAgIH1cblxuICAgIC8vIFRoZXJlIG11c3QgYmUgdHdvIG9yIHRocmVlIHNsYXNoZXMgaW4gdGhlIGZpbGUgcHJvdG9jb2wsIHR3byBzbGFzaGVzIGluIGFueXRoaW5nIGVsc2UuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eZmlsZTpcXC9cXC9cXC8vKSkge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLycpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBzdHJBcnJheVtpXTtcblxuICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgY29tcG9uZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvbmVudCA9PT0gJycpIHsgY29udGludWU7IH1cblxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBzdGFydGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGZpcnN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvXltcXC9dKy8sICcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgc3RyQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgZW5kaW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgbGFzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3IgdGhlIGxhc3QgY29tcG9uZW50IHdlIHdpbGwgY29tYmluZSBtdWx0aXBsZSBzbGFzaGVzIHRvIGEgc2luZ2xlIG9uZS5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnLycpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRBcnJheS5wdXNoKGNvbXBvbmVudCk7XG5cbiAgICB9XG5cbiAgICB2YXIgc3RyID0gcmVzdWx0QXJyYXkuam9pbignLycpO1xuICAgIC8vIEVhY2ggaW5wdXQgY29tcG9uZW50IGlzIG5vdyBzZXBhcmF0ZWQgYnkgYSBzaW5nbGUgc2xhc2ggZXhjZXB0IHRoZSBwb3NzaWJsZSBmaXJzdCBwbGFpbiBwcm90b2NvbCBwYXJ0LlxuXG4gICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGJlZm9yZSBwYXJhbWV0ZXJzIG9yIGhhc2hcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFwvKFxcP3wmfCNbXiFdKS9nLCAnJDEnKTtcblxuICAgIC8vIHJlcGxhY2UgPyBpbiBwYXJhbWV0ZXJzIHdpdGggJlxuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnPycpO1xuICAgIHN0ciA9IHBhcnRzLnNoaWZ0KCkgKyAocGFydHMubGVuZ3RoID4gMCA/ICc/JzogJycpICsgcGFydHMuam9pbignJicpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlucHV0O1xuXG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpbnB1dCA9IGFyZ3VtZW50c1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShpbnB1dCk7XG4gIH07XG5cbn0pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ubWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbGliL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJmb3JtRGF0YSIsImNvbmZpZyIsIl9fYXNzaWduIiwidXJsIiwidXNlcm5hbWUiLCJFcnJvciIsImtleSIsInJlcXVlc3QiLCJyZXF1ZXN0XzEiLCJtYWlsTGlzdHNNZW1iZXJzIiwibWFpbExpc3RNZW1iZXJzXzEiLCJkb21haW5DcmVkZW50aWFsc0NsaWVudCIsImRvbWFpbnNDcmVkZW50aWFsc18xIiwiZG9tYWluVGVtcGxhdGVzQ2xpZW50IiwiZG9tYWluc1RlbXBsYXRlc18xIiwiZG9tYWluVGFnc0NsaWVudCIsImRvbWFpbnNUYWdzXzEiLCJtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJtdWx0aXBsZVZhbGlkYXRpb25fMSIsImRvbWFpbnMiLCJkb21haW5zXzEiLCJ3ZWJob29rcyIsIndlYmhvb2tzXzEiLCJldmVudHMiLCJldmVudHNfMSIsInN0YXRzIiwic3RhdHNfMSIsInN1cHByZXNzaW9ucyIsInN1cHByZXNzaW9uc18xIiwibWVzc2FnZXMiLCJtZXNzYWdlc18xIiwicm91dGVzIiwicm91dGVzXzEiLCJpcHMiLCJpcHNfMSIsImlwX3Bvb2xzIiwiaXBfcG9vbHNfMSIsImxpc3RzIiwibGlzdHNfMSIsInZhbGlkYXRlIiwidmFsaWRhdGVfMSIsImRhdGEiLCJyZWNlaXZpbmciLCJzZW5kaW5nIiwibmFtZSIsInJlcXVpcmVfdGxzIiwic2tpcF92ZXJpZmljYXRpb24iLCJzdGF0ZSIsIndpbGRjYXJkIiwic3BhbV9hY3Rpb24iLCJjcmVhdGVkX2F0Iiwic210cF9wYXNzd29yZCIsInNtdHBfbG9naW4iLCJ0eXBlIiwicmVjZWl2aW5nX2Ruc19yZWNvcmRzIiwic2VuZGluZ19kbnNfcmVjb3JkcyIsImV4cG9ydHMiLCJkb21haW5DcmVkZW50aWFscyIsImRvbWFpblRlbXBsYXRlcyIsImRvbWFpblRhZ3MiLCJEb21haW5DbGllbnQiLCJyZXNwb25zZSIsImJvZHkiLCJpdGVtcyIsIm1hcCIsIml0ZW0iLCJEb21haW4iLCJkb21haW4iLCJ0cmFja2luZyIsInF1ZXJ5IiwiZ2V0IiwidGhlbiIsInJlcyIsIl9wYXJzZURvbWFpbkxpc3QiLCJfcGFyc2VEb21haW4iLCJwb3N0T2JqIiwiZm9yY2VfZGtpbV9hdXRob3JpdHkiLCJ0b1N0cmluZyIsInBvc3RXaXRoRkQiLCJwdXQiLCJkZWxldGUiLCJfcGFyc2VNZXNzYWdlIiwiY29ubmVjdGlvbiIsIl9wYXJzZVRyYWNraW5nU2V0dGluZ3MiLCJhY3RpdmUiLCJlcnJvcl8xIiwic3RhdHVzIiwic3RhdHVzVGV4dCIsIm1lc3NhZ2UiLCJwdXRXaXRoRkQiLCJfcGFyc2VUcmFja2luZ1VwZGF0ZSIsIl9hIiwiaXAiLCJwb29sX2lkIiwicmVwbGFjZW1lbnQiLCJzZWFyY2hQYXJhbXMiLCJzZWxmIiwiZGtpbVNlbGVjdG9yIiwid2ViUHJlZml4IiwiYmFzZVJvdXRlIiwiRG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJ0b3RhbENvdW50IiwidG90YWxfY291bnQiLCJyZXN1bHQiLCJzcGVjIiwiX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0IiwiY29uY2F0IiwiX3BhcnNlTWVzc2FnZVJlc3BvbnNlIiwiY3JlZGVudGlhbHNMb2dpbiIsIl9wYXJzZURlbGV0ZWRSZXNwb25zZSIsInRhZ0luZm8iLCJ0YWciLCJkZXNjcmlwdGlvbiIsIkRhdGUiLCJ0YWdTdGF0aXN0aWNJbmZvIiwic3RhcnQiLCJlbmQiLCJyZXNvbHV0aW9uIiwic3RhdCIsInRpbWUiLCJEb21haW5UYWdzQ2xpZW50IiwicGFnZXMiLCJPYmplY3QiLCJlbnRyaWVzIiwicGFnaW5nIiwicmVkdWNlIiwiYWNjIiwiZW50cmllIiwiaWQiLCJEb21haW5UYWciLCJfcGFyc2VQYWdlTGlua3MiLCJEb21haW5UYWdTdGF0aXN0aWMiLCJfcGFyc2VEb21haW5UYWdzTGlzdCIsIl9wYXJzZVRhZ1N0YXRpc3RpYyIsImRvbWFpblRlbXBsYXRlRnJvbUFQSSIsImNyZWF0ZWRBdCIsImNyZWF0ZWRCeSIsInZlcnNpb24iLCJ2ZXJzaW9ucyIsImxlbmd0aCIsIkRvbWFpblRlbXBsYXRlc0NsaWVudCIsIkRvbWFpblRlbXBsYXRlSXRlbSIsInRlbXBsYXRlIiwidGVtcGxhdGVOYW1lIiwidGVtcGxhdGVWZXJzaW9uIiwiZCIsInBhcnNlTGlzdCIsInBhcnNlQ3JlYXRpb25SZXNwb25zZSIsInBhcnNlTXV0YXRpb25SZXNwb25zZSIsInBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UiLCJwYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlIiwicGFyc2VNdXRhdGVUZW1wbGF0ZVZlcnNpb25SZXNwb25zZSIsInBhcnNlTGlzdFRlbXBsYXRlVmVyc2lvbnMiLCJfX2V4dGVuZHMiLCJfYiIsImJvZHlNZXNzYWdlIiwiZXJyb3IiLCJfc3VwZXIiLCJfdGhpcyIsInN0YWNrIiwiZGV0YWlscyIsIkV2ZW50Q2xpZW50Iiwic3BsaXQiLCJwb3AiLCJudW1iZXIiLCJfcGFyc2VQYWdlTnVtYmVyIiwicGFpciIsIl9wYXJzZVBhZ2UiLCJxdWVyeUNvcHkiLCJwYWdlIiwiX3BhcnNlRXZlbnRMaXN0IiwiRm9ybURhdGEiLCJNYWlsZ3VuIiwiY2xpZW50XzEiLCJTdXBwcmVzc2lvbk1vZGVscyIsIklwUG9vbHNDbGllbnQiLCJwYXJzZUlwUG9vbHNSZXNwb25zZSIsInBvb2xJZCIsInBhdGNoV2l0aEZEIiwiSXBzQ2xpZW50IiwicGFyc2VJcHNSZXNwb25zZSIsIm1lbWJlcnMiLCJMaXN0c0NsaWVudCIsInZhbGlkYXRpb25SZXN1bHQiLCJtYWlsTGlzdEFkZHJlc3MiLCJsaXN0IiwicG9zdCIsInBhcnNlVmFsaWRhdGlvblJlc3VsdCIsIk1haWxMaXN0c01lbWJlcnMiLCJuZXdEYXRhIiwidmFycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWJzY3JpYmVkIiwibWFpbExpc3RNZW1iZXJBZGRyZXNzIiwibWVtYmVyIiwicmVxRGF0YSIsImNoZWNrQW5kVXBkYXRlRGF0YSIsIkFycmF5IiwiaXNBcnJheSIsInVwc2VydCIsIk1lc3NhZ2VzQ2xpZW50IiwiX3BhcnNlUmVzcG9uc2UiLCJNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQiLCJsaXN0SWQiLCJmaWxlIiwiaXNTdHJlYW0iLCJwaXBlIiwiaXNOb2RlRm9ybURhdGEiLCJmb3JtRGF0YUluc3RhbmNlIiwiZ2V0SGVhZGVycyIsInVuZGVmaW5lZCIsImdldEF0dGFjaG1lbnRPcHRpb25zIiwiY29udGVudFR5cGUiLCJrbm93bkxlbmd0aCIsImZpbGVuYW1lIiwic3RyZWFtVG9TdHJpbmciLCJzdHJlYW0iLCJjaHVua3MiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uIiwiY2h1bmsiLCJwdXNoIiwiQnVmZmVyIiwidGltZW91dCIsImhlYWRlcnMiLCJGb3JtRGF0YUNvbnN0cnVjdG9yIiwiUmVxdWVzdCIsIm1ldGhvZCIsImlucHV0T3B0aW9ucyIsImJhc2ljIiwiYmFzZTY0IiwiZW5jb2RlIiwiQXV0aG9yaXphdGlvbiIsInBhcmFtcyIsImdldE93blByb3BlcnR5TmFtZXMiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsInRocm93SHR0cEVycm9ycyIsIm9rIiwianNvbiIsImdldFJlc3BvbnNlQm9keSIsInJlc3BvbnNlU3RyaW5nIiwidGV4dCIsImpzb25Cb2R5IiwicGFyc2UiLCJjb21tYW5kIiwiY3JlYXRlRm9ybURhdGEiLCJrZXlzIiwiZmlsdGVyIiwiZm9ybURhdGFBY2MiLCJmaWxlS2V5cyIsImluY2x1ZGVzIiwiYWRkRmlsZXNUb0ZEIiwiYWRkTWltZURhdGFUb0ZEIiwiYWRkQ29tbW9uUHJvcGVydHlUb0ZEIiwiaXNCdWZmZXIiLCJhcHBlbmQiLCJwcm9wZXJ0eU5hbWUiLCJ2YWx1ZSIsImFwcGVuZEZpbGVUb0ZEIiwib2JqIiwiaXNTdHJlYW1EYXRhIiwib2JqRGF0YSIsImZvckVhY2giLCJSb3V0ZXNDbGllbnQiLCJyb3V0ZSIsIlN0YXRzQ2xpZW50IiwiYXJyYXlXaXRoUGFpcnMiLCJjdXJyZW50UGFpciIsInJlcGVhdGVkUHJvcGVydHkiLCJTdGF0cyIsInByZXBhcmVTZWFyY2hQYXJhbXMiLCJfcGFyc2VTdGF0cyIsImNyZWF0ZU9wdGlvbnMiLCJTdXByZXNzaW9uc18xIiwiQk9VTkNFUyIsImFkZHJlc3MiLCJjb2RlIiwiU3VwcHJlc3Npb24iLCJDT01QTEFJTlRTIiwiVU5TVUJTQ1JJQkVTIiwidGFncyIsIldISVRFTElTVFMiLCJyZWFzb24iLCJtb2RlbHMiLCJNYXAiLCJzZXQiLCJCb3VuY2UiLCJDb21wbGFpbnQiLCJVbnN1YnNjcmliZSIsIldoaXRlTGlzdCIsIlN1cHByZXNzaW9uQ2xpZW50IiwicGFnZVVybCIsInBhcnNlZFVybCIsIlVSTCIsImhhcyIsIk1vZGVsIiwicHJlcGFyZVJlc3BvbnNlIiwiY2hlY2tUeXBlIiwibW9kZWwiLCJfcGFyc2VMaXN0IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiX3BhcnNlSXRlbSIsInBvc3REYXRhIiwiY3JlYXRlV2hpdGVMaXN0IiwibW9kdWxlIiwibXVsdGlwbGVWYWxpZGF0aW9uIiwiVmFsaWRhdGVDbGllbnQiLCJXZWJob29rQ2xpZW50Iiwid2ViaG9va1Jlc3BvbnNlIiwid2ViaG9vayIsInVybHMiLCJXZWJob29rIiwiX3BhcnNlV2ViaG9va0xpc3QiLCJfcGFyc2VXZWJob29rV2l0aElEIiwidGVzdCIsIl9wYXJzZVdlYmhvb2tUZXN0Il0sInNvdXJjZVJvb3QiOiIifQ==