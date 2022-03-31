/*! mailgun.js v5.0.4 */
/*! mailgun.js v5.0.4 */
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

/***/ "./node_modules/abort-controller/dist/abort-controller.js":
/*!****************************************************************!*\
  !*** ./node_modules/abort-controller/dist/abort-controller.js ***!
  \****************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */


Object.defineProperty(exports, "__esModule", ({ value: true }));

var eventTargetShim = __webpack_require__(/*! event-target-shim */ "./node_modules/event-target-shim/dist/event-target-shim.js");

/**
 * The signal class.
 * @see https://dom.spec.whatwg.org/#abortsignal
 */
class AbortSignal extends eventTargetShim.EventTarget {
    /**
     * AbortSignal cannot be constructed directly.
     */
    constructor() {
        super();
        throw new TypeError("AbortSignal cannot be constructed directly");
    }
    /**
     * Returns `true` if this `AbortSignal`'s `AbortController` has signaled to abort, and `false` otherwise.
     */
    get aborted() {
        const aborted = abortedFlags.get(this);
        if (typeof aborted !== "boolean") {
            throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
        }
        return aborted;
    }
}
eventTargetShim.defineEventAttribute(AbortSignal.prototype, "abort");
/**
 * Create an AbortSignal object.
 */
function createAbortSignal() {
    const signal = Object.create(AbortSignal.prototype);
    eventTargetShim.EventTarget.call(signal);
    abortedFlags.set(signal, false);
    return signal;
}
/**
 * Abort a given signal.
 */
function abortSignal(signal) {
    if (abortedFlags.get(signal) !== false) {
        return;
    }
    abortedFlags.set(signal, true);
    signal.dispatchEvent({ type: "abort" });
}
/**
 * Aborted flag for each instances.
 */
const abortedFlags = new WeakMap();
// Properties should be enumerable.
Object.defineProperties(AbortSignal.prototype, {
    aborted: { enumerable: true },
});
// `toString()` should return `"[object AbortSignal]"`
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
    Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortSignal",
    });
}

/**
 * The AbortController.
 * @see https://dom.spec.whatwg.org/#abortcontroller
 */
class AbortController {
    /**
     * Initialize this controller.
     */
    constructor() {
        signals.set(this, createAbortSignal());
    }
    /**
     * Returns the `AbortSignal` object associated with this object.
     */
    get signal() {
        return getSignal(this);
    }
    /**
     * Abort and signal to any observers that the associated activity is to be aborted.
     */
    abort() {
        abortSignal(getSignal(this));
    }
}
/**
 * Associated signals.
 */
const signals = new WeakMap();
/**
 * Get the associated signal of a given controller.
 */
function getSignal(controller) {
    const signal = signals.get(controller);
    if (signal == null) {
        throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${controller === null ? "null" : typeof controller}`);
    }
    return signal;
}
// Properties should be enumerable.
Object.defineProperties(AbortController.prototype, {
    signal: { enumerable: true },
    abort: { enumerable: true },
});
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
    Object.defineProperty(AbortController.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortController",
    });
}

exports.AbortController = AbortController;
exports.AbortSignal = AbortSignal;
exports["default"] = AbortController;

module.exports = AbortController
module.exports.AbortController = module.exports["default"] = AbortController
module.exports.AbortSignal = AbortSignal
//# sourceMappingURL=abort-controller.js.map


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

var ky_universal_1 = __importDefault(__webpack_require__(/*! ky-universal */ "./node_modules/ky-universal/index.js"));

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
	var freeGlobal = typeof global == 'object' && global;
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

/***/ "./node_modules/data-uri-to-buffer/dist/src/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/data-uri-to-buffer/dist/src/index.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";

/**
 * Returns a `Buffer` instance from the given data URI `uri`.
 *
 * @param {String} uri Data URI to turn into a Buffer instance
 * @return {Buffer} Buffer instance from Data URI
 * @api public
 */
function dataUriToBuffer(uri) {
    if (!/^data:/i.test(uri)) {
        throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
    }
    // strip newlines
    uri = uri.replace(/\r?\n/g, '');
    // split the URI up into the "metadata" and the "data" portions
    const firstComma = uri.indexOf(',');
    if (firstComma === -1 || firstComma <= 4) {
        throw new TypeError('malformed data: URI');
    }
    // remove the "data:" scheme and parse the metadata
    const meta = uri.substring(5, firstComma).split(';');
    let charset = '';
    let base64 = false;
    const type = meta[0] || 'text/plain';
    let typeFull = type;
    for (let i = 1; i < meta.length; i++) {
        if (meta[i] === 'base64') {
            base64 = true;
        }
        else {
            typeFull += `;${meta[i]}`;
            if (meta[i].indexOf('charset=') === 0) {
                charset = meta[i].substring(8);
            }
        }
    }
    // defaults to US-ASCII only if type is not provided
    if (!meta[0] && !charset.length) {
        typeFull += ';charset=US-ASCII';
        charset = 'US-ASCII';
    }
    // get the encoded data portion and decode URI-encoded chars
    const encoding = base64 ? 'base64' : 'ascii';
    const data = unescape(uri.substring(firstComma + 1));
    const buffer = Buffer.from(data, encoding);
    // set `.type` and `.typeFull` properties to MIME type
    buffer.type = type;
    buffer.typeFull = typeFull;
    // set the `.charset` property
    buffer.charset = charset;
    return buffer;
}
module.exports = dataUriToBuffer;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/event-target-shim/dist/event-target-shim.js":
/*!******************************************************************!*\
  !*** ./node_modules/event-target-shim/dist/event-target-shim.js ***!
  \******************************************************************/
/***/ ((module, exports) => {

"use strict";
/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */


Object.defineProperty(exports, "__esModule", ({ value: true }));

/**
 * @typedef {object} PrivateData
 * @property {EventTarget} eventTarget The event target.
 * @property {{type:string}} event The original event object.
 * @property {number} eventPhase The current event phase.
 * @property {EventTarget|null} currentTarget The current event target.
 * @property {boolean} canceled The flag to prevent default.
 * @property {boolean} stopped The flag to stop propagation.
 * @property {boolean} immediateStopped The flag to stop propagation immediately.
 * @property {Function|null} passiveListener The listener if the current listener is passive. Otherwise this is null.
 * @property {number} timeStamp The unix time.
 * @private
 */

/**
 * Private data for event wrappers.
 * @type {WeakMap<Event, PrivateData>}
 * @private
 */
const privateData = new WeakMap();

/**
 * Cache for wrapper classes.
 * @type {WeakMap<Object, Function>}
 * @private
 */
const wrappers = new WeakMap();

/**
 * Get private data.
 * @param {Event} event The event object to get private data.
 * @returns {PrivateData} The private data of the event.
 * @private
 */
function pd(event) {
    const retv = privateData.get(event);
    console.assert(
        retv != null,
        "'this' is expected an Event object, but got",
        event
    );
    return retv
}

/**
 * https://dom.spec.whatwg.org/#set-the-canceled-flag
 * @param data {PrivateData} private data.
 */
function setCancelFlag(data) {
    if (data.passiveListener != null) {
        if (
            typeof console !== "undefined" &&
            typeof console.error === "function"
        ) {
            console.error(
                "Unable to preventDefault inside passive event listener invocation.",
                data.passiveListener
            );
        }
        return
    }
    if (!data.event.cancelable) {
        return
    }

    data.canceled = true;
    if (typeof data.event.preventDefault === "function") {
        data.event.preventDefault();
    }
}

/**
 * @see https://dom.spec.whatwg.org/#interface-event
 * @private
 */
/**
 * The event wrapper.
 * @constructor
 * @param {EventTarget} eventTarget The event target of this dispatching.
 * @param {Event|{type:string}} event The original event to wrap.
 */
function Event(eventTarget, event) {
    privateData.set(this, {
        eventTarget,
        event,
        eventPhase: 2,
        currentTarget: eventTarget,
        canceled: false,
        stopped: false,
        immediateStopped: false,
        passiveListener: null,
        timeStamp: event.timeStamp || Date.now(),
    });

    // https://heycam.github.io/webidl/#Unforgeable
    Object.defineProperty(this, "isTrusted", { value: false, enumerable: true });

    // Define accessors
    const keys = Object.keys(event);
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in this)) {
            Object.defineProperty(this, key, defineRedirectDescriptor(key));
        }
    }
}

// Should be enumerable, but class methods are not enumerable.
Event.prototype = {
    /**
     * The type of this event.
     * @type {string}
     */
    get type() {
        return pd(this).event.type
    },

    /**
     * The target of this event.
     * @type {EventTarget}
     */
    get target() {
        return pd(this).eventTarget
    },

    /**
     * The target of this event.
     * @type {EventTarget}
     */
    get currentTarget() {
        return pd(this).currentTarget
    },

    /**
     * @returns {EventTarget[]} The composed path of this event.
     */
    composedPath() {
        const currentTarget = pd(this).currentTarget;
        if (currentTarget == null) {
            return []
        }
        return [currentTarget]
    },

    /**
     * Constant of NONE.
     * @type {number}
     */
    get NONE() {
        return 0
    },

    /**
     * Constant of CAPTURING_PHASE.
     * @type {number}
     */
    get CAPTURING_PHASE() {
        return 1
    },

    /**
     * Constant of AT_TARGET.
     * @type {number}
     */
    get AT_TARGET() {
        return 2
    },

    /**
     * Constant of BUBBLING_PHASE.
     * @type {number}
     */
    get BUBBLING_PHASE() {
        return 3
    },

    /**
     * The target of this event.
     * @type {number}
     */
    get eventPhase() {
        return pd(this).eventPhase
    },

    /**
     * Stop event bubbling.
     * @returns {void}
     */
    stopPropagation() {
        const data = pd(this);

        data.stopped = true;
        if (typeof data.event.stopPropagation === "function") {
            data.event.stopPropagation();
        }
    },

    /**
     * Stop event bubbling.
     * @returns {void}
     */
    stopImmediatePropagation() {
        const data = pd(this);

        data.stopped = true;
        data.immediateStopped = true;
        if (typeof data.event.stopImmediatePropagation === "function") {
            data.event.stopImmediatePropagation();
        }
    },

    /**
     * The flag to be bubbling.
     * @type {boolean}
     */
    get bubbles() {
        return Boolean(pd(this).event.bubbles)
    },

    /**
     * The flag to be cancelable.
     * @type {boolean}
     */
    get cancelable() {
        return Boolean(pd(this).event.cancelable)
    },

    /**
     * Cancel this event.
     * @returns {void}
     */
    preventDefault() {
        setCancelFlag(pd(this));
    },

    /**
     * The flag to indicate cancellation state.
     * @type {boolean}
     */
    get defaultPrevented() {
        return pd(this).canceled
    },

    /**
     * The flag to be composed.
     * @type {boolean}
     */
    get composed() {
        return Boolean(pd(this).event.composed)
    },

    /**
     * The unix time of this event.
     * @type {number}
     */
    get timeStamp() {
        return pd(this).timeStamp
    },

    /**
     * The target of this event.
     * @type {EventTarget}
     * @deprecated
     */
    get srcElement() {
        return pd(this).eventTarget
    },

    /**
     * The flag to stop event bubbling.
     * @type {boolean}
     * @deprecated
     */
    get cancelBubble() {
        return pd(this).stopped
    },
    set cancelBubble(value) {
        if (!value) {
            return
        }
        const data = pd(this);

        data.stopped = true;
        if (typeof data.event.cancelBubble === "boolean") {
            data.event.cancelBubble = true;
        }
    },

    /**
     * The flag to indicate cancellation state.
     * @type {boolean}
     * @deprecated
     */
    get returnValue() {
        return !pd(this).canceled
    },
    set returnValue(value) {
        if (!value) {
            setCancelFlag(pd(this));
        }
    },

    /**
     * Initialize this event object. But do nothing under event dispatching.
     * @param {string} type The event type.
     * @param {boolean} [bubbles=false] The flag to be possible to bubble up.
     * @param {boolean} [cancelable=false] The flag to be possible to cancel.
     * @deprecated
     */
    initEvent() {
        // Do nothing.
    },
};

// `constructor` is not enumerable.
Object.defineProperty(Event.prototype, "constructor", {
    value: Event,
    configurable: true,
    writable: true,
});

// Ensure `event instanceof window.Event` is `true`.
if (typeof window !== "undefined" && typeof window.Event !== "undefined") {
    Object.setPrototypeOf(Event.prototype, window.Event.prototype);

    // Make association for wrappers.
    wrappers.set(window.Event.prototype, Event);
}

/**
 * Get the property descriptor to redirect a given property.
 * @param {string} key Property name to define property descriptor.
 * @returns {PropertyDescriptor} The property descriptor to redirect the property.
 * @private
 */
function defineRedirectDescriptor(key) {
    return {
        get() {
            return pd(this).event[key]
        },
        set(value) {
            pd(this).event[key] = value;
        },
        configurable: true,
        enumerable: true,
    }
}

/**
 * Get the property descriptor to call a given method property.
 * @param {string} key Property name to define property descriptor.
 * @returns {PropertyDescriptor} The property descriptor to call the method property.
 * @private
 */
function defineCallDescriptor(key) {
    return {
        value() {
            const event = pd(this).event;
            return event[key].apply(event, arguments)
        },
        configurable: true,
        enumerable: true,
    }
}

/**
 * Define new wrapper class.
 * @param {Function} BaseEvent The base wrapper class.
 * @param {Object} proto The prototype of the original event.
 * @returns {Function} The defined wrapper class.
 * @private
 */
function defineWrapper(BaseEvent, proto) {
    const keys = Object.keys(proto);
    if (keys.length === 0) {
        return BaseEvent
    }

    /** CustomEvent */
    function CustomEvent(eventTarget, event) {
        BaseEvent.call(this, eventTarget, event);
    }

    CustomEvent.prototype = Object.create(BaseEvent.prototype, {
        constructor: { value: CustomEvent, configurable: true, writable: true },
    });

    // Define accessors.
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!(key in BaseEvent.prototype)) {
            const descriptor = Object.getOwnPropertyDescriptor(proto, key);
            const isFunc = typeof descriptor.value === "function";
            Object.defineProperty(
                CustomEvent.prototype,
                key,
                isFunc
                    ? defineCallDescriptor(key)
                    : defineRedirectDescriptor(key)
            );
        }
    }

    return CustomEvent
}

/**
 * Get the wrapper class of a given prototype.
 * @param {Object} proto The prototype of the original event to get its wrapper.
 * @returns {Function} The wrapper class.
 * @private
 */
function getWrapper(proto) {
    if (proto == null || proto === Object.prototype) {
        return Event
    }

    let wrapper = wrappers.get(proto);
    if (wrapper == null) {
        wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
        wrappers.set(proto, wrapper);
    }
    return wrapper
}

/**
 * Wrap a given event to management a dispatching.
 * @param {EventTarget} eventTarget The event target of this dispatching.
 * @param {Object} event The event to wrap.
 * @returns {Event} The wrapper instance.
 * @private
 */
function wrapEvent(eventTarget, event) {
    const Wrapper = getWrapper(Object.getPrototypeOf(event));
    return new Wrapper(eventTarget, event)
}

/**
 * Get the immediateStopped flag of a given event.
 * @param {Event} event The event to get.
 * @returns {boolean} The flag to stop propagation immediately.
 * @private
 */
function isStopped(event) {
    return pd(event).immediateStopped
}

/**
 * Set the current event phase of a given event.
 * @param {Event} event The event to set current target.
 * @param {number} eventPhase New event phase.
 * @returns {void}
 * @private
 */
function setEventPhase(event, eventPhase) {
    pd(event).eventPhase = eventPhase;
}

/**
 * Set the current target of a given event.
 * @param {Event} event The event to set current target.
 * @param {EventTarget|null} currentTarget New current target.
 * @returns {void}
 * @private
 */
function setCurrentTarget(event, currentTarget) {
    pd(event).currentTarget = currentTarget;
}

/**
 * Set a passive listener of a given event.
 * @param {Event} event The event to set current target.
 * @param {Function|null} passiveListener New passive listener.
 * @returns {void}
 * @private
 */
function setPassiveListener(event, passiveListener) {
    pd(event).passiveListener = passiveListener;
}

/**
 * @typedef {object} ListenerNode
 * @property {Function} listener
 * @property {1|2|3} listenerType
 * @property {boolean} passive
 * @property {boolean} once
 * @property {ListenerNode|null} next
 * @private
 */

/**
 * @type {WeakMap<object, Map<string, ListenerNode>>}
 * @private
 */
const listenersMap = new WeakMap();

// Listener types
const CAPTURE = 1;
const BUBBLE = 2;
const ATTRIBUTE = 3;

/**
 * Check whether a given value is an object or not.
 * @param {any} x The value to check.
 * @returns {boolean} `true` if the value is an object.
 */
function isObject(x) {
    return x !== null && typeof x === "object" //eslint-disable-line no-restricted-syntax
}

/**
 * Get listeners.
 * @param {EventTarget} eventTarget The event target to get.
 * @returns {Map<string, ListenerNode>} The listeners.
 * @private
 */
function getListeners(eventTarget) {
    const listeners = listenersMap.get(eventTarget);
    if (listeners == null) {
        throw new TypeError(
            "'this' is expected an EventTarget object, but got another value."
        )
    }
    return listeners
}

/**
 * Get the property descriptor for the event attribute of a given event.
 * @param {string} eventName The event name to get property descriptor.
 * @returns {PropertyDescriptor} The property descriptor.
 * @private
 */
function defineEventAttributeDescriptor(eventName) {
    return {
        get() {
            const listeners = getListeners(this);
            let node = listeners.get(eventName);
            while (node != null) {
                if (node.listenerType === ATTRIBUTE) {
                    return node.listener
                }
                node = node.next;
            }
            return null
        },

        set(listener) {
            if (typeof listener !== "function" && !isObject(listener)) {
                listener = null; // eslint-disable-line no-param-reassign
            }
            const listeners = getListeners(this);

            // Traverse to the tail while removing old value.
            let prev = null;
            let node = listeners.get(eventName);
            while (node != null) {
                if (node.listenerType === ATTRIBUTE) {
                    // Remove old value.
                    if (prev !== null) {
                        prev.next = node.next;
                    } else if (node.next !== null) {
                        listeners.set(eventName, node.next);
                    } else {
                        listeners.delete(eventName);
                    }
                } else {
                    prev = node;
                }

                node = node.next;
            }

            // Add new value.
            if (listener !== null) {
                const newNode = {
                    listener,
                    listenerType: ATTRIBUTE,
                    passive: false,
                    once: false,
                    next: null,
                };
                if (prev === null) {
                    listeners.set(eventName, newNode);
                } else {
                    prev.next = newNode;
                }
            }
        },
        configurable: true,
        enumerable: true,
    }
}

/**
 * Define an event attribute (e.g. `eventTarget.onclick`).
 * @param {Object} eventTargetPrototype The event target prototype to define an event attrbite.
 * @param {string} eventName The event name to define.
 * @returns {void}
 */
function defineEventAttribute(eventTargetPrototype, eventName) {
    Object.defineProperty(
        eventTargetPrototype,
        `on${eventName}`,
        defineEventAttributeDescriptor(eventName)
    );
}

/**
 * Define a custom EventTarget with event attributes.
 * @param {string[]} eventNames Event names for event attributes.
 * @returns {EventTarget} The custom EventTarget.
 * @private
 */
function defineCustomEventTarget(eventNames) {
    /** CustomEventTarget */
    function CustomEventTarget() {
        EventTarget.call(this);
    }

    CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
        constructor: {
            value: CustomEventTarget,
            configurable: true,
            writable: true,
        },
    });

    for (let i = 0; i < eventNames.length; ++i) {
        defineEventAttribute(CustomEventTarget.prototype, eventNames[i]);
    }

    return CustomEventTarget
}

/**
 * EventTarget.
 *
 * - This is constructor if no arguments.
 * - This is a function which returns a CustomEventTarget constructor if there are arguments.
 *
 * For example:
 *
 *     class A extends EventTarget {}
 *     class B extends EventTarget("message") {}
 *     class C extends EventTarget("message", "error") {}
 *     class D extends EventTarget(["message", "error"]) {}
 */
function EventTarget() {
    /*eslint-disable consistent-return */
    if (this instanceof EventTarget) {
        listenersMap.set(this, new Map());
        return
    }
    if (arguments.length === 1 && Array.isArray(arguments[0])) {
        return defineCustomEventTarget(arguments[0])
    }
    if (arguments.length > 0) {
        const types = new Array(arguments.length);
        for (let i = 0; i < arguments.length; ++i) {
            types[i] = arguments[i];
        }
        return defineCustomEventTarget(types)
    }
    throw new TypeError("Cannot call a class as a function")
    /*eslint-enable consistent-return */
}

// Should be enumerable, but class methods are not enumerable.
EventTarget.prototype = {
    /**
     * Add a given listener to this event target.
     * @param {string} eventName The event name to add.
     * @param {Function} listener The listener to add.
     * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
     * @returns {void}
     */
    addEventListener(eventName, listener, options) {
        if (listener == null) {
            return
        }
        if (typeof listener !== "function" && !isObject(listener)) {
            throw new TypeError("'listener' should be a function or an object.")
        }

        const listeners = getListeners(this);
        const optionsIsObj = isObject(options);
        const capture = optionsIsObj
            ? Boolean(options.capture)
            : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        const newNode = {
            listener,
            listenerType,
            passive: optionsIsObj && Boolean(options.passive),
            once: optionsIsObj && Boolean(options.once),
            next: null,
        };

        // Set it as the first node if the first node is null.
        let node = listeners.get(eventName);
        if (node === undefined) {
            listeners.set(eventName, newNode);
            return
        }

        // Traverse to the tail while checking duplication..
        let prev = null;
        while (node != null) {
            if (
                node.listener === listener &&
                node.listenerType === listenerType
            ) {
                // Should ignore duplication.
                return
            }
            prev = node;
            node = node.next;
        }

        // Add it.
        prev.next = newNode;
    },

    /**
     * Remove a given listener from this event target.
     * @param {string} eventName The event name to remove.
     * @param {Function} listener The listener to remove.
     * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
     * @returns {void}
     */
    removeEventListener(eventName, listener, options) {
        if (listener == null) {
            return
        }

        const listeners = getListeners(this);
        const capture = isObject(options)
            ? Boolean(options.capture)
            : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;

        let prev = null;
        let node = listeners.get(eventName);
        while (node != null) {
            if (
                node.listener === listener &&
                node.listenerType === listenerType
            ) {
                if (prev !== null) {
                    prev.next = node.next;
                } else if (node.next !== null) {
                    listeners.set(eventName, node.next);
                } else {
                    listeners.delete(eventName);
                }
                return
            }

            prev = node;
            node = node.next;
        }
    },

    /**
     * Dispatch a given event.
     * @param {Event|{type:string}} event The event to dispatch.
     * @returns {boolean} `false` if canceled.
     */
    dispatchEvent(event) {
        if (event == null || typeof event.type !== "string") {
            throw new TypeError('"event.type" should be a string.')
        }

        // If listeners aren't registered, terminate.
        const listeners = getListeners(this);
        const eventName = event.type;
        let node = listeners.get(eventName);
        if (node == null) {
            return true
        }

        // Since we cannot rewrite several properties, so wrap object.
        const wrappedEvent = wrapEvent(this, event);

        // This doesn't process capturing phase and bubbling phase.
        // This isn't participating in a tree.
        let prev = null;
        while (node != null) {
            // Remove this listener if it's once
            if (node.once) {
                if (prev !== null) {
                    prev.next = node.next;
                } else if (node.next !== null) {
                    listeners.set(eventName, node.next);
                } else {
                    listeners.delete(eventName);
                }
            } else {
                prev = node;
            }

            // Call this listener
            setPassiveListener(
                wrappedEvent,
                node.passive ? node.listener : null
            );
            if (typeof node.listener === "function") {
                try {
                    node.listener.call(this, wrappedEvent);
                } catch (err) {
                    if (
                        typeof console !== "undefined" &&
                        typeof console.error === "function"
                    ) {
                        console.error(err);
                    }
                }
            } else if (
                node.listenerType !== ATTRIBUTE &&
                typeof node.listener.handleEvent === "function"
            ) {
                node.listener.handleEvent(wrappedEvent);
            }

            // Break if `event.stopImmediatePropagation` was called.
            if (isStopped(wrappedEvent)) {
                break
            }

            node = node.next;
        }
        setPassiveListener(wrappedEvent, null);
        setEventPhase(wrappedEvent, 0);
        setCurrentTarget(wrappedEvent, null);

        return !wrappedEvent.defaultPrevented
    },
};

// `constructor` is not enumerable.
Object.defineProperty(EventTarget.prototype, "constructor", {
    value: EventTarget,
    configurable: true,
    writable: true,
});

// Ensure `eventTarget instanceof window.EventTarget` is `true`.
if (
    typeof window !== "undefined" &&
    typeof window.EventTarget !== "undefined"
) {
    Object.setPrototypeOf(EventTarget.prototype, window.EventTarget.prototype);
}

exports.defineEventAttribute = defineEventAttribute;
exports.EventTarget = EventTarget;
exports["default"] = EventTarget;

module.exports = EventTarget
module.exports.EventTarget = module.exports["default"] = EventTarget
module.exports.defineEventAttribute = defineEventAttribute
//# sourceMappingURL=event-target-shim.js.map


/***/ }),

/***/ "./node_modules/fetch-blob/index.js":
/*!******************************************!*\
  !*** ./node_modules/fetch-blob/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {Readable} = __webpack_require__(/*! stream */ "stream");

/**
 * @type {WeakMap<Blob, {type: string, size: number, parts: (Blob | Buffer)[] }>}
 */
const wm = new WeakMap();

async function * read(parts) {
	for (const part of parts) {
		if ('stream' in part) {
			yield * part.stream();
		} else {
			yield part;
		}
	}
}

class Blob {
	/**
	 * The Blob() constructor returns a new Blob object. The content
	 * of the blob consists of the concatenation of the values given
	 * in the parameter array.
	 *
	 * @param {(ArrayBufferLike | ArrayBufferView | Blob | Buffer | string)[]} blobParts
	 * @param {{ type?: string }} [options]
	 */
	constructor(blobParts = [], options = {}) {
		let size = 0;

		const parts = blobParts.map(element => {
			let buffer;
			if (element instanceof Buffer) {
				buffer = element;
			} else if (ArrayBuffer.isView(element)) {
				buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
			} else if (element instanceof ArrayBuffer) {
				buffer = Buffer.from(element);
			} else if (element instanceof Blob) {
				buffer = element;
			} else {
				buffer = Buffer.from(typeof element === 'string' ? element : String(element));
			}

			// eslint-disable-next-line unicorn/explicit-length-check
			size += buffer.length || buffer.size || 0;
			return buffer;
		});

		const type = options.type === undefined ? '' : String(options.type).toLowerCase();

		wm.set(this, {
			type: /[^\u0020-\u007E]/.test(type) ? '' : type,
			size,
			parts
		});
	}

	/**
	 * The Blob interface's size property returns the
	 * size of the Blob in bytes.
	 */
	get size() {
		return wm.get(this).size;
	}

	/**
	 * The type property of a Blob object returns the MIME type of the file.
	 */
	get type() {
		return wm.get(this).type;
	}

	/**
	 * The text() method in the Blob interface returns a Promise
	 * that resolves with a string containing the contents of
	 * the blob, interpreted as UTF-8.
	 *
	 * @return {Promise<string>}
	 */
	async text() {
		return Buffer.from(await this.arrayBuffer()).toString();
	}

	/**
	 * The arrayBuffer() method in the Blob interface returns a
	 * Promise that resolves with the contents of the blob as
	 * binary data contained in an ArrayBuffer.
	 *
	 * @return {Promise<ArrayBuffer>}
	 */
	async arrayBuffer() {
		const data = new Uint8Array(this.size);
		let offset = 0;
		for await (const chunk of this.stream()) {
			data.set(chunk, offset);
			offset += chunk.length;
		}

		return data.buffer;
	}

	/**
	 * The Blob interface's stream() method is difference from native
	 * and uses node streams instead of whatwg streams.
	 *
	 * @returns {Readable} Node readable stream
	 */
	stream() {
		return Readable.from(read(wm.get(this).parts));
	}

	/**
	 * The Blob interface's slice() method creates and returns a
	 * new Blob object which contains data from a subset of the
	 * blob on which it's called.
	 *
	 * @param {number} [start]
	 * @param {number} [end]
	 * @param {string} [type]
	 */
	slice(start = 0, end = this.size, type = '') {
		const {size} = this;

		let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
		let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);

		const span = Math.max(relativeEnd - relativeStart, 0);
		const parts = wm.get(this).parts.values();
		const blobParts = [];
		let added = 0;

		for (const part of parts) {
			const size = ArrayBuffer.isView(part) ? part.byteLength : part.size;
			if (relativeStart && size <= relativeStart) {
				// Skip the beginning and change the relative
				// start & end position as we skip the unwanted parts
				relativeStart -= size;
				relativeEnd -= size;
			} else {
				const chunk = part.slice(relativeStart, Math.min(size, relativeEnd));
				blobParts.push(chunk);
				added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
				relativeStart = 0; // All next sequental parts should start at 0

				// don't add the overflow to new blobParts
				if (added >= span) {
					break;
				}
			}
		}

		const blob = new Blob([], {type: String(type).toLowerCase()});
		Object.assign(wm.get(blob), {size: span, parts: blobParts});

		return blob;
	}

	get [Symbol.toStringTag]() {
		return 'Blob';
	}

	static [Symbol.hasInstance](object) {
		return (
			object &&
			typeof object === 'object' &&
			typeof object.stream === 'function' &&
			object.stream.length === 0 &&
			typeof object.constructor === 'function' &&
			/^(Blob|File)$/.test(object[Symbol.toStringTag])
		);
	}
}

Object.defineProperties(Blob.prototype, {
	size: {enumerable: true},
	type: {enumerable: true},
	slice: {enumerable: true}
});

module.exports = Blob;


/***/ }),

/***/ "./node_modules/ky-universal/index.js":
/*!********************************************!*\
  !*** ./node_modules/ky-universal/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const fetch = __webpack_require__(/*! node-fetch */ "./node_modules/node-fetch/dist/index.cjs");
const AbortController = __webpack_require__(/*! abort-controller */ "./node_modules/abort-controller/dist/abort-controller.js");

const TEN_MEGABYTES = 1000 * 1000 * 10;

if (!global.fetch) {
	global.fetch = (url, options) => fetch(url, {highWaterMark: TEN_MEGABYTES, ...options});
}

if (!global.Headers) {
	global.Headers = fetch.Headers;
}

if (!global.Request) {
	global.Request = fetch.Request;
}

if (!global.Response) {
	global.Response = fetch.Response;
}

if (!global.AbortController) {
	global.AbortController = AbortController;
}

if (!global.ReadableStream) {
	try {
		global.ReadableStream = __webpack_require__(/*! web-streams-polyfill/ponyfill/es2018 */ "./node_modules/web-streams-polyfill/dist/ponyfill.es2018.mjs");
	} catch (_) {}
}

module.exports = __webpack_require__(/*! ky/umd */ "./node_modules/ky/umd.js");


/***/ }),

/***/ "./node_modules/ky/umd.js":
/*!********************************!*\
  !*** ./node_modules/ky/umd.js ***!
  \********************************/
/***/ (function(module) {

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

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

		if (typeof global !== 'undefined' && global && property in global) {
			return global;
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

	var index = createInstance();

	return index;

})));


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

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ "./node_modules/node-fetch/dist/index.cjs":
/*!************************************************!*\
  !*** ./node_modules/node-fetch/dist/index.cjs ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports = module.exports = fetch;

const http = __webpack_require__(/*! http */ "http");
const https = __webpack_require__(/*! https */ "https");
const zlib = __webpack_require__(/*! zlib */ "zlib");
const Stream = __webpack_require__(/*! stream */ "stream");
const dataUriToBuffer = __webpack_require__(/*! data-uri-to-buffer */ "./node_modules/data-uri-to-buffer/dist/src/index.js");
const util = __webpack_require__(/*! util */ "util");
const Blob = __webpack_require__(/*! fetch-blob */ "./node_modules/fetch-blob/index.js");
const crypto = __webpack_require__(/*! crypto */ "crypto");
const url = __webpack_require__(/*! url */ "url");

class FetchBaseError extends Error {
	constructor(message, type) {
		super(message);
		// Hide custom error implementation details from end-users
		Error.captureStackTrace(this, this.constructor);

		this.type = type;
	}

	get name() {
		return this.constructor.name;
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}

/**
 * @typedef {{ address?: string, code: string, dest?: string, errno: number, info?: object, message: string, path?: string, port?: number, syscall: string}} SystemError
*/

/**
 * FetchError interface for operational errors
 */
class FetchError extends FetchBaseError {
	/**
	 * @param  {string} message -      Error message for human
	 * @param  {string} [type] -        Error type for machine
	 * @param  {SystemError} [systemError] - For Node.js system error
	 */
	constructor(message, type, systemError) {
		super(message, type);
		// When err.type is `system`, err.erroredSysCall contains system error and err.code contains system error code
		if (systemError) {
			// eslint-disable-next-line no-multi-assign
			this.code = this.errno = systemError.code;
			this.erroredSysCall = systemError.syscall;
		}
	}
}

/**
 * Is.js
 *
 * Object type checks.
 */

const NAME = Symbol.toStringTag;

/**
 * Check if `obj` is a URLSearchParams object
 * ref: https://github.com/node-fetch/node-fetch/issues/296#issuecomment-307598143
 *
 * @param  {*} obj
 * @return {boolean}
 */
const isURLSearchParameters = object => {
	return (
		typeof object === 'object' &&
		typeof object.append === 'function' &&
		typeof object.delete === 'function' &&
		typeof object.get === 'function' &&
		typeof object.getAll === 'function' &&
		typeof object.has === 'function' &&
		typeof object.set === 'function' &&
		typeof object.sort === 'function' &&
		object[NAME] === 'URLSearchParams'
	);
};

/**
 * Check if `object` is a W3C `Blob` object (which `File` inherits from)
 *
 * @param  {*} obj
 * @return {boolean}
 */
const isBlob = object => {
	return (
		typeof object === 'object' &&
		typeof object.arrayBuffer === 'function' &&
		typeof object.type === 'string' &&
		typeof object.stream === 'function' &&
		typeof object.constructor === 'function' &&
		/^(Blob|File)$/.test(object[NAME])
	);
};

/**
 * Check if `obj` is a spec-compliant `FormData` object
 *
 * @param {*} object
 * @return {boolean}
 */
function isFormData(object) {
	return (
		typeof object === 'object' &&
		typeof object.append === 'function' &&
		typeof object.set === 'function' &&
		typeof object.get === 'function' &&
		typeof object.getAll === 'function' &&
		typeof object.delete === 'function' &&
		typeof object.keys === 'function' &&
		typeof object.values === 'function' &&
		typeof object.entries === 'function' &&
		typeof object.constructor === 'function' &&
		object[NAME] === 'FormData'
	);
}

/**
 * Check if `obj` is an instance of AbortSignal.
 *
 * @param  {*} obj
 * @return {boolean}
 */
const isAbortSignal = object => {
	return (
		typeof object === 'object' &&
		object[NAME] === 'AbortSignal'
	);
};

const carriage = '\r\n';
const dashes = '-'.repeat(2);
const carriageLength = Buffer.byteLength(carriage);

/**
 * @param {string} boundary
 */
const getFooter = boundary => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;

/**
 * @param {string} boundary
 * @param {string} name
 * @param {*} field
 *
 * @return {string}
 */
function getHeader(boundary, name, field) {
	let header = '';

	header += `${dashes}${boundary}${carriage}`;
	header += `Content-Disposition: form-data; name="${name}"`;

	if (isBlob(field)) {
		header += `; filename="${field.name}"${carriage}`;
		header += `Content-Type: ${field.type || 'application/octet-stream'}`;
	}

	return `${header}${carriage.repeat(2)}`;
}

/**
 * @return {string}
 */
const getBoundary = () => crypto.randomBytes(8).toString('hex');

/**
 * @param {FormData} form
 * @param {string} boundary
 */
async function * formDataIterator(form, boundary) {
	for (const [name, value] of form) {
		yield getHeader(boundary, name, value);

		if (isBlob(value)) {
			yield * value.stream();
		} else {
			yield value;
		}

		yield carriage;
	}

	yield getFooter(boundary);
}

/**
 * @param {FormData} form
 * @param {string} boundary
 */
function getFormDataLength(form, boundary) {
	let length = 0;

	for (const [name, value] of form) {
		length += Buffer.byteLength(getHeader(boundary, name, value));

		if (isBlob(value)) {
			length += value.size;
		} else {
			length += Buffer.byteLength(String(value));
		}

		length += carriageLength;
	}

	length += Buffer.byteLength(getFooter(boundary));

	return length;
}

const INTERNALS = Symbol('Body internals');

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Body {
	constructor(body, {
		size = 0
	} = {}) {
		let boundary = null;

		if (body === null) {
			// Body is undefined or null
			body = null;
		} else if (isURLSearchParameters(body)) {
		// Body is a URLSearchParams
			body = Buffer.from(body.toString());
		} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (util.types.isAnyArrayBuffer(body)) {
			// Body is ArrayBuffer
			body = Buffer.from(body);
		} else if (ArrayBuffer.isView(body)) {
			// Body is ArrayBufferView
			body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
		} else if (body instanceof Stream) ; else if (isFormData(body)) {
			// Body is an instance of formdata-node
			boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
			body = Stream.Readable.from(formDataIterator(body, boundary));
		} else {
			// None of the above
			// coerce to string then buffer
			body = Buffer.from(String(body));
		}

		this[INTERNALS] = {
			body,
			boundary,
			disturbed: false,
			error: null
		};
		this.size = size;

		if (body instanceof Stream) {
			body.on('error', err => {
				const error = err instanceof FetchBaseError ?
					err :
					new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, 'system', err);
				this[INTERNALS].error = error;
			});
		}
	}

	get body() {
		return this[INTERNALS].body;
	}

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	}

	/**
	 * Decode response as ArrayBuffer
	 *
	 * @return  Promise
	 */
	async arrayBuffer() {
		const {buffer, byteOffset, byteLength} = await consumeBody(this);
		return buffer.slice(byteOffset, byteOffset + byteLength);
	}

	/**
	 * Return raw response as Blob
	 *
	 * @return Promise
	 */
	async blob() {
		const ct = (this.headers && this.headers.get('content-type')) || (this[INTERNALS].body && this[INTERNALS].body.type) || '';
		const buf = await this.buffer();

		return new Blob([buf], {
			type: ct
		});
	}

	/**
	 * Decode response as json
	 *
	 * @return  Promise
	 */
	async json() {
		const buffer = await consumeBody(this);
		return JSON.parse(buffer.toString());
	}

	/**
	 * Decode response as text
	 *
	 * @return  Promise
	 */
	async text() {
		const buffer = await consumeBody(this);
		return buffer.toString();
	}

	/**
	 * Decode response as buffer (non-spec api)
	 *
	 * @return  Promise
	 */
	buffer() {
		return consumeBody(this);
	}
}

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: {enumerable: true},
	bodyUsed: {enumerable: true},
	arrayBuffer: {enumerable: true},
	blob: {enumerable: true},
	json: {enumerable: true},
	text: {enumerable: true}
});

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return Promise
 */
async function consumeBody(data) {
	if (data[INTERNALS].disturbed) {
		throw new TypeError(`body used already for: ${data.url}`);
	}

	data[INTERNALS].disturbed = true;

	if (data[INTERNALS].error) {
		throw data[INTERNALS].error;
	}

	let {body} = data;

	// Body is null
	if (body === null) {
		return Buffer.alloc(0);
	}

	// Body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// Body is buffer
	if (Buffer.isBuffer(body)) {
		return body;
	}

	/* c8 ignore next 3 */
	if (!(body instanceof Stream)) {
		return Buffer.alloc(0);
	}

	// Body is stream
	// get ready to actually consume the body
	const accum = [];
	let accumBytes = 0;

	try {
		for await (const chunk of body) {
			if (data.size > 0 && accumBytes + chunk.length > data.size) {
				const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, 'max-size');
				body.destroy(err);
				throw err;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		}
	} catch (error) {
		if (error instanceof FetchBaseError) {
			throw error;
		} else {
			// Other errors, such as incorrect content-encoding
			throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, 'system', error);
		}
	}

	if (body.readableEnded === true || body._readableState.ended === true) {
		try {
			if (accum.every(c => typeof c === 'string')) {
				return Buffer.from(accum.join(''));
			}

			return Buffer.concat(accum, accumBytes);
		} catch (error) {
			throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, 'system', error);
		}
	} else {
		throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
	}
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed   instance       Response or Request instance
 * @param   String  highWaterMark  highWaterMark for both PassThrough body streams
 * @return  Mixed
 */
const clone = (instance, highWaterMark) => {
	let p1;
	let p2;
	let {body} = instance;

	// Don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// Check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if ((body instanceof Stream) && (typeof body.getBoundary !== 'function')) {
		// Tee instance body
		p1 = new Stream.PassThrough({highWaterMark});
		p2 = new Stream.PassThrough({highWaterMark});
		body.pipe(p1);
		body.pipe(p2);
		// Set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
};

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param {any} body Any options.body input
 * @returns {string | null}
 */
const extractContentType = (body, request) => {
	// Body is null or undefined
	if (body === null) {
		return null;
	}

	// Body is string
	if (typeof body === 'string') {
		return 'text/plain;charset=UTF-8';
	}

	// Body is a URLSearchParams
	if (isURLSearchParameters(body)) {
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	}

	// Body is blob
	if (isBlob(body)) {
		return body.type || null;
	}

	// Body is a Buffer (Buffer, ArrayBuffer or ArrayBufferView)
	if (Buffer.isBuffer(body) || util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
		return null;
	}

	// Detect form data input from form-data module
	if (body && typeof body.getBoundary === 'function') {
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	}

	if (isFormData(body)) {
		return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
	}

	// Body is stream - can't really do much about this
	if (body instanceof Stream) {
		return null;
	}

	// Body constructor defaults other things to string
	return 'text/plain;charset=UTF-8';
};

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param {any} obj.body Body object from the Body instance.
 * @returns {number | null}
 */
const getTotalBytes = request => {
	const {body} = request;

	// Body is null or undefined
	if (body === null) {
		return 0;
	}

	// Body is Blob
	if (isBlob(body)) {
		return body.size;
	}

	// Body is Buffer
	if (Buffer.isBuffer(body)) {
		return body.length;
	}

	// Detect form data input from form-data module
	if (body && typeof body.getLengthSync === 'function') {
		return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
	}

	// Body is a spec-compliant form-data
	if (isFormData(body)) {
		return getFormDataLength(request[INTERNALS].boundary);
	}

	// Body is stream
	return null;
};

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param {Stream.Writable} dest The stream to write to.
 * @param obj.body Body object from the Body instance.
 * @returns {void}
 */
const writeToStream = (dest, {body}) => {
	if (body === null) {
		// Body is null
		dest.end();
	} else if (isBlob(body)) {
		// Body is Blob
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// Body is buffer
		dest.write(body);
		dest.end();
	} else {
		// Body is stream
		body.pipe(dest);
	}
};

/**
 * Headers.js
 *
 * Headers class offers convenient helpers
 */

const validateHeaderName = typeof http.validateHeaderName === 'function' ?
	http.validateHeaderName :
	name => {
		if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
			const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
			Object.defineProperty(err, 'code', {value: 'ERR_INVALID_HTTP_TOKEN'});
			throw err;
		}
	};

const validateHeaderValue = typeof http.validateHeaderValue === 'function' ?
	http.validateHeaderValue :
	(name, value) => {
		if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
			const err = new TypeError(`Invalid character in header content ["${name}"]`);
			Object.defineProperty(err, 'code', {value: 'ERR_INVALID_CHAR'});
			throw err;
		}
	};

/**
 * @typedef {Headers | Record<string, string> | Iterable<readonly [string, string]> | Iterable<Iterable<string>>} HeadersInit
 */

/**
 * This Fetch API interface allows you to perform various actions on HTTP request and response headers.
 * These actions include retrieving, setting, adding to, and removing.
 * A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.
 * You can add to this using methods like append() (see Examples.)
 * In all methods of this interface, header names are matched by case-insensitive byte sequence.
 *
 */
class Headers extends URLSearchParams {
	/**
	 * Headers class
	 *
	 * @constructor
	 * @param {HeadersInit} [init] - Response headers
	 */
	constructor(init) {
		// Validate and normalize init object in [name, value(s)][]
		/** @type {string[][]} */
		let result = [];
		if (init instanceof Headers) {
			const raw = init.raw();
			for (const [name, values] of Object.entries(raw)) {
				result.push(...values.map(value => [name, value]));
			}
		} else if (init == null) ; else if (typeof init === 'object' && !util.types.isBoxedPrimitive(init)) {
			const method = init[Symbol.iterator];
			// eslint-disable-next-line no-eq-null, eqeqeq
			if (method == null) {
				// Record<ByteString, ByteString>
				result.push(...Object.entries(init));
			} else {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// Sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				result = [...init]
					.map(pair => {
						if (
							typeof pair !== 'object' || util.types.isBoxedPrimitive(pair)
						) {
							throw new TypeError('Each header pair must be an iterable object');
						}

						return [...pair];
					}).map(pair => {
						if (pair.length !== 2) {
							throw new TypeError('Each header pair must be a name/value tuple');
						}

						return [...pair];
					});
			}
		} else {
			throw new TypeError('Failed to construct \'Headers\': The provided value is not of type \'(sequence<sequence<ByteString>> or record<ByteString, ByteString>)');
		}

		// Validate and lowercase
		result =
			result.length > 0 ?
				result.map(([name, value]) => {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return [String(name).toLowerCase(), String(value)];
				}) :
				undefined;

		super(result);

		// Returning a Proxy that will lowercase key names, validate parameters and sort keys
		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get(target, p, receiver) {
				switch (p) {
					case 'append':
					case 'set':
						return (name, value) => {
							validateHeaderName(name);
							validateHeaderValue(name, String(value));
							return URLSearchParams.prototype[p].call(
								receiver,
								String(name).toLowerCase(),
								String(value)
							);
						};

					case 'delete':
					case 'has':
					case 'getAll':
						return name => {
							validateHeaderName(name);
							return URLSearchParams.prototype[p].call(
								receiver,
								String(name).toLowerCase()
							);
						};

					case 'keys':
						return () => {
							target.sort();
							return new Set(URLSearchParams.prototype.keys.call(target)).keys();
						};

					default:
						return Reflect.get(target, p, receiver);
				}
			}
			/* c8 ignore next */
		});
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	toString() {
		return Object.prototype.toString.call(this);
	}

	get(name) {
		const values = this.getAll(name);
		if (values.length === 0) {
			return null;
		}

		let value = values.join(', ');
		if (/^content-encoding$/i.test(name)) {
			value = value.toLowerCase();
		}

		return value;
	}

	forEach(callback) {
		for (const name of this.keys()) {
			callback(this.get(name), name);
		}
	}

	* values() {
		for (const name of this.keys()) {
			yield this.get(name);
		}
	}

	/**
	 * @type {() => IterableIterator<[string, string]>}
	 */
	* entries() {
		for (const name of this.keys()) {
			yield [name, this.get(name)];
		}
	}

	[Symbol.iterator]() {
		return this.entries();
	}

	/**
	 * Node-fetch non-spec method
	 * returning all headers and their values as array
	 * @returns {Record<string, string[]>}
	 */
	raw() {
		return [...this.keys()].reduce((result, key) => {
			result[key] = this.getAll(key);
			return result;
		}, {});
	}

	/**
	 * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
	 */
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return [...this.keys()].reduce((result, key) => {
			const values = this.getAll(key);
			// Http.request() only supports string as Host header.
			// This hack makes specifying custom Host header possible.
			if (key === 'host') {
				result[key] = values[0];
			} else {
				result[key] = values.length > 1 ? values : values[0];
			}

			return result;
		}, {});
	}
}

/**
 * Re-shaping object for Web IDL tests
 * Only need to do it for overridden methods
 */
Object.defineProperties(
	Headers.prototype,
	['get', 'entries', 'forEach', 'values'].reduce((result, property) => {
		result[property] = {enumerable: true};
		return result;
	}, {})
);

/**
 * Create a Headers object from an http.IncomingMessage.rawHeaders, ignoring those that do
 * not conform to HTTP grammar productions.
 * @param {import('http').IncomingMessage['rawHeaders']} headers
 */
function fromRawHeaders(headers = []) {
	return new Headers(
		headers
			// Split into pairs
			.reduce((result, value, index, array) => {
				if (index % 2 === 0) {
					result.push(array.slice(index, index + 2));
				}

				return result;
			}, [])
			.filter(([name, value]) => {
				try {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return true;
				} catch {
					return false;
				}
			})

	);
}

const redirectStatus = new Set([301, 302, 303, 307, 308]);

/**
 * Redirect code matching
 *
 * @param {number} code - Status code
 * @return {boolean}
 */
const isRedirect = code => {
	return redirectStatus.has(code);
};

/**
 * Response.js
 *
 * Response class provides content decoding
 */

const INTERNALS$1 = Symbol('Response internals');

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response extends Body {
	constructor(body = null, options = {}) {
		super(body, options);

		const status = options.status || 200;
		const headers = new Headers(options.headers);

		if (body !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: options.url,
			status,
			statusText: options.statusText || '',
			headers,
			counter: options.counter,
			highWaterMark: options.highWaterMark
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
	 * Convenience property representing if the request ended normally
	 */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	get highWaterMark() {
		return this[INTERNALS$1].highWaterMark;
	}

	/**
	 * Clone this response
	 *
	 * @return  Response
	 */
	clone() {
		return new Response(clone(this, this.highWaterMark), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected,
			size: this.size
		});
	}

	/**
	 * @param {string} url    The URL that the new response is to originate from.
	 * @param {number} status An optional status code for the response (e.g., 302.)
	 * @returns {Response}    A Response object.
	 */
	static redirect(url, status = 302) {
		if (!isRedirect(status)) {
			throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
		}

		return new Response(null, {
			headers: {
				location: new URL(url).toString()
			},
			status
		});
	}

	get [Symbol.toStringTag]() {
		return 'Response';
	}
}

Object.defineProperties(Response.prototype, {
	url: {enumerable: true},
	status: {enumerable: true},
	ok: {enumerable: true},
	redirected: {enumerable: true},
	statusText: {enumerable: true},
	headers: {enumerable: true},
	clone: {enumerable: true}
});

const getSearch = parsedURL => {
	if (parsedURL.search) {
		return parsedURL.search;
	}

	const lastOffset = parsedURL.href.length - 1;
	const hash = parsedURL.hash || (parsedURL.href[lastOffset] === '#' ? '#' : '');
	return parsedURL.href[lastOffset - hash.length] === '?' ? '?' : '';
};

const INTERNALS$2 = Symbol('Request internals');

/**
 * Check if `obj` is an instance of Request.
 *
 * @param  {*} obj
 * @return {boolean}
 */
const isRequest = object => {
	return (
		typeof object === 'object' &&
		typeof object[INTERNALS$2] === 'object'
	);
};

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request extends Body {
	constructor(input, init = {}) {
		let parsedURL;

		// Normalize input and force URL to be encoded as UTF-8 (https://github.com/node-fetch/node-fetch/issues/245)
		if (isRequest(input)) {
			parsedURL = new URL(input.url);
		} else {
			parsedURL = new URL(input);
			input = {};
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		// eslint-disable-next-line no-eq-null, eqeqeq
		if (((init.body != null || isRequest(input)) && input.body !== null) &&
			(method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		const inputBody = init.body ?
			init.body :
			(isRequest(input) && input.body !== null ?
				clone(input) :
				null);

		super(inputBody, {
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody, this);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ?
			input.signal :
			null;
		if ('signal' in init) {
			signal = init.signal;
		}

		if (signal !== null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// Node-fetch-only options
		this.follow = init.follow === undefined ? (input.follow === undefined ? 20 : input.follow) : init.follow;
		this.compress = init.compress === undefined ? (input.compress === undefined ? true : input.compress) : init.compress;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
		this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
		this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return url.format(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
	 * Clone this request
	 *
	 * @return  Request
	 */
	clone() {
		return new Request(this);
	}

	get [Symbol.toStringTag]() {
		return 'Request';
	}
}

Object.defineProperties(Request.prototype, {
	method: {enumerable: true},
	url: {enumerable: true},
	headers: {enumerable: true},
	redirect: {enumerable: true},
	clone: {enumerable: true},
	signal: {enumerable: true}
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
const getNodeRequestOptions = request => {
	const {parsedURL} = request[INTERNALS$2];
	const headers = new Headers(request[INTERNALS$2].headers);

	// Fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body === null && /^(post|put)$/i.test(request.method)) {
		contentLengthValue = '0';
	}

	if (request.body !== null) {
		const totalBytes = getTotalBytes(request);
		// Set Content-Length if totalBytes is a number (that is not NaN)
		if (typeof totalBytes === 'number' && !Number.isNaN(totalBytes)) {
			contentLengthValue = String(totalBytes);
		}
	}

	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate,br');
	}

	let {agent} = request;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	const search = getSearch(parsedURL);

	// Manually spread the URL object instead of spread syntax
	const requestOptions = {
		path: parsedURL.pathname + search,
		pathname: parsedURL.pathname,
		hostname: parsedURL.hostname,
		protocol: parsedURL.protocol,
		port: parsedURL.port,
		hash: parsedURL.hash,
		search: parsedURL.search,
		query: parsedURL.query,
		href: parsedURL.href,
		method: request.method,
		headers: headers[Symbol.for('nodejs.util.inspect.custom')](),
		insecureHTTPParser: request.insecureHTTPParser,
		agent
	};

	return requestOptions;
};

/**
 * AbortError interface for cancelled requests
 */
class AbortError extends FetchBaseError {
	constructor(message, type = 'aborted') {
		super(message, type);
	}
}

/**
 * Index.js
 *
 * a request API compatible with window.fetch
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */

const supportedSchemas = new Set(['data:', 'http:', 'https:']);

/**
 * Fetch function
 *
 * @param   {string | URL | import('./request').default} url - Absolute url or Request instance
 * @param   {*} [options_] - Fetch options
 * @return  {Promise<import('./response').default>}
 */
async function fetch(url, options_) {
	return new Promise((resolve, reject) => {
		// Build request object
		const request = new Request(url, options_);
		const options = getNodeRequestOptions(request);
		if (!supportedSchemas.has(options.protocol)) {
			throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options.protocol.replace(/:$/, '')}" is not supported.`);
		}

		if (options.protocol === 'data:') {
			const data = dataUriToBuffer(request.url);
			const response = new Response(data, {headers: {'Content-Type': data.typeFull}});
			resolve(response);
			return;
		}

		// Wrap http.request into fetch
		const send = (options.protocol === 'https:' ? https : http).request;
		const {signal} = request;
		let response = null;

		const abort = () => {
			const error = new AbortError('The operation was aborted.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}

			if (!response || !response.body) {
				return;
			}

			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = () => {
			abort();
			finalize();
		};

		// Send request
		const request_ = send(options);

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		const finalize = () => {
			request_.abort();
			if (signal) {
				signal.removeEventListener('abort', abortAndFinalize);
			}
		};

		request_.on('error', err => {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		request_.on('response', response_ => {
			request_.setTimeout(0);
			const headers = fromRawHeaders(response_.rawHeaders);

			// HTTP fetch step 5
			if (isRedirect(response_.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : new URL(location, request.url);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// Node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// Handle corrupted header
							try {
								headers.set('Location', locationURL);
								/* c8 ignore next 3 */
							} catch (error) {
								reject(error);
							}
						}

						break;
					case 'follow': {
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOptions = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (response_.statusCode === 303 || ((response_.statusCode === 301 || response_.statusCode === 302) && request.method === 'POST')) {
							requestOptions.method = 'GET';
							requestOptions.body = undefined;
							requestOptions.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOptions)));
						finalize();
						return;
					}
					// Do nothing
				}
			}

			// Prepare response
			response_.once('end', () => {
				if (signal) {
					signal.removeEventListener('abort', abortAndFinalize);
				}
			});

			let body = Stream.pipeline(response_, new Stream.PassThrough(), error => {
				reject(error);
			});
			// see https://github.com/nodejs/node/pull/29376
			if (process.version < 'v12.10') {
				response_.on('aborted', abortAndFinalize);
			}

			const responseOptions = {
				url: request.url,
				status: response_.statusCode,
				statusText: response_.statusMessage,
				headers,
				size: request.size,
				counter: request.counter,
				highWaterMark: request.highWaterMark
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// For gzip
			if (codings === 'gzip' || codings === 'x-gzip') {
				body = Stream.pipeline(body, zlib.createGunzip(zlibOptions), error => {
					reject(error);
				});
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// For deflate
			if (codings === 'deflate' || codings === 'x-deflate') {
				// Handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = Stream.pipeline(response_, new Stream.PassThrough(), error => {
					reject(error);
				});
				raw.once('data', chunk => {
					// See http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = Stream.pipeline(body, zlib.createInflate(), error => {
							reject(error);
						});
					} else {
						body = Stream.pipeline(body, zlib.createInflateRaw(), error => {
							reject(error);
						});
					}

					response = new Response(body, responseOptions);
					resolve(response);
				});
				return;
			}

			// For br
			if (codings === 'br') {
				body = Stream.pipeline(body, zlib.createBrotliDecompress(), error => {
					reject(error);
				});
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// Otherwise, use response as-is
			response = new Response(body, responseOptions);
			resolve(response);
		});

		writeToStream(request_, request);
	});
}

exports.AbortError = AbortError;
exports.FetchError = FetchError;
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports["default"] = fetch;
exports.isRedirect = isRedirect;
//# sourceMappingURL=index.cjs.map


/***/ }),

/***/ "./node_modules/web-streams-polyfill/dist/ponyfill.es2018.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/web-streams-polyfill/dist/ponyfill.es2018.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ByteLengthQueuingStrategy": () => (/* binding */ ByteLengthQueuingStrategy),
/* harmony export */   "CountQueuingStrategy": () => (/* binding */ CountQueuingStrategy),
/* harmony export */   "ReadableByteStreamController": () => (/* binding */ ReadableByteStreamController),
/* harmony export */   "ReadableStream": () => (/* binding */ ReadableStream),
/* harmony export */   "ReadableStreamBYOBReader": () => (/* binding */ ReadableStreamBYOBReader),
/* harmony export */   "ReadableStreamBYOBRequest": () => (/* binding */ ReadableStreamBYOBRequest),
/* harmony export */   "ReadableStreamDefaultController": () => (/* binding */ ReadableStreamDefaultController),
/* harmony export */   "ReadableStreamDefaultReader": () => (/* binding */ ReadableStreamDefaultReader),
/* harmony export */   "TransformStream": () => (/* binding */ TransformStream),
/* harmony export */   "TransformStreamDefaultController": () => (/* binding */ TransformStreamDefaultController),
/* harmony export */   "WritableStream": () => (/* binding */ WritableStream),
/* harmony export */   "WritableStreamDefaultController": () => (/* binding */ WritableStreamDefaultController),
/* harmony export */   "WritableStreamDefaultWriter": () => (/* binding */ WritableStreamDefaultWriter)
/* harmony export */ });
/**
 * web-streams-polyfill v3.2.0
 */
/// <reference lib="es2015.symbol" />
const SymbolPolyfill = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ?
    Symbol :
    description => `Symbol(${description})`;

/// <reference lib="dom" />
function noop() {
    return undefined;
}
function getGlobals() {
    if (typeof self !== 'undefined') {
        return self;
    }
    else if (typeof window !== 'undefined') {
        return window;
    }
    else if (typeof global !== 'undefined') {
        return global;
    }
    return undefined;
}
const globals = getGlobals();

function typeIsObject(x) {
    return (typeof x === 'object' && x !== null) || typeof x === 'function';
}
const rethrowAssertionErrorRejection = noop;

const originalPromise = Promise;
const originalPromiseThen = Promise.prototype.then;
const originalPromiseResolve = Promise.resolve.bind(originalPromise);
const originalPromiseReject = Promise.reject.bind(originalPromise);
function newPromise(executor) {
    return new originalPromise(executor);
}
function promiseResolvedWith(value) {
    return originalPromiseResolve(value);
}
function promiseRejectedWith(reason) {
    return originalPromiseReject(reason);
}
function PerformPromiseThen(promise, onFulfilled, onRejected) {
    // There doesn't appear to be any way to correctly emulate the behaviour from JavaScript, so this is just an
    // approximation.
    return originalPromiseThen.call(promise, onFulfilled, onRejected);
}
function uponPromise(promise, onFulfilled, onRejected) {
    PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), undefined, rethrowAssertionErrorRejection);
}
function uponFulfillment(promise, onFulfilled) {
    uponPromise(promise, onFulfilled);
}
function uponRejection(promise, onRejected) {
    uponPromise(promise, undefined, onRejected);
}
function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
    return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
}
function setPromiseIsHandledToTrue(promise) {
    PerformPromiseThen(promise, undefined, rethrowAssertionErrorRejection);
}
const queueMicrotask = (() => {
    const globalQueueMicrotask = globals && globals.queueMicrotask;
    if (typeof globalQueueMicrotask === 'function') {
        return globalQueueMicrotask;
    }
    const resolvedPromise = promiseResolvedWith(undefined);
    return (fn) => PerformPromiseThen(resolvedPromise, fn);
})();
function reflectCall(F, V, args) {
    if (typeof F !== 'function') {
        throw new TypeError('Argument is not a function');
    }
    return Function.prototype.apply.call(F, V, args);
}
function promiseCall(F, V, args) {
    try {
        return promiseResolvedWith(reflectCall(F, V, args));
    }
    catch (value) {
        return promiseRejectedWith(value);
    }
}

// Original from Chromium
// https://chromium.googlesource.com/chromium/src/+/0aee4434a4dba42a42abaea9bfbc0cd196a63bc1/third_party/blink/renderer/core/streams/SimpleQueue.js
const QUEUE_MAX_ARRAY_SIZE = 16384;
/**
 * Simple queue structure.
 *
 * Avoids scalability issues with using a packed array directly by using
 * multiple arrays in a linked list and keeping the array size bounded.
 */
class SimpleQueue {
    constructor() {
        this._cursor = 0;
        this._size = 0;
        // _front and _back are always defined.
        this._front = {
            _elements: [],
            _next: undefined
        };
        this._back = this._front;
        // The cursor is used to avoid calling Array.shift().
        // It contains the index of the front element of the array inside the
        // front-most node. It is always in the range [0, QUEUE_MAX_ARRAY_SIZE).
        this._cursor = 0;
        // When there is only one node, size === elements.length - cursor.
        this._size = 0;
    }
    get length() {
        return this._size;
    }
    // For exception safety, this method is structured in order:
    // 1. Read state
    // 2. Calculate required state mutations
    // 3. Perform state mutations
    push(element) {
        const oldBack = this._back;
        let newBack = oldBack;
        if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
            newBack = {
                _elements: [],
                _next: undefined
            };
        }
        // push() is the mutation most likely to throw an exception, so it
        // goes first.
        oldBack._elements.push(element);
        if (newBack !== oldBack) {
            this._back = newBack;
            oldBack._next = newBack;
        }
        ++this._size;
    }
    // Like push(), shift() follows the read -> calculate -> mutate pattern for
    // exception safety.
    shift() { // must not be called on an empty queue
        const oldFront = this._front;
        let newFront = oldFront;
        const oldCursor = this._cursor;
        let newCursor = oldCursor + 1;
        const elements = oldFront._elements;
        const element = elements[oldCursor];
        if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
            newFront = oldFront._next;
            newCursor = 0;
        }
        // No mutations before this point.
        --this._size;
        this._cursor = newCursor;
        if (oldFront !== newFront) {
            this._front = newFront;
        }
        // Permit shifted element to be garbage collected.
        elements[oldCursor] = undefined;
        return element;
    }
    // The tricky thing about forEach() is that it can be called
    // re-entrantly. The queue may be mutated inside the callback. It is easy to
    // see that push() within the callback has no negative effects since the end
    // of the queue is checked for on every iteration. If shift() is called
    // repeatedly within the callback then the next iteration may return an
    // element that has been removed. In this case the callback will be called
    // with undefined values until we either "catch up" with elements that still
    // exist or reach the back of the queue.
    forEach(callback) {
        let i = this._cursor;
        let node = this._front;
        let elements = node._elements;
        while (i !== elements.length || node._next !== undefined) {
            if (i === elements.length) {
                node = node._next;
                elements = node._elements;
                i = 0;
                if (elements.length === 0) {
                    break;
                }
            }
            callback(elements[i]);
            ++i;
        }
    }
    // Return the element that would be returned if shift() was called now,
    // without modifying the queue.
    peek() { // must not be called on an empty queue
        const front = this._front;
        const cursor = this._cursor;
        return front._elements[cursor];
    }
}

function ReadableStreamReaderGenericInitialize(reader, stream) {
    reader._ownerReadableStream = stream;
    stream._reader = reader;
    if (stream._state === 'readable') {
        defaultReaderClosedPromiseInitialize(reader);
    }
    else if (stream._state === 'closed') {
        defaultReaderClosedPromiseInitializeAsResolved(reader);
    }
    else {
        defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
    }
}
// A client of ReadableStreamDefaultReader and ReadableStreamBYOBReader may use these functions directly to bypass state
// check.
function ReadableStreamReaderGenericCancel(reader, reason) {
    const stream = reader._ownerReadableStream;
    return ReadableStreamCancel(stream, reason);
}
function ReadableStreamReaderGenericRelease(reader) {
    if (reader._ownerReadableStream._state === 'readable') {
        defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
    }
    else {
        defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
    }
    reader._ownerReadableStream._reader = undefined;
    reader._ownerReadableStream = undefined;
}
// Helper functions for the readers.
function readerLockException(name) {
    return new TypeError('Cannot ' + name + ' a stream using a released reader');
}
// Helper functions for the ReadableStreamDefaultReader.
function defaultReaderClosedPromiseInitialize(reader) {
    reader._closedPromise = newPromise((resolve, reject) => {
        reader._closedPromise_resolve = resolve;
        reader._closedPromise_reject = reject;
    });
}
function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
    defaultReaderClosedPromiseInitialize(reader);
    defaultReaderClosedPromiseReject(reader, reason);
}
function defaultReaderClosedPromiseInitializeAsResolved(reader) {
    defaultReaderClosedPromiseInitialize(reader);
    defaultReaderClosedPromiseResolve(reader);
}
function defaultReaderClosedPromiseReject(reader, reason) {
    if (reader._closedPromise_reject === undefined) {
        return;
    }
    setPromiseIsHandledToTrue(reader._closedPromise);
    reader._closedPromise_reject(reason);
    reader._closedPromise_resolve = undefined;
    reader._closedPromise_reject = undefined;
}
function defaultReaderClosedPromiseResetToRejected(reader, reason) {
    defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
}
function defaultReaderClosedPromiseResolve(reader) {
    if (reader._closedPromise_resolve === undefined) {
        return;
    }
    reader._closedPromise_resolve(undefined);
    reader._closedPromise_resolve = undefined;
    reader._closedPromise_reject = undefined;
}

const AbortSteps = SymbolPolyfill('[[AbortSteps]]');
const ErrorSteps = SymbolPolyfill('[[ErrorSteps]]');
const CancelSteps = SymbolPolyfill('[[CancelSteps]]');
const PullSteps = SymbolPolyfill('[[PullSteps]]');

/// <reference lib="es2015.core" />
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#Polyfill
const NumberIsFinite = Number.isFinite || function (x) {
    return typeof x === 'number' && isFinite(x);
};

/// <reference lib="es2015.core" />
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc#Polyfill
const MathTrunc = Math.trunc || function (v) {
    return v < 0 ? Math.ceil(v) : Math.floor(v);
};

// https://heycam.github.io/webidl/#idl-dictionaries
function isDictionary(x) {
    return typeof x === 'object' || typeof x === 'function';
}
function assertDictionary(obj, context) {
    if (obj !== undefined && !isDictionary(obj)) {
        throw new TypeError(`${context} is not an object.`);
    }
}
// https://heycam.github.io/webidl/#idl-callback-functions
function assertFunction(x, context) {
    if (typeof x !== 'function') {
        throw new TypeError(`${context} is not a function.`);
    }
}
// https://heycam.github.io/webidl/#idl-object
function isObject(x) {
    return (typeof x === 'object' && x !== null) || typeof x === 'function';
}
function assertObject(x, context) {
    if (!isObject(x)) {
        throw new TypeError(`${context} is not an object.`);
    }
}
function assertRequiredArgument(x, position, context) {
    if (x === undefined) {
        throw new TypeError(`Parameter ${position} is required in '${context}'.`);
    }
}
function assertRequiredField(x, field, context) {
    if (x === undefined) {
        throw new TypeError(`${field} is required in '${context}'.`);
    }
}
// https://heycam.github.io/webidl/#idl-unrestricted-double
function convertUnrestrictedDouble(value) {
    return Number(value);
}
function censorNegativeZero(x) {
    return x === 0 ? 0 : x;
}
function integerPart(x) {
    return censorNegativeZero(MathTrunc(x));
}
// https://heycam.github.io/webidl/#idl-unsigned-long-long
function convertUnsignedLongLongWithEnforceRange(value, context) {
    const lowerBound = 0;
    const upperBound = Number.MAX_SAFE_INTEGER;
    let x = Number(value);
    x = censorNegativeZero(x);
    if (!NumberIsFinite(x)) {
        throw new TypeError(`${context} is not a finite number`);
    }
    x = integerPart(x);
    if (x < lowerBound || x > upperBound) {
        throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
    }
    if (!NumberIsFinite(x) || x === 0) {
        return 0;
    }
    // TODO Use BigInt if supported?
    // let xBigInt = BigInt(integerPart(x));
    // xBigInt = BigInt.asUintN(64, xBigInt);
    // return Number(xBigInt);
    return x;
}

function assertReadableStream(x, context) {
    if (!IsReadableStream(x)) {
        throw new TypeError(`${context} is not a ReadableStream.`);
    }
}

// Abstract operations for the ReadableStream.
function AcquireReadableStreamDefaultReader(stream) {
    return new ReadableStreamDefaultReader(stream);
}
// ReadableStream API exposed for controllers.
function ReadableStreamAddReadRequest(stream, readRequest) {
    stream._reader._readRequests.push(readRequest);
}
function ReadableStreamFulfillReadRequest(stream, chunk, done) {
    const reader = stream._reader;
    const readRequest = reader._readRequests.shift();
    if (done) {
        readRequest._closeSteps();
    }
    else {
        readRequest._chunkSteps(chunk);
    }
}
function ReadableStreamGetNumReadRequests(stream) {
    return stream._reader._readRequests.length;
}
function ReadableStreamHasDefaultReader(stream) {
    const reader = stream._reader;
    if (reader === undefined) {
        return false;
    }
    if (!IsReadableStreamDefaultReader(reader)) {
        return false;
    }
    return true;
}
/**
 * A default reader vended by a {@link ReadableStream}.
 *
 * @public
 */
class ReadableStreamDefaultReader {
    constructor(stream) {
        assertRequiredArgument(stream, 1, 'ReadableStreamDefaultReader');
        assertReadableStream(stream, 'First parameter');
        if (IsReadableStreamLocked(stream)) {
            throw new TypeError('This stream has already been locked for exclusive reading by another reader');
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readRequests = new SimpleQueue();
    }
    /**
     * Returns a promise that will be fulfilled when the stream becomes closed,
     * or rejected if the stream ever errors or the reader's lock is released before the stream finishes closing.
     */
    get closed() {
        if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException('closed'));
        }
        return this._closedPromise;
    }
    /**
     * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
     */
    cancel(reason = undefined) {
        if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException('cancel'));
        }
        if (this._ownerReadableStream === undefined) {
            return promiseRejectedWith(readerLockException('cancel'));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
    }
    /**
     * Returns a promise that allows access to the next chunk from the stream's internal queue, if available.
     *
     * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
     */
    read() {
        if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException('read'));
        }
        if (this._ownerReadableStream === undefined) {
            return promiseRejectedWith(readerLockException('read from'));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
        });
        const readRequest = {
            _chunkSteps: chunk => resolvePromise({ value: chunk, done: false }),
            _closeSteps: () => resolvePromise({ value: undefined, done: true }),
            _errorSteps: e => rejectPromise(e)
        };
        ReadableStreamDefaultReaderRead(this, readRequest);
        return promise;
    }
    /**
     * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
     * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
     * from now on; otherwise, the reader will appear closed.
     *
     * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
     * the reader's {@link ReadableStreamDefaultReader.read | read()} method has not yet been settled. Attempting to
     * do so will throw a `TypeError` and leave the reader locked to the stream.
     */
    releaseLock() {
        if (!IsReadableStreamDefaultReader(this)) {
            throw defaultReaderBrandCheckException('releaseLock');
        }
        if (this._ownerReadableStream === undefined) {
            return;
        }
        if (this._readRequests.length > 0) {
            throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
        }
        ReadableStreamReaderGenericRelease(this);
    }
}
Object.defineProperties(ReadableStreamDefaultReader.prototype, {
    cancel: { enumerable: true },
    read: { enumerable: true },
    releaseLock: { enumerable: true },
    closed: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
        value: 'ReadableStreamDefaultReader',
        configurable: true
    });
}
// Abstract operations for the readers.
function IsReadableStreamDefaultReader(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_readRequests')) {
        return false;
    }
    return x instanceof ReadableStreamDefaultReader;
}
function ReadableStreamDefaultReaderRead(reader, readRequest) {
    const stream = reader._ownerReadableStream;
    stream._disturbed = true;
    if (stream._state === 'closed') {
        readRequest._closeSteps();
    }
    else if (stream._state === 'errored') {
        readRequest._errorSteps(stream._storedError);
    }
    else {
        stream._readableStreamController[PullSteps](readRequest);
    }
}
// Helper functions for the ReadableStreamDefaultReader.
function defaultReaderBrandCheckException(name) {
    return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
}

/// <reference lib="es2018.asynciterable" />
/* eslint-disable @typescript-eslint/no-empty-function */
const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () { }).prototype);

/// <reference lib="es2018.asynciterable" />
class ReadableStreamAsyncIteratorImpl {
    constructor(reader, preventCancel) {
        this._ongoingPromise = undefined;
        this._isFinished = false;
        this._reader = reader;
        this._preventCancel = preventCancel;
    }
    next() {
        const nextSteps = () => this._nextSteps();
        this._ongoingPromise = this._ongoingPromise ?
            transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) :
            nextSteps();
        return this._ongoingPromise;
    }
    return(value) {
        const returnSteps = () => this._returnSteps(value);
        return this._ongoingPromise ?
            transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) :
            returnSteps();
    }
    _nextSteps() {
        if (this._isFinished) {
            return Promise.resolve({ value: undefined, done: true });
        }
        const reader = this._reader;
        if (reader._ownerReadableStream === undefined) {
            return promiseRejectedWith(readerLockException('iterate'));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
        });
        const readRequest = {
            _chunkSteps: chunk => {
                this._ongoingPromise = undefined;
                // This needs to be delayed by one microtask, otherwise we stop pulling too early which breaks a test.
                // FIXME Is this a bug in the specification, or in the test?
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
            },
            _closeSteps: () => {
                this._ongoingPromise = undefined;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: undefined, done: true });
            },
            _errorSteps: reason => {
                this._ongoingPromise = undefined;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
            }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promise;
    }
    _returnSteps(value) {
        if (this._isFinished) {
            return Promise.resolve({ value, done: true });
        }
        this._isFinished = true;
        const reader = this._reader;
        if (reader._ownerReadableStream === undefined) {
            return promiseRejectedWith(readerLockException('finish iterating'));
        }
        if (!this._preventCancel) {
            const result = ReadableStreamReaderGenericCancel(reader, value);
            ReadableStreamReaderGenericRelease(reader);
            return transformPromiseWith(result, () => ({ value, done: true }));
        }
        ReadableStreamReaderGenericRelease(reader);
        return promiseResolvedWith({ value, done: true });
    }
}
const ReadableStreamAsyncIteratorPrototype = {
    next() {
        if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException('next'));
        }
        return this._asyncIteratorImpl.next();
    },
    return(value) {
        if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException('return'));
        }
        return this._asyncIteratorImpl.return(value);
    }
};
if (AsyncIteratorPrototype !== undefined) {
    Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
}
// Abstract operations for the ReadableStream.
function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
    const reader = AcquireReadableStreamDefaultReader(stream);
    const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
    const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
    iterator._asyncIteratorImpl = impl;
    return iterator;
}
function IsReadableStreamAsyncIterator(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_asyncIteratorImpl')) {
        return false;
    }
    try {
        // noinspection SuspiciousTypeOfGuard
        return x._asyncIteratorImpl instanceof
            ReadableStreamAsyncIteratorImpl;
    }
    catch (_a) {
        return false;
    }
}
// Helper functions for the ReadableStream.
function streamAsyncIteratorBrandCheckException(name) {
    return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
}

/// <reference lib="es2015.core" />
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#Polyfill
const NumberIsNaN = Number.isNaN || function (x) {
    // eslint-disable-next-line no-self-compare
    return x !== x;
};

function CreateArrayFromList(elements) {
    // We use arrays to represent lists, so this is basically a no-op.
    // Do a slice though just in case we happen to depend on the unique-ness.
    return elements.slice();
}
function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
    new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
}
// Not implemented correctly
function TransferArrayBuffer(O) {
    return O;
}
// Not implemented correctly
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function IsDetachedBuffer(O) {
    return false;
}
function ArrayBufferSlice(buffer, begin, end) {
    // ArrayBuffer.prototype.slice is not available on IE10
    // https://www.caniuse.com/mdn-javascript_builtins_arraybuffer_slice
    if (buffer.slice) {
        return buffer.slice(begin, end);
    }
    const length = end - begin;
    const slice = new ArrayBuffer(length);
    CopyDataBlockBytes(slice, 0, buffer, begin, length);
    return slice;
}

function IsNonNegativeNumber(v) {
    if (typeof v !== 'number') {
        return false;
    }
    if (NumberIsNaN(v)) {
        return false;
    }
    if (v < 0) {
        return false;
    }
    return true;
}
function CloneAsUint8Array(O) {
    const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
    return new Uint8Array(buffer);
}

function DequeueValue(container) {
    const pair = container._queue.shift();
    container._queueTotalSize -= pair.size;
    if (container._queueTotalSize < 0) {
        container._queueTotalSize = 0;
    }
    return pair.value;
}
function EnqueueValueWithSize(container, value, size) {
    if (!IsNonNegativeNumber(size) || size === Infinity) {
        throw new RangeError('Size must be a finite, non-NaN, non-negative number.');
    }
    container._queue.push({ value, size });
    container._queueTotalSize += size;
}
function PeekQueueValue(container) {
    const pair = container._queue.peek();
    return pair.value;
}
function ResetQueue(container) {
    container._queue = new SimpleQueue();
    container._queueTotalSize = 0;
}

/**
 * A pull-into request in a {@link ReadableByteStreamController}.
 *
 * @public
 */
class ReadableStreamBYOBRequest {
    constructor() {
        throw new TypeError('Illegal constructor');
    }
    /**
     * Returns the view for writing in to, or `null` if the BYOB request has already been responded to.
     */
    get view() {
        if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException('view');
        }
        return this._view;
    }
    respond(bytesWritten) {
        if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException('respond');
        }
        assertRequiredArgument(bytesWritten, 1, 'respond');
        bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, 'First parameter');
        if (this._associatedReadableByteStreamController === undefined) {
            throw new TypeError('This BYOB request has been invalidated');
        }
        if (IsDetachedBuffer(this._view.buffer)) ;
        ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
    }
    respondWithNewView(view) {
        if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException('respondWithNewView');
        }
        assertRequiredArgument(view, 1, 'respondWithNewView');
        if (!ArrayBuffer.isView(view)) {
            throw new TypeError('You can only respond with array buffer views');
        }
        if (this._associatedReadableByteStreamController === undefined) {
            throw new TypeError('This BYOB request has been invalidated');
        }
        if (IsDetachedBuffer(view.buffer)) ;
        ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
    }
}
Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
    respond: { enumerable: true },
    respondWithNewView: { enumerable: true },
    view: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
        value: 'ReadableStreamBYOBRequest',
        configurable: true
    });
}
/**
 * Allows control of a {@link ReadableStream | readable byte stream}'s state and internal queue.
 *
 * @public
 */
class ReadableByteStreamController {
    constructor() {
        throw new TypeError('Illegal constructor');
    }
    /**
     * Returns the current BYOB pull request, or `null` if there isn't one.
     */
    get byobRequest() {
        if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException('byobRequest');
        }
        return ReadableByteStreamControllerGetBYOBRequest(this);
    }
    /**
     * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
     * over-full. An underlying byte source ought to use this information to determine when and how to apply backpressure.
     */
    get desiredSize() {
        if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException('desiredSize');
        }
        return ReadableByteStreamControllerGetDesiredSize(this);
    }
    /**
     * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
     * the stream, but once those are read, the stream will become closed.
     */
    close() {
        if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException('close');
        }
        if (this._closeRequested) {
            throw new TypeError('The stream has already been closed; do not close it again!');
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== 'readable') {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
        }
        ReadableByteStreamControllerClose(this);
    }
    enqueue(chunk) {
        if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException('enqueue');
        }
        assertRequiredArgument(chunk, 1, 'enqueue');
        if (!ArrayBuffer.isView(chunk)) {
            throw new TypeError('chunk must be an array buffer view');
        }
        if (chunk.byteLength === 0) {
            throw new TypeError('chunk must have non-zero byteLength');
        }
        if (chunk.buffer.byteLength === 0) {
            throw new TypeError(`chunk's buffer must have non-zero byteLength`);
        }
        if (this._closeRequested) {
            throw new TypeError('stream is closed or draining');
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== 'readable') {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
        }
        ReadableByteStreamControllerEnqueue(this, chunk);
    }
    /**
     * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
     */
    error(e = undefined) {
        if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException('error');
        }
        ReadableByteStreamControllerError(this, e);
    }
    /** @internal */
    [CancelSteps](reason) {
        ReadableByteStreamControllerClearPendingPullIntos(this);
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableByteStreamControllerClearAlgorithms(this);
        return result;
    }
    /** @internal */
    [PullSteps](readRequest) {
        const stream = this._controlledReadableByteStream;
        if (this._queueTotalSize > 0) {
            const entry = this._queue.shift();
            this._queueTotalSize -= entry.byteLength;
            ReadableByteStreamControllerHandleQueueDrain(this);
            const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
            readRequest._chunkSteps(view);
            return;
        }
        const autoAllocateChunkSize = this._autoAllocateChunkSize;
        if (autoAllocateChunkSize !== undefined) {
            let buffer;
            try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
            }
            catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
            }
            const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: 'default'
            };
            this._pendingPullIntos.push(pullIntoDescriptor);
        }
        ReadableStreamAddReadRequest(stream, readRequest);
        ReadableByteStreamControllerCallPullIfNeeded(this);
    }
}
Object.defineProperties(ReadableByteStreamController.prototype, {
    close: { enumerable: true },
    enqueue: { enumerable: true },
    error: { enumerable: true },
    byobRequest: { enumerable: true },
    desiredSize: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
        value: 'ReadableByteStreamController',
        configurable: true
    });
}
// Abstract operations for the ReadableByteStreamController.
function IsReadableByteStreamController(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableByteStream')) {
        return false;
    }
    return x instanceof ReadableByteStreamController;
}
function IsReadableStreamBYOBRequest(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_associatedReadableByteStreamController')) {
        return false;
    }
    return x instanceof ReadableStreamBYOBRequest;
}
function ReadableByteStreamControllerCallPullIfNeeded(controller) {
    const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
    if (!shouldPull) {
        return;
    }
    if (controller._pulling) {
        controller._pullAgain = true;
        return;
    }
    controller._pulling = true;
    // TODO: Test controller argument
    const pullPromise = controller._pullAlgorithm();
    uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
    }, e => {
        ReadableByteStreamControllerError(controller, e);
    });
}
function ReadableByteStreamControllerClearPendingPullIntos(controller) {
    ReadableByteStreamControllerInvalidateBYOBRequest(controller);
    controller._pendingPullIntos = new SimpleQueue();
}
function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
    let done = false;
    if (stream._state === 'closed') {
        done = true;
    }
    const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
    if (pullIntoDescriptor.readerType === 'default') {
        ReadableStreamFulfillReadRequest(stream, filledView, done);
    }
    else {
        ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
    }
}
function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
    const bytesFilled = pullIntoDescriptor.bytesFilled;
    const elementSize = pullIntoDescriptor.elementSize;
    return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
}
function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
    controller._queue.push({ buffer, byteOffset, byteLength });
    controller._queueTotalSize += byteLength;
}
function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
    const elementSize = pullIntoDescriptor.elementSize;
    const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
    const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
    const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
    const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
    let totalBytesToCopyRemaining = maxBytesToCopy;
    let ready = false;
    if (maxAlignedBytes > currentAlignedBytes) {
        totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
        ready = true;
    }
    const queue = controller._queue;
    while (totalBytesToCopyRemaining > 0) {
        const headOfQueue = queue.peek();
        const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
        const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
        if (headOfQueue.byteLength === bytesToCopy) {
            queue.shift();
        }
        else {
            headOfQueue.byteOffset += bytesToCopy;
            headOfQueue.byteLength -= bytesToCopy;
        }
        controller._queueTotalSize -= bytesToCopy;
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
        totalBytesToCopyRemaining -= bytesToCopy;
    }
    return ready;
}
function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
    pullIntoDescriptor.bytesFilled += size;
}
function ReadableByteStreamControllerHandleQueueDrain(controller) {
    if (controller._queueTotalSize === 0 && controller._closeRequested) {
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(controller._controlledReadableByteStream);
    }
    else {
        ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
}
function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
    if (controller._byobRequest === null) {
        return;
    }
    controller._byobRequest._associatedReadableByteStreamController = undefined;
    controller._byobRequest._view = null;
    controller._byobRequest = null;
}
function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
    while (controller._pendingPullIntos.length > 0) {
        if (controller._queueTotalSize === 0) {
            return;
        }
        const pullIntoDescriptor = controller._pendingPullIntos.peek();
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        }
    }
}
function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
    const stream = controller._controlledReadableByteStream;
    let elementSize = 1;
    if (view.constructor !== DataView) {
        elementSize = view.constructor.BYTES_PER_ELEMENT;
    }
    const ctor = view.constructor;
    // try {
    const buffer = TransferArrayBuffer(view.buffer);
    // } catch (e) {
    //   readIntoRequest._errorSteps(e);
    //   return;
    // }
    const pullIntoDescriptor = {
        buffer,
        bufferByteLength: buffer.byteLength,
        byteOffset: view.byteOffset,
        byteLength: view.byteLength,
        bytesFilled: 0,
        elementSize,
        viewConstructor: ctor,
        readerType: 'byob'
    };
    if (controller._pendingPullIntos.length > 0) {
        controller._pendingPullIntos.push(pullIntoDescriptor);
        // No ReadableByteStreamControllerCallPullIfNeeded() call since:
        // - No change happens on desiredSize
        // - The source has already been notified of that there's at least 1 pending read(view)
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        return;
    }
    if (stream._state === 'closed') {
        const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
        readIntoRequest._closeSteps(emptyView);
        return;
    }
    if (controller._queueTotalSize > 0) {
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
            ReadableByteStreamControllerHandleQueueDrain(controller);
            readIntoRequest._chunkSteps(filledView);
            return;
        }
        if (controller._closeRequested) {
            const e = new TypeError('Insufficient bytes to fill elements in the given buffer');
            ReadableByteStreamControllerError(controller, e);
            readIntoRequest._errorSteps(e);
            return;
        }
    }
    controller._pendingPullIntos.push(pullIntoDescriptor);
    ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
    ReadableByteStreamControllerCallPullIfNeeded(controller);
}
function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
    const stream = controller._controlledReadableByteStream;
    if (ReadableStreamHasBYOBReader(stream)) {
        while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
        }
    }
}
function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
    ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
    if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
        return;
    }
    ReadableByteStreamControllerShiftPendingPullInto(controller);
    const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
    if (remainderSize > 0) {
        const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
    }
    pullIntoDescriptor.bytesFilled -= remainderSize;
    ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
    ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
}
function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
    const firstDescriptor = controller._pendingPullIntos.peek();
    ReadableByteStreamControllerInvalidateBYOBRequest(controller);
    const state = controller._controlledReadableByteStream._state;
    if (state === 'closed') {
        ReadableByteStreamControllerRespondInClosedState(controller);
    }
    else {
        ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
    }
    ReadableByteStreamControllerCallPullIfNeeded(controller);
}
function ReadableByteStreamControllerShiftPendingPullInto(controller) {
    const descriptor = controller._pendingPullIntos.shift();
    return descriptor;
}
function ReadableByteStreamControllerShouldCallPull(controller) {
    const stream = controller._controlledReadableByteStream;
    if (stream._state !== 'readable') {
        return false;
    }
    if (controller._closeRequested) {
        return false;
    }
    if (!controller._started) {
        return false;
    }
    if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
    }
    if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
        return true;
    }
    const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
    if (desiredSize > 0) {
        return true;
    }
    return false;
}
function ReadableByteStreamControllerClearAlgorithms(controller) {
    controller._pullAlgorithm = undefined;
    controller._cancelAlgorithm = undefined;
}
// A client of ReadableByteStreamController may use these functions directly to bypass state check.
function ReadableByteStreamControllerClose(controller) {
    const stream = controller._controlledReadableByteStream;
    if (controller._closeRequested || stream._state !== 'readable') {
        return;
    }
    if (controller._queueTotalSize > 0) {
        controller._closeRequested = true;
        return;
    }
    if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (firstPendingPullInto.bytesFilled > 0) {
            const e = new TypeError('Insufficient bytes to fill elements in the given buffer');
            ReadableByteStreamControllerError(controller, e);
            throw e;
        }
    }
    ReadableByteStreamControllerClearAlgorithms(controller);
    ReadableStreamClose(stream);
}
function ReadableByteStreamControllerEnqueue(controller, chunk) {
    const stream = controller._controlledReadableByteStream;
    if (controller._closeRequested || stream._state !== 'readable') {
        return;
    }
    const buffer = chunk.buffer;
    const byteOffset = chunk.byteOffset;
    const byteLength = chunk.byteLength;
    const transferredBuffer = TransferArrayBuffer(buffer);
    if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (IsDetachedBuffer(firstPendingPullInto.buffer)) ;
        firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
    }
    ReadableByteStreamControllerInvalidateBYOBRequest(controller);
    if (ReadableStreamHasDefaultReader(stream)) {
        if (ReadableStreamGetNumReadRequests(stream) === 0) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        else {
            if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
            }
            const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
            ReadableStreamFulfillReadRequest(stream, transferredView, false);
        }
    }
    else if (ReadableStreamHasBYOBReader(stream)) {
        // TODO: Ideally in this branch detaching should happen only if the buffer is not consumed fully.
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
    }
    else {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
    }
    ReadableByteStreamControllerCallPullIfNeeded(controller);
}
function ReadableByteStreamControllerError(controller, e) {
    const stream = controller._controlledReadableByteStream;
    if (stream._state !== 'readable') {
        return;
    }
    ReadableByteStreamControllerClearPendingPullIntos(controller);
    ResetQueue(controller);
    ReadableByteStreamControllerClearAlgorithms(controller);
    ReadableStreamError(stream, e);
}
function ReadableByteStreamControllerGetBYOBRequest(controller) {
    if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
        const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
        SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
        controller._byobRequest = byobRequest;
    }
    return controller._byobRequest;
}
function ReadableByteStreamControllerGetDesiredSize(controller) {
    const state = controller._controlledReadableByteStream._state;
    if (state === 'errored') {
        return null;
    }
    if (state === 'closed') {
        return 0;
    }
    return controller._strategyHWM - controller._queueTotalSize;
}
function ReadableByteStreamControllerRespond(controller, bytesWritten) {
    const firstDescriptor = controller._pendingPullIntos.peek();
    const state = controller._controlledReadableByteStream._state;
    if (state === 'closed') {
        if (bytesWritten !== 0) {
            throw new TypeError('bytesWritten must be 0 when calling respond() on a closed stream');
        }
    }
    else {
        if (bytesWritten === 0) {
            throw new TypeError('bytesWritten must be greater than 0 when calling respond() on a readable stream');
        }
        if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
            throw new RangeError('bytesWritten out of range');
        }
    }
    firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
    ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
}
function ReadableByteStreamControllerRespondWithNewView(controller, view) {
    const firstDescriptor = controller._pendingPullIntos.peek();
    const state = controller._controlledReadableByteStream._state;
    if (state === 'closed') {
        if (view.byteLength !== 0) {
            throw new TypeError('The view\'s length must be 0 when calling respondWithNewView() on a closed stream');
        }
    }
    else {
        if (view.byteLength === 0) {
            throw new TypeError('The view\'s length must be greater than 0 when calling respondWithNewView() on a readable stream');
        }
    }
    if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
        throw new RangeError('The region specified by view does not match byobRequest');
    }
    if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
        throw new RangeError('The buffer of view has different capacity than byobRequest');
    }
    if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
        throw new RangeError('The region specified by view is larger than byobRequest');
    }
    const viewByteLength = view.byteLength;
    firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
    ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
}
function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
    controller._controlledReadableByteStream = stream;
    controller._pullAgain = false;
    controller._pulling = false;
    controller._byobRequest = null;
    // Need to set the slots so that the assert doesn't fire. In the spec the slots already exist implicitly.
    controller._queue = controller._queueTotalSize = undefined;
    ResetQueue(controller);
    controller._closeRequested = false;
    controller._started = false;
    controller._strategyHWM = highWaterMark;
    controller._pullAlgorithm = pullAlgorithm;
    controller._cancelAlgorithm = cancelAlgorithm;
    controller._autoAllocateChunkSize = autoAllocateChunkSize;
    controller._pendingPullIntos = new SimpleQueue();
    stream._readableStreamController = controller;
    const startResult = startAlgorithm();
    uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableByteStreamControllerCallPullIfNeeded(controller);
    }, r => {
        ReadableByteStreamControllerError(controller, r);
    });
}
function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
    const controller = Object.create(ReadableByteStreamController.prototype);
    let startAlgorithm = () => undefined;
    let pullAlgorithm = () => promiseResolvedWith(undefined);
    let cancelAlgorithm = () => promiseResolvedWith(undefined);
    if (underlyingByteSource.start !== undefined) {
        startAlgorithm = () => underlyingByteSource.start(controller);
    }
    if (underlyingByteSource.pull !== undefined) {
        pullAlgorithm = () => underlyingByteSource.pull(controller);
    }
    if (underlyingByteSource.cancel !== undefined) {
        cancelAlgorithm = reason => underlyingByteSource.cancel(reason);
    }
    const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
    if (autoAllocateChunkSize === 0) {
        throw new TypeError('autoAllocateChunkSize must be greater than 0');
    }
    SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
}
function SetUpReadableStreamBYOBRequest(request, controller, view) {
    request._associatedReadableByteStreamController = controller;
    request._view = view;
}
// Helper functions for the ReadableStreamBYOBRequest.
function byobRequestBrandCheckException(name) {
    return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
}
// Helper functions for the ReadableByteStreamController.
function byteStreamControllerBrandCheckException(name) {
    return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
}

// Abstract operations for the ReadableStream.
function AcquireReadableStreamBYOBReader(stream) {
    return new ReadableStreamBYOBReader(stream);
}
// ReadableStream API exposed for controllers.
function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
    stream._reader._readIntoRequests.push(readIntoRequest);
}
function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
    const reader = stream._reader;
    const readIntoRequest = reader._readIntoRequests.shift();
    if (done) {
        readIntoRequest._closeSteps(chunk);
    }
    else {
        readIntoRequest._chunkSteps(chunk);
    }
}
function ReadableStreamGetNumReadIntoRequests(stream) {
    return stream._reader._readIntoRequests.length;
}
function ReadableStreamHasBYOBReader(stream) {
    const reader = stream._reader;
    if (reader === undefined) {
        return false;
    }
    if (!IsReadableStreamBYOBReader(reader)) {
        return false;
    }
    return true;
}
/**
 * A BYOB reader vended by a {@link ReadableStream}.
 *
 * @public
 */
class ReadableStreamBYOBReader {
    constructor(stream) {
        assertRequiredArgument(stream, 1, 'ReadableStreamBYOBReader');
        assertReadableStream(stream, 'First parameter');
        if (IsReadableStreamLocked(stream)) {
            throw new TypeError('This stream has already been locked for exclusive reading by another reader');
        }
        if (!IsReadableByteStreamController(stream._readableStreamController)) {
            throw new TypeError('Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte ' +
                'source');
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readIntoRequests = new SimpleQueue();
    }
    /**
     * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
     * the reader's lock is released before the stream finishes closing.
     */
    get closed() {
        if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException('closed'));
        }
        return this._closedPromise;
    }
    /**
     * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
     */
    cancel(reason = undefined) {
        if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException('cancel'));
        }
        if (this._ownerReadableStream === undefined) {
            return promiseRejectedWith(readerLockException('cancel'));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
    }
    /**
     * Attempts to reads bytes into view, and returns a promise resolved with the result.
     *
     * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
     */
    read(view) {
        if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException('read'));
        }
        if (!ArrayBuffer.isView(view)) {
            return promiseRejectedWith(new TypeError('view must be an array buffer view'));
        }
        if (view.byteLength === 0) {
            return promiseRejectedWith(new TypeError('view must have non-zero byteLength'));
        }
        if (view.buffer.byteLength === 0) {
            return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
        }
        if (IsDetachedBuffer(view.buffer)) ;
        if (this._ownerReadableStream === undefined) {
            return promiseRejectedWith(readerLockException('read from'));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
        });
        const readIntoRequest = {
            _chunkSteps: chunk => resolvePromise({ value: chunk, done: false }),
            _closeSteps: chunk => resolvePromise({ value: chunk, done: true }),
            _errorSteps: e => rejectPromise(e)
        };
        ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
        return promise;
    }
    /**
     * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
     * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
     * from now on; otherwise, the reader will appear closed.
     *
     * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
     * the reader's {@link ReadableStreamBYOBReader.read | read()} method has not yet been settled. Attempting to
     * do so will throw a `TypeError` and leave the reader locked to the stream.
     */
    releaseLock() {
        if (!IsReadableStreamBYOBReader(this)) {
            throw byobReaderBrandCheckException('releaseLock');
        }
        if (this._ownerReadableStream === undefined) {
            return;
        }
        if (this._readIntoRequests.length > 0) {
            throw new TypeError('Tried to release a reader lock when that reader has pending read() calls un-settled');
        }
        ReadableStreamReaderGenericRelease(this);
    }
}
Object.defineProperties(ReadableStreamBYOBReader.prototype, {
    cancel: { enumerable: true },
    read: { enumerable: true },
    releaseLock: { enumerable: true },
    closed: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
        value: 'ReadableStreamBYOBReader',
        configurable: true
    });
}
// Abstract operations for the readers.
function IsReadableStreamBYOBReader(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_readIntoRequests')) {
        return false;
    }
    return x instanceof ReadableStreamBYOBReader;
}
function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
    const stream = reader._ownerReadableStream;
    stream._disturbed = true;
    if (stream._state === 'errored') {
        readIntoRequest._errorSteps(stream._storedError);
    }
    else {
        ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
    }
}
// Helper functions for the ReadableStreamBYOBReader.
function byobReaderBrandCheckException(name) {
    return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
}

function ExtractHighWaterMark(strategy, defaultHWM) {
    const { highWaterMark } = strategy;
    if (highWaterMark === undefined) {
        return defaultHWM;
    }
    if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
        throw new RangeError('Invalid highWaterMark');
    }
    return highWaterMark;
}
function ExtractSizeAlgorithm(strategy) {
    const { size } = strategy;
    if (!size) {
        return () => 1;
    }
    return size;
}

function convertQueuingStrategy(init, context) {
    assertDictionary(init, context);
    const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
    const size = init === null || init === void 0 ? void 0 : init.size;
    return {
        highWaterMark: highWaterMark === undefined ? undefined : convertUnrestrictedDouble(highWaterMark),
        size: size === undefined ? undefined : convertQueuingStrategySize(size, `${context} has member 'size' that`)
    };
}
function convertQueuingStrategySize(fn, context) {
    assertFunction(fn, context);
    return chunk => convertUnrestrictedDouble(fn(chunk));
}

function convertUnderlyingSink(original, context) {
    assertDictionary(original, context);
    const abort = original === null || original === void 0 ? void 0 : original.abort;
    const close = original === null || original === void 0 ? void 0 : original.close;
    const start = original === null || original === void 0 ? void 0 : original.start;
    const type = original === null || original === void 0 ? void 0 : original.type;
    const write = original === null || original === void 0 ? void 0 : original.write;
    return {
        abort: abort === undefined ?
            undefined :
            convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
        close: close === undefined ?
            undefined :
            convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
        start: start === undefined ?
            undefined :
            convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
        write: write === undefined ?
            undefined :
            convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
        type
    };
}
function convertUnderlyingSinkAbortCallback(fn, original, context) {
    assertFunction(fn, context);
    return (reason) => promiseCall(fn, original, [reason]);
}
function convertUnderlyingSinkCloseCallback(fn, original, context) {
    assertFunction(fn, context);
    return () => promiseCall(fn, original, []);
}
function convertUnderlyingSinkStartCallback(fn, original, context) {
    assertFunction(fn, context);
    return (controller) => reflectCall(fn, original, [controller]);
}
function convertUnderlyingSinkWriteCallback(fn, original, context) {
    assertFunction(fn, context);
    return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
}

function assertWritableStream(x, context) {
    if (!IsWritableStream(x)) {
        throw new TypeError(`${context} is not a WritableStream.`);
    }
}

function isAbortSignal(value) {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    try {
        return typeof value.aborted === 'boolean';
    }
    catch (_a) {
        // AbortSignal.prototype.aborted throws if its brand check fails
        return false;
    }
}
const supportsAbortController = typeof AbortController === 'function';
/**
 * Construct a new AbortController, if supported by the platform.
 *
 * @internal
 */
function createAbortController() {
    if (supportsAbortController) {
        return new AbortController();
    }
    return undefined;
}

/**
 * A writable stream represents a destination for data, into which you can write.
 *
 * @public
 */
class WritableStream {
    constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
        if (rawUnderlyingSink === undefined) {
            rawUnderlyingSink = null;
        }
        else {
            assertObject(rawUnderlyingSink, 'First parameter');
        }
        const strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
        const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, 'First parameter');
        InitializeWritableStream(this);
        const type = underlyingSink.type;
        if (type !== undefined) {
            throw new RangeError('Invalid type is specified');
        }
        const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
        const highWaterMark = ExtractHighWaterMark(strategy, 1);
        SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
    }
    /**
     * Returns whether or not the writable stream is locked to a writer.
     */
    get locked() {
        if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2('locked');
        }
        return IsWritableStreamLocked(this);
    }
    /**
     * Aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be
     * immediately moved to an errored state, with any queued-up writes discarded. This will also execute any abort
     * mechanism of the underlying sink.
     *
     * The returned promise will fulfill if the stream shuts down successfully, or reject if the underlying sink signaled
     * that there was an error doing so. Additionally, it will reject with a `TypeError` (without attempting to cancel
     * the stream) if the stream is currently locked.
     */
    abort(reason = undefined) {
        if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2('abort'));
        }
        if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError('Cannot abort a stream that already has a writer'));
        }
        return WritableStreamAbort(this, reason);
    }
    /**
     * Closes the stream. The underlying sink will finish processing any previously-written chunks, before invoking its
     * close behavior. During this time any further attempts to write will fail (without erroring the stream).
     *
     * The method returns a promise that will fulfill if all remaining chunks are successfully written and the stream
     * successfully closes, or rejects if an error is encountered during this process. Additionally, it will reject with
     * a `TypeError` (without attempting to cancel the stream) if the stream is currently locked.
     */
    close() {
        if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2('close'));
        }
        if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError('Cannot close a stream that already has a writer'));
        }
        if (WritableStreamCloseQueuedOrInFlight(this)) {
            return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
        }
        return WritableStreamClose(this);
    }
    /**
     * Creates a {@link WritableStreamDefaultWriter | writer} and locks the stream to the new writer. While the stream
     * is locked, no other writer can be acquired until this one is released.
     *
     * This functionality is especially useful for creating abstractions that desire the ability to write to a stream
     * without interruption or interleaving. By getting a writer for the stream, you can ensure nobody else can write at
     * the same time, which would cause the resulting written data to be unpredictable and probably useless.
     */
    getWriter() {
        if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2('getWriter');
        }
        return AcquireWritableStreamDefaultWriter(this);
    }
}
Object.defineProperties(WritableStream.prototype, {
    abort: { enumerable: true },
    close: { enumerable: true },
    getWriter: { enumerable: true },
    locked: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
        value: 'WritableStream',
        configurable: true
    });
}
// Abstract operations for the WritableStream.
function AcquireWritableStreamDefaultWriter(stream) {
    return new WritableStreamDefaultWriter(stream);
}
// Throws if and only if startAlgorithm throws.
function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
    const stream = Object.create(WritableStream.prototype);
    InitializeWritableStream(stream);
    const controller = Object.create(WritableStreamDefaultController.prototype);
    SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
    return stream;
}
function InitializeWritableStream(stream) {
    stream._state = 'writable';
    // The error that will be reported by new method calls once the state becomes errored. Only set when [[state]] is
    // 'erroring' or 'errored'. May be set to an undefined value.
    stream._storedError = undefined;
    stream._writer = undefined;
    // Initialize to undefined first because the constructor of the controller checks this
    // variable to validate the caller.
    stream._writableStreamController = undefined;
    // This queue is placed here instead of the writer class in order to allow for passing a writer to the next data
    // producer without waiting for the queued writes to finish.
    stream._writeRequests = new SimpleQueue();
    // Write requests are removed from _writeRequests when write() is called on the underlying sink. This prevents
    // them from being erroneously rejected on error. If a write() call is in-flight, the request is stored here.
    stream._inFlightWriteRequest = undefined;
    // The promise that was returned from writer.close(). Stored here because it may be fulfilled after the writer
    // has been detached.
    stream._closeRequest = undefined;
    // Close request is removed from _closeRequest when close() is called on the underlying sink. This prevents it
    // from being erroneously rejected on error. If a close() call is in-flight, the request is stored here.
    stream._inFlightCloseRequest = undefined;
    // The promise that was returned from writer.abort(). This may also be fulfilled after the writer has detached.
    stream._pendingAbortRequest = undefined;
    // The backpressure signal set by the controller.
    stream._backpressure = false;
}
function IsWritableStream(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_writableStreamController')) {
        return false;
    }
    return x instanceof WritableStream;
}
function IsWritableStreamLocked(stream) {
    if (stream._writer === undefined) {
        return false;
    }
    return true;
}
function WritableStreamAbort(stream, reason) {
    var _a;
    if (stream._state === 'closed' || stream._state === 'errored') {
        return promiseResolvedWith(undefined);
    }
    stream._writableStreamController._abortReason = reason;
    (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
    // TypeScript narrows the type of `stream._state` down to 'writable' | 'erroring',
    // but it doesn't know that signaling abort runs author code that might have changed the state.
    // Widen the type again by casting to WritableStreamState.
    const state = stream._state;
    if (state === 'closed' || state === 'errored') {
        return promiseResolvedWith(undefined);
    }
    if (stream._pendingAbortRequest !== undefined) {
        return stream._pendingAbortRequest._promise;
    }
    let wasAlreadyErroring = false;
    if (state === 'erroring') {
        wasAlreadyErroring = true;
        // reason will not be used, so don't keep a reference to it.
        reason = undefined;
    }
    const promise = newPromise((resolve, reject) => {
        stream._pendingAbortRequest = {
            _promise: undefined,
            _resolve: resolve,
            _reject: reject,
            _reason: reason,
            _wasAlreadyErroring: wasAlreadyErroring
        };
    });
    stream._pendingAbortRequest._promise = promise;
    if (!wasAlreadyErroring) {
        WritableStreamStartErroring(stream, reason);
    }
    return promise;
}
function WritableStreamClose(stream) {
    const state = stream._state;
    if (state === 'closed' || state === 'errored') {
        return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
    }
    const promise = newPromise((resolve, reject) => {
        const closeRequest = {
            _resolve: resolve,
            _reject: reject
        };
        stream._closeRequest = closeRequest;
    });
    const writer = stream._writer;
    if (writer !== undefined && stream._backpressure && state === 'writable') {
        defaultWriterReadyPromiseResolve(writer);
    }
    WritableStreamDefaultControllerClose(stream._writableStreamController);
    return promise;
}
// WritableStream API exposed for controllers.
function WritableStreamAddWriteRequest(stream) {
    const promise = newPromise((resolve, reject) => {
        const writeRequest = {
            _resolve: resolve,
            _reject: reject
        };
        stream._writeRequests.push(writeRequest);
    });
    return promise;
}
function WritableStreamDealWithRejection(stream, error) {
    const state = stream._state;
    if (state === 'writable') {
        WritableStreamStartErroring(stream, error);
        return;
    }
    WritableStreamFinishErroring(stream);
}
function WritableStreamStartErroring(stream, reason) {
    const controller = stream._writableStreamController;
    stream._state = 'erroring';
    stream._storedError = reason;
    const writer = stream._writer;
    if (writer !== undefined) {
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
    }
    if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
        WritableStreamFinishErroring(stream);
    }
}
function WritableStreamFinishErroring(stream) {
    stream._state = 'errored';
    stream._writableStreamController[ErrorSteps]();
    const storedError = stream._storedError;
    stream._writeRequests.forEach(writeRequest => {
        writeRequest._reject(storedError);
    });
    stream._writeRequests = new SimpleQueue();
    if (stream._pendingAbortRequest === undefined) {
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
    }
    const abortRequest = stream._pendingAbortRequest;
    stream._pendingAbortRequest = undefined;
    if (abortRequest._wasAlreadyErroring) {
        abortRequest._reject(storedError);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
    }
    const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
    uponPromise(promise, () => {
        abortRequest._resolve();
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
    }, (reason) => {
        abortRequest._reject(reason);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
    });
}
function WritableStreamFinishInFlightWrite(stream) {
    stream._inFlightWriteRequest._resolve(undefined);
    stream._inFlightWriteRequest = undefined;
}
function WritableStreamFinishInFlightWriteWithError(stream, error) {
    stream._inFlightWriteRequest._reject(error);
    stream._inFlightWriteRequest = undefined;
    WritableStreamDealWithRejection(stream, error);
}
function WritableStreamFinishInFlightClose(stream) {
    stream._inFlightCloseRequest._resolve(undefined);
    stream._inFlightCloseRequest = undefined;
    const state = stream._state;
    if (state === 'erroring') {
        // The error was too late to do anything, so it is ignored.
        stream._storedError = undefined;
        if (stream._pendingAbortRequest !== undefined) {
            stream._pendingAbortRequest._resolve();
            stream._pendingAbortRequest = undefined;
        }
    }
    stream._state = 'closed';
    const writer = stream._writer;
    if (writer !== undefined) {
        defaultWriterClosedPromiseResolve(writer);
    }
}
function WritableStreamFinishInFlightCloseWithError(stream, error) {
    stream._inFlightCloseRequest._reject(error);
    stream._inFlightCloseRequest = undefined;
    // Never execute sink abort() after sink close().
    if (stream._pendingAbortRequest !== undefined) {
        stream._pendingAbortRequest._reject(error);
        stream._pendingAbortRequest = undefined;
    }
    WritableStreamDealWithRejection(stream, error);
}
// TODO(ricea): Fix alphabetical order.
function WritableStreamCloseQueuedOrInFlight(stream) {
    if (stream._closeRequest === undefined && stream._inFlightCloseRequest === undefined) {
        return false;
    }
    return true;
}
function WritableStreamHasOperationMarkedInFlight(stream) {
    if (stream._inFlightWriteRequest === undefined && stream._inFlightCloseRequest === undefined) {
        return false;
    }
    return true;
}
function WritableStreamMarkCloseRequestInFlight(stream) {
    stream._inFlightCloseRequest = stream._closeRequest;
    stream._closeRequest = undefined;
}
function WritableStreamMarkFirstWriteRequestInFlight(stream) {
    stream._inFlightWriteRequest = stream._writeRequests.shift();
}
function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
    if (stream._closeRequest !== undefined) {
        stream._closeRequest._reject(stream._storedError);
        stream._closeRequest = undefined;
    }
    const writer = stream._writer;
    if (writer !== undefined) {
        defaultWriterClosedPromiseReject(writer, stream._storedError);
    }
}
function WritableStreamUpdateBackpressure(stream, backpressure) {
    const writer = stream._writer;
    if (writer !== undefined && backpressure !== stream._backpressure) {
        if (backpressure) {
            defaultWriterReadyPromiseReset(writer);
        }
        else {
            defaultWriterReadyPromiseResolve(writer);
        }
    }
    stream._backpressure = backpressure;
}
/**
 * A default writer vended by a {@link WritableStream}.
 *
 * @public
 */
class WritableStreamDefaultWriter {
    constructor(stream) {
        assertRequiredArgument(stream, 1, 'WritableStreamDefaultWriter');
        assertWritableStream(stream, 'First parameter');
        if (IsWritableStreamLocked(stream)) {
            throw new TypeError('This stream has already been locked for exclusive writing by another writer');
        }
        this._ownerWritableStream = stream;
        stream._writer = this;
        const state = stream._state;
        if (state === 'writable') {
            if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
            }
            else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
            }
            defaultWriterClosedPromiseInitialize(this);
        }
        else if (state === 'erroring') {
            defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
            defaultWriterClosedPromiseInitialize(this);
        }
        else if (state === 'closed') {
            defaultWriterReadyPromiseInitializeAsResolved(this);
            defaultWriterClosedPromiseInitializeAsResolved(this);
        }
        else {
            const storedError = stream._storedError;
            defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
            defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
        }
    }
    /**
     * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
     * the writer’s lock is released before the stream finishes closing.
     */
    get closed() {
        if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException('closed'));
        }
        return this._closedPromise;
    }
    /**
     * Returns the desired size to fill the stream’s internal queue. It can be negative, if the queue is over-full.
     * A producer can use this information to determine the right amount of data to write.
     *
     * It will be `null` if the stream cannot be successfully written to (due to either being errored, or having an abort
     * queued up). It will return zero if the stream is closed. And the getter will throw an exception if invoked when
     * the writer’s lock is released.
     */
    get desiredSize() {
        if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException('desiredSize');
        }
        if (this._ownerWritableStream === undefined) {
            throw defaultWriterLockException('desiredSize');
        }
        return WritableStreamDefaultWriterGetDesiredSize(this);
    }
    /**
     * Returns a promise that will be fulfilled when the desired size to fill the stream’s internal queue transitions
     * from non-positive to positive, signaling that it is no longer applying backpressure. Once the desired size dips
     * back to zero or below, the getter will return a new promise that stays pending until the next transition.
     *
     * If the stream becomes errored or aborted, or the writer’s lock is released, the returned promise will become
     * rejected.
     */
    get ready() {
        if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException('ready'));
        }
        return this._readyPromise;
    }
    /**
     * If the reader is active, behaves the same as {@link WritableStream.abort | stream.abort(reason)}.
     */
    abort(reason = undefined) {
        if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException('abort'));
        }
        if (this._ownerWritableStream === undefined) {
            return promiseRejectedWith(defaultWriterLockException('abort'));
        }
        return WritableStreamDefaultWriterAbort(this, reason);
    }
    /**
     * If the reader is active, behaves the same as {@link WritableStream.close | stream.close()}.
     */
    close() {
        if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException('close'));
        }
        const stream = this._ownerWritableStream;
        if (stream === undefined) {
            return promiseRejectedWith(defaultWriterLockException('close'));
        }
        if (WritableStreamCloseQueuedOrInFlight(stream)) {
            return promiseRejectedWith(new TypeError('Cannot close an already-closing stream'));
        }
        return WritableStreamDefaultWriterClose(this);
    }
    /**
     * Releases the writer’s lock on the corresponding stream. After the lock is released, the writer is no longer active.
     * If the associated stream is errored when the lock is released, the writer will appear errored in the same way from
     * now on; otherwise, the writer will appear closed.
     *
     * Note that the lock can still be released even if some ongoing writes have not yet finished (i.e. even if the
     * promises returned from previous calls to {@link WritableStreamDefaultWriter.write | write()} have not yet settled).
     * It’s not necessary to hold the lock on the writer for the duration of the write; the lock instead simply prevents
     * other producers from writing in an interleaved manner.
     */
    releaseLock() {
        if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException('releaseLock');
        }
        const stream = this._ownerWritableStream;
        if (stream === undefined) {
            return;
        }
        WritableStreamDefaultWriterRelease(this);
    }
    write(chunk = undefined) {
        if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException('write'));
        }
        if (this._ownerWritableStream === undefined) {
            return promiseRejectedWith(defaultWriterLockException('write to'));
        }
        return WritableStreamDefaultWriterWrite(this, chunk);
    }
}
Object.defineProperties(WritableStreamDefaultWriter.prototype, {
    abort: { enumerable: true },
    close: { enumerable: true },
    releaseLock: { enumerable: true },
    write: { enumerable: true },
    closed: { enumerable: true },
    desiredSize: { enumerable: true },
    ready: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
        value: 'WritableStreamDefaultWriter',
        configurable: true
    });
}
// Abstract operations for the WritableStreamDefaultWriter.
function IsWritableStreamDefaultWriter(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_ownerWritableStream')) {
        return false;
    }
    return x instanceof WritableStreamDefaultWriter;
}
// A client of WritableStreamDefaultWriter may use these functions directly to bypass state check.
function WritableStreamDefaultWriterAbort(writer, reason) {
    const stream = writer._ownerWritableStream;
    return WritableStreamAbort(stream, reason);
}
function WritableStreamDefaultWriterClose(writer) {
    const stream = writer._ownerWritableStream;
    return WritableStreamClose(stream);
}
function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
    const stream = writer._ownerWritableStream;
    const state = stream._state;
    if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
        return promiseResolvedWith(undefined);
    }
    if (state === 'errored') {
        return promiseRejectedWith(stream._storedError);
    }
    return WritableStreamDefaultWriterClose(writer);
}
function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
    if (writer._closedPromiseState === 'pending') {
        defaultWriterClosedPromiseReject(writer, error);
    }
    else {
        defaultWriterClosedPromiseResetToRejected(writer, error);
    }
}
function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
    if (writer._readyPromiseState === 'pending') {
        defaultWriterReadyPromiseReject(writer, error);
    }
    else {
        defaultWriterReadyPromiseResetToRejected(writer, error);
    }
}
function WritableStreamDefaultWriterGetDesiredSize(writer) {
    const stream = writer._ownerWritableStream;
    const state = stream._state;
    if (state === 'errored' || state === 'erroring') {
        return null;
    }
    if (state === 'closed') {
        return 0;
    }
    return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
}
function WritableStreamDefaultWriterRelease(writer) {
    const stream = writer._ownerWritableStream;
    const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
    WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
    // The state transitions to "errored" before the sink abort() method runs, but the writer.closed promise is not
    // rejected until afterwards. This means that simply testing state will not work.
    WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
    stream._writer = undefined;
    writer._ownerWritableStream = undefined;
}
function WritableStreamDefaultWriterWrite(writer, chunk) {
    const stream = writer._ownerWritableStream;
    const controller = stream._writableStreamController;
    const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
    if (stream !== writer._ownerWritableStream) {
        return promiseRejectedWith(defaultWriterLockException('write to'));
    }
    const state = stream._state;
    if (state === 'errored') {
        return promiseRejectedWith(stream._storedError);
    }
    if (WritableStreamCloseQueuedOrInFlight(stream) || state === 'closed') {
        return promiseRejectedWith(new TypeError('The stream is closing or closed and cannot be written to'));
    }
    if (state === 'erroring') {
        return promiseRejectedWith(stream._storedError);
    }
    const promise = WritableStreamAddWriteRequest(stream);
    WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
    return promise;
}
const closeSentinel = {};
/**
 * Allows control of a {@link WritableStream | writable stream}'s state and internal queue.
 *
 * @public
 */
class WritableStreamDefaultController {
    constructor() {
        throw new TypeError('Illegal constructor');
    }
    /**
     * The reason which was passed to `WritableStream.abort(reason)` when the stream was aborted.
     *
     * @deprecated
     *  This property has been removed from the specification, see https://github.com/whatwg/streams/pull/1177.
     *  Use {@link WritableStreamDefaultController.signal}'s `reason` instead.
     */
    get abortReason() {
        if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2('abortReason');
        }
        return this._abortReason;
    }
    /**
     * An `AbortSignal` that can be used to abort the pending write or close operation when the stream is aborted.
     */
    get signal() {
        if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2('signal');
        }
        if (this._abortController === undefined) {
            // Older browsers or older Node versions may not support `AbortController` or `AbortSignal`.
            // We don't want to bundle and ship an `AbortController` polyfill together with our polyfill,
            // so instead we only implement support for `signal` if we find a global `AbortController` constructor.
            throw new TypeError('WritableStreamDefaultController.prototype.signal is not supported');
        }
        return this._abortController.signal;
    }
    /**
     * Closes the controlled writable stream, making all future interactions with it fail with the given error `e`.
     *
     * This method is rarely used, since usually it suffices to return a rejected promise from one of the underlying
     * sink's methods. However, it can be useful for suddenly shutting down a stream in response to an event outside the
     * normal lifecycle of interactions with the underlying sink.
     */
    error(e = undefined) {
        if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2('error');
        }
        const state = this._controlledWritableStream._state;
        if (state !== 'writable') {
            // The stream is closed, errored or will be soon. The sink can't do anything useful if it gets an error here, so
            // just treat it as a no-op.
            return;
        }
        WritableStreamDefaultControllerError(this, e);
    }
    /** @internal */
    [AbortSteps](reason) {
        const result = this._abortAlgorithm(reason);
        WritableStreamDefaultControllerClearAlgorithms(this);
        return result;
    }
    /** @internal */
    [ErrorSteps]() {
        ResetQueue(this);
    }
}
Object.defineProperties(WritableStreamDefaultController.prototype, {
    abortReason: { enumerable: true },
    signal: { enumerable: true },
    error: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: 'WritableStreamDefaultController',
        configurable: true
    });
}
// Abstract operations implementing interface required by the WritableStream.
function IsWritableStreamDefaultController(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_controlledWritableStream')) {
        return false;
    }
    return x instanceof WritableStreamDefaultController;
}
function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
    controller._controlledWritableStream = stream;
    stream._writableStreamController = controller;
    // Need to set the slots so that the assert doesn't fire. In the spec the slots already exist implicitly.
    controller._queue = undefined;
    controller._queueTotalSize = undefined;
    ResetQueue(controller);
    controller._abortReason = undefined;
    controller._abortController = createAbortController();
    controller._started = false;
    controller._strategySizeAlgorithm = sizeAlgorithm;
    controller._strategyHWM = highWaterMark;
    controller._writeAlgorithm = writeAlgorithm;
    controller._closeAlgorithm = closeAlgorithm;
    controller._abortAlgorithm = abortAlgorithm;
    const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
    WritableStreamUpdateBackpressure(stream, backpressure);
    const startResult = startAlgorithm();
    const startPromise = promiseResolvedWith(startResult);
    uponPromise(startPromise, () => {
        controller._started = true;
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }, r => {
        controller._started = true;
        WritableStreamDealWithRejection(stream, r);
    });
}
function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
    const controller = Object.create(WritableStreamDefaultController.prototype);
    let startAlgorithm = () => undefined;
    let writeAlgorithm = () => promiseResolvedWith(undefined);
    let closeAlgorithm = () => promiseResolvedWith(undefined);
    let abortAlgorithm = () => promiseResolvedWith(undefined);
    if (underlyingSink.start !== undefined) {
        startAlgorithm = () => underlyingSink.start(controller);
    }
    if (underlyingSink.write !== undefined) {
        writeAlgorithm = chunk => underlyingSink.write(chunk, controller);
    }
    if (underlyingSink.close !== undefined) {
        closeAlgorithm = () => underlyingSink.close();
    }
    if (underlyingSink.abort !== undefined) {
        abortAlgorithm = reason => underlyingSink.abort(reason);
    }
    SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
}
// ClearAlgorithms may be called twice. Erroring the same stream in multiple ways will often result in redundant calls.
function WritableStreamDefaultControllerClearAlgorithms(controller) {
    controller._writeAlgorithm = undefined;
    controller._closeAlgorithm = undefined;
    controller._abortAlgorithm = undefined;
    controller._strategySizeAlgorithm = undefined;
}
function WritableStreamDefaultControllerClose(controller) {
    EnqueueValueWithSize(controller, closeSentinel, 0);
    WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
}
function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
    try {
        return controller._strategySizeAlgorithm(chunk);
    }
    catch (chunkSizeE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
        return 1;
    }
}
function WritableStreamDefaultControllerGetDesiredSize(controller) {
    return controller._strategyHWM - controller._queueTotalSize;
}
function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
    try {
        EnqueueValueWithSize(controller, chunk, chunkSize);
    }
    catch (enqueueE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
        return;
    }
    const stream = controller._controlledWritableStream;
    if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === 'writable') {
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
    }
    WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
}
// Abstract operations for the WritableStreamDefaultController.
function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
    const stream = controller._controlledWritableStream;
    if (!controller._started) {
        return;
    }
    if (stream._inFlightWriteRequest !== undefined) {
        return;
    }
    const state = stream._state;
    if (state === 'erroring') {
        WritableStreamFinishErroring(stream);
        return;
    }
    if (controller._queue.length === 0) {
        return;
    }
    const value = PeekQueueValue(controller);
    if (value === closeSentinel) {
        WritableStreamDefaultControllerProcessClose(controller);
    }
    else {
        WritableStreamDefaultControllerProcessWrite(controller, value);
    }
}
function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
    if (controller._controlledWritableStream._state === 'writable') {
        WritableStreamDefaultControllerError(controller, error);
    }
}
function WritableStreamDefaultControllerProcessClose(controller) {
    const stream = controller._controlledWritableStream;
    WritableStreamMarkCloseRequestInFlight(stream);
    DequeueValue(controller);
    const sinkClosePromise = controller._closeAlgorithm();
    WritableStreamDefaultControllerClearAlgorithms(controller);
    uponPromise(sinkClosePromise, () => {
        WritableStreamFinishInFlightClose(stream);
    }, reason => {
        WritableStreamFinishInFlightCloseWithError(stream, reason);
    });
}
function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
    const stream = controller._controlledWritableStream;
    WritableStreamMarkFirstWriteRequestInFlight(stream);
    const sinkWritePromise = controller._writeAlgorithm(chunk);
    uponPromise(sinkWritePromise, () => {
        WritableStreamFinishInFlightWrite(stream);
        const state = stream._state;
        DequeueValue(controller);
        if (!WritableStreamCloseQueuedOrInFlight(stream) && state === 'writable') {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }, reason => {
        if (stream._state === 'writable') {
            WritableStreamDefaultControllerClearAlgorithms(controller);
        }
        WritableStreamFinishInFlightWriteWithError(stream, reason);
    });
}
function WritableStreamDefaultControllerGetBackpressure(controller) {
    const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
    return desiredSize <= 0;
}
// A client of WritableStreamDefaultController may use these functions directly to bypass state check.
function WritableStreamDefaultControllerError(controller, error) {
    const stream = controller._controlledWritableStream;
    WritableStreamDefaultControllerClearAlgorithms(controller);
    WritableStreamStartErroring(stream, error);
}
// Helper functions for the WritableStream.
function streamBrandCheckException$2(name) {
    return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
}
// Helper functions for the WritableStreamDefaultController.
function defaultControllerBrandCheckException$2(name) {
    return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
}
// Helper functions for the WritableStreamDefaultWriter.
function defaultWriterBrandCheckException(name) {
    return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
}
function defaultWriterLockException(name) {
    return new TypeError('Cannot ' + name + ' a stream using a released writer');
}
function defaultWriterClosedPromiseInitialize(writer) {
    writer._closedPromise = newPromise((resolve, reject) => {
        writer._closedPromise_resolve = resolve;
        writer._closedPromise_reject = reject;
        writer._closedPromiseState = 'pending';
    });
}
function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
    defaultWriterClosedPromiseInitialize(writer);
    defaultWriterClosedPromiseReject(writer, reason);
}
function defaultWriterClosedPromiseInitializeAsResolved(writer) {
    defaultWriterClosedPromiseInitialize(writer);
    defaultWriterClosedPromiseResolve(writer);
}
function defaultWriterClosedPromiseReject(writer, reason) {
    if (writer._closedPromise_reject === undefined) {
        return;
    }
    setPromiseIsHandledToTrue(writer._closedPromise);
    writer._closedPromise_reject(reason);
    writer._closedPromise_resolve = undefined;
    writer._closedPromise_reject = undefined;
    writer._closedPromiseState = 'rejected';
}
function defaultWriterClosedPromiseResetToRejected(writer, reason) {
    defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
}
function defaultWriterClosedPromiseResolve(writer) {
    if (writer._closedPromise_resolve === undefined) {
        return;
    }
    writer._closedPromise_resolve(undefined);
    writer._closedPromise_resolve = undefined;
    writer._closedPromise_reject = undefined;
    writer._closedPromiseState = 'resolved';
}
function defaultWriterReadyPromiseInitialize(writer) {
    writer._readyPromise = newPromise((resolve, reject) => {
        writer._readyPromise_resolve = resolve;
        writer._readyPromise_reject = reject;
    });
    writer._readyPromiseState = 'pending';
}
function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
    defaultWriterReadyPromiseInitialize(writer);
    defaultWriterReadyPromiseReject(writer, reason);
}
function defaultWriterReadyPromiseInitializeAsResolved(writer) {
    defaultWriterReadyPromiseInitialize(writer);
    defaultWriterReadyPromiseResolve(writer);
}
function defaultWriterReadyPromiseReject(writer, reason) {
    if (writer._readyPromise_reject === undefined) {
        return;
    }
    setPromiseIsHandledToTrue(writer._readyPromise);
    writer._readyPromise_reject(reason);
    writer._readyPromise_resolve = undefined;
    writer._readyPromise_reject = undefined;
    writer._readyPromiseState = 'rejected';
}
function defaultWriterReadyPromiseReset(writer) {
    defaultWriterReadyPromiseInitialize(writer);
}
function defaultWriterReadyPromiseResetToRejected(writer, reason) {
    defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
}
function defaultWriterReadyPromiseResolve(writer) {
    if (writer._readyPromise_resolve === undefined) {
        return;
    }
    writer._readyPromise_resolve(undefined);
    writer._readyPromise_resolve = undefined;
    writer._readyPromise_reject = undefined;
    writer._readyPromiseState = 'fulfilled';
}

/// <reference lib="dom" />
const NativeDOMException = typeof DOMException !== 'undefined' ? DOMException : undefined;

/// <reference types="node" />
function isDOMExceptionConstructor(ctor) {
    if (!(typeof ctor === 'function' || typeof ctor === 'object')) {
        return false;
    }
    try {
        new ctor();
        return true;
    }
    catch (_a) {
        return false;
    }
}
function createDOMExceptionPolyfill() {
    // eslint-disable-next-line no-shadow
    const ctor = function DOMException(message, name) {
        this.message = message || '';
        this.name = name || 'Error';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    };
    ctor.prototype = Object.create(Error.prototype);
    Object.defineProperty(ctor.prototype, 'constructor', { value: ctor, writable: true, configurable: true });
    return ctor;
}
// eslint-disable-next-line no-redeclare
const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();

function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
    const reader = AcquireReadableStreamDefaultReader(source);
    const writer = AcquireWritableStreamDefaultWriter(dest);
    source._disturbed = true;
    let shuttingDown = false;
    // This is used to keep track of the spec's requirement that we wait for ongoing writes during shutdown.
    let currentWrite = promiseResolvedWith(undefined);
    return newPromise((resolve, reject) => {
        let abortAlgorithm;
        if (signal !== undefined) {
            abortAlgorithm = () => {
                const error = new DOMException$1('Aborted', 'AbortError');
                const actions = [];
                if (!preventAbort) {
                    actions.push(() => {
                        if (dest._state === 'writable') {
                            return WritableStreamAbort(dest, error);
                        }
                        return promiseResolvedWith(undefined);
                    });
                }
                if (!preventCancel) {
                    actions.push(() => {
                        if (source._state === 'readable') {
                            return ReadableStreamCancel(source, error);
                        }
                        return promiseResolvedWith(undefined);
                    });
                }
                shutdownWithAction(() => Promise.all(actions.map(action => action())), true, error);
            };
            if (signal.aborted) {
                abortAlgorithm();
                return;
            }
            signal.addEventListener('abort', abortAlgorithm);
        }
        // Using reader and writer, read all chunks from this and write them to dest
        // - Backpressure must be enforced
        // - Shutdown must stop all activity
        function pipeLoop() {
            return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                    if (done) {
                        resolveLoop();
                    }
                    else {
                        // Use `PerformPromiseThen` instead of `uponPromise` to avoid
                        // adding unnecessary `.catch(rethrowAssertionErrorRejection)` handlers
                        PerformPromiseThen(pipeStep(), next, rejectLoop);
                    }
                }
                next(false);
            });
        }
        function pipeStep() {
            if (shuttingDown) {
                return promiseResolvedWith(true);
            }
            return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                    ReadableStreamDefaultReaderRead(reader, {
                        _chunkSteps: chunk => {
                            currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), undefined, noop);
                            resolveRead(false);
                        },
                        _closeSteps: () => resolveRead(true),
                        _errorSteps: rejectRead
                    });
                });
            });
        }
        // Errors must be propagated forward
        isOrBecomesErrored(source, reader._closedPromise, storedError => {
            if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
            }
            else {
                shutdown(true, storedError);
            }
        });
        // Errors must be propagated backward
        isOrBecomesErrored(dest, writer._closedPromise, storedError => {
            if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
            }
            else {
                shutdown(true, storedError);
            }
        });
        // Closing must be propagated forward
        isOrBecomesClosed(source, reader._closedPromise, () => {
            if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
            }
            else {
                shutdown();
            }
        });
        // Closing must be propagated backward
        if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === 'closed') {
            const destClosed = new TypeError('the destination writable stream closed before all data could be piped to it');
            if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
            }
            else {
                shutdown(true, destClosed);
            }
        }
        setPromiseIsHandledToTrue(pipeLoop());
        function waitForWritesToFinish() {
            // Another write may have started while we were waiting on this currentWrite, so we have to be sure to wait
            // for that too.
            const oldCurrentWrite = currentWrite;
            return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : undefined);
        }
        function isOrBecomesErrored(stream, promise, action) {
            if (stream._state === 'errored') {
                action(stream._storedError);
            }
            else {
                uponRejection(promise, action);
            }
        }
        function isOrBecomesClosed(stream, promise, action) {
            if (stream._state === 'closed') {
                action();
            }
            else {
                uponFulfillment(promise, action);
            }
        }
        function shutdownWithAction(action, originalIsError, originalError) {
            if (shuttingDown) {
                return;
            }
            shuttingDown = true;
            if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
            }
            else {
                doTheRest();
            }
            function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), newError => finalize(true, newError));
            }
        }
        function shutdown(isError, error) {
            if (shuttingDown) {
                return;
            }
            shuttingDown = true;
            if (dest._state === 'writable' && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
            }
            else {
                finalize(isError, error);
            }
        }
        function finalize(isError, error) {
            WritableStreamDefaultWriterRelease(writer);
            ReadableStreamReaderGenericRelease(reader);
            if (signal !== undefined) {
                signal.removeEventListener('abort', abortAlgorithm);
            }
            if (isError) {
                reject(error);
            }
            else {
                resolve(undefined);
            }
        }
    });
}

/**
 * Allows control of a {@link ReadableStream | readable stream}'s state and internal queue.
 *
 * @public
 */
class ReadableStreamDefaultController {
    constructor() {
        throw new TypeError('Illegal constructor');
    }
    /**
     * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
     * over-full. An underlying source ought to use this information to determine when and how to apply backpressure.
     */
    get desiredSize() {
        if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1('desiredSize');
        }
        return ReadableStreamDefaultControllerGetDesiredSize(this);
    }
    /**
     * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
     * the stream, but once those are read, the stream will become closed.
     */
    close() {
        if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1('close');
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError('The stream is not in a state that permits close');
        }
        ReadableStreamDefaultControllerClose(this);
    }
    enqueue(chunk = undefined) {
        if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1('enqueue');
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError('The stream is not in a state that permits enqueue');
        }
        return ReadableStreamDefaultControllerEnqueue(this, chunk);
    }
    /**
     * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
     */
    error(e = undefined) {
        if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1('error');
        }
        ReadableStreamDefaultControllerError(this, e);
    }
    /** @internal */
    [CancelSteps](reason) {
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableStreamDefaultControllerClearAlgorithms(this);
        return result;
    }
    /** @internal */
    [PullSteps](readRequest) {
        const stream = this._controlledReadableStream;
        if (this._queue.length > 0) {
            const chunk = DequeueValue(this);
            if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
            }
            else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
            readRequest._chunkSteps(chunk);
        }
        else {
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
        }
    }
}
Object.defineProperties(ReadableStreamDefaultController.prototype, {
    close: { enumerable: true },
    enqueue: { enumerable: true },
    error: { enumerable: true },
    desiredSize: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: 'ReadableStreamDefaultController',
        configurable: true
    });
}
// Abstract operations for the ReadableStreamDefaultController.
function IsReadableStreamDefaultController(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_controlledReadableStream')) {
        return false;
    }
    return x instanceof ReadableStreamDefaultController;
}
function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
    const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
    if (!shouldPull) {
        return;
    }
    if (controller._pulling) {
        controller._pullAgain = true;
        return;
    }
    controller._pulling = true;
    const pullPromise = controller._pullAlgorithm();
    uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
    }, e => {
        ReadableStreamDefaultControllerError(controller, e);
    });
}
function ReadableStreamDefaultControllerShouldCallPull(controller) {
    const stream = controller._controlledReadableStream;
    if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return false;
    }
    if (!controller._started) {
        return false;
    }
    if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
    }
    const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
    if (desiredSize > 0) {
        return true;
    }
    return false;
}
function ReadableStreamDefaultControllerClearAlgorithms(controller) {
    controller._pullAlgorithm = undefined;
    controller._cancelAlgorithm = undefined;
    controller._strategySizeAlgorithm = undefined;
}
// A client of ReadableStreamDefaultController may use these functions directly to bypass state check.
function ReadableStreamDefaultControllerClose(controller) {
    if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
    }
    const stream = controller._controlledReadableStream;
    controller._closeRequested = true;
    if (controller._queue.length === 0) {
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
    }
}
function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
    if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
    }
    const stream = controller._controlledReadableStream;
    if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        ReadableStreamFulfillReadRequest(stream, chunk, false);
    }
    else {
        let chunkSize;
        try {
            chunkSize = controller._strategySizeAlgorithm(chunk);
        }
        catch (chunkSizeE) {
            ReadableStreamDefaultControllerError(controller, chunkSizeE);
            throw chunkSizeE;
        }
        try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
        }
        catch (enqueueE) {
            ReadableStreamDefaultControllerError(controller, enqueueE);
            throw enqueueE;
        }
    }
    ReadableStreamDefaultControllerCallPullIfNeeded(controller);
}
function ReadableStreamDefaultControllerError(controller, e) {
    const stream = controller._controlledReadableStream;
    if (stream._state !== 'readable') {
        return;
    }
    ResetQueue(controller);
    ReadableStreamDefaultControllerClearAlgorithms(controller);
    ReadableStreamError(stream, e);
}
function ReadableStreamDefaultControllerGetDesiredSize(controller) {
    const state = controller._controlledReadableStream._state;
    if (state === 'errored') {
        return null;
    }
    if (state === 'closed') {
        return 0;
    }
    return controller._strategyHWM - controller._queueTotalSize;
}
// This is used in the implementation of TransformStream.
function ReadableStreamDefaultControllerHasBackpressure(controller) {
    if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
        return false;
    }
    return true;
}
function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
    const state = controller._controlledReadableStream._state;
    if (!controller._closeRequested && state === 'readable') {
        return true;
    }
    return false;
}
function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
    controller._controlledReadableStream = stream;
    controller._queue = undefined;
    controller._queueTotalSize = undefined;
    ResetQueue(controller);
    controller._started = false;
    controller._closeRequested = false;
    controller._pullAgain = false;
    controller._pulling = false;
    controller._strategySizeAlgorithm = sizeAlgorithm;
    controller._strategyHWM = highWaterMark;
    controller._pullAlgorithm = pullAlgorithm;
    controller._cancelAlgorithm = cancelAlgorithm;
    stream._readableStreamController = controller;
    const startResult = startAlgorithm();
    uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }, r => {
        ReadableStreamDefaultControllerError(controller, r);
    });
}
function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
    const controller = Object.create(ReadableStreamDefaultController.prototype);
    let startAlgorithm = () => undefined;
    let pullAlgorithm = () => promiseResolvedWith(undefined);
    let cancelAlgorithm = () => promiseResolvedWith(undefined);
    if (underlyingSource.start !== undefined) {
        startAlgorithm = () => underlyingSource.start(controller);
    }
    if (underlyingSource.pull !== undefined) {
        pullAlgorithm = () => underlyingSource.pull(controller);
    }
    if (underlyingSource.cancel !== undefined) {
        cancelAlgorithm = reason => underlyingSource.cancel(reason);
    }
    SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
}
// Helper functions for the ReadableStreamDefaultController.
function defaultControllerBrandCheckException$1(name) {
    return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
}

function ReadableStreamTee(stream, cloneForBranch2) {
    if (IsReadableByteStreamController(stream._readableStreamController)) {
        return ReadableByteStreamTee(stream);
    }
    return ReadableStreamDefaultTee(stream);
}
function ReadableStreamDefaultTee(stream, cloneForBranch2) {
    const reader = AcquireReadableStreamDefaultReader(stream);
    let reading = false;
    let readAgain = false;
    let canceled1 = false;
    let canceled2 = false;
    let reason1;
    let reason2;
    let branch1;
    let branch2;
    let resolveCancelPromise;
    const cancelPromise = newPromise(resolve => {
        resolveCancelPromise = resolve;
    });
    function pullAlgorithm() {
        if (reading) {
            readAgain = true;
            return promiseResolvedWith(undefined);
        }
        reading = true;
        const readRequest = {
            _chunkSteps: chunk => {
                // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
                // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
                // successful synchronously-available reads get ahead of asynchronously-available errors.
                queueMicrotask(() => {
                    readAgain = false;
                    const chunk1 = chunk;
                    const chunk2 = chunk;
                    // There is no way to access the cloning code right now in the reference implementation.
                    // If we add one then we'll need an implementation for serializable objects.
                    // if (!canceled2 && cloneForBranch2) {
                    //   chunk2 = StructuredDeserialize(StructuredSerialize(chunk2));
                    // }
                    if (!canceled1) {
                        ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                    }
                    if (!canceled2) {
                        ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                    }
                    reading = false;
                    if (readAgain) {
                        pullAlgorithm();
                    }
                });
            },
            _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                    ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                    ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                    resolveCancelPromise(undefined);
                }
            },
            _errorSteps: () => {
                reading = false;
            }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promiseResolvedWith(undefined);
    }
    function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
    }
    function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
    }
    function startAlgorithm() {
        // do nothing
    }
    branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
    branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
    uponRejection(reader._closedPromise, (r) => {
        ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
        ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
        if (!canceled1 || !canceled2) {
            resolveCancelPromise(undefined);
        }
    });
    return [branch1, branch2];
}
function ReadableByteStreamTee(stream) {
    let reader = AcquireReadableStreamDefaultReader(stream);
    let reading = false;
    let readAgainForBranch1 = false;
    let readAgainForBranch2 = false;
    let canceled1 = false;
    let canceled2 = false;
    let reason1;
    let reason2;
    let branch1;
    let branch2;
    let resolveCancelPromise;
    const cancelPromise = newPromise(resolve => {
        resolveCancelPromise = resolve;
    });
    function forwardReaderError(thisReader) {
        uponRejection(thisReader._closedPromise, r => {
            if (thisReader !== reader) {
                return;
            }
            ReadableByteStreamControllerError(branch1._readableStreamController, r);
            ReadableByteStreamControllerError(branch2._readableStreamController, r);
            if (!canceled1 || !canceled2) {
                resolveCancelPromise(undefined);
            }
        });
    }
    function pullWithDefaultReader() {
        if (IsReadableStreamBYOBReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamDefaultReader(stream);
            forwardReaderError(reader);
        }
        const readRequest = {
            _chunkSteps: chunk => {
                // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
                // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
                // successful synchronously-available reads get ahead of asynchronously-available errors.
                queueMicrotask(() => {
                    readAgainForBranch1 = false;
                    readAgainForBranch2 = false;
                    const chunk1 = chunk;
                    let chunk2 = chunk;
                    if (!canceled1 && !canceled2) {
                        try {
                            chunk2 = CloneAsUint8Array(chunk);
                        }
                        catch (cloneE) {
                            ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                            ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                            resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                            return;
                        }
                    }
                    if (!canceled1) {
                        ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                    }
                    if (!canceled2) {
                        ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                    }
                    reading = false;
                    if (readAgainForBranch1) {
                        pull1Algorithm();
                    }
                    else if (readAgainForBranch2) {
                        pull2Algorithm();
                    }
                });
            },
            _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                    ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                    ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                    resolveCancelPromise(undefined);
                }
            },
            _errorSteps: () => {
                reading = false;
            }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
    }
    function pullWithBYOBReader(view, forBranch2) {
        if (IsReadableStreamDefaultReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamBYOBReader(stream);
            forwardReaderError(reader);
        }
        const byobBranch = forBranch2 ? branch2 : branch1;
        const otherBranch = forBranch2 ? branch1 : branch2;
        const readIntoRequest = {
            _chunkSteps: chunk => {
                // This needs to be delayed a microtask because it takes at least a microtask to detect errors (using
                // reader._closedPromise below), and we want errors in stream to error both branches immediately. We cannot let
                // successful synchronously-available reads get ahead of asynchronously-available errors.
                queueMicrotask(() => {
                    readAgainForBranch1 = false;
                    readAgainForBranch2 = false;
                    const byobCanceled = forBranch2 ? canceled2 : canceled1;
                    const otherCanceled = forBranch2 ? canceled1 : canceled2;
                    if (!otherCanceled) {
                        let clonedChunk;
                        try {
                            clonedChunk = CloneAsUint8Array(chunk);
                        }
                        catch (cloneE) {
                            ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                            ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                            resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                            return;
                        }
                        if (!byobCanceled) {
                            ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                        }
                        ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                    }
                    else if (!byobCanceled) {
                        ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    reading = false;
                    if (readAgainForBranch1) {
                        pull1Algorithm();
                    }
                    else if (readAgainForBranch2) {
                        pull2Algorithm();
                    }
                });
            },
            _closeSteps: chunk => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                    ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                    ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== undefined) {
                    if (!byobCanceled) {
                        ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                        ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                    }
                }
                if (!byobCanceled || !otherCanceled) {
                    resolveCancelPromise(undefined);
                }
            },
            _errorSteps: () => {
                reading = false;
            }
        };
        ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
    }
    function pull1Algorithm() {
        if (reading) {
            readAgainForBranch1 = true;
            return promiseResolvedWith(undefined);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
        if (byobRequest === null) {
            pullWithDefaultReader();
        }
        else {
            pullWithBYOBReader(byobRequest._view, false);
        }
        return promiseResolvedWith(undefined);
    }
    function pull2Algorithm() {
        if (reading) {
            readAgainForBranch2 = true;
            return promiseResolvedWith(undefined);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
        if (byobRequest === null) {
            pullWithDefaultReader();
        }
        else {
            pullWithBYOBReader(byobRequest._view, true);
        }
        return promiseResolvedWith(undefined);
    }
    function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
    }
    function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
    }
    function startAlgorithm() {
        return;
    }
    branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
    branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
    forwardReaderError(reader);
    return [branch1, branch2];
}

function convertUnderlyingDefaultOrByteSource(source, context) {
    assertDictionary(source, context);
    const original = source;
    const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
    const cancel = original === null || original === void 0 ? void 0 : original.cancel;
    const pull = original === null || original === void 0 ? void 0 : original.pull;
    const start = original === null || original === void 0 ? void 0 : original.start;
    const type = original === null || original === void 0 ? void 0 : original.type;
    return {
        autoAllocateChunkSize: autoAllocateChunkSize === undefined ?
            undefined :
            convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
        cancel: cancel === undefined ?
            undefined :
            convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
        pull: pull === undefined ?
            undefined :
            convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
        start: start === undefined ?
            undefined :
            convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
        type: type === undefined ? undefined : convertReadableStreamType(type, `${context} has member 'type' that`)
    };
}
function convertUnderlyingSourceCancelCallback(fn, original, context) {
    assertFunction(fn, context);
    return (reason) => promiseCall(fn, original, [reason]);
}
function convertUnderlyingSourcePullCallback(fn, original, context) {
    assertFunction(fn, context);
    return (controller) => promiseCall(fn, original, [controller]);
}
function convertUnderlyingSourceStartCallback(fn, original, context) {
    assertFunction(fn, context);
    return (controller) => reflectCall(fn, original, [controller]);
}
function convertReadableStreamType(type, context) {
    type = `${type}`;
    if (type !== 'bytes') {
        throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
    }
    return type;
}

function convertReaderOptions(options, context) {
    assertDictionary(options, context);
    const mode = options === null || options === void 0 ? void 0 : options.mode;
    return {
        mode: mode === undefined ? undefined : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
    };
}
function convertReadableStreamReaderMode(mode, context) {
    mode = `${mode}`;
    if (mode !== 'byob') {
        throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
    }
    return mode;
}

function convertIteratorOptions(options, context) {
    assertDictionary(options, context);
    const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
    return { preventCancel: Boolean(preventCancel) };
}

function convertPipeOptions(options, context) {
    assertDictionary(options, context);
    const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
    const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
    const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
    const signal = options === null || options === void 0 ? void 0 : options.signal;
    if (signal !== undefined) {
        assertAbortSignal(signal, `${context} has member 'signal' that`);
    }
    return {
        preventAbort: Boolean(preventAbort),
        preventCancel: Boolean(preventCancel),
        preventClose: Boolean(preventClose),
        signal
    };
}
function assertAbortSignal(signal, context) {
    if (!isAbortSignal(signal)) {
        throw new TypeError(`${context} is not an AbortSignal.`);
    }
}

function convertReadableWritablePair(pair, context) {
    assertDictionary(pair, context);
    const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
    assertRequiredField(readable, 'readable', 'ReadableWritablePair');
    assertReadableStream(readable, `${context} has member 'readable' that`);
    const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
    assertRequiredField(writable, 'writable', 'ReadableWritablePair');
    assertWritableStream(writable, `${context} has member 'writable' that`);
    return { readable, writable };
}

/**
 * A readable stream represents a source of data, from which you can read.
 *
 * @public
 */
class ReadableStream {
    constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
        if (rawUnderlyingSource === undefined) {
            rawUnderlyingSource = null;
        }
        else {
            assertObject(rawUnderlyingSource, 'First parameter');
        }
        const strategy = convertQueuingStrategy(rawStrategy, 'Second parameter');
        const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, 'First parameter');
        InitializeReadableStream(this);
        if (underlyingSource.type === 'bytes') {
            if (strategy.size !== undefined) {
                throw new RangeError('The strategy for a byte stream cannot have a size function');
            }
            const highWaterMark = ExtractHighWaterMark(strategy, 0);
            SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
        }
        else {
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
        }
    }
    /**
     * Whether or not the readable stream is locked to a {@link ReadableStreamDefaultReader | reader}.
     */
    get locked() {
        if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1('locked');
        }
        return IsReadableStreamLocked(this);
    }
    /**
     * Cancels the stream, signaling a loss of interest in the stream by a consumer.
     *
     * The supplied `reason` argument will be given to the underlying source's {@link UnderlyingSource.cancel | cancel()}
     * method, which might or might not use it.
     */
    cancel(reason = undefined) {
        if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1('cancel'));
        }
        if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError('Cannot cancel a stream that already has a reader'));
        }
        return ReadableStreamCancel(this, reason);
    }
    getReader(rawOptions = undefined) {
        if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1('getReader');
        }
        const options = convertReaderOptions(rawOptions, 'First parameter');
        if (options.mode === undefined) {
            return AcquireReadableStreamDefaultReader(this);
        }
        return AcquireReadableStreamBYOBReader(this);
    }
    pipeThrough(rawTransform, rawOptions = {}) {
        if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1('pipeThrough');
        }
        assertRequiredArgument(rawTransform, 1, 'pipeThrough');
        const transform = convertReadableWritablePair(rawTransform, 'First parameter');
        const options = convertPipeOptions(rawOptions, 'Second parameter');
        if (IsReadableStreamLocked(this)) {
            throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream');
        }
        if (IsWritableStreamLocked(transform.writable)) {
            throw new TypeError('ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream');
        }
        const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        setPromiseIsHandledToTrue(promise);
        return transform.readable;
    }
    pipeTo(destination, rawOptions = {}) {
        if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1('pipeTo'));
        }
        if (destination === undefined) {
            return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
        }
        if (!IsWritableStream(destination)) {
            return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
        }
        let options;
        try {
            options = convertPipeOptions(rawOptions, 'Second parameter');
        }
        catch (e) {
            return promiseRejectedWith(e);
        }
        if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream'));
        }
        if (IsWritableStreamLocked(destination)) {
            return promiseRejectedWith(new TypeError('ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream'));
        }
        return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
    }
    /**
     * Tees this readable stream, returning a two-element array containing the two resulting branches as
     * new {@link ReadableStream} instances.
     *
     * Teeing a stream will lock it, preventing any other consumer from acquiring a reader.
     * To cancel the stream, cancel both of the resulting branches; a composite cancellation reason will then be
     * propagated to the stream's underlying source.
     *
     * Note that the chunks seen in each branch will be the same object. If the chunks are not immutable,
     * this could allow interference between the two branches.
     */
    tee() {
        if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1('tee');
        }
        const branches = ReadableStreamTee(this);
        return CreateArrayFromList(branches);
    }
    values(rawOptions = undefined) {
        if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1('values');
        }
        const options = convertIteratorOptions(rawOptions, 'First parameter');
        return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
    }
}
Object.defineProperties(ReadableStream.prototype, {
    cancel: { enumerable: true },
    getReader: { enumerable: true },
    pipeThrough: { enumerable: true },
    pipeTo: { enumerable: true },
    tee: { enumerable: true },
    values: { enumerable: true },
    locked: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.toStringTag, {
        value: 'ReadableStream',
        configurable: true
    });
}
if (typeof SymbolPolyfill.asyncIterator === 'symbol') {
    Object.defineProperty(ReadableStream.prototype, SymbolPolyfill.asyncIterator, {
        value: ReadableStream.prototype.values,
        writable: true,
        configurable: true
    });
}
// Abstract operations for the ReadableStream.
// Throws if and only if startAlgorithm throws.
function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
    const stream = Object.create(ReadableStream.prototype);
    InitializeReadableStream(stream);
    const controller = Object.create(ReadableStreamDefaultController.prototype);
    SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
    return stream;
}
// Throws if and only if startAlgorithm throws.
function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
    const stream = Object.create(ReadableStream.prototype);
    InitializeReadableStream(stream);
    const controller = Object.create(ReadableByteStreamController.prototype);
    SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, undefined);
    return stream;
}
function InitializeReadableStream(stream) {
    stream._state = 'readable';
    stream._reader = undefined;
    stream._storedError = undefined;
    stream._disturbed = false;
}
function IsReadableStream(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_readableStreamController')) {
        return false;
    }
    return x instanceof ReadableStream;
}
function IsReadableStreamLocked(stream) {
    if (stream._reader === undefined) {
        return false;
    }
    return true;
}
// ReadableStream API exposed for controllers.
function ReadableStreamCancel(stream, reason) {
    stream._disturbed = true;
    if (stream._state === 'closed') {
        return promiseResolvedWith(undefined);
    }
    if (stream._state === 'errored') {
        return promiseRejectedWith(stream._storedError);
    }
    ReadableStreamClose(stream);
    const reader = stream._reader;
    if (reader !== undefined && IsReadableStreamBYOBReader(reader)) {
        reader._readIntoRequests.forEach(readIntoRequest => {
            readIntoRequest._closeSteps(undefined);
        });
        reader._readIntoRequests = new SimpleQueue();
    }
    const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
    return transformPromiseWith(sourceCancelPromise, noop);
}
function ReadableStreamClose(stream) {
    stream._state = 'closed';
    const reader = stream._reader;
    if (reader === undefined) {
        return;
    }
    defaultReaderClosedPromiseResolve(reader);
    if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach(readRequest => {
            readRequest._closeSteps();
        });
        reader._readRequests = new SimpleQueue();
    }
}
function ReadableStreamError(stream, e) {
    stream._state = 'errored';
    stream._storedError = e;
    const reader = stream._reader;
    if (reader === undefined) {
        return;
    }
    defaultReaderClosedPromiseReject(reader, e);
    if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach(readRequest => {
            readRequest._errorSteps(e);
        });
        reader._readRequests = new SimpleQueue();
    }
    else {
        reader._readIntoRequests.forEach(readIntoRequest => {
            readIntoRequest._errorSteps(e);
        });
        reader._readIntoRequests = new SimpleQueue();
    }
}
// Helper functions for the ReadableStream.
function streamBrandCheckException$1(name) {
    return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
}

function convertQueuingStrategyInit(init, context) {
    assertDictionary(init, context);
    const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
    assertRequiredField(highWaterMark, 'highWaterMark', 'QueuingStrategyInit');
    return {
        highWaterMark: convertUnrestrictedDouble(highWaterMark)
    };
}

// The size function must not have a prototype property nor be a constructor
const byteLengthSizeFunction = (chunk) => {
    return chunk.byteLength;
};
Object.defineProperty(byteLengthSizeFunction, 'name', {
    value: 'size',
    configurable: true
});
/**
 * A queuing strategy that counts the number of bytes in each chunk.
 *
 * @public
 */
class ByteLengthQueuingStrategy {
    constructor(options) {
        assertRequiredArgument(options, 1, 'ByteLengthQueuingStrategy');
        options = convertQueuingStrategyInit(options, 'First parameter');
        this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
    }
    /**
     * Returns the high water mark provided to the constructor.
     */
    get highWaterMark() {
        if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException('highWaterMark');
        }
        return this._byteLengthQueuingStrategyHighWaterMark;
    }
    /**
     * Measures the size of `chunk` by returning the value of its `byteLength` property.
     */
    get size() {
        if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException('size');
        }
        return byteLengthSizeFunction;
    }
}
Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
    highWaterMark: { enumerable: true },
    size: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: 'ByteLengthQueuingStrategy',
        configurable: true
    });
}
// Helper functions for the ByteLengthQueuingStrategy.
function byteLengthBrandCheckException(name) {
    return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
}
function IsByteLengthQueuingStrategy(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_byteLengthQueuingStrategyHighWaterMark')) {
        return false;
    }
    return x instanceof ByteLengthQueuingStrategy;
}

// The size function must not have a prototype property nor be a constructor
const countSizeFunction = () => {
    return 1;
};
Object.defineProperty(countSizeFunction, 'name', {
    value: 'size',
    configurable: true
});
/**
 * A queuing strategy that counts the number of chunks.
 *
 * @public
 */
class CountQueuingStrategy {
    constructor(options) {
        assertRequiredArgument(options, 1, 'CountQueuingStrategy');
        options = convertQueuingStrategyInit(options, 'First parameter');
        this._countQueuingStrategyHighWaterMark = options.highWaterMark;
    }
    /**
     * Returns the high water mark provided to the constructor.
     */
    get highWaterMark() {
        if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException('highWaterMark');
        }
        return this._countQueuingStrategyHighWaterMark;
    }
    /**
     * Measures the size of `chunk` by always returning 1.
     * This ensures that the total queue size is a count of the number of chunks in the queue.
     */
    get size() {
        if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException('size');
        }
        return countSizeFunction;
    }
}
Object.defineProperties(CountQueuingStrategy.prototype, {
    highWaterMark: { enumerable: true },
    size: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: 'CountQueuingStrategy',
        configurable: true
    });
}
// Helper functions for the CountQueuingStrategy.
function countBrandCheckException(name) {
    return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
}
function IsCountQueuingStrategy(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_countQueuingStrategyHighWaterMark')) {
        return false;
    }
    return x instanceof CountQueuingStrategy;
}

function convertTransformer(original, context) {
    assertDictionary(original, context);
    const flush = original === null || original === void 0 ? void 0 : original.flush;
    const readableType = original === null || original === void 0 ? void 0 : original.readableType;
    const start = original === null || original === void 0 ? void 0 : original.start;
    const transform = original === null || original === void 0 ? void 0 : original.transform;
    const writableType = original === null || original === void 0 ? void 0 : original.writableType;
    return {
        flush: flush === undefined ?
            undefined :
            convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
        readableType,
        start: start === undefined ?
            undefined :
            convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
        transform: transform === undefined ?
            undefined :
            convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
        writableType
    };
}
function convertTransformerFlushCallback(fn, original, context) {
    assertFunction(fn, context);
    return (controller) => promiseCall(fn, original, [controller]);
}
function convertTransformerStartCallback(fn, original, context) {
    assertFunction(fn, context);
    return (controller) => reflectCall(fn, original, [controller]);
}
function convertTransformerTransformCallback(fn, original, context) {
    assertFunction(fn, context);
    return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
}

// Class TransformStream
/**
 * A transform stream consists of a pair of streams: a {@link WritableStream | writable stream},
 * known as its writable side, and a {@link ReadableStream | readable stream}, known as its readable side.
 * In a manner specific to the transform stream in question, writes to the writable side result in new data being
 * made available for reading from the readable side.
 *
 * @public
 */
class TransformStream {
    constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
        if (rawTransformer === undefined) {
            rawTransformer = null;
        }
        const writableStrategy = convertQueuingStrategy(rawWritableStrategy, 'Second parameter');
        const readableStrategy = convertQueuingStrategy(rawReadableStrategy, 'Third parameter');
        const transformer = convertTransformer(rawTransformer, 'First parameter');
        if (transformer.readableType !== undefined) {
            throw new RangeError('Invalid readableType specified');
        }
        if (transformer.writableType !== undefined) {
            throw new RangeError('Invalid writableType specified');
        }
        const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
        const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
        const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
        const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
        let startPromise_resolve;
        const startPromise = newPromise(resolve => {
            startPromise_resolve = resolve;
        });
        InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
        if (transformer.start !== undefined) {
            startPromise_resolve(transformer.start(this._transformStreamController));
        }
        else {
            startPromise_resolve(undefined);
        }
    }
    /**
     * The readable side of the transform stream.
     */
    get readable() {
        if (!IsTransformStream(this)) {
            throw streamBrandCheckException('readable');
        }
        return this._readable;
    }
    /**
     * The writable side of the transform stream.
     */
    get writable() {
        if (!IsTransformStream(this)) {
            throw streamBrandCheckException('writable');
        }
        return this._writable;
    }
}
Object.defineProperties(TransformStream.prototype, {
    readable: { enumerable: true },
    writable: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
        value: 'TransformStream',
        configurable: true
    });
}
function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
    function startAlgorithm() {
        return startPromise;
    }
    function writeAlgorithm(chunk) {
        return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
    }
    function abortAlgorithm(reason) {
        return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
    }
    function closeAlgorithm() {
        return TransformStreamDefaultSinkCloseAlgorithm(stream);
    }
    stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
    function pullAlgorithm() {
        return TransformStreamDefaultSourcePullAlgorithm(stream);
    }
    function cancelAlgorithm(reason) {
        TransformStreamErrorWritableAndUnblockWrite(stream, reason);
        return promiseResolvedWith(undefined);
    }
    stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
    // The [[backpressure]] slot is set to undefined so that it can be initialised by TransformStreamSetBackpressure.
    stream._backpressure = undefined;
    stream._backpressureChangePromise = undefined;
    stream._backpressureChangePromise_resolve = undefined;
    TransformStreamSetBackpressure(stream, true);
    stream._transformStreamController = undefined;
}
function IsTransformStream(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_transformStreamController')) {
        return false;
    }
    return x instanceof TransformStream;
}
// This is a no-op if both sides are already errored.
function TransformStreamError(stream, e) {
    ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
    TransformStreamErrorWritableAndUnblockWrite(stream, e);
}
function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
    TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
    WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
    if (stream._backpressure) {
        // Pretend that pull() was called to permit any pending write() calls to complete. TransformStreamSetBackpressure()
        // cannot be called from enqueue() or pull() once the ReadableStream is errored, so this will will be the final time
        // _backpressure is set.
        TransformStreamSetBackpressure(stream, false);
    }
}
function TransformStreamSetBackpressure(stream, backpressure) {
    // Passes also when called during construction.
    if (stream._backpressureChangePromise !== undefined) {
        stream._backpressureChangePromise_resolve();
    }
    stream._backpressureChangePromise = newPromise(resolve => {
        stream._backpressureChangePromise_resolve = resolve;
    });
    stream._backpressure = backpressure;
}
// Class TransformStreamDefaultController
/**
 * Allows control of the {@link ReadableStream} and {@link WritableStream} of the associated {@link TransformStream}.
 *
 * @public
 */
class TransformStreamDefaultController {
    constructor() {
        throw new TypeError('Illegal constructor');
    }
    /**
     * Returns the desired size to fill the readable side’s internal queue. It can be negative, if the queue is over-full.
     */
    get desiredSize() {
        if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException('desiredSize');
        }
        const readableController = this._controlledTransformStream._readable._readableStreamController;
        return ReadableStreamDefaultControllerGetDesiredSize(readableController);
    }
    enqueue(chunk = undefined) {
        if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException('enqueue');
        }
        TransformStreamDefaultControllerEnqueue(this, chunk);
    }
    /**
     * Errors both the readable side and the writable side of the controlled transform stream, making all future
     * interactions with it fail with the given error `e`. Any chunks queued for transformation will be discarded.
     */
    error(reason = undefined) {
        if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException('error');
        }
        TransformStreamDefaultControllerError(this, reason);
    }
    /**
     * Closes the readable side and errors the writable side of the controlled transform stream. This is useful when the
     * transformer only needs to consume a portion of the chunks written to the writable side.
     */
    terminate() {
        if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException('terminate');
        }
        TransformStreamDefaultControllerTerminate(this);
    }
}
Object.defineProperties(TransformStreamDefaultController.prototype, {
    enqueue: { enumerable: true },
    error: { enumerable: true },
    terminate: { enumerable: true },
    desiredSize: { enumerable: true }
});
if (typeof SymbolPolyfill.toStringTag === 'symbol') {
    Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: 'TransformStreamDefaultController',
        configurable: true
    });
}
// Transform Stream Default Controller Abstract Operations
function IsTransformStreamDefaultController(x) {
    if (!typeIsObject(x)) {
        return false;
    }
    if (!Object.prototype.hasOwnProperty.call(x, '_controlledTransformStream')) {
        return false;
    }
    return x instanceof TransformStreamDefaultController;
}
function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
    controller._controlledTransformStream = stream;
    stream._transformStreamController = controller;
    controller._transformAlgorithm = transformAlgorithm;
    controller._flushAlgorithm = flushAlgorithm;
}
function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
    const controller = Object.create(TransformStreamDefaultController.prototype);
    let transformAlgorithm = (chunk) => {
        try {
            TransformStreamDefaultControllerEnqueue(controller, chunk);
            return promiseResolvedWith(undefined);
        }
        catch (transformResultE) {
            return promiseRejectedWith(transformResultE);
        }
    };
    let flushAlgorithm = () => promiseResolvedWith(undefined);
    if (transformer.transform !== undefined) {
        transformAlgorithm = chunk => transformer.transform(chunk, controller);
    }
    if (transformer.flush !== undefined) {
        flushAlgorithm = () => transformer.flush(controller);
    }
    SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
}
function TransformStreamDefaultControllerClearAlgorithms(controller) {
    controller._transformAlgorithm = undefined;
    controller._flushAlgorithm = undefined;
}
function TransformStreamDefaultControllerEnqueue(controller, chunk) {
    const stream = controller._controlledTransformStream;
    const readableController = stream._readable._readableStreamController;
    if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
        throw new TypeError('Readable side is not in a state that permits enqueue');
    }
    // We throttle transform invocations based on the backpressure of the ReadableStream, but we still
    // accept TransformStreamDefaultControllerEnqueue() calls.
    try {
        ReadableStreamDefaultControllerEnqueue(readableController, chunk);
    }
    catch (e) {
        // This happens when readableStrategy.size() throws.
        TransformStreamErrorWritableAndUnblockWrite(stream, e);
        throw stream._readable._storedError;
    }
    const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
    if (backpressure !== stream._backpressure) {
        TransformStreamSetBackpressure(stream, true);
    }
}
function TransformStreamDefaultControllerError(controller, e) {
    TransformStreamError(controller._controlledTransformStream, e);
}
function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
    const transformPromise = controller._transformAlgorithm(chunk);
    return transformPromiseWith(transformPromise, undefined, r => {
        TransformStreamError(controller._controlledTransformStream, r);
        throw r;
    });
}
function TransformStreamDefaultControllerTerminate(controller) {
    const stream = controller._controlledTransformStream;
    const readableController = stream._readable._readableStreamController;
    ReadableStreamDefaultControllerClose(readableController);
    const error = new TypeError('TransformStream terminated');
    TransformStreamErrorWritableAndUnblockWrite(stream, error);
}
// TransformStreamDefaultSink Algorithms
function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
    const controller = stream._transformStreamController;
    if (stream._backpressure) {
        const backpressureChangePromise = stream._backpressureChangePromise;
        return transformPromiseWith(backpressureChangePromise, () => {
            const writable = stream._writable;
            const state = writable._state;
            if (state === 'erroring') {
                throw writable._storedError;
            }
            return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        });
    }
    return TransformStreamDefaultControllerPerformTransform(controller, chunk);
}
function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
    // abort() is not called synchronously, so it is possible for abort() to be called when the stream is already
    // errored.
    TransformStreamError(stream, reason);
    return promiseResolvedWith(undefined);
}
function TransformStreamDefaultSinkCloseAlgorithm(stream) {
    // stream._readable cannot change after construction, so caching it across a call to user code is safe.
    const readable = stream._readable;
    const controller = stream._transformStreamController;
    const flushPromise = controller._flushAlgorithm();
    TransformStreamDefaultControllerClearAlgorithms(controller);
    // Return a promise that is fulfilled with undefined on success.
    return transformPromiseWith(flushPromise, () => {
        if (readable._state === 'errored') {
            throw readable._storedError;
        }
        ReadableStreamDefaultControllerClose(readable._readableStreamController);
    }, r => {
        TransformStreamError(stream, r);
        throw readable._storedError;
    });
}
// TransformStreamDefaultSource Algorithms
function TransformStreamDefaultSourcePullAlgorithm(stream) {
    // Invariant. Enforced by the promises returned by start() and pull().
    TransformStreamSetBackpressure(stream, false);
    // Prevent the next pull() call until there is backpressure.
    return stream._backpressureChangePromise;
}
// Helper functions for the TransformStreamDefaultController.
function defaultControllerBrandCheckException(name) {
    return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
}
// Helper functions for the TransformStream.
function streamBrandCheckException(name) {
    return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
}


//# sourceMappingURL=ponyfill.es2018.mjs.map


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
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NEQ7QUFDN0QsQ0FBQyxDQUNpRztBQUNsRyxDQUFDLHNCQUFzQjs7QUFFdkI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQSxrREFBa0Q7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtB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QUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLElBQUk7QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsR0FBRyxJQUFJO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLEVBQUUsSUFBSTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsOENBQThDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxrQkFBa0I7QUFDL0IsZUFBZSxrQkFBa0I7QUFDakMsYUFBYSxrQkFBa0I7QUFDL0IsbUJBQW1CLGtCQUFrQjtBQUNyQyxtQkFBbUI7QUFDbkIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGdDQUFnQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxNQUFNO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxNQUFNO0FBQ3pFOztBQUVBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHFCQUFxQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsa0RBQWtEO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsNENBQTRDO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLGlEQUFpRCxtREFBbUQ7QUFDcEcsd0ZBQXdGO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGtCQUFrQjtBQUMvQixhQUFhLGtCQUFrQjtBQUMvQixtQkFBbUIsa0JBQWtCO0FBQ3JDLGFBQWEsa0JBQWtCO0FBQy9CLGNBQWMsa0JBQWtCO0FBQ2hDLG1CQUFtQixrQkFBa0I7QUFDckMsYUFBYTtBQUNiLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1Q0FBdUM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSw2Q0FBNkM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckMsY0FBYyxrQkFBa0I7QUFDaEMsYUFBYTtBQUNiLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELE1BQU07QUFDM0Q7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLE1BQU07QUFDNUU7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLE1BQU07QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsaURBQWlEO0FBQzVHO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSx3QkFBd0IsdUNBQXVDO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxrQkFBa0I7QUFDL0IsZUFBZSxrQkFBa0I7QUFDakMsYUFBYSxrQkFBa0I7QUFDL0IsbUJBQW1CO0FBQ25CLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLE1BQU07QUFDNUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELE1BQU07QUFDM0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixrQkFBa0I7QUFDdkMsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsTUFBTTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGtCQUFrQjtBQUN2QyxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxNQUFNO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLFNBQVM7QUFDekU7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLFNBQVM7QUFDekU7QUFDQTtBQUNBLHdFQUF3RSxTQUFTO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXdELHVDQUF1QztBQUMvRixzQ0FBc0MsdUNBQXVDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywwQkFBMEIsMEJBQTBCO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDLGdCQUFnQjtBQUNoQixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsc0JBQXNCLEtBQUssc0JBQXNCLG1CQUFtQixzQkFBc0I7QUFDcEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxrQkFBa0I7QUFDakMsYUFBYSxrQkFBa0I7QUFDL0IsaUJBQWlCLGtCQUFrQjtBQUNuQyxtQkFBbUI7QUFDbkIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsTUFBTTtBQUM3RTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsTUFBTTtBQUM1RDs7QUFFNlY7QUFDN1Y7Ozs7Ozs7VUNsbElBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVKQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21haWxndW4vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYWJvcnQtY29udHJvbGxlci9kaXN0L2Fib3J0LWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9jbGllbnQudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9kb21haW5zLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvZG9tYWluc0NyZWRlbnRpYWxzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvZG9tYWluc1RhZ3MudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9kb21haW5zVGVtcGxhdGVzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvZXJyb3IudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9pbmRleC50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2ludGVyZmFjZXMvU3VwcmVzc2lvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9pcC1wb29scy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2lwcy50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL2xpc3RzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvbWFpbExpc3RNZW1iZXJzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvbWVzc2FnZXMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9tdWx0aXBsZVZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9yZXF1ZXN0LnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvcm91dGVzLnRzIiwid2VicGFjazovL21haWxndW4vLi9saWIvc3RhdHMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi9zdXBwcmVzc2lvbnMudHMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL2xpYi92YWxpZGF0ZS50cyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbGliL3dlYmhvb2tzLnRzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvYmFzZS02NC9iYXNlNjQuanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9kYXRhLXVyaS10by1idWZmZXIvZGlzdC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbWFpbGd1bi8uL25vZGVfbW9kdWxlcy9ldmVudC10YXJnZXQtc2hpbS9kaXN0L2V2ZW50LXRhcmdldC1zaGltLmpzIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvZmV0Y2gtYmxvYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2t5LXVuaXZlcnNhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL2t5L3VtZC5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL3VybC1qb2luL2xpYi91cmwtam9pbi5qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly9tYWlsZ3VuL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly9tYWlsZ3VuL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJzdHJlYW1cIiIsIndlYnBhY2s6Ly9tYWlsZ3VuL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ1cmxcIiIsIndlYnBhY2s6Ly9tYWlsZ3VuL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ1dGlsXCIiLCJ3ZWJwYWNrOi8vbWFpbGd1bi9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiemxpYlwiIiwid2VicGFjazovL21haWxndW4vLi9ub2RlX21vZHVsZXMvbm9kZS1mZXRjaC9kaXN0L2luZGV4LmNqcyIsIndlYnBhY2s6Ly9tYWlsZ3VuLy4vbm9kZV9tb2R1bGVzL3dlYi1zdHJlYW1zLXBvbHlmaWxsL2Rpc3QvcG9ueWZpbGwuZXMyMDE4Lm1qcyIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWFpbGd1bi93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL21haWxndW4vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9tYWlsZ3VuL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJtYWlsZ3VuXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm1haWxndW5cIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIvKipcbiAqIEBhdXRob3IgVG9ydSBOYWdhc2hpbWEgPGh0dHBzOi8vZ2l0aHViLmNvbS9teXN0aWNhdGVhPlxuICogU2VlIExJQ0VOU0UgZmlsZSBpbiByb290IGRpcmVjdG9yeSBmb3IgZnVsbCBsaWNlbnNlLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBldmVudFRhcmdldFNoaW0gPSByZXF1aXJlKCdldmVudC10YXJnZXQtc2hpbScpO1xuXG4vKipcbiAqIFRoZSBzaWduYWwgY2xhc3MuXG4gKiBAc2VlIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jYWJvcnRzaWduYWxcbiAqL1xuY2xhc3MgQWJvcnRTaWduYWwgZXh0ZW5kcyBldmVudFRhcmdldFNoaW0uRXZlbnRUYXJnZXQge1xuICAgIC8qKlxuICAgICAqIEFib3J0U2lnbmFsIGNhbm5vdCBiZSBjb25zdHJ1Y3RlZCBkaXJlY3RseS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFib3J0U2lnbmFsIGNhbm5vdCBiZSBjb25zdHJ1Y3RlZCBkaXJlY3RseVwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhpcyBgQWJvcnRTaWduYWxgJ3MgYEFib3J0Q29udHJvbGxlcmAgaGFzIHNpZ25hbGVkIHRvIGFib3J0LCBhbmQgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICovXG4gICAgZ2V0IGFib3J0ZWQoKSB7XG4gICAgICAgIGNvbnN0IGFib3J0ZWQgPSBhYm9ydGVkRmxhZ3MuZ2V0KHRoaXMpO1xuICAgICAgICBpZiAodHlwZW9mIGFib3J0ZWQgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCAndGhpcycgdG8gYmUgYW4gJ0Fib3J0U2lnbmFsJyBvYmplY3QsIGJ1dCBnb3QgJHt0aGlzID09PSBudWxsID8gXCJudWxsXCIgOiB0eXBlb2YgdGhpc31gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWJvcnRlZDtcbiAgICB9XG59XG5ldmVudFRhcmdldFNoaW0uZGVmaW5lRXZlbnRBdHRyaWJ1dGUoQWJvcnRTaWduYWwucHJvdG90eXBlLCBcImFib3J0XCIpO1xuLyoqXG4gKiBDcmVhdGUgYW4gQWJvcnRTaWduYWwgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBjcmVhdGVBYm9ydFNpZ25hbCgpIHtcbiAgICBjb25zdCBzaWduYWwgPSBPYmplY3QuY3JlYXRlKEFib3J0U2lnbmFsLnByb3RvdHlwZSk7XG4gICAgZXZlbnRUYXJnZXRTaGltLkV2ZW50VGFyZ2V0LmNhbGwoc2lnbmFsKTtcbiAgICBhYm9ydGVkRmxhZ3Muc2V0KHNpZ25hbCwgZmFsc2UpO1xuICAgIHJldHVybiBzaWduYWw7XG59XG4vKipcbiAqIEFib3J0IGEgZ2l2ZW4gc2lnbmFsLlxuICovXG5mdW5jdGlvbiBhYm9ydFNpZ25hbChzaWduYWwpIHtcbiAgICBpZiAoYWJvcnRlZEZsYWdzLmdldChzaWduYWwpICE9PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGFib3J0ZWRGbGFncy5zZXQoc2lnbmFsLCB0cnVlKTtcbiAgICBzaWduYWwuZGlzcGF0Y2hFdmVudCh7IHR5cGU6IFwiYWJvcnRcIiB9KTtcbn1cbi8qKlxuICogQWJvcnRlZCBmbGFnIGZvciBlYWNoIGluc3RhbmNlcy5cbiAqL1xuY29uc3QgYWJvcnRlZEZsYWdzID0gbmV3IFdlYWtNYXAoKTtcbi8vIFByb3BlcnRpZXMgc2hvdWxkIGJlIGVudW1lcmFibGUuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBYm9ydFNpZ25hbC5wcm90b3R5cGUsIHtcbiAgICBhYm9ydGVkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbn0pO1xuLy8gYHRvU3RyaW5nKClgIHNob3VsZCByZXR1cm4gYFwiW29iamVjdCBBYm9ydFNpZ25hbF1cImBcbmlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gXCJzeW1ib2xcIikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYm9ydFNpZ25hbC5wcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBcIkFib3J0U2lnbmFsXCIsXG4gICAgfSk7XG59XG5cbi8qKlxuICogVGhlIEFib3J0Q29udHJvbGxlci5cbiAqIEBzZWUgaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNhYm9ydGNvbnRyb2xsZXJcbiAqL1xuY2xhc3MgQWJvcnRDb250cm9sbGVyIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgY29udHJvbGxlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc2lnbmFscy5zZXQodGhpcywgY3JlYXRlQWJvcnRTaWduYWwoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGBBYm9ydFNpZ25hbGAgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGlzIG9iamVjdC5cbiAgICAgKi9cbiAgICBnZXQgc2lnbmFsKCkge1xuICAgICAgICByZXR1cm4gZ2V0U2lnbmFsKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBYm9ydCBhbmQgc2lnbmFsIHRvIGFueSBvYnNlcnZlcnMgdGhhdCB0aGUgYXNzb2NpYXRlZCBhY3Rpdml0eSBpcyB0byBiZSBhYm9ydGVkLlxuICAgICAqL1xuICAgIGFib3J0KCkge1xuICAgICAgICBhYm9ydFNpZ25hbChnZXRTaWduYWwodGhpcykpO1xuICAgIH1cbn1cbi8qKlxuICogQXNzb2NpYXRlZCBzaWduYWxzLlxuICovXG5jb25zdCBzaWduYWxzID0gbmV3IFdlYWtNYXAoKTtcbi8qKlxuICogR2V0IHRoZSBhc3NvY2lhdGVkIHNpZ25hbCBvZiBhIGdpdmVuIGNvbnRyb2xsZXIuXG4gKi9cbmZ1bmN0aW9uIGdldFNpZ25hbChjb250cm9sbGVyKSB7XG4gICAgY29uc3Qgc2lnbmFsID0gc2lnbmFscy5nZXQoY29udHJvbGxlcik7XG4gICAgaWYgKHNpZ25hbCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkICd0aGlzJyB0byBiZSBhbiAnQWJvcnRDb250cm9sbGVyJyBvYmplY3QsIGJ1dCBnb3QgJHtjb250cm9sbGVyID09PSBudWxsID8gXCJudWxsXCIgOiB0eXBlb2YgY29udHJvbGxlcn1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHNpZ25hbDtcbn1cbi8vIFByb3BlcnRpZXMgc2hvdWxkIGJlIGVudW1lcmFibGUuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhBYm9ydENvbnRyb2xsZXIucHJvdG90eXBlLCB7XG4gICAgc2lnbmFsOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBhYm9ydDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG59KTtcbmlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gXCJzeW1ib2xcIikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYm9ydENvbnRyb2xsZXIucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogXCJBYm9ydENvbnRyb2xsZXJcIixcbiAgICB9KTtcbn1cblxuZXhwb3J0cy5BYm9ydENvbnRyb2xsZXIgPSBBYm9ydENvbnRyb2xsZXI7XG5leHBvcnRzLkFib3J0U2lnbmFsID0gQWJvcnRTaWduYWw7XG5leHBvcnRzLmRlZmF1bHQgPSBBYm9ydENvbnRyb2xsZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gQWJvcnRDb250cm9sbGVyXG5tb2R1bGUuZXhwb3J0cy5BYm9ydENvbnRyb2xsZXIgPSBtb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBBYm9ydENvbnRyb2xsZXJcbm1vZHVsZS5leHBvcnRzLkFib3J0U2lnbmFsID0gQWJvcnRTaWduYWxcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFib3J0LWNvbnRyb2xsZXIuanMubWFwXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvT3B0aW9ucyc7XG5pbXBvcnQgUmVxdWVzdE9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL1JlcXVlc3RPcHRpb25zJztcblxuaW1wb3J0IERvbWFpbkNsaWVudCBmcm9tICcuL2RvbWFpbnMnO1xuaW1wb3J0IEV2ZW50Q2xpZW50IGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCBTdGF0c0NsaWVudCBmcm9tICcuL3N0YXRzJztcbmltcG9ydCBTdXBwcmVzc2lvbkNsaWVudCBmcm9tICcuL3N1cHByZXNzaW9ucyc7XG5pbXBvcnQgV2ViaG9va0NsaWVudCBmcm9tICcuL3dlYmhvb2tzJztcbmltcG9ydCBNZXNzYWdlc0NsaWVudCBmcm9tICcuL21lc3NhZ2VzJztcbmltcG9ydCBSb3V0ZXNDbGllbnQgZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IFZhbGlkYXRlQ2xpZW50IGZyb20gJy4vdmFsaWRhdGUnO1xuaW1wb3J0IElwc0NsaWVudCBmcm9tICcuL2lwcyc7XG5pbXBvcnQgSXBQb29sc0NsaWVudCBmcm9tICcuL2lwLXBvb2xzJztcbmltcG9ydCBMaXN0c0NsaWVudCBmcm9tICcuL2xpc3RzJztcbmltcG9ydCBNYWlsTGlzdHNNZW1iZXJzIGZyb20gJy4vbWFpbExpc3RNZW1iZXJzJztcbmltcG9ydCB7IElucHV0Rm9ybURhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvSUZvcm1EYXRhJztcbmltcG9ydCBEb21haW5DcmVkZW50aWFsc0NsaWVudCBmcm9tICcuL2RvbWFpbnNDcmVkZW50aWFscyc7XG5pbXBvcnQgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGZyb20gJy4vbXVsdGlwbGVWYWxpZGF0aW9uJztcbmltcG9ydCBEb21haW5UZW1wbGF0ZXNDbGllbnQgZnJvbSAnLi9kb21haW5zVGVtcGxhdGVzJztcbmltcG9ydCBEb21haW5UYWdzQ2xpZW50IGZyb20gJy4vZG9tYWluc1RhZ3MnO1xuaW1wb3J0IHsgSU1haWxndW5DbGllbnQgfSBmcm9tICcuL2ludGVyZmFjZXMvSU1haWxndW5DbGllbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnQgaW1wbGVtZW50cyBJTWFpbGd1bkNsaWVudCB7XG4gIHByaXZhdGUgcmVxdWVzdDtcblxuICBwdWJsaWMgZG9tYWlucztcbiAgcHVibGljIHdlYmhvb2tzO1xuICBwdWJsaWMgZXZlbnRzO1xuICBwdWJsaWMgc3RhdHM7XG4gIHB1YmxpYyBzdXBwcmVzc2lvbnM7XG4gIHB1YmxpYyBtZXNzYWdlcztcbiAgcHVibGljIHJvdXRlcztcbiAgcHVibGljIHZhbGlkYXRlO1xuICBwdWJsaWMgaXBzO1xuICBwdWJsaWMgaXBfcG9vbHM7XG4gIHB1YmxpYyBsaXN0cztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPcHRpb25zLCBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIGNvbnN0IGNvbmZpZzogUmVxdWVzdE9wdGlvbnMgPSB7IC4uLm9wdGlvbnMgfSBhcyBSZXF1ZXN0T3B0aW9ucztcblxuICAgIGlmICghY29uZmlnLnVybCkge1xuICAgICAgY29uZmlnLnVybCA9ICdodHRwczovL2FwaS5tYWlsZ3VuLm5ldCc7XG4gICAgfVxuXG4gICAgaWYgKCFjb25maWcudXNlcm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVyIFwidXNlcm5hbWVcIiBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIGlmICghY29uZmlnLmtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXIgXCJrZXlcIiBpcyByZXF1aXJlZCcpO1xuICAgIH1cblxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICB0aGlzLnJlcXVlc3QgPSBuZXcgUmVxdWVzdChjb25maWcsIGZvcm1EYXRhKTtcbiAgICBjb25zdCBtYWlsTGlzdHNNZW1iZXJzID0gbmV3IE1haWxMaXN0c01lbWJlcnModGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5DcmVkZW50aWFsc0NsaWVudCA9IG5ldyBEb21haW5DcmVkZW50aWFsc0NsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIGNvbnN0IGRvbWFpblRlbXBsYXRlc0NsaWVudCA9IG5ldyBEb21haW5UZW1wbGF0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBkb21haW5UYWdzQ2xpZW50ID0gbmV3IERvbWFpblRhZ3NDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICBjb25zdCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQgPSBuZXcgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50KHRoaXMucmVxdWVzdCk7XG5cbiAgICB0aGlzLmRvbWFpbnMgPSBuZXcgRG9tYWluQ2xpZW50KFxuICAgICAgdGhpcy5yZXF1ZXN0LFxuICAgICAgZG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgICBkb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgICBkb21haW5UYWdzQ2xpZW50XG4gICAgKTtcbiAgICB0aGlzLndlYmhvb2tzID0gbmV3IFdlYmhvb2tDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmV2ZW50cyA9IG5ldyBFdmVudENsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnN1cHByZXNzaW9ucyA9IG5ldyBTdXBwcmVzc2lvbkNsaWVudCh0aGlzLnJlcXVlc3QpO1xuICAgIHRoaXMubWVzc2FnZXMgPSBuZXcgTWVzc2FnZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLnJvdXRlcyA9IG5ldyBSb3V0ZXNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmlwcyA9IG5ldyBJcHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmlwX3Bvb2xzID0gbmV3IElwUG9vbHNDbGllbnQodGhpcy5yZXF1ZXN0KTtcbiAgICB0aGlzLmxpc3RzID0gbmV3IExpc3RzQ2xpZW50KHRoaXMucmVxdWVzdCwgbWFpbExpc3RzTWVtYmVycyk7XG4gICAgdGhpcy52YWxpZGF0ZSA9IG5ldyBWYWxpZGF0ZUNsaWVudCh0aGlzLnJlcXVlc3QsIG11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCk7XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHtcbiAgRG9tYWluUmVzcG9uc2VEYXRhLFxuICBEZXN0cm95ZWREb21haW5SZXNwb25zZSxcbiAgRG9tYWluc1F1ZXJ5LFxuICBEb21haW5JbmZvLFxuICBEb21haW5MaXN0UmVzcG9uc2VEYXRhLFxuICBEb21haW5TaG9ydERhdGEsXG4gIEROU1JlY29yZCxcbiAgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UsXG4gIENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyxcbiAgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcyxcbiAgREtJTUF1dGhvcml0eUluZm8sXG4gIFVwZGF0ZWRES0lNQXV0aG9yaXR5LFxuICBVcGRhdGVkREtJTUF1dGhvcml0eVJlc3BvbnNlLFxuICBES0lNU2VsZWN0b3JJbmZvLFxuICBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UsXG4gIFdlYlByZWZpeEluZm8sXG4gIFVwZGF0ZWRXZWJQcmVmaXhSZXNwb25zZSxcbiAgUmVwbGFjZW1lbnRGb3JQb29sLFxuICBNZXNzYWdlUmVzcG9uc2UsXG59IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5zJztcblxuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgRG9tYWluVHJhY2tpbmdSZXNwb25zZSxcbiAgRG9tYWluVHJhY2tpbmdEYXRhLFxuICBPcGVuVHJhY2tpbmdJbmZvLFxuICBDbGlja1RyYWNraW5nSW5mbyxcbiAgVW5zdWJzY3JpYmVUcmFja2luZ0luZm8sXG4gIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UsXG4gIFVwZGF0ZWRPcGVuVHJhY2tpbmdcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRyYWNraW5nJztcbmltcG9ydCB7IElEb21haW5DcmVkZW50aWFscyB9IGZyb20gJy4vaW50ZXJmYWNlcy9Eb21haW5DcmVkZW50aWFscyc7XG5pbXBvcnQgeyBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRlbXBsYXRlcyc7XG5pbXBvcnQgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgZnJvbSAnLi9kb21haW5zQ3JlZGVudGlhbHMnO1xuaW1wb3J0IERvbWFpblRlbXBsYXRlc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUZW1wbGF0ZXMnO1xuaW1wb3J0IHsgSURvbWFpblRhZ3NDbGllbnQgfSBmcm9tICcuL2ludGVyZmFjZXMvRG9tYWluVGFncyc7XG5pbXBvcnQgRG9tYWluVGFnc0NsaWVudCBmcm9tICcuL2RvbWFpbnNUYWdzJztcblxuZXhwb3J0IGNsYXNzIERvbWFpbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVxdWlyZV90bHM6IGJvb2xlYW47XG4gIHNraXBfdmVyaWZpY2F0aW9uOiBib29sZWFuO1xuICBzdGF0ZTogc3RyaW5nO1xuICB3aWxkY2FyZDogYm9vbGVhbjtcbiAgc3BhbV9hY3Rpb246IHN0cmluZztcbiAgY3JlYXRlZF9hdDogc3RyaW5nO1xuICBzbXRwX3Bhc3N3b3JkOiBzdHJpbmc7XG4gIHNtdHBfbG9naW46IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICByZWNlaXZpbmdfZG5zX3JlY29yZHM6IEROU1JlY29yZFtdIHwgbnVsbDtcbiAgc2VuZGluZ19kbnNfcmVjb3JkczogRE5TUmVjb3JkW10gfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IERvbWFpblNob3J0RGF0YSwgcmVjZWl2aW5nPzogRE5TUmVjb3JkW10gfCBudWxsLCBzZW5kaW5nPzogRE5TUmVjb3JkW10gfCBudWxsKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMucmVxdWlyZV90bHMgPSBkYXRhLnJlcXVpcmVfdGxzO1xuICAgIHRoaXMuc2tpcF92ZXJpZmljYXRpb24gPSBkYXRhLnNraXBfdmVyaWZpY2F0aW9uO1xuICAgIHRoaXMuc3RhdGUgPSBkYXRhLnN0YXRlO1xuICAgIHRoaXMud2lsZGNhcmQgPSBkYXRhLndpbGRjYXJkO1xuICAgIHRoaXMuc3BhbV9hY3Rpb24gPSBkYXRhLnNwYW1fYWN0aW9uO1xuICAgIHRoaXMuY3JlYXRlZF9hdCA9IGRhdGEuY3JlYXRlZF9hdDtcbiAgICB0aGlzLnNtdHBfcGFzc3dvcmQgPSBkYXRhLnNtdHBfcGFzc3dvcmQ7XG4gICAgdGhpcy5zbXRwX2xvZ2luID0gZGF0YS5zbXRwX2xvZ2luO1xuICAgIHRoaXMudHlwZSA9IGRhdGEudHlwZTtcblxuICAgIHRoaXMucmVjZWl2aW5nX2Ruc19yZWNvcmRzID0gcmVjZWl2aW5nIHx8IG51bGw7XG4gICAgdGhpcy5zZW5kaW5nX2Ruc19yZWNvcmRzID0gc2VuZGluZyB8fCBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbWFpbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHB1YmxpYyBkb21haW5DcmVkZW50aWFsczogSURvbWFpbkNyZWRlbnRpYWxzO1xuICBwdWJsaWMgZG9tYWluVGVtcGxhdGVzOiBJRG9tYWluVGVtcGxhdGVzQ2xpZW50O1xuICBwdWJsaWMgZG9tYWluVGFnczogSURvbWFpblRhZ3NDbGllbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBkb21haW5DcmVkZW50aWFsc0NsaWVudDogRG9tYWluQ3JlZGVudGlhbHNDbGllbnQsXG4gICAgZG9tYWluVGVtcGxhdGVzQ2xpZW50OiBEb21haW5UZW1wbGF0ZXNDbGllbnQsXG4gICAgZG9tYWluVGFnc0NsaWVudDogRG9tYWluVGFnc0NsaWVudFxuICApIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuZG9tYWluQ3JlZGVudGlhbHMgPSBkb21haW5DcmVkZW50aWFsc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRlbXBsYXRlcyA9IGRvbWFpblRlbXBsYXRlc0NsaWVudDtcbiAgICB0aGlzLmRvbWFpblRhZ3MgPSBkb21haW5UYWdzQ2xpZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VNZXNzYWdlKHJlc3BvbnNlOiBEZXN0cm95ZWREb21haW5SZXNwb25zZSkgOiBNZXNzYWdlUmVzcG9uc2Uge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW5MaXN0KHJlc3BvbnNlOiBEb21haW5MaXN0UmVzcG9uc2VEYXRhKTogRG9tYWluW10ge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5Lml0ZW1zLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIG5ldyBEb21haW4oaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURvbWFpbihyZXNwb25zZTogRG9tYWluUmVzcG9uc2VEYXRhKTogRG9tYWluIHtcbiAgICByZXR1cm4gbmV3IERvbWFpbihcbiAgICAgIHJlc3BvbnNlLmJvZHkuZG9tYWluLFxuICAgICAgcmVzcG9uc2UuYm9keS5yZWNlaXZpbmdfZG5zX3JlY29yZHMsXG4gICAgICByZXNwb25zZS5ib2R5LnNlbmRpbmdfZG5zX3JlY29yZHNcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUcmFja2luZ1NldHRpbmdzKHJlc3BvbnNlOiBEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6IERvbWFpblRyYWNraW5nRGF0YSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkudHJhY2tpbmc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVRyYWNraW5nVXBkYXRlKHJlc3BvbnNlOiBVcGRhdGVEb21haW5UcmFja2luZ1Jlc3BvbnNlKSA6VXBkYXRlZE9wZW5UcmFja2luZyB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cblxuICBsaXN0KHF1ZXJ5PzogRG9tYWluc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5bXT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjMvZG9tYWlucycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbkxpc3QocmVzIGFzIERvbWFpbkxpc3RSZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZykgOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpbihyZXMgYXMgRG9tYWluUmVzcG9uc2VEYXRhKSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogRG9tYWluSW5mbykgOiBQcm9taXNlPERvbWFpbj4ge1xuICAgIGNvbnN0IHBvc3RPYmogPSB7IC4uLmRhdGEgfTtcbiAgICBpZiAoJ2ZvcmNlX2RraW1fYXV0aG9yaXR5JyBpbiBwb3N0T2JqICYmIHR5cGVvZiBwb3N0T2JqLmZvcmNlX2RraW1fYXV0aG9yaXR5ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHBvc3RPYmouZm9yY2VfZGtpbV9hdXRob3JpdHkgPSBwb3N0T2JqLnRvU3RyaW5nKCkgPT09ICd0cnVlJyA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKCcvdjMvZG9tYWlucycsIHBvc3RPYmopXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluKHJlcyBhcyBEb21haW5SZXNwb25zZURhdGEpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE1lc3NhZ2VSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjMvZG9tYWlucy8ke2RvbWFpbn1gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2UocmVzIGFzIERlc3Ryb3llZERvbWFpblJlc3BvbnNlKSk7XG4gIH1cblxuICBnZXRDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nKTogUHJvbWlzZTxDb25uZWN0aW9uU2V0dGluZ3M+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3YzL2RvbWFpbnMvJHtkb21haW59L2Nvbm5lY3Rpb25gKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgQ29ubmVjdGlvblNldHRpbmdzUmVzcG9uc2UpXG4gICAgICAudGhlbigocmVzOkNvbm5lY3Rpb25TZXR0aW5nc1Jlc3BvbnNlKSA9PiByZXMuYm9keS5jb25uZWN0aW9uIGFzIENvbm5lY3Rpb25TZXR0aW5ncyk7XG4gIH1cblxuICB1cGRhdGVDb25uZWN0aW9uKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBDb25uZWN0aW9uU2V0dGluZ3MpOiBQcm9taXNlPFVwZGF0ZWRDb25uZWN0aW9uU2V0dGluZ3M+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2Nvbm5lY3Rpb25gLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlcyA6IEFQSVJlc3BvbnNlKSA9PiByZXMgYXMgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcylcbiAgICAgIC50aGVuKChyZXM6VXBkYXRlZENvbm5lY3Rpb25TZXR0aW5nc1JlcykgPT4gcmVzLmJvZHkgYXMgVXBkYXRlZENvbm5lY3Rpb25TZXR0aW5ncyk7XG4gIH1cblxuICAvLyBUcmFja2luZ1xuXG4gIGdldFRyYWNraW5nKGRvbWFpbjogc3RyaW5nKSA6IFByb21pc2U8RG9tYWluVHJhY2tpbmdEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd0cmFja2luZycpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VUcmFja2luZ1NldHRpbmdzKTtcbiAgfVxuXG4gIHVwZGF0ZVRyYWNraW5nKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkYXRhOiBPcGVuVHJhY2tpbmdJbmZvIHwgQ2xpY2tUcmFja2luZ0luZm8gfCBVbnN1YnNjcmliZVRyYWNraW5nSW5mb1xuICApOiBQcm9taXNlPFVwZGF0ZWRPcGVuVHJhY2tpbmc+IHtcbiAgICBpZiAodHlwZW9mIGRhdGE/LmFjdGl2ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3IoeyBzdGF0dXM6IDQwMCwgc3RhdHVzVGV4dDogJycsIGJvZHk6IHsgbWVzc2FnZTogJ1Byb3BlcnR5IFwiYWN0aXZlXCIgbXVzdCBjb250YWluIHN0cmluZyB2YWx1ZS4nIH0gfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3RyYWNraW5nJywgdHlwZSksIGRhdGEpXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlVHJhY2tpbmdVcGRhdGUocmVzIGFzIFVwZGF0ZURvbWFpblRyYWNraW5nUmVzcG9uc2UpKTtcbiAgfVxuXG4gIC8vIElQc1xuXG4gIGdldElwcyhkb21haW46IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBBUElSZXNwb25zZSkgPT4gcmVzcG9uc2U/LmJvZHk/Lml0ZW1zKTtcbiAgfVxuXG4gIGFzc2lnbklwKGRvbWFpbjogc3RyaW5nLCBpcDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IGlwIH0pO1xuICB9XG5cbiAgZGVsZXRlSXAoZG9tYWluOiBzdHJpbmcsIGlwOiBzdHJpbmcpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICdpcHMnLCBpcCkpO1xuICB9XG5cbiAgbGlua0lwUG9vbChkb21haW46IHN0cmluZywgcG9vbF9pZDogc3RyaW5nKTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycpLCB7IHBvb2xfaWQgfSk7XG4gIH1cblxuICB1bmxpbmtJcFBvbGwoZG9tYWluOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBSZXBsYWNlbWVudEZvclBvb2wpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgbGV0IHNlYXJjaFBhcmFtcyA9ICcnO1xuICAgIGlmIChyZXBsYWNlbWVudC5wb29sX2lkICYmIHJlcGxhY2VtZW50LmlwKSB7XG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3IoeyBzdGF0dXM6IDQwMCwgc3RhdHVzVGV4dDogJycsIGJvZHk6IHsgbWVzc2FnZTogJ1BsZWFzZSBzcGVjaWZ5IGVpdGhlciBwb29sX2lkIG9yIGlwIChub3QgYm90aCknIH0gfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQucG9vbF9pZCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gYD9wb29sX2lkPSR7cmVwbGFjZW1lbnQucG9vbF9pZH1gO1xuICAgIH0gZWxzZSBpZiAocmVwbGFjZW1lbnQuaXApIHtcbiAgICAgIHNlYXJjaFBhcmFtcyA9IGA/aXA9JHtyZXBsYWNlbWVudC5pcH1gO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ2lwcycsICdpcF9wb29sJywgc2VhcmNoUGFyYW1zKSk7XG4gIH1cblxuICB1cGRhdGVES0lNQXV0aG9yaXR5KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNQXV0aG9yaXR5SW5mbyk6IFByb21pc2U8VXBkYXRlZERLSU1BdXRob3JpdHk+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2RraW1fYXV0aG9yaXR5YCwge30sIHsgcXVlcnk6IGBzZWxmPSR7ZGF0YS5zZWxmfWAgfSlcbiAgICAgIC50aGVuKChyZXMgOiBBUElSZXNwb25zZSkgPT4gcmVzIGFzIFVwZGF0ZWRES0lNQXV0aG9yaXR5UmVzcG9uc2UpXG4gICAgICAudGhlbigocmVzIDogVXBkYXRlZERLSU1BdXRob3JpdHlSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgVXBkYXRlZERLSU1BdXRob3JpdHkpO1xuICB9XG5cbiAgdXBkYXRlREtJTVNlbGVjdG9yKGRvbWFpbjogc3RyaW5nLCBkYXRhOiBES0lNU2VsZWN0b3JJbmZvKTogUHJvbWlzZTxVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L2RraW1fc2VsZWN0b3JgLCB7fSwgeyBxdWVyeTogYGRraW1fc2VsZWN0b3I9JHtkYXRhLmRraW1TZWxlY3Rvcn1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkREtJTVNlbGVjdG9yUmVzcG9uc2UpO1xuICB9XG5cbiAgdXBkYXRlV2ViUHJlZml4KGRvbWFpbjogc3RyaW5nLCBkYXRhOiBXZWJQcmVmaXhJbmZvKTogUHJvbWlzZTxVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dChgL3YzL2RvbWFpbnMvJHtkb21haW59L3dlYl9wcmVmaXhgLCB7fSwgeyBxdWVyeTogYHdlYl9wcmVmaXg9JHtkYXRhLndlYlByZWZpeH1gIH0pXG4gICAgICAudGhlbigocmVzIDogQVBJUmVzcG9uc2UpID0+IHJlcyBhcyBVcGRhdGVkV2ViUHJlZml4UmVzcG9uc2UpO1xuICB9XG59XG4iLCJpbXBvcnQgdXJsam9pbiBmcm9tICd1cmwtam9pbic7XG5pbXBvcnQgQVBJUmVzcG9uc2UgZnJvbSAnLi9pbnRlcmZhY2VzL0FwaVJlc3BvbnNlJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmltcG9ydCB7XG4gIENyZWF0ZWRVcGRhdGVkRG9tYWluQ3JlZGVudGlhbHNSZXNwb25zZSxcbiAgRGVsZXRlZERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2UsXG4gIERvbWFpbkNyZWRlbnRpYWxzLFxuICBEb21haW5DcmVkZW50aWFsc0xpc3QsXG4gIERvbWFpbkNyZWRlbnRpYWxzUXVlcnksXG4gIERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhLFxuICBEb21haW5DcmVkZW50aWFsc1Jlc3VsdCxcbiAgSURvbWFpbkNyZWRlbnRpYWxzLFxuICBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpbkNyZWRlbnRpYWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluQ3JlZGVudGlhbHNDbGllbnQgaW1wbGVtZW50cyBJRG9tYWluQ3JlZGVudGlhbHMge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmJhc2VSb3V0ZSA9ICcvdjMvZG9tYWlucy8nO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VEb21haW5DcmVkZW50aWFsc0xpc3QoXG4gICAgcmVzcG9uc2U6IERvbWFpbkNyZWRlbnRpYWxzUmVzcG9uc2VEYXRhXG4gICk6IERvbWFpbkNyZWRlbnRpYWxzTGlzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiByZXNwb25zZS5ib2R5Lml0ZW1zLFxuICAgICAgdG90YWxDb3VudDogcmVzcG9uc2UuYm9keS50b3RhbF9jb3VudFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZU1lc3NhZ2VSZXNwb25zZShcbiAgICByZXNwb25zZTogQ3JlYXRlZFVwZGF0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlXG4gICk6IERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZVxuICAgIH0gYXMgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlRGVsZXRlZFJlc3BvbnNlKFxuICAgIHJlc3BvbnNlOkRlbGV0ZWREb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlXG4gICk6IERvbWFpbkNyZWRlbnRpYWxzUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgIHNwZWM6IHJlc3BvbnNlLmJvZHkuc3BlY1xuICAgIH0gYXMgRG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbGlzdChkb21haW46IHN0cmluZywgcXVlcnk/OiBEb21haW5DcmVkZW50aWFsc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvY3JlZGVudGlhbHMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlRG9tYWluQ3JlZGVudGlhbHNMaXN0KHJlcyBhcyBEb21haW5DcmVkZW50aWFsc1Jlc3BvbnNlRGF0YSlcbiAgICAgICk7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgZGF0YTogRG9tYWluQ3JlZGVudGlhbHNcbiAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHNgLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlTWVzc2FnZVJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgdXBkYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGNyZWRlbnRpYWxzTG9naW46IHN0cmluZyxcbiAgICBkYXRhOiBVcGRhdGVEb21haW5DcmVkZW50aWFsc0RhdGFcbiAgKTogUHJvbWlzZTxEb21haW5DcmVkZW50aWFsc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfSR7ZG9tYWlufS9jcmVkZW50aWFscy8ke2NyZWRlbnRpYWxzTG9naW59YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZU1lc3NhZ2VSZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgY3JlZGVudGlhbHNMb2dpbjogc3RyaW5nXG4gICk6IFByb21pc2U8RG9tYWluQ3JlZGVudGlhbHNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vY3JlZGVudGlhbHMvJHtjcmVkZW50aWFsc0xvZ2lufWApXG4gICAgICAudGhlbigocmVzOiBBUElSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VEZWxldGVkUmVzcG9uc2UocmVzKSk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuaW1wb3J0IHtcbiAgRG9tYWluVGFnQVBJUmVzcG9uc2VTdGF0c0l0ZW0sXG4gIERvbWFpblRhZ0NvdW50cmllc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdEZXZpY2VzQVBJUmVzcG9uc2UsXG4gIERvbWFpblRhZ1Byb3ZpZGVyc0FnZ3JlZ2F0aW9uLFxuICBEb21haW5UYWdQcm92aWRlcnNBUElSZXNwb25zZSxcbiAgRG9tYWluVGFnc0l0ZW0sXG4gIERvbWFpblRhZ3NJdGVtSW5mbyxcbiAgRG9tYWluVGFnc0xpc3QsXG4gIERvbWFpblRhZ3NNZXNzYWdlUmVzLFxuICBEb21haW5UYWdzUXVlcnksXG4gIERvbWFpblRhZ3NSZXNwb25zZURhdGEsXG4gIERvbWFpblRhZ3NTdGF0aXN0aWNRdWVyeSxcbiAgRG9tYWluVGFnU3RhdEFQSVJlc3BvbnNlLFxuICBEb21haW5UYWdTdGF0aXN0aWNJdGVtLFxuICBEb21haW5UYWdTdGF0aXN0aWNSZXN1bHQsXG4gIElEb21haW5UYWdzQ2xpZW50LFxuICBQYWdlc0xpc3QsXG4gIFBhZ2VzTGlzdEFjY3VtdWxhdG9yLFxuICBQYXJzZWRQYWdlc0xpc3QsXG4gIFJlc29sdXRpb25cbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRhZ3MnO1xuXG5leHBvcnQgY2xhc3MgRG9tYWluVGFnIGltcGxlbWVudHMgRG9tYWluVGFnc0l0ZW0ge1xuICB0YWc6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgJ2ZpcnN0LXNlZW4nOiBEYXRlO1xuICAnbGFzdC1zZWVuJzogRGF0ZTtcblxuICBjb25zdHJ1Y3Rvcih0YWdJbmZvOiBEb21haW5UYWdzSXRlbUluZm8pIHtcbiAgICB0aGlzLnRhZyA9IHRhZ0luZm8udGFnO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YWdJbmZvLmRlc2NyaXB0aW9uO1xuICAgIHRoaXNbJ2ZpcnN0LXNlZW4nXSA9IG5ldyBEYXRlKHRhZ0luZm9bJ2ZpcnN0LXNlZW4nXSk7XG4gICAgdGhpc1snbGFzdC1zZWVuJ10gPSBuZXcgRGF0ZSh0YWdJbmZvWydsYXN0LXNlZW4nXSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERvbWFpblRhZ1N0YXRpc3RpYyBpbXBsZW1lbnRzIERvbWFpblRhZ1N0YXRpc3RpY1Jlc3VsdCB7XG4gIHRhZzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBzdGFydDogRGF0ZTtcbiAgZW5kOiBEYXRlO1xuICByZXNvbHV0aW9uOiBSZXNvbHV0aW9uO1xuICBzdGF0czogRG9tYWluVGFnU3RhdGlzdGljSXRlbVtdO1xuXG4gIGNvbnN0cnVjdG9yKHRhZ1N0YXRpc3RpY0luZm86IERvbWFpblRhZ1N0YXRBUElSZXNwb25zZSkge1xuICAgIHRoaXMudGFnID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnRhZztcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSh0YWdTdGF0aXN0aWNJbmZvLmJvZHkuc3RhcnQpO1xuICAgIHRoaXMuZW5kID0gbmV3IERhdGUodGFnU3RhdGlzdGljSW5mby5ib2R5LmVuZCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uID0gdGFnU3RhdGlzdGljSW5mby5ib2R5LnJlc29sdXRpb247XG4gICAgdGhpcy5zdGF0cyA9IHRhZ1N0YXRpc3RpY0luZm8uYm9keS5zdGF0cy5tYXAoZnVuY3Rpb24gKHN0YXQ6IERvbWFpblRhZ0FQSVJlc3BvbnNlU3RhdHNJdGVtKSB7XG4gICAgICBjb25zdCByZXMgPSB7IC4uLnN0YXQsIHRpbWU6IG5ldyBEYXRlKHN0YXQudGltZSkgfTtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluVGFnc0NsaWVudCBpbXBsZW1lbnRzIElEb21haW5UYWdzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzLyc7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZTogRG9tYWluVGFnc1Jlc3BvbnNlRGF0YSk6IFBhcnNlZFBhZ2VzTGlzdCB7XG4gICAgY29uc3QgcGFnZXMgPSBPYmplY3QuZW50cmllcyhyZXNwb25zZS5ib2R5LnBhZ2luZyBhcyBQYWdlc0xpc3QpO1xuICAgIHJldHVybiBwYWdlcy5yZWR1Y2UoXG4gICAgICAoYWNjOiBQYWdlc0xpc3RBY2N1bXVsYXRvciwgZW50cmllOiBbdXJsOiBzdHJpbmcsIGlkOiBzdHJpbmddKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkID0gZW50cmllWzBdO1xuICAgICAgICBjb25zdCB1cmwgPSBlbnRyaWVbMV07XG4gICAgICAgIGFjY1tpZF0gPSB7XG4gICAgICAgICAgaWQsXG4gICAgICAgICAgdXJsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fVxuICAgICkgYXMgdW5rbm93biBhcyBQYXJzZWRQYWdlc0xpc3Q7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZURvbWFpblRhZ3NMaXN0KFxuICAgIHJlc3BvbnNlOiBEb21haW5UYWdzUmVzcG9uc2VEYXRhXG4gICk6IERvbWFpblRhZ3NMaXN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKCh0YWdJbmZvKSA9PiBuZXcgRG9tYWluVGFnKHRhZ0luZm8pKSxcbiAgICAgIHBhZ2VzOiB0aGlzLl9wYXJzZVBhZ2VMaW5rcyhyZXNwb25zZSlcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VUYWdTdGF0aXN0aWMoXG4gICAgcmVzcG9uc2U6IERvbWFpblRhZ1N0YXRBUElSZXNwb25zZVxuICApOiBEb21haW5UYWdTdGF0aXN0aWMge1xuICAgIHJldHVybiBuZXcgRG9tYWluVGFnU3RhdGlzdGljKHJlc3BvbnNlKTtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGFnc1F1ZXJ5KTogUHJvbWlzZTxEb21haW5UYWdzTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLl9wYXJzZURvbWFpblRhZ3NMaXN0KHJlcyBhcyBEb21haW5UYWdzUmVzcG9uc2VEYXRhKVxuICAgICAgKTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpKVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiBuZXcgRG9tYWluVGFnKHJlcy5ib2R5KVxuICAgICAgKTtcbiAgfVxuXG4gIHVwZGF0ZShkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRhZ3NNZXNzYWdlUmVzPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcpLCBkZXNjcmlwdGlvbilcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnc01lc3NhZ2VSZXNcbiAgICAgICk7XG4gIH1cblxuICBkZXN0cm95KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nXG4gICk6IFByb21pc2U8RG9tYWluVGFnc01lc3NhZ2VSZXM+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0ke2RvbWFpbn0vdGFncy8ke3RhZ31gKVxuICAgICAgLnRoZW4oKHJlczogQVBJUmVzcG9uc2UpID0+IChcbiAgICAgICAge1xuICAgICAgICAgIG1lc3NhZ2U6IHJlcy5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgICAgc3RhdHVzOiByZXMuc3RhdHVzXG4gICAgICAgIH0gYXMgRG9tYWluVGFnc01lc3NhZ2VSZXMpKTtcbiAgfVxuXG4gIHN0YXRpc3RpYyhkb21haW46IHN0cmluZywgdGFnOiBzdHJpbmcsIHF1ZXJ5OiBEb21haW5UYWdzU3RhdGlzdGljUXVlcnkpXG4gICAgOiBQcm9taXNlPERvbWFpblRhZ1N0YXRpc3RpYz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogQVBJUmVzcG9uc2UpID0+IHRoaXMuX3BhcnNlVGFnU3RhdGlzdGljKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBjb3VudHJpZXMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdDb3VudHJpZXNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9jb3VudHJpZXMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdDb3VudHJpZXNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnQ291bnRyaWVzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cblxuICBwcm92aWRlcnMoZG9tYWluOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogUHJvbWlzZTxEb21haW5UYWdQcm92aWRlcnNBZ2dyZWdhdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90YWdzJywgdGFnLCAnc3RhdHMvYWdncmVnYXRlcy9wcm92aWRlcnMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdQcm92aWRlcnNBUElSZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgRG9tYWluVGFnUHJvdmlkZXJzQWdncmVnYXRpb25cbiAgICAgICk7XG4gIH1cblxuICBkZXZpY2VzKGRvbWFpbjogc3RyaW5nLCB0YWc6IHN0cmluZyk6IFByb21pc2U8RG9tYWluVGFnRGV2aWNlc0FnZ3JlZ2F0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RhZ3MnLCB0YWcsICdzdGF0cy9hZ2dyZWdhdGVzL2RldmljZXMnKSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBEb21haW5UYWdEZXZpY2VzQVBJUmVzcG9uc2UpID0+IHJlcy5ib2R5IGFzIERvbWFpblRhZ0RldmljZXNBZ2dyZWdhdGlvblxuICAgICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IEFQSVJlc3BvbnNlIGZyb20gJy4vaW50ZXJmYWNlcy9BcGlSZXNwb25zZSc7XG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL3JlcXVlc3QnO1xuXG5pbXBvcnQge1xuICBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSxcbiAgQ3JlYXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBEb21haW5UZW1wbGF0ZSwgRG9tYWluVGVtcGxhdGVEYXRhLFxuICBEb21haW5UZW1wbGF0ZXNRdWVyeSxcbiAgRG9tYWluVGVtcGxhdGVVcGRhdGVEYXRhLFxuICBEb21haW5UZW1wbGF0ZVVwZGF0ZVZlcnNpb25EYXRhLFxuICBEb21haW5UZW1wbGF0ZVZlcnNpb25EYXRhLFxuICBHZXREb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlLFxuICBJRG9tYWluVGVtcGxhdGVzQ2xpZW50LFxuICBMaXN0RG9tYWluVGVtcGxhdGVzQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zQVBJUmVzcG9uc2UsXG4gIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0LFxuICBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSxcbiAgTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0LFxuICBOb3RpZmljYXRpb25BUElSZXNwb25zZSxcbiAgTm90aWZpY2F0aW9uUmVzdWx0LFxuICBTaG9ydFRlbXBsYXRlVmVyc2lvbixcbiAgVGVtcGxhdGVRdWVyeSxcbiAgVGVtcGxhdGVWZXJzaW9uLFxuICBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UsXG4gIFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHRcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL0RvbWFpblRlbXBsYXRlcyc7XG5cbmV4cG9ydCBjbGFzcyBEb21haW5UZW1wbGF0ZUl0ZW0gaW1wbGVtZW50cyBEb21haW5UZW1wbGF0ZSB7XG4gIG5hbWUgOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uIDogc3RyaW5nO1xuICBjcmVhdGVkQXQgOiBEYXRlIHwgJyc7XG4gIGNyZWF0ZWRCeSA6IHN0cmluZztcbiAgaWQgOiBzdHJpbmc7XG4gIHZlcnNpb24/OiBUZW1wbGF0ZVZlcnNpb247XG4gIHZlcnNpb25zPzogU2hvcnRUZW1wbGF0ZVZlcnNpb25bXTtcblxuICBjb25zdHJ1Y3Rvcihkb21haW5UZW1wbGF0ZUZyb21BUEk6IERvbWFpblRlbXBsYXRlKSB7XG4gICAgdGhpcy5uYW1lID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLm5hbWU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmNyZWF0ZWRBdCA9IGRvbWFpblRlbXBsYXRlRnJvbUFQSS5jcmVhdGVkQXQgPyBuZXcgRGF0ZShkb21haW5UZW1wbGF0ZUZyb21BUEkuY3JlYXRlZEF0KSA6ICcnO1xuICAgIHRoaXMuY3JlYXRlZEJ5ID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmNyZWF0ZWRCeTtcbiAgICB0aGlzLmlkID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLmlkO1xuXG4gICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uKSB7XG4gICAgICB0aGlzLnZlcnNpb24gPSBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbjtcbiAgICAgIGlmIChkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbi5jcmVhdGVkQXQpIHtcbiAgICAgICAgdGhpcy52ZXJzaW9uLmNyZWF0ZWRBdCA9IG5ldyBEYXRlKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9uLmNyZWF0ZWRBdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRvbWFpblRlbXBsYXRlRnJvbUFQSS52ZXJzaW9ucyAmJiBkb21haW5UZW1wbGF0ZUZyb21BUEkudmVyc2lvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnZlcnNpb25zID0gZG9tYWluVGVtcGxhdGVGcm9tQVBJLnZlcnNpb25zLm1hcCgodmVyc2lvbikgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7IC4uLnZlcnNpb24gfTtcbiAgICAgICAgcmVzdWx0LmNyZWF0ZWRBdCA9IG5ldyBEYXRlKHZlcnNpb24uY3JlYXRlZEF0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb21haW5UZW1wbGF0ZXNDbGllbnQgaW1wbGVtZW50cyBJRG9tYWluVGVtcGxhdGVzQ2xpZW50IHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzLyc7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQ3JlYXRpb25SZXNwb25zZShkYXRhOiBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKTogRG9tYWluVGVtcGxhdGVJdGVtIHtcbiAgICByZXR1cm4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkYXRhLmJvZHkudGVtcGxhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKFxuICAgIGRhdGE6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlXG4gICk6IENyZWF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCB7XG4gICAgY29uc3QgcmVzdWx0OiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQgPSB7fSBhcyBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ7XG4gICAgcmVzdWx0LnN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIHJlc3VsdC5tZXNzYWdlID0gZGF0YS5ib2R5Lm1lc3NhZ2U7XG4gICAgaWYgKGRhdGEuYm9keSAmJiBkYXRhLmJvZHkudGVtcGxhdGUpIHtcbiAgICAgIHJlc3VsdC50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0oZGF0YS5ib2R5LnRlbXBsYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VNdXRhdGlvblJlc3BvbnNlKFxuICAgIGRhdGE6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVBUElSZXNwb25zZVxuICApOiBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IFVwZGF0ZU9yRGVsZXRlRG9tYWluVGVtcGxhdGVSZXN1bHQgPSB7fSBhcyBVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIGlmIChkYXRhLmJvZHkgJiYgZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGVOYW1lID0gZGF0YS5ib2R5LnRlbXBsYXRlLm5hbWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UoZGF0YTogTm90aWZpY2F0aW9uQVBJUmVzcG9uc2UpOiBOb3RpZmljYXRpb25SZXN1bHQge1xuICAgIGNvbnN0IHJlc3VsdDogTm90aWZpY2F0aW9uUmVzdWx0ID0ge30gYXMgTm90aWZpY2F0aW9uUmVzdWx0O1xuICAgIHJlc3VsdC5zdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICByZXN1bHQubWVzc2FnZSA9IGRhdGEuYm9keS5tZXNzYWdlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UoXG4gICAgZGF0YTogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uQVBJUmVzcG9uc2VcbiAgKTogTXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0IHtcbiAgICBjb25zdCByZXN1bHQ6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdCA9IHt9IGFzIE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvblJlc3VsdDtcbiAgICByZXN1bHQuc3RhdHVzID0gZGF0YS5zdGF0dXM7XG4gICAgcmVzdWx0Lm1lc3NhZ2UgPSBkYXRhLmJvZHkubWVzc2FnZTtcbiAgICBpZiAoZGF0YS5ib2R5LnRlbXBsYXRlKSB7XG4gICAgICByZXN1bHQudGVtcGxhdGVOYW1lID0gZGF0YS5ib2R5LnRlbXBsYXRlLm5hbWU7XG4gICAgICByZXN1bHQudGVtcGxhdGVWZXJzaW9uID0geyB0YWc6IGRhdGEuYm9keS50ZW1wbGF0ZS52ZXJzaW9uLnRhZyB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUxpc3QocmVzcG9uc2U6IExpc3REb21haW5UZW1wbGF0ZXNBUElSZXNwb25zZSk6IExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBMaXN0RG9tYWluVGVtcGxhdGVzUmVzdWx0O1xuXG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKChkOiBEb21haW5UZW1wbGF0ZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShkKSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gcmVzcG9uc2UuYm9keS5wYWdpbmc7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VMaXN0VGVtcGxhdGVWZXJzaW9ucyhcbiAgICByZXNwb25zZTogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZVxuICApOiBMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdCB7XG4gICAgY29uc3QgZGF0YSA9IHt9IGFzIExpc3REb21haW5UZW1wbGF0ZVZlcnNpb25zUmVzdWx0O1xuXG4gICAgZGF0YS50ZW1wbGF0ZSA9IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzcG9uc2UuYm9keS50ZW1wbGF0ZSk7XG5cbiAgICBkYXRhLnBhZ2VzID0gcmVzcG9uc2UuYm9keS5wYWdpbmc7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGxpc3QoZG9tYWluOiBzdHJpbmcsIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnkpOiBQcm9taXNlPExpc3REb21haW5UZW1wbGF0ZXNSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTGlzdChyZXMpXG4gICAgICApO1xuICB9XG5cbiAgZ2V0KGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgcXVlcnk/OiBUZW1wbGF0ZVF1ZXJ5KTogUHJvbWlzZTxEb21haW5UZW1wbGF0ZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSksIHF1ZXJ5KVxuICAgICAgLnRoZW4oXG4gICAgICAgIChyZXM6IEdldERvbWFpblRlbXBsYXRlQVBJUmVzcG9uc2UpID0+IG5ldyBEb21haW5UZW1wbGF0ZUl0ZW0ocmVzLmJvZHkudGVtcGxhdGUpXG4gICAgICApO1xuICB9XG5cbiAgY3JlYXRlKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlRGF0YVxuICApOiBQcm9taXNlPERvbWFpblRlbXBsYXRlSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzJyksIGRhdGEpXG4gICAgICAudGhlbigocmVzOiBDcmVhdGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlQ3JlYXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0ZW1wbGF0ZU5hbWU6IHN0cmluZyxcbiAgICBkYXRhOiBEb21haW5UZW1wbGF0ZVVwZGF0ZURhdGFcbiAgKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpLCBkYXRhKVxuICAgICAgLnRoZW4oKHJlczogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3koZG9tYWluOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxVcGRhdGVPckRlbGV0ZURvbWFpblRlbXBsYXRlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUpKVxuICAgICAgLnRoZW4oKHJlczogVXBkYXRlT3JEZWxldGVEb21haW5UZW1wbGF0ZUFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRpb25SZXNwb25zZShyZXMpKTtcbiAgfVxuXG4gIGRlc3Ryb3lBbGwoZG9tYWluOiBzdHJpbmcpOiBQcm9taXNlPE5vdGlmaWNhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnKSlcbiAgICAgIC50aGVuKChyZXM6IE5vdGlmaWNhdGlvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTm90aWZpY2F0aW9uUmVzcG9uc2UocmVzKSk7XG4gIH1cblxuICBjcmVhdGVWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVmVyc2lvbkRhdGFcbiAgKTogUHJvbWlzZTxDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgZGF0YSlcbiAgICAgIC50aGVuKFxuICAgICAgICAocmVzOiBDcmVhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUNyZWF0aW9uVmVyc2lvblJlc3BvbnNlKHJlcylcbiAgICAgICk7XG4gIH1cblxuICBnZXRWZXJzaW9uKGRvbWFpbjogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZywgdGFnOiBzdHJpbmcpOiBQcm9taXNlPERvbWFpblRlbXBsYXRlSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMvJywgdGVtcGxhdGVOYW1lLCAnL3ZlcnNpb25zLycsIHRhZykpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogR2V0RG9tYWluVGVtcGxhdGVBUElSZXNwb25zZSkgPT4gbmV3IERvbWFpblRlbXBsYXRlSXRlbShyZXMuYm9keS50ZW1wbGF0ZSlcbiAgICAgICk7XG4gIH1cblxuICB1cGRhdGVWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nLFxuICAgIGRhdGE6IERvbWFpblRlbXBsYXRlVXBkYXRlVmVyc2lvbkRhdGFcbiAgKTogUHJvbWlzZTxNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25SZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKHRoaXMuYmFzZVJvdXRlLCBkb21haW4sICcvdGVtcGxhdGVzLycsIHRlbXBsYXRlTmFtZSwgJy92ZXJzaW9ucy8nLCB0YWcpLCBkYXRhKVxuICAgICAgLnRoZW4oXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgIChyZXM6IE11dGF0ZURvbWFpblRlbXBsYXRlVmVyc2lvbkFQSVJlc3BvbnNlKSA9PiB0aGlzLnBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UocmVzKVxuICAgICAgKTtcbiAgfVxuXG4gIGRlc3Ryb3lWZXJzaW9uKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHRhZzogc3RyaW5nXG4gICk6IFByb21pc2U8TXV0YXRlRG9tYWluVGVtcGxhdGVWZXJzaW9uUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUodXJsam9pbih0aGlzLmJhc2VSb3V0ZSwgZG9tYWluLCAnL3RlbXBsYXRlcy8nLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMvJywgdGFnKSlcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAudGhlbigocmVzOiBNdXRhdGVEb21haW5UZW1wbGF0ZVZlcnNpb25BUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZU11dGF0ZVRlbXBsYXRlVmVyc2lvblJlc3BvbnNlKHJlcykpO1xuICB9XG5cbiAgbGlzdFZlcnNpb25zKFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHRlbXBsYXRlTmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5PzogRG9tYWluVGVtcGxhdGVzUXVlcnlcbiAgKTogUHJvbWlzZTxMaXN0RG9tYWluVGVtcGxhdGVWZXJzaW9uc1Jlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4odGhpcy5iYXNlUm91dGUsIGRvbWFpbiwgJy90ZW1wbGF0ZXMnLCB0ZW1wbGF0ZU5hbWUsICcvdmVyc2lvbnMnKSwgcXVlcnkpXG4gICAgICAudGhlbihcbiAgICAgICAgKHJlczogTGlzdERvbWFpblRlbXBsYXRlVmVyc2lvbnNBUElSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zKHJlcylcbiAgICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBBUElFcnJvck9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL0FQSUVycm9yT3B0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBzdGF0dXM6IG51bWJlciB8IHN0cmluZztcbiAgc3RhY2s6IHN0cmluZztcbiAgZGV0YWlsczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBzdGF0dXMsXG4gICAgc3RhdHVzVGV4dCxcbiAgICBtZXNzYWdlLFxuICAgIGJvZHkgPSB7fVxuICB9OiBBUElFcnJvck9wdGlvbnMpIHtcbiAgICBjb25zdCB7IG1lc3NhZ2U6IGJvZHlNZXNzYWdlLCBlcnJvciB9ID0gYm9keTtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgZXJyb3IgfHwgc3RhdHVzVGV4dDtcbiAgICB0aGlzLmRldGFpbHMgPSBib2R5TWVzc2FnZTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IHtcbiAgRXZlbnRzTGlzdCwgRXZlbnRzUGFnZSwgRXZlbnRzUmVzcG9uc2UsIFBhZ2VzTGlzdCwgUGFnZXNMaXN0QWNjdW11bGF0b3IsIFBhcnNlZFBhZ2VzTGlzdFxufSBmcm9tICcuL2ludGVyZmFjZXMvRXZlbnRzJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgX3BhcnNlUGFnZU51bWJlcih1cmw6IHN0cmluZykgOiBzdHJpbmcge1xuICAgIHJldHVybiB1cmwuc3BsaXQoJy8nKS5wb3AoKSB8fCAnJztcbiAgfVxuXG4gIF9wYXJzZVBhZ2UoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpIDogRXZlbnRzUGFnZSB7XG4gICAgcmV0dXJuIHsgaWQsIG51bWJlcjogdGhpcy5fcGFyc2VQYWdlTnVtYmVyKHVybCksIHVybCB9O1xuICB9XG5cbiAgX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlOiBFdmVudHNSZXNwb25zZSkgOiBQYXJzZWRQYWdlc0xpc3Qge1xuICAgIGNvbnN0IHBhZ2VzID0gT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuYm9keS5wYWdpbmcgYXMgUGFnZXNMaXN0KTtcbiAgICByZXR1cm4gcGFnZXMucmVkdWNlKFxuICAgICAgKGFjYzogUGFnZXNMaXN0QWNjdW11bGF0b3IsIHBhaXI6IFt1cmw6IHN0cmluZywgaWQ6IHN0cmluZ10pID0+IHtcbiAgICAgICAgY29uc3QgaWQgPSBwYWlyWzBdO1xuICAgICAgICBjb25zdCB1cmwgPSBwYWlyWzFdO1xuICAgICAgICBhY2NbaWRdID0gdGhpcy5fcGFyc2VQYWdlKGlkLCB1cmwpO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge31cbiAgICApIGFzIHVua25vd24gYXMgUGFyc2VkUGFnZXNMaXN0O1xuICB9XG5cbiAgX3BhcnNlRXZlbnRMaXN0KHJlc3BvbnNlOiBFdmVudHNSZXNwb25zZSkgOiBFdmVudHNMaXN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IHJlc3BvbnNlLmJvZHkuaXRlbXMsXG4gICAgICBwYWdlczogdGhpcy5fcGFyc2VQYWdlTGlua3MocmVzcG9uc2UpXG4gICAgfTtcbiAgfVxuXG4gIGdldChkb21haW46IHN0cmluZywgcXVlcnk/OiB7IHBhZ2U6IHN0cmluZyB9KSA6IFByb21pc2U8RXZlbnRzTGlzdD4ge1xuICAgIGxldCB1cmw7XG4gICAgY29uc3QgcXVlcnlDb3B5ID0geyAuLi5xdWVyeSB9O1xuICAgIGlmIChxdWVyeUNvcHkgJiYgcXVlcnlDb3B5LnBhZ2UpIHtcbiAgICAgIHVybCA9IHVybGpvaW4oJy92MycsIGRvbWFpbiwgJ2V2ZW50cycsIHF1ZXJ5Q29weS5wYWdlKTtcbiAgICAgIGRlbGV0ZSBxdWVyeUNvcHkucGFnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gdXJsam9pbignL3YzJywgZG9tYWluLCAnZXZlbnRzJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybCwgcXVlcnlDb3B5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBFdmVudHNSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VFdmVudExpc3QocmVzcG9uc2UpKTtcbiAgfVxufVxuIiwiaW1wb3J0IENsaWVudCBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lGb3JtRGF0YSc7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICcuL2ludGVyZmFjZXMvT3B0aW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxndW4ge1xuICBzdGF0aWMgZ2V0IGRlZmF1bHQoKTogdHlwZW9mIE1haWxndW4geyByZXR1cm4gdGhpczsgfVxuICBwcml2YXRlIGZvcm1EYXRhOiBJbnB1dEZvcm1EYXRhXG5cbiAgY29uc3RydWN0b3IoRm9ybURhdGE6IElucHV0Rm9ybURhdGEpIHtcbiAgICB0aGlzLmZvcm1EYXRhID0gRm9ybURhdGE7XG4gIH1cblxuICBjbGllbnQob3B0aW9uczogT3B0aW9ucykgOiBDbGllbnQge1xuICAgIHJldHVybiBuZXcgQ2xpZW50KG9wdGlvbnMsIHRoaXMuZm9ybURhdGEpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBCb3VuY2UsIENvbXBsYWludCwgVW5zdWJzY3JpYmUsIFdoaXRlTGlzdFxufSBmcm9tICcuLi9zdXBwcmVzc2lvbnMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmV4cG9ydCBpbnRlcmZhY2UgQm91bmNlRGF0YSB7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgY29kZTogbnVtYmVyO1xuICBlcnJvcjogc3RyaW5nO1xuICBjcmVhdGVkX2F0OiBzdHJpbmcgfCBEYXRlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsYWludERhdGEge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVW5zdWJzY3JpYmVEYXRhIHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICB0YWdzOiBhbnk7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZyB8IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2hpdGVMaXN0RGF0YSB7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgcmVhc29uOiBzdHJpbmc7XG4gIGNyZWF0ZWRBdDogc3RyaW5nIHwgRGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYXJzZWRQYWdlIHtcbiAgaWQ6IHN0cmluZztcbiAgcGFnZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgYWRkcmVzczogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgdXJsOiBzdHJpbmdcbn1cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2VkUGFnZXNMaXN0IHtcbiAgcHJldmlvdXM6IFBhcnNlZFBhZ2U7XG4gIGZpcnN0OiBQYXJzZWRQYWdlO1xuICBsYXN0OiBQYXJzZWRQYWdlO1xuICBuZXh0OiBQYXJzZWRQYWdlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1cHByZXNzaW9uTGlzdCB7XG4gIGl0ZW1zOiAoQm91bmNlIHwgQ29tcGxhaW50IHwgVW5zdWJzY3JpYmUgfCBXaGl0ZUxpc3QpW107XG4gIHBhZ2VzOiBQYXJzZWRQYWdlc0xpc3Q7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZXNMaXN0IHtcbiAgcHJldmlvdXM6IHN0cmluZztcbiAgZmlyc3Q6IHN0cmluZztcbiAgbGFzdDogc3RyaW5nO1xuICBuZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIFN1cHByZXNzaW9uTW9kZWxzIHtcbiAgQk9VTkNFUyA9ICdib3VuY2VzJyxcbiAgQ09NUExBSU5UUyA9ICdjb21wbGFpbnRzJyxcbiAgVU5TVUJTQ1JJQkVTID0gJ3Vuc3Vic2NyaWJlcycsXG4gIFdISVRFTElTVFMgPSAnd2hpdGVsaXN0cydcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlc0xpc3RBY2N1bXVsYXRvciB7XG4gIFtpbmRleDogc3RyaW5nXTogUGFyc2VkUGFnZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkxpc3RRdWVyeSB7XG4gIGxpbWl0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlIHtcbiAgYm9keToge1xuICAgIGl0ZW1zOiBCb3VuY2VEYXRhW10gfCBDb21wbGFpbnREYXRhW10gfCBVbnN1YnNjcmliZURhdGFbXSB8IFdoaXRlTGlzdERhdGFbXTtcbiAgICBwYWdpbmc6IFBhZ2VzTGlzdDtcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvblJlc3BvbnNlIHtcbiAgYm9keTogQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhO1xuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkRlc3Ryb3lSZXNwb25zZSB7XG4gIGJvZHk6IHtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgdmFsdWU/OiBzdHJpbmc7XG4gICAgYWRkcmVzcz86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkRlc3Ryb3lSZXN1bHQge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGFkZHJlc3M6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvZGU/OiBudW1iZXI7XG4gIGVycm9yPzogc3RyaW5nO1xuICBkb21haW4/OiBzdHJpbmc7XG4gIHRhZz86IHN0cmluZztcbiAgY3JlYXRlZF9hdD86IHN0cmluZyA7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlIHtcbiAgYm9keTp7XG4gICAgbWVzc2FnZTpzdHJpbmc7XG4gICAgdHlwZT86IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgfVxuICBzdGF0dXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdXBwcmVzc2lvbkNyZWF0aW9uUmVzdWx0IHtcbiAgbWVzc2FnZTpzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgc3RhdHVzOiBudW1iZXI7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmltcG9ydCB7IElwUG9vbCwgSXBQb29sTGlzdFJlc3BvbnNlLCBJcFBvb2xVcGRhdGVEYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lwUG9vbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcFBvb2xzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIGxpc3QocXVlcnk6IGFueSk6IFByb21pc2U8SXBQb29sW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YxL2lwX3Bvb2xzJywgcXVlcnkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IElwUG9vbExpc3RSZXNwb25zZSkgPT4gdGhpcy5wYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZSkpO1xuICB9XG5cbiAgY3JlYXRlKGRhdGE6IHsgbmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbj86IHN0cmluZywgaXBzPzogc3RyaW5nW10gfSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YxL2lwX3Bvb2xzJywgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogeyBib2R5OiB7IG1lc3NhZ2U6IHN0cmluZywgcG9vbF9pZDogc3RyaW5nIH0gfSkgPT4gcmVzcG9uc2U/LmJvZHkpO1xuICB9XG5cbiAgdXBkYXRlKHBvb2xJZDogc3RyaW5nLCBkYXRhOiBJcFBvb2xVcGRhdGVEYXRhKSA6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wYXRjaFdpdGhGRChgL3YxL2lwX3Bvb2xzLyR7cG9vbElkfWAsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2U6IHsgYm9keTogYW55IH0pID0+IHJlc3BvbnNlPy5ib2R5KTtcbiAgfVxuXG4gIGRlbGV0ZShwb29sSWQ6IHN0cmluZywgZGF0YTogeyBpZDogc3RyaW5nLCBwb29sX2lkOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAvdjEvaXBfcG9vbHMvJHtwb29sSWR9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogeyBib2R5OiBhbnkgfSkgPT4gcmVzcG9uc2U/LmJvZHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZUlwUG9vbHNSZXNwb25zZShyZXNwb25zZTogeyBib2R5OiBhbnkgfCBhbnkgfSkge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5LmlwX3Bvb2xzO1xuICB9XG59XG4iLCJpbXBvcnQgTWdSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgeyBJcERhdGEsIElwc0xpc3RSZXNwb25zZUJvZHkgfSBmcm9tICcuL2ludGVyZmFjZXMvSXBzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXBzQ2xpZW50IHtcbiAgcmVxdWVzdDogTWdSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IE1nUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KHF1ZXJ5OiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL2lwcycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7IGJvZHk6IElwc0xpc3RSZXNwb25zZUJvZHkgfSkgPT4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlKHJlc3BvbnNlKSk7XG4gIH1cblxuICBnZXQoaXA6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvaXBzLyR7aXB9YClcbiAgICAgIC50aGVuKChyZXNwb25zZTogeyBib2R5OiBJcERhdGEgfSkgPT4gdGhpcy5wYXJzZUlwc1Jlc3BvbnNlKHJlc3BvbnNlKSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlSXBzUmVzcG9uc2UocmVzcG9uc2U6IHsgYm9keTogSXBzTGlzdFJlc3BvbnNlQm9keSB8IElwRGF0YSB9KSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmJvZHk7XG4gIH1cbn1cbiIsImltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQge1xuICBMaXN0c1F1ZXJ5LFxuICBDcmVhdGVVcGRhdGVMaXN0LFxuICBEZXN0cm95ZWRMaXN0LFxuICBNYWlsaW5nTGlzdFxufSBmcm9tICcuL2ludGVyZmFjZXMvbGlzdHMnO1xuaW1wb3J0IHsgSU1haWxMaXN0c01lbWJlcnMgfSBmcm9tICcuL2ludGVyZmFjZXMvbWFpbExpc3RNZW1iZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdHNDbGllbnQge1xuICBiYXNlUm91dGU6IHN0cmluZztcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgbWVtYmVyczogSU1haWxMaXN0c01lbWJlcnM7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCwgbWVtYmVyczpJTWFpbExpc3RzTWVtYmVycykge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgICB0aGlzLm1lbWJlcnMgPSBtZW1iZXJzO1xuICB9XG5cbiAgbGlzdChxdWVyeT86IExpc3RzUXVlcnkpOiBQcm9taXNlPE1haWxpbmdMaXN0W10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vcGFnZXNgLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyBhcyBNYWlsaW5nTGlzdFtdKTtcbiAgfVxuXG4gIGdldChtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGNyZWF0ZShkYXRhOiBDcmVhdGVVcGRhdGVMaXN0KTogUHJvbWlzZTxNYWlsaW5nTGlzdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh0aGlzLmJhc2VSb3V0ZSwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIHVwZGF0ZShtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgZGF0YTogQ3JlYXRlVXBkYXRlTGlzdCk6IFByb21pc2U8TWFpbGluZ0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5saXN0IGFzIE1haWxpbmdMaXN0KTtcbiAgfVxuXG4gIGRlc3Ryb3kobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3llZExpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBEZXN0cm95ZWRMaXN0KTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7XG4gIE1haWxMaXN0TWVtYmVyc1F1ZXJ5LFxuICBJTWFpbExpc3RzTWVtYmVycyxcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzLFxuICBNYWlsTGlzdE1lbWJlcixcbiAgTXVsdGlwbGVNZW1iZXJzRGF0YSxcbiAgTXVsdGlwbGVNZW1iZXJzUmVxRGF0YSxcbiAgRGVsZXRlZE1lbWJlcixcbiAgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzUmVxLFxuICBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZVxufSBmcm9tICcuL2ludGVyZmFjZXMvbWFpbExpc3RNZW1iZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbExpc3RzTWVtYmVycyBpbXBsZW1lbnRzIElNYWlsTGlzdHNNZW1iZXJzIHtcbiAgYmFzZVJvdXRlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgdGhpcy5iYXNlUm91dGUgPSAnL3YzL2xpc3RzJztcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tBbmRVcGRhdGVEYXRhKGRhdGE6IENyZWF0ZVVwZGF0ZU1haWxMaXN0TWVtYmVycykge1xuICAgIGNvbnN0IG5ld0RhdGEgPSB7IC4uLmRhdGEgfTtcblxuICAgIGlmICh0eXBlb2YgZGF0YS52YXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbmV3RGF0YS52YXJzID0gSlNPTi5zdHJpbmdpZnkobmV3RGF0YS52YXJzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEuc3Vic2NyaWJlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBuZXdEYXRhLnN1YnNjcmliZWQgPSBkYXRhLnN1YnNjcmliZWQgPyAneWVzJyA6ICdubyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld0RhdGEgYXMgQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzUmVxO1xuICB9XG5cbiAgbGlzdE1lbWJlcnMobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIHF1ZXJ5PzogTWFpbExpc3RNZW1iZXJzUXVlcnkpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgJHt0aGlzLmJhc2VSb3V0ZX0vJHttYWlsTGlzdEFkZHJlc3N9L21lbWJlcnMvcGFnZXNgLCBxdWVyeSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5pdGVtcyBhcyBNYWlsTGlzdE1lbWJlcltdKTtcbiAgfVxuXG4gIGdldE1lbWJlcihtYWlsTGlzdEFkZHJlc3M6IHN0cmluZywgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcpOiBQcm9taXNlPE1haWxMaXN0TWVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWApXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGNyZWF0ZU1lbWJlcihcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBDcmVhdGVVcGRhdGVNYWlsTGlzdE1lbWJlcnNcbiAgKTogUHJvbWlzZTxNYWlsTGlzdE1lbWJlcj4ge1xuICAgIGNvbnN0IHJlcURhdGEgPSB0aGlzLmNoZWNrQW5kVXBkYXRlRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzYCwgcmVxRGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5tZW1iZXIgYXMgTWFpbExpc3RNZW1iZXIpO1xuICB9XG5cbiAgY3JlYXRlTWVtYmVycyhcbiAgICBtYWlsTGlzdEFkZHJlc3M6IHN0cmluZyxcbiAgICBkYXRhOiBNdWx0aXBsZU1lbWJlcnNEYXRhXG4gICk6IFByb21pc2U8TmV3TXVsdGlwbGVNZW1iZXJzUmVzcG9uc2U+IHtcbiAgICBjb25zdCBuZXdEYXRhOiBNdWx0aXBsZU1lbWJlcnNSZXFEYXRhID0ge1xuICAgICAgbWVtYmVyczogQXJyYXkuaXNBcnJheShkYXRhLm1lbWJlcnMpID8gSlNPTi5zdHJpbmdpZnkoZGF0YS5tZW1iZXJzKSA6IGRhdGEubWVtYmVycyxcbiAgICAgIHVwc2VydDogZGF0YS51cHNlcnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy5qc29uYCwgbmV3RGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSBhcyBOZXdNdWx0aXBsZU1lbWJlcnNSZXNwb25zZSk7XG4gIH1cblxuICB1cGRhdGVNZW1iZXIoXG4gICAgbWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsXG4gICAgbWFpbExpc3RNZW1iZXJBZGRyZXNzOiBzdHJpbmcsXG4gICAgZGF0YTogQ3JlYXRlVXBkYXRlTWFpbExpc3RNZW1iZXJzXG4gICk6IFByb21pc2U8TWFpbExpc3RNZW1iZXI+IHtcbiAgICBjb25zdCByZXFEYXRhID0gdGhpcy5jaGVja0FuZFVwZGF0ZURhdGEoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQoYCR7dGhpcy5iYXNlUm91dGV9LyR7bWFpbExpc3RBZGRyZXNzfS9tZW1iZXJzLyR7bWFpbExpc3RNZW1iZXJBZGRyZXNzfWAsIHJlcURhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkubWVtYmVyIGFzIE1haWxMaXN0TWVtYmVyKTtcbiAgfVxuXG4gIGRlc3Ryb3lNZW1iZXIobWFpbExpc3RBZGRyZXNzOiBzdHJpbmcsIG1haWxMaXN0TWVtYmVyQWRkcmVzczogc3RyaW5nKSA6IFByb21pc2U8RGVsZXRlZE1lbWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZGVsZXRlKGAke3RoaXMuYmFzZVJvdXRlfS8ke21haWxMaXN0QWRkcmVzc30vbWVtYmVycy8ke21haWxMaXN0TWVtYmVyQWRkcmVzc31gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5IGFzIERlbGV0ZWRNZW1iZXIpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBNYWlsZ3VuTWVzc2FnZURhdGEsXG4gIE1lc3NhZ2VzU2VuZEFQSVJlc3BvbnNlLFxuICBNZXNzYWdlc1NlbmRSZXN1bHRcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL01lc3NhZ2VzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIF9wYXJzZVJlc3BvbnNlKHJlc3BvbnNlOiBNZXNzYWdlc1NlbmRBUElSZXNwb25zZSk6IE1lc3NhZ2VzU2VuZFJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgLi4ucmVzcG9uc2UuYm9keVxuICAgIH07XG4gIH1cblxuICBjcmVhdGUoZG9tYWluOiBzdHJpbmcsIGRhdGE6IE1haWxndW5NZXNzYWdlRGF0YSk6IFByb21pc2U8TWVzc2FnZXNTZW5kUmVzdWx0PiB7XG4gICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjMvJHtkb21haW59L21lc3NhZ2VzLm1pbWVgLCBkYXRhKVxuICAgICAgICAudGhlbih0aGlzLl9wYXJzZVJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnBvc3RXaXRoRkQoYC92My8ke2RvbWFpbn0vbWVzc2FnZXNgLCBkYXRhKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VSZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENhbmNlbGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iLFxuICBJTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50LFxuICBNdWx0aXBsZVZhbGlkYXRpb25Kb2IsXG4gIE11bHRpcGxlVmFsaWRhdGlvbkpvYnNMaXN0UmVzdWx0XG59XG4gIGZyb20gJy4vaW50ZXJmYWNlcy9NdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IGltcGxlbWVudHMgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KCk6IFByb21pc2U8TXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsaycpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkgYXMgTXVsdGlwbGVWYWxpZGF0aW9uSm9ic0xpc3RSZXN1bHQpO1xuICB9XG5cbiAgZ2V0KGxpc3RJZDogc3RyaW5nKTogUHJvbWlzZTxNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldChgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxuXG4gIGNyZWF0ZShsaXN0SWQ6IHN0cmluZywgZmlsZTogYW55KTogUHJvbWlzZTxDcmVhdGVkTXVsdGlwbGVWYWxpZGF0aW9uSm9iPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wb3N0V2l0aEZEKGAvdjQvYWRkcmVzcy92YWxpZGF0ZS9idWxrLyR7bGlzdElkfWAsIGZpbGUpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZGVzdHJveShsaXN0SWQ6IHN0cmluZyk6IFByb21pc2U8Q2FuY2VsZWRNdWx0aXBsZVZhbGlkYXRpb25Kb2I+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZShgL3Y0L2FkZHJlc3MvdmFsaWRhdGUvYnVsay8ke2xpc3RJZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZSk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIE5vZGVGb3JtRGF0YSBmcm9tICdmb3JtLWRhdGEnO1xuaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gJ2Jhc2UtNjQnO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IGt5IGZyb20gJ2t5LXVuaXZlcnNhbCc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgUmVxdWVzdE9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL1JlcXVlc3RPcHRpb25zJztcbmltcG9ydCBBUElFcnJvck9wdGlvbnMgZnJvbSAnLi9pbnRlcmZhY2VzL0FQSUVycm9yT3B0aW9ucyc7XG5pbXBvcnQgeyBJbnB1dEZvcm1EYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lGb3JtRGF0YSc7XG5pbXBvcnQgQVBJUmVzcG9uc2UgZnJvbSAnLi9pbnRlcmZhY2VzL0FwaVJlc3BvbnNlJztcblxuY29uc3QgaXNTdHJlYW0gPSAoYXR0YWNobWVudDogYW55KSA9PiB0eXBlb2YgYXR0YWNobWVudCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGF0dGFjaG1lbnQucGlwZSA9PT0gJ2Z1bmN0aW9uJztcblxuZnVuY3Rpb24gaXNOb2RlRm9ybURhdGEoZm9ybURhdGFJbnN0YW5jZTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEpXG4gIDogZm9ybURhdGFJbnN0YW5jZSBpcyBOb2RlRm9ybURhdGEge1xuICByZXR1cm4gKDxOb2RlRm9ybURhdGE+Zm9ybURhdGFJbnN0YW5jZSkuZ2V0SGVhZGVycyAhPT0gdW5kZWZpbmVkO1xufVxuXG5jb25zdCBnZXRBdHRhY2htZW50T3B0aW9ucyA9IChpdGVtOiBhbnkpOiB7XG4gIGZpbGVuYW1lPzogc3RyaW5nLFxuICBjb250ZW50VHlwZT86IHN0cmluZyxcbiAga25vd25MZW5ndGg/OiBudW1iZXJcbn0gPT4ge1xuICBpZiAodHlwZW9mIGl0ZW0gIT09ICdvYmplY3QnIHx8IGlzU3RyZWFtKGl0ZW0pKSByZXR1cm4ge307XG5cbiAgY29uc3Qge1xuICAgIGZpbGVuYW1lLFxuICAgIGNvbnRlbnRUeXBlLFxuICAgIGtub3duTGVuZ3RoXG4gIH0gPSBpdGVtO1xuXG4gIHJldHVybiB7XG4gICAgLi4uKGZpbGVuYW1lID8geyBmaWxlbmFtZSB9IDogeyBmaWxlbmFtZTogJ2ZpbGUnIH0pLFxuICAgIC4uLihjb250ZW50VHlwZSAmJiB7IGNvbnRlbnRUeXBlIH0pLFxuICAgIC4uLihrbm93bkxlbmd0aCAmJiB7IGtub3duTGVuZ3RoIH0pXG4gIH07XG59O1xuXG5jb25zdCBzdHJlYW1Ub1N0cmluZyA9IChzdHJlYW06IGFueSkgPT4ge1xuICBjb25zdCBjaHVua3M6IGFueSA9IFtdO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHN0cmVhbS5vbignZGF0YScsIChjaHVuazogYW55KSA9PiBjaHVua3MucHVzaChjaHVuaykpO1xuICAgIHN0cmVhbS5vbignZXJyb3InLCByZWplY3QpO1xuICAgIHN0cmVhbS5vbignZW5kJywgKCkgPT4gcmVzb2x2ZShCdWZmZXIuY29uY2F0KGNodW5rcykudG9TdHJpbmcoJ3V0ZjgnKSkpO1xuICB9KTtcbn07XG5cbmNsYXNzIFJlcXVlc3Qge1xuICBwcml2YXRlIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUga2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgdXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgdGltZW91dDogbnVtYmVyO1xuICBwcml2YXRlIGhlYWRlcnM6IGFueTtcbiAgcHJpdmF0ZSBGb3JtRGF0YUNvbnN0cnVjdG9yOiBJbnB1dEZvcm1EYXRhO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zLCBmb3JtRGF0YTogSW5wdXRGb3JtRGF0YSkge1xuICAgIHRoaXMudXNlcm5hbWUgPSBvcHRpb25zLnVzZXJuYW1lO1xuICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXk7XG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCBhcyBzdHJpbmc7XG4gICAgdGhpcy50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0O1xuICAgIHRoaXMuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fTtcbiAgICB0aGlzLkZvcm1EYXRhQ29uc3RydWN0b3IgPSBmb3JtRGF0YTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3QobWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBpbnB1dE9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgLi4uaW5wdXRPcHRpb25zIH07XG4gICAgY29uc3QgYmFzaWMgPSBiYXNlNjQuZW5jb2RlKGAke3RoaXMudXNlcm5hbWV9OiR7dGhpcy5rZXl9YCk7XG4gICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBCYXNpYyAke2Jhc2ljfWAsXG4gICAgICAuLi50aGlzLmhlYWRlcnMsXG4gICAgICAuLi5vcHRpb25zPy5oZWFkZXJzXG4gICAgfTtcblxuICAgIGRlbGV0ZSBvcHRpb25zPy5oZWFkZXJzO1xuXG4gICAgaWYgKCFoZWFkZXJzWydDb250ZW50LVR5cGUnXSkge1xuICAgICAgLy8gZm9yIGZvcm0tZGF0YSBpdCB3aWxsIGJlIE51bGwgc28gd2UgbmVlZCB0byByZW1vdmUgaXRcbiAgICAgIGRlbGV0ZSBoZWFkZXJzWydDb250ZW50LVR5cGUnXTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJhbXMgPSB7IC4uLm9wdGlvbnMgfTtcblxuICAgIGlmIChvcHRpb25zPy5xdWVyeSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvcHRpb25zPy5xdWVyeSkubGVuZ3RoID4gMCkge1xuICAgICAgcGFyYW1zLnNlYXJjaFBhcmFtcyA9IG9wdGlvbnMucXVlcnk7XG4gICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQga3koXG4gICAgICB1cmxqb2luKHRoaXMudXJsLCB1cmwpLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZC50b0xvY2FsZVVwcGVyQ2FzZSgpLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICB0aHJvd0h0dHBFcnJvcnM6IGZhbHNlLFxuICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgIC4uLnBhcmFtc1xuICAgICAgfVxuICAgICk7XG5cbiAgICBpZiAoIXJlc3BvbnNlPy5vaykge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHJlc3BvbnNlPy5ib2R5ICYmIGlzU3RyZWFtKHJlc3BvbnNlLmJvZHkpXG4gICAgICAgID8gYXdhaXQgc3RyZWFtVG9TdHJpbmcocmVzcG9uc2UuYm9keSlcbiAgICAgICAgOiBhd2FpdCByZXNwb25zZT8uanNvbigpO1xuXG4gICAgICB0aHJvdyBuZXcgQVBJRXJyb3Ioe1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlPy5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlPy5zdGF0dXNUZXh0LFxuICAgICAgICBib2R5OiB7IG1lc3NhZ2UgfVxuICAgICAgfSBhcyBBUElFcnJvck9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcyA9IHtcbiAgICAgIGJvZHk6IGF3YWl0IHJlc3BvbnNlPy5qc29uKCksXG4gICAgICBzdGF0dXM6IHJlc3BvbnNlPy5zdGF0dXNcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHF1ZXJ5KG1ldGhvZDogc3RyaW5nLCB1cmw6IHN0cmluZywgcXVlcnk6IGFueSwgb3B0aW9ucz86IGFueSkgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXRob2QsIHVybCwgeyBxdWVyeSwgLi4ub3B0aW9ucyB9KTtcbiAgfVxuXG4gIGNvbW1hbmQobWV0aG9kOiBzdHJpbmcsIHVybDogc3RyaW5nLCBkYXRhOiBhbnksIG9wdGlvbnM/OiBhbnkpIDogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWV0aG9kLCB1cmwsIHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH0sXG4gICAgICBib2R5OiBkYXRhLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0KHVybDogc3RyaW5nLCBxdWVyeT86IGFueSwgb3B0aW9ucz86IGFueSkgOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkoJ2dldCcsIHVybCwgcXVlcnksIG9wdGlvbnMpO1xuICB9XG5cbiAgaGVhZCh1cmw6IHN0cmluZywgcXVlcnk6IGFueSwgb3B0aW9uczogYW55KSA6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeSgnaGVhZCcsIHVybCwgcXVlcnksIG9wdGlvbnMpO1xuICB9XG5cbiAgb3B0aW9ucyh1cmw6IHN0cmluZywgcXVlcnk6IGFueSwgb3B0aW9uczogYW55KSA6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeSgnb3B0aW9ucycsIHVybCwgcXVlcnksIG9wdGlvbnMpO1xuICB9XG5cbiAgcG9zdCh1cmw6IHN0cmluZywgZGF0YTogYW55LCBvcHRpb25zPzogYW55KSA6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIHBvc3RXaXRoRkQodXJsOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGxlYXNlIHByb3ZpZGUgZGF0YSBvYmplY3QnKTtcbiAgICB9XG4gICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7XG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiBudWxsIH1cbiAgICB9O1xuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5jcmVhdGVGb3JtRGF0YShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwb3N0JywgdXJsLCBmb3JtRGF0YSwgcGFyYW1zKTtcbiAgfVxuXG4gIHB1dFdpdGhGRCh1cmw6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBkYXRhIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6IG51bGwgfVxuICAgIH07XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3B1dCcsIHVybCwgZm9ybURhdGEsIHBhcmFtcyk7XG4gIH1cblxuICBwYXRjaFdpdGhGRCh1cmw6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxBUElSZXNwb25zZT4ge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBkYXRhIG9iamVjdCcpO1xuICAgIH1cbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHtcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6IG51bGwgfVxuICAgIH07XG4gICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmNyZWF0ZUZvcm1EYXRhKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmNvbW1hbmQoJ3BhdGNoJywgdXJsLCBmb3JtRGF0YSwgcGFyYW1zKTtcbiAgfVxuXG4gIGNyZWF0ZUZvcm1EYXRhKGRhdGE6IGFueSk6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhIHtcbiAgICBjb25zdCBmb3JtRGF0YTogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEgPSBPYmplY3Qua2V5cyhkYXRhKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBkYXRhW2tleV07IH0pXG4gICAgICAucmVkdWNlKChmb3JtRGF0YUFjYzogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGEsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCBmaWxlS2V5cyA9IFsnYXR0YWNobWVudCcsICdpbmxpbmUnLCAnZmlsZSddO1xuICAgICAgICBpZiAoZmlsZUtleXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgIHRoaXMuYWRkRmlsZXNUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ21lc3NhZ2UnKSB7IC8vIG1pbWUgbWVzc2FnZVxuICAgICAgICAgIHRoaXMuYWRkTWltZURhdGFUb0ZEKGtleSwgZGF0YVtrZXldLCBmb3JtRGF0YUFjYyk7XG4gICAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hZGRDb21tb25Qcm9wZXJ0eVRvRkQoa2V5LCBkYXRhW2tleV0sIGZvcm1EYXRhQWNjKTtcbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhQWNjO1xuICAgICAgfSwgbmV3IHRoaXMuRm9ybURhdGFDb25zdHJ1Y3RvcigpKTtcbiAgICByZXR1cm4gZm9ybURhdGE7XG4gIH1cblxuICBwcml2YXRlIGFkZE1pbWVEYXRhVG9GRChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBkYXRhOiBCdWZmZXIgfCBCbG9iLFxuICAgIGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGlmIChpc05vZGVGb3JtRGF0YShmb3JtRGF0YUluc3RhbmNlKSkge1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgICAgICBmb3JtRGF0YUluc3RhbmNlLmFwcGVuZChrZXksIGRhdGEsIHsgZmlsZW5hbWU6ICdNaW1lTWVzc2FnZScgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1EYXRhSW5zdGFuY2UuYXBwZW5kKGtleSwgZGF0YSBhcyBCbG9iLCAnTWltZU1lc3NhZ2UnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZEZpbGVzVG9GRChcbiAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZyxcbiAgICB2YWx1ZTogYW55LFxuICAgIGZvcm1EYXRhSW5zdGFuY2U6IE5vZGVGb3JtRGF0YSB8IEZvcm1EYXRhXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGFwcGVuZEZpbGVUb0ZEID0gKFxuICAgICAga2V5OiBzdHJpbmcsXG4gICAgICBvYmo6IGFueSxcbiAgICAgIGZvcm1EYXRhOiBOb2RlRm9ybURhdGEgfCBGb3JtRGF0YVxuICAgICk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgaXNTdHJlYW1EYXRhID0gaXNTdHJlYW0ob2JqKTtcbiAgICAgIGNvbnN0IG9iakRhdGEgPSBpc1N0cmVhbURhdGEgPyBvYmogOiBvYmouZGF0YTtcbiAgICAgIC8vIGdldEF0dGFjaG1lbnRPcHRpb25zIHNob3VsZCBiZSBjYWxsZWQgd2l0aCBvYmogcGFyYW1ldGVyIHRvIHByZXZlbnQgbG9vc2luZyBmaWxlbmFtZVxuICAgICAgY29uc3Qgb3B0aW9ucyA9IGdldEF0dGFjaG1lbnRPcHRpb25zKG9iaik7XG4gICAgICBpZiAoaXNOb2RlRm9ybURhdGEoZm9ybURhdGEpKSB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIG9iakRhdGEsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBvYmpEYXRhLCBvcHRpb25zLmZpbGVuYW1lKTtcbiAgICB9O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGFwcGVuZEZpbGVUb0ZEKHByb3BlcnR5TmFtZSwgaXRlbSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwZW5kRmlsZVRvRkQocHJvcGVydHlOYW1lLCB2YWx1ZSwgZm9ybURhdGFJbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRDb21tb25Qcm9wZXJ0eVRvRkQoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgdmFsdWU6IGFueSxcbiAgICBmb3JtRGF0YUFjYzogTm9kZUZvcm1EYXRhIHwgRm9ybURhdGFcbiAgKTogdm9pZCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOiBhbnkpIHtcbiAgICAgICAgZm9ybURhdGFBY2MuYXBwZW5kKGtleSwgaXRlbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIGZvcm1EYXRhQWNjLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwdXQodXJsOiBzdHJpbmcsIGRhdGE6IGFueSwgb3B0aW9ucz86IGFueSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwdXQnLCB1cmwsIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgcGF0Y2godXJsOiBzdHJpbmcsIGRhdGE6IGFueSwgb3B0aW9ucz86IGFueSk6IFByb21pc2U8QVBJUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kKCdwYXRjaCcsIHVybCwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICBkZWxldGUodXJsOiBzdHJpbmcsIGRhdGE/OiBhbnksIG9wdGlvbnM/OiBhbnkpOiBQcm9taXNlPEFQSVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZCgnZGVsZXRlJywgdXJsLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0O1xuIiwiaW1wb3J0IHtcbiAgQ3JlYXRlVXBkYXRlUm91dGVEYXRhLCBEZXN0cm95Um91dGVSZXNwb25zZSwgUm91dGUsIFJvdXRlc0xpc3RRdWVyeSwgVXBkYXRlUm91dGVSZXNwb25zZVxufSBmcm9tICcuL2ludGVyZmFjZXMvcm91dGVzJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlc0NsaWVudCB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogUmVxdWVzdCkge1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIH1cblxuICBsaXN0KHF1ZXJ5OiBSb3V0ZXNMaXN0UXVlcnkpOiBQcm9taXNlPFJvdXRlW10+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCgnL3YzL3JvdXRlcycsIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5Lml0ZW1zKTtcbiAgfVxuXG4gIGdldChpZDogc3RyaW5nKTogUHJvbWlzZTxSb3V0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KGAvdjMvcm91dGVzLyR7aWR9YClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keS5yb3V0ZSk7XG4gIH1cblxuICBjcmVhdGUoZGF0YTogQ3JlYXRlVXBkYXRlUm91dGVEYXRhKTogUHJvbWlzZTxSb3V0ZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCgnL3YzL3JvdXRlcycsIGRhdGEpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmJvZHkucm91dGUpO1xuICB9XG5cbiAgdXBkYXRlKGlkOiBzdHJpbmcsIGRhdGE6IENyZWF0ZVVwZGF0ZVJvdXRlRGF0YSk6IFByb21pc2U8VXBkYXRlUm91dGVSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucHV0V2l0aEZEKGAvdjMvcm91dGVzLyR7aWR9YCwgZGF0YSlcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuYm9keSk7XG4gIH1cblxuICBkZXN0cm95KGlkOiBzdHJpbmcpOiBQcm9taXNlPERlc3Ryb3lSb3V0ZVJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5kZWxldGUoYC92My9yb3V0ZXMvJHtpZH1gKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5ib2R5KTtcbiAgfVxufVxuIiwiaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7IFN0YXRzUXVlcnksIFN0YXRzT3B0aW9ucywgU3RhdCB9IGZyb20gJy4vaW50ZXJmYWNlcy9TdGF0c09wdGlvbnMnO1xuXG5jbGFzcyBTdGF0cyB7XG4gIHN0YXJ0OiBEYXRlO1xuICBlbmQ6IERhdGU7XG4gIHJlc29sdXRpb246IHN0cmluZztcbiAgc3RhdHM6IFN0YXRbXTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBTdGF0c09wdGlvbnMpIHtcbiAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoZGF0YS5zdGFydCk7XG4gICAgdGhpcy5lbmQgPSBuZXcgRGF0ZShkYXRhLmVuZCk7XG4gICAgdGhpcy5yZXNvbHV0aW9uID0gZGF0YS5yZXNvbHV0aW9uO1xuICAgIHRoaXMuc3RhdHMgPSBkYXRhLnN0YXRzLm1hcChmdW5jdGlvbiAoc3RhdDogU3RhdCkge1xuICAgICAgY29uc3QgcmVzID0geyAuLi5zdGF0IH07XG4gICAgICByZXMudGltZSA9IG5ldyBEYXRlKHN0YXQudGltZSk7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeTogU3RhdHNRdWVyeSB8IHVuZGVmaW5lZCk6IEFycmF5PEFycmF5PHN0cmluZz4+IHtcbiAgICBsZXQgc2VhcmNoUGFyYW1zID0gW10gYXMgQXJyYXk8QXJyYXk8c3RyaW5nPj47XG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCkge1xuICAgICAgc2VhcmNoUGFyYW1zID0gT2JqZWN0LmVudHJpZXMocXVlcnkpLnJlZHVjZSgoYXJyYXlXaXRoUGFpcnMsIGN1cnJlbnRQYWlyKSA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGN1cnJlbnRQYWlyO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgcmVwZWF0ZWRQcm9wZXJ0eSA9IHZhbHVlLm1hcCgoaXRlbSkgPT4gW2tleSwgaXRlbV0pO1xuICAgICAgICAgIHJldHVybiBbLi4uYXJyYXlXaXRoUGFpcnMsIC4uLnJlcGVhdGVkUHJvcGVydHldO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5V2l0aFBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgICAgcmV0dXJuIGFycmF5V2l0aFBhaXJzO1xuICAgICAgfSwgW10gYXMgQXJyYXk8QXJyYXk8c3RyaW5nPj4pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWFyY2hQYXJhbXM7XG4gIH1cblxuICBfcGFyc2VTdGF0cyhyZXNwb25zZTogeyBib2R5OiBTdGF0c09wdGlvbnMgfSk6IFN0YXRzIHtcbiAgICByZXR1cm4gbmV3IFN0YXRzKHJlc3BvbnNlLmJvZHkpO1xuICB9XG5cbiAgZ2V0RG9tYWluKGRvbWFpbjogc3RyaW5nLCBxdWVyeT86IFN0YXRzUXVlcnkpOiBQcm9taXNlPFN0YXRzPiB7XG4gICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gdGhpcy5wcmVwYXJlU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMnLCBkb21haW4sICdzdGF0cy90b3RhbCcpLCBzZWFyY2hQYXJhbXMpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVN0YXRzKTtcbiAgfVxuXG4gIGdldEFjY291bnQocXVlcnk/OiBTdGF0c1F1ZXJ5KTogUHJvbWlzZTxTdGF0cz4ge1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHRoaXMucHJlcGFyZVNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5nZXQoJy92My9zdGF0cy90b3RhbCcsIHNlYXJjaFBhcmFtcylcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlU3RhdHMpO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbmltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcbmltcG9ydCB7XG4gIEJvdW5jZURhdGEsXG4gIENvbXBsYWludERhdGEsXG4gIFBhZ2VzTGlzdCxcbiAgUGFnZXNMaXN0QWNjdW11bGF0b3IsXG4gIFBhcnNlZFBhZ2UsXG4gIFBhcnNlZFBhZ2VzTGlzdCxcbiAgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEsXG4gIFN1cHByZXNzaW9uQ3JlYXRpb25SZXNwb25zZSxcbiAgU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCxcbiAgU3VwcHJlc3Npb25EZXN0cm95UmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdCxcbiAgU3VwcHJlc3Npb25MaXN0LFxuICBTdXBwcmVzc2lvbkxpc3RRdWVyeSxcbiAgU3VwcHJlc3Npb25MaXN0UmVzcG9uc2UsXG4gIFN1cHByZXNzaW9uTW9kZWxzLFxuICBTdXBwcmVzc2lvblJlc3BvbnNlLFxuICBVbnN1YnNjcmliZURhdGEsXG4gIFdoaXRlTGlzdERhdGEsXG59IGZyb20gJy4vaW50ZXJmYWNlcy9TdXByZXNzaW9ucyc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi9lcnJvcic7XG5pbXBvcnQgQVBJRXJyb3JPcHRpb25zIGZyb20gJy4vaW50ZXJmYWNlcy9BUElFcnJvck9wdGlvbnMnO1xuXG5jb25zdCBjcmVhdGVPcHRpb25zID0ge1xuICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfVxufTtcbmV4cG9ydCBjbGFzcyBTdXBwcmVzc2lvbiB7XG4gIHR5cGU6IHN0cmluZztcbiAgY29uc3RydWN0b3IodHlwZTogU3VwcHJlc3Npb25Nb2RlbHMpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG59XG5leHBvcnQgY2xhc3MgQm91bmNlIGV4dGVuZHMgU3VwcHJlc3Npb24ge1xuICBhZGRyZXNzOiBzdHJpbmc7XG4gIGNvZGU6IG51bWJlcjtcbiAgZXJyb3I6IHN0cmluZztcbiAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBCb3VuY2VEYXRhKSB7XG4gICAgc3VwZXIoU3VwcHJlc3Npb25Nb2RlbHMuQk9VTkNFUyk7XG4gICAgdGhpcy5hZGRyZXNzID0gZGF0YS5hZGRyZXNzO1xuICAgIHRoaXMuY29kZSA9ICtkYXRhLmNvZGU7XG4gICAgdGhpcy5lcnJvciA9IGRhdGEuZXJyb3I7XG4gICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcGxhaW50IGV4dGVuZHMgU3VwcHJlc3Npb24ge1xuICBhZGRyZXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIGNyZWF0ZWRfYXQ6IERhdGU7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogQ29tcGxhaW50RGF0YSkge1xuICAgIHN1cGVyKFN1cHByZXNzaW9uTW9kZWxzLkNPTVBMQUlOVFMpO1xuICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICB0aGlzLmNyZWF0ZWRfYXQgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbnN1YnNjcmliZSBleHRlbmRzIFN1cHByZXNzaW9uIHtcbiAgYWRkcmVzczogc3RyaW5nO1xuICB0YWdzOiBzdHJpbmdbXTtcbiAgY3JlYXRlZF9hdDogRGF0ZTtcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBVbnN1YnNjcmliZURhdGEpIHtcbiAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5VTlNVQlNDUklCRVMpO1xuICAgIHRoaXMuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICB0aGlzLnRhZ3MgPSBkYXRhLnRhZ3M7XG4gICAgdGhpcy5jcmVhdGVkX2F0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgV2hpdGVMaXN0IGV4dGVuZHMgU3VwcHJlc3Npb24ge1xuICB2YWx1ZTogc3RyaW5nO1xuICByZWFzb246IHN0cmluZztcbiAgY3JlYXRlZEF0OiBEYXRlO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IFdoaXRlTGlzdERhdGEpIHtcbiAgICBzdXBlcihTdXBwcmVzc2lvbk1vZGVscy5XSElURUxJU1RTKTtcbiAgICB0aGlzLnZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICB0aGlzLnJlYXNvbiA9IGRhdGEucmVhc29uO1xuICAgIHRoaXMuY3JlYXRlZEF0ID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1cHByZXNzaW9uQ2xpZW50IHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgbW9kZWxzOiBNYXA8c3RyaW5nLCBhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubW9kZWxzID0gbmV3IE1hcCgpO1xuICAgIHRoaXMubW9kZWxzLnNldCgnYm91bmNlcycsIEJvdW5jZSk7XG4gICAgdGhpcy5tb2RlbHMuc2V0KCdjb21wbGFpbnRzJywgQ29tcGxhaW50KTtcbiAgICB0aGlzLm1vZGVscy5zZXQoJ3Vuc3Vic2NyaWJlcycsIFVuc3Vic2NyaWJlKTtcbiAgICB0aGlzLm1vZGVscy5zZXQoJ3doaXRlbGlzdHMnLCBXaGl0ZUxpc3QpO1xuICB9XG5cbiAgX3BhcnNlUGFnZShpZDogc3RyaW5nLCBwYWdlVXJsOiBzdHJpbmcpIDogUGFyc2VkUGFnZSB7XG4gICAgY29uc3QgcGFyc2VkVXJsID0gbmV3IFVSTChwYWdlVXJsKTtcbiAgICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gcGFyc2VkVXJsO1xuICAgIHJldHVybiB7XG4gICAgICBpZCxcbiAgICAgIHBhZ2U6IHNlYXJjaFBhcmFtcy5oYXMoJ3BhZ2UnKSA/IHNlYXJjaFBhcmFtcy5nZXQoJ3BhZ2UnKSA6IHVuZGVmaW5lZCxcbiAgICAgIGFkZHJlc3M6IHNlYXJjaFBhcmFtcy5oYXMoJ2FkZHJlc3MnKSA/IHNlYXJjaFBhcmFtcy5nZXQoJ2FkZHJlc3MnKSA6IHVuZGVmaW5lZCxcbiAgICAgIHVybDogcGFnZVVybFxuICAgIH07XG4gIH1cblxuICBfcGFyc2VQYWdlTGlua3MocmVzcG9uc2U6IFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlKTogUGFyc2VkUGFnZXNMaXN0IHtcbiAgICBjb25zdCBwYWdlcyA9IE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlLmJvZHkucGFnaW5nIGFzIFBhZ2VzTGlzdCk7XG4gICAgcmV0dXJuIHBhZ2VzLnJlZHVjZShcbiAgICAgIChhY2M6IFBhZ2VzTGlzdEFjY3VtdWxhdG9yLCBwYWlyOiBbcGFnZVVybDogc3RyaW5nLCBpZDogc3RyaW5nXSkgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IHBhaXJbMF07XG4gICAgICAgIGNvbnN0IHBhZ2VVcmwgPSBwYWlyWzFdO1xuICAgICAgICBhY2NbaWRdID0gdGhpcy5fcGFyc2VQYWdlKGlkLCBwYWdlVXJsKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9XG4gICAgKSBhcyB1bmtub3duIGFzIFBhcnNlZFBhZ2VzTGlzdDtcbiAgfVxuXG4gIF9wYXJzZUxpc3QoXG4gICAgcmVzcG9uc2U6IFN1cHByZXNzaW9uTGlzdFJlc3BvbnNlLFxuICAgIE1vZGVsOiB7XG4gICAgICBuZXcoZGF0YTogQm91bmNlRGF0YSB8IENvbXBsYWludERhdGEgfCBVbnN1YnNjcmliZURhdGEgfCBXaGl0ZUxpc3REYXRhKTpcbiAgICAgIEJvdW5jZSB8IENvbXBsYWludCB8IFVuc3Vic2NyaWJlIHwgV2hpdGVMaXN0XG4gICAgfVxuICApOiBTdXBwcmVzc2lvbkxpc3Qge1xuICAgIGNvbnN0IGRhdGEgPSB7fSBhcyBTdXBwcmVzc2lvbkxpc3Q7XG4gICAgZGF0YS5pdGVtcyA9IHJlc3BvbnNlLmJvZHkuaXRlbXMubWFwKChpdGVtKSA9PiBuZXcgTW9kZWwoaXRlbSkpO1xuXG4gICAgZGF0YS5wYWdlcyA9IHRoaXMuX3BhcnNlUGFnZUxpbmtzKHJlc3BvbnNlKTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgX3BhcnNlSXRlbTxUIGV4dGVuZHMgU3VwcHJlc3Npb24+KFxuICAgIGRhdGEgOiBCb3VuY2VEYXRhIHwgQ29tcGxhaW50RGF0YSB8IFVuc3Vic2NyaWJlRGF0YSB8IFdoaXRlTGlzdERhdGEsXG4gICAgTW9kZWw6IHtcbiAgICAgIG5ldyhkYXRhOiBCb3VuY2VEYXRhIHwgQ29tcGxhaW50RGF0YSB8IFVuc3Vic2NyaWJlRGF0YSB8IFdoaXRlTGlzdERhdGEpOlxuICAgICAgVFxuICAgIH1cbiAgKTogVCB7XG4gICAgcmV0dXJuIG5ldyBNb2RlbChkYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlV2hpdGVMaXN0KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIGRhdGE6IFN1cHByZXNzaW9uQ3JlYXRpb25EYXRhIHwgU3VwcHJlc3Npb25DcmVhdGlvbkRhdGFbXVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uQ3JlYXRpb25SZXN1bHQ+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICAgIHN0YXR1c1RleHQ6ICdEYXRhIHByb3BlcnR5IHNob3VsZCBiZSBhbiBvYmplY3QnLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgbWVzc2FnZTogJ1doaXRlbGlzdFxcJ3MgY3JlYXRpb24gcHJvY2VzcyBkb2VzIG5vdCBzdXBwb3J0IG11bHRpcGxlIGNyZWF0aW9ucy4gRGF0YSBwcm9wZXJ0eSBzaG91bGQgYmUgYW4gb2JqZWN0J1xuICAgICAgICB9XG4gICAgICB9IGFzIEFQSUVycm9yT3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5wb3N0V2l0aEZEKHVybGpvaW4oJ3YzJywgZG9tYWluLCAnd2hpdGVsaXN0cycpLCBkYXRhKVxuICAgICAgLnRoZW4odGhpcy5wcmVwYXJlUmVzcG9uc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja1R5cGUodHlwZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLm1vZGVscy5oYXModHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBBUElFcnJvcih7XG4gICAgICAgIHN0YXR1czogNDAwLFxuICAgICAgICBzdGF0dXNUZXh0OiAnVW5rbm93biB0eXBlIHZhbHVlJyxcbiAgICAgICAgYm9keTogeyBtZXNzYWdlOiAnVHlwZSBtYXkgYmUgb25seSBvbmUgb2YgW2JvdW5jZXMsIGNvbXBsYWludHMsIHVuc3Vic2NyaWJlcywgd2hpdGVsaXN0c10nIH1cbiAgICAgIH0gYXMgQVBJRXJyb3JPcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVSZXNwb25zZShyZXNwb25zZTogU3VwcHJlc3Npb25DcmVhdGlvblJlc3BvbnNlKTogU3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6IHJlc3BvbnNlLmJvZHkubWVzc2FnZSxcbiAgICAgIHR5cGU6IHJlc3BvbnNlLmJvZHkudHlwZSB8fCAnJyxcbiAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXNcbiAgICB9O1xuICB9XG5cbiAgbGlzdChcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgcXVlcnk/OiBTdXBwcmVzc2lvbkxpc3RRdWVyeVxuICApOiBQcm9taXNlPFN1cHByZXNzaW9uTGlzdD4ge1xuICAgIHRoaXMuY2hlY2tUeXBlKHR5cGUpO1xuXG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVscy5nZXQodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLmdldCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIHF1ZXJ5KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiBTdXBwcmVzc2lvbkxpc3RSZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VMaXN0KHJlc3BvbnNlLCBtb2RlbCkpO1xuICB9XG5cbiAgZ2V0KFxuICAgIGRvbWFpbjogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBhZGRyZXNzOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxCb3VuY2UgfCBDb21wbGFpbnQgfCBVbnN1YnNjcmliZSB8IFdoaXRlTGlzdD4ge1xuICAgIHRoaXMuY2hlY2tUeXBlKHR5cGUpO1xuXG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVscy5nZXQodHlwZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdFxuICAgICAgLmdldCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSwgZW5jb2RlVVJJQ29tcG9uZW50KGFkZHJlc3MpKSlcbiAgICAgIC50aGVuKChyZXNwb25zZTogU3VwcHJlc3Npb25SZXNwb25zZSkgPT4gdGhpcy5fcGFyc2VJdGVtPHR5cGVvZiBtb2RlbD4ocmVzcG9uc2UuYm9keSwgbW9kZWwpKTtcbiAgfVxuXG4gIGNyZWF0ZShcbiAgICBkb21haW46IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgZGF0YTogU3VwcHJlc3Npb25DcmVhdGlvbkRhdGEgfCBTdXBwcmVzc2lvbkNyZWF0aW9uRGF0YVtdXG4gICk6IFByb21pc2U8U3VwcHJlc3Npb25DcmVhdGlvblJlc3VsdD4ge1xuICAgIHRoaXMuY2hlY2tUeXBlKHR5cGUpO1xuICAgIC8vIHN1cHBvcnRzIGFkZGluZyBtdWx0aXBsZSBzdXBwcmVzc2lvbnMgYnkgZGVmYXVsdFxuICAgIGxldCBwb3N0RGF0YTtcbiAgICBpZiAodHlwZSA9PT0gJ3doaXRlbGlzdHMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVXaGl0ZUxpc3QoZG9tYWluLCBkYXRhKTtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHBvc3REYXRhID0gW2RhdGFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3N0RGF0YSA9IFsuLi5kYXRhXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0XG4gICAgICAucG9zdCh1cmxqb2luKCd2MycsIGRvbWFpbiwgdHlwZSksIEpTT04uc3RyaW5naWZ5KHBvc3REYXRhKSwgY3JlYXRlT3B0aW9ucylcbiAgICAgIC50aGVuKHRoaXMucHJlcGFyZVJlc3BvbnNlKTtcbiAgfVxuXG4gIGRlc3Ryb3koXG4gICAgZG9tYWluOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGFkZHJlc3M6IHN0cmluZ1xuICApOiBQcm9taXNlPFN1cHByZXNzaW9uRGVzdHJveVJlc3VsdD4ge1xuICAgIHRoaXMuY2hlY2tUeXBlKHR5cGUpO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RcbiAgICAgIC5kZWxldGUodXJsam9pbigndjMnLCBkb21haW4sIHR5cGUsIGVuY29kZVVSSUNvbXBvbmVudChhZGRyZXNzKSkpXG4gICAgICAudGhlbigocmVzcG9uc2U6IFN1cHByZXNzaW9uRGVzdHJveVJlc3BvbnNlKSA9PiAoe1xuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UsXG4gICAgICAgIHZhbHVlOiByZXNwb25zZS5ib2R5LnZhbHVlIHx8ICcnLFxuICAgICAgICBhZGRyZXNzOiByZXNwb25zZS5ib2R5LmFkZHJlc3MgfHwgJycsXG4gICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzXG4gICAgICB9KSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdXBwcmVzc2lvbkNsaWVudDtcbiIsImltcG9ydCBBUElSZXNwb25zZSBmcm9tICcuL2ludGVyZmFjZXMvQXBpUmVzcG9uc2UnO1xuaW1wb3J0IHsgSU11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCB9IGZyb20gJy4vaW50ZXJmYWNlcy9NdWx0aXBsZVZhbGlkYXRpb24nO1xuaW1wb3J0IHsgVmFsaWRhdGlvblJlc3VsdCwgVmFsaWRhdGlvblJlc3BvbnNlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL1ZhbGlkYXRlJztcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vcmVxdWVzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRlQ2xpZW50IHtcbiAgcHVibGljIG11bHRpcGxlVmFsaWRhdGlvbjtcbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBSZXF1ZXN0LCBtdWx0aXBsZVZhbGlkYXRpb25DbGllbnQ6IElNdWx0aXBsZVZhbGlkYXRpb25DbGllbnQpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMubXVsdGlwbGVWYWxpZGF0aW9uID0gbXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50O1xuICB9XG5cbiAgZ2V0KGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8VmFsaWRhdGlvblJlc3VsdD4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KCcvdjQvYWRkcmVzcy92YWxpZGF0ZScsIHsgYWRkcmVzcyB9KVxuICAgICAgLnRoZW4oKHJlc3BvbnNlIDogQVBJUmVzcG9uc2UpID0+IHJlc3BvbnNlKVxuICAgICAgLnRoZW4oKHJlcyA6IFZhbGlkYXRpb25SZXNwb25zZSkgPT4gcmVzLmJvZHkgYXMgVmFsaWRhdGlvblJlc3VsdCk7XG4gIH1cbn1cbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcblxuaW1wb3J0IHtcbiAgVmFsaWRhdGlvblJlc3BvbnNlLFxuICBXZWJob29rTGlzdCxcbiAgV2ViaG9va1Jlc3BvbnNlLFxuICBXZWJob29rc0lkcyxcbiAgV2ViaG9va3NRdWVyeVxufSBmcm9tICcuL2ludGVyZmFjZXMvV2ViaG9va3MnO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0JztcblxuY2xhc3MgV2ViaG9vayB7XG4gIGlkOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIHVybDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudXJsID0gdXJsO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYmhvb2tDbGllbnQge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgX3BhcnNlV2ViaG9va0xpc3QocmVzcG9uc2U6IHsgYm9keTogeyB3ZWJob29rczogV2ViaG9va0xpc3QgfSB9KTogV2ViaG9va0xpc3Qge1xuICAgIHJldHVybiByZXNwb25zZS5ib2R5LndlYmhvb2tzO1xuICB9XG5cbiAgX3BhcnNlV2ViaG9va1dpdGhJRChpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZXNwb25zZTogV2ViaG9va1Jlc3BvbnNlKTogV2ViaG9vayB7XG4gICAgICBjb25zdCB3ZWJob29rUmVzcG9uc2UgPSByZXNwb25zZT8uYm9keT8ud2ViaG9vaztcbiAgICAgIGxldCB1cmwgPSB3ZWJob29rUmVzcG9uc2U/LnVybDtcbiAgICAgIGlmICghdXJsKSB7XG4gICAgICAgIHVybCA9IHdlYmhvb2tSZXNwb25zZT8udXJscyAmJiB3ZWJob29rUmVzcG9uc2UudXJscy5sZW5ndGhcbiAgICAgICAgICA/IHdlYmhvb2tSZXNwb25zZS51cmxzWzBdXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFdlYmhvb2soaWQsIHVybCk7XG4gICAgfTtcbiAgfVxuXG4gIF9wYXJzZVdlYmhvb2tUZXN0KHJlc3BvbnNlOiB7IGJvZHk6IHsgY29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcgfSB9KVxuICA6IHtjb2RlOiBudW1iZXIsIG1lc3NhZ2U6c3RyaW5nfSB7XG4gICAgcmV0dXJuIHsgY29kZTogcmVzcG9uc2UuYm9keS5jb2RlLCBtZXNzYWdlOiByZXNwb25zZS5ib2R5Lm1lc3NhZ2UgfSBhcyBWYWxpZGF0aW9uUmVzcG9uc2U7XG4gIH1cblxuICBsaXN0KGRvbWFpbjogc3RyaW5nLCBxdWVyeTogV2ViaG9va3NRdWVyeSk6IFByb21pc2U8V2ViaG9va0xpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmdldCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJyksIHF1ZXJ5KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rTGlzdCk7XG4gIH1cblxuICBnZXQoZG9tYWluOiBzdHJpbmcsIGlkOiBXZWJob29rc0lkcyk6IFByb21pc2U8V2ViaG9vaz4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QuZ2V0KHVybGpvaW4oJy92My9kb21haW5zJywgZG9tYWluLCAnd2ViaG9va3MnLCBpZCkpXG4gICAgICAudGhlbih0aGlzLl9wYXJzZVdlYmhvb2tXaXRoSUQoaWQpKTtcbiAgfVxuXG4gIGNyZWF0ZShkb21haW46IHN0cmluZyxcbiAgICBpZDogc3RyaW5nLFxuICAgIHVybDogc3RyaW5nLFxuICAgIHRlc3QgPSBmYWxzZSk6IFByb21pc2U8V2ViaG9vayB8IFZhbGlkYXRpb25SZXNwb25zZT4ge1xuICAgIGlmICh0ZXN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LnB1dFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQsICd0ZXN0JyksIHsgdXJsIH0pXG4gICAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1Rlc3QpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlcXVlc3QucG9zdFdpdGhGRCh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJyksIHsgaWQsIHVybCB9KVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cblxuICB1cGRhdGUoZG9tYWluOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHVybDogc3RyaW5nKTogUHJvbWlzZTxXZWJob29rPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdC5wdXRXaXRoRkQodXJsam9pbignL3YzL2RvbWFpbnMnLCBkb21haW4sICd3ZWJob29rcycsIGlkKSwgeyB1cmwgfSlcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlV2ViaG9va1dpdGhJRChpZCkpO1xuICB9XG5cbiAgZGVzdHJveShkb21haW46IHN0cmluZywgaWQ6IHN0cmluZykgOiBQcm9taXNlPFdlYmhvb2s+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0LmRlbGV0ZSh1cmxqb2luKCcvdjMvZG9tYWlucycsIGRvbWFpbiwgJ3dlYmhvb2tzJywgaWQpKVxuICAgICAgLnRoZW4odGhpcy5fcGFyc2VXZWJob29rV2l0aElEKGlkKSk7XG4gIH1cbn1cbiIsIi8qISBodHRwczovL210aHMuYmUvYmFzZTY0IHYxLjAuMCBieSBAbWF0aGlhcyB8IE1JVCBsaWNlbnNlICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgLlxuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLlxuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0bW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsIGFuZCB1c2Vcblx0Ly8gaXQgYXMgYHJvb3RgLlxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBJbnZhbGlkQ2hhcmFjdGVyRXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG5cdFx0dGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblx0fTtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcblx0SW52YWxpZENoYXJhY3RlckVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cblx0dmFyIGVycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuXHRcdC8vIE5vdGU6IHRoZSBlcnJvciBtZXNzYWdlcyB1c2VkIHRocm91Z2hvdXQgdGhpcyBmaWxlIG1hdGNoIHRob3NlIHVzZWQgYnlcblx0XHQvLyB0aGUgbmF0aXZlIGBhdG9iYC9gYnRvYWAgaW1wbGVtZW50YXRpb24gaW4gQ2hyb21pdW0uXG5cdFx0dGhyb3cgbmV3IEludmFsaWRDaGFyYWN0ZXJFcnJvcihtZXNzYWdlKTtcblx0fTtcblxuXHR2YXIgVEFCTEUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cdC8vIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvY29tbW9uLW1pY3Jvc3ludGF4ZXMuaHRtbCNzcGFjZS1jaGFyYWN0ZXJcblx0dmFyIFJFR0VYX1NQQUNFX0NIQVJBQ1RFUlMgPSAvW1xcdFxcblxcZlxcciBdL2c7XG5cblx0Ly8gYGRlY29kZWAgaXMgZGVzaWduZWQgdG8gYmUgZnVsbHkgY29tcGF0aWJsZSB3aXRoIGBhdG9iYCBhcyBkZXNjcmliZWQgaW4gdGhlXG5cdC8vIEhUTUwgU3RhbmRhcmQuIGh0dHA6Ly93aGF0d2cub3JnL2h0bWwvd2ViYXBwYXBpcy5odG1sI2RvbS13aW5kb3diYXNlNjQtYXRvYlxuXHQvLyBUaGUgb3B0aW1pemVkIGJhc2U2NC1kZWNvZGluZyBhbGdvcml0aG0gdXNlZCBpcyBiYXNlZCBvbiBAYXRr4oCZcyBleGNlbGxlbnRcblx0Ly8gaW1wbGVtZW50YXRpb24uIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2F0ay8xMDIwMzk2XG5cdHZhciBkZWNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KVxuXHRcdFx0LnJlcGxhY2UoUkVHRVhfU1BBQ0VfQ0hBUkFDVEVSUywgJycpO1xuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cdFx0aWYgKGxlbmd0aCAlIDQgPT0gMCkge1xuXHRcdFx0aW5wdXQgPSBpbnB1dC5yZXBsYWNlKC89PT8kLywgJycpO1xuXHRcdFx0bGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcdH1cblx0XHRpZiAoXG5cdFx0XHRsZW5ndGggJSA0ID09IDEgfHxcblx0XHRcdC8vIGh0dHA6Ly93aGF0d2cub3JnL0MjYWxwaGFudW1lcmljLWFzY2lpLWNoYXJhY3RlcnNcblx0XHRcdC9bXithLXpBLVowLTkvXS8udGVzdChpbnB1dClcblx0XHQpIHtcblx0XHRcdGVycm9yKFxuXHRcdFx0XHQnSW52YWxpZCBjaGFyYWN0ZXI6IHRoZSBzdHJpbmcgdG8gYmUgZGVjb2RlZCBpcyBub3QgY29ycmVjdGx5IGVuY29kZWQuJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0dmFyIGJpdENvdW50ZXIgPSAwO1xuXHRcdHZhciBiaXRTdG9yYWdlO1xuXHRcdHZhciBidWZmZXI7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHZhciBwb3NpdGlvbiA9IC0xO1xuXHRcdHdoaWxlICgrK3Bvc2l0aW9uIDwgbGVuZ3RoKSB7XG5cdFx0XHRidWZmZXIgPSBUQUJMRS5pbmRleE9mKGlucHV0LmNoYXJBdChwb3NpdGlvbikpO1xuXHRcdFx0Yml0U3RvcmFnZSA9IGJpdENvdW50ZXIgJSA0ID8gYml0U3RvcmFnZSAqIDY0ICsgYnVmZmVyIDogYnVmZmVyO1xuXHRcdFx0Ly8gVW5sZXNzIHRoaXMgaXMgdGhlIGZpcnN0IG9mIGEgZ3JvdXAgb2YgNCBjaGFyYWN0ZXJz4oCmXG5cdFx0XHRpZiAoYml0Q291bnRlcisrICUgNCkge1xuXHRcdFx0XHQvLyDigKZjb252ZXJ0IHRoZSBmaXJzdCA4IGJpdHMgdG8gYSBzaW5nbGUgQVNDSUkgY2hhcmFjdGVyLlxuXHRcdFx0XHRvdXRwdXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0XHRcdFx0XHQweEZGICYgYml0U3RvcmFnZSA+PiAoLTIgKiBiaXRDb3VudGVyICYgNilcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fTtcblxuXHQvLyBgZW5jb2RlYCBpcyBkZXNpZ25lZCB0byBiZSBmdWxseSBjb21wYXRpYmxlIHdpdGggYGJ0b2FgIGFzIGRlc2NyaWJlZCBpbiB0aGVcblx0Ly8gSFRNTCBTdGFuZGFyZDogaHR0cDovL3doYXR3Zy5vcmcvaHRtbC93ZWJhcHBhcGlzLmh0bWwjZG9tLXdpbmRvd2Jhc2U2NC1idG9hXG5cdHZhciBlbmNvZGUgPSBmdW5jdGlvbihpbnB1dCkge1xuXHRcdGlucHV0ID0gU3RyaW5nKGlucHV0KTtcblx0XHRpZiAoL1teXFwwLVxceEZGXS8udGVzdChpbnB1dCkpIHtcblx0XHRcdC8vIE5vdGU6IG5vIG5lZWQgdG8gc3BlY2lhbC1jYXNlIGFzdHJhbCBzeW1ib2xzIGhlcmUsIGFzIHN1cnJvZ2F0ZXMgYXJlXG5cdFx0XHQvLyBtYXRjaGVkLCBhbmQgdGhlIGlucHV0IGlzIHN1cHBvc2VkIHRvIG9ubHkgY29udGFpbiBBU0NJSSBhbnl3YXkuXG5cdFx0XHRlcnJvcihcblx0XHRcdFx0J1RoZSBzdHJpbmcgdG8gYmUgZW5jb2RlZCBjb250YWlucyBjaGFyYWN0ZXJzIG91dHNpZGUgb2YgdGhlICcgK1xuXHRcdFx0XHQnTGF0aW4xIHJhbmdlLidcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHZhciBwYWRkaW5nID0gaW5wdXQubGVuZ3RoICUgMztcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0dmFyIHBvc2l0aW9uID0gLTE7XG5cdFx0dmFyIGE7XG5cdFx0dmFyIGI7XG5cdFx0dmFyIGM7XG5cdFx0dmFyIGJ1ZmZlcjtcblx0XHQvLyBNYWtlIHN1cmUgYW55IHBhZGRpbmcgaXMgaGFuZGxlZCBvdXRzaWRlIG9mIHRoZSBsb29wLlxuXHRcdHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGggLSBwYWRkaW5nO1xuXG5cdFx0d2hpbGUgKCsrcG9zaXRpb24gPCBsZW5ndGgpIHtcblx0XHRcdC8vIFJlYWQgdGhyZWUgYnl0ZXMsIGkuZS4gMjQgYml0cy5cblx0XHRcdGEgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKSA8PCAxNjtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pIDw8IDg7XG5cdFx0XHRjID0gaW5wdXQuY2hhckNvZGVBdCgrK3Bvc2l0aW9uKTtcblx0XHRcdGJ1ZmZlciA9IGEgKyBiICsgYztcblx0XHRcdC8vIFR1cm4gdGhlIDI0IGJpdHMgaW50byBmb3VyIGNodW5rcyBvZiA2IGJpdHMgZWFjaCwgYW5kIGFwcGVuZCB0aGVcblx0XHRcdC8vIG1hdGNoaW5nIGNoYXJhY3RlciBmb3IgZWFjaCBvZiB0aGVtIHRvIHRoZSBvdXRwdXQuXG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDE4ICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEyICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDYgJiAweDNGKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgJiAweDNGKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAocGFkZGluZyA9PSAyKSB7XG5cdFx0XHRhID0gaW5wdXQuY2hhckNvZGVBdChwb3NpdGlvbikgPDwgODtcblx0XHRcdGIgPSBpbnB1dC5jaGFyQ29kZUF0KCsrcG9zaXRpb24pO1xuXHRcdFx0YnVmZmVyID0gYSArIGI7XG5cdFx0XHRvdXRwdXQgKz0gKFxuXHRcdFx0XHRUQUJMRS5jaGFyQXQoYnVmZmVyID4+IDEwKSArXG5cdFx0XHRcdFRBQkxFLmNoYXJBdCgoYnVmZmVyID4+IDQpICYgMHgzRikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCAyKSAmIDB4M0YpICtcblx0XHRcdFx0Jz0nXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAocGFkZGluZyA9PSAxKSB7XG5cdFx0XHRidWZmZXIgPSBpbnB1dC5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcblx0XHRcdG91dHB1dCArPSAoXG5cdFx0XHRcdFRBQkxFLmNoYXJBdChidWZmZXIgPj4gMikgK1xuXHRcdFx0XHRUQUJMRS5jaGFyQXQoKGJ1ZmZlciA8PCA0KSAmIDB4M0YpICtcblx0XHRcdFx0Jz09J1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9O1xuXG5cdHZhciBiYXNlNjQgPSB7XG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCd2ZXJzaW9uJzogJzEuMC4wJ1xuXHR9O1xuXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGJhc2U2NDtcblx0XHR9KTtcblx0fVx0ZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG5cdFx0aWYgKGZyZWVNb2R1bGUpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IGJhc2U2NDtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGJhc2U2NCkge1xuXHRcdFx0XHRiYXNlNjQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IGJhc2U2NFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LmJhc2U2NCA9IGJhc2U2NDtcblx0fVxuXG59KHRoaXMpKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBSZXR1cm5zIGEgYEJ1ZmZlcmAgaW5zdGFuY2UgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBVUkkgYHVyaWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVyaSBEYXRhIFVSSSB0byB0dXJuIGludG8gYSBCdWZmZXIgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0J1ZmZlcn0gQnVmZmVyIGluc3RhbmNlIGZyb20gRGF0YSBVUklcbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIGRhdGFVcmlUb0J1ZmZlcih1cmkpIHtcbiAgICBpZiAoIS9eZGF0YTovaS50ZXN0KHVyaSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYHVyaWAgZG9lcyBub3QgYXBwZWFyIHRvIGJlIGEgRGF0YSBVUkkgKG11c3QgYmVnaW4gd2l0aCBcImRhdGE6XCIpJyk7XG4gICAgfVxuICAgIC8vIHN0cmlwIG5ld2xpbmVzXG4gICAgdXJpID0gdXJpLnJlcGxhY2UoL1xccj9cXG4vZywgJycpO1xuICAgIC8vIHNwbGl0IHRoZSBVUkkgdXAgaW50byB0aGUgXCJtZXRhZGF0YVwiIGFuZCB0aGUgXCJkYXRhXCIgcG9ydGlvbnNcbiAgICBjb25zdCBmaXJzdENvbW1hID0gdXJpLmluZGV4T2YoJywnKTtcbiAgICBpZiAoZmlyc3RDb21tYSA9PT0gLTEgfHwgZmlyc3RDb21tYSA8PSA0KSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21hbGZvcm1lZCBkYXRhOiBVUkknKTtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIHRoZSBcImRhdGE6XCIgc2NoZW1lIGFuZCBwYXJzZSB0aGUgbWV0YWRhdGFcbiAgICBjb25zdCBtZXRhID0gdXJpLnN1YnN0cmluZyg1LCBmaXJzdENvbW1hKS5zcGxpdCgnOycpO1xuICAgIGxldCBjaGFyc2V0ID0gJyc7XG4gICAgbGV0IGJhc2U2NCA9IGZhbHNlO1xuICAgIGNvbnN0IHR5cGUgPSBtZXRhWzBdIHx8ICd0ZXh0L3BsYWluJztcbiAgICBsZXQgdHlwZUZ1bGwgPSB0eXBlO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbWV0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobWV0YVtpXSA9PT0gJ2Jhc2U2NCcpIHtcbiAgICAgICAgICAgIGJhc2U2NCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0eXBlRnVsbCArPSBgOyR7bWV0YVtpXX1gO1xuICAgICAgICAgICAgaWYgKG1ldGFbaV0uaW5kZXhPZignY2hhcnNldD0nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNoYXJzZXQgPSBtZXRhW2ldLnN1YnN0cmluZyg4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBkZWZhdWx0cyB0byBVUy1BU0NJSSBvbmx5IGlmIHR5cGUgaXMgbm90IHByb3ZpZGVkXG4gICAgaWYgKCFtZXRhWzBdICYmICFjaGFyc2V0Lmxlbmd0aCkge1xuICAgICAgICB0eXBlRnVsbCArPSAnO2NoYXJzZXQ9VVMtQVNDSUknO1xuICAgICAgICBjaGFyc2V0ID0gJ1VTLUFTQ0lJJztcbiAgICB9XG4gICAgLy8gZ2V0IHRoZSBlbmNvZGVkIGRhdGEgcG9ydGlvbiBhbmQgZGVjb2RlIFVSSS1lbmNvZGVkIGNoYXJzXG4gICAgY29uc3QgZW5jb2RpbmcgPSBiYXNlNjQgPyAnYmFzZTY0JyA6ICdhc2NpaSc7XG4gICAgY29uc3QgZGF0YSA9IHVuZXNjYXBlKHVyaS5zdWJzdHJpbmcoZmlyc3RDb21tYSArIDEpKTtcbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShkYXRhLCBlbmNvZGluZyk7XG4gICAgLy8gc2V0IGAudHlwZWAgYW5kIGAudHlwZUZ1bGxgIHByb3BlcnRpZXMgdG8gTUlNRSB0eXBlXG4gICAgYnVmZmVyLnR5cGUgPSB0eXBlO1xuICAgIGJ1ZmZlci50eXBlRnVsbCA9IHR5cGVGdWxsO1xuICAgIC8vIHNldCB0aGUgYC5jaGFyc2V0YCBwcm9wZXJ0eVxuICAgIGJ1ZmZlci5jaGFyc2V0ID0gY2hhcnNldDtcbiAgICByZXR1cm4gYnVmZmVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBkYXRhVXJpVG9CdWZmZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvKipcbiAqIEBhdXRob3IgVG9ydSBOYWdhc2hpbWEgPGh0dHBzOi8vZ2l0aHViLmNvbS9teXN0aWNhdGVhPlxuICogQGNvcHlyaWdodCAyMDE1IFRvcnUgTmFnYXNoaW1hLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogU2VlIExJQ0VOU0UgZmlsZSBpbiByb290IGRpcmVjdG9yeSBmb3IgZnVsbCBsaWNlbnNlLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gUHJpdmF0ZURhdGFcbiAqIEBwcm9wZXJ0eSB7RXZlbnRUYXJnZXR9IGV2ZW50VGFyZ2V0IFRoZSBldmVudCB0YXJnZXQuXG4gKiBAcHJvcGVydHkge3t0eXBlOnN0cmluZ319IGV2ZW50IFRoZSBvcmlnaW5hbCBldmVudCBvYmplY3QuXG4gKiBAcHJvcGVydHkge251bWJlcn0gZXZlbnRQaGFzZSBUaGUgY3VycmVudCBldmVudCBwaGFzZS5cbiAqIEBwcm9wZXJ0eSB7RXZlbnRUYXJnZXR8bnVsbH0gY3VycmVudFRhcmdldCBUaGUgY3VycmVudCBldmVudCB0YXJnZXQuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGNhbmNlbGVkIFRoZSBmbGFnIHRvIHByZXZlbnQgZGVmYXVsdC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc3RvcHBlZCBUaGUgZmxhZyB0byBzdG9wIHByb3BhZ2F0aW9uLlxuICogQHByb3BlcnR5IHtib29sZWFufSBpbW1lZGlhdGVTdG9wcGVkIFRoZSBmbGFnIHRvIHN0b3AgcHJvcGFnYXRpb24gaW1tZWRpYXRlbHkuXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufG51bGx9IHBhc3NpdmVMaXN0ZW5lciBUaGUgbGlzdGVuZXIgaWYgdGhlIGN1cnJlbnQgbGlzdGVuZXIgaXMgcGFzc2l2ZS4gT3RoZXJ3aXNlIHRoaXMgaXMgbnVsbC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0aW1lU3RhbXAgVGhlIHVuaXggdGltZS5cbiAqIEBwcml2YXRlXG4gKi9cblxuLyoqXG4gKiBQcml2YXRlIGRhdGEgZm9yIGV2ZW50IHdyYXBwZXJzLlxuICogQHR5cGUge1dlYWtNYXA8RXZlbnQsIFByaXZhdGVEYXRhPn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHByaXZhdGVEYXRhID0gbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBDYWNoZSBmb3Igd3JhcHBlciBjbGFzc2VzLlxuICogQHR5cGUge1dlYWtNYXA8T2JqZWN0LCBGdW5jdGlvbj59XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCB3cmFwcGVycyA9IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogR2V0IHByaXZhdGUgZGF0YS5cbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFRoZSBldmVudCBvYmplY3QgdG8gZ2V0IHByaXZhdGUgZGF0YS5cbiAqIEByZXR1cm5zIHtQcml2YXRlRGF0YX0gVGhlIHByaXZhdGUgZGF0YSBvZiB0aGUgZXZlbnQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwZChldmVudCkge1xuICAgIGNvbnN0IHJldHYgPSBwcml2YXRlRGF0YS5nZXQoZXZlbnQpO1xuICAgIGNvbnNvbGUuYXNzZXJ0KFxuICAgICAgICByZXR2ICE9IG51bGwsXG4gICAgICAgIFwiJ3RoaXMnIGlzIGV4cGVjdGVkIGFuIEV2ZW50IG9iamVjdCwgYnV0IGdvdFwiLFxuICAgICAgICBldmVudFxuICAgICk7XG4gICAgcmV0dXJuIHJldHZcbn1cblxuLyoqXG4gKiBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI3NldC10aGUtY2FuY2VsZWQtZmxhZ1xuICogQHBhcmFtIGRhdGEge1ByaXZhdGVEYXRhfSBwcml2YXRlIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIHNldENhbmNlbEZsYWcoZGF0YSkge1xuICAgIGlmIChkYXRhLnBhc3NpdmVMaXN0ZW5lciAhPSBudWxsKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICBcIlVuYWJsZSB0byBwcmV2ZW50RGVmYXVsdCBpbnNpZGUgcGFzc2l2ZSBldmVudCBsaXN0ZW5lciBpbnZvY2F0aW9uLlwiLFxuICAgICAgICAgICAgICAgIGRhdGEucGFzc2l2ZUxpc3RlbmVyXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoIWRhdGEuZXZlbnQuY2FuY2VsYWJsZSkge1xuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBkYXRhLmNhbmNlbGVkID0gdHJ1ZTtcbiAgICBpZiAodHlwZW9mIGRhdGEuZXZlbnQucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBkYXRhLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBzZWUgaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNpbnRlcmZhY2UtZXZlbnRcbiAqIEBwcml2YXRlXG4gKi9cbi8qKlxuICogVGhlIGV2ZW50IHdyYXBwZXIuXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IGV2ZW50VGFyZ2V0IFRoZSBldmVudCB0YXJnZXQgb2YgdGhpcyBkaXNwYXRjaGluZy5cbiAqIEBwYXJhbSB7RXZlbnR8e3R5cGU6c3RyaW5nfX0gZXZlbnQgVGhlIG9yaWdpbmFsIGV2ZW50IHRvIHdyYXAuXG4gKi9cbmZ1bmN0aW9uIEV2ZW50KGV2ZW50VGFyZ2V0LCBldmVudCkge1xuICAgIHByaXZhdGVEYXRhLnNldCh0aGlzLCB7XG4gICAgICAgIGV2ZW50VGFyZ2V0LFxuICAgICAgICBldmVudCxcbiAgICAgICAgZXZlbnRQaGFzZTogMixcbiAgICAgICAgY3VycmVudFRhcmdldDogZXZlbnRUYXJnZXQsXG4gICAgICAgIGNhbmNlbGVkOiBmYWxzZSxcbiAgICAgICAgc3RvcHBlZDogZmFsc2UsXG4gICAgICAgIGltbWVkaWF0ZVN0b3BwZWQ6IGZhbHNlLFxuICAgICAgICBwYXNzaXZlTGlzdGVuZXI6IG51bGwsXG4gICAgICAgIHRpbWVTdGFtcDogZXZlbnQudGltZVN0YW1wIHx8IERhdGUubm93KCksXG4gICAgfSk7XG5cbiAgICAvLyBodHRwczovL2hleWNhbS5naXRodWIuaW8vd2ViaWRsLyNVbmZvcmdlYWJsZVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImlzVHJ1c3RlZFwiLCB7IHZhbHVlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuICAgIC8vIERlZmluZSBhY2Nlc3NvcnNcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcykpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIGRlZmluZVJlZGlyZWN0RGVzY3JpcHRvcihrZXkpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gU2hvdWxkIGJlIGVudW1lcmFibGUsIGJ1dCBjbGFzcyBtZXRob2RzIGFyZSBub3QgZW51bWVyYWJsZS5cbkV2ZW50LnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBUaGUgdHlwZSBvZiB0aGlzIGV2ZW50LlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0IHR5cGUoKSB7XG4gICAgICAgIHJldHVybiBwZCh0aGlzKS5ldmVudC50eXBlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgb2YgdGhpcyBldmVudC5cbiAgICAgKiBAdHlwZSB7RXZlbnRUYXJnZXR9XG4gICAgICovXG4gICAgZ2V0IHRhcmdldCgpIHtcbiAgICAgICAgcmV0dXJuIHBkKHRoaXMpLmV2ZW50VGFyZ2V0XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgb2YgdGhpcyBldmVudC5cbiAgICAgKiBAdHlwZSB7RXZlbnRUYXJnZXR9XG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRUYXJnZXQoKSB7XG4gICAgICAgIHJldHVybiBwZCh0aGlzKS5jdXJyZW50VGFyZ2V0XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtFdmVudFRhcmdldFtdfSBUaGUgY29tcG9zZWQgcGF0aCBvZiB0aGlzIGV2ZW50LlxuICAgICAqL1xuICAgIGNvbXBvc2VkUGF0aCgpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFRhcmdldCA9IHBkKHRoaXMpLmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGlmIChjdXJyZW50VGFyZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbY3VycmVudFRhcmdldF1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ29uc3RhbnQgb2YgTk9ORS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBOT05FKCkge1xuICAgICAgICByZXR1cm4gMFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb25zdGFudCBvZiBDQVBUVVJJTkdfUEhBU0UuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgQ0FQVFVSSU5HX1BIQVNFKCkge1xuICAgICAgICByZXR1cm4gMVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb25zdGFudCBvZiBBVF9UQVJHRVQuXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgQVRfVEFSR0VUKCkge1xuICAgICAgICByZXR1cm4gMlxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb25zdGFudCBvZiBCVUJCTElOR19QSEFTRS5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCBCVUJCTElOR19QSEFTRSgpIHtcbiAgICAgICAgcmV0dXJuIDNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBvZiB0aGlzIGV2ZW50LlxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0IGV2ZW50UGhhc2UoKSB7XG4gICAgICAgIHJldHVybiBwZCh0aGlzKS5ldmVudFBoYXNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3AgZXZlbnQgYnViYmxpbmcuXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgc3RvcFByb3BhZ2F0aW9uKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gcGQodGhpcyk7XG5cbiAgICAgICAgZGF0YS5zdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmV2ZW50LnN0b3BQcm9wYWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBkYXRhLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3AgZXZlbnQgYnViYmxpbmcuXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gcGQodGhpcyk7XG5cbiAgICAgICAgZGF0YS5zdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgZGF0YS5pbW1lZGlhdGVTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBkYXRhLmV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoZSBmbGFnIHRvIGJlIGJ1YmJsaW5nLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIGdldCBidWJibGVzKCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihwZCh0aGlzKS5ldmVudC5idWJibGVzKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGUgZmxhZyB0byBiZSBjYW5jZWxhYmxlLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIGdldCBjYW5jZWxhYmxlKCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihwZCh0aGlzKS5ldmVudC5jYW5jZWxhYmxlKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDYW5jZWwgdGhpcyBldmVudC5cbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBwcmV2ZW50RGVmYXVsdCgpIHtcbiAgICAgICAgc2V0Q2FuY2VsRmxhZyhwZCh0aGlzKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoZSBmbGFnIHRvIGluZGljYXRlIGNhbmNlbGxhdGlvbiBzdGF0ZS5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBnZXQgZGVmYXVsdFByZXZlbnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHBkKHRoaXMpLmNhbmNlbGVkXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoZSBmbGFnIHRvIGJlIGNvbXBvc2VkLlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIGdldCBjb21wb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4ocGQodGhpcykuZXZlbnQuY29tcG9zZWQpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoZSB1bml4IHRpbWUgb2YgdGhpcyBldmVudC5cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldCB0aW1lU3RhbXAoKSB7XG4gICAgICAgIHJldHVybiBwZCh0aGlzKS50aW1lU3RhbXBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCBvZiB0aGlzIGV2ZW50LlxuICAgICAqIEB0eXBlIHtFdmVudFRhcmdldH1cbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIGdldCBzcmNFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gcGQodGhpcykuZXZlbnRUYXJnZXRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIGZsYWcgdG8gc3RvcCBldmVudCBidWJibGluZy5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIGdldCBjYW5jZWxCdWJibGUoKSB7XG4gICAgICAgIHJldHVybiBwZCh0aGlzKS5zdG9wcGVkXG4gICAgfSxcbiAgICBzZXQgY2FuY2VsQnViYmxlKHZhbHVlKSB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGEgPSBwZCh0aGlzKTtcblxuICAgICAgICBkYXRhLnN0b3BwZWQgPSB0cnVlO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEuZXZlbnQuY2FuY2VsQnViYmxlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgZGF0YS5ldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoZSBmbGFnIHRvIGluZGljYXRlIGNhbmNlbGxhdGlvbiBzdGF0ZS5cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIGdldCByZXR1cm5WYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuICFwZCh0aGlzKS5jYW5jZWxlZFxuICAgIH0sXG4gICAgc2V0IHJldHVyblZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHNldENhbmNlbEZsYWcocGQodGhpcykpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBldmVudCBvYmplY3QuIEJ1dCBkbyBub3RoaW5nIHVuZGVyIGV2ZW50IGRpc3BhdGNoaW5nLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFRoZSBldmVudCB0eXBlLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2J1YmJsZXM9ZmFsc2VdIFRoZSBmbGFnIHRvIGJlIHBvc3NpYmxlIHRvIGJ1YmJsZSB1cC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjYW5jZWxhYmxlPWZhbHNlXSBUaGUgZmxhZyB0byBiZSBwb3NzaWJsZSB0byBjYW5jZWwuXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICBpbml0RXZlbnQoKSB7XG4gICAgICAgIC8vIERvIG5vdGhpbmcuXG4gICAgfSxcbn07XG5cbi8vIGBjb25zdHJ1Y3RvcmAgaXMgbm90IGVudW1lcmFibGUuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnQucHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogRXZlbnQsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxufSk7XG5cbi8vIEVuc3VyZSBgZXZlbnQgaW5zdGFuY2VvZiB3aW5kb3cuRXZlbnRgIGlzIGB0cnVlYC5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuRXZlbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoRXZlbnQucHJvdG90eXBlLCB3aW5kb3cuRXZlbnQucHJvdG90eXBlKTtcblxuICAgIC8vIE1ha2UgYXNzb2NpYXRpb24gZm9yIHdyYXBwZXJzLlxuICAgIHdyYXBwZXJzLnNldCh3aW5kb3cuRXZlbnQucHJvdG90eXBlLCBFdmVudCk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHRvIHJlZGlyZWN0IGEgZ2l2ZW4gcHJvcGVydHkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFByb3BlcnR5IG5hbWUgdG8gZGVmaW5lIHByb3BlcnR5IGRlc2NyaXB0b3IuXG4gKiBAcmV0dXJucyB7UHJvcGVydHlEZXNjcmlwdG9yfSBUaGUgcHJvcGVydHkgZGVzY3JpcHRvciB0byByZWRpcmVjdCB0aGUgcHJvcGVydHkuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkZWZpbmVSZWRpcmVjdERlc2NyaXB0b3Ioa2V5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHBkKHRoaXMpLmV2ZW50W2tleV1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICBwZCh0aGlzKS5ldmVudFtrZXldID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB9XG59XG5cbi8qKlxuICogR2V0IHRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHRvIGNhbGwgYSBnaXZlbiBtZXRob2QgcHJvcGVydHkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFByb3BlcnR5IG5hbWUgdG8gZGVmaW5lIHByb3BlcnR5IGRlc2NyaXB0b3IuXG4gKiBAcmV0dXJucyB7UHJvcGVydHlEZXNjcmlwdG9yfSBUaGUgcHJvcGVydHkgZGVzY3JpcHRvciB0byBjYWxsIHRoZSBtZXRob2QgcHJvcGVydHkuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkZWZpbmVDYWxsRGVzY3JpcHRvcihrZXkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gcGQodGhpcykuZXZlbnQ7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnRba2V5XS5hcHBseShldmVudCwgYXJndW1lbnRzKVxuICAgICAgICB9LFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgfVxufVxuXG4vKipcbiAqIERlZmluZSBuZXcgd3JhcHBlciBjbGFzcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IEJhc2VFdmVudCBUaGUgYmFzZSB3cmFwcGVyIGNsYXNzLlxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvIFRoZSBwcm90b3R5cGUgb2YgdGhlIG9yaWdpbmFsIGV2ZW50LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBUaGUgZGVmaW5lZCB3cmFwcGVyIGNsYXNzLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVmaW5lV3JhcHBlcihCYXNlRXZlbnQsIHByb3RvKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHByb3RvKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIEJhc2VFdmVudFxuICAgIH1cblxuICAgIC8qKiBDdXN0b21FdmVudCAqL1xuICAgIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50VGFyZ2V0LCBldmVudCkge1xuICAgICAgICBCYXNlRXZlbnQuY2FsbCh0aGlzLCBldmVudFRhcmdldCwgZXZlbnQpO1xuICAgIH1cblxuICAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQmFzZUV2ZW50LnByb3RvdHlwZSwge1xuICAgICAgICBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogQ3VzdG9tRXZlbnQsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSxcbiAgICB9KTtcblxuICAgIC8vIERlZmluZSBhY2Nlc3NvcnMuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICAgIGlmICghKGtleSBpbiBCYXNlRXZlbnQucHJvdG90eXBlKSkge1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIGtleSk7XG4gICAgICAgICAgICBjb25zdCBpc0Z1bmMgPSB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSA9PT0gXCJmdW5jdGlvblwiO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAgICAgICAgICAgICAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSxcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgaXNGdW5jXG4gICAgICAgICAgICAgICAgICAgID8gZGVmaW5lQ2FsbERlc2NyaXB0b3Ioa2V5KVxuICAgICAgICAgICAgICAgICAgICA6IGRlZmluZVJlZGlyZWN0RGVzY3JpcHRvcihrZXkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIEN1c3RvbUV2ZW50XG59XG5cbi8qKlxuICogR2V0IHRoZSB3cmFwcGVyIGNsYXNzIG9mIGEgZ2l2ZW4gcHJvdG90eXBlLlxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvIFRoZSBwcm90b3R5cGUgb2YgdGhlIG9yaWdpbmFsIGV2ZW50IHRvIGdldCBpdHMgd3JhcHBlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIHdyYXBwZXIgY2xhc3MuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRXcmFwcGVyKHByb3RvKSB7XG4gICAgaWYgKHByb3RvID09IG51bGwgfHwgcHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgICAgcmV0dXJuIEV2ZW50XG4gICAgfVxuXG4gICAgbGV0IHdyYXBwZXIgPSB3cmFwcGVycy5nZXQocHJvdG8pO1xuICAgIGlmICh3cmFwcGVyID09IG51bGwpIHtcbiAgICAgICAgd3JhcHBlciA9IGRlZmluZVdyYXBwZXIoZ2V0V3JhcHBlcihPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pKSwgcHJvdG8pO1xuICAgICAgICB3cmFwcGVycy5zZXQocHJvdG8sIHdyYXBwZXIpO1xuICAgIH1cbiAgICByZXR1cm4gd3JhcHBlclxufVxuXG4vKipcbiAqIFdyYXAgYSBnaXZlbiBldmVudCB0byBtYW5hZ2VtZW50IGEgZGlzcGF0Y2hpbmcuXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSBldmVudFRhcmdldCBUaGUgZXZlbnQgdGFyZ2V0IG9mIHRoaXMgZGlzcGF0Y2hpbmcuXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgVGhlIGV2ZW50IHRvIHdyYXAuXG4gKiBAcmV0dXJucyB7RXZlbnR9IFRoZSB3cmFwcGVyIGluc3RhbmNlLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gd3JhcEV2ZW50KGV2ZW50VGFyZ2V0LCBldmVudCkge1xuICAgIGNvbnN0IFdyYXBwZXIgPSBnZXRXcmFwcGVyKE9iamVjdC5nZXRQcm90b3R5cGVPZihldmVudCkpO1xuICAgIHJldHVybiBuZXcgV3JhcHBlcihldmVudFRhcmdldCwgZXZlbnQpXG59XG5cbi8qKlxuICogR2V0IHRoZSBpbW1lZGlhdGVTdG9wcGVkIGZsYWcgb2YgYSBnaXZlbiBldmVudC5cbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IFRoZSBldmVudCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVGhlIGZsYWcgdG8gc3RvcCBwcm9wYWdhdGlvbiBpbW1lZGlhdGVseS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzU3RvcHBlZChldmVudCkge1xuICAgIHJldHVybiBwZChldmVudCkuaW1tZWRpYXRlU3RvcHBlZFxufVxuXG4vKipcbiAqIFNldCB0aGUgY3VycmVudCBldmVudCBwaGFzZSBvZiBhIGdpdmVuIGV2ZW50LlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGV2ZW50IHRvIHNldCBjdXJyZW50IHRhcmdldC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBldmVudFBoYXNlIE5ldyBldmVudCBwaGFzZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2V0RXZlbnRQaGFzZShldmVudCwgZXZlbnRQaGFzZSkge1xuICAgIHBkKGV2ZW50KS5ldmVudFBoYXNlID0gZXZlbnRQaGFzZTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGN1cnJlbnQgdGFyZ2V0IG9mIGEgZ2l2ZW4gZXZlbnQuXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBUaGUgZXZlbnQgdG8gc2V0IGN1cnJlbnQgdGFyZ2V0LlxuICogQHBhcmFtIHtFdmVudFRhcmdldHxudWxsfSBjdXJyZW50VGFyZ2V0IE5ldyBjdXJyZW50IHRhcmdldC5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2V0Q3VycmVudFRhcmdldChldmVudCwgY3VycmVudFRhcmdldCkge1xuICAgIHBkKGV2ZW50KS5jdXJyZW50VGFyZ2V0ID0gY3VycmVudFRhcmdldDtcbn1cblxuLyoqXG4gKiBTZXQgYSBwYXNzaXZlIGxpc3RlbmVyIG9mIGEgZ2l2ZW4gZXZlbnQuXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBUaGUgZXZlbnQgdG8gc2V0IGN1cnJlbnQgdGFyZ2V0LlxuICogQHBhcmFtIHtGdW5jdGlvbnxudWxsfSBwYXNzaXZlTGlzdGVuZXIgTmV3IHBhc3NpdmUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNldFBhc3NpdmVMaXN0ZW5lcihldmVudCwgcGFzc2l2ZUxpc3RlbmVyKSB7XG4gICAgcGQoZXZlbnQpLnBhc3NpdmVMaXN0ZW5lciA9IHBhc3NpdmVMaXN0ZW5lcjtcbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBMaXN0ZW5lck5vZGVcbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGxpc3RlbmVyXG4gKiBAcHJvcGVydHkgezF8MnwzfSBsaXN0ZW5lclR5cGVcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcGFzc2l2ZVxuICogQHByb3BlcnR5IHtib29sZWFufSBvbmNlXG4gKiBAcHJvcGVydHkge0xpc3RlbmVyTm9kZXxudWxsfSBuZXh0XG4gKiBAcHJpdmF0ZVxuICovXG5cbi8qKlxuICogQHR5cGUge1dlYWtNYXA8b2JqZWN0LCBNYXA8c3RyaW5nLCBMaXN0ZW5lck5vZGU+Pn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGxpc3RlbmVyc01hcCA9IG5ldyBXZWFrTWFwKCk7XG5cbi8vIExpc3RlbmVyIHR5cGVzXG5jb25zdCBDQVBUVVJFID0gMTtcbmNvbnN0IEJVQkJMRSA9IDI7XG5jb25zdCBBVFRSSUJVVEUgPSAzO1xuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYSBnaXZlbiB2YWx1ZSBpcyBhbiBvYmplY3Qgb3Igbm90LlxuICogQHBhcmFtIHthbnl9IHggVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuIHggIT09IG51bGwgJiYgdHlwZW9mIHggPT09IFwib2JqZWN0XCIgLy9lc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG59XG5cbi8qKlxuICogR2V0IGxpc3RlbmVycy5cbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IGV2ZW50VGFyZ2V0IFRoZSBldmVudCB0YXJnZXQgdG8gZ2V0LlxuICogQHJldHVybnMge01hcDxzdHJpbmcsIExpc3RlbmVyTm9kZT59IFRoZSBsaXN0ZW5lcnMuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRMaXN0ZW5lcnMoZXZlbnRUYXJnZXQpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNNYXAuZ2V0KGV2ZW50VGFyZ2V0KTtcbiAgICBpZiAobGlzdGVuZXJzID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgIFwiJ3RoaXMnIGlzIGV4cGVjdGVkIGFuIEV2ZW50VGFyZ2V0IG9iamVjdCwgYnV0IGdvdCBhbm90aGVyIHZhbHVlLlwiXG4gICAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGxpc3RlbmVyc1xufVxuXG4vKipcbiAqIEdldCB0aGUgcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgdGhlIGV2ZW50IGF0dHJpYnV0ZSBvZiBhIGdpdmVuIGV2ZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBUaGUgZXZlbnQgbmFtZSB0byBnZXQgcHJvcGVydHkgZGVzY3JpcHRvci5cbiAqIEByZXR1cm5zIHtQcm9wZXJ0eURlc2NyaXB0b3J9IFRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVmaW5lRXZlbnRBdHRyaWJ1dGVEZXNjcmlwdG9yKGV2ZW50TmFtZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IGdldExpc3RlbmVycyh0aGlzKTtcbiAgICAgICAgICAgIGxldCBub2RlID0gbGlzdGVuZXJzLmdldChldmVudE5hbWUpO1xuICAgICAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmxpc3RlbmVyVHlwZSA9PT0gQVRUUklCVVRFKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLmxpc3RlbmVyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIHNldChsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiICYmICFpc09iamVjdChsaXN0ZW5lcikpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IGdldExpc3RlbmVycyh0aGlzKTtcblxuICAgICAgICAgICAgLy8gVHJhdmVyc2UgdG8gdGhlIHRhaWwgd2hpbGUgcmVtb3Zpbmcgb2xkIHZhbHVlLlxuICAgICAgICAgICAgbGV0IHByZXYgPSBudWxsO1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBsaXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubGlzdGVuZXJUeXBlID09PSBBVFRSSUJVVEUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIG9sZCB2YWx1ZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXYgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXYubmV4dCA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zZXQoZXZlbnROYW1lLCBub2RlLm5leHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLmRlbGV0ZShldmVudE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldiA9IG5vZGU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQWRkIG5ldyB2YWx1ZS5cbiAgICAgICAgICAgIGlmIChsaXN0ZW5lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld05vZGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lclR5cGU6IEFUVFJJQlVURSxcbiAgICAgICAgICAgICAgICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG9uY2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBudWxsLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKHByZXYgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNldChldmVudE5hbWUsIG5ld05vZGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXYubmV4dCA9IG5ld05vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgfVxufVxuXG4vKipcbiAqIERlZmluZSBhbiBldmVudCBhdHRyaWJ1dGUgKGUuZy4gYGV2ZW50VGFyZ2V0Lm9uY2xpY2tgKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFRhcmdldFByb3RvdHlwZSBUaGUgZXZlbnQgdGFyZ2V0IHByb3RvdHlwZSB0byBkZWZpbmUgYW4gZXZlbnQgYXR0cmJpdGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIFRoZSBldmVudCBuYW1lIHRvIGRlZmluZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBkZWZpbmVFdmVudEF0dHJpYnV0ZShldmVudFRhcmdldFByb3RvdHlwZSwgZXZlbnROYW1lKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAgICAgICBldmVudFRhcmdldFByb3RvdHlwZSxcbiAgICAgICAgYG9uJHtldmVudE5hbWV9YCxcbiAgICAgICAgZGVmaW5lRXZlbnRBdHRyaWJ1dGVEZXNjcmlwdG9yKGV2ZW50TmFtZSlcbiAgICApO1xufVxuXG4vKipcbiAqIERlZmluZSBhIGN1c3RvbSBFdmVudFRhcmdldCB3aXRoIGV2ZW50IGF0dHJpYnV0ZXMuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBldmVudE5hbWVzIEV2ZW50IG5hbWVzIGZvciBldmVudCBhdHRyaWJ1dGVzLlxuICogQHJldHVybnMge0V2ZW50VGFyZ2V0fSBUaGUgY3VzdG9tIEV2ZW50VGFyZ2V0LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVmaW5lQ3VzdG9tRXZlbnRUYXJnZXQoZXZlbnROYW1lcykge1xuICAgIC8qKiBDdXN0b21FdmVudFRhcmdldCAqL1xuICAgIGZ1bmN0aW9uIEN1c3RvbUV2ZW50VGFyZ2V0KCkge1xuICAgICAgICBFdmVudFRhcmdldC5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIEN1c3RvbUV2ZW50VGFyZ2V0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnRUYXJnZXQucHJvdG90eXBlLCB7XG4gICAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgICAgICB2YWx1ZTogQ3VzdG9tRXZlbnRUYXJnZXQsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnROYW1lcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBkZWZpbmVFdmVudEF0dHJpYnV0ZShDdXN0b21FdmVudFRhcmdldC5wcm90b3R5cGUsIGV2ZW50TmFtZXNbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiBDdXN0b21FdmVudFRhcmdldFxufVxuXG4vKipcbiAqIEV2ZW50VGFyZ2V0LlxuICpcbiAqIC0gVGhpcyBpcyBjb25zdHJ1Y3RvciBpZiBubyBhcmd1bWVudHMuXG4gKiAtIFRoaXMgaXMgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGEgQ3VzdG9tRXZlbnRUYXJnZXQgY29uc3RydWN0b3IgaWYgdGhlcmUgYXJlIGFyZ3VtZW50cy5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgY2xhc3MgQSBleHRlbmRzIEV2ZW50VGFyZ2V0IHt9XG4gKiAgICAgY2xhc3MgQiBleHRlbmRzIEV2ZW50VGFyZ2V0KFwibWVzc2FnZVwiKSB7fVxuICogICAgIGNsYXNzIEMgZXh0ZW5kcyBFdmVudFRhcmdldChcIm1lc3NhZ2VcIiwgXCJlcnJvclwiKSB7fVxuICogICAgIGNsYXNzIEQgZXh0ZW5kcyBFdmVudFRhcmdldChbXCJtZXNzYWdlXCIsIFwiZXJyb3JcIl0pIHt9XG4gKi9cbmZ1bmN0aW9uIEV2ZW50VGFyZ2V0KCkge1xuICAgIC8qZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEV2ZW50VGFyZ2V0KSB7XG4gICAgICAgIGxpc3RlbmVyc01hcC5zZXQodGhpcywgbmV3IE1hcCgpKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkoYXJndW1lbnRzWzBdKSkge1xuICAgICAgICByZXR1cm4gZGVmaW5lQ3VzdG9tRXZlbnRUYXJnZXQoYXJndW1lbnRzWzBdKVxuICAgIH1cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdHlwZXMgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB0eXBlc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmaW5lQ3VzdG9tRXZlbnRUYXJnZXQodHlwZXMpXG4gICAgfVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIilcbiAgICAvKmVzbGludC1lbmFibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbn1cblxuLy8gU2hvdWxkIGJlIGVudW1lcmFibGUsIGJ1dCBjbGFzcyBtZXRob2RzIGFyZSBub3QgZW51bWVyYWJsZS5cbkV2ZW50VGFyZ2V0LnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBBZGQgYSBnaXZlbiBsaXN0ZW5lciB0byB0aGlzIGV2ZW50IHRhcmdldC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIFRoZSBldmVudCBuYW1lIHRvIGFkZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgdG8gYWRkLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbnx7Y2FwdHVyZT86Ym9vbGVhbixwYXNzaXZlPzpib29sZWFuLG9uY2U/OmJvb2xlYW59fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgZm9yIHRoaXMgbGlzdGVuZXIuXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChsaXN0ZW5lciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIgJiYgIWlzT2JqZWN0KGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidsaXN0ZW5lcicgc2hvdWxkIGJlIGEgZnVuY3Rpb24gb3IgYW4gb2JqZWN0LlwiKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gZ2V0TGlzdGVuZXJzKHRoaXMpO1xuICAgICAgICBjb25zdCBvcHRpb25zSXNPYmogPSBpc09iamVjdChvcHRpb25zKTtcbiAgICAgICAgY29uc3QgY2FwdHVyZSA9IG9wdGlvbnNJc09ialxuICAgICAgICAgICAgPyBCb29sZWFuKG9wdGlvbnMuY2FwdHVyZSlcbiAgICAgICAgICAgIDogQm9vbGVhbihvcHRpb25zKTtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJUeXBlID0gY2FwdHVyZSA/IENBUFRVUkUgOiBCVUJCTEU7XG4gICAgICAgIGNvbnN0IG5ld05vZGUgPSB7XG4gICAgICAgICAgICBsaXN0ZW5lcixcbiAgICAgICAgICAgIGxpc3RlbmVyVHlwZSxcbiAgICAgICAgICAgIHBhc3NpdmU6IG9wdGlvbnNJc09iaiAmJiBCb29sZWFuKG9wdGlvbnMucGFzc2l2ZSksXG4gICAgICAgICAgICBvbmNlOiBvcHRpb25zSXNPYmogJiYgQm9vbGVhbihvcHRpb25zLm9uY2UpLFxuICAgICAgICAgICAgbmV4dDogbnVsbCxcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBTZXQgaXQgYXMgdGhlIGZpcnN0IG5vZGUgaWYgdGhlIGZpcnN0IG5vZGUgaXMgbnVsbC5cbiAgICAgICAgbGV0IG5vZGUgPSBsaXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk7XG4gICAgICAgIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy5zZXQoZXZlbnROYW1lLCBuZXdOb2RlKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVHJhdmVyc2UgdG8gdGhlIHRhaWwgd2hpbGUgY2hlY2tpbmcgZHVwbGljYXRpb24uLlxuICAgICAgICBsZXQgcHJldiA9IG51bGw7XG4gICAgICAgIHdoaWxlIChub2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBub2RlLmxpc3RlbmVyID09PSBsaXN0ZW5lciAmJlxuICAgICAgICAgICAgICAgIG5vZGUubGlzdGVuZXJUeXBlID09PSBsaXN0ZW5lclR5cGVcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIFNob3VsZCBpZ25vcmUgZHVwbGljYXRpb24uXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2ID0gbm9kZTtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgaXQuXG4gICAgICAgIHByZXYubmV4dCA9IG5ld05vZGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIGdpdmVuIGxpc3RlbmVyIGZyb20gdGhpcyBldmVudCB0YXJnZXQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBUaGUgZXZlbnQgbmFtZSB0byByZW1vdmUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIHRvIHJlbW92ZS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW58e2NhcHR1cmU/OmJvb2xlYW4scGFzc2l2ZT86Ym9vbGVhbixvbmNlPzpib29sZWFufX0gW29wdGlvbnNdIFRoZSBvcHRpb25zIGZvciB0aGlzIGxpc3RlbmVyLlxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuICAgICAgICBpZiAobGlzdGVuZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSBnZXRMaXN0ZW5lcnModGhpcyk7XG4gICAgICAgIGNvbnN0IGNhcHR1cmUgPSBpc09iamVjdChvcHRpb25zKVxuICAgICAgICAgICAgPyBCb29sZWFuKG9wdGlvbnMuY2FwdHVyZSlcbiAgICAgICAgICAgIDogQm9vbGVhbihvcHRpb25zKTtcbiAgICAgICAgY29uc3QgbGlzdGVuZXJUeXBlID0gY2FwdHVyZSA/IENBUFRVUkUgOiBCVUJCTEU7XG5cbiAgICAgICAgbGV0IHByZXYgPSBudWxsO1xuICAgICAgICBsZXQgbm9kZSA9IGxpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcbiAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIG5vZGUubGlzdGVuZXIgPT09IGxpc3RlbmVyICYmXG4gICAgICAgICAgICAgICAgbm9kZS5saXN0ZW5lclR5cGUgPT09IGxpc3RlbmVyVHlwZVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXYgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldi5uZXh0ID0gbm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zZXQoZXZlbnROYW1lLCBub2RlLm5leHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5kZWxldGUoZXZlbnROYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByZXYgPSBub2RlO1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNwYXRjaCBhIGdpdmVuIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7RXZlbnR8e3R5cGU6c3RyaW5nfX0gZXZlbnQgVGhlIGV2ZW50IHRvIGRpc3BhdGNoLlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBgZmFsc2VgIGlmIGNhbmNlbGVkLlxuICAgICAqL1xuICAgIGRpc3BhdGNoRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50ID09IG51bGwgfHwgdHlwZW9mIGV2ZW50LnR5cGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZXZlbnQudHlwZVwiIHNob3VsZCBiZSBhIHN0cmluZy4nKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbGlzdGVuZXJzIGFyZW4ndCByZWdpc3RlcmVkLCB0ZXJtaW5hdGUuXG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IGdldExpc3RlbmVycyh0aGlzKTtcbiAgICAgICAgY29uc3QgZXZlbnROYW1lID0gZXZlbnQudHlwZTtcbiAgICAgICAgbGV0IG5vZGUgPSBsaXN0ZW5lcnMuZ2V0KGV2ZW50TmFtZSk7XG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBTaW5jZSB3ZSBjYW5ub3QgcmV3cml0ZSBzZXZlcmFsIHByb3BlcnRpZXMsIHNvIHdyYXAgb2JqZWN0LlxuICAgICAgICBjb25zdCB3cmFwcGVkRXZlbnQgPSB3cmFwRXZlbnQodGhpcywgZXZlbnQpO1xuXG4gICAgICAgIC8vIFRoaXMgZG9lc24ndCBwcm9jZXNzIGNhcHR1cmluZyBwaGFzZSBhbmQgYnViYmxpbmcgcGhhc2UuXG4gICAgICAgIC8vIFRoaXMgaXNuJ3QgcGFydGljaXBhdGluZyBpbiBhIHRyZWUuXG4gICAgICAgIGxldCBwcmV2ID0gbnVsbDtcbiAgICAgICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoaXMgbGlzdGVuZXIgaWYgaXQncyBvbmNlXG4gICAgICAgICAgICBpZiAobm9kZS5vbmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXYgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldi5uZXh0ID0gbm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zZXQoZXZlbnROYW1lLCBub2RlLm5leHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5kZWxldGUoZXZlbnROYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByZXYgPSBub2RlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDYWxsIHRoaXMgbGlzdGVuZXJcbiAgICAgICAgICAgIHNldFBhc3NpdmVMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICB3cmFwcGVkRXZlbnQsXG4gICAgICAgICAgICAgICAgbm9kZS5wYXNzaXZlID8gbm9kZS5saXN0ZW5lciA6IG51bGxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG5vZGUubGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUubGlzdGVuZXIuY2FsbCh0aGlzLCB3cmFwcGVkRXZlbnQpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbm9kZS5saXN0ZW5lclR5cGUgIT09IEFUVFJJQlVURSAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBub2RlLmxpc3RlbmVyLmhhbmRsZUV2ZW50ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5vZGUubGlzdGVuZXIuaGFuZGxlRXZlbnQod3JhcHBlZEV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQnJlYWsgaWYgYGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbmAgd2FzIGNhbGxlZC5cbiAgICAgICAgICAgIGlmIChpc1N0b3BwZWQod3JhcHBlZEV2ZW50KSkge1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0UGFzc2l2ZUxpc3RlbmVyKHdyYXBwZWRFdmVudCwgbnVsbCk7XG4gICAgICAgIHNldEV2ZW50UGhhc2Uod3JhcHBlZEV2ZW50LCAwKTtcbiAgICAgICAgc2V0Q3VycmVudFRhcmdldCh3cmFwcGVkRXZlbnQsIG51bGwpO1xuXG4gICAgICAgIHJldHVybiAhd3JhcHBlZEV2ZW50LmRlZmF1bHRQcmV2ZW50ZWRcbiAgICB9LFxufTtcblxuLy8gYGNvbnN0cnVjdG9yYCBpcyBub3QgZW51bWVyYWJsZS5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudFRhcmdldC5wcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBFdmVudFRhcmdldCxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgd3JpdGFibGU6IHRydWUsXG59KTtcblxuLy8gRW5zdXJlIGBldmVudFRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5FdmVudFRhcmdldGAgaXMgYHRydWVgLlxuaWYgKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICB0eXBlb2Ygd2luZG93LkV2ZW50VGFyZ2V0ICE9PSBcInVuZGVmaW5lZFwiXG4pIHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoRXZlbnRUYXJnZXQucHJvdG90eXBlLCB3aW5kb3cuRXZlbnRUYXJnZXQucHJvdG90eXBlKTtcbn1cblxuZXhwb3J0cy5kZWZpbmVFdmVudEF0dHJpYnV0ZSA9IGRlZmluZUV2ZW50QXR0cmlidXRlO1xuZXhwb3J0cy5FdmVudFRhcmdldCA9IEV2ZW50VGFyZ2V0O1xuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRUYXJnZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRUYXJnZXRcbm1vZHVsZS5leHBvcnRzLkV2ZW50VGFyZ2V0ID0gbW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gRXZlbnRUYXJnZXRcbm1vZHVsZS5leHBvcnRzLmRlZmluZUV2ZW50QXR0cmlidXRlID0gZGVmaW5lRXZlbnRBdHRyaWJ1dGVcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50LXRhcmdldC1zaGltLmpzLm1hcFxuIiwiY29uc3Qge1JlYWRhYmxlfSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuXG4vKipcbiAqIEB0eXBlIHtXZWFrTWFwPEJsb2IsIHt0eXBlOiBzdHJpbmcsIHNpemU6IG51bWJlciwgcGFydHM6IChCbG9iIHwgQnVmZmVyKVtdIH0+fVxuICovXG5jb25zdCB3bSA9IG5ldyBXZWFrTWFwKCk7XG5cbmFzeW5jIGZ1bmN0aW9uICogcmVhZChwYXJ0cykge1xuXHRmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpIHtcblx0XHRpZiAoJ3N0cmVhbScgaW4gcGFydCkge1xuXHRcdFx0eWllbGQgKiBwYXJ0LnN0cmVhbSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR5aWVsZCBwYXJ0O1xuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBCbG9iIHtcblx0LyoqXG5cdCAqIFRoZSBCbG9iKCkgY29uc3RydWN0b3IgcmV0dXJucyBhIG5ldyBCbG9iIG9iamVjdC4gVGhlIGNvbnRlbnRcblx0ICogb2YgdGhlIGJsb2IgY29uc2lzdHMgb2YgdGhlIGNvbmNhdGVuYXRpb24gb2YgdGhlIHZhbHVlcyBnaXZlblxuXHQgKiBpbiB0aGUgcGFyYW1ldGVyIGFycmF5LlxuXHQgKlxuXHQgKiBAcGFyYW0geyhBcnJheUJ1ZmZlckxpa2UgfCBBcnJheUJ1ZmZlclZpZXcgfCBCbG9iIHwgQnVmZmVyIHwgc3RyaW5nKVtdfSBibG9iUGFydHNcblx0ICogQHBhcmFtIHt7IHR5cGU/OiBzdHJpbmcgfX0gW29wdGlvbnNdXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihibG9iUGFydHMgPSBbXSwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0bGV0IHNpemUgPSAwO1xuXG5cdFx0Y29uc3QgcGFydHMgPSBibG9iUGFydHMubWFwKGVsZW1lbnQgPT4ge1xuXHRcdFx0bGV0IGJ1ZmZlcjtcblx0XHRcdGlmIChlbGVtZW50IGluc3RhbmNlb2YgQnVmZmVyKSB7XG5cdFx0XHRcdGJ1ZmZlciA9IGVsZW1lbnQ7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhlbGVtZW50KSkge1xuXHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbShlbGVtZW50LmJ1ZmZlciwgZWxlbWVudC5ieXRlT2Zmc2V0LCBlbGVtZW50LmJ5dGVMZW5ndGgpO1xuXHRcdFx0fSBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcblx0XHRcdFx0YnVmZmVyID0gQnVmZmVyLmZyb20oZWxlbWVudCk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCbG9iKSB7XG5cdFx0XHRcdGJ1ZmZlciA9IGVsZW1lbnQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbSh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgPyBlbGVtZW50IDogU3RyaW5nKGVsZW1lbnQpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vZXhwbGljaXQtbGVuZ3RoLWNoZWNrXG5cdFx0XHRzaXplICs9IGJ1ZmZlci5sZW5ndGggfHwgYnVmZmVyLnNpemUgfHwgMDtcblx0XHRcdHJldHVybiBidWZmZXI7XG5cdFx0fSk7XG5cblx0XHRjb25zdCB0eXBlID0gb3B0aW9ucy50eXBlID09PSB1bmRlZmluZWQgPyAnJyA6IFN0cmluZyhvcHRpb25zLnR5cGUpLnRvTG93ZXJDYXNlKCk7XG5cblx0XHR3bS5zZXQodGhpcywge1xuXHRcdFx0dHlwZTogL1teXFx1MDAyMC1cXHUwMDdFXS8udGVzdCh0eXBlKSA/ICcnIDogdHlwZSxcblx0XHRcdHNpemUsXG5cdFx0XHRwYXJ0c1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBCbG9iIGludGVyZmFjZSdzIHNpemUgcHJvcGVydHkgcmV0dXJucyB0aGVcblx0ICogc2l6ZSBvZiB0aGUgQmxvYiBpbiBieXRlcy5cblx0ICovXG5cdGdldCBzaXplKCkge1xuXHRcdHJldHVybiB3bS5nZXQodGhpcykuc2l6ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgdHlwZSBwcm9wZXJ0eSBvZiBhIEJsb2Igb2JqZWN0IHJldHVybnMgdGhlIE1JTUUgdHlwZSBvZiB0aGUgZmlsZS5cblx0ICovXG5cdGdldCB0eXBlKCkge1xuXHRcdHJldHVybiB3bS5nZXQodGhpcykudHlwZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgdGV4dCgpIG1ldGhvZCBpbiB0aGUgQmxvYiBpbnRlcmZhY2UgcmV0dXJucyBhIFByb21pc2Vcblx0ICogdGhhdCByZXNvbHZlcyB3aXRoIGEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGNvbnRlbnRzIG9mXG5cdCAqIHRoZSBibG9iLCBpbnRlcnByZXRlZCBhcyBVVEYtOC5cblx0ICpcblx0ICogQHJldHVybiB7UHJvbWlzZTxzdHJpbmc+fVxuXHQgKi9cblx0YXN5bmMgdGV4dCgpIHtcblx0XHRyZXR1cm4gQnVmZmVyLmZyb20oYXdhaXQgdGhpcy5hcnJheUJ1ZmZlcigpKS50b1N0cmluZygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBhcnJheUJ1ZmZlcigpIG1ldGhvZCBpbiB0aGUgQmxvYiBpbnRlcmZhY2UgcmV0dXJucyBhXG5cdCAqIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBjb250ZW50cyBvZiB0aGUgYmxvYiBhc1xuXHQgKiBiaW5hcnkgZGF0YSBjb250YWluZWQgaW4gYW4gQXJyYXlCdWZmZXIuXG5cdCAqXG5cdCAqIEByZXR1cm4ge1Byb21pc2U8QXJyYXlCdWZmZXI+fVxuXHQgKi9cblx0YXN5bmMgYXJyYXlCdWZmZXIoKSB7XG5cdFx0Y29uc3QgZGF0YSA9IG5ldyBVaW50OEFycmF5KHRoaXMuc2l6ZSk7XG5cdFx0bGV0IG9mZnNldCA9IDA7XG5cdFx0Zm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiB0aGlzLnN0cmVhbSgpKSB7XG5cdFx0XHRkYXRhLnNldChjaHVuaywgb2Zmc2V0KTtcblx0XHRcdG9mZnNldCArPSBjaHVuay5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRhdGEuYnVmZmVyO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBCbG9iIGludGVyZmFjZSdzIHN0cmVhbSgpIG1ldGhvZCBpcyBkaWZmZXJlbmNlIGZyb20gbmF0aXZlXG5cdCAqIGFuZCB1c2VzIG5vZGUgc3RyZWFtcyBpbnN0ZWFkIG9mIHdoYXR3ZyBzdHJlYW1zLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UmVhZGFibGV9IE5vZGUgcmVhZGFibGUgc3RyZWFtXG5cdCAqL1xuXHRzdHJlYW0oKSB7XG5cdFx0cmV0dXJuIFJlYWRhYmxlLmZyb20ocmVhZCh3bS5nZXQodGhpcykucGFydHMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgQmxvYiBpbnRlcmZhY2UncyBzbGljZSgpIG1ldGhvZCBjcmVhdGVzIGFuZCByZXR1cm5zIGFcblx0ICogbmV3IEJsb2Igb2JqZWN0IHdoaWNoIGNvbnRhaW5zIGRhdGEgZnJvbSBhIHN1YnNldCBvZiB0aGVcblx0ICogYmxvYiBvbiB3aGljaCBpdCdzIGNhbGxlZC5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydF1cblx0ICogQHBhcmFtIHtudW1iZXJ9IFtlbmRdXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV1cblx0ICovXG5cdHNsaWNlKHN0YXJ0ID0gMCwgZW5kID0gdGhpcy5zaXplLCB0eXBlID0gJycpIHtcblx0XHRjb25zdCB7c2l6ZX0gPSB0aGlzO1xuXG5cdFx0bGV0IHJlbGF0aXZlU3RhcnQgPSBzdGFydCA8IDAgPyBNYXRoLm1heChzaXplICsgc3RhcnQsIDApIDogTWF0aC5taW4oc3RhcnQsIHNpemUpO1xuXHRcdGxldCByZWxhdGl2ZUVuZCA9IGVuZCA8IDAgPyBNYXRoLm1heChzaXplICsgZW5kLCAwKSA6IE1hdGgubWluKGVuZCwgc2l6ZSk7XG5cblx0XHRjb25zdCBzcGFuID0gTWF0aC5tYXgocmVsYXRpdmVFbmQgLSByZWxhdGl2ZVN0YXJ0LCAwKTtcblx0XHRjb25zdCBwYXJ0cyA9IHdtLmdldCh0aGlzKS5wYXJ0cy52YWx1ZXMoKTtcblx0XHRjb25zdCBibG9iUGFydHMgPSBbXTtcblx0XHRsZXQgYWRkZWQgPSAwO1xuXG5cdFx0Zm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XG5cdFx0XHRjb25zdCBzaXplID0gQXJyYXlCdWZmZXIuaXNWaWV3KHBhcnQpID8gcGFydC5ieXRlTGVuZ3RoIDogcGFydC5zaXplO1xuXHRcdFx0aWYgKHJlbGF0aXZlU3RhcnQgJiYgc2l6ZSA8PSByZWxhdGl2ZVN0YXJ0KSB7XG5cdFx0XHRcdC8vIFNraXAgdGhlIGJlZ2lubmluZyBhbmQgY2hhbmdlIHRoZSByZWxhdGl2ZVxuXHRcdFx0XHQvLyBzdGFydCAmIGVuZCBwb3NpdGlvbiBhcyB3ZSBza2lwIHRoZSB1bndhbnRlZCBwYXJ0c1xuXHRcdFx0XHRyZWxhdGl2ZVN0YXJ0IC09IHNpemU7XG5cdFx0XHRcdHJlbGF0aXZlRW5kIC09IHNpemU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBjaHVuayA9IHBhcnQuc2xpY2UocmVsYXRpdmVTdGFydCwgTWF0aC5taW4oc2l6ZSwgcmVsYXRpdmVFbmQpKTtcblx0XHRcdFx0YmxvYlBhcnRzLnB1c2goY2h1bmspO1xuXHRcdFx0XHRhZGRlZCArPSBBcnJheUJ1ZmZlci5pc1ZpZXcoY2h1bmspID8gY2h1bmsuYnl0ZUxlbmd0aCA6IGNodW5rLnNpemU7XG5cdFx0XHRcdHJlbGF0aXZlU3RhcnQgPSAwOyAvLyBBbGwgbmV4dCBzZXF1ZW50YWwgcGFydHMgc2hvdWxkIHN0YXJ0IGF0IDBcblxuXHRcdFx0XHQvLyBkb24ndCBhZGQgdGhlIG92ZXJmbG93IHRvIG5ldyBibG9iUGFydHNcblx0XHRcdFx0aWYgKGFkZGVkID49IHNwYW4pIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbXSwge3R5cGU6IFN0cmluZyh0eXBlKS50b0xvd2VyQ2FzZSgpfSk7XG5cdFx0T2JqZWN0LmFzc2lnbih3bS5nZXQoYmxvYiksIHtzaXplOiBzcGFuLCBwYXJ0czogYmxvYlBhcnRzfSk7XG5cblx0XHRyZXR1cm4gYmxvYjtcblx0fVxuXG5cdGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcblx0XHRyZXR1cm4gJ0Jsb2InO1xuXHR9XG5cblx0c3RhdGljIFtTeW1ib2wuaGFzSW5zdGFuY2VdKG9iamVjdCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHRvYmplY3QgJiZcblx0XHRcdHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG5cdFx0XHR0eXBlb2Ygb2JqZWN0LnN0cmVhbSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0b2JqZWN0LnN0cmVhbS5sZW5ndGggPT09IDAgJiZcblx0XHRcdHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdC9eKEJsb2J8RmlsZSkkLy50ZXN0KG9iamVjdFtTeW1ib2wudG9TdHJpbmdUYWddKVxuXHRcdCk7XG5cdH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQmxvYi5wcm90b3R5cGUsIHtcblx0c2l6ZToge2VudW1lcmFibGU6IHRydWV9LFxuXHR0eXBlOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHNsaWNlOiB7ZW51bWVyYWJsZTogdHJ1ZX1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJsb2I7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBmZXRjaCA9IHJlcXVpcmUoJ25vZGUtZmV0Y2gnKTtcbmNvbnN0IEFib3J0Q29udHJvbGxlciA9IHJlcXVpcmUoJ2Fib3J0LWNvbnRyb2xsZXInKTtcblxuY29uc3QgVEVOX01FR0FCWVRFUyA9IDEwMDAgKiAxMDAwICogMTA7XG5cbmlmICghZ2xvYmFsLmZldGNoKSB7XG5cdGdsb2JhbC5mZXRjaCA9ICh1cmwsIG9wdGlvbnMpID0+IGZldGNoKHVybCwge2hpZ2hXYXRlck1hcms6IFRFTl9NRUdBQllURVMsIC4uLm9wdGlvbnN9KTtcbn1cblxuaWYgKCFnbG9iYWwuSGVhZGVycykge1xuXHRnbG9iYWwuSGVhZGVycyA9IGZldGNoLkhlYWRlcnM7XG59XG5cbmlmICghZ2xvYmFsLlJlcXVlc3QpIHtcblx0Z2xvYmFsLlJlcXVlc3QgPSBmZXRjaC5SZXF1ZXN0O1xufVxuXG5pZiAoIWdsb2JhbC5SZXNwb25zZSkge1xuXHRnbG9iYWwuUmVzcG9uc2UgPSBmZXRjaC5SZXNwb25zZTtcbn1cblxuaWYgKCFnbG9iYWwuQWJvcnRDb250cm9sbGVyKSB7XG5cdGdsb2JhbC5BYm9ydENvbnRyb2xsZXIgPSBBYm9ydENvbnRyb2xsZXI7XG59XG5cbmlmICghZ2xvYmFsLlJlYWRhYmxlU3RyZWFtKSB7XG5cdHRyeSB7XG5cdFx0Z2xvYmFsLlJlYWRhYmxlU3RyZWFtID0gcmVxdWlyZSgnd2ViLXN0cmVhbXMtcG9seWZpbGwvcG9ueWZpbGwvZXMyMDE4Jyk7XG5cdH0gY2F0Y2ggKF8pIHt9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgna3kvdW1kJyk7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5reSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuXHQvKiEgTUlUIExpY2Vuc2UgwqkgU2luZHJlIFNvcmh1cyAqL1xuXG5cdGNvbnN0IGdsb2JhbHMgPSB7fTtcblxuXHRjb25zdCBnZXRHbG9iYWwgPSBwcm9wZXJ0eSA9PiB7XG5cdFx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0XHRpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYgJiYgcHJvcGVydHkgaW4gc2VsZikge1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fVxuXG5cdFx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0XHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93ICYmIHByb3BlcnR5IGluIHdpbmRvdykge1xuXHRcdFx0cmV0dXJuIHdpbmRvdztcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsICYmIHByb3BlcnR5IGluIGdsb2JhbCkge1xuXHRcdFx0cmV0dXJuIGdsb2JhbDtcblx0XHR9XG5cblx0XHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRcdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcykge1xuXHRcdFx0cmV0dXJuIGdsb2JhbFRoaXM7XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IGdsb2JhbFByb3BlcnRpZXMgPSBbXG5cdFx0J0hlYWRlcnMnLFxuXHRcdCdSZXF1ZXN0Jyxcblx0XHQnUmVzcG9uc2UnLFxuXHRcdCdSZWFkYWJsZVN0cmVhbScsXG5cdFx0J2ZldGNoJyxcblx0XHQnQWJvcnRDb250cm9sbGVyJyxcblx0XHQnRm9ybURhdGEnXG5cdF07XG5cblx0Zm9yIChjb25zdCBwcm9wZXJ0eSBvZiBnbG9iYWxQcm9wZXJ0aWVzKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGdsb2JhbHMsIHByb3BlcnR5LCB7XG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdGNvbnN0IGdsb2JhbE9iamVjdCA9IGdldEdsb2JhbChwcm9wZXJ0eSk7XG5cdFx0XHRcdGNvbnN0IHZhbHVlID0gZ2xvYmFsT2JqZWN0ICYmIGdsb2JhbE9iamVjdFtwcm9wZXJ0eV07XG5cdFx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyB2YWx1ZS5iaW5kKGdsb2JhbE9iamVjdCkgOiB2YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IGlzT2JqZWN0ID0gdmFsdWUgPT4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jztcblx0Y29uc3Qgc3VwcG9ydHNBYm9ydENvbnRyb2xsZXIgPSB0eXBlb2YgZ2xvYmFscy5BYm9ydENvbnRyb2xsZXIgPT09ICdmdW5jdGlvbic7XG5cdGNvbnN0IHN1cHBvcnRzU3RyZWFtcyA9IHR5cGVvZiBnbG9iYWxzLlJlYWRhYmxlU3RyZWFtID09PSAnZnVuY3Rpb24nO1xuXHRjb25zdCBzdXBwb3J0c0Zvcm1EYXRhID0gdHlwZW9mIGdsb2JhbHMuRm9ybURhdGEgPT09ICdmdW5jdGlvbic7XG5cblx0Y29uc3QgbWVyZ2VIZWFkZXJzID0gKHNvdXJjZTEsIHNvdXJjZTIpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSBuZXcgZ2xvYmFscy5IZWFkZXJzKHNvdXJjZTEgfHwge30pO1xuXHRcdGNvbnN0IGlzSGVhZGVyc0luc3RhbmNlID0gc291cmNlMiBpbnN0YW5jZW9mIGdsb2JhbHMuSGVhZGVycztcblx0XHRjb25zdCBzb3VyY2UgPSBuZXcgZ2xvYmFscy5IZWFkZXJzKHNvdXJjZTIgfHwge30pO1xuXG5cdFx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2Ygc291cmNlKSB7XG5cdFx0XHRpZiAoKGlzSGVhZGVyc0luc3RhbmNlICYmIHZhbHVlID09PSAndW5kZWZpbmVkJykgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXN1bHQuZGVsZXRlKGtleSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQuc2V0KGtleSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0Y29uc3QgZGVlcE1lcmdlID0gKC4uLnNvdXJjZXMpID0+IHtcblx0XHRsZXQgcmV0dXJuVmFsdWUgPSB7fTtcblx0XHRsZXQgaGVhZGVycyA9IHt9O1xuXG5cdFx0Zm9yIChjb25zdCBzb3VyY2Ugb2Ygc291cmNlcykge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuXHRcdFx0XHRpZiAoIShBcnJheS5pc0FycmF5KHJldHVyblZhbHVlKSkpIHtcblx0XHRcdFx0XHRyZXR1cm5WYWx1ZSA9IFtdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuVmFsdWUgPSBbLi4ucmV0dXJuVmFsdWUsIC4uLnNvdXJjZV07XG5cdFx0XHR9IGVsc2UgaWYgKGlzT2JqZWN0KHNvdXJjZSkpIHtcblx0XHRcdFx0Zm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHNvdXJjZSkpIHtcblx0XHRcdFx0XHRpZiAoaXNPYmplY3QodmFsdWUpICYmIChrZXkgaW4gcmV0dXJuVmFsdWUpKSB7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGRlZXBNZXJnZShyZXR1cm5WYWx1ZVtrZXldLCB2YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuVmFsdWUgPSB7Li4ucmV0dXJuVmFsdWUsIFtrZXldOiB2YWx1ZX07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaXNPYmplY3Qoc291cmNlLmhlYWRlcnMpKSB7XG5cdFx0XHRcdFx0aGVhZGVycyA9IG1lcmdlSGVhZGVycyhoZWFkZXJzLCBzb3VyY2UuaGVhZGVycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuVmFsdWUuaGVhZGVycyA9IGhlYWRlcnM7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldHVyblZhbHVlO1xuXHR9O1xuXG5cdGNvbnN0IHJlcXVlc3RNZXRob2RzID0gW1xuXHRcdCdnZXQnLFxuXHRcdCdwb3N0Jyxcblx0XHQncHV0Jyxcblx0XHQncGF0Y2gnLFxuXHRcdCdoZWFkJyxcblx0XHQnZGVsZXRlJ1xuXHRdO1xuXG5cdGNvbnN0IHJlc3BvbnNlVHlwZXMgPSB7XG5cdFx0anNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdHRleHQ6ICd0ZXh0LyonLFxuXHRcdGZvcm1EYXRhOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXG5cdFx0YXJyYXlCdWZmZXI6ICcqLyonLFxuXHRcdGJsb2I6ICcqLyonXG5cdH07XG5cblx0Y29uc3QgcmV0cnlNZXRob2RzID0gW1xuXHRcdCdnZXQnLFxuXHRcdCdwdXQnLFxuXHRcdCdoZWFkJyxcblx0XHQnZGVsZXRlJyxcblx0XHQnb3B0aW9ucycsXG5cdFx0J3RyYWNlJ1xuXHRdO1xuXG5cdGNvbnN0IHJldHJ5U3RhdHVzQ29kZXMgPSBbXG5cdFx0NDA4LFxuXHRcdDQxMyxcblx0XHQ0MjksXG5cdFx0NTAwLFxuXHRcdDUwMixcblx0XHQ1MDMsXG5cdFx0NTA0XG5cdF07XG5cblx0Y29uc3QgcmV0cnlBZnRlclN0YXR1c0NvZGVzID0gW1xuXHRcdDQxMyxcblx0XHQ0MjksXG5cdFx0NTAzXG5cdF07XG5cblx0Y29uc3Qgc3RvcCA9IFN5bWJvbCgnc3RvcCcpO1xuXG5cdGNsYXNzIEhUVFBFcnJvciBleHRlbmRzIEVycm9yIHtcblx0XHRjb25zdHJ1Y3RvcihyZXNwb25zZSkge1xuXHRcdFx0Ly8gU2V0IHRoZSBtZXNzYWdlIHRvIHRoZSBzdGF0dXMgdGV4dCwgc3VjaCBhcyBVbmF1dGhvcml6ZWQsXG5cdFx0XHQvLyB3aXRoIHNvbWUgZmFsbGJhY2tzLiBUaGlzIG1lc3NhZ2Ugc2hvdWxkIG5ldmVyIGJlIHVuZGVmaW5lZC5cblx0XHRcdHN1cGVyKFxuXHRcdFx0XHRyZXNwb25zZS5zdGF0dXNUZXh0IHx8XG5cdFx0XHRcdFN0cmluZyhcblx0XHRcdFx0XHQocmVzcG9uc2Uuc3RhdHVzID09PSAwIHx8IHJlc3BvbnNlLnN0YXR1cykgP1xuXHRcdFx0XHRcdFx0cmVzcG9uc2Uuc3RhdHVzIDogJ1Vua25vd24gcmVzcG9uc2UgZXJyb3InXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0XHR0aGlzLm5hbWUgPSAnSFRUUEVycm9yJztcblx0XHRcdHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcblx0XHR9XG5cdH1cblxuXHRjbGFzcyBUaW1lb3V0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdFx0Y29uc3RydWN0b3IocmVxdWVzdCkge1xuXHRcdFx0c3VwZXIoJ1JlcXVlc3QgdGltZWQgb3V0Jyk7XG5cdFx0XHR0aGlzLm5hbWUgPSAnVGltZW91dEVycm9yJztcblx0XHRcdHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgZGVsYXkgPSBtcyA9PiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcblxuXHQvLyBgUHJvbWlzZS5yYWNlKClgIHdvcmthcm91bmQgKCM5MSlcblx0Y29uc3QgdGltZW91dCA9IChyZXF1ZXN0LCBhYm9ydENvbnRyb2xsZXIsIG9wdGlvbnMpID0+XG5cdFx0bmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0Y29uc3QgdGltZW91dElEID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGlmIChhYm9ydENvbnRyb2xsZXIpIHtcblx0XHRcdFx0XHRhYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlamVjdChuZXcgVGltZW91dEVycm9yKHJlcXVlc3QpKTtcblx0XHRcdH0sIG9wdGlvbnMudGltZW91dCk7XG5cblx0XHRcdC8qIGVzbGludC1kaXNhYmxlIHByb21pc2UvcHJlZmVyLWF3YWl0LXRvLXRoZW4gKi9cblx0XHRcdG9wdGlvbnMuZmV0Y2gocmVxdWVzdClcblx0XHRcdFx0LnRoZW4ocmVzb2x2ZSlcblx0XHRcdFx0LmNhdGNoKHJlamVjdClcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdC8qIGVzbGludC1lbmFibGUgcHJvbWlzZS9wcmVmZXItYXdhaXQtdG8tdGhlbiAqL1xuXHRcdH0pO1xuXG5cdGNvbnN0IG5vcm1hbGl6ZVJlcXVlc3RNZXRob2QgPSBpbnB1dCA9PiByZXF1ZXN0TWV0aG9kcy5pbmNsdWRlcyhpbnB1dCkgPyBpbnB1dC50b1VwcGVyQ2FzZSgpIDogaW5wdXQ7XG5cblx0Y29uc3QgZGVmYXVsdFJldHJ5T3B0aW9ucyA9IHtcblx0XHRsaW1pdDogMixcblx0XHRtZXRob2RzOiByZXRyeU1ldGhvZHMsXG5cdFx0c3RhdHVzQ29kZXM6IHJldHJ5U3RhdHVzQ29kZXMsXG5cdFx0YWZ0ZXJTdGF0dXNDb2RlczogcmV0cnlBZnRlclN0YXR1c0NvZGVzXG5cdH07XG5cblx0Y29uc3Qgbm9ybWFsaXplUmV0cnlPcHRpb25zID0gKHJldHJ5ID0ge30pID0+IHtcblx0XHRpZiAodHlwZW9mIHJldHJ5ID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Li4uZGVmYXVsdFJldHJ5T3B0aW9ucyxcblx0XHRcdFx0bGltaXQ6IHJldHJ5XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmIChyZXRyeS5tZXRob2RzICYmICFBcnJheS5pc0FycmF5KHJldHJ5Lm1ldGhvZHMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ3JldHJ5Lm1ldGhvZHMgbXVzdCBiZSBhbiBhcnJheScpO1xuXHRcdH1cblxuXHRcdGlmIChyZXRyeS5zdGF0dXNDb2RlcyAmJiAhQXJyYXkuaXNBcnJheShyZXRyeS5zdGF0dXNDb2RlcykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcigncmV0cnkuc3RhdHVzQ29kZXMgbXVzdCBiZSBhbiBhcnJheScpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5kZWZhdWx0UmV0cnlPcHRpb25zLFxuXHRcdFx0Li4ucmV0cnksXG5cdFx0XHRhZnRlclN0YXR1c0NvZGVzOiByZXRyeUFmdGVyU3RhdHVzQ29kZXNcblx0XHR9O1xuXHR9O1xuXG5cdC8vIFRoZSBtYXhpbXVtIHZhbHVlIG9mIGEgMzJiaXQgaW50IChzZWUgaXNzdWUgIzExNylcblx0Y29uc3QgbWF4U2FmZVRpbWVvdXQgPSAyMTQ3NDgzNjQ3O1xuXG5cdGNsYXNzIEt5IHtcblx0XHRjb25zdHJ1Y3RvcihpbnB1dCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0XHR0aGlzLl9yZXRyeUNvdW50ID0gMDtcblx0XHRcdHRoaXMuX2lucHV0ID0gaW5wdXQ7XG5cdFx0XHR0aGlzLl9vcHRpb25zID0ge1xuXHRcdFx0XHQvLyBUT0RPOiBjcmVkZW50aWFscyBjYW4gYmUgcmVtb3ZlZCB3aGVuIHRoZSBzcGVjIGNoYW5nZSBpcyBpbXBsZW1lbnRlZCBpbiBhbGwgYnJvd3NlcnMuIENvbnRleHQ6IGh0dHBzOi8vd3d3LmNocm9tZXN0YXR1cy5jb20vZmVhdHVyZS80NTM5NDczMzEyMzUwMjA4XG5cdFx0XHRcdGNyZWRlbnRpYWxzOiB0aGlzLl9pbnB1dC5jcmVkZW50aWFscyB8fCAnc2FtZS1vcmlnaW4nLFxuXHRcdFx0XHQuLi5vcHRpb25zLFxuXHRcdFx0XHRoZWFkZXJzOiBtZXJnZUhlYWRlcnModGhpcy5faW5wdXQuaGVhZGVycywgb3B0aW9ucy5oZWFkZXJzKSxcblx0XHRcdFx0aG9va3M6IGRlZXBNZXJnZSh7XG5cdFx0XHRcdFx0YmVmb3JlUmVxdWVzdDogW10sXG5cdFx0XHRcdFx0YmVmb3JlUmV0cnk6IFtdLFxuXHRcdFx0XHRcdGFmdGVyUmVzcG9uc2U6IFtdXG5cdFx0XHRcdH0sIG9wdGlvbnMuaG9va3MpLFxuXHRcdFx0XHRtZXRob2Q6IG5vcm1hbGl6ZVJlcXVlc3RNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5faW5wdXQubWV0aG9kKSxcblx0XHRcdFx0cHJlZml4VXJsOiBTdHJpbmcob3B0aW9ucy5wcmVmaXhVcmwgfHwgJycpLFxuXHRcdFx0XHRyZXRyeTogbm9ybWFsaXplUmV0cnlPcHRpb25zKG9wdGlvbnMucmV0cnkpLFxuXHRcdFx0XHR0aHJvd0h0dHBFcnJvcnM6IG9wdGlvbnMudGhyb3dIdHRwRXJyb3JzICE9PSBmYWxzZSxcblx0XHRcdFx0dGltZW91dDogdHlwZW9mIG9wdGlvbnMudGltZW91dCA9PT0gJ3VuZGVmaW5lZCcgPyAxMDAwMCA6IG9wdGlvbnMudGltZW91dCxcblx0XHRcdFx0ZmV0Y2g6IG9wdGlvbnMuZmV0Y2ggfHwgZ2xvYmFscy5mZXRjaFxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzLl9pbnB1dCAhPT0gJ3N0cmluZycgJiYgISh0aGlzLl9pbnB1dCBpbnN0YW5jZW9mIFVSTCB8fCB0aGlzLl9pbnB1dCBpbnN0YW5jZW9mIGdsb2JhbHMuUmVxdWVzdCkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignYGlucHV0YCBtdXN0IGJlIGEgc3RyaW5nLCBVUkwsIG9yIFJlcXVlc3QnKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX29wdGlvbnMucHJlZml4VXJsICYmIHR5cGVvZiB0aGlzLl9pbnB1dCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2lucHV0LnN0YXJ0c1dpdGgoJy8nKSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignYGlucHV0YCBtdXN0IG5vdCBiZWdpbiB3aXRoIGEgc2xhc2ggd2hlbiB1c2luZyBgcHJlZml4VXJsYCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF0aGlzLl9vcHRpb25zLnByZWZpeFVybC5lbmRzV2l0aCgnLycpKSB7XG5cdFx0XHRcdFx0dGhpcy5fb3B0aW9ucy5wcmVmaXhVcmwgKz0gJy8nO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5faW5wdXQgPSB0aGlzLl9vcHRpb25zLnByZWZpeFVybCArIHRoaXMuX2lucHV0O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc3VwcG9ydHNBYm9ydENvbnRyb2xsZXIpIHtcblx0XHRcdFx0dGhpcy5hYm9ydENvbnRyb2xsZXIgPSBuZXcgZ2xvYmFscy5BYm9ydENvbnRyb2xsZXIoKTtcblx0XHRcdFx0aWYgKHRoaXMuX29wdGlvbnMuc2lnbmFsKSB7XG5cdFx0XHRcdFx0dGhpcy5fb3B0aW9ucy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLmFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fb3B0aW9ucy5zaWduYWwgPSB0aGlzLmFib3J0Q29udHJvbGxlci5zaWduYWw7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucmVxdWVzdCA9IG5ldyBnbG9iYWxzLlJlcXVlc3QodGhpcy5faW5wdXQsIHRoaXMuX29wdGlvbnMpO1xuXG5cdFx0XHRpZiAodGhpcy5fb3B0aW9ucy5zZWFyY2hQYXJhbXMpIHtcblx0XHRcdFx0Y29uc3Qgc2VhcmNoUGFyYW1zID0gJz8nICsgbmV3IFVSTFNlYXJjaFBhcmFtcyh0aGlzLl9vcHRpb25zLnNlYXJjaFBhcmFtcykudG9TdHJpbmcoKTtcblx0XHRcdFx0Y29uc3QgdXJsID0gdGhpcy5yZXF1ZXN0LnVybC5yZXBsYWNlKC8oPzpcXD8uKj8pPyg/PSN8JCkvLCBzZWFyY2hQYXJhbXMpO1xuXG5cdFx0XHRcdC8vIFRvIHByb3ZpZGUgY29ycmVjdCBmb3JtIGJvdW5kYXJ5LCBDb250ZW50LVR5cGUgaGVhZGVyIHNob3VsZCBiZSBkZWxldGVkIGVhY2ggdGltZSB3aGVuIG5ldyBSZXF1ZXN0IGluc3RhbnRpYXRlZCBmcm9tIGFub3RoZXIgb25lXG5cdFx0XHRcdGlmICgoKHN1cHBvcnRzRm9ybURhdGEgJiYgdGhpcy5fb3B0aW9ucy5ib2R5IGluc3RhbmNlb2YgZ2xvYmFscy5Gb3JtRGF0YSkgfHwgdGhpcy5fb3B0aW9ucy5ib2R5IGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSAmJiAhKHRoaXMuX29wdGlvbnMuaGVhZGVycyAmJiB0aGlzLl9vcHRpb25zLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddKSkge1xuXHRcdFx0XHRcdHRoaXMucmVxdWVzdC5oZWFkZXJzLmRlbGV0ZSgnY29udGVudC10eXBlJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnJlcXVlc3QgPSBuZXcgZ2xvYmFscy5SZXF1ZXN0KG5ldyBnbG9iYWxzLlJlcXVlc3QodXJsLCB0aGlzLnJlcXVlc3QpLCB0aGlzLl9vcHRpb25zKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX29wdGlvbnMuanNvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHRoaXMuX29wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KHRoaXMuX29wdGlvbnMuanNvbik7XG5cdFx0XHRcdHRoaXMucmVxdWVzdC5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblx0XHRcdFx0dGhpcy5yZXF1ZXN0ID0gbmV3IGdsb2JhbHMuUmVxdWVzdCh0aGlzLnJlcXVlc3QsIHtib2R5OiB0aGlzLl9vcHRpb25zLmJvZHl9KTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZm4gPSBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLl9vcHRpb25zLnRpbWVvdXQgPiBtYXhTYWZlVGltZW91dCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKGBUaGUgXFxgdGltZW91dFxcYCBvcHRpb24gY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiAke21heFNhZmVUaW1lb3V0fWApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YXdhaXQgZGVsYXkoMSk7XG5cdFx0XHRcdGxldCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2ZldGNoKCk7XG5cblx0XHRcdFx0Zm9yIChjb25zdCBob29rIG9mIHRoaXMuX29wdGlvbnMuaG9va3MuYWZ0ZXJSZXNwb25zZSkge1xuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG5cdFx0XHRcdFx0Y29uc3QgbW9kaWZpZWRSZXNwb25zZSA9IGF3YWl0IGhvb2soXG5cdFx0XHRcdFx0XHR0aGlzLnJlcXVlc3QsXG5cdFx0XHRcdFx0XHR0aGlzLl9vcHRpb25zLFxuXHRcdFx0XHRcdFx0dGhpcy5fZGVjb3JhdGVSZXNwb25zZShyZXNwb25zZS5jbG9uZSgpKVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRpZiAobW9kaWZpZWRSZXNwb25zZSBpbnN0YW5jZW9mIGdsb2JhbHMuUmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdHJlc3BvbnNlID0gbW9kaWZpZWRSZXNwb25zZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLl9kZWNvcmF0ZVJlc3BvbnNlKHJlc3BvbnNlKTtcblxuXHRcdFx0XHRpZiAoIXJlc3BvbnNlLm9rICYmIHRoaXMuX29wdGlvbnMudGhyb3dIdHRwRXJyb3JzKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEhUVFBFcnJvcihyZXNwb25zZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJZiBgb25Eb3dubG9hZFByb2dyZXNzYCBpcyBwYXNzZWQsIGl0IHVzZXMgdGhlIHN0cmVhbSBBUEkgaW50ZXJuYWxseVxuXHRcdFx0XHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRcdFx0XHRpZiAodGhpcy5fb3B0aW9ucy5vbkRvd25sb2FkUHJvZ3Jlc3MpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMub25Eb3dubG9hZFByb2dyZXNzICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgYG9uRG93bmxvYWRQcm9ncmVzc2Agb3B0aW9uIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghc3VwcG9ydHNTdHJlYW1zKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1N0cmVhbXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBlbnZpcm9ubWVudC4gYFJlYWRhYmxlU3RyZWFtYCBpcyBtaXNzaW5nLicpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9zdHJlYW0ocmVzcG9uc2UuY2xvbmUoKSwgdGhpcy5fb3B0aW9ucy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdFx0fTtcblxuXHRcdFx0Y29uc3QgaXNSZXRyaWFibGVNZXRob2QgPSB0aGlzLl9vcHRpb25zLnJldHJ5Lm1ldGhvZHMuaW5jbHVkZXModGhpcy5yZXF1ZXN0Lm1ldGhvZC50b0xvd2VyQ2FzZSgpKTtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGlzUmV0cmlhYmxlTWV0aG9kID8gdGhpcy5fcmV0cnkoZm4pIDogZm4oKTtcblxuXHRcdFx0Zm9yIChjb25zdCBbdHlwZSwgbWltZVR5cGVdIG9mIE9iamVjdC5lbnRyaWVzKHJlc3BvbnNlVHlwZXMpKSB7XG5cdFx0XHRcdHJlc3VsdFt0eXBlXSA9IGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnJlcXVlc3QuaGVhZGVycy5zZXQoJ2FjY2VwdCcsIHRoaXMucmVxdWVzdC5oZWFkZXJzLmdldCgnYWNjZXB0JykgfHwgbWltZVR5cGUpO1xuXG5cdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSAoYXdhaXQgcmVzdWx0KS5jbG9uZSgpO1xuXG5cdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdqc29uJykge1xuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA0KSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAnJztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMucGFyc2VKc29uKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBvcHRpb25zLnBhcnNlSnNvbihhd2FpdCByZXNwb25zZS50ZXh0KCkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiByZXNwb25zZVt0eXBlXSgpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdF9jYWxjdWxhdGVSZXRyeURlbGF5KGVycm9yKSB7XG5cdFx0XHR0aGlzLl9yZXRyeUNvdW50Kys7XG5cblx0XHRcdGlmICh0aGlzLl9yZXRyeUNvdW50IDwgdGhpcy5fb3B0aW9ucy5yZXRyeS5saW1pdCAmJiAhKGVycm9yIGluc3RhbmNlb2YgVGltZW91dEVycm9yKSkge1xuXHRcdFx0XHRpZiAoZXJyb3IgaW5zdGFuY2VvZiBIVFRQRXJyb3IpIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMuX29wdGlvbnMucmV0cnkuc3RhdHVzQ29kZXMuaW5jbHVkZXMoZXJyb3IucmVzcG9uc2Uuc3RhdHVzKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgcmV0cnlBZnRlciA9IGVycm9yLnJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdSZXRyeS1BZnRlcicpO1xuXHRcdFx0XHRcdGlmIChyZXRyeUFmdGVyICYmIHRoaXMuX29wdGlvbnMucmV0cnkuYWZ0ZXJTdGF0dXNDb2Rlcy5pbmNsdWRlcyhlcnJvci5yZXNwb25zZS5zdGF0dXMpKSB7XG5cdFx0XHRcdFx0XHRsZXQgYWZ0ZXIgPSBOdW1iZXIocmV0cnlBZnRlcik7XG5cdFx0XHRcdFx0XHRpZiAoTnVtYmVyLmlzTmFOKGFmdGVyKSkge1xuXHRcdFx0XHRcdFx0XHRhZnRlciA9IERhdGUucGFyc2UocmV0cnlBZnRlcikgLSBEYXRlLm5vdygpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0YWZ0ZXIgKj0gMTAwMDtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLl9vcHRpb25zLnJldHJ5Lm1heFJldHJ5QWZ0ZXIgIT09ICd1bmRlZmluZWQnICYmIGFmdGVyID4gdGhpcy5fb3B0aW9ucy5yZXRyeS5tYXhSZXRyeUFmdGVyKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gYWZ0ZXI7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDEzKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBCQUNLT0ZGX0ZBQ1RPUiA9IDAuMztcblx0XHRcdFx0cmV0dXJuIEJBQ0tPRkZfRkFDVE9SICogKDIgKiogKHRoaXMuX3JldHJ5Q291bnQgLSAxKSkgKiAxMDAwO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHRfZGVjb3JhdGVSZXNwb25zZShyZXNwb25zZSkge1xuXHRcdFx0aWYgKHRoaXMuX29wdGlvbnMucGFyc2VKc29uKSB7XG5cdFx0XHRcdHJlc3BvbnNlLmpzb24gPSBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX29wdGlvbnMucGFyc2VKc29uKGF3YWl0IHJlc3BvbnNlLnRleHQoKSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHR9XG5cblx0XHRhc3luYyBfcmV0cnkoZm4pIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJldHVybiBhd2FpdCBmbigpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0Y29uc3QgbXMgPSBNYXRoLm1pbih0aGlzLl9jYWxjdWxhdGVSZXRyeURlbGF5KGVycm9yKSwgbWF4U2FmZVRpbWVvdXQpO1xuXHRcdFx0XHRpZiAobXMgIT09IDAgJiYgdGhpcy5fcmV0cnlDb3VudCA+IDApIHtcblx0XHRcdFx0XHRhd2FpdCBkZWxheShtcyk7XG5cblx0XHRcdFx0XHRmb3IgKGNvbnN0IGhvb2sgb2YgdGhpcy5fb3B0aW9ucy5ob29rcy5iZWZvcmVSZXRyeSkge1xuXHRcdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3Bcblx0XHRcdFx0XHRcdGNvbnN0IGhvb2tSZXN1bHQgPSBhd2FpdCBob29rKHtcblx0XHRcdFx0XHRcdFx0cmVxdWVzdDogdGhpcy5yZXF1ZXN0LFxuXHRcdFx0XHRcdFx0XHRvcHRpb25zOiB0aGlzLl9vcHRpb25zLFxuXHRcdFx0XHRcdFx0XHRlcnJvcixcblx0XHRcdFx0XHRcdFx0cmV0cnlDb3VudDogdGhpcy5fcmV0cnlDb3VudFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8vIElmIGBzdG9wYCBpcyByZXR1cm5lZCBmcm9tIHRoZSBob29rLCB0aGUgcmV0cnkgcHJvY2VzcyBpcyBzdG9wcGVkXG5cdFx0XHRcdFx0XHRpZiAoaG9va1Jlc3VsdCA9PT0gc3RvcCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX3JldHJ5KGZuKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9vcHRpb25zLnRocm93SHR0cEVycm9ycykge1xuXHRcdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YXN5bmMgX2ZldGNoKCkge1xuXHRcdFx0Zm9yIChjb25zdCBob29rIG9mIHRoaXMuX29wdGlvbnMuaG9va3MuYmVmb3JlUmVxdWVzdCkge1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuXHRcdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCBob29rKHRoaXMucmVxdWVzdCwgdGhpcy5fb3B0aW9ucyk7XG5cblx0XHRcdFx0aWYgKHJlc3VsdCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcblx0XHRcdFx0XHR0aGlzLnJlcXVlc3QgPSByZXN1bHQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAocmVzdWx0IGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9vcHRpb25zLnRpbWVvdXQgPT09IGZhbHNlKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9vcHRpb25zLmZldGNoKHRoaXMucmVxdWVzdC5jbG9uZSgpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRpbWVvdXQodGhpcy5yZXF1ZXN0LmNsb25lKCksIHRoaXMuYWJvcnRDb250cm9sbGVyLCB0aGlzLl9vcHRpb25zKTtcblx0XHR9XG5cblx0XHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRcdF9zdHJlYW0ocmVzcG9uc2UsIG9uRG93bmxvYWRQcm9ncmVzcykge1xuXHRcdFx0Y29uc3QgdG90YWxCeXRlcyA9IE51bWJlcihyZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC1sZW5ndGgnKSkgfHwgMDtcblx0XHRcdGxldCB0cmFuc2ZlcnJlZEJ5dGVzID0gMDtcblxuXHRcdFx0cmV0dXJuIG5ldyBnbG9iYWxzLlJlc3BvbnNlKFxuXHRcdFx0XHRuZXcgZ2xvYmFscy5SZWFkYWJsZVN0cmVhbSh7XG5cdFx0XHRcdFx0c3RhcnQoY29udHJvbGxlcikge1xuXHRcdFx0XHRcdFx0Y29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcblxuXHRcdFx0XHRcdFx0aWYgKG9uRG93bmxvYWRQcm9ncmVzcykge1xuXHRcdFx0XHRcdFx0XHRvbkRvd25sb2FkUHJvZ3Jlc3Moe3BlcmNlbnQ6IDAsIHRyYW5zZmVycmVkQnl0ZXM6IDAsIHRvdGFsQnl0ZXN9LCBuZXcgVWludDhBcnJheSgpKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0YXN5bmMgZnVuY3Rpb24gcmVhZCgpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3Qge2RvbmUsIHZhbHVlfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG5cdFx0XHRcdFx0XHRcdGlmIChkb25lKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29udHJvbGxlci5jbG9zZSgpO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChvbkRvd25sb2FkUHJvZ3Jlc3MpIHtcblx0XHRcdFx0XHRcdFx0XHR0cmFuc2ZlcnJlZEJ5dGVzICs9IHZhbHVlLmJ5dGVMZW5ndGg7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgcGVyY2VudCA9IHRvdGFsQnl0ZXMgPT09IDAgPyAwIDogdHJhbnNmZXJyZWRCeXRlcyAvIHRvdGFsQnl0ZXM7XG5cdFx0XHRcdFx0XHRcdFx0b25Eb3dubG9hZFByb2dyZXNzKHtwZXJjZW50LCB0cmFuc2ZlcnJlZEJ5dGVzLCB0b3RhbEJ5dGVzfSwgdmFsdWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Y29udHJvbGxlci5lbnF1ZXVlKHZhbHVlKTtcblx0XHRcdFx0XHRcdFx0cmVhZCgpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZWFkKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCB2YWxpZGF0ZUFuZE1lcmdlID0gKC4uLnNvdXJjZXMpID0+IHtcblx0XHRmb3IgKGNvbnN0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XG5cdFx0XHRpZiAoKCFpc09iamVjdChzb3VyY2UpIHx8IEFycmF5LmlzQXJyYXkoc291cmNlKSkgJiYgdHlwZW9mIHNvdXJjZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGBvcHRpb25zYCBhcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBkZWVwTWVyZ2Uoe30sIC4uLnNvdXJjZXMpO1xuXHR9O1xuXG5cdGNvbnN0IGNyZWF0ZUluc3RhbmNlID0gZGVmYXVsdHMgPT4ge1xuXHRcdGNvbnN0IGt5ID0gKGlucHV0LCBvcHRpb25zKSA9PiBuZXcgS3koaW5wdXQsIHZhbGlkYXRlQW5kTWVyZ2UoZGVmYXVsdHMsIG9wdGlvbnMpKTtcblxuXHRcdGZvciAoY29uc3QgbWV0aG9kIG9mIHJlcXVlc3RNZXRob2RzKSB7XG5cdFx0XHRreVttZXRob2RdID0gKGlucHV0LCBvcHRpb25zKSA9PiBuZXcgS3koaW5wdXQsIHZhbGlkYXRlQW5kTWVyZ2UoZGVmYXVsdHMsIG9wdGlvbnMsIHttZXRob2R9KSk7XG5cdFx0fVxuXG5cdFx0a3kuSFRUUEVycm9yID0gSFRUUEVycm9yO1xuXHRcdGt5LlRpbWVvdXRFcnJvciA9IFRpbWVvdXRFcnJvcjtcblx0XHRreS5jcmVhdGUgPSBuZXdEZWZhdWx0cyA9PiBjcmVhdGVJbnN0YW5jZSh2YWxpZGF0ZUFuZE1lcmdlKG5ld0RlZmF1bHRzKSk7XG5cdFx0a3kuZXh0ZW5kID0gbmV3RGVmYXVsdHMgPT4gY3JlYXRlSW5zdGFuY2UodmFsaWRhdGVBbmRNZXJnZShkZWZhdWx0cywgbmV3RGVmYXVsdHMpKTtcblx0XHRreS5zdG9wID0gc3RvcDtcblxuXHRcdHJldHVybiBreTtcblx0fTtcblxuXHR2YXIgaW5kZXggPSBjcmVhdGVJbnN0YW5jZSgpO1xuXG5cdHJldHVybiBpbmRleDtcblxufSkpKTtcbiIsIihmdW5jdGlvbiAobmFtZSwgY29udGV4dCwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShkZWZpbml0aW9uKTtcbiAgZWxzZSBjb250ZXh0W25hbWVdID0gZGVmaW5pdGlvbigpO1xufSkoJ3VybGpvaW4nLCB0aGlzLCBmdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplIChzdHJBcnJheSkge1xuICAgIHZhciByZXN1bHRBcnJheSA9IFtdO1xuICAgIGlmIChzdHJBcnJheS5sZW5ndGggPT09IDApIHsgcmV0dXJuICcnOyB9XG5cbiAgICBpZiAodHlwZW9mIHN0ckFycmF5WzBdICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVXJsIG11c3QgYmUgYSBzdHJpbmcuIFJlY2VpdmVkICcgKyBzdHJBcnJheVswXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGZpcnN0IHBhcnQgaXMgYSBwbGFpbiBwcm90b2NvbCwgd2UgY29tYmluZSBpdCB3aXRoIHRoZSBuZXh0IHBhcnQuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eW14vOl0rOlxcLyokLykgJiYgc3RyQXJyYXkubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGZpcnN0ID0gc3RyQXJyYXkuc2hpZnQoKTtcbiAgICAgIHN0ckFycmF5WzBdID0gZmlyc3QgKyBzdHJBcnJheVswXTtcbiAgICB9XG5cbiAgICAvLyBUaGVyZSBtdXN0IGJlIHR3byBvciB0aHJlZSBzbGFzaGVzIGluIHRoZSBmaWxlIHByb3RvY29sLCB0d28gc2xhc2hlcyBpbiBhbnl0aGluZyBlbHNlLlxuICAgIGlmIChzdHJBcnJheVswXS5tYXRjaCgvXmZpbGU6XFwvXFwvXFwvLykpIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8vJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ckFycmF5WzBdID0gc3RyQXJyYXlbMF0ucmVwbGFjZSgvXihbXi86XSspOlxcLyovLCAnJDE6Ly8nKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ckFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gc3RyQXJyYXlbaV07XG5cbiAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIGNvbXBvbmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wb25lbnQgPT09ICcnKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgc3RhcnRpbmcgc2xhc2hlcyBmb3IgZWFjaCBjb21wb25lbnQgYnV0IHRoZSBmaXJzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL15bXFwvXSsvLCAnJyk7XG4gICAgICB9XG4gICAgICBpZiAoaSA8IHN0ckFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgLy8gUmVtb3ZpbmcgdGhlIGVuZGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGxhc3QuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIHRoZSBsYXN0IGNvbXBvbmVudCB3ZSB3aWxsIGNvbWJpbmUgbXVsdGlwbGUgc2xhc2hlcyB0byBhIHNpbmdsZSBvbmUuXG4gICAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudC5yZXBsYWNlKC9bXFwvXSskLywgJy8nKTtcbiAgICAgIH1cblxuICAgICAgcmVzdWx0QXJyYXkucHVzaChjb21wb25lbnQpO1xuXG4gICAgfVxuXG4gICAgdmFyIHN0ciA9IHJlc3VsdEFycmF5LmpvaW4oJy8nKTtcbiAgICAvLyBFYWNoIGlucHV0IGNvbXBvbmVudCBpcyBub3cgc2VwYXJhdGVkIGJ5IGEgc2luZ2xlIHNsYXNoIGV4Y2VwdCB0aGUgcG9zc2libGUgZmlyc3QgcGxhaW4gcHJvdG9jb2wgcGFydC5cblxuICAgIC8vIHJlbW92ZSB0cmFpbGluZyBzbGFzaCBiZWZvcmUgcGFyYW1ldGVycyBvciBoYXNoXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcLyhcXD98JnwjW14hXSkvZywgJyQxJyk7XG5cbiAgICAvLyByZXBsYWNlID8gaW4gcGFyYW1ldGVycyB3aXRoICZcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJz8nKTtcbiAgICBzdHIgPSBwYXJ0cy5zaGlmdCgpICsgKHBhcnRzLmxlbmd0aCA+IDAgPyAnPyc6ICcnKSArIHBhcnRzLmpvaW4oJyYnKTtcblxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnB1dDtcblxuICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgaW5wdXQgPSBhcmd1bWVudHNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0ID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIHJldHVybiBub3JtYWxpemUoaW5wdXQpO1xuICB9O1xuXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0cmVhbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ6bGliXCIpOyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZmV0Y2g7XG5cbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG5jb25zdCBodHRwcyA9IHJlcXVpcmUoJ2h0dHBzJyk7XG5jb25zdCB6bGliID0gcmVxdWlyZSgnemxpYicpO1xuY29uc3QgU3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5jb25zdCBkYXRhVXJpVG9CdWZmZXIgPSByZXF1aXJlKCdkYXRhLXVyaS10by1idWZmZXInKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5jb25zdCBCbG9iID0gcmVxdWlyZSgnZmV0Y2gtYmxvYicpO1xuY29uc3QgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5jb25zdCB1cmwgPSByZXF1aXJlKCd1cmwnKTtcblxuY2xhc3MgRmV0Y2hCYXNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHR5cGUpIHtcblx0XHRzdXBlcihtZXNzYWdlKTtcblx0XHQvLyBIaWRlIGN1c3RvbSBlcnJvciBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIGZyb20gZW5kLXVzZXJzXG5cdFx0RXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG5cblx0XHR0aGlzLnR5cGUgPSB0eXBlO1xuXHR9XG5cblx0Z2V0IG5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IubmFtZTtcblx0fVxuXG5cdGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXHR9XG59XG5cbi8qKlxuICogQHR5cGVkZWYge3sgYWRkcmVzcz86IHN0cmluZywgY29kZTogc3RyaW5nLCBkZXN0Pzogc3RyaW5nLCBlcnJubzogbnVtYmVyLCBpbmZvPzogb2JqZWN0LCBtZXNzYWdlOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcsIHBvcnQ/OiBudW1iZXIsIHN5c2NhbGw6IHN0cmluZ319IFN5c3RlbUVycm9yXG4qL1xuXG4vKipcbiAqIEZldGNoRXJyb3IgaW50ZXJmYWNlIGZvciBvcGVyYXRpb25hbCBlcnJvcnNcbiAqL1xuY2xhc3MgRmV0Y2hFcnJvciBleHRlbmRzIEZldGNoQmFzZUVycm9yIHtcblx0LyoqXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gbWVzc2FnZSAtICAgICAgRXJyb3IgbWVzc2FnZSBmb3IgaHVtYW5cblx0ICogQHBhcmFtICB7c3RyaW5nfSBbdHlwZV0gLSAgICAgICAgRXJyb3IgdHlwZSBmb3IgbWFjaGluZVxuXHQgKiBAcGFyYW0gIHtTeXN0ZW1FcnJvcn0gW3N5c3RlbUVycm9yXSAtIEZvciBOb2RlLmpzIHN5c3RlbSBlcnJvclxuXHQgKi9cblx0Y29uc3RydWN0b3IobWVzc2FnZSwgdHlwZSwgc3lzdGVtRXJyb3IpIHtcblx0XHRzdXBlcihtZXNzYWdlLCB0eXBlKTtcblx0XHQvLyBXaGVuIGVyci50eXBlIGlzIGBzeXN0ZW1gLCBlcnIuZXJyb3JlZFN5c0NhbGwgY29udGFpbnMgc3lzdGVtIGVycm9yIGFuZCBlcnIuY29kZSBjb250YWlucyBzeXN0ZW0gZXJyb3IgY29kZVxuXHRcdGlmIChzeXN0ZW1FcnJvcikge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW11bHRpLWFzc2lnblxuXHRcdFx0dGhpcy5jb2RlID0gdGhpcy5lcnJubyA9IHN5c3RlbUVycm9yLmNvZGU7XG5cdFx0XHR0aGlzLmVycm9yZWRTeXNDYWxsID0gc3lzdGVtRXJyb3Iuc3lzY2FsbDtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBJcy5qc1xuICpcbiAqIE9iamVjdCB0eXBlIGNoZWNrcy5cbiAqL1xuXG5jb25zdCBOQU1FID0gU3ltYm9sLnRvU3RyaW5nVGFnO1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICogcmVmOiBodHRwczovL2dpdGh1Yi5jb20vbm9kZS1mZXRjaC9ub2RlLWZldGNoL2lzc3Vlcy8yOTYjaXNzdWVjb21tZW50LTMwNzU5ODE0M1xuICpcbiAqIEBwYXJhbSAgeyp9IG9ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNVUkxTZWFyY2hQYXJhbWV0ZXJzID0gb2JqZWN0ID0+IHtcblx0cmV0dXJuIChcblx0XHR0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuYXBwZW5kID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5kZWxldGUgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LmdldCA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuZ2V0QWxsID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5oYXMgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LnNldCA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3Quc29ydCA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdG9iamVjdFtOQU1FXSA9PT0gJ1VSTFNlYXJjaFBhcmFtcydcblx0KTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamVjdGAgaXMgYSBXM0MgYEJsb2JgIG9iamVjdCAod2hpY2ggYEZpbGVgIGluaGVyaXRzIGZyb20pXG4gKlxuICogQHBhcmFtICB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBpc0Jsb2IgPSBvYmplY3QgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG5cdFx0dHlwZW9mIG9iamVjdC5hcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QudHlwZSA9PT0gJ3N0cmluZycgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LnN0cmVhbSA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiZcblx0XHQvXihCbG9ifEZpbGUpJC8udGVzdChvYmplY3RbTkFNRV0pXG5cdCk7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGEgc3BlYy1jb21wbGlhbnQgYEZvcm1EYXRhYCBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YShvYmplY3QpIHtcblx0cmV0dXJuIChcblx0XHR0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuYXBwZW5kID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5zZXQgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LmdldCA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuZ2V0QWxsID09PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIG9iamVjdC5kZWxldGUgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2Ygb2JqZWN0LnZhbHVlcyA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuZW50cmllcyA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiZcblx0XHRvYmplY3RbTkFNRV0gPT09ICdGb3JtRGF0YSdcblx0KTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhbiBpbnN0YW5jZSBvZiBBYm9ydFNpZ25hbC5cbiAqXG4gKiBAcGFyYW0gIHsqfSBvYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzQWJvcnRTaWduYWwgPSBvYmplY3QgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG5cdFx0b2JqZWN0W05BTUVdID09PSAnQWJvcnRTaWduYWwnXG5cdCk7XG59O1xuXG5jb25zdCBjYXJyaWFnZSA9ICdcXHJcXG4nO1xuY29uc3QgZGFzaGVzID0gJy0nLnJlcGVhdCgyKTtcbmNvbnN0IGNhcnJpYWdlTGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoY2FycmlhZ2UpO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBib3VuZGFyeVxuICovXG5jb25zdCBnZXRGb290ZXIgPSBib3VuZGFyeSA9PiBgJHtkYXNoZXN9JHtib3VuZGFyeX0ke2Rhc2hlc30ke2NhcnJpYWdlLnJlcGVhdCgyKX1gO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBib3VuZGFyeVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Kn0gZmllbGRcbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEhlYWRlcihib3VuZGFyeSwgbmFtZSwgZmllbGQpIHtcblx0bGV0IGhlYWRlciA9ICcnO1xuXG5cdGhlYWRlciArPSBgJHtkYXNoZXN9JHtib3VuZGFyeX0ke2NhcnJpYWdlfWA7XG5cdGhlYWRlciArPSBgQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPVwiJHtuYW1lfVwiYDtcblxuXHRpZiAoaXNCbG9iKGZpZWxkKSkge1xuXHRcdGhlYWRlciArPSBgOyBmaWxlbmFtZT1cIiR7ZmllbGQubmFtZX1cIiR7Y2FycmlhZ2V9YDtcblx0XHRoZWFkZXIgKz0gYENvbnRlbnQtVHlwZTogJHtmaWVsZC50eXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nfWA7XG5cdH1cblxuXHRyZXR1cm4gYCR7aGVhZGVyfSR7Y2FycmlhZ2UucmVwZWF0KDIpfWA7XG59XG5cbi8qKlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5jb25zdCBnZXRCb3VuZGFyeSA9ICgpID0+IGNyeXB0by5yYW5kb21CeXRlcyg4KS50b1N0cmluZygnaGV4Jyk7XG5cbi8qKlxuICogQHBhcmFtIHtGb3JtRGF0YX0gZm9ybVxuICogQHBhcmFtIHtzdHJpbmd9IGJvdW5kYXJ5XG4gKi9cbmFzeW5jIGZ1bmN0aW9uICogZm9ybURhdGFJdGVyYXRvcihmb3JtLCBib3VuZGFyeSkge1xuXHRmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgZm9ybSkge1xuXHRcdHlpZWxkIGdldEhlYWRlcihib3VuZGFyeSwgbmFtZSwgdmFsdWUpO1xuXG5cdFx0aWYgKGlzQmxvYih2YWx1ZSkpIHtcblx0XHRcdHlpZWxkICogdmFsdWUuc3RyZWFtKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHlpZWxkIHZhbHVlO1xuXHRcdH1cblxuXHRcdHlpZWxkIGNhcnJpYWdlO1xuXHR9XG5cblx0eWllbGQgZ2V0Rm9vdGVyKGJvdW5kYXJ5KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0Zvcm1EYXRhfSBmb3JtXG4gKiBAcGFyYW0ge3N0cmluZ30gYm91bmRhcnlcbiAqL1xuZnVuY3Rpb24gZ2V0Rm9ybURhdGFMZW5ndGgoZm9ybSwgYm91bmRhcnkpIHtcblx0bGV0IGxlbmd0aCA9IDA7XG5cblx0Zm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIGZvcm0pIHtcblx0XHRsZW5ndGggKz0gQnVmZmVyLmJ5dGVMZW5ndGgoZ2V0SGVhZGVyKGJvdW5kYXJ5LCBuYW1lLCB2YWx1ZSkpO1xuXG5cdFx0aWYgKGlzQmxvYih2YWx1ZSkpIHtcblx0XHRcdGxlbmd0aCArPSB2YWx1ZS5zaXplO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZW5ndGggKz0gQnVmZmVyLmJ5dGVMZW5ndGgoU3RyaW5nKHZhbHVlKSk7XG5cdFx0fVxuXG5cdFx0bGVuZ3RoICs9IGNhcnJpYWdlTGVuZ3RoO1xuXHR9XG5cblx0bGVuZ3RoICs9IEJ1ZmZlci5ieXRlTGVuZ3RoKGdldEZvb3Rlcihib3VuZGFyeSkpO1xuXG5cdHJldHVybiBsZW5ndGg7XG59XG5cbmNvbnN0IElOVEVSTkFMUyA9IFN5bWJvbCgnQm9keSBpbnRlcm5hbHMnKTtcblxuLyoqXG4gKiBCb2R5IG1peGluXG4gKlxuICogUmVmOiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jYm9keVxuICpcbiAqIEBwYXJhbSAgIFN0cmVhbSAgYm9keSAgUmVhZGFibGUgc3RyZWFtXG4gKiBAcGFyYW0gICBPYmplY3QgIG9wdHMgIFJlc3BvbnNlIG9wdGlvbnNcbiAqIEByZXR1cm4gIFZvaWRcbiAqL1xuY2xhc3MgQm9keSB7XG5cdGNvbnN0cnVjdG9yKGJvZHksIHtcblx0XHRzaXplID0gMFxuXHR9ID0ge30pIHtcblx0XHRsZXQgYm91bmRhcnkgPSBudWxsO1xuXG5cdFx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHRcdC8vIEJvZHkgaXMgdW5kZWZpbmVkIG9yIG51bGxcblx0XHRcdGJvZHkgPSBudWxsO1xuXHRcdH0gZWxzZSBpZiAoaXNVUkxTZWFyY2hQYXJhbWV0ZXJzKGJvZHkpKSB7XG5cdFx0Ly8gQm9keSBpcyBhIFVSTFNlYXJjaFBhcmFtc1xuXHRcdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKGJvZHkudG9TdHJpbmcoKSk7XG5cdFx0fSBlbHNlIGlmIChpc0Jsb2IoYm9keSkpIDsgZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpKSA7IGVsc2UgaWYgKHV0aWwudHlwZXMuaXNBbnlBcnJheUJ1ZmZlcihib2R5KSkge1xuXHRcdFx0Ly8gQm9keSBpcyBBcnJheUJ1ZmZlclxuXHRcdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKGJvZHkpO1xuXHRcdH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGJvZHkpKSB7XG5cdFx0XHQvLyBCb2R5IGlzIEFycmF5QnVmZmVyVmlld1xuXHRcdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKGJvZHkuYnVmZmVyLCBib2R5LmJ5dGVPZmZzZXQsIGJvZHkuYnl0ZUxlbmd0aCk7XG5cdFx0fSBlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgU3RyZWFtKSA7IGVsc2UgaWYgKGlzRm9ybURhdGEoYm9keSkpIHtcblx0XHRcdC8vIEJvZHkgaXMgYW4gaW5zdGFuY2Ugb2YgZm9ybWRhdGEtbm9kZVxuXHRcdFx0Ym91bmRhcnkgPSBgTm9kZUZldGNoRm9ybURhdGFCb3VuZGFyeSR7Z2V0Qm91bmRhcnkoKX1gO1xuXHRcdFx0Ym9keSA9IFN0cmVhbS5SZWFkYWJsZS5mcm9tKGZvcm1EYXRhSXRlcmF0b3IoYm9keSwgYm91bmRhcnkpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gTm9uZSBvZiB0aGUgYWJvdmVcblx0XHRcdC8vIGNvZXJjZSB0byBzdHJpbmcgdGhlbiBidWZmZXJcblx0XHRcdGJvZHkgPSBCdWZmZXIuZnJvbShTdHJpbmcoYm9keSkpO1xuXHRcdH1cblxuXHRcdHRoaXNbSU5URVJOQUxTXSA9IHtcblx0XHRcdGJvZHksXG5cdFx0XHRib3VuZGFyeSxcblx0XHRcdGRpc3R1cmJlZDogZmFsc2UsXG5cdFx0XHRlcnJvcjogbnVsbFxuXHRcdH07XG5cdFx0dGhpcy5zaXplID0gc2l6ZTtcblxuXHRcdGlmIChib2R5IGluc3RhbmNlb2YgU3RyZWFtKSB7XG5cdFx0XHRib2R5Lm9uKCdlcnJvcicsIGVyciA9PiB7XG5cdFx0XHRcdGNvbnN0IGVycm9yID0gZXJyIGluc3RhbmNlb2YgRmV0Y2hCYXNlRXJyb3IgP1xuXHRcdFx0XHRcdGVyciA6XG5cdFx0XHRcdFx0bmV3IEZldGNoRXJyb3IoYEludmFsaWQgcmVzcG9uc2UgYm9keSB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggJHt0aGlzLnVybH06ICR7ZXJyLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycik7XG5cdFx0XHRcdHRoaXNbSU5URVJOQUxTXS5lcnJvciA9IGVycm9yO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IGJvZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS5ib2R5O1xuXHR9XG5cblx0Z2V0IGJvZHlVc2VkKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMU10uZGlzdHVyYmVkO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlY29kZSByZXNwb25zZSBhcyBBcnJheUJ1ZmZlclxuXHQgKlxuXHQgKiBAcmV0dXJuICBQcm9taXNlXG5cdCAqL1xuXHRhc3luYyBhcnJheUJ1ZmZlcigpIHtcblx0XHRjb25zdCB7YnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RofSA9IGF3YWl0IGNvbnN1bWVCb2R5KHRoaXMpO1xuXHRcdHJldHVybiBidWZmZXIuc2xpY2UoYnl0ZU9mZnNldCwgYnl0ZU9mZnNldCArIGJ5dGVMZW5ndGgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiByYXcgcmVzcG9uc2UgYXMgQmxvYlxuXHQgKlxuXHQgKiBAcmV0dXJuIFByb21pc2Vcblx0ICovXG5cdGFzeW5jIGJsb2IoKSB7XG5cdFx0Y29uc3QgY3QgPSAodGhpcy5oZWFkZXJzICYmIHRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB8fCAodGhpc1tJTlRFUk5BTFNdLmJvZHkgJiYgdGhpc1tJTlRFUk5BTFNdLmJvZHkudHlwZSkgfHwgJyc7XG5cdFx0Y29uc3QgYnVmID0gYXdhaXQgdGhpcy5idWZmZXIoKTtcblxuXHRcdHJldHVybiBuZXcgQmxvYihbYnVmXSwge1xuXHRcdFx0dHlwZTogY3Rcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWNvZGUgcmVzcG9uc2UgYXMganNvblxuXHQgKlxuXHQgKiBAcmV0dXJuICBQcm9taXNlXG5cdCAqL1xuXHRhc3luYyBqc29uKCkge1xuXHRcdGNvbnN0IGJ1ZmZlciA9IGF3YWl0IGNvbnN1bWVCb2R5KHRoaXMpO1xuXHRcdHJldHVybiBKU09OLnBhcnNlKGJ1ZmZlci50b1N0cmluZygpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWNvZGUgcmVzcG9uc2UgYXMgdGV4dFxuXHQgKlxuXHQgKiBAcmV0dXJuICBQcm9taXNlXG5cdCAqL1xuXHRhc3luYyB0ZXh0KCkge1xuXHRcdGNvbnN0IGJ1ZmZlciA9IGF3YWl0IGNvbnN1bWVCb2R5KHRoaXMpO1xuXHRcdHJldHVybiBidWZmZXIudG9TdHJpbmcoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWNvZGUgcmVzcG9uc2UgYXMgYnVmZmVyIChub24tc3BlYyBhcGkpXG5cdCAqXG5cdCAqIEByZXR1cm4gIFByb21pc2Vcblx0ICovXG5cdGJ1ZmZlcigpIHtcblx0XHRyZXR1cm4gY29uc3VtZUJvZHkodGhpcyk7XG5cdH1cbn1cblxuLy8gSW4gYnJvd3NlcnMsIGFsbCBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhYmxlLlxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQm9keS5wcm90b3R5cGUsIHtcblx0Ym9keToge2VudW1lcmFibGU6IHRydWV9LFxuXHRib2R5VXNlZDoge2VudW1lcmFibGU6IHRydWV9LFxuXHRhcnJheUJ1ZmZlcjoge2VudW1lcmFibGU6IHRydWV9LFxuXHRibG9iOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGpzb246IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0dGV4dDoge2VudW1lcmFibGU6IHRydWV9XG59KTtcblxuLyoqXG4gKiBDb25zdW1lIGFuZCBjb252ZXJ0IGFuIGVudGlyZSBCb2R5IHRvIGEgQnVmZmVyLlxuICpcbiAqIFJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtYm9keS1jb25zdW1lLWJvZHlcbiAqXG4gKiBAcmV0dXJuIFByb21pc2VcbiAqL1xuYXN5bmMgZnVuY3Rpb24gY29uc3VtZUJvZHkoZGF0YSkge1xuXHRpZiAoZGF0YVtJTlRFUk5BTFNdLmRpc3R1cmJlZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYGJvZHkgdXNlZCBhbHJlYWR5IGZvcjogJHtkYXRhLnVybH1gKTtcblx0fVxuXG5cdGRhdGFbSU5URVJOQUxTXS5kaXN0dXJiZWQgPSB0cnVlO1xuXG5cdGlmIChkYXRhW0lOVEVSTkFMU10uZXJyb3IpIHtcblx0XHR0aHJvdyBkYXRhW0lOVEVSTkFMU10uZXJyb3I7XG5cdH1cblxuXHRsZXQge2JvZHl9ID0gZGF0YTtcblxuXHQvLyBCb2R5IGlzIG51bGxcblx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHRyZXR1cm4gQnVmZmVyLmFsbG9jKDApO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBibG9iXG5cdGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRib2R5ID0gYm9keS5zdHJlYW0oKTtcblx0fVxuXG5cdC8vIEJvZHkgaXMgYnVmZmVyXG5cdGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHRyZXR1cm4gYm9keTtcblx0fVxuXG5cdC8qIGM4IGlnbm9yZSBuZXh0IDMgKi9cblx0aWYgKCEoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkpIHtcblx0XHRyZXR1cm4gQnVmZmVyLmFsbG9jKDApO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBzdHJlYW1cblx0Ly8gZ2V0IHJlYWR5IHRvIGFjdHVhbGx5IGNvbnN1bWUgdGhlIGJvZHlcblx0Y29uc3QgYWNjdW0gPSBbXTtcblx0bGV0IGFjY3VtQnl0ZXMgPSAwO1xuXG5cdHRyeSB7XG5cdFx0Zm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBib2R5KSB7XG5cdFx0XHRpZiAoZGF0YS5zaXplID4gMCAmJiBhY2N1bUJ5dGVzICsgY2h1bmsubGVuZ3RoID4gZGF0YS5zaXplKSB7XG5cdFx0XHRcdGNvbnN0IGVyciA9IG5ldyBGZXRjaEVycm9yKGBjb250ZW50IHNpemUgYXQgJHtkYXRhLnVybH0gb3ZlciBsaW1pdDogJHtkYXRhLnNpemV9YCwgJ21heC1zaXplJyk7XG5cdFx0XHRcdGJvZHkuZGVzdHJveShlcnIpO1xuXHRcdFx0XHR0aHJvdyBlcnI7XG5cdFx0XHR9XG5cblx0XHRcdGFjY3VtQnl0ZXMgKz0gY2h1bmsubGVuZ3RoO1xuXHRcdFx0YWNjdW0ucHVzaChjaHVuayk7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGlmIChlcnJvciBpbnN0YW5jZW9mIEZldGNoQmFzZUVycm9yKSB7XG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gT3RoZXIgZXJyb3JzLCBzdWNoIGFzIGluY29ycmVjdCBjb250ZW50LWVuY29kaW5nXG5cdFx0XHR0aHJvdyBuZXcgRmV0Y2hFcnJvcihgSW52YWxpZCByZXNwb25zZSBib2R5IHdoaWxlIHRyeWluZyB0byBmZXRjaCAke2RhdGEudXJsfTogJHtlcnJvci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnJvcik7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGJvZHkucmVhZGFibGVFbmRlZCA9PT0gdHJ1ZSB8fCBib2R5Ll9yZWFkYWJsZVN0YXRlLmVuZGVkID09PSB0cnVlKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmIChhY2N1bS5ldmVyeShjID0+IHR5cGVvZiBjID09PSAnc3RyaW5nJykpIHtcblx0XHRcdFx0cmV0dXJuIEJ1ZmZlci5mcm9tKGFjY3VtLmpvaW4oJycpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIEJ1ZmZlci5jb25jYXQoYWNjdW0sIGFjY3VtQnl0ZXMpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHR0aHJvdyBuZXcgRmV0Y2hFcnJvcihgQ291bGQgbm90IGNyZWF0ZSBCdWZmZXIgZnJvbSByZXNwb25zZSBib2R5IGZvciAke2RhdGEudXJsfTogJHtlcnJvci5tZXNzYWdlfWAsICdzeXN0ZW0nLCBlcnJvcik7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBGZXRjaEVycm9yKGBQcmVtYXR1cmUgY2xvc2Ugb2Ygc2VydmVyIHJlc3BvbnNlIHdoaWxlIHRyeWluZyB0byBmZXRjaCAke2RhdGEudXJsfWApO1xuXHR9XG59XG5cbi8qKlxuICogQ2xvbmUgYm9keSBnaXZlbiBSZXMvUmVxIGluc3RhbmNlXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICBpbnN0YW5jZSAgICAgICBSZXNwb25zZSBvciBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcGFyYW0gICBTdHJpbmcgIGhpZ2hXYXRlck1hcmsgIGhpZ2hXYXRlck1hcmsgZm9yIGJvdGggUGFzc1Rocm91Z2ggYm9keSBzdHJlYW1zXG4gKiBAcmV0dXJuICBNaXhlZFxuICovXG5jb25zdCBjbG9uZSA9IChpbnN0YW5jZSwgaGlnaFdhdGVyTWFyaykgPT4ge1xuXHRsZXQgcDE7XG5cdGxldCBwMjtcblx0bGV0IHtib2R5fSA9IGluc3RhbmNlO1xuXG5cdC8vIERvbid0IGFsbG93IGNsb25pbmcgYSB1c2VkIGJvZHlcblx0aWYgKGluc3RhbmNlLmJvZHlVc2VkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgY2xvbmUgYm9keSBhZnRlciBpdCBpcyB1c2VkJyk7XG5cdH1cblxuXHQvLyBDaGVjayB0aGF0IGJvZHkgaXMgYSBzdHJlYW0gYW5kIG5vdCBmb3JtLWRhdGEgb2JqZWN0XG5cdC8vIG5vdGU6IHdlIGNhbid0IGNsb25lIHRoZSBmb3JtLWRhdGEgb2JqZWN0IHdpdGhvdXQgaGF2aW5nIGl0IGFzIGEgZGVwZW5kZW5jeVxuXHRpZiAoKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pICYmICh0eXBlb2YgYm9keS5nZXRCb3VuZGFyeSAhPT0gJ2Z1bmN0aW9uJykpIHtcblx0XHQvLyBUZWUgaW5zdGFuY2UgYm9keVxuXHRcdHAxID0gbmV3IFN0cmVhbS5QYXNzVGhyb3VnaCh7aGlnaFdhdGVyTWFya30pO1xuXHRcdHAyID0gbmV3IFN0cmVhbS5QYXNzVGhyb3VnaCh7aGlnaFdhdGVyTWFya30pO1xuXHRcdGJvZHkucGlwZShwMSk7XG5cdFx0Ym9keS5waXBlKHAyKTtcblx0XHQvLyBTZXQgaW5zdGFuY2UgYm9keSB0byB0ZWVkIGJvZHkgYW5kIHJldHVybiB0aGUgb3RoZXIgdGVlZCBib2R5XG5cdFx0aW5zdGFuY2VbSU5URVJOQUxTXS5ib2R5ID0gcDE7XG5cdFx0Ym9keSA9IHAyO1xuXHR9XG5cblx0cmV0dXJuIGJvZHk7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIHRoZSBvcGVyYXRpb24gXCJleHRyYWN0IGEgYENvbnRlbnQtVHlwZWAgdmFsdWUgZnJvbSB8b2JqZWN0fFwiIGFzXG4gKiBzcGVjaWZpZWQgaW4gdGhlIHNwZWNpZmljYXRpb246XG4gKiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5aW5pdC1leHRyYWN0XG4gKlxuICogVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgaW5zdGFuY2UuYm9keSBpcyBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7YW55fSBib2R5IEFueSBvcHRpb25zLmJvZHkgaW5wdXRcbiAqIEByZXR1cm5zIHtzdHJpbmcgfCBudWxsfVxuICovXG5jb25zdCBleHRyYWN0Q29udGVudFR5cGUgPSAoYm9keSwgcmVxdWVzdCkgPT4ge1xuXHQvLyBCb2R5IGlzIG51bGwgb3IgdW5kZWZpbmVkXG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHQvLyBCb2R5IGlzIHN0cmluZ1xuXHRpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBhIFVSTFNlYXJjaFBhcmFtc1xuXHRpZiAoaXNVUkxTZWFyY2hQYXJhbWV0ZXJzKGJvZHkpKSB7XG5cdFx0cmV0dXJuICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCc7XG5cdH1cblxuXHQvLyBCb2R5IGlzIGJsb2Jcblx0aWYgKGlzQmxvYihib2R5KSkge1xuXHRcdHJldHVybiBib2R5LnR5cGUgfHwgbnVsbDtcblx0fVxuXG5cdC8vIEJvZHkgaXMgYSBCdWZmZXIgKEJ1ZmZlciwgQXJyYXlCdWZmZXIgb3IgQXJyYXlCdWZmZXJWaWV3KVxuXHRpZiAoQnVmZmVyLmlzQnVmZmVyKGJvZHkpIHx8IHV0aWwudHlwZXMuaXNBbnlBcnJheUJ1ZmZlcihib2R5KSB8fCBBcnJheUJ1ZmZlci5pc1ZpZXcoYm9keSkpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdC8vIERldGVjdCBmb3JtIGRhdGEgaW5wdXQgZnJvbSBmb3JtLWRhdGEgbW9kdWxlXG5cdGlmIChib2R5ICYmIHR5cGVvZiBib2R5LmdldEJvdW5kYXJ5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGBtdWx0aXBhcnQvZm9ybS1kYXRhO2JvdW5kYXJ5PSR7Ym9keS5nZXRCb3VuZGFyeSgpfWA7XG5cdH1cblxuXHRpZiAoaXNGb3JtRGF0YShib2R5KSkge1xuXHRcdHJldHVybiBgbXVsdGlwYXJ0L2Zvcm0tZGF0YTsgYm91bmRhcnk9JHtyZXF1ZXN0W0lOVEVSTkFMU10uYm91bmRhcnl9YDtcblx0fVxuXG5cdC8vIEJvZHkgaXMgc3RyZWFtIC0gY2FuJ3QgcmVhbGx5IGRvIG11Y2ggYWJvdXQgdGhpc1xuXHRpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gQm9keSBjb25zdHJ1Y3RvciBkZWZhdWx0cyBvdGhlciB0aGluZ3MgdG8gc3RyaW5nXG5cdHJldHVybiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jztcbn07XG5cbi8qKlxuICogVGhlIEZldGNoIFN0YW5kYXJkIHRyZWF0cyB0aGlzIGFzIGlmIFwidG90YWwgYnl0ZXNcIiBpcyBhIHByb3BlcnR5IG9uIHRoZSBib2R5LlxuICogRm9yIHVzLCB3ZSBoYXZlIHRvIGV4cGxpY2l0bHkgZ2V0IGl0IHdpdGggYSBmdW5jdGlvbi5cbiAqXG4gKiByZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LWJvZHktdG90YWwtYnl0ZXNcbiAqXG4gKiBAcGFyYW0ge2FueX0gb2JqLmJvZHkgQm9keSBvYmplY3QgZnJvbSB0aGUgQm9keSBpbnN0YW5jZS5cbiAqIEByZXR1cm5zIHtudW1iZXIgfCBudWxsfVxuICovXG5jb25zdCBnZXRUb3RhbEJ5dGVzID0gcmVxdWVzdCA9PiB7XG5cdGNvbnN0IHtib2R5fSA9IHJlcXVlc3Q7XG5cblx0Ly8gQm9keSBpcyBudWxsIG9yIHVuZGVmaW5lZFxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBCbG9iXG5cdGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRyZXR1cm4gYm9keS5zaXplO1xuXHR9XG5cblx0Ly8gQm9keSBpcyBCdWZmZXJcblx0aWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkge1xuXHRcdHJldHVybiBib2R5Lmxlbmd0aDtcblx0fVxuXG5cdC8vIERldGVjdCBmb3JtIGRhdGEgaW5wdXQgZnJvbSBmb3JtLWRhdGEgbW9kdWxlXG5cdGlmIChib2R5ICYmIHR5cGVvZiBib2R5LmdldExlbmd0aFN5bmMgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gYm9keS5oYXNLbm93bkxlbmd0aCAmJiBib2R5Lmhhc0tub3duTGVuZ3RoKCkgPyBib2R5LmdldExlbmd0aFN5bmMoKSA6IG51bGw7XG5cdH1cblxuXHQvLyBCb2R5IGlzIGEgc3BlYy1jb21wbGlhbnQgZm9ybS1kYXRhXG5cdGlmIChpc0Zvcm1EYXRhKGJvZHkpKSB7XG5cdFx0cmV0dXJuIGdldEZvcm1EYXRhTGVuZ3RoKHJlcXVlc3RbSU5URVJOQUxTXS5ib3VuZGFyeSk7XG5cdH1cblxuXHQvLyBCb2R5IGlzIHN0cmVhbVxuXHRyZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogV3JpdGUgYSBCb2R5IHRvIGEgTm9kZS5qcyBXcml0YWJsZVN0cmVhbSAoZS5nLiBodHRwLlJlcXVlc3QpIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmVhbS5Xcml0YWJsZX0gZGVzdCBUaGUgc3RyZWFtIHRvIHdyaXRlIHRvLlxuICogQHBhcmFtIG9iai5ib2R5IEJvZHkgb2JqZWN0IGZyb20gdGhlIEJvZHkgaW5zdGFuY2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3Qgd3JpdGVUb1N0cmVhbSA9IChkZXN0LCB7Ym9keX0pID0+IHtcblx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHQvLyBCb2R5IGlzIG51bGxcblx0XHRkZXN0LmVuZCgpO1xuXHR9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkge1xuXHRcdC8vIEJvZHkgaXMgQmxvYlxuXHRcdGJvZHkuc3RyZWFtKCkucGlwZShkZXN0KTtcblx0fSBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHQvLyBCb2R5IGlzIGJ1ZmZlclxuXHRcdGRlc3Qud3JpdGUoYm9keSk7XG5cdFx0ZGVzdC5lbmQoKTtcblx0fSBlbHNlIHtcblx0XHQvLyBCb2R5IGlzIHN0cmVhbVxuXHRcdGJvZHkucGlwZShkZXN0KTtcblx0fVxufTtcblxuLyoqXG4gKiBIZWFkZXJzLmpzXG4gKlxuICogSGVhZGVycyBjbGFzcyBvZmZlcnMgY29udmVuaWVudCBoZWxwZXJzXG4gKi9cblxuY29uc3QgdmFsaWRhdGVIZWFkZXJOYW1lID0gdHlwZW9mIGh0dHAudmFsaWRhdGVIZWFkZXJOYW1lID09PSAnZnVuY3Rpb24nID9cblx0aHR0cC52YWxpZGF0ZUhlYWRlck5hbWUgOlxuXHRuYW1lID0+IHtcblx0XHRpZiAoIS9eW1xcXmBcXC1cXHchIyQlJicqKy58fl0rJC8udGVzdChuYW1lKSkge1xuXHRcdFx0Y29uc3QgZXJyID0gbmV3IFR5cGVFcnJvcihgSGVhZGVyIG5hbWUgbXVzdCBiZSBhIHZhbGlkIEhUVFAgdG9rZW4gWyR7bmFtZX1dYCk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyLCAnY29kZScsIHt2YWx1ZTogJ0VSUl9JTlZBTElEX0hUVFBfVE9LRU4nfSk7XG5cdFx0XHR0aHJvdyBlcnI7XG5cdFx0fVxuXHR9O1xuXG5jb25zdCB2YWxpZGF0ZUhlYWRlclZhbHVlID0gdHlwZW9mIGh0dHAudmFsaWRhdGVIZWFkZXJWYWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/XG5cdGh0dHAudmFsaWRhdGVIZWFkZXJWYWx1ZSA6XG5cdChuYW1lLCB2YWx1ZSkgPT4ge1xuXHRcdGlmICgvW15cXHRcXHUwMDIwLVxcdTAwN0VcXHUwMDgwLVxcdTAwRkZdLy50ZXN0KHZhbHVlKSkge1xuXHRcdFx0Y29uc3QgZXJyID0gbmV3IFR5cGVFcnJvcihgSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGNvbnRlbnQgW1wiJHtuYW1lfVwiXWApO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGVyciwgJ2NvZGUnLCB7dmFsdWU6ICdFUlJfSU5WQUxJRF9DSEFSJ30pO1xuXHRcdFx0dGhyb3cgZXJyO1xuXHRcdH1cblx0fTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7SGVhZGVycyB8IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gfCBJdGVyYWJsZTxyZWFkb25seSBbc3RyaW5nLCBzdHJpbmddPiB8IEl0ZXJhYmxlPEl0ZXJhYmxlPHN0cmluZz4+fSBIZWFkZXJzSW5pdFxuICovXG5cbi8qKlxuICogVGhpcyBGZXRjaCBBUEkgaW50ZXJmYWNlIGFsbG93cyB5b3UgdG8gcGVyZm9ybSB2YXJpb3VzIGFjdGlvbnMgb24gSFRUUCByZXF1ZXN0IGFuZCByZXNwb25zZSBoZWFkZXJzLlxuICogVGhlc2UgYWN0aW9ucyBpbmNsdWRlIHJldHJpZXZpbmcsIHNldHRpbmcsIGFkZGluZyB0bywgYW5kIHJlbW92aW5nLlxuICogQSBIZWFkZXJzIG9iamVjdCBoYXMgYW4gYXNzb2NpYXRlZCBoZWFkZXIgbGlzdCwgd2hpY2ggaXMgaW5pdGlhbGx5IGVtcHR5IGFuZCBjb25zaXN0cyBvZiB6ZXJvIG9yIG1vcmUgbmFtZSBhbmQgdmFsdWUgcGFpcnMuXG4gKiBZb3UgY2FuIGFkZCB0byB0aGlzIHVzaW5nIG1ldGhvZHMgbGlrZSBhcHBlbmQoKSAoc2VlIEV4YW1wbGVzLilcbiAqIEluIGFsbCBtZXRob2RzIG9mIHRoaXMgaW50ZXJmYWNlLCBoZWFkZXIgbmFtZXMgYXJlIG1hdGNoZWQgYnkgY2FzZS1pbnNlbnNpdGl2ZSBieXRlIHNlcXVlbmNlLlxuICpcbiAqL1xuY2xhc3MgSGVhZGVycyBleHRlbmRzIFVSTFNlYXJjaFBhcmFtcyB7XG5cdC8qKlxuXHQgKiBIZWFkZXJzIGNsYXNzXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0hlYWRlcnNJbml0fSBbaW5pdF0gLSBSZXNwb25zZSBoZWFkZXJzXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihpbml0KSB7XG5cdFx0Ly8gVmFsaWRhdGUgYW5kIG5vcm1hbGl6ZSBpbml0IG9iamVjdCBpbiBbbmFtZSwgdmFsdWUocyldW11cblx0XHQvKiogQHR5cGUge3N0cmluZ1tdW119ICovXG5cdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdGlmIChpbml0IGluc3RhbmNlb2YgSGVhZGVycykge1xuXHRcdFx0Y29uc3QgcmF3ID0gaW5pdC5yYXcoKTtcblx0XHRcdGZvciAoY29uc3QgW25hbWUsIHZhbHVlc10gb2YgT2JqZWN0LmVudHJpZXMocmF3KSkge1xuXHRcdFx0XHRyZXN1bHQucHVzaCguLi52YWx1ZXMubWFwKHZhbHVlID0+IFtuYW1lLCB2YWx1ZV0pKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGluaXQgPT0gbnVsbCkgOyBlbHNlIGlmICh0eXBlb2YgaW5pdCA9PT0gJ29iamVjdCcgJiYgIXV0aWwudHlwZXMuaXNCb3hlZFByaW1pdGl2ZShpbml0KSkge1xuXHRcdFx0Y29uc3QgbWV0aG9kID0gaW5pdFtTeW1ib2wuaXRlcmF0b3JdO1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsIGVxZXFlcVxuXHRcdFx0aWYgKG1ldGhvZCA9PSBudWxsKSB7XG5cdFx0XHRcdC8vIFJlY29yZDxCeXRlU3RyaW5nLCBCeXRlU3RyaW5nPlxuXHRcdFx0XHRyZXN1bHQucHVzaCguLi5PYmplY3QuZW50cmllcyhpbml0KSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAodHlwZW9mIG1ldGhvZCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0hlYWRlciBwYWlycyBtdXN0IGJlIGl0ZXJhYmxlJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTZXF1ZW5jZTxzZXF1ZW5jZTxCeXRlU3RyaW5nPj5cblx0XHRcdFx0Ly8gTm90ZTogcGVyIHNwZWMgd2UgaGF2ZSB0byBmaXJzdCBleGhhdXN0IHRoZSBsaXN0cyB0aGVuIHByb2Nlc3MgdGhlbVxuXHRcdFx0XHRyZXN1bHQgPSBbLi4uaW5pdF1cblx0XHRcdFx0XHQubWFwKHBhaXIgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHR0eXBlb2YgcGFpciAhPT0gJ29iamVjdCcgfHwgdXRpbC50eXBlcy5pc0JveGVkUHJpbWl0aXZlKHBhaXIpXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRWFjaCBoZWFkZXIgcGFpciBtdXN0IGJlIGFuIGl0ZXJhYmxlIG9iamVjdCcpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gWy4uLnBhaXJdO1xuXHRcdFx0XHRcdH0pLm1hcChwYWlyID0+IHtcblx0XHRcdFx0XHRcdGlmIChwYWlyLmxlbmd0aCAhPT0gMikge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFYWNoIGhlYWRlciBwYWlyIG11c3QgYmUgYSBuYW1lL3ZhbHVlIHR1cGxlJyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiBbLi4ucGFpcl07XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZhaWxlZCB0byBjb25zdHJ1Y3QgXFwnSGVhZGVyc1xcJzogVGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBvZiB0eXBlIFxcJyhzZXF1ZW5jZTxzZXF1ZW5jZTxCeXRlU3RyaW5nPj4gb3IgcmVjb3JkPEJ5dGVTdHJpbmcsIEJ5dGVTdHJpbmc+KScpO1xuXHRcdH1cblxuXHRcdC8vIFZhbGlkYXRlIGFuZCBsb3dlcmNhc2Vcblx0XHRyZXN1bHQgPVxuXHRcdFx0cmVzdWx0Lmxlbmd0aCA+IDAgP1xuXHRcdFx0XHRyZXN1bHQubWFwKChbbmFtZSwgdmFsdWVdKSA9PiB7XG5cdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJOYW1lKG5hbWUpO1xuXHRcdFx0XHRcdHZhbGlkYXRlSGVhZGVyVmFsdWUobmFtZSwgU3RyaW5nKHZhbHVlKSk7XG5cdFx0XHRcdFx0cmV0dXJuIFtTdHJpbmcobmFtZSkudG9Mb3dlckNhc2UoKSwgU3RyaW5nKHZhbHVlKV07XG5cdFx0XHRcdH0pIDpcblx0XHRcdFx0dW5kZWZpbmVkO1xuXG5cdFx0c3VwZXIocmVzdWx0KTtcblxuXHRcdC8vIFJldHVybmluZyBhIFByb3h5IHRoYXQgd2lsbCBsb3dlcmNhc2Uga2V5IG5hbWVzLCB2YWxpZGF0ZSBwYXJhbWV0ZXJzIGFuZCBzb3J0IGtleXNcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RydWN0b3ItcmV0dXJuXG5cdFx0cmV0dXJuIG5ldyBQcm94eSh0aGlzLCB7XG5cdFx0XHRnZXQodGFyZ2V0LCBwLCByZWNlaXZlcikge1xuXHRcdFx0XHRzd2l0Y2ggKHApIHtcblx0XHRcdFx0XHRjYXNlICdhcHBlbmQnOlxuXHRcdFx0XHRcdGNhc2UgJ3NldCc6XG5cdFx0XHRcdFx0XHRyZXR1cm4gKG5hbWUsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHZhbGlkYXRlSGVhZGVyTmFtZShuYW1lKTtcblx0XHRcdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJWYWx1ZShuYW1lLCBTdHJpbmcodmFsdWUpKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGVbcF0uY2FsbChcblx0XHRcdFx0XHRcdFx0XHRyZWNlaXZlcixcblx0XHRcdFx0XHRcdFx0XHRTdHJpbmcobmFtZSkudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdFx0XHRTdHJpbmcodmFsdWUpXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y2FzZSAnZGVsZXRlJzpcblx0XHRcdFx0XHRjYXNlICdoYXMnOlxuXHRcdFx0XHRcdGNhc2UgJ2dldEFsbCc6XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmFtZSA9PiB7XG5cdFx0XHRcdFx0XHRcdHZhbGlkYXRlSGVhZGVyTmFtZShuYW1lKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGVbcF0uY2FsbChcblx0XHRcdFx0XHRcdFx0XHRyZWNlaXZlcixcblx0XHRcdFx0XHRcdFx0XHRTdHJpbmcobmFtZSkudG9Mb3dlckNhc2UoKVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGNhc2UgJ2tleXMnOlxuXHRcdFx0XHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0XHRcdFx0dGFyZ2V0LnNvcnQoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG5ldyBTZXQoVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5rZXlzLmNhbGwodGFyZ2V0KSkua2V5cygpO1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwLCByZWNlaXZlcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8qIGM4IGlnbm9yZSBuZXh0ICovXG5cdFx0fSk7XG5cdH1cblxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IubmFtZTtcblx0fVxuXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcyk7XG5cdH1cblxuXHRnZXQobmFtZSkge1xuXHRcdGNvbnN0IHZhbHVlcyA9IHRoaXMuZ2V0QWxsKG5hbWUpO1xuXHRcdGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRsZXQgdmFsdWUgPSB2YWx1ZXMuam9pbignLCAnKTtcblx0XHRpZiAoL15jb250ZW50LWVuY29kaW5nJC9pLnRlc3QobmFtZSkpIHtcblx0XHRcdHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHRmb3JFYWNoKGNhbGxiYWNrKSB7XG5cdFx0Zm9yIChjb25zdCBuYW1lIG9mIHRoaXMua2V5cygpKSB7XG5cdFx0XHRjYWxsYmFjayh0aGlzLmdldChuYW1lKSwgbmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0KiB2YWx1ZXMoKSB7XG5cdFx0Zm9yIChjb25zdCBuYW1lIG9mIHRoaXMua2V5cygpKSB7XG5cdFx0XHR5aWVsZCB0aGlzLmdldChuYW1lKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHR5cGUgeygpID0+IEl0ZXJhYmxlSXRlcmF0b3I8W3N0cmluZywgc3RyaW5nXT59XG5cdCAqL1xuXHQqIGVudHJpZXMoKSB7XG5cdFx0Zm9yIChjb25zdCBuYW1lIG9mIHRoaXMua2V5cygpKSB7XG5cdFx0XHR5aWVsZCBbbmFtZSwgdGhpcy5nZXQobmFtZSldO1xuXHRcdH1cblx0fVxuXG5cdFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuXHRcdHJldHVybiB0aGlzLmVudHJpZXMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBOb2RlLWZldGNoIG5vbi1zcGVjIG1ldGhvZFxuXHQgKiByZXR1cm5pbmcgYWxsIGhlYWRlcnMgYW5kIHRoZWlyIHZhbHVlcyBhcyBhcnJheVxuXHQgKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgc3RyaW5nW10+fVxuXHQgKi9cblx0cmF3KCkge1xuXHRcdHJldHVybiBbLi4udGhpcy5rZXlzKCldLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcblx0XHRcdHJlc3VsdFtrZXldID0gdGhpcy5nZXRBbGwoa2V5KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSwge30pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZvciBiZXR0ZXIgY29uc29sZS5sb2coaGVhZGVycykgYW5kIGFsc28gdG8gY29udmVydCBIZWFkZXJzIGludG8gTm9kZS5qcyBSZXF1ZXN0IGNvbXBhdGlibGUgZm9ybWF0XG5cdCAqL1xuXHRbU3ltYm9sLmZvcignbm9kZWpzLnV0aWwuaW5zcGVjdC5jdXN0b20nKV0oKSB7XG5cdFx0cmV0dXJuIFsuLi50aGlzLmtleXMoKV0ucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuXHRcdFx0Y29uc3QgdmFsdWVzID0gdGhpcy5nZXRBbGwoa2V5KTtcblx0XHRcdC8vIEh0dHAucmVxdWVzdCgpIG9ubHkgc3VwcG9ydHMgc3RyaW5nIGFzIEhvc3QgaGVhZGVyLlxuXHRcdFx0Ly8gVGhpcyBoYWNrIG1ha2VzIHNwZWNpZnlpbmcgY3VzdG9tIEhvc3QgaGVhZGVyIHBvc3NpYmxlLlxuXHRcdFx0aWYgKGtleSA9PT0gJ2hvc3QnKSB7XG5cdFx0XHRcdHJlc3VsdFtrZXldID0gdmFsdWVzWzBdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0W2tleV0gPSB2YWx1ZXMubGVuZ3RoID4gMSA/IHZhbHVlcyA6IHZhbHVlc1swXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LCB7fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBSZS1zaGFwaW5nIG9iamVjdCBmb3IgV2ViIElETCB0ZXN0c1xuICogT25seSBuZWVkIHRvIGRvIGl0IGZvciBvdmVycmlkZGVuIG1ldGhvZHNcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoXG5cdEhlYWRlcnMucHJvdG90eXBlLFxuXHRbJ2dldCcsICdlbnRyaWVzJywgJ2ZvckVhY2gnLCAndmFsdWVzJ10ucmVkdWNlKChyZXN1bHQsIHByb3BlcnR5KSA9PiB7XG5cdFx0cmVzdWx0W3Byb3BlcnR5XSA9IHtlbnVtZXJhYmxlOiB0cnVlfTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LCB7fSlcbik7XG5cbi8qKlxuICogQ3JlYXRlIGEgSGVhZGVycyBvYmplY3QgZnJvbSBhbiBodHRwLkluY29taW5nTWVzc2FnZS5yYXdIZWFkZXJzLCBpZ25vcmluZyB0aG9zZSB0aGF0IGRvXG4gKiBub3QgY29uZm9ybSB0byBIVFRQIGdyYW1tYXIgcHJvZHVjdGlvbnMuXG4gKiBAcGFyYW0ge2ltcG9ydCgnaHR0cCcpLkluY29taW5nTWVzc2FnZVsncmF3SGVhZGVycyddfSBoZWFkZXJzXG4gKi9cbmZ1bmN0aW9uIGZyb21SYXdIZWFkZXJzKGhlYWRlcnMgPSBbXSkge1xuXHRyZXR1cm4gbmV3IEhlYWRlcnMoXG5cdFx0aGVhZGVyc1xuXHRcdFx0Ly8gU3BsaXQgaW50byBwYWlyc1xuXHRcdFx0LnJlZHVjZSgocmVzdWx0LCB2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XG5cdFx0XHRcdGlmIChpbmRleCAlIDIgPT09IDApIHtcblx0XHRcdFx0XHRyZXN1bHQucHVzaChhcnJheS5zbGljZShpbmRleCwgaW5kZXggKyAyKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSwgW10pXG5cdFx0XHQuZmlsdGVyKChbbmFtZSwgdmFsdWVdKSA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dmFsaWRhdGVIZWFkZXJOYW1lKG5hbWUpO1xuXHRcdFx0XHRcdHZhbGlkYXRlSGVhZGVyVmFsdWUobmFtZSwgU3RyaW5nKHZhbHVlKSk7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH0gY2F0Y2gge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblxuXHQpO1xufVxuXG5jb25zdCByZWRpcmVjdFN0YXR1cyA9IG5ldyBTZXQoWzMwMSwgMzAyLCAzMDMsIDMwNywgMzA4XSk7XG5cbi8qKlxuICogUmVkaXJlY3QgY29kZSBtYXRjaGluZ1xuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlIC0gU3RhdHVzIGNvZGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzUmVkaXJlY3QgPSBjb2RlID0+IHtcblx0cmV0dXJuIHJlZGlyZWN0U3RhdHVzLmhhcyhjb2RlKTtcbn07XG5cbi8qKlxuICogUmVzcG9uc2UuanNcbiAqXG4gKiBSZXNwb25zZSBjbGFzcyBwcm92aWRlcyBjb250ZW50IGRlY29kaW5nXG4gKi9cblxuY29uc3QgSU5URVJOQUxTJDEgPSBTeW1ib2woJ1Jlc3BvbnNlIGludGVybmFscycpO1xuXG4vKipcbiAqIFJlc3BvbnNlIGNsYXNzXG4gKlxuICogQHBhcmFtICAgU3RyZWFtICBib2R5ICBSZWFkYWJsZSBzdHJlYW1cbiAqIEBwYXJhbSAgIE9iamVjdCAgb3B0cyAgUmVzcG9uc2Ugb3B0aW9uc1xuICogQHJldHVybiAgVm9pZFxuICovXG5jbGFzcyBSZXNwb25zZSBleHRlbmRzIEJvZHkge1xuXHRjb25zdHJ1Y3Rvcihib2R5ID0gbnVsbCwgb3B0aW9ucyA9IHt9KSB7XG5cdFx0c3VwZXIoYm9keSwgb3B0aW9ucyk7XG5cblx0XHRjb25zdCBzdGF0dXMgPSBvcHRpb25zLnN0YXR1cyB8fCAyMDA7XG5cdFx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG5cblx0XHRpZiAoYm9keSAhPT0gbnVsbCAmJiAhaGVhZGVycy5oYXMoJ0NvbnRlbnQtVHlwZScpKSB7XG5cdFx0XHRjb25zdCBjb250ZW50VHlwZSA9IGV4dHJhY3RDb250ZW50VHlwZShib2R5KTtcblx0XHRcdGlmIChjb250ZW50VHlwZSkge1xuXHRcdFx0XHRoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXNbSU5URVJOQUxTJDFdID0ge1xuXHRcdFx0dXJsOiBvcHRpb25zLnVybCxcblx0XHRcdHN0YXR1cyxcblx0XHRcdHN0YXR1c1RleHQ6IG9wdGlvbnMuc3RhdHVzVGV4dCB8fCAnJyxcblx0XHRcdGhlYWRlcnMsXG5cdFx0XHRjb3VudGVyOiBvcHRpb25zLmNvdW50ZXIsXG5cdFx0XHRoaWdoV2F0ZXJNYXJrOiBvcHRpb25zLmhpZ2hXYXRlck1hcmtcblx0XHR9O1xuXHR9XG5cblx0Z2V0IHVybCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0udXJsIHx8ICcnO1xuXHR9XG5cblx0Z2V0IHN0YXR1cygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uc3RhdHVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlbmllbmNlIHByb3BlcnR5IHJlcHJlc2VudGluZyBpZiB0aGUgcmVxdWVzdCBlbmRlZCBub3JtYWxseVxuXHQgKi9cblx0Z2V0IG9rKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXMgPj0gMjAwICYmIHRoaXNbSU5URVJOQUxTJDFdLnN0YXR1cyA8IDMwMDtcblx0fVxuXG5cdGdldCByZWRpcmVjdGVkKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5jb3VudGVyID4gMDtcblx0fVxuXG5cdGdldCBzdGF0dXNUZXh0KCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXNUZXh0O1xuXHR9XG5cblx0Z2V0IGhlYWRlcnMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLmhlYWRlcnM7XG5cdH1cblxuXHRnZXQgaGlnaFdhdGVyTWFyaygpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFMkMV0uaGlnaFdhdGVyTWFyaztcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZSB0aGlzIHJlc3BvbnNlXG5cdCAqXG5cdCAqIEByZXR1cm4gIFJlc3BvbnNlXG5cdCAqL1xuXHRjbG9uZSgpIHtcblx0XHRyZXR1cm4gbmV3IFJlc3BvbnNlKGNsb25lKHRoaXMsIHRoaXMuaGlnaFdhdGVyTWFyayksIHtcblx0XHRcdHVybDogdGhpcy51cmwsXG5cdFx0XHRzdGF0dXM6IHRoaXMuc3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuXHRcdFx0aGVhZGVyczogdGhpcy5oZWFkZXJzLFxuXHRcdFx0b2s6IHRoaXMub2ssXG5cdFx0XHRyZWRpcmVjdGVkOiB0aGlzLnJlZGlyZWN0ZWQsXG5cdFx0XHRzaXplOiB0aGlzLnNpemVcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdXJsICAgIFRoZSBVUkwgdGhhdCB0aGUgbmV3IHJlc3BvbnNlIGlzIHRvIG9yaWdpbmF0ZSBmcm9tLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gc3RhdHVzIEFuIG9wdGlvbmFsIHN0YXR1cyBjb2RlIGZvciB0aGUgcmVzcG9uc2UgKGUuZy4sIDMwMi4pXG5cdCAqIEByZXR1cm5zIHtSZXNwb25zZX0gICAgQSBSZXNwb25zZSBvYmplY3QuXG5cdCAqL1xuXHRzdGF0aWMgcmVkaXJlY3QodXJsLCBzdGF0dXMgPSAzMDIpIHtcblx0XHRpZiAoIWlzUmVkaXJlY3Qoc3RhdHVzKSkge1xuXHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ZhaWxlZCB0byBleGVjdXRlIFwicmVkaXJlY3RcIiBvbiBcInJlc3BvbnNlXCI6IEludmFsaWQgc3RhdHVzIGNvZGUnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0bG9jYXRpb246IG5ldyBVUkwodXJsKS50b1N0cmluZygpXG5cdFx0XHR9LFxuXHRcdFx0c3RhdHVzXG5cdFx0fSk7XG5cdH1cblxuXHRnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG5cdFx0cmV0dXJuICdSZXNwb25zZSc7XG5cdH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVzcG9uc2UucHJvdG90eXBlLCB7XG5cdHVybDoge2VudW1lcmFibGU6IHRydWV9LFxuXHRzdGF0dXM6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0b2s6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0cmVkaXJlY3RlZDoge2VudW1lcmFibGU6IHRydWV9LFxuXHRzdGF0dXNUZXh0OiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGhlYWRlcnM6IHtlbnVtZXJhYmxlOiB0cnVlfSxcblx0Y2xvbmU6IHtlbnVtZXJhYmxlOiB0cnVlfVxufSk7XG5cbmNvbnN0IGdldFNlYXJjaCA9IHBhcnNlZFVSTCA9PiB7XG5cdGlmIChwYXJzZWRVUkwuc2VhcmNoKSB7XG5cdFx0cmV0dXJuIHBhcnNlZFVSTC5zZWFyY2g7XG5cdH1cblxuXHRjb25zdCBsYXN0T2Zmc2V0ID0gcGFyc2VkVVJMLmhyZWYubGVuZ3RoIC0gMTtcblx0Y29uc3QgaGFzaCA9IHBhcnNlZFVSTC5oYXNoIHx8IChwYXJzZWRVUkwuaHJlZltsYXN0T2Zmc2V0XSA9PT0gJyMnID8gJyMnIDogJycpO1xuXHRyZXR1cm4gcGFyc2VkVVJMLmhyZWZbbGFzdE9mZnNldCAtIGhhc2gubGVuZ3RoXSA9PT0gJz8nID8gJz8nIDogJyc7XG59O1xuXG5jb25zdCBJTlRFUk5BTFMkMiA9IFN5bWJvbCgnUmVxdWVzdCBpbnRlcm5hbHMnKTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhbiBpbnN0YW5jZSBvZiBSZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSAgeyp9IG9ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNSZXF1ZXN0ID0gb2JqZWN0ID0+IHtcblx0cmV0dXJuIChcblx0XHR0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuXHRcdHR5cGVvZiBvYmplY3RbSU5URVJOQUxTJDJdID09PSAnb2JqZWN0J1xuXHQpO1xufTtcblxuLyoqXG4gKiBSZXF1ZXN0IGNsYXNzXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICBpbnB1dCAgVXJsIG9yIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIE9iamVjdCAgaW5pdCAgIEN1c3RvbSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmNsYXNzIFJlcXVlc3QgZXh0ZW5kcyBCb2R5IHtcblx0Y29uc3RydWN0b3IoaW5wdXQsIGluaXQgPSB7fSkge1xuXHRcdGxldCBwYXJzZWRVUkw7XG5cblx0XHQvLyBOb3JtYWxpemUgaW5wdXQgYW5kIGZvcmNlIFVSTCB0byBiZSBlbmNvZGVkIGFzIFVURi04IChodHRwczovL2dpdGh1Yi5jb20vbm9kZS1mZXRjaC9ub2RlLWZldGNoL2lzc3Vlcy8yNDUpXG5cdFx0aWYgKGlzUmVxdWVzdChpbnB1dCkpIHtcblx0XHRcdHBhcnNlZFVSTCA9IG5ldyBVUkwoaW5wdXQudXJsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGFyc2VkVVJMID0gbmV3IFVSTChpbnB1dCk7XG5cdFx0XHRpbnB1dCA9IHt9O1xuXHRcdH1cblxuXHRcdGxldCBtZXRob2QgPSBpbml0Lm1ldGhvZCB8fCBpbnB1dC5tZXRob2QgfHwgJ0dFVCc7XG5cdFx0bWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCwgZXFlcWVxXG5cdFx0aWYgKCgoaW5pdC5ib2R5ICE9IG51bGwgfHwgaXNSZXF1ZXN0KGlucHV0KSkgJiYgaW5wdXQuYm9keSAhPT0gbnVsbCkgJiZcblx0XHRcdChtZXRob2QgPT09ICdHRVQnIHx8IG1ldGhvZCA9PT0gJ0hFQUQnKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignUmVxdWVzdCB3aXRoIEdFVC9IRUFEIG1ldGhvZCBjYW5ub3QgaGF2ZSBib2R5Jyk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaW5wdXRCb2R5ID0gaW5pdC5ib2R5ID9cblx0XHRcdGluaXQuYm9keSA6XG5cdFx0XHQoaXNSZXF1ZXN0KGlucHV0KSAmJiBpbnB1dC5ib2R5ICE9PSBudWxsID9cblx0XHRcdFx0Y2xvbmUoaW5wdXQpIDpcblx0XHRcdFx0bnVsbCk7XG5cblx0XHRzdXBlcihpbnB1dEJvZHksIHtcblx0XHRcdHNpemU6IGluaXQuc2l6ZSB8fCBpbnB1dC5zaXplIHx8IDBcblx0XHR9KTtcblxuXHRcdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbml0LmhlYWRlcnMgfHwgaW5wdXQuaGVhZGVycyB8fCB7fSk7XG5cblx0XHRpZiAoaW5wdXRCb2R5ICE9PSBudWxsICYmICFoZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJykpIHtcblx0XHRcdGNvbnN0IGNvbnRlbnRUeXBlID0gZXh0cmFjdENvbnRlbnRUeXBlKGlucHV0Qm9keSwgdGhpcyk7XG5cdFx0XHRpZiAoY29udGVudFR5cGUpIHtcblx0XHRcdFx0aGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsZXQgc2lnbmFsID0gaXNSZXF1ZXN0KGlucHV0KSA/XG5cdFx0XHRpbnB1dC5zaWduYWwgOlxuXHRcdFx0bnVsbDtcblx0XHRpZiAoJ3NpZ25hbCcgaW4gaW5pdCkge1xuXHRcdFx0c2lnbmFsID0gaW5pdC5zaWduYWw7XG5cdFx0fVxuXG5cdFx0aWYgKHNpZ25hbCAhPT0gbnVsbCAmJiAhaXNBYm9ydFNpZ25hbChzaWduYWwpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBzaWduYWwgdG8gYmUgYW4gaW5zdGFuY2VvZiBBYm9ydFNpZ25hbCcpO1xuXHRcdH1cblxuXHRcdHRoaXNbSU5URVJOQUxTJDJdID0ge1xuXHRcdFx0bWV0aG9kLFxuXHRcdFx0cmVkaXJlY3Q6IGluaXQucmVkaXJlY3QgfHwgaW5wdXQucmVkaXJlY3QgfHwgJ2ZvbGxvdycsXG5cdFx0XHRoZWFkZXJzLFxuXHRcdFx0cGFyc2VkVVJMLFxuXHRcdFx0c2lnbmFsXG5cdFx0fTtcblxuXHRcdC8vIE5vZGUtZmV0Y2gtb25seSBvcHRpb25zXG5cdFx0dGhpcy5mb2xsb3cgPSBpbml0LmZvbGxvdyA9PT0gdW5kZWZpbmVkID8gKGlucHV0LmZvbGxvdyA9PT0gdW5kZWZpbmVkID8gMjAgOiBpbnB1dC5mb2xsb3cpIDogaW5pdC5mb2xsb3c7XG5cdFx0dGhpcy5jb21wcmVzcyA9IGluaXQuY29tcHJlc3MgPT09IHVuZGVmaW5lZCA/IChpbnB1dC5jb21wcmVzcyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlucHV0LmNvbXByZXNzKSA6IGluaXQuY29tcHJlc3M7XG5cdFx0dGhpcy5jb3VudGVyID0gaW5pdC5jb3VudGVyIHx8IGlucHV0LmNvdW50ZXIgfHwgMDtcblx0XHR0aGlzLmFnZW50ID0gaW5pdC5hZ2VudCB8fCBpbnB1dC5hZ2VudDtcblx0XHR0aGlzLmhpZ2hXYXRlck1hcmsgPSBpbml0LmhpZ2hXYXRlck1hcmsgfHwgaW5wdXQuaGlnaFdhdGVyTWFyayB8fCAxNjM4NDtcblx0XHR0aGlzLmluc2VjdXJlSFRUUFBhcnNlciA9IGluaXQuaW5zZWN1cmVIVFRQUGFyc2VyIHx8IGlucHV0Lmluc2VjdXJlSFRUUFBhcnNlciB8fCBmYWxzZTtcblx0fVxuXG5cdGdldCBtZXRob2QoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLm1ldGhvZDtcblx0fVxuXG5cdGdldCB1cmwoKSB7XG5cdFx0cmV0dXJuIHVybC5mb3JtYXQodGhpc1tJTlRFUk5BTFMkMl0ucGFyc2VkVVJMKTtcblx0fVxuXG5cdGdldCBoZWFkZXJzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5oZWFkZXJzO1xuXHR9XG5cblx0Z2V0IHJlZGlyZWN0KCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5yZWRpcmVjdDtcblx0fVxuXG5cdGdldCBzaWduYWwoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLnNpZ25hbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZSB0aGlzIHJlcXVlc3Rcblx0ICpcblx0ICogQHJldHVybiAgUmVxdWVzdFxuXHQgKi9cblx0Y2xvbmUoKSB7XG5cdFx0cmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMpO1xuXHR9XG5cblx0Z2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCkge1xuXHRcdHJldHVybiAnUmVxdWVzdCc7XG5cdH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVxdWVzdC5wcm90b3R5cGUsIHtcblx0bWV0aG9kOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHVybDoge2VudW1lcmFibGU6IHRydWV9LFxuXHRoZWFkZXJzOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHJlZGlyZWN0OiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdGNsb25lOiB7ZW51bWVyYWJsZTogdHJ1ZX0sXG5cdHNpZ25hbDoge2VudW1lcmFibGU6IHRydWV9XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgUmVxdWVzdCB0byBOb2RlLmpzIGh0dHAgcmVxdWVzdCBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSAgIFJlcXVlc3QgIEEgUmVxdWVzdCBpbnN0YW5jZVxuICogQHJldHVybiAgT2JqZWN0ICAgVGhlIG9wdGlvbnMgb2JqZWN0IHRvIGJlIHBhc3NlZCB0byBodHRwLnJlcXVlc3RcbiAqL1xuY29uc3QgZ2V0Tm9kZVJlcXVlc3RPcHRpb25zID0gcmVxdWVzdCA9PiB7XG5cdGNvbnN0IHtwYXJzZWRVUkx9ID0gcmVxdWVzdFtJTlRFUk5BTFMkMl07XG5cdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhyZXF1ZXN0W0lOVEVSTkFMUyQyXS5oZWFkZXJzKTtcblxuXHQvLyBGZXRjaCBzdGVwIDEuM1xuXHRpZiAoIWhlYWRlcnMuaGFzKCdBY2NlcHQnKSkge1xuXHRcdGhlYWRlcnMuc2V0KCdBY2NlcHQnLCAnKi8qJyk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmstb3ItY2FjaGUgZmV0Y2ggc3RlcHMgMi40LTIuN1xuXHRsZXQgY29udGVudExlbmd0aFZhbHVlID0gbnVsbDtcblx0aWYgKHJlcXVlc3QuYm9keSA9PT0gbnVsbCAmJiAvXihwb3N0fHB1dCkkL2kudGVzdChyZXF1ZXN0Lm1ldGhvZCkpIHtcblx0XHRjb250ZW50TGVuZ3RoVmFsdWUgPSAnMCc7XG5cdH1cblxuXHRpZiAocmVxdWVzdC5ib2R5ICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgdG90YWxCeXRlcyA9IGdldFRvdGFsQnl0ZXMocmVxdWVzdCk7XG5cdFx0Ly8gU2V0IENvbnRlbnQtTGVuZ3RoIGlmIHRvdGFsQnl0ZXMgaXMgYSBudW1iZXIgKHRoYXQgaXMgbm90IE5hTilcblx0XHRpZiAodHlwZW9mIHRvdGFsQnl0ZXMgPT09ICdudW1iZXInICYmICFOdW1iZXIuaXNOYU4odG90YWxCeXRlcykpIHtcblx0XHRcdGNvbnRlbnRMZW5ndGhWYWx1ZSA9IFN0cmluZyh0b3RhbEJ5dGVzKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoY29udGVudExlbmd0aFZhbHVlKSB7XG5cdFx0aGVhZGVycy5zZXQoJ0NvbnRlbnQtTGVuZ3RoJywgY29udGVudExlbmd0aFZhbHVlKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCBzdGVwIDIuMTFcblx0aWYgKCFoZWFkZXJzLmhhcygnVXNlci1BZ2VudCcpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ1VzZXItQWdlbnQnLCAnbm9kZS1mZXRjaCcpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXAgMi4xNVxuXHRpZiAocmVxdWVzdC5jb21wcmVzcyAmJiAhaGVhZGVycy5oYXMoJ0FjY2VwdC1FbmNvZGluZycpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ0FjY2VwdC1FbmNvZGluZycsICdnemlwLGRlZmxhdGUsYnInKTtcblx0fVxuXG5cdGxldCB7YWdlbnR9ID0gcmVxdWVzdDtcblx0aWYgKHR5cGVvZiBhZ2VudCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGFnZW50ID0gYWdlbnQocGFyc2VkVVJMKTtcblx0fVxuXG5cdGlmICghaGVhZGVycy5oYXMoJ0Nvbm5lY3Rpb24nKSAmJiAhYWdlbnQpIHtcblx0XHRoZWFkZXJzLnNldCgnQ29ubmVjdGlvbicsICdjbG9zZScpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrIGZldGNoIHN0ZXAgNC4yXG5cdC8vIGNodW5rZWQgZW5jb2RpbmcgaXMgaGFuZGxlZCBieSBOb2RlLmpzXG5cblx0Y29uc3Qgc2VhcmNoID0gZ2V0U2VhcmNoKHBhcnNlZFVSTCk7XG5cblx0Ly8gTWFudWFsbHkgc3ByZWFkIHRoZSBVUkwgb2JqZWN0IGluc3RlYWQgb2Ygc3ByZWFkIHN5bnRheFxuXHRjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcblx0XHRwYXRoOiBwYXJzZWRVUkwucGF0aG5hbWUgKyBzZWFyY2gsXG5cdFx0cGF0aG5hbWU6IHBhcnNlZFVSTC5wYXRobmFtZSxcblx0XHRob3N0bmFtZTogcGFyc2VkVVJMLmhvc3RuYW1lLFxuXHRcdHByb3RvY29sOiBwYXJzZWRVUkwucHJvdG9jb2wsXG5cdFx0cG9ydDogcGFyc2VkVVJMLnBvcnQsXG5cdFx0aGFzaDogcGFyc2VkVVJMLmhhc2gsXG5cdFx0c2VhcmNoOiBwYXJzZWRVUkwuc2VhcmNoLFxuXHRcdHF1ZXJ5OiBwYXJzZWRVUkwucXVlcnksXG5cdFx0aHJlZjogcGFyc2VkVVJMLmhyZWYsXG5cdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRoZWFkZXJzOiBoZWFkZXJzW1N5bWJvbC5mb3IoJ25vZGVqcy51dGlsLmluc3BlY3QuY3VzdG9tJyldKCksXG5cdFx0aW5zZWN1cmVIVFRQUGFyc2VyOiByZXF1ZXN0Lmluc2VjdXJlSFRUUFBhcnNlcixcblx0XHRhZ2VudFxuXHR9O1xuXG5cdHJldHVybiByZXF1ZXN0T3B0aW9ucztcbn07XG5cbi8qKlxuICogQWJvcnRFcnJvciBpbnRlcmZhY2UgZm9yIGNhbmNlbGxlZCByZXF1ZXN0c1xuICovXG5jbGFzcyBBYm9ydEVycm9yIGV4dGVuZHMgRmV0Y2hCYXNlRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihtZXNzYWdlLCB0eXBlID0gJ2Fib3J0ZWQnKSB7XG5cdFx0c3VwZXIobWVzc2FnZSwgdHlwZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBJbmRleC5qc1xuICpcbiAqIGEgcmVxdWVzdCBBUEkgY29tcGF0aWJsZSB3aXRoIHdpbmRvdy5mZXRjaFxuICpcbiAqIEFsbCBzcGVjIGFsZ29yaXRobSBzdGVwIG51bWJlcnMgYXJlIGJhc2VkIG9uIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnL2NvbW1pdC1zbmFwc2hvdHMvYWU3MTY4MjJjYjNhNjE4NDMyMjZjZDA5MGVlZmM2NTg5NDQ2YzFkMi8uXG4gKi9cblxuY29uc3Qgc3VwcG9ydGVkU2NoZW1hcyA9IG5ldyBTZXQoWydkYXRhOicsICdodHRwOicsICdodHRwczonXSk7XG5cbi8qKlxuICogRmV0Y2ggZnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0gICB7c3RyaW5nIHwgVVJMIHwgaW1wb3J0KCcuL3JlcXVlc3QnKS5kZWZhdWx0fSB1cmwgLSBBYnNvbHV0ZSB1cmwgb3IgUmVxdWVzdCBpbnN0YW5jZVxuICogQHBhcmFtICAgeyp9IFtvcHRpb25zX10gLSBGZXRjaCBvcHRpb25zXG4gKiBAcmV0dXJuICB7UHJvbWlzZTxpbXBvcnQoJy4vcmVzcG9uc2UnKS5kZWZhdWx0Pn1cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2godXJsLCBvcHRpb25zXykge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdC8vIEJ1aWxkIHJlcXVlc3Qgb2JqZWN0XG5cdFx0Y29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwgb3B0aW9uc18pO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSBnZXROb2RlUmVxdWVzdE9wdGlvbnMocmVxdWVzdCk7XG5cdFx0aWYgKCFzdXBwb3J0ZWRTY2hlbWFzLmhhcyhvcHRpb25zLnByb3RvY29sKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgbm9kZS1mZXRjaCBjYW5ub3QgbG9hZCAke3VybH0uIFVSTCBzY2hlbWUgXCIke29wdGlvbnMucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJyl9XCIgaXMgbm90IHN1cHBvcnRlZC5gKTtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5wcm90b2NvbCA9PT0gJ2RhdGE6Jykge1xuXHRcdFx0Y29uc3QgZGF0YSA9IGRhdGFVcmlUb0J1ZmZlcihyZXF1ZXN0LnVybCk7XG5cdFx0XHRjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZShkYXRhLCB7aGVhZGVyczogeydDb250ZW50LVR5cGUnOiBkYXRhLnR5cGVGdWxsfX0pO1xuXHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gV3JhcCBodHRwLnJlcXVlc3QgaW50byBmZXRjaFxuXHRcdGNvbnN0IHNlbmQgPSAob3B0aW9ucy5wcm90b2NvbCA9PT0gJ2h0dHBzOicgPyBodHRwcyA6IGh0dHApLnJlcXVlc3Q7XG5cdFx0Y29uc3Qge3NpZ25hbH0gPSByZXF1ZXN0O1xuXHRcdGxldCByZXNwb25zZSA9IG51bGw7XG5cblx0XHRjb25zdCBhYm9ydCA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGVycm9yID0gbmV3IEFib3J0RXJyb3IoJ1RoZSBvcGVyYXRpb24gd2FzIGFib3J0ZWQuJyk7XG5cdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0aWYgKHJlcXVlc3QuYm9keSAmJiByZXF1ZXN0LmJvZHkgaW5zdGFuY2VvZiBTdHJlYW0uUmVhZGFibGUpIHtcblx0XHRcdFx0cmVxdWVzdC5ib2R5LmRlc3Ryb3koZXJyb3IpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5ib2R5KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cmVzcG9uc2UuYm9keS5lbWl0KCdlcnJvcicsIGVycm9yKTtcblx0XHR9O1xuXG5cdFx0aWYgKHNpZ25hbCAmJiBzaWduYWwuYWJvcnRlZCkge1xuXHRcdFx0YWJvcnQoKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBhYm9ydEFuZEZpbmFsaXplID0gKCkgPT4ge1xuXHRcdFx0YWJvcnQoKTtcblx0XHRcdGZpbmFsaXplKCk7XG5cdFx0fTtcblxuXHRcdC8vIFNlbmQgcmVxdWVzdFxuXHRcdGNvbnN0IHJlcXVlc3RfID0gc2VuZChvcHRpb25zKTtcblxuXHRcdGlmIChzaWduYWwpIHtcblx0XHRcdHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0QW5kRmluYWxpemUpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGZpbmFsaXplID0gKCkgPT4ge1xuXHRcdFx0cmVxdWVzdF8uYWJvcnQoKTtcblx0XHRcdGlmIChzaWduYWwpIHtcblx0XHRcdFx0c2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJlcXVlc3RfLm9uKCdlcnJvcicsIGVyciA9PiB7XG5cdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYHJlcXVlc3QgdG8gJHtyZXF1ZXN0LnVybH0gZmFpbGVkLCByZWFzb246ICR7ZXJyLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycikpO1xuXHRcdFx0ZmluYWxpemUoKTtcblx0XHR9KTtcblxuXHRcdHJlcXVlc3RfLm9uKCdyZXNwb25zZScsIHJlc3BvbnNlXyA9PiB7XG5cdFx0XHRyZXF1ZXN0Xy5zZXRUaW1lb3V0KDApO1xuXHRcdFx0Y29uc3QgaGVhZGVycyA9IGZyb21SYXdIZWFkZXJzKHJlc3BvbnNlXy5yYXdIZWFkZXJzKTtcblxuXHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDVcblx0XHRcdGlmIChpc1JlZGlyZWN0KHJlc3BvbnNlXy5zdGF0dXNDb2RlKSkge1xuXHRcdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNS4yXG5cdFx0XHRcdGNvbnN0IGxvY2F0aW9uID0gaGVhZGVycy5nZXQoJ0xvY2F0aW9uJyk7XG5cblx0XHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDUuM1xuXHRcdFx0XHRjb25zdCBsb2NhdGlvblVSTCA9IGxvY2F0aW9uID09PSBudWxsID8gbnVsbCA6IG5ldyBVUkwobG9jYXRpb24sIHJlcXVlc3QudXJsKTtcblxuXHRcdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNS41XG5cdFx0XHRcdHN3aXRjaCAocmVxdWVzdC5yZWRpcmVjdCkge1xuXHRcdFx0XHRcdGNhc2UgJ2Vycm9yJzpcblx0XHRcdFx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgdXJpIHJlcXVlc3RlZCByZXNwb25kcyB3aXRoIGEgcmVkaXJlY3QsIHJlZGlyZWN0IG1vZGUgaXMgc2V0IHRvIGVycm9yOiAke3JlcXVlc3QudXJsfWAsICduby1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdGZpbmFsaXplKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0Y2FzZSAnbWFudWFsJzpcblx0XHRcdFx0XHRcdC8vIE5vZGUtZmV0Y2gtc3BlY2lmaWMgc3RlcDogbWFrZSBtYW51YWwgcmVkaXJlY3QgYSBiaXQgZWFzaWVyIHRvIHVzZSBieSBzZXR0aW5nIHRoZSBMb2NhdGlvbiBoZWFkZXIgdmFsdWUgdG8gdGhlIHJlc29sdmVkIFVSTC5cblx0XHRcdFx0XHRcdGlmIChsb2NhdGlvblVSTCAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHQvLyBIYW5kbGUgY29ycnVwdGVkIGhlYWRlclxuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGhlYWRlcnMuc2V0KCdMb2NhdGlvbicsIGxvY2F0aW9uVVJMKTtcblx0XHRcdFx0XHRcdFx0XHQvKiBjOCBpZ25vcmUgbmV4dCAzICovXG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdmb2xsb3cnOiB7XG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgMlxuXHRcdFx0XHRcdFx0aWYgKGxvY2F0aW9uVVJMID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgNVxuXHRcdFx0XHRcdFx0aWYgKHJlcXVlc3QuY291bnRlciA+PSByZXF1ZXN0LmZvbGxvdykge1xuXHRcdFx0XHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYG1heGltdW0gcmVkaXJlY3QgcmVhY2hlZCBhdDogJHtyZXF1ZXN0LnVybH1gLCAnbWF4LXJlZGlyZWN0JykpO1xuXHRcdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCA2IChjb3VudGVyIGluY3JlbWVudClcblx0XHRcdFx0XHRcdC8vIENyZWF0ZSBhIG5ldyBSZXF1ZXN0IG9iamVjdC5cblx0XHRcdFx0XHRcdGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0XHRoZWFkZXJzOiBuZXcgSGVhZGVycyhyZXF1ZXN0LmhlYWRlcnMpLFxuXHRcdFx0XHRcdFx0XHRmb2xsb3c6IHJlcXVlc3QuZm9sbG93LFxuXHRcdFx0XHRcdFx0XHRjb3VudGVyOiByZXF1ZXN0LmNvdW50ZXIgKyAxLFxuXHRcdFx0XHRcdFx0XHRhZ2VudDogcmVxdWVzdC5hZ2VudCxcblx0XHRcdFx0XHRcdFx0Y29tcHJlc3M6IHJlcXVlc3QuY29tcHJlc3MsXG5cdFx0XHRcdFx0XHRcdG1ldGhvZDogcmVxdWVzdC5tZXRob2QsXG5cdFx0XHRcdFx0XHRcdGJvZHk6IHJlcXVlc3QuYm9keSxcblx0XHRcdFx0XHRcdFx0c2lnbmFsOiByZXF1ZXN0LnNpZ25hbCxcblx0XHRcdFx0XHRcdFx0c2l6ZTogcmVxdWVzdC5zaXplXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgOVxuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlXy5zdGF0dXNDb2RlICE9PSAzMDMgJiYgcmVxdWVzdC5ib2R5ICYmIG9wdGlvbnNfLmJvZHkgaW5zdGFuY2VvZiBTdHJlYW0uUmVhZGFibGUpIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKCdDYW5ub3QgZm9sbG93IHJlZGlyZWN0IHdpdGggYm9keSBiZWluZyBhIHJlYWRhYmxlIHN0cmVhbScsICd1bnN1cHBvcnRlZC1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgMTFcblx0XHRcdFx0XHRcdGlmIChyZXNwb25zZV8uc3RhdHVzQ29kZSA9PT0gMzAzIHx8ICgocmVzcG9uc2VfLnN0YXR1c0NvZGUgPT09IDMwMSB8fCByZXNwb25zZV8uc3RhdHVzQ29kZSA9PT0gMzAyKSAmJiByZXF1ZXN0Lm1ldGhvZCA9PT0gJ1BPU1QnKSkge1xuXHRcdFx0XHRcdFx0XHRyZXF1ZXN0T3B0aW9ucy5tZXRob2QgPSAnR0VUJztcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMuYm9keSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdGlvbnMuaGVhZGVycy5kZWxldGUoJ2NvbnRlbnQtbGVuZ3RoJyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIEhUVFAtcmVkaXJlY3QgZmV0Y2ggc3RlcCAxNVxuXHRcdFx0XHRcdFx0cmVzb2x2ZShmZXRjaChuZXcgUmVxdWVzdChsb2NhdGlvblVSTCwgcmVxdWVzdE9wdGlvbnMpKSk7XG5cdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBEbyBub3RoaW5nXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUHJlcGFyZSByZXNwb25zZVxuXHRcdFx0cmVzcG9uc2VfLm9uY2UoJ2VuZCcsICgpID0+IHtcblx0XHRcdFx0aWYgKHNpZ25hbCkge1xuXHRcdFx0XHRcdHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0QW5kRmluYWxpemUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0bGV0IGJvZHkgPSBTdHJlYW0ucGlwZWxpbmUocmVzcG9uc2VfLCBuZXcgU3RyZWFtLlBhc3NUaHJvdWdoKCksIGVycm9yID0+IHtcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdH0pO1xuXHRcdFx0Ly8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9wdWxsLzI5Mzc2XG5cdFx0XHRpZiAocHJvY2Vzcy52ZXJzaW9uIDwgJ3YxMi4xMCcpIHtcblx0XHRcdFx0cmVzcG9uc2VfLm9uKCdhYm9ydGVkJywgYWJvcnRBbmRGaW5hbGl6ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHJlc3BvbnNlT3B0aW9ucyA9IHtcblx0XHRcdFx0dXJsOiByZXF1ZXN0LnVybCxcblx0XHRcdFx0c3RhdHVzOiByZXNwb25zZV8uc3RhdHVzQ29kZSxcblx0XHRcdFx0c3RhdHVzVGV4dDogcmVzcG9uc2VfLnN0YXR1c01lc3NhZ2UsXG5cdFx0XHRcdGhlYWRlcnMsXG5cdFx0XHRcdHNpemU6IHJlcXVlc3Quc2l6ZSxcblx0XHRcdFx0Y291bnRlcjogcmVxdWVzdC5jb3VudGVyLFxuXHRcdFx0XHRoaWdoV2F0ZXJNYXJrOiByZXF1ZXN0LmhpZ2hXYXRlck1hcmtcblx0XHRcdH07XG5cblx0XHRcdC8vIEhUVFAtbmV0d29yayBmZXRjaCBzdGVwIDEyLjEuMS4zXG5cdFx0XHRjb25zdCBjb2RpbmdzID0gaGVhZGVycy5nZXQoJ0NvbnRlbnQtRW5jb2RpbmcnKTtcblxuXHRcdFx0Ly8gSFRUUC1uZXR3b3JrIGZldGNoIHN0ZXAgMTIuMS4xLjQ6IGhhbmRsZSBjb250ZW50IGNvZGluZ3NcblxuXHRcdFx0Ly8gaW4gZm9sbG93aW5nIHNjZW5hcmlvcyB3ZSBpZ25vcmUgY29tcHJlc3Npb24gc3VwcG9ydFxuXHRcdFx0Ly8gMS4gY29tcHJlc3Npb24gc3VwcG9ydCBpcyBkaXNhYmxlZFxuXHRcdFx0Ly8gMi4gSEVBRCByZXF1ZXN0XG5cdFx0XHQvLyAzLiBubyBDb250ZW50LUVuY29kaW5nIGhlYWRlclxuXHRcdFx0Ly8gNC4gbm8gY29udGVudCByZXNwb25zZSAoMjA0KVxuXHRcdFx0Ly8gNS4gY29udGVudCBub3QgbW9kaWZpZWQgcmVzcG9uc2UgKDMwNClcblx0XHRcdGlmICghcmVxdWVzdC5jb21wcmVzcyB8fCByZXF1ZXN0Lm1ldGhvZCA9PT0gJ0hFQUQnIHx8IGNvZGluZ3MgPT09IG51bGwgfHwgcmVzcG9uc2VfLnN0YXR1c0NvZGUgPT09IDIwNCB8fCByZXNwb25zZV8uc3RhdHVzQ29kZSA9PT0gMzA0KSB7XG5cdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlT3B0aW9ucyk7XG5cdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvciBOb2RlIHY2K1xuXHRcdFx0Ly8gQmUgbGVzcyBzdHJpY3Qgd2hlbiBkZWNvZGluZyBjb21wcmVzc2VkIHJlc3BvbnNlcywgc2luY2Ugc29tZXRpbWVzXG5cdFx0XHQvLyBzZXJ2ZXJzIHNlbmQgc2xpZ2h0bHkgaW52YWxpZCByZXNwb25zZXMgdGhhdCBhcmUgc3RpbGwgYWNjZXB0ZWRcblx0XHRcdC8vIGJ5IGNvbW1vbiBicm93c2Vycy5cblx0XHRcdC8vIEFsd2F5cyB1c2luZyBaX1NZTkNfRkxVU0ggaXMgd2hhdCBjVVJMIGRvZXMuXG5cdFx0XHRjb25zdCB6bGliT3B0aW9ucyA9IHtcblx0XHRcdFx0Zmx1c2g6IHpsaWIuWl9TWU5DX0ZMVVNILFxuXHRcdFx0XHRmaW5pc2hGbHVzaDogemxpYi5aX1NZTkNfRkxVU0hcblx0XHRcdH07XG5cblx0XHRcdC8vIEZvciBnemlwXG5cdFx0XHRpZiAoY29kaW5ncyA9PT0gJ2d6aXAnIHx8IGNvZGluZ3MgPT09ICd4LWd6aXAnKSB7XG5cdFx0XHRcdGJvZHkgPSBTdHJlYW0ucGlwZWxpbmUoYm9keSwgemxpYi5jcmVhdGVHdW56aXAoemxpYk9wdGlvbnMpLCBlcnJvciA9PiB7XG5cdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlT3B0aW9ucyk7XG5cdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvciBkZWZsYXRlXG5cdFx0XHRpZiAoY29kaW5ncyA9PT0gJ2RlZmxhdGUnIHx8IGNvZGluZ3MgPT09ICd4LWRlZmxhdGUnKSB7XG5cdFx0XHRcdC8vIEhhbmRsZSB0aGUgaW5mYW1vdXMgcmF3IGRlZmxhdGUgcmVzcG9uc2UgZnJvbSBvbGQgc2VydmVyc1xuXHRcdFx0XHQvLyBhIGhhY2sgZm9yIG9sZCBJSVMgYW5kIEFwYWNoZSBzZXJ2ZXJzXG5cdFx0XHRcdGNvbnN0IHJhdyA9IFN0cmVhbS5waXBlbGluZShyZXNwb25zZV8sIG5ldyBTdHJlYW0uUGFzc1Rocm91Z2goKSwgZXJyb3IgPT4ge1xuXHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyYXcub25jZSgnZGF0YScsIGNodW5rID0+IHtcblx0XHRcdFx0XHQvLyBTZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNzUxOTgyOFxuXHRcdFx0XHRcdGlmICgoY2h1bmtbMF0gJiAweDBGKSA9PT0gMHgwOCkge1xuXHRcdFx0XHRcdFx0Ym9keSA9IFN0cmVhbS5waXBlbGluZShib2R5LCB6bGliLmNyZWF0ZUluZmxhdGUoKSwgZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGJvZHkgPSBTdHJlYW0ucGlwZWxpbmUoYm9keSwgemxpYi5jcmVhdGVJbmZsYXRlUmF3KCksIGVycm9yID0+IHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlT3B0aW9ucyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvciBiclxuXHRcdFx0aWYgKGNvZGluZ3MgPT09ICdicicpIHtcblx0XHRcdFx0Ym9keSA9IFN0cmVhbS5waXBlbGluZShib2R5LCB6bGliLmNyZWF0ZUJyb3RsaURlY29tcHJlc3MoKSwgZXJyb3IgPT4ge1xuXHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZU9wdGlvbnMpO1xuXHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPdGhlcndpc2UsIHVzZSByZXNwb25zZSBhcy1pc1xuXHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2VPcHRpb25zKTtcblx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdH0pO1xuXG5cdFx0d3JpdGVUb1N0cmVhbShyZXF1ZXN0XywgcmVxdWVzdCk7XG5cdH0pO1xufVxuXG5leHBvcnRzLkFib3J0RXJyb3IgPSBBYm9ydEVycm9yO1xuZXhwb3J0cy5GZXRjaEVycm9yID0gRmV0Y2hFcnJvcjtcbmV4cG9ydHMuSGVhZGVycyA9IEhlYWRlcnM7XG5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuZXhwb3J0cy5SZXNwb25zZSA9IFJlc3BvbnNlO1xuZXhwb3J0cy5kZWZhdWx0ID0gZmV0Y2g7XG5leHBvcnRzLmlzUmVkaXJlY3QgPSBpc1JlZGlyZWN0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguY2pzLm1hcFxuIiwiLyoqXG4gKiB3ZWItc3RyZWFtcy1wb2x5ZmlsbCB2My4yLjBcbiAqL1xuLy8vIDxyZWZlcmVuY2UgbGliPVwiZXMyMDE1LnN5bWJvbFwiIC8+XG5jb25zdCBTeW1ib2xQb2x5ZmlsbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ3N5bWJvbCcgP1xuICAgIFN5bWJvbCA6XG4gICAgZGVzY3JpcHRpb24gPT4gYFN5bWJvbCgke2Rlc2NyaXB0aW9ufSlgO1xuXG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJkb21cIiAvPlxuZnVuY3Rpb24gbm9vcCgpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gZ2V0R2xvYmFscygpIHtcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gZ2xvYmFsO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuY29uc3QgZ2xvYmFscyA9IGdldEdsb2JhbHMoKTtcblxuZnVuY3Rpb24gdHlwZUlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4gKHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiB4ICE9PSBudWxsKSB8fCB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cbmNvbnN0IHJldGhyb3dBc3NlcnRpb25FcnJvclJlamVjdGlvbiA9IG5vb3A7XG5cbmNvbnN0IG9yaWdpbmFsUHJvbWlzZSA9IFByb21pc2U7XG5jb25zdCBvcmlnaW5hbFByb21pc2VUaGVuID0gUHJvbWlzZS5wcm90b3R5cGUudGhlbjtcbmNvbnN0IG9yaWdpbmFsUHJvbWlzZVJlc29sdmUgPSBQcm9taXNlLnJlc29sdmUuYmluZChvcmlnaW5hbFByb21pc2UpO1xuY29uc3Qgb3JpZ2luYWxQcm9taXNlUmVqZWN0ID0gUHJvbWlzZS5yZWplY3QuYmluZChvcmlnaW5hbFByb21pc2UpO1xuZnVuY3Rpb24gbmV3UHJvbWlzZShleGVjdXRvcikge1xuICAgIHJldHVybiBuZXcgb3JpZ2luYWxQcm9taXNlKGV4ZWN1dG9yKTtcbn1cbmZ1bmN0aW9uIHByb21pc2VSZXNvbHZlZFdpdGgodmFsdWUpIHtcbiAgICByZXR1cm4gb3JpZ2luYWxQcm9taXNlUmVzb2x2ZSh2YWx1ZSk7XG59XG5mdW5jdGlvbiBwcm9taXNlUmVqZWN0ZWRXaXRoKHJlYXNvbikge1xuICAgIHJldHVybiBvcmlnaW5hbFByb21pc2VSZWplY3QocmVhc29uKTtcbn1cbmZ1bmN0aW9uIFBlcmZvcm1Qcm9taXNlVGhlbihwcm9taXNlLCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIC8vIFRoZXJlIGRvZXNuJ3QgYXBwZWFyIHRvIGJlIGFueSB3YXkgdG8gY29ycmVjdGx5IGVtdWxhdGUgdGhlIGJlaGF2aW91ciBmcm9tIEphdmFTY3JpcHQsIHNvIHRoaXMgaXMganVzdCBhblxuICAgIC8vIGFwcHJveGltYXRpb24uXG4gICAgcmV0dXJuIG9yaWdpbmFsUHJvbWlzZVRoZW4uY2FsbChwcm9taXNlLCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG59XG5mdW5jdGlvbiB1cG9uUHJvbWlzZShwcm9taXNlLCBvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIFBlcmZvcm1Qcm9taXNlVGhlbihQZXJmb3JtUHJvbWlzZVRoZW4ocHJvbWlzZSwgb25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpLCB1bmRlZmluZWQsIHJldGhyb3dBc3NlcnRpb25FcnJvclJlamVjdGlvbik7XG59XG5mdW5jdGlvbiB1cG9uRnVsZmlsbG1lbnQocHJvbWlzZSwgb25GdWxmaWxsZWQpIHtcbiAgICB1cG9uUHJvbWlzZShwcm9taXNlLCBvbkZ1bGZpbGxlZCk7XG59XG5mdW5jdGlvbiB1cG9uUmVqZWN0aW9uKHByb21pc2UsIG9uUmVqZWN0ZWQpIHtcbiAgICB1cG9uUHJvbWlzZShwcm9taXNlLCB1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtUHJvbWlzZVdpdGgocHJvbWlzZSwgZnVsZmlsbG1lbnRIYW5kbGVyLCByZWplY3Rpb25IYW5kbGVyKSB7XG4gICAgcmV0dXJuIFBlcmZvcm1Qcm9taXNlVGhlbihwcm9taXNlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpO1xufVxuZnVuY3Rpb24gc2V0UHJvbWlzZUlzSGFuZGxlZFRvVHJ1ZShwcm9taXNlKSB7XG4gICAgUGVyZm9ybVByb21pc2VUaGVuKHByb21pc2UsIHVuZGVmaW5lZCwgcmV0aHJvd0Fzc2VydGlvbkVycm9yUmVqZWN0aW9uKTtcbn1cbmNvbnN0IHF1ZXVlTWljcm90YXNrID0gKCgpID0+IHtcbiAgICBjb25zdCBnbG9iYWxRdWV1ZU1pY3JvdGFzayA9IGdsb2JhbHMgJiYgZ2xvYmFscy5xdWV1ZU1pY3JvdGFzaztcbiAgICBpZiAodHlwZW9mIGdsb2JhbFF1ZXVlTWljcm90YXNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBnbG9iYWxRdWV1ZU1pY3JvdGFzaztcbiAgICB9XG4gICAgY29uc3QgcmVzb2x2ZWRQcm9taXNlID0gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIHJldHVybiAoZm4pID0+IFBlcmZvcm1Qcm9taXNlVGhlbihyZXNvbHZlZFByb21pc2UsIGZuKTtcbn0pKCk7XG5mdW5jdGlvbiByZWZsZWN0Q2FsbChGLCBWLCBhcmdzKSB7XG4gICAgaWYgKHR5cGVvZiBGICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChGLCBWLCBhcmdzKTtcbn1cbmZ1bmN0aW9uIHByb21pc2VDYWxsKEYsIFYsIGFyZ3MpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aChyZWZsZWN0Q2FsbChGLCBWLCBhcmdzKSk7XG4gICAgfVxuICAgIGNhdGNoICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aCh2YWx1ZSk7XG4gICAgfVxufVxuXG4vLyBPcmlnaW5hbCBmcm9tIENocm9taXVtXG4vLyBodHRwczovL2Nocm9taXVtLmdvb2dsZXNvdXJjZS5jb20vY2hyb21pdW0vc3JjLysvMGFlZTQ0MzRhNGRiYTQyYTQyYWJhZWE5YmZiYzBjZDE5NmE2M2JjMS90aGlyZF9wYXJ0eS9ibGluay9yZW5kZXJlci9jb3JlL3N0cmVhbXMvU2ltcGxlUXVldWUuanNcbmNvbnN0IFFVRVVFX01BWF9BUlJBWV9TSVpFID0gMTYzODQ7XG4vKipcbiAqIFNpbXBsZSBxdWV1ZSBzdHJ1Y3R1cmUuXG4gKlxuICogQXZvaWRzIHNjYWxhYmlsaXR5IGlzc3VlcyB3aXRoIHVzaW5nIGEgcGFja2VkIGFycmF5IGRpcmVjdGx5IGJ5IHVzaW5nXG4gKiBtdWx0aXBsZSBhcnJheXMgaW4gYSBsaW5rZWQgbGlzdCBhbmQga2VlcGluZyB0aGUgYXJyYXkgc2l6ZSBib3VuZGVkLlxuICovXG5jbGFzcyBTaW1wbGVRdWV1ZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2N1cnNvciA9IDA7XG4gICAgICAgIHRoaXMuX3NpemUgPSAwO1xuICAgICAgICAvLyBfZnJvbnQgYW5kIF9iYWNrIGFyZSBhbHdheXMgZGVmaW5lZC5cbiAgICAgICAgdGhpcy5fZnJvbnQgPSB7XG4gICAgICAgICAgICBfZWxlbWVudHM6IFtdLFxuICAgICAgICAgICAgX25leHQ6IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9iYWNrID0gdGhpcy5fZnJvbnQ7XG4gICAgICAgIC8vIFRoZSBjdXJzb3IgaXMgdXNlZCB0byBhdm9pZCBjYWxsaW5nIEFycmF5LnNoaWZ0KCkuXG4gICAgICAgIC8vIEl0IGNvbnRhaW5zIHRoZSBpbmRleCBvZiB0aGUgZnJvbnQgZWxlbWVudCBvZiB0aGUgYXJyYXkgaW5zaWRlIHRoZVxuICAgICAgICAvLyBmcm9udC1tb3N0IG5vZGUuIEl0IGlzIGFsd2F5cyBpbiB0aGUgcmFuZ2UgWzAsIFFVRVVFX01BWF9BUlJBWV9TSVpFKS5cbiAgICAgICAgdGhpcy5fY3Vyc29yID0gMDtcbiAgICAgICAgLy8gV2hlbiB0aGVyZSBpcyBvbmx5IG9uZSBub2RlLCBzaXplID09PSBlbGVtZW50cy5sZW5ndGggLSBjdXJzb3IuXG4gICAgICAgIHRoaXMuX3NpemUgPSAwO1xuICAgIH1cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICB9XG4gICAgLy8gRm9yIGV4Y2VwdGlvbiBzYWZldHksIHRoaXMgbWV0aG9kIGlzIHN0cnVjdHVyZWQgaW4gb3JkZXI6XG4gICAgLy8gMS4gUmVhZCBzdGF0ZVxuICAgIC8vIDIuIENhbGN1bGF0ZSByZXF1aXJlZCBzdGF0ZSBtdXRhdGlvbnNcbiAgICAvLyAzLiBQZXJmb3JtIHN0YXRlIG11dGF0aW9uc1xuICAgIHB1c2goZWxlbWVudCkge1xuICAgICAgICBjb25zdCBvbGRCYWNrID0gdGhpcy5fYmFjaztcbiAgICAgICAgbGV0IG5ld0JhY2sgPSBvbGRCYWNrO1xuICAgICAgICBpZiAob2xkQmFjay5fZWxlbWVudHMubGVuZ3RoID09PSBRVUVVRV9NQVhfQVJSQVlfU0laRSAtIDEpIHtcbiAgICAgICAgICAgIG5ld0JhY2sgPSB7XG4gICAgICAgICAgICAgICAgX2VsZW1lbnRzOiBbXSxcbiAgICAgICAgICAgICAgICBfbmV4dDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIHB1c2goKSBpcyB0aGUgbXV0YXRpb24gbW9zdCBsaWtlbHkgdG8gdGhyb3cgYW4gZXhjZXB0aW9uLCBzbyBpdFxuICAgICAgICAvLyBnb2VzIGZpcnN0LlxuICAgICAgICBvbGRCYWNrLl9lbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICBpZiAobmV3QmFjayAhPT0gb2xkQmFjaykge1xuICAgICAgICAgICAgdGhpcy5fYmFjayA9IG5ld0JhY2s7XG4gICAgICAgICAgICBvbGRCYWNrLl9uZXh0ID0gbmV3QmFjaztcbiAgICAgICAgfVxuICAgICAgICArK3RoaXMuX3NpemU7XG4gICAgfVxuICAgIC8vIExpa2UgcHVzaCgpLCBzaGlmdCgpIGZvbGxvd3MgdGhlIHJlYWQgLT4gY2FsY3VsYXRlIC0+IG11dGF0ZSBwYXR0ZXJuIGZvclxuICAgIC8vIGV4Y2VwdGlvbiBzYWZldHkuXG4gICAgc2hpZnQoKSB7IC8vIG11c3Qgbm90IGJlIGNhbGxlZCBvbiBhbiBlbXB0eSBxdWV1ZVxuICAgICAgICBjb25zdCBvbGRGcm9udCA9IHRoaXMuX2Zyb250O1xuICAgICAgICBsZXQgbmV3RnJvbnQgPSBvbGRGcm9udDtcbiAgICAgICAgY29uc3Qgb2xkQ3Vyc29yID0gdGhpcy5fY3Vyc29yO1xuICAgICAgICBsZXQgbmV3Q3Vyc29yID0gb2xkQ3Vyc29yICsgMTtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBvbGRGcm9udC5fZWxlbWVudHM7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tvbGRDdXJzb3JdO1xuICAgICAgICBpZiAobmV3Q3Vyc29yID09PSBRVUVVRV9NQVhfQVJSQVlfU0laRSkge1xuICAgICAgICAgICAgbmV3RnJvbnQgPSBvbGRGcm9udC5fbmV4dDtcbiAgICAgICAgICAgIG5ld0N1cnNvciA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm8gbXV0YXRpb25zIGJlZm9yZSB0aGlzIHBvaW50LlxuICAgICAgICAtLXRoaXMuX3NpemU7XG4gICAgICAgIHRoaXMuX2N1cnNvciA9IG5ld0N1cnNvcjtcbiAgICAgICAgaWYgKG9sZEZyb250ICE9PSBuZXdGcm9udCkge1xuICAgICAgICAgICAgdGhpcy5fZnJvbnQgPSBuZXdGcm9udDtcbiAgICAgICAgfVxuICAgICAgICAvLyBQZXJtaXQgc2hpZnRlZCBlbGVtZW50IHRvIGJlIGdhcmJhZ2UgY29sbGVjdGVkLlxuICAgICAgICBlbGVtZW50c1tvbGRDdXJzb3JdID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gICAgLy8gVGhlIHRyaWNreSB0aGluZyBhYm91dCBmb3JFYWNoKCkgaXMgdGhhdCBpdCBjYW4gYmUgY2FsbGVkXG4gICAgLy8gcmUtZW50cmFudGx5LiBUaGUgcXVldWUgbWF5IGJlIG11dGF0ZWQgaW5zaWRlIHRoZSBjYWxsYmFjay4gSXQgaXMgZWFzeSB0b1xuICAgIC8vIHNlZSB0aGF0IHB1c2goKSB3aXRoaW4gdGhlIGNhbGxiYWNrIGhhcyBubyBuZWdhdGl2ZSBlZmZlY3RzIHNpbmNlIHRoZSBlbmRcbiAgICAvLyBvZiB0aGUgcXVldWUgaXMgY2hlY2tlZCBmb3Igb24gZXZlcnkgaXRlcmF0aW9uLiBJZiBzaGlmdCgpIGlzIGNhbGxlZFxuICAgIC8vIHJlcGVhdGVkbHkgd2l0aGluIHRoZSBjYWxsYmFjayB0aGVuIHRoZSBuZXh0IGl0ZXJhdGlvbiBtYXkgcmV0dXJuIGFuXG4gICAgLy8gZWxlbWVudCB0aGF0IGhhcyBiZWVuIHJlbW92ZWQuIEluIHRoaXMgY2FzZSB0aGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWRcbiAgICAvLyB3aXRoIHVuZGVmaW5lZCB2YWx1ZXMgdW50aWwgd2UgZWl0aGVyIFwiY2F0Y2ggdXBcIiB3aXRoIGVsZW1lbnRzIHRoYXQgc3RpbGxcbiAgICAvLyBleGlzdCBvciByZWFjaCB0aGUgYmFjayBvZiB0aGUgcXVldWUuXG4gICAgZm9yRWFjaChjYWxsYmFjaykge1xuICAgICAgICBsZXQgaSA9IHRoaXMuX2N1cnNvcjtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl9mcm9udDtcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gbm9kZS5fZWxlbWVudHM7XG4gICAgICAgIHdoaWxlIChpICE9PSBlbGVtZW50cy5sZW5ndGggfHwgbm9kZS5fbmV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBub2RlLl9lbGVtZW50cztcbiAgICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGVsZW1lbnRzW2ldKTtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXR1cm4gdGhlIGVsZW1lbnQgdGhhdCB3b3VsZCBiZSByZXR1cm5lZCBpZiBzaGlmdCgpIHdhcyBjYWxsZWQgbm93LFxuICAgIC8vIHdpdGhvdXQgbW9kaWZ5aW5nIHRoZSBxdWV1ZS5cbiAgICBwZWVrKCkgeyAvLyBtdXN0IG5vdCBiZSBjYWxsZWQgb24gYW4gZW1wdHkgcXVldWVcbiAgICAgICAgY29uc3QgZnJvbnQgPSB0aGlzLl9mcm9udDtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gdGhpcy5fY3Vyc29yO1xuICAgICAgICByZXR1cm4gZnJvbnQuX2VsZW1lbnRzW2N1cnNvcl07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNJbml0aWFsaXplKHJlYWRlciwgc3RyZWFtKSB7XG4gICAgcmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtID0gc3RyZWFtO1xuICAgIHN0cmVhbS5fcmVhZGVyID0gcmVhZGVyO1xuICAgIGlmIChzdHJlYW0uX3N0YXRlID09PSAncmVhZGFibGUnKSB7XG4gICAgICAgIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZShyZWFkZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdHJlYW0uX3N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1Jlc29sdmVkKHJlYWRlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHJlYWRlciwgc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gICAgfVxufVxuLy8gQSBjbGllbnQgb2YgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyIGFuZCBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIgbWF5IHVzZSB0aGVzZSBmdW5jdGlvbnMgZGlyZWN0bHkgdG8gYnlwYXNzIHN0YXRlXG4vLyBjaGVjay5cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0NhbmNlbChyZWFkZXIsIHJlYXNvbikge1xuICAgIGNvbnN0IHN0cmVhbSA9IHJlYWRlci5fb3duZXJSZWFkYWJsZVN0cmVhbTtcbiAgICByZXR1cm4gUmVhZGFibGVTdHJlYW1DYW5jZWwoc3RyZWFtLCByZWFzb24pO1xufVxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZShyZWFkZXIpIHtcbiAgICBpZiAocmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtLl9zdGF0ZSA9PT0gJ3JlYWRhYmxlJykge1xuICAgICAgICBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZVJlamVjdChyZWFkZXIsIG5ldyBUeXBlRXJyb3IoYFJlYWRlciB3YXMgcmVsZWFzZWQgYW5kIGNhbiBubyBsb25nZXIgYmUgdXNlZCB0byBtb25pdG9yIHRoZSBzdHJlYW0ncyBjbG9zZWRuZXNzYCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZXNldFRvUmVqZWN0ZWQocmVhZGVyLCBuZXcgVHlwZUVycm9yKGBSZWFkZXIgd2FzIHJlbGVhc2VkIGFuZCBjYW4gbm8gbG9uZ2VyIGJlIHVzZWQgdG8gbW9uaXRvciB0aGUgc3RyZWFtJ3MgY2xvc2VkbmVzc2ApKTtcbiAgICB9XG4gICAgcmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtLl9yZWFkZXIgPSB1bmRlZmluZWQ7XG4gICAgcmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtID0gdW5kZWZpbmVkO1xufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIHJlYWRlcnMuXG5mdW5jdGlvbiByZWFkZXJMb2NrRXhjZXB0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcignQ2Fubm90ICcgKyBuYW1lICsgJyBhIHN0cmVhbSB1c2luZyBhIHJlbGVhc2VkIHJlYWRlcicpO1xufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlci5cbmZ1bmN0aW9uIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZShyZWFkZXIpIHtcbiAgICByZWFkZXIuX2Nsb3NlZFByb21pc2UgPSBuZXdQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVhZGVyLl9jbG9zZWRQcm9taXNlX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID0gcmVqZWN0O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VJbml0aWFsaXplQXNSZWplY3RlZChyZWFkZXIsIHJlYXNvbikge1xuICAgIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZShyZWFkZXIpO1xuICAgIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVqZWN0KHJlYWRlciwgcmVhc29uKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVzb2x2ZWQocmVhZGVyKSB7XG4gICAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHJlYWRlcik7XG4gICAgZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZXNvbHZlKHJlYWRlcik7XG59XG5mdW5jdGlvbiBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZVJlamVjdChyZWFkZXIsIHJlYXNvbikge1xuICAgIGlmIChyZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRQcm9taXNlSXNIYW5kbGVkVG9UcnVlKHJlYWRlci5fY2xvc2VkUHJvbWlzZSk7XG4gICAgcmVhZGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdChyZWFzb24pO1xuICAgIHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID0gdW5kZWZpbmVkO1xuICAgIHJlYWRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QgPSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBkZWZhdWx0UmVhZGVyQ2xvc2VkUHJvbWlzZVJlc2V0VG9SZWplY3RlZChyZWFkZXIsIHJlYXNvbikge1xuICAgIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQocmVhZGVyLCByZWFzb24pO1xufVxuZnVuY3Rpb24gZGVmYXVsdFJlYWRlckNsb3NlZFByb21pc2VSZXNvbHZlKHJlYWRlcikge1xuICAgIGlmIChyZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVhZGVyLl9jbG9zZWRQcm9taXNlX3Jlc29sdmUodW5kZWZpbmVkKTtcbiAgICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSA9IHVuZGVmaW5lZDtcbiAgICByZWFkZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID0gdW5kZWZpbmVkO1xufVxuXG5jb25zdCBBYm9ydFN0ZXBzID0gU3ltYm9sUG9seWZpbGwoJ1tbQWJvcnRTdGVwc11dJyk7XG5jb25zdCBFcnJvclN0ZXBzID0gU3ltYm9sUG9seWZpbGwoJ1tbRXJyb3JTdGVwc11dJyk7XG5jb25zdCBDYW5jZWxTdGVwcyA9IFN5bWJvbFBvbHlmaWxsKCdbW0NhbmNlbFN0ZXBzXV0nKTtcbmNvbnN0IFB1bGxTdGVwcyA9IFN5bWJvbFBvbHlmaWxsKCdbW1B1bGxTdGVwc11dJyk7XG5cbi8vLyA8cmVmZXJlbmNlIGxpYj1cImVzMjAxNS5jb3JlXCIgLz5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL051bWJlci9pc0Zpbml0ZSNQb2x5ZmlsbFxuY29uc3QgTnVtYmVySXNGaW5pdGUgPSBOdW1iZXIuaXNGaW5pdGUgfHwgZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT09ICdudW1iZXInICYmIGlzRmluaXRlKHgpO1xufTtcblxuLy8vIDxyZWZlcmVuY2UgbGliPVwiZXMyMDE1LmNvcmVcIiAvPlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWF0aC90cnVuYyNQb2x5ZmlsbFxuY29uc3QgTWF0aFRydW5jID0gTWF0aC50cnVuYyB8fCBmdW5jdGlvbiAodikge1xuICAgIHJldHVybiB2IDwgMCA/IE1hdGguY2VpbCh2KSA6IE1hdGguZmxvb3Iodik7XG59O1xuXG4vLyBodHRwczovL2hleWNhbS5naXRodWIuaW8vd2ViaWRsLyNpZGwtZGljdGlvbmFyaWVzXG5mdW5jdGlvbiBpc0RpY3Rpb25hcnkoeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBhc3NlcnREaWN0aW9uYXJ5KG9iaiwgY29udGV4dCkge1xuICAgIGlmIChvYmogIT09IHVuZGVmaW5lZCAmJiAhaXNEaWN0aW9uYXJ5KG9iaikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBub3QgYW4gb2JqZWN0LmApO1xuICAgIH1cbn1cbi8vIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC1jYWxsYmFjay1mdW5jdGlvbnNcbmZ1bmN0aW9uIGFzc2VydEZ1bmN0aW9uKHgsIGNvbnRleHQpIHtcbiAgICBpZiAodHlwZW9mIHggIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBub3QgYSBmdW5jdGlvbi5gKTtcbiAgICB9XG59XG4vLyBodHRwczovL2hleWNhbS5naXRodWIuaW8vd2ViaWRsLyNpZGwtb2JqZWN0XG5mdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuICh0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeCAhPT0gbnVsbCkgfHwgdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBhc3NlcnRPYmplY3QoeCwgY29udGV4dCkge1xuICAgIGlmICghaXNPYmplY3QoeCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBub3QgYW4gb2JqZWN0LmApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFzc2VydFJlcXVpcmVkQXJndW1lbnQoeCwgcG9zaXRpb24sIGNvbnRleHQpIHtcbiAgICBpZiAoeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFBhcmFtZXRlciAke3Bvc2l0aW9ufSBpcyByZXF1aXJlZCBpbiAnJHtjb250ZXh0fScuYCk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXNzZXJ0UmVxdWlyZWRGaWVsZCh4LCBmaWVsZCwgY29udGV4dCkge1xuICAgIGlmICh4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtmaWVsZH0gaXMgcmVxdWlyZWQgaW4gJyR7Y29udGV4dH0nLmApO1xuICAgIH1cbn1cbi8vIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC11bnJlc3RyaWN0ZWQtZG91YmxlXG5mdW5jdGlvbiBjb252ZXJ0VW5yZXN0cmljdGVkRG91YmxlKHZhbHVlKSB7XG4gICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG59XG5mdW5jdGlvbiBjZW5zb3JOZWdhdGl2ZVplcm8oeCkge1xuICAgIHJldHVybiB4ID09PSAwID8gMCA6IHg7XG59XG5mdW5jdGlvbiBpbnRlZ2VyUGFydCh4KSB7XG4gICAgcmV0dXJuIGNlbnNvck5lZ2F0aXZlWmVybyhNYXRoVHJ1bmMoeCkpO1xufVxuLy8gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jaWRsLXVuc2lnbmVkLWxvbmctbG9uZ1xuZnVuY3Rpb24gY29udmVydFVuc2lnbmVkTG9uZ0xvbmdXaXRoRW5mb3JjZVJhbmdlKHZhbHVlLCBjb250ZXh0KSB7XG4gICAgY29uc3QgbG93ZXJCb3VuZCA9IDA7XG4gICAgY29uc3QgdXBwZXJCb3VuZCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgIGxldCB4ID0gTnVtYmVyKHZhbHVlKTtcbiAgICB4ID0gY2Vuc29yTmVnYXRpdmVaZXJvKHgpO1xuICAgIGlmICghTnVtYmVySXNGaW5pdGUoeCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBub3QgYSBmaW5pdGUgbnVtYmVyYCk7XG4gICAgfVxuICAgIHggPSBpbnRlZ2VyUGFydCh4KTtcbiAgICBpZiAoeCA8IGxvd2VyQm91bmQgfHwgeCA+IHVwcGVyQm91bmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBvdXRzaWRlIHRoZSBhY2NlcHRlZCByYW5nZSBvZiAke2xvd2VyQm91bmR9IHRvICR7dXBwZXJCb3VuZH0sIGluY2x1c2l2ZWApO1xuICAgIH1cbiAgICBpZiAoIU51bWJlcklzRmluaXRlKHgpIHx8IHggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIC8vIFRPRE8gVXNlIEJpZ0ludCBpZiBzdXBwb3J0ZWQ/XG4gICAgLy8gbGV0IHhCaWdJbnQgPSBCaWdJbnQoaW50ZWdlclBhcnQoeCkpO1xuICAgIC8vIHhCaWdJbnQgPSBCaWdJbnQuYXNVaW50Tig2NCwgeEJpZ0ludCk7XG4gICAgLy8gcmV0dXJuIE51bWJlcih4QmlnSW50KTtcbiAgICByZXR1cm4geDtcbn1cblxuZnVuY3Rpb24gYXNzZXJ0UmVhZGFibGVTdHJlYW0oeCwgY29udGV4dCkge1xuICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbSh4KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9IGlzIG5vdCBhIFJlYWRhYmxlU3RyZWFtLmApO1xuICAgIH1cbn1cblxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtLlxuZnVuY3Rpb24gQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcihzdHJlYW0pIHtcbiAgICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcihzdHJlYW0pO1xufVxuLy8gUmVhZGFibGVTdHJlYW0gQVBJIGV4cG9zZWQgZm9yIGNvbnRyb2xsZXJzLlxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1BZGRSZWFkUmVxdWVzdChzdHJlYW0sIHJlYWRSZXF1ZXN0KSB7XG4gICAgc3RyZWFtLl9yZWFkZXIuX3JlYWRSZXF1ZXN0cy5wdXNoKHJlYWRSZXF1ZXN0KTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRnVsZmlsbFJlYWRSZXF1ZXN0KHN0cmVhbSwgY2h1bmssIGRvbmUpIHtcbiAgICBjb25zdCByZWFkZXIgPSBzdHJlYW0uX3JlYWRlcjtcbiAgICBjb25zdCByZWFkUmVxdWVzdCA9IHJlYWRlci5fcmVhZFJlcXVlc3RzLnNoaWZ0KCk7XG4gICAgaWYgKGRvbmUpIHtcbiAgICAgICAgcmVhZFJlcXVlc3QuX2Nsb3NlU3RlcHMoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlYWRSZXF1ZXN0Ll9jaHVua1N0ZXBzKGNodW5rKTtcbiAgICB9XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRSZXF1ZXN0cyhzdHJlYW0pIHtcbiAgICByZXR1cm4gc3RyZWFtLl9yZWFkZXIuX3JlYWRSZXF1ZXN0cy5sZW5ndGg7XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUhhc0RlZmF1bHRSZWFkZXIoc3RyZWFtKSB7XG4gICAgY29uc3QgcmVhZGVyID0gc3RyZWFtLl9yZWFkZXI7XG4gICAgaWYgKHJlYWRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcihyZWFkZXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG4vKipcbiAqIEEgZGVmYXVsdCByZWFkZXIgdmVuZGVkIGJ5IGEge0BsaW5rIFJlYWRhYmxlU3RyZWFtfS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlciB7XG4gICAgY29uc3RydWN0b3Ioc3RyZWFtKSB7XG4gICAgICAgIGFzc2VydFJlcXVpcmVkQXJndW1lbnQoc3RyZWFtLCAxLCAnUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyJyk7XG4gICAgICAgIGFzc2VydFJlYWRhYmxlU3RyZWFtKHN0cmVhbSwgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgICAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbUxvY2tlZChzdHJlYW0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlzIHN0cmVhbSBoYXMgYWxyZWFkeSBiZWVuIGxvY2tlZCBmb3IgZXhjbHVzaXZlIHJlYWRpbmcgYnkgYW5vdGhlciByZWFkZXInKTtcbiAgICAgICAgfVxuICAgICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNJbml0aWFsaXplKHRoaXMsIHN0cmVhbSk7XG4gICAgICAgIHRoaXMuX3JlYWRSZXF1ZXN0cyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmUgZnVsZmlsbGVkIHdoZW4gdGhlIHN0cmVhbSBiZWNvbWVzIGNsb3NlZCxcbiAgICAgKiBvciByZWplY3RlZCBpZiB0aGUgc3RyZWFtIGV2ZXIgZXJyb3JzIG9yIHRoZSByZWFkZXIncyBsb2NrIGlzIHJlbGVhc2VkIGJlZm9yZSB0aGUgc3RyZWFtIGZpbmlzaGVzIGNsb3NpbmcuXG4gICAgICovXG4gICAgZ2V0IGNsb3NlZCgpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcih0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Nsb3NlZCcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2xvc2VkUHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgdGhlIHJlYWRlciBpcyBhY3RpdmUsIGJlaGF2ZXMgdGhlIHNhbWUgYXMge0BsaW5rIFJlYWRhYmxlU3RyZWFtLmNhbmNlbCB8IHN0cmVhbS5jYW5jZWwocmVhc29uKX0uXG4gICAgICovXG4gICAgY2FuY2VsKHJlYXNvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0UmVhZGVyQnJhbmRDaGVja0V4Y2VwdGlvbignY2FuY2VsJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHJlYWRlckxvY2tFeGNlcHRpb24oJ2NhbmNlbCcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljQ2FuY2VsKHRoaXMsIHJlYXNvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgYWxsb3dzIGFjY2VzcyB0byB0aGUgbmV4dCBjaHVuayBmcm9tIHRoZSBzdHJlYW0ncyBpbnRlcm5hbCBxdWV1ZSwgaWYgYXZhaWxhYmxlLlxuICAgICAqXG4gICAgICogSWYgcmVhZGluZyBhIGNodW5rIGNhdXNlcyB0aGUgcXVldWUgdG8gYmVjb21lIGVtcHR5LCBtb3JlIGRhdGEgd2lsbCBiZSBwdWxsZWQgZnJvbSB0aGUgdW5kZXJseWluZyBzb3VyY2UuXG4gICAgICovXG4gICAgcmVhZCgpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcih0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ3JlYWQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX293bmVyUmVhZGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgocmVhZGVyTG9ja0V4Y2VwdGlvbigncmVhZCBmcm9tJykpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXNvbHZlUHJvbWlzZTtcbiAgICAgICAgbGV0IHJlamVjdFByb21pc2U7XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXdQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHJlamVjdFByb21pc2UgPSByZWplY3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByZWFkUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIF9jaHVua1N0ZXBzOiBjaHVuayA9PiByZXNvbHZlUHJvbWlzZSh7IHZhbHVlOiBjaHVuaywgZG9uZTogZmFsc2UgfSksXG4gICAgICAgICAgICBfY2xvc2VTdGVwczogKCkgPT4gcmVzb2x2ZVByb21pc2UoeyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH0pLFxuICAgICAgICAgICAgX2Vycm9yU3RlcHM6IGUgPT4gcmVqZWN0UHJvbWlzZShlKVxuICAgICAgICB9O1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJSZWFkKHRoaXMsIHJlYWRSZXF1ZXN0KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbGVhc2VzIHRoZSByZWFkZXIncyBsb2NrIG9uIHRoZSBjb3JyZXNwb25kaW5nIHN0cmVhbS4gQWZ0ZXIgdGhlIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSByZWFkZXIgaXMgbm8gbG9uZ2VyIGFjdGl2ZS5cbiAgICAgKiBJZiB0aGUgYXNzb2NpYXRlZCBzdHJlYW0gaXMgZXJyb3JlZCB3aGVuIHRoZSBsb2NrIGlzIHJlbGVhc2VkLCB0aGUgcmVhZGVyIHdpbGwgYXBwZWFyIGVycm9yZWQgaW4gdGhlIHNhbWUgd2F5XG4gICAgICogZnJvbSBub3cgb247IG90aGVyd2lzZSwgdGhlIHJlYWRlciB3aWxsIGFwcGVhciBjbG9zZWQuXG4gICAgICpcbiAgICAgKiBBIHJlYWRlcidzIGxvY2sgY2Fubm90IGJlIHJlbGVhc2VkIHdoaWxlIGl0IHN0aWxsIGhhcyBhIHBlbmRpbmcgcmVhZCByZXF1ZXN0LCBpLmUuLCBpZiBhIHByb21pc2UgcmV0dXJuZWQgYnlcbiAgICAgKiB0aGUgcmVhZGVyJ3Mge0BsaW5rIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlci5yZWFkIHwgcmVhZCgpfSBtZXRob2QgaGFzIG5vdCB5ZXQgYmVlbiBzZXR0bGVkLiBBdHRlbXB0aW5nIHRvXG4gICAgICogZG8gc28gd2lsbCB0aHJvdyBhIGBUeXBlRXJyb3JgIGFuZCBsZWF2ZSB0aGUgcmVhZGVyIGxvY2tlZCB0byB0aGUgc3RyZWFtLlxuICAgICAqL1xuICAgIHJlbGVhc2VMb2NrKCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBkZWZhdWx0UmVhZGVyQnJhbmRDaGVja0V4Y2VwdGlvbigncmVsZWFzZUxvY2snKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb3duZXJSZWFkYWJsZVN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3JlYWRSZXF1ZXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUcmllZCB0byByZWxlYXNlIGEgcmVhZGVyIGxvY2sgd2hlbiB0aGF0IHJlYWRlciBoYXMgcGVuZGluZyByZWFkKCkgY2FsbHMgdW4tc2V0dGxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UodGhpcyk7XG4gICAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLnByb3RvdHlwZSwge1xuICAgIGNhbmNlbDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgcmVhZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgcmVsZWFzZUxvY2s6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIGNsb3NlZDogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcsIHtcbiAgICAgICAgdmFsdWU6ICdSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXInLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbn1cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSByZWFkZXJzLlxuZnVuY3Rpb24gSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIoeCkge1xuICAgIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19yZWFkUmVxdWVzdHMnKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4IGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyO1xufVxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyUmVhZChyZWFkZXIsIHJlYWRSZXF1ZXN0KSB7XG4gICAgY29uc3Qgc3RyZWFtID0gcmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtO1xuICAgIHN0cmVhbS5fZGlzdHVyYmVkID0gdHJ1ZTtcbiAgICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgcmVhZFJlcXVlc3QuX2Nsb3NlU3RlcHMoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgICAgIHJlYWRSZXF1ZXN0Ll9lcnJvclN0ZXBzKHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3RyZWFtLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXJbUHVsbFN0ZXBzXShyZWFkUmVxdWVzdCk7XG4gICAgfVxufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlci5cbmZ1bmN0aW9uIGRlZmF1bHRSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJgKTtcbn1cblxuLy8vIDxyZWZlcmVuY2UgbGliPVwiZXMyMDE4LmFzeW5jaXRlcmFibGVcIiAvPlxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uICovXG5jb25zdCBBc3luY0l0ZXJhdG9yUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdC5nZXRQcm90b3R5cGVPZihhc3luYyBmdW5jdGlvbiogKCkgeyB9KS5wcm90b3R5cGUpO1xuXG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJlczIwMTguYXN5bmNpdGVyYWJsZVwiIC8+XG5jbGFzcyBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3JJbXBsIHtcbiAgICBjb25zdHJ1Y3RvcihyZWFkZXIsIHByZXZlbnRDYW5jZWwpIHtcbiAgICAgICAgdGhpcy5fb25nb2luZ1Byb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX2lzRmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVhZGVyID0gcmVhZGVyO1xuICAgICAgICB0aGlzLl9wcmV2ZW50Q2FuY2VsID0gcHJldmVudENhbmNlbDtcbiAgICB9XG4gICAgbmV4dCgpIHtcbiAgICAgICAgY29uc3QgbmV4dFN0ZXBzID0gKCkgPT4gdGhpcy5fbmV4dFN0ZXBzKCk7XG4gICAgICAgIHRoaXMuX29uZ29pbmdQcm9taXNlID0gdGhpcy5fb25nb2luZ1Byb21pc2UgP1xuICAgICAgICAgICAgdHJhbnNmb3JtUHJvbWlzZVdpdGgodGhpcy5fb25nb2luZ1Byb21pc2UsIG5leHRTdGVwcywgbmV4dFN0ZXBzKSA6XG4gICAgICAgICAgICBuZXh0U3RlcHMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uZ29pbmdQcm9taXNlO1xuICAgIH1cbiAgICByZXR1cm4odmFsdWUpIHtcbiAgICAgICAgY29uc3QgcmV0dXJuU3RlcHMgPSAoKSA9PiB0aGlzLl9yZXR1cm5TdGVwcyh2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbmdvaW5nUHJvbWlzZSA/XG4gICAgICAgICAgICB0cmFuc2Zvcm1Qcm9taXNlV2l0aCh0aGlzLl9vbmdvaW5nUHJvbWlzZSwgcmV0dXJuU3RlcHMsIHJldHVyblN0ZXBzKSA6XG4gICAgICAgICAgICByZXR1cm5TdGVwcygpO1xuICAgIH1cbiAgICBfbmV4dFN0ZXBzKCkge1xuICAgICAgICBpZiAodGhpcy5faXNGaW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVhZGVyID0gdGhpcy5fcmVhZGVyO1xuICAgICAgICBpZiAocmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHJlYWRlckxvY2tFeGNlcHRpb24oJ2l0ZXJhdGUnKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc29sdmVQcm9taXNlO1xuICAgICAgICBsZXQgcmVqZWN0UHJvbWlzZTtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ld1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgICAgICAgICAgcmVqZWN0UHJvbWlzZSA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlYWRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbmdvaW5nUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGRlbGF5ZWQgYnkgb25lIG1pY3JvdGFzaywgb3RoZXJ3aXNlIHdlIHN0b3AgcHVsbGluZyB0b28gZWFybHkgd2hpY2ggYnJlYWtzIGEgdGVzdC5cbiAgICAgICAgICAgICAgICAvLyBGSVhNRSBJcyB0aGlzIGEgYnVnIGluIHRoZSBzcGVjaWZpY2F0aW9uLCBvciBpbiB0aGUgdGVzdD9cbiAgICAgICAgICAgICAgICBxdWV1ZU1pY3JvdGFzaygoKSA9PiByZXNvbHZlUHJvbWlzZSh7IHZhbHVlOiBjaHVuaywgZG9uZTogZmFsc2UgfSkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9jbG9zZVN0ZXBzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25nb2luZ1Byb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZShyZWFkZXIpO1xuICAgICAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfZXJyb3JTdGVwczogcmVhc29uID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbmdvaW5nUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0ZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHJlYWRlcik7XG4gICAgICAgICAgICAgICAgcmVqZWN0UHJvbWlzZShyZWFzb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJSZWFkKHJlYWRlciwgcmVhZFJlcXVlc3QpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgX3JldHVyblN0ZXBzKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgdmFsdWUsIGRvbmU6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IHRoaXMuX3JlYWRlcjtcbiAgICAgICAgaWYgKHJlYWRlci5fb3duZXJSZWFkYWJsZVN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChyZWFkZXJMb2NrRXhjZXB0aW9uKCdmaW5pc2ggaXRlcmF0aW5nJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fcHJldmVudENhbmNlbCkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljQ2FuY2VsKHJlYWRlciwgdmFsdWUpO1xuICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZShyZWFkZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRyYW5zZm9ybVByb21pc2VXaXRoKHJlc3VsdCwgKCkgPT4gKHsgdmFsdWUsIGRvbmU6IHRydWUgfSkpO1xuICAgICAgICB9XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY1JlbGVhc2UocmVhZGVyKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgoeyB2YWx1ZSwgZG9uZTogdHJ1ZSB9KTtcbiAgICB9XG59XG5jb25zdCBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3JQcm90b3R5cGUgPSB7XG4gICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvcih0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoc3RyZWFtQXN5bmNJdGVyYXRvckJyYW5kQ2hlY2tFeGNlcHRpb24oJ25leHQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2FzeW5jSXRlcmF0b3JJbXBsLm5leHQoKTtcbiAgICB9LFxuICAgIHJldHVybih2YWx1ZSkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW1Bc3luY0l0ZXJhdG9yQnJhbmRDaGVja0V4Y2VwdGlvbigncmV0dXJuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9hc3luY0l0ZXJhdG9ySW1wbC5yZXR1cm4odmFsdWUpO1xuICAgIH1cbn07XG5pZiAoQXN5bmNJdGVyYXRvclByb3RvdHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvclByb3RvdHlwZSwgQXN5bmNJdGVyYXRvclByb3RvdHlwZSk7XG59XG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW0uXG5mdW5jdGlvbiBBY3F1aXJlUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yKHN0cmVhbSwgcHJldmVudENhbmNlbCkge1xuICAgIGNvbnN0IHJlYWRlciA9IEFjcXVpcmVSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIoc3RyZWFtKTtcbiAgICBjb25zdCBpbXBsID0gbmV3IFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvckltcGwocmVhZGVyLCBwcmV2ZW50Q2FuY2VsKTtcbiAgICBjb25zdCBpdGVyYXRvciA9IE9iamVjdC5jcmVhdGUoUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yUHJvdG90eXBlKTtcbiAgICBpdGVyYXRvci5fYXN5bmNJdGVyYXRvckltcGwgPSBpbXBsO1xuICAgIHJldHVybiBpdGVyYXRvcjtcbn1cbmZ1bmN0aW9uIElzUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yKHgpIHtcbiAgICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfYXN5bmNJdGVyYXRvckltcGwnKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIG5vaW5zcGVjdGlvbiBTdXNwaWNpb3VzVHlwZU9mR3VhcmRcbiAgICAgICAgcmV0dXJuIHguX2FzeW5jSXRlcmF0b3JJbXBsIGluc3RhbmNlb2ZcbiAgICAgICAgICAgIFJlYWRhYmxlU3RyZWFtQXN5bmNJdGVyYXRvckltcGw7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtLlxuZnVuY3Rpb24gc3RyZWFtQXN5bmNJdGVyYXRvckJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKGBSZWFkYWJsZVN0cmVhbUFzeW5jSXRlcmF0b3IuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgUmVhZGFibGVTdGVhbUFzeW5jSXRlcmF0b3JgKTtcbn1cblxuLy8vIDxyZWZlcmVuY2UgbGliPVwiZXMyMDE1LmNvcmVcIiAvPlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTnVtYmVyL2lzTmFOI1BvbHlmaWxsXG5jb25zdCBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiAoeCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICByZXR1cm4geCAhPT0geDtcbn07XG5cbmZ1bmN0aW9uIENyZWF0ZUFycmF5RnJvbUxpc3QoZWxlbWVudHMpIHtcbiAgICAvLyBXZSB1c2UgYXJyYXlzIHRvIHJlcHJlc2VudCBsaXN0cywgc28gdGhpcyBpcyBiYXNpY2FsbHkgYSBuby1vcC5cbiAgICAvLyBEbyBhIHNsaWNlIHRob3VnaCBqdXN0IGluIGNhc2Ugd2UgaGFwcGVuIHRvIGRlcGVuZCBvbiB0aGUgdW5pcXVlLW5lc3MuXG4gICAgcmV0dXJuIGVsZW1lbnRzLnNsaWNlKCk7XG59XG5mdW5jdGlvbiBDb3B5RGF0YUJsb2NrQnl0ZXMoZGVzdCwgZGVzdE9mZnNldCwgc3JjLCBzcmNPZmZzZXQsIG4pIHtcbiAgICBuZXcgVWludDhBcnJheShkZXN0KS5zZXQobmV3IFVpbnQ4QXJyYXkoc3JjLCBzcmNPZmZzZXQsIG4pLCBkZXN0T2Zmc2V0KTtcbn1cbi8vIE5vdCBpbXBsZW1lbnRlZCBjb3JyZWN0bHlcbmZ1bmN0aW9uIFRyYW5zZmVyQXJyYXlCdWZmZXIoTykge1xuICAgIHJldHVybiBPO1xufVxuLy8gTm90IGltcGxlbWVudGVkIGNvcnJlY3RseVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuZnVuY3Rpb24gSXNEZXRhY2hlZEJ1ZmZlcihPKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gQXJyYXlCdWZmZXJTbGljZShidWZmZXIsIGJlZ2luLCBlbmQpIHtcbiAgICAvLyBBcnJheUJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgaXMgbm90IGF2YWlsYWJsZSBvbiBJRTEwXG4gICAgLy8gaHR0cHM6Ly93d3cuY2FuaXVzZS5jb20vbWRuLWphdmFzY3JpcHRfYnVpbHRpbnNfYXJyYXlidWZmZXJfc2xpY2VcbiAgICBpZiAoYnVmZmVyLnNsaWNlKSB7XG4gICAgICAgIHJldHVybiBidWZmZXIuc2xpY2UoYmVnaW4sIGVuZCk7XG4gICAgfVxuICAgIGNvbnN0IGxlbmd0aCA9IGVuZCAtIGJlZ2luO1xuICAgIGNvbnN0IHNsaWNlID0gbmV3IEFycmF5QnVmZmVyKGxlbmd0aCk7XG4gICAgQ29weURhdGFCbG9ja0J5dGVzKHNsaWNlLCAwLCBidWZmZXIsIGJlZ2luLCBsZW5ndGgpO1xuICAgIHJldHVybiBzbGljZTtcbn1cblxuZnVuY3Rpb24gSXNOb25OZWdhdGl2ZU51bWJlcih2KSB7XG4gICAgaWYgKHR5cGVvZiB2ICE9PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChOdW1iZXJJc05hTih2KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh2IDwgMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gQ2xvbmVBc1VpbnQ4QXJyYXkoTykge1xuICAgIGNvbnN0IGJ1ZmZlciA9IEFycmF5QnVmZmVyU2xpY2UoTy5idWZmZXIsIE8uYnl0ZU9mZnNldCwgTy5ieXRlT2Zmc2V0ICsgTy5ieXRlTGVuZ3RoKTtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKTtcbn1cblxuZnVuY3Rpb24gRGVxdWV1ZVZhbHVlKGNvbnRhaW5lcikge1xuICAgIGNvbnN0IHBhaXIgPSBjb250YWluZXIuX3F1ZXVlLnNoaWZ0KCk7XG4gICAgY29udGFpbmVyLl9xdWV1ZVRvdGFsU2l6ZSAtPSBwYWlyLnNpemU7XG4gICAgaWYgKGNvbnRhaW5lci5fcXVldWVUb3RhbFNpemUgPCAwKSB7XG4gICAgICAgIGNvbnRhaW5lci5fcXVldWVUb3RhbFNpemUgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gcGFpci52YWx1ZTtcbn1cbmZ1bmN0aW9uIEVucXVldWVWYWx1ZVdpdGhTaXplKGNvbnRhaW5lciwgdmFsdWUsIHNpemUpIHtcbiAgICBpZiAoIUlzTm9uTmVnYXRpdmVOdW1iZXIoc2l6ZSkgfHwgc2l6ZSA9PT0gSW5maW5pdHkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1NpemUgbXVzdCBiZSBhIGZpbml0ZSwgbm9uLU5hTiwgbm9uLW5lZ2F0aXZlIG51bWJlci4nKTtcbiAgICB9XG4gICAgY29udGFpbmVyLl9xdWV1ZS5wdXNoKHsgdmFsdWUsIHNpemUgfSk7XG4gICAgY29udGFpbmVyLl9xdWV1ZVRvdGFsU2l6ZSArPSBzaXplO1xufVxuZnVuY3Rpb24gUGVla1F1ZXVlVmFsdWUoY29udGFpbmVyKSB7XG4gICAgY29uc3QgcGFpciA9IGNvbnRhaW5lci5fcXVldWUucGVlaygpO1xuICAgIHJldHVybiBwYWlyLnZhbHVlO1xufVxuZnVuY3Rpb24gUmVzZXRRdWV1ZShjb250YWluZXIpIHtcbiAgICBjb250YWluZXIuX3F1ZXVlID0gbmV3IFNpbXBsZVF1ZXVlKCk7XG4gICAgY29udGFpbmVyLl9xdWV1ZVRvdGFsU2l6ZSA9IDA7XG59XG5cbi8qKlxuICogQSBwdWxsLWludG8gcmVxdWVzdCBpbiBhIHtAbGluayBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyfS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbGxlZ2FsIGNvbnN0cnVjdG9yJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZpZXcgZm9yIHdyaXRpbmcgaW4gdG8sIG9yIGBudWxsYCBpZiB0aGUgQllPQiByZXF1ZXN0IGhhcyBhbHJlYWR5IGJlZW4gcmVzcG9uZGVkIHRvLlxuICAgICAqL1xuICAgIGdldCB2aWV3KCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCh0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgYnlvYlJlcXVlc3RCcmFuZENoZWNrRXhjZXB0aW9uKCd2aWV3Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZXc7XG4gICAgfVxuICAgIHJlc3BvbmQoYnl0ZXNXcml0dGVuKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0KHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBieW9iUmVxdWVzdEJyYW5kQ2hlY2tFeGNlcHRpb24oJ3Jlc3BvbmQnKTtcbiAgICAgICAgfVxuICAgICAgICBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50KGJ5dGVzV3JpdHRlbiwgMSwgJ3Jlc3BvbmQnKTtcbiAgICAgICAgYnl0ZXNXcml0dGVuID0gY29udmVydFVuc2lnbmVkTG9uZ0xvbmdXaXRoRW5mb3JjZVJhbmdlKGJ5dGVzV3JpdHRlbiwgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgICAgICBpZiAodGhpcy5fYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhpcyBCWU9CIHJlcXVlc3QgaGFzIGJlZW4gaW52YWxpZGF0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXNEZXRhY2hlZEJ1ZmZlcih0aGlzLl92aWV3LmJ1ZmZlcikpIDtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmQodGhpcy5fYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIsIGJ5dGVzV3JpdHRlbik7XG4gICAgfVxuICAgIHJlc3BvbmRXaXRoTmV3Vmlldyh2aWV3KSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0KHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBieW9iUmVxdWVzdEJyYW5kQ2hlY2tFeGNlcHRpb24oJ3Jlc3BvbmRXaXRoTmV3VmlldycpO1xuICAgICAgICB9XG4gICAgICAgIGFzc2VydFJlcXVpcmVkQXJndW1lbnQodmlldywgMSwgJ3Jlc3BvbmRXaXRoTmV3VmlldycpO1xuICAgICAgICBpZiAoIUFycmF5QnVmZmVyLmlzVmlldyh2aWV3KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IGNhbiBvbmx5IHJlc3BvbmQgd2l0aCBhcnJheSBidWZmZXIgdmlld3MnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhpcyBCWU9CIHJlcXVlc3QgaGFzIGJlZW4gaW52YWxpZGF0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXNEZXRhY2hlZEJ1ZmZlcih2aWV3LmJ1ZmZlcikpIDtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRXaXRoTmV3Vmlldyh0aGlzLl9hc3NvY2lhdGVkUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciwgdmlldyk7XG4gICAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdC5wcm90b3R5cGUsIHtcbiAgICByZXNwb25kOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICByZXNwb25kV2l0aE5ld1ZpZXc6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIHZpZXc6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZywge1xuICAgICAgICB2YWx1ZTogJ1JlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QnLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbn1cbi8qKlxuICogQWxsb3dzIGNvbnRyb2wgb2YgYSB7QGxpbmsgUmVhZGFibGVTdHJlYW0gfCByZWFkYWJsZSBieXRlIHN0cmVhbX0ncyBzdGF0ZSBhbmQgaW50ZXJuYWwgcXVldWUuXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSWxsZWdhbCBjb25zdHJ1Y3RvcicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IEJZT0IgcHVsbCByZXF1ZXN0LCBvciBgbnVsbGAgaWYgdGhlcmUgaXNuJ3Qgb25lLlxuICAgICAqL1xuICAgIGdldCBieW9iUmVxdWVzdCgpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGJ5dGVTdHJlYW1Db250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignYnlvYlJlcXVlc3QnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckdldEJZT0JSZXF1ZXN0KHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkZXNpcmVkIHNpemUgdG8gZmlsbCB0aGUgY29udHJvbGxlZCBzdHJlYW0ncyBpbnRlcm5hbCBxdWV1ZS4gSXQgY2FuIGJlIG5lZ2F0aXZlLCBpZiB0aGUgcXVldWUgaXNcbiAgICAgKiBvdmVyLWZ1bGwuIEFuIHVuZGVybHlpbmcgYnl0ZSBzb3VyY2Ugb3VnaHQgdG8gdXNlIHRoaXMgaW5mb3JtYXRpb24gdG8gZGV0ZXJtaW5lIHdoZW4gYW5kIGhvdyB0byBhcHBseSBiYWNrcHJlc3N1cmUuXG4gICAgICovXG4gICAgZ2V0IGRlc2lyZWRTaXplKCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcih0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgYnl0ZVN0cmVhbUNvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdkZXNpcmVkU2l6ZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyR2V0RGVzaXJlZFNpemUodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgY29udHJvbGxlZCByZWFkYWJsZSBzdHJlYW0uIENvbnN1bWVycyB3aWxsIHN0aWxsIGJlIGFibGUgdG8gcmVhZCBhbnkgcHJldmlvdXNseS1lbnF1ZXVlZCBjaHVua3MgZnJvbVxuICAgICAqIHRoZSBzdHJlYW0sIGJ1dCBvbmNlIHRob3NlIGFyZSByZWFkLCB0aGUgc3RyZWFtIHdpbGwgYmVjb21lIGNsb3NlZC5cbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGJ5dGVTdHJlYW1Db250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignY2xvc2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY2xvc2VSZXF1ZXN0ZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBzdHJlYW0gaGFzIGFscmVhZHkgYmVlbiBjbG9zZWQ7IGRvIG5vdCBjbG9zZSBpdCBhZ2FpbiEnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0uX3N0YXRlO1xuICAgICAgICBpZiAoc3RhdGUgIT09ICdyZWFkYWJsZScpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFRoZSBzdHJlYW0gKGluICR7c3RhdGV9IHN0YXRlKSBpcyBub3QgaW4gdGhlIHJlYWRhYmxlIHN0YXRlIGFuZCBjYW5ub3QgYmUgY2xvc2VkYCk7XG4gICAgICAgIH1cbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsb3NlKHRoaXMpO1xuICAgIH1cbiAgICBlbnF1ZXVlKGNodW5rKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBieXRlU3RyZWFtQ29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2VucXVldWUnKTtcbiAgICAgICAgfVxuICAgICAgICBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50KGNodW5rLCAxLCAnZW5xdWV1ZScpO1xuICAgICAgICBpZiAoIUFycmF5QnVmZmVyLmlzVmlldyhjaHVuaykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NodW5rIG11c3QgYmUgYW4gYXJyYXkgYnVmZmVyIHZpZXcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2h1bmsuYnl0ZUxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignY2h1bmsgbXVzdCBoYXZlIG5vbi16ZXJvIGJ5dGVMZW5ndGgnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2h1bmsuYnVmZmVyLmJ5dGVMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGNodW5rJ3MgYnVmZmVyIG11c3QgaGF2ZSBub24temVybyBieXRlTGVuZ3RoYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2Nsb3NlUmVxdWVzdGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzdHJlYW0gaXMgY2xvc2VkIG9yIGRyYWluaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtLl9zdGF0ZTtcbiAgICAgICAgaWYgKHN0YXRlICE9PSAncmVhZGFibGUnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGUgc3RyZWFtIChpbiAke3N0YXRlfSBzdGF0ZSkgaXMgbm90IGluIHRoZSByZWFkYWJsZSBzdGF0ZSBhbmQgY2Fubm90IGJlIGVucXVldWVkIHRvYCk7XG4gICAgICAgIH1cbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWUodGhpcywgY2h1bmspO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFcnJvcnMgdGhlIGNvbnRyb2xsZWQgcmVhZGFibGUgc3RyZWFtLCBtYWtpbmcgYWxsIGZ1dHVyZSBpbnRlcmFjdGlvbnMgd2l0aCBpdCBmYWlsIHdpdGggdGhlIGdpdmVuIGVycm9yIGBlYC5cbiAgICAgKi9cbiAgICBlcnJvcihlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBieXRlU3RyZWFtQ29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKHRoaXMsIGUpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgW0NhbmNlbFN0ZXBzXShyZWFzb24pIHtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsZWFyUGVuZGluZ1B1bGxJbnRvcyh0aGlzKTtcbiAgICAgICAgUmVzZXRRdWV1ZSh0aGlzKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fY2FuY2VsQWxnb3JpdGhtKHJlYXNvbik7XG4gICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbGVhckFsZ29yaXRobXModGhpcyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBbUHVsbFN0ZXBzXShyZWFkUmVxdWVzdCkge1xuICAgICAgICBjb25zdCBzdHJlYW0gPSB0aGlzLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtO1xuICAgICAgICBpZiAodGhpcy5fcXVldWVUb3RhbFNpemUgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeSA9IHRoaXMuX3F1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLl9xdWV1ZVRvdGFsU2l6ZSAtPSBlbnRyeS5ieXRlTGVuZ3RoO1xuICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckhhbmRsZVF1ZXVlRHJhaW4odGhpcyk7XG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZW50cnkuYnVmZmVyLCBlbnRyeS5ieXRlT2Zmc2V0LCBlbnRyeS5ieXRlTGVuZ3RoKTtcbiAgICAgICAgICAgIHJlYWRSZXF1ZXN0Ll9jaHVua1N0ZXBzKHZpZXcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSA9IHRoaXMuX2F1dG9BbGxvY2F0ZUNodW5rU2l6ZTtcbiAgICAgICAgaWYgKGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgYnVmZmVyO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYXV0b0FsbG9jYXRlQ2h1bmtTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChidWZmZXJFKSB7XG4gICAgICAgICAgICAgICAgcmVhZFJlcXVlc3QuX2Vycm9yU3RlcHMoYnVmZmVyRSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcHVsbEludG9EZXNjcmlwdG9yID0ge1xuICAgICAgICAgICAgICAgIGJ1ZmZlcixcbiAgICAgICAgICAgICAgICBidWZmZXJCeXRlTGVuZ3RoOiBhdXRvQWxsb2NhdGVDaHVua1NpemUsXG4gICAgICAgICAgICAgICAgYnl0ZU9mZnNldDogMCxcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBhdXRvQWxsb2NhdGVDaHVua1NpemUsXG4gICAgICAgICAgICAgICAgYnl0ZXNGaWxsZWQ6IDAsXG4gICAgICAgICAgICAgICAgZWxlbWVudFNpemU6IDEsXG4gICAgICAgICAgICAgICAgdmlld0NvbnN0cnVjdG9yOiBVaW50OEFycmF5LFxuICAgICAgICAgICAgICAgIHJlYWRlclR5cGU6ICdkZWZhdWx0J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdQdWxsSW50b3MucHVzaChwdWxsSW50b0Rlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtQWRkUmVhZFJlcXVlc3Qoc3RyZWFtLCByZWFkUmVxdWVzdCk7XG4gICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKHRoaXMpO1xuICAgIH1cbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIucHJvdG90eXBlLCB7XG4gICAgY2xvc2U6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIGVucXVldWU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIGVycm9yOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBieW9iUmVxdWVzdDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgZGVzaXJlZFNpemU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZywge1xuICAgICAgICB2YWx1ZTogJ1JlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXInLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbn1cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLlxuZnVuY3Rpb24gSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHgpIHtcbiAgICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbScpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyO1xufVxuZnVuY3Rpb24gSXNSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0KHgpIHtcbiAgICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfYXNzb2NpYXRlZFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXInKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4IGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdDtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBzaG91bGRQdWxsID0gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclNob3VsZENhbGxQdWxsKGNvbnRyb2xsZXIpO1xuICAgIGlmICghc2hvdWxkUHVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb250cm9sbGVyLl9wdWxsaW5nKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX3B1bGxBZ2FpbiA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29udHJvbGxlci5fcHVsbGluZyA9IHRydWU7XG4gICAgLy8gVE9ETzogVGVzdCBjb250cm9sbGVyIGFyZ3VtZW50XG4gICAgY29uc3QgcHVsbFByb21pc2UgPSBjb250cm9sbGVyLl9wdWxsQWxnb3JpdGhtKCk7XG4gICAgdXBvblByb21pc2UocHVsbFByb21pc2UsICgpID0+IHtcbiAgICAgICAgY29udHJvbGxlci5fcHVsbGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAoY29udHJvbGxlci5fcHVsbEFnYWluKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyLl9wdWxsQWdhaW4gPSBmYWxzZTtcbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgfSwgZSA9PiB7XG4gICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBlKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbGVhclBlbmRpbmdQdWxsSW50b3MoY29udHJvbGxlcikge1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJJbnZhbGlkYXRlQllPQlJlcXVlc3QoY29udHJvbGxlcik7XG4gICAgY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNvbW1pdFB1bGxJbnRvRGVzY3JpcHRvcihzdHJlYW0sIHB1bGxJbnRvRGVzY3JpcHRvcikge1xuICAgIGxldCBkb25lID0gZmFsc2U7XG4gICAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBmaWxsZWRWaWV3ID0gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNvbnZlcnRQdWxsSW50b0Rlc2NyaXB0b3IocHVsbEludG9EZXNjcmlwdG9yKTtcbiAgICBpZiAocHVsbEludG9EZXNjcmlwdG9yLnJlYWRlclR5cGUgPT09ICdkZWZhdWx0Jykge1xuICAgICAgICBSZWFkYWJsZVN0cmVhbUZ1bGZpbGxSZWFkUmVxdWVzdChzdHJlYW0sIGZpbGxlZFZpZXcsIGRvbmUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1GdWxmaWxsUmVhZEludG9SZXF1ZXN0KHN0cmVhbSwgZmlsbGVkVmlldywgZG9uZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNvbnZlcnRQdWxsSW50b0Rlc2NyaXB0b3IocHVsbEludG9EZXNjcmlwdG9yKSB7XG4gICAgY29uc3QgYnl0ZXNGaWxsZWQgPSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQ7XG4gICAgY29uc3QgZWxlbWVudFNpemUgPSBwdWxsSW50b0Rlc2NyaXB0b3IuZWxlbWVudFNpemU7XG4gICAgcmV0dXJuIG5ldyBwdWxsSW50b0Rlc2NyaXB0b3Iudmlld0NvbnN0cnVjdG9yKHB1bGxJbnRvRGVzY3JpcHRvci5idWZmZXIsIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlT2Zmc2V0LCBieXRlc0ZpbGxlZCAvIGVsZW1lbnRTaXplKTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlQ2h1bmtUb1F1ZXVlKGNvbnRyb2xsZXIsIGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICAgIGNvbnRyb2xsZXIuX3F1ZXVlLnB1c2goeyBidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGggfSk7XG4gICAgY29udHJvbGxlci5fcXVldWVUb3RhbFNpemUgKz0gYnl0ZUxlbmd0aDtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGaWxsUHVsbEludG9EZXNjcmlwdG9yRnJvbVF1ZXVlKGNvbnRyb2xsZXIsIHB1bGxJbnRvRGVzY3JpcHRvcikge1xuICAgIGNvbnN0IGVsZW1lbnRTaXplID0gcHVsbEludG9EZXNjcmlwdG9yLmVsZW1lbnRTaXplO1xuICAgIGNvbnN0IGN1cnJlbnRBbGlnbmVkQnl0ZXMgPSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgLSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgJSBlbGVtZW50U2l6ZTtcbiAgICBjb25zdCBtYXhCeXRlc1RvQ29weSA9IE1hdGgubWluKGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplLCBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZUxlbmd0aCAtIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZCk7XG4gICAgY29uc3QgbWF4Qnl0ZXNGaWxsZWQgPSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgKyBtYXhCeXRlc1RvQ29weTtcbiAgICBjb25zdCBtYXhBbGlnbmVkQnl0ZXMgPSBtYXhCeXRlc0ZpbGxlZCAtIG1heEJ5dGVzRmlsbGVkICUgZWxlbWVudFNpemU7XG4gICAgbGV0IHRvdGFsQnl0ZXNUb0NvcHlSZW1haW5pbmcgPSBtYXhCeXRlc1RvQ29weTtcbiAgICBsZXQgcmVhZHkgPSBmYWxzZTtcbiAgICBpZiAobWF4QWxpZ25lZEJ5dGVzID4gY3VycmVudEFsaWduZWRCeXRlcykge1xuICAgICAgICB0b3RhbEJ5dGVzVG9Db3B5UmVtYWluaW5nID0gbWF4QWxpZ25lZEJ5dGVzIC0gcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkO1xuICAgICAgICByZWFkeSA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IHF1ZXVlID0gY29udHJvbGxlci5fcXVldWU7XG4gICAgd2hpbGUgKHRvdGFsQnl0ZXNUb0NvcHlSZW1haW5pbmcgPiAwKSB7XG4gICAgICAgIGNvbnN0IGhlYWRPZlF1ZXVlID0gcXVldWUucGVlaygpO1xuICAgICAgICBjb25zdCBieXRlc1RvQ29weSA9IE1hdGgubWluKHRvdGFsQnl0ZXNUb0NvcHlSZW1haW5pbmcsIGhlYWRPZlF1ZXVlLmJ5dGVMZW5ndGgpO1xuICAgICAgICBjb25zdCBkZXN0U3RhcnQgPSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZU9mZnNldCArIHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlc0ZpbGxlZDtcbiAgICAgICAgQ29weURhdGFCbG9ja0J5dGVzKHB1bGxJbnRvRGVzY3JpcHRvci5idWZmZXIsIGRlc3RTdGFydCwgaGVhZE9mUXVldWUuYnVmZmVyLCBoZWFkT2ZRdWV1ZS5ieXRlT2Zmc2V0LCBieXRlc1RvQ29weSk7XG4gICAgICAgIGlmIChoZWFkT2ZRdWV1ZS5ieXRlTGVuZ3RoID09PSBieXRlc1RvQ29weSkge1xuICAgICAgICAgICAgcXVldWUuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhlYWRPZlF1ZXVlLmJ5dGVPZmZzZXQgKz0gYnl0ZXNUb0NvcHk7XG4gICAgICAgICAgICBoZWFkT2ZRdWV1ZS5ieXRlTGVuZ3RoIC09IGJ5dGVzVG9Db3B5O1xuICAgICAgICB9XG4gICAgICAgIGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplIC09IGJ5dGVzVG9Db3B5O1xuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRmlsbEhlYWRQdWxsSW50b0Rlc2NyaXB0b3IoY29udHJvbGxlciwgYnl0ZXNUb0NvcHksIHB1bGxJbnRvRGVzY3JpcHRvcik7XG4gICAgICAgIHRvdGFsQnl0ZXNUb0NvcHlSZW1haW5pbmcgLT0gYnl0ZXNUb0NvcHk7XG4gICAgfVxuICAgIHJldHVybiByZWFkeTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGaWxsSGVhZFB1bGxJbnRvRGVzY3JpcHRvcihjb250cm9sbGVyLCBzaXplLCBwdWxsSW50b0Rlc2NyaXB0b3IpIHtcbiAgICBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgKz0gc2l6ZTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJIYW5kbGVRdWV1ZURyYWluKGNvbnRyb2xsZXIpIHtcbiAgICBpZiAoY29udHJvbGxlci5fcXVldWVUb3RhbFNpemUgPT09IDAgJiYgY29udHJvbGxlci5fY2xvc2VSZXF1ZXN0ZWQpIHtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKTtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1DbG9zZShjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJJbnZhbGlkYXRlQllPQlJlcXVlc3QoY29udHJvbGxlcikge1xuICAgIGlmIChjb250cm9sbGVyLl9ieW9iUmVxdWVzdCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnRyb2xsZXIuX2J5b2JSZXF1ZXN0Ll9hc3NvY2lhdGVkUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciA9IHVuZGVmaW5lZDtcbiAgICBjb250cm9sbGVyLl9ieW9iUmVxdWVzdC5fdmlldyA9IG51bGw7XG4gICAgY29udHJvbGxlci5fYnlvYlJlcXVlc3QgPSBudWxsO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclByb2Nlc3NQdWxsSW50b0Rlc2NyaXB0b3JzVXNpbmdRdWV1ZShjb250cm9sbGVyKSB7XG4gICAgd2hpbGUgKGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoY29udHJvbGxlci5fcXVldWVUb3RhbFNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwdWxsSW50b0Rlc2NyaXB0b3IgPSBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnBlZWsoKTtcbiAgICAgICAgaWYgKFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGaWxsUHVsbEludG9EZXNjcmlwdG9yRnJvbVF1ZXVlKGNvbnRyb2xsZXIsIHB1bGxJbnRvRGVzY3JpcHRvcikpIHtcbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJTaGlmdFBlbmRpbmdQdWxsSW50byhjb250cm9sbGVyKTtcbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDb21taXRQdWxsSW50b0Rlc2NyaXB0b3IoY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbSwgcHVsbEludG9EZXNjcmlwdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJQdWxsSW50byhjb250cm9sbGVyLCB2aWV3LCByZWFkSW50b1JlcXVlc3QpIHtcbiAgICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtO1xuICAgIGxldCBlbGVtZW50U2l6ZSA9IDE7XG4gICAgaWYgKHZpZXcuY29uc3RydWN0b3IgIT09IERhdGFWaWV3KSB7XG4gICAgICAgIGVsZW1lbnRTaXplID0gdmlldy5jb25zdHJ1Y3Rvci5CWVRFU19QRVJfRUxFTUVOVDtcbiAgICB9XG4gICAgY29uc3QgY3RvciA9IHZpZXcuY29uc3RydWN0b3I7XG4gICAgLy8gdHJ5IHtcbiAgICBjb25zdCBidWZmZXIgPSBUcmFuc2ZlckFycmF5QnVmZmVyKHZpZXcuYnVmZmVyKTtcbiAgICAvLyB9IGNhdGNoIChlKSB7XG4gICAgLy8gICByZWFkSW50b1JlcXVlc3QuX2Vycm9yU3RlcHMoZSk7XG4gICAgLy8gICByZXR1cm47XG4gICAgLy8gfVxuICAgIGNvbnN0IHB1bGxJbnRvRGVzY3JpcHRvciA9IHtcbiAgICAgICAgYnVmZmVyLFxuICAgICAgICBidWZmZXJCeXRlTGVuZ3RoOiBidWZmZXIuYnl0ZUxlbmd0aCxcbiAgICAgICAgYnl0ZU9mZnNldDogdmlldy5ieXRlT2Zmc2V0LFxuICAgICAgICBieXRlTGVuZ3RoOiB2aWV3LmJ5dGVMZW5ndGgsXG4gICAgICAgIGJ5dGVzRmlsbGVkOiAwLFxuICAgICAgICBlbGVtZW50U2l6ZSxcbiAgICAgICAgdmlld0NvbnN0cnVjdG9yOiBjdG9yLFxuICAgICAgICByZWFkZXJUeXBlOiAnYnlvYidcbiAgICB9O1xuICAgIGlmIChjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5wdXNoKHB1bGxJbnRvRGVzY3JpcHRvcik7XG4gICAgICAgIC8vIE5vIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKCkgY2FsbCBzaW5jZTpcbiAgICAgICAgLy8gLSBObyBjaGFuZ2UgaGFwcGVucyBvbiBkZXNpcmVkU2l6ZVxuICAgICAgICAvLyAtIFRoZSBzb3VyY2UgaGFzIGFscmVhZHkgYmVlbiBub3RpZmllZCBvZiB0aGF0IHRoZXJlJ3MgYXQgbGVhc3QgMSBwZW5kaW5nIHJlYWQodmlldylcbiAgICAgICAgUmVhZGFibGVTdHJlYW1BZGRSZWFkSW50b1JlcXVlc3Qoc3RyZWFtLCByZWFkSW50b1JlcXVlc3QpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdHJlYW0uX3N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICBjb25zdCBlbXB0eVZpZXcgPSBuZXcgY3RvcihwdWxsSW50b0Rlc2NyaXB0b3IuYnVmZmVyLCBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZU9mZnNldCwgMCk7XG4gICAgICAgIHJlYWRJbnRvUmVxdWVzdC5fY2xvc2VTdGVwcyhlbXB0eVZpZXcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA+IDApIHtcbiAgICAgICAgaWYgKFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGaWxsUHVsbEludG9EZXNjcmlwdG9yRnJvbVF1ZXVlKGNvbnRyb2xsZXIsIHB1bGxJbnRvRGVzY3JpcHRvcikpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGxlZFZpZXcgPSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ29udmVydFB1bGxJbnRvRGVzY3JpcHRvcihwdWxsSW50b0Rlc2NyaXB0b3IpO1xuICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckhhbmRsZVF1ZXVlRHJhaW4oY29udHJvbGxlcik7XG4gICAgICAgICAgICByZWFkSW50b1JlcXVlc3QuX2NodW5rU3RlcHMoZmlsbGVkVmlldyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBlID0gbmV3IFR5cGVFcnJvcignSW5zdWZmaWNpZW50IGJ5dGVzIHRvIGZpbGwgZWxlbWVudHMgaW4gdGhlIGdpdmVuIGJ1ZmZlcicpO1xuICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGNvbnRyb2xsZXIsIGUpO1xuICAgICAgICAgICAgcmVhZEludG9SZXF1ZXN0Ll9lcnJvclN0ZXBzKGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucHVzaChwdWxsSW50b0Rlc2NyaXB0b3IpO1xuICAgIFJlYWRhYmxlU3RyZWFtQWRkUmVhZEludG9SZXF1ZXN0KHN0cmVhbSwgcmVhZEludG9SZXF1ZXN0KTtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kSW5DbG9zZWRTdGF0ZShjb250cm9sbGVyLCBmaXJzdERlc2NyaXB0b3IpIHtcbiAgICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtO1xuICAgIGlmIChSZWFkYWJsZVN0cmVhbUhhc0JZT0JSZWFkZXIoc3RyZWFtKSkge1xuICAgICAgICB3aGlsZSAoUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkSW50b1JlcXVlc3RzKHN0cmVhbSkgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBwdWxsSW50b0Rlc2NyaXB0b3IgPSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyU2hpZnRQZW5kaW5nUHVsbEludG8oY29udHJvbGxlcik7XG4gICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ29tbWl0UHVsbEludG9EZXNjcmlwdG9yKHN0cmVhbSwgcHVsbEludG9EZXNjcmlwdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kSW5SZWFkYWJsZVN0YXRlKGNvbnRyb2xsZXIsIGJ5dGVzV3JpdHRlbiwgcHVsbEludG9EZXNjcmlwdG9yKSB7XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckZpbGxIZWFkUHVsbEludG9EZXNjcmlwdG9yKGNvbnRyb2xsZXIsIGJ5dGVzV3JpdHRlbiwgcHVsbEludG9EZXNjcmlwdG9yKTtcbiAgICBpZiAocHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkIDwgcHVsbEludG9EZXNjcmlwdG9yLmVsZW1lbnRTaXplKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclNoaWZ0UGVuZGluZ1B1bGxJbnRvKGNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IHJlbWFpbmRlclNpemUgPSBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgJSBwdWxsSW50b0Rlc2NyaXB0b3IuZWxlbWVudFNpemU7XG4gICAgaWYgKHJlbWFpbmRlclNpemUgPiAwKSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IHB1bGxJbnRvRGVzY3JpcHRvci5ieXRlT2Zmc2V0ICsgcHVsbEludG9EZXNjcmlwdG9yLmJ5dGVzRmlsbGVkO1xuICAgICAgICBjb25zdCByZW1haW5kZXIgPSBBcnJheUJ1ZmZlclNsaWNlKHB1bGxJbnRvRGVzY3JpcHRvci5idWZmZXIsIGVuZCAtIHJlbWFpbmRlclNpemUsIGVuZCk7XG4gICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlQ2h1bmtUb1F1ZXVlKGNvbnRyb2xsZXIsIHJlbWFpbmRlciwgMCwgcmVtYWluZGVyLmJ5dGVMZW5ndGgpO1xuICAgIH1cbiAgICBwdWxsSW50b0Rlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgLT0gcmVtYWluZGVyU2l6ZTtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ29tbWl0UHVsbEludG9EZXNjcmlwdG9yKGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0sIHB1bGxJbnRvRGVzY3JpcHRvcik7XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclByb2Nlc3NQdWxsSW50b0Rlc2NyaXB0b3JzVXNpbmdRdWV1ZShjb250cm9sbGVyKTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kSW50ZXJuYWwoY29udHJvbGxlciwgYnl0ZXNXcml0dGVuKSB7XG4gICAgY29uc3QgZmlyc3REZXNjcmlwdG9yID0gY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5wZWVrKCk7XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckludmFsaWRhdGVCWU9CUmVxdWVzdChjb250cm9sbGVyKTtcbiAgICBjb25zdCBzdGF0ZSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0uX3N0YXRlO1xuICAgIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRJbkNsb3NlZFN0YXRlKGNvbnRyb2xsZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRJblJlYWRhYmxlU3RhdGUoY29udHJvbGxlciwgYnl0ZXNXcml0dGVuLCBmaXJzdERlc2NyaXB0b3IpO1xuICAgIH1cbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJTaGlmdFBlbmRpbmdQdWxsSW50byhjb250cm9sbGVyKSB7XG4gICAgY29uc3QgZGVzY3JpcHRvciA9IGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3Muc2hpZnQoKTtcbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJTaG91bGRDYWxsUHVsbChjb250cm9sbGVyKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbTtcbiAgICBpZiAoc3RyZWFtLl9zdGF0ZSAhPT0gJ3JlYWRhYmxlJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghY29udHJvbGxlci5fc3RhcnRlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChSZWFkYWJsZVN0cmVhbUhhc0RlZmF1bHRSZWFkZXIoc3RyZWFtKSAmJiBSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRSZXF1ZXN0cyhzdHJlYW0pID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKFJlYWRhYmxlU3RyZWFtSGFzQllPQlJlYWRlcihzdHJlYW0pICYmIFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZEludG9SZXF1ZXN0cyhzdHJlYW0pID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgZGVzaXJlZFNpemUgPSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyR2V0RGVzaXJlZFNpemUoY29udHJvbGxlcik7XG4gICAgaWYgKGRlc2lyZWRTaXplID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKSB7XG4gICAgY29udHJvbGxlci5fcHVsbEFsZ29yaXRobSA9IHVuZGVmaW5lZDtcbiAgICBjb250cm9sbGVyLl9jYW5jZWxBbGdvcml0aG0gPSB1bmRlZmluZWQ7XG59XG4vLyBBIGNsaWVudCBvZiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyIG1heSB1c2UgdGhlc2UgZnVuY3Rpb25zIGRpcmVjdGx5IHRvIGJ5cGFzcyBzdGF0ZSBjaGVjay5cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbG9zZShjb250cm9sbGVyKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbTtcbiAgICBpZiAoY29udHJvbGxlci5fY2xvc2VSZXF1ZXN0ZWQgfHwgc3RyZWFtLl9zdGF0ZSAhPT0gJ3JlYWRhYmxlJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA+IDApIHtcbiAgICAgICAgY29udHJvbGxlci5fY2xvc2VSZXF1ZXN0ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgZmlyc3RQZW5kaW5nUHVsbEludG8gPSBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnBlZWsoKTtcbiAgICAgICAgaWYgKGZpcnN0UGVuZGluZ1B1bGxJbnRvLmJ5dGVzRmlsbGVkID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZSA9IG5ldyBUeXBlRXJyb3IoJ0luc3VmZmljaWVudCBieXRlcyB0byBmaWxsIGVsZW1lbnRzIGluIHRoZSBnaXZlbiBidWZmZXInKTtcbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBlKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKTtcbiAgICBSZWFkYWJsZVN0cmVhbUNsb3NlKHN0cmVhbSk7XG59XG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRW5xdWV1ZShjb250cm9sbGVyLCBjaHVuaykge1xuICAgIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW07XG4gICAgaWYgKGNvbnRyb2xsZXIuX2Nsb3NlUmVxdWVzdGVkIHx8IHN0cmVhbS5fc3RhdGUgIT09ICdyZWFkYWJsZScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBidWZmZXIgPSBjaHVuay5idWZmZXI7XG4gICAgY29uc3QgYnl0ZU9mZnNldCA9IGNodW5rLmJ5dGVPZmZzZXQ7XG4gICAgY29uc3QgYnl0ZUxlbmd0aCA9IGNodW5rLmJ5dGVMZW5ndGg7XG4gICAgY29uc3QgdHJhbnNmZXJyZWRCdWZmZXIgPSBUcmFuc2ZlckFycmF5QnVmZmVyKGJ1ZmZlcik7XG4gICAgaWYgKGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBmaXJzdFBlbmRpbmdQdWxsSW50byA9IGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucGVlaygpO1xuICAgICAgICBpZiAoSXNEZXRhY2hlZEJ1ZmZlcihmaXJzdFBlbmRpbmdQdWxsSW50by5idWZmZXIpKSA7XG4gICAgICAgIGZpcnN0UGVuZGluZ1B1bGxJbnRvLmJ1ZmZlciA9IFRyYW5zZmVyQXJyYXlCdWZmZXIoZmlyc3RQZW5kaW5nUHVsbEludG8uYnVmZmVyKTtcbiAgICB9XG4gICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckludmFsaWRhdGVCWU9CUmVxdWVzdChjb250cm9sbGVyKTtcbiAgICBpZiAoUmVhZGFibGVTdHJlYW1IYXNEZWZhdWx0UmVhZGVyKHN0cmVhbSkpIHtcbiAgICAgICAgaWYgKFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZFJlcXVlc3RzKHN0cmVhbSkgPT09IDApIHtcbiAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlQ2h1bmtUb1F1ZXVlKGNvbnRyb2xsZXIsIHRyYW5zZmVycmVkQnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyU2hpZnRQZW5kaW5nUHVsbEludG8oY29udHJvbGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0cmFuc2ZlcnJlZFZpZXcgPSBuZXcgVWludDhBcnJheSh0cmFuc2ZlcnJlZEJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XG4gICAgICAgICAgICBSZWFkYWJsZVN0cmVhbUZ1bGZpbGxSZWFkUmVxdWVzdChzdHJlYW0sIHRyYW5zZmVycmVkVmlldywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKFJlYWRhYmxlU3RyZWFtSGFzQllPQlJlYWRlcihzdHJlYW0pKSB7XG4gICAgICAgIC8vIFRPRE86IElkZWFsbHkgaW4gdGhpcyBicmFuY2ggZGV0YWNoaW5nIHNob3VsZCBoYXBwZW4gb25seSBpZiB0aGUgYnVmZmVyIGlzIG5vdCBjb25zdW1lZCBmdWxseS5cbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWVDaHVua1RvUXVldWUoY29udHJvbGxlciwgdHJhbnNmZXJyZWRCdWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUHJvY2Vzc1B1bGxJbnRvRGVzY3JpcHRvcnNVc2luZ1F1ZXVlKGNvbnRyb2xsZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWVDaHVua1RvUXVldWUoY29udHJvbGxlciwgdHJhbnNmZXJyZWRCdWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xuICAgIH1cbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBlKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbTtcbiAgICBpZiAoc3RyZWFtLl9zdGF0ZSAhPT0gJ3JlYWRhYmxlJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbGVhclBlbmRpbmdQdWxsSW50b3MoY29udHJvbGxlcik7XG4gICAgUmVzZXRRdWV1ZShjb250cm9sbGVyKTtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpO1xuICAgIFJlYWRhYmxlU3RyZWFtRXJyb3Ioc3RyZWFtLCBlKTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJHZXRCWU9CUmVxdWVzdChjb250cm9sbGVyKSB7XG4gICAgaWYgKGNvbnRyb2xsZXIuX2J5b2JSZXF1ZXN0ID09PSBudWxsICYmIGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBmaXJzdERlc2NyaXB0b3IgPSBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnBlZWsoKTtcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBVaW50OEFycmF5KGZpcnN0RGVzY3JpcHRvci5idWZmZXIsIGZpcnN0RGVzY3JpcHRvci5ieXRlT2Zmc2V0ICsgZmlyc3REZXNjcmlwdG9yLmJ5dGVzRmlsbGVkLCBmaXJzdERlc2NyaXB0b3IuYnl0ZUxlbmd0aCAtIGZpcnN0RGVzY3JpcHRvci5ieXRlc0ZpbGxlZCk7XG4gICAgICAgIGNvbnN0IGJ5b2JSZXF1ZXN0ID0gT2JqZWN0LmNyZWF0ZShSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LnByb3RvdHlwZSk7XG4gICAgICAgIFNldFVwUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdChieW9iUmVxdWVzdCwgY29udHJvbGxlciwgdmlldyk7XG4gICAgICAgIGNvbnRyb2xsZXIuX2J5b2JSZXF1ZXN0ID0gYnlvYlJlcXVlc3Q7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sbGVyLl9ieW9iUmVxdWVzdDtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJHZXREZXNpcmVkU2l6ZShjb250cm9sbGVyKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVCeXRlU3RyZWFtLl9zdGF0ZTtcbiAgICBpZiAoc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHN0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRyb2xsZXIuX3N0cmF0ZWd5SFdNIC0gY29udHJvbGxlci5fcXVldWVUb3RhbFNpemU7XG59XG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZChjb250cm9sbGVyLCBieXRlc1dyaXR0ZW4pIHtcbiAgICBjb25zdCBmaXJzdERlc2NyaXB0b3IgPSBjb250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLnBlZWsoKTtcbiAgICBjb25zdCBzdGF0ZSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0uX3N0YXRlO1xuICAgIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgaWYgKGJ5dGVzV3JpdHRlbiAhPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYnl0ZXNXcml0dGVuIG11c3QgYmUgMCB3aGVuIGNhbGxpbmcgcmVzcG9uZCgpIG9uIGEgY2xvc2VkIHN0cmVhbScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoYnl0ZXNXcml0dGVuID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdieXRlc1dyaXR0ZW4gbXVzdCBiZSBncmVhdGVyIHRoYW4gMCB3aGVuIGNhbGxpbmcgcmVzcG9uZCgpIG9uIGEgcmVhZGFibGUgc3RyZWFtJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpcnN0RGVzY3JpcHRvci5ieXRlc0ZpbGxlZCArIGJ5dGVzV3JpdHRlbiA+IGZpcnN0RGVzY3JpcHRvci5ieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignYnl0ZXNXcml0dGVuIG91dCBvZiByYW5nZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZpcnN0RGVzY3JpcHRvci5idWZmZXIgPSBUcmFuc2ZlckFycmF5QnVmZmVyKGZpcnN0RGVzY3JpcHRvci5idWZmZXIpO1xuICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kSW50ZXJuYWwoY29udHJvbGxlciwgYnl0ZXNXcml0dGVuKTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kV2l0aE5ld1ZpZXcoY29udHJvbGxlciwgdmlldykge1xuICAgIGNvbnN0IGZpcnN0RGVzY3JpcHRvciA9IGNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MucGVlaygpO1xuICAgIGNvbnN0IHN0YXRlID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlQnl0ZVN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKHN0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICBpZiAodmlldy5ieXRlTGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgdmlld1xcJ3MgbGVuZ3RoIG11c3QgYmUgMCB3aGVuIGNhbGxpbmcgcmVzcG9uZFdpdGhOZXdWaWV3KCkgb24gYSBjbG9zZWQgc3RyZWFtJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICh2aWV3LmJ5dGVMZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSB2aWV3XFwncyBsZW5ndGggbXVzdCBiZSBncmVhdGVyIHRoYW4gMCB3aGVuIGNhbGxpbmcgcmVzcG9uZFdpdGhOZXdWaWV3KCkgb24gYSByZWFkYWJsZSBzdHJlYW0nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZmlyc3REZXNjcmlwdG9yLmJ5dGVPZmZzZXQgKyBmaXJzdERlc2NyaXB0b3IuYnl0ZXNGaWxsZWQgIT09IHZpZXcuYnl0ZU9mZnNldCkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHJlZ2lvbiBzcGVjaWZpZWQgYnkgdmlldyBkb2VzIG5vdCBtYXRjaCBieW9iUmVxdWVzdCcpO1xuICAgIH1cbiAgICBpZiAoZmlyc3REZXNjcmlwdG9yLmJ1ZmZlckJ5dGVMZW5ndGggIT09IHZpZXcuYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSBidWZmZXIgb2YgdmlldyBoYXMgZGlmZmVyZW50IGNhcGFjaXR5IHRoYW4gYnlvYlJlcXVlc3QnKTtcbiAgICB9XG4gICAgaWYgKGZpcnN0RGVzY3JpcHRvci5ieXRlc0ZpbGxlZCArIHZpZXcuYnl0ZUxlbmd0aCA+IGZpcnN0RGVzY3JpcHRvci5ieXRlTGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgcmVnaW9uIHNwZWNpZmllZCBieSB2aWV3IGlzIGxhcmdlciB0aGFuIGJ5b2JSZXF1ZXN0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHZpZXdCeXRlTGVuZ3RoID0gdmlldy5ieXRlTGVuZ3RoO1xuICAgIGZpcnN0RGVzY3JpcHRvci5idWZmZXIgPSBUcmFuc2ZlckFycmF5QnVmZmVyKHZpZXcuYnVmZmVyKTtcbiAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZEludGVybmFsKGNvbnRyb2xsZXIsIHZpZXdCeXRlTGVuZ3RoKTtcbn1cbmZ1bmN0aW9uIFNldFVwUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcihzdHJlYW0sIGNvbnRyb2xsZXIsIHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWxBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmssIGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSkge1xuICAgIGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZUJ5dGVTdHJlYW0gPSBzdHJlYW07XG4gICAgY29udHJvbGxlci5fcHVsbEFnYWluID0gZmFsc2U7XG4gICAgY29udHJvbGxlci5fcHVsbGluZyA9IGZhbHNlO1xuICAgIGNvbnRyb2xsZXIuX2J5b2JSZXF1ZXN0ID0gbnVsbDtcbiAgICAvLyBOZWVkIHRvIHNldCB0aGUgc2xvdHMgc28gdGhhdCB0aGUgYXNzZXJ0IGRvZXNuJ3QgZmlyZS4gSW4gdGhlIHNwZWMgdGhlIHNsb3RzIGFscmVhZHkgZXhpc3QgaW1wbGljaXRseS5cbiAgICBjb250cm9sbGVyLl9xdWV1ZSA9IGNvbnRyb2xsZXIuX3F1ZXVlVG90YWxTaXplID0gdW5kZWZpbmVkO1xuICAgIFJlc2V0UXVldWUoY29udHJvbGxlcik7XG4gICAgY29udHJvbGxlci5fY2xvc2VSZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICBjb250cm9sbGVyLl9zdGFydGVkID0gZmFsc2U7XG4gICAgY29udHJvbGxlci5fc3RyYXRlZ3lIV00gPSBoaWdoV2F0ZXJNYXJrO1xuICAgIGNvbnRyb2xsZXIuX3B1bGxBbGdvcml0aG0gPSBwdWxsQWxnb3JpdGhtO1xuICAgIGNvbnRyb2xsZXIuX2NhbmNlbEFsZ29yaXRobSA9IGNhbmNlbEFsZ29yaXRobTtcbiAgICBjb250cm9sbGVyLl9hdXRvQWxsb2NhdGVDaHVua1NpemUgPSBhdXRvQWxsb2NhdGVDaHVua1NpemU7XG4gICAgY29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcyA9IG5ldyBTaW1wbGVRdWV1ZSgpO1xuICAgIHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICBjb25zdCBzdGFydFJlc3VsdCA9IHN0YXJ0QWxnb3JpdGhtKCk7XG4gICAgdXBvblByb21pc2UocHJvbWlzZVJlc29sdmVkV2l0aChzdGFydFJlc3VsdCksICgpID0+IHtcbiAgICAgICAgY29udHJvbGxlci5fc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDYWxsUHVsbElmTmVlZGVkKGNvbnRyb2xsZXIpO1xuICAgIH0sIHIgPT4ge1xuICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoY29udHJvbGxlciwgcik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBTZXRVcFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJGcm9tVW5kZXJseWluZ1NvdXJjZShzdHJlYW0sIHVuZGVybHlpbmdCeXRlU291cmNlLCBoaWdoV2F0ZXJNYXJrKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IE9iamVjdC5jcmVhdGUoUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlci5wcm90b3R5cGUpO1xuICAgIGxldCBzdGFydEFsZ29yaXRobSA9ICgpID0+IHVuZGVmaW5lZDtcbiAgICBsZXQgcHVsbEFsZ29yaXRobSA9ICgpID0+IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICBsZXQgY2FuY2VsQWxnb3JpdGhtID0gKCkgPT4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIGlmICh1bmRlcmx5aW5nQnl0ZVNvdXJjZS5zdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0YXJ0QWxnb3JpdGhtID0gKCkgPT4gdW5kZXJseWluZ0J5dGVTb3VyY2Uuc3RhcnQoY29udHJvbGxlcik7XG4gICAgfVxuICAgIGlmICh1bmRlcmx5aW5nQnl0ZVNvdXJjZS5wdWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHVsbEFsZ29yaXRobSA9ICgpID0+IHVuZGVybHlpbmdCeXRlU291cmNlLnB1bGwoY29udHJvbGxlcik7XG4gICAgfVxuICAgIGlmICh1bmRlcmx5aW5nQnl0ZVNvdXJjZS5jYW5jZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjYW5jZWxBbGdvcml0aG0gPSByZWFzb24gPT4gdW5kZXJseWluZ0J5dGVTb3VyY2UuY2FuY2VsKHJlYXNvbik7XG4gICAgfVxuICAgIGNvbnN0IGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSA9IHVuZGVybHlpbmdCeXRlU291cmNlLmF1dG9BbGxvY2F0ZUNodW5rU2l6ZTtcbiAgICBpZiAoYXV0b0FsbG9jYXRlQ2h1bmtTaXplID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2F1dG9BbGxvY2F0ZUNodW5rU2l6ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwJyk7XG4gICAgfVxuICAgIFNldFVwUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcihzdHJlYW0sIGNvbnRyb2xsZXIsIHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWxBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmssIGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSk7XG59XG5mdW5jdGlvbiBTZXRVcFJlYWRhYmxlU3RyZWFtQllPQlJlcXVlc3QocmVxdWVzdCwgY29udHJvbGxlciwgdmlldykge1xuICAgIHJlcXVlc3QuX2Fzc29jaWF0ZWRSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICByZXF1ZXN0Ll92aWV3ID0gdmlldztcbn1cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbUJZT0JSZXF1ZXN0LlxuZnVuY3Rpb24gYnlvYlJlcXVlc3RCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdC5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdGApO1xufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXIuXG5mdW5jdGlvbiBieXRlU3RyZWFtQ29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKGBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyLnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyYCk7XG59XG5cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbS5cbmZ1bmN0aW9uIEFjcXVpcmVSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIoc3RyZWFtKSB7XG4gICAgcmV0dXJuIG5ldyBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIoc3RyZWFtKTtcbn1cbi8vIFJlYWRhYmxlU3RyZWFtIEFQSSBleHBvc2VkIGZvciBjb250cm9sbGVycy5cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtQWRkUmVhZEludG9SZXF1ZXN0KHN0cmVhbSwgcmVhZEludG9SZXF1ZXN0KSB7XG4gICAgc3RyZWFtLl9yZWFkZXIuX3JlYWRJbnRvUmVxdWVzdHMucHVzaChyZWFkSW50b1JlcXVlc3QpO1xufVxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1GdWxmaWxsUmVhZEludG9SZXF1ZXN0KHN0cmVhbSwgY2h1bmssIGRvbmUpIHtcbiAgICBjb25zdCByZWFkZXIgPSBzdHJlYW0uX3JlYWRlcjtcbiAgICBjb25zdCByZWFkSW50b1JlcXVlc3QgPSByZWFkZXIuX3JlYWRJbnRvUmVxdWVzdHMuc2hpZnQoKTtcbiAgICBpZiAoZG9uZSkge1xuICAgICAgICByZWFkSW50b1JlcXVlc3QuX2Nsb3NlU3RlcHMoY2h1bmspO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVhZEludG9SZXF1ZXN0Ll9jaHVua1N0ZXBzKGNodW5rKTtcbiAgICB9XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUdldE51bVJlYWRJbnRvUmVxdWVzdHMoc3RyZWFtKSB7XG4gICAgcmV0dXJuIHN0cmVhbS5fcmVhZGVyLl9yZWFkSW50b1JlcXVlc3RzLmxlbmd0aDtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtSGFzQllPQlJlYWRlcihzdHJlYW0pIHtcbiAgICBjb25zdCByZWFkZXIgPSBzdHJlYW0uX3JlYWRlcjtcbiAgICBpZiAocmVhZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHJlYWRlcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogQSBCWU9CIHJlYWRlciB2ZW5kZWQgYnkgYSB7QGxpbmsgUmVhZGFibGVTdHJlYW19LlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihzdHJlYW0pIHtcbiAgICAgICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudChzdHJlYW0sIDEsICdSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXInKTtcbiAgICAgICAgYXNzZXJ0UmVhZGFibGVTdHJlYW0oc3RyZWFtLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoaXMgc3RyZWFtIGhhcyBhbHJlYWR5IGJlZW4gbG9ja2VkIGZvciBleGNsdXNpdmUgcmVhZGluZyBieSBhbm90aGVyIHJlYWRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghSXNSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyKHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnN0cnVjdCBhIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlciBmb3IgYSBzdHJlYW0gbm90IGNvbnN0cnVjdGVkIHdpdGggYSBieXRlICcgK1xuICAgICAgICAgICAgICAgICdzb3VyY2UnKTtcbiAgICAgICAgfVxuICAgICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNJbml0aWFsaXplKHRoaXMsIHN0cmVhbSk7XG4gICAgICAgIHRoaXMuX3JlYWRJbnRvUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIGJlIGZ1bGZpbGxlZCB3aGVuIHRoZSBzdHJlYW0gYmVjb21lcyBjbG9zZWQsIG9yIHJlamVjdGVkIGlmIHRoZSBzdHJlYW0gZXZlciBlcnJvcnMgb3JcbiAgICAgKiB0aGUgcmVhZGVyJ3MgbG9jayBpcyByZWxlYXNlZCBiZWZvcmUgdGhlIHN0cmVhbSBmaW5pc2hlcyBjbG9zaW5nLlxuICAgICAqL1xuICAgIGdldCBjbG9zZWQoKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIodGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGJ5b2JSZWFkZXJCcmFuZENoZWNrRXhjZXB0aW9uKCdjbG9zZWQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb3NlZFByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElmIHRoZSByZWFkZXIgaXMgYWN0aXZlLCBiZWhhdmVzIHRoZSBzYW1lIGFzIHtAbGluayBSZWFkYWJsZVN0cmVhbS5jYW5jZWwgfCBzdHJlYW0uY2FuY2VsKHJlYXNvbil9LlxuICAgICAqL1xuICAgIGNhbmNlbChyZWFzb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcih0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoYnlvYlJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2NhbmNlbCcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb3duZXJSZWFkYWJsZVN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChyZWFkZXJMb2NrRXhjZXB0aW9uKCdjYW5jZWwnKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlYWRhYmxlU3RyZWFtUmVhZGVyR2VuZXJpY0NhbmNlbCh0aGlzLCByZWFzb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byByZWFkcyBieXRlcyBpbnRvIHZpZXcsIGFuZCByZXR1cm5zIGEgcHJvbWlzZSByZXNvbHZlZCB3aXRoIHRoZSByZXN1bHQuXG4gICAgICpcbiAgICAgKiBJZiByZWFkaW5nIGEgY2h1bmsgY2F1c2VzIHRoZSBxdWV1ZSB0byBiZWNvbWUgZW1wdHksIG1vcmUgZGF0YSB3aWxsIGJlIHB1bGxlZCBmcm9tIHRoZSB1bmRlcmx5aW5nIHNvdXJjZS5cbiAgICAgKi9cbiAgICByZWFkKHZpZXcpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtQllPQlJlYWRlcih0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoYnlvYlJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ3JlYWQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheUJ1ZmZlci5pc1ZpZXcodmlldykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ3ZpZXcgbXVzdCBiZSBhbiBhcnJheSBidWZmZXIgdmlldycpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlldy5ieXRlTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKCd2aWV3IG11c3QgaGF2ZSBub24temVybyBieXRlTGVuZ3RoJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aWV3LmJ1ZmZlci5ieXRlTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKGB2aWV3J3MgYnVmZmVyIG11c3QgaGF2ZSBub24temVybyBieXRlTGVuZ3RoYCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJc0RldGFjaGVkQnVmZmVyKHZpZXcuYnVmZmVyKSkgO1xuICAgICAgICBpZiAodGhpcy5fb3duZXJSZWFkYWJsZVN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChyZWFkZXJMb2NrRXhjZXB0aW9uKCdyZWFkIGZyb20nKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc29sdmVQcm9taXNlO1xuICAgICAgICBsZXQgcmVqZWN0UHJvbWlzZTtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ld1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgICAgICAgICAgcmVqZWN0UHJvbWlzZSA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlYWRJbnRvUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIF9jaHVua1N0ZXBzOiBjaHVuayA9PiByZXNvbHZlUHJvbWlzZSh7IHZhbHVlOiBjaHVuaywgZG9uZTogZmFsc2UgfSksXG4gICAgICAgICAgICBfY2xvc2VTdGVwczogY2h1bmsgPT4gcmVzb2x2ZVByb21pc2UoeyB2YWx1ZTogY2h1bmssIGRvbmU6IHRydWUgfSksXG4gICAgICAgICAgICBfZXJyb3JTdGVwczogZSA9PiByZWplY3RQcm9taXNlKGUpXG4gICAgICAgIH07XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlclJlYWQodGhpcywgdmlldywgcmVhZEludG9SZXF1ZXN0KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbGVhc2VzIHRoZSByZWFkZXIncyBsb2NrIG9uIHRoZSBjb3JyZXNwb25kaW5nIHN0cmVhbS4gQWZ0ZXIgdGhlIGxvY2sgaXMgcmVsZWFzZWQsIHRoZSByZWFkZXIgaXMgbm8gbG9uZ2VyIGFjdGl2ZS5cbiAgICAgKiBJZiB0aGUgYXNzb2NpYXRlZCBzdHJlYW0gaXMgZXJyb3JlZCB3aGVuIHRoZSBsb2NrIGlzIHJlbGVhc2VkLCB0aGUgcmVhZGVyIHdpbGwgYXBwZWFyIGVycm9yZWQgaW4gdGhlIHNhbWUgd2F5XG4gICAgICogZnJvbSBub3cgb247IG90aGVyd2lzZSwgdGhlIHJlYWRlciB3aWxsIGFwcGVhciBjbG9zZWQuXG4gICAgICpcbiAgICAgKiBBIHJlYWRlcidzIGxvY2sgY2Fubm90IGJlIHJlbGVhc2VkIHdoaWxlIGl0IHN0aWxsIGhhcyBhIHBlbmRpbmcgcmVhZCByZXF1ZXN0LCBpLmUuLCBpZiBhIHByb21pc2UgcmV0dXJuZWQgYnlcbiAgICAgKiB0aGUgcmVhZGVyJ3Mge0BsaW5rIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlci5yZWFkIHwgcmVhZCgpfSBtZXRob2QgaGFzIG5vdCB5ZXQgYmVlbiBzZXR0bGVkLiBBdHRlbXB0aW5nIHRvXG4gICAgICogZG8gc28gd2lsbCB0aHJvdyBhIGBUeXBlRXJyb3JgIGFuZCBsZWF2ZSB0aGUgcmVhZGVyIGxvY2tlZCB0byB0aGUgc3RyZWFtLlxuICAgICAqL1xuICAgIHJlbGVhc2VMb2NrKCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBieW9iUmVhZGVyQnJhbmRDaGVja0V4Y2VwdGlvbigncmVsZWFzZUxvY2snKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb3duZXJSZWFkYWJsZVN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3JlYWRJbnRvUmVxdWVzdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVHJpZWQgdG8gcmVsZWFzZSBhIHJlYWRlciBsb2NrIHdoZW4gdGhhdCByZWFkZXIgaGFzIHBlbmRpbmcgcmVhZCgpIGNhbGxzIHVuLXNldHRsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBSZWFkYWJsZVN0cmVhbVJlYWRlckdlbmVyaWNSZWxlYXNlKHRoaXMpO1xuICAgIH1cbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlci5wcm90b3R5cGUsIHtcbiAgICBjYW5jZWw6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIHJlYWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIHJlbGVhc2VMb2NrOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBjbG9zZWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlci5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnLCB7XG4gICAgICAgIHZhbHVlOiAnUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyJyxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG59XG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgcmVhZGVycy5cbmZ1bmN0aW9uIElzUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyKHgpIHtcbiAgICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfcmVhZEludG9SZXF1ZXN0cycpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXI7XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXJSZWFkKHJlYWRlciwgdmlldywgcmVhZEludG9SZXF1ZXN0KSB7XG4gICAgY29uc3Qgc3RyZWFtID0gcmVhZGVyLl9vd25lclJlYWRhYmxlU3RyZWFtO1xuICAgIHN0cmVhbS5fZGlzdHVyYmVkID0gdHJ1ZTtcbiAgICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgICAgIHJlYWRJbnRvUmVxdWVzdC5fZXJyb3JTdGVwcyhzdHJlYW0uX3N0b3JlZEVycm9yKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJQdWxsSW50byhzdHJlYW0uX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgdmlldywgcmVhZEludG9SZXF1ZXN0KTtcbiAgICB9XG59XG4vLyBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUgUmVhZGFibGVTdHJlYW1CWU9CUmVhZGVyLlxuZnVuY3Rpb24gYnlvYlJlYWRlckJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKGBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcmApO1xufVxuXG5mdW5jdGlvbiBFeHRyYWN0SGlnaFdhdGVyTWFyayhzdHJhdGVneSwgZGVmYXVsdEhXTSkge1xuICAgIGNvbnN0IHsgaGlnaFdhdGVyTWFyayB9ID0gc3RyYXRlZ3k7XG4gICAgaWYgKGhpZ2hXYXRlck1hcmsgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdEhXTTtcbiAgICB9XG4gICAgaWYgKE51bWJlcklzTmFOKGhpZ2hXYXRlck1hcmspIHx8IGhpZ2hXYXRlck1hcmsgPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIGhpZ2hXYXRlck1hcmsnKTtcbiAgICB9XG4gICAgcmV0dXJuIGhpZ2hXYXRlck1hcms7XG59XG5mdW5jdGlvbiBFeHRyYWN0U2l6ZUFsZ29yaXRobShzdHJhdGVneSkge1xuICAgIGNvbnN0IHsgc2l6ZSB9ID0gc3RyYXRlZ3k7XG4gICAgaWYgKCFzaXplKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiAxO1xuICAgIH1cbiAgICByZXR1cm4gc2l6ZTtcbn1cblxuZnVuY3Rpb24gY29udmVydFF1ZXVpbmdTdHJhdGVneShpbml0LCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0RGljdGlvbmFyeShpbml0LCBjb250ZXh0KTtcbiAgICBjb25zdCBoaWdoV2F0ZXJNYXJrID0gaW5pdCA9PT0gbnVsbCB8fCBpbml0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbml0LmhpZ2hXYXRlck1hcms7XG4gICAgY29uc3Qgc2l6ZSA9IGluaXQgPT09IG51bGwgfHwgaW5pdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5pdC5zaXplO1xuICAgIHJldHVybiB7XG4gICAgICAgIGhpZ2hXYXRlck1hcms6IGhpZ2hXYXRlck1hcmsgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGNvbnZlcnRVbnJlc3RyaWN0ZWREb3VibGUoaGlnaFdhdGVyTWFyayksXG4gICAgICAgIHNpemU6IHNpemUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3lTaXplKHNpemUsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3NpemUnIHRoYXRgKVxuICAgIH07XG59XG5mdW5jdGlvbiBjb252ZXJ0UXVldWluZ1N0cmF0ZWd5U2l6ZShmbiwgY29udGV4dCkge1xuICAgIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgICByZXR1cm4gY2h1bmsgPT4gY29udmVydFVucmVzdHJpY3RlZERvdWJsZShmbihjaHVuaykpO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VW5kZXJseWluZ1Npbmsob3JpZ2luYWwsIGNvbnRleHQpIHtcbiAgICBhc3NlcnREaWN0aW9uYXJ5KG9yaWdpbmFsLCBjb250ZXh0KTtcbiAgICBjb25zdCBhYm9ydCA9IG9yaWdpbmFsID09PSBudWxsIHx8IG9yaWdpbmFsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcmlnaW5hbC5hYm9ydDtcbiAgICBjb25zdCBjbG9zZSA9IG9yaWdpbmFsID09PSBudWxsIHx8IG9yaWdpbmFsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcmlnaW5hbC5jbG9zZTtcbiAgICBjb25zdCBzdGFydCA9IG9yaWdpbmFsID09PSBudWxsIHx8IG9yaWdpbmFsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcmlnaW5hbC5zdGFydDtcbiAgICBjb25zdCB0eXBlID0gb3JpZ2luYWwgPT09IG51bGwgfHwgb3JpZ2luYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsLnR5cGU7XG4gICAgY29uc3Qgd3JpdGUgPSBvcmlnaW5hbCA9PT0gbnVsbCB8fCBvcmlnaW5hbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3JpZ2luYWwud3JpdGU7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWJvcnQ6IGFib3J0ID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgIGNvbnZlcnRVbmRlcmx5aW5nU2lua0Fib3J0Q2FsbGJhY2soYWJvcnQsIG9yaWdpbmFsLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdhYm9ydCcgdGhhdGApLFxuICAgICAgICBjbG9zZTogY2xvc2UgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICAgICAgY29udmVydFVuZGVybHlpbmdTaW5rQ2xvc2VDYWxsYmFjayhjbG9zZSwgb3JpZ2luYWwsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ2Nsb3NlJyB0aGF0YCksXG4gICAgICAgIHN0YXJ0OiBzdGFydCA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgIHVuZGVmaW5lZCA6XG4gICAgICAgICAgICBjb252ZXJ0VW5kZXJseWluZ1NpbmtTdGFydENhbGxiYWNrKHN0YXJ0LCBvcmlnaW5hbCwgYCR7Y29udGV4dH0gaGFzIG1lbWJlciAnc3RhcnQnIHRoYXRgKSxcbiAgICAgICAgd3JpdGU6IHdyaXRlID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgIGNvbnZlcnRVbmRlcmx5aW5nU2lua1dyaXRlQ2FsbGJhY2sod3JpdGUsIG9yaWdpbmFsLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICd3cml0ZScgdGhhdGApLFxuICAgICAgICB0eXBlXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU2lua0Fib3J0Q2FsbGJhY2soZm4sIG9yaWdpbmFsLCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICAgIHJldHVybiAocmVhc29uKSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtyZWFzb25dKTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU2lua0Nsb3NlQ2FsbGJhY2soZm4sIG9yaWdpbmFsLCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICAgIHJldHVybiAoKSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtdKTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRVbmRlcmx5aW5nU2lua1N0YXJ0Q2FsbGJhY2soZm4sIG9yaWdpbmFsLCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICAgIHJldHVybiAoY29udHJvbGxlcikgPT4gcmVmbGVjdENhbGwoZm4sIG9yaWdpbmFsLCBbY29udHJvbGxlcl0pO1xufVxuZnVuY3Rpb24gY29udmVydFVuZGVybHlpbmdTaW5rV3JpdGVDYWxsYmFjayhmbiwgb3JpZ2luYWwsIGNvbnRleHQpIHtcbiAgICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gICAgcmV0dXJuIChjaHVuaywgY29udHJvbGxlcikgPT4gcHJvbWlzZUNhbGwoZm4sIG9yaWdpbmFsLCBbY2h1bmssIGNvbnRyb2xsZXJdKTtcbn1cblxuZnVuY3Rpb24gYXNzZXJ0V3JpdGFibGVTdHJlYW0oeCwgY29udGV4dCkge1xuICAgIGlmICghSXNXcml0YWJsZVN0cmVhbSh4KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9IGlzIG5vdCBhIFdyaXRhYmxlU3RyZWFtLmApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNBYm9ydFNpZ25hbCh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZS5hYm9ydGVkID09PSAnYm9vbGVhbic7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICAvLyBBYm9ydFNpZ25hbC5wcm90b3R5cGUuYWJvcnRlZCB0aHJvd3MgaWYgaXRzIGJyYW5kIGNoZWNrIGZhaWxzXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5jb25zdCBzdXBwb3J0c0Fib3J0Q29udHJvbGxlciA9IHR5cGVvZiBBYm9ydENvbnRyb2xsZXIgPT09ICdmdW5jdGlvbic7XG4vKipcbiAqIENvbnN0cnVjdCBhIG5ldyBBYm9ydENvbnRyb2xsZXIsIGlmIHN1cHBvcnRlZCBieSB0aGUgcGxhdGZvcm0uXG4gKlxuICogQGludGVybmFsXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFib3J0Q29udHJvbGxlcigpIHtcbiAgICBpZiAoc3VwcG9ydHNBYm9ydENvbnRyb2xsZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBBIHdyaXRhYmxlIHN0cmVhbSByZXByZXNlbnRzIGEgZGVzdGluYXRpb24gZm9yIGRhdGEsIGludG8gd2hpY2ggeW91IGNhbiB3cml0ZS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFdyaXRhYmxlU3RyZWFtIHtcbiAgICBjb25zdHJ1Y3RvcihyYXdVbmRlcmx5aW5nU2luayA9IHt9LCByYXdTdHJhdGVneSA9IHt9KSB7XG4gICAgICAgIGlmIChyYXdVbmRlcmx5aW5nU2luayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByYXdVbmRlcmx5aW5nU2luayA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhc3NlcnRPYmplY3QocmF3VW5kZXJseWluZ1NpbmssICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdHJhdGVneSA9IGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3kocmF3U3RyYXRlZ3ksICdTZWNvbmQgcGFyYW1ldGVyJyk7XG4gICAgICAgIGNvbnN0IHVuZGVybHlpbmdTaW5rID0gY29udmVydFVuZGVybHlpbmdTaW5rKHJhd1VuZGVybHlpbmdTaW5rLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgICAgIEluaXRpYWxpemVXcml0YWJsZVN0cmVhbSh0aGlzKTtcbiAgICAgICAgY29uc3QgdHlwZSA9IHVuZGVybHlpbmdTaW5rLnR5cGU7XG4gICAgICAgIGlmICh0eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGUgaXMgc3BlY2lmaWVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2l6ZUFsZ29yaXRobSA9IEV4dHJhY3RTaXplQWxnb3JpdGhtKHN0cmF0ZWd5KTtcbiAgICAgICAgY29uc3QgaGlnaFdhdGVyTWFyayA9IEV4dHJhY3RIaWdoV2F0ZXJNYXJrKHN0cmF0ZWd5LCAxKTtcbiAgICAgICAgU2V0VXBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRnJvbVVuZGVybHlpbmdTaW5rKHRoaXMsIHVuZGVybHlpbmdTaW5rLCBoaWdoV2F0ZXJNYXJrLCBzaXplQWxnb3JpdGhtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgd3JpdGFibGUgc3RyZWFtIGlzIGxvY2tlZCB0byBhIHdyaXRlci5cbiAgICAgKi9cbiAgICBnZXQgbG9ja2VkKCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24kMignbG9ja2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIElzV3JpdGFibGVTdHJlYW1Mb2NrZWQodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFib3J0cyB0aGUgc3RyZWFtLCBzaWduYWxpbmcgdGhhdCB0aGUgcHJvZHVjZXIgY2FuIG5vIGxvbmdlciBzdWNjZXNzZnVsbHkgd3JpdGUgdG8gdGhlIHN0cmVhbSBhbmQgaXQgaXMgdG8gYmVcbiAgICAgKiBpbW1lZGlhdGVseSBtb3ZlZCB0byBhbiBlcnJvcmVkIHN0YXRlLCB3aXRoIGFueSBxdWV1ZWQtdXAgd3JpdGVzIGRpc2NhcmRlZC4gVGhpcyB3aWxsIGFsc28gZXhlY3V0ZSBhbnkgYWJvcnRcbiAgICAgKiBtZWNoYW5pc20gb2YgdGhlIHVuZGVybHlpbmcgc2luay5cbiAgICAgKlxuICAgICAqIFRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgZnVsZmlsbCBpZiB0aGUgc3RyZWFtIHNodXRzIGRvd24gc3VjY2Vzc2Z1bGx5LCBvciByZWplY3QgaWYgdGhlIHVuZGVybHlpbmcgc2luayBzaWduYWxlZFxuICAgICAqIHRoYXQgdGhlcmUgd2FzIGFuIGVycm9yIGRvaW5nIHNvLiBBZGRpdGlvbmFsbHksIGl0IHdpbGwgcmVqZWN0IHdpdGggYSBgVHlwZUVycm9yYCAod2l0aG91dCBhdHRlbXB0aW5nIHRvIGNhbmNlbFxuICAgICAqIHRoZSBzdHJlYW0pIGlmIHRoZSBzdHJlYW0gaXMgY3VycmVudGx5IGxvY2tlZC5cbiAgICAgKi9cbiAgICBhYm9ydChyZWFzb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uJDIoJ2Fib3J0JykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJc1dyaXRhYmxlU3RyZWFtTG9ja2VkKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKCdDYW5ub3QgYWJvcnQgYSBzdHJlYW0gdGhhdCBhbHJlYWR5IGhhcyBhIHdyaXRlcicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1BYm9ydCh0aGlzLCByZWFzb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgdGhlIHN0cmVhbS4gVGhlIHVuZGVybHlpbmcgc2luayB3aWxsIGZpbmlzaCBwcm9jZXNzaW5nIGFueSBwcmV2aW91c2x5LXdyaXR0ZW4gY2h1bmtzLCBiZWZvcmUgaW52b2tpbmcgaXRzXG4gICAgICogY2xvc2UgYmVoYXZpb3IuIER1cmluZyB0aGlzIHRpbWUgYW55IGZ1cnRoZXIgYXR0ZW1wdHMgdG8gd3JpdGUgd2lsbCBmYWlsICh3aXRob3V0IGVycm9yaW5nIHRoZSBzdHJlYW0pLlxuICAgICAqXG4gICAgICogVGhlIG1ldGhvZCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgZnVsZmlsbCBpZiBhbGwgcmVtYWluaW5nIGNodW5rcyBhcmUgc3VjY2Vzc2Z1bGx5IHdyaXR0ZW4gYW5kIHRoZSBzdHJlYW1cbiAgICAgKiBzdWNjZXNzZnVsbHkgY2xvc2VzLCBvciByZWplY3RzIGlmIGFuIGVycm9yIGlzIGVuY291bnRlcmVkIGR1cmluZyB0aGlzIHByb2Nlc3MuIEFkZGl0aW9uYWxseSwgaXQgd2lsbCByZWplY3Qgd2l0aFxuICAgICAqIGEgYFR5cGVFcnJvcmAgKHdpdGhvdXQgYXR0ZW1wdGluZyB0byBjYW5jZWwgdGhlIHN0cmVhbSkgaWYgdGhlIHN0cmVhbSBpcyBjdXJyZW50bHkgbG9ja2VkLlxuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24kMignY2xvc2UnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKElzV3JpdGFibGVTdHJlYW1Mb2NrZWQodGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjbG9zZSBhIHN0cmVhbSB0aGF0IGFscmVhZHkgaGFzIGEgd3JpdGVyJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodCh0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcignQ2Fubm90IGNsb3NlIGFuIGFscmVhZHktY2xvc2luZyBzdHJlYW0nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtQ2xvc2UodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB7QGxpbmsgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyIHwgd3JpdGVyfSBhbmQgbG9ja3MgdGhlIHN0cmVhbSB0byB0aGUgbmV3IHdyaXRlci4gV2hpbGUgdGhlIHN0cmVhbVxuICAgICAqIGlzIGxvY2tlZCwgbm8gb3RoZXIgd3JpdGVyIGNhbiBiZSBhY3F1aXJlZCB1bnRpbCB0aGlzIG9uZSBpcyByZWxlYXNlZC5cbiAgICAgKlxuICAgICAqIFRoaXMgZnVuY3Rpb25hbGl0eSBpcyBlc3BlY2lhbGx5IHVzZWZ1bCBmb3IgY3JlYXRpbmcgYWJzdHJhY3Rpb25zIHRoYXQgZGVzaXJlIHRoZSBhYmlsaXR5IHRvIHdyaXRlIHRvIGEgc3RyZWFtXG4gICAgICogd2l0aG91dCBpbnRlcnJ1cHRpb24gb3IgaW50ZXJsZWF2aW5nLiBCeSBnZXR0aW5nIGEgd3JpdGVyIGZvciB0aGUgc3RyZWFtLCB5b3UgY2FuIGVuc3VyZSBub2JvZHkgZWxzZSBjYW4gd3JpdGUgYXRcbiAgICAgKiB0aGUgc2FtZSB0aW1lLCB3aGljaCB3b3VsZCBjYXVzZSB0aGUgcmVzdWx0aW5nIHdyaXR0ZW4gZGF0YSB0byBiZSB1bnByZWRpY3RhYmxlIGFuZCBwcm9iYWJseSB1c2VsZXNzLlxuICAgICAqL1xuICAgIGdldFdyaXRlcigpIHtcbiAgICAgICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uJDIoJ2dldFdyaXRlcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBY3F1aXJlV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpO1xuICAgIH1cbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFdyaXRhYmxlU3RyZWFtLnByb3RvdHlwZSwge1xuICAgIGFib3J0OiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBjbG9zZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgZ2V0V3JpdGVyOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBsb2NrZWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlU3RyZWFtLnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcsIHtcbiAgICAgICAgdmFsdWU6ICdXcml0YWJsZVN0cmVhbScsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xufVxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIFdyaXRhYmxlU3RyZWFtLlxuZnVuY3Rpb24gQWNxdWlyZVdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcihzdHJlYW0pIHtcbiAgICByZXR1cm4gbmV3IFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcihzdHJlYW0pO1xufVxuLy8gVGhyb3dzIGlmIGFuZCBvbmx5IGlmIHN0YXJ0QWxnb3JpdGhtIHRocm93cy5cbmZ1bmN0aW9uIENyZWF0ZVdyaXRhYmxlU3RyZWFtKHN0YXJ0QWxnb3JpdGhtLCB3cml0ZUFsZ29yaXRobSwgY2xvc2VBbGdvcml0aG0sIGFib3J0QWxnb3JpdGhtLCBoaWdoV2F0ZXJNYXJrID0gMSwgc2l6ZUFsZ29yaXRobSA9ICgpID0+IDEpIHtcbiAgICBjb25zdCBzdHJlYW0gPSBPYmplY3QuY3JlYXRlKFdyaXRhYmxlU3RyZWFtLnByb3RvdHlwZSk7XG4gICAgSW5pdGlhbGl6ZVdyaXRhYmxlU3RyZWFtKHN0cmVhbSk7XG4gICAgY29uc3QgY29udHJvbGxlciA9IE9iamVjdC5jcmVhdGUoV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUpO1xuICAgIFNldFVwV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcihzdHJlYW0sIGNvbnRyb2xsZXIsIHN0YXJ0QWxnb3JpdGhtLCB3cml0ZUFsZ29yaXRobSwgY2xvc2VBbGdvcml0aG0sIGFib3J0QWxnb3JpdGhtLCBoaWdoV2F0ZXJNYXJrLCBzaXplQWxnb3JpdGhtKTtcbiAgICByZXR1cm4gc3RyZWFtO1xufVxuZnVuY3Rpb24gSW5pdGlhbGl6ZVdyaXRhYmxlU3RyZWFtKHN0cmVhbSkge1xuICAgIHN0cmVhbS5fc3RhdGUgPSAnd3JpdGFibGUnO1xuICAgIC8vIFRoZSBlcnJvciB0aGF0IHdpbGwgYmUgcmVwb3J0ZWQgYnkgbmV3IG1ldGhvZCBjYWxscyBvbmNlIHRoZSBzdGF0ZSBiZWNvbWVzIGVycm9yZWQuIE9ubHkgc2V0IHdoZW4gW1tzdGF0ZV1dIGlzXG4gICAgLy8gJ2Vycm9yaW5nJyBvciAnZXJyb3JlZCcuIE1heSBiZSBzZXQgdG8gYW4gdW5kZWZpbmVkIHZhbHVlLlxuICAgIHN0cmVhbS5fc3RvcmVkRXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgc3RyZWFtLl93cml0ZXIgPSB1bmRlZmluZWQ7XG4gICAgLy8gSW5pdGlhbGl6ZSB0byB1bmRlZmluZWQgZmlyc3QgYmVjYXVzZSB0aGUgY29uc3RydWN0b3Igb2YgdGhlIGNvbnRyb2xsZXIgY2hlY2tzIHRoaXNcbiAgICAvLyB2YXJpYWJsZSB0byB2YWxpZGF0ZSB0aGUgY2FsbGVyLlxuICAgIHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyID0gdW5kZWZpbmVkO1xuICAgIC8vIFRoaXMgcXVldWUgaXMgcGxhY2VkIGhlcmUgaW5zdGVhZCBvZiB0aGUgd3JpdGVyIGNsYXNzIGluIG9yZGVyIHRvIGFsbG93IGZvciBwYXNzaW5nIGEgd3JpdGVyIHRvIHRoZSBuZXh0IGRhdGFcbiAgICAvLyBwcm9kdWNlciB3aXRob3V0IHdhaXRpbmcgZm9yIHRoZSBxdWV1ZWQgd3JpdGVzIHRvIGZpbmlzaC5cbiAgICBzdHJlYW0uX3dyaXRlUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcbiAgICAvLyBXcml0ZSByZXF1ZXN0cyBhcmUgcmVtb3ZlZCBmcm9tIF93cml0ZVJlcXVlc3RzIHdoZW4gd3JpdGUoKSBpcyBjYWxsZWQgb24gdGhlIHVuZGVybHlpbmcgc2luay4gVGhpcyBwcmV2ZW50c1xuICAgIC8vIHRoZW0gZnJvbSBiZWluZyBlcnJvbmVvdXNseSByZWplY3RlZCBvbiBlcnJvci4gSWYgYSB3cml0ZSgpIGNhbGwgaXMgaW4tZmxpZ2h0LCB0aGUgcmVxdWVzdCBpcyBzdG9yZWQgaGVyZS5cbiAgICBzdHJlYW0uX2luRmxpZ2h0V3JpdGVSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuICAgIC8vIFRoZSBwcm9taXNlIHRoYXQgd2FzIHJldHVybmVkIGZyb20gd3JpdGVyLmNsb3NlKCkuIFN0b3JlZCBoZXJlIGJlY2F1c2UgaXQgbWF5IGJlIGZ1bGZpbGxlZCBhZnRlciB0aGUgd3JpdGVyXG4gICAgLy8gaGFzIGJlZW4gZGV0YWNoZWQuXG4gICAgc3RyZWFtLl9jbG9zZVJlcXVlc3QgPSB1bmRlZmluZWQ7XG4gICAgLy8gQ2xvc2UgcmVxdWVzdCBpcyByZW1vdmVkIGZyb20gX2Nsb3NlUmVxdWVzdCB3aGVuIGNsb3NlKCkgaXMgY2FsbGVkIG9uIHRoZSB1bmRlcmx5aW5nIHNpbmsuIFRoaXMgcHJldmVudHMgaXRcbiAgICAvLyBmcm9tIGJlaW5nIGVycm9uZW91c2x5IHJlamVjdGVkIG9uIGVycm9yLiBJZiBhIGNsb3NlKCkgY2FsbCBpcyBpbi1mbGlnaHQsIHRoZSByZXF1ZXN0IGlzIHN0b3JlZCBoZXJlLlxuICAgIHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QgPSB1bmRlZmluZWQ7XG4gICAgLy8gVGhlIHByb21pc2UgdGhhdCB3YXMgcmV0dXJuZWQgZnJvbSB3cml0ZXIuYWJvcnQoKS4gVGhpcyBtYXkgYWxzbyBiZSBmdWxmaWxsZWQgYWZ0ZXIgdGhlIHdyaXRlciBoYXMgZGV0YWNoZWQuXG4gICAgc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuICAgIC8vIFRoZSBiYWNrcHJlc3N1cmUgc2lnbmFsIHNldCBieSB0aGUgY29udHJvbGxlci5cbiAgICBzdHJlYW0uX2JhY2twcmVzc3VyZSA9IGZhbHNlO1xufVxuZnVuY3Rpb24gSXNXcml0YWJsZVN0cmVhbSh4KSB7XG4gICAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlcicpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBXcml0YWJsZVN0cmVhbTtcbn1cbmZ1bmN0aW9uIElzV3JpdGFibGVTdHJlYW1Mb2NrZWQoc3RyZWFtKSB7XG4gICAgaWYgKHN0cmVhbS5fd3JpdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtQWJvcnQoc3RyZWFtLCByZWFzb24pIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdjbG9zZWQnIHx8IHN0cmVhbS5fc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIH1cbiAgICBzdHJlYW0uX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlci5fYWJvcnRSZWFzb24gPSByZWFzb247XG4gICAgKF9hID0gc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIuX2Fib3J0Q29udHJvbGxlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFib3J0KCk7XG4gICAgLy8gVHlwZVNjcmlwdCBuYXJyb3dzIHRoZSB0eXBlIG9mIGBzdHJlYW0uX3N0YXRlYCBkb3duIHRvICd3cml0YWJsZScgfCAnZXJyb3JpbmcnLFxuICAgIC8vIGJ1dCBpdCBkb2Vzbid0IGtub3cgdGhhdCBzaWduYWxpbmcgYWJvcnQgcnVucyBhdXRob3IgY29kZSB0aGF0IG1pZ2h0IGhhdmUgY2hhbmdlZCB0aGUgc3RhdGUuXG4gICAgLy8gV2lkZW4gdGhlIHR5cGUgYWdhaW4gYnkgY2FzdGluZyB0byBXcml0YWJsZVN0cmVhbVN0YXRlLlxuICAgIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgICBpZiAoc3RhdGUgPT09ICdjbG9zZWQnIHx8IHN0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICB9XG4gICAgaWYgKHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QuX3Byb21pc2U7XG4gICAgfVxuICAgIGxldCB3YXNBbHJlYWR5RXJyb3JpbmcgPSBmYWxzZTtcbiAgICBpZiAoc3RhdGUgPT09ICdlcnJvcmluZycpIHtcbiAgICAgICAgd2FzQWxyZWFkeUVycm9yaW5nID0gdHJ1ZTtcbiAgICAgICAgLy8gcmVhc29uIHdpbGwgbm90IGJlIHVzZWQsIHNvIGRvbid0IGtlZXAgYSByZWZlcmVuY2UgdG8gaXQuXG4gICAgICAgIHJlYXNvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ld1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QgPSB7XG4gICAgICAgICAgICBfcHJvbWlzZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgX3Jlc29sdmU6IHJlc29sdmUsXG4gICAgICAgICAgICBfcmVqZWN0OiByZWplY3QsXG4gICAgICAgICAgICBfcmVhc29uOiByZWFzb24sXG4gICAgICAgICAgICBfd2FzQWxyZWFkeUVycm9yaW5nOiB3YXNBbHJlYWR5RXJyb3JpbmdcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QuX3Byb21pc2UgPSBwcm9taXNlO1xuICAgIGlmICghd2FzQWxyZWFkeUVycm9yaW5nKSB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtU3RhcnRFcnJvcmluZyhzdHJlYW0sIHJlYXNvbik7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1DbG9zZShzdHJlYW0pIHtcbiAgICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKHN0YXRlID09PSAnY2xvc2VkJyB8fCBzdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoYFRoZSBzdHJlYW0gKGluICR7c3RhdGV9IHN0YXRlKSBpcyBub3QgaW4gdGhlIHdyaXRhYmxlIHN0YXRlIGFuZCBjYW5ub3QgYmUgY2xvc2VkYCkpO1xuICAgIH1cbiAgICBjb25zdCBwcm9taXNlID0gbmV3UHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGNsb3NlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIF9yZXNvbHZlOiByZXNvbHZlLFxuICAgICAgICAgICAgX3JlamVjdDogcmVqZWN0XG4gICAgICAgIH07XG4gICAgICAgIHN0cmVhbS5fY2xvc2VSZXF1ZXN0ID0gY2xvc2VSZXF1ZXN0O1xuICAgIH0pO1xuICAgIGNvbnN0IHdyaXRlciA9IHN0cmVhbS5fd3JpdGVyO1xuICAgIGlmICh3cml0ZXIgIT09IHVuZGVmaW5lZCAmJiBzdHJlYW0uX2JhY2twcmVzc3VyZSAmJiBzdGF0ZSA9PT0gJ3dyaXRhYmxlJykge1xuICAgICAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVzb2x2ZSh3cml0ZXIpO1xuICAgIH1cbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2Uoc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIpO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuLy8gV3JpdGFibGVTdHJlYW0gQVBJIGV4cG9zZWQgZm9yIGNvbnRyb2xsZXJzLlxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1BZGRXcml0ZVJlcXVlc3Qoc3RyZWFtKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ld1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB3cml0ZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICBfcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgICAgICAgIF9yZWplY3Q6IHJlamVjdFxuICAgICAgICB9O1xuICAgICAgICBzdHJlYW0uX3dyaXRlUmVxdWVzdHMucHVzaCh3cml0ZVJlcXVlc3QpO1xuICAgIH0pO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWFsV2l0aFJlamVjdGlvbihzdHJlYW0sIGVycm9yKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBzdHJlYW0uX3N0YXRlO1xuICAgIGlmIChzdGF0ZSA9PT0gJ3dyaXRhYmxlJykge1xuICAgICAgICBXcml0YWJsZVN0cmVhbVN0YXJ0RXJyb3Jpbmcoc3RyZWFtLCBlcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgV3JpdGFibGVTdHJlYW1GaW5pc2hFcnJvcmluZyhzdHJlYW0pO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1TdGFydEVycm9yaW5nKHN0cmVhbSwgcmVhc29uKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyO1xuICAgIHN0cmVhbS5fc3RhdGUgPSAnZXJyb3JpbmcnO1xuICAgIHN0cmVhbS5fc3RvcmVkRXJyb3IgPSByZWFzb247XG4gICAgY29uc3Qgd3JpdGVyID0gc3RyZWFtLl93cml0ZXI7XG4gICAgaWYgKHdyaXRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckVuc3VyZVJlYWR5UHJvbWlzZVJlamVjdGVkKHdyaXRlciwgcmVhc29uKTtcbiAgICB9XG4gICAgaWYgKCFXcml0YWJsZVN0cmVhbUhhc09wZXJhdGlvbk1hcmtlZEluRmxpZ2h0KHN0cmVhbSkgJiYgY29udHJvbGxlci5fc3RhcnRlZCkge1xuICAgICAgICBXcml0YWJsZVN0cmVhbUZpbmlzaEVycm9yaW5nKHN0cmVhbSk7XG4gICAgfVxufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1GaW5pc2hFcnJvcmluZyhzdHJlYW0pIHtcbiAgICBzdHJlYW0uX3N0YXRlID0gJ2Vycm9yZWQnO1xuICAgIHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyW0Vycm9yU3RlcHNdKCk7XG4gICAgY29uc3Qgc3RvcmVkRXJyb3IgPSBzdHJlYW0uX3N0b3JlZEVycm9yO1xuICAgIHN0cmVhbS5fd3JpdGVSZXF1ZXN0cy5mb3JFYWNoKHdyaXRlUmVxdWVzdCA9PiB7XG4gICAgICAgIHdyaXRlUmVxdWVzdC5fcmVqZWN0KHN0b3JlZEVycm9yKTtcbiAgICB9KTtcbiAgICBzdHJlYW0uX3dyaXRlUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcbiAgICBpZiAoc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgV3JpdGFibGVTdHJlYW1SZWplY3RDbG9zZUFuZENsb3NlZFByb21pc2VJZk5lZWRlZChzdHJlYW0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFib3J0UmVxdWVzdCA9IHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdDtcbiAgICBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGFib3J0UmVxdWVzdC5fd2FzQWxyZWFkeUVycm9yaW5nKSB7XG4gICAgICAgIGFib3J0UmVxdWVzdC5fcmVqZWN0KHN0b3JlZEVycm9yKTtcbiAgICAgICAgV3JpdGFibGVTdHJlYW1SZWplY3RDbG9zZUFuZENsb3NlZFByb21pc2VJZk5lZWRlZChzdHJlYW0pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHByb21pc2UgPSBzdHJlYW0uX3dyaXRhYmxlU3RyZWFtQ29udHJvbGxlcltBYm9ydFN0ZXBzXShhYm9ydFJlcXVlc3QuX3JlYXNvbik7XG4gICAgdXBvblByb21pc2UocHJvbWlzZSwgKCkgPT4ge1xuICAgICAgICBhYm9ydFJlcXVlc3QuX3Jlc29sdmUoKTtcbiAgICAgICAgV3JpdGFibGVTdHJlYW1SZWplY3RDbG9zZUFuZENsb3NlZFByb21pc2VJZk5lZWRlZChzdHJlYW0pO1xuICAgIH0sIChyZWFzb24pID0+IHtcbiAgICAgICAgYWJvcnRSZXF1ZXN0Ll9yZWplY3QocmVhc29uKTtcbiAgICAgICAgV3JpdGFibGVTdHJlYW1SZWplY3RDbG9zZUFuZENsb3NlZFByb21pc2VJZk5lZWRlZChzdHJlYW0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1GaW5pc2hJbkZsaWdodFdyaXRlKHN0cmVhbSkge1xuICAgIHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QuX3Jlc29sdmUodW5kZWZpbmVkKTtcbiAgICBzdHJlYW0uX2luRmxpZ2h0V3JpdGVSZXF1ZXN0ID0gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1GaW5pc2hJbkZsaWdodFdyaXRlV2l0aEVycm9yKHN0cmVhbSwgZXJyb3IpIHtcbiAgICBzdHJlYW0uX2luRmxpZ2h0V3JpdGVSZXF1ZXN0Ll9yZWplY3QoZXJyb3IpO1xuICAgIHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QgPSB1bmRlZmluZWQ7XG4gICAgV3JpdGFibGVTdHJlYW1EZWFsV2l0aFJlamVjdGlvbihzdHJlYW0sIGVycm9yKTtcbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRmluaXNoSW5GbGlnaHRDbG9zZShzdHJlYW0pIHtcbiAgICBzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0Ll9yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdCA9IHVuZGVmaW5lZDtcbiAgICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKHN0YXRlID09PSAnZXJyb3JpbmcnKSB7XG4gICAgICAgIC8vIFRoZSBlcnJvciB3YXMgdG9vIGxhdGUgdG8gZG8gYW55dGhpbmcsIHNvIGl0IGlzIGlnbm9yZWQuXG4gICAgICAgIHN0cmVhbS5fc3RvcmVkRXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0Ll9yZXNvbHZlKCk7XG4gICAgICAgICAgICBzdHJlYW0uX3BlbmRpbmdBYm9ydFJlcXVlc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RyZWFtLl9zdGF0ZSA9ICdjbG9zZWQnO1xuICAgIGNvbnN0IHdyaXRlciA9IHN0cmVhbS5fd3JpdGVyO1xuICAgIGlmICh3cml0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZVJlc29sdmUod3JpdGVyKTtcbiAgICB9XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUZpbmlzaEluRmxpZ2h0Q2xvc2VXaXRoRXJyb3Ioc3RyZWFtLCBlcnJvcikge1xuICAgIHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QuX3JlamVjdChlcnJvcik7XG4gICAgc3RyZWFtLl9pbkZsaWdodENsb3NlUmVxdWVzdCA9IHVuZGVmaW5lZDtcbiAgICAvLyBOZXZlciBleGVjdXRlIHNpbmsgYWJvcnQoKSBhZnRlciBzaW5rIGNsb3NlKCkuXG4gICAgaWYgKHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0cmVhbS5fcGVuZGluZ0Fib3J0UmVxdWVzdC5fcmVqZWN0KGVycm9yKTtcbiAgICAgICAgc3RyZWFtLl9wZW5kaW5nQWJvcnRSZXF1ZXN0ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBXcml0YWJsZVN0cmVhbURlYWxXaXRoUmVqZWN0aW9uKHN0cmVhbSwgZXJyb3IpO1xufVxuLy8gVE9ETyhyaWNlYSk6IEZpeCBhbHBoYWJldGljYWwgb3JkZXIuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChzdHJlYW0pIHtcbiAgICBpZiAoc3RyZWFtLl9jbG9zZVJlcXVlc3QgPT09IHVuZGVmaW5lZCAmJiBzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtSGFzT3BlcmF0aW9uTWFya2VkSW5GbGlnaHQoc3RyZWFtKSB7XG4gICAgaWYgKHN0cmVhbS5faW5GbGlnaHRXcml0ZVJlcXVlc3QgPT09IHVuZGVmaW5lZCAmJiBzdHJlYW0uX2luRmxpZ2h0Q2xvc2VSZXF1ZXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtTWFya0Nsb3NlUmVxdWVzdEluRmxpZ2h0KHN0cmVhbSkge1xuICAgIHN0cmVhbS5faW5GbGlnaHRDbG9zZVJlcXVlc3QgPSBzdHJlYW0uX2Nsb3NlUmVxdWVzdDtcbiAgICBzdHJlYW0uX2Nsb3NlUmVxdWVzdCA9IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtTWFya0ZpcnN0V3JpdGVSZXF1ZXN0SW5GbGlnaHQoc3RyZWFtKSB7XG4gICAgc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdCA9IHN0cmVhbS5fd3JpdGVSZXF1ZXN0cy5zaGlmdCgpO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1SZWplY3RDbG9zZUFuZENsb3NlZFByb21pc2VJZk5lZWRlZChzdHJlYW0pIHtcbiAgICBpZiAoc3RyZWFtLl9jbG9zZVJlcXVlc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdHJlYW0uX2Nsb3NlUmVxdWVzdC5fcmVqZWN0KHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICAgICAgICBzdHJlYW0uX2Nsb3NlUmVxdWVzdCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3Qgd3JpdGVyID0gc3RyZWFtLl93cml0ZXI7XG4gICAgaWYgKHdyaXRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVqZWN0KHdyaXRlciwgc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gICAgfVxufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1VcGRhdGVCYWNrcHJlc3N1cmUoc3RyZWFtLCBiYWNrcHJlc3N1cmUpIHtcbiAgICBjb25zdCB3cml0ZXIgPSBzdHJlYW0uX3dyaXRlcjtcbiAgICBpZiAod3JpdGVyICE9PSB1bmRlZmluZWQgJiYgYmFja3ByZXNzdXJlICE9PSBzdHJlYW0uX2JhY2twcmVzc3VyZSkge1xuICAgICAgICBpZiAoYmFja3ByZXNzdXJlKSB7XG4gICAgICAgICAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVzZXQod3JpdGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNvbHZlKHdyaXRlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RyZWFtLl9iYWNrcHJlc3N1cmUgPSBiYWNrcHJlc3N1cmU7XG59XG4vKipcbiAqIEEgZGVmYXVsdCB3cml0ZXIgdmVuZGVkIGJ5IGEge0BsaW5rIFdyaXRhYmxlU3RyZWFtfS5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlciB7XG4gICAgY29uc3RydWN0b3Ioc3RyZWFtKSB7XG4gICAgICAgIGFzc2VydFJlcXVpcmVkQXJndW1lbnQoc3RyZWFtLCAxLCAnV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyJyk7XG4gICAgICAgIGFzc2VydFdyaXRhYmxlU3RyZWFtKHN0cmVhbSwgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgICAgICBpZiAoSXNXcml0YWJsZVN0cmVhbUxvY2tlZChzdHJlYW0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlzIHN0cmVhbSBoYXMgYWxyZWFkeSBiZWVuIGxvY2tlZCBmb3IgZXhjbHVzaXZlIHdyaXRpbmcgYnkgYW5vdGhlciB3cml0ZXInKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vd25lcldyaXRhYmxlU3RyZWFtID0gc3RyZWFtO1xuICAgICAgICBzdHJlYW0uX3dyaXRlciA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgICAgICAgaWYgKHN0YXRlID09PSAnd3JpdGFibGUnKSB7XG4gICAgICAgICAgICBpZiAoIVdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KHN0cmVhbSkgJiYgc3RyZWFtLl9iYWNrcHJlc3N1cmUpIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplQXNSZXNvbHZlZCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGF0ZSA9PT0gJ2Vycm9yaW5nJykge1xuICAgICAgICAgICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHRoaXMsIHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICAgICAgICAgICAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICAgICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemVBc1Jlc29sdmVkKHRoaXMpO1xuICAgICAgICAgICAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplQXNSZXNvbHZlZCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlZEVycm9yID0gc3RyZWFtLl9zdG9yZWRFcnJvcjtcbiAgICAgICAgICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplQXNSZWplY3RlZCh0aGlzLCBzdG9yZWRFcnJvcik7XG4gICAgICAgICAgICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHRoaXMsIHN0b3JlZEVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmUgZnVsZmlsbGVkIHdoZW4gdGhlIHN0cmVhbSBiZWNvbWVzIGNsb3NlZCwgb3IgcmVqZWN0ZWQgaWYgdGhlIHN0cmVhbSBldmVyIGVycm9ycyBvclxuICAgICAqIHRoZSB3cml0ZXLigJlzIGxvY2sgaXMgcmVsZWFzZWQgYmVmb3JlIHRoZSBzdHJlYW0gZmluaXNoZXMgY2xvc2luZy5cbiAgICAgKi9cbiAgICBnZXQgY2xvc2VkKCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbignY2xvc2VkJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jbG9zZWRQcm9taXNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBkZXNpcmVkIHNpemUgdG8gZmlsbCB0aGUgc3RyZWFt4oCZcyBpbnRlcm5hbCBxdWV1ZS4gSXQgY2FuIGJlIG5lZ2F0aXZlLCBpZiB0aGUgcXVldWUgaXMgb3Zlci1mdWxsLlxuICAgICAqIEEgcHJvZHVjZXIgY2FuIHVzZSB0aGlzIGluZm9ybWF0aW9uIHRvIGRldGVybWluZSB0aGUgcmlnaHQgYW1vdW50IG9mIGRhdGEgdG8gd3JpdGUuXG4gICAgICpcbiAgICAgKiBJdCB3aWxsIGJlIGBudWxsYCBpZiB0aGUgc3RyZWFtIGNhbm5vdCBiZSBzdWNjZXNzZnVsbHkgd3JpdHRlbiB0byAoZHVlIHRvIGVpdGhlciBiZWluZyBlcnJvcmVkLCBvciBoYXZpbmcgYW4gYWJvcnRcbiAgICAgKiBxdWV1ZWQgdXApLiBJdCB3aWxsIHJldHVybiB6ZXJvIGlmIHRoZSBzdHJlYW0gaXMgY2xvc2VkLiBBbmQgdGhlIGdldHRlciB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBpbnZva2VkIHdoZW5cbiAgICAgKiB0aGUgd3JpdGVy4oCZcyBsb2NrIGlzIHJlbGVhc2VkLlxuICAgICAqL1xuICAgIGdldCBkZXNpcmVkU2l6ZSgpIHtcbiAgICAgICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcih0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgZGVmYXVsdFdyaXRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Rlc2lyZWRTaXplJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX293bmVyV3JpdGFibGVTdHJlYW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgZGVmYXVsdFdyaXRlckxvY2tFeGNlcHRpb24oJ2Rlc2lyZWRTaXplJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckdldERlc2lyZWRTaXplKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmUgZnVsZmlsbGVkIHdoZW4gdGhlIGRlc2lyZWQgc2l6ZSB0byBmaWxsIHRoZSBzdHJlYW3igJlzIGludGVybmFsIHF1ZXVlIHRyYW5zaXRpb25zXG4gICAgICogZnJvbSBub24tcG9zaXRpdmUgdG8gcG9zaXRpdmUsIHNpZ25hbGluZyB0aGF0IGl0IGlzIG5vIGxvbmdlciBhcHBseWluZyBiYWNrcHJlc3N1cmUuIE9uY2UgdGhlIGRlc2lyZWQgc2l6ZSBkaXBzXG4gICAgICogYmFjayB0byB6ZXJvIG9yIGJlbG93LCB0aGUgZ2V0dGVyIHdpbGwgcmV0dXJuIGEgbmV3IHByb21pc2UgdGhhdCBzdGF5cyBwZW5kaW5nIHVudGlsIHRoZSBuZXh0IHRyYW5zaXRpb24uXG4gICAgICpcbiAgICAgKiBJZiB0aGUgc3RyZWFtIGJlY29tZXMgZXJyb3JlZCBvciBhYm9ydGVkLCBvciB0aGUgd3JpdGVy4oCZcyBsb2NrIGlzIHJlbGVhc2VkLCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlY29tZVxuICAgICAqIHJlamVjdGVkLlxuICAgICAqL1xuICAgIGdldCByZWFkeSgpIHtcbiAgICAgICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcih0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFdyaXRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ3JlYWR5JykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkeVByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElmIHRoZSByZWFkZXIgaXMgYWN0aXZlLCBiZWhhdmVzIHRoZSBzYW1lIGFzIHtAbGluayBXcml0YWJsZVN0cmVhbS5hYm9ydCB8IHN0cmVhbS5hYm9ydChyZWFzb24pfS5cbiAgICAgKi9cbiAgICBhYm9ydChyZWFzb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcih0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFdyaXRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2Fib3J0JykpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9vd25lcldyaXRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRXcml0ZXJMb2NrRXhjZXB0aW9uKCdhYm9ydCcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyQWJvcnQodGhpcywgcmVhc29uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgdGhlIHJlYWRlciBpcyBhY3RpdmUsIGJlaGF2ZXMgdGhlIHNhbWUgYXMge0BsaW5rIFdyaXRhYmxlU3RyZWFtLmNsb3NlIHwgc3RyZWFtLmNsb3NlKCl9LlxuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbignY2xvc2UnKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RyZWFtID0gdGhpcy5fb3duZXJXcml0YWJsZVN0cmVhbTtcbiAgICAgICAgaWYgKHN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyTG9ja0V4Y2VwdGlvbignY2xvc2UnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KHN0cmVhbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjbG9zZSBhbiBhbHJlYWR5LWNsb3Npbmcgc3RyZWFtJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJDbG9zZSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVsZWFzZXMgdGhlIHdyaXRlcuKAmXMgbG9jayBvbiB0aGUgY29ycmVzcG9uZGluZyBzdHJlYW0uIEFmdGVyIHRoZSBsb2NrIGlzIHJlbGVhc2VkLCB0aGUgd3JpdGVyIGlzIG5vIGxvbmdlciBhY3RpdmUuXG4gICAgICogSWYgdGhlIGFzc29jaWF0ZWQgc3RyZWFtIGlzIGVycm9yZWQgd2hlbiB0aGUgbG9jayBpcyByZWxlYXNlZCwgdGhlIHdyaXRlciB3aWxsIGFwcGVhciBlcnJvcmVkIGluIHRoZSBzYW1lIHdheSBmcm9tXG4gICAgICogbm93IG9uOyBvdGhlcndpc2UsIHRoZSB3cml0ZXIgd2lsbCBhcHBlYXIgY2xvc2VkLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHRoZSBsb2NrIGNhbiBzdGlsbCBiZSByZWxlYXNlZCBldmVuIGlmIHNvbWUgb25nb2luZyB3cml0ZXMgaGF2ZSBub3QgeWV0IGZpbmlzaGVkIChpLmUuIGV2ZW4gaWYgdGhlXG4gICAgICogcHJvbWlzZXMgcmV0dXJuZWQgZnJvbSBwcmV2aW91cyBjYWxscyB0byB7QGxpbmsgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLndyaXRlIHwgd3JpdGUoKX0gaGF2ZSBub3QgeWV0IHNldHRsZWQpLlxuICAgICAqIEl04oCZcyBub3QgbmVjZXNzYXJ5IHRvIGhvbGQgdGhlIGxvY2sgb24gdGhlIHdyaXRlciBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoZSB3cml0ZTsgdGhlIGxvY2sgaW5zdGVhZCBzaW1wbHkgcHJldmVudHNcbiAgICAgKiBvdGhlciBwcm9kdWNlcnMgZnJvbSB3cml0aW5nIGluIGFuIGludGVybGVhdmVkIG1hbm5lci5cbiAgICAgKi9cbiAgICByZWxlYXNlTG9jaygpIHtcbiAgICAgICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcih0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgZGVmYXVsdFdyaXRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ3JlbGVhc2VMb2NrJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RyZWFtID0gdGhpcy5fb3duZXJXcml0YWJsZVN0cmVhbTtcbiAgICAgICAgaWYgKHN0cmVhbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyUmVsZWFzZSh0aGlzKTtcbiAgICB9XG4gICAgd3JpdGUoY2h1bmsgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcih0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoZGVmYXVsdFdyaXRlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ3dyaXRlJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9vd25lcldyaXRhYmxlU3RyZWFtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGRlZmF1bHRXcml0ZXJMb2NrRXhjZXB0aW9uKCd3cml0ZSB0bycpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyV3JpdGUodGhpcywgY2h1bmspO1xuICAgIH1cbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlci5wcm90b3R5cGUsIHtcbiAgICBhYm9ydDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgY2xvc2U6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIHJlbGVhc2VMb2NrOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICB3cml0ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgY2xvc2VkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBkZXNpcmVkU2l6ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgcmVhZHk6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlci5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnLCB7XG4gICAgICAgIHZhbHVlOiAnV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyJyxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG59XG4vLyBBYnN0cmFjdCBvcGVyYXRpb25zIGZvciB0aGUgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyLlxuZnVuY3Rpb24gSXNXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIoeCkge1xuICAgIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19vd25lcldyaXRhYmxlU3RyZWFtJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcjtcbn1cbi8vIEEgY2xpZW50IG9mIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlciBtYXkgdXNlIHRoZXNlIGZ1bmN0aW9ucyBkaXJlY3RseSB0byBieXBhc3Mgc3RhdGUgY2hlY2suXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJBYm9ydCh3cml0ZXIsIHJlYXNvbikge1xuICAgIGNvbnN0IHN0cmVhbSA9IHdyaXRlci5fb3duZXJXcml0YWJsZVN0cmVhbTtcbiAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1BYm9ydChzdHJlYW0sIHJlYXNvbik7XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJDbG9zZSh3cml0ZXIpIHtcbiAgICBjb25zdCBzdHJlYW0gPSB3cml0ZXIuX293bmVyV3JpdGFibGVTdHJlYW07XG4gICAgcmV0dXJuIFdyaXRhYmxlU3RyZWFtQ2xvc2Uoc3RyZWFtKTtcbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckNsb3NlV2l0aEVycm9yUHJvcGFnYXRpb24od3JpdGVyKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gd3JpdGVyLl9vd25lcldyaXRhYmxlU3RyZWFtO1xuICAgIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgICBpZiAoV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoc3RyZWFtKSB8fCBzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICB9XG4gICAgaWYgKHN0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gICAgfVxuICAgIHJldHVybiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJDbG9zZSh3cml0ZXIpO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyRW5zdXJlQ2xvc2VkUHJvbWlzZVJlamVjdGVkKHdyaXRlciwgZXJyb3IpIHtcbiAgICBpZiAod3JpdGVyLl9jbG9zZWRQcm9taXNlU3RhdGUgPT09ICdwZW5kaW5nJykge1xuICAgICAgICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZVJlamVjdCh3cml0ZXIsIGVycm9yKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVzZXRUb1JlamVjdGVkKHdyaXRlciwgZXJyb3IpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckVuc3VyZVJlYWR5UHJvbWlzZVJlamVjdGVkKHdyaXRlciwgZXJyb3IpIHtcbiAgICBpZiAod3JpdGVyLl9yZWFkeVByb21pc2VTdGF0ZSA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZWplY3Qod3JpdGVyLCBlcnJvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVzZXRUb1JlamVjdGVkKHdyaXRlciwgZXJyb3IpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckdldERlc2lyZWRTaXplKHdyaXRlcikge1xuICAgIGNvbnN0IHN0cmVhbSA9IHdyaXRlci5fb3duZXJXcml0YWJsZVN0cmVhbTtcbiAgICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKHN0YXRlID09PSAnZXJyb3JlZCcgfHwgc3RhdGUgPT09ICdlcnJvcmluZycpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0RGVzaXJlZFNpemUoc3RyZWFtLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIpO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyUmVsZWFzZSh3cml0ZXIpIHtcbiAgICBjb25zdCBzdHJlYW0gPSB3cml0ZXIuX293bmVyV3JpdGFibGVTdHJlYW07XG4gICAgY29uc3QgcmVsZWFzZWRFcnJvciA9IG5ldyBUeXBlRXJyb3IoYFdyaXRlciB3YXMgcmVsZWFzZWQgYW5kIGNhbiBubyBsb25nZXIgYmUgdXNlZCB0byBtb25pdG9yIHRoZSBzdHJlYW0ncyBjbG9zZWRuZXNzYCk7XG4gICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyRW5zdXJlUmVhZHlQcm9taXNlUmVqZWN0ZWQod3JpdGVyLCByZWxlYXNlZEVycm9yKTtcbiAgICAvLyBUaGUgc3RhdGUgdHJhbnNpdGlvbnMgdG8gXCJlcnJvcmVkXCIgYmVmb3JlIHRoZSBzaW5rIGFib3J0KCkgbWV0aG9kIHJ1bnMsIGJ1dCB0aGUgd3JpdGVyLmNsb3NlZCBwcm9taXNlIGlzIG5vdFxuICAgIC8vIHJlamVjdGVkIHVudGlsIGFmdGVyd2FyZHMuIFRoaXMgbWVhbnMgdGhhdCBzaW1wbHkgdGVzdGluZyBzdGF0ZSB3aWxsIG5vdCB3b3JrLlxuICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlckVuc3VyZUNsb3NlZFByb21pc2VSZWplY3RlZCh3cml0ZXIsIHJlbGVhc2VkRXJyb3IpO1xuICAgIHN0cmVhbS5fd3JpdGVyID0gdW5kZWZpbmVkO1xuICAgIHdyaXRlci5fb3duZXJXcml0YWJsZVN0cmVhbSA9IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcldyaXRlKHdyaXRlciwgY2h1bmspIHtcbiAgICBjb25zdCBzdHJlYW0gPSB3cml0ZXIuX293bmVyV3JpdGFibGVTdHJlYW07XG4gICAgY29uc3QgY29udHJvbGxlciA9IHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyO1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXRDaHVua1NpemUoY29udHJvbGxlciwgY2h1bmspO1xuICAgIGlmIChzdHJlYW0gIT09IHdyaXRlci5fb3duZXJXcml0YWJsZVN0cmVhbSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChkZWZhdWx0V3JpdGVyTG9ja0V4Y2VwdGlvbignd3JpdGUgdG8nKSk7XG4gICAgfVxuICAgIGNvbnN0IHN0YXRlID0gc3RyZWFtLl9zdGF0ZTtcbiAgICBpZiAoc3RhdGUgPT09ICdlcnJvcmVkJykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW0uX3N0b3JlZEVycm9yKTtcbiAgICB9XG4gICAgaWYgKFdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KHN0cmVhbSkgfHwgc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ1RoZSBzdHJlYW0gaXMgY2xvc2luZyBvciBjbG9zZWQgYW5kIGNhbm5vdCBiZSB3cml0dGVuIHRvJykpO1xuICAgIH1cbiAgICBpZiAoc3RhdGUgPT09ICdlcnJvcmluZycpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gICAgfVxuICAgIGNvbnN0IHByb21pc2UgPSBXcml0YWJsZVN0cmVhbUFkZFdyaXRlUmVxdWVzdChzdHJlYW0pO1xuICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJXcml0ZShjb250cm9sbGVyLCBjaHVuaywgY2h1bmtTaXplKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cbmNvbnN0IGNsb3NlU2VudGluZWwgPSB7fTtcbi8qKlxuICogQWxsb3dzIGNvbnRyb2wgb2YgYSB7QGxpbmsgV3JpdGFibGVTdHJlYW0gfCB3cml0YWJsZSBzdHJlYW19J3Mgc3RhdGUgYW5kIGludGVybmFsIHF1ZXVlLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lsbGVnYWwgY29uc3RydWN0b3InKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHJlYXNvbiB3aGljaCB3YXMgcGFzc2VkIHRvIGBXcml0YWJsZVN0cmVhbS5hYm9ydChyZWFzb24pYCB3aGVuIHRoZSBzdHJlYW0gd2FzIGFib3J0ZWQuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqICBUaGlzIHByb3BlcnR5IGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgc3BlY2lmaWNhdGlvbiwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93aGF0d2cvc3RyZWFtcy9wdWxsLzExNzcuXG4gICAgICogIFVzZSB7QGxpbmsgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5zaWduYWx9J3MgYHJlYXNvbmAgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgYWJvcnRSZWFzb24oKSB7XG4gICAgICAgIGlmICghSXNXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24kMignYWJvcnRSZWFzb24nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYWJvcnRSZWFzb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFuIGBBYm9ydFNpZ25hbGAgdGhhdCBjYW4gYmUgdXNlZCB0byBhYm9ydCB0aGUgcGVuZGluZyB3cml0ZSBvciBjbG9zZSBvcGVyYXRpb24gd2hlbiB0aGUgc3RyZWFtIGlzIGFib3J0ZWQuXG4gICAgICovXG4gICAgZ2V0IHNpZ25hbCgpIHtcbiAgICAgICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbiQyKCdzaWduYWwnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYWJvcnRDb250cm9sbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIE9sZGVyIGJyb3dzZXJzIG9yIG9sZGVyIE5vZGUgdmVyc2lvbnMgbWF5IG5vdCBzdXBwb3J0IGBBYm9ydENvbnRyb2xsZXJgIG9yIGBBYm9ydFNpZ25hbGAuXG4gICAgICAgICAgICAvLyBXZSBkb24ndCB3YW50IHRvIGJ1bmRsZSBhbmQgc2hpcCBhbiBgQWJvcnRDb250cm9sbGVyYCBwb2x5ZmlsbCB0b2dldGhlciB3aXRoIG91ciBwb2x5ZmlsbCxcbiAgICAgICAgICAgIC8vIHNvIGluc3RlYWQgd2Ugb25seSBpbXBsZW1lbnQgc3VwcG9ydCBmb3IgYHNpZ25hbGAgaWYgd2UgZmluZCBhIGdsb2JhbCBgQWJvcnRDb250cm9sbGVyYCBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1dyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLnNpZ25hbCBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fib3J0Q29udHJvbGxlci5zaWduYWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgY29udHJvbGxlZCB3cml0YWJsZSBzdHJlYW0sIG1ha2luZyBhbGwgZnV0dXJlIGludGVyYWN0aW9ucyB3aXRoIGl0IGZhaWwgd2l0aCB0aGUgZ2l2ZW4gZXJyb3IgYGVgLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2QgaXMgcmFyZWx5IHVzZWQsIHNpbmNlIHVzdWFsbHkgaXQgc3VmZmljZXMgdG8gcmV0dXJuIGEgcmVqZWN0ZWQgcHJvbWlzZSBmcm9tIG9uZSBvZiB0aGUgdW5kZXJseWluZ1xuICAgICAqIHNpbmsncyBtZXRob2RzLiBIb3dldmVyLCBpdCBjYW4gYmUgdXNlZnVsIGZvciBzdWRkZW5seSBzaHV0dGluZyBkb3duIGEgc3RyZWFtIGluIHJlc3BvbnNlIHRvIGFuIGV2ZW50IG91dHNpZGUgdGhlXG4gICAgICogbm9ybWFsIGxpZmVjeWNsZSBvZiBpbnRlcmFjdGlvbnMgd2l0aCB0aGUgdW5kZXJseWluZyBzaW5rLlxuICAgICAqL1xuICAgIGVycm9yKGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbiQyKCdlcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtLl9zdGF0ZTtcbiAgICAgICAgaWYgKHN0YXRlICE9PSAnd3JpdGFibGUnKSB7XG4gICAgICAgICAgICAvLyBUaGUgc3RyZWFtIGlzIGNsb3NlZCwgZXJyb3JlZCBvciB3aWxsIGJlIHNvb24uIFRoZSBzaW5rIGNhbid0IGRvIGFueXRoaW5nIHVzZWZ1bCBpZiBpdCBnZXRzIGFuIGVycm9yIGhlcmUsIHNvXG4gICAgICAgICAgICAvLyBqdXN0IHRyZWF0IGl0IGFzIGEgbm8tb3AuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKHRoaXMsIGUpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgW0Fib3J0U3RlcHNdKHJlYXNvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9hYm9ydEFsZ29yaXRobShyZWFzb24pO1xuICAgICAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKHRoaXMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgW0Vycm9yU3RlcHNdKCkge1xuICAgICAgICBSZXNldFF1ZXVlKHRoaXMpO1xuICAgIH1cbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLCB7XG4gICAgYWJvcnRSZWFzb246IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIHNpZ25hbDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgZXJyb3I6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZywge1xuICAgICAgICB2YWx1ZTogJ1dyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXInLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbn1cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgaW1wbGVtZW50aW5nIGludGVyZmFjZSByZXF1aXJlZCBieSB0aGUgV3JpdGFibGVTdHJlYW0uXG5mdW5jdGlvbiBJc1dyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIoeCkge1xuICAgIGlmICghdHlwZUlzT2JqZWN0KHgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoeCwgJ19jb250cm9sbGVkV3JpdGFibGVTdHJlYW0nKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4IGluc3RhbmNlb2YgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcjtcbn1cbmZ1bmN0aW9uIFNldFVwV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcihzdHJlYW0sIGNvbnRyb2xsZXIsIHN0YXJ0QWxnb3JpdGhtLCB3cml0ZUFsZ29yaXRobSwgY2xvc2VBbGdvcml0aG0sIGFib3J0QWxnb3JpdGhtLCBoaWdoV2F0ZXJNYXJrLCBzaXplQWxnb3JpdGhtKSB7XG4gICAgY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtID0gc3RyZWFtO1xuICAgIHN0cmVhbS5fd3JpdGFibGVTdHJlYW1Db250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICAvLyBOZWVkIHRvIHNldCB0aGUgc2xvdHMgc28gdGhhdCB0aGUgYXNzZXJ0IGRvZXNuJ3QgZmlyZS4gSW4gdGhlIHNwZWMgdGhlIHNsb3RzIGFscmVhZHkgZXhpc3QgaW1wbGljaXRseS5cbiAgICBjb250cm9sbGVyLl9xdWV1ZSA9IHVuZGVmaW5lZDtcbiAgICBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA9IHVuZGVmaW5lZDtcbiAgICBSZXNldFF1ZXVlKGNvbnRyb2xsZXIpO1xuICAgIGNvbnRyb2xsZXIuX2Fib3J0UmVhc29uID0gdW5kZWZpbmVkO1xuICAgIGNvbnRyb2xsZXIuX2Fib3J0Q29udHJvbGxlciA9IGNyZWF0ZUFib3J0Q29udHJvbGxlcigpO1xuICAgIGNvbnRyb2xsZXIuX3N0YXJ0ZWQgPSBmYWxzZTtcbiAgICBjb250cm9sbGVyLl9zdHJhdGVneVNpemVBbGdvcml0aG0gPSBzaXplQWxnb3JpdGhtO1xuICAgIGNvbnRyb2xsZXIuX3N0cmF0ZWd5SFdNID0gaGlnaFdhdGVyTWFyaztcbiAgICBjb250cm9sbGVyLl93cml0ZUFsZ29yaXRobSA9IHdyaXRlQWxnb3JpdGhtO1xuICAgIGNvbnRyb2xsZXIuX2Nsb3NlQWxnb3JpdGhtID0gY2xvc2VBbGdvcml0aG07XG4gICAgY29udHJvbGxlci5fYWJvcnRBbGdvcml0aG0gPSBhYm9ydEFsZ29yaXRobTtcbiAgICBjb25zdCBiYWNrcHJlc3N1cmUgPSBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0QmFja3ByZXNzdXJlKGNvbnRyb2xsZXIpO1xuICAgIFdyaXRhYmxlU3RyZWFtVXBkYXRlQmFja3ByZXNzdXJlKHN0cmVhbSwgYmFja3ByZXNzdXJlKTtcbiAgICBjb25zdCBzdGFydFJlc3VsdCA9IHN0YXJ0QWxnb3JpdGhtKCk7XG4gICAgY29uc3Qgc3RhcnRQcm9taXNlID0gcHJvbWlzZVJlc29sdmVkV2l0aChzdGFydFJlc3VsdCk7XG4gICAgdXBvblByb21pc2Uoc3RhcnRQcm9taXNlLCAoKSA9PiB7XG4gICAgICAgIGNvbnRyb2xsZXIuX3N0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQWR2YW5jZVF1ZXVlSWZOZWVkZWQoY29udHJvbGxlcik7XG4gICAgfSwgciA9PiB7XG4gICAgICAgIGNvbnRyb2xsZXIuX3N0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBXcml0YWJsZVN0cmVhbURlYWxXaXRoUmVqZWN0aW9uKHN0cmVhbSwgcik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBTZXRVcFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJGcm9tVW5kZXJseWluZ1Npbmsoc3RyZWFtLCB1bmRlcmx5aW5nU2luaywgaGlnaFdhdGVyTWFyaywgc2l6ZUFsZ29yaXRobSkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBPYmplY3QuY3JlYXRlKFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlKTtcbiAgICBsZXQgc3RhcnRBbGdvcml0aG0gPSAoKSA9PiB1bmRlZmluZWQ7XG4gICAgbGV0IHdyaXRlQWxnb3JpdGhtID0gKCkgPT4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIGxldCBjbG9zZUFsZ29yaXRobSA9ICgpID0+IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICBsZXQgYWJvcnRBbGdvcml0aG0gPSAoKSA9PiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgaWYgKHVuZGVybHlpbmdTaW5rLnN0YXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RhcnRBbGdvcml0aG0gPSAoKSA9PiB1bmRlcmx5aW5nU2luay5zdGFydChjb250cm9sbGVyKTtcbiAgICB9XG4gICAgaWYgKHVuZGVybHlpbmdTaW5rLndyaXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgd3JpdGVBbGdvcml0aG0gPSBjaHVuayA9PiB1bmRlcmx5aW5nU2luay53cml0ZShjaHVuaywgY29udHJvbGxlcik7XG4gICAgfVxuICAgIGlmICh1bmRlcmx5aW5nU2luay5jbG9zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNsb3NlQWxnb3JpdGhtID0gKCkgPT4gdW5kZXJseWluZ1NpbmsuY2xvc2UoKTtcbiAgICB9XG4gICAgaWYgKHVuZGVybHlpbmdTaW5rLmFib3J0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYWJvcnRBbGdvcml0aG0gPSByZWFzb24gPT4gdW5kZXJseWluZ1NpbmsuYWJvcnQocmVhc29uKTtcbiAgICB9XG4gICAgU2V0VXBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHdyaXRlQWxnb3JpdGhtLCBjbG9zZUFsZ29yaXRobSwgYWJvcnRBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmssIHNpemVBbGdvcml0aG0pO1xufVxuLy8gQ2xlYXJBbGdvcml0aG1zIG1heSBiZSBjYWxsZWQgdHdpY2UuIEVycm9yaW5nIHRoZSBzYW1lIHN0cmVhbSBpbiBtdWx0aXBsZSB3YXlzIHdpbGwgb2Z0ZW4gcmVzdWx0IGluIHJlZHVuZGFudCBjYWxscy5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcikge1xuICAgIGNvbnRyb2xsZXIuX3dyaXRlQWxnb3JpdGhtID0gdW5kZWZpbmVkO1xuICAgIGNvbnRyb2xsZXIuX2Nsb3NlQWxnb3JpdGhtID0gdW5kZWZpbmVkO1xuICAgIGNvbnRyb2xsZXIuX2Fib3J0QWxnb3JpdGhtID0gdW5kZWZpbmVkO1xuICAgIGNvbnRyb2xsZXIuX3N0cmF0ZWd5U2l6ZUFsZ29yaXRobSA9IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbG9zZShjb250cm9sbGVyKSB7XG4gICAgRW5xdWV1ZVZhbHVlV2l0aFNpemUoY29udHJvbGxlciwgY2xvc2VTZW50aW5lbCwgMCk7XG4gICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckFkdmFuY2VRdWV1ZUlmTmVlZGVkKGNvbnRyb2xsZXIpO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldENodW5rU2l6ZShjb250cm9sbGVyLCBjaHVuaykge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBjb250cm9sbGVyLl9zdHJhdGVneVNpemVBbGdvcml0aG0oY2h1bmspO1xuICAgIH1cbiAgICBjYXRjaCAoY2h1bmtTaXplRSkge1xuICAgICAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3JJZk5lZWRlZChjb250cm9sbGVyLCBjaHVua1NpemVFKTtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldERlc2lyZWRTaXplKGNvbnRyb2xsZXIpIHtcbiAgICByZXR1cm4gY29udHJvbGxlci5fc3RyYXRlZ3lIV00gLSBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZTtcbn1cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJXcml0ZShjb250cm9sbGVyLCBjaHVuaywgY2h1bmtTaXplKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgRW5xdWV1ZVZhbHVlV2l0aFNpemUoY29udHJvbGxlciwgY2h1bmssIGNodW5rU2l6ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlbnF1ZXVlRSkge1xuICAgICAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3JJZk5lZWRlZChjb250cm9sbGVyLCBlbnF1ZXVlRSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtO1xuICAgIGlmICghV3JpdGFibGVTdHJlYW1DbG9zZVF1ZXVlZE9ySW5GbGlnaHQoc3RyZWFtKSAmJiBzdHJlYW0uX3N0YXRlID09PSAnd3JpdGFibGUnKSB7XG4gICAgICAgIGNvbnN0IGJhY2twcmVzc3VyZSA9IFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXRCYWNrcHJlc3N1cmUoY29udHJvbGxlcik7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtVXBkYXRlQmFja3ByZXNzdXJlKHN0cmVhbSwgYmFja3ByZXNzdXJlKTtcbiAgICB9XG4gICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckFkdmFuY2VRdWV1ZUlmTmVlZGVkKGNvbnRyb2xsZXIpO1xufVxuLy8gQWJzdHJhY3Qgb3BlcmF0aW9ucyBmb3IgdGhlIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIuXG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQWR2YW5jZVF1ZXVlSWZOZWVkZWQoY29udHJvbGxlcikge1xuICAgIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRXcml0YWJsZVN0cmVhbTtcbiAgICBpZiAoIWNvbnRyb2xsZXIuX3N0YXJ0ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3RyZWFtLl9pbkZsaWdodFdyaXRlUmVxdWVzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3RhdGUgPSBzdHJlYW0uX3N0YXRlO1xuICAgIGlmIChzdGF0ZSA9PT0gJ2Vycm9yaW5nJykge1xuICAgICAgICBXcml0YWJsZVN0cmVhbUZpbmlzaEVycm9yaW5nKHN0cmVhbSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvbnRyb2xsZXIuX3F1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gUGVla1F1ZXVlVmFsdWUoY29udHJvbGxlcik7XG4gICAgaWYgKHZhbHVlID09PSBjbG9zZVNlbnRpbmVsKSB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJQcm9jZXNzQ2xvc2UoY29udHJvbGxlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyUHJvY2Vzc1dyaXRlKGNvbnRyb2xsZXIsIHZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3JJZk5lZWRlZChjb250cm9sbGVyLCBlcnJvcikge1xuICAgIGlmIChjb250cm9sbGVyLl9jb250cm9sbGVkV3JpdGFibGVTdHJlYW0uX3N0YXRlID09PSAnd3JpdGFibGUnKSB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBlcnJvcik7XG4gICAgfVxufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlclByb2Nlc3NDbG9zZShjb250cm9sbGVyKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFdyaXRhYmxlU3RyZWFtO1xuICAgIFdyaXRhYmxlU3RyZWFtTWFya0Nsb3NlUmVxdWVzdEluRmxpZ2h0KHN0cmVhbSk7XG4gICAgRGVxdWV1ZVZhbHVlKGNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IHNpbmtDbG9zZVByb21pc2UgPSBjb250cm9sbGVyLl9jbG9zZUFsZ29yaXRobSgpO1xuICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG4gICAgdXBvblByb21pc2Uoc2lua0Nsb3NlUHJvbWlzZSwgKCkgPT4ge1xuICAgICAgICBXcml0YWJsZVN0cmVhbUZpbmlzaEluRmxpZ2h0Q2xvc2Uoc3RyZWFtKTtcbiAgICB9LCByZWFzb24gPT4ge1xuICAgICAgICBXcml0YWJsZVN0cmVhbUZpbmlzaEluRmxpZ2h0Q2xvc2VXaXRoRXJyb3Ioc3RyZWFtLCByZWFzb24pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlclByb2Nlc3NXcml0ZShjb250cm9sbGVyLCBjaHVuaykge1xuICAgIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRXcml0YWJsZVN0cmVhbTtcbiAgICBXcml0YWJsZVN0cmVhbU1hcmtGaXJzdFdyaXRlUmVxdWVzdEluRmxpZ2h0KHN0cmVhbSk7XG4gICAgY29uc3Qgc2lua1dyaXRlUHJvbWlzZSA9IGNvbnRyb2xsZXIuX3dyaXRlQWxnb3JpdGhtKGNodW5rKTtcbiAgICB1cG9uUHJvbWlzZShzaW5rV3JpdGVQcm9taXNlLCAoKSA9PiB7XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRmluaXNoSW5GbGlnaHRXcml0ZShzdHJlYW0pO1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHN0cmVhbS5fc3RhdGU7XG4gICAgICAgIERlcXVldWVWYWx1ZShjb250cm9sbGVyKTtcbiAgICAgICAgaWYgKCFXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChzdHJlYW0pICYmIHN0YXRlID09PSAnd3JpdGFibGUnKSB7XG4gICAgICAgICAgICBjb25zdCBiYWNrcHJlc3N1cmUgPSBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0QmFja3ByZXNzdXJlKGNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgV3JpdGFibGVTdHJlYW1VcGRhdGVCYWNrcHJlc3N1cmUoc3RyZWFtLCBiYWNrcHJlc3N1cmUpO1xuICAgICAgICB9XG4gICAgICAgIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJBZHZhbmNlUXVldWVJZk5lZWRlZChjb250cm9sbGVyKTtcbiAgICB9LCByZWFzb24gPT4ge1xuICAgICAgICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ3dyaXRhYmxlJykge1xuICAgICAgICAgICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyhjb250cm9sbGVyKTtcbiAgICAgICAgfVxuICAgICAgICBXcml0YWJsZVN0cmVhbUZpbmlzaEluRmxpZ2h0V3JpdGVXaXRoRXJyb3Ioc3RyZWFtLCByZWFzb24pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldEJhY2twcmVzc3VyZShjb250cm9sbGVyKSB7XG4gICAgY29uc3QgZGVzaXJlZFNpemUgPSBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyR2V0RGVzaXJlZFNpemUoY29udHJvbGxlcik7XG4gICAgcmV0dXJuIGRlc2lyZWRTaXplIDw9IDA7XG59XG4vLyBBIGNsaWVudCBvZiBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyIG1heSB1c2UgdGhlc2UgZnVuY3Rpb25zIGRpcmVjdGx5IHRvIGJ5cGFzcyBzdGF0ZSBjaGVjay5cbmZ1bmN0aW9uIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBlcnJvcikge1xuICAgIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRXcml0YWJsZVN0cmVhbTtcbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpO1xuICAgIFdyaXRhYmxlU3RyZWFtU3RhcnRFcnJvcmluZyhzdHJlYW0sIGVycm9yKTtcbn1cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBXcml0YWJsZVN0cmVhbS5cbmZ1bmN0aW9uIHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24kMihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYFdyaXRhYmxlU3RyZWFtLnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBXcml0YWJsZVN0cmVhbWApO1xufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIuXG5mdW5jdGlvbiBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24kMihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFdyaXRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJgKTtcbn1cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXIuXG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYFdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlci5wcm90b3R5cGUuJHtuYW1lfSBjYW4gb25seSBiZSB1c2VkIG9uIGEgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyYCk7XG59XG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyTG9ja0V4Y2VwdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCAnICsgbmFtZSArICcgYSBzdHJlYW0gdXNpbmcgYSByZWxlYXNlZCB3cml0ZXInKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZSh3cml0ZXIpIHtcbiAgICB3cml0ZXIuX2Nsb3NlZFByb21pc2UgPSBuZXdQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgd3JpdGVyLl9jbG9zZWRQcm9taXNlX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICB3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB3cml0ZXIuX2Nsb3NlZFByb21pc2VTdGF0ZSA9ICdwZW5kaW5nJztcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQod3JpdGVyLCByZWFzb24pIHtcbiAgICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemUod3JpdGVyKTtcbiAgICBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZVJlamVjdCh3cml0ZXIsIHJlYXNvbik7XG59XG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZUluaXRpYWxpemVBc1Jlc29sdmVkKHdyaXRlcikge1xuICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlSW5pdGlhbGl6ZSh3cml0ZXIpO1xuICAgIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVzb2x2ZSh3cml0ZXIpO1xufVxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VSZWplY3Qod3JpdGVyLCByZWFzb24pIHtcbiAgICBpZiAod3JpdGVyLl9jbG9zZWRQcm9taXNlX3JlamVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0UHJvbWlzZUlzSGFuZGxlZFRvVHJ1ZSh3cml0ZXIuX2Nsb3NlZFByb21pc2UpO1xuICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QocmVhc29uKTtcbiAgICB3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSA9IHVuZGVmaW5lZDtcbiAgICB3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVqZWN0ID0gdW5kZWZpbmVkO1xuICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZVN0YXRlID0gJ3JlamVjdGVkJztcbn1cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJDbG9zZWRQcm9taXNlUmVzZXRUb1JlamVjdGVkKHdyaXRlciwgcmVhc29uKSB7XG4gICAgZGVmYXVsdFdyaXRlckNsb3NlZFByb21pc2VJbml0aWFsaXplQXNSZWplY3RlZCh3cml0ZXIsIHJlYXNvbik7XG59XG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyQ2xvc2VkUHJvbWlzZVJlc29sdmUod3JpdGVyKSB7XG4gICAgaWYgKHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3cml0ZXIuX2Nsb3NlZFByb21pc2VfcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZXNvbHZlID0gdW5kZWZpbmVkO1xuICAgIHdyaXRlci5fY2xvc2VkUHJvbWlzZV9yZWplY3QgPSB1bmRlZmluZWQ7XG4gICAgd3JpdGVyLl9jbG9zZWRQcm9taXNlU3RhdGUgPSAncmVzb2x2ZWQnO1xufVxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemUod3JpdGVyKSB7XG4gICAgd3JpdGVyLl9yZWFkeVByb21pc2UgPSBuZXdQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgd3JpdGVyLl9yZWFkeVByb21pc2VfcmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIHdyaXRlci5fcmVhZHlQcm9taXNlX3JlamVjdCA9IHJlamVjdDtcbiAgICB9KTtcbiAgICB3cml0ZXIuX3JlYWR5UHJvbWlzZVN0YXRlID0gJ3BlbmRpbmcnO1xufVxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemVBc1JlamVjdGVkKHdyaXRlciwgcmVhc29uKSB7XG4gICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemUod3JpdGVyKTtcbiAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVqZWN0KHdyaXRlciwgcmVhc29uKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VJbml0aWFsaXplQXNSZXNvbHZlZCh3cml0ZXIpIHtcbiAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZSh3cml0ZXIpO1xuICAgIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNvbHZlKHdyaXRlcik7XG59XG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVqZWN0KHdyaXRlciwgcmVhc29uKSB7XG4gICAgaWYgKHdyaXRlci5fcmVhZHlQcm9taXNlX3JlamVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0UHJvbWlzZUlzSGFuZGxlZFRvVHJ1ZSh3cml0ZXIuX3JlYWR5UHJvbWlzZSk7XG4gICAgd3JpdGVyLl9yZWFkeVByb21pc2VfcmVqZWN0KHJlYXNvbik7XG4gICAgd3JpdGVyLl9yZWFkeVByb21pc2VfcmVzb2x2ZSA9IHVuZGVmaW5lZDtcbiAgICB3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZWplY3QgPSB1bmRlZmluZWQ7XG4gICAgd3JpdGVyLl9yZWFkeVByb21pc2VTdGF0ZSA9ICdyZWplY3RlZCc7XG59XG5mdW5jdGlvbiBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlUmVzZXQod3JpdGVyKSB7XG4gICAgZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZUluaXRpYWxpemUod3JpdGVyKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRXcml0ZXJSZWFkeVByb21pc2VSZXNldFRvUmVqZWN0ZWQod3JpdGVyLCByZWFzb24pIHtcbiAgICBkZWZhdWx0V3JpdGVyUmVhZHlQcm9taXNlSW5pdGlhbGl6ZUFzUmVqZWN0ZWQod3JpdGVyLCByZWFzb24pO1xufVxuZnVuY3Rpb24gZGVmYXVsdFdyaXRlclJlYWR5UHJvbWlzZVJlc29sdmUod3JpdGVyKSB7XG4gICAgaWYgKHdyaXRlci5fcmVhZHlQcm9taXNlX3Jlc29sdmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHdyaXRlci5fcmVhZHlQcm9taXNlX3Jlc29sdmUodW5kZWZpbmVkKTtcbiAgICB3cml0ZXIuX3JlYWR5UHJvbWlzZV9yZXNvbHZlID0gdW5kZWZpbmVkO1xuICAgIHdyaXRlci5fcmVhZHlQcm9taXNlX3JlamVjdCA9IHVuZGVmaW5lZDtcbiAgICB3cml0ZXIuX3JlYWR5UHJvbWlzZVN0YXRlID0gJ2Z1bGZpbGxlZCc7XG59XG5cbi8vLyA8cmVmZXJlbmNlIGxpYj1cImRvbVwiIC8+XG5jb25zdCBOYXRpdmVET01FeGNlcHRpb24gPSB0eXBlb2YgRE9NRXhjZXB0aW9uICE9PSAndW5kZWZpbmVkJyA/IERPTUV4Y2VwdGlvbiA6IHVuZGVmaW5lZDtcblxuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJub2RlXCIgLz5cbmZ1bmN0aW9uIGlzRE9NRXhjZXB0aW9uQ29uc3RydWN0b3IoY3Rvcikge1xuICAgIGlmICghKHR5cGVvZiBjdG9yID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBjdG9yID09PSAnb2JqZWN0JykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBuZXcgY3RvcigpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVET01FeGNlcHRpb25Qb2x5ZmlsbCgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2hhZG93XG4gICAgY29uc3QgY3RvciA9IGZ1bmN0aW9uIERPTUV4Y2VwdGlvbihtZXNzYWdlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgJyc7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgJ0Vycm9yJztcbiAgICAgICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0b3IucHJvdG90eXBlLCAnY29uc3RydWN0b3InLCB7IHZhbHVlOiBjdG9yLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIHJldHVybiBjdG9yO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlZGVjbGFyZVxuY29uc3QgRE9NRXhjZXB0aW9uJDEgPSBpc0RPTUV4Y2VwdGlvbkNvbnN0cnVjdG9yKE5hdGl2ZURPTUV4Y2VwdGlvbikgPyBOYXRpdmVET01FeGNlcHRpb24gOiBjcmVhdGVET01FeGNlcHRpb25Qb2x5ZmlsbCgpO1xuXG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbVBpcGVUbyhzb3VyY2UsIGRlc3QsIHByZXZlbnRDbG9zZSwgcHJldmVudEFib3J0LCBwcmV2ZW50Q2FuY2VsLCBzaWduYWwpIHtcbiAgICBjb25zdCByZWFkZXIgPSBBY3F1aXJlUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHNvdXJjZSk7XG4gICAgY29uc3Qgd3JpdGVyID0gQWNxdWlyZVdyaXRhYmxlU3RyZWFtRGVmYXVsdFdyaXRlcihkZXN0KTtcbiAgICBzb3VyY2UuX2Rpc3R1cmJlZCA9IHRydWU7XG4gICAgbGV0IHNodXR0aW5nRG93biA9IGZhbHNlO1xuICAgIC8vIFRoaXMgaXMgdXNlZCB0byBrZWVwIHRyYWNrIG9mIHRoZSBzcGVjJ3MgcmVxdWlyZW1lbnQgdGhhdCB3ZSB3YWl0IGZvciBvbmdvaW5nIHdyaXRlcyBkdXJpbmcgc2h1dGRvd24uXG4gICAgbGV0IGN1cnJlbnRXcml0ZSA9IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICByZXR1cm4gbmV3UHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBhYm9ydEFsZ29yaXRobTtcbiAgICAgICAgaWYgKHNpZ25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhYm9ydEFsZ29yaXRobSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBET01FeGNlcHRpb24kMSgnQWJvcnRlZCcsICdBYm9ydEVycm9yJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgIGlmICghcHJldmVudEFib3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdC5fc3RhdGUgPT09ICd3cml0YWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gV3JpdGFibGVTdHJlYW1BYm9ydChkZXN0LCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2ZW50Q2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlLl9zdGF0ZSA9PT0gJ3JlYWRhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbUNhbmNlbChzb3VyY2UsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzaHV0ZG93bldpdGhBY3Rpb24oKCkgPT4gUHJvbWlzZS5hbGwoYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbigpKSksIHRydWUsIGVycm9yKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgICAgICAgICBhYm9ydEFsZ29yaXRobSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0QWxnb3JpdGhtKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBVc2luZyByZWFkZXIgYW5kIHdyaXRlciwgcmVhZCBhbGwgY2h1bmtzIGZyb20gdGhpcyBhbmQgd3JpdGUgdGhlbSB0byBkZXN0XG4gICAgICAgIC8vIC0gQmFja3ByZXNzdXJlIG11c3QgYmUgZW5mb3JjZWRcbiAgICAgICAgLy8gLSBTaHV0ZG93biBtdXN0IHN0b3AgYWxsIGFjdGl2aXR5XG4gICAgICAgIGZ1bmN0aW9uIHBpcGVMb29wKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ld1Byb21pc2UoKHJlc29sdmVMb29wLCByZWplY3RMb29wKSA9PiB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbmV4dChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlTG9vcCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIGBQZXJmb3JtUHJvbWlzZVRoZW5gIGluc3RlYWQgb2YgYHVwb25Qcm9taXNlYCB0byBhdm9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkaW5nIHVubmVjZXNzYXJ5IGAuY2F0Y2gocmV0aHJvd0Fzc2VydGlvbkVycm9yUmVqZWN0aW9uKWAgaGFuZGxlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIFBlcmZvcm1Qcm9taXNlVGhlbihwaXBlU3RlcCgpLCBuZXh0LCByZWplY3RMb29wKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0KGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHBpcGVTdGVwKCkge1xuICAgICAgICAgICAgaWYgKHNodXR0aW5nRG93bikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFBlcmZvcm1Qcm9taXNlVGhlbih3cml0ZXIuX3JlYWR5UHJvbWlzZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdQcm9taXNlKChyZXNvbHZlUmVhZCwgcmVqZWN0UmVhZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJSZWFkKHJlYWRlciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50V3JpdGUgPSBQZXJmb3JtUHJvbWlzZVRoZW4oV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyV3JpdGUod3JpdGVyLCBjaHVuayksIHVuZGVmaW5lZCwgbm9vcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZVJlYWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jbG9zZVN0ZXBzOiAoKSA9PiByZXNvbHZlUmVhZCh0cnVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9lcnJvclN0ZXBzOiByZWplY3RSZWFkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXJyb3JzIG11c3QgYmUgcHJvcGFnYXRlZCBmb3J3YXJkXG4gICAgICAgIGlzT3JCZWNvbWVzRXJyb3JlZChzb3VyY2UsIHJlYWRlci5fY2xvc2VkUHJvbWlzZSwgc3RvcmVkRXJyb3IgPT4ge1xuICAgICAgICAgICAgaWYgKCFwcmV2ZW50QWJvcnQpIHtcbiAgICAgICAgICAgICAgICBzaHV0ZG93bldpdGhBY3Rpb24oKCkgPT4gV3JpdGFibGVTdHJlYW1BYm9ydChkZXN0LCBzdG9yZWRFcnJvciksIHRydWUsIHN0b3JlZEVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNodXRkb3duKHRydWUsIHN0b3JlZEVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEVycm9ycyBtdXN0IGJlIHByb3BhZ2F0ZWQgYmFja3dhcmRcbiAgICAgICAgaXNPckJlY29tZXNFcnJvcmVkKGRlc3QsIHdyaXRlci5fY2xvc2VkUHJvbWlzZSwgc3RvcmVkRXJyb3IgPT4ge1xuICAgICAgICAgICAgaWYgKCFwcmV2ZW50Q2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgc2h1dGRvd25XaXRoQWN0aW9uKCgpID0+IFJlYWRhYmxlU3RyZWFtQ2FuY2VsKHNvdXJjZSwgc3RvcmVkRXJyb3IpLCB0cnVlLCBzdG9yZWRFcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaHV0ZG93bih0cnVlLCBzdG9yZWRFcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBDbG9zaW5nIG11c3QgYmUgcHJvcGFnYXRlZCBmb3J3YXJkXG4gICAgICAgIGlzT3JCZWNvbWVzQ2xvc2VkKHNvdXJjZSwgcmVhZGVyLl9jbG9zZWRQcm9taXNlLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXByZXZlbnRDbG9zZSkge1xuICAgICAgICAgICAgICAgIHNodXRkb3duV2l0aEFjdGlvbigoKSA9PiBXcml0YWJsZVN0cmVhbURlZmF1bHRXcml0ZXJDbG9zZVdpdGhFcnJvclByb3BhZ2F0aW9uKHdyaXRlcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2h1dGRvd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIENsb3NpbmcgbXVzdCBiZSBwcm9wYWdhdGVkIGJhY2t3YXJkXG4gICAgICAgIGlmIChXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChkZXN0KSB8fCBkZXN0Ll9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlc3RDbG9zZWQgPSBuZXcgVHlwZUVycm9yKCd0aGUgZGVzdGluYXRpb24gd3JpdGFibGUgc3RyZWFtIGNsb3NlZCBiZWZvcmUgYWxsIGRhdGEgY291bGQgYmUgcGlwZWQgdG8gaXQnKTtcbiAgICAgICAgICAgIGlmICghcHJldmVudENhbmNlbCkge1xuICAgICAgICAgICAgICAgIHNodXRkb3duV2l0aEFjdGlvbigoKSA9PiBSZWFkYWJsZVN0cmVhbUNhbmNlbChzb3VyY2UsIGRlc3RDbG9zZWQpLCB0cnVlLCBkZXN0Q2xvc2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNodXRkb3duKHRydWUsIGRlc3RDbG9zZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldFByb21pc2VJc0hhbmRsZWRUb1RydWUocGlwZUxvb3AoKSk7XG4gICAgICAgIGZ1bmN0aW9uIHdhaXRGb3JXcml0ZXNUb0ZpbmlzaCgpIHtcbiAgICAgICAgICAgIC8vIEFub3RoZXIgd3JpdGUgbWF5IGhhdmUgc3RhcnRlZCB3aGlsZSB3ZSB3ZXJlIHdhaXRpbmcgb24gdGhpcyBjdXJyZW50V3JpdGUsIHNvIHdlIGhhdmUgdG8gYmUgc3VyZSB0byB3YWl0XG4gICAgICAgICAgICAvLyBmb3IgdGhhdCB0b28uXG4gICAgICAgICAgICBjb25zdCBvbGRDdXJyZW50V3JpdGUgPSBjdXJyZW50V3JpdGU7XG4gICAgICAgICAgICByZXR1cm4gUGVyZm9ybVByb21pc2VUaGVuKGN1cnJlbnRXcml0ZSwgKCkgPT4gb2xkQ3VycmVudFdyaXRlICE9PSBjdXJyZW50V3JpdGUgPyB3YWl0Rm9yV3JpdGVzVG9GaW5pc2goKSA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaXNPckJlY29tZXNFcnJvcmVkKHN0cmVhbSwgcHJvbWlzZSwgYWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uKHN0cmVhbS5fc3RvcmVkRXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXBvblJlamVjdGlvbihwcm9taXNlLCBhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlzT3JCZWNvbWVzQ2xvc2VkKHN0cmVhbSwgcHJvbWlzZSwgYWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHVwb25GdWxmaWxsbWVudChwcm9taXNlLCBhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNodXRkb3duV2l0aEFjdGlvbihhY3Rpb24sIG9yaWdpbmFsSXNFcnJvciwgb3JpZ2luYWxFcnJvcikge1xuICAgICAgICAgICAgaWYgKHNodXR0aW5nRG93bikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNodXR0aW5nRG93biA9IHRydWU7XG4gICAgICAgICAgICBpZiAoZGVzdC5fc3RhdGUgPT09ICd3cml0YWJsZScgJiYgIVdyaXRhYmxlU3RyZWFtQ2xvc2VRdWV1ZWRPckluRmxpZ2h0KGRlc3QpKSB7XG4gICAgICAgICAgICAgICAgdXBvbkZ1bGZpbGxtZW50KHdhaXRGb3JXcml0ZXNUb0ZpbmlzaCgpLCBkb1RoZVJlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9UaGVSZXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBkb1RoZVJlc3QoKSB7XG4gICAgICAgICAgICAgICAgdXBvblByb21pc2UoYWN0aW9uKCksICgpID0+IGZpbmFsaXplKG9yaWdpbmFsSXNFcnJvciwgb3JpZ2luYWxFcnJvciksIG5ld0Vycm9yID0+IGZpbmFsaXplKHRydWUsIG5ld0Vycm9yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gc2h1dGRvd24oaXNFcnJvciwgZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChzaHV0dGluZ0Rvd24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaHV0dGluZ0Rvd24gPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGRlc3QuX3N0YXRlID09PSAnd3JpdGFibGUnICYmICFXcml0YWJsZVN0cmVhbUNsb3NlUXVldWVkT3JJbkZsaWdodChkZXN0KSkge1xuICAgICAgICAgICAgICAgIHVwb25GdWxmaWxsbWVudCh3YWl0Rm9yV3JpdGVzVG9GaW5pc2goKSwgKCkgPT4gZmluYWxpemUoaXNFcnJvciwgZXJyb3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpbmFsaXplKGlzRXJyb3IsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBmaW5hbGl6ZShpc0Vycm9yLCBlcnJvcikge1xuICAgICAgICAgICAgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyUmVsZWFzZSh3cml0ZXIpO1xuICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZShyZWFkZXIpO1xuICAgICAgICAgICAgaWYgKHNpZ25hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRBbGdvcml0aG0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8qKlxuICogQWxsb3dzIGNvbnRyb2wgb2YgYSB7QGxpbmsgUmVhZGFibGVTdHJlYW0gfCByZWFkYWJsZSBzdHJlYW19J3Mgc3RhdGUgYW5kIGludGVybmFsIHF1ZXVlLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lsbGVnYWwgY29uc3RydWN0b3InKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVzaXJlZCBzaXplIHRvIGZpbGwgdGhlIGNvbnRyb2xsZWQgc3RyZWFtJ3MgaW50ZXJuYWwgcXVldWUuIEl0IGNhbiBiZSBuZWdhdGl2ZSwgaWYgdGhlIHF1ZXVlIGlzXG4gICAgICogb3Zlci1mdWxsLiBBbiB1bmRlcmx5aW5nIHNvdXJjZSBvdWdodCB0byB1c2UgdGhpcyBpbmZvcm1hdGlvbiB0byBkZXRlcm1pbmUgd2hlbiBhbmQgaG93IHRvIGFwcGx5IGJhY2twcmVzc3VyZS5cbiAgICAgKi9cbiAgICBnZXQgZGVzaXJlZFNpemUoKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24kMSgnZGVzaXJlZFNpemUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldERlc2lyZWRTaXplKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgdGhlIGNvbnRyb2xsZWQgcmVhZGFibGUgc3RyZWFtLiBDb25zdW1lcnMgd2lsbCBzdGlsbCBiZSBhYmxlIHRvIHJlYWQgYW55IHByZXZpb3VzbHktZW5xdWV1ZWQgY2h1bmtzIGZyb21cbiAgICAgKiB0aGUgc3RyZWFtLCBidXQgb25jZSB0aG9zZSBhcmUgcmVhZCwgdGhlIHN0cmVhbSB3aWxsIGJlY29tZSBjbG9zZWQuXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24kMSgnY2xvc2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYW5DbG9zZU9yRW5xdWV1ZSh0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHN0cmVhbSBpcyBub3QgaW4gYSBzdGF0ZSB0aGF0IHBlcm1pdHMgY2xvc2UnKTtcbiAgICAgICAgfVxuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xvc2UodGhpcyk7XG4gICAgfVxuICAgIGVucXVldWUoY2h1bmsgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbiQxKCdlbnF1ZXVlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FuQ2xvc2VPckVucXVldWUodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBzdHJlYW0gaXMgbm90IGluIGEgc3RhdGUgdGhhdCBwZXJtaXRzIGVucXVldWUnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUodGhpcywgY2h1bmspO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFcnJvcnMgdGhlIGNvbnRyb2xsZWQgcmVhZGFibGUgc3RyZWFtLCBtYWtpbmcgYWxsIGZ1dHVyZSBpbnRlcmFjdGlvbnMgd2l0aCBpdCBmYWlsIHdpdGggdGhlIGdpdmVuIGVycm9yIGBlYC5cbiAgICAgKi9cbiAgICBlcnJvcihlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24kMSgnZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IodGhpcywgZSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBbQ2FuY2VsU3RlcHNdKHJlYXNvbikge1xuICAgICAgICBSZXNldFF1ZXVlKHRoaXMpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9jYW5jZWxBbGdvcml0aG0ocmVhc29uKTtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsZWFyQWxnb3JpdGhtcyh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIFtQdWxsU3RlcHNdKHJlYWRSZXF1ZXN0KSB7XG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuX2NvbnRyb2xsZWRSZWFkYWJsZVN0cmVhbTtcbiAgICAgICAgaWYgKHRoaXMuX3F1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGNodW5rID0gRGVxdWV1ZVZhbHVlKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Nsb3NlUmVxdWVzdGVkICYmIHRoaXMuX3F1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXModGhpcyk7XG4gICAgICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1DbG9zZShzdHJlYW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWFkUmVxdWVzdC5fY2h1bmtTdGVwcyhjaHVuayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBSZWFkYWJsZVN0cmVhbUFkZFJlYWRSZXF1ZXN0KHN0cmVhbSwgcmVhZFJlcXVlc3QpO1xuICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSwge1xuICAgIGNsb3NlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBlbnF1ZXVlOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBlcnJvcjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgZGVzaXJlZFNpemU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZywge1xuICAgICAgICB2YWx1ZTogJ1JlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXInLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbn1cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLlxuZnVuY3Rpb24gSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHgpIHtcbiAgICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI7XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKSB7XG4gICAgY29uc3Qgc2hvdWxkUHVsbCA9IFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJTaG91bGRDYWxsUHVsbChjb250cm9sbGVyKTtcbiAgICBpZiAoIXNob3VsZFB1bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29udHJvbGxlci5fcHVsbGluZykge1xuICAgICAgICBjb250cm9sbGVyLl9wdWxsQWdhaW4gPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnRyb2xsZXIuX3B1bGxpbmcgPSB0cnVlO1xuICAgIGNvbnN0IHB1bGxQcm9taXNlID0gY29udHJvbGxlci5fcHVsbEFsZ29yaXRobSgpO1xuICAgIHVwb25Qcm9taXNlKHB1bGxQcm9taXNlLCAoKSA9PiB7XG4gICAgICAgIGNvbnRyb2xsZXIuX3B1bGxpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKGNvbnRyb2xsZXIuX3B1bGxBZ2Fpbikge1xuICAgICAgICAgICAgY29udHJvbGxlci5fcHVsbEFnYWluID0gZmFsc2U7XG4gICAgICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbiAgICAgICAgfVxuICAgIH0sIGUgPT4ge1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IoY29udHJvbGxlciwgZSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyU2hvdWxkQ2FsbFB1bGwoY29udHJvbGxlcikge1xuICAgIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZVN0cmVhbTtcbiAgICBpZiAoIVJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYW5DbG9zZU9yRW5xdWV1ZShjb250cm9sbGVyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghY29udHJvbGxlci5fc3RhcnRlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHN0cmVhbSkgJiYgUmVhZGFibGVTdHJlYW1HZXROdW1SZWFkUmVxdWVzdHMoc3RyZWFtKSA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGRlc2lyZWRTaXplID0gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldERlc2lyZWRTaXplKGNvbnRyb2xsZXIpO1xuICAgIGlmIChkZXNpcmVkU2l6ZSA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcikge1xuICAgIGNvbnRyb2xsZXIuX3B1bGxBbGdvcml0aG0gPSB1bmRlZmluZWQ7XG4gICAgY29udHJvbGxlci5fY2FuY2VsQWxnb3JpdGhtID0gdW5kZWZpbmVkO1xuICAgIGNvbnRyb2xsZXIuX3N0cmF0ZWd5U2l6ZUFsZ29yaXRobSA9IHVuZGVmaW5lZDtcbn1cbi8vIEEgY2xpZW50IG9mIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIgbWF5IHVzZSB0aGVzZSBmdW5jdGlvbnMgZGlyZWN0bHkgdG8gYnlwYXNzIHN0YXRlIGNoZWNrLlxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsb3NlKGNvbnRyb2xsZXIpIHtcbiAgICBpZiAoIVJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYW5DbG9zZU9yRW5xdWV1ZShjb250cm9sbGVyKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZVN0cmVhbTtcbiAgICBjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCA9IHRydWU7XG4gICAgaWYgKGNvbnRyb2xsZXIuX3F1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpO1xuICAgICAgICBSZWFkYWJsZVN0cmVhbUNsb3NlKHN0cmVhbSk7XG4gICAgfVxufVxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUoY29udHJvbGxlciwgY2h1bmspIHtcbiAgICBpZiAoIVJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYW5DbG9zZU9yRW5xdWV1ZShjb250cm9sbGVyKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZVN0cmVhbTtcbiAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbUxvY2tlZChzdHJlYW0pICYmIFJlYWRhYmxlU3RyZWFtR2V0TnVtUmVhZFJlcXVlc3RzKHN0cmVhbSkgPiAwKSB7XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRnVsZmlsbFJlYWRSZXF1ZXN0KHN0cmVhbSwgY2h1bmssIGZhbHNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxldCBjaHVua1NpemU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjaHVua1NpemUgPSBjb250cm9sbGVyLl9zdHJhdGVneVNpemVBbGdvcml0aG0oY2h1bmspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChjaHVua1NpemVFKSB7XG4gICAgICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IoY29udHJvbGxlciwgY2h1bmtTaXplRSk7XG4gICAgICAgICAgICB0aHJvdyBjaHVua1NpemVFO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBFbnF1ZXVlVmFsdWVXaXRoU2l6ZShjb250cm9sbGVyLCBjaHVuaywgY2h1bmtTaXplKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZW5xdWV1ZUUpIHtcbiAgICAgICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBlbnF1ZXVlRSk7XG4gICAgICAgICAgICB0aHJvdyBlbnF1ZXVlRTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2FsbFB1bGxJZk5lZWRlZChjb250cm9sbGVyKTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCBlKSB7XG4gICAgY29uc3Qgc3RyZWFtID0gY29udHJvbGxlci5fY29udHJvbGxlZFJlYWRhYmxlU3RyZWFtO1xuICAgIGlmIChzdHJlYW0uX3N0YXRlICE9PSAncmVhZGFibGUnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgUmVzZXRRdWV1ZShjb250cm9sbGVyKTtcbiAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpO1xuICAgIFJlYWRhYmxlU3RyZWFtRXJyb3Ioc3RyZWFtLCBlKTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJHZXREZXNpcmVkU2l6ZShjb250cm9sbGVyKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBjb250cm9sbGVyLl9jb250cm9sbGVkUmVhZGFibGVTdHJlYW0uX3N0YXRlO1xuICAgIGlmIChzdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gY29udHJvbGxlci5fc3RyYXRlZ3lIV00gLSBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZTtcbn1cbi8vIFRoaXMgaXMgdXNlZCBpbiB0aGUgaW1wbGVtZW50YXRpb24gb2YgVHJhbnNmb3JtU3RyZWFtLlxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckhhc0JhY2twcmVzc3VyZShjb250cm9sbGVyKSB7XG4gICAgaWYgKFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJTaG91bGRDYWxsUHVsbChjb250cm9sbGVyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbkNsb3NlT3JFbnF1ZXVlKGNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBzdGF0ZSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZVN0cmVhbS5fc3RhdGU7XG4gICAgaWYgKCFjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCAmJiBzdGF0ZSA9PT0gJ3JlYWRhYmxlJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gU2V0VXBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHN0cmVhbSwgY29udHJvbGxlciwgc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbEFsZ29yaXRobSwgaGlnaFdhdGVyTWFyaywgc2l6ZUFsZ29yaXRobSkge1xuICAgIGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRSZWFkYWJsZVN0cmVhbSA9IHN0cmVhbTtcbiAgICBjb250cm9sbGVyLl9xdWV1ZSA9IHVuZGVmaW5lZDtcbiAgICBjb250cm9sbGVyLl9xdWV1ZVRvdGFsU2l6ZSA9IHVuZGVmaW5lZDtcbiAgICBSZXNldFF1ZXVlKGNvbnRyb2xsZXIpO1xuICAgIGNvbnRyb2xsZXIuX3N0YXJ0ZWQgPSBmYWxzZTtcbiAgICBjb250cm9sbGVyLl9jbG9zZVJlcXVlc3RlZCA9IGZhbHNlO1xuICAgIGNvbnRyb2xsZXIuX3B1bGxBZ2FpbiA9IGZhbHNlO1xuICAgIGNvbnRyb2xsZXIuX3B1bGxpbmcgPSBmYWxzZTtcbiAgICBjb250cm9sbGVyLl9zdHJhdGVneVNpemVBbGdvcml0aG0gPSBzaXplQWxnb3JpdGhtO1xuICAgIGNvbnRyb2xsZXIuX3N0cmF0ZWd5SFdNID0gaGlnaFdhdGVyTWFyaztcbiAgICBjb250cm9sbGVyLl9wdWxsQWxnb3JpdGhtID0gcHVsbEFsZ29yaXRobTtcbiAgICBjb250cm9sbGVyLl9jYW5jZWxBbGdvcml0aG0gPSBjYW5jZWxBbGdvcml0aG07XG4gICAgc3RyZWFtLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgIGNvbnN0IHN0YXJ0UmVzdWx0ID0gc3RhcnRBbGdvcml0aG0oKTtcbiAgICB1cG9uUHJvbWlzZShwcm9taXNlUmVzb2x2ZWRXaXRoKHN0YXJ0UmVzdWx0KSwgKCkgPT4ge1xuICAgICAgICBjb250cm9sbGVyLl9zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNhbGxQdWxsSWZOZWVkZWQoY29udHJvbGxlcik7XG4gICAgfSwgciA9PiB7XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihjb250cm9sbGVyLCByKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIFNldFVwUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckZyb21VbmRlcmx5aW5nU291cmNlKHN0cmVhbSwgdW5kZXJseWluZ1NvdXJjZSwgaGlnaFdhdGVyTWFyaywgc2l6ZUFsZ29yaXRobSkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBPYmplY3QuY3JlYXRlKFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlKTtcbiAgICBsZXQgc3RhcnRBbGdvcml0aG0gPSAoKSA9PiB1bmRlZmluZWQ7XG4gICAgbGV0IHB1bGxBbGdvcml0aG0gPSAoKSA9PiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgbGV0IGNhbmNlbEFsZ29yaXRobSA9ICgpID0+IHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICBpZiAodW5kZXJseWluZ1NvdXJjZS5zdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0YXJ0QWxnb3JpdGhtID0gKCkgPT4gdW5kZXJseWluZ1NvdXJjZS5zdGFydChjb250cm9sbGVyKTtcbiAgICB9XG4gICAgaWYgKHVuZGVybHlpbmdTb3VyY2UucHVsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHB1bGxBbGdvcml0aG0gPSAoKSA9PiB1bmRlcmx5aW5nU291cmNlLnB1bGwoY29udHJvbGxlcik7XG4gICAgfVxuICAgIGlmICh1bmRlcmx5aW5nU291cmNlLmNhbmNlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNhbmNlbEFsZ29yaXRobSA9IHJlYXNvbiA9PiB1bmRlcmx5aW5nU291cmNlLmNhbmNlbChyZWFzb24pO1xuICAgIH1cbiAgICBTZXRVcFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIoc3RyZWFtLCBjb250cm9sbGVyLCBzdGFydEFsZ29yaXRobSwgcHVsbEFsZ29yaXRobSwgY2FuY2VsQWxnb3JpdGhtLCBoaWdoV2F0ZXJNYXJrLCBzaXplQWxnb3JpdGhtKTtcbn1cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLlxuZnVuY3Rpb24gZGVmYXVsdENvbnRyb2xsZXJCcmFuZENoZWNrRXhjZXB0aW9uJDEobmFtZSkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKGBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyYCk7XG59XG5cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtVGVlKHN0cmVhbSwgY2xvbmVGb3JCcmFuY2gyKSB7XG4gICAgaWYgKElzUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcihzdHJlYW0uX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcikpIHtcbiAgICAgICAgcmV0dXJuIFJlYWRhYmxlQnl0ZVN0cmVhbVRlZShzdHJlYW0pO1xuICAgIH1cbiAgICByZXR1cm4gUmVhZGFibGVTdHJlYW1EZWZhdWx0VGVlKHN0cmVhbSk7XG59XG5mdW5jdGlvbiBSZWFkYWJsZVN0cmVhbURlZmF1bHRUZWUoc3RyZWFtLCBjbG9uZUZvckJyYW5jaDIpIHtcbiAgICBjb25zdCByZWFkZXIgPSBBY3F1aXJlUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHN0cmVhbSk7XG4gICAgbGV0IHJlYWRpbmcgPSBmYWxzZTtcbiAgICBsZXQgcmVhZEFnYWluID0gZmFsc2U7XG4gICAgbGV0IGNhbmNlbGVkMSA9IGZhbHNlO1xuICAgIGxldCBjYW5jZWxlZDIgPSBmYWxzZTtcbiAgICBsZXQgcmVhc29uMTtcbiAgICBsZXQgcmVhc29uMjtcbiAgICBsZXQgYnJhbmNoMTtcbiAgICBsZXQgYnJhbmNoMjtcbiAgICBsZXQgcmVzb2x2ZUNhbmNlbFByb21pc2U7XG4gICAgY29uc3QgY2FuY2VsUHJvbWlzZSA9IG5ld1Byb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlID0gcmVzb2x2ZTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBwdWxsQWxnb3JpdGhtKCkge1xuICAgICAgICBpZiAocmVhZGluZykge1xuICAgICAgICAgICAgcmVhZEFnYWluID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVhZGluZyA9IHRydWU7XG4gICAgICAgIGNvbnN0IHJlYWRSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgX2NodW5rU3RlcHM6IGNodW5rID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGRlbGF5ZWQgYSBtaWNyb3Rhc2sgYmVjYXVzZSBpdCB0YWtlcyBhdCBsZWFzdCBhIG1pY3JvdGFzayB0byBkZXRlY3QgZXJyb3JzICh1c2luZ1xuICAgICAgICAgICAgICAgIC8vIHJlYWRlci5fY2xvc2VkUHJvbWlzZSBiZWxvdyksIGFuZCB3ZSB3YW50IGVycm9ycyBpbiBzdHJlYW0gdG8gZXJyb3IgYm90aCBicmFuY2hlcyBpbW1lZGlhdGVseS4gV2UgY2Fubm90IGxldFxuICAgICAgICAgICAgICAgIC8vIHN1Y2Nlc3NmdWwgc3luY2hyb25vdXNseS1hdmFpbGFibGUgcmVhZHMgZ2V0IGFoZWFkIG9mIGFzeW5jaHJvbm91c2x5LWF2YWlsYWJsZSBlcnJvcnMuXG4gICAgICAgICAgICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWFkQWdhaW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2h1bmsxID0gY2h1bms7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNodW5rMiA9IGNodW5rO1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGVyZSBpcyBubyB3YXkgdG8gYWNjZXNzIHRoZSBjbG9uaW5nIGNvZGUgcmlnaHQgbm93IGluIHRoZSByZWZlcmVuY2UgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGFkZCBvbmUgdGhlbiB3ZSdsbCBuZWVkIGFuIGltcGxlbWVudGF0aW9uIGZvciBzZXJpYWxpemFibGUgb2JqZWN0cy5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKCFjYW5jZWxlZDIgJiYgY2xvbmVGb3JCcmFuY2gyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgY2h1bmsyID0gU3RydWN0dXJlZERlc2VyaWFsaXplKFN0cnVjdHVyZWRTZXJpYWxpemUoY2h1bmsyKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxlZDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2h1bmsxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGVkMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjaHVuazIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlYWRBZ2Fpbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHVsbEFsZ29yaXRobSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2Nsb3NlU3RlcHM6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZWFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxlZDEpIHtcbiAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsb3NlKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghY2FuY2VsZWQyKSB7XG4gICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbG9zZShicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGVkMSB8fCAhY2FuY2VsZWQyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9lcnJvclN0ZXBzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJSZWFkKHJlYWRlciwgcmVhZFJlcXVlc3QpO1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYW5jZWwxQWxnb3JpdGhtKHJlYXNvbikge1xuICAgICAgICBjYW5jZWxlZDEgPSB0cnVlO1xuICAgICAgICByZWFzb24xID0gcmVhc29uO1xuICAgICAgICBpZiAoY2FuY2VsZWQyKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb3NpdGVSZWFzb24gPSBDcmVhdGVBcnJheUZyb21MaXN0KFtyZWFzb24xLCByZWFzb24yXSk7XG4gICAgICAgICAgICBjb25zdCBjYW5jZWxSZXN1bHQgPSBSZWFkYWJsZVN0cmVhbUNhbmNlbChzdHJlYW0sIGNvbXBvc2l0ZVJlYXNvbik7XG4gICAgICAgICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZShjYW5jZWxSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYW5jZWxQcm9taXNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYW5jZWwyQWxnb3JpdGhtKHJlYXNvbikge1xuICAgICAgICBjYW5jZWxlZDIgPSB0cnVlO1xuICAgICAgICByZWFzb24yID0gcmVhc29uO1xuICAgICAgICBpZiAoY2FuY2VsZWQxKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb3NpdGVSZWFzb24gPSBDcmVhdGVBcnJheUZyb21MaXN0KFtyZWFzb24xLCByZWFzb24yXSk7XG4gICAgICAgICAgICBjb25zdCBjYW5jZWxSZXN1bHQgPSBSZWFkYWJsZVN0cmVhbUNhbmNlbChzdHJlYW0sIGNvbXBvc2l0ZVJlYXNvbik7XG4gICAgICAgICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZShjYW5jZWxSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYW5jZWxQcm9taXNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdGFydEFsZ29yaXRobSgpIHtcbiAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgIH1cbiAgICBicmFuY2gxID0gQ3JlYXRlUmVhZGFibGVTdHJlYW0oc3RhcnRBbGdvcml0aG0sIHB1bGxBbGdvcml0aG0sIGNhbmNlbDFBbGdvcml0aG0pO1xuICAgIGJyYW5jaDIgPSBDcmVhdGVSZWFkYWJsZVN0cmVhbShzdGFydEFsZ29yaXRobSwgcHVsbEFsZ29yaXRobSwgY2FuY2VsMkFsZ29yaXRobSk7XG4gICAgdXBvblJlamVjdGlvbihyZWFkZXIuX2Nsb3NlZFByb21pc2UsIChyKSA9PiB7XG4gICAgICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihicmFuY2gxLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIHIpO1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCByKTtcbiAgICAgICAgaWYgKCFjYW5jZWxlZDEgfHwgIWNhbmNlbGVkMikge1xuICAgICAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBbYnJhbmNoMSwgYnJhbmNoMl07XG59XG5mdW5jdGlvbiBSZWFkYWJsZUJ5dGVTdHJlYW1UZWUoc3RyZWFtKSB7XG4gICAgbGV0IHJlYWRlciA9IEFjcXVpcmVSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIoc3RyZWFtKTtcbiAgICBsZXQgcmVhZGluZyA9IGZhbHNlO1xuICAgIGxldCByZWFkQWdhaW5Gb3JCcmFuY2gxID0gZmFsc2U7XG4gICAgbGV0IHJlYWRBZ2FpbkZvckJyYW5jaDIgPSBmYWxzZTtcbiAgICBsZXQgY2FuY2VsZWQxID0gZmFsc2U7XG4gICAgbGV0IGNhbmNlbGVkMiA9IGZhbHNlO1xuICAgIGxldCByZWFzb24xO1xuICAgIGxldCByZWFzb24yO1xuICAgIGxldCBicmFuY2gxO1xuICAgIGxldCBicmFuY2gyO1xuICAgIGxldCByZXNvbHZlQ2FuY2VsUHJvbWlzZTtcbiAgICBjb25zdCBjYW5jZWxQcm9taXNlID0gbmV3UHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UgPSByZXNvbHZlO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGZvcndhcmRSZWFkZXJFcnJvcih0aGlzUmVhZGVyKSB7XG4gICAgICAgIHVwb25SZWplY3Rpb24odGhpc1JlYWRlci5fY2xvc2VkUHJvbWlzZSwgciA9PiB7XG4gICAgICAgICAgICBpZiAodGhpc1JlYWRlciAhPT0gcmVhZGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgcik7XG4gICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCByKTtcbiAgICAgICAgICAgIGlmICghY2FuY2VsZWQxIHx8ICFjYW5jZWxlZDIpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcHVsbFdpdGhEZWZhdWx0UmVhZGVyKCkge1xuICAgICAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIocmVhZGVyKSkge1xuICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZShyZWFkZXIpO1xuICAgICAgICAgICAgcmVhZGVyID0gQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcihzdHJlYW0pO1xuICAgICAgICAgICAgZm9yd2FyZFJlYWRlckVycm9yKHJlYWRlcik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVhZFJlcXVlc3QgPSB7XG4gICAgICAgICAgICBfY2h1bmtTdGVwczogY2h1bmsgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgZGVsYXllZCBhIG1pY3JvdGFzayBiZWNhdXNlIGl0IHRha2VzIGF0IGxlYXN0IGEgbWljcm90YXNrIHRvIGRldGVjdCBlcnJvcnMgKHVzaW5nXG4gICAgICAgICAgICAgICAgLy8gcmVhZGVyLl9jbG9zZWRQcm9taXNlIGJlbG93KSwgYW5kIHdlIHdhbnQgZXJyb3JzIGluIHN0cmVhbSB0byBlcnJvciBib3RoIGJyYW5jaGVzIGltbWVkaWF0ZWx5LiBXZSBjYW5ub3QgbGV0XG4gICAgICAgICAgICAgICAgLy8gc3VjY2Vzc2Z1bCBzeW5jaHJvbm91c2x5LWF2YWlsYWJsZSByZWFkcyBnZXQgYWhlYWQgb2YgYXN5bmNocm9ub3VzbHktYXZhaWxhYmxlIGVycm9ycy5cbiAgICAgICAgICAgICAgICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRBZ2FpbkZvckJyYW5jaDEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZEFnYWluRm9yQnJhbmNoMiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaHVuazEgPSBjaHVuaztcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNodW5rMiA9IGNodW5rO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGVkMSAmJiAhY2FuY2VsZWQyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rMiA9IENsb25lQXNVaW50OEFycmF5KGNodW5rKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChjbG9uZUUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3IoYnJhbmNoMS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjbG9uZUUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFcnJvcihicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIGNsb25lRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UoUmVhZGFibGVTdHJlYW1DYW5jZWwoc3RyZWFtLCBjbG9uZUUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxlZDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2h1bmsxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGVkMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVucXVldWUoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLCBjaHVuazIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlYWRBZ2FpbkZvckJyYW5jaDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1bGwxQWxnb3JpdGhtKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVhZEFnYWluRm9yQnJhbmNoMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHVsbDJBbGdvcml0aG0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9jbG9zZVN0ZXBzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghY2FuY2VsZWQxKSB7XG4gICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJDbG9zZShicmFuY2gxLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGVkMikge1xuICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xvc2UoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlci5fcGVuZGluZ1B1bGxJbnRvcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kKGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIuX3BlbmRpbmdQdWxsSW50b3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZChicmFuY2gyLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGVkMSB8fCAhY2FuY2VsZWQyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9lcnJvclN0ZXBzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXJSZWFkKHJlYWRlciwgcmVhZFJlcXVlc3QpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwdWxsV2l0aEJZT0JSZWFkZXIodmlldywgZm9yQnJhbmNoMikge1xuICAgICAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbURlZmF1bHRSZWFkZXIocmVhZGVyKSkge1xuICAgICAgICAgICAgUmVhZGFibGVTdHJlYW1SZWFkZXJHZW5lcmljUmVsZWFzZShyZWFkZXIpO1xuICAgICAgICAgICAgcmVhZGVyID0gQWNxdWlyZVJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcihzdHJlYW0pO1xuICAgICAgICAgICAgZm9yd2FyZFJlYWRlckVycm9yKHJlYWRlcik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnlvYkJyYW5jaCA9IGZvckJyYW5jaDIgPyBicmFuY2gyIDogYnJhbmNoMTtcbiAgICAgICAgY29uc3Qgb3RoZXJCcmFuY2ggPSBmb3JCcmFuY2gyID8gYnJhbmNoMSA6IGJyYW5jaDI7XG4gICAgICAgIGNvbnN0IHJlYWRJbnRvUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIF9jaHVua1N0ZXBzOiBjaHVuayA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBkZWxheWVkIGEgbWljcm90YXNrIGJlY2F1c2UgaXQgdGFrZXMgYXQgbGVhc3QgYSBtaWNyb3Rhc2sgdG8gZGV0ZWN0IGVycm9ycyAodXNpbmdcbiAgICAgICAgICAgICAgICAvLyByZWFkZXIuX2Nsb3NlZFByb21pc2UgYmVsb3cpLCBhbmQgd2Ugd2FudCBlcnJvcnMgaW4gc3RyZWFtIHRvIGVycm9yIGJvdGggYnJhbmNoZXMgaW1tZWRpYXRlbHkuIFdlIGNhbm5vdCBsZXRcbiAgICAgICAgICAgICAgICAvLyBzdWNjZXNzZnVsIHN5bmNocm9ub3VzbHktYXZhaWxhYmxlIHJlYWRzIGdldCBhaGVhZCBvZiBhc3luY2hyb25vdXNseS1hdmFpbGFibGUgZXJyb3JzLlxuICAgICAgICAgICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZEFnYWluRm9yQnJhbmNoMSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZWFkQWdhaW5Gb3JCcmFuY2gyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ5b2JDYW5jZWxlZCA9IGZvckJyYW5jaDIgPyBjYW5jZWxlZDIgOiBjYW5jZWxlZDE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyQ2FuY2VsZWQgPSBmb3JCcmFuY2gyID8gY2FuY2VsZWQxIDogY2FuY2VsZWQyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW90aGVyQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9uZWRDaHVuaztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVkQ2h1bmsgPSBDbG9uZUFzVWludDhBcnJheShjaHVuayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoY2xvbmVFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckVycm9yKGJ5b2JCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2xvbmVFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRXJyb3Iob3RoZXJCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2xvbmVFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlQ2FuY2VsUHJvbWlzZShSZWFkYWJsZVN0cmVhbUNhbmNlbChzdHJlYW0sIGNsb25lRSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYnlvYkNhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlclJlc3BvbmRXaXRoTmV3VmlldyhieW9iQnJhbmNoLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIGNodW5rKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJFbnF1ZXVlKG90aGVyQnJhbmNoLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIGNsb25lZENodW5rKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghYnlvYkNhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZFdpdGhOZXdWaWV3KGJ5b2JCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2h1bmspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlYWRBZ2FpbkZvckJyYW5jaDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1bGwxQWxnb3JpdGhtKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVhZEFnYWluRm9yQnJhbmNoMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHVsbDJBbGdvcml0aG0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9jbG9zZVN0ZXBzOiBjaHVuayA9PiB7XG4gICAgICAgICAgICAgICAgcmVhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ5b2JDYW5jZWxlZCA9IGZvckJyYW5jaDIgPyBjYW5jZWxlZDIgOiBjYW5jZWxlZDE7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3RoZXJDYW5jZWxlZCA9IGZvckJyYW5jaDIgPyBjYW5jZWxlZDEgOiBjYW5jZWxlZDI7XG4gICAgICAgICAgICAgICAgaWYgKCFieW9iQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckNsb3NlKGJ5b2JCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghb3RoZXJDYW5jZWxlZCkge1xuICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyQ2xvc2Uob3RoZXJCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaHVuayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYnlvYkNhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyUmVzcG9uZFdpdGhOZXdWaWV3KGJ5b2JCcmFuY2guX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlciwgY2h1bmspO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghb3RoZXJDYW5jZWxlZCAmJiBvdGhlckJyYW5jaC5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyLl9wZW5kaW5nUHVsbEludG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWRhYmxlQnl0ZVN0cmVhbUNvbnRyb2xsZXJSZXNwb25kKG90aGVyQnJhbmNoLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghYnlvYkNhbmNlbGVkIHx8ICFvdGhlckNhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVDYW5jZWxQcm9taXNlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9lcnJvclN0ZXBzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXJSZWFkKHJlYWRlciwgdmlldywgcmVhZEludG9SZXF1ZXN0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcHVsbDFBbGdvcml0aG0oKSB7XG4gICAgICAgIGlmIChyZWFkaW5nKSB7XG4gICAgICAgICAgICByZWFkQWdhaW5Gb3JCcmFuY2gxID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVhZGluZyA9IHRydWU7XG4gICAgICAgIGNvbnN0IGJ5b2JSZXF1ZXN0ID0gUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlckdldEJZT0JSZXF1ZXN0KGJyYW5jaDEuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcik7XG4gICAgICAgIGlmIChieW9iUmVxdWVzdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcHVsbFdpdGhEZWZhdWx0UmVhZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwdWxsV2l0aEJZT0JSZWFkZXIoYnlvYlJlcXVlc3QuX3ZpZXcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmVkV2l0aCh1bmRlZmluZWQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwdWxsMkFsZ29yaXRobSgpIHtcbiAgICAgICAgaWYgKHJlYWRpbmcpIHtcbiAgICAgICAgICAgIHJlYWRBZ2FpbkZvckJyYW5jaDIgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICByZWFkaW5nID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgYnlvYlJlcXVlc3QgPSBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyR2V0QllPQlJlcXVlc3QoYnJhbmNoMi5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyKTtcbiAgICAgICAgaWYgKGJ5b2JSZXF1ZXN0ID09PSBudWxsKSB7XG4gICAgICAgICAgICBwdWxsV2l0aERlZmF1bHRSZWFkZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHB1bGxXaXRoQllPQlJlYWRlcihieW9iUmVxdWVzdC5fdmlldywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2FuY2VsMUFsZ29yaXRobShyZWFzb24pIHtcbiAgICAgICAgY2FuY2VsZWQxID0gdHJ1ZTtcbiAgICAgICAgcmVhc29uMSA9IHJlYXNvbjtcbiAgICAgICAgaWYgKGNhbmNlbGVkMikge1xuICAgICAgICAgICAgY29uc3QgY29tcG9zaXRlUmVhc29uID0gQ3JlYXRlQXJyYXlGcm9tTGlzdChbcmVhc29uMSwgcmVhc29uMl0pO1xuICAgICAgICAgICAgY29uc3QgY2FuY2VsUmVzdWx0ID0gUmVhZGFibGVTdHJlYW1DYW5jZWwoc3RyZWFtLCBjb21wb3NpdGVSZWFzb24pO1xuICAgICAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UoY2FuY2VsUmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FuY2VsUHJvbWlzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2FuY2VsMkFsZ29yaXRobShyZWFzb24pIHtcbiAgICAgICAgY2FuY2VsZWQyID0gdHJ1ZTtcbiAgICAgICAgcmVhc29uMiA9IHJlYXNvbjtcbiAgICAgICAgaWYgKGNhbmNlbGVkMSkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9zaXRlUmVhc29uID0gQ3JlYXRlQXJyYXlGcm9tTGlzdChbcmVhc29uMSwgcmVhc29uMl0pO1xuICAgICAgICAgICAgY29uc3QgY2FuY2VsUmVzdWx0ID0gUmVhZGFibGVTdHJlYW1DYW5jZWwoc3RyZWFtLCBjb21wb3NpdGVSZWFzb24pO1xuICAgICAgICAgICAgcmVzb2x2ZUNhbmNlbFByb21pc2UoY2FuY2VsUmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FuY2VsUHJvbWlzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3RhcnRBbGdvcml0aG0oKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYnJhbmNoMSA9IENyZWF0ZVJlYWRhYmxlQnl0ZVN0cmVhbShzdGFydEFsZ29yaXRobSwgcHVsbDFBbGdvcml0aG0sIGNhbmNlbDFBbGdvcml0aG0pO1xuICAgIGJyYW5jaDIgPSBDcmVhdGVSZWFkYWJsZUJ5dGVTdHJlYW0oc3RhcnRBbGdvcml0aG0sIHB1bGwyQWxnb3JpdGhtLCBjYW5jZWwyQWxnb3JpdGhtKTtcbiAgICBmb3J3YXJkUmVhZGVyRXJyb3IocmVhZGVyKTtcbiAgICByZXR1cm4gW2JyYW5jaDEsIGJyYW5jaDJdO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VW5kZXJseWluZ0RlZmF1bHRPckJ5dGVTb3VyY2Uoc291cmNlLCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0RGljdGlvbmFyeShzb3VyY2UsIGNvbnRleHQpO1xuICAgIGNvbnN0IG9yaWdpbmFsID0gc291cmNlO1xuICAgIGNvbnN0IGF1dG9BbGxvY2F0ZUNodW5rU2l6ZSA9IG9yaWdpbmFsID09PSBudWxsIHx8IG9yaWdpbmFsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcmlnaW5hbC5hdXRvQWxsb2NhdGVDaHVua1NpemU7XG4gICAgY29uc3QgY2FuY2VsID0gb3JpZ2luYWwgPT09IG51bGwgfHwgb3JpZ2luYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsLmNhbmNlbDtcbiAgICBjb25zdCBwdWxsID0gb3JpZ2luYWwgPT09IG51bGwgfHwgb3JpZ2luYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsLnB1bGw7XG4gICAgY29uc3Qgc3RhcnQgPSBvcmlnaW5hbCA9PT0gbnVsbCB8fCBvcmlnaW5hbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3JpZ2luYWwuc3RhcnQ7XG4gICAgY29uc3QgdHlwZSA9IG9yaWdpbmFsID09PSBudWxsIHx8IG9yaWdpbmFsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcmlnaW5hbC50eXBlO1xuICAgIHJldHVybiB7XG4gICAgICAgIGF1dG9BbGxvY2F0ZUNodW5rU2l6ZTogYXV0b0FsbG9jYXRlQ2h1bmtTaXplID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgIGNvbnZlcnRVbnNpZ25lZExvbmdMb25nV2l0aEVuZm9yY2VSYW5nZShhdXRvQWxsb2NhdGVDaHVua1NpemUsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ2F1dG9BbGxvY2F0ZUNodW5rU2l6ZScgdGhhdGApLFxuICAgICAgICBjYW5jZWw6IGNhbmNlbCA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgIHVuZGVmaW5lZCA6XG4gICAgICAgICAgICBjb252ZXJ0VW5kZXJseWluZ1NvdXJjZUNhbmNlbENhbGxiYWNrKGNhbmNlbCwgb3JpZ2luYWwsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ2NhbmNlbCcgdGhhdGApLFxuICAgICAgICBwdWxsOiBwdWxsID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgIGNvbnZlcnRVbmRlcmx5aW5nU291cmNlUHVsbENhbGxiYWNrKHB1bGwsIG9yaWdpbmFsLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdwdWxsJyB0aGF0YCksXG4gICAgICAgIHN0YXJ0OiBzdGFydCA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgIHVuZGVmaW5lZCA6XG4gICAgICAgICAgICBjb252ZXJ0VW5kZXJseWluZ1NvdXJjZVN0YXJ0Q2FsbGJhY2soc3RhcnQsIG9yaWdpbmFsLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdzdGFydCcgdGhhdGApLFxuICAgICAgICB0eXBlOiB0eXBlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBjb252ZXJ0UmVhZGFibGVTdHJlYW1UeXBlKHR5cGUsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3R5cGUnIHRoYXRgKVxuICAgIH07XG59XG5mdW5jdGlvbiBjb252ZXJ0VW5kZXJseWluZ1NvdXJjZUNhbmNlbENhbGxiYWNrKGZuLCBvcmlnaW5hbCwgY29udGV4dCkge1xuICAgIGFzc2VydEZ1bmN0aW9uKGZuLCBjb250ZXh0KTtcbiAgICByZXR1cm4gKHJlYXNvbikgPT4gcHJvbWlzZUNhbGwoZm4sIG9yaWdpbmFsLCBbcmVhc29uXSk7XG59XG5mdW5jdGlvbiBjb252ZXJ0VW5kZXJseWluZ1NvdXJjZVB1bGxDYWxsYmFjayhmbiwgb3JpZ2luYWwsIGNvbnRleHQpIHtcbiAgICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gICAgcmV0dXJuIChjb250cm9sbGVyKSA9PiBwcm9taXNlQ2FsbChmbiwgb3JpZ2luYWwsIFtjb250cm9sbGVyXSk7XG59XG5mdW5jdGlvbiBjb252ZXJ0VW5kZXJseWluZ1NvdXJjZVN0YXJ0Q2FsbGJhY2soZm4sIG9yaWdpbmFsLCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICAgIHJldHVybiAoY29udHJvbGxlcikgPT4gcmVmbGVjdENhbGwoZm4sIG9yaWdpbmFsLCBbY29udHJvbGxlcl0pO1xufVxuZnVuY3Rpb24gY29udmVydFJlYWRhYmxlU3RyZWFtVHlwZSh0eXBlLCBjb250ZXh0KSB7XG4gICAgdHlwZSA9IGAke3R5cGV9YDtcbiAgICBpZiAodHlwZSAhPT0gJ2J5dGVzJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9ICcke3R5cGV9JyBpcyBub3QgYSB2YWxpZCBlbnVtZXJhdGlvbiB2YWx1ZSBmb3IgUmVhZGFibGVTdHJlYW1UeXBlYCk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0UmVhZGVyT3B0aW9ucyhvcHRpb25zLCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0RGljdGlvbmFyeShvcHRpb25zLCBjb250ZXh0KTtcbiAgICBjb25zdCBtb2RlID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLm1vZGU7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbW9kZTogbW9kZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogY29udmVydFJlYWRhYmxlU3RyZWFtUmVhZGVyTW9kZShtb2RlLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdtb2RlJyB0aGF0YClcbiAgICB9O1xufVxuZnVuY3Rpb24gY29udmVydFJlYWRhYmxlU3RyZWFtUmVhZGVyTW9kZShtb2RlLCBjb250ZXh0KSB7XG4gICAgbW9kZSA9IGAke21vZGV9YDtcbiAgICBpZiAobW9kZSAhPT0gJ2J5b2InKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7Y29udGV4dH0gJyR7bW9kZX0nIGlzIG5vdCBhIHZhbGlkIGVudW1lcmF0aW9uIHZhbHVlIGZvciBSZWFkYWJsZVN0cmVhbVJlYWRlck1vZGVgKTtcbiAgICB9XG4gICAgcmV0dXJuIG1vZGU7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRJdGVyYXRvck9wdGlvbnMob3B0aW9ucywgY29udGV4dCkge1xuICAgIGFzc2VydERpY3Rpb25hcnkob3B0aW9ucywgY29udGV4dCk7XG4gICAgY29uc3QgcHJldmVudENhbmNlbCA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5wcmV2ZW50Q2FuY2VsO1xuICAgIHJldHVybiB7IHByZXZlbnRDYW5jZWw6IEJvb2xlYW4ocHJldmVudENhbmNlbCkgfTtcbn1cblxuZnVuY3Rpb24gY29udmVydFBpcGVPcHRpb25zKG9wdGlvbnMsIGNvbnRleHQpIHtcbiAgICBhc3NlcnREaWN0aW9uYXJ5KG9wdGlvbnMsIGNvbnRleHQpO1xuICAgIGNvbnN0IHByZXZlbnRBYm9ydCA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5wcmV2ZW50QWJvcnQ7XG4gICAgY29uc3QgcHJldmVudENhbmNlbCA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5wcmV2ZW50Q2FuY2VsO1xuICAgIGNvbnN0IHByZXZlbnRDbG9zZSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5wcmV2ZW50Q2xvc2U7XG4gICAgY29uc3Qgc2lnbmFsID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNpZ25hbDtcbiAgICBpZiAoc2lnbmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXNzZXJ0QWJvcnRTaWduYWwoc2lnbmFsLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdzaWduYWwnIHRoYXRgKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJldmVudEFib3J0OiBCb29sZWFuKHByZXZlbnRBYm9ydCksXG4gICAgICAgIHByZXZlbnRDYW5jZWw6IEJvb2xlYW4ocHJldmVudENhbmNlbCksXG4gICAgICAgIHByZXZlbnRDbG9zZTogQm9vbGVhbihwcmV2ZW50Q2xvc2UpLFxuICAgICAgICBzaWduYWxcbiAgICB9O1xufVxuZnVuY3Rpb24gYXNzZXJ0QWJvcnRTaWduYWwoc2lnbmFsLCBjb250ZXh0KSB7XG4gICAgaWYgKCFpc0Fib3J0U2lnbmFsKHNpZ25hbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHtjb250ZXh0fSBpcyBub3QgYW4gQWJvcnRTaWduYWwuYCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0UmVhZGFibGVXcml0YWJsZVBhaXIocGFpciwgY29udGV4dCkge1xuICAgIGFzc2VydERpY3Rpb25hcnkocGFpciwgY29udGV4dCk7XG4gICAgY29uc3QgcmVhZGFibGUgPSBwYWlyID09PSBudWxsIHx8IHBhaXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhaXIucmVhZGFibGU7XG4gICAgYXNzZXJ0UmVxdWlyZWRGaWVsZChyZWFkYWJsZSwgJ3JlYWRhYmxlJywgJ1JlYWRhYmxlV3JpdGFibGVQYWlyJyk7XG4gICAgYXNzZXJ0UmVhZGFibGVTdHJlYW0ocmVhZGFibGUsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3JlYWRhYmxlJyB0aGF0YCk7XG4gICAgY29uc3Qgd3JpdGFibGUgPSBwYWlyID09PSBudWxsIHx8IHBhaXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhaXIud3JpdGFibGU7XG4gICAgYXNzZXJ0UmVxdWlyZWRGaWVsZCh3cml0YWJsZSwgJ3dyaXRhYmxlJywgJ1JlYWRhYmxlV3JpdGFibGVQYWlyJyk7XG4gICAgYXNzZXJ0V3JpdGFibGVTdHJlYW0od3JpdGFibGUsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ3dyaXRhYmxlJyB0aGF0YCk7XG4gICAgcmV0dXJuIHsgcmVhZGFibGUsIHdyaXRhYmxlIH07XG59XG5cbi8qKlxuICogQSByZWFkYWJsZSBzdHJlYW0gcmVwcmVzZW50cyBhIHNvdXJjZSBvZiBkYXRhLCBmcm9tIHdoaWNoIHlvdSBjYW4gcmVhZC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmNsYXNzIFJlYWRhYmxlU3RyZWFtIHtcbiAgICBjb25zdHJ1Y3RvcihyYXdVbmRlcmx5aW5nU291cmNlID0ge30sIHJhd1N0cmF0ZWd5ID0ge30pIHtcbiAgICAgICAgaWYgKHJhd1VuZGVybHlpbmdTb3VyY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmF3VW5kZXJseWluZ1NvdXJjZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhc3NlcnRPYmplY3QocmF3VW5kZXJseWluZ1NvdXJjZSwgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0cmF0ZWd5ID0gY29udmVydFF1ZXVpbmdTdHJhdGVneShyYXdTdHJhdGVneSwgJ1NlY29uZCBwYXJhbWV0ZXInKTtcbiAgICAgICAgY29uc3QgdW5kZXJseWluZ1NvdXJjZSA9IGNvbnZlcnRVbmRlcmx5aW5nRGVmYXVsdE9yQnl0ZVNvdXJjZShyYXdVbmRlcmx5aW5nU291cmNlLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgICAgIEluaXRpYWxpemVSZWFkYWJsZVN0cmVhbSh0aGlzKTtcbiAgICAgICAgaWYgKHVuZGVybHlpbmdTb3VyY2UudHlwZSA9PT0gJ2J5dGVzJykge1xuICAgICAgICAgICAgaWYgKHN0cmF0ZWd5LnNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgc3RyYXRlZ3kgZm9yIGEgYnl0ZSBzdHJlYW0gY2Fubm90IGhhdmUgYSBzaXplIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBoaWdoV2F0ZXJNYXJrID0gRXh0cmFjdEhpZ2hXYXRlck1hcmsoc3RyYXRlZ3ksIDApO1xuICAgICAgICAgICAgU2V0VXBSZWFkYWJsZUJ5dGVTdHJlYW1Db250cm9sbGVyRnJvbVVuZGVybHlpbmdTb3VyY2UodGhpcywgdW5kZXJseWluZ1NvdXJjZSwgaGlnaFdhdGVyTWFyayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzaXplQWxnb3JpdGhtID0gRXh0cmFjdFNpemVBbGdvcml0aG0oc3RyYXRlZ3kpO1xuICAgICAgICAgICAgY29uc3QgaGlnaFdhdGVyTWFyayA9IEV4dHJhY3RIaWdoV2F0ZXJNYXJrKHN0cmF0ZWd5LCAxKTtcbiAgICAgICAgICAgIFNldFVwUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckZyb21VbmRlcmx5aW5nU291cmNlKHRoaXMsIHVuZGVybHlpbmdTb3VyY2UsIGhpZ2hXYXRlck1hcmssIHNpemVBbGdvcml0aG0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSByZWFkYWJsZSBzdHJlYW0gaXMgbG9ja2VkIHRvIGEge0BsaW5rIFJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlciB8IHJlYWRlcn0uXG4gICAgICovXG4gICAgZ2V0IGxvY2tlZCgpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uJDEoJ2xvY2tlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBJc1JlYWRhYmxlU3RyZWFtTG9ja2VkKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYW5jZWxzIHRoZSBzdHJlYW0sIHNpZ25hbGluZyBhIGxvc3Mgb2YgaW50ZXJlc3QgaW4gdGhlIHN0cmVhbSBieSBhIGNvbnN1bWVyLlxuICAgICAqXG4gICAgICogVGhlIHN1cHBsaWVkIGByZWFzb25gIGFyZ3VtZW50IHdpbGwgYmUgZ2l2ZW4gdG8gdGhlIHVuZGVybHlpbmcgc291cmNlJ3Mge0BsaW5rIFVuZGVybHlpbmdTb3VyY2UuY2FuY2VsIHwgY2FuY2VsKCl9XG4gICAgICogbWV0aG9kLCB3aGljaCBtaWdodCBvciBtaWdodCBub3QgdXNlIGl0LlxuICAgICAqL1xuICAgIGNhbmNlbChyZWFzb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uJDEoJ2NhbmNlbCcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbUxvY2tlZCh0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbmNlbCBhIHN0cmVhbSB0aGF0IGFscmVhZHkgaGFzIGEgcmVhZGVyJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSZWFkYWJsZVN0cmVhbUNhbmNlbCh0aGlzLCByZWFzb24pO1xuICAgIH1cbiAgICBnZXRSZWFkZXIocmF3T3B0aW9ucyA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIUlzUmVhZGFibGVTdHJlYW0odGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24kMSgnZ2V0UmVhZGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbnZlcnRSZWFkZXJPcHRpb25zKHJhd09wdGlvbnMsICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gQWNxdWlyZVJlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQWNxdWlyZVJlYWRhYmxlU3RyZWFtQllPQlJlYWRlcih0aGlzKTtcbiAgICB9XG4gICAgcGlwZVRocm91Z2gocmF3VHJhbnNmb3JtLCByYXdPcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKCFJc1JlYWRhYmxlU3RyZWFtKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBzdHJlYW1CcmFuZENoZWNrRXhjZXB0aW9uJDEoJ3BpcGVUaHJvdWdoJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXJ0UmVxdWlyZWRBcmd1bWVudChyYXdUcmFuc2Zvcm0sIDEsICdwaXBlVGhyb3VnaCcpO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBjb252ZXJ0UmVhZGFibGVXcml0YWJsZVBhaXIocmF3VHJhbnNmb3JtLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb252ZXJ0UGlwZU9wdGlvbnMocmF3T3B0aW9ucywgJ1NlY29uZCBwYXJhbWV0ZXInKTtcbiAgICAgICAgaWYgKElzUmVhZGFibGVTdHJlYW1Mb2NrZWQodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlYWRhYmxlU3RyZWFtLnByb3RvdHlwZS5waXBlVGhyb3VnaCBjYW5ub3QgYmUgdXNlZCBvbiBhIGxvY2tlZCBSZWFkYWJsZVN0cmVhbScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChJc1dyaXRhYmxlU3RyZWFtTG9ja2VkKHRyYW5zZm9ybS53cml0YWJsZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlYWRhYmxlU3RyZWFtLnByb3RvdHlwZS5waXBlVGhyb3VnaCBjYW5ub3QgYmUgdXNlZCBvbiBhIGxvY2tlZCBXcml0YWJsZVN0cmVhbScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBSZWFkYWJsZVN0cmVhbVBpcGVUbyh0aGlzLCB0cmFuc2Zvcm0ud3JpdGFibGUsIG9wdGlvbnMucHJldmVudENsb3NlLCBvcHRpb25zLnByZXZlbnRBYm9ydCwgb3B0aW9ucy5wcmV2ZW50Q2FuY2VsLCBvcHRpb25zLnNpZ25hbCk7XG4gICAgICAgIHNldFByb21pc2VJc0hhbmRsZWRUb1RydWUocHJvbWlzZSk7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm0ucmVhZGFibGU7XG4gICAgfVxuICAgIHBpcGVUbyhkZXN0aW5hdGlvbiwgcmF3T3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbiQxKCdwaXBlVG8nKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKGBQYXJhbWV0ZXIgMSBpcyByZXF1aXJlZCBpbiAncGlwZVRvJy5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUlzV3JpdGFibGVTdHJlYW0oZGVzdGluYXRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChuZXcgVHlwZUVycm9yKGBSZWFkYWJsZVN0cmVhbS5wcm90b3R5cGUucGlwZVRvJ3MgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIFdyaXRhYmxlU3RyZWFtYCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcHRpb25zO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IGNvbnZlcnRQaXBlT3B0aW9ucyhyYXdPcHRpb25zLCAnU2Vjb25kIHBhcmFtZXRlcicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVJlamVjdGVkV2l0aChlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXNSZWFkYWJsZVN0cmVhbUxvY2tlZCh0aGlzKSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgobmV3IFR5cGVFcnJvcignUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLnBpcGVUbyBjYW5ub3QgYmUgdXNlZCBvbiBhIGxvY2tlZCBSZWFkYWJsZVN0cmVhbScpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoSXNXcml0YWJsZVN0cmVhbUxvY2tlZChkZXN0aW5hdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKG5ldyBUeXBlRXJyb3IoJ1JlYWRhYmxlU3RyZWFtLnByb3RvdHlwZS5waXBlVG8gY2Fubm90IGJlIHVzZWQgb24gYSBsb2NrZWQgV3JpdGFibGVTdHJlYW0nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlYWRhYmxlU3RyZWFtUGlwZVRvKHRoaXMsIGRlc3RpbmF0aW9uLCBvcHRpb25zLnByZXZlbnRDbG9zZSwgb3B0aW9ucy5wcmV2ZW50QWJvcnQsIG9wdGlvbnMucHJldmVudENhbmNlbCwgb3B0aW9ucy5zaWduYWwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUZWVzIHRoaXMgcmVhZGFibGUgc3RyZWFtLCByZXR1cm5pbmcgYSB0d28tZWxlbWVudCBhcnJheSBjb250YWluaW5nIHRoZSB0d28gcmVzdWx0aW5nIGJyYW5jaGVzIGFzXG4gICAgICogbmV3IHtAbGluayBSZWFkYWJsZVN0cmVhbX0gaW5zdGFuY2VzLlxuICAgICAqXG4gICAgICogVGVlaW5nIGEgc3RyZWFtIHdpbGwgbG9jayBpdCwgcHJldmVudGluZyBhbnkgb3RoZXIgY29uc3VtZXIgZnJvbSBhY3F1aXJpbmcgYSByZWFkZXIuXG4gICAgICogVG8gY2FuY2VsIHRoZSBzdHJlYW0sIGNhbmNlbCBib3RoIG9mIHRoZSByZXN1bHRpbmcgYnJhbmNoZXM7IGEgY29tcG9zaXRlIGNhbmNlbGxhdGlvbiByZWFzb24gd2lsbCB0aGVuIGJlXG4gICAgICogcHJvcGFnYXRlZCB0byB0aGUgc3RyZWFtJ3MgdW5kZXJseWluZyBzb3VyY2UuXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgdGhlIGNodW5rcyBzZWVuIGluIGVhY2ggYnJhbmNoIHdpbGwgYmUgdGhlIHNhbWUgb2JqZWN0LiBJZiB0aGUgY2h1bmtzIGFyZSBub3QgaW1tdXRhYmxlLFxuICAgICAqIHRoaXMgY291bGQgYWxsb3cgaW50ZXJmZXJlbmNlIGJldHdlZW4gdGhlIHR3byBicmFuY2hlcy5cbiAgICAgKi9cbiAgICB0ZWUoKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbiQxKCd0ZWUnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBicmFuY2hlcyA9IFJlYWRhYmxlU3RyZWFtVGVlKHRoaXMpO1xuICAgICAgICByZXR1cm4gQ3JlYXRlQXJyYXlGcm9tTGlzdChicmFuY2hlcyk7XG4gICAgfVxuICAgIHZhbHVlcyhyYXdPcHRpb25zID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghSXNSZWFkYWJsZVN0cmVhbSh0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbiQxKCd2YWx1ZXMnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRpb25zID0gY29udmVydEl0ZXJhdG9yT3B0aW9ucyhyYXdPcHRpb25zLCAnRmlyc3QgcGFyYW1ldGVyJyk7XG4gICAgICAgIHJldHVybiBBY3F1aXJlUmVhZGFibGVTdHJlYW1Bc3luY0l0ZXJhdG9yKHRoaXMsIG9wdGlvbnMucHJldmVudENhbmNlbCk7XG4gICAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLCB7XG4gICAgY2FuY2VsOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBnZXRSZWFkZXI6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIHBpcGVUaHJvdWdoOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBwaXBlVG86IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIHRlZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgdmFsdWVzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcbiAgICBsb2NrZWQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcsIHtcbiAgICAgICAgdmFsdWU6ICdSZWFkYWJsZVN0cmVhbScsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xufVxuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC5hc3luY0l0ZXJhdG9yID09PSAnc3ltYm9sJykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFkYWJsZVN0cmVhbS5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLmFzeW5jSXRlcmF0b3IsIHtcbiAgICAgICAgdmFsdWU6IFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZS52YWx1ZXMsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbn1cbi8vIEFic3RyYWN0IG9wZXJhdGlvbnMgZm9yIHRoZSBSZWFkYWJsZVN0cmVhbS5cbi8vIFRocm93cyBpZiBhbmQgb25seSBpZiBzdGFydEFsZ29yaXRobSB0aHJvd3MuXG5mdW5jdGlvbiBDcmVhdGVSZWFkYWJsZVN0cmVhbShzdGFydEFsZ29yaXRobSwgcHVsbEFsZ29yaXRobSwgY2FuY2VsQWxnb3JpdGhtLCBoaWdoV2F0ZXJNYXJrID0gMSwgc2l6ZUFsZ29yaXRobSA9ICgpID0+IDEpIHtcbiAgICBjb25zdCBzdHJlYW0gPSBPYmplY3QuY3JlYXRlKFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZSk7XG4gICAgSW5pdGlhbGl6ZVJlYWRhYmxlU3RyZWFtKHN0cmVhbSk7XG4gICAgY29uc3QgY29udHJvbGxlciA9IE9iamVjdC5jcmVhdGUoUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlci5wcm90b3R5cGUpO1xuICAgIFNldFVwUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlcihzdHJlYW0sIGNvbnRyb2xsZXIsIHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWxBbGdvcml0aG0sIGhpZ2hXYXRlck1hcmssIHNpemVBbGdvcml0aG0pO1xuICAgIHJldHVybiBzdHJlYW07XG59XG4vLyBUaHJvd3MgaWYgYW5kIG9ubHkgaWYgc3RhcnRBbGdvcml0aG0gdGhyb3dzLlxuZnVuY3Rpb24gQ3JlYXRlUmVhZGFibGVCeXRlU3RyZWFtKHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWxBbGdvcml0aG0pIHtcbiAgICBjb25zdCBzdHJlYW0gPSBPYmplY3QuY3JlYXRlKFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZSk7XG4gICAgSW5pdGlhbGl6ZVJlYWRhYmxlU3RyZWFtKHN0cmVhbSk7XG4gICAgY29uc3QgY29udHJvbGxlciA9IE9iamVjdC5jcmVhdGUoUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlci5wcm90b3R5cGUpO1xuICAgIFNldFVwUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlcihzdHJlYW0sIGNvbnRyb2xsZXIsIHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWxBbGdvcml0aG0sIDAsIHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIHN0cmVhbTtcbn1cbmZ1bmN0aW9uIEluaXRpYWxpemVSZWFkYWJsZVN0cmVhbShzdHJlYW0pIHtcbiAgICBzdHJlYW0uX3N0YXRlID0gJ3JlYWRhYmxlJztcbiAgICBzdHJlYW0uX3JlYWRlciA9IHVuZGVmaW5lZDtcbiAgICBzdHJlYW0uX3N0b3JlZEVycm9yID0gdW5kZWZpbmVkO1xuICAgIHN0cmVhbS5fZGlzdHVyYmVkID0gZmFsc2U7XG59XG5mdW5jdGlvbiBJc1JlYWRhYmxlU3RyZWFtKHgpIHtcbiAgICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfcmVhZGFibGVTdHJlYW1Db250cm9sbGVyJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtO1xufVxuZnVuY3Rpb24gSXNSZWFkYWJsZVN0cmVhbUxvY2tlZChzdHJlYW0pIHtcbiAgICBpZiAoc3RyZWFtLl9yZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuLy8gUmVhZGFibGVTdHJlYW0gQVBJIGV4cG9zZWQgZm9yIGNvbnRyb2xsZXJzLlxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1DYW5jZWwoc3RyZWFtLCByZWFzb24pIHtcbiAgICBzdHJlYW0uX2Rpc3R1cmJlZCA9IHRydWU7XG4gICAgaWYgKHN0cmVhbS5fc3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIGlmIChzdHJlYW0uX3N0YXRlID09PSAnZXJyb3JlZCcpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZWplY3RlZFdpdGgoc3RyZWFtLl9zdG9yZWRFcnJvcik7XG4gICAgfVxuICAgIFJlYWRhYmxlU3RyZWFtQ2xvc2Uoc3RyZWFtKTtcbiAgICBjb25zdCByZWFkZXIgPSBzdHJlYW0uX3JlYWRlcjtcbiAgICBpZiAocmVhZGVyICE9PSB1bmRlZmluZWQgJiYgSXNSZWFkYWJsZVN0cmVhbUJZT0JSZWFkZXIocmVhZGVyKSkge1xuICAgICAgICByZWFkZXIuX3JlYWRJbnRvUmVxdWVzdHMuZm9yRWFjaChyZWFkSW50b1JlcXVlc3QgPT4ge1xuICAgICAgICAgICAgcmVhZEludG9SZXF1ZXN0Ll9jbG9zZVN0ZXBzKHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZWFkZXIuX3JlYWRJbnRvUmVxdWVzdHMgPSBuZXcgU2ltcGxlUXVldWUoKTtcbiAgICB9XG4gICAgY29uc3Qgc291cmNlQ2FuY2VsUHJvbWlzZSA9IHN0cmVhbS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyW0NhbmNlbFN0ZXBzXShyZWFzb24pO1xuICAgIHJldHVybiB0cmFuc2Zvcm1Qcm9taXNlV2l0aChzb3VyY2VDYW5jZWxQcm9taXNlLCBub29wKTtcbn1cbmZ1bmN0aW9uIFJlYWRhYmxlU3RyZWFtQ2xvc2Uoc3RyZWFtKSB7XG4gICAgc3RyZWFtLl9zdGF0ZSA9ICdjbG9zZWQnO1xuICAgIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5fcmVhZGVyO1xuICAgIGlmIChyZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVzb2x2ZShyZWFkZXIpO1xuICAgIGlmIChJc1JlYWRhYmxlU3RyZWFtRGVmYXVsdFJlYWRlcihyZWFkZXIpKSB7XG4gICAgICAgIHJlYWRlci5fcmVhZFJlcXVlc3RzLmZvckVhY2gocmVhZFJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgcmVhZFJlcXVlc3QuX2Nsb3NlU3RlcHMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlYWRlci5fcmVhZFJlcXVlc3RzID0gbmV3IFNpbXBsZVF1ZXVlKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gUmVhZGFibGVTdHJlYW1FcnJvcihzdHJlYW0sIGUpIHtcbiAgICBzdHJlYW0uX3N0YXRlID0gJ2Vycm9yZWQnO1xuICAgIHN0cmVhbS5fc3RvcmVkRXJyb3IgPSBlO1xuICAgIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5fcmVhZGVyO1xuICAgIGlmIChyZWFkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlZmF1bHRSZWFkZXJDbG9zZWRQcm9taXNlUmVqZWN0KHJlYWRlciwgZSk7XG4gICAgaWYgKElzUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyKHJlYWRlcikpIHtcbiAgICAgICAgcmVhZGVyLl9yZWFkUmVxdWVzdHMuZm9yRWFjaChyZWFkUmVxdWVzdCA9PiB7XG4gICAgICAgICAgICByZWFkUmVxdWVzdC5fZXJyb3JTdGVwcyhlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlYWRlci5fcmVhZFJlcXVlc3RzID0gbmV3IFNpbXBsZVF1ZXVlKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZWFkZXIuX3JlYWRJbnRvUmVxdWVzdHMuZm9yRWFjaChyZWFkSW50b1JlcXVlc3QgPT4ge1xuICAgICAgICAgICAgcmVhZEludG9SZXF1ZXN0Ll9lcnJvclN0ZXBzKGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVhZGVyLl9yZWFkSW50b1JlcXVlc3RzID0gbmV3IFNpbXBsZVF1ZXVlKCk7XG4gICAgfVxufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFJlYWRhYmxlU3RyZWFtLlxuZnVuY3Rpb24gc3RyZWFtQnJhbmRDaGVja0V4Y2VwdGlvbiQxKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFJlYWRhYmxlU3RyZWFtYCk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3lJbml0KGluaXQsIGNvbnRleHQpIHtcbiAgICBhc3NlcnREaWN0aW9uYXJ5KGluaXQsIGNvbnRleHQpO1xuICAgIGNvbnN0IGhpZ2hXYXRlck1hcmsgPSBpbml0ID09PSBudWxsIHx8IGluaXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGluaXQuaGlnaFdhdGVyTWFyaztcbiAgICBhc3NlcnRSZXF1aXJlZEZpZWxkKGhpZ2hXYXRlck1hcmssICdoaWdoV2F0ZXJNYXJrJywgJ1F1ZXVpbmdTdHJhdGVneUluaXQnKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBoaWdoV2F0ZXJNYXJrOiBjb252ZXJ0VW5yZXN0cmljdGVkRG91YmxlKGhpZ2hXYXRlck1hcmspXG4gICAgfTtcbn1cblxuLy8gVGhlIHNpemUgZnVuY3Rpb24gbXVzdCBub3QgaGF2ZSBhIHByb3RvdHlwZSBwcm9wZXJ0eSBub3IgYmUgYSBjb25zdHJ1Y3RvclxuY29uc3QgYnl0ZUxlbmd0aFNpemVGdW5jdGlvbiA9IChjaHVuaykgPT4ge1xuICAgIHJldHVybiBjaHVuay5ieXRlTGVuZ3RoO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShieXRlTGVuZ3RoU2l6ZUZ1bmN0aW9uLCAnbmFtZScsIHtcbiAgICB2YWx1ZTogJ3NpemUnLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG4vKipcbiAqIEEgcXVldWluZyBzdHJhdGVneSB0aGF0IGNvdW50cyB0aGUgbnVtYmVyIG9mIGJ5dGVzIGluIGVhY2ggY2h1bmsuXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIGFzc2VydFJlcXVpcmVkQXJndW1lbnQob3B0aW9ucywgMSwgJ0J5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3knKTtcbiAgICAgICAgb3B0aW9ucyA9IGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3lJbml0KG9wdGlvbnMsICdGaXJzdCBwYXJhbWV0ZXInKTtcbiAgICAgICAgdGhpcy5fYnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneUhpZ2hXYXRlck1hcmsgPSBvcHRpb25zLmhpZ2hXYXRlck1hcms7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGhpZ2ggd2F0ZXIgbWFyayBwcm92aWRlZCB0byB0aGUgY29uc3RydWN0b3IuXG4gICAgICovXG4gICAgZ2V0IGhpZ2hXYXRlck1hcmsoKSB7XG4gICAgICAgIGlmICghSXNCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5KHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBieXRlTGVuZ3RoQnJhbmRDaGVja0V4Y2VwdGlvbignaGlnaFdhdGVyTWFyaycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9ieXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5SGlnaFdhdGVyTWFyaztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVhc3VyZXMgdGhlIHNpemUgb2YgYGNodW5rYCBieSByZXR1cm5pbmcgdGhlIHZhbHVlIG9mIGl0cyBgYnl0ZUxlbmd0aGAgcHJvcGVydHkuXG4gICAgICovXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIGlmICghSXNCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5KHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBieXRlTGVuZ3RoQnJhbmRDaGVja0V4Y2VwdGlvbignc2l6ZScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBieXRlTGVuZ3RoU2l6ZUZ1bmN0aW9uO1xuICAgIH1cbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEJ5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3kucHJvdG90eXBlLCB7XG4gICAgaGlnaFdhdGVyTWFyazogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgc2l6ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuaWYgKHR5cGVvZiBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneS5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnLCB7XG4gICAgICAgIHZhbHVlOiAnQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneScsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIEJ5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3kuXG5mdW5jdGlvbiBieXRlTGVuZ3RoQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYEJ5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3kucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIEJ5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3lgKTtcbn1cbmZ1bmN0aW9uIElzQnl0ZUxlbmd0aFF1ZXVpbmdTdHJhdGVneSh4KSB7XG4gICAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX2J5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3lIaWdoV2F0ZXJNYXJrJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIEJ5dGVMZW5ndGhRdWV1aW5nU3RyYXRlZ3k7XG59XG5cbi8vIFRoZSBzaXplIGZ1bmN0aW9uIG11c3Qgbm90IGhhdmUgYSBwcm90b3R5cGUgcHJvcGVydHkgbm9yIGJlIGEgY29uc3RydWN0b3JcbmNvbnN0IGNvdW50U2l6ZUZ1bmN0aW9uID0gKCkgPT4ge1xuICAgIHJldHVybiAxO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb3VudFNpemVGdW5jdGlvbiwgJ25hbWUnLCB7XG4gICAgdmFsdWU6ICdzaXplJyxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbn0pO1xuLyoqXG4gKiBBIHF1ZXVpbmcgc3RyYXRlZ3kgdGhhdCBjb3VudHMgdGhlIG51bWJlciBvZiBjaHVua3MuXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBDb3VudFF1ZXVpbmdTdHJhdGVneSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBhc3NlcnRSZXF1aXJlZEFyZ3VtZW50KG9wdGlvbnMsIDEsICdDb3VudFF1ZXVpbmdTdHJhdGVneScpO1xuICAgICAgICBvcHRpb25zID0gY29udmVydFF1ZXVpbmdTdHJhdGVneUluaXQob3B0aW9ucywgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgICAgICB0aGlzLl9jb3VudFF1ZXVpbmdTdHJhdGVneUhpZ2hXYXRlck1hcmsgPSBvcHRpb25zLmhpZ2hXYXRlck1hcms7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGhpZ2ggd2F0ZXIgbWFyayBwcm92aWRlZCB0byB0aGUgY29uc3RydWN0b3IuXG4gICAgICovXG4gICAgZ2V0IGhpZ2hXYXRlck1hcmsoKSB7XG4gICAgICAgIGlmICghSXNDb3VudFF1ZXVpbmdTdHJhdGVneSh0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgY291bnRCcmFuZENoZWNrRXhjZXB0aW9uKCdoaWdoV2F0ZXJNYXJrJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50UXVldWluZ1N0cmF0ZWd5SGlnaFdhdGVyTWFyaztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVhc3VyZXMgdGhlIHNpemUgb2YgYGNodW5rYCBieSBhbHdheXMgcmV0dXJuaW5nIDEuXG4gICAgICogVGhpcyBlbnN1cmVzIHRoYXQgdGhlIHRvdGFsIHF1ZXVlIHNpemUgaXMgYSBjb3VudCBvZiB0aGUgbnVtYmVyIG9mIGNodW5rcyBpbiB0aGUgcXVldWUuXG4gICAgICovXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIGlmICghSXNDb3VudFF1ZXVpbmdTdHJhdGVneSh0aGlzKSkge1xuICAgICAgICAgICAgdGhyb3cgY291bnRCcmFuZENoZWNrRXhjZXB0aW9uKCdzaXplJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvdW50U2l6ZUZ1bmN0aW9uO1xuICAgIH1cbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKENvdW50UXVldWluZ1N0cmF0ZWd5LnByb3RvdHlwZSwge1xuICAgIGhpZ2hXYXRlck1hcms6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIHNpemU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvdW50UXVldWluZ1N0cmF0ZWd5LnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcsIHtcbiAgICAgICAgdmFsdWU6ICdDb3VudFF1ZXVpbmdTdHJhdGVneScsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIENvdW50UXVldWluZ1N0cmF0ZWd5LlxuZnVuY3Rpb24gY291bnRCcmFuZENoZWNrRXhjZXB0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFR5cGVFcnJvcihgQ291bnRRdWV1aW5nU3RyYXRlZ3kucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIENvdW50UXVldWluZ1N0cmF0ZWd5YCk7XG59XG5mdW5jdGlvbiBJc0NvdW50UXVldWluZ1N0cmF0ZWd5KHgpIHtcbiAgICBpZiAoIXR5cGVJc09iamVjdCh4KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdfY291bnRRdWV1aW5nU3RyYXRlZ3lIaWdoV2F0ZXJNYXJrJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4geCBpbnN0YW5jZW9mIENvdW50UXVldWluZ1N0cmF0ZWd5O1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VHJhbnNmb3JtZXIob3JpZ2luYWwsIGNvbnRleHQpIHtcbiAgICBhc3NlcnREaWN0aW9uYXJ5KG9yaWdpbmFsLCBjb250ZXh0KTtcbiAgICBjb25zdCBmbHVzaCA9IG9yaWdpbmFsID09PSBudWxsIHx8IG9yaWdpbmFsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcmlnaW5hbC5mbHVzaDtcbiAgICBjb25zdCByZWFkYWJsZVR5cGUgPSBvcmlnaW5hbCA9PT0gbnVsbCB8fCBvcmlnaW5hbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3JpZ2luYWwucmVhZGFibGVUeXBlO1xuICAgIGNvbnN0IHN0YXJ0ID0gb3JpZ2luYWwgPT09IG51bGwgfHwgb3JpZ2luYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsLnN0YXJ0O1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IG9yaWdpbmFsID09PSBudWxsIHx8IG9yaWdpbmFsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcmlnaW5hbC50cmFuc2Zvcm07XG4gICAgY29uc3Qgd3JpdGFibGVUeXBlID0gb3JpZ2luYWwgPT09IG51bGwgfHwgb3JpZ2luYWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsLndyaXRhYmxlVHlwZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBmbHVzaDogZmx1c2ggPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICB1bmRlZmluZWQgOlxuICAgICAgICAgICAgY29udmVydFRyYW5zZm9ybWVyRmx1c2hDYWxsYmFjayhmbHVzaCwgb3JpZ2luYWwsIGAke2NvbnRleHR9IGhhcyBtZW1iZXIgJ2ZsdXNoJyB0aGF0YCksXG4gICAgICAgIHJlYWRhYmxlVHlwZSxcbiAgICAgICAgc3RhcnQ6IHN0YXJ0ID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgdW5kZWZpbmVkIDpcbiAgICAgICAgICAgIGNvbnZlcnRUcmFuc2Zvcm1lclN0YXJ0Q2FsbGJhY2soc3RhcnQsIG9yaWdpbmFsLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICdzdGFydCcgdGhhdGApLFxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgIHVuZGVmaW5lZCA6XG4gICAgICAgICAgICBjb252ZXJ0VHJhbnNmb3JtZXJUcmFuc2Zvcm1DYWxsYmFjayh0cmFuc2Zvcm0sIG9yaWdpbmFsLCBgJHtjb250ZXh0fSBoYXMgbWVtYmVyICd0cmFuc2Zvcm0nIHRoYXRgKSxcbiAgICAgICAgd3JpdGFibGVUeXBlXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRUcmFuc2Zvcm1lckZsdXNoQ2FsbGJhY2soZm4sIG9yaWdpbmFsLCBjb250ZXh0KSB7XG4gICAgYXNzZXJ0RnVuY3Rpb24oZm4sIGNvbnRleHQpO1xuICAgIHJldHVybiAoY29udHJvbGxlcikgPT4gcHJvbWlzZUNhbGwoZm4sIG9yaWdpbmFsLCBbY29udHJvbGxlcl0pO1xufVxuZnVuY3Rpb24gY29udmVydFRyYW5zZm9ybWVyU3RhcnRDYWxsYmFjayhmbiwgb3JpZ2luYWwsIGNvbnRleHQpIHtcbiAgICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gICAgcmV0dXJuIChjb250cm9sbGVyKSA9PiByZWZsZWN0Q2FsbChmbiwgb3JpZ2luYWwsIFtjb250cm9sbGVyXSk7XG59XG5mdW5jdGlvbiBjb252ZXJ0VHJhbnNmb3JtZXJUcmFuc2Zvcm1DYWxsYmFjayhmbiwgb3JpZ2luYWwsIGNvbnRleHQpIHtcbiAgICBhc3NlcnRGdW5jdGlvbihmbiwgY29udGV4dCk7XG4gICAgcmV0dXJuIChjaHVuaywgY29udHJvbGxlcikgPT4gcHJvbWlzZUNhbGwoZm4sIG9yaWdpbmFsLCBbY2h1bmssIGNvbnRyb2xsZXJdKTtcbn1cblxuLy8gQ2xhc3MgVHJhbnNmb3JtU3RyZWFtXG4vKipcbiAqIEEgdHJhbnNmb3JtIHN0cmVhbSBjb25zaXN0cyBvZiBhIHBhaXIgb2Ygc3RyZWFtczogYSB7QGxpbmsgV3JpdGFibGVTdHJlYW0gfCB3cml0YWJsZSBzdHJlYW19LFxuICoga25vd24gYXMgaXRzIHdyaXRhYmxlIHNpZGUsIGFuZCBhIHtAbGluayBSZWFkYWJsZVN0cmVhbSB8IHJlYWRhYmxlIHN0cmVhbX0sIGtub3duIGFzIGl0cyByZWFkYWJsZSBzaWRlLlxuICogSW4gYSBtYW5uZXIgc3BlY2lmaWMgdG8gdGhlIHRyYW5zZm9ybSBzdHJlYW0gaW4gcXVlc3Rpb24sIHdyaXRlcyB0byB0aGUgd3JpdGFibGUgc2lkZSByZXN1bHQgaW4gbmV3IGRhdGEgYmVpbmdcbiAqIG1hZGUgYXZhaWxhYmxlIGZvciByZWFkaW5nIGZyb20gdGhlIHJlYWRhYmxlIHNpZGUuXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBUcmFuc2Zvcm1TdHJlYW0ge1xuICAgIGNvbnN0cnVjdG9yKHJhd1RyYW5zZm9ybWVyID0ge30sIHJhd1dyaXRhYmxlU3RyYXRlZ3kgPSB7fSwgcmF3UmVhZGFibGVTdHJhdGVneSA9IHt9KSB7XG4gICAgICAgIGlmIChyYXdUcmFuc2Zvcm1lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByYXdUcmFuc2Zvcm1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgd3JpdGFibGVTdHJhdGVneSA9IGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3kocmF3V3JpdGFibGVTdHJhdGVneSwgJ1NlY29uZCBwYXJhbWV0ZXInKTtcbiAgICAgICAgY29uc3QgcmVhZGFibGVTdHJhdGVneSA9IGNvbnZlcnRRdWV1aW5nU3RyYXRlZ3kocmF3UmVhZGFibGVTdHJhdGVneSwgJ1RoaXJkIHBhcmFtZXRlcicpO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lciA9IGNvbnZlcnRUcmFuc2Zvcm1lcihyYXdUcmFuc2Zvcm1lciwgJ0ZpcnN0IHBhcmFtZXRlcicpO1xuICAgICAgICBpZiAodHJhbnNmb3JtZXIucmVhZGFibGVUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHJlYWRhYmxlVHlwZSBzcGVjaWZpZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNmb3JtZXIud3JpdGFibGVUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHdyaXRhYmxlVHlwZSBzcGVjaWZpZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZWFkYWJsZUhpZ2hXYXRlck1hcmsgPSBFeHRyYWN0SGlnaFdhdGVyTWFyayhyZWFkYWJsZVN0cmF0ZWd5LCAwKTtcbiAgICAgICAgY29uc3QgcmVhZGFibGVTaXplQWxnb3JpdGhtID0gRXh0cmFjdFNpemVBbGdvcml0aG0ocmVhZGFibGVTdHJhdGVneSk7XG4gICAgICAgIGNvbnN0IHdyaXRhYmxlSGlnaFdhdGVyTWFyayA9IEV4dHJhY3RIaWdoV2F0ZXJNYXJrKHdyaXRhYmxlU3RyYXRlZ3ksIDEpO1xuICAgICAgICBjb25zdCB3cml0YWJsZVNpemVBbGdvcml0aG0gPSBFeHRyYWN0U2l6ZUFsZ29yaXRobSh3cml0YWJsZVN0cmF0ZWd5KTtcbiAgICAgICAgbGV0IHN0YXJ0UHJvbWlzZV9yZXNvbHZlO1xuICAgICAgICBjb25zdCBzdGFydFByb21pc2UgPSBuZXdQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgc3RhcnRQcm9taXNlX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICAgICAgSW5pdGlhbGl6ZVRyYW5zZm9ybVN0cmVhbSh0aGlzLCBzdGFydFByb21pc2UsIHdyaXRhYmxlSGlnaFdhdGVyTWFyaywgd3JpdGFibGVTaXplQWxnb3JpdGhtLCByZWFkYWJsZUhpZ2hXYXRlck1hcmssIHJlYWRhYmxlU2l6ZUFsZ29yaXRobSk7XG4gICAgICAgIFNldFVwVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJGcm9tVHJhbnNmb3JtZXIodGhpcywgdHJhbnNmb3JtZXIpO1xuICAgICAgICBpZiAodHJhbnNmb3JtZXIuc3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3RhcnRQcm9taXNlX3Jlc29sdmUodHJhbnNmb3JtZXIuc3RhcnQodGhpcy5fdHJhbnNmb3JtU3RyZWFtQ29udHJvbGxlcikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RhcnRQcm9taXNlX3Jlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcmVhZGFibGUgc2lkZSBvZiB0aGUgdHJhbnNmb3JtIHN0cmVhbS5cbiAgICAgKi9cbiAgICBnZXQgcmVhZGFibGUoKSB7XG4gICAgICAgIGlmICghSXNUcmFuc2Zvcm1TdHJlYW0odGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24oJ3JlYWRhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRhYmxlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgd3JpdGFibGUgc2lkZSBvZiB0aGUgdHJhbnNmb3JtIHN0cmVhbS5cbiAgICAgKi9cbiAgICBnZXQgd3JpdGFibGUoKSB7XG4gICAgICAgIGlmICghSXNUcmFuc2Zvcm1TdHJlYW0odGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24oJ3dyaXRhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyaXRhYmxlO1xuICAgIH1cbn1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFRyYW5zZm9ybVN0cmVhbS5wcm90b3R5cGUsIHtcbiAgICByZWFkYWJsZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgd3JpdGFibGU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRyYW5zZm9ybVN0cmVhbS5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnLCB7XG4gICAgICAgIHZhbHVlOiAnVHJhbnNmb3JtU3RyZWFtJyxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG59XG5mdW5jdGlvbiBJbml0aWFsaXplVHJhbnNmb3JtU3RyZWFtKHN0cmVhbSwgc3RhcnRQcm9taXNlLCB3cml0YWJsZUhpZ2hXYXRlck1hcmssIHdyaXRhYmxlU2l6ZUFsZ29yaXRobSwgcmVhZGFibGVIaWdoV2F0ZXJNYXJrLCByZWFkYWJsZVNpemVBbGdvcml0aG0pIHtcbiAgICBmdW5jdGlvbiBzdGFydEFsZ29yaXRobSgpIHtcbiAgICAgICAgcmV0dXJuIHN0YXJ0UHJvbWlzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gd3JpdGVBbGdvcml0aG0oY2h1bmspIHtcbiAgICAgICAgcmV0dXJuIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTaW5rV3JpdGVBbGdvcml0aG0oc3RyZWFtLCBjaHVuayk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFib3J0QWxnb3JpdGhtKHJlYXNvbikge1xuICAgICAgICByZXR1cm4gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNpbmtBYm9ydEFsZ29yaXRobShzdHJlYW0sIHJlYXNvbik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNsb3NlQWxnb3JpdGhtKCkge1xuICAgICAgICByZXR1cm4gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNpbmtDbG9zZUFsZ29yaXRobShzdHJlYW0pO1xuICAgIH1cbiAgICBzdHJlYW0uX3dyaXRhYmxlID0gQ3JlYXRlV3JpdGFibGVTdHJlYW0oc3RhcnRBbGdvcml0aG0sIHdyaXRlQWxnb3JpdGhtLCBjbG9zZUFsZ29yaXRobSwgYWJvcnRBbGdvcml0aG0sIHdyaXRhYmxlSGlnaFdhdGVyTWFyaywgd3JpdGFibGVTaXplQWxnb3JpdGhtKTtcbiAgICBmdW5jdGlvbiBwdWxsQWxnb3JpdGhtKCkge1xuICAgICAgICByZXR1cm4gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNvdXJjZVB1bGxBbGdvcml0aG0oc3RyZWFtKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2FuY2VsQWxnb3JpdGhtKHJlYXNvbikge1xuICAgICAgICBUcmFuc2Zvcm1TdHJlYW1FcnJvcldyaXRhYmxlQW5kVW5ibG9ja1dyaXRlKHN0cmVhbSwgcmVhc29uKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbiAgICB9XG4gICAgc3RyZWFtLl9yZWFkYWJsZSA9IENyZWF0ZVJlYWRhYmxlU3RyZWFtKHN0YXJ0QWxnb3JpdGhtLCBwdWxsQWxnb3JpdGhtLCBjYW5jZWxBbGdvcml0aG0sIHJlYWRhYmxlSGlnaFdhdGVyTWFyaywgcmVhZGFibGVTaXplQWxnb3JpdGhtKTtcbiAgICAvLyBUaGUgW1tiYWNrcHJlc3N1cmVdXSBzbG90IGlzIHNldCB0byB1bmRlZmluZWQgc28gdGhhdCBpdCBjYW4gYmUgaW5pdGlhbGlzZWQgYnkgVHJhbnNmb3JtU3RyZWFtU2V0QmFja3ByZXNzdXJlLlxuICAgIHN0cmVhbS5fYmFja3ByZXNzdXJlID0gdW5kZWZpbmVkO1xuICAgIHN0cmVhbS5fYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICBzdHJlYW0uX2JhY2twcmVzc3VyZUNoYW5nZVByb21pc2VfcmVzb2x2ZSA9IHVuZGVmaW5lZDtcbiAgICBUcmFuc2Zvcm1TdHJlYW1TZXRCYWNrcHJlc3N1cmUoc3RyZWFtLCB0cnVlKTtcbiAgICBzdHJlYW0uX3RyYW5zZm9ybVN0cmVhbUNvbnRyb2xsZXIgPSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBJc1RyYW5zZm9ybVN0cmVhbSh4KSB7XG4gICAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX3RyYW5zZm9ybVN0cmVhbUNvbnRyb2xsZXInKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4IGluc3RhbmNlb2YgVHJhbnNmb3JtU3RyZWFtO1xufVxuLy8gVGhpcyBpcyBhIG5vLW9wIGlmIGJvdGggc2lkZXMgYXJlIGFscmVhZHkgZXJyb3JlZC5cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbUVycm9yKHN0cmVhbSwgZSkge1xuICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFcnJvcihzdHJlYW0uX3JlYWRhYmxlLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIsIGUpO1xuICAgIFRyYW5zZm9ybVN0cmVhbUVycm9yV3JpdGFibGVBbmRVbmJsb2NrV3JpdGUoc3RyZWFtLCBlKTtcbn1cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbUVycm9yV3JpdGFibGVBbmRVbmJsb2NrV3JpdGUoc3RyZWFtLCBlKSB7XG4gICAgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoc3RyZWFtLl90cmFuc2Zvcm1TdHJlYW1Db250cm9sbGVyKTtcbiAgICBXcml0YWJsZVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3JJZk5lZWRlZChzdHJlYW0uX3dyaXRhYmxlLl93cml0YWJsZVN0cmVhbUNvbnRyb2xsZXIsIGUpO1xuICAgIGlmIChzdHJlYW0uX2JhY2twcmVzc3VyZSkge1xuICAgICAgICAvLyBQcmV0ZW5kIHRoYXQgcHVsbCgpIHdhcyBjYWxsZWQgdG8gcGVybWl0IGFueSBwZW5kaW5nIHdyaXRlKCkgY2FsbHMgdG8gY29tcGxldGUuIFRyYW5zZm9ybVN0cmVhbVNldEJhY2twcmVzc3VyZSgpXG4gICAgICAgIC8vIGNhbm5vdCBiZSBjYWxsZWQgZnJvbSBlbnF1ZXVlKCkgb3IgcHVsbCgpIG9uY2UgdGhlIFJlYWRhYmxlU3RyZWFtIGlzIGVycm9yZWQsIHNvIHRoaXMgd2lsbCB3aWxsIGJlIHRoZSBmaW5hbCB0aW1lXG4gICAgICAgIC8vIF9iYWNrcHJlc3N1cmUgaXMgc2V0LlxuICAgICAgICBUcmFuc2Zvcm1TdHJlYW1TZXRCYWNrcHJlc3N1cmUoc3RyZWFtLCBmYWxzZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtU2V0QmFja3ByZXNzdXJlKHN0cmVhbSwgYmFja3ByZXNzdXJlKSB7XG4gICAgLy8gUGFzc2VzIGFsc28gd2hlbiBjYWxsZWQgZHVyaW5nIGNvbnN0cnVjdGlvbi5cbiAgICBpZiAoc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlX3Jlc29sdmUoKTtcbiAgICB9XG4gICAgc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlID0gbmV3UHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgc3RyZWFtLl9iYWNrcHJlc3N1cmVDaGFuZ2VQcm9taXNlX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgIH0pO1xuICAgIHN0cmVhbS5fYmFja3ByZXNzdXJlID0gYmFja3ByZXNzdXJlO1xufVxuLy8gQ2xhc3MgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJcbi8qKlxuICogQWxsb3dzIGNvbnRyb2wgb2YgdGhlIHtAbGluayBSZWFkYWJsZVN0cmVhbX0gYW5kIHtAbGluayBXcml0YWJsZVN0cmVhbX0gb2YgdGhlIGFzc29jaWF0ZWQge0BsaW5rIFRyYW5zZm9ybVN0cmVhbX0uXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lsbGVnYWwgY29uc3RydWN0b3InKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVzaXJlZCBzaXplIHRvIGZpbGwgdGhlIHJlYWRhYmxlIHNpZGXigJlzIGludGVybmFsIHF1ZXVlLiBJdCBjYW4gYmUgbmVnYXRpdmUsIGlmIHRoZSBxdWV1ZSBpcyBvdmVyLWZ1bGwuXG4gICAgICovXG4gICAgZ2V0IGRlc2lyZWRTaXplKCkge1xuICAgICAgICBpZiAoIUlzVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignZGVzaXJlZFNpemUnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZWFkYWJsZUNvbnRyb2xsZXIgPSB0aGlzLl9jb250cm9sbGVkVHJhbnNmb3JtU3RyZWFtLl9yZWFkYWJsZS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyO1xuICAgICAgICByZXR1cm4gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckdldERlc2lyZWRTaXplKHJlYWRhYmxlQ29udHJvbGxlcik7XG4gICAgfVxuICAgIGVucXVldWUoY2h1bmsgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCFJc1RyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHRoaXMpKSB7XG4gICAgICAgICAgICB0aHJvdyBkZWZhdWx0Q29udHJvbGxlckJyYW5kQ2hlY2tFeGNlcHRpb24oJ2VucXVldWUnKTtcbiAgICAgICAgfVxuICAgICAgICBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUodGhpcywgY2h1bmspO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFcnJvcnMgYm90aCB0aGUgcmVhZGFibGUgc2lkZSBhbmQgdGhlIHdyaXRhYmxlIHNpZGUgb2YgdGhlIGNvbnRyb2xsZWQgdHJhbnNmb3JtIHN0cmVhbSwgbWFraW5nIGFsbCBmdXR1cmVcbiAgICAgKiBpbnRlcmFjdGlvbnMgd2l0aCBpdCBmYWlsIHdpdGggdGhlIGdpdmVuIGVycm9yIGBlYC4gQW55IGNodW5rcyBxdWV1ZWQgZm9yIHRyYW5zZm9ybWF0aW9uIHdpbGwgYmUgZGlzY2FyZGVkLlxuICAgICAqL1xuICAgIGVycm9yKHJlYXNvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIUlzVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbignZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckVycm9yKHRoaXMsIHJlYXNvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgcmVhZGFibGUgc2lkZSBhbmQgZXJyb3JzIHRoZSB3cml0YWJsZSBzaWRlIG9mIHRoZSBjb250cm9sbGVkIHRyYW5zZm9ybSBzdHJlYW0uIFRoaXMgaXMgdXNlZnVsIHdoZW4gdGhlXG4gICAgICogdHJhbnNmb3JtZXIgb25seSBuZWVkcyB0byBjb25zdW1lIGEgcG9ydGlvbiBvZiB0aGUgY2h1bmtzIHdyaXR0ZW4gdG8gdGhlIHdyaXRhYmxlIHNpZGUuXG4gICAgICovXG4gICAgdGVybWluYXRlKCkge1xuICAgICAgICBpZiAoIUlzVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIodGhpcykpIHtcbiAgICAgICAgICAgIHRocm93IGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbigndGVybWluYXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJUZXJtaW5hdGUodGhpcyk7XG4gICAgfVxufVxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIucHJvdG90eXBlLCB7XG4gICAgZW5xdWV1ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgZXJyb3I6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuICAgIHRlcm1pbmF0ZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG4gICAgZGVzaXJlZFNpemU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcbmlmICh0eXBlb2YgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcsIHtcbiAgICAgICAgdmFsdWU6ICdUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcicsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xufVxuLy8gVHJhbnNmb3JtIFN0cmVhbSBEZWZhdWx0IENvbnRyb2xsZXIgQWJzdHJhY3QgT3BlcmF0aW9uc1xuZnVuY3Rpb24gSXNUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcih4KSB7XG4gICAgaWYgKCF0eXBlSXNPYmplY3QoeCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW0nKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB4IGluc3RhbmNlb2YgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXI7XG59XG5mdW5jdGlvbiBTZXRVcFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyKHN0cmVhbSwgY29udHJvbGxlciwgdHJhbnNmb3JtQWxnb3JpdGhtLCBmbHVzaEFsZ29yaXRobSkge1xuICAgIGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW0gPSBzdHJlYW07XG4gICAgc3RyZWFtLl90cmFuc2Zvcm1TdHJlYW1Db250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICBjb250cm9sbGVyLl90cmFuc2Zvcm1BbGdvcml0aG0gPSB0cmFuc2Zvcm1BbGdvcml0aG07XG4gICAgY29udHJvbGxlci5fZmx1c2hBbGdvcml0aG0gPSBmbHVzaEFsZ29yaXRobTtcbn1cbmZ1bmN0aW9uIFNldFVwVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJGcm9tVHJhbnNmb3JtZXIoc3RyZWFtLCB0cmFuc2Zvcm1lcikge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBPYmplY3QuY3JlYXRlKFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZSk7XG4gICAgbGV0IHRyYW5zZm9ybUFsZ29yaXRobSA9IChjaHVuaykgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlKGNvbnRyb2xsZXIsIGNodW5rKTtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKHRyYW5zZm9ybVJlc3VsdEUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUmVqZWN0ZWRXaXRoKHRyYW5zZm9ybVJlc3VsdEUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBsZXQgZmx1c2hBbGdvcml0aG0gPSAoKSA9PiBwcm9taXNlUmVzb2x2ZWRXaXRoKHVuZGVmaW5lZCk7XG4gICAgaWYgKHRyYW5zZm9ybWVyLnRyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRyYW5zZm9ybUFsZ29yaXRobSA9IGNodW5rID0+IHRyYW5zZm9ybWVyLnRyYW5zZm9ybShjaHVuaywgY29udHJvbGxlcik7XG4gICAgfVxuICAgIGlmICh0cmFuc2Zvcm1lci5mbHVzaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZsdXNoQWxnb3JpdGhtID0gKCkgPT4gdHJhbnNmb3JtZXIuZmx1c2goY29udHJvbGxlcik7XG4gICAgfVxuICAgIFNldFVwVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXIoc3RyZWFtLCBjb250cm9sbGVyLCB0cmFuc2Zvcm1BbGdvcml0aG0sIGZsdXNoQWxnb3JpdGhtKTtcbn1cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyQ2xlYXJBbGdvcml0aG1zKGNvbnRyb2xsZXIpIHtcbiAgICBjb250cm9sbGVyLl90cmFuc2Zvcm1BbGdvcml0aG0gPSB1bmRlZmluZWQ7XG4gICAgY29udHJvbGxlci5fZmx1c2hBbGdvcml0aG0gPSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUoY29udHJvbGxlciwgY2h1bmspIHtcbiAgICBjb25zdCBzdHJlYW0gPSBjb250cm9sbGVyLl9jb250cm9sbGVkVHJhbnNmb3JtU3RyZWFtO1xuICAgIGNvbnN0IHJlYWRhYmxlQ29udHJvbGxlciA9IHN0cmVhbS5fcmVhZGFibGUuX3JlYWRhYmxlU3RyZWFtQ29udHJvbGxlcjtcbiAgICBpZiAoIVJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDYW5DbG9zZU9yRW5xdWV1ZShyZWFkYWJsZUNvbnRyb2xsZXIpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlYWRhYmxlIHNpZGUgaXMgbm90IGluIGEgc3RhdGUgdGhhdCBwZXJtaXRzIGVucXVldWUnKTtcbiAgICB9XG4gICAgLy8gV2UgdGhyb3R0bGUgdHJhbnNmb3JtIGludm9jYXRpb25zIGJhc2VkIG9uIHRoZSBiYWNrcHJlc3N1cmUgb2YgdGhlIFJlYWRhYmxlU3RyZWFtLCBidXQgd2Ugc3RpbGxcbiAgICAvLyBhY2NlcHQgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJFbnF1ZXVlKCkgY2FsbHMuXG4gICAgdHJ5IHtcbiAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckVucXVldWUocmVhZGFibGVDb250cm9sbGVyLCBjaHVuayk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIHJlYWRhYmxlU3RyYXRlZ3kuc2l6ZSgpIHRocm93cy5cbiAgICAgICAgVHJhbnNmb3JtU3RyZWFtRXJyb3JXcml0YWJsZUFuZFVuYmxvY2tXcml0ZShzdHJlYW0sIGUpO1xuICAgICAgICB0aHJvdyBzdHJlYW0uX3JlYWRhYmxlLl9zdG9yZWRFcnJvcjtcbiAgICB9XG4gICAgY29uc3QgYmFja3ByZXNzdXJlID0gUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckhhc0JhY2twcmVzc3VyZShyZWFkYWJsZUNvbnRyb2xsZXIpO1xuICAgIGlmIChiYWNrcHJlc3N1cmUgIT09IHN0cmVhbS5fYmFja3ByZXNzdXJlKSB7XG4gICAgICAgIFRyYW5zZm9ybVN0cmVhbVNldEJhY2twcmVzc3VyZShzdHJlYW0sIHRydWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyRXJyb3IoY29udHJvbGxlciwgZSkge1xuICAgIFRyYW5zZm9ybVN0cmVhbUVycm9yKGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW0sIGUpO1xufVxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJQZXJmb3JtVHJhbnNmb3JtKGNvbnRyb2xsZXIsIGNodW5rKSB7XG4gICAgY29uc3QgdHJhbnNmb3JtUHJvbWlzZSA9IGNvbnRyb2xsZXIuX3RyYW5zZm9ybUFsZ29yaXRobShjaHVuayk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybVByb21pc2VXaXRoKHRyYW5zZm9ybVByb21pc2UsIHVuZGVmaW5lZCwgciA9PiB7XG4gICAgICAgIFRyYW5zZm9ybVN0cmVhbUVycm9yKGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW0sIHIpO1xuICAgICAgICB0aHJvdyByO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJUZXJtaW5hdGUoY29udHJvbGxlcikge1xuICAgIGNvbnN0IHN0cmVhbSA9IGNvbnRyb2xsZXIuX2NvbnRyb2xsZWRUcmFuc2Zvcm1TdHJlYW07XG4gICAgY29uc3QgcmVhZGFibGVDb250cm9sbGVyID0gc3RyZWFtLl9yZWFkYWJsZS5fcmVhZGFibGVTdHJlYW1Db250cm9sbGVyO1xuICAgIFJlYWRhYmxlU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbG9zZShyZWFkYWJsZUNvbnRyb2xsZXIpO1xuICAgIGNvbnN0IGVycm9yID0gbmV3IFR5cGVFcnJvcignVHJhbnNmb3JtU3RyZWFtIHRlcm1pbmF0ZWQnKTtcbiAgICBUcmFuc2Zvcm1TdHJlYW1FcnJvcldyaXRhYmxlQW5kVW5ibG9ja1dyaXRlKHN0cmVhbSwgZXJyb3IpO1xufVxuLy8gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNpbmsgQWxnb3JpdGhtc1xuZnVuY3Rpb24gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdFNpbmtXcml0ZUFsZ29yaXRobShzdHJlYW0sIGNodW5rKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHN0cmVhbS5fdHJhbnNmb3JtU3RyZWFtQ29udHJvbGxlcjtcbiAgICBpZiAoc3RyZWFtLl9iYWNrcHJlc3N1cmUpIHtcbiAgICAgICAgY29uc3QgYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZSA9IHN0cmVhbS5fYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybVByb21pc2VXaXRoKGJhY2twcmVzc3VyZUNoYW5nZVByb21pc2UsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdyaXRhYmxlID0gc3RyZWFtLl93cml0YWJsZTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gd3JpdGFibGUuX3N0YXRlO1xuICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnZXJyb3JpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgd3JpdGFibGUuX3N0b3JlZEVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyUGVyZm9ybVRyYW5zZm9ybShjb250cm9sbGVyLCBjaHVuayk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJQZXJmb3JtVHJhbnNmb3JtKGNvbnRyb2xsZXIsIGNodW5rKTtcbn1cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTaW5rQWJvcnRBbGdvcml0aG0oc3RyZWFtLCByZWFzb24pIHtcbiAgICAvLyBhYm9ydCgpIGlzIG5vdCBjYWxsZWQgc3luY2hyb25vdXNseSwgc28gaXQgaXMgcG9zc2libGUgZm9yIGFib3J0KCkgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHN0cmVhbSBpcyBhbHJlYWR5XG4gICAgLy8gZXJyb3JlZC5cbiAgICBUcmFuc2Zvcm1TdHJlYW1FcnJvcihzdHJlYW0sIHJlYXNvbik7XG4gICAgcmV0dXJuIHByb21pc2VSZXNvbHZlZFdpdGgodW5kZWZpbmVkKTtcbn1cbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTaW5rQ2xvc2VBbGdvcml0aG0oc3RyZWFtKSB7XG4gICAgLy8gc3RyZWFtLl9yZWFkYWJsZSBjYW5ub3QgY2hhbmdlIGFmdGVyIGNvbnN0cnVjdGlvbiwgc28gY2FjaGluZyBpdCBhY3Jvc3MgYSBjYWxsIHRvIHVzZXIgY29kZSBpcyBzYWZlLlxuICAgIGNvbnN0IHJlYWRhYmxlID0gc3RyZWFtLl9yZWFkYWJsZTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gc3RyZWFtLl90cmFuc2Zvcm1TdHJlYW1Db250cm9sbGVyO1xuICAgIGNvbnN0IGZsdXNoUHJvbWlzZSA9IGNvbnRyb2xsZXIuX2ZsdXNoQWxnb3JpdGhtKCk7XG4gICAgVHJhbnNmb3JtU3RyZWFtRGVmYXVsdENvbnRyb2xsZXJDbGVhckFsZ29yaXRobXMoY29udHJvbGxlcik7XG4gICAgLy8gUmV0dXJuIGEgcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aXRoIHVuZGVmaW5lZCBvbiBzdWNjZXNzLlxuICAgIHJldHVybiB0cmFuc2Zvcm1Qcm9taXNlV2l0aChmbHVzaFByb21pc2UsICgpID0+IHtcbiAgICAgICAgaWYgKHJlYWRhYmxlLl9zdGF0ZSA9PT0gJ2Vycm9yZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyByZWFkYWJsZS5fc3RvcmVkRXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlckNsb3NlKHJlYWRhYmxlLl9yZWFkYWJsZVN0cmVhbUNvbnRyb2xsZXIpO1xuICAgIH0sIHIgPT4ge1xuICAgICAgICBUcmFuc2Zvcm1TdHJlYW1FcnJvcihzdHJlYW0sIHIpO1xuICAgICAgICB0aHJvdyByZWFkYWJsZS5fc3RvcmVkRXJyb3I7XG4gICAgfSk7XG59XG4vLyBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0U291cmNlIEFsZ29yaXRobXNcbmZ1bmN0aW9uIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRTb3VyY2VQdWxsQWxnb3JpdGhtKHN0cmVhbSkge1xuICAgIC8vIEludmFyaWFudC4gRW5mb3JjZWQgYnkgdGhlIHByb21pc2VzIHJldHVybmVkIGJ5IHN0YXJ0KCkgYW5kIHB1bGwoKS5cbiAgICBUcmFuc2Zvcm1TdHJlYW1TZXRCYWNrcHJlc3N1cmUoc3RyZWFtLCBmYWxzZSk7XG4gICAgLy8gUHJldmVudCB0aGUgbmV4dCBwdWxsKCkgY2FsbCB1bnRpbCB0aGVyZSBpcyBiYWNrcHJlc3N1cmUuXG4gICAgcmV0dXJuIHN0cmVhbS5fYmFja3ByZXNzdXJlQ2hhbmdlUHJvbWlzZTtcbn1cbi8vIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlci5cbmZ1bmN0aW9uIGRlZmF1bHRDb250cm9sbGVyQnJhbmRDaGVja0V4Y2VwdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoYFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyLnByb3RvdHlwZS4ke25hbWV9IGNhbiBvbmx5IGJlIHVzZWQgb24gYSBUcmFuc2Zvcm1TdHJlYW1EZWZhdWx0Q29udHJvbGxlcmApO1xufVxuLy8gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIFRyYW5zZm9ybVN0cmVhbS5cbmZ1bmN0aW9uIHN0cmVhbUJyYW5kQ2hlY2tFeGNlcHRpb24obmFtZSkge1xuICAgIHJldHVybiBuZXcgVHlwZUVycm9yKGBUcmFuc2Zvcm1TdHJlYW0ucHJvdG90eXBlLiR7bmFtZX0gY2FuIG9ubHkgYmUgdXNlZCBvbiBhIFRyYW5zZm9ybVN0cmVhbWApO1xufVxuXG5leHBvcnQgeyBCeXRlTGVuZ3RoUXVldWluZ1N0cmF0ZWd5LCBDb3VudFF1ZXVpbmdTdHJhdGVneSwgUmVhZGFibGVCeXRlU3RyZWFtQ29udHJvbGxlciwgUmVhZGFibGVTdHJlYW0sIFJlYWRhYmxlU3RyZWFtQllPQlJlYWRlciwgUmVhZGFibGVTdHJlYW1CWU9CUmVxdWVzdCwgUmVhZGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlciwgUmVhZGFibGVTdHJlYW1EZWZhdWx0UmVhZGVyLCBUcmFuc2Zvcm1TdHJlYW0sIFRyYW5zZm9ybVN0cmVhbURlZmF1bHRDb250cm9sbGVyLCBXcml0YWJsZVN0cmVhbSwgV3JpdGFibGVTdHJlYW1EZWZhdWx0Q29udHJvbGxlciwgV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wb255ZmlsbC5lczIwMTgubWpzLm1hcFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2xpYi9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJvcHRpb25zIiwiZm9ybURhdGEiLCJjb25maWciLCJfX2Fzc2lnbiIsInVybCIsInVzZXJuYW1lIiwiRXJyb3IiLCJrZXkiLCJyZXF1ZXN0IiwicmVxdWVzdF8xIiwibWFpbExpc3RzTWVtYmVycyIsIm1haWxMaXN0TWVtYmVyc18xIiwiZG9tYWluQ3JlZGVudGlhbHNDbGllbnQiLCJkb21haW5zQ3JlZGVudGlhbHNfMSIsImRvbWFpblRlbXBsYXRlc0NsaWVudCIsImRvbWFpbnNUZW1wbGF0ZXNfMSIsImRvbWFpblRhZ3NDbGllbnQiLCJkb21haW5zVGFnc18xIiwibXVsdGlwbGVWYWxpZGF0aW9uQ2xpZW50IiwibXVsdGlwbGVWYWxpZGF0aW9uXzEiLCJkb21haW5zIiwiZG9tYWluc18xIiwid2ViaG9va3MiLCJ3ZWJob29rc18xIiwiZXZlbnRzIiwiZXZlbnRzXzEiLCJzdGF0cyIsInN0YXRzXzEiLCJzdXBwcmVzc2lvbnMiLCJzdXBwcmVzc2lvbnNfMSIsIm1lc3NhZ2VzIiwibWVzc2FnZXNfMSIsInJvdXRlcyIsInJvdXRlc18xIiwiaXBzIiwiaXBzXzEiLCJpcF9wb29scyIsImlwX3Bvb2xzXzEiLCJsaXN0cyIsImxpc3RzXzEiLCJ2YWxpZGF0ZSIsInZhbGlkYXRlXzEiLCJkYXRhIiwicmVjZWl2aW5nIiwic2VuZGluZyIsIm5hbWUiLCJyZXF1aXJlX3RscyIsInNraXBfdmVyaWZpY2F0aW9uIiwic3RhdGUiLCJ3aWxkY2FyZCIsInNwYW1fYWN0aW9uIiwiY3JlYXRlZF9hdCIsInNtdHBfcGFzc3dvcmQiLCJzbXRwX2xvZ2luIiwidHlwZSIsInJlY2VpdmluZ19kbnNfcmVjb3JkcyIsInNlbmRpbmdfZG5zX3JlY29yZHMiLCJleHBvcnRzIiwiZG9tYWluQ3JlZGVudGlhbHMiLCJkb21haW5UZW1wbGF0ZXMiLCJkb21haW5UYWdzIiwiRG9tYWluQ2xpZW50IiwicmVzcG9uc2UiLCJib2R5IiwiaXRlbXMiLCJtYXAiLCJpdGVtIiwiRG9tYWluIiwiZG9tYWluIiwidHJhY2tpbmciLCJxdWVyeSIsImdldCIsInRoZW4iLCJyZXMiLCJfcGFyc2VEb21haW5MaXN0IiwiX3BhcnNlRG9tYWluIiwicG9zdE9iaiIsImZvcmNlX2RraW1fYXV0aG9yaXR5IiwidG9TdHJpbmciLCJwb3N0V2l0aEZEIiwiZGVsZXRlIiwiX3BhcnNlTWVzc2FnZSIsImNvbm5lY3Rpb24iLCJwdXQiLCJfcGFyc2VUcmFja2luZ1NldHRpbmdzIiwiYWN0aXZlIiwiZXJyb3JfMSIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJtZXNzYWdlIiwicHV0V2l0aEZEIiwiX3BhcnNlVHJhY2tpbmdVcGRhdGUiLCJfYSIsImlwIiwicG9vbF9pZCIsInJlcGxhY2VtZW50Iiwic2VhcmNoUGFyYW1zIiwic2VsZiIsImRraW1TZWxlY3RvciIsIndlYlByZWZpeCIsImJhc2VSb3V0ZSIsIkRvbWFpbkNyZWRlbnRpYWxzQ2xpZW50IiwidG90YWxDb3VudCIsInRvdGFsX2NvdW50IiwicmVzdWx0Iiwic3BlYyIsIl9wYXJzZURvbWFpbkNyZWRlbnRpYWxzTGlzdCIsImNvbmNhdCIsIl9wYXJzZU1lc3NhZ2VSZXNwb25zZSIsImNyZWRlbnRpYWxzTG9naW4iLCJfcGFyc2VEZWxldGVkUmVzcG9uc2UiLCJ0YWdJbmZvIiwidGFnIiwiZGVzY3JpcHRpb24iLCJEYXRlIiwidGFnU3RhdGlzdGljSW5mbyIsInN0YXJ0IiwiZW5kIiwicmVzb2x1dGlvbiIsInN0YXQiLCJ0aW1lIiwiRG9tYWluVGFnc0NsaWVudCIsInBhZ2VzIiwiT2JqZWN0IiwiZW50cmllcyIsInBhZ2luZyIsInJlZHVjZSIsImFjYyIsImVudHJpZSIsImlkIiwiRG9tYWluVGFnIiwiX3BhcnNlUGFnZUxpbmtzIiwiRG9tYWluVGFnU3RhdGlzdGljIiwiX3BhcnNlRG9tYWluVGFnc0xpc3QiLCJfcGFyc2VUYWdTdGF0aXN0aWMiLCJkb21haW5UZW1wbGF0ZUZyb21BUEkiLCJjcmVhdGVkQXQiLCJjcmVhdGVkQnkiLCJ2ZXJzaW9uIiwidmVyc2lvbnMiLCJsZW5ndGgiLCJEb21haW5UZW1wbGF0ZXNDbGllbnQiLCJEb21haW5UZW1wbGF0ZUl0ZW0iLCJ0ZW1wbGF0ZSIsInRlbXBsYXRlTmFtZSIsInRlbXBsYXRlVmVyc2lvbiIsImQiLCJwYXJzZUxpc3QiLCJwYXJzZUNyZWF0aW9uUmVzcG9uc2UiLCJwYXJzZU11dGF0aW9uUmVzcG9uc2UiLCJwYXJzZU5vdGlmaWNhdGlvblJlc3BvbnNlIiwicGFyc2VDcmVhdGlvblZlcnNpb25SZXNwb25zZSIsInBhcnNlTXV0YXRlVGVtcGxhdGVWZXJzaW9uUmVzcG9uc2UiLCJwYXJzZUxpc3RUZW1wbGF0ZVZlcnNpb25zIiwiX19leHRlbmRzIiwiX2IiLCJib2R5TWVzc2FnZSIsImVycm9yIiwiX3N1cGVyIiwiX3RoaXMiLCJzdGFjayIsImRldGFpbHMiLCJFdmVudENsaWVudCIsInNwbGl0IiwicG9wIiwibnVtYmVyIiwiX3BhcnNlUGFnZU51bWJlciIsInBhaXIiLCJfcGFyc2VQYWdlIiwicXVlcnlDb3B5IiwicGFnZSIsIl9wYXJzZUV2ZW50TGlzdCIsIkZvcm1EYXRhIiwiTWFpbGd1biIsImNsaWVudF8xIiwiU3VwcHJlc3Npb25Nb2RlbHMiLCJJcFBvb2xzQ2xpZW50IiwicGFyc2VJcFBvb2xzUmVzcG9uc2UiLCJwb29sSWQiLCJwYXRjaFdpdGhGRCIsIklwc0NsaWVudCIsInBhcnNlSXBzUmVzcG9uc2UiLCJtZW1iZXJzIiwiTGlzdHNDbGllbnQiLCJtYWlsTGlzdEFkZHJlc3MiLCJsaXN0IiwiTWFpbExpc3RzTWVtYmVycyIsIm5ld0RhdGEiLCJ2YXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsInN1YnNjcmliZWQiLCJtYWlsTGlzdE1lbWJlckFkZHJlc3MiLCJtZW1iZXIiLCJyZXFEYXRhIiwiY2hlY2tBbmRVcGRhdGVEYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwidXBzZXJ0IiwiTWVzc2FnZXNDbGllbnQiLCJfcGFyc2VSZXNwb25zZSIsIk11bHRpcGxlVmFsaWRhdGlvbkNsaWVudCIsImxpc3RJZCIsImZpbGUiLCJpc1N0cmVhbSIsImF0dGFjaG1lbnQiLCJwaXBlIiwiaXNOb2RlRm9ybURhdGEiLCJmb3JtRGF0YUluc3RhbmNlIiwiZ2V0SGVhZGVycyIsInVuZGVmaW5lZCIsImdldEF0dGFjaG1lbnRPcHRpb25zIiwiY29udGVudFR5cGUiLCJrbm93bkxlbmd0aCIsImZpbGVuYW1lIiwic3RyZWFtVG9TdHJpbmciLCJzdHJlYW0iLCJjaHVua3MiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9uIiwiY2h1bmsiLCJwdXNoIiwiQnVmZmVyIiwidGltZW91dCIsImhlYWRlcnMiLCJGb3JtRGF0YUNvbnN0cnVjdG9yIiwiUmVxdWVzdCIsIm1ldGhvZCIsImlucHV0T3B0aW9ucyIsImJhc2ljIiwiYmFzZTY0IiwiZW5jb2RlIiwiQXV0aG9yaXphdGlvbiIsInBhcmFtcyIsImdldE93blByb3BlcnR5TmFtZXMiLCJ0b0xvY2FsZVVwcGVyQ2FzZSIsInRocm93SHR0cEVycm9ycyIsIl9jIiwib2siLCJqc29uIiwiY29tbWFuZCIsImNyZWF0ZUZvcm1EYXRhIiwia2V5cyIsImZpbHRlciIsImZvcm1EYXRhQWNjIiwiZmlsZUtleXMiLCJpbmNsdWRlcyIsImFkZEZpbGVzVG9GRCIsImFkZE1pbWVEYXRhVG9GRCIsImFkZENvbW1vblByb3BlcnR5VG9GRCIsImlzQnVmZmVyIiwiYXBwZW5kIiwicHJvcGVydHlOYW1lIiwidmFsdWUiLCJhcHBlbmRGaWxlVG9GRCIsIm9iaiIsImlzU3RyZWFtRGF0YSIsIm9iakRhdGEiLCJmb3JFYWNoIiwiUm91dGVzQ2xpZW50Iiwicm91dGUiLCJTdGF0c0NsaWVudCIsImFycmF5V2l0aFBhaXJzIiwiY3VycmVudFBhaXIiLCJyZXBlYXRlZFByb3BlcnR5IiwiU3RhdHMiLCJwcmVwYXJlU2VhcmNoUGFyYW1zIiwiX3BhcnNlU3RhdHMiLCJjcmVhdGVPcHRpb25zIiwiU3VwcmVzc2lvbnNfMSIsIkJPVU5DRVMiLCJhZGRyZXNzIiwiY29kZSIsIlN1cHByZXNzaW9uIiwiQ09NUExBSU5UUyIsIlVOU1VCU0NSSUJFUyIsInRhZ3MiLCJXSElURUxJU1RTIiwicmVhc29uIiwibW9kZWxzIiwiTWFwIiwic2V0IiwiQm91bmNlIiwiQ29tcGxhaW50IiwiVW5zdWJzY3JpYmUiLCJXaGl0ZUxpc3QiLCJTdXBwcmVzc2lvbkNsaWVudCIsInBhZ2VVcmwiLCJwYXJzZWRVcmwiLCJVUkwiLCJoYXMiLCJNb2RlbCIsInByZXBhcmVSZXNwb25zZSIsImNoZWNrVHlwZSIsIm1vZGVsIiwiX3BhcnNlTGlzdCIsImVuY29kZVVSSUNvbXBvbmVudCIsIl9wYXJzZUl0ZW0iLCJwb3N0RGF0YSIsImNyZWF0ZVdoaXRlTGlzdCIsInBvc3QiLCJtb2R1bGUiLCJtdWx0aXBsZVZhbGlkYXRpb24iLCJWYWxpZGF0ZUNsaWVudCIsIldlYmhvb2tDbGllbnQiLCJ3ZWJob29rUmVzcG9uc2UiLCJ3ZWJob29rIiwidXJscyIsIldlYmhvb2siLCJfcGFyc2VXZWJob29rTGlzdCIsIl9wYXJzZVdlYmhvb2tXaXRoSUQiLCJ0ZXN0IiwiX3BhcnNlV2ViaG9va1Rlc3QiXSwic291cmNlUm9vdCI6IiJ9